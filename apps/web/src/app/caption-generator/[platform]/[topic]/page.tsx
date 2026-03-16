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
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { TOPIC_CONTENT, getTopicFaqs } from '@/lib/content-config';

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
  const topicContent = TOPIC_CONTENT[topic];
  const faqs = getTopicFaqs(topic, pInfo.name);
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

        {/* Topic-specific writing guide */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Writing {tInfo.name} Captions for {pInfo.name}</h2>
          <p className="text-gray-700 mb-4">{topicContent.captionAngle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Caption Hooks That Work</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {topicContent.exampleHooks.map((hook, i) => (
                  <li key={i} className="pl-3 border-l-2 border-blue-200">&ldquo;{hook}&rdquo;</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Effective CTAs</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {topicContent.ctaTypes.map((cta, i) => (
                  <li key={i} className="pl-3 border-l-2 border-purple-200">{cta}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Pro Tip</h3>
            <p className="text-sm text-gray-700">{topicContent.contentTips}</p>
          </div>
        </div>

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
        <AffiliateCTA pageType="topic" />
        <RelatedTones platform={platform} topic={topic} />
        <RelatedTopics platform={platform} currentTopic={topic} />
        <RelatedPlatforms currentPlatform={platform} />
        <FAQ items={faqs} />
      </section>
    </>
  );
}
