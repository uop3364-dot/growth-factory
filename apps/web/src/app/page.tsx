import Link from 'next/link';
import { PLATFORMS, TOPICS, PLATFORM_INFO, TOPIC_INFO } from '@/lib/seo-data';
import FAQ from '@/components/FAQ';
import { buildFaqSchema, buildToolSchema, buildWebSiteSchema, buildOrganizationSchema } from '@/lib/jsonld';

const homeFaqs = [
  { question: 'What is CreatorAITools?', answer: 'CreatorAITools is a free suite of AI-powered tools for social media creators. Generate captions, titles, and bios instantly for Instagram, TikTok, YouTube, X, and Facebook.' },
  { question: 'Is it really free?', answer: 'Yes! All our tools are completely free with no limits. Generate unlimited captions with no sign-up required.' },
  { question: 'Which platforms do you support?', answer: 'We support Instagram, TikTok, YouTube, X (Twitter), and Facebook. Each platform has optimized caption formats with relevant hashtags.' },
  { question: 'Do I need an account?', answer: 'No account needed! Just select your platform, topic, and tone, then generate captions instantly.' },
  { question: 'Can I use the captions commercially?', answer: 'Absolutely! All generated captions are free to use for personal and commercial purposes.' },
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Free AI Caption Generator</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Generate engaging social media captions, titles, and bios instantly. Powered by AI, optimized for every platform.
          </p>
          <Link href="/caption-generator" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Start Generating Captions
          </Link>
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Tools for Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/caption-generator" className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
            <div className="text-4xl mb-4">&#9997;&#65039;</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Caption Generator</h3>
            <p className="text-gray-600">Generate engaging captions for Instagram, TikTok, YouTube, X, and Facebook. 10+ captions per generation.</p>
            <span className="inline-block mt-4 text-blue-600 font-medium">Try Free</span>
          </Link>
          <div className="bg-white rounded-xl shadow-md p-8 opacity-60">
            <div className="text-4xl mb-4">&#127991;&#65039;</div>
            <h3 className="text-xl font-semibold mb-2">Title Generator</h3>
            <p className="text-gray-600">Create click-worthy titles for blog posts, videos, and social content.</p>
            <span className="inline-block mt-4 text-gray-400 font-medium">Coming Soon</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 opacity-60">
            <div className="text-4xl mb-4">&#128100;</div>
            <h3 className="text-xl font-semibold mb-2">Bio Generator</h3>
            <p className="text-gray-600">Craft professional bios for any social media platform in seconds.</p>
            <span className="inline-block mt-4 text-gray-400 font-medium">Coming Soon</span>
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Captions?</h2>
          <p className="text-blue-100 mb-8">Join thousands of creators using CreatorAITools to level up their social media game.</p>
          <Link href="/caption-generator" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Generate Free Captions
          </Link>
        </div>
      </section>
    </>
  );
}
