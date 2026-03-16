# GrowthFactory Launch Checklist

## 1. Pre-launch checks

- `npx pnpm install` completed
- `npx pnpm --filter web build` passes
- `/caption-generator` generation works
- Dynamic pages accessible (sample 10+ URLs from each route level)
- `/sitemap.xml` and `/robots.txt` return 200
- `NEXT_PUBLIC_SITE_URL` is production domain
- Affiliate links open correctly with tracking params
- OpenAI key set in production env (or confirm fallback mode for launch)

## 2. Sitemap submission

1. Open Google Search Console.
2. Add property for production domain.
3. Submit `https://your-domain.com/sitemap.xml`.
4. Confirm sitemap status is `Success`.

## 3. Search Console integration

- Verify ownership via DNS TXT.
- Check Coverage/Pages report after first crawl.
- Monitor indexing for `/caption-generator/*` paths.
- Review Enhancements (structured data) warnings.

## 4. First metrics to track

- Organic sessions to `/caption-generator` and dynamic SEO pages
- Index count and valid indexed URLs
- Caption generation API usage count
- CTA click-through rate on affiliate blocks
- Top landing keywords/pages
- Error rate for `/api/generate-captions`

## 5. First-week adjustments

- Day 1-2: fix crawl/index errors from Search Console
- Day 3-4: improve titles/meta for top 20 impression pages
- Day 5: update affiliate copy/position if CTR < target
- Day 6: add internal links on pages with high bounce
- Day 7: review query data and prioritize next 20 page variants
