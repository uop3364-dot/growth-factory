'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram', emoji: '📸' },
  { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { value: 'youtube', label: 'YouTube', emoji: '▶️' },
  { value: 'x', label: 'X (Twitter)', emoji: '𝕏' },
  { value: 'linkedin', label: 'LinkedIn', emoji: '💼' },
];

const NICHES = [
  { value: 'travel', label: 'Travel', emoji: '✈️' },
  { value: 'food', label: 'Food', emoji: '🍕' },
  { value: 'fitness', label: 'Fitness', emoji: '💪' },
  { value: 'beauty', label: 'Beauty', emoji: '💄' },
  { value: 'business', label: 'Business', emoji: '💰' },
  { value: 'marketing', label: 'Marketing', emoji: '📈' },
  { value: 'technology', label: 'Technology', emoji: '💻' },
  { value: 'gaming', label: 'Gaming', emoji: '🎮' },
  { value: 'pets', label: 'Pets', emoji: '🐾' },
  { value: 'fashion', label: 'Fashion', emoji: '👗' },
  { value: 'photography', label: 'Photography', emoji: '📷' },
  { value: 'music', label: 'Music', emoji: '🎸' },
  { value: 'lifestyle', label: 'Lifestyle', emoji: '🌿' },
  { value: 'education', label: 'Education', emoji: '📚' },
  { value: 'art', label: 'Art', emoji: '🎨' },
];

const PURPOSES = [
  { value: 'grow_followers', label: 'Grow Followers' },
  { value: 'boost_engagement', label: 'Boost Engagement' },
  { value: 'increase_reach', label: 'Increase Reach' },
  { value: 'brand_awareness', label: 'Brand Awareness' },
  { value: 'community_building', label: 'Community Building' },
  { value: 'viral_content', label: 'Viral Content' },
];

interface HashtagResult {
  hashtags: string[];
  trendingHashtags: string[];
  nicheHashtags: string[];
  hashtagSets: { name: string; tags: string[] }[];
  tip: string;
}

interface HashtagGeneratorProps {
  defaultPlatform?: string;
  defaultNiche?: string;
}

export default function HashtagGenerator({ defaultPlatform, defaultNiche }: HashtagGeneratorProps = {}) {
  const [platform, setPlatform] = useState(defaultPlatform || 'instagram');
  const [niche, setNiche] = useState(defaultNiche || 'travel');
  const [purpose, setPurpose] = useState('grow_followers');
  const [language, setLanguage] = useState('english');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<HashtagResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          niche,
          purpose,
          language,
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        }),
      });
      const data = await res.json();
      setResult(data);
      trackEvent('hashtag_generate', { platform, niche, purpose });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    trackEvent('hashtag_copy', { platform, niche, section: label });
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllHashtags = (tags: string[]) => {
    const text = tags.join(' ');
    navigator.clipboard.writeText(text);
    setCopied('all');
    trackEvent('hashtag_copy_all', { platform, niche, count: tags.length });
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
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {PLATFORMS.map(p => (
                <option key={p.value} value={p.value}>{p.emoji} {p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {NICHES.map(n => (
                <option key={n.value} value={n.value}>{n.emoji} {n.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {PURPOSES.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
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
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
              placeholder="e.g., summer, beach, sunset"
              className="w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Hashtags'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* All Hashtags */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Hashtags ({result.hashtags.length})</h3>
              <button
                onClick={() => copyAllHashtags(result.hashtags)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
              >
                {copied === 'all' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <p className="text-gray-800 text-sm leading-relaxed break-words">{result.hashtags.join(' ')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(tag, `tag-${i}`)}
                  className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors"
                >
                  {copied === `tag-${i}` ? 'Copied' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Trending Hashtags</h3>
              <button
                onClick={() => copyAllHashtags(result.trendingHashtags)}
                className="px-3 py-1.5 text-sm text-pink-600 hover:text-pink-800 font-medium"
              >
                {copied === 'all' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.trendingHashtags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(tag, `trending-${i}`)}
                  className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
                >
                  {copied === `trending-${i}` ? 'Copied' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Niche Hashtags */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Niche Hashtags (Low Competition)</h3>
              <button
                onClick={() => copyAllHashtags(result.nicheHashtags)}
                className="px-3 py-1.5 text-sm text-pink-600 hover:text-pink-800 font-medium"
              >
                {copied === 'all' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.nicheHashtags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(tag, `niche-${i}`)}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
                >
                  {copied === `niche-${i}` ? 'Copied' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Hashtag Sets */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Ready-to-Use Hashtag Sets</h3>
            <div className="space-y-4">
              {result.hashtagSets.map((set, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{set.name}</h4>
                    <button
                      onClick={() => copyAllHashtags(set.tags)}
                      className="px-3 py-1 text-sm text-pink-600 hover:text-pink-800 font-medium"
                    >
                      {copied === 'all' ? 'Copied!' : 'Copy Set'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {set.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-pink-800 mb-2">Pro Tip</h3>
            <p className="text-gray-700">{result.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
