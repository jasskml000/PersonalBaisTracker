import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { ShoppingPattern } from '../../types';
import { format, subDays } from 'date-fns';

interface SpendingChartProps {
  patterns: ShoppingPattern[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ patterns }) => {
  const getOption = () => {
    // Group patterns by date
    const dailySpending = patterns.reduce((acc, pattern) => {
      const date = format(pattern.date, 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + pattern.amount;
      return acc;
    }, {} as Record<string, number>);

    // Create last 30 days data
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
      return {
        date,
        amount: dailySpending[date] || 0
      };
    });

    return {
      title: {
        text: 'Daily Spending Trend',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const data = params[0];
          return `${data.axisValue}<br/>Amount: $${data.value.toFixed(2)}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: last30Days.map(d => d.date),
        axisLabel: {
          formatter: (value: string) => format(new Date(value), 'MMM dd'),
          fontSize: 10,
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Amount ($)',
        axisLabel: {
          formatter: '${value}',
          fontSize: 10,
          color: '#6b7280'
        }
      },
      series: [
        {
          data: last30Days.map(d => d.amount),
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color: '#8b5cf6',
            width: 3
          },
          itemStyle: {
            color: '#8b5cf6'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
                { offset: 1, color: 'rgba(139, 92, 246, 0.1)' }
              ]
            }
          }
        }
      ]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
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

export default SpendingChart;
