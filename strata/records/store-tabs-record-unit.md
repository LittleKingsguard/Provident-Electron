# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm of a constraint is described but never declared, so a consumer cannot implement one.**

- **Symptom.** `provident-storeroom` documents three answers a constraint body may give — pass, **repair**, rejection — and
  ships the shape of two. `true` is declared the only pass value and an object carrying `message` is shown as the rejection
  (`index.d.ts`'s `Constraint` docblock; `README.guide.md` §7.7's `landing-page-must-stand` example), while a repair is
  described only in prose — *"a constraint that refuses `2` at its own address `['a']` **returns a repair that writes `11` at
  a different address `['b']`**"* (`guide §7.6`) — with no literal, no type and no example of what that returned value is.
- **Reproduction.** `grep -c 'repair:' index.d.ts README.guide.md` → **0 and 0**; the `Constraint` type is
  `(context: unknown) => unknown`, so the answer's shape is untyped at the position the kernel reads it; the four mentions of
  "repair" in `index.d.ts` are prose about journal commit lists (`{ kind: 'constraint-check' | 'repair-run' | … }`), never
  the body's return. The journal proves the repair arm exists; the surface never says how to ask for one.
- **Suspected root cause.** The three arms are declared in `docs/specs/storeroom-constraints/kernel-surface.md §2.3`, which
  `index.d.ts`'s own docblock cites (*"read for its answer (`kernel-surface.md §2.3` item 1: `true` is the only pass value)"*)
  and which is **not shipped with the package** — so the shipped surface documents the arms that have a literal and cites the
  third to a document a consumer does not receive.
- **Proposed fix shape.** **Documentation only, and nothing behavioural (D-24):** state the repair's return shape in
  `index.d.ts`'s `Constraint` docblock beside the pass and rejection sentences, and add one repair example beside the
  `landing-page-must-stand` example at `guide §7.7`. **No export, no new symbol, no code change is asked for** — the arm
  ships and works; what is missing is the sentence that says how to produce it.

## 2. What this unit carries until the finding lands

**The gate is the engine's and the repair is the boundary's**, on exactly this ground: `docs/L3/store-tabs-record/design.md` §4
rev 2 states the split, and the L4 adjudication that raised it is resolved at
`.strata/returns/store-tabs-record-l2-resolution.json`. When ST-F1 lands, the corrective write can move into the constraint
body as a returned repair and the boundary's copy becomes redundant — a change this unit does not make until the shape is
documented, because a return invented here would be an implementation guessed against an unshipped spec.
