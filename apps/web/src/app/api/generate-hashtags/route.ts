import { NextRequest, NextResponse } from 'next/server';
import { generateHashtagsWithProvider } from '@/lib/hashtag-generator';
import {
  checkRateLimit,
  checkBudget,
  getCachedResponse,
  setCachedResponse,
  buildCacheKey,
  recordUsage,
  llmUnavailableError,
} from '@/lib/llm-shared';

export const maxDuration = 60;

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, niche, purpose, keywords, language } = body;

    if (!platform || !niche || !purpose) {
      return NextResponse.json({ error: 'platform, niche, and purpose are required' }, { status: 400 });
    }

    const ip = getClientIP(req);
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please wait ${Math.ceil(rl.retryAfterMs / 1000)} seconds.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } },
      );
    }

    const cacheKey = buildCacheKey('hashtags', { platform, niche, purpose, language, keywords });
    const cached = getCachedResponse<unknown>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const budget = checkBudget();
    if (!budget.allowed) {
      return NextResponse.json({ error: budget.reason }, { status: 503 });
    }

    const result = await generateHashtagsWithProvider({ platform, niche, purpose, keywords, language });
    if (!result) {
      return NextResponse.json({ error: llmUnavailableError() }, { status: 503 });
    }

    if ((result as any).source === 'llm') recordUsage();
    setCachedResponse(cacheKey, result);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
