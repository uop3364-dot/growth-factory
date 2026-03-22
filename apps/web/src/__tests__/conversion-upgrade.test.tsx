import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResultFeedbackCard from '@/components/brand/ResultFeedbackCard';
import LockedResultsOverlay from '@/components/brand/LockedResultsOverlay';

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

// ─── LockedResultsOverlay ────────────────────────────────────

describe('LockedResultsOverlay', () => {
  it('renders when totalCount > visibleCount', () => {
    render(
      <LockedResultsOverlay totalCount={10} visibleCount={3} toolSlug="title-generator" />,
    );
    expect(screen.getByTestId('locked-results-overlay')).toBeDefined();
    expect(screen.getByTestId('locked-title')).toBeDefined();
    expect(screen.getByText(/Unlock all high-performing titles/)).toBeDefined();
  });

  it('does not render when totalCount <= visibleCount', () => {
    const { container } = render(
      <LockedResultsOverlay totalCount={3} visibleCount={3} toolSlug="title-generator" />,
    );
    expect(container.querySelector('[data-testid="locked-results-overlay"]')).toBeNull();
  });

  it('shows "Coming soon" when TITLE_PACK_URL is not set', () => {
    render(
      <LockedResultsOverlay totalCount={10} visibleCount={3} toolSlug="title-generator" />,
    );
    expect(screen.getByTestId('locked-cta-coming-soon')).toBeDefined();
  });

  it('shows VidIQ CTA with affiliate link', () => {
    render(
      <LockedResultsOverlay totalCount={10} visibleCount={3} toolSlug="title-generator" />,
    );
    const vidiqLink = screen.getByTestId('locked-cta-vidiq');
    expect(vidiqLink.getAttribute('href')).toContain('vidiq.com');
    expect(vidiqLink.getAttribute('rel')).toContain('sponsored');
  });

  it('displays correct total count in text', () => {
    render(
      <LockedResultsOverlay totalCount={10} visibleCount={3} toolSlug="title-generator" />,
    );
    expect(screen.getByText(/Get all 10 results/)).toBeDefined();
  });
});

// ─── ResultFeedbackCard - Yes path CTA ──────────────────────

describe('Yes path CTA (upgraded)', () => {
  it('shows strong CTA with "These titles are just a preview"', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" routePath="/title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByText('These titles are just a preview.')).toBeDefined();
      expect(screen.getByText(/Get 10x better viral titles/)).toBeDefined();
    });
  });

  it('shows VidIQ button labeled "Try VidIQ (free)"', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByText('Try VidIQ (free)')).toBeDefined();
    });
  });

  it('shows optional textarea after yes', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-optional-textarea')).toBeDefined();
    });
  });
});

// ─── ResultFeedbackCard - No path CTA ───────────────────────

describe('No path CTA (upgraded)', () => {
  it('shows textarea when No clicked', () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));

    expect(screen.getByTestId('feedback-textarea')).toBeDefined();
    expect(screen.getByText('Tell us what went wrong:')).toBeDefined();
  });

  it('shows strong "Not good enough?" CTA after no submit', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" routePath="/title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByText('Not good enough?')).toBeDefined();
      expect(screen.getByText(/Get better results in seconds/)).toBeDefined();
    });
  });

  it('shows "Improve with VidIQ" button in No path', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByText('Improve with VidIQ')).toBeDefined();
    });
  });
});

// ─── CTA Click Tracking ─────────────────────────────────────

describe('CTA click tracking (upgraded)', () => {
  it('VidIQ CTA click fires tracking in Yes path', async () => {
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

  it('VidIQ CTA click fires tracking in No path', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-cta-vidiq')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('feedback-cta-vidiq'));

    await waitFor(() => {
      const ctaCalls = mockFetch.mock.calls.filter(
        (c: any) => c[0] === '/api/tool-feedback/cta-click',
      );
      expect(ctaCalls.length).toBe(1);
    });
  });

  it('title_pack CTA shows "Coming soon" when URL not set', async () => {
    render(<ResultFeedbackCard toolSlug="title-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      const packCta = screen.getByTestId('feedback-cta-title_pack');
      expect(packCta.tagName).toBe('SPAN'); // disabled span, not a link
      expect(packCta.textContent).toBe('Coming soon');
    });
  });
});

// ─── Sentiment tracking ──────────────────────────────────────

describe('Sentiment tracking', () => {
  it('submits yes sentiment correctly', async () => {
    render(<ResultFeedbackCard toolSlug="caption-generator" routePath="/caption-generator" />);
    fireEvent.click(screen.getByTestId('feedback-yes'));

    await waitFor(() => {
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.sentiment).toBe('yes');
      expect(body.toolSlug).toBe('caption-generator');
    });
  });

  it('submits no sentiment with message', async () => {
    render(<ResultFeedbackCard toolSlug="bio-generator" routePath="/bio-generator" />);
    fireEvent.click(screen.getByTestId('feedback-no'));

    const textarea = screen.getByTestId('feedback-textarea');
    fireEvent.change(textarea, { target: { value: 'Need more options' } });
    fireEvent.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.sentiment).toBe('no');
      expect(body.message).toBe('Need more options');
    });
  });
});
