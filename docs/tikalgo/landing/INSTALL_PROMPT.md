# پرامپت نصب برای Claude Code (روی سرور، `/root/tikalgo`)

> نسخهٔ Gemini (Gemini CLI یا وب): [`INSTALL_PROMPT_GEMINI.md`](INSTALL_PROMPT_GEMINI.md)

دو پرامپت آماده است:
- **A** صفحهٔ فعلی را نصب می‌کند و بک‌اند لازمش را می‌سازد.
- **B** بریف ۳۰ آیتمی v2 را مرحله‌به‌مرحله کامل می‌کند.

هر کدام را جدا در Claude Code بچسبانید.

**پیش‌نیاز:** فقط سرور شخصی شما `135.181.122.117`. نه GitHub و نه `git clone` لازم است.
1. فایل‌های `tikalgo-landing.zip` و `tikalgo-landing.zip.sha256` را از کامپیوتر خودتان آپلود کنید:
   ```bash
   scp tikalgo-landing.zip tikalgo-landing.zip.sha256 root@135.181.122.117:/root/
   ```
   (یا با WinSCP یا FileZilla: SFTP، پورت 22، کاربر root، پوشهٔ `/root/`)
2. روی سرور (`ssh root@135.181.122.117`):
   ```bash
   cd /root && sha256sum -c tikalgo-landing.zip.sha256        # tikalgo-landing.zip: OK
   mkdir -p /root/tikalgo/public-landing
   unzip -o /root/tikalgo-landing.zip -d /root/tikalgo/public-landing
   ```
همهٔ مسیرهای پایین به `/root/tikalgo/public-landing/` اشاره دارند. راهنمای کامل انگلیسی: `DEPLOY_GUIDE_EN.md`.

---

## A. نصب صفحهٔ عمومی + بک‌اند عضویت و دادهٔ بازار
```text
You are working on the TIKALGO project at /root/tikalgo on my private server 135.181.122.117.
Do not use GitHub; do not clone, pull or download anything; never add a git remote or push. The new public landing page is in
/root/tikalgo/public-landing/ (index.html + assets/). Read its INSTALL.md first, then do the
following. Report to me in Persian.

Fixed rules (never break):
- Keep the existing architecture. Reuse existing auth, user, DB, mailer, and admin code. Never duplicate them.
- No mock data, no fake success, no UI without a backend. LIVE trading stays OFF by default;
  new members start in PAPER. The AI never bypasses the Risk Engine or the Execution Gate.
- No public self-registration and no free plan. Accounts are created ONLY when an admin approves
  a membership application.
- Never print, log, or commit secrets. Back up any file you change.

Steps:
0. Audit: find the frontend framework and how / and /login are served today (Nginx and app ports),
   the user model and roles, the DB, the mailer, any Telegram bot, the admin area, and the market data feeds
   (crypto exchange + MT5/broker). Write a short plan and wait for my OK if anything is ambiguous.

1. Landing deploy:
   - Serve docs/tikalgo/landing (index.html + assets/) at https://www.tikalgoai.com/ exactly as
     INSTALL.md §9 describes (or as the root route of the existing frontend if it has one; keep the design 1:1).
   - Keep /login, /admin and /api/* proxied to the app.
   - Serve fonts as font/woff2 with long cache.
   - If a CSP header exists, allow the domains in INSTALL.md §9.

2. Membership backend (INSTALL.md §4):
   - Create the membership_applications table (migration).
   - Build POST /api/membership/applications with:
     - server-side validation (age 18–100, E.164 phones, Telegram @username 5–32, email);
     - honeypot check;
     - responses 201 {id,status:'pending'}, 409 duplicate pending, 422 {errors}, and 429 rate limit (5/hour/IP);
     - the IP stored as a hash.
   - Notify admins of every new application (Telegram bot or email).

3. Admin review (/admin/membership, admin role only):
   - List and filter applications, with contact buttons (mailto, wa.me, t.me).
   - Approve, in one transaction:
     - create the user (role member, chosen plan, PAPER mode);
     - send a one-time 24h activation / set-password link by email (and Telegram if configured);
     - set status=approved, reviewed_by/at and user_id.
   - Reject with a required reason and send a polite message.
   - Write an audit log for every approval and rejection.
   - Make sure there is NO public /register route.

4. Market data endpoint (INSTALL.md §3):
   - Build GET /api/market/candles?symbol=&interval=&limit= returning Binance-kline arrays
     [[openTime,open,high,low,close,volume],...].
   - Source the data from TIKALGO's real feeds: crypto from the exchange connector, and EURUSD/XAUUSD/AAPL/SPY from MT5 or the broker.
   - Cache for 5–10 s and limit to 500 candles. Allow at least BTCUSDT, ETHUSDT, EURUSD, XAUUSD, AAPL and SPY.
   - Never return invented values: if a feed is down, return 503.

5. Tika chat: connect POST /api/tika/chat {message,lang,history} -> {reply} to the read-only local
   Tika assistant (master prompt §14), with no trading actions and no investment advice. If it is not ready, leave
   the endpoint absent (the page has a built-in fallback).

6. Verify and report in Persian:
   - the landing loads with no console errors and no horizontal scroll (EN and FA, desktop and mobile);
   - the hero shows a live BTC price with its source label, and the market tabs show live data;
   - the membership form shows a real error without the backend and "pending" with it;
   - an admin approval creates an active PAPER account and sends the activation message;
   - /register returns 404;
   - Lighthouse scores (Performance, Accessibility, SEO);
   - the list of changed files and the backups.
If /root/tikalgo is a local git repository, commit locally with a clear message (never push). Never store secrets in files you commit.
```

