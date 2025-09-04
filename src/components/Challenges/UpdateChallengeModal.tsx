import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Target } from 'lucide-react';
import { Challenge } from '../../types';

interface UpdateChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
  onUpdate: (newProgress: number) => void;
}

const UpdateChallengeModal: React.FC<UpdateChallengeModalProps> = ({ challenge, onClose, onUpdate }) => {
  const [progress, setProgress] = useState(challenge.progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(progress);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Progress</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{challenge.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Progress: {progress} / {challenge.target}
                </label>
                <input
                  type="range"
                  min="0"
                  max={challenge.target}
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateChallengeModal;
