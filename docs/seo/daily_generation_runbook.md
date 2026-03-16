# 每日 SEO 頁面自動生成 — 操作手冊

## 系統概覽

每日自動從擴展佇列中取出新的 topics 和 tones，生成新的 SEO 頁面，更新 sitemap，commit 並 push 觸發 Vercel 重新部署。

## 檔案結構

```
scripts/
├── expand-seo-pages.ts        ← 核心：從佇列取出新項目，更新 seo-data.ts + caption-generator.ts
├── daily-seo-job.sh           ← 完整流水線（expand → build → validate → commit → push）
└── ping-search-engines.sh     ← 通知搜尋引擎 sitemap 已更新

apps/web/
├── data/
│   └── seo-expansion-queue.json  ← 待生成的 topics/tones 佇列
├── src/lib/
│   ├── seo-data.ts               ← 頁面資料來源（腳本會自動更新）
│   └── caption-generator.ts      ← Caption 模板（腳本會自動新增 fallback）
└── public/
    ├── sitemap.xml               ← build 後自動產生
    ├── sitemap-0.xml             ← 詳細 URL 列表
    └── robots.txt                ← build 後自動產生

.github/workflows/
└── daily-seo-generation.yml   ← GitHub Actions 每日排程
```

## 自動執行（GitHub Actions）

### 預設排程
- 每日 UTC 04:00（台灣時間中午 12:00）
- 自動取 3 個新 topics + 1 個新 tone
- 每次新增約 40-90 個新頁面

### 手動觸發
1. GitHub repo → Actions → Daily SEO Page Generation
2. 點擊「Run workflow」
3. 可自訂 topics_count 和 tones_count

## 手動執行（本機）

### 完整流水線
```bash
cd /home/uop3364/workspace/growth-factory
bash scripts/daily-seo-job.sh
```

### 只擴展頁面（不 build/commit）
```bash
npx tsx scripts/expand-seo-pages.ts --topics 5 --tones 2
```

### Dry run（預覽，不寫入檔案）
```bash
npx tsx scripts/expand-seo-pages.ts --topics 5 --tones 2 --dry-run
```

## 佇列管理

### 查看剩餘佇列
```bash
cat apps/web/data/seo-expansion-queue.json | python3 -c "
import json, sys
q = json.load(sys.stdin)
print(f'Pending topics: {len(q[\"topics\"][\"pending\"])}')
print(f'Pending tones: {len(q[\"tones\"][\"pending\"])}')
print(f'Added topics: {len(q[\"topics\"][\"added\"])}')
print(f'Added tones: {len(q[\"tones\"][\"added\"])}')
"
```

### 補充佇列
直接編輯 seo-expansion-queue.json，在 pending 陣列中新增項目。

Topic 格式：`{ "id": "slug", "name": "Display Name", "emoji": "🎯" }`
Tone 格式：`{ "id": "slug", "name": "Display Name", "description": "Brief tone description" }`

### 每次擴展的頁面數計算
- 新增 1 個 topic = 5 platforms × (1 + 現有 tones 數) 個新頁面
- 新增 1 個 tone = 5 platforms × 現有 topics 數 個新頁面
- 預設每日 3 topics + 1 tone ≈ 40-90 新頁面

## 故障處理

### Build 失敗
1. 檢查 seo-data.ts 語法：`cd apps/web && npx tsc --noEmit`
2. 回退：`git checkout -- apps/web/src/lib/seo-data.ts apps/web/src/lib/caption-generator.ts`

### 佇列已空
- 編輯 seo-expansion-queue.json 補充新的 topics/tones
- 考慮新增 tool families（hashtag-generator, hook-generator 等）

## 備援方案：本機 cron

```bash
crontab -e
# 每日 UTC 04:00 (台灣時間中午 12:00)
0 4 * * * bash scripts/daily-seo-job.sh >> /tmp/seo-daily.log 2>&1
```
