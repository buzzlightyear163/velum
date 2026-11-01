import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SITE } from '../lib/site'

/** Contract-address pill. Shows "Announced at launch" until VITE_CA is set, then copies the mint. */
export function CaButton({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const [copied, setCopied] = useState(false)
  const ca = SITE.ca

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  if (!ca) {
    return (
      <span className={`ca-btn ${tone} soon ${className}`} title="The CA (mint address) will be posted here at launch">
        <b>CA</b> Announced at launch
      </span>
    )
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ca)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = ca
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
  }

  return (
    <button type="button" className={`ca-btn ${tone} ${className}`} onClick={copy} aria-label={`Copy CA (mint address) ${ca}`} title={ca}>
      <b>CA</b>
      <span className={copied ? '' : 'font-mono'} aria-live="polite">
        {copied ? 'Copied' : ca.length > 14 ? `${ca.slice(0, 6)}…${ca.slice(-4)}` : ca}
      </span>
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}
