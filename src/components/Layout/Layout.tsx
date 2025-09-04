import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileMenu from './MobileMenu';
import { useToast } from '../../contexts/ToastContext';
import Toast from '../UI/Toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toasts } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} />
        
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 md:pl-${isSidebarCollapsed ? '20' : '64'}`}>
          <Header onMenuClick={() => setMobileMenuOpen(true)} />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <BottomNav />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <div className="fixed top-5 right-5 z-[100] space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
