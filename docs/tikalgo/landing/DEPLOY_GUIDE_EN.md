# TIKALGO Public Landing — Apply & Deploy Guide (www.tikalgoai.com)

This guide covers the whole job: copying the new public landing page into the TIKALGO project on
the owner's **private server `135.181.122.117`**, building the backend it needs, and deploying it to
**https://www.tikalgoai.com**. Everything happens on that server only: no GitHub, no `git clone`, and no
downloads from a repository. The only transfer is uploading `tikalgo-landing.zip` from your computer.
You can follow it by hand, or paste it into Claude Code or Gemini CLI running on the server
(see §9).

> **Path convention**
> - Paths that start with `/root/tikalgo/` are the TIKALGO project on the server.
> - `/root/tikalgo/public-landing/` is where the zip package is unpacked (§0).
> - Some places are marked **(verify)**. There, the real file name depends on the existing
>   TIKALGO code. Find the real path with the audit commands in §2 and use it.

---

## 0. Deployment package: `tikalgo-landing.zip` → server `135.181.122.117`
Everything you need is in **one archive**, `tikalgo-landing.zip`, plus its checksum file
`tikalgo-landing.zip.sha256`. Save both files on your computer.

Contents of the zip:
```
index.html
assets/landing.css  assets/landing.js  assets/membership.js  assets/tika-chat.js
assets/fonts/fonts.css  assets/fonts/*.woff2 (5)  assets/fonts/OFL-LICENSES.txt
assets/venues/*.png|*.svg (13 official exchange/broker logos)
assets/tika.jpg  assets/tika-512.jpg  assets/tikalgo-logo-on-dark.svg  assets/tikalgo-mark.svg  assets/favicon.svg  assets/bull-bear.jpg
DEPLOY_GUIDE_EN.md  INSTALL.md  INSTALL_PROMPT.md  INSTALL_PROMPT_GEMINI.md  LANDING_V2_SPEC.md
```
Only `index.html` and `assets/` are served to the public. The `.md` files are documentation and
must **not** be copied into the web root.

**Upload from your computer.** Run this in the folder that holds the two files.
- Windows: PowerShell or CMD.
- macOS/Linux: Terminal.
```bash
scp tikalgo-landing.zip tikalgo-landing.zip.sha256 root@135.181.122.117:/root/
```
If you prefer a graphical tool, WinSCP or FileZilla with SFTP work too:
- host `135.181.122.117`, port 22, user `root`;
- upload both files to `/root/`.

**On the server** (`ssh root@135.181.122.117`):
```bash
cd /root && sha256sum -c tikalgo-landing.zip.sha256          # must print: tikalgo-landing.zip: OK
command -v unzip >/dev/null || sudo apt-get install -y unzip
mkdir -p /root/tikalgo/public-landing
unzip -o /root/tikalgo-landing.zip -d /root/tikalgo/public-landing
ls /root/tikalgo/public-landing                              # index.html  assets/  *.md
```
> **Landing source path** in the rest of this guide: `/root/tikalgo/public-landing/`.
> To update later, upload the new zip the same way, unpack it again, and repeat §5.

---

## 1. Source files (what is being deployed)
Paths are relative to `/root/tikalgo/public-landing/`.

| File | Purpose |
|---|---|
| `index.html` | The landing page (EN/FA, RTL) |
| `assets/landing.css` | Styles; brand tokens live in `:root` |
| `assets/landing.js` | Texts (EN/FA), sections, **live market charts**, plans, motion |
| `assets/membership.js` | Membership application form → `POST /api/membership/applications` |
| `assets/tika-chat.js` | Tika chatbot → `POST /api/tika/chat`, with a built-in fallback knowledge base |
| `assets/fonts/fonts.css` + 5 × `*.woff2` + `OFL-LICENSES.txt` | Self-hosted fonts: TIKALGO Display / Sans / Sans FA / Mono |
| `assets/venues/*.png, *.svg` (13 files) | Official exchange and broker logos |
| `assets/tika.jpg`, `assets/tika-512.jpg` | Official Tika avatar |
| `assets/tikalgo-logo-on-dark.svg`, `assets/tikalgo-mark.svg`, `assets/favicon.svg` | TIKALGO logo and favicon |
| `assets/bull-bear.jpg` | Hero image |
| `INSTALL.md` | Full technical reference (Persian): API contracts, DB schema, admin flow |
| `DEPLOY_GUIDE_EN.md`, `INSTALL_PROMPT*.md`, `LANDING_V2_SPEC.md` | This guide, AI-agent prompts, and the 30-item v2 brief |

