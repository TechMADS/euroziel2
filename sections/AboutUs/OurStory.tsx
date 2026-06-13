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

function BridgeLine({ color = '#0f4c8f' }: { color?: string }) {
  const { ref, visible } = useReveal(0.3);
  return (
    <div ref={ref} className="flex items-center gap-3 my-16" aria-hidden>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${color}55)` }} />
      <svg width="32" height="18" viewBox="0 0 28 16" fill="none">
        <path
          d="M2 14 C6 2, 22 2, 26 14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="40"
          strokeDashoffset={visible ? 0 : 40}
          style={{ transition: 'stroke-dashoffset 1s ease 0.2s' }}
        />
        <circle cx="2" cy="14" r="2" fill={color} opacity="0.7" />
        <circle cx="26" cy="14" r="2" fill={color} opacity="0.7" />
      </svg>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${color}55)` }} />
    </div>
  );
}

export default function OurStorySection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8 max-w-3xl mx-auto">
      <Reveal>
        <Pill isDark={isDark}>OUR STORY</Pill>
        <h2
          className="font-serif font-bold mt-5 mb-8 leading-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}
        >
          Why EuroZiel exists
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <div className="space-y-6">
          <p className="text-[18px] leading-relaxed" style={{ color: sub }}>
            Yuvasri Jagadeesan and Sarathkumar Venkateshwaran did not start EuroZiel because they saw a business opportunity. They started it because they watched too many genuinely capable Indian students either give up on Germany entirely or get burned by consultancies that had never actually engaged with the German university system at a real level.
          </p>
          <p className="text-[18px] leading-relaxed" style={{ color: sub }}>
            The problem was never the students. The problem was the guidance. Generic agencies giving the same advice to every student regardless of their background. No one with actual ground level knowledge of what TU Munich expects versus what RWTH Aachen looks for. No one who had sat through an APS documentation process, waited three months for a certificate, or figured out how Anmeldung actually works on arrival.
          </p>
          <p className="text-[18px] leading-relaxed" style={{ color: sub }}>
            So they built something different. Not just a consultancy. A bridge.
          </p>
        </div>
      </Reveal>

      <BridgeLine color="#0f4c8f" />
    </section>
  );
}