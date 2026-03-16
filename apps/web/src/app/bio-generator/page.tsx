import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Bio Generator (Coming Soon) | CreatorAITools',
  description: 'AI Bio Generator is coming soon. Use Caption Generator now and prepare for multi-tool rollout.',
  alternates: { canonical: '/bio-generator' },
};

export default function BioGeneratorPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Bio Generator</h1>
      <p className="text-gray-700 mb-6">
        This tool skeleton is intentionally preserved for the next release.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-gray-800">Current MVP focus is production-ready caption generation and programmatic SEO pages.</p>
        <Link href="/caption-generator" className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800">
          Go to Caption Generator
        </Link>
      </div>
    </section>
  );
}
