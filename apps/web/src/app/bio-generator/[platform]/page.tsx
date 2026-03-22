import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BioGenerator from '@/components/BioGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import HeroCTA from '@/components/HeroCTA';
import { ToolPageLayout } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/metadata';
import Link from 'next/link';
import {
  BIO_PLATFORMS,
  BIO_NICHES,
  PLATFORM_LABELS,
  PLATFORM_CHAR_LIMITS,
  NICHE_LABELS,
} from '@/lib/bio-generator';
import type { BioPlatform, BioNiche } from '@/lib/bio-generator';

const PLATFORMS = BIO_PLATFORMS;
const NICHES = BIO_NICHES;

const PLATFORM_TIPS: Record<BioPlatform, {
  charLimit: string;
  bestPractices: string[];
  description: string;
}> = {
  instagram: {
    charLimit: '150 characters max. Every character counts - use line breaks and emojis strategically.',
    bestPractices: [
      'Include a clear call-to-action (e.g., "Link in bio")',
      'Use line breaks to improve readability',
      'Add relevant emojis to stand out in search',
      'Include your niche or specialty keywords',
      'Add a branded hashtag if you have one',
    ],
    description: 'Create the perfect Instagram bio that captures attention in 150 characters. Our AI generator crafts bios optimized for Instagram\'s algorithm and audience engagement.',
  },
  tiktok: {
    charLimit: '80 characters max. Keep it ultra-concise and punchy.',
    bestPractices: [
      'Keep it extremely short and memorable',
      'Use emojis to save character space',
      'Include your content niche clearly',
      'Add a CTA like "Follow for daily tips"',
      'Match your bio tone to your video style',
    ],
    description: 'Generate a TikTok bio that hooks viewers in just 80 characters. Our AI creates punchy, memorable bios that match TikTok\'s fast-paced, creative energy.',
  },
  linkedin: {
    charLimit: '300 characters for the headline area. Professional tone is key.',
    bestPractices: [
      'Lead with your professional title or value proposition',
      'Include industry-specific keywords for search',
      'Mention key achievements or credentials',
      'Add a professional CTA (e.g., "Open to connect")',
      'Keep the tone credible and results-oriented',
    ],
    description: 'Build a LinkedIn bio that establishes authority and attracts connections. Our AI generates professional bios with the right keywords for LinkedIn search visibility.',
  },
  youtube: {
    charLimit: '1,000 characters available. Use the space to tell your story.',
    bestPractices: [
      'Start with a compelling hook in the first line',
      'Describe your content schedule (e.g., "New videos every Tuesday")',
      'Include relevant keywords for YouTube search',
      'Add social media links and contact info',
      'Tell viewers what they\'ll gain by subscribing',
    ],
    description: 'Write a YouTube channel description that converts visitors into subscribers. Our AI creates engaging bios optimized for YouTube search and channel discovery.',
  },
  x: {
    charLimit: '160 characters max. Make every word count.',
    bestPractices: [
      'Be direct and personality-driven',
      'Include your area of expertise',
      'Use humor or wit if it fits your brand',
      'Add relevant keywords or hashtags',
      'Include a link to your main project or website',
    ],
    description: 'Craft an X (Twitter) bio that makes people hit follow in 160 characters. Our AI generates witty, sharp bios that stand out in the timeline.',
  },
};

