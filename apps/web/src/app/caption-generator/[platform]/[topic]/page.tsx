import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaptionGenerator from '@/components/CaptionGenerator';
import { RelatedPlatforms, RelatedTopics, RelatedTones } from '@/components/InternalLinks';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { PLATFORMS, TOPICS, PLATFORM_INFO, TOPIC_INFO, type Platform, type Topic } from '@/lib/seo-data';
import { buildCaptionPageMeta } from '@/lib/metadata';
import { generateCaptions } from '@/lib/caption-generator';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema, getCaptionPageFaqs } from '@/lib/jsonld';

export function generateStaticParams() {
  const params: { platform: string; topic: string }[] = [];
  for (const platform of PLATFORMS) {
    for (const topic of TOPICS) {
      params.push({ platform, topic });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string; topic: string }> }): Promise<Metadata> {
  const { platform, topic } = await params;
  if (!PLATFORMS.includes(platform as Platform) || !TOPICS.includes(topic as Topic)) return {};
  return buildCaptionPageMeta(platform as Platform, topic as Topic);
}

export default async function TopicPage({ params }: { params: Promise<{ platform: string; topic: string }> }) {
  const { platform: platformStr, topic: topicStr } = await params;
  const platform = platformStr as Platform;
  const topic = topicStr as Topic;
  if (!PLATFORMS.includes(platform) || !TOPICS.includes(topic)) notFound();

  const pInfo = PLATFORM_INFO[platform];
  const tInfo = TOPIC_INFO[topic];
  const faqs = getCaptionPageFaqs(platform, topic);
  const sampleCaptions = generateCaptions({ platform, topic, tone: 'friendly' });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${pInfo.name} ${tInfo.name} Caption Generator`, description: `Generate ${topic} captions for ${pInfo.name}`, path: `/caption-generator/${platform}/${topic}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Caption Generator', path: '/caption-generator' },
        { name: pInfo.name, path: `/caption-generator/${platform}` },
        { name: tInfo.name, path: `/caption-generator/${platform}/${topic}` },
      ])) }} />

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{pInfo.emoji} {pInfo.name} {tInfo.name} Caption Generator</h1>
          <p className="text-lg text-blue-100">Generate {topic} captions optimized for {pInfo.name}. Free, instant, with hashtag suggestions.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGenerator defaultPlatform={platform} defaultTopic={topic} />

        {/* Sample captions for SEO */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sample {tInfo.name} Captions for {pInfo.name}</h2>
          <ul className="space-y-2">
            {sampleCaptions.captions.slice(0, 5).map((c, i) => (
              <li key={i} className="text-gray-700 pl-4 border-l-2 border-blue-200">{c}</li>
            ))}
          </ul>
        </div>

        <AdPlaceholder slot="after-samples" />
        <AffiliateCTA />
        <RelatedTones platform={platform} topic={topic} />
        <RelatedTopics platform={platform} currentTopic={topic} />
        <RelatedPlatforms currentPlatform={platform} />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
