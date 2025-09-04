import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, BarChart3, Share2 } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface PrivacySettingsProps {
  settings: {
    dataCollection: boolean;
    analytics: boolean;
    shareProgress: boolean;
  };
  onChange: (settings: any) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, onChange }) => {
  const handleToggle = (key: string, value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  const privacyItems = [
    {
      key: 'dataCollection',
      title: 'Data Collection',
      description: 'Allow collection of behavioral data to improve bias detection accuracy',
      icon: Database,
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      key: 'analytics',
      title: 'Usage Analytics',
      description: 'Help improve the app by sharing anonymous usage statistics',
      icon: BarChart3,
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      key: 'shareProgress',
      title: 'Share Progress',
      description: 'Allow sharing your progress with researchers (fully anonymized)',
      icon: Share2,
      color: 'text-accent-600 dark:text-accent-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy & Data</h3>
        <p className="text-gray-600 dark:text-gray-400">Control how your data is collected and used to improve your experience</p>
      </div>

      <div className="space-y-4">
        {privacyItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 bg-white dark:bg-gray-800 rounded-lg ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
            
            <ToggleSwitch
              checked={settings[item.key as keyof typeof settings]}
              onChange={(checked) => handleToggle(item.key, checked)}
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-200">Data Security</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                All personal data is encrypted and stored securely. Your bias patterns and behavioral data
                never leave your device unless you explicitly allow it.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Database className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 dark:text-yellow-200">Data Retention</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                You can export or delete all your data at any time. Disabling data collection will reduce
                the accuracy of bias detection but maintains full functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
