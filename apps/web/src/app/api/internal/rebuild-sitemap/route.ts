import { NextResponse } from 'next/server';
import { getPageBreakdown } from '@/lib/internal-api';

export async function POST() {
  const breakdown = getPageBreakdown();
  return NextResponse.json({
    status: 'ok',
    sitemapUrl: '/sitemap.xml',
    totalEntries: breakdown.totalPages + 4,
    rebuiltAt: new Date().toISOString(),
  });
}
