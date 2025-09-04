import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Smartphone, Calendar, Trophy } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface NotificationSettingsProps {
  settings: {
    email: boolean;
    push: boolean;
    weekly: boolean;
    challenges: boolean;
  };
  onChange: (settings: any) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onChange }) => {
  const handleToggle = (key: string, value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  const notificationItems = [
    {
      key: 'email',
      title: 'Email Notifications',
      description: 'Receive weekly summaries and important updates via email',
      icon: Mail,
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      key: 'push',
      title: 'Push Notifications',
      description: 'Get real-time alerts for bias detection and reminders',
      icon: Smartphone,
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      key: 'weekly',
      title: 'Weekly Reports',
      description: 'Automated weekly progress reports and insights',
      icon: Calendar,
      color: 'text-accent-600 dark:text-accent-400'
    },
    {
      key: 'challenges',
      title: 'Challenge Updates',
      description: 'Notifications for new challenges and achievements',
      icon: Trophy,
      color: 'text-warning-600 dark:text-warning-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
        <p className="text-gray-600 dark:text-gray-400">Choose how you want to be notified about your bias tracking progress</p>
      </div>

      <div className="space-y-4">
        {notificationItems.map((item, index) => (
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

      <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-200">Notification Timing</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Notifications are sent based on your timezone and activity patterns to minimize disruption
              while keeping you engaged with your bias awareness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
