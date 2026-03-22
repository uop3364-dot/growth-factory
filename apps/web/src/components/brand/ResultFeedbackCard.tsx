'use client';

import { useState, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';
import { getAffiliateLink } from '@/lib/affiliate-links';
import MascotImage from './MascotImage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Sentiment = 'yes' | 'no';
type Phase = 'initial' | 'no_input' | 'submitted';

interface ResultFeedbackCardProps {
  /** Tool identifier, e.g. "title-generator" */
  toolSlug: string;
  /** Current route path, e.g. "/title-generator" */
  routePath?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// CTA config
// ---------------------------------------------------------------------------

const TITLE_PACK_URL = process.env.NEXT_PUBLIC_TITLE_PACK_URL || '';
const VIDIQ_HREF = `${getAffiliateLink('vidiq')}?utm_source=creatoraitools&utm_medium=feedback_cta`;
const hasTitlePack = !!TITLE_PACK_URL;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ResultFeedbackCard({
  toolSlug,
  routePath,
  className = '',
}: ResultFeedbackCardProps) {
  const [phase, setPhase] = useState<Phase>('initial');
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [message, setMessage] = useState('');
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentPath = routePath || (typeof window !== 'undefined' ? window.location.pathname : '');

  // ── Submit feedback ────────────────────────────────────────────

  const submitFeedback = useCallback(
    async (s: Sentiment, msg?: string) => {
      setSubmitting(true);
      try {
        const res = await fetch('/api/tool-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolSlug,
            routePath: currentPath,
            sentiment: s,
            message: msg?.trim() || undefined,
            ctaShown: true,
          }),
        });
        const data = await res.json();
        if (data.id) setFeedbackId(data.id);

        trackEvent('tool_feedback', {
          tool_slug: toolSlug,
          sentiment: s,
          has_message: !!msg?.trim(),
        });
      } catch {
        // Best-effort — don't block the UI
      } finally {
        setSubmitting(false);
      }
    },
    [toolSlug, currentPath],
  );

  // ── CTA click tracking ─────────────────────────────────────────

  const trackCtaClick = useCallback(
    async (target: string) => {
      // Track CTA shown event
      trackEvent('cta_shown', { tool_slug: toolSlug, sentiment: sentiment || '' });

      if (feedbackId) {
        try {
          await fetch('/api/tool-feedback/cta-click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedbackId, target }),
          });
        } catch {
          // Best-effort
        }
      }
      trackEvent('feedback_cta_click', {
        tool_slug: toolSlug,
        target,
        sentiment: sentiment || '',
      });
    },
    [feedbackId, toolSlug, sentiment],
  );

  // ── Handlers ───────────────────────────────────────────────────

  const handleYes = async () => {
    setSentiment('yes');
    await submitFeedback('yes');
    setPhase('submitted');
  };

  const handleNo = () => {
    setSentiment('no');
    setPhase('no_input');
  };

  const handleNoSubmit = async () => {
    await submitFeedback('no', message);
    setPhase('submitted');
  };

  const handleOptionalSubmit = async () => {
    if (!message.trim() || !feedbackId) return;
    setSubmitting(true);
    try {
      await fetch('/api/tool-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug,
          routePath: currentPath,
          sentiment: 'yes',
          message: message.trim(),
          ctaShown: true,
        }),
      });
      trackEvent('tool_feedback_message', { tool_slug: toolSlug, sentiment: 'yes' });
    } catch {
      // Best-effort
    } finally {
      setSubmitting(false);
      setMessage('');
    }
  };

  // ── CTA blocks per sentiment ────────────────────────────────────

  const renderYesCta = () => (
    <div
      className="rounded-lg border p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
      data-testid="feedback-cta-block"
    >
      <p className="text-sm font-bold text-gray-800 mb-1">
        These titles are just a preview.
      </p>
      <p className="text-xs text-gray-600 mb-3">
        Get 10x better viral titles instantly.
      </p>
      <div className="flex flex-wrap gap-2">
        {hasTitlePack ? (
          <a
            href={TITLE_PACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('title_pack')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
            data-testid="feedback-cta-title_pack"
          >
            Get 100 Viral Titles ($5)
          </a>
        ) : (
          <span
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed"
            data-testid="feedback-cta-title_pack"
          >
            Coming soon
          </span>
        )}
        <a
          href={VIDIQ_HREF}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackCtaClick('vidiq')}
          className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
          data-testid="feedback-cta-vidiq"
          data-affiliate="vidiq-feedback"
        >
          Try VidIQ (free)
        </a>
      </div>
    </div>
  );

  const renderNoCta = () => (
    <div
      className="rounded-lg border p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
      data-testid="feedback-cta-block"
    >
      <p className="text-sm font-bold text-gray-800 mb-1">
        Not good enough?
      </p>
      <p className="text-xs text-gray-600 mb-3">
        Get better results in seconds.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={VIDIQ_HREF}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackCtaClick('vidiq')}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-sm"
          data-testid="feedback-cta-vidiq"
          data-affiliate="vidiq-feedback"
        >
          Improve with VidIQ
        </a>
        {hasTitlePack ? (
          <a
            href={TITLE_PACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('title_pack')}
            className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
            data-testid="feedback-cta-title_pack"
          >
            Unlock pro templates ($5)
          </a>
        ) : (
          <span
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed"
            data-testid="feedback-cta-title_pack"
          >
            Coming soon
          </span>
        )}
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div
      className={`bg-brand-surface rounded-brand-lg border border-brand-green/15 p-5 mt-6 ${className}`}
      data-testid="result-feedback-card"
    >
      <div className="flex items-start gap-3">
        <span className="hidden sm:block flex-shrink-0 mt-0.5">
          <MascotImage size="sm" />
        </span>
        <div className="flex-1 min-w-0">
          {/* ── Title ─────────────────────────────────────── */}
          <h4 className="text-sm font-bold text-gray-800 mb-0.5">
            Help MoLink Dino get better
          </h4>
          <p className="text-sm text-gray-600 mb-3">Did this help you?</p>

          {/* ── Initial: Yes / No buttons ──────────────── */}
          {phase === 'initial' && (
            <div className="flex gap-2">
              <button
                onClick={handleYes}
                disabled={submitting}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50"
                data-testid="feedback-yes"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                disabled={submitting}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                data-testid="feedback-no"
              >
                No
              </button>
            </div>
          )}

          {/* ── No path: textarea (required) ──────────── */}
          {phase === 'no_input' && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-500">
                Tell us what went wrong:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I wanted better hooks for Shorts..."
                maxLength={5000}
                rows={3}
                autoFocus
                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                data-testid="feedback-textarea"
              />
              <button
                onClick={handleNoSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-gradient-to-r from-brand-green-deep to-brand-green-dark text-white rounded-lg text-sm font-semibold hover:from-brand-green-dark hover:to-brand-green transition-all disabled:opacity-50"
                data-testid="feedback-submit"
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          )}

          {/* ── Submitted: thank you + CTA ────────────── */}
          {phase === 'submitted' && (
            <div className="space-y-3">
              <p className="text-sm text-green-700 font-medium" data-testid="feedback-thanks">
                Thanks — your feedback helps MoLink Dino improve.
              </p>

              {/* Optional text input after Yes */}
              {sentiment === 'yes' && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-500">
                    (Optional) Tell me what you need:
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="I wanted better hooks for Shorts..."
                      maxLength={5000}
                      rows={2}
                      className="flex-1 rounded-lg border border-gray-200 p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                      data-testid="feedback-optional-textarea"
                    />
                    <button
                      onClick={handleOptionalSubmit}
                      disabled={submitting || !message.trim()}
                      className="self-end px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-green-300 hover:text-green-600 transition-colors disabled:opacity-40"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {/* CTA block — different per sentiment */}
              {sentiment === 'yes' ? renderYesCta() : renderNoCta()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
