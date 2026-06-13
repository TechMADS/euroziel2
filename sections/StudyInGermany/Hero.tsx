// sections/StudyInGermany/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { openEnquiryModal } from '@/lib/enquiryModal';

export default function StudyHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section
      className="relative min-h-[94vh] flex flex-col items-center justify-center px-5 pt-32 pb-20 overflow-hidden text-center"
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #020d1a 0%, #061628 55%, #0a1f35 100%)'
          : 'linear-gradient(160deg, #e8f4ff 0%, #f5faff 55%, #eef7ff 100%)',
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4A90D9 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFD97D 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest"
          style={{
            background: isDark ? 'rgba(74,144,217,0.12)' : 'rgba(74,144,217,0.10)',
            border: '1px solid rgba(74,144,217,0.30)',
            color: '#4A90D9',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] animate-pulse inline-block" />
          Study in Germany & Europe
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 max-w-4xl mb-6">
        <h1
          className="font-serif font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(34px, 5.5vw, 68px)', color: text }}
        >
          The degree costs nothing.{' '}
          <br className="hidden sm:block" />
          <span style={{ color: '#FFD97D' }}>The opportunity costs everything</span>{' '}
          if you miss it.
        </h1>
        <p
          className="mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: sub, maxWidth: '60ch' }}
        >
          Germany's public universities charge <strong style={{ color: isDark ? '#f0f6ff' : '#1a2a4a' }}>zero tuition fees</strong> to international students — the same universities that train engineers at Siemens, researchers at BASF, and technologists at SAP. You pay for living. The education is free.
        </p>
      </div>

      {/* CTA row */}
      <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-6">
        <button
          onClick={openEnquiryModal}
          className="rounded-full px-8 py-4 text-[15px] font-bold transition-all duration-200"
          style={{ background: '#FFD97D', color: '#1a1200', boxShadow: '0 4px 24px rgba(255,217,125,0.40)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          Book Free Consultation →
        </button>
        <a
          href="#fields"
          className="rounded-full px-8 py-4 text-[15px] font-semibold transition-all duration-200"
          style={{
            background: isDark ? 'rgba(74,144,217,0.10)' : 'rgba(74,144,217,0.08)',
            border: '1px solid rgba(74,144,217,0.28)',
            color: isDark ? '#c8dcf5' : '#1a3a6a',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,144,217,0.18)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(74,144,217,0.10)' : 'rgba(74,144,217,0.08)'; }}
        >
          Explore Fields ↓
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[11px] uppercase tracking-widest" style={{ color: sub }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#4A90D9] to-transparent" />
      </div>
    </section>
  );
}