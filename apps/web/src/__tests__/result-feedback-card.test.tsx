import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResultFeedbackCard from '@/components/brand/ResultFeedbackCard';

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock affiliate-links
vi.mock('@/lib/affiliate-links', () => ({
  getAffiliateLink: (slug: string) =>
    slug === 'vidiq' ? 'https://vidiq.com' : '#',
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({ success: true, id: 'tf_test_123' }),
  });
});

// ─── Rendering ───────────────────────────────────────────────

describe('ResultFeedbackCard rendering', () => {
  it('renders the card with title and buttons', () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    expect(screen.getByText('Help MoLink Dino get better')).toBeDefined();
    expect(screen.getByText('Did this help you?')).toBeDefined();
    expect(screen.getByTestId('feedback-yes')).toBeDefined();
    expect(screen.getByTestId('feedback-no')).toBeDefined();
  });

  it('has data-testid for automated detection', () => {
    const { container } = render(<ResultFeedbackCard toolSlug="title-generator" />);
    expect(container.querySelector('[data-testid="result-feedback-card"]')).not.toBeNull();
  });

  it('does not show textarea in initial state', () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    expect(screen.queryByTestId('feedback-textarea')).toBeNull();
  });
});

// ─── Yes path ────────────────────────────────────────────────

describe('Yes feedback path', () => {
  it('submits yes feedback and shows thank-you + CTA', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" routePath="/title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-thanks')).toBeDefined();
    });

    expect(screen.getByText('Thanks — your feedback helps MoLink Dino improve.')).toBeDefined();
    expect(screen.getByTestId('feedback-cta-block')).toBeDefined();
    expect(screen.getByText('Try VidIQ (free)')).toBeDefined();
  });

  it('sends correct payload for yes', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" routePath="/title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/tool-feedback', expect.objectContaining({
        method: 'POST',
      }));
    });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.toolSlug).toBe('title-generator');
    expect(callBody.routePath).toBe('/title-generator');
    expect(callBody.sentiment).toBe('yes');
    expect(callBody.ctaShown).toBe(true);
  });

  it('shows optional textarea after yes', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-optional-textarea')).toBeDefined();
    });
  });

  it('hides yes/no buttons after submitting', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.queryByTestId('feedback-yes')).toBeNull();
      expect(screen.queryByTestId('feedback-no')).toBeNull();
    });
  });
});

// ─── No path ─────────────────────────────────────────────────

describe('No feedback path', () => {
  it('shows textarea when No is clicked', () => {
    render(<ResultFeedbackCard toolSlug="bio-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));

    expect(screen.getByTestId('feedback-textarea')).toBeDefined();
    expect(screen.getByTestId('feedback-submit')).toBeDefined();
  });

  it('submits no + message correctly', async () => {
    render(<ResultFeedbackCard toolSlug="hashtag-generator" routePath="/hashtag-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));

    const textarea = screen.getByTestId('feedback-textarea');
    fireEvent.change(textarea, { target: { value: 'Need more niche options' } });
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-thanks')).toBeDefined();
    });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.sentiment).toBe('no');
    expect(callBody.message).toBe('Need more niche options');
    expect(callBody.toolSlug).toBe('hashtag-generator');
  });

  it('no path without message still works', async () => {
    render(<ResultFeedbackCard toolSlug="bio-generator" routePath="/bio-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-thanks')).toBeDefined();
    });
  });
});

// ─── CTA tracking ────────────────────────────────────────────

describe('CTA click tracking', () => {
  it('VidIQ CTA link points to affiliate URL', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      const link = screen.getByTestId('feedback-cta-vidiq');
      expect(link.getAttribute('href')).toContain('vidiq.com');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('sponsored');
    });
  });

  it('CTA click fires tracking request', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-cta-vidiq')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('feedback-cta-vidiq'));

    await waitFor(() => {
      const ctaCalls = mockFetch.mock.calls.filter(
        (c: any) => c[0] === '/api/tool-feedback/cta-click',
      );
      expect(ctaCalls.length).toBe(1);
      const body = JSON.parse(ctaCalls[0][1].body);
      expect(body.feedbackId).toBe('tf_test_123');
      expect(body.target).toBe('vidiq');
    });
  });
});

// ─── Duplicate submission prevention ─────────────────────────

describe('Duplicate submission handling', () => {
  it('buttons are not shown after yes submission', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.queryByTestId('feedback-yes')).toBeNull();
      expect(screen.queryByTestId('feedback-no')).toBeNull();
    });
  });

  it('submit button is not shown after no submission', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.queryByTestId('feedback-submit')).toBeNull();
    });
  });
});

// ─── Tool slug and route path ────────────────────────────────

describe('Tool context propagation', () => {
  it('passes toolSlug correctly in payload', async () => {
    render(<ResultFeedbackCard toolSlug="caption-generator" routePath="/caption-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.toolSlug).toBe('caption-generator');
      expect(body.routePath).toBe('/caption-generator');
    });
  });
});
