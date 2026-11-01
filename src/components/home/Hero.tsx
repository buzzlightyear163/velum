import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import { ArrowUp, ArrowUpRight, Globe, LockKeyhole, RotateCcw, Timer } from 'lucide-react'
import { SlideTrack } from '../SlideTrack'
import { CaButton } from '../CaButton'
import { Ico, GLYPH } from '../Ico'
import { Logo } from '../Logo'
import { Receipt } from '../chat/Receipt'
import { GenImage, IMAGE_PROMPT, RichText } from '../chat/GenImage'
import { MODES, modeOf, type ModeKey } from '../../data/models'
import { askModel, type ChatTurn } from '../../lib/chatApi'
import { STORAGE, prefersReducedMotion, uid } from '../../lib/site'

export const MODE_ICON = { sealed: LockKeyhole, ephemeral: Timer, open: Globe }

const PLACEHOLDERS = [
  'Explain my blood test in plain words',
  'How do I ask for 22k without losing the offer?',
  'Make an image of a quiet lake at sunrise',
  'What did 7xKp…Wq3F do in the last 24 hours?',
  'Plan a 3-day trip to New York City on a mid-range budget',
]

const MAKERS: [string, string][] = [
  ['meta-color', 'Meta'],
  ['openai', 'OpenAI'],
  ['claude-color', 'Anthropic'],
  ['gemini-color', 'Google'],
  ['deepseek-color', 'DeepSeek'],
  ['qwen-color', 'Qwen'],
  ['kimi-color', 'Kimi'],
  ['flux', 'Black Forest Labs'],
  ['kling-color', 'Kling'],
  ['elevenlabs', 'ElevenLabs'],
]

const CHIPS = [
  { label: 'Read a wallet', prompt: 'What did 7xKp…Wq3F do in the last 24 hours?', k: GLYPH.onchain },
  { label: 'Check a token', prompt: 'Is the token at 4cWb…pump safe to hold?', k: GLYPH.token },
  { label: 'Set up an agent', prompt: 'Every Monday, brief me on what moved in my market', k: GLYPH.agent },
  { label: 'Make an image', prompt: 'Create an image of a quiet mountain lake at sunrise, in soft violet tones', k: GLYPH.image },
]

export type Msg =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; kind: 'text'; text: string; shown: number; model?: string; error?: boolean }
  | { id: string; role: 'assistant'; kind: 'image'; prompt: string; ready: boolean }

export type Thread = { id: string; title: string; mode: ModeKey; messages: Msg[]; updated?: number }

const ease = [0.22, 0.8, 0.24, 1] as const
export const fadeUp: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }
export const stagger = (gap = 0.07, delay = 0): Variants => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } })

/** Rotating, typed placeholder ("Explain my blo…"). */
function useTypedPlaceholder(active: boolean) {
  const [st, setSt] = useState({ i: 0, n: 0 })
  const current = PLACEHOLDERS[st.i]
  useEffect(() => {
    if (!active) return
    const reduce = prefersReducedMotion()
    const full = st.n >= current.length
    const next = (st.i + 1) % PLACEHOLDERS.length
    const t = setTimeout(
      () => setSt(full ? { i: next, n: reduce ? PLACEHOLDERS[next].length : 0 } : { i: st.i, n: reduce ? current.length : st.n + 1 }),
      full ? (reduce ? 3200 : 2000) : reduce ? 0 : 38,
    )
    return () => clearTimeout(t)
  }, [active, st, current.length])
  return current.slice(0, st.n)
}

export function toTurns(messages: Msg[]): ChatTurn[] {
  return messages.flatMap((m): ChatTurn[] =>
    m.role === 'user' ? [{ role: 'user', text: m.text }] : m.kind === 'text' && !m.error && m.text ? [{ role: 'assistant', text: m.text }] : [],
  )
}

