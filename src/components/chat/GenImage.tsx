import { useId, useMemo } from 'react'

/** Deterministic "generated" landscape (sample output for image prompts). */
function scene(prompt: string) {
  let seed = 7
  for (let i = 0; i < prompt.length; i++) seed = (33 * seed + prompt.charCodeAt(i)) >>> 0
  const rnd = () => (seed = (1664525 * seed + 0x3c6ef35f) >>> 0) / 0x100000000
  const ridge = (base: number, amp: number, step: number) => {
    const p1 = 6 * rnd()
    const p2 = 6 * rnd()
    const pts: [number, number][] = []
    for (let x = -40; x <= 680; x += step) {
      const y = 252 - base - amp * (0.6 * Math.sin(x / 170 + p1) + 0.3 * Math.sin(x / 61 + p2) + 0.25 * (rnd() - 0.5))
      pts.push([x, Math.min(252, y)])
    }
    let d = `M-40,252L${pts[0][0]},${pts[0][1].toFixed(1)}`
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2
      const my = (pts[i][1] + pts[i + 1][1]) / 2
      d += `Q${pts[i][0]},${pts[i][1].toFixed(1)} ${mx},${my.toFixed(1)}`
    }
    return `${d}L680,252Z`
  }
  return {
    sun: { cx: Math.round(170 + 300 * rnd()), cy: Math.round(72 + 30 * rnd()) },
    far: ridge(118, 46, 36),
    mid: ridge(74, 30, 30),
    near: ridge(36, 18, 26),
  }
}

export function SampleLandscape({ prompt }: { prompt: string }) {
  const s = useMemo(() => scene(prompt), [prompt])
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const u = (n: string) => `url(#${n}${id})`
  const ridges = (
    <>
      <path d={s.far} fill={u('far')} />
      <path d={s.mid} fill={u('mid')} />
      <path d={s.near} fill={u('near')} />
    </>
  )
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Sample image" className="block w-full">
      <defs>
        <linearGradient id={`sky${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d5d3e7" />
          <stop offset="0.5" stopColor="#e9e6ef" />
          <stop offset="1" stopColor="#f7e8cc" />
        </linearGradient>
        <radialGradient id={`glow${id}`}>
          <stop offset="0" stopColor="#fdebc4" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#f8e3b8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f8e3b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`far${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b1adcd" />
          <stop offset="1" stopColor="#d2d0e3" />
        </linearGradient>
        <linearGradient id={`mid${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8981ac" />
          <stop offset="1" stopColor="#adaeca" />
        </linearGradient>
        <linearGradient id={`near${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#504b7e" />
          <stop offset="1" stopColor="#6a6595" />
        </linearGradient>
        <linearGradient id={`water${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ced0e4" />
          <stop offset="1" stopColor="#908ab3" />
        </linearGradient>
        <linearGradient id={`mist${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`shade${id}`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.6" stopColor="#1f1b2e" stopOpacity="0" />
          <stop offset="1" stopColor="#1f1b2e" stopOpacity="0.18" />
        </radialGradient>
        <clipPath id={`below${id}`}>
          <rect y={252} width="640" height={148} />
        </clipPath>
        <filter id={`soft${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <rect width="640" height="400" fill={u('sky')} />
      <circle cx={s.sun.cx} cy={s.sun.cy} r="150" fill={u('glow')} />
      <circle cx={s.sun.cx} cy={s.sun.cy} r="30" fill="#fae4b2" />
      {ridges}
      <rect y={252} width="640" height={148} fill={u('water')} />
      <g clipPath={u('below')}>
        <g transform="translate(0 504) scale(1 -1)" opacity="0.38" filter={u('soft')}>
          <circle cx={s.sun.cx} cy={s.sun.cy} r="34" fill="#fbe8bf" />
          {ridges}
        </g>
      </g>
      {[16, 34, 58, 86].map((dy, i) => (
        <rect key={dy} x={s.sun.cx - 46 + 9 * i} y={252 + dy} width={92 - 18 * i} height="1.6" rx="0.8" fill="#fff" opacity={0.55 - 0.1 * i} />
      ))}
      <rect y={206} width="640" height="70" fill={u('mist')} />
      <rect width="640" height="400" fill={u('shade')} />
    </svg>
  )
}

export function GenImage({ prompt, className = '' }: { prompt: string; className?: string }) {
  return (
    <figure className={`gen-image ${className}`}>
      <SampleLandscape prompt={prompt} />
      <figcaption>Sample · 1024 × 1024</figcaption>
    </figure>
  )
}

export const IMAGE_PROMPT = /^(please\s+)?(create|make|draw|generate|paint|design)\s+(me\s+)?(an?\s+)?(image|picture|photo|illustration|drawing|poster|logo|wallpaper)/i

/** Renders plain text with paragraphs, line breaks and **bold**. */
export function RichText({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-3 [overflow-wrap:anywhere]">
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {line.split(/(\*\*[^*]+\*\*)/g).map((part, k) =>
                part.startsWith('**') && part.endsWith('**') && part.length > 4 ? <strong key={k}>{part.slice(2, -2)}</strong> : <span key={k}>{part}</span>,
              )}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
