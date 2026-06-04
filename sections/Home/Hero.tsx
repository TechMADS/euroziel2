'use client';

import { useEffect, useRef, useState, CSSProperties, MouseEvent } from 'react';
import { useTheme } from 'next-themes';

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
const CLOUDS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
const BIRDS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';

export default function Hero() {
  const cloudsRef = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const cloudsEffect = useRef<VantaEffect | null>(null);
  const birdsEffect = useRef<VantaEffect | null>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  useEffect(() => {
    if (!mounted || !cloudsRef.current || !birdsRef.current) return;

    // Destroy both before reinitialising
    cloudsEffect.current?.destroy();
    birdsEffect.current?.destroy();
    cloudsEffect.current = null;
    birdsEffect.current = null;

    // Load THREE once, then both Vanta scripts in parallel
    loadScript(THREE_CDN).then(() =>
      Promise.all([
        loadScript(CLOUDS_CDN),
        loadScript(BIRDS_CDN),
      ])
    ).then(() => {
      const VANTA = (window as any).VANTA;
      if (!VANTA?.CLOUDS || !VANTA?.BIRDS) return;
      if (!cloudsRef.current || !birdsRef.current) return;

      // ── Layer 1: Clouds (background) ──────────────────────────────────
      cloudsEffect.current = VANTA.CLOUDS({
        el: cloudsRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 50,
        minWidth: 50,
        scale: 1.0,
        skyColor: isDark ? 0x0d1b2a : 0x4a90d9,
        cloudColor: isDark ? 0x1a2f4a : 0xffffff,
        cloudShadowColor: isDark ? 0x060e18 : 0x0f172a,
        sunColor: isDark ? 0x223344 : 0xff9f00,
        sunGlareColor: isDark ? 0x1a2a3a : 0xffd97d,
        sunlightColor: isDark ? 0x1a2a3a : 0xffeebb,
        speed: 0.3,
        quantity: 2,
        texturePath: 'https://www.vantajs.com/gallery/noise.png',
      });

      // ── Layer 2: Birds (overlay — black bg → transparent via CSS) ─────
      birdsEffect.current = VANTA.BIRDS({
        el: birdsRef.current,
        mouseControls: false,   // clouds already handles mouse
        touchControls: false,
        gyroControls: false,
        minHeight: 50,
        minWidth: 50,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x000000, // pure black → becomes transparent via mix-blend-mode: screen
        backgroundAlpha: 0.0,    // fully transparent background (in case some browsers don't support mix-blend-mode)
        color1: isDark ? 0x4a90d9 : 0x2d6a4f,  // brand blue birds
        color2: isDark ? 0xffd97d : 0x8ecae6,   // gold accent birds
        colorMode: 'varianceGradient',
        speedLimit: 3.0,
        quantity: 2.0,           // fewer birds so they don't crowd the clouds
        birdSize: 1.0,
        wingSpan: 10.0,
        separation: 40,
        alignment: 50,
        cohesion: 50,
      });
    }).catch(console.error);

    return () => {
      cloudsEffect.current?.destroy();
      birdsEffect.current?.destroy();
      cloudsEffect.current = null;
      birdsEffect.current = null;
    };
  }, [mounted, isDark]);

  // ── Styles ─────────────────────────────────────────────────────────────

  const gradientStyle: CSSProperties = {
    height: '50%',
    background: (!mounted || isDark)
      ? 'linear-gradient(to top, rgba(15,23,42,0.90) 0%, rgba(15,23,42,0.45) 55%, transparent 100%)'
      : 'linear-gradient(to top, rgba(232,244,253,0.92) 0%, rgba(232,244,253,0.4) 55%, transparent 100%)',
    transition: mounted ? 'background 0.5s ease' : 'none',
  };

  const eyebrowStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(74,144,217,0.2)' : 'rgba(74,144,217,0.12)',
    backdropFilter: 'blur(8px)',
    border: (!mounted || isDark)
      ? '1px solid rgba(74,144,217,0.4)'
      : '1px solid rgba(74,144,217,0.35)',
    letterSpacing: '0.15em',
    color: (!mounted || isDark) ? '#ffd97d' : '#ffd97d',
    transition: mounted ? 'all 0.4s ease' : 'none',
  };

  const headingStyle: CSSProperties = {
    color: (!mounted || isDark) ? '#f8fafc' : '#0f172a',
    // textShadow: (!mounted || isDark)
    //   ? '0 2px 20px rgba(15,23,42,0.6)'
    //   : '0 2px 12px rgba(255,255,255,0.9)',
    transition: mounted ? 'color 0.4s ease' : 'none',
  };

  const accentStyle: CSSProperties = { color: 'var(--primary)' };

  const subtitleStyle: CSSProperties = {
    color: (!mounted || isDark) ? 'rgba(248,250,252,0.82)' : 'rgba(15,23,42,0.72)',
    textShadow: (!mounted || isDark)
      ? '0 1px 8px rgba(15,23,42,0.4)'
      : '0 1px 6px rgba(255,255,255,0.7)',
    transition: mounted ? 'color 0.4s ease' : 'none',
  };

  const primaryBtnStyle: CSSProperties = {
    background: 'var(--accent-gold)',
    color: 'var(--accent-gold-foreground)',
    boxShadow: '0 4px 24px rgba(255,217,125,0.45)',
  };

  const secondaryBtnStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)',
    color: (!mounted || isDark) ? '#ffffff' : '#0f172a',
    border: (!mounted || isDark)
      ? '1px solid rgba(255,255,255,0.35)'
      : '1px solid rgba(15,23,42,0.2)',
    backdropFilter: 'blur(8px)',
    transition: mounted ? 'all 0.4s ease' : 'none',
  };

  const overlayStyle: CSSProperties = {
    background: (!mounted || isDark)
      ? 'rgba(15,23,42,0.4)'
      : 'rgba(19, 90, 77, 0.3)',
    backdropFilter: 'blur(4px)',
    transition: mounted ? 'background 0.5s ease' : 'none',
  };

  const scrollColor = (!mounted || isDark) ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.5)';

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
    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(15,23,42,0.15)';
  };
  const handleSecondaryLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)';
  };

  return (
    <section className="relative h-screen flex items-end justify-center overflow-hidden">

      {/* Layer 1 — Clouds (base background) */}
      <div
        ref={cloudsRef}
        className="absolute inset-0 z-0"
        style={{ top: '-200px', height: 'calc(100% + 200px)' }}
      />

      {/* Layer 2 — Birds (on top of clouds, black bg removed via screen blend) */}
      <div
        ref={birdsRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          top: '-200px',
          height: 'calc(100% + 200px)',
          mixBlendMode: 'screen',  // ← black = transparent, colours show through
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={gradientStyle} />

      <div
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none"
        style={{ height: '100%', width: '100%', maxWidth: '100vw' }}
      >
        <img
          src="/images/home/hero/university1.png"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'bottom' }}
        />

        {/* Overlay: Darker in night and lighter in day */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={overlayStyle} />
      </div>

      <div className="relative z-30 text-center px-6 pb-20 max-w-4xl mx-auto">
        <span
          className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full"
          style={eyebrowStyle}
        >
          Germany's Trusted Student Bridge
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={headingStyle}>
          Your bridge from India to Germany,{' '}
          <span style={accentStyle}>built by people already there.</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={subtitleStyle}>
          Personalised guidance, real experiences, zero gatekeeping.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-full transition-all duration-300"
            style={primaryBtnStyle}
            onMouseEnter={handlePrimaryEnter}
            onMouseLeave={handlePrimaryLeave}
          >
            Book a Free Consultation
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-full transition-all duration-300"
            style={secondaryBtnStyle}
            onMouseEnter={handleSecondaryEnter}
            onMouseLeave={handleSecondaryLeave}
          >
            Explore Germany
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60"
        aria-hidden="true"
      >
        <span className="uppercase tracking-widest" style={{ fontSize: '10px', color: scrollColor }}>
          Scroll
        </span>
        <span className="animate-bounce" style={{ fontSize: '18px', color: scrollColor }}>↓</span>
      </div>
    </section>
  );
}