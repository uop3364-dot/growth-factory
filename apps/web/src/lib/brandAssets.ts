/**
 * Brand asset helpers — single source of truth for mascot paths and sizes.
 *
 * RULE: Never inline "/brand/lazy-dino.png" in components.
 * Always import from here.
 */

/** Canonical mascot image path. */
const MASCOT_PATH = '/brand/20260319_105507321_iOS.png' as const;

/** Returns the mascot image path. */
export function getMascot(): string {
  return MASCOT_PATH;
}

/** Standard mascot size presets (px). */
export const mascotSizes = {
  /** Hero placement: 240–320 px */
  hero: 280,
  /** Large section placement: 120–160 px */
  lg: 140,
  /** Medium inline placement: 72–96 px */
  md: 80,
  /** Small inline / badge: 48–56 px */
  sm: 48,
} as const;

export type MascotSizeKey = keyof typeof mascotSizes;
