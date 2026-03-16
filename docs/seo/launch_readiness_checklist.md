# SEO 上線準備清單

## 基礎設施

- [ ] HTTPS 正常（Vercel 自動處理）
- [ ] 自訂網域 `creatoraitools.tools` 已設定
- [ ] `NEXT_PUBLIC_SITE_URL` 設為 `https://creatoraitools.tools`
- [ ] robots.txt 允許爬蟲（`Allow: /`）
- [ ] robots.txt 包含 sitemap 連結
- [ ] sitemap.xml 可正常訪問
- [ ] sitemap 包含所有公開頁面
- [ ] 無 redirect loop

## HTML Meta

- [ ] 每頁都有唯一 `<title>`
- [ ] 每頁都有 `<meta name="description">`
- [ ] 每頁都有 `<link rel="canonical">`
- [ ] canonical 指向正式網域（非 localhost）
- [ ] 無 `<meta name="robots" content="noindex">`
- [ ] Open Graph tags 完整（og:title, og:description, og:url）
- [ ] Twitter Card tags 完整

## 結構化資料

- [ ] 首頁有 WebApplication / SoftwareApplication schema
- [ ] FAQ 頁面有 FAQPage schema
- [ ] 有 BreadcrumbList schema
- [ ] 可用 https://search.google.com/test/rich-results 驗證

## 內容品質

- [ ] 每頁有獨特的 H1
- [ ] 每頁有足夠的獨特文字內容（非僅導航）
- [ ] 內部連結結構完整（相關頁面互連）
- [ ] 無 404 broken links

## 效能

- [ ] Core Web Vitals 通過（LCP < 2.5s, FID < 100ms, CLS < 0.1）
- [ ] 行動裝置友善
- [ ] 頁面載入速度合理

## Google Search Console

- [ ] 已驗證網域所有權
- [ ] 已提交 sitemap.xml
- [ ] 已對首頁要求建立索引
- [ ] Coverage report 無錯誤

## 每日自動擴頁

- [ ] GitHub Actions workflow 已啟用
- [ ] 每日排程正常（UTC 04:00）
- [ ] 擴頁腳本可正常執行
- [ ] 自動 commit + push 可觸發 Vercel redeploy