## 2. Target paths on the server
| What | Path on `135.181.122.117` |
|---|---|
| TIKALGO project | `/root/tikalgo/` |
| Landing source (from the zip, §0) | `/root/tikalgo/public-landing/` |
| Landing web root (served by Nginx) | `/var/www/tikalgo-landing/` → `index.html` + `assets/` |
| Nginx site config | `/etc/nginx/sites-available/tikalgoai.com` (verify), linked in `/etc/nginx/sites-enabled/` |
| Nginx rate-limit zone | `/etc/nginx/conf.d/tikalgo-ratelimit.conf` (new file) |
| Backups | `/root/backups/landing-<YYYYMMDD-HHMM>/` |
| Backend: membership API | `/root/tikalgo/<backend>/routes/membership.*` (verify the framework and folder) |
| Backend: admin review page | `/root/tikalgo/<frontend>/…/admin/membership.*` (verify) |
| Backend: market candles API | `/root/tikalgo/<backend>/routes/market_candles.*` (verify) |
| DB migration | `/root/tikalgo/<backend>/migrations/<timestamp>_membership_applications.*` (verify the tool) |
| Agent rules file | `/root/tikalgo/CLAUDE.md` (Claude Code) or `/root/tikalgo/GEMINI.md` (Gemini CLI) |

Run these audit commands to fill in the paths marked (verify):
```bash
cd /root/tikalgo
ls -la; cat package.json 2>/dev/null | head -40; ls requirements*.txt pyproject.toml 2>/dev/null
grep -rIl --exclude-dir={node_modules,.git,venv} -E "app\.(get|post)|@app\.|router\.|APIRouter|express\(" . | head -20
ls /etc/nginx/sites-enabled/; grep -rn "server_name" /etc/nginx/sites-enabled/
grep -rn "proxy_pass" /etc/nginx/sites-enabled/          # → app and API ports
ss -ltnp | grep -E "node|python|uvicorn|gunicorn|pm2"     # running services
pm2 ls 2>/dev/null; systemctl list-units --type=service | grep -i tikalgo
```

---

## 3. Files on the server
The package is already unpacked in `/root/tikalgo/public-landing/` (§0). Check it:
```bash
ls /root/tikalgo/public-landing/index.html /root/tikalgo/public-landing/assets/
```

## 4. Back up first
```bash
TS=$(date +%Y%m%d-%H%M); B=/root/backups/landing-$TS; mkdir -p $B
cp -a /etc/nginx/sites-available $B/nginx-sites-available
[ -d /var/www/tikalgo-landing ] && cp -a /var/www/tikalgo-landing $B/
tar --exclude=node_modules --exclude=venv --exclude=.venv --exclude=public-landing -czf $B/tikalgo-src.tgz -C /root tikalgo   # full project backup
echo "Backup: $B"
```

## 5. Deploy the static landing
```bash
sudo mkdir -p /var/www/tikalgo-landing
SRC=/root/tikalgo/public-landing          # unpacked zip (§0)
sudo rsync -a --delete "$SRC/index.html" "$SRC/assets" /var/www/tikalgo-landing/
sudo chown -R www-data:www-data /var/www/tikalgo-landing
ls -R /var/www/tikalgo-landing | head -50
```

### 5.1 Nginx: rate-limit zone
Create `/etc/nginx/conf.d/tikalgo-ratelimit.conf`:
```nginx
limit_req_zone $binary_remote_addr zone=membership:10m rate=5r/h;
```

