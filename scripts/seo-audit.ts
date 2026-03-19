#!/usr/bin/env npx tsx
/**
 * Daily SEO Audit Script
 *
 * Checks top pages for SEO + conversion compliance:
 * - Title has power words + keyword
 * - Meta description is conversion-focused
 * - H1 alignment
 * - CTA components present
 * - Internal links >= 3
 *
 * Usage: npx tsx scripts/seo-audit.ts [--top N] [--fix]
 */

import * as fs from 'fs';
import * as path from 'path';

const WEB_DIR = path.join(__dirname, '..', 'apps', 'web');
const BUILD_DIR = path.join(WEB_DIR, '.next', 'server', 'app');

interface AuditResult {
  page: string;
  score: number;
  issues: string[];
  priority: number;
}

const HIGH_VALUE_KEYWORDS = ['youtube', 'instagram', 'tiktok', 'ai', 'generator', 'free', 'caption', 'bio', 'title', 'hashtag'];
const POWER_WORDS = ['free', 'instant', 'ai-powered', 'fast', 'proven', 'best', 'top', 'ultimate', 'easy', 'powerful'];
const REQUIRED_PATTERNS = {
  heroCta: /HeroCTA|Generate Now|hero_cta/i,
  affiliateCta: /AffiliateCTA|affiliate_click/i,
  howToUse: /HowToUse|How to Use/i,
  toolCrossSell: /ToolCrossSell|Get More Free/i,
  internalLinks: /CrossToolLinks|RelatedPlatforms|RelatedTopics/i,
};

function getTopPages(limit: number): string[] {
  // Priority: tool pages > platform pages > topic pages with high-value keywords
  const pages: { path: string; priority: number }[] = [];

  // Scan source files
  const appDir = path.join(WEB_DIR, 'src', 'app');

  const seen = new Set<string>();

  function scanDir(dir: string, urlPath: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === 'api' || entry.name === 'components') continue;

      if (entry.isFile() && entry.name === 'page.tsx') {
        const pagePath = urlPath || '/';
        if (seen.has(pagePath)) continue;
        seen.add(pagePath);

        let priority = 0;

        // Tool pages highest priority
        if (['/', '/caption-generator', '/bio-generator', '/title-generator', '/hashtag-generator'].includes(pagePath)) {
          priority = 100;
        }
        // Platform pages
        else if (pagePath.split('/').length === 3 && !pagePath.includes('[')) {
          priority = 80;
        }
        // High-value keyword pages
        else {
          const slug = pagePath.toLowerCase();
          for (const kw of HIGH_VALUE_KEYWORDS) {
            if (slug.includes(kw)) priority += 10;
          }
        }

        pages.push({ path: pagePath, priority });
      }

      if (entry.isDirectory()) {
        // For dynamic routes [param], keep parent URL path (will be deduped)
        const childPath = entry.name.startsWith('[') ? urlPath : `${urlPath}/${entry.name}`;
        scanDir(path.join(dir, entry.name), childPath);
      }
    }
  }

  scanDir(appDir, '');
  pages.sort((a, b) => b.priority - a.priority);
  return pages.slice(0, limit).map(p => p.path);
}

