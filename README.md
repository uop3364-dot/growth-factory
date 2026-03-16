# GrowthFactory SEO MVP

AI-powered tool website for social media creators. Programmatic SEO system generating caption, title, and bio generators with hundreds of long-tail pages.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose (for PostgreSQL)
- Python 3.11+ (for worker, optional)

### 1. Setup

```bash
cd growth-factory

# Install dependencies
pnpm install

# Start database
docker compose up -d db

# Copy environment file
cp .env.example apps/web/.env.local
```

### 2. Run Development Server

```bash
pnpm dev
# or
make dev
```

Visit http://localhost:3000

### 3. Available Pages

- `/` - Homepage
- `/caption-generator` - Main caption generator tool
- `/caption-generator/{platform}` - Platform-specific (instagram, tiktok, youtube, x, facebook)
- `/caption-generator/{platform}/{topic}` - Topic-specific (travel, food, fitness, etc.)
- `/caption-generator/{platform}/{topic}/{tone}` - Tone-specific (funny, cute, professional, etc.)
- `/title-generator` - Coming soon
- `/bio-generator` - Coming soon
- `/api/internal/health` - CAIOS internal health endpoint
- `/api/internal/seed-keywords` - CAIOS internal seed endpoint (GET/POST)
- `/api/internal/generate-pages` - CAIOS internal generation endpoint (POST)
- `/api/internal/rebuild-sitemap` - CAIOS internal sitemap rebuild endpoint (POST)
- `/api/internal/report-summary` - CAIOS internal summary endpoint (GET)
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - Auto-generated robots.txt

### Total Programmatic Pages: 405+

- 5 platform pages
- 50 platform+topic pages
- 350 platform+topic+tone pages
- 4 static pages (home, caption-gen, title-gen, bio-gen)

## How to Generate More Pages

### Add New Platforms/Topics/Tones
Edit `apps/web/src/lib/seo-data.ts` and add entries to the PLATFORMS, TOPICS, or TONES arrays plus their corresponding INFO objects.

### Scale to 1000+ Pages
Add more topics (e.g., "education", "photography", "music", "parenting") or add new tool types (title-generator, bio-generator) with similar programmatic routing.

## How to Connect Real LLM

1. Set `LLM_PROVIDER=openai` or `LLM_PROVIDER=anthropic` in `.env.local`
2. Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
3. Modify `src/lib/caption-generator.ts` to call the LLM API when provider is not "mock"

## How to Add Ads & Affiliate Links

1. **Google AdSense**: Set `NEXT_PUBLIC_ADSENSE_ID` in `.env.local`, update `AdPlaceholder` component
2. **Affiliate Links**: Replace placeholder links in `AffiliateCTA` component with real affiliate URLs
3. **Premium Plans**: Implement Stripe checkout on the premium plan placeholder

## How to Connect CAIOS

See `docs/runbooks/caios_integration.md` for the full integration guide.

1. Set `SEO_SERVICE_URL=http://growth-factory-host:3000` in CAIOS config
2. Implement the adapter from `docs/seo_adapter_contract.md`
3. Wire into CAIOS control plane NL intents

## Project Structure

```
growth-factory/
├── apps/
│   ├── web/          # Next.js 14 web application
│   └── worker/       # Python worker for batch operations
├── packages/
│   ├── seo-core/     # Shared SEO utilities
│   └── shared-types/ # TypeScript type definitions
├── infra/            # Infrastructure configs
├── docs/             # Documentation & runbooks
├── data/             # Generated data files
└── scripts/          # Utility scripts
```

## Commands

| Command | Description |
|---------|-------------|
| `make setup` | Initial setup (db + install) |
| `make dev` | Start dev server |
| `make build` | Production build |
| `make db-up` | Start PostgreSQL |
| `make worker` | Run Python worker |
| `make seed` | Generate page candidates |
| `make test` | Run all tests |

## Local Verification Checklist

```bash
# 1) install
pnpm install

# 2) start infra
docker compose up -d db redis

# 3) run app
pnpm dev

# 4) run tests
pnpm test
```

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, App Router
- **Database**: PostgreSQL, Prisma
- **Worker**: Python 3.11
- **Infrastructure**: Docker Compose
- **Package Manager**: pnpm

## TODO

- [ ] Connect real LLM API for caption generation
- [ ] Implement Google AdSense integration
- [ ] Add real affiliate links
- [ ] Connect Google Search Console for index monitoring
- [ ] Add Google Analytics
- [ ] Implement premium subscription (Stripe)
- [ ] Build title-generator pages
- [ ] Build bio-generator pages
- [ ] Add blog skeleton with SEO articles
- [ ] Connect to CAIOS via seo_adapter
- [ ] Add A/B testing for CTAs
- [ ] Deploy to production (Vercel / Cloud Run)
