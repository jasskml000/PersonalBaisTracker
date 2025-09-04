import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { BehaviorEntry } from '../../types';
import useResponsiveChart from '../../hooks/useResponsiveChart';

interface BiasFrequencyChartProps {
  behaviors: BehaviorEntry[];
}

const BiasFrequencyChart: React.FC<BiasFrequencyChartProps> = ({ behaviors }) => {
  const { isMobile } = useResponsiveChart();

  const getOption = () => {
    const biasFrequency = behaviors.reduce((acc, behavior) => {
      behavior.biasDetected.forEach(bias => {
        acc[bias] = (acc[bias] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(biasFrequency)
      .map(([bias, count]) => ({ name: bias, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return {
      title: {
        text: 'Most Frequent Biases',
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
        name: 'Frequency',
        nameTextStyle: {
          fontSize: 10,
        },
        axisLabel: {
          fontSize: 10,
          color: '#6b7280'
        }
      },
      series: [
        {
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#6b7280', '#ec4899'][index % 8]
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
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

export default BiasFrequencyChart;
