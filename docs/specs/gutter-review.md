# Review — `U-GUTTER` (wave **E**, ledger row `E3`) — **GATE 1: the four-step proposal review** (2026-09-27)

**Status: GATE 1 `CLOSED` — the unit is `DELEGABLE-WITH-CONDITIONS` and proceeds to the SPEC GATE**
(`docs/specs/gutter.md`, `OWED — not filed`). **This filing records a REVIEW: it lands no code, no red
set, no register, no greens set, no DONE row and no status flip.** The unit's own spec, red set, gates
and geometry clause remain its own (`RCA-2`).

| | |
| --- | --- |
| **Unit** | `U-GUTTER` — the node-local resize controller composed on the landed session (+ the exported pure `clampToBounds`) |
| **Wave / ledger row** | **E** / **`E3`** (`docs/next-steps.md`'s `## OPEN` row `E3`) |
| **Upstream** | **`SCH-6`** (`GUTTER-RESIZE-CONTROLLER`) as **ADOPTED-RESHAPED** by architect ruling **`A-d4`** (`docs/pending.md` §A's `SCH-6` row; the `A-d4…A-d8` amendment record) |
| **Composes / depends on** | **`U-GSESSION`** (`E6`) — **`DONE`**; its delegate surface `docs/specs/gsession.md` `§2.5` is **FROZEN AND COMPLETE** |
| **Reviewed proposal** | to file `docs/specs/gutter.md` and implement `U-GUTTER` (the shape in §1 below) |
| **Date (filing calendar)** | **2026-09-27** (the host clock reads 2026-09-26 — cite the filing date, as the sibling gates records do) |
| **Tree state** | **`adc7e8a`** (`U-GSESSION gate 10 DONE`), tree clean, `main`. `docs/specs/gutter.md` and `src/shared/gutter.ts` **do not exist** (globbed this pass) |
| **Gate-1 steps** | **1 validity** `VALID-WITH-CONDITIONS` · **2 critique** `SOUND-WITH-CONDITIONS` · **3 architecture** `DELEGABLE-WITH-CONDITIONS` (**twelve rulings**) · **4 change analysis** `PASS-WITH-RECORDED-CONDITIONS` (**C1–C5**) |

**THE PROVENANCE OF THE THREE STEP VERDICTS (required, and it is a limitation, not a formality):** the
step-1, step-2 and step-3 verdicts below are recorded **as the supervisor's step transcripts** — **no
intermediate artifact was filed separately for any of the three steps** (there is no
`docs/specs/gutter-validity.md`, no `gutter-critique.md` and no `gutter-architecture.md`; the sibling
precedent's separate proposal/architecture files do not exist for this unit either). **This file is their
first and only written home**, and it carries their substance in full. Where a transcript's citation did
not match the on-disk bytes, the difference is recorded at **§7** rather than papered over.

**THE GOVERNING RULE FOR THE SPEC THAT FOLLOWS:** the twelve rulings in **§4** are **the governing
interface decisions**. **`docs/specs/gutter.md` DERIVES them and may NOT re-litigate them**; a clause of
that spec that contradicts a ruling is a finding against the spec, not a re-opening of the ruling.

---

## 1. The reviewed proposal

**File `docs/specs/gutter.md` and implement `U-GUTTER`: a resize controller COMPOSED ON the landed
node-local session** (`docs/specs/gsession.md`, unit `U-GSESSION`, ledger row `E6`, `DONE`), with the
surface

```
createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, sizeFor, commit})
```

**plus an exported PURE TOTAL `clampToBounds(value, bounds)`** — **one commit per gesture** ·
**`cancel` ⇒ zero commits and zero sink writes** · **`reset` ⇒ at most one commit of the CLAMPED
supplied default** · **no capture before establishment** (inherited/observed, not installed) · **all
values injected** · and the **`A-d4` mandatory geometry clause** (*the contract and its call counts are
provable here; any rendered-geometry claim is UNPROVABLE in this repo today*) discharged as this unit's
own clause.

---

## 2. Step 1 — VALIDITY: **`VALID-WITH-CONDITIONS`**

**IN SCOPE AS AN ADOPTED MECHANISM, NOT DELEGABLE AS STATED.** The unit is a `src/shared/` mechanism with
**no in-tree consumer** and **no `[U]` row** — admissible under the `(C)` admission clause as an adopted
mechanism (`docs/decisions.md`'s `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` row's mechanism-vs-UI-element test;
`docs/pending.md` §A's `SCH-6` row carries the `A-d4` adoption). **What failed was the SHAPE, not the
admission.** The findings, each of which the spec must close:

1. **The controller's VALUE has no source.** The session carries **no coordinate and reads no event field
   at all** (`docs/specs/gsession.md` `§2.4` item 1; `I-11`), so a proposal that implies the controller
   *obtains* a magnitude has no admissible input. **The surviving form is consumer-produced** (ruling 2).
2. **`axisFor` was untyped with no caller** — an uninterpreted seam is only legitimate as an **opaque
   token** (ruling 3).
3. **The reset clause had no entry point.** The ledger's *"reset ⇒ exactly one commit of the supplied
   default"* is not expressible through the session's surface without an owner for the entry point
   (ruling 4).
4. **`onEnd` carries no outcome discriminator** — so a controller that tried to read the terminal's kind
   off its own `onEnd` could not distinguish a reset from a user-chosen end. The discriminator lives in
   the **commit channel**: `docs/specs/gsession.md` `§2.5` item 10 (`commit(gesture, value)` with
   **`gesture.outcome`** the `'end'`-vs-`'reset'` discriminator), `§2.3` item 4 (`handle.outcome`), and
   `§0A` note 6 (which is the ruling that *why* `reset` exists as its own terminal). **The spec must
   state the discriminator's site explicitly** (see §7, citation note 1).
5. **The two `commit` channels were ambiguous** — the session's own `commit` construction option versus
   the controller's proposed `commit` option. Ruling 1 pins the single-writer shape.
6. **The reset default's home and its clamp were unspecified** — where the default comes from, and whether
   the value committed is the raw default or the clamped one (ruling 4).
7. **`clampToBounds` had no signature and no fail-states** — a *pure total* function still needs its
   enumerated domain and its stop conditions (rulings 7 and 10).
8. **`isResizable === false` was observably undefined** — no stated outcome, no stated write count, no
   stated evaluation point (ruling 5).
9. **The leg list was short one leg**: the **standalone strict `tsc --noEmit` over the unit's own test
   file** — the type-layer leg the sibling `U-GSESSION` declares and runs as its fourth leg
   (`docs/specs/gsession.md` `§5.2` leg 4) — was absent from `E3`'s legs cell (ruling 11).
10. **`E3`'s legs cell's *"rendered-geometry rows → `ui` only"* reads as an OFFER where the structural
    reason makes it a REFUSAL.** The module will be **imported by no `src/**` file** and **reads no
    coordinate**, so there is **no rendered surface to observe and nothing for a measuring leg to
    measure** — the same structural refusal `docs/specs/gsession.md` `§5.2` and `docs/specs/zones.md`
    `§4.4 S-6` state, and `S-6` adds *"the row **may not be moved to the `ui` leg silently**"*. The ledger
    cell was corrected in the same pass as this filing (§3 of the tracker corrections).
11. **`U-CENSUS` is NOT a dependency.** `docs/specs/census.md` `§1` item 7 **forbids the import in its own
    words** (*"It may **not** import this module … a dependency edge asserted the other way would be a
    **fabricated edge**"*, `H-r6`'s dissolved-edge class) and supplies only the **`sizes` VALUE as an
    injected argument**. The ledger's `Blocked on` cell's `U-CENSUS` edge is therefore **DISSOLVED**;
    `U-GSESSION` alone is genuinely satisfied by `## DONE — U-GSESSION`.
12. **Gate 11 obliges a typed register** for a code-bearing unit (`docs/decisions.md`'s
    `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` and `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`
    rows) — the proposal named none (ruling 10).
13. **The four delegation-gate conditions were unmet** (`AGENTS.md` item 9): the spec does not exist, no
    red set has run, the surface is unruled, and the change surface is unnamed (ruling 12).

**Strongest counter-argument, considered and rejected.** *The unit is speculative: no consumer, no defect,
no gesture-computable input.* **Rejected because `A-d4` is the architect's ruling** — the panes/zones
family is in scope and the adoption is binding. **The surviving part of the objection is the
VALUE-SOURCE finding (item 1 above)**, which the rulings answer by removing the magnitude channel rather
than by inventing an input.

---

## 3. Step 2 — CRITIQUE: **`SOUND-WITH-CONDITIONS`**

**THE LOAD-BEARING FINDING: five of the six queue-cell clauses were NOT FALSIFIABLE as stated.** *"one
commit per gesture"*, *"cancel ⇒ zero commits/sink writes"*, *"reset ⇒ exactly one commit of the supplied
default"*, *"no capture before establishment"* and the exported `clampToBounds` are **not** assertable
until the sink is **named**, the reset **entry point is owned**, the **capture opt-in is stated**, the
**default's home and clamp are stated**, and the **pure function's domain is enumerated**. **Consequence,
recorded plainly: the unit's entire falsifiable payload is its CLAUSE ROWS** — the twelve rulings are what
turn a prose intent into rows, and a spec that restates the intent without the rulings is unimplementable
and un-red-able.

**Its strongest counter-case, recorded.** **`A-d4` OVERRIDES the `ARITHMETIC-OVER-INJECTED-VALUES`
admission objection rather than answering it** — the objection asked *"is this shell-chrome mechanics or
arithmetic over injected values?"*, and the ruling does not argue the classification; it adopts the unit
by architect authority. **The `SECOND-GESTURE-AUTHORITY` objection IS answered in the contract** — by
composition (the controller is *driven by* the session and re-expresses none of its lifecycle). **And
`docs/pending.md` §A's `SCH-6` cell's claim that *"Both of this row's objections are CARRIED AS CONTRACT
ROWS"* is true only of the SECOND** — the first is overridden, not carried. That cell was annotated in the
same pass as this filing, its as-written clause kept visible. `docs/decisions.md` gained the matching
ACTIVE row.

**Material findings (each landed in the rulings or the conditions):**

1. **The geometry clause must appear in THREE PARTS** — the **refusal** (no `[U]` row offered), the
   **structural reason** (imported by no `src/**` file; reads no coordinate), and `docs/specs/zones.md`
   `§4.4 S-6`'s *"may not be moved to the `ui` leg silently"*. A one-sentence refusal is not the clause.
2. **The sink must be NAMED.** *"zero sink writes"* is only countable if the write channel is one named
   callable (ruling 1).
3. **The capture clause was vacuous without an opt-in.** *"no capture before establishment"* is satisfied
   by a module that never opts in at all — but vacuously, so the composition must state the opt-in's
   ABSENCE as the clause body and carry a positive control (ruling 6).
4. **The reset default was under-specified three ways**: its home (consumer-supplied), its clamp
   (`clampToBounds` of the consumer's default), and its zero-session-call path when unusable (ruling 4).
5. **The `U-CENSUS` boundary** — no import, not even type-only; `sizes` enters only as an injected-callback
   argument (rulings 9, 10).
6. **The double-write hazard** — a two-writer composition must FAIL a row (ruling 1's positive control);
   the hazard is otherwise unruled.
7. **The pure function's fail-state table + the `S-*` stop conditions** (`S-PURE-1..5`, ruling 7).
8. **The throwing-injected-callback pattern** — the `docs/specs/listhost.md` `§7a` item 4 form: **a NAMED
   SAFE DEFAULT per seam** (the `slothost` filing cites it as *"the `listhost` shape"*), not a bare
   `try/catch` (ruling 8).
9. **One controller per session/control, with a STATED ENFORCEMENT LIMIT**, in
   `docs/specs/gsession.md` `§2.6` item 7's **two-part REQUIREMENT + LIMIT** form (rule, then the honest
   limit): the mechanism has **no shared registry** and **cannot detect** a second controller, so the
   requirement is discharged by the composition rule plus the call-count row (ruling 9).
10. **Gate 6 stated as STRUCTURAL, not waived** (ruling 11) — a refusal with its reason, in the shape
    `docs/specs/census.md` `§1` item 6 and `§5.2` already use.
11. **The artifacts owed up front, named rather than discovered later**: `docs/specs/gutter.md`,
    `docs/specs/gutter-greens.md`, the unit's tracker rows, and the red set — all owed before the
    delegation gate opens (`AGENTS.md` item 9).

---

## 4. Step 3 — ARCHITECTURE: **`DELEGABLE-WITH-CONDITIONS` — the TWELVE RULINGS**

**These are the governing interface decisions for `docs/specs/gutter.md`. The spec derives them; it may
not re-litigate them.**

### Ruling 1 — THE CONTROLLER IS THE SINGLE WRITER

The session is **constructed with its `commit` option wired to exactly ONE callback — the composition's
single sink writer.** The session invokes it **at most once per gesture, only at an `end`/`reset`
terminal, never on `cancel`** (`docs/specs/gsession.md` `§2.3` item 4, `§2.5` item 10). **NO OTHER WRITE
CHANNEL EXISTS**: no write from `onMove`, from `onStart`, from `onEnd` or from `onCancel`. **The
discipline is stated as SINK-WRITE discipline** (a count over one named callable), **and two positive
controls are REQUIRED: a TWO-WRITER composition must FAIL a row, and a NO-WRITER composition must FAIL a
row.** A slot-empty composition must state, **in the same sentence**, that the session then reports
`committed: true` **while nothing was written** (condition **C1**).

### Ruling 2 — THERE IS NO MAGNITUDE CHANNEL

**The value is CONSUMER-PRODUCED** (`onMove` ⇒ `gesture.set`, `docs/specs/gsession.md` `§2.5` item 9) and
**read at most once at the terminal** by the injected **`sizeFor(element, gesture, axis)`**, then committed
as **`clampToBounds(raw, boundsFor(element, axis))`**. **A consumer-supplied `sizes`-style value is a NAMED
PRECONDITION entering only as an argument to the consumer's own callbacks.** **The unit ships NO drag
arithmetic, no coordinate read and no magnitude** — **a named, recorded COST**, not an omission: what local
handlers purchase is **origin REACHABILITY, not magnitude-equivalence** (`docs/specs/gsession.md` `§2.3`
item 5/7, `I-11`), and **no pass may claim agent-drivable drags**.

### Ruling 3 — `axisFor` IS FUNDED AS AN OPAQUE TOKEN

**`axisFor: (element) => unknown`.** The token is passed to **`boundsFor`/`sizeFor`/`defaultSizeFor`** and is
**never interpreted** — **no axis vocabulary in the module's bytes** (the `docs/specs/census.md` `P-1`
vocabulary discipline, applied here). **Absent, non-callable or throwing ⇒ the token is `undefined`.**
(The token is the reason `isResizable`'s and the bounds seams' signatures can stay consumer-shaped without
the mechanism learning an axis vocabulary.)

### Ruling 4 — THE CONTROLLER OWNS THE RESET ENTRY POINT

**`reset(element)`**, over the session's `reset` terminal (`docs/specs/gsession.md` `§2.3` item 4,
`§2.5` item 5, `§0A` note 6): **the handle is captured in the controller's own hook, NEVER synthesised,
NEVER retained past the terminal.** **No active gesture ⇒ refuse `'no-gesture'` with ZERO session calls.**
**The session's own codes propagate VERBATIM** (the seven members, **no eighth** — `docs/specs/gsession.md`
`§4.4 S-9`). **The committed value is `clampToBounds(defaultSizeFor(element, axis), boundsFor(element,
axis))`, at most once, with ZERO session calls when the default is unusable.** **The controller NEVER calls
`session.begin` outside the documented consumer-driven establishment** (`docs/specs/gsession.md` `§2.5`
item 3 is a test/consumer seam, not a controller actuator).

### Ruling 5 — `isResizable` IS EVALUATED EXACTLY ONCE PER GESTURE, AT ESTABLISHMENT

**Truthiness; absent ⇒ not resizable; a throw ⇒ not resizable.** **`false` ⇒ the gesture ESTABLISHES and
TERMINATES NORMALLY with ZERO sink writes**, and **the outcome distinguishes it from a cancel**. It is
**never an install-time gate** (a control must still install, and the decision belongs to the gesture).

### Ruling 6 — THE COMPOSITION NEVER OPTS IN TO CAPTURE

**`capture` is ABSENT from the install options and there is NO `capture` option on the controller**, so
*"no capture before establishment"* is **INHERITED and OBSERVED** — with a **positive control** (a
composition that DID pass `capture: true` must FAIL a row), rather than vacuously true. **The session's
parked release-after-failed-establishment question stays PARKED with its existing trigger**
(`docs/pending.md` §I).

### Ruling 7 — `clampToBounds` IS TOTAL WITH **NO REFUSAL DOMAIN**

**`clampToBounds(value: unknown, bounds: unknown): number`.** **`typeof`-gated bounds** (`NaN` when either
bound is not a `number`), then **`Math.max(min, Math.min(value, max))`**. **The enumerated fail-state table:**

| Input | Result |
| --- | --- |
| non-number `value` | `NaN` |
| `NaN` | `NaN` |
| `+Infinity` | `max` |
| `-Infinity` | `min` |
| a finite negative | `min` |
| `-0` | **preserved** (`Object.is`) |
| equal bounds | the value |
| **inverted bounds** (`min > max`) | **`min`** |
| non-number / absent / primitive bounds | `NaN` |
| a throwing field read | `NaN` |
| non-finite bounds | **the formula verbatim** |

**And the stop conditions `S-PURE-1..5`:** **no coercion · no result-record · no built-in literal · no
second clamp · no geometry.** A `[T]` green over this function proves the ARITHMETIC only.

### Ruling 8 — SEVEN NAMED SAFE DEFAULTS (the `listhost §7a` item 4 form)

| Seam | What an absent/non-callable/throwing seam means | Declared outcome |
| --- | --- | --- |
| `axisFor` | the token is `undefined` | passed on opaquely |
| `boundsFor` | unusable ⇒ `NaN`-clamped | **no sink write** |
| `defaultSizeFor` | `undefined` | **zero session calls** |
| `sizeFor` | `undefined` | **`sinkCalls === 0`** (and it is **not** a cancel) |
| `isResizable` | not resizable | establishes and terminates with zero writes |
| `commit` (the sink) | **swallowed** | **the write is ALREADY COUNTED, never retried** |
| `session` (non-usable/hostile) | **a VALID BUT INERT controller** | `attach ⇒ false`, the declared refusals, zeroed stats, **never a throw** |

**The totality universal carries its boundary in its own words** (ruling 10's `P-GT-TP-1`) — a universal
whose bound is not stated in its own cell is not a register row.

### Ruling 9 — THE `U-CENSUS` / `U-GSESSION` BOUNDARIES, STATED AS BOUNDARIES

**No import of any sibling — not even type-only** (`docs/specs/census.md` `§1` item 7; the `H-r6`
dissolved-edge class). **`sizes` enters only as an injected-callback argument.** **One controller per
session/control**, with the explicit **LIMIT** that the mechanism has **no shared registry** and **cannot
detect a second controller** — the requirement is discharged by the **composition rule** plus the
**call-count row**. **No handle past a terminal.** **Session state is read only through `stats()` /
`gesture()` / `disposed`** (`docs/specs/gsession.md` `§2.1`, `§2.5` item 8) — never by reaching into the
session.

### Ruling 10 — THE REGISTER IS **THIRTEEN ROWS** IN FOUR FAMILIES

**`P-GT-PU-*` (3)** — the pure function's **enumerated totality** · the **ordering/boundary property** ·
**purity/determinism**.
**`P-GT-IM-*` (4)** — `sizeFor` · `boundsFor` + `defaultSizeFor` · `isResizable` · `axisFor`.
**`P-GT-SM-*` (4)** — **commit counts per terminal path** · **no-write-before-establishment / no-second-write**
· **the single-writer / double-write property** · **the reset surface's code propagation + the clamped
default**.
**`P-GT-TP-*` (2)** — **the seven-seam totality universal with the bound in its own words** · **the
declared-shape returns over hostile arguments**.

**Fully enumerable with NO pointer input** (a **recording session double**, the **landed session**, a
**counting sink**, **throwing stubs**). **Totals printed with their terms**; **declared AND distinct-drive
figures both reported** (`docs/decisions.md`'s
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`); **caps `≤100`/row · `≤400` total · stop-after-5**; **a pinned
seed only if a generator is used**; and **the POOL-VERSUS-BOUNDARY CHECK RUN BEFORE FILING**
(`docs/specs/gsession.md` `§5.5.2`'s check, the sibling precedent). **`≤8` is a BREAKDOWN SIGNAL, not a
ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED…`): **13 rows is an OUTCOME and must NOT be trimmed.**

### Ruling 11 — THE FOUR LEGS, THE THREE-PART `[U]` CLAUSE, `[D]`, AND GATE 6

**The FOUR legs:** `npm test` **`[T]`** · `npm run typecheck` **`[H]`**, **`src/**`-ONLY** · `npm run build`
**`[H]`**, **five bundles byte-identical** · **a standalone strict `tsc --noEmit` over
`tests/gutter.test.ts`** — **NOT optional, and NOT a script addition** (the `docs/specs/gsession.md` `§5.2`
leg-4 precedent; the standing `docs/pending.md` §H process row records that `typecheck` never reads
`tests/**`).
**The three-part `[U]` clause:** the **refusal** · the **structural reason** · `docs/specs/zones.md` `§4.4
S-6`'s *"may not be moved to the `ui` leg silently"*.
**`[D]` unclaimed, `PRECONDITION-GATED`** on `U-DIVERGENCE-EXT` (`C2`) — not claimed, not implied.
**Gate 6 is STRUCTURAL, NOT WAIVED** (see §5's condition set and §6).

### Ruling 12 — THE CHANGE SURFACE

**MAY touch:** `src/shared/gutter.ts` (**NEW** — exactly the controller + `clampToBounds` + its types) ·
`tests/gutter.test.ts` (**NEW**) · `docs/specs/gutter.md` (**NEW**) · `docs/specs/gutter-greens.md`
(**NEW**) · the unit's tracker rows · `archive/reviews/*`.
**MUST NOT touch:** `src/shared/gesture-session.ts` or `tests/gesture-session.test.ts` (**FROZEN**) · any
sibling `src/shared/*` module or its tests · `src/main/**` · `src/renderer/**` · the app graph ·
`package.json` · `package-lock.json` · `scripts/**` · `tsconfig.json` · `vitest.config.ts` · the MCP
surface · any sibling artifact.

**AND, recorded with the change surface so it is not mistaken for scope:** **the REAL gutter UI — a
provident-rendered drag affordance, the ONLY place a coordinate source or a `[U]` row could legitimately
live — is a NAMED FUTURE UNIT OUTSIDE `E3`, and `E3` does NOT owe it.** It is filed as its own `## OPEN`
row in this same pass (ledger row `E10`; see §6).

---

## 5. Step 4 — CHANGE ANALYSIS: **`PASS-WITH-RECORDED-CONDITIONS`**

**The change is ADDITIVE IN THE STRONG SENSE.** A **new `src/shared` module with no importer**: the
**five-bundle set stays byte-identical** (the module appears in none of them), `package.json`,
`tsconfig.json`, `vitest.config.ts` and `scripts/**` are **unchanged**, the **app graph is untouched**, and
the **session and its test file are untouched** (FROZEN — ruling 12). No MCP surface change; no CSP
change; no shim change.

**The ledger's `E3` `Blocked on` cell's `U-CENSUS` edge is DISSOLVED** — no import, and
`docs/specs/census.md` `§1` item 7's own words forbid it — **while `U-GSESSION` is genuinely satisfied**
(`## DONE — U-GSESSION` in `docs/next-steps.md`). The `U-GUTTER`-as-successor-in-need relationship
`census.md` `§1` item 7 states is **kept and unweakened**: it is a VALUE relationship (the `sizes` value
and the token strings), **not an import edge and no longer a blocking ledger edge**.

**`U-RELOCATE` (`E4`) INHERITS the single-writer discipline PER COMPOSITION** (two controllers = two
writers on **different sinks**), and **should CITE the resolved channel clause rather than restate it** —
restating it is the second-authority hazard this unit's rulings exist to close
(`docs/specs/gsession.md` `§2.6` item 6).

**THE HONEST COST, against reusable-contract value only:** spec + a **13-row** register + red/green **with
remands** + adversarial + blind greens + doc review + DONE row + per-gate commits (`RCA-8(f)`). **The value
is a reusable contract** (a resize controller any consumer can wire to its own bounds/default/resizability),
**not** a shipped feature: the unit ships **no UI**, has **no in-tree consumer**, and its green is
**envelope/pure-layer** evidence.

**Alternative cuts considered and REJECTED:**

| Cut | Why rejected |
| --- | --- |
| **`U-GUTTER-MIN`** (clamp-only) | **Strictly worse value per process unit**: it lands the same spec/register/gates cost while leaving the **composition hazard unruled** (the double-write and reset-entry-point questions are the point) |
| **Deferring `E3` into `E4`** | **Moves the cost and risks the signature-in-three-specs hazard**: the delegate surface is frozen precisely so a signature change does not land in three specs at once (the `D-1` capture-name fix's stated reason) |
| **Trimming the register to `≤8`** | **FORBIDDEN by the standing rule** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED…`): `≤8` is a breakdown signal, not a ceiling |

### THE FIVE CONDITIONS C1–C5 THIS FILING MUST SATISFY

These are **ADDITIONS to the seven items the step-2 material findings already list**.

- **`C1` — THE COMMIT CHANNEL IS PINNED IN THE SESSION'S OWN WORDS** (ruling 1), **with both positive
  controls** (two-writer FAILS, no-writer FAILS), **and a slot-empty composition must state IN THE SAME
  SENTENCE that the session then reports `committed: true` while NOTHING WAS WRITTEN** — otherwise the
  row that counts sink calls can be satisfied by a composition that never wired the channel.
- **`C2` — THE FOUR CONSUMER-CALLABLE THROW PATHS ARE ROWED:** `axisFor` / `isResizable` **at
  establishment**, `defaultSizeFor` **at reset**, `boundsFor` / `sizeFor` **at the terminal** — each with
  **(a)** a **declared outcome (propagate vs swallowed)**, **(b)** the gesture's **post-state (`idle`, not
  `busy`)**, and **(c)** the statement that a throwing `boundsFor`/`sizeFor` still yields **ZERO or EXACTLY
  ONE sink write — never two**.
- **`C3` — THE FACTORY'S SEAM SET IS FROZEN EXACTLY:** **the seven members, NAMED and ORDERED, no eighth
  member, no policy default** — the `docs/specs/gsession.md` `§2.5` **"Nothing else exists"** discipline
  applied to **this unit's own surface** — **with the call multiplicity of `axisFor`/`boundsFor` ruled**,
  and **`capture` ABSENT from the install options** (ruling 6).
- **`C4` — `install`-ONCE IS RULED, AND `reset`-LEGALITY IS RULED:** **never re-installed per gesture**;
  a repeat install is `docs/specs/gsession.md` `§2.4` item 2's **first-config-wins no-op `false`**; **a
  failed attach's `false` is NOT a start signal.** `reset`'s **handle provenance is the only provenance**
  (no synthesis, no retention past a terminal); **`reset` is legal only for an ACTIVE gesture**; **and a
  reset is NOT an `end` — `gesture.outcome === 'reset'` is the discriminator** (`docs/specs/gsession.md`
  `§2.5` item 10, `§2.3` item 4).
- **`C5` — THE `§5.1` DENIED SET NAMES THE FROZEN FILES EXPLICITLY** — `src/shared/gesture-session.ts` and
  `tests/gesture-session.test.ts`, **plus every other denied path** (ruling 12) — **and the register's 13
  rows are filed with their totals ALREADY SUMMED** (terms printed, declared + distinct figures both
  reported).

### THE MUST-NOT LIST (binding on the spec, the red set, the implementation and the gates)

**No clause re-expressing the session's lifecycle** · **no geometry claim and no geometry-observation
call** · **no sibling import** · **no second writer** · **no refusal domain for `clampToBounds`** · **no
code member beyond the session's seven** · **no `[U]` claim and no `[D]` claim** · **no
`package.json`/`scripts`/config change** · **no re-derivation or weakening of the twelve rulings** · **no
relocate vocabulary leaking in from `E4`.**

### THE ADOPTION SENTENCE (recorded verbatim in substance, and as the filing's decision)

**`A`, `B` and `C` are ADOPTED AS RECOMMENDED — the opaque axis token is funded; `isResizable` is
evaluated once per gesture; the real gutter UI is a named future unit outside `E3`, with the `E3` queue
cell's `ui` phrase corrected — and the architect remains free to OVERTURN `A` and `B` in one pass, which is
REVERSIBLE because the token is opaque and the evaluation point is one clause with one row.**

---

## 6. What this record does and does NOT do

**Gate 1 is CLOSED.** Steps 1–4 have run and their verdicts are recorded above. **The unit proceeds to the
SPEC GATE next**: `docs/specs/gutter.md` is the next artifact, written **by the SpecWriter against this
record**, deriving the twelve rulings and satisfying `C1`–`C5`.

**NOT done here, stated so no later pass reads this filing as progress:** **no code, no test, no red set, no
register, no greens set, no DONE row, no status flip** (`E3` stays an open `## OPEN` row), **no sibling
spec clause changed**, and **no commit** (the writing pass was instructed not to commit; the per-gate
commit is the supervisor's).

**Trackers corrected in the same pass (`AGENTS.md` item 6 / the archival loop):** `docs/next-steps.md`'s
`E3` row (legal cells + the dated gate-1 clause) · `docs/next-steps.md`'s **new `## OPEN` row `E10`** (the
future gutter-UI unit: a provident-rendered drag affordance — **the only place a coordinate source and a
`[U]` row can legitimately live**; the **UI half of the panes/zones family**; blocked on `E3`/`E4`; **its
own spec, its own preconditions, its own gate**; **NOT owed by `E3`**) · `docs/decisions.md` (ONE ACTIVE
row: the `A-d4`-overrides-not-answers record + the A/B/C adoption with its one-pass reversibility) ·
`docs/specs/census.md` `§1` item 7 (the DISSOLVED-edge annotation) · `docs/pending.md` §A's `SCH-6` row (the
*"CARRIED AS CONTRACT ROWS"* correction).

**Row-id note (why `E10` and not `E3b`):** wave E's live row ids run `E1`–`E9`, so **`E10` is the next free
id**; **`E3b` would read as a sub-row OF `E3`, implying the UI unit is owed by `E3` — which is exactly
what ruling 12 denies.**

---

## 7. Provenance, citation notes, and the places where record and bytes disagreed

**Recorded rather than smoothed over** (the honesty convention the sibling records follow):

1. **`§0A` note 6 is not, by itself, the outcome-discriminator clause.** The step-1 finding *"`onEnd`
   carries no outcome discriminator"* was transcribed with the citation `gsession.md` `§0A` note 6. **On
   disk, `§0A` note 6 rules that `reset` IS a session terminal and that its value stays the caller's** —
   the clause that supplies the DISCRIMINATOR is **`§2.5` item 10** (`commit(gesture, value)`, with
   `gesture.outcome` the `'end'`-vs-`'reset'` discriminator), with **`§2.3` item 4** (`handle.outcome`)
   and **`§0A` note 5** (the session owns the single commit call) beside it. **Substance unchanged; the
   citation is corrected here, and `docs/specs/gutter.md` must cite `§2.5` item 10 for the discriminator.**
2. **The `§2.5` "Nothing else exists" discipline is the PARAGRAPH after item 11, not "item 7".**
   `docs/specs/gsession.md` `§2.5` carries **eleven** numbered items; **item 7 is `dispose()`**. The
   "Nothing else exists" sentence follows item 11 as the section's closing clause. **C3 says *"the `§2.5`
   'Nothing else exists' discipline"*, and that is how it is cited here** — no item number is claimed.
3. **No other disagreement was found.** Every other citation this record makes was re-resolved on the tree
   this pass: `gsession.md` `§2.4` item 1 (opaque events, no coordinate read) · `§2.4` item 2
   (first-config-wins no-op `false`) · `§2.3` item 4/5 · `§2.4` item 7 · `§2.6` item 6/7 · `§4.4 S-9`
   (the seven-member union) · `§5.2` leg 4 · `§5.5.2` (the pool-versus-boundary check) · `zones.md` `§4.4`
   `S-6` (and `S-7`) · `census.md` `§1` item 6/7 · `listhost.md` `§7a` item 4 + `§2.1`'s injected-function
   clause (the named-safe-default form) · `pending.md` §A's `SCH-6` row and §I · `decisions.md`'s
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`,
   `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED…` and `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` rows.

**Cite SECTIONS and ROW IDS, never line counts** (`docs/decisions.md`'s archival rows; the sibling specs'
file-end notes). This record carries no length census of any file.
