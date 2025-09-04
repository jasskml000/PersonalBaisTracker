import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Database } from 'lucide-react';
import NotificationSettings from '../Settings/NotificationSettings';
import PrivacySettings from '../Settings/PrivacySettings';
import PreferencesSettings from '../Settings/PreferencesSettings';
import TrackingSettings from '../Settings/TrackingSettings';
import ProfileDetails from './ProfileDetails';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'tracking', label: 'Tracking', icon: Database }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails />;
      case 'notifications':
        return <NotificationSettings settings={{} as any} onChange={() => {}} />;
      case 'privacy':
        return <PrivacySettings settings={{} as any} onChange={() => {}} />;
      case 'preferences':
        return <PreferencesSettings settings={{} as any} onChange={() => {}} />;
      case 'tracking':
        return <TrackingSettings settings={{} as any} onChange={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile & Settings</h2>
        <p className="text-gray-600 dark:text-gray-300">Manage your profile, preferences, and privacy settings</p>
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
            {activeTab === 'profile' && <ProfileDetails />}
            {activeTab === 'notifications' && <NotificationSettings settings={{} as any} onChange={() => {}} />}
            {activeTab === 'privacy' && <PrivacySettings settings={{} as any} onChange={() => {}} />}
            {activeTab === 'tracking' && <TrackingSettings settings={{} as any} onChange={() => {}} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
