import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, Check, LockKeyhole, TriangleAlert, X } from 'lucide-react'
import { SlideTrack } from '../SlideTrack'
import { Logo } from '../Logo'
import { fadeUp, stagger } from '../home/Hero'
import { prefersReducedMotion } from '../../lib/site'

type Level = 'ok' | 'warn' | 'bad'
type Sample = {
  id: 'wallet' | 'token' | 'contract'
  label: string
  query: string
  ask: string
  title: string
  verdict: { text: string; level: Level }
  metrics: { label: string; value: string; note?: string }[]
  checks: { text: string; level: Level }[]
  answer: string
}

const SAMPLES: Sample[] = [
  {
    id: 'wallet',
    label: 'Wallet',
    query: '7xKp…Wq3F',
    ask: 'What did 7xKp…Wq3F do in the last 24 hours?',
    title: 'Market-making cluster',
    verdict: { text: 'Low risk', level: 'ok' },
    metrics: [
      { label: 'Linked wallets', value: '12', note: 'same funder' },
      { label: 'Transactions, 24h', value: '38' },
      { label: 'Liquidity moved', value: '38%', note: 'to a USDC pair' },
      { label: 'Active for', value: '214 days' },
    ],
    checks: [
      { text: 'Funded from one source, 214 days ago', level: 'ok' },
      { text: 'Quotes both sides of 4 Raydium and Orca pools', level: 'ok' },
      { text: 'Pulled 38% of one pool’s liquidity in an hour', level: 'warn' },
    ],
    answer:
      'This wallet is one of 12 run by the same market maker. In the last 24 hours it pulled 38% of its liquidity from one Raydium pool and parked it in a USDC pair. That looks like routine risk-trimming, not an exit.',
  },
  {
    id: 'token',
    label: 'Token',
    query: '$DEMO · 4cWb…pump',
    ask: 'Is the token at 4cWb…pump safe to hold?',
    title: '$DEMO, launched 9 days ago',
    verdict: { text: 'Medium risk', level: 'warn' },
    metrics: [
      { label: 'Holders', value: '3,412' },
      { label: 'Top 10 hold', value: '41%' },
      { label: 'Liquidity', value: '$286K', note: 'LP burned' },
      { label: 'Age', value: '9 days' },
    ],
    checks: [
      { text: 'Mint authority is revoked', level: 'ok' },
      { text: 'Freeze authority is revoked', level: 'ok' },
      { text: 'LP tokens are burned', level: 'ok' },
      { text: 'One wallet holds 9.8% of supply', level: 'warn' },
      { text: 'The dev wallet sold 12% in the first two days', level: 'warn' },
    ],
    answer:
      'The mint itself is clean: no one can mint more or freeze your tokens, and the liquidity can’t be pulled. The risk is in who holds it. One wallet has nearly 10% and the dev wallet already sold 12%, so a few wallets can still move the price a lot.',
  },
  {
    id: 'contract',
    label: 'Program',
    query: 'Stk9…Vb2e',
    ask: 'Explain what the program at Stk9…Vb2e can do.',
    title: 'Staking program with one admin key',
    verdict: { text: 'High risk', level: 'bad' },
    metrics: [
      { label: 'Type', value: 'Anchor program' },
      { label: 'Fee', value: '2%', note: 'admin can raise to 25%' },
      { label: 'Upgradeable', value: 'Yes', note: '1 upgrade authority' },
      { label: 'Admin', value: '1 wallet', note: 'no multisig' },
    ],
    checks: [
      { text: 'withdraw takes a 2% fee on every exit', level: 'warn' },
      { text: 'set_fee lets the admin raise the fee to 25%', level: 'bad' },
      { text: 'emergency_withdraw lets the admin move every deposit', level: 'bad' },
      { text: 'The upgrade authority can replace the code at any time', level: 'warn' },
    ],
    answer:
      'In plain words: it’s a staking pool with a 2% exit fee, but one wallet can raise that fee to 25%, move everyone’s deposits, and upgrade the program at any time, with no multisig and no delay. Treat it as high risk until those keys are given up.',
  },
]

const READING = ['Reading recent slots', 'Tagging linked wallets', 'Scoring the risk']

function LevelIcon({ level }: { level: Level }) {
  return level === 'ok' ? <Check size={14} /> : level === 'warn' ? <TriangleAlert size={14} /> : <X size={14} />
}

/** "Try a lookup" demo: reads for ~1.3s, then shows a labelled report. Sample data only. */
export function Lookup() {
  const [pick, setPick] = useState<Sample['id']>('wallet')
  const [at, setAt] = useState(0)
  const [run, setRun] = useState(0)
  const sample = SAMPLES.find((s) => s.id === pick)!
  const done = at >= READING.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setAt((v) => v + 1), prefersReducedMotion() ? 0 : 420)
    return () => clearTimeout(t)
  }, [at, done, run])

  const ask = (id: Sample['id']) => {
    setPick(id)
    setAt(0)
    setRun((r) => r + 1)
  }

  return (
    <div className="folder tone-paper lined lookup">
      <span className="folder-tab">Try a lookup · sample data</span>
      <div className="lookup-top">
        <SlideTrack label="What to look up" value={pick} onChange={ask} items={SAMPLES.map((s) => ({ id: s.id, label: s.label }))} />
        <span className="lookup-chain">Solana</span>
      </div>
      <div className="lookup-ask">
        <span className="lookup-query">{sample.query}</span>
        <p>{sample.ask}</p>
        <button type="button" className="send" aria-label="Ask again" onClick={() => ask(pick)}>
          <ArrowUp size={18} />
        </button>
      </div>
      <div className="lookup-body" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div key={`report-${run}`} initial="hidden" animate="show" variants={stagger(0.06)} className="lookup-report">
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-[24px] font-bold tracking-[-0.02em]">{sample.title}</h3>
                <span className={`level-pill ${sample.verdict.level}`}>
                  <LevelIcon level={sample.verdict.level} /> {sample.verdict.text}
                </span>
              </motion.div>
              <motion.ul variants={fadeUp} className="lookup-metrics">
                {sample.metrics.map((m) => (
                  <li key={m.label}>
                    <span className="label">{m.label}</span>
                    <b>{m.value}</b>
                    {m.note && <span className="text-[12.5px] text-faint">{m.note}</span>}
                  </li>
                ))}
              </motion.ul>
              <motion.ul variants={fadeUp} className="lookup-checks">
                {sample.checks.map((c) => (
                  <li key={c.text} className={c.level}>
                    <span>
                      <LevelIcon level={c.level} />
                    </span>
                    {c.text}
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="lookup-answer">
                <Logo size={28} className="flex-none" />
                <div className="flex flex-col gap-2">
                  <p>{sample.answer}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-faint">
                    <LockKeyhole size={12} /> Sealed lookup: nobody else saw what you asked about.
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.ul key={`reading-${run}`} className="lookup-reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              {READING.slice(0, at + 1).map((r, i) => (
                <motion.li key={r} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  {i < at ? <Check size={14} /> : <span className="lookup-spin" />}
                  {r}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
