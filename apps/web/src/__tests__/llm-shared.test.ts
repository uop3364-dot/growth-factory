import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  checkRateLimit,
  checkBudget,
  getCachedResponse,
  setCachedResponse,
  buildCacheKey,
  recordUsage,
  getUsageSnapshot,
  isFakeFallbackAllowed,
  llmUnavailableError,
} from '@/lib/llm-shared';

describe('llm-shared', () => {
  // ---------------------------------------------------------------------------
  // Rate limiter
  // ---------------------------------------------------------------------------

  describe('rate limiter', () => {
    it('allows first request from a new IP', () => {
      const result = checkRateLimit(`test-ip-${Date.now()}`);
      expect(result.allowed).toBe(true);
    });

    it('blocks after exceeding rate limit', () => {
      const ip = `test-ip-rate-${Date.now()}`;
      // Default limit is 5 per minute
      for (let i = 0; i < 5; i++) {
        const r = checkRateLimit(ip);
        expect(r.allowed).toBe(true);
      }
      // 6th should be blocked
      const blocked = checkRateLimit(ip);
      expect(blocked.allowed).toBe(false);
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
    });
  });

  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  describe('cache', () => {
    it('returns null for cache miss', () => {
      expect(getCachedResponse('nonexistent-key')).toBeNull();
    });

    it('returns cached data on cache hit', () => {
      const key = `test-cache-${Date.now()}`;
      const data = { captions: ['hello'] };
      setCachedResponse(key, data);
      expect(getCachedResponse(key)).toEqual(data);
    });

    it('builds unique cache keys for different inputs', () => {
      const a = buildCacheKey('captions', { platform: 'instagram', topic: 'travel', tone: 'funny' });
      const b = buildCacheKey('captions', { platform: 'tiktok', topic: 'travel', tone: 'funny' });
      expect(a).not.toEqual(b);
    });

    it('builds same cache key for same inputs regardless of field order', () => {
      const a = buildCacheKey('captions', { tone: 'funny', platform: 'instagram', topic: 'travel' });
      const b = buildCacheKey('captions', { platform: 'instagram', topic: 'travel', tone: 'funny' });
      expect(a).toEqual(b);
    });
  });

  // ---------------------------------------------------------------------------
  // Budget tracker
  // ---------------------------------------------------------------------------

  describe('budget tracker', () => {
    it('allows when no budget is set', () => {
      delete process.env.MONTHLY_LLM_BUDGET_USD;
      expect(checkBudget().allowed).toBe(true);
    });

    it('records usage and tracks cost', () => {
      const before = getUsageSnapshot();
      recordUsage(0.01);
      const after = getUsageSnapshot();
      expect(after.requestCount).toBeGreaterThan(before.requestCount);
    });
  });

  // ---------------------------------------------------------------------------
  // Fallback safety
  // ---------------------------------------------------------------------------

  describe('fallback safety', () => {
    it('isFakeFallbackAllowed returns false by default', () => {
      delete process.env.ALLOW_FAKE_FALLBACK;
      expect(isFakeFallbackAllowed()).toBe(false);
    });

    it('isFakeFallbackAllowed returns true when explicitly set', () => {
      process.env.ALLOW_FAKE_FALLBACK = 'true';
      expect(isFakeFallbackAllowed()).toBe(true);
      delete process.env.ALLOW_FAKE_FALLBACK;
    });

    it('llmUnavailableError mentions unavailability when no API key', () => {
      delete process.env.OPENAI_API_KEY;
      const msg = llmUnavailableError();
      expect(msg).toContain('unavailable');
    });
  });
});
