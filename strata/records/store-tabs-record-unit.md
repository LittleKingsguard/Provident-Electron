# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm is declared in the package's own contract and absent from the surface it ships.**

**Corrected 2026-10-30 after reading the upstream checkout** (`../Provident-Storeroom/`): the first version of this row
said the arm was undocumented, and that was wrong. It *is* documented — in the package's own spec, not in the artifact a
consumer installs.

- **What IS documented, and precisely.** the package's own **constraint contract** §(viii) (the sibling `../Provident-Storeroom/` checkout's constraint contract, upstream — no path of this repo) (added 2026-10-30 by that
  repo's gate-3 append pass, on its `D-86`/`D-85`) states that *one returned shape* answers the registration instant and
  the write's evaluation, and names the members: **`message` and `repair`**, read by own-property forms at the landing
  instant and through the prototype chain at registration. The implementation matches: the kernel's attempt binding (`bindings/js/src/entry/kernel-attempt.mjs`, upstream)
  reads an own `message`, then an own `repair`, and where `typeof outcomeRepair === 'function'` invokes it as
  `repair(repairContext)` through `repairInCommit` — so **the repair is a function**, and its writes join the attempt's own
  commit (that repo's `D-45`, `D-46` item 2).
- **What is NOT documented, which is the finding.** The **shipped** artifact does not carry it: `index.d.ts` types
  `Constraint` as `(context: unknown) => unknown`, `grep 'repair:'` is **0** in `index.d.ts` and **0** in
  `README.guide.md`, and the guide's only worked example shows the pass and rejection arms. A consumer installing the
  package therefore cannot learn the arm's shape from the package, and the docblock's own citation points at
  `kernel-surface.md §2.3` — a file the repo has **archived** (that repo's own `archive/pre-strata-docs-2026-10-24/` copy of `kernel-surface.md`)
  and does not ship.
- **A second thing the contract states and a consumer should be told.** The two instants read the same shape differently —
  own-property at the landing instant, prototype chain at registration — so an **inherited** `repair` registers and is then
  read as carrying none. That is the repo's own measured divergence, not ours.
- **Proposed fix shape — documentation only, and not pushed (D-5, D-24).** State the `{ message, repair }` shape, including
  that `repair` is a **function invoked inside the attempt's commit**, in `index.d.ts`'s `Constraint` docblock and in one
  example beside `landing-page-must-stand` at `guide §7.7`; and re-point the docblock's `kernel-surface.md §2.3` citation at
  a shipped path. **No export, no symbol, no behaviour change is asked for.**

## 2. The census this unit moved

**Written names: two → three.** The app now creates `provident-tabs-record.json` at boot beside the profile store's file
and the operator's, so `DECLARED_WRITTEN_JSON` in `tests/store-compliance-live.mjs` (the instrument) carries three and every
reader of that set follows it. The settings-carrier layer's "three written names to two" is that unit's own dated reading of
its own move and is not re-opened by this one (D-46).

## 3. What this unit carries until the finding lands

**The gate is the engine's and the repair is the boundary's**, on exactly this ground: `docs/L3/store-tabs-record/design.md` §4
rev 2 states the split, and the L4 adjudication that raised it is resolved at
`.strata/returns/store-tabs-record-l2-resolution.json`. When ST-F1 lands, the corrective write can move into the constraint
body as a returned repair and the boundary's copy becomes redundant — a change this unit does not make until the shape is
documented, because a return invented here would be an implementation guessed against an unshipped spec.
