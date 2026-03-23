'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { ResultGuidance, ResultFeedbackCard, SocialHandoff, LockedResultsOverlay, ContextualCTA, ShareToolButton } from '@/components/brand';
import {
  CONTENT_TYPES,
  NICHES,
  STYLES,
} from '@/lib/title-generator';
import type { ContentType, TitleNiche, TitleStyle } from '@/lib/title-generator';

interface TitleResult {
  titles: string[];
  variations: string[];
  seoTitles: string[];
  powerWords: string[];
  suggestion: string;
}

export default function TitleGenerator() {
  const [contentType, setContentType] = useState<ContentType>('youtube_video');
  const [niche, setNiche] = useState<TitleNiche>('technology');
  const [style, setStyle] = useState<TitleStyle>('clickbait');
  const [language, setLanguage] = useState('english');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<TitleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          niche,
          style,
          language,
          keywords: keywords ? keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
        }),
      });
      const data = await res.json();
      setResult(data);
      trackEvent('tool_generate', { tool: 'title_generator', contentType, niche, style });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    trackEvent('tool_copy', { tool: 'title_generator', contentType, niche, style });
    setTimeout(() => setCopied(null), 2000);
  };

  const charLimit = CONTENT_TYPES.find(c => c.value === contentType)?.maxChars || 70;
  const FREE_LIMIT = 3;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentType)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {CONTENT_TYPES.map(c => (
                <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value as TitleNiche)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {NICHES.map(n => (
                <option key={n.value} value={n.value}>{n.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as TitleStyle)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {STYLES.map(s => (
                <option key={s.value} value={s.value}>{s.label} - {s.description}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="english">English</option>
              <option value="traditional-chinese">Traditional Chinese</option>
              <option value="simplified-chinese">Simplified Chinese</option>
              <option value="spanish">Spanish</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (optional, comma-separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., AI tools, productivity, growth"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="brand-btn-generate w-full bg-gradient-to-r from-brand-green-deep to-brand-green-dark text-white font-semibold py-3 px-6 rounded-brand-pill hover:from-brand-green-dark hover:to-brand-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Titles'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
        <div className="space-y-6">
          {/* Titles (limited to FREE_LIMIT) */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated Titles</h3>
              <ShareToolButton toolSlug="title-generator" />
            </div>
            <div className="space-y-3">
              {result.titles.slice(0, FREE_LIMIT).map((title, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-gray-800">{title}</p>
                    <span className={`text-xs mt-1 inline-block ${title.length > charLimit ? 'text-red-500' : 'text-green-600'}`}>
                      {title.length} / {charLimit} chars
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(title, i)}
                    className="text-sm text-orange-600 hover:text-orange-800 whitespace-nowrap font-medium"
                  >
                    {copied === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Locked results overlay */}
          <LockedResultsOverlay
            totalCount={result.titles.length}
            visibleCount={FREE_LIMIT}
            toolSlug="title-generator"
          />

          {/* Variations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Variations</h3>
            <div className="flex flex-wrap gap-2">
              {result.variations.map((v, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(v, 100 + i)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                >
                  {copied === 100 + i ? 'Copied' : v}
                </button>
              ))}
            </div>
          </div>

          {/* SEO Titles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">SEO-Optimized Titles</h3>
            <div className="space-y-3">
              {result.seoTitles.map((title, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-gray-800">{title}</p>
                    <span className={`text-xs mt-1 inline-block ${title.length > 60 ? 'text-red-500' : 'text-green-600'}`}>
                      {title.length} / 60 chars (Google)
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(title, 200 + i)}
                    className="text-sm text-orange-600 hover:text-orange-800 whitespace-nowrap font-medium"
                  >
                    {copied === 200 + i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Power Words */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Power Words to Boost CTR</h3>
            <div className="flex flex-wrap gap-2">
              {result.powerWords.map((word, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestion */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
            <p className="text-gray-700 font-medium">{result.suggestion}</p>
          </div>

          {/* Contextual CTA */}
          <ContextualCTA toolSlug="title-generator" />

        </div>

        <ResultFeedbackCard toolSlug="title-generator" routePath="/title-generator" />
        <ResultGuidance currentTool="/title-generator" onGenerateAgain={handleGenerate} />
        <SocialHandoff toolPath="/title-generator" toolLabel="titles" />
        </>
      )}
    </div>
  );
}
