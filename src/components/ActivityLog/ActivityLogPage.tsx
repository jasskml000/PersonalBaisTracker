import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Search } from 'lucide-react';
import { getCombinedActivityLog, mapBehaviorEntry, mapShoppingPattern, mapNewsSource, UnifiedActivity } from '../../services/dataService';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { useSubscription } from '../../hooks/useSubscription';
import SkeletonGrid from '../UI/SkeletonGrid';
import EmptyState from '../UI/EmptyState';
import ActivityFeedItem from './ActivityFeedItem';
import { Tables } from '../../types/supabase';

const ActivityLogPage: React.FC = () => {
  const { user } = useAuth();
  const { data: activities, loading, error, setData } = useData(() => getCombinedActivityLog(user!.id), [user]);
  const [filter, setFilter] = useState('all');

  const handleInsert = useCallback((newRecord: any, table: string) => {
    let newActivity: UnifiedActivity | null = null;
    if (table === 'behavior_entries') {
        newActivity = { ...mapBehaviorEntry(newRecord as Tables<'behavior_entries'>), activityType: 'behavior' };
    } else if (table === 'shopping_patterns') {
        newActivity = { ...mapShoppingPattern(newRecord as Tables<'shopping_patterns'>), timestamp: new Date(newRecord.purchase_date), activityType: 'shopping' };
    } else if (table === 'news_sources') {
        newActivity = { ...mapNewsSource(newRecord as Tables<'news_sources'>), timestamp: new Date(newRecord.created_at), activityType: 'news' };
    }
    
    if (newActivity) {
        setData(prev => [newActivity!, ...(prev || [])]);
    }
  }, [setData]);

  useSubscription<Tables<'behavior_entries'>>({ channelName: 'public:behavior_entries', table: 'behavior_entries', onInsert: (rec) => handleInsert(rec, 'behavior_entries') });
  useSubscription<Tables<'shopping_patterns'>>({ channelName: 'public:shopping_patterns', table: 'shopping_patterns', onInsert: (rec) => handleInsert(rec, 'shopping_patterns') });
  useSubscription<Tables<'news_sources'>>({ channelName: 'public:news_sources', table: 'news_sources', onInsert: (rec) => handleInsert(rec, 'news_sources') });

  if (loading) return <SkeletonGrid count={5} />;
  if (error) return <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    return activity.activityType === filter;
  }) || [];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Activity Log</h2>
          <p className="text-gray-600 dark:text-gray-300">A unified, real-time feed of all automatically collected signals and behaviors.</p>
        </div>
      </motion.div>

      {activities && activities.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search activities..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800">
              <option value="all">All Activities</option>
              <option value="behavior">Behaviors</option>
              <option value="shopping">Shopping</option>
              <option value="news">News</option>
            </select>
          </div>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <ActivityFeedItem key={`${activity.activityType}-${activity.id}-${index}`} activity={activity} index={index} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Activity}
          title="No Activity Yet"
          message="Your activity log is empty. Use the 'Sync Activity' button in the header to simulate collecting new signals."
          buttonText="Learn How It Works"
          buttonLink="/help"
        />
      )}
    </div>
  );
};

export default ActivityLogPage;
