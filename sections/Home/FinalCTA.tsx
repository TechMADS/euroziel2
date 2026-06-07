'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function FinalCTA() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const sectionBg = isDark ? '#04111f' : '#f0f8ff';
  const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub = isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.72)';

  return (
    <section className="relative overflow-hidden flex items-center justify-center"
      style={{ background: sectionBg, minHeight: '100vh' }}>
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(74,144,217,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,144,217,0.04) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute" style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(74,144,217,0.10) 0%,transparent 70%)', top: '-15%', right: '-10%' }} />
      <div className="pointer-events-none absolute" style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,217,125,0.08) 0%,transparent 70%)', bottom: '5%', left: '5%' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center py-24">
        {/* Eyebrow */}
        <span className="inline-block mb-6 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.35)', letterSpacing: '0.15em', color: '#ffd97d' }}>
          Your Next Step
        </span>

        {/* Big headline */}
        <h2 className="font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(32px,5.5vw,72px)', color: textColor, letterSpacing: '-0.02em' }}>
          Germany Is A Big Move.{' '}
          <br className="hidden sm:block" />
          <span style={{ color: '#4A90D9' }}>You Should Not Have To</span>
          <br className="hidden sm:block" />
          Figure It Out Alone.
        </h2>

        <p className="mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(15px,1.3vw,19px)', color: textSub, maxWidth: '46ch' }}>
          Get honest guidance, real connections, and a step-by-step pathway built specifically for your profile.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#get-started"
            className="inline-flex items-center gap-2 font-bold rounded-full transition-all duration-300 py-4 px-10 text-base"
            style={{ background: '#ffd97d', color: '#1a1200', boxShadow: '0 6px 32px rgba(255,217,125,0.45)', letterSpacing: '-0.01em' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,217,125,0.60)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(255,217,125,0.45)'; }}>
            Start Your Germany Journey
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works"
            className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 py-4 px-8 text-base"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.22)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}>
            See How It Works
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { val: '98%', label: 'Student Satisfaction' },
            { val: '< 24h', label: 'Response Time' },
            { val: '100%', label: 'Germany Focused' },
            { val: 'Free', label: 'First Consultation' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-[22px] font-bold" style={{ color: '#4A90D9' }}>{val}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider mt-0.5" style={{ color: textSub }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Divider and footnote */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(74,144,217,0.18)' }}>
          <p className="text-[13px]" style={{ color: 'rgba(200,220,245,0.45)' }}>
            No spam. No pressure. Just honest guidance from people who have been there.
          </p>
        </div>
      </div>
    </section>
  );
}