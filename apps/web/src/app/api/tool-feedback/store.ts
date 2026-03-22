// Shared in-memory store for tool feedback records.
// Extracted from route.ts so that Next.js route validation passes
// (route files may only export HTTP method handlers).

export interface ToolFeedbackRecord {
  id: string;
  toolSlug: string;
  routePath: string;
  sentiment: 'yes' | 'no';
  message: string | null;
  ctaShown: boolean;
  ctaClicked: boolean;
  ctaTarget: string | null;
  sessionId: string | null;
  userAgent: string | null;
  createdAt: string;
}

export const toolFeedbackStore: ToolFeedbackRecord[] = [];