const PLATFORM_FAQS: Record<BioPlatform, { question: string; answer: string }[]> = {
  instagram: [
    { question: 'What is the Instagram bio character limit?', answer: 'Instagram bios have a 150-character limit. Our generator creates bios optimized to fit within this limit while maximizing impact and including key information about you or your brand.' },
    { question: 'How do I add line breaks to my Instagram bio?', answer: 'You can add line breaks by typing your bio in a notes app first, then copying it to Instagram. Our generator creates bios with natural break points that work well with line breaks.' },
    { question: 'Should I use hashtags in my Instagram bio?', answer: 'Using 1-2 branded or niche hashtags in your bio can help with discoverability. However, don\'t overdo it - focus on making your bio readable and compelling first.' },
    { question: 'How often should I update my Instagram bio?', answer: 'Update your bio whenever your brand, offerings, or focus changes. Many creators update monthly to reflect current promotions, seasons, or content themes.' },
    { question: 'Can I use emojis in my Instagram bio?', answer: 'Yes! Emojis help your bio stand out and save character space. Use them strategically to highlight key points. Our emoji bio generator creates perfectly formatted emoji-rich bios.' },
  ],
  tiktok: [
    { question: 'What is the TikTok bio character limit?', answer: 'TikTok bios are limited to 80 characters - one of the shortest limits among social platforms. Our generator creates ultra-concise bios that make every character count.' },
    { question: 'How do I write a TikTok bio that gets followers?', answer: 'Focus on clarity and personality. State what content you create, use 1-2 relevant emojis, and include a simple CTA. Our AI optimizes for TikTok\'s audience and format.' },
    { question: 'Should my TikTok bio match my video content?', answer: 'Absolutely. Your bio should clearly signal what type of content viewers can expect. This helps convert profile visitors into followers who are genuinely interested in your niche.' },
    { question: 'Can I add a link to my TikTok bio?', answer: 'TikTok allows one clickable link in your bio (available for business accounts or accounts with 1,000+ followers). Make sure your bio text complements your link destination.' },
  ],
  linkedin: [
    { question: 'How long can a LinkedIn bio be?', answer: 'The LinkedIn headline is 220 characters, while the About section allows up to 2,600 characters. Our generator focuses on the headline/summary area (300 chars) for maximum professional impact.' },
    { question: 'What makes a good LinkedIn headline?', answer: 'A great LinkedIn headline clearly states your role, value proposition, and key expertise. Include industry keywords for search visibility. Avoid generic titles like "Entrepreneur" without context.' },
    { question: 'Should I use keywords in my LinkedIn bio?', answer: 'Yes! LinkedIn\'s search algorithm uses your headline and summary to match you with opportunities. Include relevant industry terms, skills, and job titles that recruiters search for.' },
    { question: 'How do I make my LinkedIn bio stand out?', answer: 'Lead with your unique value proposition, include specific results or achievements, and end with a clear CTA. Our AI crafts bios that balance professionalism with personality.' },
    { question: 'Can I use emojis in my LinkedIn bio?', answer: 'While LinkedIn is more professional, strategic use of subtle emojis (like bullet points or icons) can improve readability. Our generator offers both clean and emoji-enhanced options.' },
  ],
  youtube: [
    { question: 'How long should a YouTube channel description be?', answer: 'YouTube allows up to 1,000 characters. We recommend using at least 500 characters to include keywords, content schedule, and a compelling reason to subscribe.' },
    { question: 'Does my YouTube bio affect search rankings?', answer: 'Yes! YouTube\'s algorithm uses your channel description for search and recommendations. Include relevant keywords naturally to improve your channel\'s discoverability.' },
    { question: 'What should I include in my YouTube About section?', answer: 'Include: what your channel is about, your upload schedule, what viewers will learn/gain, your background or credentials, and contact information for business inquiries.' },
    { question: 'How do I write a YouTube bio that gets subscribers?', answer: 'Start with a hook that addresses your target viewer, clearly state your content value, include a subscribe CTA, and mention your upload frequency. Our AI optimizes for subscriber conversion.' },
  ],
  x: [
    { question: 'What is the X (Twitter) bio character limit?', answer: 'X bios are limited to 160 characters. Our generator creates punchy, personality-driven bios that maximize this space for impact and discoverability.' },
    { question: 'How do I write a good X bio?', answer: 'Be authentic and specific. State what you tweet about, show personality, and include relevant keywords. The best X bios are memorable and give people a reason to follow.' },
    { question: 'Should I use hashtags in my X bio?', answer: 'Hashtags in your X bio are clickable and can help with discoverability. Use 1-2 relevant ones, but prioritize making your bio readable and engaging over keyword stuffing.' },
    { question: 'How often should I update my X bio?', answer: 'Update your X bio whenever your focus shifts or you have something timely to promote. Many active users update monthly. Our generator makes it easy to create fresh bios anytime.' },
  ],
};

export function generateStaticParams() {
  return PLATFORMS.map(platform => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as BioPlatform)) return {};
  const info = PLATFORM_LABELS[platform as BioPlatform];
  const tips = PLATFORM_TIPS[platform as BioPlatform];
  return buildMetadata({
    keyword: `${info.name} Bio Generator`,
    description: tips.description,
    path: `/bio-generator/${platform}`,
  });
}

export default async function BioPlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: platformStr } = await params;
  const platform = platformStr as BioPlatform;
  if (!PLATFORMS.includes(platform)) notFound();

  const info = PLATFORM_LABELS[platform];
  const tips = PLATFORM_TIPS[platform];
  const faqs = PLATFORM_FAQS[platform];
  const charLimit = PLATFORM_CHAR_LIMITS[platform];

  return (
    <ToolPageLayout
      scripts={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${info.name} Bio Generator`, description: tips.description, path: `/bio-generator/${platform}` })) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Bio Generator', path: '/bio-generator' },
            { name: info.name, path: `/bio-generator/${platform}` },
          ])) }} />
        </>
      }
      heroHint={brandCopy.empty[3]}
      heroContent={
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{info.emoji} Free {info.name} Bio Generator</h1>
          <p className="text-lg text-white/85">{tips.description}</p>
          <HeroCTA toolName={`bio-${platform}`} />
        </div>
      }
    >
        <BioGenerator defaultPlatform={platform} />

        {/* Platform-specific tips */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">How to Write the Perfect {info.name} Bio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Character Limit</h3>
              <p className="text-sm text-gray-600">{tips.charLimit}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Max Characters</h3>
              <p className="text-sm text-gray-600">{info.name} allows up to <strong>{charLimit} characters</strong> in your bio. Our generator ensures every bio fits within this limit.</p>
            </div>
          </div>
          <h3 className="font-medium text-gray-800 mb-3">Best Practices for {info.name} Bios</h3>
          <ul className="space-y-2">
            {tips.bestPractices.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="bio-platform" pagePath={`/bio-generator/${platform}`} />

        {/* Internal links to niches */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">{info.name} Bio Generator by Niche</h2>
          <div className="flex flex-wrap gap-2">
            {NICHES.map(niche => (
              <Link
                key={niche}
                href={`/bio-generator/${platform}/${niche}`}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                {NICHE_LABELS[niche].emoji} {info.name} Bio for {NICHE_LABELS[niche].name}
              </Link>
            ))}
          </div>
        </div>

        {/* Internal links to other platforms */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Bio Generator for Other Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter(p => p !== platform).map(p => (
              <Link
                key={p}
                href={`/bio-generator/${p}`}
                className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm hover:bg-teal-100 transition-colors"
              >
                {PLATFORM_LABELS[p].emoji} {PLATFORM_LABELS[p].name} Bio Generator
              </Link>
            ))}
          </div>
        </div>

        <FAQ items={faqs} />
    </ToolPageLayout>
  );
}
