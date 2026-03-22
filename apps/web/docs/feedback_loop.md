# Feedback Loop — Tool Result Feedback + CTA Conversion

## Purpose

Minimal closed-loop feedback system placed below every tool's generated results.
Captures user sentiment (yes/no), optional text feedback, and CTA click-through data.

## Data Flow

```
User generates result
  → ResultFeedbackCard renders below results
  → User clicks 👍 Yes or 👎 No
  → POST /api/tool-feedback → in-memory store + PostgreSQL (best-effort)
  → Thank-you message shown + CTA block displayed
  → User clicks CTA link
  → POST /api/tool-feedback/cta-click → updates feedback record
  → User redirected to affiliate/product link
```

## Data Model

Table: `tool_feedback`

| Column       | Type     | Description                              |
|-------------|----------|------------------------------------------|
| id          | cuid     | Primary key                              |
| tool_slug   | string   | Tool identifier (e.g. "title-generator") |
| route_path  | string   | Page URL path                            |
| sentiment   | string   | "yes" or "no"                            |
| message     | text?    | Optional user text                       |
| cta_shown   | boolean  | Whether CTA block was displayed          |
| cta_clicked | boolean  | Whether any CTA was clicked              |
| cta_target  | string?  | Which CTA: "vidiq", "title_pack", etc.   |
| session_id  | string?  | Anonymous session identifier             |
| user_agent  | text?    | Browser user-agent                       |
| created_at  | datetime | Timestamp                                |
| updated_at  | datetime | Auto-updated                             |

Indexes: `tool_slug`, `sentiment`, `created_at`

## API Endpoints

### POST /api/tool-feedback

Create a feedback record.

```json
{
  "toolSlug": "title-generator",
  "routePath": "/title-generator",
  "sentiment": "yes",
  "message": "optional text",
  "ctaShown": true
}
```

Response: `{ "success": true, "id": "tf_..." }`

### POST /api/tool-feedback/cta-click

Record a CTA click against an existing feedback.

```json
{
  "feedbackId": "tf_...",
  "target": "vidiq"
}
```

Valid targets: `vidiq`, `title_pack`, `metricool`

Response: `{ "success": true }`

### GET /api/internal/tool-feedback-stats

Internal-only. Returns aggregate stats.

```json
{
  "source": "db",
  "totalYes": 42,
  "totalNo": 8,
  "totalWithMessage": 12,
  "totalCtaClicked": 15,
  "ctaByTarget": { "vidiq": 12, "title_pack": 3 },
  "byTool": {
    "title-generator": { "yes": 20, "no": 3 },
    "caption-generator": { "yes": 22, "no": 5 }
  }
}
```

## CTA Tracking

- VidIQ: affiliate link via `getAffiliateLink('vidiq')` + UTM params
- Viral Title Pack: configurable via `NEXT_PUBLIC_TITLE_PACK_URL` env var
  - If not set, that CTA is hidden (no dead links)
- Every CTA click fires `POST /api/tool-feedback/cta-click` before navigation
- Analytics events: `tool_feedback`, `feedback_cta_click`

## Querying Data

Without a dashboard, use these approaches:

1. **Internal endpoint**: `GET /api/internal/tool-feedback-stats`
2. **Direct DB query**:
   ```sql
   -- Sentiment breakdown by tool
   SELECT tool_slug, sentiment, COUNT(*) FROM tool_feedback GROUP BY 1, 2;

   -- CTA conversion rate
   SELECT sentiment, COUNT(*) FILTER (WHERE cta_clicked) as clicked,
          COUNT(*) as total FROM tool_feedback GROUP BY 1;

   -- Recent feedback with messages
   SELECT * FROM tool_feedback WHERE message IS NOT NULL ORDER BY created_at DESC LIMIT 20;
   ```

## Rollback

1. Remove `ResultFeedbackCard` from generators (revert import + JSX lines)
2. Remove export from `src/components/brand/index.ts`
3. Delete: `src/components/brand/ResultFeedbackCard.tsx`
4. Delete: `src/app/api/tool-feedback/` (both route.ts and cta-click/route.ts)
5. Delete: `src/app/api/internal/tool-feedback-stats/route.ts`
6. Remove `ToolFeedback` model from `prisma/schema.prisma`
7. Run `npx prisma migrate dev` to sync schema (or drop table: `DROP TABLE tool_feedback;`)

No other files are affected. The feedback system is fully additive.
