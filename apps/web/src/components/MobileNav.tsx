'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger button — only visible on mobile (< sm) */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        <span className={`block w-6 h-0.5 bg-brand-outline/70 transition-transform duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-brand-outline/70 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-brand-outline/70 transition-transform duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="sm:hidden fixed inset-0 top-16 z-40">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />

          {/* Menu panel */}
          <div className="relative bg-white border-b border-brand-green/15 shadow-lg">
            <div className="flex flex-col py-2">
              {links.map((link) => {
                const isActive = pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-6 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'text-brand-green-deep bg-brand-green/10'
                        : 'text-brand-outline/70 hover:text-brand-green-deep hover:bg-brand-green/5'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
