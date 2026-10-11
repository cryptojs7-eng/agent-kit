# TIKALGO AI — offline decision engine

| | |
|---|---|
| **Area** | AI decision layer |
| **Executable version / spec** | Spec Part III · MASTER §17 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

You are the Lead AI/Quant Architect of the EXISTING TIKALGO financial trading platform.
TASK:
Build a production-grade OFFLINE AI DECISION ENGINE inside the existing TIKALGO architecture.
IMPORTANT:
This is NOT a new standalone trading bot.
Do NOT create a duplicate strategy engine.
Do NOT replace the existing signal engine.
Do NOT replace existing Entry/Exit engines.
Do NOT create mock logic.
FIRST inspect the complete existing TIKALGO project and understand:

* Graphify architecture
* Market Data Bus
* Feature Engine
* Signal Engine
* Entry Engine
* Exit Engine
* SMC/ICT Engine
* Market Structure
* Scanner
* Risk Engine
* Portfolio Engine
* Backtesting
* Paper Trading
* Execution
* Whale/On-chain modules
* CVD/Delta/Footprint
* OI/Funding/Liquidations
* News/Sentiment/Macro modules
* Redis
* PostgreSQL/TimescaleDB
* Workers
* AI modules
* API contracts
* WebSocket
* existing tests

Reuse existing modules and contracts.
==================================================
PRIMARY OBJECTIVE
Build an OFFLINE AI DECISION MAKER that becomes the intelligent decision layer ABOVE the existing TIKALGO quantitative engines.
Architecture:
REAL MARKET DATA
↓
EXISTING TIKALGO MODULES
↓
FEATURES
↓
SIGNAL ENGINE
↓
ENTRY / EXIT ANALYSIS
↓
REGIME ENGINE
↓
OFFLINE AI DECISION ENGINE
↓
RISK ENGINE
↓
PORTFOLIO CHECK
↓
FINAL DECISION
↓
EXECUTION
The AI must NOT replace the lower-level quantitative engines.
It must intelligently interpret and combine their outputs.
==================================================
OFFLINE REQUIREMENT
The decision engine MUST operate locally/offline.
NO dependency on:

* OpenAI API
* Claude API
* Gemini API
* OpenRouter
* external LLM API
* cloud AI inference

during normal decision making.
The system must continue making decisions if the Internet and external AI APIs are unavailable, provided market data required by the existing system is available.
Use locally deployable models where appropriate.
The architecture must support:

* local CPU inference
* optional local GPU inference
* Ollama/local model integration if already available
* ONNX where useful
* LightGBM/XGBoost/sklearn where appropriate
* PyTorch where justified

Do NOT introduce a large model simply because it is available.
Prefer the smallest model that provides reliable predictive value.
==================================================
RESEARCH FOUNDATION
Use the results and principles from the previous research tasks:

* Market Wizards
* New Market Wizards
* Trend Following
* Turtle Trading
* Van Tharp / Position Sizing
* Two Sigma
* JPMorgan
* Citadel
* Man AHL
* AQR
* BlackRock
* BIS
* quantitative ML research
* backtest-overfitting research

Use these principles:

* scientific hypothesis testing
* multiple independent alpha sources
* regime awareness
* ensemble decision making
* portfolio-level risk
* cost-aware decisions
* anti-overfitting
* walk-forward validation
* explainability
* model governance
* execution awareness
* controlled learning

Do NOT copy proprietary institutional algorithms.
==================================================
AI ROLE
The Offline AI is NOT a candle predictor.
Its role is:
EVIDENCE AGGREGATOR
+
SIGNAL CRITIC
+
REGIME INTERPRETER
+
STRATEGY SELECTOR
+
TRADE QUALITY EVALUATOR
+
RISK-AWARE DECISION MAKER
It must answer:

1. Is there a valid opportunity?
2. What is the direction?
3. Which existing strategy produced the opportunity?
4. Do independent modules confirm it?
5. What conflicts with it?
6. What is the current market regime?
7. What is the expected edge?
8. What is the expected R?
9. Is the trade worth the risk?
10. What would invalidate it?
11. Should we LONG, SHORT, WAIT, REDUCE or EXIT?

==================================================
INPUTS TO AI
Create a normalized Decision Feature Contract.
Include outputs from existing TIKALGO modules.
PRICE:

* OHLCV
* returns
* volatility
* ATR
* gaps

TREND:

* EMA
* SMA
* ADX
* trend direction
* trend strength
* multi-timeframe trend

ICHIMOKU:

* Kijun
* Tenkan
* cloud
* higher timeframe Kijun

MOMENTUM:

