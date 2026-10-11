> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

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
- **نقش‌های مدل AI:** `default_model, signal_model, decision_model, reasoning_model, fallback_model`، با مسیریابی از طریق **9router** موجود. **`decision_model` قابل انتخاب است:** TypeSafe/Jev (پیش‌فرض)، مدل‌های **آفلاین** Ollama، llama.cpp یا vLLM، یا مدل‌های ابری از طریق 9router؛ همراه با **زنجیره‌ی fallback تصمیم** به ترتیب دلخواه کاربر (مثلاً Jev ← مدل محلی ← قواعد قطعی). Jev در لیست Chat نمایش داده نمی‌شود. فقط مدل‌هایی در لیست تصمیم ظاهر می‌شوند که در Model Registry ثبت و ارزیابی شده‌اند (بخش ۱۵).
- همه‌ی این‌ها برای هر کاربر در DB ذخیره می‌شوند و از صفحه‌ی Settings قابل تغییرند، بدون نیاز به `.env`.

**S3 · AI Market Scanner**
- اتصال اسکنر موجود به pipeline واقعی: داده‌ی بازار ← featureهای قطعی (فقط کندل‌های بسته‌شده، non-repainting) ← snapshot ← **Decision Model انتخاب‌شده (پیش‌فرض Jev؛ یا مدل آفلاین یا ابری طبق بخش ۱۵)** ← Policy با آستانه‌ها ← خروجی `LONG / SHORT / HOLD / WATCH`، همراه با reasoning (توضیح از reasoning model، با fallback قاعده‌محور)
- **فیلترها:** market، exchange، symbol، timeframe، style، strategy، model، حداقل confidence، حداقل RR و حداکثر risk
- سیگنال‌هایی که از آستانه‌ی Validation عبور کنند **خودکار به AI Signal Watchlist** می‌روند (`VALIDATED → WATCHLIST`)
- **Fallback:** وقتی مدل تصمیم در دسترس نیست، مدل بعدی زنجیره (بخش ۱۵) و در نهایت حالت قاعده‌محور اجرا می‌شود؛ `degraded=true` ثبت و نمایش داده می‌شود

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
