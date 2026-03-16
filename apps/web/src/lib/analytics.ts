export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!(window as any).gtag) return;
  (window as any).gtag("event", name, params || {});
}
