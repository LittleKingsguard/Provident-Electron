# record — `store-tabs-record` (unit `store-tabs-record`, D-62) — ceiling 40 lines (D-1)

## 1. Package findings (D-5, D-24 — upstream-owned, never patched here)

**ST-F1 — the repair arm is declared in the package's contract and absent from the surface it shipped at `1.6.1` — DISCHARGED by `1.6.2` at its evidence, OPEN at the two instants' divergence** (corrected 2026-10-30 after reading
`../Provident-Storeroom/`; the first version said "undocumented", which was wrong — it is in that repo's constraint contract §(viii), never in the artifact).

- **What IS documented.** That contract states one returned shape answers the registration instant and the write's evaluation, naming its members **`message` and `repair`** — read by own-property forms at landing, by the prototype chain at
  registration. The kernel matches: `kernel-attempt.mjs` reads an own `message`, then an own `repair`, and an own `repair` that is a function is invoked through `repairInCommit`, joining the attempt's commit (`D-45`, `D-46`).
- **What was NOT documented, as measured on `1.6.1` (2026-10-30, kept as that tree's own reading).** `index.d.ts` typed `Constraint` as `(context: unknown) => unknown`, `grep 'repair:'` read **0** in `index.d.ts` and **0** in
  `README.guide.md`, and the guide's only worked example showed the pass and rejection arms; its docblock cited a document never shipped.
- **DISCHARGED, 2026-11-01 on the installed `1.6.2`.** The contract now ships in both artifacts: `README.guide.md` §7.6 declares the three-arm outcome, the `message`+`repair` attach, the repair's own record and a self-contained example returning
  `{ok: true, op: landed.op}`, and `index.d.ts`'s `Constraint` docblock declares the same. At `1.6.2` `grep 'repair:'` read **1** in the guide and **0** in `index.d.ts` — prose, not a typed member, so the count was never the measure; at `1.9.0`
  (measured 2026-11-02) it reads **2** and **2**, the `index.d.ts` pair being the declared member ST-F2 (ii) quotes. **Still open:** the two instants disagree.

**ST-F2 — the repair's RETURN contract is documented from `1.6.2` and TYPED at the installed `1.9.0`; the failure sentence that names the caller's address is UNMOVED there and upstream-owned** (filed as a **defect** on
2026-11-01, measured on the installed `provident-storeroom@1.6.1`; narrowed against `1.6.2` the same date, re-read against `1.9.0` on 2026-11-02).

- **Symptom and reproduction, as measured on `1.6.2` and read again at `1.9.0`.** A pair at `['a']` whose body refuses the value `2` and whose `repair` writes `11` at `['b']` through the published verb and returns `undefined` was refused on `1.6.2` with
  `{status: 'ConstraintPassRefused', message: 'the repair <id> produced no op at a'}` — `a` being the address **the caller wrote**, not the one the repair wrote, so it reads as an addressing fault while the repair's own write stands at `b` — **READ THROUGH THE INSTALLED `1.9.1`, WHICH OVERTURNS THAT HALF: a refusing registration restores every edit it landed (release notes §1.9.1 item 4), so the write at `b` is ROLLED BACK and the 1.6.2 reading above is the reading of its own date (measured 2026-11-03; `D-86`)**; the same body
  returning `{ok: true, op: landed.op}` passed, and on `1.6.1` the filing added that the three-entry `log`'s third entry says the pair PASSED. **At `1.9.0` that shape is CREDITED rather than refused** — release notes §1.9.0 item 1: a repair answering
  `undefined`, a bare `{ok: true}`, *"or any value outside the declared arms at all"* is credited, and *"the value the repair returned is read by NOTHING"*.
- **Suspected root cause.** The `1.6.1`/`1.6.2` credit path is `landedOp` (`bindings/js/src/entry/kernel-foundations.mjs`): it requires a non-empty `opId` absent from `attempt.ops` whose `seq` stands **strictly greater** than the invoked-for
  op's, so a `void` return carried "no op" (`PAR-C-8`); `1.9.0` pins from the commit's own LEG instead — *"the attempt pins from the leg and never from the return"* (§1.9.0 item 2), which is why the op-denial half dissolved.
- **What `1.6.2` delivered, what the installed `1.9.0` discharged, and what neither owes — the finding narrowed, never deleted.** (i) DELIVERED, 2026-11-01: the worked example, at guide §7.6 rather than the §7.7 first proposed.
  (ii) **DISCHARGED, 2026-11-02 on the installed `1.9.0`** — the return IS a declared type, so a consumer no longer annotates its own: `index.d.ts` reads `export type Constraint = (context: AttemptContext) => ConstraintOutcome;` and
  `export type RepairOutcome = void | { readonly ok: true; readonly op?: WriteRecord['op'] | null } | { readonly ok: false; readonly message: string };`. The position that carries it is declared too —
  `write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord` with `interface CommitCarrier { readonly pending: readonly TriggerPair[] }`: one member, the class test's own class, where `1.7.0` — this tree's previous
  install — declared the narrower four-member `CommitRecord`, a declaration that admitted less than its own class test did. Both landed at the package's `1.8.0`, which `1.9.0` keeps and widens in `RepairOutcome` alone, and **they are what dissolved
  this app's last cast** (`writeJoined`'s `commit as CommitRecord`, `src/main/tabs-record/index.ts`), closing the one genuine grip this tree had about the position. (iii) **NOT DELIVERED, upstream-owned:** the refusal sentence is **byte-unmoved** —
  release notes §1.9.0: *"THE REFUSAL TEMPLATE IS UNMOVED"*, *"the repair `<id>` produced no op at `<address>`"* standing **byte-for-byte** — and the package's own disposition is that its recorded defect row for it is *"HALVED, not closed: the op-denial half
  dissolves by carrier, the address half survives on the nested-attempt arm, and the row stays OPEN with its population narrowed"*, with **no successor queued** (`1.6.2`'s own words) at either release.
- **This app cannot reach the surviving arm, and the finding is not pushed from here (D-5, D-24, D-52).** Every repair returns through `repairAnswer` (`src/main/tabs-record/index.ts`, three call sites) or one of its two declared
  `{ok: false, message}` arms, `TabsRepairAnswer` makes a `void` return a compile error under `npm run typecheck`, and `writeJoined` requires the carrier — so no repair opens the nested attempt the surviving sentence is aimed at. The residue is
  the package's to close; a documentation gap is filed, never patched, in this repo.

## 2. The census, and what stands until the findings land

**Two written names, and D-64 returned them to two** — the record's own `provident-tabs-record.json` was created at boot and is gone now the record lives on the app's central instance. **Both arms are implemented here**
(`docs/L3/store-tabs-record/design.md` §4; the crossing meets both by construction, D-67) — but at `1.6.1` the package could teach neither; from `1.6.2` it teaches both.
