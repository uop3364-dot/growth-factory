import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import GoogleAnalytics from './components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CreatorAITools - Free AI Tools for Social Media Creators',
    template: '%s | CreatorAITools',
  },
  description: 'Free AI-powered tools for creators: Caption Generator, Title Generator, Bio Generator & Hashtag Generator. Optimized for Instagram, TikTok, YouTube, X, LinkedIn — no signup required.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoraitools.tools'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'CreatorAITools',
    title: 'CreatorAITools - Free AI Caption Generator for Social Media',
    description: 'Generate engaging captions, hashtags & CTAs for Instagram, TikTok, YouTube, X and Facebook. 100% free, no signup.',
    url: '/',
    images: [{ url: 'https://creatoraitools.tools/og-default.png', width: 1200, height: 630, alt: 'CreatorAITools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorAITools - Free AI Caption Generator',
    description: 'Generate engaging captions for Instagram, TikTok, YouTube, X and Facebook. Free AI tool for creators.',
    images: ['https://creatoraitools.tools/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <GoogleAnalytics />
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CreatorAITools
              </Link>
              <div className="flex gap-6 text-sm">
                <Link href="/caption-generator" className="text-gray-600 hover:text-blue-600 transition-colors">Captions</Link>
                <Link href="/title-generator" className="text-gray-600 hover:text-blue-600 transition-colors">Titles</Link>
                <Link href="/bio-generator" className="text-gray-600 hover:text-blue-600 transition-colors">Bios</Link>
                <Link href="/hashtag-generator" className="text-gray-600 hover:text-blue-600 transition-colors">Hashtags</Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Tools</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/caption-generator" className="block hover:text-blue-600">Caption Generator</Link>
                  <Link href="/title-generator" className="block hover:text-blue-600">Title Generator</Link>
                  <Link href="/bio-generator" className="block hover:text-blue-600">Bio Generator</Link>
                  <Link href="/hashtag-generator" className="block hover:text-blue-600">Hashtag Generator</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Platforms</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/caption-generator/instagram" className="block hover:text-blue-600">Instagram</Link>
                  <Link href="/caption-generator/tiktok" className="block hover:text-blue-600">TikTok</Link>
                  <Link href="/caption-generator/youtube" className="block hover:text-blue-600">YouTube</Link>
                  <Link href="/caption-generator/x" className="block hover:text-blue-600">X (Twitter)</Link>
                  <Link href="/caption-generator/facebook" className="block hover:text-blue-600">Facebook</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Topics</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link href="/caption-generator/instagram/travel" className="block hover:text-blue-600">Travel</Link>
                  <Link href="/caption-generator/instagram/food" className="block hover:text-blue-600">Food</Link>
                  <Link href="/caption-generator/instagram/fitness" className="block hover:text-blue-600">Fitness</Link>
                  <Link href="/caption-generator/instagram/beauty" className="block hover:text-blue-600">Beauty</Link>
                  <Link href="/caption-generator/instagram/business" className="block hover:text-blue-600">Business</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">CreatorAITools</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <span className="block">Free AI-powered tools for social media creators.</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
              &copy; 2026 CreatorAITools. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
