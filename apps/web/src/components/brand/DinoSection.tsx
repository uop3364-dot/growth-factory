import MascotImage from './MascotImage';

interface DinoSectionProps {
  /** Section heading */
  title?: string;
  /** Show a small dino decoration */
  showDino?: boolean;
  /** Dino position */
  dinoPosition?: 'left' | 'right';
  /** Additional className */
  className?: string;
  children: React.ReactNode;
}

/**
 * Content section with optional small dino decoration.
 * Use sparingly — dino should appear max 1-2 times per page.
 */
export default function DinoSection({
  title,
  showDino = false,
  dinoPosition = 'right',
  className = '',
  children,
}: DinoSectionProps) {
  return (
    <section className={`bg-white rounded-brand-lg shadow-brand border border-brand-green/10 p-6 ${className}`}>
      {(title || showDino) && (
        <div className={`flex items-center gap-3 mb-4 ${dinoPosition === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
          <h2 className="text-xl font-bold text-brand-outline flex-1">{title}</h2>
          {showDino && (
            <MascotImage size="xs" className="opacity-60" />
          )}
        </div>
      )}
      {children}
    </section>
  );
}
