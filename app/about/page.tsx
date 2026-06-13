'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Import all sections from the sections/AboutUs folder
import HeroSection from '@/sections/AboutUs/Hero';
import OurStorySection from '@/sections/AboutUs/OurStory';
import WhatMakesDiffSection from '@/sections/AboutUs/WhatMakesDiff';
import OurApproachSection from '@/sections/AboutUs/OurApproach';
import NetworkMapSection from '@/sections/AboutUs/NetworkMapSection';
import TeamSection from '@/sections/AboutUs/Team';
import TrustSection from '@/sections/AboutUs/Trust';
import FinalCTASection from '@/sections/AboutUs/FinalCTA';

export default function AboutPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const bg = isDark ? '#0b1323' : '#f8fafc';
  
  if (!mounted) return null;
  
  return (
    <main style={{ background: bg, minHeight: '100vh' }} className="overflow-x-hidden">
      <HeroSection />
      <OurStorySection />
      <WhatMakesDiffSection />
      <OurApproachSection />
      <NetworkMapSection variant="full" />
      <TeamSection />
      <TrustSection />
      <FinalCTASection />
      
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'EuroZiel',
            url: 'https://euroziel.in',
            description: 'EuroZiel provides personalised guidance for Indian students pursuing higher education in Germany. Not a consultancy that read about Germany. Connected to people living it right now.',
            founder: [
              { '@type': 'Person', name: 'Yuvasri Jagadeesan', jobTitle: 'Co-Founder · Academic Strategy & Student Success' },
              { '@type': 'Person', name: 'Sarathkumar Venkateshwaran', jobTitle: 'Co-Founder · European Network & Student Ecosystem' },
            ],
          }),
        }}
      />
    </main>
  );
}