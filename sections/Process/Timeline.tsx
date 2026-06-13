'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const MONTHS = [
  {
    range: 'Month 1–2',
    title: 'Discovery, Planning & APS',
    tag: 'Foundation',
    tagColor: '#0f4c8f',
    icon: '🔍',
    description: 'Your journey begins with understanding your profile, goals, and the right pathway for Germany.',
    items: [
      'Free Profile Evaluation',
      'Career & Goal Mapping',
      'Personalized Germany Roadmap',
      'University & Course Shortlisting',
      'APS Documentation Support',
      'APS Application Filing',
    ],
  },
  {
    range: 'Month 2–4',
    title: 'Language, SOP, LOR & CV',
    tag: 'Profile Building',
    tagColor: '#6C63FF',
    icon: '📝',
    description: 'Strengthen your profile and initiate essential documentation processes.',
    items: [
      'IELTS / German Language Coaching',
      'SOP Planning & Initial Drafting',
      'LOR Collection Guidance',
      'European Format CV Preparation',
      'SOP Review & Refinement',
    ],
  },
  {
    range: 'Month 4–5',
    title: 'GRE, GMAT & Documentation',
    tag: 'Preparation',
    tagColor: '#0ABFA3',
    icon: '📊',
    description: 'Prepare strong, professional application materials aligned with German university standards.',
    items: [
      'GRE / GMAT Preparation Guidance',
      'Academic Profile Evaluation',
      'uni-assist Account & Portal Setup',
      'APS & Application Documentation',
      'Application Readiness & Submission',
    ],
  },
  {
    range: 'Month 5–7',
    title: 'University Applications',
    tag: 'Submission',
    tagColor: '#f59e0b',
    icon: '🎯',
    description: 'Applications strategically submitted based on deadlines, profile fit, and admission potential.',
    items: [
      'University Application Submission',
      'uni-assist Handling',
      'Deadline Tracking',
      'Application Status Monitoring',
    ],
    alert: 'Winter Intake deadlines close around July 15 for most public universities.',
  },
  {
    range: 'Month 7–8',
    title: 'Offers & Financial Planning',
    tag: 'Decision',
    tagColor: '#EC4899',
    icon: '📬',
    description: 'Once offers arrive, we help you evaluate universities and make informed decisions.',
    items: [
      'Offer Letter Evaluation',
      'Admission Acceptance Guidance',
      'Scholarship & Funding Guidance',
      'Final University Selection',
    ],
  },
  {
    range: 'Month 8–9',
    title: 'Blocked Account, Insurance & Visa',
    tag: 'Visa Stage',
    tagColor: '#EF4444',
    icon: '🛂',
    description: 'Full documentation support for your German student visa process.',
    items: [
      'Blocked Account (Sperrkonto) Guidance',
      'Health Insurance Support',
      'Visa Documentation Preparation',
      'Embassy Appointment Assistance',
    ],
    alert: 'Blocked account requirement: approximately €11,904 for Germany student visa.',
  },
  {
    range: 'Month 10–12',
    title: 'Pre-Departure & Germany Arrival',
    tag: 'Final Stage',
    tagColor: '#22C55E',
    icon: '✈️',
    description: 'The final stage prepares you for a smooth transition into Germany.',
    items: [
      'Visa Approval & Passport Collection',
      'Accommodation Confirmation',
      'Pre-Departure Orientation',
      'Travel Planning & Settlement Guidance',
    ],
    finale: 'Fly to Germany with confidence and the EuroZiel network behind you.',
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

function TimelineCard({ month, index, isDark }: { month: typeof MONTHS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <div
      ref={ref}
      className="relative flex flex-col lg:flex-row items-start lg:items-center gap-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      {/* Left spacer / content (desktop) */}
      <div className={`hidden lg:flex flex-col w-[calc(50%-32px)] ${isEven ? 'items-end pr-10 text-right' : 'order-last items-start pl-10 text-left'}`}>
        {isEven && <CardContent month={month} isDark={isDark} text={text} sub={sub} align="right" />}
      </div>

      {/* Center node */}
      <div className="hidden lg:flex flex-col items-center w-16 flex-shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 flex-shrink-0"
          style={{
            background: isDark
              ? `radial-gradient(circle, ${month.tagColor}22, ${month.tagColor}10)`
              : `radial-gradient(circle, ${month.tagColor}18, ${month.tagColor}08)`,
            border: `2px solid ${month.tagColor}55`,
            boxShadow: `0 0 20px ${month.tagColor}30`,
          }}
        >
          {month.icon}
        </div>
      </div>

      {/* Right content (desktop) */}
      <div className={`hidden lg:flex flex-col w-[calc(50%-32px)] ${isEven ? 'order-last items-start pl-10' : 'items-end pr-10 text-right'}`}>
        {!isEven && <CardContent month={month} isDark={isDark} text={text} sub={sub} align="left" />}
      </div>

      {/* Mobile: always stacked */}
      <div className="flex lg:hidden items-start gap-4 w-full">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-1"
          style={{
            background: isDark ? `${month.tagColor}18` : `${month.tagColor}12`,
            border: `2px solid ${month.tagColor}50`,
          }}
        >
          {month.icon}
        </div>
        <div className="flex-1">
          <CardContent month={month} isDark={isDark} text={text} sub={sub} align="left" />
        </div>
      </div>
    </div>
  );
}

function CardContent({
  month, isDark, text, sub, align,
}: {
  month: typeof MONTHS[0];
  isDark: boolean;
  text: string;
  sub: string;
  align: 'left' | 'right';
}) {
  return (
    <div
      className="rounded-2xl p-6 w-full"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.80)',
        border: `1px solid ${month.tagColor}25`,
        boxShadow: isDark
          ? `0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px ${month.tagColor}15`
          : `0 4px 24px rgba(15,76,143,0.08)`,
      }}
    >
      {/* Range + tag */}
      <div className={`flex items-center gap-2 mb-3 flex-wrap ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: month.tagColor }}>
          {month.range}
        </span>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${month.tagColor}18`, color: month.tagColor }}
        >
          {month.tag}
        </span>
      </div>

      <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(17px,2vw,21px)', color: text }}>
        {month.title}
      </h3>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: sub }}>
        {month.description}
      </p>

      {/* Items */}
      <ul className={`space-y-1.5 ${align === 'right' ? 'text-right' : 'text-left'}`}>
        {month.items.map((item, i) => (
          <li key={i} className={`flex items-center gap-2 text-[13px] ${align === 'right' ? 'flex-row-reverse' : ''}`} style={{ color: sub }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: month.tagColor }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Alert box */}
      {month.alert && (
        <div
          className="mt-4 px-4 py-2.5 rounded-xl text-[12px] font-medium"
          style={{
            background: isDark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.18)',
            border: '1px solid rgba(245,158,11,0.30)',
            color: isDark ? '#f59e0b' : '#92650a',
          }}
        >
          ⚠️ {month.alert}
        </div>
      )}

      {/* Finale box */}
      {month.finale && (
        <div
          className="mt-4 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-center"
          style={{
            background: 'rgba(34,197,94,0.10)',
            border: '1px solid rgba(34,197,94,0.28)',
            color: isDark ? '#86efac' : '#166534',
          }}
        >
          🎉 {month.finale}
        </div>
      )}
    </div>
  );
}

export default function ProcessTimeline() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section
      id="timeline"
      className="relative py-28 px-5 sm:px-8 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0b1323 0%, #030e1c 100%)'
          : 'linear-gradient(180deg, #f5faff 0%, #f8fafc 100%)',
      }}
    >
      {/* Section header */}
      <div className="max-w-2xl mx-auto text-center mb-20">
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ color: '#0f4c8f', background: 'rgba(15,76,143,0.10)', border: '1px solid rgba(15,76,143,0.22)' }}>
          Your Germany Timeline
        </span>
        <h2 className="font-serif font-bold mb-4 leading-tight" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          A Structured Roadmap,{' '}
          <span style={{ color: '#0f4c8f' }}>Month by Month</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub, maxWidth: '52ch', margin: '0 auto' }}>
          From your first consultation to landing in Germany — every stage planned, every document tracked, every decision supported.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical line (desktop only) */}
        <div
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: isDark ? 'rgba(15,76,143,0.15)' : 'rgba(15,76,143,0.20)' }}
          aria-hidden
        />

        <div className="flex flex-col gap-12 lg:gap-16">
          {MONTHS.map((month, i) => (
            <TimelineCard key={i} month={month} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}