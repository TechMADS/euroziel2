'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Users, Globe, Brain, Target, LifeBuoy, MessageSquare } from 'lucide-react';

const CARDS = [
  {
    Icon: Users, accent: '#4A90D9',
    title: 'Real People. Real Guidance.',
    body: 'Speak directly with Indian students currently enrolled in German universities and professionals working across Europe — not agents reading from a script.',
  },
  {
    Icon: Globe, accent: '#ffd97d',
    title: 'Germany Exclusive Focus',
    body: 'Built specifically for Germany and Europe pathways. Every university recommendation, visa process, APS strategy, and settlement guide comes from deep knowledge of the German education system.',
  },
  {
    Icon: Brain, accent: '#7ED8A4',
    title: 'Domain-Based Experts',
    body: 'Engineering, Computer Science, Healthcare, Ausbildung, Business. Your guidance comes from people who actually understand your field and studied or work in it.',
  },
  {
    Icon: Target, accent: '#C084FC',
    title: 'Personalized Strategy',
    body: 'No copy-paste counselling. Every student receives a customised roadmap based on academics, career goals, budget, language level, and long-term plans in Germany.',
  },
  {
    Icon: LifeBuoy, accent: '#FB923C',
    title: 'End-to-End Support',
    body: 'From university shortlisting to Anmeldung, blocked account, visa, accommodation, and settlement support. We stay connected even after you land in Germany.',
  },
  {
    Icon: MessageSquare, accent: '#4A90D9',
    title: 'Language Coaching Support',
    body: 'German language preparation is critical. We guide students with structured coaching support, exam preparation direction, and practical learning strategies for both university and Ausbildung pathways.',
  },
];

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)].join(',');
}

export default function WhyChoose() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const sectionBg = isDark ? '#04111f' : '#f0f8ff';
  const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub = isDark ? 'rgba(200,220,245,0.72)' : 'rgba(30,50,80,0.70)';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.80)';
  const cardBorder = isDark ? 'rgba(74,144,217,0.16)' : 'rgba(74,144,217,0.22)';

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: sectionBg, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(74,144,217,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(74,144,217,0.035) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-14 stagger-children">
          <span className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.35)', letterSpacing: '0.15em', color: '#ffd97d' }}>
            Why Students Choose EuroZiel
          </span>
          <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(26px,4vw,52px)', color: textColor }}>
            Real People.{' '}
            <span style={{ color: '#4A90D9' }}>Real Guidance.</span>
          </h2>
          <p className="mt-4 mx-auto leading-relaxed" style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: textSub, maxWidth: '46ch' }}>
            Six reasons students across India trust EuroZiel for their Germany journey.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {CARDS.map(({ Icon, accent, title, body }) => (
            <div key={title}
              className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 group"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isDark ? 'none' : '0 4px 20px rgba(74,144,217,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${hexToRgb(accent)},0.45)`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(${hexToRgb(accent)},0.15)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = cardBorder; (e.currentTarget as HTMLDivElement).style.boxShadow = isDark ? 'none' : '0 4px 20px rgba(74,144,217,0.07)'; }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${hexToRgb(accent)},0.12)`, border: `1px solid rgba(${hexToRgb(accent)},0.28)` }}>
                <Icon style={{ width: 22, height: 22, color: accent }} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-bold text-[16px] mb-2" style={{ color: textColor }}>{title}</div>
                <p className="text-[13px] leading-relaxed" style={{ color: textSub }}>{body}</p>
              </div>
              <div className="mt-auto pt-3" style={{ borderTop: `1px solid rgba(${hexToRgb(accent)},0.15)` }}>
                <div className="w-8 h-[2px] rounded-full" style={{ background: accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}