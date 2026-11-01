import { useId, type ComponentType } from 'react'
import { LayoutGroup, motion } from 'motion/react'

const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.9 } as const

export type SlideItem<T extends string> = {
  id: T
  label: string
  Icon?: ComponentType<{ size?: number }>
}

type Props<T extends string> = {
  items: SlideItem<T>[]
  value: T
  onChange: (v: T) => void
  label: string
  kind?: 'tab' | 'radio'
  size?: 'sm' | 'md'
  fill?: boolean
  tone?: 'light' | 'dark'
  className?: string
}

/** Segmented control with a sliding pill (tabs or radio group). */
export function SlideTrack<T extends string>({
  items,
  value,
  onChange,
  label,
  kind = 'tab',
  size = 'md',
  fill = false,
  tone = 'light',
  className = '',
}: Props<T>) {
  const id = useId()
  const sm = size === 'sm'
  return (
    <LayoutGroup id={id}>
      <div
        role={kind === 'tab' ? 'tablist' : 'radiogroup'}
        aria-label={label}
        className={`slide-track ${tone === 'dark' ? 'dark' : ''} ${fill ? 'grid grid-flow-col auto-cols-fr' : 'inline-flex'} ${className}`}
      >
        {items.map(({ id: itemId, label: itemLabel, Icon }) => {
          const on = itemId === value
          const aria = kind === 'tab' ? { 'aria-selected': on } : { 'aria-checked': on }
          return (
            <button
              key={itemId}
              type="button"
              role={kind}
              {...aria}
              onClick={() => onChange(itemId)}
              className={`slide-item ${sm ? 'sm' : ''}`}
            >
              {on && <motion.span layoutId="pill" transition={spring} className="slide-pill" />}
              <span className={`relative z-10 inline-flex items-center justify-center gap-1.5 ${on ? 'on' : ''}`}>
                {Icon && <Icon size={sm ? 12 : 14} />}
                {itemLabel}
              </span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
