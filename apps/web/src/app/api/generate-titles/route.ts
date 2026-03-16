import { NextRequest, NextResponse } from 'next/server';
import { generateTitlesWithProvider } from '@/lib/title-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contentType, niche, style, language, keywords } = body;

    if (!contentType || !niche || !style) {
      return NextResponse.json({ error: 'contentType, niche, and style are required' }, { status: 400 });
    }

    const result = await generateTitlesWithProvider({ contentType, niche, style, language, keywords });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
