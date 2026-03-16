# GrowthFactory Production Deployment

## 1. Local startup

```bash
cd /home/uop3364/workspace/growth-factory
npx pnpm install
cp .env.example apps/web/.env.local
npx pnpm --filter web dev
```

Optional local DB:

```bash
docker compose up -d db redis
```

## 2. Environment variables

Set in `apps/web/.env.local` (local) or deployment platform env:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
DATABASE_URL=postgresql://...
```

Notes:
- If `OPENAI_API_KEY` is missing, app automatically falls back to deterministic generator.
- Keep `OPENAI_API_KEY` server-side only.

## 3. Build and start

```bash
cd /home/uop3364/workspace/growth-factory
npx pnpm --filter web build
npx pnpm --filter web start
```

## 4. Vercel deployment (recommended)

1. Import repo/project into Vercel.
2. Set Root Directory to `apps/web`.
3. Add env vars from section 2.
4. Build command: `pnpm build`
5. Output: Next.js default
6. Deploy and verify:
   - `/caption-generator`
   - `/sitemap.xml`
   - `/robots.txt`
   - `/api/internal/health`

## 5. Cloud Run deployment (alternative)

1. Build image from `apps/web/Dockerfile`.
2. Push image to Artifact Registry.
3. Deploy service with env vars from section 2.
4. Configure min instance = 1 (optional, for latency).
5. Attach custom domain and HTTPS.
6. Verify same endpoints as Vercel checklist.
