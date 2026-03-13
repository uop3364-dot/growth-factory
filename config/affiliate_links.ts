/**
 * Affiliate links — replace empty strings with actual affiliate URLs after approval.
 * Until approved, the site should use fallbackLinks (official homepage URLs).
 */

export const affiliateLinks: Record<string, string> = {
  vidiq: "",
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
};

/**
 * Returns the affiliate link if available, otherwise the fallback (official site).
 */
export function getLink(slug: keyof typeof affiliateLinks): string {
  return affiliateLinks[slug] || fallbackLinks[slug];
}
