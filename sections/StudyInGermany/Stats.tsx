// sections/StudyInGermany/Stats.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const STATS = [
  {
    number: '400,000+',
    label: 'International Students',
    context: 'The third largest destination for Indian students after the US and Canada — and growing faster than both.',
    accent: '#006d9e',
    icon: '🎓',
  },
  {
    number: '€0',
    label: 'Tuition Fees',
    context: 'Even the exceptions charge under €3,000/year — less than one semester at a private Indian college.',
    accent: '#059669',
    icon: '🏛️',
  },
  {
    number: '18 months',
    label: 'Post-Study Visa',
    context: 'No other major study destination gives you this much time to find a job without leaving the country.',
    accent: '#7c3aed',
    icon: '🛂',
  },
  {
    number: '1.7 million',
    label: 'Unfilled Skilled Jobs',
    context: 'The government is not just welcoming international graduates — it is actively changing laws to keep them.',
    accent: '#f59e0b',
    icon: '💼',
  },
];

function useReveal(threshold = 0.12) {
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

function StatCard({ stat, index, isDark }: { stat: typeof STATS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-6px)' : 'translateY(0)'
          : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1)`,
        background: hovered
          ? isDark ? `linear-gradient(135deg, ${stat.accent}20, ${stat.accent}08)` : `linear-gradient(135deg, ${stat.accent}14, ${stat.accent}04)`
          : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${hovered ? stat.accent + '45' : stat.accent + '22'}`,
        boxShadow: hovered
          ? `0 16px 48px ${stat.accent}22`
          : isDark ? '0 2px 12px rgba(0,0,0,0.20)' : '0 2px 12px rgba(15,76,143,0.06)',
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: `${stat.accent}18`, border: `1px solid ${stat.accent}30` }}
      >
        {stat.icon}
      </div>

      <div>
        <div
          className="font-serif font-bold leading-none mb-1"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: stat.accent }}
        >
          {stat.number}
        </div>
        <div className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: text }}>
          {stat.label}
        </div>
      </div>

      <p className="text-[13px] leading-relaxed" style={{ color: sub }}>
        {stat.context}
      </p>

      <div
        className="h-0.5 rounded-full mt-auto transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${stat.accent}, transparent)`,
          opacity: hovered ? 1 : 0.25,
          width: hovered ? '100%' : '35%',
        }}
      />
    </div>
  );
}

export default function StudyStats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { ref, visible } = useReveal();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section
      className="relative py-20 px-5 sm:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0b1323 0%, #030e1c 100%)'
          : 'linear-gradient(180deg, #f5faff 0%, #f8fafc 100%)',
      }}
    >
      <div
        ref={ref}
        className="max-w-2xl mx-auto text-center mb-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full backdrop-blur-sm"
          style={{ color: isDark ? '#22d3ee' : '#006d9e', background: isDark ? 'rgba(8,145,178,0.15)' : 'rgba(0,109,158,0.12)', border: '1px solid rgba(8,145,178,0.40)' }}>
          Why Germany
        </span>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          Numbers That Actually{' '}
          <span style={{ color: '#006d9e' }}>Mean Something</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
          Not marketing statistics. Real figures that change how you think about the decision.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
