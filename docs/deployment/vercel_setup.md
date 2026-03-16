# Vercel 部署設定指南

## 專案結構

```
growth-factory/          ← monorepo 根目錄
├── apps/web/            ← Next.js 主站 (Vercel 部署目標)
├── apps/worker/         ← Python worker (不部署到 Vercel)
├── packages/seo-core/   ← 共用 SEO 套件
└── packages/shared-types/ ← 共用型別
```

## Vercel Dashboard 設定

### 匯入 GitHub Repo

1. 前往 https://vercel.com/new
2. 選擇 GitHub repo: `growth-factory`
3. **Root Directory**: `apps/web`（重要！不要留空）
4. **Framework Preset**: Next.js（自動偵測）
5. **Build Command**: `npm run build`（會自動觸發 postbuild 產生 sitemap）

### 環境變數

在 Vercel Dashboard → Settings → Environment Variables 設定：

| 變數名稱 | 值 | 環境 |
|----------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://creatoraitools.tools` | Production |

### 自訂網域

1. Vercel Dashboard → Settings → Domains
2. 新增 `creatoraitools.tools`
3. 依照指示在 DNS 設定 CNAME 或 A record
4. Vercel 會自動處理 HTTPS / SSL 憑證

## 自動部署

- 每次 push 到 `master` 分支 → Vercel 自動觸發 Production 部署
- PR 會產生 Preview 部署
- GitHub Actions 每日 SEO 擴頁 → push → 自動 redeploy

## 手動部署

如果需要手動觸發部署：

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 連結專案
cd /path/to/growth-factory
vercel link

# 部署
vercel --prod
```

## 疑難排解

### Build 失敗
```bash
cd apps/web && npm run build
```
先在本地確認 build 成功再 push。

### Root Directory 設錯
Vercel Dashboard → Settings → General → Root Directory 改為 `apps/web`

### 環境變數未設定
若 `NEXT_PUBLIC_SITE_URL` 未設定，sitemap 和 canonical URL 會用 localhost，影響 SEO。
