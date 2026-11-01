import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, Check, LockKeyhole, Pause, Play } from 'lucide-react'
import { SlideTrack } from './SlideTrack'
import { Logo } from './Logo'
import { Ico, GLYPH } from './Ico'
import { SITE } from '../lib/site'

export type VideoId = 'getting-started' | 'how-sealed-works' | 'agents-tutorial' | 'onchain-lookup' | 'topup-tutorial'

export const VIDEOS: { id: VideoId; tab: string; kind: string; title: string; text: string; length: string }[] = [
  {
    id: 'getting-started',
    tab: 'First chat',
    kind: 'Tutorial',
    title: 'Your first private chat',
    text: 'Pick Sealed mode, ask in your own words, and read an answer only you can open, with a receipt of what was kept.',
    length: '0:17',
  },
  {
    id: 'how-sealed-works',
    tab: 'Sealed mode',
    kind: 'How it works',
    title: 'How a chat stays sealed',
    text: 'Your device checks the enclave, encrypts the prompt, and is the only place the answer is opened. Nothing is kept.',
    length: '0:17',
  },
  {
    id: 'agents-tutorial',
    tab: 'Agents',
    kind: 'Tutorial',
    title: 'Set up an agent',
    text: 'Pick a template, choose when it runs, and preview a run that ends in a brief sealed to you.',
    length: '0:17',
  },
  {
    id: 'onchain-lookup',
    tab: 'Onchain',
    kind: 'How it works',
    title: 'Ask the chain in plain words',
    text: 'Paste a wallet, ask a question, and get a plain report on Solana without anyone seeing what you looked up.',
    length: '0:17',
  },
  {
    id: 'topup-tutorial',
    tab: 'Top up',
    kind: 'Tutorial',
    title: 'Top up credit privately',
    text: 'Pay in USDC on Solana and watch it land as private vouchers that never point back to your chats.',
    length: '0:17',
  },
]

const STEP_MS = 2600
const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35 } }

function Typed({ text, step, from }: { text: string; step: number; from: number }) {
  // Shows the full text once the scene is past the typing step.
  const [n, setN] = useState(step > from ? text.length : 0)
  useEffect(() => {
    if (step !== from) {
      setN(step > from ? text.length : 0)
      return
    }
    setN(0)
    const t = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 34)
    return () => clearInterval(t)
  }, [step, from, text])
  return (
    <>
      {text.slice(0, n)}
      {step === from && n < text.length && <span className="pv-caret" />}
    </>
  )
}

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pv-window">
      <div className="pv-bar">
        <span className="pv-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pv-title">
          <Logo size={14} /> {title}
        </span>
        <span className="pv-lock">
          <LockKeyhole size={11} /> sealed
        </span>
      </div>
      <div className="pv-body">{children}</div>
    </div>
  )
}

