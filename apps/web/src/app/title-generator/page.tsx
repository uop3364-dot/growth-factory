import { Metadata } from 'next';
import TitleGenerator from '@/components/TitleGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'AI Title Generator - Create Click-Worthy Headlines Instantly | CreatorAITools',
  description: 'Free AI Title Generator for YouTube videos, blog posts, newsletters, and more. Generate 10+ title ideas with SEO optimization, power words, and character counts. No sign-up required.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://creatoraitools.tools/title-generator' },
  openGraph: {
    title: 'AI Title Generator - Create Click-Worthy Headlines Instantly',
    description: 'Generate engaging titles for YouTube, blogs, newsletters, and social media. Free, instant, no sign-up.',
    url: 'https://creatoraitools.tools/title-generator',
    siteName: 'CreatorAITools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Title Generator - Click-Worthy Headlines in Seconds',
    description: 'Generate 10+ title ideas for any content type. Free AI-powered tool with SEO optimization.',
  },
};

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'AI Title Generator', description: 'Generate click-worthy titles and headlines for YouTube, blogs, newsletters, and more', path: '/title-generator' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Title Generator', path: '/title-generator' }])) }} />

      <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AI Title Generator</h1>
          <p className="text-lg text-orange-100">Generate click-worthy titles for YouTube, blogs, newsletters, and more. Free, instant, no sign-up required.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <TitleGenerator />
        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="tool" />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
