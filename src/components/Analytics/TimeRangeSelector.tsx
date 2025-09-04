import React from 'react';
import { motion } from 'framer-motion';

interface TimeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
  const ranges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {ranges.map((range) => (
        <motion.button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            value === range.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {range.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
