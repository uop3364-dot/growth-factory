import MascotImage from './MascotImage';
import MascotHint from './MascotHint';
import { brandCopy } from '@/lib/brandCopy';

interface DinoHeroProps {
  /** Main heading (H1) */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** CTA button content (rendered as-is) */
  cta?: React.ReactNode;
  /** Mascot hint text override */
  hintText?: string;
  /** Hide mascot entirely */
  hideMascot?: boolean;
  /** Additional className for the hero section */
  className?: string;
  /** Children rendered below the subtitle, before the mascot hint */
  children?: React.ReactNode;
}

/**
 * Dino-branded hero section with mascot, title, subtitle, and CTA.
 * Uses the brand green gradient. Mascot appears once (right side on desktop).
 * All pages using this component automatically get consistent brand styling.
 */
export default function DinoHero({
  title,
  subtitle,
  cta,
  hintText,
  hideMascot = false,
  className = '',
  children,
}: DinoHeroProps) {
  return (
    <section className={`brand-hero-gradient py-12 md:py-16 relative overflow-hidden ${className}`}>
      <div className="max-w-5xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-lg text-white/85 mb-4 max-w-2xl">{subtitle}</p>
          )}
          {cta && <div className="mb-4">{cta}</div>}
          {children}
        </div>
        {/* Mascot — only once, right side */}
        {!hideMascot && (
          <div className="flex-shrink-0">
            <MascotImage
              size="lg"
              priority
              className="drop-shadow-xl animate-brand-breathe"
              alt="Lazy Dino — your AI content sidekick"
            />
          </div>
        )}
      </div>
      {/* Mascot hint at bottom */}
      {!hideMascot && (
        <div className="flex justify-center mt-4 animate-brand-fade-in">
          <MascotHint
            text={hintText ?? brandCopy.hero[0]}
            className="bg-white/10 border-white/20 text-white/80"
          />
        </div>
      )}
    </section>
  );
}
