import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { SITE, prefersReducedMotion } from '../../lib/site'
import { fadeUp, stagger } from './Hero'

const STEPS = [
  {
    title: 'Check the enclave',
    text: 'Before anything leaves your device, your browser checks the enclave’s attestation, which proves exactly which code will handle your request.',
    detail: ['Attestation signed', 'Code hash matches the published build'],
  },
  {
    title: 'Encrypt on your side',
    text: 'Your prompt and files are encrypted to that enclave’s key, so they travel as noise to everyone in between.',
    detail: null,
  },
  {
    title: 'Work happens inside',
    text: `The model, agent or onchain engine runs in isolated memory. ${SITE.name} runs the machine but cannot look into it.`,
    detail: ['Isolated memory', 'No operator access'],
  },
  {
    title: 'Only you open the answer',
    text: 'The answer comes back encrypted and is opened on your device. You get a receipt; the enclave keeps nothing.',
    detail: ['Opened on your device', 'Nothing kept'],
  },
]

/** Four-step "how Sealed works" list; the active step advances every 2.4s once in view. */
export function SealedFlow() {
  const ref = useRef<HTMLOListElement>(null)
  const [seen, setSeen] = useState(false)
  const [at, setAt] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return
    const t = window.setInterval(() => setAt((v) => (v + 1) % STEPS.length), 2400)
    return () => clearInterval(t)
  }, [seen])

  return (
    <motion.ol className="steps" ref={ref} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.09)}>
      {STEPS.map((s, i) => (
        <motion.li key={s.title} variants={fadeUp} className={`step ${i <= at ? 'on' : ''}`} onMouseEnter={() => setAt(i)}>
          <span className="step-n">{i + 1}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
          {s.detail ? (
            <ul className="step-detail">
              {s.detail.map((d) => (
                <li key={d}>
                  <Check size={14} />
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <div className="step-detail">
              <span className="label">What the network sees</span>
              <code className="cipher">kQ7v2Lm9XbT0pW3eZr8cN1yHs4dJ6uFa5gVoE+/iB2tR9wKqY0nM3xC7lP8jUh=</code>
            </div>
          )}
        </motion.li>
      ))}
    </motion.ol>
  )
}
