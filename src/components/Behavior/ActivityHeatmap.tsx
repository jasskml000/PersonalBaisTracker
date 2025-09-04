import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { BehaviorEntry } from '../../types';
import { format, getHours, getDay } from 'date-fns';

interface ActivityHeatmapProps {
  behaviors: BehaviorEntry[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ behaviors }) => {
  const getOption = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i.toString());

    // Create activity matrix
    const activityMatrix: number[][] = Array(7).fill(null).map(() => Array(24).fill(0));
    
    behaviors.forEach(behavior => {
      const day = getDay(behavior.timestamp);
      const hour = getHours(behavior.timestamp);
      activityMatrix[day][hour]++;
    });

    // Convert to ECharts format
    const data = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        data.push([hour, day, activityMatrix[day][hour]]);
      }
    }

    const maxValue = Math.max(...data.map(d => d[2]));

    return {
      title: {
        text: 'Activity Patterns',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151'
        }
      },
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const hour = params.data[0];
          const day = days[params.data[1]];
          const count = params.data[2];
          return `${day} ${hour}:00<br/>Entries: ${count}`;
        }
      },
      grid: {
        height: '60%',
        top: '15%',
        left: '10%',
        right: '5%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        },
        axisLabel: {
          fontSize: 10,
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        },
        axisLabel: {
          fontSize: 12,
          color: '#6b7280'
        }
      },
      visualMap: {
        min: 0,
        max: maxValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        inRange: {
          color: ['#f3f4f6', '#8b5cf6']
        },
        textStyle: {
          fontSize: 10,
          color: '#6b7280'
        }
      },
      series: [{
        name: 'Activity',
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

export default ActivityHeatmap;
