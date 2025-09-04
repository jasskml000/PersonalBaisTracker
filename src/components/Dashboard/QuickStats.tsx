import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Newspaper, ShoppingCart, Award } from 'lucide-react';

interface QuickStatsProps {
  totalBiases: number;
  articlesRead: number;
  impulsePurchases: number;
  challengesCompleted: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  totalBiases,
  articlesRead,
  impulsePurchases,
  challengesCompleted
}) => {
  const stats = [
    {
      label: 'Biases Detected',
      value: totalBiases,
      icon: Brain,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+12%'
    },
    {
      label: 'Articles Read',
      value: articlesRead,
      icon: Newspaper,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      change: '+8%'
    },
    {
      label: 'Impulse Purchases',
      value: impulsePurchases,
      icon: ShoppingCart,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      change: '-23%'
    },
    {
      label: 'Challenges Won',
      value: challengesCompleted,
      icon: Award,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      change: '+45%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-accent-600' : 
                stat.change.startsWith('-') ? 'text-warning-600' : 'text-gray-600'
              }`}>
                {stat.change} vs last week
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
