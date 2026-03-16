import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Bio Generator (Coming Soon) | CreatorAITools',
  description: 'AI Bio Generator for Instagram, TikTok, LinkedIn, and more — coming soon to CreatorAITools. Generate your social media bio in seconds.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://creatoraitools.tools/bio-generator' },
};

export default function BioGeneratorPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Bio Generator</h1>
      <p className="text-gray-700 mb-6">
        We&apos;re developing an AI bio generator that crafts professional, on-brand social media bios in seconds. Whether you&apos;re a creator, freelancer, or business — your bio is your first impression.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">What to expect</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Platform-specific bios (Instagram, TikTok, LinkedIn, X, YouTube)</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Multiple styles: professional, creative, witty, minimal</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Character-count optimized for each platform&apos;s limits</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Keyword and niche-specific generation</li>
          <li className="flex gap-2"><span className="text-blue-600">&#10003;</span> Completely free, no sign-up required</li>
        </ul>
      </div>
      <div className="bg-blue-50 rounded-xl p-6">
        <p className="text-gray-800 mb-3">In the meantime, check out our fully live <strong>Caption Generator</strong> — free AI captions for Instagram, TikTok, YouTube, X, and Facebook.</p>
        <Link href="/caption-generator" className="inline-block text-blue-600 font-medium hover:text-blue-800">
          Try Caption Generator now &rarr;
        </Link>
      </div>
    </section>
  );
}
