import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Globe, LockKeyhole } from 'lucide-react'
import { SlideTrack } from '../SlideTrack'
import { Ico, GLYPH } from '../Ico'
import { Logo } from '../Logo'
import { FREE_LIMIT, HOLD } from '../../lib/site'
import { MODEL_KINDS } from '../../data/models'
import { fadeUp, stagger } from './Hero'

/** "Preview lineup" folder with Chat / Image / Video / Voice tabs. */
export function ModelsFolder() {
  const [kind, setKind] = useState(MODEL_KINDS[0].id)
  const current = MODEL_KINDS.find((k) => k.id === kind)!
  return (
    <div className="folder tone-paper lined models-folder">
      <span className="folder-tab">Preview lineup</span>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SlideTrack label="Kind of model" value={kind} onChange={setKind} items={MODEL_KINDS.map((k) => ({ id: k.id, label: k.label }))} />
      </div>
      <div className="tier-strip">
        <span>
          <Ico k={GLYPH.free} size={18} />
          <span>
            <b>Free</b> Auto only, {FREE_LIMIT}. No token needed.
          </span>
        </span>
        <span>
          <Ico k={GLYPH.holder} size={18} />
          <span>
            <b>Hold {HOLD}</b> to pick any model below.
          </span>
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul key={kind} className="model-grid" initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }} variants={stagger(0.04)}>
          {current.models.map((m) => {
            const every = m.modes.length === 3
            return (
              <motion.li key={m.name} className="model-card" variants={fadeUp}>
                <div className="model-top">
                  <span className="model-logo" aria-hidden="true">
                    {m.logo ? <img src={`/assets/models/${m.logo}.svg`} alt="" width={22} height={22} /> : <Logo size={26} className="flex-none" />}
                  </span>
                  {m.free ? (
                    <span className="tier-badge free model-tag">Free</span>
                  ) : (
                    <span className="model-lock model-tag" title={`Hold ${HOLD} to use`}>
                      <Ico k={GLYPH.holder} size={14} />
                      <span className="sr-only">For holders</span>
                    </span>
                  )}
                </div>
                <div className="model-text">
                  <b className="text-[16px] font-semibold">{m.name}</b>
                  <p className="mt-0.5 text-[14px] leading-snug text-muted">
                    {m.maker} · {m.note}
                  </p>
                </div>
                <p className={`model-where ${every ? 'every' : ''}`}>
                  {every ? <LockKeyhole size={13} /> : <Globe size={13} />}
                  {every ? 'Every mode, sealed too' : 'Open mode only'}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </AnimatePresence>
      <p className="mt-4 text-[13px] text-faint">
        Without the token you get Auto, which answers with a light open model. Holders choose any model and pay for use with credit. Open-weight models run inside the enclave, so
        they work in every mode; hosted models are only offered in Open mode. The launch lineup may still change.
      </p>
    </div>
  )
}
