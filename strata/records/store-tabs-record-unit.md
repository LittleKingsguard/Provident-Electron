# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm is declared in the package's contract and absent from the surface it shipped at `1.6.1` — DISCHARGED by
`1.6.2` at its evidence, OPEN at the two instants' divergence** (corrected 2026-10-30 after reading `../Provident-Storeroom/`; the
first version said "undocumented", which was wrong — it is in that repo's constraint contract §(viii), never in the artifact).

- **What IS documented.** That contract states one returned shape answers the registration instant and the write's evaluation,
  naming its members **`message` and `repair`** — read by own-property forms at landing, by the prototype chain at registration.
  The kernel matches: `kernel-attempt.mjs` reads an own `message`, then an own `repair`, and an own `repair` that is a function is
  invoked through `repairInCommit`, joining the attempt's commit (`D-45`, `D-46`).
- **What was NOT documented, as measured on `1.6.1` (2026-10-30, kept as that tree's own reading).** `index.d.ts` typed
  `Constraint` as `(context: unknown) => unknown`, `grep 'repair:'` read **0** in `index.d.ts` and **0** in `README.guide.md`,
  and the guide's only worked example showed the pass and rejection arms; its docblock cited a document never shipped.
- **DISCHARGED, 2026-11-01 on the installed `1.6.2`.** The contract now ships in both artifacts: `README.guide.md` §7.6 declares
  the three-arm outcome, the `message`+`repair` attach, the repair's own record and a self-contained example returning
  `{ok: true, op: landed.op}`, and `index.d.ts`'s `Constraint` docblock declares the same. `grep 'repair:'` now reads **1** in the
  guide and still **0** in `index.d.ts` — prose, not a typed member, so the count was never the measure. **Still open:** the two instants disagree.

**ST-F2 — the repair's RETURN contract is documented from `1.6.2`; its failure sentence still names the wrong address** (filed as
a **defect** on 2026-11-01, measured on the installed `provident-storeroom@1.6.1`; narrowed against `1.6.2` the same date).

- **Symptom and reproduction, re-measured on `1.6.2`.** A pair at `['a']` whose body refuses the value `2` and whose `repair`
  writes `11` at `['b']` through the published verb and returns `undefined` is refused `{status: 'ConstraintPassRefused',
  message: 'the repair <id> produced no op at a'}` — `a` being the address **the caller wrote**, not the one the repair wrote,
  so it reads as an addressing fault, while the repair's own write stands at `b`. The same body returning `{ok: true, op: landed.op}` passes; on `1.6.1` the filing added that the three-entry `log`'s third entry says the pair PASSED.
- **Suspected root cause.** The credit path is `landedOp` (`bindings/js/src/entry/kernel-foundations.mjs`): it requires a
  non-empty `opId` absent from `attempt.ops` whose `seq` stands **strictly greater** than the invoked-for op's. A `void`
  return therefore carries "no op" (`PAR-C-8`).
- **What `1.6.2` delivered, and what it owes — the finding narrowed, not deleted.** (i) DELIVERED: the worked example, at guide
  §7.6 rather than the §7.7 first proposed. (ii) HALF: the shape stands in `index.d.ts`'s docblock, but `Constraint` is **still**
  `(context: unknown) => unknown`, so the return is **not typeable** and a consumer still annotates its own. (iii) **NOT**
  DELIVERED: the release notes name the sentence's address a recorded defect row with **"no successor queued"**.

## 2. The census, and what stands until the findings land

**Two written names, and D-64 returned them to two** — the record's own `provident-tabs-record.json` was created at boot and is
gone now the record lives on the app's central instance. **Both arms are implemented here** (`docs/L3/store-tabs-record/design.md`
§4; the crossing meets both by construction, D-67) — but at `1.6.1` the package could teach neither; from `1.6.2` it teaches both.
