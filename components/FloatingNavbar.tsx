'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import FloatingThemeToggle from './FloatingThemeToggle';
import { openEnquiryModal } from '@/lib/enquiryModal';

const navLinks = [
  { href: '/',                label: 'Home' },
  { href: '/about',           label: 'About Us' },
  { href: '/services',        label: 'Services' },
  { href: '/process',         label: 'Process' },
  { href: '/study-in-germany',label: 'Study in Germany' },
  { href: '/faqs',            label: 'FAQs' },
];

export default function FloatingNavbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const pathname   = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!mounted) return null;

  const isDark    = resolvedTheme === 'dark';
  const navBg     = isDark ? '15,23,42' : '255,255,255';
  const shadowRgb = isDark ? '15,23,42' : '74,144,217';

  const linkStyle = (isActive: boolean) => ({
    color:      isActive ? '#ffffff' : isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.70)',
    background: isActive ? '#4A90D9' : 'transparent',
    fontWeight: isActive ? 600 : 400,
  });

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-0.5 mt-5 px-3 py-2 rounded-full transition-all duration-300"
        style={{
          background:       scrolled ? `rgba(${navBg},0.96)` : `rgba(${navBg},0.80)`,
          backdropFilter:   'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:           '1px solid rgba(74,144,217,0.18)',
          boxShadow:        scrolled
            ? `0 8px 32px rgba(${shadowRgb},0.14)`
            : `0 4px 16px rgba(${shadowRgb},0.08)`,
        }}
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-3.5 py-1.5 rounded-full text-[13px] transition-all duration-200 whitespace-nowrap"
              style={linkStyle(isActive)}
              onMouseEnter={(e) => {
                if (isActive) return;
                e.currentTarget.style.color      = isDark ? '#f0f6ff' : '#1a2a4a';
                e.currentTarget.style.background = 'rgba(74,144,217,0.10)';
              }}
              onMouseLeave={(e) => {
                if (isActive) return;
                e.currentTarget.style.color      = isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.70)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {label}
            </Link>
          );
        })}

        {/* Theme toggle */}
        {/* <div className="ml-1 pl-2" style={{ borderLeft: '1px solid rgba(74,144,217,0.20)' }}>
          <FloatingThemeToggle inline className="scale-90" />
        </div> */}
      </nav>

      {/* ── Mobile navbar ───────────────────────────────────────── */}
      <nav
        className="fixed top-3 left-3 right-3 z-50 flex lg:hidden items-center justify-between px-3 py-2 rounded-2xl transition-all duration-300"
        style={{
          background:           `rgba(${navBg},0.96)`,
          backdropFilter:       'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:               '1px solid rgba(74,144,217,0.18)',
          boxShadow:            `0 4px 16px rgba(${shadowRgb},0.10)`,
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div style={{ width: 'clamp(48px,22vw,110px)', height: 'auto' }}>
            <Image
              src="/images/logo/logo2.svg"
              alt="EuroZiel Logo"
              width={110}
              height={40}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <FloatingThemeToggle inline className="scale-90" />

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 p-1.5 rounded-lg"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  width:     i === 1 ? '14px' : '20px',
                  background: isDark ? 'rgba(200,220,245,0.85)' : 'rgba(30,50,80,0.80)',
                  transform:
                    menuOpen
                      ? i === 0 ? 'rotate(45deg) translateY(6px)'
                      : i === 2 ? 'rotate(-45deg) translateY(-6px)'
                      : 'none'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="fixed top-[72px] left-3 right-3 z-40 lg:hidden rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background:           `rgba(${navBg},0.98)`,
          backdropFilter:       'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:               '1px solid rgba(74,144,217,0.18)',
          boxShadow:            `0 8px 32px rgba(${shadowRgb},0.14)`,
          maxHeight:            menuOpen ? '520px' : '0px',
          opacity:              menuOpen ? 1 : 0,
          pointerEvents:        menuOpen ? 'auto' : 'none',
          transition:           'max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
        }}
      >
        <div className="flex flex-col p-3 gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color:      isActive ? '#ffffff' : isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.70)',
                  background: isActive ? '#4A90D9' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.background = 'rgba(74,144,217,0.10)';
                  e.currentTarget.style.color      = isDark ? '#f0f6ff' : '#1a2a4a';
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color      = isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.70)';
                }}
              >
                {label}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-1" style={{ borderTop: '1px solid rgba(74,144,217,0.15)' }} />

          {/* Enquiry CTA in mobile menu */}
          <button
            onClick={() => { setMenuOpen(false); openEnquiryModal(); }}
            className="px-4 py-3 rounded-xl text-sm font-bold text-center transition-all duration-200"
            style={{ background: '#ffd97d', color: '#1a1200' }}
          >
            Book Free Consultation →
          </button>
        </div>
      </div>
    </>
  );
}