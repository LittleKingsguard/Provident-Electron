# Spec — `U-MENULIB`: the consumer-agnostic menu-template builder (one pure normalizer + one platform-shape projector + one injected picker seam)

**Unit `U-MENULIB` · wave `E` · ledger row `E7` · upstream `SCH-5` (`MENU-CATALOG-CONTRACT`, adopted-reshaped,
reason code `ADOPTED-OS-INTEGRATION`) · derives `docs/specs/menulib-review.md`'s conditions `G-1`…`G-10`, its
step-1 `VALID-WITH-CONDITIONS` (15 findings), its step-2 `SOUND-WITH-CONDITIONS` (25 findings), its step-3
derivation and its step-4 `DELEGABLE-WITH-CONDITIONS` verdict · filed 2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/menulib-review.md` is the CLOSED gate-1 record** (four
filed steps: **1** `VALID-WITH-CONDITIONS` · **2** `SOUND-WITH-CONDITIONS` · **3** the derivation — the module,
its exports, the emitted object's pinned member list, the single seam and its four declared degradations, the
OS-boundary/platform ruling, the layer map, the prohibition audit, the 11-row register sketch with the four
domains NAMED, and the DERIVED DENIED set · **4** `DELEGABLE-WITH-CONDITIONS`, conditions `G-1`…`G-10` and the
two architect questions recorded as **FILEABLE WORKING DEFAULTS**: `Q1` = **`buildMenuTemplate`** with the
emitted object carrying **exactly the seven own keys** `id`·`label`·`accelerator`·`role`·`kind`·`submenu`·`enabled`
and **any other own key DROPPED, never copied**, all members typed `unknown`; `Q2` = the **only** structural
difference the mechanism may emit is the **`'darwin'` collapse on exactly the literal `'darwin'`**, identity for
every other string, and an unrecognised/non-string/absent platform emitting the identity shape with **no collapse**
and `recognized: false`). **This spec DERIVES those conditions and that derivation. It does NOT re-litigate,
weaken or re-open any of them**, and **a clause of this file that contradicts the record is a finding against
this file, not a re-opening of the record** (the rule `docs/specs/gutter.md` states for its own record and which
`docs/specs/container.md`, `docs/specs/relocate.md` and `docs/specs/listhost.md` restate).

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing lands **one NEW file**
(`docs/specs/menulib.md`) and **nothing else**. **The module does not exist. No test file exists. No red set has
been authored or run. No leg, no trio, no `tsc` invocation and no register row has been executed. No gate record
after gate 1 exists.** The unit stays an open `## OPEN` row (`E7`) with its ledger status the supervisor's, and
**it is NOT delegable until a TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and this
filing's own dated ruling notes · the layer declaration — the four labels and the honesty anchors · `§1` — the
scope with its NOT-THIS-UNIT boundary items · `§2` — the exact surface (the census in two halves, every
signature/return shape, the caller-supplied set, the `H-r8` six-row prohibition table, **the ten-token collision
table**, **the semantics table for every identifier**, the value rules, **the seam table with its four declared
degradations and the OS-boundary clause in `§2.4`**), `§3` — every state, fail-state, invariant and
static/existence row · `§4` — the red, the authoring order and the binding stop conditions · `§5` — the wiring,
the legs, the DONE row's shape and **the typed register** · `§6`–`§8` — falsification, honest limits, the open
items and the citation index · `§3a`/`§3b` — the adversarial seed set and the disposition table at the file end.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s rows are cited **by NAME** —
that ledger is appended-to and its line anchors drift; `docs/next-steps.md` **by ROW ID**; the sibling specs'
file-end notes carry the rule). **This spec carries no length census of any file.**

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end
note — the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY — *AS FILED*.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one file — the NEW `docs/specs/menulib.md`** — and edited **no existing file**, ran **no suite, no
   leg, no trio, no `tsc`, no Electron boot and no register row**, and made **no commit and no writing git command
   of any kind**. **The module (`src/shared/menu-template.ts`), the test file (`tests/menu-template.test.ts`), the
   red set, the legs, the register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT
   EXIST YET** (globbed this pass: `**/menu-template*` → **no files**). The unit is **`OWED` at every gate after
   this one**, and **it is NOT delegable until a TestWriter has RUN and REPORTED the red set** (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW `src/shared/menu-template.ts`**
   exporting **THREE value exports and SIX type declarations = NINE exported names** (`§2.1`), with **NO IMPORT
   STATEMENT OF ANY KIND — not even type-only**, **no factory, no options object, no session, no module-level
   mutable state and no write of any kind** (`§2.5`), and **one injected optional seam** (`§2.4`).
3. **THE REGISTER (`§5.5.1`): `13` typed ROWS carrying `13` TERMS, in THREE families** —
   `P-ML-IM-1`…`P-ML-IM-7` · `P-ML-SM-1`…`P-ML-SM-3` · `P-ML-TP-1`…`P-ML-TP-3` — **`123` declared attempts,
   printed with their THIRTEEN terms and a term-by-term addition at `§5.5.3`** — one pinned-seed generator
   (`S-ML-TOTAL-1`, seed `20260927`, one LCG step per draw, `pool.length = 12`), **`6` of the `13` rows carrying a
   `(bounded)` marking**, and **the POOL-VERSUS-BOUNDARY check RUN and CLEAN for all `13` rows** (`§5.5.2`
   item 7).
   **⟶ DATE-STAMPED AMENDMENT (`2026-09-27`, the red run's defect report; annotate-never-rewrite — the as-filed
   cells above stay VISIBLE).** **(i) THE `(bounded)` COUNT, CORRECTED `5 → 6`.** The as-filed form of this item
   read **`5` of the `13` rows carrying a `(bounded)` marking** — **THAT `5` WAS WRONG and is `SUPERSEDED`**: the
   register table, `§5.5.1`'s own marking block, `§5.5.2` item 2 and the landed harness
   (`tests/menu-template.test.ts`, `PRE-2`/`REGISTER-STATUS`) **all name `6`, and the SIX ARE
   `P-ML-IM-1` · `P-ML-IM-4` · `P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`** (`6 + 7 = 13` rows, so the
   count is checkable rather than asserted). **(ii) THE DECLARED TOTAL AND THE BOUNDED COUNT ARE THE ONLY NUMBERS
   THIS AMENDMENT MOVES** — **the total `123 → 126`** (`§5.5.3` item below, where the corrected terms, chain and
   subtotals are printed) **and the marking count `5 → 6`**; **no row id, strategy id, seed, term or cap moves, and
   no `§3` row/register cell is re-scoped.** **(iii) THE RED RUN'S PROVENANCE** (run, filed and reported this
   date; **read at `§7`'s repair addendum below, which also records the RE-GRAIN this correction owes**): the red
   set is **`46` failed / `10` passed over `56` rows against a module that does not exist**, and its `PRE-2` /
   `REGISTER-STATUS` rows are **RED BY DESIGN until this amendment lands**, because they assert **the as-filed
   `123` AND the measured `126` as two literals**. **This item's own `123` is left standing above under this
   annotation and is NOT the corrected figure: the corrected declared total is `126`** (`§5.5.3`). **NO `§5.5.0` EXISTS IN THIS FILE** — it is filed **after** the gate-11 ruling and carries its
   register from the start, so there is no superseded zero-row exemption to keep visible. **The register
   overshoots the `≤8` component-breakdown signal on purpose, in the ruling's own form** (`§5.5`, `§5.5.2`
   item 1).
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus `npm run typecheck` `[H]`
   (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]` (**the built output set is `SIX` files —
   the FIVE `esbuild` outputs plus the copied `dist/renderer/index.html`**; this unit's module is imported by no
   `src/**` file, so the output set must be UNCHANGED), `npm run typecheck:tests` `[H]` (the additive fourth leg,
   `AGENTS.md` item 4), and a **standalone strict `tsc --noEmit` over `tests/menu-template.test.ts`** as the named
   leg that pins the `§3.4 R-6`(b) type half (`§5.2`). **NO `[U]` ROW IS OFFERED** (the three-part refusal,
   `§5.2`) and **NO `[D]` ROW IS CLAIMED** (`§5.2`).
5. **THE GATE RECORDS AFTER THIS ONE: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`),
   no blind-greens record (`docs/specs/menulib-greens.md` is named in the diff scope and is `OWED`), no per-unit
   documentation review, no DONE row (`§5.3` fixes its twelve-item shape), and **gate 6 is `STRUCTURAL`, not
   waived** (`§5.2`).
6. **THE OPEN ITEMS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1` — **three** items, and **all three
   are `Q1`/`Q2`-descended WORKING DEFAULTS, not blockers**): item **1** = `Q1`'s renamed symbol and the
   seven-key census; item **2** = `Q2`'s platform/collapse ruling; item **3** = **the collapse run boundary
   (the singleton and the non-adjacent run)** — a clause this filing **pins as a DERIVATION** because the record
   leaves it open. **Each has a working default implemented in `§2` and a recommendation; a later pass that
   changes one must open a gate.**
7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO existing
   file):** `docs/next-steps.md`'s row **`E7`** still reads its spec cell as **`OWED — not filed`** and its status
   unchanged; **the row's `Blocked on` cell is MISSING and its status chain is stale** (`BLOCKED` → then
   `U-GSESSION` → … while its own dependency `U-GSESSION` is `DONE` and the queue block says `E7` is **free** —
   the gate-1 record's `P-2`/`P-3`, re-measured this pass); the row's **`Legs` cell** reads `node suite` against
   this spec's five declared legs; and **`docs/pending.md`'s `SCH-5` row still reads `BLOCKED — awaiting architect
   go-ahead`**. **All four are listed as owed tracker items in this filing's report and are NOT edited here**
   (`§7` item 11, `§8`'s archival note).
8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone (globbed
   `docs/skills/*` this pass), so there is **no test-use-case coverage matrix and no demo-page index to update**,
   and **this unit renders no page** (`§3.4 R-9`'s probe; `§7` item 6).
9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** One file written, zero files edited, no test run, no
   leg run, no trio run, no `tsc` invocation, no Electron boot, no commit. The new file is **untracked and must be
   committed by the supervisor** (`RCA-8`'s per-gate rule). **The MEASUREMENTS this pass DID take are the ten-token
   collision table's hit counts (`§2.2`(E)) and the existence probes of `§3.5`** — every one of them a read-tool
   search over this workspace, attributed at its own site, and **none of them a run of any leg**.
10. **⟶ CLOSE-OUT (`2026-09-27`, gates 6/7/8 + 10 — THE UNIT IS `DONE`, and this item is the status block's LIVE reading; the nine items above are the FILING state and its dated amendments, kept VISIBLE and read as their own passes' readings).** **`U-MENULIB` (`E7`) IS `DONE` — the ledger's SIXTEENTH `DONE` row** — and its authoritative record is **`docs/next-steps.md`'s `## DONE — U-MENULIB`** section, written to this file's `§5.3` twelve-item shape. **GATE 6 IS `STRUCTURAL`, NEVER WAIVED** (no `src/**` importer, no rendered surface, no OS/DOM/element read; its falsifier stated — `§3f` (1)) · **gate 7 (the proofreader) and gate 8 (the per-unit documentation review) RAN AS ONE FOLDED CLOSE-OUT PASS, recorded honestly as one pass and not two**, their records at **`§3f`** (the stale cells, `PF-1`…`PF-8` named and fixed) and **`archive/reviews/2026-09-27-U-MENULIB-doc-review.md`** · **gate 10 (the DONE row + the ledger move) LANDED**: the row reads **`E7 — MOVED TO DONE (2026-09-27)`**, the ledger is **`16 DONE / 5 open` UNITS = `21`** (`16 + 5 = 21`; `22` live rows = `21` unit rows + the non-unit fork row `F4`; the `MOVED TO DONE` label set identical to the `DONE` set at `16`), the open set is **`E8` · `E9` · `F1` · `F2` · `F3` = `5`**, and **the next action is `E8` (`U-THEME`) at its SPEC GATE.** **THE MEASURED GREEN AT `6ec24aa` IS THE SUPERVISOR'S MEASUREMENT, CITED AS SUCH (`RCA-12`) — this pass ran NO leg:** the unit's red set **`60/60`**; `npm test` **`71` files / `1756` passed / `2` skipped / `0` failed**; `npm run typecheck` `0`; `npm run typecheck:tests` `0`; `npm run build` `0` (six-artifact census unchanged); the contract's strict `tsc` leg `0`; `npm run divergence` `0` (`R13 RESULT: 9 checks, 0 failures`); `npm run ui` `0` (`UI RESULT: 0 failures (11/11 assertions green)`); **and the register executing ALL `126` declared attempts with `broken 0` on every one of its thirteen rows, `registerStoppedAt: null`, `totalDeclared 126 = declaredTermSum 126`, seed `20260927`.** **THIS PASS'S OWN MEASUREMENTS ARE FILE READS ONLY: the module `src/shared/menu-template.ts` `330` lines, the test file `tests/menu-template.test.ts` `60` rows, the NINE exports in two halves, the EMPTY import census, and the register's four landed constants (`DECLARED_TOTAL = 126`, `AS_FILED_DECLARED_TOTAL = 123`, the thirteen-term table, the six-name `(bounded)` set).** **THE GATE-4/GATE-5 FINDINGS ARE CLOSED (fixed or pinned), their red-first regression rows riding BESIDE the register so NO TERM MOVED: `A-1`'s nested/cyclic hostile member · the function element's skip · `A-3`'s array-like digit-string key · `A-2`'s enumerable-only read · `A-4`'s answer-unused rule · the four PBT items · gate 5's three ambiguities** — each dispositioned at **`§3b` (filled by this pass from `§3d`/`§3e`'s records)**, `§3c`, `§3d`, `§3e`. **THE DECLARED TOTAL STANDS `126` = its THIRTEEN TERMS** (printed at `§3f` (4)), and **no row id, term, strategy id, seed, cap or `(bounded)` marking moved in this pass.** **THE OWED ROWS, STATED AS OWED AND NEVER AS COVERED: the `docs/FORKER.md` seam/glossary carry (`§7` item 7) · the blind set's targeted re-drive (`docs/specs/menu-template-greens.md`'s own `POST-GREEN` clause) · `§5.5.2` item 10's lone-surrogate re-grain (`P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`) · and PIN 3's builder-answer arm if a later pass adds it as a further register drive (never substituted for the lone-surrogate re-grain).**

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** Where a
ruling is **quoted**, the quotation is marked; where a step is this filing's own **derivation**, it says so in
place.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-5` `MENU-CATALOG-CONTRACT` is ADOPTED-RESHAPED → `U-MENULIB`**, reason code **`ADOPTED-OS-INTEGRATION`** (`docs/pending.md`'s `SCH-5` row; the amended gate record `docs/specs/provident-electron-shell-chrome-handoff-review.md` `H-r4`/`§2.2`/the `U4` unit row). **The acceptance lines, quoted in substance:** the builder **imports neither `electron` nor `fs`** · **`buildMenuFromCatalog` is RENAMED** to a consumer-agnostic symbol with **no app item names** in the type · **the untrusted-catalog normalizer is the contract's** · **no policy defaults** (no default accelerators, no default roles) · **the picker is injected, not owned** · **import semantics stay fork-side**. | `§1` item 1, `§2.1` item 1, `§2.2`(A), `§2.3` item 1, `§3.4 R-5`, `§8` |
| **2** | **`A-d4` is binding and this unit's charter is a *(C)* mechanism** under `S-d8`'s admission rule: a **reusable shell-chrome mechanism with a consumer-agnostic contract**, bounded by the six prohibitions. | `§0` ruling 4, `§1` item 4, `§2.2`(A), `§5.1`'s derivation |
| **3** | **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE). **The mechanism-vs-UI-element test, quoted:** a mechanism is outside the UI constraint **because it is not a UI element** — *"it authors no text, no control, no affordance, no class taxonomy, no slot content and no styling"* — and *"a mechanism that **authors content** — a status text, a status element, a mirror-class taxonomy, a slot model, a literal default — **IS a UI element authored outside the provident graph and remains a review finding**."* | `§0A` note 3, `§1` item 4, `§2.2` `P-ML-2`, `§3.3 I-7`, `§3.4 R-8`, `§5.2`, `§7` item 5 |
| **4** | **`UI-RENDERED-WITH-PROVIDENT`** (`docs/decisions.md`, ACTIVE; the project-wide constraint, `AGENTS.md`'s *"Project-wide constraint (UI rendering)"*): **all non-shell UI must be provident-rendered data driven through the producing graph**, never hand-written HTML/DOM in the renderer; **the Electron shell's own chrome is the only exception**, and **an element authored outside the framework is a review finding.** | `§1` item 4, `§2.2` `P-ML-2`, `§3.4 R-9`, `§5.1`, `§7` item 5 |
| **5** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE): a caller seam is a **PUBLIC, EXPORTED, DOCUMENTED CONTRACT that downstream consumers (forks) IMPLEMENT**, and *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is normative contract text — a seam that is absent, non-callable or throwing must produce a declared safe default and a row that can FAIL, **never a silent no-op**."* | `§2.1` item 1 (the type half), `§2.4` (the seam table and its four degradation rows), `§8` |
| **6** | **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE): *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*, and gate 1 must answer explicitly whether the allowed file set contains a path from the application's entry point to this mechanism. | `§2.5` item 5, `§5.1` (the DERIVED DENIED set, named first), `§7` item 4 |
| **7** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE): a code-bearing unit's register is **MANDATORY before its red set**; the zero-row exemption is **UNAVAILABLE**; the row count is an **OUTCOME, not a budget**. | `§5.5`, `§5.5.1`, `§5.5.2` items 1/2 |
| **8** | **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** (`docs/decisions.md`, ACTIVE): assertions, observations and readings are printed **BESIDE** a term and **NEVER** counted in it. | `§5.5.1` (every cell), `§5.5.2` item 3, `§5.5.3` |
| **9** | **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE): *"a total that is not the sum of its own terms, or a total quoted without its terms, is a review finding."* | `§5.5.2` item 3, `§5.5.3`, `§5.3` item 11, `§7` item 9 |
| **10** | **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE; restated by `H-r14`): prohibition 5 is *"an adoption bound on units"* — **a (C)-admissible unit's own contract may not itself require a new MCP surface** — and it is a **NON-GOAL ROW, never a licence**. | `§0A` note 6, `§2.2` `P-ML-5`, `§3.3 I-10` |
| **11** | **`SHIM-COMPLETION-CARVE-OUT`** (`docs/decisions.md`, ACTIVE): it admits **EXACTLY ONE** shim addition (`ShimElement.removeAttribute`) and **every other member in `H-r5`'s list stays forbidden**. | `§2.2` `P-ML-6`, `§3.4 R-3`, `§7` item 8 |
| **12** | **`DOC-REVIEW-GATE` / `BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE): a per-unit **documentation review** is MANDATORY after the greens (`AGENTS.md` item 10d / RCA-6) and **every `*-greens.md` is blind-verified by a fresh writer**. | `§5.1`'s allow-list rows 4/5, `§5.3` item 8 |
| **13** | **`E5-B-3`'s and `E5-B-1`'s PRECEDENT for the FORM of a FILEABLE item** (`docs/decisions.md`; `docs/specs/container-review.md`'s `§9.5` `G-3`): a **`FILEABLE`** item is *"a RECORDED WORKING DEFAULT … it does NOT gate the filing"*, and its sibling form is `docs/specs/gutter-ui.md` `§7a.1`. | `§0A` note 7, `§7a.1` (all three items) |
| **14** | **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** (`docs/decisions.md`, ACTIVE) — **cited for the boundary it draws and NOT as a surface this unit uses.** `docs/specs/gsession.md` `§2.5` is *"the ONE signature list `E3`/`E4` write their specs against"*, FROZEN AND COMPLETE; **this unit names it for exactly one reason: to state that it imports NOTHING from it and asserts NO edge to it in either direction.** | `§2.1` item 3, `§2.5` item 4, `§3.3 I-9`, `§8` |

**Where a ruling's own row records a DERIVATION, this filing carries the derivation flag with it** — see
`§0A` notes 4 and 7.

### 0A. The dated ruling notes — the clauses the record leaves to this filing, RULED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about the module, its
exports, the emitted member list, the seam and its degradations, the platform ruling, the layer map and the
register sketch; it is **silent** about several clauses a TestWriter must have before it can author a
**falsifiable** row. **This filing DECIDES each of those clauses here**, each with its reason and its landing
site. **No note below weakens a condition, a ruling or a register row**; the places where a clause is **this
filing's own choice rather than a derivation** are **flagged as such and reported at `§7a`/`§7a.1`**.

**Note 1 — THE MODULE PATH IS `src/shared/menu-template.ts`, AND THE TEST FILE IS
`tests/menu-template.test.ts`.** The gate-1 record fixes both at its `§5`, and they agree with the sibling
naming convention (`src/shared/gesture-session.ts` · `gutter.ts` · `relocate.ts` · `container.ts` ·
`owned-list-host.ts` · `slot-host.ts` · `layout-projection.ts` — **the fifteen-file `src/shared/*.ts` tree read
this pass via glob, which returned NO `menu-template.ts`**) and the unit's own stem. **Nothing else in this file
presumes a path.** The test file is named because **`§5.1`'s diff scope must be a real, checkable allow-list**.

**Note 2 — THE RENAMED SYMBOL IS `buildMenuTemplate`, AND THE EMITTED OBJECT CARRIES EXACTLY SEVEN OWN KEYS —
`Q1` RECORDED AS A WORKING DEFAULT** (`G-1`, `G-2`, `G-10`). **THE THREE VALUE EXPORTS ARE
`normalizeCatalog`, `buildMenuTemplate` and `selectCatalogItem`.** **`buildMenuFromCatalog` IS THE RENAMED
PROVENANCE AND APPEARS NOWHERE IN THIS CONTRACT EXCEPT AS THAT PROVENANCE** — **it is NOT an export, NOT an
alias, NOT a re-export and NOT a deprecated name**, and **a module carrying it is a `§4.4 S-ML-... ` STOP**
(`§3.4 R-5`'s positive control, which reads the **export SET BY NAME**). **The emitted item carries EXACTLY the
seven own keys `id` · `label` · `accelerator` · `role` · `kind` · `submenu` · `enabled`, and ANY OTHER OWN KEY IS
DROPPED, NEVER COPIED**; **all seven members are typed `unknown`**. **`Q1`'s reversible alternatives
(`(B)` a narrower carried set, `(C)` an allow-listed pass-through of named extras) are recorded at `§7a.1`
item 1 and are NOT taken.**

**Note 3 — THE PLATFORM RULING, AND THE ONLY STRUCTURAL DIFFERENCE THE MECHANISM MAY EMIT — `Q2` RECORDED AS A
WORKING DEFAULT** (`G-3`, `G-10`). **RULED: the ONLY structural difference this mechanism may emit between two
platform values is the COLLAPSE, and the collapse is triggered by EXACTLY the literal `'darwin'`.** **Identity is
the behaviour for every other value** — including **every other string** — and **a value that is neither
`'darwin'` nor a recognised non-`'darwin'` string emits the identity shape with NO collapse and
`recognized: false`**. **There is NO silent darwin default: a non-darwin platform NEVER collapses, and an
unrecognised one never collapses and is additionally marked unrecognised.** **THE THREE-OUTCOME POOL, pinned:
`'darwin'` ⇒ `{ recognized: true, collapsing: true }` · a non-`'darwin'` STRING ⇒ `{ recognized: true,
collapsing: false }`, the identity projection · a NON-STRING or absent value ⇒ `{ recognized: false,
collapsing: false }`, the identity projection.** **`Q2`'s reversible alternatives (`(B)` a caller-supplied
collapse token instead of a literal, `(C)` no collapse at all in v1) are recorded at `§7a.1` item 2 and are NOT
taken.** **WHICH OF THE THREE IS "UNRECOGNISED" IS A DERIVATION, flagged in note 4.**

**Note 4 — THE NON-STRING PLATFORM ARM IS THIS FILING'S DERIVATION, AND IT IS LABELLED AT EVERY SITE.** **The
record's own words are *"an unrecognised/non-string/absent platform emits the identity shape with no collapse and
`recognized: false`"*** — **the sentence groups the three, so it does NOT itself say whether a non-string
`platform` is `recognized:false` or a fourth outcome.** **THIS FILING PINS `recognized: false` FOR THE
NON-STRING AND ABSENT ARMS AND `recognized: true` FOR EVERY STRING ARM** (the reading under which the closed pool
has **exactly three** members and under which `recognized` **classifies its own domain** — a platform-shaped
value is a *string*; whether it is a *collapsing* one is what `collapsing` reports). **THE ALTERNATIVE READING,
named and not taken: `recognized: true` for every non-`'darwin'` value regardless of type** (a two-member
`recognized` axis). **NO ROW OF THIS CONTRACT DEPENDS ON THE CHOICE FOR ITS COLLAPSE HALF** — both readings give
the identity projection and `collapsing:false` for a non-string — **so the reversal moves `§5.5.1 P-ML-TP-3`'s
`recognized` cell and no other row, no term and no export.** **Recorded at `§7a.1` item 2 as a sub-clause of the
`Q2` default.**

**Note 5 — THE EMITTED TEMPLATE'S FIVE-MEMBER SHAPE, AND THE TWO PLATFORM MEMBERS' NAMES.** **The record pins
the emitted shape as *"the five-member shape (`items` + `platform {recognized, collapsing}`)"* and pins the
`MenuTemplate` type NAME, but it does NOT pin the member names of the platform record.** **RULED:
`MenuTemplate = { readonly items: readonly ProjectedItem[]; readonly platform: PlatformProjection }` and
`PlatformProjection = { readonly recognized: boolean; readonly collapsing: boolean }`** — **`5` members counted
across the two levels (`items` · `platform` · `recognized` · `collapsing`, plus the record itself), the two
platform member names being THE TWO WORDS THE RECORD ITSELF USES** (`recognized`, `collapsing`, at its `§1` and
its `G-3`/`Q2` rows), **so the record introduces no new vocabulary.** **A rename of the two members moves NO row
id and NO attempt term, because every register row reads the members through its own cell's named binding.**

**Note 6 — PROHIBITION 5 IS A NON-GOAL ROW, AND THE NEGATIVE FILE/CONFIG SET IS PINNED.** *(The gate-1 record's
prohibition audit; `docs/decisions.md`'s `PROHIBITION-5-IS-AN-ADOPTION-BOUND`; `H-r14`.)* **This module adds NO
tool, NO resource, NO group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry and no
IPC method.** The family's pinned surface negatives are **read as SET claims, never as a number quoted here**
(`§4.4 S-ML-6`): `ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` keep **exactly the names they
carry today**, and **`R-3`/`R-4` are the rows that can FAIL for a smuggled surface**. **The negative file/config
set, carried whole:** **no store and no persistence** (prohibition 4 / `S-d4`) · **no `src/main/**`** (derived at
`§5.1`) · **no `src/renderer/**`** · **no `electron` and no `node:*`** (the charter's own acceptance line) ·
**no shim change** (`H-r5`, amended **not weakened** — `SHIM-COMPLETION-CARVE-OUT` admits exactly one member) ·
**no `package.json`, no `scripts/**`, no config, no new dependency** (`AGENTS.md` item 11(d)).

**Note 7 — THE FILING'S OWN DECISION RECORD, IN THE `E5B-3` FORM: THREE ITEMS, `FILEABLE`, NONE A BLOCKER.**
**`Q3` OWES NO ARCHITECT ANSWER AT ALL** — it is a **FILING DUTY**, and it is discharged by `§2.4`'s
OS-boundary clause **presence**, not by an answer. **`Q1` and `Q2` are genuine architect-owned questions** (each
changes a public symbol/shape or a consumer-visible behaviour) **and neither is a BLOCKER, because each has a
recorded working default with an architect-reversible alternative** — the `E5-B-3` precedent exactly
(`docs/decisions.md`'s `E5-B-3` row's own title says *"NOTE (not `DECIDED`)"*; the gate-1 record's `§4.3`). **SO
THIS FILING PROCEEDS ON THE DEFAULTS AND LETS THE ARCHITECT REVERSE BY DATED ANNOTATION.** **The cost of the
inversion, pre-committed so it is not re-derived: `(B)`/`(C)` on either question moves no section number and no
row ID; it moves the named `§2.2` rows, `§2.1`'s block and the register rows the gate-1 record already names
(`Q1` → the key-set rows and `P-ML-IM-3`; `Q2` → `P-ML-IM-6`/`P-ML-IM-7`), plus a register re-grain if a term
moves.**

**Note 8 — THE GATE-3 STOP, ITS SEVEN MEASURED ROW-BOUND DEFECTS, THE FOUR THIS AMENDMENT PINS, THE THREE THAT
STAY TEST-SIDE, AND THE RE-GRAIN THIS PASS OWES (`2026-09-27`; annotate-never-rewrite — no clause of this file is
rewritten, no row id, strategy id, seed, cap or term moves, and every as-written cell stays VISIBLE).**

**(1) THE STOP, RECORDED AS AN EVENT RATHER THAN A STALL.** **The FIRST Implementer pass of `U-MENULIB` STOPPED
WITHOUT WRITING A LINE OF `src/shared/menu-template.ts`** and reported **SEVEN ROWS UNREACHABLE BY ANY CONFORMANT
MODULE** — **the correct behaviour at gate 3, because a red set is repaired by a TestWriter and never by the
Implementer** (`AGENTS.md` item 3 / RCA-1; `§4.2` item 7). **The handover section is `docs/next-steps.md`'s
`## ⟶ HANDOVER — E7 (U-MENULIB) AT GATE 3, MID-CYCLE`, cited BY NAME; its `§B` carries the seven; its `§A` item 4
files the red set (`tests/menu-template.test.ts`, `56` ROWS) at `45` failed / `11` passed, while `§5.5.3`'s own
record of the same run reads `46` failed / `10` passed — the two figures are a `[T]`-side count drift, named here
and routed to `§7`'s repair addendum (D) alongside the ledger row `E7`'s own `Legs`/status cells, and NOT resolved
by this pass, which ran no suite and edits no tracker.** **No `§3` row, `§5.5.1` cell, term, cap or seed is moved by
the stop, and the unit's status does not advance here.**

**(2) WHICH OF THE SEVEN THIS AMENDMENT PINS — FOUR, EACH AT ITS OWN SITE.** **A · `X-5`'s SCOPE IS
SELF-DEFEATING** (the row bans `\bmenu\b`/`\bpicker\b`/`\bdialog\b`/`'darwin'` across **all** of `src/**` while
`§5.1` row 1 places this unit's module inside it and `§2.1` item 4 pins `'picker'`/`'darwin'` as its CLOSED
literal set — so the row passes today and reports the module's own tokens the moment the contract is implemented)
— **pinned at `§3.5 X-5`'s dated scope pin, and the scope is NARROWED BY EXCLUSION rather than the ban relaxed.
B · `M-4` VERSUS `M-7`, THE SAME CALL READING `enabled` AS BOTH `false` AND `true`** (measured `true` in BOTH
readings) — **pinned at `§2.4`'s dated `enabled` pin: the degradation's `false` GOVERNS and `M-7`'s verbatim
reading is the LOSING CELL, corrected with its as-filed form visible. C · `F-2`'s TWO MUTUALLY UNSATISFIABLE
PAIRS, AND `P-ML-IM-1` ATTEMPT 12 AGAINST `M-1`/`KEY_SHAPES`(1)** — **both are the SAME missing clause, THE CARRY
RULE, and it is pinned at `§2.3` item 11: a projected item is a FRESH RECORD of the intersection of the seven
declared names with the source's OWN keys, its VALUES handed on by identity, an array element keyed by its
indices, and NO entry is ever the source value.** **D · `PRE-2`'s TWO DISTINCT SUMS (`89` at one line, `83` at
the next)** — **the two assertions are BOTH HARNESS-SIDE, against ONE unchanged array, so this is a `[T]`-side
self-contradiction rather than a contract figure: `§5.5.2` item 3's thirteen distinct figures sum to `89` and NOT
to `83`, pinned at `§5.5.2` item 3's dated pin, and no row of `§3` moves.** **EACH PIN IS PLACED AFTER THE ROW OR
TABLE IT BINDS SO NO ROW IS SPLIT.**

**(3) WHICH REMAIN TEST-SIDE — THREE, NAMED WITH THEIR OWNERS.** **(i) THE `normalizeView`-BASED CONTROLS** —
`R-1`'s CONTROL (i) cannot fire because the view **strips comments and collapses every string literal to `'S'`**
before the scan runs, so the scanned view cannot carry the evidence the control asserts (measured
`[1,0,0,0,0,1]` against six expected `true`s); **(ii) `R-2`'s TEST-FILE HALF**, whose own BYTES carry the banned
word (its own import specifiers) — **this half is ALREADY CLOSED ON THE CONTRACT SIDE by `§3.4`'s dated exemption
pins under `R-1`/`R-2` (the two control corpora exempt BY NAME, the corpora character-code assembled, a
plainly-spelled reference FAILING anywhere in either file), so what remains is the TESTWRITER's alignment of the
scan to that pin — the control must still fire FOUR-OF-FOUR and the module file keeps `no exemptions`**; and
**(iii) the red-count drift of (1), `45`/`11` against `46`/`10`.**

**(4) THE RE-GRAIN / REPAIR OBLIGATION THE TESTWRITER OWES — ONE OBLIGATION WITH FIVE NAMED PARTS, and this
pass may not run it (it holds a doc-write wall and no shell).** **(a)** re-scope `X-5`'s sweep to the exclusion
pinned at `§3.5 X-5`, **keeping BOTH controls and asserting that a token in ANY OTHER `src/**` file still FAILS**;
**(b)** align `M-4` and `M-7` to the `§2.4` `enabled` pin and carry the LOSING cell's as-filed form beside the
corrected one; **(c)** repair `F-2`'s two pairs to the `§2.3` item 11 carry rule and re-declare
`P-ML-IM-1` attempt 12's expected entries (the accessor-throwing record SKIPPED, the array element's key set
`['0']`), so `M-1`/`KEY_SHAPES`(1) and the attempt agree; **(d)** repair `PRE-2`'s distinct assertion to `89`
beside the as-filed `83`; **(e)** re-assert the `R-1`/`R-2` controls under `§3.4`'s exemption pins. **Every part is
a ROW/EXPECTATION re-grain: none is a term, a cap, a seed, a strategy id or a row id.**

**(5) THE TERM VERDICT — PRINTED, BECAUSE `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` REQUIRES IT.** **NO TERM
MOVED AS A CONSEQUENCE OF ANY PIN OF THIS AMENDMENT.** **THE DECLARED TOTAL REMAINS
`126` = `12` (`P-ML-IM-1`) + `12` (`P-ML-IM-2`) + `12` (`P-ML-IM-3`) + `12` (`P-ML-IM-4`) + `12` (`P-ML-IM-5`) +
`12` (`P-ML-IM-6`) + `12` (`P-ML-IM-7`) + `3` (`P-ML-SM-1`) + `3` (`P-ML-SM-2`) + `3` (`P-ML-SM-3`) + `12`
(`P-ML-TP-1`) + `9` (`P-ML-TP-2`) + `12` (`P-ML-TP-3`)** — **the same THIRTEEN terms, the same chain
`12 → 24 → 36 → 48 → 60 → 72 → 84 → 96 → 99 → 102 → 105 → 117 → 126`, the same subtotals `IM 84 · SM 9 · TP 33`,
the same `6`-of-`13` `(bounded)` set, the same seed `20260927`, the same caps (`126 ≤ 400`, largest row
`12 ≤ 100`).** **WHY, stated per pin so the claim is checkable rather than asserted: (A) is a SCOPE exclusion and
drives no attempt; (B) is a VALUE reading on a drive `M-4`/`P-ML-TP-2` already declare, and `P-ML-TP-2`'s term
`9` is a count of SEAM/ANSWER SHAPES, not of readings; (C) changes the KEY SET of a carried entry and the LENGTH a
pool member's expectation carries — `P-ML-IM-1`'s term `12` counts CATALOG SHAPES, not entries or keys, and
`KEY_SHAPES` is `P-ML-IM-3`'s `4` shapes × `3` readings, unchanged at `12`; and (D) is a figure BESIDE the
declared one by `§5.5.2` item 3's own rule.** **The DISTINCT-figure sum stays a REPORTED figure (`89`) and is
never substituted for the declared total.** **`§5.5.2` item 10's SEPARATE lone-surrogate re-grain (`12 → 13`,
`126 → 127`, `IM 84 → 85`) remains OWED and untouched by this amendment, and neither re-grain may be substituted
for the other.**

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no Electron window
booted, no `tsc` invocation was made, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not a real OS, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/menu-template.ts` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned), plus the landed extension channel of `U-DIVERGENCE-EXT` (`C2`, `DONE`) | **nothing this unit's contract needs to observe**; **this spec claims no `[D]` row** (`§5.2`) |

**Seven honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence, and NEVER OS
   evidence.** It says this repo's vitest files pass against this unit's module. **No window is booted, no
   Electron `Menu` is constructed, no accelerator is registered, no picker is rendered, no IPC round-trip runs,
   no MCP transport is exercised, and no real OS menu exists anywhere in the run.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a document**: the
   only arguments are **caller data, a caller string and a caller closure**. **A `[T]` green here proves THE
   RETURN VALUES OF THREE PURE FUNCTIONS, ONE CALLER CLOSURE'S INVOCATION COUNT, AND NOTHING ELSE.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no
   `process.platform` (a real OS read is REFUSED at `§3.4 R-7`), no `navigator`, no `globalThis`-rooted lookup,
   no `Date`, no `Math.random`, no `process.env`. **Every value is an argument.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its rows
   are authored in **this unit's own test file** and executed by the **same node suite** (`npm test`, `§5.2`
   leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and **no register row may be read
   as `[H]`, `[U]`, `[D]`, OS or assembled-app evidence.**
5. **A green on the emitted template is NOT a green on a MENU.** **No row of this unit may be read as evidence
   that a native menu bar exists, that an item appears in it, that an accelerator fires, that a picker opens, or
   that a `role` means what a platform means by it** — **none of which this unit produces, composes, registers or
   observes** (`§2.4`'s OS-boundary clause; `§3.3 I-11`).
6. **The emitted keys are CARRIED, and CARRIED IS NOT INTERPRETED.** No member of the emitted item is read by
   the module as a decision, and **`role`/`kind` are carried VERBATIM with no vocabulary and no default** — so
   **no green of this unit proves that any `role` or `kind` value is one a platform accepts.**
7. **The `platform` argument is an OPAQUE CALLER STRING, and the module reads exactly ONE value of it** — the
   literal `'darwin'`. **Every other platform-shaped sentence in this file is a statement about the PROJECTION
   RULE, never about an operating system this repo can observe.**

---

## 1. Scope

**One deliverable: one `src/shared/` module — a PURE, TOTAL, STATELESS mechanism of three functions: an
untrusted-catalog normalizer, a menu-template builder carrying exactly seven keys per item, and the injected
picker seam's answer selector** — with **the picker injected and never owned**, **no app item name and no
consumer vocabulary in any module byte**, **no OS read**, and **no write of any kind**.

1. **What the unit is, in one sentence.** A **node-local, policy-free-by-construction mechanism** that
   (a) **NORMALIZES** a caller-supplied, untrusted catalog value into an array of carried entries — **for every
   input shape, including the malformed, the hostile and the absent, and never by throwing**; (b) **BUILDS** a
   caller-shaped **template value** in which every item carries **exactly the seven declared own keys verbatim**
   and whose **only** structural difference across platforms is the **`'darwin'` collapse**; and
   (c) **SELECTS** the caller's own injected **picker** answer, returning it **unchanged** only when it names a
   **known id of the catalog it was given**, and `null` otherwise. **No factory, no session, no options object
   it owns, no state** (`§2.5`).
2. **THE RENAMED SYMBOL, STATED FIRST BECAUSE IT IS `G-1`'s DISCHARGE (`§0A` note 2).** The fork's
   `buildMenuFromCatalog` is **RENAMED** and **the consumer-agnostic name is `buildMenuTemplate`**; the emitted
   value is a **template**, not a menu. **`buildMenuFromCatalog` appears in this contract only as the RENAMED
   provenance** (`§3.4 R-5`'s negative control).
3. **What the unit is NOT — NO APP ITEM NAMES, NO CONSUMER VOCABULARY, NO POLICY DEFAULT.** **The module
   contains NO app menu item name, no item-literal, no accelerator literal, no `role` literal, no `kind`
   vocabulary of its own, no default accelerator and no default role** (the acceptance's own words:
   *"no policy defaults (no default accelerators, no default roles)"*). **`role` and `kind` are CARRIED, never
   interpreted as contract decisions.** **The picker's vocabulary is the CALLER's and appears in NO module byte**
   (`A-d4`'s injection answer to `CONSUMER-VOCABULARY`).
4. **What the unit is NOT — no UI element, no picker rendering, no menu composition.** Per
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test the module authors **no text, no control, no
   affordance, no class taxonomy, no slot content and no styling**; and **`UI-RENDERED-WITH-PROVIDENT`**'s
   constraint has **this mechanism as its object NOT at all** — **the picker is the CALLER's, and this repo
   renders neither the native menu nor the picker** (`§2.4`'s OS-boundary clause; `§7` item 5).
5. **What the unit is NOT — no OS read and no platform detection of its own.** **There is no parameter through
   which an OS could be observed and no ambient read that could supply one.** **`platform` arrives as an opaque
   caller value** and the module compares it to **one literal** (`§3.3 I-11`, `§3.4 R-7`).
6. **What the unit is NOT — no `invoke`, no activation, no routing, no dialog, no picker call count on the
   caller's side.** **This unit owns NO `invoke` surface, NO activation counter, NO routing table and NO dialog
   opener.** The gate record's `U4` row mentions an *"exactly one activation per `invoke(id, …)`"* criterion and
   *"picker seam cancel/dismiss/empty"* outcomes: **the FIRST belongs to the CALLER and is asserted NOWHERE
   here** (a `[T]` row asserting it would be asserting a caller's own bookkeeping — `§4.4 S-ML-8`), and **the
   SECOND is discharged as the picker-answer pool's `null`/empty arm** (`§5.5.1 P-ML-TP-2`, `§3.2 F-6`).
7. **What is EXPLICITLY OUT of scope (do not do in this unit).** No renderer wiring and no demo envelope
   (`§5.1`'s DENIED set); **no import of any sibling module, not even type-only** (`§2.1` item 3); no `electron`
   and no `node:*`; no `Menu`, no `setApplicationMenu`, no `MenuItem`, no accelerator registration and no
   picker implementation; no store, no persistence, no journal, no cache and no module-level mutable state; no
   new MCP surface, no IPC method, no tool and no resource; no divergence-harness work and **no `[D]` row**; no
   `scripts/**`; **no `docs/skills/designing-pages.md` update — that file DOES NOT EXIST** (globbed
   `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage matrix, no
   demo-page index and no page-design layer to update** — and **this unit renders no page** (`§3.4 R-9` is the
   probe that keeps that claim falsifiable).
8. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec + its
   `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new
   `src/shared/` module and touches **no existing file** except this spec and the trackers (`§5.1`).
9. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY — AND THE VALUE IS THE REASON THE `'darwin'`
   COLLAPSE IS IN SCOPE.** **The unit ships no feature and has NO IN-TREE CONSUMER**: `src/shared/menu-template.ts`
   will be **imported by no `src/**` file** and will appear in **none of the built bundles**. **Its value is the
   contract itself, and for a fork it is exactly three things:** the **normalizer discipline** (an untrusted
   catalog becomes carried entries, never a throw), the **projector discipline** (seven keys verbatim, others
   dropped, one platform rule and no other structural difference), and the **seam discipline** (the fork's own
   picker is called and its answer handled, or its absence declared). **THE NAMED COST, carried because the
   family carries its own:** this repo ships **no menu and no picker**, so **a fork implements both and this repo
   proves only the value** — and **the honest reading of the `'darwin'` collapse is that it is an
   OS-integration CLAIM ABOUT A VALUE, never an OS behaviour this repo can observe** (`§2.4`; `§7` item 2).
   **The honest cost of the unit itself**: this spec + a **`13`-row / `13`-term / `126`-attempt** register +
   red/green **with remands** + the adversarial pass + blind greens + the per-unit documentation review + a DONE
   row + per-gate commits (`RCA-8(f)`). *(As filed this line read **`123`-attempt**; the declared total was
   corrected to **`126`** by the dated amendment of `CURRENT STATE` item 3 and `§5.5.3` — the as-filed `123` is
   the mis-sum of the register's own thirteen terms and stays visible there.)*

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/menu-template.ts`** (`§0A` note 1). **It imports NOTHING** (`§2.1` item 3).

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: NINE exported names, in TWO
HALVES — THREE value exports and SIX type declarations.** **The two halves are counted separately on purpose**
(the family's census rule: `docs/specs/gutter-ui.md` `§R.3` `R-SEAMS`; `docs/specs/container.md` `§2.1`'s
two-halves census), because sibling reviews have caught a census cell contradicting the block beside it, and
because **a type declaration is erased at runtime** — so a single *"9 exports"* claim would be
**half-unfalsifiable**. **A row asserting only a COUNT without NAMING the names FAILS `§3.4 R-5`'s own text**
(`§4.4 S-ML-6`).

1. **THE THREE RUNTIME VALUE EXPORTS — exactly `normalizeCatalog`, `buildMenuTemplate` and
   `selectCatalogItem`** (`§3.4 R-5`(a) reads the imported namespace's own keys **by name**, with a positive
   control that a namespace carrying a **fourth** value export FAILS, and with **`buildMenuFromCatalog` as the
   named negative control**). **THE SIX TYPE DECLARATIONS — exactly `PickerFn`, `CatalogEntry`,
   `PlatformProjection`, `ProjectedItem`, `MenuTemplate` and `TemplateOptions`** (`§3.4 R-5`(b): a type-only
   name is **erased at run time**, so the type half is a **PRESENCE** claim pinned by **`§5.2` leg 5's
   standalone strict `tsc`**; **the seam's own function type is COUNTED IN THIS HALF on purpose**, per ruling 5,
   so a fork can import the shape it must implement). **`3 + 6 = 9`.**

2. **THE THREE FUNCTIONS, IN FULL, WITH THEIR RETURN SHAPES, THEIR DECLARED DEGRADATIONS AND THEIR ERROR
   PATTERNS.** **THE ERROR PATTERN IS THE CONTRACT AND IT IS UNIFORM: NONE OF THE THREE EVER THROWS, FOR ANY
   ARGUMENT, AND NONE HAS A REFUSAL DOMAIN.** There is **no `ok`, no `code`, no `reason`, no `thrown`, no
   `disabled` and no sentinel in this contract**: an unusable argument produces **a declared value** —
   `[]`, `null`, or the declared empty projection — and an unusable seam produces **a declared degradation**.

```ts
/** THE INJECTED PICKER — the module's ONE caller seam and its only contract edge.
 *  OPTIONAL in `TemplateOptions`. When it is a function the module calls it AT MOST ONCE
 *  per `buildMenuTemplate` invocation and AT MOST ONCE per `selectCatalogItem` invocation,
 *  with the array of CARRIED CANDIDATE entries, and hands its answer on UNCHANGED —
 *  never coerced, never normalized, never re-keyed, never defaulted.
 *  DECLARED DEGRADATIONS, all four (`§2.4`): absent / non-callable / throwing /
 *  non-null-answer-that-names-no-known-id (`§2.4` item 1).
 *  THE PICKER'S OWN VOCABULARY IS THE CALLER'S and appears in NO module byte. */
export type PickerFn = (candidates: readonly CatalogEntry[]) => unknown

/** A NORMALIZED, CARRIED CATALOG ENTRY — the value `normalizeCatalog` produces and the
 *  array element `buildMenuTemplate` projects.
 *  EXACTLY the seven declared own keys (`§0A` note 2), each typed `unknown`, and NO
 *  OTHER OWN KEY: an own key outside the seven is DROPPED, NEVER COPIED (`§2.3` item 2).
 *  `CatalogEntry` is NOMINALLY distinct from `ProjectedItem` (`§2.3` item 7): the two
 *  are separately exported names for the pre-projection and post-projection carried
 *  shapes, and no import edge may conflate them. */
export interface CatalogEntry {
  readonly id: unknown
  readonly label: unknown
  readonly accelerator: unknown
  readonly role: unknown
  readonly kind: unknown
  readonly submenu: unknown
  readonly enabled: unknown
}

/** THE PLATFORM PROJECTION — TWO members, in THIS declaration order, and no third
 *  (`§0A` note 5). `recognized` is TRUE for every STRING `platform` and FALSE for
 *  every non-string or absent one; `collapsing` is TRUE exactly when the value is
 *  the literal `'darwin'`. THE ONLY structural effect either member describes is
 *  the collapse (`§0A` note 3). */
export interface PlatformProjection {
  readonly recognized: boolean
  readonly collapsing: boolean
}

/** A PROJECTED ITEM — what `MenuTemplate.items` carries.
 *  EXACTLY the same seven own keys as `CatalogEntry`, in the same declared order,
 *  each typed `unknown`, and NO OTHER OWN KEY (`§2.3` item 2). On the `'darwin'`
 *  collapse path a parent entry's `submenu` ADDITIONALLY carries the rest of its
 *  run as PROJECTED ITEMS in catalog order (`§2.3` item 5). */
export interface ProjectedItem {
  readonly id: unknown
  readonly label: unknown
  readonly accelerator: unknown
  readonly role: unknown
  readonly kind: unknown
  readonly submenu: unknown
  readonly enabled: unknown
}

/** WHAT `buildMenuTemplate` RETURNS — the FIVE-member shape (`§0A` note 5):
 *  `items` (the projected sequence, in catalog order) and `platform`
 *  (`recognized` × `collapsing`). A CALLER-SHAPED TEMPLATE VALUE AND NOTHING ELSE
 *  — see `§2.4`'s OS-boundary clause, which nothing in this file may weaken. */
export interface MenuTemplate {
  readonly items: readonly ProjectedItem[]
  readonly platform: PlatformProjection
}

/** THE BUILDER'S INPUT OPTIONS — the caller's own platform value and (optionally)
 *  its own picker. `platform` is REQUIRED and OPAQUE (§2.4 item 2); `picker` is
 *  OPTIONAL and its absence is a DECLARED DEGRADATION, never a silent no-op. */
export interface TemplateOptions {
  readonly platform: unknown
  readonly picker?: PickerFn | unknown
}

/** THE UNTRUSTED-CATALOG NORMALIZER — PURE, TOTAL, STATELESS.
 *  Returns the array of CARRIED entries: for a usable array input, ONE
 *  `CatalogEntry` per USABLE element, in catalog order; for EVERY other input
 *  shape (absent, `null`, a non-array, an empty array, an array whose elements are
 *  hostile or unusable) the declared value `[]` — and NOTHING EVER THROWS
 *  (`§2.3` items 1/3, `§5.5.1 P-ML-IM-1`).
 *  IT BUILDS NO MENU, FORMATS NOTHING, VALIDATES NO `id`, INVENTS NO DEFAULT AND
 *  EMITS NO PLATFORM MEMBER: it is the normalizer, and its whole arithmetic is the
 *  seven-key carry rule. */
export function normalizeCatalog(catalog: unknown): readonly CatalogEntry[]

/** THE TEMPLATE BUILDER — PURE, TOTAL, STATELESS.
 *  Normalizes `catalog` by the SAME rule as `normalizeCatalog` and projects the
 *  result as `MenuTemplate`:
 *    - `items` carries the projected sequence in catalog order, each item carrying
 *      exactly the seven declared own keys (`§2.3` item 2);
 *    - on the `'darwin'` path, each MAXIMAL RUN of two or more `'picker'`-kind
 *      entries becomes ONE entry whose `submenu` carries the rest of its run as
 *      projected items IN CATALOG ORDER (`§2.3` item 5);
 *    - `platform` is `{ recognized, collapsing }` by the three-outcome rule
 *      (`§0A` notes 3/4).
 *  DECLARED SHAPES: `platform === 'darwin'` ⇒ `{recognized:true, collapsing:true}`
 *  and the collapse applies; ANY OTHER STRING ⇒ `{recognized:true,
 *  collapsing:false}` and the IDENTITY projection; ANY NON-STRING OR ABSENT VALUE
 *  ⇒ `{recognized:false, collapsing:false}` and the IDENTITY projection — NEVER a
 *  silent `'darwin'` default (`Q2`, `§0A` notes 3/4).
 *  NEVER THROWS. It invokes the picker AT MOST ONCE and only when its carried
 *  entries include a `'picker'`-kind entry (`§2.3` item 6). */
export function buildMenuTemplate(catalog: unknown, options?: unknown): MenuTemplate

/** THE PICKER-ANSWER SELECTOR — PURE, TOTAL, STATELESS, and it VALIDATES NO `id`
 *  and GENERATES NO `id` (`§2.3` item 8, `§5.5.1 P-ML-IM-7`).
 *  Returns the CALLER'S OWN PICKER ANSWER, UNCHANGED BY IDENTITY (`toBe`), when
 *  that answer is not `null`/`undefined` AND names a KNOWN `id` of the catalog it
 *  was given — the comparison being STRICT IDENTITY (`===`) against the OWN `id`
 *  members of the carried entries, so NO coercion, NO `String(...)`, NO trimming,
 *  NO case folding, NO hash and NO minted identity participates.
 *  Returns the declared EMPTY answer `null` for: an absent / non-callable /
 *  throwing picker; an answer that is `null` or `undefined`; and a non-`null`
 *  answer that names NO known id of this catalog (`§2.4` item 1's degradations).
 *  NEVER THROWS. */
export function selectCatalogItem(catalog: unknown, picker?: unknown): unknown | null
```

3. **THE IMPORT CENSUS: NONE — NOT ONE STATEMENT, NOT EVEN TYPE-ONLY.** **`§3.4 R-4` is the row that pins it,
   and `R-4`'s positive control is that a SINGLE import of ANY path FAILS it.** **Why it is EMPTY, stated
   because two sibling `E`-group units each needed one type-only line:** **(a)** the module **receives no
   session, no element, no engine surface and no sibling value** — its whole surface is **caller data, a caller
   string and a caller closure** (`§2.1` item 2); **(b)** its one seam type (`PickerFn`) is **declared locally in
   one line**, so there is **no shape it needs to borrow**; **(c)** the charter's own acceptance line is
   *"the builder imports neither `electron` nor `fs`"* — **an EMPTY census satisfies it in the strongest
   form**; and **(d)** **`docs/specs/gsession.md` `§2.5` is NOT this unit's surface** (ruling 14): this unit
   neither composes the session nor names it, so **no type-only import of `GestureHandle` has any referent
   here**. **A later pass asserting an import edge in EITHER direction is a `§4.4 S-ML-9` STOP.**

4. **THE MODULE'S DECLARED STRING LITERALS, PINNED AS A CLOSED SET SO THE COLLISION TABLE (`§2.2`(E)) CAN
   BE FALSIFIED.** **The module owns EXACTLY FOUR string-literal BODIES: `'darwin'` (the one platform token),
   `'picker'` (the one `kind` token), `'object'` (the `typeof` tag its carry rule needs), and `''`** — **the
   export member names and the type names are IDENTIFIERS, never literals**, and **`typeof`-tag spellings are
   the only other string bodies a conformant implementation needs** (`'function'`, `'string'` — the sibling
   `E5` module's own landed set includes exactly these two, `docs/specs/container.md` `§2.3` item 5). **THE CLAIM
   IS A CLOSED SET WITH BOTH CONTROLS** (`§3.4 R-8`): **a module carrying a THIRD platform token, a second
   `kind` token, an accelerator literal, a `role` literal or an app item name FAILS the row; a module carrying
   exactly the declared bodies PASSES it.**

### 2.2 What is CALLER-SUPPLIED, the prohibitions, the ten-token collision table, and the semantics table

**Caller-supplied (never built in, never defaulted, never enumerated):** the **catalog** and every element,
own key and value of it; every **`id`**; every **`label`**; every **`accelerator`**; every **`role`**; every
**`kind`** (including the `'picker'` kind — the **caller's own datum**, which the module compares to **one
declared literal**); every **`submenu`**; every **`enabled`**; the **`platform`** value; and the **picker**
itself with its own vocabulary and its own answer. **THE MODULE CONTAINS NO APP MENU ITEM NAME, NO CONSUMER
VOCABULARY, NO DEFAULT ACCELERATOR, NO DEFAULT ROLE, NO MENU COMPOSITION, NO PICKER IMPLEMENTATION, NO OS READ,
NO SELECTOR, NO STORE, NO ARITHMETIC AND NO WRITE.**

**(A) THE `H-r8` `§0 Contract-prohibitions` SIX-ROW TABLE — one row per prohibition, each row NAMING the test
that pins it** (`H-r4`/`H-r8`; the sibling form is `docs/specs/zones.md` `§2.2` and `docs/specs/container.md`
`§2.2`(A); the handoff record itself names `menulib.md` as one of the six specs that owe this block).

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by (the test that pins it) |
| --- | --- | --- | --- |
| **`P-ML-1`** | **No consumer vocabulary** as a symbol, a closed string-union member, a default or a documented constant | **`A-d4`'s injection answer, in its own words** (`docs/pending.md`'s `SCH-5` row: *"the picker is injected, not owned"*, *"no app item names in the type"*). **Every member is typed `unknown`; the module's own vocabulary is the three function names, the six type names, the seven carried key names, the two platform member names and the two tokens `'darwin'`/`'picker'` — and NOTHING else.** **NO app menu item name, no label literal, no accelerator literal and no `role` literal appears in any byte** | **`R-1`** (the vocabulary scan, with its declared exemptions named and both controls), **`R-8`** (the closed-set literal row), `§5.5.1 P-ML-IM-6` |
| **`P-ML-2`** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates (`S-d8` `(C)#2`) | The module **authors no element, no text, no class, no attribute and no stylesheet** — it **returns one value**. **It composes no `Menu`, renders no picker and opens no dialog** (`§2.4`). `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test is satisfied **because the module is not a UI element** | **`R-2`** (the no-DOM/no-composition row), `§3.3 I-7`, `§3.2 F-8` |
| **`P-ML-3`** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default (`S-d8` `(C)#3`) | **Every value is caller-supplied.** The **only** degenerate values the module owns are **the ABSENCE of a value it would otherwise have to fabricate**: `[]` for an unusable catalog, `null` for an unusable or unknown-`id` picker answer, and the declared `recognized:false`/`collapsing:false` pair — **each DECLARED, each a VALUE, none a policy**. **There is no default accelerator, no default role, no default label, no default `kind`, no default `enabled`, no fallback vocabulary, no epsilon, no sentinel and no `try`-and-guess** | **`R-1`** (the absence discipline), **`R-8`**, `§2.4` item 1 (each degradation a row that can FAIL), `§5.5.1 P-ML-TP-2`/`P-ML-IM-1` |
| **`P-ML-4`** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` (`S-d8` `(C)#4`; `S-d4`) | **ZERO module-level state**: no store, no cache, no registry, no memo, no counter, no `Map`/`WeakMap` of its own, no persistence, no module-level mutable binding. **Every call is a pure function of its arguments** **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed row above is KEPT VISIBLE and is NOT rewritten): THE POINTER, NOT A RE-READ — `menu-template`'s store obligation is DECLARED and stays RECORDED-NOT-LANDED (`store-modules-seams.md` `§2.4`): when a menu consumer ships, the CALLER's future resolution site reads `file.menu.catalog` (PROPOSED, the plan's `§5.2.7` row 7's `F-11`) and hands the catalog to the module as `buildMenuTemplate`/`normalizeCatalog`/`selectCatalogItem`'s parameter. **THIS ROW'S NO-STORE BYTE FORCE SURVIVES UNCHANGED — the MODULE still imports nothing (`0` import statements, the EMPTY IMPORT CENSUS the plan's `F-11` names), holds no store, and its LANDING is OWED until a consumer exists (the revisit condition, `store-modules-seams.md` `§2.4` item 3). The annotation is a pointer to the recorded disposition — it is NOT a re-read of this row's module-binary force.** | **`R-3`**, `§3.3 I-4`, `§5.5.1 P-ML-SM-1` |
| **`P-ML-5`** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry (`S-d8` `(C)#5`) — **a NON-GOAL ROW, never a licence** (`PROHIBITION-5-IS-AN-ADOPTION-BOUND`) | This module is **imported by no `src/**` file** and registers nothing: the pinned sets keep **exactly the names they carry today** (`ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` — asserted **BY NAME as SET equality, never by a number quoted here**, per `§4.4 S-ML-6`). **The module's contract REQUIRES no tool** | **`R-3`** (the file-set row), **`R-4`** (the diff-scope row), `§3.3 I-10` |
| **`P-ML-6`** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** (`S-d8` `(C)#6`; `H-r5`) | **Every row in this file is `[T]` or `static`** — three pure functions over arguments — **EXCEPT the OS-facing half, which this spec REFUSES in the family's fixed three-part form rather than promising** (`§5.2`; `H-r8` (C)#6 is satisfied **by a refusal that names the criterion and states why no instrument reads it**). `src/shared/dom-shim.ts` **gains no member** (`SHIM-COMPLETION-CARVE-OUT`) | **`R-7`** (the no-OS-read row), **`R-9`** (the page-design probe), `§5.2`, `§3.3 I-11` |

**(B) THE PROHIBITION TABLE'S FURTHER ROWS — the module's own derived prohibitions, each with an enumerated
static row** (`§3.4`; **a prohibition citing *"a static source row"* with no id is not a row**).

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **`P-ML-7`** | **No OS read and no platform detection** — no `process.platform`, no `navigator`, no `process.env`, no `os`/`node:*`, no UA sniffing | `platform` **arrives as an argument** and the module compares it to **one literal**; **there is no ambient read anywhere in the module** | **`R-7`**, `§3.3 I-11`, `§5.5.1 P-ML-IM-5` |
| **`P-ML-8`** | **No menu composition, no picker rendering, no dialog, no accelerator registration** — no `Menu`, `MenuItem`, `setApplicationMenu`, `dialog`, `accelerator` API use | The module **emits a caller-shaped template value and nothing else** (`§2.4`) | **`R-2`**, `§3.2 F-8`, `§2.4`'s six falsifier rows |
| **`P-ML-9`** | **No app item names in the type, and no `kind`/`role` vocabulary** | Every member is `unknown`; `role`/`kind` are **carried verbatim**; the **only** `kind` token the module owns is `'picker'`, compared by strict equality | **`R-1`**, **`R-8`**, `§5.5.1 P-ML-IM-6` |
| **`P-ML-10`** | **No `id` VALIDATION and no `id` GENERATION** — **the opaque, never-validated, never-minted `id` domain** (`§5.5.1`'s four domains) | The module **never validates an `id`'s type, shape, emptiness, uniqueness or spelling**, and **never mints, coerces, stringifies, trims, hashes, re-keys or dedupes one**; it **carries** every `id` value and **compares** it by strict identity inside `selectCatalogItem` only | **`R-10`**, `§2.3` item 8, `§5.5.1 P-ML-IM-7` |
| **`P-ML-11`** | **No second authority over the caller's picker, activation or routing** — no `invoke`, no activation counter, no routing table | The module **calls the picker at most once and hands its answer on**; **the caller's own `invoke`/activation discipline is NOT this unit's subject and is asserted nowhere here** (`§1` item 6, `§4.4 S-ML-8`) | **`R-11`**, `§2.4` item 1, `§3.3 I-2` |
| **`P-ML-12`** | **No fabricated edge to any sibling, and no re-use of another unit's contract as this one's surface** | **ZERO import statements** (`§2.1` item 3); **`docs/specs/gsession.md` `§2.5`, `docs/specs/container.md`'s three exports and every other sibling are named here ONLY as boundaries**, never composed, never imported, never re-expressed | **`R-4`**, `§3.3 I-9`, `§3.4 R-11` |

**(C) THE TEN-TOKEN COLLISION TABLE — the reconciliation the filing owes, in the RCA's own form: *"banned in
layer X for reason Y, legitimate in layer Z because …"*.** **Each ban site's own SCOPE is quoted; the
reconciliation is a DERIVATION WITH DECLARED EXEMPTIONS and BOTH CONTROLS, never a relaxation of a landed
prohibition.**

| # | Token | Where it is BANNED, and the ban's own scope | Why this unit is legitimate there — the reconciliation |
| --- | --- | --- | --- |
| **1** | **`catalog`** | **Not on any landed ban list RE-MEASURED this pass** (`docs/specs/relocate.md` `§3.4 R-1`, `docs/specs/gutter.md` `§3.4 R-1`, `docs/specs/census.md` `§3.4 R-1`/`R-3`, `docs/specs/zones.md` `§3.4 R-1`: **none names `catalog`**; `docs/specs/gsession.md` `§3.4 R-1` bans `selectors`, `threshold`, `data-zone`, `pane-collapse-toggle`, zone/pane/tab/region/dashboard, store/cache and `closest`/`querySelector*` tokens — **none of them `catalog`**). **Its ONLY live constraint is THIS unit's own prohibition 1**, which is why this unit's scan row must declare its own exemptions | **NOT BANNED ANYWHERE, AND IT IS THIS UNIT'S DECLARED CONTRACT VOCABULARY** — it is the **export member name** (`normalizeCatalog`), the **parameter name** and the **type-documentation noun** of the charter itself (`docs/pending.md`'s `SCH-5` row's own title: `MENU-CATALOG-CONTRACT`). **The scan row declares it EXEMPT BY NAME**, and its negative control is that a **`catalog`-free module PASSES**. |
| **2** | **`menu`** | **`docs/specs/gsession.md` `§1` item 8** states **`U-GSESSION`'s** own out-of-scope list (*"No menu catalog (`U-MENULIB`, `E7`)"*) — **that ban's scope is ANOTHER UNIT'S SURFACE**, and `docs/specs/engine-pin.md`'s *"Any `SCH-n` mechanism — no region host, gesture session, menu catalog …"* line has the same scope. **`docs/specs/container.md`'s `R-1` vocabulary list does NOT name the token**, and neither does any other landed scan row (re-measured) | **BANNED IN LAYER `gsession.md`/`engine-pin.md` FOR REASON "that unit must not grow this feature".** **LEGITIMATE HERE ONLY IN THE RENAMED FORM THE CHARTER DEMANDS:** the module's **symbol is `buildMenuTemplate`, the file is `menu-template.ts`, and the emitted type is `MenuTemplate`** — **the word appears as a NAME in `menu-template`-derived identifiers and NOWHERE as a menu composition, a `Menu` reference, a menu-bar reference or an app menu name.** **THE NARROW FORM THIS CONTRACT PINS: the module's bytes may carry the token only inside those declared identifiers, and the scan row names them as its declared exemptions with the positive control that a `Menu`/`MenuItem`/`setApplicationMenu` reference FAILS** (`§3.4 R-2`). |
| **3** | **`template`** | **THE REAL COLLISION OF THIS UNIT, AND IT IS A HOMONYM, NOT A CONFLICT.** **The provident envelope's own `template` KEY is the meaning the family's scanners see everywhere**: **`src/**` carries it in `src/main/battery-host.ts`, `src/shared/path-fork-cycle.ts`, `src/shared/demo-envelope.ts`, `src/renderer/runtime.ts` and `src/renderer/secure-panels.ts`; `tests/**` carries it in the `template.root.hooks` paths of many suites; and `src/main/mcp-server.ts` carries the MCP *resource* template.** **`docs/specs/census.md` `§3.4 R-3`'s scan** reads *"the MODULE's source … code with comments stripped"* for banned **literals as mechanism CONSTANTS** — **its scope is a vocabulary/literal claim over a module file, and `template` is on no ban list it enumerates** | **NOT BANNED; THE COLLISION IS *SPELLING*, AND THE SEMANTIC DIFFERENCE IS NAMED HERE SO NO READER CONFLATES THEM.** **The provision envelope's `template` is the `{ root, … }` node tree of an envelope; THIS unit's template is a CALLER-SHAPED MENU-TEMPLATE VALUE.** **The module neither reads nor emits an envelope, imports no engine type, and names no `template.root` path.** **The scan row's exemption list therefore names the four `menu-template`-derived identifiers and states the difference in one line; a scan asserting *"the module contains no `template` token at all"* is UNFALSIFIED and must not be filed** — the exact `S-ML-2` vacuity class. |
| **4** | **`role`** | **No landed ban list names `role`** (re-measured: `relocate.md` `R-1`, `gutter.md` `R-1`, `census.md` `R-3`, `zones.md` `R-1`, `projection.md` `R-17` — **none**). **It IS live vocabulary in `src/renderer/runtime.ts`** as the **provident anchor** member (`a.role === 'content'`), i.e. **a different domain with a different owner** (this repo's app graph) | **NOT BANNED, AND IT IS ONE OF THE SEVEN CARRIED KEYS THIS CONTRACT PINS** (`§0A` note 2). **The module carries it VERBATIM and gives it NO meaning**: it is **not** a closed union, **not** a default and **not** a documented constant here. **The scan row's falsifiable half is the thing that matters: a `role` LITERAL (`'file'`, `'edit'`, `'window'`, `'help'`) in the module's bytes FAILS `R-8`, while the `role` KEY NAME in the carry list PASSES** — **both controls, and the difference between a KEY NAME and a VALUE LITERAL is exactly the distinction the row must carry.** |
| **5** | **`item`** | **No landed ban list names `item`** (re-measured; **the near-misses are `docs/specs/listhost.md`'s `itemFactory` and `docs/specs/container.md`'s `item` usages, both in PROSE**). **`docs/specs/user-flow-audit.md` `§7.1`** uses *"item"* in ordinary prose. **Re-measurement of the token itself is CAPPED by the search tool** (`\bitem\b` reports `250` of `5965` matching lines across `docs/**`, `tests/**`, `scripts/**` and `src/**`) — **so its hit count is stated as a CAPPED discovery figure and is NOT used as a proof anywhere.** | **NOT BANNED — AND THE HONEST READING IS THAT IT IS TOO COMMON TO BAN.** **This contract uses it ONLY through the pinned member name `items` and the noun "item" in prose about the emitted entry.** **The scan row does NOT claim a ban on the bare token** (a row doing so would fail on `items` itself and on this repo's own prose); its claim is the **closed key set** and the **literal set** — the two claims that can actually FAIL. |
| **6** | **`picker`** | **No landed ban list names `picker`** (re-measured). **Its only live constraints are this unit's own prohibitions.** | **NOT BANNED, AND IT IS THIS UNIT'S OWN SEAM NAME AND ONE OF ITS TWO DECLARED `kind` LITERALS.** **The reconciliation is the charter's own: the picker is INJECTED, NOT OWNED** — so **the module carries the CALLER's picker and its answer, and renders nothing.** **The row's controls: a module implementing a picker (a `dialog` call, a render, an element) FAILS `R-2`; a module carrying the `'picker'` token as its one declared `kind` literal PASSES `R-8`.** |
| **7** | **`dialog`** | **`docs/specs/gutter-ui.md` `§4.4 S-12`** (*"this unit may park its battery **only for a STRUCTURAL reason** — **an OS-owned native dialog**, or a scope the leg cannot reach"*) — **its scope is the `[U]`-row parking rule of ANOTHER unit.** **`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `SCH-5` pre-amendment row** records the decline reason *"the consumer is the fork's app menu and dialog; **this repo ships no `Menu`/dialog usage**"* — **its scope is the REPO's own absence of a menu/dialog surface, which this unit must not change.** | **BANNED IN LAYER `gutter-ui.md` FOR REASON "an OS-owned native dialog is a structural, not a convenient, parking reason" — it is a PARKING rule, not a token ban; and CITED in the handoff FOR REASON "this repo ships no menu/dialog usage".** **LEGITIMATE HERE BECAUSE THIS UNIT OPENS NOTHING:** the word appears in this contract **only inside the OS-boundary clause's refusal** (*"opens no dialog"*) and in the **negative half** of the row that would catch one. **The falsifiable half is `R-2`: a `dialog` API reference in the module FAILS, and the clause's presence PASSES.** |
| **8** | **`accelerator`** | **No landed ban list names `accelerator`** (re-measured: `8` matching lines across `3` files — `docs/pending.md`'s `SCH-5` row, `docs/specs/provident-electron-shell-chrome-handoff-review.md` (twice) and `docs/specs/menulib-review.md` (**`5` lines**) — **and ZERO in `src/**`, ZERO in `tests/**`**). **Its only live constraint is the charter's own acceptance line** (*"no policy defaults (no default accelerators …)"*) | **NOT BANNED — IT IS ONE OF THE SEVEN CARRIED KEYS AND A NAMED NON-DEFAULT.** **The module carries the caller's `accelerator` value VERBATIM and REGISTERS NOTHING**: **no `accelerator` API call, no key-string parsing, no modifier table, no default key.** **The row's controls: an accelerator KEY-LITERAL (`'CmdOrCtrl+N'`) or an accelerator API call in the module FAILS `R-8`/`R-2`; the `accelerator` KEY NAME in the carry list PASSES.** |
| **9** | **`platform`** | **No landed ban list names `platform`** (re-measured: **`11` matching lines, ALL in ONE file, `src/shared/dom-shim.ts`, where the word means the SHIM's mirror of the browser platform** — *"the platform's own"*, *"the platform THROWS on such a write"*, *"the platform's `DOMStringMap`"*; **`src/renderer/runtime.ts` does NOT carry it**). **The ban-shaped site nearest it is `H-r5`'s no-shim-expansion rule, whose scope is SHIM MEMBERS.** | **NOT BANNED, AND THIS IS THE SHARPEST RECONCILIATION IN THE TABLE.** **`dom-shim.ts`'s `platform` is the REALM's DOM platform, named in prose about a shim bound; THIS unit's `platform` is a CALLER-SUPPLIED OPAQUE STRING that the module compares to ONE literal `'darwin'` and otherwise never interprets.** **The module reads no shim, imports no shim, adds no shim member, and calls no `process.platform`.** **The row's controls: a `process.platform` / `navigator` / `os.platform` read in the module FAILS `R-7`; the `platform` KEY NAME and the one `'darwin'` literal PASS.** |
| **10** | **`darwin`** | **The gate-1 record's step-1 reading was *"`darwin` occurs nowhere in `docs/**`"*.** **RE-MEASURED THIS PASS (`G-1`'s own discharge requires the re-measurement): `darwin` occurs `9` times in `docs/**` across `3` files — `docs/pending.md` (1), the handoff record (2) and the STEP-1/2/3/4 FILING HOME `docs/specs/menulib-review.md` (6) — and `24` times in the ROOT `package-lock.json` (the bundled `esbuild`/`rolldown`/`lightningcss` platform package names `@esbuild/darwin-arm64` and their `os` fields).** **ZERO in `src/**` and ZERO in `tests/**`.** | **NOT BANNED ANYWHERE, AND THE STEP-1 READING IS EXPLAINED RATHER THAN CONTRADICTED: at step 1 the token genuinely appeared nowhere in `docs/**`; the `9` occurrences are ALL PROVENANCE CREATED BY THE REVIEW ITSELF** (this unit's charter row, the handoff disposition row and the gate-1 record's own four steps) — `G-1`'s discharge test is a **grep**, and this table **is** its result, stated at filing. **`package-lock.json`'s occurrences are BUNDLED BINARY PACKAGE NAMES, not this repo's vocabulary, and they are evidence for `§5.1`'s `package-lock.json` DENIAL rather than against it.** **The reconciliation this unit owes: `'darwin'` is the ONE platform literal the mechanism may own, and the scan row declares it EXEMPT BY NAME with the positive control that a SECOND platform token or a `process.platform` read FAILS.** |

**(D) THE SEMANTICS TABLE FOR EVERY IDENTIFIER THIS CONTRACT NAMES — and NONE of them is
`undefined-until-answered`.** **Every row states the identifier's REFERENT, its DOMAIN and its SOURCE, so no
TestWriter has to guess what a name means** (the `docs/pending.md` `§K` `K-4`/`H-3` class: *"a bare identifier
in a contract without a semantics row"*).

| Identifier | What it IS (the referent) | Its domain (exactly) | Its source |
| --- | --- | --- | --- |
| **`normalizeCatalog`** | a **value export**: the pure, total untrusted-catalog normalizer | the input domain is **ANY JavaScript value** (the `12`-shape pool, `§5.5.1 P-ML-IM-1`); the return is **`readonly CatalogEntry[]`**, `[]` for every unusable input | caller — the module's own name |
| **`buildMenuTemplate`** | a **value export**: the pure, total menu-template builder — **the RENAMED `buildMenuFromCatalog`** | the input domain is **ANY catalog value × ANY options value**; the return is **`MenuTemplate`** | caller — the RENAMED name pinned by `Q1`/`G-1` |
| **`selectCatalogItem`** | a **value export**: the picker-answer selector | the input domain is **ANY catalog value × ANY picker value**; the return is **`unknown \| null`** — the picker's own answer by identity, or `null` | caller — the module's own name |
| **`PickerFn`** | a **type declaration**: the ONE contract edge's shape | `(candidates: readonly CatalogEntry[]) => unknown` — **a caller closure over the caller's own candidates** | caller — this contract's `§2.1` item 2 |
| **`CatalogEntry`** | a **type declaration**: the NORMALIZED carried entry | **exactly the seven declared own keys**, each `unknown`, in the declared order | caller — this contract's `§0A` note 2 |
| **`ProjectedItem`** | a **type declaration**: the EMITTED carried entry | **exactly the same seven own keys**, nomically distinct name (`§2.3` item 7) | caller — this contract's `§0A` note 2 |
| **`PlatformProjection`** | a **type declaration**: the emitted platform record | `{ recognized: boolean; collapsing: boolean }` — **two members, no third** | caller — `§0A` note 5 |
| **`MenuTemplate`** | a **type declaration**: the emitted template value | `{ items: readonly ProjectedItem[]; platform: PlatformProjection }` — **two members at the top level** | caller — the record's *"five-member shape"* |
| **`TemplateOptions`** | a **type declaration**: the builder's option bag | `{ platform: unknown; picker?: PickerFn \| unknown }` — **`platform` REQUIRED, `picker` OPTIONAL** | caller — `§2.4` items 2/3 |
| **`catalog`** (the parameter) | **the CALLER's untrusted input** — app data | **ANY JavaScript value**, including absent, `null`, a non-array, an empty array, an array of hostiles | caller — the charter's *"untrusted-catalog normalizer"* |
| **`platform`** (the value) | **the CALLER's opaque platform token** — never an OS this module reads | **ANY JavaScript value**; the module reads exactly one equality against the literal `'darwin'` | caller — `Q2`, `§0A` notes 3/4 |
| **`picker`** (the seam) | **the CALLER's own picker closure** — injected, never owned | **`PickerFn` when callable; anything else is an absence** (`§2.4` item 1) | caller — `A-d4`'s injection answer |
| **`items`** | the emitted projected sequence | **`readonly ProjectedItem[]`**, in catalog order; `[]` for an unusable catalog | this contract — `§0A` note 5 |
| **`platform`** (the emitted member) | the emitted platform projection | **`PlatformProjection`** — the three-outcome pool | this contract — `§0A` note 5 |
| **`recognized`** | **a PROJECTION member**: whether the caller's `platform` value is a platform-shaped (string) value | **`true` for every string; `false` for every non-string and for an absent value** — **a DERIVATION, `§0A` note 4** | this contract — `§0A` note 4 |
| **`collapsing`** | **a PROJECTION member**: whether the collapse RULE is in force for this call | **`true` exactly when `platform === 'darwin'`; `false` for everything else** | `Q2` — `§0A` note 3 |
| **`id`** | **a CARRIED member of an item** — the caller's own identity token | **ANY JavaScript value — THE OPAQUE, NEVER-VALIDATED, NEVER-MINTED DOMAIN** (`§5.5.1`'s fourth domain, `§2.3` item 8) | caller — **never this module** |
| **`label`** · **`accelerator`** · **`role`** · **`kind`** · **`submenu`** · **`enabled`** | **six further CARRIED members** — caller data | **ANY JavaScript value each**; **`role` and `kind` carry NO vocabulary of this module's**; **`kind` is compared to ONE literal (`'picker'`) and otherwise not interpreted** | caller |
| **`kind === 'picker'`** | **the ONE value-comparison the collapse rule makes** | a strict equality against the caller's own `kind` member | this contract — `§2.3` item 5 |
| **`submenu`** (on a collapsed parent) | **the emitted member carrying the REST of the run as projected items** | **`readonly ProjectedItem[]` in catalog order** — on the collapse path only | this contract — `§2.3` item 5 |
| **the `'darwin'` literal** | **the ONE platform token the module owns** | the exact string `'darwin'` — **no other string, no prefix, no case-insensitive match** | `Q2` — `§0A` note 3 |
| **the `'picker'` literal** | **the ONE `kind` token the module owns** | the exact string `'picker'` | this contract — `§2.3` item 5 (the record's `Q2` words: *"adjacent `'picker'`-kind items"*) |
| **`buildMenuFromCatalog`** | **the FORK's OLD symbol name, and THE RENAMED PROVENANCE** — **not an identifier of this module** | **not exported, not aliased, not re-exported, not deprecated-and-kept** | the charter's acceptance line — `§3.4 R-5`'s negative control |

**(E) THE RE-MEASURED HIT COUNTS FOR THE COLLISION TABLE, ATTRIBUTED TO THIS FILING PASS.** **The gate-1
record's step-1 counts are that pass's; every figure below is THIS filing's own read-tool search over this
workspace, taken this pass, and each is a count of MATCHING LINES — a discovery device, not a proof** (the RCA's
own caveat). **Every count is stated with the tool's own cap where the cap fired, because a capped count is not
a total.**

| Token | This pass's measurement | Reading |
| --- | --- | --- |
| **`darwin`** | **`34` matching lines across `5` files** — `package-lock.json` (**`24`**, bundled binary package names + `os` fields) · `docs/specs/menulib-review.md` (**`6`**) · `docs/pending.md` (**`1`**) · `docs/specs/provident-electron-shell-chrome-handoff-review.md` (**`2`**) · one further line in the same provenance set (the record's own `§1`) — **ZERO in `src/**`, ZERO in `tests/**`** | `docs/**` carries the token **`9`** times, **all provenance created by this gate**; the lockfile's `24` are bundled package names (`§2.2`(C) row 10) |
| **`accelerator`** | **`8` matching lines across `3` files** — `docs/pending.md` (**`1`**) · the handoff record (**`2`**) · `docs/specs/menulib-review.md` (**`5`**) — **ZERO in `src/**`, ZERO in `tests/**`** | provenance only; the token is a **carried key name**, never a literal |
| **`catalog`** | **`15` matching lines across `5` files** — `docs/specs/provident-electron-shell-chrome-handoff-review.md` (**`4`**) · `docs/specs/menulib-review.md` (**`3`**) · `docs/FORKER.md` (**`1`**) · `docs/pending.md` (**`1`**) · `docs/next-steps.md` (**`2`**) plus the remaining lines of those files — **ZERO in `src/**`, ZERO in `tests/**`** | **this unit's own declared contract vocabulary**; on no landed ban list |
| **`menu`** | **`34` matching lines across `12` files** — `docs/specs/menulib-review.md` (**`13`**) · `docs/specs/provident-electron-shell-chrome-handoff-review.md` (**`5`**) · `docs/specs/battery-handlers-greens.md` (**`5`**) · `docs/decisions.md` (**`2`**) · `docs/next-steps.md` (**`2`**) · `docs/FORKER.md` (**`1`**) · `docs/specs/gsession.md` (**`1`**) · `docs/specs/pending`-set (**`1`**) · `docs/specs/engine-pin.md` (**`1`**) · `docs/defects.md` (**`1`**) · `docs/specs/gemma4-blind-*.md` (**`2`**) · `tests/**` (**`1`**, a `dropdown-menu` compound) — **ZERO in `src/**`** | the `tests/**` line is a **compound of another domain** (`dropdown-menu`), not a menu claim (`§2.2`(C) row 2) |
| **`picker`** · **`dialog`** | **`24` matching lines across `8` files** for the pair — `docs/specs/menulib-review.md` (**`11`**) · `docs/specs/provident-electron-shell-chrome-handoff-review.md` (**`4`**) · `docs/next-steps.md` (**`2`**) · `docs/FORKER.md` (**`1`**) · `docs/pending.md` (**`1`**) · `docs/specs/gutter-ui.md` (**`2`**, both `dialog` in the parking rule) plus the remaining lines of those files — **ZERO in `src/**`, ZERO in `tests/**`** | provenance only; this unit's own seam name and a cited parking rule |
| **`platform`** | **`11` matching lines, ALL in ONE file (`src/shared/dom-shim.ts`)** — **`0` in any other `src/**` file, `0` in `tests/**` relevant to this unit** | the shim's DOM-platform prose, a DIFFERENT domain (`§2.2`(C) row 9) |
| **`role`** | **`5` matching lines, ALL in ONE file (`src/renderer/runtime.ts`)** — the provident **anchor** member (`a.role === 'content'`) | a different domain with a different owner (`§2.2`(C) row 4) |
| **`template`** | **CAPPED BY THE SEARCH TOOL: `250` of `412` matching lines, across `30`+ files in `docs/**`, `src/**`, `tests/**` and `scripts/**`.** **`src/**` carries it in `5` files** (`src/main/battery-host.ts`, `src/main/mcp-server.ts`, `src/shared/path-fork-cycle.ts`, `src/shared/demo-envelope.ts`, `src/renderer/runtime.ts`, plus `src/renderer/index.html`'s `grid-template-columns`) **and `scripts/**` in `2`** (`scripts/electron-divergence.mjs`, `scripts/electron-ui.mjs`) — **so THIS FIGURE IS A CAPPED DISCOVERY COUNT AND IS NOT A TOTAL** | **the homonym of `§2.2`(C) row 3**: the **provision envelope's** `template` key, in a different domain — and the reason the module's scan row may **not** assert a bare-token ban |
| **`item`** | **CAPPED BY THE SEARCH TOOL: `250` of `5965` matching lines, across `docs/**`, `tests/**`, `scripts/**` and `src/**`** — **a token too common to be a ban candidate** | **no ban is claimed on the bare token** (`§2.2`(C) row 5); the claims that can FAIL are the closed key set and the literal set |

**THE SCAN ROWS' DECLARED EXEMPTIONS, NAMED HERE ONCE SO NO SCAN ROW IS VACUOUS** (`§4.4 S-ML-2`): **`R-1`'s
exemptions are this unit's own contract vocabulary — the three function names, the six type names, the seven
carried key names, the two platform member names, and the words `catalog`/`menu`/`template`/`picker`/`item`/
`platform`/`role`/`kind`/`accelerator` AS IDENTIFIERS AND KEY NAMES** — plus **the two tokens `'darwin'` and
`'picker'` as LITERALS**; **`R-8`'s exemptions are the four declared literal bodies of `§2.1` item 4.** **A scan
row that does not name them is VACUOUS.**

### 2.3 The value rules — stated falsifiably

**Item 1 — THE NORMALIZER'S DISPATCH RULE, in full, evaluated in this order (the order is the contract).**

| Order | Condition (exact) | The return value |
| --- | --- | --- |
| **(a)** | `catalog` is an array (`Array.isArray`), of length `>= 1`, and every element reaches order `(b)` or `(c)` | **the array of `CatalogEntry`s produced by the carry rule, ONE PER USABLE ELEMENT, in catalog order** — length is the count of usable elements, which may be `0` |
| **(b)** | the current element is a **carried object**: `typeof element === 'object' && element !== null`, **or** an array | **one `CatalogEntry` whose OWN READABLE members are the seven declared keys, each read BY OWN KEY** (`Object.prototype.hasOwnProperty`-equivalent) and handed on **VERBATIM by identity**; **a declared key the element does not own is ABSENT from the emitted entry — the module NEVER supplies an `undefined` placeholder** (`§2.3` item 9) |
| **(c)** | otherwise — the element is **absent** (`undefined`), `null`, or a **non-object primitive** (a number, a string, a boolean, a `Symbol`, a `BigInt`), or a function | **the element is SKIPPED — it contributes NO entry and NO throw** |
| **(d)** | **any element whose own-key read THROWS** (a `Proxy` with a throwing `getOwnPropertyDescriptor`/`ownKeys`/`get` trap, a revoked `Proxy`, a record whose accessor throws) | **the element is SKIPPED, the throw is ABSORBED, and NOTHING ESCAPES the call** |
| **(e)** | `catalog` is **not an array** — absent, `undefined`, `null`, a primitive, a `Symbol`, a `BigInt`, a function, a plain object, a `Map`, a **revoked `Proxy` whose trap check itself throws** | **`[]` — the declared EMPTY answer**; **NOTHING THROWS**; and **the answer is the SAME for every such input** |

**⟶ PIN 1 OF THE GATE-6 CONTRACT DISPOSITION (`2026-09-27`, gate 5's `F-1`; annotate-never-rewrite — the dispatch table above stays VISIBLE and unedited, and **NO ROW ID, TERM, CAP, SEED OR STRATEGY ID MOVES**).** **THE RULE AS WRITTEN IS CONFIRMED AND THE MODULE OWES THE FIX, NOT THIS DOC: A FUNCTION-TYPED ELEMENT IS SKIPPED EXACTLY AS A NON-OBJECT IS** — for every function shape (a named `function`, an arrow, an `async` arrow, a generator, a `class`, a bound arrow) it contributes **NO entry**, carries nothing by identity, and **can never reach `items`**: an emitted item is **never a function** and **never a keyless record materialized for one**. **THE MEASURED CONTRADICTION THIS PIN SETTLES** (gate 5's fail 1, `§3d` item (2); the module at `ffdb978`): `normalizeCatalog([fn])` yields **ONE keyless entry** and `buildMenuTemplate([fn]).items` reads **`[{}]`** across all six function shapes, against **`§2.3` item 1(c)** and **item 11 clause 4** — so **the owed remedy is the Implementer's (red-first, after a TestWriter row), NOT a clause change here**; the owed row is a NEW TestWriter row, of the same `P-ML-TP-4` class `§3d`'s round-3 action 2 names for the nested-hostile regression. **`§3c`'s PIN 2 KEYLESS READING DOES NOT REACH A FUNCTION:** an empty seven-name intersection is carried keyless **only for a CARRYABLE element** (a non-null object, an array — item 1(b)); a function falls under item 1(c) and is skipped. **Consequence a row can assert: `buildMenuTemplate([item, fn, item]).items.length` is `2`, never `3`.** **NO `§3` row, register cell, term, cap or seed moves.**

**Item 2 — THE SEVEN-KEY CARRY RULE, AND THE DROP RULE (`G-2`'s discharge).** **EACH EMITTED ITEM CARRIES EXACTLY
THE SEVEN OWN KEYS `id` · `label` · `accelerator` · `role` · `kind` · `submenu` · `enabled`, IN THAT DECLARED
ORDER, AND EVERY OTHER OWN KEY IS DROPPED, NEVER COPIED.** **THE ROW IS FALSIFIABLE ONLY AS A NEGATIVE, and this
is the contract's own wording: `§3.4 R-12` DRIVES A CATALOG ELEMENT CARRYING AN **EIGHTH** OWN KEY (and a ninth,
and an inheritable prototype member) AND ASSERTS THE EMITTED ITEM'S OWN-ENUMERABLE-STRING-KEY SET IS EXACTLY THE
SEVEN — so an implementation that copies extras FAILS, and an implementation that copies only the seven PASSES.**
**`Object.keys(emittedItem)` is the assertion's subject**; **a `Symbol` key or a non-enumerable member on the
SOURCE is likewise not carried**; and **a source member INHERITED FROM A PROTOTYPE is NOT carried** (the read is
BY OWN KEY and nothing else).

**⟶ PIN 2 OF THE GATE-6 CONTRACT DISPOSITION (`2026-09-27`, the adversarial pass's `A-2`; annotate-never-rewrite — items 2 and 9's as-written clauses above and below stay VISIBLE and are READ THROUGH this pin).** **THE READING IS PINNED, AND IT IS THE ENUMERABLE ONE: A PROJECTED ITEM CARRIES ONLY THE SOURCE'S OWN ENUMERABLE STRING MEMBERS.** The own-key read is **`Object.prototype.propertyIsEnumerable`-equivalent**, so **a DECLARED member the source owns NON-ENUMERABLY is OMITTED from the emitted item** — exactly as a non-declared own key, a `Symbol` key and a prototype-inherited member are (`item 2`'s other half, `M-8`, `§3.4 R-12`(b)). **THE ALTERNATIVE — READING a declared member that is merely non-enumerable — IS NOT TAKEN**, because it would carry a member **no `Object.keys` reader can see** and would make the own-read `hasOwnProperty`-equivalent. **THE KEY COUNT, STATED SO A ROW CAN BE AUTHORED: for a source owning exactly the seven declared names with exactly ONE of them (`role`) declared NON-ENUMERABLE, the projected item's own-enumerable-string-key set is the OTHER SIX names in declared order — `Object.keys(item).length === 6`, and `'role' in item === false` — so an implementation that reads the non-enumerable `role` FAILS.** **THIS IS THE CONTRACT'S READING AND NOT MERELY A CODE PROPERTY: the landed module's own `readOwn` already filters on `propertyIsEnumerable` (`src/shared/menu-template.ts`), so this pin records the measured behaviour as the RULE, and the TestWriter owes the row that drives it.** **NO clause above is rewritten, and no row id, term, cap or seed moves.**

**Item 3 — THE NORMALIZER IS TOTAL, AND ITS TOTALITY IS THE CONTRACT'S FOUNDATION.** **For EVERY input in the
`12`-shape pool (`§5.5.1 P-ML-IM-1`, whose members are the catalog domain's declared extent), the returned value
is a declared one and NOTHING THROWS.** **A shape gate that refuses an input, a coercion that converts one, and a
throw on any member are each FAILURES.** **The `12`-shape pool is NOT claimed to be the whole input space** — it
is the **declared extent** of the enumeration, and the row carries a `(bounded)` marking for exactly that reason.

**Item 4 — THE PLATFORM PROJECTION RULE, EVALUATED IN THIS ORDER (the order is the contract).**

| Order | Condition (exact) | `recognized` | `collapsing` | The `items` structural effect |
| --- | --- | --- | --- | --- |
| **(a)** | `typeof platform === 'string'` **and** `platform === 'darwin'` | `true` | **`true`** | **THE COLLAPSE APPLIES** (`§2.3` item 5) |
| **(b)** | `typeof platform === 'string'` **and** `platform !== 'darwin'` | `true` | `false` | **THE IDENTITY PROJECTION** — `items` is the normalized sequence unchanged |
| **(c)** | `platform` is **not a string** — including the **absent** case (`options` omitted entirely, or the member omitted, or carried as `undefined`), `null`, a number, a boolean, a `Symbol`, a `BigInt`, an object, an array, a function, a hostile `Proxy` | **`false`** | `false` | **THE IDENTITY PROJECTION** — `items` is the normalized sequence unchanged |

**Item 5 — THE COLLAPSE RULE, AND THE COLLAPSE'S ORDERING (`G-3`'s discharge, and correction (d)'s missing
row).** **On the `'darwin'` path ONLY:** **each MAXIMAL RUN of TWO OR MORE entries whose `kind` is STRICTLY EQUAL
to the literal `'picker'` becomes ONE emitted entry, and that entry's `submenu` member carries the REST of the
run as PROJECTED ITEMS IN CATALOG ORDER** (`§5.5.1 P-ML-IM-5` is the row; **`P-ML-IM-5`'s own cell names the run
rule's boundary, and `§7a.1` item 3 records the run boundary's singleton and non-adjacency halves as THIS
FILING'S DERIVATION**). **The rules of the projection, in full:**

1. **THE PARENT CARRIES ITS OWN SEVEN KEYS AS THE IDENTITY PROJECTION WOULD CARRY THEM** — the collapse changes
   **`submenu` and nothing else**: `id`, `label`, `accelerator`, `role`, `kind` and `enabled` are **the first
   entry of the run's own carried members, verbatim**. **The parent's `kind` therefore remains `'picker'`.**
2. **THE `submenu` MEMBER IS REPLACED (or created) WITH `readonly ProjectedItem[]` = the REST OF THE RUN, IN
   CATALOG ORDER**, each of them carrying **the same seven keys** under the carry rule (`§2.3` item 2) —
   including a nested `submenu` **only if that entry itself owned one** (the collapse is **NOT applied
   recursively**; stated so the claim is falsifiable).
3. **THE RUN IS MAXIMAL AND IT IS MEASURED ON THE NORMALIZED SEQUENCE**, before any projection — so an element
   skipped by the normalizer (`§2.3` item 1(c)/(d)) **cannot bridge or split a run**.
4. **A RUN OF EXACTLY ONE `'picker'` ENTRY IS NOT COLLAPSED**: it is emitted as an identity-projected entry, and
   **no `submenu` is created for it**. *(This is THIS FILING'S DERIVATION — `§7a.1` item 3.)*
5. **RUNS SEPARATED BY ANY NON-`'picker'` ENTRY ARE SEPARATE RUNS**: the collapse is **not** applied across an
   intervening item, because *"the rest in catalog order"* cannot survive a re-ordering. *(THIS FILING'S
   DERIVATION — `§7a.1` item 3.)*
6. **NON-`'picker'` ENTRIES ARE UNTOUCHED AND KEEP THEIR RELATIVE POSITIONS**, and **the emitted sequence's total
   order is the catalog's order with each collapsed run replaced IN PLACE by its single parent.**
7. **THE COLLAPSE APPLIES TO A RUN WHOSE ENTRIES CARRY `enabled: false` TOO** — **`enabled` is CARRIED, never
   consulted** (the module reads **no** member of entry data as a decision; `P-ML-1`/`P-ML-3`).

**(A DATED SUB-RULE OF RULE 1 — `2026-09-27`, the Implementer's stop, defect `B`; `§2.4` item 6 is the full pin and
this line exists so a reader of the run rule is not left with two readings.)** **RULE 1's VERBATIM clause holds for
`id` · `label` · `accelerator` · `role` · `kind` and the replaced `submenu`, and is READ AS GOVERNED BY `§2.4` item
6 FOR THE `enabled` MEMBER WHEN AND ONLY WHEN the seam is absent, non-callable or throwing** — **in that case the
collapsed parent's `enabled` reads `false`, its six other members stay verbatim, and the SUBMENU's own entries keep
THEIR carried `enabled` verbatim because the collapse is NOT recursive (rule 2 above).** **This paragraph is the
DATED SUB-RULE itself; the pin is `§2.4` item 6 and the corrected row leg is `§3.1 M-7`.** **`P-ML-IM-5`'s run
shapes and its term `12` are unaffected: that row's assertions are `items.length`, the parent's members BY IDENTITY,
the submenu's length/order/identity and the non-replacement of nested `submenu`s.**

**⟶ PIN 5(i) OF THE GATE-6 CONTRACT DISPOSITION — A SKIPPED ELEMENT AND A COLLAPSE RUN (`2026-09-27`, gate 5's `F-3` ambiguity as recorded at `§3d`; annotate-never-rewrite — `§5.5.1` method note (a)'s and `§7`(C)(1)'s as-written cells stay VISIBLE and are read only through this pin).** **RULE 3 GOVERNS AND IT GOVERNS ALONE: THE RUN IS MEASURED ON THE NORMALIZED SEQUENCE, SO A SKIPPED ELEMENT CANNOT SPLIT A RUN.** **THE PINNED READING, DRIVEN: `[pickerA, null, pickerB]` under `platform: 'darwin'` normalizes to a TWO-member `'picker'` run — the skip is not part of the sequence and is not a barrier — and emits ONE collapsed parent whose `submenu` carries `pickerB` in catalog order; `items.length === 1`, and NO singleton is emitted for either picker.** **THE COMPETING READING — the skip treated as a barrier, `items.length === 2`, two singletons, no `submenu` on either — is `SUPERSEDED` as a reading of rule 3**, because it contradicts the sentence it cites (*"measured on the NORMALIZED sequence"*); it stays visible at its own sites under this pin. **WHY RULE 3 WINS, SO THE CHOICE IS CHECKABLE: rule 3 is the normative clause and it NAMES the measurement basis; `§5.5.1` method note (a) is a NOTE, `§7`(C)(1) is a method reading and `P-ML-IM-5`'s boundary-drive cell is a CELL — so the ROW/NOTE/CELL is re-grained and the clause is not.** **WHAT DOES NOT MOVE: `P-ML-IM-5`'s term `12` (its `2` boundary drives stay `2`), the declared total `126`, the caps, the seed, `§2.3` item 5 rules 1/2/4–7 and the `'darwin'`-only collapse.** **THE RE-GRAIN OWED IS ROW-SIDE AND NAMED: `§5.5.1` method note (a)'s two-singleton drive, `§7`(C)(1), `P-ML-IM-5`'s skip-bridged boundary-drive expectation, and gate 5's `ML-G-15` re-drive (`docs/specs/menu-template-greens.md` — its PASS was already BOUNDED to rule 3's text, so its reading stands and only its target re-drive is owed).**

**Item 6 — THE PICKER'S INVOCATION RULE, AND THE "COUNTED ONCE" CLAUSE (correction (b)'s missing row).** **The
module invokes the caller's `picker` AT MOST ONCE per `buildMenuTemplate` invocation and AT MOST ONCE per
`selectCatalogItem` invocation**, with the **carried candidate entries** as its single argument, and **hands its
answer on UNCHANGED**. **`buildMenuTemplate` invokes it exactly `1` time WHEN AND ONLY WHEN the carried
(the `darwin`-collapsed, if applicable) emitted sequence contains at least one entry whose `kind` is strictly
`'picker'`, AND the seam is callable; otherwise the count is exactly `0`** — **and a module that invokes it a
second time, that retries a throwing seam, or that caches an answer across calls FAILS `P-ML-SM-2`/`P-ML-SM-3`,
whose cells assert the count EXACTLY and never "at least".** **A caller that wants its own `invoke`/activation
bookkeeping keeps it on its own side of the boundary** (`§1` item 6; `§4.4 S-ML-8`).

**⟶ PIN 5(iii) OF THE GATE-6 CONTRACT DISPOSITION — WHICH ARGUMENT THE SEAM RECEIVES (`2026-09-27`, gate 5's `F-5` ambiguity as recorded at `§3d`; annotate-never-rewrite — item 6's as-written sentence above names the seam's argument TWICE and stays VISIBLE).** **THE SEAM'S ARGUMENT IS PINNED: THE PICKER RECEIVES THE PRE-COLLAPSE CARRIED CANDIDATES** — `normalizeCatalog(catalog)`'s own return, `readonly CatalogEntry[]`, **in catalog order, BEFORE any collapse (`§2.3` item 5) is applied.** **The item's second naming (*"the (`darwin`-collapsed, if applicable) emitted sequence"*) is `SUPERSEDED` AS THE ARGUMENT'S READING: the collapsed sequence is the template's shape, never the seam's input.** **WHY THIS READING, STATED: it is the one that keeps the seam's input IDENTICAL across the three platform outcomes** — the collapse is a projection of the emitted template, so a seam fed the collapsed sequence would see a different candidate set on `'darwin'` than on `'win32'` for the same catalog — **and it is the reading gate 5's driver measured (`candidates.length === 2` on a call whose emitted `items.length === 1`).** **BOTH READINGS YIELD THE SAME INVOCATION COUNT, so NO COUNT ROW, TERM, CAP, SEED OR STRATEGY ID MOVES:** what this pin settles is the **argument's CONTENT**, and **the row that can FAIL for it asserts the candidate array's LENGTH, ORDER and MEMBER IDENTITY against the pre-collapse carried array** (the post-collapse length is the losing expectation). **`P-ML-IM-7`'s five count drives, `P-ML-SM-2`/`P-ML-SM-3` and `P-ML-TP-2`'s `9` shapes are UNCHANGED.**

**Item 7 — THE TWO CARRIED TYPES ARE NOMINALLY DISTINCT, AND THE DISTINCTION IS A NAME, NOT A STRUCTURE.**
**`CatalogEntry` and `ProjectedItem` are STRUCTURALLY IDENTICAL — the same seven `unknown` members in the same
declared order — and they are SEPARATELY DECLARED, SEPARATELY NAMED EXPORTS.** **This is deliberate: the two are
the PRE-projection and POST-projection carried shapes, the record pins `ProjectedItem`'s name, and a `tsc` probe
may assert their structural identity (`A extends B` and `B extends A`) WITHOUT asserting that the types are the
same declaration.** **`§4.4 S-ML-10` bars a row that claims a TYPE IDENTITY beyond that** — the distinction is
**nominal**, the two names must both exist (`§3.4 R-5`(b)), and **the projection's real difference (the collapse
path's `submenu` replacement) is a VALUE rule, not a type rule.**

**Item 8 — THE `id` DOMAIN: NEVER VALIDATED, NEVER MINTED, AND COMPARED BY STRICT IDENTITY ONLY.**
**The module NEVER validates an `id`** — no type test, no non-emptiness test, no uniqueness test, no format test,
no length limit — and **it NEVER generates, coerces, stringifies, trims, case-folds, hashes, re-keys or dedupes
one**. **The ONE operation the module performs on an `id` is a STRICT-IDENTITY comparison (`===`) inside
`selectCatalogItem`, against the OWN `id` member of each carried entry of the catalog it was given** — so:
**(a)** `NaN` as an `id` **never matches itself by `===`** and is **not** "found"; **(b)** two distinct objects
with equal contents **never match** unless they are the **same reference**; **(c)** an `id` absent from every
carried entry is **not found**, and **the module neither invents a match nor throws**; **(d)** **a catalog
element that carries NO `id` member contributes no candidate** and is not a validation failure.
**THE CONSEQUENCE, stated so no reader over-reads it: "known `id`" means "an `id` this catalog's carried entries
carry", NEVER "a well-formed `id`".**

**Item 9 — THE ABSENT-MEMBER RULE, STATED ONCE SO THE NEGATIVE IS FALSIFIABLE.** **A declared key the source
element does not OWN is ABSENT from the emitted entry — the module supplies NO `undefined` placeholder, NO
`null` placeholder and NO default.** **The consequence a TestWriter must drive: on a source element carrying only
`{ id: 'a', label: 'A' }`, the emitted item's own-enumerable-string-key set is `['id','label']` — FIVE of the
seven keys absent — and `Object.keys(emitted).length === 2`.** **An implementation that materializes all seven
keys with `undefined` values FAILS `§3.4 R-12`, and one that materializes them with `null`/`''`/`false` FAILS it
too.** **THIS IS THE MIRROR OF THE DROP RULE (`§2.3` item 2) AND IT IS THE OTHER HALF OF `G-2`'s "exactly
seven" claim: the key set is EXACTLY the intersection of the seven declared names with the source's own keys.**

**Item 10 — THE EMPTY CATALOG'S DECLARED VALUE, AND THE PROJECTION'S INDEPENDENCE FROM IT.** **For an empty
array, `[]` is the declared `items` value and `[]` is `normalizeCatalog`'s return — and the `platform` member is
STILL emitted by the three-outcome rule** (so a `'darwin'` call with an empty catalog reads
`{ items: [], platform: { recognized: true, collapsing: true } }`). **`collapsing` describes the RULE IN FORCE,
never an empirical count of collapsed runs** — **stated because the alternative reading is tempting and would make
`collapsing` a function of the data rather than of the platform**: **`collapsing` is a function of `platform`
ALONE.**

**Item 11 — ⟶ THE CARRY RULE, PINNED (`2026-09-27`, the Implementer's stop, defect `C`; annotate-never-rewrite —
items 1/2/9's as-written clauses above stay VISIBLE and are read THROUGH this pin).** **THIS IS THE CLAUSE `F-2`'s
TWO MUTUALLY UNSATISFIABLE PAIRS AND `P-ML-IM-1` ATTEMPT 12's THREE-KEYS-AGAINST-SEVEN CONTRADICTION BOTH
NAME.**

**THE DEFECT, AS MEASURED: NO CARRY RULE SATISFIES EITHER OF `F-2`'s PAIRS.** `F-2` asserts `out[1] toBe(nested)`
**and** `Object.keys(out[1]) === ['0']`, and `out[2] toBe(valid)` **and**
`Object.keys(out[2]) === ['id','label','kind']` — **the array `[nested]` owns `['0']` while `nested` owns the
seven, and `el({id:'valid'})` owns the seven while the declared expectation reads three; so neither IDENTITY
(`toBe`) nor a fixed seven-key COPY satisfies either pair.** **`P-ML-IM-1` attempt 12 reads the same gap from the
other side: it expects the entry for `el({id:'nested'})` to carry THREE keys while `M-1` and `KEY_SHAPES`(1) pin
that source shape to SEVEN.**

**THE PINNED RULE, IN FOUR CLAUSES — AND IT IS THE SAME AT `normalizeCatalog` AND AT `buildMenuTemplate` (the
projection changes no key set):**

1. **A PROJECTED ITEM IS A FRESH RECORD, NEVER THE CALLER'S OWN ENTRY AND NEVER A REFERENCE CARRY.** **The
   module returns NO value that IS a caller's catalog element: for each USABLE element it materializes a NEW
   record whose OWN ENUMERABLE STRING KEYS are the DECLARED ORDER FILTER of the source's own keys.** **(The
   module retains nothing either — `§2.5` item 1's "never retains it" is unchanged, and the caller's catalog MAY
   be mutated between calls without changing any contract claim.)**
2. **THE KEY SET IS THE INTERSECTION, IN DECLARED ORDER — NOT A FIXED SEVEN.** **`Object.keys(emitted)` deep-equals
   exactly the names of `['id','label','accelerator','role','kind','submenu','enabled']` that the SOURCE OWNS, in
   that declared order.** **`§2.3` item 2's opening clause ("exactly the seven … in that declared order") is
   therefore read AS `§2.3` item 9 already reads it — the intersection of the seven declared names with the
   source's own keys — and the "exactly" is a claim about the CLOSED DECLARED LIST, never a promise that five of
   them are fabricated.** **An own key OUTSIDE the seven is DROPPED, NEVER COPIED; a `Symbol` key, an
   non-enumerable member and a prototype-inherited member are NOT carried (`§2.3` item 2's other half, unchanged).
   THE ORDER IS PART OF THE CLAIM: a present key's position is its declared position, never the source's
   position.**
3. **THE VALUES ARE HANDED ON BY IDENTITY.** **Each present member's value IS the source's own value (`Object.is`
   / `toBe`), never a shallow copy, never a coercion and never a re-key — so `§2.3` item 2's "VERBATIM by identity"
   holds at the MEMBER level while the RECORD is fresh.** **This is the same identity rule `§2.1` item 2 pins for
   the picker's answer (`selectCatalogItem` returns the caller's own answer BY IDENTITY `toBe`) and the rule
   `§2.3` item 8 pins for `id` comparison.**
4. **AN ENTRY OWNING FEWER THAN SEVEN KEYS → ABSENT KEYS ARE OMITTED, AND A NON-OBJECT ELEMENT IS SKIPPED.**
   **`§2.3` item 9's absent-member rule is the SAME clause and needs no new one: absent keys are ABSENT — no
   `undefined` placeholder, no `null`, no `''`/`false`/`0`, no default.** **The "fewer than seven" case has TWO
   shapes and both are declared: (a) the source does not OWN the key → the key is ABSENT from the emitted item;
   and (b) the source OWNS the key and its value IS `undefined` → the key is PRESENT and its value is `undefined`
   (`'enabled' in item === true`), which is the difference `M-8` asserts.** **AND `§2.3` item 1(c)'s SKIP is
   total: a non-object element, `null`, `undefined`, a primitive, a `Symbol`, a `BigInt` or a function contributes
   NO entry and carries NOTHING by identity — no entry is ever a primitive.**

**THE TWO ASSERTIONS `F-2` SHOULD CARRY, PRINTED SO THE REPAIR IS NOT A RE-DERIVATION** (`catalog = [null,
undefined, 42, 'x', Symbol('s'), 12n, () => 1, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid,
accessor]`, `protoRecord = Object.assign(Object.create(null), { id: 'proto', label: 'P' })`, `nested =
el({ id: 'nested' })`, `valid = el({ id: 'valid' })`):

- **entry 1 (the null-prototype record): `out[0]` deep-equals `{ id: 'proto', label: 'P' }` in VALUE, its own key
  set is exactly `['id','label']` (it OWNS two, so two are carried — no prototype member was read), and its two
  values ARE the source's own (`toBe`).**
- **entry 2 (the ARRAY element `[nested]`): `Object.keys(out[1])` deep-equals `['0']`, and its own value IS the
  caller's own array element (`out[1]['0']` IS `nested`, `toBe`) — **and `out[1]` is a FRESH RECORD, so
  `out[1] toBe([nested])` is FALSE** (the array's `'0'` key is carried; the array itself is not the entry).**
- **entry 3 (the plain record `valid = el({id:'valid'})`): `Object.keys(out[2])` deep-equals
  `['id','label','accelerator','role','kind','submenu','enabled']` — SEVEN, because that source owns all seven —
  and each value IS the source's own (`toBe`), while `out[2]` is a FRESH RECORD (so `out[2]` is not `valid` by
  `toBe`, though it is `toEqual` to it).** **The three carried ids in catalog order remain
  `['proto','nested','valid']`, `out.length === 3`, and the accessor-throwing record is SKIPPED (`§2.3` item
  1(d)).**
- **the pair that must NOT be filed as written:** **`out[2] toBe(valid)` with `Object.keys(out[2])` reading
  `['id','label','kind']` is UNSATISFIABLE and is DELETED** (the source owns seven and three was never derivable);
  **and `out[1] toBe(nested)` is DELETED with it.** **`F-2`'s as-filed text stays VISIBLE at its own row under its
  dating.**

**⟶ PIN 4 OF THE GATE-6 CONTRACT DISPOSITION — THIS ITEM'S WORKED READING IS CORRECTED `3 → 4`, AND THE TWO NAMED LISTS ARE RECONCILED (`2026-09-27`, gate 5's `F-2` fail; annotate-never-rewrite — the as-written `out.length === 3` line above, its `out[1]` array index and its `['proto','nested','valid']` id list stay VISIBLE and are the figures this pin corrects).** **THE CORRECTED WORKED READING IS `out.length === 4`, with the FOUR carried key sets in catalog order reading EXACTLY `[[], ['id','label'], ['0'], [seven]]` and the ARRAY at index `2`; the as-written `3`, its `out[1]` index and its three-id list are `SUPERSEDED` as an ARITHMETIC ERROR OF THIS ITEM** (the as-written list contains **no keyless source**, which is why its own three figures never reconciled). **THE KEYLESS ENTRY IS THE WHOLE SUBJECT OF THE RECONCILIATION, AND THE TWO NAMED LISTS ARE RECONCILED HERE: `§3c`'s corrected reading counts FOUR carried entries because it carries a KEYLESS CARRYABLE source, while this item's AS-WRITTEN thirteen-element list contains NO KEYLESS CARRYABLE source — and under PIN 1 above, its `() => 1` contributes NOTHING (a function is SKIPPED).** **SO THE FIXTURE THAT MAKES THIS ITEM'S `4` TRUE IS NAMED: the as-written thirteen-element list PLUS ONE CARRYABLE KEYLESS SOURCE (a `{}` or an `Object.create(null)` element — `§3c` pin 2's own reading, `I-5`); over the AS-WRITTEN thirteen elements ALONE the reading is `3`, with key sets `[['id','label'], ['0'], [seven]]`.** **THE PRINTED LISTS, RECONCILED HONESTLY: as printed, this item's list and `§3c`'s corrected list are TEXTUALLY IDENTICAL — the same THIRTEEN names in the same order — so the `14`-ELEMENT UNION `§3d`'s gate-5 record reports is NOT DERIVABLE from the printed forms and is NOT adopted here; what differs between the two readings is the KEYLESS ENTRY'S SOURCE, not the printed list.** **THE OWED ROW IS NAMED: a TestWriter row drives the keyless source EXPLICITLY and asserts the four key sets in order — an implementation that drops the keyless entry or the array, or that CARRIES THE FUNCTION, FAILS it; and the landed harness's own `F-2` fixture, which currently reads its keyless entry FROM the function element, owes that re-grain.** **NO TERM MOVES: `P-ML-IM-1`'s term stays `12` and the declared total stays `126`.**

**`P-ML-IM-1` ATTEMPT 12 AND `M-1`/`KEY_SHAPES`(1) ARE NOW MADE TO AGREE, AND WHICH FIGURE IS RIGHT IS STATED IN
ONE LINE: THE SEVEN IS RIGHT FOR A SOURCE THAT OWNS SEVEN, AND THE ATTEMPT'S OWN FIXTURE IS NOT THAT SOURCE.**
**The attempt's shape `(12)` is `[nullProtoEl(), el({id:'nested'}), throwingAccessorRecord()]`, so the CORRECT
declared expectation is TWO CARRIED ENTRIES — the null-prototype element with key set `['id','label']` and the
ARRAY element with key set `['0']` — with the accessor-throwing record SKIPPED; the attempt's as-authored
`[SEVEN_KEYS, ['id','label','kind']]` (a THREE-key reading of `el`) is `SUPERSEDED`, and the carried LENGTH for
that shape is `2`, not `3`.** **`M-1` and `KEY_SHAPES`(1) keep SEVEN for `el()` — i.e. for a source that owns all
seven keys — and with clause 2 above the two clauses are now the SAME rule rather than two figures.**
**`P-ML-IM-1`'s term stays `12` (a count of CATALOG SHAPES, not of entries or keys), `P-ML-IM-3`'s term stays
`12` (`4` key-set shapes × `3` census readings) and NO term, cap, seed or strategy id moves.**

**WHAT STILL HOLDS UNCHANGED, so the pin is not read as a general loosening: `M-8`'s eighth/ninth-key DROP, its
`Symbol` and non-enumerable exclusion and its INHERITED-`role` exclusion; `M-1`'s and `M-3`'s identity reads —
which are MEMBER-level reads (`carried[i][k]` against the source's own member) and are satisfied by this rule as
written in the landed harness's `identityMismatch`; `R-12`'s three halves; and `§2.3` item 7's nominal
distinction between `CatalogEntry` and `ProjectedItem`, which is a NAME distinction and not a structural
one.**

**⟶ THE THREE SUB-READINGS ABOVE ARE NOW PINNED — `2026-09-27`, `§3c` (the fourth gate-3 event; annotate-never-rewrite, and this line moves NO clause, NO row id, NO strategy id, NO seed, NO cap and NO term: the declared total stays `126`).** **THIS AMENDMENT IS READ BESIDE THE FOUR CLAUSES ABOVE, NEVER IN PLACE OF THEM:** **(1) an ARRAY element IS CARRYABLE** — a fresh record of its own present index keys, values by identity, a carried object member being carried in turn (**`['0']`** for a one-element array; `['0','1','2']` … in ascending numeric order for a several-element one; `length` never carried) — **which is what `§2.3` item 1(b)'s own as-filed words (*"or an array"*) already said**; **(2) a carryable record whose own-readable intersection with the seven declared names is EMPTY is CARRIED as a record with NO keys** — **never dropped** (*"absent keys are omitted"* governs which keys, never whether the element is emitted; `P-ML-IM-1` clause 11's *"non-carryable"* is the `§2.3` item 1(c) class ONLY) — **so `buildMenuTemplate([{}])` gives `items.length === 1`** (`I-5`); and **(3) a record whose accessor throws is SKIPPED ENTIRELY, never partially carried** (`§2.3` item 1(d) — the own-key read must COMPLETE, over the enumeration AND every owned member, before any record is built). **THE SINGLE COMPOSED CARRY RULE, THE WORKED `F-2`/`P-ML-IM-1`-shape-`(12)` LENGTHS, the module-side `carries()` guard's THREE SUB-DEFECTS and the printed term verdict are at `§3c`.**

### 2.4 The seam rules — the ONE contract edge, its four declared degradations, and the composition boundary

**THE OWN-SEAM SET IS A SINGLE OPTIONAL MEMBER.** **There is NO factory, NO options object the module owns, NO
session and NO per-call state**: the caller passes its inputs as **arguments** and the module returns a value.
**The ONE contract edge is the INJECTED PICKER**, and it is **the part of the contract a fork implements** —
ruling 5's rule applied: *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION
rule is normative contract text."* **The form is `docs/specs/gutter-ui.md` `§R.3`'s** (name · signature ·
required? · what a fork supplies · declared degradation), and **the last column of this table is the row that can
FAIL**.

**Item 1 — THE FOUR DECLARED DEGRADATIONS, EACH WITH ITS OWN FALSIFIABLE ROW** (`G-4`'s discharge: **"the
`'picker'`-kind item emitted DISABLED, never dropped" is a separate observable from "the seam's count is zero"
and from "`selectCatalogItem` returns `null`", so each is its own row**).

| Class | The declared behaviour | The row that can FAIL |
| --- | --- | --- |
| **(1) ABSENT seam** — the member omitted from `options`, or `options` omitted entirely, or the member carried as `undefined` | **ZERO picker invocations**; **the `'picker'`-kind item is emitted DISABLED — `enabled` reads `false` — AND IS NEVER DROPPED** (it remains in `items`, carrying its other carried members); **`selectCatalogItem` returns `null`**; **NOTHING THROWS**; **no mechanism default appears (no `''`, no `0`, no `{}`, no empty label, no sentinel)** | **`M-4`** and **`§3.4 R-12`** — a module that DROPS the `'picker'` item, or that throws, or that substitutes a default `enabled`, FAILS |
| **(2) NON-CALLABLE seam** — `null`, a number, a string, a boolean, a `Symbol`, a `BigInt`, an object, an array, a **function-shaped `Proxy` whose `apply` trap throws** | **the SAME declared behaviour as class (1), with `null` reading IDENTICALLY to the other non-callables**; **ZERO invocations**; **a module that COERCES the seam into a call, or GUESSES a callable, FAILS** | **`M-4`**'s second drive |
| **(3) THROWING seam** — a closure whose body throws (including a **non-`Error`** throw, and a `Proxy` trap that throws) | **the invocation is ATTEMPTED exactly ONCE (count `1`)**, **the throw is CAUGHT INSIDE THE MODULE'S OWN WRAPPER AND ABSORBED**, **the item is emitted DISABLED as in class (1)**, **`selectCatalogItem` returns `null`**, **NEVER propagated and NEVER retried**; **and a `try`/`catch` at the CALLER's boundary is NOT a conformant implementation** (the contract's own wording: *"caught inside the wrapper … never propagated"*) | **`M-5`** — a module that PROPAGATES the throw FAILS; **the count is ASSERTED (`1`), never "at least"**, so a retry FAILS |
| **(4) NON-`null` answer naming NO KNOWN `id`** | **`selectCatalogItem` returns `null`** — and **the module does NOT fall back to the answer, does NOT coerce it, and does NOT throw**; the answer is **not** a validation error, it simply names no `id` this catalog carries (`§2.3` item 8) | **`M-6`** — a module that returns the answer anyway, or that coerces an `id` to find a match, FAILS |

**AND THE POSITIVE ARM, which is what makes the four degradations non-vacuous: a `non-null`, KNOWN-`id` answer is
returned BY IDENTITY (`toBe`), and the invocation count is EXACTLY `1`.**

**⟶ PIN 3 OF THE GATE-6 CONTRACT DISPOSITION — THE BUILDER'S ANSWER IS UNUSED (`2026-09-27`, the adversarial pass's `A-4`; annotate-never-rewrite — the four degradation classes, the positive arm above and every `§2.3` item 6 cell stay VISIBLE and unedited).** **DECLARED AT THIS ITEM, BECAUSE THIS ITEM IS THE SEAM'S OWN TABLE: `buildMenuTemplate` INVOKES THE PICKER AND USES ONLY WHETHER THE INVOCATION SUCCEEDED — THE ANSWER IS NEVER READ, NEVER CARRIED, NEVER COMPARED AND NEVER RETURNED.** **A callable seam's whole observable contribution to the builder is its AVAILABILITY: an answer that is `null`, `undefined`, a primitive, an object or a fully ENTRY-SHAPED record produces the SAME template as any other successful invocation** — **the emitted `items` never contains, echoes or derives from the answer** (`§2.3` item 6's once-count and `§2.4` item 6's `enabled` reading are the builder's only two seam effects). **THE ONLY EXPORT THAT READS AN ANSWER IS `selectCatalogItem`** (`§2.3` item 8's strict-identity rule); **a module that stores, forwards, defaults or re-emits the builder's answer FAILS this item's class (4) arm and `§3.4 R-6`.** **THE OWED ROW IS NAMED, AND IT IS THE TESTWRITER'S: a drive of a NON-`null`, ENTRY-SHAPED builder answer (a recording picker returning a sentinel, and one returning a carried entry) asserting the emitted template is UNCHANGED by it — and it is a ROW, NOT A TERM.** **NO REGISTER TERM MOVES HERE. If a later pass adds it as a FURTHER REGISTER DRIVE — its natural home is `P-ML-IM-7`'s `5` count drives — THAT PASS OWES THE PRINTED ARITHMETIC (`P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`), and it must NOT be substituted for `§5.5.2` item 10's SEPARATE, still-owed lone-surrogate re-grain, which carries the same three figures: if both land the total is composed at that pass and its terms are printed there.** **NO ROW ID, TERM, STRATEGY ID, SEED OR CAP MOVES IN THIS PIN.**

**(A DATED POINTER, `2026-09-27`, the Implementer's stop, defect `B`: classes (1)/(2)/(3)'s `enabled === false` is
READ AS `§2.4` item 6's PINNED READING, which governs `§2.3` item 5 rule 1's verbatim clause for that ONE member
and extends the same `false` to an UNCOLLAPSED singleton `'picker'` entry; classes (1)–(3)'s as-written rows above
and `P-ML-TP-2`'s cells are UNCHANGED by it, and the corrected row leg is `§3.1 M-7`.)**

**Item 2 — `platform` IS REQUIRED AND OPAQUE.** **`TemplateOptions.platform` has NO default and NO omission
arm**: an omitted `platform` is **the `recognized:false, collapsing:false` arm** (`§2.3` item 4(c)) and **NOT a
`'darwin'` default and NOT a throw** — **the `Q2` clause's own words: *"never a silent darwin default."***
**The module reads NOTHING else from the value: no `.length`, no `.toLowerCase()`, no prefix test, no
`process.platform` comparison, no `navigator` read.**

**Item 3 — `picker` IS OPTIONAL, AND ITS ABSENCE IS A DECLARED DEGRADATION RATHER THAN A PRECONDITION.** **A
conformant call with no picker at all is legal, total and fully declared** — `§2.3` item 6 and item 1 above give
its whole behaviour. **A contract that made the seam REQUIRED would make the module unusable for a caller with no
picker; a contract that made its absence a throw would give this unit a refusal domain it does not have.**

**Item 4 — THE COMPOSITION BOUNDARY, AND THE SIBLINGS THIS UNIT DOES *NOT* COMPOSE.** **This module composes
NOTHING**: it imports no sibling (`§2.1` item 3), it is imported by no `src/**` file (`§3.5 X-1`), it names no
session, and **`docs/specs/gsession.md` `§2.5`'s frozen delegate surface has NO referent here** (ruling 14) —
**it is named in this file for exactly one purpose: so that a later pass CANNOT read this unit as composing it.**
**A pass asserting ANY composition or import edge between this unit and any sibling, in either direction, is a
FABRICATED EDGE and a `§4.4 S-ML-9` STOP.**

**Item 5 — ⟶ THE OS-BOUNDARY CLAUSE, CARRIED VERBATIM IN SUBSTANCE BECAUSE IT IS `Q3`'S FILING DUTY AND `G-5`'s
DISCHARGE TEST.** ***(The gate-1 record's own words; this clause is the prohibition that makes the module's
whole artifact honest, and NOTHING in this file may weaken it.)*

> **this unit emits a caller-shaped template value and nothing else; it composes no `Menu`, applies no
> accelerators, renders no picker, opens no dialog, and asserts no equivalence between the native menu and any
> in-renderer picker; every claim in this contract is data-in/data-out and falsifiable in the node suite.**

**ITS SIX HALVES, EACH WITH A FALSIFIER ROW** (`G-5`'s second half — *"a falsifier row exists for each of its six
halves"*):

| Half of the clause | The falsifier row, and what FAILS |
| --- | --- |
| **1. "emits a caller-shaped template value and nothing else"** | **`§3.4 R-2`** — a module that returns anything other than the declared `MenuTemplate` shape, that writes a file, a store, a global, an element or a console line, or that returns a `Menu`-shaped object FAILS |
| **2. "composes no `Menu`"** | **`§3.4 R-2`** and **`§3.4 R-4`** — any `Menu`/`MenuItem`/`setApplicationMenu` reference, **and any `electron` import** (which is the only route to one), FAILS; **the charter's acceptance line is this falsifier's positive control** |
| **3. "applies no accelerators"** | **`§3.4 R-8`** — an accelerator literal (`'CmdOrCtrl+N'`, `'Alt+F4'`, a modifier table) or an accelerator API call FAILS; `accelerator` as a CARRIED KEY NAME passes |
| **4. "renders no picker"** | **`§3.4 R-2`** — any element, node, dialog, text or render call FAILS; **the picker is the CALLER's and the module only invokes it** (`§2.4` item 1) |
| **5. "opens no dialog"** | **`§3.4 R-2`** — a `dialog`/`showOpenDialog`/`showMessageBox` reference FAILS; the word appears in this contract only inside this refusal |
| **6. "asserts no equivalence between the native menu and any in-renderer picker"** | **`§3.3 I-11`** and **`§7` item 2** — **any row, green, DONE row or prose that reads this unit's emitted template as evidence about a NATIVE MENU, a rendered PICKER, or an equivalence between the two FAILS**; the equivalence is **the fork's app concern** (the gate record's `§3`, quoting the handoff's `S-d6` per-unit equivalence limits: *"the native menu and the in-renderer picker are NOT equivalent"*) |

**THE HONEST READING OF THE PLATFORM RULING, STATED AT ITS OWN SITE: `'darwin'` is a VALUE the caller supplies
and the module compares; the collapse it triggers is a SHAPE RULE over the caller's own data.** **It is NOT an
observation about an operating system, NOT a detection, and NOT a claim that the emitted template would be
accepted by any platform's menu API** (`§3.3 I-11`).

### 2.5 The composition boundary

**Item 1 — WHAT THE MODULE MAY READ, AND NOTHING ELSE.** **`catalog` is read by OWN KEY ONLY** — the module
inspects no prototype, triggers no getter it can avoid, and reads **no member of an entry as a DECISION** except
the two declared comparisons (`kind === 'picker'` for the collapse rule; `id === <answer>` inside
`selectCatalogItem`). **A record read is a TOTAL read**: a hostile holder, an absent member or a **throwing
accessor** yields "unusable" / "absent" rather than an exception (`§2.3` item 1(d)). **Consequence: the caller's
catalog MAY BE MUTATED between calls without changing any contract claim; the module never writes to it and
never retains it** (`§3.3 I-4`).

**Item 2 — WHAT THE MODULE OWNS, AND WHAT IT DOES NOT.** **The module OWNS: the three function names, the six
type names, the parameter and member names of its own surface, the seven carried key names, the two platform
member names, the two tokens `'darwin'` and `'picker'`, and the declared empty answers (`[]`, `null`,
`{recognized:false, collapsing:false}`).** **It owns NOTHING ELSE** — no item name, no label, no accelerator, no
role, no `kind` vocabulary beyond the one token, no menu, no picker, no dialog, no platform table, no default and
no element. **The catalog is the CALLER's; the picker is the CALLER's; the values are the CALLER's.**

**Item 3 — THE ONE-INVOCATION DISCIPLINE, AND ITS LIMIT.** **Each function is INDEPENDENT and STATELESS:
`normalizeCatalog(catalog)` invokes nothing; `buildMenuTemplate(catalog, options)` invokes the picker at most
once (`§2.3` item 6); `selectCatalogItem(catalog, picker)` invokes the picker at most once.** **There is NO
registry, NO session and NO cross-call state, and therefore NO "second composer" hazard to detect** — **stated as
a LIMIT rather than a claim: a caller that wires two different closures into `picker` at two call sites gets two
answers, and THIS MODULE CANNOT DETECT IT.**

**Item 4 — THE FROZEN-SESSION BOUNDARY, ANSWERED SO THE EDGE IS EXPLICITLY A NON-EDGE.** **DOES THIS UNIT CALL
OR IMPORT THE FROZEN `§2.5` DELEGATE SURFACE? — NO, and the answer is this unit's own derivation rather than an
inherited copy:** **this unit's whole input is a catalog value, a platform value and a picker closure; it takes
no element, starts no gesture, commits nothing and has no lifecycle to compose** (`§1` items 2/4/5). **So
`docs/specs/gsession.md` `§2.5` names no signature of this contract, and this contract names none of its own**
(`§3.3 I-9`).

**Item 5 — THE ENTRY-POINT PATH QUESTION, ANSWERED (`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`).** **DOES THE
ALLOWED FILE SET CONTAIN A PATH FROM THE APPLICATION'S ENTRY POINT TO THIS MECHANISM? — NO, AND THAT IS THE
DERIVATION'S OWN RESULT, NOT AN INHERITED COPY.** **Because `§5.1`'s allow-list contains ONE production path
(`src/shared/menu-template.ts`) and NO `src/**` edit, no `src/renderer/**` path, no `src/main/**` path and no
demo-envelope path can reach it** — **so the mechanism has NO importer, NO rendered surface, and NO in-app
instantiation site** (`§5.2`'s structural refusal, `§7` item 4).

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]** the
divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row**, and **every row is
a contract row for the TestWriter; none is a measurement this pass took.** **Every row carries an id and a
`Pinned by` citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The normalizer carries the catalog's usable elements, in order, and invokes NOTHING** | `normalizeCatalog(catalogA)` where `catalogA` is a frozen array of three carried objects | **the return is an array of EXACTLY `3` entries IN CATALOG ORDER**; **each entry's own-enumerable-string-key set is exactly the intersection of the seven declared names with its source's own keys** (`§2.3` item 9); **each carried value IS the source's value BY IDENTITY (`toBe`)**; **`catalogA` is reference-identical and value-identical before and after**; **NOTHING THROWS** | `§2.3` items 1/2/9, `§5.5.1 P-ML-IM-1`, `I-1` | `[T]` |
| **M-2** | **The builder emits the five-member shape, and the top-level member census is EXACTLY two names** | `buildMenuTemplate(catalogA, { platform: 'win32' })`, then `Object.keys(template)` and `Object.keys(template.platform)` | **`Object.keys(template)` deep-equals `['items','platform']`** (own enumerable string keys, in that order); **`Object.keys(template.platform)` deep-equals `['recognized','collapsing']`**; **`Array.isArray(template.items)` is `true`**; **`template.platform.recognized === true`** and **`template.platform.collapsing === false`**; **`Object.getPrototypeOf(template) === Object.prototype`** and no member is a getter; **NOTHING THROWS** | `§2.1` item 2, `§0A` note 5, `§5.5.1 P-ML-IM-4`, `I-3` | `[T]` |
| **M-3** | **The IDENTITY projection is EXACT for a recognized non-`darwin` platform** (`G-3`'s first static row; correction (d)'s missing row) | `buildMenuTemplate(catalogB, { platform: 'win32' })` where `catalogB` carries a run of three `'picker'`-kind entries, and the same call with `platform: 'linux'` | **`items` carries the SAME NUMBER of entries as the carrying normalizer produced, in the SAME ORDER, with the SAME carried members**; **NO entry's `submenu` was replaced or created by the module** (each `submenu` is exactly what its own source carried, or absent); **`collapsing === false`**; **`recognized === true`**; **`items` deep-equals the identity expectation entry by entry** | `§2.3` item 4(b), `§5.5.1 P-ML-SM-2`, `G-3` | `[T]` |
| **M-4** | **THE DECLARED DEGRADATIONS OF AN ABSENT OR NON-CALLABLE SEAM, on both entry points** | (a) `buildMenuTemplate(catalogB, { platform: 'darwin' })` with `picker` omitted; (b) the same with `picker: undefined`; (c) with `picker: null`; (d) with `picker: 42`; (e) with `picker: 'x'`; (f) with `picker: {}`; (g) `selectCatalogItem(catalogB, undefined)` and (h) `selectCatalogItem(catalogB, null)` | **every drive: the recorded invocation count is `0`**; **the `'picker'`-kind item (or the collapsed parent) IS EMITTED and reads `enabled === false` — it is NEVER DROPPED from `items`**; **(g)/(h) return the declared EMPTY answer `null`**; **NOTHING THROWS**; **no mechanism default appears (no `''`, no `0`, no `{}`, no sentinel, no invented label)**; **`null` reads the SAME as the other non-callables** | `§2.4` item 1 classes (1)/(2), `§3.4 R-12`, `§5.5.1 P-ML-TP-2` | `[T]` |
| **M-5** | **THE DECLARED DEGRADATION OF A THROWING SEAM: ONE attempted invocation, absorbed INSIDE the wrapper** | `buildMenuTemplate(catalogB, { platform: 'darwin', picker: () => { throw new Error('x') } })`; also with a `Proxy` whose `apply` trap throws; also with a closure throwing a non-`Error` (`throw 'x'`, `throw 42n`, `throw null`); and `selectCatalogItem(catalogB, throwingPicker)` | **the recorded invocation count is EXACTLY `1`** (the attempt IS counted); **the `'picker'` item reads `enabled === false`**; **`selectCatalogItem` returns `null`**; **NOTHING ESCAPES either call**; **the seam is NEVER RETRIED (the count stays `1`)**; **and a second call with the same throwing seam produces the same declared answer with its own count of `1`** | `§2.4` item 1 class (3), `§0A` note 2, `§5.5.1 P-ML-SM-2`/`P-ML-SM-3` | `[T]` |
| **M-6** | **The picker's KNOWN-`id` answer is returned BY IDENTITY, and the invocation count is EXACTLY one** | a recording picker returning the sentinel object `answer`, over a catalog whose first entry carries `id: 'a'`; (a) `selectCatalogItem(catalog, pickerReturning('a'))`; (b) `selectCatalogItem(catalog, pickerReturning(answerObjectWhoseOwnIdIsInTheCatalog))`; (c) `selectCatalogItem(catalog, pickerReturning('zzz'))` — a non-`null` answer naming NO known id | **(a)/(b): the return IS `answer` BY IDENTITY (`toBe`), and the count is `1`**; **(c): the return is EXACTLY `null`, and the count is `1`**; **NO coercion, NO `String(...)`, NO trimming and NO fallback occurred**; **NOTHING THROWS** | `§2.3` item 8, `§2.4` item 1 class (4) + its positive arm, `§5.5.1 P-ML-SM-1` | `[T]` |
| **M-7** | **The `'darwin'` collapse: one parent, the rest in the `submenu`, IN CATALOG ORDER** (`G-3`'s second static row; correction (a)'s missing ordering row) | `buildMenuTemplate(catalogC, { platform: 'darwin' })` where `catalogC` is `[nonPicker1, pickerA, pickerB, pickerC, nonPicker2]` with `pickerA/B/C` each carrying distinct `label`s and distinct `id`s | **`items.length === 3`**; **`items[1]` carries `pickerA`'s own carried members verbatim** (its `id`, `label`, `accelerator`, `role`, `kind === 'picker'`, `enabled`) **with its `submenu` REPLACED by an array of EXACTLY `2` projected items**; **`items[1].submenu[0]` carries `pickerB`'s members and `items[1].submenu[1]` `pickerC`'s** — **IN THAT ORDER**; **`items[0]` and `items[2]` are the two non-picker entries UNCHANGED and IN PLACE**; **`template.platform` reads `{ recognized: true, collapsing: true }`**; **a REVERSED catalog order (`[nonPicker1, pickerC, pickerB, pickerA, nonPicker2]`) moves the parent to `pickerC` and the submenu order correspondingly** | `§2.3` item 5, `§5.5.1 P-ML-IM-5`, `G-3` | `[T]` |
| **M-8** | **The seven-key carry and the eighth-key DROP, with the OWN-KEY rule** (`G-2`'s discharge; correction (c)'s non-falsifiable-as-prose row) | `buildMenuTemplate(catalogD, { platform: 'win32' })` where `catalogD[0]` own-carryies the seven declared keys PLUS `extra: 'must-not-appear'`, `another: 1`; `catalogD[1]` inherits `role: 'parent'` from its prototype and owns the rest; `catalogD[2]` carries a `Symbol` key and a non-enumerable member | **for every emitted item: `Object.keys(item)` deep-equals EXACTLY the seven declared names, IN DECLARED ORDER**; **`'extra' in item === false`, `'another' in item === false`**; **`item.role` is `undefined`/absent for element `1`** (the inherited member was NOT carried); **the `Symbol` key and the non-enumerable member are NOT carried**; **`Object.getOwnPropertySymbols(item).length === 0`** | `§2.3` items 2/9, `§0A` note 2, `§3.4 R-12`, `§5.5.1 P-ML-IM-3`/`P-ML-IM-6` | `[T]` |
| **M-9** | **The whole surface is reachable and returns its declared shapes in ONE composition** | a single drive that imports the module and calls all three exports in sequence with a conformant caller set, reading every return value and every caller-recorded invocation count | **`normalizeCatalog` ⇒ the carried array; `buildMenuTemplate` ⇒ the five-member shape with `items` and `platform`; `selectCatalogItem` ⇒ the picker's own answer or `null`; NOTHING THROWS; and the drive's own totals read `2` recorded picker invocations across its two seam-bearing calls, `7` own keys on every emitted item, and `2` own keys on the emitted template** | `§2.1` items 1/2, `§3.4 R-5`, `§5.5.1 P-ML-IM-1` | `[T]` |

**⟶ PIN 5(ii) OF THE GATE-6 CONTRACT DISPOSITION — `§3.1 M-6`(b) IS UNSATISFIABLE AS WORDED, AND THE IDENTITY READING GOVERNS (`2026-09-27`, gate 5's `F-4` ambiguity as recorded at `§3d`; annotate-never-rewrite — `M-6`'s as-written cell above stays VISIBLE and unedited, and this pin sits AFTER the table so no row is split).** **THE IDENTITY READING IS PINNED: the comparison is STRICT IDENTITY (`===`) against the carried entries' OWN `id` members (`§2.3` item 8, `§3.2 F-7`, `§2.2` `P-ML-10`), so a non-`null` answer that matches a carried `id` only BY VALUE — a fresh `{ id: 'b' }` against a different `{ id: 'b' }`, or any fresh equal-contents object — names NO known id and returns `null`.** **`M-6`(b)'S DRIVE IS THEREFORE ANNOTATED AND RE-GRAINED TO ITS SATISFIABLE FORM: *"a fresh equal-contents object whose own id is in the catalog"* cannot be returned BY IDENTITY unless the answer IS the catalog entry's own `id` VALUE BY REFERENCE — so the drive is: the catalog carries an OBJECT `id`, and the picker returns THAT SAME REFERENCE, which is returned by identity (`toBe`) with the invocation count `1`.** **THE UNAFFECTED ARMS, NAMED SO THE RE-GRAIN IS NOT READ AS A LOOSENING: `M-6`(a)'s string-`id` arm (a string that IS the carried string, matched by strict identity, count `1`), `M-6`(c)'s non-`null` unknown-`id` arm (`null`, count `1`), `§2.4` item 1's class (4) and its positive arm (`G-4`'s string-`id` leg) all stand EXACTLY as filed, and `F-7` is the row that can FAIL for the losing reading.** **NO term, row id, seed, cap or `P-ML-IM-7` cell moves; gate 5's `ML-G-18` re-drive is this re-grain's record.**

**Item 6 — ⟶ THE `enabled` MEMBER OF A DEGRADED `'picker'`-KIND ITEM — `M-4` VERSUS `M-7`, RULED HERE
(`2026-09-27`, the Implementer's stop, defect `B`; annotate-never-rewrite — `§3.1 M-7`'s and `§2.4` item 1's
as-written cells stay VISIBLE, and `M-7`'s losing cell is corrected in place under its own annotation).**

**THE DEFECT, NAMED AS MEASURED: THE SAME CALL CANNOT READ `enabled` AS BOTH `false` AND `true`.** `M-4` (through
`§2.4` item 1 class (1)) requires **the collapsed parent's** `enabled` to read `false` on a `'darwin'` collapse
whose run parent owns `enabled: true`, while `M-7` (through `§2.3` item 5 rule 1) requires **verbatim carry**
(`=== pa.enabled`, i.e. `true`) for the SAME call — and the Implementer measured `p1.enabled = true` under BOTH
readings. **`§2.3` item 5 rule 1's verbatim clause and this subsection's degradation clause are therefore
UNRECONCILED at one member, and one reading must govern.**

**THE PINNED READING, STATED EXACTLY ENOUGH THAT BOTH ROWS AND `P-ML-TP-2`'s CELLS CAN BE ALIGNED WITHOUT
GUESSING — IT IS THE DEGRADATION THAT GOVERNS, because the collapse is a MECHANISM-SHAPED member rather than a
carried consumer value:**

1. **`enabled` IS THE ONE MEMBER THE DECLARATION OWNS.** **On the `'darwin'`-collapsed sequence, when the
   caller's seam is ABSENT, NON-CALLABLE or THROWING, the `'picker'`-kind item's `enabled` member reads
   **`false`** — **whatever the source entry's own `enabled` value was, `true` included** — and **it is the
   SEAM's state that member records** (the seam cannot answer), **not a caller datum and not a fabricated policy
   value** (`P-ML-3` is satisfied: `false` here is the declared DISABLED marker of `§2.4` item 1 classes
   (1)/(2)/(3), i.e. the same class of declared absence as `[]`, `null` and
   `{recognized:false, collapsing:false}` — `I-12`).
2. **EVERY OTHER CARRIED MEMBER KEEPS VERBATIM IDENTITY, BY OWN KEY, UNCHANGED.** **`§2.3` item 5 rule 1
   survives in full for `id` · `label` · `accelerator` · `role` · `kind` and `submenu`** (the parent's `kind`
   remains `'picker'`, its `submenu` is the replaced run array) — **so `M-7`'s identity assertion holds for FIVE
   of its six members and fails only at `enabled`.** **`M-4`'s seven-key census assertion (`Object.keys(parent)`
   deep-equals the seven names) is UNAFFECTED: `enabled` is PRESENT throughout, only its VALUE is fixed.**
3. **THE RULE APPLIES TO THE COLLAPSED PARENT *AND* TO AN UNCOLLAPSED SINGLETON `'picker'` ENTRY.** **`§2.3` item
   5 rule 4's singleton is not collapsed and gains no `submenu`, and its `enabled` reads `false` under the same
   seam degradation** — **otherwise the same seam state would produce a disabled item at one run length and an
   enabled one at another, and `P-ML-TP-2`'s `(a)` drive is a collapsed run precisely because that is the shape
   the clause is about.**
4. **THE RULE DOES NOT FIRE WHEN THE SEAM IS CALLABLE.** **With a callable seam the `'picker'`-kind item's
   `enabled` is the source's own value, VERBATIM** — **and that holds for the callable-seam answers that name no
   known `id` and for an empty (`null`/`undefined`) answer, because class (4) and the empty arm are
   `selectCatalogItem`'s declared answer domain and NOT a seam-availability degradation** (`§2.4` item 1 class
   (4); `§2.3` item 8).
5. **THE COLLAPSE IS NOT RECURSIVE, SO THE RULE IS NOT APPLIED TWICE.** **The submenu's OWN entries keep their
   carried `enabled` verbatim** (each is the identity projection of its own source entry); **the parent is the one
   member the degradation reaches, and the rest of the run is carried as `readonly ProjectedItem[]` with its own
   members untouched.** **`M-7`'s "none of them owned a `submenu`" reading and its per-entry identity readings
   stand unchanged.**
6. **THE RESULTING EXPECTATION A TESTWRITER CAN WRITE WITHOUT GUESSING**, for `catalogC =
   [n1, pa, pb, pc, n2]`, `pa`/`pb`/`pc` carrying `kind: 'picker'` and `enabled: true`, with the picker OMITTED: **`items.length === 3`; `items[1].enabled === false`; `items[1]`'s `id`/`label`/`accelerator`/`role`/`kind`
   identity-equal to `pa`'s; `items[1].submenu` = the rest of the run in catalog order, each entry carrying ITS
   OWN `enabled` (`true`) verbatim; the invocation count is `0`; `selectCatalogItem(catalogC, undefined)` is
   `null`; and NOTHING THROWS.**

**THE LOSING CELL, CORRECTED WITH ITS AS-FILED FORM VISIBLE — `§3.1 M-7`, ONE ASSERTION ONLY.** **AS FILED,
`M-7`'s fourth assertion read:** *"`items[1]` carries `pickerA`'s own carried members verbatim (its `id`,
`label`, `accelerator`, `role`, `kind === 'picker'`, `enabled`) ..."* — **and its landed drive compares
`[parent.id, parent.label, parent.accelerator, parent.role, parent.kind, parent.enabled]` against
`[pa.id, pa.label, pa.accelerator, pa.role, pa.kind, pa.enabled]` (`enabled: true`), i.e. all SIX verbatim. THE
`enabled` LEG OF THAT COMPARISON IS `SUPERSEDED` by this pin: the corrected expectation is
`[pa.id, pa.label, pa.accelerator, pa.role, pa.kind, false]` — five members verbatim and `enabled === false`.**
**`M-4` STANDS UNCHANGED AND IS THE WINNING ROW** — **its class (1) requirement that the `'picker'`-kind item is
EMITTED and reads `enabled === false` is exactly the pinned reading, and its as-filed text needs no
annotation.** **THE AS-FILED `M-7` LEG STAYS VISIBLE BESIDE THE CORRECTED ONE (annotate-never-rewrite), and the
correction is to a ROW'S EXPECTATION, not to a clause.**

**`§5.5.1 P-ML-TP-2`'s CELLS REQUIRE NO CHANGE — and this is recorded because the Implementer's report suggested
they might.** **That row's property text ALREADY pins (a) an ABSENT seam leaving the `'picker'`-kind item EMITTED
AND `enabled === false`, (b) the same for a NON-CALLABLE seam with ZERO invocations, and (c) a THROWING seam
ATTEMPTED ONCE and producing the same disabled item — and its per-attempt assertion already reads "the item's
emitted-ness and `enabled` value ... the recorded invocation count EXACTLY (`0`/`1` by the declared rule)" over
the `9` shapes driven with a run whose entries own `enabled: true`.** **So the register was ALREADY grained to the
pinned reading; the LANDED table is the one that needed alignment, and the alignment is the `M-7` leg above plus
`§2.3` item 5 rule 1's verbatim clause being read as governed by this pin for `enabled` only.** **`P-ML-TP-2`'s
term stays `9`, its strategy id stays `S-ML-SEAM-1`, and its `(bounded)` marking stays.**

**THE TENSION, NAMED RATHER THAN LEFT FOR A READER TO DISCOVER: `§3.3 I-5` reads *"it carries every caller value
verbatim"* and `P-ML-3` forbids a default `enabled`.** **THIS PIN IS NOT A DEFAULT AND NOT AN OVERWRITE OF CALLER
DATA: it is the seam's DECLARED DISABLED MARKER, the one member a degradation owns, and `I-5`'s verbatim claim
holds for every carried member the module does not have a declared degradation for.** **A pass that wants the
`enabled` member to record the SOURCE's value under a degraded seam is asking for a DIFFERENT contract — it moves
`M-4`'s and `P-ML-TP-2`'s (a)/(b)/(c) expectations and `§2.4` item 1 classes (1)/(2)/(3) — and it owes a NEW GATE
(`§7a`/`§7a.1` form), not a spec edit.** **NO ROW ID, TERM, CAP, SEED OR `(bounded)` MARKING MOVES WITH THIS
PIN.**

**⟶ THE `§3.1 M-7` CORRECTION, RESTATED AT THE TABLE IT CORRECTS (`2026-09-27`).** **On `catalogC =
[n1, pa, pb, pc, n2]` with `platform: 'darwin'` and the picker OMITTED: `items.length === 3`;
`items[1].enabled === false`; `items[1]`'s `id`/`label`/`accelerator`/`role`/`kind` identity-equal `pa`'s; and
`items[1].submenu` carries `pb` and `pc` in catalog order with THEIR own carried `enabled` values (`true`)
verbatim — the collapse is not recursive.** **`M-7`'s as-filed sixth leg compared `enabled` too and is
`SUPERSEDED`; the AS-FILED leg remains VISIBLE in `§2.4` item 6's block beside the corrected one; `M-4` was and is
the WINNING ROW, and `P-ML-TP-2`'s cells already read `enabled === false` and need NO change.** **NO ROW ID,
TERM, CAP, SEED OR `(bounded)` MARKING MOVES; the remedy is the harness's `M-7` drive and nothing in `§2.4`
item 1.**

### 3.2 Documented fail-states / non-happy states

**NOTE THE SHAPE: this unit has NO REFUSAL DOMAIN — every outcome below is a VALUE, not an error, and there is
no `ok`/`code`/`reason`/`thrown` anywhere in this contract** (`§2.1` item 2, `§4.4 S-ML-3`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **AN UNUSABLE CATALOG — the normalizer's whole outside, driven in full** | `catalog` = `undefined` (omitted) · `null` · `42` · `-0` · `NaN` · `'x'` · `''` · `true` · `false` · `Symbol('s')` · `12n` · `{}` · `Object.create(null)` · a `Map` · a `Set` · a function · a revoked `Proxy` · a trap-throwing `Proxy` · `[]` | **`normalizeCatalog` returns `[]` and `buildMenuTemplate`'s `items` reads `[]`**; **NOTHING THROWS**; **the `platform` member is STILL emitted by the three-outcome rule** (`§2.3` item 10); **no default item, no placeholder and no sentinel appears** | `§2.3` items 1(e)/3/10, `§5.5.1 P-ML-IM-1`/`P-ML-TP-1` | `[T]` |
| **F-2** | **AN ARRAY OF HOSTILES — every element class the normalizer must survive** | an array carrying `null`, `undefined`, `42`, `'x'`, a `Symbol`, a `12n`, a function, a revoked `Proxy`, a `Proxy` whose `ownKeys` throws, a record whose accessor throws, `Object.create(null)`, an array element, and one valid carried object | **the return carries EXACTLY the usable elements** (`Object.create(null)`, the plain record, the array element and the valid object) **IN ORDER**; **every hostile element is SKIPPED with NO throw**; **the call's own count of emitted entries is asserted exactly, so a module that throws, that emits a placeholder for a hostile, or that silently drops a usable element FAILS** | `§2.3` item 1(b)/(c)/(d), `§5.5.1 P-ML-IM-1`/`P-ML-TP-1` | `[T]` |
| **F-3** | **AN UNRECOGNISED OR NON-STRING `platform` — `Q2`'s no-silent-default clause** | `platform` = `undefined` (member omitted AND `options` omitted) · `null` · `42` · `''` · `'win32'` · `'linux'` · `'Darwin'` (a CASE variant) · `' darwin'` (a WHITESPACE variant) · `'darwin '` · a `Symbol` · `12n` · `{}` · `[]` · a revoked `Proxy` | **EVERY ONE of them emits the IDENTITY projection with `collapsing === false`**; **the case and whitespace variants are NOT `'darwin'` and do NOT collapse**; **`recognized` is `false` for every non-string and `true` for every string by `§0A` note 4**; **NOTHING THROWS**; **NO drive collapses** — **a module with a case-insensitive, prefix or `process.platform` comparison FAILS this row** | `§0A` notes 3/4, `§2.3` item 4, `§3.4 R-7`, `§5.5.1 P-ML-IM-5`/`P-ML-SM-2` | `[T]` |
| **F-4** | **AN UNUSABLE `options` VALUE — the builder's own outside** | `options` = omitted · `null` · `undefined` · `42` · `'x'` · `true` · `[]` · a function · a hostile `Proxy` · an object carrying no `platform` member at all | **the declared `recognized:false, collapsing:false` arm, the IDENTITY projection, the emitted five-member shape and NOTHING THROWS** — **a module that throws on a non-object option bag, or that reads one and propagates an accessor's throw, FAILS** | `§2.4` item 2, `§2.3` item 4(c), `§5.5.1 P-ML-TP-3` | `[T]` |
| **F-5** | **A RUN OF EXACTLY ONE `'picker'` ENTRY, AND TWO RUNS SPLIT BY AN INTERVENING ITEM** (`§7a.1` item 3's two derivations, driven as declared readings) | `[nonPicker, pickerA, nonPicker]` and `[pickerA, pickerB, nonPicker, pickerC, pickerD]`, each with `platform: 'darwin'` | **the singleton is NOT collapsed: `items.length === 3`, `pickerA` carries its own `submenu` value (or none), and NO `submenu` array was created for it**; **in the second drive there are TWO collapsed runs, `items.length === 3`, the first parent carries `pickerB` and the second carries `pickerD`**; **`collapsing === true` in both drives** | `§2.3` item 5 rules 4/5, `§5.5.1 P-ML-IM-5`, `§7a.1` item 3 | `[T]` |
| **F-6** | **THE PICKER'S `null`/EMPTY ARM, AND THE DIALOG-SEAM CLASS THE CHARTER NAMES** | `selectCatalogItem(catalog, () => null)`; `() => undefined`; `() => ''`; `() => 0`; `() => false`; `() => []`; `() => ({})` — each a *"cancel/dismiss/empty"* shape | **each returns EXACTLY `null`** (an empty answer is not a known `id` and the module does not invent one); **the count is `1` for each**; **NOTHING THROWS**; **and NO dialog/opener is ever involved** — **the "picker seam cancel/dismiss/empty ⇒ `null`" acceptance line is discharged HERE, at the value layer, and never by an OS call** | the charter's `U4` acceptance row (quoted in `§1` item 6), `§2.3` item 8, `§5.5.1 P-ML-TP-2` | `[T]` |
| **F-7** | **THE ID-DOMAIN CONTROL — `NaN`, an absent `id`, and a non-`null` answer naming no known `id`** | `selectCatalogItem` over a catalog whose entries carry `id: NaN` and no `id` at all, driven with answers `NaN`, `undefined`, a fresh `{ id: 'a' }` object (never `===` to the carried one), and `'a'` | **`NaN` NEVER matches** (strict identity); **a fresh equal-contents object NEVER matches**; **an entry with no `id` contributes no candidate**; **the string `'a'` matches the carried string `'a'`**; **NOTHING THROWS and NO coercion is attempted** | `§2.3` item 8, `§2.2` `P-ML-10`, `§5.5.1 P-ML-IM-7` | `[T]` |
| **F-8** | **THE MENU/PICKER COMPOSITION CONTROL — a positive control that MUST FAIL the row it is attached to** | a corpus (not the module) that constructs a `Menu`, that calls `setApplicationMenu`, that registers an accelerator, and a corpus that renders a picker element | **the ROWS FAIL**: the drive demonstrates that `§3.4 R-2`'s no-composition scan and `R-8`'s closed-set literal claim **catch all four shapes**; **a scan that passes for any of them is UNFALSIFIED and must not be filed** (`§4.4 S-ML-2`) | `§2.4` item 5, `§3.4 R-2`/`R-8`, `§4.4 S-ML-2` | static |
| **F-9** | **THE IMPORT-CLASS CONTROL — a positive control that MUST FAIL** | a corpus module carrying exactly one import statement of ANY path — including `import type { GestureHandle } from './gesture-session.js'` and `import { Menu } from 'electron'` | **the row FAILS**, and the two named forms are the SPECIFIC positive controls because they are the two imports a spec writer is most tempted to add (`§2.1` item 3, `§2.4` item 4) | `§2.1` item 3, `§3.4 R-4`, `§4.4 S-ML-9` | static |
| **F-10** | **A SECOND CALL'S INDEPENDENCE — no retention, no cache, no drift** | five repeated calls of each of the three exports with the SAME arguments, each call's return value compared against the first | **every repeated call returns an EQUAL value** (`===`/`toBe` for the caller's own answer identity and for the carried members), **the emitted template's `items` carries the same item VALUES with a FRESH template record each call**, and **no observable state differs between the first and the fifth call** | `§2.5` item 3, `§5.5.1 P-ML-SM-1`, `I-4` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **NO ENTRY POINT THROWS, FOR ANY ARGUMENT** — an unusable catalog, an unusable option bag, a hostile or throwing seam and a hostile entry each produce a DECLARED VALUE | `S-d8`'s `(C)` admission plus the family's totality discipline; **a throw would be a refusal domain this contract does not have** | `§2.1` item 2, `§2.3` items 1/3/4, `§5.5.1 P-ML-TP-3` |
| **I-2** | **THE PICKER IS INVOKED AT MOST ONCE PER INVOCATION, AND ITS ANSWER IS HANDED ON UNCHANGED** — never coerced, never normalized, never merged, never re-keyed, never defaulted, never retried | `A-d4`'s injection answer plus ruling 5: the seam is the fork's, and a second call or a transformed answer would be a different contract | `§2.3` item 6, `§2.4` item 1, `§5.5.1 P-ML-SM-2`/`P-ML-SM-3` |
| **I-3** | **THE EMITTED TEMPLATE'S MEMBER CENSUS IS EXACTLY THE DECLARED ONE** — two top-level members (`items`, `platform`), two platform members (`recognized`, `collapsing`), and **seven own keys on every item** | `G-2` and `Q1`'s pin: a caller (and a fork) reads the shape, and a phantom or a missing member is unreadable | `§0A` notes 2/5, `M-2`/`M-8`, `§3.4 R-12`, `§5.5.1 P-ML-IM-4`/`P-ML-IM-6` |
| **I-4** | **NO STORE, NO CACHE, NO MODULE-LEVEL MUTABLE STATE, AND NOTHING RETAINED ACROSS CALLS** — the module holds no value between invocations, writes no file, and returns declared values each call | Prohibition 4 / `S-d4`; the family's zero-module-state discipline | `§2.2` `P-ML-4`, `F-10`, `§3.4 R-3`, `§5.5.1 P-ML-SM-1` |
| **I-5** | **THE MODULE DECIDES NO POLICY** — it supplies **no default accelerator, no default role, no default label, no default `kind`, no default `enabled` and no default platform**, and it **carries** every caller value verbatim | The charter's acceptance line, quoted: *"no policy defaults (no default accelerators, no default roles)"* | `§2.2` `P-ML-3`, `§2.3` items 2/9, `§5.5.1 P-ML-IM-3`/`P-ML-IM-6` |
| **I-6** | **NO CONSUMER VOCABULARY, NO APP ITEM NAME, AND NO `kind`/`role` VOCABULARY OF ITS OWN** — the only two tokens the module interprets are `'darwin'` and `'picker'`, **each DECLARED** | Prohibition 1 and the `CONSUMER-VOCABULARY` reason code the `A-d4` reshape exists to answer | `§2.2` `P-ML-1`/`P-ML-9`, `§2.1` item 4, `§3.4 R-1`/`R-8` |
| **I-7** | **THE MECHANISM AUTHORS NO UI CONTENT AND WRITES NOTHING** — no element, no text, no class, no attribute, no style, no cursor, no node, no stylesheet and no rule; **`returned` is not `written`** | `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test; `UI-RENDERED-WITH-PROVIDENT` has **no element** here to apply to | `§2.2` `P-ML-2`/`P-ML-8`, `§2.4` item 5, `§3.4 R-2` |
| **I-8** | **NO SECOND AUTHORITY OVER THE CALLER'S ACTIVATION, ROUTING OR PICKER** — the module has **no `invoke`, no activation counter, no routing table and no picker implementation** | The family's one-authority rules; the `U4` row's activation criterion is **the caller's own bookkeeping** (`§1` item 6) | `§2.2` `P-ML-11`, `§4.4 S-ML-8`, `§3.4 R-11` |
| **I-9** | **NO IMPORT EDGE IN EITHER DIRECTION, AND NONE FABRICATED** — the module imports nothing, is imported by no `src/**` file, and **no sibling's surface is composed, re-expressed or asserted as an edge** **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed invariant above is KEPT VISIBLE and is NOT rewritten): THE POINTER — the "imported by no `src/**` file" half is the `F-11` VERIFICATION and holds TODAY (no consumer exists; the `H2b` register's no-consumer absence probe, `P-SMS-MT-IM-1`, drives it); WHEN a menu consumer lands, the `H2b` revisit condition re-drives this half (`store-modules-seams.md` `§2.4` item 3 — the first pass that lands a `src/**` import of the module flips the disposition and the caller half). THE MODULE'S OWN "imports nothing" half and the no-fabricated-edge half SURVIVE UNCHANGED — the module byte stays unread by any store.** | The `H-r6` dissolved-edge class; ruling 14's boundary | `§2.1` item 3, `§2.4` item 4, `§3.4 R-4`/`R-11` |
| **I-10** | **NO STORE, NO PERSISTENCE, NO MCP SURFACE, NO SHIM MEMBER, NO `electron`/`node:*` IMPORT, NO NEW DEPENDENCY, NO SCRIPT**: no tool, no resource, no group, no `RpcMethod`, no `MUTATING_METHODS` entry, no IPC method, and **`src/shared/dom-shim.ts` gains no member** **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed invariant above is KEPT VISIBLE and is NOT rewritten): THE POINTER — the no-store reading is the MODULE's own byte force and SURVIVES UNCHANGED: `menu-template.ts` still imports nothing and holds no store, and the DISPOSITION is RECORDED-NOT-LANDED (`store-modules-seams.md` `§2.4`) — the store read (`file.menu.catalog`, PROPOSED) is the CALLER's FUTURE resolution site, owed until a consumer exists, never a module byte. All other limbs (NO MCP SURFACE, NO SHIM MEMBER, NO `electron`/`node:*` IMPORT, NO NEW DEPENDENCY, NO SCRIPT) are UNCHANGED** | Prohibitions 4/5/6; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`; `SHIM-COMPLETION-CARVE-OUT`; `AGENTS.md` item 11(d) | `§2.2` `P-ML-5`/`P-ML-6`, `§3.4 R-3`/`R-4` |
| **I-11** | **NO OS CLAIM, EVER: no row of this unit may assert that a native menu exists, that an item appears in one, that an accelerator fires, that a picker opens, that a `role`/`kind` value is platform-valid, or that the native menu and any in-renderer picker are equivalent** — **every claim is data-in/data-out and falsifiable in the node suite** | `Q3`'s OS-boundary clause, which `§2.4` item 5 carries **verbatim in substance** | `§2.4` item 5 (all six halves), `§3.4 R-7`/`R-9`, `§5.2`, `§7` item 2 |
| **I-12** | **THE DECLARED EMPTY ANSWERS ARE `[]`, `null` AND `{recognized:false, collapsing:false}`, AND THEY ARE THE ONLY DEGENERATE VALUES IN THE CONTRACT** | Prohibition 3's absence discipline: each is the **absence of a value the module would otherwise have to fabricate**, names nothing, and cannot be mistaken for a caller value | `§2.3` items 1/4/8, `M-4`/`M-6`, `§5.5.1 P-ML-TP-1`/`P-ML-TP-2` |
| **I-13** | **`[U]` IS NOT OFFERED AND `[D]` IS NOT CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL** | `§5.2`; `docs/specs/zones.md` `§4.4 S-6` | `§5.2`, `§3.4 R-7`/`R-9`, `§7` item 4 |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its twelve
prohibitions**. **A prohibition citing *"a static source row"* with no id is not a row** (the sibling reviews'
recurring finding), so **every static claim in this file has an id here**, and **each scan is closed against the
evasion class (token assembly, comment-carrying, realm-rooted computed access) by `§4.4 S-ML-2`.** **Every row
here is `static`-layer: it reads this unit's own FILES or drives an injected argument, never a real DOM and never
a real OS.**

**THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY ROW BELOW INHERITS IT** (`S-ML-2`): every scan reads a
**NORMALIZED view** in which **string-literal concatenation is JOINED** (`'dar' + 'win'` reads as one literal)
**and COMMENTS ARE SCANNED AS CODE** — so a banned token in a comment, in a fragment-assembled literal, or in a
template hole **FAILS as if it were spelled plainly**. **THE ORDER IS NOT FREE: THE JOIN RUNS BEFORE QUOTES ARE
STRIPPED**, because a view that strips quotes first can no longer see the `'…' + '…'` boundary the joiner needs —
**so an assembly-evasion control run against a strip-then-join view is UNFALSIFIED WHILE LOOKING GREEN** (the
`docs/specs/container.md` `§3.4` dated method note, carried here as contract).

| id | Row (a TestWriter authors this) | Its DECLARED EXEMPTIONS, and both controls | Pinned by | Layer |
| --- | --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (`P-ML-1`, `P-ML-3`, `P-ML-9`).** *Over the MODULE's source (`src/shared/menu-template.ts`) INCLUDING its comments and in the normalized view, no occurrence, in any form, of: **(a)** an APP MENU ITEM NAME — any literal that names a file/edit/view/window/help-style menu entry, a `Cmd`/`Ctrl`/`Alt` key spelling, or a `role`-vocabulary literal (`'file'`, `'edit'`, `'view'`, `'window'`, `'help'`, `'quit'`, `'undo'`, `'copy'`); **(b)** a consumer-vocabulary token (`zone`, `pane`, `tab`, `region`, `dashboard`, `gutter`, `theme`, `is-empty`, `is-minimized`, `is-revealed`, `emptyToken`, `trackProp`, `census`); **(c)** a store token (`localStorage`, `sessionStorage`, `indexedDB`, `store`, `cache`, `memo`, `persist`); **(d)** a realm/ambient token (`document`, `window`, `navigator`, `globalThis`, `self`, `process.env`, `process.platform`, `os.platform`, `matchMedia`, `getComputedStyle`, `getBoundingClientRect`, `eval`, `new Function`, and the `globalThis[`-style computed realm access); **(e)** a selector or DOM-write token (`querySelector`, `querySelectorAll`, `closest`, `getElementById`, `createElement`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `textContent`, `innerText`, `classList`, `appendChild`, `removeChild`, `insertBefore`, `setAttribute`, `removeAttribute`, `setProperty`, `style`, `cursor`, `focus(`, `blur(`).* | **THE DECLARED EXEMPTIONS, NAMED — a scan row that does not name them is VACUOUS (`S-ML-2`):** **this unit's own contract vocabulary, as IDENTIFIERS AND KEY NAMES** — the three function names (`normalizeCatalog`, `buildMenuTemplate`, `selectCatalogItem`), the six type names (`PickerFn`, `CatalogEntry`, `PlatformProjection`, `ProjectedItem`, `MenuTemplate`, `TemplateOptions`), the seven carried key names (`id`, `label`, `accelerator`, `role`, `kind`, `submenu`, `enabled`), the two platform member names (`recognized`, `collapsing`), and the words `catalog` · `menu` · `template` · `picker` · `item` · `platform` · `role` · `kind` · `accelerator` · `dialog` **as identifiers and key names in prose-free code positions** — plus the two literal tokens. **BOTH CONTROLS: (i) a corpus spelling an app item name, a `role` literal, an accelerator literal or a store/ambient token — raw, joined, or in a comment — FAILS; (ii) the module itself, with every declared exemption present, PASSES.** **SCOPE, stated because this row's spellings collide by design:** the scan reads **the MODULE file (whole, comments included)**; **the TEST FILE must carry the banned spellings inside this row's own control data and its assertion messages, so a whole-file negative over the test file is DELIBERATELY DROPPED with that reason stated** (the `docs/specs/zones.md` `§3.4 R-1`/`docs/specs/gutter.md` `§3.4 R-1` form) | `P-ML-1`/`P-ML-3`/`P-ML-9`, `I-6`, `§4.4 S-ML-2` | static |
| **R-2** | **THE NO-COMPOSITION / NO-UI / NO-OS-CALL ROW (`P-ML-2`, `P-ML-8`; `§2.4` item 5 halves 1/2/4/5; `I-7`, `I-11`).** *Over the MODULE's source and over this unit's own `[T]` test file, the change set contains **no `Menu` / `MenuItem` / `setApplicationMenu` / menu-bar reference, no `dialog` / `showOpenDialog` / `showMessageBox` / alert / prompt reference, no accelerator-registration call, no picker rendering (element, node, text, style or cursor write), no `electron` reference, and no file, console, global or store write of any kind**.* **ITS FALSIFIABLE HALF: any of the above FAILS, and the `F-8` corpus is the positive control.** | **no exemptions** — the row bans the whole class; **both controls: (i) the `F-8` corpus (a `Menu` construction, a `setApplicationMenu` call, an accelerator registration, a rendered picker) FAILS; (ii) the module, which contains none of them, PASSES** | `P-ML-2`/`P-ML-8`, `§2.4` item 5, `F-8` | static + `[T]` |
| **R-3** | **The NO-SHIM / NO-NEW-SURFACE / NO-STORE ROW (`P-ML-4`, `P-ML-5`, `P-ML-6`; `I-10`).** *`src/shared/dom-shim.ts` is byte-identical before and after; no `scripts/**` file changes; no config file changes; no `package.json`/`package-lock.json` change; no new dependency or devDependency; no MCP registration site changes.* **A shim member addition, a new `scripts` key, a config edit or a `package.json` change FAILS.** **THE MCP NEGATIVES ARE ASSERTED AS SET EQUALITY AGAINST THE NAMES, never as a count quoted here** (`S-ML-6`) | **none** | `P-ML-4`/`P-ML-5`/`P-ML-6`, `I-10`, `§5.1`, `AGENTS.md` item 11(d) | static |
| **R-4** | **The IMPORT-BOUNDARY row (`P-ML-12`; `I-9`, `I-10`; `§2.1` item 3).** *`src/shared/menu-template.ts` contains ZERO import statements — no value import, no type-only import, no dynamic `import(`, no `require(`.* **ANY import statement of ANY path FAILS, and TWO forms are the NAMED positive controls: `import type { GestureHandle } from './gesture-session.js'` (the frozen-session type a spec writer is most tempted to borrow) and `import { Menu } from 'electron'` (the composition the OS-boundary clause refuses).** | **none** | `P-ML-12`, `§2.1` item 3, `F-9` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/menu-template.ts` exports EXACTLY the nine names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `normalizeCatalog`, `buildMenuTemplate` and `selectCatalogItem`** (read from the imported namespace's own keys **by name**, with a **positive control** that a namespace carrying a **fourth** value export FAILS, and with **`buildMenuFromCatalog` as the NAMED NEGATIVE CONTROL — a module that exports it, aliases it, re-exports it or keeps it as a deprecated name FAILS this row**); **(b) THE TYPE-ONLY NAMES — `PickerFn`, `CatalogEntry`, `PlatformProjection`, `ProjectedItem`, `MenuTemplate`, `TemplateOptions` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 5 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text** (`S-ML-6`) | **none** | `§2.1` items 1/2, `§5.2` leg 5, `F-9` | runtime + type-level |
| **R-6** | **THE SEMANTICS/REFERENT ROW (`§2.2`(D)).** *Every identifier this contract names has a semantics row, and NO identifier is `undefined-until-answered`; the module's own READ of caller data is limited to the two declared comparisons (`kind === 'picker'`, and `id === <answer>` inside `selectCatalogItem`) and to `typeof`/`Object.isArray`-class checks.* **ITS FALSIFIABLE HALF: a module that reads any OTHER member of an entry as a decision (an `enabled` filter, a `label` truthiness test, an `id` format test, a `submenu` presence test that changes the projection) FAILS.** **A row asserting *"members are `unknown`"* is NOT this row's claim and CANNOT be falsified at runtime** — **it is the type half, pinned by `§5.2` leg 5** (`R-5`(b)): **a member declared `string` instead of `unknown` fails to compile where the test file assigns a non-string to it** | **none** | `§2.2`(D), `§2.3` items 2/8, `§5.2` leg 5 | static + type-level |
| **R-7** | **THE NO-OS-READ ROW (`P-ML-7`; `I-11`; `§2.4` item 5 half 6).** *Over the MODULE's source, no `process.platform`, no `process.env`, no `navigator`/`userAgent`, no `require('os')`/`node:os`, no `electron` reference, no `matchMedia`, no UA sniffing, and no SECOND platform token besides the ONE declared literal — so exactly ONE string comparison against the caller's `platform` exists.* **ITS FALSIFIABLE HALF: any ambient platform read, any second platform token, and any case-insensitive or prefix comparison FAILS.** **BOTH CONTROLS: (i) a corpus reading `process.platform` FAILS; (ii) a corpus reading the caller's own `options.platform` and comparing it to the one literal PASSES** | **`'darwin'` (the ONE platform literal), DECLARED BY NAME** — **a second platform token is NOT exempt** | `P-ML-7`, `§0A` note 3, `§2.3` item 4, `§5.5.1 P-ML-IM-5` | static |
| **R-8** | **THE CLOSED-SET LITERAL ROW (`P-ML-1`, `P-ML-9`; `§2.1` item 4).** *The module's STRING LITERAL BODIES are the declared closed set: `'darwin'`, `'picker'`, and the `typeof`-tag bodies the carry rule needs (`'object'`, `'function'`, `'string'`) plus `''`.* **A THIRD platform token, a SECOND `kind` token, an app item name, a `role`/accelerator literal, or a spelling variant of a declared body FAILS.** **BOTH CONTROLS: (i) a corpus carrying `const p2 = 'darwin'` in a second constant **for a different comparison**, or any `role` literal, FAILS; (ii) the module carrying exactly the declared bodies PASSES.** **SCOPE, stated so it is not vacuous: this row reads the NORMALIZED view (`§3.4`'s normalization), so the assembly evasion lands here as well** | **the declared bodies, NAMED: `'darwin'` · `'picker'` · `''` · `'object'` · `'string'` · `'function'`** — **no other body is exempt, and a module needing a further body owes this contract an amendment** | `§2.1` item 4, `§2.2` `P-ML-1`, `I-6` | static |
| **R-9** | **The ABSENT-PAGE-DESIGN probe (the existence row that keeps `§1` item 7 falsifiable).** *`docs/skills/designing-pages.md` does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update.* **THE PROBE: a file-existence check whose FAIL is meaningful — if the file comes to exist, this unit OWES the coverage row and the demo-page entry** (with the honest note that a mechanism that renders nothing can only contribute an **absence** row) | **none** | `§1` item 7, `§7` item 6 | static |
| **R-10** | **THE NO-`id`-VALIDATION / NO-`id`-GENERATION ROW (`P-ML-10`; `§2.3` item 8).** *Over the MODULE's source, no `id`-shaped validation or generation: no `typeof id === 'string'`, no `id.length`, no `trim`/`toLowerCase`/`normalize` applied to an `id`, no `String(id)`/`JSON.stringify(id)`, no `Set`/`Map` keyed by an `id`, no `crypto`/`randomUUID`/counter, no uniqueness test, no dedupe, and no `Object.freeze`-style minted identity.* **ITS FALSIFIABLE HALF, and it is the row's whole content: a module that validates, coerces, hashes or mints an `id` FAILS; the ONE legal operation is the strict-identity comparison, and it is driven at `F-7`.** | **none** | `P-ML-10`, `§2.3` item 8, `§5.5.1 P-ML-IM-7`, `F-7` | static + `[T]` |
| **R-11** | **The NO-SIBLING-COMPOSITION / NO-FABRICATED-EDGE row (`P-ML-11`, `P-ML-12`; `I-9`).** *No reference to any sibling module or its surface: no `createGestureSession`, no `GestureHandle`, no `tokensFor`/`orientationFor`/`containerDeclarationFor`, no `computeTrackVars`/`isEmpty`/`trackFor`, no `createOwnedListHost`/`createSlotHost`/`createRelocateSession`/`createResizeController`/`createGutterAffordance`/`project`/`applyProjection`/`probeMountInvariant`, and no `POINTER_TYPES`.* **A reference to any of them FAILS**, because each would be a **composed sibling** this unit's charter does not admit and a **fabricated edge** in the family's `H-r6` class | **none** — **and the row is the reason `§2.4` item 4's non-edge is a CHECKABLE claim rather than a promise** | `P-ML-11`/`P-ML-12`, `§2.4` item 4, `I-8`/`I-9` | static |
| **R-12** | **THE KEY-CENSUS NEGATIVE ROW — the DROP rule's and the ABSENT-MEMBER rule's row (`G-2`'s discharge; `§2.3` items 2/9; `I-3`).** *(a) The SEVEN-key half: for every emitted item of every drive, `Object.keys(item)` deep-equals EXACTLY `['id','label','accelerator','role','kind','submenu','enabled']`, in that order.* **(b) The EIGHTH-key NEGATIVE DRIVE, which is the falsifiable half of `G-2`'s condition: a catalog element owning an EIGHTH and a NINTH own key (`extra`, `another`), a `Symbol` key and a non-enumerable member — and the assertion is that NONE of them appears on the emitted item, NAMED BY NAME.** **(c) The ABSENT-MEMBER half: an element owning only TWO of the seven produces an item whose `Object.keys` length is `2`, so a module that materializes `undefined` placeholders FAILS.** **(d) The MEMBER-TYPE half, on the `tsc` leg: every one of the seven is typed `unknown`, driven by a test-file assignment of a non-string value to each.** **BOTH CONTROLS: (i) the `F-2`/`M-8` corpora FAIL an implementation that copies extras or materializes placeholders; (ii) the module PASSES.** | **none** | `§2.3` items 2/9, `§0A` note 2, `G-2`, `§5.5.1 P-ML-IM-3`/`P-ML-IM-6`, `§5.2` leg 5 | static + `[T]` + type-level |
| **R-13** | **The DIFF-SCOPE row and the no-importer probe (`P-ML-5`, `P-ML-12`).** *Every changed path in this unit's commit range is inside `§5.1`'s allow-list; NO path in `§5.1`'s DENIED set appears; and at the time this unit's red set runs, `src/shared/menu-template.ts` is imported by NO `src/**` file* (an import-graph probe: a read of the tree for the module's specifier returns ZERO). **SCOPE RULE, so the row cannot mistake correct gate work for a boundary violation: a diff-scope row asserted over a COMMIT RANGE must scope its allow-list census to THIS UNIT'S OWN ARTIFACTS** — the module, this unit's test file, this spec, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits or a sibling's dirty file as this unit's diff. The DENIED set is the exception and binds the WHOLE committed set.** **IMPLEMENTATION FORM, pinned because `git` is not available at run time: a FILESYSTEM PROBE** — every DENIED path PRESENT on disk, every artifact path of this unit's allow-list EXISTING, and the IMPORTER GRAPH READ FROM THE TREE (a recursive `src/**` read matching the module's specifier, never a git command and never a comment) | **none** | `§5.1`, `I-9`/`I-10`, `F-9` | static |
**⟶ DATED EXEMPTION PINS (`2026-09-27`, the red run's defect report; annotate-never-rewrite — the as-filed `R-1`
and `R-2` cells of the table above stay VISIBLE, and `R-2`'s *"no exemptions"* clause is read ONLY through this
pin).** **This block sits AFTER the row table, not inside it, so the table's five columns stay intact and no row
was split.** **A PINNED EXEMPTION IS NOT A WEAKENING: it is the exemption that keeps a scan row NON-VACUOUS, in
the form `§4.4 S-ML-2` demands** (*"each must NAME its declared exemptions (`R-1`'s contract-vocabulary set,
`R-7`'s `'darwin'`, `R-8`'s six declared bodies) or it is vacuous"*) **and that `R-7`/`R-8` already use — a named
set with both controls.** **NO ROW ID, TERM, CAP OR `§3` CELL CLAIM MOVES WITH THIS BLOCK.**

- **`R-1`'s exemption, PINNED — and it is the half of `S-ML-2`'s condition that row's cell omits.** `R-1`'s cell
  names the **contract-vocabulary** exemption but not the one that lets this unit's own test file hold the banned
  spellings: **THE TWO CONTROL CORPORA OF `tests/menu-template.test.ts` ARE EXEMPT, BY NAME — (1) `R-1`'s own
  `controlCorpus` (a store token, a consumer token, a `role` literal and an accelerator literal) and (2) THE `F-8`
  CORPUS (a `Menu` construction, a `setApplicationMenu` call, an accelerator registration and a rendered picker
  element)** — **and NO OTHER SITE is exempt.** **BOTH CONTROLS, in `R-1`'s own form: (i)** each corpus **FAILS the
  row it is attached to** (`R-1`'s `controlHits`, all six true; `F-8`'s `caught`, four of four true), and **(ii)** a
  corpus carrying the declared exemptions **PASSES** (`R-1` CONTROL (ii)). **THE FORM, stated so the exemption is
  not read as a licence: the landed harness spells the corpora through the character-code assembler (`ccOf(...)`),
  so the FILE's bytes carry none of the banned spellings while the corpus VALUES do** — **the exemption is pinned
  for the CORPUS, never for the file's bytes.** **A TestWriter that spells a control token PLAINLY in either file
  owes this contract an amendment of this pin; it may not read the pin as permission to write a banned token
  freely.**
- **`R-2`'s SCOPE GAP, CLOSED — the unsatisfiable pair, NAMED.** `R-2` is filed **over "the MODULE's source AND
  this unit's own `[T]` test file"** with **"no exemptions"**, while **the SAME test file must carry the banned
  spellings as control data** — **`R-1`'s `controlCorpus` and the `F-8` corpus ARE that control data, so the pair
  as filed is UNSATISFIABLE and no row could hold.** **THIS AMENDMENT CLOSES IT BY PINNING THE EXEMPTION IN `R-1`'s
  FORM: the TWO control corpora above, BY NAME, and NO OTHER SITE.** **THE ROW STILL HOLDS, AND IT STILL FAILS FOR
  A GENUINE SPELLING:** the test file is scanned over its **BYTES**
  (`stripComments(readFileSync(TEST_PATH, 'utf8'))` — the `R-2` second-half scan the landed harness runs and prints
  as a measured reading), **the corpora are character-code assembled**, so **a plainly-spelled
  `Menu`/`setApplicationMenu`/menu-bar/`dialog`/alert/prompt reference, an accelerator registration, a picker render
  or an `electron` reference ANYWHERE in either file — including inside a corpus — FAILS**, and the **`F-8` positive
  control itself still has to fail four-of-four**. **The MODULE file keeps `no exemptions` exactly as filed**; the
  pin is scoped to the two corpora, and **no `§3` row, term, cap or id moves with it.**

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Claim | The probe (its FAIL is meaningful) |
| --- | --- | --- |
| **X-1** | **`src/shared/menu-template.ts` DOES NOT EXIST at filing, and `tests/menu-template.test.ts` DOES NOT EXIST at filing** — **the two absence facts the red set's own red form rests on** *(measured this pass: the glob `**/menu-template*` returned NO FILES)*. **THE ROW BRANCHES ON THE MODULE'S PRESENCE, because the red form FAILS once the work is done: THE RED BRANCH (module absent, governing AT RED TIME)** is the absence of both paths; **THE GREEN BRANCH (module present, governing AT GREEN TIME)** is the PAIR's presence **plus the EXPORT CENSUS BY NAME** (`§2.1` item 1's three value exports by name; the type half is `§5.2` leg 5's, because a type name is erased at run time) | a file-existence check for both paths; **its RED form is the module-resolution failure the red set reports**, and **its GREEN form is the pair's presence plus the export census BY NAME** (`§4.1`) |
| **X-2** | **`docs/specs/menulib.md` is THIS file — the unit's contract is FILED** | a file-existence check; **the tracked-path assertion is the supervisor's commit** (`RCA-8`) |
| **X-3** | **`docs/specs/menulib.md` is NOT the gate-1 record, and the gate-1 record is NOT edited by this unit** | the record (`docs/specs/menulib-review.md`) is a DENIED path in `§5.1` item 11; a diff-scope row (`R-13`) reads it |
| **X-4** | **`docs/skills/designing-pages.md` does not exist** (`§1` item 7; `R-9`) | the file-existence probe of `R-9`, whose FAIL means this unit owes the coverage row |
| **X-5** | **`src/**` contains NO menu, picker, dialog or accelerator surface** — the gate-1 record's own step-1 fact, **re-measured this pass: ZERO `menu`/`picker`/`dialog`/`accelerator`/`darwin` occurrences in `src/**`; `template` occurs in `5` `src/**` files as the PROVISION ENVELOPE's key (`§2.2`(C) row 3), and `platform`/`role` occur in `src/shared/dom-shim.ts` and `src/renderer/runtime.ts` in their OWN domains (`§2.2`(C) rows 4/9)** | a token census over `src/**` whose FAIL means a menu surface already exists and this unit's denial list must be re-derived |

**⟶ `X-5`'s DATED SCOPE PIN (`2026-09-27`, the Implementer's stop, defect `A`; annotate-never-rewrite — the row's
cell above stays VISIBLE and unedited).** **THE DEFECT, NAMED AS MEASURED: `X-5` as filed sweeps
`\bmenu\b`/`\bpicker\b`/`\bdialog\b`/`'darwin'` over ALL of `src/**`, while `§5.1`'s allow-list row 1 places THIS
UNIT'S MODULE at `src/shared/menu-template.ts` INSIDE that sweep and `§2.1` item 4 / `R-8` pin `'picker'` and
`'darwin'` as its CLOSED literal set — so the row PASSES today and FLIPS RED the moment the conformant module
lands. It is a LIVE TRAP, not a live failure.** **THE PIN, CHOSEN AS EXCLUSION RATHER THAN RELAXATION: `X-5`'s
sweep EXCLUDES EXACTLY ONE PATH — THIS UNIT'S OWN MODULE, `src/shared/menu-template.ts` (the artifact `§5.1` row 1
is allowed to create) — and NOTHING ELSE.** **THE MODULE'S TWO PINNED LITERALS `'picker'` and `'darwin'` ARE
DECLARED AS THE NAMED EXEMPTION, and the exemption is scoped to that one file: `R-8`'s closed-set row and `R-7`'s
one-platform-literal row are the rows that govern the module's own tokens, and they already carry both
controls.** **WHAT STILL FAILS, STATED SO THE ROW IS NOT VACUOUS — ALL SIX SPECS SURVIVE AND THE FOUR
CONTROLS BIND:** **(i)** any of the six banned spellings (**a `menu` word, a `MenuItem` word, a
`setApplicationMenu` word, a `picker` word, a `dialog` word, or a `'darwin'` literal**) in ANY OTHER `src/**`
file **FAILS** — the sibling/`src/**` population is swept IN FULL, and the exclusion is one path, not a
directory; **(ii)** a `Menu`/`MenuItem`/`setApplicationMenu` reference **anywhere in `src/**`** still **FAILS**
(the `menu-template`-derived identifiers of `§2.2`(C) row 2 remain the module's only licensed spelling, and the
scan's `wordRe` boundary means the module's own hyphenated path is reached by the exclusion rather than by a
regex patch); **(iii)** a SECOND platform token, a `process.platform` read, a case-insensitive or prefix
`'darwin'` comparison in the module still **FAILS** (`R-7`/`R-8`); and **(iv)** the exclusion is asserted
**positivity-checked** — a corpus placing a banned token in a DIFFERENT `src/**` path **must fail the row**, which
is the control that keeps the exclusion from becoming a blanket exemption. **A module OUTSIDE
`src/shared/menu-template.ts` — including a second file this unit may not create (`§5.1`'s allow-list holds one
production path) — RECEIVES NO EXEMPTION.** **NO ROW ID, TERM, CAP, SEED, `§5.5.1` CELL OR OTHER `§3` ROW's CLAIM
MOVES WITH THIS PIN; `X-5` is not renumbered and its green branch (`§4.1`) is unchanged.**

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/menu-template.test.ts`** (`§0A` note 1) — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/menu-template.js'` (or the repo's equivalent module-resolution failure) for
every row that imports the module, **plus the static/existence rows that can already be evaluated** — `§3.4`'s
`R-9` (the absent-page-design probe), `R-3`'s config/dependency half, `R-13`'s no-importer half and **`§3.5`'s
`X-1`/`X-2`/`X-4`/`X-5`** — **which need no module at all**; `R-4`/`R-5`/`R-6`/`R-12` become fully evaluable when
the module lands, **while `R-1`/`R-2`/`R-7`/`R-8`/`R-10`/`R-11` scan THIS module's bytes and become evaluable
exactly when it lands** (which is what `X-1`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely additive**, and
**the unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that three pure functions return
their declared values, that the ONE injected seam is invoked at most once with its answer handed on unchanged,
that the declared degradations hold for every unusable seam shape, that the emitted template's member census is
exactly the declared one, and that the collapse's ordering holds**. It is **NOT** evidence that a native menu
exists, that a menu item appears in one, that an accelerator fires, that a picker opens, that a `role`/`kind`
value is one a platform accepts, that the native menu and any in-renderer picker are equivalent, or that any of
this is reachable from the app — **in particular, at the end of this cycle the module is still imported by NO
`src/**` file** (`R-13`), **and the `'darwin'` arm is a claim about a VALUE, never about an operating system**
(`§2.4` item 5, `I-11`).

### 4.2 Red-set authoring order

1. **The `§3.5` existence rows `X-1`/`X-2`/`X-4`/`X-5` FIRST**, with **`§3.4`'s `R-3`'s config half,
   `R-9` and `R-13`'s no-importer half** — they are the red's own premise and are evaluable before this unit's
   module exists.
2. **Then the `§3.4` static rows** (`R-4`/`R-5`/`R-6`/`R-12` become complete once the module exists;
   `R-1`/`R-2`/`R-7`/`R-8`/`R-10`/`R-11` read the module file and are evaluable **once it exists**).
3. **Then the totality and degradation rows `F-1`..`F-10` and `I-1`..`I-13`** — this unit's failure surface
   comes **before** its happy paths, because **a totality claim is what the whole contract rests on** and a red
   on totality is diagnosis a green cannot give.
4. **Then `M-1`..`M-9`** — the happy states, **with `M-7` (the collapse's ordering) and `M-8` (the drop rule)
   sitting with the static rows they make falsifiable**, and **`M-9` (the one composition drive) last**.
5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**, after the
   `M-*` rows, **in register order** (`P-ML-IM-1` · `IM-2` · `IM-3` · `IM-4` · `IM-5` · `IM-6` · `IM-7` ·
   `P-ML-SM-1` · `SM-2` · `SM-3` · `P-ML-TP-1` · `TP-2` · `TP-3`). They ride **`npm test` (leg 1)** unchanged
   and **need no new file, no new script, no `package.json` change and no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and existence
   row that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are
   recorded. **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first, with
   the old text kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order** with
**STOP AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop early**, and
**the un-run rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run that reports all
`126` attempts as executed is the finding, not the expectation** *(this sentence read **`123`** as filed; the
declared total is now **`126`**, `§5.5.3`, and the as-filed `123` was the mis-sum of the register's own thirteen
terms — `CURRENT STATE` item 3's dated amendment)*. **The register's execution markings are
DESIGN, not results**: **a row that is marked executable in `§5.5.1` but broken when run is a SPEC FINDING,
reported rather than tuned to green.**

### 4.3 What the red is NOT

- **Not a DOM test, and not a test of a rendered picker.** **No real `Element`, no `document`, no shim member, no
  rendered menu and no rendered picker**: **there is no element parameter anywhere in this module's surface**
  (`§2.5` item 2). **No row may need an element at all.**
- **Not an OS test, and NOT A PLATFORM-DETECTION TEST.** The rows never read `process.platform`, never spawn a
  platform, never compare an OS string except the caller's own `platform` value against the one declared literal.
  **`R-7` is the row that forbids an ambient read and `I-11` is the invariant.**
- **Not an activation, routing or `invoke` test.** **This unit owns no `invoke` surface and no activation
  counter**; a row asserting *"exactly one activation per `invoke(id, …)`"* belongs to **the caller's own
  bookkeeping** and **must not be filed here** (`§1` item 6, `§4.4 S-ML-8`).
- **Not a menu-composition test and not a native-menu test.** No row may construct a `Menu`, call
  `setApplicationMenu`, register an accelerator or open a dialog — **each FAILS `R-2`**.
- **Not a sibling test, and not a composition test.** **No row may assert a `U-GSESSION`/`U-CONTAINER`/`U-GUTTER`/
  `U-RELOCATE`/`U-ZONES`/`U-CENSUS`/`U-PROJ`/`U-LISTHOST`/`U-SLOTHOST` behaviour, import a sibling's module, or
  require `src/shared/menu-template.ts` to be wired into anything** (`R-11`).
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a consumer-vocabulary test, and not a UI test.** A row naming a real app menu entry, a `role` literal or a
  consumer token is a `P-ML-1` violation — such spellings may appear **only** inside `R-1`'s/`R-8`'s own control
  corpora.

### 4.4 The stop conditions (binding)

**`S-ML-*` are this unit's own classes, derived in substance from the gate-1 record's conditions `G-1`…`G-10`,
from `Q1`/`Q2`'s recorded defaults and from this filing's own surface. All eleven bind the red set, the
implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-ML-1** | A row is only satisfiable if the module **READS AN OS, AN AMBIENT GLOBAL, A DOM OR AN ELEMENT** | **Violates `P-ML-7` and `I-11`.** The claim is DELETED; **the obligation is routed to the caller**, which is where platform knowledge legitimately lives. |
| **S-ML-2** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed.** The row forms are `R-1`/`R-2`/`R-7`/`R-8`/`R-11`, **and each must NAME its declared exemptions (`R-1`'s contract-vocabulary set, `R-7`'s `'darwin'`, `R-8`'s six declared bodies) or it is vacuous** (`§2.2`(E)). |
| **S-ML-3** | A row asserts a **`code`/`reason`/`ok`/`thrown`/result-record** shape from any of the three exports, or expects a **throw** from one | **Violates `§2.1` item 2** — **this unit has NO REFUSAL DOMAIN** and every outcome is a VALUE. **Re-write as a value assertion; adding a union is a NEW CONTRACT and needs its own gate.** |
| **S-ML-4** | A row is only satisfiable if the module **supplies a built-in default** — a default accelerator, a default role, a default label, a default `kind`, a default `enabled`, a fallback platform or a sentinel | **Violates `P-ML-3`.** Every value is caller-supplied; **the declared empty answers (`[]`, `null`, `{recognized:false, collapsing:false}`) are ABSENCES and are the only degenerate values in the contract** (`I-12`). |
| **S-ML-5** | A row asserts that the emitted template **IS a menu**, that a native menu **was composed**, that an accelerator **was registered**, that a picker **was rendered**, or that a native menu and an in-renderer picker **are equivalent** | **Violates `§2.4` item 5 and `I-11`.** The claim is **DELETED**; **the equivalence is the fork's app concern and no row of this unit may carry it.** |
| **S-ML-6** | A row asserts a prohibition by a **bare COUNT** (*"nine exports"*, *"seven keys"*, *"`ALL_TOOLS` is 21"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a surface.** The row must assert **SET EQUALITY AGAINST THE NAMES**, or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-5`/`R-12`/`R-13`), and **an existence claim must be a probe whose FAIL is meaningful** (`R-9`, `X-1`…`X-5`). |
| **S-ML-7** | A row requires the module to read **a source element's member as a DECISION** other than the two declared comparisons (`kind === 'picker'`; `id === <answer>`) — an `enabled` filter, a `label` truthiness test, a `submenu` presence test that changes the projection, an `id` format test | **Violates `P-ML-9`/`P-ML-10` and `§2.3` item 8.** The row is DELETED; **a caller wanting that filter keeps it on its own side of the boundary.** |
| **S-ML-8** | A row requires the module to **count activations, route by `id`, retry a seam, or hold a picker session** | **Violates `P-ML-11` and `§1` item 6.** **The `invoke`/activation discipline is the CALLER's bookkeeping** and this unit asserts nothing about it; **the module's only seam obligation is the at-most-once call and the unchanged answer** (`§2.3` item 6). |
| **S-ML-9** | A row needs a **sibling import** (value or type-only), a **session**, a **census read**, a **store**, a **persistence channel**, a **shim change**, a **new dependency** or a **fourth value export** | **Violates `§2.1` item 3, `P-ML-12` and `I-9`/`I-10`** — **a dependency edge asserted toward any sibling would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class), **and the two named positive controls are `import type { GestureHandle }` and `import { Menu } from 'electron'`** (`F-9`). **Stop and route the row to its owner.** |
| **S-ML-10** | A row requires the module to **detect that two different closures were wired into `picker`**, or asserts that `CatalogEntry` and `ProjectedItem` are **the same declaration** rather than structurally identical names | **Violates `§2.5` item 3's stated LIMIT and `§2.3` item 7's nominal distinction.** **A `tsc` probe may assert structural identity; it may NOT assert a shared declaration.** |
| **S-ML-11** | A row asserts a **rendered**, an **OS**, an **applied**, a **native-menu** or an **activated** fact — or a `[T]` green is to be reported as one — or offers a **`[U]` row** for the picker or the native menu | **Violates `§2.4` item 5, `I-11` and `§5.2`'s three-part refusal.** The claim is **DELETED**; **the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words, carried at `§4.4 S-ML-11` and `§5.2`). **Any pass wanting a rendered row must get it from the unit that OWNS the rendered surface.** |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken a row
to reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist** (*done: this filing*), **(b) a
TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), **(c) its typed register to exist**
(*done: `§5.5.1`* — item 11's precondition is satisfied **before** any red set), and **(d) the supervisor's
ordering** — and `E7`'s ledger row stays an open `## OPEN` row whose status is the supervisor's. **No status is
advanced by this filing.** **`E7`'s `Blocked on` cell is ABSENT and its chain stale** (`§`CURRENT STATE item 7;
the gate-1 record's `P-2`/`P-3`): **its own named dependency `U-GSESSION` (`E6`) is `DONE`** and the tracker's own
queue block says **`E7` is free**, so **this unit's only live precondition is its own red set**.
**`U-GSESSION` (`E6`), `U-CONTAINER` (`E5`), `U-ZONES` (`E1`), `U-CENSUS` (`E2`), `U-GUTTER` (`E3`),
`U-RELOCATE` (`E4`), `U-PROJ` (`D4`), `U-LISTHOST` (`D2`) and `U-SLOTHOST` (`D3`) are SIBLINGS and NOT
dependencies in either direction** — a later pass asserting an edge would be a FABRICATED EDGE (`I-9`).
**`U-THEME` (`E8`) is blocked ON this unit** and is not this unit's subject.

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST, DERIVED FROM THIS UNIT'S OWN CHARTER

**THE DENIED SET, NAMED FIRST, because it binds absolutely and outranks the allow-list** (ruling 6: *"each
unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*). **THE DERIVATION IS
STATED BEFORE THE LIST, because the derivation is the thing that can be wrong:** this unit's charter is **three
pure functions over caller arguments — a catalog value, a platform value and a picker closure — with an EMPTY
import census and a value RETURNED rather than composed** (`§2.1`, `§2.5`) — so **every path whose only role
would be to COMPOSE a menu, RENDER a picker, LOAD a platform fact, OBSERVE the artifact or register a surface is
denied, because nothing in this unit's contract needs it.** **The `E10` lesson is carried but its ANSWER is
derived rather than inherited: this unit has NO instantiation site to protect, because its artifact is a VALUE**
(the `docs/decisions.md` `UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` precedent — *a copy-forward DENIED set deleted
the only site at which an affordance could be instantiated* — applies to a unit that **instantiates** something;
**this one instantiates nothing and renders nothing, so the honest derivation is that no renderer path has a
role**).

1. **`src/main/**`** — **the app's process boundary and the ONLY place an Electron menu surface could be built**
   (`Menu`, `setApplicationMenu`, `dialog`). **Two independent grounds deny it:** **(i)** the charter's own
   acceptance pins that **the builder imports neither `electron` nor `fs`** — and shipping a menu surface under
   `src/main/**` would need one of them; **(ii)** admission clause **(C)** admits a **reusable shell-chrome
   MECHANISM**, and the handoff's per-unit equivalence limits state that **the native menu and the in-renderer
   picker are NOT equivalent** — so an Electron-shell menu **INTEGRATION** is the shell's chrome work and **the
   fork's**. ***THIS IS THE CLAUSE THAT BINDS***: the handoff's `U4` row names `src/main/` as the *"catalog
   builder"*'s home, and **that reading is SUPERSEDED here by derivation** — the module lands under
   `src/shared/` (the gate-1 record's `§5`), and **a later pass asserting an edit under `src/main/**` is a
   FINDING.**
2. **`src/renderer/**`** and **`src/shared/demo-envelope.ts`** — **no renderer wiring, no demo surface**: this
   unit renders nothing, and **a demo-side implementation of the picker would be an IMPLEMENTATION, never the
   contract** (`§4.3`; ruling 5).
3. **`src/shared/dom-shim.ts`** — **FROZEN** (`SHIM-COMPLETION-CARVE-OUT` admits exactly one member, and this
   unit adds none).
4. **Every sibling `src/shared/*` module and its test file** — `zones.ts` · `census.ts` · `gesture-session.ts` ·
   `gutter.ts` · `gutter-affordance.ts` · `layout-projection.ts` · `owned-list-host.ts` · `slot-host.ts` ·
   `mount-invariant-guard.ts` · `demo-envelope.ts` · `types.ts` · `path-fork-cycle.ts` · `relocate.ts` ·
   `container.ts` — **and every existing test file of another unit**.
5. **`src/preload/**` and the app graph** — no node, no envelope, no handler body, no component binding, no mount
   change, no IPC method.
6. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no registration site.
7. **`package.json`** and **`package-lock.json`** — **no script, no dependency, no devDependency.** *(This denial
   is LOAD-BOUNDED: `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET, so **any further script
   key reddens that row until a TestWriter extends the landed set; a config change cannot satisfy it** —
   `AGENTS.md` item 4's recorded process hazard. **Leg 5 of `§5.2` therefore adds NO SCRIPT.**)*
8. **`scripts/**`** — no helper, no leg driver.
9. **`tsconfig.json`**, **`tsconfig.tests.json`** and **`vitest.config.ts`** — no include/exclude/compiler-option
   change.
10. **Any store, any CSS artifact, any `.css` file, any new JSON data file** — this unit ships no artifact of any
    kind besides its module.
11. **Every sibling artifact** — a sibling unit's `*-greens.md`, its review record, its tracker-only rows, **and
    `docs/specs/menulib-review.md` (the CLOSED gate-1 record, whose conditions, derivation and verdict this spec
    derives and may not re-litigate)**, plus **`docs/decisions.md`'s ACTIVE rows** (a spec may not edit a ruling)
    and **`docs/pending.md`'s `§K` REQUEST list, whose vocabulary is NOT used anywhere in this file as though it
    were in force.**
12. **`docs/skills/designing-pages.md`** — it **does not exist**, and this unit does not create it (`R-9`'s
    probe; `§7` item 6).

**THE ALLOW-LIST:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/menu-template.ts` | **NEW** — the **three value exports + six type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/menu-template.test.ts` | **NEW** — the red set (`§4.2`), the register rows and the static/existence rows | always |
| 3 | `docs/specs/menulib.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/menulib-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/menulib-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and **a sibling spec only for a dated status/annotation correction that changes NO normative clause** | the pass that produces them |

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule, stated so
a scope row cannot mistake correct gate work for a boundary violation**: a diff-scope row asserted over a **commit
range** must scope its **allow-list census to THIS UNIT'S OWN ARTIFACTS** — *the module, this unit's test file,
this spec, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows* — and
**must NOT read a later unit's commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this
unit's diff.** **The DENIED set is the exception and is the half that binds the WHOLE committed set**: a denied
path anywhere in the range **FAILS** the row regardless of which pass committed it. **A non-denied path outside
the allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate
boundary to leave a commit). **The canonical artifacts must be non-vacuously present in the range**, and
**`§3.4 R-13` is the row that carries this rule.**

**THE FALSIFIER THIS SCOPE CAN FAIL, stated so the layer decision is falsifiable rather than asserted** (`G-6`'s
discharge — the gate-1 record's own words, verbatim in substance): ***if this spec's diff scope contains
`src/renderer/**`, `src/main/**`, the demo-envelope path, an authored element/class write, or a probe composing a
real `Menu`, then the `§7.1` predicate TRIGGERS, the three-part `[U]` refusal is UNAVAILABLE, the live/UI battery
is OWED, and the ledger's leg cell becomes a finding.***

### 5.2 The legs this unit MUST run — THE FIVE, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app or OS evidence** — for this unit it proves **three pure functions' return values, one seam's invocation count, the emitted member census and one collapse's ordering**, and **nothing** about a native menu, an accelerator, a rendered picker, a dialog, an OS or the app (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the six type declarations, the three value signatures and the returned members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild: **the built output set is `SIX` files — the FIVE `esbuild` outputs (four `src/main/**` bundles + the renderer bundle) plus the copied `dist/renderer/index.html`.** **This unit adds a module imported by nobody, so the output set must be UNCHANGED** — **a bundle census that changed is a FINDING, and a census that did NOT change is not evidence the module works.** |
| **4** | **test-layer typecheck** | `npm run typecheck:tests` | **[H]** (the additive fourth leg, `AGENTS.md` item 4) | compiles the whole `tests/**` tree under the same strictness a unit's own leg 5 uses. **`tsconfig.json` excludes `tests`, so a unit that cites typecheck as evidence about its OWN test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/menu-template.test.ts`** — the named leg for `§3.4 R-5`(b) and `R-6`/`R-12`(d)'s type halves | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts six **TYPE-ONLY** names, **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — and **the `unknown`-typed-member claim (`R-6`'s type half, `R-12`(d)) is a type-level claim that has NO runtime falsifier**: it fails exactly here. **Leg 2 does not compile `tests/**` at all.** **A DONE row that reports either type half as green must cite THIS leg or leg 4, not a runtime assertion.** **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script to `package.json`, no dependency and no diff-scope row**, and **no register row depends on it.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as the family requires. A
one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — **and in particular NOT for the
   native menu, NOT for the picker's rendering, NOT for the `'darwin'` shape being what a platform's menu API
   accepts, and NOT for a dialog being opened.** **`[U]` is the real-Electron observation leg (`npm run ui`,
   landed by `U-REALDOM-BOOT`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, in two parts, and this is why it is STRUCTURAL rather than a leg-availability
   excuse: (a) the module is imported by NO `src/**` file** (`R-13`, `X-1`) — **so there is NO RENDERED SURFACE
   TO OBSERVE and NO MENU TO COMPOSE**; **and (b) the module READS NO OS, NO DOM AND NO ELEMENT** (`P-ML-7`;
   `R-7`) — **so there is NOTHING FOR A MEASURING LEG TO MEASURE.** **The `ui` leg exists and is green, and the
   divergence leg is green — the refusal is not an excuse about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row may not be moved to the `ui` leg
   silently."*** **Any later pass that wants a native-menu, picker-rendered or OS-acceptance row must get it from
   the unit that OWNS that surface — which, for the native menu, is THE FORK and not this repo.** **A `[U]` row
   moved here silently is `§4.4 S-ML-11`, and it does not land.**

**THE READER QUESTION, ANSWERED: `NONE`.** **No instrument on any layer this repo owns can read a platform's
acceptance of a template value**: the `ui` leg observes **a rendered document in a real Electron realm**, the
divergence leg compares **a shim's rendering against a real host's**, and **neither constructs an OS menu bar**.
**So the OS-facing half is REFUSED rather than promised, and the returned-value reading is the only one under
which this unit's artifact is `[T]`-provable** (`§2.4` item 5; `I-11`).

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED, AND THE NON-CLAIM IS RECORDED IN THESE
WORDS.** The divergence leg (`npm run divergence`, `N = 9` pinned) and its landed extension channel exist and are
green (`U-DIVERGENCE-EXT`, `C2`, `DONE`) — **but this unit's contract needs nothing from them**: its rows assert
**return values, one invocation count and one member census**, and a divergence harness can only compare **a
shim's rendering against a real host's** — which is a claim about a **RENDERED SURFACE**, and **this unit authors
none.** **`R-7`/`R-9` are the probes that keep the non-claim falsifiable**, and **no pass may claim `[D]`
evidence from the existing pinned leg or from this unit's node green.**

**GATE 6 IS `STRUCTURAL`, NOT WAIVED.** **The word is `STRUCTURAL` and the word `waived` is FORBIDDEN here.** The
live-app verification gate is **not waived by this filing and not satisfied by it either**: **gate 6's honest
status is that the live app CANNOT REACH this module** — it is imported by no `src/**` file and appears in none
of the built outputs — **so gate 6 is closed by the same structural reason `[U]` is refused** (the shape
`docs/specs/gsession.md`'s `CURRENT STATE`, `docs/specs/container.md` `§5.2` and `docs/specs/relocate.md` `§5.2`
already use), **and the DONE row must STATE the structural reason rather than omit the gate.** **A DONE row that
reports gate 6 as *"waived"* is a review finding; the correct form is *"structural — no importer, no rendered
surface, and the reason stated"*.**

**THE `§7.1` PREDICATE DECISION, RECORDED — `DOES NOT TRIGGER`.** *(`docs/specs/user-flow-audit.md` `§2`/its
`§7.1` predicate require the decision to be RECORDED either way — *"the decision is RECORDED either way
(`TRIGGERS` or `DOES NOT TRIGGER`, with the evidence that decided it)"* — never from preference.)*
**DECISION — `DOES NOT TRIGGER`, on both limbs, from this unit's own recorded change set and not from
preference:** **Limb A (`DOM-SHIM-BLINDNESS`) does not hold** — **the change authors NO rendered surface**: no
element, no node, no class, no text, no style, no attribute, no cursor and no geometry (`I-7`); **Limb B
(`UI-OVERHAUL`) does not hold** — **the module is imported by no `src/**` file, composes no menu and changes no
user-visible flow** (`§2.5` item 5). **THE EVIDENCE THAT DECIDED IT:** `§5.1`'s allow-list contains **no
`src/renderer/**`, no `src/main/**`, no `src/shared/demo-envelope.ts` and no menu-composing probe**, and `§1`
item 7 records that `docs/skills/designing-pages.md` does not exist, so there is no live surface for the audit to
reach. **ITS FALSIFIER** (`G-6`'s own words, carried at `§5.1`): **a diff scope admitting a renderer path, a
`src/main/**` path, the demo envelope, an authored element/class write or a probe composing a real `Menu` FIRES
the predicate, makes the three-part refusal unavailable, and converts the ledger's leg cell into a finding.**
**CONSEQUENCE, stated so the exemption is not confused with an empty report: NO `§5.U` matrix and NO `§6.1`
report are emitted, and the exemption is RECORDED with its reason** — *"'no report' and 'an empty report' are
different artefacts and the first is the only admissible form of the exemption."* **AND THE COST OF THE
INVERSION IS ALREADY MEASURED IN THIS REPO, so the decision is not free:** `docs/specs/gutter-ui-live-battery.md`'s
`ADV-GU-1` is the measured cost of wiring a mechanism live — the authored status node read `100` BEFORE → `110`
AFTER — **i.e. a live battery is what makes a rendered claim provable, and it is exactly what a `[T]`-only
mechanism does not owe.**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE items**:

1. **Unit + wave + status**: `U-MENULIB` · wave **E** (ledger row `E7`) · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"a pure, total, stateless `src/shared/` mechanism of three
   functions and nothing else: an untrusted catalog NORMALIZED into carried entries, a caller-shaped TEMPLATE
   VALUE projected with the caller's own `platform`, and the injected picker's answer SELECTED; every member
   typed `unknown`; exactly the seven declared own keys per item with every other own key DROPPED, never copied;
   **the module COMPOSES NOTHING** — no `Menu`, no accelerator registration, no picker rendering, no dialog; **no
   OS read, no DOM read, no element and no coordinate**; **no import statement of any kind**; **no store, no
   cache, no module-level state, no session, no shim member, no MCP surface, no new dependency and no UI**."* **A
   DONE row that does not state this is a review finding** — it is the unit's defining constraint (`§1` items
   2/3/4/5; `§2.4` item 5; `§2.5`).
3. **The surface confirmation, explicitly**: *"`src/shared/menu-template.ts` exports exactly **THREE value
   exports** (`normalizeCatalog`, `buildMenuTemplate`, `selectCatalogItem`) and **SIX type declarations**
   (`PickerFn`, `CatalogEntry`, `PlatformProjection`, `ProjectedItem`, `MenuTemplate`, `TemplateOptions`) —
   **`3 + 6 = 9` names** — its **own-seam set is exactly ONE OPTIONAL member** (the injected `picker`), its
   **emitted template is the five-member shape** (`items` · `platform` · `recognized` · `collapsing`), its items
   carry **exactly the seven declared keys**, **`buildMenuFromCatalog` is NOT exported, NOT aliased and NOT
   re-exported** (it is the RENAMED provenance only); it imports **NOTHING — not even type-only**; and it is
   **imported by NO `src/**` file**."* **The census is `§2.1`'s and `R-5` is its row.** **A DONE row that prints
   a tenth exported name, that prints `buildMenuFromCatalog` as an export, or that omits this census, is a review
   finding.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows
   ran and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**` ONLY*** ·
   `npm run build` `[H]` (**the `SIX`-file output set**, and whether it was byte-identical) ·
   `npm run typecheck:tests` `[H]` · **leg 5** (the standalone strict `tsc` over `tests/menu-template.test.ts`,
   **the leg that pins the `unknown`-members claim and the six type names**) — **and the explicit sentence that
   the node-suite green is envelope/pure-layer evidence and NOT assembled-app or OS evidence**, and for this unit
   **that it proves nothing about a native menu, an accelerator, a rendered picker, a dialog, a platform's
   acceptance of the emitted shape, or the equivalence of the native menu and any in-renderer picker**
   (`RCA-12`; `§2.4` item 5; `I-11`).
7. **The `[U]`/`[D]` status, the recorded `§7.1` decision, and gate 6's structural status**: **`[U]` not
   offered**, with `§5.2`'s **THREE-PART** clause (the refusal · the structural reason — no importer; no OS/DOM/
   element read · the `zones.md` `§4.4 S-6` sentence); **the reader question answered `NONE`**; **`[D]` not
   claimed**, with its `PRECONDITION-GATED` status; **the `§7.1` predicate decision re-stated as `DOES NOT
   TRIGGER` with its evidence and its falsifier**; **gate 6 stated as `STRUCTURAL`, never `waived`**, with its
   reason. **A DONE row that claims a native-menu, rendered-picker or OS-acceptance proof, a `[D]` row, or a
   waived gate 6 is a review finding.**
8. **The adversarial pass's findings** (`AGENTS.md` RCA-3, **MANDATORY per completed unit**, **including the
   gate-11 read-only PBT audit of `§5.5.1`'s executed tables and the pool-versus-boundary check re-run against
   the landed tables**) and the **blind-greens + per-unit documentation-review records** (`AGENTS.md` items
   10a/10d, RCA-4/RCA-6 — the blind set is **`docs/specs/menulib-greens.md`**). **A DONE row that cites no
   adversarial pass is a review finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this unit has
   NO live dependency (`SCH-5` is a source, not a unit; `U-GSESSION` is `DONE`; and every sibling is a SIBLING
   and NOT a dependency in either direction)** and that **the owed tracker items of `§7` item 11 are discharged
   or re-parked with owners**.
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type · attempts-run ·
    held · broken · controls** counts, **each row's strategy id (`S-ML-*`)**, the **pinned seed `20260927`** and
    its **step form** for `P-ML-TP-1`, the **stop-after-5-consecutive-failures status** (`not triggered`, or
    `triggered at row …`), the **total attempts reported against the `≤400` cap** with **every row's count against
    the `≤100` per-row cap**, and **the explicit sentence that every row whose property text quantifies over a
    domain larger than its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it
    states.** **A DONE row that reports the register as "executed" without these per-row counts and strategy ids
    is a review finding** — the markings are **execution DESIGN**, and **a read-only PBT audit may not accept
    this spec's table alone**: it reads the counts here **and** the TestWriter's tables in
    `tests/menu-template.test.ts`.
11. **The register's ARITHMETIC.** The DONE row must print the **total WITH its per-row terms** —
    **`126` = `12` (`P-ML-IM-1`) + `12` (`P-ML-IM-2`) + `12` (`P-ML-IM-3`) + `12` (`P-ML-IM-4`) +
    `12` (`P-ML-IM-5`) + `12` (`P-ML-IM-6`) + `12` (`P-ML-IM-7`) + `3` (`P-ML-SM-1`) + `3` (`P-ML-SM-2`) +
    `3` (`P-ML-SM-3`) + `12` (`P-ML-TP-1`) + `9` (`P-ML-TP-2`) + `12` (`P-ML-TP-3`)** ***(this item as filed read
    `123` against this same thirteen-term list — a figure that is NOT the sum of those terms; the declared total was
    corrected `123 → 126` by the dated amendment of `CURRENT STATE` item 3 / `§5.5.3`, and the as-filed `123` stays
    visible there. THIS ITEM'S SUBJECT IS THE CHECK, and the check is what caught the defect: a DONE row that prints
    `123` against these thirteen terms VIOLATES this item's own last sentence.)*** — **and must reconcile that
    figure against the tables the test file actually produces**: **a total that is not the sum of its own terms
    is a review finding** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **Where a row's attempts are several
    assertions over ONE execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row must report
    BOTH the declared attempts and the honest DISTINCT-DRIVE figure** (`§5.5.2` item 3's ledger is the
    authority). **The DECLARED figures are what the caps are compared against; the distinct figures are reported
    BESIDE them and never substituted** — **a DONE row that quotes the total alone, or that substitutes a
    distinct-drive figure in the cap comparison, is a review finding.**
12. **The `§5.3` → `§5.5` numbering note, cited**: **there is NO `§5.4`** — the gap is DELIBERATE and is the
    family's (`docs/specs/gutter.md` `§5.3`'s own note). **This file also has NO `§5.5.0`**: it was filed
    **after** the gate-11 ruling and carries its register **from the start**, so there is no superseded zero-row
    exemption to keep visible. **A DONE row that reports a `§5.5.0` exemption for this unit is citing a clause
    this file does not contain.**

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`AGENTS.md` item 11 makes the register MANDATORY BEFORE the red set for a code-bearing unit.** **This repo HAS
NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the **five keys** `@types/node`, `electron`,
`esbuild`, `typescript`, `vitest` — **no `fast-check`, no `hypothesis`, no property runner**. **This unit is
CODE-BEARING** (three exported functions, one injected seam, a totality surface over untrusted data and a
structural claim over the emitted value), so the **recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it**
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`). **There is NO `§5.5.0` in this file** — no superseded exemption exists
to keep visible. **`§5.5.1` below is therefore a real typed register**, executed by **plain deterministic vitest
tables**, **with NO new dependency, no sixth leg and no `package.json` change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).** **A register ENUMERATES every
discernible testable property of its unit; the per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A
CEILING.** **THEREFORE this filing enumerates `13` rows carrying `13` TERMS and reports the count as its
EXTENT — no property was dropped, merged or left unenumerated to fit a threshold — and `13` ROWS / `13` TERMS IS
AN OUTCOME.** **THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S OWN FORM: the `13` rows are ABOVE the `≤8`
signal for exactly the reasons the gate-1 record's own gate-11 assessment names, and each is a GENUINELY
SEPARABLE observation rather than a split for its own sake:** **(a)** the step-3 sketch's **11 rows are the
SPINE** (`P-ML-IM-1`…`IM-7`, `P-ML-SM-1`/`SM-2`, `P-ML-TP-1`/`TP-2`) and **every one of them is carried by
identity**; **(b)** the gate-1 record's step-4 **correction (d) names FOUR MISSING properties**, and **three of
them land here as their own rows** — **the collapse's ordering** (`P-ML-IM-5`), **the identity projection of a
recognized non-`darwin` platform** (`P-ML-SM-2`), and **the `§5.5.2`-style honesty block itself, which is a
BLOCK and not a row** — while the fourth (the **"counted once"** clause) lands **inside `P-ML-IM-7`'s own
declared term**, because it is a count on the SAME seam the row already drives; **(c)** the `SM` family is
**re-derived as STATE CLASSES OF THE EMITTED VALUE** (`recognized` × `collapsing`, the identity projection, and
the carried-census state) **rather than as a state machine the model does not have** — which is correction (a)
discharged without deleting the class; and **(d)** the `TP` family is **widened from two rows to three** because
**correction (b) requires the seam's four degradations and the three-outcome platform pool each to have their own
declared term**, and because **the module-wide totality universal is separable from both** (a row asserting *"no
entry point throws"* fails for different reasons than a row asserting *"the picker's answer lands in a declared
member"*). **NO PROPERTY WAS DROPPED, MERGED OR LEFT UNENUMERATED TO FIT A THRESHOLD.** **THE BREAKDOWN
RECOMMENDATION, named once (`§5.5.2` item 1): `P-ML-IM-1`'s normalizer half and its projector half are separable
in principle, and `P-ML-TP-3`'s module-wide universal could be split per entry point; splitting them is NOT owed,
NOT done, and changes no term.**

**THE REGISTER'S OWN STRUCTURE, stated once so the numbering is not read as an error: the `§5.3 → §5.5` gap
(there is NO `§5.4`) is DELIBERATE and is the family's** — the same gap in `docs/specs/gutter.md`, `gsession.md`,
`zones.md`, `census.md`, `projection.md`, `listhost.md`, `container.md` and `relocate.md`, **recorded by their
documentation reviews** (`AGENTS.md` item 10d / RCA-6). **`§5.3` is the DONE row's shape and `§5.5` is the
property register; NO clause is missing — the section simply does not exist, and renaming or renumbering is
FORBIDDEN for citation stability.** **This file has NO `§5.5.0`.** **`§5.5` is followed by `§5.5.1`, `§5.5.2`
and `§5.5.3`, and nothing else.**

#### 5.5.1 THE REGISTER — **`13` typed ROWS carrying `13` TERMS, in THREE families, ALL executed by design**

**What this section is, in one sentence.** A **typed register of `13` rows / `13` terms** whose **SIX genuine
quantifications** — (i) *the normalizer's and projector's totality over the whole declared catalog/entry shape
space*; (ii) *the emitted member census, key set and drop rule*; (iii) *the collapse's application and its
ordering*; (iv) *the platform projection's whole three-outcome domain*; (v) *the seam's four declared
degradations and its once-count*; and (vi) *the `id` domain's never-validated, never-minted discipline* — are
**executed here as quantifications over finite, pinned enumerations**, **hand-rolled and deterministic, with no
new dependency**.

**THE FOUR DOMAINS THIS REGISTER DRIVES, DECLARED BY NAME — and the declaration is part of the register's own
terms, because a domain that is NEVER VALIDATED must be stated as such or the `id` rows read as validation
rows** (the gate-1 record's own confirmation of the declaration):

1. **THE `12`-SHAPE CATALOG/ENTRY POOL** — the whole input space this contract declares for `catalog` and for a
   catalog ELEMENT (`§2.3` item 1's five dispatch rows, exercised by `P-ML-IM-1`'s `12` shapes and drawn by
   `P-ML-TP-1`'s `12`-member pool). **It is a DECLARED EXTENT, not the whole of JavaScript's value space.**
2. **THE CLOSED THREE-OUTCOME PLATFORM POOL** — `'darwin'` · a non-`'darwin'` STRING · a NON-STRING or ABSENT
   value (`§0A` notes 3/4, `§2.3` item 4). **Closed: three outcomes and no fourth**, driven by `P-ML-TP-3`'s
   `12` shapes and asserted as classes by `P-ML-SM-1`.
3. **THE PICKER-ANSWER POOL** — the answers a caller's picker can hand back (`§2.4` item 1's four degradations
   plus the known-`id` positive arm, `§2.3` item 8). **Closed at the level the contract cares about: a value
   that names a known `id`, a value that names none, an empty (`null`/`undefined`) answer, and a THROW** —
   driven by `P-ML-TP-2`'s `9` shapes.
4. **THE OPAQUE, NEVER-VALIDATED, NEVER-GENERATED `id` DOMAIN** — **ANY JavaScript value**, and **THE MODULE
   NEITHER VALIDATES NOR MINTS ONE**: it CARRIES every `id` verbatim (`§2.3` item 2) and performs exactly ONE
   operation on one — a STRICT-IDENTITY comparison inside `selectCatalogItem` (`§2.3` item 8). **THIS DOMAIN IS
   NEVER VALIDATED AND NEVER MINTED, and no `id` row of this register may be read as a validation row**
   (`P-ML-IM-7`, `§3.4 R-10`).

**THE IDS ARE THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-ML-*`** (`ML` = this unit,
**m**enu**l**ib) — so **a register row is never mistaken for a `§3` row** (whose families are `M-*`/`F-*`/`I-*`/
`R-*`/`X-*`) **and never for a sibling's register** (`P-RL-*`, `P-CT-*`, `P-GT-*`, `P-GU-*`, `P-GS-*`,
`P-ZN-*`, `P-CN-*`, `P-PJ-*`, `P-LH-*`, `P-SH-*`). **The three families are the type algebra
`docs/specs/engine-pin.md` `§5.5` pins**: **`IM`** = injected seams, carried data and invariants · **`SM`** =
the emitted value's state classes and the purity/statelessness discipline · **`TP`** = totality. **The
strategy-id prefix is `S-ML-*`, one per row** — **THIRTEEN ids, one per row: `S-ML-CATALOG-1` ·
`S-ML-PROJECT-1` · `S-ML-KEYSET-1` · `S-ML-SHAPE-1` · `S-ML-COLLAPSE-1` · `S-ML-CARRY-1` · `S-ML-ID-1` ·
`S-ML-STATE-1` · `S-ML-IDENTITY-1` · `S-ML-CONST-1` · `S-ML-TOTAL-1` · `S-ML-SEAM-1` · `S-ML-ENTRY-1`** — of
which **TWELVE are ENUMeration strategies and ONE (`S-ML-TOTAL-1`) is the pinned-seed GENERATOR.** **EACH ROW'S
OWN CELL NAMES ITS ID, THE IDS ARE DISTINCT, AND NO ROW IS LEFT WITHOUT ONE.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

**⟶ DATE-STAMPED METHOD NOTES AND THE `(bounded)` COUNT (`2026-09-27`, from the RED RUN's recorded readings at
`tests/menu-template.test.ts`; the TestWriter's three readings, recorded HERE because they are the CONTRACT's
business, so a later author does not re-discover them — annotate-never-rewrite, and no row id, strategy id, seed,
term or cap is moved by any of them).** **The canonical provenance, the re-grain obligation and the arithmetic are
at `§7`'s repair addendum and `§5.5.3`.**
**(i) THE `(bounded)` COUNT IS `6` OF THE `13` ROWS — the figure `§5.5.1`'s marking block below, this line,
`§5.5.2` item 2 and the landed harness all print; `CURRENT STATE` item 3's as-filed `5` is CORRECTED and
`SUPERSEDED` by the dated amendment there, with the as-filed form kept visible.** **THE SIX, NAMED AGAIN HERE so
the count is checkable: `P-ML-IM-1` · `P-ML-IM-4` · `P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`**
(**`6 + 7 = 13`**, the unmarked seven quantifying over closed named lists, fixed grids or closed drive sets).
**(ii) METHOD NOTE (a) — A SKIPPED ELEMENT BREAKS A COLLAPSE RUN, and the red drove it that way:** **a `null` /
`undefined` entry (or any element the normalizer SKIPS, `§2.3` item 1(c)/(d)) is NOT part of the run and does NOT
BRIDGE it** — the red set drove that case as **TWO SINGLETONS** (asserting `items.length === 2`, no `submenu` on
either, `collapsing === true`), **which is `§2.3` item 5 rule 3's own clause** (*the run is measured on the
NORMALIZED sequence*), and it is **the declared boundary drive of `P-ML-IM-5`** — **so this reading adds no row,
moves no term and is a CLARIFICATION, not a new obligation.**
**(iii) METHOD NOTE (b) — AN ENTRY WHOSE OWN ACCESSOR (own-key read) THROWS IS SKIPPED, NOT CARRIED WITH A MISSING
KEY:** the red set drove the throwing-accessor element as **SKIPPED with a ZERO throw** — the element contributes
**NO entry**, and the return is **NOT** an entry carrying the remaining six keys with the throwing one absent.
**That is the reading `§2.3` item 1(d) pins** (*"the element is SKIPPED, the throw is ABSORBED, and NOTHING
ESCAPES the call"*), **driven at `P-ML-IM-1` shapes `(11)`/`(12)` and at `§5.5.2` item 7's CLEAN result for that
row** — **and it is the reading a TestWriter must take: an implementation that carries such an element as a
partial entry FAILS `P-ML-IM-1`; it does NOT fail `F-2`/`I-1`'s totality half, because nothing throws either way.**
**(iv) METHOD NOTE (c) — THE CATALOG POOL'S `12`th MEMBER IS A STATED BOUNDARY, AND IT HAS NO DRIVING ROW: NAMED
AS SUCH RATHER THAN LEFT IMPLIED.** **The `12`-shape catalog/entry pool's shape `(12)` is "an array carrying
`Object.create(null)`, an array element and a record whose accessor throws" (`P-ML-IM-1`'s own cell), NOT a
`Map`/`Symbol.toPrimitive`/successive-read holder** — **the `Map` member belongs to `P-ML-TP-1`'s hostile pool,
where the landed harness also drives `Set` and a function, and where the pool's member `12` is "`[]` and a deeply
nested array"** — so **the three shapes named as deliberately EXCLUDED at `§5.5.2` item 4 (a lone-surrogate string,
a `Symbol.toPrimitive` that throws only on its SECOND invocation, and a HOLDER whose getter returns different
answers on successive reads) are a STATED BOUNDARY WITH NO DRIVING ROW.** **THE HOLDER IS THE ONE WITH A CANDIDATE
HOME: the row that WOULD drive it is `P-ML-TP-1` (`S-ML-TOTAL-1`, its `12`-member pool), and it does NOT drive it
— adding that member is NOT this amendment's to make, because it would change a declared pool, a term and the
total, which this amendment may not move.** **A pass that adds it owes a NEW dated amendment and a register
re-grain under `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.** **THE `Symbol.toPrimitive`-on-second-invocation shape
is a NAMED BOUNDARY WITH NO HOME in this register** (no row of `§5.5.1` quantifies over a successive-read seam),
**and the lone-surrogate string's home is `§5.5.2` item 10's recorded coverage gap on `P-ML-IM-7`** — **so between
them: one shape has a named gap with a named re-grain cost, one has a candidate row that does not drive it, and
one has no row at all, and NONE of the three is an unrecorded omission.**

1. **Plain deterministic vitest in this unit's own test file** (`tests/menu-template.test.ts`, `§4.1`/`§5.1`) —
   the file the red set already owes, and the file the register **rides as part of the red** (`§4.2` item 5).
   **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript inside
   the test file.** **ONE row uses a generator** — `P-ML-TP-1` — and **it is pinned to literals in the test file
   itself: a hand-rolled 32-bit LCG with `state₀ = 20260927`; `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod
   2³²`; and EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state selecting the pool member —
   `index = stateₙ₊₁ mod pool.length`, with `pool.length = 12`** — so **one pool draw consumes exactly ONE LCG
   step.** **Stated so no TestWriter reads a two-step or a scaling form into it: there is NO `next(k)` helper in
   this register, and `pool.length` participates in NO rule beyond that one modular reduction.** **No
   `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.** **Every other row's table is
   fixed and enumerated.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's remaining
   attempts are abandoned and no further row starts). **A register row is never refused on the ground that "no
   PBT harness exists."**
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** **No `§3` row is weakened,
   widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and
   **a row whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)`
   marking** (`§5.5.2` item 2).
6. **The register's own boundaries, named rather than silently relied on:** **(a) NO DOM, NO ELEMENT, NO OS AND
   NO COORDINATE IS NEEDED OR USED BY ANY ROW** — every row drives **pure values, recording closures and
   throwing stubs**; **(b) the hostile shapes are FIXED table members, deliberately, so no draw is ambiguous** —
   **the `P-ML-TP-1` pool's members are all totality INPUTS whose declared outcomes are stated**; **(c) each
   row's pool/table is a SUBSET of the input space this contract pins**, and **its silence about a shape it does
   not list is a stated boundary, not an unrecorded omission** (the pool omits a **lone-surrogate** string, a
   `Symbol.toPrimitive` that throws **only on its second invocation**, and a seam whose getter returns different
   answers on successive reads — the last two because they would make a draw ambiguous); **(d) `P-ML-IM-1`
   carries the catalog's totality, `P-ML-IM-2` the projection's, `P-ML-IM-3` the key census, `P-ML-IM-4` the
   template shape, `P-ML-IM-5` the collapse and its ordering, `P-ML-IM-6` the seven-key carry, `P-ML-IM-7` the
   `id` domain and the seam's once-count, `P-ML-SM-1` the three emitted states, `P-ML-SM-2` the identity
   projection, `P-ML-SM-3` the cross-call constancy, `P-ML-TP-1` the catalog totality universal, `P-ML-TP-2` the
   picker's declared degradations, and `P-ML-TP-3` the platform projection's three-outcome totality — **and NO
   OTHER ROW MAY BE QUOTED FOR ANY OF THEM.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-ML-IM-1`** *(the NORMALIZER's totality and its carry discipline — the row that closes the "no shape gate" question)* | `P-IM` invariant | **For EVERY one of the row's `12` declared catalog/entry shapes, `normalizeCatalog` behaves EXACTLY as declared: it returns `[]` for a non-array and for an empty array; it returns one `CatalogEntry` per USABLE element IN CATALOG ORDER; it SKIPS a non-object element, a `null`/`undefined` element and a hostile element; it ABSORBS a throwing accessor; it materializes NO placeholder key; and it THROWS FOR NONE.** | **YES (bounded — the property text says "EVERY catalog shape" while the table drives `12` shapes and the universal is NOT proven)** | `M-1`, `F-1`, `F-2`, `I-1`/`I-12`, `§2.3` items 1/2/3/9 | `S-ML-CATALOG-1` | **`12` attempts** = **the `12`-shape catalog/entry pool, ONE DRIVE EACH.** **The `12` shapes:** **(1)** a frozen array of three carried records (the happy path) · **(2)** `[]` (the empty array) · **(3)** `undefined` (the argument omitted) · **(4)** `null` · **(5)** a non-array primitive (`42`, `'x'`, `true`, a `Symbol`, a `12n` — each its own drive inside the attempt) · **(6)** a plain object · **(7)** a `Map` · **(8)** a function · **(9)** an array carrying a `null`/`undefined`/primitive element set · **(10)** an array carrying a revoked `Proxy` (`Proxy.revocable({}, {})` after `revoke()`) · **(11)** an array carrying a `Proxy` whose `ownKeys`/`getOwnPropertyDescriptor` traps THROW · **(12)** an array carrying `Object.create(null)`, an array element and a record whose accessor throws. **Per attempt assert:** the returned value's declared class (`[]` or the carried array), the CARRIED LENGTH against the declared usable-element count, the ORDER, the per-element identity (`toBe` for the source value), and that nothing threw. |
| **`P-ML-IM-2`** *(the PROJECTOR's purity and totality, and the caller's data untouched)* | `P-IM` invariant | **For EVERY one of the row's `12` catalog shapes (the same pool) AND EVERY one of its `2` option shapes (`platform` present / `options` unusable), `buildMenuTemplate` returns the declared five-member `MenuTemplate`; it performs NO write to its arguments (the catalog's and the options' own members read BEFORE the call equal the ones read AFTER, `toBe`-identity included); it consults NO member of an entry as a decision beyond the declared `kind` comparison; and it THROWS FOR NONE.** | **YES** *(the `12` × `2` grid is the declared extent; **each cell has its own declared pair** — the returned shape and its `items` length)* | `M-1`, `M-2`, `M-9`, `F-2`, `F-4`, `I-1`, `§2.3` item 1, `§2.5` item 1 | `S-ML-PROJECT-1` | **`12` attempts** = **the `12`-shape pool, ONE DRIVE EACH, each drive reading BOTH option shapes' results** (the second option shape's read is an ASSERTION inside the attempt, never a second drive). **Per attempt assert:** `Object.keys(template)` deep-equals `['items','platform']`; `items` is an array; every item's `Object.keys` deep-equals the declared seven-name list; the caller's own catalog and options objects are unchanged by identity and by value; and nothing threw. |
| **`P-ML-IM-3`** *(the KEY CENSUS and the DROP rule — `G-2`'s own discharge row)* | `P-IM` invariant | **For EVERY emitted item of EVERY drive: `Object.keys(item)` deep-equals EXACTLY `['id','label','accelerator','role','kind','submenu','enabled']` in that order — no eighth own key, no missing declared key that the source owned, no `Symbol` key, no non-enumerable member — AND a catalog element owning an EIGHTH and a NINTH own key produces an item that carries NEITHER, NAMED BY NAME.** | **YES** *(the `4`-shape key-set table with its per-shape declared census; the "EVERY emitted item" clause is read over the table's own shapes)* | `M-8`, `F-2`, `I-3`, `R-12`, `§2.3` item 2, `§0A` note 2 | `S-ML-KEYSET-1` | **`12` attempts** = **`4` source key-set shapes × `3` census readings.** **The `4` shapes:** **(1)** all seven own keys · **(2)** exactly two own keys (`id`, `label`) · **(3)** all seven PLUS `extra` and `another` (the EIGHTH-KEY negative drive) · **(4)** an inherited `role` plus a `Symbol` key plus a non-enumerable member, on a record owning the other six. **The `3` census readings, read inside each attempt:** **(i)** `Object.keys(item)` deep-equals the declared seven-name list; **(ii)** `Object.getOwnPropertySymbols(item).length === 0` **and** every declared member is an own ENUMERABLE property where present; **(iii)** `'extra' in item === false` and `'another' in item === false` **and** every source member the item does carry is present **by identity** (`toBe`). **Per attempt assert:** all three readings, plus the shape's own declared key COUNT (`7`, `2`, `7`, `6`). |
| **`P-ML-IM-4`** *(the emitted TEMPLATE's shape — the STRUCTURE row, kept separable from `P-ML-IM-3`'s key census and from `P-ML-SM-2`'s value rule)* | `P-IM` invariant | **For EVERY call: the returned value's OWN ENUMERABLE STRING KEYS are EXACTLY `['items','platform']` in that order; `platform`'s own keys are EXACTLY `['recognized','collapsing']` in that order; both platform members are `boolean`s; `Array.isArray(items)` is `true`; the prototype of each record is `Object.prototype`; and NO member is a getter.** | **YES** *(a closed two-name key set under one order, over a fixed `5`-shape call table with `2` readings per shape, plus the two declared control drives)* | `M-2`, `M-9`, `F-4`, `I-3`, `§0A` note 5, `§5.5.1 P-ML-IM-3` | `S-ML-SHAPE-1` | **`12` attempts** = **`5` call shapes × `2` readings (`10`) + `2` further drives.** **The `5` call shapes (the grid):** a conformant call · a call with an unusable catalog · a call with an unusable `options` · a call whose `platform` is a non-string · a call whose catalog is EMPTY. **The `2` readings, read inside each attempt:** **(i)** `Object.keys(template)` and `Object.keys(template.platform)` deep-equal their declared lists in order; **(ii)** `typeof template.platform.recognized === 'boolean'`, `typeof template.platform.collapsing === 'boolean'`, `Array.isArray(template.items)`, and the prototype/getter checks. **THE `2` FURTHER DRIVES, named so the `12` is checkable rather than asserted:** **(1)** the SECOND-CALL independence drive (the same call again in the same attempt-set, asserting a FRESH template record with the same member lists and a distinct identity from the first); **(2)** the THIRD-TOP-LEVEL-MEMBER CONTROL (a declared-failing drive: a template-shaped corpus carrying a third top-level key, whose FAILING is asserted — `§5.5.2` item 9(1)/(2)). **Per attempt assert:** both readings, plus the second call's identity reading and the third-member control's declared failure. |
| **`P-ML-IM-5`** *(THE COLLAPSE AND ITS ORDERING — the row correction (d) names as MISSING (`G-3`'s second half))* | `P-IM` invariant | **For EVERY one of the row's `5` run shapes with `platform === 'darwin'`: each MAXIMAL RUN of two or more `'picker'`-kind entries becomes ONE emitted entry whose `submenu` carries the REST of its run as projected items IN CATALOG ORDER; a run of exactly ONE is NOT collapsed and gains NO `submenu`; two runs separated by a non-`'picker'` entry are TWO runs; a run whose entries carry `enabled: false` collapses identically; the collapse is NOT applied recursively; and the parent carries its own seven members verbatim beside the replaced `submenu`.** | **YES** *(the `5` run shapes ARE the declared domain of the run rule and each has its own declared expectation)* | `M-7`, `F-5`, `§2.3` item 5, `G-3`, `§7a.1` item 3 | `S-ML-COLLAPSE-1` | **`12` attempts** = **`5` run shapes × `2` orderings (`2` drives each) + `2` boundary drives.** **The `5` run shapes:** **(1)** a run of three `'picker'` entries between two non-picker entries · **(2)** a run of TWO · **(3)** a run of exactly ONE · **(4)** TWO runs split by a non-picker entry · **(5)** a run whose entries carry `enabled: false` and whose first entry also owns a `submenu` value. **The `2` orderings:** catalog order and REVERSED catalog order, each asserting the parent moved and the submenu order correspondingly. **The `2` boundary drives:** a catalog that is ALL picker entries (one run spanning the array) and a catalog with a picker run whose members are separated by an element the NORMALIZER SKIPS (the skip must not bridge the run — `§2.3` item 5 rule 3). **Per attempt assert:** `items.length`; the parent's own seven members by identity; the `submenu` array's length and its members' ORDER and identity; and that NO nested entry's `submenu` was replaced. |
| **`P-ML-IM-6`** *(THE SEVEN-KEY CARRY — the row that pins the DROP and the ABSENT-MEMBER rules as POSITIVE/negative pairs, `G-2`'s second half)* | `P-IM` invariant | **For EVERY one of the row's `12` carry shapes: a declared key the source element OWNS is carried VERBATIM BY IDENTITY; a declared key it does NOT own is ABSENT from the emitted item (NO `undefined` placeholder, NO `null`, NO default); an own key OUTSIDE the seven is DROPPED, NEVER COPIED (`Object.keys(item)` is read for its length AND its names, with the extras NAMED); and the seven-key claim is a `tsc`-checked TYPE claim as well — every member typed `unknown`.** | **YES** *(the `12` shapes ARE the declared domain of the carry rule and each has its own declared key count)* | `M-1`, `M-8`, `F-2`, `I-5`, `R-12`, `§2.3` items 2/9, `§0A` note 2 | `S-ML-CARRY-1` | **`12` attempts** = **`6` carry shapes × `2` sides (positive: the owned keys are present by identity; negative: the extras and the absent keys are absent by NAME).** **The `6` shapes:** all seven owned · exactly two owned · the seven plus two extras · all seven with values of `undefined` · all seven with hostile values (`NaN`, a `Symbol`, `12n`, an object, a function) · a null-prototype record owning all seven. **Per attempt assert:** `Object.keys(item)` length and names; each owned member's value by identity; each absent member's absence (`'x' in item === false`); and, on the type half, the `tsc` leg's `unknown` assignment (`§5.2` leg 5). |
| **`P-ML-IM-7`** *(the `id` DOMAIN and the SEAM'S ONCE-COUNT — the row that keeps the `id` domain from reading as a validation row, and that lands the "counted once" clause)* | `P-IM` invariant | **THE `id` DOMAIN IS NEVER VALIDATED AND NEVER MINTED: for EVERY one of the row's `7` `id`/answer shapes, the module performs exactly ONE operation on an `id` — a STRICT-IDENTITY comparison inside `selectCatalogItem` — and NO type test, no coercion, no trimming, no hashing, no uniqueness test and no generation.** *(The row's `5` seam-count drives are DRIVES of the same row and are printed BESIDE this property's `7`-shape domain — `A DECLARED REGISTER TERM IS A DRIVE COUNT`: the term is `7 + 5 = 12` DRIVES, while the QUANTIFIER above ranges over `7`.)* **AND the seam's once-count is ASSERTED EXACTLY: the picker is invoked EXACTLY ONCE where it is called at all, NEVER twice, NEVER retried, and EXACTLY ZERO times where the carried entries include no `'picker'`-kind entry.** | **YES** *(the `7` shapes ARE the declared quantifier domain and each has its own declared outcome; the `5` count drives are a closed drive set)* | `M-6`, `F-7`, `R-10`, `§2.3` items 6/8, `§2.2` `P-ML-10` | `S-ML-ID-1` | **`12` attempts** = **`7` `id`/answer shapes + `5` count drives.** **The `7` shapes:** **(1)** a carried string `id` matched by the same string · **(2)** the same `id` matched by an equal-but-different string value where the shape is an object id (`{}` vs `{}`) · **(3)** `NaN` as an `id` and as an answer · **(4)** an entry with NO `id` member · **(5)** an object `id` matched BY REFERENCE · **(6)** a non-`null` answer naming NO known `id` · **(7)** a `null`/`undefined` answer. **The `5` count drives:** a `darwin` call with a picker run (count `1`) · a `darwin` call whose `picker` is throwing (count `1`, absorbed) · a call with NO `'picker'`-kind entry (count `0`) · a call with a non-callable picker (count `0`) · `selectCatalogItem` (count `1`). **Per attempt assert:** the returned value (`null` or the answer BY IDENTITY) and the recorded count EXACTLY. |
| **`P-ML-SM-1`** *(THE THREE STATE CLASSES OF THE EMITTED VALUE — correction (a) discharged: the `SM` family re-derived as classes of the VALUE, never as a state machine the model lacks)* | `P-SM` state-machine | **The emitted value lands in EXACTLY ONE of THREE declared classes, and the class is a function of `platform` ALONE: (A) `{recognized:true, collapsing:true}` with the collapse applied to every qualifying run; (B) `{recognized:true, collapsing:false}` with the identity projection, for every non-`'darwin'` STRING; (C) `{recognized:false, collapsing:false}` with the identity projection, for every non-string and absent value. NO fourth class exists, NO class is reachable by data alone, and the module holds NO state between calls (its behaviour is a pure function of its arguments in EVERY call position and order).** | **YES** *(three classes, each with its own declared pair of members and its own declared `items` effect)* | `M-2`, `M-3`, `M-7`, `F-3`, `F-4`, `I-4`, `§2.3` items 4/10, `§0A` notes 3/4 | `S-ML-STATE-1` | **`3` attempts** = **the `3` classes.** **(A)** driven with `'darwin'` and a multi-picker run (asserting the collapse AND both members); **(B)** driven with `'win32'` and the SAME catalog (asserting the identity projection AND both members); **(C)** driven with `42` and the SAME catalog (asserting the identity projection AND both members). **Per attempt assert:** the exact `platform` member pair, the `items` structural expectation, and the ABSENCE of the other two classes' signatures (a `collapsing:true` on a non-`'darwin'` drive FAILS this row). **The class is NOT a lifecycle**: no row here claims a transition, an activation, a session or a retained state. |
| **`P-ML-SM-2`** *(THE IDENTITY PROJECTION — the row correction (d) names as MISSING, and the `G-3` first static row)* | `P-SM` state-machine | **For EVERY one of the row's `2` non-collapsing classes AND EVERY one of the row's `3` catalog shapes: `items` is the identity projection of the carried sequence — the SAME number of entries, in the SAME order, with the SAME carried members by identity — and NO entry's `submenu` member was REPLACED or CREATED by the module.** | **YES** *(a fixed `2` × `3` grid, every cell with its own declared identity list)* | `M-3`, `F-3`, `§2.3` item 4(b)/(c), `G-3` | `S-ML-IDENTITY-1` | **`3` attempts** = **the `3` catalog shapes, each driven under BOTH non-collapsing classes inside the attempt.** **The `3` catalog shapes:** the same catalog `P-ML-SM-1` (A) drives, i.e. one carrying a multi-picker run · a catalog of non-picker entries only · an empty catalog. **The `2` classes:** `'win32'` (class B) and `42`/omitted (class C). **Per attempt assert:** `items.length === carriedLength`; each item's seven members by identity; each item's `submenu` **unchanged** (`toBe` against the source's own member where it had one, `'submenu' in item === false` where it did not); and `collapsing === false`. **A module that collapses on a non-`'darwin'` platform FAILS this row AND `P-ML-SM-1`.** |
| **`P-ML-SM-3`** *(cross-call constancy — no cache, no drift, and the seam count rising with the calls)* | `P-SM` state-machine | **For EVERY one of the row's `3` repeated-call shapes: five successive calls with the SAME arguments return EQUAL values — the caller's own answer BY IDENTITY on the seam paths, and a template whose `items` carries equal items and whose `platform` carries equal members — and NO observable state differs between the first and the fifth call, with the seam's own recorded count rising EXACTLY `1` per calling invocation.** | **YES** | `F-10`, `M-9`, `I-4`, `§2.3` item 6, `§2.2` `P-ML-4` | `S-ML-CONST-1` | **`3` attempts** = **`3` repeated-call shapes, each driven FIVE times.** **The `3` shapes:** **(1)** `normalizeCatalog` with a conformant catalog · **(2)** `buildMenuTemplate` with a `'darwin'` platform and a conformant recording picker · **(3)** `selectCatalogItem` with a conformant recording picker. **Per attempt assert:** the five return values' mutual equality (`toBe` where the caller's own answer identity is the claim); on (2), that each returned template is a **distinct object** (`!==` pairwise over distinct indices) with equal contents; and, at the fifth call, that the seam's recorded invocation count is exactly `5` on (2)/(3) — **a count of `6` FAILS this row for a cache or a retained closure.** |
| **`P-ML-TP-1`** *(the CATALOG TOTALITY universal — with its BOUND in its own words, over a pinned-seed pool, and NAMING its entry points and return shapes so the row can FAIL)* | `P-TP` totality | **For EVERY hostile shape drawn from the pinned `12`-member pool: (a) NONE OF THE MODULE'S THREE ENTRY POINTS THROWS — `normalizeCatalog(catalog)` returns a `readonly CatalogEntry[]`, `buildMenuTemplate(catalog, options)` returns a `{items, platform}` record, and `selectCatalogItem(catalog, picker)` returns `unknown \| null` — for ANY argument, INCLUDING `NaN`, `Symbol`, `BigInt`, `Object.create(null)`, a revoked `Proxy`, a trap-throwing `Proxy` and a throwing accessor; AND (b) THE DECLARED RETURN SHAPES HOLD: every item's `Object.keys` reads the declared seven names, and the template's two member records have their declared keys — with the picker supplied as a conformant recording closure so the SHAPE half is assertable independently of the hostile half.** **The universal is over the DRAWN domain and NOT over the whole input space.** | **YES (bounded — the property text says "EVERY hostile shape" while the pool holds `12` members and the drive performs `12` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-1`, `F-2`, `F-4`, `I-1`, `I-12`, `M-1`, `M-9`, `§2.3` items 1/3 | `S-ML-TOTAL-1` | **`12` attempts** = **`12` pinned-seed DRAWS, each applying EXACTLY ONE LCG step (`index = stateₙ₊₁ mod 12`), each draw driven through ALL THREE entry points in sequence.** **THE `12`-MEMBER POOL:** **(1)** `Object.create(null)` with own keys · **(2)** `NaN` · **(3)** a `Symbol` · **(4)** a `12n` · **(5)** a revoked `Proxy` · **(6)** a `Proxy` whose `ownKeys`/`getOwnPropertyDescriptor`/`has` traps THROW · **(7)** a record whose accessor THROWS · **(8)** a self-referential record · **(9)** a `Map` · **(10)** a `Set` · **(11)** a function · **(12)** `[]` and a deeply nested array (one member, driven as both). **Per attempt assert:** for each of the three entry points, the declared return SHAPE (by `Object.keys` and by `Array.isArray`), the declared emptiness/value class, and that nothing threw. **THE POOL'S DELIBERATE EXCLUSIONS, named so the boundary is a statement rather than an omission:** a lone-surrogate string (`'\uD800'`), a `Symbol.toPrimitive` that throws only on its SECOND invocation, and a holder whose getter returns different answers on successive reads (the last two because they would make a draw ambiguous). |
| **`P-ML-TP-2`** *(THE PICKER'S FOUR DECLARED DEGRADATIONS — `G-4`'s discharge, and the correction (b) that found `TP` under-asserted)* | `P-TP` totality | **For EVERY one of the row's `9` declared seam/answer shapes: the module lands in a DECLARED member and never throws — (a) an ABSENT seam leaves the `'picker'`-kind item EMITTED AND `enabled === false`; (b) a NON-CALLABLE seam does the same with ZERO invocations; (c) a THROWING seam is ATTEMPTED ONCE, ABSORBED inside the wrapper, and produces the same disabled item; (d) a non-`null` answer naming NO known `id` yields `null` from `selectCatalogItem`; (e) a `non-null` KNOWN-`id` answer is returned BY IDENTITY; (f) a `null`/`undefined`/empty answer yields `null`; (g) an unusable entry carrying the `'picker'` kind still contributes its collapsed parent; (h) a catalog with NO `'picker'`-kind entry invokes the seam ZERO times; (i) a `Proxy` whose `apply` trap throws behaves as (c).** | **YES (bounded — the property text says "EVERY declared seam/answer shape" while the table drives `9` shapes and the universal is NOT proven)** | `M-4`, `M-5`, `M-6`, `F-6`, `§2.4` item 1 (all four classes + the positive arm), `G-4` | `S-ML-SEAM-1` | **`9` attempts** = **the `9` declared shapes listed above, ONE DRIVE EACH.** **Per attempt assert:** the item's emitted-ness and `enabled` value (where the shape bears on it); the recorded invocation count EXACTLY (`0`/`1` by the declared rule); the return value (`null` or the answer BY IDENTITY); the absence of any mechanism default (`''`, `0`, `{}`, a sentinel); and that nothing threw. **THE FOUR DEGRADATION CLASSES OF `§2.4` ITEM 1 ARE THEREFORE EACH DRIVEN, and the count is ASSERTED, never "at least".** |
| **`P-ML-TP-3`** *(THE PLATFORM PROJECTION'S THREE-OUTCOME POOL — correction (b)'s second half, and `Q2`'s own totality row)* | `P-TP` totality | **For EVERY one of the row's `12` platform shapes: the projection is EXACTLY one of the three declared outcomes and NOTHING THROWS — `'darwin'` ⇒ `{recognized:true, collapsing:true}` with the collapse; ANY OTHER STRING ⇒ `{recognized:true, collapsing:false}` with the identity projection; ANY NON-STRING OR ABSENT VALUE ⇒ `{recognized:false, collapsing:false}` with the identity projection. NO silent `'darwin'` default exists on any shape, and no case variant, whitespace variant or prefix of `'darwin'` collapses.** | **YES (bounded — the property text says "EVERY platform shape" while the table drives `12` shapes; the universal is NOT proven. The `recognized` column's non-string arm is a DERIVATION — `§0A` note 4 — and this cell is the ONE site whose expectation the alternative reading would move)** | `M-2`, `M-3`, `F-3`, `F-4`, `§2.3` item 4, `§0A` notes 3/4, `Q2` | `S-ML-ENTRY-1` | **`12` attempts** = **the `12` platform shapes, ONE DRIVE EACH, each driven against the SAME catalog.** **The `12` shapes:** **(1)** the literal `'darwin'` · **(2)** `'win32'` · **(3)** `'linux'` · **(4)** `'freebsd'` · **(5)** `''` (the empty string) · **(6)** `'Darwin'` (case variant) · **(7)** `' darwin'` and **(8)** `'darwin '` (whitespace variants) · **(9)** `null` · **(10)** `42` · **(11)** a `Symbol`/`12n` · **(12)** an object/array/a function, and the ABSENT case (`options` omitted and the member omitted). **Per attempt assert:** the exact `platform` member pair; the `items` structural expectation (collapsed vs identity); and the ABSENCE of the other outcomes' signatures. |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly: `6` of the `13` rows.** **THE MARKED SET, and it is named
IDENTICALLY at this block, at `§5.5.2` item 2 and at the status block's item 3: `P-ML-IM-1` · `P-ML-IM-4` ·
`P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`.** **Each is marked because its PROPERTY TEXT IS LARGER
THAN ITS TABLE OR ITS ASSERTION SET:** **`P-ML-IM-1`** (*"EVERY catalog shape"* over a `12`-shape pool) ·
**`P-ML-IM-4`** (*"EVERY call"* over `5` call shapes with `10` readings and `12` attempted drives) ·
**`P-ML-IM-5`** (*"EVERY run"* over `5` run shapes, `10` grid drives and `2` boundary drives, whose boundary
text is a rule rather than a closed list) · **`P-ML-TP-1`**
(*"EVERY hostile shape"* over a `12`-member pool and `12` draws) · **`P-ML-TP-2`** (*"EVERY declared seam/answer
shape"* over `9` driven shapes) · **`P-ML-TP-3`** (*"EVERY platform shape"* over `12` driven shapes).
**THE UNMARKED SET (`7` of the `13` ROWS), named rather than counted: `P-ML-IM-2` · `P-ML-IM-3` · `P-ML-IM-6` ·
`P-ML-IM-7` · `P-ML-SM-1` · `P-ML-SM-2` · `P-ML-SM-3`** — each quantifies over a **CLOSED NAMED LIST, a FIXED
GRID or a fixed drive set whose every cell has its own declared outcome**, so **no marking is owed and none is
printed.** **`6 + 7 = 13`, the register's row count.**

**⟶ PINS OF THE GATE-6 CONTRACT DISPOSITION — `PBT-F1` (THE `P-ML-IM-5` MARKING) AND `PBT-F2` (THE THREE `12`-ATTEMPT CELLS) (`2026-09-27`; annotate-never-rewrite — the marking block above, method note (i), `§5.5.2` item 2, `§5.5.3`'s table and the landed harness all stay VISIBLE and unedited; **NO TERM, CAP, SEED, ROW ID, STRATEGY ID OR `(bounded)` MARKING MOVES**).**

**(1) `PBT-F1` — `P-ML-IM-5`'s `(bounded)` MARKING IS CONFIRMED: THE MARKING IS OWED AND IT STAYS.** **The audit's premise is granted — the `5` run shapes × `2` orderings ARE a fixed grid and EVERY grid cell is driven — but A GRID EXHAUSTED IS NOT A DOMAIN EXHAUSTED: the row's PROPERTY TEXT quantifies over a RULE (maximal runs collapsing into one parent, the singleton's non-collapse, the non-adjacency split, the non-recursion), and a rule ranges over an UNBOUNDED catalog space, so `5` shapes are a BOUNDED SAMPLE of it — exactly what the marking block above already says.** **`P-ML-IM-5`'s `Executed?` cell clause *"the `5` run shapes ARE the declared domain of the run rule"* is the LOSING HALF of that cell and is read as **the declared GRID**, not as the rule's whole domain; the cell stays visible above under this pin.** **THE MARKED SET STAYS `6` OF `13` — `P-ML-IM-1` · `P-ML-IM-4` · `P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`.** **THE ALTERNATIVE (WITHDRAWING THE MARKING → `5` OF `13`) IS NOT TAKEN:** it would contradict the marking block above, `§5.5.2` item 2, `CURRENT STATE` item 3's CORRECTED `6` and `§3a`'s `A-14` — and a marking move is a DATED AMENDMENT's business, never a silent edit. **Its `12`-versus-`5` half is (2)'s.**

**(2) `PBT-F2` — THE THREE `12`-ATTEMPT CELLS, PRINTED WITH THEIR PER-ATTEMPT TERMS, SO THE TERM IS A DRIVE COUNT AND NOT AN ASSERTION COUNT (`A DECLARED REGISTER TERM IS A DRIVE COUNT`).** **READ CONSISTENTLY: ONE ATTEMPT = ONE DRIVE OF THE ROW'S DECLARED ENUMERATION, and a shape's SECOND READING IS ITS SECOND DRIVE** — the reading under which `P-ML-IM-3`'s `4 × 3` and `P-ML-IM-6`'s `6 × 2` cells already count readings/sides as attempts — **while an input driven INSIDE one attempt is a READING PRINTED BESIDE THE TERM and is never counted.** **`P-ML-IM-1` `12` = `12` pool shapes × `1` drive = `12`** (the `42` / `'x'` / `true` / `Symbol` / `12n` set inside shape `(5)`, shape `(9)`'s element set and shape `(12)`'s three sources are **readings inside their attempts**). **`P-ML-IM-4` `12` = `5` call shapes × `2` READING-DRIVES (`10`) + `2` further drives = `12`** — the second-call independence drive and the third-top-level-member control; **the as-written *"× `2` readings"* form and the landed harness's control SENTENCE *"assertions inside `5` attempts, not `10` drives"* are both `SUPERSEDED` AS ATTEMPT COUNTS**, because the register's own executed `126` requires `12` attempts on this row and because `§5.5.2` item 3's distinct figure `6` is unaffected either way (the pair of reading-drives over ONE call is not a DISTINCT observation). **`P-ML-IM-5` `12` = `5` run shapes × `2` ORDERING-DRIVES (`10`) + `2` boundary drives = `12`** — **the as-written *"(2 drives each)"* is read as ONE DRIVE PER ORDERING (`5 × 2 = 10`, never `20`)**, with the all-picker catalog and the skip-bridged run as the `2` boundary drives (the latter's expectation being PIN 5(i)'s business). **THESE THREE ARITHMETICS ARE THE THREE CELLS THE AUDIT NAMED, every other term is unchanged, and THE DECLARED TOTAL STAYS `126` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 + 12 + 9 + 12`.**

#### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

**Item 1 — the row count is an OUTCOME, and the breakdown signal is recorded ONCE.** **`13` rows carrying `13`
TERMS** were enumerated because **thirteen discernible testable property classes exist**, and the **`≤8`
threshold is a guidance signal, not a ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
part 1). **THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S OWN FORM — `§5.5`'s four named reasons (the
11-row spine carried by identity, correction (d)'s missing properties, the `SM` re-derivation as VALUE classes,
and the `TP` widening to three), with NO property dropped, merged or left unenumerated to fit a threshold.**
**THE BREAKDOWN RECOMMENDATION (the separable components, named once):** **`P-ML-IM-1`** — its
**normalizer-totality** half and its **carry-discipline** half have different observables (`[]` versus the
carried array and its order) and a future pass **COULD** split it; and **`P-ML-TP-3`** — its three arms are
separable per entry point. **That is a breakdown of TWO rows into five, not missing properties**, and **it is NOT
owed by this filing** — **no row is added, removed or re-scoped here**, and **`13` rows / `13` terms stay the
extent.**

**Item 2 — the `(bounded)` markings, and they are not formality.** **`6` of the `13` rows carry an explicit
`(bounded)` marking — `P-ML-IM-1`, `P-ML-IM-4`, `P-ML-IM-5`, `P-ML-TP-1`, `P-ML-TP-2`, `P-ML-TP-3`** — and each
**says so in its own `Executed?` cell**: *"the universal is NOT proven, and no reader may read this row as its
proof."* **The other `7` rows quantify over CLOSED NAMED LISTS or FIXED GRIDS — no marking is owed and none is
printed** (`6 + 7 = 13`, the register's row count). **A DONE row that reports any of the six as a proof of the
unbounded universal it states is a review finding.** ***(Dated amendment `2026-09-27`, the red run's defect
report: this item's `6` is CONFIRMED and is the figure `CURRENT STATE` item 3 was corrected to — that item's
as-filed `5` was wrong, and it stays visible there under its own annotation. The six names above are the six; no
count in this item moves.)***

**Item 3 — THE DECLARED-VERSUS-DISTINCT LEDGER, so the two figures are never conflated and the DECLARED ones are
always the cap comparison.**

| Row | Declared attempts | Its honest distinct figure | Why they differ (stated, not implied) |
| --- | --- | --- | --- |
| `P-ML-IM-1` | **`12`** | **`7`** | **two collapses, stated with their arithmetic: (i) the `[]` class** — shapes `(3)`, `(4)`, `(5)`'s four non-array primitives, `(6)`, `(7)` and `(8)` all read the SAME module-observable evidence (the declared empty answer), so `7` of them collapse into `1` reading (`12 - 7 + 1 = 6`), **but shapes `(10)` and `(11)`** land in ONE module-observable reading too (both are skipped hostiles, and the module cannot report which trap fired — `§2.3` item 1(d)), so `1` further collapses: **`12 - 7 + 1 - 1 = 5` for the two collapsed classes, PLUS the `2` remaining array-class distinctions — the carried array `(1)`/`(9)` and the mixed array `(12)` — = `7`.** **A later pass may re-derive this figure; the DECLARED term `12` is what the caps compare and is NEVER substituted** |
| `P-ML-IM-2` | **`12`** | **`4`** | the property is **shape-independent for its `items`-length half** and the caller-mutation assertion is identical across shapes: the distinct figure is the **`4` module-observable output classes** (`[]` / the carried array / the empty projection / the identity projection) |
| `P-ML-IM-3` | **`12`** | **`12`** | `4` source shapes × `3` readings, and **every cell is a distinct observation** (the readings are different assertions on different objects) |
| `P-ML-IM-4` | **`12`** | **`6`** | the `10` readings of the `5`-call grid are readings of ONE call each (so they add no distinct drive), and the `2` further drives are distinct: **`5 + 1 = 6`**, because the second-call drive reads the SAME module-observable evidence as the first call's `(i)` reading |
| `P-ML-IM-5` | **`12`** | **`9`** | the `2` orderings of a shape read the SAME rule (`1` collapse per shape) and the `2` boundary drives are distinct: `5` shapes' first-ordering drives collapse with their second-ordering pair only for shapes with a run (so `3` collapse), leaving `5 + 2 + 2` = `9` distinct observations |
| `P-ML-IM-6` | **`12`** | **`6`** | the `2` sides are the two halves of ONE emission, so the distinct drive figure is the `6` carry shapes |
| `P-ML-IM-7` | **`12`** | **`12`** | `7` id shapes + `5` count drives, and **every one is a distinct drive with its own fresh recorder** |
| `P-ML-SM-1` | **`3`** | **`3`** | three distinct classes, each a distinct observation |
| `P-ML-SM-2` | **`3`** | **`3`** | three catalog shapes, each driven under both classes inside its own attempt — three distinct drives |
| `P-ML-SM-3` | **`3`** | **`3`** | three distinct repeated-call shapes |
| `P-ML-TP-1` | **`12`** | **`12` DRAWS** — and the DISTINCT-MEMBER count is a **REPORTED figure, never asserted** | **a DRAW IS NOT A SWEEP**: `12` draws over a `12`-member pool do **not** guarantee that every member is drawn, **and NO row may assert "all 12"** — **a DONE row claiming full pool coverage is a review finding** |
| `P-ML-TP-2` | **`9`** | **`8`** | shapes (c) and (i) are the same module-observable class (an absorbed throw), so `1` collapses |
| `P-ML-TP-3` | **`12`** | **`4`** | the `3` outcome classes are `3` distinct observations, and the `9` string/non-string shapes within them collapse into their class + the `1` absent case's own reading = **`4`** |

**The DECLARED figures are what the `≤100`/row and `≤400` caps are compared against. The distinct figures are
REPORTED BESIDE them and are NEVER substituted for them** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, sub-rule
2; `§5.3` item 11).

**⟶ THE DISTINCT SUM, PINNED BECAUSE THE RED SET COMPUTED IT TWO WAYS (`2026-09-27`, the Implementer's stop,
defect `D`; annotate-never-rewrite — the ledger table above is UNCHANGED and its thirteen entries stay exactly as
printed).** **THE TWO SUMS ARE BOTH HARNESS-SIDE ASSERTIONS AGAINST THE SAME ARRAY — `89` at one line and `83` at
the next — and this ledger prints NO TOTAL OF ITS OWN, so the figure below is derived from the thirteen `distinct`
cells listed above and is the ONLY admissible total for them.** **THE THIRTEEN DISTINCT FIGURES, PRINTED WITH
THEIR OWN TERMS: `7` (`P-ML-IM-1`) + `4` (`P-ML-IM-2`) + `12` (`P-ML-IM-3`) + `6` (`P-ML-IM-4`) + `9`
(`P-ML-IM-5`) + `6` (`P-ML-IM-6`) + `12` (`P-ML-IM-7`) + `3` (`P-ML-SM-1`) + `3` (`P-ML-SM-2`) + `3`
(`P-ML-SM-3`) + `12` (`P-ML-TP-1`) + `8` (`P-ML-TP-2`) + `4` (`P-ML-TP-3`) = `89`.** **`89` IS THE RIGHT FIGURE
AND `83` IS WRONG — it is nobody's sum: not the thirteen distinct terms (`89`), not the declared total (`126`), not
the distinct `SM + TP` subtotal (`3 + 3 + 3 + 12 + 8 + 4` = `35`) and not the `IM` declared subtotal (`84`).**
**WHAT THIS PIN DOES NOT MOVE, because the distinct ledger is a REPORTED figure and never a cap comparison: the
declared total stays `126` = the same thirteen declared terms, the chain, the subtotals `IM 84 · SM 9 · TP 33`, the
caps (`126 ≤ 400`, largest row `12 ≤ 100`) and the `6`-of-`13` `(bounded)` set.** **THE DISTINCT SUM IS A REPORTED FIGURE WITH NO
TERM OF ITS OWN — which is exactly why its mis-computation could not be caught by any cap check, and why it is
pinned here rather than left to the harness.** **A pass that quotes `83` is quoting a figure this ledger does not
produce; a pass that substitutes `89` for the DECLARED total in a cap comparison is committing the substitution
error `§5.3` item 11 names.** **NO ROW ID, TERM, CAP, SEED, STRATEGY ID OR `(bounded)` MARKING MOVES.**

**Item 4 — a DRAW is not a SWEEP, and the `P-ML-TP-1` pool is a SUBSET of the input space by construction.**
**The pool holds `12` members and the row draws `12` times**, so the row **reports** its distinct-member count and
**asserts nothing about coverage**. **The pool's silence about a shape it does not list is a stated boundary, not
an unrecorded omission**: **a lone-surrogate string, a `Symbol.toPrimitive` that throws only on its second
invocation, and a holder whose getter returns different answers on successive reads** are deliberately
**excluded** (the last two because they would make a draw ambiguous, strategy-discipline item 6(b); the first
because it belongs to a **class-name/`id`-shaped** hostile, and this module validates no such value —
`P-ML-IM-7`'s domain is the place a surrogate `id` could be driven, and **it is NOT driven there either** —
**recorded as a NAMED COVERAGE GAP at `§5.5.2` item 10**).

**⟶ `PBT-F3` — THE PINNED DRAW SEQUENCE'S UNDRAWN MEMBERS, STATED AS A BOUNDARY, AND ITS COUNT CORRECTED `4 → 3` (`2026-09-27`; annotate-never-rewrite — the gate-4 record's as-written sentence stays VISIBLE at `§3d` item (1), and **NO TERM, SEED, CAP, ROW ID OR STRATEGY ID MOVES**).** **THE PINNED SEQUENCE — `tests/menu-template.test.ts`'s `PINNED_DRAW_INDICES` — IS `[2, 1, 0, 3, 6, 9, 0, 11, 10, 5, 0, 11]`: `12` draws over the `12`-member pool, `9` DISTINCT indices, index `0` drawn THREE TIMES and index `11` twice.** **THE UNDRAWN POOL MEMBERS ARE THEREFORE **THREE**, AND THEY ARE NAMED: INDEX `4` — `(5) a revoked Proxy` · INDEX `7` — `(8) a self-referential record` · INDEX `8` — `(9) a Map`.** **`§3d`'s `PBT-F3` READING (*"NEVER DRAWS `4` of the pool's `12` members — `12n`, the throwing accessor, the self-referential shape and one more"*) IS `SUPERSEDED` ON ITS OWN ARITHMETIC: `(4) a 12n` is index `3` and `(7) a record whose accessor THROWS` is index `6`, and BOTH ARE DRAWN (draws `4` and `5`) — so the true undrawn set is the three above, and the derivation is one line: `new Set(PINNED_DRAW_INDICES).size === 9` and the complement in `0…11` is `{4, 7, 8}`.** **THE BOUNDARY, STATED SO NO PASS OVER-READS IT: the distinct-member count is `9` of `12` and is a REPORTED figure, NEVER asserted; a draw is not a sweep, and no row may claim pool coverage for this seed or any other.** **AND THE COINCIDENCE THAT MATTERS: one of the three undrawn members is the SELF-REFERENTIAL record — the same CLASS of shape the gate-4 pass measured THROWING (`§3d` item (1) `A-1`, whose measured case is `normalizeCatalog([[cycle]])`, an array containing itself) — so the pinned draws do NOT cover it and `A-1`'s regression row must drive it DIRECTLY rather than through a draw** (the boundary is named at `§5.5.2` item 6's pin below).

**Item 5 — the `S-ML-TOTAL-1` generator's ONE stated bias, recorded rather than hidden.** The pinned LCG's
reduction `index = stateₙ₊₁ mod 12` maps `2³² = 4294967296` states onto `12` residues, and
**`4294967296 mod 12 = 4`**, so **`4` pool indices are reachable from `⌈2³²/12⌉ = 357913942` preimages and the
remaining `8` from `357913941`** — **`4 · 357913942 + 8 · 357913941 = 4294967296`**, i.e. a **relative bias of
`1/357913941 ≈ 2.79 × 10⁻⁹` per draw**, inherited from the sibling registers' identical one-step form. **It is
stated so no later pass reads the draw as exactly uniform; it is not a defect of the row** (the register is a
**pinned-seed reproducibility** instrument, not a sampler), and **the form, the seed and the caps are the ones
the ACTIVE rules pin.**

**Item 6 — WHICH ROW CARRIES WHICH CLAIM, so no claim is quoted from a row that does not carry it.** **A DONE row
or audit that quotes the catalog's totality MUST cite `P-ML-IM-1`** *(or `P-ML-TP-1` for the drawn-universal
form, and it must say which)*; **the projector's purity and totality, `P-ML-IM-2`**; **the seven-key census and
the DROP rule, `P-ML-IM-3`** *(with `P-ML-IM-6` for the carry/absence halves)*; **the emitted template's shape,
`P-ML-IM-4`**; **the collapse and its ordering, `P-ML-IM-5`**; **the `id` domain's never-validated/never-minted
discipline and the seam's once-count, `P-ML-IM-7`**; **the three state classes of the emitted value,
`P-ML-SM-1`**; **the identity projection, `P-ML-SM-2`**; **cross-call constancy, `P-ML-SM-3`**; **the picker's
four declared degradations, `P-ML-TP-2`**; **the platform projection's three-outcome totality,
`P-ML-TP-3`.** **NO OTHER ROW MAY BE READ AS CARRYING ANY OF THEM.**

**⟶ `PBT-F4` AND `A-1`'s BOUNDARY — THE NESTED-HOSTILE / RECURSION HAZARD, NAMED HERE BECAUSE THIS ITEM'S CLAIM-MAP IS WHERE A MISSING BOUNDARY IS READ AS A COVERED ONE (`2026-09-27`; annotate-never-rewrite; **NO TERM, ROW ID, STRATEGY ID, SEED, CAP OR MARKING MOVES**).** **THE HAZARD THE GATE-4 PASS MEASURED (`§3d` item (1) `A-1`, HIGH, HOST): a HOSTILE MEMBER NESTED INSIDE A CARRYABLE ELEMENT is absorbed by NO clause of this register — `normalizeCatalog([{id:'k'}, revokedProxy()])` returned `[]` (the USABLE element dropped WITH the hostile one), `normalizeCatalog([[[revokedProxy()]]])` likewise, and `normalizeCatalog([[cycle]])` THREW `RangeError` from inside the recursion, OUTSIDE ANY ABSORBED SPAN.** **THE BOUNDARY, PINNED — and it ADDS no rule, it NAMES what `§2.3` item 1(b)/(d), item 11 clauses 3/4, `§3c` pins 1/2/3, `I-1` and `P-ML-TP-1` already require:** **(i) A NESTED HOSTILE MEMBER SKIPS THE MEMBER, NEVER THE CATALOG** — the surrounding CARRYABLE element is **STILL EMITTED**, every OTHER entry is **STILL EMITTED**, and the hostile member is **never propagated and never partially carried**; **(ii) the carried SLOT for a skipped nested member is a KEYLESS FRESH RECORD of that member (`Object.keys` reads `[]`) — the KEY stays, because the source owns it, and its value is NEVER the hostile reference** (the landed harness's `A-1` row reads exactly this; the alternative — dropping the source's own key — is NOT taken); **(iii) A CYCLIC STRUCTURE MUST NOT THROW OUT OF ANY ENTRY POINT** — a self-referential record is **already a declared totality input** (`P-ML-TP-1`'s pool member `(8)`), so a cycle is a DECLARED-VALUE input and any escaping `RangeError` is a HOST DEFECT, not a declared degradation; **(iv) THE REGRESSION ROW IS OWED — RED-FIRST AND TESTWRITER-OWNED** (`P-ML-TP-4` class per `§3d`'s round-3 action 2), **and it must drive the cycle DIRECTLY, because the pinned draw sequence NEVER DRAWS pool member `(8)`** (`§5.5.2`'s `PBT-F3` pin above) — **the Implementer's remedy is then the per-member absorption `§3d` names, and it is HOST-SIDE ONLY: no package defect arises and `docs/defects.md`/`docs/HANDOFF.md` receive NOTHING** (`§7` item 10). **THE SITE NOTE, recorded so no later pass hunts a phantom clause: `§3d`'s `A-1` disposition cites *"`§5.5.2` item 6(c)'s subset rule"* — the subset rule it means is `§5.5.1`'s strategy-discipline item 6(c), and the boundary is NAMED HERE, at `§5.5.2` item 6, as that disposition requires.**

**Item 7 — THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING.** **The rule: a pool or table member that
CONTRADICTS its own row's declared boundary is a REGISTER DEFECT, and it is checked at AUTHORING TIME, not at
green time — the member must satisfy the row's boundary text, or the row must declare that member as an intended
class with its OWN expected outcome asserted, PER MEMBER.** **The check was run over all `13` rows, and the
RESULT is CLEAN for all thirteen, with NO member requiring a boundary narrowing and NO row whose table had to be
re-scoped.** **The per-row results, each against its OWN boundary text:**

| Row | Its declared boundary | The check's result |
| --- | --- | --- |
| `P-ML-IM-1` | *no shape gate; one declared answer per shape; nothing throws* | **CLEAN** — every one of the `12` shapes has its own declared value and its own expected carried length, **including the revoked-`Proxy` shape `(10)` and the trap-throwing shape `(11)`, which are declared as SKIPPED with a zero throw**; the *"EVERY catalog shape"* wording is the `(bounded)` marking's scope |
| `P-ML-IM-2` | *the declared shape for every catalog × option pair; the caller's data untouched* | **CLEAN** — each of the `12` drives has its own declared pair, and the mutation assertion is a READ of the caller's own objects (never a write by the module) |
| `P-ML-IM-3` | *exactly the declared seven-name key list, no eighth* | **CLEAN** — a closed named list; shape `(3)`'s `extra`/`another` are **DECLARED AS FAILING** for a copying module, which is what a negative control is |
| `P-ML-IM-4` | *two top-level members, two platform members, booleans, no getter* | **CLEAN** — a closed two-name list under one order, and the third-member control is **DECLARED AS FAILING** |
| `P-ML-IM-5` | *maximal runs of `'picker'`-kind entries collapse; order preserved; singleton not collapsed* | **CLEAN** — every run shape has its own declared parent, submenu length and member order; **the singleton and the split-run boundary drives are DECLARED, which is exactly the `§7a.1` item 3 derivation being driven rather than assumed** |
| `P-ML-IM-6` | *owned carried by identity; unowned absent; extras dropped* | **CLEAN** — the two sides are the two halves of one emission, and each shape's declared key COUNT is stated |
| `P-ML-IM-7` | *one strict-identity comparison; no validation, no minting; the count asserted exactly* | **CLEAN** — each `id` shape has its own declared outcome, **including the `NaN` cell (declared as NEVER matched) and the reference-equality cell**; no cell requires the module to validate |
| `P-ML-SM-1` | *exactly three classes, each a function of `platform` alone* | **CLEAN** — three drives, three declared member pairs, **and the ABSENCE of the other classes' signatures is itself an assertion** |
| `P-ML-SM-2` | *the identity projection for both non-collapsing classes* | **CLEAN** — a fixed `2` × `3` grid whose every cell has its own declared identity list |
| `P-ML-SM-3` | *equal values across repeated calls; the count rising exactly* | **CLEAN** — three shapes with their own declared equality and their own declared fifth-call count |
| `P-ML-TP-1` | *no entry point throws; the declared return shapes hold* | **CLEAN** — **the pool's members are totality inputs only**: the row claims no code boundary, **the three entry points and their expected shapes are NAMED in the row's own words**, and the shapes that make a `catalog` hostile are all in the pool while a successive-read-inconsistent holder is deliberately NOT |
| `P-ML-TP-2` | *a declared member for every seam/answer shape, never a throw* | **CLEAN** — all four degradation classes of `§2.4` item 1 are driven, **and the "emitted disabled, never dropped" clause is a NAMED assertion rather than a prose claim** |
| `P-ML-TP-3` | *exactly three outcomes over every platform shape* | **CLEAN** — every shape has its own declared pair, **including the case and whitespace variants (declared as NOT `'darwin'`) and the absent case**; the `recognized` non-string arm is labelled as the `§0A` note 4 derivation |

**A register row found to contradict its own boundary at green time is a SPEC FINDING, reported rather than tuned
to green** — and **the LANDED tables must be re-checked by the adversarial pass**, because this check was run
against **this filing's tables**, not against the executed ones.

**Item 8 — THE EXECUTED LAYER IS NOT THIS FILING'S, stated once.** **This pass RAN NOTHING.** Every cell above is
**execution DESIGN**; the **measured** figures are the ones this unit's own `tests/menu-template.test.ts` and the
independent blind run produce. **A read-only PBT audit may not report a row as executed on the strength of this
table alone** — the audit reads **the TestWriter's tables in `tests/menu-template.test.ts`** **and** this cell's
arithmetic.

**Item 9 — A DECLARED-FAILING CONTROL ATTEMPT IS A COUNTED DRIVE AND IS NEVER A `broken` ROW.**
**(1) A CONTROL DRIVE IS A DRIVE**: it is counted in its row's `attemptsRun` **and it is already INSIDE the
row's declared TERM** — `P-ML-IM-3`'s `12` includes its eighth-key negative drive, `P-ML-IM-5`'s `12` includes
its boundary drives, `P-ML-SM-1`'s `3` includes the two non-collapsing classes — **because `A DECLARED REGISTER
TERM IS A DRIVE COUNT`. (2) A CONTROL'S DECLARED FAILURE IS AN OBSERVATION, NEVER A BREAK**: the drive CONTAINS
the declared-failing shape and ASSERTS it, so the attempt **HOLDS** and the row's `broken` count stays `0`.
**(3) THE RECORD REPORTS THE CONTROLS BESIDE THE TERM**: a per-row `controls` figure, printed beside
`held`/`broken`, **NEVER counted in the term**. **(4) THE STATUS ROW'S OWN IDENTITY IS PRESERVED**:
**`held + broken === attemptsRun` still holds for every row**, and **`broken === 0` remains the green
criterion.**

**Item 10 — THE EXECUTED LAYER'S ONE NAMED COVERAGE GAP, ADDED SO THE HONESTY SURFACE IS COMPLETE.** **`P-ML-IM-7`'s
`id`-shape domain drives `7` shapes and does NOT drive a LONE-SURROGATE `id` (`'\uD800'`), which is a `string`
under the `id` domain's declared extent (`§2.3` item 8: ANY JavaScript value), and `P-ML-TP-1`'s pool likewise
excludes it.** **IT IS NOT A SILENT ABSENCE — it is a RECORDED OBLIGATION with a named owner: a TestWriter pass
that ADDS the shape as a further drive of `P-ML-IM-7`, which moves that row's declared term `12 → 13`, the
declared total `126 → 127` ***(as filed this read `123 → 124`; the declared total was corrected `123 → 126` by
the dated amendment of `CURRENT STATE` item 3 and `§5.5.3`, and the re-grain's own arithmetic moves with it — the
as-filed pair stays visible)***, the chain's last step and the `IM` subtotal `84 → 85` ***(as filed this read
`87 → 88`: `87` was the mis-sum — the seven `IM` terms are `12 + 12 + 12 + 12 + 12 + 12 + 12` = `84` — so the
re-grain's own arithmetic is `84 → 85`)***, and owes a register re-grain
under `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.** **THE HONEST READING OF THIS BLOCK, stated so no reader
over-reads it: the `13` rows are `13` OUTCOMES of an enumeration exercise, and THIS ONE IS INCOMPLETE BY ONE
NAMED SHAPE — a DONE row that reports the register as complete while this item stands is a review finding.**

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**`126` = `12` + `12` + `12` + `12` + `12` + `12` + `12` + `3` + `3` + `3` + `12` + `9` + `12`**

**THE DECLARED CHAIN, CORRECTED — the thirteen terms summed as a chain of twelve steps: `12` → `24` → `36` →
`48` → `60` → `72` → `84` → `96` → `99` → `102` → `105` → `117` → `126`.** ***(As filed this read `` `12` → `24` →
`36` → `48` → `60` → `72` → `84` → `87` → `90` → `93` → `105` → `114` → `123` `` — a chain UNREACHABLE from the
corrected terms, and unreachable from its own corrected predecessor at its seventh step (`84` → should be `96`).
The as-filed chain is kept VISIBLE below, `SUPERSEDED`, and its divergence is named: the printed `+3` at the
seventh step is the mis-sum's signature, and every later figure (`90`, `93`, `105`, `114`, `123`) inherits the `-3`
offset. NO TERM MOVES — the chain is the same thirteen terms summed.)***

**⟶ A SECOND CANDIDATE CHAIN, RECEIVED WITH THE SAME DEFECT REPORT AND ALSO NOT REACHABLE FROM THE TERMS
(`2026-09-27`; recorded rather than adopted, so the next author does not re-derive it).** **The repair brief carried
a chain `12` → `24` → `36` → `48` → `60` → `72` → `84` → `87` → `90` → `93` → `105` → `114` → `126` — i.e. the
as-filed chain with ONLY its last step changed to `126`. IT IS ALSO A MIS-SUM, and by the SAME signature: it keeps
the as-filed seventh-through-twelfth steps (`84 → 87 → 90 → 93 → 105 → 114`), which consume the seven terms as
`12,12,12,12,12,12,3` — only SIX `12`s and a `3` — and then add `12` at the end. The thirteen terms are seven `12`s
FIRST, then `3`, `3`, `3`, `12`, `9`, `12`, so the step sequence is `… 72 → 84 → 96 → 99 → 102 → 105 → 117 → 126`,
and no step of `84 → 87` exists in it. THE ADOPTED CHAIN IS THE ONE PRINTED ABOVE; THE SECOND CANDIDATE IS
`SUPERSEDED` BY ARITHMETIC AND KEPT VISIBLE HERE for exactly the reason `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`
gives: a chain that is not derivable from its own terms is the defect class this repair exists to close, and a
CORRECTED-TOTAL amendment that keeps the old intermediate steps would close one mis-sum and leave a second one in
its place. **NO TERM, ROW ID, STRATEGY ID, SEED OR CAP IS AFFECTED BY THIS PARAGRAPH.**

**THE DECLARED SUBTOTALS: `IM 84` · `SM 9` · `TP 33` = `126`.** ***(As filed the `IM` subtotal read `87` and the
sum read `123`; those two figures are `SUPERSEDED` and are kept visible in the as-filed block below. `SM 9` and
`TP 33` are unchanged, because the mis-sum was entirely inside the `IM` family's chain.)***

**⟶ THE ARITHMETIC DEFECT AND ITS DATED REPAIR (`2026-09-27`, from the red run's filed defect report:
`tests/menu-template.test.ts` ran `56` rows, `46` failed / `10` passed against a module that does not exist, and
its `PRE-2` / `REGISTER-STATUS` rows report this as a SPEC FINDING rather than reconcile it — annotate-never-rewrite,
and the as-filed figures below stay VISIBLE).** **WHAT WAS FILED, QUOTED SO IT IS NOT LOST: `§5.5.3` printed
`` `123` = `12` + `12` + `12` + `12` + `12` + `12` + `12` + `3` + `3` + `3` + `12` + `9` + `12` `` · the chain
`` `12` → `24` → `36` → `48` → `60` → `72` → `84` → `87` → `90` → `93` → `105` → `114` → `123` `` · and the
subtotals `` `IM 87` · `SM 9` · `TP 33` = `123` `` — **and ALL THREE CARRIED THE SAME MIS-SUM: the thirteen printed
terms sum to `126` (`12 · 7` = `84`, `+ 3 · 3` = `9`, `+ 12 + 9 + 12` = `33`), so the `IM` subtotal is `84` and
NOT the printed `87`, and the as-filed chain's last step (`114 → 123`) is **UNREACHABLE FROM ITS OWN TERMS**: the
THIRTEEN-term chain's own twelve steps reach `126`, and the as-filed chain's SEVENTH step is the first one to
diverge (`72 → 84 → 87` should read `72 → 84 → 96`).** **THE MIS-SUM IS THE CAUSE, NAMED AS SUCH: the as-filed
`IM` cell added `3` where the seventh `IM` term adds `12` — a single `+3`-instead-of-`+12` slip at the seventh
step — and every downstream figure (`87`, `90`, `93`, `105`, `114`, `123`) inherited it.** **THE CORRECTED TOTAL
IS `126`, and it is `§5.5.3`'s figures THIS amendment corrects — the only number this repair moves is the declared
total with its chain and its subtotals**; **the as-filed `123`, its terms line and its subtotal line remain
VISIBLE below under dated annotations rather than being rewritten** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`:
a mis-sum is corrected by annotating beside the as-filed form, never by silently rewriting it). **THE TERM VERDICT
IS RE-PRINTED HERE AGAINST THE CORRECTED FIGURE: the thirteen terms are `12`×7 (`IM-1`…`IM-7`) `+` `3`×3
(`SM-1`…`SM-3`) `+` `12` (`TP-1`) `+` `9` (`TP-2`) `+` `12` (`TP-3`) = `126` — the total IS the sum of its own
terms, the per-row terms and strategy ids are UNCHANGED by this repair, and the caps are RE-CHECKED below.**
*(The as-filed caps line read `` `123 ≤ 400` (total headroom `277`) `` — with the corrected total the headroom is
`274`; the as-filed form stays visible below.)* **(The as-filed `§5.5.2` item 10 re-grain arithmetic `123 → 124` /
`87 → 88` is likewise annotated to `126 → 127` / `84 → 85` at its own site.)**

**THE AS-FILED TOTAL, KEPT VISIBLE UNDER THE REPAIR (`SUPERSEDED` by the dated block above):

> **`123` = `12` + `12` + `12` + `12` + `12` + `12` + `12` + `3` + `3` + `3` + `12` + `9` + `12`**

> **THE AS-FILED CHAIN: `12` → `24` → `36` → `48` → `60` → `72` → `84` → `87` → `90` → `93` → `105` →
> `114` → `123`.**

> **THE AS-FILED SUBTOTALS: `IM 87` · `SM 9` · `TP 33` = `123`.** **(`87` and the `123` it feeds are the
> mis-sum; the terms above sum to `126`.)**

**CAPS RE-CHECKED AGAINST THE CORRECTED TOTAL: `126 ≤ 400` (total headroom `274`), largest row `12 ≤ 100`
(headroom `88`)** — **both caps HOLD, and neither is close.**
*(As filed this line read: `123 ≤ 400` (total headroom `277`), largest row `12 ≤ 100` (headroom `88`) — the
as-filed figure is kept visible and is `SUPERSEDED` by the corrected `126` / `274`; the per-row headroom `88` and
the largest-term reading are unchanged, because no term moved.)* **THE
`(bounded)` SET: `6` of the `13` rows — `P-ML-IM-1` · `P-ML-IM-4` · `P-ML-IM-5` · `P-ML-TP-1` · `P-ML-TP-2` ·
`P-ML-TP-3`.** **THE `12`-TERM TIE, named so the "largest row" claim is checkable rather than asserted: NINE
rows carry the maximum term `12` — `P-ML-IM-1` · `P-ML-IM-2` · `P-ML-IM-3` · `P-ML-IM-4` · `P-ML-IM-5` ·
`P-ML-IM-6` · `P-ML-IM-7` · `P-ML-TP-1` · `P-ML-TP-3` — and the other four rows carry `3`, `3`, `3` and `9`.**

| The term | Its row | The enumeration that produces it |
| --- | --- | --- |
| **`12`** | `P-ML-IM-1` | the `12`-shape catalog/entry pool, one drive each |
| **`12`** | `P-ML-IM-2` | the same `12`-shape pool, one drive each (the second option shape's read is an assertion inside the attempt) |
| **`12`** | `P-ML-IM-3` | `4` source key-set shapes × `3` census readings |
| **`12`** | `P-ML-IM-4` | `5` call shapes × `2` readings = `10` **+ `2` further drives** (a second call in the same drive, and the THIRD-top-level-member control) = `12` |
| **`12`** | `P-ML-IM-5` | `5` run shapes × `2` orderings (`10`) **+ `2` boundary drives** (the all-picker catalog and the skip-bridged run) = `12` |
| **`12`** | `P-ML-IM-6` | `6` carry shapes × `2` sides |
| **`12`** | `P-ML-IM-7` | `7` `id`/answer shapes + `5` count drives |
| **`3`** | `P-ML-SM-1` | `3` state classes of the emitted value |
| **`3`** | `P-ML-SM-2` | `3` catalog shapes (each driven under both non-collapsing classes inside its own attempt) |
| **`3`** | `P-ML-SM-3` | `3` repeated-call shapes, each driven five times (the repetitions are ASSERTIONS inside one attempt) |
| **`12`** | `P-ML-TP-1` | `12` pinned-seed draws × `1` three-entry-point sweep each (the `3` entry-point calls are ASSERTIONS inside the attempt) |
| **`9`** | `P-ML-TP-2` | the `9` declared seam/answer shapes, one drive each |
| **`12`** | `P-ML-TP-3` | the `12` platform shapes, one drive each |

**THE TERM-BY-TERM ADDITION, so the total is checkable rather than asserted** *(the order is `§5.5.1`'s row
order)***:** **`12` + `12` = `24`** · **`+ 12` = `36`** · **`+ 12` = `48`** · **`+ 12` = `60`** · **`+ 12` = `72`**
· **`+ 12` = `84`** · **`+ 12` = `96`** · **`+ 3` = `99`** · **`+ 3` = `102`** · **`+ 3` = `105`** · **`+ 12` =
`117`** · **`+ 9` = `126`.** **⟶ `2026-09-27`, A DATED CORRECTION OF A PRINTED STEP — and the declared total stays
`126`.** **THE ADDITION IS NOW THE COMPLETE ONE, with no step past the terms: the `12` additions run BETWEEN the
`13` declared terms (`12`×7 + `3`×3 + `12` + `9` + `12` = `126`), so the chain of cumulative figures is `12` →
`24` → `36` → `48` → `60` → `72` → `84` → `96` → `99` → `102` → `105` → `117` → `126` — TWELVE steps, the first
term being the chain's own first figure.** **WHAT THIS LINE CARRIED FOR ONE EDIT OF THIS PASS, recorded because it
is the very defect class this repair closes: a trailing `` `+ 12` = `138` `` step — i.e. the twelfth term's `+ 12`
applied TWICE, the shape of a FOURTEENTH-term defect. It was caught on re-reading, deleted here, and the
authority for the total is `§5.5.1`'s per-row term table plus this subsection's thirteen-term head line, both of
which read `126`.** **NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR `(bounded)` MARKING MOVES WITH THIS NOTE, and a
DONE row's arithmetic is the thirteen-term sum `126`.** **THE AS-FILED ADDITION, kept VISIBLE under the repair
(`SUPERSEDED`) — and the mis-sum is visible IN IT:** **`12` + `12` = `24`** · **`+ 12` = `36`** · **`+ 12` =
`48`** · **`+ 12` = `60`** · **`+ 12` = `72`** · **`+ 12` = `84`** · **`+ 3` = `87`** · **`+ 3` = `90`** ·
**`+ 3` = `93`** · **`+ 12` = `105`** · **`+ 9` = `114`** · **`+ 12` = `123`** *(**the as-filed addition carried
THIRTEEN terms and TWELVE steps, and its seventh step took `+3` where the seventh term is `12` — which is
the single slip every downstream figure inherited: the as-filed seventh step read `84 → 87` where the same step
of the corrected addition reads `84 → 96`, and every later figure (`90`, `93`, `105`, `114`, `123`) follows the
same `-3` offset. The corrected addition above carries the SAME `13` terms and the SAME `12` steps, with its
seventh step `+ 12`.)***

**THE ROW/TERM RECONCILIATION, printed so it is checkable:** **the `13` ROWS and their terms are `IM-1` (`12`) ·
`IM-2` (`12`) · `IM-3` (`12`) · `IM-4` (`12`) · `IM-5` (`12`) · `IM-6` (`12`) · `IM-7` (`12`) · `SM-1` (`3`) ·
`SM-2` (`3`) · `SM-3` (`3`) · `TP-1` (`12`) · `TP-2` (`9`) · `TP-3` (`12`)** — **`13` rows (seven `IM` + three
`SM` + three `TP`), `13` TERMS (one per row, with NO row carrying a second term), and the total is `126`
*(as filed this read `123`; corrected by the dated amendment above — the as-filed figure stays visible there).*

**THE FAMILY SUBTOTALS, stated consistently with that addition:** **`IM` = `12 + 12 + 12 + 12 + 12 + 12 + 12` =
`84`** · **`SM` = `3 + 3 + 3` = `9`** · **`TP` = `12 + 9 + 12` = `33`** — and **`84 + 9 + 33 = 126` = the
declared total.** **THE CAPS, re-checked against it:** **`126 <= 400` total** (headroom `274`), and **the largest
per-row term is `12`** (the `9`-WAY TIE, named at the two halves above: the nine `12`-term rows against the
four that carry `3`/`3`/`3`/`9`), **inside `<= 100` per row** (headroom `88`) — **so both
caps hold.** ***(As filed this block read `` `IM` = … = `87` `` and `` `87 + 9 + 33 = 123` ``, with total
headroom `277`; the `87` was the mis-sum and is `SUPERSEDED` — the seven `IM` terms sum to `84`, and `84 + 9 +
33 = 126`. The `SM` and `TP` subtotals were and are `9` and `33`; NO term, tie or per-row headroom moves.)***

**THE PINNED SEED AND ITS FORM: `20260927`**, one hand-rolled 32-bit LCG step per draw
(`stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`), `index = stateₙ₊₁ mod pool.length` with
**`pool.length = 12`**, for the register's **ONE** generator row (`P-ML-TP-1`, `S-ML-TOTAL-1`).

**NO NEW DEPENDENCY, NO SIXTH LEG, NO `package.json` CHANGE:** the register rides `npm test` (leg 1) unchanged,
and **an un-run register row is reported as a FAILURE, never as a pass** (`§4.2`'s stop rule).

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.**

1. **THE NORMALIZER HALF.** *If a pure, total, stateless `normalizeCatalog(catalog)` cannot return a declared
   `readonly CatalogEntry[]` for every input in its enumerated domain — holding the carry rule, the own-key
   discipline, the absent-member rule, the skip rule and the absence of any throw — then the normalizer half is
   not realisable **the way the charter's *"the untrusted-catalog normalizer is the contract's"* pins it**, and
   the unit fails on that half.* **The tests are `M-1`, `F-1`/`F-2`, `I-1`/`I-12`, `R-6`/`R-12`, and the
   register rows `P-ML-IM-1`/`P-ML-IM-6`/`P-ML-TP-1`.**
2. **THE PROJECTOR HALF.** *If a pure, total, stateless `buildMenuTemplate(catalog, options)` cannot return the
   declared five-member `MenuTemplate` for every input, **carrying exactly the seven declared own keys and
   dropping every other**, then the `G-2`/`Q1` pin is not realisable and the unit fails.* **The tests are
   `M-2`/`M-8`, `F-4`, `I-3`/`I-5`, `R-5`/`R-12`, and the register rows
   `P-ML-IM-2`/`P-ML-IM-3`/`P-ML-IM-4`/`P-ML-IM-6`.**
3. **THE COLLAPSE HALF.** *If the ONLY structural difference the mechanism can emit is not the `'darwin'`
   collapse — i.e. if a non-`'darwin'` or non-string platform changes the emitted `items` at all, or if a
   `'darwin'` catalog's runs do not collapse in catalog order — then `Q2`'s ruling is not realisable and the unit
   fails.* **The tests are `M-3`/`M-7`, `F-3`/`F-5`, `I-11`, `R-7`, and the register rows
   `P-ML-IM-5`/`P-ML-SM-1`/`P-ML-SM-2`/`P-ML-TP-3`.**
4. **THE SEAM HALF.** *If the ONE injected picker cannot be driven through all four declared degradations with a
   falsifiable row each — an absent/non-callable seam leaving the item EMITTED and DISABLED, a throwing seam
   absorbed inside the wrapper with a count of exactly `1`, and a non-`null` unknown-`id` answer yielding `null`
   — then ruling 5's seam contract is not satisfied and the unit fails.* **The tests are `M-4`/`M-5`/`M-6`,
   `F-6`/`F-7`, `I-2`, `R-10`, and the register rows `P-ML-IM-7`/`P-ML-TP-2`/`P-ML-SM-3`.**
5. **THE BOUNDARY HALF.** *If this unit cannot be stated without an import edge to any sibling, without a
   consumer-vocabulary literal in its bytes, without an OS read, and without a write — then the unit is not the
   mechanism `A-d4` adopted, and the unit fails.* **The tests are `R-1`/`R-2`/`R-3`/`R-4`/`R-7`/`R-8`/`R-11`/
   `R-13`, `F-8`/`F-9`, `I-6`/`I-7`/`I-9`/`I-10`, and the register rows `P-ML-IM-7`/`P-ML-SM-1`.**

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause is
found and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded **before**
implementation continues; **(c)** the unit is **declined back** — admissible only if a clause is shown to be
**inseparable from composing, rendering or detecting something** (which would refute `§2.4` item 5's
OS-boundary clause and require the architect's dated annotation, not a spec edit) or **insurmountable without
importing a sibling** (which would refute ruling 12's boundary), and **either would be a NEW GATE, not this
unit's call.**

**Stop conditions (`S-ML-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row whose
assertion cannot be falsified on `[T]`/`static` is NOT silently dropped and is NOT moved to a `[U]`/`[D]` leg** —
it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This filing has NO such
candidate**: **every claim in `§5.5.1` is a value, a count, a key-set name or a file-property claim over
arguments**, and **the one class that would have been `[U]`-shaped — the native menu, the rendered picker, the
dialog and any platform's acceptance of the emitted shape — is REFUSED at filing time and carries NO row at all**
(`§5.2`; `§2.4` item 5).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **one new spec
   file** and **nothing else**. The module, the test file, the red set, the legs, the register's executed layer
   and every gate after gate 1 are **OWED**; **the unit is NOT delegable until a TestWriter has RUN and REPORTED
   the red set** (`§4.5`).
2. **THE OS-FACING HALF IS REFUSED, NOT PARKED, AND THE REFUSAL IS THE HONEST FORM.** **No instrument on any
   layer this repo owns reads a platform's acceptance of a template value** (`§5.2`'s reader question: `NONE`).
   **No pass may claim this unit's green proves a native menu exists, that an item appears in one, that an
   accelerator fires, that a picker opens, that a dialog opens, that a `role`/`kind` value is platform-valid, or
   that the native menu and any in-renderer picker are equivalent.**
3. **`'darwin'` IS A VALUE, NOT AN OBSERVATION.** The collapse is a **shape rule over the caller's own data**;
   the module **detects nothing about an operating system** (`§3.4 R-7`), and **the platform string is the
   caller's own claim about its own environment** — **the honest reading of the whole OS-integration claim is
   *"for a caller that supplies `'darwin'`, the emitted shape differs in exactly one declared way."***
4. **THE ENTRY-POINT PATH QUESTION IS ANSWERED `NO`, and the answer is derived from this unit's own charter, not
   copied from a sibling** (`§2.5` item 5): the mechanism is imported by no `src/**` file and has **no rendered
   surface and no in-app instantiation site.** **`[U]` is not offered and `[D]` is not claimed** (`§5.2`), and
   **gate 6 is `STRUCTURAL` with its reason stated.**
5. **THE MODULE IS A MECHANISM, NOT A UI ELEMENT — AND THAT IS THE RECONCILIATION THE `A-d4` RESHAPE OWES.**
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test is satisfied because the module **authors no text, no control, no
   affordance, no class taxonomy, no slot content and no styling**, and **`UI-RENDERED-WITH-PROVIDENT` has no
   element of this unit's to apply to** — **the picker is INJECTED, and this repo renders neither the native menu
   nor the picker.** **The reading under which this reconciliation FAILS is named: if a later pass makes the unit
   COMPOSE a menu or RENDER the picker, the unit becomes a UI element under `S-d8` `(C)#2`, owes renderer wiring
   and a MANDATORY live battery it cannot carry, and needs the architect — not a spec edit** (`§5.1`'s
   falsifier).
6. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case coverage
   matrix, no demo-page index and no page-design contract to update**. **`R-9` is the PROBE that keeps that
   claim falsifiable**, and **if that file comes to exist, this unit owes the coverage row and the demo-page
   entry** — with the honest note that a mechanism that renders nothing can only contribute an **absence** row.
7. **THE `docs/FORKER.md` CARRY IS OWED AND NON-GATING, and it is a REAL fork-facing obligation rather than a
   formality.** **`U-MENULIB` adds adopted NAMES a fork must implement** — the three functions, the six types,
   the emitted member list and **the ONE optional `picker` seam** — and **its `§2.4` seam table is the contract
   they implement.** **Re-measured this filing pass: `docs/FORKER.md` carries a `U-MENULIB` unit-digest row (its
   `U-MENULIB` line, reading `BLOCKED`) and NO seam block for this unit**; **`docs/pending.md` `§L-4b` is
   `OPEN` for the SIBLING `U-RELOCATE`'s seven seams and `§L-4e` for `U-CONTAINER`'s two edges**, and **`§K`'s
   `K-9` (the `H-8` request: *a glossary in the fork-facing doc for every adopted name a fork must implement*)
   is a REQUEST, not a landed ruling** — **`§K`'s vocabulary is therefore NOT used anywhere in this file as
   though it were in force.** **OWNER: whatever pass next touches `docs/FORKER.md`; it gates no unit.**
8. **NO `electron` IS IMPORTED AND NO MENU SURFACE IS SHIPPED, SO THE FAMILY'S *"no CSS/no UI shipped"* FORM HAS
   A DIFFERENT CLAUSE HERE: NOTHING OF THIS UNIT IS LOADED BY ANYTHING.** **`src/shared/dom-shim.ts` gains no
   member** (`SHIM-COMPLETION-CARVE-OUT`; `R-3`), **no bundle gains the module** (`§5.2` leg 3), and **the
   module's only artifact is a value a caller reads.**
9. **THE REGISTER'S MARKINGS ARE EXECUTION DESIGN, NOT RESULTS.** This pass **ran nothing**. **The total is
   `126`, the sum of the register's THIRTEEN printed terms** — ***(as filed this read `123`, which is NOT the sum
   of those terms; the declared total was corrected `123 → 126` by the dated amendment of `CURRENT STATE` item 3
   and `§5.5.3`, where the as-filed `123`, its terms line, its chain and its subtotals stay VISIBLE under
   annotations — annotate-never-rewrite. The as-filed caps parenthetical of this item is corrected with it: at the
   corrected total the headroom is `274`, not `277`.)*** — and **both caps hold** (`126 ≤ 400`; largest row
   `12 ≤ 100`). **A row marked executable here that is broken when the red runs is a SPEC FINDING, reported
   rather than tuned to green.**
10. **NO ROW OF THIS UNIT CLAIMS AN ENGINE BEHAVIOUR, A PACKAGE CAPABILITY OR A `bodyRuns`/`BARE-TEXT-EMIT`
    SURFACE.** This module **imports no engine surface at all** (`§2.1` item 3) and **exercises `provident-ssr`
    nowhere** — so **no `docs/defects.md` / `docs/HANDOFF.md` entry can arise from this unit**, and **none may be
    written for it.**
11. **THE TRACKER ITEMS THIS FILING BELIEVES ARE OWED — listed, and NOT edited here** (`§5.1`'s allow-list
    admits tracker rows only for the pass that produces them, and this pass is a filing): **(a)**
    `docs/next-steps.md`'s row **`E7`**: its **spec cell** (`OWED — not filed` → FILED) and its status;
    **(b)** the same row's **MISSING `Blocked on` cell** (the gate-1 record's `P-2`, re-measured this pass: the
    row carries `7` cells against its siblings' `8`, and the chain sits in the cell a reader would read as
    `Blocked on`) — **and its STALE status chain** (`P-3`: it reads `BLOCKED` while its own dependency
    `U-GSESSION` is `DONE` and the queue block says `E7` is **free**); **(c)** the same row's **`Legs` cell** —
    it reads `node suite` against this spec's **five** declared legs; **(d)** `docs/pending.md`'s **`SCH-5`
    row** — it still reads `BLOCKED — awaiting architect go-ahead` and `OWED — not filed`; **(e)** a **new
    owed row for the `docs/FORKER.md` carry** of `§7` item 7 (owner: whatever pass next touches that file, and
    it gates no unit); **(f)** `docs/decisions.md`'s **`Q1`/`Q2`** — **RECORDED AS WORKING DEFAULTS at
    `§7a.1`, not as rulings**; **the spec gate may promote either by dated annotation, and a pass must NOT
    present either as an architect's ruling** (the `E5-B-3` form). **All six are listed as owed and are NOT
    edited here.**
   **⟶ CLOSE-OUT ANNOTATION (`2026-09-27`, gate 8; annotate-never-rewrite — the six residues above stay VISIBLE as the FILING pass's dated reading, and the live state is this note. NO clause of this filing's text is rewritten and no row id, term, strategy id, seed or cap moves.)** **(a) `docs/next-steps.md`'s `E7` row: DISCHARGED — its spec cell reads FILED + APPROVED, the row now reads `E7 — MOVED TO DONE (2026-09-27)`, its `Blocked on` cell is PRESENT (the gate-1 record's `P-2` is closed), its chain is re-read as the family's FIVE legs (its `Legs` cell, `P-3` closed), and the gate-10 record is the `## DONE — U-MENULIB` section.** **(b) `docs/pending.md`'s `SCH-5` row: DISCHARGED — annotated in the same pass (its `BLOCKED — awaiting architect go-ahead` and `OWED — not filed` clauses are SPENT provenance); `§L-4f` is `CLOSED` with its carried-forward items named.** **(c) the `Legs` cell: DISCHARGED as the family's five legs** (`npm test` `[T]` · `npm run typecheck` `[H]`, `src/**` only · `npm run build` `[H]` · `npm run typecheck:tests` `[H]` · the standalone strict `tsc` over this unit's test file). **(d) `docs/decisions.md`'s `Q1`/`Q2`: UNCHANGED AND STILL WORKING DEFAULTS — neither is promoted to a ruling, neither is presented as an architect's sentence, and the `E5-B-3` form holds (the spec gate left both ARCHITECT-REVERSIBLE).** **(e) the NEW `docs/FORKER.md` carry row: RAISED AND RE-PARKED WITH AN OWNER — `docs/FORKER.md`'s `U-MENULIB` row now reads `DONE` (this pass) and its SEAM BLOCK + ADOPTED-NAME GLOSSARY remain `OWED` in its own words; owner: whatever pass next touches that file; it gates no unit.** **(f) the tracker-residue discharge is recorded in the DONE row's clause (9).** **NOTHING OWED BY THIS ITEM SURVIVES AS A BARE `OWED` EXCEPT THE FORK-FACING BLOCK AND THE THREE RE-GRAINS (`docs/FORKER.md`; the blind set's targeted re-drive; `§5.5.2` item 10's lone-surrogate gap) — each with a named owner, and each carried as OWED in the DONE row.**
12. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/menulib.md` — and edited NO existing file.** It
    ran **no test, no suite, no leg, no trio, no `tsc` invocation and no git command**; it wrote **no code**; and
    it touched **no `src/**`, no `tests/**`, no sibling spec, no tracker, no `package.json`, no `scripts/**`, no
    config and no adjacent repo.** **The tracker cells it leaves stale are the SUPERVISOR's to reconcile**
    (`§7` item 11; `§8`). **Its only MEASUREMENTS are the ten-token collision table's hit counts (`§2.2`(E)) and
    the existence probes of `§3.5`/`§5.5.2` item 10 — each a read-tool search, attributed at its own site, and
    NONE of them a run of any leg.**

**⟶ REPAIR ADDENDUM (`2026-09-27`) — THE RED RUN's PROVENANCE, THE RE-GRAIN OBLIGATION, AND THE THREE RECORDED
METHOD READINGS.** **This addendum is INSIDE `§7` on purpose: it adds no section number, moves no row id, moves no
strategy id, seed, term or cap, and edits no `§3` cell's claim.** **Its cross-references are `CURRENT STATE` item 3
(the dated status amendment), `§3.4`'s exemption pins under `R-1`/`R-2`, `§5.5.1`'s dated method-note block,
`§5.5.2` items 2/10 and `§5.5.3`'s dated arithmetic repair.**

**(A) THE RED RUN'S PROVENANCE — IT RAN, AND IT IS FILED.** **`tests/menu-template.test.ts` was authored, RUN and
REPORTED: `56` rows, `46` FAILED / `10` PASSED, against a module that DOES NOT EXIST** (`src/shared/menu-template.ts`
is still absent, so the expected module-resolution red is the bulk of the failing set, with the existence/static rows
that need no module making up the rest). **THE RED SET ASSERTED THE AS-FILED `123` *AND* THE MEASURED `126`, as two
literals side by side** — **its `PRE-2` and `REGISTER-STATUS` rows carry both figures plus the SPEC FINDING that
they disagree (`DECLARED_TOTAL = 123`, `AS_FILED_TERM_SUM = 126`, `AS_FILED_IM_SUBTOTAL = 84`), asserting the
mismatch rather than reconciling it** — **so those rows are RED BY DESIGN and STAY RED until this amendment lands,
and they are the reason the arithmetic defect is REPORTED here instead of a TestWriter having silently picked a
figure** (`§4.2` item 7; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; annotate-never-rewrite). **The red reported
its stop state and its un-run rows as FAILURES rather than as passes** (`§4.2`'s stop rule — the register stops
after `5` consecutive failures at a named row, and the rows that never start record themselves as failures) —
**which is what this contract asked for, and it is recorded here as SATISFIED at the red gate.** **A run of `46`
of `56` failing is NOT a defect of the run: a red against an absent module is the EXPECTED shape.**

**(B) THE RE-GRAIN OBLIGATION THE CORRECTION OWES — SAID PLAINLY: THE RED SET OWES A RE-GRAIN TO THE CORRECTED
TOTAL.** **The as-filed total was `123`; the corrected declared total is `126`** (`CURRENT STATE` item 3,
`§5.5.3`) — **so `tests/menu-template.test.ts`'s `DECLARED_TOTAL = 123`, the `§5.5.1` describe title, and every row
or message that asserts the as-filed figure (`PRE-2`, `REGISTER-STATUS`) are now GRAINED TO A SUPERSEDED FIGURE and
MUST BE RE-GRAINED to `126` before this unit's green may be read as green.** **THE RE-GRAIN'S OWN ARITHMETIC, so it
is not re-derived: `DECLARED_TOTAL` `123 → 126` · the printed `IM` subtotal `87 → 84` (the measured constant
`AS_FILED_IM_SUBTOTAL = 84` already reads the true subtotal — the re-grain moves the PRINTED figure, not the
measured one) · the chain's last step `123 → 126` · the total `126` against the `≤400` cap with headroom `274` ·
**the thirteen per-row terms, the nine-way `12`-term tie and the six `(bounded)` markings are UNCHANGED.** **NO
TERM MOVES IN THIS RE-GRAIN and no row id, strategy id or seed moves: it is a FIGURE re-grain, not a register
re-scope.** **`§5.5.2` item 10's OWN re-grain remains a SEPARATE, STILL-OWED obligation** — a row that ADDS a
shape moves a term `12 → 13`, the total `126 → 127` and the `IM` subtotal `84 → 85`, with its own named owner —
**and neither re-grain may be substituted for the other.** **A green reported against the `123` grain is a REVIEW
FINDING**, and so is a re-grain that DELETES the as-filed figures from the test file instead of carrying the
corrected ones beside them (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; annotate-never-rewrite).

**(C) THE THREE METHOD READINGS THE RED RUN RECORDED — contract business, so a later author does not re-discover
them** (the register-side statement of all three, with their landing sites, is `§5.5.1`'s dated method-note block,
item (iv)): **(1) A SKIPPED ELEMENT BREAKS A COLLAPSE RUN** — a `null`/`undefined` entry, or any element the
normalizer skips, is not part of the run and does not bridge it; the red drove that boundary as **TWO SINGLETONS**
(`items.length === 2`, no `submenu` on either, `collapsing === true`), which is `§2.3` item 5 rule 3's own clause and
**`P-ML-IM-5`'s declared boundary drive** — a CLARIFICATION, no new row, no term moved. **(2) AN ENTRY WHOSE OWN
ACCESSOR (own-key read) THROWS IS SKIPPED, NOT CARRIED WITH A MISSING KEY** — **no entry is emitted for it**, and
the return is **not** an entry carrying the remaining six keys with the throwing one absent; that is `§2.3` item
1(d)'s reading, driven at `P-ML-IM-1` shapes `(11)`/`(12)`, so **an implementation that carries such an element as
a partial entry FAILS `P-ML-IM-1`** (it does not fail `F-2`/`I-1`'s totality half, because nothing throws either
way). **(3) THE `12`-SHAPE CATALOG POOL'S `12`TH MEMBER IS A STATED BOUNDARY WITH NO DRIVING ROW — NAMED AS
SUCH** — the `Map` / `Symbol.toPrimitive` / successive-read-holder family belongs to **`P-ML-TP-1`'s hostile pool**
(and `§5.5.2` item 4's deliberately EXCLUDED list), **the row that WOULD drive the successive-read holder is
`P-ML-TP-1` and it does NOT drive it**, **the `Symbol.toPrimitive`-on-second-invocation shape has NO row in this
register at all**, and **the lone-surrogate string's home is `§5.5.2` item 10's recorded coverage gap, with its own
named re-grain cost** — **so all three are STATED BOUNDARIES, none is an unrecorded omission, and adding the holder
member owes a NEW dated amendment plus a register re-grain that THIS repair may not make.** **NO METHOD NOTE ABOVE
CHANGES A ROW, A TERM, A CAP, A SEED OR A `(bounded)` MARKING.**

**(D) THE SECOND GATE-3 EVENT, AND THE RE-GRAIN IT OWES (`2026-09-27`) — THE FIRST IMPLEMENTER PASS STOPPED AND
WROTE NO BYTE OF THE MODULE, REPORTING SEVEN ROWS UNREACHABLE BY ANY CONFORMANT MODULE.** **Provenance:
`docs/next-steps.md`'s `## ⟶ HANDOVER — E7 (U-MENULIB) AT GATE 3, MID-CYCLE`, cited BY NAME; its `§B` carries the
seven row-bound defects and its `§A` item 4 files the red set. The FOUR that are CONTRACT-side are pinned by THESE
DATED AMENDMENTS: `X-5`'s scope (`§3.5`), `M-4` versus `M-7` (`§2.4` item 6 with `§2.3` item 5's sub-rule and
`§3.1 M-7`'s corrected leg), the carry rule behind `F-2`'s two pairs and `P-ML-IM-1` attempt 12 (`§2.3` item 11),
and `PRE-2`'s distinct sum (`§5.5.2` item 3). The THREE that remain TEST-side are named at `§0A` note 8 item (3):
the `normalizeView`-based controls that strip comments and collapse literals before scanning, `R-2`'s test-file half
whose own bytes carry the banned word (its contract-side scope gap was already closed by `§3.4`'s dated exemption
pins), and the red-count drift (`45`/`11` at the handover against `46`/`10` at `§5.5.3`).** **THE RE-GRAIN THIS
OWES IS `§0A` note 8 item (4)'s five parts, and its extent is bounded ON THE CONTRACT SIDE: THE TERM VERDICT IS
`NO TERM MOVED` — the declared total remains `126` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 + 12 + 9 + 12`,
with the same chain, the same subtotals `IM 84 · SM 9 · TP 33`, the same seed `20260927`, the same caps and the
same `6`-of-`13` `(bounded)` set — so THE OWED RE-GRAIN IS A ROW/EXPECTATION RE-GRAIN AT THE TESTWRITER'S HAND and
NOT the `§7`(B) total re-grain, which is landed.** **`§5.5.2` item 10's lone-surrogate re-grain (`12 → 13`,
`126 → 127`, `IM 84 → 85`) REMAINS A SEPARATE, STILL-OWED OBLIGATION, and none of the three re-grains may be
substituted for another.** **This pass RAN NOTHING: no suite, no leg, no `tsc`, no build and no commit.**

**(E) THE THIRD GATE-3 EVENT — THE SEVEN ROW-BOUND CONTRADICTIONS OF THE SECOND IMPLEMENTER PASS, EACH DISPOSITIONED
ROW-SIDE (`2026-09-27`; annotate-never-rewrite — the as-written cells of this file stay VISIBLE, no clause is
rewritten, no row id, section number, strategy id, seed, term or cap moves, and NOTHING IS ADDED AFTER `§3b`).**
**Provenance: the second Implementer pass of `U-MENULIB` — `src/shared/menu-template.ts`, `221` lines, `ab9bfed` —
reaching `35` passed / `21` failed of `56`, which reported SEVEN ROW-BOUND CONTRADICTIONS.** **The TestWriter is
aligning those rows in parallel to the contract's ALREADY-PINNED readings** — **the CARRY RULE at `§2.3` item 11**
(a FRESH RECORD of the INTERSECTION of the seven declared names with the source's **own** keys, values by identity,
**no entry ever the source value**, absent keys OMITTED, non-objects SKIPPED) · **the `enabled` reading where the
DEGRADATION GOVERNS** (`§2.4`'s dated `enabled` pin) · **the `'darwin'` collapse by MAXIMAL RUN** (`§2.3` item 5
rules 4/5) · and **`selectCatalogItem`'s KNOWN-`id` rule** (`§2.3` item 8). **THIS NOTE RE-DERIVES NOTHING: it says
which ROW was wrong and why, so a later author does not re-discover the same seven. NO DEFECT HERE IS CONTRACT-SIDE —
all seven are ROW-SIDE, and a clause of this note changes NO pinned reading; it only ATTRIBUTES the seven defects to
the rows that carry them.**

**(E-1) THE SEVEN DISPOSITIONS — ONE PER ROW GROUP, EACH WITH THE CLAUSE THAT DECIDES IT.**

| # | The row(s) | What the row asserted | THE CLAUSE THAT DECIDES IT | THE DISPOSITION |
| --- | --- | --- | --- | --- |
| 1 | **`R-13`** | **that the test file was the ONLY EXISTING own artifact of this unit — while its OWN MESSAGE named the module's presence as the `X-1` branch** | **an existence row whose two halves read the same repo state two ways is SELF-REFUTING** (`§3.5`'s existence rows; `R-9`'s branch form) | **ROW-SIDE.** The corrected form is **a BRANCH, not a flat assertion**: **the module's PRESENCE proves the contract LANDED** (the `X-1` arm), so both arms are stated and the row cannot assert a state its own message contradicts. |
| 2 | **`F-2`** | **the loop compared the EXPECTED ARRAY'S key set against the PROJECTED ITEM'S, while a LATER assertion in the same row required the projected member to BE that array (`toBe`)** | **THE CARRY RULE — `§2.3` item 11: a projected item is a FRESH RECORD of the intersection, values by identity, and NO ENTRY IS EVER THE SOURCE VALUE** | **ROW-SIDE SELF-CONTRADICTION.** Under the carry rule the nested member is **a fresh record of the nested source** and **`toBe` on the source is FALSE** — so the key-set comparison and the identity assertion cannot both stand, and the identity assertion is the losing one. |
| 3 | **`F-5` / `M-7`** | **that `submenu` is ABSENT from a singleton picker entry** | **THE CARRY RULE — `§2.3` item 11: a declared key the source OWNS is carried VERBATIM, present members included; and `§2.3` item 5 rule 4 creates NO `submenu` for a singleton** | **ROW-SIDE.** The fixtures' sources **DO carry `submenu`**, so the carry rule carries it; the claim these rows MAY make is exactly **that the MECHANISM AUTHORS NO NEW SUBMENU** — never that a source-carried one is absent. |
| 4 | **`F-10` / `I-2`** | **`F-10`: RETENTION BY IDENTITY across calls. `I-2`: that `selectCatalogItem` returns the picker's RAW ANSWER** | **`F-10`: the FRESH-RECORD rule (`§2.3` item 11) together with `P-ML-IM-4`'s SECOND-CALL drive, which DECLARES A RETAINED VALUE A FAILURE. `I-2`: `selectCatalogItem`'s KNOWN-`id` rule (`§2.3` item 8), under which a non-`null` answer for an UNKNOWN `id` yields `null`** | **BOTH ROW-SIDE.** `F-10` demands what the second-call drive declares a failure; `I-2` demands the RAW answer where the pinned answer is the KNOWN-`id` one. **The pinned readings already say what each row must assert** — no contract clause moves. |
| 5 | **`M-4`** | **THREE items for the collapsed drive** | **THE COLLAPSE BY MAXIMAL RUN — `§2.3` item 5 rules 4/5 with `§7a.1` item 3's derivation and `P-ML-IM-5`** | **ROW-SIDE.** The pinned maximal-run collapse yields **TWO** items, not three; **the call's OTHER readings stay INTACT** — the collapsed PARENT and `enabled === false` under the `§2.4` `enabled` pin. |
| 6 | **`M-8`** | **that ONE item BOTH carried all SEVEN keys AND did not carry `role`** | **THE CARRY RULE — `§2.3` item 11: it carries exactly the source's OWN-ENUMERABLE members, so a `Symbol` key, a NON-ENUMERABLE member and an INHERITED member are NOT carried** | **ROW-SIDE SELF-CONTRADICTION.** `role` **IS one of the seven**, so "all seven carried" and "`role` not carried" cannot both hold; the row's own fixture (`catalogD[1]`'s INHERITED `role`) is what makes inheritance — not `role` itself — the not-carried case. |
| 7 | **`F-6`** | **that its own `'dialog'` literal tested against `toBe(false)`** | **the row's own expectation is UNSATISFIABLE FOR ANY MODULE whatever its bytes** (the `§3.4 R-1`/`R-2` scan's CONTROL form: a spelled token can only be evidence when the corpus is character-code assembled) | **ROW-SIDE.** The corpus must be **CHARACTER-CODE ASSEMBLED and carry BOTH CONTROLS** (the positive spelling FAILING, the assembled one PASSING) — otherwise the row fails every possible implementation and reports a defect the module cannot have. |

**(E-2) THE REGISTER'S RED-TIME `REGISTER-STATUS` ROW — THE `rowsExecuted === 13` ASSERTION CANNOT HOLD, SO IT
BECOMES A DECLARED BRANCH.** **As written, the row asserts `rowsExecuted === 13` against a register that STOPS EARLY:
the red run executed `56` rows against `126` declared attempts and STOPPED AT `P-ML-IM-5`** (`§4.2`'s stop rule; red
provenance at (A) above), **so an unconditional `=== 13` is unsatisfiable at RED TIME for a reason the row's own run
declares.** **THE ROW THEREFORE HAS TWO FORMS, BOTH DECLARED, AND NEITHER IS A RELAXATION OF THE OTHER:**
**(i) THE RED FORM TOLERATES THE STOP — the stop state is read as the DECLARED outcome, with the UN-RUN ROWS REPORTED
AS FAILURES, never as passes** (`§4.2`; `AGENTS.md` item 11(b)); **(ii) THE GREEN FORM REQUIRES ALL THIRTEEN ROWS
EXECUTED, `attemptsExecuted === 126`, `broken 0` and `registerStoppedAt: null`.** **A green read off the RED form is
a REVIEW FINDING**, and **the `126` in the green form is the corrected declared total of `§5.5.3`, printed with its
thirteen terms** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **NO ROW ID, NO TERM, NO CAP AND NO SEED MOVES BY
THIS BRANCH.**

**(E-3) THE STANDING TERM VERDICT — PRINTED, BECAUSE `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` REQUIRES IT.**
**THE DECLARED TOTAL REMAINS `126` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 + 12 + 9 + 12` — THE THIRTEEN
TERMS, unchanged, with the same chain, the same subtotals `IM 84 · SM 9 · TP 33`, the same `6`-of-`13` `(bounded)`
set, the same seed `20260927` and the same caps (`126 ≤ 400`; largest row `12 ≤ 100`).** **NO TERM, ROW ID, STRATEGY
ID, SEED OR CAP MOVED, OR IS MOVED BY, ANY DISPOSITION OF THIS NOTE.** **NO CLAUSE OF THIS NOTE CHANGES A PINNED
READING — it only ATTRIBUTES THE SEVEN DEFECTS TO THE ROWS**, and **`§5.5.2` item 10's lone-surrogate re-grain
(`12 → 13`, `126 → 127`, `IM 84 → 85`) remains a SEPARATE, STILL-OWED obligation that neither (E-2) nor this verdict
discharges.** **THIS PASS RAN NOTHING: no suite, no leg, no `tsc`, no build and no commit.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **Three items** could not be derived **falsifiably** from the
gate-1 record with a single reading, because **two admissible readings both satisfy its words and the choice
changes either a PUBLIC SYMBOL/SHAPE or a CONSUMER-VISIBLE BEHAVIOUR.** **All three are OPEN with a WORKING
DEFAULT** (this filing's choice, implemented in `§2` and marked as such), with a RECOMMENDATION and the CLAUSE
each one BLOCKS. **No item is left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or
diff-scope clause is weakened, widened or re-scoped by this report.** **Two of the three are `Q1`/`Q2`, which
the gate-1 record adjudicated FILEABLE and NOT filing-blockers; the third is this filing's own derivation.** **A
later pass that changes any of these defaults MUST OPEN A GATE**, and **none of them may be presented as an
architect's ruling** (the `E5-B-3` form, `docs/decisions.md`).

### 7a.1 THE OPEN ITEMS — three working defaults, none of them a blocker

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **`Q1` — THE RENAMED SYMBOL AND THE CARRIED KEY SET** | **The record's step 3 RESOLVES the rename and the key set, but the record itself records the pair as an ARCHITECT QUESTION with options (`Q1`, its `§4.3`)** — so **a row asserting the pin outright would be asserting a choice the record itself flags as the architect's**, and the two readings differ in a **PUBLIC SYMBOL and a FORK-VISIBLE KEY SET** | **THE DEFAULT (implemented): the renamed symbol is `buildMenuTemplate`; the emitted item carries EXACTLY the seven own keys `id`·`label`·`accelerator`·`role`·`kind`·`submenu`·`enabled`, IN DECLARED ORDER, with any other own key DROPPED, never copied; all members typed `unknown`; and the emitted template's two records are `{items, platform}` / `{recognized, collapsing}`** (`§0A` notes 2/5, `§2.1` item 2, `§2.3` item 2, `§5.5.1 P-ML-IM-3`/`P-ML-IM-6`) | **Do you CONFIRM `buildMenuTemplate` with the seven-key carried set and the drop rule — or do you take the reversible alternatives `(B)` (a NARROWER carried set) or `(C)` (an allow-listed pass-through of named extras)?** | **CONFIRM `(A)` (recommended)** — it is the least surprising for a fork's real catalogs and the narrowest thing consistent with *"consumer data carried verbatim"*; the record's own recommendation is `(A)` | **Nothing is blocked on the RECOMMENDED reading. THE REVERSAL IS NAMED AND BOUNDED: it moves `§2.1`'s block, `§2.2` `P-ML-9`, `§2.3` item 2, the `§2.2`(D) semantics table's two type rows, `§3.4 R-12`, and the register rows `P-ML-IM-3`/`P-ML-IM-6` — and under `(B)`/`(C)` those two rows' declared DOMAINS change, so a **register re-grain** (new terms printed with their total) is owed. **NO section number and NO export NAME moves under any of the three.** |
| **2** | **`Q2` — THE PLATFORM RULING, THE COLLAPSE'S TRIGGER, AND THE NON-STRING ARM** | **The record's step 3 RESOLVES the ruling (exactly `'darwin'`; identity otherwise; unrecognised ⇒ `recognized:false`, no collapse) but records it as an ARCHITECT QUESTION with options (`Q2`)**, and **its own sentence GROUPS *"unrecognised/non-string/absent"* without saying whether a NON-STRING value is `recognized:false` or a fourth outcome** — **`§0A` note 4's derivation** | **THE DEFAULT (implemented): the collapse is triggered by EXACTLY the literal `'darwin'`; every other string is the IDENTITY projection with `collapsing:false`; every non-string and the absent case is the IDENTITY projection with `recognized:false` and `collapsing:false` — NEVER a silent `'darwin'` default. `collapsing` is a function of `platform` ALONE (`§2.3` item 10)** (`§0A` notes 3/4, `§2.3` item 4, `§5.5.1 P-ML-SM-1`/`P-ML-SM-2`/`P-ML-TP-3`) | **Do you CONFIRM exactly `'darwin'` with the three-outcome pool — or take the reversible alternatives `(B)` (a caller-supplied collapse token instead of a literal) or `(C)` (no collapse at all in v1)? AND: is a NON-STRING `platform` `recognized:false` (the default) or `recognized:true` (`§0A` note 4)?** | **CONFIRM `(A)` AND the `recognized:false` non-string arm (recommended)** — `(A)` is the OS-integration claim `SCH-5` was adopted for, and `(B)`/`(C)` are **additive later moves on a pure function**; the `recognized:false` arm is the reading under which the pool has exactly three members | **Nothing is blocked on the RECOMMENDED readings. THE REVERSALS ARE NAMED: `(B)`/`(C)` move `§2.2` and the register rows `P-ML-IM-5`/`P-ML-SM-1`/`P-ML-SM-2`/`P-ML-TP-3` (and under `(C)` the collapse's ordering row loses its domain, owing a re-grain); the `recognized` sub-clause moves `P-ML-TP-3`'s `recognized` cell and ONE expectation string in `§2.2`(D)'s `recognized` row — **and NO other row, NO term and NO export.** |
| **3** | **THE COLLAPSE RUN BOUNDARY — the SINGLETON and the NON-ADJACENT RUN** — **THIS FILING'S OWN DERIVATION, not a record question** | **The record pins *"adjacent `'picker'`-kind items collapsing into one entry whose `submenu` carries the rest in catalog order"* but NOT what "adjacent" excludes**: **a run of ONE** and **two runs separated by a non-picker entry** are both **unstated**, and **the two readings differ in the emitted `items` length for a real catalog** — so a TestWriter cannot derive the expectation from the record alone | **THE DEFAULT (implemented, DERIVED): a MAXIMAL RUN of TWO OR MORE qualifies; a run of exactly ONE is NOT collapsed and gains NO `submenu`; two runs separated by any non-`'picker'` entry are TWO runs; the run is measured on the NORMALIZED sequence; the parent keeps its own seven members; the submenu carries the rest IN CATALOG ORDER; and the collapse is NOT recursive** (`§2.3` item 5 rules 1–7, `§3.2 F-5`, `§5.5.1 P-ML-IM-5`) | **Do you CONFIRM the derivation — a singleton picker item is NOT collapsed, and runs are measured on CONTIGUOUS normalized runs — or does a singleton collapse too (wrapping its own `submenu` in a one-member array), or does the collapse gather non-adjacent picker items into one run regardless of intervening entries?** | **CONFIRM the derivation (recommended)** — it is the only reading under which ***"the `submenu` carries the rest in CATALOG ORDER"*** survives literally (a non-contiguous gather would either re-order or duplicate the intervening items), and a singleton collapse would create a one-member array whose existence no consumer can explain | **Nothing is blocked on the RECOMMENDED reading. THE REVERSAL IS NAMED AND BOUNDED: making a singleton collapse moves `§2.3` item 5 rule 4, `§3.2 F-5`'s expectation, `§5.5.1 P-ML-IM-5`'s singleton drive (its cell's expectation, NOT its term of `12`) and `§3.1 M-7`'s `items.length` reading — **NO row id, NO term and NO export moves**, so no re-grain is owed. The `listhost.md`/`container.md`/`relocate.md` sibling form for a derived-open clause is a `§7a.1` row exactly like this one.** |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `3` OPEN with a working default
and a recommendation (`1`, `2`, `3`) · `0` items ruled-and-awaiting-confirmation · `3` clause groups blocked by an
OPEN item (`1`, `2`, `3`) · `0` items left as a silent gap.** **Every item's default IS implemented in this
spec's text**, so **the red set may be authored against the defaults** — but **each default is a DEFAULT, marked
as one, and a later pass that changes one must open a gate.** **`Q3` IS NOT AN ITEM HERE: it owes no architect
answer, and it is discharged by `§2.4` item 5's presence** (the gate-1 record's `P-5`: *"it must not be re-typed
as an architect question in the next pass, which would manufacture a blocker out of a template row"*).

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with another
owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS UNIT** = closed
elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited **by
SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited by ROW ID**
(`E7`, `E6`, `E5`), **never by line**. **`docs/decisions.md`'s row anchors drift** (rows are appended), so its
rows are cited **by NAME**. **The one exception is `§2.2`(C) row 10's `package-lock.json` reading, which is a FILE
census rather than a line anchor.**

| Source | Status for `U-MENULIB` | Where |
| --- | --- | --- |
| **`docs/specs/menulib-review.md`** — the CLOSED gate-1 record: the four step verdicts, the 15 + 25 findings, step 3's derivation and step 4's conditions `G-1`…`G-10` | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** Its conditions are **derived** at `§0`/`§0A`, its filing checklist is landed item by item (`§2`..`§5`), and **the record is NEVER edited by this unit** (`§5.1`'s DENIED set item 11) | `§0`, `§0A`, `§2`..`§5`, `§5.1`, and this row |
| **`SCH-5` `MENU-CATALOG-CONTRACT`, as ADOPTED-RESHAPED by `A-d4`** (`docs/pending.md`'s `SCH-5` row; the amended gate record's `§2.2` row, its `U4` unit row and its per-unit equivalence limits) | **ADOPTED as this unit's upstream** — *"the builder imports neither `electron` nor `fs`; `buildMenuFromCatalog` is RENAMED; the untrusted-catalog normalizer is the contract's; no policy defaults; the picker is injected, not owned; import semantics stay fork-side"*, and **the equivalence limit: *"the native menu and the in-renderer picker are NOT equivalent"*.** **Its pre-`A-d4` disposition (`DECLINE + REFILE`, reason code `CONSUMER-VOCABULARY`) is `SUPERSEDED` and is READ AS PROVENANCE** | `§0` ruling 1, `§1` items 1/2/3/9, `§2.1`, `§2.2`(A), `§2.4` item 5, `§8` (this row) |
| **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the mechanism-vs-UI-element test, and the reason this unit needs no exception to the project-wide constraint | `§0` ruling 3, `§1` item 4, `§2.2` `P-ML-2`, `§3.3 I-7`, `§7` item 5 |
| **`UI-RENDERED-WITH-PROVIDENT`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the constraint that has NO element of this unit's to apply to**: the picker is the caller's, and this repo renders neither the native menu nor the picker | `§0` ruling 4, `§1` item 4, `§2.2` `P-ML-2`, `§7` item 5 |
| **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE) | **CARRIED**: this unit's ONE seam's signature, OPTIONAL status and DECLARED DEGRADATIONS are **normative contract text**, and **the seam type is EXPORTED (`PickerFn`) so a fork can import the shape it implements** | `§0` ruling 5, `§2.1` item 1, `§2.4`, `§8` (this row) |
| **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the rule that DERIVES this unit's DENIED set, and as the entry-point question this spec ANSWERS (`NO`)** | `§0` ruling 6, `§2.5` item 5, `§5.1` |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** + **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`13` typed ROWS carrying `13` TERMS in three families**, **`126` attempts** ***(as filed this cell read `123`; the declared total was corrected `123 → 126` by the dated amendment of `CURRENT STATE` item 3 / `§5.5.3`, the `123` being the mis-sum of the register's own thirteen terms)*** printed **with their thirteen terms and a term-by-term addition table**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no extra leg**, seed `20260927` for the one generator, caps `≤100`/row · `≤400` total · stop-after-5, **the four domains declared by name** and **the six `(bounded)` markings stated in their own cells** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED**: every declared term is a DRIVE count, assertions are printed BESIDE it (never inside), the total is printed as the sum of its own thirteen terms with a chain and three subtotals, and the declared-versus-distinct ledger is `§5.5.2` item 3 | `§5.5.1`, `§5.5.2` items 3/9, `§5.5.3`, `§5.3` item 11, `§7` item 9 |
| **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — prohibition 5 is a NON-GOAL row here, and the pinned MCP sets are asserted as SET claims against the names | `§0` ruling 10, `§0A` note 6, `§2.2` `P-ML-5`, `§3.3 I-10` |
| **`SHIM-COMPLETION-CARVE-OUT`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the shim gains no member, and `H-r5`'s list stays forbidden | `§0` ruling 11, `§2.2` `P-ML-6`, `§3.4 R-3`, `§7` item 8 |
| **`DOC-REVIEW-GATE`** / **`BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE) | **CARRIED as obligations this unit's DONE row must cite**: the per-unit documentation review and the blind-greens record are owed after the greens | `§0` ruling 12, `§5.1` rows 4/5, `§5.3` item 8 |
| **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** (`docs/decisions.md`, ACTIVE) and **`docs/specs/gsession.md` `§2.5`** | **NOT THIS UNIT'S SURFACE — cited for exactly one purpose: to state that this unit imports nothing from it and asserts no edge to it in either direction.** A later pass reading an edge here would be asserting a **FABRICATED EDGE** | `§0` ruling 14, `§2.1` item 3, `§2.4` item 4, `§3.3 I-9`, `§8` (this row) |
| **`docs/specs/gsession.md` `§1` item 8** — *"No menu catalog (`U-MENULIB`, `E7`)"* | **CARRIED AS THE SCOPE BOUNDARY OF THE OTHER UNIT** — it constrains `U-GSESSION`, not this unit; re-read in the collision table so no reader takes it as a ban on this unit's own vocabulary | `§2.2`(C) row 2, `§8` (this row) |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row may not be moved to the `ui` leg silently"* | **CARRIED VERBATIM in this unit's three-part `[U]` refusal** | `§5.2`, `§4.4 S-ML-11`, `§7` item 4 |
| **`docs/specs/user-flow-audit.md` `§2`** and its `§7.1` trigger predicate | **APPLIED, and the decision RECORDED**: **`DOES NOT TRIGGER`**, with the evidence that decided it and its falsifier | `§5.2` (the decision block), `§5.3` item 7 |
| **`docs/specs/gutter-ui.md` `§R.3`** — the seam-table form (name · signature · required? · what a fork supplies · declared degradation) | **CARRIED AS THE FORM** for this unit's one-seam table | `§2.4`, `§2.1` item 1 |
| **`docs/specs/gutter-ui.md` `§4.4 S-12`** — *"an OS-owned native dialog"* as a STRUCTURAL parking reason | **CITED AS THE ONE LANDED SITE THAT NAMES `dialog`**, and reconciled in the collision table so this unit's refusal of a dialog is not read as that rule | `§2.2`(C) row 7, `§8` (this row) |
| **`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `S-d8`/`H-r4`/`H-r5`/`H-r6`/`H-r8`/`H-r14`** | **CARRIED AS OBLIGATIONS**: `S-d8`'s six prohibitions (`§2.2`(A)), `H-r4`'s spec template (**including its naming of `menulib.md` as one of the six specs owing the `§0 Contract-prohibitions` block**), `H-r5`'s no-shim rule, `H-r6`'s dissolved-edge class, `H-r8`'s six-row table, `H-r14`'s prohibition-5 restatement | `§0`, `§2.2`, `§3.4`, `§5.2` |
| **`docs/specs/gutter.md` `§3.4 R-1`**, **`docs/specs/relocate.md` `§3.4 R-1`/`R-11`**, **`docs/specs/zones.md` `§3.4 R-1`**, **`docs/specs/census.md` `§3.4 R-1`/`R-3`**, **`docs/specs/gsession.md` `§3.4 R-1`**, **`docs/specs/projection.md` `R-17`** — the landed anti-evasion scan rows | **CARRIED AS THE FORM and RE-MEASURED**: **NONE of them names `catalog`, `picker`, `accelerator`, `role`, `item`, `platform` or `darwin`**, so this unit owes them **no reconciliation**; the **two** landed sites that DO bear on this unit are `docs/specs/gutter-ui.md` `§2.1` item 6`/`relocate.md` `R-11`'s `className`-bearing write lists (**which this unit never touches**) and `gsession.md`'s `§1` item 8 menu-catalog scope line (**another unit's boundary**) | `§2.2`(C)/(E), `§3.4 R-1` |
| **`docs/specs/listhost.md` `§5.5.1`**, **`docs/specs/projection.md` `§5.5.1`**, **`docs/specs/container.md` `§5.5.1`** and **`docs/specs/relocate.md` `§5.5.1`** — the register reference shapes | **CARRIED AS THE FORM** (typed rows, strategy ids, `(bounded)` markings, the declared-vs-distinct ledger, the printed terms) | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3` |
| **`docs/decisions.md`'s `E5-B-3` row** and **`docs/specs/container-review.md` `§9.5` `G-3`** | **CARRIED AS THE PRECEDENT FOR THIS FILING'S FORM**: a **`FILEABLE`** item is *"a RECORDED WORKING DEFAULT … it does NOT gate the filing"* | `§0` ruling 13, `§0A` note 7, `§7a.1` (all three items) |
| **`docs/next-steps.md`'s `## OPEN` row `E7`** | **CARRIED IN SUBSTANCE at filing: its missing `Blocked on` cell, its stale chain, its `Legs` cell and its spec cell were listed as owed (`§7` item 11).** **⟶ CLOSE-OUT (`2026-09-27`): `E7` IS `DONE` — the row reads `E7 — MOVED TO DONE (2026-09-27)` and its authoritative record is the `## DONE — U-MENULIB` section; the four residues are DISCHARGED (see `§7` item 11's close-out annotation), and the ledger is `16 DONE / 5 open` UNITS = `21` units.** | `§`CURRENT STATE item 7, `§4.5`, `§7` item 11, `§3f` (4) |
| **`docs/FORKER.md`** | **A NEW OWED ROW: this unit's one-seam block and its adopted-name glossary** (`§7` item 7), owner: whatever pass next touches that file; **gates no unit**. **Re-measured at filing: the file carried a `U-MENULIB` unit-digest row and NO seam block for this unit.** **⟶ CLOSE-OUT (`2026-09-27`): the unit-digest row now reads `DONE` (with its layer caveat), and THE SEAM BLOCK + ADOPTED-NAME GLOSSARY REMAIN `OWED` IN THAT FILE'S OWN WORDS — the carry is NOT delivered, and a `DONE` unit implies no fork-facing contract.** | `§7` item 7, `§7a.1`, `§8` (this row), `§3f` (4) |
| **`docs/next-steps.md`'s rows `E6`/`E5`/`E1`/`E2`/`E3`/`E4`/`D2`/`D3`/`D4`** (`U-GSESSION`, `U-CONTAINER`, `U-ZONES`, `U-CENSUS`, `U-GUTTER`, `U-RELOCATE`, `U-LISTHOST`, `U-SLOTHOST`, `U-PROJ`) | **NOT THIS UNIT, and NOT dependencies in either direction** — siblings; **`U-GSESSION` is `DONE`, which is why this unit is free**; **a later pass asserting an edge would be a FABRICATED EDGE** | `§3.3 I-9`, `§4.5`, `§5.1` item 4, `§8` (this row) |
| **`docs/next-steps.md`'s row `E8`** (`U-THEME`) | **NOT THIS UNIT, and it is BLOCKED ON this unit** — its spec is `OWED — not filed` and its own dependency cell names `U-MENULIB`; **this unit must not absorb any part of it** | `§1` item 7, `§4.5`, `§8` (this row) |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | `§1` item 7, `§3.4 R-9`, `§7` item 6 |
| **`docs/pending.md` `§K` (the RCA's requested harness modifications)** | **BACKGROUND ONLY.** Its own header reads *"REQUESTS, NOT LANDED RULINGS; the architect's to adopt, amend or decline"*. **Its vocabulary is NOT used anywhere in this file as though it were in force** — no `BLOCKED-ON-SEMANTICS` verdict, no adoption dossier and no new gate step. **`K-9`/`H-8` (a fork-facing glossary) is CITED as a REQUEST** | `§7` item 7, `§8` (this row) |
| **`docs/specs/menulib.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 3, `§7` items 11/12 |
| **`docs/specs/menulib-greens.md`** | **`OWED` at filing — the gate-5 blind-greens artifact; named in the diff scope so the pass that produces it has an allowed home.** **⟶ CLOSE-OUT (`2026-09-27`): IT EXISTS AND IS THE UNIT'S GATE-5 RECORD — `28` executed scenarios · `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE` · five findings (`F-1`…`F-5`), authored from the documentation ONLY and run at `ffdb978`.** **BOTH FAILs WERE FIXED AFTERWARDS (the function-skip and `§2.3` item 11's reading), and the set's own `POST-GREEN` clause therefore leaves a TARGETED RE-DRIVE `OWED` — recorded in the set by this pass's close-out annotation.** | `§5.1` row 4, `§5.3` item 8, `§3f` (2)/(3) |
| **`docs/next-steps.md`'s pickup `§6` DO-NOT list** | **NOT RE-OPENED.** The `A-d4` family adoption, `SCH-5`'s disposition and the per-unit equivalence limits are **cited and applied, never questioned** | `§0` rulings 1/2/14, `§0A` notes 2/3/7 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates **one
new spec file** and edits **no existing document** — **no tracker row is touched, no sibling spec is annotated,
and no citation is repointed.** **Row `E7`'s spec cell therefore still reads `OWED — not filed` until the
supervisor's reconciliation pass flips it** — recorded here so the staleness is **attributable rather than
silent**. **This pass ran no test, no leg and no trio, edited exactly ONE file, and made no commit** (`RCA-8`:
**the new file is untracked and must be committed by the supervisor**).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its vocabulary
and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A later pass
appends **inside `§3a`/`§3b`** or inside an existing section; **no section number moves, nothing is renumbered,
and the `§5.3 → §5.5` gap (no `§5.4`) stays exactly as recorded**, because **renaming is forbidden for citation
stability.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**⟶ THE PASS HAS SINCE RUN, AND ITS RECORD IS APPENDED AT `§3d` (`2026-09-27`, gates 4 + 5 — **this file's standing rule holds: the block is appended INSIDE the existing `§3`-family numbering, after `§3c`, so **no section number moves and nothing is renumbered**).** **THE ADVERSARIAL SEED PROBES `A-1`…`A-18` ARE DISCHARGED: FOUR HOST FINDINGS `A-1`…`A-4` (HIGH/MED/LOW/LOW) and FOUR CONTRACT-SIDE PBT-AUDIT ITEMS `PBT-F1`…`PBT-F4`, NONE YET FIXED, each dispositioned at `§3d`** — **`A-1` is the HIGH one** (a nested HOSTILE member is not absorbed — the usable element is DROPPED, or the recursion THROWS outside any absorbed span), **and the gate-11 PBT audit's verdict is `PACKAGE DEFECTS: NONE`.** **THE FIVE-LINE SUMMARY OF WHAT THAT PASS FOUND, so a reader of this seed table is not left with a false all-clear: `A-1` HIGH HOST (per-member absorption owed) · `A-2` MED (the enumerable-only own-read is pinned nowhere — `§2.3` item 2/9 then a row) · `A-3` LOW TEST-SIDE (`isIndexKey` accepts `'01'` — a row with a declared key set) · `A-4` LOW CONTRACT (the picker's answer is ignored by `buildMenuTemplate` — declare it at `§2.4` item 1, then an arm) · and gate 5's blind greens (`docs/specs/menu-template-greens.md`, `28` executed · `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE`, five findings) whose `F-1` (a FUNCTION-typed element is CARRIED, not SKIPPED) is the SECOND host-side defect.** **THE SEED TABLE'S OWN AS-FILED ROWS BELOW ARE KEPT VISIBLE AND UNCHANGED (annotate-never-rewrite): their `OWED` column status is the FILING-time status, and `§3d` is the live disposition record.**

**Status as filed: `OWED`. No adversarial pass has run for `U-MENULIB`** — **the unit has no green yet**, and
`RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding, and none
may be cited as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no `src/**`), it
**must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the per-row attempts, the
strategy ids, the `126` total against its thirteen terms ***(as filed this line read `123`; corrected by the dated
amendment of `CURRENT STATE` item 3 / `§5.5.3` — the audit reads the CORRECTED total `126`, and the as-filed `123`
stays visible at its own sites)***, the stop-after-5 rule, the pinned seed and its
one-step-per-draw form (`pool.length = 12`) — **and it must RE-RUN the pool-versus-boundary check against the
LANDED tables** (`§5.5.2` item 7). **Its findings are recorded in `§3b` and a HOST finding is fixed here with
regression rows — never in `docs/defects.md`, because a host finding is this repo's.** **A genuine
`provident-ssr` package defect would go to `docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER
patched** — **though this unit exercises no package surface at all, so no such finding can arise from it**
(`§7` item 10).

**The vocabularies the disposition table uses, defined so no status word is ever left undefined:**
**`CONFIRMED-FIXED`** = a host finding, fixed here and regression-tested as a new `§3` row ·
**`CONFIRMED-RULED`** = a behaviour examined and ruled correct, with the ruling recorded and its reason ·
**`CONTRACT-AMENDED`** = a seed that exposed a gap in this spec, amended with the old text kept visible as
`SUPERSEDED` · **`NOT-A-FINDING`** = raised, examined, recorded with the reason · **`OWED`** = raised and
**not yet resolved** (the pass may not report done with an `OWED` row) · **`OWED — TEST-SIDE`** = a finding whose
remedy is a row the TestWriter owns, with no `§5.5.1` statement, id, strategy id or attempt term changed for it ·
**`BLOCKING — SCOPE`** = a scope violation the unit may not land with · **`PARKED-with-revisit-condition`** =
recorded, not fixed, with the condition that reopens it and its owner. **The as-filed status of every seed below
is `OWED`, and `OWED` is defined here rather than left bare.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **THE SEVEN-KEY / DROP PROBE, exhaustively:** across every entry point and every drive, **is the emitted item's own key set EXACTLY the seven declared names — with an EIGHTH and NINTH key present on the SOURCE and ABSENT, BY NAME, from the emitted item?** **Is the absent-member rule honored (no `undefined` placeholder)?** **Does any path carry a prototype member, a `Symbol` key or a non-enumerable member?** | `[T]` + static |
| **`A-2`** | **THE COLLAPSE PROBE:** on `'darwin'`, **is every qualifying run collapsed into ONE parent whose `submenu` carries the REST IN CATALOG ORDER?** **Is a singleton left alone?** **Are two runs separated by an intervening item kept separate?** **Is the collapse ever applied recursively, or on a non-`'darwin'` platform?** | `[T]` |
| **`A-3`** | **THE PLATFORM PROBE:** for `'win32'`, `'linux'`, `''`, `'Darwin'`, `' darwin'`, `'darwin '`, `null`, `42`, an object and the absent case — **is the emitted `items` IDENTICAL to the identity projection, and is `collapsing` false in EVERY one of them?** **Is there ANY silent `'darwin'` default or ANY platform read (`process.platform`, `navigator`, `os`)?** | `[T]` + static |
| **`A-4`** | **THE NORMALIZER PROBE:** across the whole `12`-shape pool — **is the return `[]` for every non-array, one entry per USABLE element in order, a skip (never a throw) for every hostile element, and NO placeholder key ever materialized?** **Can any path throw?** | `[T]` |
| **`A-5`** | **THE SEAM PROBE:** for each of the four declared degradations — **is the `'picker'`-kind item EMITTED and DISABLED where the seam is absent/non-callable/throwing, is the count EXACTLY `1` on the throwing arm (never retried), is the throw ABSORBED inside the module's own wrapper, and does a non-`null` unknown-`id` answer yield `null`?** **Is any degradation a SILENT NO-OP — i.e. does any row only assert *"it did not throw"* where the contract requires the declared VALUE?** | `[T]` |
| **`A-6`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything at all — value, type-only, dynamic or `require`? **Is `src/shared/dom-shim.ts` untouched, are the sibling modules and test files untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-7`** | **THE VOCABULARY PROBE — and its own collision:** does the module's source (comments included, in the NORMALIZED view) carry an app menu item name, a `role`/accelerator literal, a consumer-vocabulary token, a store token or a realm token — **raw, token-assembled or in a comment**? **The collision to resolve explicitly: `R-1`'s control data MUST carry the spellings while the module must not, and this unit's contract vocabulary (`catalog`/`menu`/`template`/`picker`/`item`/`platform`/`role`/`kind`/`accelerator` and the two declared tokens) IS the module's own declared exemption list** — **is the scan's scope exactly `R-1`'s, and is the exemption list NAMED rather than implied?** | static |
| **`A-8`** | **THE RENAME PROBE (`G-1`):** does the module **export, alias, re-export or keep `buildMenuFromCatalog` anywhere** — including as a deprecated name or a comment-documented alias? **`G-1`'s discharge test is a grep, and this is the pass that runs it against the LANDED module.** | static |
| **`A-9`** | **THE `Q1`/`Q2` PROBE:** do the two questions remain marked as **working defaults with their reversible alternatives named** rather than silently hardened into contract without a ruling — and has the supervisor routed them? **A pass that treats a working default as ruled, or that presents one as an architect's sentence, is a review finding.** **AND: does `§7a.1` item 3's DERIVATION stay labelled as a derivation at every site it appears?** | static + the DONE row |
| **`A-10`** | **THE `id` DOMAIN PROBE:** does ANY code path validate, coerce, stringify, trim, hash, dedupe or MINT an `id`? **Is the only operation a strict-identity comparison?** **Does `NaN` match itself (it must NOT)?** | static + `[T]` |
| **`A-11`** | **THE OS-BOUNDARY PROBE:** does the module compose a `Menu`, call `setApplicationMenu`, register an accelerator, render a picker or open a dialog — **and does ANY pass read this unit's green as evidence about a native menu, a rendered picker or their equivalence?** **Does `§2.4` item 5's clause appear verbatim in substance, and does each of its six halves have a falsifier row?** | static + `[T]` + the DONE row |
| **`A-12`** | **THE FABRICATED-EDGE PROBE:** does any pass assert an import or composition edge between this unit and **any** sibling — including reading `docs/specs/gsession.md` `§2.5` as this unit's surface, or reading the collision table's homonyms (`template`, `platform`, `role`) as shared dependencies? | static |
| **`A-13`** | **THE `[U]`/`[D]` PROBE:** does any pass offer a `[U]` row for the native menu, the rendered picker or any platform's acceptance; claim a `[D]` row; move a rendered row to the `ui` leg (silently or not); report gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason stated**; or omit the `§7.1` `DOES NOT TRIGGER` decision? | the DONE row + `§3.4 R-7`/`R-9` |
| **`A-14`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the declared total `126` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 + 12 + 9 + 12`** ***(as filed this row read the declared total `123` against that same thirteen-term list — a total that is NOT the sum of its own terms; the declared total was corrected `123 → 126` by the dated amendment of `CURRENT STATE` item 3 / `§5.5.3`, and an audit comparing the tables against `123` is comparing them against a MIS-SUM: it must read `126`, with the as-filed `123` visible at its own sites)***? **In particular: is `P-ML-IM-3`'s EIGHTH-KEY NEGATIVE DRIVE present as a drive, and is `P-ML-IM-5`'s singleton boundary drive present?** Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form (`pool.length = 12`) what the test file actually contains? **AND: is every pool/table member still consistent with its row's declared boundary text** — `§5.5.2` item 7's check **re-run against the LANDED tables** rather than this filing's? **AND: does the audit read the `(bounded)` set correctly — `6` marked of `13` ROWS?** **Any mismatch is a SPEC FINDING.** | `[T]` + the test file |
| **`A-15`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **native-menu, accelerator, rendered-picker, dialog, OS-acceptance or equivalence** evidence from this unit's `[T]` green — and does it state explicitly that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app or any OS behaves differently**? | the DONE row |
| **`A-16`** | **THE FORK-FACING PROBE:** does any pass read this unit as delivering a working menu, an installed menu bar, an applied accelerator or a rendered picker — **or read the emitted template as a registered one**? **Does the fork-facing carry (`§7` item 7) name the three functions, the six types, the seven keys and the ONE optional seam?** | static + the DONE row |
| **`A-17`** | **THE HONESTY-BLOCK PROBE:** does `§5.5.2` name the register's ONE coverage gap (the lone-surrogate `id`) as an OBLIGATION rather than a silent absence, and does the DONE row carry it as `OWED` rather than covered? | static + the DONE row |
| **`A-18`** | **THE COLLISION-TABLE PROBE:** does any pass read `§2.2`(C)'s reconciliations as **RELAXING** a landed prohibition (particularly the `menu`-in-another-unit's-scope row and the `template` homonym row) — **or, conversely, redden this module for a spelling that has no ban site at all**? **The reconciliation is a derivation with DECLARED exemptions and both controls; a pass that reads it either way is a review finding.** | static |

**The seed set's own status: `18` seeds, ALL `OWED` at FILING.** **`A-14` is the gate-11 audit; `A-1`/`A-2`/`A-3`
are the three claims this unit's central artifact rests on (the key set, the collapse and the platform rule);
`A-4`/`A-5`/`A-10` are the totality and seam classes; `A-8`/`A-9` are `G-1`'s and `Q1`/`Q2`'s discharge probes;
`A-11`/`A-13`/`A-15`/`A-16` are the layer-honesty probes; `A-7`/`A-12`/`A-18` are the collision classes this
family has historically failed on.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended findings block
needs **no renumbering and no new section**. **A row added later must use one of the statuses defined at `§3a`, or
the pass must define its new token IN THIS TABLE with a one-line meaning** — **a bare `OWED` is the one status
that may not survive the pass** (`AGENTS.md` item 11(e)).

| Finding | Status | The finding, one line | Where the remedy lands |
| --- | --- | --- | --- |
| *(none yet — the pass has not run; the seed set is `§3a`, and every seed's as-filed status is `OWED`)* | — | — | — |

**⟶ THIS TABLE IS FILLED BY THE CLOSE-OUT PASS (`2026-09-27`, gate 8; annotate-never-rewrite — the as-filed placeholder row above stays VISIBLE, `§3a`'s `OWED` rows and `§3d`'s as-written *"NONE IS YET FIXED"* heading stay VISIBLE as their own passes' readings, and every status below uses the vocabulary this table fixed above or `§3a`'s own list; **NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR `(bounded)` MARKING MOVES — the declared total stays `126`**).** **THE STATUS WORDS ARE THE RECORD'S OWN (`§3d`/`§3e`), and the EVIDENCE column names where the closure is RECORDED — this pass ran no suite, so a *"fixed"* attribution is the supervisor's measured green at `6ec24aa` or the landed row it cites, never this pass's own test run.**

| Finding | Status | The finding, one line | Where the remedy lands |
| --- | --- | --- | --- |
| **`A-1`** (HIGH · HOST) — a nested/circular hostile member is not absorbed; the usable element was DROPPED, or the recursion THREW outside any absorbed span | **`CONFIRMED-FIXED`** (with its red-first regression row) **+ `CONTRACT-AMENDED`** (the boundary NAMED) | **ABSORPTION IS NOW PER MEMBER: a hostile member SKIPS THE MEMBER, NEVER THE CATALOG; the surrounding carryable element is still emitted and a cyclic structure never throws out of any entry point.** **The CYCLE-path bound is the landed mechanism's own (`the recursion is cycle-path bounded`), and the regression row drives the cycle DIRECTLY rather than through the `S-ML-TOTAL-1` draw** (whose pinned sequence never draws pool member `(8)`) | **the boundary: `§5.5.2` item 6's `PBT-F4`/`A-1` block** (nested hostile · cyclic) **+ `§3e` row 6d**; **the regression rows: `tests/menu-template.test.ts`'s `A-1` nested-hostile/cycle row**; **the supervisor's green at `6ec24aa` (`60/60`)** |
| **gate 5's `F-1`** — a FUNCTION-typed catalog element was CARRIED as a keyless entry instead of being SKIPPED (`normalizeCatalog([fn])` ⇒ `len 1`; `buildMenuTemplate([item, fn, item]).items.length === 3`) | **`CONFIRMED-FIXED`** (host-side, red-first) **+ `CONTRACT-AMENDED`** (the rule re-confirmed and pinned) | **A FUNCTION-TYPED ELEMENT IS SKIPPED EXACTLY AS A NON-OBJECT IS — over SIX function shapes (a named `function`, an arrow, an `async` arrow, a generator, a `class`, a bound arrow), with no entry and no throw, so `buildMenuTemplate([item, fn, item]).items.length === 2`, never `3`** | **`§2.3` item 1's PIN 1** (after the dispatch table) **+ `§3c` pin 2's reach limit**; **the regression row: `tests/menu-template.test.ts`'s `A-1 / FUNCTION ELEMENT` row over the six shapes** |
| **`A-2`** (MED · CONTRACT + ROW) — the enumerable-only own read was an unpinned property of the implementation | **`CONTRACT-AMENDED`** (pinned) **+ `OWED — TEST-SIDE`** (the row that drives it) | **A projected item carries ONLY the source's own ENUMERABLE string members: a declared member the source owns NON-ENUMERABLY is OMITTED — `Object.keys(item).length === 6` and `'role' in item === false` when `role` is the non-enumerable one** | **`§2.3` item 2's PIN 2** (+ `§3e` row 2); **the owed row: the TestWriter's enumerable-only drive** (`§3e`'s re-grain list item (f)) — **carried as owed, not as covered** |
| **`A-3`** (LOW · TEST-SIDE) — `isIndexKey` accepts ANY all-digit key (`'01'`) | **`OWED — TEST-SIDE`** → **closed by the landed row** (the row now EXISTS and declares the key set for `'01'`, a sparse array and a genuine multi-element array) | **No contract statement was owed; the remedy is the row with a DECLARED key set for the array-like digit-string key** | **`tests/menu-template.test.ts`'s `A-3` row** (present at this pass's read); **contract side: `§3c` pin 1's index-key reading** |
| **`A-4`** (LOW · CONTRACT) — the picker's answer is IGNORED by `buildMenuTemplate` and no row drove a non-`null`, entry-shaped builder answer | **`CONTRACT-AMENDED`** (the answer-unused rule declared) **+ `OWED — TEST-SIDE`** (the arm) | **`buildMenuTemplate` USES ONLY WHETHER THE INVOCATION SUCCEEDED: the answer is never read, never carried, never compared, never returned; only `selectCatalogItem` reads an answer** | **`§2.4` item 1's PIN 3**; **the owed arm: a non-`null`, entry-shaped builder-answer drive** — **a ROW, NOT A TERM; if a later pass adds it as a further register drive, that pass owes `P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`** |
| **`PBT-F1`** — `P-ML-IM-5`'s `(bounded)` marking read as OVER-STRENGTH | **`NOT-A-FINDING`** on the marking, **`CONTRACT-AMENDED`** on the cell's wording | **THE MARKING IS OWED AND IT STAYS: a grid exhausted is not a domain exhausted — the row's boundary text is a RULE over an unbounded catalog space.** **The cell's *"the `5` run shapes ARE the declared domain"* clause is the LOSING HALF and is read as the declared GRID** | **`§5.5.1`'s `PBT-F1` pin** (after the `(bounded)` block); **the marked set stays `6` of `13`** |
| **`PBT-F2`** — no per-attempt arithmetic reconciled `5` shapes to `12` drives | **`CONTRACT-AMENDED`** (the three arithmetic cells printed) | **ONE ATTEMPT = ONE DRIVE OF THE ROW'S DECLARED ENUMERATION: `P-ML-IM-1` `12` = `12 pool shapes × 1`; `P-ML-IM-4` `12` = `5 call shapes × 2 reading-drives + 2 further drives`; `P-ML-IM-5` `12` = `5 run shapes × 2 ordering-drives + 2 boundary drives`** | **`§5.5.1`'s `PBT-F2` pin** (+ `§3e` row 6b); **the landed harness's own describe titles print the same three arithmetic forms** |
| **`PBT-F3`** — the pinned draw sequence never draws some pool members | **`CONTRACT-AMENDED`** (the boundary stated, its COUNT CORRECTED) | **THE UNDRAWN SET IS THREE, NAMED: index `4` (`a revoked Proxy`) · index `7` (`a self-referential record`) · index `8` (`a Map`) — `§3d`'s `4` is `SUPERSEDED` on its own arithmetic (`(4) a 12n` is index `3` and `(7) a record whose accessor THROWS` is index `6`, and BOTH are drawn).** **A DRAW IS NOT A SWEEP: the distinct-member count is `9` of `12` and is REPORTED, never asserted** | **`§5.5.2`'s `PBT-F3` block** (before item 5) |
| **`PBT-F4`** — the honesty block omitted the nested-hostile / recursion hazard | **`CONTRACT-AMENDED`** (the boundary added) | **The nested-hostile / recursion hazard is NAMED in the register's claim-map, beside `A-1`'s disposition** | **`§5.5.2` item 6's `PBT-F4`/`A-1` block** |
| **gate 5's `F-2`** (a contract arithmetic drift against `§3c`'s corrected reading) | **`CONTRACT-AMENDED`** (the reading corrected `3 → 4`, the as-written `3` kept VISIBLE) | **`§2.3` item 11's worked reading is `out.length === 4`, key sets `[[], ['id','label'], ['0'], [seven]]`, array at index `2`, with the KEYLESS SOURCE NAMED as a CARRYABLE one** | **`§2.3` item 11's PIN 4** (+ `§3e` row 4); **`§3d`'s `14`-element union is NOT adopted** (`§3e`'s own finding) |
| **gate 5's `F-3`** (a skipped element splitting a collapse run) | **`CONTRACT-AMENDED`** (rule 3 governs alone) **+ closed test-side** | **A SKIPPED ELEMENT CANNOT SPLIT A RUN: `[pickerA, null, pickerB]` is ONE run and emits ONE collapsed parent (`items.length === 1`); the two-singleton reading is `SUPERSEDED`** | **`§2.3` item 5's PIN 5(i)**; **the reconciliation row is landed (`tests/menu-template.test.ts`'s `§3d (2) F-3 RECONCILIATION` row, with the competing reading asserted to FAIL)**; **gate 5's `ML-G-15` re-drive remains OWED in the blind set** |
| **gate 5's `F-4`** (`§3.1 M-6`(b) unsatisfiable as worded) | **`CONTRACT-AMENDED`** (the identity reading pinned, the drive re-grained) | **STRICT IDENTITY GOVERNS `M-6`(b): the drive is re-grained to a carried OBJECT `id` returned BY REFERENCE, count `1`; a fresh equal-contents object names NO known `id` and returns `null`** | **`§3.1`'s PIN 5(ii)**; **`F-7` is the row that can FAIL for the losing reading**; **gate 5's `ML-G-18` re-drive remains OWED in the blind set** |
| **gate 5's `F-5`** (the seam's argument named twice, differently) | **`CONTRACT-AMENDED`** (the argument pinned) | **THE SEAM RECEIVES THE PRE-COLLAPSE CARRIED CANDIDATES** (`readonly CatalogEntry[]`, catalog order); the collapsed-sequence naming is `SUPERSEDED` as the argument's reading; **both readings yield count `1`, so no count row moves** | **`§2.3` item 6's PIN 5(iii)**; **gate 5's `ML-G-21` re-drive remains OWED in the blind set (its PASS was already BOUNDED to the pre-collapse reading)** |
| **the `§5.5.2` item 10 LONE-SURROGATE coverage gap** | **`OWED — TEST-SIDE`** (never covered) | **The `id` domain does not drive a lone-surrogate `id` (`'\uD800'`), and `P-ML-TP-1`'s pool excludes it — a RECORDED OBLIGATION with a named owner** | **`§5.5.2` item 10**; **the pre-committed re-grain: `P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`** |

**NO BARE `OWED` SURVIVES THE PASS: every row above uses one of `§3a`'s recorded statuses, or the compound of two that both apply.** **THE `OWED — TEST-SIDE` ROWS ARE OBLIGATIONS OF THE TESTWRITER, EACH WITH A NAMED REMEDY AND NONE WITH A TERM MOVE; the `CONTRACT-AMENDED` and `CONFIRMED-FIXED` rows are recorded at their own sites with the as-written forms kept VISIBLE.** **`PACKAGE DEFECTS: NONE`** — this unit exercises no `provident-ssr` surface, so **`docs/defects.md` and `docs/HANDOFF.md` receive NOTHING from it** (`§7` item 10).

---

## ⟶ 3c. THE FOURTH GATE-3 EVENT — **THE CARRY RULE'S THREE UN-SETTLED SUB-READINGS, PINNED** (`2026-09-27`; **ANNOTATE-NEVER-REWRITE** — the as-filed text of **`§2.3` item 11** and of **`§2.3` item 1(d)** stays VISIBLE and is read THROUGH this amendment; **no row id, no strategy id, no seed, no cap and no TERM moves — the declared total stays `126`**).

**WHY THIS AMENDMENT EXISTS.** The red set executes its full declared set (`attemptsExecuted 126`, `broken 0`, `registerStoppedAt: null`) at **`53` passed / `3` failed of `56`**, and the **last three rows turn on THREE SUB-READINGS `§2.3` item 11 does not settle**: **`tests/menu-template.test.ts`'s `F-2`**, **`P-ML-IM-1` shapes `(11)`/`(12)`** and **`I-5`** each depend on one of them, and the rows' own declared readings require **ALL THREE of the pins below**. **Each pin is decided FROM THE ROWS' DECLARED READINGS** — no new behaviour is introduced, and the three are pinned as **the only reading under which `F-2`, `P-ML-IM-1` shape `(12)` and `I-5` hold together**.

**THE THREE PINS, AS COMPOSED.**

| # | The sub-reading `§2.3` item 11 leaves open | THE PIN | The rows it decides |
| --- | --- | --- | --- |
| **1** | **AN ARRAY ELEMENT — carryable, or skipped like a non-object?** | **CARRYABLE — reading (a), and `§2.3` item 1(b)'s own as-filed words ALREADY say so** (*"`typeof element === 'object' && element !== null`, **or an array**"*). **An array element yields a FRESH RECORD whose own enumerable STRING keys are its own index keys** — the array's `'0'` key is **not one of the seven declared names**, yet it is carried, because clause 2's filter is applied to a **CARRYABLE** element's key set and the array's keys are its **own numeric index keys, stringified**. **The values are handed on by identity at the MEMBER level, and a carried member that is itself an object is CARRIED IN TURN (a fresh record of that member), never the member's raw reference.** **`['0']` for a ONE-element array** (`F-2`'s `[nested]`), and **`['0','1','2']` … in ASCENDING NUMERIC order for a several-element array** — **one key per OWN ENUMERABLE index actually present** (so a SPARSE array is carried at its present indices only: `[,x]` yields `['1']`), **and `length` is NOT carried** (it is a non-enumerable own member, exactly as `§2.3` item 2 already forbids). | **`F-2` entry 2** (`Object.keys(out[1]) === ['0']`, `out[1]['0']` a fresh seven-key record of `nested`), **`P-ML-IM-1` shape `(12)`** (the array element is carried), **`§5.5.1 P-ML-IM-1`/`P-ML-IM-6`'s carry cells** |
| **2** | **A RECORD WHOSE OWN-READABLE INTERSECTION WITH THE SEVEN DECLARED NAMES IS EMPTY (`{}`, or a key set DISJOINT from the seven) — dropped, or carried as a record with NO keys?** | **CARRIED — a FRESH RECORD WITH ZERO OWN KEYS; the element is NEVER dropped for having nothing to carry.** **Reconciliation of the two clauses: `§2.3` item 11 clause 4's *"absent keys are omitted"* governs WHICH KEYS an emitted record has, never WHETHER the element is emitted at all — and `P-ML-IM-1` clause 11's *"non-carryable"* applies to the `§2.3` item 1(c) classes ONLY** (a non-object primitive, a function, `null`, `undefined`); **it is NOT a class for a carryable object whose intersection happens to be empty.** **So `buildMenuTemplate([{}])` yields `items.length === 1` with `Object.keys(items[0])` deep-equal to `[]`, and `normalizeCatalog([{ extra: 1 }])` yields ONE entry owning NO declared key** — **an implementation that drops it FAILS `I-5`** (the element is still carried, and no default, placeholder or sentinel substitutes for it). | **`I-5`** (`bare.items.length === 1` with `Object.keys(bare.items[0]) === []`), **`M-1`**, **`P-ML-IM-6`'s exact-two-owned shape** |
| **3** | **A RECORD WHOSE ACCESSOR THROWS (so its own-key read cannot be COMPLETED) — SKIPPED entirely, or PARTIALLY carried with its readable members?** | **SKIPPED ENTIRELY** — **`§2.3` item 1(d)'s reading, which it carries in its own as-filed words** (*"the element is SKIPPED, the throw is ABSORBED, and NOTHING ESCAPES the call"*): **NO entry is emitted for it and NO partial record is materialized from its readable members.** **The two rules COMPOSE IN ONE SENTENCE A TESTWRITER AND AN IMPLEMENTER CAN BOTH FOLLOW: the CARRY RULE is applied ONLY TO AN ELEMENT WHOSE OWN-KEY READ COMPLETES — `Object.keys(element)` (enumerating the own keys) and the read of EVERY owned member must both RETURN, and the moment EITHER THROWS the element falls under item 1(d) and the WHOLE element is skipped, so a partially-readable record is NEVER carried with its readable members.** **The consequence: `carries()`'s readable-member filter is NOT a licence to carry a throwing element's readable subset** — a reading under which the accessor record contributes `{ label: 'A' }` (which the pinned rule read ALONE would allow) is **REJECTED**. | **`F-2` entry 3's count (`out.length === 3`, the accessor-throwing record SKIPPED)**, **`P-ML-IM-1` shapes `(11)`/`(12)`**, **`§5.5.1`'s dated method note (iii)** and **`§7`(C)(2)** — all three of which already state this reading; this pin is what makes it **BINDING on the carry rule rather than a note beside it** |

**THE SINGLE COMPOSED CARRY RULE THAT RESULTS — one sentence, and it supersedes NO as-filed clause because every as-filed clause above is READ THROUGH it: FOR EACH USABLE ELEMENT (a non-null object, an ARRAY INCLUDED, whose own-key enumeration and whose every owned member read both COMPLETE), the module emits ONE FRESH RECORD whose own enumerable string keys are the source's own keys FILTERED TO THE SEVEN DECLARED NAMES IN DECLARED ORDER with each present value handed on BY IDENTITY (an object member being carried in turn under this same rule) — PLUS, ON A CARRYABLE ARRAY, its own present index keys kept as `'0'`,`'1'`,… — while a source owning NONE of the seven (or whose intersection is otherwise EMPTY) is STILL EMITTED as a record with NO keys, and an element whose own-key read THROWS is SKIPPED WHOLE with the throw ABSORBED.**

**⟶ `F-2` AND `P-ML-IM-1` SHAPE `(12)` — THE TWO WORKED FIGURES, CORRECTED TO THE MEASURED READINGS (`2026-09-27`, `§3c`; annotate-never-rewrite: the AS-WRITTEN figures stay VISIBLE below and are READ THROUGH this correction; this line moves NO row id, NO strategy id, NO seed, NO cap and NO term — the declared total stays `126`).** **THE AS-WRITTEN FORM, KEPT VISIBLE: the passage read *"`F-2`'s catalog … yields `out.length === 3` — `out[0]` the null-prototype record with key set `['id','label']`, `out[1]` the ARRAY carried as `['0']` with its `'0'` member a FRESH SEVEN-KEY RECORD of `nested`, `out[2]` the plain record `valid` with its seven — … so the three carried ids in catalog order read `['proto','nested','valid']`"*; and of shape `(12)` it read *"its FIXTURE CARRIES NO `valid` … and therefore yields the TWO carried entries … with the accessor-throwing record SKIPPED"*.** **`2026-09-27`, `§3c` — BOTH FIGURES WERE WRONG, MEASURED AGAINST THE LANDED MODULE AND AGAINST THE CORRECTED FIXTURE; `F-2`'S CORRECTED READING (`catalog = [null, undefined, 42, 'x', Symbol('s'), 12n, () => 1, revokedProxy(), trapThrowingProxy(), protoRecord, [nested], valid, accessor]`) IS `out.length === 4`, the four carried key sets in catalog order read EXACTLY `[[], ['id','label'], ['0'], [seven]]`, and the ARRAY is carried at `out[2]` (key set `['0']`, its `'0'` member a FRESH SEVEN-KEY RECORD of `nested`) — the empty-intersection entry is CARRIED KEYLESS and NEVER dropped (PIN 2, read as pinned), the accessor-throwing record remains SKIPPED WHOLE (`§2.3` item 1(d), PIN 3), and the as-written `out.length === 3` with its `out[1]` array index and its `['proto','nested','valid']` carried-id list are SUPERSEDED as an ARITHMETIC ERROR OF THIS NOTE, NOT a reading of the carry rule — the module DROPPED the empty-intersection entry, and that dropped entry is exactly the missing fourth element.**

**THE MEASURED CORRECTION OF `P-ML-IM-1` SHAPE `(12)`: the as-written TWO-ENTRY reading is SUPERSEDED, because its fixture was READ WRONG and was itself SHORT — that fixture's element 1 is a SEVEN-KEY RECORD, so the entry it yields is the SEVEN, and the ARRAY CARRIER the as-written fixture was missing has since been RESTORED by the TestWriter, so the shape's CORRECT reading is THREE CARRIED ENTRIES with the ARRAY AT INDEX 1 carrying key set `['0']`, the declared length `3`, and the three key sets reading `[[], ['0'], [seven]]` — the keyless record carried under PIN 2 (a carryable record whose seven-name intersection is EMPTY is carried KEYLESS, NEVER dropped) beside the array carried under PIN 1 and the seven-key record carried under the carry rule, with the throwing-accessor record SKIPPED WHOLE under PIN 3.** **NO PINNED READING CHANGES: the three pins of this `§3c`, `§2.3` item 11's carry rule, `§2.3` item 1(d)'s skip and every pinned row-side reading (`F-2`, `I-5`, `P-ML-IM-1`'s `12` shapes, `M-1`, `KEY_SHAPES`(1), `M-8`, `R-12`) stand EXACTLY AS FILED and are read AS THEY STAND — ONLY these TWO WORKED FIGURES were wrong, and the as-written forms above stay VISIBLE, DATED and READ THROUGH this correction.**

**THE TERM VERDICT (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) — PRINTED, AS REQUIRED: `NO TERM MOVED`. THE DECLARED TOTAL REMAINS `126` = `12 + 12 + 12 + 12 + 12 + 12 + 12 + 3 + 3 + 3 + 12 + 9 + 12`** (thirteen terms, in register order: `P-ML-IM-1` · `P-ML-IM-2` · `P-ML-IM-3` · `P-ML-IM-4` · `P-ML-IM-5` · `P-ML-IM-6` · `P-ML-IM-7` · `P-ML-SM-1` · `P-ML-SM-2` · `P-ML-SM-3` · `P-ML-TP-1` · `P-ML-TP-2` · `P-ML-TP-3`), **and with it the same chain, the same subtotals `IM 84 · SM 9 · TP 33`, the same seed `20260927`, the same caps (`126 ≤ 400`, largest row `12 ≤ 100`) and the same `6`-of-`13` `(bounded)` set.** **THIS AMENDMENT ADDS A READING, NOT A SHAPE, A ROW OR A DRIVE: it re-scopes no pool and moves no term, so `§5.5.2` item 10's lone-surrogate re-grain (`12 → 13`, `126 → 127`, `IM 84 → 85`) remains a SEPARATE, STILL-OWED obligation that this pass does not discharge.**

**THE MODULE-SIDE FIX THIS AMENDMENT OBLIGES — THE `carries()` GUARD'S THREE SUB-DEFECTS, NAMED SO THE IMPLEMENTER'S REPAIR IS NOT A RE-DERIVATION.** **The module (`src/shared/menu-template.ts`) currently yields `[proto, valid, accessor]` for `F-2`'s catalog — i.e. it DROPS the array element, DROPS an empty record and PARTIALLY CARRIES the accessor-throwing record — and those are exactly the three sub-defects of ONE guard:** **(i)** **the carryable test EXCLUDES an array** (a `typeof === 'object'` test without `Array.isArray`, or an object-only key enumeration) — **it must admit an array under pin 1 and carry its own present index keys**; **(ii)** **the guard treats an EMPTY intersection as "nothing to carry" and skips the element** — **it must always emit ONE fresh record per usable element under pin 2**; **(iii)** **the own-key probe is done lazily per member, so a member read that throws leaves a PARTIAL record emitted** — **the probe must COMPLETE (enumeration and every owned member read) BEFORE any record is built, and any throw must skip the WHOLE element under pin 3**. **All three are host-side repairs in this repo's own module — NO package defect, so nothing here is a `docs/defects.md`/`docs/HANDOFF.md` item** (`§7` item 10; `AGENTS.md` item 7's package rule is untouched).

**THE RUN THIS AMENDMENT IS FILED AGAINST, WITH ITS NUMBERS STATED SO THE GATE IS CHECKABLE: `53` PASSED / `3` FAILED OF `56`, `attemptsExecuted 126`, `broken 0`, `registerStoppedAt: null`** — **and `§5.5.1`'s dated method notes (iii)/(iv), `§7`(C)(2) and `§2.3` item 11's own printed `out.length === 3` line are the three sites that ALREADY asserted two of these three pins; this amendment is the CONTRACT-side pin that makes them binding on the carry rule itself, and it is the only site that settles pin 2 (`I-5`'s empty-intersection reading).** **NO CLAUSE OF THIS AMENDMENT CHANGES A PINNED ROW-SIDE READING — `F-2`, `I-5` and `P-ML-IM-1` are read AS THEY STAND.** **THIS PASS RAN NOTHING: no suite, no leg, no `tsc`, no build and no commit, and it edited EXACTLY ONE file, `docs/specs/menulib.md`.**

---

## ⟶ 3d. THE GATE-4 AND GATE-5 RECORDS — **THE RED SET IS GREEN AT `ffdb978`, AND THE UNIT IS **GREEN AT GATE 3 BUT NOT DONE** (`2026-09-27`; **ANNOTATE-NEVER-REWRITE** — the `§3a` seed table's as-filed `OWED` rows and every as-written clause of `§2.3`/`§2.4`/`§3c` stay VISIBLE and are READ THROUGH this record; **NO ROW ID, NO TERM, NO STRATEGY ID, NO SEED AND NO CAP MOVES — the declared total stays `126`**). **THIS BLOCK IS APPENDED AFTER `§3c` INSIDE THE EXISTING `§3`-FAMILY NUMBERING, per this file's file-end note: no section number moves, nothing is renumbered, and the `§5.3 → §5.5` gap stays exactly as recorded.**

**PROVENANCE, STATED BEFORE THE FIRST FIGURE, BECAUSE THIS WRITING PASS TOOK NO MEASUREMENT OF ITS OWN:** **the writing pass held a read/search/doc-write tool wall and NO SHELL — it ran no suite, no leg, no `tsc`, no build and no commit.** **EVERY FIGURE BELOW IS A NAMED EARLIER PASS'S OR COMMIT'S OWN REPORT, quoted with the pass or commit named: the gate-4 adversarial + PBT audit pass (read-only, run over the revision named below), the gate-5 blind-greens pass (`docs/specs/menu-template-greens.md`, whose `§A`/`§C` carry the commands and exit codes), and the green run at `ffdb978`.** **THE RE-TAKE LIST IS AT THE FOOT OF THIS BLOCK — a fresh pass must re-take every figure here before believing any of it.**

**THE GREEN, AS MEASURED THIS ROUND (quoted, not re-measured):** **the red set is GREEN at `ffdb978` — `56/56`** (`tests/menu-template.test.ts`), **the register EXECUTING ALL `126` DECLARED ATTEMPTS with `broken 0` and `registerStoppedAt: null`** (the early stop at `P-ML-IM-5` that `§3c` recorded is CLEARED, and no un-run row remains reported as a failure); **the full suite reads `71` files / `1752` passed / `2` skipped / `0` failed**; **and all five legs stand at `0`** — `npm test` `[T]` · `npm run typecheck` `[H]` · `npm run build` `[H]` (the six-artifact census unchanged) · `npm run typecheck:tests` · the contract's strict `tsc` leg. **THE MODULE IS COMMITTED AT THE GATE BOUNDARY (`RCA-8(a)`).**

### (1) GATE 4 — THE READ-ONLY ADVERSARIAL PASS + THE GATE-11 PBT AUDIT: IT RETURNED FINDINGS, AND **NONE IS YET FIXED**

**Four host findings `A-1`…`A-4`, each with its measured symptom and the disposition it OWES (a disposition, never a "fixed"):**

| # | Sev · layer | The measured finding | The disposition owed |
| --- | --- | --- | --- |
| **`A-1`** | **HIGH · HOST (`src/shared/menu-template.ts`)** | **A NESTED HOSTILE MEMBER IS NOT ABSORBED.** `normalizeCatalog([{id:'k'}, revokedProxy()])` returns **`[]`** — **the USABLE element is DROPPED, not just the hostile one**; `normalizeCatalog([[[revokedProxy()]]])` likewise; and `normalizeCatalog([[cycle]])` (an array containing itself) **THROWS `RangeError` inside the recursion, OUTSIDE ANY ABSORBED SPAN**. | **ABSORB PER MEMBER** — guard the recursive `carries` call AND the array index read so a hostile member skips **THE MEMBER**, never the catalog — **plus a REGRESSION ROW, red first (`P-ML-TP-4` class).** **SPEC SIDE: `§5.5.2` item 6(c)'s subset rule DOES NOT COVER this shape** — it must be **NAMED AS A BOUNDARY or its reading PINNED**; the record does not decide which. |
| **`A-2`** | **MED · CONTRACT + ROW** | **`readOwn` filters on `propertyIsEnumerable`, so a NON-ENUMERABLE *DECLARED* MEMBER IS SILENTLY DROPPED — and the ENUMERABLE-ONLY OWN-READ IS PINNED NOWHERE.** | **PIN THE ENUMERABLE-ONLY READ at `§2.3` item 2/9, THEN a row.** No pin exists today; the read is an unpinned property of the implementation. |
| **`A-3`** | **LOW · TEST-SIDE** | **`isIndexKey` accepts ANY all-digit key (`'01'`), so an `Object.assign([], {'01':'x'})` array CARRIES `'01'`.** | **A ROW WITH A DECLARED KEY SET** (TestWriter-owned). No contract statement is owed. |
| **`A-4`** | **LOW · CONTRACT** | **THE PICKER'S ANSWER IS IGNORED BY `buildMenuTemplate` — only `selectCatalogItem` reads it — and NO ROW DRIVES A NON-`null`/ENTRY-SHAPED BUILDER ANSWER.** | **DECLARE THE ANSWER-UNUSED RULE at `§2.4` item 1, THEN AN ARM** (a TERM move only if an arm is added — and then it is **ANNOTATED, NEVER REWRITTEN**; as recorded, no term moves). |

**Four contract-side PBT-audit items `PBT-F1`…`PBT-F4` (the gate-11 audit's own findings; none is a row defect):**

| # | The audit finding, one line | The reconciliation it owes |
| --- | --- | --- |
| **`PBT-F1`** | **OVER-STRENGTH:** `P-ML-IM-5`'s **`(bounded)`** marking is **over-strength** — its **`5` shapes × `2` orderings are a FIXED GRID, ALL DRIVEN**, so the row's execution is an exhaustive grid, not a bounded sample. | **THE MARKED SET, `§5.5.1`'s method note (i), `§7a.1` item 3 AND THE `12`-vs-`5` SHAPES MUST BE RECONCILED.** |
| **`PBT-F2`** | **UN-RECONCILED ARITHMETIC:** the `P-ML-IM-1`/`-4`/`-5` cells say *"`12` attempts = …"* while the row prints **`5×2+2 = 12`** — and **NO PER-ATTEMPT ARITHMETIC RECONCILES `5` SHAPES TO `12` DRIVES.** | **A PER-ATTEMPT TERM BREAKDOWN** (or the cell text corrected to the drives actually taken) — per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, printed WITH its terms. |
| **`PBT-F3`** | **A DRAWN-POOL BOUNDARY, REPORTED AND NOT ASSERTED:** the **pinned draw sequence NEVER DRAWS `4` of the pool's `12` members** (`12n`, the throwing accessor, the self-referential shape and one more) **and draws others THREE TIMES.** **This is a BOUNDARY TO STATE, NOT A DEFECT** — a draw is never a sweep. | **STATE THE BOUNDARY** (the `§5.5.2` honesty block's coverage language) — **no term, seed or cap moves.** |
| **`PBT-F4`** | **AN OMISSION:** the **honesty block omits the NESTED-HOSTILE / RECURSION HAZARD** — the exact shape `A-1` measured. | **ADD IT TO THE HONESTY BLOCK** beside `A-1`'s disposition. |

**EVERYTHING ELSE THE PASS CHECKED IS `NOT-A-DEFECT` OR `CONFIRMED-RULED`, AND ITS RE-DERIVED ARITHMETIC MATCHES THIS FILE'S:** **`126 = 12×7 + 3×3 + 12 + 9 + 12`**, subtotals **`IM 84 · SM 9 · TP 33`**, caps **`126 ≤ 400`** and **`12 ≤ 100`**, **six marked of thirteen**, **distinct sum `89`**. **PACKAGE DEFECTS: NONE** (an EMPTY import census and no `provident-ssr` surface — `§7` item 10; `docs/defects.md` and `docs/HANDOFF.md` receive NOTHING from this unit).

### (2) GATE 5 — THE BLIND GREENS (`docs/specs/menu-template-greens.md`, **NEW**, `239` lines): `28` EXECUTED SCENARIOS — `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE`, PLUS FIVE FINDINGS

**The set was authored from the DOCUMENTATION ONLY (the module and the test file were NEVER READ — the blindness claim) and RUN against the module at `ffdb978`.** **Its own census and its own `§G` arithmetic line are the authority; this record names them and does not re-derive them.**

**THE TWO FAILS (neither converted to a pass):**

1. **A FUNCTION-TYPED CATALOG ELEMENT IS CARRIED RATHER THAN SKIPPED — HOST-SIDE, AND IT CONTRADICTS `§2.3` ITEM 1(c) AND ITEM 11 CLAUSE 4.** `normalizeCatalog([fn])` yields **one entry with NO KEYS across all six function shapes** (a named `function`, an arrow, an `async` arrow, a generator, a `class`, a bound arrow); `buildMenuTemplate([fn]).items` is **`[{}]`** — a projected ITEM with no member at all reaches `items`; and `buildMenuTemplate([item, fn, item]).items.length` is `3` where the contract declares `2`. **It is the entry that makes gate 5's carried length `5` rather than `4`.** **Disposition: the Implementer's, red-first.**
2. **`F-2` — A CONTRACT ARITHMETIC DRIFT: `§2.3` ITEM 11'S WORKED READING (`out.length === 3`) IS WRONG, INCLUDING AGAINST ITS OWN LIST** — that list contains **NO keyless source** — **and it stands against `§3c`'s corrected reading (`4`, key sets `[[], ['id','label'], ['0'], [seven]]`).** **`§2.3` item 11's reading MUST BE CORRECTED TO `4`**, and **on the `14`-element union of the two named lists the module reads `5`.** **Disposition: contract-side — the reading corrected; the as-written `3` kept VISIBLE.**

**ITS THREE RECORDED AMBIGUITIES, EACH WITH THE READING THE DRIVER USED AND THE FACT THAT ITS PASS IS BOUNDED BY THAT CHOICE:**

| # | The clause pair that does not agree | **The reading the driver used** | **What the PASS does and does not claim** |
| --- | --- | --- | --- |
| **`F-3`** | **A SKIPPED ELEMENT SPLITTING A RUN: `§2.3` item 5 rule 3 against `§3.2 F-5` / `§5.5.1`'s dated method note (a).** | **RULE 3's TEXT** — the run is measured on the NORMALIZED sequence, so a skipped element **cannot split** a run: `[pickerA, null, pickerB]` is ONE run and collapses. | **`ML-G-15`'s PASS is BOUNDED to rule 3 alone**; the competing clause declares **TWO SINGLETONS** with `items.length === 2` and **no `submenu` on either**, and the module contradicts that clause. **The scenario is NOT re-scored to FAIL and the driver takes NO position on which clause should win.** |
| **`F-4`** | **`§3.1 M-6`(b) IS UNSATISFIABLE AS WRITTEN against `§2.3` item 8's STRICT IDENTITY plus `§3.2 F-7`.** | **STRICT IDENTITY** (`===` against the own `id` members, no coercion): a fresh `{ id: 'b' }` answer returns **`null`**. | **`ML-G-18`'s PASS is BOUNDED to that reading** and to the **string**-`id` leg of `G-4`'s positive arm; **`M-6`(b)'s drive as worded cannot be green.** |
| **`F-5`** | **`§2.3` item 6 NAMES THE SEAM'S ARGUMENT TWICE, DIFFERENTLY** (*"the carried candidate entries"* vs *"the (`darwin`-collapsed, if applicable) emitted sequence"*). | **THE PRE-COLLAPSE CARRIED ARRAY** (`candidates.length = 2` on a call whose emitted `items.length === 1`). | **`ML-G-21`'s PASS is BOUNDED to the pre-collapse reading**; **both readings yield count `1`, so NO count row moves** — what is unbounded is only the **argument's content**, and it is recorded, not adjudicated. |

**ITS `NOT-BLIND-RUNNABLE` SET, NAMED SO THE GREEN IS NOT OVER-READ (six rows, none a pass and none evidence): `ML-G-NB-1`** (the static byte/token census — `§3.4 R-1`'s anti-evasion scan and `R-8`'s closed-set literal census, with `R-7`'s companion) · **`ML-G-NB-2`** (the rendered/OS fact — `§2.4` item 5's native-menu/picker half, `§3.3 I-11`, and any OS-acceptance evidence behind `'darwin'`) · **`ML-G-NB-3`** (the register's own tables — `13` rows / `13` terms / `126` declared, the seed, the caps, the subtotals and the `6`-of-`13` `(bounded)` set) · **`ML-G-NB-4`** (the import-graph census — `R-13`'s no-importer probe and `X-1`'s green branch) · **`ML-G-NB-5`** (the byte scan of the unit's own TEST FILE — `R-2`'s second half) · **`ML-G-NB-6`** (the static control corpora — `F-8`/`F-9` — and `X-5`'s repo-wide `src/**` token sweep).

**ITS `POST-GREEN` NOTE, CARRIED HERE IN SUBSTANCE AND BINDING:** **the set was authored against the module at `ffdb978`, so A LATER CHANGE TO `src/shared/menu-template.ts` STALES THE SET AND OWES A TARGETED RE-DRIVE, RECORDED IN THAT FILE** — in particular for **`F-1`'s repair** (`ML-G-05`, `ML-G-05b` and every row whose length depended on the carried count) and for **`F-3`'s reconciliation** (`ML-G-15`, whose PASS is bounded to rule 3), with the re-drive's readings **appended beside the as-filed ones, never substituted for them**, and the `26`/`2`/`6` census standing as **that** pass's count.

### (3) THE ROUND-3 NEXT ACTIONS, IN ORDER — **AND EVERY COMMIT AT EVERY BOUNDARY, SCOPED TO ONE UNIT (`RCA-8(a)`/`(f)`)**

1. **A CONTRACT DISPOSITION** — **`A-2`'s enumerable-only read (pinned at `§2.3` item 2/9) · `A-4`'s answer-unused rule (declared at `§2.4` item 1) · `§2.3` item 11's reading CORRECTED TO `4` · `§2.3` item 1(c)'s function rule HONOURED BY THE MODULE RATHER THAN THE DOC — or, if the row is wrong, THE ROW CORRECTED · the four PBT items `PBT-F1`…`PBT-F4` · and gate 5's three ambiguities (`F-3`/`F-4`/`F-5`).** **AMEND-THEN-RE-GRAIN, never the red set edited to match a broken clause; every as-written form kept VISIBLE and dated.**
2. **A TESTWRITER RED-FIRST PASS for the regression rows** — **the NESTED-HOSTILE MEMBER (`A-1`, `P-ML-TP-4` class) · the FUNCTION ELEMENT (gate 5's `F-1`) · the DIGIT-STRING INDEX KEY (`A-3`) · plus gate 5's `F-3` RECONCILIATION and ANY ROW THE CONTRACT DISPOSITIONS CHANGE.**
3. **THE IMPLEMENTER** — **`A-1`'s PER-MEMBER ABSORPTION and THE FUNCTION ELEMENT'S SKIP**, least code to green, running only after the TestWriter reports the red set, and **it must not edit the test file.**
4. **GATES 6–10** — **§6 `STRUCTURAL`** (never `waived`; **its falsifier is already named in the contract**) · **§7 the proofreader** · **§8 the per-unit doc review** (→ `archive/reviews/<date>-U-MENULIB-doc-review.md`) · **§9 the trio PLUS THE REPO-WIDE LEGS** (`npm test` · `npm run typecheck` · `npm run build` · `npm run typecheck:tests` · `npm run divergence` · `npm run ui`) · **§10 the `DONE` ROW AND THE LEDGER MOVE** — **committing at every boundary and scoping every commit to one unit.**

### (4) STATE, STATED PLAINLY — **THE UNIT IS GREEN AT GATE 3 BUT NOT DONE**

**`E7` (`U-MENULIB`) IS GREEN AT GATE 3 (`56/56` at `ffdb978`, register `126/126` executed, `broken 0`, `registerStoppedAt: null`) AND IT IS NOT `DONE`.** **THE LEDGER IS UNMOVED AT `15 DONE / 6 open` UNITS = `21` UNITS; THE CONTRACT STAYS FILED AND APPROVED AS FILED; AND GATE 6 IS `STRUCTURAL`, WITH ITS FALSIFIER ALREADY NAMED IN THE CONTRACT.** **THE TWO HOST DEFECTS (`A-1` HIGH, gate 5's `F-1`) ARE UNFIXED AND THE FOUR PBT ITEMS ARE UNDISPOSED — so no reader may take this green as a unit-level green.**

### (5) VERIFY BEFORE BELIEVING — **NO FIGURE IN THIS BLOCK IS THIS WRITING PASS'S OWN MEASUREMENT**; THE COMMANDS A FRESH PASS MUST RE-TAKE, IN THIS ORDER

**`npx vitest run tests/menu-template.test.ts`** (the `56/56` reading) · **`npm test`** (the `71` files / `1752` passed / `2` skipped / `0` failed reading) · **the legs `npm run typecheck` · `npm run build` · `npm run typecheck:tests`** and **the two repo-wide legs `npm run divergence` · `npm run ui`** (gate 9's own obligations) · **the register's PRINTED ROW RECORD** in the test file (per-row strategy id + held/broken, the per-row attempt terms, the total printed WITH its terms, seed `20260927`, `attemptsExecuted 126`, `broken 0`, `registerStoppedAt: null`, and the `(bounded)` set) · **the gate-5 driver's own commands and exit codes, which are listed in `docs/specs/menu-template-greens.md` `§A`/`§C` and must be read THERE rather than restated from this block** · **and the commits themselves** (`ffdb978` and the gate-boundary commits around it), read rather than trusted. **NOTHING IN THIS BLOCK IS SMOOTHED: two host defects and four undismissed PBT items are recorded as UNFIXED, the ledger is recorded as UNMOVED, and the gate-5 set's own `POST-GREEN` staleness clause is carried as BINDING.**

---

## ⟶ 3e. THE GATE-6 CONTRACT DISPOSITION — **THE TEN PINS, THE TERM VERDICT, THE RE-GRAINS OWED, AND THE FIGURES CORRECTED** (`2026-09-27`; **ANNOTATE-NEVER-REWRITE** — every as-written cell this block pins stays VISIBLE at its own site, and **NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR `(bounded)` MARKING MOVES**). **Appended after `§3d` inside the existing `§3`-family numbering, per this file's file-end note: no section number moves and nothing is renumbered.**

**PROVENANCE, STATED BEFORE THE FIRST FIGURE: THIS PASS HELD A READ/SEARCH/DOC-WRITE WALL AND NO SHELL — it ran no suite, no leg, no `tsc`, no build, no Electron boot and no commit, it edited EXACTLY ONE file (`docs/specs/menulib.md`), and every measurement it quotes is a NAMED earlier pass's or commit's own report** (`§3d`'s gate-4 record and gate-5 set, `ffdb978`). **THE TWO FIGURES IT DERIVES ARE ARITHMETIC OVER LANDED LITERALS AND EACH IS PRINTED WITH ITS DERIVATION:** the draw complement (`new Set(PINNED_DRAW_INDICES).size === 9`, complement `{4, 7, 8}`) and the keyless-source reconciliation at `§2.3` item 11.

**THE TEN PINS, EACH AT ITS BINDING SITE — this table INDEXES them; the normative text is at the sites, and NO site's as-written clause is rewritten:**

| # | The pin | Its site |
| --- | --- | --- |
| **1** | **A FUNCTION-TYPED ELEMENT IS SKIPPED EXACTLY AS A NON-OBJECT IS** — `§2.3` item 1(c) and item 11 clause 4 confirmed as written, the MODULE owes the fix, `§3c` pin 2's keyless reading does NOT reach a function, and `[item, fn, item]` reads `items.length === 2` | `§2.3` item 1, after its dispatch table |
| **2** | **THE ENUMERABLE-ONLY OWN READ** — an item carries only the source's own ENUMERABLE string members, so a non-enumerable DECLARED member is OMITTED; one non-enumerable declared member ⇒ `Object.keys(item).length === 6` and `'role' in item === false` | `§2.3` item 2, after its clause |
| **3** | **THE BUILDER NEVER READS THE PICKER'S ANSWER** (only `selectCatalogItem` does); the non-`null` entry-shaped drive is a TestWriter ROW, and no term moves for it here | `§2.4` item 1, after the positive arm |
| **4** | **`§2.3` ITEM 11'S WORKED READING CORRECTED `3 → 4`** (`[[], ['id','label'], ['0'], [seven]]`, array at index `2`), with the KEYLESS SOURCE NAMED as a CARRYABLE one, the as-written `3` visible, and the two printed lists reconciled | `§2.3` item 11, after its bullet list |
| **5(i)** | **A SKIPPED ELEMENT CANNOT SPLIT A COLLAPSE RUN — RULE 3 ALONE GOVERNS** (`[pickerA, null, pickerB]` ⇒ one collapsed parent, `items.length === 1`); the two-singleton reading is `SUPERSEDED` | `§2.3` item 5, after the rule list |
| **5(ii)** | **STRICT IDENTITY GOVERNS `M-6`(b)** — the drive is re-grained to a carried OBJECT `id` returned BY REFERENCE; `F-7` and `§2.3` item 8 are the deciding rows | `§3.1`, after the `M`-table |
| **5(iii)** | **THE SEAM RECEIVES THE PRE-COLLAPSE CARRIED CANDIDATES** (`readonly CatalogEntry[]`, catalog order); the collapsed-sequence naming is `SUPERSEDED`; no count row moves | `§2.3` item 6, after its clause |
| **6a** | **`P-ML-IM-5`'s `(bounded)` MARKING IS OWED AND STAYS** — the grid is exhausted but the row's boundary text is a RULE over an unbounded catalog space; the marked set stays `6` of `13` | `§5.5.1`, after the `(bounded)` block |
| **6b** | **THE THREE `12`-ATTEMPT CELLS' PER-ATTEMPT ARITHMETIC** — ONE ATTEMPT = ONE DRIVE: `P-ML-IM-1` `12×1`; `P-ML-IM-4` `5×2 + 2`; `P-ML-IM-5` `5×2 + 2` | `§5.5.1`, after the `(bounded)` block |
| **6c** | **THE PINNED DRAW SEQUENCE'S UNDRAWN MEMBERS — `THREE`, NAMED, AND `§3d`'s `4` IS CORRECTED ON ITS OWN ARITHMETIC** | `§5.5.2`, before item 5 |
| **6d** | **THE NESTED-HOSTILE / RECURSION BOUNDARY** — a nested hostile member **skips the MEMBER, never the catalog**; a cyclic structure **must not throw out of any entry point**; the regression row is OWED | `§5.5.2` item 6 |

**THE TERM VERDICT — PRINTED, WITH ITS TERMS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): NO TERM MOVED AND NO TERM IS MOVED BY ANY PIN OF THIS DISPOSITION. THE DECLARED TOTAL STAYS `126` = `12` (`P-ML-IM-1`) + `12` (`P-ML-IM-2`) + `12` (`P-ML-IM-3`) + `12` (`P-ML-IM-4`) + `12` (`P-ML-IM-5`) + `12` (`P-ML-IM-6`) + `12` (`P-ML-IM-7`) + `3` (`P-ML-SM-1`) + `3` (`P-ML-SM-2`) + `3` (`P-ML-SM-3`) + `12` (`P-ML-TP-1`) + `9` (`P-ML-TP-2`) + `12` (`P-ML-TP-3`)**, with **the same chain `12 → 24 → 36 → 48 → 60 → 72 → 84 → 96 → 99 → 102 → 105 → 117 → 126`, the same subtotals `IM 84 · SM 9 · TP 33`, the same seed `20260927`, the same caps (`126 ≤ 400`, largest row `12 ≤ 100`), the same nine-way `12`-term tie and the same `6`-of-`13` `(bounded)` set.** **WHY PER PIN: 1/2 are SKIP-and-CARRY READINGS on drives the register already declares; 3 is a ROW, not a drive; 4 is a COUNT OF CARRIED ENTRIES inside `P-ML-IM-1`'s already-counted shapes (its term counts SHAPES); 5(i)/(iii) are run-measurement and argument-content readings that move no count; 5(ii) re-grains a row's drive; 6a moves no marking; 6b is a READING of three cells whose terms are unchanged; 6c/6d are BOUNDARIES, not members added to any pool.**

**THE RE-GRAINS OWED BY THIS DISPOSITION — ALL ROW-SIDE, EACH NAMED WITH ITS OWNER, NONE A TERM:** **(a)** the FUNCTION-ELEMENT row (TestWriter, red-first — a NEW row, and `buildMenuTemplate([fn]).items` must read `[]`, not `[{}]`); **(b)** `F-2`'s FIXTURE: the keyless entry must come from an EXPLICIT CARRYABLE keyless source, with the FUNCTION SKIPPED (TestWriter); **(c)** `§5.5.1` method note (a) + `§7`(C)(1) + `P-ML-IM-5`'s skip-bridged boundary drive → RULE 3's reading (TestWriter), plus gate 5's `ML-G-15` re-drive; **(d)** the `IM-4` control SENTENCE that calls its `10` readings "assertions inside `5` attempts" (TestWriter — prose only; the executed attempts are already `12`); **(e)** `M-6`(b), gate 5's `ML-G-18` re-drive; **(f)** the ENUMERABLE-ONLY row, the ANSWER-UNUSED row, the PRE-COLLAPSE-ARGUMENT row and the `A-1` regression row — four NEW rows the TestWriter owes. **TWO PROSPECTIVE TERM MOVES ARE NAMED AND NOT TAKEN HERE, AND NEITHER MAY BE SUBSTITUTED FOR THE OTHER:** `§5.5.2` item 10's lone-surrogate shape (`P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`, already OWED with its own owner) and PIN 3's builder-answer drive **if** a later pass adds it as a further register drive (the SAME three figures, its natural home `P-ML-IM-7`'s `5` count drives); **if both land, that pass composes the total and prints it with its terms.**

**⟶ WHAT THIS PASS FOUND WORSE THAN `§3d` REPORTS, RECORDED SO NO LATER PASS INHERITS IT SILENTLY.** **(1) `§3d`'s `PBT-F3` COUNT IS WRONG: the pinned sequence leaves `THREE` pool members undrawn (`(5) a revoked Proxy`, `(8) a self-referential record`, `(9) a Map`) — and TWO of the four it names as undrawn, `(4) a 12n` and `(7) a record whose accessor THROWS`, ARE DRAWN (indices `3` and `6`); pinned at `§5.5.2`'s `PBT-F3` block with the derivation.** **(2) GATE 5's TWO FAILS INTERACT AND NEITHER IS FIXABLE ALONE: gate 5's `F-1` requires the function element to be SKIPPED while its own `F-2` reading of `4` counts a KEYLESS ENTRY THAT COMES FROM THAT FUNCTION — so the `4` is right ONLY with a CARRYABLE keyless source added to the fixture (`§2.3` item 11's pin), and the landed harness's `F-2` repair currently reads its keyless entry from the function.** **(3) `§3d`'s *"`14`-ELEMENT UNION of the two named lists"* IS NOT DERIVABLE: as printed, `§2.3` item 11's list and `§3c`'s corrected list are TEXTUALLY IDENTICAL — thirteen names in the same order each — so the union is thirteen, and the difference between the two READINGS is the keyless entry's source, not the list.** **(4) `§3d`'s `A-1` disposition cites *"`§5.5.2` item 6(c)'s subset rule"*: that subset rule is `§5.5.1`'s strategy-discipline item 6(c), and the boundary it says is missing is now NAMED at `§5.5.2` item 6.** **(5) THE ONE SHAPE `A-1`'s THROW NEEDS IS THE ONE THE DRAWS NEVER TAKE: pool member `(8)` (the self-referential record) is undrawn, so `A-1`'s regression row must drive its cycle DIRECTLY rather than through the generator.** **(6) NOTHING ELSE MOVED: the ledger stays `15 DONE / 6 open`, `E7` is still NOT `DONE`, gate 6 is still `STRUCTURAL`, and the register's executed `126`/`broken 0`/`registerStoppedAt: null` reading is untouched by every pin above.**

**VERIFY BEFORE BELIEVING — THE COMMANDS A FRESH PASS MUST RE-TAKE, IN THIS ORDER:** `npx vitest run tests/menu-template.test.ts` (the `56/56`), `npm test`, the legs (`npm run typecheck` · `npm run build` · `npm run typecheck:tests`), the two repo-wide legs (`npm run divergence` · `npm run ui`), **the register's PRINTED ROW RECORD in the test file** (per-row strategy id + held/broken, the per-row terms, the total WITH its terms, seed `20260927`, `attemptsExecuted 126`, `broken 0`, `registerStoppedAt: null`, the `6`-of-`13` `(bounded)` set), **the draw pin** (`new Set(PINNED_DRAW_INDICES).size === 9`; complement `{4, 7, 8}`), **the `F-2` key sets** (`[[], ['id','label'], ['0'], [seven]]`), **and the commits themselves.** **NO FIGURE IN THIS BLOCK IS THIS WRITING PASS'S OWN MEASUREMENT EXCEPT THE TWO DERIVATIONS IT PRINTS WITH THEIR ARITHMETIC.**

---

## ⟶ 3f. THE CLOSE-OUT PASS — **GATE 6 `STRUCTURAL` · GATE 7 THE PROOFREADER · GATE 8 THE PER-UNIT DOCUMENTATION REVIEW · GATE 10 THE DONE ROW AND THE LEDGER MOVE** (`2026-09-27`; **ANNOTATE-NEVER-REWRITE** — every as-written cell stays VISIBLE at its own site; **NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR `(bounded)` MARKING MOVES**, and the register stays **`13` rows / `13` terms / `126`**). **Appended after `§3e` inside the existing `§3`-family numbering, per this file's file-end note: no section number moves and nothing is renumbered.**

**PROVENANCE, STATED BEFORE THE FIRST FIGURE: THIS PASS HELD A READ/SEARCH/DOC-WRITE WALL AND NO SHELL.** It ran **no suite, no leg, no `tsc`, no build, no Electron boot and no commit.** **THE FIGURES BELOW ARE EITHER (a) THE SUPERVISOR'S OWN MEASUREMENTS AT `6ec24aa`, QUOTED WITH THAT OWNERSHIP, or (b) THIS PASS'S OWN FILE READS, each named as such.** **This pass READ `src/shared/menu-template.ts` and `tests/menu-template.test.ts`** (unlike the blind-greens writer, whose blindness claim is unaffected and untouched) **because a documentation review must reconcile claims against the build** (`AGENTS.md` item 10d).

### (1) GATE 6 — **`STRUCTURAL`, NEVER WAIVED**, WITH ITS REASON AND ITS FALSIFIER

**The word is `STRUCTURAL` and the word `waived` is FORBIDDEN here** (`§5.2`; a `waived` reading is a review finding). **THE STRUCTURAL REASON, in the three parts the family's form requires: (a) the module is imported by NO `src/**` file** (`§3.4 R-13`; the no-importer probe) **and therefore HAS NO RENDERED SURFACE** — **confirmed at this pass's grain: the module's only importers are this unit's own test file**; **(b) it appears in NONE of the built outputs** (`§5.2` leg 3; **the supervisor's `npm run build` exit `0` with the SIX-artifact census unchanged** at `6ec24aa`); **(c) it READS NO OS, NO DOM AND NO ELEMENT** (`§2.2` `P-ML-7`; `§3.4 R-7`) — **so there is nothing for a measuring leg to measure and no live path by which the app could reach it.** **THE FALSIFIER, carried as `G-6` filed it** (`§5.1`'s closing block): ***if this spec's diff scope contains `src/renderer/**`, `src/main/**`, the demo-envelope path, an authored element/class write, or a probe composing a real `Menu`, then the `§7.1` predicate TRIGGERS, the three-part `[U]` refusal is UNAVAILABLE, the live/UI battery is OWED, and the ledger's leg cell becomes a finding.*** **THE `[U]` REFUSAL IS THE THREE-PART FORM (refusal · structural reason · `zones.md` `§4.4 S-6`'s sentence) and the READER QUESTION IS ANSWERED `NONE`** (`§5.2`); **`[D]` IS NOT CLAIMED (`PRECONDITION-GATED`)**; **the `§7.1` predicate decision is `DOES NOT TRIGGER`** with its evidence and its falsifier (`§5.2`). **NO EXEMPTION IS CLAIMED AND NO WAIVER IS RECORDED — gate 6 is closed STRUCTURALLY and the DONE row states the reason rather than omitting the gate** (`§5.3` item 7).

### (2) GATE 7 — THE PROOFREADER PASS, RUN AS FAR AS THIS PASS'S WALL ALLOWS, WITH EVERY STALE CELL IT FOUND FIXED IN THIS SAME PASS

**WHAT WAS AUDITED, NAMED SO THE AUDIT IS CHECKABLE:** this file's `CURRENT STATE` block · `§0`/`§0A` notes `1`–`8` · the layer declaration's seven anchors · `§1`–`§4` · `§5.1`/`§5.2`/`§5.3` · `§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` · `§6`–`§8` · `§7a`/`§7a.1` · `§3a`/`§3b`/`§3c`/`§3d`/`§3e` · the gate-1 record `docs/specs/menulib-review.md` · the blind set `docs/specs/menu-template-greens.md` · the active trackers (`docs/next-steps.md`'s `E7` row and `## OPEN` totals, `docs/pending.md`'s `SCH-5`/`§L-4f`, `docs/decisions.md`'s `E5-B-*` neighbourhood, `docs/FORKER.md`'s `U-MENULIB` row) · **and the two landed files, read for these claims only: `src/shared/menu-template.ts` and `tests/menu-template.test.ts`.**

**THE STALE CELLS FOUND — AND FIXED IN THIS PASS BY ANNOTATION, NONE BY REWRITE:**

| # | The stale cell | What it read | What it is |
| --- | --- | --- | --- |
| **PF-1** | `CURRENT STATE` item 3's as-filed `(bounded)` count | **`5` of the `13` rows** | **STALE; corrected `5 → 6` by the dated amendment already at that item, and re-verified this pass: the landed harness's own bound set is the six names, asserted as a list at `tests/menu-template.test.ts` (`P-ML-IM-1` · `IM-4` · `IM-5` · `TP-1` · `TP-2` · `TP-3`, `6 + 7 = 13`).** **NO FURTHER EDIT IS OWED — the correction was already filed; this pass confirms it against the file.** |
| **PF-2** | `CURRENT STATE` item 3's, `§5.5.1`'s, `§5.5.3`'s and `§5.3` item 11's as-filed declared total | **`123` = the same thirteen terms** | **STALE ON ITS OWN ARITHMETIC (`123` is NOT the sum of `12×7 + 3×3 + 12 + 9 + 12` = `126`); corrected by the dated amendments at those sites, and re-verified this pass against the harness: `DECLARED_TOTAL = 126` and `AS_FILED_DECLARED_TOTAL = 123` BOTH stand in the test file as literals, with the reconciliation asserted to `126` and the as-filed figure kept VISIBLE (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).** **The arithmetic lineage is therefore `154` (the SIBLING `E5` unit's as-filed mis-sum, unrelated to this unit — recorded here only so the two are never conflated) → `137` (the sibling's intermediate) → `126` (THIS unit's corrected declared total).** |
| **PF-3** | `§5.3` item 11's arithmetic line and `§4.2`'s stop-rule parenthetical | the as-filed `123`, kept visible under annotation | **STALE-BUT-ANNOTATED — both sites already carry their dated corrections and both stay as as-written provenance.** **No new edit; recorded so a later reader does not file the same cell twice.** |
| **PF-4** | `§3a`'s live-status pointer at the file end of the seed table | *"FOUR HOST FINDINGS `A-1`…`A-4` … **NONE YET FIXED**"*, *"THE FOUR PBT ITEMS ARE UNDISPOSED"* | **STALE AS A LIVE READING — every one of the gate-4/gate-5 findings is now CLOSED (fixed or pinned) with its red-first regression row, and the supervisor's green at `6ec24aa` is the measured evidence (`60/60`; the register `126`/`126` executed, `broken 0`, `registerStoppedAt: null`).** **THE FIX IS `§3b`'s DISPOSITION TABLE, FILLED IN THIS PASS (below) — `§3a`'s as-filed `OWED` rows and `§3d`'s as-written *"NONE IS YET FIXED"* heading STAY VISIBLE as that pass's dated reading, read THROUGH `§3b`.** |
| **PF-5** | `§3b`'s disposition table | *"(none yet — the pass has not run …)"* | **STALE — the pass HAS run (`§3d`) and every disposition is now recorded.** **A bare `OWED` is the one status that may not survive the pass (`AGENTS.md` item 11(e)), so the table is filled in this pass from `§3d`/`§3e`'s own records.** |
| **PF-6** | `§7` item 11's tracker-residue list and `§8`'s `E7` row | *"spec cell reads `OWED — not filed`"*, *"`docs/pending.md`'s `SCH-5` row still reads `BLOCKED — awaiting architect go-ahead`"*, *"the `Legs` cell reads `node suite`"* | **STALE — the spec IS FILED and approved, the `E7` row's `Blocked on` cell IS PRESENT and its chain re-read as the family's five legs, and `docs/pending.md`'s `SCH-5` row is annotated by this close-out.** **The as-written residues stay VISIBLE; the live state is the `E7` row's own dated update block and `§7` item 11's new annotation.** |
| **PF-7** | `§8`'s `docs/specs/menulib-greens.md` row and the `docs/FORKER.md` row | *"`OWED` — the gate-5 blind-greens artifact"*; *"the file carries a `U-MENULIB` unit-digest row (reading `BLOCKED`) and NO seam block"* | **STALE — the blind set EXISTS (`28` executed · `26` PASS / `2` FAIL / `6` `NOT-BLIND-RUNNABLE`) and `docs/FORKER.md`'s row now reads `DONE`.** **What remains OWED at that row is its seam/glossary block, which this pass RECORDS as owed and does not write** (its own owner; it gates no unit). |
| **PF-8** | The gate-1 record's `§8` step 4 and its `P-1` row | *"the two provenance copies (`archive/gate1/2026-09-27-E7-gate1-steps1-2.md` and `…-step3-architecture.md`) … not yet written"* | **STALE — BOTH COPIES ARE WRITTEN BY THIS PASS** (`archive/gate1/`, gitignored), **each carrying a provenance banner that attributes every line to this unit's gate-1 record and disclaims independent measurement.** **The gate-1 record is a DENIED path to this unit's spec pass (`§5.1` item 11), so its own cell is annotated by this close-out in the tracker rather than edited here.** |

**WHAT THIS PASS COULD NOT VERIFY, SAID RATHER THAN ASSERTED:** **the six gate-9 leg figures** (`npm test` `71` files / `1756` passed / `2` skipped / `0` failed · `npm run typecheck` `0` · `npm run typecheck:tests` `0` · `npm run build` `0` with the six-artifact census unchanged · the contract's strict `tsc` leg `0` · `npm run divergence` `0` with `R13 RESULT: 9 checks, 0 failures` · `npm run ui` `0` with `UI RESULT: 0 failures (11/11 assertions green)`) **are THE SUPERVISOR'S measurements at `6ec24aa` and are cited as such — this pass ran none of them** (`RCA-12`). **The module's `330`-line census, the test file's `60` rows, the NINE exports in two halves, the EMPTY import census, the `13` register rows with their `126` declared attempts and the four register constants (`DECLARED_TOTAL = 126`, `AS_FILED_DECLARED_TOTAL = 123`, the term table and the six-name `(bounded)` set) WERE re-verified by this pass's own file reads.** **The two `(bounded)`-count and total corrections are confirmed; NO claim in this file was found that this pass could falsify and did not fix.**

### (3) GATE 8 — THE PER-UNIT DOCUMENTATION REVIEW (RECONCILED AGAINST THE ACTUAL BUILD)

**THE REVIEW RAN IN THIS SAME PASS AND ITS RECORD IS `archive/reviews/2026-09-27-U-MENULIB-doc-review.md`** (gitignored — provenance only; **every finding that needed action landed in the active trackers in the same pass**). **It reconciled this spec + `docs/specs/menu-template-greens.md` + the active trackers against the ACTUAL build, and it is HONESTLY RECORDED THAT GATES 7 AND 8 WERE FOLDED INTO ONE CLOSE-OUT PASS RATHER THAN RUN AS TWO** — because this is the unit's final close-out and `AGENTS.md` item 10a forbids returning for a gate-advance permission: **one pass did the proofreading and the build-reconciliation together, and both records are dated as this pass's.** **THE ARCHIVAL-LOOP ACTIONS THIS PASS TOOK** (`AGENTS.md` item 6): the two `archive/gate1/` provenance copies were written; the blind set and the gate-1 record received dated close-out annotations; `docs/pending.md`'s `SCH-5` row and `§L-4f` were annotated/closed beside themselves (never rewritten); `docs/decisions.md` received the close-out note at the head of its note list; `docs/FORKER.md`'s `U-MENULIB` row was moved to `DONE` with its seam/glossary obligation stated as OWED; and **no citation points at a moved file** (nothing was archived away from a live anchor).

### (4) GATE 10 — THE DONE ROW, THE LEDGER MOVE AND THE TRACKER RECONCILIATION

**`U-MENULIB` (`E7`) IS `DONE`** — **the ledger's SIXTEENTH `DONE` row** — and its record is **`docs/next-steps.md`'s `## DONE — U-MENULIB`** section, written to this file's `§5.3` **twelve-item shape**, with **every item filled and every unfillable one stated as OWED rather than invented.** **THE LEDGER MOVE: `E7` becomes `E7 — MOVED TO DONE (2026-09-27)` — the row KEPT, its cells annotated as SPENT PROVENANCE, with a pointer to the record — and every count the move changes is corrected in the same pass: `16 DONE / 5 open` UNITS = `21` units (`16 + 5 = 21`), the open set `E8` · `E9` · `F1` · `F2` · `F3` = `5`, `22` live rows = `21` unit rows + the non-unit fork row `F4`, and the `MOVED TO DONE` label set identical to the `DONE` set at `16`.** **THE NEXT ACTION IS `E8` (`U-THEME`) AT ITS SPEC GATE** — its dependency `E7` is now `DONE` — **and `E9` is blocked on `E8` + `H-r7`, while both remaining `E`-group specs stay `OWED — not filed` and `F1` is the next UI unit owing the MANDATORY live battery.** **THE `## ⟶ HANDOVER — E7 …` SECTION (with its ROUND-2 and ROUND-3 addenda) IS ANNOTATED `SUPERSEDED BY THE CLOSE-OUT`** with a dated pointer, **its content kept as the mid-cycle record.** **THIS FILE'S OWN `CURRENT STATE` RECEIVES ITS CLOSE-OUT ITEM (item 10, appended there), and `§7` item 11's tracker residues are discharged or re-parked with owners.** **THE REGISTER IS UNTOUCHED: `13` rows / `13` terms / `126` declared, all `126` executed with `broken 0` on every row and `registerStoppedAt: null`, seed `20260927`** (the supervisor's reading at `6ec24aa`). **THE TERM VERDICT, PRINTED WITH ITS TERMS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): `126` = `12` (`P-ML-IM-1`) + `12` (`IM-2`) + `12` (`IM-3`) + `12` (`IM-4`) + `12` (`IM-5`) + `12` (`IM-6`) + `12` (`IM-7`) + `3` (`SM-1`) + `3` (`SM-2`) + `3` (`SM-3`) + `12` (`TP-1`) + `9` (`TP-2`) + `12` (`TP-3`) — **unchanged by this close-out, as it is unchanged by every pin of `§3c`/`§3d`/`§3e`.** **NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR `(bounded)` MARKING MOVED IN THIS PASS.**

**THE HONEST LIMITS OF THIS CLOSE-OUT, EACH STATED AS OWED AND NONE AS COVERED:** **(a) GATE 9 WAS NOT RE-RUN BY THIS PASS** — the figures are the supervisor's; **(b) `docs/FORKER.md`'s `U-MENULIB` SEAM BLOCK AND ADOPTED-NAME GLOSSARY — OWED**, owner: whatever pass next touches that file, and it gates no unit; **(c) THE BLIND SET'S TARGETED RE-DRIVE — OWED**, recorded in `docs/specs/menu-template-greens.md`'s own `POST-GREEN` clause and re-stated by its close-out annotation; **(d) `§5.5.2` item 10's LONE-SURROGATE COVERAGE GAP — OWED** (`P-ML-IM-7` `12 → 13`, total `126 → 127`, `IM 84 → 85`); **(e) PIN 3's builder-answer arm, IF a later pass adds it as a further register drive — OWED and never substituted for (d)**; **(f) the `docs/specs/menulib-review.md` `§8` step-4 pointer that still names the provenance copies as unwritten — corrected by this pass's copies plus its own close-out annotation, with the record's own bytes left to its own gate.**
