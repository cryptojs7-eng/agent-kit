# TikAlgo — پرامپت اجرایی جامع و ادغام‌شده (v4)

> **این فایل جایگزین همه‌ی پرامپت‌های قبلی است.** پرامپت Master نسخه‌ی ۲، پرامپت‌های فازبندی‌شده، مشخصات کامل **AI Active Signals**، مشخصات کامل **Trading Terminal UI** (فاز T)، نصب **AI آفلاین**، **Graphify**، **UI/UX Pro Max** و سیستم **حافظه‌ی دائمی پروژه** در آن ادغام شده‌اند.
> مرجع معماری: [`TIKALGO_SUPER_PLAN.md`](./TIKALGO_SUPER_PLAN.md) · قالب‌های آماده: [`bootstrap/`](./bootstrap/)

---

## 🧭 روش استفاده (فقط همین ترتیب)

| مرحله | چه زمانی | چه چیزی بدهید |
|---|---|---|
| **۰. Bootstrap** | **فقط یک بار برای همیشه** | بخش ۱ |
| **شروع هر جلسه** | اول هر بار که `claude` را باز می‌کنید | بخش ۲ (Resume Prompt، کوتاه) |
| **فاز A: بررسی و گزارش** | یک بار | بخش ۳ |
| **فاز B: مقایسه با پرامپت و برنامه‌ی ارتقا** | یک بار | بخش ۴ |
| **فاز C: ساخت AI Active Signals** (S1 تا S14) | هر بار یک زیرفاز | بخش ۵ |
| **فاز T: Trading Terminal UI** (T0 تا T11) | هر بار یک زیرفاز؛ T6 بعد از S1 تا S10 | بخش ۵T |
| **فاز D به بعد: ابرپروژه** | هر بار یک فاز | بخش ۶ |
| **پایان هر جلسه** | همیشه | بخش ۷ (Save State) |

> 💡 **اصل حافظه‌ی دائمی:** بعد از Bootstrap، Claude Code **هرگز کل پروژه را از اول نمی‌خواند**. هر جلسه فقط `CLAUDE.md`، `docs/state/TIKALGO_STATE.md`، `graphify-out/GRAPH_REPORT.md` و `docs/state/NEXT.md` را می‌خواند و از همان نقطه ادامه می‌دهد. برای جزئیات کد از گراف Graphify پرس‌وجو می‌کند، نه از خواندن کورکورانه‌ی فایل‌ها.

---

## 1. BOOTSTRAP — یک بار برای همیشه

### 1.1 نصب ابزارها (روی سرور، در `/root/tikalgo`)

```bash
cd /root/tikalgo

# --- Graphify: گراف دانش کد (حافظه‌ی ساختاری پروژه) ---
uv tool install graphifyy          # یا: pipx install graphifyy   (نام پکیج با دو y)
graphify install                   # اسکیل /graphify و هوک‌های Claude Code را نصب می‌کند (اول تنظیماتش را بخوانید)

# --- UI/UX Pro Max (اگر هنوز نصب نیست؛ v2.13.0 قبلاً نصب شده) ---
# داخل Claude Code:
#   /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
#   /plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# --- AI آفلاین (Ollama) ---
curl -fsSL https://ollama.com/install.sh | sh
# فقط روی localhost گوش بدهد (امنیت): در systemd مقدار OLLAMA_HOST=127.0.0.1:11434 را تنظیم کنید
sudo systemctl edit ollama   # [Service] Environment="OLLAMA_HOST=127.0.0.1:11434"
sudo systemctl restart ollama
# مدل‌ها (بسته به RAM/GPU سرور یکی را انتخاب کنید):
ollama pull qwen2.5:7b-instruct        # عمومی و سبک (~5GB)؛ برای Reasoning یا Fallback
ollama pull llama3.1:8b                # جایگزین
ollama pull nomic-embed-text           # embedding برای RAG، حافظه و ژورنال
# تست:
curl -s http://127.0.0.1:11434/api/tags
```

> ⚠️ **Ollama را هرگز روی اینترنت باز نکنید.** پورت 11434 فقط روی 127.0.0.1 یا شبکه‌ی داخلی Docker باشد. اگر سرور GPU ندارد، مدل‌های ۷ و ۸ میلیارد پارامتری روی CPU کندند (چند ثانیه برای هر پاسخ). پس آن‌ها را برای **Fallback و Reasoning آفلاین** استفاده کنید، نه برای تصمیم‌گیری لحظه‌ای. مدل تصمیم همچنان **TypeSafe/Jev** است.

### 1.2 اسکیل‌ها و مراجع (فقط مطالعه یا اقتباس؛ هیچ اسکیلی مستقیم در production نصب نمی‌شود)
```bash
mkdir -p /root/tikalgo-refs && cd /root/tikalgo-refs
git clone --depth 1 https://github.com/buberlo/jev-trader          # MIT
git clone --depth 1 https://github.com/zadescoxp/Jev-Trades         # Apache-2.0
git clone --depth 1 https://github.com/Jev-trading/Jev-trading      # MIT
git clone --depth 1 https://github.com/naimkatiman/alpha-scanner    # MIT
git clone --depth 1 https://github.com/Manjussha/AI-trader          # MIT
git clone --depth 1 https://github.com/freqtrade/freqtrade          # GPL-3.0 → فقط ایده، کد کپی نشود
git clone --depth 1 https://github.com/agiprolabs/claude-trading-skills
git clone --depth 1 https://github.com/TauricResearch/TradingAgents
```
> `tikalgo-refs` **خارج از مخزن** است تا کد بیرونی وارد پروژه نشود. Claude Code فقط الگوها را می‌خواند.

