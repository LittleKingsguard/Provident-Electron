# Spec — `U-STORE-MODULES-SEAMS` (`H2b`): the CALLER/SEAM-SIDE OBLIGATIONS — the seam/store-backed implementations of the six, landed at the CALLER (overlay + theme), recorded-not-landed (menu-template), and VERIFIED on the two the pane-drag unit already landed (gutter + relocate)

**Unit `H2b` · `U-STORE-MODULES-SEAMS` — the second child of the `H2` split; the architect's *"Split per module"* ruling
(2026-10-03, `docs/decisions.md`'s ACTIVE row **`DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE`**, cited by ROW NAME, with
its `D-GP-SAD-5` decomposition row dispositioned on that record) · the split's second bucket: **`D-GP-SAD-5`'s (ii) THE
CALLER/SEAM-SIDE SIX** — `gutter.ts` + `relocate.ts` (LANDED already by `U-PANE-DRAG-COMPLIANCE`) + `overlay.ts` + `theme.ts` +
`menu-template.ts` (LATENT) + `focus-model.ts` (whose `persist` seam already exists and whose own bytes do NOT move) ·
**`focus-model.ts` is NOT here — its obligation is `H1`'s (`U-STORE-FOCUS`, `docs/next-steps.md` row `H1`)** · derives the
named store obligations from the four-tier plan's round-3 named-obligation table (`docs/specs/data-ownership-model-plan.md`
`§5.2.7`'s round-3 table, rows **11** (`overlay.ts`), **12** (`theme.ts`, the FLAG ROW) and **7** (`menu-template.ts`, LATENT),
plus rows **3**/`4` cited for the VERIFICATION half; the byte terms **`15 = 2 + 6 + 7`**, the `6` being THIS child's set,
`§5.6.1`'s recomputed figures and `§5.6.5`'s round-3 block) · derives the store-side surface from the FROZEN store contract
(`docs/specs/store-core-graph.md` `§2.1`'s `GraphStore` block, `§2.8`'s write surface, `§2.10`'s event surface, `§2.11`'s
realm rule; `§2.6`'s caller-spelling discipline is carried by the plan's `§1.3` `R-1`/`R-2`/`R-3`/`R-6`, cited) · the
landed modules' own contracts are `docs/specs/overlay.md`, `docs/specs/theme.md`, `docs/specs/menulib.md` (the module
`src/shared/menu-template.ts` has NO spec of its own name — `menulib.md` is `U-MENULIB`'s landed contract and the plan's
`§5.2.7` row 7 `F-11` is the latent row's authority) · the sibling boundary is `docs/specs/store-modules-bytes.md` (the
BYTE-MOVING PAIR, `H2a`) · the VERIFICATION half's landed authority is `docs/specs/pane-drag-compliance.md` `§2.1`
deliverables A/B and `§2.3`/`§2.4`, landed at `src/renderer/renderer.ts`'s `createPaneDrag` composition at the signing of
the sibling · filed 2026-10-03 (machine clock).**

