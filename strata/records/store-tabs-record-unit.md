# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm is declared in the package's contract and absent from the surface it ships** (corrected
2026-10-30 after reading `../Provident-Storeroom/`; the first version said "undocumented", which was wrong — it is
documented in that repo's constraint contract §(viii), never in the artifact consumers install).

- **What IS documented.** That contract states one returned shape answers the registration instant and the write's
  evaluation, naming its members **`message` and `repair`** — read by own-property forms at landing, by the prototype
  chain at registration. The kernel matches: `kernel-attempt.mjs` reads an own `message`, then an own `repair`, and an
  own `repair` that is a function is invoked through `repairInCommit`, joining the attempt's commit (`D-45`, `D-46`).
- **What is NOT documented, which is the finding.** The shipped artifact does not carry it: `index.d.ts` types
  `Constraint` as `(context: unknown) => unknown`, `grep 'repair:'` is **0** in `index.d.ts` and **0** in
  `README.guide.md`, and the guide's only worked example shows the pass and rejection arms. Its docblock cites
  `kernel-surface.md §2.3`, archived there and not shipped. **And the two instants disagree**: an inherited `repair`
  registers and is then read as carrying none.

**ST-F2 — the repair's RETURN contract is stated nowhere a consumer can read it, and its failure names the wrong
address** (measured 2026-11-01 on the installed `provident-storeroom@1.6.1`; a **defect** on that date's user ruling).

- **Symptom.** A repair that performs its write with the published verb and returns nothing is refused `{status:
  'ConstraintPassRefused', message: 'the repair <id> produced no op at <address>'}` — `<address>` being the address **the
  caller wrote**, not the one the repair wrote, so the sentence reads as an addressing fault.
- **Reproduction.** A pair at `['tabs']` whose body refuses and whose `repair` writes a legal record and returns
  `undefined`: the caller's write throws that sentence with a three-entry `log` whose **third entry says the pair
  PASSED** — the record the repair left was legal, and only the return killed it. The same body returning
  `{ ok: true, op: receipt.op }` is the whole difference.
- **Suspected root cause.** The credit path is `landedOp` (`bindings/js/src/entry/kernel-foundations.mjs`): it requires a
  non-empty `opId` absent from `attempt.ops` whose `seq` stands **strictly greater** than the invoked-for op's. A `void`
  return therefore carries "no op" (`PAR-C-8`).
- **Proposed fix shape — documentation and typing only, no behaviour change, not pushed (D-5, D-24).** (i) one example
  beside `landing-page-must-stand` at `guide §7.7` showing a repair returning its write's own op; (ii) the shape in
  `index.d.ts`'s `Constraint` docblock, named so it is typeable; (iii) the repair's own write's address in the sentence.

## 2. The census, and what stands until the findings land

**Two written names, and D-64 returned them to two** — the record's own `provident-tabs-record.json` was created at boot
and is gone now the record lives on the app's central instance. **Both arms are implemented here** (`docs/L3/
store-tabs-record/design.md` §4; the crossing meets both by construction, D-67) — but the package cannot teach either.
