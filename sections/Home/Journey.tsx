'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Map, FileText, Plane, Home, TrendingUp } from 'lucide-react';

interface Step {
  number: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  stats: [string, string];
  Icon: React.ElementType;
  accent: string;
  image: string;
}

const steps: Step[] = [
  {
    number: '01', label: 'Discovery', title: 'Your German Dream Begins',
    description: 'Start with a personalized consultation to map out your unique path to Germany.',
    bullets: ['Free 30-Minute Consultation', 'Profile Evaluation', 'Goal & Career Mapping', 'University Shortlisting'],
    stats: ['98% Student Satisfaction', '< 24 Hours Initial Response Time'],
    Icon: Search, accent: '#4A90D9',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    number: '02', label: 'Strategy', title: 'Building Your Germany Roadmap',
    description: 'We create a customized application strategy based on your profile and goals.',
    bullets: ['Personalized Application Strategy', 'Domain-Based Expert Guidance', 'Course & University Matching', 'Application Timeline Planning'],
    stats: ['Germany-Focused Guidance', 'Tailored for Your Profile'],
    Icon: Map, accent: '#ffd97d',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
  {
    number: '03', label: 'Applications', title: 'Turning Plans Into Offers',
    description: 'From SOPs to uni-assist submissions, we ensure error-free documentation.',
    bullets: ['SOP & LOR Guidance', 'Application Submission Support', 'APS Documentation Assistance', 'University Portal Handling'],
    stats: ['Error-Free Documentation', 'End-to-End Support'],
    Icon: FileText, accent: '#7ED8A4',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
  },
  {
    number: '04', label: 'Visa & Pre-Departure', title: 'Preparing You for Germany',
    description: 'We guide you through every requirement for a smooth transition.',
    bullets: ['Blocked Account Guidance', 'Visa Documentation Support', 'Accommodation Assistance', 'Travel Preparation'],
    stats: ['Step-by-Step Visa Support', 'Complete Pre-Arrival Guidance'],
    Icon: Plane, accent: '#C084FC',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
  },
  {
    number: '05', label: 'Arrival & Settlement', title: 'Settling Into Your New Life',
    description: 'Our support continues even after you land in Germany.',
    bullets: ['Anmeldung Guidance', 'Health Insurance Support', 'Bank Account Setup', 'Student Community Connections'],
    stats: ['On-Ground Student Support', 'Real Guidance From Germany'],
    Icon: Home, accent: '#FB923C',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
  },
  {
    number: '06', label: 'Growth & Career', title: 'Beyond Admission. Toward Your Future.',
    description: 'Career and networking support to help you thrive in Germany.',
    bullets: ['Career Support', 'Industry Insights', 'Internship Guidance', 'Long-Term Mentorship'],
    stats: ['Built for Long-Term Success', 'Germany Career Pathway'],
    Icon: TrendingUp, accent: '#4A90D9',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null); // ← was missing
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    let ticking = false;

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const total    = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const move     = progress * (steps.length - 1) * 100;
      track.style.transform = `translate3d(-${move}vw, 0, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // ← no deps needed, refs are stable

  const sectionBg    = isDark ? '#061628' : '#e8f4fd';
  const panelBg      = isDark ? '#04111f' : '#f0f8ff';
  const textColor    = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub      = isDark ? 'rgba(200,220,245,.75)' : 'rgba(30,50,80,.75)';
  const bulletColor  = isDark ? 'rgba(220,235,255,.88)' : 'rgba(30,50,80,.82)';
  const statBg       = isDark ? 'rgba(74,144,217,.08)' : 'rgba(74,144,217,.12)';
  const statText     = isDark ? '#A8C8F0' : '#2a5a9a';
  const dotInactive  = isDark ? 'rgba(74,144,217,.25)' : 'rgba(74,144,217,.40)';

  return (
    <>
      {/* Section heading */}
      <div className="py-16 px-6 text-center transition-colors duration-300" style={{ background: sectionBg }}>
        <span
          className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(74,144,217,.15)', border: '1px solid rgba(74,144,217,.35)', color: '#ffd97d', letterSpacing: '0.15em' }}
        >
          Your Complete Journey
        </span>
        <h2 className="font-bold text-[clamp(26px,4vw,52px)] leading-tight" style={{ color: textColor }}>
          Six steps from dream{' '}
          <span style={{ color: '#4A90D9' }}>to Deutschland.</span>
        </h2>
        <p className="mt-4 text-[clamp(14px,1.2vw,17px)] max-w-xl mx-auto leading-relaxed" style={{ color: textSub }}>
          A structured, end-to-end journey — designed so you always know what comes next.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div
          className="sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ background: panelBg }}
        >
          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${steps.length * 100}vw` }}
          >
            {steps.map((step, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className="relative flex-shrink-0 h-full"
                  style={{ width: '100vw' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                    {/* Image panel */}
                    <div
                      className={`hidden md:block relative ${imageLeft ? 'order-1' : 'order-2'}`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(4,17,31,.65),rgba(4,17,31,.85)),url(${step.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Giant step number watermark */}
                      <div
                        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                        style={{ fontSize: 'clamp(120px,20vw,280px)', fontWeight: 900, color: 'rgba(74,144,217,.06)', lineHeight: 1 }}
                      >
                        {step.number}
                      </div>

                      {/* Accent side line */}
                      <div
                        className="absolute top-0 bottom-0 w-[3px]"
                        style={{ background: step.accent, [imageLeft ? 'right' : 'left']: 0, opacity: 0.6 }}
                      />

                      {/* Icon + badge */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                        <div
                          className="rounded-2xl flex items-center justify-center"
                          style={{
                            width: 90, height: 90,
                            background: `rgba(${hexToRgb(step.accent)},.12)`,
                            border: `1.5px solid rgba(${hexToRgb(step.accent)},.35)`,
                          }}
                        >
                          <step.Icon style={{ width: 40, height: 40, color: step.accent }} strokeWidth={1.5} />
                        </div>
                        <span
                          className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                          style={{
                            color: step.accent,
                            background: `rgba(${hexToRgb(step.accent)},.10)`,
                            border: `1px solid rgba(${hexToRgb(step.accent)},.30)`,
                            letterSpacing: '0.15em',
                          }}
                        >
                          Step {step.number} — {step.label}
                        </span>
                      </div>

                      {/* Grid texture overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `linear-gradient(rgba(74,144,217,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,144,217,.04) 1px,transparent 1px)`,
                          backgroundSize: '48px 48px',
                        }}
                      />
                    </div>

                    {/* Content panel */}
                    <div
                      className={`flex flex-col justify-center px-8 sm:px-12 md:px-14 lg:px-20 ${imageLeft ? 'order-2' : 'order-1'}`}
                      style={{ background: panelBg }}
                    >
                      {/* Mobile step badge */}
                      <div className="md:hidden mb-6">
                        <span
                          className="inline-block text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                          style={{ background: `rgba(${hexToRgb(step.accent)},.12)`, border: `1px solid rgba(${hexToRgb(step.accent)},.35)`, color: step.accent }}
                        >
                          Step {step.number} — {step.label}
                        </span>
                      </div>

                      <p className="text-xs uppercase tracking-widest mb-3 hidden md:block" style={{ color: step.accent, letterSpacing: '0.15em' }}>
                        Step {step.number}
                      </p>

                      <h3
                        className="font-bold leading-tight mb-4"
                        style={{ fontSize: 'clamp(22px,3vw,42px)', color: textColor }}
                      >
                        {step.title}
                      </h3>

                      <p className="mb-8 leading-relaxed" style={{ fontSize: 'clamp(13px,1.1vw,16px)', color: textSub, maxWidth: '38ch' }}>
                        {step.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {step.bullets.map(b => (
                          <li key={b} className="flex items-center gap-3">
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: `rgba(${hexToRgb(step.accent)},.15)`, border: `1px solid rgba(${hexToRgb(step.accent)},.40)` }}
                            >
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <circle cx="4" cy="4" r="3" fill={step.accent} />
                              </svg>
                            </span>
                            <span className="text-sm font-medium" style={{ color: bulletColor }}>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {step.stats.map(s => (
                          <div
                            key={s}
                            className="px-4 py-2 rounded-xl text-xs font-semibold"
                            style={{ background: statBg, border: '1px solid rgba(74,144,217,.20)', color: statText }}
                          >
                            {s}
                          </div>
                        ))}
                      </div>

                      {/* Progress dots */}
                      <div className="flex gap-2">
                        {steps.map((_, di) => (
                          <div
                            key={di}
                            className="rounded-full transition-all duration-300"
                            style={{ width: di === i ? 20 : 6, height: 6, background: di === i ? step.accent : dotInactive }}
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}