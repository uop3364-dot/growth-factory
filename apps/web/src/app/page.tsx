import Link from 'next/link';
import { PLATFORMS, TOPICS, PLATFORM_INFO, TOPIC_INFO } from '@/lib/seo-data';
import FAQ from '@/components/FAQ';
import { buildFaqSchema, buildToolSchema, buildWebSiteSchema, buildOrganizationSchema } from '@/lib/jsonld';

const homeFaqs = [
  { question: 'What is CreatorAITools?', answer: 'CreatorAITools is a free suite of AI-powered tools for social media creators. Generate captions, titles, bios, and hashtags instantly for Instagram, TikTok, YouTube, X, LinkedIn, and Facebook.' },
  { question: 'Is it really free?', answer: 'Yes! All our tools are completely free with no limits. Generate unlimited content with no sign-up required.' },
  { question: 'Which tools are available?', answer: 'We offer 4 free AI tools: Caption Generator, Title Generator, Bio Generator, and Hashtag Generator. Each is optimized for multiple platforms and niches.' },
  { question: 'Which platforms do you support?', answer: 'We support Instagram, TikTok, YouTube, X (Twitter), LinkedIn, and Facebook. Each tool has platform-optimized output.' },
  { question: 'Do I need an account?', answer: 'No account needed! Just select your options and generate content instantly.' },
  { question: 'Can I use the generated content commercially?', answer: 'Absolutely! All generated content is free to use for personal and commercial purposes.' },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'CreatorAITools - Free AI Caption Generator', description: 'Free AI-powered caption generator for Instagram, TikTok, YouTube, X and Facebook. Generate captions, hashtags and CTAs instantly.', path: '/' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(homeFaqs)) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Free AI Tools for Creators</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Generate captions, titles, bios, and hashtags instantly. 4 free AI tools optimized for every platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/caption-generator" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Caption Generator
            </Link>
            <Link href="/hashtag-generator" className="inline-block bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors">
              Hashtag Generator
            </Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Tools for Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/caption-generator" className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
            <div className="text-4xl mb-4">&#9997;&#65039;</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Caption Generator</h3>
            <p className="text-gray-600">Generate engaging captions for Instagram, TikTok, YouTube, X, and Facebook.</p>
            <span className="inline-block mt-4 text-blue-600 font-medium">Try Free &rarr;</span>
          </Link>
          <Link href="/title-generator" className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500">
            <div className="text-4xl mb-4">&#127991;&#65039;</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600">Title Generator</h3>
            <p className="text-gray-600">Create click-worthy titles for YouTube, blogs, newsletters, and social.</p>
            <span className="inline-block mt-4 text-orange-600 font-medium">Try Free &rarr;</span>
          </Link>
          <Link href="/bio-generator" className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500">
            <div className="text-4xl mb-4">&#128100;</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600">Bio Generator</h3>
            <p className="text-gray-600">Craft professional bios for Instagram, TikTok, LinkedIn, YouTube, and X.</p>
            <span className="inline-block mt-4 text-green-600 font-medium">Try Free &rarr;</span>
          </Link>
          <Link href="/hashtag-generator" className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-500">
            <div className="text-4xl mb-4">&#35;&#65039;&#8419;</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600">Hashtag Generator</h3>
            <p className="text-gray-600">Get trending hashtags optimized for reach, engagement, and growth.</p>
            <span className="inline-block mt-4 text-pink-600 font-medium">Try Free &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Optimized for Every Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PLATFORMS.map(p => (
              <Link key={p} href={`/caption-generator/${p}`} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{PLATFORM_INFO[p].emoji}</div>
                <h3 className="font-semibold">{PLATFORM_INFO[p].name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Caption Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {TOPICS.map(t => (
            <Link key={t} href={`/caption-generator/instagram/${t}`} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md hover:bg-blue-50 transition-all">
              <div className="text-2xl mb-1">{TOPIC_INFO[t].emoji}</div>
              <span className="text-sm font-medium">{TOPIC_INFO[t].name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <FAQ items={homeFaqs} />
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up Your Content?</h2>
          <p className="text-blue-100 mb-8">4 free AI tools to generate captions, titles, bios, and hashtags for any platform.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/caption-generator" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Captions
            </Link>
            <Link href="/title-generator" className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
              Titles
            </Link>
            <Link href="/bio-generator" className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
              Bios
            </Link>
            <Link href="/hashtag-generator" className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded-xl hover:bg-pink-50 transition-colors shadow-lg">
              Hashtags
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