### 5.2 Nginx: site config
Edit `/etc/nginx/sites-available/tikalgoai.com` **(verify the file name)**:
- Keep the existing `listen 443 ssl` and `ssl_certificate*` lines.
- Keep every existing app route.
- Replace `<APP_PORT>` and `<API_PORT>` with the real ports found in §2.
```nginx
server {
    server_name tikalgoai.com www.tikalgoai.com;
    # (keep existing: listen 443 ssl; ssl_certificate ...; ssl_certificate_key ...;)

    root /var/www/tikalgo-landing;
    index index.html;

    # Public landing
    location = / { try_files /index.html =404; }
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        types { text/css css; application/javascript js; image/svg+xml svg; image/png png;
                image/jpeg jpg; font/woff2 woff2; text/plain txt; }
    }

    # Existing TIKALGO app (unchanged)
    location /login { proxy_pass http://127.0.0.1:<APP_PORT>; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }
    location /admin { proxy_pass http://127.0.0.1:<APP_PORT>; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }

    # Membership endpoint with rate limit
    location = /api/membership/applications {
        limit_req zone=membership burst=3 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:<API_PORT>;
        proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Real-IP $remote_addr;
    }
    location /api/ { proxy_pass http://127.0.0.1:<API_PORT>; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }

    # ...keep all other existing app locations here (dashboard, websocket, etc.)
}

# Redirect the bare domain to www (if not already configured)
# server { listen 443 ssl; server_name tikalgoai.com; return 301 https://www.tikalgoai.com$request_uri; }
```
If the site sends a **Content-Security-Policy** header, add these sources to it:
```
script-src  'self' https://cdnjs.cloudflare.com https://s3.tradingview.com;
connect-src 'self' https://data-api.binance.vision wss://data-stream.binance.vision;
frame-src   https://*.tradingview.com https://*.tradingview-widget.com;
font-src    'self';
img-src     'self' data: https:;
```

### 5.3 Apply
```bash
sudo nginx -t && sudo systemctl reload nginx
curl -sI https://www.tikalgoai.com/ | head -5                    # expect 200
curl -sI https://www.tikalgoai.com/assets/fonts/fonts.css | head -3
curl -s  https://www.tikalgoai.com/ | grep -o "<title>[^<]*"
```
Add the HTTPS certificate if it is missing:
`sudo certbot --nginx -d tikalgoai.com -d www.tikalgoai.com`.

---

## 6. Backend inside `/root/tikalgo` (required for the form and the live data)
Use the project's existing framework, ORM, mailer and auth. Do not add a second user system.

### 6.1 Migration: `migrations/<timestamp>_membership_applications.*` (verify)
Table `membership_applications` with these columns:
- `id` (e.g. `A-1042`), `full_name`, `age` (18–100), `email`, `mobile` (E.164), `whatsapp`, `telegram`;
- `plan` (`weekly` | `monthly` | `yearly`), `preferred_contact`, `lang`;
- `status` (`pending` | `approved` | `rejected`), `reject_reason`, `admin_notes`;
- `ip_hash` (SHA-256), `user_agent`, `created_at`, `reviewed_by`, `reviewed_at`, `user_id`.

Add unique partial indexes on lower(email) and on mobile, `WHERE status='pending'`.
The full SQL is in `INSTALL.md` §4.

### 6.2 API: `POST /api/membership/applications` (route file `routes/membership.*`, verify)
Request body, as sent by `assets/membership.js`:
```json
{ "full_name":"…", "age":29, "email":"…", "mobile":"+989123456789", "whatsapp":"+989123456789",
  "telegram":"@user", "plan":"yearly", "preferred_contact":"telegram", "lang":"fa",
  "consent_terms":true, "consent_risk":true, "website":"" }
```
| Response | When |
|---|---|
| `201 {"id":"A-1042","status":"pending"}` | Stored |
| `409` | A pending application already exists for this email or mobile |
| `422 {"errors":{"email":"…"}}` | Server-side validation failed |
| `429` | Rate limit hit |
| Silently ignore (do not store) | The `website` honeypot is filled |

On every new application, notify the admin (Telegram **@ad_tikalgo** through the bot, or email).

### 6.3 Admin page: `/admin/membership` (admin role only, verify the frontend folder)
- **List and filter** applications. Contact buttons for each: `mailto:`, `https://wa.me/<digits>`,
  `https://t.me/<username>`.
- **Approve**, in one DB transaction:
  1. create the user (role `member`, chosen plan, trading mode **PAPER**);
  2. create a one-time activation / set-password link valid for 24h and send it by email (and Telegram);
  3. set `status=approved`, `reviewed_by`, `reviewed_at` and `user_id`.
- **Reject** with a required reason, and send a polite message.
- **Audit log** every approval and rejection.
- Confirm there is **no public `/register`**: it must return 404.

### 6.4 API: `GET /api/market/candles` (route file `routes/market_candles.*`, verify)
- Query: `?symbol=BTCUSDT&interval=15m&limit=64`.
- Response: Binance kline arrays, `[[openTime, open, high, low, close, volume], …]`.
- Symbols: `BTCUSDT`, `ETHUSDT` (exchange connector); `EURUSD`, `XAUUSD`, `AAPL`, `SPY` (MT5 or broker).
- Intervals: `1m`, `5m`, `15m`, `1h`. Maximum 500 candles. Cache for 5–10 s.
- When a feed is down, return **503**. Never return invented values.

