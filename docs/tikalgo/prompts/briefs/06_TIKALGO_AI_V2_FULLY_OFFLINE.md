# TIKALGO AI v2 — fully offline local decision intelligence

| | |
|---|---|
| **Area** | AI decision layer |
| **Executable version / spec** | Spec Part VI · MASTER §17 Q19 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

TIKALGO — FULLY OFFLINE LOCAL AI DECISION INTELLIGENCE ENGINE
هدف اصلی
در معماری فعلی TIKALGO یک Offline AI Decision Engine حرفه‌ای و Production-Grade بساز که برای تصمیم‌گیری معاملاتی هیچ وابستگی عملیاتی به مدل‌های آنلاین، APIهای پولی یا Cloud LLM نداشته باشد.
این سیستم باید با استفاده از داده‌ها، Featureها، Signal Engine، Strategy Engine، Entry/Exit Engine، Risk Engine، Portfolio، Order Flow، SMC/ICT، Whale/On-chain، Derivatives، Macro، News/Sentiment و تمام ماژول‌های موجود TIKALGO، یک موتور تصمیم‌گیری محلی و مستقل ایجاد کند.
قانون مطلق
در مسیر LIVE/PAPER Decision Making:

* OpenAI ممنوع
* Claude ممنوع
* Gemini ممنوع
* OpenRouter ممنوع
* هر Cloud LLM/API پولی ممنوع
* هیچ تصمیم معاملاتی نباید به Internet LLM وابسته باشد.
* قطع کامل اینترنت نباید موتور AI تصمیم‌گیرنده را متوقف کند؛ فقط Data Feeds خارجی ممکن است متوقف شوند.
* هیچ API Key مربوط به LLM نباید برای Decision Engine لازم باشد.

LLM محلی فقط در صورت وجود و فقط به‌عنوان لایه کمکی مجاز است؛ هسته تصمیم‌گیری نباید به LLM وابسته باشد.
1. ابتدا معماری موجود را بررسی کن
قبل از هر تغییر:

* کل repository
* Graphify architecture
* backend
* frontend
* workers
* PostgreSQL/TimescaleDB
* Redis
* WebSocket
* Feature Engine
* Signal Engine
* Strategy Engine
* SMC/ICT
* Entry Engine
* Exit Engine
* Risk Engine
* Portfolio
* Scanner
* Backtest
* Paper Trading
* Execution adapters
* Whale/On-chain
* OI/Funding/Liquidation
* CVD/Delta/Footprint/DOM
* News/Macro/Sentiment
* Journal
* existing AI modules
* APIs
* tests

را بررسی کن.
هیچ ماژول موجود را دوباره‌سازی نکن.
Decision Engine باید روی معماری فعلی قرار بگیرد و از خروجی واقعی ماژول‌های موجود استفاده کند.
2. معماری Local-First
معماری تصمیم‌گیری را به این صورت پیاده‌سازی کن:
DATA
→ FEATURE FACTORY
→ REGIME ENGINE
→ EXISTING SIGNAL/STRATEGY ENGINES
→ LOCAL ML MODELS
→ HISTORICAL MEMORY
→ META DECISION MODEL
→ COUNTERFACTUAL ENGINE
→ DECISION CRITIC
→ UNCERTAINTY/CONFLICT ENGINE
→ PORTFOLIO/RISK GATE
→ EXECUTION
هیچ Cloud AI در این مسیر وجود نداشته باشد.
3. Local AI Stack
با توجه به CPU/GPU واقعی VPS، بهترین مدل محلی را انتخاب کن و از مدل‌های سنگین غیرضروری اجتناب کن.
اولویت:

* LightGBM
* XGBoost
* CatBoost
* scikit-learn
* small PyTorch models
* ONNX Runtime

در صورت نیاز:

* Ollama
* مدل LLM کوچک و محلی

اما:
LLM نباید مستقیماً LONG/SHORT یا Entry/SL/TP تولید کند.
Numerical trading decision باید توسط مدل‌های Structured ML + Statistical Decision Engine انجام شود.
4. Multi-Layer Local Intelligence
حداقل این لایه‌ها را بساز:
Layer 1 — Deterministic Intelligence
تمام Featureهای موجود:

* Price
* Volume
* ATR
* ADX
* RSI
* Ichimoku/Kijun
* Market Structure
* BOS/CHOCH
* Liquidity
* SMC/ICT
* CVD
* Delta
* Footprint
* DOM
* OI
* Funding
* Liquidations
* Whale
* On-chain
* Volatility
* Correlation
* Macro
* News
* Sentiment

