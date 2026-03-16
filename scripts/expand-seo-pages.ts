/**
 * SEO Page Expansion Script
 *
 * Reads from seo-expansion-queue.json, pops N topics and M tones from "pending",
 * inserts them into seo-data.ts, and moves processed items to "added" with a timestamp.
 *
 * Usage:
 *   npx tsx scripts/expand-seo-pages.ts [--topics N] [--tones M] [--dry-run]
 *
 * Defaults: 3 topics, 1 tone per run.
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, '..');
const QUEUE_PATH = path.join(ROOT, 'apps/web/data/seo-expansion-queue.json');
const SEO_DATA_PATH = path.join(ROOT, 'apps/web/src/lib/seo-data.ts');
const CAPTION_GEN_PATH = path.join(ROOT, 'apps/web/src/lib/caption-generator.ts');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TopicItem {
  id: string;
  name: string;
  emoji: string;
  addedAt?: string;
}

interface ToneItem {
  id: string;
  name: string;
  description: string;
  addedAt?: string;
}

interface Queue {
  version: number;
  topics: { pending: TopicItem[]; added: TopicItem[] };
  tones: { pending: ToneItem[]; added: ToneItem[] };
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
function parseArgs(): { topicCount: number; toneCount: number; dryRun: boolean } {
  const args = process.argv.slice(2);
  let topicCount = 3;
  let toneCount = 1;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--topics' && args[i + 1]) {
      topicCount = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--tones' && args[i + 1]) {
      toneCount = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    }
  }

  return { topicCount, toneCount, dryRun };
}

// ---------------------------------------------------------------------------
// Helpers to parse existing entries from seo-data.ts
// ---------------------------------------------------------------------------

/** Extract the items currently in an `as const` array, e.g. TOPICS = ['a', 'b'] as const */
function extractArrayItems(source: string, arrayName: string): string[] {
  // Match: export const TOPICS = ['a', 'b', ...] as const;
  const regex = new RegExp(
    `export\\s+const\\s+${arrayName}\\s*=\\s*\\[([^\\]]*?)\\]\\s*as\\s+const`,
    's',
  );
  const match = source.match(regex);
  if (!match) return [];
  // Pull out quoted strings
  const items: string[] = [];
  const itemRegex = /'([^']+)'/g;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(match[1])) !== null) {
    items.push(m[1]);
  }
  return items;
}

// ---------------------------------------------------------------------------
// Insertion helpers for seo-data.ts
// ---------------------------------------------------------------------------

/**
 * Insert new items into an `as const` array.
 * Finds `] as const;` that closes the target array and inserts before it.
 */
function insertIntoArray(source: string, arrayName: string, newIds: string[]): string {
  if (newIds.length === 0) return source;

  // Pattern: export const TOPICS = ['a', 'b'] as const;
  const regex = new RegExp(
    `(export\\s+const\\s+${arrayName}\\s*=\\s*\\[[^\\]]*?)(\\]\\s*as\\s+const\\s*;)`,
    's',
  );

  return source.replace(regex, (_, before: string, after: string) => {
    const additions = newIds.map((id) => `'${id}'`).join(', ');
    // Add a comma after last existing item if needed
    const trimmed = before.trimEnd();
    const needsComma = trimmed.length > 0 && !trimmed.endsWith('[') && !trimmed.endsWith(',');
    return `${before}${needsComma ? ', ' : ''}${additions}${after}`;
  });
}

/**
 * Find the closing `}` of an object literal for a given `export const NAME: Type = { ... };`
 * We skip past the `= ` to find the opening `{` of the object literal (not the type annotation),
 * then brace-count from there to find the matching `}`.
 */
function findObjectLiteralClose(source: string, marker: string): number {
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) return -1;

  // Find `= {` after the marker — this is the object literal start
  const eqIdx = source.indexOf('= {', startIdx);
  if (eqIdx === -1) return -1;

  const objStart = source.indexOf('{', eqIdx);
  let braceCount = 0;
  for (let i = objStart; i < source.length; i++) {
    if (source[i] === '{') braceCount++;
    if (source[i] === '}') {
      braceCount--;
      if (braceCount === 0) return i;
    }
  }
  return -1;
}

/**
 * Insert new entries into an INFO record.
 * Finds the closing `}` of the object literal and inserts before it.
 */
