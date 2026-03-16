import { NextRequest, NextResponse } from 'next/server';
import { generateHashtagsWithProvider } from '@/lib/hashtag-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, niche, purpose, keywords, language } = body;

    if (!platform || !niche || !purpose) {
      return NextResponse.json({ error: 'platform, niche, and purpose are required' }, { status: 400 });
    }

    const result = await generateHashtagsWithProvider({ platform, niche, purpose, keywords, language });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
