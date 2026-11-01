import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CornerDownLeft, Search } from 'lucide-react'
import { Ico, GLYPH } from '../components/Ico'
import { Logo } from '../components/Logo'
import { MODEL_KINDS } from '../data/models'
import { SITE } from '../lib/site'

type Entry = { group: string; label: string; hint: string; href: string; k?: number; logo?: string }

const ENTRIES: Entry[] = [
  { group: 'Pages', label: 'Home', hint: 'Ask anything, keep it private', href: '/', k: GLYPH.home },
  { group: 'Pages', label: 'Chat', hint: 'Open the private chat', href: '/chat', k: GLYPH.chat },
  { group: 'Pages', label: 'Guides', hint: 'Tutorials and how-it-works videos', href: '/guides', k: GLYPH.guides },
  { group: 'Pages', label: 'Onchain', hint: 'Solana wallets, tokens and programs, explained', href: '/onchain', k: GLYPH.onchain },
  { group: 'Pages', label: 'Agents', hint: 'Briefs, wallet watches and launch radar', href: '/agents', k: GLYPH.agent },
  { group: 'Pages', label: 'Models', hint: 'Every model and the modes it runs in', href: '/#models', k: GLYPH.models },
  { group: 'Pages', label: 'Privacy modes', hint: 'Sealed, Ephemeral and Open', href: '/#modes', k: GLYPH.lock },
  { group: 'Pages', label: 'Pricing', hint: 'Free tier and holders', href: '/pricing', k: GLYPH.tag },
  { group: 'Pages', label: 'Top up credit', hint: 'USDC on Solana', href: '/topup', k: GLYPH.wallet },
  { group: 'Pages', label: 'Developers', hint: 'API, SDKs and MCP tools', href: '/developers', k: GLYPH.code },
  { group: 'Pages', label: 'Early access', hint: 'Join wave 1', href: '/access', k: GLYPH.access },
  ...MODEL_KINDS.flatMap((kind) =>
    kind.models.map((m) => ({
      group: 'Models',
      label: m.name,
      hint: `${kind.label} · ${m.maker}${m.free ? ' · free' : ''}`,
      href: '/#models',
      logo: m.logo,
    })),
  ),
]

/** Ctrl/⌘ K command palette over pages and models. */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [at, setAt] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? ENTRIES.filter((e) => `${e.label} ${e.hint}`.toLowerCase().includes(s)) : ENTRIES
  }, [q])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => input.current?.focus(), 30)
    return () => clearTimeout(t)
  }, [open])
  useEffect(() => {
    list.current?.querySelector(`[data-i="${at}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [at])

  const go = (e?: Entry) => {
    if (!e) return
    onClose()
    setQ('')
    setAt(0)
    navigate(e.href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Search ${SITE.name}`}
            className="cmdk"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className="cmdk-input">
              <Search size={18} />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setAt(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setAt((v) => Math.min(v + 1, results.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setAt((v) => Math.max(v - 1, 0))
                  } else if (e.key === 'Enter') {
                    e.preventDefault()
                    go(results[at])
                  } else if (e.key === 'Escape') onClose()
                }}
                placeholder="Search pages and models"
                aria-label="Search pages and models"
                aria-controls="cmdk-list"
                aria-activedescendant={results[at] ? `cmdk-${at}` : undefined}
              />
              <kbd>Esc</kbd>
            </div>
            <ul id="cmdk-list" ref={list} role="listbox" className="cmdk-list">
              {results.length === 0 && <li className="cmdk-empty">Nothing matches “{q}”.</li>}
              {results.map((e, i) => {
                const group = i === 0 || results[i - 1].group !== e.group ? e.group : null
                const on = i === at
                return (
                  <li key={`${e.group}-${e.label}`} role="presentation">
                    {group && <span className="cmdk-group">{group}</span>}
                    <button
                      id={`cmdk-${i}`}
                      data-i={i}
                      type="button"
                      role="option"
                      aria-selected={on}
                      className="cmdk-item"
                      onMouseMove={() => setAt(i)}
                      onClick={() => go(e)}
                    >
                      {on && <motion.span layoutId="cmdk-active" className="cmdk-active" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                      <span className="cmdk-icon">
                        {e.k !== undefined ? (
                          <Ico k={e.k} size={17} />
                        ) : e.logo ? (
                          <img src={`/assets/models/${e.logo}.svg`} alt="" width={16} height={16} />
                        ) : (
                          <Logo size={20} />
                        )}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col text-left">
                        <b>{e.label}</b>
                        <span className="truncate">{e.hint}</span>
                      </span>
                      {on && <CornerDownLeft size={14} className="cmdk-enter" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
