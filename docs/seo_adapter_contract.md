# SEO Adapter Contract

## Version: 0.1.0

## Purpose
This document defines the API contract between CAIOS and GrowthFactory.
The CAIOS `seo_adapter` module should implement this contract.

## Base URL
Default: `http://localhost:3000`
Configurable via `SEO_SERVICE_URL` environment variable in CAIOS.

## Endpoints

### Health Check
- **GET** `/api/internal/health`
- Response: `{ status: "ok", service: "growth-factory-web", version: "0.1.0", timestamp: "ISO8601" }`

### Seed Keywords
- **GET** `/api/internal/seed-keywords` - List current keywords
- **POST** `/api/internal/seed-keywords` - Add new keywords
- Request body: `{ keywords: string[] }`
- Response: `{ status: "accepted" }`

### Generate Pages
- **POST** `/api/internal/generate-pages`
- Response: `{ status: "ok", totalPages: number }`

### Rebuild Sitemap
- **POST** `/api/internal/rebuild-sitemap`
- Response: `{ status: "ok", sitemapUrl: "/sitemap.xml" }`

### Report Summary
- **GET** `/api/internal/report-summary`
- Response: Full operational report including page counts, monetization status, indexing status

## Authentication
Currently: None (internal network only)
Future: Bearer token via `X-Internal-Token` header
