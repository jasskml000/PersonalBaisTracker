import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../services/dataService';
import { useToast } from '../../contexts/ToastContext';
import { Loader2, Save } from 'lucide-react';
import AvatarUploader from './AvatarUploader';

const ProfileDetails: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile(user.id, { full_name: fullName, username });
      addToast({ title: 'Success', message: 'Profile updated successfully!', type: 'success' });
    } catch (error: any) {
      addToast({ title: 'Error', message: error.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <AvatarUploader />
        <div className="flex-1 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="email" value={user?.email || ''} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-900" />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSaving} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileDetails;
