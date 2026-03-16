import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Title Generator (Coming Soon) | CreatorAITools',
  description: 'AI Title Generator for blog posts, YouTube videos, and social media — coming soon to CreatorAITools. Try our free Caption Generator in the meantime.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://creatoraitools.tools/title-generator' },
};

export default function TitleGeneratorPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Title Generator</h1>
      <p className="text-gray-700 mb-6">
        We&apos;re building an AI-powered title generator that creates click-worthy headlines for blog posts, YouTube videos, and social media content. It will support multiple tones, A/B testing suggestions, and SEO optimization.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">What to expect</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Generate 10+ title variations per prompt</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Optimized for YouTube, blogs, newsletters, and social</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Multiple tones: clickbait, professional, SEO-friendly, viral</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Character count guidance for each platform</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Completely free, no sign-up required</li>
        </ul>
      </div>
      <div className="bg-blue-50 rounded-xl p-6">
        <p className="text-gray-800 mb-3">While we put the finishing touches on Title Generator, our <strong>Caption Generator</strong> is fully live with 5 platforms, 15 topics, and 9 tones.</p>
        <Link href="/caption-generator" className="inline-block text-blue-600 font-medium hover:text-blue-800">
          Try Caption Generator now &rarr;
        </Link>
      </div>
    </section>
  );
}
