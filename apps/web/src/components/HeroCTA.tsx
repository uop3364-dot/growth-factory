'use client';

import { trackEvent } from '@/lib/analytics';

interface HeroCTAProps {
  toolName: string;
  color?: 'blue' | 'green' | 'pink' | 'orange';
  /** v2: custom button text (from seo-overrides) */
  headline?: string;
  /** v2: custom subtext */
  subtext?: string;
}

export default function HeroCTA({ toolName, color = 'green', headline, subtext }: HeroCTAProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        onClick={() => {
          trackEvent('hero_cta_click', { tool: toolName, variant: headline ? 'custom' : 'default' });
          const generator = document.querySelector('[data-generator]') || document.querySelector('form');
          if (generator) generator.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        className="brand-btn-pill bg-white text-brand-green-deep hover:bg-brand-cream text-lg shadow-lg"
        data-track="hero_generate_now"
      >
        {headline || 'Generate Now'}
      </button>
      <p className="text-sm opacity-80">{subtext || 'Free \u2022 No login \u2022 Instant results'}</p>
    </div>
  );
}
