'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WhyEuroZiel() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const sectionBg = isDark
    ? 'linear-gradient(160deg,#061628 0%,#0d2540 60%,#061628 100%)'
    : 'linear-gradient(160deg,#e8f4fd 0%,#d4eaff 60%,#e8f4fd 100%)';
  const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub = isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.72)';
  const imageBorder = isDark ? 'rgba(74,144,217,0.20)' : 'rgba(74,144,217,0.30)';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)';
  const cardBorder = isDark ? 'rgba(74,144,217,0.18)' : 'rgba(74,144,217,0.28)';

  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-16 pb-2" style={{ background: sectionBg }}>
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(74,144,217,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,144,217,0.04) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        {/* <div className="flex justify-center mb-6">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.35)', letterSpacing: '0.15em', color: '#ffd97d' }}>
            Why EuroZiel
          </span>
        </div> */}

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-12 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-4 top-8 bottom-8 w-[3px] rounded-full hidden lg:block"
              style={{ background: 'linear-gradient(to bottom,#4A90D9,#ffd97d)' }} />
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${imageBorder}`, boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.55)' : '0 24px 64px rgba(74,144,217,0.18)' }}>
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(6,22,40,0.55) 0%,rgba(6,22,40,0.15) 100%)' }} />
              {/* <Image src="/images/home/why-euroziel.jpg" alt="EuroZiel guidance" width={680} height={520}
                className="w-full h-auto object-cover" style={{ display: 'block', minHeight: 340, objectFit: 'cover' }} /> */}
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
                alt="Students planning their Germany education journey"
                width={680}
                height={520}
                className="w-full h-[320px] lg:h-[420px] object-cover"
              />

              {[
                { val: '100%', label: 'Germany-Focused', accent: '#4A90D9', pos: 'bottom-5 left-5' },
                { val: 'Real', label: 'Student Insight', accent: '#ffd97d', pos: 'top-5 right-5' },
              ].map(({ val, label, accent, pos }) => (
                <div key={label} className={`absolute ${pos} z-20 px-4 py-3 rounded-xl`}
                  style={{ background: isDark ? 'rgba(6,22,40,0.88)' : 'rgba(255,255,255,0.90)', border: `1px solid ${accent}44`, backdropFilter: 'blur(8px)' }}>
                  <div className="text-[22px] font-bold leading-none mb-0.5" style={{ color: accent }}>{val}</div>
                  <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textSub }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 stagger-children">
            <h2 className="font-bold leading-tight mb-3" style={{ fontSize: 'clamp(26px,3.5vw,48px)', color: textColor }}>
              More Than a Consultancy.{' '}
              <span style={{ color: '#4A90D9' }}>A Real Bridge</span> to Germany.
            </h2>

            <p className="leading-relaxed mb-4" style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: textSub, maxWidth: '54ch' }}>
              EuroZiel was founded to give students access to guidance that is honest, Germany-focused,
              and built on real experience — not generic consultancy advice. We saw too many capable
              students lose opportunities because they were given copied strategies, unrealistic
              expectations, and little understanding of how the German system actually works.
            </p>

            <p className="leading-relaxed mb-4" style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: textSub, maxWidth: '54ch' }}>
              That is why EuroZiel combines structured consultancy with direct insight from students
              currently studying at German public universities, Indian professionals working across
              Europe, and domain-specific mentors who understand your academic and career pathway.
              From APS to visas to Anmeldung — we stay with you.
            </p>

            {/* Key points */}
            <div className="space-y-2 mb-5">
              {[
                'Guidance from students currently in German universities',
                'Domain-specific mentors who know your field and career path',
                'From application to settlement — complete end-to-end support',
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.35)' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#4A90D9" /></svg>
                  </span>
                  <span className="text-[14px] font-medium leading-relaxed" style={{ color: textSub }}>{pt}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {/* <a href="#get-started"
              className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 py-3 px-7 text-sm"
              style={{ background: '#4A90D9', color: '#ffffff', boxShadow: '0 4px 20px rgba(74,144,217,0.40)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(74,144,217,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,144,217,0.40)'; }}>
              Start Your Germany Journey
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}