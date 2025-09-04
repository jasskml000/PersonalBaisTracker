import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Brain, FileText, Trash2 } from 'lucide-react';
import { BehaviorEntry } from '../../types';
import { format } from 'date-fns';

interface BehaviorListProps {
  behaviors: BehaviorEntry[];
  onDelete: (id: string) => void;
}

const BehaviorList: React.FC<BehaviorListProps> = ({ behaviors, onDelete }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-accent-600 bg-accent-100 dark:bg-accent-900/50 dark:text-accent-400';
    if (confidence >= 0.6) return 'text-warning-600 bg-warning-100 dark:bg-warning-900/50 dark:text-warning-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400';
  };

  const getBiasColors = () => [
    'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400',
    'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-400',
    'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-400',
    'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-400',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-400'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Behavior Entries</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Latest {behaviors.length} recorded behaviors
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {behaviors.map((behavior, index) => (
          <motion.div
            key={behavior.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{behavior.activity}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(behavior.confidence)}`}>
                      {(behavior.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {format(behavior.timestamp, 'MMM dd, yyyy HH:mm')}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {behavior.biasDetected.map((bias, biasIndex) => (
                      <span
                        key={bias}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getBiasColors()[biasIndex % getBiasColors().length]
                        }`}
                      >
                        {bias}
                      </span>
                    ))}
                  </div>
                  
                  {behavior.notes && (
                    <div className="flex items-start space-x-2 mt-2">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{behavior.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-4 flex flex-col items-end space-y-2">
                 <button 
                    onClick={() => onDelete(behavior.id)}
                    className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete entry"
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

export default BehaviorList;