* RSI
* ROC
* momentum
* relative strength

MARKET STRUCTURE:

* BOS
* CHOCH
* swing structure
* liquidity sweep
* displacement
* FVG
* order blocks

ORDER FLOW:

* CVD
* Delta
* Footprint
* DOM
* liquidity walls
* buyer/seller imbalance

DERIVATIVES:

* Open Interest
* Funding
* liquidation data
* basis
* long/short imbalance

WHALE:

* whale score
* whale accumulation
* whale distribution
* large positions
* large transfers

ON-CHAIN:

* exchange flows
* wallet activity
* large transactions
* stablecoin flows

MACRO:

* DXY
* VIX
* US10Y
* S&P500
* Nasdaq
* Gold
* BTC dominance
* ETH/BTC
* Fear & Greed

NEWS:

* relevant news
* event type
* sentiment
* importance
* surprise
* affected assets
* news confidence

SOCIAL:

* sentiment
* trend
* abnormal activity

EXISTING SIGNAL ENGINE:

* signal direction
* signal strength
* strategy
* timeframe
* entry
* stop
* targets
* confidence

EXISTING ENTRY ENGINE:

* entry validity
* entry zone
* trigger
* confirmation

EXISTING EXIT ENGINE:

* exit signal
* target state
* trailing state
* invalidation

RISK:

* account equity
* available capital
* current exposure
* portfolio risk
* correlation
* drawdown
* leverage
* liquidation distance

==================================================
MULTI-TIMEFRAME INTELLIGENCE
The AI must understand:
HTF = context/regime
MTF = setup
LTF = execution
Example:
4H:
Trend UP
1H:
Pullback
15M:
Liquidity sweep
5M:
Bullish displacement
→ AI may classify this as high-quality LONG setup.
But:
4H:
Trend DOWN
15M:
LONG signal
5M:
LONG signal
→ AI must recognize that lower timeframe signals conflict with HTF context.
==================================================
SIGNAL FUSION
DO NOT use:
"3 indicators say BUY → BUY"
Instead calculate independent evidence.
Example:
Trend Evidence
+
Structure Evidence
+
Momentum Evidence
+
Order Flow Evidence
+
Liquidity Evidence
+
Derivatives Evidence
+
Whale Evidence
+
Macro Evidence
+
News Evidence
+
Existing Strategy Signal
Decision State
Then apply:
confirmation bonus
contradiction penalty
uncertainty penalty
correlation penalty
liquidity penalty
execution penalty
event-risk penalty
==================================================
REGIME ENGINE
AI must consume and/or improve the existing regime engine.
Detect:
TREND_UP
TREND_DOWN
RANGE
BREAKOUT
VOLATILITY_EXPANSION
VOLATILITY_COMPRESSION
REVERSAL
PANIC
LIQUIDITY_STRESS
LOW_LIQUIDITY
UNCERTAIN
Strategy suitability must depend on regime.
Example:
TREND_UP:
Trend Following
Turtle
Pullback
RANGE:
Mean Reversion
Liquidity Sweep
BREAKOUT:
Breakout
Momentum
Squeeze
PANIC:
Reduce exposure
or NO TRADE
UNCERTAIN:
NO TRADE
==================================================
STRATEGY SELECTION
The AI must dynamically evaluate existing TIKALGO strategies:

* Trend Following
* Turtle
* Breakout
* Momentum
* Pullback
* Mean Reversion
* Squeeze
* SMC/ICT
* Liquidity Sweep
* Order Flow
* Whale-based signals
* Macro strategies
* News/Event strategies

