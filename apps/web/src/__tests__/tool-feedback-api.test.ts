import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock llm-shared before importing route
vi.mock('@/lib/llm-shared', () => ({
  checkRateLimit: vi.fn(() => ({ allowed: true, remaining: 5 })),
}));

// We test the API route handlers directly
import { POST } from '@/app/api/tool-feedback/route';
import { POST as POST_CTA } from '@/app/api/tool-feedback/cta-click/route';

function makeRequest(body: any): any {
  return {
    json: () => Promise.resolve(body),
    headers: new Map([
      ['x-forwarded-for', '127.0.0.1'],
      ['user-agent', 'vitest'],
    ]) as any,
  };
}

// ─── POST /api/tool-feedback ─────────────────────────────────

describe('POST /api/tool-feedback', () => {
  it('returns success and id for valid yes feedback', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'title-generator',
      routePath: '/title-generator',
      sentiment: 'yes',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toMatch(/^tf_/);
  });

  it('returns success for no + message', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'caption-generator',
      routePath: '/caption-generator',
      sentiment: 'no',
      message: 'Need more options for Instagram Reels',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toMatch(/^tf_/);
  });

  it('rejects missing toolSlug', async () => {
    const res = await POST(makeRequest({
      routePath: '/title-generator',
      sentiment: 'yes',
    }) as any);
    expect(res.status).toBe(400);
  });

  it('rejects missing routePath', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'title-generator',
      sentiment: 'yes',
    }) as any);
    expect(res.status).toBe(400);
  });

  it('rejects invalid sentiment', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'title-generator',
      routePath: '/title-generator',
      sentiment: 'maybe',
    }) as any);
    expect(res.status).toBe(400);
  });

  it('rejects message over 5000 chars', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'title-generator',
      routePath: '/title-generator',
      sentiment: 'no',
      message: 'x'.repeat(5001),
    }) as any);
    expect(res.status).toBe(400);
  });

  it('accepts empty message (optional)', async () => {
    const res = await POST(makeRequest({
      toolSlug: 'bio-generator',
      routePath: '/bio-generator',
      sentiment: 'no',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});

// ─── POST /api/tool-feedback/cta-click ──────────────────────

describe('POST /api/tool-feedback/cta-click', () => {
  it('returns success for valid cta click', async () => {
    // First create a feedback to get an id
    const fbRes = await POST(makeRequest({
      toolSlug: 'title-generator',
      routePath: '/title-generator',
      sentiment: 'yes',
    }) as any);
    const { id } = await fbRes.json();

    const res = await POST_CTA(makeRequest({
      feedbackId: id,
      target: 'vidiq',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('rejects missing feedbackId', async () => {
    const res = await POST_CTA(makeRequest({
      target: 'vidiq',
    }) as any);
    expect(res.status).toBe(400);
  });

  it('rejects invalid target', async () => {
    const res = await POST_CTA(makeRequest({
      feedbackId: 'tf_123',
      target: 'invalid',
    }) as any);
    expect(res.status).toBe(400);
  });

  it('accepts title_pack as target', async () => {
    const res = await POST_CTA(makeRequest({
      feedbackId: 'tf_123',
      target: 'title_pack',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('accepts metricool as target', async () => {
    const res = await POST_CTA(makeRequest({
      feedbackId: 'tf_123',
      target: 'metricool',
    }) as any);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});
