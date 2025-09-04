import { BehaviorEntry } from '../types';
import { getHours } from 'date-fns';

export const calculateDominantBias = (behaviors: BehaviorEntry[]): string => {
  if (!behaviors || behaviors.length === 0) return 'N/A';

  const biasCounts = behaviors
    .flatMap(b => b.biasDetected)
    .reduce((acc, bias) => {
      acc[bias] = (acc[bias] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return Object.keys(biasCounts).reduce((a, b) => biasCounts[a] > biasCounts[b] ? a : b, 'N/A');
};

export const calculatePeakTime = (behaviors: BehaviorEntry[]): string => {
  if (!behaviors || behaviors.length === 0) return 'N/A';

  const hourCounts = behaviors.reduce((acc, b) => {
    const hour = getHours(b.timestamp);
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const peakHour = parseInt(Object.keys(hourCounts).reduce((a, b) => hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b, '0'));

  return `${peakHour}:00 - ${peakHour + 1}:00`;
};

export const calculateCorrelationMatrix = (behaviors: BehaviorEntry[]) => {
  const allBiases = [...new Set(behaviors.flatMap(b => b.biasDetected))];
  const n = allBiases.length;
  const coOccurrenceMatrix = Array(n).fill(0).map(() => Array(n).fill(0));

  behaviors.forEach(behavior => {
    for (let i = 0; i < behavior.biasDetected.length; i++) {
      for (let j = i; j < behavior.biasDetected.length; j++) {
        const bias1 = behavior.biasDetected[i];
        const bias2 = behavior.biasDetected[j];
        const idx1 = allBiases.indexOf(bias1);
        const idx2 = allBiases.indexOf(bias2);
        if (idx1 !== -1 && idx2 !== -1) {
          coOccurrenceMatrix[idx1][idx2]++;
          if (i !== j) {
            coOccurrenceMatrix[idx2][idx1]++;
          }
        }
      }
    }
  });

  const correlationMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const num = coOccurrenceMatrix[i][j];
      const den = Math.sqrt(coOccurrenceMatrix[i][i] * coOccurrenceMatrix[j][j]);
      correlationMatrix[i][j] = den === 0 ? 0 : num / den;
      correlationMatrix[j][i] = correlationMatrix[i][j];
    }
  }

  const heatmapData = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      heatmapData.push([i, j, correlationMatrix[i][j] || 0]);
    }
  }

  return { matrix: heatmapData, labels: allBiases };
};
