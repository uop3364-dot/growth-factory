#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_DIR="$REPO_ROOT/apps/web"
TODAY=$(date +%Y-%m-%d)

echo "=== Daily SEO Generation Job - $TODAY ==="

# Step 1: Expand SEO pages (add new topics/tones from queue)
echo "[1/6] Expanding SEO pages..."
cd "$REPO_ROOT"
if command -v npx &>/dev/null; then
  npx tsx scripts/expand-seo-pages.ts --topics 3 --tones 1
else
  echo "ERROR: npx not found. Install Node.js first."
  exit 1
fi

# Step 2: Install dependencies (in case new ones added)
echo "[2/6] Installing dependencies..."
cd "$WEB_DIR"
if command -v pnpm &>/dev/null; then
  pnpm install --frozen-lockfile 2>/dev/null || pnpm install
else
  npm install
fi

# Step 3: Build
echo "[3/6] Building..."
npm run build
BUILD_EXIT=$?
if [ $BUILD_EXIT -ne 0 ]; then
  echo "ERROR: Build failed with exit code $BUILD_EXIT. Stopping pipeline."
  exit 1
fi

# Step 4: Validate sitemap and robots
echo "[4/6] Validating sitemap and robots..."
if [ ! -f "$WEB_DIR/public/sitemap.xml" ]; then
  echo "ERROR: sitemap.xml not found after build"
  exit 1
fi
if [ ! -f "$WEB_DIR/public/robots.txt" ]; then
  echo "ERROR: robots.txt not found after build"
  exit 1
fi
SITEMAP_URLS=$(grep -c '<url>' "$WEB_DIR/public/sitemap-0.xml" 2>/dev/null || echo "0")
echo "  sitemap.xml: OK"
echo "  robots.txt: OK"
echo "  Total URLs in sitemap: $SITEMAP_URLS"

# Step 5: Git commit (only if there are changes)
echo "[5/6] Checking for changes..."
cd "$REPO_ROOT"
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "  No changes detected. Skipping commit."
else
  git add -A
  git commit -m "feat(seo): daily SEO page expansion $TODAY

Added new pages via automated expansion pipeline.
Sitemap URLs: $SITEMAP_URLS

Co-Authored-By: GrowthFactory Bot <bot@creatoraitools.tools>"
  echo "  Committed changes."
fi

# Step 6: Push (only if remote exists)
echo "[6/6] Pushing to remote..."
if git remote get-url origin &>/dev/null; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  git push origin "$BRANCH"
  echo "  Pushed to origin/$BRANCH"
else
  echo "  WARNING: No remote 'origin' configured. Skipping push."
  echo "  To set up: git remote add origin <repo_url> && git push -u origin master"
fi

echo ""
echo "=== Daily SEO Generation Complete - $TODAY ==="
echo "  URLs in sitemap: $SITEMAP_URLS"
echo "  Next step: Vercel will auto-redeploy on push"
