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
      className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm"
      style={{
        background: isDark ? 'rgba(8,145,178,0.15)' : 'rgba(0,109,158,0.12)',
        border: '1px solid rgba(8,145,178,0.40)',
        color: isDark ? '#22d3ee' : '#006d9e',
      }}
    >
      {children}
    </span>
  );
}

function FAQIcon({ color = '#0f4c8f', size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth="1.5"/>
      <path d="M9 9C9 7 10 6 12 6C14 6 15 7 15 9C15 11 13 12 13 13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth="1"/>
    </svg>
  );
}

export default function FAQHeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  
  if (!mounted) return null;
  
  return (
    <section className="relative pt-40 pb-20 px-5 sm:px-8 max-w-5xl mx-auto text-center">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse, rgba(15,76,143,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(15,76,143,0.10) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <Reveal>
        <Pill isDark={isDark}>FREQUENTLY ASKED QUESTIONS</Pill>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex justify-center mb-6">
          <FAQIcon color="#0f4c8f" size={56} />
        </div>
        <h1
          className="font-serif font-bold mt-4 mb-6 leading-[1.2]"
          style={{
            fontSize: 'clamp(42px, 7vw, 72px)',
            color: text,
          }}
        >
          Everything you need to know
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #0f4c8f, #7ED8A4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            about studying in Germany.
          </span>
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p
          className="text-[18px] leading-relaxed mx-auto"
          style={{ color: sub, maxWidth: '56ch' }}
        >
          From Ausbildung and bachelor's to master's, visas, costs, and settling in Germany —
          answered by people who have actually been through it.
        </p>
      </Reveal>
    </section>
  );
}
