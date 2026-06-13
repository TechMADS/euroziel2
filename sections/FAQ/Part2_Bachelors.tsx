'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function GraduationIcon({ color = '#0f4c8f', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 12V16L12 19L18 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Part2Bachelors() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "Can Indian students apply for bachelor's programmes in Germany?",
      answer: "Yes, but it is more competitive than masters. You need your Class 12 certificate, and in most cases, you will need to either complete one or two years of university in India first or pass a Studienkolleg (foundation course) in Germany to bridge the gap."
    },
    {
      question: "What is Studienkolleg and do I need it?",
      answer: "Studienkolleg is a one-year preparatory course for international students whose home country school certificate is not directly equivalent to German Abitur. Most Indian students who completed Class 12 need to either complete it or have one to two years of university study in India before applying directly."
    },
    {
      question: "What are the language requirements for bachelor's programmes?",
      answer: "German-taught programmes require TestDaF, DSH, or Goethe C1 certificate. English-taught bachelor's programmes (which are fewer) require IELTS 6.5 or TOEFL equivalent."
    },
    {
      question: "Which are the best German public universities for bachelor's degrees?",
      answer: "Germany has many excellent public universities including LMU Munich, TU Munich, Heidelberg University, Freie Universität Berlin, RWTH Aachen, and University of Hamburg, among others. The right choice depends entirely on your field of study."
    },
    {
      question: "Is tuition free for bachelor's in Germany?",
      answer: "Yes. Public universities in all German states except Baden-Württemberg charge no tuition fees for bachelors. Even in Baden-Württemberg the fee is approximately €1,500 per semester for non-EU students, which is still very affordable globally."
    },
    {
      question: "What documents do I need to apply for a bachelor's in Germany?",
      answer: "You typically need Class 12 marksheets, university transcripts if applicable, APS certificate, language test scores, letter of motivation, CV, and passport. EuroZiel helps you prepare and review every document."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <GraduationIcon color="#7ED8A4" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 2 — Bachelor's Programmes
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