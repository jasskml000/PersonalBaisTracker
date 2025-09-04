import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import useResponsiveChart from '../../hooks/useResponsiveChart';
import { useChartTheme } from '../../hooks/useChartTheme';
import { BehaviorEntry } from '../../types';
import { subDays, format, isWithinInterval } from 'date-fns';

interface TrendAnalysisChartProps {
  behaviors: BehaviorEntry[];
  timeRange: string;
}

const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({ behaviors, timeRange }) => {
  const { isMobile } = useResponsiveChart();
  const chartTheme = useChartTheme();

  const getOption = () => {
    const days = parseInt(timeRange.replace('d', '').replace('y', ''));
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);

    const filteredBehaviors = behaviors.filter(b => isWithinInterval(b.timestamp, { start: startDate, end: endDate }));

    const dataByDay = Array.from({ length: days }, (_, i) => {
      const date = subDays(endDate, i);
      const formattedDate = format(date, 'yyyy-MM-dd');
      return { date: formattedDate, count: 0 };
    }).reverse();

    const biasCountsByDay: Record<string, Record<string, number>> = {};

    filteredBehaviors.forEach(behavior => {
      const dateStr = format(behavior.timestamp, 'yyyy-MM-dd');
      if (!biasCountsByDay[dateStr]) {
        biasCountsByDay[dateStr] = {};
      }
      behavior.biasDetected.forEach(bias => {
        biasCountsByDay[dateStr][bias] = (biasCountsByDay[dateStr][bias] || 0) + 1;
      });
    });

    const allBiases = [...new Set(filteredBehaviors.flatMap(b => b.biasDetected))];

    const series = allBiases.slice(0, 5).map(bias => ({
      name: bias,
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      areaStyle: { opacity: 0.8 },
      emphasis: { focus: 'series' },
      data: dataByDay.map(d => biasCountsByDay[d.date]?.[bias] || 0),
    }));

    return {
      title: {
        text: 'Bias Trends Over Time',
        textStyle: { fontSize: isMobile ? 14 : 16, fontWeight: 600, color: chartTheme.textColor },
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, ...chartTheme.tooltip },
      legend: { data: allBiases.slice(0, 5), bottom: 0, textStyle: { fontSize: isMobile ? 10 : 12, color: chartTheme.legendTextColor } },
      grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: dataByDay.map(d => format(new Date(d.date), 'MMM dd')), axisLabel: { fontSize: 10, color: chartTheme.textColor } },
      yAxis: { type: 'value', axisLabel: { fontSize: 10, color: chartTheme.textColor } },
      series: series,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
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

export default TrendAnalysisChart;
