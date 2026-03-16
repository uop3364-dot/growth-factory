export type ContentType = 'youtube_video' | 'blog_post' | 'newsletter' | 'social_post' | 'podcast_episode' | 'product_page' | 'landing_page' | 'email_subject';
export type TitleNiche = 'technology' | 'marketing' | 'finance' | 'health' | 'education' | 'travel' | 'food' | 'fitness' | 'business' | 'lifestyle' | 'gaming' | 'photography' | 'music' | 'fashion' | 'creativity';
export type TitleStyle = 'clickbait' | 'seo_friendly' | 'professional' | 'viral' | 'storytelling' | 'listicle' | 'how_to' | 'question';

export const CONTENT_TYPES: { value: ContentType; label: string; emoji: string; maxChars: number }[] = [
  { value: 'youtube_video', label: 'YouTube Video', emoji: '🎬', maxChars: 100 },
  { value: 'blog_post', label: 'Blog Post', emoji: '📝', maxChars: 60 },
  { value: 'newsletter', label: 'Newsletter', emoji: '📧', maxChars: 65 },
  { value: 'social_post', label: 'Social Post', emoji: '📱', maxChars: 80 },
  { value: 'podcast_episode', label: 'Podcast Episode', emoji: '🎙️', maxChars: 90 },
  { value: 'product_page', label: 'Product Page', emoji: '🛍️', maxChars: 70 },
  { value: 'landing_page', label: 'Landing Page', emoji: '🚀', maxChars: 65 },
  { value: 'email_subject', label: 'Email Subject', emoji: '✉️', maxChars: 50 },
];

export const NICHES: { value: TitleNiche; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'business', label: 'Business' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'photography', label: 'Photography' },
  { value: 'music', label: 'Music' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'creativity', label: 'Creativity' },
];

export const STYLES: { value: TitleStyle; label: string; description: string }[] = [
  { value: 'clickbait', label: 'Clickbait', description: 'Curiosity-driven, attention-grabbing' },
  { value: 'seo_friendly', label: 'SEO-Friendly', description: 'Keyword-optimized for search' },
  { value: 'professional', label: 'Professional', description: 'Authoritative and polished' },
  { value: 'viral', label: 'Viral', description: 'Shareable and emotionally charged' },
  { value: 'storytelling', label: 'Storytelling', description: 'Narrative-driven and compelling' },
  { value: 'listicle', label: 'Listicle', description: 'Numbered lists and roundups' },
  { value: 'how_to', label: 'How-To', description: 'Tutorial and guide format' },
  { value: 'question', label: 'Question', description: 'Engaging question format' },
];

export interface TitleRequest {
  contentType: ContentType;
  niche: TitleNiche;
  style: TitleStyle;
  keywords?: string[];
  language?: string;
}

export interface TitleResult {
  titles: string[];
  variations: string[];
  seoTitles: string[];
  powerWords: string[];
  suggestion: string;
}

interface OpenAITitleResponse {
  titles: string[];
  variations: string[];
  seoTitles: string[];
  powerWords: string[];
  suggestion: string;
}

// --- Template data ---

