import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Filter } from 'lucide-react';
import SpendingChart from './SpendingChart';
import CategoryBreakdown from './CategoryBreakdown';
import BiasInfluenceChart from './BiasInfluenceChart';
import PurchasesList from './PurchasesList';
import { getShoppingPatterns } from '../../services/dataService';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SkeletonGrid from '../UI/SkeletonGrid';
import EmptyState from '../UI/EmptyState';

const ShoppingPatternsPage: React.FC = () => {
  const { user } = useAuth();
  const { data: patterns, loading, error } = useData(() => getShoppingPatterns(user!.id), [user]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) return <SkeletonGrid count={6} />;
  if (error) return <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;

  const filteredPatterns = patterns?.filter(pattern => {
    if (selectedCategory === 'all') return true;
    return pattern.category === selectedCategory;
  }) || [];

  const totalSpent = patterns?.reduce((sum, pattern) => sum + pattern.amount, 0) || 0;
  const impulsePurchases = patterns?.filter(p => p.impulse).length || 0;
  const averagePurchase = totalSpent > 0 ? totalSpent / (patterns?.length || 1) : 0;

  const categories = ['all', ...Array.from(new Set(patterns?.map(p => p.category) || []))];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Shopping Insights</h2>
          <p className="text-gray-600 dark:text-gray-300">Analyze your purchasing behavior from automatically collected signals.</p>
        </div>
      </motion.div>

      {patterns && patterns.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg"><ShoppingCart className="w-5 h-5 text-primary-600" /></div></div><h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Spent</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-warning-100 dark:bg-warning-900/50 rounded-lg"><Filter className="w-5 h-5 text-warning-600" /></div></div><h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Impulse Purchases</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{impulsePurchases}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-secondary-100 dark:bg-secondary-900/50 rounded-lg"><ShoppingCart className="w-5 h-5 text-secondary-600" /></div></div><h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Purchase</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">${averagePurchase.toFixed(2)}</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingChart patterns={filteredPatterns} />
            <CategoryBreakdown patterns={filteredPatterns} />
          </div>
          <BiasInfluenceChart patterns={filteredPatterns} />
          <PurchasesList patterns={filteredPatterns} />
        </>
      ) : (
        <EmptyState
          icon={ShoppingCart}
          title="No Purchase Data Found"
          message="Insights about your shopping habits will appear here once activity is detected."
          buttonText="Sync Activity"
          buttonLink="/activity"
        />
      )}
    </div>
  );
};

export default ShoppingPatternsPage;
