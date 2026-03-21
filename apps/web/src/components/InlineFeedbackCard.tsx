'use client';

import { useState, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';
import { MascotImage } from '@/components/brand';

interface InlineFeedbackCardProps {
  toolName?: string;
  metadata?: {
    selectedLanguage?: string;
    selectedPlatform?: string;
    selectedTopic?: string;
    selectedTone?: string;
  };
}

const FEEDBACK_TYPES = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'bug', label: 'Bug' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'general', label: 'General feedback' },
];

export default function InlineFeedbackCard({ toolName, metadata }: InlineFeedbackCardProps) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async () => {
    if (!message.trim()) return;
    setStatus('submitting');

    const autoMetadata = {
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
      toolName: toolName || 'general',
      ...metadata,
    };

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedbackType,
          message: message.trim(),
          email: email.trim() || undefined,
          metadata: autoMetadata,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Failed to send. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      trackEvent('feedback_submitted', { feedback_type: feedbackType, source: 'inline_card' });
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }, [feedbackType, message, email, toolName, metadata]);

  const handleReset = () => {
    setMessage('');
    setEmail('');
    setFeedbackType('suggestion');
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <section className="my-10">
      <div className="bg-white rounded-2xl shadow-lg border border-brand-green/15 overflow-hidden">
        {/* Header bar with accent */}
        <div className="bg-gradient-to-r from-brand-green/15 to-brand-cream px-5 py-4 sm:px-8 sm:py-5 flex items-center gap-4">
          <MascotImage size="xs" className="shrink-0 drop-shadow" />
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-brand-outline leading-snug">
              Help Molink Dino get better — I need your feedback.
            </h3>
            <p className="text-sm text-brand-outline/60 mt-0.5 leading-snug">
              Found something confusing, a bad result, or an idea to improve this tool? Tell me here.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5 sm:px-8 sm:py-6">
          {/* Success state */}
          {status === 'success' && (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">&#10003;</div>
              <p className="text-gray-800 font-semibold mb-1">Thanks — your feedback was sent.</p>
              <p className="text-sm text-gray-500 mb-4">Your input helps make this tool better for everyone.</p>
              <button
                onClick={handleReset}
                className="text-sm text-brand-green-deep underline hover:text-brand-green-dark transition-colors"
              >
                Send another
              </button>
            </div>
          )}

          {/* Form */}
          {status !== 'success' && (
            <div className="space-y-4">
              {/* Message — the main input, large and obvious */}
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you expected, what went wrong, or what would make this tool more useful."
                  rows={3}
                  maxLength={5000}
                  className="w-full rounded-xl border border-gray-200 bg-brand-cream/40 p-4 text-gray-900 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep resize-y transition-colors"
                />
              </div>

              {/* Secondary row: type + email side by side */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-48 shrink-0">
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep"
                  >
                    {FEEDBACK_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email (optional)"
                    className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || status === 'submitting'}
                  className="sm:w-auto shrink-0 bg-gradient-to-r from-brand-green-deep to-brand-green-dark text-white font-semibold py-2.5 px-6 rounded-brand-pill hover:from-brand-green-dark hover:to-brand-green transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send feedback'}
                </button>
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
