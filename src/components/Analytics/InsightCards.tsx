import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Clock, Hash } from 'lucide-react';

interface InsightCardsProps {
  dominantBias: string;
  peakTime: string;
  totalEntries: number;
}

const InsightCards: React.FC<InsightCardsProps> = ({ dominantBias, peakTime, totalEntries }) => {
  const insights = [
    {
      title: 'Most Dominant Bias',
      value: dominantBias,
      icon: AlertTriangle,
      color: 'text-warning-700 bg-warning-50 dark:bg-warning-900/50 border-warning-200 dark:border-warning-800',
      iconColor: 'text-warning-600',
    },
    {
      title: 'Peak Activity Time',
      value: peakTime,
      icon: Clock,
      color: 'text-secondary-700 bg-secondary-50 dark:bg-secondary-900/50 border-secondary-200 dark:border-secondary-800',
      iconColor: 'text-secondary-600',
    },
    {
      title: 'Total Behaviors Logged',
      value: totalEntries.toString(),
      icon: Hash,
      color: 'text-accent-700 bg-accent-50 dark:bg-accent-900/50 border-accent-200 dark:border-accent-800',
      iconColor: 'text-accent-600',
    },
    {
      title: 'Weekly Progress',
      value: '78% Complete',
      icon: TrendingUp,
      color: 'text-primary-700 bg-primary-50 dark:bg-primary-900/50 border-primary-200 dark:border-primary-800',
      iconColor: 'text-primary-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl border p-6 ${insight.color}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${insight.iconColor}`}>
              <insight.icon className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium opacity-80">{insight.title}</h3>
            <p className="text-xl font-bold">{insight.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InsightCards;