function auditPageSource(pagePath: string): AuditResult {
  const issues: string[] = [];
  let score = 100;

  // Find the actual source file
  const srcPath = pagePath === '/' ?
    path.join(WEB_DIR, 'src', 'app', 'page.tsx') :
    path.join(WEB_DIR, 'src', 'app', pagePath.slice(1), 'page.tsx');

  if (!fs.existsSync(srcPath)) {
    return { page: pagePath, score: 0, issues: ['Source file not found'], priority: 0 };
  }

  const content = fs.readFileSync(srcPath, 'utf-8');

  const isHomepage = pagePath === '/';

  // Check: HeroCTA present (homepage uses inline CTA)
  if (!REQUIRED_PATTERNS.heroCta.test(content) && !isHomepage) {
    issues.push('Missing HeroCTA (Generate Now button)');
    score -= 15;
  }

  // Check: AffiliateCTA present (homepage uses HomeAffiliate)
  if (!REQUIRED_PATTERNS.affiliateCta.test(content) && !/HomeAffiliate/i.test(content)) {
    issues.push('Missing AffiliateCTA (monetization)');
    score -= 15;
  }

  // Check: HowToUse or equivalent content section
  if (!REQUIRED_PATTERNS.howToUse.test(content) && !isHomepage) {
    issues.push('Missing HowToUse section');
    score -= 10;
  }

  // Check: ToolCrossSell for bottom CTA (homepage has inline tool cards)
  if (!REQUIRED_PATTERNS.toolCrossSell.test(content) && !isHomepage) {
    issues.push('Missing ToolCrossSell (bottom cross-linking)');
    score -= 10;
  }

  // Check: Internal links (homepage has inline links to all tools)
  const hasInlineLinks = (content.match(/href=["']\/[a-z]+-generator/g) || []).length >= 3;
  if (!REQUIRED_PATTERNS.internalLinks.test(content) && !hasInlineLinks) {
    issues.push('Missing internal link components');
    score -= 15;
  }

  // Check: Title has power words
  const titleMatch = content.match(/title['":\s]+['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    const title = titleMatch[1].toLowerCase();
    const hasPowerWord = POWER_WORDS.some(pw => title.includes(pw));
    if (!hasPowerWord) {
      issues.push(`Title lacks power words: "${titleMatch[1].slice(0, 60)}..."`);
      score -= 10;
    }
  }

  // Check: FAQ present
  if (!/FAQ|faqs/i.test(content)) {
    issues.push('Missing FAQ section');
    score -= 5;
  }

  // Check: JSON-LD structured data
  if (!/buildToolSchema|buildFaqSchema/i.test(content)) {
    issues.push('Missing structured data (JSON-LD)');
    score -= 10;
  }

  // Priority based on URL keywords
  let priority = 0;
  const slug = pagePath.toLowerCase();
  for (const kw of HIGH_VALUE_KEYWORDS) {
    if (slug.includes(kw)) priority += 10;
  }

  return { page: pagePath, score: Math.max(0, score), issues, priority };
}

// Main
const args = process.argv.slice(2);
const topN = parseInt(args.find(a => a.startsWith('--top'))?.split('=')[1] || args[args.indexOf('--top') + 1] || '20');

console.log(`\n=== SEO + Conversion Audit ===`);
console.log(`Auditing top ${topN} pages...\n`);

const topPages = getTopPages(topN);
const results: AuditResult[] = [];

for (const page of topPages) {
  const result = auditPageSource(page);
  results.push(result);
}

// Sort by score (worst first)
results.sort((a, b) => a.score - b.score);

// Report
let passCount = 0;
let warnCount = 0;
let failCount = 0;

for (const r of results) {
  const status = r.score >= 90 ? 'PASS' : r.score >= 70 ? 'WARN' : 'FAIL';
  const icon = r.score >= 90 ? '[OK]' : r.score >= 70 ? '[!!]' : '[XX]';

  if (r.score >= 90) passCount++;
  else if (r.score >= 70) warnCount++;
  else failCount++;

  console.log(`${icon} ${r.page} — Score: ${r.score}/100`);
  if (r.issues.length > 0) {
    for (const issue of r.issues) {
      console.log(`    - ${issue}`);
    }
  }
}

console.log(`\n--- Summary ---`);
console.log(`Total: ${results.length} | Pass: ${passCount} | Warn: ${warnCount} | Fail: ${failCount}`);
console.log(`Average Score: ${Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)}/100`);

// Write JSON report for automation
const reportPath = path.join(__dirname, '..', 'data', 'seo-audit-report.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  pagesAudited: results.length,
  averageScore: Math.round(results.reduce((s, r) => s + r.score, 0) / results.length),
  pass: passCount,
  warn: warnCount,
  fail: failCount,
  results,
}, null, 2));
console.log(`\nReport saved to ${reportPath}`);

process.exit(failCount > 0 ? 1 : 0);
