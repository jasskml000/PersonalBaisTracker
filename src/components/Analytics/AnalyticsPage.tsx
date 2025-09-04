import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Brain } from 'lucide-react';
import BiasCorrelationChart from './BiasCorrelationChart';
import TrendAnalysisChart from './TrendAnalysisChart';
import InsightCards from './InsightCards';
import TimeRangeSelector from './TimeRangeSelector';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { getBehaviorData } from '../../services/dataService';
import SkeletonGrid from '../UI/SkeletonGrid';
import EmptyState from '../UI/EmptyState';
import { calculateDominantBias, calculatePeakTime } from '../../utils/analytics';
import { exportToCSV } from '../../utils/exportData';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  
  const { data: behaviors, loading, error } = useData(() => getBehaviorData(user!.id), [user]);

  const analyticsData = useMemo(() => {
    if (!behaviors || behaviors.length === 0) {
      return { dominantBias: 'N/A', peakTime: 'N/A' };
    }
    return {
      dominantBias: calculateDominantBias(behaviors),
      peakTime: calculatePeakTime(behaviors),
    };
  }, [behaviors]);

  const handleExport = () => {
    if (behaviors) {
      exportToCSV(behaviors, 'bias_behavior_data.csv');
    }
  };

  if (loading) return <SkeletonGrid count={6} />;
  if (error) return <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;

  if (!behaviors || behaviors.length === 0) {
    return (
      <EmptyState
        icon={Brain}
        title="Not Enough Data for Analytics"
        message="Log some behaviors to start seeing your advanced analytics and trends."
        buttonText="Log a Behavior"
        buttonLink="/behavior"
      />
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h2>
          <p className="text-gray-600 dark:text-gray-300">Deep insights into your bias patterns and behavioral trends</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          
          <motion.button
            onClick={handleExport}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      <InsightCards 
        dominantBias={analyticsData.dominantBias}
        peakTime={analyticsData.peakTime}
        totalEntries={behaviors.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrendAnalysisChart behaviors={behaviors} timeRange={timeRange} />
        <BiasCorrelationChart behaviors={behaviors} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
