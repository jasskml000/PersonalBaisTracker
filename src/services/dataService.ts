import { supabase } from '../lib/supabaseClient';
import { BiasMetric, NewsSource, Challenge, ShoppingPattern, BehaviorEntry } from '../types';
import { Tables, TablesInsert, TablesUpdate } from '../types/supabase';
import { faker } from '@faker-js/faker';

// --- MAPPING FUNCTIONS ---
export const mapBiasMetric = (data: Tables<'bias_metrics'>): BiasMetric => ({
  id: data.id.toString(),
  type: data.type,
  value: data.value,
  trend: data.trend,
  lastUpdated: new Date(data.created_at),
});

export const mapNewsSource = (data: Tables<'news_sources'>): NewsSource => ({
    id: data.id.toString(),
    name: data.name,
    biasScore: data.bias_score,
    articlesRead: data.articles_read,
    category: data.category,
    reliability: data.reliability,
});

export const mapChallenge = (data: Tables<'challenges'>): Challenge => ({
    id: data.id.toString(),
    title: data.title,
    description: data.description || '',
    type: data.type,
    progress: data.progress,
    target: data.target,
    completed: data.completed,
    reward: data.reward || '0 XP',
});

export const mapShoppingPattern = (data: Tables<'shopping_patterns'>): ShoppingPattern => ({
    id: data.id.toString(),
    category: data.category,
    amount: data.amount,
    date: new Date(data.purchase_date),
    biasType: data.bias_type,
    impulse: data.impulse,
});

export const mapBehaviorEntry = (data: Tables<'behavior_entries'>): BehaviorEntry => ({
    id: data.id.toString(),
    timestamp: new Date(data.timestamp),
    activity: data.activity,
    biasDetected: data.biases_detected,
    confidence: data.confidence,
    notes: data.notes || undefined,
});

export type UnifiedActivity = (BehaviorEntry | ShoppingPattern | NewsSource) & { activityType: 'behavior' | 'shopping' | 'news', timestamp: Date };

// --- DATA FETCHING SERVICES ---
export const getDashboardData = async (userId: string) => {
  if (!userId) throw new Error('User not authenticated');
  const [biasMetricsRes, newsSourcesRes, challengesRes, shoppingPatternsRes] = await Promise.all([
    supabase.from('bias_metrics').select('*').eq('user_id', userId),
    supabase.from('news_sources').select('*').eq('user_id', userId),
    supabase.from('challenges').select('*').eq('user_id', userId),
    supabase.from('shopping_patterns').select('*').eq('user_id', userId),
  ]);
  if (biasMetricsRes.error) throw biasMetricsRes.error;
  if (newsSourcesRes.error) throw newsSourcesRes.error;
  if (challengesRes.error) throw challengesRes.error;
  if (shoppingPatternsRes.error) throw shoppingPatternsRes.error;
  return {
    biasMetrics: biasMetricsRes.data.map(mapBiasMetric),
    newsSources: newsSourcesRes.data.map(mapNewsSource),
    challenges: challengesRes.data.map(mapChallenge),
    shoppingPatterns: shoppingPatternsRes.data.map(mapShoppingPattern),
  };
};

export const getBehaviorData = async (userId: string) => {
    if (!userId) throw new Error('User not authenticated');
    const { data, error } = await supabase.from('behavior_entries').select('*').eq('user_id', userId).order('timestamp', { ascending: false });
    if (error) throw error;
    return data.map(mapBehaviorEntry);
};

export const getNewsSources = async (userId: string) => {
    if (!userId) throw new Error('User not authenticated');
    const { data, error } = await supabase.from('news_sources').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapNewsSource);
};

export const deleteNewsSource = async (sourceId: string) => {
    const { error } = await supabase.from('news_sources').delete().eq('id', parseInt(sourceId));
    if (error) throw error;
};

export const getShoppingPatterns = async (userId: string) => {
    if (!userId) throw new Error('User not authenticated');
    const { data, error } = await supabase.from('shopping_patterns').select('*').eq('user_id', userId).order('purchase_date', { ascending: false });
    if (error) throw error;
    return data.map(mapShoppingPattern);
};

export const getChallenges = async (userId: string) => {
    if (!userId) throw new Error('User not authenticated');
    const { data, error } = await supabase.from('challenges').select('*').eq('user_id', userId);
    if (error) throw error;
    return data.map(mapChallenge);
};

