import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { Ico, GLYPH } from '../components/Ico'
import { Wordmark } from '../components/Logo'
import { CaButton } from '../components/CaButton'
import { WalletButton } from '../components/wallet/WalletButton'
import { SearchDialog } from './SearchDialog'
import { SITE } from '../lib/site'

const CHIPS = [
  { label: 'Chat', href: '/chat', k: GLYPH.chat },
  { label: 'Create', href: '/#create', k: GLYPH.image },
  { label: 'Agents', href: '/agents', k: GLYPH.agent },
  { label: 'Onchain', href: '/onchain', k: GLYPH.onchain },
]

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/onchain', label: 'Onchain' },
      { href: '/agents', label: 'Agents' },
      { href: '/#models', label: 'Models' },
      { href: '/#modes', label: 'Privacy modes' },
      { href: '/#sealed', label: 'How Sealed works' },
      { href: '/guides', label: 'Guides and videos' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/topup', label: 'Top up credit' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { href: '/developers', label: 'Documentation' },
      { href: '/developers#quickstart', label: 'API and SDKs' },
      { href: '/developers#mcp', label: 'MCP tools' },
      { href: '/developers#modes', label: 'Privacy modes in the API' },
    ],
  },
]

const NAV = [
  { href: '/agents', label: 'Agents' },
  { href: '/onchain', label: 'Onchain' },
  { href: '/#models', label: 'Models' },
  { href: '/pricing', label: 'Pricing' },
]

const TABS = [
  { label: 'Home', href: '/', k: GLYPH.home },
  { label: 'Onchain', href: '/onchain', k: GLYPH.onchain },
  { label: 'Agents', href: '/agents', k: GLYPH.agent },
  { label: 'Pricing', href: '/pricing', k: GLYPH.tag },
]

const spring = { type: 'spring', stiffness: 380, damping: 34 } as const

function TabBar({ pathname, hidden }: { pathname: string; hidden: boolean }) {
  return (
    <div className={`tabbar-wrap ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden || undefined}>
      <LayoutGroup id="tabbar">
        <nav aria-label="Pages" className="tabbar">
          {TABS.map(({ label, href, k }) => {
            const on = pathname === href
            return (
              <Link key={href} to={href} aria-label={label} aria-current={on ? 'page' : undefined} className="tab">
                {on && <motion.span layoutId="tab-capsule" className="tab-capsule" transition={spring} />}
                <motion.span layout="position" className="relative z-10 flex items-center gap-1.5">
                  <Ico k={k} size={21} />
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span className="tab-label" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={spring}>
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
              </Link>
            )
          })}
        </nav>
      </LayoutGroup>
      <motion.div whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
        <Link to="/chat" aria-label="Chat" aria-current={pathname === '/chat' ? 'page' : undefined} className="tabbar-chat">
          <Ico k={GLYPH.chat} size={24} />
        </Link>
      </motion.div>
    </div>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [offset, setOffset] = useState(64)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => setMenu(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setMenu(false)
        setSearch((s) => !s)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!menu) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setMenu(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const close = () => setMenu(false)

  return (
    <>
      <header ref={ref} className="topbar">
        <div className="topbar-row">
          <Link to="/" aria-label={`${SITE.name} home`} className="no-underline" onClick={close}>
            <Wordmark size={28} />
          </Link>
          <nav aria-label="Main" className="topbar-links">
            {NAV.map((n) => (
              <Link key={n.href} to={n.href} aria-current={pathname === n.href ? 'page' : undefined} onClick={close}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="topbar-end">
            <button type="button" className="topbar-icon" onClick={() => setSearch(true)} aria-label="Search (Ctrl K)" title="Search (Ctrl K)">
              <Search size={18} />
            </button>
            <CaButton className="max-[1180px]:hidden" />
            <WalletButton className="max-[860px]:hidden" />
            <Link to="/chat" className="topbar-cta max-[560px]:hidden">
              Start chatting
            </Link>
            <button
              type="button"
              className="topbar-icon"
              aria-expanded={menu}
              aria-controls="site-menu"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              onClick={() => {
                if (!menu && ref.current) setOffset(Math.max(0, ref.current.getBoundingClientRect().bottom))
                setMenu((m) => !m)
              }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menu ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="grid place-items-center"
                >
                  {menu ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.div
              id="site-menu"
              className="topbar-panel"
              style={{ maxHeight: `calc(100dvh - ${offset}px)` }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: [0.22, 0.8, 0.24, 1] }}
            >
              <div className="topbar-grid">
                <div className="topbar-col first">
                  <span className="topbar-tile">
                    <Ico k={GLYPH.lock} size={20} />
                  </span>
                  <h4 className="text-[15px] font-semibold">Private AI workspace</h4>
                  <p className="text-[14px] leading-relaxed text-muted">Chat, create, run agents and read the chain, sealed by default and never used for training.</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {CHIPS.map((c) => (
                      <Link key={c.href} to={c.href} className="topbar-chip" onClick={close}>
                        <Ico k={c.k} size={14} /> {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
                {COLUMNS.map((col) => (
                  <div key={col.title} className="topbar-col">
                    <h4 className="topbar-heading">{col.title}</h4>
                    <ul className="flex flex-col gap-3">
                      {col.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link to={l.href} className="topbar-link" onClick={close}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="topbar-col last">
                  <h4 className="topbar-heading">Featured</h4>
                  <Link className="topbar-feature group" to="/access" onClick={close}>
                    <span>
                      <span className="topbar-badge">
                        Wave 1 · opening soon <ArrowUpRight size={12} />
                      </span>
                      <strong className="mt-3 block text-[15px] font-semibold">Get early access</strong>
                      <span className="mt-1.5 block text-[14px] leading-relaxed text-muted">
                        Join the list for wave 1 and we’ll send your invite, plus an API key if you need one.
                      </span>
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-accent">
                      Join the list <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="topbar-mobile-cta flex flex-col items-stretch gap-2.5">
                <CaButton className="justify-center" />
                <WalletButton block />
                <Link className="topbar-cta w-full justify-center" to="/chat" onClick={close}>
                  Start chatting
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <TabBar pathname={pathname} hidden={menu} />
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  )
}
