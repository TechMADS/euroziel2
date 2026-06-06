// sections/Home/Journey.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Search, Map, FileText, Plane, Home, TrendingUp } from 'lucide-react';

interface Step {
    number: string;
    label: string;
    title: string;
    description: string;
    bullets: string[];
    stats: [string, string];
    Icon: React.ElementType;
    accent: string;
    image: string;
}

const steps: Step[] = [
    {
        number: '01',
        label: 'Discovery',
        title: 'Your German Dream Begins',
        description: 'Start with a personalized consultation to map out your unique path to Germany.',
        bullets: [
            'Free 30-Minute Consultation',
            'Profile Evaluation',
            'Goal & Career Mapping',
            'University Shortlisting',
        ],
        stats: ['98% Student Satisfaction', '< 24 Hours Initial Response Time'],
        Icon: Search,
        accent: '#4A90D9',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
    },
    {
        number: '02',
        label: 'Strategy',
        title: 'Building Your Germany Roadmap',
        description: 'We create a customized application strategy based on your profile and goals.',
        bullets: [
            'Personalized Application Strategy',
            'Domain-Based Expert Guidance',
            'Course & University Matching',
            'Application Timeline Planning',
        ],
        stats: ['Germany-Focused Guidance', 'Tailored for Your Profile'],
        Icon: Map,
        accent: '#ffd97d',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
    },
    {
        number: '03',
        label: 'Applications',
        title: 'Turning Plans Into Offers',
        description: 'From SOPs to uni-assist submissions, we ensure error-free documentation.',
        bullets: [
            'SOP & LOR Guidance',
            'Application Submission Support',
            'APS Documentation Assistance',
            'University Portal Handling',
        ],
        stats: ['Error-Free Documentation', 'End-to-End Support'],
        Icon: FileText,
        accent: '#7ED8A4',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85'
    },
    {
        number: '04',
        label: 'Visa & Pre-Departure',
        title: 'Preparing You for Germany',
        description: 'We guide you through every requirement for a smooth transition.',
        bullets: [
            'Blocked Account Guidance',
            'Visa Documentation Support',
            'Accommodation Assistance',
            'Travel Preparation',
        ],
        stats: ['Step-by-Step Visa Support', 'Complete Pre-Arrival Guidance'],
        Icon: Plane,
        accent: '#C084FC',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'
    },
    {
        number: '05',
        label: 'Arrival & Settlement',
        title: 'Settling Into Your New Life',
        description: 'Our support continues even after you land in Germany.',
        bullets: [
            'Anmeldung Guidance',
            'Health Insurance Support',
            'Bank Account Setup',
            'Student Community Connections',
        ],
        stats: ['On-Ground Student Support', 'Real Guidance From Germany'],
        Icon: Home,
        accent: '#FB923C',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b'
    },
    {
        number: '06',
        label: 'Growth & Career',
        title: 'Beyond Admission. Toward Your Future.',
        description: 'Career and networking support to help you thrive in Germany.',
        bullets: [
            'Career Support',
            'Industry Insights',
            'Internship Guidance',
            'Long-Term Mentorship',
        ],
        stats: ['Built for Long-Term Success', 'Germany Career Pathway'],
        Icon: TrendingUp,
        accent: '#4A90D9',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72'
    }
];

function hexToRgb(hex: string): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