**THE UNIT'S THREE AUTHORITY CLUSTERS, STATED ONCE. (1) THE SPLIT RULING** — `docs/decisions.md`'s
`DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (2026-10-03; its `D-GP-SAD-5` decomposition row: `recommendation =
SPLIT-RECOMMENDED` · `proposed fraction` = the plan's OWN byte terms `15 = 2 byte-moving + 6 caller/seam-side + 7 pure` ·
`boundary (named)` = **(i) THE BYTE-MOVING PAIR** — `owned-list-host.ts` + `slot-host.ts` (→ `H2a`'s) · **(ii) THE
CALLER/SEAM-SIDE SIX** — `gutter.ts` + `relocate.ts` (LANDED already by `U-PANE-DRAG-COMPLIANCE`) + `overlay.ts` +
`theme.ts` + `menu-template.ts` (LATENT) + `focus-model.ts` (`H1`'s) · `remainder / coherent core` = the SIX's shared core
is the CALLER's wiring and the SEAM implementations — the consuming project's own composition, NOT a mechanism module's
bytes). **(2) THE `H2b` QUEUE ROW** — `docs/next-steps.md` row **`H2b`**: the six modules whose obligation lands at the
CALLER or at an INJECTED SEAM — their own bytes do NOT move (`§5.6.1`'s `6`, printed with its terms); `overlay.ts`
(reads/writes `mem.overlay.<name>.state`; the returned inert declaration stays RETURNED and is never applied by the module
or the store — `E5-B-1`); `theme.ts` (reads `file.settings.theme.token` at the CALLER's resolution site; `resolveTheme(setting,
env)` keeps its injected `env`; theme's EMPTY IMPORT CENSUS is the flag row); `menu-template.ts` (LATENT — disposition
recorded-not-landed); plus the VERIFICATION half on `gutter.ts`/`relocate.ts` whose reads `U-PANE-DRAG-COMPLIANCE` already
LANDED (plan rows 3/4) — this child VERIFIES, it does not re-land (a re-land would be a second authority); the spec cell
(`OWED — not filed`, path `docs/specs/store-modules-seams.md` verified free 2026-10-03) and the TWO DECISIONS OWED AT THIS
SPEC GATE: **(a)** `menu-template`'s latent row — land-when-a-consumer-exists vs record-only (the plan's `F-11`) and
**(b)** whether `theme`'s caller-site read lands in `renderer.ts`'s wiring (licensed to `U-STORE-CORE`/`U-PANE-DRAG-COMPLIANCE`
artifacts, not this child) or in a declared home of this unit's. **(3) THE FROZEN STORE SURFACE** — `store-core-graph.md`
`§2.1` (the `GraphStore` block: `resolve`'s `GraphResolveResult = GraphReadHit | GraphReadMiss` with `{found, value, tier,
flag, cache, name}` per arm; the tier-qualified `tiers['<tier>'].get` — `GraphTierGetResult`; `subscribe` returning
`GraphSubscription = {name, subtree, unsubscribe(): boolean}`), `§2.8` (the write surface: `set` NEVER MINTS — a `set` on a
path with NO node is refused `'undeclared-name'`; `commit` MINTS and re-mints, routes a repeat to the pair's declared
outcome; `remove('temp.x')` clears temp ONLY, `remove('file.x')` downward — `R3-6`), `§2.10` items 1–6 (the eight-arm event
surface; one subscription per realm per reference; `unsubscribe()` `true`-then-`false`), `§2.11` item 1 (the realm rule:
one store per realm, at boot, held by the wiring — **never in a module-level binding**).**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **THIS SPEC CARRIES NO LENGTH
CENSUS OF ANY FILE** (a line-count census drifts on every pass — the sibling convention). **`docs/decisions.md` rows are
cited BY ROW NAME; `docs/next-steps.md` BY ROW ID; `docs/pending.md` BY §/clause.** **ONE FILE, ONE CONCERN: this unit's
concern is the caller/seam-side store obligations of the SIX and the verification half on the two the pane-drag unit
landed — the sibling byte-moving pair is `H2a`'s (`docs/specs/store-modules-bytes.md`) and is OUT OF SCOPE here, and the
`focus-model` obligation is `H1`'s (`U-STORE-FOCUS`) and is OUT OF SCOPE here.**

**LAYER LABELS (`RCA-12`), binding on every behavioural claim below:** **[T]** node suite / pure module layer · **[H]**
this repo's `src/**` · **[U]** the real-DOM `ui` leg · **[D]** the divergence leg · **APP** the assembled app.

---

## CURRENT STATE (2026-10-03) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note — the
placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY. THE THREE MODULES EXIST AND ARE GREEN AS THEIR OWN LANDED UNITS; THEIR CALLER-SIDE STORE
   EDGES DO NOT EXIST, AND NOTHING OF THIS UNIT IS IMPLEMENTED.** This pass wrote **exactly ONE NEW FILE —
   `docs/specs/store-modules-seams.md` (this contract) — and edited NO existing file**: not the landed module specs, not
   the plan, not the store contract, not the pane-drag spec, not a tracker, not `docs/decisions.md`, not `AGENTS.md`, not
   `package.json`, and no `src/**` or `tests/**` byte. **The modules are the LANDED artifacts of `U-OVERLAY` (`E9`),
   `U-THEME` (`E8`) and `U-MENULIB` (`E7`)**: `src/shared/overlay.ts` (`2` value + `3` type exports = `5` exported names,
   `0` import statements, imported by NO `src/**` file — `overlay.md` `§3.5`'s no-importer probe; its landed no-store row
   is `§2.2 P-OV-4`, with `I-4` and the `R-3`/`R-6` statics), `src/shared/theme.ts` (`2` value + `3` type exports = `5`
   exported names, `0` import statements, imported by NO `src/**` file — `theme.md` item 9's own reading and `§3.5 X-4`;
   its no-store rows are `§2.2 P-TH-4`/`P-TH-11`/`P-TH-12`, ruling 3's persistence boundary, item 6 and `§3.3 I-4`) and
   `src/shared/menu-template.ts` (`9` exports in two halves, `0` import statements — the EMPTY IMPORT CENSUS the plan's
   `F-11` names — imported by NO `src/**` file — `menulib.md` `§3.5 X-1`/`I-9`/`I-10`; its no-store row is `§2.2 P-ML-4`).
   **Their caller-side store seams — the overlay state turn, the theme resolution site, the menu catalog resolution
   (recorded) — ALL DO NOT EXIST YET; the test file (`tests/store-modules-seams.test.ts`) does not exist; no red set has
   been authored; and no in-tree `src/**` file imports `resolveTheme`, `overlayTransition` or `buildMenuTemplate` (the
   flag probes `E-OV-1`/`E-TH-1`/`E-MT-1` re-verify at red time).** The verification half's subject — the pane-drag-l
   store-backed reads — **IS LANDED and GREEN**: `U-PANE-DRAG-COMPLIANCE` landed `src/renderer/renderer.ts`'s exported
   `createPaneDrag(store, source)` composition (its `tierRead` route answers `resolve('mem.layout.pane.<id>.size')` /
   `…bounds`, `mem.layout.zone.<id>.slot` / `…distance`; the `startSizeOf`/`defaultSizeFor`/`boundsOf`/`candidatesFor`
   seam implementations are store-backed, per `pane-drag-compliance.md` `§2.1` A/B, its `§5.1` row 1 and the gate-8
   annotation of that row). The unit is **`OWED` at every gate after this one**, and it is **NOT delegable until a
   TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).** **The store itself is LANDED-GREEN and
   FROZEN-artifacted** (`store-core-graph.md`; the storage module wave `FROZEN` 2026-10-03; the freeze records at
   `docs/specs/store-core-module-store-core-graph-surface.md` field 8): **this unit changes NO store byte and NO store
   member (`§2.7` prohibition 2).**

2. **THE SURFACE THIS FILING PINS (none of it exists in `src` yet):** the unit declares **TWO NEW WIRING FILES — under
   `src/renderer/`** — `src/renderer/overlay-store.ts` (the caller-side overlay state turn: reads/writes
   `mem.overlay.<name>.state` through the store; the returned inert declaration stays RETURNED and is NEVER applied —
   `E5-B-1`) and `src/renderer/theme-store.ts` (the caller's theme resolution site: reads `file.settings.theme.token`
   and passes the value as `resolveTheme(setting, env)`'s parameter, keeping the module's injected `env`; the declared
   default-seed rule on a miss) — **THE THEME-LICENCE DECISION, MADE HERE (`§2.3`): the resolution site lands in the NEW
   declared file, NOT in `renderer.ts`'s wiring, and `renderer.ts` stays BYTE-IDENTICAL; no licence carve-out is owed and
   none is declared.** The **`menu-template` LATENT DISPOSITION IS DECIDED HERE AS RECORDED-NOT-LANDED (`§2.4`)**: the
   obligation is DECLARED (the caller's future resolution site reads `file.menu.catalog` and hands it to the module), its
   landing is OWED until a consumer exists, and the register drives the module-side rows plus the no-consumer probe. The
   **VERIFICATION half (`§2.5`)** drives the LANDED `createPaneDrag` seam implementations against a recording store
   double and asserts the store-backed route — and its falsifier is the SECOND READ AUTHORITY (a module-held or
   second-closure value consulted for the same size/slot FAILS). **The three modules' OWN bytes do NOT move — their
   landed censuses (including theme's EMPTY IMPORT CENSUS, THE FLAG ROW) are UNCHANGED and RE-VERIFIED by the register's
   import-census rows (`§5.5.1`) — that is the `6` of `15 = 2 + 6 + 7`. The caller files MAY import the store (the
   caller is the store-backed party); the modules import NOTHING (`§2.6`).**

3. **THE REGISTER (`§5.5.1`): `9` typed rows — `6` `P-IM` + `3` `P-TP` — `108` declared attempts, printed WITH their
   nine terms and with a term-by-term addition at `§5.5.3`**, **`9` strategy ids (`S-SMS-*`)**, **NO generator, NO pinned
   seed, NO new dependency** (plain deterministic vitest tables — `AGENTS.md` item 11(d), the `engine-pin` precedent) and
   **`0` `(bounded)` rows** (each row quantifies over the exact table it drives). **Three rows per module — the plan's
   `§5.2.7` round-3 item (4) set: (a) the IMPORT-CENSUS `P-IM` row with its positive control — over the MODULE's bytes
   (kept UNCHANGED; theme's is the flag row) PLUS the caller-file census the register drives (overlay/theme: the NEW
   wiring file's declared name-complete import set; menu-template: the no-consumer ABSENCE probe, because its caller-file
   half is recorded-not-landed) · (b) the NO-MODULE-LEVEL-BINDING `P-IM` row OF THE CALLER FILE (the store arrives ONLY
   as a declared call parameter of the wiring factory — never a module-scope binding; renderer.ts's own wired binding is
   the reason the resolution site does NOT land there, `§2.3` item 3) · (c) the STORE-STATE-INDEPENDENCE TWO-RUN
   DIFFERENTIAL `P-TP` row (COLD / SHADOWING / COMMITTED), with the round-3 comparator ruling (`R-3`): `===` only where
   the answer is a primitive; canonical structural comparison for the record answers (own enumerable keys, sorted,
   primitives by value; no deep-equality dependency).** **The caps are compared against the DECLARED figures:
   `108 ≤ 400` ✔ · per-row maximum `25` (`P-SMS-*-TP-1`) ≤ `100` ✔** · stop-after-5-consecutive-failures applies per row;
   **an un-run register row is reported as a FAILURE, never as a pass** (`AGENTS.md` item 11(b)); the `≤8` per-module
   component-breakdown signal is an OUTCOME, not a budget — each module carries exactly its `3` mandated rows
   (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).**

4. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the whole of this unit's green, in **the unit's OWN
   NEW test file `tests/store-modules-seams.test.ts`** (the `H2a` F-2 lesson: a unit's red set lives in the unit's own
   file; the landed suites `tests/overlay.test.ts` / `tests/theme.test.ts` / `tests/menu-template.test.ts` REMAIN the
   implementations' own regression homes, UNEDITED) — plus **`npm run typecheck` `[H]`** (`src/**` ONLY — it never reads
   `tests/**`), **`npm run typecheck:tests` `[H]`** (the ADDITIVE fourth leg — the ONLY typecheck leg that reads a test
   file, `AGENTS.md` item 4's ruled clause), **`npm run build` `[H]`**, and a **standalone strict `tsc --noEmit` over
   this unit's own test file** (`§5.2`). **NO `[U]` ROW IS OFFERED and `[D]` IS NOT CLAIMED — both refusals are
   STRUCTURAL** (`§6`): the new wiring files are imported by NO `src/**` file (their in-app boot composition is the
   consuming project's composition, per the split ruling's `remainder / coherent core` cell — exactly as the pane-drag
   unit's M-12 drove its composition module-externally), the three modules stay imported by no `src/**` file, and the
   verification half re-drives LANDED seam implementations with recording doubles in the `[T]` layer. **GATE 6 IS
   `STRUCTURAL`, never `waived`.** **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED,
   AND NO REPORT IS DUE:** this unit authors **no element, no envelope node, no handler body, no component binding and no
   control** (limb A absent — the wiring files are mechanism-side composition closures, not UI content; `UI-RENDERED-WITH-PROVIDENT`
   has no element of this unit's to apply to) and **no assembled rendered flow changes** (limb B absent — no in-tree
   consumer exists), so the admissible form is NO report; a zero-row report is INVALID (`§6`).**

5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT audit,
   no blind-greens record, no per-unit documentation review and no DONE row (`§5.3` fixes its shape).

6. **THE TWO DECISIONS THE QUEUE ROW LEFT OPEN ARE DECIDED HERE, EACH WITH ITS REASON, SO THE RED SET IS AUTHORABLE
   TODAY — AND NEITHER IS ROUTED TO THE ARCHITECT**: **(a) THE THEME-LICENCE QUESTION = THE NEW DECLARED FILE (`§2.3`'s
   decision block with the four-part reason)** — the read lands in the unit's OWN new wiring file `src/renderer/theme-store.ts`,
   NOT in `renderer.ts`'s wiring (whose store-wiring bytes are licensed to `U-STORE-CORE`'s boot seam and
   `U-PANE-DRAG-COMPLIANCE`'s drag-chain composition, each job's contract carrying *"and nothing else"*); **(b) THE
   MENU-TEMPLATE LATENT ROW = RECORDED-NOT-LANDED (`§2.4`)** — the disposition the queue row itself names, with the
   plan's `F-11` as the recorded condition and the land-when-a-consumer-exists arm as the REVISIT CONDITION, not as
   today's disposition.** **No other decision blocks: the overlay caller's subscription posture (§2.2 item 5 — NO store
   subscription: the turn's read IS the observation), the default-seed rule's write posture (§2.3 item 4 — the miss
   answers the declared seed WITHOUT a store write; the next write turn re-mints, the `H2a` MISS-rule shape), and the
   verification half's recorded reading of `gutter.md`'s `§2.2 P-9`/`P-10` (the module's binary rows SURVIVE — the store
   edge is the CALLER's, `§2.5` item 4) are DECLARED as working defaults with their landing rows, and `§7a.1` carries the
   five-item decision/working-default ledger — NOTHING is `undefined-until-answered`.**

7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO tracker):** the
   `H2b` queue row's spec cell still reads **`OWED — not filed`** (this file is that filing); **the live ledger
   arithmetic, stated with its terms: `H2a` is the ledger's TWENTY-FIFTH `DONE` row (its own DONE record's ordinal; the
   wave-`H` count consequence: the `H2` split ADDS one unit row, so the unit total is `30`), the open set is
   `G1` · `G2` · `G3` · `H1` · `H2b` = `5` open units, and `25 DONE + 5 OPEN = 30` units — the `H2b` queue row's
   move to DONE closes the wave-`H` children at gate 10**; and **`docs/pending.md` §Q's theme-token PENDING REBUILD
   cell FLIPS WHEN THIS UNIT LANDS, at the gate-10 DONE-row pass — THE MECHANISM-SET FLIP THE `H2` ROW'S LAST CELL
   NAMES: the theme-token flow becomes COMPLIANT under the §Q two-rule criterion once the store-backed resolution
   site and the register rows are landed (`docs/pending.md` §Q's mechanism-set cell + its `PENDING-REBUILD` one-line
   block) — this filing flips NOTHING in §Q.**

8. **`docs/skills/designing-pages.md` DOES NOT EXIST** (the sibling filings' globbed finding: `docs/skills/` holds
   `process-guardrails.md` alone), so **there is no test-use-case coverage matrix and no demo-page index to update — and
   this unit renders no page, authors no element and updates no page-design skill** (`§6`).

9. **THE AMENDMENT SET THIS UNIT OWES TO THE LANDED SPECS, NAMED ONCE SO THE LANDING PASS NEED NOT RE-DERIVE IT**
   (`§2.7` item 7, `§5.1`): the plan's round-3 reading — the caller/seam-side modules' own import censuses are
   RE-WORDED where a landed row forbids a store, and are NOT BROKEN by a store import (`data-ownership-model-plan.md`
   line 1596's round-3 block, `§5.9` rows 6/20's general-form supersession applied per contract) — lands as
   **ANNOTATED-BESIDE amendments (`RCA-8(d)`, dated, never a rewrite)** to `docs/specs/overlay.md` (`§2.2 P-OV-4`, `§3.3
   I-4`, `§3.4 R-3` — the no-store clause re-read BESIDE: the MODULE keeps zero imports and zero store bytes, the store
   edge lives at the caller file THIS UNIT declares), `docs/specs/theme.md` (item 6, ruling 3's persistence boundary,
   `§2.2 P-TH-4`/`P-TH-11`/`P-TH-12`, `§3.3 I-4` — the `A-d6` boundary's *"this repo owns no UI-config store"* half is
   SUPERSEDED BESIDE by the plan's `§5.9` row 21; the authored-control half and the module's zero-import census stay),
   `docs/specs/menulib.md` (`§2.2 P-ML-4`, `§3.3 I-9`/`I-10` — same reading; the LATENT disposition is recorded here
   and the module byte stays unread by any store) and — under the VERIFICATION half's recorded reading — `docs/specs/gutter.md`
   (`§2.2 P-9`/`P-10`, per the plan's `§5.9` rows 1/2 re-wording: *"no sibling-mechanism edge; a store edge is admitted
   AT THE CALLER"*) and `docs/specs/relocate.md` (`§2.2 P-6`, `§3.3 I-13`, `§3.4 R-2`/`R-6` — same re-reading). The
   `focus-model.md`/`focus-tool.md` amendment set is `H1`'s, NOT this unit's (`§1`). **THIS FILING EXECUTES NONE OF THE
   AMENDMENTS — the sibling `H2a` precedent: the set is named here so the unit's LANDING/detection pass (its gate-4's
   doc-review counterpart, `§3b`'s `DOC-REVIEW-ITEM` class) lands them as dated annotations, keeping every landed byte
   visible.** The `docs/FORKER.md` re-recording pass is `Q-14`'s (owed AFTER the store units land — `§5.6.4`), and the
   `§Q` flip is item 7's.**

10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no test run, no leg
    run, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command, no commit.** The
    new file is **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate commit rule; `RCA-8(c)` — it
    is a NEW file).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** **Every ruling is
cited by §/row id or ROW NAME, never restated in words that weaken it.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **THE `H2` SPLIT** — `docs/decisions.md` `DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (2026-10-03); its `D-GP-SAD-5` decomposition row: the caller/seam-side SIX land at the CALLER or the SEAM, their own bytes do NOT move; `focus-model.ts` is `H1`'s; the SIX's shared core is the consuming project's composition | `§1`, `§2.1`, `§2.2`–`§2.5` |
| **2** | **THE `H2b` QUEUE ROW** — `docs/next-steps.md` row `H2b`: the six modules' named obligations (`overlay`'s `mem.overlay.<name>.state` read/write + the `E5-B-1` never-applied declaration; `theme`'s `file.settings.theme.token` read at the CALLER'S RESOLUTION SITE with the EMPTY IMPORT CENSUS as the flag row; `menu-template`'s LATENT recorded-not-landed disposition; the VERIFICATION half on `gutter`/`relocate` — VERIFY, never re-land) and the two spec-gate decisions (the theme licence; the latent disposition) | `§2.1`–`§2.5`, `§5.5.1` |
| **3** | **THE PLAN's NAMED OBLIGATION, ROW 11** — `data-ownership-model-plan.md` `§5.2.7`'s round-3 table: `overlay.ts` — **the CALLER holds the store state and hands the transition its inputs; the returned inert declaration stays RETURNED and is never applied** (`E5-B-1`) · **NO byte change** | `§2.2`, rows `M-OV-*`/`F-OV-*` |
| **4** | **THE PLAN's NAMED OBLIGATION, ROW 12 — THE FLAG ROW** — same table: `theme.ts` — **the CALLER'S RESOLUTION SITE: the wiring reads the appearance setting from the store (or a registered default) and passes it as `resolveTheme(setting, env)`'s parameter — plus the declared DEFAULT-SEED rule for a miss** · **NO byte change — the as-filed *"its bytes move"* is RETRACTED BESIDE (`§5.2.7`'s round-3 block; `§5.6.5`'s round-3 terms; step 2's `R-1`, FIXED by `R3-4` at `§5.10`)** | `§2.3`, rows `M-TH-*`/`F-TH-*` |
| **5** | **THE PLAN's NAMED OBLIGATION, ROW 7 — LATENT** — same table: `menu-template.ts` — **LATENT: when a menu consumer ships, the CALLER resolves the catalog from the store and hands it in — no consumer exists today (`F-11`), so the obligation is CONDITIONAL and named, not shipped** · **NO byte change** (the byte move `§5.6.5` lists for it is withdrawn beside) | `§2.4`, rows `M-MT-*`/`E-MT-1` |
| **6** | **THE PLAN's NAMED OBLIGATIONS, ROWS 3/4 — THE VERIFICATION HALF'S SUBJECT** — same table: `gutter.ts` reads `layout.pane.<id>.size`/`layout.pane.<id>.bounds` via the CALLER's injected seam implementations (`defaultSizeFor`/`boundsOf`, wired by `E10`), writes NOTHING (the sink stays the consumer's commit seam); `relocate.ts` reads `layout.zone.<id>.slot` (opaque) and `layout.zone.<id>.distance` (a caller-measured scalar) via the reader callbacks injected at `createRelocateSession`'s options — **BOTH LANDED by `U-PANE-DRAG-COMPLIANCE` (pane-drag-compliance.md `§2.1` A/B, `§2.3`/`§2.4`, landed at `renderer.ts`'s `createPaneDrag`)** — **this child VERIFIES, never re-lands (a re-land would be a second authority)** | `§2.5`, rows `M-PDV-*`/`F-PDV-*`/`E-PDV-1` |
| **7** | **THE BYTE TERMS** — `§5.2.7`'s round-3 block and `§5.6.1`/`§5.6.5`'s round-3 blocks: **`15 = 2 byte-moving + 6 caller/seam-side + 7 pure`** (`§5.6.1`'s recomputed figures printed with their terms at `data-ownership-model-plan.md` `§5.6.1`); the fork's re-digest set shrinks to TWO modules; the `6` is the caller/seam-side set | `§1`, `§5.1`, `§6` |
| **8** | **THE THREE REGISTER ROWS** — `§5.2.7` round-3 item (4), carried by `§6.5`'s `U-STORE-MODULES` row: per store-backed module — (a) the import-census `P-IM` row with a POSITIVE CONTROL (`container.md` `§3.4` `R-1` / `zones.md` `§3.4` `R-3` scanner pattern), (b) the NO-MODULE-LEVEL-BINDING `P-IM` row (the store handle ONLY as a declared call parameter — the `F-12` shape `dom-shim.ts` records), (c) the STORE-STATE-INDEPENDENCE DIFFERENTIAL `P-TP`/`P-IM` row, TWO-RUN: COLD / SHADOWING (`temp`/`mem`) / COMMITTED (`file`); the comparator is the round-3 `R-3` rule (canonical structural comparison for object answers, `===` for primitives); the row carries its own strategy id / held-broken cell | `§5.5.1` rows `P-SMS-*-IM-1`/`-2`/`-TP-1` |
| **9** | **THE CALLER-OWNED-SPELLING RULE** — plan `§1.3` `R-1`/`R-2`/`R-3`/`R-5`/`R-6` (the store OWNS NO VOCABULARY; *"a declared name is a declaration of the CALLER'S spelling, not a vocabulary the store owns"*; one spelling, one home; no reference names an engine id) | `§2.6` |
| **10** | **THE FROZEN STORE SURFACE** — `store-core-graph.md` `§2.1` (the `GraphStore` block; `GraphResolveResult = GraphReadHit | GraphReadMiss` with the `{found, value, tier, flag, cache, name}` members; `GraphSubscription = {name, subtree, unsubscribe(): boolean}`; `GraphTierGetResult`), `§2.8` (the write surface: `set` NEVER MINTS — refused `'undeclared-name'` on a path with no node; `commit` MINTS and re-mints; a tier-free write is refused `'malformed-name'`), `§2.10` items 1–6 (the event surface; one subscription per realm per reference; `unsubscribe()` `true`-then-`false`; a throwing listener never propagating), `§2.11` item 1 (one store per realm, at boot, held by the wiring, never in a module-level binding) | `§2.1`–`§2.5`, `§3.2 F-OV-2`/`F-TH-3` |
| **11** | **THE THROWING-SUPPLY ABSORPTION** — `docs/decisions.md` `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION` (cited by row name): a throwing caller-supplied constraint/repair — and by extension any hostile store/seam call inside a wiring turn — is ABSORBED at the WIRING TURN, never at the store's evaluation; the store's closed refusal surface is unchanged | `§2.2` items 3/4, `§2.3` items 2/5, `§2.5` item 3, `§3.2 F-OV-3`/`F-TH-4` |
| **12** | **THE LANDED MODULES' OWN CONTRACTS** — `docs/specs/overlay.md` (the `E5-B-1` declaration class `§2.4`; the four-state machine `§2.3`; `P-OV-4`/`I-4`; the no-importer probe `R-6`; the register `§5.5.1` `13` rows / `104` attempts), `docs/specs/theme.md` (`resolveTheme(setting, env): ThemeResolution` with `{setting, prefersDark, source}` and the closed `'env' | 'degraded-env'` domain `§2.1`/`§2.3`; `applyThemeDeclaration(attributeName, resolved): ThemeAttributeWrite` `§2.4`; `P-TH-4`/`P-TH-11`/`P-TH-12`; the register `§5.5.1`), `docs/specs/menulib.md` (`buildMenuTemplate`/`normalizeCatalog`/`selectCatalogItem`, `P-ML-4`, `I-9`/`I-10`, the register `13` rows / `126` attempts) — **the rows this unit's landing pass AMENDS BESIDE (`§2.7` item 7) and the rows it MUST NOT break** | `§2.2`–`§2.4`, `§3`, `§5.1` |
| **13** | **THE PANE-DRAG LANDING** — `docs/specs/pane-drag-compliance.md` `§2.1` A/B (the store-backed seam implementations and their signatures), `§2.3` items 1/2 (the zone-render listener), `§2.4`'s nine stored names (names 1–4 the verification half's referents), `§5.1` row 1 (the landed wiring delta: `createPaneDrag(store, source)` at `src/renderer/renderer.ts`; the boot site unchanged); **the mechanism modules' bytes are UNCHANGED (`§3.4 R-1`)** | `§2.5`, rows `M-PDV-*`/`S-PDV-*`/`E-PDV-*` |
| **14** | **THE REGISTER DISCIPLINE** — `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` (all cited by row name, `docs/decisions.md`): a code-bearing unit's spec MUST carry its typed register BEFORE the red set; a declared term is a DRIVE count; the total is printed WITH its terms; an un-run row is a FAILURE | `§5.5` |
| **15** | **THE SIBLING BOUNDARY** — `docs/specs/store-modules-bytes.md` (`H2a`): the BYTE-MOVING PAIR's spec + register-row shape (`P-IM`/`P-IM`/`P-TP` per module with strategy ids, printed terms, caps); the `H2b` file was `OWED` at the sibling's own citations | `§1`, `§5.5.1` |
| **16** | **THE PURE-SIDE / PERSISTENCE BOUNDARY ROWS** — plan `§5.9` rows 1/2 (gutter's `P-9`/`P-10` re-wording), 6/20 (the general-form no-store supersession, applied per contract), 21 (theme's persistence boundary superseded FOR THE BOUNDARY; the authored-control half survives), 24 (`E5-B-1` stays returned-and-never-applied); `§5.10`'s round-3 `R-1`/`R-2` (the theme re-verdict and the pure-side negative row, both FIXED by `R3-4`) — **the plan's answers, recorded so no clause here re-opens them** | `§2.2`–`§2.5`, `§2.7` item 7, `§5.1` |
| **17** | **THE ONE-RED-SET / ONE-GREEN PER UNIT** — `AGENTS.md` item 9 / RCA-1 (red first, run and reported), `RCA-2` (a multi-unit deliverable is split PER UNIT — this unit IS the split child) | `§4.1`, `§4.5` |

---

## 1. Scope

**One deliverable: the caller/seam-side store obligations of the SIX — the store-backed overlay state turn (NEW wiring
file), the store-backed theme resolution site (NEW wiring file), the menu-template LATENT disposition (recorded-not-landed
with the register's module-side rows), and the VERIFICATION half on the gutter/relocate reads the pane-drag unit already
landed (verify, never re-land) — plus the three register rows per module and the amendment set to the landed specs.**

1. **What it is, in one sentence.** The `6` of `15 = 2 + 6 + 7` lands: `src/renderer/overlay-store.ts` reads/writes
   `mem.overlay.<name>.state` and hands the transition its inputs (the returned inert declaration stays RETURNED —
   `E5-B-1`); `src/renderer/theme-store.ts` reads `file.settings.theme.token` and passes it as `resolveTheme(setting,
   env)`'s parameter (the declared default-seed rule on a miss); `menu-template.ts`'s obligation is RECORDED-NOT-LANDED
   (the declared `file.menu.catalog` read at the caller's future resolution site, `F-11`); and the pane-drag-l reads are
   VERIFIED store-backed with the second-read-authority falsifier.
2. **What it is NOT.** It is **not** `H2a` (the byte-moving pair — `docs/specs/store-modules-bytes.md`); **not** `H1`
   (`U-STORE-FOCUS` — `focus-model.ts`'s `persist` seam target is that unit's, `docs/next-steps.md` row `H1`); **not** a
   store change (the store is FROZEN — `§2.7` prohibition 2); **not** a re-landing pass on `gutter.ts`/`relocate.ts`
   (their reads landed with `U-PANE-DRAG-COMPLIANCE`; a second store read implementation for the same references is a
   SECOND AUTHORITY and FAILS `F-PDV-1`); **not** the `Q-14` fork-facing recording pass (owed AFTER the store units
   land, `data-ownership-model-plan.md` `§5.6.4`); **not** the `§5.9.1` sweep (owed to the first admitted store unit);
   **not** a page design (`§6`).
3. **What the unit may land.** The TWO NEW wiring files + the unit's OWN test file + this spec + the unit's own
   `*-greens.md`/record artifacts + the annotated-beside amendment set of `§2.7` item 7 at the landing pass. **No other
   file's bytes move** — and in particular NO byte of `src/shared/overlay.ts`, `src/shared/theme.ts`,
   `src/shared/menu-template.ts`, `src/shared/gutter.ts`, `src/shared/relocate.ts`, `src/renderer/renderer.ts` or the
   store's two modules.

**Explicitly OUT of scope (do not do in this unit):**

- **Any store byte.** `src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts` are LANDED-GREEN
  and FROZEN-artifacted; this unit adds NO member, NO arm, NO refusal token and NO rule to them (`§2.7` prohibition 2).
- **Any byte of the three modules.** `overlay.ts`/`theme.ts`/`menu-template.ts` keep their landed bytes, their landed
  export censuses and their `0`-import censuses (`§5.5.1` rows `P-SMS-*-IM-1`); **theme's EMPTY IMPORT CENSUS is the
  FLAG ROW** (`R3-4`; the queue row) — a store import IN a module is a FAIL, and the store is reached only by the
  caller files this unit declares.
- **Any byte of `src/renderer/renderer.ts`.** The theme resolution site does NOT land there (`§2.3`'s decision). The
  verification half READS the landed `createPaneDrag` composition (the `[T]` layer imports it — `tests/**` may import
  `src/renderer/**`) and drives it; it does not edit it.
- **Any re-land of the pane-drag reads.** A second store read implementation for `mem.layout.pane.<id>.size`/`.bounds`
  or `mem.layout.zone.<id>.slot`/`.distance`, whether in a mechanism byte or in a new closure, is a SECOND READ
  AUTHORITY (`F-PDV-1`).
- **Any module-level binding in the caller files.** The store handle arrives ONLY as the declared call parameter of the
  wiring factories (`§5.5.1` rows `P-SMS-*-IM-2`); nothing at module scope holds the store or a handle.
- **Any subscription in the overlay/theme caller turns** (`§2.2` item 5; `§2.3` item 5): the turns' reads ARE the
  observations; an un-owned subscription with no release obligation is the unowned-lifecycle class the family closes.
- **Any MCP surface change, any renderer/main/electron/fs touch to the modules, any persistence work, any new
  dependency, any `scripts/**`/`package.json` change** (`§2.7` prohibitions 4–6).
- **The `focus-model` obligation** — `H1`'s.
- **The fork's UI bytes** — `H-r6`; this repo writes no file under `<Astrographer>/`.

---

## 2. The surface (exact)

### 2.1 The caller-side store-backed implementations — WHERE EACH OBLIGATION LANDS (the homes, the seams, the tiers)

**THE PLAN'S READING, BINDING (`R3-4`): an obligation that lands at the CALLER or at an INJECTED SEAM does NOT break the
module's own no-import census — the store is reached by the CALLER file, the module's bytes import nothing and change
nothing.** **Four homes are declared, one per obligation class:**

| Obligation (module) | The home in THIS repo | Status of the home | The store-backed turn(s) it carries | Tier | The module's OWN bytes |
| --- | --- | --- | --- | --- | --- |
| **`overlay.ts`** (plan row 11) | **`src/renderer/overlay-store.ts`** — **NEW, declared by this unit** | NEW file; imported by NO `src/**` file at landing (its in-app composition is the consuming project's — the split ruling's `remainder / coherent core`; driven module-externally by this unit's `[T]` rows) | `readState(name)`, `transition(name, verb, callback?)`, `declaration(target, attributeName, inert)` — §2.2 | **`mem`** (`mem.overlay.<name>.state`) | **UNCHANGED** — `0` imports, `5` exported names; the landed `P-OV-4`/`I-4` rows re-read BESIDE at landing, never rewritten |
| **`theme.ts`** (plan row 12, the FLAG ROW) | **`src/renderer/theme-store.ts`** — **NEW, declared by this unit** | NEW file; imported by NO `src/**` file at landing (same composition posture) | `resolveSetting(env)`, `writeSetting(value)` — §2.3 | **`file`** (`file.settings.theme.token`) | **UNCHANGED** — `0` imports (THE FLAG ROW), `5` exported names; the `A-d6` boundary's no-store half is SUPERSEDED BESIDE at landing (`§5.9` row 21), the module bytes never move |
| **`menu-template.ts`** (plan row 7, LATENT) | **NO caller file — RECORDED-NOT-LANDED** (§2.4) | the obligation is DECLARED; a caller file lands only when a consumer exists (`F-11`); the register drives the module-side rows + the no-consumer probe | (recorded) the caller's future resolution reads `file.menu.catalog` and hands the catalog to `buildMenuTemplate`/`normalizeCatalog` as the parameter | **`file`** (`file.menu.catalog`, PROPOSED) | **UNCHANGED** — `0` imports, `9` exported names; `P-ML-4` re-read BESIDE at landing |
| **`gutter.ts` + `relocate.ts`** (plan rows 3/4) | **VERIFY — `src/renderer/renderer.ts`'s LANDED `createPaneDrag` composition** (`pane-drag-compliance.md` `§2.1` A/B, `§5.1` row 1) | LANDED by `U-PANE-DRAG-COMPLIANCE`; UNTOUCHED by this unit (§2.5) | the seam implementations `startSizeOf`/`defaultSizeFor`/`boundsOf`/`candidatesFor` are the STORE-BACKED ONE — the composition's `tierRead` route reads `resolve('mem.layout.pane.<id>.size')`/`…bounds`/`mem.layout.zone.<id>.slot`/`…distance` | **`mem`** (names 1–4 of `pane-drag-compliance.md` `§2.4`) | **UNCHANGED** — `gutter.ts`/`relocate.ts` bytes are the landed ones (`E-PDV-1`); their landed no-store rows re-read BESIDE at landing (`§5.9` rows 1/2) |

**THE TWO NEW FILES' SHAPE — the DECLARED NAME-COMPLETE SURFACE each must expose (the register's caller-file census is
over THIS set):** each wiring file exports EXACTLY `create<Obligation>StoreWiring(store, …)` — a single factory — whose
options/parameters carry per-parameter semantics rows, and whose returned turn object carries the declared members
below. **The store entry is a DECLARED CALL PARAMETER of the factory** (the no-module-level-binding rule, `§5.5.1` rows
`P-SMS-*-IM-2`): the file never imports the store, never binds it at module scope, and reaches it ONLY through the
parameter. **The file MAY import the store's TYPE surface and the module it wires** (the caller is the store-backed
party; the module import is the call-by-name of the module's own pure functions — value imports of the module's exports
AND the store's graph types carry the declared census; an import of ANY sibling mechanism — `gutter.js`, `relocate.js`,
`zones.js`, `census.js`, `menu-template.js` into the overlay/theme files — is a FAIL, the no-sibling-mechanism edge).**
**The files are TOTAL for any argument** (a hostile store, an absent store, a throwing tier-handle read all land the
declared MISS/refusal outcomes — never a throw out of a wiring turn; the absorption ruling, `§0` ruling 11).

### 2.2 The overlay obligation — the caller's store turn, the never-applied declaration (`E5-B-1`)

1. **THE HOME AND THE SEAM.** `src/renderer/overlay-store.ts` (NEW, declared by this unit) exports
   `createOverlayStoreWiring(store: unknown): OverlayStoreTurn`, where

   | Member (the turn object's surface) | Declared type (contract) | Semantics (per-parameter / per-member) |
   | --- | --- | --- |
   | `store` (the factory's parameter) | a handle carrying at least the frozen surface's `resolve` (or the tier-handle `get`) and `commit` — the read face and the minting/editing write verb of `store-core-graph.md` `§2.1`/`§2.8` | **The SOLE store-access path.** Reads/writes ONLY through this parameter; it is REQUIRED for the store-backed turn (a host constructed without it answers the declared no-store degradation, item 6); asserted NOTHING about the store's other members; never imported, never bound at module scope (`P-SMS-OV-IM-2`). |
   | `readState(name: unknown): unknown` | the READ TURN | returns the stored value of **`mem.overlay.<name>.state`** — `<name>` is the caller's own spelling carried VERBATIM (a non-string/empty `<name>` is the caller's own business: the reference composes its string form exactly as the caller supplied it — a `String()`-concat, never a mint, never a normalization, `§2.6`); the read is the TIER-QUALIFIED `resolve('mem.overlay.<name>.state')` (the `tierRead` route the pane-drag composition lands — `§2.5`), and a **MISS answers the LANDED MODULE'S OWN TOTALITY FEED: the caller passes the read's `value` (or `undefined` on a MISS — a declared outcome, never a refusal, never a throw) through to `overlayTransition(state, verb, callback)`, whose landed coercion answers the declared `'closed'` for every non-state — the CALLER invents no default, the module's landed totality IS the declared coercion** (`overlay.md` `§2.3`, `P-OV-TP-1`). Return: the raw stored value or `undefined`. **⟶ CORRECTED 2026-10-03 (machine clock — the `H2b` red-set gate's pre-implementer amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite): the coercion's record IS `{state:'closed', changed:false}` — the declared no-move record; `changed` is NEVER `true` from a MISS (the module's landed totality, `overlay.md` `F-1`/`P-OV-TP-1`; `§3.1` M-OV-5's correction), so a MISS owes NO write, and any mint/re-mint write is M-OV-2's flow — a REAL state present in the store, the transition changed.** |
   | `transition(name: unknown, verb: unknown, callback?: unknown): OverlayTransition` | the WRITE TURN | reads the stored state (item `readState`), calls the module's `overlayTransition(state, verb, callback)` with the caller's verb and the caller's optional Escape callback handed through UNINTERPRETED, and **when the module reports `changed: true`, writes the NEXT state back: `store.commit('mem.overlay.<name>.state', next, {onRepeat:'edit'})`** — `commit` is the minting+editing verb (`§2.8` item 3; `set` is NEVER used, a `set` on a path with no node is refused `'undeclared-name'`); the returned `OverlayTransition` IS the module's own record, by identity of shape (same members, same values) — a refused/repair receipt (`{status:'refused', …}`/`{repaired[], …}`) is consumed as the store's declared return and does NOT change the answer, an ABSORBED throwing store call does NOT change the answer (item 3), and a hostile store leaves the turn answering exactly as the landed no-store degradation answers (items 3/6). **The write is the CALLER's — the module performs NO write of any kind (its landed `P-OV-4`/`I-4` stay; the caller writes what the module's transition said).** |
   | `declaration(target: unknown, attributeName: unknown, inert: unknown): OverlayInertWrite` | THE DECLARATION TURN — **`E5-B-1`, the never-applied half** | returns the module's `overlayInertDeclaration(target, attributeName, inert)` result — the FOUR-member `{name, value, removal, target}` — **RETURNED AS-IS and NEVER APPLIED: by the module (its landed `E5-B-1` precedent: no write of any kind), by the store (a store writes VALUES, never attributes — there is no element, no attribute and no application surface in any tier), and by this turn (no element, no attribute write, no classList, no style — the consumer applies it, when a consumer exists)** (`overlay.md` `§2.4`, `§0` ruling 2; the queue row's own words: *"the returned inert declaration stays RETURNED and is never applied by the module or the store"*). The turn performs NO store call at all. |

2. **THE TIER IS `mem` THROUGHOUT; THE NAME IS THE CALLER'S SPELLING; THE REFERENCE IS THE PLAN'S OWN PROPOSED ONE**
   (`mem.overlay.<name>.state`, `§5.2.7` row 11). The store holds the overlay's OWN state record — opaque data the
   caller wrote; the store never interprets a state body, never decides a transition (the module's four-state machine
   decides; the store holds the VALUE), and never carries consumer decision vocabulary (`§2.6`, `R-1`).
3. **THE WRITE-TURN RULE (governed by `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION`, cited by
   row name).** Every store call the turn makes is an UNGUARDED call to the store's own TOTAL surface — the store
   returns RECORDS and its only throws are the factory's load refusal and the test-seam throws (`store-core-graph.md`
   `§2.2` `P-5`) — so **no new throw class enters the caller file**: a throwing/absent/hostile store inside the turn is
   ABSORBED (the turn answers the declared degradation, item 6 — never a throw out of the turn), and the store's closed
   refusal surface is unchanged.
4. **THE STORE-RECORD MISS RULE (a WORKING DEFAULT, decided here; recorded at `§7a.1` item 1).** A read of the module's
   own declared name that answers the declared MISS (`{found:false}` — never a refusal for a `mem.*`-spelled name, never
   an invented default) means *"no stored copy"*: **the turn proceeds with the value the read returned (or passes
   `undefined` through to the module, whose landed totality answers `'closed'`) and its next `changed`-turn re-mints the
   record from the module's own next state (self-healing, writing its OWN data, never an invented value).** **⟶ CORRECTED
   2026-10-03 (machine clock — the `H2b` red-set gate's pre-implementer amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never
   a rewrite — the re-mint wording above is the superseded reading). THE OPERATIVE READING:** from a MISS the turn
   proceeds with the read's outcome passed through — the module's landed totality answers the declared no-move record
   **`{state:'closed', changed:false}`** (`overlay.md` `F-1`/`P-OV-TP-1`: the landed coercion answers `'closed'` for
   every non-state, and `changed` is NEVER `true` from a MISS), so **a MISS makes NO write and owes NO mint**, and **the
   re-mint turn is ALWAYS from a REAL state present in the store (M-OV-2's flow — a state in the store, the transition
   changed), never from a MISS** — a mint-from-MISS would require the caller to invent a default (forbidden — `F-OV-1`)
   or to move a module byte (`§2.7` prohibition 1).**
5. **NO STORE SUBSCRIPTION (a DECLARED rule, decided here; recorded at `§7a.1` item 2).** The overlay caller turn
   registers NO `subscribe` on `mem.overlay.<name>.state`. **The turn's READ is the observation** — each turn reads the
   freshest state before transitioning (the pane-drag precedent: the `startSizeOf`/`boundsOf`/`candidatesFor` seam
   reads register no subscription on their references, `pane-drag-compliance.md` `§2.1` A/B; only the `temp.drag`
   preview path has a store subscriber, `§2.3`). **Why: a subscription would be an un-owned lifecycle** — the caller
   file holds no `dispose()` surface (unlike the `H2a` hosts, which gained `dispose()` release obligations), so a
   registered subscription could never be released, and the one-subscription-per-realm-per-reference discipline
   (`§2.10` item 4) would hand this unit an unowned handle. When a future consumer adds a subscription, THAT consumer
   owns its release (the `H2a` `dispose()`-release pattern is that unit's precedent, not this one's).
6. **THE NO-STORE DEGRADATION, DECLARED.** A turn constructed WITHOUT a `store` (or with a non-conforming one) answers
   the declared no-store shape: `readState` returns `undefined` (the MISS reading), `transition` returns the module's
   own transition computed from `undefined`-as-state (the module's landed totality: the declared coercion to `'closed'`)
   and performs NO write, `declaration` returns the module's declaration exactly as the module returns it. **This is the
   LANDED-CONTRACT READING the overlay suite's rows keep green** — the turn is a pure composition of the module over the
   declared reads when the store is absent. **⟶ CORRECTED 2026-10-03 (machine clock — the `H2b` red-set gate's
   pre-implementer amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite — the exact totality record, so no COLD
   `changed:true` reading survives at this clause): the transition computed from `undefined`-as-state IS
   `{state:'closed', changed:false}` — the declared coercion to `'closed'` names the ANSWER'S `state` member, and
   `changed` is NEVER `true` from a MISS (the module's landed totality, `overlay.md` `F-1`/`P-OV-TP-1`), so a write is
   never owed from one; the re-mint turn is M-OV-2's flow (a REAL state present in the store, the transition changed).**

### 2.3 THE THEME OBLIGATION — THE LICENCE QUESTION, DECIDED HERE, AND THE RESOLUTION SITE

**THE QUEUE ROW'S QUESTION, QUOTED IN SUBSTANCE: *"whether `theme`'s caller-site read lands in `renderer.ts`'s wiring
(the composition that already holds the store)"*** — the read there being inside `src/renderer/renderer.ts`, **whose
store-wiring bytes are LICENSED TO `U-STORE-CORE`'s BOOT SEAM (`buildWiredGraphStore`/`getWiredGraphStore`, the `TENANT-1`
integration seam of `store-core-graph.md` `§2.1`'s block + the `§2.11` realm rule) AND TO `U-PANE-DRAG-COMPLIANCE`'s
DRAG-CHAIN COMPOSITION (`createPaneDrag`, that unit's `§5.1` row 1: *"the store-backed seam implementations of §2.1 …
and NOTHING else"*) — NOT to this child.**

**⟶ THE DECISION — OPTION (a): THE READ LANDS IN A NEW WIRING FILE THIS UNIT DECLARES — `src/renderer/theme-store.ts` —
AND NO BYTE OF `renderer.ts` MOVES. THE ALTERNATIVE — OPTION (b), THE READ LANDING IN `renderer.ts`'S WIRING WITH A
DECLARED LICENCE CARVE-OUT — IS NOT TAKEN, WITH ITS REASON RECORDED SO NO PASS RE-LITIGATES IT.** **THE REASON, IN FOUR
PARTS:**

1. **The licence is real and this unit does not own a carve-out over it.** `renderer.ts`'s store region is the
   collected artifact of two other units' diff scopes — `U-STORE-CORE`'s boot seam (whose contract says the wiring
   holds the store and drives it; `store-core-graph.md` `§2.11` item 1) and `U-PANE-DRAG-COMPLIANCE`'s composition
   (whose `§5.1` row 1 bounds the wiring delta to the drag chain *"and NOTHING else"*). **A new unit's read landing
   inside those byte regions re-opens both units' bounded roles and owes a carve-out annotation against a landed
   contract — an act only the architect's dated ruling can license, and the queue row's own words mark the regions as
   licensed to those artifacts, NOT to this child.** Option (b) is therefore exactly the "genuinely undecidable" class
   the task brief excludes — it is decidable BY THE LICENCE REGIME ITSELF: the regions are other units'.
2. **The register's no-module-level-binding row would be undriveable over `renderer.ts`.** `renderer.ts` holds the
   wired store in a MODULE-LEVEL binding (`let wiredGraphStore`, read this pass — the wiring's declared realm-scope
   binding, correct for that unit). The unit's own register row (b) — *the store handle appears ONLY as a declared call
   parameter of the caller file, never a module-scope binding* — could never pass over the same file that already
   carries the store at module scope by another unit's licence; the row's positive controls would be contradicted by
   the file's own live bytes. The NEW FILE is driven over CLEAN bytes.
3. **The caller-file census must be drivable — and renderer.ts's import block is another unit's.** `renderer.ts`'s
   import set (`./runtime.js`, `./secure-panels.js`, `../shared/**`, `./store-core-graph.js`, `./store-graph-references.js`
   — read this pass) is the aggregate of the units that wired it; the register's import-census row (a) drives the
   caller file's DECLARED name-complete set, which a file with five prior units' imports cannot carry cleanly. The NEW
   FILE's census is this unit's own, declared and driven.
4. **The module's flag row is the point, and it is served by either option only while NO module byte moves — the new
   file is the strictly smaller diff.** `theme.ts`'s EMPTY IMPORT CENSUS stays the flag row; the resolution site's job
   is to READ and PASS THROUGH. A new declared file (option (a)) is within this unit's own diff scope, needs NO
   carve-out, NO annotation against another unit's contract and NO edit of a licensed region; option (b) pays all three
   costs for no offsetting benefit (**and there is no "themed resolution closure that already exists" — `resolveTheme`
   is imported by NO `src/**` file and no in-tree closure reads a theme value, so (b) would be a brand-new closure
   INSIDE a licensed region, the worst of both shapes**). **DECISION RECORDED AT `§7a.1` ITEM 3: option (a).**

1. **THE HOME AND THE SEAM.** `src/renderer/theme-store.ts` (NEW, declared by this unit) exports
   `createThemeResolutionWiring(store: unknown, seed: unknown): ThemeResolutionWiring`, where

   | Member | Declared type (contract) | Semantics (per-parameter / per-member) |
   | --- | --- | --- |
   | `store` (the factory's parameter) | a handle carrying at least the frozen surface's `resolve` (or the tier-handle `get`) and `commit` | the SOLE store-access path, exactly as `§2.2` item 1's `store` row — never imported, never bound at module scope (`P-SMS-TH-IM-2`). |
   | `seed` (the factory's parameter) | `unknown` — **THE CALLER'S DECLARED DEFAULT (the "registered default" of plan row 12)** | the caller's own seed token, carried VERBATIM (never interpreted, never normalized, never minted); **it is the ONLY value the resolution turn answers on a MISS — the DEFAULT-SEED RULE, item 4**; it is declared IN THE SAME CLOSURE as the read (the pane-drag fallback's shape: the caller names exactly one value in the same closure — `pane-drag-compliance.md` `§2.1` A's MISS rule — never a store-invented default, never a mechanism literal). |
   | `resolveSetting(env: unknown): ThemeResolution` | **THE RESOLUTION TURN — the caller's resolution site** | reads **`file.settings.theme.token`** — the TIER-QUALIFIED `resolve('file.settings.theme.token')` — and **passes the value as `resolveTheme(setting, env)`'s parameter, exactly as the plan's row 12 pins (`resolveTheme(setting, env)` KEEPS ITS INJECTED `env`; the SETTING is the external I/O, so it goes through the store)**; HIT ⇒ `resolveTheme(<stored>, env)`; MISS ⇒ `resolveTheme(<seed>, env)` (the default-seed rule, item 4); the module's own record is returned AS-IS (`{setting, prefersDark, source}` with the closed `'env' | 'degraded-env'` domain — `theme.md` `§2.1`/`§2.3`, `P-TH-IM-1`). **The turn is TOTAL: ANY `env` answers a `ThemeResolution`, never a throw (`theme.md`'s hostile-env table `§2.3` item 2 and the module's totality rows are composed as-is).** |
   | `writeSetting(value: unknown): unknown` | **THE WRITE TURN** (the minting/self-healing half; declared so the script's mint and a consumer's setter have one home) | `store.commit('file.settings.theme.token', value, {onRepeat:'edit'})` — `commit` is the minting+editing verb (`§2.8` item 3); a refused/serialization-failed receipt (`{status:'refused',…}`/`'rebuild-failed'`/`'serialize-failed'`/`'validate-failed'` — the three arms of `§2.8` item 6) is consumed as the store's declared return, never a throw (`§2.2` item 3's rule applies). Return: the store's receipt. |

2. **THE TIER IS `file` — THE SETTING IS A PERSISTED APPEARANCE VALUE** (the plan's *"the strongest genuine edge in the
   tree"*; the queue row's words). The `file.settings.*` root is already the pane-drag release's commit target
   (`file.settings.pane.<id>.size`, name 9 of `pane-drag-compliance.md` `§2.4`) — **the `settings` root is shared, the
   `theme` child is THIS caller's own spelling, declared by this caller, and the store owns no `theme`/`settings`
   vocabulary (`§2.6`, `R-1`).**
3. **THE LANDED `A-d6` PERSISTENCE BOUNDARY, READ BESIDE (`§5.9` row 21).** The landed `A-d6` persistence boundary
   (*"this repo owns no UI-config store"*, `theme.md` ruling 3 / item 6 / `P-TH-4`/`P-TH-11`/`P-TH-12`) is SUPERSEDED
   FOR THE BOUNDARY by the answered plan (`§5.9` row 21: the appearance setting now read from tier 1; cost CA+RG+RS+FV)
   — the OTHER half stays: **the mechanism writes nothing, the authored control stays provident data, and THIS unit's
   caller file is where the store edge lives.** The `theme.md` amendment is the annotated-beside set of `§2.7` item 7;
   the module's `0`-import census is the flag row and is RE-VERIFIED, never broken (`P-SMS-TH-IM-1`).
4. **THE DEFAULT-SEED RULE, EXACT (DECIDED here; recorded at `§7a.1` item 4).** On a MISS (`{found:false}` — never a
   refusal for the declared `file.*` spelling, never a default minted by the store), the resolution turn answers
   `resolveTheme(<seed>, env)` — **the seed is the caller's own value BY IDENTITY in the returned record — and the
   MISS makes NO store write (the `H2a` MISS-rule shape: proceed on the declared value; the NEXT write turn re-mints
   from the caller's own data, never an invented value).** The seed arm is observable through the returned record's
   `setting` member (the seed by identity) and — for a red row — through the store's state after a `remove`
   (`F-TH-2`'s drive).
5. **NO STORE SUBSCRIPTION (the same rule as `§2.2` item 5, decided here; recorded at `§7a.1` item 2): the theme caller
   registers NO `subscribe` — the resolution turn's read IS the observation, each turn reads the freshest committed
   value, and a subscription would be an unowned lifecycle with no `dispose()`-release surface.**

### 2.4 THE MENU-TEMPLATE LATENT DISPOSITION — DECIDED: RECORDED-NOT-LANDED

**THE QUEUE ROW'S QUESTION: `menu-template`'s latent row — land-when-a-consumer-exists vs record-only (the plan's
`F-11`).** **⟶ THE DECISION: RECORD-ONLY NOW — the disposition the queue row itself names ("recorded-not-landed") — WITH
the land-when-a-consumer-exists shape as the REVISIT CONDITION, not as today's disposition. Recorded at `§7a.1` item 5.**

1. **WHAT IS RECORDED (the obligation, DECLARED in its entirety).** `menu-template.ts` is `STORE-BACKED (LATENT)` (plan
   `§5.2.7` row 7): **when a menu consumer ships, the CALLER resolves the catalog from the store — `file.menu.catalog`,
   PROPOSED, the plan's own spelling — and hands the catalog to the module as the parameter of
   `buildMenuTemplate(catalog, options)` / `normalizeCatalog(catalog)` / `selectCatalogItem(catalog, picker)`** — the
   module stays a function of its arguments and the store read lives in the CALLER's closure, exactly as the plan's
   named-obligation table row 7 says (*"LATENT: when a menu consumer ships, the CALLER resolves the catalog from the
   store and hands it in — no consumer exists today (`F-11`), so the obligation is CONDITIONAL and named, not
   shipped"*).
2. **WHY RECORD-ONLY IS THE ONLY HONEST DISPOSITION (the reason).** A store read needs a CALLER; the module is imported
   by NO `src/**` file (`menulib.md` `§3.5 X-1`, `I-9`/`I-10`; re-verified at red time by `E-MT-1`). **Landing a
   caller file now would be dead code with an un-owned store surface and NO consumer to observe it — the exact
   unowned-lifecycle class the family's rules close; and the plan's own framework (its `§3.6 A-4` row: *"this plan
   creates no menu tenant"*) means NOTHING in this repo can consume the read today.** The "land-now" arm's cost is a
   caller file whose only effect is the register's drives — indistinguishable from the recorded form except that it
   OWES the bytes before the obligation is exercisable. **The recorded-not-landed form keeps the obligation REAL (it is
   DECLARED here, with its reference and its caller-shape), keeps the register honest (the module-side rows ARE driven
   today), and defers the caller bytes to the moment they are exercisable.**
3. **THE REVISIT CONDITION, EXACT.** **The first pass that lands a `src/**` import of `src/shared/menu-template.js` (a
   menu consumer — a menu UI unit, an envelope handler importing the module, or a fork-facing wiring pass) MUST: (a)
   land the caller's catalog-resolution store read (the declared obligation of item 1 — the caller file, the
   `file.menu.catalog` qualified read with the declared MISS posture), (b) flip THIS disposition to LANDED by a dated
   annotate-beside note in this file's `§2.4` and in the module's landed spec and (c) re-drive the register's
   caller-file half (`P-SMS-MT-IM-1`'s census drive and `P-SMS-MT-TP-1`'s script gain their caller-side arms at that
   pass).** Until that pass, the obligation is OWED and the queue row's "recorded-not-landed" is the live status.
4. **THE MODULE-SIDE ROWS DRIVEN TODAY (no caller file):** the module's `0`-import census with its positive controls
   (`P-SMS-MT-IM-1`), the module-level no-binding scan with its controls (`P-SMS-MT-IM-2`), and the two-run differential
   over the module's OWN answers — proving the module is a function of its arguments TODAY (`P-SMS-MT-TP-1`), which is
   precisely what makes the FUTURE caller-side read safe to add (the module cannot absorb ambient store state).

### 2.5 THE VERIFICATION HALF — the pane-drag-l reads are the store-backed ones; the falsifier is a SECOND READ AUTHORITY

1. **WHAT IS VERIFIED (and what is NOT re-landed).** `U-PANE-DRAG-COMPLIANCE` LANDED the caller-side store-backed reads
   for `gutter.ts`/`relocate.ts` (plan rows 3/4) at `src/renderer/renderer.ts`'s exported composition
   `createPaneDrag(store, source)` (pane-drag-compliance.md `§2.1` A/B, `§5.1` row 1, its gate-8 annotation): the
   `startSizeOf`/`defaultSizeFor`/`boundsOf` seam implementations read **`mem.layout.pane.<id>.size`** / **`….bounds`**
   and the `candidatesFor` implementation reads **`mem.layout.zone.<id>.slot`** / **`….distance`**, each answer from the
   STORE (HIT/MISS/fallback per the landed contract) through the composition's OWN **`tierRead` route** — the
   tier-qualified `resolve('mem.layout.pane.<id>.size')` … form (`renderer.ts`'s `tierRead`, read this pass). **THIS
   UNIT VERIFIES: (a) the reads REACH THE STORE — a recording store double sees the read on each seam turn and the
   seam answers the STORED value (not a module-held one); (b) there is EXACTLY ONE read authority per reference — the
   store-backed composition's, with NO second closure and NO module-held variable consulted for the same size/slot; (c)
   the mechanism bytes (`gutter.ts`, `relocate.ts`) and the composition bytes are the LANDED ones — this unit adds
   nothing (`E-PDV-1`'s byte-identity probes).** **A RE-LAND — a second store read implementation for the same
   references in any byte this unit could touch — FAILS `F-PDV-1` BY CONSTRUCTION: it is a SECOND AUTHORITY, and the
   queue row's own words make it a FAIL (*"this child VERIFIES, it does not re-land (a re-land would be a second
   authority)"*).**
2. **THE VERIFYING ROUTE, EXACT.** The `[T]` layer constructs a RECORDING STORE DOUBLE conforming to the frozen
   surface's used members (`resolve`/`tiers['mem'].get`, `commit`, `set`, `remove`, `subscribe`) plus a read log and a
   written map; **composes `createPaneDrag(double, sourceDouble)` — imported from `src/renderer/renderer.js` by the
   test file, the unit's test layer may import `src/renderer/**` — and drives the four seam implementations:
   `startSizeOf(element, token)`, `defaultSizeFor(element, token)`, `boundsOf(element, token)` and
   `candidatesFor(element)`.** The assertions: the double's read log holds the TIER-QUALIFIED reads
   (`'mem.layout.pane.<id>.size'` / `'…bounds'` / `'mem.layout.zone.<id>.slot'` / `'…distance'` — the `tierRead`
   route), the answers are the STORED values (a pre-seeded double answers the seeded value), the MISS arms answer the
   landed degradations (the declared fallback, then the E3-declared non-number — `pane-drag-compliance.md` `§2.1` A),
   and `candidatesFor` returns the stored slot as the opaque candidate with the stored distance (`§2.1` B). The
   zone-render subscriber's shape (the `temp.drag` tier-qualified subscription, `§2.3` item 2's landed form) is
   re-verified as present in the composition and unowned by any new byte of this unit.
3. **THE FALSIFIER — A SECOND READ AUTHORITY, POSITIVE-CONTROLLED.** `F-PDV-1` drives TWO variants: **(a) a module-held
   authority** — a fixture composition (or a fixture module variant) whose seam answers a size/slot from a
   module-held variable that disagrees with the store — MUST FAIL the store-backed claim; **(b) a dual-authority
   variant** — a seam that reads a store value AND a module-held value and answers from the module-held one — MUST
   FAIL. The positive control: the LANDED composition on the same drives answers from the store alone (the double's
   read log + the answer's agreement with the stored value). **The verifier's own negative: NO drive of this unit
   adds a byte to `gutter.ts`/`relocate.ts` or to `createPaneDrag` — a row that could only pass by editing those
   bytes is a stop condition (`S-SMS-7`).**
4. **THE RECORDED READING OF THE LANDED NO-STORE ROWS (the plan's `§5.9` rows 1/2, applied).** The landed
   `gutter.md` `§2.2 P-9` (*"no sibling import …"*) and `P-10` (*"no census read of any kind"*) and `relocate.md`
   `§2.2 P-6`/`§3.3 I-13` (*"no store, no persistence…"*) rows keep their module-binary force — the modules import
   nothing and read no census — and are READ BESIDE as the plan's re-wording: *"no sibling-mechanism edge; a store edge
   is admitted AT THE CALLER"* (plan `§5.9` row 1; the store is not a census, `§5.9` row 2). The annotated-beside notes
   are part of `§2.7` item 7's amendment set; **the verification half asserts the modules' landed rows stay GREEN as
   landed (their bytes are untouched — `E-PDV-1`).**

### 2.6 The caller-owned-spelling rule

1. **THE SPELLINGS ARE THE CALLER'S, carried verbatim:** `mem.overlay.<name>.state`, `file.settings.theme.token`,
   `file.menu.catalog` (recorded), `mem.layout.pane.<id>.size`/`.bounds` and `mem.layout.zone.<id>.slot`/`.distance`
   (landed by the pane-drag unit) — the plan's OWN PROPOSED references (`§5.2.7` rows 3/4/7/11/12; `§1.3`). The
   caller files compose them from the caller's own identity arguments (function-local, inside the factories' closures —
   never module-level constants, per `P-SMS-*-IM-2`); the store's register declares the top-level roots
   (`overlay`/`settings` etc.) through the construction-time declarations input (`storeGraphReferences(rows)` — the
   caller's declaration input, `store-core-graph.md`'s register) — **the one-declaration rule `§1.3 R-2`/`R-3`, and the
   caller files never declare a second home for a reference.**
2. **THE IDENTITY SEGMENTS.** `<name>` (overlay) and `<id>` (pane-drag) are the caller's own strings, carried verbatim:
   the closures never mint, default, normalize, prefix or re-interpret them (the opacity discipline the family applies
   to `edge` — `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`, cited by row name — and to `zoneId`).
   The theme reference carries no identity segment (its spelling is fixed by the plan).
3. **A SECOND LITERAL SPELLING OF A REFERENCE IS A FAIL** (`§1.3 R-3`): each caller file composes each of its
   references at EXACTLY ONE site in its closures (the double and the scan rows assert the spelling appears exactly
   once per reference; a second copy — e.g. a duplicated `'mem.overlay.'` prefix literal — FAILS `S-OV-1`/`S-TH-1`'s
   spelling-count reading).

### 2.7 The prohibitions — every prohibition cites an ENUMERATED static or negative row

| # | Prohibition | Pinned by |
| --- | --- | --- |
| **1** | **THE MODULES' BYTES DO NOT MOVE** — `overlay.ts`/`theme.ts`/`menu-template.ts` keep their landed bytes, export censuses and `0`-import censuses; theme's EMPTY IMPORT CENSUS is the flag row; the store is reached ONLY by the caller files | `§5.5.1` rows `P-SMS-*-IM-1`; `S-OV-1`/`S-TH-1`/`S-MT-1`; `E-OV-1`/`E-TH-1`/`E-MT-1` |
| **2** | **NO STORE-SURFACE CHANGE** — the store is FROZEN: no member, no arm, no refusal token is added or amended | `§5.1`'s DENIED set; `E-PDV-2`/`E-ST-1` |
| **3** | **NO SECOND READ AUTHORITY, NO RE-LAND** — the pane-drag-l reads stay the LANDED store-backed ones; no second closure and no module-held variable consults the same size/slot; no byte of `gutter.ts`/`relocate.ts`/`createPaneDrag` changes | `F-PDV-1` (the falsifier), `E-PDV-1` |
| **4** | **NO MODULE-LEVEL BINDING IN THE CALLER FILES** — the store handle appears ONLY as the declared call parameter of the wiring factories; nothing at module scope holds the store or a handle | `P-SMS-*-IM-2`, `S-OV-2`/`S-TH-2` |
| **5** | **NO UNOWNED SUBSCRIPTION** — the overlay/theme caller turns register NO store subscription (their reads ARE the observations); a subscription with no `dispose()`-release surface is the unowned-lifecycle class | `§2.2` item 5, `§2.3` item 5, `F-OV-4`/`F-TH-5` |
| **6** | **NO MCP SURFACE, NO CONSUMER VOCABULARY IN THE STORE OR THE MODULES, NO PERSISTENCE WORK, NO NEW DEPENDENCY, NO `renderer.ts` BYTE** — the caller files are mechanism-side composition closures (no UI content; `UI-RENDERED-WITH-PROVIDENT` has no element of this unit's to apply to); the store ships no `overlay`/`theme`/`settings`/`menu`/`token` token (`§1.3 R-1`, the store's own scan rows); no `scripts/**`/`package.json` change | `S-OV-3`/`S-TH-3`, `E-PDV-2`, `§5.1`'s DENIED set |
| **7** | **THE LANDED-PURITY ROWS THIS UNIT'S LANDING PASS AMENDS — NAMED** (the set of `CURRENT STATE` item 9 / `§2.7`-item-7's authority; each amended BESIDE at the landing pass, `RCA-8(d)`, none rewritten): `overlay.md` (`§2.2 P-OV-4`, `§3.3 I-4`, `§3.4 R-3`), `theme.md` (item 6, ruling 3, `§2.2 P-TH-4`/`P-TH-11`/`P-TH-12`, `§3.3 I-4`), `menulib.md` (`§2.2 P-ML-4`, `§3.3 I-9`/`I-10`), `gutter.md` (`§2.2 P-9`/`P-10` — the `§5.9` rows 1/2 re-wording), `relocate.md` (`§2.2 P-6`, `§3.3 I-13`) — **every one keeping its landed bytes visible and its superseded reading spelled beside it; the module-byte force of each row SURVIVES (the modules still import nothing and still hold no store — the re-reading is *a store edge lands at the CALLER*, never *the module gains a store*)** **⟶ EXTENDED 2026-10-03 (machine clock — the `H2b` IMPLEMENTER-LANDING amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite — the as-filed module-spec set above is UNTOUCHED and KEPT VISIBLE; this extension adds its TEST-SIDE SIBLING, named once here so the landing pass need not re-derive it). THE AMENDMENT SET NOW COVERS THE THREE LANDED TEST ROWS THE UNIT'S OWN CALLER FILE LEGITIMATELY REDDENS AT LANDING: `tests/theme.test.ts`'s **`R-6`** (the no-importer half) and **`X-5`**, and `tests/theme-control.test.ts`'s REG **`P-TC-TP-3`**. These rows were CORRECT before any store-backed theme caller existed — the unit's landing, the moment `src/renderer/theme-store.ts` (the `§2.3` resolution-site decision) first imports `src/shared/theme.js` and names the module's functions (`resolveTheme`/`applyThemeDeclaration`), is the moment they legitimately change. EACH ROW HAS ITS OWN SCOPE — what the amendment admits and what SURVIVES: (1) **`tests/theme.test.ts` `R-6` (the no-importer half, `§3.4`)** — the `src/**`-tree importer scan admits **EXACTLY ONE new importer — `src/renderer/theme-store.ts` — and stays CLOSED to any SECOND importer** (a second `src/**` file importing the module is STILL a violation, exactly as the row's own words say: *"a later importer is a FINDING"*; the row's closed-census INTENT is UNCHANGED — its set gains the unit's own admitted member only); **`R-6`'s allow-list-census half (the DENIED paths' presence + the module/test-file allow-list pair) is NOT amended — none of its checks flip at this landing.** (2) **`tests/theme.test.ts` `X-5` (`§3.5`)** — the vocabulary allow-list (`X5_EXEMPT_PATHS`) gains **the ONE new path — `src/renderer/theme-store.ts` — beside the two pre-declared paths (`src/shared/demo-envelope.ts`, `src/renderer/renderer.ts`)**; the row's closed-vocabulary INTENT is UNCHANGED — the exemption stays the paths BY NAME, never the tokens, and the row's positive controls (a token in ANY OTHER `src/**` file FAILS, in BOTH vocabularies; the `index.html` one-match appearance reading) SURVIVE as filed. (3) **`tests/theme-control.test.ts` REG `P-TC-TP-3` (attempt 12 of the `S-TC-NOEDGE-1` no-fabricated-edge refusal)** — the row's allowed carrier set gains **the unit's caller file — `src/renderer/theme-store.ts`** (the theme-control unit's OWN surfaces — the envelope card, the handler strings, the wiring role — and the module itself remain the other allowed members) and stays **CLOSED: ANY OTHER `src/**` `.ts`/`.mjs`/`.js` file naming the mechanism on this unit's behalf is STILL a carrier, and attempts 1–11 (the unit's own surfaces carry no edge; the positive-control corpora MUST fail) are NOT amended.** THE LICENCE, EXACT: the three rows are the theme module's OWN landed suite — `tests/theme.test.ts` is `U-THEME`'s regression home and `tests/theme-control.test.ts` is `U-THEME-CONTROL`'s — so this unit MAY amend ONLY those THREE rows, ONLY to admit its OWN caller (`src/renderer/theme-store.ts`), and NEVER to weaken the closed-set intent. THE POSITIVE-CONTROL CLAUSE: an amendment that broadens ANY of the three sets BEYOND the one admitted path (a second admitted importer; a third allow-listed path; an extra carrier) is a FINDING — the bounded-extension clause that keeps this amendment honest (the same class as the module-spec set's *a store edge lands at the CALLER, never the module gains a store* bound). THE REVERSIBILITY / ROLLBACK NOTE: if the theme caller is ever RETIRED, the three rows REVERT to their as-filed closed form — the reversal IS the rollback of this item (each row's as-filed closed reading stays visible BESIDE its amendment, so the revert is the annotation's removal, never a re-derivation; `§5.4`'s rollback holds: reverting this unit's diff re-greens the landed suites in their as-filed shape). THE LANDING MECHANISM is the module-spec set's own: the unit's landing pass (gate-4's doc-review counterpart, `§3b`'s `DOC-REVIEW-ITEM` class) lands the three as dated annotations BESIDE the landed rows (`RCA-8(d)`), keeping every landed byte visible — never a rewrite of a row — and the `§4.1` promise that the landed suites stay the implementations' own regression homes UNEDITED-by-family-byte is UNCHANGED: this unit's `§3` families still live ONLY in `tests/store-modules-seams.test.ts`; the amendment is the three rows' own closed-set admission, not a family addition.**

**⟶ EXTENDED AGAIN 2026-10-03 (THE THEME-SUITE AMENDMENT PASS — `RCA-8(d)` ANNOTATE-BESIDE): the set above ALSO admits the seams red set's OWN `E-ST-1` existence row's GREEN-SIDE RE-PIN.** `E-ST-1` probes *the caller files did not exist before this unit* against `HEAD:`; the landing commit itself put `src/renderer/overlay-store.ts` + `src/renderer/theme-store.ts` INTO `HEAD`, so the probes flipped to `true`. The fix is the row's own intent — probe the PRE-LANDING PARENT (`HEAD^`, the commit before this unit landed) instead of `HEAD:` — a one-line re-pin licensed by this clause, under the same closed-set/positive-control/rollback discipline as the three theme rows. **No other row of the seams suite is admitted.** | `CURRENT STATE` item 9, `§5.1` |

---

## 3. Behaviour — every state, fail-state, invariant and static/existence row

**NOTATION: `OV-` = the overlay caller-store family (`src/renderer/overlay-store.ts` + the module); `TH-` = the theme
resolution family (`src/renderer/theme-store.ts` + the module); `MT-` = the menu-template recorded family (the module's
own, no caller file); `PDV-` = the verification half (the LANDED pane-drag composition).** The families are ADDITIVE to
the landed suites — no landed row id is re-used, renumbered or deleted; the families live in the unit's OWN test file
(`§4.1`).

### 3.1 Valid / happy states (store-carrying drives; the recording store double in the `[T]` layer — `§4.2`)

| # | The state | The drive | Required behaviour | Pinned by |
| --- | --- | --- | --- | --- |
| **M-OV-1** | the overlay read turn reads the stored state | seed the double with `mem.overlay.a.state` = `'open'`; `readState('a')` | the double's read log holds `resolve('mem.overlay.a.state')` (the tier-qualified route) and the answer IS the stored `'open'`; a MISS answers `undefined` | `§2.2` items 1/2/4 |
| **M-OV-2** | the write turn lands the next state | `transition('a','open')` on the double | returns the module's `{state:'open', changed:true}`; the double's written map holds `mem.overlay.a.state` = `'open'` via `commit(… {onRepeat:'edit'})`; a no-change verb (`transition('a','open')` again) performs NO write | `§2.2` items 1/3 |
| **M-OV-3** | the Escape callback is handed through | `transition('a','escape', cb)` with a recording `cb` | the callback is invoked ONCE (the module's landed `M-9`), the answer is `{state:'closed', changed:true}`, the next state is written; a hostile callback (throwing) is absorbed by the MODULE (its landed totality) and the turn still writes | overlay.md `M-9`, `§2.2` item 1 |
| **M-OV-4** | the declaration stays RETURNED, never applied | `declaration(target, 'data-inert', true)` | returns the module's `{name:'data-inert', value:'true', removal:false, target}` BY IDENTITY of the module call; NO element, NO attribute, NO store call in the turn (`E5-B-1`); same for the removal arm (`inert=false` ⇒ `{value:false, removal:true}`) | `§2.2` item 1, `§0` ruling 12, `E5-B-1` |
| **M-OV-5** | the MISS re-mints on the next changed turn | a cold double; `transition('a','open')` | reads `undefined` (MISS), the module's totality answers `'closed'`-based transition `{state:'open', changed:true}`, the write mints `mem.overlay.a.state` = `'open'`; a subsequent `readState('a')` answers `'open'` **⟶ CORRECTED 2026-10-03 (machine clock — the `H2b` red-set gate's pre-implementer amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite — the as-filed transcript above stands visible as the superseded reading). THE OPERATIVE TRANSCRIPT — THE PASS-THROUGH REALITY:** the COLD-double `transition('a','open')` drive answers **`{state:'closed', changed:false}`, NO write** (the double's written map holds nothing for `mem.overlay.a.state`), and a subsequent `readState('a')` answers `undefined` (the store still holds nothing) — **the missing state is NOT a state**: the module's own landed totality (`overlay.md` `§2.3`'s machine, `F-1`/`P-OV-TP-1` — the authority `§2.2` item 1 itself cites: *"the landed coercion answers the declared `'closed'` for every non-state"*) coerces EVERY non-state × every verb to the declared no-move record `{state:'closed', changed:false}` and **never reports `changed:true` from a MISS**. THE REASON (stated so no later pass re-derives it): `§2.2` items 1/4 require the caller to pass the read's outcome THROUGH to the module and to write ONLY when the module reports `changed:true` — and the module never reports it from a MISS, so **a caller-side mint-from-MISS would require the caller to INVENT a default (forbidden — `F-OV-1`) or to move a module byte (`§2.7` prohibition 1)**; the corrected reading is the pass-through one. THE RE-MINT CLAUSE, RE-PINNED: the record is minted/re-minted ONLY on a `changed:true` turn **FROM A REAL STATE present in the store** — M-OV-2's flow (a state in the store, the transition changed; the write `store.commit('mem.overlay.<name>.state', next, {onRepeat:'edit'})`). | `§2.2` items 4/6 |
| **M-TH-1** | the resolution site reads the committed token | seed `file.settings.theme.token` = `'dark'`; `resolveSetting({prefersDark:false})` | the read log holds `resolve('file.settings.theme.token')`; the answer is the module's record `{setting:'dark', prefersDark:false, source:'env'}` (the token BY IDENTITY as the module's `setting` member) | `§2.3` items 1/2 |
| **M-TH-2** | the default-seed rule answers the seed on a MISS | a cold double; `resolveSetting({prefersDark:true})` with `seed = 'light'` | the answer's `setting` IS the seed BY IDENTITY (`toBe('light')`), `prefersDark:true`, `source:'env'`; **NO store write happens on the miss** (the double's written map stays empty) | `§2.3` items 1/4 |
| **M-TH-3** | the pass-through keeps the module total | `resolveSetting` over the module's hostile-env table (missing member, string member, throwing accessor, revoked Proxy, inherited env) | EVERY drive answers the module's declared record (`prefersDark:false`, `source:'degraded-env'` for the hostile arms — `theme.md` `§2.3` item 2's table), never a throw | `theme.md` `§2.3` item 2, `§2.3` item 1 |
| **M-TH-4** | the write turn mints/edits the token | `writeSetting('dark')` on the double | the double's written map holds `file.settings.theme.token` = `'dark'` via `commit(… {onRepeat:'edit'})`; the receipt is returned; a refused/serialization-failed receipt is consumed without a throw | `§2.3` item 1, `§2.2` item 3 |
| **M-MT-1** | the latent module's answers are argument-determined | the fixed corpus over `buildMenuTemplate`/`normalizeCatalog`/`selectCatalogItem` (the differential's script) | every answer equals the module's landed rows' answers for the same drives (`menulib.md` `M-*`-family), no throw, no store surface involved | `§2.4` items 1/4, `P-SMS-MT-TP-1` |
| **M-PDV-1** | the pane-size read reaches the store | compose `createPaneDrag(double, sourceDouble)`; seed `mem.layout.pane.pane-a.size` = `320`; `startSizeOf({id:'pane-a'}, token)` | the double's read log holds `resolve('mem.layout.pane.pane-a.size')` (the `tierRead` route); the answer IS `320` (the stored value — not a module-held one); the same closure answers `defaultSizeFor` identically | `§2.5` items 1/2, pane-drag `§2.1` A |
| **M-PDV-2** | the bounds read answers AS STORED | seed `mem.layout.pane.pane-a.bounds` = `{min:100,max:600}`; `boundsOf({id:'pane-a'}, token)` | the read log holds `resolve('mem.layout.pane.pane-a.bounds')`; the answer is the RECEIVED pair as stored — never a policy clamped here | `§2.5` items 1/2, pane-drag `§2.1` A |
| **M-PDV-3** | the candidate read answers the stored slot + distance | seed `mem.layout.zone.zone-1.slot` = `<opaque>` and `…distance` = `37`; `candidatesFor({zoneId:'zone-1'})` | the read log holds both qualified reads; the answer is `[{candidate:<the stored slot>, distance:37}]` — the slot OPAQUE as stored, the distance the stored scalar; a MISSING slot answers `[]` (the caller's declared rule) | `§2.5` items 1/2, pane-drag `§2.1` B |
| **M-PDV-4** | the composition owns exactly ONE subscriber | compose `createPaneDrag(double, …)` | the double's subscription set holds the LANDED tier-qualified form (`temp.drag` with `{subtree:true}` — `§2.3` item 2's landed registration) and NOTHING on the pane/zone references; NO new byte of this unit registers anything | `§2.5` items 1/2, pane-drag `§2.3` item 2 |

### 3.2 Documented fail-states (each FAILS — the negative rows, the falsifiers)

| # | Fail-state | The drive | What FAILS | Positive control |
| --- | --- | --- | --- | --- |
| **F-OV-1** | the caller invents a default on a MISS | a cold double; `readState('a')`, then a fixture turn that answers a caller-written default state instead of passing the MISS through to the module | a caller-side invented state (`'open'` straight from a MISS with no module transition) FAILS the never-a-default rule; the PASSING drive answers `undefined` (read) / the module's totality coerces (transition) | the module's own totality drive answers the landed `'closed'`-based answers |
| **F-OV-2** | a `set` in place of the minting `commit` | a hostile-store-agnostic double that records the verb; drive a `changed` transition on a cold double | a written `set('mem.overlay.a.state', …)` on a path with no node is the REFUSED `'undeclared-name'` class — the turn MUST use `commit` for the mint (`§2.8` item 1) | `commit` on the same drive succeeds |
| **F-OV-3** | a throwing store call escapes the turn | a throwing store double; drive `readState`/`transition`/`declaration` | any throw out of the turn FAILS — the absorption ruling binds the wiring turn (`THROWING-SUPPLY-…`, cited by row name); every turn answers the declared shape | the same drives on the recording double pass |
| **F-OV-4** | a subscription is registered by the caller turn | a recording double with a subscription set; construct the wiring | the subscription set NON-EMPTY after construction FAILS `§2.2` item 5 (the read IS the observation; no unowned subscription) | the recording double's set stays EMPTY on the passing drive |
| **F-TH-1** | the resolution turn answers a non-seeded default on the MISS | a cold double with `seed='light'`; `resolveSetting({prefersDark:false})` | an answer whose `setting` is NOT the seed BY IDENTITY (a store-invented, module-invented or literal default) FAILS the default-seed rule | the seed-by-identity drive passes (`M-TH-2`) |
| **F-TH-2** | the seed arm writes the store | a cold double; `resolveSetting({prefersDark:true})` on the MISS | ANY write in the miss turn (the double's written map NON-EMPTY) FAILS — the miss answers the seed and the next write turn re-mints (`H2a` MISS-rule shape) | after a `writeSetting('dark')`, the next `resolveSetting` reads `'dark'` |
| **F-TH-3** | a `set` in place of the minting `commit` | as `F-OV-2`, over the theme file's write turn | `set('file.settings.theme.token', …)` on the unminted path FAILS | `commit` passes |
| **F-TH-4** | a throwing store call escapes the resolution turn | a throwing store double; `resolveSetting`/`writeSetting` | a throw out of the turn FAILS (the absorption ruling); the answer lands on the declared seed arm | the recording double passes |
| **F-TH-5** | a subscription is registered by the resolution turn | recording double; construct the theme wiring | subscription set NON-EMPTY FAILS (`§2.3` item 5) | empty set passes |
| **F-MT-1** | a module byte gains a store import | a fixture VARIANT of `src/shared/menu-template.ts` carrying `import { … } from '../renderer/store-core-graph.js'` | the fixture FAILS `P-SMS-MT-IM-1` (the module's `0`-import census is the landed force of `P-ML-4`/`I-9`) — the negative that keeps the recorded-not-landed disposition honest | the module as landed PASSES the same three-view scan |
| **F-PDV-1** | a SECOND READ AUTHORITY (the falsifier) | two drives: (a) a fixture module/closure whose seam answers a size/slot from a module-held variable; (b) a dual-authority seam reading the store AND a module-held value and answering from the module-held one | both FAIL the store-backed claim — every answer for the four references comes from the store route alone (`§2.5` items 1/3) | the LANDED composition on the same drives answers from the store alone (read log + agreement, `M-PDV-1`/`-3`) |
| **F-PDV-2** | a re-landed read (a second implementation) | a NEW caller file/closure performing its own store read of `mem.layout.pane.<id>.size` for the same seam turn | the second read authority FAILS by construction (the `H2b` queue row: *"this child VERIFIES, it does not re-land"*) — the drive asserts the LANDED composition remains the sole authority | the landed composition's drive passes |

### 3.3 Invariants (hold in EVERY state, landed and store-backed)

| # | Invariant | Pinned by |
| --- | --- | --- |
| **I-OV-1** | the store is a sharing channel, never a second authority: no caller answer consults a store name OUTSIDE `mem.overlay.<name>.state`, and no store value becomes a transition DECISION (the module's four-state machine decides; the store holds the VALUE) | `§2.2` item 2, `P-SMS-OV-TP-1` |
| **I-OV-2** | the module stays pure in every state: `overlay.ts` performs NO write, holds NO state and its bytes are the landed ones | `P-SMS-OV-IM-1`, `E-OV-1`, overlay.md `P-OV-4`/`I-4` |
| **I-TH-1** | the module stays pure in every state: `theme.ts`'s answers are functions of the passed `setting`/`env` — never of store state — and its bytes (incl. the EMPTY IMPORT CENSUS) are the landed ones | `P-SMS-TH-IM-1`, `P-SMS-TH-TP-1`, `E-TH-1`, theme.md `P-TH-4`/`P-TH-11`/`P-TH-12` |
| **I-TH-2** | the seed is the caller's own value in the resolution turn: `resolveSetting`'s `setting` member is the stored token or the seed BY IDENTITY, never a derived token | `§2.3` items 1/4, `P-SMS-TH-TP-1` |
| **I-MT-1** | the latent module's answers are argument-determined TODAY (the anti-ambient claim the differential executes) — a store-sourced value, once the caller lands, can enter ONLY as the parameter | `P-SMS-MT-TP-1` |
| **I-PDV-1** | one read authority per pane/zone reference: the landed store-backed composition's, and nothing else (`F-PDV-1`'s complement) | `§2.5` items 1/3, `F-PDV-1`/`F-PDV-2` |
| **I-PDV-2** | the pane-drag-l mechanism bytes are the landed ones: `gutter.ts`/`relocate.ts`'s landed rows (incl. the no-store statics re-read BESIDE) stay green — no byte of either module changes in this unit | `E-PDV-1`, `§2.5` item 4 |

### 3.4 The STATIC rows — the rows `§2.7`'s prohibition table cites, ENUMERATED (each a scanner with its positive control)

| # | The row (contract) | The scan, closed against assembly and comments |
| --- | --- | --- |
| **S-OV-1** | the overlay module's import census (static form of `P-SMS-OV-IM-1`): `src/shared/overlay.ts` carries ZERO import statements — over the RAW bytes, a NORMALIZED view (string-literal concatenation joined, template substitutions joined) and COMMENTS-scanned-as-code; PLUS the caller-file census: `src/renderer/overlay-store.ts` imports the module's two value exports and the store's graph types AND NOTHING ELSE | positive controls: a corpus with `import { createGraphStore } …`, a `require(…)`, a dynamic `import(…)`, or a SIBLING-mechanism import (`../shared/gutter.js`) EACH FAIL the row |
| **S-OV-2** | the overlay caller file's no-module-level-binding scan (static form of `P-SMS-OV-IM-2`) — store-shaped tokens appear ONLY in the factory's parameter position and the closures' parameter-scoped references; the reference spelling `mem.overlay.<name>.state` appears EXACTLY ONCE in the closures | positive controls: a module-level `const store = …`, a module-level `let store;`, and a duplicated spelling prefix EACH FAIL |
| **S-OV-3** | the overlay caller file's no-UI/no-MCP/no-store-token scan: no element, no attribute, no `document`/`window`, no `setAttribute`/`classList`/`style`, no MCP surface token, and the STORE's bytes carry no `overlay`/`state` token (the store's own scan row, asserted FROM the caller side) | a corpus carrying `document.createElement` / `setAttribute` / `provident.` FAILS; the module + caller files PASS |
| **S-TH-1** | the theme module's import census (static form of `P-SMS-TH-IM-1`) — `0` imports, THE FLAG ROW — PLUS the caller-file census of `src/renderer/theme-store.ts` (module value exports + store graph types, NAME-COMPLETE) | same three positive controls as `S-OV-1`; a store import IN `theme.ts` FAILS the flag row |
| **S-TH-2** | the theme caller file's no-module-level-binding scan (static form of `P-SMS-TH-IM-2`); the spelling `file.settings.theme.token` appears EXACTLY ONCE | same controls as `S-OV-2` |
| **S-TH-3** | the theme caller file's no-UI/no-MCP scan: no element, no attribute, no stylesheet, no `.css` artifact, no MCP token; the resolution turn writes NO store state EXCEPT through the declared write turn | a corpus carrying `data-theme`-style authored literals (beyond the passed-through terminology) FAILS `theme.md`'s vocabulary row's class |
| **S-MT-1** | the menu-template module's import census (static form of `P-SMS-MT-IM-1`) — `0` imports, the landed EMPTY census (`P-ML-4`, `I-9`/`I-10`) | the same three positive controls |
| **S-MT-2** | the menu-template module's no-module-level-binding scan (static form of `P-SMS-MT-IM-2`) — no module-scope store-shaped binding; no store-shaped parameter in ANY exported signature (the catalog arrives as the parameter; the store never appears in a signature) | a fixture variant with a module-level `const store = …` or a signature carrying a store parameter FAILS |
| **S-PDV-1** | the LANDED composition is sole-reader: `src/renderer/renderer.ts`'s `createPaneDrag` region contains EXACTLY the tier-qualified reads the pane-drag contract declares for names 1–4 (`resolve('mem.layout.pane.<id>.size')`/`…bounds`/`mem.layout.zone.<id>.slot`/`…distance`) and NO OTHER read of those references anywhere in the tree | a tree scan finding a second read of any name-1–4 reference OUTSIDE the composition FAILS `F-PDV-1`; the composition's own region passes |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| # | Claim | Probe |
| --- | --- | --- |
| **E-OV-1** | no in-tree `src/**` file imports `src/shared/overlay.js` (the module's X-4-class no-importer probe, re-verified) | a glob/static probe: `overlayTransition`/`overlayInertDeclaration` appear in NO `src/**` import statement and no other `src/**` reference |
| **E-TH-1** | no in-tree `src/**` file imports `src/shared/theme.js` (`theme.md` item 9's own reading, re-verified) | the same probe over `resolveTheme`/`applyThemeDeclaration` |
| **E-MT-1** | no in-tree `src/**` file imports `src/shared/menu-template.js` — **THE `F-11` VERIFICATION** (the plan's latent condition, re-verified) | the same probe over `buildMenuTemplate`/`normalizeCatalog`/`selectCatalogItem` |
| **E-PDV-1** | `gutter.ts`/`relocate.ts` bytes are the LANDED ones — no byte of either module changes in this unit | the landing pass's git diff (the unit's own change set contains neither file); the [T]-side probe is the landed suites' green status |
| **E-PDV-2** | **no store byte changes and no `renderer.ts` byte changes in this unit** | the store's frozen-artifact digests (the freeze record at `docs/specs/store-core-module-store-core-graph-surface.md` field 8, AMENDMENT `CONSTRAINT-RE-DERIVE-1`) recompute UNCHANGED after this unit's pass, and `renderer.ts` is absent from the unit's diff |
| **E-ST-1** | the caller files are NEW: `src/renderer/overlay-store.ts` and `src/renderer/theme-store.ts` did not exist before this unit (their creation IS the landing) | the landing pass's git status; the register's caller-file census drives prover-each-file's existence at red time |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**ONE RED→GREEN CYCLE (the queue row's shape; `RCA-2` is satisfied by the `H2` split itself — this unit IS the split
child).** The red set is the `§3` families (`M-OV-*`/`F-OV-*`/`M-TH-*`/`F-TH-*`/`M-MT-*`/`F-MT-*`/`M-PDV-*`/`F-PDV-*`,
the `I-*`/`S-*`/`E-*` rows), the register's EXECUTED layer (`§5.5.1` — every row's `attempts` MUST run and report
held/broken; **an un-run register row is a FAILURE**, never a pass), and the moduled landed suites' green status (the
re-grain-free additive discipline). **THE FAMILIES' HOME IS THE UNIT'S OWN NEW FILE — `tests/store-modules-seams.test.ts`
(the `H2a` F-2 lesson, applied by declaration: the landed suites `tests/overlay.test.ts` / `tests/theme.test.ts` /
`tests/menu-template.test.ts` / `tests/pane-drag-compliance.test.ts` REMAIN the implementations' own regression homes,
UNEDITED — no family byte of this unit is added to them).** The `[T]` layer may import `src/renderer/**` (the caller
files and the landed composition are the drive targets).

### 4.2 Red-set authoring order

1. The harness/double layer first: the recording store double covering the members this unit's contract names
   (`resolve` (thereby the tier-qualified read), `tiers['mem']`/`tiers['file']` handle reads, `commit`, `set`, `remove`,
   `subscribe` returning `{name, subtree, unsubscribe}` handles, an active-subscription set, a written map, a read log,
   an event census) — **the double conforms to the FROZEN surface's shapes and adds no member of its own.**
2. The store-backed positive families (`§3.1`), then the fail-states (`§3.2`), then the invariants (`§3.3`), then the
   statics with their positive controls (`§3.4`), then the existence probes (`§3.5`).
3. The register's executed layer (`§5.5.1`) — deterministic vitest tables over the declared drive counts; **no
   `fast-check`, no property runner, no new dependency** (`AGENTS.md` item 11(d)).
4. The verification half's integration reading: at least one drive per seam implementation composes the LANDED
   `createPaneDrag` from `src/renderer/renderer.js` with the recording double (the `[T]` layer importing `src/renderer/**`
   is the unit's own declared route), plus the `F-PDV-1` falsifier drives and the REAL-store integration reading (the
   `[T]` layer may import the store — the frozen module's exports are landed): at least one row per caller file drives
   the hardware store (the tier-qualified read's HIT/MISS arms on a real store). **⟶ CORRECTED 2026-10-03 (machine clock
   — the `H2b` red-set gate's pre-implementer amendment pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite — the
   transcript, consistent with `§3.1` M-OV-5's correction): the overlay caller's REAL-store MISS arm —
   `transition('a','open')` on a COLD store — answers `{state:'closed', changed:false}` with NO write, and the
   follow-up tier-qualified read of `mem.overlay.a.state` answers `{found:false}` (the store holds nothing); the
   mint/re-mint write is driven FROM A REAL STATE present in the store (M-OV-2's flow — the HIT arm: seed the state,
   drive the changed transition, `commit('mem.overlay.<name>.state', next, {onRepeat:'edit'})` writes). The theme
   caller's REAL-store MISS arm is UNCHANGED (the seed-only arm, M-TH-2).**

### 4.3 What the red is NOT

- NOT a test of the store (the store's own suite owns that; this unit asserts ONLY the surface members its contract
  names).
- NOT a second-authority probe that re-opens a frozen rule (the pane-drag landing, the `'severed'` arm, the refusal
  union — each is cited, never re-ruled).
- NOT a test that requires a module byte to change (a row only satisfiable by editing `overlay.ts`/`theme.ts`/
  `menu-template.ts`/`gutter.ts`/`relocate.ts`/`renderer.ts` or the store is a stop condition, `S-SMS-1`..`S-SMS-4`).
- NOT a test that fabricates a consumer for the latent obligation (the menu-template caller half is recorded-not-landed;
  a row that REQUIRES a caller file today fails the disposition).

### 4.4 The stop conditions (binding)

| # | Condition |
| --- | --- |
| **SMS-S-1** | A row is only satisfiable by changing a store byte, a store member or a store arm — **stop and report: it is a frozen-contract change and owes its own gate** |
| **SMS-S-2** | A row is only satisfiable by adding a store import or a store byte to `src/shared/overlay.ts`/`theme.ts`/`menu-template.ts` — violates the flag-row censuses — **stop and report** |
| **SMS-S-3** | A row is only satisfiable by editing `src/renderer/renderer.ts` (the theme licence) — violates the decision of `§2.3` — **stop and report** |
| **SMS-S-4** | A row is only satisfiable by re-landing a store read for names 1–4 of the pane-drag set, or by editing `gutter.ts`/`relocate.ts` — the second-authority class — **stop and report** |
| **SMS-S-5** | A row requires the caller files to hold the store at MODULE scope — violates the no-module-level-binding rows — **stop and report** |
| **SMS-S-6** | A row requires a caller-side subscription with no release surface — violates `§2.2` item 5 / `§2.3` item 5 — **stop and report** |
| **SMS-S-7** | A verification-half row can only pass by editing the LANDED composition's bytes — the verify-not-re-land rule — **stop and report** |

### 4.5 Delegation gate

**This unit is delegable only once (a) this spec's spec gate has passed, and (b) a TestWriter has RUN and REPORTED the
red set** (`AGENTS.md` item 9). The red run's report must state: the file counts, the red set list, the register's
per-row attempts/held/broken, and the landed suites' status (must stay green). After the spec gate is approved, the
chain proceeds WITHOUT further permission per `AUTONOMY AFTER SPEC APPROVAL` (cited by row name) — the one approval the
chain waits for is the spec gate.

---

## 5. Wiring

### 5.1 Diff scope (what this unit MAY touch)

| # | File | Status | What lands |
| --- | --- | --- | --- |
| 1 | `src/renderer/overlay-store.ts` | **NEW — declared by this unit** | the overlay caller's store turn (`§2.2`): `createOverlayStoreWiring(store)` → `{readState, transition, declaration}` |
| 2 | `src/renderer/theme-store.ts` | **NEW — declared by this unit** | the theme resolution site (`§2.3`): `createThemeResolutionWiring(store, seed)` → `{resolveSetting, writeSetting}` |
| 3 | `tests/store-modules-seams.test.ts` | **NEW — the unit's own red/green/register home** | the entire `§3` family set + the register's executed layer |
| 4 | `docs/specs/store-modules-seams.md` + `store-modules-seams-greens.md` + `archive/reviews/**` records | **NEW** | this filing + the unit's records |
| 5 | the annotated-beside amendment set of `§2.7` item 7 | the LANDING pass (gate-4's doc-review counterpart, `§3b`) | dated annotations (`RCA-8(d)`, kept-visible supersessions) to `docs/specs/overlay.md`, `theme.md`, `menulib.md`, `gutter.md`, `relocate.md` — never a rewrite — **plus the TEST-side sibling set of `§2.7` item 7's dated extension: the three landed test rows (`tests/theme.test.ts` `R-6` (the no-importer half) and `X-5`; `tests/theme-control.test.ts` REG `P-TC-TP-3`), each amended BESIDE to admit EXACTLY the unit's own caller file `src/renderer/theme-store.ts` and NOTHING else — `§2.7` item 7's licence and positive-control clause bind the same** |

**DENIED, with the reason:** `src/renderer/store-core-graph.ts` / `store-graph-references.ts` (FROZEN — `E-PDV-2`'s
digest probe), **`src/renderer/renderer.ts` (the theme-licence decision — its store-wiring bytes are other units'
licensed artifacts; even the VERIFICATION half READS the landed composition, never edits it)**, `src/shared/overlay.ts` /
`theme.ts` / `menu-template.ts` (flag-row censuses — `SMS-S-2`), `src/shared/gutter.ts` / `relocate.ts` (verify-not-re-land,
`SMS-S-4`), the fork's tree (`H-r6`), `docs/FORKER.md` and the fork-request region (`Q-14`'s one documentation pass is
owed AFTER the store units land — `data-ownership-model-plan.md` `§5.6.4`), `docs/next-steps.md`/`docs/pending.md` (the
supervisor's — the `H2b` queue-row cells, the ledger and the §Q theme-token flip are gate 10's), `package.json`/scripts/
config (no new script, no new dependency).

### 5.2 The legs this unit MUST run

| # | Leg | What it is |
| --- | --- | --- |
| **1** | `npm test` `[T]` | the whole of this unit's green — the `§3` families + all register rows, in `tests/store-modules-seams.test.ts`; the landed suites stay green |
| **2** | `npm run typecheck` `[H]` | `src/**` ONLY — it never reads `tests/**` |
| **3** | `npm run typecheck:tests` `[H]` | the ADDITIVE fourth leg — the ONLY typecheck leg that reads `tests/**` (`AGENTS.md` item 4's ruled clause); a claim about THIS unit's own test file must cite this leg |
| **4** | `npm run build` `[H]` | the esbuild bundles (main cjs + preload cjs + renderer esm) — the renderer bundle now includes the two caller files (they are imported by NO `src/**` file, so the bundles' membership is unchanged; the leg's green is a compile/type proof, `RCA-12`) |
| **5** | standalone strict `tsc --noEmit` over this unit's OWN test file | the TestWriter-side strictness leg (a `--strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --types node,vitest/globals` compile) |

**`[U]` NOT OFFERED and `[D]` NOT CLAIMED — STRUCTURAL, three-part:** **(1)** the caller files are imported by NO
`src/**` file at landing and the modules stay imported by none (the in-app composition is the consuming project's — the
split ruling's `remainder / coherent core`; the pane-drag unit's M-12 precedent drove its composition module-externally
with a recording source double — this unit's drives are the same class), so no assembled rendered flow exists to
exercise; **(2)** every drive below executes in the `[T]` layer (recording doubles + the landed composition + the real
store module) — there is no rendered surface and no window to boot; **(3)** gate 6 is `STRUCTURAL` — the word `waived`
may not be substituted for it.

### 5.3 The DONE row's shape

The unit's DONE row (the supervisor's to write at gate 10) must carry: the unit id/wave (`H2b` · wave `H`), the honest
gate list (spec → red → green → adversarial + PBT audit → blind greens → doc review → trio/legs → DONE), the register's
per-row attempts/held/broken with the **printed terms (`108 = 7 + 4 + 25 + 7 + 4 + 25 + 7 + 4 + 25`, family subtotals
IM `33` · TP `75`, caps `108 ≤ 400` · max row `25 ≤ 100` — `§5.5.3`), an un-run register row listed as a FAILURE**, the
landed suites' green status (UNEDITED regression homes), the two DECISIONS as landed (`§2.3`'s new-file decision —
`renderer.ts` absent from the diff; `§2.4`'s recorded-not-landed disposition with the revisit condition), the amendment
set of `§2.7` item 7 as landed, the verification half's verdict rows (the pane-drag reads verified store-backed, no
re-land, no second authority), the `[U]`-NOT-OFFERED structural reason, and the store's frozen digests recomputed
UNCHANGED (`E-PDV-2`). The gate-10 pass ALSO flips the `H2b` queue-row cells and the §Q theme-token cell (item 7 of
CURRENT STATE), per the supervisor's remit.

### 5.4 Rollback

The unit's landed bytes are the TWO new wiring files + the unit's own test file + the annotated-beside notes: reverting
this unit's diff (a) restores the three modules and the two pane-drag mechanism modules to their landed byte sets
(their landed suites re-green) and (b) leaves the store AND `renderer.ts` byte-identical by construction (`E-PDV-2`).
**No migration exists and none is owed**: the overlay record is `mem`-tier per-name and written by the caller (a cold
start MISses and re-mints — no legacy carrier); the theme token is `file`-tier with the declared seed as the only
fallback (a cold start answers the seed — no migration); the menu obligation is recorded-not-landed (nothing to
migrate).

### 5.5 The typed Property register

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` (cited by row name) binds: a code-bearing unit's spec MUST carry its typed
`§5.5.1` register BEFORE its red set is authored; the zero-row exemption is NOT available here** (this unit's caller
files are code-bearing). **The `≤8` per-module figure is a component-breakdown SIGNAL, never a ceiling and never a
reason to drop a discernible property** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`): each
module carries exactly its THREE mandated rows — the plan's `§5.2.7` round-3 item (4) set — and no other discernible
property is left unenumerated (the verification half's rows are `§3` rows, not register rows; a `§6`/`FS-n` citation is
never used as a register row). **A declared term IS a DRIVE count** (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`); the
total is printed WITH its terms (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).

### 5.5.1 THE REGISTER — `9` typed rows (`6` `P-IM` + `3` `P-TP`), ALL executed deterministically, no PBT harness

**Typed rows only — `P-IM` (invariant) and `P-TP` (totality); no `F-` row and no `§6` citation is a register row.**

| # | Type | Strategy id | What it asserts | Drive | Cap |
| --- | --- | --- | --- | --- | --- |
| **P-SMS-OV-IM-1** | `P-IM` | `S-SMS-OV-IM-1` | **THE OVERLAY MODULE'S IMPORT CENSUS, UNCHANGED — PLUS THE CALLER-FILE CENSUS THE REGISTER DRIVES:** `src/shared/overlay.ts` carries ZERO import statements — over the RAW bytes, a NORMALIZED view and COMMENTS-scanned-as-code (its landed census, `P-OV-4`/`I-4`'s force — the module's own bytes import NOTHING; the store is reached ONLY by the caller); **and the caller file `src/renderer/overlay-store.ts` EXISTS and its import set is the DECLARED name-complete set** (the module's two value exports `overlayTransition`/`overlayInertDeclaration` + the store's graph TYPES — the caller MAY import the store's surface; an import of a SIBLING MECHANISM (`../shared/gutter.js` etc.) FAILS) | **`7` attempts** = `3` module readings (raw · normalized · comments-as-code) + `3` positive controls (a fixture variant of the module carrying `import { createGraphStore } from '../renderer/store-core-graph.js'` MUST FAIL · `require('../renderer/store-core-graph.js')` MUST FAIL · `import('../renderer/store-core-graph.js')` MUST FAIL) + `1` caller-file census drive (the wiring file's import set BY NAME, minus the sibling-mechanism control) | `7 ≤ 100` |
| **P-SMS-OV-IM-2** | `P-IM` | `S-SMS-OV-IM-2` | **THE OVERLAY CALLER FILE'S NO-MODULE-LEVEL-BINDING ROW:** the store handle appears ONLY inside `createOverlayStoreWiring`'s parameter declaration and its closures' parameter-scoped references; no module-scope `const`/`let`/`var` holds it; the declaration-position check pins the factory's parameter | **`4` attempts** = `1` caller-file scan (top-level scope, closed against assembly and comments) + `2` positive controls (a module-level `const store = …` MUST FAIL · a module-level `let store;` MUST FAIL) + `1` declaration-position check (the factory declares the store parameter) | `4 ≤ 100` |
| **P-SMS-OV-TP-1** | `P-TP` | `S-SMS-OV-TP-1` | **THE OVERLAY CALLER'S STORE-STATE-INDEPENDENCE DIFFERENTIAL:** for the FIXED ARGUMENT TUPLE (fixed `name` `'a'` + the fixed 8-call script), the canonical projection of every answer is IDENTICAL across THREE runs whose ONLY difference is the store's tier state — COLD (no nodes under the module's names) · SHADOWING (the module's names pre-held at `temp`, cleared by the script's first `mem` commit — exercising the clear-event fan-out) · COMMITTED (a `file`-tier copy pre-seeded, never cleared by a `mem` commit; invisible to the tier-qualified `mem` reads). **Comparator: the round-3 `R-3` rule — canonical structural comparison for the record answers (the module's transition records and the declaration record: own enumerable keys, sorted by key, primitives by value), `===` for primitives.** **The 8 script answers: (1) the mint-commit receipt (`commit('mem.overlay.a.state','closed')`) · (2) `readState('a')` ⇒ `'closed'` · (3) `transition('a','open')` ⇒ `{state:'open',changed:true}` · (4) `transition('a','open')` again ⇒ `{state:'open',changed:false}` · (5) `transition('a','escape', cb)` ⇒ `{state:'closed',changed:true}` with `cb` once · (6) `declaration(target,'data-inert',true)` ⇒ the four-member write · (7) `transition('a','toggle')` ⇒ `'open'` · (8) the tier-qualified readback ⇒ `'open'`.** **The tier-state differences legitimately change the STORE's internal transitions (clears, events); they NEVER change a caller answer — a projection that differs across runs FAILS.** | **`25` attempts** = `3` runs × `8` script answers + `1` positive control (a fixture wiring whose answers consult an AMBIENT name — a store name outside `mem.overlay.<name>.state`, or a module-held variable — MUST FAIL the cross-run equality) | `25 ≤ 100` |
| **P-SMS-TH-IM-1** | `P-IM` | `S-SMS-TH-IM-1` | **THE THEME MODULE'S IMPORT CENSUS — THE FLAG ROW, UNCHANGED — PLUS THE CALLER-FILE CENSUS:** `src/shared/theme.ts` carries ZERO import statements (the flag row `R3-4` names; the module's own bytes import NOTHING); **and the caller file `src/renderer/theme-store.ts` EXISTS and its import set is the DECLARED name-complete set** (the module's two value exports `resolveTheme`/`applyThemeDeclaration` + the store's graph TYPES; no sibling mechanism import) | **`7` attempts** = `3` module readings + `3` positive controls (a store import / `require` / dynamic `import` IN `theme.ts` EACH MUST FAIL) + `1` caller-file census drive | `7 ≤ 100` |
| **P-SMS-TH-IM-2** | `P-IM` | `S-SMS-TH-IM-2` | **THE THEME CALLER FILE'S NO-MODULE-LEVEL-BINDING ROW** — same shape as `P-SMS-OV-IM-2`, over `createThemeResolutionWiring`'s parameter and closures; the spelling `file.settings.theme.token` composed at exactly ONE site | **`4` attempts** = `1` caller-file scan + `2` positive controls + `1` declaration-position check | `4 ≤ 100` |
| **P-SMS-TH-TP-1** | `P-TP` | `S-SMS-TH-TP-1` | **THE THEME RESOLUTION SITE'S STORE-STATE-INDEPENDENCE DIFFERENTIAL:** fixed tuple (`seed = 'light'` + the fixed env `{prefersDark:true}`) over the fixed 8-call script, THREE tier-state runs — COLD · SHADOWING (the `settings.theme.token` path pre-held at `temp`, cleared by the script's first `file` commit — the tier-1 commit clears lower copies, `§2.8` items 2/5) · COMMITTED (a pre-seeded `file` copy, REPLACED by the script's own `file` commit — `{onRepeat:'edit'}`). **The 8 script answers: (1) the mint-commit receipt (`commit('file.settings.theme.token','light')`) · (2) `resolveSetting(env)` ⇒ `{setting:'light',prefersDark:true,source:'env'}` · (3) `resolveSetting(env)` again ⇒ identical · (4) `writeSetting('dark')` ⇒ the edit receipt · (5) `resolveSetting(env)` ⇒ `{setting:'dark',…}` · (6) `remove('file.settings.theme.token')` ⇒ the downward-clear receipt · (7) `resolveSetting(env)` ⇒ **the SEED arm** `{setting:'light',…}` — the seed BY IDENTITY · (8) the tier-qualified readback ⇒ `{found:false}` (the seed arm writes nothing).** Comparator per `R-3` (canonical structural for the record answers, `===` for primitives; the seed's identity asserted `toBe`). | **`25` attempts** = `3` runs × `8` script answers + `1` positive control (a fixture resolution turn consulting an AMBIENT store name or a module-held token MUST FAIL) | `25 ≤ 100` |
| **P-SMS-MT-IM-1** | `P-IM` | `S-SMS-MT-IM-1` | **THE MENU-TEMPLATE MODULE'S IMPORT CENSUS — `0` IMPORTS (the landed EMPTY census), WITH THE NO-CONSUMER ABSENCE PROBE STANDING IN FOR THE CALLER-FILE HALF:** the module's own bytes import NOTHING (`P-ML-4`/`I-9`/`I-10`); **the caller-file half is RECORDED-NOT-LANDED (`§2.4`) — its drive is the ABSENCE PROBE: no `src/**` file imports `src/shared/menu-template.js` (the `F-11` verification), so no caller file exists to census; when a consumer lands, the revisit condition re-drives this half** | **`7` attempts** = `3` module readings + `3` positive controls (a store import / `require` / dynamic `import` IN `menu-template.ts` EACH MUST FAIL) + `1` no-consumer probe (a `src/**` recursive scan matching the module's specifier MUST read ZERO) | `7 ≤ 100` |
| **P-SMS-MT-IM-2** | `P-IM` | `S-SMS-MT-IM-2` | **THE MENU-TEMPLATE MODULE'S NO-MODULE-LEVEL-BINDING ROW (the caller-file row, adapted to the recorded-not-landed form):** no module-scope `const`/`let`/`var` holds a store-shaped value; **no exported signature carries a store-shaped parameter** (the catalog arrives as the parameter — the store never appears in a signature); the future caller's store handle is REQUIRED to be a declared call parameter by this row's declared reading | **`4` attempts** = `1` module scan (top-level scope, closed against assembly and comments) + `2` positive controls (a fixture variant with a module-level `const store = …` MUST FAIL · a signature carrying a store parameter MUST FAIL) + `1` declaration-position check (the module's exported functions' parameters are catalog/options/picker — never a store) | `4 ≤ 100` |
| **P-SMS-MT-TP-1** | `P-TP` | `S-SMS-MT-TP-1` | **THE MENU-TEMPLATE MODULE'S STORE-STATE-INDEPENDENCE DIFFERENTIAL (OVER THE MODULE'S OWN ANSWERS — NO CALLER FILE EXISTS):** the fixed corpus over the module's exported functions, THREE tier-state runs (COLD · SHADOWING · COMMITTED — the runs differ ONLY in the tier state of a hypothetical `file.menu.catalog`/`mem.menu.catalog`, which the module NEVER touches), every answer IDENTICAL. **The 8 script answers: (1) `normalizeCatalog(fixed)` · (2) `normalizeCatalog(hostile)` (a cycle/revoked-proxy corpus) · (3) `buildMenuTemplate(fixed,{platform:'darwin'})` · (4) `buildMenuTemplate(fixed,{})` (no collapse) · (5) `buildMenuTemplate(fixed,{platform:'win32', picker: throwing})` (the degraded arm) · (6) `selectCatalogItem(fixed, picker-hit)` · (7) `selectCatalogItem(fixed, picker-miss)` · (8) `buildMenuTemplate(null)` (total).** Comparator per `R-3`; the projections match the module's landed `M-*` answers. **The differential executes the anti-ambient claim TODAY: a module whose answer varies with the tier state of a name it never reads MUST FAIL.** | **`25` attempts** = `3` runs × `8` script answers + `1` positive control (a fixture module variant consulting a module-level store-shaped value MUST FAIL the cross-run equality) | `25 ≤ 100` |

**REGISTER-ROWS 5.5.1's `≤8`-per-module READ:** `overlay` carries `3` rows (≤ 8) · `theme` carries `3` rows (≤ 8) ·
`menu-template` carries `3` rows (≤ 8) — the mandated set is complete and no discernible property is left
unenumerated (the verification half's claims are `§3` rows, not register rows — `F-PDV-1`/`F-PDV-2`'s enumeration is
the component breakdown's `§3` half).

### 5.5.2 The register's honesty block — what is NOT proven

1. **The differential proves the ANTI-AMBIENT claim, not the store's correctness.** The fixed scripts' answers are the
   caller/module surfaces computed from the fixed tuples; a cross-run projection difference proves ambient consultation,
   and each row's positive control makes the probe non-vacuous. The store-touching turn EFFECTS (the writes, the delivery
   counts, the event census) are the `§3` rows' subjects, not these rows' — no over-strength claim is made here.
2. **The differential does NOT claim the store's writes are value-deterministic across tier states** — run C
   legitimately leaves the pre-seeded `file` copy in place where a `mem`/`temp` commit cannot clear it (theme's run C is
   REPLACED by the script's own `file` commit; the readbacks are the module's names as READ, TIER-QUALIFIED) — the rows'
   equality is over the ANSWERS, never over the store's full byte state.
3. **The menu-template rows prove the module is argument-determined TODAY — they prove NOTHING about the future caller's
   store read**, which is recorded-not-landed (`§2.4`); the revisit-condition pass re-drives the caller half.
4. **The verification half is a VERIFICATION, not a new contract:** `M-PDV-*`/`F-PDV-*` assert the LANDED composition
   behaves as its own contract declares (citation to `pane-drag-compliance.md` `§2.1`), and `F-PDV-1`/`F-PDV-2` assert
   the absence of a second authority — a re-derivation of those rights is not this unit's.
5. **No timing figure, no length census, no suite size is claimed anywhere in this file** (`RCA-12`).

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, WITH ITS TERMS: `108 = 7 (P-SMS-OV-IM-1) + 4 (P-SMS-OV-IM-2) + 25 (P-SMS-OV-TP-1) + 7
(P-SMS-TH-IM-1) + 4 (P-SMS-TH-IM-2) + 25 (P-SMS-TH-TP-1) + 7 (P-SMS-MT-IM-1) + 4 (P-SMS-MT-IM-2) + 25
(P-SMS-MT-TP-1)`** (chain `7 → 11 → 36 → 43 → 47 → 72 → 79 → 83 → 108`; per-family subtotals **IM `33` · TP `75`**).
**Caps: `108 ≤ 400` ✔ · per-row maximum `25` (`P-SMS-*-TP-1`) ≤ `100` ✔ · stop-after-5 consecutive failures applies per
row.** **A total that is not the sum of its own terms, or a total quoted without its terms, is a review finding**
(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) — the form above is the operative one; a mis-sum is corrected BY
ANNOTATION beside the as-filed form, never by silent rewrite.

---

## 6. Honest statements (recorded so no later pass over-reads this unit)

1. **A green `[T]` suite is envelope/pure-layer evidence — never assembled-app evidence** (`RCA-12`): the caller files
   are imported by NO `src/**` file at landing and the modules stay imported by none, so every green claim about the
   store-backed turns is a module-external composition green (the pane-drag unit's M-12 class), and **the store-backed
   overlay/theme turns are not observable in any assembled flow this repo ships** — the in-app composition is the
   consuming project's, per the split ruling's `remainder / coherent core`.
2. **The `user-flow-audit.md` `§7.1` predicate is determined NOT TRIGGERING, and NO report is due.** Limb A (an
   authored rendered surface): this unit authors no element, no envelope node, no handler body, no component binding,
   no control. Limb B (a changed user-visible flow): no in-tree consumer exists, so no assembled rendered flow changes.
   **A pass that files a zero-row `§5.U` report for this unit has failed this item.**
3. **The theme-licence decision is about the LICENCE REGIME, not about convenience** (`§2.3`'s reason, four parts):
   `renderer.ts`'s store region is the collected diff-scope of `U-STORE-CORE` and `U-PANE-DRAG-COMPLIANCE`; the unit's
   own register rows require a clean caller file; the new declared file is the smaller diff by every measure.
4. **The menu-template disposition is RECORDED-NOT-LANDED, and that IS a landing of the obligation's record**: the
   obligation is declared, its revisit condition is exact (`§2.4` item 3), and a later pass that quotes this unit as
   having LANDED a menu store read over-reads it; a later pass that treats the obligation as UNDECLARED also over-reads
   it.
5. **The verification half asserts the LANDED contract, never a new one** (item 4 of `§5.5.2`): a row of this unit
   that re-rules the pane-drag reads (a new fallback, a new tier, a new spelling) is a finding against THIS file.
6. **This unit performs NO fork-facing recording** — `Q-14`'s one documentation pass (`docs/FORKER.md` §4, the
   `docs/pending.md` fork-request region) is owed AFTER the store units land and is not this unit's.

---

## 7. Falsification / stop conditions

1. **The spec-gate falsification:** a review that finds a clause above contradicts a cited §/row of the plan, the store
   contract, the pane-drag compliance spec, `docs/decisions.md` (by row name) or a landed module spec — with BOTH
   citations named — is a finding against THIS file, and the architect's ruling settles it; a contradiction this pass
   cannot resolve on its own is a genuine blocker report (the one class that may not be resolved in-pass). **The two
   decisions of this gate are NOT that class**: both are decidable from the cited authorities (the licence regime for
   the theme read; the `F-11` recorded condition for the latent row), each is decided here with its reason, and **no
   architect routing is owed for either**.
2. **The assembly rule:** every static row scans a NORMALIZED view (concatenation joined) and scans COMMENTS as code —
   the anti-assembly discipline binds every scanner this unit authors; a prohibition satisfiable by splitting a token
   is not satisfied.
3. **The amendment set is annotate-beside, never rewrite:** `§2.7` item 7's rows land as dated annotations keeping the
   landed bytes visible; a pass that rewrites an as-filed no-store row instead of annotating beside it has failed the
   landing.
4. **The second-authority alarm binds the whole unit:** a row that can only pass by re-landing a pane-drag read, by
   adding a subscription with no release surface, or by editing `renderer.ts`'s licensed region is a stop condition
   (`SMS-S-3`/`SMS-S-4`/`SMS-S-6`), and a unit that reports green while any of them is red has failed its gate.

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from as written

**None is reported at filing: every clause above is stated with its drive or its working default.** The five judgment
clauses are recorded as DECIDED or as working defaults with their owners:

### 7a.1 The decision/working-default ledger

| # | Item | Decision / working default | Owner of a reversal |
| --- | --- | --- | --- |
| **1** | the overlay store-record MISS handling (`§2.2` item 4) | **WORKING DEFAULT**: pass the read's outcome to the module (whose landed totality answers the declared coercion), re-mint on the next `changed` turn — never a caller-invented default, never a throw | the architect; a reversal is a spec amendment |
| **2** | NO store subscription in the overlay/theme caller turns (`§2.2` item 5, `§2.3` item 5) | **WORKING DEFAULT**: the turns' reads ARE the observations; a subscription would be an unowned lifecycle (no `dispose()`-release surface exists in these caller files — `H2a`'s hosts gained one, these do not) | the architect; a reversal OWES a release surface and a gate |
| **3** | THE THEME LICENCE (`§2.3`) | **DECIDED: option (a) — the NEW declared file `src/renderer/theme-store.ts`; `renderer.ts` stays byte-identical; NO carve-out is declared** (reason, four parts, at `§2.3`). The alternative (option (b), the read in `renderer.ts`'s wiring with a licence carve-out) is recorded with its cost: it would re-open two other units' bounded diff scopes, make the register's no-module-level-binding row unsatisfiable over that file, and add an annotation against a landed contract — NOT taken | the architect; a reversal OWES a dated licence ruling and a re-derivation of the register rows |
| **4** | the theme DEFAULT-SEED rule's write posture (`§2.3` item 4) | **WORKING DEFAULT**: the miss answers the declared seed WITHOUT a store write; the next write turn re-mints (`H2a`'s MISS-rule shape). The alternative (a seed-mint on the miss) costs one extra write per cold resolution and is NOT taken | the architect; a reversal is a spec amendment |
| **5** | the menu-template LATENT disposition (`§2.4`) | **DECIDED: RECORDED-NOT-LANDED** — the obligation is declared, its landing is OWED until a consumer exists, the revisit condition is the first pass that lands a `src/**` import of the module (exact, `§2.4` item 3). The alternative (land-now, a caller file with no consumer) is dead code with an unowned store surface — NOT taken | the architect; a reversal lands the caller file and re-drives the register's caller half |

---

## 8. Falsification, cross-references and the citation index

| §/Row | Cites (by §/row id or ROW NAME) |
| --- | --- |
| `§0` rulings 1–17 | `docs/decisions.md` `DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (+ `D-GP-SAD-5`) · `docs/next-steps.md` row `H2b` (and row `H1` for `focus-model`'s out-of-scope citation) · `data-ownership-model-plan.md` `§5.2.7` (round-3 table rows 3/4/7/11/12, round-3 item (4), the byte terms `15 = 2 + 6 + 7` and `§5.6.1`'s printed figures) · `§5.6.5` (round-3 block) · `§5.9` rows 1/2/6/20/21/24 · `§5.10` round-3 `R-1`/`R-2` · `§1.3` `R-1`/`R-2`/`R-3`/`R-5`/`R-6` · `store-core-graph.md` `§2.1`/`§2.8`/`§2.10` items 1–6/`§2.11` item 1 · `docs/decisions.md` `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `AUTONOMY AFTER SPEC APPROVAL` · `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` · `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` |
| `§1` | the split ruling's boundary (i) vs (ii); `H2a`'s sibling boundary; `H1`'s `focus-model`; `Q-14`'s recording pass `§5.6.4`; `H-r6`; the `§5.9.1` sweep |
| `§2.1` | plan `§5.2.7` rows 7/11/12 + row `R3-4`'s reading; store `§2.1` (`GraphStore`, `GraphResolveResult`, `GraphSubscription`, `GraphTierGetResult`), `§2.8` items 1/3/4, `§2.2` `P-5`; the pane-drag `M-12`/composition posture |
| `§2.2` | plan row 11; store `§2.8` items 1/3; overlay.md `§2.3`/`§2.4`/`P-OV-4`/`I-4`/`M-9`/`P-OV-TP-1`; `E5-B-1`; `THROWING-SUPPLY-…`; `§7a.1` items 1/2 |
| `§2.3` | the queue row's decision cell; plan row 12 + `§5.9` row 21 + `§5.10` `R-1`; theme.md `§2.1`/`§2.3`/`§2.4`/item 6/ruling 3/`P-TH-4`/`P-TH-11`/`P-TH-12`/`I-4`; store `§2.8` items 2/3/6; `§7a.1` items 2/3/4 |
| `§2.4` | plan row 7 + its `F-11`; menulib.md `P-ML-4`/`I-9`/`I-10`/`§3.5 X-1`/`M-*`-family/`R-1`'s no-`theme` scope note (theme.md's `§2.2` collision row); `§7a.1` item 5 |
| `§2.5` | pane-drag-compliance.md `§2.1` A/B, `§2.3` items 1/2, `§2.4` names 1–4, `§5.1` row 1 + its gate-8 annotation; plan rows 3/4 + `§5.9` rows 1/2; gutter.md `§2.2 P-9`/`P-10`; relocate.md `§2.2 P-6`/`§3.3 I-13` |
| `§2.6` | plan `§1.3` `R-1`/`R-2`/`R-3`/`R-6`; `E5-B-2-…` (the opacity discipline); the store's register-input shape |
| `§2.7` | `§5.9` rows 1/2/6/20/21; the landed no-store rows named in item 7 (`overlay.md P-OV-4`, `theme.md P-TH-4`/`P-TH-11`/`P-TH-12`, `menulib.md P-ML-4`, `gutter.md P-9`/`P-10`, `relocate.md P-6`) |
| `§3` | the landed module rows cited per cell (overlay `M-9`/`P-OV-TP-1`/`P-OV-4`/`I-4`; theme `M-1..M-8`/`P-TH-*`; menulib `M-*`/`I-9`/`I-10`; pane-drag `§2.1` A/B/`§2.3` item 2/`§2.4` names 1–4); store `F-11`-class refusals only as cited |
| `§5.5` | `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` + the register-row family (cited by row name); the `H2a` sibling's register shape |
| `§6` | `docs/specs/user-flow-audit.md` `§7.1`; `RCA-12`; the split ruling's `remainder / coherent core`; `Q-14`'s `§5.6.4` |
| `§8` (this index) | every § above |

**FILE-END NOTE (the sibling convention):** nothing follows this section's `§3a`/`§3b` blocks; the adversarial seed set
and the disposition table sit at the file end so that no later annotation lands after them.

---

## 3a. Adversarial findings — status as filed: `OWED`; this table is the SEED SET for the pass that will run

| # | Seed (the class the pass must probe) | Note |
| --- | --- | --- |
| **ADV-SMS-1** | a turn invoked RE-ENTRANTLY — a transition callback (the overlay Escape equivalent) that calls the wiring's own `transition`/`readState` from inside its body | the caller's turn must stay total (no throw, no corrupted record); the module's own re-entrancy discipline (`overlay.md`'s landed rows) is composed as-is |
| **ADV-SMS-2** | a hostile store whose `commit` returns a REFUSED/REPAIRED receipt on the overlay/theme write turns | the answer must be UNCHANGED by the receipt (the module's answer is computed from its own read+transition; the store's receipt is the store's declared return) — `§2.2` item 3's rule |
| **ADV-SMS-3** | the theme resolution turn with a hostile `env` AND a throwing store read AT THE SAME TIME | both absorptions must compose (the module's hostile-env totality + the wiring's store degradation) — never a throw, never a wrong `source` |
| **ADV-SMS-4** | the `seed` supplied as a hostile shape (a `Symbol`, a revoked `Proxy`, a throwing accessor) | the seed arrives as the caller's own opaque value; the resolution turn must carry it BY IDENTITY into `resolveTheme`'s `setting` member exactly as the module's own pass-through rule handles ANY setting — no coercion hook consulted (`theme.md` `P-TH-1`/`R-1`) |
| **ADV-SMS-5** | the verification half with a throwing `tierRead` — a store whose `resolve`/`get` throws mid-drive | the LANDED composition's declared degradation must hold (MISS-answer, no throw — `pane-drag-compliance.md` `§3.2 F-8`'s class); the pass confirms the landed rows' drive stands on the hostile double, or records the absence as a finding |
| **ADV-SMS-6** | a LATER consumer file that imports the overlay/theme caller files AND the store and registers a subscription | the unowned-subscription rule (`§2.2` item 5) is about THIS unit's files; the adversarial pass verifies the seed's boundary wording (a consumer owns its own release — `H2a`'s `dispose()` pattern is the consumer's precedent), or records the ambiguity |

## 3b. The adversarial pass's disposition table — the SHAPE this contract will be reconciled to

**As filed this table is EMPTY and every row of `§3a` reports its disposition here at the adversarial gate (gate 4,
recorded with one of the six recorded dispositions, never a bare `OWED`), plus the read-only PBT audit's verdicts on the
`§5.5.1` rows (over-strength / under-assertion / evasion — each dispositioned here), plus the gate-4 doc-review's
verdict on the `§2.7` item 7 amendment set (landed BESIDE at that pass, with the `DOC-REVIEW-ITEM` class recorded).**
**A unit DONE row that cites no adversarial pass, or whose findings are unrecorded, is a review finding (`RCA-3`).**

**THE DISPOSITION VOCABULARY, defined so no row carries an undefined token:** **`HOST-FIX`** — a document finding owed
to this spec-writer pass, landed here (this file + the landed specs' annotations, `RCA-8(d)` annotate-beside);
**`RED-SET-FIX`** — a finding whose remedy lives in the red set, owed to the TestWriter's parallel pass
(`tests/store-modules-seams.test.ts`); **`PAR-note`** — a note the parallel pass records beside a cell, no host document
change owed; **`SATISFIED`** — a finding the audit verified SATISFIED, with what was verified named; **`GATE-10`** — a
tracker-cell fix owed to the supervisor's DONE-row pass at gate 10; **`DOC-REVIEW-ITEM`** — an item CARRIED to the
gate-8 documentation-review pass (recorded here, not required at this gate).

*(empty as filed — the table is filled at gate 4)*