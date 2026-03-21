export const PLATFORMS = ['instagram', 'tiktok', 'youtube', 'x', 'facebook'] as const;
export const TOPICS = ['travel', 'food', 'fitness', 'beauty', 'business', 'marketing', 'gaming', 'pets', 'fashion', 'motivation', 'technology', 'education', 'photography', 'music', 'lifestyle', 'parenting', 'health', 'sports', 'art', 'diy', 'nature', 'comedy', 'real-estate', 'sustainability'] as const;
export const TONES = ['funny', 'cute', 'professional', 'luxury', 'minimalist', 'friendly', 'persuasive', 'inspirational', 'sarcastic', 'bold', 'casual', 'emotional'] as const;

export type Platform = typeof PLATFORMS[number];
export type Topic = typeof TOPICS[number];
export type Tone = typeof TONES[number];

// Helper to generate all combinations
export function getAllPagePaths(): { platform: string; topic?: string; tone?: string }[] {
  const paths: { platform: string; topic?: string; tone?: string }[] = [];
  for (const platform of PLATFORMS) {
    paths.push({ platform });
    for (const topic of TOPICS) {
      paths.push({ platform, topic });
      for (const tone of TONES) {
        paths.push({ platform, topic, tone });
      }
    }
  }
  return paths;
}

// Platform display info
export const PLATFORM_INFO: Record<Platform, { name: string; emoji: string; description: string }> = {
  instagram: { name: 'Instagram', emoji: '\u{1F4F8}', description: 'Create engaging Instagram captions that boost likes, comments, and followers.' },
  tiktok: { name: 'TikTok', emoji: '\u{1F3B5}', description: 'Write viral TikTok captions that get views and engagement.' },
  youtube: { name: 'YouTube', emoji: '\u{1F3AC}', description: 'Craft compelling YouTube titles and descriptions for more views.' },
  x: { name: 'X (Twitter)', emoji: '\u{1D54F}', description: 'Create punchy tweets and threads that get retweets and likes.' },
  facebook: { name: 'Facebook', emoji: '\u{1F465}', description: 'Write Facebook posts that drive engagement and shares.' },
};

export const TOPIC_INFO: Record<Topic, { name: string; emoji: string }> = {
  travel: { name: 'Travel', emoji: '\u{2708}\u{FE0F}' },
  food: { name: 'Food', emoji: '\u{1F355}' },
  fitness: { name: 'Fitness', emoji: '\u{1F4AA}' },
  beauty: { name: 'Beauty', emoji: '\u{1F484}' },
  business: { name: 'Business', emoji: '\u{1F4BC}' },
  marketing: { name: 'Marketing', emoji: '\u{1F4E2}' },
  gaming: { name: 'Gaming', emoji: '\u{1F3AE}' },
  pets: { name: 'Pets', emoji: '\u{1F43E}' },
  fashion: { name: 'Fashion', emoji: '\u{1F457}' },
  motivation: { name: 'Motivation', emoji: '\u{1F525}' },
  'technology': { name: 'Technology', emoji: '💻' },
  'education': { name: 'Education', emoji: '🎓' },
  'photography': { name: 'Photography', emoji: '📷' },
  'music': { name: 'Music', emoji: '🎵' },
  'lifestyle': { name: 'Lifestyle', emoji: '✨' },
  'parenting': { name: 'Parenting', emoji: '👶' },
  'health': { name: 'Health', emoji: '🌿' },
  'sports': { name: 'Sports', emoji: '⚽' },
  'art': { name: 'Art', emoji: '🎨' },
  'diy': { name: 'DIY', emoji: '🔨' },
  'nature': { name: 'Nature', emoji: '🌻' },
  'comedy': { name: 'Comedy', emoji: '😂' },
  'real-estate': { name: 'Real Estate', emoji: '🏠' },
  'sustainability': { name: 'Sustainability', emoji: '♻️' },
};

export const TONE_INFO: Record<Tone, { name: string; description: string }> = {
  funny: { name: 'Funny', description: 'Humorous and witty' },
  cute: { name: 'Cute', description: 'Sweet and adorable' },
  professional: { name: 'Professional', description: 'Polished and business-like' },
  luxury: { name: 'Luxury', description: 'Elegant and premium' },
  minimalist: { name: 'Minimalist', description: 'Clean and simple' },
  friendly: { name: 'Friendly', description: 'Warm and approachable' },
  persuasive: { name: 'Persuasive', description: 'Compelling and action-driven' },
  'inspirational': { name: 'Inspirational', description: 'Uplifting and motivating' },
  'sarcastic': { name: 'Sarcastic', description: 'Dry wit and irony' },
  'bold': { name: 'Bold', description: 'Confident and daring' },
  'casual': { name: 'Casual', description: 'Relaxed and laid-back' },
  'emotional': { name: 'Emotional', description: 'Heartfelt and touching' },
};
