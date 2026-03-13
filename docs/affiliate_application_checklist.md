# Affiliate Application Checklist

## 申請前準備（通用）

- [ ] 網站已上線，至少有 3-5 篇相關內容（YouTube tools / creator tips / video editing）
- [ ] 準備好 PayPal 帳號（多數平台必要）
- [ ] 準備好社群連結（YouTube channel / Twitter / blog URL）
- [ ] 準備簡短自我介紹：你的受眾、流量來源、為什麼推薦這個工具

---

## 第一優先申請（Week 1 主推）

### 1. vidIQ
- **申請頁**: https://vidiq.com/affiliates
- **平台**: Impact Radius
- **需要 PayPal**: 是（或 direct deposit）
- **需要網站**: 是，需有 YouTube/creator 相關內容
- **佣金**: 25% recurring
- **核准難度**: 中等，需要有相關內容
- **申請後回填**:
  - `affiliate_url` → 核准後拿到的追蹤連結
  - `applied_at` → 申請日期
  - `approved_at` → 核准日期
  - `affiliate_dashboard_url` → Impact Radius dashboard URL
  - `payout_method` → paypal / bank
  - `payout_email` → 收款 email

### 2. Canva
- **申請頁**: https://www.canva.com/affiliates/
- **平台**: Impact Radius
- **需要 PayPal**: 是（或 bank transfer）
- **需要網站**: 是，需有 design/creator 內容
- **佣金**: Up to $36 per Pro subscription
- **核准難度**: 中等
- **申請後回填**: 同上述欄位

### 3. OpusClip
- **申請頁**: https://www.opus.pro/affiliate
- **平台**: 直接申請
- **需要 PayPal**: 是
- **需要網站**: 是，需有 video/creator 內容
- **佣金**: 30% recurring
- **核准難度**: 中低
- **申請後回填**: 同上述欄位

### 4. Pictory
- **申請頁**: https://pictory.ai/affiliates
- **平台**: 直接 / PartnerStack
- **需要 PayPal**: 是（或 Stripe）
- **需要網站**: 是，需有 video/AI/marketing 內容
- **佣金**: 20% recurring
- **核准難度**: 低
- **申請後回填**: 同上述欄位

### 5. Descript
- **申請頁**: https://www.descript.com/affiliates
- **平台**: 直接 / Impact
- **需要 PayPal**: 是
- **需要網站**: 是，需有 creator/editing 內容
- **佣金**: 15-20% recurring
- **核准難度**: 中等
- **申請後回填**: 同上述欄位

---

## 備用工具（比較頁用）

### 6. TubeBuddy
- **申請頁**: https://www.tubebuddy.com/affiliates
- **平台**: 直接申請
- **需要 PayPal**: 是
- **需要網站**: 建議有，但門檻較低
- **佣金**: Up to 50% recurring（業界最高之一）
- **核准難度**: 低，容易通過
- **備註**: 主要用於 vidIQ vs TubeBuddy 比較頁，佣金極高值得申請
- **申請後回填**: 同上述欄位

---

## 申請順序建議

| 順序 | 工具 | 原因 |
|------|------|------|
| 1 | vidIQ | 主推工具，YouTube SEO 核心 |
| 2 | Canva | 設計類通用，受眾最廣 |
| 3 | TubeBuddy | 門檻低 + 佣金高 + 比較頁必需 |
| 4 | OpusClip | Shorts 趨勢強，30% recurring |
| 5 | Pictory | AI video 熱門，容易核准 |
| 6 | Descript | 編輯類，搭配比較頁 |

---

## 等待核准期間的做法

1. 所有連結先用 `fallbackLinks`（官方首頁 URL）佔位
2. 頁面 CTA 可以先上線，連結指向官方首頁
3. 核准後替換 `config/affiliate_links.ts` 中對應 slug 的 URL
4. 同步更新 `data/affiliate_tools.json` 中的 `affiliate_url` 和 `application_status`

---

## 核准後回填清單

對每個工具，更新以下檔案：

1. **`data/affiliate_tools.json`**:
   - `application_status`: `"not_applied"` → `"pending"` → `"approved"`
   - `affiliate_url`: 填入追蹤連結
   - `applied_at`: 申請日期 (ISO 8601)
   - `approved_at`: 核准日期 (ISO 8601)
   - `affiliate_dashboard_url`: 後台網址
   - `payout_method`: paypal / bank / stripe
   - `payout_email`: 收款 email

2. **`config/affiliate_links.ts`**:
   - 把對應 slug 的空字串替換為實際 affiliate URL

3. **`data/affiliate_tools_manual_fill_template.md`**:
   - 更新對應工具的狀態和備註
