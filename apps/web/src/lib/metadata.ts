import { Platform, Topic, Tone, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from './seo-data';
import type { Metadata } from 'next';

const SITE_NAME = 'GrowthFactory';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoraitools.tools';

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: (opts.type as "website" | "article") || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  };
}

export function buildCaptionPageMeta(platform?: Platform, topic?: Topic, tone?: Tone) {
  const parts: string[] = [];
  let desc = 'Generate engaging social media captions instantly with AI.';
  let path = '/caption-generator';

  if (platform) {
    const p = PLATFORM_INFO[platform];
    parts.push(p.name);
    path += `/${platform}`;
    desc = `Free AI caption generator for ${p.name}. ${p.description}`;
  }
  if (topic) {
    const t = TOPIC_INFO[topic];
    parts.push(t.name);
    path += `/${topic}`;
    desc = `Generate ${topic} captions for ${parts[0] || 'social media'}. Free AI-powered caption generator with hashtags and CTA suggestions.`;
  }
  if (tone) {
    const t = TONE_INFO[tone];
    parts.push(t.name);
    path += `/${tone}`;
    desc = `${tone.charAt(0).toUpperCase() + tone.slice(1)} ${topic || ''} captions for ${parts[0] || 'social media'}. AI-generated captions with the perfect ${t.description.toLowerCase()} tone.`;
  }

  const titleParts = parts.length > 0 ? parts.join(' ') + ' Caption Generator' : 'AI Caption Generator';
  const title = `Free ${titleParts} - Generate Captions Instantly`;

  return buildMetadata({ title, description: desc, path });
}
