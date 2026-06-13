'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const CARDS = [
  {
    icon: '📋',
    title: 'APS Processing',
    body: 'APS timelines can vary significantly based on document load and season. Starting early is not optional — it is essential.',
    accent: '#4A90D9',
    stat: '8–12 weeks',
    statLabel: 'avg. APS processing time',
  },
  {
    icon: '🏛️',
    title: 'Public Universities',
    body: 'Germany is home to globally recognised public universities with strong industry connections and zero or minimal tuition fees.',
    accent: '#6C63FF',
    stat: '400+',
    statLabel: 'accredited universities',
  },
  {
    icon: '🗣️',
    title: 'Language Advantage',
    body: 'German language skills significantly improve your chances at internships, part-time jobs, and long-term career opportunities.',
    accent: '#0ABFA3',
    stat: 'B1–B2',
    statLabel: 'recommended level for daily life',
  },
  {
    icon: '💼',
    title: 'Career Opportunities',
    body: 'Germany offers strong demand across engineering, IT, healthcare, business, and technical sectors with an 18-month job seeker visa.',
    accent: '#F59E0B',
    stat: '18 months',
    statLabel: 'post-study job seeker visa',
  },
  {
    icon: '🤝',
    title: 'Student Networking',
    body: 'Building the right student and professional network early makes settling, finding housing, and landing internships considerably easier.',
    accent: '#EC4899',
    stat: '1M+',
    statLabel: 'international students in Germany',
  },
  {
    icon: '🗓️',
    title: 'Structured Planning',
    body: 'Students who begin planning 12+ months in advance consistently experience smoother admissions, visa processing, and arrival.',
    accent: '#22C55E',
    stat: '12 months',
    statLabel: 'ideal planning head-start',
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

function InsightCard({ card, index, isDark }: { card: typeof CARDS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-6px)' : 'translateY(0)'
          : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 70}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
        background: hovered
          ? isDark ? `linear-gradient(135deg, ${card.accent}18, ${card.accent}08)` : `linear-gradient(135deg, ${card.accent}12, ${card.accent}05)`
          : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.80)',
        border: `1px solid ${hovered ? card.accent + '40' : card.accent + '20'}`,
        boxShadow: hovered
          ? `0 12px 40px ${card.accent}20`
          : isDark ? '0 2px 12px rgba(0,0,0,0.20)' : '0 2px 12px rgba(74,144,217,0.06)',
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          background: `${card.accent}18`,
          border: `1px solid ${card.accent}30`,
        }}
      >
        {card.icon}
      </div>

      {/* Stat */}
      <div>
        <div className="font-serif font-bold text-[28px] leading-none mb-0.5" style={{ color: card.accent }}>
          {card.stat}
        </div>
        <div className="text-[11px] uppercase tracking-wider" style={{ color: sub }}>
          {card.statLabel}
        </div>
      </div>

      {/* Title + body */}
      <div>
        <h3 className="font-serif font-bold mb-2 text-[17px]" style={{ color: text }}>
          {card.title}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: sub }}>
          {card.body}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 rounded-full mt-auto transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${card.accent}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          width: hovered ? '100%' : '40%',
        }}
      />
    </div>
  );
}

export default function ProcessInsights() {
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
      className="relative py-28 px-5 sm:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #061628 0%, #030e1c 100%)'
          : 'linear-gradient(180deg, #f5faff 0%, #eef7ff 100%)',
      }}
    >
      {/* Header */}
      <div
        ref={ref}
        className="max-w-2xl mx-auto text-center mb-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ color: '#4A90D9', background: 'rgba(74,144,217,0.10)', border: '1px solid rgba(74,144,217,0.22)' }}>
          Germany Journey Insights
        </span>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          What You Should Know{' '}
          <span style={{ color: '#4A90D9' }}>Before You Begin</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
          Real numbers and honest context from students and professionals already in Germany.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((card, i) => (
          <InsightCard key={i} card={card} index={i} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}