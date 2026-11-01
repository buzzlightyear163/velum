import { Ico } from '../components/Ico'
import { ProductVideo } from '../components/ProductVideo'

export default function Guides() {
  return (
    <main className="pb-10">
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <Ico k={41} w="1em" h="1em" />
              Guides
            </span>
            <h1>
              {"Learn Velum "}
              <em>
                in a few minutes.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Short tutorials and how-it-works videos. Each one runs on sample data, so what you see is the flow, not a real account.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap">
        <ul className="video-grid">
          <li className="video-card" data-reveal="">
            <ProductVideo id="getting-started" />
            <div className="flex flex-col gap-2 px-2">
              <span className="label">
                Tutorial · 0:17
              </span>
              <h3>
                Your first private chat
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Pick Sealed mode, ask in your own words, and read an answer only you can open, with a receipt of what was kept.
              </p>
            </div>
          </li>
          <li className="video-card" data-reveal="">
            <ProductVideo id="how-sealed-works" />
            <div className="flex flex-col gap-2 px-2">
              <span className="label">
                How it works · 0:17
              </span>
              <h3>
                How a chat stays sealed
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Your device checks the enclave, encrypts the prompt, and is the only place the answer is opened. Nothing is kept.
              </p>
            </div>
          </li>
          <li className="video-card" data-reveal="">
            <ProductVideo id="agents-tutorial" />
            <div className="flex flex-col gap-2 px-2">
              <span className="label">
                Tutorial · 0:17
              </span>
              <h3>
                Set up an agent
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Pick a template, choose when it runs, and preview a run that ends in a brief sealed to you.
              </p>
            </div>
          </li>
          <li className="video-card" data-reveal="">
            <ProductVideo id="onchain-lookup" />
            <div className="flex flex-col gap-2 px-2">
              <span className="label">
                How it works · 0:17
              </span>
              <h3>
                Ask the chain in plain words
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Paste a wallet, ask a question, and get a plain report on Solana without anyone seeing what you looked up.
              </p>
            </div>
          </li>
          <li className="video-card" data-reveal="">
            <ProductVideo id="topup-tutorial" />
            <div className="flex flex-col gap-2 px-2">
              <span className="label">
                Tutorial · 0:17
              </span>
              <h3>
                Top up credit privately
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Pay in USDC on Solana and watch it land as private vouchers that never point back to your chats.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}
