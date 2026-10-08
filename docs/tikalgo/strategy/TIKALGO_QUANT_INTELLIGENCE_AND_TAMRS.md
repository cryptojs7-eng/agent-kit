# TIKALGO Quant Intelligence (TQI) + TAMRS + TIKALGO AI (Offline Decision Engine + Cognitive Core) + Continuous Learning (CLS)
## Research report and implementation specification (v6)

> **خلاصه برای مالک پروژه (فارسی):** این سند هدفش ارتقای سه چیز است:
> 1. **موتور سیگنال:** دقیق‌تر، رژیم‌محور و قابل توضیح.
> 2. **مدیریت معاملات:** ورود، خروج و اجرا.
> 3. **مدیریت سرمایه:** ریسک و پورتفولیو.
>
> سند دو بخش دارد:
> - **بخش اول (TQI):** معماری «نهادی» سیستم: لایهٔ داده، کارخانهٔ فیچر و آلفا، رژیم، مدل متا، پورتفولیو، ریسک، اجرا، اخبار و LLM، حاکمیت مدل و ضدبیش‌برازش. این بخش از اصول **عمومی و منتشرشده** نهادها و مقالات علمی استخراج شده است (کپی الگوریتم محرمانه نیست).
> - **بخش دوم (TAMRS):** استراتژی اختصاصی تیکالگو. این استراتژی هستهٔ «Strategy Ensemble» در بخش اول است و از کتاب‌های Schwager، Covel/Turtle و Tharp استخراج شده.
>
> - **بخش سوم (ODE):** «موتور تصمیم آفلاین». یک لایهٔ تصمیم‌گیری محلی است و به هیچ API ابری وابسته نیست. بالای موتورهای موجود می‌نشیند، شواهد را ترکیب می‌کند و LONG، SHORT، WAIT، REDUCE یا EXIT پیشنهاد می‌دهد. Risk Engine حق وتو دارد و LIVE فقط بعد از دروازه‌های III.0 باز می‌شود.
>
> - **بخش ششم (TIKALGO AI v2):** نسخهٔ کاملاً آفلاین و پیشرفتهٔ موتور تصمیم: حافظهٔ تاریخی و شباهت، منتقد مستقل، تصمیم‌های جایگزین، استقلال و تضاد شواهد، موتور عدم‌قطعیت، گذار رژیم، تشخیص تله، زمان‌بندی ورود، خروج پویا، کالبدشکافی معامله، و اثبات نبود وابستگی به AI ابری.
> - **بخش هفتم (TIKALGO AI Cognitive Core):** هستهٔ شناختی عمومی، محلی و آفلاین. شامل ادراک، حافظهٔ چندگانه، مدل جهان، گراف دانش، استدلال، علیت، برنامه‌ریزی، ابزارها، کتابخانهٔ مهارت، بازتاب، فرضیه و آزمایش، انتقال دانش، «نمی‌دانم»، مناظرهٔ چندعاملی، خودارزیابی، و ارزیابی توانایی بر اساس Levels of AGI. معامله یکی از حوزه‌های این هسته است. این بخش بعد از اعتبارسنجی هستهٔ معاملاتی پیاده می‌شود.
> - **بخش چهارم (CLS):** یادگیری مداوم و کنترل‌شده در سه حلقه:
>   - A: آمار و کالیبراسیون روزانه؛
>   - B: مدل قهرمان و چالشگر؛
>   - C: پژوهش از منابع مطالعاتی و تاریخچهٔ معاملات خود سیستم.
>
>   مقایسه با سیستم فعلی (baseline) اندازه‌گیری می‌شود.
> - **بخش پنجم:** کتابخانهٔ تحقیقاتی گسترده، یعنی منابع مهمی که خودم بررسی و اضافه کردم و کاربرد هرکدام در سند.
>
> بخش «چطور در پروژه استفاده کنیم» (I.X) ترتیب دقیق پیاده‌سازی را روی کد موجود نشان می‌دهد.
> اجرای آن با `TIKALGO_MASTER_PROMPT.md` §17 روی سرور انجام می‌شود.

> **Status:** research and specification only. It was written **without access to the TIKALGO code**
> (`/root/tikalgo` is on the production server). It contains:
> - no code changes;
> - no backtest, paper or shadow results.
>
> Deliverables **A, B, C, S, T, U, V** (assessment of the real code, files changed, tests, results) can
> only be produced on the server by Claude Code, following MASTER_PROMPT §17. All numbers are
> **defaults to be validated**.
>
> **Sources** are public pages and papers only. No proprietary or confidential algorithm of any
> institution is claimed or reproduced. Where a source page describes a business or careers
> programme rather than a method, that is stated and only the general principle is used.

### Document map (deliverables A–X)
| Deliverable | Where |
|---|---|
| A, B, C (architecture assessment, reusable modules, gaps) | Produced on the server in phase **Q0**. The template is in I.A |
| D, E (lessons per source; source → principle → implementation) | I.D, I.E |
| F (final architecture) | I.F |
| G (model hierarchy) | I.G |
| H (feature architecture) | I.H + Part II §2 |
| I (regime engine) | I.I + Part II §3 |
| J (alpha engine) | I.J |
| K (strategy ensemble) | I.K + Part II §4–§5 |
| L (meta-model) | I.L + Part II §6.1 |
| M (portfolio construction) | I.M + Part II §6.5 |
| N (risk engine) | I.N + Part II §6.3–§6.6 |
| O (execution intelligence) | I.O |
| P (news/LLM) | I.P + Part II §10 |
| Q (model governance) | I.Q |
| R (anti-overfitting) | I.R + Part II §9 |
| S, T, U, V (tests, files, backtest, paper/shadow results) | Produced on the server: phases Q2–Q18 |
| W (weaknesses) | I.W + Part II §12 |
| X (next steps / how to use in the project) | I.X |
| **Offline AI Decision Engine** (deliverables 1–24 of the ODE brief) | **Part III**. Items 1, 17–21 are produced on the server; 22 is in III.17 |
| **Continuous Learning System** (3 loops, champion/challenger, knowledge base, baseline A/B) | **Part IV** |
| **Extended research library** (23 additional sources → concrete spec changes) | **Part V** |
| **TIKALGO AI v2** (fully offline local decision intelligence; report items 1–10) | **Part VI** (extends Part III) |
| **TIKALGO AI Cognitive Core** (local general-intelligence architecture; AGI CORE STATUS report) | **Part VII** (phases C0–C10, after Q0–Q19) |

---

# PART I: TIKALGO Quant Intelligence (TQI)

## I.A Architecture assessment template (filled on the server in Q0)
For every row, record the existing file/class, its status (works / partial / missing), and the decision (reuse / extend / new):

| Layer | What to look for in the code |
|---|---|
| Data sources and ingestion | Market data workers per venue |
| Timestamps | Fields: `ts`, `available_at` |
| Storage | Timescale hypertables; Redis streams |
| Feature engine | Indicators, SMC/ICT, order flow, derivatives, whales, on-chain, macro, news |
| Regime module | |
| Scanner | |
| Strategy engine | |
| AI decision layer | Model calls, prompts, schemas |
| Backtester | Engine, cost model, walk-forward |
| Paper engine | |
| Risk engine | Limits; where it sits relative to the AI |
| Execution gate and adapters | Order types per venue |
| Journal / trade store | |
| Settings | PAPER/LIVE split |
| Frontend contracts | |
| Tests | |
| Graphify graph | |

## I.D Lessons from each public source

| Source | What is publicly documented (observation) | Principle extracted |
|---|---|---|
| **J.P. Morgan: AI Research / ML Center** (public research pages) | Large research programmes in AI for finance: ML, NLP, explainability, synthetic data and multi-agent simulation are listed public research areas. | AI is a **research and engineering discipline with governance**, not a single model. Synthetic data and explainability are first-class. |
| **J.P. Morgan Macrosynergy Quantamental System (JPMaQS)** | Macro-quantamental indicators published as **real-time / point-in-time** series (what was knowable on each date, using data vintages) for systematic backtesting. | Macro features **must be point-in-time** (vintages, release times). Revised data must never enter a historical decision. |
| **J.P. Morgan E-Trading survey; "The trading desk rewired"** | Institutional traders report growing use of e-trading, algorithms and AI. Liquidity and volatility are top concerns, and execution quality and data are a focus. | **Execution is part of the strategy**: algorithm choice, liquidity awareness and cost measurement (TCA). |
| **Two Sigma** (site, Investment Management, Insights) | Publicly frames investing as applying the **scientific method** to data at scale. Its Insights publish research such as factor-based risk lenses and ML approaches to **regime modelling**. | Hypothesis → data → test → deploy → monitor. Regimes are modelled **probabilistically**. Risk is viewed through factors. |
| **Citadel GQS** (PhD colloquium; ML researcher role) | These are careers and recruiting pages. They show emphasis on rigorous quantitative and ML research talent; no method is disclosed. | Only the general principle: **research rigour and peer review** before production. Nothing else is inferred. |
| **Man AHL; "The quant renaissance"** | A long-running **systematic, diversified trend-following** and quant programme across many markets. The firm publicly discusses ML, alternative data and AI in quant research. | **Diversified systematic trend** as a core return source; ML is added where it is validated; breadth across markets. |
| **AQR: Systematic Equities** | Public explanations of **factor investing**: value, momentum, quality, low-risk/defensive, with diversification across factors. | Combine **economically motivated, diversified** signals; prefer factor diversification over one signal. |
| **"Empirical Asset Pricing via Machine Learning"** (Gu, Kelly, Xiu; AQR page) | Tree models and neural networks improve return prediction over linear models. The dominant predictors are **momentum, liquidity and volatility**-type signals, with nonlinear interactions. | Use **regularised nonlinear models** (gradient boosting) on a compact set of known-strong features. Expect modest predictability. |
| **"Financial Machine Learning"** (Kelly, Xiu; AQR page) | Survey: financial prediction has **low signal-to-noise**; regularisation and economic structure matter; ML helps with complex interactions but overfits easily. | Strong regularisation, simple baselines first, economic priors, honest out-of-sample tests. |
| **BlackRock Systematic Investing** | Systematic investing that combines big and alternative data, ML and NLP with **economic intuition**, inside a risk-managed portfolio process. | Every signal needs an **economic rationale**. Text and alternative data are features, not oracles. |
| **BIS WP 1291 (Aquilina et al., 2025)** | A recurrent NN on more than 100 daily indicators **forecasts market-stress signals** (deviations from triangular arbitrage in EUR/JPY) up to 60 days ahead. Time-varying input weights explain drivers, and an **LLM then searches news** around those drivers. Out-of-sample 2021–24, it flagged real stress episodes. | A **stress/liquidity regime** detector with explainable drivers, plus an LLM used **only to explain** (retrieve news evidence), never to trade. |
| **BIS FSI: AI and financial stability** | Risks named: herding and model homogeneity, concentration on few providers, opacity, cyber risk and data quality. | Avoid crowded signals. Keep **explainability**, provider fallbacks and data-quality gates. |
| **BIS FSI Insights 63 (regulating AI)** | Supervisory focus: **model risk management**, governance, explainability, accountability, human oversight. | A model registry, approvals, human-in-the-loop for LIVE, audit trails. |
| **BIS FSI Insights 73 (AI data use)** | Focus on **data governance**: quality, lineage, provenance, privacy, and fitness for use. | Data lineage plus a quality score per source. Every feature is traceable to its raw data and availability time. |
| **Bailey, Borwein, López de Prado, Zhu: "The Probability of Backtest Overfitting"** (SSRN 2326253) | **CSCV** method to estimate the PBO; many trials make high in-sample Sharpe meaningless. | Count trials; compute the **PBO** (CSCV); reject strategies with a high PBO. |
| **SSRN 2507040** (statistical overfitting and backtest performance, same author group; title to be confirmed on the page, which was not reachable from here) | Selection bias under multiple testing inflates the Sharpe; minimum backtest length relative to the number of trials. | **Deflated Sharpe Ratio** and **minimum backtest length**; log every configuration tried. |
| **López de Prado: "What to Look for in a Backtest"** (SSRN 2308682) | A checklist of backtest pitfalls: survivorship, look-ahead, story-telling, data mining, transaction costs, outliers, shorting constraints. | A pre-flight **backtest integrity checklist** enforced in code (§I.R). |
| **Borrageiro, Firoozye, Barucca: "RL for Systematic FX Trading"** (arXiv 2110.04745) | Online transfer learning + recurrent RL agent on major FX pairs. **Costs (execution + funding) are in the objective**. Reported a modest net information ratio of about 0.5 over a 7-year test. | RL is viable only **cost-aware and online**, with realistic, modest expectations. In TIKALGO, RL is a **research track**, not v1 production. |
| **Zhang et al.: "Cost-Sensitive Portfolio Selection via Deep RL"** (arXiv 2003.03051, IEEE TKDE) | A policy network captures price patterns **and asset correlations**. The reward explicitly penalises **transaction and risk costs**. | Portfolio allocation and learning objectives **must include costs and risk**, and correlation must be modelled jointly. |
| **Schwager / Covel / Tharp** (books) | See Part II §1. | Risk first, asymmetric payoff, trend persistence, volatility sizing, R-multiples and expectancy. |

## I.E Source → Observation → Principle → TIKALGO implementation → Benefit → Failure mode
| # | Source | Principle | TIKALGO implementation | Expected benefit | Failure mode / mitigation |
|---|---|---|---|---|---|
| E1 | Two Sigma, BlackRock | Scientific method + economic rationale | **Alpha Registry**: each alpha must have a written hypothesis and rationale before any backtest (I.J) | Fewer spurious signals | Bureaucracy slows research. Keep the template short |
| E2 | JPMaQS, BIS FSI-73 | Point-in-time data and lineage | `available_at`, `source`, `vintage` and `quality_score` on every series; as-of joins only (I.H) | No look-ahead; reproducible backtests | Missing history for some feeds → weight 0 until collected |
| E3 | Two Sigma Insights, BIS WP1291 | Probabilistic regimes + stress detection | The regime engine outputs **probabilities** plus a separate **Stress/Liquidity model** (I.I) | Better routing; early de-risking | Regime lag. Hysteresis and an UNCERTAIN state |
| E4 | AQR factors, Gu-Kelly-Xiu | Diversified, regularised, nonlinear | Strategy families + a GBM meta-model with monotonic constraints (I.K, I.L) | Higher OOS stability | Overfitting. PBO, deflated Sharpe, purged CV |
| E5 | Man AHL, Covel | Diversified trend as core | TAMRS trend components across all profiles (Part II) | A robust core return source | Long flat periods. Diversify with orthogonal families |
| E6 | Kelly-Xiu (low SNR) | Simple first, complexity must earn its place | **Model ladder**: rules → logistic/linear → GBM → sequence models. Each step must beat the previous one OOS net of costs | No unjustified complexity | — |
| E7 | Bailey et al., López de Prado | Anti-overfitting | Experiment ledger, PBO (CSCV), DSR, MinBTL, purged k-fold + embargo (I.R) | Credible results | — |
| E8 | JPM e-trading, Zhang et al., Borrageiro et al. | Cost-aware everything | Execution Intelligence + **net-of-cost labels and objectives** (I.O, I.R) | Edges that survive costs | Cost model mis-estimated. TCA feedback loop |
| E9 | BIS FSI-63, BIS stability | Governance, explainability, human oversight | Model Registry, Decision Trace, approval workflow, kill-switch (I.Q) | Safe deployment and accountability | — |
| E10 | BIS WP1291 | LLM as an explainer and retriever, not a trader | News/LLM layer outputs **structured, evidence-linked events**; it never places orders (I.P) | Context without hallucinated trades | LLM errors. Schema validation, source evidence, quantitative confirmation |
| E11 | BIS stability (herding) | Avoid crowding | Crowding features (funding extremes, OI concentration, whale clustering) penalise entries | Fewer crowded-exit losses | — |
| E12 | Zhang et al., AQR | Correlation-aware portfolio | Portfolio construction with a covariance and cluster model and a risk budget (I.M) | True diversification | Correlations jump to 1 in crashes. Downside correlation and stress overlay |

## I.F Final TIKALGO architecture (extends the existing system; no parallel stack)
```
DATA SOURCES (existing workers: exchanges, brokers, MT5, Hyperliquid, on-chain, macro, news, social)
  ↓
DATA QUALITY & TIMESTAMP GOVERNANCE   (new checks inside existing ingestion: ts, available_at, vintage, lineage, quality_score)
  ↓
FEATURE FACTORY                       (= existing feature engine + registry + feature store views; versioned)
  ↓
MARKET REGIME ENGINE                  (= existing regime module, extended: probabilities + stress model)
  ↓
ALPHA RESEARCH ENGINE                 (new: alpha registry, research jobs; offline/batch only)
  ↓
STRATEGY ENSEMBLE                     (= existing strategy engine; families incl. TAMRS components)
  ↓
AI META-MODEL                         (= existing AI decision layer, restructured: quant meta-model + LLM context)
  ↓
PORTFOLIO CONSTRUCTION                (new module called by the existing signal → order path)
  ↓
RISK ENGINE                           (existing; extended; independent of AI; hard veto)
  ↓
EXECUTION INTELLIGENCE                (new layer inside the existing Execution Gate: order-type/algo choice, cost estimate)
  ↓
ORDER EXECUTION (existing adapters) → POSITION MONITORING → TRADE JOURNAL → OUTCOME ANALYSIS → RESEARCH
Parallel: NEWS · MACRO · SOCIAL · ON-CHAIN · WHALE · SENTIMENT · ALT-DATA → Feature Factory / AI context
Cross-cutting: Model Registry · Experiment Ledger · Drift Monitor · Decision Trace (immutable) · Kill-switch
```
The event bus (Redis Streams) carries:
- `features.*`
- `regime.*`
- `alpha.*`
- `signal.*`
- `decision.*`
- `order.*`
- `fill.*`
- `position.*`
- `journal.*`

Storage (Timescale/Postgres) holds:
- features
- decisions
- trades
- models
- experiments

All of these sit next to the existing tables, with migrations; nothing is replaced.

## I.G AI/Quant model hierarchy
| Level | Contents | Allowed to | Not allowed to |
|---|---|---|---|
| L1 Deterministic engines | Indicators, SMC/ICT, order-flow aggregates, Donchian/ATR, sessions | Produce features and setup candidates | Decide trades alone in LIVE without L4 + Risk |
| L2 Statistical models | Regime HMM/GMM or threshold model; volatility forecasts (EWMA/GARCH-lite); correlation and covariance (shrinkage); calibration (isotonic/logistic) | Produce probabilities, vol and cov forecasts, calibrated P(win) | Use unregularised in-sample fits |
| L3 ML models (only where L2 is beaten OOS net of costs) | LightGBM/XGBoost with monotonic constraints; random forest as a baseline; later TCN/GRU sequence models and RL (research track only) | Predict the forward net R / P(win) of a **given setup** (meta-labelling) | Generate trades without an L1 setup; train on non-point-in-time data |
| L4 Meta-model | Combines setup, regime probabilities, alpha scores and costs → `E[R]_net`, P(win), agreement/conflict, size multiplier ≤ 1 | Approve, reject or downgrade candidates; pick among strategies | Raise risk above the Risk Engine limits |
| L5 LLM intelligence | News and event extraction, macro narrative, research assistant, hypothesis generation, conflict analysis, explanation and Decision Trace text | Produce **structured, evidence-linked** context features and explanations | Place, size or modify orders; invent prices or news |

**Key method: meta-labelling.**
- L1/L2 propose the side, i.e. the setup and direction.
- L3/L4 predict whether that setup **will be profitable net of costs** and how much to scale it down.
- This keeps the decision explainable and reduces overfitting compared with predicting raw returns.

## I.H Feature architecture (Feature Factory)
**Feature registry.** Every feature is defined with:
```
feature_id, version, family, formula/code ref, inputs (series ids), timeframe, lookback,
ts, available_at rule (e.g. bar_close; release_time+delay; publish_time+ingest_delay),
market applicability, normalization (rolling, past-only), owner, created_at
```
- **Families:** see Part II §2. Added here: on-chain flows, exchange net flows, ETH/BTC, social sentiment, economic calendar, project-specific news, footprint/DOM imbalance (LTF only).
- **Quality metrics**, computed by a scheduled research job per (feature, market profile, timeframe) and stored:
  - coverage %;
  - staleness;
  - outlier rate;
  - stability (PSI over time);
  - redundancy (Spearman |ρ|, VIF);
  - **predictive contribution**: OOS rank-IC vs forward net R of each setup, its t-stat across walk-forward folds, and ablation ΔE[R].
- **Status lifecycle:** `candidate → research → validated → production → deprecated`.
  - Only `validated` and `production` features feed L3/L4.
  - `candidate` features may appear in the UI as context only.
- **Normalisation:** rolling, past-only (expanding or rolling z-score or percentile). Never fit on full history.

## I.I Regime engine (extends Part II §3)
- **States:**
  - Directional: TREND_UP, TREND_DOWN, RANGE, BREAKOUT, REVERSAL.
  - Volatility: VOLATILITY_EXPANSION, VOLATILITY_COMPRESSION.
  - Stress: CRASH, PANIC, LIQUIDITY_STRESS, LOW_LIQUIDITY.
  - Default: UNCERTAIN.
