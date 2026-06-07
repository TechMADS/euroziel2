'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { X, Send, ChevronDown } from 'lucide-react';

const COURSES = [
  'M.Sc Computer Science',
  'M.Sc Electrical Engineering',
  'M.Sc Mechanical Engineering',
  'M.Sc Data Science / AI',
  'MBA / Business Administration',
  'Healthcare / Ausbildung',
  'B.Sc / Bachelor Programs',
  'Other / Not Sure Yet',
];

const BUDGETS = [
  'Under ₹5 Lakhs',
  '₹5 – ₹10 Lakhs',
  '₹10 – ₹20 Lakhs',
  'Above ₹20 Lakhs',
  'Looking for Scholarships',
];

const TIMELINES = [
  'Winter 2025 (Oct intake)',
  'Summer 2026 (Apr intake)',
  'Winter 2026 (Oct intake)',
  'Just Exploring for Now',
];

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  budget: string;
  timeline: string;
  message: string;
}

const EMPTY: FormData = { name: '', email: '', phone: '', course: '', budget: '', timeline: '', message: '' };

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)].join(',');
}

export default function EnquiryModal() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // 20-second trigger
  useEffect(() => {
    const already = sessionStorage.getItem('ez_modal_shown');
    if (already) return;
    timerRef.current = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('ez_modal_shown', '1');
    }, 20000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const bg = isDark ? '#061628' : '#f0f8ff';
  const surface = isDark ? '#0d2540' : '#ffffff';
  const border = isDark ? 'rgba(74,144,217,0.22)' : 'rgba(74,144,217,0.28)';
  const textColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const textSub = isDark ? 'rgba(200,220,245,0.72)' : 'rgba(30,50,80,0.68)';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(74,144,217,0.05)';
  const inputBorder = isDark ? 'rgba(74,144,217,0.25)' : 'rgba(74,144,217,0.30)';
  const inputColor = isDark ? '#f0f6ff' : '#1a2a4a';
  const placeholderColor = isDark ? 'rgba(200,220,245,0.35)' : 'rgba(30,50,80,0.35)';

  function set(field: keyof FormData, val: string) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validateStep1() {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,}$/.test(form.phone)) e.phone = 'Valid phone required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Partial<FormData> = {};
    if (!form.course) e.course = 'Please select a course';
    if (!form.budget) e.budget = 'Please select a budget';
    if (!form.timeline) e.timeline = 'Please select a timeline';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  }

  function close() {
    setOpen(false);
    setDismissed(true);
  }

  function reset() {
    setForm(EMPTY);
    setStep(1);
    setSubmitted(false);
    setErrors({});
  }

  // Click outside to close
  function handleOverlay(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) close();
  }

  if (!open) return null;

  const stepLabels = ['Contact', 'Preferences', 'Message'];
  const accentColors: Record<Step, string> = { 1: '#4A90D9', 2: '#ffd97d', 3: '#7ED8A4' };
  const accent = accentColors[step];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 14,
    color: inputColor,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 6,
    color: textSub,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#f87171',
    marginTop: 4,
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          0%  { opacity:0; transform:translateY(32px) scale(0.97); }
          100%{ opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes overlayIn {
          0%  { opacity:0; }
          100%{ opacity:1; }
        }
        @keyframes successPop {
          0%  { transform:scale(0.7); opacity:0; }
          60% { transform:scale(1.08); }
          100%{ transform:scale(1); opacity:1; }
        }
        .ez-modal-wrap   { animation: overlayIn 0.3s ease forwards; }
        .ez-modal-box    { animation: modalIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ez-success-icon { animation: successPop 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .ez-input:focus  { border-color: #4A90D9 !important; }
        .ez-select:focus { border-color: #ffd97d !important; }
        .ez-step-btn {
          transition: all 0.2s ease;
        }
        .ez-step-btn:hover {
          transform: translateY(-1px);
        }
        /* Scrollbar for modal */
        .ez-scroll::-webkit-scrollbar { width:4px; }
        .ez-scroll::-webkit-scrollbar-track { background:transparent; }
        .ez-scroll::-webkit-scrollbar-thumb { background:rgba(74,144,217,0.30); border-radius:4px; }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="ez-modal-wrap fixed inset-0 z-[9999] flex items-center justify-center px-4"
        style={{ background: 'rgba(4,10,22,0.78)', backdropFilter: 'blur(6px)' }}
        onClick={handleOverlay}
      >
        {/* Modal box */}
        <div
          className="ez-modal-box relative w-full max-w-lg rounded-2xl overflow-hidden"
          style={{
            background: surface,
            border: `1px solid ${border}`,
            boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
            maxHeight: '92vh',
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(to right, #4A90D9, #ffd97d, #7ED8A4)` }} />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: textSub }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = '#f0f6ff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = textSub; }}
          >
            <X size={15} />
          </button>

          <div className="ez-scroll overflow-y-auto" style={{ maxHeight: 'calc(92vh - 4px)' }}>

            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center px-8 py-14 text-center gap-5">
                <div className="ez-success-icon w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(126,216,164,0.15)', border: '2px solid rgba(126,216,164,0.45)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l7 7 11-11" stroke="#7ED8A4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[22px] mb-2" style={{ color: textColor }}>You&apos;re on the list!</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: textSub, maxWidth: '34ch', margin: '0 auto' }}>
                    We&apos;ve received your enquiry. Expect a reply within{' '}
                    <span style={{ color: '#4A90D9', fontWeight: 600 }}>24 hours</span> from our team.
                  </p>
                </div>
                <div className="w-full rounded-xl px-5 py-4 text-left"
                  style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.20)' }}>
                  <div className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A90D9' }}>Your Submission</div>
                  {[
                    { label: 'Name', val: form.name },
                    { label: 'Email', val: form.email },
                    { label: 'Course', val: form.course },
                    { label: 'Timeline', val: form.timeline },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid rgba(74,144,217,0.10)' }}>
                      <span className="text-[12px]" style={{ color: textSub }}>{label}</span>
                      <span className="text-[12px] font-medium" style={{ color: textColor }}>{val || '—'}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 w-full">
                  <button onClick={() => { reset(); close(); }}
                    className="flex-1 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: textSub }}>
                    Close
                  </button>
                  <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer"
                    className="flex-1 rounded-full py-2.5 text-[13px] font-semibold text-center transition-all duration-200"
                    style={{ background: '#25D366', color: '#fff' }}>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <div className="px-6 pt-7 pb-7 sm:px-8">

                {/* Header */}
                <div className="mb-6 pr-8">
                  <div className="inline-block mb-3 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.35)', color: '#ffd97d', letterSpacing: '0.15em' }}>
                    Free Consultation — Limited Slots
                  </div>
                  <h3 className="font-bold leading-tight text-[20px] sm:text-[22px]" style={{ color: textColor }}>
                    Start Your Germany Journey
                  </h3>
                  <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: textSub }}>
                    Tell us about yourself and we&apos;ll connect you with the right mentor within 24 hours.
                  </p>
                </div>

                {/* Step progress */}
                <div className="flex items-center gap-0 mb-7">
                  {stepLabels.map((label, i) => {
                    const s = (i + 1) as Step;
                    const done = step > s;
                    const active = step === s;
                    const col = accentColors[s];
                    return (
                      <React.Fragment key={label}>
                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300"
                            style={{
                              background: done ? col : active ? `rgba(${hexToRgb(col)},0.15)` : 'rgba(255,255,255,0.06)',
                              border: `1.5px solid ${done || active ? col : 'rgba(255,255,255,0.15)'}`,
                              color: done ? (s === 2 ? '#1a1200' : '#fff') : active ? col : textSub,
                            }}>
                            {done
                              ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              : i + 1}
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: active ? col : textSub }}>
                            {label}
                          </span>
                        </div>
                        {i < stepLabels.length - 1 && (
                          <div className="flex-1 h-px mx-2 mb-4 transition-all duration-500"
                            style={{ background: step > i + 1 ? accentColors[(i + 2) as Step] : 'rgba(255,255,255,0.12)' }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* ── Step 1: Contact ── */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        className="ez-input"
                        type="text"
                        placeholder="Ravi Kumar"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.name ? '#f87171' : inputBorder }}
                      />
                      {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        className="ez-input"
                        type="email"
                        placeholder="ravi@example.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : inputBorder }}
                      />
                      {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        className="ez-input"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : inputBorder }}
                      />
                      {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {/* ── Step 2: Preferences ── */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label style={labelStyle}>Target Course / Field</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          className="ez-select"
                          value={form.course}
                          onChange={e => set('course', e.target.value)}
                          style={{ ...selectStyle, borderColor: errors.course ? '#f87171' : inputBorder }}
                        >
                          <option value="" disabled>Select your course...</option>
                          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: textSub, pointerEvents: 'none' }} />
                      </div>
                      {errors.course && <p style={errorStyle}>{errors.course}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          className="ez-select"
                          value={form.budget}
                          onChange={e => set('budget', e.target.value)}
                          style={{ ...selectStyle, borderColor: errors.budget ? '#f87171' : inputBorder }}
                        >
                          <option value="" disabled>Select budget...</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: textSub, pointerEvents: 'none' }} />
                      </div>
                      {errors.budget && <p style={errorStyle}>{errors.budget}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Target Intake</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          className="ez-select"
                          value={form.timeline}
                          onChange={e => set('timeline', e.target.value)}
                          style={{ ...selectStyle, borderColor: errors.timeline ? '#f87171' : inputBorder }}
                        >
                          <option value="" disabled>Select timeline...</option>
                          {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: textSub, pointerEvents: 'none' }} />
                      </div>
                      {errors.timeline && <p style={errorStyle}>{errors.timeline}</p>}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Message ── */}
                {step === 3 && (
                  <div className="space-y-4">
                    {/* Summary card */}
                    <div className="rounded-xl px-4 py-3"
                      style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.20)' }}>
                      <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#4A90D9' }}>
                        Your Profile Summary
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {[
                          { l: 'Name', v: form.name },
                          { l: 'Course', v: form.course },
                          { l: 'Budget', v: form.budget },
                          { l: 'Intake', v: form.timeline },
                        ].map(({ l, v }) => (
                          <div key={l}>
                            <span className="text-[11px]" style={{ color: textSub }}>{l}: </span>
                            <span className="text-[11px] font-medium" style={{ color: textColor }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Any specific questions? <span style={{ color: textSub, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
                      <textarea
                        className="ez-input"
                        placeholder="e.g. I need help understanding APS requirements for my bachelor degree..."
                        rows={4}
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </div>
                    <p className="text-[11px]" style={{ color: textSub }}>
                      By submitting, you agree to be contacted by EuroZiel. No spam, ever.
                    </p>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 mt-7">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(s => (s - 1) as Step)}
                      className="ez-step-btn rounded-full py-2.5 px-5 text-[13px] font-semibold"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: textSub }}>
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={step < 3 ? nextStep : handleSubmit}
                    disabled={submitting}
                    className="ez-step-btn flex-1 rounded-full py-2.5 px-5 text-[13px] font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{
                      background: step === 3 ? '#7ED8A4' : accent,
                      color: step === 2 ? '#1a1200' : step === 3 ? '#0a2a18' : '#fff',
                      boxShadow: `0 4px 20px rgba(${hexToRgb(accent)},0.35)`,
                    }}>
                    {submitting ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    ) : step < 3 ? (
                      <>Next Step →</>
                    ) : (
                      <><Send size={14} /> Send Enquiry</>
                    )}
                  </button>
                </div>

                {/* Skip / dismiss */}
                <div className="text-center mt-4">
                  <button onClick={close} className="text-[11px] transition-colors duration-200"
                    style={{ color: textSub }}
                    onMouseEnter={e => { e.currentTarget.style.color = textColor; }}
                    onMouseLeave={e => { e.currentTarget.style.color = textSub; }}>
                    Not now — I&apos;ll explore first
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}