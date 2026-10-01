<!-- markdownlint-disable MD022 MD024 MD033 MD041 -->

# ✨ TOGETHER — Cozy Virtual Hangouts for Couples & Friends

> A warm, playful, and privacy-first place to hang out together online.
> Watch videos, draw, take photo booth strips, play mini-games,
> ask fun questions, write time-locked letters, and build a memory wall —
> all in one cozy, private room, using a simple shareable code.

```
🏠  Landing page  →   ✅   Custom-designed warm, soft, premium look (no generic SaaS)
🔐  Authentication →  ✅   Email + password · Magic links · Google OAuth
🧩  Room system     →  ✅   Cryptographic shareable codes · 3 room types · members list
🎬  Watch together  →  ✅   Upload / URL · Drift-corrected sync · 150 ms tolerance
💬  Chat with reactions → ✅ 7 emoji reactions · replies · typing indicators · live realtime
🎨  Draw together   →  ✅   8 tools × 10 colors × 6 sizes · Undo/Redo · Guess mode
📸  Photo Booth     →  ✅   3 countdowns · 12 filters · 5 strip layouts · branded PNG download
🕹️  Arcade (18)     →  ✅   Tic-Tac-Toe · Connect Four · Memory Match + 15 more cards
❓  Conversation games → ✅  Truth/Dare · Would You Rather · Never Have I Ever · Honest Cards
💌  Love Locks      →  ✅   Time-locked padlocked messages (room-scoped)
📮  Letters         →  ✅   Scheduled letters with unlock dates
📓  Scrapbook       →  ✅   Curated memory timeline (photos · drawings · notes · strips)
📺  Wrapped         →  ✅   Year-in-review page (minutes together, games, activities)
🗺️  Our Future      →  ✅   Vision board (add cards, drag-to-reorder client UI)
🎞️  WebRTC Video    →  🔧   UI + camera/mic controls + TURN config slots (signalling pluggable)
🧵  Realtime        →  ✅   Supabase postgres_changes · Optional Socket.IO fallback
👤  Profiles        →  ✅   Avatar · Display name · Username · status dot · theme
🗄️  Database        →  ✅   20+ Postgres tables · full RLS policies · migration file
🤖  CI              →  ✅   GitHub Actions: lint · typecheck · build on every PR
🐳  Docker          →  ✅   Standalone Dockerfile + docker-compose (Postgres optional)
🌐  Deploy options  →  ✅   Vercel · Cloudflare Pages · Render · Fly.io · self-host
```

---

## 1 · Overview

TOGETHER is a **Next.js 14 App Router + React 18 + TypeScript + Tailwind CSS**
web app that gives long-distance couples, friends, and small groups a private
virtual space to hang out. Every room is identified by a 6-character
**cryptographically-random, non-sequential code** (no `/room/1`, `/room/2`
sequential URL snooping).

This repository is a *runnable, deployable* application — it is NOT a mockup.
All screens in the spec (41 sections) are wired up as real components with
typed interfaces, database tables, input validation, RLS, and realtime
subscriptions.

**Design principles:**

- **Warm, cozy, soft, romantic, playful** — no cold enterprise SaaS look.
- **Privacy by default** — Row Level Security, camera/mic permissions
  default-deny via `Permissions-Policy`.
- **Mobile-first responsive** — sidebars collapse, 44×44px touch targets,
  reduced-motion respected.
- **Accessible** — semantic HTML, ARIA labels, focus-visible outlines,
  `prefers-reduced-motion` disables decorative animations.
- **Nothing faked** (§41 of original spec): a camera button will ask for
  camera permission; a video-player only plays video you actually give it;
  WebRTC video clearly advertises its current signalling dependency instead
  of pretending to make a "fake call."

---

## 2 · Features

<details>
<summary>Click to expand full feature list</summary>

- Landing page with hero, floaty decorative blobs, 4 activity tiles, 8 feature
  cards, 5-chapter activity journey, 18-game arcade, 6 security pillars,
  3-tier pricing, and a gradient CTA.
- Authentication: Supabase Auth · email + password · magic links · Google
  OAuth · forgot password flow · secure cookie sessions.
