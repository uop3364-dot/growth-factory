'use client';

import { useState } from 'react';
import { PLATFORMS, TOPICS, TONES, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from '@/lib/seo-data';
import type { Platform, Topic, Tone } from '@/lib/seo-data';

interface CaptionResult {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
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

  const handleGenerate = async () => {
    setLoading(true);
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
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
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
              <option value="english">English</option>
              <option value="traditional-chinese">Traditional Chinese</option>
              <option value="simplified-chinese">Simplified Chinese</option>
              <option value="spanish">Spanish</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience (optional)</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., millennials, entrepreneurs, parents"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (optional, comma-separated)</label>
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
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Captions'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Captions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Captions</h3>
            <div className="space-y-3">
              {result.captions.map((caption, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="text-gray-800 flex-1">{caption}</p>
                  <button
                    onClick={() => copyToClipboard(caption, i)}
                    className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap font-medium"
                  >
                    {copied === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Short Variants */}
          <div className="bg-white rounded-xl shadow-lg p-6">
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
          <div className="bg-white rounded-xl shadow-lg p-6">
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <p className="text-gray-700 font-medium">{result.ctaSuggestion}</p>
          </div>

          {/* Ad Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
            <p className="text-sm">Ad Space - Premium Caption Tools Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
