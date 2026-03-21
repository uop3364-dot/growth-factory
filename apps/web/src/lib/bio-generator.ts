export type BioPlatform = 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'x';
export type BioNiche = 'creator' | 'entrepreneur' | 'freelancer' | 'marketer' | 'developer' | 'designer' | 'photographer' | 'fitness' | 'food' | 'travel' | 'student' | 'musician' | 'artist' | 'writer' | 'coach';
export type BioStyle = 'professional' | 'creative' | 'minimalist' | 'witty' | 'bold' | 'elegant' | 'casual' | 'motivational';

export const BIO_PLATFORMS: BioPlatform[] = ['instagram', 'tiktok', 'linkedin', 'youtube', 'x'];
export const BIO_NICHES: BioNiche[] = ['creator', 'entrepreneur', 'freelancer', 'marketer', 'developer', 'designer', 'photographer', 'fitness', 'food', 'travel', 'student', 'musician', 'artist', 'writer', 'coach'];
export const BIO_STYLES: BioStyle[] = ['professional', 'creative', 'minimalist', 'witty', 'bold', 'elegant', 'casual', 'motivational'];

export const PLATFORM_CHAR_LIMITS: Record<BioPlatform, number> = {
  instagram: 150,
  tiktok: 80,
  linkedin: 300,
  youtube: 1000,
  x: 160,
};

export const PLATFORM_LABELS: Record<BioPlatform, { name: string; emoji: string }> = {
  instagram: { name: 'Instagram', emoji: '📸' },
  tiktok: { name: 'TikTok', emoji: '🎵' },
  linkedin: { name: 'LinkedIn', emoji: '💼' },
  youtube: { name: 'YouTube', emoji: '🎬' },
  x: { name: 'X (Twitter)', emoji: '𝕏' },
};

export const NICHE_LABELS: Record<BioNiche, { name: string; emoji: string }> = {
  creator: { name: 'Content Creator', emoji: '🎨' },
  entrepreneur: { name: 'Entrepreneur', emoji: '🚀' },
  freelancer: { name: 'Freelancer', emoji: '💻' },
  marketer: { name: 'Marketer', emoji: '📊' },
  developer: { name: 'Developer', emoji: '👨‍💻' },
  designer: { name: 'Designer', emoji: '✏️' },
  photographer: { name: 'Photographer', emoji: '📷' },
  fitness: { name: 'Fitness', emoji: '💪' },
  food: { name: 'Food', emoji: '🍳' },
  travel: { name: 'Travel', emoji: '✈️' },
  student: { name: 'Student', emoji: '📚' },
  musician: { name: 'Musician', emoji: '🎸' },
  artist: { name: 'Artist', emoji: '🖌️' },
  writer: { name: 'Writer', emoji: '✍️' },
  coach: { name: 'Coach', emoji: '🏆' },
};

export const STYLE_LABELS: Record<BioStyle, { name: string; description: string }> = {
  professional: { name: 'Professional', description: 'Clean and credible' },
  creative: { name: 'Creative', description: 'Unique and artistic' },
  minimalist: { name: 'Minimalist', description: 'Less is more' },
  witty: { name: 'Witty', description: 'Clever and humorous' },
  bold: { name: 'Bold', description: 'Confident and direct' },
  elegant: { name: 'Elegant', description: 'Refined and polished' },
  casual: { name: 'Casual', description: 'Relaxed and friendly' },
  motivational: { name: 'Motivational', description: 'Inspiring and uplifting' },
};

export interface BioRequest {
  platform: BioPlatform;
  niche: BioNiche;
  style: BioStyle;
  keywords?: string[];
  language?: string;
}

export interface BioResult {
  bios: string[];
  shortBios: string[];
  emojiBios: string[];
  callToAction: string;
}

// --- Template Data ---

