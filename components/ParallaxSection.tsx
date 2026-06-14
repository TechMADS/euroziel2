'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  id,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Create parallax animation
    gsap.to(content, {
      y: window.innerHeight * speed,
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2,
        markers: false,
      },
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        ref={contentRef}
        style={{
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