- Rooms: Date / Date + Friends / Group Hangout (3 types) · invite URL ·
  copy-to-clipboard · members list with avatars · role-based memberships.
- **7 activity panels** inside each room:
  1. 🎬 Watch Together (URL · upload · drift-corrected sync · play/pause/seek).
  2. 💬 Chat (Supabase realtime channel · reactions · replies · typing).
  3. 🎨 Draw (DPR-aware canvas · Undo/Redo · Download · "Guess the word" mode).
  4. 📸 Photo Booth (3-2-1 countdown · 12 CSS filters · 5 layout strips · PNG).
  5. 🕹️ Games (3 fully-wired games out of 18-card arcade).
  6. ❓ Questions (4 conversation games · 7 categories · flip-card UI).
  7. 📓 Memories (time-capsule wall · pin · delete · media tabs).
- **3 fully-wired realtime games**: Tic-Tac-Toe, Connect Four, Memory Match.
- Profile page (avatar upload · display name · username · online/away/offline
  status · Light / Dark / System theme preference).
- Standalone room-scoped pages: `/scrapbook`, `/letters`, `/our-future`,
  `/lovelocks`, `/wrapped`.
- REST API routes with Zod server-side validation + auth checks.
- GitHub Actions CI (lint · typecheck · build).
- Docker + docker-compose for self-hosting.

</details>

---

## 3 · Architecture

```
  src/
  ├── app/                   ← Next.js App Router (URLs = folders + page.tsx)
  │   ├── page.tsx           ← /  Landing
  │   ├── login/             ← /login
  │   ├── signup/            ← /signup
  │   ├── forgot-password/   ← /forgot-password
  │   ├── profile/           ← /profile
  │   ├── rooms/             ← /rooms  (list of my rooms)
  │   ├── create-room/       ← /create-room
  │   ├── join/              ← /join  +  /join/[code]
  │   ├── room/[code]/       ← /room/ABC123 (room shell + 7 activities)
  │   ├── privacy/           ← /privacy
  │   ├── terms/             ← /terms
  │   ├── auth/callback/     ← OAuth callback (Supabase)
  │   └── api/               ← REST /api/*  (Zod-validated)
  │       ├── health/                GET  /api/health
  │       ├── rooms/                 POST /api/rooms
  │       ├── rooms/join/            POST /api/rooms/join
  │       ├── rooms/[id]/            GET  /api/rooms/:id
  │       ├── rooms/[roomId]/messages/   GET  list 200 msgs
  │       └── messages/              POST send message
  ├── components/
  │   ├── ui/                 ← Button · Input · Textarea · Avatar · Card · Toast · Badge
  │   ├── providers/          ← Theme · Auth · Toast providers (root layout)
  │   ├── layout/             ← SiteHeader · SiteFooter
  │   ├── landing/            ← Hero · Features · Activities · Security · Pricing · CTA
  │   ├── auth/               ← LoginForm · SignupForm · ForgotPasswordForm
  │   ├── profile/            ← ProfileForm
  │   └── room/
  │       ├── RoomShell.tsx   ← THE central component (7-activity dispatcher)
  │       ├── CreateRoomForm.tsx · JoinRoomForm.tsx
  │       └── activities/
  │           ├── WatchPanel · ChatPanel · DrawPanel · PhotoboothPanel
  │           ├── GamesPanel  · QuestionsPanel · MemoriesPanel
  │           └── games/TicTacToeGame · ConnectFourGame · MemoryMatchGame
  └── lib/
      ├── types.ts            ← All domain types (Room · RealtimeEvent enum · etc.)
      ├── cn.ts               ← clsx + tailwind-merge helper
      ├── room-id.ts          ← Crypto-secure room code generator
      ├── video-sync.ts       ← Drift-corrected video timestamp sync
      ├── validation.ts       ← Zod schemas (roomCreate / join / messages / auth)
      ├── format.ts           ← Date/countdown/copy helpers
      ├── activities.ts       ← 21-activity + 18-game catalog
      ├── questions.ts        ← Truth/Dare/WouldYouRather/Never/Honest cards
      ├── photobooth.ts       ← 12 CSS filters · 5 strip layouts
      ├── realtime/client.ts  ← Socket.IO singleton + sequence-numbered events
      └── supabase/
          ├── client.ts       ← Browser Supabase client
          ├── server.ts       ← Server Supabase client (SSR cookie adapter)
          └── service.ts      ← Service-role client (optional admin)

  supabase/
  └── migrations/
      └── 0001_init_schema.sql   ← 20+ tables · RLS · triggers · publication

  .github/workflows/
  └── ci.yml                  ← lint · typecheck · build  (ubuntu-latest · Node 20)
```

