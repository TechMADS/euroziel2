// sections/StudyInGermany/SemesterCalendar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const SEMESTERS = [
  {
    season: 'Winter Semester',
    months: 'October Start',
    badge: 'Main Intake',
    badgeColor: '#4A90D9',
    icon: '❄️',
    applicationOpen: 'January',
    deadline: 'July 15',
    description: 'The widest choice of programmes, the most seats, and the most competitive. Start APS and language preparation at least 12 months before October.',
    warning: 'If you are reading this in June and have not started APS yet — you are applying next year.',
  },
  {
    season: 'Summer Semester',
    months: 'April Start',
    badge: 'Limited Intake',
    badgeColor: '#F59E0B',
    icon: '☀️',
    applicationOpen: 'July',
    deadline: 'January 15',
    description: 'Fewer programmes offer a summer intake. Competition is slightly lower because fewer students know about it. Good option if your profile is strong.',
    warning: null,
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

function SemesterCard({ sem, index, isDark }: { sem: typeof SEMESTERS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <div
      ref={ref}
      className="rounded-2xl p-7 flex flex-col gap-5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.88)',
        border: `1px solid ${sem.badgeColor}30`,
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(74,144,217,0.08)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{sem.icon}</span>
          <div>
            <h3 className="font-serif font-bold text-[18px]" style={{ color: text }}>
              {sem.season}
            </h3>
            <p className="text-[13px] font-semibold" style={{ color: sem.badgeColor }}>
              {sem.months}
            </p>
          </div>
        </div>
        <span
          className="text-[11px] font-bold px-3 py-1 rounded-full flex-shrink-0"
          style={{ background: `${sem.badgeColor}18`, color: sem.badgeColor, border: `1px solid ${sem.badgeColor}30` }}
        >
          {sem.badge}
        </span>
      </div>

      <p className="text-[13px] leading-relaxed" style={{ color: sub }}>
        {sem.description}
      </p>

      {/* Dates row */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl px-4 py-3 text-center"
          style={{ background: isDark ? 'rgba(74,144,217,0.08)' : 'rgba(74,144,217,0.07)', border: '1px solid rgba(74,144,217,0.15)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(74,144,217,0.70)' }}>
            Applications Open
          </p>
          <p className="font-serif font-bold text-[15px]" style={{ color: text }}>
            {sem.applicationOpen}
          </p>
        </div>
        <div
          className="rounded-xl px-4 py-3 text-center"
          style={{ background: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.20)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(239,68,68,0.70)' }}>
            Deadline
          </p>
          <p className="font-serif font-bold text-[15px]" style={{ color: '#EF4444' }}>
            {sem.deadline}
          </p>
        </div>
      </div>

      {/* Warning */}
      {sem.warning && (
        <div
          className="rounded-xl px-4 py-3 text-[12px] font-medium"
          style={{
            background: isDark ? 'rgba(255,217,125,0.08)' : 'rgba(255,217,125,0.18)',
            border: '1px solid rgba(255,217,125,0.30)',
            color: isDark ? '#FFD97D' : '#92650a',
          }}
        >
          ⚠️ {sem.warning}
        </div>
      )}
    </div>
  );
}

export default function StudySemesterCalendar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: adviceRef, visible: adviceVisible } = useReveal();

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
          ? 'linear-gradient(180deg, #030e1c 0%, #061628 100%)'
          : 'linear-gradient(180deg, #eef7ff 0%, #f5faff 100%)',
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
          Semester Calendar
        </span>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          When to Apply &{' '}
          <span style={{ color: '#FFD97D' }}>Why Timing Is Everything</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
          Missing a deadline does not mean waiting a few weeks. It means waiting a full year.
        </p>
      </div>

      {/* Semester cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SEMESTERS.map((sem, i) => (
          <SemesterCard key={i} sem={sem} index={i} isDark={isDark} />
        ))}
      </div>

      {/* Honest advice box */}
      <div
        ref={adviceRef}
        className="max-w-3xl mx-auto"
        style={{
          opacity: adviceVisible ? 1 : 0,
          transform: adviceVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="rounded-2xl px-8 py-7"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #0d2540, #061628)'
              : 'linear-gradient(135deg, #e8f4ff, #f0f8ff)',
            border: '1px solid rgba(74,144,217,0.22)',
          }}
        >
          <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: '#4A90D9' }}>
            The Honest Advice
          </p>
          <p className="text-[16px] leading-relaxed mb-3" style={{ color: text }}>
            Start the process the moment you have made the decision. Not when your final semester results are out. Not after the holidays.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            {[
              { label: 'APS Processing', time: 'Up to 3 months', color: '#EF4444' },
              { label: 'Language to B2', time: '10–14 months', color: '#F59E0B' },
              { label: 'Application Window', time: '2–3 months', color: '#4A90D9' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 rounded-xl px-4 py-3 text-center"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.70)',
                  border: `1px solid ${item.color}25`,
                }}
              >
                <div className="font-serif font-bold text-[15px] mb-0.5" style={{ color: item.color }}>
                  {item.time}
                </div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: sub }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[13px] mt-5 font-medium" style={{ color: sub }}>
            The students who get to Germany on time are the ones who started earlier than felt necessary.
          </p>
        </div>
      </div>
    </section>
  );
}