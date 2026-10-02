# Spec — `U-STORE-CORE`: the four-tier data-ownership store (the read, the registry, the trie, the constraints, the event surface)

**Unit `U-STORE-CORE` · wave `G` · ledger row `G1` · ADMITTED 2026-10-01 by the architect's third-round ruling `R3-7` ·
derives `docs/specs/data-ownership-model-review.md` (the gate-1 record) and `docs/specs/data-ownership-model-plan.md`
(the plan) · STEP-0 dossier `docs/specs/store-core-adoption-dossier.md` · filed 2026-10-01.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/data-ownership-model-review.md` is the CLOSED gate-1 record**
(step 1 `BLOCKED-ON-SEMANTICS`, its remand, step 2 `BLOCKED-ON-SEMANTICS`, its remand **LIFTED**, step 3
`APPROVE-WITH-CONDITIONS`, step 4 `APPROVE-WITH-CONDITIONS` printed beside this repo's in-force
**`DELEGABLE-WITH-CONDITIONS`** for the three admitted units). **This spec DERIVES the plan's rulings and the record's
conditions `C-1`…`C-8`; it does NOT re-litigate, weaken or re-open any of them**, and **a clause of this file that
contradicts a ruling is a finding against this file, not a re-opening of the ruling.**

**⟶ EVERY LANDED ROW THIS SPEC DERIVES FROM IS CITED BY ROW NAME, NEVER RESTATED**: the ledger is appended-to and its
line anchors drift. **The set, named once so a reader can complete it: `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-
SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY` · `NO-FOUNDATION-CONFIG-FILE-FACILITY` · `FOUR-TIER-DATA-OWNERSHIP-MODEL`
· `QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION` · `NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-
INSTANCE-PER-REFERENCE-CLEAR-EVENTS-DOWNWARD-REMOVAL-THE-REFERENCE-SET-CROSSING-AND-THE-CRITERION-AS-A-PLACEMENT-RULE`
· `E10-SINGLE-SINK-CHANNEL` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` · `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-
UNDER-THE-NO-REACH-CLAUSE` · `SHELL-CHROME-PANES-ZONES-IN-SCOPE` · `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-
MINIMUM-CLAMP-IS-FAMILY-SIDE` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-
ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` ·
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `AUTONOMY AFTER SPEC APPROVAL`.** **No clause of any of them is restated
here; where one is needed it is cited by name and the clause is read at its own row.**

**Cite SECTIONS and ROW IDS, never line numbers, of any file; bytes by `file:symbol`.** **This spec carries no length
census of any file.**

---

## CURRENT STATE (2026-10-01) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note —
the placement the sibling specs use.)** **This block is the FILING-TIME state, and it is the whole of it:**

1. **THE FILING STATE, HONESTLY. NOTHING IS IMPLEMENTED, NO TEST IS AUTHORED, NOTHING IS GREEN.** This pass wrote
   **exactly two NEW files** — `docs/specs/store-core.md` (this contract) and
   `docs/specs/store-core-adoption-dossier.md` (the STEP-0 dossier the record's `§5`(c) owes, condition `C-2`) — and
   **edited NO existing file**: not the plan, not the record, not `docs/next-steps.md`, not any tracker, not any
   sibling spec, not `AGENTS.md`, not `package.json`, not a script and not a config. **The module
   (`src/renderer/store-core.ts`), `src/renderer/store-references.ts`, the test file
   (`tests/store-core.test.ts`), the red set, the legs, the register's EXECUTED layer, the greens set, the gate
   records and the DONE row ALL DO NOT EXIST YET.** The unit is **`OWED` at every gate after this one**, and **it is
   NOT delegable until a TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).
2. **THE SURFACE THIS FILING PINS (nothing of it exists yet):** a **NEW `src/renderer/store-core.ts`** exporting
   **`TWO` runtime value exports and `EIGHTEEN` type declarations = `TWENTY` exported names** (`§2.1`), plus a **NEW
   `src/renderer/store-references.ts`** holding the declaration table (`§2.6` item 1), whose own export census is
   **an explicit decision request** (`§7a.1` item 6). **No other file moves** (`§5.1`).
3. **THE REGISTER (`§5.5.1`): `20` typed rows, and the FAMILY PREFIX DECLARES THE ROW'S OWN TYPE** — `P-SC-IM-*`
   (invariant, `11` rows) · `P-SC-SM-*` (state-machine, `1` row, `P-SC-SM-1`) · `P-SC-TP-*` (totality, `8` rows) —
   **`400` declared attempts, printed with their twenty terms
   and a term-by-term addition at `§5.5.3`**, **`20` strategy ids (`S-SC-*`), one pinned-seed generator
   (`S-SC-TOTAL-1`, seed `20261001`, one LCG step per draw, `pool.length = 20`)**, and **`2` rows carrying a
   `(bounded)` marking**. **The caps are compared against `400` (`400 ≤ 400`; per-row maximum `40 ≤ 100`).** **The
   row count is an OUTCOME, not a budget** (`§5.5`'s ruling paragraph).
4. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the whole of this unit's green — plus
   `npm run typecheck` `[H]` (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]` (**five bundles**,
   byte-identical except for the renderer bundle this unit adds a module to), **`npm run typecheck:tests`** (the
   ADDITIVE fourth leg that is the only leg compiling `tests/**`), plus a **standalone strict `tsc --noEmit` over
   this unit's own test file** (`§5.2`). **NO `[U]` ROW IS OFFERED and `[D]` IS NOT CLAIMED** — both refusals are
   three-part (`§5.2`).
5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT
   audit, no blind-greens record (`docs/specs/store-core-greens.md` is owed and does not exist), no per-unit
   documentation review and no DONE row (`§5.3` fixes its twelve-item shape). **GATE 6 IS `STRUCTURAL`, NOT WAIVED
   — the word `waived` may not be substituted for it** (`§5.2` item 3).
6. **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED, AND NO REPORT IS DUE.**
   **The determination, in the predicate's own terms: no admitted unit authors a rendered surface.** `U-STORE-CORE`
   authors **no UI content at all** — it ships no element, no envelope node, no handler body, no component binding
   and no control — so **limb A is absent**; and its flows are store-only, with no assembled visible behaviour, so
   **limb B is absent**. **The admissible form is NO report: a zero-row report is INVALID** (the record's `§7`; the
   plan's `§8.1`). **A pass that files a zero-row `§5.U` report for this unit has failed this item.**
7. **THE OPEN DECISION REQUESTS THIS FILING RAISES, AND NOTHING ELSE BLOCKS** (`§7a.1`, `§7a`): **six** items, each
   with a working default implemented in `§2` and a recommendation so the red set is authorable today. **A later
   pass that changes one MUST open a gate.** **None of them is `undefined-until-answered`, and none blocks the spec
   gate** — the record's `C-2`…`C-8` are contract-content conditions owned by THIS file, and this file discharges
   all seven.
8. **THE TRACKER RESIDUES THIS FILING LEAVES** (the supervisor's to flip, because this pass edits NO existing file):
   `docs/next-steps.md`'s row **`G1`** still reads its spec cell as **`OWED — not filed`**; the ledger stays
   `21 DONE / 3 open` UNITS = `24` **unmoved**; **`RCA-8(f)` is satisfied and not breached — the architect admits
   ROWS, not a pass, and this pass writes no row.** **No count moved anywhere.**
9. **`docs/skills/designing-pages.md` DOES NOT EXIST** (`docs/skills/*` holds `process-guardrails.md` alone,
   globbed this pass), so **there is no test-use-case coverage matrix and no demo-page index to update** — and
   **this unit renders no page** (`§3.5 R-9` is the probe that keeps that claim falsifiable; `§5.2` item 3).
10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **Two files written, zero files edited, no test run,
    no leg run, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command, no
    commit.** The two new files are **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate
    commit rule; `RCA-8(c)` — both are NEW files).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) — the four tiers and their scope**: `file` (file-stored persistent cache: config, settings, file tracking) · `mem` (in-memory persistent) · `temp` (in-memory temp) · `secure` (access-controlled, file-persisted); **each tier has its OWN get/set surface**. | `§1` item 1, `§2.1` (the four tier tokens), `§2.4` (the tier-local surface), `§3.4 R-1`/`R-2` |
| **2** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2) — the one-read rule**: `read(name)` searches `temp` → `mem` → `file`, stops at the first hit, never invents a default and **refuses every `secure.*` reference**. | `§1` item 2, `§2.5`, `§3.1 M-1`..`M-5`, `§3.2 F-1`..`F-6`, `§3.4 R-3`/`R-4` |
| **3** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) — commit-clears-lower (`C-1`..`C-5`)**: the clear happens **AFTER** the higher tier durably accepted, and **a refused/throwable commit clears NOTHING**. | `§1` item 3, `§2.10` item 1, `§3.2 F-3`, `§5.5.1 P-SC-IM-2` |
| **4** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (4) / `QUALIFIED-READ-…` clause (3) — the event surface**: one envelope per affected reference, `{name, tier, value, cleared[], cause}`, seven `cause` tokens, the required member set stated **PER ARM**, `origin` required on the `descendant` arm alone, an N-sweep is N events, a refused commit fires NOTHING, each cleared lower reference fires its own `cause:'clear'`. | `§1` item 6, `§2.11` (the envelope), `§2.12` (the seven-row arm table), `§3.1`/`§3.2`, `§5.5.1 P-SC-IM-6`/`P-SPC-IM-7` |
| **5** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (3) — the declared name registry as the store's SECOND CONTRACT SURFACE**: undeclared / double-declared / wrong-tier / malformed / reserved names REFUSED AT WRITE TIME. | `§1` item 4, `§2.6`, `§3.2 F-7`..`F-18`, `§5.5.1 P-SC-IM-4`/`P-SC-IM-5` |
| **6** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (3) — constraints as a first-class element**: declared per reference, evaluated on EVERY WRITE, a stated outcome, the first is `exactly-one-active` with outcome `REPAIR`. | `§1` item 5, `§2.10`, `§3.2 F-19`..`F-22`, `§5.5.1 P-SC-IM-8` |
| **7** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` — `remove(name)` is a FIRST-CLASS PERSISTED OPERATION; `set(name, undefined)` is NOT a deletion and NOT a third state.** | `§1` item 7, `§2.10` item 3, `§3.2 F-23`/`F-24`, `§5.5.1 P-SC-IM-2` |
| **8** | **`QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION` clause (1) — the read's resolution**: a tier segment is an EXPLICIT QUALIFIER only; **there are NO per-tier alias declarations**; the two-name reference problem is DISSOLVED, not patched. | `§1` item 2, `§2.3` item 3, `§2.5` items 3/4, `§3.4 R-4` |
| **9** | **`QUALIFIED-READ-…` clause (2) — subtree semantics**: the merged read with `parts`, the residency trie, and the `{subtree:true}` opt-in whose event carries `cause:'descendant'`, `origin:<written path>` and NO value. | `§1` items 6/8, `§2.5` item 5, `§2.7`, `§2.11`, `§2.12`, `§5.5.1 P-SC-TP-5`/`P-SC-IM-6` |
| **10** | **`QUALIFIED-READ-…` — the store-side constraint TABLE** (kind · repair action · refusal reason) evaluated on every write **AND ON `remove`**, a violation REPAIRED in the same committed write, a repair emitting its own event, and ZERO-ACTIVE a REPAIR and never a refusal. | `§1` item 5, `§2.10` items 2/5/6/7, `§3.2 F-19`..`F-22` |
| **11** | **`QUALIFIED-READ-…` — the read side's own rule**: an UNDECLARED name is a TYPED REFUSAL, a declared-but-never-written name is a MISS, a declared `secure.*` name is REFUSED, and **the `secure` check PRECEDES the registry check**. | `§1` item 2, `§2.5` item 6, `§2.6` item 4, `§3.2 F-1`/`F-2`/`F-7`, `§5.5.1 P-SC-TP-2` |
| **12** | **`NEXT-SURVIVING-REPAIR-…` clause (1) — the zero-active selection rule**: activate the **NEXT surviving entry by `file.tabs.order`**, **WRAPPING to the first** when the closed entry was last; on a `remove`-triggered evaluation **the removed entry's own index is the referent**; the repair consults no insertion time, no tie-break and no store-side preference. | `§2.10` items 4/5, `§3.2 F-19`/`F-21`, `§5.5.1 P-SC-IM-8` |
| **13** | **`NEXT-SURVIVING-REPAIR-…` — the landing reference is a NORMAL `<tabId>` INSTANCE**, inside the matched set **and** a member of the caller's order; its reservation is **ONE `concrete` declaration that OUTRANKS the pattern**, so only the ENTRY's own removal is refused. | `§2.6` items 5/6 (the precedent, not this unit's tenant), `§3.1 M-20`, `§3.2 F-14` |
| **14** | **`NEXT-SURVIVING-REPAIR-…` — ONE COMMIT = AN ORDERED REFERENCE SET; a multi-reference operation is not a second sink writer**, and `E10-SINGLE-SINK-CHANNEL`'s two-readings-agree clause is re-derived for a count ≥1 per **operator action**. | `§2.10` item 8, `§3.4 R-8`, `§6` item 6, `§8` |
| **15** | **`NEXT-SURVIVING-REPAIR-…` — `remove` CLEARS DOWNWARD**: `remove('file.x')` clears `file`, then `mem`, then `temp`; `remove('mem.x')` clears `mem` and `temp`; `remove('temp.x')` clears `temp` only. **A removal NEVER clears a higher tier.** | `§1` item 7, `§2.10` item 3, `§3.2 F-23`, `§5.5.1 P-SC-IM-2` |
| **16** | **`NEXT-SURVIVING-REPAIR-…` clause (7) — the admission**: `U-STORE-CORE` + `U-STORE-PERSIST` + `U-STORE-SECURITY` ADMITTED and **no others**; `FOCUS`/`LAYOUT`/`DRAG`/`MODULES`/`TABS-STRIP` stay PROPOSALS. | `§1` item 1 (scope), `§5.1` (the denied set), `§7` item 11 |
| **17** | **`FOUNDATION-STORE-FACILITY-IS-OPENED-…` clause (1)/(2)** — the store facility is real and declared, `NO-FOUNDATION-CONFIG-FILE-FACILITY`'s **clause 1 alone** is superseded, **its clauses 2/3 survive** (a later store still owes clause 3 and a mechanism's own unit may not smuggle one). | `§1` items 1/9, `§5.1`, `§8` (the `S-d8` `(C)#4` row) |
| **18** | **`SHELL-CHROME-PANES-ZONES-IN-SCOPE` — the family is in scope with the MANDATORY geometry clause `S-d11`**, whose wording must appear **wherever geometry criteria are described**. | `§2.2` `P-11` (the clause carried verbatim), `§3.5 R-9`, `§5.2` item 3 |
| **19** | **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE` / the plan's `ZQ-1`**: **THE STORE REFUSES NAMES AND TIERS; IT NEVER REFUSES SIZES** — no store-side clamp exists. | `§2.2` `P-6`, `§3.4 R-6`, `§7` item 6 |
| **20** | **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** — the family's OPACITY DISCIPLINE, with the NO-REACH clause: no parameter through which a coordinate, a magnitude or an element reach could arrive. | `§1` item 10, `§2.2` `P-10`, `§3.4 R-7`, `§5.5.1 P-SC-TP-6` |
| **21** | **`E10-SINGLE-SINK-CHANNEL` / `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** — cited **by row name only**: the store ships **no** sink, **no** gesture and **no** session member, and adds nothing to any frozen surface. | `§2.2` `P-12`, `§3.4 R-12`, `§6` item 6, `§8` |
| **22** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` + `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` + `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` + `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** — the register is MANDATORY **before** the red set for a code-bearing unit; the zero-row exemption is **not available** to this unit; **the declared attempt term is a DRIVE count** and assertions are printed BESIDE it; the total is printed WITH its terms. | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **23** | **`S-RH-1` (the plan's `§7.1` round-2 block) — a store subscription is PER REALM, PER REFERENCE**: one subscription, for as long as the realm lives, on one declared reference; the count after `N` generations stays `1`. | `§1` item 9, `§2.5` item 6, `§5.5.1 P-SC-IM-9`, `§3.5`'s release row |
| **24** | **`P-4`'s general-form supersession has NO `docs/decisions.md` row** (the record's `§5`(c), carried as the architect's). | `§7a.1` item 5, `§8` |

**Where a record or plan clause corrects a citation, this filing obeys the correction** — the corrected site is
cited, never the transcription that was corrected. **The known corrections, named so no reader re-derives them:**
the plan's `§1.2` round-3 clause (a) (`parts` names the tier's own path, never the read path); `§1.9` (ii)'s round-3
clause (b) (the first-hit arm wins over the merged arm); `§8.2`'s round-3 block (the four corrected `CORE` register
rows, which **`§5.5.1` below re-derives as `20`**); `§7.4.4`'s annotation (`5` superseded rows including row 26);
`§8.3`/`§8.7`'s live identity (`15 = 2 + 6 + 7`, which is **not this unit's arithmetic** and is cited only).

### 0A. The dated ruling notes — the clauses neither the record nor the plan decides, RULED here (2026-10-01)

**What this subsection is, and what it is not.** The record is **contract-exact** about the conditions `C-1`…`C-8`
and the plan is **contract-exact** about the model; both are **silent** about several clauses a TestWriter must have
before it can author a falsifiable row. **This filing DECIDES each of those clauses here**, each with its reason and
its landing site. **No note below weakens a ruling, a condition or a prohibition row.** **Where this filing could
NOT derive a clause from the plan's bytes, it does not guess: it is raised as a DECISION REQUEST at `§7a.1` with
options and a recommendation, and the affected row is marked.**

**Note 1 — the module paths, and the two files' split.** **No source names either path.** The sibling convention
(`src/renderer/runtime.ts`, `src/renderer/renderer.ts`, `src/renderer/secure-panels.ts`, `src/renderer/extensions.ts`,
verified free 2026-10-01 for `store-core.ts`) and the unit's own name decide the stem. **RULED: the module is
`src/renderer/store-core.ts` — the STORE; the declaration table is `src/renderer/store-references.ts` — the DATA.**
The same note names the test file (`tests/store-core.test.ts`) because **`§5.1`'s diff scope must be a real,
checkable allow-list**. **The two-file split is derived, not preferred: the store must not carry the declaration
table's BYTES**, because the `R-1` scan over the store's source must be able to pass on a module that contains **no
caller spelling at all** — and a single file holding both would make the scan's exemption set non-empty by
construction.

**Note 1b — the store's realm and the reason it is renderer-side.** **`[H]`: the renderer bundle's import block
admits `./runtime.js`, `./secure-panels.js` and `../shared/**` only** (`src/renderer/renderer.ts`, read at its own
import block), **and `src/main/**` is what the renderer cannot import.** The plan's `§2.5` revision puts **all three
non-security tiers in the renderer realm**, and the read's `cache` member is **a live object reference that cannot
cross an IPC boundary** (`docs/specs/mcp-endpoint.md` `P-E6`). **So a `src/shared/**` or `src/main/**` home would
make the read's declared return shape unimplementable** — the store's realm is therefore **forced by the contract's
own return shape**, not chosen. **This is the `C-4`-family reasoning applied to the module itself.**

**Note 2 — the store's construction and ownership, stated once.** **The renderer's wiring creates EXACTLY ONE store
per realm, in the realm's boot step and BEFORE the first `Y-1` hand-off** (the plan's `§2.5` boot order). **The
store is held in the wiring's own closure or a realm-scope binding owned by the wiring — NEVER in a module-level
binding inside `src/renderer/store-core.ts`** (`§3.4 R-10`, the no-module-level-binding row). **A second `createStore`
call in the same realm is a CONTRACT FAILURE caught by a row, not by a silent second authority** (`§2.1` item 1).
**Who creates it: the wiring. When: at boot, before the hand-off. What a second creation does: it fails a row** —
the store itself is TOTAL and never refuses construction, so the failure is **the realm's**, observed by the row
that counts constructions.

**Note 3 — `set` vs `commit`, ruled because the plan's usage implies a distinction it never states.** **The
architect's commit sentence is about a value whose LOWER TIERS MUST BE CLEARED** (plan `§1.4` `C-1`), while **the
store-1 get/set cell lists `set(name, value)` and `commit(name, value)` as two operations** and **the drag example's
release hop is a commit** (`§1.1` store 1's get/set cell; `§4`'s release hop). **RULED, and it is a row a unit can
FAIL: `set` NEVER CLEARS, on any tier; `commit` CLEARS the same LOGICAL PATH in every lower-durability tier and is
legal on every tier, including `temp` where it clears nothing.** **The alternative reading — that `set` is a
synonym for `commit` — is refused because it would make `C-5`'s *"the commit is the only path that clears"* say
nothing and would let a plain tier-local write silently destroy a lower tier's working value, which is the class
`C-3` exists to prevent.** **A row that observes `set` clearing anything FAILS `§3.1 M-6`.**

**Note 4 — a `remove`'s post-state is a MISS at every tier the name reaches, and this is derived from `R3-6`'s own
falsifier.** The plan's printed falsifier for `remove` is: *"`set('mem.x', v)` then `remove('file.x')` — a subsequent
`read('x')` must MISS, not answer the `mem` copy."* **That sentence is only satisfiable if the `file`-qualified
`remove` succeeds while a `mem` copy exists**, so **the `remove`'s tier-qualified form is NOT refused for a resident
copy in a LOWER tier** — the lower copy is exactly what it exists to clear (`§2.10` item 3). **The record's
`ambiguous-path` refusal is therefore confined to the ONE case its own premise leaves: a call that does not name a
tier while the path is resident in more than one.** **The narrow reading that would refuse the plan's own printed
falsifier is refused here**, and the residual narrowness is raised as a decision request (`§7a.1` item 2a).

**Note 5 — the store holds NO vocabulary, stated as a construction rule rather than as a promise.** **Every string
the store's own bytes carry is either (a) one of its own tokens — the four tier tokens, the seven `cause` tokens,
the closed refusal-reason tokens, and the member names of its own records — or (b) the CALLER'S.** **A reference
segment is never interpreted, compared, trimmed, lower-cased, split, sorted, deduped or re-joined by the store
except at the two places the grammar itself requires: splitting a name on `.` to reach the tier segment, and
comparing whole segments for equality against a declaration row's own literal or wildcard slot.** **The store ships
no consumer vocabulary, no `is-*` literal, no unit string and no token (plan `§1.3` `R-1`; `docs/specs/container.md`
`P-CT-1` with `H-r15`'s hazard).**

**Note 6 — the declaration table's own file, its export census, and the ONE `[H]` read it costs.** **The table
lives renderer-side beside the store** (the architect's ruling on the record's `C-4`), **so the read consults it
IN-REALM with ZERO crossings.** **Its exact exported shape is an explicit decision request (`§7a.1` item 6)**:
this filing's working default is **one value export (the table) plus two type declarations**, and **the row that
pins it is `§3.4 R-11`.** **The alternative — hoisting the table into `store-core.ts`'s own file — is recorded and
NOT taken**, because it would put the caller's spellings inside the file whose `R-1` scan must stand vacuous
(Note 1).

**Note 7 — the trie's two queries are `holdsExact` and `holdsDescendantBelow`, and the names are this contract's
invention.** The plan's `§1.9` (i) guarantees every ancestor is a node, which by itself **cannot distinguish
"holds this exact path" from "has this prefix"** — the search needs the former and the merge needs the latter.
**RULED: two private, per-tier queries, exposed to this unit's test file ONLY through the declared test seam
(`§2.8`)** — a public read of trie internals is refused because it would be a second, undocumented read surface.
**The architect's confirmation is requested (`§7a.1` item 3), and `§5.5.1 P-SC-TP-5` is the row that carries them.**

**Note 8 — the caps are RECOMMENDED values, and every one is architect-reversible.** **The plan REQUIRES a
declared cap on tier-2 collections, on tier-3 entries and on prefix/tier-wide subscriptions, and states NO value
and NO overflow outcome for any of them** (record's `C-7`; step 3's §5(c) item 4). **This filing therefore derives
values from the model's own worst cases and pins BOTH the value and the outcome** (`§2.9`). **The derivation, so a
reader can reverse a value rather than guess at one: the tier-3 cap follows the tier's own *"an un-cleared entry
leaks into the next episode"* failure mode; the tier-2 cap follows the `RH-4` class the plan names (an uncapped
per-entry collection); the subscription cap follows the plan's own *"a listener on `temp.*` on the drag hot path is
a re-render amplifier"*. All three values carry a decision request at `§7a.1` item 4.**

**Note 9 — the refusal union's EIGHTH member is an addition with its own decision request, and the other seven are
the record's own.** The plan names seven tokens in passing and never enumerates them; the record says the union's
**closure is a contract-shape decision the spec makes**. **RULED: seven of the eight members are the tokens the
plan's own rows use, and the eighth (`'cap-exceeded'`) is required to give the three mandated caps a
distinguishable overflow outcome.** **`§2.6` item 3 prints the token-mapping table (which row mints which token);
`§7a.1` item 2 records the alternative (share an existing token) and the recommendation.**

**Note 10 — the constraint table declares EXACTLY ONE row today, and a second owes its interaction rule.** The plan
states the rule in its own words (`NW-8`(c)): **a repair that itself violates a SECOND constraint is the cascading
case, which is why the table declares one constraint today and a second one owes its interaction rule before it is
declared.** **RULED: `§2.10` item 9 makes that a refusal at LOAD — a declaration table carrying two distinct
constraint ids where neither declares an interaction rule does not load.** **No second constraint is invented, and
no interaction rule is invented for a constraint that does not exist.**

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no leg ran, no `tsc` invocation was
made, no build ran, no Electron window booted, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | node suite / pure module | this repo's `tests/**` + `src/shared/dom-shim.ts` under `npm test`; here, `tests/store-core.test.ts` driving `src/renderer/store-core.ts` | not a window, not IPC, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, the module, the declaration file, and the wiring's construction and subscription role | not a measurement of app behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — a real `BrowserWindow` under a scratch profile | **NOT OFFERED BY THIS SPEC** (`§5.2` item 2) |
| **[D]** | divergence leg | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **NOT CLAIMED BY THIS SPEC** (`§5.2` item 2) |
| **APP** | assembled app | a reading from the running assembled app | **no such reading exists in this filing** |

