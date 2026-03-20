import Image from 'next/image';
import type { MascotSize } from './MascotSvg';
import MascotSvg from './MascotSvg';
import { getMascot, mascotSizes } from '@/lib/brandAssets';

/** Canonical path — re-exported for backward compat. */
export const MASCOT_MASTER_PATH = getMascot();

const SIZE_MAP: Record<MascotSize, number> = {
  xs: mascotSizes.sm,   // 48
  sm: mascotSizes.sm,   // 48
  md: mascotSizes.md,   // 80
  lg: mascotSizes.lg,   // 140
  hero: mascotSizes.hero, // 280
};

interface MascotImageProps {
  size?: MascotSize;
  className?: string;
  /** Set true for above-the-fold usage (e.g. hero, nav logo). */
  priority?: boolean;
  alt?: string;
  /** Force SVG fallback even when image exists. */
  forceSvg?: boolean;
  /** Pass through to MascotSvg when in fallback mode. */
  withLaptop?: boolean;
}

/**
 * Production mascot component — single source for Lazy Dino rendering.
 *
 * Uses /brand/lazy-dino.png via brandAssets helper.
 * Fallback: inline MascotSvg if `forceSvg` is set.
 */
export default function MascotImage({
  size = 'sm',
  className = '',
  priority = false,
  alt = 'MoLink Lazy Dino',
  forceSvg = false,
  withLaptop = false,
}: MascotImageProps) {
  const px = SIZE_MAP[size];

  if (forceSvg) {
    return <MascotSvg size={size} className={className} withLaptop={withLaptop} />;
  }

  return (
    <Image
      src={getMascot()}
      width={px}
      height={px}
      alt={alt}
      className={`rounded-2xl ${className}`}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={85}
    />
  );
}
