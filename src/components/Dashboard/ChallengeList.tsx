import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Calendar, CheckCircle } from 'lucide-react';
import { Challenge } from '../../types';

interface ChallengeListProps {
  challenges: Challenge[];
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Calendar className="w-4 h-4" />;
      case 'weekly':
        return <Target className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-secondary-100 text-secondary-700';
      case 'weekly':
        return 'bg-primary-100 text-primary-700';
      default:
        return 'bg-warning-100 text-warning-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Challenges</h3>
        <Trophy className="w-5 h-5 text-warning-500" />
      </div>

      <div className="space-y-4">
        {challenges.slice(0, 5).map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                  {challenge.completed && (
                    <CheckCircle className="w-4 h-4 text-accent-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(challenge.type)}`}>
                {getTypeIcon(challenge.type)}
                <span>{challenge.type}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%`
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Reward: {challenge.reward}</span>
                <span className={`font-medium ${
                  challenge.completed ? 'text-accent-600' : 'text-gray-500'
                }`}>
                  {challenge.completed ? 'Completed!' : 
                   `${Math.round((challenge.progress / challenge.target) * 100)}% complete`}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChallengeList;
