import MascotImage from './MascotImage';
import { brandCopy } from '@/lib/brandCopy';

interface MascotHintProps {
  /** Custom English text. Falls back to first general entry if omitted. */
  text?: string;
  className?: string;
}

/** Small speech bubble with English microcopy + tiny mascot. */
export default function MascotHint({ text, className = '' }: MascotHintProps) {
  const copy = text ?? brandCopy.general[0];
  return (
    <div className={`brand-hint-bubble ${className}`}>
      <MascotImage size="xs" />
      <span>{copy}</span>
    </div>
  );
}
