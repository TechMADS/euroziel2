'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import * as d3 from 'd3';
import { GeoPermissibleObjects } from 'd3-geo';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CityNode {
  city: string;
  label: string;
  coordinates: [number, number]; // [lng, lat]
  students: number;
  professionals: number;
}

interface TooltipState {
  x: number;
  y: number;
  city: CityNode;
} 

// ─── Data ─────────────────────────────────────────────────────────────────────

const CITIES: CityNode[] = [
  { city: 'Munich',     label: 'TU Munich',     coordinates: [11.582, 48.135], students: 8,  professionals: 3 },
  { city: 'Aachen',     label: 'RWTH Aachen',   coordinates: [6.084,  50.775], students: 6,  professionals: 2 },
  { city: 'Berlin',     label: 'TU Berlin',     coordinates: [13.405, 52.520], students: 10, professionals: 4 },
  { city: 'Hamburg',    label: 'Hamburg',        coordinates: [9.993,  53.551], students: 4,  professionals: 2 },
  { city: 'Frankfurt',  label: 'Frankfurt',      coordinates: [8.682,  50.110], students: 7,  professionals: 3 },
  { city: 'Stuttgart',  label: 'Stuttgart',      coordinates: [9.182,  48.776], students: 5,  professionals: 1 },
  { city: 'Cologne',    label: 'Cologne',        coordinates: [6.960,  50.933], students: 4,  professionals: 2 },
  { city: 'Dresden',    label: 'TU Dresden',     coordinates: [13.737, 51.050], students: 3,  professionals: 1 },
  { city: 'Heidelberg', label: 'Heidelberg',     coordinates: [8.672,  49.399], students: 3,  professionals: 1 },
];

const CONNECTIONS: [number, number][] = [
  [0, 4], [0, 5], [1, 6], [1, 4],
  [2, 3], [2, 7], [2, 4], [3, 6],
  [4, 5], [4, 8], [5, 8], [6, 4],
];

const GEO_URL =
  'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
      style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.30)', color: '#4A90D9' }}>
      {children}
    </span>
  );
}

const AcademicCapIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="#4A90D9" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6 12V16L12 19L18 16V12" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const UsersIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <path d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke="#4A90D9" strokeWidth="1.5"/>
    <path d="M23 21V19C22.8 16.9 21.5 15.5 19 15" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 3.13C18.3 3.55 20 5.52 20 8" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="#4A90D9" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="#4A90D9" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6V12C3 17.5 7.5 22 12 22C16.5 22 21 17.5 21 12V6L12 2Z" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── D3 Map ───────────────────────────────────────────────────────────────────

