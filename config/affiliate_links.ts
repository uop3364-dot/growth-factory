/**
 * Affiliate links — active referral URLs for approved partners.
 * This file is a secondary reference; the runtime source of truth is
 * apps/web/src/lib/affiliate-links.ts (getAffiliateLink).
 */

export const affiliateLinks: Record<string, string> = {
  vidiq: "https://vidiq.com/molinkai-ai",
  metricool: "https://f.mtr.cool/Molink",
  canva: "",
  opusclip: "",
  pictory: "",
  descript: "",
  tubebuddy: "",
};

export const fallbackLinks: Record<string, string> = {
  vidiq: "https://vidiq.com",
  canva: "https://www.canva.com",
  opusclip: "https://www.opus.pro",
  pictory: "https://pictory.ai",
  descript: "https://www.descript.com",
  tubebuddy: "https://www.tubebuddy.com",
  metricool: "https://metricool.com",
};

/**
 * Returns the affiliate link if available, otherwise the fallback (official site).
 */
export function getLink(slug: string): string {
  return affiliateLinks[slug] || fallbackLinks[slug] || '#';
}
