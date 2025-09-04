import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { Brain, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      setMessage('Password reset link has been sent to your email.');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary-100 dark:bg-primary-900/50 rounded-2xl mb-4">
            <Brain className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>
            
            {message && <p className="text-sm text-center text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-300 p-3 rounded-lg">{message}</p>}
            {error && <p className="text-sm text-center text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-3 rounded-lg">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
