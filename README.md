# Odyssey

Decentralized, client-side encrypted notes app built on [Shelby Protocol](https://shelby.xyz) (Aptos blockchain). Notes are encrypted in the browser before they're ever uploaded — Shelby stores ciphertext, never plaintext.

**Live app:** https://odyssey-shel.vercel.app/

---

## Overview

Most "private" note-taking apps store your notes in plaintext on a company's server. Odyssey encrypts each note client-side using the Web Crypto API (AES-GCM) before persisting it to Shelby's decentralized storage network — so the note's owner is whoever holds the wallet and the decryption key, not the platform.

## Features

- **Wallet-gated access** — Notes Dashboard, New Note, and Search are hidden until a wallet is connected
- **Client-side encryption** — notes are encrypted with AES-GCM (Web Crypto API) before upload
- **Dashboard** — notes appear as cards with title, preview text, last-edited date, and a lock icon
- **Search & tags** — filter and organize notes with simple tags
- **On-chain confirmation** — saving a note triggers a real `signAndSubmitTransaction` call through Petra, no mocked success state

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React + TypeScript |
| Wallet | `@aptos-labs/wallet-adapter-react`, `petra-plugin-wallet-adapter` |
| Storage | `@shelby-protocol/sdk` (browser) |
| Encryption | Web Crypto API (AES-GCM) |
| Icons | `lucide-react` |
| Blockchain | Aptos |

## Getting Started

```bash
git clone https://github.com/0xbilal2/Odyssey.git
cd Odyssey
npm install
npm run dev
```

You'll need the [Petra Wallet](https://petra.app/) browser extension installed to connect and sign transactions. A Shelby developer API key (from [developers.shelby.xyz](https://developers.shelby.xyz)) is required for the storage layer specifically.

## How It Works

1. **Connect** — the app wraps its tree in `AptosWalletAdapterProvider` and calls `useWallet().connect("Petra")`, triggering the real Petra popup
2. **Write a note** — enter a title and body in the Note Editor
3. **Encrypt** — the note is encrypted client-side with AES-GCM before it ever leaves the browser
4. **Save to Shelby** — the encrypted payload is stored via `@shelby-protocol/sdk/browser`, authorized by a signed Aptos transaction
5. **Dashboard** — the new note appears as a card with its lock icon, preview, and last-edited timestamp

## Design

Palette: **Mossy Hollow** — `#3D4127` dark moss · `#636B2F` olive green · `#BAC095` sage green · `#D4DE95` light lime. Earthy, premium, distinct Web3 aesthetic — no blue tones.

## Credits

Built by **Bilal** — [GitHub](https://github.com/0xbilal2) · [X](https://x.com/0xBilal2)

Built on **Shelby Network** — [Website](https://shelby.xyz) · [Docs](https://docs.shelby.xyz) · [GitHub](https://github.com/shelby) · [Discord](https://discord.gg/shelbyserves) · [X](https://x.com/shelbyserves)
