import { Metadata } from 'next';
import HashtagGenerator from '@/components/HashtagGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import HeroCTA from '@/components/HeroCTA';
import HowToUse from '@/components/HowToUse';
import ToolCrossSell from '@/components/ToolCrossSell';
import { CrossToolLinks } from '@/components/InternalLinks';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/metadata';
import { getOverride } from '@/lib/seo-overrides';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Free AI Hashtag Generator for Instagram & TikTok (30+ Tags, Instant)',
    description: 'Generate trending hashtags for Instagram, TikTok, YouTube, and X with AI. Get 30+ niche-specific hashtags in seconds. Free, no signup. Try now.',
    path: '/hashtag-generator',
  });
}

const faqs = [
  {
    question: 'How many hashtags should I use on Instagram?',
    answer: 'Instagram allows up to 30 hashtags per post. Research shows that 20-30 well-chosen hashtags perform best. Use a mix of popular (1M+ posts), medium (100K-1M), and niche (<100K) hashtags. Our generator creates this optimal mix automatically.',
  },
  {
    question: 'What are the best hashtags for TikTok?',
    answer: 'On TikTok, fewer hashtags (3-5) work better than stuffing 30. Focus on a mix of broad discovery hashtags like #fyp and #foryou, plus niche-specific tags related to your content. Our tool generates platform-optimized hashtag sets for TikTok.',
  },
  {
    question: 'Is this hashtag generator free?',
    answer: 'Yes! Our AI hashtag generator is completely free to use. Generate unlimited hashtags for Instagram, TikTok, YouTube, X, and LinkedIn. No sign-up or credit card required.',
  },
  {
    question: 'How do hashtags help grow my followers?',
    answer: 'Hashtags help new audiences discover your content. When someone searches or follows a hashtag, your posts can appear in their feed. Using niche-specific, low-competition hashtags gives you the best chance of being seen by people genuinely interested in your content.',
  },
  {
    question: 'What is the difference between trending and niche hashtags?',
    answer: 'Trending hashtags have high search volume and can give you massive short-term exposure, but competition is fierce. Niche hashtags have lower volume but attract a more targeted, engaged audience. The best strategy combines both for maximum reach and engagement.',
  },
  {
    question: 'How often should I change my hashtags?',
    answer: 'Rotate your hashtag sets every 3-5 posts to avoid being flagged as spam by platform algorithms. Our tool generates multiple ready-to-use hashtag sets so you can easily rotate between them.',
  },
  {
    question: 'Do hashtags work on YouTube?',
    answer: 'Yes, but differently. YouTube shows only the first 3 hashtags from your description above the video title. Use highly relevant hashtags that match your content. For YouTube Shorts, hashtags play a bigger role in discoverability.',
  },
  {
    question: 'Can I use the same hashtags on every platform?',
    answer: 'Each platform has different hashtag culture and best practices. Instagram supports up to 30, TikTok works best with 3-5, YouTube shows only 3, and X recommends 1-2. Our tool generates platform-specific hashtag strategies.',
  },
];

export default function HashtagGeneratorPage() {
  const ov = getOverride('/hashtag-generator');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'Free AI Hashtag Generator', description: 'Generate trending hashtags for Instagram, TikTok, YouTube, X and LinkedIn. Free, instant.', path: '/hashtag-generator' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Hashtag Generator', path: '/hashtag-generator' }])) }} />

      <section className="bg-gradient-to-br from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Free AI Hashtag Generator (30+ Hashtags, Instant)</h1>
          <p className="text-lg text-pink-100">Generate trending, niche-specific hashtags for Instagram, TikTok, YouTube &amp; X. Free, no signup.</p>
          <HeroCTA toolName="hashtag-generator" color="pink" headline={ov?.ctaHeadline} subtext={ov?.ctaSubtext} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <HashtagGenerator />
        <AffiliateCTA pageType="tool" customHeadline={ov?.affiliateHeadline} customSubtext={ov?.affiliateSubtext} customPartnerSlug={ov?.affiliateSlug} />
        <HowToUse tool="hashtag-generator" />
        <AdPlaceholder slot="after-generator" />
        <CrossToolLinks currentTool="/hashtag-generator" />
        <FAQ items={faqs} />
        <ToolCrossSell currentTool="/hashtag-generator" />
      </section>
    </>
  );
}
