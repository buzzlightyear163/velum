/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CA?: string
  readonly VITE_CHAT_API?: string
  readonly VITE_ACCESS_API?: string
  readonly VITE_SOLANA_RPC?: string
  readonly VITE_HOLD_MIN?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