export default function Journey() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        if (!section || !sticky) return;

        const slides = sticky.querySelectorAll<HTMLDivElement>('.journey-slide');
        const total = slides.length;

        const onScroll = () => {
            const rect = section.getBoundingClientRect();
            const scrolled = -rect.top;
            const scrollable = rect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollable));
            const rawIndex = progress * (total - 1);
            const currentIndex = Math.floor(rawIndex);
            const localProgress = rawIndex - currentIndex;

            slides.forEach((slide, i) => {
                if (i < currentIndex) {
                    slide.style.transform = 'translateX(0%) scale(0.96)';
                    slide.style.opacity = '0.5';
                    slide.style.zIndex = String(i + 1);
                } else if (i === currentIndex) {
                    const tx = -localProgress * 6;
                    const sc = 1 - localProgress * 0.04;
                    const op = 1 - localProgress * 0.5;
                    slide.style.transform = `translateX(${tx}%) scale(${sc})`;
                    slide.style.opacity = String(op);
                    slide.style.zIndex = String(total + 1);
                } else if (i === currentIndex + 1) {
                    const direction = i % 2 === 0 ? 1 : -1;
                    const tx = direction * (100 - localProgress * 100);
                    slide.style.transform = `translateX(${tx}%)`;
                    slide.style.opacity = '1';
                    slide.style.zIndex = String(total + 2);
                } else {
                    const direction = i % 2 === 0 ? 1 : -1;
                    slide.style.transform = `translateX(${direction * 100}%)`;
                    slide.style.opacity = '1';
                    slide.style.zIndex = String(i + 1);
                }
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Theme-aware background colors
    const sectionBg = isDark ? '#061628' : '#e8f4fd';
    const stickyBg = isDark ? '#04111f' : '#d4eaff';
    const textPanelBg = isDark ? '#04111f' : '#f0f8ff';
    const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
    const textSecondary = isDark ? 'rgba(200,220,245,0.75)' : 'rgba(30,50,80,0.75)';
    const bulletColor = isDark ? 'rgba(220,235,255,0.90)' : 'rgba(30,50,80,0.85)';
    const statBg = isDark ? 'rgba(74,144,217,0.08)' : 'rgba(74,144,217,0.12)';
    const statText = isDark ? '#A8C8F0' : '#2a5a9a';
    const dotInactive = isDark ? 'rgba(74,144,217,0.25)' : 'rgba(74,144,217,0.4)';

    return (
        <>
            {/* Section header */}
            <div 
                className="py-16 px-6 text-center transition-colors duration-300"
                style={{ backgroundColor: sectionBg }}
            >
                <span
                    className="inline-block mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
                    style={{
                        background: 'rgba(74,144,217,0.15)',
                        border: '1px solid rgba(74,144,217,0.35)',
                        letterSpacing: '0.15em',
                        color: '#ffd97d',
                    }}
                >
                    Your Complete Journey
                </span>
                <h2
                    className="font-bold text-[clamp(26px,4vw,52px)] leading-tight max-w-3xl mx-auto"
                    style={{ color: textColor }}
                >
                    Six steps from dream{' '}
                    <span className="text-[#4A90D9]">to Deutschland.</span>
                </h2>
                <p 
                    className="mt-4 text-[clamp(14px,1.2vw,17px)] max-w-xl mx-auto leading-relaxed"
                    style={{ color: textSecondary }}
                >
                    A structured, end-to-end journey — designed so you always know what comes next.
                </p>
            </div>

            {/* Scroll-driven sticky container */}
            <div
                ref={sectionRef}
                style={{ height: `${steps.length * 100}vh` }}
                className="relative"
            >
                <div
                    ref={stickyRef}
                    className="sticky top-0 h-screen overflow-hidden transition-colors duration-300"
                    style={{ backgroundColor: stickyBg }}
                >
                    {steps.map((step, i) => {
                        const imageLeft = i % 2 === 0;
                        return (
                            <div
                                key={step.number}
                                className="journey-slide absolute inset-0 h-full w-full will-change-transform"
                                style={{
                                    transform: i === 0 ? 'translateX(0%)' : 'translateX(100%)',
                                    zIndex: i === 0 ? steps.length + 1 : i + 1,
                                    transition: 'none',
                                    backgroundColor: textPanelBg,
                                }}
                            >
                                {/* Inner grid */}
                                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">

                                    {/* Image column */}
                                    <div
                                        className={`relative hidden md:block ${imageLeft ? 'order-1' : 'order-2'}`}
                                        style={{
                                            backgroundImage: `linear-gradient( rgba(4,17,31,0.65),rgba(4,17,31,0.85)),url(${step.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                                            style={{
                                                fontSize: 'clamp(120px, 20vw, 280px)',
                                                fontWeight: 900,
                                                color: 'rgba(74,144,217,0.06)',
                                                lineHeight: 1,
                                                fontVariantNumeric: 'tabular-nums',
                                            }}
                                        >
                                            {step.number}
                                        </div>

                                        <div
                                            className="absolute top-0 bottom-0 w-[3px]"
                                            style={{
                                                background: step.accent,
                                                [imageLeft ? 'right' : 'left']: 0,
                                                opacity: 0.6,
                                            }}
                                        />

                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                                            <div
                                                className="rounded-2xl flex items-center justify-center"
                                                style={{
                                                    width: 88,
                                                    height: 88,
                                                    background: `rgba(${hexToRgb(step.accent)}, 0.12)`,
                                                    border: `1.5px solid rgba(${hexToRgb(step.accent)}, 0.35)`,
                                                }}
                                            >
                                                <step.Icon
                                                    style={{ width: 40, height: 40, color: step.accent }}
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                            <div
                                                className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                                                style={{
                                                    background: `rgba(${hexToRgb(step.accent)}, 0.10)`,
                                                    border: `1px solid rgba(${hexToRgb(step.accent)}, 0.30)`,
                                                    color: step.accent,
                                                    letterSpacing: '0.15em',
                                                }}
                                            >
                                                Step {step.number} — {step.label}
                                            </div>
                                        </div>

                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                backgroundImage: `
                                                    linear-gradient(rgba(74,144,217,0.04) 1px, transparent 1px),
                                                    linear-gradient(90deg, rgba(74,144,217,0.04) 1px, transparent 1px)
                                                `,
                                                backgroundSize: '48px 48px',
                                            }}
                                        />
                                    </div>

                                    {/* Text column */}
                                    <div
                                        className={`flex flex-col justify-center px-8 py-10 sm:px-12 md:px-14 lg:px-16 xl:px-20 ${imageLeft ? 'order-2' : 'order-1'}`}
                                        style={{ backgroundColor: textPanelBg }}
                                    >
                                        {/* Mobile step badge */}
                                        <div className="md:hidden mb-6">
                                            <span
                                                className="inline-block text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                                                style={{
                                                    background: `rgba(${hexToRgb(step.accent)}, 0.12)`,
                                                    border: `1px solid rgba(${hexToRgb(step.accent)}, 0.35)`,
                                                    color: step.accent,
                                                }}
                                            >
                                                Step {step.number} — {step.label}
                                            </span>
                                        </div>

                                        {/* Label */}
                                        <p
                                            className="mb-2 text-xs font-semibold uppercase tracking-widest hidden md:block"
                                            style={{ color: step.accent, letterSpacing: '0.15em' }}
                                        >
                                            Step {step.number}
                                        </p>

                                        {/* Title */}
                                        <h3
                                            className="font-bold leading-tight mb-4"
                                            style={{ fontSize: 'clamp(22px, 3vw, 42px)', color: textColor }}
                                        >
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="mb-8 leading-relaxed"
                                            style={{
                                                fontSize: 'clamp(13px, 1.1vw, 16px)',
                                                color: textSecondary,
                                                maxWidth: '38ch',
                                            }}
                                        >
                                            {step.description}
                                        </p>

                                        {/* Bullets */}
                                        <ul className="space-y-3 mb-10">
                                            {step.bullets.map((b) => (
                                                <li key={b} className="flex items-center gap-3">
                                                    <span
                                                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                                                        style={{
                                                            background: `rgba(${hexToRgb(step.accent)}, 0.15)`,
                                                            border: `1px solid rgba(${hexToRgb(step.accent)}, 0.40)`,
                                                        }}
                                                    >
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <circle cx="4" cy="4" r="3" fill={step.accent} />
                                                        </svg>
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium"
                                                        style={{ color: bulletColor }}
                                                    >
                                                        {b}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Stats */}
                                        <div className="flex flex-wrap gap-3">
                                            {step.stats.map((s) => (
                                                <div
                                                    key={s}
                                                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-300"
                                                    style={{
                                                        background: statBg,
                                                        border: '1px solid rgba(74,144,217,0.20)',
                                                        color: statText,
                                                    }}
                                                >
                                                    {s}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Progress dots */}
                                        <div className="flex gap-2 mt-10">
                                            {steps.map((_, di) => (
                                                <div
                                                    key={di}
                                                    className="rounded-full transition-all duration-300"
                                                    style={{
                                                        width: di === i ? 20 : 6,
                                                        height: 6,
                                                        background: di === i ? step.accent : dotInactive,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}