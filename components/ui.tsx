import Link from 'next/link'

// ─── Eyebrow label ───────────────────────────────
export function EyeBrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-[10px] text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#4A90D9] mb-4 ${className}`}>
      <span className="block w-[28px] h-[1px] bg-[#4A90D9]" />
      {children}
    </div>
  )
}

// ─── Section title ───────────────────────────────
export function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-heading text-[clamp(22px,5.2vw,50px)] font-bold mb-[18px] leading-[1.18] ${className}`}>
      {children}
    </h2>
  )
}

// ─── Rule divider ────────────────────────────────
export function Rule() {
  return <div className="w-[40px] h-[2px] bg-[#4A90D9] my-[22px] rounded-full" />
}

// ─── Button components ───────────────────────────
interface BtnProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  external?: boolean
}

export function Btn({ href, children, variant = 'primary', className = '', external }: BtnProps) {
  const base =
    'inline-flex max-w-full flex-wrap items-center justify-center gap-2 font-body text-[14px] font-semibold px-6 py-3 rounded-[4px] cursor-pointer transition-all duration-200 no-underline sm:flex-nowrap sm:px-8 sm:py-3.5 sm:text-[15px]'
  const styles =
    variant === 'primary'
      ? 'border border-transparent bg-[#4A90D9] text-[#06080F] hover:opacity-[0.87] hover:-translate-y-px hover:shadow-[0_4px_40px_rgba(74,144,217,0.18)]'
      : 'border border-[rgba(74,144,217,0.32)] bg-transparent text-[#E8EDF5] hover:border-[#4A90D9] hover:text-[#4A90D9]'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  )
}

// ─── Page Hero ───────────────────────────────────
interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  subtitle: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <div className="border-b border-[rgba(74,144,217,0.16)] bg-[#0D1B2A] px-4 pb-12 pt-16 sm:px-[5%] sm:pb-[70px] sm:pt-[90px]">
      <div className="mx-auto max-w-[1240px]">
        <EyeBrow>{eyebrow}</EyeBrow>
        <h1 className="font-heading text-[clamp(22px,5.2vw,50px)] font-bold mb-[18px] leading-[1.18]">{title}</h1>
        <p className="max-w-[560px] text-[15px] font-light leading-[1.85] text-[#A8C8F0] sm:text-[17px]">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}

// ─── CTA Band ────────────────────────────────────
interface CtaBandProps {
  title: React.ReactNode
  subtitle: string
  btnLabel: React.ReactNode
  btnHref: string
}

export function CtaBand({ title, subtitle, btnLabel, btnHref }: CtaBandProps) {
  return (
    <div
      className="relative overflow-hidden border-y border-[rgba(74,144,217,0.16)] bg-gradient-to-br from-[#0a1520] to-[#06080F] px-4 py-16 text-center sm:px-[5%] sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(320px,55vh)] w-[min(100%,650px)] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(74,144,217,0.10)_0%,transparent_70%)]" />
      <h2 className="relative font-heading text-[clamp(22px,4.8vw,46px)] font-bold mb-[14px]">{title}</h2>
      <p className="relative mb-8 text-[15px] font-light text-[#A8C8F0] sm:mb-[38px] sm:text-[17px]">{subtitle}</p>
      <Btn href={btnHref} className="relative mx-auto w-full max-w-xs justify-center sm:w-auto sm:max-w-none">
        {btnLabel}
      </Btn>
    </div>
  )
}

// ─── Glass card ──────────────────────────────────
export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[rgba(13,27,42,0.9)] to-[rgba(10,21,32,0.95)]
      border border-[rgba(74,144,217,0.16)] rounded-[10px] backdrop-blur-[12px]
      hover:border-[rgba(74,144,217,0.32)] transition-colors duration-200 ${className}`}>
      {children}
    </div>
  )
}
