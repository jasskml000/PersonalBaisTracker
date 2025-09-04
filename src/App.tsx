import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import AuthPage from './components/Auth/AuthPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import Dashboard from './components/Dashboard';
import AnalyticsPage from './components/Analytics/AnalyticsPage';
import NewsSourcesPage from './components/News/NewsSourcesPage';
import ShoppingPatternsPage from './components/Shopping/ShoppingPatternsPage';
import ActivityLogPage from './components/ActivityLog/ActivityLogPage';
import ChallengesPage from './components/Challenges/ChallengesPage';
import ProfilePage from './components/Profile/ProfilePage';
import HelpPage from './components/Help/HelpPage';
import { Loader2 } from 'lucide-react';

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {session ? (
          <Route path="/*" element={<ProtectedRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </AnimatePresence>
  );
}

const PublicRoutes = () => (
  <Routes>
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="*" element={<AuthPage />} />
  </Routes>
);

const ProtectedRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/news" element={<NewsSourcesPage />} />
      <Route path="/shopping" element={<ShoppingPatternsPage />} />
      <Route path="/activity" element={<ActivityLogPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  </Layout>
);

export default App;