const STYLE_TEMPLATES: Record<TitleStyle, string[]> = {
  clickbait: [
    "I Tried {topic} for 30 Days — Here's What Happened",
    "The {topic} Secret That {niche} Experts Don't Want You to Know",
    "Nobody Told Me This About {topic} (Until Now)",
    "Why Everyone Is Wrong About {topic} in {niche}",
    "This One {topic} Trick Changed Everything for Me",
    "I Can't Believe What Happened When I Tested {topic}",
    "The Shocking Truth About {topic} That Nobody Talks About",
    "Stop Doing {topic} Wrong — Here's the Right Way",
    "What Happened When I Quit {topic} for a Week",
    "You Won't Believe How {topic} Actually Works",
    "{topic} Is Dead. Here's What's Replacing It",
    "The Real Reason {topic} Is Blowing Up Right Now",
  ],
  seo_friendly: [
    "{topic}: The Complete {niche} Guide ({year})",
    "Best {topic} Strategies for {niche} in {year}",
    "{topic} for {niche}: Everything You Need to Know",
    "What Is {topic}? A Beginner's Guide to {niche}",
    "{topic} vs Alternatives: Which Is Best for {niche}?",
    "Top {topic} Tools and Resources for {niche} Professionals",
    "{topic} Tips: {number} Proven Methods for {niche}",
    "How {topic} Works: A Complete {niche} Breakdown",
    "The Ultimate {topic} Checklist for {niche} Success",
    "{topic} Best Practices Every {niche} Pro Should Know",
    "{niche} {topic} Guide: From Beginner to Expert",
    "A Data-Driven Look at {topic} in {niche}",
  ],
  professional: [
    "The Strategic Approach to {topic} in Modern {niche}",
    "Rethinking {topic}: A Framework for {niche} Leaders",
    "How {topic} Is Reshaping the {niche} Industry",
    "An Executive's Guide to {topic} in {niche}",
    "Building a Sustainable {topic} Strategy for {niche}",
    "The ROI of {topic}: What {niche} Teams Need to Know",
    "Navigating {topic} Challenges in Today's {niche} Landscape",
    "Unlocking {topic} Potential for {niche} Organizations",
    "A Data-Driven Perspective on {topic} in {niche}",
    "The Future of {topic}: Insights for {niche} Professionals",
    "Key {topic} Metrics Every {niche} Leader Should Track",
    "From Theory to Practice: {topic} in {niche}",
  ],
  viral: [
    "This {topic} Hack Is Breaking the Internet Right Now",
    "Everyone Needs to See This {topic} Discovery",
    "My {topic} Experiment Went Viral — Here's Why",
    "The {topic} Trend That's Taking {niche} by Storm",
    "I Showed My {topic} Results to Experts — Their Reaction Was Priceless",
    "Why Millions Are Obsessed With {topic} Right Now",
    "This {topic} Method Deserves Way More Attention",
    "The {topic} Moment That Changed {niche} Forever",
    "People Are Losing Their Minds Over This {topic} Reveal",
    "How One {topic} Post Reached 10 Million People",
    "The {niche} Community Can't Stop Talking About {topic}",
    "This Changes Everything We Knew About {topic}",
  ],
  storytelling: [
    "The Quiet Revolution Happening in {topic} Nobody's Talking About",
    "How I Went from Zero to Expert in {topic}",
    "The Day {topic} Changed My Entire {niche} Career",
    "What My Grandmother Taught Me About {topic}",
    "A Year of {topic}: Lessons, Failures, and Breakthroughs",
    "Behind the Scenes: The Real Story of {topic} in {niche}",
    "From Failure to Success: My {topic} Journey",
    "The Unlikely Connection Between {topic} and {niche} Mastery",
    "I Almost Gave Up on {topic} — Then This Happened",
    "The {topic} Lesson I Learned the Hard Way",
    "Confessions of a {niche} Professional: My {topic} Mistakes",
    "The {topic} Experiment That Changed How I Think About {niche}",
  ],
  listicle: [
    "{number} {topic} Tips That Will Transform Your {niche} Game",
    "Top {number} {topic} Mistakes to Avoid in {niche}",
    "{number} {topic} Hacks Every {niche} Creator Should Know",
    "The {number} Best {topic} Resources for {niche} Beginners",
    "{number} Surprising Facts About {topic} in {niche}",
    "{number} Proven {topic} Strategies That Actually Work",
    "{number} Things I Wish I Knew Before Starting {topic}",
    "The Only {number} {topic} Tools You Actually Need for {niche}",
    "{number} Underrated {topic} Techniques for {niche} Growth",
    "{number} {topic} Trends Shaping {niche} in {year}",
    "From {number} Experts: The Best {topic} Advice for {niche}",
    "{number} Quick {topic} Wins for Better {niche} Results",
  ],
  how_to: [
    "How to Master {topic} for {niche} in {year}",
    "How to Build a {topic} Strategy That Actually Drives Results",
    "How to Get Started with {topic} (Even If You're a Complete Beginner)",
    "How to Use {topic} to Grow Your {niche} Presence",
    "How to Avoid the Biggest {topic} Mistakes in {niche}",
    "Step-by-Step: How to Create a Winning {topic} Plan",
    "How to Turn {topic} Into Your {niche} Superpower",
    "How to Measure {topic} Success in {niche}",
    "How to Scale {topic} Without Burning Out",
    "How to Choose the Right {topic} Approach for {niche}",
    "How to Automate {topic} and Save Hours Every Week",
    "How to Stand Out with {topic} in a Crowded {niche} Market",
  ],
  question: [
    "Is {topic} the Future of {niche}?",
    "Why Aren't More People Talking About {topic} in {niche}?",
    "What If Everything You Know About {topic} Is Wrong?",
    "Can {topic} Really Transform Your {niche} Results?",
    "Are You Making These {topic} Mistakes in {niche}?",
    "What Would Happen If You Doubled Down on {topic}?",
    "Is {topic} Overrated or Underrated in {niche}?",
    "What's the Real Cost of Ignoring {topic}?",
    "Ready to Take Your {topic} Skills to the Next Level?",
    "What Makes {topic} So Powerful for {niche}?",
    "Should You Invest in {topic} This Year?",
    "How Much Is Bad {topic} Costing Your {niche} Business?",
  ],
};

