// Shared types for GrowthFactory

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'x' | 'facebook';
export type Topic = 'travel' | 'food' | 'fitness' | 'beauty' | 'business' | 'marketing' | 'gaming' | 'pets' | 'fashion' | 'motivation';
export type Tone = 'funny' | 'cute' | 'professional' | 'luxury' | 'minimalist' | 'friendly' | 'persuasive';

export interface CaptionRequest {
  platform: Platform;
  topic: Topic;
  tone: Tone;
  audience?: string;
  language?: string;
  keywords?: string[];
}

export interface CaptionResult {
  captions: string[];
  shortVariants: string[];
  hashtags: string[];
  ctaSuggestion: string;
}

export interface PageCandidate {
  slug: string;
  pageType: 'platform' | 'platform_topic' | 'platform_topic_tone';
  platform: Platform;
  topic?: Topic;
  tone?: Tone;
  title: string;
  priority: number;
}

export interface InternalHealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export interface ReportSummary {
  service: string;
  totalPages: number;
  pageBreakdown: Record<string, number>;
  status: string;
  monetization: Record<string, string>;
  indexing: Record<string, unknown>;
}
