'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function ScholarshipIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L14 8H19L15 11L17 16L12 13L7 16L9 11L5 8H10L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="2 2"/>
    </svg>
  );
}

export default function Part9Scholarships() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What scholarships are available for Indian students in Germany?",
      answer: "The main scholarships include DAAD (German Academic Exchange Service) scholarships, Deutschlandstipendium, Heinrich Böll Foundation, Friedrich Ebert Foundation, Konrad-Adenauer-Stiftung, and university-specific merit scholarships. DAAD is the largest and most well-known."
    },
    {
      question: "How much does DAAD scholarship pay?",
      answer: "DAAD scholarships for master's students typically cover a monthly stipend of approximately €850 to €1,200, plus health insurance allowance, travel allowance, and sometimes study and research allowances. The exact amount varies by programme."
    },
    {
      question: "When should I apply for DAAD scholarship?",
      answer: "DAAD application deadlines are typically between August and October for programmes starting the following year. You should start your application at least 8 to 10 months before your intended start date. EuroZiel helps you plan your scholarship timeline alongside your university applications."
    },
    {
      question: "Do I need to be admitted to a university before applying for DAAD?",
      answer: "For some DAAD programmes, a university admission letter is required. For others, you can apply simultaneously. EuroZiel maps out the correct sequence for your specific situation."
    },
    {
      question: "Are there scholarships specifically for Ausbildung students?",
      answer: "Scholarship options for Ausbildung are more limited than for university students. However, some state-level programmes and foundations do support vocational training. Your employer also pays a training allowance. EuroZiel will identify any applicable funding for your situation."
    },
    {
      question: "What is Deutschlandstipendium?",
      answer: "Deutschlandstipendium is a merit-based scholarship offered directly by German universities, funded half by the government and half by private sponsors. It pays €300 per month and does not affect other funding. You apply through your university once enrolled."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ScholarshipIcon color="#FFD97D" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 9 — Scholarships
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