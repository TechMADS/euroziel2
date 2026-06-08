'use client';

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Search,
  Map,
  FileText,
  Plane,
  Home,
  TrendingUp
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    label: "Discovery",
    title: "Your German Dream Begins",
    description: "Start with a personalized consultation to map your unique path to Germany.",
    Icon: Search,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    accent: "#4A90D9"
  },
  {
    number: "02",
    label: "Strategy",
    title: "Building Your Germany Roadmap",
    description: "Customized university and career strategy based on your profile.",
    Icon: Map,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    accent: "#ffd97d"
  },
  {
    number: "03",
    label: "Applications",
    title: "Turning Plans Into Offers",
    description: "Complete SOP, APS and university application support.",
    Icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
    accent: "#7ED8A4"
  },
  {
    number: "04",
    label: "Visa",
    title: "Preparing You For Germany",
    description: "Visa, blocked account and pre departure guidance.",
    Icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    accent: "#C084FC"
  },
  {
    number: "05",
    label: "Settlement",
    title: "Your New Life Starts",
    description: "Support after landing in Germany.",
    Icon: Home,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200",
    accent: "#FB923C"
  },
  {
    number: "06",
    label: "Career",
    title: "Beyond Admission",
    description: "Career and long term mentorship.",
    Icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
    accent: "#4A90D9"
  }
];

export default function Journey() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { resolvedTheme } = useTheme();

  const dark = resolvedTheme !== "light";

  useEffect(() => {

    const path = pathRef.current;

    if (!path) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2
        }
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: .9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,

            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 35%",
              scrub: true
            }
          }
        )
      });
    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(160deg,#061628,#04111f)"
          : "#eef8ff"
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2
            className="font-bold text-[clamp(32px,5vw,60px)]"
            style={{
              color: dark ? "white" : "#1a2a4a"
            }}
          >
            Six Steps To
            <span style={{ color: "#4A90D9" }}>
              Germany
            </span>
          </h2>
          <p
            className="mt-4"
            style={{
              color: "rgba(170,190,220,.8)"
            }}
          >
            A guided journey from dream to destination.
          </p>
        </div>
        <div className="relative">
          {/* CURVED ROAD */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-32 hidden md:block"
            width="500"
            height="1800"
            viewBox="0 0 500 1800"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M250 120 C80 150 420 300 250 500 C70 700 430 850 250 1050 C80 1250 420 1450 250 1800"
              stroke="#4A90D9"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".7"
            />
          </svg>
          <div className="space-y-32">
            {
              steps.map((step, i) => {
                const left = i % 2 === 0;
                return (
                  <div
                    key={step.number}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${left ? "" : "md:[&>*:first-child]:order-2"}`}
                  >
                    <div>
                      <div
                        className="relative rounded-3xl overflow-hidden min-h-[340px]"
                        style={{
                          backgroundImage:
                            `linear-gradient(180deg,rgba(4,17,31,.25),rgba(4,17,31,.9)),url(${step.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",

                          boxShadow:
                            `0 30px 80px ${step.accent}33`
                        }}
                      >
                        <div className="p-8 h-full flex flex-col justify-end">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                            style={{
                              background: `${step.accent}33`,
                              backdropFilter: "blur(10px)"
                            }}
                          >
                            <step.Icon
                              color={step.accent}
                              size={28}
                            />
                          </div>
                          <h3
                            className="text-3xl font-bold text-white"
                          >
                            {step.title}
                          </h3>
                          <p className="mt-3 text-white/70">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block" />

                    {/* glowing point */}
                    <div
                      className="absolute left-1/2 hidden md:block w-5 h-5 rounded-full -translate-x-1/2"
                      style={{
                        background: step.accent,
                        boxShadow: `0 0 30px ${step.accent}`
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}