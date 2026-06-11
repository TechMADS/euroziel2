'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { openEnquiryModal } from '@/lib/enquiryModal';

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

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  
  if (!mounted) return null;
  
  return (
    <section className="relative pt-40 pb-24 px-5 sm:px-8 max-w-5xl mx-auto text-center">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse, rgba(74,144,217,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(74,144,217,0.10) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <Reveal>
        <Pill isDark={isDark}>ABOUT EUROZIEL</Pill>
      </Reveal>

      <Reveal delay={80}>
        <h1
          className="font-serif font-bold mt-6 mb-6 leading-[1.2]"
          style={{
            fontSize: 'clamp(42px, 7vw, 72px)',
            color: text,
          }}
        >
          Not a consultancy that{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #4A90D9, #7ED8A4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            read about Germany.
          </span>
          <br />
          Connected to people{' '}
          <span style={{ color: '#FFD97D' }}>living it right now.</span>
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={openEnquiryModal}
            className="rounded-full px-8 py-4 text-[16px] font-bold transition-all duration-200 cursor-pointer"
            style={{
              background: '#4A90D9',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(74,144,217,0.38)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(74,144,217,0.50)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(74,144,217,0.38)';
            }}
          >
            Book Free Consultation →
          </button>
          <a
            href="https://wa.me/916382619604"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-[16px] font-semibold transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: sub,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = text;
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.13)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = sub;
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            }}
          >
            Chat on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}