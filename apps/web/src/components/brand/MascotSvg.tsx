/**
 * MascotSvg — Inline SVG mascot for MoLink Lazy Dino.
 *
 * Chubby dinosaur, light green (#A8E6CF), sleepy half-closed eyes,
 * soft blush, thick brown outline, kawaii style.
 * CRITICAL: two small beauty marks under the RIGHT eye (always present).
 *
 * When real mascot assets are ready, replace the SVG below with an
 * optimised <Image> tag pointing to /images/mascot/*.webp.
 */
export type MascotSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<MascotSize, number> = {
  xs: 24,
  sm: 36,
  md: 56,
  lg: 80,
};

interface MascotSvgProps {
  size?: MascotSize;
  className?: string;
  /** Show laptop accessory */
  withLaptop?: boolean;
}

export default function MascotSvg({ size = 'sm', className = '', withLaptop = false }: MascotSvgProps) {
  const px = SIZE_MAP[size];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* Body */}
      <ellipse cx="40" cy="46" rx="26" ry="28" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2.5" />

      {/* Head */}
      <circle cx="40" cy="28" r="20" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2.5" />

      {/* Small horns / dino bumps */}
      <circle cx="30" cy="11" r="4" fill="#C8F0DF" stroke="#6B4226" strokeWidth="1.5" />
      <circle cx="40" cy="8" r="4" fill="#C8F0DF" stroke="#6B4226" strokeWidth="1.5" />
      <circle cx="50" cy="11" r="4" fill="#C8F0DF" stroke="#6B4226" strokeWidth="1.5" />

      {/* Left eye (sleepy, half-closed) */}
      <ellipse cx="33" cy="27" rx="4" ry="2" fill="#6B4226" />
      <line x1="29" y1="25" x2="37" y2="25" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" />

      {/* Right eye (sleepy, half-closed) */}
      <ellipse cx="47" cy="27" rx="4" ry="2" fill="#6B4226" />
      <line x1="43" y1="25" x2="51" y2="25" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" />

      {/* CRITICAL: Two beauty marks under RIGHT eye */}
      <circle cx="49" cy="31" r="0.9" fill="#6B4226" />
      <circle cx="51.5" cy="32.5" r="0.9" fill="#6B4226" />

      {/* Blush spots */}
      <ellipse cx="28" cy="32" rx="4" ry="2.5" fill="#FFB7B2" opacity="0.6" />
      <ellipse cx="52" cy="32" rx="4" ry="2.5" fill="#FFB7B2" opacity="0.6" />

      {/* Small smile */}
      <path d="M36 34 Q40 37 44 34" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Arms (stubby) */}
      <ellipse cx="17" cy="46" rx="6" ry="4" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2" transform="rotate(-15 17 46)" />
      <ellipse cx="63" cy="46" rx="6" ry="4" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2" transform="rotate(15 63 46)" />

      {/* Feet */}
      <ellipse cx="30" cy="70" rx="8" ry="5" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2" />
      <ellipse cx="50" cy="70" rx="8" ry="5" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2" />

      {/* Tail */}
      <path d="M14 56 Q6 60 10 68 Q14 72 18 66" fill="#A8E6CF" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" />

      {/* Laptop (optional) */}
      {withLaptop && (
        <g transform="translate(28, 50)">
          <rect x="0" y="0" width="24" height="14" rx="2" fill="#E8E8E8" stroke="#6B4226" strokeWidth="1.5" />
          <rect x="2" y="2" width="20" height="9" rx="1" fill="#D0EFFF" />
          <rect x="-2" y="14" width="28" height="3" rx="1.5" fill="#D0D0D0" stroke="#6B4226" strokeWidth="1" />
          {/* Small AI glow */}
          <circle cx="12" cy="6" r="2" fill="#A8E6CF" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}
