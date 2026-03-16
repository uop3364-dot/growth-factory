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
import { PLATFORM_CONTENT, getPlatformFaqs } from '@/lib/content-config';

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
  const content = PLATFORM_CONTENT[platform];
  const toolFaqs = getCaptionPageFaqs(platform);
  const platformFaqs = getPlatformFaqs(platform);
  const allFaqs = [...platformFaqs, ...toolFaqs.slice(0, 2)];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${info.name} Caption Generator`, description: info.description, path: `/caption-generator/${platform}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(allFaqs)) }} />
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

        {/* Platform-specific guide */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">How to Write Great {info.name} Captions</h2>
          <p className="text-gray-700 mb-4">{content.styleGuide}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Caption Length</h3>
              <p className="text-sm text-gray-600">{content.lengthTip}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Hashtag Strategy</h3>
              <p className="text-sm text-gray-600">{content.hashtagTip}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Call-to-Action Style</h3>
              <p className="text-sm text-gray-600">{content.ctaStyle}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Emoji Usage</h3>
              <p className="text-sm text-gray-600">{content.emojiUsage}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-gray-800 mb-2">{info.name} Is Best For</h3>
            <div className="flex flex-wrap gap-2">
              {content.bestFor.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA />
        <RelatedTopics platform={platform} />
        <RelatedPlatforms currentPlatform={platform} />
        <FAQ items={allFaqs} />
      </section>
    </>
  );
}