function GermanyNetworkMap({ isDark }: { isDark: boolean }) {
  const svgRef      = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [geoData, setGeoData] = useState<GeoPermissibleObjects | null>(null);
  const [hovered, setHovered]  = useState<string | null>(null);
  const [ready, setReady]      = useState(false);

  // Fetch Germany GeoJSON once
  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((world: any) => {
        const de = world.features.find(
          (f: any) => f.properties['ISO3166-1-Alpha-3'] === 'DEU'
        );
        if (de) { setGeoData(de); }
      })
      .catch(console.error);
  }, []);

  // D3 render whenever data or theme changes
  const drawMap = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !geoData) return;

    const W = svg.clientWidth  || 600;
    const H = svg.clientHeight || 520;

    const mapFill     = isDark ? '#0d2240' : '#ddeaf7';
    const mapStroke   = isDark ? '#1b3d6b' : '#96bedd';
    const lineColor   = '#4A90D9';
    const dotColor    = '#4A90D9';
    const labelCol    = isDark ? 'rgba(190,215,245,0.9)' : 'rgba(15,45,85,0.85)';

    // Fit projection to Germany bounds
    const projection = d3.geoMercator().fitExtent([[32, 24], [W - 32, H - 24]], geoData as any);
    const path = d3.geoPath().projection(projection);

    // Project city coords
    const projected = CITIES.map((c) => ({
      ...c,
      px: projection(c.coordinates)!,
    }));

    const root = d3.select(svg);
    root.selectAll('*').remove();

    // ── Germany fill ──────────────────────────────────────────────────────────
    root.append('path')
      .datum(geoData)
      .attr('d', path as any)
      .attr('fill', mapFill)
      .attr('stroke', mapStroke)
      .attr('stroke-width', 0.8);

    // ── Connection lines ──────────────────────────────────────────────────────
    const lineGroup = root.append('g').attr('class', 'connections');

    CONNECTIONS.forEach(([a, b], i) => {
      const from = projected[a];
      const to   = projected[b];
      const isHov = hovered === from.city || hovered === to.city;

      lineGroup.append('line')
        .attr('class', `conn conn-${from.city} conn-${to.city}`)
        .attr('x1', from.px[0]).attr('y1', from.px[1])
        .attr('x2', to.px[0])  .attr('y2', to.px[1])
        .attr('stroke', lineColor)
        .attr('stroke-width', isHov ? 1.6 : 0.85)
        .attr('stroke-opacity', isHov ? 0.75 : 0.28)
        .attr('stroke-dasharray', isHov ? 'none' : '4 5')
        .style('transition', 'stroke-opacity 0.25s, stroke-width 0.2s')
        // Animate in with staggered delay
        .style('opacity', 0)
        .transition()
        .delay(300 + i * 70)
        .duration(400)
        .style('opacity', 1);
    });

    // ── City markers ──────────────────────────────────────────────────────────
    const nodeGroup = root.append('g').attr('class', 'cities');
    const dotRadius = (s: number) => 4 + s * 0.5;

    projected.forEach((city, idx) => {
      const [cx, cy] = city.px;
      const r        = dotRadius(city.students);
      const isHov    = hovered === city.city;
      const g        = nodeGroup.append('g')
        .attr('class', 'city-node')
        .attr('cursor', 'pointer')
        .style('opacity', 0);

      // Animate in
      g.transition().delay(600 + idx * 60).duration(350).style('opacity', 1);

      // Outer glow ring (always faint, stronger on hover — handled via hovered state re-render)
      g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', r + 7)
        .attr('fill', dotColor)
        .attr('fill-opacity', isHov ? 0.14 : 0.06);

      // Mid ring
      g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', r + 3.5)
        .attr('fill', dotColor)
        .attr('fill-opacity', isHov ? 0.22 : 0.10);

      // Core
      g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', r)
        .attr('fill', dotColor)
        .attr('fill-opacity', isHov ? 1 : 0.88)
        .attr('stroke', '#fff')
        .attr('stroke-width', isHov ? 1.8 : 1.1);

      // Student count inside dot
      g.append('text')
        .attr('x', cx).attr('y', cy)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('fill', '#fff')
        .attr('font-size', r < 7 ? 5 : 6)
        .attr('font-weight', 700)
        .attr('pointer-events', 'none')
        .text(city.students);

      // Label — offset below dot, avoid clipping edges
      const labelY = cy + r + 12;
      g.append('text')
        .attr('x', cx).attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('fill', isHov ? dotColor : labelCol)
        .attr('font-size', 8.5)
        .attr('font-weight', isHov ? 600 : 500)
        .attr('pointer-events', 'none')
        .text(city.label);

      // Invisible hit area for interaction
      g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', r + 10)
        .attr('fill', 'transparent')
        .on('mouseenter', (event: MouseEvent) => {
          setHovered(city.city);
          const rect = svg.getBoundingClientRect();
          setTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            city,
          });
        })
        .on('mousemove', (event: MouseEvent) => {
          const rect = svg.getBoundingClientRect();
          setTooltip((prev) => prev ? { ...prev, x: event.clientX - rect.left, y: event.clientY - rect.top } : null);
        })
        .on('mouseleave', () => {
          setHovered(null);
          setTooltip(null);
        });
    });

    setReady(true);
  }, [geoData, isDark, hovered]);

  useEffect(() => { drawMap(); }, [drawMap]);

  // Re-observe resize
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => drawMap());
    ro.observe(el);
    return () => ro.disconnect();
  }, [drawMap]);

  return (
    <div className="relative w-full" style={{ minHeight: 420 }}>
      <svg
        ref={svgRef}
        width="100%"
        height="520"
        style={{
          display: 'block',
          borderRadius: 16,
          background: isDark ? 'rgba(5,15,35,0.45)' : 'rgba(230,242,255,0.35)',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: tooltip.x + 12,
            top:  tooltip.y - 48,
            background: isDark ? 'rgba(8,22,48,0.94)' : 'rgba(255,255,255,0.96)',
            border: '1px solid rgba(74,144,217,0.4)',
            borderRadius: 10,
            padding: '8px 14px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 6px 28px rgba(0,0,0,0.18)',
            whiteSpace: 'nowrap',
          }}
        >
          <p className="text-[13px] font-semibold" style={{ color: '#4A90D9' }}>
            {tooltip.city.label}
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: isDark ? 'rgba(190,215,245,0.7)' : 'rgba(20,50,90,0.6)' }}>
            {tooltip.city.students} students · {tooltip.city.professionals} professionals
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface NetworkMapSectionProps {
  variant?: 'full' | 'compact';
  showTitle?: boolean;
}

export default function NetworkMapSection({ variant = 'full', showTitle = true }: NetworkMapSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const text   = isDark ? '#f0f6ff'                 : '#1a2a4a';
  const sub    = isDark ? 'rgba(200,220,245,0.68)'  : 'rgba(30,50,80,0.65)';
  const surf   = isDark ? 'rgba(13,37,64,0.5)'      : 'rgba(74,144,217,0.04)';

  const stats = [
    { icon: <AcademicCapIcon />, value: '9+',   label: 'German Cities'         },
    { icon: <UsersIcon />,       value: '50+',  label: 'Active Students'       },
    { icon: <BriefcaseIcon />,   value: '15+',  label: 'Working Professionals' },
    { icon: <ShieldIcon />,      value: '24/7', label: 'Peer Support'          },
  ];

  if (!mounted) return null;

  if (variant === 'compact') {
    return (
      <section className="py-16 px-5" style={{ background: surf }}>
        <div className="max-w-4xl mx-auto">
          {showTitle && (
            <div className="text-center mb-8">
              <Pill>LIVE NETWORK</Pill>
              <h2 className="font-serif font-bold mt-4 text-2xl" style={{ color: text }}>Our Student Network</h2>
            </div>
          )}
          <GermanyNetworkMap isDark={isDark} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-5 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <Reveal>
          <Pill>LIVE NETWORK</Pill>
          <h2 className="font-serif font-bold mt-5 mb-4"
            style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', color: text }}>
            Students and professionals across Germany
          </h2>
          <p className="text-[17px] leading-relaxed mx-auto" style={{ color: sub, maxWidth: '56ch' }}>
            Our peer network spans German university cities — people you can actually speak to, not brochures you can download.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <GermanyNetworkMap isDark={isDark} />
      </Reveal>

      <Reveal delay={150}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
          {stats.map(({ icon, value, label }) => (
            <div key={label} className="text-center p-4 rounded-xl" style={{ background: surf }}>
              <div className="flex justify-center mb-3">{icon}</div>
              <div className="font-serif font-bold text-2xl" style={{ color: '#4A90D9' }}>{value}</div>
              <div className="text-[13px]" style={{ color: sub }}>{label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}