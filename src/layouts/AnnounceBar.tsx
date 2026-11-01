import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { SITE, STORAGE } from '../lib/site'

export function AnnounceBar() {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE.announceClosed)) setOpen(false)
    } catch {
      /* ignore */
    }
  }, [])
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="announce-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="announce-bar-row">
            <span className="announce-bar-badge">Wave 1</span>
            <p className="min-w-0 truncate">{SITE.name} opens in waves, and the first invites go out soon.</p>
            <Link to="/access" className="announce-bar-link group">
              Join the list <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              className="announce-bar-close"
              onClick={() => {
                setOpen(false)
                try {
                  sessionStorage.setItem(STORAGE.announceClosed, '1')
                } catch {
                  /* ignore */
                }
              }}
              aria-label="Close announcement"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