### 1.3 پرامپت Bootstrap (یک بار به Claude Code بدهید)
```text
BOOTSTRAP (one-time). Goal: create a permanent project memory so future sessions never
re-read the whole repository.

1) Run /graphify on /root/tikalgo to build the knowledge graph (outputs in graphify-out/).
   Exclude node_modules, .venv, dist, build, data dumps and secrets (.env*).
2) Create/merge these files (copy templates from docs/tikalgo/bootstrap/ if present; if a
   CLAUDE.md already exists, MERGE — never delete existing instructions):
   - CLAUDE.md (root): session protocol + hard rules + where state lives.
   - docs/state/TIKALGO_STATE.md: single source of truth for current status (modules, phase,
     what works, what is broken, credentials needed, last verified tests, open risks).
   - docs/state/NEXT.md: the exact next step(s) with acceptance criteria.
   - docs/state/DECISIONS.md: append-only log of architectural decisions (ADR-lite).
   - docs/state/CHANGELOG_AI.md: append-only log of every session (date, phase, files, tests).
   - docs/state/MODULE_MAP.md: module → paths → owners → tests → health endpoint
     (generated from the Graphify graph; keep it short, link to graph nodes).
3) Copy docs/tikalgo/TIKALGO_SUPER_PLAN.md and this prompt file into docs/ if missing.
4) Do NOT change application code during bootstrap. Commit only docs/state, CLAUDE.md and
   graphify config (never commit secrets or large graph artifacts if they contain secrets).
5) Report in Persian: what was created, graph stats, and confirm the resume protocol works by
   simulating a fresh session (read only the state files + GRAPH_REPORT and summarize).
```

---

## 2. RESUME PROMPT — اول هر جلسه (کوتاه)

```text
Resume TikAlgo. Follow CLAUDE.md session protocol strictly:
1) Read ONLY: CLAUDE.md, docs/state/TIKALGO_STATE.md, docs/state/NEXT.md,
   graphify-out/GRAPH_REPORT.md (and the last entry of docs/state/CHANGELOG_AI.md).
2) Do NOT scan the whole repository. For code details query the Graphify graph and open
   only the files it points to. If the graph is stale (files changed since last update),
   run an incremental Graphify update first.
3) Summarize current state and the next step in Persian, then continue from NEXT.md.
All MASTER RULES in section 2.1 of docs/TIKALGO_MASTER_PROMPT.md apply.
```

### 2.1 MASTER RULES (در `CLAUDE.md` هم کپی می‌شوند)
```text
ROLE: Lead architect & principal engineer of the EXISTING TikAlgo repo (/root/tikalgo,
tikalgoai.com). Architecture reference: docs/TIKALGO_SUPER_PLAN.md.

HARD RULES
- Existing-first: never rewrite, never build a parallel/toy architecture, never delete or
  rewrite healthy features. Extend existing modules: AI, Scanner, Watchlist, Strategies,
  Risk, Paper/Live, Orders, Positions, TP/SL, Trailing, exit_advisor, Kill Zones,
  llm_engine, 9router (AI model routing), TypeSafe/Jev, Exchange adapters, Redis,
  PostgreSQL, WebSocket, billing, notifications, on-chain, reports, settings.
- NO mocks, NO placeholders, NO fake success, NO UI without a working backend.
- Pipeline invariant:
  MARKET DATA → SCANNER → TECHNICAL/SMC/ICT/OI/FUNDING/CVD/LIQUIDITY/NEWS/WHALE → AI →
  SIGNAL → WATCHLIST → STRATEGY → RISK → POSITION SIZE → PAPER/LIVE GATE → ORDER →
  POSITION MANAGER → TP/SL → BREAKEVEN → TRAILING → PARTIAL CLOSE → EXIT → JOURNAL/PERFORMANCE
- AI never sends orders. AI outputs structured decisions only. Only the Execution Gate sends
  orders, after Strategy, Account, Risk, Position-Size and Order validation.
- AI can never bypass or weaken the Risk Engine. On open positions AI may only TIGHTEN stops
  (HOLD / TIGHTEN_STOP / TAKE_PARTIAL / EXIT / NO_CHANGE); any risk increase requires an
  explicit strategy/risk permission.
- PAPER is the default. LIVE trading must NOT be enabled by you. LIVE AUTO requires explicit
  user confirmation in the UI + all gates green. Never send a real order during tests.
- TypeSafe/Jev = DECISION MODEL (structured judgments), NOT a chat model.
- Everything configurable from Settings (DB-backed, per user), not from .env or code.
- Secrets: API/private keys encrypted at rest, masked in UI, never in frontend, logs or
  plaintext DB. AI/LLM processes have NO access to credentials.
- External code: license check first; MIT/Apache adapt with attribution; GPL (freqtrade)
  ideas only; isolate LGPL/AGPL. No third-party skill in production without scan + sandbox +
  paper test + user approval.
- Destructive or production actions (deploy, DB drop/migration on prod, RUNTIME_ENABLED,
  firewall/secrets changes) need explicit user "OK".

WORKING METHOD
1) Restate scope, files to touch (via Graphify), risks, test plan.
2) Tests first; minimal incremental changes; feature flags default OFF.
3) Run unit + integration + build + typecheck/lint; the existing 1400+ tests must stay green.
4) Update docs/state/* (STATE, NEXT, CHANGELOG_AI, DECISIONS) and refresh Graphify.
5) End with a Persian PHASE REPORT: changed files, migrations, new deps (+license), tests &
   results, what is VERIFIED vs not, remaining risks, next step.
Report status only with: ✅ VERIFIED · ⚠️ REQUIRES CREDENTIAL · ⚠️ REQUIRES USER ACTION ·
❌ FAILED · ⏳ NOT IMPLEMENTED. Only mark VERIFIED what was actually tested end-to-end.
Always report to the user in Persian; keep code/commits/identifiers in English.
```

