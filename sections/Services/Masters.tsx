'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import ImagePlaceholder from '@/components/ImagePlaceholder';

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

function MastersIcon({ color = '#006d9e', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AlertIcon({ color = '#f87171', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 8V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 16H12.01" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function RocketIcon({ color = '#c084fc', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 15L9 18M12 15L15 12M12 15V21M5 19L9 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8L19 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8C7 3 12 2 12 2C12 2 17 3 17 8C17 12 15 15 12 15C9 15 7 12 7 8Z" stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="8" r="1.5" fill={color}/>
    </svg>
  );
}

export default function MastersSection() {
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
    <section className="py-24 px-5 sm:px-8" style={{ background: surfaceAlt, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="space-y-6">
              <div>
                <span className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background: '#006d9e', color: '#fff' }}>
                  MOST POPULAR PATHWAY
                </span>
                <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
                  Master's
                  <br />
                  <span style={{ color: '#c084fc' }}>Programmes</span>
                </h2>
                <p className="text-[18px] leading-relaxed mb-4" style={{ color: sub }}>
                  This is where the majority of Indian students begin their Germany journey — and it is also where the biggest mistakes happen.
                </p>
                <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
                  Wrong university tier for your CGPA. SOP that reads like every other SOP. APS started too late. Language score just below the cutoff. Application submitted to the wrong portal. We have seen strong candidates get rejected not because they were not good enough but because the process was handled carelessly.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg hover-lift">
                <ImagePlaceholder
                  height="300px"
                  icon="🎓"
                  label="Master's Programme Overview"
                />
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="space-y-5">
              <div className="flex gap-4 items-start p-6 rounded-2xl hover-lift" style={{ background: isDark ? 'rgba(15,76,143,0.08)' : 'rgba(15,76,143,0.06)', border: '1px solid rgba(15,76,143,0.15)' }}>
                <MastersIcon color="#006d9e" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Research-Intensive & Global</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: sub }}>Germany's master's programmes are world-class, globally respected, and largely free.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-2xl hover-lift" style={{ background: isDark ? 'rgba(248,113,113,0.06)' : 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
                <AlertIcon color="#f87171" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Common Mistakes We Prevent</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: sub }}>Wrong tier, weak SOP, late APS, missed deadlines — we fix what consultancies get wrong.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-2xl hover-lift" style={{ background: isDark ? 'rgba(192,132,252,0.06)' : 'rgba(192,132,252,0.05)', border: '1px solid rgba(192,132,252,0.15)' }}>
                <RocketIcon color="#c084fc" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Profile-Based Matching</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: sub }}>We identify programmes where you are genuinely competitive and build your documents properly.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}