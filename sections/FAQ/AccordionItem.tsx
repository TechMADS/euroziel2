'use client';

import React from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

function ChevronIcon({ isOpen, color }: { isOpen: boolean; color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
      aria-hidden="true"
    >
      <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function createIdFromQuestion(question: string) {
  return `faq-answer-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

export default function AccordionItem({ question, answer, isDark, isOpen, onToggle }: AccordionItemProps) {
  const border = isDark ? 'rgba(74,144,217,0.15)' : 'rgba(74,144,217,0.18)';
  const surface = isDark ? '#0d2540' : '#ffffff';
  const text = isDark ? '#f0f6ff' : '#1a2a4a';
  const sub = isDark ? 'rgba(200,220,245,0.9)' : 'rgba(30,50,80,0.9)';
  const fade = isDark ? 'rgba(13,37,64,0.96)' : 'rgba(255,255,255,0.96)';
  const contentId = createIdFromQuestion(question);

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${border}`,
        background: surface,
        boxShadow: isDark ? '0 18px 60px rgba(0,0,0,0.14)' : '0 18px 60px rgba(15,23,42,0.08)',
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span id={`${contentId}-label`} className="font-serif font-semibold text-[17px] sm:text-[18px]" style={{ color: text }}>
          {question}
        </span>
        <ChevronIcon isOpen={isOpen} color={text} />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={`${contentId}-label`}
        className="relative overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '999px' : '0',
          padding: isOpen ? '0 1.25rem 1.25rem' : '0 1.25rem 0',
          transitionProperty: 'max-height, padding',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <div className="pt-0">
          <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: sub }}>
            {answer}
          </p>
        </div>
      </div>

      {!isOpen && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
          style={{ background: `linear-gradient(180deg, transparent, ${fade})` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
