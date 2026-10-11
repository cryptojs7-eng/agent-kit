> Extracted from [`TIKALGO_MASTER_PROMPT.md`](../../TIKALGO_MASTER_PROMPT.md). That file is the source of truth; after editing it, run `python3 docs/tikalgo/prompts/split_master.py`.

## 6. فاز D به بعد — ابرپروژه (طبق `TIKALGO_SUPER_PLAN.md`)

> هر فاز فقط بعد از تکمیل و تأیید فاز قبل. پرامپت عمومی:
```text
PHASE <N> per docs/TIKALGO_SUPER_PLAN.md §15.2 (modules <IDs>). Reuse what Phase C built
(signal schema, state machine, risk engine, execution gate, position manager). Follow MASTER
RULES. Tests first. Persian report + Save State at the end.
```

| فاز | محتوا | ماژول‌ها |
|---|---|---|
| D1 | Data Fabric: قراردادهای کانونی، Event Bus روی Redis Streams، WS صرافی‌ها، حل `runtime_stale` | M01، M02، M10 |
| D2 | Intelligence: TA، SMC/ICT، Order Flow/CVD، OI/Funding، Regime، Cross-Asset، Pump/Dump | M11 تا M14، M19 تا M22 |
| D3 | نهنگ‌ها و آن‌چین: Hyperliquid Whale Engine، WhaleScore، جریان صرافی‌ها | M07، M08، M15 |
| D4 | News، Social و Macro: Event Impact، روایت‌ها، تقویم اقتصادی | M05، M06، M09، M16 تا M18 |
| D5 | AI Decision: Router، تحلیلگرها، Critic، RAG/Memory، Local Model Gateway و Registry | M23 تا M26، M28 |
| D6 | Portfolio و Capital (چندحسابی) | M31، M32 |
| D7 | Execution: LBank Futures live، Hyperliquid live، Broker Hub (MT5) و Smart Router | M29، M30، M33، M03، M04، M34 |
| D8 | Research Lab: SDK، Backtest و Optimizer | M35 تا M37 |
| D9 | Learning و Skill Registry | M38، M39، M27 |
| D10 | Product: Alerts، Admin/SaaS، Payment، Voice، Chat، PWA و Landing (ترمینال در فاز T ساخته شده؛ اینجا فقط توسعه) | M40 تا M50 |
| D11 | Production Hardening | امنیت، DR و تست بار |
