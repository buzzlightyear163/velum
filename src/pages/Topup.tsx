import { Link } from 'react-router-dom'
import { L } from '../components/L'
import { ProductVideo } from '../components/ProductVideo'
import { VoucherCard } from '../components/topup/VoucherCard'

export default function Topup() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <L n="wallet" />
              Top up
            </span>
            <h1>
              {"Credit that never "}
              <em>
                points back to you.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              {"Credit pays for every model, at the prices on "}
              <Link className="text-accent underline underline-offset-2" to="/pricing">
                Pricing
              </Link>
              . Each dollar becomes a private voucher made in your browser.
            </p>
          </div>
        </div>
      </section>
      <div className="wrap mt-20 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-5 max-[900px]:grid-cols-1 max-[900px]:gap-14" data-reveal="">
        <div className="folder tone-paper lined mt-0 flex flex-col gap-5 p-8 max-[480px]:p-6">
          <span className="folder-tab">
            How a top-up works
          </span>
          <ol className="flex flex-col gap-2.5">
            <li className="flex gap-4 rounded-[18px] bg-bg p-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-surface text-accent">
                <L n="message-square" size={18} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="label">
                  Step 1
                </span>
                <b className="text-[16px] font-semibold">
                  Open it from the chat
                </b>
                <span className="text-sm text-muted">
                  Top up in the chat opens the payment for the chat in this browser.
                </span>
              </span>
            </li>
            <li className="flex gap-4 rounded-[18px] bg-bg p-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-surface text-accent">
                <L n="wallet" size={18} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="label">
                  Step 2
                </span>
                <b className="text-[16px] font-semibold">
                  Pay from your wallet
                </b>
                <span className="text-sm text-muted">
                  Send USDC on Solana from Phantom, Solflare or Backpack. No card, no billing address.
                </span>
              </span>
            </li>
            <li className="flex gap-4 rounded-[18px] bg-bg p-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-accent text-white">
                <L n="ticket" size={18} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="label">
                  Step 3
                </span>
                <b className="text-[16px] font-semibold">
                  Credit lands as private vouchers
                </b>
                <span className="text-sm text-muted">
                  Your browser turns the payment into vouchers, one for each $1, so a payment never links to your chats.
                </span>
              </span>
            </li>
          </ol>
        </div>
        <VoucherCard />
      </div>
      <section className="section">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              Tutorial
            </span>
            <h2>
              {"A top-up, "}
              <em>
                start to finish.
              </em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Pick an amount, pay in USDC on Solana, and watch it land as private vouchers.
            </p>
          </div>
        </div>
        <div className="folder tone-paper lined video-tabs" data-reveal="">
          <span className="folder-tab">
            Video · sample data
          </span>
          <ProductVideo id="topup-tutorial" />
        </div>
      </section>
    </main>
  )
}
