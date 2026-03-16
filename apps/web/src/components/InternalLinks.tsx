import Link from 'next/link';
import { PLATFORMS, TOPICS, TONES, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from '@/lib/seo-data';

export function RelatedPlatforms({ currentPlatform }: { currentPlatform?: string }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-3">Caption Generators by Platform</h3>
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.filter(p => p !== currentPlatform).map(p => (
          <Link key={p} href={`/caption-generator/${p}`} className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            {PLATFORM_INFO[p].emoji} {PLATFORM_INFO[p].name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RelatedTopics({ platform, currentTopic }: { platform: string; currentTopic?: string }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-3">Popular Topics</h3>
      <div className="flex flex-wrap gap-2">
        {TOPICS.filter(t => t !== currentTopic).map(t => (
          <Link key={t} href={`/caption-generator/${platform}/${t}`} className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            {TOPIC_INFO[t].emoji} {TOPIC_INFO[t].name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RelatedTones({ platform, topic, currentTone }: { platform: string; topic: string; currentTone?: string }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-3">Try Different Tones</h3>
      <div className="flex flex-wrap gap-2">
        {TONES.filter(t => t !== currentTone).map(t => (
          <Link key={t} href={`/caption-generator/${platform}/${topic}/${t}`} className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            {TONE_INFO[t].name}
          </Link>
        ))}
      </div>
    </div>
  );
}
