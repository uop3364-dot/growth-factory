'use client';

import { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

interface FeedbackMetadata {
  pageUrl?: string;
  toolName?: string;
  selectedLanguage?: string;
  selectedPlatform?: string;
  selectedTopic?: string;
  selectedTone?: string;
  userAgent?: string;
  viewport?: string;
}

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  defaultType?: string;
  metadata?: FeedbackMetadata;
}

const FEEDBACK_TYPES = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'bug', label: 'Bug' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'general', label: 'General feedback' },
];

export default function FeedbackModal({ open, onClose, defaultType, metadata }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState(defaultType || 'general');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultType) setFeedbackType(defaultType);
  }, [defaultType]);

  useEffect(() => {
    if (open) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  const handleSubmit = useCallback(async () => {
    if (!message.trim()) return;
    setStatus('submitting');

    const autoMetadata: FeedbackMetadata = {
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
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
        setErrorMsg(data.error || 'Failed to submit feedback');
        setStatus('error');
        return;
      }

      setStatus('success');
      trackEvent('feedback_submitted', { feedback_type: feedbackType });
      setMessage('');
      setEmail('');

      // Auto-close after 2s
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }, [feedbackType, message, email, metadata, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900">Help improve this tool</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Found a bad result, wrong language, or something confusing? Tell me what happened.
          </p>

          {/* Success state */}
          {status === 'success' && (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">&#10003;</div>
              <p className="text-gray-700 font-medium">Thanks — your feedback was sent.</p>
            </div>
          )}

          {/* Form */}
          {status !== 'success' && (
            <div className="space-y-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback type <span className="text-red-500">*</span>
                </label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 text-sm focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep"
                >
                  {FEEDBACK_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What happened? What did you expect?"
                  rows={4}
                  maxLength={5000}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 text-sm focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep resize-y"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 text-sm focus:ring-2 focus:ring-brand-green-deep focus:border-brand-green-deep"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || status === 'submitting'}
                className="w-full bg-gradient-to-r from-brand-green-deep to-brand-green-dark text-white font-semibold py-2.5 px-4 rounded-brand-pill hover:from-brand-green-dark hover:to-brand-green transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {status === 'submitting' ? 'Sending...' : 'Send feedback'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
