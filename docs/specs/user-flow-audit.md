# Spec — the user-flow audit predicate and its trio (the live-battery hardening, FILED into this repo)

Status: **SPEC — FILED 2026-09-27** (the `U-DIVERGENCE-EXT` (`C2`) documentation pass). **`U-GAP-1` is
DISCHARGED by this filing.** Owner from here: **the spec/doc pass that next touches the live-battery
gate**; the gate instructions' own citations of `§7.1`, `§5.U`, `§6.1` and `§6.2` resolve **into this
file** from the moment it exists.

**WHAT THIS FILE IS, AND WHAT IT DELIBERATELY IS NOT.** The gate instructions cite a document named
`docs/specs/user-flow-audit.md` for four things: **the mechanical trigger predicate (`§7.1`), the capped
delta matrix (`§5.U`), the structured coverage report (`§6.1`) and the read-only audit on it (`§6.2`)**.
That document **did not exist in this tree** — eight independent confirmations are recorded in the
trackers (`docs/pending.md` §H/§I/§J, `docs/specs/gutter-ui.md` `§5.U`'s `U-GAP-1` row). **This file is
the bounded contract that closes the gap.** **IT IS SHORT AND REFERENCE-BASED BY DESIGN: it IMPORTS the
shape this repo already implements and has already executed, and it RE-DERIVES NO UNIT'S MATRIX.** The
in-repo precedents it imports from, and which a unit's own spec must be read against, are:

- **`docs/specs/gutter-ui.md` `§5.U`** — the landed `8`-U-row delta matrix, its `≤8` cap, its
  per-row instrument table, its coverage-report block and its three falsifiable clauses (`U-GAP-1`'s own
  home);
- **`docs/specs/gutter-ui-live-battery.md`** — the landed **gate-6 record** of that matrix being RUN
  (the manual coverage report filled FROM THE RUNS, with the operator-owed rows stated);
- **`AGENTS.md`'s gate list** — item 10a/10d (the blind-greens and documentation-review gates), item 11
  (the typed property register, cited by row name) and the two-return-point autonomy rule that governs
  **when** this audit runs rather than who performs it;
- **`docs/decisions.md`** — the ACTIVE rows this contract leans on by NAME: `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`,
  `A DECLARED REGISTER TERM IS A DRIVE COUNT`, `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`,
  `TEST-MARKER-MUST-BE-THE-ASSERTION`, `LEG-ENV-PREREQUISITES-ON-OWN-OBSERVATION` and
  `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER` (the misattribution lesson).

**1. WHAT THIS CONTRACT REQUIRES OF A UNIT (the four obligations, in the order a pass meets them).**

1. **Decide the PREDICATE mechanically (§7.1).** Before any other live-battery step, a unit decides
   **whether the audit applies at all**, from the predicate below — **never from preference and never from
   convenience**, and the decision is **RECORDED either way** (`TRIGGERS` or `DOES NOT TRIGGER`, with the
   evidence that decided it).
2. **Author the DELTA MATRIX (§5.U) if and only if the predicate triggers.** The matrix lists the
   **user-visible flows the unit changes**, each with a **pre** observation, a **post** observation that is
   **MEASURED at the live gate and never projected**, a **layer** label (`[U]`/`[H]`/`[T]`), and **the exact
   instrument** that can read it.
3. **Emit the COVERAGE REPORT (§6.1)** — the structured record of what the live battery actually observed,
   with the fields and the falsifiable clauses in section 3 below.
4. **Take the READ-ONLY AUDIT (§6.2)** over that report — the duties in section 4 below, discharged by a
   party that did not author the matrix.

**2. THE TRIGGER PREDICATE (§7.1) — MECHANICAL, WITH ITS ZERO-ROW EXEMPTION.**

**THE PREDICATE.** The audit **TRIGGERS** for a unit **iff EITHER** limb holds, and **the limbs are
decided from the unit's own recorded change set and its own contract, not by judgement in the moment**:

- **Limb A — DOM-SHIM-BLINDNESS:** the unit's change **adds, removes, renames or re-authors a rendered
  surface** (an element, a node, a class, a text, a style, an attribute, a cursor, a geometry) **whose
  truth is only observable in a REAL DOM/host rather than in the shim** — i.e. the change makes a claim the
  node suite and the shim **cannot see**. *(The `U-GUTTER-UI` case: `data-wire` was present on the real DOM
  and absent from the shim; the attribute comparison is `[A]`-layer and no `[T]` row can take it.)*
- **Limb B — UI-OVERHAUL:** the unit **changes a user-visible flow** — an interaction a user or an agent
  performs and observes (a drag, a press, a release, a drop, a commit, a visible revert, a rendered
  readout), **including a change that only becomes visible once the unit is assembled**.

**WHAT DOES *NOT* TRIGGER, stated so the exemption is not a matter of taste.** The predicate **does not
trigger** for a unit whose change set **authors no rendered surface and changes no user-visible flow** —
a pure `src/shared/**` mechanism imported by no `src/**` file, a measurement/documentation record, a
config-only or process-only change. **THE ZERO-ROW EXEMPTION, exact:** for such a unit **no `§5.U` matrix
and no `§6.1` report are emitted**, and the exemption is **RECORDED in the unit's own spec with its reason**
— **never left silent**. **A ZERO-ROW OR SHORT REPORT IS *INVALID*, NOT EMPTY:** if a unit triggers the
predicate, a report whose `summary.total` does not equal its matrix's U-row count is **invalid**, so
**"no report" and "an empty report" are different artefacts and the first is the only admissible form of
the exemption.**

**3. THE STRUCTURED COVERAGE REPORT (§6.1) — ITS FIELDS AND ITS FALSIFIABLE CLAUSES.**

**THE FIELDS** (the shape `docs/specs/gutter-ui.md` `§5.U` item 2 landed and `docs/specs/gutter-ui-live-battery.md`
filled from the runs; **this file imports that shape rather than restating a unit's values**):

| Field | What it must be |
| --- | --- |
| `unit` | the unit whose flows are covered |
| `matrixSource` | the section the matrix lives in (cite the section, never a line) |
| `predicateSource` | **this file's `§7.1`** |
| `predicateSourcePresent` | `true` from this filing onward; a report emitted **before** 2026-09-27 records `false` and names the gap — a dated reading, never rewritten |
| `emitter` | who emitted the report; where **no shipped instrument** can emit it, the literal `MANUAL` with that reason stated |
| `rows[]` | one entry per matrix U-row: `u` · `layer` · `instrument` · `cmd` · `exit` · `observation` · `verdict` · `reason` (required iff `NOT-OBSERVABLE`) |
| `summary.total` | **the matrix's U-row count — a total that disagrees with the matrix is INVALID rather than empty** |

**THE FALSIFIABLE CLAUSES (each is a row a pass can FAIL, which is why they are clauses and not advice):**

1. **`summary.total === <the matrix's U-row count>`** — and **the per-verdict counts SUM TO IT**; a short,
   zero-row or disagreeing total is **INVALID**.
2. **Every `post` observation is MEASURED, never projected** — a projected value is a FAIL, not a
   placeholder.
3. **Every `instrument` comes from a CLOSED set** — a shipped tool, a literal command line, `MANUAL`, or the
   `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` label. **A row that names *"the live gate"* or *"the leg"* has
   named NO instrument and FAILS.**
4. **Every `cmd` is a literal command line or the literal token `MANUAL`, with its own exit code** — a
   paraphrased command is not a command.
5. **A `MANUAL` row's `observation` is an operator observation, and a row no shipped instrument can take
   carries its STRUCTURAL reason** — a row may not be moved to `NOT-OBSERVABLE` for convenience.
6. **The predicate's decision is recorded** — `TRIGGERS` with the matrix, or `DOES NOT TRIGGER` with the
   exemption and its reason.

**4. THE READ-ONLY AUDIT (§6.2) — ITS DUTIES.**

The audit is **read-only** (it edits no source, no test and no matrix), is taken by **a party that did not
author the matrix** (`AGENTS.md` item 10a/RCA-4's independence rule), and discharges exactly these duties:

1. **RECONCILE THE TOTAL** — `summary.total` against the matrix's own U-row count, row by row.
2. **RECONCILE EVERY VERDICT** against the recorded observation and the named instrument — a `CHANGED`
   verdict with a `NOT-OBSERVABLE` instrument, or a `NOT-OBSERVABLE` verdict with no structural reason, is
   a finding.
3. **CHECK THE PREDICATE'S SOURCE IS FILED AND CURRENT** — a report whose `predicateSourcePresent` reading
   disagrees with the tree (this file's existence) is a finding; **a report emitted on a tree where this
   file was absent must say so rather than assert `true`**.
4. **CHECK FOR PROJECTION** — any `post` value not traceable to a named instrument's output is a finding.
5. **REPORT, DO NOT SILENTLY FIX** — findings go to the unit's record and the active trackers in the same
   pass (`AGENTS.md` item 6); **a doc/spec drift the audit finds is fixed in the same pass, and a
   `[U]`-layer claim the audit cannot substantiate is REMOVED or DISCHARGED, never re-worded into
   plausibility** (`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`).
6. **NEVER UPGRADE A LAYER** — a `[T]`/node-suite green is **not** assembled-app evidence, an `[A]`-layer
   observation is **not** an IPC claim, and **a `ui`/divergence green is never a substitute for a
   measurement the report claims** (`docs/specs/ci-divergence-leg.md` `A-6.4`'s layer lesson).

**5. WHAT THIS CONTRACT DOES NOT DO.** It **does not** re-derive, restate or cap any unit's matrix (each
unit's own `§5.U` is the matrix and its values are that unit's own measurements); it **does not** create a
gate, a leg, a script or a `package.json` key; it **does not** require a matrix of a unit that does not
trigger; and it **does not** weaken any landed row of `docs/specs/gutter-ui.md` `§5.U` — **the `8`-row
matrix and its `U-GAP-1` discharge note stand exactly as that unit recorded them.**

**6. PROVENANCE.** Filed **2026-09-27** by the `U-DIVERGENCE-EXT` (`C2`) documentation pass, which ALSO
discharged `U-GAP-1` (`docs/specs/gutter-ui.md` `§5.U`'s row gained a dated discharge note; its
`predicateSourcePresent: false` reading is kept as that unit's own reading against the tree it ran on) and
annotated the gap's rows in `docs/pending.md` §H/§I/§J. **This file's own gate history: it is a SPEC-only
artefact — no code, no test, no register** (it declares no `§5.x` typed register, and that is the recorded
zero-row exemption of `§2` applied to itself: it authors no code-bearing surface, so gate 11 has nothing to
register).
