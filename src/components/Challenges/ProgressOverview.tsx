import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { Challenge } from '../../types';

interface ProgressOverviewProps {
  challenges: Challenge[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ challenges }) => {
  const getOption = () => {
    const typeProgress = challenges.reduce((acc, challenge) => {
      const type = challenge.type;
      if (!acc[type]) {
        acc[type] = { completed: 0, total: 0 };
      }
      acc[type].total++;
      if (challenge.completed) {
        acc[type].completed++;
      }
      return acc;
    }, {} as Record<string, { completed: number; total: number }>);

    const data = Object.entries(typeProgress).map(([type, progress]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: progress.total > 0 ? (progress.completed / progress.total) * 100 : 0,
      completed: progress.completed,
      total: progress.total
    }));

    return {
      title: {
        text: 'Challenge Progress by Type',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const item = data[params.dataIndex];
          return `${params.name}<br/>Completed: ${item.completed}/${item.total}<br/>Progress: ${params.value.toFixed(1)}%`;
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#6b7280'
        }
      },
      series: [
        {
          name: 'Progress',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {c}%'
          },
          labelLine: {
            show: true
          },
          data: data.map((item, index) => ({
            name: item.name,
            value: item.value,
            itemStyle: {
              color: ['#8b5cf6', '#3b82f6', '#10b981'][index % 3]
            }
          }))
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <ReactECharts
        option={getOption()}
        style={{ height: '300px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default ProgressOverview;
