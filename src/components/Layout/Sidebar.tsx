import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, Newspaper, ShoppingBag, Activity, Trophy, User, HelpCircle, Home, ChevronLeft, Brain, Award, LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ConfirmationModal from '../UI/ConfirmationModal';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { profile, signOut } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', path: '/', label: 'Dashboard', icon: Home },
    { id: 'activity', path: '/activity', label: 'Activity Log', icon: Activity },
    { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'news', path: '/news', label: 'News Insights', icon: Newspaper },
    { id: 'shopping', path: '/shopping', label: 'Shopping Insights', icon: ShoppingBag },
    { id: 'challenges', path: '/challenges', label: 'Challenges', icon: Trophy },
  ];

  const bottomMenuItems = [
    { id: 'profile', path: '/profile', label: 'Profile & Settings', icon: User },
    { id: 'help', path: '/help', label: 'Help', icon: HelpCircle }
  ];

  return (
    <>
      <motion.aside
        animate={{ width: isCollapsed ? '5rem' : '16rem' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 hidden md:flex flex-col"
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary-600" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">BiasTracker</span>
            </div>
          </div>
          <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <Brain className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="space-y-4">
            <div className={`bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white transition-all duration-300 ${isCollapsed ? 'w-12 h-12 flex items-center justify-center' : ''}`}>
              {isCollapsed ? <Award className="w-6 h-6"/> : (
                <>
                  <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
                  <p className="text-sm text-white/80 mb-3">
                    Unlock advanced features
                  </p>
                  <button className="w-full bg-white text-primary-600 font-medium py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </>
              )}
            </div>

            <nav className="space-y-2">
              {bottomMenuItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
               <div className="flex items-center space-x-3 px-3 py-2.5">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="User Avatar" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-300" />
                    </div>
                  )}
                  {!isCollapsed && <span className="text-sm font-medium truncate">{profile?.username || profile?.full_name || 'User'}</span>}
                </div>
                <button 
                  onClick={() => setShowSignOutModal(true)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <LogOut className="w-5 h-5" />
                  {!isCollapsed && <span>Sign Out</span>}
                </button>
            </nav>
            
            <button 
              onClick={onToggle} 
              className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </motion.aside>

      {showSignOutModal && (
        <ConfirmationModal
          title="Confirm Sign Out"
          message="Are you sure you want to sign out of your account?"
          confirmText="Sign Out"
          onConfirm={signOut}
          onClose={() => setShowSignOutModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
