# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm is declared in the package's own contract and absent from the surface it ships.**

**Corrected 2026-10-30 after reading `../Provident-Storeroom/`**: the first version of this row said the arm was
undocumented, and that was wrong — it *is* documented, in the package's own spec, not in the artifact consumers install.

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
- **Also worth telling a consumer:** the two instants read the same shape differently — own-property at landing, prototype
  chain at registration — so an **inherited** `repair` registers and is then read as carrying none (that repo's own measured
  divergence, not ours).
- **Proposed fix shape — documentation only, not pushed (D-5, D-24).** State the `{ message, repair }` shape, and that
  `repair` is a **function invoked inside the attempt's commit**, in `index.d.ts`'s `Constraint` docblock and in one example
  beside `landing-page-must-stand` at `guide §7.7`; re-point the docblock's `kernel-surface.md §2.3` citation at a shipped
  path. **No export, no symbol, no behaviour change is asked for.**

## 2. The census this unit moved

**Written names: two → three, and back to two.** This unit's own instance creates `provident-tabs-record.json` at boot, so
`DECLARED_WRITTEN_JSON` in `tests/store-compliance-live.mjs` carries three **at this head**. **D-64 supersedes it**: the
record moves onto the app's central instance, the third name goes, and the set returns to two — blocked on `central-data`'s
L2 (`strata/pending.md` row 6) because sharing that instance moves when the profile file is created.

## 3. Until the finding lands
**The arm is implemented**: `docs/L3/store-tabs-record/design.md` §4 rev 3 declares the `{ message, repair }` return, the
boundary's corrective write makes a legal state arrive, and the engine's arm guards every other route (the L4 adjudication:
`.strata/returns/store-tabs-record-l2-resolution.json`).
