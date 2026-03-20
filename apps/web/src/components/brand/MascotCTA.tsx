import MascotImage from './MascotImage';
import { brandCopy } from '@/lib/brandCopy';

interface MascotCTAProps {
  children: React.ReactNode;
  className?: string;
  /** Optional benefit-led helper line shown above/near the CTA. */
  helperText?: string;
  /** Show the helper line. Defaults to false for backwards compat. */
  showHelper?: boolean;
}

/**
 * CTA enhancement — subtle mascot presence on the side + optional conversion helper.
 * Wraps existing CTA content; does NOT block the button.
 *
 * Two presentation layers:
 * 1. helperText — short benefit-led line (e.g. "Save hours. Let AI do the work.")
 * 2. mascot visual — decorative companion
 */
export default function MascotCTA({
  children,
  className = '',
  helperText,
  showHelper = false,
}: MascotCTAProps) {
  const helper = helperText ?? brandCopy.cta[0];
  return (
    <div className={`relative ${className}`}>
      {showHelper && (
        <p className="text-xs text-gray-500 mb-1.5 text-center sm:text-left">{helper}</p>
      )}
      <div className="inline-flex items-center gap-2">
        {children}
        <span className="hidden sm:block opacity-60 hover:opacity-100 transition-opacity">
          <MascotImage size="xs" />
        </span>
      </div>
    </div>
  );
}
