# پرامپت نصب برای Gemini (Gemini CLI روی سرور)

این فایل نسخهٔ Gemini پرامپت‌های [`INSTALL_PROMPT.md`](INSTALL_PROMPT.md) است.

| ابزار | کاربرد |
|---|---|
| **Gemini CLI** (روی سرور، روش پیشنهادی) | فایل می‌خواند، دستور اجرا می‌کند و تغییر را مستقیم اعمال می‌کند |
| **Gemini در وب یا اپ** (gemini.google.com) | به سرور دسترسی ندارد؛ فقط کد و راهنما تحویل می‌دهد و اجرا با خود شماست. پرامپت بخش ۵ |

---

## ۱. نصب Gemini CLI روی سرور (یک بار)
```bash
# Node.js 20+ is required
node -v
npm install -g @google/gemini-cli
cd /root/tikalgo
gemini            # first run: sign in with your Google account, or set GEMINI_API_KEY
```
- کلید API را فقط در محیط سرور بگذارید: `export GEMINI_API_KEY=...` در `~/.bashrc`.
- **هرگز کلید را داخل پرامپت، چت یا گیت نگذارید.**

مخزن agent-kit را هم روی سرور بیاورید:
```bash
cd /root && git clone https://github.com/cryptojs7-eng/agent-kit.git
cd agent-kit && git checkout claude/clever-brahmagupta-hmshh0   # or main after merge
```

## ۲. فایل زمینهٔ دائمی `GEMINI.md`
Gemini CLI فایل `GEMINI.md` را در هر جلسه خودکار می‌خواند. پس قوانین ثابت پروژه را یک بار آنجا بگذارید:
```bash
cat > /root/tikalgo/GEMINI.md <<'EOF'
# TIKALGO — fixed rules for every session
- Report to the owner in Persian.
- Keep the existing architecture. Reuse existing auth, user, DB, mailer, admin and market-data code; never duplicate them.
- No mock data, no fake success, no UI without a backend. If data is missing, show an honest empty state.
- LIVE trading is OFF by default; new members start in PAPER. The AI never bypasses the Risk Engine or the Execution Gate.
- No public self-registration and no free plan: accounts are created only when an admin approves a membership application.
- Never print, log or commit secrets (API keys, passwords, .env). Back up every file before changing it.
- Before any destructive command (rm, DROP, migration down, service restart) explain it and wait for approval.
- No profit claims and no AGI claims in any public text.
- Admin contact: Telegram @ad_tikalgo. Channel: t.me/Tikalgoai.
EOF
```

---

## ۳. پرامپت A: نصب صفحه و ساخت بک‌اند عضویت و دادهٔ بازار
داخل `gemini` در پوشهٔ `/root/tikalgo` بچسبانید. با `@` فایل‌ها مستقیم به زمینهٔ مدل اضافه می‌شوند.

```text
@/root/agent-kit/docs/tikalgo/landing/INSTALL.md
@/root/agent-kit/docs/tikalgo/landing/index.html
@/root/agent-kit/docs/tikalgo/landing/assets/membership.js

You are a senior full-stack engineer working on the TIKALGO project in /root/tikalgo.
The new public landing page is in /root/agent-kit/docs/tikalgo/landing/ (index.html + assets/).
Follow GEMINI.md rules. Work step by step; after each step show what you changed and wait for "OK" before
the next step. Report in Persian.

Step 0 — Audit (read only, change nothing). Find:
  - the frontend framework and how "/" and "/login" are served today (Nginx config, app ports);
  - the user model and roles, the DB type, the migrations tool, the mailer, any Telegram bot, the admin area;
  - the market data feeds (crypto exchange connector, MT5 or broker for forex, gold and stocks).
  Then write a short plan.

Step 1 — Deploy the landing:
  - Copy index.html and assets/ to /var/www/tikalgo-landing.
  - Configure Nginx exactly as INSTALL.md §9:
    - "/" goes to the landing;
    - /login, /admin and /api/* go to the app;
    - long cache for /assets, and woff2 as font/woff2;
    - rate-limit the membership endpoint.
  - If a CSP header exists, add the domains from INSTALL.md §9.
  - Run nginx -t before reload.

Step 2 — Membership backend (INSTALL.md §4):
  - Add a migration for the membership_applications table.
  - Build POST /api/membership/applications:
    - server-side validation: age 18–100, E.164 phones, Telegram @username 5–32 chars, email;
    - honeypot field "website" (if it is filled, return a silent success-like 202 but do not store);
    - responses: 201 {id,status:"pending"}, 409 duplicate pending (email or mobile), 422 {errors:{field:msg}}, 429 when more than 5 per hour per IP;
    - store the IP as a SHA-256 hash.
  - Notify the admin of every new application (Telegram bot to @ad_tikalgo if a bot exists, otherwise email).

Step 3 — Admin review page /admin/membership (admin role only):
  - List and filter applications, with contact buttons (mailto:, https://wa.me/<digits>, https://t.me/<username>).
  - Approve, in ONE DB transaction:
    - create the user (role member, chosen plan, PAPER mode);
    - generate a one-time activation / set-password link valid for 24h and send it by email (and Telegram if configured);
    - set status=approved, reviewed_by, reviewed_at and user_id.
  - Reject: a reason is required, and a polite message is sent.
  - Write an audit log for every approval and rejection.
  - Confirm that GET /register returns 404 (no public sign-up).

Step 4 — Market data endpoint (INSTALL.md §3):
  - Build GET /api/market/candles?symbol=&interval=&limit= returning Binance-kline arrays
    [[openTime,open,high,low,close,volume],...].
  - Use TIKALGO's real feeds only (crypto connector; MT5 or broker for EURUSD, XAUUSD, AAPL, SPY).
  - Allowed symbols: BTCUSDT, ETHUSDT, EURUSD, XAUUSD, AAPL, SPY. Allowed intervals: 1m, 5m, 15m, 1h.
  - Limit 500 candles, cache 5–10 s, and return 503 when a feed is down (never invent values).

Step 5 — Tika chat: connect POST /api/tika/chat {message,lang,history} -> {reply} to the read-only local
  Tika assistant. No trading actions and no investment advice. If it is not ready, leave the endpoint absent.

Step 6 — Verify and report in Persian, with evidence (commands and outputs):
  - The landing loads with no console errors and no horizontal scroll (EN/FA, desktop/mobile).
  - The hero shows a live BTC price with a source label, and the market tabs show live data.
  - Membership: an empty submit shows field errors; a valid submit returns "pending" with an id; a duplicate returns 409; a 6th request in one hour returns 429.
  - An admin approval creates an active PAPER account and sends the activation link.
  - /register returns 404.
  - List the changed files and backups, then git commit (no secrets).
```