const NICHE_TITLES: Record<BioNiche, string[]> = {
  creator: ['Content Creator', 'Digital Creator', 'Creator', 'Creative'],
  entrepreneur: ['Entrepreneur', 'Founder', 'Business Owner', 'Startup Founder'],
  freelancer: ['Freelancer', 'Independent Professional', 'Self-Employed Creative', 'Freelance Pro'],
  marketer: ['Digital Marketer', 'Marketing Strategist', 'Growth Marketer', 'Brand Strategist'],
  developer: ['Software Developer', 'Full-Stack Dev', 'Code Architect', 'Developer'],
  designer: ['Designer', 'Creative Director', 'UX/UI Designer', 'Visual Designer'],
  photographer: ['Photographer', 'Visual Storyteller', 'Lens Artist', 'Photo Creator'],
  fitness: ['Fitness Coach', 'Personal Trainer', 'Fitness Enthusiast', 'Wellness Advocate'],
  food: ['Foodie', 'Food Creator', 'Recipe Developer', 'Culinary Explorer'],
  travel: ['Traveler', 'Travel Creator', 'Globe Trotter', 'Adventure Seeker'],
  student: ['Student', 'Lifelong Learner', 'Future Leader', 'Knowledge Seeker'],
  musician: ['Musician', 'Artist', 'Music Producer', 'Singer-Songwriter'],
  artist: ['Artist', 'Creative Soul', 'Visual Artist', 'Mixed Media Artist'],
  writer: ['Writer', 'Wordsmith', 'Storyteller', 'Author'],
  coach: ['Coach', 'Mentor', 'Life Coach', 'Performance Coach'],
};

const STYLE_TEMPLATES: Record<BioStyle, (niche: BioNiche, nicheTitle: string, platform: BioPlatform) => string[]> = {
  professional: (niche, nicheTitle, platform) => [
    `${nicheTitle} | Helping brands grow through authentic storytelling`,
    `${nicheTitle} specializing in strategic growth and digital innovation`,
    `Passionate ${nicheTitle.toLowerCase()} dedicated to delivering results that matter`,
    `Building impactful ${niche} solutions | Open to collaborations`,
    `${nicheTitle} with a mission to create value and drive meaningful change`,
    `Turning ideas into impact | ${nicheTitle} | DM for inquiries`,
    `${nicheTitle} focused on quality, consistency, and audience growth`,
    `Results-driven ${nicheTitle.toLowerCase()} | Strategy + Execution`,
  ],
  creative: (niche, nicheTitle) => [
    `${nicheTitle} painting the internet one post at a time`,
    `Half ${niche}, half daydreamer, fully committed to the craft`,
    `Creating things that make strangers on the internet feel something`,
    `${nicheTitle} | Turning caffeine into content since forever`,
    `Where ${niche} meets imagination | Creating the unexpected`,
    `${nicheTitle} by day, creative rebel by night`,
    `Making the digital world a little more colorful | ${nicheTitle}`,
    `${nicheTitle} with a wild imagination and WiFi`,
  ],
  minimalist: (_niche, nicheTitle) => [
    `${nicheTitle}.`,
    `Create. Share. Repeat.`,
    `${nicheTitle} | Less noise, more value.`,
    `Simple work. Real results.`,
    `${nicheTitle} | Quality over quantity.`,
    `Making things. Sharing things.`,
    `${nicheTitle} | Here to create.`,
    `Work. Create. Grow.`,
  ],
  witty: (niche, nicheTitle) => [
    `Professional overthinker. Amateur ${nicheTitle.toLowerCase()}.`,
    `Creating content nobody asked for but everyone needed`,
    `I post, therefore I am | ${nicheTitle}`,
    `${nicheTitle} who peaked in creativity, not in height`,
    `My ${niche} skills are better than my cooking skills (low bar)`,
    `Doing ${niche} stuff so you don't have to figure it out yourself`,
    `${nicheTitle} | Fueled by coffee and existential dread`,
    `I put the "pro" in procrastination and the "create" in ${nicheTitle.toLowerCase()}`,
  ],
  bold: (niche, nicheTitle) => [
    `${nicheTitle} | No excuses. No shortcuts. Just results.`,
    `Building an empire, one post at a time | ${nicheTitle}`,
    `The ${niche} game will never be the same | Watch this space`,
    `Unapologetically ${niche} | Here to dominate, not participate`,
    `${nicheTitle} on a mission to change the game`,
    `Breaking rules and setting standards | ${nicheTitle}`,
    `Your favorite ${nicheTitle.toLowerCase()}'s favorite ${nicheTitle.toLowerCase()}`,
    `${nicheTitle} | Born to stand out, not fit in`,
  ],
  elegant: (_niche, nicheTitle) => [
    `${nicheTitle} | Curating beauty in every detail`,
    `Elevating the everyday through thoughtful creation`,
    `${nicheTitle} | Where sophistication meets substance`,
    `Crafting experiences that inspire and endure`,
    `${nicheTitle} | Grace, grit, and creative vision`,
    `Refined approach to modern creation | ${nicheTitle}`,
    `${nicheTitle} | Timeless work in a fast-moving world`,
    `Artistry meets intention | ${nicheTitle}`,
  ],
  casual: (niche, nicheTitle) => [
    `Just a ${nicheTitle.toLowerCase()} sharing the journey`,
    `${nicheTitle} vibes | Come hang out`,
    `Doing ${niche} things and having a great time`,
    `Your friendly neighborhood ${nicheTitle.toLowerCase()}`,
    `${nicheTitle} | Just here for a good time honestly`,
    `Living the ${niche} life one day at a time`,
    `Chill ${nicheTitle.toLowerCase()} | DMs always open`,
    `Making ${niche} content because why not`,
  ],
  motivational: (niche, nicheTitle) => [
    `${nicheTitle} | Dream big. Start small. Act now.`,
    `Proving every day that your ${niche} dreams are valid`,
    `From zero to ${nicheTitle.toLowerCase()} | Your journey starts today`,
    `${nicheTitle} | Turning setbacks into comebacks`,
    `Every expert was once a beginner | ${nicheTitle}`,
    `Building the ${niche} life I always envisioned | Join me`,
    `${nicheTitle} | The best time to start was yesterday. The next best is now.`,
    `Chasing excellence, not perfection | ${nicheTitle}`,
  ],
};

