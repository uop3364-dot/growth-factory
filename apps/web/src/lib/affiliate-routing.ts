/**
 * Affiliate Routing — maps page intent to the best-fit affiliate partner.
 *
 * Only vidIQ and Metricool are active commission partners.
 * This module determines which is PRIMARY (bigger button, first position)
 * based on the page's search intent.
 *
 * vidIQ primary: YouTube / title / video SEO pages
 * Metricool primary: social scheduling / captions / hashtags / bios
 */

export type AffiliatePartner = 'vidiq' | 'metricool';

export interface AffiliateConfig {
  primary: AffiliatePartner;
  secondary: AffiliatePartner;
  headline: string;
  subtext: string;
  primaryLabel: string;
  secondaryLabel: string;
}

// ─── Route Rules (checked in order, first match wins) ───

interface RouteRule {
  pattern: RegExp;
  config: AffiliateConfig;
}

const VIDIQ_PRIMARY_LABEL = 'Try vidIQ Free';
const METRICOOL_PRIMARY_LABEL = 'Schedule with Metricool';
const VIDIQ_SECONDARY_LABEL = 'Boost YouTube SEO';
const METRICOOL_SECONDARY_LABEL = 'Track with Metricool';

const ROUTE_RULES: RouteRule[] = [
  // ── YouTube / Title / Video SEO → vidIQ primary ──
  {
    pattern: /^\/(youtube-)?title-generator/,
    config: {
      primary: 'vidiq',
      secondary: 'metricool',
      headline: 'Rank higher. Get more views.',
      subtext: 'Your title is ready — now find the right keywords and optimize your SEO with vidIQ. Or schedule and track your content with Metricool.',
      primaryLabel: VIDIQ_PRIMARY_LABEL,
      secondaryLabel: METRICOOL_SECONDARY_LABEL,
    },
  },
  {
    pattern: /^\/caption-generator\/youtube/,
    config: {
      primary: 'vidiq',
      secondary: 'metricool',
      headline: 'Optimize your YouTube presence.',
      subtext: 'Your description is ready — now find the right keywords with vidIQ to rank higher. Or schedule across platforms with Metricool.',
      primaryLabel: VIDIQ_PRIMARY_LABEL,
      secondaryLabel: METRICOOL_SECONDARY_LABEL,
    },
  },

  // ── Hashtag pages → Metricool primary ──
  {
    pattern: /^\/hashtag-generator/,
    config: {
      primary: 'metricool',
      secondary: 'vidiq',
      headline: 'Track which hashtags drive real reach.',
      subtext: 'Your hashtags are ready — schedule your posts and see which ones perform with Metricool. Or boost YouTube SEO with vidIQ.',
      primaryLabel: METRICOOL_PRIMARY_LABEL,
      secondaryLabel: VIDIQ_SECONDARY_LABEL,
    },
  },

  // ── Caption pages (non-YouTube) → Metricool primary ──
  {
    pattern: /^\/caption-generator\/(instagram|tiktok|x|facebook|linkedin)/,
    config: {
      primary: 'metricool',
      secondary: 'vidiq',
      headline: 'Schedule it. Track what works.',
      subtext: 'Your caption is ready — post at the perfect time and track engagement with Metricool. Or optimize YouTube with vidIQ.',
      primaryLabel: METRICOOL_PRIMARY_LABEL,
      secondaryLabel: VIDIQ_SECONDARY_LABEL,
    },
  },
  {
    pattern: /^\/caption-generator$/,
    config: {
      primary: 'metricool',
      secondary: 'vidiq',
      headline: 'Your content is ready. Make it work harder.',
      subtext: 'Schedule posts at the perfect time and track what drives engagement with Metricool. Or boost your YouTube presence with vidIQ.',
      primaryLabel: METRICOOL_PRIMARY_LABEL,
      secondaryLabel: VIDIQ_SECONDARY_LABEL,
    },
  },

  // ── Bio pages → Metricool primary ──
  {
    pattern: /^\/bio-generator/,
    config: {
      primary: 'metricool',
      secondary: 'vidiq',
      headline: 'Bio done. Now grow your audience.',
      subtext: 'Track your growth and schedule content across platforms with Metricool. Or optimize your YouTube channel with vidIQ.',
      primaryLabel: METRICOOL_PRIMARY_LABEL,
      secondaryLabel: VIDIQ_SECONDARY_LABEL,
    },
  },
];

// ─── Default (homepage, unknown pages) ───

const DEFAULT_CONFIG: AffiliateConfig = {
  primary: 'vidiq',
  secondary: 'metricool',
  headline: 'Want better YouTube growth?',
  subtext: 'Your result is ready. Take the next step — optimize titles and SEO with vidIQ, or track content performance with Metricool.',
  primaryLabel: VIDIQ_PRIMARY_LABEL,
  secondaryLabel: METRICOOL_SECONDARY_LABEL,
};

/**
 * Resolve the best affiliate config for a given page path.
 *
 * @param pagePath - The page's pathname (e.g. '/hashtag-generator/x/art')
 * @returns AffiliateConfig with primary/secondary partner, headline, subtext, and button labels
 */
export function resolveAffiliate(pagePath?: string): AffiliateConfig {
  if (!pagePath) return DEFAULT_CONFIG;

  for (const rule of ROUTE_RULES) {
    if (rule.pattern.test(pagePath)) {
      return rule.config;
    }
  }

  return DEFAULT_CONFIG;
}
