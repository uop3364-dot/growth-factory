import MascotImage from './MascotImage';
import type { MascotSize } from './MascotSvg';

interface MascotBadgeProps {
  size?: MascotSize;
  className?: string;
  withLaptop?: boolean;
  /** Set true for above-the-fold placements. */
  priority?: boolean;
}

/** Small mascot visual near headings or CTAs. */
export default function MascotBadge({ size = 'sm', className = '', withLaptop = false, priority = false }: MascotBadgeProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <MascotImage size={size} withLaptop={withLaptop} priority={priority} />
    </span>
  );
}
