import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Newspaper } from 'lucide-react';
import SourcesList from './SourcesList';
import BiasDistribution from './BiasDistribution';
import ReliabilityChart from './ReliabilityChart';
import { getNewsSources, deleteNewsSource } from '../../services/dataService';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SkeletonGrid from '../UI/SkeletonGrid';
import EmptyState from '../UI/EmptyState';
import { useToast } from '../../contexts/ToastContext';

const NewsSourcesPage: React.FC = () => {
  const { user } = useAuth();
  const { data: sources, loading, error, setData } = useData(() => getNewsSources(user!.id), [user]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToast } = useToast();

  const handleDeleteSource = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news source?')) {
      try {
        await deleteNewsSource(id);
        setData(prev => prev?.filter(s => s.id !== id) || []);
        addToast({ title: 'Success', message: 'News source deleted.', type: 'success' });
      } catch (err: any) {
        addToast({ title: 'Error', message: err.message, type: 'error' });
      }
    }
  };

  if (loading) return <SkeletonGrid count={4} />;
  if (error) return <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;

  const filteredSources = sources?.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">News Insights</h2>
          <p className="text-gray-600 dark:text-gray-300">Analyze your news consumption patterns from automatically collected signals.</p>
        </div>
      </motion.div>

      {sources && sources.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search news sources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800">
              <option value="all">All Categories</option><option value="left">Left-leaning</option><option value="center">Center</option><option value="right">Right-leaning</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BiasDistribution sources={sources} />
            <ReliabilityChart sources={sources} />
          </div>
          <SourcesList sources={filteredSources} onDelete={handleDeleteSource} />
        </>
      ) : (
        <EmptyState
          icon={Newspaper}
          title="No News Data Collected"
          message="Your news consumption insights will appear here once the app detects activity."
          buttonText="Sync Activity"
          buttonLink="/activity"
        />
      )}
    </div>
  );
};

export default NewsSourcesPage;
