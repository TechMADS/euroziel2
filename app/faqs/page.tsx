'use client';

import React from 'react';
import { useTheme } from 'next-themes';

// Import all FAQ sections
import FAQHeroSection from '@/sections/FAQ/Hero';
import Part1Ausbildung from '@/sections/FAQ/Part1_Ausbildung';
import Part2Bachelors from '@/sections/FAQ/Part2_Bachelors';
import Part3Masters from '@/sections/FAQ/Part3_Masters';
import Part4GermanLanguage from '@/sections/FAQ/Part4_GermanLanguage';
import Part5GRE from '@/sections/FAQ/Part5_GRE';
import Part6CostsFinances from '@/sections/FAQ/Part6_CostsFinances';
import Part7Eligibility from '@/sections/FAQ/Part7_Eligibility';
import Part8Visa from '@/sections/FAQ/Part8_Visa';
import Part9Scholarships from '@/sections/FAQ/Part9_Scholarships';
import Part10Accommodation from '@/sections/FAQ/Part10_Accommodation';
import Part11AfterStudies from '@/sections/FAQ/Part11_AfterStudies';
import FAQFinalCTASection from '@/sections/FAQ/FinalCTA';

export default function FAQPage() {
  const { resolvedTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState('ausbildung');
  const isDark = resolvedTheme === 'dark';
  const bg = isDark ? '#0b1323' : '#f8fafc';

  const categories = [
    { id: 'ausbildung', label: 'Ausbildung' },
    { id: 'bachelors', label: "Bachelor's" },
    { id: 'masters', label: 'Masters' },
    { id: 'german-language', label: 'German Language' },
    { id: 'gre', label: 'GRE' },
    { id: 'costs', label: 'Costs & Finance' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'visa', label: 'Visa' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'after-studies', label: 'After Studies' },
  ];

  const selectedSection = {
    ausbildung: <Part1Ausbildung />,
    bachelors: <Part2Bachelors />,
    masters: <Part3Masters />,
    'german-language': <Part4GermanLanguage />,
    gre: <Part5GRE />,
    costs: <Part6CostsFinances />,
    eligibility: <Part7Eligibility />,
    visa: <Part8Visa />,
    scholarships: <Part9Scholarships />,
    accommodation: <Part10Accommodation />,
    'after-studies': <Part11AfterStudies />,
  }[selectedCategory];

  return (
    <main style={{ background: bg, minHeight: '100vh' }} className="overflow-x-hidden">
      <FAQHeroSection />

      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-primary font-semibold">
              FAQ Categories
            </p>
            <h2 className="font-serif font-bold text-[30px] sm:text-[36px] mt-3" style={{ color: isDark ? '#f0f6ff' : '#1a2a4a' }}>
              Choose a topic and view FAQs instantly
            </h2>
          </div>

          <div className="w-full sm:hidden">
            <label htmlFor="faq-category" className="sr-only">Select FAQ category</label>
            <select
              id="faq-category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-full border border-border bg-card py-3 px-4 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 hidden sm:flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
          {categories.map((category) => {
            const active = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? 'border-primary bg-primary text-white shadow-lg shadow-primary/10' : 'border-border bg-card text-foreground hover:border-primary hover:text-primary'}`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {selectedSection}
      <FAQFinalCTASection />
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is Ausbildung and how is it different from a university degree?', acceptedAnswer: { '@type': 'Answer', text: 'Ausbildung is Germany\'s dual vocational training system where you split your time between a company workplace and a vocational school.' } },
              { '@type': 'Question', name: 'What is the minimum CGPA required for master\'s in Germany?', acceptedAnswer: { '@type': 'Answer', text: 'Most German public universities require a minimum CGPA of 6.5 to 7.0 out of 10.' } },
              { '@type': 'Question', name: 'Can Indian students apply for bachelor\'s programmes in Germany?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but it is more competitive than masters. You need your Class 12 certificate and in most cases additional requirements.' } }
            ]
          }),
        }}
      />
    </main>
  );
}