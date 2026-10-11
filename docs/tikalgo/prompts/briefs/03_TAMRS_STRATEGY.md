# TAMRS — adaptive multi-regime strategy research

| | |
|---|---|
| **Area** | Strategy engine |
| **Executable version / spec** | Spec Part II · MASTER §17 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

You are the Lead Quant Architect and Senior Trading-System Engineer of the existing TIKALGO project.
IMPORTANT:
Do NOT create a toy strategy, standalone bot, duplicate engine, mock data, or isolated framework.
First inspect the EXISTING TIKALGO architecture, strategy engine, feature engine, SMC/ICT modules, risk engine, market-regime logic, scanner, AI Decision layer, backtesting, paper trading, execution layer, Redis, PostgreSQL/TimescaleDB, APIs, workers, tests and frontend contracts.
Reuse existing components and contracts wherever possible.
GOAL:
Research the following proven trading literature and extract their most useful, objectively codable principles, then COMBINE them into a NEW adaptive multi-market TIKALGO strategy rather than blindly copying any single strategy.
PRIMARY SOURCES:

1. Market Wizards — Jack D. Schwager
https://www.wiley-vch.de/en/areas-interest/finance-economics-law/market-wizards-978-1-118-27305-0
2. The New Market Wizards — Jack D. Schwager
https://www.wiley-vch.de/en/areas-interest/finance-economics-law/the-new-market-wizards-978-1-59280-337-8
3. Hedge Fund Market Wizards — Jack D. Schwager
https://onlinelibrary.wiley.com/doi/book/10.1002/9781119203469
4. Trend Following — Michael W. Covel
https://www.trendfollowing.com/translations/
5. The Complete TurtleTrader / Turtle Trading resources — Michael Covel
https://www.trendfollowing.com/resources/
6. Trade Your Way to Financial Freedom — Van K. Tharp
https://www.mheducation.com/highered/mhp/product/trade-your-way-financial-freedom.html

Use official/publicly available material and any legally available PDFs/books already present in the project. Do NOT download or use pirated copyrighted copies.
EXTRACT THESE CORE IDEAS:
A) MARKET WIZARDS
Extract recurring principles from successful traders:

* risk control
* asymmetric reward/risk
* cutting losses
* letting winners run
* position sizing
* trading discipline
* market adaptation
* independent decision making
* avoiding overtrading
* different trader styles and when each works

B) TREND FOLLOWING / TURTLE
Extract:

* breakout logic
* Donchian-style channels
* trend confirmation
* ATR/volatility normalization
* position sizing by volatility
* pyramiding where justified
* trailing exits
* long-term trend persistence
* systematic execution
* robustness across markets

C) VAN THARP
Extract:

* expectancy
* R-multiples
* position sizing
* risk per trade
* portfolio risk
* reward/risk
* drawdown control
* strategy-personality/market compatibility

D) COMBINE WITH EXISTING TIKALGO INTELLIGENCE
Use existing TIKALGO modules where available:

* SMC / ICT
* Market Structure
* BOS / CHOCH
* Liquidity Sweeps
* FVG / Order Blocks
* ATR
* ADX
* RSI
* Kijun / Ichimoku
* Volume
* CVD / Delta
* Open Interest
* Funding
* Liquidations
* DOM / liquidity walls
* Whale intelligence
* Hyperliquid whale positions
* market news/sentiment
* macro regime
* BTC dominance
* DXY
* VIX
* US10Y
* Gold
* Nasdaq/S&P500
* Fear & Greed
* correlation
* volatility regime

DO NOT blindly combine every indicator.
Use only features that provide independent information.
Detect and remove redundant/correlated signals.
BUILD:

1. MARKET REGIME ENGINE

Classify market into:

* TREND_UP
* TREND_DOWN
* RANGE
* BREAKOUT
* HIGH_VOLATILITY
* LOW_VOLATILITY
* REVERSAL
* UNCERTAIN

2. ADAPTIVE STRATEGY ROUTER

The system must dynamically choose the best strategy for the current regime.
Examples:
TREND_UP:
Trend Following + Turtle + Pullback
TREND_DOWN:
Trend Following + Turtle Short + Pullback Short
RANGE:
Mean Reversion + Liquidity Sweep
BREAKOUT:
Breakout + Volatility Expansion
HIGH_VOLATILITY:
Breakout / Momentum with reduced position size
LOW_VOLATILITY:
Squeeze / Compression setup
REVERSAL:
Liquidity Sweep + Structure Shift + Order Flow
UNCERTAIN:
NO TRADE

3. ENTRY ENGINE

A trade must require confluence, not one indicator.
Generate:

* direction
* setup
* entry
* invalidation
* stop loss
* TP1/TP2/TP3
* trailing logic
* confidence
* expected R
* risk
* position size
* leverage recommendation

4. EXIT ENGINE

Implement:

* hard SL
* structure invalidation
* ATR stop
* trailing stop
* partial profit
* break-even logic
* time-based exit
* regime-change exit
* opposite-signal exit

5. RISK ENGINE

Use expectancy and R-multiple concepts.
Support:

