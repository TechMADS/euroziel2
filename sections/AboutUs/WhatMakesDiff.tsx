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
        background: 'rgba(15,76,143,0.12)',
        border: '1px solid rgba(15,76,143,0.30)',
        color: '#0f4c8f',
      }}
    >
      {children}
    </span>
  );
}

// Icons
function UsersIcon({ color = '#0f4c8f', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M23 21V19C22.8 16.9 21.5 15.5 19 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C18.3 3.55 20 5.52 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DomainIcon({ color = '#7ED8A4', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M8 7H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function BridgeIcon({ color = '#f59e0b', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 12C5 8 19 8 22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 12V16C5 17.5 6.5 19 8 19H16C17.5 19 19 17.5 19 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 19V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DiffCard({ icon: Icon, title, body, accent, isDark, delay }: { 
  icon: React.ComponentType<{ color?: string; size?: number }>;
  title: string; body: string; accent: string; isDark: boolean; delay: number;
}) {
  const surface = isDark ? '#0d2540' : '#ffffff';
  const border = isDark ? 'rgba(15,76,143,0.18)' : 'rgba(15,76,143,0.20)';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.65)' : 'rgba(30,50,80,0.62)';

  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="h-full rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 group"
        style={{ background: surface, border: `1px solid ${border}` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = isDark ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}44` : `0 8px 40px rgba(15,76,143,0.14), 0 0 0 1px ${accent}44`;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(15,76,143,0.07)';
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

export default function WhatMakesDiffSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const surfaceAlt = isDark ? 'rgba(13,37,64,0.5)' : 'rgba(15,76,143,0.04)';
  const border = isDark ? 'rgba(15,76,143,0.15)' : 'rgba(15,76,143,0.18)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Reveal>
          <Pill isDark={isDark}>WHAT MAKES US DIFFERENT</Pill>
          <h2 className="font-serif font-bold mt-5 mb-4" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
            You get guidance from people already there
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <DiffCard delay={0} accent="#0f4c8f" isDark={isDark} icon={UsersIcon}
          title="Peer Network Built In"
          body="Not testimonials on a website. Real students at TU Munich, RWTH Aachen, TU Berlin, University of Hamburg, and more — people you can speak to before you decide, during your application, and after you land."
        />
        <DiffCard delay={80} accent="#7ED8A4" isDark={isDark} icon={DomainIcon}
          title="Domain Experts, Not Generalists"
          body="We don't have one counsellor handling everyone. Applying for CS at TU Berlin needs a different strategy than Mechanical at RWTH Aachen. We match you with someone who knows your field."
        />
        <DiffCard delay={160} accent="#f59e0b" isDark={isDark} icon={BridgeIcon}
          title="EuroZiel Is The Bridge"
          body="Between where you are in India and where you want to be in Germany. Between confusion and a clear step-by-step process where nothing falls through the cracks."
        />
      </div>

      <Reveal delay={200}>
        <div className="rounded-2xl p-10 text-center" style={{ background: surfaceAlt, border: `1px solid ${border}` }}>
          <p className="text-[17px] leading-relaxed max-w-3xl mx-auto" style={{ color: sub }}>
            Every student who comes to EuroZiel gets access to something most consultancies simply cannot offer. Direct conversations with Indian students currently enrolled at German public universities and Indian professionals currently working in Europe across different domains and industries. This peer and professional network is built into everything we do at EuroZiel. It is not a feature. It is the foundation.
          </p>
        </div>
      </Reveal>
    </section>
  );
}