import { Metadata } from 'next';
import BioGenerator from '@/components/BioGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import HeroCTA from '@/components/HeroCTA';
import HowToUse from '@/components/HowToUse';
import ToolCrossSell from '@/components/ToolCrossSell';
import { CrossToolLinks } from '@/components/InternalLinks';
import { ToolPageLayout } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/metadata';
import { getOverride } from '@/lib/seo-overrides';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Free AI Bio Generator for Instagram, TikTok & LinkedIn (Instant)',
    description: 'Generate the perfect social media bio with AI. Free bio generator for Instagram, TikTok, LinkedIn, YouTube, and X. No signup, instant results. Try now.',
    path: '/bio-generator',
  });
}

const faqs = [
  {
    question: 'How does the AI Bio Generator work?',
    answer: 'Select your platform, niche, and preferred style. Our AI generates 8 full bios, 4 short bios, and 4 emoji bios — all optimized for your platform\'s character limit. You can copy any bio with one click.',
  },
  {
    question: 'Is this bio generator really free?',
    answer: 'Yes! Our AI bio generator is completely free to use with no sign-up required. Generate unlimited bios for Instagram, TikTok, LinkedIn, YouTube, and X.',
  },
  {
    question: 'What platforms are supported?',
    answer: 'We support Instagram (150 chars), TikTok (80 chars), LinkedIn (300 chars), YouTube (1000 chars), and X/Twitter (160 chars). Each bio is automatically optimized for your selected platform\'s character limit.',
  },
  {
    question: 'Can I customize the style of my bio?',
    answer: 'Absolutely! Choose from 8 different styles: Professional, Creative, Minimalist, Witty, Bold, Elegant, Casual, and Motivational. Each style produces bios with a distinct voice and personality.',
  },
  {
    question: 'What niches are available?',
    answer: 'We support 15 niches including Content Creator, Entrepreneur, Freelancer, Marketer, Developer, Designer, Photographer, Fitness, Food, Travel, Student, Musician, Artist, Writer, and Coach.',
  },
  {
    question: 'How many bios do I get per generation?',
    answer: 'Each generation produces 8 full bios, 4 short bios (perfect for quick updates), and 4 emoji-enhanced bios — plus a call-to-action suggestion. That\'s 17 options in total.',
  },
];

export default function BioGeneratorPage() {
  const ov = getOverride('/bio-generator');
  return (
    <ToolPageLayout
      scripts={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'Free AI Bio Generator', description: 'Generate the perfect social media bio in seconds with AI. Free, no login.', path: '/bio-generator' })) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Bio Generator', path: '/bio-generator' }])) }} />
        </>
      }
      heroClassName="brand-hero-gradient py-12"
      heroHint={brandCopy.empty[3]}
      heroContent={
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Free AI Bio Generator (Instant, No Login)</h1>
          <p className="text-lg text-white/85">Generate the perfect social media bio for Instagram, TikTok, LinkedIn, YouTube &amp; X. Free and instant.</p>
          <HeroCTA toolName="bio-generator" color="green" headline={ov?.ctaHeadline} subtext={ov?.ctaSubtext} />
        </div>
      }
    >
      <BioGenerator />
      <AffiliateCTA pageType="tool" customHeadline={ov?.affiliateHeadline} customSubtext={ov?.affiliateSubtext} placement="result" toolSlug="bio-generator" />
      <HowToUse tool="bio-generator" />
      <AdPlaceholder slot="after-generator" />
      <CrossToolLinks currentTool="/bio-generator" />
      <FAQ items={faqs} />
      <ToolCrossSell currentTool="/bio-generator" />
    </ToolPageLayout>
  );
}
