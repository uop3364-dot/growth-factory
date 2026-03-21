'use client';

import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

interface FeedbackButtonProps {
  metadata?: {
    toolName?: string;
    selectedLanguage?: string;
    selectedPlatform?: string;
    selectedTopic?: string;
    selectedTone?: string;
  };
}

export default function FeedbackButton({ metadata }: FeedbackButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button — fixed bottom-right, always visible */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-brand-green-deep hover:bg-brand-green-dark text-white text-sm font-semibold py-2.5 px-4 rounded-brand-pill shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        aria-label="Send feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
        </svg>
        <span className="hidden sm:inline">Send feedback</span>
      </button>

      <FeedbackModal
        open={open}
        onClose={() => setOpen(false)}
        metadata={metadata}
      />
    </>
  );
}
