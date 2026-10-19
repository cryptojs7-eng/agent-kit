# slides skills

Vendored from [jameshemson/slides](https://github.com/jameshemson/slides) v0.20.0
at commit `245c0e6858df9afe6a3381e36244812f3d2e4452` (MIT, see `LICENSE`), copied
from the upstream Claude Code build in `.claude/skills/`.

- `presentation-craft` — shared knowledge base the other skills read (not invoked directly).
- `teach-slides` — capture your brand into a `.slides/` profile.
- `narrative` — shape a vague idea into a deck story and spec.
- `build-deck` — render the spec into an on-brand `.pptx`.
- `slop-check` — audit a deck spec or `.pptx` for generic AI slop.
- `revise` — change a rendered deck by conversation and re-render.

`build-deck` and `revise` need Python 3.9+ with `python-pptx`; the default render
path also needs Node 22+ and `npm install --prefix .slides pptxgenjs@4.0.1`.
LibreOffice is optional, for the visual render-back check.
