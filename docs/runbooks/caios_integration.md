# CAIOS Integration Runbook

## Overview

GrowthFactory operates as a **SEO cashflow subsystem** within the CAIOS governance framework.
CAIOS can manage GrowthFactory through internal API endpoints.

## Integration Architecture

```
CAIOS Control Plane
    │
    ├── seo_adapter (in CAIOS)
    │       │
    │       ▼
    │   GrowthFactory Internal API
    │       ├── /api/internal/health
    │       ├── /api/internal/seed-keywords
    │       ├── /api/internal/generate-pages
    │       ├── /api/internal/rebuild-sitemap
    │       └── /api/internal/report-summary
    │
    └── Capital Allocator
            └── seo_agent_budget bucket
```

## Internal API Endpoints

### GET /api/internal/health
Returns service health status.

### GET /api/internal/seed-keywords
Returns current keyword/page candidate data.

### POST /api/internal/seed-keywords
Accepts new keywords to seed into the system.

### POST /api/internal/generate-pages
Triggers page generation for pending candidates.

### POST /api/internal/rebuild-sitemap
Triggers sitemap regeneration.

### GET /api/internal/report-summary
Returns operational summary for CAIOS dashboard.

## CAIOS Adapter Contract

The CAIOS `seo_adapter` should implement:

```python
class SeoAdapter:
    async def health_check(self) -> dict:
        """GET /api/internal/health"""

    async def get_keywords(self) -> dict:
        """GET /api/internal/seed-keywords"""

    async def seed_keywords(self, keywords: list) -> dict:
        """POST /api/internal/seed-keywords"""

    async def trigger_page_generation(self) -> dict:
        """POST /api/internal/generate-pages"""

    async def rebuild_sitemap(self) -> dict:
        """POST /api/internal/rebuild-sitemap"""

    async def get_report(self) -> dict:
        """GET /api/internal/report-summary"""
```

## Budget Integration

GrowthFactory's operational costs are tracked under the `seo_agent_budget` bucket
in the CAIOS Capital Allocation Engine.

## Governance Boundaries

1. GrowthFactory operates independently for page generation and serving
2. CAIOS can monitor via report-summary endpoint
3. Budget allocation changes require CAIOS approval gate
4. New keyword categories can be seeded via CAIOS control plane
5. GrowthFactory does NOT have access to Joseph or other subsystems
