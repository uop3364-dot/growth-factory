# GA4 Telemetry 設定與驗證手冊

## 1. 已接入方式

GA4 透過 Next.js `<Script>` 元件載入，位於：

- **元件**：`apps/web/src/app/components/GoogleAnalytics.tsx`
- **入口**：`apps/web/src/app/layout.tsx`（root layout）
- **策略**：`afterInteractive`（不阻塞首次渲染）
- **條件**：僅當 `NEXT_PUBLIC_GA_ID` 環境變數存在時才注入 script

## 2. 環境變數

| 變數 | 值 | 說明 |
|------|-----|------|
| `NEXT_PUBLIC_GA_ID` | `G-ZQLV3RZDYN` | GA4 Measurement ID（build-time inline） |

### Vercel 設定

前往 Vercel Dashboard → Project Settings → Environment Variables：

```
Key:          NEXT_PUBLIC_GA_ID
Value:        G-ZQLV3RZDYN
Environments: ✅ Production  ✅ Preview  ✅ Development
```

**注意**：此為 `NEXT_PUBLIC_` 變數，會在 build 時 inline 到 client bundle 中。設定或修改後必須重新部署才會生效。

## 3. Production 驗證命令

### 基本驗證（GA4 script 存在）

```bash
curl -s https://www.creatoraitools.tools/ | grep -E 'G-ZQLV3RZDYN|googletagmanager|gtag'
```

預期輸出應包含：
- `https://www.googletagmanager.com/gtag/js?id=G-ZQLV3RZDYN`
- `gtag('config', 'G-ZQLV3RZDYN')`

### 頁面標題驗證（確認最新版）

```bash
curl -s https://www.creatoraitools.tools/ | grep -oP '(?<=<title>)[^<]+'
```

預期：`CreatorAITools - Free AI Caption Generator for Instagram, TikTok & YouTube`

### HTTP 狀態驗證

```bash
curl -sI https://www.creatoraitools.tools/ | head -5
```

預期：`HTTP/2 200`

## 4. Realtime 驗證

1. 打開 https://analytics.google.com → 選擇 property `G-ZQLV3RZDYN`
2. 左側選單 → **Reports** → **Realtime**
3. 在另一個瀏覽器分頁開啟 https://creatoraitools.tools
4. Realtime 面板應在 30 秒內出現 1 位活躍使用者
5. 若無顯示：
   - 確認無 ad blocker 阻擋 googletagmanager.com
   - 確認 browser console 無 CSP 錯誤
   - 確認 HTML source 中有 gtag script

## 5. 已啟用的事件

### 自動事件（GA4 Enhanced Measurement）

| 事件 | 說明 | 預設啟用 |
|------|------|---------|
| `page_view` | 頁面瀏覽 | ✅ |
| `scroll` | 90% 頁面捲動 | ✅ |
| `click` (outbound) | 外部連結點擊 | ✅ |
| `session_start` | 工作階段開始 | ✅ |
| `first_visit` | 首次造訪 | ✅ |

### 建議新增的自訂事件（下一階段）

| 事件名稱 | 觸發時機 | 參數 |
|----------|---------|------|
| `cta_click` | 使用者點擊 CTA 按鈕 | `cta_id`, `page_path` |
| `affiliate_click` | 使用者點擊聯盟連結 | `affiliate_id`, `provider`, `page_path` |
| `tool_generate` | 使用者成功產生 caption/title/bio | `tool_type`, `platform`, `topic` |
| `tool_copy` | 使用者複製產生結果 | `tool_type`, `content_length` |

實作方式：在對應元件中呼叫 `window.gtag('event', 'tool_generate', { ... })`

## 6. Search Console 最短操作清單

### 已完成（參考 google_search_console_runbook.md）

- [x] 網域驗證：`creatoraitools.tools`
- [x] Sitemap 提交：`sitemap.xml`
- [x] robots.txt 配置
- [x] canonical tags

### 每週例行

- [ ] 檢查 Coverage report（有效頁面數、錯誤數）
- [ ] 檢查搜尋成效（impressions、clicks、CTR、average position）
- [ ] 確認 sitemap 最新日期
- [ ] 檢查 Core Web Vitals

### 月度指標追蹤

| 指標 | 來源 | 目標（30 天） |
|------|------|-------------|
| Total clicks | Search Console | ≥ 1,000（Bronze） |
| Indexed pages | Search Console Coverage | ≥ 300 |
| Keywords in top 30 | Search Console Performance | ≥ 50 |
| GA4 sessions | GA4 Reports | correlate with SC clicks |

## 7. 故障排查

### GA4 script 未出現在 HTML 中

1. 確認 Vercel 環境變數 `NEXT_PUBLIC_GA_ID` 已設定
2. 確認部署版本包含 `GoogleAnalytics.tsx` 元件
3. 確認 layout.tsx 有 `<GoogleAnalytics />` 在 `<body>` 中
4. Redeploy（環境變數是 build-time，不會 hot reload）

### GA4 script 存在但 Realtime 無資料

1. 檢查 browser console 是否有 CSP 或 CORS 錯誤
2. 確認 Measurement ID 正確（`G-ZQLV3RZDYN`）
3. 確認 GA4 property 非 archive 狀態
4. 嘗試 incognito 模式（排除 ad blocker）

### Vercel 部署被取消

1. 前往 https://vercel.com/uop3364-dots-projects/growth-factory-web/settings
2. 檢查 "Pause Deployments" 是否啟用 → 關閉
3. 檢查 Account → Usage → Build Execution Minutes 是否超額
4. 手動點擊最新 deployment 的 "Redeploy" 按鈕
