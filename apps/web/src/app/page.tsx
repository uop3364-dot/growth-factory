import Link from 'next/link';
import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import HomeAffiliate from '@/components/HomeAffiliate';
import ToolCrossSell from '@/components/ToolCrossSell';
import { buildFaqSchema, buildToolSchema, buildWebSiteSchema, buildOrganizationSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/metadata';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Free AI Tools for Creators — Captions, Bios, Titles & Hashtags',
    description: 'Generate captions, bios, titles, and hashtags with AI. 100% free, no login, instant results. Trusted by 50K+ creators. Try now.',
    path: '/',
  });
}

const homeFaqs = [
  {
    question: 'Are these tools really free?',
    answer: 'Yes — 100% free with no limits. Generate as many captions, bios, titles, and hashtags as you need. No credit card, no trial period, no catch.',
  },
  {
    question: 'Do I need to sign up?',
    answer: 'No. Just pick a tool, enter your topic, and click generate. No account, no email, no signup wall.',
  },
  {
    question: 'Which tool should I start with?',
    answer: 'Start with the Caption Generator — it\'s our most popular tool and works for Instagram, TikTok, YouTube Shorts, X, Facebook, and LinkedIn. You\'ll have scroll-stopping captions in 30 seconds.',
  },
  {
    question: 'What creator tools do you recommend?',
    answer: 'For growing faster on YouTube, we recommend pairing our free generators with TubeBuddy (keyword research & SEO), vidIQ (topic ideas & growth insights), and Canva (thumbnails & channel art). All three have free plans to get started.',
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: 'CreatorAITools - Free AI Caption Generator', description: 'Free AI-powered caption generator for Instagram, TikTok, YouTube, X and Facebook. Generate captions, hashtags and CTAs instantly.', path: '/' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(homeFaqs)) }} />

      {/* 1. Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Free AI Tools for Creators — Captions, Bios, Titles &amp; Hashtags
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Generate scroll-stopping content in seconds. No signup, no limits, just results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/caption-generator"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
              data-track="homepage_primary_cta_click"
            >
              Generate Captions Now &rarr;
            </Link>
            <Link
              href="#tools"
              className="inline-block bg-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors text-lg"
              data-track="homepage_secondary_cta_click"
            >
              See All Free Tools
            </Link>
          </div>
          <p className="mt-4 text-sm opacity-80">Free &bull; No login &bull; Instant results</p>
        </div>
      </section>

      {/* 2. Featured Tools */}
      <section id="tools" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Free AI Creator Tools — Pick One &amp; Go</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Enter your topic, click generate, get results in seconds. No signup needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/caption-generator"
            className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
            data-track="homepage_tool_card_click"
            data-tool="caption-generator"
          >
            <div className="text-3xl mb-3">&#9997;&#65039;</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">AI Caption Generator</h3>
            <p className="text-gray-600 text-sm mb-3">Scroll-stopping captions for Reels, Shorts, TikTok &amp; social posts.</p>
            <span className="inline-block text-blue-600 font-medium text-sm">Generate Free &rarr;</span>
          </Link>
          <Link
            href="/bio-generator"
            className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
            data-track="homepage_tool_card_click"
            data-tool="bio-generator"
          >
            <div className="text-3xl mb-3">&#128100;</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600">AI Bio Generator</h3>
            <p className="text-gray-600 text-sm mb-3">Professional bios for Instagram, TikTok, LinkedIn &amp; YouTube.</p>
            <span className="inline-block text-green-600 font-medium text-sm">Generate Free &rarr;</span>
          </Link>
          <Link
            href="/title-generator"
            className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500"
            data-track="homepage_tool_card_click"
            data-tool="title-generator"
          >
            <div className="text-3xl mb-3">&#127991;&#65039;</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-600">AI Title Generator</h3>
            <p className="text-gray-600 text-sm mb-3">Click-worthy titles for YouTube videos, blogs &amp; newsletters.</p>
            <span className="inline-block text-orange-600 font-medium text-sm">Generate Free &rarr;</span>
          </Link>
          <Link
            href="/hashtag-generator"
            className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-500"
            data-track="homepage_tool_card_click"
            data-tool="hashtag-generator"
          >
            <div className="text-3xl mb-3">#</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-600">AI Hashtag Generator</h3>
            <p className="text-gray-600 text-sm mb-3">Trending hashtags for Instagram, TikTok &amp; YouTube. Maximum reach.</p>
            <span className="inline-block text-pink-600 font-medium text-sm">Generate Free &rarr;</span>
          </Link>
        </div>
      </section>

      {/* 3. Monetization / Recommended Tools */}
      <HomeAffiliate />

      {/* 4. Quick Outcomes */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">What You Can Create in 30 Seconds</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <span className="text-2xl">&#9889;</span>
            <div>
              <p className="font-medium text-gray-800">Scroll-stopping captions for any platform</p>
              <p className="text-gray-500 text-sm">Optimized for Instagram, TikTok, YouTube, X, and Facebook</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <span className="text-2xl">&#128640;</span>
            <div>
              <p className="font-medium text-gray-800">Professional bios that convert visitors to followers</p>
              <p className="text-gray-500 text-sm">Within platform character limits, with CTAs built in</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <span className="text-2xl">&#127919;</span>
            <div>
              <p className="font-medium text-gray-800">Click-worthy titles that boost CTR and views</p>
              <p className="text-gray-500 text-sm">Tested patterns with power words and SEO optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mx-auto mb-3">1</div>
              <h3 className="font-semibold mb-1">Pick a Tool</h3>
              <p className="text-sm text-gray-600">Choose captions, bios, titles, or hashtags.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mx-auto mb-3">2</div>
              <h3 className="font-semibold mb-1">Enter Your Topic</h3>
              <p className="text-sm text-gray-600">Select platform, niche, and style preferences.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mx-auto mb-3">3</div>
              <h3 className="font-semibold mb-1">Copy &amp; Post</h3>
              <p className="text-sm text-gray-600">Get instant results. Copy with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <FAQ items={homeFaqs} />
      </section>

      {/* 7. Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Creating Better Content — Free</h2>
          <p className="text-blue-100 mb-8">No signup. No limits. Just pick a tool and go.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/caption-generator"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
              data-track="homepage_final_cta_click"
            >
              Generate Captions Now &rarr;
            </Link>
            <Link
              href="/bio-generator"
              className="inline-block bg-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors text-lg"
              data-track="homepage_final_bio_cta"
            >
              Generate Bios &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
