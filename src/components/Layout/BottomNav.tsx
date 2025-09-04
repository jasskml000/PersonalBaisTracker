import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Activity, Trophy, User } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', path: '/', label: 'Home', icon: Home },
  { id: 'activity', path: '/activity', label: 'Log', icon: Activity },
  { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'challenges', path: '/challenges', label: 'Challenges', icon: Trophy },
  { id: 'profile', path: '/profile', label: 'Profile', icon: User },
];

const BottomNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-t-lg z-40">
      <nav className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
