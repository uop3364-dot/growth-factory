interface ResultFrameProps {
  children: React.ReactNode;
  className?: string;
}

/** Visual wrapper for output/result sections. Does NOT modify content. */
export default function ResultFrame({ children, className = '' }: ResultFrameProps) {
  return (
    <div className={`relative rounded-brand-lg border border-brand-green/15 bg-white shadow-brand p-0.5 ${className}`}>
      {/* Subtle top accent bar */}
      <div className="h-0.5 w-full rounded-t-brand-lg bg-gradient-to-r from-brand-green/40 via-brand-green/20 to-transparent" />
      <div className="p-0">
        {children}
      </div>
    </div>
  );
}
