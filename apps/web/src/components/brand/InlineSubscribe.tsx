'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface InlineSubscribeProps {
  toolSlug?: string;
}

export default function InlineSubscribe({ toolSlug }: InlineSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    trackEvent('inline_subscribe_submit', { tool_slug: toolSlug || 'unknown' });

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'inline_subscribe',
          leadMagnet: toolSlug,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        trackEvent('inline_subscribe_success', { tool_slug: toolSlug || 'unknown' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 mt-6 text-center">
        <p className="text-emerald-800 font-medium">{message}</p>
        <p className="text-sm text-emerald-600 mt-1">Check your inbox for creator tips every week.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-5 mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1">
          <p className="text-gray-800 font-medium">
            <span className="mr-1.5">{'\ud83d\udcec'}</span>
            Get weekly creator tips + free tools
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 sm:w-52 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2">{message}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">No spam, ever. Unsubscribe anytime.</p>
    </div>
  );
}
