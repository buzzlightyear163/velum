import { Link } from 'react-router-dom'
import { Ico } from '../components/Ico'
import { L } from '../components/L'
import { Logo } from '../components/Logo'
import { CaButton } from '../components/CaButton'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lip" aria-hidden="true" />
      <div className="wrap">
        <div className="footer-grid" data-reveal="">
          <div className="footer-brand">
            <Link className="flex items-center gap-2.5 no-underline" aria-label="Velum home" to="/">
              <span className="flex items-center gap-2.5 font-[family-name:var(--font-bricolage)] text-[22px] font-extrabold tracking-[-0.03em] wordmark-light">
                <Logo size={30} className="flex-none" />
                velum
              </span>
              <span className="text-[15px] text-white/40">
                AI agent workspace
              </span>
            </Link>
            <p className="footer-line">
              Ask anything.
              <br />
              <em>
                Keep it private.
              </em>
            </p>
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/55">
              Chat, create, run agents and read the chain with leading AI models, in a workspace that keeps no copy of what you ask.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link className="footer-cta" to="/chat">
                {"Start chatting "}
                <L n="arrow-up-right" size={15} />
              </Link>
              <a href="https://x.com/askvelum" rel="noopener" target="_blank" aria-label="Velum on X" className="footer-social">
                <Ico k={51} w={15} h={15} />
              </a>
              <a href="https://github.com" rel="noopener" target="_blank" aria-label="GitHub" className="footer-social">
                <Ico k={52} w={15} h={15} />
              </a>
            </div>
            <CaButton tone="dark" />
            <p className="text-[14px] text-white/45">
              © 2026 Velum · All rights reserved
            </p>
            <span className="footer-badge">
              <Ico k={5} w={14} h={14} />
              {" Sealed by default"}
            </span>
          </div>
          <div className="footer-cols">
            <div>
              <h4 className="footer-title">
                Menu
              </h4>
              <ul className="flex flex-col gap-[18px]">
                <li>
                  <Link className="footer-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/chat">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/agents">
                    Agents
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/onchain">
                    Onchain
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/#models">
                    Models
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/guides">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/topup">
                    Top up credit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">
                Privacy
              </h4>
              <ul className="flex flex-col gap-[18px]">
                <li>
                  <Link className="footer-link" to="/#sealed">
                    How Sealed works
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/#modes">
                    Privacy modes
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/#why">
                    Where your words go
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/access">
                    Early access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">
                Developers
              </h4>
              <ul className="flex flex-col gap-[18px]">
                <li>
                  <Link className="footer-link" to="/developers">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/developers#chat">
                    Chat API
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/developers#mcp">
                    MCP tools
                  </Link>
                </li>
                <li>
                  <a className="footer-link" href="https://github.com" rel="noopener" target="_blank">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        velum
      </div>
    </footer>
  )
}
