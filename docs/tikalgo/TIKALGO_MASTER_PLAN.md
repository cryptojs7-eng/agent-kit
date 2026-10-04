# TikAlgo — نقشه‌ی جامع معماری و ارتقا (Master Plan v1)

> پلتفرم هوشمند تحلیل و معامله در کریپتو، فارکس، سهام آمریکا و فلزات
> نسخه: ۱.۰ · تاریخ: ۲۰۲۶-۱۰ · دامنه: `tikalgoai.com`

---

## فهرست

0. [این سند را چطور استفاده کنیم](#0)
1. [چشم‌انداز و اصول طراحی](#1)
2. [معماری کلان](#2)
3. [پشته‌ی فناوری](#3)
4. [لایه‌ها و ماژول‌ها (۴۵ ماژول)](#4)
5. [نقشه‌ی راه فازبندی‌شده](#5)
6. [پرامپت‌های اجرایی Claude Code](#6)
7. [فهرست پروژه‌ها و اسکیل‌های گیت‌هاب و دستور نصب](#7)
8. [امنیت](#8)
9. [ریسک‌ها، محدودیت‌ها و نکات حقوقی](#9)

---

<a id="0"></a>
## 0. این سند را چطور استفاده کنیم

1. این فایل را در ریشه‌ی مخزن تیک‌الگو روی سرور بگذارید:
   `docs/TIKALGO_MASTER_PLAN.md`
2. در Claude Code (روی سرور: `claude` یا `claude remote-control`) اول **پرامپت فاز ۰ (ممیزی)** را اجرا کنید. تیک‌الگو از قبل ماژول‌های زیادی دارد، مثل exit_advisor، billing، notifications، on-chain، reports، settings، Kill Zones و llm_engine. پس این نقشه باید **روی کد موجود** پیاده شود، نه از صفر.
3. خروجی فاز ۰ یک **جدول شکاف** (Gap Matrix) است: هر ماژول این سند ← وضعیت در کد (✅ هست / 🟡 ناقص / ❌ نیست).
4. بعد فاز به فاز و ماژول به ماژول با پرامپت‌های بخش ۶ جلو بروید. در هر ماژول این ترتیب را رعایت کنید: **تست ← کامیت ← دیپلوی روی staging ← تأیید ← production**.
5. هر ماژول یک **Feature Flag** دارد و پیش‌فرض آن خاموش است.

> ⚠️ این سند بدون دسترسی به کد فعلی تیک‌الگو نوشته شده است. پایه‌اش خلاصه‌ی جلسه‌های قبلی Claude Code و توضیحات مالک پروژه است. نام فایل‌ها و مسیرها پیشنهادی‌اند و Claude Code باید آن‌ها را با ساختار موجود تطبیق دهد.

---

<a id="1"></a>
## 1. چشم‌انداز و اصول طراحی

### چشم‌انداز
یک «مغز معاملاتی» یکپارچه که:
- **همه‌چیز را می‌بیند:** قیمت، اخبار، شبکه‌های اجتماعی، آن‌چین، نهنگ‌ها، اقتصاد کلان و شاخص‌های بین‌بازاری
- **می‌فهمد:** رژیم بازار، اثر خبر و جریان نقدینگی را تشخیص می‌دهد
- **تصمیم می‌گیرد:** کِی بخرد، کِی بفروشد و کِی منتظر بماند، و تصمیمش را توضیح می‌دهد
- **اجرا می‌کند:** در صرافی‌های کریپتو، بروکرهای فارکس و متاتریدر و بروکرهای سهام آمریکا
- **یاد می‌گیرد:** از ژورنال معاملات، اسکیل‌های جدید و مدل‌های جدید
- **برای مبتدی ساده و برای حرفه‌ای کامل** است

### اصول غیرقابل مذاکره
| # | اصل | توضیح |
|---|---|---|
| P1 | **ایمنی سرمایه مقدم بر سود** | هیچ سفارش واقعی‌ای بدون عبور از Risk Engine ثبت نمی‌شود. Kill Switch سراسری وجود دارد. |
| P2 | **سطوح خودمختاری** | `advisory` (فقط پیشنهاد) ← `paper` (حساب کاغذی) ← `semi-auto` (با تأیید کاربر) ← `auto` (با سقف ریسک). پیش‌فرض: `advisory`. |
| P3 | **قابل توضیح بودن** | هر سیگنال و تصمیم «چرا؟» دارد: کدام داده، کدام اسکیل و چه وزنی. |
| P4 | **Event-driven و ماژولار** | ماژول‌ها فقط از طریق Event Bus با هم حرف می‌زنند و هر کدام جدا خاموش و روشن می‌شود. |
| P5 | **Plugin-first** | استراتژی، اندیکاتور، اسکیل، منبع داده و کانکتور همه پلاگین‌اند. |
| P6 | **ارزیابی قبل از اعتماد** | هر مدل یا اسکیل جدید اول بک‌تست، بعد walk-forward و بعد paper می‌شود و فقط بعد از آن live. |
| P7 | **حریم خصوصی و امنیت** | کلیدهای API کاربران رمزنگاری‌شده‌اند، فقط مجوز Trade دارند و **هرگز** مجوز Withdraw ندارند. |

---

<a id="2"></a>
## 2. معماری کلان

```
┌──────────────────────────────────────────────────────────────────────────┐
│  L7  PRODUCT       Web (Next.js) · Mobile (Expo/PWA) · Admin · Landing   │
│                    Charts · Watchlist · Journal · Voice · Chat · Alerts  │
├──────────────────────────────────────────────────────────────────────────┤
│  API GATEWAY       REST + WebSocket (FastAPI) · Auth/RBAC · Rate limit   │
├──────────────────────────────────────────────────────────────────────────┤
│  L5  EXECUTION     OMS · Risk Engine · Capital/Portfolio Mgr · Bots      │
│                    Connectors: CCXT · Hyperliquid · Toobit · MT5 · Alpaca│
├──────────────────────────────────────────────────────────────────────────┤
│  L4  AI BRAIN      Signal Fusion · Multi-Agent Decision · Skills Runtime │
│                    Memory (Journal/RAG) · Model Registry · Offline LLM   │
├──────────────────────────────────────────────────────────────────────────┤
│  L3  ANALYTICS     TA/SMC/ICT · Scanners · Pump/Dump · Regime · Intermkt │
│                    Macro · News-Impact · Sentiment · On-chain · Whales   │
├──────────────────────────────────────────────────────────────────────────┤
│  L2  DATA PLATFORM TimescaleDB · Redis Streams · pgvector/Qdrant · S3    │
├──────────────────────────────────────────────────────────────────────────┤
│  L1  INGESTION     Market WS · News/RSS · Social · On-chain · HL Whales  │
│                    Econ Calendar · FRED · Exchange metrics (OI/Funding)  │
├──────────────────────────────────────────────────────────────────────────┤
│  L0  PLATFORM      Docker/K8s · Observability · Secrets · CI/CD · Backup │
└──────────────────────────────────────────────────────────────────────────┘
          ▲ همه‌ی لایه‌ها از طریق Event Bus (Redis Streams یا NATS) ▲
```

### جریان داده‌ی اصلی (Data → Decision → Action → Learning)

```
Ingestors ──► Normalizers ──► Event Bus ──► Feature Builders ──► Feature Store
                                   │                                  │
                                   ▼                                  ▼
                           Scanners / Alerts            Signal Fusion + AI Agents
                                                                      │
                                                         Decision {BUY/SELL/WAIT, size, SL/TP, why}
                                                                      │
                                                     Risk Engine (veto) ──► OMS ──► Broker/Exchange
                                                                      │
                                                     Journal ◄── Fills/PnL ◄──────┘
                                                        │
                                              Reflection & Memory ──► Skill/Model updates
```

### Event‌های اصلی (topicها)
`md.tick.*` · `md.candle.{tf}.*` · `md.orderbook.*` · `news.raw` · `news.scored` · `social.trend` · `onchain.transfer` · `whale.hl.position` · `whale.alert` · `macro.release` · `regime.update` · `scanner.hit` · `signal.new` · `decision.new` · `risk.veto` · `order.*` · `fill.*` · `journal.entry` · `alert.out`

---

<a id="3"></a>
## 3. پشته‌ی فناوری پیشنهادی

| لایه | انتخاب اصلی | جایگزین |
|---|---|---|
| Backend | Python 3.12 + **FastAPI** + Pydantic v2 | Node/NestJS برای سرویس‌های real-time |
| Workers | **Celery** یا **Arq** + Redis | Dramatiq |
| Event Bus | **Redis Streams** (فاز B) | NATS JetStream / Kafka برای مقیاس بالا |
| DB سری زمانی | **PostgreSQL + TimescaleDB** | QuestDB / ClickHouse |
| حافظه‌ی برداری | **pgvector** | Qdrant |
| کش و Pub/Sub | Redis 7 | — |
| فایل‌ها | MinIO (S3) | — |
| Frontend | **Next.js 15 + TypeScript + Tailwind + shadcn/ui** | — |
| Mobile | **Expo (React Native)** + PWA | Flutter |
| نمودار | **KLineChart** (MIT، ابزار ترسیم داخلی) یا **TradingView Lightweight Charts** | TradingView Charting Library (لایسنس رایگان با درخواست) |
| LLM ابری | Claude / OpenRouter | — |
| LLM آفلاین | **Ollama** یا **vLLM** (Qwen / Llama / DeepSeek) | llama.cpp |
| ML کلاسیک | LightGBM / XGBoost / scikit-learn / hmmlearn | PyTorch |
| بک‌تست | **vectorbt** (سریع) + **NautilusTrader** (دقیق، رویدادمحور) | backtesting.py / Lean |
| بهینه‌سازی | **Optuna** | — |
| MLOps | **MLflow** (Model Registry) | — |
| صدا | **Pipecat** یا **LiveKit Agents** + Whisper (STT) + TTS | — |
| مشاهده‌پذیری | Prometheus + Grafana + Loki + Sentry | — |
| استقرار | Docker Compose ← (بعداً) K3s | — |

---

<a id="4"></a>
## 4. لایه‌ها و ماژول‌ها

> برای هر ماژول این موارد آمده: **هدف · قابلیت‌ها · منابع داده · مراجع گیت‌هاب · خروجی**. پرامپت اجرایی هر ماژول در بخش ۶ است.

### L1 — دریافت داده (Ingestion)

#### M01 · Market Data Hub (کریپتو)
- **هدف:** قیمت لحظه‌ای، کندل، اوردربوک و معاملات از همه‌ی صرافی‌ها با فرمت یکسان.
- **قابلیت‌ها:** WebSocket برای tick و orderbook، Backfill کندل، تشخیص و پر کردن گپ (C1 که قبلاً انجام شده)، نرمال‌سازی نماد (`BTC/USDT:USDT`).
- **منابع:** Binance، Bybit، OKX، Hyperliquid، Toobit (از طریق `agent-kit`)، KuCoin و Gate.
- **مراجع:** [ccxt](https://github.com/ccxt/ccxt) (نسخه‌ی Pro برای WS) · [hyperliquid-python-sdk](https://github.com/hyperliquid-dex/hyperliquid-python-sdk) · [agent-kit (Toobit)](https://github.com/cryptojs7-eng/agent-kit)
- **خروجی:** `md.tick.*`، `md.candle.*` و `md.orderbook.*` در Event Bus، و جدول‌های `candles` و `trades` در Timescale.

#### M02 · Derivatives Metrics
- **قابلیت‌ها:** Open Interest، Funding Rate، نسبت Long/Short، **لیکوییدیشن‌های لحظه‌ای** (Binance `forceOrder` stream)، Basis.
- **کاربرد:** تشخیص اهرم بیش از حد، Short Squeeze و Long Squeeze.

#### M03 · Forex / Metals / Indices Feed
- **منابع:** MetaTrader 5 (از طریق Bridge، ماژول M28)، OANDA v20، Interactive Brokers.
- **نمادها:** XAUUSD، XAGUSD، EURUSD، GBPUSD، USDJPY، DXY، US30، NAS100، SPX500، USOIL و UKOIL.
- **مراجع:** [mt5linux](https://github.com/tiloye/mt5linux) · [Dockerized-MetaTrader5-with-Python-DataBridge](https://github.com/DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge) · [oandapyV20](https://github.com/hootnot/oanda-api-v20)

#### M04 · US Stocks Feed
- **منابع:** Alpaca (داده و معامله)، yfinance (تاریخی و رایگان) و Polygon (پولی).
- **مراجع:** [alpaca-py](https://github.com/alpacahq/alpaca-py) · [yfinance](https://github.com/ranaroussi/yfinance)

#### M05 · News Ingestor (عمومی، کریپتو و اختصاصی پروژه‌ها)
- **قابلیت‌ها:**
  - RSS و API: CoinDesk، Cointelegraph، Decrypt، The Block، Reuters، Bloomberg (عنوان‌ها)، ForexLive و FXStreet
  - **اخبار اختصاصی هر کوین:** بلاگ رسمی، GitHub releases، اکانت X رسمی، Medium و اطلاعیه‌های لیستینگ و دی‌لیستینگ صرافی‌ها
  - حذف خبر تکراری (Dedup با embedding)، تشخیص زبان، استخراج نمادهای مرتبط (NER)
- **مراجع:** [cryptocurrency.cv (Free Crypto News API)](https://gittrend.io/repo/nirholas/cryptocurrency.cv) · [cryptopanic client](https://github.com/roccomuso/cryptopanic) · `feedparser`
- **خروجی:** `news.raw`

#### M06 · Social & Trends Ingestor
- **منابع:** Reddit (`praw`)، کانال‌های عمومی Telegram (`telethon`)، StockTwits، CoinGecko Trending، Google Trends (`pytrends`) و X (API رسمی پولی است؛ اسکرپ کردن آن ناقض قوانین X است).
- **قابلیت‌ها:** شمارش اشاره‌ها (mention velocity)، تشخیص روایت (narrative) و موج‌های ناگهانی، امتیاز اعتبار منبع (ضدبات).
- **مراجع:** [Vibe-Trading social-media-intelligence skill](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/social-media-intelligence) · [cryptoscrape](https://github.com/joannawan/cryptoscrape)

#### M07 · On-chain & Large Transfers
- **قابلیت‌ها:** تراکنش‌های بزرگ، **ورود و خروج صرافی‌ها** (Exchange Inflow/Outflow)، جریان استیبل‌کوین‌ها، مینت و برن USDT/USDC، برچسب کیف‌پول‌ها.
- **منابع:** Whale Alert API، Etherscan/BscScan/Arbiscan، DefiLlama (رایگان)، Dune API، Arkham/Nansen (پولی).
- **مراجع:** [monitoring-whale-activity skill](https://claudeskills.info/skills/jeremylongshore/claude-code-plugins-plus-skills/monitoring-whale-activity/) · [whale-alert-monitor skill](https://claudeskills.info/skills/aAAaqwq/AGI-Super-Team/whale-alert-monitor/) · [web3.py](https://github.com/ethereum/web3.py)
- **نکته:** ماژول on-chain از قبل در تیک‌الگو وجود دارد؛ آن را **توسعه بدهید**.

#### M08 · Hyperliquid Whale Hunter 🐋
- **هدف:** شکار پوزیشن‌های بزرگ نهنگ‌ها در Hyperliquid. همه‌ی پوزیشن‌ها در Hyperliquid عمومی‌اند.
- **قابلیت‌ها:**
  - Leaderboard: رتبه‌بندی معامله‌گرها بر اساس PnL، ROI و حجم حساب
  - پایش لحظه‌ای کیف‌پول‌های منتخب با `clearinghouseState` و استریم `userFills`
  - هشدار برای پوزیشن جدید بزرگ، افزایش یا کاهش پوزیشن، نزدیک شدن به قیمت لیکوییدیشن و تغییر جهت
  - «امتیاز هوشمندی» هر کیف‌پول از روی سابقه‌ی سود، و **Copy-Signal** (نه Copy-Trade خودکار)
  - نقشه‌ی تجمع لیکوییدیشن‌ها
- **API:** `POST https://api.hyperliquid.xyz/info` (بدون نیاز به احراز هویت) و `wss://api.hyperliquid.xyz/ws`
- **مراجع:** [hyperliquid-python-sdk](https://github.com/hyperliquid-dex/hyperliquid-python-sdk) · [راهنمای Dwellir](https://www.dwellir.com/guides/hyperliquid-whale-tracking) · [راهنمای Chainstack](https://chainstack.com/hyperliquid-on-chain-activity-tracker-build-your-own-telegram-bot/amp/) · [hyperliquid-whales MCP](https://www.getdrio.com/mcp/io-github-br0ski777-hyperliquid-whales)
- **خروجی:** `whale.hl.position` و `whale.hl.fill`

#### M09 · Macro & Economic Calendar
- **قابلیت‌ها:** تقویم اقتصادی (CPI، NFP، FOMC، GDP، PMI و Jobless Claims) با مقدار واقعی، پیش‌بینی و قبلی، و **Surprise Score** (اختلاف واقعی با پیش‌بینی). سری‌های FRED: نرخ بهره، بازده اوراق ۲ و ۱۰ ساله، M2 و تورم.
- **مراجع:** [OpenBB](https://github.com/OpenBB-finance/OpenBB) · [fredapi](https://github.com/mortada/fredapi) · [forex-factory-scarping](https://github.com/tchala120/forex-factory-scarping)
- **خروجی:** `macro.release` و `macro.calendar`

---

### L2 — پلتفرم داده

#### M10 · Data Platform
- **TimescaleDB:** `candles` (hypertable + continuous aggregates برای تایم‌فریم‌های بالاتر)، `trades`، `orderbook_snapshots`، `funding` و `oi`
- **Redis Streams:** Event Bus (همان فاز B)
- **pgvector:** embedding خبرها، ژورنال‌ها و اسکیل‌ها (برای RAG)
- **سیاست نگهداری:** tick به مدت ۷ روز، کندل ۱ دقیقه‌ای ۲ سال، و تایم‌فریم‌های بالاتر برای همیشه
- **Feature Store:** جدول `features(symbol, ts, name, value)` همراه با یک view آماده برای مدل‌ها

---

### L3 — تحلیل (Analytics)

#### M11 · Technical Analysis Engine
- **قابلیت‌ها:** بیش از ۱۵۰ اندیکاتور، الگوهای کندلی، الگوهای نموداری (سر و شانه، مثلث، هارمونیک)، ایچیموکو (✅ در agent-kit ساخته شده)، Volume Profile و VWAP، و تحلیل چند تایم‌فریمی.
- **مراجع:** [TA-Lib](https://github.com/TA-Lib/ta-lib-python) · [pandas-ta](https://github.com/twopirllc/pandas-ta) · [stock-pattern](https://github.com/BennyThadikaran/stock-pattern)

#### M12 · SMC / ICT Engine
- **قابلیت‌ها:** شکست ساختار (BOS)، تغییر کاراکتر (CHoCH)، Order Block، شکاف ارزش منصفانه (FVG)، شکار نقدینگی، Premium/Discount، **Kill Zones** (C5، قبلاً شروع شده) و Session Highs/Lows.
- **مراجع:** [smart-money-concepts](https://github.com/joshyattridge/smart-money-concepts) · [OpenMobius-skill (ICT/SMC)](https://agentskill.work/en/skills/MobiusQuant/OpenMobius-skill) · [Vibe-Trading SMC skill](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/smc/review)

#### M13 · Market Scanner
- **قابلیت‌ها:** اسکن همه‌ی بازارها با فیلترهای ترکیبی؛ آماده‌ها مثل «شکست مقاومت با حجم»، «RSI واگرا» و «نزدیک Order Block»؛ و ساخت اسکنر سفارشی بدون کدنویسی با Rule Builder.
- **خروجی:** `scanner.hit`

#### M14 · Pump/Dump & Momentum Hunter 🚀
- **قابلیت‌ها:**
  - **جهش حجم:** نسبت حجم به میانگین متحرک ≥ ۱.۸ تا ۳ برابر
  - **جهش نوسان:** NATR و گسترش رنج کندل
  - عدم تعادل اوردربوک، Spoofing و دیوارهای بزرگ
  - هم‌زمانی با جهش اشاره در شبکه‌های اجتماعی (M06) و ورود پول به صرافی (M07)
  - امتیاز ریسک پامپ ساختگی (Pump & Dump) برای کوین‌های کم‌نقدشونده
  - **دستیار AI شکار ارزهای پامپی:** رتبه‌بندی لحظه‌ای کاندیداها همراه با توضیح
- **مرجع:** [Pump & Dump Detector (منطق)](https://www.tradingview.com/script/8a3t8MfR-pump-dump-detector-sensitive)

#### M15 · Liquidity & Flow Analyzer
- **قابلیت‌ها:** CVD (Cumulative Volume Delta)، ورود و خروج نقدینگی هر ارز، Heatmap نقدینگی، جریان استیبل‌کوین‌ها و دامیننس.

#### M16 · Market Regime Detector
- **قابلیت‌ها:** تشخیص رژیم با HMM یا تشخیص نقطه‌ی تغییر (Change-point): `trend_up / trend_down / range / high_vol / crash`؛ و انتخاب خودکار استراتژی بر اساس رژیم.
- **مراجع:** [market-regime-detection](https://github.com/Sakeeb91/market-regime-detection) · `hmmlearn` · `ruptures`
- **خروجی:** `regime.update`

#### M17 · Intermarket & Key Indices
- **قابلیت‌ها:** همبستگی پویا و Lead/Lag بین **BTC، طلا، DXY، نفت، NAS100، US10Y و VIX**؛ و شاخص‌های کلیدی کریپتو: دامیننس BTC، Total2 و Total3، USDT.D، Fear & Greed و ETF Flows.
- **خروجی:** «امتیاز باد موافق یا مخالف» (Macro Tailwind) برای هر دارایی.

#### M18 · News Impact & Sentiment Engine 📰
- **قابلیت‌ها:**
  - امتیاز احساسات هر خبر از ‎−۱ تا ‎+۱ با FinBERT (سریع) و LLM (عمیق)
  - طبقه‌بندی نوع رویداد: هک، لیستینگ، ETF، قانون‌گذاری، آپگرید، توکن آنلاک، شراکت یا Macro
  - **مدل اثر خبر:** «رویدادهای مشابه در گذشته چه اثری روی قیمت داشتند؟» با Event Study در بازه‌های ۵ دقیقه، ۱ ساعت و ۲۴ ساعت
  - خلاصه‌ی فارسی و انگلیسی و هشدار برای خبرهای پرتأثیر
- **مراجع:** [FinBERT](https://github.com/ProsusAI/finBERT) · [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) · [stock-sentiment-analysis-finBERT-to-LLM](https://github.com/ifieryarrows/stock-sentiment-analysis-finBERT-to-LLM)
- **خروجی:** `news.scored`

#### M19 · Social Sentiment & Narrative Engine
- **قابلیت‌ها:** شاخص احساسات جمعی، ترندهای نوظهور (مثل AI، RWA و Meme)، چرخش روایت و سیگنال‌های خلاف جمع (Contrarian).

#### M20 · Whale & Smart-Money Analytics
- **قابلیت‌ها:** ترکیب M07 و M08 و ساخت پروفایل نهنگ (سبک معاملاتی، نرخ برد، میانگین نگهداری)، تشخیص انباشت و توزیع (Accumulation/Distribution)، و **شاخص فشار نهنگ‌ها** برای هر نماد.

#### M21 · Macro Analysis
- **قابلیت‌ها:** چرخه‌ی سیاست پولی، منحنی بازده، داشبورد تورم و اشتغال، و اثر هر انتشار داده روی طلا، DXY، BTC و شاخص‌ها.

---

### L4 — مغز هوش مصنوعی (AI Brain)

#### M22 · Signal Fusion Engine
- ترکیب وزن‌دار همه‌ی سیگنال‌ها (TA، SMC، رژیم، اخبار، احساسات، نهنگ‌ها و Macro) در یک **Confidence Score** واحد.
- وزن‌ها بر اساس **رژیم بازار** تنظیم می‌شوند و از روی عملکرد گذشته (ژورنال) کالیبره می‌شوند.
- **خروجی:** `signal.new {symbol, side, entry, sl, tp[], confidence, horizon, reasons[]}`

#### M23 · Multi-Agent Decision Engine (مدیر ارشد تصمیم)
- **الگو:** [TradingAgents](https://github.com/TauricResearch/TradingAgents)، یعنی یک شرکت ترید مجازی:
  - **تحلیلگرها:** تکنیکال، فاندامنتال و Macro، اخبار، احساسات و نهنگ‌ها
  - **مناظره:** یک محقق صعودی (Bull) و یک محقق نزولی (Bear)
  - **تریدر:** تصمیم `BUY / SELL / WAIT` با اندازه‌ی پوزیشن، SL و TP
  - **مدیر ریسک:** حق وتو
- **خروجی:** `decision.new` همراه با «گزارش استدلال» قابل نمایش برای کاربر.
- **مراجع:** [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) · [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot)
- `llm_engine.py` موجود را به این ماژول وصل کنید.

#### M24 · Skills Runtime (سیستم اسکیل) 🧩
- **هدف:** هر سبک معاملاتی یا دانش حرفه‌ای یک **اسکیل** با فرمت `SKILL.md` است. اضافه کردن اسکیل یعنی یاد گرفتن قابلیت جدید.
- **ساختار هر اسکیل:**
  ```
  skills/<name>/
    SKILL.md          # متادیتا: name, description, markets, timeframes, triggers
    rules.yaml        # قوانین ورود/خروج (برای اجرای قطعی)
    scripts/*.py      # محاسبات (اختیاری)
    eval/             # دیتاست و معیارهای ارزیابی
  ```
- **اسکیل‌های اولیه:** ICT/SMC، Wyckoff، Price Action، Ichimoku، Elliott (ساده‌شده)، Turtle/Breakout، Mean Reversion، Funding Arbitrage، News Trading، Gold-DXY و London/NY Session.
- **چرخه‌ی عمر اسکیل:** `draft ← backtested ← paper ← live` با گزارش ارزیابی خودکار.
- **مراجع:** [claude-trading-skills](https://github.com/agiprolabs/claude-trading-skills) · [agent-trading-skills](https://cdn.jsdelivr.net/gh/SKE-Labs/agent-trading-skills@main/README.md) · [Vibe-Trading](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/smc/review) · [OpenMobius-skill](https://agentskill.work/en/skills/MobiusQuant/OpenMobius-skill)

#### M25 · Memory, Journal-Learning & Reflection 🧠
- **الگو:** [FinMem](https://arxiv.org/pdf/2311.13743)، یعنی حافظه‌ی لایه‌ای کوتاه‌مدت، میان‌مدت و بلندمدت، به‌علاوه‌ی **بازتاب** (Reflection).
- **قابلیت‌ها:**
  - بعد از بسته شدن هر معامله یک «درس» استخراج می‌شود: چه چیزی درست بود، چه چیزی غلط، و در کدام رژیم
  - درس‌ها در pgvector ذخیره می‌شوند و هنگام تصمیم‌گیری مشابه بازیابی می‌شوند (RAG)
  - کالیبراسیون دوره‌ای وزن‌های M22 از روی نتایج
  - یادگیری از «تجربیات شرکت‌های حرفه‌ای» با اسکیل‌های دانش (کتاب‌ها، گزارش‌ها و Playbookها)
- **مرجع:** [TradingGroup (Self-Reflection)](https://arxiv.org/html/2508.17565v1)

#### M26 · Offline AI & Model Registry
- **قابلیت‌ها:**
  - اجرای LLM محلی (Ollama یا vLLM) تا تصمیم‌گیری **بدون اینترنت و بدون هزینه‌ی API** هم ممکن باشد
  - **Model Router:** وظایف سبک به مدل محلی و تحلیل عمیق به Claude یا OpenRouter فرستاده می‌شود
  - **Model Registry (MLflow):** هر مدل جدید (LLM، LightGBM یا RL) ثبت، مقایسه و بعد ارتقا داده می‌شود
  - Fine-tune دوره‌ای (LoRA) روی ژورنال‌ها و تصمیم‌ها، اختیاری
  - RL برای اندازه‌ی پوزیشن و خروج: [FinRL](https://github.com/AI4Finance-Foundation/FinRL)
- **مراجع:** [Ollama](https://github.com/ollama/ollama) · [vLLM](https://github.com/vllm-project/vllm) · [MLflow](https://github.com/mlflow/mlflow) · [qlib](https://github.com/microsoft/qlib)

#### M27 · AI Assistants (دستیارها)
| دستیار | کار |
|---|---|
| 🚀 Pump Hunter | رتبه‌بندی لحظه‌ای ارزهای در آستانه‌ی جهش، بر اساس M14 |
| 📡 Signal Assistant | صدور سیگنال با توضیح، Confidence و سطح ریسک، بر اساس M22 و M23 |
| 🤖 Trader & Position Manager | مدیریت پوزیشن‌ها: Trailing، خروج پله‌ای و هشدار ریسک؛ همان **exit_advisor** موجود |
| 🎙 Voice Tutor | آموزش صوتی فارسی و انگلیسی کار با پلتفرم (M40) |
| 💬 Chat Analyst | پرسش و پاسخ آزاد درباره‌ی بازار، پرتفوی و ژورنال (RAG) |

---

### L5 — اجرا (Execution)

#### M28 · Connectors Hub (همان فاز G)
- **کریپتو:** CCXT (Binance، Bybit، OKX، KuCoin و Gate)، Hyperliquid SDK (امضای EIP-712) و Toobit (`agent-kit`)
- **فارکس و فلزات:** **MetaTrader 5** از طریق Bridge لینوکسی (Wine + RPyC) یا REST، و OANDA
- **سهام آمریکا:** Alpaca و Interactive Brokers (`ib_async`)
- **رابط واحد:** `place_order / cancel / positions / balances / stream_fills`
- **مراجع:** [mt5linux](https://github.com/tiloye/mt5linux) · [MT5 Docker DataBridge](https://github.com/DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge) · [Metatrader5-Docker](https://github.com/django-trader/Metatrader5-Docker) · [nautilus_trader adapters](https://github.com/nautechsystems/nautilus_trader)

#### M29 · OMS (Order Management)
- سفارش‌های Market، Limit، Stop، OCO، Bracket و TWAP؛ idempotency؛ تطبیق وضعیت (reconciliation) با صرافی؛ و صف سفارش.

#### M30 · Risk Engine (حق وتو) 🛡
- سقف ریسک هر معامله (مثلاً ۱٪)، سقف ضرر روزانه و هفتگی، سقف اهرم، سقف همبستگی پرتفوی، سقف تعداد پوزیشن‌ها و **Kill Switch**.
- بلاک خودکار نزدیک خبرهای پرتأثیر (از M09).
- **هیچ** مسیری برای دور زدن Risk Engine وجود ندارد.

#### M31 · Capital & Portfolio Manager (همان فاز E)
- چندحسابی و چندبروکری؛ تخصیص سرمایه به استراتژی‌ها؛ اندازه‌ی پوزیشن (Kelly کسری، Volatility Targeting)؛ بازتوازن؛ و نمای یکپارچه‌ی دارایی کل.

#### M32 · Bots Manager
- ربات‌های داخلی (Grid، DCA، Trend، Breakout و ربات‌های مبتنی بر اسکیل)
- **ربات‌های متاتریدر (EA):** آپلود، اجرا و پایش EAها و **پایش اسپرد**
- Marketplace داخلی ربات و استراتژی (بعداً)
- **مراجع:** [freqtrade](https://github.com/freqtrade/freqtrade) (الگوی استراتژی) · [hummingbot](https://github.com/hummingbot/hummingbot) (بازارسازی) · [EA31337](https://github.com/EA31337/EA31337)

---

### L6 — آزمایشگاه (Research Lab)

#### M33 · Backtest Lab 🧪
- بک‌تست سریع برداری (vectorbt) و دقیق رویدادمحور (Nautilus) با کارمزد و لغزش قیمت واقعی.
- Walk-forward، Monte Carlo و گزارش کامل: Sharpe، Sortino، MaxDD، Win Rate، Expectancy و نمودار Equity.
- **مراجع:** [vectorbt](https://github.com/polakowo/vectorbt) · [nautilus_trader](https://github.com/nautechsystems/nautilus_trader) · [backtesting.py](https://github.com/kernc/backtesting.py)

#### M34 · Strategy & Indicator SDK
- افزودن استراتژی یا اندیکاتور با پایتون (Plugin)، با **Pine-like DSL** ساده، یا با **No-code Rule Builder**.
- هر پلاگین تست واحد و متادیتا دارد.

#### M35 · Optimizer & Module Test Harness
- بهینه‌سازی پارامترها با Optuna (با محافظت در برابر Overfitting از طریق Walk-forward)
- **تست ماژول:** اجرای هر ماژول روی داده‌ی ضبط‌شده (Replay) و مقایسه با خروجی مرجع
- **Paper Trading:** شبیه‌ساز زنده با همان OMS

---

### L7 — محصول (Product)

#### M36 · Advanced Chart
- KLineChart یا Lightweight Charts؛ همه‌ی تایم‌فریم‌ها؛ ابزار ترسیم (خط روند، فیبوناچی، کانال و مستطیل)؛ اندیکاتورهای قابل افزودن.
- **لایه‌های هوشمند روی نمودار:** نقاط ورود و خروج AI، Order Block و FVG، خبرها، پوزیشن‌های نهنگ‌ها و خطوط لیکوییدیشن.
- **مراجع:** [KLineChart](https://github.com/klinecharts/KLineChart) · [lightweight-charts](https://github.com/tradingview/lightweight-charts)

#### M37 · Live Search & Pro Watchlists
- جست‌وجوی زنده‌ی نمادها در همه‌ی بازارها (Command Palette ⌘K)؛ واچ‌لیست چندگانه با ستون‌های قابل تنظیم، Sparkline و هشدار قیمت.

#### M38 · Trading Journal & Reports
- ثبت خودکار همه‌ی معاملات همراه با اسکرین‌شات نمودار و دلیل ورود؛ برچسب احساسی؛ و **تحلیل اثر ژورنال** («کدام اشتباهت بیشتر تکرار می‌شود؟»).
- **گزارش‌های مدیریتی:** روزانه، هفتگی و ماهانه، به تفکیک استراتژی، بازار و ساعت. ماژول reports موجود را توسعه دهید.

#### M39 · Notifications & Social Alerts
- Web Push، اعلان موبایل (FCM و APNs)، ایمیل، **تلگرام**، دیسکورد و X.
- قوانین هشدار قابل تنظیم و جلوگیری از اسپم (Rate limit و Digest). ماژول notifications موجود را توسعه دهید.

#### M40 · Voice Assistant 🎙
- **پشته:** Pipecat یا LiveKit Agents، با STT از Whisper یا Deepgram، یک LLM و TTS.
- **فارسی:** Whisper فارسی را پشتیبانی می‌کند. برای TTS فارسی گزینه‌ها را تست کنید: ElevenLabs، Azure و مدل‌های متن‌باز.
- **کاربرد:** آموزش تعاملی («این دکمه چه می‌کند؟»)، تور صوتی و خواندن خلاصه‌ی بازار.
- **مراجع:** [pipecat](https://github.com/pipecat-ai/pipecat) · [livekit/agents](https://github.com/livekit/agents) · [faster-whisper](https://github.com/SYSTRAN/faster-whisper)

#### M41 · Community Chat
- کانال‌های گفت‌وگوی کاربران (عمومی، هر بازار و VIP) با WebSocket، مدیریت محتوا، گزارش تخلف و اشتراک‌گذاری تحلیل روی نمودار.
- **گزینه‌ها:** ساخت داخلی با FastAPI WS + Redis، یا [Centrifugo](https://github.com/centrifugal/centrifugo).

#### M42 · Users, RBAC & Admin Dashboard
- نقش‌ها: `owner / admin / support / analyst / user / guest`؛ مجوزهای دقیق؛ لاگ ممیزی؛ مدیریت کاربران، پلن‌ها و پرداخت‌ها؛ وضعیت سیستم و Feature Flagها.

#### M43 · Plans & Crypto Payments
- پلن‌های Free، Pro و VIP با محدودیت‌های دقیق (تعداد ربات، سیگنال و دستیار). ماژول billing موجود را توسعه دهید.
- **درگاه کریپتو:** [BTCPay Server](https://github.com/btcpayserver/btcpayserver) (خودمیزبان و non-custodial، برای BTC و Lightning)، یا [XPayLabs](https://awesome.ecosyste.ms/projects/github.com%2Fyan253319066%2FXPayLabs-docker) (USDT/USDC چندزنجیره‌ای و خودمیزبان)، یا NOWPayments (سرویس ابری).

#### M44 · Web, Mobile & Landing
- **Landing عمومی:** معرفی، قیمت‌گذاری، FAQ، وبلاگ و ثبت‌نام و ورود (ایمیل، Google، 2FA و Passkey).
- **وب ریسپانسیو** و **اپ موبایل** (Expo): نوار پایین ثابت با تب‌های Home، Markets، AI، Bots و Portfolio؛ طبق پرامپت UI/UX قبلی.
- فارسی و انگلیسی، RTL کامل، و تم تیره و روشن.

#### M45 · Pro Settings
- تنظیمات حرفه‌ای همه‌ی ماژول‌ها (ماژول settings موجود)، Import/Export پروفایل تنظیمات، و «حالت مبتدی و حرفه‌ای».

---

<a id="5"></a>
## 5. نقشه‌ی راه فازبندی‌شده

| فاز | عنوان | ماژول‌ها | معیار اتمام |
|---|---|---|---|
| **0** | ممیزی و امنیت | — | Gap Matrix، سرور سخت‌شده، بکاپ، CI سبز |
| **1** | زیرساخت داده | M01، M02، M10 (Redis Streams یعنی فاز B) | داده‌ی زنده بدون stale؛ `runtime_stale` حل شده |
| **2** | اجرا و ریسک | M28 (فاز G)، M29، M30، M31 (فاز E) | Paper trading کامل روی ۲ صرافی و MT5 |
| **3** | تحلیل پایه | M11، M12، M13، M14، M15، M16 | اسکنر و پامپ‌یاب زنده |
| **4** | داده‌های جایگزین | M05، M06، M07، M08، M09 | نهنگ‌یاب هایپرلیکویید و اخبار امتیازدار |
| **5** | تحلیل پیشرفته | M17، M18، M19، M20، M21 | Event Study اخبار و شاخص فشار نهنگ |
| **6** | مغز AI | M22، M23، M24، M25، M26، M27 | تصمیم توضیح‌پذیر و یادگیری از ژورنال |
| **7** | آزمایشگاه | M33، M34، M35 | بک‌تست، بهینه‌سازی و چرخه‌ی عمر اسکیل |
| **8** | محصول | M36 تا M45 | اپ موبایل، صدا، چت و پرداخت |
| **9** | بازارهای بیشتر | M03، M04 کامل، M32 (EAها) | فارکس، فلزات و سهام آمریکا در حالت live |

> 🔁 در هر فاز همیشه اول **advisory**، بعد **paper** و فقط بعد از چند هفته عملکرد پایدار، **auto با سقف کم**.

---

<a id="6"></a>
## 6. پرامپت‌های اجرایی Claude Code

> این پرامپت‌ها را **به ترتیب** در Claude Code (روی سرور و داخل پوشه‌ی پروژه) بدهید. پرامپت‌ها انگلیسی‌اند، چون دقت اجرایی بیشتری دارند.

### 6.0 · Master Context (یک بار، اول هر جلسه)
```text
You are the lead engineer of TikAlgo (tikalgoai.com), an AI trading platform for crypto,
forex, US stocks and metals. Read docs/TIKALGO_MASTER_PLAN.md fully — it is the source of
truth for architecture, module IDs (M01–M45), phases and principles (P1–P7).
Rules: never bypass the Risk Engine; every new module ships behind a feature flag (default
OFF); write tests first; keep changes minimal and incremental; never store exchange keys
with withdraw permission; never commit secrets. Before coding, restate the module scope,
list files you will touch, and wait for my confirmation on anything destructive
(DB drops, deploys to production, enabling RUNTIME_ENABLED or live trading).
```

### 6.1 · Phase 0 — Audit & Gap Matrix
```text
Audit the entire TikAlgo codebase against docs/TIKALGO_MASTER_PLAN.md.
Produce docs/GAP_MATRIX.md with one row per module M01–M45: status (✅ done / 🟡 partial /
❌ missing), existing file paths, test coverage, known bugs, and the smallest next step.
Also list: existing modules not in the plan (e.g. exit_advisor, kill zones, billing,
settings), tech-debt hot spots, and the current docker-compose topology.
Then run the full test suite and report results. Do not change code in this step.
```

### 6.2 · Phase 0 — Security Hardening
```text
Perform a security review of the server and codebase (see plan §8). Check: SSH config
(no root login, key-only), firewall (ufw) and Cloudflare-only origin access, fail2ban,
crontab and systemd units for unknown entries, open ports, docker socket exposure,
secrets in git history (gitleaks), dependency CVEs (pip-audit, npm audit), API-key
encryption at rest, JWT/session settings, rate limiting, CORS, and admin route protection.
Output docs/SECURITY_REPORT.md with severity-ranked findings and proposed fixes; apply only
low-risk fixes after my approval.
```

### 6.3 · Phase 1 — Event Bus & Market Data Hub (M10, M01, M02)
```text
Implement the Event Bus on Redis Streams (topics per plan §2) with a typed publish/subscribe
helper, consumer groups, retries and dead-letter stream. Then refactor market data ingestion
(M01) to publish md.tick/md.candle/md.orderbook via ccxt.pro websockets for Binance, Bybit,
OKX and Hyperliquid, with automatic reconnect, gap detection/backfill and a staleness
watchdog that raises an alert if any feed is stale > 60s (this must fix runtime_stale).
Add M02 derivatives metrics: OI, funding, long/short ratio, and Binance forceOrder
liquidation stream. Store in TimescaleDB hypertables with continuous aggregates.
Tests: unit + an integration test with recorded websocket fixtures.
```

### 6.4 · Phase 2 — Connectors, OMS, Risk, Capital (M28–M31)
```text
Create a unified BrokerAdapter interface (place_order, cancel, get_positions, get_balances,
stream_fills) and implement adapters: ccxt (Binance/Bybit/OKX), Hyperliquid
(hyperliquid-python-sdk, EIP-712), Toobit (via agent-kit tools), MetaTrader 5 (via
mt5linux/RPyC bridge in a Docker Wine container), and a PaperAdapter that simulates fills
with fees and slippage. Build the OMS (idempotent client order IDs, OCO/bracket,
reconciliation loop) and the Risk Engine as a mandatory pre-trade gate (per-trade risk,
daily/weekly loss limits, leverage cap, exposure/correlation cap, news blackout from
macro calendar, global kill switch). Implement Capital & Portfolio Manager (multi-account,
strategy allocation, fractional-Kelly / vol-target sizing). Default mode: paper.
```

### 6.5 · Phase 3 — Analytics Core (M11–M16)
```text
Build the analytics layer as independent workers subscribing to md.candle.*:
M11 TA engine (TA-Lib + pandas-ta, multi-timeframe, chart patterns),
M12 SMC/ICT engine (smartmoneyconcepts lib: BOS, CHoCH, OB, FVG, liquidity; finish Kill
Zones C5), M13 scanner with a JSON rule builder, M14 pump/dump hunter (volume ratio vs MA,
NATR spike, orderbook imbalance, social/inflow confluence, low-liquidity risk score),
M15 CVD and liquidity flows, M16 regime detector (GaussianHMM on returns/vol + ruptures
change-points) publishing regime.update. Every output carries a human-readable "why".
```

### 6.6 · Phase 4 — Alternative Data (M05–M09)
```text
Implement ingestors:
M05 news (RSS/APIs + per-coin official sources, embedding dedup, symbol NER) → news.raw;
M06 social (Reddit praw, Telegram telethon public channels, StockTwits, CoinGecko trending,
Google Trends; mention velocity; bot filtering) → social.trend;
M07 on-chain large transfers & exchange in/outflows (Whale Alert API, Etherscan family,
DefiLlama stablecoins) — extend the existing on-chain module;
M08 Hyperliquid Whale Hunter: leaderboard ranking, watched-wallet tracking via
clearinghouseState + userFills websocket, alerts on new large positions, size changes,
flips and liquidation proximity, wallet "smart score" from history → whale.hl.*;
M09 economic calendar + FRED series with surprise score → macro.release.
Respect each source's ToS and rate limits; make every source pluggable and toggleable.
```

### 6.7 · Phase 5 — Advanced Analytics (M17–M21)
```text
M17 intermarket: rolling correlation and lead/lag among BTC, XAUUSD, DXY, USOIL, NAS100,
US10Y, VIX + crypto indices (BTC.D, TOTAL2/3, USDT.D, Fear&Greed, ETF flows) → macro
tailwind score per asset. M18 news impact: FinBERT fast score + LLM deep classification
(event type, affected symbols), event-study of historical similar events (5m/1h/24h),
FA/EN summaries → news.scored. M19 social narrative engine. M20 whale/smart-money pressure
index combining M07+M08. M21 macro dashboard data APIs.
```

### 6.8 · Phase 6 — AI Brain (M22–M27)
```text
M22 Signal Fusion: regime-aware weighted fusion of all signal sources into a calibrated
confidence (isotonic calibration on journal outcomes). M23 Multi-Agent Decision Engine
following the TradingAgents pattern (analyst agents → bull/bear debate → trader →
risk manager veto), wired to the existing llm_engine.py, outputting decision.new with a
reasoning report. M24 Skills Runtime: load skills/<name>/SKILL.md + rules.yaml, sandboxed
execution, lifecycle draft→backtested→paper→live with auto-eval. Seed skills: ICT/SMC,
Wyckoff, Ichimoku, Breakout, Mean-Reversion, News-Trading, Gold-DXY. M25 Memory & Reflection
(FinMem-style layered memory in pgvector; post-trade lesson extraction; retrieval at
decision time). M26 Model Router (local Ollama/vLLM vs cloud Claude/OpenRouter) + MLflow
registry for model promotion. M27 assistants (Pump Hunter, Signal, Position Manager
extending exit_advisor, Chat Analyst).
```

### 6.9 · Phase 7 — Research Lab (M33–M35)
```text
Build the Backtest Lab: vectorbt for fast sweeps, NautilusTrader for event-driven
validation with realistic fees/slippage; walk-forward and Monte Carlo; full metrics report.
Strategy & Indicator SDK (Python plugins + simple rule DSL + no-code builder schema).
Optuna optimizer with walk-forward guard. Module test harness with market replay.
Paper trading uses the same OMS/Risk path as live.
```

### 6.10 · Phase 8 — Product (M36–M45)
```text
Frontend (Next.js + Tailwind + shadcn/ui, FA/EN with full RTL, dark/light): advanced chart
(KLineChart with drawing tools, AI overlays: entries/exits, OB/FVG, news markers, whale
positions, liquidation levels), ⌘K live symbol search, pro watchlists, journal & reports,
notifications center (web push, FCM, Telegram/Discord), voice tutor (Pipecat + Whisper +
TTS, Persian supported), community chat (WebSocket channels with moderation), admin
dashboard with RBAC and audit log, plans + crypto payments (BTCPay Server / XPayLabs),
public landing + auth (2FA, passkeys). Mobile: Expo app sharing the API, persistent bottom
tab bar (Home, Markets, AI, Bots, Portfolio). Follow the TikAlgo UI/UX prompt.
```

---

<a id="7"></a>
## 7. فهرست پروژه‌ها و اسکیل‌های گیت‌هاب و دستور نصب

> ✅ پروژه‌ی جاافتاده · 🔍 پروژه‌ی کوچک‌تر یا تازه؛ قبل از استفاده کدش را بررسی کنید.
> **قانون طلایی:** قبل از کپی کردن کد، **لایسنس** را چک کنید. MIT و Apache-2.0 آزادند. AGPL و GPL در محصول تجاری الزام انتشار کد دارند.

### 7.1 اتصال و داده‌ی بازار
| پروژه | نصب | |
|---|---|---|
| [ccxt](https://github.com/ccxt/ccxt) | `pip install ccxt` | ✅ |
| [hyperliquid-python-sdk](https://github.com/hyperliquid-dex/hyperliquid-python-sdk) | `pip install hyperliquid-python-sdk` | ✅ |
| [agent-kit (Toobit MCP)](https://github.com/cryptojs7-eng/agent-kit) | `npm i -g toobit-trade-mcp toobit-trade-cli` | ✅ |
| [MetaTrader5 (رسمی، ویندوز)](https://pypi.org/project/MetaTrader5/) | `pip install MetaTrader5` | ✅ |
| [mt5linux](https://github.com/tiloye/mt5linux) | `pip install mt5linux` | 🔍 |
| [Dockerized MT5 DataBridge](https://github.com/DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge) | `git clone` و بعد `docker compose up -d` | 🔍 |
| [Metatrader5-Docker](https://github.com/django-trader/Metatrader5-Docker) | `git clone` و بعد Docker | 🔍 |
| [oandapyV20](https://github.com/hootnot/oanda-api-v20) | `pip install oandapyV20` | ✅ |
| [alpaca-py](https://github.com/alpacahq/alpaca-py) | `pip install alpaca-py` | ✅ |
| [ib_async](https://github.com/ib-api-reloaded/ib_async) | `pip install ib_async` | ✅ |
| [yfinance](https://github.com/ranaroussi/yfinance) | `pip install yfinance` | ✅ |

### 7.2 تحلیل تکنیکال، SMC و رژیم
| پروژه | نصب | |
|---|---|---|
| [TA-Lib](https://github.com/TA-Lib/ta-lib-python) | `pip install TA-Lib` (در صورت نیاز کتابخانه‌ی C را جدا نصب کنید) | ✅ |
| [pandas-ta](https://github.com/twopirllc/pandas-ta) | `pip install pandas-ta` | ✅ |
| [smart-money-concepts](https://github.com/joshyattridge/smart-money-concepts) | `pip install smartmoneyconcepts` | ✅ |
| [stock-pattern](https://github.com/BennyThadikaran/stock-pattern) | `git clone` و بعد `pip install -r requirements.txt` | 🔍 |
| [market-regime-detection](https://github.com/Sakeeb91/market-regime-detection) | مرجع کد؛ `pip install hmmlearn ruptures` | 🔍 |

### 7.3 اخبار، احساسات، اجتماعی، آن‌چین و نهنگ‌ها
| پروژه | نصب | |
|---|---|---|
| [FinBERT](https://github.com/ProsusAI/finBERT) | `pip install transformers torch` و مدل `ProsusAI/finbert` | ✅ |
| [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | `git clone` | ✅ |
| [stock-sentiment-analysis-finBERT-to-LLM](https://github.com/ifieryarrows/stock-sentiment-analysis-finBERT-to-LLM) | مرجع معماری | 🔍 |
| [cryptocurrency.cv (Free Crypto News API)](https://gittrend.io/repo/nirholas/cryptocurrency.cv) | API بدون کلید و MCP | 🔍 |
| [cryptopanic client](https://github.com/roccomuso/cryptopanic) | `npm i cryptopanic` | 🔍 |
| feedparser · praw · telethon · pytrends | `pip install feedparser praw telethon pytrends` | ✅ |
| [web3.py](https://github.com/ethereum/web3.py) | `pip install web3` | ✅ |
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | `pip install openbb` | ✅ |
| [fredapi](https://github.com/mortada/fredapi) | `pip install fredapi` | ✅ |
| [forex-factory-scarping](https://github.com/tchala120/forex-factory-scarping) | مرجع اسکرپر تقویم | 🔍 |
| [Hyperliquid whale guide (Dwellir)](https://www.dwellir.com/guides/hyperliquid-whale-tracking) | راهنمای کد پایتون | 🔍 |

### 7.4 هوش مصنوعی، ایجنت‌ها و یادگیری
| پروژه | نصب | |
|---|---|---|
| [TradingAgents](https://github.com/TauricResearch/TradingAgents) | `git clone` و بعد `pip install -r requirements.txt` | ✅ |
| [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | `git clone` و بعد `poetry install` | ✅ |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | `git clone` | ✅ |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | `pip install finrl` | ✅ |
| [qlib](https://github.com/microsoft/qlib) | `pip install pyqlib` | ✅ |
| [FinMem (مقاله)](https://arxiv.org/pdf/2311.13743) | الگوی حافظه‌ی لایه‌ای | ✅ |
| [Ollama](https://github.com/ollama/ollama) | `curl -fsSL https://ollama.com/install.sh \| sh` | ✅ |
| [vLLM](https://github.com/vllm-project/vllm) | `pip install vllm` (GPU لازم دارد) | ✅ |
| [MLflow](https://github.com/mlflow/mlflow) | `pip install mlflow` | ✅ |
| [pgvector](https://github.com/pgvector/pgvector) | افزونه‌ی Postgres؛ `pip install pgvector` | ✅ |

### 7.5 اجرا، بک‌تست و بهینه‌سازی
| پروژه | نصب | |
|---|---|---|
| [nautilus_trader](https://github.com/nautechsystems/nautilus_trader) | `pip install nautilus_trader` | ✅ |
| [vectorbt](https://github.com/polakowo/vectorbt) | `pip install vectorbt` | ✅ |
| [backtesting.py](https://github.com/kernc/backtesting.py) | `pip install backtesting` | ✅ |
| [Optuna](https://github.com/optuna/optuna) | `pip install optuna` | ✅ |
| [freqtrade](https://github.com/freqtrade/freqtrade) | Docker (`freqtradeorg/freqtrade`)؛ مرجع الگوی استراتژی | ✅ |
| [hummingbot](https://github.com/hummingbot/hummingbot) | Docker؛ مرجع بازارسازی | ✅ |
| [EA31337](https://github.com/EA31337/EA31337) | EA متن‌باز MT4/MT5 | ✅ |

### 7.6 محصول و رابط کاربری
| پروژه | نصب | |
|---|---|---|
| [KLineChart](https://github.com/klinecharts/KLineChart) | `npm i klinecharts` | ✅ |
| [lightweight-charts](https://github.com/tradingview/lightweight-charts) | `npm i lightweight-charts` | ✅ |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | `npx shadcn@latest init` | ✅ |
| [Expo](https://github.com/expo/expo) | `npx create-expo-app` | ✅ |
| [pipecat](https://github.com/pipecat-ai/pipecat) | `pip install pipecat-ai` | ✅ |
| [livekit/agents](https://github.com/livekit/agents) | `pip install livekit-agents` | ✅ |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | `pip install faster-whisper` | ✅ |
| [Centrifugo](https://github.com/centrifugal/centrifugo) | Docker | ✅ |
| [BTCPay Server](https://github.com/btcpayserver/btcpayserver) | [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) | ✅ |
| [XPayLabs](https://awesome.ecosyste.ms/projects/github.com%2Fyan253319066%2FXPayLabs-docker) | Docker Compose (USDT/USDC) | 🔍 |

### 7.7 اسکیل‌های Claude و ایجنت‌ها
| مجموعه | محتوا | |
|---|---|---|
| [claude-trading-skills](https://github.com/agiprolabs/claude-trading-skills) | ۶۷ اسکیل: TA، احساسات، بک‌تست، ریسک و DeFi | 🔍 |
| [agent-trading-skills](https://cdn.jsdelivr.net/gh/SKE-Labs/agent-trading-skills@main/README.md) | ۵۶ اسکیل ترید | 🔍 |
| [Vibe-Trading](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/smc/review) | SMC و Social Media Intelligence | 🔍 |
| [OpenMobius-skill](https://agentskill.work/en/skills/MobiusQuant/OpenMobius-skill) | ICT/SMC با ۹۶۴ کارت دانش | 🔍 |
| [monitoring-whale-activity](https://claudeskills.info/skills/jeremylongshore/claude-code-plugins-plus-skills/monitoring-whale-activity/) | پایش نهنگ‌ها و جریان صرافی‌ها | 🔍 |
| [whale-alert-monitor](https://claudeskills.info/skills/aAAaqwq/AGI-Super-Team/whale-alert-monitor/) | هشدار نهنگ (MIT) | 🔍 |
| [kukapay/crypto-skills](https://claudemarketplaces.com/skills/kukapay/crypto-skills/trading-strategist) | استراتژیست ترید | 🔍 |

**نصب اسکیل در Claude Code (روش عمومی):**
```bash
# داخل مخزن تیک‌الگو
git clone --depth 1 https://github.com/agiprolabs/claude-trading-skills /tmp/cts
mkdir -p .claude/skills
cp -r /tmp/cts/skills/<skill-name> .claude/skills/      # فقط اسکیل‌های لازم؛ اول SKILL.md را بخوانید
# اسکیل‌های «دانش ترید» داخل خود محصول (M24) در skills/ نگه داری می‌شوند، نه در .claude/skills
```
> ⚠️ اسکیل‌ها می‌توانند اسکریپت اجرا کنند. قبل از نصب هر اسکیل، `SKILL.md` و `scripts/` آن را بخوانید. بعد از حادثه‌ی امنیتی سرور، این کار اهمیت دوچندان دارد.

### 7.8 نمونه‌ی `docker-compose` هدف (اسکلت)
```yaml
services:
  postgres:   { image: timescale/timescaledb-ha:pg16, volumes: [pgdata:/home/postgres/pgdata] }
  redis:      { image: redis:7-alpine, command: ["redis-server","--appendonly","yes"] }
  api:        { build: ./backend, depends_on: [postgres, redis] }
  worker-md:  { build: ./backend, command: python -m tikalgo.ingest.market }
  worker-alt: { build: ./backend, command: python -m tikalgo.ingest.alt }      # news/social/onchain/whales
  worker-ana: { build: ./backend, command: python -m tikalgo.analytics.run }
  worker-ai:  { build: ./backend, command: python -m tikalgo.brain.run }
  oms:        { build: ./backend, command: python -m tikalgo.execution.oms }
  mt5-bridge: { build: ./infra/mt5, profiles: ["forex"] }
  ollama:     { image: ollama/ollama, profiles: ["offline-ai"] }
  web:        { build: ./frontend }
  nginx:      { image: nginx:alpine, ports: ["443:443"] }
  prometheus: { image: prom/prometheus, profiles: ["ops"] }
  grafana:    { image: grafana/grafana, profiles: ["ops"] }
volumes: { pgdata: {} }
```

---

<a id="8"></a>
## 8. امنیت

| حوزه | اقدام |
|---|---|
| سرور | SSH فقط با کلید؛ `PermitRootLogin no`؛ ufw؛ fail2ban؛ دسترسی به origin فقط از Cloudflare؛ آپدیت خودکار امنیتی؛ ممیزی دوره‌ای crontab و systemd |
| رمزها و کلیدها | `.env` خارج از گیت؛ SOPS یا Vault؛ چرخش دوره‌ای کلیدها؛ اسکن gitleaks در CI |
| کلید API کاربران | رمزنگاری AES-GCM با کلید جداگانه (KMS)؛ **فقط مجوز Trade، هرگز Withdraw**؛ IP Whitelist در صرافی |
| وب | JWT کوتاه‌عمر + Refresh؛ 2FA و Passkey؛ CSRF؛ CORS محدود؛ Rate limit؛ هدرهای امنیتی (CSP) |
| داده | بکاپ رمزنگاری‌شده‌ی روزانه در جای دیگر؛ تست بازیابی ماهانه |
| زنجیره‌ی تأمین | `pip-audit` و `npm audit`؛ قفل کردن نسخه‌ها؛ بررسی کد قبل از نصب پروژه‌ها و اسکیل‌های بیرونی |
| معاملات | Risk Engine اجباری؛ Kill Switch؛ سقف‌های سخت؛ لاگ ممیزی تغییرناپذیر برای همه‌ی سفارش‌ها |
| مشاهده‌پذیری | هشدار برای ورود مشکوک، خطای سفارش، stale شدن داده و افت ناگهانی Equity |

---

<a id="9"></a>
## 9. ریسک‌ها، محدودیت‌ها و نکات حقوقی

1. **هیچ سیستمی سود تضمینی ندارد.** نتایج بک‌تست با معامله‌ی واقعی فاصله‌ی زیادی دارد: کارمزد، لغزش قیمت، تغییر رژیم و Overfitting. شروع با paper اجباری است.
2. **«تمام اتوماتیک» برای کاربران مبتدی خطرناک است.** پیش‌فرض باید advisory باشد و حالت auto فقط با تأیید صریح، آزمون ریسک و سقف کم فعال شود.
3. **مجوزها:** ارائه‌ی سیگنال، مدیریت سرمایه‌ی دیگران و Copy-Trade در بسیاری از کشورها مجوز لازم دارد. با مشاور حقوقی مشورت کنید و Disclaimer «مشاوره‌ی مالی نیست» را همه‌جا نمایش دهید.
4. **قوانین منابع داده:** اسکرپ کردن X و برخی سایت‌ها ناقض قوانین آن‌هاست. از API رسمی یا منابع مجاز استفاده کنید.
5. **لایسنس کدها:** کد AGPL و GPL در محصول تجاری بسته الزام انتشار کد دارد. MIT و Apache-2.0 را ترجیح دهید.
6. **هزینه‌ها:** APIهای پولی (Whale Alert، Nansen، Glassnode، Coinglass، LunarCrush و X)، GPU برای LLM آفلاین و سرورهای MT5 را در بودجه ببینید.
7. **تحریم‌ها:** برخی صرافی‌ها، بروکرها و سرویس‌ها کاربران بعضی کشورها را محدود می‌کنند. در انتخاب کانکتورها و درگاه‌ها این را در نظر بگیرید.

---

### منابع جست‌وجو (اکتبر ۲۰۲۶)
- Hyperliquid whales: [Dwellir](https://www.dwellir.com/guides/hyperliquid-whale-tracking) · [Chainstack](https://chainstack.com/hyperliquid-on-chain-activity-tracker-build-your-own-telegram-bot/amp/) · [Apify tracker](https://apify.com/gochujang/hyperliquid-whale-tracker) · [hyperliquid-whales MCP](https://www.getdrio.com/mcp/io-github-br0ski777-hyperliquid-whales) · [Hyperliquid API guide](https://onekey.so/blog/ecosystem/hyperliquid-api-getting-started-2026/)
- Whale/on-chain skills: [monitoring-whale-activity](https://claudeskills.info/skills/jeremylongshore/claude-code-plugins-plus-skills/monitoring-whale-activity/) · [whale-alert-monitor](https://claudeskills.info/skills/aAAaqwq/AGI-Super-Team/whale-alert-monitor/)
- Social: [Vibe-Trading social-media-intelligence](https://tessl.io/registry/skills/github/HKUDS/Vibe-Trading/social-media-intelligence) · [cryptoscrape](https://github.com/joannawan/cryptoscrape) · [social-sentiment-tracker](https://www.skillsdirectory.com/skills/nirholas-social-sentiment-tracker)
- Regime: [market-regime-detection](https://github.com/Sakeeb91/market-regime-detection) · [QuantInsti HMM](https://blog.quantinsti.com/regime-adaptive-trading-python/)
- Pump/Dump: [TradingView Pump & Dump Detector](https://www.tradingview.com/script/8a3t8MfR-pump-dump-detector-sensitive)
- Payments: [BTCPay docs](https://docs.btcpayserver.org/Guide/) · [XPayLabs](https://awesome.ecosyste.ms/projects/github.com%2Fyan253319066%2FXPayLabs-docker)
- MT5 on Linux: [mt5linux](https://github.com/tiloye/mt5linux) · [MT5 DataBridge](https://github.com/DeadSecure/Dockerized-MetaTrader5-with-Python-DataBridge) · [Metatrader5-Docker](https://github.com/django-trader/Metatrader5-Docker)
- Charts: [KLineChart](https://docsearch.algolia.com/mcp/docs/repo/klinecharts/klinechart) · [TradingView free libraries](https://www.tradingview.com/free-charting-libraries/)
- Memory/Reflection: [FinMem](https://arxiv.org/pdf/2311.13743) · [LLM trading agents survey](https://arxiv.org/pdf/2408.06361) · [TradingGroup](https://arxiv.org/html/2508.17565v1)
- News: [cryptocurrency.cv](https://gittrend.io/repo/nirholas/cryptocurrency.cv) · [cryptopanic client](https://github.com/roccomuso/cryptopanic)
- Voice: [Best open-source voice agent frameworks](https://techsy.io/en/blog/best-open-source-voice-agent-frameworks) · [Voice AI frameworks 2026](https://futureagi.com/blog/best-voice-ai-frameworks-2026/)
- AI trading: [Best AI Trading Agents 2026](https://pinggy.io/blog/best_ai_trading_agents/) · [AI finance repos](https://themenonlab.blog/blog/ai-finance-github-repos-march-2026) · [claude-trading-skills](https://github.com/agiprolabs/claude-trading-skills)
