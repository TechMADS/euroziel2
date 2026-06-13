// sections/StudyInGermany/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { openEnquiryModal } from '@/lib/enquiryModal';
import ParallaxSection from '@/components/ParallaxSection';

export default function StudyHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <ParallaxSection
      speed={0.4}
      className="relative min-h-[94vh] flex flex-col items-center justify-center px-5 pt-32 pb-20 overflow-hidden text-center"
      id="study-hero"
    >
      <section
        className="relative min-h-[94vh] flex flex-col items-center justify-center px-5 pt-32 pb-20 overflow-hidden text-center w-full"
        style={{
          background: isDark
            ? 'linear-gradient(160deg, #020d1a 0%, #0b1323 55%, #0a1f35 100%)'
            : 'linear-gradient(160deg, #eef8ff 0%, #f5faff 55%, #f8fafc 100%)',
        }}
      >
      {/* Background image with overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/images/study/hero-bg.png" 
          alt="" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, rgba(2,13,26,0.75), rgba(11,19,35,0.85), rgba(10,31,53,0.90))'
              : 'linear-gradient(to bottom, rgba(238,248,255,0.85), rgba(245,250,255,0.90), rgba(248,250,252,0.95))'
          }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden>
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #006d9e 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest backdrop-blur-sm"
          style={{
            background: isDark ? 'rgba(0,109,158,0.15)' : 'rgba(8,145,178,0.12)',
            border: '1px solid rgba(8,145,178,0.40)',
            color: isDark ? '#22d3ee' : '#006d9e',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: isDark ? '#22d3ee' : '#006d9e' }} />
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
          <span style={{ color: '#f59e0b' }}>The opportunity</span> is{' '}
          <span style={{ color: '#0891b2' }}>everything.</span>
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
          style={{ background: '#f59e0b', color: '#1a1200', boxShadow: '0 4px 24px rgba(245,158,11,0.40)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          Book Free Consultation →
        </button>
        <a
          href="#fields"
          className="rounded-full px-8 py-4 text-[15px] font-semibold transition-all duration-200"
          style={{
            background: isDark ? 'rgba(8,145,178,0.12)' : 'rgba(8,145,178,0.10)',
            border: '2px solid rgba(8,145,178,0.35)',
            color: isDark ? '#22d3ee' : '#006d9e',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(8,145,178,0.20)' : 'rgba(8,145,178,0.16)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(8,145,178,0.12)' : 'rgba(8,145,178,0.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          Explore Fields ↓
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[11px] uppercase tracking-widest" style={{ color: sub }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#0f4c8f] to-transparent" />
      </div>
      </section>
    </ParallaxSection>
  );
}
