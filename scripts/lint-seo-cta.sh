#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# lint-seo-cta.sh — Build-time guard for affiliate CTA compliance
#
# Checks:
#  1. Every SEO page file imports AffiliateCTA (or HomeAffiliate for homepage)
#  2. No page file contains forbidden provider keywords (Canva/Jasper hardcode)
#  3. No page file hardcodes affiliate URLs directly
#
# Usage:
#   bash scripts/lint-seo-cta.sh         # exits 0 on pass, 1 on fail
#   npm run lint:cta                      # via package.json
# ─────────────────────────────────────────────────────────────
set -euo pipefail

WEB_SRC="apps/web/src"
ERRORS=0

# ── Locate all SEO page files ──
# caption-generator (all levels), title-generator, hashtag-generator, bio-generator
SEO_PAGES=$(find "$WEB_SRC/app/caption-generator" \
                 "$WEB_SRC/app/title-generator" \
                 "$WEB_SRC/app/hashtag-generator" \
                 "$WEB_SRC/app/bio-generator" \
                 -name 'page.tsx' 2>/dev/null)

# Also check homepage
SEO_PAGES="$SEO_PAGES
$WEB_SRC/app/page.tsx"

echo "=== SEO CTA Lint Check ==="
echo ""

# ── Check 1: Every SEO page imports AffiliateCTA or HomeAffiliate ──
echo "Check 1: AffiliateCTA import presence"
while IFS= read -r page; do
  [ -z "$page" ] && continue
  if ! grep -qE "import.*(AffiliateCTA|HomeAffiliate)" "$page"; then
    echo "  FAIL: $page — missing AffiliateCTA or HomeAffiliate import"
    ERRORS=$((ERRORS + 1))
  fi
done <<< "$SEO_PAGES"
[ "$ERRORS" -eq 0 ] && echo "  PASS: All SEO pages import AffiliateCTA"

# ── Check 2: No forbidden provider names in CTA-like context ──
echo ""
echo "Check 2: No forbidden affiliate providers in page files"
FORBIDDEN_PATTERNS="Try Canva|Try Jasper|Try TubeBuddy|Try OpusClip|Try Descript|Try Pictory"
while IFS= read -r page; do
  [ -z "$page" ] && continue
  if grep -qE "$FORBIDDEN_PATTERNS" "$page"; then
    echo "  FAIL: $page — contains forbidden affiliate CTA text"
    grep -n -E "$FORBIDDEN_PATTERNS" "$page" | head -3
    ERRORS=$((ERRORS + 1))
  fi
done <<< "$SEO_PAGES"
[ "$ERRORS" -eq 0 ] && echo "  PASS: No forbidden provider CTAs found"

# ── Check 3: No hardcoded affiliate URLs in page files ──
echo ""
echo "Check 3: No hardcoded affiliate URLs in page files"
# Affiliate URLs should only live in affiliate-links.ts, never in page files
HARDCODED_URL_PATTERNS="vidiq\.com/molinkai|f\.mtr\.cool/Molink|canva\.com.*affiliate|tubebuddy\.com.*affiliate"
while IFS= read -r page; do
  [ -z "$page" ] && continue
  # Skip the config file itself
  [[ "$page" == *"affiliate-links"* ]] && continue
  if grep -qE "$HARDCODED_URL_PATTERNS" "$page"; then
    echo "  FAIL: $page — contains hardcoded affiliate URL (use AffiliateCTA component instead)"
    grep -n -E "$HARDCODED_URL_PATTERNS" "$page" | head -3
    ERRORS=$((ERRORS + 1))
  fi
done <<< "$SEO_PAGES"
[ "$ERRORS" -eq 0 ] && echo "  PASS: No hardcoded affiliate URLs in page files"

# ── Check 4: affiliate-links.ts only contains whitelisted providers ──
echo ""
echo "Check 4: Whitelist integrity in affiliate-links.ts"
LINKS_FILE="$WEB_SRC/lib/affiliate-links.ts"
if grep -q "ALLOWED_PROVIDERS" "$LINKS_FILE"; then
  echo "  PASS: ALLOWED_PROVIDERS whitelist exists"
else
  echo "  FAIL: $LINKS_FILE missing ALLOWED_PROVIDERS whitelist"
  ERRORS=$((ERRORS + 1))
fi

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "=== FAILED: $ERRORS issue(s) found ==="
  exit 1
else
  echo "=== PASSED: All SEO CTA checks OK ==="
  exit 0
fi
