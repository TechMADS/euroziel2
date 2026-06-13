'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function CheckIcon({ color = '#0f4c8f', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Part7Eligibility() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What is the minimum academic requirement to apply for master's in Germany?",
      answer: "You need a recognised bachelor's degree in a relevant field, typically with a minimum of 60 to 65 percent (or 6.5 CGPA out of 10). The degree must be from a recognised institution. Some competitive programmes may expect higher."
    },
    {
      question: "Does work experience matter for German university applications?",
      answer: "For master's programmes, relevant work experience can significantly strengthen your application especially in the Statement of Purpose. Some management programmes require 1 to 2 years of professional experience."
    },
    {
      question: "My CGPA is below 6.5, can I still apply?",
      answer: "It is worth exploring. Some universities and programmes have flexible criteria, and a strong SOP, relevant projects, or work experience can compensate to an extent. EuroZiel evaluates your full profile and identifies universities where you have a realistic chance."
    },
    {
      question: "Do I need to get my degree recognised in Germany?",
      answer: "Your degree is evaluated by the German university or via uni-assist during the application process. APS verification is required for Indian applicants and is the first step EuroZiel helps you complete."
    },
    {
      question: "Is age a factor for German university admissions?",
      answer: "No. German public universities do not have an upper age limit for international applicants. Career changers and mature students are equally welcome."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <CheckIcon color="#7ED8A4" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 7 — Eligibility
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