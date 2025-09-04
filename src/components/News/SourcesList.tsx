import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trash2 } from 'lucide-react';
import { NewsSource } from '../../types';

interface SourcesListProps {
  sources: NewsSource[];
  onDelete: (id: string) => void;
}

const SourcesList: React.FC<SourcesListProps> = ({ sources, onDelete }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'left':
        return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-400';
      case 'center':
        return 'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-400';
      case 'right':
        return 'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getBiasColor = (score: number) => {
    if (score > 2) return 'text-warning-600';
    if (score < -2) return 'text-secondary-600';
    return 'text-accent-600';
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 85) return 'text-accent-600';
    if (reliability >= 70) return 'text-warning-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your News Sources</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {sources.length} sources tracked
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{source.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(source.category)}`}>
                    {source.category}
                  </span>
                  <button className="text-gray-400 hover:text-primary-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Articles: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{source.articlesRead}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Bias: </span>
                    <span className={`font-medium ${getBiasColor(source.biasScore)}`}>
                      {source.biasScore > 0 ? '+' : ''}{source.biasScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Reliability: </span>
                    <span className={`font-medium ${getReliabilityColor(source.reliability)}`}>
                      {source.reliability}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onDelete(source.id)}
                  className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete source"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SourcesList;
