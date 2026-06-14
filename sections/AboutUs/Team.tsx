'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import SVGMorphCard from '@/components/SVGMorphCard';

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
      className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm"
      style={{
        background: isDark ? 'rgba(8,145,178,0.15)' : 'rgba(0,109,158,0.12)',
        border: '1px solid rgba(8,145,178,0.40)',
        color: isDark ? '#22d3ee' : '#006d9e',
      }}
    >
      {children}
    </span>
  );
}

function FounderCard({ name, role, bio, initials, accentColor, isDark, delay }: { 
  name: string; role: string; bio: string[]; initials: string; accentColor: string; isDark: boolean; delay: number;
}) {
  const surface = isDark ? '#0d2540' : '#ffffff';
  const border = isDark ? 'rgba(15,76,143,0.18)' : 'rgba(15,76,143,0.20)';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.65)' : 'rgba(30,50,80,0.62)';

  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full rounded-2xl overflow-hidden flex flex-col" style={{ background: surface, border: `1px solid ${border}` }}>
        <div className="h-1" style={{ background: accentColor }} />
        <div className="p-8 flex flex-col gap-6 flex-1">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-bold text-[22px] flex-shrink-0" style={{ background: `${accentColor}22`, border: `2px solid ${accentColor}55`, color: accentColor }}>
              {initials}
            </div>
            <div>
              <h3 className="font-serif font-bold text-[22px] leading-tight" style={{ color: text }}>{name}</h3>
              <p className="text-[13px] font-semibold uppercase tracking-wider mt-1" style={{ color: accentColor }}>{role}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {bio.map((para, i) => (
              <p key={i} className="text-[16px] leading-relaxed" style={{ color: sub }}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function TeamSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';
  const surfaceAlt = isDark ? 'rgba(13,37,64,0.5)' : 'rgba(15,76,143,0.04)';
  const border = isDark ? 'rgba(15,76,143,0.15)' : 'rgba(15,76,143,0.18)';
  
  if (!mounted) return null;
  
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: surfaceAlt, borderTop: `1px solid ${border}` }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <Pill isDark={isDark}>THE TEAM BEHIND EUROZIEL</Pill>
            <h2 className="font-serif font-bold mt-5 mb-4" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
              Meet the Founders Behind EuroZiel
            </h2>
            <p className="text-[17px] leading-relaxed mx-auto" style={{ color: sub, maxWidth: '56ch' }}>
              At EuroZiel, we believe studying in Germany is not just about securing an admission letter — it is about building the right academic pathway, career direction, and international future.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SVGMorphCard
            name="Yuvasri Jagadeesan"
            role="Co-Founder · Academic Strategy"
            imageSrc="/images/about/team.png"
            description="Yuvasri leads EuroZiel's student support framework with expertise in profile evaluation, university shortlisting, APS coordination, and visa guidance. Her structured approach and focus on transparent communication has been instrumental in building EuroZiel's student-first counselling model."
            accent="#006d9e"
            index={0}
          />
          <SVGMorphCard
            name="Sarathkumar Venkateshwaran"
            role="Co-Founder · European Network"
            imageSrc="/images/about/network.png"
            description="Sarathkumar leads EuroZiel's European network development, building strong connections across universities and student communities. His expertise in creating network-driven guidance helps students with practical exposure and real-world insights beyond admissions."
            accent="#059669"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
