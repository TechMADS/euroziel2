'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

const TESTIMONIALS = [
  {
    quote: 'Unlike other consultancies, EuroZiel actually helped me understand the complete process instead of just submitting applications. Speaking with students already studying in Germany gave me clarity and confidence before making decisions.',
    name: 'Aditya R.',
    role: 'M.Sc Computer Science, Germany',
    initials: 'AR',
    accent: '#0f4c8f',
  },
  {
    quote: 'The biggest difference was honesty. They clearly explained which universities matched my profile and what improvements I needed instead of giving false promises. That transparency saved me months.',
    name: 'Keerthana S.',
    role: 'Mechanical Engineering Student',
    initials: 'KS',
    accent: '#f59e0b',
  },
  {
    quote: 'From APS to accommodation, every step was properly guided. Even after reaching Germany, their peer network helped me settle faster and avoid common mistakes international students face.',
    name: 'Vishnu Prasad',
    role: 'TU Berlin Student',
    initials: 'VP',
    accent: '#7ED8A4',
  },
  {
    quote: 'I was confused about Ausbildung pathways and language requirements. EuroZiel connected me with people who had already gone through the same process, which made everything much easier to understand.',
    name: 'Nithya M.',
    role: 'Healthcare Ausbildung Pathway',
    initials: 'NM',
    accent: '#C084FC',
  },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)].join(',');
}

export default function Testimonials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const sectionBg = isDark
    ? 'linear-gradient(160deg,#0b1323 0%,#0d2540 55%,#0b1323 100%)'
    : 'linear-gradient(160deg,#e8f4fd 0%,#d4eaff 55%,#e8f4fd 100%)';
  const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub = isDark ? 'rgba(200,220,245,0.72)' : 'rgba(30,50,80,0.68)';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.78)';
  const cardBorder = isDark ? 'rgba(15,76,143,0.16)' : 'rgba(15,76,143,0.22)';

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: sectionBg, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(15,76,143,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(15,76,143,0.035) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(15,76,143,0.15)', border: '1px solid rgba(15,76,143,0.35)', letterSpacing: '0.15em', color: '#f59e0b' }}>
            What Our Students Say
          </span>
          <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(26px,4vw,52px)', color: textColor }}>
            Real Experiences from{' '}
            <span style={{ color: '#0f4c8f' }}>Real Students.</span>
          </h2>
          <p className="mt-4 mx-auto leading-relaxed" style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: textSub, maxWidth: '42ch' }}>
            Students who trusted EuroZiel for their Germany journey share what made the difference.
          </p>
        </div>

        {/* Desktop: all 4 cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {TESTIMONIALS.map(({ quote, name, role, initials, accent }, i) => (
            <div key={name}
              className="rounded-2xl p-6 flex flex-col gap-5 transition-all duration-500 cursor-pointer"
              style={{
                background: i === active ? `rgba(${hexToRgb(accent)},0.10)` : cardBg,
                border: `1px solid ${i === active ? `rgba(${hexToRgb(accent)},0.45)` : cardBorder}`,
                boxShadow: i === active ? `0 12px 40px rgba(${hexToRgb(accent)},0.18)` : 'none',
                transform: i === active ? 'translateY(-4px)' : 'translateY(0)',
              }}
              onClick={() => { setActive(i); if (intervalRef.current) clearInterval(intervalRef.current); }}>
              {/* Quote mark */}
              <div className="text-[36px] leading-none font-bold" style={{ color: accent, opacity: 0.5 }}>&ldquo;</div>
              <p className="text-[13px] leading-relaxed flex-1" style={{ color: textSub }}>{quote}</p>
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid rgba(${hexToRgb(accent)},0.18)` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] font-bold"
                  style={{ background: `rgba(${hexToRgb(accent)},0.15)`, border: `1px solid rgba(${hexToRgb(accent)},0.35)`, color: accent }}>
                  {initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: textColor }}>{name}</div>
                  <div className="text-[11px]" style={{ color: textSub }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single active card */}
        <div className="md:hidden mb-8">
          {TESTIMONIALS.map(({ quote, name, role, initials, accent }, i) => (
            <div key={name}
              className="rounded-2xl p-6 flex-col gap-5"
              style={{ display: i === active ? 'flex' : 'none', background: cardBg, border: `1px solid rgba(${hexToRgb(accent)},0.35)` }}>
              <div className="text-[36px] leading-none font-bold" style={{ color: accent, opacity: 0.5 }}>&ldquo;</div>
              <p className="text-[14px] leading-relaxed" style={{ color: textSub }}>{quote}</p>
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid rgba(${hexToRgb(accent)},0.18)` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
                  style={{ background: `rgba(${hexToRgb(accent)},0.15)`, border: `1px solid rgba(${hexToRgb(accent)},0.35)`, color: accent }}>
                  {initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: textColor }}>{name}</div>
                  <div className="text-[11px]" style={{ color: textSub }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? '#0f4c8f' : 'rgba(15,76,143,0.25)' }} />
            ))}
          </div>
        </div>

        {/* Bottom mini-CTA */}
        <div className="text-center">
          <p className="mb-5 text-[15px]" style={{ color: textSub }}>
            Join students building their future in Germany with clarity, confidence, and real guidance.
          </p>
          <a href="#get-started"
            className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 py-3 px-8 text-sm"
            style={{ background: '#0f4c8f', color: '#fff', boxShadow: '0 4px 20px rgba(15,76,143,0.38)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,76,143,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,76,143,0.38)'; }}>
            Read More Stories →
          </a>
        </div>
      </div>
    </section>
  );
}