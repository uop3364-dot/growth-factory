import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CaptionGenerator from '@/components/CaptionGenerator';
import { RelatedPlatforms, RelatedTopics, RelatedTones } from '@/components/InternalLinks';
import FAQ from '@/components/FAQ';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { PLATFORMS, TOPICS, TONES, PLATFORM_INFO, TOPIC_INFO, TONE_INFO, type Platform, type Topic, type Tone } from '@/lib/seo-data';
import { buildCaptionPageMeta } from '@/lib/metadata';
import { generateCaptions } from '@/lib/caption-generator';
import { buildFaqSchema, buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import { TONE_CONTENT, getToneFaqs, getTopicFaqs, getDefaultToneContent } from '@/lib/content-config';

export function generateStaticParams() {
  const params: { platform: string; topic: string; tone: string }[] = [];
  for (const platform of PLATFORMS) {
    for (const topic of TOPICS) {
      for (const tone of TONES) {
        params.push({ platform, topic, tone });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string; topic: string; tone: string }> }): Promise<Metadata> {
  const { platform, topic, tone } = await params;
  if (!PLATFORMS.includes(platform as Platform) || !TOPICS.includes(topic as Topic) || !TONES.includes(tone as Tone)) return {};
  return buildCaptionPageMeta(platform as Platform, topic as Topic, tone as Tone);
}

export default async function TonePage({ params }: { params: Promise<{ platform: string; topic: string; tone: string }> }) {
  const { platform: platformStr, topic: topicStr, tone: toneStr } = await params;
  const platform = platformStr as Platform;
  const topic = topicStr as Topic;
  const tone = toneStr as Tone;
  if (!PLATFORMS.includes(platform) || !TOPICS.includes(topic) || !TONES.includes(tone)) notFound();

  const pInfo = PLATFORM_INFO[platform];
  const tInfo = TOPIC_INFO[topic];
  const tnInfo = TONE_INFO[tone];
  const toneContent = TONE_CONTENT[tone] ?? getDefaultToneContent(tone);
  const toneFaqs = getToneFaqs(tone);
  const topicFaqs = getTopicFaqs(topic, pInfo.name);
  const allFaqs = [...toneFaqs.slice(0, 3), ...topicFaqs.slice(0, 2)];
  const sampleCaptions = generateCaptions({ platform, topic, tone });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${tnInfo.name} ${tInfo.name} ${pInfo.name} Caption Generator`, description: `Generate ${tone} ${topic} captions for ${pInfo.name}`, path: `/caption-generator/${platform}/${topic}/${tone}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(allFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Caption Generator', path: '/caption-generator' },
        { name: pInfo.name, path: `/caption-generator/${platform}` },
        { name: tInfo.name, path: `/caption-generator/${platform}/${topic}` },
        { name: tnInfo.name, path: `/caption-generator/${platform}/${topic}/${tone}` },
      ])) }} />

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{tnInfo.name} {tInfo.name} Captions for {pInfo.name}</h1>
          <p className="text-lg text-blue-100">Generate {tone}, {topic}-focused captions optimized for {pInfo.name}. {tnInfo.description} tone with hashtags.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGenerator defaultPlatform={platform} defaultTopic={topic} defaultTone={tone} />

        {/* Tone guide section */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Writing in a {tnInfo.name} Tone</h2>
          <p className="text-gray-700 mb-4">{toneContent.definition}</p>

          {/* Before/After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2 text-sm uppercase tracking-wide">Before</h3>
              <p className="text-gray-700 italic">&ldquo;{toneContent.beforeAfter.before}&rdquo;</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2 text-sm uppercase tracking-wide">After ({tnInfo.name})</h3>
              <p className="text-gray-700 italic">&ldquo;{toneContent.beforeAfter.after}&rdquo;</p>
            </div>
          </div>

          {/* Best for / Not for */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Best For</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {toneContent.bestFor.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-600">&#10003;</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Consider Other Tones For</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {toneContent.notBestFor.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-amber-500">&#9888;</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Writing tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Writing Tips</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {toneContent.writingTips.map((tip, i) => (
                <li key={i} className="pl-3 border-l-2 border-blue-300">{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pre-generated sample captions for SEO */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{tnInfo.name} {tInfo.name} Caption Examples for {pInfo.name}</h2>
          <div className="space-y-3">
            {sampleCaptions.captions.map((c, i) => (
              <div key={i} className="text-gray-700 pl-4 border-l-2 border-purple-200 py-1">{c}</div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {sampleCaptions.hashtags.map((h, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{h}</span>
            ))}
          </div>
        </div>

        <AdPlaceholder slot="after-samples" />
        <AffiliateCTA />

        {/* Breadcrumb navigation back to parent pages */}
        <div className="my-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/caption-generator" className="hover:text-blue-600">Caption Generator</Link>
          <span>/</span>
          <Link href={`/caption-generator/${platform}`} className="hover:text-blue-600">{pInfo.name}</Link>
          <span>/</span>
          <Link href={`/caption-generator/${platform}/${topic}`} className="hover:text-blue-600">{tInfo.name}</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{tnInfo.name}</span>
        </div>

        <RelatedTones platform={platform} topic={topic} currentTone={tone} />
        <RelatedTopics platform={platform} currentTopic={topic} />
        <RelatedPlatforms currentPlatform={platform} />
        <FAQ items={allFaqs} />
      </section>
    </>
  );
}
