/**
 * Global SEO Title Engine (legacy entry point).
 *
 * All pages use a single high-CTR formula:
 *   Free {keyword} (AI-Powered + Instant Results + Examples)
 *
 * For new pages, prefer `generateOptimizedTitle()` from `./title_engine`
 * which reads from the baseline registry managed by the CAIOS SEO Title Optimizer.
 */

import { generateOptimizedTitle, type TitleEngineInput } from './title_engine';

const FALLBACK_TITLE = 'Free AI Tools (Instant Results + Copy-Paste Examples)';

/**
 * Generate a SEO title using the baseline registry.
 * Falls back to the classic formula if no baseline match.
 *
 * @deprecated Use `generateOptimizedTitle()` from `./title_engine` for new pages.
 */
export function generateSeoTitle(keyword?: string): string {
  if (!keyword) return FALLBACK_TITLE;

  // Route through the new title engine
  const input: TitleEngineInput = {
    keyword,
    pageType: 'tool_page',
  };
  const result = generateOptimizedTitle(input);
  return result.title;
}
