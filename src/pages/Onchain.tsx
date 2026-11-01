import { Link } from 'react-router-dom'
import { Ico } from '../components/Ico'
import { L } from '../components/L'
import { ProductVideo } from '../components/ProductVideo'
import { Lookup } from '../components/onchain/Lookup'

export default function Onchain() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <Ico k={1} w="1em" h="1em" />
              Onchain
            </span>
            <h1>
              {"Ask the chain "}
              <em>
                in plain words.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Wallets, tokens and programs on Solana, read for you and explained like a person would. Your lookups stay sealed, so nobody learns what you’re watching.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link className="btn btn-ink" to="/chat">
                {"Start an onchain chat "}
                <L n="arrow-up-right" size={16} />
              </Link>
              <Link className="btn" to="/agents">
                Set up an alert
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap mt-16">
        <div data-reveal="">
          <Lookup />
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              How it works
            </span>
            <h2>
              {"From an address "}
              <em>
                to a plain answer.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Paste a wallet, ask a question, and read the report. Nobody sees what you looked up.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined video-tabs" data-reveal="">
          <span className="folder-tab">
            Video · sample data
          </span>
          <ProductVideo id="onchain-lookup" />
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              What it reads
            </span>
            <h2>
              {"Everything Solscan shows, "}
              <em>
                explained.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Ask in your own words. Velum reads the slots, transactions and program logs, tags who is who and tells you what it means.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined mt-16 p-3" data-reveal="">
          <span className="folder-tab">
            Solana
          </span>
          <ul className="reads-grid">
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={17} w={22} h={22} />
              </span>
              <h3>
                Wallets
              </h3>
              <p>
                Who a wallet is, what it holds, who it trades with, and the wallets that move with it.
              </p>
            </li>
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={38} w={22} h={22} />
              </span>
              <h3>
                Tokens
              </h3>
              <p>
                Holders, how concentrated they are, mint and freeze authority, LP burns, and what the dev wallet did.
              </p>
            </li>
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={11} w={22} h={22} />
              </span>
              <h3>
                Programs
              </h3>
              <p>
                What each instruction does, in plain words, and which authorities the dev kept.
              </p>
            </li>
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={39} w={22} h={22} />
              </span>
              <h3>
                Transactions
              </h3>
              <p>
                Paste a transaction signature and get the story: who paid whom, through which program, and why it matters.
              </p>
            </li>
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={18} w={22} h={22} />
              </span>
              <h3>
                Launches
              </h3>
              <p>
                New mints checked as they appear, pump.fun included: authorities, holders, liquidity, risk score.
              </p>
            </li>
            <li className="reads-card" data-reveal="">
              <span className="tactile-icon">
                <Ico k={40} w={22} h={22} />
              </span>
              <h3>
                Alerts
              </h3>
              <p>
                Hand a wallet or token to an agent and hear the moment something moves.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Private by design
            </span>
            <h2>
              {"Nobody learns "}
              <em>
                what you’re watching.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Most explorers and bots log every lookup. In Sealed mode your question is encrypted on your device, so even Velum can’t see which wallet you asked about.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined compare-folder" data-reveal="">
          <span className="folder-tab">
            Who sees your lookups
          </span>
          <div className="compare" role="table" aria-label="Who sees your onchain lookups">
            <div className="compare-row head" role="row">
              <span className="label" role="columnheader">
                Your lookups
              </span>
              <span className="label" role="columnheader">
                A typical explorer or bot
              </span>
              <span className="label !text-pale" role="columnheader">
                Velum · Sealed
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                What you look up
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Logged by the explorer or bot"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Encrypted to the enclave"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Which wallets you watch
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Visible to whoever runs the bot"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Nobody, not even Velum"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Your own wallet
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Often asked to connect it"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Never needed"}
              </span>
            </div>
            <div className="compare-row" role="row">
              <span className="compare-q" role="rowheader">
                Your questions
              </span>
              <span className="compare-cell bad" role="cell">
                <L n="x" />
                {" Kept on their servers"}
              </span>
              <span className="compare-cell good" role="cell">
                <L n="check" />
                {" Not kept in Sealed mode"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="folder tone-night product-cta" data-reveal="">
          <span className="folder-tab">
            Built in, in every mode
          </span>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1] tracking-[-0.035em]">
              Your next lookup,
              <br />
              <span className="text-pale">
                sealed.
              </span>
            </h2>
            <p className="max-w-[46ch] text-night-muted">
              Paste a wallet, a mint or a transaction signature into the chat, or let an agent watch it for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link className="btn border-pale !bg-none bg-pale text-night hover:border-white hover:bg-white" to="/chat">
              {"Open the chat "}
              <L n="arrow-up-right" size={16} />
            </Link>
            <Link className="btn border-white/30 !bg-none bg-transparent text-white shadow-none hover:border-white" to="/agents">
              See agents
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
