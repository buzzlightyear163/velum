import { useId } from 'react'

type Props = { size?: number; className?: string }

/**
 * Velum brand mark: two translucent folds of a veil meeting in a "V",
 * with a sealed dot above, on a dusk-iris tile.
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
          d="M7 9c9 1 17 6 21.5 14.5C31 28 32 34 32 55 25 48 15 40 10 30 6.5 23 5.5 15 7 9Z"
          fill={`url(#p${id})`}
          fillOpacity="0.85"
        />
        <path
          d="M57 9c-9 1-17 6-21.5 14.5C33 28 32 34 32 55c7-7 17-15 22-25 3.5-7 4.5-15 3-21Z"
          fill={`url(#p${id})`}
          fillOpacity="0.85"
        />
        <circle cx="32" cy="10" r="5" fill="#f1effa" />
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
