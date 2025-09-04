export interface BiasMetric {
  id: string;
  type: 'confirmation' | 'availability' | 'anchoring' | 'representativeness' | 'optimism' | 'loss_aversion';
  value: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

export interface NewsSource {
  id: string;
  name: string;
  biasScore: number;
  articlesRead: number;
  category: 'left' | 'center' | 'right';
  reliability: number;
}

export interface ShoppingPattern {
  id: string;
  category: string;
  amount: number;
  date: Date;
  biasType: string;
  impulse: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  completed: boolean;
  reward: string;
}

export interface BehaviorEntry {
  id: string;
  timestamp: Date;
  activity: string;
  biasDetected: string[];
  confidence: number;
  notes?: string;
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
    challenges: boolean;
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
    shareProgress: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    currency: string;
  };
  tracking: {
    autoDetection: boolean;
    realTimeAnalysis: boolean;
    smartSuggestions: boolean;
  };
}
