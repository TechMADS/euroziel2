'use client';

import { useEffect, useRef, useState } from "react";
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
    accent: "#006d9e"
  },
  {
    number: "02",
    label: "Strategy",
    title: "Building Your Germany Roadmap",
    description: "Customized university and career strategy based on your profile.",
    Icon: Map,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    accent: "#f59e0b"
  },
  {
    number: "03",
    label: "Applications",
    title: "Turning Plans Into Offers",
    description: "Complete SOP, APS and university application support.",
    Icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
    accent: "#059669"
  },
  {
    number: "04",
    label: "Visa",
    title: "Preparing You For Germany",
    description: "Visa, blocked account and pre departure guidance.",
    Icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    accent: "#7c3aed"
  },
  {
    number: "05",
    label: "Settlement",
    title: "Your New Life Starts",
    description: "Support after landing in Germany.",
    Icon: Home,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200",
    accent: "#ea580c"
  },
  {
    number: "06",
    label: "Career",
    title: "Beyond Admission",
    description: "Career and long term mentorship.",
    Icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
    accent: "#0891b2"
  }
];

export default function Journey() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⚠️ IMPORTANT: hooks must always run before returns
  const dark = resolvedTheme === "dark";

  // GSAP animations
  useEffect(() => {
    if (!mounted) return;

    const path = pathRef.current;
    const timeline = timelineRef.current;

    if (!path || !timeline) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",

        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          scrub: 0.4,
        }
      });

      cardsRef.current.forEach((card) => {

        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: .96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,

            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 35%",
              scrub: .5
            }
          }
        )
      })

    }, sectionRef);

    return () => ctx.revert();

  }, [mounted]);

  // ✅ prevent hydration mismatch render
  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(160deg,#0b1323,#04111f)"
          : "#eef8ff"
      }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-24">
          <h2
            className="font-bold text-[clamp(32px,5vw,60px)]"
            style={{
              color: dark ? "white" : "#1a2a4a"
            }}
          >
            Six Steps To{" "}
            <span style={{ color: "#0f4c8f" }}>Germany</span>
          </h2>

          <p
            className="mt-4"
            style={{
              color: dark ? "rgba(170,190,220,.8)" : "rgba(50,70,100,.7)"
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
            height="100%"
            viewBox="0 0 500 2600"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M250 120 C80 300 420 500 250 750 C70 1000 430 1200 250 1500 C80 1800 420 2200 250 2500"
              stroke="#0f4c8f"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".7"
            />
          </svg>

          <div
            ref={timelineRef}
            className="space-y-40 relative"
          >

            {steps.map((step, i) => {
              const left = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                >

                  {/* LEFT SIDE */}
                  {left ? (
                    <>
                      {/* GIANT NUMBER */}
                      <div
                        className="hidden md:flex items-center justify-end"
                      >
                        <span
                          className="font-black text-[220px] leading-none select-none"
                          style={{
                            color: dark
                              ? "rgba(255,255,255,.06)"
                              : "rgba(15,76,143,.12)"
                          }}
                        >
                          {step.number}
                        </span>
                      </div>


                      {/* CARD */}
                      <div>
                        <div
                          className="relative rounded-3xl overflow-hidden min-h-[340px]"
                          style={{
                            backgroundImage:
                              `linear-gradient(180deg,rgba(4,17,31,.25),rgba(4,17,31,.9)),url(${step.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow: `0 30px 80px ${step.accent}33`
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


                            <h3 className="text-3xl font-bold text-white">
                              {step.title}
                            </h3>

                            <p className="mt-3 text-white/70">
                              {step.description}
                            </p>

                          </div>
                        </div>
                      </div>
                    </>
                  ) : (

                    <>

                      {/* CARD */}
                      <div>

                        <div
                          className="relative rounded-3xl overflow-hidden min-h-[340px]"
                          style={{
                            backgroundImage:
                              `linear-gradient(180deg,rgba(4,17,31,.25),rgba(4,17,31,.9)),url(${step.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow: `0 30px 80px ${step.accent}33`
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


                            <h3 className="text-3xl font-bold text-white">
                              {step.title}
                            </h3>


                            <p className="mt-3 text-white/70">
                              {step.description}
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* GIANT NUMBER */}
                      <div
                        className="hidden md:flex items-center justify-start"
                      >

                        <span
                          className="font-black text-[220px] leading-none select-none"
                          style={{
                            color: dark
                              ? "rgba(255,255,255,.06)"
                              : "rgba(15,76,143,.12)"
                          }}
                        >
                          {step.number}
                        </span>

                      </div>

                    </>
                  )}


                  {/* CENTER DOT */}
                  <div
                    className="absolute left-1/2 top-1/2 hidden md:block w-5 h-5 rounded-full -translate-x-1/2"
                    style={{
                      background: step.accent,
                      boxShadow: `0 0 30px ${step.accent}`
                    }}
                  />

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
