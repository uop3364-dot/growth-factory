'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ShareToolButtonProps {
  toolSlug: string;
}

export default function ShareToolButton({ toolSlug }: ShareToolButtonProps) {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setShared(true);
    trackEvent('tool_share', { tool_slug: toolSlug, method: 'copy_url' });
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
      title="Copy page URL to clipboard"
    >
      {shared ? 'Link copied!' : 'Share this tool'}
    </button>
  );
}
