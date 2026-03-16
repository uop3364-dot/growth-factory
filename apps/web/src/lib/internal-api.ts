import { PLATFORMS, TOPICS, TONES, getAllPagePaths } from '@/lib/seo-data';

let seededKeywords: string[] = [];

export function getPageBreakdown() {
  const platformPages = PLATFORMS.length;
  const topicPages = PLATFORMS.length * TOPICS.length;
  const tonePages = PLATFORMS.length * TOPICS.length * TONES.length;

  return {
    platformPages,
    topicPages,
    tonePages,
    totalPages: platformPages + topicPages + tonePages,
  };
}

export function getSeedState() {
  const breakdown = getPageBreakdown();
  return {
    status: 'ok',
    keywords: seededKeywords,
    counts: {
      keywordCount: seededKeywords.length,
      ...breakdown,
    },
  };
}

export function appendKeywords(keywords: string[]) {
  const next = keywords
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  seededKeywords = Array.from(new Set([...seededKeywords, ...next]));

  return {
    status: 'accepted',
    added: next.length,
    totalKeywords: seededKeywords.length,
  };
}

export function buildGenerationReport() {
  const breakdown = getPageBreakdown();
  return {
    status: 'ok',
    runId: `run-${Date.now()}`,
    totalPages: breakdown.totalPages,
    generatedPages: breakdown.totalPages,
    pathsPreview: getAllPagePaths().slice(0, 10),
  };
}

export function buildSummaryReport() {
  const breakdown = getPageBreakdown();
  return {
    service: 'growth-factory-web',
    status: 'ok',
    totalPages: breakdown.totalPages,
    pageBreakdown: breakdown,
    seededKeywordCount: seededKeywords.length,
    monetization: {
      ads: 'placeholder-enabled',
      affiliate: 'placeholder-enabled',
    },
    indexing: {
      sitemap: '/sitemap.xml',
      robots: '/robots.txt',
      lastRebuildAt: new Date().toISOString(),
    },
  };
}
