import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HashtagGenerator from '@/components/HashtagGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildToolSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/jsonld';
import Link from 'next/link';

const PLATFORMS = ['instagram', 'tiktok', 'youtube', 'x', 'linkedin'] as const;
type Platform = (typeof PLATFORMS)[number];

const NICHES = [
  'travel', 'food', 'fitness', 'beauty', 'business', 'marketing',
  'technology', 'gaming', 'pets', 'fashion', 'photography', 'music',
  'lifestyle', 'education', 'art',
] as const;

const PLATFORM_INFO: Record<Platform, { name: string; emoji: string; description: string; hashtagLimit: string; bestPractices: string[] }> = {
  instagram: {
    name: 'Instagram',
    emoji: '📸',
    description: 'Generate the best Instagram hashtags to boost your reach, engagement, and follower growth. Our free AI hashtag generator finds trending and niche-specific tags.',
    hashtagLimit: 'Instagram allows up to 30 hashtags per post, but studies show 3-5 highly targeted hashtags often outperform using all 30. Mix popular, mid-range, and niche hashtags for optimal reach.',
    bestPractices: [
      'Use a mix of popular (1M+), mid-range (100K-1M), and niche (<100K) hashtags',
      'Place hashtags in the first comment to keep captions clean',
      'Create a branded hashtag for your community',
      'Rotate hashtag sets to avoid being flagged as spam',
      'Research hashtags your target audience actually follows',
    ],
  },
  tiktok: {
    name: 'TikTok',
    emoji: '🎵',
    description: 'Find trending TikTok hashtags to get on the For You Page. Our AI tool generates viral hashtag combinations tailored to your niche and content.',
    hashtagLimit: 'TikTok captions support up to 4,000 characters. Use 3-5 highly relevant hashtags. TikTok\'s algorithm weighs hashtag relevance heavily, so quality beats quantity.',
    bestPractices: [
      'Always include at least one trending hashtag alongside niche ones',
      'Use #fyp and #foryou sparingly - niche tags perform better',
      'Check the Discover page for trending hashtags in your category',
      'Combine broad and specific hashtags for maximum visibility',
      'Update your hashtag strategy weekly as TikTok trends change fast',
    ],
  },
  youtube: {
    name: 'YouTube',
    emoji: '▶️',
    description: 'Optimize your YouTube videos with the right hashtags. Our AI generator suggests tags that improve discoverability and search ranking.',
    hashtagLimit: 'YouTube allows up to 15 hashtags per video, but recommends using no more than 3-5. The first 3 hashtags appear above your video title as clickable links.',
    bestPractices: [
      'Place your most important hashtag first - it shows above the title',
      'Use hashtags that match common YouTube search queries',
      'Include your brand hashtag consistently across videos',
      'Avoid overly generic hashtags like #video or #youtube',
      'Use hashtags in both the title and description for maximum SEO',
    ],
  },
  x: {
    name: 'X (Twitter)',
    emoji: '𝕏',
    description: 'Generate effective X (Twitter) hashtags to amplify your tweets. Find trending and niche hashtags that increase impressions and engagement.',
    hashtagLimit: 'X has a 280-character limit, so hashtag real estate is precious. Use 1-2 highly relevant hashtags per tweet. Tweets with 1-2 hashtags get 21% more engagement than those with 3+.',
    bestPractices: [
      'Limit to 1-2 hashtags per tweet for maximum engagement',
      'Join trending conversations with relevant trending hashtags',
      'Use CamelCase for multi-word hashtags for accessibility',
      'Create campaign-specific hashtags for Twitter chats',
      'Check Twitter Trends before posting to find relevant tags',
    ],
  },
  linkedin: {
    name: 'LinkedIn',
    emoji: '💼',
    description: 'Boost your LinkedIn post visibility with strategic hashtags. Our AI tool generates professional hashtags that connect you with the right audience.',
    hashtagLimit: 'LinkedIn allows up to 30 hashtags, but 3-5 targeted hashtags is the sweet spot. LinkedIn\'s algorithm uses hashtags to categorize content and show it to interested professionals.',
    bestPractices: [
      'Use 3-5 industry-specific hashtags per post',
      'Follow hashtags in your industry to understand what\'s popular',
      'Mix broad industry tags with specific skill or topic tags',
      'Include #OpenToWork or #Hiring for career-related posts',
      'Create a consistent personal brand hashtag',
    ],
  },
};

