'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import {
  BIO_PLATFORMS,
  BIO_NICHES,
  BIO_STYLES,
  PLATFORM_LABELS,
  NICHE_LABELS,
  STYLE_LABELS,
  PLATFORM_CHAR_LIMITS,
} from '@/lib/bio-generator';
import type { BioPlatform, BioNiche, BioStyle } from '@/lib/bio-generator';

interface BioResult {
  bios: string[];
  shortBios: string[];
  emojiBios: string[];
  callToAction: string;
}

export default function BioGenerator() {
  const [platform, setPlatform] = useState<BioPlatform>('instagram');
  const [niche, setNiche] = useState<BioNiche>('creator');
  const [style, setStyle] = useState<BioStyle>('professional');
  const [language, setLanguage] = useState('english');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<BioResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const charLimit = PLATFORM_CHAR_LIMITS[platform];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-bios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          niche,
          style,
          language,
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        }),
      });
      const data = await res.json();
      setResult(data);
      trackEvent('bio_generate', { platform, niche, style });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    trackEvent('bio_copy', { platform, niche, style });
    setTimeout(() => setCopied(null), 2000);
  };

  const charColor = (len: number) => {
    if (len <= charLimit * 0.7) return 'text-green-600';
    if (len <= charLimit) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as BioPlatform)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {BIO_PLATFORMS.map(p => (
                <option key={p} value={p}>{PLATFORM_LABELS[p].emoji} {PLATFORM_LABELS[p].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value as BioNiche)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {BIO_NICHES.map(n => (
                <option key={n} value={n}>{NICHE_LABELS[n].emoji} {NICHE_LABELS[n].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as BioStyle)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {BIO_STYLES.map(s => (
                <option key={s} value={s}>{STYLE_LABELS[s].name} - {STYLE_LABELS[s].description}</option>
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
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              placeholder="e.g., mindset, growth, NYC"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {PLATFORM_LABELS[platform].name} bio limit: <span className="font-medium">{charLimit} characters</span>
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Bios'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Bios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Bios</h3>
            <div className="space-y-3">
              {result.bios.map((bio, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-gray-800">{bio}</p>
                    <span className={`text-xs mt-1 inline-block ${charColor(bio.length)}`}>
                      {bio.length}/{charLimit} chars
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bio, i)}
                    className="text-sm text-green-600 hover:text-green-800 whitespace-nowrap font-medium"
                  >
                    {copied === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Short Bios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Short Bios</h3>
            <div className="flex flex-wrap gap-2">
              {result.shortBios.map((bio, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(bio, 100 + i)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  {copied === 100 + i ? 'Copied!' : bio}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji Bios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Emoji Bios</h3>
            <div className="space-y-3">
              {result.emojiBios.map((bio, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-gray-800">{bio}</p>
                    <span className={`text-xs mt-1 inline-block ${charColor(bio.length)}`}>
                      {bio.length}/{charLimit} chars
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bio, 200 + i)}
                    className="text-sm text-green-600 hover:text-green-800 whitespace-nowrap font-medium"
                  >
                    {copied === 200 + i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
            <p className="text-gray-700 font-medium">{result.callToAction}</p>
          </div>

          {/* Ad Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
            <p className="text-sm">Ad Space - Premium Bio Tools Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
