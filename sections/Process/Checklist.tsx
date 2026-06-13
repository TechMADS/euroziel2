'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const ITEMS = [
  { label: 'APS Certificate Obtained', stage: 'Month 1–2' },
  { label: 'IELTS / German Language Requirement Completed', stage: 'Month 2–4' },
  { label: 'SOP Finalized & Reviewed', stage: 'Month 2–4' },
  { label: 'LORs Prepared on Official Letterhead', stage: 'Month 2–4' },
  { label: 'European Format CV Updated', stage: 'Month 2–4' },
  { label: 'University Applications Submitted', stage: 'Month 5–7' },
  { label: 'Offer Letter Received', stage: 'Month 7–8' },
  { label: 'Blocked Account Funded', stage: 'Month 8–9' },
  { label: 'Health Insurance Confirmed', stage: 'Month 8–9' },
  { label: 'Student Visa Approved', stage: 'Month 8–9' },
  { label: 'Accommodation Secured', stage: 'Month 10–12' },
  { label: 'Flight Tickets Booked', stage: 'Month 10–12' },
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

export default function ProcessChecklist() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(Array(ITEMS.length).fill(false));
  const { ref, visible } = useReveal();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const checkedCount = checked.filter(Boolean).length;
  const progress = (checkedCount / ITEMS.length) * 100;

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section
      className="relative py-28 px-5 sm:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #030e1c 0%, #0b1323 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #f5faff 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#0f4c8f', background: 'rgba(15,76,143,0.10)', border: '1px solid rgba(15,76,143,0.22)' }}>
            Pre-Departure Checklist
          </span>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: text }}>
            Your Germany{' '}
            <span style={{ color: '#22C55E' }}>Readiness Checklist</span>
          </h2>
          <p style={{ color: sub, fontSize: '16px' }}>
            Track every critical milestone before you board that flight.
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(15,76,143,0.15)',
            boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(15,76,143,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold" style={{ color: text }}>
              {checkedCount} of {ITEMS.length} completed
            </span>
            <span className="text-[13px] font-bold" style={{ color: progress === 100 ? '#22C55E' : '#0f4c8f' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(15,76,143,0.12)' : 'rgba(15,76,143,0.15)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: progress === 100
                  ? 'linear-gradient(90deg, #22C55E, #16a34a)'
                  : 'linear-gradient(90deg, #0f4c8f, #6C63FF)',
              }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-[13px] font-semibold mt-3" style={{ color: '#22C55E' }}>
              🎉 You're ready for Germany!
            </p>
          )}
        </div>

        {/* Checklist items */}
        <div className="space-y-3">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              className="flex items-center gap-4 rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 group"
              style={{
                background: checked[i]
                  ? isDark ? 'rgba(34,197,94,0.08)' : 'rgba(34,197,94,0.07)'
                  : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.80)',
                border: checked[i]
                  ? '1px solid rgba(34,197,94,0.30)'
                  : '1px solid rgba(15,76,143,0.12)',
                transform: 'translateX(0)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
            >
              {/* Checkbox */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: checked[i] ? '#22C55E' : 'transparent',
                  border: checked[i] ? '2px solid #22C55E' : '2px solid rgba(15,76,143,0.40)',
                }}
              >
                {checked[i] && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-[14px] font-medium transition-all duration-200"
                  style={{
                    color: checked[i] ? (isDark ? 'rgba(134,239,172,0.80)' : '#166534') : text,
                    textDecoration: checked[i] ? 'line-through' : 'none',
                  }}
                >
                  {item.label}
                </p>
              </div>

              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: isDark ? 'rgba(15,76,143,0.10)' : 'rgba(15,76,143,0.08)',
                  color: isDark ? 'rgba(200,220,245,0.50)' : 'rgba(30,50,80,0.45)',
                }}
              >
                {item.stage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}