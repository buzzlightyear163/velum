import { useId } from 'react'

type Props = { size?: number; className?: string }

/**
 * Velum brand mark: two veil folds forming a "V", with a sealed dot
 * between them, on a dusk-iris tile.
 */
export function Logo({ size = 28, className }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`t${id}`} cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#3a3354" />
          <stop offset="1" stopColor="#1f1b2e" />
        </radialGradient>
        <linearGradient id={`p${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1effa" />
          <stop offset="1" stopColor="#8a7fb4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#t${id})`} />
      <g transform="translate(9.6 9.6) scale(0.7)">
        <path
          d="M5 11C8 30 20 46 32 57 28.5 44 25.5 27 22 11 16.5 7.5 10 7.5 5 11Z"
          fill={`url(#p${id})`}
          fillOpacity="0.85"
        />
        <path
          d="M59 11C56 30 44 46 32 57 35.5 44 38.5 27 42 11 47.5 7.5 54 7.5 59 11Z"
          fill={`url(#p${id})`}
          fillOpacity="0.85"
        />
        <circle cx="32" cy="15" r="5.2" fill="#f1effa" />
      </g>
    </svg>
  )
}

/** Wordmark: mark + lowercase name, matching the header lockup. */
export function Wordmark({ size = 28, light = false }: { size?: number; light?: boolean }) {
  return (
    <span
      className={`flex items-center gap-2.5 font-[family-name:var(--font-bricolage)] text-[22px] font-extrabold tracking-[-0.03em] ${light ? 'wordmark-light' : 'text-fg'}`}
    >
      <Logo size={size} className="flex-none" />
      velum
    </span>
  )
}
