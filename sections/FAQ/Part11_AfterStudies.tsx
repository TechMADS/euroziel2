'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function AfterStudyIcon({ color = '#0f4c8f', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 6H9L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 8H19V20H5V8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 12V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="11" r="0.5" fill={color}/>
    </svg>
  );
}

export default function Part11AfterStudies() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What should I do in the first week after arriving in Germany?",
      answer: "Your first week checklist: complete Anmeldung (city registration), enrol at your university, open a German bank account (Sparkasse and DB are popular), get a local SIM card, activate your student ID and semester transport pass, and connect with your university's international student office."
    },
    {
      question: "How does the German university system work, is it like India?",
      answer: "It is quite different. German universities expect a high level of self-organisation and independent learning. There are fewer contact hours, less hand-holding, and exams often carry heavy weight. Attendance rules vary by programme. You are expected to manage your own schedule."
    },
    {
      question: "What is ECTS and how does it work?",
      answer: "ECTS (European Credit Transfer and Accumulation System) is the credit system used across European universities. A typical master's requires 120 ECTS over two years. Each module carries a specific number of ECTS credits based on workload."
    },
    {
      question: "How do I open a bank account in Germany as a student?",
      answer: "Popular options for students are Deutsche Bank, Sparkasse (local savings banks), DKB (free online account), and N26. You will need your passport, Anmeldung confirmation, and enrolment certificate. Most accounts can be opened online or in-branch."
    },
    {
      question: "Can I bring my family to Germany while studying?",
      answer: "Yes, under family reunification visa rules, spouses can join you in Germany. However, they must demonstrate financial means, language ability may be required, and the process takes time. EuroZiel can connect you with the right resources for this."
    },
    {
      question: "What happens if I fail an exam in Germany?",
      answer: "Most German universities allow you to retake failed exams, usually up to two or three times depending on the module and university. Failing beyond the permitted attempts can result in permanent deregistration from that programme. Take academic support services seriously from the start."
    },
    {
      question: "Is it easy to find part-time work as a student?",
      answer: "Yes, particularly in cities with large student populations. Common roles include student assistants (HiWi jobs) at your university, retail, hospitality, and Werkstudent positions in your field. University job boards and LinkedIn are good starting points. You can work up to 120 full days per year on a student visa."
    },
    {
      question: "What support does EuroZiel provide after I start studying?",
      answer: "EuroZiel stays connected with you even after you land. Our Germany-based peer network is always reachable for practical advice from navigating bureaucracy and finding part-time work to understanding university systems and exploring career options."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <AfterStudyIcon color="#7ED8A4" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 11 — After Starting Studies
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