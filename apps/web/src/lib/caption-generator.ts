import { Platform, Topic, Tone, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from './seo-data';

export interface CaptionRequest {
  platform: Platform;
  topic: Topic;
  tone: Tone;
  audience?: string;
  language?: string;
  keywords?: string[];
}

export interface CaptionResult {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
}

interface OpenAIMessageResponse {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
}

// Template-based caption generation (no API key needed)
const CAPTION_TEMPLATES: Record<string, string[]> = {
  'instagram-travel-funny': [
    "My passport has more stamps than my loyalty card #{topic}",
    "Plot twist: I didn't plan this trip, my credit card did",
    "Currently accepting applications for a travel buddy who won't hog the window seat",
    "My boss asked where I see myself in 5 years. Definitely not at my desk",
    "Jet lag is just my body's way of saying 'worth it'",
    "I followed my heart and it led me to the airport",
    "Traveling because therapy is expensive and flights are cheap... wait",
    "Sorry for what I said when I hadn't had my vacation yet",
    "Out of office. If urgent, still out of office",
    "I need 6 months of vacation, twice a year"
  ],
};

// Fallback template generators by component
const PLATFORM_HOOKS: Record<string, string[]> = {
  instagram: ["Double tap if you agree", "Save this for later", "Tag someone who needs this", "Link in bio for more", "Comment your favorite below"],
  tiktok: ["Wait for it...", "POV:", "This is your sign to", "Tell me without telling me", "The way I just--"],
  youtube: ["Watch till the end!", "Don't forget to subscribe", "This changed everything", "You won't believe what happened", "The truth about"],
  x: ["Thread:", "Hot take:", "Unpopular opinion:", "This.", "Let that sink in."],
  facebook: ["Share if you agree!", "Who else relates?", "Tag a friend who needs to see this", "Thoughts?", "Like if this made your day"],
};

const TOPIC_PHRASES: Record<string, string[]> = {
  travel: ["wanderlust hits different", "passport ready", "adventure awaits", "exploring new horizons", "travel diary"],
  food: ["foodie paradise", "taste test", "chef's kiss", "flavor explosion", "recipe reveal"],
  fitness: ["no pain no gain", "fitness journey", "workout complete", "gains loading", "stronger every day"],
  beauty: ["glow up", "beauty routine", "skin goals", "makeup magic", "self-care Sunday"],
  business: ["boss moves only", "hustle mode", "entrepreneur life", "growth mindset", "level up"],
  marketing: ["marketing hack", "growth strategy", "brand building", "viral potential", "engagement boost"],
  gaming: ["game on", "level up", "epic win", "clutch moment", "GG"],
  pets: ["fur baby", "paws and love", "pet parent life", "unconditional love", "cute overload"],
  fashion: ["outfit check", "style inspo", "OOTD", "fashion forward", "drip check"],
  motivation: ["keep going", "you got this", "dream big", "never give up", "rise and grind"],
  'technology': ["technology vibes", "technology life", "technology goals", "technology inspiration", "technology journey"],
  'education': ["education vibes", "education life", "education goals", "education inspiration", "education journey"],
  'photography': ["photography vibes", "photography life", "photography goals", "photography inspiration", "photography journey"],
  'music': ["music vibes", "music life", "music goals", "music inspiration", "music journey"],
  'lifestyle': ["lifestyle vibes", "lifestyle life", "lifestyle goals", "lifestyle inspiration", "lifestyle journey"],
  'parenting': ["parenting vibes", "parenting life", "parenting goals", "parenting inspiration", "parenting journey"],
  'health': ["health vibes", "health life", "health goals", "health inspiration", "health journey"],
  'sports': ["sports vibes", "sports life", "sports goals", "sports inspiration", "sports journey"],
  'art': ["art vibes", "art life", "art goals", "art inspiration", "art journey"],
  'diy': ["diy vibes", "diy life", "diy goals", "diy inspiration", "diy journey"],
  'nature': ["nature vibes", "nature life", "nature goals", "nature inspiration", "nature journey"],
  'comedy': ["comedy vibes", "comedy life", "comedy goals", "comedy inspiration", "comedy journey"],
  'real-estate': ["real estate vibes", "real estate life", "real estate goals", "real estate inspiration", "real estate journey"],
  'sustainability': ["sustainability vibes", "sustainability life", "sustainability goals", "sustainability inspiration", "sustainability journey"],
};

const TONE_MODIFIERS: Record<string, { prefix: string; suffix: string; style: string }> = {
  funny: { prefix: "Not me", suffix: "", style: "humorous and self-deprecating" },
  cute: { prefix: "The cutest thing about", suffix: "", style: "sweet and heartwarming" },
  professional: { prefix: "Here's why", suffix: "", style: "polished and insightful" },
  luxury: { prefix: "Elevate your", suffix: "", style: "elegant and aspirational" },
  minimalist: { prefix: "", suffix: ".", style: "clean and understated" },
  friendly: { prefix: "Hey friend!", suffix: "", style: "warm and welcoming" },
  persuasive: { prefix: "Stop scrolling.", suffix: "", style: "urgent and compelling" },
  'inspirational': { prefix: "", suffix: "", style: "uplifting and motivating" },
  'sarcastic': { prefix: "", suffix: "", style: "dry wit and irony" },
  'bold': { prefix: "", suffix: "", style: "confident and daring" },
  'casual': { prefix: "", suffix: "", style: "relaxed and laid-back" },
  'emotional': { prefix: "", suffix: "", style: "heartfelt and touching" },
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickItems<T>(arr: T[], seed: number, count: number): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count && i < arr.length; i++) {
    let idx = (seed + i * 7) % arr.length;
    while (used.has(idx)) idx = (idx + 1) % arr.length;
    used.add(idx);
    result.push(arr[idx]);
  }
  return result;
}

