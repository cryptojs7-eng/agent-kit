# Institutional quant intelligence (TQI)

| | |
|---|---|
| **Area** | Whole quant stack |
| **Executable version / spec** | Spec Part I · MASTER §17 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

You are the Lead Quant Architect, AI Researcher and Senior Trading-System Engineer for the EXISTING TIKALGO platform.
MISSION:
Upgrade the existing TIKALGO trading intelligence into an institutional-grade, research-driven, adaptive AI quantitative trading system for:

* Crypto Spot
* Crypto Futures
* Forex
* Gold / Metals
* US Stocks
* ETFs

DO NOT build a toy bot.
DO NOT create a standalone framework.
DO NOT replace existing working architecture.
DO NOT duplicate existing engines.
FIRST inspect the real TIKALGO codebase, architecture, Graphify graph, database schema, workers, Redis, feature engine, SMC/ICT engine, scanner, AI Decision layer, strategy engine, risk engine, backtesting, paper trading, execution adapters, market-data pipeline, news/sentiment modules and tests.
Reuse existing components whenever possible.
==================================================
RESEARCH SOURCES
Use the following PUBLIC sources as architectural/research references.
J.P. Morgan AI Research:
https://www.jpmorgan.com/US/en/technology/artificial-intelligence
J.P. Morgan Machine Learning Center:
https://www.jpmorganchase.com/about/technology/research/machine-learning
J.P. Morgan Quantamental System:
https://www.jpmorgan.com/markets/jpmaqs
J.P. Morgan 2026 E-Trading Survey:
https://markets.jpmorgan.com/discover-more/e-trading-survey-report
J.P. Morgan institutional electronic trading:
https://www.jpmorgan.com/markets/insights/the-trading-desk-rewired
Two Sigma:
https://www.twosigma.com/
Two Sigma Investment Management:
https://www.twosigma.com/businesses/investment-management/
Two Sigma Insights:
https://www.twosigma.com/insights/
Citadel Global Quantitative Strategies:
https://www.citadel.com/careers/programs-and-events/gqs-phd-colloquium/
Citadel ML Research:
https://www.citadel.com/careers/details/global-quantitative-strategies-machine-learning-researcher/
Man AHL:
https://www.man.com/ahl
Man Group Quant Renaissance:
https://www.man.com/insights/the-quant-renaissance
AQR Systematic Equities:
https://www.aqr.com/Learning-Center/Systematic-Equities
AQR Empirical Asset Pricing via Machine Learning:
https://www.aqr.com/insights/research/journal-article/empirical-asset-pricing-via-machine-learning
AQR Financial Machine Learning:
https://www.aqr.com/Insights/Research/Working-Paper/Financial-Machine-Learning
BlackRock Systematic Investing:
https://www.blackrock.com/institutions/en-us/investment-capabilities/strategies/systematic-investing
BIS — AI monitoring of financial markets:
https://www.bis.org/publications/working-paper-1291-harnessing-artificial-intelligence-monitoring-financial-markets
BIS — AI and financial stability:
https://www.bis.org/publications/fsi-summary-financial-stability-implications-artificial-intelligence-executive-summary
BIS — AI regulation and model risk:
https://www.bis.org/publications/fsi-insight-63-regulating-ai-financial-sector-recent-developments-and-main-challenges
BIS — AI data governance:
https://www.bis.org/publications/fsi-insight-73-data-we-trust-emerging-policy-and-supervisory-approaches-ai-data-use-financial-services
Backtest Overfitting:
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253
Statistical Overfitting:
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2507040
What to Look for in a Backtest:
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2308682
RL for Systematic FX:
https://arxiv.org/abs/2110.04745
Cost-Sensitive Deep RL:
https://arxiv.org/abs/2003.03051
Also use the previously specified trading books and strategy literature:
Market Wizards — Jack Schwager
https://www.wiley-vch.de/en/areas-interest/finance-economics-law/market-wizards-978-1-118-27305-0
The New Market Wizards — Jack Schwager
https://www.wiley-vch.de/en/areas-interest/finance-economics-law/the-new-market-wizards-978-1-59280-337-8
Trend Following — Michael Covel
https://www.trendfollowing.com/translations/
Trade Your Way to Financial Freedom — Van Tharp
https://www.mheducation.com/highered/mhp/product/trade-your-way-financial-freedom.html
==================================================
IMPORTANT RESEARCH RULE
Do NOT copy proprietary strategies from any institution.
Do NOT claim access to confidential institutional algorithms.
Extract ONLY publicly documented principles, methodologies, research findings and architectural lessons.
For every important design decision identify:
SOURCE
→ OBSERVATION
→ PRINCIPLE
→ TIKALGO IMPLEMENTATION
→ EXPECTED BENEFIT
→ FAILURE MODE
==================================================
KEY PRINCIPLES TO EXTRACT

