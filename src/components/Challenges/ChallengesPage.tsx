import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Plus, Filter, Award } from 'lucide-react';
import ChallengeGrid from './ChallengeGrid';
import ProgressOverview from './ProgressOverview';
import CreateChallengeModal from './CreateChallengeModal';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { getChallenges, updateChallenge } from '../../services/dataService';
import SkeletonGrid from '../UI/SkeletonGrid';
import EmptyState from '../UI/EmptyState';
import { useToast } from '../../contexts/ToastContext';
import { Challenge } from '../../types';

const ChallengesPage: React.FC = () => {
  const { user } = useAuth();
  const { data: challenges, loading, error, setData } = useData(() => getChallenges(user!.id), [user]);
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { addToast } = useToast();

  const handleUpdateChallenge = async (challengeId: string, newProgress: number) => {
    const challenge = challenges?.find(c => c.id === challengeId);
    if (!challenge) return;

    const isCompleted = newProgress >= challenge.target;
    try {
      const updatedChallenge = await updateChallenge(challengeId, {
        progress: newProgress,
        completed: isCompleted,
      });
      setData(prev => prev?.map(c => c.id === challengeId ? updatedChallenge : c) || []);
      if (isCompleted && !challenge.completed) {
        addToast({ title: 'Challenge Complete!', message: `You've earned ${challenge.reward}!`, type: 'success' });
      } else {
        addToast({ title: 'Progress Updated', message: `Your progress for "${challenge.title}" has been saved.`, type: 'info' });
      }
    } catch (err: any) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };
  
  if (loading) return <SkeletonGrid count={6} />;
  if (error) return <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;

  const filteredChallenges = challenges?.filter(challenge => {
    if (filter === 'all') return true;
    if (filter === 'active') return !challenge.completed;
    if (filter === 'completed') return challenge.completed;
    return challenge.type === filter;
  }) || [];

  const totalXP = challenges
    ?.filter(c => c.completed)
    .reduce((sum, c) => sum + parseInt(c.reward.split(' ')[0]), 0) || 0;

  const completedChallengesCount = challenges?.filter(c => c.completed).length || 0;
  const activeChallengesCount = challenges?.filter(c => !c.completed).length || 0;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Challenges</h2>
          <p className="text-gray-600 dark:text-gray-300">Build awareness through gamified bias detection challenges</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </motion.button>
      </motion.div>

      {challenges && challenges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-white/20 rounded-lg"><Trophy className="w-5 h-5" /></div><span className="text-sm opacity-90">Total</span></div><h3 className="text-sm font-medium opacity-90">Experience Points</h3><p className="text-2xl font-bold">{totalXP} XP</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-accent-100 dark:bg-accent-900/50 rounded-lg"><Award className="w-5 h-5 text-accent-600" /></div><span className="text-sm text-accent-600 font-medium">+{completedChallengesCount}</span></div><h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{completedChallengesCount}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2"><div className="p-2 bg-warning-100 dark:bg-warning-900/50 rounded-lg"><Filter className="w-5 h-5 text-warning-600" /></div><span className="text-sm text-warning-600 font-medium">{activeChallengesCount} active</span></div><h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">In Progress</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{activeChallengesCount}</p>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800">
              <option value="all">All Challenges</option><option value="active">Active</option><option value="completed">Completed</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option>
            </select>
          </div>
          <ProgressOverview challenges={challenges} />
          <ChallengeGrid challenges={filteredChallenges} onUpdate={handleUpdateChallenge} />
        </>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No Challenges Found"
          message="Create your first challenge to start building awareness and earning XP."
          buttonText="Create a Challenge"
          onButtonClick={() => setShowCreateModal(true)}
        />
      )}

      {showCreateModal && (
        <CreateChallengeModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default ChallengesPage;
