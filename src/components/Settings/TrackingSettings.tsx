import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Lightbulb, Activity } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface TrackingSettingsProps {
  settings: {
    autoDetection: boolean;
    realTimeAnalysis: boolean;
    smartSuggestions: boolean;
  };
  onChange: (settings: any) => void;
}

const TrackingSettings: React.FC<TrackingSettingsProps> = ({ settings, onChange }) => {
  const handleToggle = (key: string, value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  const trackingItems = [
    {
      key: 'autoDetection',
      title: 'Auto Bias Detection',
      description: 'Automatically detect and log potential biases in your behavior',
      icon: Brain,
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      key: 'realTimeAnalysis',
      title: 'Real-time Analysis',
      description: 'Analyze patterns and provide instant feedback as you browse and shop',
      icon: Zap,
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      key: 'smartSuggestions',
      title: 'Smart Suggestions',
      description: 'Receive personalized recommendations to improve bias awareness',
      icon: Lightbulb,
      color: 'text-warning-600 dark:text-warning-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tracking & Analysis</h3>
        <p className="text-gray-600 dark:text-gray-400">Configure how the app monitors and analyzes your behavioral patterns</p>
      </div>

      <div className="space-y-4">
        {trackingItems.map((item, index) => (
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
        <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-200">Tracking Accuracy</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Enabling all tracking features provides the most accurate bias detection and personalized
                insights. You can disable features individually without affecting core functionality.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-900 dark:text-amber-200">Machine Learning</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Our AI continuously learns from your patterns to provide better bias detection. All learning
                happens locally on your device to protect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingSettings;