1. SCIENTIFIC HYPOTHESIS PROCESS

Adopt the scientific workflow used by quantitative organizations:
Hypothesis
→ Data
→ Feature
→ Model
→ Validation
→ Portfolio Construction
→ Execution
→ Monitoring
→ Feedback
→ New Hypothesis
Every new strategy must have an explicit hypothesis.
Do not add indicators merely because they improve an in-sample backtest.
==================================================

2. DATA-FIRST ARCHITECTURE

Build a unified Feature Intelligence Layer.
Integrate, where available:
PRICE
VOLUME
VOLATILITY
ATR
ADX
RSI
MOMENTUM
MARKET STRUCTURE
SMC / ICT
BOS / CHOCH
FVG
ORDER BLOCKS
LIQUIDITY SWEEPS
CVD
DELTA
FOOTPRINT
DOM
LIQUIDITY WALLS
OPEN INTEREST
FUNDING
LIQUIDATIONS
WHALE POSITIONS
ON-CHAIN DATA
EXCHANGE FLOWS
MACRO DATA
DXY
VIX
US10Y
S&P500
NASDAQ
GOLD
BTC DOMINANCE
ETH/BTC
FEAR & GREED
NEWS
SOCIAL SENTIMENT
ECONOMIC CALENDAR
PROJECT-SPECIFIC NEWS
Do not simply concatenate features.
Calculate feature quality, redundancy, correlation, stability and predictive contribution.
==================================================
3. ALPHA FACTORY
Create an Alpha Research Layer.
Generate independent alpha hypotheses from:

* momentum
* trend
* mean reversion
* volatility
* liquidity
* order flow
* market structure
* cross-sectional relationships
* macro
* sentiment
* news
* alternative data
* whale activity
* on-chain behavior

