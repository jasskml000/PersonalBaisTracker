import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { uploadAvatar, updateProfile } from '../../services/dataService';
import { useToast } from '../../contexts/ToastContext';
import { User, Upload, Loader2 } from 'lucide-react';

const AvatarUploader: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      if (!user) throw new Error('User not found.');

      const file = event.target.files[0];
      const newAvatarUrl = await uploadAvatar(user.id, file);
      
      await updateProfile(user.id, { avatar_url: newAvatarUrl });
      setAvatarUrl(newAvatarUrl);
      addToast({ title: 'Success', message: 'Avatar updated!', type: 'success' });
    } catch (error: any) {
      addToast({ title: 'Error', message: error.message, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {authLoading || uploading ? (
          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
        ) : avatarUrl ? (
          <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
        ) : (
          <User className="w-16 h-16 text-gray-400" />
        )}
      </div>
      <label
        htmlFor="avatar-upload"
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-full cursor-pointer"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <Upload className="w-8 h-8" />
        </div>
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default AvatarUploader;