function insertIntoTopicInfo(source: string, topics: TopicItem[]): string {
  if (topics.length === 0) return source;

  const closingIdx = findObjectLiteralClose(source, 'export const TOPIC_INFO:');
  if (closingIdx === -1) return source;

  const entries = topics
    .map((t) => `  '${t.id}': { name: '${t.name}', emoji: '${t.emoji}' },`)
    .join('\n');

  return source.slice(0, closingIdx) + entries + '\n' + source.slice(closingIdx);
}

function insertIntoToneInfo(source: string, tones: ToneItem[]): string {
  if (tones.length === 0) return source;

  const closingIdx = findObjectLiteralClose(source, 'export const TONE_INFO:');
  if (closingIdx === -1) return source;

  const entries = tones
    .map(
      (t) =>
        `  '${t.id}': { name: '${t.name}', description: '${t.description}' },`,
    )
    .join('\n');

  return source.slice(0, closingIdx) + entries + '\n' + source.slice(closingIdx);
}

// ---------------------------------------------------------------------------
// Insertion helpers for caption-generator.ts
// ---------------------------------------------------------------------------

/**
 * Insert fallback entries into TOPIC_PHRASES and TONE_MODIFIERS in caption-generator.ts
 * so that generateCaptions() doesn't crash on undefined lookups.
 */
function insertTopicPhrases(source: string, topics: TopicItem[]): string {
  if (topics.length === 0) return source;

  const marker = 'const TOPIC_PHRASES: Record<string, string[]> = {';
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) return source;

  let braceCount = 0;
  let closingIdx = -1;
  for (let i = startIdx + marker.length - 1; i < source.length; i++) {
    if (source[i] === '{') braceCount++;
    if (source[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        closingIdx = i;
        break;
      }
    }
  }
  if (closingIdx === -1) return source;

  const entries = topics
    .map((t) => {
      const lower = t.name.toLowerCase();
      return `  '${t.id}': ["${lower} vibes", "${lower} life", "${lower} goals", "${lower} inspiration", "${lower} journey"],`;
    })
    .join('\n');

  return source.slice(0, closingIdx) + entries + '\n' + source.slice(closingIdx);
}

