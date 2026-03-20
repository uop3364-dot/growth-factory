'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';

const recommendations = [
  {
    slug: 'tubebuddy' as const,
    name: 'TubeBuddy',
    text: 'Find better keywords, improve titles, and optimize your channel faster.',
    cta: 'Try TubeBuddy Free',
    color: 'blue',
  },
  {
    slug: 'vidiq' as const,
    name: 'vidIQ',
    text: 'Get topic ideas, keyword data, and growth insights for YouTube.',
    cta: 'Try vidIQ Free',
    color: 'purple',
  },
  {
    slug: 'canva' as const,
    name: 'Canva',
    text: 'Design thumbnails, channel art, and creator visuals faster.',
    cta: 'Try Canva',
    color: 'teal',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
  teal: { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-700', hover: 'hover:bg-teal-100' },
};

export default function HomeAffiliate() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Recommended Tools for Growing Faster</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Want more views, better titles, and faster channel growth? Pair our free AI tools with proven creator tools used for keyword research, optimization, and design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((rec) => {
            const colors = colorMap[rec.color];
            const href = getAffiliateLink(rec.slug);
            const utmHref = `${href}${href.includes('?') ? '&' : '?'}utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=homepage`;

            return (
              <div key={rec.slug} className={`bg-white rounded-xl p-6 border ${colors.border} shadow-sm`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.name}</h3>
                <p className="text-gray-600 text-sm mb-5">{rec.text}</p>
                <a
                  href={utmHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className={`inline-block px-5 py-2.5 ${colors.bg} ${colors.text} rounded-lg text-sm font-semibold ${colors.hover} transition-colors w-full text-center`}
                  data-track="homepage_affiliate_click"
                  data-partner={rec.slug}
                  onClick={() => {
                    trackEvent('homepage_affiliate_click', { partner: rec.slug, location: 'recommendation_section' });
                    trackEvent('affiliate_click', { partner: rec.slug, location: 'homepage' });
                  }}
                >
                  {rec.cta} &rarr;
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