**Five honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this repo's vitest
   files pass against the module **in the DOM shim's realm**. **No window is booted, no IPC round-trip runs, the
   tier-1 channel is NOT exercised** (it is `U-STORE-PERSIST`'s, `§6` item 2), **no MCP transport is exercised, and no
   real DOM is touched.**
2. **This unit's `[T]` green proves CONTRACT BEHAVIOUR OVER ARGUMENTS AND OVER A DRIVEN IN-REALM STORE — nothing
   about persistence, nothing about a rendered surface and nothing about the app.** **The tier-1 `file` tier's own
   `[H]` half is the channel's** (`U-STORE-PERSIST`), and **this unit's `file`-tier rows drive the tier THROUGH the
   store's own table with the channel STUBBED at the declared crossing seam** (`§2.2` `P-9`).
3. **The module reads NO ambient global and performs NO realm access**: no `document`, no `window`, no
   `globalThis`-rooted lookup, no `process`, no `require`, no `fs`, no `Date`, no `Math.random`, no wall clock.
   **Every input is an argument or a declaration row.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its rows are
   authored **in this unit's own test file** and executed by the **same node suite** (`npm test`, `§5.2` leg 1) — so
   **a register row is `[T]` evidence exactly as a `§3` row is**, and **no register row may be read as `[H]`, `[U]`,
   `[D]` or APP evidence.**
5. **A subscriber-delivery green is NOT a re-render green.** Every counted delivery is **a call the store made into
   a function the caller registered** — **never a fact about a pane, a zone, a tab strip, a width or a rendered
   geometry.** **The store never writes the graph** (`§2.2` `P-7`; `docs/specs/mcp-endpoint.md` `P-E2`).

---

## 1. Scope

**One deliverable: the model itself, in one renderer-realm module — three non-security tiers with their own surfaces,
ONE layered read, five mutators with receipts, a declared name registry, a residency trie per tier, a store-side
constraint table with `REPAIR`, and the seven-arm event surface.**

1. **What the unit is, in one sentence.** **`U-STORE-CORE` is the four-tier data-ownership store's CONTRACT: the four
   tier tokens and their placement (three in the renderer realm — plan `§2.5`), the layered read with its five cases
   and its `{found, value, tier, cache, name}` / `{merged, parts}` shapes, the reference grammar with its closed
   four-token first segment, the DECLARED NAME REGISTRY as the store's second contract surface, the residency trie,
   the constraint table with its one `REPAIR` row, `remove`/`clear`/`sweep` with their receipts, and the one event
   envelope with its seven `cause` tokens.** **It is ONE CONTRACT and ONE RED SET: the architect has ruled that the
   FIRST red set carries the WHOLE MODEL and that NO SECOND CORE PASS is declared** (`docs/decisions.md`'s round-3
   row clause (7); the record's `§7` register paragraph and `§10` `R6`).
2. **What the unit is NOT — no policy, no default and no consumer vocabulary.** **No policy default, no inferred
   value, no store-side clamp, no comparator, no `equals` seam, no unit string, no token, no pane/zone/tab word as
   the store's own vocabulary, no `is-empty`/`is-minimized`/`is-revealed` literal** (`§2.2` `P-1`…`P-6`, `P-10`).
   **Every segment after the tier is the caller's string, carried verbatim.** **The store's only decisions are the
   ones the model gives it: which tier answers, whether a name is declared, which copies a clear reaches, which
   constraint row applies, and whom to notify.**
3. **What the unit is NOT — no persistence of its own and no second authority.** **The store owns no file, no
   `localStorage`, no `fs`, no channel, no path and no byte.** **The tier-1 `file` tier's values live in the
   renderer's table and `main` persists them through the tier-1 channel, which is `U-STORE-PERSIST`'s contract**
   (plan `§2.5`). **This unit's tier-1 rows drive the tier through a declared, STUBBED crossing seam** (`§2.2`
   `P-9`) — **and a store that wrote a path, opened a file or reached `node:*` FAILS `§3.4 R-6`.**
4. **What the unit is NOT — no MCP surface and no new seam.** **No tool, no resource, no tool-group, no
   `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, no preload member, no
   `scripts` key and no config change** (`§2.2` `P-12`). **A store value is MCP-visible if and only if a graph node
   carries it — and this unit carries none.**
5. **What the unit is NOT — no UI and no rendered surface.** **It authors no element, no text, no class, no
   attribute, no stylesheet and no control.** **Therefore gate 6 is `STRUCTURAL`** (`§5.2` item 3) **and the
   `user-flow-audit.md` `§7.1` predicate does not trigger** (`CURRENT STATE` item 6).
6. **What the unit is NOT — no geometry and no magnitude.** **The store reads no coordinate, no rect, no computed
   style, no element and no clock** (`§2.2` `P-10`, `P-11`). **A "location" is two caller values — an opaque slot key
   and a caller-measured scalar — never a coordinate** (the plan's `ZQ-4`).
7. **What is EXPLICITLY OUT of scope (do not do in this unit).** The tier-1 CHANNEL and its atomic/`fsync`/`tmp`/
   recovery duties (plan `§2.5`; `U-STORE-PERSIST`, row `G2`); the preload members and the `Y-1`/`Y-2`/`Y-3` shapes
   (`PERSIST`); tier 4's re-home, the atomic write replacing `persist()`'s plain `writeFileSync` and the receipt
   replacing the swallow (`U-STORE-SECURITY`, row `G3`); the settings schema version, the five-step migration and the
   reserved-namespace migration rule (`PERSIST`); the tabs/focus slice's TENANT DECLARATIONS and its two authored
   pages (`U-STORE-FOCUS`, a **PROPOSAL**); the rendered tab strip (`U-STORE-TABS-STRIP`, a **PROPOSAL**); the fifteen
   modules' store obligations (`U-STORE-MODULES`, a **PROPOSAL**); any `docs/skills/designing-pages.md` update (the
   file does not exist and this unit renders no page).
8. **The FIRST TENANT is a PROPOSAL, and this unit therefore ships its own declaration fixture.** **The plan's
   registry names arrive *"as the TENANT'S DECLARATION ROWS"* from `U-STORE-FOCUS`, an unadmitted unit** — so **this
   unit's own test carries a TEST-ONLY declaration fixture** (`§2.6` item 7, `§5.1`), and **the real tenant's names
   arrive later as declaration rows.** **The fixture's supplier is the architect's to confirm** (`§7a.1` item 1);
   the working default is implemented so the red set is authorable today.
9. **What the unit may land.** **`src/renderer/store-core.ts` (NEW) · `src/renderer/store-references.ts` (NEW) ·
   `tests/store-core.test.ts` (NEW) · this spec · the STEP-0 dossier · the unit's own `*-greens.md` · the unit's own
   tracker/record artifacts.** **NO edit to the plan, the record, `docs/next-steps.md` counts, any sibling spec,
   `AGENTS.md`, `package.json`, a script or a config** (`§5.1`). **`src/shared/**` stays BYTE-IDENTICAL** (the plan's
   `§6.3` `U-STORE-CORE` boundary clause; `Q-3`'s answer keeps the channel constants out of the vendored surface).
10. **The value is a FACILITY'S CONTRACT, and the honest cost is stated.** **This unit ships a module imported by
    the renderer wiring and by nothing else** — so its green is **envelope/pure-layer evidence that the contract
    holds for a driven store**, never that the app behaves differently. **The honest cost**: this spec + a
    **twenty-row** register + red/green **with remands** + the adversarial pass and read-only PBT audit + blind
    greens + the per-unit documentation review + a DONE row + per-gate commits (`RCA-8(a)`).

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**Two NEW modules. `src/renderer/store-core.ts` imports `src/renderer/store-references.ts` (type-only for its row
type) and NOTHING ELSE — no `provident-ssr`, no `electron`, no `node:*`, no `src/main/**`, no `src/shared/**`, no
sibling mechanism module** (`§3.4 R-11`; `§2.2` `P-9`).

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: `TWENTY` exported names, in TWO
HALVES — `TWO` value exports and `EIGHTEEN` type declarations.** **The two halves are counted separately on
purpose**, because sibling reviews have caught a census cell contradicting the block beside it, and because **a
type declaration is erased at runtime**, so a single *"20 exports"* claim would be **half-unfalsifiable**. **This
block declares exactly `2 + 18 = 20` exported names and nothing else**:

**⟶ CORRECTED 2026-10-01 (THIS FILING'S OWN CENSUS ARITHMETIC — a MIS-SUM of exactly the class
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` names, caught by reading this cell against the block beside it).**
**THE AS-DRAFTED CELL PRINTED *"TWELVE type declarations"* AND NAMED TEN, omitting `StorePattern`,
`StoreWriteReceipt` and `StoreSubscription`, and omitting the two aggregate interfaces `Store` and
`StoreCrossing` entirely — while the block beside it USES all five. THE CORRECTED CENSUS, WITH ITS TERMS: the
types are EIGHTEEN — the four domain types (`StoreTierName` · `StoreTier` · `StoreRefusalReason` · `StorePart`) ·
the FOUR read-result shapes plus their union (`StoreReadHit` · `StoreReadMiss` · `StoreMergedRead` ·
`StoreReadResult`) · the tier-local result and handle (`StoreGetResult` · `StoreTierHandle`) · the declaration row
and its pattern (`StoreDeclaration` · `StorePattern`) · the constraint row (`StoreConstraint`) · the event
envelope (`StoreEvent`) · the write receipt (`StoreWriteReceipt`) · the subscription (`StoreSubscription`) · the
two aggregate interfaces (`Store` · `StoreCrossing`) = `18`.** **`Store` IS COUNTED**: it is an exported type
declaration like any other, and a row that reads the namespace's **VALUE** keys will not see it — which is exactly
why the type half is a `tsc` PRESENCE claim and not a runtime key claim. **The as-drafted figures (`TEN`/`TWELVE`/
`FOURTEEN`) are kept visible in this block's own dated clauses and are SUPERSEDED BESIDE; the `2 + 18 = 20` figure
is the one `R-5` and the DONE row must print.**

**(a) THE TWO RUNTIME VALUE EXPORTS — exactly `createStore` and `createStoreError`.** (`createStoreError` is this
unit's ONE exported error constructor, named so that the two throw sites below are assertable by a caller **without
a class identity guess** — `§3.4 R-5`(a) reads the imported namespace's own keys, **BY NAME**, with a positive
control that a namespace carrying a **third** value export FAILS.)

**(b) THE EIGHTEEN TYPE DECLARATIONS — exactly `StoreTierName` · `StoreTier` · `StoreRefusalReason` · `StorePart` ·
`StoreReadHit` · `StoreReadMiss` · `StoreMergedRead` · `StoreReadResult` · `StoreGetResult` · `StoreTierHandle` ·
`StoreDeclaration` · `StorePattern` · `StoreConstraint` · `StoreEvent` · `StoreWriteReceipt` ·
`StoreSubscription` · `Store` · `StoreCrossing`** (`§3.4 R-5`(b):
a type-only name is **erased at run time**, so the type half is a **PRESENCE** claim pinned by **`§5.2` leg 5's
standalone strict `tsc`**; the SET-EXACTNESS of the **type** half is a **DOC** claim owned by this census, not a
runtime row claim).

**A row asserting only a COUNT without NAMING the names FAILS `R-5`'s own text** (`§4.4 S-7`).

**THE FOUR TIER TOKENS ARE NOT EXPORTED NAMES.** `StoreTierName` is a **closed union type**, and the tokens
themselves are **literals inside that union and inside the tier map's own keys** — so a row that reads the
namespace's value keys and finds a `tier` constant object **FAILS `R-5`**(a). **The set the contract pins is named
here so it is falsifiable: `'temp'` · `'mem'` · `'file'` · `'secure'`, EXACTLY four, case-sensitive.**

```ts
/* ───────────────────────────── THE CLOSED DOMAINS ───────────────────────────── */

/** THE FOUR TIER TOKENS — the grammar's CLOSED first-segment domain, CASE-SENSITIVE.
 *  'secure' is a LEGAL NAME PREFIX and is REFUSED by every generic operation (§2.6 item 4).
 *  There is NO fifth token: `File`, `disk`, `cache` and the empty string are all OUTSIDE the domain
 *  and are refused with reason 'malformed-name' (G-5's row). */
export type StoreTierName = 'temp' | 'mem' | 'file' | 'secure'

/** THE THREE NON-SECURITY TIERS THE READ SEARCHES, in ASCENDING durability — the read's own order.
 *  `secure` is deliberately NOT a member: the architect's fall-through sentence excludes it (§1.1 store 4). */
export type StoreTier = 'temp' | 'mem' | 'file'

/** THE CLOSED REFUSAL-REASON TOKEN UNION — EIGHT members, and this contract CLOSES it (§2.6 item 3).
 *  A reason is a RETURNED RECORD MEMBER; it is NEVER a throw (§2.2 P-8). */
export type StoreRefusalReason =
  | 'undeclared-name'      /* G-1/G-2/G-3, H-1, H-5 — the name matches no declaration row */
  | 'malformed-name'       /* G-5/G-7 — an empty/non-string name, an empty segment, or an out-of-domain tier token */
  | 'reserved-name'        /* G-4, R-7 — remove() on a reserved declaration's own name */
  | 'malformed-pattern'    /* G-9/G-10 — an ambiguous table or a malformed pattern, refused AT LOAD */
  | 'secure-refused'       /* G-6, H-3, H-4 — ANY `secure.*` name on the generic surface, decided FIRST */
  | 'cap-exceeded'         /* §2.9 — a declared cap's overflow, on a write or on a subscription */
  | 'reserved-namespace'   /* §2.6 item 6 — a concrete declaration colliding with a reserved namespace key */
  | 'ambiguous-path'       /* §2.10 item 3(b) — a tier-free call whose path is resident in more than one tier */

/* ───────────────────────────── THE READ RESULT (two shapes, ONE union) ───────────────────────────── */

/** THE MISS OR THE FIRST HIT — the shape the plan's §1.2 pins, with `parts`/`merged` ABSENT.
 *  `cache` is the TIER HANDLE ITSELF (a live object reference — it NEVER crosses a boundary) or `null`. */
export interface StoreReadHit {
  readonly found: true
  readonly value: unknown          // `undefined` is a LEGAL VALUE, distinct from a miss (§2.2 P-3)
  readonly tier: StoreTier         // the tier that ANSWERED
  readonly cache: StoreTierHandle  // the answering tier's own handle — identity, not a copy
  readonly name: string            // the caller's own spelling, resolved (§2.5 item 4)
  readonly merged?: undefined      // ABSENT on this arm — a present `merged:false` FAILS §3.4 R-13
  readonly parts?: undefined       // ABSENT on this arm — a present empty array FAILS §3.4 R-13
}

/** THE DECLARED MISS. `parts` and `merged` are ABSENT here too; `cache` is `null`; `tier` is `null`. */
export interface StoreReadMiss {
  readonly found: false
  readonly value: undefined
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged?: undefined
  readonly parts?: undefined
}

/** THE MERGED ARM — no tier holds the path, descendants are resident (§2.5 item 5).
 *  `tier` and `cache` are `null`; `merged` is `true`; `parts` is a NON-EMPTY {tier,path}[] list. */
export interface StoreMergedRead {
  readonly found: true
  readonly value: unknown
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged: true
  readonly parts: readonly StorePart[]
}

/** A PROVENANCE PAIR: the TIER and THE PATH THAT TIER ACTUALLY HOLDS — never the read path (§2.5 item 5). */
export interface StorePart {
  readonly tier: StoreTier
  readonly path: string
}

export type StoreReadResult = StoreReadHit | StoreReadMiss | StoreMergedRead

/* ───────────────────────────── THE TIER-LOCAL SURFACE ───────────────────────────── */

/** THE TIER-LOCAL GET — a record for EVERY name, never a throw. `cache`/`tier` are absent by construction
 *  (the caller already holds the tier). A DECLARED-BUT-UNWRITTEN name answers the DECLARED MISS (§2.4 item 3). */
export interface StoreGetResult {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
}

/** EACH TIER'S OWN HANDLE — returned as a read's `cache`, and reachable from the store by name (§2.4 item 1).
 *  FROZEN: no member is writable, no member is added later, and no prototype escape is offered. */
export interface StoreTierHandle {
  readonly tier: StoreTierName
  get(name: string): StoreGetResult
  has(name: string): boolean
  set(name: string, value: unknown): StoreWriteReceipt
  clear(name: string): StoreWriteReceipt
}

/* ───────────────────────────── THE DECLARATION TABLE'S ROW ───────────────────────────── */

/** ONE DECLARED REFERENCE — the registry's row (§2.6). Two KINDS: `concrete` (one exact spelling) and
 *  `pattern` (a SHAPE: literal segments plus NAMED WILDCARD slots, each slot accepting EXACTLY ONE non-empty
 *  segment). `tier` MUST match the name's/pattern's own first segment (G-3). */
export interface StoreDeclaration {
  readonly shape: 'concrete' | 'pattern'
  readonly name?: string                              // REQUIRED iff shape === 'concrete'
  readonly pattern?: StorePattern                    // REQUIRED iff shape === 'pattern'
  readonly tier: StoreTierName
  readonly reserved: boolean                         // true => remove() on the row's own name is refused (R-7)
  readonly constraint: string | null                 // an id into the constraint table, or null
}

export interface StorePattern {
  readonly tier: StoreTierName
  readonly segments: readonly string[]               // a literal segment, or a '<name>' wildcard slot
}

/* ───────────────────────────── THE CONSTRAINT TABLE'S ROW ───────────────────────────── */

/** ONE CONSTRAINT ROW — the plan's four columns, exactly (§2.10). */
export interface StoreConstraint {
  readonly id: string
  readonly kind: 'count-exactly-one'
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]
  readonly repair: 'next-surviving-by-order'
  readonly refusalReason: StoreRefusalReason | null   // null => THIS ROW NEVER REFUSES
}

/* ───────────────────────────── THE EVENT ENVELOPE AND THE RECEIPT ───────────────────────────── */

/** ONE EVENT PER AFFECTED REFERENCE — the envelope's members are present AS KEYS on EVERY arm;
 *  the PER-ARM required set is the SEVEN-ROW TABLE (§2.12), which is THE TOTAL STATEMENT. */
export interface StoreEvent {
  readonly name: string
  readonly tier: StoreTierName
  readonly value: unknown                            // present as a key everywhere; `undefined` in substance
  readonly cleared: readonly string[]                // PRESENT AND POSSIBLY EMPTY on every arm — never omitted
  readonly cause: 'set' | 'commit' | 'clear' | 'sweep' | 'remove' | 'repair' | 'descendant'
  readonly origin?: string                           // REQUIRED on the 'descendant' arm ALONE
  readonly subtree?: true                            // the descendant arm's own MARKER
}

/** A WRITE'S RECEIPT. `refused` carries a reason and NOTHING is mutated; `committed` carries the audit data.
 *  `events` is the COUNT of events this operation emitted — the row that pins "an N-sweep is N events"
 *  and "a refused write emits nothing" reads THIS member against the subscribers' own delivery record. */
export interface StoreWriteReceipt {
  readonly status: 'committed' | 'refused'
  readonly reason?: StoreRefusalReason               // REQUIRED iff status === 'refused'
  readonly name: string
  readonly cleared: readonly string[]                // fully-qualified; EMPTY when nothing was cleared
  readonly repaired: readonly string[]               // fully-qualified references a repair WROTE
  readonly events: number
}
```

**THE STORE OBJECT — the wiring's owner, its members, and the DECLARED DEGRADATION of each.**

```ts
export interface Store {
  /** THE LAYERED READ (§2.5). TOTAL: for every argument, a StoreReadResult or a typed refusal RECORD.
   *  ABSENT / NON-STRING / EMPTY input => a typed refusal with reason 'malformed-name' (G-7);
   *  a `secure.*` input => a typed refusal with reason 'secure-refused', DECIDED BEFORE THE REGISTRY. */
  read(name: string): StoreReadResult

  /** THE GENERIC WRITE, TIER-QUALIFIED. `set` NEVER CLEARS (§0A note 3). A `secure.*` name is refused.
   *  ABSENT / NON-STRING => refused 'malformed-name'; a tier-free name => refused 'malformed-name'. */
  set(name: string, value: unknown): StoreWriteReceipt

  /** THE COMMIT: the same LOGICAL PATH in every LOWER tier is cleared, AFTER this tier accepted (§2.10 item 1). */
  commit(name: string, value: unknown): StoreWriteReceipt

  /** THE DOWNWARD REMOVAL (§2.10 item 3). A reserved declaration's own name is refused 'reserved-name'.
   *  A tier-free name whose path is resident in more than one tier is refused 'ambiguous-path'. */
  remove(name: string): StoreWriteReceipt

  /** THE TIER-LOCAL, NON-RECURSIVE CLEAR (§2.10 item 2). One event per cleared reference. */
  clear(name: string): StoreWriteReceipt

  /** THE SWEEP: unmark and clear the swept tier entries. N swept entries => N events, NEVER one event. */
  sweep(name: string): StoreWriteReceipt

  /** THE SUBSCRIPTION. `opts.subtree` is OPTIONAL and DEFAULTS TO false (§2.11 item 3).
   *  A prefix/tier-wide subscription is admitted ONLY as a declared, bounded form and is REFUSED past its cap.
   *  THE DECLARED DEGRADATION of the listener argument: a NON-CALLABLE listener is refused 'malformed-name'
   *  and REGISTERS NOTHING; a listener that THROWS does NOT propagate to the mutator's caller (§2.11 item 6). */
  subscribe(name: string, listener: (event: StoreEvent) => void,
            opts?: { subtree?: boolean }): StoreSubscription

  /** THE THREE TIER HANDLES, by name, FROZEN. */
  readonly tiers: Readonly<Record<StoreTierName, StoreTierHandle>>

  /** THE REGISTRY'S OWN READ-ONLY VIEW — the loaded table, for a row that asserts what loaded. */
  readonly declarations: readonly StoreDeclaration[]

  /** THE CONSTRAINT TABLE'S READ-ONLY VIEW — exactly one row today (§2.10 item 9). */
  readonly constraints: readonly StoreConstraint[]

  /** THE TEST-ONLY SEAM (§2.8). PRESENT ONLY when the factory was called with `{ enableTestSeam: true }`;
   *  ABSENT (the member key does not exist) otherwise — and that absence is a ROW (`§3.5 R-10`(c)). */
  reset?(): void
  seed?(rows: readonly { readonly name: string; readonly value: unknown }[]): void
}

export interface StoreSubscription {
  readonly name: string
  readonly subtree: boolean
  unsubscribe(): boolean      // true the first time, false on every later call — never a throw
}

/** THE TIER-1 CROSSING SEAM, INJECTED AND STUBBED. This unit declares it and asserts NOTHING about it:
 *  the real channel — the boot hand-off, the atomic write, the `fsync`, the recovery and the push — is
 *  `U-STORE-PERSIST`'s contract (row `G2`). THE DEFAULT is a no-op recorder answering `{status:'committed'}`
 *  with `cleared: []`, so a `file`-tier write is legal with NO seam supplied. */
export interface StoreCrossing {
  put(row: { readonly name: string; readonly value: unknown }): { readonly status: 'committed' | 'refused' }
}

/** THE FACTORY. TOTAL: it NEVER throws and NEVER returns a null/primitive for ANY argument.
 *  `{ declarations }` is REQUIRED to be a well-formed table (a malformed one is a LoadRefusal, thrown
 *  as a `StoreLoadError` — the ONE declared throw, §2.2 P-8). `{ constraints }` DEFAULTS to the one declared
 *  row. `{ crossing }` is the STUBBED tier-1 seam (§2.2 P-9) and DEFAULTS to a no-op recorder. */