function insertToneModifiers(source: string, tones: ToneItem[]): string {
  if (tones.length === 0) return source;

  const marker = 'const TONE_MODIFIERS: Record<string, { prefix: string; suffix: string; style: string }> = {';
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) return source;

  let braceCount = 0;
  let closingIdx = -1;
  for (let i = startIdx + marker.length - 1; i < source.length; i++) {
    if (source[i] === '{') braceCount++;
    if (source[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        closingIdx = i;
        break;
      }
    }
  }
  if (closingIdx === -1) return source;

  const entries = tones
    .map((t) => {
      return `  '${t.id}': { prefix: "", suffix: "", style: "${t.description.toLowerCase()}" },`;
    })
    .join('\n');

  return source.slice(0, closingIdx) + entries + '\n' + source.slice(closingIdx);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const { topicCount, toneCount, dryRun } = parseArgs();

  console.log(`SEO Page Expansion Script`);
  console.log(`  Topics to add: ${topicCount}`);
  console.log(`  Tones to add:  ${toneCount}`);
  console.log(`  Dry run:       ${dryRun}`);
  console.log();

  // Read queue
  if (!fs.existsSync(QUEUE_PATH)) {
    console.error(`Queue file not found: ${QUEUE_PATH}`);
    process.exit(1);
  }
  const queue: Queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf-8'));

  // Read seo-data.ts
  if (!fs.existsSync(SEO_DATA_PATH)) {
    console.error(`SEO data file not found: ${SEO_DATA_PATH}`);
    process.exit(1);
  }
  let seoSource = fs.readFileSync(SEO_DATA_PATH, 'utf-8');

  // Read caption-generator.ts
  let captionSource = '';
  const hasCaptionFile = fs.existsSync(CAPTION_GEN_PATH);
  if (hasCaptionFile) {
    captionSource = fs.readFileSync(CAPTION_GEN_PATH, 'utf-8');
  }

  // Parse existing items
  const existingTopics = new Set(extractArrayItems(seoSource, 'TOPICS'));
  const existingTones = new Set(extractArrayItems(seoSource, 'TONES'));

  console.log(`Existing topics (${existingTopics.size}): ${[...existingTopics].join(', ')}`);
  console.log(`Existing tones  (${existingTones.size}): ${[...existingTones].join(', ')}`);
  console.log();

  // Pick items from pending, skip already-existing (idempotent)
  const topicsToAdd: TopicItem[] = [];
  const topicsPendingRemaining: TopicItem[] = [];
  for (const t of queue.topics.pending) {
    if (existingTopics.has(t.id)) {
      // Already in seo-data.ts, move to added
      console.log(`  [skip] Topic "${t.id}" already exists in seo-data.ts`);
      queue.topics.added.push({ ...t, addedAt: new Date().toISOString() });
      continue;
    }
    if (topicsToAdd.length < topicCount) {
      topicsToAdd.push(t);
    } else {
      topicsPendingRemaining.push(t);
    }
  }

  const tonesToAdd: ToneItem[] = [];
  const tonesPendingRemaining: ToneItem[] = [];
  for (const t of queue.tones.pending) {
    if (existingTones.has(t.id)) {
      console.log(`  [skip] Tone "${t.id}" already exists in seo-data.ts`);
      queue.tones.added.push({ ...t, addedAt: new Date().toISOString() });
      continue;
    }
    if (tonesToAdd.length < toneCount) {
      tonesToAdd.push(t);
    } else {
      tonesPendingRemaining.push(t);
    }
  }

  if (topicsToAdd.length === 0 && tonesToAdd.length === 0) {
    console.log('\nNothing to add. All items already exist or pending queue is empty.');
    return;
  }

  console.log(`\nWill add ${topicsToAdd.length} topic(s): ${topicsToAdd.map((t) => t.id).join(', ')}`);
  console.log(`Will add ${tonesToAdd.length} tone(s):  ${tonesToAdd.map((t) => t.id).join(', ')}`);

  // --- Update seo-data.ts ---
  const topicIds = topicsToAdd.map((t) => t.id);
  const toneIds = tonesToAdd.map((t) => t.id);

  seoSource = insertIntoArray(seoSource, 'TOPICS', topicIds);
  seoSource = insertIntoArray(seoSource, 'TONES', toneIds);
  seoSource = insertIntoTopicInfo(seoSource, topicsToAdd);
  seoSource = insertIntoToneInfo(seoSource, tonesToAdd);

  // --- Update caption-generator.ts ---
  if (hasCaptionFile) {
    captionSource = insertTopicPhrases(captionSource, topicsToAdd);
    captionSource = insertToneModifiers(captionSource, tonesToAdd);
  }

  // --- Update queue ---
  const now = new Date().toISOString();
  for (const t of topicsToAdd) {
    queue.topics.added.push({ ...t, addedAt: now });
  }
  for (const t of tonesToAdd) {
    queue.tones.added.push({ ...t, addedAt: now });
  }
  queue.topics.pending = topicsPendingRemaining;
  queue.tones.pending = tonesPendingRemaining;

  // --- Estimate new pages ---
  const totalTopics = existingTopics.size + topicsToAdd.length;
  const totalTones = existingTones.size + tonesToAdd.length;
  const platforms = 5; // fixed
  const newTonePages = platforms * totalTopics * totalTones;
  const newTopicPages = platforms * totalTopics;
  const totalPages = newTonePages + newTopicPages + platforms;
  const previousTonePages = platforms * existingTopics.size * existingTones.size;
  const previousTopicPages = platforms * existingTopics.size;
  const previousTotal = previousTonePages + previousTopicPages + platforms;
  const delta = totalPages - previousTotal;

  console.log(`\n--- Page Estimate ---`);
  console.log(`  Before: ${previousTotal} pages (${previousTonePages} tone + ${previousTopicPages} topic + ${platforms} platform)`);
  console.log(`  After:  ${totalPages} pages (${newTonePages} tone + ${newTopicPages} topic + ${platforms} platform)`);
  console.log(`  Delta:  +${delta} new pages`);

  if (dryRun) {
    console.log(`\n[DRY RUN] No files written.`);
    return;
  }

  // Write files
  fs.writeFileSync(SEO_DATA_PATH, seoSource, 'utf-8');
  console.log(`\n  Wrote: ${SEO_DATA_PATH}`);

  if (hasCaptionFile) {
    fs.writeFileSync(CAPTION_GEN_PATH, captionSource, 'utf-8');
    console.log(`  Wrote: ${CAPTION_GEN_PATH}`);
  }

  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n', 'utf-8');
  console.log(`  Wrote: ${QUEUE_PATH}`);

  console.log(`\nDone! Added ${topicsToAdd.length} topics, ${tonesToAdd.length} tones (+${delta} pages).`);
  console.log(`Remaining in queue: ${queue.topics.pending.length} topics, ${queue.tones.pending.length} tones.`);
}

main();
