# Survey results block

| | |
|---|---|
| **Area** | `research` |
| **Where in TIKALGO** | User feedback / sentiment poll results |
| **Before using** | Read [`README.md`](./README.md) → "TIKALGO adaptation rules" and paste them after the prompt |

## Prompt (original)
```text
Create a survey results block with Tailwind CSS. Use a max-w-2xl card with a question as the heading, a muted line giving the response count and the fieldwork dates, and a small "Multiple answers allowed" note. The results are six rows: each row is a full-width bordered rounded-xl bar container where a tinted fill sits behind the content at the answer percentage, and above it a flex row holding the answer label on the left and the percentage plus raw count on the right in monospace. Make the leading answer use a neutral-900 fill with white text and the rest a light neutral fill with dark text. Under the rows, a small horizontal divider then a two-column footer: a note on the method on the left, and on the right two links for the raw data and the previous wave. Add a small "Change since last wave" column of tiny green or red deltas beside each percentage.
```
