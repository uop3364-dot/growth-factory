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

const colorMap = {
  blue: 'bg-white text-blue-600 hover:bg-blue-50',
  green: 'bg-white text-green-700 hover:bg-green-50',
  pink: 'bg-white text-pink-600 hover:bg-pink-50',
  orange: 'bg-white text-orange-600 hover:bg-orange-50',
};

export default function HeroCTA({ toolName, color = 'blue', headline, subtext }: HeroCTAProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        onClick={() => {
          trackEvent('hero_cta_click', { tool: toolName, variant: headline ? 'custom' : 'default' });
          const generator = document.querySelector('[data-generator]') || document.querySelector('form');
          if (generator) generator.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        className={`${colorMap[color]} font-bold px-10 py-4 rounded-xl shadow-lg text-lg transition-colors`}
        data-track="hero_generate_now"
      >
        {headline || 'Generate Now'}
      </button>
      <p className="text-sm opacity-80">{subtext || 'Free \u2022 No login \u2022 Instant results'}</p>
    </div>
  );
}
