import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { BiasMetric } from '../../types';

interface MetricCardProps {
  metric: BiasMetric;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-warning-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-accent-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-warning-600 dark:text-warning-400';
      case 'down':
        return 'text-accent-600 dark:text-accent-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBiasLabel = (type: string) => {
    const labels: Record<string, string> = {
      confirmation: 'Confirmation Bias',
      availability: 'Availability Heuristic',
      anchoring: 'Anchoring Bias',
      representativeness: 'Representativeness',
      optimism: 'Optimism Bias',
      loss_aversion: 'Loss Aversion'
    };
    return labels[type] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-primary-500/10 transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-600"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {getBiasLabel(metric.type)}
        </h3>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metric.value}%
          </div>
          <div className={`text-sm ${getTrendColor()}`}>
            {metric.trend} vs last week
          </div>
        </div>
        
        <div className="w-16 h-16">
          <div className="relative w-full h-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                className="text-primary-500"
                strokeWidth="2"
                strokeDasharray={`${metric.value}, 100`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
              {metric.value}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
