'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';

/** Affiliate partner config with CTA text and slug */
interface PartnerConfig {
  name: string;
  slug: string;
}

interface AffiliateRec {
  headline: string;
  subtext: string;
  primary: PartnerConfig;
  secondary: PartnerConfig;
}

const PLATFORM_RECS: Record<string, AffiliateRec> = {
  youtube: {
    headline: 'Want More YouTube Views?',
    subtext: 'Pair your captions with these proven YouTube growth tools.',
    primary: { name: 'Try vidIQ Free', slug: 'vidiq' },
    secondary: { name: 'Try TubeBuddy Free', slug: 'tubebuddy' },
  },
  tiktok: {
    headline: 'Create More TikTok Content, Faster',
    subtext: 'Turn long videos into TikTok clips automatically.',
    primary: { name: 'Try OpusClip Free', slug: 'opusclip' },
    secondary: { name: 'Try Canva Free', slug: 'canva' },
  },
  default: {
    headline: 'Want Even Better Results?',
    subtext: 'Level up your content with these creator-approved tools.',
    primary: { name: 'Try Metricool Free', slug: 'metricool' },
    secondary: { name: 'Try Canva Pro', slug: 'canva' },
  },
};

interface AffiliateCTAProps {
  pageType?: string;
  platform?: string;
  /** v2: override headline from seo-overrides */
  customHeadline?: string;
  /** v2: override subtext from seo-overrides */
  customSubtext?: string;
  /** v2: override primary partner slug */
  customPartnerSlug?: string;
}

export default function AffiliateCTA({
  pageType = 'tone',
  platform,
  customHeadline,
  customSubtext,
  customPartnerSlug,
}: AffiliateCTAProps) {
  // Resolve recommendation: custom override > platform-specific > default
  let rec = PLATFORM_RECS[platform ?? ''] ?? PLATFORM_RECS.default;

  // v2: If a custom partner is specified, swap primary
  if (customPartnerSlug && customPartnerSlug !== rec.primary.slug) {
    const partnerNames: Record<string, string> = {
      vidiq: 'Try vidIQ Free',
      tubebuddy: 'Try TubeBuddy Free',
      canva: 'Try Canva Pro',
      metricool: 'Try Metricool Free',
      opusclip: 'Try OpusClip Free',
      pictory: 'Try Pictory Free',
      descript: 'Try Descript Free',
    };
    rec = {
      ...rec,
      primary: { slug: customPartnerSlug, name: partnerNames[customPartnerSlug] ?? `Try ${customPartnerSlug}` },
    };
  }

  const headline = customHeadline ?? rec.headline;
  const subtext = customSubtext ?? rec.subtext;
  const utm = `?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=${pageType}_cta`;
  const primaryHref = `${getAffiliateLink(rec.primary.slug)}${utm}`;
  const secondaryHref = `${getAffiliateLink(rec.secondary.slug)}${utm}`;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 my-6">
      <h4 className="font-bold text-gray-800 mb-1">{headline}</h4>
      <p className="text-gray-600 text-sm mb-3">{subtext}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block px-5 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
          data-affiliate={`${rec.primary.slug}-primary`}
          onClick={() => {
            trackEvent('cta_click', { tool: rec.primary.slug, page_type: pageType });
            trackEvent('affiliate_click', { partner: rec.primary.slug, location: 'mid_content_cta', page_path: typeof window !== 'undefined' ? window.location.pathname : '' });
          }}
        >
          {rec.primary.name}
        </a>
        <a
          href={secondaryHref}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block px-5 py-2.5 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
          data-affiliate={`${rec.secondary.slug}-secondary`}
          onClick={() => {
            trackEvent('cta_click', { tool: rec.secondary.slug, page_type: pageType });
            trackEvent('affiliate_click', { partner: rec.secondary.slug, location: 'mid_content_cta', page_path: typeof window !== 'undefined' ? window.location.pathname : '' });
          }}
        >
          {rec.secondary.name}
        </a>
      </div>
    </div>
  );
}
