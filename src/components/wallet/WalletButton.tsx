import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, ExternalLink, LogOut, Wallet, X } from 'lucide-react'
import { useWallet } from './WalletContext'
import { HOLD, SITE, shortAddress } from '../../lib/site'

function SessionInfo() {
  const { session } = useWallet()
  if (!session) return null
  const bal = session.balance === null ? null : session.balance.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return (
    <div className="flex flex-col gap-2">
      <span className="label">Signed in with Solana</span>
      <span className="break-all font-mono text-[12.5px] text-fg">{session.address}</span>
      <div className="mt-1 rounded-[12px] bg-mist px-3 py-2.5 text-[13px]">
        {SITE.ca ? (
          session.holder ? (
            <span className="flex items-center gap-1.5 font-semibold text-[#0f8f6b]">
              <Check size={15} /> Holder · {bal} {SITE.ticker}
            </span>
          ) : (
            <span className="text-muted">
              {bal === null ? 'Couldn’t read your balance right now.' : `${bal} ${SITE.ticker}.`} Hold {HOLD} to pick any model.
            </span>
          )
        ) : (
          <span className="text-muted">{SITE.ticker} launches soon. Holder access switches on with the token.</span>
        )}
      </div>
    </div>
  )
}

function WalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { wallets, signIn, error, clearError, working, session } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (open && session?.address) onClose()
  }, [open, session?.address, onClose])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted) return null
  const here = window.location.href
  const origin = window.location.origin
  const deepLinks = [
    { name: 'Phantom', href: `https://phantom.app/ul/browse/${encodeURIComponent(here)}?ref=${encodeURIComponent(origin)}` },
    { name: 'Solflare', href: `https://solflare.com/ul/v1/browse/${encodeURIComponent(here)}?ref=${encodeURIComponent(origin)}` },
  ]

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(16,24,20,0.45)] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Connect a Solana wallet"
            className="w-full max-w-[400px] rounded-[24px] bg-surface p-6 text-left shadow-2xl"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-[22px] font-extrabold tracking-[-0.03em]">Connect a wallet</h2>
                <p className="mt-1 text-[14px] text-muted">Solana only. You sign one message to prove it’s yours: no transaction, no fee.</p>
              </div>
              <button type="button" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line" onClick={onClose} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            {wallets.length > 0 ? (
              <ul className="mt-5 flex flex-col gap-2">
                {wallets.map((w) => (
                  <li key={w.name}>
                    <button
                      type="button"
                      disabled={working}
                      onClick={() => {
                        clearError()
                        void signIn(w.name)
                      }}
                      className="flex min-h-[54px] w-full items-center gap-3 rounded-[16px] border border-line px-4 text-left font-semibold hover:border-fg/30 hover:bg-mist disabled:opacity-60"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-[8px] text-[13px] font-bold text-white" style={{ background: w.color }}>
                        {w.name[0]}
                      </span>
                      <span className="flex-1">{w.name}</span>
                      <span className="text-[12px] font-medium text-faint">Detected</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 flex flex-col gap-2">
                <p className="text-[14px] text-muted">No Solana wallet found in this browser. On a phone, open {SITE.name} inside your wallet app:</p>
                {deepLinks.map((l) => (
                  <a key={l.name} href={l.href} className="flex min-h-[50px] items-center justify-between rounded-[16px] border border-line px-4 font-semibold no-underline hover:bg-mist">
                    Open in {l.name} <ExternalLink size={16} />
                  </a>
                ))}
                <p className="mt-1 text-[13px] text-faint">
                  On a computer, install{' '}
                  <a href="https://phantom.com/download" target="_blank" rel="noreferrer" className="underline">
                    Phantom
                  </a>{' '}
                  or{' '}
                  <a href="https://solflare.com/download" target="_blank" rel="noreferrer" className="underline">
                    Solflare
                  </a>
                  , then reload.
                </p>
              </div>
            )}
            {working && <p className="mt-4 text-[13.5px] text-muted">Check your wallet: approve the connection, then sign the message.</p>}
            {error && (
              <p className="mt-4 rounded-[12px] bg-[#fdecea] px-3 py-2 text-[13.5px] text-[#a3362b]" role="alert">
                {error}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/** "Connect wallet" pill; becomes an address chip with a dropdown once signed in. */
export function WalletButton({ className = '', block = false }: { className?: string; block?: boolean }) {
  const { session, working, signOut } = useWallet()
  const [modal, setModal] = useState(false)
  const [menu, setMenu] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu) return
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setMenu(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [menu])

  const base = `inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[14px] font-semibold transition ${
    block ? 'w-full justify-center' : 'max-[480px]:min-w-[40px] max-[480px]:justify-center max-[480px]:px-0'
  }`
  const hideSm = block ? '' : 'max-[480px]:hidden'

  if (session?.address) {
    return (
      <div ref={ref} className={`relative ${block ? 'w-full' : ''} ${className}`}>
        <button
          type="button"
          className={`${base} relative border-line bg-surface text-fg hover:border-fg/30`}
          onClick={() => setMenu((m) => !m)}
          aria-expanded={menu}
          aria-label={`Wallet ${shortAddress(session.address)}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${session.holder ? 'bg-[#14b88a]' : 'bg-faint'} ${block ? '' : 'max-[480px]:absolute max-[480px]:right-1 max-[480px]:top-1'}`}
            aria-hidden="true"
          />
          {!block && <Wallet size={16} className="hidden shrink-0 max-[480px]:block" />}
          <span className={`font-mono text-[13px] ${hideSm}`}>{shortAddress(session.address)}</span>
          <ChevronDown size={15} className={`text-muted ${hideSm}`} />
        </button>
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className={`absolute z-[80] mt-2 w-[280px] rounded-[18px] border border-line bg-surface p-4 text-left shadow-[0_18px_40px_-18px_rgba(20,30,25,0.35)] ${block ? 'left-1/2 -translate-x-1/2' : 'right-0'}`}
            >
              <SessionInfo />
              <button
                type="button"
                className="mt-3 inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-full border border-line text-[13.5px] font-semibold hover:bg-mist"
                onClick={async () => {
                  await signOut()
                  setMenu(false)
                }}
              >
                <LogOut size={15} /> Disconnect
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        className={`${base} border-fg bg-surface text-fg hover:bg-mist ${className}`}
        onClick={() => setModal(true)}
        disabled={working}
        aria-label="Connect wallet"
      >
        <Wallet size={16} className="shrink-0" />
        <span className={hideSm}>{working ? 'Connecting…' : 'Connect wallet'}</span>
      </button>
      <WalletModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}
