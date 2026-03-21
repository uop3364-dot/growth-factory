import { NextRequest, NextResponse } from 'next/server';
import { generateBiosWithProvider } from '@/lib/bio-generator';
import {
  checkRateLimit,
  checkBudget,
  getCachedResponse,
  setCachedResponse,
  buildCacheKey,
  recordUsage,
  llmUnavailableError,
} from '@/lib/llm-shared';
import type { BioResult } from '@/lib/bio-generator';

export const maxDuration = 60;

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, niche, style, keywords, language } = body;

    if (!platform || !niche || !style) {
      return NextResponse.json({ error: 'platform, niche, and style are required' }, { status: 400 });
    }

    const ip = getClientIP(req);
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please wait ${Math.ceil(rl.retryAfterMs / 1000)} seconds.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } },
      );
    }

    const cacheKey = buildCacheKey('bios', { platform, niche, style, language, keywords });
    const cached = getCachedResponse<BioResult>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const budget = checkBudget();
    if (!budget.allowed) {
      return NextResponse.json({ error: budget.reason }, { status: 503 });
    }

    const result = await generateBiosWithProvider({ platform, niche, style, keywords, language });
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
