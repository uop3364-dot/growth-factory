import { NextRequest, NextResponse } from 'next/server';
import { appendKeywords, getSeedState } from '@/lib/internal-api';

export async function GET() {
  return NextResponse.json(getSeedState());
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const keywords = Array.isArray(body?.keywords) ? body.keywords : [];

  if (!keywords.length) {
    return NextResponse.json(
      { status: 'error', message: 'keywords must be a non-empty string array' },
      { status: 400 },
    );
  }

  return NextResponse.json(appendKeywords(keywords));
}
