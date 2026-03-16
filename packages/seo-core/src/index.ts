// SEO Core utilities
// This package will contain shared SEO logic as the project grows

export { generateMetaTags } from './meta';
export { buildInternalLinks } from './linking';

export interface SeoPageData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: object;
}
