'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export type LeadMagnetTool = 'caption-generator' | 'hashtag-generator' | 'bio-generator' | 'title-generator';

interface LeadMagnetConfig {
  emoji: string;
  headline: string;
  description: string;
}

const LEAD_MAGNETS: Record<LeadMagnetTool, LeadMagnetConfig> = {
  'caption-generator': {
    emoji: '\ud83c\udfac',
    headline: '100 Viral Caption Templates',
    description: 'Proven Instagram caption formulas used by top creators \u2014 free PDF.',
  },
  'hashtag-generator': {
    emoji: '\ud83d\udcca',
    headline: '2026 Hashtag Strategy Guide',
    description: 'The complete playbook for hashtag reach in 2026 \u2014 free PDF.',
  },
  'bio-generator': {
    emoji: '\u2728',
    headline: '50 High-Converting Bio Examples',
    description: 'Real bios that turn profile visitors into followers \u2014 free PDF.',
  },
  'title-generator': {
    emoji: '\ud83c\udfaf',
    headline: 'YouTube Title Formula Cheatsheet',
    description: 'Click-worthy title patterns backed by data \u2014 free PDF.',
  },
};

const STORAGE_KEY_COUNT = 'gf_tool_use_count';
const STORAGE_KEY_DISMISSED = 'gf_lead_magnet_dismissed';
const DISMISS_DAYS = 7;

interface LeadMagnetCardProps {
  toolSlug: LeadMagnetTool;
}

export default function LeadMagnetCard({ toolSlug }: LeadMagnetCardProps) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if dismissed within 7 days
    const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    // Increment and check use count
    const count = parseInt(localStorage.getItem(STORAGE_KEY_COUNT) || '0', 10) + 1;
    localStorage.setItem(STORAGE_KEY_COUNT, String(count));

    if (count >= 2) {
      // Slide in after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
    trackEvent('lead_magnet_dismiss', { tool_slug: toolSlug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    trackEvent('lead_magnet_submit', { tool_slug: toolSlug });

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'lead_magnet',
          leadMagnet: toolSlug,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setDownloadUrl(data.downloadUrl || null);
        localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
        trackEvent('lead_magnet_success', { tool_slug: toolSlug });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const config = LEAD_MAGNETS[toolSlug];
  if (!config || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up pointer-events-none">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-5 pointer-events-auto">
        {status === 'success' ? (
          <div className="text-center py-2">
            <p className="text-lg font-semibold text-gray-800 mb-1">{message}</p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download
                className="inline-block mt-3 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Download {config.headline} &darr;
              </a>
            )}
            <button
              onClick={() => setVisible(false)}
              className="block mx-auto mt-3 text-sm text-gray-400 hover:text-gray-600"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800">
                  <span className="mr-1.5">{config.emoji}</span>
                  {config.headline}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{config.description}</p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none ml-3 -mt-1"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : 'Send me the templates'}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-xs text-red-500 mt-2">{message}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