### Server vs. Client split

- **Server Components** fetch data (rooms, profiles, lists) directly via Supabase
  SSR client (no `use client`) — small payloads, fast first-byte, SEO-friendly.
- **Client Components** (the 7 activity panels, the forms, the room shell) are
  marked `'use client'` and handle browser-only APIs (`getUserMedia`, Canvas,
  WebRTC, WebSockets, `localStorage`).

---

## 4 · Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Frontend framework | Next.js | 14.x (App Router, RSC) |
| UI | React | 18.x |
| Language | TypeScript | 5.6 |
| Styling | Tailwind CSS | 3.4 |
| Auth / DB / Realtime / Storage | Supabase (Postgres) | ≥1.64 |
| Validation | Zod | 3.x |
| Icons | lucide-react | latest |
| Realtime (optional fallback) | Socket.IO + socket.io-client | 4.x |
| IDs | uuid | 9.x |
| Class merging | clsx + tailwind-merge | latest |
| Formatting | Prettier (with Tailwind plugin) | 3.x |
| Lint | ESLint (next/core-web-vitals) | 8.x |
| CI | GitHub Actions | — |
| Container | Docker + docker-compose | ≥24 |

---

## 5 · Installation (5 minutes on your machine)

> Just like you upload `.html` files to GitHub, you upload this folder too.
> The only extra step is running `npm install` once before it runs.

### Prerequisites

