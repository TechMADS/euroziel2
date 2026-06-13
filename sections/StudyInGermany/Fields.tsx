// sections/StudyInGermany/Fields.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const FIELDS = [
  {
    icon: '⚙️',
    title: 'Engineering & Technology',
    accent: '#006d9e',
    image: '/images/study/engineering.png',
    companies: ['Siemens', 'Bosch', 'BASF', 'Volkswagen', 'Airbus'],
    universities: ['TU Munich', 'RWTH Aachen', 'KIT'],
    body: 'Germany is not just an engineering country by reputation. It is where core R&D actually happens. A German engineering degree is recognised in over 50 countries as a benchmark qualification.',
    stat: 'Top 100 globally',
    statLabel: 'TU Munich, RWTH, KIT rankings',
  },
  {
    icon: '💻',
    title: 'Computer Science & IT',
    accent: '#7c3aed',
    image: '/images/study/computer-science.png',
    companies: ['Zalando', 'N26', 'Celonis', 'SAP', 'DeepMind Berlin'],
    universities: ['TU Berlin', 'LMU Munich', 'TU Dresden'],
    body: "Berlin is Europe's fastest growing tech hub with 4,000+ startups. CS programmes combine strong theoretical foundations with mandatory industry internships.",
    stat: '96%+',
    statLabel: 'graduate employment within 6 months',
  },
  {
    icon: '📈',
    title: 'Business & Management',
    accent: '#059669',
    image: '/images/study/business.png',
    companies: ['Deutsche Bank', 'Allianz', 'PwC Germany', 'McKinsey Frankfurt'],
    universities: ['Mannheim', 'Frankfurt School', 'WHU'],
    body: 'The focus is on applied economics, international finance, and supply chain management — not case study competitions. Consistently ranked in Europe\'s top 20.',
    stat: 'Top 20',
    statLabel: 'European business school rankings',
  },
  {
    icon: '🔬',
    title: 'Natural Sciences',
    accent: '#dc2626',
    image: '/images/study/natural-sciences.png',
    companies: ['Max Planck Institute', 'Helmholtz', 'Fraunhofer', 'BASF Research'],
    universities: ['Heidelberg', 'TU Munich', 'Göttingen'],
    body: 'Germany funds more scientific research per capita than almost any country in the world. The DFG alone distributes over €3 billion annually. If you are going into research, Germany is where the funding is.',
    stat: '€3bn+',
    statLabel: 'annual DFG research funding',
  },
  {
    icon: '🎨',
    title: 'Design & Architecture',
    accent: '#0891b2',
    image: '/images/study/student-life.png',
    companies: ['Porsche Design', 'BMW Group Design', 'Adidas', 'Braun'],
    universities: ['Bauhaus-Universität', 'HfG Offenbach', 'UdK Berlin'],
    body: 'The Bauhaus school started in Germany. That legacy runs through every design programme. German design qualifications are among the most respected globally in product design, urban planning, and industrial design.',
    stat: 'Since 1919',
    statLabel: 'Bauhaus design legacy',
  },
  {
    icon: '🏥',
    title: 'Medicine & Health',
    accent: '#f59e0b',
    image: '/images/study/career-prospects.png',
    companies: ['Charité Berlin', 'Heidelberg Hospital', 'Siemens Healthineers'],
    universities: ['Charité – Universitätsmedizin', 'LMU Munich', 'Heidelberg'],
    body: 'A German medical degree is recognised in over 100 countries including the UK, Australia, and the Gulf. Research intensive, hospital integrated, and among the most rigorous in the world.',
    stat: '100+ countries',
    statLabel: 'where the degree is recognised',
  },
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

function FieldCard({ field, index, isDark }: { field: typeof FIELDS[0]; index: number; isDark: boolean }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const chipBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,76,143,0.06)';
  const chipColor = isDark ? 'rgba(200,220,245,0.55)' : 'rgba(30,50,80,0.50)';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col gap-0 transition-all duration-300 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 60}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1)`,
        border: `2px solid ${field.accent}`,
        boxShadow: hovered
          ? `0 12px 40px ${field.accent}40`
          : `0 4px 20px ${field.accent}20`,
      }}
    >
      {/* Image Section */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={field.image} 
          alt={field.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${field.accent}30, ${field.accent}10)`,
          }}
        />
      </div>

      {/* Content Section */}
      <div 
        className="p-6 flex flex-col gap-5 flex-grow transition-all duration-300"
        style={{
          background: hovered
            ? isDark ? `linear-gradient(135deg, ${field.accent}12, ${field.accent}04)` : `linear-gradient(135deg, ${field.accent}08, ${field.accent}02)`
            : isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
        }}
      >
        {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${field.accent}18`, border: `1px solid ${field.accent}30` }}
        >
          {field.icon}
        </div>
        <div>
          <h3 className="font-serif font-bold text-[17px] leading-snug" style={{ color: text }}>
            {field.title}
          </h3>
          <div className="text-[12px] font-semibold mt-0.5" style={{ color: field.accent }}>
            {field.stat} · {field.statLabel}
          </div>
        </div>
      </div>

      {/* Body */}
      <p className="text-[13px] leading-relaxed" style={{ color: sub }}>
        {field.body}
      </p>

      {/* Universities */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: field.accent }}>
          Top Universities
        </p>
        <div className="flex flex-wrap gap-1.5">
          {field.universities.map((u, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: `${field.accent}15`, color: field.accent, border: `1px solid ${field.accent}25` }}>
              {u}
            </span>
          ))}
        </div>
      </div>

      {/* Companies */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: chipColor }}>
          Employers
        </p>
        <div className="flex flex-wrap gap-1.5">
          {field.companies.map((c, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: chipBg, color: chipColor, border: `1px solid rgba(15,76,143,0.12)` }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div
        className="h-0.5 rounded-full mt-auto transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${field.accent}, transparent)`,
          opacity: hovered ? 1 : 0.20,
          width: hovered ? '100%' : '30%',
        }}
      />
      </div>
    </div>
  );
}

export default function StudyFields() {
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
      id="fields"
      className="relative py-28 px-5 sm:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #030e1c 0%, #0b1323 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #f5faff 100%)',
      }}
    >
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
          style={{ color: '#0f4c8f', background: 'rgba(15,76,143,0.10)', border: '1px solid rgba(15,76,143,0.22)' }}>
          Fields & Specialisations
        </span>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: text }}>
          What You Can Study{' '}
          <span style={{ color: '#0f4c8f' }}>and Where It Takes You</span>
        </h2>
        <p className="text-[16px] leading-relaxed" style={{ color: sub }}>
          Every field below has a real industry behind it in Germany — not just a degree programme.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FIELDS.map((field, i) => (
          <FieldCard key={i} field={field} index={i} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