---

## B. تکمیل بریف v2 (۳۰ آیتم)، مرحله‌به‌مرحله
بریف کامل و ماتریس وضعیت در `LANDING_V2_SPEC.md` (داخل زیپ) آمده است.

```text
Read /root/tikalgo/public-landing/LANDING_V2_SPEC.md (brief + status matrix + fixed rules)
and the current landing in /root/tikalgo/public-landing/. Extend THIS landing (same files,
same design system, the self-hosted TIKALGO fonts, and the colors black/graphite/emerald with controlled gold
details). Do not rebuild it from scratch. Work in the stages L1 → L7 from the spec. Do one stage per run, and at the end of each stage
show me screenshots (desktop, tablet, mobile; EN/FA/AR) and wait for my OK.

Rules:
- Only REAL features and REAL data. Each section shows live data from TIKALGO APIs
  (/api/market/*, /api/regime, /api/signals ...) or from official public sources (Binance public
  market data, TradingView official widgets, alternative.me Fear & Greed).
  - If a module or data source does not exist yet, label it honestly ("coming soon") and never fake numbers.
- No profit claims and no AGI claims. The risk disclosure is always visible.
- Membership stays application + admin approval. There is no free plan.
- Performance:
  - LCP < 2.5 s on 4G;
  - lazy-load heavy parts (3D, widgets);
  - respect prefers-reduced-motion;
  - no horizontal scroll;
  - RTL correct for FA and AR (Persian/Arabic text never uses the Latin mono font or letter-spacing).
- 3D hero (items 1–2): use a professionally rendered bull & bear video loop (WebM + MP4 + poster)
  or a GLB model with Three.js (pin it to an exact version from cdnjs). Move the camera with ScrollTrigger scrub.
  Ask me for the video or model files. Do not ship low-quality procedural animals.
- Arabic (item 27): add an 'ar' language to T/DATA (full translation, dir=rtl, font TIKALGO Sans FA).
- CMS (item 28): /admin/content backed by GET /api/public/content, which manages sections, images, videos,
  translations, plans and links. The landing reads it and falls back to the built-in content.
- SEO (item 29):
  - JSON-LD (Organization, Product with offers, FAQPage);
  - sitemap.xml and robots.txt;
  - hreflang en/fa/ar;
  - canonical URL;
  - a dedicated 1200×630 OG image.
- Footer (item 30): real pages /terms, /privacy, /risk, /docs, and contacts. WhatsApp: ask me for the official number.
Report each stage in Persian, with the status matrix updated.
```

---

## C. فقط به‌روزرسانی فایل‌های صفحه (بعد از تغییرات بعدی)
زیپ جدید را مثل پیش‌نیاز با `scp` به `/root/` آپلود کنید، بعد:
```bash
cd /root && sha256sum -c tikalgo-landing.zip.sha256
unzip -o /root/tikalgo-landing.zip -d /root/tikalgo/public-landing
sudo rsync -a --delete /root/tikalgo/public-landing/index.html /root/tikalgo/public-landing/assets /var/www/tikalgo-landing/
sudo nginx -t && sudo systemctl reload nginx
```