The AI must NOT always choose the highest raw score.
Evaluate:
historical performance in current regime
current confidence
signal quality
market compatibility
timeframe compatibility
recent degradation
correlation with other active strategies
expected cost
portfolio exposure
==================================================
AI DECISION OUTPUT
Every decision must produce a structured object:
decision:
LONG | SHORT | WAIT | REDUCE | EXIT
symbol
market
timeframe
strategy
regime
entry
stop_loss
tp1
tp2
tp3
trailing_stop
expected_R
expected_edge
confidence
risk_score
portfolio_risk
position_size
recommended_leverage
holding_horizon
signal_quality
execution_quality
news_risk
liquidity_risk
model_uncertainty
decision_expiry
invalidation_conditions
supporting_evidence[]
contradicting_evidence[]
decision_trace[]
model_version
feature_version
timestamp
==================================================
NO-TRADE INTELLIGENCE
This is extremely important.
The AI must be allowed to say:
WAIT
or
NO TRADE
when:
signals conflict
regime uncertain
expected edge low
risk/reward poor
liquidity poor
spread too high
news risk extreme
portfolio exposure too high
correlation too high
model confidence low
execution quality poor
data quality insufficient
Do NOT force a trade.
The quality of NO-TRADE decisions must be measured.
==================================================
RISK ENGINE SEPARATION
AI recommends.
Risk Engine approves/rejects.
AI MUST NEVER override hard risk limits.
Flow:
AI Decision
↓
Risk Validation
↓
Portfolio Validation
↓
Execution Validation
↓
Order
Risk Engine can convert:
LONG
→ WAIT
or:
LONG
→ REDUCE SIZE
or:
LONG
→ REJECT
==================================================
POSITION SIZING
Use:
account equity
risk budget
stop distance
ATR/volatility
expected R
confidence
portfolio exposure
correlation
liquidity
Never increase leverage simply because AI confidence is high.
Never risk more than configured limits.
==================================================
LOCAL MODEL ARCHITECTURE
Build the AI using a layered architecture.
LEVEL 1:
Deterministic quantitative features.
LEVEL 2:
Statistical scoring.
LEVEL 3:
Machine learning models where justified.
Possible models:
LightGBM
XGBoost
Random Forest
Logistic Regression
small neural network
Choose based on validation, NOT popularity.
LEVEL 4:
Meta Decision Model.
Optional:
LOCAL LLM
Use local LLM ONLY for:
structured reasoning
news interpretation
decision explanation
conflict analysis
research assistance
The local LLM must NOT directly control order execution.
All numerical decisions must come from structured features/models and hard risk rules.
==================================================
TRAINING DATASET
Create a point-in-time decision dataset.
Each row represents:
MARKET STATE
→ AVAILABLE INFORMATION
→ SIGNALS
→ DECISION
→ FUTURE OUTCOME
Labels should include:
future return
future maximum favorable excursion
future maximum adverse excursion
future R
trade success
time-to-target
time-to-stop
regime transition
Prevent all future leakage.
==================================================
LABELING
Do NOT use simplistic:
next_candle_up = 1
Prefer event-based labels.
Example:
LONG opportunity:
TP reached before SL
within defined horizon
SHORT opportunity:
TP reached before SL
within defined horizon
Also record:
MFE
MAE
realized R
time-to-resolution
==================================================
TRAINING
Training pipeline:
Historical Data
↓
Point-in-Time Feature Dataset
↓
Label Generation
↓
Train
↓
Validation
↓
Out-of-Sample
↓
Walk Forward
↓
Stress Test
↓
Paper
↓
Shadow
↓
Production Candidate
No model goes directly from training to LIVE.
==================================================
ANTI-OVERFITTING
Track:
dataset version
feature version
model version
experiment ID
hyperparameters
training period
validation period
test period
number of experiments
Use:
walk-forward
out-of-sample
rolling validation
parameter sensitivity
Monte Carlo
trade randomization
regime stress
market stress
Avoid excessive feature count.
Remove redundant features.
Reject models whose performance collapses outside training conditions.
==================================================
MODEL MONITORING
After deployment monitor:
prediction accuracy
calibration
confidence calibration
feature drift
regime drift
PnL
expectancy
profit factor
drawdown
MAE
MFE
slippage
execution quality
strategy degradation
Detect:
MODEL_DEGRADATION
Then:
reduce confidence
reduce allocation
shadow model
retrain candidate
Do not automatically replace the production model.
==================================================
DECISION JOURNAL
Every AI decision must be stored.
Store:
what AI saw
what modules said
what AI decided
why it decided
what contradicted it
risk decision
execution result
final outcome
After trade close:
PREDICTION
vs
REALITY
Then classify failure:
DATA_FAILURE
SIGNAL_FAILURE
REGIME_FAILURE
MODEL_FAILURE
RISK_FAILURE
EXECUTION_FAILURE
NEWS_FAILURE
LIQUIDITY_FAILURE
This becomes the foundation for controlled future learning.
==================================================
EXPLAINABILITY
Every decision must be explainable in machine-readable form.
Example:
LONG BTCUSDT
REGIME:
TREND_UP 0.82
SUPPORT:
HTF trend +0.91
Structure +0.83
CVD +0.76
OI +0.69
Liquidity +0.72
CONFLICT:
Funding -0.31
Resistance -0.22
EXPECTED R:
2.7
RISK:
0.5%
FINAL:
LONG
The explanation must be generated from actual model inputs.
Never invent reasons after the fact.
==================================================
OFFLINE OPERATION
The decision engine must work without cloud AI.
External data providers may still provide MARKET DATA if required by TIKALGO.
But the AI DECISION itself must execute locally.
If external AI is unavailable:
TIKALGO must continue using:
local models
existing quantitative engines
rule-based fallbacks
risk engine
If local AI is unavailable:
FAIL SAFE.
Do NOT generate an unverified trade.
==================================================
FAIL-SAFE
If:
data incomplete
feature stale
model unavailable
model confidence invalid
risk engine unavailable
portfolio state unavailable
execution state unknown
→ WAIT / NO TRADE
Never guess.
==================================================
MODEL SELECTION
Do not assume the largest local model is best.
Benchmark candidate local models on:
decision accuracy
calibration
latency
RAM
CPU usage
consistency
explainability
financial relevance
Select the smallest model that meets required performance.
==================================================
TIKALGO INTEGRATION
Integrate with:
existing AI Signals
existing Scanner
Watchlist
Entry
Exit
Risk
Portfolio
Paper Trading
Execution
Journal
Redis
PostgreSQL/TimescaleDB
WebSocket
API
Frontend
Do not break existing APIs.
Expose AI Decision state through existing API patterns.
==================================================
SETTINGS
Add configuration through existing Settings architecture.
Support:
AI Decision ON/OFF
Model selection
Model version
Confidence threshold
Minimum expected edge
Minimum expected R
Risk limit
Regime filter
Strategy weights
No-trade threshold
Local model path
Inference mode
CPU/GPU
Paper/Shadow/Live mode
LIVE must remain OFF by default.
==================================================
PERFORMANCE TARGET
Do NOT optimize for:
maximum number of trades.
Optimize for:
risk-adjusted expected return
robustness
low drawdown
stable expectancy
high-quality decisions
low false positives
good calibration
execution quality
Measure:
Win Rate
Profit Factor
Expectancy
Average R
Sharpe
Sortino
Calmar
Max Drawdown
MFE
MAE
Turnover
Fees
Slippage
Funding
Long/Short performance
Regime performance
Market performance
NO-TRADE quality
AI calibration
==================================================
IMPLEMENTATION PROCESS
STEP 1
Inspect the entire existing TIKALGO architecture.
STEP 2
Map every existing signal/entry/exit/risk module.
STEP 3
Identify existing AI/data capabilities.
STEP 4
Create Decision Feature Contract.
STEP 5
Create historical training dataset.
STEP 6
Implement offline baseline model.
STEP 7
Implement Meta Decision Engine.
STEP 8
Integrate Regime/Strategy/Signal outputs.
STEP 9
Integrate Risk/Portfolio validation.
STEP 10
Implement Decision Journal.
STEP 11
Implement model monitoring.
STEP 12
Run backtests.
STEP 13
Run walk-forward validation.
STEP 14
Run paper trading.
STEP 15
Run shadow mode.
STEP 16
Only after successful validation expose LIVE activation.
==================================================
DO NOT
Do NOT:

* create a separate toy trading system
* replace existing signal engine
* replace existing risk engine
* blindly combine indicators
* use future data
* use lookahead
* repaint
* call cloud LLM APIs for normal decisions
* allow LLM to directly place orders
* hard-code one market
* hard-code one timeframe
* force a trade
* bypass risk limits
* train on future information
* optimize only for win rate
* optimize only for backtest profit
* delete existing tests
* weaken safety controls
* activate LIVE trading automatically

==================================================
FINAL DELIVERABLE
Return:

1. Existing architecture assessment
2. Existing modules reused
3. New Offline AI Decision architecture
4. Decision Feature Contract
5. Model architecture
6. Training pipeline
7. Labeling methodology
8. Regime integration
9. Strategy integration
10. Risk integration
11. Portfolio integration
12. Execution integration
13. Decision Journal
14. Explainability
15. Model monitoring
16. Anti-overfitting controls
17. Files changed
18. Tests added
19. Backtest results
20. Walk-forward results
21. Paper results
22. Model resource requirements
23. Remaining weaknesses
24. Exact next steps

FINAL PRINCIPLE:
TIKALGO must NOT become:
"an AI that predicts the next candle."
It must become:
"an offline quantitative intelligence system that observes all existing TIKALGO evidence, understands the current market regime, evaluates competing strategies, measures expected edge and risk, constructs a decision, passes it through independent portfolio/risk controls, executes only when justified, records the complete decision trace, compares prediction with reality, and improves through controlled research."
The AI recommends.
The quantitative engines provide evidence.
The Risk Engine has veto power.
The Execution Engine controls execution.
LIVE trading remains disabled until independently validated.    با فایل تحقیق ترکیب کنید برای معاملات واقعی
