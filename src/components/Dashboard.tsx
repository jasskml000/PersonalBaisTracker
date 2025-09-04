import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';
import MetricCard from './Dashboard/MetricCard';
import NewsSourceChart from './Dashboard/NewsSourceChart';
import BehaviorHeatmap from './Dashboard/BehaviorHeatmap';
import ChallengeList from './Dashboard/ChallengeList';
import QuickStats from './Dashboard/QuickStats';
import { getDashboardData } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import useData from '../hooks/useData';
import SkeletonGrid from './UI/SkeletonGrid';
import EmptyState from './UI/EmptyState';
import WelcomeCard from './Dashboard/WelcomeCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, error } = useData(() => getDashboardData(user!.id), [user]);

  if (loading) {
    return <SkeletonGrid />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 p-4 rounded-lg">
        <h3 className="font-semibold">Error loading dashboard</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.biasMetrics.length === 0) {
    return (
      <div className="space-y-8">
        <WelcomeCard />
        <EmptyState
          icon={Zap}
          title="Your Dashboard is Ready!"
          message="Sync your activity for the first time to start seeing personalized insights here."
          buttonText="Sync First Activity"
          buttonLink="/activity"
        />
      </div>
    );
  }

  const { biasMetrics, newsSources, challenges, shoppingPatterns } = data;

  const stats = {
    totalBiases: biasMetrics.length,
    articlesRead: newsSources.reduce((sum, source) => sum + source.articlesRead, 0),
    impulsePurchases: shoppingPatterns.filter(p => p.impulse).length,
    challengesCompleted: challenges.filter(c => c.completed).length
  };

  return (
    <div className="space-y-4 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your bias awareness journey progress for this week.
        </p>
      </motion.div>

      <QuickStats {...stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {biasMetrics.map((metric, index) => (
          <MetricCard key={metric.id} metric={metric} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <NewsSourceChart sources={newsSources} />
        <BehaviorHeatmap />
      </div>

      <ChallengeList challenges={challenges} />
    </div>
  );
};

export default Dashboard;