Every alpha must be independently testable.
Store:
alpha_id
hypothesis
features
market
timeframe
regime
expected_horizon
signal
confidence
training_period
validation_period
cost assumptions
performance
failure conditions
==================================================
4. REGIME ENGINE
Market behavior is non-stationary.
Create a dynamic Market Regime Engine.
Detect:
TREND_UP
TREND_DOWN
RANGE
BREAKOUT
VOLATILITY_EXPANSION
VOLATILITY_COMPRESSION
REVERSAL
CRASH
PANIC
LIQUIDITY_STRESS
LOW_LIQUIDITY
UNCERTAIN
Use multiple independent signals.
Do not rely on one indicator.
Regime probability must be available to downstream models.
==================================================
5. STRATEGY ENSEMBLE
Do NOT search for one universal strategy.
Create independent strategy families:
Trend Following
Turtle / Breakout
Momentum
Pullback
Mean Reversion
Volatility Squeeze
Liquidity Sweep
SMC / Market Structure
Order Flow
Cross-Asset / Relative Value
Macro
News/Event Driven
Each strategy must have its own:
Entry
Exit
Invalidation
Stop
Target
Trailing
Position sizing
Expected holding period
Market compatibility
Regime compatibility
==================================================
6. META-STRATEGY / STRATEGY ROUTER
Build an AI/quantitative Meta-Model that decides:
WHICH strategy should be active
WHICH strategy should be ignored
WHETHER strategies agree
WHETHER they conflict
EXPECTED EDGE
EXPECTED R
EXPECTED COST
CONFIDENCE
RISK
Example:
TREND_UP + strong momentum
→ Trend/Turtle/Pullback receive higher weight
RANGE + low ADX
→ Mean Reversion/Liquidity Sweep receive higher weight
VOLATILITY COMPRESSION
→ Squeeze/Breakout receive higher weight
LIQUIDITY STRESS
→ reduce exposure or NO TRADE
UNCERTAIN
→ NO TRADE
Do NOT simply average signals.
Use a learned or statistically validated weighting mechanism.
==================================================
7. ORTHOGONAL ALPHA
This is critical.
Two strategies that look different but respond to the same underlying risk are NOT independent.
Calculate:
feature correlation
signal correlation
return correlation
drawdown correlation
regime correlation
Prefer genuinely orthogonal alpha sources.
Portfolio breadth should measure the number of truly independent sources of return.
==================================================
8. AI MODEL ARCHITECTURE
Do not force one AI model to solve everything.
Create a model hierarchy:
LEVEL 1:
Deterministic Feature/Indicator Engines
LEVEL 2:
Statistical Models
LEVEL 3:
Machine Learning Models
Examples where justified:
Gradient Boosting
Random Forest
XGBoost/LightGBM
Neural Networks
Sequence Models
Temporal Models
Regime Models
LEVEL 4:
Meta-Model
LEVEL 5:
LLM Intelligence Layer
LLM is NOT the numerical trading oracle.
Use LLM for:
News analysis
Macro interpretation
Narrative extraction
Event classification
Research
Hypothesis generation
Signal explanation
Conflict analysis
Decision trace
Numerical trade decisions must remain grounded in structured market data and validated quantitative models.
==================================================
9. NEWS + LLM INTELLIGENCE
Create:
NEWS INGESTION
→ ENTITY RESOLUTION
→ EVENT CLASSIFICATION
→ SENTIMENT
→ SURPRISE
→ IMPORTANCE
→ EXPECTED MARKET IMPACT
→ AFFECTED ASSETS
→ TIME HORIZON
→ CONFIDENCE
→ MARKET CONFIRMATION
Never allow an LLM-generated news interpretation to directly place an order.
Require quantitative confirmation.
Prevent hallucinated news.
Store source, timestamp and evidence for every news-derived signal.
==================================================
10. MACRO / QUANTAMENTAL LAYER
Build a point-in-time macro intelligence layer.
Track:
inflation
growth
employment
interest rates
central banks
yield curve
DXY
VIX
US10Y
commodities
equities
credit conditions
liquidity
global risk sentiment
Do not use revised future macro data in historical backtests.
Use point-in-time data only.
==================================================
11. PORTFOLIO CONSTRUCTION
Do not evaluate trades independently only.
Evaluate the portfolio.
Calculate:
gross exposure
net exposure
sector exposure
asset exposure
currency exposure
market exposure
strategy exposure
factor exposure
correlation
concentration
portfolio volatility
expected drawdown
liquidity risk
A good trade may be rejected because portfolio risk is already too high.
==================================================
12. RISK ENGINE
Risk must be independent from the AI model.
Implement:
risk per trade
volatility-adjusted sizing
portfolio risk budget
maximum daily loss
maximum weekly drawdown
maximum strategy drawdown
maximum correlated exposure
maximum leverage
liquidation-distance protection
spread protection
slippage protection
liquidity protection
news-event risk reduction
AI cannot override hard risk limits.
==================================================
13. EXECUTION INTELLIGENCE
Execution is part of the strategy.
Estimate:
spread
slippage
market depth
liquidity
funding
fees
latency
order-book conditions
market impact
execution probability
Choose intelligently between:
market
limit
stop
stop-limit
TWAP
VWAP
iceberg where supported
Never assume theoretical entry price equals executable price.
==================================================
14. COST-AWARE LEARNING
Every model evaluation must include:
commission
spread
slippage
funding
borrow cost where applicable
market impact
latency assumptions
Report:
GROSS PERFORMANCE
NET PERFORMANCE
Never optimize gross returns while ignoring costs.
==================================================
15. NON-STATIONARY / ONLINE LEARNING
Markets evolve.
Create model monitoring:
prediction drift
feature drift
regime drift
performance drift
correlation drift
execution drift
Do not automatically retrain blindly.
Use controlled retraining:
RESEARCH
→ VALIDATE
→ SHADOW
→ PAPER
→ APPROVE
→ DEPLOY
Version every model.
==================================================
16. BACKTEST INTEGRITY
Implement strict anti-overfitting controls.
Track:
number of experiments
number of parameter configurations
dataset versions
feature versions
model versions
training periods
validation periods
test periods
Use:
walk-forward validation
out-of-sample testing
rolling validation
purged validation where applicable
embargo where applicable
parameter sensitivity
Monte Carlo
trade-order randomization
stress testing
regime testing
Estimate Probability of Backtest Overfitting where practical.
A high Sharpe alone is NEVER sufficient.
==================================================
17. DATA LEAKAGE PROTECTION
Absolutely prohibit:
future candles
future volume
future OI
future funding
future liquidation data
future news
revised macro data
look-ahead normalization
future-derived labels leaking into features
Every feature must have a timestamp and availability timestamp.
==================================================
18. SYNTHETIC / STRESS DATA
Where appropriate, create synthetic market scenarios preserving:
return distribution
volatility clustering
cross-asset correlation
autocorrelation
liquidity stress
regime transitions
Use synthetic data for robustness testing, not as a replacement for real market validation.
==================================================
19. MODEL EXPLAINABILITY
Every AI trade decision must produce:
REGIME
STRATEGY
TOP FEATURES
FEATURE DIRECTION
MODEL CONFIDENCE
EXPECTED EDGE
EXPECTED R
RISK
CONFLICTING SIGNALS
REASON FOR TRADE
REASON AGAINST TRADE
FINAL DECISION
Possible decisions:
LONG
SHORT
WAIT
REDUCE
EXIT
Store a complete immutable Decision Trace.
==================================================
20. MODEL GOVERNANCE
Create:
model registry
model version
training dataset version
feature version
hyperparameters
training date
validation results
deployment date
performance after deployment
drift status
rollback/shadow version
No untracked model may trade LIVE.
==================================================
21. HUMAN / AI COMPLEMENTARITY
Do not assume AI is always superior.
Build the architecture so:
SYSTEMATIC SIGNAL
+
AI CONTEXT
+
RISK ENGINE
+
EXECUTION ENGINE
can disagree.
When disagreement is significant:
reduce position
WAIT
or NO TRADE
Do not force a prediction.
==================================================
22. MULTI-MARKET TRANSFER
The same architecture must work across:
Crypto
Forex
Gold
US Stocks
ETFs
But DO NOT assume identical parameters.
Each market gets:
market-specific volatility
market-specific liquidity
market-specific session
market-specific costs
market-specific leverage
market-specific feature relevance
market-specific model calibration
==================================================
23. TIMEFRAME HIERARCHY
Use:
Higher timeframe
→ market regime
Middle timeframe
→ strategy/setup
Lower timeframe
→ execution
Do not hard-code one timeframe.
Allow AI to choose the appropriate timeframe according to:
market
regime
volatility
liquidity
strategy
holding horizon
==================================================
24. FEEDBACK LOOP
After every closed trade record:
predicted edge
predicted probability
actual return
actual R
maximum favorable excursion
maximum adverse excursion
slippage
execution quality
regime
strategy
features
news
whale state
portfolio state
Then analyze:
WHY DID IT WIN?
WHY DID IT LOSE?
WAS THE REGIME WRONG?
WAS THE SIGNAL WRONG?
WAS EXECUTION WRONG?
WAS RISK WRONG?
Use this for controlled research improvement.
Do NOT allow uncontrolled self-learning to modify LIVE trading logic.
==================================================
25. FINAL TIKALGO ARCHITECTURE
Target architecture:
DATA SOURCES
↓
DATA QUALITY / TIMESTAMP GOVERNANCE
↓
FEATURE FACTORY
↓
MARKET REGIME ENGINE
↓
ALPHA RESEARCH ENGINE
↓
STRATEGY ENSEMBLE
↓
AI META-MODEL
↓
PORTFOLIO CONSTRUCTION
↓
RISK ENGINE
↓
EXECUTION INTELLIGENCE
↓
ORDER EXECUTION
↓
POSITION MONITORING
↓
TRADE JOURNAL
↓
OUTCOME ANALYSIS
↓
RESEARCH / MODEL IMPROVEMENT
Parallel Intelligence:
NEWS
MACRO
SOCIAL
ON-CHAIN
WHALE
SENTIMENT
ALTERNATIVE DATA
→ FEATURE FACTORY / AI CONTEXT
==================================================
26. DO NOT BUILD A BLACK BOX
The final system must answer:
WHY THIS MARKET?
WHY THIS DIRECTION?
WHY THIS STRATEGY?
WHY NOW?
WHAT DATA SUPPORTS IT?
WHAT DATA CONTRADICTS IT?
WHAT IS THE EXPECTED EDGE?
WHAT IS THE EXPECTED R?
WHAT IS THE RISK?
WHAT WOULD INVALIDATE THE TRADE?
WHAT WOULD MAKE THE SYSTEM EXIT?
==================================================
27. RESEARCH-FIRST IMPLEMENTATION
Before modifying code:

1. Inspect current TIKALGO architecture.
2. Map existing modules.
3. Identify reusable engines.
4. Identify missing capabilities.
5. Create an architecture gap report.
6. Create a source-to-feature matrix.
7. Create a source-to-strategy matrix.
8. Create the proposed model hierarchy.
9. Create the validation methodology.
10. Only then implement.

Do not rewrite working components unnecessarily.
==================================================
28. TESTING
Add tests for:
data timestamp integrity
feature leakage
regime detection
alpha generation
strategy selection
model prediction
portfolio construction
risk limits
correlation
execution cost
slippage
news timestamps
macro point-in-time data
model versioning
decision trace
backtesting
walk-forward
paper trading
Do not delete or weaken existing tests.
==================================================
29. LIVE SAFETY
LIVE trading must remain OFF by default.
Required lifecycle:
RESEARCH
→ BACKTEST
→ OUT-OF-SAMPLE
→ WALK-FORWARD
→ STRESS TEST
→ PAPER
→ SHADOW MODE
→ PERFORMANCE REVIEW
→ MANUAL APPROVAL
→ LIVE
Never automatically activate LIVE.
==================================================
30. FINAL DELIVERABLE
Return a complete research and implementation report containing:
A. Current TIKALGO architecture assessment
B. Existing reusable modules
C. Missing institutional capabilities
D. Lessons extracted from each public institutional source
E. Source → principle → implementation mapping
F. Final TIKALGO architecture
G. Final AI/Quant model hierarchy
H. Feature architecture
I. Regime engine
J. Alpha engine
K. Strategy ensemble
L. Meta-model
M. Portfolio construction
N. Risk engine
O. Execution intelligence
P. News/LLM architecture
Q. Model governance
R. Anti-overfitting methodology
S. Tests added
T. Files modified
U. Backtest results
V. Paper/shadow validation results
W. Remaining weaknesses
X. Exact next implementation steps
MOST IMPORTANT:
Do not attempt to reproduce proprietary algorithms of JPMorgan, Two Sigma, Citadel, Man Group, AQR, BlackRock or any other institution.
Instead, extract publicly documented principles and combine them with TIKALGO's existing technology into an ORIGINAL, explainable, adaptive, multi-market quantitative intelligence system.
The objective is not:
"predict the next candle."
The objective is:
"identify repeatable sources of expected edge, determine when they are active, combine independent evidence, construct the safest portfolio expressing that edge, execute efficiently, measure the outcome, detect model failure and continuously improve through controlled research."
Build TIKALGO around this principle.  این را به فایل تحقیق اضافه و ترکیب و تکمیل کنید که هدف ارتقا موتور سیگنال پروژه و مدیریت معاملات و سرمایه است و اینکه چطور میتوان از انها در پروژه استفاده کرد