If this endpoint is not built, the page still works:
- crypto falls back to Binance public market data;
- forex, metals and stocks fall back to the official TradingView widget.

### 6.5 API: `POST /api/tika/chat` (optional)
- Request `{message, lang, history}`, response `{reply}`.
- Connect it to the local, read-only Tika assistant: no trading actions and no investment advice.
- If it is absent, the page uses its built-in answers.

### 6.6 Restart the app
Restart with the project's own process manager, for example `pm2 restart <app>` or
`sudo systemctl restart <tikalgo-service>` (verify the name).

---

## 7. Verification checklist (www.tikalgoai.com)
```bash
# Page and assets
curl -s -o /dev/null -w "%{http_code}\n" https://www.tikalgoai.com/                      # 200
curl -s -o /dev/null -w "%{http_code}\n" https://www.tikalgoai.com/assets/landing.js      # 200
curl -s -o /dev/null -w "%{http_code}\n" https://www.tikalgoai.com/register              # 404

# Membership API
curl -s -X POST https://www.tikalgoai.com/api/membership/applications \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"Test User","age":30,"email":"test@example.com","mobile":"+10000000000","whatsapp":"+10000000000","telegram":"@test_user","plan":"monthly","preferred_contact":"email","lang":"en","consent_terms":true,"consent_risk":true,"website":""}'
#   → 201 {"id":"…","status":"pending"};  same request again → 409;  6th request in one hour → 429

# Market data
curl -s "https://www.tikalgoai.com/api/market/candles?symbol=BTCUSDT&interval=15m&limit=3"   # 3 real candles
```
In a browser (desktop and mobile, EN and FA):
- [ ] No console errors and no horizontal scroll.
- [ ] Hero: a live BTC/USDT price with its source label (`TIKALGO` or `Binance`).
- [ ] The market tabs (Crypto, Forex, Gold & Metals, US Stocks, ETFs) show live charts.
- [ ] Membership form:
  - an empty submit shows field errors;
  - a valid submit shows "pending admin approval" with an ID;
  - without the backend it shows a real error that mentions @ad_tikalgo.
- [ ] Admin approval creates an active **PAPER** account and sends the activation link.
- [ ] The footer and the contact links open the official TIKALGO channels.

## 8. Rollback
```bash
B=/root/backups/landing-<YYYYMMDD-HHMM>
sudo cp -a $B/nginx-sites-available/* /etc/nginx/sites-available/
[ -d $B/tikalgo-landing ] && sudo rsync -a --delete $B/tikalgo-landing/ /var/www/tikalgo-landing/
sudo rm -f /etc/nginx/conf.d/tikalgo-ratelimit.conf
sudo nginx -t && sudo systemctl reload nginx
# backend: restore the project files from the backup (run the migration down first, only after review)
# cd /root && tar -xzf $B/tikalgo-src.tgz
```

## 9. One-paste prompt for an AI agent on the server (Claude Code or Gemini CLI)
Run the agent from `/root/tikalgo`, then paste:
```text
You are running on my private server 135.181.122.117. Do not use GitHub and do not clone or download anything.
The deployment package /root/tikalgo-landing.zip was uploaded by me (scp).
Verify it with sha256sum -c /root/tikalgo-landing.zip.sha256 and unpack it into /root/tikalgo/public-landing/.
Then read /root/tikalgo/public-landing/DEPLOY_GUIDE_EN.md and /root/tikalgo/public-landing/INSTALL.md.
Apply and deploy the TIKALGO public landing page to https://www.tikalgoai.com exactly as the guide describes:
§0 package check → §2 audit (fill in every "(verify)" path and show them to me) → §4 backup → §5 static deploy and Nginx →
§6 backend in /root/tikalgo (migration, POST /api/membership/applications, /admin/membership approval flow,
GET /api/market/candles, optional /api/tika/chat) → §7 verification.
Rules:
- Keep the existing architecture and reuse the existing auth, DB, mailer and admin code.
- No mock data and no fake success.
- No public /register and no free plan; accounts are created only on admin approval; new members start in PAPER; LIVE stays OFF.
- Never print or commit secrets.
- Ask before destructive commands.
- Stop after each section, show the evidence (commands and outputs), and wait for my "OK".
- Back up every file before you change it (/root/backups/landing-<timestamp>/).
  If /root/tikalgo is a local git repository, commit locally with clear messages; never add a remote and never push.
- Report to me in Persian.
```
