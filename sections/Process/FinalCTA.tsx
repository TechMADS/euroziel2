'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { openEnquiryModal } from '@/lib/enquiryModal';

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

export default function ProcessFinalCTA() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { ref, visible } = useReveal();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <section className="py-28 px-5 sm:px-8">
      <div
        ref={ref}
        className="max-w-3xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="rounded-3xl px-8 py-16 relative overflow-hidden text-center"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #0d2540 0%, #061628 100%)'
              : 'linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 100%)',
            border: '1px solid rgba(74,144,217,0.18)',
            boxShadow: isDark
              ? '0 16px 60px rgba(0,0,0,0.40)'
              : '0 16px 60px rgba(74,144,217,0.12)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.18) 0%, transparent 70%)' }}
            aria-hidden
          />

          <div className="relative z-10">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#4A90D9' }}>
              Still Confused About Your Germany Pathway?
            </p>
            <h2
              className="font-serif font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', color: text }}
            >
              Get a Realistic Evaluation{' '}
              <span style={{ color: '#FFD97D' }}>of Your Profile</span>
            </h2>
            <p
              className="text-[17px] leading-relaxed mb-10 mx-auto"
              style={{ color: sub, maxWidth: '46ch' }}
            >
              Speak with our team and understand your eligibility, options, and the exact steps you need to take — specific to your profile, not a generic script.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openEnquiryModal}
                className="rounded-full px-8 py-4 text-[16px] font-bold transition-all duration-200 cursor-pointer"
                style={{ background: '#FFD97D', color: '#1a1200', boxShadow: '0 4px 20px rgba(255,217,125,0.38)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(255,217,125,0.55)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(255,217,125,0.38)';
                }}
              >
                Get Your Germany Roadmap →
              </button>
              <a
                href="https://wa.me/917598969875"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-8 py-4 text-[16px] font-semibold transition-all duration-200 flex items-center gap-2"
                style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 20px rgba(37,211,102,0.32)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}