export function Hero() {
  const [mode, setMode] = useState<ModeKey>('sealed')
  const [thread, setThread] = useState<Thread | null>(null)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const ta = useRef<HTMLTextAreaElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const placeholder = useTypedPlaceholder(!thread && !input)
  const activeMode = modeOf(mode)

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [thread])

  const patch = (id: string, fn: (m: Msg) => Msg) =>
    setThread((t) => (t ? { ...t, messages: t.messages.map((m) => (m.id === id ? fn(m) : m)) } : t))

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || busy) return
    const isImage = IMAGE_PROMPT.test(text)
    const reduce = prefersReducedMotion()
    const user: Msg = { id: uid(), role: 'user', text }
    const aid = uid()
    const reply: Msg = isImage ? { id: aid, role: 'assistant', kind: 'image', prompt: text, ready: false } : { id: aid, role: 'assistant', kind: 'text', text: '', shown: 0 }
    const history = [...(thread?.messages ?? []), user]
    setThread((t) => (t ? { ...t, messages: [...t.messages, user, reply] } : { id: uid(), title: text.slice(0, 60), mode, messages: [user, reply] }))
    setInput('')
    setBusy(true)
    if (ta.current) ta.current.style.height = ''
    if (isImage) {
      timers.current.push(
        setTimeout(() => {
          patch(aid, (m) => ({ ...m, ready: true }) as Msg)
          setBusy(false)
        }, reduce ? 50 : 1200),
      )
      return
    }
    void askModel({
      history: toTurns(history),
      tier: 'Auto',
      mode: thread?.mode ?? mode,
      onText: (s) => patch(aid, (m) => ({ ...m, text: s, shown: s.length }) as Msg),
    }).then(({ text: out, model, error }) => {
      patch(aid, (m) => (error ? { ...m, text: error, shown: error.length, error: true, model } : { ...m, text: out, shown: out.length, model }) as Msg)
      setBusy(false)
    })
  }

  const openFull = () => {
    if (!thread) return
    const done: Thread = {
      ...thread,
      messages: thread.messages.map((m) =>
        m.role === 'assistant' && m.kind === 'text' ? { ...m, shown: m.text.length } : m.role === 'assistant' ? { ...m, ready: true } : m,
      ),
    }
    try {
      sessionStorage.setItem(STORAGE.handoff, JSON.stringify(done))
    } catch {
      /* ignore */
    }
  }

  const ThreadIcon = MODE_ICON[thread?.mode ?? mode]

  return (
    <motion.section className="wrap hero-chat" initial="hidden" animate="show" variants={stagger(0.09, 0.05)}>
      <motion.span className="hero-eyebrow" variants={fadeUp}>
        <Logo size={22} className="flex-none" /> Private AI agent workspace
      </motion.span>
      <motion.h1 className="hero-title" variants={fadeUp}>
        Ask anything.
        <br />
        <em>Keep it private.</em>
      </motion.h1>
      <motion.div className="mt-6" variants={fadeUp}>
        <CaButton />
      </motion.div>
      <motion.div className={`composer ${thread ? 'has-thread' : ''}`} variants={fadeUp}>
        {thread && (
          <>
            <div className="thread-head">
              <span className="flex items-center gap-2 text-[13px] font-medium text-muted">
                <ThreadIcon size={14} className="text-accent" />
                {modeOf(thread.mode).label} chat<span className="max-[480px]:hidden"> · live beta</span>
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  className="thread-btn icon"
                  onClick={() => {
                    timers.current.forEach(clearTimeout)
                    timers.current = []
                    setThread(null)
                    setBusy(false)
                    setInput('')
                    ta.current?.focus()
                  }}
                  aria-label="Start over"
                  title="Start over"
                >
                  <RotateCcw size={14} />
                </button>
                <Link to="/chat" onClick={openFull} className="thread-btn">
                  <span className="max-[480px]:hidden">Open in full chat</span>
                  <span className="min-[481px]:hidden">Full chat</span>
                  <ArrowUpRight size={13} />
                </Link>
              </span>
            </div>
            <div className="thread" ref={scroller} aria-live="polite">
              {thread.messages.map((m) =>
                m.role === 'user' ? (
                  <motion.p key={m.id} className="bubble" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {m.text}
                  </motion.p>
                ) : (
                  <motion.div key={m.id} className="flex gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
                    <Logo size={28} className="mt-0.5 flex-none" />
                    <div className="flex min-w-0 flex-1 flex-col gap-3 text-[15px] leading-relaxed">
                      {m.kind === 'text' ? (
                        <>
                          {m.shown === 0 && !m.error ? (
                            <span className="thinking" aria-label="Thinking">
                              <i />
                              <i />
                              <i />
                            </span>
                          ) : m.error ? (
                            <p className="rounded-[12px] bg-[#fdecea] px-3 py-2 text-[14px] text-[#a3362b]">{m.text}</p>
                          ) : (
                            <RichText text={m.text.slice(0, m.shown)} />
                          )}
                          {m.model && !m.error && <Receipt mode={thread.mode} />}
                        </>
                      ) : m.ready ? (
                        <>
                          <GenImage prompt={m.prompt} className="max-w-[360px]" />
                          <Receipt mode={thread.mode} />
                        </>
                      ) : (
                        <span className="image-wait">Drawing at 1024 × 1024…</span>
                      )}
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </>
        )}
        <form
          className="composer-form"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
        >
          <label htmlFor="hero-ask" className="sr-only">
            Ask Velum
          </label>
          <textarea
            id="hero-ask"
            ref={ta}
            rows={thread ? 1 : 2}
            value={input}
            placeholder={thread ? 'Ask a follow-up' : placeholder}
            onChange={(e) => {
              setInput(e.target.value)
              const el = e.target
              el.style.height = 'auto'
              el.style.height = `${Math.min(el.scrollHeight, 180)}px`
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                send(input)
              }
            }}
          />
          <div className="composer-bar">
            {thread ? null : (
              <SlideTrack
                kind="radio"
                size="sm"
                label="Privacy mode"
                value={mode}
                onChange={setMode}
                items={MODES.map((m) => ({ id: m.key, label: m.label, Icon: MODE_ICON[m.key] }))}
              />
            )}
            <button type="submit" className="send" aria-label="Send" disabled={!input.trim() || busy}>
              <ArrowUp size={18} />
            </button>
          </div>
        </form>
      </motion.div>
      {thread ? null : (
        <>
          <motion.ul className="hero-chips" aria-label="Try asking" variants={fadeUp}>
            {CHIPS.map((c) => (
              <li key={c.label}>
                <button type="button" className="hero-chip" onClick={() => send(c.prompt)}>
                  <Ico k={c.k} size={16} /> {c.label}
                </button>
              </li>
            ))}
          </motion.ul>
          <p key={mode} className="hero-note rise">
            {activeMode.hero}
          </p>
        </>
      )}
      <motion.ul className="hero-meta" variants={fadeUp}>
        <li>No account</li>
        <li>Never used for training</li>
        <li>Free with Auto, every model for holders</li>
      </motion.ul>
      <motion.div className="makers" variants={fadeUp}>
        <span>Models from</span>
        <ul>
          {MAKERS.map(([logo, name]) => (
            <li key={logo} title={name}>
              <img src={`/assets/models/${logo}.svg`} alt={name} width={22} height={22} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  )
}