const PLATFORM_FAQS: Record<Platform, { question: string; answer: string }[]> = {
  instagram: [
    { question: 'How many hashtags should I use on Instagram?', answer: 'While Instagram allows up to 30 hashtags, using 3-5 highly targeted hashtags often yields better engagement. Mix popular, mid-range, and niche hashtags for the best results.' },
    { question: 'Should I put Instagram hashtags in the caption or comments?', answer: 'Both work for discoverability. Placing them in the first comment keeps your caption clean, while adding them to the caption ensures they are indexed immediately when posted.' },
    { question: 'How do I find trending Instagram hashtags?', answer: 'Use our free AI hashtag generator to find trending tags for your niche. You can also explore the Instagram Explore page, check competitor posts, and use the search bar to see hashtag popularity.' },
    { question: 'Can hashtags get my Instagram post shadowbanned?', answer: 'Using banned or flagged hashtags, or repeatedly using the exact same set of hashtags, can reduce your reach. Rotate your hashtag sets and avoid any hashtags that Instagram has restricted.' },
  ],
  tiktok: [
    { question: 'Do hashtags really matter on TikTok?', answer: 'Yes! TikTok uses hashtags to categorize content and show it to interested viewers on the For You Page. Relevant hashtags help the algorithm understand your content and distribute it to the right audience.' },
    { question: 'How many hashtags should I use on TikTok?', answer: 'Use 3-5 relevant hashtags on TikTok. Focus on a mix of trending hashtags and niche-specific ones. Quality and relevance matter more than quantity on TikTok.' },
    { question: 'Does #fyp actually help on TikTok?', answer: 'While #fyp is widely used, niche-specific hashtags are more effective at reaching your target audience. The TikTok algorithm primarily uses video content signals, not just hashtags, to determine FYP placement.' },
    { question: 'How often should I change my TikTok hashtags?', answer: 'Update your TikTok hashtag strategy weekly. TikTok trends move fast, so staying current with trending hashtags in your niche is crucial for maximizing reach.' },
  ],
  youtube: [
    { question: 'Where should I put hashtags on YouTube?', answer: 'Add hashtags in your video description or title. The first 3 hashtags from your description appear as clickable links above the video title, making them highly visible to viewers.' },
    { question: 'How many YouTube hashtags should I use?', answer: 'YouTube recommends 3-5 hashtags per video. Using more than 15 will cause YouTube to ignore all hashtags. Focus on relevance over quantity for better search ranking.' },
    { question: 'Do YouTube hashtags help with SEO?', answer: 'Yes! YouTube hashtags improve discoverability by making your video appear in hashtag search results. They complement your video tags and description for better overall SEO.' },
    { question: 'Can I use hashtags in YouTube Shorts?', answer: 'Absolutely! Hashtags are especially effective for YouTube Shorts. Use trending hashtags along with niche-specific ones to maximize visibility in the Shorts feed.' },
  ],
  x: [
    { question: 'How many hashtags should I use on X (Twitter)?', answer: 'Use 1-2 hashtags per tweet for maximum engagement. Research shows tweets with 1-2 hashtags get 21% more engagement than those with 3 or more.' },
    { question: 'How do I find trending hashtags on X?', answer: 'Check the Trending section on X, use our AI hashtag generator, or explore the Explore tab. You can also customize trending topics by location to find region-specific trends.' },
    { question: 'Should I use CamelCase for X hashtags?', answer: 'Yes! CamelCase (e.g., #SocialMediaTips instead of #socialmediatips) improves readability and accessibility, especially for screen readers. It also reduces the chance of misinterpretation.' },
    { question: 'Do hashtags help tweets get more visibility?', answer: 'Yes, hashtags on X categorize your content and make it discoverable in search. Tweets with relevant hashtags can get significantly more impressions and engagement from non-followers.' },
  ],
  linkedin: [
    { question: 'How many hashtags should I use on LinkedIn?', answer: 'Use 3-5 targeted hashtags per LinkedIn post. While up to 30 are allowed, LinkedIn recommends a focused approach. Choose hashtags your target audience actually follows.' },
    { question: 'Do LinkedIn hashtags really matter?', answer: 'Yes! LinkedIn uses hashtags to categorize and distribute content. People follow hashtags on LinkedIn, so using the right ones puts your post in front of interested professionals.' },
    { question: 'What are the best LinkedIn hashtags for business?', answer: 'Popular LinkedIn business hashtags include #Leadership, #Innovation, #Marketing, #Entrepreneurship, and #BusinessStrategy. Use our AI generator to find industry-specific variations.' },
    { question: 'Should I create a branded LinkedIn hashtag?', answer: 'Yes! A branded hashtag helps build your personal or company brand on LinkedIn. Use it consistently across posts so your audience can easily find all your content.' },
    { question: 'Can I follow hashtags on LinkedIn?', answer: 'Yes, LinkedIn lets you follow up to 100 hashtags. Following hashtags in your industry helps you see trending content and identify the best hashtags to use in your own posts.' },
  ],
};

