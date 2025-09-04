import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ShoppingCart, Newspaper, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { UnifiedActivity } from '../../services/dataService';
import { BehaviorEntry, ShoppingPattern, NewsSource } from '../../types';

interface ActivityFeedItemProps {
  activity: UnifiedActivity;
  index: number;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ activity, index }) => {
  const renderContent = () => {
    switch (activity.activityType) {
      case 'behavior':
        const behavior = activity as BehaviorEntry;
        return (
          <>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-full">
              <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Detected potential <span className="font-semibold text-primary-600 dark:text-primary-400">{behavior.biasDetected.join(', ')}</span> during <span className="font-semibold">{behavior.activity}</span>.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Confidence: <span className="font-medium">{(behavior.confidence * 100).toFixed(0)}%</span>
              </p>
            </div>
          </>
        );
      case 'shopping':
        const purchase = activity as ShoppingPattern;
        return (
          <>
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/50 rounded-full">
              <ShoppingCart className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Purchase of <span className="font-semibold text-green-600 dark:text-green-400">${purchase.amount.toFixed(2)}</span> in <span className="font-semibold">{purchase.category}</span>.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Potential bias: <span className="font-medium">{purchase.biasType}</span> {purchase.impulse && <span className="font-semibold text-red-500">(Impulse)</span>}
              </p>
            </div>
          </>
        );
      case 'news':
        const news = activity as NewsSource;
        return (
          <>
            <div className="p-3 bg-accent-100 dark:bg-accent-900/50 rounded-full">
              <Newspaper className="w-5 h-5 text-accent-600 dark:text-accent-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Read article from <span className="font-semibold">{news.name}</span>.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Category: <span className="font-medium">{news.category}</span>, Reliability: <span className="font-medium">{news.reliability}%</span>
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const activityDate = new Date(activity.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      {renderContent()}
      <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex items-center space-x-1 pt-1">
        <Clock className="w-3 h-3" />
        <span>{formatDistanceToNow(activityDate, { addSuffix: true })}</span>
      </div>
    </motion.div>
  );
};

export default ActivityFeedItem;
