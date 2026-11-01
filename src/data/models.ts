import { HOLD, SITE } from '../lib/site'

export type ModeKey = 'sealed' | 'ephemeral' | 'open'

export type Model = {
  name: string
  logo?: string
  maker: string
  note: string
  modes: ModeKey[]
  free?: boolean
}

const every: ModeKey[] = ['sealed', 'ephemeral', 'open']
const openOnly: ModeKey[] = ['open']

export const MODEL_KINDS: { id: string; label: string; models: Model[] }[] = [
  {
    id: 'chat',
    label: 'Chat',
    models: [
      { name: 'Auto', maker: SITE.name, note: 'Picks the right model for each question', modes: every, free: true },
      { name: 'Llama', logo: 'meta-color', maker: 'Meta', note: 'Everyday chat and writing', modes: every },
      { name: 'DeepSeek', logo: 'deepseek-color', maker: 'DeepSeek', note: 'Reasoning, maths and code', modes: every },
      { name: 'Qwen', logo: 'qwen-color', maker: 'Alibaba', note: 'Many languages, long documents', modes: every },
      { name: 'Kimi', logo: 'kimi-color', maker: 'Moonshot AI', note: 'Agents and tool use', modes: every },
      { name: 'gpt-oss', logo: 'openai', maker: 'OpenAI', note: 'Open-weight reasoning', modes: every },
      { name: 'GPT', logo: 'openai', maker: 'OpenAI', note: 'Hosted by OpenAI', modes: openOnly },
      { name: 'Claude', logo: 'claude-color', maker: 'Anthropic', note: 'Hosted by Anthropic', modes: openOnly },
      { name: 'Gemini', logo: 'gemini-color', maker: 'Google', note: 'Hosted by Google', modes: openOnly },
    ],
  },
  {
    id: 'image',
    label: 'Image',
    models: [
      { name: 'FLUX', logo: 'flux', maker: 'Black Forest Labs', note: 'Photoreal and illustration', modes: every },
      { name: 'Stable Diffusion', logo: 'stability-color', maker: 'Stability AI', note: 'Styles, edits and inpainting', modes: every },
      { name: 'Imagen', logo: 'google-color', maker: 'Google', note: 'Hosted by Google', modes: openOnly },
      { name: 'GPT Image', logo: 'openai', maker: 'OpenAI', note: 'Hosted by OpenAI', modes: openOnly },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    models: [
      { name: 'Wan', logo: 'alibaba-color', maker: 'Alibaba', note: 'Short clips from text or a photo', modes: every },
      { name: 'Veo', logo: 'google-color', maker: 'Google', note: 'Hosted by Google', modes: openOnly },
      { name: 'Kling', logo: 'kling-color', maker: 'Kuaishou', note: 'Hosted by Kuaishou', modes: openOnly },
    ],
  },
  {
    id: 'voice',
    label: 'Voice',
    models: [
      { name: 'Whisper', logo: 'openai', maker: 'OpenAI', note: 'Speech to text, open weights', modes: every },
      { name: 'Fish Speech', logo: 'fishaudio', maker: 'Fish Audio', note: 'Natural voiceovers, open weights', modes: every },
      { name: 'ElevenLabs', logo: 'elevenlabs', maker: 'ElevenLabs', note: 'Hosted by ElevenLabs', modes: openOnly },
    ],
  },
]

export const CHAT_MODELS = MODEL_KINDS[0].models

export type Mode = {
  key: ModeKey
  label: string
  short: string
  hero: string
  desc: string
  fit: string
}

export const MODES: Mode[] = [
  {
    key: 'sealed',
    label: 'Sealed',
    short: 'End-to-end, attested enclave',
    hero: 'Your chat is encrypted on your device and opened only inside a verified enclave. The answer comes back to you alone.',
    desc: `Your prompt and files are encrypted on your device to an attested enclave, and only you can decrypt the answer. ${SITE.name} runs the hardware but cannot read what passes through it.`,
    fit: 'Best for contracts, financials, strategies and anything sensitive.',
  },
  {
    key: 'ephemeral',
    label: 'Ephemeral',
    short: 'Processed in memory, never stored',
    hero: 'Processed in memory and wiped the moment your answer arrives. Nothing is stored, logged or used for training.',
    desc: 'Requests are processed in memory and discarded as soon as the answer is sent. Nothing is stored or used for analytics.',
    fit: 'Best for everyday work where speed matters and nothing should be kept.',
  },
  {
    key: 'open',
    label: 'Open',
    short: 'Widest model choice, lowest cost',
    hero: 'The widest choice of models for public, everyday questions. Standard logs apply.',
    desc: 'Gives you the widest choice of hosted models. The provider reads the request to answer it and logs may be kept for a limited time.',
    fit: 'Best for public information and casual questions.',
  },
]

export const modeOf = (k: ModeKey) => MODES.find((m) => m.key === k)!

/** Privacy receipt lines shown under each answer. */
export const RECEIPTS: Record<ModeKey, { text: string; ok: boolean }[]> = {
  sealed: [
    { text: `Not stored by ${SITE.name}`, ok: true },
    { text: 'Private provider, never trained on', ok: true },
    { text: 'Enclave coming soon', ok: false },
  ],
  ephemeral: [
    { text: `Not stored by ${SITE.name}`, ok: true },
    { text: 'Not saved in this browser', ok: true },
    { text: 'Never trained on', ok: true },
  ],
  open: [
    { text: 'The model host reads it', ok: false },
    { text: 'Host may keep logs', ok: false },
    { text: `Not stored by ${SITE.name}`, ok: true },
  ],
}

export const HOLD_TEXT = HOLD
