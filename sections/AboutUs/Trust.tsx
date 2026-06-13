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
        color: '#006d9e',
      }}
    >
      {children}
    </span>
  );
}

// Icons
function UsersIcon({ color = '#006d9e', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M23 21V19C22.8 16.9 21.5 15.5 19 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C18.3 3.55 20 5.52 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BriefcaseIcon({ color = '#006d9e', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 11v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GermanyIcon({ color = '#006d9e', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C14 4 15 8 15 12C15 16 14 20 12 22" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C10 4 9 8 9 12C9 16 10 20 12 22" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function ShieldIcon({ color = '#006d9e', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6V12C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12V6L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="0.5" fill={color} stroke={color} strokeWidth="1"/>
    </svg>
  );
}

export default function TrustSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const border = isDark ? 'rgba(15,76,143,0.15)' : 'rgba(15,76,143,0.18)';
  
  if (!mounted) return null;
  
  const trustItems = [
    { title: "Peer Proof", icon: UsersIcon, body: "You hear directly from students at TU Munich, RWTH Aachen, TU Berlin, University of Hamburg, and more. Not brochures. Not recycled success stories. Real people you can speak to.", accent: "#006d9e", delay: 0 },
    { title: "Professional Network", icon: BriefcaseIcon, body: "Our connections extend beyond university campuses. Indian professionals working in Germany across engineering, IT, healthcare, and business give our students an honest picture of what the career landscape actually looks like after graduation.", accent: "#f59e0b", delay: 80 },
    { title: "Germany Only", icon: GermanyIcon, body: "We are not spreading our attention across ten countries. Every resource, connection, and piece of knowledge we have is built around Germany and Europe specifically.", accent: "#7ED8A4", delay: 160 },
    { title: "No Hidden Anything", icon: ShieldIcon, body: "What we offer is on our website. What we charge is discussed upfront. What we cannot help with, we tell you directly instead of pretending otherwise.", accent: "#c084fc", delay: 240 },
  ];
  
  return (
    <section className="py-24 px-5 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Reveal>
          <Pill isDark={isDark}>WHY STUDENTS TRUST US</Pill>
          <h2 className="font-serif font-bold mt-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
            Four things we never compromise on.
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {trustItems.map((item) => (
          <Reveal key={item.title} delay={item.delay}>
            <div className="rounded-2xl p-7 flex gap-6 items-start transition-all duration-300" style={{ background: isDark ? '#0d2540' : '#ffffff', border: `1px solid ${border}` }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
                <item.icon color={item.accent} size={26} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[19px] mb-2" style={{ color: text }}>{item.title}</h3>
                <p className="text-[16px] leading-relaxed" style={{ color: sub }}>{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}