export const updateChallenge = async (challengeId: string, updates: TablesUpdate<'challenges'>) => {
    const { data, error } = await supabase
        .from('challenges')
        .update(updates)
        .eq('id', parseInt(challengeId))
        .select()
        .single();
    if (error) throw error;
    return mapChallenge(data);
};

// --- USER PROFILE & SETTINGS ---
export const updateProfile = async (userId: string, updates: TablesUpdate<'profiles'>) => {
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
    if (error) throw error;
};

export const uploadAvatar = async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return publicUrl;
};

// --- DATA INSERTION SERVICES ---
const addBehaviorEntry = async (userId: string, entry: Omit<TablesInsert<'behavior_entries'>, 'user_id'>) => {
    const { error } = await supabase.from('behavior_entries').insert({ ...entry, user_id: userId });
    if (error) throw error;
};

const addShoppingPattern = async (userId: string, pattern: Omit<TablesInsert<'shopping_patterns'>, 'user_id'>) => {
    const { error } = await supabase.from('shopping_patterns').insert({ ...pattern, user_id: userId });
    if (error) throw error;
};

const addNewsSource = async (userId: string, source: Omit<TablesInsert<'news_sources'>, 'user_id' | 'articles_read'>) => {
    const { error } = await supabase.from('news_sources').insert({ ...source, user_id: userId, articles_read: 1 });
    if (error) throw error;
};

// --- AUTOMATED SIGNAL COLLECTION ---
export const syncNewActivity = async (userId: string) => {
    if (!userId) throw new Error('User not authenticated');
    const activities = [
        () => addBehaviorEntry(userId, {
            activity: faker.helpers.arrayElement(['Reading News', 'Social Media', 'Decision Making']),
            biases_detected: faker.helpers.arrayElements(['Confirmation Bias', 'Anchoring', 'Social Proof'], { min: 1, max: 2 }),
            confidence: faker.number.float({ min: 0.5, max: 1, precision: 0.1 }),
            timestamp: faker.date.recent({ days: 1 }).toISOString(),
        }),
        () => addShoppingPattern(userId, {
            category: faker.commerce.department(),
            amount: parseFloat(faker.commerce.price()),
            bias_type: faker.helpers.arrayElement(['Impulse', 'Scarcity', 'Social Proof']),
            impulse: faker.datatype.boolean(),
            purchase_date: faker.date.recent({ days: 1 }).toISOString(),
        }),
        () => addNewsSource(userId, {
            name: faker.helpers.arrayElement(['The Daily Chronicle', 'Global News Network', 'The Fact Checker', 'The Opinion Post']),
            bias_score: faker.number.float({ min: -5, max: 5, precision: 1 }),
            category: faker.helpers.arrayElement(['left', 'center', 'right']),
            reliability: faker.number.float({ min: 60, max: 95, precision: 1 }),
        }),
    ];
    // Add 1 to 3 new random activities
    const syncCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < syncCount; i++) {
        const randomActivity = faker.helpers.arrayElement(activities);
        await randomActivity();
    }
};

export const getCombinedActivityLog = async (userId: string): Promise<UnifiedActivity[]> => {
    if (!userId) throw new Error('User not authenticated');
    
    const [behaviorsRes, shoppingRes, newsRes] = await Promise.all([
        supabase.from('behavior_entries').select('*').eq('user_id', userId),
        supabase.from('shopping_patterns').select('*').eq('user_id', userId),
        supabase.from('news_sources').select('*').eq('user_id', userId)
    ]);

    if (behaviorsRes.error) throw behaviorsRes.error;
    if (shoppingRes.error) throw shoppingRes.error;
    if (newsRes.error) throw newsRes.error;

    const behaviors: UnifiedActivity[] = behaviorsRes.data.map(b => ({ ...mapBehaviorEntry(b), activityType: 'behavior' }));
    const shopping: UnifiedActivity[] = shoppingRes.data.map(s => ({ ...mapShoppingPattern(s), timestamp: new Date(s.purchase_date), activityType: 'shopping' }));
    const news: UnifiedActivity[] = newsRes.data.map(n => ({ ...mapNewsSource(n), timestamp: new Date(n.created_at), activityType: 'news' }));
    
    const combined = [...behaviors, ...shopping, ...news];
    
    return combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
