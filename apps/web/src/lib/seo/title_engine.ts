/**
 * SEO Title Engine v2.
 *
 * All new pages MUST use this engine to get their title.
 * The engine reads from `title_baseline.json` (managed by CAIOS SEO Title Optimizer)
 * and falls back to proven high-CTR patterns.
 *
 * Brand: MoLink Lazy Dino
 * Tone: casual, practical, creator-friendly, no clickbait
 */

import baselineData from './title_baseline.json';

// Re-export legacy function for backward compatibility
export { generateSeoTitle } from './title';

// ─── Types ───

export type PageType =
  | 'tool_page'
  | 'platform_hub'
  | 'topic_page'
  | 'guide_page'
  | 'landing_page'
  | 'comparison_page';

export interface TitleEngineInput {
  keyword: string;
  pageType?: PageType;
  platform?: string;
  toolFamily?: string;
  brandMode?: 'standard' | 'prominent' | 'subtle';
}

export interface TitleEngineOutput {
  title: string;
  patternUsed: string;
  baselineSource: string;
  confidence: number;
}

interface BaselineEntry {
  page_type: string;
  keyword_family?: string;
  platform?: string;
  tool_family?: string;
  pattern: string;
  example_title?: string;
  avg_ctr?: number;
  sample_count?: number;
}

// ─── Default Patterns (fallback if no baseline matches) ───

const DEFAULT_PATTERNS: Record<PageType, string> = {
  tool_page: 'Free {keyword} (AI-Powered + Instant Results + Examples)',
  platform_hub: 'Free {platform} {keyword} — AI-Powered, Instant, No Signup',
  topic_page: '{platform} {topic} {keyword} — Free AI Generator ({year})',
  guide_page: 'How to Use {keyword} — Free Guide with Examples ({year})',
  landing_page: 'Free AI Tools for Creators — {keyword}',
  comparison_page: 'Best {keyword} — Free AI Comparison ({year})',
};

// ─── Engine ───

function loadBaselines(): BaselineEntry[] {
  try {
    if (Array.isArray(baselineData)) {
      return baselineData as BaselineEntry[];
    }
    return [];
  } catch {
    return [];
  }
}

function findBestBaseline(
  baselines: BaselineEntry[],
  pageType: PageType,
  keywordFamily: string,
  platform: string,
  toolFamily: string
): BaselineEntry | null {
  let bestMatch: BaselineEntry | null = null;
  let bestScore = -1;

  for (const entry of baselines) {
    if (entry.page_type !== pageType) continue;

    let score = 0;
    if (
      keywordFamily &&
      entry.keyword_family &&
      keywordFamily.toLowerCase() === entry.keyword_family.toLowerCase()
    ) {
      score += 3;
    }
    if (
      platform &&
      entry.platform &&
      platform.toLowerCase() === entry.platform.toLowerCase()
    ) {
      score += 2;
    }
    if (
      toolFamily &&
      entry.tool_family &&
      toolFamily.toLowerCase() === entry.tool_family.toLowerCase()
    ) {
      score += 1;
    }

    if (score > bestScore || (score === bestScore && (entry.avg_ctr ?? 0) > (bestMatch?.avg_ctr ?? 0))) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

function applyPattern(pattern: string, input: TitleEngineInput): string {
  const year = new Date().getFullYear().toString();
  let result = pattern;
  result = result.replace('{keyword}', input.keyword);
  result = result.replace('{platform}', capitalize(input.platform || ''));
  result = result.replace('{tool_family}', input.toolFamily || '');
  result = result.replace('{topic}', input.toolFamily || input.keyword);
  result = result.replace('{action}', `Use ${input.keyword}`);
  result = result.replace('{keyword_list}', input.keyword);
  result = result.replace('{year}', year);
  // Clean up
  result = result.replace(/\s+/g, ' ').trim();
  return result;
}

function capitalize(s: string): string {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Generate the best title for a page using the baseline registry.
 *
 * This is the REQUIRED entry point for all new pages.
 * Do NOT hardcode titles — use this function instead.
 */
export function generateOptimizedTitle(input: TitleEngineInput): TitleEngineOutput {
  const pageType = input.pageType || 'tool_page';
  const baselines = loadBaselines();

  // Try to find a baseline match
  const baseline = findBestBaseline(
    baselines,
    pageType,
    input.toolFamily || input.keyword,
    input.platform || '',
    input.toolFamily || ''
  );

  if (baseline) {
    const title = applyPattern(baseline.pattern, input);
    return {
      title,
      patternUsed: baseline.pattern,
      baselineSource: `${baseline.page_type}/${baseline.keyword_family || 'default'}`,
      confidence: Math.min(1.0, 0.3 + (baseline.sample_count || 0) / 100),
    };
  }

  // Fallback to default pattern
  const defaultPattern = DEFAULT_PATTERNS[pageType] || DEFAULT_PATTERNS.tool_page;
  const title = applyPattern(defaultPattern, input);
  return {
    title,
    patternUsed: defaultPattern,
    baselineSource: 'default_fallback',
    confidence: 0.2,
  };
}
