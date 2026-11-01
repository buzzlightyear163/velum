import { MessageSquare, Ticket, Wallet } from 'lucide-react'

const STEPS = [
  { Icon: MessageSquare, title: 'Open it from the chat', text: 'Top up in the chat opens the payment for the chat in this browser.' },
  { Icon: Wallet, title: 'Pay from your wallet', text: 'Send USDC on Solana from Phantom, Solflare or Backpack. No card, no billing address.' },
  { Icon: Ticket, title: 'Credit lands as private vouchers', text: 'Your browser turns the payment into vouchers, one for each $1, so a payment never links to your chats.' },
]

export function TopupSteps({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`folder tone-paper lined mt-0 flex flex-col gap-5 ${compact ? 'p-5' : 'p-8 max-[480px]:p-6'}`}>
      <span className="folder-tab">How a top-up works</span>
      <ol className="flex flex-col gap-2.5">
        {STEPS.map(({ Icon, title, text }, i) => (
          <li key={title} className="flex gap-4 rounded-[18px] bg-bg p-4">
            <span className={`grid h-11 w-11 flex-none place-items-center rounded-[14px] ${i === 2 ? 'bg-accent text-white' : 'bg-surface text-accent'}`}>
              <Icon size={18} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="label">Step {i + 1}</span>
              <b className="text-[16px] font-semibold">{title}</b>
              <span className="text-sm text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