Layer 2 — Statistical Intelligence
محاسبه:

* expectancy
* probability
* R distribution
* MFE
* MAE
* win probability
* TP/SL probability
* time-to-resolution
* volatility-adjusted edge

Layer 3 — Local ML
مدل‌های محلی برای:

* regime classification
* trade quality
* direction probability
* expected R
* TP probability
* SL probability
* time-to-resolution
* execution quality
* risk probability

Layer 4 — Local Meta Decision Model
تمام خروجی‌های بالا را ترکیب کرده و تصمیم نهایی را تولید کند.
5. Decision Critic
برای هر تصمیم، یک Critic مستقل اجرا کن.
اگر AI اصلی گفت LONG:
Critic باید عمداً دنبال دلایل عدم ورود بگردد:

* HTF conflict
* liquidity trap
* fake breakout
* late entry
* poor R:R
* high funding
* abnormal OI
* adverse CVD
* whale distribution
* macro/news risk
* regime transition
* poor execution
* model uncertainty

خروجی:
PASS / WEAKEN / REJECT
Critic نباید صرفاً همان مدل اصلی را تکرار کند.
6. Counterfactual Decision Engine
همزمان حداقل این تصمیم‌ها را ارزیابی کن:
LONG
SHORT
WAIT
REDUCE
EXIT
برای هرکدام محاسبه کن:

* expected R
* probability
* risk
* drawdown
* execution quality
* opportunity cost

مثلاً:
LONG = +1.4R
SHORT = -0.4R
WAIT = +0.2R
فقط در صورت برتری واقعی LONG وارد شو.
WAIT یک تصمیم معتبر و مهم است، نه شکست سیستم.
7. Historical Market Memory
یک حافظه تاریخی محلی بساز.
برای هر setup ذخیره کن:

* market
* timeframe
* regime
* features
* signal
* entry
* exit
* outcome
* MFE
* MAE
* realized R
* duration
* news state
* liquidity state
* volatility
* model decision

در زمان تصمیم، شرایط فعلی را با نمونه‌های تاریخی مقایسه کن.
خروجی:

* similarity score
* historical sample count
* win rate
* median R
* MFE/MAE
* regime-specific performance

8. Similarity Engine
Feature vector فعلی را با Historical Dataset مقایسه کن.
از روش مناسب استفاده کن:

* normalized distance
* cosine similarity
* nearest neighbors
* clustering
* embedding در صورت نیاز

اما از leakage جلوگیری کن.
فقط اطلاعاتی را استفاده کن که در زمان تصمیم واقعاً در دسترس بوده‌اند.
9. Evidence Independence
تعداد Indicatorها را با تعداد شواهد اشتباه نکن.
مثلاً:
RSI + MACD + EMA + ADX
چهار Indicator هستند ولی عمدتاً Price-derived هستند.
بنابراین یک:
`Evidence Independence Score`
بساز و منابع را گروه‌بندی کن:

* price
* volume
* order flow
* derivatives
* on-chain
* whales
* macro
* news
* sentiment

AI باید بداند چند منبع مستقل واقعاً تصمیم را تأیید می‌کنند.
10. Evidence Conflict Engine
تضاد شواهد را شناسایی کن.
مثلاً:
Trend = bullish
SMC = bullish
CVD = bullish
OI = bearish
Funding = extreme
Liquidity = adverse
نتیجه:
`HIGH_CONFLICT`
در شرایط conflict شدید:

* کاهش confidence
* کاهش position size
* یا WAIT

11. Uncertainty Engine
فقط Confidence تولید نکن.
محاسبه کن:

* model uncertainty
* regime uncertainty
* data uncertainty
* historical uncertainty
* execution uncertainty
* distribution shift

اگر:
`Confidence = HIGH`
ولی:
`Uncertainty = HIGH`
نباید معامله انجام شود.
12. Regime Transition
فقط Regime فعلی را تشخیص نده.
تشخیص بده:

* regime stable
* regime weakening
* regime transition
* regime unknown

مثلاً:
TREND_UP
→ WEAKENING
→ TRANSITION
→ RANGE
در transition، risk را کاهش بده.
13. Feature Reliability
برای هر Feature:

* freshness
* completeness
* source reliability
* anomaly
* historical predictive value
* regime-specific reliability

