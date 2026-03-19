export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!(window as any).gtag) return;
  (window as any).gtag("event", name, params || {});
}

/**
 * v2: Track which SEO variant is being shown for A/B testing.
 * Called once per page load for pages with overrides.
 */
export function trackSeoVariant(pagePath: string, variant: 'A' | 'B') {
  trackEvent('seo_variant_impression', {
    page_path: pagePath,
    variant,
  });
}
