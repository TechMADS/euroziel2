'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Pill({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <span
      className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm"
      style={{
        background: isDark ? 'rgba(8,145,178,0.15)' : 'rgba(0,109,158,0.12)',
        border: '1px solid rgba(8,145,178,0.40)',
        color: isDark ? '#22d3ee' : '#006d9e',
      }}
    >
      {children}
    </span>
  );
}

// Icons for each step
function ProfileIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M17 3.5L19 5.5L23 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UniversityIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 12V16L12 19L18 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function APSIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M8 7H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="19" cy="19" r="2" fill={color} stroke="none"/>
    </svg>
  );
}

function SOPIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20V20H4V4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 8H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 16H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LanguageIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12H22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2C14.5 4.5 16 8.5 16 12C16 15.5 14.5 19.5 12 22" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C9.5 4.5 8 8.5 8 12C8 15.5 9.5 19.5 12 22" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function ApplicationIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20V20H4V4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 4V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 4V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function OfferIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22 11.1C22 16.5 17.5 20.9 12 20.9C6.5 20.9 2 16.5 2 11.1C2 5.7 6.5 1.3 12 1.3C17.5 1.3 22 5.7 22 11.1Z" stroke={color} strokeWidth="1.5"/>
      <path d="M8 11L11 14L17 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LoanIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 4L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 18L12 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function BlockedIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M8 5V3H16V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 10H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="13" r="1.5" fill={color}/>
    </svg>
  );
}

function InsuranceIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6V12C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12V6L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="0.5" fill={color} stroke={color} strokeWidth="1"/>
    </svg>
  );
}

function VisaIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M2 8H22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill={color}/>
    </svg>
  );
}

function FlightIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L12 8L17 12L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8L7 12L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22L12 16L17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16L7 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PickupIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="1.5"/>
      <path d="M22 9L18 13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function AccommodationIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M8 8V6H16V8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SettleIcon({ color = '#006d9e', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 6H9L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 8H19V20H5V8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 12V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function StepCard({ number, title, icon: Icon, description, isDark, delay }: {
  number: number;
  title: string;
  icon: React.ComponentType<{ color?: string; size?: number }>;
  description: string;
  isDark: boolean;
  delay: number;
}) {
  const surface = isDark ? '#0d2540' : '#ffffff';
  const border = isDark ? 'rgba(15,76,143,0.15)' : 'rgba(15,76,143,0.18)';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.68)' : 'rgba(30,50,80,0.65)';

  return (
    <Reveal delay={delay}>
      <div
        className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 h-full"
        style={{ background: surface, border: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[16px]"
            style={{ background: '#006d9e', color: '#fff' }}
          >
            {number}
          </div>
          <Icon color="#006d9e" size={22} />
        </div>
        <h3 className="font-serif font-bold text-[17px] mb-2" style={{ color: text }}>{title}</h3>
        <p className="text-[14px] leading-relaxed" style={{ color: sub }}>{description}</p>
      </div>
    </Reveal>
  );
}

export default function ProcessStepsSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
  if (!mounted) return null;
  
  const steps = [
    { number: 1, title: "Profile Verification", icon: ProfileIcon, description: "CGPA, backlogs, gap years, work experience — we assess where you genuinely stand and build from there. No sugarcoating." },
    { number: 2, title: "University Selection", icon: UniversityIcon, description: "Three tiers: ambitious, realistic, safe. We match you to universities where your profile is actually competitive." },
    { number: 3, title: "APS Application", icon: APSIcon, description: "Start at the right time. APS takes 6-12 weeks. We make sure your certificate arrives before your first deadline." },
    { number: 4, title: "SOP / LOR / CV", icon: SOPIcon, description: "We help you shape your own story into something genuinely compelling — not generic templates." },
    { number: 5, title: "IELTS / GRE / German", icon: LanguageIcon, description: "Targeted preparation focusing on your weakest sections first. Half the market rate for EuroZiel students." },
    { number: 6, title: "University Application", icon: ApplicationIcon, description: "Every portal, every deadline, every document. We manage everything end to end." },
    { number: 7, title: "Offer Letter", icon: OfferIcon, description: "We read every offer with you, explain conditions, and help you choose the right university." },
    { number: 8, title: "Loan Assistance", icon: LoanIcon, description: "We know which banks process Germany loans without complications." },
    { number: 9, title: "Blocked Account", icon: BlockedIcon, description: "Exact process, document sequence, and transfer timing so your confirmation is ready." },
    { number: 10, title: "Insurance Assistance", icon: InsuranceIcon, description: "Enrol with TK, AOK, or Barmer from India itself. Your confirmation ready for visa." },
    { number: 11, title: "Visa Guidance", icon: VisaIcon, description: "Complete mock embassy interviews until your answers are clear and consistent." },
    { number: 12, title: "Flight to Germany", icon: FlightIcon, description: "Pre-departure checklist and real conversation — we don't stop at offer letters." },
    { number: 13, title: "On-Arrival Pickup", icon: PickupIcon, description: "Our Germany-based student network coordinates your arrival support." },
    { number: 14, title: "Accommodation", icon: AccommodationIcon, description: "WG profile, Studentenwerk applications, and live information from students already there." },
    { number: 15, title: "Settling in Germany", icon: SettleIcon, description: "Anmeldung, bank account, tax ID, university enrolment — you are never navigating it alone." }
  ];

  return (
    <section className="py-24 px-5 sm:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Reveal>
          <Pill isDark={isDark}>OUR PROCESS</Pill>
          <h2 className="font-serif font-bold mt-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: text }}>
            From application to settlement.
            <br />
            <span style={{ color: '#006d9e' }}>Every step covered.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {steps.map((step, i) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            icon={step.icon}
            description={step.description}
            isDark={isDark}
            delay={i * 50}
          />
        ))}
      </div>
    </section>
  );
}
