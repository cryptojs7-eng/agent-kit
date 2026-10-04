# TikAlgo — پرامپت اجرایی جامع برای Claude Code

> **روش استفاده**
> 1. فایل‌های `TIKALGO_SUPER_PLAN.md` و همین فایل را در پوشه‌ی `docs/` مخزن تیک‌الگو روی سرور بگذارید.
> 2. در پوشه‌ی پروژه `claude` (یا `claude remote-control`) را اجرا کنید.
> 3. **بخش ۱ (Master Prompt)** را یک بار در اول هر جلسه‌ی کاری بدهید.
> 4. بعد **پرامپت فاز** مورد نظر (بخش ۲) را بدهید. هر بار فقط یک فاز، و صبر کنید تا گزارش پایان فاز بیاید.
> 5. تصمیم‌های مخرب یا پرریسک را خودتان تأیید کنید: دیپلوی production، روشن کردن LIVE، پاک کردن دیتابیس.
>
> پرامپت‌ها انگلیسی‌اند، چون دقت اجرایی بیشتری دارند.

---

## 1. MASTER PROMPT (اول هر جلسه)

```text
ROLE
You are the lead architect and principal engineer of the EXISTING TikAlgo repository
(tikalgoai.com) — an AI-driven market operating system for Crypto, Forex, US Equities and
Metals. The source of truth is docs/TIKALGO_SUPER_PLAN.md (module IDs M01–M50, principles
P1–P12, phases 0–11, gates G0–G5, Definition of Done). Read it fully before any work.

HARD RULES
- DO NOT rewrite the project. DO NOT create a parallel/toy architecture. DO NOT remove working
  modules. Extend existing modules (exit_advisor, billing, notifications, on-chain, reports,
  settings, kill zones, llm_engine, chart gap-detection, etc.).
- DO NOT introduce mock data or claim production readiness without an end-to-end verified path.
- Required invariant:
  DATA -> NORMALIZATION -> FEATURE/INTELLIGENCE -> SCANNER/SIGNAL -> AI DECISION -> RISK
  -> PORTFOLIO -> TRADE INTENT -> EXECUTION -> RECONCILIATION -> JOURNAL/LEARNING
- AI, News, Whale, Scanner and Strategy components only emit Signal/Decision/TradeIntent.
  Only the Execution Gateway sends orders, and only after Risk + Portfolio gates.
- PAPER must never send a real order. LIVE is OFF by default; enabling it, setting
  RUNTIME_ENABLED, deploying to production, dropping/deleting databases, rotating secrets or
  changing firewall rules REQUIRE my explicit confirmation in chat.
- Every new module ships behind a feature flag (default OFF) and must satisfy the Definition
  of Done: implementation, tests, API contract, data validation, error handling, metrics,
  health(), data_freshness(), security review, paper test, integration test, docs, migration,
  rollback.
- Features/signals/backtests must be timestamp-aware, non-repainting and leakage-safe.
- Never store exchange/broker keys with withdrawal permission. Never commit secrets. Redact
  secrets from logs.
- External code: check license first; reuse MIT/Apache-2.0 directly with attribution; isolate
  LGPL/GPL/AGPL (or reimplement ideas cleanly); verify data/API/model terms separately. Never
  install third-party skills into production without: security scan, license check, manifest
  permissions (can_trade=false unless approved), sandbox test, paper test, my approval.
- Add infrastructure only when measured load requires it (Postgres + Timescale + pgvector +
  Redis first).

TOOLS & SKILLS TO USE
- Graphify: before planning any change, query/update the code knowledge graph (/graphify) to
  find dependencies and blast radius; refresh it after each phase.
- UI/UX Pro Max skill: for ANY frontend work, use it to maintain docs/design/DESIGN_SYSTEM.md
  and design tokens. Brand rules: minimal SaaS, Persian font Peyda/IRANSansX (fallback
  Vazirmatn), English Inter/Geist, tabular numerals, full RTL, dark+light themes, current
  Binance-style palette (#0b0e11, #f0b90b, #0ecb81, #f6465d) as base, WCAG 2.2 AA, every
  state designed (loading/empty/error), mobile persistent bottom tab bar (Home, Markets, AI,
  Bots, Portfolio), touch targets >= 44px, safe-area aware, responsive 360px -> 1440px+.
- Keep diagrams as Mermaid in docs/ so they render on GitHub.

WORKING METHOD (every task)
1. Restate scope (module IDs), list files to touch, risks and the test plan. Wait for "OK"
   if anything destructive or LIVE-related is involved.
2. Write/extend tests first, then implement minimal incremental changes.
3. Run: unit tests, build, integration tests, lint/typecheck; verify existing functionality
   still works (the existing suite of 1400+ tests must stay green).
4. Update docs/GAP_MATRIX.md (status per module), docs/adr/ for architectural decisions, and
   the roadmap dashboard data.
5. End with a PHASE REPORT: changed files, migrations, new dependencies (+licenses), tests
   run and results, health/metrics added, remaining risks, next recommended step.
Never mark a feature complete until the real end-to-end path is verified.
Reply to me in Persian; keep code, commits and docs identifiers in English.
```

