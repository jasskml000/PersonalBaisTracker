import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { ShoppingPattern } from '../../types';

interface CategoryBreakdownProps {
  patterns: ShoppingPattern[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ patterns }) => {
  const getOption = () => {
    const categorySpending = patterns.reduce((acc, pattern) => {
      acc[pattern.category] = (acc[pattern.category] || 0) + pattern.amount;
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(categorySpending)
      .map(([category, amount]) => ({ name: category, value: amount }))
      .sort((a, b) => b.value - a.value);

    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#6b7280'];

    return {
      title: {
        text: 'Spending by Category',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: ${c} ({d}%)'
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
          name: 'Spending',
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
          data: data.map((item, index) => ({
            ...item,
            itemStyle: { color: colors[index % colors.length] }
          }))
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
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

export default CategoryBreakdown;
