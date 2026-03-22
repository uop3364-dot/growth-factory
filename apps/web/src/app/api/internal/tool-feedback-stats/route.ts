import { NextResponse } from 'next/server';
import { toolFeedbackStore } from '@/app/api/tool-feedback/store';

// ---------------------------------------------------------------------------
// GET /api/internal/tool-feedback-stats
// Minimal internal endpoint — reads from in-memory store (or DB when available).
// ---------------------------------------------------------------------------

async function getStatsFromDB(): Promise<any | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const prismaModule = await import('@prisma/client').catch(() => null);
    if (!prismaModule) return null;

    const PrismaClient =
      (prismaModule as any).PrismaClient ||
      (prismaModule as any).default?.PrismaClient;
    if (!PrismaClient) return null;

    const prisma = new PrismaClient();
    try {
      const [
        totalYes,
        totalNo,
        totalWithMessage,
        totalCtaClicked,
        ctaByTarget,
        byTool,
      ] = await Promise.all([
        prisma.toolFeedback.count({ where: { sentiment: 'yes' } }),
        prisma.toolFeedback.count({ where: { sentiment: 'no' } }),
        prisma.toolFeedback.count({ where: { message: { not: null } } }),
        prisma.toolFeedback.count({ where: { ctaClicked: true } }),
        prisma.toolFeedback.groupBy({
          by: ['ctaTarget'],
          where: { ctaClicked: true },
          _count: true,
        }),
        prisma.toolFeedback.groupBy({
          by: ['toolSlug', 'sentiment'],
          _count: true,
        }),
      ]);

      return {
        source: 'db',
        totalYes,
        totalNo,
        totalWithMessage,
        totalCtaClicked,
        ctaByTarget: ctaByTarget.reduce(
          (acc: Record<string, number>, row: any) => {
            if (row.ctaTarget) acc[row.ctaTarget] = row._count;
            return acc;
          },
          {},
        ),
        byTool: byTool.reduce(
          (acc: Record<string, { yes: number; no: number }>, row: any) => {
            if (!acc[row.toolSlug]) acc[row.toolSlug] = { yes: 0, no: 0 };
            acc[row.toolSlug][row.sentiment as 'yes' | 'no'] = row._count;
            return acc;
          },
          {},
        ),
      };
    } finally {
      await prisma.$disconnect();
    }
  } catch {
    return null;
  }
}

function getStatsFromMemory() {
  const store = toolFeedbackStore;
  const totalYes = store.filter((r) => r.sentiment === 'yes').length;
  const totalNo = store.filter((r) => r.sentiment === 'no').length;
  const totalWithMessage = store.filter((r) => r.message).length;
  const totalCtaClicked = store.filter((r) => r.ctaClicked).length;

  const ctaByTarget: Record<string, number> = {};
  for (const r of store) {
    if (r.ctaClicked && r.ctaTarget) {
      ctaByTarget[r.ctaTarget] = (ctaByTarget[r.ctaTarget] || 0) + 1;
    }
  }

  const byTool: Record<string, { yes: number; no: number }> = {};
  for (const r of store) {
    if (!byTool[r.toolSlug]) byTool[r.toolSlug] = { yes: 0, no: 0 };
    byTool[r.toolSlug][r.sentiment]++;
  }

  return {
    source: 'memory',
    totalYes,
    totalNo,
    totalWithMessage,
    totalCtaClicked,
    ctaByTarget,
    byTool,
  };
}

export async function GET() {
  const dbStats = await getStatsFromDB();
  const stats = dbStats || getStatsFromMemory();
  return NextResponse.json(stats);
}
