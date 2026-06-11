'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import AccordionItem from './AccordionItem';

function HomeIcon({ color = '#4A90D9', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 9L12 3L21 9V20H3V9Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 20V14H14V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Part10Accommodation() {
  const { resolvedTheme } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    
  const isDark = resolvedTheme === 'dark';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  
    
  const faqs = [
    {
      question: "What are my accommodation options as an international student in Germany?",
      answer: "The main options are university dormitories (Studentenwohnheim), WG shared flats, private apartments, and temporary accommodation like hostels when you first arrive. Each has different costs, availability, and lifestyle implications."
    },
    {
      question: "What is a WG and how do I find one?",
      answer: "WG stands for Wohngemeinschaft, a shared flat where you rent one room and share the kitchen, bathroom, and living areas with other tenants. Popular platforms to find WGs include WG-Gesucht.de, Studenten-WG.de, and Facebook groups for students in your city. Competition is high in cities like Munich and Frankfurt."
    },
    {
      question: "How much does accommodation cost in Germany?",
      answer: "A university dorm room costs approximately €200 to €350 per month. A WG room in a medium-sized city costs €350 to €550. In Munich or Frankfurt, expect to pay €600 to €900 or more for a WG room. EuroZiel's peer mentors give you real and current information for your specific city."
    },
    {
      question: "How early should I start looking for accommodation?",
      answer: "Start as soon as you have your admission letter, ideally 4 to 6 months before arrival. University dorm waiting lists can be very long. Apply to the Studentenwerk (student services organisation) of your university immediately after admission."
    },
    {
      question: "Can I stay in temporary accommodation when I first arrive?",
      answer: "Yes. Many students stay in a hostel, Airbnb, or short-term rental for the first 2 to 4 weeks while flat-hunting in person. EuroZiel's on-arrival support helps you navigate this transition smoothly."
    },
    {
      question: "Is a rental contract required for Anmeldung?",
      answer: "Yes. You need a signed rental agreement or a Wohnungsgeberbestätigung (landlord confirmation letter) to complete your Anmeldung. Make sure your landlord provides this document."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <HomeIcon color="#4A90D9" size={32} />
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px]" style={{ color: text }}>
          Part 10 — Accommodation
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