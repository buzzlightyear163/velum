import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SITE, STORAGE } from '../../lib/site'

type InjectedProvider = {
  isPhantom?: boolean
  isSolflare?: boolean
  isBackpack?: boolean
  publicKey?: { toString(): string } | null
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString(): string } } | void>
  disconnect?: () => Promise<void>
  signMessage?: (msg: Uint8Array, enc?: string) => Promise<unknown>
}

export type DetectedWallet = { name: 'Phantom' | 'Solflare' | 'Backpack'; provider: InjectedProvider; color: string }

export type WalletSession = {
  address: string
  wallet: string
  /** Token balance, null when it could not be read. */
  balance: number | null
  holder: boolean
}

type Ctx = {
  session: WalletSession | null
  working: boolean
  error: string | null
  wallets: DetectedWallet[]
  signIn: (name: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const WalletCtx = createContext<Ctx | null>(null)

function detectWallets(): DetectedWallet[] {
  if (typeof window === 'undefined') return []
  const w = window as unknown as Record<string, any>
  const found: DetectedWallet[] = []
  const phantom = w.phantom?.solana ?? (w.solana?.isPhantom ? w.solana : null)
  if (phantom) found.push({ name: 'Phantom', provider: phantom, color: '#ab9ff2' })
  if (w.solflare?.isSolflare) found.push({ name: 'Solflare', provider: w.solflare, color: '#fc7227' })
  const backpack = w.backpack?.solana ?? w.backpack ?? null
  if (backpack?.connect) found.push({ name: 'Backpack', provider: backpack, color: '#e33e3f' })
  return found
}

const HOLD_MIN = Number(import.meta.env.VITE_HOLD_MIN ?? 0) || 0
const RPC = (import.meta.env.VITE_SOLANA_RPC as string | undefined) || 'https://api.mainnet-beta.solana.com'

/** Read-only SPL balance of the project mint for an owner. TODO(backend): proxy through your own RPC. */
async function readBalance(owner: string): Promise<number | null> {
  if (!SITE.ca) return null
  try {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [owner, { mint: SITE.ca }, { encoding: 'jsonParsed' }],
      }),
    })
    const json = await res.json()
    const accounts = json?.result?.value ?? []
    return accounts.reduce(
      (sum: number, a: any) => sum + (a?.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0),
      0,
    )
  } catch {
    return null
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<WalletSession | null>(null)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wallets, setWallets] = useState<DetectedWallet[]>([])

  useEffect(() => {
    // Wallet extensions inject a little after load.
    const scan = () => setWallets(detectWallets())
    scan()
    const t = setTimeout(scan, 600)
    try {
      const saved = localStorage.getItem(STORAGE.wallet)
      if (saved) setSession(JSON.parse(saved))
    } catch {
      /* storage unavailable */
    }
    return () => clearTimeout(t)
  }, [])

  const signIn = useCallback(async (name: string) => {
    const w = detectWallets().find((x) => x.name === name)
    if (!w) return setError(`${name} isn’t available in this browser.`)
    setWorking(true)
    setError(null)
    try {
      const res = await w.provider.connect()
      const address = (res && 'publicKey' in res ? res.publicKey : w.provider.publicKey)?.toString()
      if (!address) throw new Error('No address')
      // Sign-in with Solana: one message, no transaction, no fee.
      // TODO(backend): send the signature to your server and verify it there.
      if (w.provider.signMessage) {
        const msg = new TextEncoder().encode(
          `${SITE.domain} wants you to sign in with your Solana account:\n${address}\n\nNonce: ${Math.random().toString(36).slice(2)}\nIssued At: ${new Date().toISOString()}`,
        )
        await w.provider.signMessage(msg, 'utf8')
      }
      const balance = await readBalance(address)
      const next: WalletSession = {
        address,
        wallet: w.name,
        balance,
        holder: balance !== null && HOLD_MIN > 0 && balance >= HOLD_MIN,
      }
      setSession(next)
      try {
        localStorage.setItem(STORAGE.wallet, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      setError(/reject|denied|cancel/i.test(msg) ? 'You cancelled the request in your wallet.' : 'Couldn’t connect. Try again.')
    } finally {
      setWorking(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    const w = detectWallets().find((x) => x.name === session?.wallet)
    try {
      await w?.provider.disconnect?.()
    } catch {
      /* ignore */
    }
    setSession(null)
    try {
      localStorage.removeItem(STORAGE.wallet)
    } catch {
      /* ignore */
    }
  }, [session?.wallet])

  const value = useMemo(
    () => ({ session, working, error, wallets, signIn, signOut, clearError: () => setError(null) }),
    [session, working, error, wallets, signIn, signOut],
  )
  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletCtx)
  if (!ctx) throw new Error('useWallet must be used inside <WalletProvider>')
  return ctx
}
