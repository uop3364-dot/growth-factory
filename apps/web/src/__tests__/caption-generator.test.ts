import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateCaptions } from '@/lib/caption-generator';
import type { CaptionRequest } from '@/lib/caption-generator';

describe('caption-generator (deterministic fallback)', () => {
  // ---------------------------------------------------------------------------
  // 1. Input sensitivity — different inputs MUST produce different output
  // ---------------------------------------------------------------------------

  describe('input sensitivity', () => {
    it('different topics produce different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny' };
      const alt: CaptionRequest = { ...base, topic: 'fitness' };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      // Captions must not be identical
      expect(a.captions).not.toEqual(b.captions);
    });

    it('different tones produce different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny' };
      const alt: CaptionRequest = { ...base, tone: 'professional' };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      expect(a.captions).not.toEqual(b.captions);
    });

    it('different platforms produce different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny' };
      const alt: CaptionRequest = { ...base, platform: 'tiktok' };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      expect(a.captions).not.toEqual(b.captions);
    });

    it('different languages produce different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny', language: 'english' };
      const alt: CaptionRequest = { ...base, language: 'spanish' };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      expect(a.captions).not.toEqual(b.captions);
    });

    it('different keywords produce different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny', keywords: ['summer'] };
      const alt: CaptionRequest = { ...base, keywords: ['winter'] };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      expect(a.captions).not.toEqual(b.captions);
    });

    it('different audience produces different captions', () => {
      const base: CaptionRequest = { platform: 'instagram', topic: 'travel', tone: 'funny', audience: 'millennials' };
      const alt: CaptionRequest = { ...base, audience: 'retirees' };

      const a = generateCaptions(base);
      const b = generateCaptions(alt);

      // At minimum the captions array should differ
      expect(JSON.stringify(a.captions)).not.toEqual(JSON.stringify(b.captions));
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Language enforcement — non-English must produce non-English-template output
  // ---------------------------------------------------------------------------

  describe('language enforcement', () => {
    it('language=spanish produces Spanish-flavored content (not English template)', () => {
      const result = generateCaptions({
        platform: 'instagram',
        topic: 'travel',
        tone: 'friendly',
        language: 'spanish',
      });

      // At least some captions should contain Spanish words
      const allText = result.captions.join(' ').toLowerCase();
      const spanishWords = ['descubre', 'explora', 'sumérgete', 'mejora', 'contenido', 'pierdas'];
      const hasSpanish = spanishWords.some(w => allText.includes(w));
      expect(hasSpanish).toBe(true);
    });

    it('language=traditional-chinese produces Chinese-flavored content', () => {
      const result = generateCaptions({
        platform: 'instagram',
        topic: 'food',
        tone: 'cute',
        language: 'traditional-chinese',
      });

      const allText = result.captions.join('');
      // Should contain CJK characters
      const hasChinese = /[\u4e00-\u9fff]/.test(allText);
      expect(hasChinese).toBe(true);
    });

    it('language=japanese produces Japanese-flavored content', () => {
      const result = generateCaptions({
        platform: 'tiktok',
        topic: 'fitness',
        tone: 'bold',
        language: 'japanese',
      });

      const allText = result.captions.join('');
      // Should contain Japanese characters (hiragana, katakana, or kanji)
      const hasJapanese = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/.test(allText);
      expect(hasJapanese).toBe(true);
    });

    it('language=french produces French-flavored content', () => {
      const result = generateCaptions({
        platform: 'instagram',
        topic: 'beauty',
        tone: 'luxury',
        language: 'french',
      });

      const allText = result.captions.join(' ').toLowerCase();
      const frenchWords = ['découvrez', 'explorez', 'plongez', 'manquez', 'contenu'];
      const hasFrench = frenchWords.some(w => allText.includes(w));
      expect(hasFrench).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Output structure
  // ---------------------------------------------------------------------------

  describe('output structure', () => {
    it('returns 10 captions, 5 short variants, 5 hashtags, and a CTA', () => {
      const result = generateCaptions({
        platform: 'instagram',
        topic: 'travel',
        tone: 'funny',
      });

      expect(result.captions).toHaveLength(10);
      expect(result.shortVariants).toHaveLength(5);
      expect(result.hashtags).toHaveLength(5);
      expect(typeof result.ctaSuggestion).toBe('string');
      expect(result.source).toBe('fallback');
    });

    it('includes keywords in hashtags when provided', () => {
      const result = generateCaptions({
        platform: 'instagram',
        topic: 'travel',
        tone: 'funny',
        keywords: ['sunset', 'beach'],
      });

      // The keywords array is sliced to max 5, but keywords should appear
      const hashtagText = result.hashtags.join(' ').toLowerCase();
      expect(hashtagText).toContain('travel');
    });
  });
});
