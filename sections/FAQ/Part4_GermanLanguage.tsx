'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function LanguageIcon({ color = '#006d9e', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12H22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2C14.5 4.5 16 8.5 16 12C16 15.5 14.5 19.5 12 22" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2C9.5 4.5 8 8.5 8 12C8 15.5 9.5 19.5 12 22" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export default function Part4GermanLanguage() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "From which level should I start learning German?",
      answer: "If you have zero prior knowledge, start from A1. EuroZiel offers structured coaching from A1 through C1. For university admission, most programmes require at least B2 for German-taught courses. For Ausbildung, B1 to B2 is typically needed."
    },
    {
      question: "How long does it take to reach B2 from zero?",
      answer: "On average, reaching B2 from scratch takes 10 to 14 months with consistent study of 1 to 2 hours per day. With intensive classes it can be achieved faster. EuroZiel's structured batches are designed to match this timeline with your application deadlines."
    },
    {
      question: "Which German language exam is accepted by German universities?",
      answer: "The most widely accepted exams are TestDaF (Test Deutsch als Fremdsprache), DSH (Deutsche Sprachprüfung für den Hochschulzugang), and Goethe-Institut certificates (B2 or C1). TestDaF is the most popular among international applicants as it can be taken in India."
    },
    {
      question: "Is German language mandatory if I am applying to an English-taught programme?",
      answer: "Not for admission. However, even for English-taught programmes, basic German (A1 to A2) is extremely helpful for daily life, Anmeldung, dealing with authorities, housing, and part-time jobs."
    },
    {
      question: "How much does the German language exam cost?",
      answer: "TestDaF costs approximately ₹12,000 to ₹15,000 in India. Goethe-Institut exam fees vary by level from approximately ₹10,000 for A1 to ₹15,000 for C1. These exam fees are not included in EuroZiel's package and are paid directly to the exam body."
    },
    {
      question: "Can I learn German online or do I need to attend in person?",
      answer: "Both modes work. EuroZiel offers online batches with live interactive sessions, making it convenient regardless of your city. Consistent practice, speaking sessions, and mock tests are the keys to progress."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <LanguageIcon color="#f59e0b" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 4 — German Language
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