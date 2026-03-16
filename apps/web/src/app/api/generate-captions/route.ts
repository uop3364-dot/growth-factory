import { NextRequest, NextResponse } from 'next/server';
import { generateCaptionsWithProvider } from '@/lib/caption-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, topic, tone, audience, language, keywords } = body;

    if (!platform || !topic || !tone) {
      return NextResponse.json({ error: 'platform, topic, and tone are required' }, { status: 400 });
    }

    const result = await generateCaptionsWithProvider({ platform, topic, tone, audience, language, keywords });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
