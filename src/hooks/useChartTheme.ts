import { useTheme } from '../contexts/ThemeContext';

export const useChartTheme = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    return {
      textColor: '#e5e7eb', // gray-200
      axisLineColor: '#4b5563', // gray-600
      splitLineColor: '#374151', // gray-700
      legendTextColor: '#d1d5db', // gray-300
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // gray-800
        borderColor: '#4b5563', // gray-600
        textStyle: {
          color: '#f9fafb', // gray-50
        },
      },
    };
  }

  return {
    textColor: '#374151', // gray-700
    axisLineColor: '#d1d5db', // gray-300
    splitLineColor: '#e5e7eb', // gray-200
    legendTextColor: '#4b5563', // gray-600
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#1f2937', // gray-800
      },
    },
  };
};
