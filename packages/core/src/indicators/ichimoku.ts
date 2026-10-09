export interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface IchimokuParams {
  tenkanPeriod: number;
  kijunPeriod: number;
  senkouBPeriod: number;
  displacement: number;
}

export const DEFAULT_ICHIMOKU_PARAMS: IchimokuParams = {
  tenkanPeriod: 9,
  kijunPeriod: 26,
  senkouBPeriod: 52,
  displacement: 26,
};

export interface IchimokuPoint {
  openTime: number;
  close: number;
  tenkanSen: number | null;
  kijunSen: number | null;
  /** Senkou Span A plotted at this candle (computed `displacement` bars earlier). */
  senkouSpanA: number | null;
  /** Senkou Span B plotted at this candle (computed `displacement` bars earlier). */
  senkouSpanB: number | null;
  /** Close price `displacement` bars in the future, plotted at this candle (null for the latest bars). */
  chikouSpan: number | null;
}

export interface IchimokuSignals {
  priceVsCloud: "above" | "below" | "inside" | "unknown";
  tkCross: "bullish" | "bearish" | "none";
  tenkanVsKijun: "above" | "below" | "equal" | "unknown";
  futureCloud: "bullish" | "bearish" | "flat" | "unknown";
  chikouVsPrice: "above" | "below" | "equal" | "unknown";
  trend: "bullish" | "bearish" | "neutral";
}

export interface IchimokuResult {
  params: IchimokuParams;
  latest: IchimokuPoint | null;
  /** Projected cloud for the next `displacement` bars (Span A / Span B computed from the most recent candles). */
  futureCloud: Array<{ barsAhead: number; senkouSpanA: number | null; senkouSpanB: number | null }>;
  signals: IchimokuSignals;
  series: IchimokuPoint[];
}

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : NaN;
}

/** Parse Toobit kline rows (arrays `[openTime, open, high, low, close, ...]` or objects) into candles. */
export function parseCandles(raw: unknown): Candle[] {
  if (!Array.isArray(raw)) return [];
  const candles: Candle[] = [];
  for (const row of raw) {
    let candle: Candle | undefined;
    if (Array.isArray(row)) {
      candle = {
        openTime: toNumber(row[0]),
        open: toNumber(row[1]),
        high: toNumber(row[2]),
        low: toNumber(row[3]),
        close: toNumber(row[4]),
      };
    } else if (row && typeof row === "object") {
      const r = row as Record<string, unknown>;
      candle = {
        openTime: toNumber(r.t ?? r.openTime ?? r.time),
        open: toNumber(r.o ?? r.open),
        high: toNumber(r.h ?? r.high),
        low: toNumber(r.l ?? r.low),
        close: toNumber(r.c ?? r.close),
      };
    }
    if (candle && [candle.high, candle.low, candle.close].every(Number.isFinite)) candles.push(candle);
  }
  return candles.sort((a, b) => a.openTime - b.openTime);
}

/** Midpoint of the highest high and lowest low over `period` bars ending at `index`. */
function midpoint(candles: Candle[], index: number, period: number): number | null {
  if (index < period - 1) return null;
  let high = -Infinity;
  let low = Infinity;
  for (let i = index - period + 1; i <= index; i++) {
    if (candles[i].high > high) high = candles[i].high;
    if (candles[i].low < low) low = candles[i].low;
  }
  return (high + low) / 2;
}

function compare(a: number | null, b: number | null): "above" | "below" | "equal" | "unknown" {
  if (a === null || b === null) return "unknown";
  if (a > b) return "above";
  if (a < b) return "below";
  return "equal";
}

