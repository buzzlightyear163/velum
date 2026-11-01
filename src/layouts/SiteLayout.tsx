import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnnounceBar } from './AnnounceBar'
import { SiteHeader } from './SiteHeader'
import { Footer } from './Footer'
import { useReveal } from '../hooks/useReveal'

const TITLES: Record<string, string> = {
  '/': 'Velum · Ask anything. Keep it private.',
  '/agents': 'Agents · Velum',
  '/onchain': 'Onchain · Velum',
  '/guides': 'Guides · Velum',
  '/pricing': 'Pricing · Velum',
  '/topup': 'Top up credit · Velum',
  '/developers': 'Developers · Velum',
  '/access': 'Early access · Velum',
}

/** Scrolls to #hash targets after navigation, otherwise to the top. */
export function useScrollRestore() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Velum'
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const tick = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else if (tries++ < 20) setTimeout(tick, 50)
      }
      tick()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
}

export function SiteLayout() {
  useScrollRestore()
  useReveal()
  return (
    <>
      <AnnounceBar />
      <SiteHeader />
      <Outlet />
      <Footer />
    </>
  )
}
