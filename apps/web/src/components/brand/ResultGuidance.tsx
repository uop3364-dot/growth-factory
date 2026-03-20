'use client';

import Link from 'next/link';
import MascotImage from './MascotImage';
import { brandCopy } from '@/lib/brandCopy';
import { trackEvent } from '@/lib/analytics';

const CROSS_TOOLS = [
  { label: 'Captions', href: '/caption-generator' },
  { label: 'Bios', href: '/bio-generator' },
  { label: 'Titles', href: '/title-generator' },
  { label: 'Hashtags', href: '/hashtag-generator' },
];

interface ResultGuidanceProps {
  /** Current tool path — excluded from cross-tool links. */
  currentTool?: string;
  /** Callback to re-trigger generation. */
  onGenerateAgain?: () => void;
  className?: string;
}

/**
 * Post-generation guidance block.
 * Shown below results to drive next action: regenerate, try another tool,
 * or discover affiliate workflows. Presentation-layer only.
 */
export default function ResultGuidance({
  currentTool,
  onGenerateAgain,
  className = '',
}: ResultGuidanceProps) {
  const otherTools = CROSS_TOOLS.filter(t => t.href !== currentTool);

  return (
    <div className={`bg-brand-surface rounded-brand-lg border border-brand-green/15 p-5 mt-6 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="hidden sm:block flex-shrink-0 mt-0.5">
          <MascotImage size="sm" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 mb-3">
            {brandCopy.resultGuidance[0]}
          </p>
          <div className="flex flex-wrap gap-2">
            {onGenerateAgain && (
              <button
                onClick={() => {
                  trackEvent('result_guidance_click', { action: 'generate_again' });
                  onGenerateAgain();
                }}
                className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                Generate again
              </button>
            )}
            {otherTools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => trackEvent('result_guidance_click', { action: 'cross_tool', tool: tool.href })}
                className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                Try {tool.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2.5">{brandCopy.resultGuidance[4]}</p>
        </div>
      </div>
    </div>
  );
}
