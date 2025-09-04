import { faker } from '@faker-js/faker';
import { BiasMetric, NewsSource, ShoppingPattern, Challenge, BehaviorEntry } from '../types';
import { subDays, startOfWeek, addDays, format } from 'date-fns';

export const generateBiasMetrics = (): BiasMetric[] => {
  const biasTypes = ['confirmation', 'availability', 'anchoring', 'representativeness', 'optimism', 'loss_aversion'] as const;
  const trends = ['up', 'down', 'stable'] as const;
  
  return biasTypes.map(type => ({
    id: faker.string.uuid(),
    type,
    value: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(1)),
    trend: faker.helpers.arrayElement(trends),
    lastUpdated: faker.date.recent({ days: 7 })
  }));
};

export const generateNewsSources = (): NewsSource[] => {
  const sources = [
    { name: 'BBC News', category: 'center' as const },
    { name: 'CNN', category: 'left' as const },
    { name: 'Fox News', category: 'right' as const },
    { name: 'Reuters', category: 'center' as const },
    { name: 'The Guardian', category: 'left' as const },
    { name: 'Wall Street Journal', category: 'right' as const },
    { name: 'NPR', category: 'left' as const },
    { name: 'Associated Press', category: 'center' as const },
    { name: 'New York Times', category: 'left' as const },
    { name: 'Washington Post', category: 'left' as const },
    { name: 'Financial Times', category: 'center' as const },
    { name: 'Bloomberg', category: 'center' as const }
  ];

  return sources.map(source => ({
    id: faker.string.uuid(),
    name: source.name,
    biasScore: parseFloat(faker.number.float({ min: -5, max: 5 }).toFixed(1)),
    articlesRead: faker.number.int({ min: 1, max: 50 }),
    category: source.category,
    reliability: parseFloat(faker.number.float({ min: 70, max: 95 }).toFixed(1))
  }));
};

export const generateShoppingPatterns = (): ShoppingPattern[] => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Health', 'Entertainment', 'Sports', 'Beauty', 'Automotive'];
  const biasTypes = ['Impulse', 'Social Proof', 'Scarcity', 'Authority', 'Anchoring', 'Loss Aversion', 'Bandwagon'];
  
  return Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    category: faker.helpers.arrayElement(categories),
    amount: parseFloat(faker.number.float({ min: 10, max: 500 }).toFixed(2)),
    date: faker.date.recent({ days: 30 }),
    biasType: faker.helpers.arrayElement(biasTypes),
    impulse: faker.datatype.boolean()
  }));
};

export const generateChallenges = (): Challenge[] => {
  const challenges = [
    { title: 'News Source Diversity', description: 'Read articles from 3 different political perspectives', type: 'daily' as const, target: 3 },
    { title: 'Confirmation Challenge', description: 'Seek out opposing viewpoints on topics you feel strongly about', type: 'weekly' as const, target: 5 },
    { title: 'Mindful Shopping', description: 'Wait 24 hours before making non-essential purchases', type: 'daily' as const, target: 1 },
    { title: 'Bias Reflection', description: 'Journal about daily bias observations', type: 'daily' as const, target: 1 },
    { title: 'Source Checking', description: 'Verify information from at least 2 independent sources', type: 'weekly' as const, target: 10 },
    { title: 'Devil\'s Advocate', description: 'Argue against your own position on controversial topics', type: 'weekly' as const, target: 3 },
    { title: 'Media Balance', description: 'Read equal amounts from left, center, and right sources', type: 'weekly' as const, target: 15 },
    { title: 'Purchase Pause', description: 'Implement a 5-minute wait before any online purchase', type: 'daily' as const, target: 5 }
  ];

  return challenges.map(challenge => ({
    id: faker.string.uuid(),
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    progress: faker.number.int({ min: 0, max: challenge.target }),
    target: challenge.target,
    completed: faker.datatype.boolean(),
    reward: `${faker.number.int({ min: 10, max: 100 })} XP`
  }));
};

export const generateBehaviorEntries = (): BehaviorEntry[] => {
  const activities = ['Reading News', 'Shopping Online', 'Social Media', 'Decision Making', 'Information Seeking', 'Financial Planning', 'Career Choices', 'Health Decisions'];
  const biases = ['Confirmation Bias', 'Availability Heuristic', 'Anchoring', 'Social Proof', 'Loss Aversion', 'Optimism Bias', 'Bandwagon Effect', 'Authority Bias'];
  
  return Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    timestamp: faker.date.recent({ days: 30 }),
    activity: faker.helpers.arrayElement(activities),
    biasDetected: faker.helpers.arrayElements(biases, { min: 1, max: 3 }),
    confidence: parseFloat(faker.number.float({ min: 0.5, max: 1 }).toFixed(2)),
    notes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined
  }));
};

export const generateWeeklyHeatmapData = () => {
  const data = [];
  const startDate = startOfWeek(new Date());
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      data.push([
        day,
        hour,
        faker.number.int({ min: 0, max: 10 })
      ]);
    }
  }
  
  return data;
};

export const generateTimeSeriesData = (days: number = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd'),
    value: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(1)),
    biasScore: parseFloat(faker.number.float({ min: 0, max: 10 }).toFixed(1))
  }));
};

export const generateCorrelationData = () => {
  return Array.from({ length: 50 }, () => [
    parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(1)),
    parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(1))
  ]);
};