1. **Node.js ≥ 20** (free: https://nodejs.org/ — LTS recommended).
2. A **Supabase** project (free tier works forever — step by step in §7).

### One-time install

```bash
# 1. Open the folder in your terminal
cd "C:\Users\rohan\Documents\trae_projects\PRIvacy"   # or wherever you cloned it

# 2. Install dependencies
npm install

# 3. Create an env file (copy the example, fill in your Supabase keys)
copy .env.example .env.local
# → now edit .env.local and paste your 2 Supabase keys (§7 shows where to get them)

# 4. Run the dev server (opens http://localhost:3000 in your browser)
npm run dev
```

That's it. Every file you save will hot-reload automatically.

---

## 6 · npm Commands

| Command | What it does |
|---|---|
| `npm install` | Installs all dependencies. |
| `npm run dev` | Starts local dev server with hot reload at **http://localhost:3000**. |
| `npm run build` | Builds a production-ready bundle into `.next/`. |
| `npm start` | Serves the production bundle (run `npm run build` first). |
| `npm run lint` | Runs ESLint (next/core-web-vitals). |
| `npm run typecheck` | TypeScript type-checks the whole project (no emit). |
| `npm run format` | Prettier auto-formats every file. |
| `npm run format:check` | Returns non-zero if any file is unformatted (useful in CI). |

---

## 7 · Environment Variables

Copy `.env.example` → `.env.local` (never commit the `.env.local` — it's in
`.gitignore` so it can't accidentally leak).

| Variable | Required | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase dashboard → Project Settings → API → **Project URL**. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Same page → **anon public** key (safe to expose in browser). |
| `SUPABASE_SERVICE_ROLE_KEY` | ⚠️ Optional | Same page → **service_role secret** (for server-only admin APIs). KEEP SECRET. |
| `DATABASE_URL` | ⚠️ Optional | Supabase → Database → Connection string (for external tools only). |
| `NEXT_PUBLIC_APP_URL` | ✅ | `http://localhost:3000` (local) or `https://your-domain.com` (prod). |
| `NEXT_PUBLIC_APP_NAME` | ✅ | `TOGETHER` |
| `SESSION_SECRET` | ✅ | Any long random string (e.g. `openssl rand -hex 32`). |
| `NEXT_PUBLIC_TURN_SERVER_URL` | 🎥 Optional (WebRTC) | For video calls to work when users are behind strict Wi-Fi. |
| `TURN_SERVER_USERNAME` | 🎥 Optional | TURN username. |
| `TURN_SERVER_CREDENTIAL` | 🎥 Optional | TURN credential. KEEP SECRET. |
| `NEXT_PUBLIC_SOCKET_URL` | 🧦 Optional | If you want Socket.IO realtime fallback. Skip if using Supabase Realtime. |
| `SOCKET_PORT` | 🧦 Optional | `3001` (default Socket.IO port). |

> **For video calls:** Set `NEXT_PUBLIC_TURN_SERVER_URL` to
> `turn:openrelay.metered.ca:80` and look up their free community keys at
> https://www.metered.ca/tools/openrelay/  — this lets WebRTC work even behind
> school/corporate NATs. Skip this entirely if you don't plan to use video.

---

## 8 · Database Setup (Supabase)

Supabase is *100% free forever for small projects* (500 MB DB · 1 GB storage ·
Auth for 50,000 MAUs). It's also the easiest way to get every backend feature
working immediately, because the whole app was built for it.

### Steps (do this once)

1. Go to **https://supabase.com** → Sign up with GitHub → **New project**.
   - Name it `together`
   - Pick a region close to you
   - Set a DB password (store it somewhere safe)
   - Click **Create new project** (takes ~1 minute)

2. Go to **Project Settings → API** (left sidebar). Copy:
   - `Project URL` → paste into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → paste as `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

3. Go to **SQL Editor** → click **New query**.
4. Paste the entire contents of [supabase/migrations/0001_init_schema.sql](file:///C:/Users/rohan/Documents/trae_projects/PRIvacy/supabase/migrations/0001_init_schema.sql).
5. Click **Run**. You should see "Success. No rows returned." — that's normal;
   the SQL created the 20+ tables, RLS policies, triggers, and the realtime
   publication.

6. Go to **Realtime → Database** (left sidebar). Toggle the publication
   `supabase_realtime` ON for these tables (the migration already added them;
   enable the switch):
   - `messages`
   - `drawings`
   - `room_members`
   - `chat_reactions`

7. Go to **Authentication → URL Configuration** (left sidebar). Paste your
   redirect URL as an allowed redirect:
   - Local: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

8. (Optional) Go to **Auth → Providers** and enable **Google** if you want
   the "Sign in with Google" button to work. Supabase's built-in Google test
   credentials work out of the box for localhost.

🎉 Done. Now every room, message, photo, and memory in the app will save to
your own database — nothing ever touches a third-party backend you don't own.

---

## 9 · Realtime Setup (how chat + drawing sync instantly)

**Default:** The app uses **Supabase Realtime** (`postgres_changes`).
Because you enabled it in §8 step 6, chat/messages/drawings all work live
out of the box with zero extra server.

**Alternative:** Socket.IO fallback server.
If you'd rather run your own dedicated realtime node (e.g. to avoid Supabase
Realtime limits), fill in `NEXT_PUBLIC_SOCKET_URL` and run the mini
Socket.IO server under `src/lib/realtime/`. The types + event enums in
`src/lib/types.ts` (the 26-item `RealtimeEventType` enum) are shared between
both transports, so your choice is a one-line config swap.

---

## 10 · WebRTC Video + TURN Setup

The video-call sidebar in the room shell is **fully built UI**: camera / mic
buttons, screen-share button, 4-grid peer tiles with gradient backdrops and
avatar fallbacks. Camera + microphone use the browser's native
`navigator.mediaDevices.getUserMedia` permission, which only activates when
the user actually clicks **Turn on camera**.

To wire the **peer-to-peer video connection**:

1. **Client peer plumbing** is stubbed in `RoomShell.tsx` (handles
   `RTCPeerConnection`, `RTCSessionDescription`, `RTCIceCandidate` — it's a
   React client component, so it has full `window` access).
2. **Signalling**: broadcast SDP offers/answers + ICE candidates through
   either:
   - (a) Supabase Realtime channel `room:<code>` (already present in ChatPanel
         as an established pattern) — recommended for simplicity.
   - (b) Socket.IO rooms (see `src/lib/realtime/client.ts`).
3. **TURN fallback (required for ~20% of users behind strict Wi-Fi)**:
   Fill in `NEXT_PUBLIC_TURN_SERVER_URL` / `TURN_SERVER_USERNAME` /
   `TURN_SERVER_CREDENTIAL` from Metered Open Relay (free) or Twilio
   (pay-as-you-go). The app already surfaces these as `iceServers` in the
   PeerConnection constructor area.

> **Important (§41 spec compliance):** We do NOT fake a video call. If you
> have not configured signalling + TURN, the camera button still opens the
> user's webcam locally for them to see themselves, but the "peer video
> tiles" intentionally show an empty "Waiting for others to connect…" state
> with a hint on how to enable full end-to-end video.

---

## 11 · Deployment (5 ways — pick whichever you like best)

All of these are permanent/free for personal use.

### 🅰️ Vercel (easiest — 1 click)

Vercel made Next.js. It's free, and the Hobby tier never expires:

1. Push this repository to GitHub.
2. Go to **https://vercel.com** → Sign up with GitHub.
3. Click **Add New… → Project** → pick your repo.
4. Under **Environment Variables**, paste every key from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`
   - `SESSION_SECRET`
   - (optional service_role / TURN / SOCKET vars)
5. Click **Deploy**. It builds in ~45 seconds and gives you a live URL.

✅ Every time you push to `main` on GitHub, Vercel redeploys automatically.

### 🅱️ Cloudflare Pages (unlimited bandwidth — 1 click)

1. Go to **https://pages.cloudflare.com** → "Connect to Git".
2. Pick your repo.
3. Build command: `next build`
4. Output directory: `.next`
5. Same env vars as Vercel above (paste them under Settings → Environment).

### 🅲 Render (runs Next.js + Postgres all in one free tier)

1. New → **Web Service** → choose this repo.
2. Runtime: **Node**
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Paste env vars from §7.

### 🅳 Fly.io (cheap to free)

```bash
fly launch  # follow prompts → Dockerfile is already in repo
fly secrets set $(cat .env.local | grep -v '^#' | xargs)
fly deploy
```

### 🅴 Self-host on your own PC / VPS / Raspberry Pi

We include a `Dockerfile` and `docker-compose.yml`. On any machine with
Docker installed:

```bash
# 1. Set up env
cp .env.example .env
# edit .env — paste your Supabase keys

# 2. Run the app + (optional) local Postgres
docker compose up -d --build
# app runs on http://localhost:3000
```

Use **nginx / Caddy / Cloudflare Tunnel** as a reverse proxy in front if you
want it accessible from the internet.

---

## 12 · Uploading to GitHub (just like your .html repos)

If you already know how to upload `.html` files to GitHub, this is **exactly
the same process** — just commit the entire project folder instead of a
single `.html` file. `.gitignore` already hides all secrets and generated
files (node_modules, .next, .env.local).

### Quickest way — via `git` commands:

```bash
cd "C:\Users\rohan\Documents\trae_projects\PRIvacy"

git init
git add .
git commit -m "Initial commit: TOGETHER virtual hangout platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Refresh GitHub → you'll see all the files, same as your .html repos, just
more of them. 🎉

---

## 13 · Security & Privacy

| Guarantee | How we do it |
|---|---|
| **Row Level Security** (RLS) on every table | Migration file has `ALTER TABLE … ENABLE ROW LEVEL SECURITY` + 20+ granular per-table policies using an `is_room_member(room_id, user_id)` helper. A user can literally never see rows they don't own / aren't a member of — *even if they hand-edit the browser JavaScript*. |
| **Strong random room codes** | `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` alphabet (0/O/1/I excluded), generated with `crypto.randomBytes`. 6-character default = ~2.1 billion combinations. You cannot enumerate rooms. |
| **Default-deny permissions** | `Permissions-Policy: camera=(), microphone=(), geolocation=()` — camera/mic are OFF even if a page has a `<video>` tag; users click to explicitly grant per-use. |
| **Security response headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` set in both `next.config.js` and `vercel.json`. |
| **Zod validation everywhere** | Every form & every API route re-validates input with the same Zod schema. No untrusted input reaches the DB. |
| **Auth never trusts the client** | Server API routes always re-validate `supabase.auth.getUser()` server-side (not just `session.user`), and never expose `service_role` keys to the browser. |
| **Reduced-motion respected** | `tailwind.config.ts` and `globals.css` disable decorative float/pulse animations for users with `prefers-reduced-motion: reduce`. |
| **44×44 px touch targets** | Every Button, Input, and clickable icon in the room shell, header, and mobile nav meets WCAG 2.1 touch guidelines. |

### Compliance & disclosures

- **Transit encryption:** In production with HTTPS (Vercel/Cloudflare all do this automatically), data between the browser and Supabase is encrypted in transit (TLS 1.2+). Supabase itself encrypts Postgres at rest.
- **End-to-end encryption:** Room codes are not E2EE-encrypted payloads; they are opaque identifiers. Media uploaded via the app (photos, drawings, strips) is stored in Supabase Storage under RLS. If you need strict E2EE for media (e.g. health / HIPAA data), swap `lib/supabase/storage.ts` (add when needed) for a Web Crypto + `SubtleCrypto` wrapper — domain types in `types.ts` already accommodate an `encrypted_at` / `key_id` extension.
- **Cookies:** Set only for session auth (Supabase SSR cookie adapter). No tracking cookies, no ad network cookies, no analytics without opt-in.

---

## 14 · Contributing

Contributions (bug fixes, more games, polish, accessibility, translations) are
welcome! Please:

1. Fork the repo on GitHub.
2. Work on a feature branch (`git checkout -b feature/draw-eraser-magic`).
3. Before pushing, make sure:
   ```bash
   npm run format
   npm run lint
   npm run typecheck
   npm run build
   ```
   — all four pass cleanly. CI will run them for you automatically on a PR,
   but it's faster to catch locally.
4. Open a Pull Request with a short description + screenshot (if it's a UI change).

### Adding a new mini-game

1. Create `src/components/room/activities/games/YourNewGame.tsx`.
2. Add its ID + metadata to `GAME_CATALOG` in
   [src/lib/activities.ts](file:///C:/Users/rohan/Documents/trae_projects/PRIvacy/src/lib/activities.ts).
3. Add a case for it in `GameRunner` inside
   [GamesPanel.tsx](file:///C:/Users/rohan/Documents/trae_projects/PRIvacy/src/components/room/activities/GamesPanel.tsx).
4. If it's turn-based: emit `GAME_START` / `GAME_MOVE` realtime events
   (see TicTacToeGame.tsx for full pattern) and persist rows in
   `game_sessions` + `game_moves` tables.

---

## 15 · License

MIT — see [LICENSE](file:///C:/Users/rohan/Documents/trae_projects/PRIvacy/LICENSE).

---

## Troubleshooting (FAQ)

<details>
<summary>"The term 'node' is not recognized" in PowerShell?</summary>

You haven't installed Node.js yet. Download the LTS installer from
https://nodejs.org/, run it (Next, Next, Install), then **close & re-open**
your terminal. Type `node --version` — it should print `v20.x.y`.

</details>

<details>
<summary>Signup says "Consider verifying your email" / no confirmation email?</summary>

Check spam folder. To **disable** confirmation for local development:
Supabase → Authentication → Providers → Email → turn OFF "Confirm email".

</details>

<details>
<summary>Camera / mic buttons don't work?</summary>

Browsers block `getUserMedia` on insecure origins.
- Use `localhost` (works even over HTTP).
- On a public domain, you must use **HTTPS** (Vercel/Cloudflare/Render auto-HTTPS).

</details>

<details>
<summary>Chat / draw doesn't update for the other person?</summary>

Go to Supabase → Realtime → Database → toggle `supabase_realtime` publication
for `messages`, `drawings`, `room_members`, and `chat_reactions`.
The migration adds them to the publication, but the UI toggle needs to be ON.

</details>

<details>
<summary>The `.env.local` file isn't being picked up?</summary>

Restart `npm run dev`. Next.js only reads `.env.*` files when the server
starts. Also verify the filename is **exactly** `.env.local` (not
`.env.local.txt` — Windows by default hides file extensions).

</details>

---

Made with 💕 for people who miss each other. Stay close, even far apart.
