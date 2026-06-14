'use client';

import React, { useEffect, useRef, useState, CSSProperties, MouseEvent } from 'react';
import { useTheme } from 'next-themes';
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { openEnquiryModal } from '@/lib/enquiryModal';

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
    ? { background: 'linear-gradient(to bottom, #0b1323 0%, #0d2540 40%, #0f3060 70%, #006d9e 100%)' }
    : { background: 'linear-gradient(to bottom, #1a6fbf 0%, #0ea5e9 30%, #0ea5e9 65%, #a8d4f5 100%)' };

  const textPanelStyle: CSSProperties = {
    background: (!mounted || isDark) ? 'rgba(6,18,38,0.84)' : 'rgba(4,1,1,0.78)',
    borderRight: '1px solid rgba(15,76,143,0.15)',
    borderTop: '1px solid rgba(15,76,143,0.10)',
    borderBottom: '1px solid rgba(15,76,143,0.10)',
    borderRadius: '0 2rem 2rem 0',
    boxShadow: '4px 0 40px rgba(0,0,0,0.35)',
  };

  const eyebrowStyle: CSSProperties = {
    background: 'rgba(15,76,143,0.15)',
    border: '1px solid rgba(15,76,143,0.35)',
    letterSpacing: '0.15em', color: '#f59e0b',
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
          <div className="flex flex-col items-start text-left section-px section-py" style={textPanelStyle}>
            {/* <span className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full" style={eyebrowStyle}>
              Germany&apos;s Trusted Student Bridge
            </span> */}

            <h1 className="font-bold mb-6 leading-tight tracking-tight text-[clamp(36px,5vw,64px)]" style={{ color: '#f0f6ff' }}>
              Your bridge from India<br />to Germany,{' '}
              <span style={{ color: '#006d9e' }}>built by people already there.</span>
            </h1>

            <p className="mb-8 max-w-lg leading-relaxed text-[18px]" style={{ color: 'rgba(200,220,245,0.90)', fontWeight: 400 }}>
              Not templates. Not generic advice. Direct access to Indian students at German universities
              and professionals working across Europe — before you decide, during your application,
              and after you land.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-md">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl px-4 py-3 text-center"
                  style={{ background: 'rgba(15,76,143,0.10)', border: '1px solid rgba(15,76,143,0.22)' }}>
                  <div className="text-[18px] font-bold" style={{ color: '#006d9e' }}>{s.value}</div>
                  <div className="text-[12px] leading-snug mt-1" style={{ color: 'rgba(200,220,245,0.75)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={openEnquiryModal}
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 py-3 px-7 text-base"
                style={{ background: 'var(--accent-gold,#f59e0b)', color: '#1a1200', boxShadow: '0 4px 24px rgba(245,158,11,0.45)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(245,158,11,0.45)'; }}>
                Book a Free Consultation
              </button>
              <a href="#how-it-works"
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 py-3 px-7 text-base"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
                Explore Germany
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { href: '#', label: 'WhatsApp', Icon: FaWhatsapp, color: '#10b981', glow: 'rgba(16,185,129,0.5)' },
                { href: 'mailto:yourmail@example.com', label: 'Email', Icon: FaEnvelope, color: '#dc2626', glow: 'rgba(220,38,38,0.5)' },
                { href: '#', label: 'YouTube', Icon: FaYoutube, color: '#ef4444', glow: 'rgba(239,68,68,0.5)' },
                { href: '#', label: 'Instagram', Icon: FaInstagram, color: '#ec4899', glow: 'rgba(236,72,153,0.5)' },
                { href: '#', label: 'LinkedIn', Icon: FaLinkedin, color: '#0891b2', glow: 'rgba(8,145,178,0.5)' },
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
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid rgba(15,76,143,0.22)',
                  background:
                    'linear-gradient(rgba(6,22,40,0.78),rgba(6,22,40,0.92)), url("https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backdropFilter: 'blur(12px)'
                }}
              >

                {/* Header */}
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{
                    borderBottom: '1px solid rgba(15,76,143,0.15)',
                    background: 'rgba(15,76,143,0.08)'
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#006d9e' }}
                  />

                  <span
                    className="text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: 'rgba(200,220,245,0.6)' }}
                  >
                    Why EuroZiel
                  </span>

                </div>


                {/* Animated lines */}
                <div className="px-5 py-5 min-h-[72px] flex items-center">

                  {FLOW_LINES.map((line, i) => (
                    <p
                      key={i}
                      className={`flow-line text-[15px] font-medium leading-relaxed absolute ${i === activeFlow ? 'block' : 'hidden'}`}
                      style={{
                        color: '#f0f6ff',
                        position: i === activeFlow ? 'relative' : 'absolute'
                      }}
                    >
                      {line}
                    </p>
                  ))}

                </div>

                {/* Dot progress */}
                <div className="px-5 pb-4 flex gap-1.5">

                  {FLOW_LINES.map((_, i) => (

                    <div
                      key={i}
                      className="rounded-full transition-all duration-500"
                      style={{
                        height: 4,
                        width: i === activeFlow ? 20 : 6,
                        background:
                          i === activeFlow
                            ? '#006d9e'
                            : 'rgba(15,76,143,0.25)'
                      }}
                    />

                  ))}

                </div>


              </div>
            </div>

            {/* Stats vertical stack */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl px-4 py-4 text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(6,22,40,0.72)', border: '1px solid rgba(15,76,143,0.22)', backdropFilter: 'blur(8px)' }}>
                  <div className="text-[26px] font-bold leading-none mb-1" style={{ color: '#006d9e' }}>{s.value}</div>
                  <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(200,220,245,0.6)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="w-full max-w-sm rounded-2xl px-5 py-4 flex items-center justify-between"
              style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.28)', backdropFilter: 'blur(8px)' }}>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: '#f59e0b' }}>Free Consultation</div>
                <div className="text-[11px]" style={{ color: 'rgba(200,220,245,0.6)' }}>Limited slots available</div>
              </div>
              <button
                onClick={openEnquiryModal}
                className="rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-200"
                style={{ background: '#f59e0b', color: '#1a1200' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Book Now →
              </button>
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
