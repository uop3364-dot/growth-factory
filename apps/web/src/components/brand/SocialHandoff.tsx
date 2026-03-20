'use client';

import { useState } from 'react';
import MascotImage from './MascotImage';
import { brandCopy } from '@/lib/brandCopy';
import { trackEvent } from '@/lib/analytics';

const SITE_URL = 'https://creatoraitools.tools';

interface SocialHandoffProps {
  /** Tool path for the share link, e.g. "/caption-generator". */
  toolPath?: string;
  /** Short description of what was generated, for share text. */
  toolLabel?: string;
  className?: string;
}

/**
 * Lightweight social traffic handoff surface.
 * Provides copy-to-share text + share intent links that drive traffic back.
 * English-only, brand-consistent.
 */
export default function SocialHandoff({
  toolPath = '',
  toolLabel = 'content',
  className = '',
}: SocialHandoffProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${SITE_URL}${toolPath}`;
  const shareText = `${brandCopy.social[0]} ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    trackEvent('social_handoff_copy', { tool: toolPath || 'home' });
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className={`bg-white rounded-brand border border-gray-100 shadow-brand p-4 mt-4 ${className}`}>
      <div className="flex items-center gap-2.5 mb-2.5">
        <MascotImage size="xs" />
        <p className="text-xs font-medium text-gray-600">{brandCopy.social[1]}</p>
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
        <p className="flex-1 text-xs text-gray-600 truncate">{shareText}</p>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="flex gap-2 mt-2.5">
        <a
          href={twitterIntent}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('social_handoff_share', { platform: 'twitter', tool: toolPath || 'home' })}
          className="px-3 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          Share on X
        </a>
      </div>
    </div>
  );
}
