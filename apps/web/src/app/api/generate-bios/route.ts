import { NextRequest, NextResponse } from 'next/server';
import { generateBiosWithProvider } from '@/lib/bio-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, niche, style, keywords, language } = body;

    if (!platform || !niche || !style) {
      return NextResponse.json({ error: 'platform, niche, and style are required' }, { status: 400 });
    }

    const result = await generateBiosWithProvider({ platform, niche, style, keywords, language });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
