#!/usr/bin/env bash
# verify-seo-workflow.sh — Pre-flight checks for Daily SEO Page Generation
# Usage: bash scripts/verify-seo-workflow.sh
# Exit code 0 = all checks pass, non-zero = failure with details
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_SRC="$REPO_ROOT/apps/web/src"
ERRORS=0

echo "=== SEO Workflow Verification ==="
echo ""

# --- Check 1: Critical import targets exist ---
echo "[1/4] Checking critical import targets..."

# Extract @/ imports from key entry files, resolve to filesystem paths
CRITICAL_FILES=(
  # page.tsx imports
  "$WEB_SRC/components/FAQ.tsx"
  "$WEB_SRC/components/HomeAffiliate.tsx"
  "$WEB_SRC/components/ToolCrossSell.tsx"
  "$WEB_SRC/components/AffiliateCTA.tsx"
  "$WEB_SRC/lib/jsonld.ts"
  "$WEB_SRC/lib/metadata.ts"
  # AffiliateCTA.tsx imports
  "$WEB_SRC/lib/analytics.ts"
  "$WEB_SRC/lib/affiliate-links.ts"
  # SEO expansion script
  "$REPO_ROOT/scripts/expand-seo-pages.ts"
)

for f in "${CRITICAL_FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "  FAIL: missing $f"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "  OK: all ${#CRITICAL_FILES[@]} critical files exist"
fi

# --- Check 2: Critical files are tracked by git ---
echo "[2/4] Checking git tracking status..."

TRACKED_ERRORS=0
for f in "${CRITICAL_FILES[@]}"; do
  if [ -f "$f" ]; then
    REL="${f#$REPO_ROOT/}"
    if ! git -C "$REPO_ROOT" ls-files --error-unmatch "$REL" >/dev/null 2>&1; then
      echo "  FAIL: $REL exists but is NOT tracked by git (will be missing in CI)"
      ERRORS=$((ERRORS + 1))
      TRACKED_ERRORS=$((TRACKED_ERRORS + 1))
    fi
  fi
done

if [ $TRACKED_ERRORS -eq 0 ]; then
  echo "  OK: all critical files are git-tracked"
fi

# --- Check 3: tsconfig.json has @/* alias ---
echo "[3/4] Checking tsconfig path alias..."

TSCONFIG="$REPO_ROOT/apps/web/tsconfig.json"
if [ ! -f "$TSCONFIG" ]; then
  echo "  FAIL: $TSCONFIG not found"
  ERRORS=$((ERRORS + 1))
elif ! grep -q '"@/\*"' "$TSCONFIG"; then
  echo "  FAIL: tsconfig.json missing @/* path alias"
  ERRORS=$((ERRORS + 1))
else
  echo "  OK: @/* alias configured"
fi

# --- Check 4: Workflow working-directory sanity ---
echo "[4/4] Checking workflow working-directory..."

WORKFLOW="$REPO_ROOT/.github/workflows/daily-seo-generation.yml"
if [ ! -f "$WORKFLOW" ]; then
  echo "  FAIL: workflow file not found"
  ERRORS=$((ERRORS + 1))
else
  WD_ERRORS=0
  # pnpm install must NOT have working-directory (runs at root)
  if grep -A2 "Install dependencies" "$WORKFLOW" | grep -q "working-directory"; then
    echo "  FAIL: 'Install dependencies' step should not have working-directory (monorepo root install)"
    ERRORS=$((ERRORS + 1))
    WD_ERRORS=$((WD_ERRORS + 1))
  fi
  # Expand SEO pages must NOT have working-directory (script at root)
  if grep -A2 "Expand SEO pages" "$WORKFLOW" | grep -q "working-directory"; then
    echo "  FAIL: 'Expand SEO pages' step should not have working-directory (script at repo root)"
    ERRORS=$((ERRORS + 1))
    WD_ERRORS=$((WD_ERRORS + 1))
  fi
  if [ $WD_ERRORS -eq 0 ]; then
    echo "  OK: workflow working-directory settings correct"
  fi
fi

# --- Summary ---
echo ""
if [ $ERRORS -gt 0 ]; then
  echo "FAILED: $ERRORS error(s) found. Fix before pushing."
  exit 1
else
  echo "PASSED: all checks OK"
  exit 0
fi
