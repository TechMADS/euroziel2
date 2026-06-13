'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function BriefcaseIcon({ color = '#0f4c8f', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 11v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Part1Ausbildung() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What is Ausbildung and how is it different from a university degree?",
      answer: "Ausbildung is Germany's dual vocational training system where you split your time between a company workplace and a vocational school. Unlike a university degree, it is hands-on, industry-integrated, and you earn a salary from day one. It typically lasts 2 to 3.5 years depending on the field."
    },
    {
      question: "Can Indian students apply for Ausbildung in Germany?",
      answer: "Yes, Indian students can apply for Ausbildung in Germany. You need a recognised school certificate, basic German language skills (usually B1 level minimum), and a training contract from a German company before you can apply for a visa."
    },
    {
      question: "What German level do I need for Ausbildung?",
      answer: "Most Ausbildung programmes require at least B1 German, though many employers prefer B2. Since the training and vocational school are conducted entirely in German, a strong language foundation is essential before you arrive."
    },
    {
      question: "Do I get paid during Ausbildung?",
      answer: "Yes, Ausbildung trainees receive a monthly training allowance (Ausbildungsvergütung) from their employer. This typically ranges from €600 to €1,200 per month depending on the field and employer. It is not a full salary but covers basic living costs."
    },
    {
      question: "What fields are available for Ausbildung?",
      answer: "Popular fields include IT and software development, healthcare and nursing, mechatronics, electrical engineering, hotel and hospitality, logistics, and business administration. IT Ausbildung is especially popular among Indian students."
    },
    {
      question: "Is APS required for Ausbildung applicants?",
      answer: "APS (Academic Evaluation Centre) certificate is typically required for Indian applicants going to Germany for any educational purpose, including Ausbildung. EuroZiel guides you through the entire APS process."
    },
    {
      question: "Can I switch from Ausbildung to a university degree later?",
      answer: "Yes. After completing Ausbildung, you can apply to a Fachhochschule (University of Applied Sciences) or in some cases a full university, especially if your Ausbildung results were strong. It is a recognised pathway."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BriefcaseIcon color="#0f4c8f" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 1 — Ausbildung (Vocational Training)
        </h2>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isDark={isDark}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}