* configurable risk/trade
* volatility-adjusted position sizing
* maximum portfolio risk
* maximum correlated exposure
* daily loss limit
* drawdown protection
* leverage cap
* liquidation-distance protection

Never increase position size merely because confidence is high.

6. PORTFOLIO INTELLIGENCE

Prevent multiple correlated positions from creating hidden concentration.
Example:
BTC + ETH + SOL longs may represent one correlated crypto risk.
Calculate:

* correlation
* portfolio exposure
* strategy exposure
* market exposure
* directional exposure

7. AI DECISION LAYER

AI must NOT invent trades.
AI receives structured quantitative features and decides:

* whether a valid setup exists
* which strategy has the highest expected edge
* whether market regime supports it
* whether conflicting evidence exists
* expected R
* confidence
* risk adjustment
* reasons for NO TRADE

Every decision must be explainable.

8. STRATEGY FUSION

Do NOT simply average signals.
Create a scoring model:
Market Regime Score
+
Trend Score
+
Structure Score
+
Momentum Score
+
Volatility Score
+
Order Flow Score
+
Liquidity Score
+
Whale Score
+
Macro Score
+
News/Sentiment Score
Strategy Edge Score
Then apply:

* contradiction penalty
* correlation penalty
* uncertainty penalty
* execution/liquidity penalty

Only trade when expected edge exceeds a configurable threshold.

9. IMPORTANT:
The final product must NOT be called "Turtle", "CAN SLIM", "Market Wizards", etc.

These are RESEARCH SOURCES.
Create a new TIKALGO proprietary strategy based on extracted principles.
Suggested internal name:
TIKALGO Adaptive Multi-Regime Strategy (TAMRS)

10. MULTI-MARKET SUPPORT

The strategy must adapt to:

* Crypto Spot
* Crypto Futures
* Forex
* Gold / Metals
* US Stocks
* ETFs

Do NOT use identical parameters for all markets.
Use market-specific:

* volatility
* session
* liquidity
* spread
* fees
* funding
* leverage
* position sizing
* trading hours

11. TIMEFRAME INTELLIGENCE

Do not hard-code one timeframe.
Support:
seconds
minutes
5m
15m
1h
4h
1D
1W
1M
Use higher timeframe for regime/context and lower timeframe for execution when appropriate.

12. NON-REPAINT / DATA INTEGRITY

Absolutely prohibit:

* lookahead
* future candles
* repainting
* future volume
* future OI
* future funding
* future liquidation data
* future news information

All signals must be generated using information available at decision time.

13. BACKTESTING

Create/extend backtests for every component and the combined strategy.
Test:

* bull
* bear
* sideways
* high volatility
* low volatility
* crashes
* strong trends
* fake breakouts

Include:
Win Rate
Profit Factor
Expectancy
Average R
Max Drawdown
Sharpe
Sortino
Calmar
Total Return
Trade Count
Long/Short performance
Fees
Slippage
Funding
Spread
Market-by-market results
Regime-by-regime results

14. ROBUSTNESS

Use:

* in-sample
* out-of-sample
* walk-forward
* parameter sensitivity
* Monte Carlo
* randomized trade sequence
* realistic fees/slippage
* stress testing

Reject strategies that only work because of parameter overfitting.

15. STRATEGY RESEARCH REPORT

Before implementation, produce a concise internal report:
SOURCE
→ PRINCIPLE
→ CODABLE RULE
→ TIKALGO FEATURE
→ EXPECTED ADVANTAGE
→ FAILURE CONDITIONS
Then show exactly how the final strategy was derived from the sources.

16. IMPLEMENTATION

After research:

* implement using existing TIKALGO architecture
* do not duplicate existing engines
* create reusable strategy components
* expose configuration through existing Settings
* integrate with Scanner
* integrate with AI Signals
* integrate with Watchlist
* integrate with Paper Trading
* integrate with existing Risk Engine
* integrate with existing Execution layer
* maintain current API contracts unless absolutely necessary

17. TESTS

Add comprehensive tests for:

* regime classification
* entry
* exit
* SL/TP
* position sizing
* correlation
* risk limits
* no-repaint
* strategy routing
* AI decision
* backtest integrity
* paper execution

Do not weaken or delete existing tests.

18. PRODUCTION SAFETY

LIVE trading must remain OFF by default.
First:
Research
→ Backtest
→ Walk-forward
→ Paper Trading
→ Validation
→ Only then make LIVE activation configurable.
Do NOT automatically activate live trading.
FINAL OUTPUT:
Return:

1. Research findings
2. Extracted principles from each book
3. Final combined TIKALGO strategy
4. Exact entry/exit/risk rules
5. Architecture changes
6. Files changed
7. Tests added
8. Backtest results
9. Remaining weaknesses
10. Recommended next validation step

Most important requirement:
DO NOT build a collection of copied strategies.
BUILD ONE NEW, ADAPTIVE, REGIME-AWARE, RISK-AWARE TIKALGO STRATEGY whose components are scientifically selected from the strongest ideas in these sources and validated independently before combination.
