const STEPS_BY_TOOL: Record<string, { steps: { title: string; desc: string }[]; bestPractices: string[]; examples: string[] }> = {
  'caption-generator': {
    steps: [
      { title: 'Choose your platform & topic', desc: 'Select from Instagram, TikTok, YouTube, X, or Facebook. Pick a topic and tone that matches your content.' },
      { title: 'Click Generate', desc: 'Our AI creates multiple captions with hashtags, CTAs, and short variants — all optimized for your platform.' },
      { title: 'Copy & post', desc: 'Pick your favorite, copy with one click, and paste directly into your social media app.' },
    ],
    bestPractices: [
      'Front-load the hook — the first line must stop the scroll',
      'Include a CTA in every caption to drive engagement',
      'Mix hashtag sizes: trending + niche for best reach',
    ],
    examples: [
      '"This 5-minute hack saved my entire content week" — curiosity hook',
      '"Double tap if you agree" — engagement CTA',
      '"Save this for your next posting day" — save prompt',
    ],
  },
  'bio-generator': {
    steps: [
      { title: 'Select your platform & niche', desc: 'Choose Instagram, TikTok, LinkedIn, YouTube, or X. Pick your niche and preferred style.' },
      { title: 'Click Generate', desc: 'Get 8 full bios, 4 short bios, and 4 emoji bios — all within your platform\'s character limit.' },
      { title: 'Copy & update your profile', desc: 'Pick the bio that fits, copy it, and update your profile in seconds.' },
    ],
    bestPractices: [
      'Lead with what you do, not who you are',
      'Include a CTA or link mention in your bio',
      'Use keywords your target audience would search for',
    ],
    examples: [
      '"Helping 10K+ creators grow on YouTube" — credibility + niche',
      '"Free tips daily | DM for collabs" — CTA-focused',
      '"Travel | Coffee | Code" — minimalist keyword bio',
    ],
  },
  'title-generator': {
    steps: [
      { title: 'Pick your content type', desc: 'Choose YouTube video, blog post, newsletter, podcast, or other formats.' },
      { title: 'Add your niche & keywords', desc: 'Select a niche and optionally add keywords you want included in the title.' },
      { title: 'Generate & pick your winner', desc: 'Get 10+ title options with character counts and SEO-optimized variants.' },
    ],
    bestPractices: [
      'Keep YouTube titles under 60 characters for full display',
      'Use numbers and power words to boost CTR',
      'Front-load the main keyword for SEO',
    ],
    examples: [
      '"7 YouTube Mistakes That Kill Your Views (Fix #3 Today)" — listicle + curiosity',
      '"How I Got 100K Subscribers in 6 Months" — proof + transformation',
      '"The ONLY Marketing Strategy You Need in 2026" — authority + urgency',
    ],
  },
  'hashtag-generator': {
    steps: [
      { title: 'Choose platform & niche', desc: 'Select your social platform and content niche for targeted hashtag suggestions.' },
      { title: 'Click Generate', desc: 'Get 30+ hashtags: trending, niche-specific, and ready-to-copy sets optimized for your platform.' },
      { title: 'Copy a set & post', desc: 'Use the pre-built hashtag sets or mix and match individual tags for your post.' },
    ],
    bestPractices: [
      'Use 20-30 hashtags on Instagram, 3-5 on TikTok',
      'Mix popular tags (1M+) with niche tags (<100K) for optimal reach',
      'Rotate hashtag sets every 3-5 posts to avoid spam flags',
    ],
    examples: [
      '#ContentCreator #GrowOnInstagram #ReelsStrategy — niche creator tags',
      '#FYP #ForYou #TikTokTips — TikTok discovery tags',
      '#YouTubeSEO #SmallYouTuber #ContentTips — YouTube growth tags',
    ],
  },
};

export default function HowToUse({ tool }: { tool: string }) {
  const data = STEPS_BY_TOOL[tool];
  if (!data) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">How to Use This Tool</h2>
      <ol className="space-y-4 mb-6">
        {data.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">{i + 1}</span>
            <div>
              <p className="font-medium text-gray-800">{step.title}</p>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-2">Best Practices</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {data.bestPractices.map((tip, i) => (
              <li key={i} className="pl-3 border-l-2 border-green-300">{tip}</li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-2">Examples</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {data.examples.map((ex, i) => (
              <li key={i} className="pl-3 border-l-2 border-purple-300">{ex}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
