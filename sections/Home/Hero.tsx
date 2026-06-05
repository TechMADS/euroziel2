'use client';

import { useEffect, useRef, useState, CSSProperties, MouseEvent } from 'react';
import { useTheme } from 'next-themes';
import { GraduationCap, FileText, Award, Briefcase, Calendar } from 'lucide-react';

interface VantaEffect {
  destroy: () => void;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
const BIRDS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';

// ─── Float Card ───────────────────────────────────────────────────────────────

interface FloatCardProps {
  Icon: React.ElementType;
  title: string;
  sub: string;
  chip: string;
  className?: string;
}

function FloatCard({ Icon, title, sub, chip, className = '' }: FloatCardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-[rgba(74,144,217,0.18)] bg-gradient-to-br from-[#0f2035] to-[#0D1B2A]',
        'p-4 shadow-[0_4px_32px_rgba(0,0,0,0.5)]',
        'transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(74,144,217,0.40)] hover:shadow-[0_8px_40px_rgba(74,144,217,0.18)]',
        className,
      ].join(' ')}
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(74,144,217,0.12)]">
        <Icon className="h-4 w-4 text-[#4A90D9]" strokeWidth={1.5} />
      </div>
      <div className="mb-0.5 text-[12.5px] font-bold leading-snug text-[#E8EDF5]">{title}</div>
      <div className="text-[11px] leading-snug text-[#A8C8F0]">{sub}</div>
      <div className="mt-2.5 inline-block rounded-full border border-[rgba(74,144,217,0.30)] bg-[rgba(74,144,217,0.10)] px-2.5 py-[3px] text-[10px] font-semibold tracking-[0.05em] text-[#A8C8F0]">
        {chip}
      </div>
    </div>
  );
}

// ─── Float Cluster ────────────────────────────────────────────────────────────

