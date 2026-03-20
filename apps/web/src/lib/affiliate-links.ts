/**
 * Affiliate link configuration.
 *
 * Affiliate URLs are read from NEXT_PUBLIC_AFFILIATE_* env vars when available.
 * Falls back to official homepage URLs (no affiliate tracking).
 *
 * To set affiliate links, add to .env.local:
 *   NEXT_PUBLIC_AFFILIATE_TUBEBUDDY=https://www.tubebuddy.com/...
 *   NEXT_PUBLIC_AFFILIATE_VIDIQ=https://vidiq.com/...
 *   NEXT_PUBLIC_AFFILIATE_CANVA=https://www.canva.com/...
 */

const fallbackLinks: Record<string, string> = {
  tubebuddy: 'https://www.tubebuddy.com',
  vidiq: 'https://vidiq.com',
  canva: 'https://www.canva.com',
  opusclip: 'https://www.opus.pro',
  pictory: 'https://pictory.ai',
  descript: 'https://www.descript.com',
  metricool: 'https://metricool.com',
};

/**
 * Returns the affiliate link for a partner. Reads from env first, falls back to official URL.
 */
export function getAffiliateLink(slug: string): string {
  const envKey = `NEXT_PUBLIC_AFFILIATE_${slug.toUpperCase()}`;
  const envValue = typeof process !== 'undefined' ? process.env?.[envKey] : undefined;
  if (envValue) return envValue;
  return fallbackLinks[slug] || '#';
}
