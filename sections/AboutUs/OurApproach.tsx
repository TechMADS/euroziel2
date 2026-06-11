'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Pill({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <span
      className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
      style={{
        background: 'rgba(74,144,217,0.12)',
        border: '1px solid rgba(74,144,217,0.30)',
        color: '#4A90D9',
      }}
    >
      {children}
    </span>
  );
}

// Icons
function GermanyIcon({ color = '#4A90D9', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C14 4 15 8 15 12C15 16 14 20 12 22" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C10 4 9 8 9 12C9 16 10 20 12 22" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function HonestyIcon({ color = '#f87171', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth="1.5"/>
      <path d="M8 8L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 8L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function EndToEndIcon({ color = '#c084fc', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M12 6V12L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2C10 4 9 6 9 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DiffCard({ icon: Icon, title, body, accent, isDark, delay }: { 
  icon: React.ComponentType<{ color?: string; size?: number }>;
  title: string; body: string; accent: string; isDark: boolean; delay: number;
}) {
  const surface = isDark ? '#0d2540' : '#ffffff';
  const border = isDark ? 'rgba(74,144,217,0.18)' : 'rgba(74,144,217,0.20)';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.65)' : 'rgba(30,50,80,0.62)';

  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="h-full rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 group"
        style={{ background: surface, border: `1px solid ${border}` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = isDark ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}44` : `0 8px 40px rgba(74,144,217,0.14), 0 0 0 1px ${accent}44`;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(74,144,217,0.07)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
          <Icon color={accent} size={26} />
        </div>
        <div>
          <h3 className="font-serif font-bold text-[20px] mb-3" style={{ color: text }}>{title}</h3>
          <p className="text-[16px] leading-relaxed" style={{ color: sub }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function OurApproachSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const surfaceAlt = isDark ? 'rgba(13,37,64,0.5)' : 'rgba(74,144,217,0.04)';
  const border = isDark ? 'rgba(74,144,217,0.15)' : 'rgba(74,144,217,0.18)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: surfaceAlt, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <Pill isDark={isDark}>OUR APPROACH</Pill>
            <h2 className="font-serif font-bold mt-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
              Germany focused. Nothing else.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DiffCard delay={0} accent="#4A90D9" isDark={isDark} icon={GermanyIcon}
            title="Germany Only"
            body="We work exclusively on Germany and European pathways. Not the US. Not the UK. Not Canada. Every piece of advice we give comes from deep and current knowledge of the German system specifically."
          />
          <DiffCard delay={80} accent="#f87171" isDark={isDark} icon={HonestyIcon}
            title="Honest From Day One"
            body="If your profile is not competitive, we tell you that in the first conversation. If your language score needs more work, we say that clearly. Honest assessment at the start saves months of wasted effort."
          />
          <DiffCard delay={160} accent="#c084fc" isDark={isDark} icon={EndToEndIcon}
            title="End To End, Not Just The Beginning"
            body="We consider the job done when you are registered at your university, enrolled in health insurance, Anmeldung complete, bank account open, and actually settled in Germany."
          />
        </div>
      </div>
    </section>
  );
}