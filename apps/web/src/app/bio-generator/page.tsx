import { Metadata } from 'next';
import BioGenerator from '@/components/BioGenerator';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Free AI Bio Generator for Instagram, TikTok, LinkedIn & More | CreatorAITools',
  description: 'Generate the perfect social media bio in seconds. Free AI bio generator for Instagram, TikTok, LinkedIn, YouTube, and X. No sign-up required.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://creatoraitools.tools/bio-generator' },
  openGraph: {
    title: 'Free AI Bio Generator | CreatorAITools',
    description: 'Generate the perfect social media bio in seconds. Optimized for Instagram, TikTok, LinkedIn, YouTube, and X.',
    url: 'https://creatoraitools.tools/bio-generator',
    siteName: 'CreatorAITools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Bio Generator | CreatorAITools',
    description: 'Generate the perfect social media bio in seconds. Optimized for every platform.',
  },
};

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'AI Bio Generator', description: 'Generate the perfect social media bio in seconds with AI', path: '/bio-generator' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Bio Generator', path: '/bio-generator' }])) }} />

      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AI Bio Generator</h1>
          <p className="text-lg text-green-100">Generate the perfect social media bio for any platform. Free, instant, no sign-up required.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <BioGenerator />
        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="tool" />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
