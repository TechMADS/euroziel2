// sections/StudyInGermany/CareerProspects.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const CAREER_STATS = [
  {
    number: '€52,000',
    label: 'Average Starting Salary',
    context: 'Not a tech outlier figure. This is the average across all fields for international graduates in Germany.',
    accent: '#4A90D9',
  },
  {
    number: '3.4%',
    label: 'Graduate Unemployment Rate',
    context: 'UK graduate unemployment is over 6%. The US is above 5%. Germany at 3.4% is not a coincidence — it is policy.',
    accent: '#22C55E',
  },
  {
    number: '18 months',
    label: 'Job Seeker Visa',
    context: 'Stay in Germany, keep looking, find the right role. No countdown pressure from your first month after graduation.',
    accent: '#6C63FF',
  },
  {
    number: '1.7 million',
    label: 'Unfilled Skilled Positions',
    context: 'The Skilled Immigration Act (2023) was passed specifically to make it easier for non-EU graduates to stay and work.',
    accent: '#F59E0B',
  },
];

const COMPANIES = [
  'SAP', 'Siemens', 'Bosch', 'BMW', 'Volkswagen',
  'Airbus', 'Allianz', 'BASF', 'Daimler Trucks',
  'Zalando', 'DeepMind Berlin', 'N26', 'Celonis',
];

function useReveal(threshold = 0.10) {
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

function CareerStatCard({ stat, index, isDark }: { stat: typeof CAREER_STATS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  return (
    <div
      ref={ref}
      className="rounded-2xl p-7 flex gap-5 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${stat.accent}25`,
        boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.20)' : '0 2px 12px rgba(74,144,217,0.06)',
      }}
    >
      <div
        className="w-1.5 rounded-full flex-shrink-0 self-stretch"
        style={{ background: stat.accent, minHeight: '60px' }}
      />
      <div>
        <div className="font-serif font-bold mb-1" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: stat.accent }}>
          {stat.number}
        </div>
        <div className="text-[13px] font-semibold uppercase tracking-wider mb-2" style={{ color: text }}>
          {stat.label}
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: sub }}>
          {stat.context}
        </p>
      </div>
    </div>
  );
}

export default function StudyCareerProspects() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: companiesRef, visible: companiesVisible } = useReveal();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section
      className="relative py-28 px-5 sm:px-8 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #061628 0%, #030e1c 100%)'
          : 'linear-gradient(180deg, #f5faff 0%, #eef7ff 100%)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-2xl mx-auto text-center mb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span
          className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ color: '#4A90D9', background: 'rgba(74,144,217,0.10)', border: '1px solid rgba(74,144,217,0.22)' }}
        >
          Career Prospects
        </span>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          What Happens{' '}
          <span style={{ color: '#4A90D9' }}>After You Graduate</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
          The reason Indian students choose Germany over other European countries is not just the free education. It is what comes after.
        </p>
      </div>

      {/* Stats grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {CAREER_STATS.map((stat, i) => (
          <CareerStatCard key={i} stat={stat} index={i} isDark={isDark} />
        ))}
      </div>

      {/* Companies */}
      <div
        ref={companiesRef}
        className="max-w-4xl mx-auto"
        style={{
          opacity: companiesVisible ? 1 : 0,
          transform: companiesVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="rounded-2xl px-8 py-8 text-center"
          style={{
            background: isDark ? 'rgba(74,144,217,0.06)' : 'rgba(74,144,217,0.05)',
            border: '1px solid rgba(74,144,217,0.18)',
          }}
        >
          <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#4A90D9' }}>
            Companies Where EuroZiel Students Now Work
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {COMPANIES.map((company, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-[13px] font-semibold"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.90)',
                  border: '1px solid rgba(74,144,217,0.18)',
                  color: text,
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}