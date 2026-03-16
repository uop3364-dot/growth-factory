import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Title Generator (Coming Soon) | GrowthFactory',
  description: 'AI Title Generator is coming soon. Use Caption Generator now and stay tuned for high-converting title generation.',
  alternates: { canonical: '/title-generator' },
};

export default function TitleGeneratorPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Title Generator</h1>
      <p className="text-gray-700 mb-6">
        This tool skeleton is ready and will be connected in the next phase.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-gray-800">MVP scope keeps this page as a placeholder while Caption Generator is fully active.</p>
        <Link href="/caption-generator" className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800">
          Use Caption Generator now
        </Link>
      </div>
    </section>
  );
}
