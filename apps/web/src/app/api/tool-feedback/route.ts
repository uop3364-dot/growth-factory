import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/llm-shared';
import { toolFeedbackStore, type ToolFeedbackRecord } from './store';

function generateId(): string {
  return `tf_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Prisma persistence (optional)
// ---------------------------------------------------------------------------

async function persistToDB(record: ToolFeedbackRecord): Promise<boolean> {
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
      await prisma.toolFeedback.create({
        data: {
          id: record.id,
          toolSlug: record.toolSlug,
          routePath: record.routePath,
          sentiment: record.sentiment,
          message: record.message,
          ctaShown: record.ctaShown,
          sessionId: record.sessionId,
          userAgent: record.userAgent,
        },
      });
      return true;
    } finally {
      await prisma.$disconnect();
    }
  } catch (e) {
    console.error('[tool-feedback] DB persistence failed:', e);
    return false;
  }
}

// ---------------------------------------------------------------------------
// POST /api/tool-feedback
// ---------------------------------------------------------------------------

const VALID_SENTIMENTS = ['yes', 'no'] as const;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const rl = checkRateLimit(`tool-feedback:${ip}`);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { toolSlug, routePath, sentiment, message, ctaShown, sessionId } = body;

    if (!toolSlug || typeof toolSlug !== 'string') {
      return NextResponse.json({ error: 'toolSlug is required' }, { status: 400 });
    }
    if (!routePath || typeof routePath !== 'string') {
      return NextResponse.json({ error: 'routePath is required' }, { status: 400 });
    }
    if (!VALID_SENTIMENTS.includes(sentiment)) {
      return NextResponse.json(
        { error: 'sentiment must be "yes" or "no"' },
        { status: 400 },
      );
    }
    if (message && typeof message === 'string' && message.length > 5000) {
      return NextResponse.json({ error: 'message must be under 5000 characters' }, { status: 400 });
    }

    const record: ToolFeedbackRecord = {
      id: generateId(),
      toolSlug,
      routePath,
      sentiment,
      message: message?.trim() || null,
      ctaShown: !!ctaShown,
      ctaClicked: false,
      ctaTarget: null,
      sessionId: sessionId || null,
      userAgent: req.headers.get('user-agent') || null,
      createdAt: new Date().toISOString(),
    };

    toolFeedbackStore.push(record);
    await persistToDB(record).catch(() => {});

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
