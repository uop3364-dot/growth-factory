import { Metadata } from 'next';
import CaptionGenerator from '@/components/CaptionGenerator';
import { RelatedPlatforms, CrossToolLinks } from '@/components/InternalLinks';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import HeroCTA from '@/components/HeroCTA';
import HowToUse from '@/components/HowToUse';
import ToolCrossSell from '@/components/ToolCrossSell';
import { buildCaptionPageMeta } from '@/lib/metadata';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema, getCaptionPageFaqs } from '@/lib/jsonld';

export function generateMetadata(): Metadata {
  return buildCaptionPageMeta();
}

export default function CaptionGeneratorPage() {
  const faqs = getCaptionPageFaqs();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'Free AI Caption Generator', description: 'Generate engaging social media captions instantly with AI. Free, no login.', path: '/caption-generator' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Caption Generator', path: '/caption-generator' }])) }} />

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Free AI Caption Generator (Instant, No Login)</h1>
          <p className="text-lg text-blue-100">Generate high-performing captions for Instagram, TikTok, YouTube, X &amp; Facebook. With hashtags and CTAs.</p>
          <HeroCTA toolName="caption-generator" color="blue" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGenerator />
        <AffiliateCTA pageType="tool" />
        <HowToUse tool="caption-generator" />
        <AdPlaceholder slot="after-generator" />
        <RelatedPlatforms />
        <CrossToolLinks currentTool="/caption-generator" />
        <FAQ items={faqs} />
        <ToolCrossSell currentTool="/caption-generator" />
      </section>
    </>
  );
}
