import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import ConfirmationModal from '../UI/ConfirmationModal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, profile, signOut } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    onClose();
    signOut();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 z-50 shadow-lg flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Menu</h2>
              <button onClick={onClose} className="p-1 text-gray-500 dark:text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6">
              <NavLink to="/profile" onClick={onClose} className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="User Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user?.email}</span>
              </NavLink>

              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="w-6 h-6" />
                  <h3 className="font-semibold">Upgrade to Pro</h3>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Get advanced analytics and unlimited tracking
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-primary-600 font-medium py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                onClick={() => setShowSignOutModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
      {showSignOutModal && (
        <ConfirmationModal
          title="Confirm Sign Out"
          message="Are you sure you want to sign out?"
          confirmText="Sign Out"
          onConfirm={handleSignOut}
          onClose={() => setShowSignOutModal(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