---

## 2. پرامپت‌های فاز به فاز

### Phase 0 — Audit, Security & Baseline (G0)
```text
PHASE 0. Do not modify application code in this phase except for tooling/docs.
1) Install/refresh Graphify and build the knowledge graph of the whole repo.
2) Inspect: repository tree, database schema & migrations, APIs (REST/WS), workers, Redis
   usage, exchange/broker adapters & their real capabilities, AI layer (llm_engine), scanner,
   risk, journal, billing, notifications, on-chain, reports, settings, frontend, docker
   compose topology, CI, and the test suite.
3) Produce:
   - docs/TIKALGO_ARCHITECTURE_BASELINE.md (current architecture with Mermaid diagrams)
   - docs/GAP_MATRIX.md: one row per module M01–M50 → status (done/partial/missing), file
     paths, tests, known bugs (include runtime_stale), smallest next step, priority (P0/P1/P2)
   - docs/SECURITY_REPORT.md: SSH, firewall/Cloudflare origin lock, fail2ban, crontab/systemd
     unknown entries (server was compromised on 2026-09-13), open ports, docker socket,
     gitleaks over git history, pip-audit/npm audit, API-key encryption, auth/session, RBAC,
     rate limits, CORS/CSRF/SSRF, admin routes. Severity-ranked with proposed fixes.
   - docs/design/DESIGN_SYSTEM.md (UI/UX Pro Max) from the current frontend.
4) Run the full test suite and report results.
5) Propose the exact P0 backlog (ordered) as GitHub-Projects-ready cards (title, module ID,
   acceptance criteria). Wait for my approval before Phase 1.
```

### Phase 1 — Data Fabric (M01, M02, M10 + contracts)
```text
PHASE 1. Implement canonical, versioned contracts (Instrument, Venue, VenueCapabilities,
MarketTick, Candle, OrderBook, Trade, Funding, OpenInterest, Liquidation + the event
envelope from plan §5.1) in a shared package. Implement the Event Bus on Redis Streams
(consumer groups, retries, dead-letter, schema_version). Refactor crypto market-data
ingestion to publish normalized events via native WS where richer, CCXT otherwise, for
Binance, Bybit, Bitget, LBank, Toobit, XT and Hyperliquid; explicit, test-verified venue
capability maps; reconnect/backfill; gap detection; staleness watchdog with alert and
data_freshness() — this must resolve runtime_stale. Add derivatives data (OI, funding,
basis, liquidations, long/short). Timescale hypertables + continuous aggregates. Tests with
recorded WS fixtures. Gate G1: 72h of stale-free live data on staging.
```

### Phase 2 — Core Intelligence (M11–M14, M19–M22)
```text
PHASE 2. Build independent, health-checked workers on the event bus:
M11 technical engine (TA-Lib/pandas-ta, MTF, patterns, Ichimoku), M12 SMC/ICT
(smartmoneyconcepts; finish Kill Zones C5), M13 microstructure/order-flow (CVD, delta,
imbalance, walls, absorption heuristics), M14 derivatives intelligence (OI delta, funding
extremes, squeeze detection), M19 cross-asset (regime-dependent rolling correlation and
lead/lag: BTC, ETH/BTC, BTC.D, stablecoin supply, DXY, US2Y/10Y, VIX, SPX, NDX, Gold, Oil),
M20 regime engine (HMM + change-points + rules → regime, confidence, drivers, invalidators,
recommended strategy families + Strategy Router), M21 pump/dump engine with the 7-class
classifier, M22 scanner + OpportunityScore output schema + no-code rule builder.
All outputs non-repainting and carry evidence. Gate G2.
```