---

## 3. فاز A — بررسی کامل پروژه‌ی فعلی و گزارش (یک بار)

```text
PHASE A — FULL AUDIT (read-only for application code).
Using the Graphify graph (open files only as needed), inspect and document:
- Repo tree, services, docker-compose topology, CI, test suite (run it, record results).
- PostgreSQL schema & migrations; Redis keys/streams/pubsub; WebSocket channels.
- Market data ingestion & freshness (incl. runtime_stale history).
- Scanner, AI layer (llm_engine, 9router routing, TypeSafe/Jev integration and how it is
  currently used — decision vs chat), Signals, Watchlist, Strategies (CRUD? storage?),
  Risk Engine (rules, where enforced), Position sizing, Paper vs Live separation, Orders,
  Positions, TP/SL, Breakeven, Trailing, Partial close, exit_advisor, Journal/Performance,
  Settings storage, Exchange adapters & their real capabilities (min qty/step/tick/min
  notional/leverage/margin/order types), credential storage & encryption.
- Frontend: existing AI/Signals/Scanner/Watchlist/Positions screens and which are backed by
  real APIs vs static.
- Security quick-scan (gitleaks, plaintext keys, exposed ports, unknown cron/systemd —
  server was compromised on 2026-09-13).
Produce:
- docs/state/AUDIT_REPORT_FA.md (Persian): per area → status (✅/⚠️/❌/⏳), evidence (file
  paths, endpoints, tests), gaps, bugs, risks.
- docs/TIKALGO_ARCHITECTURE_BASELINE.md with Mermaid diagrams of the CURRENT pipeline.
- Update docs/state/TIKALGO_STATE.md and MODULE_MAP.md.
No application code changes. Report in Persian and wait.
```

---

## 4. فاز B — مقایسه با پرامپت و برنامه‌ی ارتقا (یک بار)

```text
PHASE B — GAP ANALYSIS & UPGRADE PLAN.
Compare AUDIT_REPORT_FA.md against (1) section 5 of docs/TIKALGO_MASTER_PROMPT.md (AI Active
Signals S1–S14) and (2) docs/TIKALGO_SUPER_PLAN.md (M01–M50).
Also study ONLY the patterns in /root/tikalgo-refs (see §5.0 pattern map) — never copy GPL code.
Produce docs/state/UPGRADE_PLAN_FA.md (Persian):
- Gap matrix: requirement → existing component to reuse → change needed → risk → tests.
- Ordered work packages for S1–S14 sized to fit one session each, with acceptance criteria,
  DB migrations needed, API contracts, UI screens, and feature flags.
- Explicit list of what will NOT be touched (healthy features).
Update docs/state/NEXT.md with S1. Wait for my approval before writing code.
```

---

## 5. فاز C — AI ACTIVE SIGNALS (کامل و واقعی)

### 5.0 نقشه‌ی الگوهای اقتباسی (فقط الگو، نه کپی کد)

