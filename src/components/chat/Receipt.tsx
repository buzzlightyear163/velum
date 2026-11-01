import { Check, Globe, LockKeyhole, Timer } from 'lucide-react'
import { RECEIPTS, modeOf, type ModeKey } from '../../data/models'

const ICON = { sealed: LockKeyhole, ephemeral: Timer, open: Globe }

/** Privacy receipt shown under every answer. */
export function Receipt({ mode }: { mode: ModeKey }) {
  const Icon = ICON[mode]
  return (
    <p className="msg-receipt" aria-label="Privacy receipt">
      <span className="msg-receipt-mode">
        <Icon size={12} /> {modeOf(mode).label}
      </span>
      {RECEIPTS[mode].map(({ text, ok }) => (
        <span key={text} className={ok ? 'ok' : 'warn'}>
          {ok ? <Check size={12} /> : <span className="msg-receipt-dot" aria-hidden="true" />}
          {text}
        </span>
      ))}
    </p>
  )
}
