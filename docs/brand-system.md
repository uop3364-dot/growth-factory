# MoLink Lazy Dino — Brand System Guide

Internal reference for the brand presentation layer on CreatorAITools.

## Mascot Master Asset

| Item | Path |
|------|------|
| **Production PNG** | `public/brand/mascot-master.png` |
| **SVG fallback** | `src/components/brand/MascotSvg.tsx` (inline) |
| **Image component** | `src/components/brand/MascotImage.tsx` |

### When to use MascotImage vs MascotSvg

- **Always use `MascotImage`** in production code. It renders the master PNG when available, falls back to SVG automatically.
- **Use `MascotSvg` directly** only for development/testing or if you explicitly need vector rendering.
- `MascotImage` accepts a `forceSvg` prop to override when needed.

### How to swap in a new official mascot image

1. Place the final PNG at `public/brand/mascot-master.png`
2. In `src/components/brand/MascotImage.tsx`, set `MASTER_ASSET_READY = true`
3. No other code changes needed — all components go through MascotImage

## Microcopy Registry

All brand helper text lives in one file:

```
src/lib/brandCopy.ts
```

Categories: `hero`, `cta`, `loading`, `empty`, `result`, `footer`, `general`.

**Rules:**
- English only
- Tone: calm, lazy, light, slightly playful, credible
- Never hardcode brand microcopy strings in page files — import from `brandCopy`

## Brand Components

All in `src/components/brand/`:

| Component | Purpose |
|-----------|---------|
| `MascotImage` | Primary mascot renderer (PNG → SVG fallback) |
| `MascotSvg` | Inline SVG fallback only |
| `MascotBadge` | Small mascot near headings |
| `MascotHint` | Speech bubble + microcopy |
| `MascotCTA` | CTA wrapper with helper line + mascot |
| `EmptyStateMascot` | Waiting/idle state |
| `ResultFrame` | Visual wrapper for output |
| `BrandHero` | Hero section wrapper |
| `ToolPageLayout` | Full tool page layout |
| `ToolSurface` | Content section container |

Import from barrel: `import { ToolPageLayout, MascotImage } from '@/components/brand'`

## MascotCTA Usage

`MascotCTA` supports two presentation layers:

```tsx
<MascotCTA showHelper helperText="Save hours. Let AI do the work.">
  <button>Generate Now</button>
</MascotCTA>
```

1. **helperText** — benefit-led conversion line (defaults to `brandCopy.cta[0]`)
2. **Mascot visual** — decorative companion on the side

Set `showHelper={true}` to enable the helper line. It is off by default.

## How New Tool Pages Inherit the Brand Layer

Every tool page **must** use `ToolPageLayout`:

```tsx
import { ToolPageLayout } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';

export default function NewToolPage() {
  return (
    <ToolPageLayout
      scripts={<>{/* JSON-LD scripts */}</>}
      heroClassName="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12"
      heroHint={brandCopy.hero[0]}
      heroContent={
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>...</h1>
          <p>...</p>
          <HeroCTA ... />
        </div>
      }
    >
      {/* Generator + AffiliateCTA + FAQ + etc. */}
    </ToolPageLayout>
  );
}
```

This automatically provides:
- Branded hero with mascot hint
- Consistent spacing via ToolSurface
- Brand design tokens (shadows, radius, colors)

## Design Tokens

Defined in `tailwind.config.ts` under `theme.extend`:

- **Colors**: `brand-green`, `brand-blush`, `brand-outline`, `brand-cream`, `brand-surface`
- **Radius**: `rounded-brand`, `rounded-brand-lg`, `rounded-brand-xl`
- **Shadows**: `shadow-brand`, `shadow-brand-md`, `shadow-brand-hover`
- **Animations**: `animate-brand-bounce`, `animate-brand-fade-in`, `animate-brand-pulse`, `animate-brand-breathe`

CSS utility classes in `globals.css`:
- `.brand-surface` — card style
- `.brand-btn-generate` — enhanced button hover/active
- `.brand-hint-bubble` — microcopy bubble

## Checklist for New Pages

- [ ] Uses `ToolPageLayout`
- [ ] Hero hint comes from `brandCopy`
- [ ] Loading text uses `brandCopy.loading[n]`
- [ ] Empty state uses `EmptyStateMascot`
- [ ] Results wrapped in `ResultFrame`
- [ ] Generate button has `brand-btn-generate` class
- [ ] No hardcoded brand microcopy strings