export function createStore(options: {
  readonly declarations: readonly StoreDeclaration[]
  readonly constraints?: readonly StoreConstraint[]
  readonly crossing?: StoreCrossing | null
  readonly reservedNamespaces?: readonly string[]
  readonly enableTestSeam?: boolean
}): Store
```

**THE ONE EXPORTED THROW, and the ONE NAMED NON-DOMAIN THROW.** **`createStoreError(message: string): Error`
constructs the error the factory throws for a table that does not LOAD** (`G-2`/`G-9`/`G-10`/`§2.10` item 9) —
**it carries a `reason: StoreRefusalReason` member** so the load refusal is assertable by token. **NO OTHER PATH
THROWS on any declared-domain input**; the only other named throws are the **two seam throws of `§2.8`'s test
seam** (`reset()`/`seed()` called without the seam enabled).

### 2.2 The prohibitions — **every prohibition cites an ENUMERATED static row**

**Caller-supplied (never built in, never defaulted, never enumerated):** every reference name; every value; every
constraint id on a declaration; the tier-1 crossing seam; the declaration table; the declaration fixture's caller
spellings; every listener; and every subscription's `{subtree}` opt-in. **The module contains NO application string,
NO consumer noun as its own vocabulary, NO `is-*` literal, NO unit string, NO default value, NO policy predicate and
NO store of its own.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No consumer vocabulary** — no `tab`/`pane`/`zone`/`gutter`/`region` token **as the store's own vocabulary**, no `is-empty`/`is-minimized`/`is-revealed` literal, no fork-origin literal `minimized` (the mirror-class ban, `docs/specs/container.md` `P-CT-1` with `H-r15`) | **The store's bytes carry only its own tokens and the caller's strings** (`§0A` note 5). **The declaration table lives in a SEPARATE file** (`§0A` note 1) so the store's own `R-1` scan stands with an EMPTY exemption set; **a consumer noun appearing in `store-core.ts` FAILS `R-1`** — and the store's `ZQ-2` duty is explicit: *"a store whose bytes spell `is-minimized`/`is-revealed`/`minimized` FAILS `P-CT-1`"* | **`R-1`**, `M-8`, `M-19`, `I-3`, `A-4` |
| **P-2** | **No policy default and no invented value** | **A miss is `{found:false, value:undefined, tier:null, cache:null, name}`; a declared-but-never-written name answers the DECLARED MISS on every surface; a registered default is NEVER answered.** The one miss-shaped fallback in the whole model — `file.window.bounds`'s landed literals — is **`main`'s**, not the store's, and it is a MISS, not a default | `M-1`..`M-5`, `F-1`, `F-2`, `I-4`, `R-3`, `§1` item 2 |
| **P-3** | **`undefined` is a LEGAL VALUE, distinct from a miss, and is NOT a deletion and NOT a third state** | `set('mem.x', undefined)` **stores** and answers `{found:true, value:undefined}`; `read`/`get`/`has` on that name agree. **There is no `removed` state in the grammar** — only `found:true` with a value, or `found:false` | `M-9`, `M-10`, `F-24`, `I-5`, `R-13` |
| **P-4** | **No throw on any declared-domain input** | Every API member is **TOTAL over its declared domain** and answers a **record**. **The named exceptions, and there are exactly THREE: (a) `createStore`'s LOAD REFUSAL for a table that does not load (a `StoreLoadError`); (b) `reset()`/`seed()` called without the test seam enabled.** **A throw anywhere else FAILS `R-6`** | `M-1`..`M-3`, `F-25`, `I-2`, `R-6` |
| **P-5** | **No `cache` crossing a boundary** | `cache` is the **tier handle itself** — a live object reference. **Nothing in this unit serializes, clones or copies it**, and **no row may claim it crossed a process boundary** (`docs/specs/mcp-endpoint.md` `P-E6`) | `M-2`, `R-7`, `§1` item 3, `I-6` |
| **P-6** | **No store-side clamp, and no size refused** — **THE STORE REFUSES NAMES AND TIERS, NEVER SIZES** | **The store has no size parameter, no arithmetic and no comparator**: values are `unknown` and opaque. `clampToBounds` stays the family's ONE clamp site | `I-7`, `R-7`, `§2.2` `P-1`, `A-5` |
| **P-7** | **No store write to the graph** | **The store calls listeners and nothing else.** No dispatch, no node, no envelope, no handler body, no component binding, no DOM call, no `elementForNodeId`; **a store that touched the graph FAILS `R-6`** | `R-6`, `I-8`, `§2.11` item 6, `A-6` |
| **P-8** | **No persistence outside the tier-1 channel (and the channel is NOT this unit's)** | **No `fs`, no `node:*`, no path, no file, no `localStorage`, no `process`.** The tier-1 rows drive the tier through a **declared, stubbed `crossing` seam**; **the channel's own contract is `U-STORE-PERSIST`'s (row `G2`)** | `R-6`, `I-9`, `§1` item 3, `A-7` |
| **P-9** | **No import of `src/main/**`, `src/shared/**`, `provident-ssr` or any sibling mechanism** | **Exactly ONE import statement exists in `store-core.ts` — the declaration module, and the ROW TYPE only**; **a fixture that imports a store into a mechanism FAILS `R-11`** (`[H]`: the renderer bundle admits `./runtime.js`, `./secure-panels.js`, `../shared/**` only) | **`R-11`**, `I-1`, `A-3`, `§0A` note 1b |
| **P-10** | **No element, no coordinate, no geometry, no magnitude, no clock** | **No `document`/`window`/`globalThis`, no `getBoundingClientRect`/`getComputedStyle`/`matchMedia`, no `clientX`-family read, no `element` parameter anywhere in the surface, no `Date`, no `Math.random`.** The family's opacity discipline, applied to the store's values: **an opaque caller value passes through uninterpreted** | `R-7`, `I-10`, `§5.5.1 P-SC-TP-6`, `A-8` |
| **P-11** | **THE GEOMETRY CLAUSE, CARRIED VERBATIM** (`S-d11`, mandatory wherever geometry criteria are described): *"the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described"* | **A store makes geometry claims no more provable than a family module does, and it must not become the place a coordinate finally lives.** **The clause fences exactly TWO places this unit's charter borders geometry: the `ZQ-4` "location" (an opaque slot key plus a CALLER-MEASURED distance — never a coordinate) and the declaration table's own segment `layout`, which is a SUBSTRING OF AN UNPARSED CALLER STRING, never a layout fact this unit asserts, measures or claims.** **NO row of this unit may assert a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact, and no green of this unit may be reported as one** | `I-10`, `R-7`, `§5.2` items 2/3, `§7` item 4, `A-8` |
| **P-12** | **No new MCP tool/resource/group/method, and no change to any frozen surface** | `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS` and the preload member set are **UNMOVED**; **no `scripts` key is added** (it would redden `tests/ui-leg-contract.test.ts`'s `L-1`, which pins the `scripts` KEY SET); and **no member is added to `docs/specs/gsession.md` `§2.5`'s frozen eleven-item delegate surface** | **`R-12`**, `I-11`, `§5.1`, `A-11` |
| **P-13** | **No second authority over any value a landed row owns** | **The store holds no consumer decision and no coordinate**; the `0 ⇒ minimized` mapping stays the consumer's (`ZQ-3`); `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` stays unmoved; the focus authority is tier 1's tab list, not a renderer holder. **A store that derived, defaulted or re-keyed a value it was given FAILS `R-10`** | `I-12`, `R-10`, `A-12` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-13`): **a prohibition citing *"a
static source row"* with no id is not a row**, and **every prohibition above names at least one id that exists in
`§3.4`.**

---

### 2.3 The reference grammar (exact)

**THE GRAMMAR, exact and closed.**

```
<name>       ::= <tier> "." <namespace> "." <path>...
<tier>       ::= "temp" | "mem" | "file" | "secure"          // CASE-SENSITIVE, exactly four
<namespace>  ::= one non-empty caller segment
<path>       ::= one or more caller segments, each non-empty, joined by "."
```

**Five rules the grammar carries, each a row a unit can FAIL — all derived from plan `§1.3`'s `R-1`..`R-5`.**

1. **THE FIRST SEGMENT IS THE TIER, and its domain is CLOSED and CASE-SENSITIVE.** `File.x` is **not** `file.x`;
   `disk.x` and `.x` are outside the domain. **A name whose first segment is outside the four tokens is refused
   `reason:'malformed-name'`** (`G-5`). **`secure` is a legal PREFIX and is refused by every generic operation**
   (`G-6`, `H-3`, `H-4`).
2. **EVERY SEGMENT IS NON-EMPTY AND A NAME IS A NON-EMPTY STRING.** `file..x`, `file.`, `''`, and a non-string are
   refused `reason:'malformed-name'` (`G-7`). **A SINGLE path segment after the tier is legal**: `file.x` parses as
   tier `file`, namespace `x`, path `[]` (zero further segments) — **and `file.x` and `file.x.y` are DIFFERENT names
   with different logical paths** (`§2.10` item 1(a)).
3. **NO PER-TIER ALIAS DECLARATIONS EXIST, AND THE TWO-NAME REFERENCE PROBLEM IS DISSOLVED.** **The same LOGICAL
   PATH is spelled ONCE** — `window.header` — and **a tier-qualified spelling is a QUALIFIER on that one spelling,
   never a second declared name.** **A declaration row that ships a per-tier alias field FAILS `R-4`** (the plan's
   `C-4`'s alias list is withdrawn and `§1.8`'s row shape drops `lowerAliases`).
4. **THE STORE OWNS NO VOCABULARY** (`§0A` note 5). **Every segment after the tier is the caller's string, carried
   verbatim** — the same opacity discipline the family applies to `edge` (`E5-B-2-...`, cited by row name) and to
   `zoneId`.
5. **NO REFERENCE NAMES AN ENGINE ID.** A path segment **may not be** an engine node id, a `data-node-id` value or a
   `css.id`/`props.id` **in the store's own vocabulary**; the store never treats a segment as an id. **A row that
   looks a segment up against any id registry FAILS `R-9`.**

**THE STORE'S OWN STRING OPERATIONS, exhaustively — this is the whole list, and it is what makes rule 4
checkable:** (a) `typeof name === 'string'` and `name.length > 0`; (b) `name.split('.')`; (c) an equality comparison
of **whole segments** against a declaration row's own literal segment or wildcard slot; (d) an equality comparison
of **whole logical paths** (the segment list after the tier, re-joined with `.`). **No other transformation exists:**
no trim, no lower-case, no prefix match, no suffix match, no `includes`, no sort, no dedupe, no re-key, no numeric
coercion.

---

### 2.4 The tier-local surface (exact)

**Item 1 — the three handles, their identity, and their frozenness.** `store.tiers.temp` / `.mem` / `.file` and
`store.tiers.secure` are **FROZEN** objects with exactly the five declared members. **The handle returned as a
read's `cache` IS the same object** (`toBe`) as `store.tiers[hit.tier]` — **a row that observes a copy FAILS
`M-2`.**

**Item 2 — the tier-local decision table, evaluated IN THIS ORDER (the order is the contract).**

| Order | Condition (exact) | Outcome |
| --- | --- | --- |
| **(a)** | the name's first segment is exactly `secure` | **A TYPED REFUSAL** `{status:'refused', reason:'secure-refused'}` — **the tier-local surface applies the secure-first rule TOO** (`H-6`: the GENERIC `read` refuses, and the tier's OWN `get` works — so the refusal here is the TIER-LOCAL surface's own, on a name whose tier is not this handle's own tier) |
| **(b)** | the name is absent / not a string / empty / has an empty segment / has an out-of-domain tier | **`{status:'refused', reason:'malformed-name'}`** |
| **(c)** | the name's first segment is a tier **other than this handle's** | **`{status:'refused', reason:'malformed-name'}`** — a tier-local surface addresses ITS OWN tier only, and a cross-tier call is a caller error, not a fall-through |
| **(d)** | no declaration row matches the name (concrete or pattern) | **`{status:'refused', reason:'undeclared-name'}`** (`H-5`) — **declaredness is a property of the REFERENCE, not of the operation**, so **the tier-local surface CONSULTS THE REGISTRY** |
| **(e)** | the name is declared and this tier holds it | **`{found:true, value:<the tier's own value — `undefined` is legal>, name:<the caller's spelling>}`**; **`has(name) === true`** |
| **(f)** | the name is declared and this tier does NOT hold it | **`{found:false, value:undefined, name}`** — **the DECLARED MISS; `has(name) === false`** |

**Item 3 — a declared-but-never-written name answers the declared miss on EVERY surface.** `get` answers
`{found:false, value:undefined, name}` and `has` answers `false`; **neither invents a default, neither throws and
neither refuses.** **A tier-local `get` that answers a registered default, or that refuses, FAILS the pair**
(`H-5`/`H-6`'s round-3 rule).

**Item 4 — the write side is tier-local too and NEVER CLEARS DOWN.** `handle.set(name, value)` writes this tier's
table only and answers a `StoreWriteReceipt` with **`cleared: []` unconditionally** — **a tier-local `set` that
cleared a lower tier FAILS `M-6`.** `handle.clear(name)` clears **this tier's** copy of the named declaration set
and **is not recursive** (`§2.10` item 2). **The generic `commit` and the generic `remove` are the ONLY two clearing
paths** (`§2.10` items 1/3).

**Item 5 — the tier handle's declared degradation.** A handle is **never** absent: the store always has all four.
**A handle obtained from a miss (`tier:null`) does not exist** — `cache` is `null` on the miss and the merged arm, so
**a caller that dereferences `cache` on a miss throws in ITS OWN code, not in the store's** (`§2.2` `P-4`'s
exhaustive exception list).

---

### 2.5 The layered read — the five cases, and the precedence

**THE RULE, in one sentence.** **`read(name)` searches the tiers in ASCENDING order of durability — `temp`, then
`mem`, then `file` — and returns the FIRST tier holding the reference at its own level, together with THAT TIER'S
OWN HANDLE AND THE RESOLVED NAME.**

**THE FIVE CASES, each a row, in the ORDER the decision runs:**

| Order | Case | The declared answer |
| --- | --- | --- |
| **(a)** | **the `secure` refusal** — the name's first segment is exactly `secure` | **a typed refusal `{status:'refused', reason:'secure-refused'}`, DECIDED BEFORE THE REGISTRY IS CONSULTED** — **so a caller learns nothing about tier 4's schema, and an undeclared `secure.*` name never answers `undeclared-name`** (`H-3`, `H-4`) |
| **(b)** | **the malformed name** — absent / not a string / empty / an empty segment / an out-of-domain first segment | **a typed refusal `{status:'refused', reason:'malformed-name'}`** (`G-5`, `G-7`) |
| **(c)** | **the undeclared name** — no concrete row matches and no pattern matches | **a typed refusal `{status:'refused', reason:'undeclared-name'}`** — **never a silent miss** (`H-1`) |
| **(d)** | **the first-hit arm** — the name resolves to a single tier | **`{found:true, value, tier:<that tier>, cache:<its handle>, name:<the caller's spelling>}`, `parts` ABSENT and `merged` ABSENT** |
| **(e)** | **the declared miss** — the name is declared and NO tier holds it | **`{found:false, value:undefined, tier:null, cache:null, name}`** — **never a throw, never an invented default** (`H-2`) |
| **(f)** | **the merged arm** — the name is declared, NO tier holds it, **and at least one tier holds a DESCENDANT of it** | **`{found:true, value:<the merged value>, tier:null, cache:null, name, merged:true, parts:[…]}`, the `parts` list NON-EMPTY** |

**Item 1 — the precedence is FIXED and TOTAL: `secure` → malformed → registry → first hit → merged → miss.** **The
reason token reported is the FIRST row that applies.** **A row that reports `undeclared-name` for a `secure.*`
name, or `secure-refused` for a malformed name that is not `secure.*`, FAILS.**

**Item 2 — the search order, and the two forms of the name.** **An UNQUALIFIED name (`window.header`) is searched
`temp` → `mem` → `file` and answers the FIRST hit; a QUALIFIED name (`temp.window.header`) addresses EXACTLY ONE
tier and MISSES if that tier does not hold it — it does NOT fall through.** **The search STOPS at the first hit** —
a lower-tier value shadows a higher-tier one. **A body that continues searching after a hit FAILS `M-1`.**

**Item 3 — `name` in the answer is THE RESOLVED SPELLING THE CALLER USED.** A tier-free logical path for an
unqualified read; **that same spelling with its tier qualifier for a qualified read.** **So a caller can always tell
WHICH TIER ANSWERED from the answer's own members** (`tier`, `cache`), **and a body that normalizes, re-spells or
re-orders the caller's name FAILS `R-4`.**

**Item 4 — a single-tier answer NEVER carries `parts`, and NEVER carries `merged`.** **Both members are ABSENT, not
empty** — so **a caller that sees `parts` knows a merge happened**, and **a first-hit answer that carried `parts`
would let a caller believe a composite exists where a tier holds a value** (the plan's `§1.2` round-3 clause and its
`§1.9` (ii) round-3 clause (b), both landed as corrections).

**Item 5 — the MERGED ARM, exact.** **The overlay order is by DESCENDING durability — `file` as the BASE, then
`mem` overlaid, then `temp` overlaid — the REVERSE of the search order.** **Why the reverse, stated so it is not
read as an inconsistency: the search asks *"which single tier answers"* and must prefer the most ephemeral (an
in-flight value wins); the merge asks *"how does the composite read"* and must give the MOST PERSISTENT structure the
base, with ephemeral tiers layered on top.** **Five rows, each falsifiable:**

1. **`parts` is ORDERED by the overlay order (`file` → `mem` → `temp`) and each entry is a `{tier, path}` pair —
   NEVER a value**, so the list stays a provenance record.
2. **A `parts` entry names the PATH THE TIER ACTUALLY HOLDS (the descendant's own path), NEVER the read path.**
   **An entry equal to the read path FAILS `M-5`.**
3. **`tier` is `null` and `merged` is `true` on this arm.** **Reporting the base tier in `tier` would make the merged
   read indistinguishable from a first-hit read, and FAILS `M-5`.**
4. **A SINGLE-TIER ANSWER NEVER CARRIES `parts`** (item 4 above).
5. **`cache` is `null` on the merged arm** — **the merged value is a NEW object assembled by the read, so there is
   no single tier object to return, and an answer that returned any tier's `cache` would claim that tier holds the
   composite** (the plan's `R3` risk; `M-5`).

**AND THE HONEST LIMIT, SO IT IS NOT OVER-READ: a merge is OVERLAY-BY-PATH, not a deep structural merge.** A parent
object held by `file` and a child held by `temp` compose into a value whose held member is the file-held object with
the temp-held child applied. **Two tiers holding STRUCTURALLY INCOMPATIBLE objects at the same path is a
`parts`-visible conflict, and the model declares NO reconciliation beyond the overlay order.** **A unit that invents
one FAILS `M-5`.** **The composite's own AUTHORITY is declared: it is NON-AUTHORITATIVE — no tier holds it, it is
recomputed on every read, and a row that treated a merged value as committable, cacheable or authoritative FAILS.**

**Item 6 — the arm boundary: the FIRST-HIT ARM WINS (`N-7`).** **The merged arm applies ONLY where NO tier holds the
READ PATH.** **When a parent IS resident in one tier while descendants are resident in another, the read answers the
FIRST-HIT ARM — that tier's own value, `parts` ABSENT, `merged` ABSENT — and NO merge runs.** **Why both arms cannot
apply at once: the merge exists to COMPOSE a value the store does not have; a tier that holds the exact path already
HAS a value, and the first-hit rule is precisely what keeps an in-flight `temp` value authoritative over a committed
`file` one — a merge at a resident path would silently overrule the first hit and hand the caller a composite no tier
holds.** **AND THE CONSEQUENCE, STATED RATHER THAN DISCOVERED: a caller that wants the composite BENEATH a resident
value cannot obtain it from a read of that path — it must read the DESCENDANT paths it cares about, or clear the
resident copy.**

---

### 2.6 The declared name registry — the store's SECOND CONTRACT SURFACE

**Item 1 — the file and the realm (the architect's ruling, cited at its own row).** **The declaration table is
RENDERER-SIDE, in `src/renderer/store-references.ts`, BESIDE the store.** **The read consults it IN-REALM WITH ZERO
CROSSINGS**: no IPC, no preload member, no main-side mirror, no per-declaration round trip. **The host-side
`src/main/store-channels.ts` holds CHANNEL-NAME CONSTANTS ONLY** — **channel names are what the host needs, and the
declaration table is not among them.** **Why the host site is dead rather than merely worse: `src/main/**` is what
the renderer cannot import** (`[H]`: `src/renderer/renderer.ts`'s import block admits `./runtime.js`,
`./secure-panels.js` and `../shared/**` only) — **a host-side declaration table the read cannot import would force
either one crossing per declaration or a second spelling of every reference, which is exactly the `F-8` failure the
rule exists to prevent.**

**Item 2 — the row shape, and the two KINDS.**

```ts
{ shape: 'concrete' | 'pattern',   // the row's KIND, and the matcher's first dispatch
  name: 'file.<caller>.<key>',     // concrete ONLY: the exact spelling, tier-qualified
  // OR, for a pattern row:
  // pattern: { tier: 'file', segments: ['<caller>', '<key>'] },
  tier: 'file',                    // MUST match the name's/pattern's OWN first segment (G-3)
  reserved: false,                 // true => remove() on the row's own name is refused BY NAME (R-7)
  constraint: null }               // an id into the declared constraint table, or null
```

**A PER-TIER ALIAS FIELD IS NOT PART OF THE SHAPE AND MUST NOT SHIP** (`§2.3` item 3). **A row that ships one FAILS
`R-4`.**

**Item 3 — the CLOSED refusal-reason union, its closure, and the token-mapping table.** The union is **exactly
eight tokens** (`§2.1`'s `StoreRefusalReason`). **The mapping, so no row mints a token of its own:**

| The refusal case (the model's own row) | The token |
| --- | --- |
| `G-1` — a name no row declares, at write time | `'undeclared-name'` |
| `G-2` — a name DECLARED TWICE (the declaration itself is refused) | `'undeclared-name'` — **the doubled row is not a declaration, so the name has no declaration that loads** |
| `G-3` — a name whose first segment does not match its declared `tier` | `'undeclared-name'` — **the name is not declared FOR THE TIER IT NAMES** |
| `G-4` — `remove()` on a RESERVED name | `'reserved-name'` |
| `G-5` — a tier segment outside the four tokens (case-sensitive) | `'malformed-name'` |
| `G-6` — a `secure.*` name on the generic surface | `'secure-refused'` |
| `G-7` — an empty or non-string name, or an empty segment | `'malformed-name'` |
| `G-8` — **SUPERSEDED: this row has NO SUBJECT** (there are no alias entries) | — **`G-8` is superseded, not weakened; the invariant it protected survives as `C-4-R` + `G-3`** |
| `G-9` — an AMBIGUOUS TABLE, refused AT LOAD | `'malformed-pattern'` |
| `G-10` — a MALFORMED PATTERN, refused AT LOAD | `'malformed-pattern'` |
| `H-1` / `H-5` — an undeclared name on `read`/`subscribe` or on `get`/`has` | `'undeclared-name'` |
| `H-2` / `H-5` — a declared-but-never-written name | **NOT a refusal: the DECLARED MISS** `{found:false, value:undefined, name}` · `has → false` |
| `H-3` / `H-6` — a declared `secure.*` name on the generic surface | `'secure-refused'` |
| `H-4` — the PRECEDENCE when two rows would apply | **the FIRST row's token**: `secure` → registry → miss |
| `§2.9` — a declared cap's overflow | `'cap-exceeded'` — **the EIGHTH member, and the ONE addition this contract makes; `§7a.1` item 2 raises it as the architect's confirmation** |
| `§2.10` item 3(b) — a tier-free call whose path is resident in more than one tier | `'ambiguous-path'` |
| `§2.6` item 6 — a concrete declaration colliding with a RESERVED NAMESPACE key | `'reserved-namespace'` |

**Item 4 — the `secure` check PRECEDES the registry check, and the reason is stated so it is not read as
arbitrary.** **The security tier's exclusion is a SAFETY property, not a schema property**: **a caller must learn
NOTHING about the security tier's schema from a generic call — not even whether a `secure.*` name is declared — so
the refusal must be decided by the NAME's own first segment, before the registry is consulted.** **A registry-first
order would leak the tier's schema existence to any caller that can spell a name, which is exactly the widening
`docs/specs/mcp-endpoint.md` `§6.4` forbids.** **A pattern whose literal tier segment is not `secure` can never
match a `secure.*` name**, because the first segment is compared first.

**Item 5 — the matcher, its PRECEDENCE, and what a concrete declaration beside a pattern means. Five rows.**

1. **A NAME IS MATCHED BY SHAPE.** A `concrete` row matches **exactly one spelling**; a `pattern` row matches **any
   concrete spelling of its shape**, with a named wildcard slot accepting **any non-empty SINGLE segment** — **so
   `<entity>.<id>.<key>` matches `<entity>.t7.<key>` and `<entity>.<key>` does NOT: the wildcard is exactly one
   segment, never zero and never more than one.**
2. **PRECEDENCE: CONCRETE BEATS PATTERN, ALWAYS; THEN SHAPE-COUNT DECIDES.** **(i)** an exact `concrete` match wins
   over any pattern; **(ii)** among patterns, **the one with MORE LITERAL SEGMENTS wins** (a more specific shape
   beats a looser one); **(iii)** **if two patterns are equally specific and BOTH match, the declaration is REFUSED
   at load — `G-9`: an AMBIGUOUS TABLE is a refusal, never a first-match-wins**, because first-match-wins would
   make the registry's meaning depend on row order, which is the `F-8` class one layer down.
3. **A CONCRETE DECLARATION BESIDE A PATTERN IS LEGAL AND MEANS A PINNED INSTANCE.** The concrete row **overrides
   the pattern for that one spelling** — **so a reserved `concrete` row sits beside a broader pattern without
   weakening either, and a concrete row may carry `reserved:true` while its sibling pattern does not.** **The
   positive control is exact: `remove(<the reserved concrete name>)` is REFUSED by name (`G-4`) while
   `remove(<a sibling instance's own name>)` succeeds under the pattern.** **(The model's OWN worked case is the
   tab-slice landing reference — `§1.7` item 5's round-3 bullet, cited at `§8`, NOT this unit's tenant.)**
4. **A MALFORMED PATTERN IS REFUSED AT LOAD (`G-10`): an empty literal segment, a wildcard slot that is the FIRST
   segment after the tier, or two adjacent wildcards.** **The positive control is exact: a well-formed two-segment
   pattern with one interior wildcard LOADS.**
5. **A DUPLICATE `concrete` name beside a pattern is refused at load** (`G-9`); **a table whose concrete row pins the
   instance LOADS.**

**Item 6 — the reserved-namespace rule.** **A CONCRETE DECLARATION WHOSE FULLY-QUALIFIED NAME COLLIDES WITH A
RESERVED KEY IN ITS OWN TIER'S NAMESPACE IS REFUSED AT LOAD with `reason:'reserved-namespace'`.** **The reserved key
set is DECLARED, not inferred, and the store ships no key of its own** — the set arrives as the caller's
`{ reservedNamespaces: readonly string[] }` factory input, **and a store that hard-codes a namespace word FAILS
`R-1`.** **The model's own worked instance of this hazard is the settings-object collision the plan records
(`NW-10`: a module id colliding with a settings key — **`reason:'reserved-namespace'`**, refused, never a silent
overwrite), and **the migration's own rule is `U-STORE-PERSIST`'s (row `G2`)**, which consumes this token from the
union this contract closes. **THE POSITIVE CONTROL: the same write to a NON-colliding name COMMITS.**

**Item 7 — the TEST-ONLY declaration fixture, and why the store does not ship its own names.** **The model's first
tenant is `U-STORE-FOCUS`, a PROPOSAL**, so **this unit's first red set runs against a declaration fixture carried
by this spec and authored in `tests/store-core.test.ts`.** **The fixture's spellings are GENERIC CALLER STYLE and
carry NO consumer noun** (`<entity>`/`<id>`/`<key>`-shaped placeholders, exactly as the architect's own example
(`leftSidebar.width`) carries none) — **so the fixture exercises `G-1`..`G-10` and `H-1`..`H-6` with their positive
controls AND KEEPS `R-1`'s scan of the store's own bytes VACUOUS OF EXEMPTIONS.** **The real tenant's names arrive
later as declaration rows; the store may not invent one** (`R-6`'s own rule: *a declared name is a declaration of the
CALLER'S spelling, not a vocabulary the store owns*). **The fixture's SUPPLIER is an explicit decision request
(`§7a.1` item 1); the working default is implemented so the red set is authorable today.**

**Item 8 — the registry's own negatives, so its `R-1` discipline is ENFORCED rather than assumed.** **The registry's
bytes carry NO consumer vocabulary**: no `tab`/`pane`/`zone`/`region`/`gutter` token **as the store's own vocabulary**,
no `is-active`/`is-empty`/`is-minimized`/`is-revealed` literal, no unit string. **The declarations are the CALLER'S
spellings carried verbatim.** **A registry that shipped `is-active` as a store-known key would be the
`SCH-10`-under-a-new-name hazard `H-r15` names, and it FAILS.** **The scan row is `R-1`, with a positive control.**

---

### 2.7 The residency trie (each tier's own, in-memory, `§0A` note 7)

**Item 1 — what it is.** **Each tier owns a trie whose nodes are path SEGMENTS and whose leaves mark RESIDENCY (a
path that tier holds a value for).** **The trie is the tier's OWN, lives in memory, and is NEVER persisted and NEVER
a tier entry.**

**Item 2 — who maintains it: THE TIER'S OWN MUTATING OPERATIONS, in the same synchronous step.** **`set`/`commit`
insert or mark a leaf; `remove`/`clear` unmark it AND PRUNE the now-empty branch; `sweep` unmarks the swept leaves
AND PRUNES.** **NO OTHER SITE MAINTAINS IT** — a trie update from the read, from a subscriber or from the wiring
FAILS `M-12`.

**Item 3 — the three properties that make it free, all rows:** **(a) NO EXTRA WRITE** — the trie is derived in-memory
bookkeeping of the tier's own table, **never a persisted value and never a tier entry**; a unit that persists it, or
that writes a second entry per `set`, FAILS. **(b) NO EXTRA PING** — **the trie's update emits NO EVENT OF ITS OWN**:
the event arms are the seven `cause` tokens, **and none of them is bookkeeping**; **a trie update that fires an event
FAILS `M-12`.** **(c) TOTALITY** — **for every reference a tier holds, every one of its ANCESTORS is present as a
node in that tier's trie, so a descendant query is answerable in time proportional to the path's segments, never by
scanning the tier.**

**Item 4 — THE TWO QUERIES, named, and their totality property.** **The trie exposes exactly TWO queries, and they
are the ONLY two:**

| # | Query | Answers | Used by |
| --- | --- | --- | --- |
| **(i)** | **`holdsExact(tier, path)`** — does THIS tier hold THIS EXACT path (a marked leaf, not a prefix)? | `boolean` | the read's **first-hit/qualified search** — **and it is the query the plan's stated totality property CANNOT distinguish from the second** (`§0A` note 7) |
| **(ii)** | **`holdsDescendantBelow(tier, path)`** — does this tier hold ANY DESCENDANT (a STRICT descendant) of this path? | `boolean` | the read's **merged arm** |

**Both are TOTAL: for every string argument — including `''`, a non-string, a path with empty segments and a path
that is a PREFIX of a held path — each answers a `boolean` and neither throws.** **`holdsDescendantBelow(P)` is
`false` whenever the tier holds `P` itself and nothing below it** — **so the two queries are not redundant, and a
row that observes one standing in for the other FAILS `M-11`.**

**Item 5 — the node-count bound and the prune rule, including what `sweep` does.** **THE BOUND: the trie's node count
never exceeds `Σ (segments per resident path)` over the tier's resident set, because SHARED ANCESTORS ARE ONE NODE**
— **the trie is a prefix structure, so two resident paths with a common prefix cost one node per shared segment, not
two.** **THE PRUNE RULE: a node is removed when it has no marked leaf in its subtree and no resident descendant;
the prune runs INSIDE the same mutating operation that unmarked the leaf.** **AND `sweep` PRUNES** — the plan states
`sweep` as *"unmarks the swept leaves"* and does not state that it prunes, **which is why the architect's own step-3
review priced it as a `CORE` register row and not as a paragraph.** **RULED HERE (`§0A` note 7): `sweep` unmarks AND
prunes, so THE TRIE RETURNS TO ITS FLOOR.** **The FLOOR is the node count of the tier's resident set at the moment of
measurement — not a literal `0`: a tier that still holds a value at the swept path's ancestor retains that
ancestor's node.** **A row that observes a trie whose node count grows by one empty branch per swept episode, while
its own table holds nothing, FAILS `M-11`.**

**Item 6 — the trie's falsifier, stated with its terms.** **After `N` writes and `M` removals on a fixed path pool,
the tier's trie reports EXACTLY the resident set the tier's own table reports — `holdsExact` and
`holdsDescendantBelow` both agree with a linear scan of the table. A trie that disagrees with its own table is a
FAILURE, not a performance note.**

---

### 2.8 The test-only reset/seed seam

**Item 1 — why it exists.** **A node suite that drives cold / shadowing / committed tier states needs per-test
isolation, and the public surface exposes NO reset, NO injection and NO per-test realm factory** — **so either the
store ships a declared test-only seam, or every register row that needs a clean tier constructs a fresh store
instance.** **RULED: THE SEAM SHIPS, DECLARED, AND IS DISABLED BY DEFAULT.**

**Item 2 — the shape, exact.**

```ts
// PRESENT ON THE STORE ONLY WHEN THE FACTORY WAS CALLED WITH `{ enableTestSeam: true }`.
// ABSENT OTHERWISE — the MEMBER KEY DOES NOT EXIST, so `'reset' in store === false`.
reset(): void          // clears all three tier tables AND all three tries to their construction floor.
                       // ALSO releases every subscription registered before the call (delivery count → 0).
                       // EMITS NO EVENT. Throws a StoreSeamError iff the seam was not enabled.
seed(rows: readonly { readonly name: string; readonly value: unknown }[]): void
                       // drives each row through the ORDINARY write path — the registry, the tier check and
                       // the caps all apply — so a row naming an undeclared name is REFUSED 'undeclared-name'
                       // and THE STORE IS LEFT UNCHANGED by that row. Rebuilds the tries. EMITS NO EVENT.
                       // Throws a StoreSeamError iff the seam was not enabled.
```

**Item 3 — the production-negative row.** **In a production build the seam MUST NOT be exposed.** **The row:
`createStore({ declarations, constraints })` — NO `enableTestSeam` — answers a store whose own key set is EXACTLY
the STORE INTERFACE's own members, and there are TEN of them (`read`, `set`, `commit`, `remove`, `clear`, `sweep`,
`subscribe`, `tiers`, `declarations`, `constraints`) with `'reset'` and `'seed'` ABSENT, and a call to
`store.reset?.()` is a no-op
(`undefined`), never a seam.** **A production build that exposes the seam FAILS `§3.5 R-10`(c).** **The seam is
additionally DECLARED IN `§5.1`'s allow-list and named in the DONE row (`§5.3` item 3), so it cannot become a live
surface by accident.**

**Item 4 — the seam's status against the register.** **The seam is NOT a register row and carries NO attempt term: it
is a TEST FACILITY whose correctness is carried by the rows that USE it** (`P-SC-TP-3`, `P-SC-TP-5`, `P-SC-TP-7`,
`P-SC-SM-1`), **each of which declares the isolation it needs.** **The two seam throws are declared, named, and
OUTSIDE the totality universal** (`§2.2` `P-4`) — **a row may assert them, and no totality row may claim they do not
exist.**

---

### 2.9 The three caps, with their values and their OVERFLOW OUTCOMES

**Item 1 — why these exist, and their status.** **The plan REQUIRES a declared cap on tier-2 collections, on tier-3
entries and on prefix/tier-wide subscriptions, and states NO value and NO overflow outcome for any of them.** **The
record's `C-7` makes pinning both this contract's obligation.** **The three values below are RECOMMENDED DERIVATIONS
and every one is architect-reversible (`§0A` note 8; `§7a.1` item 4).**

| # | The capped thing | The value | The declared OVERFLOW OUTCOME |
| --- | --- | --- | --- |
| **`CAP-1`** | **a tier-2 (`mem`) COLLECTION** — the element count of any single collection whose declaration carries a declared `collection: true` marker, counted as the number of DISTINCT leaf paths resident under one collection root | **`1024`** elements per collection | **THE WRITE IS REFUSED: `{status:'refused', reason:'cap-exceeded', name, cleared: [], repaired: [], events: 0}`.** **THE STORE IS LEFT COMPLETELY UNCHANGED and NOTHING IS CLEARED** — this is `C-3`'s non-destructive posture applied to a cap (`§2.10` item 1). **NO EVICTION, NO FIFO, NO LRU, NO SILENT DROP** — an eviction would be the store choosing which caller value to destroy, which is the second-authority class `P-13` closes |
| **`CAP-2`** | **tier-3 (`temp`) ENTRIES** — the number of resident `temp` leaf paths in the whole tier | **`4096`** entries | **Identical to `CAP-1`: refused, `reason:'cap-exceeded'`, nothing written, nothing cleared, no event.** **The plan's own tier-3 failure mode (an un-cleared entry leaking into the next episode) is answered by the cap being a REFUSAL plus the terminal sweep, never by an eviction** |
| **`CAP-3`** | **PREFIX / TIER-WIDE SUBSCRIPTIONS** — the number of live subscriptions registered with `opts.subtree === true` **plus** the number registered on a declared prefix row | **`64`** subscriptions | **THE SUBSCRIPTION IS REFUSED: `subscribe` answers `{status:'refused', reason:'cap-exceeded'}` and REGISTERS NOTHING** — **the listener is NEVER invoked, and no entry exists to unsubscribe.** **An EXACT-reference subscription is NEVER capped** (its cost is one delivery per event on one reference, which is the surface itself); **what the cap bounds is the AMPLIFIER form** — the plan's own reason: *"a listener on `temp.*` on the drag hot path is a re-render amplifier"* |

**Item 2 — the reconciliation with *"a refused write clears nothing"*, stated rather than implied.** **Every
overflow outcome above is a REFUSAL, and a refusal's declared post-state is `C-3`'s: NOTHING was written and NOTHING
was cleared.** **So an overflow can never produce a partial clear, a half-applied write or a silent eviction.** **A
body that evicts to make room, that clears a lower tier on the overflow path, or that emits an event for a refused
write, FAILS `M-13`.**

**Item 3 — the counters, and where they are read.** **`read` is UNCAPPED: a read never changes a count and can never
overflow.** **The caps are counted at the tier that holds the collection, from the TIER'S OWN TABLE (never from the
trie, whose node count is a different quantity and is bounded by `§2.7` item 5).** **A row asserts the count by
driving the store to the boundary: **the row at the cap is refused; the row one element BELOW the cap commits** —
**that pair is the positive control, and a row that asserts only the refusal FAILS `M-13`.**

---

### 2.10 The write surface — `set`, `commit`, `remove`, `clear`, `sweep`

**Item 1 — `commit` clears the same LOGICAL PATH in every lower tier, and ONLY that (`C-1`…`C-5`, `C-4-R`).**

**(a) THE RULE.** A commit to a tier-qualified name `Q.P` (tier `Q`, logical path `P`) **clears the SAME LOGICAL PATH
`P` in EVERY LOWER-DURABILITY TIER** — the tiers of `P` resident below `Q`, in the ascending-durability order the
read uses (`temp` < `mem` < `file`; `secure` is outside the rule by `R-4`). **`commit('file.p', v)` clears
`mem.p` and `temp.p` — and clears NOTHING ELSE**: a `temp.q` is untouched, **because its LOGICAL PATH differs.**
**The clear is BY LOGICAL PATH, NEVER BY SUFFIX**: `p` and `p.child` are DIFFERENT paths, and committing the former
clears the former ONLY — **the parent/child relationship is the subtree machinery's business (a merged read and an
opt-in subtree ping), NEVER a clear.** **A commit NEVER clears a HIGHER tier.** **A commit to a path no lower tier
holds clears nothing — a COMMIT THAT CLEARED NOTHING: a declared, reportable outcome (`cleared: []`), never a
refusal and never a silent no-op.**

**(b) THE ORDER, WHICH IS WHY THE FAILURE PATH IS NON-DESTRUCTIVE.** **The clear happens AFTER the higher tier
durably accepted the value, NEVER BEFORE** (`C-2`). **`file`-tier commits route through the declared `crossing`
seam and the clear happens only after the seam answers `{status:'committed'}`** (`U-STORE-PERSIST`'s channel; this
unit drives it stubbed).

**(c) A REFUSED COMMIT CLEARS NOTHING (`C-3`).** **If the higher tier answers `{status:'refused'}` — an
atomic-persist failure, a cap overflow, a malformed name, an undeclared name, a reserved name — the lower tiers KEEP
THEIR VALUES and NO EVENT IS EMITTED.** **The alternative silently destroys the working value and is the exact class
of silent data loss the landed atomic-write discipline exists to prevent.**

**(d) A COMMIT TO AN UNQUALIFIED NAME IS REFUSED** (`reason:'malformed-name'`) — **the store may not choose the tier
to write into.** **The tier check applies to every WRITE path.**

**(e) A COMMIT NEVER CLEARS RECURSIVELY.** `commit('file.p', v)` does not clear `p.child`-spelled references: **their
logical paths differ, and a suffix or prefix match is the *"second authority over the same value"* class and is
refused.**

**(f) `set` NEVER CLEARS (`§0A` note 3).** **A tier-local write shadows; it does not destroy.** **A row that observes
`set` clearing anything FAILS `M-6`.**

**Item 2 — `clear(name)`: TIER-LOCAL, NON-RECURSIVE, and ONE EVENT PER CLEARED REFERENCE (`C-5`).** **`clear` clears
ONLY the named reference at ITS OWN tier, and it does NOT clear lower tiers.** **It is NOT a commit and MUST NEVER
be reported as one — otherwise *"one commit per gesture"* becomes unfalsifiable.** **A call whose name resolves to a
declared PATTERN row clears **the single tier-local reference the caller named** — **not the pattern's matched set**
(a pattern is a declaration's shape, never an operation argument). **A `clear` on a name this tier does not hold
answers `cleared: []` and emits NO event.**

**Item 3 — `remove(name)`: FIRST-CLASS, PERSISTED, and it CLEARS DOWNWARD (`R3-6`).**

**(a) THE RULE, with its three cases:** **`remove('file.x')` clears `file.x`, THEN `mem.x`, THEN `temp.x` — the NAMED
TIER AND EVERY LESS-PERSISTENT TIER's copy of the SAME LOGICAL PATH; `remove('mem.x')` clears `mem.x` and `temp.x`;
`remove('temp.x')` clears `temp.x` ONLY.** **A removal NEVER clears a HIGHER tier, and NEVER reaches a tier its own
name does not qualify in the ascending order the read uses.**

**(b) THE RATIONALE, in the architect's own terms, because it is why the rule is ONE-WAY:** ***"closing out a
TEMPORARY override must not delete a PERSISTENT store, while removing from a PERSISTENT store must remove from a
TEMPORARY one."***

**(c) WHAT IT RESOLVES:** the as-filed tier-local-only rule left a `temp`/`mem` copy of a removed path IN PLACE, so
*"a read after the removal still hits a stale lower tier"* described the rule's own consequence and **could not be
satisfied by any body.** **Under this rule the removal's post-state is a MISS on that logical path at EVERY tier the
name reaches, and the FAIL clause becomes checkable** (`F-23`).

**(d) A REFUSED REMOVAL CLEARS NOTHING.** **An undeclared name, a malformed name, a reserved declaration's own name,
and a `secure.*` name each clear NOTHING — exactly as a refused commit clears nothing.** **A reserved name's
refusal is BY NAME, never by value, so the positive control is exact: the same call against a declared NON-reserved
name succeeds.**

**(e) THE TIER-FREE FORM.** **A `remove` call that does not name a tier is refused `reason:'malformed-name'`** — the
write side requires a tier qualifier (`C-4-R`(b)). **The record's `ambiguous-path` refusal is scoped by `§0A` note 4
and its residual narrowness is raised at `§7a.1` item 2a.** **The WILDCARD form (`file.<entity>.*`) is NOT a legal
argument** — **a pattern is a REGISTRY declaration's shape, NOT an operation argument, and the store ships no glob.**
**A close removes the affected references EXPLICITLY, one qualified name each.**

**(f) THE POST-STATE CONSTRAINT EVALUATION, AND WHY IT MAKES THE CLOSE VERB WORK IN ONE OPERATION.** **Every `remove`
EVALUATES THE CONSTRAINT TABLE ON ITS POST-STATE** (`§2.10` item 6) — **so a close's repair lands in the SAME
operation, and the as-filed *"then a later `set` activates the next entry"* is replaced by the same-operation
rule.**

**Item 4 — the `clear` and `sweep` RECEIPT MEMBER SETS (the record's `C-5` carry, pinned HERE because the plan
carries it to this contract).**

```ts
// BOTH OPERATIONS ANSWER THE SAME RECEIPT SHAPE (§2.1's StoreWriteReceipt), and this is the whole member set.
{ status: 'committed' | 'refused',
  reason?: StoreRefusalReason,        // PRESENT IFF status === 'refused'
  name: string,                       // THE CALLER'S OWN SPELLING, resolved — never a normalized form
  cleared: string[],                  // FULLY-QUALIFIED references, ORDERED BY TIER then by the tier's own
                                      // insertion order; EMPTY is legal and DECLARED
  repaired: string[],                 // FULLY-QUALIFIED references a repair WROTE; EMPTY on a non-repairing call
  events: number }                    // the COUNT of events this operation emitted (the row's own reading)
```

**THE FOUR PLACEMENT RULES THIS SHAPE CARRIES, each a row:**

1. **`cleared[]` and `repaired[]` ARE THE SAME MEMBER NAMES ON EVERY MUTATOR** — **the receipt's member set is
   GENERIC, not per-operation**; a second, operation-specific receipt type FAILS `R-13`.
2. **`events` IS THE OPERATION'S OWN COUNT**, and **it is asserted AGAINST the subscribers' delivery record** — so a
   body cannot pass by counting only one of the two readings (`F-11`'s own shape, the sink's-record-vs-counter
   divergence, applied here).
3. **`status:'refused'` IMPLIES `cleared: []` AND `events: 0`** — **an empty-because-nothing-happened receipt is
   distinguishable from an empty-because-nothing-was-cleared one ONLY by `status`,** which is why both members are
   always present.
4. **A REFUSAL IS A RECORD, NEVER A THROW AND NEVER A SILENT NO-OP** (`§2.2` `P-4`; the landed discipline *"a refusal
   is a recorded reading, never a silent no-op"*).

**Item 5 — a repair is subject to `C-1`..`C-3`.** **A repair's own write clears the repaired reference's lower
copies by logical path, and clears NOTHING if the higher tier refused.** **A repair may not be refused by the
constraint it satisfies.**

**Item 6 — the EVALUATION POINTS, exhaustive.** **`set`, `commit` and `remove` each evaluate the constraint table on
their POST-STATE.** **`clear` and `sweep` DO NOT evaluate it** — they remove references rather than write them, and
the plan's own evaluation set is *"every write **and** `remove`"*. **A row that observes a constraint evaluated on a
`clear` FAILS `M-14`; a row that observes a `remove` SKIPPING the evaluation FAILS `M-14`.**

**Item 7 — the table is `R-1`-CLEAN.** **No row, id or repair action spells a consumer token as the STORE's
vocabulary beyond the declared constraint id** — **the id is a declaration key, not a mechanism word**, and the
`P-CT-1`/`H-r15` scan binds the table's bytes.

**Item 8 — a multi-reference operation is ONE committed write (`R3-5`), and this unit does not implement it.** **The
plan's `Y-2` reference-set crossing and its one-receipt-row-per-reference shape belong to `U-STORE-PERSIST`; this
unit's `commit`/`remove` are ONE-NAME operations.** **What this unit owes is the CONSTRAINT half: when a single
call's post-state is evaluated, it is evaluated over THAT CALL's post-state, and a future multi-reference form
evaluates over the WHOLE SET in one committed write.** **A body that crossed once per reference FAILS `R-8`'s
statement of this row.**

**Item 9 — the constraint table declares EXACTLY ONE row today, and its shape is the CONTRACT (`§0A` note 10).**

| Constraint id | kind | Evaluated on | Repair action | Refusal reason |
| --- | --- | --- | --- | --- |
| **`count-exactly-one`** (the model's own row id is the architect's; a caller may declare its own id, and the KIND is what this contract pins) | **`count-exactly-one`** over the MATCHED SET of a pattern row's instances | **EVERY WRITE (`set`/`commit`) AND EVERY `remove`** | **REPAIR IN THE SAME COMMITTED WRITE:** `0` active → **the NEXT surviving entry by the caller's own order, WRAPPING to the first**; `≥2` active → **deactivate every active entry except the REFERENT** | **`null` — THIS CONSTRAINT NEVER REFUSES** |

**A declaration table or constraint table carrying TWO distinct constraint ids where neither declares an interaction
rule does not load** (`reason:'malformed-pattern'`; `NW-8`(c): *"a repair that itself violates a SECOND constraint is
the cascading case"*). **A constraint row whose `refusalReason` is non-null MUST name a token from the closed
union — and the store's refusal vocabulary for constraints stays kind/size-free (names, tiers and caps only).**

---

### 2.11 The event surface — the envelope, the seven arms, and the delivery rules

**Item 1 — the envelope, exact: `{name, tier, value, cleared[], cause}`.** **`name`** is the reference's spelling
**the caller used** (a tier-free logical path for an unqualified event, the qualified spelling for a qualified one) ·
**`tier`** is **the tier that FIRED** (the tier whose own `set`/`commit`/`remove`/`repair`/`sweep` produced the event;
**for a `descendant` event, the tier that holds the WRITTEN path**) · **`value`** is the stored value **on the arms
that carry one, and `undefined` on the arms that do not — `value` is present as a KEY on every arm, so a listener can
destructure it** · **`cleared[]`** is the array of fully-qualified references this event cleared — **EMPTY, never
omitted, on an arm that cleared nothing** · **`cause`** is **one of exactly seven tokens.**

**Item 2 — THE SEVEN-ROW ARM TABLE IS THE TOTAL MEMBER-SET STATEMENT, and the envelope sentence is an
OVER-DESCRIPTION.** **The `descendant` arm requires `origin` and `subtree:true`** (the table's own last row), **so
the sentence *"one shape, all arms"* is read as the ENVELOPE's five common members and NOT as a licence to omit
`origin` or to add it elsewhere.** **`origin` is required on the `descendant` arm ALONE, and a listener that
destructures "the envelope" is total only over the arm table's per-arm key sets.** **A contract that requires
`origin` on every arm — or that reads the sentence as licensing its absence on the `descendant` arm — FAILS `M-15`.**

**`✓` = REQUIRED AND NON-EMPTY IN SUBSTANCE; `—` = REQUIRED AS A KEY, EMPTY/`undefined` IN SUBSTANCE.**

| `cause` | `name` | `tier` | `value` | `cleared[]` | `origin` | What the arm MEANS, and what it must NOT be read as |
| --- | --- | --- | --- | --- | --- | --- |
| **`'set'`** | ✓ (the written reference) | ✓ (the tier written) | ✓ (the new value) | — (empty; **a `set` clears nothing** — the clear rule is a COMMIT's) | — | **An equal-value write fires NOTHING** (the landed `===` on the stored value stands; the store ships **no comparator parameter**). **A `set` is NOT a commit and must never be counted as one** |
| **`'commit'`** | ✓ | ✓ (the higher tier that accepted) | ✓ (the committed value) | **✓ — the references cleared by the logical-path rule (POSSIBLY EMPTY; an empty array is the declared *"cleared nothing"* outcome, not an omission)** | — | **Emitted AFTER the higher tier durably accepted and AFTER the clears.** **`cleared[]` ON THIS ARM IS THE AUDIT LIST** — it is **not** the channel by which a cleared reference's OWN subscriber learns (`M-15`) |
| **`'clear'`** | ✓ (the reference cleared) | ✓ (the tier it was cleared from) | — | — | — | **One event per cleared reference.** **A bare `clear` clears ONLY the named reference; it is NOT recursive and does NOT clear lower tiers.** **A CLEARED LOWER REFERENCE FIRES ITS OWN `cause:'clear'` EVENT ON ITS OWN PATH** — so a commit emits **one event per AFFECTED reference**, and *"no second clear-event"* is read NARROWLY: **there is no second event FOR THE COMMITTED REFERENCE**, and a DIFFERENT reference's clear event is not a second event for the same reference |
| **`'sweep'`** | ✓ (each swept reference, ONE EVENT EACH) | ✓ | — | — | — | **A SWEEP OF `N` ENTRIES EMITS `N` EVENTS — one per reference — and NEVER one event carrying a list.** The sweep's own receipt is the aggregate, and *"one commit per gesture"* stays countable because **a sweep is never reported as a commit** |
| **`'remove'`** | ✓ (the removed reference) | ✓ (the tier it was removed from) | **— (NO value: a removal has no value to carry)** | ✓ (the references the removal cleared; empty is legal and declared) | — | **A `remove` is distinguishable from a `commit`-with-clears BY ITS `cause` TOKEN AND BY `value: undefined` — never by a count** |
| **`'repair'`** | ✓ (the reference the repair WROTE) | ✓ | ✓ (the repaired value the store wrote) | ✓ (whatever the repair's own write cleared) | — | **A REPAIR EMITS ITS OWN EVENT** — **the repair is a write the caller did not ask for, so a repair that lands WITHOUT its own event is a silent second write.** **The violating caller's own write ALSO emits its event**, so a repairing operation is countable as *"one event for the caller's reference + one per repaired reference"* |
| **`'descendant'`** | ✓ (**the ANCESTOR the subscriber opted in on**) | ✓ (the tier holding the WRITTEN path) | **— (NO value — the event forces a re-read, which is the whole point)** | — | **✓ — REQUIRED HERE ALONE** (`origin:<the written path>`, fully qualified) | **Ancestors fire ONLY for subscribers that opted in with `{subtree: true}`; an ancestor with no opt-in subscriber fires NOTHING.** **The `subtree:true` marker is on this arm alone** |

**Item 3 — the subscription surface.** `subscribe(name, listener, opts?) → StoreSubscription`. **`opts.subtree` is
OPTIONAL and DEFAULTS TO `false`.** **A prefix/tier-wide subscription is admitted ONLY as a bounded,
explicitly-declared form and is REFUSED past `CAP-3`** (`§2.9`). **A NON-CALLABLE listener is refused
`reason:'malformed-name'` and registers NOTHING.** **A `secure.*` name is refused `reason:'secure-refused'` BEFORE
the registry is consulted. An undeclared name is refused `reason:'undeclared-name'`.** **`unsubscribe()` answers
`true` the first time and `false` on every later call — never a throw.**

**Item 4 — a write pings EXACTLY ITS OWN PATH; ANCESTORS FIRE ONLY FOR OPT-IN SUBSCRIBERS. Four rows:** **(a) THE
DEFAULT IS PATH-EXACT** — a subscriber on `p` is **NOT** notified by a write to `p.child` unless it registered with
`{subtree:true}`. **(b) THE OPT-IN IS PER SUBSCRIPTION, NOT PER REFERENCE** — the same reference may carry one
exact subscriber and one subtree subscriber, and **only the latter fires on a descendant write.** **(c) THE
`descendant` EVENT CARRIES NO VALUE** — the reason is the model's own: **a merged read needs a re-read, and a cached
value in the event would be the pre-write value the subscriber must not trust.** **(d) `origin` IS THE WRITTEN
PATH, FULLY QUALIFIED (tier included)** — so a subscriber learns WHICH descendant changed and WHICH tier holds it,
and can address that path directly. **CONSEQUENCE, and it is the architect's own point: A WRITE TO A DESCENDANT
NEVER WRITES, CLEARS OR PINGS A PERSISTENT ANCESTOR** — the ancestor's bytes are untouched and its own
non-opted subscribers hear nothing.

**Item 5 — the delivery rules, and the realm scope (`S-RH-1`).** **A store subscription is PER REALM, PER REFERENCE:
ONE subscription, for as long as the realm lives, on ONE declared reference.** **So a graph re-derivation does NOT
create, destroy or duplicate a store subscription** — **the SAME subscription still observes the SAME reference, and
the count after `N` generations stays `1` per subscribed reference.** **A body that re-registers per generation
FAILS `M-18`.** **THE REALM-SCOPED RELEASE DUTY: the store releases its OWN subscriptions when the realm dies**
(`§6.5`'s `U-STORE-CORE` clause (h)); **`reset()` also releases them (`§2.8` item 2).** **A row that observes a
subscription surviving its realm FAILS `M-18`.**

**Item 6 — the listener's own discipline, pinned because the architect's example assumes it.** **A listener may
read, may drive the consumer's presentation channel, and MAY NOT dispatch a graph mutation on the hot path.** **The
store never writes the graph** (`P-7`), **and the architect's sentence *"the zone render iterates the contained
panes … ghost the preview"* is the one hop of their example that is IMPOSSIBLE in this repo as stated** — **that hop
belongs to the consumer's own wiring, not to this store.** **A LISTENER THAT THROWS DOES NOT PROPAGATE TO THE
MUTATOR'S CALLER: the store catches it, continues the fan-out in registration order, and the operation's receipt is
UNCHANGED by the throw.** **A store that let a listener's throw escape FAILS `M-18`.**

**Item 7 — the fan-out order and the count.** **The fan-out is STORE → SUBSCRIBERS, in REGISTRATION ORDER, and the
event's `events` count on the receipt is the number of EVENTS EMITTED — not the number of listeners invoked.**
**One event to three listeners is `events: 1` and three deliveries** — **so the two readings (the receipt's `events`
and the listeners' own delivery record) are DISTINCT BY DESIGN, and a row asserts BOTH.**

---

### 2.12 The construction and the realm (stated once, so no pass infers it)

**Item 1 — who creates the store, when, and what a second creation does.** **The renderer's wiring creates EXACTLY
ONE store per realm**, in the realm's boot step, **BEFORE the `Y-1` hand-off and before the first graph load** (the
plan's `§2.5` boot order). **The store is held in the wiring's own closure or a realm-scope binding OWNED BY THE
WIRING — never in a module-level binding inside `src/renderer/store-core.ts`.** **`createStore` itself is TOTAL and
NEVER refuses construction** — **so a second creation is caught by the ROW that counts constructions in a realm
(`§3.5 R-10`(b)), not by a silent second authority.** **What a second store would do if one landed: two tables,
two tries, two subscriber sets, and a `read` that answers from whichever instance the caller holds — which is
precisely the dual-authority class `P-13` and the landed one-authority rules close.**

**Item 2 — the realm's three tiers are in-realm, and the `file` tier's `[H]` half is NOT this unit's.** **Tiers
`temp`/`mem`/`file` are all renderer-realm** (the plan's `§2.5` revision), **which is what makes `read` a
synchronous, zero-crossing function and `cache` a legal live reference.** **The tier-1 CHANNEL — the boot hand-off,
the commit crossing, the atomic write, the `fsync`, the corrupt-at-read-back recovery and the `Y-3` push — is
`U-STORE-PERSIST`'s (row `G2`).** **This unit declares the crossing as an INJECTED, STUBBED seam (`§2.2` `P-9`) and
asserts NOTHING about the channel's order, idempotency or failure recovery.**

**Item 3 — `clear` and `sweep` are tier-local by construction and this unit's `sweep` is the EPISODE TERMINAL's
operation.** **`sweep(name)` unmarks and clears the swept tier's entries under the named declaration and emits ONE
EVENT PER SWEPT REFERENCE.** **The drag episode's terminal sweep is `U-STORE-DRAG`'s USE of this operation, not this
unit's flow.** **A store `sweep` reported as a commit FAILS `M-7`.**

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The unqualified read answers the FIRST hit, in ascending durability** | a declaration for `p`; `p` resident in `file`, `mem` and `temp` | `read('p')` answers **`tier:'temp'`** with **`temp`'s own value**; **no other tier was consulted after the hit** (the store's own read counter, if a row reads one, is `1` tier visited beyond the first) | `§2.5` items 1/2, `§0` ruling 2, `R-3` | `[T]` |
| **M-2** | **`cache` IS the tier's own handle, by identity** | `read('p')` with `p` resident in `mem` | `result.cache === store.tiers.mem` (`toBe`), `result.tier === 'mem'`, and **the same handle answers its own `get('p')` with the same value** | `§2.1`, `§2.4` item 1, `P-5`, `R-7` | `[T]` |
| **M-3** | **A tier-qualified read addresses ONE tier and does NOT fall through** | `p` resident in `file` only; `read('mem.p')` | **`{found:false, value:undefined, tier:null, cache:null, name:'mem.p'}`** — a MISS, **not** the `file` value; and `read('file.p')` HITS with `tier:'file'` | `§2.5` item 2, `§0` ruling 8, `R-4` | `[T]` |
| **M-4** | **The declared miss, on every surface** | a declared name no tier holds | `read` ⇒ `{found:false, value:undefined, tier:null, cache:null, name}` · each tier's `get` ⇒ `{found:false, value:undefined, name}` · each tier's `has` ⇒ `false` | `§2.4` item 3, `§2.5` item 1(e), `P-2`, `M-4`'s own row | `[T]` |
| **M-5** | **The MERGED arm, with `parts` naming the tier's own path** | no tier holds `p`; `file` holds `p.child` and `temp` holds `p.child` | `read('p')` ⇒ `{found:true, value:<the composite>, tier:null, cache:null, name:'p', merged:true, parts:[{tier:'file',path:'p.child'},{tier:'temp',path:'p.child'}]}` — **ordered by overlay order, every `path` a HELD path, no entry equal to `'p'`** | `§2.5` item 5, `§0` ruling 9, `R-13` | `[T]` |
| **M-6** | **`set` NEVER clears, and a `commit` clears the same logical path in every lower tier** | `set('mem.p', 1)` with `file.p` and `temp.p` resident; then `commit('file.p', 2)` | the `set`'s receipt reads **`cleared: []`** and **`file.p` still reads `1`**; the `commit`'s receipt reads **`cleared` containing the `mem` and `temp` spellings of `p`, in that tier order**, and `read('p')` then answers **`tier:'file'`** | `§2.10` items 1/2, `§0A` note 3, `R-3` | `[T]` |
| **M-7** | **A sweep of N entries emits N events, and is never reported as a commit** | three declared `temp` references resident; one `sweep` over their common declaration | **`events === 3`**, the receipt's `cleared` names **three** references, **each with its own `cause:'sweep'` event and NO value**, and the terminal sweep leaves **`temp`'s entry count at its floor** | `§2.11` item 2 (`'sweep'` row), `R-2`, `M-7`'s own row | `[T]` |
| **M-8** | **A `set` that writes an EQUAL value fires nothing** | `set('mem.p', <the same primitive>)` twice | the **second** call's receipt reads **`events: 0`** and the subscriber's delivery record gains **nothing**; **the tier's value is unchanged** | `§2.11` item 2 (`'set'` row), `R-3`, `M-8`'s own row | `[T]` |
| **M-9** | **`undefined` is a legal value, distinct from a miss, and not a third state** | `set('mem.p', undefined)`, then `read('p')`, `tiers.mem.get('p')`, `tiers.mem.has('p')` | **`{found:true, value:undefined, tier:'mem'}`** · `{found:true, value:undefined, name:'p'}` · **`has === true`** — and after `remove('mem.p')`, **`found:false`** | `§2.2` `P-3`, `I-5`, `M-9`'s own row | `[T]` |
| **M-10** | **A concrete declaration pinning an instance beside a broader pattern: the pinned instance is refused for removal, its siblings are not** | a `concrete` row with `reserved:true` beside a pattern row matching its siblings | `remove(<the reserved name>)` ⇒ **`{status:'refused', reason:'reserved-name'}`**; `remove(<a sibling instance's own name>)` ⇒ **`{status:'committed'}`** | `§2.6` item 5 row 3, `F-14`, `R-5` | `[T]` |
| **M-11** | **The trie answers BOTH queries, agrees with its own table, and returns to its floor after a sweep** | the declared fixture's path pool; `N` writes then `M` removals; then a sweep of the tier | `holdsExact` and `holdsDescendantBelow` **agree with a linear scan of the tier's table after every step**; `holdsDescendantBelow('p')` is **`false`** while `p` is resident with no resident child, and **`true`** once `p.child` lands; **after the sweep the node count equals the resident set's own segment total** | `§2.7` items 4/5/6, `R-14`, `M-11`'s own row | `[T]` |
| **M-12** | **The trie is maintained INSIDE the tier's own mutators, writes nothing and pings nobody** | a `set`, a `commit`, a `remove`, a `clear` and a `sweep` each driven while the subscribers' record is read | **the trie's state changes in the SAME synchronous step** for each; **NO event carries a bookkeeping cause** (the seven `cause` tokens are the whole set); **the tier's own entry count changed by exactly what the operation declares** | `§2.7` items 2/3, `R-14`, `M-12`'s own row | `[T]` |
| **M-13** | **The caps refuse without a partial clear, and one element below the cap commits** | `CAP-1`/`CAP-2`/`CAP-3` each driven to the boundary and one below it | **at the cap: `{status:'refused', reason:'cap-exceeded'}`, `cleared: []`, `events: 0`, and the store's own table BYTE-IDENTICAL to its pre-call state**; **one below: `{status:'committed'}`** — the positive control | `§2.9` items 1/2, `R-6`, `M-13`'s own row | `[T]` |
| **M-14** | **The constraint is evaluated on the post-state of `set`/`commit`/`remove`, and NOT on `clear`/`sweep`** | a declared `count-exactly-one` constraint; a violating write; then a `clear` and a `sweep` that leave the same violation | the write is **repaired in the SAME committed write** and its receipt carries `repaired:[…]`; the **`clear` and `sweep` receipts carry `repaired: []`** | `§2.10` items 6/9, `R-15`, `M-14`'s own row | `[T]` |
| **M-15** | **The `descendant` arm carries `origin` and `subtree:true` and NO value; the six other arms do NOT carry `origin`** | an exact subscriber and a `{subtree:true}` subscriber on `p`, then a write to `p.child` | the exact subscriber's record gains **nothing**; the subtree subscriber receives **exactly one** event with **`cause:'descendant'`**, **`origin` equal to the fully-qualified written path**, **`subtree:true`**, and **`value === undefined` (KEY PRESENT)** | `§2.11` items 2/4, `R-13`, `M-15`'s own row | `[T]` |
| **M-16** | **The `remove`'s post-state is a MISS at every tier the name reaches** | `set('mem.p', 1)`, `set('temp.p', 2)`, `set('file.p', 3)`, then `remove('file.p')` | the receipt's `cleared` names **three** references in **`file` → `mem` → `temp`** order; `read('p')` ⇒ **`{found:false}`**; each tier's `has('p')` ⇒ **`false`** | `§2.10` item 3, `F-23`, `R-3` | `[T]` |
| **M-17** | **`remove('temp.p')` reaches `temp` ONLY, and `remove` never clears UPWARD** | `set('file.p', 3)`, `set('mem.p', 1)`, `set('temp.p', 2)`, then `remove('temp.p')` | the receipt's `cleared` names **the `temp` reference only**; `read('p')` still answers **`tier:'mem'`**; **`file.p` and `mem.p` are untouched** | `§2.10` item 3(a), `R-3`, `M-17`'s own row | `[T]` |
| **M-18** | **A subscription is per realm per reference, survives a re-derivation, receives one delivery per matching event, and is released by `reset()`; a throwing listener does not propagate** | one subscription on `p`; `N` simulated generations; a matching write; a throw from the listener; then `reset()` | the subscription count stays **`1`**; **exactly one delivery** per matching event; the throwing listener's throw **does not reach the mutator's caller** and the receipt is unchanged; after `reset()` the count reads **`0`** | `§2.11` items 5/6, `R-16`, `M-18`'s own row | `[T]` |
| **M-19** | **The store ships NO consumer vocabulary in its own bytes** | the module's raw bytes, scanned for the mirror-class literals and the consumer nouns as STORE vocabulary | **zero hits**, with the positive control that a fixture byte string carrying one **FAILS** the same scan (the scan's own `§4.4 S-7` evasion class covered) | `§2.2` `P-1`, `R-1`, `M-19`'s own row | `[T]` |
| **M-20** | **A reserved `concrete` declaration loads, its siblings match the pattern, and a malformed or ambiguous table does NOT load** | (a) the fixture table; (b) two equally-specific matching patterns; (c) a pattern with a leading wildcard | (a) **LOADS** and its pinned instance's `reserved` refusals by name hold (`M-10`); (b) **FAILS TO LOAD** with `reason:'malformed-pattern'`; (c) **FAILS TO LOAD** with `reason:'malformed-pattern'` | `§2.6` item 5, `R-5`, `M-20`'s own row | `[T]` |

### 3.2 Documented fail-states / non-happy states

**NOTE the shape: every outcome in this block is a RETURNED RECORD, not an error** — **the only two throw classes in
the whole unit are `§2.8`'s seam throws and `createStore`'s LOAD REFUSAL** (`§2.2` `P-4`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **`secure.*` is refused BEFORE the registry is consulted** | `read('secure.<k>')`, `read('secure.undeclared')`, `subscribe('secure.<k>', fn)`, `remove('secure.<k>')`, `clear('secure.<k>')`, `set('secure.<k>', v)`, `commit('secure.<k>', v)` — **each on a name that is NOT declared** | **every one answers `{status:'refused', reason:'secure-refused'}`** — **NEVER `'undeclared-name'`**, even though no row declares it; **the registry was not consulted** (the positive control: **the SAME names without the `secure` segment answer `'undeclared-name'`**) | `§2.5` item 1(a), `§2.6` item 4, `R-4`, `F-1`'s own row | `[T]` |
| **F-2** | **The tier's OWN `get` on a `secure.*` name works, while the generic surface refuses — so the refusal is BY NAME, not a blanket denial** | a declaration whose tier is `secure`; `store.tiers.secure.get(<the name>)` versus `store.read(<the same name>)` | the tier's own `get` answers **the tier's record** (`{found:true,…}` or the declared miss) — **and the generic `read` on the SAME name answers `{status:'refused', reason:'secure-refused'}`** | `§2.6` items 3/4, `§3.4 R-4`, `F-2`'s own row | `[T]` |
| **F-3** | **A REFUSED commit clears NOTHING and emits NOTHING** | `file.p` resident, `mem.p` and `temp.p` resident; a `commit('file.p', v)` whose **stubbed crossing seam answers `{status:'refused'}`** | the receipt reads **`{status:'refused', cleared: [], events: 0}`**; **`mem.p` and `temp.p` STILL READ their own values**; **no subscriber received any event**; `file`'s own table is unchanged | `§2.10` item 1(c), `§0` ruling 3, `R-3`, `F-3`'s own row | `[T]` |
| **F-4** | **A refused `remove` clears nothing** | `remove()` on (a) an undeclared name, (b) a malformed name, (c) a `reserved:true` declaration's own name, (d) a `secure.*` name — with lower-tier copies resident in every case | **every one answers `{status:'refused', cleared: [], events: 0}`** with its own reason token; **(a) `'undeclared-name'` · (b) `'malformed-name'` · (c) `'reserved-name'` · (d) `'secure-refused'`**; **every resident copy in every tier STILL READS** | `§2.10` item 3(d), `R-3`, `F-4`'s own row | `[T]` |
| **F-5** | **A `clear` does NOT clear lower tiers and is NOT recursive** | `mem.p` and `temp.p` resident; `clear('mem.p')` | the receipt's `cleared` names **the `mem` reference only**; **`temp.p` still reads**; **one** `cause:'clear'` event on `mem.p` and **none** on `temp.p` | `§2.10` item 2, `R-3`, `F-5`'s own row | `[T]` |
| **F-6** | **The first-hit arm WINS over the merged arm when a tier holds the read path and another holds a descendant** | `file.p` resident; `temp.p.child` resident; `read('p')` | **`{found:true, tier:'file', cache:<file's handle>, name:'p'}` with `parts` ABSENT and `merged` ABSENT** — **no merge runs**; and a body answering `merged:true` with a `parts` list FAILS | `§2.5` item 6, `R-13`, `F-6`'s own row | `[T]` |
| **F-7** | **A malformed name is refused, and the four legal tokens are the positive control** | `''`, a non-string, `'file..x'`, `'file.'`, `'File.x'`, `'disk.x'`, `'.x'`, `'file'` | **all refused `reason:'malformed-name'`** — **never a throw**; **each of the four legal tier tokens on a declared name LOADS/COMMITS** | `§2.3` items 1/2, `§2.6` item 3, `R-4`, `F-7`'s own row | `[T]` |
| **F-8** | **A tier-free write is refused** | `set('p', v)`, `commit('p', v)`, `remove('p')` | **all three refused `reason:'malformed-name'`** — **the store may not choose a tier to write into** (a `read` on the same spelling is legal, because the READ has a search order and the WRITE has none) | `§2.10` item 1(d), `C-4-R`(b), `R-4`, `F-8`'s own row | `[T]` |
| **F-9** | **An undeclared name is a TYPED REFUSAL on every surface, and the declared-but-unwritten name is a MISS** | (a) `read`/`subscribe`/`get`/`has` on a name no row declares; (b) the same four on a declared name no tier holds | (a) **`{status:'refused', reason:'undeclared-name'}` on the READ side** and **the refusal record on `get`; `has` is NOT a boolean-`false`** — **the two states are distinguishable by their own positive controls**; (b) **the DECLARED MISS and `has → false`** | `§2.4` item 2(d)/(f), `§2.6` item 3 (`H-1`/`H-2`/`H-5`), `R-4`, `F-9`'s own row | `[T]` |
| **F-10** | **A name declared with a WRONG tier segment is refused** | a row declaring `tier:'mem'` for a name whose first segment is `file` | **the write is refused `reason:'undeclared-name'`** (the name is not declared FOR THE TIER IT NAMES) — **and the positive control (a matching pair) COMMITS to the declared tier and to NO other tier** | `§2.6` item 3 (`G-3`), `R-5`, `F-10`'s own row | `[T]` |
| **F-11** | **A name declared TWICE is refused at LOAD** | a table with two `concrete` rows carrying the same `name` | **the table does NOT load** (`reason:'undeclared-name'` on the doubling row's own class — the doubled name has no declaration that loads); **the positive control: a table with each name once LOADS** | `§2.6` item 5 row 5 (`G-2`), `R-5`, `F-11`'s own row | `[T]` |
| **F-12** | **A duplicate `concrete` name beside a pattern does not load, and a pinned instance does** | (a) a `concrete` name also matched by an equally-specific sibling `concrete`; (b) a `concrete` name pinning one instance of a broader pattern | (a) **the table does NOT load** (`reason:'malformed-pattern'`, the `G-9' class); (b) **the table LOADS and the pinned instance behaves as `M-10` declares** | `§2.6` item 5 rows 3/5 (`G-9`), `R-5`, `F-12`'s own row | `[T]` |
| **F-13** | **A malformed pattern is refused at LOAD** | (a) a pattern with an empty literal segment; (b) a pattern whose FIRST segment after the tier is a wildcard; (c) two adjacent wildcards | **all three do NOT load** (`reason:'malformed-pattern'`); **the positive control (`['<entity>','<id>','<key>']`, one interior wildcard pair with literals between) LOADS** | `§2.6` item 5 row 4 (`G-10`), `R-5`, `F-13`'s own row | `[T]` |
| **F-14** | **A reserved declaration's own name is refused for removal, BY NAME** | `remove(<the reserved concrete name>)` | **`{status:'refused', reason:'reserved-name'}`** — **the refusal is by NAME and never by value**, so **the positive control (a declared NON-reserved name) removes and persists its own tier's removal** | `§2.6` item 3 (`G-4`), `R-5`, `F-14`'s own row | `[T]` |
| **F-15** | **A concrete declaration colliding with a reserved namespace key is refused at LOAD** | a table declaring a name whose fully-qualified spelling collides with a member of the caller-supplied reserved-namespace set for its tier | **the table does NOT load** (`reason:'reserved-namespace'`); **the positive control: the same write to a NON-colliding name COMMITS** — **the model's worked instance is the settings-object collision the plan records (`NW-10`), and the migration's own rule is `U-STORE-PERSIST`'s** | `§2.6` item 6, `R-5`, `F-15`'s own row | `[T]` |
| **F-16** | **A pattern is NOT an operation argument** | `remove('file.<entity>.*')` and `clear('file.<entity>.*')` | **both refused `reason:'malformed-name'`** — **a pattern is a REGISTRY declaration's shape, never an operation argument, and the store ships no glob** | `§2.10` item 3(e), `R-4`, `F-16`'s own row | `[T]` |
| **F-17** | **A second constraint with no interaction rule does not load** | a table carrying two distinct constraint ids where neither declares an interaction rule | **the table does NOT load** (`reason:'malformed-pattern'`) — the `NW-8`(c) cascading rule, made mechanical; **the positive control: the one-row table LOADS** | `§2.10` item 9, `§0A` note 10, `R-15`, `F-17`'s own row | `[T]` |
| **F-18** | **A cap's overflow refuses, and NEVER evicts, clears or emits** | each cap driven one element past its value, with lower-tier copies resident | **`{status:'refused', reason:'cap-exceeded', cleared: [], events: 0}`**; **the store's tables are byte-identical to their pre-call state** (an eviction, a FIFO/LRU drop, a lower-tier clear or any event on this path FAILS) | `§2.9` items 1/2, `R-6`, `F-18`'s own row | `[T]` |
| **F-19** | **A zero-active violation is REPAIRED by the NEXT SURVIVING entry, WRAPPING to the first** | `order = [A,B,C]`, `B` the sole active entry, `B` closed; then `order = [A,B,C]`, `C` active, `C` closed | the first repair activates **`C`**; the second **WRAPS** and activates **`A`** — and **the repair consults NOTHING but the caller's own order** (no insertion time, no tie-break, no store preference) | `§2.10` item 9, `§0` ruling 12, `R-15`, `F-19`'s own row | `[T]` |
| **F-20** | **A `≥2`-active violation is repaired by deactivating every other active entry, and the REFERENT is exact** | (a) a write activating a second entry while one is already active; (b) a `remove`-triggered evaluation with two active entries | (a) **every active entry except the caller's own written one is deactivated**; (b) **the referent is THE REMOVED ENTRY'S OWN INDEX — the surviving entry at that index is the *"next surviving"* candidate, and the WRAP applies when that index is no longer present** | `§2.10` item 9, `§0` ruling 12, `R-15`, `F-20`'s own row | `[T]` |
| **F-21** | **A repair is evaluated on the `remove`'s post-state, in the SAME operation** | a close that removes an active entry and, via the zero-active arm, must activate another | **ONE operation**: the receipt carries both the removal and the repair; **there is no window in which the post-state violates the constraint**, and a body that leaves the repair to a LATER `set` FAILS | `§2.10` items 3(f)/9, `R-15`, `F-21`'s own row | `[T]` |
| **F-22** | **A repair emits its OWN event, and the violating caller's write still emits its own** | a violating write that triggers a repair, with subscribers on both the caller's reference and the repaired reference | the caller's reference receives **one event with its own `cause`**; the repaired reference receives **one event with `cause:'repair'` carrying the repaired VALUE**; **an unreported repair FAILS**; the receipt's `repaired` names the repaired reference | `§2.11` item 2 (`'repair'` row), `§2.10` item 5, `R-15`, `F-22`'s own row | `[T]` |
| **F-23** | **A refusal clears nothing, on EVERY mutator** | (a) `set`/`commit` with an undeclared name; (b) `set`/`commit` with a cap overflow; (c) `set`/`commit` with a reserved name; (d) the same three through the tier-local handle's `set` | **all refusals carry `cleared: []` and `events: 0`** and **every resident lower-tier copy STILL READS** — the non-destructive posture applied to all five mutators | `§2.10` items 1(c)/3(d), `R-3`, `F-23`'s own row | `[T]` |
| **F-24** | **`set(name, undefined)` is NOT a deletion and there is no third state** | `set('mem.p', undefined)` then `remove('mem.p')` | before the removal: **`found:true` with `value:undefined`**; after: **`found:false`** — **there is NO `removed` state, no `{removed:true}`, and a body that reports one FAILS** | `§2.2` `P-3`, `R-13`, `F-24`'s own row | `[T]` |
| **F-25** | **The totality universal: NOTHING throws on a declared-domain input** | every API member driven with: `undefined`, `null`, `42`, `'x'`, a `Symbol`, a `BigInt`, a `Proxy` whose traps throw, a record with throwing accessors, an array, a function, and (for the listener slot) a non-callable | **every member answers its declared shape and nothing throws** — **the ONLY throws are `createStore`'s LOAD REFUSAL and the two `§2.8` seam throws**, and **each of those three is asserted separately in the same row** | `§2.2` `P-4`, `R-6`, `F-25`'s own row | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant |
| --- | --- |
| **I-1** | **The store imports NOTHING but its own declaration module, and its own declaration module's ROW TYPE at that** — no `provident-ssr`, no `electron`, no `node:*`, no `src/main/**`, no `src/shared/**`, no sibling mechanism (`R-11`). |
| **I-2** | **No member throws on any declared-domain argument**; the three named throws are the whole exception set (`P-4`). |
| **I-3** | **The store owns NO vocabulary**: no consumer noun as store vocabulary, no `is-*` literal, no unit string, no default, no policy predicate (`P-1`, `P-2`). |
| **I-4** | **A miss INVENTS NOTHING** — the declared miss shape, on every surface (`P-2`, `R-3`). |
| **I-5** | **`undefined` is a VALUE, not a state**: `found:true` with `value:undefined` is reachable and distinct from `found:false` (`P-3`). |
| **I-6** | **`cache` is never serialized, cloned or copied** — it is the tier handle by identity, and no row may claim it crossed a boundary (`P-5`). |
| **I-7** | **No arithmetic, no comparator, no clamp, no size** — the store computes no distance, no ratio, no count-exactly-one comparison beyond `===` on a caller value's own identity (`P-6`). *(`count-exactly-one` counts occurrences of a caller value by `===`; it is a COUNT, not a comparator seam, and it ships no `equals` parameter.)* |
| **I-8** | **The store never writes the graph** — it calls listeners and nothing else (`P-7`). |
| **I-9** | **The store owns no file, no path, no channel and no byte** — the tier-1 channel is `U-STORE-PERSIST`'s (`P-8`). |
| **I-10** | **No element, coordinate, geometry, magnitude or clock read anywhere in the surface or the bytes** (`P-10`, `P-11`). |
| **I-11** | **No new MCP surface, no new seam, no change to any frozen contract** (`P-12`). |
| **I-12** | **No second authority**: the store derives, defaults and re-keys nothing it was given (`P-13`). |
| **I-13** | **The event envelope's five common members are present AS KEYS on every event, and `cleared` is never omitted** (`§2.11` item 1). |
| **I-14** | **One event per AFFECTED reference**: a commit emits its own event AND each cleared lower reference emits its own `cause:'clear'`; a sweep of `N` emits `N`; a refused write emits `0` (`§2.11` item 2, `R-2`). |
| **I-15** | **A store subscription is per realm, per reference, and its count after `N` generations is `1`** (`S-RH-1`, `R-16`). |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

| id | The static claim | The scan's scope and its positive control | Cited by |
| --- | --- | --- | --- |
| **R-1** | **Over `src/renderer/store-core.ts`'s raw bytes (comments included), there is NO consumer vocabulary as store vocabulary and NO mirror-class literal**: no `tab`/`pane`/`zone`/`region`/`gutter` word, no `is-empty`/`is-minimized`/`is-revealed`, no `minimized`, no unit string. **Token set held as FRAGMENTS so the scan cannot read its own rule list.** | **the module file's bytes**, with a **POSITIVE control** (a fixture string carrying one of them must FAIL) and a **NEGATIVE control** (ordinary count wording PASSES). **The declaration file is OUT OF THIS SCAN'S SCOPE** — its spellings are the caller's (`§0A` note 1) | `P-1`, `P-13` |
| **R-2** | **For EVERY write operation, `events` on the receipt is a function of the AFFECTED REFERENCES, not of the listeners**: one affected reference ⇒ `events: 1`; `N` swept references ⇒ `events: N`; a refused write ⇒ `events: 0`. | the store's own receipt counts **against** the subscribers' delivery records, **both readings asserted** | `P-7`, `§2.11` items 2/7, `I-14` |
| **R-3** | **For EVERY mutator, a refusal implies `cleared: []` AND `events: 0` AND every resident copy untouched.** | the five mutators × the refusal classes, **with the positive control that the same call on a legal input clears what it declares** | `P-4`, `I-4`, `F-23` |
| **R-4** | **The read's precedence is total and ordered — `secure` → malformed → registry → first hit → merged → miss — and NO tier-qualified read falls through; NO alias field exists on any declaration row.** | the six precedence inputs crossed with the two name forms, **each with its own expected reason or shape** | `P-2`, `§2.5` item 1, `§0` ruling 8 |
| **R-5** | **The registry's load-time and write-time refusals are total and each carries a NAMED POSITIVE CONTROL**: `G-1`…`G-10` (with `G-8` **superseded and subjectless**) and `H-1`…`H-6`, plus the ambiguous table and the malformed pattern. | the ten write/load rows and the six read rows, each driven **with** its control | `P-1`, `§2.6` items 3/5 |
| **R-6** | **No path, file, `fs`, `node:*`, `process`, `require`, `localStorage`, `document`, `window`, `globalThis`, `getBoundingClientRect`, `getComputedStyle`, `matchMedia`, `clientX`-family, `Date` or `Math.random` token exists in the module or its own test file.** | **both files' raw bytes**, with a **POSITIVE control** (a fixture carrying `node:fs` must FAIL) | `P-4`, `P-6`, `P-8`, `P-10` |
| **R-7** | **No `element` parameter and no geometry-shaped claim appears anywhere in the surface or in any row DESCRIPTION**: no `ELEMENT` parameter, no rect, no applied length, no containment boundary, no magnitude. **`S-d11`'s clause is carried verbatim at `§2.2` `P-11`.** | the module's bytes **and** this unit's own test file's row descriptions, **with a positive control that a description claiming a magnitude FAILS** | `P-5`, `P-10`, `P-11` |
| **R-8** | **A multi-reference operation is ONE committed write, and this unit's own mutators are ONE-NAME operations.** | a fixture driving `commit`/`remove` with a reference-set argument **must FAIL to type-check** (the surface takes a `string`), and the constraint evaluation is stated over the SINGLE call's post-state | `P-12`, `§2.10` item 8, `§0` ruling 14 |
| **R-9** | **No path segment is looked up against any id registry, and the store keeps no counter, no UUID site and no string-to-entry map.** | the module's bytes, with a positive control (a `Map` keyed by a derived value FAILS) | `P-13`, `§2.3` item 5 |
| **R-10** | **No module-level mutable binding holds a store, a tier, a table, a listener set or the seam flag; the construction count per realm is exactly `1`; and the seam's two members are ABSENT unless enabled.** | (a) the module's top-level scope, **with a positive control that a module-scope `const store = createStore(...)` FAILS**; (b) the wiring's construction count; (c) `'reset' in store === false` and `'seed' in store === false` when the seam was not enabled | `P-13`, `§2.8` item 3, `§2.12` item 1, `I-12` |
| **R-11** | **`store-core.ts` has EXACTLY ONE import statement** — `store-references.js`, **the row type only** — and `store-references.ts` imports nothing but its own types. | an import census over **both** files' raw bytes, **NAME-COMPLETE** (the census names the one module and the one binding), **with a positive control that a fixture importing `src/main/**` or `../shared/**` FAILS** | `P-9`, `I-1` |
| **R-12** | **No MCP/registration surface moved**: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set and the `scripts` key set are all UNMOVED by this unit's diff. | the five-seam negative asserted **by set equality against the NAMES**, and the `scripts` KEY SET asserted unchanged **because adding a key would redden `tests/ui-leg-contract.test.ts`'s `L-1` — a config change CANNOT satisfy it** | `P-12`, `§5.1`, `I-11` |
| **R-13** | **The event arm table's per-arm key sets hold, `parts`/`merged` are ABSENT on the first-hit and miss arms, and `origin` appears on the `descendant` arm alone.** | a `hasOwnProperty` census per arm over both the `StoreEvent` and the `StoreReadResult` shapes, **with a positive control that a hand-built event carrying `origin` on a `'set'` arm FAILS** | `P-5`, `§2.5` item 4, `§2.11` item 2, `I-13` |
| **R-14** | **The trie is per tier, in-memory, maintained inside that tier's own mutators, emits no event of its own, and agrees with the tier's own table.** | a differential driving `N` writes and `M` removals and comparing both queries against a linear scan after every step, **with a positive control that a trie updated from a non-mutator site FAILS** | `P-7`, `§2.7`, `I-14` |
| **R-15** | **The constraint table declares EXACTLY ONE row today; its declared columns are kind · evaluated-on · repair action · refusal reason; its refusal reason is `null`; and a second constraint without an interaction rule does not load.** | the table's own read-only view **and** a load attempt with a two-id table | `P-13`, `§2.10` item 9, `F-17` |
| **R-16** | **A store subscription's count for one subscribed reference reads exactly `1` after `1` construction, `N` loads and `M` further re-derivations; `reset()` releases it; and a realm teardown releases it.** | the subscription count read from the store's own subscription record, **per-realm predicts `1`, per-generation predicts `N + 1`, so the row REDDENS under the superseded reading** | `P-13`, `§2.11` item 5, `I-15` |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | The claim | The probe |
| --- | --- | --- |
| **R-9** | **This unit renders NO page**, so the `user-flow-audit.md` `§7.1` predicate does not trigger and **no `§5.U` report is due** — **a zero-row report would be INVALID**. | a glob of the unit's diff for any envelope node, handler body, component binding or authored element; **any hit FAILS** |
| **R-10** | **(a) `docs/skills/designing-pages.md` DOES NOT EXIST**, so there is no test-use-case coverage matrix and no demo-page index to update; **(b) the construction count per realm is `1`; (c) the seam is ABSENT in a production-shaped construction.** | (a) a glob of `docs/skills/*` — **the file's later appearance is a finding against THIS row, to be reconciled in the same pass**; (b) the wiring's own construction count; (c) the store's own key set |
| **R-11** | **`src/renderer/store-core.ts` and `src/renderer/store-references.ts` are both NEW** (both verified free 2026-10-01), and **`src/shared/**` stays BYTE-IDENTICAL** across this unit's whole committed set. | a commit-range probe over `src/shared/**` — **any byte there FAILS** (the plan's `§6.3` `U-STORE-CORE` boundary clause: *"plus zero edits to `src/shared/**`"*) |
| **R-16** | **`RH-1`'s realm-scoped release row IS RUNNABLE NODE-SIDE**: the falsifier imports `finalizeHookCount` from **the `provident-ssr/core/registry` SUBPATH**, and **an import from the package's MAIN ENTRY FAILS TO COMPILE**. | the falsifier's own import statement, **plus a negative control: the same identifier imported from the main entry must produce a type error at the standalone strict `tsc` leg** (`§5.2` leg 5) |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**A TestWriter authors `tests/store-core.test.ts` from THIS FILE and its `§5.5.1` register ONLY — no implementation
reading — and RUNS it, reporting the failing set VERBATIM.** **The rows are `§3.1`'s `M-1`…`M-20`, `§3.2`'s
`F-1`…`F-25`, `§3.3`'s `I-1`…`I-15`, `§3.4`'s `R-1`…`R-16`, `§3.5`'s existence rows, and the register's `20` rows.**
**At red time the module and the declaration file DO NOT EXIST, so the whole set is expected to fail on the import
itself** — **except the STATIC and EXISTENCE rows, which are evaluable at red time and must be driven in BOTH
branches:**

- **RED branch (the module absent):** assert **ABSENCE** of the two module paths and **that no `src/**` file imports
  either path**; assert the `docs/skills/designing-pages.md` absence (`R-10`(a)); assert that no tracked count moved.
- **GREEN branch (the module present):** assert the module **EXISTS**, that it exports **exactly `2 + 18 = 20`
  names** (`R-5`), that **the renderer wiring is its only importer**, and that the census holds.

**A row that fails merely because the work was done FAILS `R-16`'s own branch rule.**

### 4.2 Red-set authoring order

1. **The static and existence rows first** (they are evaluable now and they are what the red set reports at red
   time).
2. **The grammar and the registry rows** (`R-4`, `R-5`, `F-7`…`F-17`): the closed token domain, the matcher's
   precedence, the load-time refusals with their positive controls.
3. **The read's five cases** (`M-1`…`M-5`, `F-6`, `F-9`, `R-4`).
4. **The five mutators** (`M-6`…`M-10`, `M-16`, `M-17`, `F-3`…`F-5`, `F-8`, `F-23`, `F-24`).
5. **The event surface** (`M-7`, `M-8`, `M-15`, `F-22`, `R-2`, `R-13`, `P-SC-IM-6`, `P-SC-IM-7`).
6. **The constraint table and the repair** (`M-14`, `F-19`…`F-22`, `R-15`).
7. **The trie** (`M-11`, `M-12`, `R-14`).
8. **The caps** (`M-13`, `F-18`).
9. **The totality, purity and seam rows** (`F-25`, `R-6`, `R-7`, `R-10`, `R-11`, `R-12`, `R-16`, `§2.8`).
10. **The register's `20` rows LAST**, in register order, **with the caps and the stop rule** (`§5.5`).

### 4.3 What the red is NOT

- **It is NOT a partial set.** A red that omits a `§3` row or a register row **is not the red this spec owes.**
- **It is NOT a green.** **No row may be reported as passing at red time except the static/existence rows' RED
  branches** (`§4.1`).
- **It is NOT a substitute for the register.** **The register rows are the quantification layer; the `§3` rows are
  the sample layer, and neither replaces the other** (`§5.5` item 4).
- **It is NOT a proof of anything about persistence, a rendered surface, the app or the tier-1 channel.** **No
  `[U]`, no `[D]`, no APP claim is made by any row of this unit** (`§5.2` item 2).

### 4.4 The stop conditions (binding)

| id | Stop condition |
| --- | --- |
| **S-1** | **A `§3` row's expected answer cannot be derived from THIS FILE.** The row is **WITHDRAWN and reported**; the spec is amended in the same pass. |
| **S-2** | **A register row is un-runnable or un-enumerable.** **It is reported as a FAILURE, never as a pass** (`§5.5` item 5). |
| **S-3** | **The register's total is not the sum of its own terms.** **A total that is not the sum of its own printed terms is a REVIEW FINDING** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`), and a mis-sum is corrected by **annotating beside the as-filed form**, never by silently rewriting it. |
| **S-4** | **A cap is evicted, silently dropped, or made to clear anything.** The cap's declared outcome is **a refusal with `cleared: []` and `events: 0`** (`§2.9` item 2). |
| **S-5** | **A row claims a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact — or offers a `[U]` row for one.** **The claim is DELETED; the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words). |
| **S-6** | **A clause claims a coordinate, an element or a magnitude enters the store's surface.** **The clause is DELETED** — the family's opacity discipline and `S-d11`'s clause bind (`§2.2` `P-10`, `P-11`). |
| **S-7** | **A prohibition cites *"a static source row"* with no id, or a row asserts a COUNT without NAMING the names.** Both are FAILS (`§2.2`'s closing sentence; `§2.1`'s census). |
| **S-8** | **A second store authority appears** — a second construction in a realm, a module-level store binding, or a `cache` that was serialized to make one. |
| **S-9** | **A declaration row ships a per-tier alias field**, or a `remove`/`clear` call takes a pattern argument. Both FAIL `R-4`. |
| **S-10** | **A cap value or the seam is changed without a gate.** The values are recommended and architect-reversible, **but a change is a spec amendment with its own gate, not an in-flight edit**. |
| **S-11** | **The seam becomes a live surface** — exported unconditionally, documented as a production API, or reachable without `{enableTestSeam:true}`. **FAILS `R-10`(c).** |

### 4.5 Delegation gate

**This unit is NOT delegable to a TestWriter until: (a) this contract is FILED and APPROVED by the architect (the
spec gate — the ONE approval the chain waits for, `AUTONOMY AFTER SPEC APPROVAL` cited by row name); and (b) the
STEP-0 dossier `docs/specs/store-core-adoption-dossier.md` is filed (done by this pass) and its rows are accepted.**
**After approval the chain proceeds without further permission** (`AUTONOMY AFTER SPEC APPROVAL`).

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/renderer/store-core.ts` | **NEW** — the **two value exports + eighteen type declarations** of `§2.1`, and nothing else | always |
| 2 | `src/renderer/store-references.ts` | **NEW** — the declaration table's home (`§2.6` item 1), **and the TEST-ONLY fixture is NOT here** (the fixture lives in the test file, `§2.6` item 7) | always; **its export census is an explicit decision request (`§7a.1` item 6)** |
| 3 | `tests/store-core.test.ts` | **NEW** — the red set (`§4.2`), the register rows, the static/existence rows **and the TEST-ONLY declaration fixture** (`§2.6` item 7) | always |
| 4 | `docs/specs/store-core.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 5 | `docs/specs/store-core-adoption-dossier.md` | the STEP-0 dossier — **FILED by this pass** | always |
| 6 | `docs/specs/store-core-greens.md` | the unit's **gate-5 blind-greens artifact**, and any other `docs/specs/store-core-*.md` of this unit | the pass that produces it |
| 7 | `src/renderer/renderer.ts` | **the WIRING ROLE ONLY, and ONLY if the wiring is landed in this unit's pass**: it **constructs the store once per realm at boot, before the hand-off**, and **registers the subscribers it needs**. **It authors NO UI content and NO DOM** | **the pass that lands the wiring**; **a renderer edit that hand-writes DOM is a FINDING** |
| 8 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and a **sibling spec** only for a dated status/annotation correction that changes **no normative clause** | the pass that produces them |

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST. The frozen and
sibling-own files are NAMED FIRST:**

1. **`src/shared/**`** — **BYTE-IDENTICAL** for this unit's whole committed set (the plan's `§6.3` `U-STORE-CORE`
   boundary clause), **including `src/shared/types.ts`** (`Q-3`'s answer keeps the channel constants out of the
   vendored surface) **and the landed mechanism modules and their test files**.
2. **`src/main/**`** — the channel-name constants, the preload members, the migration, the atomic write and the
   security tier's own module are **`U-STORE-PERSIST`'s and `U-STORE-SECURITY`'s** (`G2`/`G3`), **not this unit's**.
   **The renderer cannot import `src/main/**` anyway** (`[H]`).
3. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change, **and no
   store-sourced value pushed into any of them**.
4. **`docs/specs/data-ownership-model-plan.md` and `docs/specs/data-ownership-model-review.md`** — the plan and the
   CLOSED gate-1 record: **this unit derives them, and may not re-litigate or edit them.**
5. **`package.json` · `package-lock.json` · `tsconfig.json` · `tsconfig.tests.json` · `vitest.config.ts`** — **no
   script, no dependency, no devDependency, no include/exclude and no compiler option.** **`typecheck:tests` ALREADY
   EXISTS** (`AGENTS.md` item 4's additive fourth leg) and **this unit adds NO `scripts` key** — a key addition would
   redden `tests/ui-leg-contract.test.ts`'s `L-1`, **and a config change cannot satisfy it.**
6. **`scripts/**`** — no helper, no leg driver.
7. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no IPC method, no registration site.
8. **`docs/specs/mcp-endpoint.md` · `docs/specs/focus-tool.md` · `docs/specs/focus-model.md` ·
   `docs/specs/focus-tool-greens.md` · `docs/specs/gutter-ui.md` · `docs/specs/gutter.md` · `docs/specs/zones.md` ·
   `docs/specs/census.md` · `docs/specs/container.md` · `docs/specs/gsession.md`** — every sibling contract, **each
   under its own gate**; the plan's routed amendments are **ROUTED AND NOT PERFORMED HERE**.
9. **`docs/FORKER.md`** — its fork-facing cells are the architect's, on `Q-14`'s pass.
10. **`docs/skills/**`** — `designing-pages.md` does not exist and this unit renders no page (`§3.5 R-9`).
11. **`docs/specs/user-flow-audit.md`** — the `§7.1` predicate is determined as NOT TRIGGERING; **no report is due
    and a zero-row report is INVALID** (`CURRENT STATE` item 6).
12. **Every sibling unit's `*-greens.md`, review record and register** — **a sibling's artifact is never this unit's
    diff.**
13. **`AGENTS.md`**, any `docs/decisions.md` row (none is owed by this unit), and any tracker count.

**THE COMMIT-RANGE SCOPE RULE, stated so a scope row cannot mistake correct gate work for a boundary violation** (the
lesson from the last three passes): **a diff-scope row asserted over a commit range must scope its ALLOW-LIST CENSUS
to THIS UNIT'S OWN ARTIFACTS** — the two modules, this unit's test file, this spec, the dossier, this unit's own
`*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's
commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this unit's diff.** **The DENIED set is
the exception and is the half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS** the
row regardless of which pass committed it. **A non-denied path outside the allow-list is a FINDING for the
adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate boundary to leave a commit).

### 5.2 The legs this unit MUST run — FIVE, and the two three-part refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **This is this unit's WHOLE green.** **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — and for this unit it proves **the contract's behaviour over arguments and over a driven in-realm store**, and **nothing** about persistence, the tier-1 channel, a rendered surface or the app (layer anchors 1/2). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the eighteen type declarations, the two value signatures and the store interface's own ten members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild. **This unit adds a module imported by the renderer wiring**, so **the renderer bundle's census is EXPECTED to change** and **the other bundles must be BYTE-IDENTICAL** — a change in any other bundle is a FINDING, **and a renderer-bundle change is NOT evidence that the contract holds.** |
| **4** | **the additive test-layer leg** | `npm run typecheck:tests` | **[T]** | **the ONLY leg that compiles `tests/**`** (`AGENTS.md` item 4's additive fourth leg; `tsconfig.tests.json`). **Any DONE row that cites typecheck as evidence about THIS unit's own test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/store-core.test.ts`** — the named leg for `R-5`(b) | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts ten **TYPE-ONLY** names, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while **leg 2 does not compile `tests/**` at all**. **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script, no dependency and no diff-scope row** (the `docs/specs/gsession.md` `§5.2` and `docs/specs/zones.md` `§5.2` leg-4 precedent). **`R-16`'s negative control — a main-entry import of `finalizeHookCount` that must FAIL to compile — is evaluated on THIS leg.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART. A one-sentence refusal is not the
clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — including the read's five cases, the
   mutators' receipts, the event deliveries, the registry's refusals and every static row. **`[U]` is the real-DOM
   observation leg (`npm run ui`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, and it is structural rather than a leg-availability excuse: NO ADMITTED UNIT AUTHORS A
   RENDERED SURFACE.** **Concretely, both limbs of the reason are absent: (a) this unit authors no element, no node,
   no text, no class, no attribute, no stylesheet and no control** — **so there is no rendered surface to observe**;
   **and (b) its flows are store-only, so there is no assembled visible behaviour whose truth is real-DOM-only.**
   **The `ui` leg exists and is green, and the divergence leg is green — the refusal is not an excuse about the
   legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row MAY NOT BE MOVED TO THE `ui` LEG
   SILENTLY."*** **Any later pass that wants a rendered row for this unit must get it from the unit that OWNS the
   rendered surface** — **the tab strip is `U-STORE-TABS-STRIP`'s (a PROPOSAL), and the two authored pages are
   `U-STORE-FOCUS`'s (a PROPOSAL); neither is admitted and neither is this unit's.** **A `[U]` row moved here
   silently is `§4.4 S-5`, and it does not land.** **AND THE WORD `waived` IS FORBIDDEN: gate 6's honest status is
   `STRUCTURAL`, and a DONE row that reports it as `waived` is a review finding** (`§5.3` item 7).

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED.** **The divergence leg is the shim ≡ real
identity leg (`npm run divergence`, `N = 9` pinned) and it is green — but no `[D]`-shaped row of this unit is
runnable**, because **this unit's subject is a store's own semantics over its own tables**, which the existing
pinned leg does not enumerate. **A `[D]`-shaped row for this unit would need its OWN harness and its OWN spec as
its authority.**

**AND THE `user-flow-audit.md` `§7.1` PREDICATE, RECORDED:** **the determination is NOT TRIGGERING, in the
predicate's own terms, with limbs A and B both absent** (`CURRENT STATE` item 6; the record's `§7`). **The record
of the determination is this sentence. NO REPORT IS FILED, and a zero-row report is INVALID.**

### 5.3 The DONE row's shape

**The DONE row (`docs/next-steps.md`, the supervisor's pass, the architect's to grant) must carry, in this order —
all TWELVE items:**

1. **Unit + wave + status**: `U-STORE-CORE` · wave **G** (ledger row `G1`) · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"the four-tier data-ownership store's contract: three
   non-security tiers in the RENDERER realm; the layered read with its five cases; the closed four-token grammar;
   the declared name registry as the store's second contract surface; the residency trie; the merged read with
   `parts`; the constraint table with its one `REPAIR` row; `set`/`commit`/`remove`/`clear`/`sweep`; the seven-arm
   event surface — and NOTHING ELSE. **No policy default, no store-side clamp, no comparator, no consumer
   vocabulary, no store of its own, no persistence outside the tier-1 channel, no coordinate or geometry read, no
   graph write, no MCP surface, no UI.**"* **A DONE row that does not state this is a review finding** — it is the
   unit's defining constraint (`§1` items 2–6).
3. **The surface confirmation, explicitly**: *"`src/renderer/store-core.ts` exports exactly **TWO value exports**
   (`createStore`, `createStoreError`) and **EIGHTEEN type declarations** (`StoreTierName` · `StoreTier` ·
   `StoreRefusalReason` · `StorePart` · `StoreReadHit` · `StoreReadMiss` · `StoreMergedRead` · `StoreReadResult` ·
   `StoreGetResult` · `StoreTierHandle` · `StoreDeclaration` · `StorePattern` · `StoreConstraint` · `StoreEvent` ·
   `StoreWriteReceipt` · `StoreSubscription` · `Store` · `StoreCrossing`) — **`2 + 18 = 20` names** — it imports
   **EXACTLY ONE** module
   (`store-references.js`, the row type only), it carries **no module-level store binding**, and **its TEST-ONLY
   reset/seed seam is ABSENT unless `{enableTestSeam:true}` was passed**."* **The census is `§2.1`'s and `R-5` is its
   row.**
4. **The code/test delta**: the two modules + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows ran
   and which were reported un-run** (`§4.2`'s stop rule) **and which rows were driven in their RED branch**.
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**` ONLY*** ·
   `npm run build` `[H]` (**the renderer bundle's census moved, every other bundle byte-identical**) ·
   **`npm run typecheck:tests`** · **leg 5** (the standalone strict `tsc` over the unit's own test file) — **and the
   explicit sentence that the node-suite green is envelope/pure-layer evidence and NOT assembled-app evidence**, and
   for this unit **that it proves nothing about persistence, the tier-1 channel, a rendered surface or the app.**
7. **The `[U]`/`[D]` status, and gate 6's `STRUCTURAL` status**: **`[U]` not offered**, with `§5.2`'s **THREE-PART**
   clause (the refusal · the structural reason — **no admitted unit authors a rendered surface** · the `zones.md`
   `§4.4 S-6` sentence *"the row may not be moved to the `ui` leg silently"*); **`[D]` not claimed**, with its
   `PRECONDITION-GATED` status; **gate 6 stated as `STRUCTURAL`, not waived, with its reason.** **The word
   `waived` must not appear as this unit's status.** **AND the `user-flow-audit.md` `§7.1` determination, recorded as
   NOT TRIGGERING with no report filed.**
8. **The adversarial pass's findings** (`§3a`/`§3b` — MANDATORY per completed unit, **including the gate-11 read-only
   PBT audit of `§5.5.1`'s executed tables**) and the **blind-greens + per-unit documentation-review records** (the
   blind set is `docs/specs/store-core-greens.md`).
9. **The tracker reconciliation** — including **the explicit statement that this unit's dependencies are the
   ADMITTED units and the landed surfaces it cites, that the plan and the gate-1 record are NOT edited, that
   `src/shared/**` is byte-identical, and that the ledger's `21 DONE / 3 open` UNITS = `24` is unmoved until the
   architect grants the DONE row** (`RCA-8(f)`).
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type · attempts-run ·
    held · broken** counts, **each row's strategy id (`S-SC-*`)**, the **pinned seed `20261001`** and its **step
    form**, the **stop-after-5-consecutive-failures status** (`not triggered`, or `triggered at row …`), the **total
    attempts reported against the `≤400` cap** with **every row's count against the `≤100` per-row cap**, and **the
    explicit sentence that every row whose property text quantifies over a domain larger than its table carries the
    `(bounded)` marking and is NOT a proof of the unbounded universal it states.** **A DONE row that reports the
    register as "executed" without these per-row counts and strategy ids is a review finding.**
11. **The register's ARITHMETIC and its DUAL COUNT.** **The DONE row must print the total WITH its per-row terms —
    `400` = `30` (`P-SC-IM-1`) + `28` (`P-SC-IM-2`) + `24` (`P-SC-SM-1`) + `40` (`P-SC-TP-1`) + `40` (`P-SC-IM-4`) +
    `9` (`P-SC-IM-5`) + `14` (`P-SC-IM-6`) + `8` (`P-SC-IM-7`) + `20` (`P-SC-TP-2`) + `24` (`P-SC-TP-3`) + `22`
    (`P-SC-IM-8`) + `24` (`P-SC-TP-4`) + `24` (`P-SC-TP-5`) + `6` (`P-SC-IM-9`) + `5` (`P-SC-TP-6`) + `5`
    (`P-SC-IM-10`) + `20` (`P-SC-IM-11`) + `6` (`P-SC-IM-12`) + `5` (`P-SC-IM-13`) + `20` (`P-SC-TP-7`) — and must
    reconcile that figure against the tables the test file actually produces**: **a total that is not the sum of its
    own terms is a review finding** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE). **Where a row's attempts
    are several assertions over one execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row
    must report BOTH the declared attempts and the honest DISTINCT-DRIVE figure** — **the declared term is a DRIVE
    count** (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`, cited by row name), **assertions are printed BESIDE it and
    never inside it**, and here **FOUR rows carry a distinct-drive figure reported beside their terms:
    `P-SC-IM-6` `14`/`7` · `P-SC-IM-7` `8`/`3` · `P-SC-IM-12` `6`/`3` · `P-SC-SM-1` `24`/`9`.** **The DECLARED figures
    are what the caps are compared against.** **AND the four rows whose own cells print an enumeration LARGER than
    its declared term (`P-SC-TP-1` · `P-SC-IM-5` · `P-SC-IM-7` · `P-SC-TP-2`) carry the drive-versus-assertion
    reconciliation printed at `§5.5.3`; the DONE row MUST echo it rather than print a bare term beside a larger
    enumeration.**
12. **The decision requests' disposition** (`§7a.1`): **the six items' outcomes as ruled by the architect, each with
    its own row**, **and the two `CARRIED` items with their owners and their positive revisit conditions named** —
    **never a bare `OWED`.**

### 5.4 Rollback

**The unit is a NEW module pair plus a NEW test file.** **Rollback is the removal of the two modules and the test
file, the revert of the wiring role if it landed, and the revert of this spec and the dossier** — **no migration, no
data file, no schema version, and no other unit's artifact is entangled**, **because the store owns no file and
persists nothing.**

---

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` obliges the register BEFORE the red set for a code-bearing unit, and
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` forbids trimming it to a count.** **This repo
HAS NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the **five keys** `@types/node`, `electron`,
`esbuild`, `typescript`, `vitest` — **no `fast-check`, no property runner, no fourth dependency of any kind.**
**This unit is CODE-BEARING** (a real store with two value exports, a declaration matcher, three mutating tiers, a
constraint evaluator and an event fan-out), **so the recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it.**
**`§5.5.1` below is therefore a real typed register**, executed by **plain deterministic vitest tables**, **with NO
new dependency, no fifth leg and no `package.json` change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE: A register ENUMERATES every discernible testable property of its
unit; the per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates
`20` rows and reports the count as its EXTENT — no property was dropped, merged or left unenumerated to fit a
threshold**, and **`20` IS AN OUTCOME, NOT A TRIM.** **The architect's ruling that `CORE`'s FIRST red set carries the
WHOLE MODEL (four tiers · the read's five cases · the grammar · the registry · the trie · the merged read · the
constraint table · `remove`/`clear`/`sweep` · the event surface) is why the register is this wide**: **a finding is a
contract that splits them out anyway, or that drops, merges or leaves unenumerated a discernible property to reach a
count — a register merely LARGER than a reader expected is not a finding and never a reason to trim it.**
**`§8.2`'s four corrected rows (five subjects) are carried here as rows `P-SC-IM-2`, `P-SC-TP-1`, `P-SC-SM-1`,
`P-SC-IM-1` and `P-SC-IM-8`, and the four subjects that block omitted are rows `P-SC-IM-8`, `P-SC-TP-4`,
`P-SC-TP-5` and `P-SC-IM-5`.** **No row of this register is an `F-` row**, and **no `§6`/`FS-n` citation appears as a
register row.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/store-core.test.ts`, `§4.1`/`§5.1`) — the
   file the red set already owes, and the file the register **rides as part of the red**. **No row of this register
   is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript inside the
   test file.** **ONE row uses a generator** — `P-SC-TP-1`, the name-domain totality sweep whose pool is drawn — and
   **it is pinned to literals in the test file itself: a hand-rolled 32-bit LCG with `state₀ = 20261001`;
   `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`; and EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting
   state selecting the pool member — `index = stateₙ₊₁ mod pool.length`, with `pool.length = 20`.** **There is NO
   `next(k)` helper, no `Math.random`, no wall-clock seed, no shrinking and no adaptive input search.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's remaining attempts
   are abandoned and no further row starts). **A register row is never refused on the ground that "no PBT harness
   exists."**
4. **The register COMPLEMENTS the `§3` rows and never replaces them.** **No `§3` row is weakened, widened or
   re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and **a
   row whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)`
   marking.** **An un-run register row is reported as a FAILURE, never as a pass.**
6. **The register's own boundaries, named rather than silently relied on: (a) it drives the tier-1 tier through the
   DECLARED, STUBBED crossing seam and asserts NOTHING about the real channel; (b) no `Proxy` whose traps return
   inconsistent answers across reads is in any pool (the hostile shapes are FIXED table members, deliberately, so no
   draw is ambiguous); (c) each row's table is a SUBSET of the input space this contract pins, and its silence about
   a shape it does not list is a stated boundary, not an unrecorded omission; (d) `P-SC-TP-1` is the row that carries
   the name-domain totality universal, `P-SC-IM-1` is the row that carries the read's five cases, and NO OTHER ROW
   MAY BE QUOTED FOR EITHER.**

### 5.5.1 THE REGISTER — **`20` typed rows, the FAMILY PREFIX DECLARING THE ROW'S OWN TYPE: `11` `P-SC-IM` + `1` `P-SC-SM` + `8` `P-SC-TP`, ALL executed by design**

**THE FAMILY CONVENTION, STATED ONCE SO NO READER DERIVES A COUNT FROM AN ID: the prefix is the row's DECLARED
TYPE, never its ordinal** — `P-SC-IM-*` = `P-IM` invariant, `P-SC-SM-*` = `P-SM` state-machine, `P-SC-TP-*` =
`P-TP` totality. **So the ids are `P-SC-IM-1`…`P-SC-IM-11`, `P-SC-SM-1` and `P-SC-TP-1`…`P-SC-TP-8`, and `20` rows
carry `20` terms.** **An id whose prefix disagreed with its Type column would FAIL the register's own typing
rule.**

**What this section is, in one sentence.** A **typed register of `20` rows** whose **seven genuine quantifications
in the model's own words** — (i) *the read's FIVE CASES over every grammar name and every tier state*; (ii) *the
clear invariants over every declared reference and every tier state*; (iii) *the registry's totality and precedence,
with a positive control per refusal*; (iv) *the trie's two queries' totality and the node count's return to its
floor*; (v) *the event surface's seven-arm member completeness and the one-event-per-affected-reference count*; (vi)
*the constraint/repair evaluation across a write's post-state, including the `remove` arm and the `≥2` referent*; and
(vii) *the episode lifecycle* — are **executed here as quantifications over finite, pinned enumerations**,
**hand-rolled and deterministic, with no new dependency**.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-SC-*`** (`SC` = this unit, **s**tore
**c**ore) — so **a register row is never mistaken for a `§3` row** (whose families are `M-*`/`F-*`/`I-*`/`R-*`) **and
never for a sibling's register** (`P-GT-*`, `P-ZN-*`, `P-CN-*`, `P-GS-*`, `P-PJ-*`, `P-LH-*`, `P-SH-*`, `P-GU-*`,
`P-FT-*`, `P-FM-*`). **The three families are the type algebra's**: **`IM`** = invariant · **`SM`** =
state-machine · **`TP`** = totality. **The strategy-id prefix is `S-SC-*`, one per row.**

**THE DECLARATION FIXTURE THIS REGISTER RUNS AGAINST, named because the register is un-runnable without it.** **One
table, carried in the test file (`§2.6` item 7), with GENERIC CALLER-STYLE spellings and NO consumer noun:**
**`file.<entity>.order`** (concrete, `reserved:false`) · **`file.<entity>.<id>.label`** (pattern, one interior
wildcard) · **`file.<entity>.<id>.token`** (pattern) · **`file.<entity>.pinned`** (concrete, `reserved:true`) ·
**`mem.<entity>.<id>.working`** (pattern) · **`temp.<entity>.<id>.candidate`** (pattern) ·
**`secure.<entity>.secret`** (concrete, tier `secure`, **tier-internal only**) — **plus the constraint row
`{ id: 'count-exactly-one', kind: 'count-exactly-one', evaluatedOn: ['set','commit','remove'], repair:
'next-surviving-by-order', refusalReason: null }` declared over the `file.<entity>.<id>.token` matched set.**
**Its supplier is an explicit decision request (`§7a.1` item 1); the red set is authorable against it TODAY.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-SC-IM-1`** *(the READ's five cases and the tier resolution — the `§8.2` corrected row (ii)'s subject)* | `P-IM` invariant | **For EVERY pair of (a name from the row's `10`-name table, a tier-residency state from the row's `3`-state table), `read` answers EXACTLY the declared case: the `secure` refusal first; then a malformed name; then an undeclared name; then the FIRST HIT in `temp` → `mem` → `file` with `cache` IDENTICAL to that tier's handle and `parts`/`merged` ABSENT; then the declared miss; then the merged arm with a non-empty ordered `parts`. NO OTHER TIER IS CONSULTED AFTER A HIT.** | **YES** *(the table IS the whole domain the property names — every name in the fixture's own grammar, every residency state of the three tiers)* | `M-1`, `M-2`, `M-3`, `M-4`, `F-6`, `F-9`, `F-25`, `I-4`, `R-4` | `S-SC-READ-1` | **`30` attempts** = **`10` names × `3` residency states**, one `read` call each, driven name-major in fixed order. **The `10` names:** the three tiers' spelling of one logical path · one unqualified spelling · one qualified spelling of a path held elsewhere · one declared-but-unwritten name · one undeclared name · one malformed name (empty segment) · one out-of-domain tier name · one `secure.*` declared name · one `secure.*` undeclared name · one parent path whose descendants are resident. **The `3` states:** all three tiers cold · the path resident in `file` only · the path resident in `file` and `temp` (the first-hit shadow case). |
| **`P-SC-IM-2`** *(the CLEAR invariants — `C-4-R` + the DOWNWARD removal — the `§8.2` corrected row (i)) **with the per-tier `get`/`has` registry relation (`N-16`'s pair)*** | `P-IM` invariant | **For EVERY (declared reference, tier-state, operation) triple in the row's table: a `commit` to tier `k` clears the SAME LOGICAL PATH in every LOWER-durability tier and NEVER a higher tier, clears BY LOGICAL PATH and never by suffix or prefix, clears NOTHING when the higher tier refused, and clears NOTHING on a `set`; a `remove` at tier `k` clears THE NAMED TIER AND EVERY LESS-PERSISTENT COPY of that path and never a higher tier; `remove('temp.p')` reaches `temp` ONLY; and **the tier-local `get`/`has` refuse an undeclared name `'undeclared-name'`, refuse a `secure.*` name `'secure-refused'`, refuse a cross-tier name, and answer the DECLARED MISS on a declared-but-unwritten name.*** | **YES** *(a fixed table over a closed tier set — every case has its own declared outcome)* | `M-6`, `M-16`, `M-17`, `F-3`, `F-4`, `F-5`, `F-9`, `F-23`, `I-4`, `R-3` | `S-SC-CLEAR-1` | **`28` attempts** = **`7` reference classes × `4` operation/tier drives**. **The `7` classes:** (1) a path resident in all three tiers; (2) a path resident in `mem` + `temp`; (3) a path resident in `temp` only; (4) a path resident in `file` only; (5) a declared-but-unwritten path; (6) an undeclared path; (7) a `secure.*` path. **The `4` drives:** (a) `commit` at the highest tier holding it · (b) `remove` at the highest tier holding it · (c) `remove` at the lowest tier holding it · (d) the tier-local `get`/`has` pair on the row's own name. |
| **`P-SC-SM-1`** *(the EPISODE LIFECYCLE — the `§8.2` corrected row (iii) — as a closed state machine)* | **`P-SM` state-machine** | **The lifecycle `temp set → commit → clear → miss → fall-through hit` is a CLOSED machine with NO UNREACHABLE TERMINAL, and `remove`'s post-state evaluation is one of its transitions. For EVERY entry of the row's `8`-state × `3`-variant table, the declared successor set is exactly the reachable set, and every terminal is reachable from the initial state.** | **YES** *(the state table IS the machine; every transition has its own declared successor set)* | `M-6`, `M-9`, `M-16`, `F-21`, `F-23`, `F-24`, `I-14`, `I-15` | `S-SC-LIFE-1` | **`24` attempts** = **`8` states × `3` variants**. **The `8` states:** `cold` · `temp-episode-open` · `committed-to-mem` · `committed-to-file` · `cleared-by-commit` · `removed` · `swept` · `boot-hydrated`. **The `3` variants:** the plain path · the path with a resident descendant · the path under a reserved declaration. **Per attempt assert:** the reachable successor set, the declared receipt, the `events` count and the tier-local `has` reading at that state.** **A DISTINCT figure is carried BESIDE this term: the `24` drives observe `9` distinct (state, variant) successor sets, because several state/variant pairs share a successor set.** |
| **`P-SC-TP-1`** *(the NAME-DOMAIN TOTALITY universal — the `§8.2` corrected row (ii) — over a pinned-seed pool)* | `P-TP` totality | **For EVERY name drawn from the pinned `20`-member pool, EACH of `read`/`set`/`commit`/`remove`/`clear`/`get`/`has` answers its DECLARED shape and NEVER THROWS — a `StoreReadResult`, a `StoreGetResult`, a `boolean`, or a `StoreWriteReceipt` — with the ONE declared exception (`createStore`'s LOAD REFUSAL and the two `§2.8` seam throws) asserted separately in the same row. Every drawn drive's answer is a record or a `boolean`: never `null`, never `undefined`, never a primitive where a record is declared.** | **YES (bounded — the property says "EVERY name" while the pool holds `20` and the drive performs `40` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-7`, `F-9`, `F-25`, `I-2`, `R-6`, `§2.3` item 2 | `S-SC-TOTAL-1` | **`40` attempts** = **`8` pinned-seed DRAWS × `5` entry-point drives**, where **one attempt is one drive (one drawn name passed to one entry point)** and **the per-call assertions (did-not-throw · declared kind · declared members) are reported as the row's `assertions` figure, NEVER as attempts.** **The `8` draws come from the `20`-member pool by the pinned LCG (`state₀ = 20261001`, ONE step per draw, `index = stateₙ₊₁ mod 20`) — so the same pool member may be drawn more than once and NO "all 20 drawn" claim may be made.** **The `5` drives:** `read` · `set` · `commit` · `remove` · the tier-local `get`/`has` pair. **The `20` pool members include: `''` · a non-string · `'file'` · `'file.'` · `'file..x'` · `'File.x'` · `'disk.x'` · a `.`-heavy name · a 4 kB name · `'__proto__'`-shaped segments · an undeclared name · a declared-but-unwritten name · a `secure.*` declared name · a `secure.*` undeclared name · a pattern-matching name · a concrete-pinned name · a path whose parent is resident · a path whose descendants are resident · a reserved declaration's own name · a tier-free name.** |
| **`P-SC-IM-4`** *(the REGISTRY's write/load-time refusals, `G-1`…`G-10`, each with its NAMED POSITIVE CONTROL)* | `P-IM` invariant | **For EVERY of the row's `10` refusal cases AND its `10` paired positive controls, the OUTCOME is EXACTLY the declared one: `G-1` undeclared → `'undeclared-name'` (control: the same call on a declared name COMMITS) · `G-2` doubled declaration → the DECLARATION does not load (control: each name once LOADS) · `G-3` wrong tier segment → `'undeclared-name'` (control: a matching pair COMMITS to the declared tier and ONLY that tier) · `G-4` reserved removal → `'reserved-name'` (control: a declared NON-reserved name removes) · `G-5` out-of-domain tier → `'malformed-name'` (control: each of the four legal tokens LOADS) · `G-6` `secure.*` → `'secure-refused'` (control: the tier's OWN `get`/`set` on the same name WORKS) · `G-7` malformed → `'malformed-name'` (control: a one-segment path after the tier is legal) · `G-8` **SUPERSEDED, NO SUBJECT** — asserted as the ABSENCE of any alias field on every row shape · `G-9` ambiguous table → `'malformed-pattern'` (control: a table whose concrete row pins the instance LOADS) · `G-10` malformed pattern → `'malformed-pattern'` (control: a well-formed interior-wildcard pattern LOADS).** | **YES** *(the `10` cases × 2 is the declared domain, and every cell has its own expected outcome)* | `M-10`, `M-20`, `F-2`, `F-7`, `F-10`…`F-17`, `I-3`, `R-5` | `S-SC-REG-1` | **`40` attempts** = **`10` cases × `2` halves (the refusal drive and its positive control)**, driven case-major in `G-` order. **`G-8`'s two cells assert the ABSENCE of an alias field and the survival of the invariant it protected (`C-4-R` + `G-3`)** — **so the superseded row is DRIVEN, not merely written down.** |
| **`P-SC-IM-5`** *(the MATCHER's precedence, the concrete-beside-pattern rule, the `secure`-first order, and the reserved-namespace collision)* | `P-IM` invariant | **For EVERY row of the matcher's `12`-case table, the resolved declaration is EXACTLY the declared one: a `concrete` exact match wins over any pattern; among patterns MORE LITERAL SEGMENTS wins; two equally-specific matching patterns refuse the table at LOAD; a `concrete` row pinning one instance of a pattern overrides it FOR THAT SPELLING ONLY (so its siblings behave normally); a wildcard slot matches exactly ONE non-empty segment (never zero, never two); a `secure.*` name is refused BEFORE any lookup, so a non-`secure` pattern can never match it; and a concrete name colliding with a reserved namespace key is refused at LOAD `'reserved-namespace'`.** | **YES** *(the `12` cases are the whole declared matcher domain, and each has its own resolved row; the DRIVE table is `3` cases × `3` operations, and the other `9` cases are asserted inside those drives)* | `M-10`, `M-20`, `F-2`, `F-12`, `F-13`, `F-15`, `I-3`, `R-5` | `S-SC-MATCH-1` | **`9` attempts** = **`3` matcher cases × `3` operations** (`read` · `set` · `remove`), so **the same resolved declaration is asserted on the read side, the write side AND the removal side** — a matcher that resolved differently per operation FAILS. **The `3` DRIVEN cases are the ones whose resolution DIFFERS per operation: exact concrete over pattern · a concrete pinned instance beside its pattern · a `secure.*` name against a non-`secure` pattern. The other `9` cases are ASSERTIONS over the same nine drives. The `12` cases, all still enumerated and all still asserted:** concrete over pattern · concrete over concrete-different-spelling · two patterns of unequal literal count · two patterns of equal literal count (the ambiguous table) · a concrete pinned instance beside its pattern · the pinned instance's own removal · a sibling instance's own removal · a wildcard matching one segment · a wildcard failing on two segments · a wildcard failing on zero segments · a `secure.*` name against a non-`secure` pattern · a reserved-namespace collision. |
| **`P-SC-IM-6`** *(THE SEVEN-ARM EVENT SURFACE — the total member-set statement)* | `P-IM` invariant | **For EVERY of the seven `cause` tokens, the emitted event's OWN KEY SET is exactly the arm's declared set, and `cleared` is PRESENT on every arm (possibly empty): `'set'` carries `name`/`tier`/`value` and NO `origin`; `'commit'` carries those three plus a PRESENT `cleared`; `'clear'`, `'sweep'` and `'remove'` carry `name`/`tier` and NO value (`value` present as a KEY, `undefined` in substance) and no `origin`; `'repair'` carries a VALUE and a `cleared`; `'descendant'` carries `origin` AND `subtree:true` AND NO value. AND the counts: an `N`-sweep emits `N` events; a refused write emits `0`; a commit emits ONE event for its own reference PLUS one `cause:'clear'` event per cleared lower reference.** | **YES** *(the `7` tokens × `2` observation points is the declared grid; every cell names its expected key set and count)* | `M-7`, `M-8`, `M-15`, `F-3`, `F-22`, `I-13`, `I-14`, `R-2`, `R-13` | `S-SC-EVENT-1` | **`14` attempts** = **`7` arms × `2` observation points**. **Point (a): the `hasOwnProperty` key census over the received event, asserted PER KEY NAME.** **Point (b): the receipt's `events` count against the listeners' own delivery record** — **both readings, so a body cannot pass by counting only one.** **A reported DISTINCT figure is carried BESIDE this term: the `14` drives observe `7` distinct envelopes, because the two points read the same emission.** |
| **`P-SC-IM-7`** *(the ONE-EVENT-PER-AFFECTED-REFERENCE count, sharpened — the `R3-3` ruling)* | `P-IM` invariant | **For EVERY of the row's `24`-case table (driven as `8` subscriber classes × `3` operations, of which ONE operation per class is a DRIVE and the other two are ASSERTIONS over the same eight drives), the DELIVERY COUNT per subscribed reference is EXACTLY the declared one: `commit('file.p', v)` with a live subscriber on `mem.p` delivers EXACTLY `1` event to that subscriber, `cause:'clear'`, on `mem.p`; the committed reference's own subscriber receives EXACTLY `1` event, `cause:'commit'`, carrying the audit list; a subscriber on an UNTOUCHED reference receives `0`; a subtree subscriber on an ancestor of a cleared path receives the child's own `cause:'clear'` where the cleared path is its descendant; and NO subscriber ever receives two events for one reference from one operation.** | **YES** *(a fixed table over the affected/untouched/opted-in subscriber classes)* | `M-7`, `M-15`, `M-16`, `F-3`, `F-5`, `F-22`, `I-14`, `R-2` | `S-SC-EVENT-2` | **`8` attempts** = **`8` subscriber classes × `1` operation**, with the other two operations' delivery vectors carried as assertions. **The `8` classes:** the committed reference itself · a cleared lower reference · a cleared reference's subtree-opted ancestor · a subtree-opted ancestor of the WRITTEN path (the `descendant` arm) · an untouched sibling reference · an untouched reference of another tier · the exact subscriber on a swept reference · the exact subscriber on a repair-written reference. **A DISTINCT figure is carried BESIDE this term: the `8` drives observe `3` distinct delivery vectors, because a refusal's vector is the same empty vector for every class.** |
| **`P-SC-TP-2`** *(the READ-SIDE REFUSAL PRECEDENCE — `secure` → registry → miss — with its positive controls)* | `P-TP` totality | **For EVERY of the row's `8`-input × `5`-surface table (driven as `4` NAME FAMILIES × `5` surfaces, because the four `secure` members answer ONE surface path each and the `get`/`has` pair is ONE drive), the reason reported is the FIRST row that applies: an undeclared `secure.*` name answers `'secure-refused'` and NEVER `'undeclared-name'`; a malformed `secure.*` name answers `'secure-refused'`; the same three inputs WITHOUT the `secure` segment each answer their own second-or-third-row reason; and the precedence is total because the reasons DIFFER.** | **YES** *(the `4` families × the `5` surfaces is the declared DRIVE domain, and each cell names its own reason; the `8` inputs are all enumerated and asserted inside it)* | `F-1`, `F-2`, `F-7`, `F-9`, `I-4`, `R-4` | `S-SC-PREC-1` | **`20` attempts** = **`4` name families × `5` surfaces** (`read` · `subscribe` · `remove` · `clear` · the tier-local `get`/`has` pair). **The `4` families:** the `secure` family (its `4` members — undeclared, malformed, declared, and declared-with-a-value — answer ONE path) · the non-`secure` declared family · the non-`secure` undeclared/malformed family · the tier-free family. **The `8` enumerated inputs, all asserted:** an undeclared `secure.*` name · a malformed `secure.*` name · a declared `secure.*` name · an undeclared plan name · a malformed plan name · a declared-but-unwritten plan name · a declared-and-written plan name · a tier-free name. |
| **`P-SC-TP-3`** *(the read surface's TOTALITY over the pool — the read's five cases re-derived EXHAUSTIVELY on the fixture)* | `P-TP` totality | **For EVERY entry of the row's `6`-entry × `4`-drive table, the read surface is TOTAL: the answer is a `StoreReadResult` (a hit, a miss, or a merged answer) or a typed refusal record; `found` is a `boolean`; `tier` is one of the four tokens or `null`; `cache` is a tier handle or `null`; `name` is the caller's own spelling; and `parts`/`merged` are ABSENT on the miss and the first-hit arms.** | **YES** *(the `6` fixtures × `4` drives IS the declared grid; every cell has its own declared kind)* | `M-1`…`M-5`, `F-6`, `F-25`, `I-4`, `I-13`, `R-13` | `S-SC-TOTAL-2` | **`24` attempts** = **`6` fixtures × `4` drives**, one call each. **The `6` fixtures:** all-cold · one-tier-resident · two-tier-shadowed · parent-resident-with-a-resident-descendant · descendant-only-resident · a reserved declaration's own name. **The `4` drives:** the unqualified spelling · the qualified spelling of the answering tier · the qualified spelling of a NON-answering tier · the `get`/`has` pair on the answering tier. |
| **`P-SC-IM-8`** *(THE CONSTRAINT/REPAIR EVALUATION ACROSS THE WRITE'S POST-STATE — the `§8.2` corrected row (v)'s first subject, incl. the `R3-1` zero-active arm and the `≥2` referent)* | `P-IM` invariant | **For EVERY of the row's `11`-case table: a violating write is REPAIRED, NEVER REFUSED, and repaired IN THE SAME COMMITTED WRITE — so the receipt's post-state never violates the constraint; `0` active → the NEXT SURVIVING entry by the caller's own order, WRAPPING to the first; `≥2` active → every active entry except the referent is deactivated, the referent being the caller's own written reference OR, on a `remove`-triggered evaluation, THE REMOVED ENTRY'S OWN INDEX; the repair consults NO insertion time, NO tie-break and NO store-side preference; the repair emits its OWN `cause:'repair'` event carrying the repaired value; the caller's own write still emits its own event; the repair is subject to the clear rule and clears NOTHING if the higher tier refused; and the table declares EXACTLY ONE row whose refusal reason is `null`.** | **YES** *(a fixed case table over a closed violation set; every case has its own declared repair and its own receipt)* | `M-14`, `F-17`, `F-19`…`F-22`, `M-19`, `R-15` | `S-SC-REPAIR-1` | **`22` attempts** = **`11` cases × `2` evaluation points** (the `set`/`commit` arm and the `remove` arm). **The `11` cases:** `0` active at boot · `0` active after a close of the first entry · `0` active after a close of the LAST entry (the WRAP) · `0` active after a close of a middle entry (the NEXT by order) · `≥2` active from a write (the caller's own value is the referent) · `≥2` active from a `remove` (the REMOVED entry's own index is the referent) · `≥2` active from a `remove` of the LAST entry (the WRAP) · one active, written again (no repair) · a repair whose higher tier REFUSES (it clears nothing) · a repair that itself would violate a SECOND constraint (the cascading case — the table does not load) · the one-row table's own shape (`refusalReason === null`). |
| **`P-SC-TP-4`** *(THE MERGED READ and its `parts` members — the `§8.2` corrected row (v)'s second subject)* | `P-TP` totality | **For EVERY of the row's `6`-case × `4`-claim table, the merged arm's members hold: `parts` is NON-EMPTY and ORDERED by the overlay order (`file` → `mem` → `temp`); every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path; `tier` is `null` and `merged` is `true`; `cache` is `null`; the value is a composite no single tier holds; and a merge runs ONLY where NO tier holds the read path — with a resident parent and a resident descendant, the first-hit arm answers instead and `parts`/`merged` are ABSENT.** | **YES** *(the `6` shapes × the `4` claims IS the declared grid; every cell has its own declared reading)* | `M-5`, `F-6`, `I-4`, `I-6`, `I-13`, `R-13` | `S-SC-MERGE-1` | **`24` attempts** = **`6` shapes × `4` claims**. **The `6` shapes:** a `file`-held child only · a `file`-held child plus a `temp`-held grandchild · the same path held in `file` AND `temp` (the overlay wins by durability order) · a `mem`-held child only · a resident parent with a resident descendant (the boundary case) · a resident parent with NO resident descendant. **The `4` claims:** `parts`' ORDER · `parts`' PATH identity · the `tier`/`merged`/`cache` triple · the value's non-authoritative status. |
| **`P-SC-TP-5`** *(THE RESIDENCY TRIE's two queries, its totality, its node bound and its floor — the `§8.2` corrected row (v)'s third subject + the record's `C-6`)* | `P-TP` totality | **For EVERY step of the row's `6`-step × `4`-pool table: `holdsExact` answers `true` exactly for a path the tier holds and `false` for a prefix, a descendant and an absent path; `holdsDescendantBelow` answers `true` exactly for a STRICT descendant and `false` when the tier holds the path itself and nothing below it; BOTH are TOTAL over every string argument including `''`, a non-string and an empty-segment path, and NEITHER throws; AFTER `N` writes and `M` removals each query agrees with a LINEAR SCAN of the tier's table; and AFTER a `sweep` the node count equals the resident set's own segment total (THE FLOOR), never one empty branch per swept episode.** | **YES** *(the `6` steps × the `4` pools is the declared grid; every step has its own expected reading)* | `M-11`, `M-12`, `R-14`, `I-14`, `I-15` | `S-SC-TRIE-1` | **`24` attempts** = **`6` steps × `4` paths**, with the linear-scan differential re-run after EVERY step. **The `6` steps:** empty · after one write · after a shared-prefix second write · after a `remove` that prunes an interior node · after a `clear` · after a `sweep`. **The `4` paths:** the exact path · a prefix of it · a strict descendant of it · an absent path. |
| **`P-SC-IM-9`** *(the SUBSCRIPTION surface's realm scope, count and release — `S-RH-1`, and `RH-1`'s realm-scoped half)* | `P-IM` invariant | **For EVERY of the row's `6`-case table: a subscription's count for one subscribed reference reads EXACTLY `1` after `1` construction, `N` loads and `M` further re-derivations; a graph re-derivation neither creates, destroys nor duplicates one; `unsubscribe()` answers `true` once and `false` thereafter; `reset()` releases every subscription (`0` remaining); a realm teardown releases them; a NON-CALLABLE listener registers NOTHING; a listener that THROWS does not propagate to the mutator's caller; and the prefix/tier-wide form is REFUSED past `CAP-3`.** | **YES** *(a fixed case table over a closed subscription life cycle)* | `M-18`, `F-18`, `I-15`, `R-10`, `R-16` | `S-SC-SUB-1` | **`6` attempts** = **`6` life-cycle steps**: register one exact subscription · register a second on the same reference (`2` live, `1` count per reference is NOT violated because the count is PER SUBSCRIPTION) · re-derive `N` times · unsubscribe once · unsubscribe twice · `reset()`. **`RH-1`'s falsifier rides `P-SC-TP-1`'s own row and is NOT a register row here — see `§6` item 4.** |
| **`P-SC-TP-6`** *(THE NO-VOCABULARY / NO-GEOMETRY SCAN, in executable form, with its controls)* | `P-TP` totality | **For EVERY of the row's `5`-corpus table, the scan's verdict is the declared one: the module's raw bytes carry NO consumer noun as store vocabulary, NO `is-*` literal, NO unit string, NO path/file/`fs`/`node:*`/`process`/`document`/`window` token, NO geometry-observation call and NO coordinate read; and the scan's positive controls FAIL exactly as declared — a fixture carrying `node:fs`, and a row DESCRIPTION claiming a magnitude, must each FAIL.** | **YES** *(the `5` corpora ARE the declared grid: the module's bytes, the test file's bytes, the test file's row descriptions, and the two positive-control fixtures)* | `M-19`, `F-25`, `R-1`, `R-6`, `R-7`, `I-3`, `I-10` | `S-SC-SCAN-1` | **`5` attempts** = **`5` corpora**, one scan each. **The `5`:** `store-core.ts`'s raw bytes · `store-references.ts`'s raw bytes · `tests/store-core.test.ts`'s raw bytes · a synthetic corpus carrying one banned token (MUST FAIL) · a synthetic corpus carrying an ordinary count description (MUST PASS). |
| **`P-SC-IM-10`** *(THE IMPORT CENSUS and the NO-MODULE-LEVEL-BINDING row — the two `§5.2.7` item (4) rows this unit owes the ANALOGUES of)* | `P-IM` invariant | **For EVERY of the row's `5`-fixture table: `store-core.ts` carries EXACTLY ONE import statement (`store-references.js`, the row type only), `store-references.ts` imports nothing, and NEITHER file carries a module-level mutable binding holding a store, a tier, a table, a listener set or the seam flag. The positive control: a fixture importing `src/main/**` and a fixture with a module-scope `const store = createStore(...)` each FAIL.** | **YES** *(a fixed fixture table over a closed import/binding space)* | `R-10`, `R-11`, `I-1`, `§1` item 1 | `S-SC-CENSUS-1` | **`5` attempts** = **`5` fixtures**: the two real files · a fixture adding a second import statement · a fixture importing `src/main/**` · a fixture with a module-scope store binding. **Each attempt reads the file's own import statements and top-level declarations BY NAME.** |
| **`P-SC-IM-11`** *(THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL, with the CANONICAL STRUCTURAL COMPARATOR)* | `P-IM` invariant | **For EVERY pair of (store state, exported read-surface call) in the row's `5 × 4` grid, the call's answer is IDENTICAL across two runs whose ONLY difference is the store's tier state: the answers are `===`-identical where the answer is a primitive, and IDENTICAL UNDER THE CANONICAL STRUCTURAL COMPARATOR where the answer is an object — `parts` ABSENT is compared as ABSENT (an `undefined` member is not a present member), `cache` is compared BY IDENTITY against the SAME tier handle across both runs, and `found`/`tier`/`merged`/`name` are compared by value. A function is a function of its arguments iff this differential holds; A BODY THAT CONSULTS AMBIENT STATE OUTSIDE ITS ARGUMENTS FAILS.** | **YES** *(the `5` states × `4` calls IS the declared grid; every cell names its comparison)* | `R-4`, `I-1`, `I-12`, `§5.2.7` item (4)(c) | `S-SC-DIFF-1` | **`20` attempts** = **`5` store states × `4` calls**, each call driven TWICE on a freshly-constructed store in the same state and the two answers compared. **The `5` states:** all three tiers cold · a `temp` shadowing value · a `mem` shadowing value · a committed `file` value with the lower copies cleared · a removed path (the miss state). **The `4` calls:** an unqualified `read` · a qualified `read` · the tier-local `get` · the tier-local `has`. **THE CANONICAL STRUCTURAL COMPARATOR, pinned here because `===` is UNSATISFIABLE for an object-returning call: a deterministic serializer that emits an object's OWN ENUMERABLE OWN KEYS SORTED, each value rendered recursively by the same rule, PRIMITIVES BY VALUE (with `-0` and `NaN` distinguished by `Object.is`), `undefined`-valued members OMITTED so ABSENT and `undefined` are compared as the same absence, and tier handles replaced by their `tier` token. IT IS WRITTEN IN THE TEST FILE, it adds NO dependency, and it is NOT a comparison seam in the module.** |
| **`P-SC-IM-12`** *(THE CAPS and their OVERFLOW OUTCOMES, with the below-cap positive control)* | `P-IM` invariant | **For EVERY of the row's `3`-cap × `2`-half table, the outcome is the declared one: at the cap the operation is REFUSED with `reason:'cap-exceeded'`, `cleared: []`, `events: 0`, and the store's tables BYTE-IDENTICAL to their pre-call state; ONE ELEMENT BELOW the cap the same operation COMMITS — and NO eviction, FIFO drop, LRU drop, lower-tier clear or event ever accompanies an overflow.** | **YES** *(three caps × the boundary pair is the declared grid)* | `M-13`, `F-18`, `I-4`, `R-3`, `§2.9` item 2 | `S-SC-CAP-1` | **`6` attempts** = **`3` caps × `2` halves** (at the cap · one below). **`CAP-1` is driven by filling one declared `mem` collection to its value and then one past it; `CAP-2` by filling `temp` to its value and one past; `CAP-3` by registering subtree/prefix subscriptions to the value and one past. **A reported DISTINCT figure is carried BESIDE this term: the `6` drives observe `3` distinct outcomes, because the refusal and the acceptance are the same two shapes for each cap.** |
| **`P-SC-IM-13`** *(THE TEST SEAM's shape and its PRODUCTION-NEGATIVE row)* | `P-IM` invariant | **For EVERY of the row's `5`-case table: with `{enableTestSeam:true}` the store carries `reset` and `seed` as callable members; WITHOUT it `'reset' in store === false` and `'seed' in store === false` and the store's own key set is EXACTLY the `10` members the `Store` interface declares; `reset()` clears the three tables AND the three tries to their floor AND releases every subscription AND emits NO event; `seed(rows)` drives each row through the ORDINARY write path so an undeclared row is REFUSED and leaves the store unchanged; and each of `reset()`/`seed()` WITHOUT the seam THROWS the declared `StoreSeamError` — the only two throws besides `createStore`'s LOAD REFUSAL.** | **YES** *(the `5` cases ARE the declared seam domain)* | `R-10`(c), `F-25`, `I-2`, `§2.8` item 3 | `S-SC-SEAM-1` | **`5` attempts** = **`5` cases**: seam ENABLED (members present) · seam ABSENT (key set exact and `'reset' in store === false`) · `reset().`'s full effect · `seed()` with one legal and one undeclared row · `reset()`/`seed()` on a seam-less store (the two throws). |
| **`P-SC-TP-7`** *(THE EPISODE LIFECYCLE's TRANSITIONS — the `remove` arm and the reachability of `P-SM`'s terminals)* | `P-TP` totality | **For EVERY terminal of the row's `8`-state machine, the terminal is REACHABLE from the initial state and the machine has NO unreachable terminal; and `remove`'s post-state evaluation is ONE OF ITS TRANSITIONS — so a close that removes the last active entry reaches the repaired terminal IN THE SAME OPERATION and never passes through a violating intermediate state.** | **YES** *(the transition table IS the machine; every terminal has its own declared reaching path)* | `M-14`, `F-19`…`F-21`, `I-14`, `R-15` | `S-SC-REACH-1` | **`20` attempts** = **`8` terminals × the reaching paths the row enumerates (a `set`, a `commit`, a `remove`, a `clear`, a `sweep`, a repair, a realm teardown and a boot hydration), one drive per declared (terminal, path) pair** — **the count is the DECLARED PAIR COUNT, not `8 × 8`.** |

### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

1. **THE `(bounded)` SET IS `2` ROWS AND NO OTHERS: `P-SC-TP-1` and `P-SC-TP-2`.** *(As first drafted this block
   marked three; `P-SC-TP-2`'s `8 × 5` IS its whole declared domain — the inputs and the surfaces are both closed
   and named — so the marking was corrected to `2` in the same pass, and the as-drafted `3` is kept visible here
   rather than silently rewritten.)* **Every other row's property text quantifies over EXACTLY the domain its
   table carries.** **A row whose property text quantifies over a LARGER domain than its table carries MUST carry
   the marking, and it is a FAILURE to omit it.**
2. **THE TWO COMPONENT-BREAKDOWN RECOMMENDATIONS, stated so the count is not read as a trim.** **(a)** The register
   is `20` rows because the MODEL has `20` discernible testable properties; **`8` is a SIGNAL and `20` is an
   OUTCOME.** **(b)** The three families are `9` + `3` + `8` (`IM` + `SM` + `TP`), **so the breakdown signal is
   carried by family, named, rather than hidden inside a single figure.**
3. **THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING, PER ROW.** **Every row's table is a SUBSET of the input
   space THIS CONTRACT pins**, and **the check's per-row verdict is `CLEAN` for all `20`** — **stated as a
   determination this filing made by READING its own tables against `§2`'s declared domains, NOT as a measurement
   of a run** (nothing was run; `CURRENT STATE` item 1).
4. **WHAT THE REGISTER DOES NOT PROVE.** **(a)** It proves nothing about the tier-1 CHANNEL (the crossing seam is
   stubbed). **(b)** It proves nothing about a rendered surface, a pane, a zone, a tab strip or the app. **(c)** Its
   pinned-seed rows are SAMPLES of a larger domain and are marked accordingly. **(d)** It is `[T]` evidence exactly
   as a `§3` row is, and **no register row may be read as `[H]`, `[U]`, `[D]` or APP evidence.**
5. **THE ANTI-AMBIENT CLAIM's own instrument.** **`P-SC-IM-11` is the ONLY row that actually EXECUTES the
   store-state-independence claim** — the plan's own words: it is *"the instrument that actually executes it"*.
   **A passing `P-SC-IM-11` is evidence that the four named read-surface calls are functions of their arguments
   over the five named states — and NOT a proof that no other function has an ambient read.** **That is a stated
   BOUND, not an omission.**
6. **THE `R-16` FALSIFIER's OWN SUBPATH ROW IS NOT A REGISTER ROW, and it is named here so it is not lost.** **The
   `finalizeHookCount` differential is a `[T]`-reachable falsifier owned by the DONE row's item 12 and by `§6` item
   4; it is NOT one of the `20`, because it measures an ENGINE fact (`RH-1`), not this store's own semantics.** **It
   MUST import `finalizeHookCount` from the `provident-ssr/core/registry` SUBPATH — an import from the package's
   MAIN ENTRY FAILS TO COMPILE, which is the cheapest possible red.**

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

| The row | Its declared term |
| --- | --- |
| `P-SC-IM-1` | **`30`** = `10` names × `3` residency states |
| `P-SC-IM-2` | **`28`** = `7` reference classes × `4` operation/tier drives |
| `P-SC-SM-1` | **`24`** = `8` states × `3` variants |
| `P-SC-TP-1` | **`40`** = `8` pinned-seed draws × `5` entry-point drives *(bounded)* |
| `P-SC-IM-4` | **`40`** = `10` registry cases × `2` halves |
| `P-SC-IM-5` | **`9`** = `3` matcher cases × `3` operations |
| `P-SC-IM-6` | **`14`** = `7` event arms × `2` observation points |
| `P-SC-IM-7` | **`8`** = `8` subscriber classes × `1` operation |
| `P-SC-TP-2` | **`20`** = `4` name families × `5` surfaces *(bounded)* |
| `P-SC-TP-3` | **`24`** = `6` fixtures × `4` drives |
| `P-SC-IM-8` | **`22`** = `11` constraint cases × `2` evaluation points |
| `P-SC-TP-4` | **`24`** = `6` merge shapes × `4` claims |
| `P-SC-TP-5` | **`24`** = `6` trie steps × `4` paths |
| `P-SC-IM-9` | **`6`** = `6` subscription life-cycle steps |
| `P-SC-TP-6` | **`5`** = `5` scan corpora |
| `P-SC-IM-10` | **`5`** = `5` census fixtures |
| `P-SC-IM-11` | **`20`** = `5` store states × `4` calls |
| `P-SC-IM-12` | **`6`** = `3` caps × `2` halves |
| `P-SC-IM-13` | **`5`** = `5` seam cases |
| `P-SC-TP-7` | **`20`** = the declared (terminal, reaching-path) pair count |

**THE TERM-BY-TERM ADDITION, so a mis-sum is visible to a reader without arithmetic of their own:**
**`30 → 58 → 82 → 122 → 162 → 171 → 185 → 209 → 229 → 269 → 293 → 315 → 339 → 345 → 350 → 355 → 375 → 381 → 386
→ 400`.**

**FOUR OF THE TABLE'S CELLS WERE CORRECTED IN THIS PASS SO THAT EVERY CELL AGGREGATES TO THE TERM THIS TABLE
DECLARES, AND THE CORRECTIONS ARE STATED HERE RATHER THAN SMOOTHED (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`,
cited by row name: a declared term is a DRIVE count, and assertions and readings are printed BESIDE it and never
counted in it).** **THE FOUR, with the drive form each now prints:**

- **`P-SC-TP-1`'s cell now prints its own DRIVE form `8 × 5 = 40`; its earlier draft printed `9 × 5 = 45`** and the
  declared term has been `40` throughout — **the `20`-member pool draws `8` times, and no "all 20 drawn" claim is
  made.**
- **`P-SC-IM-5`'s cell now prints its own DRIVE form `3 × 3 = 9`; its earlier draft printed `12 × 3 = 36`** — **the
  remaining `9` matcher cases are ASSERTIONS carried inside those drives**, the resolved declaration being read
  once per drive and asserted per case, **which is exactly the drive-vs-assertion distinction.**
- **`P-SC-IM-7`'s cell now prints its own DRIVE form `8 × 1 = 8`; its earlier draft printed `8 × 3 = 24`** — with
  the other two operations' delivery vectors carried as assertions over the same eight drives.
- **`P-SC-TP-2`'s cell now prints its own DRIVE form `4 × 5 = 20`; its earlier draft printed `8 × 5 = 40`** —
  because the `secure` family's four members answer ONE surface path each and the `get`/`has` pair is ONE drive,
  **and the `8` inputs remain enumerated and asserted inside it.**

**NO ROW'S PROPERTY, ENUMERATED CASE SET OR `(bounded)` MARKING MOVED — what was corrected is the DRIVE FORM each
cell prints.** **The `(bounded)` marking stands on `P-SC-TP-1` and `P-SC-TP-2` regardless of the term.**
**`P-SC-TP-7`'s cell prints its own declared pair count (`20`) rather than a cross-product, which is why it is NOT
one of the four.**

**CAPS, COMPARED AGAINST THE DECLARED FIGURES: `400 ≤ 400` ✔ · per-row maximum `40` (`P-SC-TP-1` and `P-SC-IM-4`
each) ≤ `100` ✔ · stop-after-5-consecutive-failures: NOT TRIGGERED at filing (nothing ran) — the status is the
DONE row's to report.**

**THE FOUR DISTINCT-DRIVE FIGURES, REPORTED BESIDE THE TERMS AND NEVER SUBSTITUTED FOR THEM: `P-SC-IM-6` `14`
declared / `7` distinct envelopes · `P-SC-IM-7` `8` declared / `3` distinct delivery vectors · `P-SC-IM-12` `6`
declared / `3` distinct outcomes · `P-SC-SM-1` `24` declared / `9` distinct successor sets (several state/variant
pairs share a successor set).**

---

## 6. Falsification / stop conditions

**Per claim, a row that can actually redden — and for every behavioural claim, the falsifier that would overturn it.**

1. **THE MODEL'S TIER DOMAIN.** **Falsifier: a `read`/`set`/`commit`/`remove`/`clear`/`get`/`has` that accepts a
   tier token outside the four, or that answers a tier token outside the four.** Row `F-7`, `P-SC-TP-1`.
2. **THE READ'S TERMINATOR.** **Falsifier: a `read` that answers a value from a tier BELOW a hit, or that consults
   a tier after a hit has been found.** Row `M-1`, `P-SC-IM-1`.
3. **THE `secure` PRECEDENCE.** **Falsifier: an undeclared `secure.*` name answering `'undeclared-name'`, or a
   `secure.*` name whose refusal required a registry lookup.** Row `F-1`, `P-SC-TP-2`.
4. **`RH-1`'s REALM-SCOPED RELEASE (`S-RH-1`), AND ITS SUBPATH IMPORT.** **THE FALSIFIER, exact: read
   `finalizeHookCount()` before and after `1` construction, then after `N` loads, then after one `validate` —
   predicted `1`, then `1 + N`, then `1 + N + 2`; under the store's own realm discipline the discarded generations'
   hooks are released and the count does not grow with `N` — AND **the row's import statement MUST read
   `provident-ssr/core/registry`; the same identifier imported from the package's MAIN ENTRY FAILS TO COMPILE, which
   is a runnable red and the cheapest possible form of this falsifier.** Row `R-16`, `P-SC-IM-9`.
5. **THE TRIE'S FLOOR.** **Falsifier: after `M` gestures and a sweep, a tier's trie still reports more nodes than
   its own table's resident set requires.** Row `M-11`, `P-SC-TP-5`.
6. **THE ONE-EVENT-PER-AFFECTED-REFERENCE COUNT.** **Falsifier, and it is the plan's own `L-3`: `commit('file.p',
   v)` with a live subscriber on `mem.p` — that subscriber observes EXACTLY `1` event, `cause:'clear'`, on `mem.p`;
   a body that reports `0` (no event reaches the cleared reference's own subscriber) or `2` (the committed
   reference's own subscriber sees two) FAILS.** Row `P-SC-IM-7`. **AND the drag's own commit is still exactly ONE
   reference and therefore still agrees at `1` with `E10-SINGLE-SINK-CHANNEL`'s two-readings-agree clause — which is
   cited by row name and is NOT re-litigated here.**
7. **THE ZERO-ACTIVE REPAIR'S SELECTION.** **Falsifier, the plan's own `L-1`: with the caller's order `[A,B,C]` and
   `B` active, a close of `B` activates `C` — a body that activates `A` FAILS; with `C` active, a close of `C`
   activates `A` (the WRAP) — a body that activates `B` FAILS; and a `remove`-triggered `≥2` repair deactivates
   every other active entry and reports the winner BY THE REMOVED ENTRY'S INDEX, never by insertion order.** Row
   `F-19`, `F-20`, `P-SC-IM-8`.
8. **THE `remove`'s DOWNWARD CLEAR.** **Falsifier, the plan's own: `set('mem.p', v)` then `remove('file.p')` — a
   subsequent `read('p')` must MISS, not answer the `mem` copy.** Row `M-16`, `F-23`, `P-SC-IM-2`.
9. **A REFUSED WRITE CLEARS NOTHING AND EMITS NOTHING.** **Falsifier: a refused `commit` whose lower-tier copies
   have changed, or whose subscribers received any event.** Row `F-3`, `F-23`, `R-3`.
10. **THE CAPPED COLLECTIONS.** **Falsifier: an overflow that evicts, that silently drops, that clears a lower
    tier, or that is not a refused receipt with `cleared: []` and `events: 0`.** Row `F-18`, `P-SC-IM-12`.
11. **THE ADMISSION AND THE LEDGER.** **Falsifier: any `docs/next-steps.md` count moving under this unit's name
    before the architect grants the DONE row; any proposal unit started; any `src/shared/**` byte moving.** Rows
    `§3.5 R-10`(b), `§3.5 R-11`, `§5.1`'s DENIED set.
12. **THE FIVE INVENTIONS.** **Each is falsified by the row it lands in: the declaration fixture by `P-SC-IM-4`'s
    positive controls; `storeReferences`' home by `R-11`'s single-import census; the trie's two queries by
    `P-SC-TP-5`; the caps by `P-SC-IM-12`; the seam and the refusal union by `P-SC-IM-13` and `P-SC-TP-2`.**
13. **THE ROUTED AMENDMENTS.** **Falsifier: any edit under this pass's name to `docs/specs/mcp-endpoint.md` §3.8,
    `docs/specs/focus-tool.md`'s refusal rows, `docs/specs/focus-model.md`'s refusal rows,
    `docs/specs/focus-tool-greens.md`'s `FT-09`, `docs/specs/gutter-ui.md` §2.3 row 16, or `docs/FORKER.md` — each
    is a ROUTED gate with its own owner and NONE is this unit's.**

**AND THE ONE THING THIS CONTRACT EXPLICITLY DOES NOT DO: it makes NO claim about the tier-1 channel's behaviour,
the migration, the security tier's own API, the two authored pages, the rendered tab strip or the fifteen shared
modules' obligations.** **Those are `G2`, `G3` and the five PROPOSALS', and a clause of this file read as reaching
them is a finding against this file.**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **THE UNIT IS NOT GREEN, NOT RED, AND NOT IMPLEMENTED.** **Its red set does not exist** (`CURRENT STATE` item 1).
2. **`RCA-12` BINDS EVERYTHING ABOVE: a `[T]` green is envelope/pure-layer evidence, and for `U-STORE-CORE` there is
   no other layer it could reach.** **No row of this unit claims a rendered, assembled or persisted fact.**
3. **THE STORE'S OWN `[H]` HALF — the renderer wiring's construction and subscription role — is the wiring's, and a
   clause of this file that reads as landing it is a finding** (`§5.1` row 7).
4. **`cache` IS A LIVE OBJECT REFERENCE AND CANNOT CROSS AN IPC BOUNDARY** (`docs/specs/mcp-endpoint.md` `P-E6`).
   **This is WHY the store is renderer-realm, and it is a boundary FACT, not a design preference.**
5. **THE MODEL'S OWN CENTRAL PERFORMANCE CLAIM — a read costs ZERO CROSSINGS — is untouched by this unit, and this
   unit makes NO TIMING FIGURE of any kind.** **No timing figure exists in this file, and a later pass may not
   introduce one without its own measurement.**
6. **THE STORE REFUSES NAMES AND TIERS, NEVER SIZES.** **There is no store-side clamp, and `clampToBounds` stays the
   family's ONE clamp site** (`S-PURE-4`, cited by row name).
7. **THE MERGED VALUE IS NON-AUTHORITATIVE.** **No tier holds it; it is recomputed on every read; and a row that
   treated it as committable or cacheable FAILS.**
8. **THE `7` ROUTED/CITE-ONLY SITES AND THE `2` LANDED INCONSISTENCIES THE ARCHITECT CORRECTED are the
   architect's, not this unit's**: `docs/decisions.md`'s facility row's clause 2, `docs/FORKER.md` §1's cell and
   §4's `### PERSISTENCE` block, `mcp-endpoint.md` §3.8, `focus-tool.md`'s refusal rows, `gutter-ui.md` §2.3 row
   16, `census.md`'s `A-19` probe, and the ten shared-module contracts' no-store language. **Each is cited by
   section and row; none is edited here.**
9. **TWO ITEMS ARE `CARRIED`, EACH WITH A NAMED OWNER AND A POSITIVE REVISIT CONDITION — no bare `OWED` appears in
   this file.** **(a) `docs/decisions.md`'s facility row clause 2's reconciliation** (owner: **the architect**;
   revisit condition: the next `docs/decisions.md` pass — **no admitted unit consumes clause 2**). **(b)
   `zones.md` `P-4`'s general-form supersession's missing `docs/decisions.md` row** (owner: **the architect**;
   revisit condition: the next `docs/decisions.md` pass — **the store's rows bind no `P-4`-governed module**).
10. **`docs/pending.md` `P-4`'s `§5.9` unread-row sweep is OWED TO THE FIRST ADMITTED UNIT'S GATE-1 PASS — and that
    is this unit.** **It is NOT performed by this pass** (this pass is the SPEC gate, and it edits no existing
    file), **and it is carried with its owner named: the pass that opens `G1`'s gate-1 chain.** **Its presence here
    is a DISPOSITION with an owner, not a bare `OWED`.**
11. **THE LEDGER IS UNMOVED.** **`docs/next-steps.md` reads `21 DONE / 3 open` UNITS = `24`; row `G1`'s spec cell
    still reads `OWED — not filed`; and this pass moved no count** (`RCA-8(f)`: the architect admits ROWS, not a
    pass).
12. **THIS PASS RAN NOTHING AND COMMITTED NOTHING.** **No `npm test`, no leg, no `tsc`, no `typecheck:tests`, no
    build, no Electron boot, no MCP session, no `git` command.** **Every figure in this file is either this pass's
    own file read or a figure quoted from a named artifact with that ownership stated.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**ONE clause is reported rather than guessed, and it is narrow.** **`§2.6` item 6's `reserved-namespace` rule
names the CALLER's reserved-namespace set as its input, and NEITHER the plan nor the record states what that set
CONTAINS for this repo** — the model's own worked instance is the module registry's settings-object collision, which
is `U-STORE-PERSIST`'s migration. **This filing therefore declares the set as a FACTORY INPUT (the caller supplies
it) and drives it with a fixture member in `tests/store-core.test.ts`.** **A TestWriter CAN derive a falsifiable row
from that** — the rule, its token and its positive control are all pinned — **so this is a REPORT, not a blocked
clause.** **Everything else in this file is derivable.**

### 7a.1 THE DECISION REQUESTS — six items, each with a working default, a recommendation, and what it affects

**These are the clauses this filing could NOT derive from the plan's bytes. Each is IMPLEMENTED as a working
default in `§2`, so the red set is authorable today. The architect's ruling on any one of them is a spec amendment
with its own gate, and NO item is `undefined-until-answered`.**

| # | The decision | Options | RECOMMENDATION | What it affects if reversed |
| --- | --- | --- | --- | --- |
| **1** | **The declaration FIXTURE's supplier** (the record's `C-3`) — the plan supplies the registry's names from `U-STORE-FOCUS`, an **UNADMITTED** unit | **(a)** a **test-only fixture carried by this spec and authored in this unit's own test file**, with GENERIC caller-style spellings and a production-negative row; **(b)** wait for `FOCUS`'s declaration set — **blocked, `FOCUS` is a PROPOSAL**; **(c)** read the record's `N-18` resolution as putting the real tenant names in `CORE`'s contract | **(a)**, **with (c) as the eventual ordering** — the fixture keeps `R-1`'s scan of the module's own bytes **VACUOUS of exemptions**, which (c) alone would not | `§2.6` item 7, `§5.5.1`'s fixture paragraph, `P-SC-IM-4`'s controls. **Reversing to (c) requires a `§2.6` re-write AND a `§5.1` diff-scope widening, and it would put the caller's spellings inside a file whose scan must stand vacuous** |
| **2** | **The REFUSAL UNION's eighth member** — the plan names seven tokens and never closes the set; **`§2.9`'s three caps need a distinguishable overflow outcome** | **(a)** add **`'cap-exceeded'`** as the eighth member; **(b)** reuse an existing token for the overflow (e.g. `'malformed-name'`); **(c)** leave the caps' overflow undeclared | **(a)** — **(b) would make a cap overflow indistinguishable from a malformed input, which is exactly the discrimination the caps' rows need**; **(c) is refused by the record's `C-7`** | `§2.1`'s `StoreRefusalReason`, `§2.6` item 3's mapping table, `§2.9` item 1, `F-18`, `P-SC-IM-12`, `P-SC-TP-2` |
| **2a** | **The `ambiguous-path` refusal's SCOPE** — as filed it reads *"a path resident in more than one tier is refused unless the caller names the tier"*, while **the plan's own printed `remove` falsifier requires a `file`-qualified `remove` to SUCCEED with a `mem` copy resident** | **(a)** scope the refusal to the **tier-free** form alone (which `§2.10` item 3(e) already refuses as `'malformed-name'`), leaving the token **declared but currently unreachable**; **(b)** scope it to *"the named tier holds nothing but another tier does"* — a **tier-mismatch** case that is **already** `'undeclared-name'` under `P-SC-IM-2`; **(c)** keep the as-filed wording | **(a)** — **it is the only reading under which BOTH the plan's falsifier and the refusal's existence hold**; **it does not add a member to the union, and it leaves the token visible for a future caller form that genuinely cannot name a tier** | `§2.10` item 3(e), `§2.6` item 3, `I-4`, `P-SC-IM-2` |
| **3** | **The TRIE's two queries** — the plan's stated totality property cannot distinguish *exact leaf* from *has prefix* | **(a)** pin `holdsExact` + `holdsDescendantBelow` as **private, exposed ONLY through the declared test seam**; **(b)** make them public read members; **(c)** derive them from the tier's own table each call (no trie) | **(a)** — **(b) adds an undocumented read surface, which is the second-authority class**; **(c) abandons the trie the model requires and its own cost claim** | `§2.7` item 4, `§2.8` item 2, `P-SC-TP-5`, `M-11` |
| **4** | **EVERY CAP VALUE and its overflow outcome** (the record's `C-7`) — the plan requires the caps and states no value and no outcome | **(a)** the filing's derived values — tier-2 collections `1024`, tier-3 entries `4096`, prefix/tier-wide subscriptions `64`, each with a REFUSAL outcome; **(b)** different values; **(c)** no caps | **(a)** — **the values are derived from the model's own worst cases and every one is architect-reversible; the OUTCOME (a refusal that clears nothing) is not reversible, because `C-3` fixes it** | `§2.9`, `M-13`, `F-18`, `P-SC-IM-12` |
| **5** | **The `test-only reset/seed` seam's shape and placement**, and the record's `C-8`'s production-negative row | **(a)** the filing's shape — two OPTIONAL members on the store, present only under `{enableTestSeam:true}`, key-ABSENT otherwise; **(b)** a separate test-only module; **(c)** no seam, with a fresh store per case | **(a)** — **(b) makes the seam a live surface by construction unless the same flag gates it, and the flag's absence is what the production-negative row asserts; (c) is workable but forces every state-dependent row to re-construct and re-declare, which the register's `20` rows would pay for repeatedly** | `§2.8`, `R-10`(c), `P-SC-IM-13`, `F-25` |
| **6** | **`src/renderer/store-references.ts`'s EXPORT CENSUS** — the file is NEW and its shape is this contract's invention | **(a)** one value export (the table) + two type declarations (the row type and the pattern type); **(b)** hoist the table into `store-core.ts`; **(c)** export the row type from `store-core.ts` instead and keep the data in a JSON-ish literal | **(a)** — **it keeps the caller's spellings out of the module whose `R-1` scan must stand vacuous, and it keeps `store-core.ts`'s import census at EXACTLY ONE statement** | `§2.6` item 1, `§5.1` rows 1/2, `R-11`, `P-SC-IM-10` |

---

## 8. Supersession / citation index

**This filing SUPERSEDES nothing and AMENDS no landed row.** **It DERIVES the plan and the record, and it records the
corrections it obeys.** **One row each, so a reader can complete the set without assembling it:**

| # | The clause this filing carries, and where it comes from | Its status here |
| --- | --- | --- |
| 1 | the plan's `§1.2` round-3 clause (a) — **`parts` names the tier's own path, NEVER the read path** | **DERIVED** at `§2.5` item 5 row 2 and `M-5`; **the as-filed example is not carried** |
| 2 | the plan's `§1.9` (ii) round-3 clause (b) — **the FIRST-HIT ARM WINS over the merged arm** | **DERIVED** at `§2.5` item 6 and `F-6` |
| 3 | the plan's `§1.4` round-3 block — **`remove` clears DOWNWARD** (`R3-6`), superseding `C-4-R2`(a)'s tier-local wording **beside** | **DERIVED** at `§2.10` item 3; **the as-filed wording is NOT carried** |
| 4 | the plan's `§1.5` round-3 block — **the arm table is the TOTAL member-set statement** (`N-4`) and **a cleared lower reference fires its own `cause:'clear'`** (`R3-3`) | **DERIVED** at `§2.11` items 2/7, **with `Q-7`'s *"no second clear-event"* read NARROWLY** |
| 5 | the plan's `§1.8` round-2 block — **the pattern table, the precedence, the concrete-beside-pattern rule, `G-9`/`G-10`**; and `G-8` **superseded with no subject** | **DERIVED** at `§2.6` item 5, `F-12`, `F-13`, **and `G-8` is DRIVEN as an absence (`P-SC-IM-4`)** |
| 6 | the plan's `§1.8` round-3 rows `H-5`/`H-6` (`N-16`) — **the tier-local `get`/`has` consults the registry, and a declared-but-unwritten name answers the DECLARED MISS on every surface** | **DERIVED** at `§2.4` items 2/3, `F-9`, `P-SC-IM-2` |
| 7 | the plan's `§8.2` round-3 block (`N-11`) — **the four corrected `CORE` register rows, whose fifth subject is the four omitted subjects** | **DERIVED and EXPANDED** to `20` rows at `§5.5.1`; **the five as-filed/corrected subjects are `P-SC-IM-2`, `P-SC-TP-1`, `P-SC-SM-1`, `P-SC-IM-1` and `P-SC-IM-8`, and the four omitted subjects are `P-SC-IM-8`, `P-SC-TP-4`, `P-SC-TP-5` and `P-SC-IM-5`** |
| 8 | the plan's `§7.1` round-2 block (`S-RH-1`) — **per realm, per reference**; and `RH-1`'s corrected falsifier's **SUBPATH** import | **DERIVED** at `§2.11` item 5, `R-16`, `P-SC-IM-9`, **and `§6` item 4** |
| 9 | the record's `C-4` (the architect's ruling) — **the declaration table is RENDERER-SIDE; the host file holds channel names only** | **DERIVED** at `§2.6` item 1; **both as-filed sites stay visible at their own plan rows and neither is restated here** |
| 10 | layer 1 `§5` `A-2` + `S-d8` `(C)#4` + `NO-FOUNDATION-CONFIG-FILE-FACILITY` clauses 1/**2**/**3** | **CARRIED as obligations**: clause 1 superseded by a LANDED ACTIVE row, clauses 2/3 **SURVIVING**; `§5.1`'s DENIED set is their form here |
| 11 | `S-d11`'s mandatory geometry clause | carries the same clause **verbatim** in `§2.2` `P-11`, **and the clause must appear wherever this store describes a size/placement criterion** — which `§2.5` item 5's merge limit and `§1` item 6's `ZQ-4` sentence each do |
| 12 | `PZT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` | **OBEYED**: the register is authored WITH the contract, its row count is an outcome, its terms are DRIVE counts, and its total is printed with its terms |
| 13 | `E10-SINGLE-SINK-CHANNEL` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` · `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` · `SHELL-CHROME-PANES-ZONES-IN-SCOPE` · `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE` | **CITED BY ROW NAME ONLY, each re-asserted in `§0` and `§2.2` and none restated** |
| 14 | the tab slice's landing-reference precedent (`landing` / `<tabId>`, the `file.tabs.<tabId>.*` matched set, `R3-2`) | **CITED as the model's own worked instance of the concrete-beside-pattern rule (`§2.6` item 5 row 3); NOT this unit's tenant** |
| 15 | the plan's `§1.9` (iv)'s as-filed *"the first surviving entry"* | **SUPERSEDED BESIDE at the plan** — **this filing carries the ruling (`R3-1`), never the as-filed cell** |

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**(`AGENTS.md` RCA-3: the read-only adversarial pass is MANDATORY per completed unit. The read-only PBT audit of
`§5.5.1`'s executed tables is part of the same gate.)**

| id | The seed |
| --- | --- |
| **ADV-SC-1** | **A name whose segments are hostile strings**: `'__proto__'`, `'constructor'`, `'toString'`, a 4 kB segment, a segment with `.` inside a pattern's literal. **The store must treat every one as DATA.** |
| **ADV-SC-2** | **A declaration table that is itself hostile**: a frozen array, a `Proxy` whose `get` traps throw, rows with missing keys, rows whose `tier` disagrees with their name, and a pattern whose `segments` array is mutated after load. |
| **ADV-SC-3** | **A listener that mutates the store during its own delivery** (a `set` inside a subscriber's callback). **The declared post-condition: the fan-out is over the registration order captured at emission, and the inner write is a SEPARATE operation with its own receipt.** |
| **ADV-SC-4** | **A listener that unsubscribes itself (or another) mid-fan-out.** |
| **ADV-SC-5** | **A `remove` that empties the caller's own order while a constraint is declared over it** — the zero-active arm plus the landing case, driven through the STORE's own constraint row rather than the slice's tenant. |
| **ADV-SC-6** | **A cap boundary crossed DURING a repair** (a repair's own write being the element that would exceed a cap). |
| **ADV-SC-7** | **The `cache` member smuggled out of the realm** — a row that JSON-stringifies a read result. |
| **ADV-SC-8** | **A `subtree` subscription on a reference whose own path is written** (does it receive one event or two?). |
| **ADV-SC-9** | **The seam enabled in a production-shaped construction** and the key set read. |
| **ADV-SC-10** | **A merged read whose overlay composes two STRUCTURALLY INCOMPATIBLE values** — the declared answer is a `parts`-visible conflict with NO reconciliation. |
| **ADV-SC-11** | **The tier-local surface on a name whose first segment is a tier other than the handle's.** |
| **ADV-SC-12** | **`reset()` called from inside a listener during a fan-out.** |
| **ADV-SC-13** | **An event emitted for a `remove` whose lower copies were already gone** (`cleared` shorter than the name's reachable tiers). |
| **ADV-SC-14** | **A declaration whose `constraint` id has no row in the constraint table.** |

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**Every finding gets ONE row, and no finding may be filed as a bare `OWED`.** **The admissible dispositions are the
family's four, plus the two the PBT audit adds:** `FIXED CONTRACT-SIDE` · `FIXED TEST-SIDE` · `NOT-A-FINDING (with
its arithmetic)` · `ROUTED (with its owner and its own gate)` · `CARRIED-WITH-OWNER (with a positive revisit
condition)` · `PBT-AUDIT: over-strength / under-assertion / evasion (each dispositioned)`.

| id | Finding | Disposition | Evidence / arithmetic | Owner |
| --- | --- | --- | --- | --- |
| *(to be filled by gate 4)* | — | — | — | — |

**END OF THE CONTRACT.** **Two value exports and eighteen type declarations; a closed four-token grammar; a
five-case read; five mutators with one receipt shape; a pattern registry with its write/load rows `G-1`…`G-10` (of
which `G-8` is superseded with no subject), its read-side rows `H-1`…`H-6`, and their positive controls; a per-tier
trie with two queries and a floor; one constraint row whose outcome is `REPAIR`; a
seven-arm event surface; three caps with declared refusals; a declared test seam with its production-negative row;
a `20`-row typed register whose `400` declared attempts are the sum of their own twenty printed terms; and six
decision requests, each with a working default and a recommendation.**
