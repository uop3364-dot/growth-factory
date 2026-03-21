/**
 * Shared LLM infrastructure: rate limiting, caching, budget tracking, OpenAI caller.
 *
 * In-memory implementations. Suitable for single-server / Vercel serverless with
 * the caveat that serverless cold starts reset state. For high-traffic production,
 * swap to Redis / Upstash via the same interface.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LLMCallResult<T> {
  data: T;
  source: 'llm' | 'cache' | 'fallback';
}

// ---------------------------------------------------------------------------
// Rate Limiter  (per-IP, sliding window)
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_PER_MINUTE || '5', 10);

interface RateBucket {
  count: number;
  resetAt: number;
}

const rateBuckets = new Map<string, RateBucket>();

/** Returns { allowed, retryAfterMs }. Call with the client IP. */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count++;
  return { allowed: true, retryAfterMs: 0 };
}

// Periodic cleanup (every 5 min) to avoid memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of rateBuckets) {
    if (now >= bucket.resetAt) rateBuckets.delete(ip);
  }
}, 300_000).unref?.();

// ---------------------------------------------------------------------------
// Response Cache  (in-memory, TTL-based)
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = parseInt(process.env.CACHE_TTL_MINUTES || '60', 10) * 60_000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const responseCache = new Map<string, CacheEntry<unknown>>();

export function getCachedResponse<T>(key: string): T | null {
  const entry = responseCache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() >= entry.expiresAt) {
    responseCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCachedResponse<T>(key: string, data: T): void {
  responseCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

/** Build a deterministic cache key from request fields. */
export function buildCacheKey(tool: string, fields: Record<string, string | string[] | undefined>): string {
  const parts = [tool];
  for (const [k, v] of Object.entries(fields).sort(([a], [b]) => a.localeCompare(b))) {
    const val = Array.isArray(v) ? v.sort().join(',') : (v || '');
    parts.push(`${k}=${val}`);
  }
  return parts.join('|');
}

// Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of responseCache) {
    if (now >= entry.expiresAt) responseCache.delete(key);
  }
}, 300_000).unref?.();

// ---------------------------------------------------------------------------
// Usage / Budget Tracker
// ---------------------------------------------------------------------------

interface UsageState {
  monthKey: string;   // e.g. "2026-03"
  requestCount: number;
  estimatedCostUsd: number;
}

const usage: UsageState = {
  monthKey: getCurrentMonthKey(),
  requestCount: 0,
  estimatedCostUsd: 0,
};

function getCurrentMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function resetIfNewMonth(): void {
  const current = getCurrentMonthKey();
  if (usage.monthKey !== current) {
    usage.monthKey = current;
    usage.requestCount = 0;
    usage.estimatedCostUsd = 0;
  }
}

const DEFAULT_COST_PER_REQUEST_USD = 0.003; // ~gpt-4o-mini avg

/**
 * Check whether we're still within the monthly budget.
 * Returns { allowed, reason } — if not allowed, reason explains why.
 */
export function checkBudget(): { allowed: boolean; reason?: string } {
  const budgetStr = process.env.MONTHLY_LLM_BUDGET_USD;
  if (!budgetStr) return { allowed: true }; // no cap set

  resetIfNewMonth();

  const budget = parseFloat(budgetStr);
  if (isNaN(budget) || budget <= 0) return { allowed: true };

  if (usage.estimatedCostUsd >= budget) {
    return {
      allowed: false,
      reason: `Monthly LLM budget of $${budget} has been reached (used: $${usage.estimatedCostUsd.toFixed(3)}). Try again next month or contact the site owner.`,
    };
  }

  return { allowed: true };
}

export function recordUsage(costUsd?: number): void {
  resetIfNewMonth();
  usage.requestCount++;
  usage.estimatedCostUsd += costUsd ?? DEFAULT_COST_PER_REQUEST_USD;
}

export function getUsageSnapshot() {
  resetIfNewMonth();
  return { ...usage };
}

// ---------------------------------------------------------------------------
// OpenAI Caller
// ---------------------------------------------------------------------------

export interface OpenAICallOptions {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
}

/**
 * Call OpenAI and return parsed JSON.
 * Returns null if API key missing, call fails, or response is invalid.
 * Throws nothing — all errors are caught and returned as null.
 */
export async function callOpenAI<T>(opts: OpenAICallOptions): Promise<T | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: (process.env.OPENAI_MODEL || 'gpt-4o-mini').trim(),
        temperature: opts.temperature ?? 0.8,
        messages: [
          { role: 'system', content: opts.systemPrompt || 'You output valid JSON only.' },
          { role: 'user', content: opts.userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      console.error(`[llm] OpenAI API error ${response.status}: ${errorBody.slice(0, 200)}`);
      return null;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      console.error('[llm] No content in OpenAI response');
      return null;
    }

    return JSON.parse(text) as T;
  } catch (e) {
    console.error('[llm] OpenAI call exception:', e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Production Safety Check
// ---------------------------------------------------------------------------

/**
 * Returns true if the deterministic (fake) fallback is allowed.
 * Only true in dev when ALLOW_FAKE_FALLBACK=true.
 */
export function isFakeFallbackAllowed(): boolean {
  return process.env.ALLOW_FAKE_FALLBACK === 'true';
}

/**
 * Returns a human-readable error when LLM is unavailable in production.
 */
export function llmUnavailableError(): string {
  if (!process.env.OPENAI_API_KEY) {
    return 'AI generation is currently unavailable. The service is being configured. Please try again later.';
  }
  return 'AI generation failed. Please try again in a moment.';
}
