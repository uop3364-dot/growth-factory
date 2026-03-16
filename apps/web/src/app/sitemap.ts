import type { MetadataRoute } from 'next';
import { getAllPagePaths } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/caption-generator`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/title-generator`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${baseUrl}/bio-generator`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = getAllPagePaths().map((item) => {
    const path = [
      '/caption-generator',
      item.platform,
      item.topic,
      item.tone,
    ].filter(Boolean).join('/');

    const priority = item.tone ? 0.65 : item.topic ? 0.75 : 0.85;

    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