const NICHE_TOPIC_MAP: Record<TitleNiche, string[]> = {
  technology: ['AI', 'Cloud Computing', 'Cybersecurity', 'Automation', 'No-Code', 'Machine Learning', 'APIs', 'DevOps'],
  marketing: ['Content Strategy', 'SEO', 'Email Marketing', 'Brand Building', 'Social Media', 'Conversion Optimization', 'Copywriting', 'Analytics'],
  finance: ['Investing', 'Budgeting', 'Passive Income', 'Crypto', 'Financial Planning', 'Tax Strategy', 'Wealth Building', 'Cash Flow'],
  health: ['Nutrition', 'Mental Health', 'Sleep Optimization', 'Wellness', 'Preventive Care', 'Mindfulness', 'Supplements', 'Longevity'],
  education: ['Online Learning', 'Study Methods', 'Skill Building', 'EdTech', 'Teaching Strategies', 'Curriculum Design', 'Learning Science', 'Certification'],
  travel: ['Budget Travel', 'Solo Travel', 'Digital Nomad Life', 'Adventure Travel', 'Travel Hacking', 'Destination Planning', 'Travel Photography', 'Cultural Immersion'],
  food: ['Meal Prep', 'Recipe Development', 'Food Photography', 'Restaurant Reviews', 'Nutrition Hacks', 'Cooking Techniques', 'Food Science', 'Kitchen Equipment'],
  fitness: ['Strength Training', 'HIIT Workouts', 'Recovery', 'Home Workouts', 'Mobility', 'Workout Programming', 'Bodyweight Training', 'Sports Performance'],
  business: ['Startup Growth', 'SaaS Strategy', 'Remote Teams', 'Leadership', 'Product-Market Fit', 'Scaling', 'Operations', 'Customer Retention'],
  lifestyle: ['Productivity', 'Minimalism', 'Morning Routines', 'Work-Life Balance', 'Habit Building', 'Self-Improvement', 'Time Management', 'Personal Branding'],
  gaming: ['Game Reviews', 'Esports', 'Streaming Setup', 'Game Development', 'Speedrunning', 'Gaming Hardware', 'Indie Games', 'Game Design'],
  photography: ['Portrait Photography', 'Editing Workflows', 'Lighting Techniques', 'Camera Gear', 'Composition', 'Photo Editing', 'Street Photography', 'Color Grading'],
  music: ['Music Production', 'Songwriting', 'Audio Engineering', 'Music Marketing', 'Beat Making', 'Mixing and Mastering', 'Music Theory', 'Live Performance'],
  fashion: ['Sustainable Fashion', 'Style Guides', 'Trend Forecasting', 'Wardrobe Building', 'Fashion Tech', 'Personal Styling', 'Capsule Wardrobes', 'Fashion Business'],
  creativity: ['Creative Process', 'Design Thinking', 'Visual Storytelling', 'Creative Tools', 'Ideation', 'Creative Blocks', 'Artistic Workflows', 'Creative Business'],
};

const POWER_WORDS_POOL: Record<TitleStyle, string[]> = {
  clickbait: ['Shocking', 'Secret', 'Unbelievable', 'Mind-Blowing', 'Insane', 'Hidden', 'Exposed', 'Banned', 'Controversial', 'Jaw-Dropping'],
  seo_friendly: ['Complete', 'Ultimate', 'Best', 'Guide', 'Review', 'Comparison', 'Tutorial', 'Step-by-Step', 'Definitive', 'Comprehensive'],
  professional: ['Strategic', 'Data-Driven', 'Proven', 'Scalable', 'Sustainable', 'Evidence-Based', 'Enterprise', 'Advanced', 'Executive', 'Systematic'],
  viral: ['Epic', 'Insane', 'Game-Changing', 'Explosive', 'Unstoppable', 'Legendary', 'Unreal', 'Next-Level', 'Breakthrough', 'Revolutionary'],
  storytelling: ['Journey', 'Confession', 'Revelation', 'Behind-the-Scenes', 'Untold', 'Intimate', 'Raw', 'Honest', 'Unexpected', 'Transformation'],
  listicle: ['Essential', 'Must-Know', 'Powerful', 'Underrated', 'Overlooked', 'Game-Changing', 'Critical', 'Surprising', 'Proven', 'Quick'],
  how_to: ['Easy', 'Simple', 'Actionable', 'Practical', 'Effective', 'Foolproof', 'Beginner-Friendly', 'Fast', 'Reliable', 'Tested'],
  question: ['Really', 'Actually', 'Truly', 'Still', 'Ever', 'Finally', 'Even', 'Exactly', 'Honestly', 'Seriously'],
};

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  youtube_video: 'YouTube video',
  blog_post: 'blog post',
  newsletter: 'newsletter',
  social_post: 'social media post',
  podcast_episode: 'podcast episode',
  product_page: 'product page',
  landing_page: 'landing page',
  email_subject: 'email subject line',
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

