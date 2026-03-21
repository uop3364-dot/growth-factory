interface PageWrapperProps {
  /** Max width variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  children: React.ReactNode;
}

const sizeMap = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
} as const;

/**
 * Unified page content wrapper with consistent padding and max-width.
 * All SEO pages should wrap their body content in this component.
 */
export default function PageWrapper({
  size = 'md',
  className = '',
  children,
}: PageWrapperProps) {
  return (
    <div className={`${sizeMap[size]} mx-auto px-4 py-8 ${className}`}>
      {children}
    </div>
  );
}
