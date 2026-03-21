import { Metadata } from 'next';
import TitleGenerator from '@/components/TitleGenerator';
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
    title: 'Free AI YouTube Title Generator — Click-Worthy Titles, Instant',
    description: 'Generate click-worthy titles for YouTube videos, blog posts, and newsletters with AI. SEO-optimized with power words. Free, instant, no login. Try now.',
    path: '/title-generator',
  });
}

const faqs = [
  {
    question: 'How does the AI Title Generator work?',
    answer: 'Our title generator combines proven headline formulas with AI to create click-worthy titles for any content type. Select your content type (YouTube, blog, newsletter, etc.), choose a niche and style, and get 10+ unique title suggestions instantly. Each title includes character counts to ensure platform compatibility.',
  },
  {
    question: 'Is the Title Generator free to use?',
    answer: 'Yes! Our AI Title Generator is completely free with no sign-up required. Generate unlimited titles for YouTube videos, blog posts, newsletters, email subjects, and more. No credit card, no account needed.',
  },
  {
    question: 'What content types can I generate titles for?',
    answer: 'We support 8 content types: YouTube videos, blog posts, newsletters, social media posts, podcast episodes, product pages, landing pages, and email subject lines. Each type has optimized character count guidance for best performance.',
  },
  {
    question: 'What title styles are available?',
    answer: 'Choose from 8 proven title styles: Clickbait (curiosity-driven), SEO-Friendly (search-optimized), Professional (authoritative), Viral (shareable), Storytelling (narrative), Listicle (numbered), How-To (tutorial), and Question (engaging questions). Each style uses different headline frameworks.',
  },
  {
    question: 'How do I write a good YouTube title?',
    answer: 'Great YouTube titles are under 100 characters, include power words that trigger curiosity, and clearly communicate the video value. Use our generator with the "YouTube Video" content type and experiment with Clickbait or Viral styles for maximum CTR. Include your main keyword near the beginning for SEO.',
  },
  {
    question: 'Can I add my own keywords to the generated titles?',
    answer: 'Absolutely! Enter comma-separated keywords in the keywords field and they will be incorporated into your generated titles. This is especially useful for SEO-focused content where you need specific terms in your headlines.',
  },
];

export default function TitleGeneratorPage() {
  const ov = getOverride('/title-generator');
  return (
    <ToolPageLayout
      scripts={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'Free AI YouTube Title Generator', description: 'Generate click-worthy titles and headlines for YouTube, blogs, newsletters, and more. Free, instant.', path: '/title-generator' })) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Title Generator', path: '/title-generator' }])) }} />
        </>
      }
      heroClassName="brand-hero-gradient py-12"
      heroHint={brandCopy.hero[2]}
      heroContent={
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Free AI YouTube Title Generator</h1>
          <p className="text-lg text-white/85 mb-2">Generate clickable YouTube titles in seconds — with power words, SEO optimization, and proven CTR formulas.</p>
          <p className="text-sm text-white/65">Used by creators to get more clicks, more views, and better rankings.</p>
          <HeroCTA toolName="title-generator" color="orange" headline={ov?.ctaHeadline} subtext={ov?.ctaSubtext} />
        </div>
      }
    >
      <TitleGenerator />

      {/* CTA #1: Post-result — highest intent moment */}
      <AffiliateCTA
        pageType="tool"
        platform="youtube"
        placement="result"
        toolSlug="title-generator"
        customHeadline="Your titles are ready. Now make them easier to rank."
        customSubtext="A great title gets the click — but you still need the right keywords to show up in search. vidIQ helps you find what people are actually searching for, so your titles reach the right audience. Metricool tracks how your content performs across platforms."
      />

      <HowToUse tool="title-generator" />
      <AdPlaceholder slot="after-generator" />

      {/* CTA #2: Mid-page education — bridge from titles to growth stack */}
      <div className="my-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">A good title is just the first step.</h2>
        <p className="text-gray-600 mb-2">
          Titles get people to click. But to grow a channel, you also need the right keywords, consistent posting, and a way to see what&apos;s working.
        </p>
        <p className="text-gray-600 mb-4">
          Tools like vidIQ and Metricool fill in the gaps — keyword research, SEO scoring, scheduling, and analytics — so you&apos;re not guessing every time you publish.
        </p>
        <AffiliateCTA
          pageType="tool"
          platform="youtube"
          placement="middle"
          toolSlug="title-generator"
          customHeadline="Want better titles every time?"
          customSubtext="Great titles help. Better keyword research and channel SEO help more. vidIQ gives you the data behind what works — so every title you write has a better shot."
        />
      </div>

      <CrossToolLinks currentTool="/title-generator" />

      {/* CTA #3: Pre-FAQ — closing / upgrade nudge */}
      <div className="my-8">
        <AffiliateCTA
          pageType="tool"
          platform="youtube"
          placement="pre_faq"
          toolSlug="title-generator"
          customHeadline="Free tool first. Growth stack next."
          customSubtext="Use this generator for title ideas anytime — it's free, no limits. When you're ready to level up, vidIQ and Metricool give you the keyword data, scheduling, and analytics to turn good titles into real growth."
        />
      </div>

      <FAQ items={faqs} />
      <ToolCrossSell currentTool="/title-generator" />
    </ToolPageLayout>
  );
}
