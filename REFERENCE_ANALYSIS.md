# Referensanalys: horman.dev

**Stack (referens):** Next.js (App Router, Turbopack), Tailwind v4 med egna `@layer components`, framer-motion, react-icons/Phosphor (duotone) och lucide, Solana wallet-adapter med Sign-in with Solana.

## Routes
`/`, `/chat`, `/agents`, `/onchain`, `/guides`, `/pricing`, `/topup`, `/developers` och `/access` (från sitemap.xml och länkar), plus 404. Inga dynamiska routes. Ankare: `/#models`, `/#modes`, `/#sealed`, `/#why`, `/#create`, `/developers#quickstart|auth|modes|chat|images|mcp`, `/chat#topup`.

## Layout
* Announce-bar (42 px, stängbar per session), sticky topbar (65 px) med nav, ⌘K-sök, CA-pill, Connect wallet, "Start chatting" och en mega-meny.
* Flytande flikrad längst ner (Home, Onchain, Agents och Pricing, plus en rund Chat-knapp) med animerad kapsel.
* Sektioner: `.section` med centrerat `.head` (kicker + h2 med kursiv serif-andra rad + lede). Kort i "folders" (`.folder.tone-paper|night|sage|pale|mist`) med flik-etikett.
* Footer: mörk, med en stor wordmark nederst.
* `/chat` har egen helskärmslayout: sidopanel på 280 px och huvudyta med composer.

## Designsystem
* **Typsnitt:** Instrument Sans (brödtext), Inter Tight (display), Instrument Serif italic (accentrader), Bricolage Grotesque (wordmark) och IBM Plex Mono (kod).
* **Färger (referens):** bg `#fff`, panel `#f3f5f3`, fg `#161a17`, accent `#4e6b5c`, night `#1a231e`, mist `#dde6df`, pale `#c9d7cd` och cream `#ede5d3`.
* **Färger (Velum):** accent `#514376`, night `#1a1726`, mist `#dadae9`, pale `#c5c4dc` och panel `#f2f3f6`. Alla gröna toner (hue 80–200, låg mättnad) är roterade till cirka 256°.
* **Former:** pill-knappar, radier på 14–28 px, "tactile"-skuggor (`--tactile`, `--lift`, `--well`) och petal-hörn.

## Brytpunkter
1180 (CA-pill döljs), 1000 (nav-länkar döljs), 900, 860 (wallet-knapp, chattens sidopanel), 760, 600, 560 ("Start chatting" döljs) och 480.

## Komponenter
SlideTrack (segmenterad kontroll med glidande pill, `layoutId`), CaButton, WalletButton/modal, Hero-composer med tråd, VideoTabs/ProductVideo, AgentDemo, Models-folder, Ledger, Compare-tabell, Bento, SealedFlow, Modes, Onchain-mock, Audience-grid, Split-FAQ, Newsletter, CTA-tiles, cmdk-sök, Lookup, voucherkort, CodeBlock och AccessForm.

## Animationer
* Reveal: opacity 0→1 och y 14→0, 0,55 s, ease `[.22,.8,.24,1]`, `once`, amount 0,2, stagger 0,07 s (hero 0,09 s / 0,05 s).
* Fjädrar: pill (380/30), tab-kapsel (380/34), agent-val (420/34), FAQ (600/50), cmdk (420/32).
* Hero-placeholder skrivs tecken för tecken (38 ms per tecken, 2 s paus, 5 fraser).
* Sealed-steg byter aktivt steg var 2,4 s; agentsteg tickar var 650 ms; lookup läser i 3 × 420 ms.
* Thinking-prickar, blink-cursor och `rise` på kvitton.

## Funktioner
Inline-chatt på startsidan (strömmar från `/api/chat`, "Open in full chat" skickar tråden vidare via sessionStorage), privacy-kvitto per svar, bildprompter som ger en exempelbild, plånbok med SIWS, holder-gating av modeller, top-up-dialog och early-access-formulär.

## Externa integrationer
`/api/chat` (LLM-proxy), `/api/auth/session` (plånbokssession), Solana RPC (saldo) och Phantom/Solflare-deeplinks.
