import { Platform, Topic, Tone, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from './seo-data';
import { getOverrideDesc, getOverrideTitle } from './seo-overrides';
import { generateSeoTitle } from './seo/title';
import { generateOptimizedTitle, type PageType as SeoPageType } from './seo/title_engine';
import type { Metadata } from 'next';

const SITE_NAME = 'CreatorAITools';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoraitools.tools';
const OG_IMAGE = `${SITE_URL}/og-default.png`;

export function buildMetadata(opts: {
  keyword?: string;
  title?: string;
  description: string;
  path: string;
  type?: string;
}): Metadata {
  const overrideDesc = getOverrideDesc(opts.path);
  const overrideTitle = getOverrideTitle(opts.path);
  const title = overrideTitle ?? opts.title ?? generateSeoTitle(opts.keyword);
  const description = overrideDesc ?? opts.description;

  const url = `${SITE_URL}${opts.path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: (opts.type as "website" | "article") || 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export function buildCaptionPageMeta(platform?: Platform, topic?: Topic, tone?: Tone) {
  let keyword: string;
  let desc: string;
  let path = '/caption-generator';

  if (!platform) {
    keyword = 'Caption Generator';
    desc = 'Generate high-performing social media captions with AI. Free, fast, and optimized for engagement. Get captions, hashtags, and CTAs in seconds. Try now.';
    return buildMetadata({ keyword, description: desc, path });
  }

  const p = PLATFORM_INFO[platform];
  path += `/${platform}`;

  if (!topic) {
    keyword = `${p.name} Caption Generator`;
    desc = `Generate high-performing ${p.name} captions with AI. Free, fast, and optimized for ${p.name} engagement. Get captions, hashtags, and CTAs instantly. Try now.`;
    return buildMetadata({ keyword, description: desc, path });
  }

  const t = TOPIC_INFO[topic];
  path += `/${topic}`;

  if (!tone) {
    keyword = `${p.name} ${t.name} Caption Generator`;
    desc = `Generate ${topic} captions for ${p.name} with AI. Free ${t.name.toLowerCase()} caption ideas with hashtags and CTAs. Instant results, no signup. Try now.`;
    return buildMetadata({ keyword, description: desc, path });
  }

  const tn = TONE_INFO[tone];
  path += `/${tone}`;

  keyword = `${tn.name} ${t.name} Captions for ${p.name}`;
  desc = `Generate ${tone} ${topic} captions for ${p.name}. AI-powered ${tn.description.toLowerCase()} captions with hashtags. Free, instant, no login. Try now.`;
  return buildMetadata({ keyword, description: desc, path });
}
