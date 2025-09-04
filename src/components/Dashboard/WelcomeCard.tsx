import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const WelcomeCard: React.FC = () => {
  const { profile } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 p-8 rounded-xl text-white shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Welcome, {profile?.username || 'User'}!</h2>
          </div>
          <p className="text-white/80 mb-4">
            You're ready to start your journey. The app automatically collects signals about your digital activities. Use the <span className="font-bold text-white">"Sync Activity"</span> button in the header to simulate this process.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/activity">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 font-semibold px-4 py-2 rounded-lg shadow flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>View Activity Log</span>
              </motion.button>
            </Link>
            <Link to="/help">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Learn How It Works
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Brain className="w-24 h-24 text-white/30" />
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