const PLATFORM_SHORT_TEMPLATES: Record<BioPlatform, (nicheTitle: string) => string[]> = {
  instagram: (t) => [`${t} | Link in bio`, `${t} | DM to collab`, `${t} | Creating daily`, `${t} | Follow for more`],
  tiktok: (t) => [`${t} | New vids daily`, `${t} | Follow me`, `${t} | Let's go`, `Watch this | ${t}`],
  linkedin: (t) => [`${t} | Open to connect`, `${t} | Let's build together`, `${t} | Hiring & connecting`, `${t} | Growing every day`],
  youtube: (t) => [`${t} | Subscribe for more`, `${t} | New videos weekly`, `${t} | Hit the bell`, `${t} | Join the community`],
  x: (t) => [`${t} | Thoughts & threads`, `${t} | Tweets that matter`, `${t} | Hot takes daily`, `${t} | Join the convo`],
};

const EMOJI_SETS: Record<BioNiche, string[]> = {
  creator: ['🎨', '✨', '🎬', '📱', '🔥'],
  entrepreneur: ['🚀', '💡', '📈', '💰', '🏗️'],
  freelancer: ['💻', '🌍', '☕', '🎯', '✅'],
  marketer: ['📊', '🎯', '📱', '💡', '🔥'],
  developer: ['💻', '⚡', '🔧', '🧠', '🚀'],
  designer: ['✏️', '🎨', '✨', '🖌️', '💡'],
  photographer: ['📷', '🌅', '✨', '🎞️', '👁️'],
  fitness: ['💪', '🏋️', '🔥', '🥗', '🏃'],
  food: ['🍳', '🍕', '🔥', '👨‍🍳', '😋'],
  travel: ['✈️', '🌍', '🗺️', '🏔️', '🌅'],
  student: ['📚', '🎓', '✏️', '💡', '🧠'],
  musician: ['🎸', '🎵', '🎤', '🎹', '🔊'],
  artist: ['🖌️', '🎨', '✨', '🖼️', '🌈'],
  writer: ['✍️', '📝', '📖', '💭', '🖊️'],
  coach: ['🏆', '💪', '🎯', '🔥', '⭐'],
};

// --- Utility ---

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

function truncateToPlatformLimit(bio: string, platform: BioPlatform): string {
  const limit = PLATFORM_CHAR_LIMITS[platform];
  if (bio.length <= limit) return bio;
  return bio.slice(0, limit - 3).trimEnd() + '...';
}

// --- Generation ---

