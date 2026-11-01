import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { SITE, STORAGE } from '../../lib/site'

const ROLES = ['Founder or operator', 'Creator or marketer', 'Student', 'Legal or finance', 'Crypto team or trader', 'Developer', 'Something else']
const USES = ['Chat', 'Create', 'Agents', 'Onchain', 'API']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const lab = 'text-[13px] font-medium text-faint'

/**
 * Early-access request. TODO(backend): POST the form to your waitlist (e.g. VITE_ACCESS_API).
 * Without a backend it shows the confirmation state locally.
 */
export function AccessForm() {
  const [error, setError] = useState('')
  const [sentTo, setSentTo] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE.accessEmail)
      if (saved && emailRef.current && !emailRef.current.value) emailRef.current.value = saved
      sessionStorage.removeItem(STORAGE.accessEmail)
    } catch {
      /* ignore */
    }
  }, [])

  if (sentTo) {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-accent text-white">
          <Check size={26} />
        </span>
        <h2 className="font-display text-[34px] font-extrabold leading-none tracking-[-0.03em]">You’re on the list.</h2>
        <p className="text-muted">We’ll send your invite to {sentTo}. (Preview: nothing was sent.)</p>
      </div>
    )
  }

  return (
    <form
      noValidate
      className="grid grid-cols-2 gap-[18px] max-[600px]:grid-cols-1"
      onSubmit={async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const email = String(data.get('email') ?? '').trim()
        if (!EMAIL.test(email)) {
          setError('Enter an email like you@company.com.')
          emailRef.current?.focus()
          return
        }
        const api = (import.meta.env.VITE_ACCESS_API as string | undefined)?.trim()
        if (api) {
          try {
            await fetch(api, { method: 'POST', body: data })
          } catch {
            /* still show the confirmation; the request is best-effort */
          }
        }
        setSentTo(email)
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={lab}>
          Name
        </label>
        <input id="name" name="name" className="input" autoComplete="name" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={lab}>
          Email
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          className="input"
          autoComplete="email"
          aria-describedby="email-error"
          aria-invalid={error ? true : undefined}
          onChange={() => error && setError('')}
        />
        <span id="email-error" className="text-[13px] text-bad">
          {error}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className={lab}>
          Company or project (optional)
        </label>
        <input id="company" name="company" className="input" autoComplete="organization" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="role" className={lab}>
          You are mostly a…
        </label>
        <select id="role" name="role" className="input" defaultValue="">
          <option value="">Choose one</option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <fieldset className="col-span-full flex flex-col gap-2">
        <legend className={`${lab} mb-2`}>What will you use</legend>
        <div className="flex flex-wrap gap-2.5">
          {USES.map((u, i) => (
            <label
              key={u}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm text-muted transition has-[:checked]:border-accent has-[:checked]:bg-mist has-[:checked]:text-fg"
            >
              <input type="checkbox" name="uses" value={u} className="h-4 w-4 accent-[var(--accent)]" defaultChecked={i === 0} />
              {u}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="col-span-full flex flex-col gap-2">
        <label htmlFor="notes" className={lab}>
          Anything else?
        </label>
        <textarea id="notes" name="notes" className="input min-h-[110px] resize-y" placeholder={`What you’d like to do with ${SITE.name}`} />
      </div>
      <div className="col-span-full">
        <button className="btn btn-ink" type="submit">
          Request invite <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  )
}
