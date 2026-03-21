import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  return NextResponse.json({
    commit: process.env.NEXT_PUBLIC_BUILD_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    buildTime: process.env.BUILD_TIME || 'unknown',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    node: process.version,
    llmProvider: process.env.LLM_PROVIDER || 'not set',
    openaiKeyPresent: !!apiKey,
    openaiKeyPrefix: apiKey ? apiKey.slice(0, 12) + '...' : 'missing',
    openaiModel: process.env.OPENAI_MODEL || 'not set',
    allowFakeFallback: process.env.ALLOW_FAKE_FALLBACK || 'not set',
  });
}
