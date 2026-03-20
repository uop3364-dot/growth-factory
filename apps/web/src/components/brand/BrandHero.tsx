import MascotHint from './MascotHint';
import { brandCopy } from '@/lib/brandCopy';

interface BrandHeroProps {
  children: React.ReactNode;
  /** Additional class for the hero section (e.g. gradient overrides) */
  className?: string;
  /** Show mascot hint in hero */
  showMascot?: boolean;
  /** Mascot hint text */
  hintText?: string;
}

/**
 * Branded hero wrapper. Wraps existing hero content, adds optional mascot
 * presence WITHOUT reducing H1 clarity or changing SEO content.
 */
export default function BrandHero({
  children,
  className = '',
  showMascot = true,
  hintText,
}: BrandHeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {children}
      {showMascot && (
        <div className="flex justify-center mt-3 animate-brand-fade-in">
          <MascotHint text={hintText ?? brandCopy.hero[0]} />
        </div>
      )}
    </section>
  );
}
