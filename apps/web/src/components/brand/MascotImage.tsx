import Image from 'next/image';
import type { MascotSize } from './MascotSvg';
import MascotSvg from './MascotSvg';

/** Canonical path for the production mascot asset. */
export const MASCOT_MASTER_PATH = '/brand/mascot-master.png';

const SIZE_MAP: Record<MascotSize, number> = {
  xs: 24,
  sm: 36,
  md: 56,
  lg: 80,
};

interface MascotImageProps {
  size?: MascotSize;
  className?: string;
  /** Set true for above-the-fold usage (e.g. nav logo). */
  priority?: boolean;
  alt?: string;
  /** Force SVG fallback even when image exists. */
  forceSvg?: boolean;
  /** Pass through to MascotSvg when in fallback mode. */
  withLaptop?: boolean;
}

/**
 * Production mascot component.
 *
 * Primary: renders optimised next/image from /brand/mascot-master.png.
 * Fallback: renders inline MascotSvg if `forceSvg` is set or the master
 * asset is not yet deployed.
 *
 * When the final mascot PNG is ready, drop it at:
 *   public/brand/mascot-master.png
 * No code changes needed — MascotImage will serve it automatically.
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

  // Until the real mascot PNG is deployed, use SVG fallback.
  // When mascot-master.png exists in public/brand/, set this to true.
  const MASTER_ASSET_READY = true;

  if (forceSvg || !MASTER_ASSET_READY) {
    return <MascotSvg size={size} className={className} withLaptop={withLaptop} />;
  }

  return (
    <Image
      src={MASCOT_MASTER_PATH}
      width={px}
      height={px}
      alt={alt}
      className={className}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={85}
    />
  );
}
