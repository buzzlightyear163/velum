import { Link } from 'react-router-dom'
import { L } from '../components/L'
import { CodeBlock } from '../components/developers/CodeBlock'

export default function Developers() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <L n="book-open" />
              Developers
            </span>
            <h1>
              {"Build on the "}
              <em>
                private pipeline.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              The same pipeline behind the app, for your own products: chat, images and onchain context.
            </p>
          </div>
        </div>
      </section>
      <div className="wrap mt-20 flex flex-wrap items-start gap-12 pb-12">
        <aside aria-label="Docs sections" className="folder tone-paper lined sticky top-[100px] mt-0 flex max-w-[260px] flex-[1_1_220px] flex-col gap-0.5 p-2.5 max-[860px]:static max-[860px]:max-w-none max-[860px]:flex-row max-[860px]:flex-wrap">
          <span className="folder-tab">
            On this page
          </span>
          <a href="#quickstart" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              1
            </span>
            Quickstart
          </a>
          <a href="#auth" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              2
            </span>
            Authentication
          </a>
          <a href="#modes" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              3
            </span>
            Privacy modes
          </a>
          <a href="#chat" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              4
            </span>
            Chat API
          </a>
          <a href="#images" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              5
            </span>
            Images API
          </a>
          <a href="#mcp" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] text-muted hover:bg-raise hover:text-fg max-[860px]:py-1.5 max-[860px]:text-sm">
            <span className="text-[12px] font-medium text-faint tabular-nums">
              6
            </span>
            MCP tools
          </a>
          <div className="mt-2 flex flex-col gap-2 rounded-[18px] bg-night p-4 text-white max-[860px]:hidden">
            <L n="key-round" size={18} className="text-pale" />
            <span className="text-[14px] leading-snug">
              API keys come with early access.
            </span>
            <Link className="text-[13px] font-semibold text-pale underline underline-offset-2" to="/access">
              Request access
            </Link>
          </div>
        </aside>
        <article className="flex min-w-0 flex-[999_1_560px] flex-col gap-20 text-muted">
          <section id="quickstart" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              Quickstart
            </h2>
            <p className="max-w-[68ch]">
              Install the SDK and send your first private message.
            </p>
            <CodeBlock id="quickstart" />
          </section>
          <section id="auth" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              Authentication
            </h2>
            <p className="max-w-[68ch]">
              Every request carries an API key. Keys belong to a project and can be limited to specific modes.
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                Create keys from your dashboard once access is approved.
              </li>
              <li>
                Keep keys on your server. Never ship them in a browser bundle.
              </li>
              <li>
                Rotate a key at any time; the old one stops working immediately.
              </li>
            </ul>
          </section>
          <section id="modes" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              Privacy modes
            </h2>
            <p className="max-w-[68ch]">
              {"Pass "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                mode
              </code>
              {" on the client or per call. A per-call value overrides the client default."}
            </p>
            <div className="grid gap-2">
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  sealed
                </code>
                <span className="label">
                  strongest
                </span>
                <p className="text-muted">
                  Encrypted to an attested enclave. Velum cannot read the request or the result.
                </p>
              </div>
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  ephemeral
                </code>
                <span className="label">
                  no storage
                </span>
                <p className="text-muted">
                  Processed in memory and discarded after the response.
                </p>
              </div>
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  open
                </code>
                <span className="label">
                  widest choice
                </span>
                <p className="text-muted">
                  Standard processing with more hosted models. Requests may be logged.
                </p>
              </div>
            </div>
          </section>
          <section id="chat" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              Chat API
            </h2>
            <p className="max-w-[68ch]">
              {"Send a list of messages and get a reply. Set "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                model
              </code>
              {" to "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                auto
              </code>
              {" to let Velum choose."}
            </p>
            <div className="grid gap-2">
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  model
                </code>
                <span className="label">
                  string
                </span>
                <p className="text-muted">
                  auto, fast or reasoning.
                </p>
              </div>
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  messages
                </code>
                <span className="label">
                  array
                </span>
                <p className="text-muted">
                  Conversation so far, each with a role and content.
                </p>
              </div>
              <div className="grid grid-cols-[150px_110px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-line bg-surface px-5 py-4 text-sm max-[600px]:grid-cols-1 max-[600px]:gap-1.5">
                <code className="justify-self-start rounded-[10px] bg-mist px-2.5 py-1 font-mono text-[13px] text-accent">
                  stream
                </code>
                <span className="label">
                  boolean
                </span>
                <p className="text-muted">
                  Return the reply token by token.
                </p>
              </div>
            </div>
          </section>
          <section id="images" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              Images API
            </h2>
            <p className="max-w-[68ch]">
              Describe an image and get it back as a file. Works in every privacy mode.
            </p>
            <CodeBlock id="images" />
          </section>
          <section id="mcp" className="flex flex-col gap-4" data-reveal="">
            <h2 className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg">
              MCP tools
            </h2>
            <p className="max-w-[68ch]">
              {"Add Velum as an MCP server and any compatible agent gets "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                velum_chat
              </code>
              {", "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                velum_image
              </code>
              {" and "}
              <code className="rounded bg-raise px-1.5 py-px font-mono text-[0.9em] text-fg">
                velum_onchain
              </code>
              .
            </p>
            <CodeBlock id="mcp" />
          </section>
        </article>
      </div>
    </main>
  )
}
