'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function CostIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 4L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 18L12 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Part6CostsFinances() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What is the total estimated cost of studying in Germany for one year?",
      answer: "As a rough estimate, plan for €10,000 to €12,000 per year for living expenses (rent, food, transport, health insurance, phone). Tuition at public universities is largely free or very low. Always keep a buffer of €2,000 to €3,000 for unexpected costs."
    },
    {
      question: "What is the blocked account and how much do I need?",
      answer: "A blocked account (Sperrkonto) is a German bank account where you deposit a fixed amount as proof of financial means for your visa. From 2025-26, the required amount is approximately €11,904 per year (€992 per month), released in monthly instalments once you are in Germany."
    },
    {
      question: "Which banks offer blocked accounts for Indian students?",
      answer: "The most popular options are Expatrio and Fintiba, both of which are online and designed specifically for international students. EuroZiel assists you in opening your blocked account with either provider."
    },
    {
      question: "Can I get an education loan for studying in Germany?",
      answer: "Yes. Major Indian banks including SBI, Axis Bank, and HDFC, Credila offer education loans for Germany. Loan amounts, interest rates, and collateral requirements vary. EuroZiel connects you with these lenders and guides you through the process."
    },
    {
      question: "What is the semester contribution fee?",
      answer: "Almost all German public universities charge a semester contribution (Semesterbeitrag) of approximately €200 to €400 per semester. This covers your student union fee, public transport pass for the semester, and administrative costs. It is separate from tuition."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <CostIcon color="#4A90D9" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 6 — Costs & Finances
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