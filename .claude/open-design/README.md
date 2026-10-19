# Open Design skills

Vendored from [mojila/open-design-kilo](https://github.com/mojila/open-design-kilo)
at commit `afbc9686f1350dae29da2e532f71d2ed51d3e6bc` (Apache-2.0, see `LICENSE`).

- `.claude/skills/*` — 31 design skills (web-prototype, dashboard, saas-landing,
  simple-deck, magazine-web-ppt, mobile-app, pricing-page, critique, tweaks, …).
  Claude Code picks them up automatically from this repo.
- `.claude/open-design/design-systems/*/DESIGN.md` — 71 design systems the skills
  read their tokens from. In upstream Open Design the daemon injects the active
  DESIGN.md; here, point the agent at one explicitly, e.g.
  "use the dashboard skill with `.claude/open-design/design-systems/linear-app/DESIGN.md`".

`skills/guizang-ppt` keeps its own upstream LICENSE.
