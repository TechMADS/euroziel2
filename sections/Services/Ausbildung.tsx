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

function BriefcaseIcon({ color = '#4A90D9', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 11v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill={color}/>
    </svg>
  );
}

function EuroIcon({ color = '#7ED8A4', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 9C5 5.5 8 3 12 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 15C5 18.5 8 21 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="12" r="2" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function CompanyIcon({ color = '#FFD97D', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="14" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M8 6V4H16V6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 10V14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="0.5" fill={color}/>
    </svg>
  );
}

export default function AusbildungSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const surfaceAlt = isDark ? 'rgba(13,37,64,0.5)' : 'rgba(74,144,217,0.04)';
  const border = isDark ? 'rgba(74,144,217,0.15)' : 'rgba(74,144,217,0.18)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: surfaceAlt, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <span className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background: '#4A90D9', color: '#fff' }}>
                MOST UNDERRATED PATHWAY
              </span>
              <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
                Ausbildung
                <br />
                <span style={{ color: '#4A90D9' }}>(Vocational Training)</span>
              </h2>
              <p className="text-[18px] leading-relaxed mb-6" style={{ color: sub }}>
                Most Indian students have never heard of Ausbildung and that is exactly why they miss one of Germany's best kept opportunities.
              </p>
              <p className="text-[16px] leading-relaxed mb-6" style={{ color: sub }}>
                Ausbildung is Germany's dual vocational training system where you split your time between a real company and a vocational school. You are not an intern. You are a registered trainee with a contract, a monthly salary between €600 and €1,200, and a clear qualification at the end.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="space-y-5">
              <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.04)' }}>
                <BriefcaseIcon color="#4A90D9" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Top Companies</h3>
                  <p className="text-[15px]" style={{ color: sub }}>Bosch, BMW, Deutsche Bahn, Siemens — real contracts with real employers.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.04)' }}>
                <EuroIcon color="#7ED8A4" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>Earn While You Learn</h3>
                  <p className="text-[15px]" style={{ color: sub }}>€600-€1,200 monthly salary + guaranteed qualification + direct job pathway.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.04)' }}>
                <CompanyIcon color="#FFD97D" size={28} />
                <div>
                  <h3 className="font-serif font-bold text-[18px] mb-1" style={{ color: text }}>German Language Required</h3>
                  <p className="text-[15px]" style={{ color: sub }}>B1 to B2 needed. We guide you through the entire language and application process.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}