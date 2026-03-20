# Incident Report: Daily SEO Page Generation Build Failure

**Date:** 2026-03-17 ~ 2026-03-20 (4 consecutive days)
**Severity:** High — daily SEO pipeline fully blocked
**Status:** Resolved

## Symptoms

- GitHub Actions "Daily SEO Page Generation" workflow failed every run
- Error 1: `Module not found: Can't resolve '@/lib/...'` in `AffiliateCTA.tsx`
- Error 2: `Module not found: Can't resolve '@/components/...'` in `page.tsx`
- Error 3 (hidden by Error 1/2): `Cannot find module 'scripts/expand-seo-pages.ts'` — wrong working-directory

## Root Causes

### RC1: Untracked source files (PRIMARY)
Two files existed locally but were never `git add`/`git commit`:
- `apps/web/src/components/HomeAffiliate.tsx` — imported by `page.tsx`
- `apps/web/src/lib/affiliate-links.ts` — imported by `AffiliateCTA.tsx`

CI checkout didn't have them → Next.js build failed on module resolution.

### RC2: Wrong `working-directory` for `pnpm install`
Workflow ran `pnpm install` with `working-directory: apps/web`. In a pnpm monorepo, install must run at repo root to resolve workspace dependencies.

### RC3: Wrong `working-directory` for Expand SEO pages
`scripts/expand-seo-pages.ts` lives at repo root. The step had `working-directory: apps/web`, causing `ERR_MODULE_NOT_FOUND`.

## Fix Commits

| Commit | Description |
|--------|-------------|
| `50aacc1` | Add missing files + baseUrl to tsconfig + fix pnpm install path |
| `371f1d2` | Remove wrong working-directory from Expand SEO pages step |

## Verification

- GitHub Actions run `23339788600` — all steps green (45s)
- Local: `npx pnpm --filter web build` — 933 pages, 0 errors

## Rollback

```bash
git revert 371f1d2 50aacc1
```

## Prevention Measures

1. **CI pre-build check** — `Verify critical imports` step added to workflow, runs before build
2. **Local verify script** — `scripts/verify-seo-workflow.sh` + `pnpm run verify:seo-workflow`
3. **Script checks:** import target existence, workflow working-directory sanity, tsconfig alias config