- **Layered outputs** (one state can't express everything):
  1. **Direction/structure layer**, a probability vector over {TREND_UP, TREND_DOWN, RANGE, BREAKOUT, REVERSAL}. Built from rules (Part II §3) plus a GMM/HMM on (ER, ADX, Donchian position, return skew, structure events), calibrated.
  2. **Volatility layer**: P(EXPANSION) / P(COMPRESSION) from ATR and BB-width percentiles and vol-forecast changes.
  3. **Stress layer**: P(CRASH / PANIC / LIQUIDITY_STRESS / LOW_LIQUIDITY), using these inputs:
     - drawdown speed (return over k bars < −x·σ);
     - liquidation-cascade size;
     - spread and depth deterioration;
     - funding dislocation;
     - VIX and MOVE jump;
     - cross-asset correlation spike;
     - stablecoin de-peg (crypto);
     - inspired by BIS WP1291: an explainable stress forecaster with feature weights.
- **Downstream use:**
  - The router uses the arg-max with hysteresis.
  - The meta-model uses the **full probabilities**.
  - The Risk Engine uses the stress layer: CRASH/PANIC → no new entries except validated volatility-short or hedge setups; LIQUIDITY_STRESS → size ×0.25 and market orders disabled for illiquid symbols; LOW_LIQUIDITY → limit-only, smaller size.
  - UNCERTAIN → NO TRADE.

## I.J Alpha Research Engine (Alpha Factory)
**Alpha registry** (table `alpha_registry`):
```
alpha_id, name, family, hypothesis (economic rationale), features[], markets[], timeframe,
regimes_expected[], expected_horizon, signal_def (code ref + version), output (signal, confidence),
training_period, validation_period, test_period, cost_assumptions, metrics_gross, metrics_net,
pbo, dsr, n_trials, failure_conditions, status (idea|research|validated|paper|shadow|live|retired),
owner, created_at, updated_at
```
- **Families** (each is one or more alphas with an explicit hypothesis):

  | Family | Example hypothesis |
  |---|---|
  | Momentum | Trend persistence after a volatility-normalised breakout |
  | Trend | Time-series momentum across markets |
  | Mean reversion | Overshoot reversion after a liquidity sweep in ranges |
  | Volatility | Compression precedes expansion |
  | Liquidity | Thin-book moves revert |
  | Order flow | CVD/price divergence precedes reversal |
  | Market structure | CHOCH after a sweep marks a regime change |
  | Cross-sectional | Relative strength within the crypto/stock universe |
  | Macro | Risk-on/off factor leads high-beta assets |
  | Sentiment | Extremes are contrarian at turning points |
  | News | Surprise vs consensus drives a drift |
  | Alternative / on-chain | Exchange inflows precede selling |
  | Whale | Large-trader positioning changes lead |

- **Pipeline:** idea (hypothesis text) → spec → offline research job (point-in-time data, costed) → validation gates (I.R) → paper → shadow → live.
  - Every run is recorded in the **experiment ledger**.
  - Alpha signals are published as features (`alpha.<id>`) into the Feature Factory. The meta-model consumes them like any other feature.

## I.K Strategy ensemble
- **Families:**

  | Family | Implementation |
  |---|---|
  | Trend Following | TAMRS S-TB/S-TP |
  | Breakout (Turtle-style) | S-TB |
  | Momentum | Cross-sectional or time-series |
  | Pullback | S-TP |
  | Mean Reversion | S-MR |
  | Volatility Squeeze | S-SQ |
  | Liquidity Sweep / SMC | S-MR/S-RV |
  | Order Flow | CVD/OI-led LTF entries |
  | Cross-Asset / Relative Value | Pairs and spreads, e.g. ETH/BTC, gold/DXY |
  | Macro | Risk-on/off allocation tilt |
  | News/Event | Post-event drift with quantitative confirmation |

- **Each strategy defines** (strategy card): hypothesis, entry, exit, invalidation, stop, targets, trailing, sizing rule, expected holding period, markets, regimes, cost sensitivity, capacity.
- **Implementation:** each strategy is a component in the existing strategy engine and emits **candidates** (setup, side, levels, invalidation). No strategy sends orders directly.

## I.L Meta-model / strategy router
**Inputs per candidate:**
- regime probabilities (all layers);
- strategy id and its recent live/paper performance (rolling expectancy, hit rate, drawdown);
- alpha scores;
- agreement/conflict matrix across active strategies;
- the cost estimate from Execution Intelligence;
- portfolio state.

**Model:**
1. Start with the **validated scoring + isotonic calibration** from Part II §6.1, which is the baseline.
2. Upgrade to a **monotonic-constrained LightGBM meta-label model** only if it beats the baseline OOS:
   - with purged walk-forward CV;
   - net of costs;
   - with PBO < 0.3.
3. Strategy weights per regime are learned as **out-of-sample performance-weighted** (e.g. shrinkage toward equal weight). There is no in-sample optimisation.

**Outputs:**
- active, suppressed or ignored strategies;
- `agreement_score`;
- `conflict_score`;
- `E[edge]`;
- `E[R]_net`;
- `E[cost]`;
- calibrated confidence;
- `size_multiplier ∈ [0, 1]`;
- decision ∈ {LONG, SHORT, WAIT, REDUCE, EXIT}.

**Disagreement rule (human–AI complementarity):**
- Systematic signal, AI context, Risk and Execution each vote: OK, caution or block.
- Any block → WAIT.
- Two or more cautions → REDUCE (×0.5) or WAIT.
- The system never forces a prediction.

## I.M Portfolio construction
- Computed on every candidate and on a schedule:
  - gross and net exposure;
  - exposure by asset, sector (stocks), currency (FX legs decomposed), market, strategy, venue and factor (crypto beta, equity beta, USD factor, rates, vol);
  - correlation clusters (Part II §6.5);
  - concentration (HHI);
  - portfolio volatility and expected drawdown from a shrinkage covariance (Ledoit-Wolf) on past-only returns, plus a stress covariance (crisis-window or downside correlation);
  - liquidity risk (days-to-exit vs ADV/depth).
- **Risk budgeting:** each strategy family and each cluster has a risk budget in R. A new trade is sized by the **marginal contribution to portfolio risk**. If adding it breaches a budget → resize or reject, recording "a good trade rejected due to portfolio risk".
- Optional, later: volatility targeting at portfolio level (scale all sizes so forecast portfolio vol ≤ target).

## I.N Risk engine (independent of AI; hard veto)
Part II §6.3–6.6 apply, plus:
- **Per-strategy drawdown limit:** a family is suspended if its rolling drawdown exceeds X R or 2× its historical 95th-percentile drawdown.
- **Weekly drawdown limit.**
- **Spread protection:** block if spread > profile max or > k× the rolling median.
- **Slippage protection:** block if the estimated slippage is > 0.15R.
- **Liquidity protection:** size ≤ k% of ADV/depth.
- **News-event reduction:** inside high-impact windows, block new entries and tighten existing stops per profile.
- Hard limits live in Risk Engine config. AI, LLM or meta-model outputs **cannot change them**; changes require an admin action with an audit log.

## I.O Execution intelligence
**Pre-trade estimate (stored with the decision):**
- spread;
- expected slippage, using the impact model `cost ≈ spread/2 + k·σ·√(size/ADV)`, calibrated from own fills (TCA);
- depth at ±x bps;
- funding/borrow to the expected holding period;
- fees (venue tier);
- latency budget;
- fill probability for limits (from queue position and volatility).

**Order-type policy:**

| Condition | Order type |
|---|---|
| Urgent stop-out | Market (or stop-market) |
| Breakout entry | Stop-limit with a slippage cap |
| Pullback or mean-reversion entry | Limit with expiry |
| Large size vs depth | TWAP/VWAP slicing (implemented in our layer when the venue lacks it) |
| Iceberg | Only where the venue supports it |

**Rules:**
- Never assume the theoretical price.
- The backtester uses the same cost model.
- Post-trade **TCA** is computed for every fill: implementation shortfall vs decision price and arrival price.
- TCA drift feeds the drift monitor.

## I.P News / LLM architecture
```
ingestion (existing news/social workers) → dedupe → ENTITY RESOLUTION (ticker/asset map, aliases)
→ EVENT CLASSIFICATION (taxonomy: macro release, CB, regulation, hack/exploit, listing/delisting, ETF flow,
  earnings, guidance, M&A, legal, unlock, outage, geopolitics) → SENTIMENT → SURPRISE (vs consensus/expectation)
→ IMPORTANCE → EXPECTED IMPACT & DIRECTION → AFFECTED ASSETS → HORIZON → CONFIDENCE
→ MARKET CONFIRMATION (price/volume/OI reaction within window) → feature `news.<event_type>`
```
- **Anti-hallucination:**
  - The LLM receives only retrieved source text. Its output is schema-validated JSON with `source_url`, `publisher`, `published_at`, `ingested_at` and `evidence_quote` (a span from the source).
  - Any claim without evidence is dropped.
  - Two-source confirmation is required for high-impact events.
- **Use:**
  - News events become **features and risk flags**.
  - An order needs a quantitative setup **plus market confirmation**. LLM output can never trigger an order.
- **Macro layer** (point-in-time, JPMaQS principle):
  - Series: inflation, growth, employment, rates, CB decisions and stance, yield-curve slope, DXY, VIX, US10Y, commodities, equity indices, credit spreads, liquidity proxies (e.g. central-bank balance sheets, stablecoin supply), global risk sentiment.
  - Each value is stored with `reference_period`, `release_time` and `vintage`. Backtests read the **vintage available at decision time**.
- **LLM models:** the pluggable decision-model hierarchy from MASTER_PROMPT §15: Jev, offline models and cloud models, with fallback.

## I.Q Model governance
- **Model registry** (`model_registry`): model_id, version, type, purpose, training dataset version (hash), feature set and versions, hyperparameters, code commit, training dates, validation and test periods, metrics gross and net, PBO, DSR, approvals, deployment date, status (research|validated|shadow|paper|live|retired), drift status, rollback version.
- **Experiment ledger:** every backtest or training run is logged with parameters, dataset/feature versions, period and results. It is the input to PBO, DSR and MinBTL.
- **Promotion lifecycle:** RESEARCH → BACKTEST → OOS → WALK-FORWARD → STRESS → PAPER → SHADOW (live data, no orders, decisions logged) → REVIEW → **manual approval** → LIVE (small risk first).
- **Drift monitor**, with alert, auto-demote to shadow (never auto-promote) and a research ticket on breach:
  - prediction drift: calibration error;
  - feature drift: PSI/KS;
  - regime drift: state-frequency change;
  - performance drift: rolling expectancy vs the OOS CI;
  - correlation drift;
  - execution drift: TCA.
- **No untracked model may trade LIVE.** The Execution Gate checks `model_id@version` status == live.
- **Decision Trace** (immutable, append-only; hash-chained): regime, strategy, top features with direction, model confidence, E[edge], E[R], risk, conflicts, reasons for and against, final decision, and model, feature and data versions.

## I.R Anti-overfitting methodology
1. **Hypothesis before test.** The alpha registry must contain the hypothesis first.
2. **Point-in-time data and leakage tests** (Part II §9.1), plus label-leakage checks.
   - Labels are triple-barrier or setup-outcome R, computed only from future bars **of the label**.
   - Features never use bars after t.
   - **Purged k-fold CV with an embargo** for any ML model.
3. **Splits:** IS / OOS / rolling and anchored walk-forward. A final **lock-box** test period is touched once.
4. **Multiple-testing control:**
   - log `n_trials`;
   - compute the **PBO via CSCV** (Bailey et al.), gate PBO < 0.3;
   - compute the **Deflated Sharpe Ratio**, gate DSR > 0.95 probability;
   - check **minimum backtest length** vs trials.
5. **Robustness:**
   - parameter plateaus;
   - Monte Carlo (trade resampling and order randomisation);
   - entry-delay and 2× cost stress;
   - regime-by-regime and market-by-market results;
   - synthetic stress scenarios.
6. **Synthetic / stress data** (robustness only, never a substitute for real validation):
   - block bootstrap of returns: preserves autocorrelation and vol clustering;
   - GARCH-type simulation with fitted parameters;
   - multi-asset regime-switching simulation with a fitted cross-asset correlation;
   - injected liquidity shocks: spread ×5, depth ÷5, gaps;
   - forced regime transitions.
7. **Gross vs net:** every report shows both. Optimisation targets are always **net**.
8. **Backtest checklist** (López de Prado), enforced as a report section: survivorship, look-ahead, storytelling, data-snooping count, costs, outliers, shorting and borrow constraints, capacity.

## I.T Feedback loop (controlled learning)
**Recorded for every closed trade** (journal, linked to the Decision Trace):
- predicted edge, P(win) and E[R];
- actual net return and R;
- MFE/MAE in R;
- slippage vs estimate, TCA;
- regime probabilities at entry and at exit;
- strategy and alpha ids;
- feature snapshot;
- news events, whale state and portfolio state.

**Outcome attribution** (automatic, then reviewed). Each loss and win is classified as:
- **regime error**: the regime changed or was misread;
- **signal error**: the setup failed in the correct regime;
- **execution error**: slippage > 2× estimate, or a missed fill;
- **risk error**: the stop was too tight or wide vs MAE distribution, or a size or limit breach;
- **variance**: within expected distribution.

Aggregates feed research tickets and the drift monitor.

**Self-learning rule:**
- Nothing learned online changes LIVE logic.
- Changes become new model or strategy **versions** that go through the full promotion lifecycle (I.Q).

## I.W Remaining weaknesses (Part I)
- Many institutional practices assume **large, clean, long data histories**. TIKALGO's derivatives, whale, on-chain and news history may be short. Those features stay at weight 0 until enough point-in-time data is collected.
- ML meta-models need many trades. Until then, the calibrated scoring baseline is used.
- Execution and TCA models need real fills. PAPER fills are optimistic, so calibrate with small LIVE size only after approval.
- LLM news extraction quality varies by language and source. Evidence and confirmation rules limit the damage but don't remove errors.
- RL is a research track only: costly to validate and prone to overfitting.

## I.X How to use this in TIKALGO: exact implementation order
Goal: upgrade **(1) the signal engine, (2) trade management, (3) capital management** on the existing code.

| Phase | Upgrades | Concrete result in the product |
|---|---|---|
| Q0 | Assessment (A, B, C) | Map of reuse / extend / missing; data coverage table |
| Q1 | Research report | Committed research docs (this file adapted to the real code) |
| Q2 | Data governance | `available_at`, vintages, lineage, quality score; leakage tests; fixes |
| Q3 | Feature Factory | Registry + quality metrics + redundancy/ablation jobs |
| Q4 | Regime engine v2 | Probabilistic layers + stress model; UI regime badge with probabilities |
| Q5 | Strategy ensemble | TAMRS components + strategy cards; candidates only |
| Q6 | Meta-model baseline + Risk extensions + Portfolio construction | **Signal engine upgrade**: `E[R]_net`, conflicts, explanations. **Capital management**: risk budget, clusters, DD ladder |
| Q7 | AI/LLM layer contract + Decision Trace | Explainable decisions; AI cannot add trades or risk |
| Q8 | Backtests + anti-overfitting (PBO/DSR/plateaus/MC/stress) | Honest gross/net reports per component |
| Q9 | Integration: Scanner, AI Signals, Watchlist, Paper | Live signals in the UI, PAPER trading |
| Q10 | Execution Intelligence + TCA | **Trade management upgrade**: order-type policy, cost estimates, slippage control |
| Q11 | Alpha Factory | Alpha registry + experiment ledger + research jobs |
| Q12 | News/LLM pipeline + point-in-time macro | Evidence-linked event features; macro vintages |
| Q13 | Model registry + drift monitor + shadow mode | Governance; auto-demote on drift |
| Q14 | ML meta-label model (only if it beats the baseline) | Better calibration of `E[R]` |
| Q15 | Feedback loop / outcome analysis | Per-trade attribution: regime, signal, execution or risk error |
| Q16 | Shadow → review → manual approval | Validated cells eligible for LIVE (still OFF by default) |

---

# PART II: TAMRS (TIKALGO Adaptive Multi-Regime Strategy)
The core of the Strategy Ensemble. It is derived from Schwager (Market Wizards series), Covel/Turtle and Tharp.
Sections §1–§12 below are referenced from Part I.

## 1. Research matrix: SOURCE → PRINCIPLE → CODABLE RULE → TIKALGO FEATURE → EXPECTED ADVANTAGE → FAILURE CONDITIONS

### 1.1 Market Wizards / The New Market Wizards / Hedge Fund Market Wizards (Schwager)
These books are interviews, not systems. Only themes that **recur across many interviewees** are kept. Single anecdotes are not used.

| # | Principle (recurring theme) | Codable rule | TIKALGO feature | Expected advantage | Failure conditions |
|---|---|---|---|---|---|
| MW1 | Risk control comes before return. A small, fixed fraction of equity is at risk per trade (e.g. Larry Hite's ~1%). | `risk_per_trade ≤ r_max` (default 0.5% equity, max 1%). A hard cap is enforced in the Risk Engine and never overridden by the AI. | Risk Engine | Survives losing streaks and keeps the system able to compound. | Too-small risk plus high costs: fees dominate. |
| MW2 | Asymmetric payoff: take a trade only when reward is a multiple of risk (e.g. Paul Tudor Jones's "5:1" mindset). | `E[R]_net ≥ θ_edge` and `planned_RR ≥ RR_min[setup]` (trend 2.5, reversion 1.5). | Fusion / Edge model | Positive expectancy even at win rates below 40%. | RR targets beyond realistic liquidity, so TPs are rarely hit. |
| MW3 | Cut losses fast. The stop goes where the trade idea is proven wrong (e.g. Bruce Kovner's "stop at a point the market shouldn't reach if I'm right"). | SL = structural invalidation + buffer, bounded to `[0.8, 3.0]×ATR`. Skip the trade if the bound is violated. | SMC structure, ATR | Small, well-defined losses. | Stop-hunting in thin markets. Mitigated by a sweep buffer and liquidity-aware placement. |
| MW4 | Let winners run. No fixed small TPs on trend trades. | Trend setups keep a runner with a volatility trailing stop. | Exit Engine | Fat right tail of R. | Range regimes give back gains. Handled by the regime-change exit. |
| MW5 | Never add to losers. Add only to winners, if at all. | Pyramiding is allowed only when open P&L ≥ +0.5N (§6.4). Averaging down is forbidden in code. | Risk Engine | Prevents catastrophic martingale behaviour. | — |
| MW6 | Reduce size after drawdowns. Don't "trade bigger to get it back". | Drawdown ladder (§6.6). Size multipliers are always ≤ 1. | Risk Engine | Lower risk of ruin. | Slower recovery. Accepted. |
| MW7 | Adapt to the market. Different styles work in different conditions. | Regime engine plus router. Each setup is allowed only in compatible regimes. | Regime Engine | Avoids trend systems in chop and mean reversion in trends. | Late or noisy regime detection. Handled by hysteresis and the UNCERTAIN state. |
| MW8 | Avoid overtrading. Patience; "no trade" is a position. | Minimum edge threshold, cooldown per symbol after a stop-out, max trades/day per market. UNCERTAIN means no trade. | Router, Risk Engine | Fewer low-quality trades and lower costs. | Missing opportunities. Measured, not optimised away. |
| MW9 | Independent judgement: don't follow the crowd blindly; use sentiment as contrarian context at extremes. | Sentiment and funding are used **only at extremes**, as a contrarian/penalty input, never as a primary trigger. | Sentiment, Funding | Avoids crowded entries. | Extremes persist in strong trends. Penalty only, never a reversal trigger alone. |

### 1.2 Trend Following (Covel) and the Turtle rules (Faith, public PDF; Covel's TurtleTrader)
| # | Principle | Codable rule | TIKALGO feature | Expected advantage | Failure conditions |
|---|---|---|---|---|---|
| TF1 | Price breakout of a lookback range starts the trade. | Donchian breakout: `close > max(high[1..N])` (long), `close < min(low[1..N])` (short). N comes from the market profile (fast ~20, slow ~55 HTF bars). | Feature Engine (Donchian) | Captures large trends early and systematically. | Fake breakouts in ranges. Gated by the regime and confluence filters. |
| TF2 | Volatility normalisation: N = ATR. | All distances (stops, adds, targets, buffers) are in ATR units of the **execution** timeframe. | ATR | The same rules work across markets and volatility levels. | ATR spikes after gaps. Use the median of ATR(20) and ATR(50) when the spike ratio is > 2. |
| TF3 | Size by volatility so each position risks the same equity fraction. | `qty = (equity × r) / (stop_dist × point_value)` | Risk Engine | Equal risk per trade, so diversification actually works. | Very low ATR inflates size. Capped by notional, leverage and liquidity caps. |
| TF4 | Pyramiding in strong trends, in fixed volatility steps. | Add a unit at each +0.5N, max 3 adds. Raise all stops to keep **total open risk ≤ 1.5×r** for the position. | Risk Engine | Larger exposure only when the trade is already working. | Choppy reversals after adds. Mitigated by stop raising and the total-risk cap. |
| TF5 | Exit on an opposite shorter-channel break or a trailing stop. Don't predict tops. | Exit runner on an opposite Donchian(N/2) close, or a chandelier stop (`HH − m×ATR`), whichever is tighter. | Exit Engine | Rides trends and exits mechanically. | Giving back 1–2 ATR at trend end. By design. |
| TF6 | Systematic execution across many markets: robustness over optimisation. | One rule set with **profile-level** parameters only (no per-symbol curve fitting). Parameters must sit on plateaus (§9.4). | Backtester | Out-of-sample stability. | Weak in long sideways markets. Handled by the router. |
| TF7 | Trend following has low win rates and long flat periods. | Expectancy and Monte Carlo drawdown are reported. Acceptance is never based on win rate. | Backtester | Realistic expectations. | Psychological abandonment. Mitigated by reporting and education. |

### 1.3 Trade Your Way to Financial Freedom (Tharp)
| # | Principle | Codable rule | TIKALGO feature | Expected advantage | Failure conditions |
|---|---|---|---|---|---|
| VT1 | Measure every trade in **R** (R = initial risk). | Every trade stores `R0`, `exit_R`, `MAE_R` and `MFE_R`. | Trade journal, DB | Comparable statistics across markets and sizes. | Moving the initial stop corrupts R. `R0` is immutable. |
| VT2 | **Expectancy** = mean R per trade, net of costs. | `E = mean(exit_R_net)`. Strategy, setup, regime and market are each enabled only if their walk-forward OOS `E > 0.1R`. | Backtester, Router | Trade only where edge exists. | Small samples. Requires a minimum N and confidence intervals. |
| VT3 | System quality ≈ consistency of R (Tharp's SQN). | `SQN = √min(N,100) × mean(R) / std(R)` is reported per setup and regime. It is a ranking metric, not a hard gate. | Backtester | Prefers stable edges over lucky outliers. | Heavy tails distort std. Also report the median R. |
| VT4 | Position sizing is the main lever for objectives and drawdown. | Sizing is a separate module (fixed-fractional). It is configurable per profile and **independent of signal confidence**. | Risk Engine | Drawdown matches user tolerance. | — |
| VT5 | Portfolio heat: total open risk is capped. | `Σ open_risk_R ≤ heat_max` (default 3R, max 6R). Correlated clusters are capped separately (§6.5). | Portfolio Intelligence | Prevents hidden concentration. | — |
| VT6 | The system must fit the trader and the market. | User risk profile (conservative/balanced/aggressive) maps to `r` and `heat_max` only. Signals are unchanged. | Settings | The user can live with the drawdowns. | — |

### 1.4 What is deliberately **not** taken
- Discretionary "feel", tape-reading anecdotes and specific personal trades: not objectively codable.
- Martingale or "double after loss" ideas from any source: forbidden.
- Fixed per-symbol parameters tuned to history: replaced by market-profile parameters plus plateau checks.

---

## 2. Feature selection: independent information only

Features are grouped into **families**. Inside a family, at most **one primary feature** enters the
fusion score. Others are confirmers or are dropped.

| Family | Candidates (existing TIKALGO) | Primary (default) | Notes |
|---|---|---|---|
| Trend direction | EMA slope, Kijun, Ichimoku cloud, Donchian position, HTF BOS | **Donchian position + HTF structure (BOS)** | Kijun and EMA are highly correlated with Donchian position; Kijun is used only as the pullback zone. |
| Trend strength / efficiency | ADX, Kaufman Efficiency Ratio (ER), R² of regression | **ER(20)** with ADX as tie-break | ER is cheaper and less lagging; ADX is kept for UI. |
| Momentum | RSI, MACD, ROC | **RSI(14) only, at extremes or divergence** | MACD is redundant with trend plus ROC. |
| Volatility | ATR, BB width, realised vol, VIX (macro) | **ATR percentile (rolling 1y on HTF)** plus **BB-width percentile** (compression) | Two different questions: level and compression. |
| Structure / liquidity | BOS/CHOCH, sweeps, FVG, OB, liquidity walls | **CHOCH/BOS events + liquidity sweep flag** | FVG and OB are used only as entry zones, not as score. |
| Order flow | CVD/delta, volume, DOM imbalance | **CVD slope divergence/confirmation** (crypto); **volume z-score** (all) | DOM is too fast or noisy for HTF; LTF entry confirm only. |
| Derivatives positioning (crypto) | OI, funding, liquidations, long/short ratio | **ΔOI with price** (4-quadrant) plus **funding z-score at extremes** | The liquidation cascade flag is an event filter. |
| Whales | CEX whale flows, Hyperliquid whale positions | **Hyperliquid net whale position change** (if data is point-in-time) | Penalty or confirm only; weight starts at 0 until OOS proves value. |
| Macro / cross-asset | DXY, VIX, US10Y, Gold, NDX/SPX, BTC.D, Fear & Greed | **Risk-on/off composite** (one PCA factor of DXY, VIX, US10Y, NDX) plus **BTC.D trend** for alts | Individual macro series are collinear; use one factor. |
| News / sentiment | News sentiment, event calendar | **High-impact event window flag** (block) plus a sentiment extreme (penalty) | Never a trigger. |

**Redundancy procedure** (run in research phase Q3, re-run monthly):
1. Compute the rolling Spearman |ρ| between candidate features on aligned closed bars, per market profile.
2. If |ρ| > 0.7 on more than 60% of windows, keep the feature with the higher **OOS rank-IC** against forward `R` of the setup.
3. Check VIF < 5 among the final primaries.
4. **Ablation:** a family enters the live score only if removing it **reduces** walk-forward OOS expectancy by at least 0.03R. Otherwise its weight is 0, and it is shown in the UI as "context".

---

## 3. Market Regime Engine

Computed on the **context timeframe (HTF)** on closed bars only. The output is a regime plus a confidence in [0, 1].

Inputs:
- `ER20`
- `ADX14`
- `DonchianPos = (close − LL_N)/(HH_N − LL_N)`
- `ATRpct` (ATR percentile, 1y)
- `BBWpct` (BB-width percentile, 1y)
- last structure event (BOS/CHOCH with direction, age in bars)
- `breakout_flag` (TF1 on HTF within the last k bars)

| Regime | Rule (defaults; profile-tunable within plateau ranges) |
|---|---|
| HIGH_VOLATILITY (overlay) | `ATRpct ≥ 0.90`, or a liquidation-cascade or gap event in the last k bars. It can coexist with a directional regime and **multiplies size by ≤ 0.5**. |
| BREAKOUT | `breakout_flag` and `BBWpct` at the previous bar ≤ 0.35, and volume z ≥ 1.5. |
| TREND_UP | `ER20 ≥ 0.30` and `ADX14 ≥ 20`, `DonchianPos ≥ 0.6`, and the last structure event is a bullish BOS. |
| TREND_DOWN | Mirror of TREND_UP. |
| REVERSAL | Opposite CHOCH within the last 3 bars, after a TREND regime that lasted ≥ m bars, plus an HTF liquidity sweep of the trend extreme. |
| LOW_VOLATILITY | `BBWpct ≤ 0.15` and `ATRpct ≤ 0.25`, with no trend conditions met. |
| RANGE | `ER20 < 0.20` and `ADX14 < 18`, and price inside a defined range (≥ 2 touches each side). |
| UNCERTAIN | None of the above, conflicting conditions, or stale or missing data. **This is the default.** |

- **Hysteresis:** a new regime must hold for `dwell` consecutive closed HTF bars (default 2) before
  switching. Exception: switching to HIGH_VOLATILITY or UNCERTAIN is immediate.
- **Priority when several match:** UNCERTAIN (data) > HIGH_VOLATILITY overlay > REVERSAL > BREAKOUT > TREND > LOW_VOL > RANGE.
- **Integration:** reuse the existing TIKALGO market-regime module. Extend its enum or map its states
  to the regimes above; do not create a parallel engine.

---

## 4. Adaptive Strategy Router

Setups are **components** of one strategy. Each has its own walk-forward-validated expectancy per (market profile × regime).
The router enables a (setup, regime, profile) cell only if its OOS `E ≥ 0.10R` with `N ≥ 50` trades. Otherwise the cell is disabled and shown as such in the UI.

| Regime | Allowed setups (priority order) | Size multiplier |
|---|---|---|
| TREND_UP / TREND_DOWN | **S-TP** trend pullback (with trend), **S-TB** trend breakout continuation | 1.0 |
| BREAKOUT | **S-TB** (first breakout), **S-SQ** if it came from compression | 1.0 |
| HIGH_VOLATILITY overlay | Only S-TB or S-TP in the direction of the HTF trend | ≤ 0.5 |
| LOW_VOLATILITY | **S-SQ** (pending; triggers only on expansion) | 1.0 |
| RANGE | **S-MR** range sweep-and-reclaim | 0.75 |
| REVERSAL | **S-RV** sweep + CHOCH + order-flow divergence | 0.5 (until OOS proves otherwise) |
| UNCERTAIN | **No trade**. Existing positions are managed by the Exit Engine only. | 0 |

---

## 5. Setup definitions (entry rules)

Notation:
- **HTF** = context timeframe, **ETF** = execution timeframe (§8).
- All conditions use **closed** bars.
- `buf = 0.1×ATR_ETF` plus the spread.

### S-TB: Trend breakout
1. HTF regime TREND or BREAKOUT, in the trade direction.
2. ETF close beyond Donchian(N_fast) in the trade direction.
3. Confluence (≥ 2 of 3):
   - volume z ≥ 1.0;
   - CVD slope in the trade direction (crypto) or ΔOI confirms (price↑OI↑ for longs);
   - no opposing HTF liquidity wall within 1×ATR_HTF.
4. **Exhaustion guard:** the breakout bar range is ≤ 2.5×ATR_ETF, and distance from Kijun_HTF is ≤ 3×ATR_HTF.
5. **Entry:** next bar open (market), or a stop order at the breakout level + buf.
6. **Stop:** the more conservative of the last opposite ETF swing − buf and `entry − 2×ATR_ETF`, bounded to [0.8, 3]×ATR_ETF. If outside the bound, skip.

### S-TP: Trend pullback
1. HTF TREND, in the trade direction.
2. Price pulls back into the **value zone**: the overlap of Kijun_HTF ± 0.5 ATR, an unfilled FVG or OB on the MTF, or a 38–62% retracement of the last impulse.
3. ETF **CHOCH back in the trend direction** inside the zone (LTF structure shift).
4. RSI(14) on the ETF is not at an opposite extreme (avoid catching momentum against the trade).
5. **Entry:** on the CHOCH bar close, or a limit at the zone mid with an expiry of n bars.
6. **Stop:** beyond the zone or pullback extreme + buf, bounded as above.

### S-SQ: Squeeze expansion
1. HTF or MTF LOW_VOLATILITY, with `BBWpct ≤ 0.15` for at least k bars and a defined box (HH/LL of the compression).
2. Trigger: ETF close outside the box + buf, with volume z ≥ 1.5.
3. Direction bias: the HTF trend if one exists; otherwise both sides are allowed, and the first trigger cancels the other.
4. **Stop:** the opposite side of the box or the box mid (whichever gives risk within the bound).

### S-MR: Range sweep-and-reclaim
1. HTF RANGE with valid range boundaries.
2. Price sweeps a boundary (wick beyond by ≥ 0.2×ATR) and **closes back inside** (reclaim) on the ETF.
3. At least one of:
   - CVD divergence at the sweep;
   - RSI divergence;
   - funding or sentiment extreme in the sweep direction (crypto).
4. **Targets:** TP1 = range mid, TP2 = the opposite boundary − buf. There is no runner.
5. **Stop:** the sweep extreme + buf.

### S-RV: Reversal
1. A TREND regime with ≥ m bars, an HTF liquidity sweep of the trend extreme, then an MTF CHOCH against the trend.
2. Order-flow divergence (CVD or ΔOI against price), plus a funding or positioning extreme (crypto) or a sentiment extreme.
3. **Entry:** on the first ETF pullback into the CHOCH origin (FVG or OB).
4. **Stop:** beyond the sweep extreme + buf. Size multiplier 0.5.

---

## 6. Fusion, edge and risk

### 6.1 Strategy fusion: scoring model (no simple averaging)
For a candidate trade from setup *s* in direction *d*, each family score is computed in [−1, +1] and
signed so that **+ means it supports d**:

```
Regime, Trend, Structure, Momentum, Volatility, OrderFlow, Liquidity, Whale, Macro, News
```

```
raw      = Σ_f  w[s, regime, profile][f] · score_f            (weights ≥ 0, Σw = 1; w_f = 0 for families that failed ablation)
penalty  = P_contra + P_corr + P_unc + P_exec
  P_contra = λ1 · Σ_f w_f · max(0, −score_f)                  (strong evidence against d)
  P_corr   = λ2 · cluster_exposure_ratio                       (§6.5)
  P_unc    = λ3 · (1 − regime_confidence) + λ4 · data_staleness
  P_exec   = (spread + fees + expected_slippage + funding_to_TP1) / stop_dist   (in R units)
fused    = raw − penalty
```

**Edge model.** Calibrated mapping from `fused` to expected net R. It uses walk-forward isotonic
regression, or logistic regression for P(win), on OOS folds:

```
P_win   = calib_p(fused | s, regime, profile)
E[R]_net = P_win · avgWinR(s, regime, profile) − (1 − P_win) · avgLossR(...) − P_exec
TRADE  ⇔  E[R]_net ≥ θ_edge (default 0.25R)
        ∧ P_win ≥ p_min[s]
        ∧ planned_RR ≥ RR_min[s]
        ∧ no hard blocks
```

**Hard blocks:**
- UNCERTAIN regime;
- a high-impact news window (±15–30 min, profile-specific);
- stale data (> 2 ETF bars);
- spread above the profile max;
- market closed or illiquid session;
- symbol in cooldown;
- any Risk Engine limit hit.

### 6.2 Exit Engine
| Exit | Rule |
|---|---|
| Hard SL | An exchange-side stop order is placed with every entry. It is always present and only moves in the favourable direction. |
| Structure invalidation | ETF close beyond the invalidation level (CHOCH against the position on the ETF for S-TP or S-TB) → exit at market. |
| ATR stop | The initial stop as defined per setup. |
| Partial profit | TP1 = 1.0R: close 1/3 (trend) or 1/2 (MR, RV). TP2 = 2.5R or the next HTF liquidity pool, whichever is nearer: close 1/3. TP3 = runner (trend setups only). |
| Break-even | After TP1, the stop moves to entry ± fees (BE+). |
| Trailing | Runner: the tighter of a chandelier stop `HH_since_entry − 3×ATR_ETF` and an opposite Donchian(N_fast/2) close. |
| Time exit | No progress (MFE < 0.5R) after `T_max[s]` ETF bars, e.g. 20 for trend and 10 for MR → exit. |
| Regime-change exit | HTF regime turns UNCERTAIN or opposite: tighten the trail to 1.5×ATR. If it turns opposite and the position is < 1R: exit. |
| Opposite-signal exit | A validated opposite setup with `E[R]_net ≥ θ_edge` → exit. There is no automatic reversal; a new entry needs its own pass. |
| Funding / expiry | Crypto perps: if the expected funding cost to TP2 is > 0.2R, exit at the next TP or skip entry. Futures with expiry: roll or exit by rule. |

### 6.3 Position sizing (Risk Engine: extend the existing one, don't duplicate it)
```
risk_amount  = equity × r × m_regime × m_vol × m_dd          (every m ≤ 1; confidence is NEVER a multiplier)
qty          = risk_amount / (stop_dist × point_value)
qty          = min(qty, notional_cap, liquidity_cap = k × median_1m_volume, leverage_cap)
```
- `r` default **0.5%** (configurable 0.1–1.0%). It is set separately for PAPER and LIVE.
- **Leverage recommendation:** `lev = ceil(notional / (equity × alloc_cap))`, capped at
  `min(profile_max_lev, user_max_lev)`.
- **Liquidation distance:** `liq_dist ≥ 3 × stop_dist` and ≥ 1.5×ATR_HTF. Otherwise reduce leverage or skip.

### 6.4 Pyramiding (S-TB and S-TP only, in TREND regimes)
- Add a unit at each +0.5×ATR_ETF from the last fill, up to 3 adds.
- Each add needs: the regime still TREND, the fused score still above the threshold, and no Risk Engine limit hit.
- After each add, move all stops so the position's **total open risk ≤ 1.5×r**.
- Never add if the position is below break-even.

### 6.5 Portfolio Intelligence
- **Correlation:** rolling 60-bar HTF return correlation, plus downside correlation (bars with returns < 0).
  Hierarchical clustering with |ρ| ≥ 0.7 forms a cluster (BTC/ETH/SOL will usually be one "crypto beta" cluster).
- **Exposure metrics:**
  - per cluster, direction, strategy (setup), market and exchange;
  - expressed in R-at-risk and in beta-adjusted notional (beta to BTC for crypto, SPX for stocks, DXY for FX majors).
- **Limits (defaults):**
  - portfolio heat ≤ 3R;
  - per cluster ≤ 1.5R;
  - net directional crypto beta ≤ 2R;
  - per setup ≤ 2R;
  - per symbol ≤ 1R (plus pyramid cap).
- A new trade that breaches a limit is **resized down**. If the resized trade is < 0.25R, it is skipped.
  The reason is recorded.

### 6.6 Account protection
| Rule | Default |
|---|---|
| Daily loss limit | −2R (or −2% equity) → no new entries until the next session or day |
| Weekly loss limit | −5R → no new entries for the rest of the week; requires a manual resume |
| Drawdown ladder (from equity peak) | DD ≥ 5% → `m_dd = 0.5`; ≥ 10% → 0.25; ≥ 15% → **halt new entries** and alert the admin |
| Losing streak | 5 consecutive losses → `m_dd ≤ 0.5` until 2 winners |
| Max trades | Per day per profile (crypto 6, FX 4, stocks 4); cooldown of 3 ETF bars per symbol after a stop-out |

---

## 7. Market profiles (no identical parameters across markets)

These are starting defaults. Each value may move only inside its plateau (§9.4).

| Profile | Context / setup / trigger TFs | Donchian N (fast/slow) | Sessions / hours | Cost model | Leverage cap | Notes |
|---|---|---|---|---|---|---|
| Crypto spot | 1D / 4h / 1h | 20 / 55 | 24/7; reduce size in the weekend low-liquidity window | Maker/taker per venue + spread + slippage(ATR, depth) | 1× | No shorts unless margin is enabled |
| Crypto futures (perps) | 4h / 1h / 15m | 20 / 55 | 24/7; avoid ±10 min around funding timestamps for entries | Same as spot + funding (point-in-time) | Profile max 5× (user ≤ 10×) | OI, funding and liquidations enabled |
| Forex majors | 1D / 4h / 1h | 20 / 55 | Trade London and NY; no entries in rollover ±30 min or on Friday after NY close | Spread (session-dependent) + commission + swap | Broker or regulatory cap; default 10× | News windows: NFP, CPI, FOMC, central bank decisions |
| Gold / metals | 1D / 4h / 1h | 20 / 55 | London + NY; avoid the Asia thin hours | Spread + commission + swap | 10× | DXY and real yields as macro inputs |
| US stocks | 1W / 1D / 1h | 20 / 50 | RTH only; no entries in the first 15 min or around earnings (±1 day) | Commission + spread + borrow (shorts) | 1–2× | Gap risk → stop bound uses the gap-adjusted ATR |
| ETFs | 1W / 1D / 4h | 20 / 50 | RTH | As stocks | 1–2× | Lower vol → larger N acceptable |

Intraday / seconds profiles (scalping) are **out of scope for v1**. They are enabled only after the
higher-TF profiles pass validation, because cost sensitivity is extreme.

---

## 8. Timeframe intelligence
- Each profile defines a **triple**: context (HTF, regime and bias), setup (MTF, zones and structure) and trigger (ETF, entry and stop).
  The user may pick a preset (Swing, Intraday, Position). Arbitrary TFs are allowed, but `HTF/ETF ≥ 4×`.
- HTF values are joined to ETF bars **as of the last closed HTF bar** (no partial HTF bar is ever used).
- Supported TFs follow the existing data layer: seconds → 1M. Bars are resampled from the base series by the existing aggregation, not by a new one.

---

## 9. Data integrity, backtesting and robustness

### 9.1 Non-repaint and no-lookahead (hard requirements)
- Signals are computed only on **closed** bars. Intrabar values are never used for signal state; they may be used only for stop or limit fills in the simulator.
- Every non-OHLCV series must have an `available_at` (knowledge time) timestamp and be joined **as-of `available_at` ≤ decision time**. This covers OI, funding, liquidations, whales, news, macro and sentiment.
  - Funding: use the funding rate known at decision time, not the settled future rate.
  - News: the publish time plus the ingestion delay.
  - Macro: the release time, not the reference period.
- **Point-in-time universe:** no survivorship bias for stocks or ETFs (delisted symbols stay in the history).
- **Tests:**
  - (a) Incremental bar-by-bar computation equals batch computation for every feature, regime and signal.
  - (b) Truncation test: signals up to bar t are identical whether data ends at t or at t+k.
  - (c) Shift test: shifting the inputs forward by one bar must change the results. If it doesn't, something is leaking.
  - (d) Randomised-future test: replacing every bar after t with noise leaves decisions ≤ t unchanged.

### 9.2 Simulator realism
- Next-bar execution.
- Fees per venue and tier.
- Spread per profile and session.
- Slippage model: `k × ATR × (order_size / bar_volume)^0.5`, floored at 1 tick.
- Funding charged at actual timestamps; swap and borrow costs.
- Partial fills for limits; gaps fill at the gap price.
- Stop fills use the worse of the stop price and the next trade price.

### 9.3 Metrics (per component, per setup, per regime, per market, long/short, and combined)
- Win rate, profit factor, **expectancy (R)**, average R, median R, SQN.
- Max drawdown (equity and R), Sharpe, Sortino, Calmar, total return.
- Trade count and exposure %.
- Fees, slippage, funding and spread totals.
- MAE/MFE distributions.

### 9.4 Robustness protocol
1. **Splits:** in-sample / out-of-sample (chronological, last ~30% OOS), then **anchored walk-forward**: for example a 24-month train and a 6-month test, rolled.
2. **Labelled stress windows.** Dates are to be verified against the data before use.
   - Crypto: the Mar-2020 crash; the 2021 bull; the May-2021 crash; the 2022 bear (including the LUNA and FTX events); the 2023 range or recovery; and the later bull/bear legs present in the data.
   - Stocks: the 2020 crash, 2022 bear, 2023 recovery.
   - FX and gold: high-vol central-bank periods.
   - Fake-breakout windows: auto-labelled as breakouts that reversed within 3 bars.
3. **Parameter sensitivity:**
   - Grid ±20–30% around each default.
   - **Accept only plateaus**: OOS expectancy at neighbours ≥ 70% of the centre's.
   - Spikes are rejected.
4. **Monte Carlo:**
   - 10,000 resamples of the trade sequence, with replacement and with randomised order;
   - report the 95th-percentile max DD and the 5th-percentile return;
   - add random entry delays of 0–1 bar and 2× costs as a stress case.
5. **Component validation before combination:**
   - each setup is tested alone (in its allowed regimes) and must pass the gates;
   - then the combined system is tested;
   - then each family and component is ablated.
   - **A component that doesn't improve OOS results is removed.**
6. **Acceptance gates** (per profile, walk-forward OOS, net of all costs):

   | Metric | Gate |
   |---|---|
   | Trades | ≥ 100 |
   | Expectancy | ≥ +0.10R |
   | Profit factor | ≥ 1.25 |
   | Max DD (MC 95th pct) | ≤ 25% at default `r` |
   | Walk-forward efficiency | OOS/IS expectancy ≥ 0.5 |
   | Profitable WF folds | ≥ 60% |
   | No single regime | Contributes > 70% of total profit (robustness), unless it's a trend-only profile and this is documented |

7. **Multiple-testing guard:** the number of configurations tried is logged. Report the deflated Sharpe, or at least the count of variants tested.

---

## 10. AI Decision Layer contract (AI never invents trades)

**Input:** structured JSON only, containing:
- the candidate trade (setup, direction, levels);
- family scores and the raw features used;
- regime and confidence;
- the penalties;
- `E[R]_net`, `P_win` and planned R:R;
- portfolio exposure and risk limits state;
- recent news headlines (as data);
- the setup's OOS stats.

**Output** (schema-validated; any invalid output → NO TRADE):
```json
{
  "decision": "APPROVE | REJECT | DOWNGRADE",
  "chosen_setup": "S-TB|S-TP|S-SQ|S-MR|S-RV|null",
  "regime_supports": true,
  "conflicts": ["..."],
  "expected_R": 0.0,
  "confidence": 0.0,
  "risk_multiplier": 1.0,
  "reasons": ["..."],
  "no_trade_reasons": ["..."]
}
```

Rules:
- The AI can only pick among candidates the engine produced.
- `risk_multiplier ∈ [0, 1]`: the AI may reduce risk, never increase it.
- `expected_R` from the AI is advisory and logged. The engine's calibrated `E[R]_net` is binding.
- Every decision, with its inputs, is stored for audit and explained in the UI. The Risk Engine and Execution Gate run **after** the AI and cannot be bypassed.
- **Fallback:** if the model is unavailable or times out, the deterministic engine decides alone, with `risk_multiplier = 0.5` and a `degraded` flag. This follows MASTER_PROMPT §15.

---

## 11. Configuration (exposed through the existing Settings; separate for PAPER and LIVE)
`tamrs.enabled`, `tamrs.profiles[*]`:
- TF triple;
- Donchian N;
- ER and ADX thresholds;
- `dwell`;
- `θ_edge`, `p_min`, `RR_min` per setup;
- `r`, `heat_max`, cluster and direction caps, daily and weekly loss;
- DD ladder, max leverage, `liq_dist` multiple;
- sessions and news windows, cost model overrides;
- pyramiding on/off and max adds;
- setup on/off per regime (only cells that passed validation can be switched on).

`tamrs.live.enabled = false` by default. It can only be turned on when all of these hold:
1. the profile passed §9.4;
2. ≥ 30 days of PAPER with ≥ 30 trades;
3. paper expectancy is within the OOS 90% CI;
4. admin approval;
5. an explicit per-user opt-in.

---

## 12. Remaining weaknesses (known before implementation)
- **Trend-following phases:** expect long flat or drawdown periods in persistent ranges. The router reduces them but cannot remove them.
- **Regime detection lag:** with dwell = 2 HTF bars, the first part of a move is missed (accepted to cut whipsaw).
- **Data dependence:** whale, liquidation and news features are only usable where historical point-in-time data exists. Otherwise their weight is 0 until enough live-collected data exists.
- **Small samples:** S-RV and S-SQ will have small samples per (profile × regime). Cells stay disabled until N ≥ 50.
- **Costs:** the cost model must be validated against actual PAPER fills; intraday profiles may fail once real costs are applied.
- **Correlation instability:** correlation clusters break down in crashes (everything → ρ≈1). The downside-correlation measure and the heat cap are the protection.

---

# PART III: TIKALGO AI, the Offline AI Decision Engine (ODE)

> **Product name: TIKALGO AI.** `ode` is kept as the internal module/service id (e.g. `ai.decision.*` streams, `ode` package). In the UI, Settings, docs and reports, the engine is always called **TIKALGO AI**.

> **خلاصهٔ فارسی:** ODE لایهٔ تصمیم‌گیری هوشمند **بالای** موتورهای کمّی موجود تیکالگو است و جایگزین هیچ‌کدام نمی‌شود.
> - شواهد را از ماژول‌های موجود جمع می‌کند: سیگنال، ورود و خروج، SMC، اوردرفلو، مشتقات، نهنگ، ماکرو و اخبار.
> - رژیم بازار را تفسیر می‌کند، استراتژی مناسب را انتخاب می‌کند، کیفیت معامله و Edge را می‌سنجد، و یکی از این پنج تصمیم را پیشنهاد می‌دهد: LONG، SHORT، WAIT، REDUCE یا EXIT.
>
> سه اصل ثابت:
> - مسیر تصمیم **کاملاً محلی و آفلاین** است و هیچ API ابری در آن نیست.
> - AI فقط **پیشنهاد** می‌دهد و Risk Engine حق وتو دارد.
> - در هر شک یا کمبود داده، تصمیم WAIT است.
>
> این بخش برای **معاملات واقعی** طراحی شده است. با این حال LIVE فقط بعد از عبور از همهٔ دروازه‌های اعتبارسنجی و تأیید دستی فعال می‌شود (III.0).

ODE is the concrete production implementation of **Part I levels L2–L5** (§I.G, §I.L). It uses the TAMRS components (Part II) and every other existing TIKALGO strategy as its candidate sources.

## III.0 Readiness for real (LIVE) trading
LIVE can be enabled for a (market profile × strategy family) cell only when **all** of these hold, checked automatically and shown in the Admin UI:

| # | Gate | Requirement |
|---|---|---|
| 1 | Validation | The cell passed Part II §9.4 and §I.R: OOS net expectancy ≥ +0.10R, PF ≥ 1.25, PBO < 0.3, walk-forward efficiency ≥ 0.5, MC 95th-percentile DD within the limit |
| 2 | Paper | ≥ 30 days and ≥ 30 trades in PAPER with net expectancy inside the OOS 90% CI. ODE calibration error (ECE) ≤ 0.08 |
| 3 | Shadow | ≥ 14 days in SHADOW on live data (decisions logged, no orders) with no fail-safe defects and decision latency within budget |
| 4 | Infrastructure | The Risk Engine, kill-switch, exchange-side stops, reconciliation and alerting have been tested |
| 5 | Model | The model is registered in the registry with status `live-candidate`; there is a rollback version |
| 6 | Approval | Admin approval is recorded; the user explicitly opts in; LIVE starts at **¼ of the configured risk** for the first 50 trades |

## III.1 Position in the flow
```
REAL MARKET DATA → existing modules → FEATURES → SIGNAL ENGINE → ENTRY/EXIT ANALYSIS → REGIME ENGINE
  → [ODE: Decision Feature Contract → evidence scoring → strategy selection → meta-model → decision object]
  → RISK ENGINE (veto/resize) → PORTFOLIO CHECK → EXECUTION VALIDATION → FINAL DECISION → EXECUTION
  → JOURNAL → OUTCOME ANALYSIS → controlled research
```
ODE consumes the existing engines' outputs through their current contracts:
- signal, entry and exit candidates;
- regime;
- features.

It **never** recomputes or replaces them. The only thing it may add to the existing regime engine is extra probabilistic outputs (§I.I).

## III.2 Offline operation rules
| Component | Where it runs | If unavailable |
|---|---|---|
| Decision Feature assembly + evidence scorers (L1/L2) | Local (existing worker runtime) | Fail-safe → WAIT |
| Meta-model (L3/L4: LightGBM / logistic / small NN) | **Local CPU** (ONNX Runtime or native LightGBM); GPU optional | Fall back to the **validated baseline scorer** (Part II §6.1, registered as a model). If that is also unavailable → WAIT |
| Local LLM (optional; e.g. via Ollama bound to 127.0.0.1) | Local | Decisions continue without it. Only explanation text and news structuring degrade |
| Cloud LLMs / hosted models (OpenAI, Claude, Gemini, OpenRouter, hosted Jev) | **Not in the decision path** | No effect on decisions. Allowed only for offline research or optional explanations, never blocking |
| Market data | Existing providers | Stale or missing data → fail-safe |

> **Reconciliation with MASTER_PROMPT §15 (pluggable decision models):** the hosted Jev and cloud models remain selectable for **research and explanation** only. In the order path, only **locally executed and registered** models are allowed. A hosted model can become a decision model only if it is shipped as an on-prem/offline build and validated like any other model.

## III.3 Decision Feature Contract (DFC v1)
- A versioned, typed schema, defined once in the existing shared schema/types location and generated for both backend languages if the stack has more than one.
- **Every field carries:** `value`, `ts`, `available_at`, `source_module`, `quality` (ok | stale | missing | degraded) and `age_bars`.
- **Missing values** are explicit (`null` + mask). They are never forward-filled beyond the field's max staleness and never imputed from future data.

```json
{
  "dfc_version": "1.0.0",
  "decision_ts": "2026-10-09T12:00:00Z",
  "symbol": "BTCUSDT", "market": "crypto_futures", "venue": "…", "profile": "crypto_perp",
  "tf": { "htf": "4h", "mtf": "1h", "ltf": "15m", "exec": "5m" },
  "price":       { "ohlcv": {}, "ret_1": 0, "ret_k": {}, "atr": {}, "atr_pct": {}, "gap": 0, "realized_vol": {} },
  "trend":       { "ema_slope": {}, "sma": {}, "adx": {}, "er": {}, "direction": {}, "strength": {}, "mtf_alignment": 0 },
  "ichimoku":    { "tenkan": {}, "kijun": {}, "cloud_state": {}, "htf_kijun_dist_atr": 0 },
  "momentum":    { "rsi": {}, "roc": {}, "rel_strength": {} },
  "structure":   { "bos": {}, "choch": {}, "swings": {}, "sweep": {}, "displacement": {}, "fvg": [], "order_blocks": [] },
  "orderflow":   { "cvd_slope": {}, "delta": {}, "footprint_imbalance": {}, "dom_imbalance": 0, "liquidity_walls": [] },
  "derivatives": { "oi_change": {}, "funding": 0, "funding_z": 0, "liquidations": {}, "basis": 0, "ls_ratio": 0 },
  "whale":       { "score": 0, "accumulation": 0, "distribution": 0, "large_positions": [], "large_transfers": [] },
  "onchain":     { "exchange_netflow": 0, "active_addresses": 0, "large_tx": 0, "stablecoin_flow": 0 },
  "macro":       { "dxy": {}, "vix": {}, "us10y": {}, "spx": {}, "ndx": {}, "gold": {}, "btc_d": {}, "eth_btc": {}, "fear_greed": 0, "risk_on_off_factor": 0 },
  "news":        [{ "event_type": "", "sentiment": 0, "importance": 0, "surprise": 0, "assets": [], "confidence": 0, "source_url": "", "published_at": "", "evidence_quote": "" }],
  "social":      { "sentiment": 0, "trend": 0, "abnormal_activity": 0 },
  "signals":     [{ "strategy_id": "", "direction": "", "strength": 0, "timeframe": "", "entry": 0, "stop": 0, "targets": [], "confidence": 0 }],
  "entry":       { "valid": true, "zone": [0, 0], "trigger": "", "confirmation": [] },
  "exit":        { "exit_signal": false, "target_state": "", "trailing_state": {}, "invalidation": {} },
  "regime":      { "direction_probs": {}, "vol_probs": {}, "stress_probs": {}, "argmax": "", "confidence": 0 },
  "risk":        { "equity": 0, "available": 0, "exposure": {}, "portfolio_heat_R": 0, "cluster_exposure": {}, "drawdown": 0, "leverage": 0, "liq_distance_atr": 0 },
  "execution":   { "spread": 0, "est_slippage_R": 0, "depth": {}, "fees_R": 0, "funding_to_tp_R": 0, "fill_prob": 0 },
  "quality":     { "missing_fields": [], "stale_fields": [], "data_quality_score": 0 }
}
```

- Blocks with no point-in-time history (often whale, on-chain or social) are **context-only**: they are shown and journaled, but their model weight is 0 until validated (§I.H).
- `feature_version` = hash of DFC version + feature registry versions. It is stored with every decision.

## III.4 Multi-timeframe intelligence
- **Alignment score** `A ∈ [−1, 1]`: weighted agreement of the trend/structure direction across HTF (0.5), MTF (0.3) and LTF (0.2), using the profile's TF triple (§II.8).
- **Quality pattern (long example):**
  - HTF trend up (P(TREND_UP) ≥ 0.6);
  - MTF pullback into the value zone;
  - LTF liquidity sweep;
  - execution-TF bullish displacement / CHOCH;
  - → `mtf_pattern = TREND_PULLBACK_CONTINUATION`, which is eligible.
- **Counter-trend rule:** an LTF signal opposite to the HTF trend is allowed only if both of these hold:
  - P(REVERSAL) ≥ 0.5;
  - the candidate comes from a reversal-type strategy (S-RV / SMC reversal).
  
  Otherwise → **WAIT** with reason `HTF_CONFLICT`. When allowed, the size multiplier is ≤ 0.5.

## III.5 Evidence fusion (independent evidence, not vote counting)
1. **Deterministic family scorers (L2)** turn DFC blocks into signed evidence `e_f ∈ [−1, 1]` relative to the candidate direction. Families:
   - Trend, Structure, Momentum, OrderFlow, Liquidity, Derivatives, Whale, Macro, News;
   - the existing strategy signal itself.
2. **Independence:** families whose evidence is correlated (|ρ| > 0.7 over walk-forward windows, §II.2) form one **evidence cluster** and count once (the cluster mean).
3. **Base score** `S = Σ_c w_c · ē_c`, using regime-conditional weights from walk-forward validation (§I.L), shrunk toward equal weights.
4. **Adjustments:**
   - `+ confirmation_bonus`: only if ≥ 3 **independent clusters** agree at |e| ≥ 0.5;
   - `− contradiction_penalty`: Σ over clusters with e < −0.3;
   - `− uncertainty_penalty`: regime entropy and data-quality deficit;
   - `− correlation_penalty`: portfolio cluster exposure;
   - `− liquidity_penalty`: depth and spread vs profile;
   - `− execution_penalty`: estimated cost in R;
   - `− event_risk_penalty`: high-impact news window or event uncertainty.
5. The adjusted score is a **feature** for the meta-model, not the decision itself (§III.7).

## III.6 Strategy selection (not "highest raw score")
For each candidate from an existing strategy *k* in the current regime *r* and profile *p*:
```
E_hist(k,r,p)  = Bayesian-shrunk expectancy:  (n·mean_R_live+paper + n0·mean_R_OOS_backtest) / (n + n0)
degrade(k)     = 1 if rolling-30-trade expectancy ≥ lower OOS CI, else 0.5; 0 if strategy is DEGRADED/suspended
compat(k,r,p,tf) ∈ {0,1}     (regime/market/timeframe compatibility from strategy cards §I.K)
E_net(k)       = meta-model E[R]_net for this candidate (§III.7)
corr_pen(k)    = penalty if k's returns correlate with strategies already holding positions
select = argmax_k  compat · degrade · (0.5·E_net + 0.5·E_hist) − corr_pen − cost
```
- If the best value is < `min_expected_edge` → **WAIT**.
- If the top two candidates have **opposite directions** with similar values → **WAIT** (`STRATEGY_CONFLICT`).
- Selection is deterministic: no exploration in the order path. Exploration of new strategies happens only in PAPER/SHADOW.

## III.7 Model architecture (smallest model that works)
| Model | Target | Candidates (choose by validation) | Notes |
|---|---|---|---|
| M1 Success classifier, per strategy family | P(TP1 before SL within horizon), net of costs | Logistic (baseline) → LightGBM (monotonic constraints on core evidence) → small MLP only if it clearly beats LightGBM | **Meta-labelling**: predicts whether an existing strategy's candidate is worth taking |
| M2 Payoff model | E[R] given success/failure; quantiles of MFE and MAE | LightGBM quantile or linear quantile | Gives `E[R]_net = P·E[R⁺] − (1−P)·E[R⁻] − cost` |
| M3 Time model | Time-to-resolution quantiles | LightGBM quantile | Sets `decision_expiry` and the time-exit sanity check |
| M4 Regime model | Regime probabilities | GMM/HMM or threshold + calibration (existing engine extended) | Shared with §I.I |
| Calibration | Isotonic or Platt per family | — | Required. ECE is monitored |
| Optional local LLM | News event structuring; explanation phrasing | The smallest local model that passes the benchmark (§III.17) | **No numbers originate from the LLM**; numbers in text are checked against the trace |

**Inference runtime:**
- Export to **ONNX** (LightGBM/sklearn → ONNX) when the serving stack differs from the training stack.
- Otherwise use native LightGBM in the existing Python worker.
- The target is CPU-only, with GPU optional.

**Decision rule (the meta decision):**
```
if failsafe_triggered:                      decision = WAIT
elif open position and exit conditions met: decision = EXIT  (or REDUCE on partial / regime downgrade)
elif E[R]_net ≥ min_expected_edge
     and P ≥ p_min and planned_RR ≥ RR_min
     and model_uncertainty ≤ u_max
     and confidence ≥ conf_threshold:       decision = LONG / SHORT (direction of selected candidate)
else:                                       decision = WAIT (with reasons)
```
- `confidence` = calibrated P, adjusted down by `model_uncertainty`. Model uncertainty is the dispersion across walk-forward fold models or bootstrap ensembles, plus the out-of-distribution distance of the DFC from training data.

## III.8 Decision output object (DO v1)
```json
{
  "decision": "LONG|SHORT|WAIT|REDUCE|EXIT",
  "symbol": "", "market": "", "timeframe": {"htf": "", "mtf": "", "ltf": "", "exec": ""},
  "strategy": "", "regime": {"argmax": "", "probs": {}},
  "entry": {"type": "limit|stop_limit|market", "price": 0, "zone": [0, 0]},
  "stop_loss": 0, "tp1": 0, "tp2": 0, "tp3": null, "trailing_stop": {"method": "", "params": {}},
  "expected_R": 0, "expected_edge": 0, "p_success": 0, "confidence": 0,
  "risk_score": 0, "portfolio_risk": {"heat_R_after": 0, "cluster_R_after": 0},
  "position_size": {"qty": 0, "risk_pct": 0, "risk_R": 1}, "recommended_leverage": 0,
  "holding_horizon": {"bars": 0, "until": ""},
  "signal_quality": 0, "execution_quality": 0, "news_risk": 0, "liquidity_risk": 0, "model_uncertainty": 0,
  "decision_expiry": "",
  "invalidation_conditions": [""],
  "supporting_evidence": [{"family": "", "score": 0, "detail": ""}],
  "contradicting_evidence": [{"family": "", "score": 0, "detail": ""}],
  "no_trade_reasons": [""],
  "decision_trace": [{"step": "", "input_ref": "", "output": {}}],
  "model_version": "", "feature_version": "", "dfc_version": "1.0.0", "data_snapshot_id": "",
  "timestamp": "", "mode": "PAPER|SHADOW|LIVE"
}
```
- `position_size` and `recommended_leverage` are **proposals**. The Risk Engine computes the binding values (§III.10).
- The decision expires at `decision_expiry`. An expired decision can never be executed.

## III.9 No-trade intelligence
**Reason codes** (enum, multiple allowed):
- `SIGNAL_CONFLICT`, `HTF_CONFLICT`, `STRATEGY_CONFLICT`
- `REGIME_UNCERTAIN`, `REGIME_STRESS`
- `LOW_EDGE`, `POOR_RR`
- `LOW_LIQUIDITY`, `HIGH_SPREAD`
- `NEWS_RISK`
- `PORTFOLIO_LIMIT`, `CORRELATION_LIMIT`
- `LOW_CONFIDENCE`, `HIGH_UNCERTAINTY`
- `POOR_EXECUTION`
- `DATA_QUALITY`
- `MODEL_UNAVAILABLE`, `RISK_UNAVAILABLE`, `STATE_UNKNOWN`
- `COOLDOWN`, `SESSION_CLOSED`

**Measuring no-trade quality.** Every rejected candidate gets a **counterfactual label** using the same triple-barrier rules (§III.11), including costs. Metrics:

| Metric | Definition |
|---|---|
| Filter value | `mean_R(taken) − mean_R(all candidates)`. Must be > 0 |
| Avoided-loss rate | Share of rejected candidates that would have hit SL first |
| Missed-opportunity cost | Mean R of rejected candidates that would have reached TP1 |
| Abstention curve | Expectancy vs. % of candidates taken (thresholds swept). The chosen threshold should sit on the flat or optimal part |

These metrics are reported per reason code. A reason that rejects mostly winners is reviewed.

## III.10 Risk, portfolio and execution integration (AI recommends; others approve)
```
DO (proposal) → RISK VALIDATION (hard limits; Part II §6.3–6.6, §I.N)
             → PORTFOLIO VALIDATION (budgets, clusters, factor exposure; §I.M)
             → EXECUTION VALIDATION (spread/slippage/liquidity/fill-prob; order type; §I.O)
             → ORDER  (existing Execution Gate)
```
- **Possible transformations:**
  - LONG → REDUCE size;
  - LONG → WAIT (temporary limit, e.g. a spread spike);
  - LONG → REJECT (hard limit).
  
  Each step appends to the decision trace with the rule id.
- **Binding size** (in the Risk Engine):
  ```
  qty = equity · r · m_regime · m_vol · m_dd · m_conf / (stop_dist · point_value)
  ```
  - `m_conf = min(1, conf / conf_full)` can only reduce size. There is **no upward scaling from confidence or expected R**.
  - The result is capped by notional, liquidity, leverage and liquidation-distance limits.
- **Leverage** = the minimum needed for the margin, capped by profile and user limits. It never rises because of confidence.
- **Existing positions:** ODE may emit REDUCE or EXIT from exit-engine signals or a regime downgrade. The Exit Engine's hard rules (SL, invalidation) execute without needing ODE.

## III.11 Training dataset and labelling (point-in-time)
**Rows:**
- (a) **candidate rows**: one per candidate emitted by an existing strategy at decision time. This is the main dataset for M1–M3.
- (b) **state rows**: periodic HTF snapshots for the regime model.

**Each row stores:**
- the DFC snapshot, built by replaying the **as-of** data. The same code path is used live and in training: the "feature parity" test;
- the candidate fields;
- versions.

**Labels** (event-based triple barrier, per candidate; costs included):
- `hit`: TP1-before-SL within horizon H (setup-specific), as 1/0/timeout;
- `R_realized` under the actual exit rules (partials, BE, trailing), simulated with the same cost model;
- `MFE_R`, `MAE_R`;
- `t_to_tp1`, `t_to_sl`, `t_resolution`;
- `regime_transition` within H.

The SHORT side is labelled symmetrically.

**Leakage controls:**
- Label windows define each row's `[t, t_end]`.
- **Purged** walk-forward CV removes training rows whose label windows overlap the test fold, plus an **embargo** of ≥ H bars.
- Sample weights use average uniqueness, because overlapping candidates are not independent.
- Normalisers are fitted on training folds only.

**Dataset versioning:** the dataset id is a hash of (data snapshot range, DFC version, feature versions, label config). Datasets are immutable once registered.

## III.12 Training and promotion pipeline
```
Historical data → PIT feature dataset → labels → train (purged CV) → validation → OOS lock-box
→ walk-forward (anchored + rolling) → stress (regime, market, 2× costs, entry delay, synthetic §I.R-6)
→ PAPER → SHADOW → production candidate → manual approval → LIVE (¼ risk ramp)
```
- **Model selection** (per family, per profile, in order):
  1. Calibrated OOS log-loss/Brier.
  2. OOS net expectancy of the filtered trades.
  3. Stability across folds.
  4. Latency and RAM.
  5. Simplicity.
  
  A more complex model must beat the simpler one on (1) and (2) with fold consistency ≥ 70%. Otherwise the simpler model is kept.
- **Feature budget:** at most ~40 inputs per model after redundancy removal. Each feature must pass the ablation rule (§II.2).
- Everything is logged in the experiment ledger. PBO and DSR are computed over all configurations tried (§I.R).

## III.13 Decision journal and failure taxonomy
Stored per decision, linked to the existing journal:
- the DFC snapshot id;
- module outputs;
- the decision object;
- risk, portfolio and execution transformations;
- orders and fills;
- the outcome (R, MFE, MAE, slippage);
- post-close **prediction vs reality** (P vs hit, E[R] vs R, expected vs actual slippage).

**Deterministic failure classification** (first matching rule; then human review):

| Class | Rule |
|---|---|
| DATA_FAILURE | A field used was later found stale, missing or corrected (data-quality incident log) |
| EXECUTION_FAILURE | Slippage > 2× estimate, or a missed or partial fill changed the outcome sign |
| LIQUIDITY_FAILURE | Depth or spread fell below profile limits between decision and fill |
| NEWS_FAILURE | A high-impact event occurred within the trade window that the news layer had not flagged at decision time |
| REGIME_FAILURE | The regime arg-max changed against the trade within ≤ ⅓ H, and the loss followed the change |
| RISK_FAILURE | The stop was inside the MAE distribution of winners (too tight), or a size or limit breach |
| SIGNAL_FAILURE | The regime was stable and the strategy's own invalidation triggered |
| MODEL_FAILURE | P ≥ 0.6 and the outcome was a loss, repeated with a calibration drift signal |
| VARIANCE | None of the above; the loss is within the expected distribution |

Monthly aggregates feed the research backlog. **Nothing updates LIVE logic automatically** (§I.T).

## III.14 Explainability (from actual inputs only)
- **Local feature contributions:** TreeSHAP for LightGBM (exact, computed at inference) or coefficients × inputs for linear models.
- Evidence-cluster scores come from §III.5, and penalties are itemised.
- **Explanations are rendered from the stored trace by a deterministic template.** The local LLM may rephrase the text. A validator then checks that every number and claim in the text exists in the trace; if not, the template text is used.

**Example** (the rendered form of a stored trace):
```
LONG BTCUSDT · crypto_perp · 4h/1h/15m/5m · strategy S-TP
REGIME: TREND_UP 0.82 (vol: normal 0.71; stress: low 0.05)
SUPPORT: HTF trend +0.91 · Structure +0.83 · OrderFlow(CVD) +0.76 · Derivatives(OI) +0.69 · Liquidity +0.72
CONFLICT: Funding −0.31 · Resistance (HTF wall 1.1 ATR) −0.22
TOP MODEL CONTRIBUTIONS: mtf_alignment +0.11 · choch_ltf +0.07 · funding_z −0.04
P(TP1 before SL)=0.58 · E[R]_net=+0.62R · planned R:R 2.7 · cost 0.06R
RISK: 0.5% equity (m_dd=1, m_conf=0.9) · heat after 1.6R · cluster(crypto-beta) 1.1R
INVALIDATION: 1h close below 61,240 (pullback low − buffer) · expiry 3×15m bars
FINAL: LONG (risk-approved, size reduced 10% by portfolio cluster)
```

## III.15 Model monitoring and degradation
| Monitor | Signal | Threshold (default) |
|---|---|---|
| Calibration | ECE / reliability vs realised outcomes (rolling 50) | ECE > 0.10 |
| Expectancy | Rolling 30-trade net expectancy vs OOS CI lower bound | Below for 2 consecutive windows |
| Feature drift | PSI per top-20 feature | PSI > 0.25 on ≥ 3 features |
| Regime drift | Regime frequency vs training | KL divergence > threshold |
| Execution drift | TCA slippage vs model | > 1.5× for 20 fills |
| No-trade quality | Filter value | ≤ 0 over 100 candidates |
| Strategy degradation | Per-strategy rolling DD | > 2× historical 95th-percentile DD |

**`MODEL_DEGRADATION` actions** (in order; never automatic replacement):
1. Reduce `m_conf` caps.
2. Reduce allocation for the affected family or profile.
3. Move the model to SHADOW; the validated baseline takes over if its own monitors are healthy, otherwise WAIT.
4. Open a retrain-candidate research job.
5. A new model goes through the full pipeline (§III.12).

## III.16 Fail-safe state machine
| Condition | Result |
|---|---|
| Required DFC block missing, or stale beyond max age | WAIT (`DATA_QUALITY`) |
| Meta-model unavailable | Validated baseline (flag `degraded`). If unavailable → WAIT |
| Model output NaN, out of range or invalid schema | WAIT (`MODEL_UNAVAILABLE`) |
| Risk Engine or portfolio state unavailable | WAIT. **No order may be sent** |
| Execution state unknown (unreconciled orders or positions) | WAIT, plus a reconciliation job and an alert |
| Clock skew > tolerance, or data feed time gap | WAIT |
| Kill-switch active | EXIT or REDUCE per the kill-switch policy; no new entries |

Fail-safe outcomes are journaled and counted. Frequent fail-safes are an operational alert, not a reason to loosen checks.

## III.17 Local model benchmark and resource requirements
**Benchmark protocol:** run on the production server hardware, per candidate model. Measure:
- decision quality (OOS log-loss, Brier, ECE, filtered expectancy);
- latency (p50 and p99);
- RAM;
- CPU usage;
- determinism (same input → same output);
- explainability support.

Choose the **smallest model meeting the gates**.

**Expected order of magnitude** (to be measured, not assumed):

| Component | Typical footprint |
|---|---|
| Logistic / LightGBM / XGBoost (≤ 500 trees, ≤ 40 features) | Model ≤ 10 MB, RAM ≤ 100 MB, CPU latency ≈ sub-ms to a few ms per decision, plus TreeSHAP of a few ms |
| Small MLP (ONNX) | Similar or smaller; latency in ms |
| Optional local LLM for news and explanations (quantised small model, e.g. 3–8B, 4-bit) | Roughly 2–6 GB RAM, seconds per response on CPU. **Kept off the critical path**: asynchronous, with timeouts |

The decision latency budget is ≤ 200 ms per candidate on CPU, excluding the LLM.

## III.18 Settings (existing Settings architecture; separate PAPER / SHADOW / LIVE)
`ai_decision.enabled`, `mode` (PAPER|SHADOW|LIVE; LIVE locked until III.0), `model_id`, `model_version`, `inference` (cpu|gpu), `local_model_path`, `confidence_threshold`, `min_expected_edge`, `min_expected_R`, `p_min`, `u_max` (uncertainty), `no_trade_threshold`, `regime_filter` (allowed regimes), `strategy_weights` (bounded; the validated defaults are read-only and overrides are within ± limits), `risk_per_trade` (≤ the hard cap), `max_leverage` (≤ the profile cap), `llm.enabled`, `llm.model`, `llm.timeout_ms`.

Changes are audit-logged. Hard risk caps are admin-only.

## III.19 TIKALGO integration
- **AI Signals and Scanner:** show the ODE decision, reasons and explanation for each candidate. The scanner can filter by `decision != WAIT` and by reason codes.
- **Watchlist:** per-symbol current decision state and expiry.
- **Entry/Exit engines:** inputs to ODE. Their hard exits remain authoritative.
- **Risk, Portfolio and Execution:** the validation chain (§III.10).
- **Paper:** ODE in PAPER mode drives paper orders.
- **SHADOW:** decisions are logged with no orders.
- **Journal:** §III.13.
- **Redis streams:** `ai.decision.*`, `ai.noTrade.*`, `ai.monitor.*`.
- **Postgres/Timescale tables:** `ai_decisions`, `ai_decision_traces` (append-only), `ai_datasets`, `model_registry`, `experiment_ledger`, `ai_monitor_metrics`.
- **API and WebSocket:** follow the existing route and WebSocket patterns, e.g. a decisions list, a decision by id with its trace, a monitor state, and a WebSocket channel for live decisions. Existing APIs are unchanged, and new ones are versioned.

## III.20 Tests
- DFC schema validation, and missing or stale handling.
- **Feature parity:** live path == training replay.
- As-of joins, plus no-lookahead and no-repaint (Part II §9.1).
- MTF conflict rule.
- Evidence fusion: independence clustering, bonus and penalty math.
- Strategy selection: degraded strategy suppressed; opposite-candidate conflict → WAIT.
- Meta decision thresholds.
- Calibration.
- Size never increases with confidence; leverage cap; liquidation distance.
- Risk → REDUCE / WAIT / REJECT transformations.
- Portfolio budgets.
- Execution validation.
- Fail-safe matrix: every row of §III.16.
- Offline test: the network is blocked and decisions still work; cloud calls are absent from the decision path, enforced by a test that fails on any outbound AI host.
- LLM cannot create or modify orders; LLM text numbers are validated against the trace.
- Decision expiry.
- Journal completeness and failure classification rules.
- Monitoring thresholds trigger the right actions.
- Model registry gating: an untracked model can't run in LIVE.
- No-trade quality metrics.
- Backtest and walk-forward reproducibility (same dataset id → same results).

## III.21 Remaining weaknesses
- The meta-labelling dataset grows only as fast as strategies emit candidates. Rare setups (reversal, squeeze) may never reach ML-ready sample sizes, so they stay on the calibrated baseline.
- Counterfactual labels for rejected trades assume the same execution, so they are optimistic about fills.
- Whale, on-chain, social and news features may lack point-in-time history and will contribute only after enough live-collected data exists.
- A local LLM adds operational load (RAM, latency) for limited decision value. It stays optional.
- Calibration can drift quickly in regime shifts. The monitors and the baseline fallback limit the damage but not instantly.

## III.X Implementation steps (maps the 16 requested steps to MASTER_PROMPT §17 phases)
| Step | Work | Phase |
|---|---|---|
| 1–3 | Inspect the architecture; map signal, entry, exit, risk, portfolio and AI/data modules | Q0 |
| 4 | Decision Feature Contract v1 + feature parity harness | Q2–Q3 (extended) |
| 5 | Point-in-time candidate dataset + triple-barrier labels | Q8a |
| 6 | Offline baseline (calibrated scoring, registered as a model) | Q6 |
| 7 | Meta Decision Engine (M1–M3, selection, decision rule, fail-safe) | Q7 / Q14 |
| 8 | Regime, strategy and signal integration; MTF logic | Q4–Q5, Q7 |
| 9 | Risk, portfolio and execution validation chain | Q6, Q10 |
| 10 | Decision journal + failure taxonomy | Q7, Q15 |
| 11 | Monitoring + degradation actions | Q13 |
| 12–13 | Backtests + walk-forward (+ PBO/DSR, stress) | Q8 |
| 14 | Paper | Q9 |
| 15 | Shadow | Q13, Q16 |
| 16 | LIVE activation exposed (locked until III.0) | Q16 |

---

# PART IV: Continuous Learning System (CLS)

> **خلاصهٔ فارسی:** هدف این بخش این است که مدل تصمیم‌گیری **به‌طور مداوم** خودش را ارتقا دهد. از سه منبع یاد می‌گیرد:
> - دادهٔ بازار؛
> - **تاریخچهٔ معاملات خودش**، شامل معامله‌هایی که رد کرده؛
> - منابع مطالعاتی، یعنی کتاب‌ها، مقاله‌ها و اسکیل‌ها.
>
> یادگیری در **سه حلقه با سرعت متفاوت** انجام می‌شود:
> - **حلقهٔ A (روزانه):** آمار و کالیبراسیون را خودکار به‌روز می‌کند.
> - **حلقهٔ B (هفتگی/ماهانه):** مدل‌های «چالشگر» را آموزش می‌دهد و با مدل «قهرمان» مقایسه می‌کند.
> - **حلقهٔ C (پژوهشی):** فرضیه‌های جدید را از منابع مطالعاتی و تحلیل شکست‌ها می‌سازد.
>
> اصل ایمنی: یادگیری **مداوم** است ولی **کنترل‌شده**. هیچ تغییری بدون آزمون آماری وارد مدل اصلی نمی‌شود. تغییری که ریسک LIVE را **افزایش** دهد هرگز خودکار اعمال نمی‌شود و تأیید دستی لازم دارد.

## IV.1 Three learning loops
| Loop | Cadence | What learns | Data | Applied how | Safety |
|---|---|---|---|---|---|
| **A: Statistics & calibration** | Daily (and after every N closed trades) | Bayesian expectancy per (strategy × regime × profile), §III.6 `E_hist`; probability calibration (isotonic refit on recent outcomes); cost/slippage model from TCA; per-reason no-trade value | Own journal (LIVE > PAPER > SHADOW counterfactuals), last fills | **Automatic**, within bounds: each parameter may move ≤ X% per update, and the shrinkage prior keeps it near the validated value | Applied automatically in PAPER/SHADOW. In LIVE, applied automatically **only if it reduces risk or confidence**; risk-increasing changes wait for Loop B validation |
| **B: Champion / challenger models** | Weekly retrain candidates; promotion evaluated monthly | M1–M3 meta-models, regime model, fusion weights | Expanding point-in-time history + own decision dataset (taken + rejected with counterfactual labels) | A challenger runs in **SHADOW** in parallel with the champion on the **same candidates**; promotion rules in IV.4 | Every retrain is a trial in the experiment ledger (PBO and DSR include it). Auto-promotion is allowed in PAPER only. LIVE needs manual approval |
| **C: Research & knowledge** | Continuous backlog; monthly review | New alphas, strategies, features and rule changes | Knowledge base (books, papers, notes), failure-taxonomy aggregates (§III.13), market anomalies, drift alerts | Hypothesis → alpha registry → full research pipeline (§I.J, §I.R) → new versions | Nothing from Loop C changes production without passing the full lifecycle |

## IV.2 What the system learns from
1. **Market history:** point-in-time, ever-growing; the same Feature Factory.
2. **Its own decisions** (the most valuable source over time):
   - **taken trades:** the realised R, MFE, MAE and slippage;
   - **rejected candidates:** counterfactual triple-barrier labels (§III.9);
   - **regime and strategy outcomes;**
   - **failure classes** (§III.13).

   Sample weights: LIVE 1.0, PAPER 0.7, SHADOW-counterfactual 0.5, backtest 0.3 (configurable), with **time decay** (half-life ~ 6–12 months) and **regime-balanced sampling**, so a recent regime doesn't erase older ones.
3. **Execution history:** TCA per venue, symbol, size and session feeds the cost model directly (Loop A).
4. **Research knowledge** (Loop C): see IV.3.

## IV.3 Knowledge base from study sources
- **Inputs:**
  - the research documents in this file;
  - MASTER_PROMPT §12 trader and firm knowledge skills;
  - legally owned books and notes;
  - public papers (Part I sources);
  - monthly failure reports from the journal.
- **Structure:** the inputs are stored as **principle cards**:
  ```
  card_id, source, citation (page/section/url), principle, codable_rule, related_features,
  related_strategies, regimes, evidence_status (untested|supported|rejected), linked_alpha_ids, updated_at
  ```
  They are embedded with a **local** embedding model and stored in the existing pgvector.
- **Local LLM (optional) as research assistant:**
  - retrieves cards relevant to a failure cluster or drift alert, e.g. "losses in RANGE with high funding";
  - proposes **hypotheses with citations**.
  
  Each hypothesis becomes an `idea` entry in the alpha registry. Only the quantitative pipeline can turn it into `validated`.
- Cards are updated with test results: `supported` or `rejected`. The knowledge base therefore learns which ideas actually work **in TIKALGO's markets**.

## IV.4 Champion / challenger promotion rules (Loop B)
- **Same-candidate comparison:** champion and challenger score the identical candidate stream in SHADOW, with the same costs. The decision trace stores both outputs.
- **Promote the challenger to PAPER champion only if all hold:**
  - N ≥ 100 shared candidates;
  - Δ net expectancy of the filtered trades > 0 with bootstrap p < 0.05;
  - max drawdown not worse by more than 10%;
  - calibration ECE ≤ the champion's + 0.02;
  - no-trade filter value ≥ the champion's;
  - fold consistency ≥ 70%;
  - the PBO over the retrain history is still < 0.3.
- **LIVE promotion:** the same criteria **plus** III.0 gates 3–6 (shadow period, infrastructure, registry, manual approval). The new model starts at reduced risk (¼ → ½ → full over 50 and 100 trades).
- **Automatic rollback:** if a newly promoted model triggers `MODEL_DEGRADATION` (§III.15) within its first 100 trades, the previous champion is restored automatically (rollback is risk-reducing, so it is allowed without approval).
- **Model lineage:** champion → challenger history is kept in the model registry. The "learning curve" (champion quality over time) is a dashboard metric.

## IV.5 Guardrails against bad learning
| Risk | Guardrail |
|---|---|
| **Selection bias:** learning only from trades it chose | Counterfactual labels for rejected candidates, plus a small **exploration budget in PAPER only** (e.g. 5% of rejected-but-borderline candidates are paper-traded), never in LIVE |
| **Overfitting to the recent regime** | Minimum training window (≥ 2 years HTF where data exists), regime-balanced sampling, time-decay floor, regime-stratified validation |
| **Overfitting through repeated retraining** | Every retrain counts as a trial; PBO and DSR are computed over the full ledger; MinBTL check; promotion only on shadow evidence collected **after** training |
| **Catastrophic forgetting** | Keep long history; stress-regime test sets are fixed (crash, panic, range); a challenger must not degrade on them |
| **Data poisoning / bad data** | Data-quality gates; rows from incident windows are excluded; anomaly detection on labels |
| **Reward hacking** (e.g. fewer trades to look good) | Promotion metric = net expectancy **and** DD **and** no-trade value **and** trade-count floor (≥ 70% of the champion's opportunity capture) |
| **Feedback loops / herding with our own impact** | TCA monitors our own market impact; size caps vs liquidity |
| **Silent drift** | §III.15 monitors; Loop A cannot hide degradation, because calibration changes are logged and bounded |

## IV.6 Baseline and measuring improvement (does learning actually help?)
1. **Q0 baseline:** before any change, record the **current** TIKALGO system's statistics per market profile from existing trade history (paper and live) and from a fresh costed backtest of the current logic:
   - net expectancy (R), PF, win rate;
   - max DD, Sharpe, Sortino, Calmar;
   - trade count;
   - fees, slippage and funding.
   
   Stored as `baseline_v0`.
2. **A/B in Q9 onward:** the current logic (`baseline_v0`) and the new stack run **side by side** in PAPER/SHADOW on the same symbols and periods.
3. **Monthly scorecard** (dashboard + report):

   | Metric | Baseline | Current champion | Δ | Trend |
   |---|---|---|---|---|
   | Net expectancy (R) | | | | |
   | Profit factor | | | | |
   | Max DD | | | | |
   | Calibration ECE | | | | |
   | No-trade value | | | | |
   | Cost per trade (R) | | | | |
   | Failure-class mix | | | | |

4. **Learning effectiveness:**
   - the slope of champion net expectancy over successive promotions;
   - the share of Loop C hypotheses that were validated;
   - the time to detect degradation.

## IV.7 Operations
- **Jobs** (existing worker/scheduler infrastructure):
  - `cls.loopA.daily`;
  - `cls.loopB.retrain.weekly`;
  - `cls.loopB.promotion.monthly`;
  - `cls.loopC.research.monthly`;
  - `cls.scorecard.monthly`.
- **Resources:**
  - Loop A runs in seconds to minutes.
  - Loop B (LightGBM) runs in minutes to an hour on CPU. It is scheduled off-peak, with priority below the live decision path, and must never compete with live inference.
- **Reproducibility:** every artefact is versioned (dataset, features, model, config) and can be rebuilt from the ledger.
- **Settings:**
  - `learning.enabled`;
  - `learning.loopA.enabled`, `bounds`;
  - `learning.loopB.cadence`, `min_shared_candidates`, `auto_promote_paper` (default **on**);
  - `learning.auto_promote_live` (default **off**, locked; admin-only, and even when on it requires the III.0 gates);
  - `learning.exploration_paper_pct`;
  - `learning.sample_weights`, `time_decay_half_life`.

## IV.8 Tests
- Loop A bounds are respected; risk-increasing updates are blocked in LIVE.
- Counterfactual labelling equals the triple-barrier simulator.
- Champion/challenger evaluation uses identical candidates.
- Promotion rules: each criterion is checked; a failing case is rejected.
- Automatic rollback on degradation.
- Every retrain is recorded in the ledger and counted in the PBO.
- The exploration budget never applies in LIVE.
- Knowledge-base hypotheses can't reach production without the pipeline.
- Baseline A/B reports are reproducible.

## IV.9 Honest expectation
Continuous learning makes the system **adaptive**: it notices when an edge weakens, re-weights strategies by what currently works, improves its cost estimates and calibration, and turns its own mistakes into tested improvements.

It **does not guarantee** excellent results. Markets adapt, and some periods have no exploitable edge. In those periods the correct "learned" behaviour is to **trade less** (WAIT).

Success is measured by the IV.6 scorecard against `baseline_v0`, over months, net of costs.

---

# PART V: Extended research library (selected beyond the user-provided sources)

> **خلاصهٔ فارسی:** این‌ها منابع مهمی هستند که خودم انتخاب کردم، علاوه بر منابعی که شما فرستادید. از همه‌شان فقط اصول عمومی و منتشرشده برداشته شده است.
> - مقاله‌های داوری‌شده و کتاب‌های مرجع کوانت؛
> - تحقیقات اختصاصی کریپتو؛
> - اجرا و ریزساختار بازار؛
> - کالیبراسیون و توضیح‌پذیری مدل؛
> - drift مدل؛
> - حاکمیت ریسک مدل.
>
> ستون آخر جدول نشان می‌دهد هر منبع کجای این سند استفاده شده و چه چیزی را بهتر کرده است. همهٔ این منابع به‌صورت «کارت اصل» وارد پایگاه دانش حلقهٔ C می‌شوند (IV.3).

| # | Source | Key public finding / method | Used in TIKALGO (section → change) |
|---|---|---|---|
| X1 | **López de Prado, *Advances in Financial Machine Learning* (Wiley, 2018)** | Triple-barrier labelling, **meta-labelling**, purged k-fold CV with embargo, sample uniqueness weights, feature importance (MDA/MDI) | §III.7, §III.11, §I.R: the core of the ODE labelling and validation design |
| X2 | **Moskowitz, Ooi, Pedersen, "Time Series Momentum" (JFE, 2012)** | A past 12-month return predicts the future return of the same asset across asset classes. Volatility-scaled positions | Part II trend components; volatility-scaled sizing; a hypothesis for multi-market trend |
| X3 | **Hurst, Ooi, Pedersen, "A Century of Evidence on Trend-Following Investing" (AQR)** | Trend following was positive across a century, in many regimes and crises (crisis alpha) | Supports trend as the core return source; stress-regime behaviour expectations |
| X4 | **Asness, Moskowitz, Pedersen, "Value and Momentum Everywhere" (JF, 2013)** | Momentum and value premia appear across markets and are negatively correlated with each other | Orthogonal alpha principle (§I.K, §III.5); a cross-sectional momentum family |
| X5 | **Liu, Tsyvinski, "Risks and Returns of Cryptocurrency" (RFS, 2021)** | Crypto returns are driven by crypto-specific factors (momentum, investor attention), not traditional asset exposure | Crypto profile: momentum and attention/social features as hypotheses; weak macro weight by default for crypto |
| X6 | **Liu, Tsyvinski, Wu, "Common Risk Factors in Cryptocurrency" (JF, 2022)** | Crypto market, size and momentum factors explain the cross-section | Crypto factor exposure in portfolio construction (§I.M); cross-sectional crypto alpha |
| X7 | **Schmeling, Schrimpf, Todorov, "Crypto Carry" (BIS Working Paper No. 1087, 2023, rev. 2025)** | The futures–spot basis (carry) in crypto is large and time-varying, linked to trend-chasing demand and crash risk | Funding and basis as **crowding/risk** features (§II.2, §I.E E11); carry hypothesis in the alpha registry |
| X8 | **Harvey, Liu, Zhu, "…and the Cross-Section of Expected Returns" (RFS, 2016)** | With hundreds of factors tested, the significance hurdle should be **t > 3.0**, not 2.0 | Alpha acceptance: require t ≥ 3 for new alphas (in addition to PBO and DSR) (§I.R) |
| X9 | **Bailey, López de Prado, "The Deflated Sharpe Ratio" (JPM, 2014)** | Corrects the Sharpe for selection bias, non-normality and the number of trials | §I.R: DSR gate formula |
| X10 | **Grinold, Kahn, *Active Portfolio Management*** (Fundamental Law of Active Management) | IR ≈ IC × √breadth: many **independent** small edges beat one strong edge | The "breadth" metric = the number of independent alphas (§I.K, orthogonal alpha); why independence is required |
| X11 | **Moreira, Muir, "Volatility-Managed Portfolios" (JF, 2017)** | Scaling exposure inversely to recent variance improves Sharpe for many factors | Portfolio volatility targeting (§I.M), the `m_vol` multiplier (§II.6.3) |
| X12 | **Ledoit, Wolf, "Honey, I Shrunk the Sample Covariance Matrix" (2004)** | Shrinkage covariance is far more stable than the sample covariance | §I.M covariance estimation |
| X13 | **Hamilton, "A New Approach to the Economic Analysis of Nonstationary Time Series…" (Econometrica, 1989)** | Markov regime-switching models | §I.I regime model (HMM/regime-switching as an L2 candidate) |
| X14 | **Brunnermeier, Pedersen, "Market Liquidity and Funding Liquidity" (RFS, 2009)** | Liquidity spirals: funding constraints amplify drops and liquidity dries up in stress | LIQUIDITY_STRESS / PANIC regime inputs: leverage, liquidations, funding dislocations (§I.I) |
| X15 | **Almgren, Chriss, "Optimal Execution of Portfolio Transactions" (2000)** | A trade-off between market impact and timing risk; optimal slicing schedules | Execution Intelligence: TWAP/VWAP slicing and the impact model (§I.O) |
| X16 | **Cont, Kukanov, Stoikov, "The Price Impact of Order Book Events" (J. Fin. Econometrics, 2014)** | **Order Flow Imbalance (OFI)** at the best quotes explains short-term price changes linearly, scaled by depth | An LTF order-flow feature (OFI), better than raw DOM snapshots (§II.2 order-flow family) |
| X17 | **Easley, López de Prado, O'Hara, "Flow Toxicity and Liquidity in a High-Frequency World" (RFS, 2012)** | VPIN as a measure of order-flow toxicity, elevated before liquidity events | A toxicity feature for the LIQUIDITY_STRESS layer and execution caution |
| X18 | **Kaufman, *Trading Systems and Methods*** | The Efficiency Ratio and adaptive trend measures; system-design practice | ER as the primary trend-efficiency feature (§II.2, §II.3) |
| X19 | **Lundberg, Lee, "A Unified Approach to Interpreting Model Predictions" (NeurIPS, 2017)** and **TreeSHAP (2020)** | SHAP values give consistent local attributions; TreeSHAP is exact and fast for tree models | §III.14 explainability |
| X20 | **Guo et al., "On Calibration of Modern Neural Networks" (ICML, 2017)** | Modern models are often miscalibrated; ECE as a metric; temperature/isotonic scaling | §III.7 calibration and §III.15 ECE monitor |
| X21 | **Gama et al., "A Survey on Concept Drift Adaptation" (ACM Computing Surveys, 2014)** | Drift detection and adaptation strategies; the risks of blind retraining | §III.15 and Part IV: controlled drift response and champion/challenger |
| X22 | **US Federal Reserve / OCC SR 11-7, "Guidance on Model Risk Management" (2011)** | Model validation, effective challenge, ongoing monitoring, inventory, governance | §I.Q governance; champion/challenger as "effective challenge" (IV.4) |
| X23 | **Kelly criterion (Kelly 1956; Thorp's practical work)** | Growth-optimal sizing; full Kelly is very volatile, so practitioners use **fractional Kelly** | A cap check: the fixed-fractional `r` is never above ¼-Kelly implied by the validated expectancy and variance (§II.6.3) |

### Concrete improvements these sources add to the spec
1. **Alpha acceptance** (X8, X9): a new alpha needs t ≥ 3, DSR > 0.95 **and** PBO < 0.3.
2. **Breadth metric** (X10): the dashboard shows the count of independent active alphas (pairwise return |ρ| < 0.3). The goal is more independent small edges, not one big model.
3. **Volatility targeting** (X11, X12): portfolio-level vol targeting with a shrinkage covariance, as an extra down-scaling multiplier (never above 1× the base risk).
4. **Sizing sanity** (X23): `r` ≤ ¼-Kelly fraction from the validated expectancy and variance. Otherwise reduce `r`.
5. **Order flow** (X16, X17): OFI and VPIN replace raw DOM for LTF timing and the stress layer.
6. **Crypto-specific** (X5–X7): crypto factor exposures (market, size, momentum) in portfolio construction; funding and basis as crowding features; low default macro weight for crypto unless validated.
7. **Execution** (X15): an Almgren-Chriss-style slicing rule when order size > k% of 1-minute depth.
8. **Governance** (X22): an "effective challenge" reviewer checklist on each LIVE promotion.

### Research protocol for adding new sources (continuous)
- Monthly, Loop C scans:
  - new peer-reviewed or working papers (SSRN, arXiv q-fin, BIS, NBER);
  - practitioner research (AQR, Man, Two Sigma insights, CME, exchanges' research).
- Each relevant item becomes a principle card with a citation and status `untested`.
- Only items with a **codable, testable** rule enter the alpha registry.
- Popularity alone is not a reason to add anything.

---

# PART VI: TIKALGO AI v2, Fully Offline Local Decision Intelligence (extensions)

> **خلاصهٔ فارسی:** این بخش **TIKALGO AI** (موتور تصمیم آفلاین، بخش سوم) را به نسخهٔ ۲ می‌رساند و این اجزا را اضافه می‌کند:
> - حافظهٔ تاریخی و موتور شباهت؛
> - منتقد مستقل تصمیم (Decision Critic)؛
> - موتور تصمیم‌های جایگزین (Counterfactual)؛
> - امتیاز استقلال شواهد؛
> - موتور تضاد؛
> - موتور عدم‌قطعیت چندمنبعی؛
> - تشخیص گذار رژیم؛
> - قابلیت‌اطمینان هر فیچر؛
> - رتبه‌بندی فرصت‌ها؛
> - بررسی تله‌های بازار؛
> - هوش زمان‌بندی ورود؛
> - هوش خروج پویا؛
> - کالبدشکافی معامله؛
> - حالت `OFFLINE_AI_MODE=true` همراه با **اثبات** نبود وابستگی به AI ابری.
>
> قانون مطلق: در مسیر تصمیم PAPER و LIVE هیچ LLM ابری، API پولی یا کلید API مربوط به LLM وجود ندارد. با خاموش بودن Ollama یا قطع اینترنت، هستهٔ تصمیم ۱۰۰٪ کار می‌کند. در هر خطا، تصمیم NO TRADE است و **هرگز** به AI ابری برگشت داده نمی‌شود.

Part III remains the base. Part VI adds components and **tightens** rules; where they differ, Part VI wins.

## VI.1 Decision flow (local-first)
```
DATA → FEATURE FACTORY (+ reliability, VI.9) → REGIME ENGINE (+ transition state, VI.8)
→ EXISTING SIGNAL / STRATEGY / ENTRY / EXIT ENGINES (candidates)
→ LOCAL ML MODELS (Part III M1–M3 + VI.3 models) → HISTORICAL MEMORY & SIMILARITY (VI.2)
→ META DECISION MODEL (Part III §III.7) → COUNTERFACTUAL ENGINE (VI.5)
→ DECISION CRITIC (VI.4) + ADVERSARIAL CHECK (VI.12) → UNCERTAINTY & CONFLICT ENGINE (VI.6, VI.7)
→ ENTRY-TIMING (VI.13) → OPPORTUNITY RANKING (VI.10) → PORTFOLIO / RISK GATE (veto) → EXECUTION
In-trade: DYNAMIC EXIT INTELLIGENCE (VI.14) → Risk veto → Execution.  After close: TRADE AUTOPSY (VI.15).
```

## VI.2 Historical Market Memory and Similarity Engine
- **Store:** the `decision_memory` table (Timescale), one row per candidate/setup. It extends the §III.11 candidate dataset; it is not a new dataset. Each row holds:
  - market, symbol, timeframe triple, regime and stability;
  - the compact feature vector;
  - signal and strategy, entry, exit;
  - outcome: realised R, MFE, MAE, duration, hit/timeout;
  - news, liquidity and volatility state;
  - the model decision and versions;
  - `label_end_ts`.
- **Leakage rule:** at decision time t, only rows with `label_end_ts < t` are searchable. The outcome must have been known by then.
  The vector normaliser (rolling z-scores) and the projection (PCA to ~24–32 dims, fitted on past data only, refit monthly and versioned) both come from data before t.
- **Search:**
  - Within the same market profile, plus an optional cross-market pool flagged separately.
  - Family-weighted standardised distance on the projected vector, using local approximate nearest neighbours: pgvector HNSW if present, otherwise hnswlib/FAISS on CPU.
  - Return the top-k (k = 50) and a radius set.
  - Regime-matched results are reported separately.
- **Outputs:**
  - `similarity_score`: mean similarity of the top-k;
  - `n_similar` within the radius;
  - win rate;
  - median R and the R quantiles;
  - MFE/MAE quantiles;
  - median duration;
  - regime-specific stats;
  - `historical_uncertainty = CI width` (bootstrap) — this feeds VI.7.
- **Use:** memory is **one evidence block**, never the decision. With `n_similar < 30`, its weight shrinks toward the prior. Analogs are shown in the UI as "similar past setups" with links to the journal.

## VI.3 Local model set (smallest that works; chosen by benchmark §III.17)
| Model | Target | Default candidate |
|---|---|---|
| Regime classifier + transition | Regime probabilities and stability (VI.8) | Calibrated LightGBM, or GMM/HMM (existing regime engine extended) |
| Trade quality / TP probability | P(TP1 before SL) | Logistic → LightGBM / CatBoost (monotonic) |
| SL probability / trap risk | P(SL first within H), P(trap) | LightGBM. Used by the Critic (VI.4) |
| Direction probability | P(up-move ≥ x·ATR before down-move ≥ x·ATR), symmetric barrier | LightGBM. Context only, never the sole trigger |
| Expected R and quantiles | E[R], R quantiles, MFE/MAE quantiles | LightGBM quantile |
| Time-to-resolution | Quantiles | LightGBM quantile |
| Execution quality | Expected slippage/fill vs TCA history | Linear/GBM on TCA data |
| Remaining-trade value (in-trade) | E[R_remaining \| hold] for open positions | LightGBM on in-trade snapshots |

- All models are exported to **ONNX** (or native LightGBM) and served on CPU. GPU is optional.
- A small PyTorch model (e.g. a temporal CNN) is admitted only if it beats GBM OOS, net of costs, with fold consistency ≥ 70%.

## VI.4 Decision Critic (independent adversary)
- **Purpose:** for any LONG/SHORT proposal, actively search for reasons **not** to trade.
- **Independence by design:**
  1. a **different target**: P(SL first) or P(trap), not P(TP1);
  2. a **different feature emphasis**: against-evidence families, crowding, liquidity and execution;
  3. a **different model class or training window**;
  4. a **rule checklist**.

  The OOS correlation between the Critic's score and the main model's score is monitored. If it is > 0.7, the Critic is flagged `REDUNDANT` and reviewed.
- **Rule checklist** (each check outputs pass/fail + severity):
  - HTF conflict;
  - liquidity trap (opposing wall within 1×ATR, thin book);
  - fake-breakout signature (VI.12);
  - late entry (distance from trigger > 1×ATR, or > 2.5×ATR from the HTF value zone);
  - poor R:R;
  - funding extreme (|z| ≥ 2 in the trade direction);
  - abnormal OI (OI spike with price stall);
  - adverse CVD;
  - whale distribution (if validated);
  - macro/news window;
  - regime weakening or transition (VI.8);
  - poor execution (cost > 0.15R);
  - model uncertainty (VI.7).
- **Output:**
  - **PASS**: no high-severity fail and P(trap) < τ1;
  - **WEAKEN**: 1 high-severity fail or 2+ medium, or τ1 ≤ P(trap) < τ2 → size ×0.5 and a stricter entry (VI.13);
  - **REJECT**: 2+ high-severity fails or P(trap) ≥ τ2 → WAIT.
  
  The Critic's reasons are listed in the decision object.

## VI.5 Counterfactual Decision Engine
For every decision point, evaluate **all actions**: LONG, SHORT, WAIT, and REDUCE / EXIT if a position is open.

| Quantity | LONG / SHORT | WAIT | REDUCE / EXIT (open position) |
|---|---|---|---|
| E[R]_net | From M1/M2 with costs | Value of waiting = P(better entry within k bars) × entry improvement (VI.13 model) − P(missed move) × expected R missed | From the remaining-trade model vs locking in the current R |
| Probability | P(TP1 first) | — | P(adverse hit) |
| Risk / DD contribution | Planned R × portfolio marginal risk | 0 | Reduced |
| Execution quality | Cost estimate | — | Exit cost |
| Opportunity cost | The best alternative candidate's E[R]_net (VI.10) | — | — |

**Utility:** `U(a) = E[R]_net(a) − λ·risk(a) − μ·ΔDD(a) − opportunity_cost(a)`, with λ and μ from the user's risk profile.

**Choose LONG/SHORT only if:**
- `U(trade) − U(WAIT) ≥ δ_margin` (default 0.15R), and
- `U(trade) − U(opposite) ≥ δ_margin`.

Otherwise the decision is WAIT. Example: LONG +1.4R, SHORT −0.4R, WAIT +0.2R → LONG passes the margin.
All action values are stored in `counterfactual_results`.

## VI.6 Evidence Independence and Conflict Engine
- **Source groups** (independence is by information source, not by indicator count):
  - `price` (RSI, MACD, EMA, ADX, Ichimoku, SMC, structure are all price-derived);
  - `volume`;
  - `orderflow` (CVD, delta, footprint, DOM, OFI);
  - `derivatives` (OI, funding, liquidations, basis);
  - `onchain`;
  - `whales`;
  - `macro`;
  - `news`;
  - `sentiment`;
  - `memory` (historical analogs).
- **Evidence Independence Score:**
  - Group scores are combined after merging groups whose evidence correlates with |ρ| > 0.7 (§III.5).
  - `EIS = number of independent groups confirming the direction with |e| ≥ 0.5`, also reported as the effective number `(Σ|w·e|)² / Σ(w·e)²`.
  - A minimum EIS is required per setup (default ≥ 3, including ≥ 1 non-price group when such data is validated for that market).
- **Conflict index:** `CI = Σ_g w_g·max(0, −e_g) / Σ_g w_g·|e_g|`.
  - LOW < 0.15;
  - MEDIUM 0.15–0.30 → confidence ×0.8, size ×0.75;
  - **HIGH_CONFLICT** ≥ 0.30 → WAIT, or size ×0.5 if the Critic passes and the margin over WAIT ≥ 2·δ.

## VI.7 Uncertainty Engine (separate from confidence)
| Component | Measure |
|---|---|
| Model uncertainty | Dispersion across walk-forward fold models / bootstrap ensemble predictions |
| Regime uncertainty | Entropy of the regime probabilities + transition state (VI.8) |
| Data uncertainty | 1 − weighted feature reliability (VI.9) of the inputs used |
| Historical uncertainty | Analog CI width; low `n_similar` (VI.2) |
| Execution uncertainty | Cost estimate variance; TCA error for this venue/symbol |
| Distribution shift | OOD score: kNN distance percentile vs training data + PSI of key features |

- **Aggregate:** `U = max(component z-scores)` and a weighted mean; both are stored.
- **Rule:** trade only if `U ≤ u_max` **regardless of confidence**. High confidence with high uncertainty → WAIT (`HIGH_UNCERTAINTY`).

## VI.8 Regime transition
- **Stability state** (from the dynamics of the regime probabilities over the last k HTF bars):
  - **STABLE**: arg-max probability ≥ 0.6 and its slope ≥ −δ;
  - **WEAKENING**: arg-max probability falling over k bars plus confirming internals (ER/ADX falling, structure failure on the MTF);
  - **TRANSITION**: hysteresis pending, a top-2 probability gap < 0.15, or entropy above threshold;
  - **UNKNOWN**: data or model issue.
- **Risk multipliers:** STABLE 1.0; WEAKENING 0.75 (no new pyramiding); TRANSITION 0.5 (new entries only for transition-type setups such as squeeze or reversal, which must pass the Critic); UNKNOWN 0 → WAIT.
- **Example path:** TREND_UP STABLE → WEAKENING → TRANSITION → RANGE STABLE. The router switches strategy families only after STABLE.

## VI.9 Feature reliability
`reliability_f = freshness × completeness × source_reliability × (1 − anomaly) × predictive_weight_f,regime`

| Factor | Definition |
|---|---|
| Freshness | Decays with age relative to the feature's max staleness |
| Completeness | Share of non-missing inputs over the lookback window |
| Source reliability | Rolling uptime/error rate of the provider |
| Anomaly | Robust z-score outlier flag or a cross-source mismatch |
| Predictive weight | Regime-specific OOS rank-IC from the Feature Factory, floored at 0 |

- Reliability scales the feature's group weight in VI.6.
- If a group's reliability is < 0.5, it is excluded and reported as "context only".
- The data uncertainty in VI.7 uses the weighted reliability of the inputs actually used.

## VI.10 Opportunity cost and candidate ranking
- At each scan cycle, rank all surviving candidates by:
  ```
  rank = E[R]_net / risk_R × liquidity_score × execution_quality × (1 − corr_penalty) × capital_efficiency
  ```
  where capital efficiency = E[R]_net per unit of margin and holding time.
- **Greedy allocation** under the portfolio risk budget (§I.M):
  - Take the best candidate, update exposures, and re-score the rest. A correlated candidate gets a lower rank after each pick.
  - Stop when the budget is used or no candidate passes the thresholds.
- Rejected candidates get the reason `OPPORTUNITY_COST` with the id of the better alternative.

## VI.11 Portfolio-aware decision (adds to §I.M)
Exposure is computed before every decision and stored with it:
- open positions;
- gross and net exposure;
- correlation clusters;
- leverage and drawdown;
- **asset-class exposure**: crypto beta (vs BTC), FX exposure by currency leg (USD, EUR, JPY …), metals, US stocks by sector, ETFs by underlying.

A new trade is resized or rejected if it raises a cluster's or asset class's risk above its budget. This includes **hidden** exposure: for example, long gold plus short USD/JPY plus long EUR/USD are all short-USD.

## VI.12 Adversarial market check (trap detector)
For each candidate, ask: "If this is a trap, what would we expect to see?" Each trap has explicit **falsifiers** built from point-in-time data:

| Trap | Signatures (any 2 → Critic WEAKEN; 3 → REJECT) |
|---|---|
| Bull/bear trap, fake breakout | Breakout on volume z < 0.5; CVD divergence on the breakout; a close back inside the range within n bars historically frequent for this symbol/regime; breakout into an HTF liquidity wall |
| Liquidity sweep / stop hunt (against us) | Equal highs/lows just beyond our stop; thin book; recent sweeps in the same session |
| OI trap | OI ↑ sharply with price stalling; funding rising in the trade direction |
| Funding trap | Funding |z| ≥ 2 in the trade direction; basis extreme (crowded side) |
| News spike | A high-impact event within the window; a price jump > 3×ATR on one bar with no follow-through |
| Abnormal volatility | ATR percentile ≥ 0.95 or a realised-vol jump; spread widening |

The trap probability model (VI.3) is trained on labelled trap outcomes (breakout reversals within n bars) and is combined with these rules.

## VI.13 Entry-timing intelligence (correct direction ≠ correct entry)
**Output** `entry_action`:
- `ENTER_NOW`;
- `WAIT_PULLBACK(zone)`;
- `WAIT_CONFIRMATION(trigger)`;
- `WAIT_SWEEP(level)`;
- `WAIT_STRUCTURE(tf)`.

Each non-immediate action becomes a **pending conditional plan** with an expiry: a limit or stop-limit order, or a re-evaluation trigger.

**How it decides:**
- Late-entry checks from VI.4.
- The P(better entry within k bars) model: the historical distribution of pullback depth for similar setups (VI.2) and the time model.
- A plan is chosen only if its value beats `ENTER_NOW` (VI.5 WAIT valuation).
- Plans are re-validated at trigger time against the full decision pipeline. There is no blind fill.

## VI.14 Dynamic exit intelligence
At every ETF close for open positions, evaluate HOLD / REDUCE / TAKE_PROFIT / MOVE_SL / TRAIL / EXIT using:
- the remaining-trade model;
- the regime stability;
- the Critic run in reverse ("reasons this trade is now failing");
- exit-engine states;
- time decay.

**Rules:**
- **SL may only tighten.**
- Hard exits (SL, invalidation, kill-switch) execute without the AI.
- The Risk Engine can veto any AI exit suggestion that would raise risk. An exit that **reduces** risk is always allowed.
- Every in-trade action is journaled with its counterfactual values.

## VI.15 Trade autopsy (extends §III.13)
- **Error classes:**
  - `MODEL_ERROR`
  - `FEATURE_ERROR` (a reliability issue or a wrong feature value)
  - `REGIME_ERROR`
  - `SIGNAL_ERROR`
  - `ENTRY_ERROR` (direction right, timing wrong: MAE beyond the stop, then TP reached)
  - `EXIT_ERROR` (MFE ≥ 2R given back, or premature exit followed by the target)
  - `EXECUTION_ERROR`
  - `RISK_ERROR`
  - `UNEXPECTED_EVENT` (an exogenous shock not visible at decision time)
  - plus the earlier `DATA`, `NEWS` and `LIQUIDITY` classes, and `VARIANCE`.
- **Deterministic rules come first; a human reviews later.**
- Each autopsy row joins the research dataset with the prediction-vs-actual deltas.
- Learning still follows the controlled cycle of Part IV:
  ```
  TRADE → OUTCOME → AUTOPSY → DATASET → RESEARCH → TRAIN → VALIDATION → OOS → WALK-FORWARD
  → STRESS → PAPER → SHADOW → APPROVAL → PRODUCTION
  ```
  **No direct self-modification in LIVE.**

## VI.16 Anti-overfitting and cost awareness (additions)
- **Additional mandatory validations:**
  - funding stress (funding ×2, sign flips);
  - liquidity stress (spread ×3, depth ÷3);
  - **unseen-market validation**: a profile held out entirely, e.g. train on BTC/ETH and test on other large-caps; train on EURUSD/GBPUSD and test on AUDUSD;
  - **unseen-period validation**.
- A model that only works on one market or period is not promoted.
- **Gross edge and net edge** (after commission, spread, slippage, funding, impact and a latency assumption) are computed and stored separately for every decision and every backtest trade.

## VI.17 OFFLINE_AI_MODE and proof of no cloud-AI dependency
- **Flag:** `OFFLINE_AI_MODE=true` is the **default** for the decision service. When it is true:
  - decision modules may use only local ML, the local DB, Redis, cached market and news data, local datasets and local models;
  - **no LLM API key exists in the decision service's configuration schema**, so none can be required.
- **Proof** (all four are required and reported):
  1. **Static:** an import/dependency lint rule (e.g. import-linter, ESLint no-restricted-imports or a custom check) fails the build if any decision-path module imports an AI-provider SDK, HTTP client wrappers aimed at AI hosts, or reads an `*_API_KEY` for LLMs.
  2. **Network:** the decision service runs in a container or network policy whose egress allowlist contains only the DB, Redis and the market-data/exchange endpoints. Known AI hosts are blocked. Blocked attempts are logged and alerted.
  3. **Test:** an integration suite runs the full decision pipeline with **no network** (container `--network none` + local DB/Redis fixtures from real stored data) and with the Ollama service stopped. It asserts that decisions, explanations (template) and journaling all work, with zero AI egress attempts.
  4. **Runtime self-check:** at startup and hourly, a health report shows `Cloud AI dependency: NONE`, `Local models loaded: …`, `Ollama: optional (on/off)`.
- **Fail-safe additions:**
  - dataset or model checksum mismatch → NO TRADE;
  - regime UNKNOWN → NO TRADE;
  - uncertainty > u_max → NO TRADE;
  - poor execution quality → NO TRADE;
  - **never fall back to cloud AI**.

## VI.18 Decision output additions (DO v2 = DO v1 + fields)
Added fields:
- `regime_stability`
- `uncertainty` (components + aggregate)
- `data_quality`
- `evidence_independence` (EIS + groups)
- `evidence_conflict` (CI + level)
- `historical_similarity` (score, n, win rate, median R, MFE/MAE)
- `model_risk`
- `critic_result` (PASS|WEAKEN|REJECT + checks)
- `counterfactual_results` (per action: E[R], P, risk, ΔDD, exec, opportunity cost, U)
- `entry_action`
- `trap_checks`
- `opportunity_rank`
- `gross_edge`, `net_edge`
- `offline_mode: true`

The schema version is bumped. Existing consumers keep working: the fields are additive and the API is versioned.

## VI.19 Explainability (answer six questions from the trace)
**WHY TRADE?**
The top positive evidence groups, with scores, plus the top model contributions (TreeSHAP).

**WHY NOT?**
The top contradicting groups, the Critic's findings, the trap checks and the uncertainty components.

**WHY NOW?**
The entry-timing result, the regime stability, the trigger event and the decision expiry.

**WHY THIS SIZE?**
`r` × the multipliers (regime, vol, DD, confidence ≤ 1, Critic, conflict, transition), the portfolio and cluster caps hit, and the leverage logic.

**WHY NOT ANOTHER MARKET?**
The opportunity ranking: this candidate's rank and the next-best alternatives with their scores.

**WHAT INVALIDATES?**
Price, structure and time conditions, plus regime-change and conflict thresholds.

The explanation is rendered from the trace by template. The optional local LLM may only rephrase it, and the text is validated against the trace's numbers (§III.14).

## VI.20 Settings (Local AI section in existing Settings)
**Controls:**
- Offline AI ON/OFF (`OFFLINE_AI_MODE`, default ON for the decision path);
- Local Model, Model Version;
- thresholds: Decision (δ_margin), Confidence, Uncertainty (u_max), Critic (τ1, τ2), Historical Similarity (min n, min score);
- Max Portfolio Risk, Max Correlation;
- Mode: PAPER / SHADOW / LIVE. **LIVE is OFF by default** and locked until III.0.

**Read-only health panels:**
- Model Health (loaded, latency, ECE, drift);
- Dataset Health (rows, freshness, checksum, leakage-test status);
- Last Training, Last Validation;
- Model Performance (rolling net expectancy, PF, DD vs OOS CI);
- Drift Status;
- Cloud-AI dependency status (VI.17).

## VI.21 Tests (additions to §III.20)
- Deterministic decision tests: fixed inputs → identical decision, including the Critic and counterfactual results.
- Memory leakage test: no analog with `label_end_ts ≥ t`; projection and normalisers are fitted only on past data.
- Similarity correctness on synthetic known neighbours.
- Critic independence monitor; Critic REJECT forces WAIT.
- Counterfactual margin rule: WAIT wins on ties.
- EIS counts price-derived indicators as one group.
- Conflict thresholds.
- Uncertainty rule: high confidence with high uncertainty → WAIT.
- Regime transition multipliers.
- Feature reliability down-weighting; stale or anomalous inputs are excluded.
- Opportunity ranking under the budget.
- Hidden-exposure test (short-USD cluster).
- Trap detector cases built from labelled real windows.
- Entry-timing plans expire and are re-validated.
- Dynamic exit: SL never loosens; the risk veto applies; hard exits work without the AI.
- Autopsy rules.
- **Offline suite** (VI.17-3) and the static lint rule.
- Model loading and checksum failure → NO TRADE.
- Missing or stale data → NO TRADE.
- Risk-veto tests.
- Portfolio tests.

## VI.22 Final report for this brief (produced on the server)
1. Modules reused.
2. Modules created.
3. Local models built or used, with benchmark results (§III.17).
4. How the dataset and feature pipeline work (PIT, labels, memory).
5. How the decision flow works (VI.1, with a real trace example).
6. Proof of no cloud-AI dependency: VI.17 items 1–4 with outputs.
7. Tests run, with results.
8. PAPER / SHADOW / LIVE status (LIVE OFF).
9. Model, data and decision health.
10. Remaining items.

---

# PART VII: TIKALGO AI Cognitive Core (Local, Offline-First General-Intelligence Architecture)

> **خلاصهٔ فارسی:** این بخش، **TIKALGO AI** را از یک موتور تصمیم معاملاتی به یک **هستهٔ شناختی عمومی و محلی** ارتقا می‌دهد. این هسته این قابلیت‌ها را دارد:
> - ادراک، حافظهٔ چندگانه، مدل جهان و گراف دانش؛
> - استدلال چندروشی، موتور علیت و برنامه‌ریزی؛
> - استفاده از ابزارها و کتابخانهٔ مهارت؛
> - بازتاب (reflection)، فرضیه‌سازی و آزمایش؛
> - یادگیری مداوم، انتقال دانش بین بازارها، و گفتن «نمی‌دانم»؛
> - مناظرهٔ چندعاملی و خودارزیابی.
>
> «معامله» یکی از حوزه‌های تخصصی این هسته است، نه کل آن.
>
> سه نکتهٔ صادقانه:
> 1. **AGI یک ادعای پژوهشی است، نه نتیجه‌ای که بشود روی یک VPS اعلام کرد.** ما توانایی‌ها را با بنچمارک اندازه می‌گیریم و شواهد ارائه می‌دهیم. چیزی را «اثبات AGI» نمی‌نامیم.
> 2. **هوش این سیستم از معماری می‌آید، نه از یک مدل بزرگ.** معماری یعنی مدل‌های کوچک تخصصی، حافظه، مدل جهان، استدلال، برنامه‌ریزی و ابزارها.
> 3. **ترتیب مهم است.** این بخش بعد از پایدار شدن هستهٔ معاملاتی (Q0 تا Q19 و اجرای PAPER) پیاده می‌شود. اول سودآوری و ایمنی، بعد گسترش هوش عمومی.

## VII.0 Positioning
- **Cognitive Core** = the general architecture. **Trading Domain** = one specialist that *uses* the core. Research and general problems are other domains.
  ```
                   TIKALGO AI COGNITIVE CORE
                              │
         ┌────────────────────┼────────────────────┐
      TRADING              RESEARCH             GENERAL
      DOMAIN               DOMAIN               PROBLEMS
   (Parts I–VI)     (alpha/experiments)    (ops, analysis, Q&A)
  ```
- **Reuse first.** Most core components generalise parts already specified:

  | Already specified | Generalised as |
  |---|---|
  | VI.5 counterfactual engine | Generic counterfactual engine |
  | VI.4 Critic | Critic agent |
  | VI.2 historical memory | Episodic memory |
  | §I.J alpha registry + experiment ledger | Experiment engine |
  | Part IV loops | Continual learning |
  | §I.Q governance | Governance |

  Q0 maps the existing TIKALGO code first.
- **Absolute rule (unchanged):** the core's reasoning, memory, learning, planning and decisions run **100% locally**.
  - No cloud LLM or paid inference API.
  - No hidden cloud fallback.
  - With `OLLAMA=OFF` and no Internet, the core must still REASON, PLAN, DECIDE, PAPER-TRADE and LEARN, as far as its structured models allow.

## VII.1 Architecture and component mapping
```
PERCEPTION ─ MEMORY ─ KNOWLEDGE → WORLD MODEL → COGNITIVE STATE → {REASONING, CAUSALITY, PLANNING}
→ COGNITIVE ROUTER → {LOCAL ML, LOCAL LLM (optional), SEARCH, SYMBOLIC, STATISTICS}
→ MULTI-AGENT CRITIC → COUNTERFACTUAL ENGINE → DECISION ENGINE → SAFETY/RISK GATE → ACTION
→ OBSERVATION → SELF-EVALUATION → LEARNING LOOP → CONTROLLED IMPROVEMENT
```
| Component | Reuses (existing / earlier parts) | New |
|---|---|---|
| Perception | Market-data workers, Feature Factory (§I.H), news/macro pipelines (§I.P) | Event/entity/relationship extraction, cognitive state |
| Memory | Redis, journal, `decision_memory` (VI.2), principle cards + pgvector (IV.3) | Memory manager (tiers, consolidation), self-memory |
| Knowledge graph | Graphify (code graph) + Postgres | Domain KG with temporal, point-in-time edges |
| World model | Regime engine (§I.I), stress layer, scenario/synthetic generator (§I.R-6) | Latent-state transition model, scenario simulator API |
| Reasoning, causality, planning | Rules, statistical engines | Reasoning library, causal engine, planner |
| Router | — | Problem classifier + solver registry + meta-knowledge |
| Critic / debate | VI.4 Critic, VI.12 traps | Agent set with distinct objectives + Judge |
| Counterfactual | VI.5 | Generic interface |
| Decision / risk | TIKALGO AI decision engine (Parts III, VI), Risk Engine | — |
| Tools | All existing services | Tool registry with schemas and permissions |
| Learning / improvement | Part IV, experiment ledger, model registry | Skill library, reflection records, capability registry |

## VII.2 Capability-based progress (Levels of AGI)
Reference: Morris et al., *"Position: Levels of AGI for Operationalizing Progress on the Path to AGI"*, ICML 2024 (Google DeepMind). It grades **performance** (depth) × **generality** (breadth), plus **autonomy** levels tied to deployment risk.

**Capability registry** (table `capability_registry`):
```
capability, domain (general|trading|research), current_level, target_level, benchmark_id,
score (0–100), failure_rate, confidence (CI), generalization (score on unseen-task split),
autonomy_level, last_evaluated, evidence_refs[]
```
- **Levels used:** performance tiers adapted from the paper:

  | Tier | Meaning |
  |---|---|
  | Emerging | Reaches the internal novice baseline |
  | Competent | ≥ the internal expert-rule baseline |
  | Expert | Clearly beats the expert baseline OOS |
  | Virtuoso | — |
  | Superhuman | — |

  Each tier is measured **per capability** against explicit internal baselines. Generality is graded as **narrow** (one domain) vs **general**.
- **Realistic expectation on a CPU VPS:**
  - **Trading:** narrow, possibly Competent→Expert in specific validated cells.
  - **General capabilities:** Emerging at best.
  
  This is reported honestly. The registry exists to make progress **measurable**, not to make claims.

## VII.3 Perception
```
RAW DATA → FEATURES (§I.H) → EVENTS → ENTITIES → RELATIONSHIPS → STATE → WORLD MODEL
```
- **Event schema:**
  ```
  event_id, type, entity_ids[], ts, available_at, attributes, source, confidence, evidence_ref
  ```
  Events are derived deterministically from features. Examples:
  - `BREAKOUT(BTCUSDT, 4h)`;
  - `FUNDING_EXTREME`;
  - `LIQUIDATION_CASCADE`;
  - `CPI_RELEASE(surprise=+0.2)`;
  - `WHALE_DISTRIBUTION`;
  - `SPREAD_SHOCK`.
  
  News events come from §I.P.
- **Entities and relationships** are written to the domain KG (VII.6) with validity times.
- **Cognitive state:** a typed snapshot of the working set the core reasons over (goals, active entities, recent events, world-state estimate, open positions, health), kept in Redis and versioned per cycle.
- **Inputs:** everything in the DFC (§III.3), plus economic calendar, account and execution state.

## VII.4 World model
**References:**
- Ha & Schmidhuber, *World Models* (2018);
- Moerland et al., *Model-based Reinforcement Learning: A Survey* (Foundations and Trends in ML, 2023);
- Chen et al., *A Definition and Roadmap for World Models* (arXiv 2607.06401, 2026).

**Financial world model** = a probabilistic **latent-state transition model**:
- **Latent state** z_t: regime × volatility state × liquidity/stress state, from the regime engine (§I.I), plus macro/liquidity factors.
- **Transition model** P(z_{t+1} | z_t, exogenous events): an HMM/regime-switching estimate with event-conditioned transition probabilities, e.g. P(TREND→RANGE | funding extreme).
- **Observation model:** returns, vol, spreads, flows conditional on z (fitted distributions).
- **Scenario simulator:** samples future paths. It uses regime-switching plus block-bootstrap residuals plus injected shocks (from §I.R-6). It can model:
  - TREND, RANGE, BREAKOUT, REVERSAL;
  - LIQUIDITY EVENT, NEWS SHOCK;
  - VOLATILITY EXPANSION and CONTRACTION;
  - REGIME TRANSITION.
- **Uses:**
  - the counterfactual engine (VII.9) and the planner (VII.10) score actions by simulating outcomes;
  - the risk scenarios for the portfolio.
- **Hidden state and uncertainty:** posterior state probabilities and their entropy are exposed.
- **World Model Health:** probabilistic forecast skill (log score, CRPS) of predicted state and return distributions vs realised outcomes, and transition-probability calibration.

## VII.5 Memory system
| Memory | Content | Storage (reuse) | Lifecycle |
|---|---|---|---|
| Working | Current cognitive state, active goals, retrieved items | Redis (TTL) | Per cycle |
| Episodic | The system's own experiences: decisions, trades, outcomes, autopsies, reflections | Journal + `decision_memory` + reflection records | Append-only; consolidated monthly |
| Semantic | Concepts, principles, domain facts | Domain KG + principle cards (pgvector) | Updated by validated research |
| Procedural | Executable skills | Skill library (VII.17) | Versioned; validated |
| Historical market memory | Market analogs | VI.2 | PIT-safe |
| Self-memory | Own strengths and weaknesses, calibration per task/regime, failure patterns, meta-knowledge | Capability registry + meta-knowledge table (VII.18) | Updated after evaluations |

**Lifecycle:** STORE → INDEX → RETRIEVE → CONSOLIDATE → REFLECT → UPDATE.
- **Retrieval score** (adapted from *Generative Agents*, Park et al. 2023):
  ```
  score = α·relevance (vector + KG proximity) + β·recency + γ·importance + δ·outcome_value
  ```
  It is computed locally, and memory is **point-in-time filtered** for any decision.
- **Tiering** (adapted from *MemGPT*, Packer et al. 2023): small working context, paged retrieval from long-term stores. A local LLM is not required; retrieval is structured.
- **Consolidation jobs:** merge duplicate episodes into summaries with statistics; promote recurring patterns to semantic cards as `untested` hypotheses; decay irrelevant items (never delete audit records).

## VII.6 Knowledge graph
- **Graphify** stays the **code/architecture** graph used by Claude Code.
- The **domain KG** reuses the same Postgres or graph storage if Q0 shows that is suitable. Otherwise it uses Postgres tables or recursive queries (or Apache AGE if already installed). No new heavy graph database without need.
- **Entities:** assets, exchanges, brokers, companies, projects, tokens, sectors, economies, currencies, macro indicators, organisations and people (public roles only), news events, strategies, signals, trades.
- **Relations:** `correlates_with`, `causes`, `influences`, `depends_on`, `belongs_to`, `contradicts`, `supports`, `preceded_by`, `followed_by`, `similar_to`.
- **Every edge has:** `confidence`, `evidence_refs`, `method` (statistical/causal/curated), `valid_from` / `valid_to` (temporal, so queries are point-in-time) and `version`.
  - `causes` edges require causal-engine evidence (VII.8).
  - `correlates_with` edges are rolling and dated.

## VII.7 Reasoning core (not text generation)
| Mode | Implementation (local) |
|---|---|
| Deductive | Rule engine over typed facts (risk rules, strategy rules, constraints) |
| Inductive | Statistical estimation from data and memory (rates, distributions, CIs) |
| Abductive | Rank candidate explanations of an observation by likelihood × prior (e.g. why did this trade fail: regime, execution or news?) |
| Probabilistic | Bayesian updating; calibrated model probabilities |
| Temporal | Time-aware KG queries, event sequences, lead/lag analysis |
| Causal | Causal engine (VII.8) |
| Analogical | Memory similarity (VI.2, VII.5) |
| Constraint | CP/LP/MIP solver (e.g. OR-Tools / scipy) for allocation and scheduling |
| Symbolic | Rule/Datalog-style inference over the KG |
| Numerical | numpy/scipy/statsmodels solvers |
| Counterfactual | VII.9 |

- Every reasoning step emits a structured record: method, inputs, output, confidence.
- The optional local LLM can only parse or produce text around these steps.

## VII.8 Causal engine
**Reference:** Pearl, *Causality* (2nd ed., Cambridge University Press, 2009).

**Record format:**
```
CAUSE → MECHANISM → EFFECT → ALTERNATIVE EXPLANATIONS → COUNTERFACTUAL → EVIDENCE LEVEL
```

- **Domain DAGs:** encoded from domain knowledge. Example: global liquidity / USD / risk appetite → {BTC, ETH, NDX}. This separates **common-cause co-movement** from "BTC ↑ because ETH ↑".
- **Estimation:**
  - backdoor adjustment with regression or matching on stationary features;
  - event studies around exogenous events (macro releases, scheduled unlocks);
  - conditional-independence tests (PC-style discovery) as **suggestions only**;
  - Granger-type lead/lag only as weak temporal evidence.
- **Refutation tests** (required):
  - placebo treatment;
  - a random common cause;
  - subset stability;
  - out-of-period replication.
- **Evidence levels:** `correlational` < `temporal` < `adjusted` < `quasi-experimental` (event study) < `replicated`.
  - Only `adjusted+` may create `causes` edges.
  - Trading logic may use causal claims only at `quasi-experimental+`.

## VII.9 Generic counterfactual engine
- **Interface:**
  ```
  evaluate(state, actions[], outcome_model, utility, risk_model, horizon)
    → per action: E[outcome], risk, uncertainty, opportunity_cost, U
  ```
  Outcome models come from the world model, ML models or the simulator.
- **Trading:** actions = {LONG, SHORT, WAIT, REDUCE, EXIT} (VI.5).
- **Generic:** actions = {A, B, WAIT, DO_NOTHING}. Example: run an expensive research job now vs later under CPU budget.
- **Selection rule:** an action is chosen only if it beats the safe default (WAIT / DO_NOTHING) by a margin that **grows with uncertainty**.

## VII.10 Planning engine
```
GOAL → SUBGOALS → PLAN → ACTION → OBSERVE → EVALUATE → REPLAN
```
- **Hierarchical (HTN-style) decomposition** with typed tasks.
  - Horizons: short (one decision cycle), medium (a trade lifecycle or research experiment), long (monthly research programme).
- **Search** (adapted from *Tree of Thoughts*, Yao et al. 2023, without depending on an LLM):
  - beam/tree search over candidate plans;
  - states are scored by value estimates from models, the world-model simulation and the counterfactual engine;
  - backtracking when a branch fails a constraint or its value drops.
- **Contingencies:** every plan carries "if X then Y" branches. Trading example: an entry plan with expiry, invalidation and hedging/exit branches.
- **Replanning triggers:** a regime change, a health degradation, a constraint violation, or a goal completed or failed.

## VII.11 Tool use and tool registry
**Registry fields:**
```
tool, purpose, input_schema, output_schema, cost (CPU/time), latency, reliability (rolling),
permissions, risk_level (read | compute | simulate | paper_order | live_order | admin), owner, version
```
- **Tools** (existing services wrapped, not rewritten): DB, Redis, WebSocket, market-data adapters, scanner, backtester, execution engine, risk engine, news, on-chain, whale, analytics, a Python sandbox, local files (read-only scope), KG queries.
- **Grounding** (adapted from *ReAct*, Yao et al. 2023, and *SayCan*, Ahn et al. 2022): a tool is selected only if **useful** (expected value for the current goal) × **able** (affordance: permission, health and preconditions satisfied).
  - Every call is logged.
  - **Outputs are observations, never trusted instructions.**
- **Permissions:**
  - `live_order` is callable only through the Risk Engine and Execution Gate, in LIVE mode, after the III.0 gates.
  - The Python tool runs in a **sandbox** (no network, CPU/memory/time limits, read-only data mounts).

## VII.12 Cognitive router
"What kind of problem is this?" A rules-first classifier answers, with a small local classifier for ambiguous text requests. It then selects a solver from the **solver registry**:

| Problem type | Solver |
|---|---|
| Math / numeric | Numerical solver |
| Prediction | ML model |
| Optimisation | Optimiser (CP/LP/MIP) |
| Causal question | Causal engine |
| Planning | Planner |
| Pattern recognition | Local ML |
| Text understanding | Local LLM (optional) or a structured parser |
| Historical question | Memory / retrieval |
| Trading decision | Trading Intelligence Stack (TIKALGO AI, Parts III/VI) |

- **Meta-knowledge (VII.18) re-ranks solvers** by past performance on the task type.
- If no solver qualifies → `INSUFFICIENT_EVIDENCE` / "I don't know" (VII.19).

## VII.13 Local model stack
- **Models:** LightGBM, XGBoost, CatBoost, sklearn, small PyTorch and ONNX Runtime, on CPU first.
- **Optional local LLM** (Ollama / llama.cpp; quantised small model): used only where the benchmark proves value. It must never be a single point of failure.
- **The `OLLAMA=OFF` test is mandatory.** With it off, the core must still:
  - **reason** (structured);
  - **plan** (search);
  - **decide** (TIKALGO AI);
  - **paper-trade**;
  - **learn** (Loops A and B).

## VII.14 Self-reflection (structured, not free text)
Inspired by *Reflexion* (Shinn et al. 2023) and *Self-Refine* (Madaan et al. 2023).

**Reflection record** (written after each decision cycle that resolves):
```
belief (claim + probability), basis (evidence ids), ignored_evidence (ids with reason),
alternatives_considered (ids + values), outcome, error_location (autopsy class VI.15),
lesson (structured: condition → adjustment proposal), confidence_change, links
```
- Reflections become **retrieval context** for similar future situations, and **hypothesis seeds** (VII.15).
- They never directly change production logic.
- Iterative refinement inside a cycle is bounded: at most N critique-revise rounds, each scored by a metric, not by self-assessment text.

## VII.15 Hypothesis and experiment engine (research scientist loop)
```
OBSERVATION → QUESTION → HYPOTHESIS → EXPERIMENT → RESULT → CRITIQUE → REPLICATION → ACCEPT / REJECT
```
- **Sources:**
  - autopsy clusters (e.g. "losses in RANGE with funding extreme and positive CVD");
  - drift alerts;
  - KG anomalies;
  - reflection lessons;
  - principle cards.
- **Templates:** conditional-effect, lead-lag, interaction and regime-dependence hypotheses.
  - Example: *"Funding extremes combined with positive CVD may predict failed continuation in RANGE."* → its dataset spec, test and metric are generated automatically.
- **Execution:**
  - reuses the alpha registry and experiment ledger (§I.J, §I.R);
  - versioned and reproducible;
  - **replication on a held-out period or market** is required before ACCEPT.
- **Statistics:** multiple-testing control (t ≥ 3, DSR, PBO); every generated hypothesis counts as a trial.
- **No hypothesis reaches production without the full pipeline.**

## VII.16 Continual learning
Part IV loops, plus methods from Wang et al., *A Comprehensive Survey of Continual Learning* (2023):
- **Rehearsal/replay:** regime-stratified replay buffers, including fixed crash, range and panic sets.
- **Regularisation toward the validated model:** bounded parameter drift.
- **Modular / regime-specific models:** this limits interference.
- **Forgetting tests:** a new model must not degrade on the frozen stress sets.

**Never:** `LOSS → AUTOMATIC LIVE RETRAIN → LIVE`.

## VII.17 Skill library
Inspired by *Voyager* (Wang et al. 2023), fully offline.

**Skill card:**
```
skill_id, name, inputs (typed), procedure (code ref, version), outputs, preconditions,
validation (tests + metrics), performance (by market/regime), applicable_regimes, known_failures,
dependencies (other skills), status (draft|validated|deprecated), owner, created_at
```
- **Examples:**
  - detect liquidity sweep;
  - classify regime transition;
  - estimate slippage;
  - build an entry plan;
  - run a walk-forward test;
  - compute a causal effect estimate.
- **Composable:** skills form a DAG; the planner composes validated skills.
- **New skills** are written as code by developers or Claude Code, offline, with tests. The core may **propose** compositions and parameter variants as experiments, never self-deploy code.

## VII.18 Generalisation, transfer and meta-learning
- **Transfer protocol** (e.g. BTC regime skill → ETH → Gold → SPX):
  1. feature-distribution similarity check;
  2. causal-structure similarity (shared drivers in the DAG);
  3. zero-shot evaluation on the target;
  4. fine-tune on target data only if needed;
  5. **OOS validation on the target**.
  
  The transfer is registered only if the target's OOS passes.
- **Meta-knowledge table:**
  ```
  task_type, context (market/regime/data size), method/model, score, n_evals, last_updated
  ```
  For example: regime classification → model A best in crypto, model B in FX; rare-event detection → model C; news interpretation → structured parser vs local LLM.
  The router (VII.12) uses it.

## VII.19 Uncertainty and "I don't know"
- **Abstention policy (generic):** return `INSUFFICIENT_EVIDENCE` / "I don't know" when any of these holds:
  - uncertainty > threshold (VI.7 components);
  - OOD / distribution shift;
  - missing data;
  - conflicting evidence;
  - unknown regime;
  - weak analogs (n < min);
  - poor calibration for that task.
- **Measured** with **selective-risk curves** (coverage vs error): the system should be more accurate on what it answers than overall. Abstention quality is a scorecard item.
- **No hallucination path:** every claim in an answer must reference evidence ids. Unreferenced claims are removed.

## VII.20 Multi-agent cognitive debate (distinct objectives, not prompt clones)
| Agent | Objective function | Implementation |
|---|---|---|
| Analyst | Maximise expected net R of the best candidate | TIKALGO AI meta-model |
| Critic | Maximise detection of failure / trap | VI.4 Critic (different target and model) |
| Researcher | Base rates and historical analogs; challenges novelty | Memory + statistics |
| Risk Analyst | Minimise tail loss / DD contribution | Risk models, scenario simulator |
| Causal Analyst | Validate the mechanism; flag correlation illusions | Causal engine |
| Portfolio Analyst | Minimise marginal portfolio risk and concentration | Portfolio construction |
| Execution Analyst | Minimise cost and slippage; fill feasibility | Execution intelligence |
| **Judge** | Aggregate with **uncertainty weighting**: each agent's vote is weighted by its calibrated track record in this context; any veto-class objection (Risk/Execution hard limits) is binding | Deterministic aggregator |

**Flow:** Evidence → Debate (each agent's structured position + evidence ids) → Criticism (cross-objections) → Resolution → Judge.
- Disagreement entropy is an uncertainty input.
- **High disagreement → WAIT / INSUFFICIENT_EVIDENCE.**
- The optional local LLM may only narrate the debate from the structured records.

## VII.21 Trading domain layer
```
Observe → Understand Regime → Retrieve History → Generate Candidates (existing engines)
→ Evaluate Evidence → Causal/Counterfactual Analysis → Critic/Debate → Portfolio Analysis → Risk Gate → Execute / WAIT
```
Implemented by TIKALGO AI (Parts III and VI) as the trading specialist. The core provides memory, the world model, causal and planning services. No existing TIKALGO engine is replaced.

## VII.22 Self-diagnostics
| Health metric | Definition (0–100%) |
|---|---|
| Data Health | Weighted feature reliability (VI.9) of the active inputs |
| Model Health | Calibration (1 − normalised ECE), drift status, latency within budget |
| Memory Health | Index freshness, retrieval hit quality on probe queries, consolidation backlog |
| Knowledge Health | Share of KG edges with valid evidence and not expired; contradiction count |
| Tool Health | Rolling success rate and latency per tool |
| World Model Health | Forecast skill (log score / CRPS) vs baseline |
| Decision Health | No-trade value, filter value, rolling net expectancy vs OOS CI |
| Calibration | Reliability per task |
| Resources | CPU, RAM, disk vs budgets |

These are shown on a self-diagnostics dashboard. Thresholds trigger degrade modes (VII.23) and alerts.

## VII.23 Resource-aware intelligence
**Compute governor** with per-cycle budgets and priorities:
1. risk, exits and kill-switch;
2. live decisions;
3. monitoring;
4. research and consolidation.

**Degrade modes:**

| Mode | What runs |
|---|---|
| FULL | Everything |
| LITE | Smaller models, fewer simulations, more cache, no LLM |
| MINIMAL | Rule baseline + risk only; research paused |

**Efficiency metrics:** decision quality per CPU-second and per GB RAM ("maximum intelligence per CPU/RAM"). Huge models are never run when a small one meets the benchmark.

## VII.24 Evaluation suite and scorecard
| Area | Internal benchmark (held-out, unseen tasks) |
|---|---|
| Reasoning | Logic/math/abstraction task sets (generated + curated); ARC-AGI public tasks as an **external reference only** |
| Generalisation | Performance on unseen markets, periods and task variants |
| Memory | Long-horizon retrieval accuracy on probe questions about past episodes |
| Transfer | Source→target OOS gains (VII.18) |
| Tool use | Correct tool selection and argument validity on scripted tasks |
| Causality | Synthetic data with a known DAG: recover cause vs confounded correlation; market event studies |
| Counterfactual | Simulated environments with known outcomes |
| Planning | Multi-step tasks in simulation; success rate, steps, recovery |
| Learning | Improvement after feedback across Loop B generations |
| Self-correction | Injected errors detected or fixed |
| Uncertainty | Selective-risk curves; calibration |
| Finance | Net expectancy, DD, no-trade value vs `baseline_v0` (IV.6) |
| Safety | Zero hard-limit violations; red-team scenarios (bad data, tool failure, prompt-like inputs in news) |

- **Scorecard (0–100 per area):** a normalised score vs internal baselines, with CI and "unseen-task" emphasis.
- **Explicitly not an "AGI proof".** The dashboard shows the evidence and the Levels-of-AGI tier per capability.
- **ARC-AGI** (arcprize.org; ARC-AGI-2 technical report) is used to track abstraction on unseen tasks. A low score is expected on CPU-scale systems. It is reported, never optimised by memorisation.

## VII.25 Security and governance
NIST AI RMF 1.0 (GOVERN, MAP, MEASURE, MANAGE) and its Playbook, mapped to concrete controls:

| Function | Controls |
|---|---|
| GOVERN | Roles, approval workflow, model registry, policy for autonomy levels per domain (trading LIVE = human-approved) |
| MAP | Capability registry, tool risk levels, data lineage, intended-use statements |
| MEASURE | Evaluation suite, monitors, red-team tests |
| MANAGE | Kill-switch, risk veto, human override, rollback, incident log |

**Boundaries:**
- tool permissions;
- action limits per mode;
- sandbox for code;
- an immutable, hash-chained audit/decision history;
- **no self-modification of production code, configs or models.**

## VII.26 Controlled self-improvement
```
OBSERVE → DETECT WEAKNESS → FORM HYPOTHESIS → DESIGN EXPERIMENT → TRAIN/BUILD CANDIDATE
→ TEST → COMPARE → OOS → STRESS → SHADOW → APPROVE → DEPLOY
```
**Prohibited:**
- changing LIVE logic in response to losses;
- editing its own permissions or limits;
- deploying code;
- disabling monitors or tests.

## VII.27 Offline AI contract test
`test_no_cloud_ai_dependency` (integration, CI and on-server). Setup:
- run in a container with **no network**;
- all cloud AI credentials removed;
- Ollama stopped;
- local DB/Redis loaded with real stored data.

Then execute:
```
START → LOAD LOCAL MODELS → LOAD MEMORY → LOAD KNOWLEDGE → PROCESS DATA → REASON → PLAN
→ DECIDE → PAPER TRADE → LEARN (Loop A update)
```
Assertions:
- every stage completes;
- zero egress attempts;
- the health report shows `Cloud AI Dependency: NONE`.

This is combined with the VI.17 static lint and network-isolation tests.

## VII.28 Logging and audit (per reasoning cycle)
```
cycle_id, goal, observations (refs), retrieved_memory (ids), world_state (summary + probs),
hypotheses (ids), tools_used, models_used (versions), reasoning_result (structured),
alternatives (with values), critic/debate (positions), uncertainty, decision, action, result,
error (autopsy class), learning (records created), versions, timestamp
```
**Private raw chain-of-thought is not stored as a product or log.** Only structured, auditable traces are stored.

## VII.29 The cognitive loop
```
PERCEIVE → UNDERSTAND → REMEMBER → RETRIEVE → MODEL WORLD → REASON → GENERATE HYPOTHESES
→ PREDICT → PLAN → SIMULATE COUNTERFACTUALS → CRITICIZE → ESTIMATE UNCERTAINTY → SELECT ACTION
→ RISK CHECK → ACT / WAIT → OBSERVE RESULT → EVALUATE → REFLECT → LEARN → UPDATE SKILLS / MEMORY
→ TEST IMPROVEMENT → (back to PERCEIVE)
```
**Cadences:**

| Activity | Cadence |
|---|---|
| Trading cycles | On the ETF bar close |
| Monitoring | Every minute |
| Reflection | After each resolution |
| Consolidation | Nightly |
| Research | Weekly / monthly |
| Evaluation suite | Monthly |

## VII.30 Design trade-off: "The Bitter Lesson"
Reference: Sutton, *The Bitter Lesson* (2019; original essay at incompleteideas.net).

General methods that scale with computation and data (**search and learning**) tend to beat hand-crafted knowledge over time. Applied within VPS limits:
- Prefer learning from TIKALGO's own growing data and **search** in planning/counterfactuals over ever-growing hand-tuned rules.
- Keep domain priors where data is scarce (risk rules are **constraints**, not heuristics to be learned away).
- Re-evaluate which hand-crafted components still beat learned ones as data grows (meta-knowledge, VII.18).

## VII.31 Roadmap (after the trading core is validated)
| Phase | Scope |
|---|---|
| C0 | Audit (repo, Graphify, existing AI/data modules), duplicate map, dependency graph, gap analysis vs Part VII |
| C1 | Capability registry + evaluation-suite skeleton + baselines + self-diagnostics |
| C2 | Perception events/entities + cognitive state + tool registry (wrap existing services; permissions; sandbox) |
| C3 | Memory system (tiers, retrieval scoring, consolidation) + domain KG (temporal edges) |
| C4 | World model (latent-state transitions + scenario simulator API) |
| C5 | Generic counterfactual + planner (HTN + search) + router + meta-knowledge |
| C6 | Causal engine (DAGs, estimation, refutation, evidence levels) |
| C7 | Multi-agent debate + Judge (on top of the TIKALGO AI components) |
| C8 | Reflection records + hypothesis/experiment engine (reuse ledger) + skill library |
| C9 | Transfer protocol + continual-learning safeguards + resource governor |
| C10 | `test_no_cloud_ai_dependency` full lifecycle, NIST RMF control review, AGI-core status report |

Every capability must be **typed, tested, observable, versioned and fault-tolerant**. Existing APIs stay unchanged unless necessary (and are then versioned).

## VII.32 Final report template (produced on the server)
```
AGI CORE STATUS
Architecture · Existing Modules Reused · New Modules · Local Models · Memory · World Model ·
Knowledge Graph · Reasoning · Planning · Causal Engine · Counterfactual Engine · Tool System ·
Skill Library · Continual Learning · Self-Reflection · Self-Improvement · Generalization ·
Evaluation Scores (with CIs and Levels-of-AGI tier per capability; not an AGI claim) ·
Offline Verification: PASS/FAIL · Cloud AI Dependency: NONE/FOUND · Trading Integration ·
Safety (NIST RMF mapping, violations = 0?) · Tests · Known Limitations · Next Capability
```

## VII.33 References for Part VII (verified where noted)
| Reference | Status |
|---|---|
| Morris et al., "Position: Levels of AGI for Operationalizing Progress on the Path to AGI", ICML 2024, PMLR 235 | Verified |
| Chen et al., "A Definition and Roadmap for World Models", arXiv 2607.06401 (July 2026) | Verified |
| Ha & Schmidhuber, "World Models", arXiv 1803.10122 | |
| Moerland et al., "Model-based Reinforcement Learning: A Survey", FnT ML 2023 | |
| Packer et al., "MemGPT", arXiv 2310.08560 | |
| Park et al., "Generative Agents", arXiv 2304.03442 | |
| Pearl, *Causality*, Cambridge UP | |
| Yao et al., "Tree of Thoughts", arXiv 2305.10601 | |
| Yao et al., "ReAct", arXiv 2210.03629 | |
| Ahn et al., "Do As I Can, Not As I Say" (SayCan) | |
| Shinn et al., "Reflexion", arXiv 2303.11366 | |
| Madaan et al., "Self-Refine", arXiv 2303.17651 | |
| Wang et al., "A Comprehensive Survey of Continual Learning", arXiv 2302.00487 | |
| Wang et al., "Voyager", arXiv 2305.16291 | |
| ARC Prize / ARC-AGI-2 technical report | |
| NIST AI RMF 1.0 + Playbook | |
| Sutton, "The Bitter Lesson" (2019) | |
