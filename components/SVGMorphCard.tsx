'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SVGMorphCardProps {
  name: string;
  role: string;
  imageSrc: string;
  description?: string;
  accent: string;
  index?: number;
}

export default function SVGMorphCard({
  name,
  role,
  imageSrc,
  description,
  accent,
  index = 0,
}: SVGMorphCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection observer for scroll reveal animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (index || 0) * 0.15,
            ease: 'power2.out',
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isHovered) {
      gsap.to(card, {
        y: -12,
        boxShadow: `0 20px 50px ${accent}40`,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card, {
        y: 0,
        boxShadow: `0 8px 24px ${accent}20`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [isHovered, accent]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animate SVG path morphing on flip
    if (isFlipped) {
      gsap.to(svg, {
        rotationY: 180,
        duration: 0.6,
        ease: 'back.inOut',
      });
    } else {
      gsap.to(svg, {
        rotationY: 0,
        duration: 0.6,
        ease: 'back.inOut',
      });
    }
  }, [isFlipped]);

  return (
    <div
      ref={containerRef}
      className="h-full"
      style={{ opacity: 0, transform: 'translateY(32px)' }}
    >
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden cursor-pointer h-full transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          background: isFlipped
            ? `linear-gradient(135deg, ${accent}15, ${accent}05)`
            : '#ffffff',
          border: `2px solid ${accent}`,
          boxShadow: `0 8px 24px ${accent}20`,
          perspective: '1000px',
        }}
      >
        {/* Front - Image Side */}
        {!isFlipped && (
          <div className="relative overflow-hidden h-full flex flex-col">
            {/* SVG Container with morphing shape */}
            <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
              <svg
                ref={svgRef}
                viewBox="0 0 300 300"
                className="w-full h-full"
                style={{
                  filter: `drop-shadow(0 0 20px ${accent}30)`,
                }}
              >
                {/* Morphing background shape */}
                <defs>
                  <clipPath id={`morph-clip-${index}`}>
                    <path
                      d="M 150,30 C 220,30 280,90 280,150 C 280,220 220,280 150,280 C 80,280 20,220 20,150 C 20,90 80,30 150,30 Z"
                      fill="white"
                    />
                  </clipPath>
                  <filter id={`glow-${index}`}>
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Glowing circle background */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  fill={accent}
                  opacity="0.1"
                />

                {/* Image as background */}
                <image
                  xlinkHref={imageSrc}
                  x="30"
                  y="30"
                  width="240"
                  height="240"
                  clipPath={`url(#morph-clip-${index})`}
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Border circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="125"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3
                  className="font-serif font-bold text-xl mb-1"
                  style={{ color: accent }}
                >
                  {name}
                </h3>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {role}
                </p>
              </div>

              {/* Click to flip indicator */}
              <div className="text-xs text-gray-500 mt-4">
                Click to learn more
              </div>
            </div>
          </div>
        )}

        {/* Back - Description Side */}
        {isFlipped && (
          <div
            className="h-full p-8 flex flex-col justify-center"
            style={{
              background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
              minHeight: '400px',
            }}
          >
            <p className="text-gray-700 leading-relaxed text-sm">
              {description ||
                `${name} brings expertise and passion to guiding students on their journey to Germany.`}
            </p>
            <div className="mt-6 text-xs text-gray-600">
              Click to flip back
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