export function generateTitles(req: TitleRequest): TitleResult {
  const seed = hashCode(`${req.contentType}-${req.niche}-${req.style}`);
  const year = new Date().getFullYear();
  const nicheLabel = NICHES.find(n => n.value === req.niche)?.label || req.niche;
  const topics = NICHE_TOPIC_MAP[req.niche];
  const templates = STYLE_TEMPLATES[req.style];
  const contentLabel = CONTENT_TYPE_LABELS[req.contentType];
  const numbers = [5, 7, 10, 12, 15, 20, 25];

  // Pick a primary topic based on keywords or seed
  const primaryTopic = req.keywords?.length
    ? req.keywords[0]
    : topics[seed % topics.length];

  // Generate 10 titles from templates
  const selectedTemplates = pickItems(templates, seed, 10);
  const titles = selectedTemplates.map((tpl, i) => {
    const topicForThis = req.keywords?.length && req.keywords[i % req.keywords.length]
      ? req.keywords[i % req.keywords.length]
      : topics[(seed + i) % topics.length];
    return tpl
      .replace(/{topic}/g, topicForThis)
      .replace(/{niche}/g, nicheLabel)
      .replace(/{year}/g, String(year))
      .replace(/{number}/g, String(numbers[(seed + i) % numbers.length]));
  });

  // Generate 5 variations (shorter/alternate phrasing)
  const variationPrefixes = [
    `${primaryTopic} Made Simple`,
    `The ${primaryTopic} Playbook`,
    `${primaryTopic} 101`,
    `${primaryTopic}: What You're Missing`,
    `Rethinking ${primaryTopic}`,
  ];
  const variations = variationPrefixes.map((v, i) => {
    if (req.keywords?.length && req.keywords[i % req.keywords.length]) {
      return v.replace(primaryTopic, req.keywords[i % req.keywords.length]);
    }
    return v;
  });

  // Generate 3 SEO-optimized titles
  const seoTitles = [
    `${primaryTopic} for ${nicheLabel}: The Complete Guide (${year})`,
    `Best ${primaryTopic} Strategies for ${nicheLabel} | Free Guide`,
    `${primaryTopic} Tips & Tricks: ${nicheLabel} Edition (${year})`,
  ];

  // Pick 5 power words for the style
  const powerWords = pickItems(POWER_WORDS_POOL[req.style], seed, 5);

  // Generate suggestion
  const languageNote = req.language && req.language !== 'english' ? ` Try generating in ${req.language} for a localized audience.` : '';
  const keywordNote = req.keywords?.length ? ` Your keywords (${req.keywords.join(', ')}) have been incorporated into the titles.` : '';
  const charLimit = CONTENT_TYPES.find(c => c.value === req.contentType)?.maxChars || 70;
  const suggestion = `These titles are optimized for ${contentLabel} format. Aim for under ${charLimit} characters for best results.${keywordNote}${languageNote} Mix power words like "${powerWords[0]}" and "${powerWords[1]}" to boost click-through rates.`;

  return { titles, variations, seoTitles, powerWords, suggestion };
}

async function generateWithOpenAI(req: TitleRequest): Promise<TitleResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const nicheLabel = NICHES.find(n => n.value === req.niche)?.label || req.niche;
  const styleLabel = STYLES.find(s => s.value === req.style)?.label || req.style;
  const contentLabel = CONTENT_TYPE_LABELS[req.contentType];
  const charLimit = CONTENT_TYPES.find(c => c.value === req.contentType)?.maxChars || 70;

  const prompt = [
    'You are an expert headline and title copywriter.',
    `Generate titles for a ${contentLabel}.`,
    `Niche: ${nicheLabel}. Style: ${styleLabel}.`,
    `Language: ${req.language || 'english'}.`,
    `Keywords: ${req.keywords?.join(', ') || 'none'}.`,
    `Optimal character limit: ${charLimit} characters.`,
    'Return strict JSON with keys: titles (10 items), variations (5 shorter alternatives), seoTitles (3 SEO-optimized versions), powerWords (5 relevant power words), suggestion (one paragraph of advice).',
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

    const parsed = JSON.parse(text) as OpenAITitleResponse;
    if (!Array.isArray(parsed.titles) || !Array.isArray(parsed.variations) || !Array.isArray(parsed.seoTitles) || !Array.isArray(parsed.powerWords) || typeof parsed.suggestion !== 'string') {
      return null;
    }

    return {
      titles: parsed.titles.slice(0, 10),
      variations: parsed.variations.slice(0, 5),
      seoTitles: parsed.seoTitles.slice(0, 3),
      powerWords: parsed.powerWords.slice(0, 5),
      suggestion: parsed.suggestion,
    };
  } catch {
    return null;
  }
}

export async function generateTitlesWithProvider(req: TitleRequest): Promise<TitleResult> {
  const llmResult = await generateWithOpenAI(req);
  if (llmResult) return llmResult;
  return generateTitles(req);
}
