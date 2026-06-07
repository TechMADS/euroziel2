'use client';

import React, { useEffect, useRef, useState, CSSProperties, MouseEvent } from 'react';
import { useTheme } from 'next-themes';
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

interface VantaEffect { destroy: () => void; }

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = () => resolve(); s.onerror = () => reject();
    document.head.appendChild(s);
  });
}

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
const BIRDS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';

const STATS = [
  { value: '98%', label: 'Student Satisfaction' },
  { value: '< 24h', label: 'Response Time' },
  { value: '100%', label: 'Germany Focused' },
  { value: '6-Step', label: 'End-to-End Journey' },
];

const FLOW_LINES = [
  'Honest. Germany-Focused. Built on Real Experience.',
  'Guidance from Indian students at German universities.',
  'Domain-specific mentors who know your field.',
  'From APS to Anmeldung — we stay with you.',
  'Zero gatekeeping. Zero generic advice.',
];

export default function Hero() {
  const birdsRef = useRef<HTMLDivElement>(null);
  const birdsEffect = useRef<VantaEffect | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveFlow(p => (p + 1) % FLOW_LINES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  useEffect(() => {
    if (!mounted || !birdsRef.current) return;
    birdsEffect.current?.destroy(); birdsEffect.current = null;
    loadScript(THREE_CDN).then(() => loadScript(BIRDS_CDN)).then(() => {
      const VANTA = (window as any).VANTA;
      if (!VANTA?.BIRDS || !birdsRef.current) return;
      birdsEffect.current = VANTA.BIRDS({
        el: birdsRef.current, mouseControls: false, touchControls: false,
        gyroControls: false, minHeight: 50, minWidth: 50, scale: 0.75, scaleMobile: 0.75,
        backgroundColor: 0x000000, backgroundAlpha: 0.0,
        color1: isDark ? 0x4a90d9 : 0x1a4a6e, color2: isDark ? 0xffd97d : 0x5ba3d9,
        colorMode: 'varianceGradient', speedLimit: 2.5, quantity: 3,
        birdSize: 1.0, wingSpan: 10.0, separation: 40, alignment: 50, cohesion: 50,
      });
    }).catch(console.error);
    return () => { birdsEffect.current?.destroy(); birdsEffect.current = null; };
  }, [mounted, isDark]);

  const skyStyle: CSSProperties = (!mounted || isDark)
    ? { background: 'linear-gradient(to bottom, #061628 0%, #0d2540 40%, #0f3060 70%, #1a4a6e 100%)' }
    : { background: 'linear-gradient(to bottom, #1a6fbf 0%, #3a8fd9 30%, #6ab0e8 65%, #a8d4f5 100%)' };

  const textPanelStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(6,18,38,0.84)' : 'rgba(4,1,1,0.78)',
    borderRight: '1px solid rgba(74,144,217,0.15)',
    borderTop: '1px solid rgba(74,144,217,0.10)',
    borderBottom: '1px solid rgba(74,144,217,0.10)',
    borderRadius: '0 2rem 2rem 0',
    boxShadow: '4px 0 40px rgba(0,0,0,0.35)',
  };

  const eyebrowStyle: CSSProperties = {
    background: 'rgba(74,144,217,0.15)',
    border: '1px solid rgba(74,144,217,0.35)',
    letterSpacing: '0.15em', color: '#ffd97d',
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden" style={{ willChange: 'transform' }}>
      <div className="absolute inset-0 z-0" style={skyStyle} />
      <div ref={birdsRef} className="pointer-events-none absolute inset-0 z-[2]" style={{ willChange: 'transform' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{
        height: '55%',
        background: (!mounted || isDark)
          ? 'linear-gradient(to top, rgba(6,22,40,0.95) 0%, rgba(6,22,40,0.5) 55%, transparent 100%)'
          : 'linear-gradient(to top, rgba(232,244,253,0.95) 0%, rgba(232,244,253,0.45) 55%, transparent 100%)',
      }} />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center">
        <img src="/images/home/hero/university1.png" alt="" aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'bottom' }} />
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: (!mounted || isDark) ? 'rgba(6,22,40,0.35)' : 'rgba(200,218,178,0.25)' }} />
      </div>

      <div className="relative z-30 w-full h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-0">

          {/* Left panel */}
          <div className="flex flex-col items-start text-left px-8 py-10 sm:px-10 md:px-12 lg:px-16 xl:px-20" style={textPanelStyle}>
            <span className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full" style={eyebrowStyle}>
              Germany&apos;s Trusted Student Bridge
            </span>

            <h1 className="font-bold mb-4 leading-[1.12] tracking-tight text-[clamp(20px,3.2vw,50px)]" style={{ color: '#f0f6ff' }}>
              Your bridge from India<br />to Germany,{' '}
              <span style={{ color: '#4A90D9' }}>built by people already there.</span>
            </h1>

            <p className="mb-5 max-w-sm leading-relaxed text-[clamp(13px,1.1vw,16px)]" style={{ color: 'rgba(200,220,245,0.82)', fontWeight: 400 }}>
              Not templates. Not generic advice. Direct access to Indian students at German universities
              and professionals working across Europe — before you decide, during your application,
              and after you land.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 w-full max-w-md">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl px-3 py-2 text-center"
                  style={{ background: 'rgba(74,144,217,0.10)', border: '1px solid rgba(74,144,217,0.22)' }}>
                  <div className="text-[16px] font-bold" style={{ color: '#4A90D9' }}>{s.value}</div>
                  <div className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(200,220,245,0.65)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <a href="#get-started"
                className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 py-2.5 px-6 text-sm"
                style={{ background: 'var(--accent-gold,#ffd97d)', color: '#1a1200', boxShadow: '0 4px 24px rgba(255,217,125,0.45)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,217,125,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,217,125,0.45)'; }}>
                Book a Free Consultation
              </a>
              <a href="#how-it-works"
                className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300 py-2.5 px-6 text-sm"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
                Explore Germany
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { href: '#', label: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366', glow: 'rgba(37,211,102,0.5)' },
                { href: 'mailto:yourmail@example.com', label: 'Email', Icon: FaEnvelope, color: '#EA4335', glow: 'rgba(234,67,53,0.5)' },
                { href: '#', label: 'YouTube', Icon: FaYoutube, color: '#FF0000', glow: 'rgba(255,0,0,0.5)' },
                { href: '#', label: 'Instagram', Icon: FaInstagram, color: '#E4405F', glow: 'rgba(228,64,95,0.5)' },
                { href: '#', label: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2', glow: 'rgba(10,102,194,0.5)' },
              ].map(({ href, label, Icon, color, glow }) => (
                <a key={label} href={href} aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.10)'; e.currentTarget.style.boxShadow = `0 0 24px ${glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Icon style={{ fontSize: 20 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — animated flow text */}
          <div className="hidden md:flex flex-col items-center justify-center px-10 lg:px-16 xl:px-20 gap-8">
            {/* Flow text ticker */}
            <div className="w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(74,144,217,0.22)', background: 'rgba(6,22,40,0.72)', backdropFilter: 'blur(12px)' }}>
                {/* Header */}
                <div className="px-5 py-3 flex items-center gap-2"
                  style={{ borderBottom: '1px solid rgba(74,144,217,0.15)', background: 'rgba(74,144,217,0.08)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#4A90D9' }} />
                  <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(200,220,245,0.6)' }}>
                    Why EuroZiel
                  </span>
                </div>
                {/* Animated lines */}
                <div className="px-5 py-5 min-h-[72px] flex items-center">
                  <style>{`
                    @keyframes flowIn {
                      0% { opacity:0; transform: translateY(14px); }
                      15% { opacity:1; transform: translateY(0); }
                      80% { opacity:1; transform: translateY(0); }
                      100% { opacity:0; transform: translateY(-10px); }
                    }
                    .flow-line { animation: flowIn 2.8s ease-in-out forwards; }
                  `}</style>
                  {FLOW_LINES.map((line, i) => (
                    <p key={i}
                      className={`flow-line text-[15px] font-medium leading-relaxed absolute ${i === activeFlow ? 'block' : 'hidden'}`}
                      style={{ color: '#f0f6ff', position: i === activeFlow ? 'relative' : 'absolute' }}>
                      {line}
                    </p>
                  ))}
                </div>
                {/* Dot progress */}
                <div className="px-5 pb-4 flex gap-1.5">
                  {FLOW_LINES.map((_, i) => (
                    <div key={i} className="rounded-full transition-all duration-500"
                      style={{ height: 4, width: i === activeFlow ? 20 : 6, background: i === activeFlow ? '#4A90D9' : 'rgba(74,144,217,0.25)' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats vertical stack */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl px-4 py-4 text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(6,22,40,0.72)', border: '1px solid rgba(74,144,217,0.22)', backdropFilter: 'blur(8px)' }}>
                  <div className="text-[26px] font-bold leading-none mb-1" style={{ color: '#4A90D9' }}>{s.value}</div>
                  <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(200,220,245,0.6)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="w-full max-w-sm rounded-2xl px-5 py-4 flex items-center justify-between"
              style={{ background: 'rgba(255,217,125,0.10)', border: '1px solid rgba(255,217,125,0.28)', backdropFilter: 'blur(8px)' }}>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: '#ffd97d' }}>Free Consultation</div>
                <div className="text-[11px]" style={{ color: 'rgba(200,220,245,0.6)' }}>Limited slots available</div>
              </div>
              <a href="#get-started"
                className="rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-200"
                style={{ background: '#ffd97d', color: '#1a1200' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Book Now →
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60" aria-hidden="true">
        <span className="uppercase tracking-widest" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Scroll</span>
        <span className="animate-bounce" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>↓</span>
      </div>
    </section>
  );
}