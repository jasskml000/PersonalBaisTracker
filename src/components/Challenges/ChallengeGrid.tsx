import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Trophy, CheckCircle, Clock } from 'lucide-react';
import { Challenge } from '../../types';
import UpdateChallengeModal from './UpdateChallengeModal';

interface ChallengeGridProps {
  challenges: Challenge[];
  onUpdate: (challengeId: string, newProgress: number) => void;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges, onUpdate }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar className="w-4 h-4" />;
      case 'weekly': return <Target className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-900/50 dark:text-secondary-400 dark:border-secondary-700';
      case 'weekly': return 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/50 dark:text-primary-400 dark:border-primary-700';
      default: return 'bg-warning-100 text-warning-700 border-warning-200 dark:bg-warning-900/50 dark:text-warning-400 dark:border-warning-700';
    }
  };

  const getProgressColor = (progress: number, target: number, completed: boolean) => {
    if (completed) return 'bg-accent-500';
    const percentage = (progress / target) * 100;
    if (percentage >= 80) return 'bg-accent-500';
    if (percentage >= 50) return 'bg-warning-500';
    return 'bg-primary-500';
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all duration-300 flex flex-col ${
              challenge.completed ? 'border-accent-200 dark:border-accent-700 bg-accent-50/30 dark:bg-accent-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getTypeColor(challenge.type)}`}>
                  {getTypeIcon(challenge.type)}
                  <span>{challenge.type}</span>
                </div>
                {challenge.completed ? <CheckCircle className="w-5 h-5 text-accent-500" /> : <Clock className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{challenge.description}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{challenge.progress}/{challenge.target}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(challenge.progress, challenge.target, challenge.completed)}`}
                  style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Reward: {challenge.reward}</span>
                <span className={`text-xs font-medium ${challenge.completed ? 'text-accent-600' : 'text-gray-500 dark:text-gray-400'}`}>
                  {challenge.completed ? 'Completed!' : `${Math.round((challenge.progress / challenge.target) * 100)}% complete`}
                </span>
              </div>
            </div>
            {!challenge.completed && (
              <motion.button
                onClick={() => setSelectedChallenge(challenge)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Update Progress
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
      {selectedChallenge && (
        <UpdateChallengeModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onUpdate={(progress) => {
            onUpdate(selectedChallenge.id, progress);
            setSelectedChallenge(null);
          }}
        />
      )}
    </>
  );
};

export default ChallengeGrid;