export function generateCaptions(req: CaptionRequest): CaptionResult {
  const seed = hashCode(`${req.platform}-${req.topic}-${req.tone}`);
  const platformName = PLATFORM_INFO[req.platform].name;
  const topicName = TOPIC_INFO[req.topic].name;
  const toneName = TONE_INFO[req.tone].name;
  const toneInfo = TONE_MODIFIERS[req.tone];
  const hooks = PLATFORM_HOOKS[req.platform];
  const phrases = TOPIC_PHRASES[req.topic];

  // Check for specific templates first
  const key = `${req.platform}-${req.topic}-${req.tone}`;
  const specificTemplates = CAPTION_TEMPLATES[key];

  let captions: string[];

  if (specificTemplates && specificTemplates.length >= 10) {
    captions = specificTemplates.map(t => t.replace('#{topic}', topicName));
  } else {
    // Generate from components
    captions = [
      `${toneInfo.prefix} ${phrases[seed % phrases.length]} on ${platformName} ${toneInfo.suffix}`.trim(),
      `${pickItems(hooks, seed, 1)[0]} ${phrases[(seed + 1) % phrases.length]} content that hits different`,
      `Your ${topicName.toLowerCase()} ${platformName} game is about to change ${toneInfo.suffix}`.trim(),
      `${toneName} ${topicName.toLowerCase()} content for your ${platformName} feed ${toneInfo.suffix}`.trim(),
      `Every ${platformName} creator needs this ${topicName.toLowerCase()} tip ${toneInfo.suffix}`.trim(),
      `The ${toneInfo.style} way to talk about ${topicName.toLowerCase()} ${toneInfo.suffix}`.trim(),
      `${topicName} + ${platformName} = the content your audience craves ${toneInfo.suffix}`.trim(),
      `Making ${topicName.toLowerCase()} content ${toneInfo.style} since day one ${toneInfo.suffix}`.trim(),
      `${pickItems(hooks, seed + 2, 1)[0]} why your ${topicName.toLowerCase()} posts aren't performing`,
      `The secret to ${toneInfo.style} ${topicName.toLowerCase()} posts on ${platformName} ${toneInfo.suffix}`.trim(),
    ];
  }

  const shortVariants = captions.slice(0, 5).map(c => {
    const words = c.split(' ').slice(0, 8);
    return words.join(' ') + (words.length < c.split(' ').length ? '...' : '');
  });

  const hashtags = [
    `#${topicName}`,
    `#${platformName}${topicName}`,
    `#${topicName.toLowerCase()}life`,
    `#${req.platform}tips`,
    `#${topicName.toLowerCase()}content`,
  ];

  if (req.keywords?.length) {
    for (const keyword of req.keywords.slice(0, 2)) {
      const normalized = keyword.replace(/[^a-zA-Z0-9]/g, '');
      if (normalized) hashtags.push(`#${normalized}`);
    }
  }

  const languageLabel = req.language ? ` in ${req.language}` : '';
  const audienceLabel = req.audience ? ` for ${req.audience}` : '';
  const keywordLabel = req.keywords?.length ? ` using keywords: ${req.keywords.join(', ')}` : '';

  const ctaSuggestion = `Try our free ${platformName} ${topicName} Caption Generator${languageLabel}${audienceLabel} to create more ${toneInfo.style} captions instantly${keywordLabel}.`;

  return { captions, shortVariants, hashtags: hashtags.slice(0, 5), ctaSuggestion };
}

async function generateWithOpenAI(req: CaptionRequest): Promise<CaptionResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const platformName = PLATFORM_INFO[req.platform].name;
  const topicName = TOPIC_INFO[req.topic].name;
  const toneName = TONE_INFO[req.tone].name;

  const prompt = [
    'You are a social media copywriting assistant.',
    `Generate captions for platform: ${platformName}.`,
    `Topic: ${topicName}. Tone: ${toneName}.`,
    `Language: ${req.language || 'english'}.`,
    `Audience: ${req.audience || 'general audience'}.`,
    `Keywords: ${req.keywords?.join(', ') || 'none'}.`,
    'Return strict JSON with keys: captions (10 items), shortVariants (5 items), hashtags (5 items), ctaSuggestion (string).',
    'No markdown, no extra text.',
  ].join('\n');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'You output valid JSON only.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return null;

    const parsed = JSON.parse(text) as OpenAIMessageResponse;
    if (!Array.isArray(parsed.captions) || !Array.isArray(parsed.shortVariants) || !Array.isArray(parsed.hashtags) || typeof parsed.ctaSuggestion !== 'string') {
      return null;
    }

    return {
      captions: parsed.captions.slice(0, 10),
      shortVariants: parsed.shortVariants.slice(0, 5),
      hashtags: parsed.hashtags.slice(0, 5),
      ctaSuggestion: parsed.ctaSuggestion,
    };
  } catch {
    return null;
  }
}

export async function generateCaptionsWithProvider(req: CaptionRequest): Promise<CaptionResult> {
  const llmResult = await generateWithOpenAI(req);
  if (llmResult) return llmResult;
  return generateCaptions(req);
}
