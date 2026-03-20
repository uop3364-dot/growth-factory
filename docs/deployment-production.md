# Production Deployment Runbook

## Configuration

| Item | Value |
|------|-------|
| **Production branch** | `master` |
| **Vercel project** | `growth-factory-web` |
| **Vercel team** | `uop3364-dots-projects` |
| **Linked repo** | `github.com:uop3364-dot/growth-factory.git` |
| **Build root** | `apps/web` (monorepo) |
| **Framework** | Next.js 15 |
| **Build command** | `npm run build` (includes `next-sitemap` postbuild) |
| **Output directory** | `.next` (default) |
| **Node version** | 24.x |
| **Domain** | `creatoraitools.tools` + `www.creatoraitools.tools` |

## How Deploys Work

1. Push to `master` triggers an automatic Vercel production deploy.
2. Push to any other branch triggers a preview deploy only.
3. CLI deploys via `npx vercel --prod` also work but bypass git integration.

## After Every Push to Master

Verify within 2–3 minutes:

1. Check Vercel dashboard or `npx vercel ls --prod` — latest deploy should be **Ready**
2. Visit `https://creatoraitools.tools/api/internal/health` — `sha` field should match the commit
3. Visit homepage — footer shows `v<sha>` matching the pushed commit

## Post-Deploy Checklist

- [ ] Homepage loads, brand section visible ("Work less. Make better content.")
- [ ] Mascot image renders (mascot-master.png in nav + footer)
- [ ] Affiliate CTA visible (vidIQ + Metricool)
- [ ] Caption generator: generate flow works, results appear
- [ ] At least one dynamic SEO page loads (e.g. `/caption-generator/instagram/travel/funny`)
- [ ] `https://creatoraitools.tools/sitemap.xml` responds
- [ ] `https://creatoraitools.tools/robots.txt` responds
- [ ] Health endpoint: `https://creatoraitools.tools/api/internal/health` returns correct SHA

## Force Redeploy

If auto-deploy fails or is stale:

```bash
cd /home/uop3364/workspace/growth-factory/apps/web
npx vercel --prod --yes
```

## Rollback

```bash
# Find the last known good deploy
npx vercel ls --prod

# Promote a previous deployment
npx vercel promote <deployment-url>
```

## Common Build Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Type error on vitest/testing-library | Test files included in tsconfig | Ensure `tsconfig.json` excludes `src/__tests__`, `**/*.test.tsx`, `vitest.config.ts` |
| Deploy canceled | Superseded by newer push | Normal — only latest matters |
| Deploy errored | Build failure | Check `npx vercel inspect <url>` and build logs |
| Domain shows old content | Production deploy stale | Force redeploy with `npx vercel --prod` |

## Branch Discipline

- Only approved changes go to `master`
- `master` always auto-deploys to production
- Feature/experiment branches are preview-only — never assume they're live
- Never force-push `master`

## Environment Variables

Managed via Vercel dashboard or CLI. Current production env:

| Variable | Scope |
|----------|-------|
| `NEXT_PUBLIC_GA_ID` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview, Development |
| `VERCEL_GIT_COMMIT_SHA` | Auto-injected by Vercel |
