// components/FloatingThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type FloatingThemeToggleProps = {
  inline?: boolean;
  className?: string;
};

export default function FloatingThemeToggle({ inline = false, className = '' }: FloatingThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`${inline ? 'relative' : 'fixed'} z-50 flex items-center justify-center rounded-full transition-all duration-300 ${className}`}
      style={{
        // Fluid size: 40px on tiny screens → 56px on large
        width: 'clamp(40px, 5vw, 56px)',
        height: 'clamp(40px, 5vw, 56px)',
        ...(inline
          ? {}
          : {
              top: 'clamp(10px, 2vw, 24px)',
              right: 'clamp(10px, 2vw, 24px)',
            }),
        background: isDark
          ? 'radial-gradient(circle at 40% 40%, rgba(99,120,180,0.25), rgba(15,23,42,0.6))'
          : 'radial-gradient(circle at 60% 40%, rgba(255,230,100,0.45), rgba(255,200,50,0.15))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isDark
          ? '1px solid rgba(180,200,255,0.25)'
          : '1px solid rgba(255,210,60,0.6)',
        boxShadow: isDark
          ? '0 4px 24px rgba(80,100,200,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 24px rgba(255,200,50,0.45), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.1) rotate(15deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
      }}
    >
      {isDark ? (
        /* ── Crescent Moon ── */
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '55%', height: '55%' }}
        >
          {/* Moon glow */}
          <circle cx="16" cy="16" r="14" fill="rgba(180,200,255,0.06)" />
          {/* Crescent shape: full circle minus an offset circle */}
          <path
            d="M22 16C22 19.866 18.866 23 15 23C11.134 23 8 19.866 8 16C8 12.134 11.134 9 15 9C12.5 11 12 13.5 13.5 16C15 18.5 18 19.5 22 16Z"
            fill="url(#moonGrad)"
          />
          {/* Stars */}
          <circle cx="24" cy="9" r="1" fill="rgba(200,220,255,0.7)" />
          <circle cx="21" cy="6" r="0.6" fill="rgba(200,220,255,0.5)" />
          <circle cx="26" cy="13" r="0.5" fill="rgba(200,220,255,0.5)" />
          <defs>
            <radialGradient id="moonGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e8efff" />
              <stop offset="100%" stopColor="#8aaae5" />
            </radialGradient>
          </defs>
        </svg>
      ) : (
        /* ── Sun ── */
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '60%', height: '60%' }}
        >
          <defs>
            <radialGradient id="sunCore" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff5a0" />
              <stop offset="60%" stopColor="#ffd43b" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,220,50,0.3)" />
              <stop offset="100%" stopColor="rgba(255,220,50,0)" />
            </radialGradient>
          </defs>
          {/* Outer glow */}
          <circle cx="16" cy="16" r="15" fill="url(#sunGlow)" />
          {/* Rays — 8 tapered rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const inner = 9.5;
            const outer = 14.5;
            const halfW = 0.9;
            const perpX = Math.cos(angle + Math.PI / 2);
            const perpY = Math.sin(angle + Math.PI / 2);
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const cx = 16, cy = 16;
            const x1 = cx + cosA * inner + perpX * halfW;
            const y1 = cy + sinA * inner + perpY * halfW;
            const x2 = cx + cosA * inner - perpX * halfW;
            const y2 = cy + sinA * inner - perpY * halfW;
            const x3 = cx + cosA * outer;
            const y3 = cy + sinA * outer;
            return (
              <polygon
                key={i}
                points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                fill="#fbbf24"
                opacity="0.9"
              />
            );
          })}
          {/* Sun core */}
          <circle cx="16" cy="16" r="6.5" fill="url(#sunCore)" />
          {/* Specular highlight */}
          <ellipse cx="14" cy="13.5" rx="2.2" ry="1.4" fill="rgba(255,255,220,0.55)" transform="rotate(-20,14,13.5)" />
        </svg>
      )}
    </button>
  );
}