را محاسبه کن.
اگر داده خراب/قدیمی/غیرقابل‌اعتماد است، وزن آن را کاهش بده.
14. Opportunity Cost
اگر چند فرصت همزمان وجود دارد، همه را معامله نکن.
تمام candidateها را رتبه‌بندی کن:
Expected Edge
+
Risk
+
Liquidity
+
Portfolio Correlation
+
Capital Efficiency
+
Execution Quality
و بهترین فرصت‌ها را انتخاب کن.
15. Portfolio-Aware Decision
قبل از هر معامله وضعیت کل Portfolio را ببین:

* open positions
* exposure
* correlation
* leverage
* drawdown
* sector/market exposure
* crypto beta
* FX exposure
* metals exposure
* stock exposure

معامله جدید نباید ریسک پنهان Portfolio را بیش از حد افزایش دهد.
16. Adversarial Market Check
قبل از ورود بررسی کن:

* bull trap
* bear trap
* fake breakout
* liquidity sweep
* stop hunt
* OI trap
* funding trap
* news spike
* abnormal volatility

سؤال داخلی:
"اگر این setup یک trap باشد، چه شواهدی باید ببینیم؟"
17. Entry Timing Intelligence
AI باید بتواند بگوید:

* Direction درست است ولی الان ورود نکن.
* Wait for pullback.
* Wait for confirmation.
* Wait for liquidity sweep.
* Wait for structure confirmation.

یعنی:
Correct Direction ≠ Correct Entry
18. Dynamic Exit Intelligence
AI فقط Entry Decision Maker نباشد.
در طول معامله بتواند:

* HOLD
* REDUCE
* TAKE_PROFIT
* MOVE_SL
* TRAIL
* EXIT

را پیشنهاد دهد.
اما Risk Engine همیشه VETO نهایی را داشته باشد.
19. Trade Autopsy
بعد از هر معامله:
Prediction
→ Actual Outcome
→ Error Classification
خطا را دسته‌بندی کن:

* model error
* feature error
* regime error
* signal error
* entry error
* exit error
* execution error
* risk error
* unexpected event

این اطلاعات وارد Research Dataset شود.
20. Controlled Learning
مدل نباید بعد از چند معامله خودش را در Production تغییر دهد.
چرخه:
TRADE
→ OUTCOME
→ AUTOPSY
→ DATASET
→ RESEARCH
→ TRAIN
→ VALIDATION
→ OOS
→ WALK-FORWARD
→ STRESS TEST
→ PAPER
→ SHADOW
→ APPROVAL
→ PRODUCTION
هیچ Self-Modification مستقیم در LIVE وجود نداشته باشد.
21. Training Dataset
Dataset کاملاً Point-in-Time باشد.
هر نمونه فقط شامل اطلاعاتی باشد که در زمان تصمیم در دسترس بوده.
Labelها بر اساس:

* TP-before-SL
* realized R
* MFE
* MAE
* time-to-resolution
* max adverse excursion
* max favorable excursion

ساخته شوند.
از label ساده next-candle direction به عنوان معیار اصلی استفاده نکن.
22. ضد Overfitting
اجباری:

* Train/Validation/OOS
* Walk-forward
* rolling validation
* parameter sensitivity
* Monte Carlo
* randomized trade sequence
* fee/slippage stress
* funding stress
* liquidity stress
* regime-specific validation
* unseen market validation

اگر مدل فقط روی یک بازار یا دوره خاص خوب است، Production نشود.
23. Cost-Aware Intelligence
تمام تصمیم‌ها با:

* commission
* spread
* slippage
* funding
* market impact
* latency

ارزیابی شوند.
Edge قبل از هزینه و Edge بعد از هزینه را جداگانه محاسبه کن.
24. Decision Output
هر تصمیم باید Structured و قابل Audit باشد:

```text
decision:
LONG | SHORT | WAIT | REDUCE | EXIT

market
symbol
timeframe
strategy
regime
regime_stability

entry
stop_loss
tp1
tp2
tp3
trailing

expected_R
probability
confidence
uncertainty

data_quality
evidence_independence
evidence_conflict
historical_similarity

execution_quality
liquidity_risk
news_risk
model_risk

portfolio_risk
position_size
leverage

critic_result
counterfactual_results

supporting_evidence
contradicting_evidence

decision_trace
model_version
feature_version
timestamp
expiry
invalidation

```

