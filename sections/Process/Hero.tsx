'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { openEnquiryModal } from '@/lib/enquiryModal';

const MISSING = [
  { icon: '🎓', label: 'APS Certificate' },
  { icon: '🗣️', label: 'Language Preparation' },
  { icon: '🏠', label: 'Accommodation' },
  { icon: '💳', label: 'Blocked Account' },
  { icon: '🛂', label: 'Visa Documentation' },
  { icon: '✈️', label: 'Pre-Departure Planning' },
];

export default function ProcessHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % MISSING.length);
    }, 1800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (!mounted) return null;
  const isDark = resolvedTheme === 'dark';

  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-5 pt-32 pb-20 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #020d1a 0%, #0b1323 50%, #0a1f35 100%)'
          : 'linear-gradient(160deg, #eef8ff 0%, #f5faff 50%, #f8fafc 100%)',
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #006d9e 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Floating pill badge */}
      <div className="relative z-10 mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest backdrop-blur-sm"
          style={{
            background: isDark ? 'rgba(8,145,178,0.15)' : 'rgba(0,109,158,0.12)',
            border: '1px solid rgba(8,145,178,0.40)',
            color: isDark ? '#22d3ee' : '#006d9e',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f4c8f] animate-pulse inline-block" />
          EuroZiel · Full Germany Roadmap
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 max-w-4xl text-center mb-8">
        <h1
          className="font-serif font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', color: text }}
        >
          Germany Is More Than{' '}
          <br className="hidden sm:block" />
          <span style={{ color: '#f59e0b' }}>Just an Offer Letter</span>
        </h1>
        <p
          className="mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: sub, maxWidth: '58ch' }}
        >
          Most students think the process ends once they receive an admission. In reality, studying and building a future in Germany involves far more — and we guide you through every single step.
        </p>
      </div>

      {/* Animated "what students miss" cards */}
      <div className="relative z-10 w-full max-w-2xl mb-12">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(15,76,143,0.7)' }}>
          What students often overlook
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {MISSING.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-500"
              style={{
                background: active === i
                  ? isDark ? 'rgba(15,76,143,0.22)' : 'rgba(15,76,143,0.14)'
                  : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,76,143,0.05)',
                border: active === i
                  ? '1px solid rgba(15,76,143,0.50)'
                  : '1px solid rgba(15,76,143,0.14)',
                color: active === i ? (isDark ? '#c8dcf5' : '#1a3a6a') : sub,
                transform: active === i ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="relative z-10 flex flex-wrap gap-4 justify-center">
        <button
          onClick={openEnquiryModal}
          className="rounded-full px-8 py-4 text-[15px] font-bold transition-all duration-200"
          style={{ background: '#f59e0b', color: '#1a1200', boxShadow: '0 4px 24px rgba(245,158,11,0.40)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          Get Your Germany Roadmap →
        </button>
        <a
          href="#timeline"
          className="rounded-full px-8 py-4 text-[15px] font-semibold transition-all duration-200 flex items-center gap-2"
          style={{
            background: isDark ? 'rgba(15,76,143,0.10)' : 'rgba(15,76,143,0.08)',
            border: '1px solid rgba(15,76,143,0.28)',
            color: isDark ? '#c8dcf5' : '#1a3a6a',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(15,76,143,0.18)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(15,76,143,0.10)' : 'rgba(15,76,143,0.08)'; }}
        >
          View Full Timeline ↓
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[11px] uppercase tracking-widest" style={{ color: sub }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#0f4c8f] to-transparent" />
      </div>
    </section>
  );
}
