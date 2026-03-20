'use client';

import MascotImage from './MascotImage';
import { brandCopy } from '@/lib/brandCopy';

interface EmptyStateMascotProps {
  /** English text shown below mascot */
  text?: string;
  className?: string;
}

/** Shown when no input or no result — lazy/waiting mascot. */
export default function EmptyStateMascot({
  text,
  className = '',
}: EmptyStateMascotProps) {
  const copy = text ?? brandCopy.empty[0];
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="animate-brand-breathe">
        <MascotImage size="lg" withLaptop />
      </div>
      <p className="mt-4 text-sm text-gray-400">{copy}</p>
    </div>
  );
}