25. Explainability
برای هر تصمیم مشخص کن:
WHY TRADE?
مهم‌ترین شواهد مثبت.
WHY NOT?
مهم‌ترین شواهد مخالف.
WHY NOW?
چرا این لحظه؟
WHY THIS SIZE?
چرا این position size؟
WHY NOT ANOTHER MARKET?
Opportunity Cost.
WHAT INVALIDATES?
شرایطی که تصمیم را باطل می‌کند.
26. Local LLM — فقط اختیاری
اگر Ollama یا مدل محلی نصب است، می‌توان از آن برای:

* توضیح Decision Trace
* خلاصه News
* Research
* گزارش Journal
* تحلیل متنی
* پرسش‌وپاسخ داخلی

استفاده کرد.
اما:
Decision Engine باید حتی بدون Ollama/LLM هم 100% کار کند.
یعنی:
`Ollama OFF`
نباید باعث شود:
`Trading Decision Engine OFF`
شود.
27. Offline Mode
یک حالت واقعی بساز:
`OFFLINE_AI_MODE=true`
در این حالت:

* هیچ Cloud LLM
* هیچ AI API
* هیچ OpenRouter
* هیچ external inference

استفاده نشود.
سیستم فقط از:

* Local ML
* Local database
* Redis
* cached market/news data
* local historical datasets
* local models

استفاده کند.
28. Fail-Safe
اگر:

* Model unavailable
* Dataset corrupt
* Feature missing
* Regime unknown
* High uncertainty
* Data stale
* Risk engine unavailable
* Portfolio state unknown
* execution quality poor

بود:
NO TRADE
و هرگز fallback به Cloud AI انجام نشود.
29. Settings
در Settings فعلی TIKALGO بخش Local AI اضافه/تکمیل کن:

* Offline AI ON/OFF
* Local Model
* Model Version
* Decision Threshold
* Confidence Threshold
* Uncertainty Threshold
* Critic Threshold
* Historical Similarity Threshold
* Maximum Portfolio Risk
* Maximum Correlation
* Paper/Shadow/Live
* Model Health
* Dataset Health
* Last Training
* Last Validation
* Model Performance
* Drift Status

LIVE همچنان OFF پیش‌فرض باشد.
30. تست Production
برای تمام بخش‌ها تست بنویس:

* unit tests
* integration tests
* deterministic decision tests
* leakage tests
* no-future-data tests
* model loading tests
* offline tests
* missing-data tests
* stale-data tests
* risk-veto tests
* critic tests
* counterfactual tests
* portfolio tests
* fail-safe tests

یک تست مهم:
با قطع کامل تمام Cloud AI/APIها، TIKALGO باید بتواند Decision Engine را اجرا کند.
31. اصل نهایی
هدف ساخت یک Chatbot معاملاتی نیست.
هدف ساخت:
TIKALGO Offline Quantitative Decision Intelligence
است.
این سیستم باید:
داده‌های بازار را ببیند،
Regime را بفهمد،
سیگنال‌های موجود TIKALGO را ارزیابی کند،
شواهد مستقل را ترکیب کند،
تضادها را پیدا کند،
نمونه‌های تاریخی مشابه را بررسی کند،
احتمال و Expected R را محاسبه کند،
LONG/SHORT/WAIT را با Counterfactual مقایسه کند،
توسط Decision Critic به چالش کشیده شود،
عدم‌قطعیت را اندازه‌گیری کند،
Portfolio و Opportunity Cost را ببیند،
Risk Engine آن را کنترل کند،
و فقط در صورت وجود Edge واقعی معامله را تأیید کند.
هیچ مدل آنلاین یا پولی نباید برای این فرآیند لازم باشد.
معماری باید طوری باشد که حتی بدون Ollama و بدون هرگونه LLM نیز هسته تصمیم‌گیری کاملاً فعال باشد.
قبل از implementation، معماری موجود را بررسی کن، از ماژول‌های فعلی حداکثر reuse را انجام بده، duplication ایجاد نکن، قراردادهای API موجود را نشکن و تمام تغییرات را با تست و گزارش دقیق پیاده‌سازی کن.
در پایان گزارش بده:

1. چه ماژول‌هایی استفاده شد
2. چه ماژول‌هایی ایجاد شد
3. چه مدل‌های Local ساخته/استفاده شد
4. Dataset و Feature Pipeline چگونه کار می‌کند
5. Decision Flow چگونه کار می‌کند
6. چگونه ثابت شد Cloud AI dependency وجود ندارد
7. تست‌های اجراشده
8. وضعیت PAPER/SHADOW/LIVE
9. Model/Data/Decision Health
10. موارد باقی‌مانده     این هم اضافه کنید