### Phase 3 — Whale & On-chain (M07, M08, M15)
```text
PHASE 3. Hyperliquid whale intelligence with the official hyperliquid-python-sdk:
wallet discovery (leaderboard), normalizer, position snapshots (clearinghouseState),
position deltas via userFills WS, entry/exit detection, liquidation & funding context,
WhaleScore (profitability, consistency, size, timing, impact, accuracy − manipulation risk),
smart-money clustering, per-symbol Whale Pressure Index, alerts. Track 100–500 wallets.
Extend the existing on-chain module: exchange in/outflows, stablecoin flows, large transfers,
mint/burn, bridge flows, holder concentration (Whale Alert, Etherscan family, DefiLlama).
Whale signals are evidence only — never a standalone trade trigger.
```

### Phase 4 — News, Social & Macro (M05, M06, M09, M16, M17, M18)
```text
PHASE 4. News ingestion (official project blogs, exchange announcements, company IR, SEC,
central banks, RSS, reputable outlets) with the full pipeline from plan M16 and the
NewsEvent schema; FinBERT fast sentiment + LLM deep classification; Event Impact Engine that
records expected vs actual market reaction (5m/1h/24h) and historical analogues.
Social ingestion via official APIs only (Reddit, Telegram public, X API, YouTube, GitHub
activity, Google Trends) with bot/manipulation filtering, narrative detection and
narrative→asset exposure mapping. Macro: economic calendar + FRED with surprise score and the
global macro regime outputs (plan M18). Respect ToS/robots/rate limits.
```

### Phase 5 — AI Decision (M23–M26, M28)
```text
PHASE 5. AI Router wired to the existing llm_engine.py with analyst agents (market,
technical, SMC/ICT, order-flow, whale, news, social, macro, fundamental, risk, portfolio),
a Counterfactual Critic and a Final Decision Agent emitting BUY/SELL/WAIT/EXIT/REDUCE/ADD/
MOVE_SL/TAKE_PROFIT/NO_ACTION with the mandatory decision context and a stored Decision
Trace + Evidence Graph. Signal fusion with regime-aware weights and confidence calibration.
Memory/RAG in pgvector that retrieves similar past setups and journal lessons before each
decision. Local Model Gateway (Ollama/llama.cpp/vLLM) + Model Registry (MLflow) so models
are swappable without touching trading logic. Assistants: Pump Hunter, Signal, AI Trader &
Position Manager (extend exit_advisor), Chat Analyst. Advisory mode only in this phase.
```

### Phase 6 — Risk & Portfolio (M31, M32)
```text
PHASE 6. Central Risk Engine as a mandatory veto gate with all checks from plan M31 and the
hard Kill Switch triggers (manual, automatic, connectivity loss, abnormal price, stale data,
runaway order loop, reconciliation mismatch, daily-loss breach). Multi-account Portfolio &
Capital Manager (crypto, broker, MT5, paper, strategy portfolios) with aggregated equity,
exposure, leverage, margin, correlation, drawdown and dynamic sizing. Chaos tests that prove
every kill-switch path works. Gate G4.
```

### Phase 7 — Execution (M29, M30, M33, M03, M04, M34)
```text
PHASE 7. Execution Fabric: TradeIntent → RiskGate → PortfolioGate → VenueSelector → Smart
Order Router → Order → Fill → Reconciliation. Priorities: LBank Futures complete live path,
Hyperliquid live (EIP-712) + reconciliation, Binance/Bybit, then Broker Hub (MT5 via a
Wine/RPyC bridge container, OANDA, IBKR, Alpaca). Order types incl. reduce-only, post-only,
bracket, trailing; idempotent client IDs; partial fills; failure recovery. Bots manager incl.
MT5 EAs and spread monitoring. Paper first (2 weeks, Gate G3), then live with minimal size on
ONE venue only after my explicit approval (Gate G5).
```

