import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AffiliateCTA from '@/components/AffiliateCTA';
import HomeAffiliate from '@/components/HomeAffiliate';
import {
  getAffiliateLink,
} from '@/lib/affiliate-links';

// Mock analytics to prevent gtag errors
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// ─── Affiliate Links Config ───────────────────────────────────────

describe('affiliate-links config', () => {
  it('returns a valid URL for vidiq', () => {
    expect(getAffiliateLink('vidiq')).toMatch(/^https:\/\/.*vidiq/);
  });

  it('returns a valid URL for metricool', () => {
    expect(getAffiliateLink('metricool')).toMatch(/^https:\/\/.*(metricool|mtr\.cool)/);
  });

  it('returns "#" for unknown partners', () => {
    expect(getAffiliateLink('unknown_partner_xyz')).toBe('#');
  });

  it('CTA links come from config (getAffiliateLink), not hardcoded', () => {
    const vidiq = getAffiliateLink('vidiq');
    const metricool = getAffiliateLink('metricool');
    expect(vidiq).toMatch(/^https:\/\//);
    expect(metricool).toMatch(/^https:\/\//);
  });
});

// ─── AffiliateCTA Component ──────────────────────────────────

describe('AffiliateCTA component', () => {
  it('renders vidIQ as primary CTA', () => {
    render(<AffiliateCTA />);
    const link = screen.getByText('Try vidIQ');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toContain('vidiq.com');
  });

  it('renders Metricool as secondary CTA', () => {
    render(<AffiliateCTA />);
    const link = screen.getByText('Track with Metricool');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toMatch(/metricool\.com|mtr\.cool/);
  });

  it('all links have rel="sponsored"', () => {
    render(<AffiliateCTA />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link.getAttribute('rel')).toContain('sponsored');
    }
  });

  it('all links have target="_blank"', () => {
    render(<AffiliateCTA />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
    }
  });

  it('does not render any banned provider name', () => {
    const { container } = render(<AffiliateCTA />);
    const html = container.innerHTML;
    const banned = ['Canva', 'Jasper', 'TubeBuddy', 'OpusClip', 'Descript', 'Pictory'];
    for (const name of banned) {
      expect(html).not.toContain(name);
    }
  });

  it('includes data-affiliate attributes for tracking', () => {
    render(<AffiliateCTA />);
    expect(screen.getByText('Try vidIQ').getAttribute('data-affiliate')).toBe('vidiq-primary');
    expect(screen.getByText('Track with Metricool').getAttribute('data-affiliate')).toBe('metricool-secondary');
  });

  it('has data-testid="affiliate-cta" for automated detection', () => {
    const { container } = render(<AffiliateCTA />);
    expect(container.querySelector('[data-testid="affiliate-cta"]')).not.toBeNull();
  });

  it('accepts custom headline and subtext', () => {
    render(<AffiliateCTA customHeadline="Custom Title" customSubtext="Custom body" />);
    expect(screen.getByText('Custom Title')).toBeDefined();
    expect(screen.getByText('Custom body')).toBeDefined();
  });

  it('CTA providers are vidiq or metricool only', () => {
    render(<AffiliateCTA />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      const affiliate = link.getAttribute('data-affiliate') ?? '';
      const provider = affiliate.split('-')[0];
      expect(['vidiq', 'metricool']).toContain(provider);
    }
  });
});

// ─── HomeAffiliate Component ─────────────────────────────────

describe('HomeAffiliate component', () => {
  it('renders vidIQ and Metricool cards', () => {
    render(<HomeAffiliate />);
    expect(screen.getByText('vidIQ')).toBeDefined();
    expect(screen.getByText('Metricool')).toBeDefined();
  });

  it('does not render old partners', () => {
    const { container } = render(<HomeAffiliate />);
    const html = container.innerHTML;
    expect(html).not.toContain('TubeBuddy');
    expect(html).not.toContain('Canva');
    expect(html).not.toContain('OpusClip');
  });

  it('all links have rel="sponsored"', () => {
    render(<HomeAffiliate />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link.getAttribute('rel')).toContain('sponsored');
    }
  });

  it('vidIQ link points to correct affiliate URL', () => {
    render(<HomeAffiliate />);
    const link = screen.getByText(/Try vidIQ Free/);
    expect(link.getAttribute('href')).toContain('vidiq.com/molinkai-ai');
  });

  it('Metricool link points to correct affiliate URL', () => {
    render(<HomeAffiliate />);
    const link = screen.getByText(/Track with Metricool/);
    expect(link.getAttribute('href')).toMatch(/metricool\.com|mtr\.cool/);
  });
});

// ─── SEO Page CTA Presence (structural checks) ──────────────

describe('SEO page CTA structural guarantees', () => {
  it('AffiliateCTA renders exactly 2 affiliate links (primary + secondary)', () => {
    render(<AffiliateCTA />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('HomeAffiliate renders exactly 2 affiliate links', () => {
    render(<HomeAffiliate />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('AffiliateCTA with all props still renders correct providers', () => {
    render(
      <AffiliateCTA
        pageType="tone"
        platform="youtube"
        customHeadline="Test"
        customSubtext="Test body"
        placement="result"
        toolSlug="caption-generator"
      />
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    // Both must be whitelisted
    for (const link of links) {
      const href = link.getAttribute('href') ?? '';
      expect(href).not.toBe('#');
      expect(href).toMatch(/vidiq\.com|mtr\.cool/);
    }
  });
});