| مرجع | لایسنس | الگوی قابل اقتباس برای TikAlgo |
|---|---|---|
| [buberlo/jev-trader](https://github.com/buberlo/jev-trader) | MIT | **Jev به‌عنوان Decision Model:** کد featureها را به‌صورت قطعی می‌سازد (snapshot حدود ۴۰۰ توکن) و Jev **بردار احتمال تایپ‌شده** برمی‌گرداند (رژیم، جهت، جریان سمی، استرس نقدینگی و...). Policy Engine با آستانه‌ها تصمیم می‌گیرد. **کالیبراسیون Platt**. **Fallback Ladder:** عادی ← اندازه‌ی کمتر ← نگه‌داشتن state کهنه ← قضاوت قطعی ← Circuit Breaker. ریسک hard-coded با حق وتو و Kill Switch. لاگ JSONL. Kelly کسری. |
| [zadescoxp/Jev-Trades](https://github.com/zadescoxp/Jev-Trades) | Apache-2.0 | ارسال اندیکاتورهای MTF از **کندل‌های بسته‌شده** به Jev؛ TP/SL بر اساس **Jev + ATR + پروفایل ریسک** (Conservative، Balanced، Aggressive)؛ Paper پیش‌فرض؛ لاگ درخواست و پاسخ AI در `agent_log.jsonl`؛ میز معامله‌ی دستی کنار ایجنت. |
| [Jev-trading/Jev-trading](https://github.com/Jev-trading/Jev-trading) | MIT | بلوک‌های Trigger ← AI Analyzer ← **فیلتر Confidence** ← Action؛ Safety Net (سقف افت روزانه، سقف حجم، بستن اجباری)؛ ایزوله بودن چند استراتژی؛ رمزنگاری محلی کلیدها. |
| [naimkatiman/alpha-scanner](https://github.com/naimkatiman/alpha-scanner) | MIT | اسکنر MTF (M15/H1/H4/D1) هر ۳۰ ثانیه؛ امتیاز ۶ فاکتوری؛ BUY/SELL/NEUTRAL با confidence؛ TP/SL با ATR و فیبوناچی؛ قوانین هشدار AND/OR؛ **LLM فقط برای توضیح «چرا»** با fallback قاعده‌محور؛ backtest با replay سیگنال‌ها؛ خروجی Telegram و webhook. |
| [Manjussha/AI-trader](https://github.com/Manjussha/AI-trader) | MIT | **Confluence Score 0 تا 10**؛ اندازه‌ی پوزیشن با ATR و Kelly؛ **ایجنت‌های پس‌زمینه برای پایش SL/Target**؛ Paper کاملاً ایزوله؛ live فقط بعد از فعال‌سازی صریح حساب. |
| [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) | **GPL-3.0 (فقط ایده)** | `dry_run` wallet؛ `stoploss_on_exchange`؛ trailing (`trailing_stop_positive` و `offset`)؛ `custom_stoploss` (فقط سفت‌تر شدن)؛ ROI table؛ `adjust_trade_position` (partial و DCA)؛ **Protections** (Cooldown، StoplossGuard، MaxDrawdown، LowProfitPairs)؛ **reconcile سفارش‌ها و trades بعد از ری‌استارت**؛ گرد کردن amount و price با precision و limitهای صرافی. |
| [claude-trading-skills](https://github.com/agiprolabs/claude-trading-skills) و [TradingAgents](https://github.com/TauricResearch/TradingAgents) | بررسی شود | ساختار تحلیلگرها، منتقد و تریدر برای Reasoning Model؛ اسکیل‌های TA، sentiment و risk به‌عنوان prompt یا tool. |

### 5.1 زیرفازها (هر بار یکی؛ بعد از هر کدام گزارش فارسی و Save State)

```text
PHASE C — AI ACTIVE SIGNALS. Implement sub-phase <S#> only, on the existing architecture,
reusing existing modules (AI, Scanner, Watchlist, Strategies, Risk, Paper/Live, Orders,
Positions, TP/SL, Trailing, Redis, PostgreSQL, WebSocket, 9router, TypeSafe/Jev, Exchange
adapters). Follow the spec below for <S#>. No mocks/placeholders. Tests first.
```

**S1 · Signal Schema و State Machine**
- جدول یا مدل واقعی (با migration) شامل این فیلدها: `id, symbol, market, exchange, timeframe, confirm_timeframes[], strategy_id, strategy_version, style, direction(LONG/SHORT), signal_type, confidence, probability, entry(price|zone), sl, tp1, tp2, tp3, rr, risk_pct, risk_score, invalidation, ai_model, decision_model, reasoning, mtf_confluence(json), scores(json), evidence(json), data_timestamp, status, expiry_at, created_at, updated_at, user_id`
- **امتیازها:** Technical، MTF، SMC/ICT، OrderFlow، OI، Funding، Liquidity، Whale، News، Fundamental و AI. اگر داده‌ی یک منبع در دسترس نیست، مقدارش `null` و دلیلش ثبت می‌شود؛ **عدد ساختگی ممنوع است**.
- **وضعیت‌ها:** `DETECTED → VALIDATED → WATCHLIST → READY → EXECUTED → MANAGED → CLOSED`، به‌علاوه‌ی `EXPIRED` و `REJECTED`. انتقال‌ها فقط از طریق یک تابع مجاز (`transition()`) با جدول `signal_events` (audit) انجام می‌شوند. انتقال غیرمجاز خطا می‌دهد.
- انتشار رویدادها در Redis و WebSocket (`signal.*`).

**S2 · User Controls و Settings (DB-backed)**
- **Trading Style:** `SCALPING, INTRADAY, SWING, POSITION, MOMENTUM, TREND, BREAKOUT, SMC, ICT, ORDER_FLOW, HYBRID, CUSTOM`
- **Timeframes:** `1m 3m 5m 15m 30m 1h 2h 4h 6h 12h 1D 1W 1M`، با Primary TF و Confirmation TFs
- **Strategies:** انتخاب، Create، Edit، Clone، Delete، Import/Export (JSON با schema version) و Activate؛ نسخه‌دار. حذف استراتژی‌ای که پوزیشن یا سیگنال فعال دارد مسدود می‌شود.
- **نقش‌های مدل AI:** `default_model, signal_model, decision_model, reasoning_model, fallback_model`، با مسیریابی از طریق **9router** موجود. **TypeSafe/Jev قفل روی `decision_model`** و در لیست Chat نمایش داده نمی‌شود. **Ollama محلی** به‌عنوان گزینه‌ی `reasoning` و `fallback`.
- همه‌ی این‌ها برای هر کاربر در DB ذخیره می‌شوند و از صفحه‌ی Settings قابل تغییرند، بدون نیاز به `.env`.

**S3 · AI Market Scanner**
- اتصال اسکنر موجود به pipeline واقعی: داده‌ی بازار ← featureهای قطعی (فقط کندل‌های بسته‌شده، non-repainting) ← snapshot ← **Jev (decision)** ← Policy با آستانه‌ها ← خروجی `LONG / SHORT / HOLD / WATCH`، همراه با reasoning (توضیح از reasoning model، با fallback قاعده‌محور)
- **فیلترها:** market، exchange، symbol، timeframe، style، strategy، model، حداقل confidence، حداقل RR و حداکثر risk
- سیگنال‌هایی که از آستانه‌ی Validation عبور کنند **خودکار به AI Signal Watchlist** می‌روند (`VALIDATED → WATCHLIST`)
- **Fallback Ladder:** وقتی Jev در دسترس نیست، به حالت قاعده‌محور می‌رود و `degraded=true` ثبت و نمایش داده می‌شود

**S4 · AI Signal Watchlist**
- **عملیات:** `ADD, REMOVE, PIN, MUTE, SNOOZE(until), APPROVE(→READY), REJECT(→REJECTED), TRADE(→Execution Gate)`
- با کلیک روی سیگنال، **نمودار** (کتابخانه‌ی نمودار موجود پروژه) با خطوط Entry، SL، TP1 تا TP3 و Invalidation، همراه با شواهد، نمایش داده می‌شود
- انقضای خودکار (`EXPIRED`) با یک job زمان‌بندی‌شده

**S5 · AI Insights**
- پیشنهادها و دیدگاه‌های بازار (رژیم، ریسک و فرصت‌ها) در یک بخش **جدا از سیگنال‌ها**، با برچسب واضح «پیشنهاد/تحلیل، نه دستور معامله». هیچ دکمه‌ی TRADE مستقیمی ندارد؛ فقط «تبدیل به سیگنال برای بررسی».

**S6 · Capital و Risk**
- **خواندن موجودی واقعی** از adapter حساب‌های متصل: `equity, available_balance, margin, buying_power`. اگر حسابی متصل نیست، Paper Wallet. مقدار ساختگی ممنوع است.
- **Position Size فقط در Risk Engine** محاسبه می‌شود، از روی equity، risk%، entry، SL، کارمزد، لغزش، اهرم و limitهای صرافی
- **تنظیمات قابل تغییر:** risk/trade، max daily loss، max drawdown، max positions، max exposure، max leverage و correlation limits، به‌علاوه‌ی Protections به سبک freqtrade (cooldown و stoploss guard)
- AI هیچ API‌ای برای تغییر یا دور زدن Risk ندارد. این را با تست ثابت کنید.

**S7 · حالت‌ها و Gateها**
- **Account Mode:** `PAPER` (پیش‌فرض) و `LIVE`
- **AI Mode:** `OFF, SIGNAL_ONLY, AI_CONFIRMATION, SEMI_AUTO, PAPER_AUTO, LIVE_AUTO`
- **LIVE_AUTO** فقط با تأیید صریح کاربر (مثلاً تایپ عبارت تأیید) **و** سبز بودن همه‌ی Gateها فعال می‌شود: broker connected · credentials valid · trade permission · balance/margin · active strategy · risk profile · fresh market data · healthy AI · healthy risk engine · healthy execution engine
- اگر هر Gate قرمز شود، خودکار به حالت امن برمی‌گردد و هشدار می‌دهد.

**S8 · Execution Gate**
- `SIGNAL → STRATEGY VALIDATION → ACCOUNT VALIDATION → RISK → POSITION SIZE → ORDER VALIDATION → PAPER/LIVE → EXCHANGE`
- رعایت قابلیت‌های صرافی: min qty، step size، tick size، min notional، اهرم، مارجین و نوع سفارش (گرد کردن درست و رد کردن سفارش نامعتبر)
- `client_order_id` قطعی برای idempotency. AI فقط structured decision می‌دهد.

**S9 · Position Manager**
- TP1، TP2 و TP3 با درصد بستن قابل تنظیم (Partial Close)؛ Breakeven بعد از TP1 یا بعد از رسیدن به R مشخص؛ Exit
- **Trailing:** `FIXED, ATR, STRUCTURE, BREAKEVEN_THEN_TRAIL, AI_SUGGESTED_RISK_VALIDATED`
- **AI Position Review:** `HOLD, TIGHTEN_STOP, TAKE_PARTIAL, EXIT, NO_CHANGE`. **SL فقط می‌تواند سفت‌تر شود** و اعتبارسنج سمت سرور هر افزایش ریسک را رد می‌کند (تست لازم دارد).
- exit_advisor موجود را توسعه دهید؛ از SL روی خود صرافی استفاده کنید (stoploss on exchange) اگر صرافی پشتیبانی می‌کند.

**S10 · Recovery و Reconciliation**
- بعد از ری‌استارت: بازسازی state پوزیشن‌ها، سفارش‌ها، SL/TP و trailing از DB، **تطبیق با صرافی**، **جلوگیری از سفارش تکراری** (با client_order_id) و گزارش هر عدم تطابق (Kill Switch در صورت لزوم)

**S11 · UI** (با **UI/UX Pro Max** و Design System موجود) — **در عمل با T6 (بخش ۵T) پیاده می‌شود**
- پنل‌ها: **AI SIGNALS · AI MARKET SCANNER · AI WATCHLIST · AI INSIGHTS · ACTIVE POSITIONS**
- فیلتر و مرتب‌سازی: market، exchange، style، strategy، timeframe، AI model، confidence، RR و status
- به‌روزرسانی زنده با WebSocket؛ فارسی و انگلیسی، RTL، تم تیره و روشن، موبایل با نوار پایین ثابت؛ حالت‌های loading، empty، error و degraded
- هر کامپوننت به یک API واقعی وصل است.

**S12 · Security**
- کلیدهای API و کلیدهای خصوصی با AES-GCM و یک master key خارج از DB رمزنگاری می‌شوند؛ در UI ماسک می‌شوند (`****abcd`)؛ در لاگ redact می‌شوند؛ هرگز به frontend نمی‌روند
- **فرایندهای AI و LLM به credentialها دسترسی ندارند** (جداسازی سرویس و مجوز)
- مجوز برداشت نباید فعال باشد و این هنگام اتصال بررسی می‌شود

**S13 · تست End-to-End واقعی**
- **PAPER (با داده‌ی واقعی بازار):** Scanner → AI → Signal → Watchlist → Strategy → Risk → Position Size → Paper Order → Position → TP/SL → Breakeven → Trailing → Partial → Exit → Journal
- **LIVE (بدون ارسال سفارش واقعی):** ثابت کنید هر Gate در شرایط نامعتبر **BLOCK** می‌کند: کلید ندارد، مجوز ندارد، موجودی کم است، داده stale است، AI unhealthy است، risk breach است، تأیید کاربر ندارد. adapter در حالت `dry-validate` فقط اعتبارسنجی سفارش را انجام می‌دهد (مثلاً endpoint تست سفارش در صرافی‌هایی که دارند).
- تست recovery (kill process وسط پوزیشن، سپس ری‌استارت) و تست idempotency

**S14 · Final Audit (فارسی)**
- گزارش در `docs/state/AI_SIGNALS_AUDIT_FA.md` برای این موارد: AI Signals · Scanner · Watchlist · Strategies · AI Models · TypeSafe/Jev · Risk · Position Sizing · Paper · Live Gate · Execution · TP/SL · Trailing · Partial Close · Journal
- **وضعیت‌ها:** ✅ VERIFIED · ⚠️ REQUIRES CREDENTIAL · ⚠️ REQUIRES USER ACTION · ❌ FAILED · ⏳ NOT IMPLEMENTED. فقط مواردی VERIFIED اعلام می‌شوند که واقعاً تست شده‌اند، همراه با شواهد (نام تست و خروجی).

---

## 5T. فاز T — Authenticated Trading Terminal UI (اعمال مستقیم روی کد)

> **هدف:** بعد از Login، ترمینال باید یک Trading Terminal حرفه‌ای، مینیمال و سریع باشد، با الهام از UX صرافی‌های مدرن مثل Toobit و LBank، **اما با هویت اختصاصی TIKALGO**.
> این فاز **مستقیم روی کد واقعی** اجرا می‌شود. Mockup، Demo، طراحی جداگانه یا «کد پیشنهادی» قابل قبول نیست. Landing عمومی خارج از این فاز است.
> **وابستگی:** T6 (مرکز AI Signals) به S1 تا S10 نیاز دارد و جایگزین S11 است. بقیه‌ی زیرفازهای T می‌توانند موازی با فاز C پیش بروند.

### 5T.0 پرامپت عمومی هر زیرفاز
```text
PHASE T — TRADING TERMINAL UI. Implement sub-phase <T#> DIRECTLY in the existing TikAlgo
frontend so it is visible in the real Login → Terminal path. Not a mockup, not a demo, not a
separate design. Use the UI/UX Pro Max skill + docs/design/DESIGN_SYSTEM.md.
RULES:
- First inspect (via Graphify) current frontend/backend structure, routing, auth guards,
  state management, API clients, WebSocket channels, i18n and existing components for the
  scope of <T#>. Reuse them; remove only DUPLICATE UI after migrating its usages.
- Do NOT delete or break any API, exchange/broker adapter, trading logic, DB schema, route
  or auth. Keep all current trading features working (regression-test them).
- NO mock/hardcoded market data, balances, positions or prices. Wire to real API/state/WS.
  If the backend has no data for a widget, render a proper Empty/Unavailable state with the
  reason and log it in docs/state/BACKEND_GAPS.md — never fake data.
- Every user-facing string goes through real i18n (fa + en); RTL for fa, LTR for en.
- Sensitive actions (place/close order, close all, switch to LIVE, delete strategy/key)
  require Confirm dialogs and result Toasts; LIVE/PAPER always clearly visible.
- Run build + typecheck + lint + tests; fix what you broke. Persian report + Save State.
```

### 5T.1 Design System و قوانین بصری (T0 تا T1)
- **هویت TIKALGO:** فونت SaaS مدرن و خوانا. انگلیسی Inter یا Geist؛ فارسی Peyda یا IRANSansX (پشتیبان Vazirmatn)؛ اعداد tabular. کارت‌های تمیز با Border ظریف، فاصله‌گذاری مناسب و سلسله‌مراتب بصری واضح، بدون شلوغی.
- **Dark/Light** با توکن‌ها (CSS variables و Tailwind). پالت فعلی سبک بایننس (`#0b0e11`، `#f0b90b`، `#0ecb81`، `#f6465d`) پایه‌ی رنگ‌هاست و در Design System رسمی می‌شود.
- **Motion:** نرم و محدود (۱۵۰ تا ۲۵۰ میلی‌ثانیه) با احترام به `prefers-reduced-motion`.
- **Responsive:** دسکتاپ اول (مثل ترمینال‌های حرفه‌ای)، بعد تبلت و موبایل. در موبایل نوار پایین ثابت با ۵ بخش اصلی.

### 5T.2 زیرفازها

**T0 · Audit فرانت‌اند (فقط خواندن)**
- مسیرها (routes)، Auth guard، Layoutها، کامپوننت‌های تکراری، کلاینت‌های API، کانال‌های WS، i18n فعلی، تم، کتابخانه‌ی نمودار و هر صفحه‌ای که داده‌ی hardcode دارد
- **خروجی:** `docs/state/FRONTEND_AUDIT_FA.md` و جدول «ویجت ← API یا WS موجود ← کمبود Backend»

**T1 · App Shell (چارچوب برنامه)**
- Header و Sidebar ثابت و قابل جمع شدن
- **کلیک روی لوگوی TIKALGO** یک Menu/Command Menu باز می‌کند که شامل میانبر همه‌ی ماژول‌ها (Icon + Label) و دسترسی به Settings است
- Global Search، Command Palette (⌘K / Ctrl+K)، Quick Actions، Favorites و «آخرین بازارهای مشاهده‌شده»
- نشانگر **LIVE/PAPER**، وضعیت اتصال هر Exchange/Broker و وضعیت WebSocket
- سوئیچ تم و زبان؛ Error Boundary؛ Toast و Confirm سراسری
- **ناوبری اصلی (۵ بخش):** Home · Trading Terminal · Forex/Metals/US Stocks · Crypto · AI Signals، به‌علاوه‌ی **Markets** در منو و Command Menu
- همه‌ی Routeهای قبلی حفظ می‌شوند. اگر مسیری عوض شود، redirect از مسیر قدیمی گذاشته می‌شود.

**T2 · Home**
- **Total Account Equity:** مجموع موجودی همه‌ی حساب‌ها، با تفکیک هر Exchange، Broker و Wallet (فقط از API واقعی؛ حساب متصل‌نشده یعنی Empty state)
- **عملکرد 24H / 7D / 30D:** مقدار، درصد سود و زیان و نمودار. اگر تاریخچه‌ی equity در Backend نیست، Unavailable نشان داده و در BACKEND_GAPS ثبت می‌شود.
- **کارت‌های compact گرافیکی:** Market Regime، روند BTC، روند طلا، روند نفت و Fear & Greed
- **Market Lists با تب‌های** Top Gainers، Top Losers، Favorites و AI Signals. ستون‌ها: Symbol، Name، Price، Change%، Trend (sparkline) و AI Signal
- وضعیت Live/Paper و زمان آخرین به‌روزرسانی

**T3 · Trading Terminal (Desktop-first)**
- تب‌های لیست: Gainers، Losers، AI Signals و Favorites
- انتخاب Exchange/Broker/Account؛ جست‌وجوی نماد
- **Chart** (کتابخانه‌ی موجود؛ lazy-load)، **Order Book/Depth** و **Trades** (با WS)
- **Positions، Open Orders، Balance/Margin/Available**
- **Order Entry:** Buy/Sell؛ Market، Limit و Stop؛ TP، SL و Trailing؛ Leverage و Cross/Isolated برای Futures؛ Close Position و Close All (با Confirm)
- **پنل ریسک:** اندازه‌ی پوزیشن از Risk Engine، قیمت Liquidation، ریسک به درصد و R
- **قاعده:** همه‌ی سفارش‌ها از **Execution Gate** موجود عبور می‌کنند. UI هیچ مسیر مستقیمی به صرافی ندارد. همه‌ی قابلیت‌های معاملاتی فعلی حفظ و با تست regression بررسی می‌شوند.

**T4 · Forex / Metals / US Stocks** (سه بازار کاملاً جدا)
- در هر کدام: Gainers، Losers، AI Signals، Favorites، Search، انتخاب Account/Broker، Chart، Positions، Orders، Balance، Order panel و Market details
- **Forex:** Lots، Leverage و Margin
- **US Stocks:** Quantity و Order Type
- **Metals:** قرارداد، حجم و ریسک، طبق قابلیت‌های Adapter موجود (MT5 یا Broker)
- اگر Adapter یک بازار وجود ندارد، صفحه با Empty state «اتصال بروکر لازم است» نمایش داده می‌شود و در BACKEND_GAPS ثبت می‌شود.

**T5 · Crypto: Spot / DEX / Futures**
- در هر تب: Gainers، Losers، AI Signals، Favorites، انتخاب Exchange/Wallet، Chart، Order Book، Positions، Orders، Balance و Order Entry
- در Futures: Risk و Leverage، Margin mode و Funding
- در DEX: انتخاب Wallet و شبکه، فقط اگر Adapter موجود است

**T6 · AI Signals Center** (جایگزین S11؛ بعد از S1 تا S10)
- Active، Open و Closed Signals، Signal History و AI Watchlist
- فیلتر و انتخاب: Strategy، Trading Style، Timeframe، AI Model، Confidence و Status
- **جزئیات هر سیگنال:** Entry، TP/SL، Trailing، وضعیت، دلیل ایجاد، Market Context، اندیکاتورها و داده‌های استفاده‌شده، **Decision Trace** و نتیجه‌ی سیگنال
- **عملیات:** انتقال به Watchlist یا Terminal (Terminal با Entry، SL و TP از پیش پر شده باز می‌شود؛ اجرا همچنان از Execution Gate)
- تنظیمات AI و مدل‌ها از Settings

**T7 · Markets**
- Crypto، Forex، Metals، US Stocks، DEX و Futures
- **ستون‌ها:** Price، Change، Volume، OI و Funding (در صورت وجود)، Spread، Liquidity، AI Signal، Market Regime و داده‌های تکنیکال موجود در Backend
- جدول مجازی (virtualized) برای لیست‌های بلند؛ مرتب‌سازی و فیلتر

**T8 · Settings** (از منوی لوگو باز می‌شود)
- Account، Exchanges/Brokers، API Keys (ماسک‌شده و رمزنگاری‌شده؛ فقط نمایش 4 رقم آخر)، Trading Mode Paper/Live (Live با تأیید صریح و Gateها، طبق S7)، Risk Management، AI Models، AI Settings، Strategies، Trading Styles، Notifications، Telegram، Display، Language، Theme و Security
- همه DB-backed هستند و به `.env` نیاز ندارند (طبق S2). صفحه‌ی settings موجود **ادغام** می‌شود، بازنویسی نمی‌شود.

**T9 · UX، کارایی و دسترس‌پذیری**
- Loading Skeleton با ابعاد ثابت (بدون Layout Shift)، Empty، Error و Unavailable states
- Lazy loading برای Chart، Order Book و ماژول‌های سنگین؛ code-splitting برای هر route
- **Keyboard shortcuts:** ⌘K جست‌وجو، B و S برای Buy و Sell (با فوکوس روی فرم)، Esc بستن، `/` جست‌وجوی نماد، و راهنمای میانبرها با `?`
- **Accessibility:** فوکوس قابل مشاهده، ARIA، کنتراست WCAG 2.2 AA و هدف لمسی ≥ ۴۴px در موبایل
- WebSocket: reconnect با backoff، نشانگر «داده‌ی کهنه» و throttle رندر (requestAnimationFrame) برای Order Book

**T10 · i18n و RTL**
- همه‌ی متن‌ها با کلید i18n (fa و en)؛ هیچ متن ثابتی باقی نمی‌ماند (این را با یک تست یا lint بررسی کنید)
- RTL و LTR خودکار با `dir`؛ Chart و اعداد همیشه LTR؛ فرمت عدد و تاریخ وابسته به locale

**T11 · تأیید و گزارش نهایی (فارسی)**
- اجرای build، typecheck، lint و همه‌ی تست‌ها، به‌علاوه‌ی تست E2E مسیر **Login → Terminal → ثبت سفارش PAPER → Position → Close** (Playwright اگر در پروژه هست)
- اسکرین‌شات صفحه‌ها در دسکتاپ، تبلت و موبایل، و در دو حالت تیره و روشن، در `docs/state/screens/`
- **گزارش `docs/state/TERMINAL_UI_REPORT_FA.md` دقیقاً شامل:**
  1. فایل‌های تغییرکرده
  2. Routeهای اضافه یا اصلاح‌شده (همراه با redirectها)
  3. APIها و کانال‌های WS استفاده‌شده برای هر ویجت
  4. قابلیت‌هایی که واقعاً فعال شدند (✅ VERIFIED با شواهد)
  5. نتیجه‌ی Test و Build
  6. هر چیزی که **Backend برای تکمیل لازم دارد** (از BACKEND_GAPS.md)
- کار تا **اعمال واقعی UI در پروژه** ادامه پیدا می‌کند. گزارش بدون پیاده‌سازی قابل قبول نیست.

---

## 6. فاز D به بعد — ابرپروژه (طبق `TIKALGO_SUPER_PLAN.md`)

> هر فاز فقط بعد از تکمیل و تأیید فاز قبل. پرامپت عمومی:
```text
PHASE <N> per docs/TIKALGO_SUPER_PLAN.md §15.2 (modules <IDs>). Reuse what Phase C built
(signal schema, state machine, risk engine, execution gate, position manager). Follow MASTER
RULES. Tests first. Persian report + Save State at the end.
```

| فاز | محتوا | ماژول‌ها |
|---|---|---|
| D1 | Data Fabric: قراردادهای کانونی، Event Bus روی Redis Streams، WS صرافی‌ها، حل `runtime_stale` | M01، M02، M10 |
| D2 | Intelligence: TA، SMC/ICT، Order Flow/CVD، OI/Funding، Regime، Cross-Asset، Pump/Dump | M11 تا M14، M19 تا M22 |
| D3 | نهنگ‌ها و آن‌چین: Hyperliquid Whale Engine، WhaleScore، جریان صرافی‌ها | M07، M08، M15 |
| D4 | News، Social و Macro: Event Impact، روایت‌ها، تقویم اقتصادی | M05، M06، M09، M16 تا M18 |
| D5 | AI Decision: Router، تحلیلگرها، Critic، RAG/Memory، Local Model Gateway و Registry | M23 تا M26، M28 |
| D6 | Portfolio و Capital (چندحسابی) | M31، M32 |
| D7 | Execution: LBank Futures live، Hyperliquid live، Broker Hub (MT5) و Smart Router | M29، M30، M33، M03، M04، M34 |
| D8 | Research Lab: SDK، Backtest و Optimizer | M35 تا M37 |
| D9 | Learning و Skill Registry | M38، M39، M27 |
| D10 | Product: Alerts، Admin/SaaS، Payment، Voice، Chat، PWA و Landing (ترمینال در فاز T ساخته شده؛ اینجا فقط توسعه) | M40 تا M50 |
| D11 | Production Hardening | امنیت، DR و تست بار |

---

## 7. SAVE STATE — پایان هر جلسه (اجباری)

```text
SAVE STATE. Before ending:
1) Run an incremental Graphify update so graphify-out/ reflects today's changes.
2) Update docs/state/TIKALGO_STATE.md (status table per module with ✅/⚠️/❌/⏳ + evidence),
   docs/state/NEXT.md (exact next sub-phase + acceptance criteria),
   append docs/state/CHANGELOG_AI.md (date, phase, files changed, migrations, tests + results),
   append docs/state/DECISIONS.md (any architectural decision).
3) Commit docs/state + code changes with a clear message (no secrets).
4) Give me a short Persian summary: done / verified / blocked / next.
```

---

## 8. پرامپت‌های کمکی

**بازبینی امنیت و ایمنی معاملاتی یک تغییر**
```text
Review the current diff for: secret leaks, AI path that can reach orders without the
Execution Gate, any risk-increasing SL change, PAPER/LIVE leakage, missing idempotency,
repainting/lookahead in features, unvalidated input, license problems. Persian report by severity.
```

**افزودن یک استراتژی یا اسکیل جدید**
```text
Add strategy/skill "<name>" using the existing Strategy CRUD (S2) and skill manifest
(can_trade=false). Backtest/paper evaluate it, store results, do not activate for LIVE.
Persian report + Save State.
```

**طراحی یک صفحه**
```text
Using UI/UX Pro Max and docs/design/DESIGN_SYSTEM.md, design then implement <screen> for
mobile (bottom tab bar) and desktop, FA/EN RTL, dark/light, all states, wired to real APIs only.
```
