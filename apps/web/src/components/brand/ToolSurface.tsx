interface ToolSurfaceProps {
  children: React.ReactNode;
  className?: string;
}

/** Unified container for tool page content sections. */
export default function ToolSurface({ children, className = '' }: ToolSurfaceProps) {
  return (
    <section className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </section>
  );
}
