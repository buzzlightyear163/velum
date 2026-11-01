import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, LockKeyhole, Ticket, Wallet } from 'lucide-react'
import { MAX_TOPUP, MIN_TOPUP, SITE, TOPUP_PRESETS } from '../../lib/site'

export function SolanaMark({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-hidden="true" fill="currentColor">
      <path d="M5.2 16.6a.8.8 0 0 1 .56-.23h15.8c.36 0 .54.43.28.68l-3.12 3.12a.8.8 0 0 1-.56.23H2.36a.4.4 0 0 1-.28-.68l3.12-3.12Zm0-11.62A.82.82 0 0 1 5.76 4.75h15.8c.36 0 .54.43.28.68l-3.12 3.12a.8.8 0 0 1-.56.23H2.36a.4.4 0 0 1-.28-.68L5.2 4.98Zm13.6 5.77a.8.8 0 0 0-.56-.23H2.44c-.36 0-.54.43-.28.68l3.12 3.12c.15.15.35.23.56.23h15.8c.36 0 .54-.43.28-.68l-3.12-3.12Z" />
    </svg>
  )
}

/** Voucher card with amount picker. On /topup it links into the chat; in the chat it calls onPay. */
export function VoucherCard({ onPay }: { onPay?: (amount: number, token: string) => void }) {
  const id = useId()
  const token = 'USDC'
  const [amount, setAmount] = useState(10)
  const [preset, setPreset] = useState<number | null>(10)
  const [custom, setCustom] = useState('')
  const [error, setError] = useState('')

  const onCustom = (raw: string) => {
    const clean = raw.replace(/[^\d.]/g, '')
    setCustom(clean)
    if (!clean) return setError('')
    const n = Number(clean)
    if (!Number.isFinite(n) || n < MIN_TOPUP || n > MAX_TOPUP) setError(`Enter an amount from $${MIN_TOPUP} to $${MAX_TOPUP}.`)
    else {
      setError('')
      setAmount(Math.round(n))
      setPreset(null)
    }
  }

  const cta = 'btn w-full border-pale !bg-none bg-pale text-night hover:border-white hover:bg-white'

  return (
    <div className="folder tone-night mt-0">
      <span className="folder-tab">Voucher · Solana</span>
      <div className="flex items-end justify-between gap-4 border-b-2 border-dashed border-white/15 p-7 max-[480px]:p-5">
        <div className="flex flex-col gap-1">
          <span className="label !text-night-muted">You get</span>
          <span className="font-display text-[64px] font-extrabold leading-[0.9] tracking-[-0.05em] tabular-nums">${amount}</span>
          <span className="text-sm text-night-muted">
            {amount} private voucher{amount === 1 ? '' : 's'}
          </span>
        </div>
        <Ticket size={44} strokeWidth={1.5} className="mb-2 text-pale" />
      </div>
      <dl className="flex flex-col gap-4 p-7 text-[15px] max-[480px]:p-5">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-night-muted">Network</dt>
          <dd className="flex items-center gap-2.5 font-medium">
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#9945FF,#14F195)] text-white">
              <SolanaMark size={14} />
            </span>
            Solana
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-night-muted">Token</dt>
          <dd className="flex items-center gap-2.5 font-medium">
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2775CA] text-[13px] font-bold text-white">
              $
            </span>
            {token}
          </dd>
        </div>
        <div className="flex flex-col gap-3">
          <dt className="text-night-muted" id={id}>
            Amount
          </dt>
          <dd aria-labelledby={id} className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.6fr)] gap-2 max-[480px]:grid-cols-4" role="group">
            {TOPUP_PRESETS.map((v) => {
              const on = preset === v
              return (
                <button
                  key={v}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setPreset(v)
                    setAmount(v)
                    setCustom('')
                    setError('')
                  }}
                  className={`h-12 rounded-[14px] text-[15px] font-semibold transition ${on ? 'bg-pale text-night' : 'bg-night-2 text-white hover:bg-[#2f2a42]'}`}
                >
                  ${v}
                </button>
              )
            })}
            <label className="flex h-12 items-center gap-1.5 rounded-[14px] border border-white/15 px-3.5 text-sm focus-within:border-pale max-[480px]:col-span-4">
              <span className="text-night-muted">$</span>
              <span className="sr-only">Custom amount</span>
              <input
                className="w-full min-w-0 bg-transparent text-white outline-none placeholder:text-[#7f779c] focus-visible:outline-none"
                inputMode="numeric"
                placeholder={`Any up to ${MAX_TOPUP}`}
                value={custom}
                onChange={(e) => onCustom(e.target.value)}
                aria-invalid={error ? true : undefined}
              />
            </label>
          </dd>
          {error && <p className="text-right text-[13px] text-[#f0a49c]">{error}</p>}
        </div>
      </dl>
      <div className="flex flex-col gap-4 px-7 pb-7 max-[480px]:px-5 max-[480px]:pb-5">
        {onPay ? (
          <button type="button" className={cta} onClick={() => onPay(amount, token)}>
            <Wallet size={18} />
            Pay ${amount} in {token}
          </button>
        ) : (
          <Link className={cta} to="/chat#topup">
            Top up ${amount} in {token} <ArrowUpRight size={17} />
          </Link>
        )}
        <p className="flex gap-2.5 text-[13px] text-night-muted">
          <LockKeyhole size={15} className="mt-0.5 flex-none" />
          Vouchers are made in your browser, so {SITE.name} never sees which payment paid for which chat.
        </p>
      </div>
    </div>
  )
}
