'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Import all sections
import ServicesHeroSection from '@/sections/Services/Hero';
import AusbildungSection from '@/sections/Services/Ausbildung';
import BachelorsSection from '@/sections/Services/Bachelors';
import MastersSection from '@/sections/Services/Masters';
import ProcessStepsSection from '@/sections/Services/ProcessSteps';
import ServicesFinalCTASection from '@/sections/Services/FinalCTA';

export default function ServicesPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const bg = isDark ? '#061628' : '#f0f8ff';
  
  if (!mounted) return null;
  
  return (
    <main style={{ background: bg, minHeight: '100vh' }} className="overflow-x-hidden">
      <ServicesHeroSection />
      <AusbildungSection />
      <BachelorsSection />
      <MastersSection />
      <ProcessStepsSection />
      <ServicesFinalCTASection />
      
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'EuroZiel Services',
            provider: { '@type': 'Organization', name: 'EuroZiel' },
            description: 'Complete guidance for Indian students pursuing Ausbildung, Bachelor\'s, and Master\'s programmes in Germany.',
            serviceType: ['Ausbildung Guidance', 'Bachelor\'s Application', 'Master\'s Application', 'Visa Assistance', 'Settlement Support'],
            areaServed: 'Germany',
            audience: { '@type': 'Audience', name: 'Indian Students' },
          }),
        }}
      />
    </main>
  );
}