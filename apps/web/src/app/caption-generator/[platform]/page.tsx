import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaptionGenerator from '@/components/CaptionGenerator';
import { RelatedPlatforms, RelatedTopics } from '@/components/InternalLinks';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { PLATFORMS, PLATFORM_INFO, type Platform } from '@/lib/seo-data';
import { buildCaptionPageMeta } from '@/lib/metadata';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema, getCaptionPageFaqs } from '@/lib/jsonld';

export function generateStaticParams() {
  return PLATFORMS.map(platform => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) return {};
  return buildCaptionPageMeta(platform as Platform);
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: platformStr } = await params;
  const platform = platformStr as Platform;
  if (!PLATFORMS.includes(platform)) notFound();
  const info = PLATFORM_INFO[platform];
  const faqs = getCaptionPageFaqs(platform);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${info.name} Caption Generator`, description: info.description, path: `/caption-generator/${platform}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Caption Generator', path: '/caption-generator' },
        { name: info.name, path: `/caption-generator/${platform}` },
      ])) }} />

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{info.emoji} {info.name} Caption Generator</h1>
          <p className="text-lg text-blue-100">{info.description}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGenerator defaultPlatform={platform} />
        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA />
        <RelatedTopics platform={platform} />
        <RelatedPlatforms currentPlatform={platform} />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
