import { useId, useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Ico, GLYPH } from '../Ico'
import { FREE_LIMIT, HOLD, SITE } from '../../lib/site'

const ITEMS = [
  {
    k: GLYPH.lock,
    q: `Can ${SITE.name} read my chats?`,
    a: 'In Sealed mode, no. Your prompt is encrypted to an attested enclave on your device and the answer comes back encrypted to you. In Ephemeral mode, requests are processed in memory and nothing is stored. Open mode keeps standard logs.',
  },
  {
    k: GLYPH.image,
    q: `Can ${SITE.name} make images and videos?`,
    a: `Yes. Describe what you want and ${SITE.name} creates images, short video clips, voiceovers or music, under the same privacy modes as chat.`,
  },
  {
    k: GLYPH.models,
    q: 'Which AI models can I use?',
    a: 'Everyone can use Auto, which picks a light open model for each question. Holders can choose any model: open-weight ones such as Llama, DeepSeek, Qwen and Kimi in every mode, and hosted ones such as GPT, Claude and Gemini in Open mode. The launch lineup may still change.',
  },
  {
    k: GLYPH.holder,
    q: 'Do I need to hold a token?',
    a: `Not to start. Without a token you get Auto for free, up to ${FREE_LIMIT}. Hold ${HOLD} in your wallet to unlock every model; use is then paid with credit, from $1.`,
  },
  {
    k: GLYPH.crypto,
    q: 'Do I need to know anything about crypto?',
    a: 'No. Chat and Create work for any kind of question. Onchain answers are there when you need them.',
  },
  {
    k: GLYPH.noTrain,
    q: 'Is my data used for training?',
    a: `No. Nothing you send through ${SITE.name} is used to train models, in any mode.`,
  },
]

const spring = { type: 'spring', stiffness: 600, damping: 50, mass: 1 } as const

/** "Split" accordion: the open card lifts away from its neighbours. */
export function Faq() {
  const base = useId().replace(/:/g, '')
  const [open, setOpen] = useState(0)
  const total = ITEMS.length
  return (
    <LayoutGroup>
      <ul className="w-full">
        {ITEMS.map((item, i) => {
          const isOpen = i === open
          const first = i === 0
          const last = i === total - 1
          const beforeOpen = i === open - 1
          const afterOpen = i === open + 1
          const top = isOpen || first || afterOpen ? 22 : 0
          const bottom = isOpen || last || beforeOpen ? 22 : 0
          return (
            <motion.li key={item.q} layout transition={spring}>
              <motion.div
                layout
                transition={spring}
                animate={{ borderTopLeftRadius: top, borderTopRightRadius: top, borderBottomLeftRadius: bottom, borderBottomRightRadius: bottom }}
                className={`split-card ${isOpen ? 'open' : ''}`}
                style={{
                  borderTopWidth: first || afterOpen || isOpen ? 1 : 0,
                  borderBottomWidth: last || beforeOpen || isOpen ? 1 : 0,
                  marginBlock: isOpen ? 10 : 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? -1 : i))}
                  aria-expanded={isOpen}
                  aria-controls={`${base}-${i}`}
                  className="split-head"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="split-icon">
                      <Ico k={item.k} size={18} />
                    </span>
                    {item.q}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring} className="flex-none text-faint">
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <motion.div
                  id={`${base}-${i}`}
                  role="region"
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={spring}
                  className="overflow-hidden"
                >
                  <div>
                    <p className="max-w-[62ch] px-5 pb-5 pl-[62px] leading-relaxed text-muted max-[480px]:pl-5">{item.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </LayoutGroup>
  )
}
