'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';
import { MascotImage } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';

const recommendations = [
  {
    slug: 'vidiq' as const,
    name: 'vidIQ',
    text: 'Optimize your YouTube titles, tags, and SEO. Get keyword data and growth insights to rank higher.',
    cta: 'Try vidIQ Free',
    color: 'purple',
  },
  {
    slug: 'metricool' as const,
    name: 'Metricool',
    text: 'Schedule posts, track performance, and analyze growth across all your social platforms in one place.',
    cta: 'Track with Metricool',
    color: 'blue',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
};

export default function HomeAffiliate() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MascotImage size="sm" />
          <h2 className="text-3xl font-bold text-center">Take Your Results Further</h2>
        </div>
        <p className="text-gray-500 text-center mb-3 max-w-2xl mx-auto">
          Your content is ready. Now optimize your strategy and track what works — pair our free AI tools with these proven growth tools.
        </p>
        <p className="text-xs text-gray-400 text-center mb-10">{brandCopy.affiliate[0]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {recommendations.map((rec) => {
            const colors = colorMap[rec.color];
            const href = getAffiliateLink(rec.slug);
            const utmHref = `${href}${href.includes('?') ? '&' : '?'}utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=homepage`;

            return (
              <div key={rec.slug} className={`bg-white rounded-brand-lg p-6 border ${colors.border} shadow-brand`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{rec.text}</p>
                <a
                  href={utmHref}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className={`brand-btn-generate inline-block px-5 py-2.5 ${colors.bg} ${colors.text} rounded-lg text-sm font-semibold ${colors.hover} transition-colors w-full text-center`}
                  data-track="homepage_affiliate_click"
                  data-partner={rec.slug}
                  onClick={() => {
                    trackEvent('homepage_affiliate_click', { partner: rec.slug, provider: rec.slug, location: 'recommendation_section', placement: 'middle' });
                    trackEvent('affiliate_click', { partner: rec.slug, provider: rec.slug, location: 'homepage', placement: 'middle', page_source: '/' });
                  }}
                >
                  {rec.cta} &rarr;
                </a>
                <p className="text-xs text-gray-400 mt-2 text-center">{brandCopy.affiliate[4]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
