'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';
import type { AffiliatePartner } from '@/lib/affiliate-routing';

export type ToolType = 'hashtag-generator' | 'caption-generator' | 'bio-generator' | 'title-generator';

interface ContextualCTAConfig {
  emoji: string;
  message: string;
  buttonText: string;
  partner: AffiliatePartner;
}

const CTA_CONFIG: Record<ToolType, ContextualCTAConfig> = {
  'hashtag-generator': {
    emoji: '\ud83d\udcca',
    message: 'Track which hashtags drive real reach',
    buttonText: 'Track My Hashtags \u2192',
    partner: 'metricool',
  },
  'caption-generator': {
    emoji: '\ud83d\udcc5',
    message: 'Schedule this caption at the best posting time',
    buttonText: 'Schedule This Post \u2192',
    partner: 'metricool',
  },
  'bio-generator': {
    emoji: '\ud83d\udd17',
    message: 'Add a smart link-in-bio to convert visitors',
    buttonText: 'Set Up My Link-in-Bio \u2192',
    partner: 'metricool',
  },
  'title-generator': {
    emoji: '\ud83d\udcc8',
    message: 'Optimize your YouTube SEO and rank higher',
    buttonText: 'Boost My YouTube SEO \u2192',
    partner: 'vidiq',
  },
};

interface ContextualCTAProps {
  toolSlug: ToolType;
}

export default function ContextualCTA({ toolSlug }: ContextualCTAProps) {
  const config = CTA_CONFIG[toolSlug];
  if (!config) return null;

  const partnerName = config.partner === 'vidiq' ? 'vidIQ' : 'Metricool';
  const utm = `?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=${toolSlug}_contextual`;
  const href = `${getAffiliateLink(config.partner)}${utm}`;

  const handleClick = () => {
    trackEvent('cta_click', { tool: config.partner, page_type: toolSlug });
    trackEvent('affiliate_click', {
      partner: config.partner,
      provider: config.partner,
      page_source: typeof window !== 'undefined' ? window.location.pathname : '',
      tool_slug: toolSlug,
      placement: 'contextual',
      location: 'post_result_contextual',
      role: 'primary',
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-5 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-gray-800 font-medium">
            <span className="mr-1.5">{config.emoji}</span>
            {config.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Free plan available &middot; Affiliate link
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
          data-affiliate={`${config.partner}-contextual`}
          onClick={handleClick}
        >
          {config.buttonText}
        </a>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Try {partnerName} free &mdash; no credit card required
      </p>
    </div>
  );
}
