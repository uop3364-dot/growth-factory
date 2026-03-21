import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Integration-style tests for the captions API route behavior.
 * These test the generateCaptionsWithProvider function directly
 * since testing Next.js API routes in vitest requires more setup.
 */

describe('captions API behavior', () => {
  beforeEach(() => {
    // Reset env for each test
    delete process.env.OPENAI_API_KEY;
    delete process.env.ALLOW_FAKE_FALLBACK;
  });

  it('returns null in production when no API key (no fake fallback)', async () => {
    // Simulate production: no API key, no fake fallback
    delete process.env.OPENAI_API_KEY;
    delete process.env.ALLOW_FAKE_FALLBACK;

    const { generateCaptionsWithProvider } = await import('@/lib/caption-generator');
    const result = await generateCaptionsWithProvider({
      platform: 'instagram',
      topic: 'travel',
      tone: 'funny',
    });

    expect(result).toBeNull();
  });

  it('returns fallback content in dev mode with ALLOW_FAKE_FALLBACK=true', async () => {
    process.env.ALLOW_FAKE_FALLBACK = 'true';
    delete process.env.OPENAI_API_KEY;

    const { generateCaptionsWithProvider } = await import('@/lib/caption-generator');
    const result = await generateCaptionsWithProvider({
      platform: 'instagram',
      topic: 'travel',
      tone: 'funny',
    });

    expect(result).not.toBeNull();
    expect(result!.source).toBe('fallback');
    expect(result!.captions).toHaveLength(10);
  });

  it('fallback content varies with language (not fixed English template)', async () => {
    process.env.ALLOW_FAKE_FALLBACK = 'true';

    const { generateCaptionsWithProvider } = await import('@/lib/caption-generator');

    const english = await generateCaptionsWithProvider({
      platform: 'instagram',
      topic: 'travel',
      tone: 'funny',
      language: 'english',
    });

    const spanish = await generateCaptionsWithProvider({
      platform: 'instagram',
      topic: 'travel',
      tone: 'funny',
      language: 'spanish',
    });

    expect(english).not.toBeNull();
    expect(spanish).not.toBeNull();

    // They must be different
    expect(english!.captions).not.toEqual(spanish!.captions);
    expect(english!.ctaSuggestion).not.toEqual(spanish!.ctaSuggestion);
  });
});
