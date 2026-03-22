import { NextRequest, NextResponse } from 'next/server';
import { toolFeedbackStore } from '../store';

// ---------------------------------------------------------------------------
// Prisma update (optional)
// ---------------------------------------------------------------------------

async function updateCtaInDB(feedbackId: string, target: string): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    const prismaModule = await import('@prisma/client').catch(() => null);
    if (!prismaModule) return false;

    const PrismaClient =
      (prismaModule as any).PrismaClient ||
      (prismaModule as any).default?.PrismaClient;
    if (!PrismaClient) return false;

    const prisma = new PrismaClient();
    try {
      await prisma.toolFeedback.update({
        where: { id: feedbackId },
        data: { ctaClicked: true, ctaTarget: target },
      });
      return true;
    } finally {
      await prisma.$disconnect();
    }
  } catch (e) {
    console.error('[tool-feedback] CTA click DB update failed:', e);
    return false;
  }
}

// ---------------------------------------------------------------------------
// POST /api/tool-feedback/cta-click
// ---------------------------------------------------------------------------

const VALID_TARGETS = ['vidiq', 'title_pack', 'metricool'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { feedbackId, target } = body;

    if (!feedbackId || typeof feedbackId !== 'string') {
      return NextResponse.json({ error: 'feedbackId is required' }, { status: 400 });
    }
    if (!target || !VALID_TARGETS.includes(target)) {
      return NextResponse.json(
        { error: `target must be one of: ${VALID_TARGETS.join(', ')}` },
        { status: 400 },
      );
    }

    // Update in-memory store
    const record = toolFeedbackStore.find((r) => r.id === feedbackId);
    if (record) {
      record.ctaClicked = true;
      record.ctaTarget = target;
    }

    // Update DB (best-effort)
    await updateCtaInDB(feedbackId, target).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
