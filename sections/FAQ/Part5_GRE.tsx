'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function GREIcon({ color = '#006d9e', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M8 8H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 16H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="19" cy="19" r="2" fill={color} stroke="none"/>
    </svg>
  );
}

export default function Part5GRE() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "Which German universities or programmes require GRE?",
      answer: "A small number of highly competitive programmes in engineering, computer science, and business at institutions like TU Munich, RWTH Aachen, and certain private universities request GRE or GMAT. EuroZiel will identify upfront whether your shortlisted programmes require it so you are not caught off guard."
    },
    {
      question: "What is a competitive GRE score for German universities?",
      answer: "For programmes that do require GRE, a Verbal score of 155+ and Quant score of 162+ is generally considered competitive. Some engineering programmes weight Quant scores more heavily."
    },
    {
      question: "Is GMAT required for MBA programmes in Germany?",
      answer: "Yes. Most German MBA programmes, particularly at business schools, require GMAT scores in the range of 600 to 680+. Some accept GRE as an alternative."
    },
    {
      question: "How long should I prepare for GRE?",
      answer: "A focused 3-to-4-month preparation period is typically sufficient for most students. EuroZiel's subsidised GRE coaching covers Verbal, Quant, and Analytical Writing with full-length mock tests and personalised feedback."
    },
    {
      question: "How much does GRE cost?",
      answer: "The GRE exam registration fee is approximately $220 (around ₹18,000). This exam fee is not included in EuroZiel's package and is paid directly to ETS."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <GREIcon color="#f87171" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 5 — GRE / GMAT
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