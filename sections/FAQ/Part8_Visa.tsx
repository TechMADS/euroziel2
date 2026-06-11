'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function VisaIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M2 8H22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill={color}/>
    </svg>
  );
}

export default function Part8Visa() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What type of visa do I need to study in Germany?",
      answer: "You need a National Visa (Type D) for the purpose of studying. This is different from a Schengen tourist visa. It is applied for at the German Embassy or VFS Global centre in India before you travel."
    },
    {
      question: "What documents are needed for a German student visa?",
      answer: "Key documents include your university admission letter or offer letter, APS certificate, blocked account confirmation, health insurance proof, valid passport, biometric photos, completed visa application form, academic certificates, language test scores, and financial proof. EuroZiel prepares a complete checklist for you."
    },
    {
      question: "How long does German student visa processing take?",
      answer: "Processing time at the German Embassy in India typically ranges from 6 to 12 weeks. Apply as early as possible, ideally 3 to 4 months before your intended travel date."
    },
    {
      question: "Is there a visa interview at the German Embassy?",
      answer: "Yes. The German Embassy in India generally requires an in-person appointment. The interview is relatively straightforward, you will be asked about your study plans, financial means, and language ability. EuroZiel prepares you thoroughly for this."
    },
    {
      question: "Can I convert my student visa into a work permit after graduation?",
      answer: "Yes. Germany has a very favourable post-study work policy. After completing your degree, you are entitled to an 18-month job-seeker visa to find work in Germany. Once employed in a role matching your qualification, you can apply for a work permit."
    },
    {
      question: "What is Anmeldung and do I need to do it after arrival?",
      answer: "Anmeldung is the mandatory city registration you must complete within two weeks of arriving in Germany. You register your address at the local registration office (Einwohnermeldeamt or Bürgeramt). It is a legal requirement and needed for almost everything like bank account, SIM card, and tax ID. EuroZiel's on-arrival support walks you through this."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <VisaIcon color="#c084fc" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 8 — Visa
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