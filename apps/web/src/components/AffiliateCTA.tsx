'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';

const RECOMMENDATIONS: Record<string, { headline: string; subtext: string; primary: { name: string; slug: string }; secondary: { name: string; slug: string } }> = {
  youtube: {
    headline: 'Want More YouTube Views?',
    subtext: 'Pair your captions with these proven YouTube growth tools.',
    primary: { name: 'Try TubeBuddy Free', slug: 'tubebuddy' },
    secondary: { name: 'Try vidIQ Free', slug: 'vidiq' },
  },
  default: {
    headline: 'Want Even Better Results?',
    subtext: 'Level up your content with these creator-approved tools.',
    primary: { name: 'Try Metricool Free', slug: 'metricool' },
    secondary: { name: 'Try Canva Pro', slug: 'canva' },
  },
};

export default function AffiliateCTA({ pageType = 'tone', platform }: { pageType?: string; platform?: string }) {
  const rec = (platform === 'youtube') ? RECOMMENDATIONS.youtube : RECOMMENDATIONS.default;
  const utm = `?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=${pageType}_cta`;
  const primaryHref = `${getAffiliateLink(rec.primary.slug)}${utm}`;
  const secondaryHref = `${getAffiliateLink(rec.secondary.slug)}${utm}`;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 my-6">
      <h4 className="font-bold text-gray-800 mb-1">{rec.headline}</h4>
      <p className="text-gray-600 text-sm mb-3">{rec.subtext}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block px-5 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
          data-affiliate={`${rec.primary.slug}-primary`}
          onClick={() => {
            trackEvent('cta_click', { tool: rec.primary.slug, page_type: pageType });
            trackEvent('affiliate_click', { partner: rec.primary.slug, location: 'mid_content_cta' });
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
            trackEvent('affiliate_click', { partner: rec.secondary.slug, location: 'mid_content_cta' });
          }}
        >
          {rec.secondary.name}
        </a>
      </div>
    </div>
  );
}
