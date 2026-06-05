/** Minimal ISO 3166-1 alpha-2 flag marks (geometric, no assets). */

export type CountryCode = 'de' | 'nl' | 'se' | 'fr' | 'at' | 'fi' | 'dk'

const base = 'shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/15'

export function CountryFlag({
  code,
  className = 'h-3.5 w-[22px]',
}: {
  code: CountryCode
  className?: string
}) {
  const cn = `${base} ${className}`

  switch (code) {
    case 'de':
      return (
        <svg className={cn} viewBox="0 0 5 3" aria-hidden>
          <rect width="5" height="1" y="0" fill="#000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      )
    case 'nl':
      return (
        <svg className={cn} viewBox="0 0 5 3" aria-hidden>
          <rect width="5" height="1" y="0" fill="#AE1C28" />
          <rect width="5" height="1" y="1" fill="#FFF" />
          <rect width="5" height="1" y="2" fill="#21468B" />
        </svg>
      )
    case 'se':
      return (
        <svg className={cn} viewBox="0 0 16 10" aria-hidden>
          <rect width="16" height="10" fill="#006AA7" />
          <rect x="5" width="2" height="10" fill="#FECC00" />
          <rect y="4" width="16" height="2" fill="#FECC00" />
        </svg>
      )
    case 'fr':
      return (
        <svg className={cn} viewBox="0 0 3 2" aria-hidden>
          <rect width="1" height="2" x="0" fill="#002395" />
          <rect width="1" height="2" x="1" fill="#FFF" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
      )
    case 'at':
      return (
        <svg className={cn} viewBox="0 0 5 3" aria-hidden>
          <rect width="5" height="1" y="0" fill="#ED2939" />
          <rect width="5" height="1" y="1" fill="#FFF" />
          <rect width="5" height="1" y="2" fill="#ED2939" />
        </svg>
      )
    case 'fi':
      return (
        <svg className={cn} viewBox="0 0 18 11" aria-hidden>
          <rect width="18" height="11" fill="#FFF" />
          <rect x="5" width="3" height="11" fill="#002F6C" />
          <rect y="4" width="18" height="3" fill="#002F6C" />
        </svg>
      )
    case 'dk':
      return (
        <svg className={cn} viewBox="0 0 37 28" aria-hidden>
          <rect width="37" height="28" fill="#C8102E" />
          <rect x="12" width="4" height="28" fill="#FFF" />
          <rect y="12" width="37" height="4" fill="#FFF" />
        </svg>
      )
    default:
      return null
  }
}
