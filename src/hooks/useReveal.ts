import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll reveal for static markup: every element with [data-reveal] fades up
 * (opacity 0 → 1, translateY 14px → 0, 0.55s, ease [.22,.8,.24,1]) once 20% is in view.
 * Siblings that reveal together are staggered by 70ms, like the reference's Stagger.
 */
export function useReveal(deps: unknown[] = []) {
  const { pathname } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    for (const el of els) {
      const parent = el.parentElement
      if (!parent) continue
      const siblings = Array.from(parent.children).filter((c) => c.hasAttribute('data-reveal'))
      if (siblings.length > 1) el.style.transitionDelay = `${siblings.indexOf(el) * 0.07}s`
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const bigEnough = e.intersectionRect.height >= window.innerHeight * 0.35
          if (e.isIntersecting && (e.intersectionRatio >= 0.2 || bigEnough)) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.4, 0.6] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ...deps])
}
