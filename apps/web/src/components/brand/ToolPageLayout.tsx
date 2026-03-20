import BrandHero from './BrandHero';
import ToolSurface from './ToolSurface';

interface ToolPageLayoutProps {
  /** JSON-LD scripts (passed through as-is) */
  scripts?: React.ReactNode;
  /** Hero section content (h1, subtitle, CTA) */
  heroContent: React.ReactNode;
  /** Hero section className (gradient etc.) */
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
  heroClassName = 'bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12',
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