function FloatCluster() {
  const cards = [
    { Icon: GraduationCap, title: '1:1 Personalised Counselling', sub: 'From application to visa',      chip: 'Limited Slots'       },
    { Icon: FileText,      title: 'Application Assistance',       sub: 'LOR, SOP & Document prep',      chip: 'Expert Review'       },
    { Icon: Award,         title: 'Scholarship Guidance',         sub: 'DAAD & other funding options',  chip: '€861/month possible' },
    { Icon: Briefcase,     title: 'Internship Support',           sub: 'Werkstudent & full-time roles', chip: 'German CV Format'    },
    { Icon: Calendar,      title: 'Visa Timeline',                sub: 'APS, blocked account & more',   chip: '98% Success'         },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <FloatCard {...cards[0]} />
        <FloatCard {...cards[1]} />
      </div>
      <FloatCard {...cards[2]} className="w-full" />
      <div className="grid grid-cols-2 gap-3">
        <FloatCard {...cards[3]} />
        <FloatCard {...cards[4]} />
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const birdsRef    = useRef<HTMLDivElement>(null);
  const birdsEffect = useRef<VantaEffect | null>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  useEffect(() => {
    if (!mounted || !birdsRef.current) return;

    birdsEffect.current?.destroy();
    birdsEffect.current = null;

    loadScript(THREE_CDN).then(() => loadScript(BIRDS_CDN)).then(() => {
      const VANTA = (window as any).VANTA;
      if (!VANTA?.BIRDS || !birdsRef.current) return;

      birdsEffect.current = VANTA.BIRDS({
        el: birdsRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 50,
        minWidth: 50,
        scale: 0.75,
        scaleMobile: 0.75,
        backgroundColor: 0x000000,
        backgroundAlpha: 0.0,
        color1: isDark ? 0x4a90d9 : 0x1a4a6e,
        color2: isDark ? 0xffd97d : 0x5ba3d9,
        colorMode: 'varianceGradient',
        speedLimit: 2.5,
        quantity: 3,
        birdSize: 1.0,
        wingSpan: 10.0,
        separation: 40,
        alignment: 50,
        cohesion: 50,
      });
    }).catch(console.error);

    return () => {
      birdsEffect.current?.destroy();
      birdsEffect.current = null;
    };
  }, [mounted, isDark]);

  // ── Styles ────────────────────────────────────────────────────────────────

  const skyStyle: CSSProperties = (!mounted || isDark) ? {
    background: 'linear-gradient(to bottom, #061628 0%, #0d2540 40%, #0f3060 70%, #1a4a6e 100%)',
  } : {
    background: 'linear-gradient(to bottom, #1a6fbf 0%, #3a8fd9 30%, #6ab0e8 65%, #a8d4f5 100%)',
  };

  const cloudLayerStyle: CSSProperties = (!mounted || isDark) ? {
    background: `
      radial-gradient(ellipse 80% 40% at 20% 30%, rgba(30,60,100,0.45) 0%, transparent 70%),
      radial-gradient(ellipse 60% 35% at 75% 20%, rgba(20,50,90,0.35) 0%, transparent 65%),
      radial-gradient(ellipse 50% 30% at 50% 50%, rgba(15,40,80,0.25) 0%, transparent 60%)
    `,
  } : {
    background: `
      radial-gradient(ellipse 80% 40% at 20% 30%, rgba(255,255,255,0.55) 0%, transparent 70%),
      radial-gradient(ellipse 60% 35% at 75% 20%, rgba(255,255,255,0.45) 0%, transparent 65%),
      radial-gradient(ellipse 50% 30% at 50% 50%, rgba(240,248,255,0.30) 0%, transparent 60%)
    `,
  };

  const gradientStyle: CSSProperties = {
    height: '55%',
    background: (!mounted || isDark)
      ? 'linear-gradient(to top, rgba(6,22,40,0.95) 0%, rgba(6,22,40,0.5) 55%, transparent 100%)'
      : 'linear-gradient(to top, rgba(232,244,253,0.95) 0%, rgba(232,244,253,0.45) 55%, transparent 100%)',
  };

  const overlayStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(6,22,40,0.35)' : 'rgba(200,218,178,0.25)',
  };

  // Left panel — bleeds to screen edge, right corners rounded
  const textPanelStyle: CSSProperties = {
    background: (!mounted || isDark)
      ? 'rgba(6, 18, 38, 0.82)'
      : 'rgba(8, 30, 65, 0.75)',
    borderRight: (!mounted || isDark)
      ? '1px solid rgba(74,144,217,0.15)'
      : '1px solid rgba(74,144,217,0.20)',
    borderTop: (!mounted || isDark)
      ? '1px solid rgba(74,144,217,0.10)'
      : '1px solid rgba(74,144,217,0.15)',
    borderBottom: (!mounted || isDark)
      ? '1px solid rgba(74,144,217,0.10)'
      : '1px solid rgba(74,144,217,0.15)',
    // Only right corners are rounded — left edge bleeds to screen edge
    borderRadius: '0 2rem 2rem 0',
    boxShadow: '4px 0 40px rgba(0,0,0,0.35)',
  };

  const eyebrowStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(74,144,217,0.15)' : 'rgba(74,144,217,0.20)',
    border: (!mounted || isDark) ? '1px solid rgba(74,144,217,0.35)' : '1px solid rgba(74,144,217,0.40)',
    letterSpacing: '0.15em',
    color: '#ffd97d',
  };

  const headingStyle: CSSProperties = {
    color: '#f0f6ff',
  };

  const accentStyle: CSSProperties = { color: '#4A90D9' };

  const subtitleStyle: CSSProperties = {
    color: 'rgba(200, 220, 245, 0.85)',
    fontWeight: 400,
  };

  const primaryBtnStyle: CSSProperties = {
    background: 'var(--accent-gold)',
    color: 'var(--accent-gold-foreground)',
    boxShadow: '0 4px 24px rgba(255,217,125,0.45)',
  };

  const secondaryBtnStyle: CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.25)',
  };

  const scrollColor = (!mounted || isDark) ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.5)';

  const handlePrimaryEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--accent-gold-hover)';
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,217,125,0.6)';
  };
  const handlePrimaryLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--accent-gold)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,217,125,0.45)';
  };
  const handleSecondaryEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
  };
  const handleSecondaryLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
  };

  return (
    <section
      className="relative h-screen flex items-center overflow-hidden"
      style={{ willChange: 'transform', contain: 'layout style' }}
    >
      {/* Layer 0 — Static CSS sky */}
      <div className="absolute inset-0 z-0" style={skyStyle} />

      {/* Layer 0b — CSS cloud puffs */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={cloudLayerStyle} />

      {/* Layer 1 — Birds */}
      <div
        ref={birdsRef}
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ willChange: 'transform', contain: 'strict' }}
      />

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={gradientStyle} />

      {/* University image */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center">
        <img
          src="/images/home/hero/university1.png"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'bottom' }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none" style={overlayStyle} />
      </div>

      {/* ── Main content — full width, two columns ── */}
      <div className="relative z-30 w-full h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-0">

          {/* Left — text panel bleeding from screen edge */}
          <div
            className="flex flex-col items-start text-left px-8 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:px-20 xl:py-20"
            style={textPanelStyle}
          >
            <span
              className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full"
              style={eyebrowStyle}
            >
              Germany&apos;s Trusted Student Bridge
            </span>

            <h1
              className="font-bold mb-4 leading-[1.12] tracking-tight text-[clamp(22px,3.5vw,52px)]"
              style={headingStyle}
            >
              Your bridge from India<br />to Germany,{' '}
              <span style={accentStyle}>built by people already there.</span>
            </h1>

            <p
              className="mb-7 max-w-sm leading-relaxed text-[clamp(13px,1.2vw,17px)]"
              style={subtitleStyle}
            >
              Personalised guidance, real experiences, zero gatekeeping —
              from students who walked the same path.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 py-2.5 px-6 text-sm sm:py-3 sm:px-7 sm:text-sm lg:py-3 lg:px-7 lg:text-base"
                style={primaryBtnStyle}
                onMouseEnter={handlePrimaryEnter}
                onMouseLeave={handlePrimaryLeave}
              >
                Book a Free Consultation
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 py-2.5 px-6 text-sm sm:py-3 sm:px-7 sm:text-sm lg:py-3 lg:px-7 lg:text-base"
                style={secondaryBtnStyle}
                onMouseEnter={handleSecondaryEnter}
                onMouseLeave={handleSecondaryLeave}
              >
                Explore Germany
              </a>
            </div>
          </div>

          {/* Right — float cards, padded away from edge */}
          <div
            className="hidden md:flex items-center justify-center px-8 lg:px-12 xl:px-16"
          >
            <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
              <FloatCluster />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60"
        aria-hidden="true"
      >
        <span className="uppercase tracking-widest" style={{ fontSize: '10px', color: scrollColor }}>Scroll</span>
        <span className="animate-bounce" style={{ fontSize: '18px', color: scrollColor }}>↓</span>
      </div>
    </section>
  );
}