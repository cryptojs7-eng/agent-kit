# TAMRS: TIKALGO Adaptive Multi-Regime Strategy
## Research report and implementation specification (v1)

> **Status:** this is a research and specification document. It was written **without access to
> the TIKALGO code** (`/root/tikalgo` is only on the production server). It contains:
> - no code changes;
> - no backtest results.
>
> All numbers below are **starting defaults to be validated**, not results. The code inspection,
> implementation, backtests and robustness tests are run by Claude Code on the server, following
> `TIKALGO_MASTER_PROMPT.md` §17. That step reuses existing engines and contracts.
>
> **Sources** were used only as research inputs:
> - the authors' and publishers' official pages;
> - the publicly released *Original Turtle Trading Rules* (Curtis Faith, distributed free by the author);
> - books the project legally owns.
>
> No pirated copies were used. The strategy does not reproduce any single source.

---

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
