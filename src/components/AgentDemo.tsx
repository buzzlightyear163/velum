import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarClock, Check, LockKeyhole, Play, RotateCcw, Zap } from 'lucide-react'
import { SlideTrack } from './SlideTrack'
import { Ico, GLYPH } from './Ico'
import { Logo } from './Logo'
import { prefersReducedMotion } from '../lib/site'

type Agent = {
  id: 'brief' | 'wallet' | 'launch' | 'research'
  name: string
  blurb: string
  trigger: { kind: 'schedule' | 'event'; text: string }
  schedules?: string[]
  steps: string[]
  result: { title: string; lines: string[] }
}

const AGENTS: Agent[] = [
  {
    id: 'brief',
    name: 'Weekly market brief',
    blurb: 'A one-page brief on what moved in your market, with sources.',
    trigger: { kind: 'schedule', text: 'Every Monday · 08:00' },
    schedules: ['Daily', 'Weekly', 'Monthly'],
    steps: ['Search 38 sources', 'Cross-check 112 claims', 'Drop anything unsourced', 'Write a one-page brief'],
    result: {
      title: 'Brief ready · 24 sources cited',
      lines: ['Four launches, two of them in your category', 'Two price cuts from the market leader', 'One new rule on stablecoin reserves'],
    },
  },
  {
    id: 'wallet',
    name: 'Watch a wallet',
    blurb: 'Tells you the moment a wallet you follow makes a big move.',
    trigger: { kind: 'event', text: 'When 7xKp…Wq3F moves over $50K' },
    steps: ['Read each new slot', 'Tag the counterparties', 'Score the move', 'Explain it in one line'],
    result: {
      title: 'Alert · 14:02',
      lines: ['7xKp…Wq3F moved $412K into a USDC pair', 'Counterparty: a known market-making cluster', 'Read as routine risk-trimming, low risk'],
    },
  },
  {
    id: 'launch',
    name: 'Token launch radar',
    blurb: 'Checks every new Solana token, pump.fun launches included, before you look at it.',
    trigger: { kind: 'event', text: 'New token with over $20K liquidity' },
    steps: ['Spot the launch', 'Check mint and freeze authority', 'Check holders and liquidity', 'Score the risk'],
    result: {
      title: '3 new tokens today · 1 passed',
      lines: ['$DEMO: authorities revoked, LP burned, medium risk', 'Two others: mint authority still live, skipped', 'Full checks are in your inbox'],
    },
  },
  {
    id: 'research',
    name: 'Research a topic',
    blurb: 'Plans the questions, reads the sources and writes the report.',
    trigger: { kind: 'schedule', text: 'Once · now' },
    steps: ['Plan 6 questions', 'Read 40 sources', 'Compare what they say', 'Write the report with citations'],
    result: {
      title: 'Report ready · 9 pages',
      lines: ['Answers to all 6 questions', 'Where the sources disagree, and why', '31 citations you can open'],
    },
  },
]

const ICON: Record<Agent['id'], number> = { brief: GLYPH.brief, wallet: GLYPH.wallet, launch: GLYPH.radar, research: GLYPH.research }
const SCHEDULE_TEXT: Record<string, string> = { Weekly: 'Every Monday · 08:00', Daily: 'Every day · 08:00', Monthly: '1st of the month · 08:00' }

/** Agent templates with a sample run that ticks through each step. */
export function AgentDemo() {
  const [pick, setPick] = useState<Agent['id']>('brief')
  const [often, setOften] = useState('Weekly')
  const [at, setAt] = useState(-1)
  const agent = AGENTS.find((a) => a.id === pick)!
  const running = at >= 0 && at < agent.steps.length
  const done = at >= agent.steps.length

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setAt((v) => v + 1), prefersReducedMotion() ? 0 : 650)
    return () => clearTimeout(t)
  }, [running, at])

  const triggerText = agent.id === 'brief' ? SCHEDULE_TEXT[often] : agent.trigger.text

  return (
    <div className="agent-demo">
      <ul className="agent-list" role="radiogroup" aria-label="Agent templates">
        {AGENTS.map((a) => {
          const on = a.id === pick
          return (
            <li key={a.id}>
              <button
                type="button"
                role="radio"
                aria-checked={on}
                className="agent-option"
                onClick={() => {
                  setPick(a.id)
                  setAt(-1)
                }}
              >
                {on && <motion.span layoutId="agent-pick" className="agent-option-bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="tactile-icon agent-option-icon">
                  <Ico k={ICON[a.id]} size={20} />
                </span>
                <span className="relative flex min-w-0 flex-col text-left">
                  <b>{a.name}</b>
                  <span>{a.blurb}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="folder tone-paper lined agent-panel">
        <span className="folder-tab">Agent · sample run</span>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">{agent.name}</h3>
            <p className="mt-1 text-[15px] text-muted">{agent.blurb}</p>
          </div>
          <span className="agent-trigger">
            {agent.trigger.kind === 'schedule' ? <CalendarClock size={14} /> : <Zap size={14} />}
            {triggerText}
          </span>
        </div>
        {agent.schedules && (
          <div className="mt-4">
            <SlideTrack size="sm" kind="radio" label="How often" value={often} onChange={setOften} items={agent.schedules.map((s) => ({ id: s, label: s }))} />
          </div>
        )}
        <ol className="agent-steps" aria-live="polite">
          {agent.steps.map((s, i) => {
            const state = at > i || done ? 'done' : at === i ? 'now' : 'wait'
            return (
              <li key={s} className={state}>
                <span className="agent-dot">{state === 'done' ? <Check size={12} /> : state === 'now' ? <span className="lookup-spin" /> : i + 1}</span>
                {s}
              </li>
            )
          })}
        </ol>
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div
              key={`result-${pick}`}
              className="agent-result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-3">
                <Logo size={30} />
                <div className="flex flex-col">
                  <b className="text-[15px]">{agent.result.title}</b>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-faint">
                    <LockKeyhole size={12} /> Delivered to your inbox, sealed to you
                  </span>
                </div>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {agent.result.lines.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-[14.5px]">
                    <Check size={15} className="mt-0.5 flex-none text-accent" /> {l}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <button type="button" className="btn btn-ink btn-sm" onClick={() => setAt(0)} disabled={running}>
            {done ? <RotateCcw size={15} /> : <Play size={15} />}
            {done ? 'Run again' : running ? 'Running…' : 'Preview a run'}
          </button>
          <span className="self-center text-[13px] text-faint">Sample run. Live agents open with wave 1.</span>
        </div>
      </div>
    </div>
  )
}
