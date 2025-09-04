import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { NewsSource } from '../../types';
import useResponsiveChart from '../../hooks/useResponsiveChart';

interface BiasDistributionProps {
  sources: NewsSource[];
}

const BiasDistribution: React.FC<BiasDistributionProps> = ({ sources }) => {
  const { isMobile } = useResponsiveChart();

  const getOption = () => {
    return {
      title: {
        text: 'Bias Score Distribution',
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
        bottom: isMobile ? '20%' : '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: sources.map(s => s.name),
        axisLabel: {
          rotate: isMobile ? 60 : 45,
          fontSize: 10,
          color: '#6b7280',
          interval: 0,
        }
      },
      yAxis: {
        type: 'value',
        name: 'Bias Score',
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
          data: sources.map(source => ({
            value: source.biasScore,
            itemStyle: {
              color: source.category === 'left' ? '#3b82f6' :
                     source.category === 'center' ? '#10b981' : '#f97316'
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

export default BiasDistribution;
