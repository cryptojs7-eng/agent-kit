# Live activity strip

| | |
|---|---|
| **Area** | `landing` |
| **Where in TIKALGO** | Landing "live" band: events processed, markets online — bind to real metrics |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a live activity strip with Tailwind CSS. Use a full-width neutral-950 band containing a max-w-5xl flex row that wraps: on the left, a pill with a pulsing green dot reading "Live", a large monospaced counter with thousands separators, and a small label beneath reading events processed today. In the middle, a thin vertical rule and two secondary figures stacked with muted labels — active regions and current throughput per second. On the right, a compact bar chart of twelve slim vertical bars in varying heights representing the last twelve minutes, with the newest bar highlighted in green. Then add JavaScript that increments the main counter by a small random amount several times a second with a brief highlight flash on change, updates the throughput figure every two seconds, and every five seconds shifts the bar chart left by dropping the first bar and appending a new one with a random height.
```
