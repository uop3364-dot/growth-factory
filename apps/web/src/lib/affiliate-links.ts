/**
 * Affiliate link configuration — SINGLE SOURCE OF TRUTH for all CTA components.
 *
 * Priority: NEXT_PUBLIC_AFFILIATE_* env var > affiliateLinks > fallbackLinks
 *
 * affiliateLinks: real affiliate/referral URLs (earn commission)
 * fallbackLinks:  official homepage URLs (no commission, last resort)
 */

const affiliateLinks: Record<string, string> = {
  vidiq: 'https://vidiq.com/molinkai-ai',
  metricool: 'https://f.mtr.cool/Molink',
};

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
 * Returns the affiliate link for a partner.
 * Reads from env first, then affiliateLinks, then fallbackLinks.
 */
export function getAffiliateLink(slug: string): string {
  const envKey = `NEXT_PUBLIC_AFFILIATE_${slug.toUpperCase()}`;
  const envValue = typeof process !== 'undefined' ? process.env?.[envKey] : undefined;
  if (envValue) return envValue;
  return affiliateLinks[slug] || fallbackLinks[slug] || '#';
}
