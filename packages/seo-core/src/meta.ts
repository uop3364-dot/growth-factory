export function generateMetaTags(opts: {
  title: string;
  description: string;
  url: string;
  siteName?: string;
}) {
  return {
    title: opts.title,
    description: opts.description,
    canonical: opts.url,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.url,
      siteName: opts.siteName || 'GrowthFactory',
    },
  };
}
