/**
 * Centralized brand microcopy registry for MoLink Lazy Dino.
 *
 * ALL user-facing brand helper text lives here.
 * English only. Calm, lazy, light, slightly playful, credible.
 *
 * Usage:
 *   import { brandCopy } from '@/lib/brandCopy';
 *   <MascotHint text={brandCopy.hero[0]} />
 */

/** Hero section mascot hints — shown below the CTA in hero banners. */
const hero = [
  'AI is working. I\'m resting.',
  'Working smarter, lounging harder.',
  'Less effort, better output.',
  'Your lazy AI helper.',
] as const;

/** CTA helper lines — short benefit-led line shown near action buttons. */
const cta = [
  'Save hours. Let AI do the work.',
  'Get better output with less effort.',
  'Start faster. Stay focused.',
  'Let AI handle the heavy lifting.',
] as const;

/** Loading / generating state text. */
const loading = [
  'Generating... nice and easy.',
  'Your lazy AI helper is on it.',
  'Almost there. Stay chill.',
] as const;

/** Empty / waiting state text — shown before user takes action. */
const empty = [
  'Ready when you are.',
  'Let AI handle it.',
  'Start with a prompt. Stay chill.',
  'Nice and easy.',
] as const;

/** Result / output state — shown after generation succeeds. */
const result = [
  'Here you go. That was easy.',
  'All done. Copy and go.',
  'Less effort, better output.',
] as const;

/** Footer brand tagline. */
const footer = [
  'Powered by MoLink Lazy Dino',
  'AI is working. I\'m resting.',
] as const;

/** General-purpose brand hints — safe anywhere. */
const general = [
  'Stay chill.',
  'Nice and easy.',
  'Your lazy AI helper.',
  'Ready when you are.',
  'Less effort, better output.',
] as const;

/** Affiliate CTA helper text — benefit-led, not pushy. */
const affiliate = [
  'Pick the shortcut. Skip the busywork.',
  'Save hours. Let AI do the work.',
  'Get better output with less effort.',
  'Let AI handle the heavy lifting.',
  'Trusted by creators who value their time.',
] as const;

/** Post-generation result guidance — encourage next action. */
const resultGuidance = [
  'Want a faster workflow? Let AI handle the next step.',
  'Try another angle in seconds.',
  'Keep going. Your lazy AI helper is ready.',
  'Turn this into your next caption, bio, or title.',
  'Not quite right? Generate again — it\'s free.',
  'Copy your favorites, then try another tool.',
] as const;

/** Social sharing / traffic handoff copy. */
const social = [
  'Made this in seconds with CreatorAITools.',
  'Less effort, better output. Try it free.',
  'AI did the work. I just clicked generate.',
  'Free AI tools for creators — no signup needed.',
] as const;

/** Homepage brand section copy. */
const homepageBrand = [
  'Work less. Make better content.',
  'Pick a tool. Let AI do the rest.',
  'Your lazy AI helper for captions, bios, titles, and hashtags.',
] as const;

export const brandCopy = {
  hero,
  cta,
  loading,
  empty,
  result,
  footer,
  general,
  affiliate,
  resultGuidance,
  social,
  homepageBrand,
} as const;

export type BrandCopyCategory = keyof typeof brandCopy;
