'use client';

import { useEffect } from 'react';
import Hero from '@/sections/Home/Hero';
import WhyEuroZiel from '@/sections/Home/WhyEuroZiel';
import WhyChoose from '@/sections/Home/WhyChoose';
import Journey from '@/sections/Home/Journey';
import Testimonials from '@/sections/Home/Testimonials';
import FinalCTA from '@/sections/Home/FinalCTA';

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.scroll-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('section-visible');
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -4% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .scroll-section {
          opacity: 0;
          transform: translateY(52px) scale(0.997);
          transition:
            opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .scroll-section.section-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .hero-section {
          opacity: 1 !important;
          transform: none !important;
        }
        .stagger-children > * {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .scroll-section.section-visible .stagger-children > *:nth-child(1) { opacity:1; transform:none; transition-delay:0.08s; }
        .scroll-section.section-visible .stagger-children > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.18s; }
        .scroll-section.section-visible .stagger-children > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.28s; }
        .scroll-section.section-visible .stagger-children > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.38s; }
        .scroll-section.section-visible .stagger-children > *:nth-child(5) { opacity:1; transform:none; transition-delay:0.48s; }
        .scroll-section.section-visible .stagger-children > *:nth-child(6) { opacity:1; transform:none; transition-delay:0.58s; }
        .section-rule {
          width:100%;
          height:1px;
          background:linear-gradient(to right,transparent 0%,rgba(74,144,217,0.30) 30%,rgba(255,217,125,0.28) 70%,transparent 100%);
        }
      `}</style>

      <div className="scroll-section hero-section"><Hero /></div>
      <div className="section-rule" />
      <div className="scroll-section"><WhyEuroZiel /></div>
      <div className="section-rule" />
      <div className="scroll-section"><WhyChoose /></div>
      <div className="section-rule" />
      <div className="scroll-section"><Journey /></div>
      <div className="section-rule" />
      <div className="scroll-section"><Testimonials /></div>
      <div className="section-rule" />
      <div className="scroll-section"><FinalCTA /></div>
    </>
  );
}