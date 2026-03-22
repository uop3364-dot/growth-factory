'use client';

import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';

const TITLE_PACK_URL = process.env.NEXT_PUBLIC_TITLE_PACK_URL || '';

interface LockedResultsOverlayProps {
  /** Total number of results available */
  totalCount: number;
  /** Number of results shown (visible) */
  visibleCount: number;
  /** Tool identifier for tracking */
  toolSlug: string;
  className?: string;
}

export default function LockedResultsOverlay({
  totalCount,
  visibleCount,
  toolSlug,
  className = '',
}: LockedResultsOverlayProps) {
  if (totalCount <= visibleCount) return null;

  const hiddenCount = totalCount - visibleCount;

  const handleCtaClick = (target: 'vidiq' | 'title_pack') => {
    trackEvent('locked_cta_click', { tool_slug: toolSlug, target, hidden_count: hiddenCount });
  };

  const vidiqHref = `${getAffiliateLink('vidiq')}?utm_source=creatoraitools&utm_medium=locked_results`;

  const hasTitlePack = !!TITLE_PACK_URL;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-gradient-to-b from-amber-50/80 to-orange-50/90 p-6 text-center ${className}`}
      data-testid="locked-results-overlay"
    >
      {/* Blurred fake results behind */}
      <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-30 blur-sm pointer-events-none" aria-hidden="true">
        {Array.from({ length: Math.min(hiddenCount, 3) }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Lock content */}
      <div className="relative z-10">
        <div className="text-3xl mb-2">&#128274;</div>
        <h4 className="text-lg font-bold text-gray-800 mb-1" data-testid="locked-title">
          Unlock all high-performing titles
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Get all {totalCount} results + better templates
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {hasTitlePack ? (
            <a
              href={TITLE_PACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('title_pack')}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
              data-testid="locked-cta-unlock"
            >
              Unlock Now
            </a>
          ) : (
            <span
              className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed"
              data-testid="locked-cta-coming-soon"
            >
              Coming soon
            </span>
          )}
          <a
            href={vidiqHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => handleCtaClick('vidiq')}
            className="px-5 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
            data-testid="locked-cta-vidiq"
          >
            Try VidIQ (free)
          </a>
        </div>
      </div>
    </div>
  );
}
