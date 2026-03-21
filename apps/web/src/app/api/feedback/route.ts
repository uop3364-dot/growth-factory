import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/llm-shared';

// ---------------------------------------------------------------------------
// In-memory feedback store (production-safe: works without DB)
// For full persistence, enable Prisma by setting DATABASE_URL and running migrations.
// ---------------------------------------------------------------------------

interface FeedbackRecord {
  id: string;
  feedbackType: string;
  message: string;
  email?: string;
  pageUrl?: string;
  toolName?: string;
  selectedLanguage?: string;
  selectedPlatform?: string;
  selectedTopic?: string;
  selectedTone?: string;
  userAgent?: string;
  viewport?: string;
  status: string;
  priority: string;
  createdAt: string;
}

// In-memory store — persists for the lifetime of the server process.
// In serverless (Vercel), each cold start resets this, so DB is recommended.
const feedbackStore: FeedbackRecord[] = [];

function generateId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Email notification via Resend
// ---------------------------------------------------------------------------

async function sendFeedbackEmail(record: FeedbackRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.FEEDBACK_NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'CreatorAITools Feedback <feedback@creatoraitools.tools>',
        to: [toEmail],
        subject: `[${record.feedbackType.toUpperCase()}] New feedback from ${record.toolName || 'unknown tool'}`,
        html: `
          <h2>New Feedback</h2>
          <p><strong>Type:</strong> ${record.feedbackType}</p>
          <p><strong>Message:</strong><br/>${record.message.replace(/\n/g, '<br/>')}</p>
          ${record.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ''}
          <hr/>
          <p><strong>Page:</strong> ${record.pageUrl || 'N/A'}</p>
          <p><strong>Tool:</strong> ${record.toolName || 'N/A'}</p>
          <p><strong>Language:</strong> ${record.selectedLanguage || 'N/A'}</p>
          <p><strong>Platform:</strong> ${record.selectedPlatform || 'N/A'}</p>
          <p><strong>Topic:</strong> ${record.selectedTopic || 'N/A'}</p>
          <p><strong>Tone:</strong> ${record.selectedTone || 'N/A'}</p>
          <p><strong>Viewport:</strong> ${record.viewport || 'N/A'}</p>
          <p><strong>Time:</strong> ${record.createdAt}</p>
          <p><small>User Agent: ${record.userAgent || 'N/A'}</small></p>
        `,
      }),
    });
  } catch {
    // Email is best-effort — failure logged but doesn't block the response
    console.error('[feedback] Email notification failed');
  }
}

// ---------------------------------------------------------------------------
// Prisma persistence (optional — used when DATABASE_URL is configured)
// ---------------------------------------------------------------------------

/**
 * Persist feedback to PostgreSQL via Prisma.
 * Requires: DATABASE_URL set + `npx prisma migrate deploy` run.
 * If Prisma is not available or DB is unreachable, falls back gracefully.
 */
async function persistToDB(record: FeedbackRecord): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    // Dynamic import to avoid build-time failures when Prisma client isn't generated
    const prismaModule = await import('@prisma/client').catch(() => null);
    if (!prismaModule) return false;

    const PrismaClient = (prismaModule as any).PrismaClient || (prismaModule as any).default?.PrismaClient;
    if (!PrismaClient) return false;

    const prisma = new PrismaClient();
    try {
      await prisma.feedback.create({
        data: {
          id: record.id,
          feedbackType: record.feedbackType,
          message: record.message,
          email: record.email || null,
          pageUrl: record.pageUrl || null,
          toolName: record.toolName || null,
          selectedLanguage: record.selectedLanguage || null,
          selectedPlatform: record.selectedPlatform || null,
          selectedTopic: record.selectedTopic || null,
          selectedTone: record.selectedTone || null,
          userAgent: record.userAgent || null,
          viewport: record.viewport || null,
        },
      });
      return true;
    } finally {
      await prisma.$disconnect();
    }
  } catch (e) {
    console.error('[feedback] DB persistence failed:', e);
    return false;
  }
}

// ---------------------------------------------------------------------------
// POST /api/feedback
// ---------------------------------------------------------------------------

const VALID_TYPES = ['suggestion', 'bug', 'complaint', 'general'];

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 3 feedback submissions per minute per IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const rl = checkRateLimit(`feedback:${ip}`);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { feedbackType, message, email, metadata } = body;

    // Validate required fields
    if (!feedbackType || !VALID_TYPES.includes(feedbackType)) {
      return NextResponse.json(
        { error: `feedbackType is required and must be one of: ${VALID_TYPES.join(', ')}` },
        { status: 400 },
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'message must be under 5000 characters' }, { status: 400 });
    }

    // Basic anti-spam: reject if message is too short
    if (message.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide more detail in your message' }, { status: 400 });
    }

    const record: FeedbackRecord = {
      id: generateId(),
      feedbackType,
      message: message.trim(),
      email: email || undefined,
      pageUrl: metadata?.pageUrl,
      toolName: metadata?.toolName,
      selectedLanguage: metadata?.selectedLanguage,
      selectedPlatform: metadata?.selectedPlatform,
      selectedTopic: metadata?.selectedTopic,
      selectedTone: metadata?.selectedTone,
      userAgent: metadata?.userAgent,
      viewport: metadata?.viewport,
      status: 'new',
      priority: feedbackType === 'bug' ? 'high' : 'normal',
      createdAt: new Date().toISOString(),
    };

    // Store in memory (always works)
    feedbackStore.push(record);

    // Persist to DB and send email in parallel (both best-effort)
    await Promise.allSettled([
      persistToDB(record),
      sendFeedbackEmail(record),
    ]);

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
