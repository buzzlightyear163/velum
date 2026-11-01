import type { ModeKey } from '../data/models'
import { SITE } from './site'

export type ChatTurn = { role: 'user' | 'assistant'; text: string }

type AskArgs = {
  history: ChatTurn[]
  tier: string
  mode: ModeKey
  onText: (sofar: string) => void
  signal?: AbortSignal
}

export type AskResult = { text: string; model?: string; error?: string }

const API = (import.meta.env.VITE_CHAT_API as string | undefined)?.trim()

/**
 * Sends the conversation to the chat backend and streams the reply.
 * TODO(backend): set VITE_CHAT_API to an endpoint that accepts
 * { messages, tier, mode } and streams plain text (header X-Model optional).
 * Without it, a local demo responder streams canned sample answers.
 */
export async function askModel({ history, tier, mode, onText, signal }: AskArgs): Promise<AskResult> {
  if (!API) return mockAnswer(history, tier, onText, signal)
  let res: Response
  try {
    res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, tier, mode }),
      signal,
    })
  } catch {
    return { text: '', error: `Couldn’t reach ${SITE.name}. Check your connection and try again.` }
  }
  if (!res.ok || !res.body) {
    const body = await res.json().catch(() => ({}) as { error?: string })
    return { text: '', error: (body as { error?: string }).error ?? 'Something went wrong. Try again.' }
  }
  const model = decodeURIComponent(res.headers.get('X-Model') ?? '') || undefined
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let text = ''
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      text += dec.decode(value, { stream: true })
      onText(text)
    }
  } catch {
    if (!text) return { text: '', model, error: 'The answer was interrupted. Try again.' }
  }
  return text.trim() ? { text, model } : { text: '', model, error: 'No answer came back. Try again.' }
}

const ANSWERS: [RegExp, string][] = [
  [
    /blood|test|doctor|lab/i,
    'Here’s the short version, in plain words.\n\nMost values sit inside the normal range. Two are worth raising: **ferritin is on the low side**, which can explain tiredness, and **LDL cholesterol is a little high**.\n\nQuestions to ask your doctor:\n• Should I recheck iron in a few months?\n• Is the LDL worth acting on, given my age and family history?\n\nThis is general information, not a diagnosis.',
  ],
  [
    /22k|salary|offer|raise|negotiat/i,
    'Anchor on the role, not on need. Something like:\n\n“I’m excited about the offer. Based on the scope we discussed and what similar roles pay, I was expecting a base closer to **22k higher**. Is there room to get there?”\n\nThen stop talking. If they can’t move base, ask about a signing bonus, an earlier review or extra equity. Offers are rarely withdrawn for a polite, specific ask.',
  ],
  [
    /trip|travel|new york|nyc|itinerar/i,
    '**Day 1 · Midtown and the park.** Walk the High Line, lunch at Chelsea Market, then Central Park at golden hour.\n\n**Day 2 · Museums and the Village.** The Met in the morning, pizza in the West Village, a comedy show at night.\n\n**Day 3 · Brooklyn.** Cross the bridge early, DUMBO for photos, Smorgasburg if it’s a weekend.\n\nBudget: a mid-range hotel near a subway line, a 7-day MetroCard alternative (tap with OMNY), and about $60–80 a day for food.',
  ],
  [
    /7xKp|wallet|did .* do/i,
    'This wallet belongs to a **market-making cluster of 12 addresses**. In the last 24 hours it pulled 38% of its liquidity from one Raydium pool and moved it into a stable pair.\n\nNothing points to a dump: the moves are spread out and match its usual pattern. **Risk: low.**\n\n(Sample answer: live onchain reads open with wave 1.)',
  ],
  [
    /token|pump|mint|safe to hold|rug/i,
    'Quick checks on that token:\n\n• **Mint authority:** revoked\n• **Freeze authority:** still on, which means the dev could freeze accounts\n• **Top 10 holders:** 41% of supply\n• **Liquidity:** $86K, not burned\n\nThe live freeze authority is the main flag. **Risk: medium.** Size small and watch the dev wallet.',
  ],
  [
    /every monday|brief me|agent|schedule/i,
    'Done. I’ll set up a **weekly market brief**:\n\n• Runs every Monday at 08:00\n• Reads around 40 sources, keeps only what’s sourced\n• Lands in your inbox as one page, sealed to you\n\nLive agents open with wave 1, so this one is saved as a draft until then.',
  ],
  [
    /vaccine|immune/i,
    'A vaccine is a **practice run** for your immune system.\n\nIt shows your body a harmless piece or copy of a germ. Your immune cells learn its shape and keep a memory of it. If the real germ shows up later, they recognise it fast and fight it before you get really sick.',
  ],
  [
    /investor|q3|board|reply|draft/i,
    'Hi Sam,\n\nThanks for checking in. We’re closing the books on Q3 this week and want the board to see the numbers first. I’ll send the full pack right after the meeting on the 14th, and I’m happy to walk you through it on a call.\n\nBest,\nAlex',
  ],
]

const FALLBACK =
  'Good question. Here’s a clear, short answer to get you started.\n\nI’m running as a **local demo** right now, so this reply is a sample. Connect a model backend (see TODO(backend) in the README) to get real answers, sealed to you.'

async function mockAnswer(history: ChatTurn[], tier: string, onText: (s: string) => void, signal?: AbortSignal): Promise<AskResult> {
  const last = [...history].reverse().find((t) => t.role === 'user')?.text ?? ''
  const answer = ANSWERS.find(([re]) => re.test(last))?.[1] ?? FALLBACK
  await wait(700, signal)
  const words = answer.split(/(\s+)/)
  let out = ''
  for (const w of words) {
    if (signal?.aborted) break
    out += w
    onText(out)
    if (w.trim()) await wait(18 + Math.random() * 26, signal)
  }
  return { text: out, model: tier === 'Auto' ? 'Auto · Llama' : tier }
}

function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(t)
      resolve()
    })
  })
}
