/** Central brand config. Change these to rebrand the whole site. */
export const SITE = {
  name: 'Velum',
  wordmark: 'velum',
  ticker: '$VELUM',
  domain: 'velum.dev',
  xHandle: 'askvelum',
  xUrl: 'https://x.com/askvelum',
  githubUrl: 'https://github.com',
  tagline: 'Ask anything. Keep it private.',
  /** Mint address (CA). VITE_CA overrides it; empty shows "Announced at launch". */
  ca: (import.meta.env.VITE_CA || '8LGmkLJ4rPuEKrNMwKUd2LTrM1iesiQ8keLtaePNpump').trim() as string,
}

export const HOLD = `[N] ${SITE.ticker}`
export const FREE_LIMIT = '[N] chats a day'
export const MAX_TOPUP = 200
export const MIN_TOPUP = 1
export const TOPUP_PRESETS = [1, 5, 10, 25]

export const STORAGE = {
  announceClosed: 'velum.announce.closed',
  accessEmail: 'velum.access.email',
  handoff: 'velum.handoff.v1',
  chats: 'velum.chats.v1',
  credit: 'velum.credit.v1',
  wallet: 'velum.wallet.v1',
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const uid = () => Math.random().toString(36).slice(2, 10)

export const shortAddress = (a: string) => (a.length > 10 ? `${a.slice(0, 4)}…${a.slice(-4)}` : a)