function FirstChat({ step }: { step: number }) {
  const q = 'Summarize this lease in plain words. Anything to watch out for?'
  return (
    <Window title="Chat · Sealed">
      <div className="pv-thread">
        {step >= 1 && (
          <motion.p className="bubble" {...fade}>
            {q}
          </motion.p>
        )}
        {step >= 1 && (
          <motion.div className="flex gap-2.5" {...fade}>
            <Logo size={22} className="mt-0.5 flex-none" />
            <div className="flex min-w-0 flex-col gap-2 text-[12.5px] leading-relaxed">
              {step === 1 ? (
                <span className="thinking" aria-label="Thinking">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <>
                  <p>
                    A <strong>12-month lease</strong> at a fixed rent. Two things to raise: the early-exit fee is two months, and repairs over $500 fall on you.
                  </p>
                  {step >= 3 && (
                    <motion.p className="msg-receipt" {...fade}>
                      <span className="msg-receipt-mode">
                        <LockKeyhole size={11} /> Sealed
                      </span>
                      <span className="ok">
                        <Check size={11} /> Not stored by {SITE.name}
                      </span>
                      <span className="ok">
                        <Check size={11} /> Never trained on
                      </span>
                    </motion.p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
      <div className="pv-composer">
        <span className="pv-input">{step === 0 ? <Typed text={q} step={step} from={0} /> : <span className="text-faint">Ask a follow-up</span>}</span>
        <span className="pv-send">
          <ArrowUp size={13} />
        </span>
      </div>
    </Window>
  )
}

function SealedSteps({ step }: { step: number }) {
  const rows = ['Check the enclave', 'Encrypt on your side', 'Work happens inside', 'Only you open the answer']
  return (
    <Window title="How Sealed works">
      <ol className="pv-steps">
        {rows.map((r, i) => (
          <li key={r} className={i < step ? 'done' : i === step ? 'now' : ''}>
            <span className="pv-n">{i < step ? <Check size={11} /> : i + 1}</span>
            <span className="flex min-w-0 flex-col">
              <b>{r}</b>
              {i === 1 && step >= 1 && <code className="cipher pv-cipher">kQ7v2Lm9XbT0pW3eZr8cN1yHs4dJ6uFa5gVoE+/iB2tR9wK</code>}
            </span>
          </li>
        ))}
      </ol>
    </Window>
  )
}

function AgentRun({ step }: { step: number }) {
  const steps = ['Search 38 sources', 'Cross-check 112 claims', 'Drop anything unsourced', 'Write a one-page brief']
  const now = Math.min(step * 1.4, 4)
  return (
    <Window title="Agent · Weekly market brief">
      <div className="flex items-center justify-between gap-2">
        <span className="pv-chip">
          <Ico k={GLYPH.brief} size={13} /> Weekly market brief
        </span>
        <span className="pv-chip soft">Every Monday · 08:00</span>
      </div>
      <ol className="agent-steps pv-agent">
        {steps.map((s, i) => {
          const state = now > i + 1 ? 'done' : now > i ? 'now' : 'wait'
          return (
            <li key={s} className={state}>
              <span className="agent-dot">{state === 'done' ? <Check size={11} /> : state === 'now' ? <span className="lookup-spin" /> : i + 1}</span>
              {s}
            </li>
          )
        })}
      </ol>
      <AnimatePresence>
        {step >= 3 && (
          <motion.div className="agent-result pv-result" {...fade}>
            <b className="text-[13px]">Brief ready · 24 sources cited</b>
            <span className="text-[11.5px] text-faint">Delivered to your inbox, sealed to you</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Window>
  )
}

function OnchainRun({ step }: { step: number }) {
  const q = 'What did 7xKp…Wq3F do in the last 24 hours?'
  return (
    <Window title="Onchain · Solana">
      <div className="pv-composer top">
        <span className="pv-input">
          <Typed text={q} step={step} from={0} />
        </span>
        <span className="pv-send">
          <ArrowUp size={13} />
        </span>
      </div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.ul key="reading" className="pv-reading" {...fade}>
            <li>
              <span className="lookup-spin" /> Reading recent slots
            </li>
            <li>
              <span className="lookup-spin" /> Tagging counterparties
            </li>
          </motion.ul>
        )}
        {step >= 2 && (
          <motion.div key="report" className="flex flex-col gap-2" {...fade}>
            <p className="text-[12.5px] leading-relaxed">
              Part of a <strong>market-making cluster</strong> of 12 wallets. It moved 38% of its liquidity into a stable pair.
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                ['Cluster', '12'],
                ['Moved', '38%'],
                ['Risk', 'Low'],
              ].map(([k, v]) => (
                <div key={k} className="pv-metric">
                  <span className="label block">{k}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Window>
  )
}

function TopupRun({ step }: { step: number }) {
  const vouchers = step >= 2 ? 10 : 0
  return (
    <Window title="Top up credit">
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 5, 10, 25].map((a) => (
          <span key={a} className={`pv-amount ${step >= 0 && a === 10 ? 'on' : ''}`}>
            ${a}
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p key="approve" className="pv-note" {...fade}>
            <span className="lookup-spin" /> Approve 10 USDC in your wallet…
          </motion.p>
        )}
        {step >= 2 && (
          <motion.div key="vouchers" className="pv-vouchers" {...fade}>
            {Array.from({ length: vouchers }).map((_, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                <Ico k={GLYPH.voucher} size={12} />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pv-credit">
        <span className="label">Credit</span>
        <b className="font-mono">{step >= 3 ? '$10.00' : '$0.00'}</b>
      </div>
    </Window>
  )
}

const SCENES: Record<VideoId, { steps: number; render: (s: number) => ReactNode }> = {
  'getting-started': { steps: 4, render: (s) => <FirstChat step={s} /> },
  'how-sealed-works': { steps: 5, render: (s) => <SealedSteps step={s} /> },
  'agents-tutorial': { steps: 5, render: (s) => <AgentRun step={s} /> },
  'onchain-lookup': { steps: 4, render: (s) => <OnchainRun step={s} /> },
  'topup-tutorial': { steps: 5, render: (s) => <TopupRun step={s} /> },
}

/**
 * Tutorial "video". The reference plays recorded mp4 clips; here each clip is a
 * scripted, looping mock of the product (no video files needed). Autoplays in view.
 */
export function ProductVideo({ id, className = '' }: { id: VideoId | string; className?: string }) {
  const meta = VIDEOS.find((v) => v.id === id) ?? VIDEOS[0]
  const scene = SCENES[meta.id]
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const [step, setStep] = useState(0)
  const playing = inView && !paused

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.33 })
    io.observe(el)
    // Scale the 760px-wide scene to the figure's width.
    const ro = new ResizeObserver(([e]) => el.style.setProperty('--pv-s', String(e.contentRect.width / 760)))
    ro.observe(el)
    return () => {
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setStep((s) => (s + 1) % scene.steps), step === scene.steps - 1 ? STEP_MS + 1200 : STEP_MS)
    return () => clearTimeout(t)
  }, [playing, step, scene.steps])

  return (
    <figure ref={ref} className={`product-video ${className}`} aria-label={`${meta.title}. ${meta.text}`}>
      <div className="pv-stage">
        <div className="pv-canvas">{scene.render(step)}</div>
        <span className="pv-progress" style={{ width: `${((step + 1) / scene.steps) * 100}%` }} />
      </div>
      <button type="button" className="product-video-btn" onClick={() => setPaused((p) => !p)} aria-label={playing ? 'Pause video' : 'Play video'}>
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
      <span className="product-video-tag">
        {meta.kind} · {meta.length} · sample data
      </span>
    </figure>
  )
}

export function VideoTabs() {
  const [id, setId] = useState<VideoId>(VIDEOS[0].id)
  const meta = VIDEOS.find((v) => v.id === id)!
  return (
    <div className="folder tone-paper lined video-tabs">
      <span className="folder-tab">Watch it work</span>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SlideTrack label="Videos" value={id} onChange={setId} items={VIDEOS.map((v) => ({ id: v.id, label: v.tab }))} className="max-w-full overflow-x-auto" />
        <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{meta.text}</p>
      </div>
      <ProductVideo key={id} id={id} className="mt-5" />
    </div>
  )
}
