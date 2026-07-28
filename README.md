# Paytm Tourist — Pay Anywhere in India

A fully working tourist-payments demo app: **React frontend + Node/Express backend + a custom, 100% local/offline AI travel assistant** (no external AI API key, no rate limits, no daily quota — ever).

## What's inside

```
├── src/                # React + Vite + TypeScript frontend
│   ├── context/WalletContext.tsx   # global wallet/transactions state, talks to backend
│   ├── lib/api.ts                  # typed API client
│   ├── lib/assistant.ts            # talks to the local AI assistant endpoint
│   └── pages/...                   # Landing, Onboarding, Wallet, Dashboard, ScanPay, AddMoney, Assistant, ExitTrip
└── backend/             # Node + Express backend
    ├── server.js                    # API server
    ├── db.js                        # JSON-file database (lowdb) — zero setup, no native deps
    ├── routes/                      # wallet, transactions, merchants/pay, exit-trip, assistant
    └── ai/                          # the local AI engine (see below)
```

## Why the AI needs no API key and never hits a quota

Instead of calling Gemini/OpenAI/etc., `backend/ai/` is a small custom NLP pipeline that runs entirely on your machine:

1. **`intent.js`** — classifies the message into an intent (fare question, tipping, scam warning, transaction dispute, merchant trust, etiquette, greeting, ...) and extracts entities (city, category, amount) using weighted keyword matching.
2. **`knowledgeBase.js`** — hand-curated travel data for Delhi, Mumbai, Bangalore, Jaipur, Goa, Chennai, Kolkata (fares, tipping norms, scam patterns, dispute steps, trust signals, etiquette).
3. **`respond.js`** — turns the intent + entities + knowledge base into a natural, slot-filled reply.
4. **`engine.js`** — keeps a small per-session memory (e.g. remembers which city you mentioned) and ties it together.

Because none of this calls out to the internet, it's **completely free, unlimited, and instant** — perfect for a hackathon demo you can run all day without worrying about quota.

## Running it

You need [Node.js](https://nodejs.org) 18+ installed.

### 1. Install dependencies (frontend + backend)

```bash
npm install
npm run backend:install
```

### 2. Run both servers together

```bash
npm run dev:all
```

This starts:
- Frontend at **http://localhost:5173** (or 8080, check the terminal output)
- Backend at **http://localhost:4000**

Open the frontend URL in your browser — the app is fully wired up: creating a wallet, adding money, scanning & paying merchants, ending a trip, and chatting with the AI assistant all hit the real backend and persist to `backend/data/db.json`.

If you'd rather run them separately:
```bash
npm run dev       # frontend only
npm run backend   # backend only
```

### 3. (Optional) point the frontend at a different backend URL

Copy `.env.example` to `.env` and set `VITE_API_URL` if you deploy the backend somewhere else.

## What's real vs. simulated

- **Real**: wallet balance, add-money conversion math, transaction history, QR-pay flow with anomaly detection, exit-trip refund/donate, and the full AI assistant — all backed by a real Express API and persisted to disk.
- **Simulated for demo purposes** (as in the original hackathon project): passport OCR scan and liveness check on onboarding are UI animations rather than real camera/computer-vision — hooking up a real KYC provider was out of scope for a hackathon demo.

## Resetting the demo data

Delete `backend/data/db.json` and restart the backend — it will be recreated with the original seed data (₹4,171 balance, 3 sample transactions, 5 sample merchants).

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind, shadcn/ui, framer-motion, react-router, @tanstack/react-query
- Backend: Node.js, Express, lowdb (JSON file storage, zero native build dependencies)
- AI: custom local intent-classification + knowledge-base engine (no external API)
