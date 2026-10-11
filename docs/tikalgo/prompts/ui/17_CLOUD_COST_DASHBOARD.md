# Cloud / infrastructure cost dashboard

| | |
|---|---|
| **Area** | `admin` |
| **Where in TIKALGO** | Admin → server, data-feed and API costs vs budget |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Design a cloud cost dashboard with Tailwind CSS. The header holds a title, a muted month label, a month-picker select and an outline "Set a budget" button. Below, three summary cards: month to date with a large figure and a small delta pill, forecast for the month with a muted note about the method, and budget with a thin track showing the percentage consumed and an amber fill when past eighty percent. Then a table of six services with columns for service, this month, last month, change and a share bar; the change column uses green and red arrows and the share column draws a thin neutral-900 bar with the percentage beside it. Highlight the largest row with a faint background. Under the table, two footnote lines about tax exclusion and the daily refresh time, plus a link to the detailed breakdown.
```
