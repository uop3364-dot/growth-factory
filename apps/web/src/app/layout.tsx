import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import GoogleAnalytics from './components/GoogleAnalytics';
import { MascotImage } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';
import MobileNav from '@/components/MobileNav';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

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

const NAV_LINKS = [
  { href: '/caption-generator', label: 'Captions' },
  { href: '/title-generator', label: 'Titles' },
  { href: '/bio-generator', label: 'Bios' },
  { href: '/hashtag-generator', label: 'Hashtags' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="impact-site-verification" content="85db19f0-d4a7-4932-a592-5d6e7b58685d" />
      </head>
      <body className={`${nunito.variable} font-brand bg-brand-cream min-h-screen`}>
        <GoogleAnalytics />
        <nav className="bg-white/90 backdrop-blur-md border-b border-brand-green/15 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-outline shrink-0">
                <MascotImage size="xs" priority />
                <span className="bg-gradient-to-r from-brand-green-deep to-brand-green-dark bg-clip-text text-transparent">
                  CreatorAITools
                </span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden sm:flex gap-4 md:gap-6 text-sm font-semibold">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-brand-outline/70 hover:text-brand-green-deep transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile hamburger */}
              <MobileNav links={NAV_LINKS} />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-white border-t border-brand-green/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-brand-outline mb-3">Tools</h4>
                <div className="space-y-2 text-sm text-brand-outline/60">
                  <Link href="/caption-generator" className="block hover:text-brand-green-deep transition-colors">Caption Generator</Link>
                  <Link href="/title-generator" className="block hover:text-brand-green-deep transition-colors">Title Generator</Link>
                  <Link href="/bio-generator" className="block hover:text-brand-green-deep transition-colors">Bio Generator</Link>
                  <Link href="/hashtag-generator" className="block hover:text-brand-green-deep transition-colors">Hashtag Generator</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-brand-outline mb-3">Platforms</h4>
                <div className="space-y-2 text-sm text-brand-outline/60">
                  <Link href="/caption-generator/instagram" className="block hover:text-brand-green-deep transition-colors">Instagram</Link>
                  <Link href="/caption-generator/tiktok" className="block hover:text-brand-green-deep transition-colors">TikTok</Link>
                  <Link href="/caption-generator/youtube" className="block hover:text-brand-green-deep transition-colors">YouTube</Link>
                  <Link href="/caption-generator/x" className="block hover:text-brand-green-deep transition-colors">X (Twitter)</Link>
                  <Link href="/caption-generator/facebook" className="block hover:text-brand-green-deep transition-colors">Facebook</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-brand-outline mb-3">Topics</h4>
                <div className="space-y-2 text-sm text-brand-outline/60">
                  <Link href="/caption-generator/instagram/travel" className="block hover:text-brand-green-deep transition-colors">Travel</Link>
                  <Link href="/caption-generator/instagram/food" className="block hover:text-brand-green-deep transition-colors">Food</Link>
                  <Link href="/caption-generator/instagram/fitness" className="block hover:text-brand-green-deep transition-colors">Fitness</Link>
                  <Link href="/caption-generator/instagram/beauty" className="block hover:text-brand-green-deep transition-colors">Beauty</Link>
                  <Link href="/caption-generator/instagram/business" className="block hover:text-brand-green-deep transition-colors">Business</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-brand-outline mb-3">CreatorAITools</h4>
                <div className="space-y-2 text-sm text-brand-outline/60">
                  <span className="block">Free AI-powered tools for social media creators.</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-brand-green/10 text-center text-sm text-brand-outline/40">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MascotImage size="xs" priority />
                <span className="text-xs text-brand-outline/30">{brandCopy.footer[0]}</span>
              </div>
              &copy; 2026 CreatorAITools. All rights reserved.
              {process.env.NEXT_PUBLIC_BUILD_SHA && (
                <span className="block text-[10px] text-brand-outline/20 mt-1" data-build={process.env.NEXT_PUBLIC_BUILD_SHA}>
                  v{process.env.NEXT_PUBLIC_BUILD_SHA}
                </span>
              )}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
