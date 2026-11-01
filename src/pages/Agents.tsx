import { Link } from 'react-router-dom'
import { Ico } from '../components/Ico'
import { L } from '../components/L'
import { ProductVideo } from '../components/ProductVideo'
import { AgentDemo } from '../components/AgentDemo'

export default function Agents() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <Ico k={3} w="1em" h="1em" />
              Agents
            </span>
            <h1>
              {"Hand off "}
              <em>
                the busywork.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Agents that research, watch the chain and write it up for you, on a schedule or the moment something moves. They run privately and report only to you.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link className="btn btn-ink" to="/access">
                {"Get early access "}
                <L n="arrow-up-right" size={16} />
              </Link>
              <Link className="btn" to="/onchain">
                See onchain
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap mt-16">
        <div data-reveal="">
          <AgentDemo />
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Tutorial
            </span>
            <h2>
              {"Set up an agent "}
              <em>
                in under a minute.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Pick a template, choose when it runs, and preview a run that ends in a brief sealed to you.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined video-tabs" data-reveal="">
          <span className="folder-tab">
            Video · sample data
          </span>
          <ProductVideo id="agents-tutorial" />
        </div>
      </section>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Private agents
            </span>
            <h2>
              {"An assistant that can’t "}
              <em>
                leak your strategy.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              An agent knows what you care about. That’s exactly what should stay sealed.
            </p>
          </div>
        </div>
        <ul className="private-grid">
          <li className="folder tone-paper lined private-card" data-reveal="">
            <span className="folder-tab">
              Runs in the enclave
            </span>
            <span className="tactile-icon">
              <Ico k={2} w={22} h={22} />
            </span>
            <p>
              In Sealed mode the agent works inside the same verified enclave as your chats.
            </p>
          </li>
          <li className="folder tone-paper lined private-card" data-reveal="">
            <span className="folder-tab">
              Your watchlist stays yours
            </span>
            <span className="tactile-icon">
              <Ico k={36} w={22} h={22} />
            </span>
            <p>
              Which wallets and topics you follow is encrypted, so nobody can trade against it.
            </p>
          </li>
          <li className="folder tone-paper lined private-card" data-reveal="">
            <span className="folder-tab">
              Results sealed to you
            </span>
            <span className="tactile-icon">
              <Ico k={37} w={22} h={22} />
            </span>
            <p>
              Briefs and alerts land in your Velum inbox, opened only on your device.
            </p>
          </li>
        </ul>
      </section>
      <section className="section">
        <div className="folder tone-sage product-cta" data-reveal="">
          <span className="folder-tab">
            Opening with wave 1
          </span>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1] tracking-[-0.035em]">
              Your first agent,
              <br />
              <span className="text-pale">
                ready on day one.
              </span>
            </h2>
            <p className="max-w-[46ch] text-[#d4d2e6]">
              Join the list and set up a brief, a wallet watch or a launch radar the day wave 1 opens.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link className="btn btn-ink" to="/access">
              {"Join wave 1 "}
              <L n="arrow-up-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
