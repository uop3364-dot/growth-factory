import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '..', '..', 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

interface Subscriber {
  email: string;
  source: string;
  leadMagnet?: string;
  subscribedAt: string;
  ip?: string;
}

const LEAD_MAGNET_DOWNLOADS: Record<string, string> = {
  'caption-generator': '/downloads/100-viral-caption-templates.pdf',
  'hashtag-generator': '/downloads/2026-hashtag-strategy-guide.pdf',
  'bio-generator': '/downloads/50-high-converting-bio-examples.pdf',
  'title-generator': '/downloads/youtube-title-formula-cheatsheet.pdf',
};

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source, leadMagnet } = body as {
      email?: string;
      source?: string;
      leadMagnet?: string;
    };

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const subscribers = await readSubscribers();
    const existing = subscribers.find((s) => s.email === normalizedEmail);

    if (existing) {
      // Already subscribed — still return success + download link
      const downloadUrl = leadMagnet ? LEAD_MAGNET_DOWNLOADS[leadMagnet] : undefined;
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed!',
        downloadUrl,
      });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const subscriber: Subscriber = {
      email: normalizedEmail,
      source: source || 'unknown',
      leadMagnet: leadMagnet || undefined,
      subscribedAt: new Date().toISOString(),
      ip,
    };

    subscribers.push(subscriber);
    await writeSubscribers(subscribers);

    const downloadUrl = leadMagnet ? LEAD_MAGNET_DOWNLOADS[leadMagnet] : undefined;

    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!',
      downloadUrl,
    });
  } catch (e) {
    console.error('Subscribe error:', e);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
