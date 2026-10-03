# Spec — `U-PANE-DRAG-COMPLIANCE`: the family-side landing of the store-backed pane-drag → zone-update flow (the queued §Q rebuild, the foundation half)

**Unit `U-PANE-DRAG-COMPLIANCE` · the foundation-half landing of `docs/pending.md` §Q's QUEUED pane-drag compliance update
(`QUEUED — the pane drag → zone update compliance update`, the §Q two-rule flip's first concrete rebuild) · **ADMITTED 2026-10-03
by the architect's directive *"Proceed with pane-drag compliance"* (recorded by the supervisor; the §Q queue row's own revisit
condition — *"its revisit condition is the implementing unit's admission"* — is thereby MET)** · derives the store-backed
obligations from the four-tier plan's named per-module rows (`docs/specs/data-ownership-model-plan.md` `§5.2.7`'s round-3 table,
rows **1 / 3 / 4 / 15**), the queued contract's six clauses (pending §Q), the passed-function constraint/repair machinery
(`docs/decisions.md` ACTIVE row **`CONSTRAINTS-ARE-PASSED-FUNCTIONS`**; `docs/specs/store-core-graph.md` `§2.7` re-derived — the
contract `§2.7`'s re-derived text is THE AUTHORITY), and the four-tier lifecycle (`store-core-graph.md` `§2.8`) · filed 2026-10-03.**

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing **lands ONE NEW file**
(`docs/specs/pane-drag-compliance.md`) and **nothing else**. **No source module exists or changes for this unit: the four
named mechanism rows (`zones.ts` · `gutter.ts` · `relocate.ts` · `gutter-affordance.ts`) carry **NO BYTE CHANGE** and this unit
edits none of them; the store's own surfaces (`src/renderer/store-core-graph.ts` · `store-graph-references.ts`) are LANDED-GREEN
and frozen-artifacted and this unit edits neither.** **No test file exists, no red set has been authored or run, no leg has run,
no register row has executed, no gate record exists.** The unit stays an **ADMITTED** queue item whose **queue state flips from
QUEUED to ADMITTED-AT-SPEC-GATE in the trackers BY THE SUPERVISOR (this pass edits no tracker); the ledger counts are
UNCHANGED by this filing (`21 DONE / 3 open` UNITS = `24`; `RCA-8(f)`)** and **it is NOT delegable until a TestWriter has RUN
and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings this unit derives from and the two
open points the queued contract carried (one decided by the passed-function ruling, one supplied by THIS unit's admission) ·
`§1` — the scope and its five boundaries (including the fork-side boundary: the fork's UI bytes are the fork's own pass, `H-r6`) ·
`§2.1`–`§2.6` — the exact surface: the store-backed seam contract for the drag chain (the three seam implementations that BECOME
store-backed, with their store reads NAMED), the zone-size constraint + two-arm repair as the CALLER-SUPPLIED passed-function
worked example, the zone-render listener (a store subscriber), the nine stored names ENUMERATED with who reads/writes each and
at which gesture turn, the gesture-turn table, and the prohibitions · `§3.1`–`§3.5` — every state, fail-state, invariant and
static/existence row · `§3a`/`§3b` — the adversarial seed set at the file end · `§4` — the red, the authoring order and the
binding stop conditions · `§5.1`/`§5.2`/`§5.3`/`§5.5` — the diff scope, the legs, the DONE-row shape and the typed register ·
`§6`–`§8` — layer honesty, falsification, the ambiguity report and the citation index.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s rows are cited **by NAME**,
`docs/next-steps.md` **by ROW ID**, `docs/pending.md` **by §/clause**, and the sibling specs' file-end notes carry the rule).
**This spec carries no length census of any file.**

## CURRENT STATE (2026-10-03) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note — the
placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote **exactly one file — the
   NEW `docs/specs/pane-drag-compliance.md`** — and edited **no existing file**, ran **no suite, no leg, no trio, no `tsc`, no
   Electron boot**, and made **no commit and no writing git command of any kind**. **The store-backed seam implementations, the
   constraint/repair function supply, the zone-render listener registration, the temp-write turns, the test file
   (`tests/pane-drag-compliance.test.ts`), the red set, the register's EXECUTED layer, the greens set, the gate records and the
   DONE row ALL DO NOT EXIST YET.** The unit is **`OWED` at every gate after this one**. **The fork's UI bytes
   (`sidebar-panes.ts`/`pane-drag.ts`) are the FORK's OWN pass per `H-r6` (the fork-side-return convention) — RECORDED here,
   NEVER written here; this repo writes no file under `<Astrographer>/`.**

2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** the family-side half of the store-backed drag flow, landed
   at the **CALLER/WIRING side** (per the plan's round-3 named obligations — NO byte change to any shared mechanism module):
   **(a)** the **store-backed seam implementations** for the drag chain — the pane-size/bounds reads (`startSizeOf`/`boundsOf`
   implementations reading `mem.layout.pane.<id>.size`/`.bounds`) · the candidate/slot read (`candidatesFor` reading
   `mem.layout.zone.<id>.slot`/`.distance`, feeding the pure `withinProximity(distance, threshold)` comparator) · the
   **temp-write turn** (`set('temp.drag.<gestureId>.placement', …)`, release `commit('file.settings.pane.<id>.size', …)`,
   right-click `remove('temp.drag.<gestureId>.placement')`, **ONE write per gesture end, never two** — the single-sink
   channel); **(b)** the **zone-size constraint + two-arm repair** as CALLER-SUPPLIED PASSED FUNCTIONS on the conformed store
   machinery (constraint: a size-band predicate over changed/current/next, sub-minimum NEVER stored; repair arm (a)
   `[min/2, min)` ROUNDS UP to the minimum, arm (b) BELOW `min/2` DISCARDS and MINIMIZES instead — **the `min/2` band boundary
   is the PINNED SPLIT**); **(c)** the **zone-render listener** — a **store subscriber** whose `set`/`commit` event (the
   committed temp preview) triggers the render, which reads the zone's STORED size/visibility and never a module-held variable;
   **(d)** the **nine stored names** enumerated (`§2.4`). **The unit ships NO new shared module and NO new store surface.**

3. **THE REGISTER (`§5.5.1`): `8` typed rows in THREE families** — `P-PD-IM-1`..`P-PD-IM-2` · `P-PD-SM-1`..`P-PD-SM-4` ·
   `P-PD-TP-1`..`P-PD-TP-2` — **`91` declared attempts, printed with their terms and a term-by-term addition at `§5.5.3`**:
   **`91 = 12 (P-PD-IM-1) + 9 (P-PD-IM-2) + 9 (P-PD-SM-1) + 8 (P-PD-SM-2) + 8 (P-PD-SM-3) + 12 (P-PD-SM-4) + 18
   (P-PD-TP-1) + 15 (P-PD-TP-2)`** (chain `12 → 21 → 30 → 38 → 46 → 58 → 76 → 91`; family subtotals **`IM 21` · `SM 37` ·
   `TP 33`**; caps `91 ≤ 400` total, largest row `18 ≤ 100`, stop-after-5). **NO generator, NO pinned seed, NO new dependency** —
   plain deterministic vitest tables (`AGENTS.md` item 11(d), the `engine-pin` precedent) — and **`0` `(bounded)` rows** (each
   property text quantifies EXACTLY over its own drive table; nothing is over-claimed, `§5.5.2` item 1).

4. **THE LEGS THIS UNIT DECLARES (none run):** the node suite **`npm test` `[T]`** (the seams + the wired-store composition,
   drivable on the node host with a recording source double), **`npm run typecheck` `[H]`** (**`src/**` ONLY**; it never reads
   `tests/**`), **`npm run typecheck:tests` `[H]`** (the additive fourth leg — the ONLY typecheck leg that reads a test file,
   `AGENTS.md` item 4's ruled clause), **`npm run build` `[H]`**, and the **wired-store integration seam** — this unit's
   composition rows compose the SAME boot wiring shape the store wave's tenant admission licensed (`TENANT-1`'s START =
   `main()`'s boot path; END = `tests/store-core-graph-integration.test.ts`, the module-external test at the second root):
   **gate-12 reading = ENVELOPE/INTEGRATION-GREEN** — the store is exercised per the frozen artifact, the assertion is
   module-external. **`[U]` NOT OFFERED with the structural reason stated (`§6`): the drag's full pane-layout flow is the
   FORK's UI (`sidebar-panes.ts`/`pane-drag.ts`), which this repo neither ships nor re-drives — the fork's live UI battery is
   the FORK's OWN pass (`H-r6`).** **`[D]` NOT CLAIMED.**

5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no blind-greens record
   (`docs/specs/pane-drag-compliance-greens.md` is named in the diff scope and is OWED), no per-unit documentation review, no
   DONE row (`§5.3` fixes its twelve-item shape), and **no gate is waived**.

6. **THE OPEN QUESTIONS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a.1` — **four** items, each with a working default and a
   recommendation): **(1)** the `layout`-versus-`settings` cross-path reconciliation (the drag chain reads
   `mem.layout.pane.<id>.size` while the release commits `file.settings.pane.<id>.size` — how the mem layout copy is seeded
   and refreshed is the wiring's reconcile turn, OUTSIDE the gesture's write count; the alternative — the mem read falling
   through to the file-tier value on a MISS — is named); **(2)** whether the session's own `cancel`/`pointercancel` terminal
   (which per `E10`'s landed rows writes ZERO sink values) also triggers the wiring's temp-preview ERASE (recommended YES —
   the four-tier abandon path — with the single-remove-per-gesture rule); **(3)** the throw-disposition of a HOSTILE
   caller-supplied constraint/repair function that throws inside the store's evaluation (recommended: absorbed by the store's
   totality discipline — the write is refused with the violation's posture, nothing stored, nothing propagates to the gesture
   turn; the store contract's "a returned record, never a throw" (`§2.7` items 1/3) is cited); **(4)** whether the wiring
   declares the three top-level roots it owns (`layout` · `drag` · `settings`) in the `storeGraphReferences(rows)` input or
   mints them by first `commit` (both are legal per `store-core-graph.md` `§2.8` item 3; recommended: declare, so the
   register's rows pre-exist the first write).

7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO existing file):**
   `docs/pending.md` §Q's queue block still reads `QUEUE STATE: QUEUED — not admitted` (its own revisit condition is met by
   THIS unit's admission — the flip is the supervisor's, recorded with the dated admission); `docs/next-steps.md` has **no**
   `U-PANE-DRAG-COMPLIANCE` open row yet (the supervisor's to add; the `G1` cell and the ledger counts are untouched by this
   filing); and the §Q "pending-rebuild" mark for the pane-drag flow stays PENDING REBUILD until this unit's obligations
   LAND — this filing is the contract, not the rebuild.

8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone (globbed this pass), so
   there is **no test-use-case coverage matrix and no demo-page index to update** for this unit; the queued contract adds no
   page to this repo's demo (the pane layout is the fork's UI), so nothing in this filing triggers `docs/skills/designing-pages.md`.

9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** One file written, zero files edited, no test run, no leg run, no
   trio run, no `tsc` invocation, no Electron boot, no commit. The new file is **untracked and must be committed by the
   supervisor** (`RCA-8`'s per-gate commit rule).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **THE §Q TWO-RULE CRITERION** (`docs/pending.md` §Q's two-rule read, 2026-10-03): *(1) all module data not strictly function/object-internal is centrally stored · (2) inter-module communication (e.g. the pane drag causing a zone update) is handled by a listener on the store* — and the pane-drag flow's flip under it (the direct host write-through `setLayout` in the fork's `sidebar-panes.ts` is the NON-COMPLIANT shape that this rebuild replaces with store reads/writes + a store listener). | §1 (boundary 1), §2.1 (deliverable C), §2.3, §2.4, §3.1 M-4/M-9, §3.3 I-4 |
| **2** | **THE QUEUED CONTRACT, THE ARCHITECT'S OWN WORDS, SIX CLAUSES** (`docs/pending.md` §Q, quoted at §Q's own block): **(1) CENTRAL STORAGE** — pane/zone visibility, zone and pane sizes, and pane locations are STORED values; `setLayout` is superseded by store reads/writes for these values. **(2) PREVIEW IS TEMP-TIER DATA** — the preview is committed as `temp`-tier data and **the commit of that temp value is what TRIGGERS the zone render** via the store's event surface (a listener on the store). **(3) PROXIMITY DETECTION READS THE STORED SIZES** — the drag's proximity detection on minimized/empty zones reads the zone sizes from the STORE (`layout.zone.<id>.size`), not from host geometry; `threshold`/`withinProximity` compares store-carried values. **(4) THE ZONE-SIZE CONSTRAINT** — zone size obeys a CONFIGURED CONSTRAINT (a PASSED FUNCTION), whose DISCARD + TWO-ARM REPAIR are the CALLER-SUPPLIED REPAIR FUNCTION: arm (a) `[min/2, min)` ROUNDS UP to the configured minimum; arm (b) BELOW `min/2` DISCARDS the size change and MINIMIZES instead, returning its success boolean. **(5) RIGHT-CLICK = CANCEL = ERASE THE TEMP PREVIEW** — a `remove`/`clear` of the temp-tier preview path lets the persistent original (the `file`-tier value) REASSERT (the four-tier lifecycle's abandon path). **(6) RELEASE = COMMIT = TEMP TO FILE** — releasing COMMITS the temp preview to the FILE tier, OVERWRITING the original settings, with the lower-tier copies cleared per `§2.8`. | §2.1, §2.2, §2.3, §2.4, §2.5, §3.1, §3.2 |
| **3** | **`CONSTRAINTS-ARE-PASSED-FUNCTIONS`** (`docs/decisions.md`, ACTIVE, cited BY NAME; landed 2026-10-03, `AMENDMENT CONSTRAINT-RE-DERIVE-1`, store digest `sha256:2933fcb8…`): a constraint is a PASSED FUNCTION called with changed/current/next, boolean + optional feedback reason; a repair is a PASSED FUNCTION taking corrective action, success boolean + optional error; constraints are CODE FEATURES, not runtime data; `unique-path/tier` is a GLOBAL GRAPH BEHAVIORAL STATE, NOT a constraint; `count-exactly-one` is the WORKED EXAMPLE. **The store contract's §2.7 re-derived text (`store-core-graph.md` §2.7 items 1/2/3/5, and §2.1's re-derived `GraphConstraint` block) is THE AUTHORITY for the machinery; the data-table form (`{ id, kind, matchedSet, evaluatedOn, repair, onRepeat, refusalReason }`) is the SUPERSEDED model, kept visible there.** | §2.2, §3.2 F-1..F-3, §3.3 I-1, §4.1, §5.5.1 P-PD-SM-2/P-PD-TP-1 |
| **4** | **THE PLAN'S NAMED PER-MODULE OBLIGATIONS** (`data-ownership-model-plan.md` §5.2.7's round-3 table — the LIVE reading; `15 = 8 STORE-BACKED + 7 PURE` is the ARCHITECT'S SCOPE RULING, byte terms `2 + 6 + 7`): **row 3 `gutter.ts`** — EDGE-READ of `layout.pane.<id>.size` + `.bounds` (the `defaultSizeFor`/`boundsOf` inputs, RECEIVED values), writes NOTHING (the sink stays the consumer's commit seam), **NO byte change**; **row 4 `relocate.ts`** — EDGE-READ of `layout.zone.<id>.slot` (opaque) + `layout.zone.<id>.distance` (a caller-measured scalar) plus the threshold, writes only through its existing consumer sinks (`onReveal` once at the terminal + `onPreview` per move), **NO byte change**; **row 15 `gutter-affordance.ts`** — NO module edge: the tier-3 write is the WIRING'S (`set('temp.drag.<gestureId>.placement', …)` → the subscriber → `applyPreview`), the module's seams (`applyPreview`/`commit`/`startSizeOf`/`boundsOf`) are the caller's and their IMPLEMENTATIONS become store-backed, **NO byte change**; **row 1 `zones.ts`** — PURE (EDGE-READ "the caller passes `mem.layout.zone.<id>.size`/`.display`/`.slot` AS ARGUMENTS — the store read happens in the consumer's closure"), **NO byte change**. The three register rows per store-backed module (`§5.2.7` item (4): import-census-with-positive-control · no-module-level-binding · the two-run store-state-independence differential) bind the modules THIS unit does not touch; THIS unit's own register rows are `§5.5.1`'s. | §1 (boundaries 2/3), §2.1, §2.4, §3.4 R-1/R-2, §3.5, §5.1 |
| **5** | **`E10-SINGLE-SINK-CHANNEL`** (`docs/decisions.md`, ACTIVE, cited BY NAME; the plan's `§5.3` SINK-1..5): the composition's single sink writer is `E3`'s `commit` seam; the session's `commit` option is a NON-FORWARDING recorder (or absent); the two readings (the sink's own record and `E3`'s `stats().sinkCalls`) AGREE per terminal. **SINK-2: the tier-1 store commit rides INSIDE the single sink invocation, as a second effect of the same call — the sink is invoked once, the store is committed once, the two counts agree at `1`.** The per-move temp write NEVER touches the sink (SINK-1). A plan variant that commits per move, or subscribes the session to the store, is NOT a variant — it is a SUPERSESSION of the ruling and routes to the architect. | §2.1 (deliverable C), §2.5, §3.1 M-5, §3.2 F-4/F-5, §3.3 I-2, §5.5.1 P-PD-SM-1 |
| **6** | **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** (`docs/decisions.md`, ACTIVE; the fork-facing carrier is `docs/FORKER.md` §4 `(iv)`): a zone's size domain is **`{min … max} ∪ {minimized}`**; an attempt below the minimum is ROUNDED TO THE MINIMUM **OR** SET TO ZERO (zero being the MINIMIZE verb and never a smaller width); a minimized zone RETAINS its location so proximity detection can expand it back to its configured size; the MEANING OF ZERO and the MEASURE OF THE LOCATION stay CONSUMER-side; the family may supply the PURE MINIMUM CLAMP and RECEIVE the minimum and the slot key / the caller-measured distance. **The queued contract's `min/2` split RE-FINES this ruling's round-or-zero choice into the pinned two-arm band.** | §2.2, §3.1 M-7/M-8, §3.2 F-1, §5.5.1 P-PD-SM-2 |
| **7** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` + `QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION` + `NEXT-SURVIVING-REPAIR-LANDING-…-AND-THE-CRITERION-AS-A-PLACEMENT-RULE`** (`docs/decisions.md`, ACTIVE, by NAME): `file` = persistent (config/settings/file-tracking) · `mem` = in-memory persistent · `temp` = in-memory per-episode · `secure` = main-only; **an UNQUALIFIED read searches `temp` → `mem` → `file` and returns the first hit** (a qualified read addresses ONE tier); `remove('temp.x')` clears temp ONLY (`store-core-graph.md` §2.8 item 4); a temp-only removal leaves the NEXT holder answering — the FILE original REASSERTS on the read; the register cache holds **the lowest-durability MATCH** ("an in-flight `temp` value wins over a committed `file` one", §2.6 item 2). | §2.1 (deliverable C), §2.4, §2.5, §3.1 M-6, §3.2 F-4, §5.5.1 P-PD-SM-3 |
| **8** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE): the eleven caller seams (`gutter-ui.md` `§R.3`'s table) are PUBLIC EXPORTED CONTRACT that DOWNSTREAM CONSUMERS (forks) IMPLEMENT; this repo's demo supplies EXACTLY ONE EXAMPLE IMPLEMENTATION (`src/shared/demo-envelope.ts`); **a seam's DEGRADATION is contract text: absent / non-callable / throwing ⇒ the declared safe default, NEVER a silent no-op.** THIS unit is where the EXAMPLE IMPLEMENTATION (for the drag chain's relevant seams) becomes STORE-BACKED per the plan's row 15. | §2.1 (deliverables A/B/C), §3.2 F-5, §5.5.1 P-PD-TP-2 |
| **9** | **`E3`'s landed seam disciplines** (`docs/specs/gutter.md`): `clampToBounds` is the family's ONE pure clamp site (`S-PURE-4` — no second clamp, no policy baked in); the committing terminal reads `sizeFor` ONCE and commits `clampToBounds(...)`; the reset arm commits `clampToBounds(defaultSizeFor(...), boundsFor(...))` at most once and refuses `'unusable-default'` with ZERO sink writes on an unusable pair; `cancel`/`pointercancel` ⇒ ZERO sink writes. **THE BOUNDS PAIR IS RECEIVED — the family NEVER clamps policy into a stored pair, and the store NEVER clamps.** | §2.1 (deliverable A), §2.5, §3.2 F-5, §3.3 I-6 |
| **10** | **`H-r6` — the fork-side-return convention / the dissolved-edge discipline** (`docs/specs/provident-electron-shell-chrome-handoff-review.md`): this repo writes NO file under `<Astrographer>/`; the fork annotates its own rows; an import/composition edge asserted between two units where the design dissolved it is a FABRICATED EDGE. The fork's pane-drag consumption (`sidebar-panes.ts`/`pane-drag.ts`) is the fork's OWN pass. | §1 (boundary 4), §3.4 R-2, §5.1, §6 |
| **11** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (`docs/decisions.md`, ACTIVE) + **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** + **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** + **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE): a CODE-BEARING unit's spec carries its typed `§5.x` register (P-IM/P-SM/P-TP only; never `F-` rows, never a `§6`/`FS-n` citation as a row) BEFORE its red set; deterministic, caps `≤100`/row · `≤400` total · stop-after-5; per-row strategy id + held/broken; the total printed WITH its terms; the row count is an OUTCOME, not a budget. | §5.5, §5.5.1, §5.5.2, §5.5.3, §5.3 item 10/11 |
| **12** | **`TENANT-1` — the store wave's tenant admission and the integration seam** (`docs/decisions.md`, by NAME; `docs/specs/store-core-graph-compliance-review.md` §9; the frozen artifacts' field tables): the architect's *"Proceed with integration"* (2026-10-03) supplied field 3's pair — START = `src/renderer/renderer.ts` `main()`'s boot path (the store constructed ONCE per realm at boot, wiring role only, NO UI/DOM) · END = `tests/store-core-graph-integration.test.ts` (the module-external test at the second root) — and field 7 grew to FOUR members. **This unit's wired-store composition rows drive THE SAME boot wiring shape, module-externally.** | §5.2 (leg 5), §6, §8 |

### 0A. The two open points the queued contract carried — decided and settled, so this unit does not re-litigate them

1. **OPEN POINT (a) — the constraint's REPAIR DOMAIN — IS ANSWERED BY THE PASSED-FUNCTION RULING, and this filing RECORDS
   that answer rather than re-opening it.** The queued contract's open point asked whether the unit owes "a contract amendment
   adding the repair outcome … or an interpretation that the family-side minimum clamp performs the translation". **The
   architect's ruling `CONSTRAINTS-ARE-PASSED-FUNCTIONS` REMOVED the closed data-token `repair` domain entirely** — the zone-size
   constraint's discard + two-arm repair is the CALLER-SUPPLIED REPAIR FUNCTION (`pending.md` §Q's answering block: *"the
   implementing unit's gate therefore does NOT choose between a contract amendment and a clamp interpretation — the ruling has
   made the choice"*). **This unit's gate owes NO store-contract amendment: the re-derivation LANDED 2026-10-03 (the store's §2.7,
   the `GraphConstraint` type, the frozen artifact's field 2, the register-row `constraintId` cell; `AMENDMENT
   CONSTRAINT-RE-DERIVE-1`).** The landed `clampToBounds` is cited for what it is — the family's clamp site, UNTOUCHED — and is
   NOT the carrier of the repair (the repair is the caller's function).
2. **OPEN POINT (b) — the store edges' home — IS SUPPLIED BY THIS UNIT'S ADMISSION, RECORDED HERE AS THE SUPERVISOR REPORTS
   IT.** The queued contract named the owner as "the foundation's `U-STORE-MODULES`-gated pass **(or an architect-admitted
   successor)** for the store edges". **The architect admitted THIS unit on 2026-10-03 with *"Proceed with pane-drag
   compliance"* — the architect-admitted successor for the drag chain's edges.** The stored `layout.zone.*`/`layout.pane.*`
   obligations this unit pins are therefore THIS unit's contract, under the plan's §5.2.7 verdict set; the OTHER store-backed
   rows' units (theme, focus, the hosts, overlay, menu-template) are NOT this unit's subject and are untouched (§1 boundary 3).
   The fork-side half of the edges (the fork's consumption of the landed edges) remains the fork's own pass (`H-r6`).

---

## 1. Scope

**THE UNIT, IN ONE SENTENCE.** **The family-side landing of the store-backed pane-drag → zone-update flow**: the store-backed
seam implementations for the drag chain, the temp→file preview lifecycle proven against the wired store, the zone-size
constraint + two-arm repair worked example on the landed passed-function machinery, and the zone-render listener — all landed
at the CALLER/WIRING side, with the four named mechanism rows' bytes untouched and the fork's UI bytes belonging to the fork.

**THE FIVE BOUNDARIES:**

1. **THE STORE IS THE FLOW'S DATA CARRIER, AND THE LISTENER IS THE FLOW'S COMMUNICATION** (rule 1 + rule 2 of the §Q
   criterion). **Every value in this flow that is not strictly function/object-internal is a STORED value (§2.4's nine names);
   the drag→zone communication is a STORE LISTENER (§2.3), never a direct host write-through, never a controller callback into
   host state, and never a session member.** `setLayout`'s write-through shape is SUPERSEDED for these values — the spec's
   negative rows make a resumed host-state write-through a FAIL (`§3.4 R-2`).
2. **NO BYTE CHANGE TO THE FOUR NAMED MECHANISM ROWS.** `zones.ts` (row 1, PURE) · `gutter.ts` (row 3) · `relocate.ts`
   (row 4) · `gutter-affordance.ts` (row 15) keep their landed bytes, their landed import censuses (empty, or exactly the
   landed set), and their landed register purity rows. **The store-backed landing is in the CONSUMER'S closure and the WIRING's
   implementations** — the exact shape the plan's round-3 named obligations state. **A pass that edits any of the four modules,
   or that asserts a store import in their bytes, FAILS `§3.4 R-1`.**
3. **THIS UNIT IS THE DRAG CHAIN'S EDGES-ONLY TENANT.** Its subject is the pane-drag → zone-update flow: the pane size/bounds
   reads, the zone slot/distance/size/display reads and the zone-size constraint over them, the temp preview lifecycle, and
   the release commit. **The OTHER store-backed rows of §5.2.7 (theme's token, focus's entries, the hosts' records, overlay's
   state, menu-template's catalog) are NOT this unit's subject** — no value or obligation of theirs is added, moved, seeded or
   asserted here; a pass that smuggles one of them into this unit's surface is a FINDING.
4. **THE FORK'S UI BYTES ARE THE FORK'S OWN PASS** (`H-r6` — recorded, never written here). `sidebar-panes.ts` and
   `pane-drag.ts` (the fork's gutter consumption and drag UI) are NOT in this repo's tree, NOT in this unit's diff scope, and
   NOT this unit's evidence. This unit's obligations END at the store surface and the wiring's seam implementations; the fork
   consumes them in its own pass. **The fork's live UI battery is never claimed by this unit** (`§6`).
5. **THE LANDED STORE SURFACE IS NOT RE-OPENED.** `src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts`
   are landed-green and frozen-artifacted; this unit adds NO store member, NO tier, NO refusal token, NO event arm and NO
   constraint surface — **it SUPPLIES caller code (constraint/repair functions, seam implementations, a listener) and CALLS
   the landed surface with caller-owned names.** The `GraphRefusalReason` union stays closed at SIXTEEN members; the eight-arm
   event envelope stays eight; the tier tokens stay `'temp' | 'mem' | 'file' | 'secure'`.

**WHAT THIS UNIT IS NOT.** Not a shared module unit (no `src/shared/**` byte). Not a page-design unit (nothing in this repo's
demo gains a page; the pane layout is the fork's UI). Not a store unit (the store's own surface is untouched). Not an MCP/UI
unit (no tool, no resource, no notification, no rendered surface in this repo). Not the fork's pass.

---

## 2. The surface (exact)

### 2.1 The store-backed seam contract for the drag chain — the three seam implementations that BECOME store-backed

**The plan's named obligations land at the CALLER/WIRING side.** Each deliverable below is the CALLER'S CLOSURE (this repo's
wiring, `src/renderer/renderer.ts`, holding the store handle per the boot rule — "one store per realm, at boot, held by the
wiring, never in a module-level binding", `store-core-graph.md` §2.11 item 1) or the example seam site (`src/shared/demo-envelope.ts`)
per `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`. **Every signature below IS the family's EXPORTED seam type —
this unit's implementations satisfy those types; nothing is re-declared.**

**(A) THE PANE-SIZE/BOUNDS READS — `startSizeOf`/`boundsOf` become store-backed (plan row 3; affordance row 15).**

| The implementation | Signature (the family's EXPORTED type) | The store read, NAMED | The answer |
| --- | --- | --- | --- |
| **`startSizeOf`** | `StartSizeOf = (element: unknown, token: unknown) => unknown` | **reads `mem.layout.pane.<id>.size`** — the `<id>` derived by the CALLER'S OWN element/token mapping (the caller's closure owns the mapping; the store is never handed an element) | **HIT** (`found: true`) ⇒ the STORED size, by value. **MISS** ⇒ the **DECLARED FALLBACK**: the caller names exactly one value in the same closure (admissible forms: the file-tier value read through the ascending-durability read, or the consumer-held pre-drag size) — **NEVER a store-invented default, NEVER a silent default, NEVER a mechanism literal**. Where the caller declares NO fallback, the E3-declared degradation applies (a non-number answer ⇒ the reset refuses `'unusable-default'` with ZERO sink writes — `gutter.md` `§2.5` item 5) |
| **`boundsOf`** | `BoundsOf = (element: unknown, token: unknown) => unknown` | **reads `mem.layout.pane.<id>.bounds`** | **HIT** ⇒ the RECEIVED `{min, max}` pair **AS STORED — the store stores what the caller wrote and this seam hands it through; it is NEVER a policy clamped here, NEVER a family-side min/max policy, NEVER reconciled with the zone constraint here** (`E3`'s landed seams and `S-PURE-4` rule the clamping; the ONE clamp site is `clampToBounds`). **MISS** ⇒ the declared fallback per the same rule; an unusable pair ⇒ `clampToBounds` answers `NaN` ⇒ the move is INVALID ⇒ the `reset` arm (`gutter-ui.md` `§R.3`'s `boundsOf` degradation) |
| **`defaultSizeFor`** (the reset arm's read; `E3`'s option) | the same read used by `startSizeOf` **at the reset turn** (one closure — `gutter-ui.md` `§2.1` item 3's one-closure wiring) | reads `mem.layout.pane.<id>.size` | identical HIT/MISS/fallback rule; the reset commits `clampToBounds(defaultSizeFor(...), boundsFor(...))` at most once |

**VERIFYING FIXTURES THE ROWS USE (the read route, exact):** the wiring reads through the tier handle — `store.tiers['mem'].get('layout.pane.<id>.size')` ⇒ `GraphTierGetResult { found, value, name }` (`store-core-graph.md` §2.1's block) — or `resolve('mem.layout.pane.<id>.size')`. **A MISS is `found:false` — never a refusal, never a throw** (`§2.5` item 2's declared MISS). **The rows assert the read reached the STORE (the subscriber/recorder double sees the read, and a module-held size that disagrees with the store FAILS).**

**(B) THE CANDIDATE/SLOT READ USED BY PROXIMITY DETECTION (plan row 4).**

| The implementation | Signature (the family's EXPORTED type / the relocate seam) | The store reads, NAMED | The answer |
| --- | --- | --- | --- |
| **`candidatesFor`** (the reader callback injected at `createRelocateSession`'s options) | `RelocateTargetFor`'s candidate production — `(element: unknown) => readonly CandidateFor[]`, each `CandidateFor` carrying **the opaque candidate + its caller-supplied `distance`** (`relocate.md` §2.1 item 2 / `§3d`) | reads **`mem.layout.zone.<id>.slot`** (OPAQUE — returned as-is, never interpreted by the store, never interpreted by the family's bytes) **and** **`mem.layout.zone.<id>.distance`** (a **CALLER-MEASURED scalar** — the caller measures it; the store merely stores what the caller wrote; the family computes no distance) | each candidate answers with the stored slot as the opaque candidate and the stored distance as the candidate's `distance`; a zone whose reads MISS is admitted per the caller's declared rule (the caller's own candidate filtering — never a store decision) |
| **`withinProximity`** | `(distance: unknown, threshold: unknown) => boolean` — **THE PURE TWO-SCALAR COMPARATOR, UNMOVED** (`relocate.md` §2.1 item 1: boundary-inside `distance <= threshold` over the usable class; `typeof`-gate first; a finite negative operand is the UNUSABLE class ⇒ `false`; never a throw) | **NO store read** — it is a pure function of its two arguments | `true` IFF both operands pass the gate and are non-negative and — where both finite — `distance <= threshold`. **The proximity DECISION is the comparator's; a store read never replaces it.** |

**The stored `size`/`display` reads used by proximity detection's minimized/empty-zone path** (queued contract clause 3) are
`§2.4` names 5/6, read by the consumer's closure (plan row 1's shape: *"the caller passes `mem.layout.zone.<id>.size`/
`.display`/`.slot` AS ARGUMENTS — the store read happens in the consumer's closure"*).

**(C) THE TEMP-WRITE TURN — the wiring's per-move turn and the THREE gesture-end writes (affordance row 15's named obligation; the §Q two-rule shape).**

| The turn | The store call, EXACT | The store's declared behaviour (cited) | What it is NOT |
| --- | --- | --- | --- |
| **the gesture's FIRST preview write** | `commit('temp.drag.<gestureId>.placement', <the preview value>)` — **the preview is committed as TEMP-tier data** (queued contract clause 2); `commit` MINTS the temp node and registers its top-level row (`§2.8` item 3) | `cause:'commit'` event; the subscriber's render turn fires | NOT a `set` (a `set` on a path with no node is REFUSED `'undeclared-name'` — `§2.8` item 1) |
| **each SUBSEQUENT observed move** | `set('temp.drag.<gestureId>.placement', <the preview value>)` — the WHOLE preview value each time, replaced in place | `cause:'set'` event (an equal-value write fires NOTHING); the subscriber's render turn fires | NOT a commit, NOT a second node, NOT a sink write (SINK-1 — the per-move temp write NEVER touches the sink; `stats().sinkCalls` stays per the terminal table) |
| **RELEASE** (valid `end` or invalid `reset`) | **`commit('file.settings.pane.<id>.size', <final>)` — the tier-1 commit rides INSIDE the single sink invocation, as a second effect of the same call (SINK-2)** | the file commit performs the regeneration transaction and clears the same logical path's lower copies per `§2.8` items 2/5; `final` is EXACTLY the value the sink received (the clamped dragged value for a valid end; the clamped PRE-DRAG size for a reset) | NOT a second write (the sink is invoked once and the store is committed once — the two readings agree at `1`); NOT a per-move commit |
| **RIGHT-CLICK** | **`remove('temp.drag.<gestureId>.placement')`** — the abandon path (queued contract clause 5) | `remove('temp.x')` clears temp ONLY (`§2.8` item 4); the post-state is a MISS on that path; the unqualified read's next holder — the FILE original — REASSERTS on the read | NOT a commit, NOT a refusal (a MISS is a declared outcome, never a refusal); ZERO sink writes |

**ONE WRITE PER GESTURE END, NEVER TWO (the single-sink channel).** The gesture-end table (`§2.5`) is the total statement:
each terminal performs at most one of the three store writes above, and no terminal performs two. `E10-SINGLE-SINK-CHANNEL`
stays UNSUPERSEDED: a variant that commits per move, subscribes the session to the store, or adds a second sink route is a
SUPERSESSION and routes to the architect.

### 2.2 The zone-size constraint + two-arm repair — the WORKED EXAMPLE as caller-supplied passed functions

**THE MACHINERY (the authority — `store-core-graph.md` §2.7's re-derived text + §2.1's re-derived type):**

```ts
export interface GraphConstraint {
  readonly id: string                              // a DECLARATION KEY, never a mechanism word (§2.7 item 7)
  readonly matchedSet: string                      // a CALLER-SUPPLIED NAME resolved to the data it checks
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]   // the caller's declared operation list
  readonly constraint: (
    changed: unknown, current: unknown, next: unknown,
    feedback?: { readonly reason?: string; readonly message?: string }
  ) => boolean                                     // CALLER CODE — a returned boolean; feedback is a RETURNED RECORD, never a throw
  readonly repair?: (
    data: unknown,
    feedback?: { readonly reason?: string; readonly message?: string }
  ) => boolean                                     // CALLER CODE, OPTIONAL — absent ⇒ refusal-via-feedback is the whole answer
}
```

**THE WORKED EXAMPLE — the queued contract's zone-size constraint, IN THE CALLER'S OWN SHAPE (supplied AT CONSTRUCTION through
`createGraphStore({ constraints: […] })` — the ONE supply site; no install path, no runtime mutation; the store CALLS the
functions and NEVER interprets their internals):**

1. **THE CONSTRAINT FUNCTION — a SIZE-BAND PREDICATE over (changed, current, next) → boolean.** The caller's closure holds the
   **configured minimum `min`** and the configured maximum `max` — **the configured minimum is the CALLER'S DATA, captured in
   the caller's closure, NEVER a store default, NEVER a mechanism literal, NEVER a family-side constant** (the family ships no
   min/max literal — `zones.md`/`census.md`'s no-literal rows and the plan's `P-3` no-policy-default rule). The predicate is
   `true` IFF the `next` zone size is within the configured domain **`{min … max} ∪ {minimized}`** (`ZONE-SIZE-DOMAIN…` ruling
   clause 1); a `next` BELOW `min` (a sub-minimum size) ⇒ `false` **— a sub-minimum size is NEVER stored** (§3.3 I-1). The
   predicate consults nothing but its three arguments (+ the caller's own `min`/`max` closure and the caller's
   minimize-marker vocabulary). **The feedback reason on a `false` answer is the caller's own DATA STRING in the returned
   record — never a new store token (the `GraphRefusalReason` union stays closed at SIXTEEN, §2.7 item 3's re-derived text).**
2. **THE REPAIR FUNCTION — THE TWO-ARM REPAIR, with the `min/2` band boundary as the PINNED SPLIT.** Called on this
   constraint's violation, it takes CORRECTIVE ACTION to the data and outputs a SUCCESS BOOLEAN (+ optional error message):

   | The band (the candidate zone size after the violating write) | THE PINNED SPLIT | The repair arm's corrective action | The end state |
   | --- | --- | --- | --- |
   | **`size ∈ [min/2, min)`** — including EXACTLY `min/2` | **arm (a)** | **the size is ROUNDED UP to the configured minimum** — the corrective action writes `min` (never a value between `min/2` and `min`, never the violating value) | the stored zone size = `min`; the constraint holds on the repair's own post-state |
   | **`size < min/2`** — strictly below the band | **arm (b)** | **the size change is DISCARDED and the zone is MINIMIZED instead** — the corrective action erases the size change and writes the CALLER'S OWN minimize marker (the MEANING OF ZERO and the minimize vocabulary stay consumer-side — `ZONE-SIZE-DOMAIN…` clauses 2/4) | the zone's size change is gone and the zone reads MINIMIZED; the constraint holds on the repair's own post-state |

   **THE BOUNDARY: `size === min/2` is arm (a); `size < min/2` is arm (b). No third band exists, no gap exists — the queued
   contract's `[min/2, min)` and "below `min/2`" partition the below-minimum domain exhaustively** (§3.2 F-1 pins a straddle
   as a FAIL).
3. **THE REPAIR LANDS IN THE SAME COMMITTED WRITE** (`§2.7` item 3, re-derived): no partial state, no window in which the
   post-state violates the constraint; the repair **emits its OWN `cause:'repair'` EVENT carrying the repaired value** while the
   violating caller's own write still emits its own (a repairing operation = "one event for the caller's reference plus one
   per repaired reference"); **the receipt's `repaired[]` NAMES EACH repaired reference**; an unsuccessful or ABSENT repair
   **CLEARS NOTHING and leaves the store byte-identical to its pre-call state**.
4. **THE REFUSAL-VIA-FEEDBACK PATH (the repairless case):** a constraint WITHOUT a repair answers a violation by REFUSAL —
   the refusal reason comes from the constraint's OWN feedback, as a RETURNED RECORD, **never a throw**; the receipt reads
   `{status:'refused', reason:<the caller's feedback reason>, cleared: [], repaired: [], rows: [], crossings: 0, events: 0}`
   and the store is byte-identical to its pre-call state (`§2.7` item 3; `§2.2` P-5's returned-record discipline).
5. **`unique-path/tier` is NOT a constraint** (a global graph behavioral state — `§2.7` item 4, the re-derived text): no row of
   this unit may assert it as a constraint, and nothing here adds it to the constraint set.
6. **THE EVALUATION POINTS are the store's** (`§2.7` item 2): EVERY `set`/`commit` AND EVERY `remove` evaluates the
   caller-supplied constraint on its POST-STATE; `clear`/`sweep` DO NOT evaluate it; **a repair's own write is itself
   evaluated on its OWN post-state**. A row that observes a constraint evaluated on a `clear`, or a `remove` skipping the
   evaluation, FAILS (the store's own `M-13` class, asserted here over THIS unit's constraint).

### 2.3 The zone-render listener — rule 2's shape, a STORE SUBSCRIBER

1. **THE ZONE RENDER IS A STORE SUBSCRIBER** — `store.subscribe(name, listener, opts?)` (`§2.1`'s `GraphStore` block; `§2.10`
   items 1–6). **The committed temp preview's `set`/`commit` event is what TRIGGERS the render listener** (queued contract
   clause 2: *"the commit of that temp value is what triggers the zone render, via the store's event surface (the `set`/`commit`
   event arm; the zone render is a listener on the store, rule 2's shape)"*).
2. **THE REGISTRATION SHAPE, EXACT.** The wiring registers the render listener at boot against the temp preview namespace:
   **a subtree subscriber on the `drag` top-level reference** — `store.subscribe('drag', listener, { subtree: true })` — so the
   listener persists across gestures and fires `cause:'descendant'` for each write under it, with **`origin` carrying the
   WRITTEN PATH FULLY QUALIFIED** (`'temp.drag.<gestureId>.placement'`) and NO value (`§2.10` items 2/6). **The per-reference
   subscription form — `store.subscribe('temp.drag.<gestureId>.placement', listener)` registered at the gesture's first
   preview commit — is the admissible alternative**; the spec's rows assert the OBSERVABLE DELTA (the event arrives with the
   declared arm and the render runs) and never the internal subscription bookkeeping. **A write to a descendant NEVER
   writes, clears or pings a persistent ancestor** (`§2.10` item 6).
3. **THE ENVELOPE IS THE STORE'S EIGHT-ARM ENVELOPE, UNMOVED** — `{name, flag, value, cleared[], cause}` with
   `cause ∈ {'set','commit','clear','sweep','remove','repair','descendant','severed'}`, `origin` on the `descendant` arm alone,
   `cleared[]` present (possibly empty) on EVERY arm. **This unit adds no arm.**
4. **THE RENDER READS THE ZONE'S STORED SIZE/VISIBILITY FOR ITS LAYOUT CALL** — `mem.layout.zone.<id>.size` and
   `mem.layout.zone.<id>.display` — **NEVER a module-held variable, NEVER host geometry, NEVER a controller callback into host
   state** (that is the non-compliant shape this rebuild replaces). The render's layout input is a pure function of STORED
   values.
5. **THE FAN-OUT RULES ARE THE STORE'S, UNMOVED** (`§2.10` items 4/5): registration-order fan-out; one event to three
   listeners is `events: 1` and three deliveries (both readings asserted); a listener that THROWS does not propagate to the
   mutator's caller (the store catches it, continues the fan-out, and the operation's receipt is UNCHANGED); `unsubscribe()`
   answers `true` the first time and `false` thereafter; a NON-CALLABLE listener is refused `'malformed-name'` and registers
   NOTHING.

### 2.4 Stored values, ENUMERATED — the store-backed name set for the drag chain

**NINE names. Name segments are the CALLER'S OWN spellings — the store never interprets them, never re-keys them, and owns no
consumer vocabulary (`store-core-graph.md` §2.2 P-3; the constraint id is a declaration key, `§2.7` item 7). The `<id>` and
`<gestureId>` segments are the CALLER'S OWN identifiers, carried verbatim.** Each row states WHO reads/writes it and at WHICH
gesture turn.

| # | The stored name | TIER | WHO reads it | WHO writes it | At which gesture turn |
| --- | --- | --- | --- | --- | --- |
| **1** | `mem.layout.pane.<id>.size` | mem | the `startSizeOf`/`defaultSizeFor` implementation (§2.1 A) | the wiring's reconcile turns (§7a.1 item 1's default), PLUS the seeding at boot | `onStart` (the pre-drag read) · the `reset` terminal (the default read) |
| **2** | `mem.layout.pane.<id>.bounds` | mem | the `boundsOf` implementation (§2.1 A) | the caller (the pair is RECEIVED — the store stores what the caller wrote, never a policy clamped here) | the evaluating terminals (`end`/`reset`) |
| **3** | `mem.layout.zone.<id>.slot` | mem | the `candidatesFor` closure (§2.1 B) — OPAQUE, returned as-is | the caller | each observed move |
| **4** | `mem.layout.zone.<id>.distance` | mem | the `candidatesFor` closure (§2.1 B) — a CALLER-MEASURED scalar | the caller | each observed move |
| **5** | `mem.layout.zone.<id>.size` | mem | the zone-size constraint's data (via `matchedSet`) · the zone-render listener (§2.3 item 4) · the proximity detection's minimized/empty-zone reads (queued clause 3, consumer closure) | the store's WRITE machinery under the caller-supplied constraint/repair (the constrained store) | every zone-size write; the repair's own write |
| **6** | `mem.layout.zone.<id>.display` | mem | the zone-render listener (§2.3 item 4) · the consumer's reveal/visibility logic | the caller; the repair arm (b) writes the minimize marker through the caller's own vocabulary | the repair's turn; the render's turn |
| **7** | `mem.layout.pane.<id>.location` | mem | **the pane location member** (queued contract clause 1: *"pane locations are STORED values"*) — read by the placement/resolve logic | the caller (the MEASURE OF THE LOCATION stays consumer-side — `ZONE-SIZE-DOMAIN…` clause 4) | the placement turn |
| **8** | `temp.drag.<gestureId>.placement` | temp | the wiring's subscriber turn (the preview's consumer) · the subscriber fires the zone-render listener | the WIRING — `commit` at the gesture's first preview write, `set` per subsequent move, `remove` at right-click (§2.1 C) | every observed move · right-click · the abandon paths |
| **9** | `file.settings.pane.<id>.size` | file | the release COMMIT's target — the persistent commit target; the unqualified read's FILE-tier reassert (the four-tier abandon path) | the WIRING — at the release/reset terminal, inside the single sink invocation (SINK-2) | the `end`/`reset` terminal, ONCE per gesture |

**THE ROW-LEVEL RULE.** A row asserting a read or a write MUST name the stored reference and the turn (this table is the
enumerated authority), and a row that counts writes MUST count the store's receipts (the `cleared[]`/`repaired[]`/`rows[]`/
`events` members), never a host-side guess.

### 2.5 The gesture turns — the terminal write table (TOTAL)

| The gesture turn | The sink's own record (`E3`-side reading) | The STORE turnout (this unit's reading) | The subscriber delta |
| --- | --- | --- | --- |
| `onStart` / establishment | `sinkCalls: 0` | `startSizeOf` read (hit/fallback); NO write | none |
| each observed move | `sinkCalls: 0` (SINK-1 — the temp write never touches the sink) | ONE `set('temp.drag.<gestureId>.placement', …)` (the FIRST move of the gesture: ONE `commit` at temp — the mint) | `cause:'set'` / `cause:'commit'` (first) → the subscriber's render turn |
| **RELEASE — valid** (`end`) | **`1`** — the clamped dragged value | **ONE** `commit('file.settings.pane.<id>.size', <final>)` — the final EQUALS the sink's argument; the lower copies cleared per `§2.8`; the temp preview is superseded by the same commit's path-level clears where the paths coincide, and by the abandon rule where they do not (§7a.1 item 1) | the file commit's event; the zone render re-reads the stored values |
| **RELEASE — invalid** (`reset`) | **`1`** — the clamped PRE-DRAG size | **ONE** commit of the same value (the persistent original RESTORED BY THE COMMIT) | ditto |
| **RIGHT-CLICK** (abandon) | **`0`** | **ONE** `remove('temp.drag.<gestureId>.placement')` | `cause:'remove'`; the unqualified read afterwards answers the FILE original (the reassert) |
| `cancel` / `pointercancel` | **`0`** | `0` sink writes; the wiring's temp ERASE is §7a.1 item 2's working default (recommended YES — the abandon path; at most ONE remove per gesture) | per the store's event rules |

**THE ONE-WRITE RULE, RESTATED:** every gesture's end performs EXACTLY ONE of the three store writes in the table (the file
commit for `end`/`reset`, the temp remove for right-click) — **never two, never the wrong one, never a per-move commit**. The
mid-gesture temp writes are not gesture-end writes and are bounded by the move turn.

### 2.6 The prohibitions — **every prohibition cites an ENUMERATED static row (`§3.4`)**

1. **NO SECOND WRITER AND NO SECOND CLAMP.** The single sink channel (`E10-SINGLE-SINK-CHANNEL`) and `S-PURE-4`'s one clamp
   site bind this unit exactly as they bind the landed seams: the commit rides the single sink invocation (SINK-2); no seam
   wrapper, reset path or repair function adds a clamp; the store never clamps. | `§3.4 R-4`
2. **NO STORE TOKEN IN A MECHANISM'S BYTES, AND NO STORE HANDLE IN A MODULE-SCOPE BINDING.** The four named mechanism modules
   keep their byte identity (`R-1`); the store handle appears ONLY as a wiring-held value, passed as arguments into closures —
   never `const store = …` at module scope (`R-2`; the `F-12` shape `dom-shim.ts` records). | `§3.4 R-1`/`R-2`
3. **NO HOST-STATE WRITE-THROUGH.** The `setLayout`-style flow is superseded for this unit's nine names: a resumed direct host
   write to pane/zone layout values, or a controller callback into host state carrying them, FAILS. | `§3.4 R-2`
4. **NO SESSION SURFACE.** The frozen gesture-session delegate surface (`gsession.md` §2.5's eleven items, byte-for-byte) gains
   NO store parameter, NO subscription, NO member; the store's listener is the wiring's, and the session reads/writes the store
   exactly as any caller does — through the store's own surface (`data-ownership-model-plan.md` §5.4's answered `Q-8`). | `§3.4 R-3`
5. **NO NEW STORE SURFACE.** No store member, tier token, refusal token, event arm, constraint surface or `scripts`/`package`
   key is added; the `GraphRefusalReason` union stays closed at SIXTEEN; the eight-arm envelope stays eight. | `§3.4 R-5`
6. **THE FORK'S TREE IS NOT WRITTEN** (`H-r6`). | `§3.4 R-2`, §5.1

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The store-backed `startSizeOf` read answers the STORED size on a HIT** | `mem.layout.pane.<id>.size` resident; the seam implementation called at `onStart` with the caller's own `<id>` mapping | the seam returns the STORED size BY VALUE; the read reached `store.tiers['mem']` (the recorder double sees it); **a module-held size that disagrees with the store FAILS** | §2.1 A, §2.4 name 1, §2.5 | `[T]` |
| **M-2** | **A MISS answers the DECLARED FALLBACK, never a silent default** | `mem.layout.pane.<id>.size` ABSENT; the caller's closure declares fallback `f` | the seam returns **`f`** (the caller's own named value); the store invented NOTHING (no default constant exists or is consulted); with NO declared fallback the E3-declared degradation applies (`'unusable-default'` at the reset, ZERO sink writes) | §2.1 A, §3.2 F-5, `gutter.md` `§2.5` item 5 | `[T]` |
| **M-3** | **`boundsOf` hands the RECEIVED pair through — never a policy clamped here** | `mem.layout.pane.<id>.bounds` resident with a caller-written pair `{min: m, max: M}`; a move clamps through `clampToBounds` | the seam returns the pair AS STORED (byte/value-identical members); `clampToBounds` (the family's ONE site) is the ONLY clamp; **neither the seam, the store nor any repair wrote a min/max policy** | §2.1 A, §0 ruling 9 | `[T]` |
| **M-4** | **The temp preview write fires the subscriber → the render turn** | the wiring's move turn calls `set('temp.drag.<gestureId>.placement', p)` (after the first-commit mint) | the store emits exactly ONE `cause:'set'` event; the zone-render listener (subscribed per §2.3 item 2) runs; the render's layout input is read FROM THE STORE (`mem.layout.zone.<id>.size`/`.display`) — **a changed store value with an un-mutated module variable CHANGES the render's answer** | §2.1 C, §2.3 items 1/4, §2.4 name 8 | `[T]` |
| **M-5** | **A valid release commits the SINK'S VALUE once — the two readings AGREE at `1`** | a full observed lifecycle ending in `pointerup` with a valid drag state | the sink's own record reads `1`, `E3`'s `stats().sinkCalls` reads `1` (they AGREE), and the STORE received exactly ONE `commit('file.settings.pane.<id>.size', final)` whose value EQUALS the sink's argument (the clamped dragged value); the receipt is `status:'committed'`; **the store's committed value and the sink's argument agree by value** | §2.1 C, §2.5, §0 ruling 5 (SINK-2) | `[T]` |
| **M-6** | **Right-click erases the temp preview; the FILE original reasserts** | an active drag with a resident `temp.drag.<gestureId>.placement`; right-click | exactly ONE `remove('temp.drag.<gestureId>.placement')` (temp-only clear per `§2.8` item 4); ZERO sink writes; **the unqualified read of the preview/placement path afterwards answers the FILE-tier value** (the ascending-durability read's next holder — the four-tier abandon path) | §2.1 C, §2.5, §0 ruling 7 | `[T]` |
| **M-7** | **REPAIR ARM (a): `[min/2, min)` rounds UP to the minimum** | the zone-size constraint supplied with caller's `min`; a violating write whose next size is in `[min/2, min)` (driven at `min/2`, `min/2 + ε`, `min − ε`) | the stored zone size is **`min`** (rounded up); the repair's corrective action lands IN THE SAME COMMITTED WRITE; ONE `cause:'repair'` event with the repaired value; the caller's own write's event ALSO fires; `repaired[]` names the reference | §2.2 items 2/3, §3.3 I-1 | `[T]` |
| **M-8** | **REPAIR ARM (b): below `min/2` is discarded — the zone MINIMIZES instead** | a violating write whose next size is strictly below `min/2` | the size change is GONE and the zone reads MINIMIZED (the caller's own minimize marker); same-committed-write, `cause:'repair'`, `repaired[]` — identical mechanics to arm (a) | §2.2 items 2/3, §3.3 I-1 | `[T]` |
| **M-9** | **The zone-render listener reads STORED values for its layout call** | a resident `mem.layout.zone.<id>.size` + `mem.layout.zone.<id>.display`; a temp preview event fires the render | the layout input is derived from the stored reads (a fixture that substitutes a module-held variable FAILS); the twelve stored-value reads across the drives are all DIRECTIONAL (a read the wiring never performs FAILS `P-PD-SM-4`) | §2.3 item 4, §2.4 names 5/6 | `[T]` |
| **M-10** | **The unqualified read answers the TEMP preview while active** | a resident `temp.drag.<gestureId>.placement`; an unqualified read of the preview/placement path | the read answers the TEMP value (the in-flight `temp` wins over the committed `file` — the register cache's lowest-durability match, `§2.6` items 1/2) | §0 ruling 7, §2.4 name 8 | `[T]` |
| **M-11** | **The candidate reads reach the PURE comparator as scalars** | `mem.layout.zone.<id>.slot` + `.distance` resident; the `candidatesFor` closure builds candidates; a proximity decision | the candidate carries the OPAQUE stored slot and the STORED distance; `withinProximity(distance, threshold)` answered the decision (the pure two-scalar comparator — no geometry read, no element read); the store was never handed an element | §2.1 B, §0 ruling 4 | `[T]` |
| **M-12** | **The wired-store composition holds end-to-end over the REAL store** | the boot wiring shape driven with a real `createGraphStore(...)` (with this unit's constraint/repair supplied) and a recording source double — the module-external integration form | the full lifecycle (moves → release/right-click) produces the declared receipts and events on the REAL store; the register shows the caller's roots; NO throw escapes any turn | TENANT-1, §5.2 leg 5, §6 | `[T]` |

### 3.2 Documented fail-states / non-happy states

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A sub-minimum size is NEVER stored** | the zone-size constraint (with repair) supplied; a violating write with a next size below `min` — including **exactly `min/2` (arm (a)) and `min/2 − ε` (arm (b))** | after the write+repair, NO stored value lies in `[0, min)` — the post-state is `min` (arm (a)) or minimized (arm (b)); **a straddle (a stored value between `min/2` and `min`, or a lost band) FAILS** — the `min/2` split is the PINNED partition of the below-minimum domain | §2.2 items 2/3, §3.3 I-1 | `[T]` |
| **F-2** | **A refused/absent repair answers REFUSAL-VIA-FEEDBACK — a returned record, never a throw** | the zone-size constraint WITHOUT a repair; a violating write | the receipt reads `{status:'refused', reason:<the constraint's own feedback reason>, cleared: [], repaired: [], rows: [], crossings: 0, events: 0}`; **the store is byte-identical to its pre-call state; NOTHING is stored, NOTHING is cleared, NOTHING is emitted; NO throw escapes** | §2.2 item 4, §0 ruling 3 | `[T]` |
| **F-3** | **A repair's failure lands NOTHING** | a repair function returning `false` (its corrective action refused/failed) on a violating write | the store is byte-identical to its pre-call state; `repaired: []`, `cleared: []`, the feedback carries the repair's reason; NO partial state (no window in which the constraint is violated on disk/in-memory) | §2.2 items 3/4, `§2.7` item 3 | `[T]` |
| **F-4** | **Right-click during a NON-EXISTENT drag is a NO-OP — MISS, never a refusal** | `remove('temp.drag.<gestureId>.placement')` with NO temp node at that path | the receipt is the declared MISS outcome (`cleared: []`, per `§2.8` item 4's declared `cleared: []`); **NEVER a refusal, NEVER a throw, NEVER a second write**; the file original continues to answer | §2.1 C, §2.8 item 4, §3.1 M-6 | `[T]` |
| **F-5** | **A release with NO preview data commits NOTHING (a normal file write)** | the release terminal when no `temp.drag.<gestureId>.placement` exists (no preview data) | the commit performs a NORMAL file-tier write of the terminal's value: `commit('file.settings.pane.<id>.size', <final>)` clears `[]` where no lower copy exists (`§2.8` item 2's declared `cleared: []`), commits the value, and is NEVER a refusal, NEVER a removal, NEVER a second write; the two readings still agree at `1` | §2.1 C, §2.5, `§2.8` item 2 | `[T]` |
| **F-6** | **No two writes per gesture end** | every terminal of §2.5 driven twice over (the full grid) | the store received EXACTLY the table's declared write for each terminal — a terminal that produced a commit AND a remove, a per-move commit, or a right-click that also committed, FAILS; the `events` count equals the declared arms | §2.5, §3.3 I-2 | `[T]` |
| **F-7** | **A throwing factory-side function does not corrupt the gesture turn** | a hostile non-callable/throwing object where the wiring's constraint/repair supply expects functions | the declared degradation per §7a.1 item 3's working default (absorbed — the write refused with the violation's posture, nothing stored, nothing propagates to the gesture turn) — NEVER a throw out of a wiring turn, NEVER a silent store mutation | §7a.1 item 3, §5.5.1 P-PD-TP-1 | `[T]` |
| **F-8** | **A throwing seam implementation's throw is BOUND to its turn** | the store-backed seam implementations driven with hostile store states (an absent store, a throwing tier-handle read, a hostile stored value) | the VALUE-READING seams' throws are ABSORBED in the observed-move turn (the move answers the declared degradation — the reset arm or the refusal) — the family's seam rules bind the implementations exactly as they bind a fork's (`gutter-ui.md` `§R.3`); no throw escapes a wiring turn | §5.5.1 P-PD-TP-2, `gutter-ui.md` `§R.3` | `[T]` |
| **F-9** | **The constrained store never STARES a sub-minimum size across the WRITE grid** | every zone-size write shape (set/commit/remove) × every band, driven on the wired store | every end state satisfies the constraint (the enumerated `I-1` grid, executed as `P-PD-SM-2`) — a single cell whose end state is sub-minimum FAILS the row | §3.3 I-1, §5.5.1 P-PD-SM-2 | `[T]` |
| **F-10** | **The listener reads the store, not a module-held variable** | a fixture holding a module-level `let preview = …` that the render substitutes for the store read | the render's answer CHANGES when the STORE changes and the module variable does NOT, and VICE VERSA — the row asserts the render's input is the store's (the differential of `P-PD-SM-4`); a render that consults host geometry or a controller callback FAILS | §2.3 item 4, §3.4 R-2 | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Pinned by |
| --- | --- | --- |
| **I-1** | **THE CONSTRAINED-STORE INVARIANT: NO STORED ZONE SIZE IS EVER SUB-MINIMUM.** For every zone-size write the constrained wired store accepts, the stored value is in the configured domain `{min … max} ∪ {minimized}` — a sub-minimum value is either repaired (to `min` or to minimized, same committed write) or refused (repairless); no post-state of any write, repair or remove violates it. | §2.2, §3.1 M-7/M-8, §3.2 F-1/F-9 |
| **I-2** | **ONE WRITE PER GESTURE END.** Every terminal of §2.5 performs exactly one of the three store writes; no terminal performs two; the per-move temp write never touches the sink. | §2.5, §0 ruling 5 |
| **I-3** | **THE COMPARATOR STAYS PURE.** `withinProximity(distance, threshold)` is a function of its two scalars alone: no store read, no geometry read, no element read, no magnitude computation, no second comparison site. | §2.1 B, `relocate.md` §2.1 item 1 |
| **I-4** | **THE RENDER READS THE STORE.** The zone-render listener's layout input is a function of the stored zone size/display — never a module-held variable, never host geometry, never a controller callback into host state. | §2.3 item 4, §3.1 M-9, §3.2 F-10 |
| **I-5** | **THE FOUR NAMED MECHANISMS KEEP THEIR BYTES.** `zones.ts`/`gutter.ts`/`relocate.ts`/`gutter-affordance.ts` are byte-identical in their landed import censuses, purity rows and module-level state; no store token enters their bytes. | §1 boundary 2, §3.4 R-1 |
| **I-6** | **THE FAMILY'S ONE CLAMP SITE STANDS.** `clampToBounds` is the only clamp; the store never clamps, no seam wrapper clamps, no repair function clamps. | §0 ruling 9, §2.2 item 2 |
| **I-7** | **THE STORE IS THE FLOW'S ONLY DATA CARRIER.** The nine names of §2.4 are the flow's whole data surface: no pane/zone visibility, size, location or placement value lives in host module state; a resumed `setLayout` write-through FAILS. | §1 boundary 1, §3.4 R-2 |

### 3.4 The STATIC rows — the rows `§2.6`'s prohibition table cites, ENUMERATED

| id | The row | What FAILS |
| --- | --- | --- |
| **R-1** | **THE NO-BYTES-MOVE ROW (plan rows 1/3/4/15).** Over the four modules' source (`src/shared/zones.ts` · `src/shared/gutter.ts` · `src/shared/relocate.ts` · `src/shared/gutter-affordance.ts`), INCLUDING their comments: NO import statement is added or removed (the landed censuses hold as landed), NO store/cache/persist token appears (the `gutter.md` `R-1`-family scan tokens extended by `store`, `subscribe`, `tiers`, `mem`, `temp`, `file`, `drag`, `layout`, `placement`), and their module-level state is unchanged. Positive control: a fixture import of the store FAILS. Scope: the four modules' OWN bytes; THIS unit's wiring bytes are NOT scanned by this row. | a pass that edits any of the four modules, or asserts a store read inside their bytes |
| **R-2** | **THE WIRING-ONLY / NO-WRITE-THROUGH ROW.** The store handle appears ONLY as a wiring-held value passed into closures — never as a module-scope `const`/`let` binding (`dom-shim.ts`'s `F-12` shape); the nine names of §2.4 are written ONLY through the store's surface (no `setLayout`-style host write, no controller callback into host state carries them); this repo writes no file under `<Astrographer>/` (`H-r6`). Positive controls: a module-scope store binding FAILS; a host-state write to a stored name FAILS. | a wiring that binds the store at module scope, resumes the write-through, or touches the fork's tree |
| **R-3** | **THE FROZEN-SESSION ROW.** The session's `§2.5` surface is read byte-for-byte: NO member is added (no `subscribe`, no store parameter, no `onChange`); the store's listener is the wiring's, registered on the store, never on the session; the session's `commit` option stays a NON-FORWARDING recorder or absent. | a session-level channel, a session store member, or a forwarding session `commit` |
| **R-4** | **THE ONE-SINK/ONE-CLAMP ROW.** The composition's single sink writer is `E3`'s `commit` seam; the tier-1 commit rides inside the single sink invocation (SINK-2); `clampToBounds` is the family's ONE clamp site — a second sink route, a commit-per-move, or a second clamp (in a seam wrapper, a reset path, a repair function) FAILS. | any of the three |
| **R-5** | **THE NO-NEW-STORE-SURFACE ROW.** `createGraphStore` is called with the LANDED options (`declarations?`, `constraints?`, `crossing?`, `reservedNamespaces?`, `enableTestSeam?`) — no new option member; no store member, tier token, refusal token or event arm is added; the union stays SIXTEEN; the envelope stays eight; no `scripts`/`package`/`tsconfig`/`vitest.config` key changes. | any new store surface or config key |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | The claim | The probe |
| --- | --- | --- |
| **E-1** | **NO NEW SHARED MODULE SHIPS.** This unit adds no `src/shared/**` module; the four named mechanism modules remain the ONLY shared modules their files' registries name (probe: the unit's diff adds no `src/shared/*` path). | the diff's `src/shared/**` set equals `{}` |
| **E-2** | **THE UNIT'S TEST HOME IS ONE NEW FILE.** `tests/pane-drag-compliance.test.ts` is the unit's test file; the store wave's integration file (`tests/store-core-graph-integration.test.ts`) is CITE-ONLY (the module-external end point, never edited by this unit). | the diff's `tests/**` new-file set |
| **E-3** | **THE STORE'S LANDED SURFACES ARE NOT REWRITTEN.** `src/renderer/store-core-graph.ts` / `store-graph-references.ts` are untouched by this unit (their digests, per the frozen artifacts, are not re-derived by this unit). | the diff's `src/renderer/*store*` set equals `{}` |
| **E-4** | **THE TRACKER FILES ARE NOT EDITED BY THIS PASS.** `docs/next-steps.md` · `docs/pending.md` · `docs/decisions.md` · `docs/defects.md` · `docs/HANDOFF.md` are CITE-ONLY here; the admission/queue flips are the supervisor's. | this pass's edited-file set |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The unit is CODE-BEARING, so its typed register (`§5.5.1`) is FILED WITH THIS SPEC (gate 11 — a TestWriter may not be
delegated under the zero-row exemption; the ZERO-ROW EXEMPTION IS NOT AVAILABLE and no exemption block is carried).** The red
set is authored from THIS file alone (the sibling docs are CITE-ONLY for the red's citations; the red's rows must be derivable
from this spec's surface; a red row that requires a clause this spec does not state is a red-set defect). **The red set runs
BEFORE any implementation** — the store-backed seam implementations, the constraint/repair supply, the listener registration
and the wiring turns do not exist yet, so every drive against them is RED (`Cannot find`/`does not exist`/`not implemented`
classes), exactly as the sibling units' red runs recorded.

### 4.2 Red-set authoring order

**(1)** the store-backed read rows (`§3.1 M-1`..`M-3`, `§3.2 F-5`/`F-8`) against the absent seam implementations; **(2)** the
temp-write-turn rows (`M-4`/`M-5`/`M-10`, `F-4`/`F-5`/`F-6`) against the absent wiring turns; **(3)** the constraint/repair
rows (`M-7`/`M-8`, `F-1`/`F-2`/`F-3`) against the absent supplied functions (the STORE itself is landed and green — the red
is the supply's absence, and the machinery rows of the store's own suite are NOT re-authored); **(4)** the listener rows
(`M-9`, `F-10`, `P-PD-SM-4`); **(5)** the register's EXECUTED layer (`§5.5.1` — every row, per `§5.5`'s rule that an
un-run register row is reported as a FAILURE); **(6)** the static rows (`§3.4 R-1`..`R-5`).

### 4.3 What the red is NOT

Not a re-test of the landed store surface (`tests/store-core-graph.test.ts` and its register are the STORE unit's, untouched).
Not a re-test of the four mechanism modules (their suites and registers are their own units', untouched). Not a fork test (the
fork's `sidebar-panes.ts`/`pane-drag.ts` are not in this repo's tree). Not a `[U]`/rendered test (none is offered).

### 4.4 The stop conditions (binding)

1. **A red row derived from a clause this spec does not state is STOPPED** — the row is a spec defect, reported, and §2 is
   amended (this filing's contract is the authority, and an amendment at the spec gate is a dated annotation beside the
   clause, never a rewrite).
2. **A register row whose drives cannot reach its declared term is STOPPED** — a declared term IS a drive count
   (`A DECLARED REGISTER TERM IS A DRIVE COUNT`), and a mis-derived term is re-derived and re-printed WITH the addition, never
   silently fixed.
3. **A row requiring the fork's tree, a live UI, or an assembled-app premise is STOPPED** — this unit offers none of those
   layers.
4. **The red is REPORTED with the failing class** — a TestWriter reports the red set's row count and the failing set
   (`RCA-1`'s *"the red set must be RUN and REPORTED per unit BEFORE implementation"*), and the DONE row's red/green cells are
   written from that report.

### 4.5 Delegation gate

**This unit is delegable ONLY once (a) this spec is approved at the spec gate, and (b) a TestWriter has RUN and REPORTED the
red set** (`AGENTS.md` item 9). **Neither is true at this filing** — the spec gate's approval and the red run are the two
conditions the supervisor checks before delegating the Implementer.

---

## 5. Wiring

### 5.1 Diff scope (what this unit MAY touch)

| # | Path | Status | The bounded role |
| --- | --- | --- | --- |
| 1 | `src/renderer/renderer.ts` | **ALLOWED — the wiring role, bounded** | the store-backed seam implementations of §2.1 (panes/zones drag chain only); the `createGraphStore` construction at the boot site WITH this unit's constraint/repair supply and the caller's declarations (per `TENANT-1`'s supplied START); the zone-render listener registration (`§2.3`); the temp-write/move turns and the release/right-click terminal turns (`§2.1` C, `§2.5`); the store reading/writing of §2.4's nine names — **and nothing else** (no UI content, no DOM authoring, no MCP surface — the `AGENTS.md` provident-authoring constraint and the wiring-role discipline are CARRIED, not lifted) |
| 2 | `src/shared/demo-envelope.ts` | **ALLOWED — the ONE example implementation site** | the drag-chain seams' example implementation becoming store-backed per `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` and plan row 15 — exactly the seams §2.1 names; the demo file stays authored DATA, never a store tenant (`§3.5` row `2.5-1` of the plan) |
| 3 | `tests/pane-drag-compliance.test.ts` | **ALLOWED — NEW** | the unit's whole red/green/register home |
| 4 | `docs/specs/pane-drag-compliance.md` + `pane-drag-compliance-greens.md` + the record files under `archive/reviews/` | **ALLOWED — NEW** | this filing + the unit's records |
| 5 | `tests/store-core-graph-integration.test.ts` | **CITE-ONLY — never edited by this unit** | the module-external end point (`TENANT-1`); this unit's composition rows live in THIS unit's own new test file |
| — | **DENIED: `src/shared/zones.ts` · `gutter.ts` · `relocate.ts` · `gutter-affordance.ts` · `gesture-session.ts` · every other `src/shared/**` module** | at most one row per site | the named mechanism rows keep their bytes (`§3.4 R-1`) |
| — | **DENIED: `src/main/**` · the preload/MCP surface · the shell chrome · `scripts/**` · `package.json`/`package-lock.json`/`tsconfig*`/`vitest.config`** | one row | no store surface, no MCP surface, no config key (`§3.4 R-5`) |
| — | **DENIED: `src/renderer/store-core-graph.ts` · `store-graph-references.ts`** | one row | the landed/frozen store surfaces are untouched (`E-3`) |
| — | **DENIED: `<Astrographer>/**` and every tracker (`docs/next-steps.md` · `docs/pending.md` · `docs/decisions.md` · `docs/defects.md` · `docs/HANDOFF.md`)** | one row | `H-r6` + this pass edits no tracker (`E-4`) |

### 5.2 The legs this unit MUST run

| # | Leg | What it proves | This unit's relation |
| --- | --- | --- | --- |
| 1 | **`npm test` `[T]`** — the node suite | the unit's rows + the whole suite stay green | the unit's home: `tests/pane-drag-compliance.test.ts` — the store-backed seams, the constraint/repair, the listener and the wired-store composition all drivable on the NODE HOST (a recording source double in place of the DOM-backed source — the `gutter-ui.md` `M-5` precedent) |
| 2 | **`npm run typecheck` `[H]`** | `src/**` compiles | **`src/**` ONLY — it never reads a test file** (`tsconfig.json`'s include/exclude), so this leg does NOT cover `tests/pane-drag-compliance.test.ts` |
| 3 | **`npm run typecheck:tests` `[H]`** | the whole `tests/**` tree under the SAME strictness a unit's leg 4 uses | **THE leg that reads THIS unit's test file** (`AGENTS.md` item 4's additive fourth leg — a unit citing typecheck as evidence about its OWN test file MUST cite this leg) |
| 4 | **`npm run build` `[H]`** | the five bundles stay green | the wiring changes must not break the bundles; the four mechanism modules' bundle membership is unchanged |
| 5 | **THE WIRED-STORE INTEGRATION SEAM** — the module-external composition, per `TENANT-1`'s END (`tests/store-core-graph-integration.test.ts`, CITE-ONLY) | the boot wiring shape's settled end states | this unit's `M-12` composes the SAME boot wiring shape with a real `createGraphStore(...)`, this unit's constraint/repair at construction, and a recording source double — **gate-12 reading: ENVELOPE/INTEGRATION-GREEN**; the receiving of the store's settled receipts/events is asserted module-externally, never from the module's internals |

**`[U]` IS NOT OFFERED, and the three-part refusal form is stated:** **(1) the refusal** — no behaviour of this unit is
declared `[U]`; **(2) the structural reason** — the drag's full pane-layout flow is the FORK's UI (`sidebar-panes.ts`/
`pane-drag.ts`), which this repo neither ships nor re-drives; this repo's demo has no pane layout that hosts the drag, and the
two-rule rebuild's rendered consequence is consumed fork-side; **(3) the `S-6` sentence** — a later pass may not move a
`[T]` row of this unit to the `ui` leg silently. **`[D]` NOT CLAIMED.**

### 5.3 The DONE row's shape

The DONE row (written by the supervisor at gate 10) fills the twelve-item sibling shape, item by item: **(1)** the unit's
admission and queue flips (pending §Q's QUEUED→ADMITTED annotation and the new `docs/next-steps.md` open row, both the
supervisor's); **(2)** the surface this unit landed (the four families of §2.1–§2.3, the nine stored names of §2.4); **(3)** the
export/diff census — NO new shared module, NO new store surface, the wiring-delta files named (`§3.5`); **(4)** the red set,
RUN and REPORTED with its failing class (a TestWriter red: N failing against the absent implementations); **(5)** the green set
(the rows of `tests/pane-drag-compliance.test.ts`, all green, with the register's EXECUTED layer); **(6)** the adversarial
pass + PBT audit (`§3a`/`§3b`, gate 4) with each finding dispositioned; **(7)** the blind-greens record
(`docs/specs/pane-drag-compliance-greens.md`, authored by a blind-test writer from THIS spec + the greens artifact only);
**(8)** the per-unit documentation review (`archive/reviews/<date>-U-PANE-DRAG-COMPLIANCE-doc-review.md`, `AGENTS.md` item
10d); **(9)** the trio's green **plus `npm run typecheck:tests`** (leg 3 — the only typecheck leg that reads this unit's test
file) **plus the wired-store integration seam's reading (leg 5, ENVELOPE/INTEGRATION-GREEN)**; **(10)** the register's
per-row attempts/held/broken counts and ITS strategy ids (`§5.5.1`'s eight strategy ids, below); **(11)** the register
arithmetic in the `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` form — the total WITH its terms (`91 = 12 + 9 + 9 + 8 + 8 + 12 +
18 + 15`); **(12)** the layer honesty statement of `§6` — `[T]`+integration evidence ONLY, `[U]` NOT OFFERED with the
structural reason, the fork's UI battery never claimed.

### 5.4 Rollback

The unit's diff is bounded to the allow-list's rows 1–4; a rollback reverts `src/renderer/renderer.ts`'s wiring deltas +
`src/shared/demo-envelope.ts`'s seam delta + the new test file, leaving the four mechanism modules, the store surfaces, the
trackers and the fork's tree untouched. An independently revertible unit by construction.

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**GATE 11, FILED WITH THIS SPEC.** This unit is CODE-BEARING, so `§5.5.1` carries its typed register BEFORE any red set is
authored. **Typed rows only — `P-IM`/`P-SM`/`P-TP`; never an `F-` row, never a `§6`/`FS-n` citation as a register row.**
Deterministic: every row is a plain vitest table (exhaustive/finite enumeration — NO generator, NO pinned seed, NO new
devDependency; the `docs/specs/engine-pin.md` `§5.5` precedent). Caps: `≤100` attempts per row · `≤400` total ·
stop-after-5-consecutive-failures. Every row reports its **strategy id + held/broken**; an un-run register row is reported as a
**FAILURE**, never as a pass. **The register EXISTS to identify the testable elements of this unit's designed process — its
`8` rows are the component breakdown, and the `≤8` threshold is a SIGNAL, not a ceiling: every discernible property of the
four mandated areas (the store-backed reads · the temp-write turn · the two-arm repair · the right-click/reassert cycle) plus
the listener and the two totality families is enumerated, none dropped, none merged.** A read-only PBT audit by the adversarial
pass (gate 4) checks every row for over-strength, under-assertion and evasion, each dispositioned in `§3a`/`§3b`.

### 5.5.1 THE REGISTER — `8` typed rows, the family prefix declaring the row's own type: `2` `P-PD-IM` + `4` `P-PD-SM` + `2` `P-PD-TP`, ALL executed by design

| Row | Type | The property (EXACTLY as strong as its drive table — nothing more) | Pinned by | Strategy id | Term (drives) |
| --- | --- | --- | --- | --- | --- |
| **`P-PD-IM-1`** *(the store-backed size/bounds READS — hit / MISS / declared-fallback)* | `P-IM` invariant | For every drive in the row's fixed `12`-drive grid — the `2` read seams (`startSizeOf`-size read, `boundsOf`-pair read) × `3` store states (HIT at `mem`; MISS with a declared fallback in the closure; MISS with NO declared fallback) × `2` gesture turns (the `onStart`/establishment read; the evaluating terminal read) — the seam's ANSWER is exactly the declared one for that cell: the stored value BY VALUE on a HIT; the caller's DECLARED fallback on a MISS-with-fallback (never a store-invented default, never a mechanism literal); the declared E3 degradation on a MISS-without-fallback (an unusable value ⇒ the reset refuses `'unusable-default'` with ZERO sink writes; an unusable pair ⇒ `clampToBounds` answers `NaN` ⇒ the move is INVALID); the bounds pair is RECEIVED AS STORED — no member of the store, the seam, the wiring or a repair rewrote it; and NO throw escapes the read turn. | §2.1 A, §3.1 M-1/M-2/M-3, §3.2 F-5 | `S-PD-READS-1` | **`12`** = `2` seams × `3` store states × `2` turns, one read each |
| **`P-PD-IM-2`** *(the candidate/slot read reaches the pure comparator as scalars)* | `P-IM` invariant | For every drive in the row's fixed `9`-drive grid — `3` stored zone states (`slot`+`distance` both resident; `slot` resident/`distance` MISS; both MISS) × `3` comparator operand shapes (usable-within → `true`; usable-outside → `false`; the hostile/negative operand class → `false`, never a throw) — the candidates the closure builds carry the OPAQUE stored slot and the CALLER-MEASURED distance; the proximity DECISION is `withinProximity`'s answer (the pure two-scalar comparator — NO store read, NO geometry read, NO element read, NO magnitude computation); a MISS zone is admitted per the CALLER's declared rule, never a store decision. | §2.1 B, §3.1 M-11, §3.3 I-3 | `S-PD-ZONE-1` | **`9`** = `3` zone states × `3` operand shapes |
| **`P-PD-SM-1`** *(the temp-write turn — per-move writes and the ONE-write-per-gesture-end rule, with the subscriber delta)* | `P-SM` state-machine | For every drive in the row's fixed `9`-drive grid — the `3` gesture-end paths (valid release ⇒ ONE file commit holding the sink's argument; invalid release ⇒ ONE file commit holding the clamped pre-drag size; right-click ⇒ ONE temp remove, ZERO sink writes) × the `2` composition readings (the sink's own record and `E3`'s `stats().sinkCalls` — they AGREE at each terminal) — PLUS the `3` per-move-turn drives (the FIRST preview write is a `commit` at temp — the mint; a SUBSEQUENT move is a `set`; NO move ⇒ NO write) — the store receipt and the event surface are exactly the declared ones per cell (the terminal's `events` count equals its declared arms; the per-move `set`/`commit` fires the subscriber's render turn); and NO cell produces two writes for one gesture end. | §2.1 C, §2.5, §3.1 M-4/M-5, §3.2 F-6 | `S-PD-GESTURE-1` | **`9`** = `3` end paths × `2` readings + `3` move-turn drives |
| **`P-PD-SM-2`** *(the TWO-ARM REPAIR's end states, with the `min/2` band boundary as the pinned split)* | `P-SM` state-machine | For every drive in the row's fixed `8`-drive grid — the `3` bands (below `min/2` → arm (b); EXACTLY `min/2` → arm (a); in `[min/2, min)` → arm (a)) × `2` candidate sources (the violating zone-size write arrives at `set`; at `commit`) — the END STATE is exactly the declared one (arm (a): the stored size IS the minimum; arm (b): the size change is GONE and the zone reads MINIMIZED); the corrective action lands IN THE SAME COMMITTED WRITE; ONE `cause:'repair'` event with the repaired value AND the caller's own event both fire; `repaired[]` names the reference; the constraint holds on the repair's own post-state — PLUS the `2` refusal-via-feedback drives (the constraint WITHOUT a repair, violating at `set` and at `commit` ⇒ the receipt is `{status:'refused', …}`, the store byte-identical, `repaired: []`, NO throw). | §2.2 items 2/3/4, §3.1 M-7/M-8, §3.2 F-1/F-2/F-3, §3.3 I-1 | `S-PD-REPAIR-1` | **`8`** = `3` bands × `2` sources + `2` refusal drives |
| **`P-PD-SM-3`** *(the right-click / reassert cycle)* | `P-SM` state-machine | For every drive in the row's fixed `8`-drive grid — the `4` states × the `2` readings (the unqualified read after the turn; the receipt/event/register reading of the same turn): (a) right-click during an ACTIVE drag ⇒ ONE temp remove, ZERO sink writes, and the unqualified read afterwards answers the FILE original (the reassert — the temp→mem→file first-hit rule inverted by the removal); (b) right-click with NO ACTIVE drag ⇒ the MISS no-op (a declared `cleared: []` outcome — NEVER a refusal, NEVER a throw, NEVER a second write); (c) release with NO preview data ⇒ the commit is a NORMAL file write (`cleared: []` where no lower copy exists — never a refusal, never a removal); (d) a SECOND remove of the same temp path ⇒ the MISS no-op again. | §2.1 C, §2.5, §3.1 M-6/M-10, §3.2 F-4/F-5, §0 rulings 5/7 | `S-PD-REASSERT-1` | **`8`** = `4` states × `2` readings |
| **`P-PD-SM-4`** *(the zone-render listener — the subscriber delta, the fan-out, the stored-values read)* | `P-SM` state-machine | For every drive in the row's fixed `12`-drive grid — the `4` listener shapes (ONE subscriber gets exactly ONE event per write; THREE subscribers receive in REGISTRATION ORDER with `events: 1` and `3` deliveries; a THROWING listener — the fan-out continues and the mutator's receipt is UNCHANGED; an ABSENT/non-callable listener — refused `'malformed-name'`, nothing registered) × the `3` event arms on the preview reference (`cause:'set'`; `cause:'commit'` at the first mint; `cause:'repair'` on a repaired reference) — PLUS the render's STORE-read differential (the render's layout input is the STORED `mem.layout.zone.<id>.size`/`.display`: a changed store value with an un-mutated module variable CHANGES the render's answer, and a render that consults host geometry, a module-held variable or a controller callback FAILS the drive). | §2.3, §3.1 M-4/M-9, §3.2 F-10, §3.3 I-4 | `S-PD-LISTENER-1` | **`12`** = `4` listener shapes × `3` arms |
| **`P-PD-TP-1`** *(the passed-function surface — the constraint and the repair, TOTAL)* | `P-TP` totality | For EVERY argument shape in the row's fixed `6`-shape domain — absent/`undefined` · `null` · a non-function · a hostile record (a throwing accessor) · a function returning a non-boolean · a function THROWING — and for EVERY evaluation point in the row's `3`-point domain (`set` · `commit` · `remove`): the store's calls of the CALLER-SUPPLIED constraint and repair functions land in the declared posture — a returned boolean + the feedback record, NEVER a throw out of the write turn; a violation WITHOUT a repair answers refusal-via-feedback (the store byte-identical, `repaired: []`); a throwing function is absorbed per §7a.1 item 3's working default (the write refused with the violation's posture, NOTHING stored, and the gesture turn NEVER observes the throw); and the store is byte-identical to its pre-call state on every refusal cell. | §2.2, §3.2 F-2/F-7, §7a.1 item 3 | `S-PD-FUNCTIONS-1` | **`18`** = `6` shapes × `3` evaluation points |
| **`P-PD-TP-2`** *(the store-backed SEAM IMPLEMENTATIONS' degradation — TOTAL over their hostile inputs)* | `P-TP` totality | For EVERY drive in the row's fixed `15`-drive grid — the `3` store-backed implementations (`startSizeOf`-read · `boundsOf`-read · the candidate/slot reads) × the `5` degradation shapes (the store ABSENT from the closure; the tier handle ABSENT; the tier-handle `get` THROWING; a HOSTILE stored value (`42`, `'x'`, a `Proxy`, a throwing accessor); a MISS with no declared fallback) — the implementation lands its DECLARED degradation (the reset arm, the refusal, `NaN`-via-clamp ⇒ the invalid arm, or the caller's declared fallback), NO throw escapes a wiring turn, and the two TOTALITY concessions of the family are UNMOVED (the three `void` presentation seams' throws propagate from THEIR turns; the value-reading seams are absorbed). | §2.1 A/B, §3.2 F-8, `gutter-ui.md` `§R.3` | `S-PD-DEGRADE-1` | **`15`** = `3` implementations × `5` degradation shapes |

**THE TOTALS BLOCK. `91` DECLARED ATTEMPTS, printed with their terms: `12 (P-PD-IM-1) + 9 (P-PD-IM-2) + 9 (P-PD-SM-1) + 8
(P-PD-SM-2) + 8 (P-PD-SM-3) + 12 (P-PD-SM-4) + 18 (P-PD-TP-1) + 15 (P-PD-TP-2) = 91` — and the total IS the sum of its own
terms (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).** The `(bounded)` set is **EMPTY**: each property text quantifies
EXACTLY over its own drive table and no row's text exceeds its drives. Caps: largest row `18 ≤ 100` · total `91 ≤ 400` ·
stop-after-5 (designed; untriggered by design at the count level). **No generator is used, so NO pinned seed is claimed and
none is needed.**

### 5.5.2 The register's honesty block — what is NOT proven

1. **Nothing here is live/UI evidence.** `[T]`+integration evidence proves the contract against the node host and the real
   store; **no row of `§5.5.1` is `[U]` or assembled-app evidence**, and the fork's drag UI is not exercised by any row
   (`§6`).
2. **Every row is a fixed table, and each row's text is exactly as strong as its table** — the `(bounded)` set is EMPTY by
   design, and a later pass that widens a property text without widening its drives must mark the row `(bounded)` (the
   sibling convention), never silently widen.
3. **The execution is the TestWriter's + the Implementer's** — this filing states the DESIGN accounting (`91` declared with
   its eight terms); the executed layer's held/broken readings are owed by the unit's red→green cycle, and the DONE row must
   report the per-row attempts/held/broken and the eight strategy ids.
4. **The store's own machinery is not re-proven here** — the evaluation points, the repair-landing, the event envelope, the
   remove semantics and the file-commit transaction are the LANDED store's contract (`store-core-graph.md` §2.7/§2.8/§2.10,
   green in its own suite); this unit asserts the CALLER-side supply over that landed machinery, never the machinery itself.

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

Per-row term derivations, each from its own cell's drive grid: `P-PD-IM-1` `12` = `2 × 3 × 2` · `P-PD-IM-2` `9` = `3 × 3` ·
`P-PD-SM-1` `9` = `3 × 2 + 3` · `P-PD-SM-2` `8` = `3 × 2 + 2` · `P-PD-SM-3` `8` = `4 × 2` · `P-PD-SM-4` `12` = `4 × 3` ·
`P-PD-TP-1` `18` = `6 × 3` · `P-PD-TP-2` `15` = `3 × 5`. **The chain: `12 → 21 → 30 → 38 → 46 → 58 → 76 → 91`**, family
subtotals **`IM 21` (`12 + 9`) · `SM 37` (`9 + 8 + 8 + 12`) · `TP 33` (`18 + 15`)**, and **`21 + 37 + 33 = 91`** ✓ — every
slot printed with its term, and the total is the sum of its own terms.

---

## 6. Honest statements (recorded so no later pass over-reads this unit)

1. **THE LAYER, STATED HONESTLY.** This unit's evidence is **`[T]` (the node suite — the seams, the supplied functions and
   the wired-store composition against a recording source double) PLUS the wired-store integration seam (gate 12:
   ENVELOPE/INTEGRATION-GREEN — the boot wiring shape exercised module-externally per `TENANT-1`)**. **NOTHING here is
   assembled-app, real-pointer, rendered-geometry, attribute-level or fork-UI evidence.** The fork's live UI battery
   (`sidebar-panes.ts`/`pane-drag.ts`'s rendered drag) is **the fork's own pass** (`H-r6`) and is never claimed by this unit.
2. **`[U]` NOT OFFERED — the three-part refusal form (`§5.2` leg 6).** A later pass that moves a row to the `ui` leg silently
   FAILS the family's `S-6` rule.
3. **THE FOUR NAMED MECHANISMS ARE UNCHANGED, AND THIS UNIT PROVES NOTHING ABOUT THEM.** `zones.ts`/`gutter.ts`/
   `relocate.ts`/`gutter-affordance.ts` keep their bytes and their landed green; this unit's rows cite their seams and never
   re-test them.
4. **THE FOUNDATION DEMO IS NOT THE PANE UI.** This repo's demo carries the gutter card (the affordance's example
   implementation site); it does NOT carry the fork's pane layout, so the two-rule rebuild's rendered half is observably
   fork-side. **No rendered-geometry claim of the drag flow is made by any cell of this file.**
5. **THE QUEUE FLIP IS NOT THIS FILE'S.** The admission is recorded here as the supervisor reports the architect's directive;
   the tracker annotations (pending §Q's queue state, a `docs/next-steps.md` open row) are the supervisor's to write, and the
   ledger counts are unchanged by this filing.

---

## 7. Falsification / stop conditions

1. **THE UNIT IS FALSIFIED IF** any documented fail-state of `§3.2` cannot be driven, or any row of `§5.5.1` cannot reach
   its declared term; a register total that is not the sum of its own terms is a finding before it is a fix.
2. **THE UNIT IS FALSIFIED IF** any cell claims a layer this unit does not own: `[U]`/live-UI evidence, an assembled-app
   reading, a fork-UI battery, a store-surface change, a mechanism byte change, or a rendered-geometry fact about the drag.
3. **THE UNIT IS FALSIFIED IF** a resumed write-through (host-state pane/zone layout writes) or a second sink route passes
   the static rows (`§3.4 R-2`/`R-4`).
4. **A SUB-MINIMUM STORED ZONE SIZE IS AN ABSOLUTE FAILURE** at any gate, whatever the explanation — the constrained-store
   invariant (`§3.3 I-1`) is the unit's central falsifier (`F-1`/`F-9` are its rows).
5. **THE FORK BOUNDARY IS ABSOLUTE** — writing a file under `<Astrographer>/`, invoking the fork's bytes, or asserting a
   dependency on the fork's UI in this unit's evidence FAILS at every gate.
6. **A constraint row that resurrects the data-table model** (a `kind`/`repair` token row, a runtime-mutated constraint set,
   `unique-path/tier` as a constraint) FAILS — the passed-function model is the architecture (`§0` ruling 3).
7. **THE ARCHITECT'S RULINGS ARE THE CEILING.** This unit derives from the rulings table of `§0`; a pass that supersedes a
   cited ruling, or that resolves a `§7a.1` item against its recommendation, routes to the architect — never a silent choice.

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from as written

*(None remain underivable: the four `§7a.1` items below each carry a working default and a recommendation, so a TestWriter can
derive a falsifiable row for every one of them — the sibling's `§7a.1` ruling-table shape.)*

### 7a.1 THE DECISION REQUESTS — FOUR ITEMS, EACH WITH A WORKING DEFAULT, A RECOMMENDATION, AND WHAT IT AFFECTS

| # | The clause that needs a reading | The two readings (both kept visible if ruled against) | The working default | The recommendation / effect |
| --- | --- | --- | --- | --- |
| **1** | **THE `layout`-versus-`settings` CROSS-PATH RECONCILIATION.** The drag chain READS `mem.layout.pane.<id>.size` (§2.1 A) while the release COMMITS `file.settings.pane.<id>.size` (§2.4 name 9). The two are DIFFERENT logical paths: the mem layout read does not fall through to the file settings path by path-identity alone. **How is the mem layout copy seeded and refreshed?** | (i) the WIRING's reconcile turns — the boot seeds `mem.layout.pane.<id>.size` from the `file.settings` value (or the declared fallback), and the file commit's event (the wiring's OWN subscriber) refreshes the mem layout copy AFTER the commit — both turns OUTSIDE the gesture's write count (the single-writer rule counts the GESTURE's sink/commit agreement, not the wiring's post-commit reconcile); (ii) the mem read falls through to the file value on a MISS (the ascending-durability read against the settings path, read from the CALLER's closure). | **reading (i)** — the mem layout tier is the runtime layout cache, wired-maintained, with its reconcile turns OUTSIDE the gesture write count | **recommended: (i)**, because the two namespaces have different jobs (runtime layout vs durable settings) and the plan's row 3/row 15 verdicts name the read-side values as `layout.*`; a pass that chooses (ii) must state the fall-through in the `startSizeOf` seam's fallback clause and re-pin `§2.4` name 1. NOT silently decided |
| **2** | **DOES THE SESSION'S OWN `cancel`/`pointercancel` TERMINAL ALSO ERASE THE TEMP PREVIEW?** The queued contract clause 5 pins RIGHT-CLICK as the erase; the four-tier abandon path ("a temp-only removal leaves the file value answering") reads naturally over ANY cancel that ends a drag without a commit. | (i) YES — every abandon terminal (right-click, `pointercancel`, `cancel`) performs AT MOST ONE `remove('temp.drag.<gestureId>.placement')` (a second remove is the MISS no-op, `F-4`); the sink stays at ZERO writes per `E10`; (ii) NO — only right-click erases; a `pointercancel` leaves the temp preview resident until the next turn. | **reading (i) — YES, at most one remove per gesture** | **recommended: (i)** — a gesture that never commits MUST NOT leave a stale temp preview reasserting over the file original (that would violate the abandon path's entire purpose); the single-remove rule keeps `§2.5`'s one-write discipline. NOT silently decided |
| **3** | **THE THROW-DISPOSITION OF A HOSTILE CALLER-SUPPLIED CONSTRAINT/REPAIR FUNCTION inside the store's evaluation.** The store contract's re-derived §2.7 items 1/3 pin the returned-record discipline ("a returned record, never a throw") but do not spell out a THROWING caller function's absorption. | (i) the store ABSORBS it — the write is refused with the violation's posture (nothing stored, `repaired: []`, byte-identical), the throw never reaches the mutator's caller; (ii) the throw PROPAGATES to the wiring turn (which absorbs it there). | **reading (i) — absorbed at the evaluation, refused-with-posture** | **recommended: (i)** — it matches the store's totality discipline (no member throws; `§2.2` P-5) and keeps the gesture turn total; the row that executes it is `P-PD-TP-1`. If ruled (ii), the wiring's turn absorbs it and `P-PD-TP-1`'s throw-shape cells stay, re-pinned to the wiring turn. NOT silently decided |
| **4** | **ARE THE THREE TOP-LEVEL ROOTS DECLARED OR MINTED?** The wiring owns the top-level roots `layout` (mem), `drag` (temp) and `settings` (file) behind §2.4's names. `createGraphStore` accepts `declarations?` (`storeGraphReferences(rows)`); a first `commit` at each root also mints the node and registers the row (`§2.8` item 3). | (i) DECLARED — the wiring's construction passes `storeGraphReferences([…])` naming the three roots (the register's rows pre-exist the first write); (ii) MINTED — the first commit at each root registers it (no declaration input). | **reading (i) — declared** | **recommended: (i)** — the declared-name registry is the store's second contract surface and the roots are this wiring's own spellings; a declaration makes the register deterministic for the integration rows. Either reading is legal — the spec pins the ADMISSIBLE SET (`§3.4 R-5` bounds the OPTIONS, never the roots' count) and the rows assert the writes work. NOT silently decided |

---

## 8. Falsification, cross-references and the citation index

**THE UNIT'S OWN FALSIFIERS (each with its row):** the constrained-store invariant (I-1/F-1/F-9) · the one-write rule
(I-2/F-6/M-5) · the pure comparator (I-3/M-11) · the listener's store-read (I-4/M-9/F-10) · the no-bytes-move row
(I-5/R-1) · the one-clamp/one-sink rows (I-6/R-4) · the no-write-through row (I-7/R-2) · the no-new-store-surface row (R-5) ·
the frozen-session row (R-3) · the fork boundary (E-4/R-2/§7 item 5) · the abort of a constraint-data-table resurrection
(§7 item 6).

**CROSS-REFERENCES (cited by §/row id, ROW NAME, or ROW ID — never by line count):**

| The authority | The site(s) in this file | What it supplies |
| --- | --- | --- |
| `docs/pending.md` §Q (the two-rule criterion + the six-clause queued contract + the two open points + the answering blocks) | §0 rulings 1/2, §0A items 1/2, §2.1–§2.5 | the queued contract, the `min/2` split, the temp→file lifecycle, the RIGHT-CLICK erase, the RELEASE commit, the open points' dispositions |
| `docs/decisions.md` **`CONSTRAINTS-ARE-PASSED-FUNCTIONS`** (ACTIVE, by NAME) | §0 ruling 3, §0A item 1, §2.2, §3.2 F-2, §7 item 6 | the passed-function machinery as the architecture; the data-table model SUPERSEDED |
| `docs/decisions.md` **`E10-SINGLE-SINK-CHANNEL`** + `data-ownership-model-plan.md` §5.3 SINK-1..5 | §0 ruling 5, §2.1 C, §2.5, §3.1 M-5, §3.2 F-6, §3.3 I-2, §3.4 R-4 | the single sink, the tier-1 commit inside the single invocation, the one-write rule |
| `data-ownership-model-plan.md` §5.2.7 (round-3 table, rows 1/3/4/15 + item (4)) | §0 ruling 4, §1 boundaries 2/3, §2.1, §2.4, §3.4 R-1 | the NAMED PER-MODULE OBLIGATIONS (EDGE-READ for rows 3/4; the wiring's tier-3 write for row 15; the caller's closure for row 1); NO BYTE CHANGE |
| `docs/decisions.md` **`FOUR-TIER-DATA-OWNERSHIP-MODEL`** · **`QUALIFIED-READ-…`** · **`NEXT-SURVIVING-REPAIR-…`** | §0 ruling 7, §2.4, §3.1 M-6/M-10, §3.2 F-4, §5.5.1 P-PD-SM-3 | the four tiers, the unqualified read's first hit, the temp-only removal, the file reassert |
| `docs/specs/store-core-graph.md` §2.7 (re-derived items 1–7) · §2.8 (items 1–8) · §2.10 (items 1–6) · §2.1's `GraphConstraint`/`GraphStore` blocks · §2.6 items 1/2 | §0 ruling 3, §2.2, §2.3, §2.4, §3.1, §3.2, §5.5.1 | THE constraint/repair machinery (the authority), the write surface, the event envelope, the read/shadowing rules |
| `docs/decisions.md` **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** + `docs/FORKER.md` §4 `(iv)` | §0 ruling 6, §2.2, §3.1 M-7/M-8 | the size domain `{min … max} ∪ {minimized}`, the round-or-zero ruling the `min/2` split refines |
| `docs/decisions.md` **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** + `gutter-ui.md` §R.3's seam table | §0 ruling 8, §2.1 A/B, §3.2 F-8, §5.5.1 P-PD-TP-2 | the seam implementations' contract and degradations |
| `docs/specs/gutter.md` (§2.5 item 5, §4.4 S-PURE-4, the seam rows) · `docs/specs/gutter-ui.md` (§2.1's options block, §R.1) · `docs/specs/relocate.md` (§2.1 items 1/2, `§3d`) | §0 ruling 9, §2.1, §3.1 M-1/M-3, §3.2 F-8 | `clampToBounds` as the ONE clamp site, the reset's `'unusable-default'`, `withinProximity` as the pure comparator, the seams' types |
| `docs/specs/gsession.md` §2.5 (the frozen eleven items) + `data-ownership-model-plan.md` §5.4 | §0 ruling 10's neighbour, §2.6 prohibition 4, §3.4 R-3 | no session-level channel; the listener is the wiring's |
| `docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r6`) | §0 ruling 10, §1 boundary 4, §3.4 R-2, §5.1, §6 | fork-side-return; the fork's UI battery is the fork's |
| `docs/decisions.md` **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** · **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** · **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** · **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-…`** | §0 ruling 11, §4.1, §5.5, §5.5.1, §5.5.2, §5.5.3, §5.3 items 10/11 | the typed register, the caps, the terms-with-total rule, the row count as outcome |
| `docs/decisions.md` **`TENANT-1`** + `docs/specs/store-core-graph-compliance-review.md` §9 (`W7`'s answering block) | §0 ruling 12, §5.2 leg 5, §6 | the integration seam (START = boot path, END = the integration test), ENVELOPE/INTEGRATION-GREEN |
| `docs/next-steps.md` **`G1`** (ROW ID) + the `CONSTRAINTS-ARE-PASSED-FUNCTIONS` landing block | §0 ruling 3, §6 item 5 | the rule-change's landing and the unblocked pipeline; the queue state flip is the supervisor's |
| `AGENTS.md` items 4/9/10a/11 + the RCA-1..8 lessons | §4, §5.2, §5.3, §5.5 | the red-first order, the delegation gate, the register, the per-gate commits, the trio + fourth leg |

**FILE-END NOTES (the sibling convention):** cite sections and row ids, never line counts; cite `docs/decisions.md` rows by
NAME, `docs/next-steps.md` by ROW ID, `docs/pending.md` by §/clause. The `§5.3 → §5.5` gap (no `§5.4` as a section) mirrors the
deliberate non-renumbered sibling convention: `§5.5.1`–`§5.5.3` are sub-headings of `§5.5`. Nothing follows this note except the
`§3a`/`§3b` file-end attachment, which sits at the end so that nothing follows the adversarial disposition table.

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run (the file-end attachment, per the sibling convention)**

| id | The seed (what to hunt) |
| --- | --- |
| **ADV-PD-1** | **The two-writer revival under the store — seed for the adversarial pass.** Does ANY path of the wired composition produce TWO store writes for one gesture end (a harness-registered forwarding channel, a second sink route, a per-move commit, a commit PLUS a remove at the same terminal)? Assert the sink-record/stats agreement AND the store-receipt count per terminal. |
| **ADV-PD-2** | **The wrong-write at a turn — does the wiring write the STORE when it only wanted the preview?** Does any move turn reach `commit` (file) or a remove instead of the declared `set` — including a move that observes an already-erased temp path? |
| **ADV-PD-3** | **The `min/2` boundary shredding.** Does ANY code path treat `size === min/2` as arm (b), or a size just below `min/2` as arm (a), or a size in `(min/2, min)` as anything but arm (a)'s round-up? Does the repair ever leave a stored value in `[0, min)`? |
| **ADV-PD-4** | **The listener-vs-host confusion.** Does the zone render read ANY module-held variable, host geometry, or a controller callback — while the store holds a different value? Does the listener fire on a `clear`/`sweep` (the store never evaluates those)? |
| **ADV-PD-5** | **The reassert forgery.** After a right-click erase, does the read answer anything other than the FILE original (a stale temp value, a mem copy the wiring forgot, a fabricated value)? Does a second remove REFUSE instead of answering the MISS no-op? |
| **ADV-PD-6** | **The hostile supply.** Non-callable/throwing constraint or repair functions, a hostile `matchedSet` name, a throwing tier-handle read, a store whose tiers are absent — every one must reach its DECLARED degradation (never a throw out of a wiring turn, never a silent store mutation). |
| **ADV-PD-7** | **The bootstrap hole.** Is the store constructed ONCE per realm at the boot site (never twice, never in a module-level binding), with the constraint/repair supplied AT CONSTRUCTION (never installed later, never mutated at runtime)? |
| **ADV-PD-8** | **The census honesty.** Does any cell claim a `[U]`/rendered/fork-UI reading, a store-surface change, a mechanism byte change, or a test-count that this unit's documents cannot carry? |

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

*(Empty as filed: the pass is OWED. Each landed finding is dispositioned in `§3a`'s table WITH one of the family's recorded
disposition tokens (the `OWED`/`CONFIRMED-RULED`/`CLOSED-IN-PLACE`/`PARKED`/`REVERSED`/`NOT-A-FINDING`/package-defect classes of
the sibling records, dispositioned per the specific finding — never a bare `OWED` and never a silent closure; `AGENTS.md` item
11(e)'s audit rule), and a PACKAGE-DEFECT finding is recorded in `docs/defects.md`/`docs/HANDOFF.md`, never patched here.)*