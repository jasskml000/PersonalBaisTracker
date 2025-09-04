import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { NewsSource } from '../../types';

interface ReliabilityChartProps {
  sources: NewsSource[];
}

const ReliabilityChart: React.FC<ReliabilityChartProps> = ({ sources }) => {
  const getOption = () => {
    return {
      title: {
        text: 'Source Reliability vs Usage',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const source = sources[params.dataIndex];
          return `${source.name}<br/>Reliability: ${source.reliability}%<br/>Articles: ${source.articlesRead}`;
        }
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '10%',
        top: '20%'
      },
      xAxis: {
        type: 'value',
        name: 'Articles Read',
        nameLocation: 'middle',
        nameGap: 25,
        axisLabel: {
          fontSize: 10,
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Reliability %',
        nameLocation: 'middle',
        nameGap: 40,
        axisLabel: {
          fontSize: 10,
          color: '#6b7280'
        }
      },
      series: [
        {
          type: 'scatter',
          symbolSize: (data: number[]) => Math.sqrt(data[0]) * 3,
          data: sources.map(source => [source.articlesRead, source.reliability]),
          itemStyle: {
            color: (params: any) => {
              const source = sources[params.dataIndex];
              return source.category === 'left' ? '#3b82f6' :
                     source.category === 'center' ? '#10b981' : '#f97316';
            },
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              opacity: 1
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

export default ReliabilityChart;
