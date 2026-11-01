import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE, STORAGE } from '../../lib/site'

/** "Get your invite to wave 1" email capture → continues on /access. */
export function NewsletterFolder() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  return (
    <div className="folder tone-paper lined newsletter-folder">
      <span className="folder-tab">Wave 1</span>
      <div className="newsletter-grid" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[620px] flex-col items-center text-center">
        <span className="newsletter-badge">Early access</span>
        <h2 className="mt-4 font-display text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1] tracking-[-0.04em]">Get your invite to wave 1</h2>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted">
          Leave your email and finish a short form. We’ll send your invite, plus an API key if you build with {SITE.name}.
        </p>
        <form
          className="newsletter-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter a valid email address.')
            try {
              sessionStorage.setItem(STORAGE.accessEmail, email.trim())
            } catch {
              /* ignore */
            }
            navigate('/access')
          }}
        >
          <Mail size={19} className="flex-none text-faint" aria-hidden="true" />
          <label htmlFor="wave-email" className="sr-only">
            Email
          </label>
          <input
            id="wave-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'wave-error' : undefined}
          />
          <button type="submit" aria-label="Continue to early access">
            <ArrowUpRight size={20} />
          </button>
        </form>
        {error ? (
          <p id="wave-error" className="text-[14px] text-bad">
            {error}
          </p>
        ) : (
          <p className="text-[14px] text-faint">
            We only use it to send your invite.{' '}
            <Link to="/#sealed" className="font-medium text-fg underline-offset-4 hover:underline">
              See how Sealed works
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
