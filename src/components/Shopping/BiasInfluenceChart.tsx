import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { ShoppingPattern } from '../../types';
import useResponsiveChart from '../../hooks/useResponsiveChart';

interface BiasInfluenceChartProps {
  patterns: ShoppingPattern[];
}

const BiasInfluenceChart: React.FC<BiasInfluenceChartProps> = ({ patterns }) => {
  const { isMobile } = useResponsiveChart();
  
  const getOption = () => {
    const biasInfluence = patterns.reduce((acc, pattern) => {
      acc[pattern.biasType] = (acc[pattern.biasType] || 0) + pattern.amount;
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(biasInfluence)
      .map(([bias, amount]) => ({ name: bias, value: amount }))
      .sort((a, b) => b.value - a.value);

    return {
      title: {
        text: 'Spending by Bias Type',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: isMobile ? '25%' : '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: {
          rotate: isMobile ? 45 : 30,
          fontSize: 10,
          color: '#6b7280',
          interval: 0,
        }
      },
      yAxis: {
        type: 'value',
        name: 'Amount ($)',
        nameTextStyle: {
          fontSize: 10,
        },
        axisLabel: {
          formatter: '${value}',
          fontSize: 10,
          color: '#6b7280'
        }
      },
      series: [
        {
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#6b7280'][index % 7]
            }
          })),
          type: 'bar',
          barWidth: '60%'
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
    >
      <ReactECharts
        option={getOption()}
        style={{ height: '300px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default BiasInfluenceChart;
