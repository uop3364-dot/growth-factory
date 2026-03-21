import { NextRequest, NextResponse } from 'next/server';
import { generateCaptionsWithProvider } from '@/lib/caption-generator';
import {
  checkRateLimit,
  checkBudget,
  getCachedResponse,
  setCachedResponse,
  buildCacheKey,
  recordUsage,
  llmUnavailableError,
} from '@/lib/llm-shared';
import type { CaptionResult } from '@/lib/caption-generator';

// Vercel Hobby: default 10s timeout is too short for LLM calls.
// Extend to 60s (max on Hobby plan).
export const maxDuration = 60;

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, topic, tone, audience, language, keywords } = body;

    if (!platform || !topic || !tone) {
      return NextResponse.json({ error: 'platform, topic, and tone are required' }, { status: 400 });
    }

    // --- Rate limit ---
    const ip = getClientIP(req);
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please wait ${Math.ceil(rl.retryAfterMs / 1000)} seconds.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } },
      );
    }

    // --- Cache check ---
    const cacheKey = buildCacheKey('captions', { platform, topic, tone, audience, language, keywords });
    const cached = getCachedResponse<CaptionResult>(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, source: 'cache' });
    }

    // --- Budget check ---
    const budget = checkBudget();
    if (!budget.allowed) {
      return NextResponse.json({ error: budget.reason }, { status: 503 });
    }

    // --- Generate ---
    const result = await generateCaptionsWithProvider({ platform, topic, tone, audience, language, keywords });

    if (!result) {
      return NextResponse.json({ error: llmUnavailableError() }, { status: 503 });
    }

    // Record usage for LLM calls
    if (result.source === 'llm') {
      recordUsage();
    }

    // Cache the result
    setCachedResponse(cacheKey, result);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
