import { Link } from 'react-router-dom'
import { Ico } from '../components/Ico'
import { L } from '../components/L'
import { Logo } from '../components/Logo'
import { Hero } from '../components/home/Hero'
import { VideoTabs } from '../components/ProductVideo'
import { AgentDemo } from '../components/AgentDemo'
import { ModelsFolder } from '../components/home/ModelsFolder'
import { SealedFlow } from '../components/home/SealedFlow'
import { Faq } from '../components/home/Faq'
import { NewsletterFolder } from '../components/home/NewsletterFolder'

export default function Home() {
  return (
    <main className="pb-10">
      <Hero />
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              One workspace
            </span>
            <h2>
              {"Your AI, "}
              <em>
                wherever the work is.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Chat, create, hand work to agents and read the chain from one place, with the same privacy modes in every one of them.
            </p>
          </div>
        </div>
        <ul className="ability-cloud">
          <li className="ability" data-reveal="">
            <Ico k={5} w={16} h={16} />
            {" Sealed mode"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={6} w={16} h={16} />
            {" Ephemeral mode"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={7} w={16} h={16} />
            {" Never used for training"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={8} w={16} h={16} />
            {" Chat with any model"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={3} w={16} h={16} />
            {" Scheduled agents"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={9} w={16} h={16} />
            {" Web research"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={10} w={16} h={16} />
            {" Wallet watch"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={2} w={16} h={16} />
            {" Token checks"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={11} w={16} h={16} />
            {" Program reads"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={4} w={16} h={16} />
            {" Images and video"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={12} w={16} h={16} />
            {" Voice"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={13} w={16} h={16} />
            {" MCP tools"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={14} w={16} h={16} />
            {" API and SDKs"}
          </li>
          <li className="ability" data-reveal="">
            <Ico k={15} w={16} h={16} />
            {" Private vouchers"}
          </li>
        </ul>
      </section>
      <section id="watch" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Watch it work
            </span>
            <h2>
              {"Tutorials and how it works, "}
              <em>
                in under 20 seconds.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Short videos of a first chat, Sealed mode, agents, onchain lookups and top-ups. Every one uses sample data.
            </p>
            <Link className="btn btn-sm" to="/guides">
              {"All guides "}
              <L n="arrow-up-right" size={15} />
            </Link>
          </div>
        </div>
        <div data-reveal="">
          <VideoTabs />
        </div>
      </section>
      <section id="agents" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Agents
            </span>
            <h2>
              {"Hand off the busywork. "}
              <em>
                Keep the strategy.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Set an agent once and it researches, watches wallets and reports back on a schedule, sealed to you. Pick a template and preview a run.
            </p>
            <Link className="btn btn-sm" to="/agents">
              {"See every agent "}
              <L n="arrow-up-right" size={15} />
            </Link>
          </div>
        </div>
        <div className="mt-12" data-reveal="">
          <AgentDemo />
        </div>
      </section>
      <section id="models" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Models
            </span>
            <h2>
              {"The models you know, "}
              <em>
                kept private.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Pick a model yourself or let Auto choose. Open-weight models run sealed; the big hosted ones are there when you switch to Open.
            </p>
          </div>
        </div>
        <ModelsFolder />
      </section>
      <section className="section">
        <div data-reveal="">
          <div className="folder tone-paper lined mt-0">
            <span className="folder-tab">
              Velum in numbers
            </span>
            <ul className="ledger">
              <li className="ledger-cell" data-reveal="">
                <span className="ledger-key">
                  01
                  <span>
                    Privacy modes
                  </span>
                </span>
                <span className="ledger-num">
                  3
                </span>
                <div className="ledger-note">
                  <strong>
                    Sealed, Ephemeral, Open
                  </strong>
                  <p>
                    Pick per chat how much anyone else can see, from nobody at all to a standard provider.
                  </p>
                </div>
              </li>
              <li className="ledger-cell" data-reveal="">
                <span className="ledger-key">
                  02
                  <span>
                    Models
                  </span>
                </span>
                <span className="ledger-num">
                  19
                </span>
                <div className="ledger-note">
                  <strong>
                    In the preview lineup
                  </strong>
                  <p>
                    Chat, image, video and voice. Open-weight ones run sealed; hosted ones in Open mode.
                  </p>
                </div>
              </li>
              <li className="ledger-cell" data-reveal="">
                <span className="ledger-key">
                  03
                  <span>
                    Kept in Sealed
                  </span>
                </span>
                <span className="ledger-num">
                  0
                </span>
                <div className="ledger-note">
                  <strong>
                    Prompts and answers
                  </strong>
                  <p>
                    Encrypted on your device, opened only inside the enclave and by you. Nothing is stored.
                  </p>
                </div>
              </li>
              <li className="ledger-cell" data-reveal="">
                <span className="ledger-key">
                  04
                  <span>
                    Minimum top-up
                  </span>
                </span>
                <span className="ledger-num">
                  $1
                </span>
                <div className="ledger-note">
                  <strong>
                    USDC on Solana
                  </strong>
                  <p>
                    On Solana, settled in seconds for under a cent, then turned into private vouchers that never point back to your chats.
                  </p>
                </div>
              </li>
            </ul>
            <p className="ledger-foot">
              The model count follows the preview lineup and will change as models are confirmed.
            </p>
          </div>
        </div>
      </section>
      <section id="why" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Why private
            </span>
            <h2>
              {"Every prompt says "}
              <em>
                something about you.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Most AI apps keep what you ask, and some train on it. We don’t sell your prompts, we don’t train on them, and in Sealed mode we can’t read them at all.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined compare-folder" data-reveal="">
          <span className="folder-tab">
            Where your words go
          </span>
          <div className="compare" role="table" aria-label="A typical AI app compared with Velum in Sealed mode">
            <div className="compare-row head" role="row">
              <span className="label" role="columnheader">
                Where your words go
              </span>
              <span className="label" role="columnheader">
                A typical AI app
              </span>
              <span className="label !text-pale" role="columnheader">
                Velum · Sealed
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Who can read your prompt
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" The company and its reviewers"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Only you and the enclave"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                How long it’s kept
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Often until you delete it"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Not kept at all"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Used to train models
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Often, unless you opt out"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Never"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Linked to who you are
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Your email and your card"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" No account, paid with vouchers"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                What you get back
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" An answer"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" An answer and a privacy receipt"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="workspace" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Inside the workspace
            </span>
            <h2>
              {"Everything you’d ask an AI, "}
              <em>
                kept private.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Chat, images, agents and onchain answers in one place, with the same privacy modes in every one of them.
            </p>
          </div>
        </div>
        <span id="chat" />
        <ul className="bento">
          <li className="bento-card tone-night wide" data-reveal="">
            <div className="flex flex-col gap-3.5">
              <span className="label">
                Chat
              </span>
              <h3>
                Ask anything, any model.
              </h3>
              <p>
                Quick facts to deep research. Auto picks the right model.
              </p>
            </div>
            <div className="mock">
              <div className="mock-head">
                <span>
                  Auto · picked Reasoning
                </span>
                <b className="mock-tag light">
                  sealed
                </b>
              </div>
              <span className="mock-bubble">
                Explain my blood test in plain words. Anything to ask my doctor?
              </span>
              <div className="mock-row">
                <L n="paperclip" />
                {" bloodwork-june.pdf "}
                <span>
                  3 pages
                </span>
              </div>
              <div className="mock-row">
                <L n="search" />
                {" 6 medical sources checked "}
                <span>
                  web
                </span>
              </div>
              <div className="mock-row">
                <L n="check" className="ok" />
                {" Two values to raise, four look normal "}
                <span>
                  answer
                </span>
              </div>
            </div>
          </li>
          <li id="create" className="bento-card tone-pale" data-reveal="">
            <div className="flex flex-col gap-3.5">
              <span className="label">
                Create
              </span>
              <h3>
                A sentence becomes a picture.
              </h3>
              <p>
                Images, short clips, voiceovers and music.
              </p>
            </div>
            <div className="mock">
              <div className="mock-head">
                <span>
                  Create · 4 outputs
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex h-[74px] flex-col justify-between rounded-[12px] p-2.5" style={{background: "#b4b1cd", color: "#514376"}}>
                  <L n="image" size={16} />
                  <span className="text-[12px] font-medium text-fg/70">
                    Image
                  </span>
                </div>
                <div className="flex h-[74px] flex-col justify-between rounded-[12px] p-2.5" style={{background: "#e1e1ef", color: "#8f86b1"}}>
                  <L n="video" size={16} />
                  <span className="text-[12px] font-medium text-fg/70">
                    Clip · 6s
                  </span>
                </div>
                <div className="flex h-[74px] flex-col justify-between rounded-[12px] p-2.5" style={{background: "#c5c4dc", color: "#3a3354"}}>
                  <L n="mic" size={16} />
                  <span className="text-[12px] font-medium text-fg/70">
                    Voiceover
                  </span>
                </div>
                <div className="flex h-[74px] flex-col justify-between rounded-[12px] p-2.5" style={{background: "#eef1e6", color: "#7e74a4"}}>
                  <L n="sparkles" size={16} />
                  <span className="text-[12px] font-medium text-fg/70">
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li id="agents" className="bento-card tone-sage" data-reveal="">
            <div className="flex flex-col gap-3.5">
              <span className="label">
                Agents
              </span>
              <h3>
                Hand off the busywork.
              </h3>
              <p>
                Research, monitoring and reports that run privately too.
              </p>
            </div>
            <div className="mock">
              <div className="mock-head">
                <span>
                  Agent · running privately
                </span>
              </div>
              <div className="mock-row">
                <L n="calendar-clock" />
                {" Every Monday · 08:00 "}
                <span>
                  brief
                </span>
              </div>
              <div className="mock-row">
                <L n="check" className="ok" />
                {" 38 sources read "}
                <span>
                  2m 10s
                </span>
              </div>
              <div className="mock-row">
                <L n="bell" />
                {" Tell me when a rival ships "}
                <span>
                  watch
                </span>
              </div>
            </div>
          </li>
          <li className="bento-card tone-paper" data-reveal="">
            <div className="flex flex-col gap-3.5">
              <span className="label">
                Onchain · built in
              </span>
              <h3>
                Read the chain in plain words.
              </h3>
              <p>
                Labeled, scored answers about any Solana wallet, token or program.
              </p>
            </div>
            <div className="mock">
              <div className="mock-head">
                <span>
                  7xKp…Wq3F · 24h
                </span>
                <b className="mock-tag warn">
                  1 flag
                </b>
              </div>
              <div className="mock-row">
                <L n="check" className="ok" />
                {" Tagged: market maker "}
                <span>
                  12 wallets
                </span>
              </div>
              <div className="mock-row">
                <L n="triangle-alert" className="warn" />
                {" Fresh mint, freeze authority still on"}
              </div>
              <div className="mock-row">
                <L n="check" className="ok" />
                {" Liquidity moved to a stable pair"}
              </div>
            </div>
          </li>
          <li className="bento-card tone-mist" data-reveal="">
            <div className="flex flex-col gap-3.5">
              <span className="label">
                Developers
              </span>
              <h3>
                The same pipeline, in your app.
              </h3>
              <p>
                API, SDKs and MCP tools with the same modes.
              </p>
            </div>
            <div className="mock">
              <div className="mock-code">
                {'await velum.chat({\n  mode: "sealed",\n  model: "auto",\n  messages,\n});'}
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="sealed" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Sealed mode
            </span>
            <h2>
              {"How a chat stays sealed, "}
              <em>
                start to finish.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Sealed mode checks the hardware before you send anything, and opens the answer only on your device.
            </p>
          </div>
        </div>
        <SealedFlow />
      </section>
      <section id="modes" className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Privacy modes
            </span>
            <h2>
              {"Choose how much "}
              <em>
                you reveal.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Set a mode per chat. Sealed is the default; switch when you want the widest choice of models.
            </p>
          </div>
        </div>
        <ul className="modes">
          <li className="mode-col tone-night" data-reveal="">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-pale text-night">
                <Ico k={5} w={22} h={22} />
              </span>
              <span className="rounded-full bg-night-2 px-3 py-1 text-[12.5px] font-medium text-pale">
                Default
              </span>
            </div>
            <h3>
              Sealed
            </h3>
            <span className="label">
              End-to-end, attested enclave
            </span>
            <p>
              Your prompt and files are encrypted on your device to an attested enclave, and only you can decrypt the answer. Velum runs the hardware but cannot read what passes through it.
            </p>
            <ul className="mode-who" aria-label="Who can read what in Sealed">
              <li>
                {"Velum "}
                <b className="cannot">
                  <L n="eye-off" />
                  {" cannot read"}
                </b>
              </li>
              <li>
                {"Model host "}
                <b className="cannot">
                  <L n="eye-off" />
                  {" cannot read"}
                </b>
              </li>
              <li>
                {"Logs kept "}
                <b>
                  none
                </b>
              </li>
            </ul>
            <p className="mode-fit">
              Best for contracts, financials, strategies and anything sensitive.
            </p>
          </li>
          <li className="mode-col tone-paper" data-reveal="">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-mist text-accent">
                <Ico k={6} w={22} h={22} />
              </span>
            </div>
            <h3>
              Ephemeral
            </h3>
            <span className="label">
              Processed in memory, never stored
            </span>
            <p>
              Requests are processed in memory and discarded as soon as the answer is sent. Nothing is stored or used for analytics.
            </p>
            <ul className="mode-who" aria-label="Who can read what in Ephemeral">
              <li>
                {"Velum "}
                <b className="can">
                  <L n="eye" />
                  {" can read"}
                </b>
              </li>
              <li>
                {"Model host "}
                <b className="can">
                  <L n="eye" />
                  {" can read"}
                </b>
              </li>
              <li>
                {"Logs kept "}
                <b>
                  none
                </b>
              </li>
            </ul>
            <p className="mode-fit">
              Best for everyday work where speed matters and nothing should be kept.
            </p>
          </li>
          <li className="mode-col tone-paper" data-reveal="">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-mist text-accent">
                <Ico k={9} w={22} h={22} />
              </span>
            </div>
            <h3>
              Open
            </h3>
            <span className="label">
              Widest model choice, lowest cost
            </span>
            <p>
              Gives you the widest choice of hosted models. The provider reads the request to answer it and logs may be kept for a limited time.
            </p>
            <ul className="mode-who" aria-label="Who can read what in Open">
              <li>
                {"Velum "}
                <b className="can">
                  <L n="eye" />
                  {" can read"}
                </b>
              </li>
              <li>
                {"Model host "}
                <b className="can">
                  <L n="eye" />
                  {" can read"}
                </b>
              </li>
              <li>
                {"Logs kept "}
                <b>
                  30 days
                </b>
              </li>
            </ul>
            <p className="mode-fit">
              Best for public information and casual questions.
            </p>
          </li>
        </ul>
      </section>
      <section id="onchain" className="section">
        <div className="folder tone-paper lined" data-reveal="">
          <span className="folder-tab">
            <Ico k={1} w="1em" h="1em" />
            {" Onchain · built in"}
          </span>
          <div className="onchain-card">
            <div className="flex flex-col items-start gap-6">
              <h2 className="font-display text-[clamp(36px,4.6vw,62px)] font-bold leading-none tracking-[-0.05em]">
                Ask the chain
                <br />
                <em className="serif">
                  in plain words.
                </em>
              </h2>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
                Velum reads Solana transactions and program logs and turns them into answers you can understand. Your questions stay private, so nobody sees what you’re watching.
              </p>
              <ul className="grid gap-2.5 text-[15px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-[12px] bg-surface text-accent">
                    <Ico k={23} w={16} h={16} />
                  </span>
                  Wallets tagged as funds, market makers, MEV bots and dev wallets
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-[12px] bg-surface text-accent">
                    <Ico k={24} w={16} h={16} />
                  </span>
                  Risk flags on fresh mints with live mint or freeze authority
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-[12px] bg-surface text-accent">
                    <Ico k={25} w={16} h={16} />
                  </span>
                  Alerts the moment something moves
                </li>
              </ul>
              <Link className="btn btn-ink" to="/onchain">
                {"Explore onchain "}
                <L n="arrow-up-right" size={16} />
              </Link>
            </div>
            <div className="onchain-mock">
              <span className="label flex items-center gap-1.5">
                <Ico k={5} w={14} h={14} className="text-accent" />
                {" Chat · sealed · sample"}
              </span>
              <div className="ml-auto max-w-[86%] rounded-[18px_18px_6px_18px] bg-panel px-4 py-3 text-[15px]">
                What did 7xKp…Wq3F do in the last 24 hours?
              </div>
              <div className="flex gap-3">
                <Logo size={30} className="mt-0.5 flex-none" />
                <div className="flex min-w-0 flex-col gap-3">
                  <span className="pill pill-accent self-start">
                    used onchain context
                  </span>
                  <p className="text-[15px] leading-relaxed">
                    This wallet belongs to a market-making cluster of 12 addresses. It pulled 38% of its liquidity from one Raydium pool and moved it into a stable pair. Risk: low.
                  </p>
                  <div className="grid grid-cols-3 gap-2 max-[480px]:grid-cols-1">
                    <div className="rounded-[14px] bg-panel px-3 py-2.5">
                      <span className="label block">
                        Cluster
                      </span>
                      <b className="font-display text-[20px] font-bold tracking-[-0.03em]">
                        12 wallets
                      </b>
                    </div>
                    <div className="rounded-[14px] bg-panel px-3 py-2.5">
                      <span className="label block">
                        Moved
                      </span>
                      <b className="font-display text-[20px] font-bold tracking-[-0.03em]">
                        38%
                      </b>
                    </div>
                    <div className="rounded-[14px] bg-panel px-3 py-2.5">
                      <span className="label block">
                        Risk
                      </span>
                      <b className="font-display text-[20px] font-bold tracking-[-0.03em]">
                        Low
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Who it’s for
            </span>
            <h2>
              {"Built for anything "}
              <em>
                you’d rather keep to yourself.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              From deal notes to wallet research, Velum keeps the work that matters most out of shared logs.
            </p>
          </div>
        </div>
        <ul className="audience-grid">
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={27} w={20} h={20} />
            </span>
            <h3>
              Founders and operators
            </h3>
            <p>
              Draft, analyze and plan with contracts, numbers and investor notes that stay private.
            </p>
          </li>
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={28} w={20} h={20} />
            </span>
            <h3>
              Crypto teams and traders
            </h3>
            <p>
              Research Solana wallets and watch pools without broadcasting what you’re watching.
            </p>
          </li>
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={14} w={20} h={20} />
            </span>
            <h3>
              Developers
            </h3>
            <p>
              Ship AI features with the same private pipeline through the API and SDKs.
            </p>
          </li>
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={29} w={20} h={20} />
            </span>
            <h3>
              Legal and finance
            </h3>
            <p>
              Review documents and model scenarios without sending client data into shared logs.
            </p>
          </li>
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={30} w={20} h={20} />
            </span>
            <h3>
              Creators and marketers
            </h3>
            <p>
              Make visuals, scripts and voiceovers for launches you haven’t announced yet.
            </p>
          </li>
          <li className="audience-card" data-reveal="">
            <span className="audience-icon">
              <Ico k={31} w={20} h={20} />
            </span>
            <h3>
              Students and everyone else
            </h3>
            <p>
              Ask questions, learn and brainstorm without your history becoming someone’s data.
            </p>
          </li>
        </ul>
      </section>
      <section className="section grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className="sticky top-[110px] flex flex-col items-start gap-5 max-[900px]:static">
          <span className="kicker">
            Questions
          </span>
          <h2 className="font-display text-[clamp(36px,4.6vw,62px)] font-bold leading-none tracking-[-0.05em]">
            Common
            <br />
            <em className="serif">
              questions.
            </em>
          </h2>
          <p className="max-w-[34ch] text-muted">
            Still curious? Ask Velum itself, in a chat nobody else can read.
          </p>
          <Link className="btn btn-sm" to="/chat">
            <L n="message-square" size={16} />
            {" Ask in a private chat"}
          </Link>
        </div>
        <div data-reveal="">
          <Faq />
        </div>
      </section>
      <section className="section">
        <div data-reveal="">
          <NewsletterFolder />
        </div>
      </section>
      <section className="section">
        <div data-reveal="">
          <div className="folder tone-sage cta-folder">
            <span className="folder-tab">
              Free to start · no account
            </span>
            <div className="flex flex-col items-start gap-6">
              <Logo size={52} className="flex-none" />
              <h2 className="font-display text-[clamp(38px,5vw,64px)] font-bold leading-[0.98] tracking-[-0.05em]">
                Ask anything.
                <br />
                <em className="serif text-pale">
                  Keep it private.
                </em>
              </h2>
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-[#d4d2e6]">
                Chat, create, hand off research and read the chain in one workspace that keeps no copy of what you ask.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link className="btn btn-ink" to="/chat">
                  {"Start a private chat "}
                  <L n="arrow-up-right" size={17} />
                </Link>
                <Link className="btn border-white/40 !bg-none bg-transparent text-white shadow-none hover:border-white" to="/#sealed">
                  <L n="play" size={15} />
                  {" How Sealed works"}
                </Link>
              </div>
            </div>
            <ul className="cta-tiles">
              <li data-reveal="">
                <Link className="cta-tile group" to="/chat">
                  <span className="cta-tile-inner">
                    <Ico k={8} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      Chat
                    </span>
                  </span>
                </Link>
              </li>
              <li data-reveal="">
                <Link className="cta-tile group" to="/#create">
                  <span className="cta-tile-inner">
                    <Ico k={4} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      Create
                    </span>
                  </span>
                </Link>
              </li>
              <li data-reveal="">
                <Link className="cta-tile group" to="/agents">
                  <span className="cta-tile-inner">
                    <Ico k={3} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      Agents
                    </span>
                  </span>
                </Link>
              </li>
              <li data-reveal="">
                <Link className="cta-tile group" to="/onchain">
                  <span className="cta-tile-inner">
                    <Ico k={1} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      Onchain
                    </span>
                  </span>
                </Link>
              </li>
              <li data-reveal="">
                <Link className="cta-tile group" to="/developers">
                  <span className="cta-tile-inner">
                    <Ico k={14} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      API
                    </span>
                  </span>
                </Link>
              </li>
              <li data-reveal="">
                <Link className="cta-tile group" to="/#sealed">
                  <span className="cta-tile-inner">
                    <Ico k={5} w={30} h={30} className="cta-tile-icon" />
                    <span>
                      Sealed
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
