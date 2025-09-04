import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
    </div>
  </div>
);

interface SkeletonGridProps {
    count?: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
