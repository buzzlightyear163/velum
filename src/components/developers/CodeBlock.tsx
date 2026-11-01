import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { SlideTrack } from '../SlideTrack'

type Tab = { label: string; code: string }

const SNIPPETS: Record<string, Tab[]> = {
  quickstart: [
    {
      label: 'TypeScript',
      code: `npm install @velum/sdk

import { Velum } from "@velum/sdk";

const velum = new Velum({
  apiKey: process.env.VELUM_KEY,
  mode: "sealed",
});

const reply = await velum.chat({
  model: "auto",
  messages: [{ role: "user", content: "Summarize this report" }],
});

console.log(reply.text);`,
    },
    {
      label: 'Python',
      code: `pip install velum

import os
from velum import Velum

velum = Velum(
    api_key=os.environ["VELUM_KEY"],
    mode="sealed",
)

reply = velum.chat(
    model="auto",
    messages=[{"role": "user", "content": "Summarize this report"}],
)

print(reply.text)`,
    },
  ],
  images: [
    {
      label: 'TypeScript',
      code: `const image = await velum.images.create({
  prompt: "A quiet mountain lake at sunrise, soft violet tones",
  size: "1024x1024",
});

await image.save("lake.png");`,
    },
    {
      label: 'Python',
      code: `image = velum.images.create(
    prompt="A quiet mountain lake at sunrise, soft violet tones",
    size="1024x1024",
)

image.save("lake.png")`,
    },
  ],
  mcp: [
    {
      label: 'mcp.json',
      code: `{
  "mcpServers": {
    "velum": {
      "command": "npx",
      "args": ["@velum/mcp"],
      "env": {
        "VELUM_KEY": "your-key",
        "VELUM_MODE": "sealed"
      }
    }
  }
}`,
    },
  ],
}

function Letters({ text }: { text: string }) {
  return (
    <span className="flex">
      <AnimatePresence mode="popLayout" initial={false}>
        {text.split('').map((ch, i) => (
          <motion.span
            key={text + i}
            layout
            initial={{ opacity: 0, y: 5, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.03 * i } }}
            exit={{ opacity: 0, y: -5, scale: 0.7 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}

function CopyButton({ label, onClick }: { label: string; onClick: () => void }) {
  const done = label !== 'Copy'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      animate={{ backgroundColor: done ? '#514376' : 'rgba(255,255,255,0.08)' }}
      className="inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-3.5 text-[13px] font-medium text-code-fg"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? 'done' : 'copy'}
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.25 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        >
          {done ? <Check size={14} /> : <Copy size={14} />}
        </motion.span>
      </AnimatePresence>
      <Letters text={label} />
    </motion.button>
  )
}

/** Dark code panel with language tabs and an animated copy button. */
export function CodeBlock({ id }: { id: keyof typeof SNIPPETS | string }) {
  const tabs = SNIPPETS[id] ?? SNIPPETS.quickstart
  const [at, setAt] = useState(0)
  const [label, setLabel] = useState('Copy')
  const pre = useRef<HTMLPreElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const flash = (l: string) => {
    setLabel(l)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLabel('Copy'), 1600)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[at].code)
      flash('Copied')
    } catch {
      if (!pre.current) return
      const range = document.createRange()
      range.selectNodeContents(pre.current)
      const sel = getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
      flash('Selected')
    }
  }

  return (
    <div className="lift mt-8 min-w-0 overflow-hidden rounded-[22px] bg-code-bg">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 p-2.5">
        {tabs.length > 1 ? (
          <SlideTrack
            tone="dark"
            size="sm"
            label="Language"
            value={tabs[at].label}
            onChange={(l) => setAt(tabs.findIndex((t) => t.label === l))}
            items={tabs.map((t) => ({ id: t.label, label: t.label }))}
          />
        ) : (
          <span className="px-2 text-[13px] font-medium text-[#9e99b6]">{tabs[0].label}</span>
        )}
        <CopyButton label={label} onClick={copy} />
      </div>
      <pre ref={pre} className="m-0 overflow-x-auto p-6 font-mono text-[13px] leading-[1.7] text-code-fg">
        <code>{tabs[at].code}</code>
      </pre>
    </div>
  )
}