export function generateStaticParams() {
  return PLATFORMS.map(platform => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) return {};
  const info = PLATFORM_INFO[platform as Platform];
  const title = `${info.name} Hashtag Generator - Free AI Tool | CreatorAITools`;
  const description = info.description;
  return {
    title,
    description,
    openGraph: { title, description, url: `/hashtag-generator/${platform}` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/hashtag-generator/${platform}` },
  };
}

export default async function PlatformHashtagPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: platformStr } = await params;
  const platform = platformStr as Platform;
  if (!PLATFORMS.includes(platform)) notFound();
  const info = PLATFORM_INFO[platform];
  const faqs = PLATFORM_FAQS[platform];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${info.name} Hashtag Generator`, description: info.description, path: `/hashtag-generator/${platform}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Hashtag Generator', path: '/hashtag-generator' },
        { name: info.name, path: `/hashtag-generator/${platform}` },
      ])) }} />

      <section className="bg-gradient-to-br from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{info.emoji} {info.name} Hashtag Generator</h1>
          <p className="text-lg text-pink-100">{info.description}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <HashtagGenerator defaultPlatform={platform} />

        {/* Hashtag Limits */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{info.name} Hashtag Limits & Guidelines</h2>
          <p className="text-gray-700 mb-4">{info.hashtagLimit}</p>
          <h3 className="font-medium text-gray-800 mb-3">Best Practices for {info.name} Hashtags</h3>
          <ul className="space-y-2">
            {info.bestPractices.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-pink-500 mt-1 flex-shrink-0">&#10003;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="hashtag-platform" />

        {/* Niche Links */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Popular {info.name} Hashtag Niches</h2>
          <div className="flex flex-wrap gap-2">
            {NICHES.map(niche => (
              <Link
                key={niche}
                href={`/hashtag-generator/${platform}/${niche}`}
                className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors capitalize"
              >
                {niche}
              </Link>
            ))}
          </div>
        </div>

        {/* Other Platforms */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Hashtag Generators for Other Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter(p => p !== platform).map(p => {
              const pInfo = PLATFORM_INFO[p];
              return (
                <Link
                  key={p}
                  href={`/hashtag-generator/${p}`}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {pInfo.emoji} {pInfo.name}
                </Link>
              );
            })}
          </div>
        </div>

        <FAQ items={faqs} />
      </section>
    </>
  );
}
