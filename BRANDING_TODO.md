# Branding TODO

Allt nedan stoppar inte projektet. Det är platser där Velum behöver eget material före launch.

## Namn och identitet
- [ ] Bekräfta namnet **Velum**, ticker **$VELUM**, domän (`velum.dev` är en platshållare) och X-handle (`@askvelum`). Allt finns i `src/lib/site.ts`.
- [ ] Logotyp: `src/components/Logo.tsx` och `public/assets/icon.svg` innehåller en enkel V-slöja. Byt mot slutgiltig mark vid behov.
- [ ] OG-bild (`summary_large_image`) saknas. Lägg till `public/og.png` och en meta-tagg i `index.html`.
- [ ] Riktiga app-ikoner i PNG (192/512/apple-touch) till `manifest.webmanifest`.

## Text
- [ ] Copyn följer referensens struktur och längder, med namnbytet till Velum. Skriv om den med egen röst om den ska vara unik.
- [ ] Platshållare kvar från referensen: `[N]` (gräns för gratis-chattar, holder-krav) och `[PRICE]` på /pricing.
- [ ] Footer-länken "GitHub" pekar på `https://github.com`. Byt till riktig repo-URL.

## Media
- [ ] Tutorial-videorna är skriptade produktscener (`src/components/ProductVideo.tsx`). Spela in riktiga klipp (0:17, 16:9) och byt till `<video>` vid behov.
- [ ] Exempelbilden i chatten är en genererad SVG (`components/chat/GenImage.tsx`).

## Backend och credentials
- [ ] `VITE_CHAT_API`: LLM-proxy med streaming (`TODO(backend)` i `src/lib/chatApi.ts`).
- [ ] `VITE_ACCESS_API`: waitlist-endpoint (`TODO(backend)` i `AccessForm.tsx`).
- [ ] Verifiering av SIWS-signaturen på servern (`WalletContext.tsx`).
- [ ] `VITE_CA` och `VITE_HOLD_MIN` vid launch (holder-gating), samt en egen RPC i `VITE_SOLANA_RPC`.
- [ ] Top-up: USDC-betalning och privata vouchers (`Chat.tsx` / `VoucherCard`).
