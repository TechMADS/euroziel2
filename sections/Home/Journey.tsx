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


function hexToRgb(hex: string) {
    const h = hex.replace('#', '');
    return `${parseInt(h.substring(0, 2), 16)}, 
            ${parseInt(h.substring(2, 4), 16)}, 
            ${parseInt(h.substring(4, 6), 16)}`;
}


export default function Journey() {

    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";


    useEffect(() => {

        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;


        let ticking = false;


        const update = () => {

            const rect = section.getBoundingClientRect();

            const total =
                section.offsetHeight -
                window.innerHeight;


            const progress =
                Math.min(
                    1,
                    Math.max(
                        0,
                        -rect.top / total
                    )
                );


            const move =
                progress *
                (steps.length - 1) *
                100;


            track.style.transform =
                `translate3d(-${move}vw,0,0)`;


            ticking = false;
        };



        const onScroll = () => {

            if (!ticking) {

                requestAnimationFrame(update);
                ticking = true;

            }

        };


        window.addEventListener(
            "scroll",
            onScroll,
            { passive: true }
        );


        update();


        return () => {
            window.removeEventListener(
                "scroll",
                onScroll
            );
        };


    }, []);



    const sectionBg =
        isDark ? "#061628" : "#e8f4fd";

    const panelBg =
        isDark ? "#04111f" : "#f0f8ff";

    const textColor =
        isDark ? "#f0f6ff" : "#1a2a4a";

    const textSecondary =
        isDark
            ? "rgba(200,220,245,.75)"
            : "rgba(30,50,80,.75)";

    return (

        <>
            {/* heading */}

            <div
                className="py-16 px-6 text-center"
                style={{ background: sectionBg }}
            >

                <span
                    className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                    style={{
                        color: "#ffd97d",
                        background: "rgba(74,144,217,.15)"
                    }}
                >
                    Your Complete Journey
                </span>


                <h2
                    className="font-bold text-[clamp(26px,4vw,52px)]"
                    style={{ color: textColor }}
                >

                    Six steps from dream
                    <span className="text-[#4A90D9]">
                        {" "}to Deutschland.
                    </span>

                </h2>


                <p
                    className="mt-4 max-w-xl mx-auto"
                    style={{ color: textSecondary }}
                >
                    A structured, end-to-end journey.
                </p>

            </div>





            {/* horizontal scroll section */}


            <div
                ref={sectionRef}
                className="relative"
                style={{
                    height: `${steps.length * 100}vh`
                }}
            >


                <div
                    className="sticky top-0 h-screen overflow-hidden"
                    style={{
                        background: panelBg
                    }}
                >
                    <div
                        ref={trackRef}
                        className="flex h-full will-change-transform"
                    >
                        {
                            steps.map((step, i) => {
                                const imageLeft = i % 2 === 0;
                                return (

                                    <div
                                        key={step.number}
                                        className="relative flex-shrink-0 w-screen h-full"
                                    >
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-2 h-full"
                                        >
                                            {/* image */}
                                            <div
                                                className={`hidden md:block relative ${imageLeft ? "order-1" : "order-2"}`}
                                                style={{
                                                    backgroundImage: `linear-gradient(rgba(4,17,31,.65),rgba(4,17,31,.85)), url(${step.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center"
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center"
                                                    style={{
                                                        fontSize: "clamp(120px,20vw,280px)",
                                                        color: "rgba(74,144,217,.08)",
                                                        fontWeight: 900
                                                    }}
                                                >
                                                    {step.number}

                                                </div>
                                                <div
                                                    className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                                                >
                                                    <div
                                                        className="rounded-2xl flex items-center justify-center"
                                                        style={{
                                                            width: 90,
                                                            height: 90,
                                                            background:
                                                                `rgba(${hexToRgb(step.accent)},.15)`
                                                        }}
                                                    >
                                                        <step.Icon
                                                            size={40}
                                                            color={step.accent}
                                                        />

                                                    </div>
                                                    <span
                                                        className="px-4 py-2 rounded-full text-xs"
                                                        style={{
                                                            color: step.accent,
                                                            background:
                                                                `rgba(${hexToRgb(step.accent)},.1)`
                                                        }}
                                                    >
                                                        Step {step.number} — {step.label}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* content */}
                                            <div
                                                className={`flex flex-col justify-center px-8 lg:px-20 ${imageLeft ? "order-2" : "order-1"}`}
                                                style={{
                                                    background: panelBg
                                                }}
                                            >
                                                <p
                                                    className="text-xs uppercase tracking-widest mb-3"
                                                    style={{
                                                        color: step.accent
                                                    }}
                                                >
                                                    Step {step.number}
                                                </p>
                                                <h3
                                                    className="font-bold text-[clamp(24px,3vw,44px)] mb-4"
                                                    style={{
                                                        color: textColor
                                                    }}
                                                >
                                                    {step.title}
                                                </h3>
                                                <p
                                                    className="mb-8 max-w-md"
                                                    style={{
                                                        color: textSecondary
                                                    }}
                                                >
                                                    {step.description}
                                                </p>
                                                <ul className="space-y-3">
                                                    {
                                                        step.bullets.map(b => (

                                                            <li
                                                                key={b}
                                                                className="flex gap-3"
                                                            >
                                                                <span
                                                                    className="w-4 h-4 rounded-full"
                                                                    style={{
                                                                        background: step.accent
                                                                    }}
                                                                />
                                                                <span>
                                                                    {b}
                                                                </span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}