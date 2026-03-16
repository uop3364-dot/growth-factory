#!/usr/bin/env bash
# Ping search engines to notify them of sitemap updates.
# Usage: ./scripts/ping-search-engines.sh
# Note: Google deprecated the ping endpoint in 2023, but Bing still supports it.
# The primary way to notify Google is via Search Console.

set -euo pipefail

SITEMAP_URL="https://creatoraitools.tools/sitemap.xml"

echo "=== Search Engine Sitemap Ping ==="

# Google (deprecated but harmless)
echo -n "Pinging Google... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP_URL" 2>/dev/null || echo "failed")
echo "$HTTP_CODE"

# Bing (still supported)
echo -n "Pinging Bing... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.bing.com/ping?sitemap=$SITEMAP_URL" 2>/dev/null || echo "failed")
echo "$HTTP_CODE"

echo ""
echo "For Google, use Search Console: https://search.google.com/search-console"
echo "Submit sitemap at: Sitemaps > Add a new sitemap > sitemap.xml"
