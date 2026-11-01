import { Link } from 'react-router-dom'
import { Ico } from '../components/Ico'
import { L } from '../components/L'

export default function Pricing() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <L n="coins" />
              Pricing
            </span>
            <h1>
              {"Start free. "}
              <em>
                Hold to unlock every model.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Everyone gets Auto for free. Hold [N] $VELUM to pick any model and pay only for what you use. Every plan is private, and nothing you send is used for training.
            </p>
          </div>
        </div>
      </section>
      <div className="wrap mt-20 grid grid-cols-2 items-stretch gap-5 max-[860px]:grid-cols-1 max-[860px]:gap-14" data-reveal="">
        <div className="folder tone-paper lined mt-0 flex flex-col gap-8 p-10 max-[480px]:p-7">
          <span className="folder-tab">
            Free
          </span>
          <div className="flex flex-col gap-2">
            <div className="font-display text-[88px] font-extrabold leading-[0.9] tracking-[-0.05em]">
              $0
            </div>
            <p className="text-muted">
              Forever. Auto only, no token or account needed.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-[16px]">
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-mist text-accent">
                <L n="check" size={14} />
              </span>
              Auto, which answers with a light open model
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-mist text-accent">
                <L n="check" size={14} />
              </span>
              [N] chats a day
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-mist text-accent">
                <L n="check" size={14} />
              </span>
              [N] images a day
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-mist text-accent">
                <L n="check" size={14} />
              </span>
              Sealed mode included
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-mist text-accent">
                <L n="check" size={14} />
              </span>
              No account, no token, no ads
            </li>
          </ul>
          <Link className="btn mt-auto self-start" to="/chat">
            {"Try it free "}
            <L n="arrow-up-right" size={16} />
          </Link>
        </div>
        <div className="folder tone-night mt-0 grid grid-cols-[minmax(0,1fr)_150px] max-[560px]:grid-cols-1">
          <span className="folder-tab">
            Holders
          </span>
          <div className="flex flex-col gap-8 p-10 max-[480px]:p-7">
            <div className="flex flex-col gap-2">
              <div className="font-display text-[clamp(52px,6vw,80px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
                Every
                <br />
                model
              </div>
              <p className="text-night-muted">
                Hold [N] $VELUM, then pay as you go.
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-[16px]">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-night-2 text-pale">
                  <L n="check" size={14} />
                </span>
                Hold [N] $VELUM in your wallet to unlock every model
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-night-2 text-pale">
                  <L n="check" size={14} />
                </span>
                Pick any model, in every mode it runs in
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-night-2 text-pale">
                  <L n="check" size={14} />
                </span>
                Pay per use with credit: top-ups of $1 to $200 in USDC on Solana
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-[8px] bg-night-2 text-pale">
                  <L n="check" size={14} />
                </span>
                Paid with private vouchers that never link to your chats
              </li>
            </ul>
            <Link className="btn mt-auto self-start border-pale !bg-none bg-pale text-night hover:border-white hover:bg-white" to="/topup">
              {"Top up credit "}
              <L n="arrow-up-right" size={16} />
            </Link>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-3 border-l-2 border-dashed border-white/15 p-6 text-center max-[560px]:border-l-0 max-[560px]:border-t-2">
            <L n="ticket" size={28} className="text-pale" />
            <span className="font-display text-[44px] font-extrabold leading-none">
              $1
            </span>
            <span className="label !text-night-muted">
              = 1 private voucher
            </span>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Per use
            </span>
            <h2>
              {"Clear prices, "}
              <em>
                per use.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              For holders, paid from credit. Prices are the same in every privacy mode; Auto stays free up to [N] chats a day.
            </p>
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-2.5 max-[760px]:grid-cols-1">
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={42} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Chat · Fast
              </b>
              <span className="text-sm text-muted">
                Quick answers and everyday questions
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per 1M tokens
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per 1M tokens
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={43} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Chat · Auto
              </b>
              <span className="text-sm text-muted">
                Picks the right model for each question
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per 1M tokens
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per 1M tokens
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={44} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Chat · Reasoning
              </b>
              <span className="text-sm text-muted">
                Hard problems, analysis and code
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per 1M tokens
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per 1M tokens
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={4} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Image
              </b>
              <span className="text-sm text-muted">
                One image, 1024 × 1024
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per image
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per image
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={45} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Video
              </b>
              <span className="text-sm text-muted">
                Short clip
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per second
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per second
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5" data-reveal="">
            <span className="tactile-icon">
              <Ico k={12} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Voice
              </b>
              <span className="text-sm text-muted">
                Voiceover or speech
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per minute
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per minute
            </span>
          </li>
          <li className="flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5 col-span-full max-[760px]:col-span-1" data-reveal="">
            <span className="tactile-icon">
              <Ico k={46} w={20} h={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <b className="text-[16px] font-semibold">
                Onchain lookup
              </b>
              <span className="text-sm text-muted">
                Wallet, token, program or transaction
              </span>
              <span className="mt-1 hidden font-mono text-[12px] text-fg max-[480px]:block">
                [PRICE] per lookup
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-bg px-3 py-1.5 font-mono text-[12px] tabular-nums max-[480px]:hidden">
              [PRICE] per lookup
            </span>
          </li>
        </ul>
      </section>
      <section className="section">
        <div className="folder tone-sage flex flex-wrap items-center justify-between gap-6 p-10 max-[480px]:p-7" data-reveal="">
          <span className="folder-tab">
            Teams and API
          </span>
          <div className="flex max-w-[56ch] flex-col gap-2">
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-extrabold leading-none tracking-[-0.03em]">
              Bring your whole team.
            </h2>
            <p className="text-[#d4d2e6]">
              Shared credit, API keys, MCP tools and dedicated enclaves for companies and builders.
            </p>
          </div>
          <Link className="btn btn-ink" to="/access">
            {"Talk to us "}
            <L n="arrow-up-right" size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
