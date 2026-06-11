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

function GraduationCapIcon({ color = '#4A90D9', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 12V16L12 19L18 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 11V13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 11V13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ZeroFeeIcon({ color = '#7ED8A4', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M8 8L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 8L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="12" y="17" textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">€0</text>
    </svg>
  );
}

export default function BachelorsSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal delay={100} className="order-2 md:order-1">
          <div className="space-y-5">
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.04)' }}>
              <GraduationCapIcon color="#4A90D9" size={28} />
              <div>
                <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Entry Routes Explained</h3>
                <p className="text-[15px]" style={{ color: sub }}>Direct entry, Studienkolleg, or Indian university years — we tell you exactly which applies.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.04)' }}>
              <ZeroFeeIcon color="#7ED8A4" size={28} />
              <div>
                <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Almost Zero Tuition</h3>
                <p className="text-[15px]" style={{ color: sub }}>World-class public universities at almost no tuition fees. Your investment is time and language.</p>
              </div>
            </div>
          </div>
        </Reveal>
        
        <Reveal className="order-1 md:order-2">
          <div>
            <span className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background: '#4A90D9', color: '#fff' }}>
              UNDERGRADUATE PATHWAY
            </span>
            <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
              Bachelor's
              <br />
              <span style={{ color: '#7ED8A4' }}>Programmes</span>
            </h2>
            <p className="text-[18px] leading-relaxed mb-4" style={{ color: sub }}>
              Applying for a bachelor's degree in Germany as an Indian student is a different process compared to master's — and most consultancies do not explain this clearly upfront.
            </p>
            <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
              Your Class 12 certificate alone is usually not enough for direct university entry. Depending on your stream and score, you may need to complete one or two years of university in India first, or go through a Studienkolleg foundation programme in Germany. We assess your exact situation, tell you honestly which route applies to you, and build your application strategy from there.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}