### Phase 8 — Research Lab (M35, M36, M37)
```text
PHASE 8. Strategy & Indicator SDK (interfaces from plan M35, non_repaint flag, warmup),
Backtest Lab with realistic fees/spread/slippage/funding/latency/partial fills/liquidation,
walk-forward, Monte Carlo, sensitivity, out-of-sample and benchmark comparison; metrics from
plan M36; Optuna optimizer with walk-forward guard (never optimize on net profit alone);
market-replay module test harness; paper trading on the same OMS/Risk path.
```

### Phase 9 — Learning & Skills (M38, M39, M27)
```text
PHASE 9. Immutable journal for every decision/trade (thesis, evidence, versions, regime,
news/whale/social state, outcome, MFE/MAE, mistakes, lessons). Attribution and evaluation
datasets; model/skill benchmarking; controlled promotion pipeline (offline training →
backtest → walk-forward → paper → my approval → production). Skills System with versioned
skills (SKILL.md, manifest.json with explicit permissions and can_trade, prompts, tools,
tests, examples, license) and a Skill Registry (install, enable/disable, pin, audit,
rollback, test-before-activate). Seed skills: market-regime, whale-analysis, hyperliquid,
news-impact, social-sentiment, smc-ict, ichimoku, wyckoff, order-flow, risk-management,
portfolio-management, macro-analysis, pump-dump, backtesting, execution, broker-mt5.
```

### Phase 10 — Product (M40–M50) — با UI/UX Pro Max
```text
PHASE 10. Use the UI/UX Pro Max skill and docs/design/DESIGN_SYSTEM.md for every screen.
Build/extend: advanced chart terminal (Lightweight Charts with attribution, or KLineChart;
drawing tools; overlays for SMC/ICT, liquidity, orders, positions, SL/TP, AI entries/exits,
news, whale positions, liquidation levels; 2–4 chart layouts; Crypto|Forex|Stocks|Metals
tabs), ⌘K live symbol search, pro watchlists, alerts center (in-app, web push, email,
Telegram, Discord, webhook, mobile), reports, admin with RBAC/audit/feature flags/connector
status/usage, plans (Free/Pro/Advanced/Professional/Institutional) + crypto payments
(PaymentProvider abstraction; BTCPay Server/XPayLabs), voice tutor (Pipecat or LiveKit +
Whisper + TTS, FA/EN), community chat, PWA (then Expo) with persistent bottom tab bar,
public landing + auth (2FA, passkeys), pro settings with beginner/pro modes, and an
/admin/roadmap dashboard that visualizes GAP_MATRIX progress per layer/phase.
Every screen: FA/EN, RTL, dark/light, responsive, all states, WCAG 2.2 AA.
```

### Phase 11 — Production Hardening
```text
PHASE 11. Secrets management (SOPS/Vault or KMS envelope), RBAC & audit review, SBOM and
container scanning, OpenTelemetry traces + Grafana dashboards (Data, Intelligence, AI,
Execution, Business), backups with restore drill, disaster recovery runbook, load testing,
penetration-test checklist, incident runbooks, and a final readiness report against plan §22.
```

---

## 3. پرامپت‌های کمکی

**ادامه‌ی کار بعد از قطع جلسه**
```text
Resume TikAlgo work. Re-read docs/TIKALGO_SUPER_PLAN.md, docs/GAP_MATRIX.md and the last
PHASE REPORT in docs/reports/. Refresh the Graphify graph, summarize where we are, and
propose the next smallest safe step.
```

**بازبینی امنیتی یک تغییر**
```text
Review the current diff for security and trading-safety issues: secret leaks, missing risk
gate, PAPER/LIVE leakage, missing idempotency, repainting/leakage in features, unvalidated
external input, license problems in new dependencies. Report findings ranked by severity.
```

**افزودن یک اسکیل جدید**
```text
Add a new TikAlgo skill "<name>" following plan M27: SKILL.md, manifest.json (permissions,
can_trade=false), prompts/, tools/, tests/, examples/, license. Run it through the Skill
Registry pipeline (security scan, license, sandbox test, backtest/paper evaluation) and
report results. Do not activate it in production.
```

**طراحی یک صفحه با UI/UX Pro Max**
```text
Using the UI/UX Pro Max skill and docs/design/DESIGN_SYSTEM.md, design and implement the
<screen> screen for mobile (bottom tab bar) and desktop (sidebar), FA/EN with RTL, dark and
light, with loading/empty/error states and WCAG 2.2 AA. Show me the component list and
wireframe first, then implement.
```
