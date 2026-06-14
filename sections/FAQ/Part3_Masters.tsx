'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function MastersIcon({ color = '#006d9e', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Part3Masters() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What is the minimum CGPA required for master's in Germany?",
      answer: "Most German public universities require a minimum CGPA of 6.5 to 7.0 out of 10, or roughly 60 to 65 percent. Top universities like TU Munich or LMU may expect higher. Your profile is evaluated holistically so work experience, SOP, and relevant projects also matter."
    },
    {
      question: "Do I need GRE for master's in Germany?",
      answer: "GRE is not required by most German public universities. However, a handful of specific programmes, particularly in engineering and computer science at top institutions, do request or give preference to GRE scores. EuroZiel will identify whether your target programmes need it."
    },
    {
      question: "How long does a master's programme take in Germany?",
      answer: "Most master's programmes in Germany are two years (four semesters). Some specialised programmes may be 1.5 years. They are research-oriented and often require a thesis."
    },
    {
      question: "Can I work while studying a master's in Germany?",
      answer: "Yes. International students are permitted to work up to 120 full days or 240 half days per year. Part-time student jobs (Studentenjobs) and working student (Werkstudent) positions are common and help cover living expenses."
    },
    {
      question: "What is the application deadline for master's in Germany?",
      answer: "Winter semester (starting October) deadlines are typically between May and July. Summer semester (starting April) deadlines fall between November and January. Some universities use rolling admissions so applying early always helps."
    },
    {
      question: "How many universities should I apply to?",
      answer: "EuroZiel recommends applying to 7 to 10 universities across three tiers such as ambitious, realistic, and safe to maximise your chances of receiving at least one strong offer letter."
    },
    {
      question: "What is uni-assist and do I need it?",
      answer: "Uni-assist is a central application portal used by many German universities for international student applications. Some universities have their own direct application portals. EuroZiel manages both types on your behalf."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <MastersIcon color="#c084fc" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 3 — Master's Programmes
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