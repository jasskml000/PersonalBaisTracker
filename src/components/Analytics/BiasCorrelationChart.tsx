import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import useResponsiveChart from '../../hooks/useResponsiveChart';
import { useChartTheme } from '../../hooks/useChartTheme';
import { BehaviorEntry } from '../../types';
import { calculateCorrelationMatrix } from '../../utils/analytics';

interface BiasCorrelationChartProps {
  behaviors: BehaviorEntry[];
}

const BiasCorrelationChart: React.FC<BiasCorrelationChartProps> = ({ behaviors }) => {
  const { isMobile } = useResponsiveChart();
  const chartTheme = useChartTheme();
  const { matrix, labels } = calculateCorrelationMatrix(behaviors);

  const getOption = () => ({
    title: {
      text: 'Bias Correlation Matrix',
      textStyle: { fontSize: isMobile ? 14 : 16, fontWeight: 600, color: chartTheme.textColor },
    },
    tooltip: {
      position: 'top',
      formatter: (params: any) => `Correlation: ${params.data[2].toFixed(2)}`,
      ...chartTheme.tooltip,
    },
    grid: {
      height: isMobile ? '55%' : '60%',
      top: '15%',
      bottom: isMobile ? '30%' : '20%',
      left: isMobile ? '18%' : '10%',
      right: '5%',
    },
    xAxis: {
      type: 'category',
      data: labels.map(l => isMobile ? l.substring(0, 7) + '.' : l),
      splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.05)'] } },
      axisLabel: { fontSize: 10, color: chartTheme.textColor, rotate: isMobile ? 45 : 30, interval: 0 },
    },
    yAxis: {
      type: 'category',
      data: labels.map(l => isMobile ? l.substring(0, 7) + '.' : l),
      splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.05)'] } },
      axisLabel: { fontSize: 10, color: chartTheme.textColor, interval: 0 },
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      itemWidth: isMobile ? 10 : 15,
      itemHeight: 12,
      textStyle: { fontSize: 10, color: chartTheme.textColor },
      inRange: { color: ['#ef4444', '#f8fafc', '#22c55e'] }
    },
    series: [{
      name: 'Correlation',
      type: 'heatmap',
      data: matrix,
      label: { show: !isMobile, fontSize: 10, color: '#000' },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
    }],
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
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

export default BiasCorrelationChart;
