'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';
import { MascotImage } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';

interface AffiliateCTAProps {
  pageType?: string;
  platform?: string;
  /** Override headline from seo-overrides */
  customHeadline?: string;
  /** Override subtext from seo-overrides */
  customSubtext?: string;
  /** Placement context for tracking */
  placement?: 'result' | 'middle' | 'footer' | 'pre_faq';
  /** Tool slug for tracking */
  toolSlug?: string;
}

/**
 * Unified Affiliate CTA component — the ONLY place affiliate links should be rendered.
 *
 * RULES:
 * - Always shows vidIQ (primary) + Metricool (secondary)
 * - Pages must NOT hardcode affiliate URLs; use this component instead
 */
export default function AffiliateCTA({
  pageType = 'tone',
  platform,
  customHeadline,
  customSubtext,
  placement = 'middle',
  toolSlug,
}: AffiliateCTAProps) {
  const headline = customHeadline ?? 'Want better YouTube growth?';
  const subtext = customSubtext ?? (
    'Your result is ready. Take the next step — optimize titles and SEO with vidIQ, or track content performance with Metricool.'
  );

  const pageSource = typeof window !== 'undefined' ? window.location.pathname : '';
  const slug = toolSlug ?? pageType;
  const utm = `?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=${pageType}_cta`;
  const vidiqHref = `${getAffiliateLink('vidiq')}${utm}`;
  const metricoolHref = `${getAffiliateLink('metricool')}${utm}`;

  const handleClick = (provider: 'vidiq' | 'metricool', role: 'primary' | 'secondary') => {
    trackEvent('cta_click', { tool: provider, page_type: pageType });
    trackEvent('affiliate_click', {
      partner: provider,
      provider,
      page_source: pageSource,
      tool_slug: slug,
      route_variant: platform ?? 'default',
      placement,
      location: `${placement}_content_cta`,
      page_path: pageSource,
      role,
    });
  };

  return (
    <div
      className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-brand-lg p-6 my-6"
      data-testid="affiliate-cta"
    >
      <div className="flex items-start gap-3">
        <span className="hidden sm:block flex-shrink-0 mt-0.5">
          <MascotImage size="sm" />
        </span>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 mb-1">{headline}</h4>
          <p className="text-gray-600 text-sm mb-1">{subtext}</p>
          <p className="text-xs text-gray-400 mb-3">{brandCopy.affiliate[0]}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={vidiqHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="brand-btn-generate inline-block px-5 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
              data-affiliate="vidiq-primary"
              onClick={() => handleClick('vidiq', 'primary')}
            >
              Try vidIQ
            </a>
            <a
              href={metricoolHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="brand-btn-generate inline-block px-5 py-2.5 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
              data-affiliate="metricool-secondary"
              onClick={() => handleClick('metricool', 'secondary')}
            >
              Track with Metricool
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-2">{brandCopy.affiliate[4]}</p>
        </div>
      </div>
    </div>
  );
}
