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
function AcademicCapIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 12V16L12 19L18 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function UsersIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M23 21V19C22.8 16.9 21.5 15.5 19 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C18.3 3.55 20 5.52 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BriefcaseIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 11v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ShieldIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6V12C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12V6L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="0.5" fill={color} stroke={color} strokeWidth="1"/>
    </svg>
  );
}

function NetworkMapVisualization({ isDark }: { isDark: boolean }) {
  const nodes = [
    { city: 'TU Munich', x: 22, y: 30, r: 7, students: 8 },
    { city: 'RWTH Aachen', x: 42, y: 15, r: 6, students: 6 },
    { city: 'TU Berlin', x: 65, y: 25, r: 7, students: 10 },
    { city: 'Hamburg', x: 78, y: 48, r: 5, students: 4 },
    { city: 'Frankfurt', x: 55, y: 60, r: 6, students: 7 },
    { city: 'Stuttgart', x: 30, y: 65, r: 5, students: 5 },
    { city: 'Cologne', x: 15, y: 55, r: 5, students: 4 },
    { city: 'Dresden', x: 80, y: 40, r: 4, students: 3 },
    { city: 'Heidelberg', x: 48, y: 48, r: 4, students: 3 },
  ];

  return (
    <div className="relative w-full h-72 overflow-hidden rounded-2xl" style={{ background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(74,144,217,0.02)' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
        {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => {
          const distance = Math.hypot(n.x - m.x, n.y - m.y);
          if (distance < 30) return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#4A90D9" strokeWidth="0.4" opacity="0.25" strokeDasharray="1 3" />;
          return null;
        }))}
        {nodes.map((n) => (
          <g key={n.city}>
            <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill="#4A90D9" opacity="0.04" />
            <circle cx={n.x} cy={n.y} r={n.r * 1.4} fill="#4A90D9" opacity="0.1" />
            <circle cx={n.x} cy={n.y} r={n.r * 0.7} fill="#4A90D9" opacity="0.9" />
            <circle cx={n.x - n.r * 0.15} cy={n.y - n.r * 0.15} r={n.r * 0.2} fill="#fff" opacity="0.6" />
            <text x={n.x} y={n.y + n.r + 4} textAnchor="middle" fontSize="3.2" fontWeight="bold" fill={isDark ? 'rgba(200,220,245,0.7)' : 'rgba(30,50,80,0.65)'}>{n.city}</text>
            <rect x={n.x + n.r - 2} y={n.y - n.r - 3} width={n.students > 9 ? 7 : 5.5} height={4.5} rx={1.5} fill="#4A90D9" opacity="0.8" />
            <text x={n.x + n.r + (n.students > 9 ? 0.2 : 0.5)} y={n.y - n.r - 0.2} textAnchor="middle" fontSize="2.2" fill="#fff" fontWeight="bold">{n.students}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

interface NetworkMapSectionProps {
  variant?: 'full' | 'compact';
  showTitle?: boolean;
}

export default function NetworkMapSection({ variant = 'full', showTitle = true }: NetworkMapSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const surfaceAlt = isDark ? 'rgba(13,37,64,0.5)' : 'rgba(74,144,217,0.04)';
  
  if (!mounted) return null;
  
  if (variant === 'compact') {
    return (
      <section className="py-16 px-5" style={{ background: surfaceAlt }}>
        <div className="max-w-4xl mx-auto">
          {showTitle && (
            <div className="text-center mb-8">
              <Pill isDark={isDark}>LIVE NETWORK</Pill>
              <h2 className="font-serif font-bold mt-4 text-2xl" style={{ color: text }}>Our Student Network</h2>
            </div>
          )}
          <NetworkMapVisualization isDark={isDark} />
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-24 px-5 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <Reveal>
          <Pill isDark={isDark}>LIVE NETWORK</Pill>
          <h2 className="font-serif font-bold mt-5 mb-4" style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', color: text }}>
            Students and professionals across Germany
          </h2>
          <p className="text-[17px] leading-relaxed mx-auto" style={{ color: sub, maxWidth: '56ch' }}>
            Our peer network spans German university cities — people you can actually speak to, not brochures you can download.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <NetworkMapVisualization isDark={isDark} />
      </Reveal>

      <Reveal delay={150}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
          <div className="text-center p-4 rounded-xl" style={{ background: surfaceAlt }}>
            <div className="flex justify-center mb-3"><AcademicCapIcon color="#4A90D9" size={28} /></div>
            <div className="font-serif font-bold text-2xl" style={{ color: '#4A90D9' }}>9+</div>
            <div className="text-[13px]" style={{ color: sub }}>German Cities</div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ background: surfaceAlt }}>
            <div className="flex justify-center mb-3"><UsersIcon color="#4A90D9" size={28} /></div>
            <div className="font-serif font-bold text-2xl" style={{ color: '#4A90D9' }}>50+</div>
            <div className="text-[13px]" style={{ color: sub }}>Active Students</div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ background: surfaceAlt }}>
            <div className="flex justify-center mb-3"><BriefcaseIcon color="#4A90D9" size={28} /></div>
            <div className="font-serif font-bold text-2xl" style={{ color: '#4A90D9' }}>15+</div>
            <div className="text-[13px]" style={{ color: sub }}>Working Professionals</div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ background: surfaceAlt }}>
            <div className="flex justify-center mb-3"><ShieldIcon color="#4A90D9" size={28} /></div>
            <div className="font-serif font-bold text-2xl" style={{ color: '#4A90D9' }}>24/7</div>
            <div className="text-[13px]" style={{ color: sub }}>Peer Support</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}