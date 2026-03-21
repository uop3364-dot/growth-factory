'use client';

import { useState, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';
import { PLATFORMS, TOPICS, TONES, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from '@/lib/seo-data';
import type { Platform, Topic, Tone } from '@/lib/seo-data';
import { SUPPORTED_LANGUAGES } from '@/lib/caption-generator';
import { EmptyStateMascot, ResultFrame, ResultGuidance, SocialHandoff } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';
import FeedbackButton from './FeedbackButton';
import FeedbackModal from './FeedbackModal';
import InlineFeedbackCard from './InlineFeedbackCard';

interface CaptionResult {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
  source?: 'llm' | 'cache' | 'fallback';
}

export default function CaptionGenerator({
  defaultPlatform,
  defaultTopic,
  defaultTone,
}: {
  defaultPlatform?: Platform;
  defaultTopic?: Topic;
  defaultTone?: Tone;
}) {
  const [platform, setPlatform] = useState<Platform>(defaultPlatform || 'instagram');
  const [topic, setTopic] = useState<Topic>(defaultTopic || 'travel');
  const [tone, setTone] = useState<Tone>(defaultTone || 'funny');
  const [language, setLanguage] = useState('english');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<CaptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbsGiven, setThumbsGiven] = useState<'up' | 'down' | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackDefaultType, setFeedbackDefaultType] = useState<string>('general');

  const feedbackMetadata = {
    toolName: 'caption-generator',
    selectedLanguage: language,
    selectedPlatform: platform,
    selectedTopic: topic,
    selectedTone: tone,
  };

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setThumbsGiven(null);
    try {
      const res = await fetch('/api/generate-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          topic,
          tone,
          language,
          audience,
          keywords: keywords ? keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setResult(data);
      trackEvent('tool_generate', { platform, topic, tone, language, source: data.source || 'unknown' });
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [platform, topic, tone, language, audience, keywords]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    trackEvent('tool_copy', { platform, topic, tone });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleThumb = (vote: 'up' | 'down') => {
    setThumbsGiven(vote);
    trackEvent('tool_thumb', { platform, topic, tone, vote });
    if (vote === 'down') {
      setFeedbackDefaultType('complaint');
      setFeedbackOpen(true);
    }
  };

  const openWrongResultFeedback = () => {
    setFeedbackDefaultType('bug');
    setFeedbackOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>{PLATFORM_INFO[p].emoji} {PLATFORM_INFO[p].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {TOPICS.map(t => (
                <option key={t} value={t}>{TOPIC_INFO[t].emoji} {TOPIC_INFO[t].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {TONES.map(t => (
                <option key={t} value={t}>{TONE_INFO[t].name} - {TONE_INFO[t].description}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SUPPORTED_LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., millennials, entrepreneurs, parents"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords <span className="text-gray-400 font-normal">(optional, comma-separated)</span></label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., summer, beach, sunset"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="brand-btn-generate w-full bg-gradient-to-r from-brand-green-deep to-brand-green-dark text-white font-semibold py-3 px-6 rounded-brand-pill hover:from-brand-green-dark hover:to-brand-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? brandCopy.loading[0] : 'Generate Captions'}
        </button>
      </div>

      {/* Inline feedback card — right after form, always visible */}
      <InlineFeedbackCard toolName="caption-generator" metadata={feedbackMetadata} />

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-red-700 font-medium mb-2">{error}</p>
          <button
            onClick={handleGenerate}
            className="text-sm text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && !error && (
        <EmptyStateMascot text={brandCopy.empty[1]} />
      )}

      {/* Results */}
      {result && (
        <>
        <ResultFrame>
          <div className="space-y-6">
            {/* Captions */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Generated Captions</h3>
              <div className="space-y-3">
                {result.captions.map((caption, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="text-gray-800 flex-1 break-words">{caption}</p>
                    <button
                      onClick={() => copyToClipboard(caption, i)}
                      className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap font-medium shrink-0"
                    >
                      {copied === i ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Short Variants */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Short Variants</h3>
              <div className="flex flex-wrap gap-2">
                {result.shortVariants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(v, 100 + i)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {copied === 100 + i ? 'Copied' : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Suggested Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(h, 200 + i)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {copied === 200 + i ? 'Copied' : h}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6">
              <p className="text-gray-700 font-medium">{result.ctaSuggestion}</p>
            </div>

            {/* Thumbs + feedback link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Was this useful?</span>
                <button
                  onClick={() => handleThumb('up')}
                  className={`text-xl transition-transform hover:scale-125 ${thumbsGiven === 'up' ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                  aria-label="Thumbs up"
                >
                  &#128077;
                </button>
                <button
                  onClick={() => handleThumb('down')}
                  className={`text-xl transition-transform hover:scale-125 ${thumbsGiven === 'down' ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                  aria-label="Thumbs down"
                >
                  &#128078;
                </button>
              </div>
              <button
                onClick={openWrongResultFeedback}
                className="text-sm text-gray-500 underline hover:text-brand-green-deep transition-colors"
              >
                Wrong result? Tell me what happened
              </button>
            </div>

            {/* Ad Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
              <p className="text-sm">Ad Space - Premium Caption Tools Coming Soon</p>
            </div>
          </div>
        </ResultFrame>

        {/* Post-generation guidance + social handoff */}
        <ResultGuidance
          currentTool="/caption-generator"
          onGenerateAgain={handleGenerate}
        />
        <SocialHandoff
          toolPath="/caption-generator"
          toolLabel="captions"
        />
        </>
      )}

      {/* Floating feedback button with tool context */}
      <FeedbackButton metadata={feedbackMetadata} />

      {/* Feedback modal triggered by thumbs-down or "Wrong result?" */}
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        defaultType={feedbackDefaultType}
        metadata={feedbackMetadata}
      />
    </div>
  );
}
