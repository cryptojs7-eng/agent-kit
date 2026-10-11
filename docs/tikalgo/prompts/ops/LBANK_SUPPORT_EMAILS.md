# LBank — support emails (history and templates)

> **Final status (2026-10):** LBank replied that its API is **not open for commercial use**. API access is only for institutional partners, and they are **not accepting new institutional applications**. LBank futures in TIKALGO stay **data + PAPER only** (MASTER_PROMPT §16).
> Never send a full API key or secret by email or chat. Use only the last 4 characters.

## 1) First request (access + documentation)
```text
Subject: Request to enable Futures (Contract) API trading + private API documentation — UID <UID>

Hello LBank Support / API Team,

My account UID is <UID> (registered email: <EMAIL>).

I am building an automated trading integration with LBank Perpetual Futures through the
official Contract API (https://lbkperp.lbank.com, documented at
https://www.lbank.com/docs/contract.html). My futures account is funded, and I have created
an API key with trading permission only (withdrawals disabled), restricted to my server IP:
<SERVER_IP>.

The public documentation only covers the public endpoints
(/cfd/openApi/v1/pub/getTime, instrument, marketData, marketOrder).
Private requests to the contract API with my key return HTTP 403.

Could you please:
1. Enable Futures/Contract API trading access for my API key (key ending in <LAST4>),
   or tell me if a separate key type is required for contract trading.
2. Send me the official private Contract API documentation (balance, orders, positions,
   leverage/margin mode, fills, signing rules, error codes, rate limits, private WebSocket).
3. Confirm minimum order size, minimum notional and precision for BTCUSDT / ETHUSDT perpetuals.
4. Tell me whether a testnet / sandbox exists for the futures API.

Thank you.
Best regards,
<NAME>
```

## 2) Follow-up (definitive answer + escalation)
```text
Subject: Follow-up: Futures (Contract) API trading access — UID <UID> — request for a definitive answer and escalation

Hello LBank Support / API Team,

Thank you for your reply. To plan my integration correctly, please answer clearly or escalate
to the API / Institutional / Market-Maker team:

1) Availability: is perpetual-futures trading via API available for retail accounts (Yes/No)?
   If not, through which program (institutional, VIP, market-maker, broker/partner, whitelist)
   and with what requirements? Is it on the roadmap, with what timeline?
2) HTTP 403: missing permission, IP/account not whitelisted, or endpoints closed to API users?
   Is a separate key type, sub-account or permission flag required?
3) Documentation under NDA if access is possible (balance, orders, positions, leverage/margin,
   TP/SL and trigger orders, funding, signing, error codes, rate limits, private WebSocket).
4) Contract specs for BTCUSDT/ETHUSDT: min size, min notional, steps, leverage tiers, MMR, funding.
5) Testnet / sandbox availability.
6) If unavailable, please confirm explicitly and name any official alternative channel.

Account: UID <UID> · email <EMAIL> · key ending <LAST4> · IP <SERVER_IP> · trade-only, no withdrawals.
I will only use officially documented and authorized endpoints.

Best regards,
<NAME>
```

## 3) LBank's answer (recorded)
> "Sorry, but LBank's API isn't currently open for commercial use. We only provide API access to our institutional partners, and we're not accepting new institutional user applications at the moment."

**Actions taken:**
- MASTER_PROMPT §16 L5 (private adapter) stopped;
- `liveTrade=false`;
- futures execution moves to an alternative venue (Hyperliquid / CoinEx / BingX / Bybit / OKX / Bitget);
- delete the unused LBank API key;
- check LBank's terms before showing its public data commercially.
