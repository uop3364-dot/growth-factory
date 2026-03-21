import BrandHero from './BrandHero';
import ToolSurface from './ToolSurface';

interface ToolPageLayoutProps {
  /** JSON-LD scripts (passed through as-is) */
  scripts?: React.ReactNode;
  /** Hero section content (h1, subtitle, CTA) */
  heroContent: React.ReactNode;
  /** Hero section className (gradient etc.) */
  /** @default 'brand-hero-gradient py-12' */
  heroClassName?: string;
  /** Mascot hint text for hero */
  heroHint?: string;
  /** Main content area */
  children: React.ReactNode;
}

/**
 * Shared layout wrapper for all tool pages.
 * Provides consistent brand styling while preserving all SEO content.
 * Future pages automatically inherit the brand layer by using this layout.
 */
export default function ToolPageLayout({
  scripts,
  heroContent,
  heroClassName = 'brand-hero-gradient py-12',
  heroHint,
  children,
}: ToolPageLayoutProps) {
  return (
    <>
      {scripts}
      <BrandHero className={heroClassName} hintText={heroHint}>
        {heroContent}
      </BrandHero>
      <ToolSurface>
        {children}
      </ToolSurface>
    </>
  );
}
