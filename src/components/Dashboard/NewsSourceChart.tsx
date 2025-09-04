import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { NewsSource } from '../../types';
import useResponsiveChart from '../../hooks/useResponsiveChart';
import { useChartTheme } from '../../hooks/useChartTheme';

interface NewsSourceChartProps {
  sources: NewsSource[];
}

const NewsSourceChart: React.FC<NewsSourceChartProps> = ({ sources }) => {
  const { isMobile } = useResponsiveChart();
  const chartTheme = useChartTheme();

  const getOption = () => {
    const leftSources = sources.filter(s => s.category === 'left');
    const centerSources = sources.filter(s => s.category === 'center');
    const rightSources = sources.filter(s => s.category === 'right');

    return {
      title: {
        text: 'News Source Distribution',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 600,
          color: chartTheme.textColor
        },
        left: 'center',
        top: 0,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        ...chartTheme.tooltip
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        textStyle: {
          fontSize: isMobile ? 10 : 12,
          color: chartTheme.legendTextColor
        }
      },
      series: [
        {
          name: 'Sources',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: isMobile ? '#1f2937' : '#ffffff', // dark:bg-gray-800 or bg-white
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { 
              value: leftSources.length, 
              name: 'Left-leaning',
              itemStyle: { color: '#3b82f6' }
            },
            { 
              value: centerSources.length, 
              name: 'Center',
              itemStyle: { color: '#10b981' }
            },
            { 
              value: rightSources.length, 
              name: 'Right-leaning',
              itemStyle: { color: '#f97316' }
            }
          ]
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
    >
      <ReactECharts
        option={getOption()}
        style={{ height: '300px' }}
        opts={{ renderer: 'svg' }}
      />
      
      <div className="mt-4 space-y-2">
        {sources.slice(0, 5).map((source, index) => (
          <div key={source.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                source.category === 'left' ? 'bg-secondary-500' :
                source.category === 'center' ? 'bg-accent-500' : 'bg-warning-500'
              }`} />
              <span className="text-gray-700 dark:text-gray-300">{source.name}</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {source.articlesRead} articles
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NewsSourceChart;
