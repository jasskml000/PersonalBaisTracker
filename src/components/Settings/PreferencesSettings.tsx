import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Clock, DollarSign } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface PreferencesSettingsProps {
  settings: {
    theme: string;
    language: string;
    timezone: string;
    currency: string;
  };
  onChange: (settings: any) => void;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({ settings, onChange }) => {
  const { theme, setTheme } = useTheme();

  const handleChange = (key: string, value: string) => {
    if (key === 'theme') {
      setTheme(value as 'light' | 'dark' | 'system');
    }
    onChange({ ...settings, [key]: value });
  };

  const preferenceItems = [
    {
      key: 'theme',
      title: 'Theme',
      description: 'Choose your preferred color scheme',
      icon: Palette,
      color: 'text-primary-600 dark:text-primary-400',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' }
      ]
    },
    {
      key: 'language',
      title: 'Language',
      description: 'Select your preferred language',
      icon: Globe,
      color: 'text-secondary-600 dark:text-secondary-400',
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' }
      ]
    },
    {
      key: 'timezone',
      title: 'Timezone',
      description: 'Set your local timezone for accurate tracking',
      icon: Clock,
      color: 'text-accent-600 dark:text-accent-400',
      options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'America/New_York', label: 'Eastern Time' },
        { value: 'America/Chicago', label: 'Central Time' },
        { value: 'America/Denver', label: 'Mountain Time' },
        { value: 'America/Los_Angeles', label: 'Pacific Time' }
      ]
    },
    {
      key: 'currency',
      title: 'Currency',
      description: 'Choose currency for spending analysis',
      icon: DollarSign,
      color: 'text-warning-600 dark:text-warning-400',
      options: [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'JPY', label: 'Japanese Yen (¥)' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personal Preferences</h3>
        <p className="text-gray-600 dark:text-gray-400">Customize your experience with personalized settings</p>
      </div>

      <div className="space-y-6">
        {preferenceItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gray-100 dark:bg-gray-700 rounded-lg ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
            
            <select
              value={item.key === 'theme' ? theme : settings[item.key as keyof typeof settings]}
              onChange={(e) => handleChange(item.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700"
            >
              {item.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>
        ))}
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900 dark:text-purple-200">Personalization</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              These settings help personalize your bias tracking experience. Changes are saved automatically
              and will be applied across all your devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