export function computeIchimoku(candles: Candle[], params: IchimokuParams = DEFAULT_ICHIMOKU_PARAMS): IchimokuResult {
  const { tenkanPeriod, kijunPeriod, senkouBPeriod, displacement } = params;
  const n = candles.length;

  const tenkan = candles.map((_, i) => midpoint(candles, i, tenkanPeriod));
  const kijun = candles.map((_, i) => midpoint(candles, i, kijunPeriod));
  // Unshifted leading spans, as computed at each bar.
  const spanA = candles.map((_, i) => (tenkan[i] !== null && kijun[i] !== null ? (tenkan[i]! + kijun[i]!) / 2 : null));
  const spanB = candles.map((_, i) => midpoint(candles, i, senkouBPeriod));

  const series: IchimokuPoint[] = candles.map((c, i) => {
    const src = i - displacement;
    return {
      openTime: c.openTime,
      close: c.close,
      tenkanSen: tenkan[i],
      kijunSen: kijun[i],
      senkouSpanA: src >= 0 ? spanA[src] : null,
      senkouSpanB: src >= 0 ? spanB[src] : null,
      chikouSpan: i + displacement < n ? candles[i + displacement].close : null,
    };
  });

  const futureCloud = [];
  for (let k = 1; k <= displacement; k++) {
    const src = n - 1 - displacement + k;
    futureCloud.push({
      barsAhead: k,
      senkouSpanA: src >= 0 && src < n ? spanA[src] : null,
      senkouSpanB: src >= 0 && src < n ? spanB[src] : null,
    });
  }

  const latest = n > 0 ? series[n - 1] : null;
  const signals = deriveSignals(candles, series, spanA, spanB, displacement);

  return { params, latest, futureCloud, signals, series };
}

function deriveSignals(
  candles: Candle[],
  series: IchimokuPoint[],
  spanA: Array<number | null>,
  spanB: Array<number | null>,
  displacement: number,
): IchimokuSignals {
  const n = candles.length;
  const last = series[n - 1];
  const prev = series[n - 2];

  let priceVsCloud: IchimokuSignals["priceVsCloud"] = "unknown";
  if (last && last.senkouSpanA !== null && last.senkouSpanB !== null) {
    const top = Math.max(last.senkouSpanA, last.senkouSpanB);
    const bottom = Math.min(last.senkouSpanA, last.senkouSpanB);
    priceVsCloud = last.close > top ? "above" : last.close < bottom ? "below" : "inside";
  }

  let tkCross: IchimokuSignals["tkCross"] = "none";
  if (last && prev && last.tenkanSen !== null && last.kijunSen !== null && prev.tenkanSen !== null && prev.kijunSen !== null) {
    if (prev.tenkanSen <= prev.kijunSen && last.tenkanSen > last.kijunSen) tkCross = "bullish";
    else if (prev.tenkanSen >= prev.kijunSen && last.tenkanSen < last.kijunSen) tkCross = "bearish";
  }

  const tenkanVsKijun = last ? compare(last.tenkanSen, last.kijunSen) : "unknown";

  // The cloud that will be plotted `displacement` bars ahead is built from the latest spans.
  const a = n > 0 ? spanA[n - 1] : null;
  const b = n > 0 ? spanB[n - 1] : null;
  const futureCloud: IchimokuSignals["futureCloud"] =
    a === null || b === null ? "unknown" : a > b ? "bullish" : a < b ? "bearish" : "flat";

  // Chikou (latest close) compared with the price `displacement` bars ago.
  const pastIdx = n - 1 - displacement;
  const chikouVsPrice = pastIdx >= 0 ? compare(candles[n - 1].close, candles[pastIdx].close) : "unknown";

  const bullish = [priceVsCloud === "above", tenkanVsKijun === "above", futureCloud === "bullish", chikouVsPrice === "above"];
  const bearish = [priceVsCloud === "below", tenkanVsKijun === "below", futureCloud === "bearish", chikouVsPrice === "below"];
  const trend = bullish.every(Boolean) ? "bullish" : bearish.every(Boolean) ? "bearish" : "neutral";

  return { priceVsCloud, tkCross, tenkanVsKijun, futureCloud, chikouVsPrice, trend };
}
