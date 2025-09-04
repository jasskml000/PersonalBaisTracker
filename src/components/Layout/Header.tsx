import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, LogOut, Menu, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { syncNewActivity } from '../../services/dataService';
import { useToast } from '../../contexts/ToastContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, profile, signOut } = useAuth();
  const { addToast } = useToast();
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    try {
      await syncNewActivity(user.id);
      addToast({ title: 'Sync Complete', message: 'New activity signals have been collected.', type: 'success' });
    } catch (error: any) {
      addToast({ title: 'Sync Error', message: error.message, type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };


  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="md:hidden">
            <button onClick={onMenuClick} className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
           <motion.button
            onClick={handleSync}
            disabled={isSyncing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-2 text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium">{isSyncing ? 'Syncing...' : 'Sync Activity'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          
          <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 bg-primary-50 dark:bg-gray-700 rounded-lg hover:bg-primary-100 dark:hover:bg-gray-600 transition-colors">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="User Avatar" className="w-6 h-6 rounded-full" />
            ) : (
              <User className="w-5 h-5 text-primary-700 dark:text-primary-300" />
            )}
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{profile?.username || user?.email}</span>
          </Link>
        </div>

        {/* Mobile User Icon */}
        <div className="md:hidden">
           <Link to="/profile" className="p-2 bg-primary-100 dark:bg-gray-700 rounded-full">
            {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="User Avatar" className="w-6 h-6 rounded-full" />
            ) : (
                <User className="w-5 h-5 text-primary-600 dark:text-primary-300" />
            )}
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
