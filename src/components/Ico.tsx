import type { CSSProperties } from 'react'
import { ICONS } from '../lib/icons'

const camel = (k: string) => k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())

type Props = {
  k: number
  w?: number | string
  h?: number | string
  size?: number | string
  className?: string
  style?: CSSProperties
}

/** Renders a duotone glyph from the icon registry. */
export function Ico({ k, w, h, size, className, style }: Props) {
  const def = ICONS[k]
  if (!def) return null
  const [viewBox, attrs, inner] = def
  const props: Record<string, string> = {}
  for (const [key, value] of Object.entries(attrs)) props[camel(key)] = value
  return (
    <svg
      {...props}
      viewBox={viewBox}
      width={w ?? size ?? 16}
      height={h ?? size ?? 16}
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}

/** Named glyphs used by hand-written components. */
export const GLYPH = {
  onchain: 1,
  token: 2,
  agent: 3,
  image: 4,
  lock: 5,
  timer: 6,
  noTrain: 7,
  chat: 8,
  globe: 9,
  watch: 10,
  program: 11,
  voice: 12,
  mcp: 13,
  code: 14,
  voucher: 15,
  brief: 16,
  wallet: 17,
  radar: 18,
  research: 19,
  free: 20,
  holder: 21,
  tag: 23,
  models: 32,
  crypto: 33,
  guides: 41,
  access: 43,
  home: 49,
} as const
