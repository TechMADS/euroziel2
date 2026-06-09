// components/FloatingLoginButton.tsx
'use client';
import { useEffect, useRef } from 'react';
import { forwardRef } from 'react';

const BoyDoorSVG = forwardRef<SVGSVGElement, { size: number }>(({ size }, ref) => (
  <svg ref={ref} viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size, flexShrink: 0 }}>

    {/* door frame */}
    <rect x="10" y="6" width="14" height="22" rx="1.5"
      stroke="#c084fc" strokeWidth="1.4" fill="none">
      <animate attributeName="stroke" values="#c084fc;#e879f9;#c084fc" dur="2s" repeatCount="indefinite" />
    </rect>

    {/* door panel — swings open */}
    <rect x="11" y="7" width="12" height="20" rx="1" fill="#7c3aed" opacity="0.9">
      <animate attributeName="width" values="12;2;12" dur="3s" repeatCount="indefinite"
        keyTimes="0;0.45;1" calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" repeatCount="indefinite"
        keyTimes="0;0.45;1" />
    </rect>

    {/* warm light behind open door */}
    <rect x="11" y="7" width="12" height="20" rx="1" fill="#fde68a" opacity="0">
      <animate attributeName="opacity" values="0;0.55;0" dur="3s" repeatCount="indefinite"
        keyTimes="0;0.45;1" calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
    </rect>

    {/* knob */}
    <circle cx="20.5" cy="17" r="1.2" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"
        keyTimes="0;0.3;1" />
      <animate attributeName="r" values="1.2;1.6;1.2" dur="1.4s" repeatCount="indefinite" />
    </circle>

    {/* BOY — walks right then shrinks inside */}
    <g>
      {/* body */}
      <rect x="6" y="16" width="5" height="7" rx="1" fill="#e879f9">
        <animate attributeName="x" values="2;14;14" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <animate attributeName="width" values="5;2;2" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.5;1" />
        <animate attributeName="height" values="7;3;3" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.5;1" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.55;0.65" />
      </rect>

      {/* head */}
      <circle cx="8.5" cy="13.5" r="3" fill="#fde68a">
        <animate attributeName="cx" values="4.5;16.5;16.5" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <animate attributeName="r" values="3;1;1" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.5;1" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.55;0.65" />
      </circle>

      {/* leg walk cycle */}
      <line x1="7" y1="23" x2="5.5" y2="27" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="x1" values="7;15;15" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <animate attributeName="x2" values="5.5;13.5;13.5" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" />
        <animateTransform attributeName="transform" type="rotate"
          values="0 7 23;12 7 23;-12 7 23;0 7 23" dur="0.5s" repeatCount="indefinite"
          additive="sum" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.55;0.65" />
      </line>
      <line x1="9" y1="23" x2="10.5" y2="27" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="x1" values="9;17;17" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        <animate attributeName="x2" values="10.5;18.5;18.5" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.42;1" />
        <animateTransform attributeName="transform" type="rotate"
          values="0 9 23;-12 9 23;12 9 23;0 9 23" dur="0.5s" repeatCount="indefinite"
          additive="sum" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"
          keyTimes="0;0.55;0.65" />
      </line>
    </g>
  </svg>
));
BoyDoorSVG.displayName = 'BoyDoorSVG';

export default function FloatingLoginButton({
  inline = false,
  className = '',
  onClick,
}: { inline?: boolean; className?: string; onClick?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const btn = svg.closest('button') as HTMLButtonElement;
    if (!btn) return;
    let raf: number, sc = 1, ty = 0, tsc = 1, tty = 0;
    const tick = () => {
      sc += (tsc - sc) * 0.15;
      ty += (tty - ty) * 0.15;
      btn.style.transform = `translateY(${ty.toFixed(2)}px) scale(${sc.toFixed(4)})`;
      raf = requestAnimationFrame(tick);
    };
    btn.addEventListener('mouseenter', () => { tsc = 1.12; tty = inline ? -1 : -3; });
    btn.addEventListener('mouseleave', () => { tsc = 1; tty = 0; });
    btn.addEventListener('mousedown', () => { tsc = 0.93; });
    btn.addEventListener('mouseup', () => { tsc = 1.12; });
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inline]);

  const size = inline ? 52 : 'clamp(70px,8vw,90px)';

  return (
    <button
      aria-label="Login"
      onClick={onClick}
      className={`${inline ? 'relative' : 'fixed'} z-50 flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none',
        background: 'transparent',
        ...(inline
          ? {}
          : {
            top: '12px',
            right: 'calc(28px + clamp(44px,5vw,56px) + 12px)',
          }),
      }}
    >
      <BoyDoorSVG ref={svgRef} size={inline ? 40 : 56} />
    </button>
  );
}