---

## ۴. پرامپت B: تکمیل بریف ۳۰ آیتمی (مرحله‌به‌مرحله)
```text
@/root/agent-kit/docs/tikalgo/prompts/landing/LANDING_V2_SPEC.md
@/root/agent-kit/docs/tikalgo/landing/index.html
@/root/agent-kit/docs/tikalgo/landing/assets/landing.js
@/root/agent-kit/docs/tikalgo/landing/assets/landing.css

Follow GEMINI.md rules. Extend THIS landing; do not rebuild it from scratch. Keep the same files, design
tokens, and the self-hosted fonts TIKALGO Display/Sans/Sans FA/Mono. Colors: black, graphite and emerald,
with controlled gold details.
Work through stages L1 → L7 from the spec's status matrix. Do ONE stage per run. At the end of each stage, show
screenshots (desktop/tablet/mobile; EN/FA/AR), update the status matrix in the spec, and wait for my OK.

Rules:
- Only REAL features and REAL data: TIKALGO APIs (/api/market/*, /api/regime, /api/signals),
  or official public sources (Binance public market data, TradingView official widgets,
  alternative.me Fear & Greed). If a module or source does not exist yet, label it "coming soon"; never fake numbers.
- No profit claims and no AGI claims. The risk disclosure is always visible. Membership = application + admin approval.
- Performance:
  - LCP < 2.5 s on 4G;
  - lazy-load 3D and widgets;
  - respect prefers-reduced-motion;
  - no horizontal scroll;
  - correct RTL for FA/AR (Persian/Arabic text never uses the mono font or letter-spacing).
- 3D hero: use a rendered bull & bear video loop (WebM + MP4 + poster) or a GLB with Three.js
  (exact pinned version from cdnjs), with the camera moved by ScrollTrigger scrub. Ask me for the media files;
  do not ship low-quality procedural animals.
- Arabic: add 'ar' to T/DATA with a full translation, dir=rtl, and the font TIKALGO Sans FA.
- CMS: /admin/content and GET /api/public/content (sections, images, videos, translations, plans, links).
  The landing falls back to the built-in content.
- SEO:
  - JSON-LD (Organization, Product with offers, FAQPage);
  - sitemap.xml, robots.txt, hreflang en/fa/ar, canonical;
  - a 1200×630 OG image.
- Footer: real /terms, /privacy, /risk and /docs pages; the admin contact is Telegram @ad_tikalgo.
Report each stage in Persian.
```

---

## ۵. اگر از Gemini وب یا اپ استفاده می‌کنید (بدون دسترسی به سرور)
فایل‌های `INSTALL.md`، `index.html` و `assets/membership.js` را آپلود کنید. ساختار سرور (فریم‌ورک، پایگاه داده، پورت‌ها) را هم در جای مشخص‌شده بنویسید. بعد بچسبانید:
```text
You do not have server access. Using the attached INSTALL.md (TIKALGO landing), produce ready-to-paste code
for MY stack: [framework: ..., DB: ..., ORM/migrations: ..., mailer: ..., app port: ...].
Deliver, each as a complete file with its path:
1) the migration for membership_applications (INSTALL.md §4);
2) the POST /api/membership/applications handler with validation, honeypot, 201/409/422/429 and the IP hash;
3) the admin page /admin/membership with approve (one transaction: create a PAPER member, a 24h activation link,
   email/Telegram) and reject (with a reason), plus the audit log;
4) GET /api/market/candles returning Binance-kline arrays from my real feeds (503 if a feed is down);
5) the Nginx server block from INSTALL.md §9 with my ports;
6) a test checklist with curl commands.
Rules: no mock data, no fake success, no public /register, no free plan, LIVE off by default,
and no secrets in code (use env vars). Explain in Persian, and keep the code comments in English.
```

---

## نکات
- **انتخاب مدل:**
  - برای کار روی کد در Gemini CLI، مدل Pro را انتخاب کنید: دستور `/model` یا گزینهٔ `-m` هنگام اجرا.
  - Flash برای کارهای ساده کافی است.
- **دستورهای مفید داخل Gemini CLI:**
  - `/memory show`: دیدن قوانین `GEMINI.md`؛
  - `/chat save tikalgo-landing` برای ذخیرهٔ جلسه و `/chat resume tikalgo-landing` برای ادامهٔ آن؛
  - `/tools`: فهرست ابزارها.
- **حالت تأیید:** Gemini CLI قبل از اجرای دستور یا تغییر فایل اجازه می‌گیرد. حالت `--yolo` (تأیید خودکار همه‌چیز) را **روی سرور production استفاده نکنید**.
- پرامپت‌ها عمداً انگلیسی‌اند، چون مدل‌ها با دستور انگلیسی دقیق‌تر کد می‌نویسند. گزارش به فارسی خواسته شده است.
