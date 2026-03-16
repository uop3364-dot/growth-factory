import { Metadata } from 'next';
import CaptionGenerator from '@/components/CaptionGenerator';
import { RelatedPlatforms } from '@/components/InternalLinks';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildCaptionPageMeta } from '@/lib/metadata';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema, getCaptionPageFaqs } from '@/lib/jsonld';

export function generateMetadata(): Metadata {
  return buildCaptionPageMeta();
}

export default function CaptionGeneratorPage() {
  const faqs = getCaptionPageFaqs();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'AI Caption Generator', description: 'Generate engaging social media captions instantly with AI', path: '/caption-generator' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Caption Generator', path: '/caption-generator' }])) }} />

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AI Caption Generator</h1>
          <p className="text-lg text-blue-100">Generate engaging captions for any social media platform. Free, instant, no sign-up required.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGenerator />
        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA />
        <RelatedPlatforms />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
