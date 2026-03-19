import Link from 'next/link';

const TOOLS = [
  { name: 'AI Caption Generator', href: '/caption-generator', desc: 'Scroll-stopping captions for any platform' },
  { name: 'AI Bio Generator', href: '/bio-generator', desc: 'Professional bios that convert visitors' },
  { name: 'AI Title Generator', href: '/title-generator', desc: 'Click-worthy titles for YouTube & blogs' },
  { name: 'AI Hashtag Generator', href: '/hashtag-generator', desc: 'Trending hashtags for maximum reach' },
];

export default function ToolCrossSell({ currentTool }: { currentTool?: string }) {
  const otherTools = TOOLS.filter(t => t.href !== currentTool);
  return (
    <section className="my-10 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-1">Get More Free AI Tools</h3>
      <p className="text-sm text-gray-500 mb-4">Grow faster with our complete creator toolkit.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {otherTools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
          >
            <span className="font-semibold text-sm text-gray-800">{tool.name}</span>
            <span className="block text-xs text-gray-500 mt-1">{tool.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
