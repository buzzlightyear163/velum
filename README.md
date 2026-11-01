# Velum

Lokal, körbar React-rekonstruktion av **https://horman.dev/**, ombrandad till **Velum** (`$VELUM`) med en ny färgpalett, *dusk iris* (accent `#514376`, istället för originalets salviagröna `#4e6b5c`).

Velum är en privat AI-arbetsyta: chat, bilder, agenter och onchain-läsning på Solana, med tre integritetslägen (Sealed, Ephemeral och Open).

## Starta

**Windows:** dubbelklicka på `start.bat`. Den installerar dependencies första gången och startar sedan dev-servern på http://localhost:5173.

Manuellt:

```bash
npm install
npm run dev        # utveckling
npm run build      # tsc -b + produktionsbygge till dist/
npm run preview    # servera dist/
```

Kräver Node 18 eller senare.

## Routes

| Route | Innehåll |
| --- | --- |
| `/` | Hero med fungerande chatt-tråd, förmågor, tutorials, agent-demo, modeller (4 flikar), siffror, jämförelse, workspace-bento, Sealed-flöde, lägen, onchain, målgrupper, FAQ, nyhetsbrev, CTA |
| `/agents` | Agentmallar med provkörning, tutorial, privata agenter, CTA |
| `/onchain` | Lookup-demo (Wallet/Token/Program), tutorial, vad som läses, jämförelse, CTA |
| `/guides` | Fem tutorials |
| `/pricing` | Free och Holders, pris per användning, Teams |
| `/topup` | Så funkar en top-up, voucherkort med beloppsväljare, tutorial |
| `/developers` | Docs med sidonavigering, kodblock (TS/Python) med kopiera-knapp, MCP |
| `/access` | Formulär för early access med validering och bekräftelse |
| `/chat` | Fullständig chatt-app: historik i webbläsaren, lägen, modellval, bildverktyg och top-up-dialog |
| `*` | 404-sida |

## Projektstruktur

```
src/
  App.tsx                 router (BrowserRouter)
  main.tsx                typsnitt + CSS + render
  layouts/                SiteLayout, AnnounceBar, SiteHeader (meny, ⌘K-sök, tabbar), Footer
  pages/                  en fil per route (statisk markup genererad från referensen + komponenter)
  components/
    home/                 Hero, ModelsFolder, SealedFlow, Faq, NewsletterFolder
    chat/                 GenImage (exempelbild), Receipt
    onchain/Lookup.tsx    lookup-demo
    topup/                VoucherCard, TopupSteps
    developers/CodeBlock  kodpanel med flikar och kopiera-knapp
    access/AccessForm     formulär
    wallet/               WalletContext (Phantom/Solflare/Backpack) + WalletButton/modal
    ProductVideo.tsx      tutorial-"videor" (skriptade produktscener)
    AgentDemo, SlideTrack, CaButton, Logo, Ico, L
  data/models.ts          modeller, lägen, kvitton
  lib/site.ts             ALL branding: namn, ticker, domän, X-handle, CA
  lib/chatApi.ts          chatt-backend eller lokalt demo-svar
  lib/icons.ts            ikonregister (duotone-glyfer)
  hooks/useReveal.ts      scroll-reveal
  styles/site.css         referensens kompilerade CSS, omfärgad
  styles/app.css          lokala tillägg (reveal, video-scener, några utilities)
public/assets/            logo/favicon och modell-logotyper
```

## Dependencies

`react`, `react-dom`, `react-router-dom` och `motion` (för samma layout- och fjäderanimationer som referensen: glidande pill, tab-kapsel, FAQ och listor). Ikoner kommer från `lucide-react`, typsnitt från `@fontsource` (Instrument Sans, Inter Tight, Instrument Serif, Bricolage Grotesque och IBM Plex Mono). Tailwind behövs inte: `site.css` innehåller redan alla utility-klasser som markupen använder.

## Responsivt

Samma brytpunkter som referensen (1180, 1000, 900, 860, 760, 600, 560 och 480 px). Under 860 px döljs plånboksknappen i toppen och chattens sidopanel blir en utfällbar panel. På mobil syns den flytande flikraden längst ner. Verifierat i 390, 768 och 1280 px.

## API och mock

* **Chatt** (`src/lib/chatApi.ts`): sätt `VITE_CHAT_API` till en endpoint som tar emot `{ messages, tier, mode }` och strömmar text. Utan den strömmas lokala exempelsvar. `TODO(backend)`
* **Bilder:** visar en deterministisk exempelbild (SVG-landskap), precis som referensen gör i beta.
* **Early access** (`VITE_ACCESS_API`): utan endpoint visas bara bekräftelsen lokalt. `TODO(backend)`
* **Top-up:** "Pay" visar samma meddelande som referensen ("Wallet payments open at launch"). USDC-överföring och vouchers är `TODO(backend)`.
* **Agenter och onchain:** provkörningar med exempeldata, som i referensen.

## Auth och Web3

Ingen inloggning. Plånboken använder injicerade Solana-providers (Phantom, Solflare och Backpack): anslut och signera ett meddelande (ingen transaktion). Signaturen verifieras inte mot någon server, `TODO(backend)`. Holder-status läses read-only via `getTokenAccountsByOwner` när `VITE_CA` och `VITE_HOLD_MIN` är satta. Chattar sparas i `localStorage` (Ephemeral sparas aldrig).

## Ersatt jämfört med referensen

* Namn, wordmark, logotyp, ticker, X-handle och domän (Horman → Velum).
* Färg: alla salviagröna toner är hue-roterade till violett (CSS, inline-färger, exempelbild).
* Tutorial-videorna (mp4) är ersatta med skriptade, loopande produktscener i samma 16:9-ram, med play/paus och autoplay i vy.
* Kod-exempel använder `@velum/sdk` och `VELUM_KEY`.

## Rebranda vidare

1. Ändra `src/lib/site.ts` (namn, ticker, domän, X, GitHub).
2. Byt mark i `src/components/Logo.tsx` och `public/assets/icon.svg`.
3. Färger: CSS-variablerna i `:root` i `src/styles/site.css` (`--accent`, `--night`, `--mist`, `--pale` och så vidare).
4. Sätt `VITE_CA` i `.env` vid launch, så blir CA-knappen kopierbar överallt.
5. Sök efter `Velum` och `velum` i `src/` för kvarvarande copy.

Se även `BRANDING_TODO.md` och `REFERENCE_ANALYSIS.md`.
