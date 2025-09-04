import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { generateWeeklyHeatmapData } from '../../utils/mockData';
import useResponsiveChart from '../../hooks/useResponsiveChart';
import { useChartTheme } from '../../hooks/useChartTheme';

const BehaviorHeatmap: React.FC = () => {
  const { isMobile } = useResponsiveChart();
  const chartTheme = useChartTheme();
  const data = generateWeeklyHeatmapData();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i.toString());

  const getOption = () => ({
    title: {
      text: 'Bias Activity Patterns',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 600,
        color: chartTheme.textColor
      },
      left: 'center'
    },
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        const day = days[params.data[0]];
        const hour = params.data[1];
        const value = params.data[2];
        return `${day} ${hour}:00<br/>Activity: ${value}`;
      },
      ...chartTheme.tooltip
    },
    grid: {
      height: '60%',
      top: '20%',
      left: isMobile ? '12%' : '10%',
      right: '5%',
      bottom: '20%'
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.05)']
        }
      },
      axisLabel: {
        fontSize: 10,
        color: chartTheme.textColor,
        interval: isMobile ? 3 : 1
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.05)']
        }
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 12,
        color: chartTheme.textColor
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      itemWidth: isMobile ? 10 : 15,
      itemHeight: isMobile ? 10 : 14,
      textStyle: {
        fontSize: 10,
        color: chartTheme.textColor
      },
      inRange: {
        color: isMobile ? ['#e0e7ff', '#6366f1'] : ['#c7d2fe', '#4f46e5']
      }
    },
    series: [{
      name: 'Bias Activity',
      type: 'heatmap',
      data: data,
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
    >
      <ReactECharts
        option={getOption()}
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default BehaviorHeatmap;
