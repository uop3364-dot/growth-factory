import { Platform, Topic, Tone, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from './seo-data';
import { callOpenAI, isFakeFallbackAllowed } from './llm-shared';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  source: 'llm' | 'cache' | 'fallback';
}

interface OpenAIMessageResponse {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
}

// ---------------------------------------------------------------------------
// Language Config
// ---------------------------------------------------------------------------

export const SUPPORTED_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Español (Spanish)' },
  { value: 'french', label: 'Français (French)' },
  { value: 'german', label: 'Deutsch (German)' },
  { value: 'portuguese', label: 'Português (Portuguese)' },
  { value: 'traditional-chinese', label: '繁體中文 (Traditional Chinese)' },
  { value: 'simplified-chinese', label: '简体中文 (Simplified Chinese)' },
  { value: 'japanese', label: '日本語 (Japanese)' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['value'];

// Human-readable language name for prompts
const LANGUAGE_PROMPT_MAP: Record<string, string> = {
  'english': 'English',
  'spanish': 'Spanish (Español)',
  'french': 'French (Français)',
  'german': 'German (Deutsch)',
  'portuguese': 'Portuguese (Português)',
  'traditional-chinese': 'Traditional Chinese (繁體中文)',
  'simplified-chinese': 'Simplified Chinese (简体中文)',
  'japanese': 'Japanese (日本語)',
};

function getLanguageLabel(lang?: string): string {
  return LANGUAGE_PROMPT_MAP[lang || 'english'] || 'English';
}

// ---------------------------------------------------------------------------
// OpenAI-powered generation (primary path)
// ---------------------------------------------------------------------------

async function generateWithOpenAI(req: CaptionRequest): Promise<CaptionResult | null> {
  const platformName = PLATFORM_INFO[req.platform].name;
  const topicName = TOPIC_INFO[req.topic].name;
  const toneName = TONE_INFO[req.tone].name;
  const toneDesc = TONE_INFO[req.tone].description;
  const langLabel = getLanguageLabel(req.language);
  const isNonEnglish = req.language && req.language !== 'english';

  const prompt = [
    `You are a world-class social media copywriter who writes natively in ${langLabel}.`,
    '',
    `=== TASK ===`,
    `Generate 10 social media captions for the platform "${platformName}" on the topic "${topicName}" in a "${toneName}" tone (${toneDesc}).`,
    '',
    `=== HARD REQUIREMENTS ===`,
    `1. OUTPUT LANGUAGE: ALL caption text MUST be written in ${langLabel}. This is non-negotiable.`,
    ...(isNonEnglish ? [
      `   - The ENTIRE caption body must be in ${langLabel}. Do NOT write in English.`,
      `   - Hashtags may include English terms if they are commonly used on ${platformName}.`,
      `   - Brand names and universal terms (e.g., "AI", "CEO") may stay in English.`,
      `   - The ctaSuggestion must also be in ${langLabel}.`,
    ] : []),
    `2. PLATFORM: Tailor style, length, and formatting to ${platformName} best practices.`,
    `3. TOPIC: Every caption must clearly relate to "${topicName}".`,
    `4. TONE: The tone must be unmistakably "${toneName}" — ${toneDesc}.`,
    ...(req.audience ? [`5. TARGET AUDIENCE: Write for "${req.audience}".`] : []),
    ...(req.keywords?.length ? [`6. KEYWORDS: Naturally incorporate these keywords: ${req.keywords.join(', ')}.`] : []),
    '',
    `=== OUTPUT FORMAT ===`,
    `Return strict JSON with these keys:`,
    `- "captions": array of 10 strings (full captions)`,
    `- "shortVariants": array of 5 strings (condensed versions, max 100 chars each)`,
    `- "hashtags": array of 5 strings (with # prefix)`,
    `- "ctaSuggestion": one string (call-to-action suggestion${isNonEnglish ? ` in ${langLabel}` : ''})`,
    ``,
    `No markdown. No code fences. No extra text outside the JSON.`,
  ].join('\n');

  const parsed = await callOpenAI<OpenAIMessageResponse>({ userPrompt: prompt });
  if (!parsed) return null;

  if (
    !Array.isArray(parsed.captions) ||
    !Array.isArray(parsed.shortVariants) ||
    !Array.isArray(parsed.hashtags) ||
    typeof parsed.ctaSuggestion !== 'string'
  ) {
    return null;
  }

  return {
    captions: parsed.captions.slice(0, 10),
    shortVariants: parsed.shortVariants.slice(0, 5),
    hashtags: parsed.hashtags.slice(0, 5),
    ctaSuggestion: parsed.ctaSuggestion,
    source: 'llm',
  };
}

// ---------------------------------------------------------------------------
// Deterministic fallback (dev only, gated by ALLOW_FAKE_FALLBACK)
// ---------------------------------------------------------------------------

// Fallback templates per language for common phrases
const FALLBACK_LANGUAGE_TEMPLATES: Record<string, {
  hookPrefix: string[];
  topicVerb: string;
  ctaPrefix: string;
  hashtagSuffix: string;
}> = {
  english: {
    hookPrefix: ['Check out', 'Discover', 'Explore', 'Dive into', 'Level up with'],
    topicVerb: 'content',
    ctaPrefix: 'Try our free Caption Generator',
    hashtagSuffix: 'tips',
  },
  spanish: {
    hookPrefix: ['Descubre', 'Explora', 'No te pierdas', 'Sumérgete en', 'Mejora con'],
    topicVerb: 'contenido',
    ctaPrefix: 'Prueba nuestro generador gratuito de subtítulos',
    hashtagSuffix: 'consejos',
  },
  french: {
    hookPrefix: ['Découvrez', 'Explorez', 'Plongez dans', 'Ne manquez pas', 'Améliorez avec'],
    topicVerb: 'contenu',
    ctaPrefix: 'Essayez notre générateur de légendes gratuit',
    hashtagSuffix: 'astuces',
  },
  german: {
    hookPrefix: ['Entdecke', 'Erkunde', 'Tauche ein in', 'Verpasse nicht', 'Verbessere mit'],
    topicVerb: 'Inhalte',
    ctaPrefix: 'Probiere unseren kostenlosen Caption-Generator',
    hashtagSuffix: 'Tipps',
  },
  portuguese: {
    hookPrefix: ['Descubra', 'Explore', 'Mergulhe em', 'Não perca', 'Melhore com'],
    topicVerb: 'conteúdo',
    ctaPrefix: 'Experimente nosso gerador gratuito de legendas',
    hashtagSuffix: 'dicas',
  },
  'traditional-chinese': {
    hookPrefix: ['發現', '探索', '深入了解', '不要錯過', '提升你的'],
    topicVerb: '內容',
    ctaPrefix: '試試我們的免費文案生成器',
    hashtagSuffix: '技巧',
  },
  'simplified-chinese': {
    hookPrefix: ['发现', '探索', '深入了解', '不要错过', '提升你的'],
    topicVerb: '内容',
    ctaPrefix: '试试我们的免费文案生成器',
    hashtagSuffix: '技巧',
  },
  japanese: {
    hookPrefix: ['発見しよう', '探検しよう', '深堀りする', '見逃さないで', 'レベルアップ'],
    topicVerb: 'コンテンツ',
    ctaPrefix: '無料キャプション生成ツールを試してみてください',
    hashtagSuffix: 'ヒント',
  },
};

const PLATFORM_HOOKS: Record<string, string[]> = {
  instagram: ['Double tap if you agree', 'Save this for later', 'Tag someone who needs this', 'Link in bio for more', 'Comment your favorite below'],
  tiktok: ['Wait for it...', 'POV:', 'This is your sign to', 'Tell me without telling me', 'The way I just--'],
  youtube: ['Watch till the end!', 'Don\'t forget to subscribe', 'This changed everything', 'You won\'t believe what happened', 'The truth about'],
  x: ['Thread:', 'Hot take:', 'Unpopular opinion:', 'This.', 'Let that sink in.'],
  facebook: ['Share if you agree!', 'Who else relates?', 'Tag a friend who needs to see this', 'Thoughts?', 'Like if this made your day'],
};

const TONE_MODIFIERS: Record<string, { style: string }> = {
  funny: { style: 'humorous and self-deprecating' },
  cute: { style: 'sweet and heartwarming' },
  professional: { style: 'polished and insightful' },
  luxury: { style: 'elegant and aspirational' },
  minimalist: { style: 'clean and understated' },
  friendly: { style: 'warm and welcoming' },
  persuasive: { style: 'urgent and compelling' },
  inspirational: { style: 'uplifting and motivating' },
  sarcastic: { style: 'dry wit and irony' },
  bold: { style: 'confident and daring' },
  casual: { style: 'relaxed and laid-back' },
  emotional: { style: 'heartfelt and touching' },
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

/**
 * Deterministic fallback — now includes ALL input fields in the seed
 * and generates language-appropriate content.
 * Only used when ALLOW_FAKE_FALLBACK=true (dev mode).
 */
export function generateCaptions(req: CaptionRequest): CaptionResult {
  // Include ALL fields in seed so different inputs = different output
  const seed = hashCode(
    `${req.platform}-${req.topic}-${req.tone}-${req.language || 'english'}-${req.audience || ''}-${(req.keywords || []).sort().join(',')}`
  );
  const platformName = PLATFORM_INFO[req.platform].name;
  const topicName = TOPIC_INFO[req.topic].name;
  const toneName = TONE_INFO[req.tone].name;
  const toneInfo = TONE_MODIFIERS[req.tone] || { style: 'engaging' };
  const hooks = PLATFORM_HOOKS[req.platform] || PLATFORM_HOOKS.instagram;
  const lang = req.language || 'english';
  const langTemplates = FALLBACK_LANGUAGE_TEMPLATES[lang] || FALLBACK_LANGUAGE_TEMPLATES.english;

  const keywordStr = req.keywords?.length ? req.keywords.join(', ') : '';
  const audienceStr = req.audience || '';

  // Generate captions using language-aware templates
  const captions = Array.from({ length: 10 }, (_, i) => {
    const hook = pickItems(langTemplates.hookPrefix, seed + i, 1)[0];
    const platformHook = pickItems(hooks, seed + i * 3, 1)[0];
    const parts: string[] = [];

    if (lang === 'english') {
      // English: richer templates
      switch (i % 5) {
        case 0: parts.push(`${hook} ${topicName.toLowerCase()} ${langTemplates.topicVerb} on ${platformName}`); break;
        case 1: parts.push(`${platformHook} — ${topicName.toLowerCase()} ${langTemplates.topicVerb} that's ${toneInfo.style}`); break;
        case 2: parts.push(`Your ${toneName.toLowerCase()} guide to ${topicName.toLowerCase()} on ${platformName}`); break;
        case 3: parts.push(`${topicName} + ${platformName} = ${toneInfo.style} ${langTemplates.topicVerb}`); break;
        case 4: parts.push(`The ${toneInfo.style} way to share ${topicName.toLowerCase()} on ${platformName}`); break;
      }
    } else {
      // Non-English: use localized hook + topic
      parts.push(`${hook} ${topicName.toLowerCase()} ${langTemplates.topicVerb}`);
      if (i % 3 === 0) parts[0] += ` — ${platformName}`;
    }

    if (keywordStr && i % 2 === 0) {
      parts.push(keywordStr);
    }
    if (audienceStr && i % 3 === 0) {
      parts.push(audienceStr);
    }

    return parts.join(' | ').trim();
  });

  const shortVariants = captions.slice(0, 5).map(c => {
    const words = c.split(' ').slice(0, 8);
    return words.join(' ') + (words.length < c.split(' ').length ? '...' : '');
  });

  const hashtags = [
    `#${topicName.replace(/\s+/g, '')}`,
    `#${platformName}${topicName.replace(/\s+/g, '')}`,
    `#${topicName.replace(/\s+/g, '').toLowerCase()}${langTemplates.hashtagSuffix}`,
    `#${req.platform}tips`,
    `#${topicName.replace(/\s+/g, '').toLowerCase()}life`,
  ];

  if (req.keywords?.length) {
    for (const keyword of req.keywords.slice(0, 2)) {
      const normalized = keyword.replace(/[^a-zA-Z0-9\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, '');
      if (normalized) hashtags.push(`#${normalized}`);
    }
  }

  const ctaSuggestion = `${langTemplates.ctaPrefix} — ${platformName} ${topicName} (${toneName}).`;

  return { captions, shortVariants, hashtags: hashtags.slice(0, 5), ctaSuggestion, source: 'fallback' };
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Generate captions. Tries OpenAI first.
 * - If LLM succeeds → return LLM result
 * - If LLM fails + ALLOW_FAKE_FALLBACK=true → return deterministic fallback
 * - If LLM fails + production → return null (caller should return error)
 */
export async function generateCaptionsWithProvider(req: CaptionRequest): Promise<CaptionResult | null> {
  const llmResult = await generateWithOpenAI(req);
  if (llmResult) return llmResult;

  // LLM unavailable — check if fake fallback is allowed
  if (isFakeFallbackAllowed()) {
    return generateCaptions(req);
  }

  // Production: no silent fake content
  return null;
}
