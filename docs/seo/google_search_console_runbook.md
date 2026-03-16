# Google Search Console 操作手冊

## 首次設定

### 1. 驗證網域所有權

1. 前往 https://search.google.com/search-console
2. 新增資源 → URL prefix → `https://creatoraitools.tools`
3. 驗證方式（擇一）：
   - **推薦**：HTML tag（在 layout.tsx 的 metadata 中加入）
   - DNS TXT record
   - HTML file upload

### 2. 提交 Sitemap

1. 左側選單 → Sitemaps
2. 新增 sitemap URL：`sitemap.xml`
3. 完整 URL：`https://creatoraitools.tools/sitemap.xml`
4. 點擊「提交」
5. 狀態應顯示「成功」

### 3. 要求索引首頁

1. 上方搜尋列輸入：`https://creatoraitools.tools/`
2. 等待檢查結果
3. 點擊「要求建立索引」
4. 等待確認訊息

## 日常檢查

### 檢查收錄狀態

1. 左側選單 → 涵蓋範圍（Coverage）
2. 確認：
   - 「有效」頁面數量持續增加
   - 「錯誤」為 0
   - 「警告」檢視是否有 redirect 問題
   - 「已排除」檢視原因（可能是 canonical 或 noindex）

### 檢查特定頁面

1. 上方搜尋列輸入完整 URL
2. 檢查：
   - 「網頁可供 Google 使用」= 已收錄
   - robots.txt 是否阻擋
   - canonical URL 是否正確
   - 是否有 noindex

### 每週例行

- [ ] 檢查 Coverage report 有無新錯誤
- [ ] 確認 sitemap 已更新（日期應為最近）
- [ ] 檢查 Core Web Vitals（效能 → Core Web Vitals）
- [ ] 檢視搜尋成效報告（曝光次數、點擊次數趨勢）

## 常見問題排查

### 頁面未被索引

1. 檢查 robots.txt 是否 Allow
2. 檢查 HTML 是否有 `<meta name="robots" content="noindex">`
3. 檢查 canonical tag 是否指向正確 URL
4. 檢查該頁是否在 sitemap 中
5. 手動「要求建立索引」

### Sitemap 提交失敗

1. 確認 `https://creatoraitools.tools/sitemap.xml` 可正常打開
2. 確認 XML 格式正確
3. 確認 robots.txt 中有 `Sitemap: https://creatoraitools.tools/sitemap.xml`

### 收錄速度慢

正常時間線：
- 首頁：幾分鐘 ~ 幾小時
- 開始收錄：1-3 天
- 大量頁面索引：1-4 週
- 完全索引 400+ 頁：2-8 週

加速方法：
1. 確保 sitemap 已提交
2. 手動要求索引重要頁面
3. 確保內部連結結構完整
4. 避免 thin content（每頁應有獨特內容）