export function generateBios(req: BioRequest): BioResult {
  const seed = hashCode(`${req.platform}-${req.niche}-${req.style}-${req.keywords?.join(',') || ''}`);
  const nicheTitle = pickItems(NICHE_TITLES[req.niche], seed, 1)[0];
  const emojis = EMOJI_SETS[req.niche];

  // Generate 8 main bios
  const templateFn = STYLE_TEMPLATES[req.style];
  let bios = templateFn(req.niche, nicheTitle, req.platform);

  // Inject keywords if provided
  if (req.keywords?.length) {
    const keywordStr = req.keywords.slice(0, 3).join(' | ');
    bios = bios.map((bio, i) => {
      if (i % 3 === 0) return `${bio} | ${keywordStr}`;
      return bio;
    });
  }

  // Truncate to platform limit
  bios = bios.map(b => truncateToPlatformLimit(b, req.platform));

  // Generate 4 short bios
  const shortFn = PLATFORM_SHORT_TEMPLATES[req.platform];
  const shortBios = shortFn(nicheTitle).map(b => truncateToPlatformLimit(b, req.platform));

  // Generate 4 emoji bios
  const selectedEmojis = pickItems(emojis, seed, 4);
  const emojiBios = [
    `${selectedEmojis[0]} ${nicheTitle} ${selectedEmojis[1]} Creating daily ${selectedEmojis[2]}`,
    `${selectedEmojis.join(' ')} ${nicheTitle}`,
    `${selectedEmojis[0]} ${nicheTitle} | ${selectedEmojis[1]} ${NICHE_LABELS[req.niche].name} life`,
    `${selectedEmojis[2]} ${req.style} ${nicheTitle.toLowerCase()} ${selectedEmojis[3]}`,
  ].map(b => truncateToPlatformLimit(b, req.platform));

  // Generate CTA
  const platformName = PLATFORM_LABELS[req.platform].name;
  const nicheName = NICHE_LABELS[req.niche].name;
  const languageLabel = req.language && req.language !== 'english' ? ` in ${req.language}` : '';
  const callToAction = `Try our free ${platformName} Bio Generator${languageLabel} to create the perfect ${nicheName.toLowerCase()} bio instantly. No sign-up required.`;

  return { bios, shortBios, emojiBios, callToAction };
}

// --- OpenAI Fallback ---

interface OpenAIBioResponse {
  bios: string[];
  shortBios: string[];
  emojiBios: string[];
  callToAction: string;
}

async function generateWithOpenAI(req: BioRequest): Promise<BioResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const platformName = PLATFORM_LABELS[req.platform].name;
  const nicheName = NICHE_LABELS[req.niche].name;
  const styleName = STYLE_LABELS[req.style].name;
  const charLimit = PLATFORM_CHAR_LIMITS[req.platform];

  const prompt = [
    'You are a social media bio writing assistant.',
    `Generate bios for platform: ${platformName} (max ${charLimit} characters per bio).`,
    `Niche: ${nicheName}. Style: ${styleName}.`,
    `Language: ${req.language || 'english'}.`,
    `Keywords: ${req.keywords?.join(', ') || 'none'}.`,
    'Return strict JSON with keys: bios (8 items), shortBios (4 items), emojiBios (4 items with emojis), callToAction (string).',
    `Every bio must be under ${charLimit} characters.`,
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

    const parsed = JSON.parse(text) as OpenAIBioResponse;
    if (!Array.isArray(parsed.bios) || !Array.isArray(parsed.shortBios) || !Array.isArray(parsed.emojiBios) || typeof parsed.callToAction !== 'string') {
      return null;
    }

    return {
      bios: parsed.bios.slice(0, 8),
      shortBios: parsed.shortBios.slice(0, 4),
      emojiBios: parsed.emojiBios.slice(0, 4),
      callToAction: parsed.callToAction,
    };
  } catch {
    return null;
  }
}

export async function generateBiosWithProvider(req: BioRequest): Promise<BioResult | null> {
  const llmResult = await generateWithOpenAI(req);
  if (llmResult) return llmResult;

  const { isFakeFallbackAllowed } = await import('./llm-shared');
  if (isFakeFallbackAllowed()) {
    return generateBios(req);
  }

  return null;
}
