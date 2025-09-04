import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, User, Database, Loader2 } from 'lucide-react';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import PreferencesSettings from './PreferencesSettings';
import TrackingSettings from './TrackingSettings';
import { UserSettings } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { updateUserSettings } from '../../services/dataService';
import { useToast } from '../../contexts/ToastContext';

const defaultSettings: UserSettings = {
  notifications: { email: true, push: true, weekly: true, challenges: true },
  privacy: { dataCollection: true, analytics: true, shareProgress: false },
  preferences: { theme: 'system', language: 'en', timezone: 'UTC', currency: 'USD' },
  tracking: { autoDetection: true, realTimeAnalysis: true, smartSuggestions: true }
};

const SettingsPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.settings) {
      const loadedSettings = {
        ...defaultSettings,
        ...(profile.settings as unknown as Partial<UserSettings>),
        notifications: { ...defaultSettings.notifications, ...(profile.settings as any).notifications },
        privacy: { ...defaultSettings.privacy, ...(profile.settings as any).privacy },
        preferences: { ...defaultSettings.preferences, ...(profile.settings as any).preferences },
        tracking: { ...defaultSettings.tracking, ...(profile.settings as any).tracking },
      };
      setSettings(loadedSettings);
    }
  }, [profile]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateUserSettings(user.id, settings);
      addToast({ title: 'Success', message: 'Settings saved successfully!', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: User },
    { id: 'tracking', label: 'Tracking', icon: Database }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationSettings settings={settings.notifications} onChange={(s) => setSettings({ ...settings, notifications: s })} />;
      case 'privacy':
        return <PrivacySettings settings={settings.privacy} onChange={(s) => setSettings({ ...settings, privacy: s })} />;
      case 'preferences':
        return <PreferencesSettings settings={settings.preferences} onChange={(s) => setSettings({ ...settings, preferences: s })} />;
      case 'tracking':
        return <TrackingSettings settings={settings.tracking} onChange={(s) => setSettings({ ...settings, tracking: s })} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and privacy settings</p>
        </div>
        
        <motion.button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="flex items-center justify-center space-x-2 px-4 py-2 w-full sm:w-auto bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </motion.button>
      </motion.div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-2 sm:space-x-8 px-2 sm:px-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
