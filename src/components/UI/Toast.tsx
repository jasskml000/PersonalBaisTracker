import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  title: string;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    barColor: 'bg-green-500',
    textColor: 'text-green-800 dark:text-green-200',
  },
  error: {
    icon: XCircle,
    barColor: 'bg-red-500',
    textColor: 'text-red-800 dark:text-red-200',
  },
  info: {
    icon: Info,
    barColor: 'bg-blue-500',
    textColor: 'text-blue-800 dark:text-blue-200',
  },
  warning: {
    icon: AlertTriangle,
    barColor: 'bg-yellow-500',
    textColor: 'text-yellow-800 dark:text-yellow-200',
  },
};

const Toast: React.FC<ToastProps> = ({ id, message, type, title }) => {
  const { removeToast } = useToast();
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.barColor}`} />
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Icon className={`h-6 w-6 ${config.textColor}`} aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 break-words">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              className="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => removeToast(id)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
