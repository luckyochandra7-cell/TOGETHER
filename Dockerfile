# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TOGETHER — Next.js standalone Docker image
# Deploys to: Render, Fly.io, Railway, AWS ECS, any VPS, your own server.
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# --- Stage 1: Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# --- Stage 2: Build ---
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Stub minimal env so build works. Runtime env will override these.
RUN cp .env.example .env.production || true
RUN NEXT_PUBLIC_SUPABASE_URL=http://stub \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=stub \
    npm run build

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
