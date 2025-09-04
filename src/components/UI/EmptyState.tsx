import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  buttonText: string;
  buttonLink?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  buttonText,
  buttonLink,
  onButtonClick,
}) => {
  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      onClick={onButtonClick}
    >
      {buttonText}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12"
    >
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50">
        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
      {buttonLink ? <Link to={buttonLink}>{buttonContent}</Link> : buttonContent}
    </motion.div>
  );
};

export default EmptyState;
