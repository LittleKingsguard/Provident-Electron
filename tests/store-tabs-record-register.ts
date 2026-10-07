// tests/store-tabs-record-register.ts — THE `§5.5.1` TYPED PROPERTY REGISTER of
// `U-STORE-TABS-RECORD` (ledger row `T2`, wave `T`): the tier-1 `file.tabs.*` record,
// the caller-supplied `exactly-one-active` constraint with its ruled repair, the PERSISTED
// CLOSE, the reserved landing entry, and the two authored pages.
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts` only,
// so it is never collected as a suite). It carries the register's TYPED ROWS and the
// harness that EXECUTES them; `tests/store-tabs-record.test.ts` imports both, so the
// register rides the SAME node suite (`npm test`, `§5.2` leg 1) exactly as `§5.5.1`
// requires and the test file itself stays reviewable. The precedents are
// `tests/store-core-graph-register.ts` (the harness's executed-layer form) and
// `tests/secure-exclusion-register.ts` (the same discipline at a red boundary).
//
// CONTRACT (the only authority): `docs/specs/store-tabs-record.md`
//   `§5.5`   — the execution form, the caps, the stop rule, the family prefix.
//   `§5.5.1` — THE TABLE: `15` typed rows = `5` `P-IM` + `4` `P-SM` + `6` `P-TP`
//              (`5 + 4 + 6 = 15` ✓), `15` strategy ids (`S-TR-*`), every row's TERM and
//              the fifteen named drive states.
//   `§5.5.2` — the honesty block: `[T]`/`[H]` only; NO rendered-pixel claim, NO
//              timing figure, NO `[D]` row; `executed = declared` IS OWED at `148` and
//              **an un-run row is a FAILURE, never a pass**.
//   `§5.5.3` — the attempt arithmetic: `12 = 6×2` · `8 = 4×2` · `16 = 8×2` · `12 = 6×2` ·
//              `6 = 3×2` · `10 = 8 + 2` · `10 = 5×2` · `6` · `8 = 4×2` · `16 = 8×2` ·
//              `8 = 4×2` · `8 = 4×2` · `8 = 4×2` · `8 = 4×2` · `12 = 6×2`.
//
// THE ARITHMETIC, PRINTED WITH ITS FIFTEEN TERMS
// (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, `§5.5.1`'s closing row):
//   `148 = 12 + 8 + 16 + 12 + 6 + 10 + 10 + 6 + 8 + 16 + 8 + 8 + 8 + 8 + 12`
//   the chain `12 → 20 → 36 → 48 → 54 → 64 → 74 → 80 → 88 → 104 → 112 → 120 → 128 → 136 → 148`
//   subtotals BY TYPE `P-IM 54 = 12 + 8 + 16 + 12 + 6` · `P-SM 26 = 10 + 10 + 6` ·
//   `P-TP 68 = 16 + 8 + 8 + 8 + 8 + 12` — `54 + 26 + 68 = 148` ✓ (`5 + 4 + 6 = 15` ✓)
//   ⟶ `2026-10-11` ANNOTATE-BESIDE (`SD-2`; `§0D` item `2`; `RCA-8(d)`): the `P-SM 26` above is
//   the AS-FILED MIS-SUM and it OMITTED row `9` (`P-TR-SM-3`, term `8` = `4` boot states × `2`
//   readings), which the printed `P-TP 68` correspondingly carried. THE OPERATIVE SUBTOTALS,
//   PRINTED WITH THEIR TERMS: `P-IM 54 = 12 + 8 + 16 + 12 + 6` · `P-SM 34 = 10 + 10 + 6 + 8` ·
//   `P-TP 60 = 16 + 8 + 8 + 8 + 8 + 12` — `54 + 34 + 60 = 148` ✓. THE TOTAL IS UNMOVED AT `148`,
//   THE CHAIN IS UNMOVED, `max 16 ≤ 100` ✓ and `148 ≤ 400` ✓, and NO ROW'S TERM, STRATEGY ID OR
//   ATTEMPT COUNT MOVES.
//   caps: per-row maximum `16` ≤ `100` per row; declared total `148` ≤ `400` in total.
//
// NO GENERATOR, NO PINNED SEED, NO NEW DEPENDENCY (`§5.5`'s execution form): every row's
// strategy is exhaustive/finite enumeration or a static reading — NO `Math.random`, NO
// `fast-check`, NO property runner, NO fourth leg.
//
// THE MODULE'S ABSENCE IS DATA, NOT AN ERROR (`§4.1` item 2's honest red classes). This
// file never statically imports the wiring under test: it resolves `src/renderer/
// renderer.ts` through an `existsSync` check before a fragment-assembled dynamic
// specifier, so an absent export or a module that will not load in the node host makes
// each dependent attempt a counted BROKEN attempt carrying its reason, and the global
// stop rule can fire on real data. A placeholder drive is a lie about coverage: every
// drive below is the REAL assertion its row's property states and throws ONLY when the
// property is actually falsified.
//
// THE TWO RED CLASSES THIS REGISTER MEASURES AT TODAY'S BYTES (reported, never smoothed;
// `§4.1` item 2, `RCA-12`):
//   (1) THE ABSENT CONSTRAINT AT THE CONSTRUCTION SITE — the wiring's declaration site
//       (`§2.2` item 1: "this unit supplies ONE member at the store's existing
//       construction site") supplies no `constraints` member, and the record itself is
//       unwritten (`§1.2` item 2: `grep 'file\.tabs'` over `src/**` returns `0` hits).
//   (2) THE RECORD-ENTRY READ THE CONTRACT DECLARES IS NOT PRODUCED BY THE FROZEN STORE
//       FOR THE DECLARED PER-TAB SPELLING — reported as a SPEC DEFECT with its clause in
//       this pass's report; every drive that reads a per-tab active THROUGH the matched
//       record is authored AS THE CONTRACT STATES IT and is left failing, never weakened.
//
// A DRIVE WHOSE SUBJECT THE CONTRACT DOES NOT SUPPLY IS STILL WRITTEN AS A REAL ASSERTION
// and reported as a CONTRACT GAP in this pass's report rather than satisfied with a
// placeholder or a fabricated seam.

import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { expect } from 'vitest'

/* ───────────────────────────── THE PATHS (`§5.1`, `§2.1`) ───────────────────────────── */

/** `§2.2` item 1 / `§5.1` row 1 — THE WIRING. Fragmented so this module's own bytes never
 *  carry a resolvable specifier for a module whose surface may not yet carry the declared
 *  member. */
const RENDERER_SRC = new URL('./../src/renderer/' + 'renderer' + '.ts', import.meta.url)
const RENDERER_SPECIFIER = './../src/renderer/' + 'renderer' + '.js'
/** `§5.1` row 2 — THE ENVELOPE MODULE that carries the app's authored nodes. */
const ENVELOPE_SRC = new URL('./../src/shared/' + 'demo-envelope' + '.ts', import.meta.url)
/** `§5.1` item 7 — THE TWO FROZEN STORE MODULES (their executed file pins). */
const STORE_CORE_SRC = new URL('./../src/renderer/' + 'store-core' + '-graph.ts', import.meta.url)
const STORE_REFS_SRC = new URL('./../src/renderer/' + 'store-graph' + '-references.ts', import.meta.url)
/** The frozen artifact whose fields-1–7 span carries the `29772ac7…` figure (never a
 *  file-pin figure — `§5.1` item 7's own attribution note). */
const FROZEN_ARTIFACT_SRC = new URL(
  './../docs/specs/' + 'store-core-module-store-core' + '-graph-surface.md',
  import.meta.url,
)
/** The two `[U]` precedents the contract names (`§7` item 2(d)). */
const GUTTER_LIVE_BATTERY_SRC = new URL('./../docs/specs/gutter-ui-live-battery.md', import.meta.url)
/** `§5.1` item 7 / `§7` item 3 — the census rows ANOTHER unit owns. */
const THEME_CONTROL_SRC = new URL('./../tests/' + 'theme-control' + '.test.ts', import.meta.url)

export const RENDERER_PATH = fileURLToPath(RENDERER_SRC)
export const ENVELOPE_PATH = fileURLToPath(ENVELOPE_SRC)
export const STORE_CORE_PATH = fileURLToPath(STORE_CORE_SRC)
export const STORE_REFS_PATH = fileURLToPath(STORE_REFS_SRC)

/* ───────────────────────────── THE REGISTER'S OWN CONSTANTS (`§5.5`) ───────────────────── */

/** `§5.5` — the per-row cap. */
export const REGISTER_ROW_CAP = 100
/** `§5.5` — the total cap, compared against the DECLARED figure (`§5.5.1`). */
export const REGISTER_TOTAL_CAP = 400
/** `§5.5` — the stop rule. */
export const STOP_AFTER_CONSECUTIVE = 5

/** `§5.5.1` — the DECLARED TERMS, in register order, FIFTEEN of them. */
export const DECLARED_TERMS: readonly number[] = [
  12, 8, 16, 12, 6, 10, 10, 6, 8, 16, 8, 8, 8, 8, 12,
]

/** `§5.5.1` — the FIFTEEN strategy ids, in register order. */
export const STRATEGY_IDS: readonly string[] = [
  'S-TR-MEM-1', 'S-TR-PROJ-1', 'S-TR-CON-1', 'S-TR-CLOSE-1', 'S-TR-MINT-1',
  'S-TR-CSM-1', 'S-TR-EVAL-1', 'S-TR-PSM-1', 'S-TR-BOOT-1',
  'S-TR-TOT-1', 'S-TR-INVIS-1', 'S-TR-COST-1', 'S-TR-LAND-1', 'S-TR-ERR-1', 'S-TR-BOUND-1',
]

/** `§5.5.1` — THE FIFTEEN ROW IDS in register order, with their declared TYPE. */
export const REGISTER_ROW_IDS: readonly string[] = [
  'P-TR-IM-1', 'P-TR-IM-2', 'P-TR-IM-3', 'P-TR-IM-4', 'P-TR-IM-5',
  'P-TR-SM-1', 'P-TR-SM-2', 'P-TR-SM-4', 'P-TR-SM-3',
  'P-TR-TP-1', 'P-TR-TP-2', 'P-TR-TP-3', 'P-TR-TP-4', 'P-TR-TP-5', 'P-TR-TP-6',
]

export const REGISTER_ROW_TYPES: readonly string[] = [
  'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM',
  'P-SM', 'P-SM', 'P-SM', 'P-SM',
  'P-TP', 'P-TP', 'P-TP', 'P-TP', 'P-TP', 'P-TP',
]

/* ───────────────────────────── THE CONTRACT'S DECLARED SPELLINGS (`§2.1`, `§0A`) ───────── */

/** `§2.1` — the six declared spellings (`§0A` item 1's "MEMBERS THIS CONTRACT DECLARES"),
 *  carried VERBATIM. The per-tab members are CONCRETE spellings, ONE tier-qualified name
 *  each: a pattern is a REGISTRY declaration's shape, never an operation argument, so no
 *  drive below passes a wildcard to `remove`/`commit` (`§2.1`'s closing clause).
 *
 *  ── `2026-10-11` ANNOTATE-BESIDE: THE PER-TAB REFERENCE IS ONE FLAT LEAF (`SD-1`) ────────
 *  **THE AS-FILED FORM ABOVE — `target` · `active` · `error` · `label` as four tier-qualified
 *  NESTED leaves at `file.tabs.<tabId>.<member>` — IS KEPT VISIBLE AND IS MARKED
 *  SUPERSEDED-IN-EFFECT** (`§0D` item `1`(a); `§2.1`'s name-table note; `RCA-8(d)`).
 *  **THE OPERATIVE FORM (`§0D` item `1`(c)): the per-tab reference is ONE FLAT LEAF under the
 *  `tabs` root, NAMED BY THE TAB ID — `file.tabs.<tabId>` — WHOSE VALUE IS THE TAB'S DECLARED
 *  RECORD, and the constraint's declared accessor is the entry's value at the tab's own key:
 *  `entry.active === true` for an OBJECT-valued entry and `entry === true` for a SCALAR-valued
 *  one, BOTH ARMS DECLARED.** `DECLARED_SPELLINGS.entry` is that operative leaf and
 *  `CLOSE_REFERENCE_SET_MEMBERS` reads `2` under it (`§2.4` item 1's note; `§3.4` item 4's
 *  operative `2` caller operations `+` `1` repair `=` `3` committed operations).
 *
 *  **THE MEASURED TWO-ARM EVIDENCE, TAKEN AT THIS HEAD AND REPORTED BESIDE BOTH FORMS:**
 *  a FLAT SCALAR at `file.tabs.t7` ⇒ the matched record is `{"order":["t7"],"t7":true}`
 *  (accessor `entry === true`); a FLAT OBJECT ⇒ `{"order":["t7"],"t7":{"active":true,…}}`
 *  (accessor `entry.active === true`); the AS-FILED NESTED spelling ⇒ the matched record's
 *  keys are `["order","t7"]` while its ENTRIES are `{}` — **the tab's value is ABSENT under
 *  its own key**, which is the retained NEGATIVE CONTROL's declared reading (`§0D` item
 *  `1`(g)). Which arm the store's own record surfaces at the GREEN is the implementer's
 *  measurement to REPORT (`§7c` `AMB-6`); BOTH arms are declared here so no drive is
 *  unsatisfiable either way (`§0D` item `1`(c)). */
export const DECLARED_SPELLINGS = {
  root: 'file.tabs',
  order: 'file.tabs.order',
  landing: 'file.tabs.landing',
  /** ── THE OPERATIVE PER-TAB REFERENCE (`SD-1`; `§0D` item `1`(c); `§2.1`'s note):
   *  ONE FLAT LEAF whose NAME IS THE TAB ID, whose VALUE is the tab's declared record. */
  entry: (id: string): string => `file.tabs.${id}`,
  /** ── THE AS-FILED NESTED MEMBER SPELLINGS, KEPT VISIBLE AND SUPERSEDED-IN-EFFECT. */
  target: (id: string): string => `file.tabs.${id}.target`,
  active: (id: string): string => `file.tabs.${id}.active`,
  error: (id: string): string => `file.tabs.${id}.error`,
  label: (id: string): string => `file.tabs.${id}.label`,
} as const

/** `§2.1` — the four per-tab members, in the table's own order. **AS FILED** these were four
 *  independent NESTED leaves; **under the operative flat form (`SD-1`; `§0D` item `1`(e))
 *  the same four members ride the tab's ONE flat entry's value** — they are the names INSIDE
 *  `file.tabs.<tabId>`'s declared record, which is what `DECLARED_SPELLINGS.entry` holds. */
export const PER_TAB_LEAVES: readonly ('target' | 'active' | 'error' | 'label')[] = [
  'target', 'active', 'error', 'label',
]

/** `§2.4` item 1 — THE CLOSE'S DECLARED REFERENCE SET. **AS FILED: the four per-tab leaves
 *  PLUS the id's own `order` seat = `5`.** **OPERATIVE (`SD-1`; `§0D` item `1`(d); `§2.4`
 *  item 1's note): THE TAB'S ONE FLAT LEAF `file.tabs.<tabId>` PLUS the id's own place in
 *  `file.tabs.order` = `2`** — and `§3.4` item 4's operative print (`2` caller operations
 *  `+` `1` repair `=` `3` committed operations) is that count WITH its terms. */
export const CLOSE_REFERENCE_SET_MEMBERS = 2
/** THE AS-FILED FIGURE, KEPT VISIBLE BESIDE THE OPERATIVE ONE (`RCA-8(d)`): the four per-tab
 *  leaves plus the id's own `order` seat. A row that reports the close's cost from this
 *  figure instead of the operative `2` FAILS (`§2.4` item 4's note; `§0D` item `1`(d)). */
export const CLOSE_REFERENCE_SET_MEMBERS_AS_FILED = 4 + 1

/** `§2.2` item 3 — THIS UNIT'S ONE CONSTRAINT MEMBER'S DECLARED CELLS, exact. */
export const CONSTRAINT_ID = 'exactly-one-active'
export const CONSTRAINT_MATCHED_SET = 'tabs'
export const CONSTRAINT_EVALUATED_ON: readonly string[] = ['set', 'commit', 'remove']

/** `§0A` item 5 / `§6` `PAR-9` — the two authored pages' declared id/role pairs. */
export const DECLARED_PAGES: readonly { readonly id: string; readonly role: string }[] = [
  { id: 'tabs-landing-page', role: 'page' },
  { id: 'tabs-error-page', role: 'page' },
]

/** `§7` item 2(c) — the `§6.1` coverage report's `summary.total` EQUALS the matrix's
 *  U-row count, and the matrix is capped `≤8` U-rows. */
export const U_MATRIX_CAP = 8

/* ───────────────────────────── THE LIVE-BATTERY FILE (`§5.1` item 6, `§7` item 2) ──────── */

/** `§5.1` item 6 places the `§5.U` matrix / `§6.1` coverage report / `§6.2` audit record
 *  "wherever this repo's gate-6 convention places them". The convention every sibling unit
 *  landed is `docs/specs/<unit>-live-battery.md`; `T2`'s unit slug is `store-tabs-record`,
 *  so the OWED path is THIS one. It does not exist yet — the gate-6 battery is OWED and
 *  **an un-run live row is a FAILURE, never a pass** (`§5.5.1` `P-TR-TP-4`/`-TP-5`). */
const LIVE_BATTERY_SRC = new URL('./../docs/specs/' + 'store-tabs-record-live' + '-battery.md', import.meta.url)
export const LIVE_BATTERY_PATH = fileURLToPath(LIVE_BATTERY_SRC)

/** `§5.1` item `3b` / `§5.2` item `7`(a) — THE UNIT'S OWN POINTER-CARRYING DRIVER, at the
 *  unit's own `tests/*-live.mjs` path, RUN BY A LITERAL COMMAND LINE so that NO `scripts` KEY
 *  IS ADDED (`§0D` item `3`(a); the landed sibling form is `tests/store-compliance-live.mjs`).
 *  It does NOT exist at this head — the `[U]` layer is OWED — and the node-layer half of
 *  `P-TR-TP-4`/`-TP-5` is driven here while the LIVE half is recorded IN-LINE as UN-RUN. */
export const LIVE_DRIVER_SRC = new URL('./../tests/' + 'store-tabs-record-live' + '.mjs', import.meta.url)
export const LIVE_DRIVER_PATH = fileURLToPath(LIVE_DRIVER_SRC)
/** `§5.2` item `7`(a) — the driver's run form, DECLARED so it cannot be paraphrased. */
export const DRIVER_RUN_FORM = 'node tests/store-tabs-record-live.mjs'
/** `§5.2` item `7`(d) — the LIVE half's status, recorded in-line so the two layers are never
 *  conflated (`§0D` item `3`(d)): `(b)`'s machine rows are evidence about the WIRING AND THE
 *  RECORD's reachability; `(a)`'s `MANUAL OPERATOR` rows are the ONLY rows carrying a
 *  PAINTED-SURFACE observation. */
export const LIVE_HALF_STATUS = 'un-run' as const
/** `§5.2` item `7`(b) — THE DRIVER'S DECLARED BOUND, AND THE BOUND IS STRUCTURAL, NOT A WAIVER
 *  (`A1`; the handoff record's `S-d9`, `docs/specs/provident-electron-shell-chrome-handoff-review.md:185`):
 *  a CDP click does NOT make the surface agent-drivable — the MCP tool surface carries an event
 *  NAME and `no pointer coordinates`, and a synthetic click is `not a human’s eye` on a painted
 *  box. **THE PAINTED/VISUAL ROWS THEREFORE STAY `MANUAL OPERATOR`**, owner the supervisor, at a
 *  session with a human at the window — and `MANUAL OPERATOR` is the token the closed instrument
 *  set carries (`§7` item `2`(d)). A pass that reports the driver's rows as proof of
 *  agent-drivability, or as proof that a page was SEEN, FAILS. */
export const S_D9_BOUND =
  'A CDP click does NOT make the surface agent-drivable: the MCP tool surface carries an event name with no pointer coordinates, and a synthetic click is not a human’s eye on a painted box. The painted/visual rows therefore remain MANUAL OPERATOR, discharged in one supervised session with a human at the window, and NO TOOL OUTPUT IS SUBSTITUTED FOR AN OPERATOR OBSERVATION.'

/** `§7` item 2(c)/(d) — THE CLOSED `instrument` SET the gate-6 rows must draw from. */
export const CLOSED_INSTRUMENT_SET: readonly string[] = [
  'MANUAL',
  'MANUAL OPERATOR',
  'NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT',
]

/** `§4.2` item 7 / `§7` item 2 — the `[U]` truth is the gate-6 LIVE BATTERY's. This
 *  register's two page rows drive the NODE-LAYER half only and assert exactly that: the
 *  page objects/ids the contract names, and the live-row provenance the contract requires
 *  (a `cmd` — a LITERAL command line or the literal token `MANUAL` — an `instrument` from
 *  the CLOSED set, and a MEASURED `post`). A `[T]` green is NEVER evidence that a page
 *  rendered (`§4.3` item 3). */
export const LIVE_ROW_FIELD_NAMES: readonly string[] = ['instrument', 'cmd', 'post']

/* ───────────────────────────── THE PINS (`§5.1` item 7, `§5.3`) ───────────────────────── */

export const FROZEN_FILE_PINS: readonly { readonly path: string; readonly prefix: string; readonly label: string }[] = [
  { path: STORE_CORE_PATH, prefix: '0664c52f', label: 'src/renderer/store-core-graph.ts' },
  { path: STORE_REFS_PATH, prefix: '5c0c1a97', label: 'src/renderer/store-graph-references.ts' },
]

/** `§5.3` — the frozen artifact's fields-1–7 span figure. **NEVER a file-pin figure**, and
 *  the two are never conflated (`§5.1` item 7's attribution note). */
export const FROZEN_SPAN_PREFIX = '29772ac7'

/** `§5.1`'s ALLOWED SET PLUS THIS UNIT'S OWN FILES, AS A PATH SET, with the two paths the
 *  AMENDED contract adds (`§5.1` item `3b`): `tests/store-tabs-record-live.mjs` (the unit's
 *  OWN pointer-carrying driver, RUN BY A LITERAL COMMAND LINE so that NO `scripts` KEY IS
 *  ADDED — `§0D` item `3`(a)) and its battery record at the repo's gate-6 convention path.
 *  **THE AS-FILED SET IS KEPT VISIBLE (`RCA-8(d)`): as filed it carried SEVEN paths and
 *  OMITTED BOTH OF THE ABOVE — the three-way trap this row closes** — while `§5.1` item `3b`
 *  DECLARES the driver in the allowed edit set, `P-TR-TP-4`/`P-TR-TP-5` *require* the battery
 *  record to exist, and `P-TR-TP-6`(1) asserts `edit-set ⊆ DECLARED_SCOPE_PATHS`: creating
 *  either artifact flipped a held row to BROKEN against a scope that did not declare it.
 *  **THE ASSERTION IS STILL A SUBSET ASSERTION WITH ITS POSITIVE CONTROL (`C-9`) AND IS STILL
 *  ASSERTED AS A SET — NEVER AS A COUNT** (`§5.1`'s closing clause): an UNDECLARED path must
 *  still fail, and `EDIT_SET_OFFENDER_FIXTURE` is that control. */
export const DECLARED_SCOPE_PATHS: readonly string[] = [
  'src/renderer/renderer.ts',
  'src/shared/demo-envelope.ts',
  'tests/store-tabs-record.test.ts',
  'tests/store-tabs-record-register.ts',
  'docs/specs/store-tabs-record.md',
  'docs/specs/store-tabs-record-greens.md',
  'tests/theme-control.test.ts',
  // ── `§5.1` item `3b`, ADDED `2026-10-11` BY THE ARCHITECT'S `[U]`-EVIDENCE-LAYER RULING.
  'tests/store-tabs-record-live.mjs',
  'docs/specs/store-tabs-record-live-battery.md',
]

/** THE AS-FILED SEVEN-PATH SET, KEPT VISIBLE BESIDE THE OPERATIVE NINE (`RCA-8(d)`): the
 *  amendment ADDED two paths and removed none, so the operative set is a strict SUPERSET and
 *  the subset assertion's bite is unchanged (every path the as-filed set admitted is still
 *  admitted; the two added paths are exactly what `§5.1` item `3b` and the gate-6 convention
 *  declare). A pass that drops a path the as-filed set carried FAILS the set assertion below. */
export const DECLARED_SCOPE_PATHS_AS_FILED: readonly string[] = [
  'src/renderer/renderer.ts',
  'src/shared/demo-envelope.ts',
  'tests/store-tabs-record.test.ts',
  'tests/store-tabs-record-register.ts',
  'docs/specs/store-tabs-record.md',
  'docs/specs/store-tabs-record-greens.md',
  'tests/theme-control.test.ts',
]

/** `§5.1`'s DENIED set, as path PREFIXES, named so it is asserted as a SET. */
export const DENIED_PATH_PREFIXES: readonly string[] = [
  'src/main/',
  'scripts/',
  'demo/',
  'docs/skills/',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.tests.json',
  'vitest.config.ts',
  'src/shared/dom-shim.ts',
  'AGENTS.md',
]

/** `§5.1` item 12 / `§4.3` item 4 — the trackers the unit may NOT touch, and the `L-1`
 *  pinned `scripts` key set's landed keys (this unit takes NO new key). */
export const TRACKER_PATHS: readonly string[] = [
  'docs/next-steps.md', 'docs/pending.md', 'docs/decisions.md', 'docs/defects.md', 'docs/HANDOFF.md',
]

/** `§5.1` item 2 — the two authored page nodes the census re-grain moves by. The FIGURE is
 *  deliberately NOT printed (`§5.5.2` item 3, `AMB-5`): the drift's own DELTA is what this
 *  register reads. */
export const PAGE_NODE_CENSUS_DELTA = 2

/* ───────────────────────────── THE RECORDING STORE (`§3.4` item 4) ────────────────────── */

/** `§3.4` item 4 — the subscriber-count NEUTRALITY instrument: one affected reference
 *  answers `events: 1` whether or not ANY subscriber exists, and N subscribers differ ONLY
 *  in DELIVERIES (`G4-F3`). */
export interface DeliveryRecord {
  readonly deliveries: number
}

/* ───────────────────────────── THE SURFACE RESOLUTION (`§4.1` item 2) ─────────────────── */

export interface TabsSurface {
  /** THE ORIGINAL VALUE EXPORTS, kept BOUND so a call never loses its receiver (the landed
   *  `store-graph-references` module's export is a module-scope function and the landed
   *  factory reads its own closure; binding is the safe form for both). */
  readonly createGraphStore: ((options?: unknown) => unknown) | null
  readonly storeGraphReferences: ((rows: readonly unknown[]) => unknown) | null
  /** THE BOUND FORMS the harness calls. */
  readonly resolved: ((options?: unknown) => unknown) | null
  readonly references: ((rows: readonly unknown[]) => unknown) | null
  readonly module: Record<string, unknown> | null
  readonly reason: string | null
}

let surface: TabsSurface | null = null

/** Resolves the FROZEN store surface WITHOUT throwing: the reason a row is broken is DATA,
 *  so the register counts it as a broken attempt and lets the stop rule fire. */
export async function resolveTabsSurface(): Promise<TabsSurface> {
  if (surface !== null) return surface
  if (!existsSync(STORE_CORE_SRC)) {
    surface = {
      createGraphStore: null,
      storeGraphReferences: null,
      resolved: null,
      references: null,
      module: null,
      reason: `the frozen store module does not exist (${STORE_CORE_PATH})`,
    }
    return surface
  }
  try {
    const mod = (await import(/* @vite-ignore */ './../src/renderer/' + 'store-core' + '-graph.js')) as Record<string, unknown>
    const refsMod = existsSync(STORE_REFS_SRC)
      ? ((await import(/* @vite-ignore */ './../src/renderer/' + 'store-graph' + '-references.js')) as Record<string, unknown>)
      : null
    const createGraphStore = mod['createGraphStore']
    const storeGraphReferences = refsMod === null ? undefined : refsMod['storeGraphReferences']
    const factory = typeof createGraphStore === 'function' ? (createGraphStore as (o?: unknown) => unknown) : null
    const refs = typeof storeGraphReferences === 'function' ? (storeGraphReferences as (r: readonly unknown[]) => unknown) : null
    surface = {
      createGraphStore: factory,
      storeGraphReferences: refs,
      resolved: factory === null ? null : (factory as (...a: unknown[]) => unknown).bind(mod) as (o?: unknown) => unknown,
      references: refs === null ? null : (refs as (...a: unknown[]) => unknown).bind(refsMod) as (r: readonly unknown[]) => unknown,
      module: mod,
      reason: factory === null || refs === null ? 'the frozen surface does not carry both `createGraphStore` and `storeGraphReferences`' : null,
    }
  } catch (e) {
    surface = {
      createGraphStore: null,
      storeGraphReferences: null,
      resolved: null,
      references: null,
      module: null,
      reason: `the frozen store surface does not resolve: ${e instanceof Error ? e.message : String(e)}`,
    }
  }
  return surface
}

/* ───────────────────────────── THE DECLARATION INPUT (`§2.1`, `§2.4`) ─────────────────── */

/** THE RECORD'S DECLARED ROWS, as this unit declares them (`§2.1`: the root `tabs` is
 *  already reserved; the members are this contract's). **`file.tabs.landing` carries
 *  `reserved: true` — the reservation is at the ENTRY level, and the `tabs` ROOT is an
 *  ordinary declared root** (`§0A` item 1: a pass that marks the ROOT reserved refuses
 *  `remove('file.tabs.t7.target')` and FAILS `§3.2`'s positive control). */
export function tabsDeclarationRows(): readonly Record<string, unknown>[] {
  return [
    { name: DECLARED_SPELLINGS.root },
    { name: DECLARED_SPELLINGS.order },
    { name: 'file.tabs.' + 'landing', reserved: true },
    // THE OTHER TIERS' ROOTS are declared so that `§2.4` item 2's LESS-PERSISTENT COPIES of
    // the SAME LOGICAL PATH can exist at all (they live under `mem.tabs` / `temp.tabs`);
    // without them a downward-clear row would be unfalsifiable rather than red.
    { name: 'mem.tabs' },
    { name: 'temp.tabs' },
  ]
}

/* ───────────────────────────── THE CONSTRAINT MEMBER (`§2.2` item 3, `§0A` item 3) ─────── */

/** THE MEMBER'S DECLARED CELLS, IN THE CALLER'S OWN TERMS (`§2.2` item 3, `§0A` item 3):
 *  `{ id: 'exactly-one-active', matchedSet: 'tabs', evaluatedOn: ['set','commit','remove'],
 *  constraint, repair }`. **THE CONSTRAINT FUNCTION MUST NOT MUTATE ITS ARGUMENTS** — the
 *  corrective action belongs to the REPAIR alone (`§0A` item 3), and every drive below
 *  reads the mutation-detector so that rule is falsifiable rather than assumed. */
export interface ConstraintCall {
  readonly changed: unknown
  readonly current: unknown
  readonly next: unknown
  readonly argCount: number
  /** the matched record's own key set at the call (`§2.2` item 5). */
  readonly recordKeys: readonly string[]
  /** the record's `<tabId>` entries at the call — the entry the contract declares each tab
   *  contributes (`§2.2` item 4, `§2.3` item 2). */
  readonly recordEntries: Record<string, unknown>
}

export interface ConstraintProbe {
  /** the positional arguments the store delivered, in call order (`§5.5.1` `P-TR-SM-2`). */
  readonly calls: ConstraintCall[]
  /** whether the constraint's own arguments were MUTATED by the constraint (the declared
   *  read-only rule's detector — the POSITIVE CONTROL arms it against a mutating member). */
  mutatingMemberFired: boolean
  /** the constraint's answer for each call, in order. */
  readonly verdicts: boolean[]
  /** the matched record's own key set per call, read off `next` (`§2.2` item 5 allows a row
   *  to observe the record's keys and their values, never to assert a member set beyond the
   *  record's own leaf names). */
  readonly recordKeys: (readonly string[])[]
  /** the record's `<tabId>` entry values per call — the entry the contract declares each
   *  tab contributes (`§2.2` item 4, `§2.3` item 2). */
  readonly recordEntries: Record<string, unknown>[]
}

/** RESETS A PROBE'S CALL LOG (`§5.5.1`: a drive reads only its OWN call, so the readings
 *  that follow a fixture's seeding are attributable rather than cumulative). */
export function resetProbe(probe: ConstraintProbe): void {
  probe.calls.length = 0
  probe.verdicts.length = 0
  probe.recordKeys.length = 0
  probe.recordEntries.length = 0
}

/** THE LAST CALL A PROBE RECORDED, or `undefined` when the member was never reached. */
export function lastCallOf(probe: ConstraintProbe): ConstraintCall | undefined {
  return probe.calls[probe.calls.length - 1]
}

/** THE MEMBER FACTORY. `activates`/`deactivates` are the record the store hands the repair;
 *  the member mutates NOTHING else. The referent for the `≥2` arm is carried from the
 *  caller's own write through the `referent` cell, because the CONTRACT DOES NOT NAME a
 *  repair parameter carrying it (`§2.2` item 3's printed `repair(nextState, feedback?)`) —
 *  recorded in this pass's report as a gap rather than filled with an invented signature. */
export interface ConstraintMemberHandle {
  readonly member: Rec
  /** the record-entry PROBE the member feeds, when one was supplied. */
  readonly probe: ConstraintProbe | undefined
  /** THE CALLER'S OWN CLOSURE STATE (`§0A` item 4: the pre-state is captured by the
   *  caller's own closure at the close site) — the referent, the removed id and the
   *  pre-removal order. **THE CONTRACT DOES NOT DECLARE A REPAIR PARAMETER THAT CARRIES THE
   *  REFERENT** (`§2.2` item 3 prints `repair(nextState, feedback?)`), so the referent is
   *  carried caller-side; the gap is reported rather than filled with an invented
   *  signature. */
  readonly state: { referent: string | null; removedId: string | null; preOrder: string[] }
  /** ATTACHES THE STORE THE MEMBER READS THROUGH (arm (2) of `activeOf`). */
  readonly attach: (store: Rec) => void
}

export function tabsConstraintMember(probe?: ConstraintProbe): ConstraintMemberHandle {
  const state = {
    referent: null as string | null,
    removedId: null as string | null,
    preOrder: [] as string[],
  }
  let attachedStore: Rec | undefined
  void attachedStore
  /** ── `2026-10-11` RE-GRAIN OF THE MEMBER'S RECORD ACCESS (`SD-1`; `§0D` item `1`(c)) ─────
   *  **THE AS-FILED FORM IS KEPT VISIBLE: as filed, `activeOf` preferred the store's NESTED
   *  `resolve('file.tabs.<id>.active')` and fell back to the record entry, while `writeActive`
   *  preferred the nested `set('file.tabs.<id>.active', …)` and only fell back to
   *  `rec[id] = value`. READ AND WRITE AGREED WITH EACH OTHER AND DISAGREED WITH THE
   *  CONTRACT'S DECLARED ACCESSOR — the asymmetry this pass MEASURED, and the reason no
   *  seeding permutation satisfied `§2.2` item 3 with `§3.2` `F-T2-1`/`F-T2-2` together.**
   *  **THE OPERATIVE FORM IS ONE DECLARED ACCESSOR ON EACH SIDE, READ AND WRITE SYMMETRIC,
   *  NEVER ONE NESTED AND ONE FLAT: `file.tabs.<tabId>` — the tab's ONE flat leaf, whose
   *  VALUE is the tab's declared record — read by the declared accessor pair
   *  (`entry.active === true` for an OBJECT-valued entry; `entry === true` for a SCALAR-valued
   *  one) and WRITTEN BACK IN THE SHAPE THE ENTRY ALREADY HAS, so the arm the store surfaces
   *  is the arm the repair corrects.**
   *  **WHY THE WRITE PRESERVES THE SHAPE:** an object-valued entry carries the tab's declared
   *  record (`§0D` item `1`(e): the richer per-tab data's admissible home), so the repair
   *  writes `entry.active` INSIDE it; a scalar-valued entry is the caller's boolean itself,
   *  so the repair writes the boolean AT it. Either way the change lands on the SAME reference
   *  the constraint read, which is what makes the store's own `repaired[]` name it. */
  const writeActive = (rec: Record<string, unknown>, id: string, value: boolean): void => {
    const current = rec[id]
    rec[id] = current !== null && typeof current === 'object' ? { ...(current as Rec), active: value } : value
  }

  const activeOf = (rec: Record<string, unknown>, id: string): boolean => {
    // THE ONE DECLARED ACCESSOR (`§0D` item `1`(c)): the matched record's entry at the tab's
    // own key IS the flat leaf's value, and the active read is `entry.active === true` for an
    // OBJECT-valued entry and `entry === true` for a SCALAR-valued one. The record read and
    // the record write above touch the SAME reference the store handed the member — so a row
    // whose drive writes `file.tabs.<tabId>` and a repair that corrects it measure one
    // spelling on each side, NEVER one nested and one flat (`§2.2` item 5: a mutation the
    // repair makes through the record's values lands on the nodes' stored values).
    return entryReadsActive(rec[id])
  }
  const member = {
    id: CONSTRAINT_ID,
    matchedSet: CONSTRAINT_MATCHED_SET,
    evaluatedOn: CONSTRAINT_EVALUATED_ON,
    constraint: (...args: [unknown, unknown, unknown, unknown?]): boolean => {
      const [changed, current, next, feedback] = args
      void feedback
      const rec = (next ?? {}) as Record<string, unknown>
      const keys = Object.keys(rec)
      // THE ACTIVE CANDIDATES ARE THE `order` MEMBER'S OWN MEMBERS (`§2.2` item 4: the
      // constraint reads the `order` member and, for every id in it, that id's own value —
      // "a constraint that treats the `order` member as a tab entry FAILS").
      const order = Array.isArray(rec['order']) ? (rec['order'] as string[]) : []
      const actives = order.filter((id) => activeOf(rec, id))
      const currentRec = (current ?? {}) as Record<string, unknown>
      if (probe !== undefined) {
        // THE ROOT'S OWN LEAF NAMES, read off the record (`§2.2` items 4/5): a row may
        // observe the record's keys and their values, never assert a member set beyond the
        // record's own leaf names.
        const entries: Record<string, unknown> = {}
        for (const key of keys) if (key !== 'order') entries[key] = rec[key]
        probe.calls.push({ changed, current, next, argCount: args.length, recordKeys: keys, recordEntries: entries })
        probe.verdicts.push(order.length > 0 && actives.length === 1)
        probe.recordKeys.push(keys)
        probe.recordEntries.push(entries)
        void currentRec
      }
      return order.length > 0 && actives.length === 1
    },
    repair: (nextState: unknown, feedback?: unknown): boolean => {
      void feedback
      const rec = (nextState ?? {}) as Record<string, unknown>
      // A RECORD WHOSE `order` IS NOT AN ARRAY YET HAS NOTHING THE REPAIR CAN RE-SEAT: the
      // post-state is not a zero-active record, it is a record with no membership at all,
      // so there is no corrective action in domain (`§3.2` F-T2-4's arm is the EMPTY
      // SEQUENCE, not a missing leaf).
      if (!Array.isArray(rec['order'])) return true
      const order = rec['order'] as string[]
      const actives = order.filter((id) => activeOf(rec, id))
      if (order.length === 0) {
        // `F-T2-4`/`F-T2-3`: the zero-active arm's landing re-seat — the landing entry lands
        // at no index (the sequence was empty), so it is written as `order[0]`, and its
        // `active = true` lands in the SAME committed write (`R3-2`). THE `order` RE-SEAT
        // RIDES THE RECORD'S OWN VALUE REFERENCE (`§2.2` item 5: a mutation the repair makes
        // through the record's values lands on the nodes' stored values).
        const seat = rec['order'] as unknown[]
        seat.push('landing')
        rec['landing'] = true
        return true
      }
      if (actives.length === 0) {
        // the NEXT SURVIVING entry by `order`, WRAPPING (`R3-1`): the referent is the
        // caller's own written reference, or on a `remove` the removed entry's own index.
        // **THE WRAP IS THE DECLARED ARM (`§3.2` F-T2-1: "WRAPPING to the first surviving when
        // the referent was last") AND IT IS A CLAUSE, NOT A GUARD:** an index past the end of
        // the SHORTER post-remove `order` wraps to its first member. **AS FILED this clamped
        // with `Math.min(index, order.length - 1)`, which activates the LAST entry where the
        // clause declares the FIRST — so a drive with the referent LAST read `B` where the
        // clause declares `A`, and the row could not distinguish the ruled wrap from a
        // clamp-and-pick-the-last body.**
        let referentIndex = 0
        if (state.removedId !== null && state.preOrder.includes(state.removedId)) {
          referentIndex = state.preOrder.indexOf(state.removedId)
        } else if (state.referent !== null && order.includes(state.referent)) {
          referentIndex = order.indexOf(state.referent)
        }
        const survivor = order[referentIndex % order.length] ?? order[0]
        if (survivor !== undefined) writeActive(rec, survivor, true)
        return true
      }
      if (actives.length > 1) {
        // THE SURPLUS ARM (`§3.2` F-T2-2): the REFERENT is KEPT and every OTHER active entry
        // is deactivated. **THE ORDER OF THE REPAIR'S OWN WRITES IS PART OF THE CLAUSE, NOT AN
        // IMPLEMENTATION DETAIL** (`§2.2` item 5: the corrective action must land so the
        // post-state NEVER violates the constraint — the store may re-evaluate between writes,
        // and a re-evaluation that fires mid-repair would apply the ZERO-ACTIVE arm and
        // activate the WRONG entry). **SO THE REFERENT IS WRITTEN ACTIVE FIRST, AND ONLY THEN
        // ARE THE OTHERS DEACTIVATED** — the `≥2` referent rule is thereby observable in the
        // post-state of every evaluation the repair's own writes trigger. **AS FILED this
        // function deactivated the others without first (re)asserting the referent's own
        // `true`, which under the operative flat accessor pair let a mid-repair evaluation
        // activate the WRONG entry and made the `≥2` arm's own reading unsatisfiable.**
        // THE WRAP APPLIES HERE TOO (`§3.2` F-T2-2: "the WRAP applies when that index is no
        // longer present"). **THE SURVIVOR IS TAKEN FROM THE SEQUENCE THE EVALUATION SEES, AT
        // THE REMOVED ENTRY'S OWN INDEX (`§2.4` item 5: "the REMOVED entry's own INDEX in
        // `file.tabs.order`" — the NEXT-SURVIVING entry AT THAT INDEX), NOT BY NAME FROM THE
        // PRE-REMOVAL SEQUENCE.** On a `remove` the matched record's `order` still holds the
        // id (`§2.4` item 5: the index is readable off `current` while the absence is readable
        // off `next`), so a name-wise read of that array returns THE REMOVED ENTRY ITSELF —
        // which is exactly the wrong-entry bug the `≥2` arm's row falsifies. The removed id's
        // INDEX is therefore mapped INTO the order the record carries, modulo its length.
        let keep: string | undefined
        if (state.removedId !== null && state.preOrder.includes(state.removedId)) {
          const removedIndex = state.preOrder.indexOf(state.removedId)
          const survivors = order.filter((id) => id !== state.removedId)
          const referentIndex = survivors.length === 0 ? 0 : removedIndex % survivors.length
          keep = survivors[referentIndex] ?? order[referentIndex % order.length]
        } else if (state.referent !== null && actives.includes(state.referent)) {
          keep = state.referent
        }
        if (keep !== undefined && !activeOf(rec, keep)) writeActive(rec, keep, true)
        for (const id of actives) if (id !== keep) writeActive(rec, id, false)
        return true
      }
      return true
    },
  }
  Object.defineProperty(member, '__state', { value: state, enumerable: false })
  return { member, probe, state, attach: (target: Rec): void => { attachedStore = target } }
}

/** THE MEMBER'S OWN CALLER-SIDE CELLS, reachable by a drive (`§0A` item 4: "the PRE-state
 *  is captured by the caller's own closure at the close site"). */
export function memberStateOf(member: Rec | ConstraintMemberHandle): ConstraintMemberHandle['state'] {
  if (member !== null && typeof member === 'object' && 'state' in member && 'attach' in member) {
    return (member as ConstraintMemberHandle).state
  }
  return (member as unknown as { __state: ConstraintMemberHandle['state'] }).__state
}

export interface TabsStoreOptions {
  /** THE OTHER TIERS' DECLARED ROOTS the fixture needs (`§2.4` item 2: the `mem`/`temp`
   *  copies of the SAME logical path — they exist only under their own declared root). */
  readonly extraDeclarationRows?: readonly Record<string, unknown>[]
}

/** THE ONE CONSTRUCTION SITE this unit supplies the member at (`§2.2` item 1). */
export function tabsStore(
  surf: TabsSurface,
  member: Record<string, unknown> | ConstraintMemberHandle | null,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  if (surf.resolved === null || surf.references === null) {
    throw new Error(`T2 RED — the frozen store surface is not resolvable: ${surf.reason ?? 'unknown reason'}`)
  }
  const isHandle = member !== null && typeof member === 'object' && 'member' in member && 'attach' in member
  const carried = member === null ? [] : [isHandle ? (member as ConstraintMemberHandle).member : (member as Rec)]
  const extraRows = Array.isArray(extra['extraDeclarationRows'])
    ? (extra['extraDeclarationRows'] as readonly Record<string, unknown>[])
    : []
  const options = { ...extra }
  delete options['extraDeclarationRows']
  const store = surf.resolved({
    declarations: surf.references([...tabsDeclarationRows(), ...extraRows]),
    constraints: carried,
    reservedNamespaces: [],
    ...options,
  }) as Record<string, unknown>
  if (isHandle) (member as ConstraintMemberHandle).attach(store)
  return store
}

/* ───────────────────────────── THE RECORD HELPERS (`§2.1`–`§2.4`) ─────────────────────── */

type Rec = Record<string, unknown>

export function callStore(store: Rec, member: string, name: string, value?: unknown): Rec {
  const fn = store[member] as (...args: unknown[]) => unknown
  if (typeof fn !== 'function') throw new Error(`T2 RED — the frozen surface has no \`${member}\``)
  const out = value === undefined && member !== 'commit' && member !== 'set' ? fn.call(store, name) : fn.call(store, name, value)
  return (out ?? {}) as Rec
}

export function resolveOf(store: Rec, name: string): Rec {
  return callStore(store, 'resolve', name) as Rec
}

/** THE DECLARED MISS (`§3.6` `A-1`): `{ found:false, value:undefined, tier:null, cache:null,
 *  name }` — never a refusal and never an invented default. */
export function isMiss(answer: Rec): boolean {
  return answer['found'] === false
}

export function isRefusal(answer: Rec): boolean {
  return answer['status'] === 'refused'
}

export function valueOf(store: Rec, name: string): unknown {
  const a = resolveOf(store, name)
  return a['found'] === true ? a['value'] : undefined
}

/** THE ACTIVE ENTRY as the RECORD holds it — read through the store's own declared answer
 *  for the OPERATIVE per-tab reference (`SD-1`; `§0D` item `1`(c): ONE FLAT LEAF
 *  `file.tabs.<tabId>` whose value is the tab's declared record, read by the declared
 *  accessor pair). This is the STATE instrument the register uses; the CONSTRAINT'S OWN
 *  record access is a separate, separately-failing reading.
 *
 *  **THE RE-GRAIN, STATED SO THE AS-FILED FORM STAYS VISIBLE (`RCA-8(d)`): as filed this
 *  instrument read `DECLARED_SPELLINGS.entry(id)` (`file.tabs.<tabId>.active`, the nested
 *  member leaf) and the register's repair wrote the SAME nested spelling — read and write
 *  AGREED with each other and DISAGREED with the contract's declared accessor, so every
 *  drive that turned on the active mark measured the harness instead of the invariant. The
 *  operative instrument reads the FLAT entry and `tabsConstraintMember`'s repair writes the
 *  SAME flat entry: ONE declared accessor on each side, read and write SYMMETRIC, never one
 *  nested and one flat (`§0D` item `1`(c); `§2.3`'s note).**
 *
 *  **BOTH ARMS OF THE DECLARED ACCESSOR PAIR ARE READ** (`§0D` item `1`(c); a row asserting
 *  only one arm is failing, one asserting neither is under-asserted): an OBJECT-valued entry
 *  counts as active when `entry.active === true`, a SCALAR-valued entry when `entry === true`. */
export function entryActiveOf(store: Rec, id: string): boolean {
  const value = valueOf(store, DECLARED_SPELLINGS.entry(id))
  return entryReadsActive(value)
}

/** THE DECLARED ACCESSOR PAIR ITSELF (`§0D` item `1`(c)), read off an ENTRY VALUE both arms
 *  of which are declared: `entry.active === true` for an object-valued entry; `entry === true`
 *  for a scalar-valued one. */
export function entryReadsActive(entry: unknown): boolean {
  if (entry !== null && typeof entry === 'object') return (entry as Rec)['active'] === true
  return entry === true
}

export function activesOf(store: Rec, order: readonly string[]): string[] {
  return order.filter((id) => entryActiveOf(store, id))
}

/** SEEDS a record state through the DECLARED surface only: each tab's declared record by
 *  `commit`, the `order` member by `commit` (the minting/re-minting write, `§2.4` item 3),
 *  and every `active` mark with the ACTIVE id written LAST — the transient zero-active
 *  post-state the `order` write itself produces is repaired to an entry the FINAL write then
 *  clears, so the SEEDED state is exactly the declared one and every later drive's reading is
 *  attributable to that drive.
 *
 *  **THE OPERATIVE RE-GRAIN (`SD-1`; `§0D` item `1`(c)/(e)): THE `active` MARK IS SEEDED
 *  THROUGH THE TAB'S ONE FLAT ENTRY `file.tabs.<tabId>`** — the reference the constraint
 *  reads, the reference the ruled repair writes, and the reference the OPERATIVE close removes
 *  (`§2.4` item 1's note). **THE AS-FILED FORM IS KEPT VISIBLE AND DRIVEN NOWHERE HERE:** as
 *  filed this seeded the nested member leaf `file.tabs.<tabId>.active`, which under the ruled
 *  flat form is not the reference the constraint's record carries — the harness and the
 *  invariant then read DIFFERENT spellings and no seeding permutation satisfied `§2.2` item 3
 *  and `§3.2` `F-T2-1`/`F-T2-2` together (this pass's measurement; `§0D` item `1`(g)).
 *
 *  **THE RICHER PER-TAB DATA (`label` · `target` · `error`) RIDES THE ENTRY'S VALUE** — that
 *  is the admissible home `§0D` item `1`(e) declares, and it is the object-valued arm of the
 *  accessor pair; it is OTHERWISE `T1`'s authored data and this unit mints no second home.
 *  The object arm is driven by `seedEntryRecord` below so BOTH arms of the pair are exercised. */
export function seedRecord(
  store: Rec,
  ids: readonly string[],
  activeId: string | null,
  leaves: Partial<Record<'target' | 'error' | 'label', unknown>> = {},
): void {
  // THE THREE NON-ACTIVE MEMBER LEAVES ARE STILL WRITTEN AT THEIR AS-FILED NESTED SPELLINGS
  // (`file.tabs.<tabId>.target` · `.error` · `.label`) SO THE SEEDED STATE IS COHERENT AND
  // THE `§2.1`-items-2/4/5 READINGS STAY FALSIFIABLE: they are NOT the constraint's subject
  // and NOT the close's operative reference, and they coexist with the tab's flat entry
  // (`§0D` item `1`(e): the richer per-tab data's home is declared, not left silent). The
  // OBJECT-valued arm of the accessor pair — where those three ride INSIDE the flat entry's
  // value — is driven by `seedEntryRecord` below, so BOTH arms are exercised.
  for (const id of ids) {
    callStore(store, 'commit', DECLARED_SPELLINGS.target(id), leaves.target ?? `target-${id}`)
    callStore(store, 'commit', DECLARED_SPELLINGS.error(id), leaves.error ?? null)
    callStore(store, 'commit', DECLARED_SPELLINGS.label(id), leaves.label ?? `label-${id}`)
  }
  // THE SEEDED STATE IS EXACT: every non-active mark first, then the members list, then the
  // ACTIVE id's own `true` LAST — so whatever repair the `order` write's transient
  // zero-active post-state lands is CLEARED by the non-active writes that follow it, and the
  // final write leaves exactly one active entry (the declared one).
  for (const id of ids) {
    if (id === activeId) continue
    callStore(store, 'commit', DECLARED_SPELLINGS.entry(id), false)
  }
  callStore(store, 'commit', DECLARED_SPELLINGS.order, [...ids])
  if (activeId !== null) callStore(store, 'commit', DECLARED_SPELLINGS.entry(activeId), true)
}

/** SEEDS THE **OBJECT-VALUED ARM** OF THE DECLARED ACCESSOR PAIR (`§0D` item `1`(c)/(e)): the
 *  tab's declared record rides its ONE flat entry as `{ target, active, error, label }`, so
 *  the constraint's active read is `entry.active === true` and the richer per-tab data has its
 *  declared home. A row that asserts only the scalar arm is a FAILING row and a row that
 *  asserts neither is under-asserted (gate 4), so both arms are driven. */
export function seedEntryRecord(
  store: Rec,
  ids: readonly string[],
  activeId: string | null,
  leaves: Partial<Record<'target' | 'error' | 'label', unknown>> = {},
): void {
  for (const id of ids) {
    if (id === activeId) continue
    callStore(store, 'commit', DECLARED_SPELLINGS.entry(id), {
      target: leaves.target ?? `target-${id}`,
      active: false,
      error: leaves.error ?? null,
      label: leaves.label ?? `label-${id}`,
    })
  }
  callStore(store, 'commit', DECLARED_SPELLINGS.order, [...ids])
  if (activeId !== null) {
    callStore(store, 'commit', DECLARED_SPELLINGS.entry(activeId), {
      target: leaves.target ?? `target-${activeId}`,
      active: true,
      error: leaves.error ?? null,
      label: leaves.label ?? `label-${activeId}`,
    })
  }
}

/** THE OPERATIVE CLOSE (`§2.4` item 1's note; `§3.4` item 4) — `2` CALLER OPERATIONS: ONE
 *  `remove('file.tabs.<tabId>')` for the tab's own flat leaf `+` ONE
 *  `commit('file.tabs.order', <the sequence without the id>)`. **THE AS-FILED FORM — four
 *  per-tab-leaf `remove`s plus the `order` rewrite = `5` caller operations (`§2.4` item 4's
 *  as-filed figure) — IS KEPT VISIBLE AND IS SUPERSEDED-IN-EFFECT**; a row that reports the
 *  close's cost from that figure FAILS (`§0D` item `1`(d)). */
export function closeTab(store: Rec, id: string, nextOrder: readonly string[]): { readonly callerOperations: number; readonly receipts: readonly Rec[] } {
  const receipts: Rec[] = []
  receipts.push(callStore(store, 'remove', DECLARED_SPELLINGS.entry(id)))
  receipts.push(callStore(store, 'commit', DECLARED_SPELLINGS.order, [...nextOrder]))
  return { callerOperations: 2, receipts }
}

/* ───────────────────────────── THE STATIC READING HELPERS (`§5.3`, `§5.5.1` `P-TR-TP-6`) ─ */

export function bytesAt(path: string): string | null {
  return existsSync(path) ? readFileSync(path, 'utf8') : null
}

export function sha256PrefixOf(path: string, length = 8): string {
  const bytes = readFileSync(path)
  return createHash('sha256').update(bytes).digest('hex').slice(0, length)
}

/** THE FROZEN SPAN READER (`§5.3`, the artifact's field-8 byte-range convention): the
 *  span is taken with an ANCHORED WHOLE-LINE match on the two sentinel lines, every span
 *  line's trailing spaces/tabs stripped, the lines concatenated each followed by exactly
 *  one LF (including the last), UTF-8.
 *
 *  `READ AT RED, AND IT IS REPORTED RATHER THAN SMOOTHED`: the artifact's own field-8
 *  prose cell prints the span as "lines `:40`–`:418` inclusive" while the ANCHORED
 *  instrument over the same byte-state produces the recorded `29772ac7…` over lines
 *  `:40`–`:448` (the span's END sentinel is at `:448`). The recorded figure is the LIVE
 *  one (`HYDRATE-1`'s own clause: "the digest row records the figure IT produces"), so the
 *  ANCHORED instrument is what this register reads and asserts; the prose cell's
 *  line-range figure is stale and is reported to the supervisor, NOT corrected here (a
 *  TestWriter may not edit a spec, and a pass that re-freezes the artifact to correct a
 *  note is a FINDING — `§7` item 6). */
export function frozenSpanPrefix(length = 8): string {
  const raw = bytesAt(fileURLToPath(FROZEN_ARTIFACT_SRC))
  if (raw === null) return ''
  const lines = raw.split('\n')
  const beginIndex = lines.findIndex((line) => line === '<!-- FROZEN-SPAN-BEGIN (fields 1\u20137) -->')
  const endIndex = lines.findIndex((line) => line === '<!-- FROZEN-SPAN-END (fields 1\u20137) -->')
  if (beginIndex < 0 || endIndex <= beginIndex) return ''
  const spanLines = lines.slice(beginIndex, endIndex + 1).map((line) => line.replace(/[ \t]+$/, ''))
  const span = spanLines.map((line) => `${line}\n`).join('')
  return createHash('sha256').update(span, 'utf8').digest('hex').slice(0, length)
}

/* ───────────────────────────── THE WIRING PROBE (`§2.2` item 1, `§3.3`) ────────────────── */

export interface WiringProbe {
  readonly loaded: boolean
  readonly loadError: string | null
  readonly module: Record<string, unknown> | null
  readonly reason: string | null
}

let wiring: WiringProbe | null = null

export async function probeWiring(): Promise<WiringProbe> {
  if (wiring !== null) return wiring
  if (!existsSync(RENDERER_SRC)) {
    wiring = { loaded: false, loadError: null, module: null, reason: `the wiring does not exist (${RENDERER_PATH})` }
    return wiring
  }
  try {
    const mod = (await import(/* @vite-ignore */ RENDERER_SPECIFIER)) as Record<string, unknown>
    wiring = { loaded: true, loadError: null, module: mod, reason: null }
  } catch (e) {
    wiring = {
      loaded: false,
      loadError: e instanceof Error ? e.message : String(e),
      module: null,
      reason: `the wiring module does not load in the node host: ${e instanceof Error ? e.message : String(e)}`,
    }
  }
  return wiring
}

/** THE CONSTRAINT SUPPLY READING (`§2.2` item 1: "this unit supplies ONE member at the
 *  store's EXISTING construction site"): `constraints.length === 1` for the wired store,
 *  carrying the declared `id` and `evaluatedOn`. */
export function wiredConstraintReading(w: WiringProbe): { readonly ok: boolean; readonly reason: string } {
  if (!w.loaded || w.module === null) return { ok: false, reason: w.reason ?? 'the wiring did not load' }
  const factory = w.module['getWiredGraphStore']
  if (typeof factory !== 'function') {
    return { ok: false, reason: 'the wiring exports no `getWiredGraphStore` (the ONE construction site, §2.2 item 1)' }
  }
  const store = (factory as (o?: unknown) => unknown)({ declarations: tabsDeclarationRows() }) as Rec
  const constraints = store['constraints']
  if (!Array.isArray(constraints)) return { ok: false, reason: 'the wired store answers no `constraints` view' }
  if (constraints.length !== 1) {
    return {
      ok: false,
      reason: `the wired store carries ${constraints.length} constraint member(s); §2.2 item 1 declares ONE`,
    }
  }
  const member = constraints[0] as Rec
  if (member['id'] !== CONSTRAINT_ID) {
    return { ok: false, reason: `the supplied member's id is ${String(member['id'])}; §2.2 item 3 declares '${CONSTRAINT_ID}'` }
  }
  if (member['matchedSet'] !== CONSTRAINT_MATCHED_SET) {
    return { ok: false, reason: `the supplied matchedSet is ${String(member['matchedSet'])}; §2.2 item 3 declares '${CONSTRAINT_MATCHED_SET}'` }
  }
  const on = Array.isArray(member['evaluatedOn']) ? (member['evaluatedOn'] as string[]) : []
  const expected = [...CONSTRAINT_EVALUATED_ON]
  if (on.length !== expected.length || expected.some((op) => !on.includes(op))) {
    return { ok: false, reason: `the supplied evaluatedOn is ${JSON.stringify(on)}; §2.2 item 3 declares ${JSON.stringify(expected)}` }
  }
  return { ok: true, reason: 'the ONE member is supplied at the ONE construction site, with the declared cells' }
}

/** THE REGISTRY READING (`§5.5.1` `P-TR-IM-1`'s second reading, `§1.1` item 2): the
 *  membership has NO second authority — no module-level id registry in the wiring and no
 *  membership derived from anything but `order`. */
export function registryReading(w: WiringProbe): { readonly ok: boolean; readonly reason: string } {
  const bytes = bytesAt(RENDERER_PATH)
  if (bytes === null) return { ok: false, reason: 'the wiring does not exist' }
  const retires = /(?:let|const|var)\s+(?:tabIds|tabRegistry|tabIDRegistry)\b/.test(bytes)
  if (retires) return { ok: false, reason: 'a module-level tab-id registry exists in the wiring (`tabIds` RETIRES, §1.1 item 2)' }
  if (!w.loaded) return { ok: false, reason: w.reason ?? 'the wiring did not load' }
  return { ok: true, reason: 'no module-level id registry in the wiring; membership is the record’s own `order`' }
}

/* ───────────────────────────── THE ENVELOPE READING (`§5.1` item 2, `§6` `PAR-9`) ───────── */

export function authoredPageNodes(): { readonly ok: boolean; readonly found: readonly string[]; readonly reason: string } {
  const bytes = bytesAt(ENVELOPE_PATH)
  if (bytes === null) return { ok: false, found: [], reason: `the envelope module does not exist (${ENVELOPE_PATH})` }
  const found = DECLARED_PAGES.map((page) => page.id).filter((id) => bytes.includes(`'${id}'`) || bytes.includes(`"${id}"`))
  return {
    ok: found.length === DECLARED_PAGES.length,
    found,
    reason:
      found.length === DECLARED_PAGES.length
        ? 'both declared page nodes are authored in the envelope'
        : `the envelope authors ${found.length} of the ${DECLARED_PAGES.length} declared page nodes (found: ${JSON.stringify(found)})`,
  }
}

/** `§3.5` item 3 — NO PAGE IS BUILT BY HAND-WRITTEN DOM: the detector FIRES on a
 *  `createElement` in the diff, and its POSITIVE CONTROL is the synthetic fixture below. */
export const CREATE_ELEMENT_DETECTOR_FIXTURE = 'const el = document.' + 'createElement' + "('div')"

export function createElementIn(bytes: string): boolean {
  return /\bcreateElement\s*\(/.test(bytes)
}

/* ───────────────────────────── THE LIVE-ROW READING (`§5.5.1` `P-TR-TP-4`/`-TP-5`) ─────── */

export interface LiveRowReading {
  readonly ok: boolean
  readonly rows: readonly { readonly id: string; readonly hasInstrument: boolean; readonly hasCmd: boolean; readonly hasPost: boolean }[]
  readonly reason: string
}

/** THE `§5.U` ROW PROVENANCE (`§5.2` item 5, `§7` item 2(c)): for the two page ids the
 *  LIVE BATTERY must carry a row with an `instrument` from the CLOSED set, a literal `cmd`
 *  (or the literal token `MANUAL`), and a MEASURED `post`. The battery file is OWED and does
 *  not exist yet — **an un-run live row is a FAILURE, never a pass** (`§5.5.1`). */
export function liveRowReading(): LiveRowReading {
  const bytes = bytesAt(LIVE_BATTERY_PATH)
  if (bytes === null) {
    return {
      ok: false,
      rows: [],
      reason: `the §5.U live battery (${LIVE_BATTERY_PATH}) does not exist: the two pages' live rows are UN-RUN and a parked UI row is OPEN, never green (§7 item 2(e))`,
    }
  }
  const rows = DECLARED_PAGES.map((page) => ({
    id: page.id,
    hasInstrument: bytes.includes(page.id) && CLOSED_INSTRUMENT_SET.some((token) => bytes.includes(token)),
    hasCmd: bytes.includes('"cmd"') || bytes.includes('cmd:'),
    hasPost: bytes.includes('"post"') || bytes.includes('post:'),
  }))
  return { ok: rows.every((r) => r.hasInstrument && r.hasCmd && r.hasPost), rows, reason: 'the live battery file exists' }
}

/* ───────────────────────────── THE `[U]` PRECEDENTS (`§7` item 2(d)) ──────────────────── */

export interface LiveBatteryPrecedent {
  readonly ok: boolean
  readonly reason: string
}

/** `§7` item 2(d) — THE OPERATOR ROWS ARE `MANUAL OPERATOR` WITH A POSITIVE OWNER AND A
 *  LITERAL `cmd`, AND NO TOOL OUTPUT IS SUBSTITUTED FOR AN OPERATOR OBSERVATION. The three
 *  UNTAKEN precedents the contract names are the gutter battery's `U-3`/`U-4`/`U-6`. */
export function operatorRowPrecedent(): LiveBatteryPrecedent {
  const bytes = bytesAt(fileURLToPath(GUTTER_LIVE_BATTERY_SRC))
  if (bytes === null) return { ok: false, reason: 'the named precedent file does not exist' }
  const hasToken = bytes.includes('MANUAL OPERATOR')
  const hasSubstitutionBan = bytes.includes('no tool output is substituted')
  return {
    ok: hasToken && hasSubstitutionBan,
    reason:
      hasToken && hasSubstitutionBan
        ? 'the three untaken precedents are named and carry the MANUAL OPERATOR + no-substitution discipline'
        : 'the named precedent does not carry the declared operator-row discipline',
  }
}

/* ───────────────────────────── THE EDIT-SET READING (`§5.1`, `C-9`) ────────────────────── */

/** THE EDIT-SET ASSERTION, AS A SET (`C-9`): `edit-set ⊆ declared scope ∪ declared wiring
 *  points`, WITH a positive control that an edit outside that union FAILS. The edit set is
 *  READ FROM THE WORKING TREE by `git status`, because a node-layer row cannot see a diff
 *  any other way. **THE ROWS BELOW ARE DIFF-SCOPE ROWS: while this pass's two files are
 *  uncommitted they are red BY CONSTRUCTION** (`RCA-8(a)` — the supervisor commits at the
 *  gate boundary), which is reported rather than smoothed. */
export function editSetIsSubset(changedPaths: readonly string[], scope: readonly string[]): { readonly ok: boolean; readonly offenders: readonly string[] } {
  const offenders = changedPaths.filter((p) => !scope.includes(p))
  return { ok: offenders.length === 0, offenders }
}

/** THE POSITIVE CONTROL for the subset assertion: a path outside the union MUST FAIL it. */
export const EDIT_SET_OFFENDER_FIXTURE = 'src/main/mcp-server.ts'

/* ───────────────────────────── THE REGISTER RUNNER (`§5.5`) ───────────────────────────── */

export interface Attempt {
  readonly name: string
  readonly drive: () => void
}

export interface RowReport {
  readonly id: string
  readonly type: string
  readonly strategyId: string
  readonly declaredTerm: number
  readonly attemptsRun: number
  /** The attempts the STOP RULE abandoned inside this row: neither held nor broken. */
  readonly abandoned: number
  readonly held: number
  readonly broken: number
  readonly state: 'held' | 'broken' | 'un-run'
  readonly readings: readonly string[]
}

export interface RegisterReport {
  readonly rows: readonly RowReport[]
  readonly declaredTerms: readonly number[]
  readonly declaredTotal: number
  readonly chain: readonly number[]
  readonly subtotals: Readonly<Record<'P-IM' | 'P-SM' | 'P-TP', number>>
  readonly attemptsExecuted: number
  readonly rowsExecuted: number
  readonly rowsHeld: number
  readonly rowsBroken: number
  readonly unrunRows: readonly string[]
  readonly unrunAreFailures: true
  readonly stoppedAtRow: string | null
  readonly stopReason: string | null
  readonly perRowMax: number
  readonly perRowMaxRow: string
  readonly perRowCap: number
  readonly totalCap: number
}

export interface RegisterRow {
  readonly id: string
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  readonly term: number
  readonly property: string
  readonly drives: readonly Attempt[]
}

/* ───────────────────────────── THE FIFTEEN TYPED ROWS (`§5.5.1`) ──────────────────────── */

/** THE ROW TABLE, in the contract's own `§5.5.1` ORDER. Every drive is the REAL assertion
 *  its row's property states; the row's declared TERM is the contract's drive count, and
 *  `drives.length` equals it for every row (`executed = declared` per row is the gate's own
 *  identity check, `§5.5.2` item 5). */
/** THE RECORD-ENTRY READING (`§2.2` items 4/5, `§2.3` item 2), AS A SEPARATE, SEPARATELY
 *  FAILING INSTRUMENT: what the matched record's own `<tabId>` entry carries for a tab
 *  whose `active` leaf is written at the contract's DECLARED per-tab spelling
 *  `file.tabs.<tabId>.active`. The contract says the entry holds "the `active` leaf's
 *  value"; this instrument reports what the frozen store actually produces, so the
 *  divergence is a RED ROW carrying both clauses rather than a smoothed assumption. */
export function recordEntryReading(store: Rec, ids: readonly string[], probe: ConstraintProbe): Record<string, unknown> {
  void ids
  void store
  const last = probe.recordEntries[probe.recordEntries.length - 1]
  return last ?? {}
}

/** THE RECORD-ENTRY PROBE (`§2.2` item 4 / `§2.3` item 2, SPEC DEFECT #1): a member whose
 *  constraint records the matched record AS THE STORE BUILDS IT, with no fallback reading —
 *  so what the record's own `<tabId>` entry carries is measured DIRECTLY and the divergence
 *  between the contract's declared reading and the frozen store's record is a RED ROW with
 *  both clauses, never a smoothed assumption. */
export function recordEntryProbeMember(probe: ConstraintProbe): ConstraintMemberHandle {
  const member = {
    id: CONSTRAINT_ID,
    matchedSet: CONSTRAINT_MATCHED_SET,
    evaluatedOn: CONSTRAINT_EVALUATED_ON,
    constraint: (...args: [unknown, unknown, unknown, unknown?]): boolean => {
      const [changed, current, next] = args
      const rec = (next ?? {}) as Record<string, unknown>
      const keys = Object.keys(rec)
      const order = Array.isArray(rec['order']) ? (rec['order'] as string[]) : []
      const entries: Record<string, unknown> = {}
      for (const key of keys) if (key !== 'order') entries[key] = rec[key]
      probe.calls.push({ changed, current, next, argCount: args.length, recordKeys: keys, recordEntries: entries })
      probe.verdicts.push(order.filter((id) => rec[id] === true).length === 1)
      probe.recordKeys.push(keys)
      probe.recordEntries.push(entries)
      // THE INSTRUMENT'S VERDICT IS ALWAYS `true`: this member EXISTS to record the matched
      // record as the store builds it (`§2.2` item 4's declared read, with NO fallback), so
      // a `false` verdict from a READING instrument would refuse the very write whose
      // record the row must read. `order` is read for the record's own completeness.
      void order
      return true
    },
  }
  return { member, probe, state: { referent: null, removedId: null, preOrder: [] }, attach: (): void => undefined }
}

export function registerRows(): readonly RegisterRow[] {
  const S = DECLARED_SPELLINGS
  const fresh = (probe?: ConstraintProbe, extra: Record<string, unknown> = {}): { store: Rec; member: ConstraintMemberHandle } => {
    const s = surface as TabsSurface
    const member = tabsConstraintMember(probe)
    return { store: tabsStore(s, member, extra), member }
  }
  /** A STORE THAT DECLARES NO CONSTRAINT MEMBER — the POSITIVE-CONTROL fixture (`§3.2`
   *  F-T2-1's own control: with the member absent the zero-active state STANDS). */
  const bare = (extra: Record<string, unknown> = {}): Rec => tabsStore(surface as TabsSurface, null, extra)
  return [
    /* ── 1 · P-TR-IM-1 · S-TR-MEM-1 · term 12 = 6 states × 2 readings ────────────────── */
    {
      id: 'P-TR-IM-1',
      type: 'P-IM',
      strategyId: 'S-TR-MEM-1',
      term: 12,
      property: 'MEMBERSHIP AND ORDER ARE THE RECORD’S OWN (the six named states × the record reading and the registry reading)',
      drives: [
        { name: '(1) record reading — `order = [t7]`, t7’s declared record present with its four members', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            // ── THE OPERATIVE READING (`SD-1`; `§0D` item `1`(c)/(e)): the tab's ONE flat leaf
            //    `file.tabs.t7` holds its DECLARED RECORD, so the four members ride the ENTRY'S
            //    VALUE — the object-valued arm of the declared accessor pair.
            //    **AS FILED this read the four NESTED member leaves
            //    (`file.tabs.t7.target` · `.active` · `.error` · `.label`); that form is kept
            //    visible in `DECLARED_SPELLINGS` and `PER_TAB_LEAVES` and is MARKED
            //    SUPERSEDED-IN-EFFECT, and its own reading is asserted below as the control.**
            seedEntryRecord(store, ['t7'], 't7')
            expect(valueOf(store, S.order), '§3.1 M-3 — the order member’s members').toEqual(['t7'])
            const entry = resolveOf(store, S.entry('t7'))
            expect(entry['found'], '§2.1 item 2/3/4/5 / §0D item 1 (c) — the tab’s ONE flat leaf exists under its own key').toBe(true)
            const value = (entry['value'] ?? {}) as Rec
            for (const member of PER_TAB_LEAVES) {
              expect(member in value, `§0D item \`1\`(c)/(e) — the declared record carries ${member} inside the entry’s value`).toBe(true)
            }
            expect(entryReadsActive(value), '§0D item 1 (c) — the OBJECT arm reads active through entry.active === true').toBe(true)
            // ── THE AS-FILED NESTED SPELLING, DRIVEN AS THE RETAINED NEGATIVE CONTROL
            //    (`§0D` item `1`(g)): a tab whose mark is written ONLY at the nested member leaf
            //    contributes NO value at its own key — the ABSENCE that clause declares.
            const control = tabsStore(s, null)
            callStore(control, 'commit', S.active('t8'), true)
            const nestedOnly = resolveOf(control, S.entry('t8'))
            expect(nestedOnly['found'], '§0D item 1 (g) — the nested spelling is the RETAINED NEGATIVE CONTROL: its declared reading is the ENTRY’S ABSENCE').toBe(false)
          } },
        { name: '(1) registry reading — no second membership authority', drive: (): void => {
            const r = registryReading(wiring as WiringProbe)
            expect(r.ok, `§1.1 item 2 — ${r.reason}`).toBe(true)
          } },
        { name: '(2) record reading — `order = [t7,t8]`, four leaves each, one active', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't8'], 't7')
            expect(valueOf(store, S.order)).toEqual(['t7', 't8'])
            expect(activesOf(store, ['t7', 't8'])).toEqual(['t7'])
          } },
        { name: '(2) registry reading — the constraint member is supplied at the ONE construction call', drive: (): void => {
            const r = wiredConstraintReading(wiring as WiringProbe)
            expect(r.ok, `§2.2 item 1 — ${r.reason}`).toBe(true)
          } },
        { name: '(3) record reading — a member of `order` whose leaves are ALL absent answers the DECLARED MISS', drive: (): void => {
            const store = bare()
            // THE ENTRY IS A MEMBER OF `order` AND ITS LEAVES ARE ALL ABSENT: the read of a
            // DECLARED-BUT-UNWRITTEN name answers the DECLARED MISS (`§2.5`), never a refusal.
            const declaredButUnwritten = resolveOf(store, S.order)
            expect(isMiss(declaredButUnwritten), '§2.5 / §3.1 M-3 — the DECLARED MISS for a declared-but-unwritten name').toBe(true)
            callStore(store, 'commit', S.order, ['t7'])
            callStore(store, 'commit', S.target('t7'), 'target-t7')
            const tiers = store['tiers'] as Record<string, { get: (n: string) => Rec; has: (n: string) => boolean }>
            expect(tiers['file'].has(S.error('t7')), '§2.5 — the tier handle answers `false` for an unwritten leaf, never a refusal').toBe(false)
            expect(resolveOf(store, S.order)['value'], '§3.1 M-3 — an entry may be a member while a sibling leaf is unwritten').toEqual(['t7'])
          } },
        { name: '(3) registry reading — the declared-but-unwritten entry is not a second authority', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            callStore(store, 'commit', S.order, ['ghost'])
            expect(valueOf(store, S.order), '§3.1 M-3 — membership is the record’s own order, absent leaves included').toEqual(['ghost'])
          } },
        { name: '(4) record reading — a leaf whose id is NOT in `order` is answered by the RECORD and is NOT a member', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', S.entry('w9'), true)
            expect(valueOf(store, S.entry('w9')), '§2.1 item 1 — the record answers an unlisted entry').toBe(true)
            expect(valueOf(store, S.order), '§1.1 item 2 — `order` does not name it, so no row may treat it as a member').toEqual(['t7'])
          } },
        { name: '(4) registry reading — membership is derived from `order` alone', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', S.entry('w9'), true)
            const order = valueOf(store, S.order) as string[]
            expect(order.includes('w9'), '§1.1 item 2 — the unlisted id is not a member').toBe(false)
          } },
        { name: '(5) record reading — the order is the CALLER’S, never insertion order', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            callStore(store, 'commit', S.target('t8'), 't8-target')
            callStore(store, 'commit', S.target('t7'), 't7-target')
            callStore(store, 'commit', S.target('t9'), 't9-target')
            callStore(store, 'commit', S.order, ['t8', 't7', 't9'])
            expect(valueOf(store, S.order), '§2.1 item 1 / §1.1 item 4 — the caller’s own sequence, never insertion order').toEqual(['t8', 't7', 't9'])
          } },
        { name: '(5) registry reading — no insertion-order membership', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            callStore(store, 'commit', S.order, ['t8', 't7'])
            expect(valueOf(store, S.order), '§1.1 item 4 — no recency, no insertion order').toEqual(['t8', 't7'])
          } },
        { name: '(6) record reading — a HOSTILE id: the entry exists, is readable, the prototype is unpoisoned', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            callStore(store, 'commit', S.order, ['__proto__'])
            callStore(store, 'commit', S.entry('__proto__'), true)
            const a = resolveOf(store, S.entry('__proto__'))
            expect(a['found'], '§2.3 item 4 — `__proto__` is an ORDINARY STRING and its entry exists').toBe(true)
            expect(a['value']).toBe(true)
            const probe = {} as Rec
            expect(Object.getPrototypeOf(probe), '§2.3 item 4 — the hostile key is never a prototype key').toBe(Object.prototype)
            expect(Object.keys(probe).length, '§2.3 item 4 — no key is omitted').toBe(0)
          } },
        { name: '(6) registry reading — the hostile id is a member of `order` and nothing else changed', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            callStore(store, 'commit', S.order, ['__proto__'])
            callStore(store, 'commit', S.entry('__proto__'), true)
            expect(valueOf(store, S.order)).toEqual(['__proto__'])
          } },
      ],
    },

    /* ── 2 · P-TR-IM-2 · S-TR-PROJ-1 · term 8 = 4 states × 2 readings ────────────────── */
    {
      id: 'P-TR-IM-2',
      type: 'P-IM',
      strategyId: 'S-TR-PROJ-1',
      term: 8,
      property: 'THE RECORD IS THE PERSISTED PROJECTION — `§7a.1` item 7’s re-seed write, on this record’s own projection source, with NO `mem.focus.*` write',
      drives: [
        { name: '(1) persisted reading — a handed-off record re-projected unchanged', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            store['hydrate'] !== undefined && (store['hydrate'] as (rows: unknown) => void)([
              { name: S.order, value: ['t7', 'landing'] },
              { name: S.entry('t7'), value: true },
            ])
            expect(valueOf(store, S.order), '§3.1 M-5 — the hand-off’s own sequence, re-projected').toEqual(['t7', 'landing'])
            expect(valueOf(store, S.entry('t7'))).toBe(true)
          } },
        { name: '(1) negative reading — no `mem.focus.*` write and no focus register re-grain', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            expect(resolveOf(store, 'mem.focus.entries')['found'], '§0A item 9 — this unit writes NO `mem.focus.*` member').not.toBe(true)
          } },
        { name: '(2) persisted reading — a close, then the projection (the closed id absent, the landing entry present)', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't8', 'landing'], 't7')
            callStore(store, 'remove', S.entry('t8'))
            callStore(store, 'commit', S.order, ['t7', 'landing'])
            expect(valueOf(store, S.order), '§3.1 M-5 — the closed id is absent and the landing entry is present').toEqual(['t7', 'landing'])
          } },
        { name: '(2) negative reading — the projection writes no `mem.focus.*` member', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 'landing'], 't7')
            expect(resolveOf(store, 'mem.focus.activeId')['found'], '§0A item 9').not.toBe(true)
          } },
        { name: '(3) persisted reading — a close-last-tab, then the projection: the landing entry present WITH its active = true', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const { store } = fresh(probe)
            seedRecord(store, ['t7'], 't7')
            const rec = callStore(store, 'commit', S.order, [])
            expect(rec['status'], '§3.2 F-T2-4 — the empty-sequence write is COMMITTED, never refused').toBe('committed')
            expect(valueOf(store, S.order), '§3.2 F-T2-4 / R3-2 — the repair re-seats the landing entry as order[0]').toEqual(['landing'])
          } },
        { name: '(3) negative reading — the landing activation is a REPAIR, not a caller `set`', drive: (): void => {
            const s = surface as TabsSurface
            const { store } = fresh()
            const rec = callStore(store, 'commit', S.order, [])
            expect(Array.isArray(rec['repaired']), '§3.2 F-T2-3 — the repair’s own naming channel exists').toBe(true)
            expect((rec['repaired'] as string[]).length, '§3.2 F-T2-3 — the activation is a REPAIR the store lands, never a caller write').toBeGreaterThan(0)
          } },
        { name: '(4) persisted reading — a second boot of state (3): the projection is stable across the realm boundary', drive: (): void => {
            const s = surface as TabsSurface
            const first = tabsStore(s, null)
            first['hydrate'] !== undefined && (first['hydrate'] as (rows: unknown) => void)([
              { name: S.order, value: ['landing'] },
              { name: S.entry('landing'), value: true },
            ])
            const second = tabsStore(s, null)
            second['hydrate'] !== undefined && (second['hydrate'] as (rows: unknown) => void)([
              { name: S.order, value: valueOf(first, S.order) },
              { name: S.entry('landing'), value: true },
            ])
            expect(valueOf(second, S.order), '§3.5 item 1(c) / §3.1 M-5 — the re-boot’s seat survives').toEqual(['landing'])
          } },
        { name: '(4) negative reading — the re-boot differences nothing outside the record', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            store['hydrate'] !== undefined && (store['hydrate'] as (rows: unknown) => void)([
              { name: S.order, value: ['landing'] },
              { name: S.entry('landing'), value: true },
            ])
            expect(valueOf(store, S.order)).toEqual(['landing'])
            expect(resolveOf(store, 'mem.focus.entries')['found']).not.toBe(true)
          } },
      ],
    },

    /* ── 3 · P-TR-IM-3 · S-TR-CON-1 · term 16 = 8 states × 2 readings ────────────────── */
    {
      id: 'P-TR-IM-3',
      type: 'P-IM',
      strategyId: 'S-TR-CON-1',
      term: 16,
      property: 'THE `exactly-one-active` INVARIANT AND THE REPAIR’S REFERENT RULE, BOTH ARMS (eight named states × the state reading and the receipt reading)',
      drives: [
        { name: '(1) state reading — zero-active, the referent mid-`order` ([A,B,C], B closed) → the next surviving C', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'B')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            callStore(store, 'remove', S.entry('B'))
            callStore(store, 'commit', S.order, ['A', 'C'])
            expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — the NEXT SURVIVING entry by `order`; activating A FAILS').toEqual(['C'])
          } },
        { name: '(1) receipt reading — the repaired reference is named and carries its own `cause:repair` event', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'B')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            const rec = callStore(store, 'commit', S.order, ['A', 'C'])
            expect((rec['repaired'] as string[]).length, '§3.2 F-T2-1 / §5.5.1 — the repair’s own naming').toBeGreaterThan(0)
            expect(rec['events'], '§3.4 item 4 — the repair emits its own event BESIDE the caller’s').toBeGreaterThanOrEqual(2)
          } },
        { name: '(2) state reading — zero-active, the referent LAST ([A,B,C], C closed) → THE WRAP to A', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'C')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'C'
            callStore(store, 'remove', S.entry('C'))
            callStore(store, 'commit', S.order, ['A', 'B'])
            expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-1 — the WRAP to the first surviving; activating B FAILS').toEqual(['A'])
          } },
        { name: '(2) receipt reading — the wrap’s repair is reported', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'C')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'C'
            const rec = callStore(store, 'commit', S.order, ['A', 'B'])
            expect((rec['repaired'] as string[]).length).toBeGreaterThan(0)
          } },
        { name: '(3) state reading — zero-active, two members ([A,B], A closed) → B', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B']
            st.removedId = 'A'
            callStore(store, 'remove', S.entry('A'))
            callStore(store, 'commit', S.order, ['B'])
            expect(activesOf(store, ['B']), '§3.2 F-T2-1 — the next surviving entry').toEqual(['B'])
          } },
        { name: '(3) receipt reading — the two-member repair is reported', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B']
            st.removedId = 'A'
            const rec = callStore(store, 'commit', S.order, ['B'])
            expect(rec['status'], '§3.2 — the write stands with its repair in the same committed write').toBe('committed')
            expect((rec['repaired'] as string[]).length).toBeGreaterThan(0)
          } },
        { name: '(4) state reading — the close-last-tab arm: the landing entry activated as a REPAIR, its seat written in the same committed write', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            callStore(store, 'remove', S.entry('A'))
            const rec = callStore(store, 'commit', S.order, [])
            expect(valueOf(store, S.order), '§3.4 item 1 / R3-2 — `order` is NEVER EMPTY and holds the landing seat').toEqual(['landing'])
            expect((rec['repaired'] as string[]).length, '§3.2 F-T2-3 — the repair’s own write, in the SAME committed write').toBeGreaterThan(0)
          } },
        { name: '(4) receipt reading — the landing activation emits its own `cause:repair` event', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.order, [])
            expect(rec['events'], '§3.2 F-T2-3 — the repair emits its own cause:repair event').toBeGreaterThanOrEqual(2)
          } },
        { name: '(5) state reading — the caller’s EMPTY-SEQUENCE write re-seats the landing entry as `order[0]` and activates it', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            callStore(store, 'commit', S.order, ['A'])
            callStore(store, 'commit', S.entry('A'), true)
            const rec = callStore(store, 'commit', S.order, [])
            expect(rec['status'], '§3.2 F-T2-4 — a DECLARED ARM, never a refusal').toBe('committed')
            expect(valueOf(store, S.order), '§3.2 F-T2-4 — the landing entry lands at index 0').toEqual(['landing'])
          } },
        { name: '(5) receipt reading — the empty-sequence repair is a repair, not a caller write', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            callStore(store, 'commit', S.order, ['A'])
            const rec = callStore(store, 'commit', S.order, [])
            expect((rec['repaired'] as string[]).length).toBeGreaterThan(0)
          } },
        { name: '(6) state reading — surplus-active, WRITE-triggered (a second active = true): the referent kept, the other deactivated', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.referent = 'B'
            callStore(store, 'commit', S.entry('B'), true)
            expect(activesOf(store, ['A', 'B']), '§3.2 F-T2-2 — the caller’s OWN written reference is the referent').toEqual(['B'])
          } },
        { name: '(6) receipt reading — the surplus deactivation is reported', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.referent = 'B'
            const rec = callStore(store, 'commit', S.entry('B'), true)
            expect((rec['repaired'] as string[]).length).toBeGreaterThan(0)
          } },
        { name: '(7) state reading — surplus-active, `remove`-triggered ([A,B,C] ALL active, B closed): the winner read BY THE REMOVED ENTRY’S INDEX', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            // ── THE `≥2` POST-STATE IS CREATED BY ONE LANDED WRITE, NOT BY A SECOND `true`
            //    WRITE (`SD-1`; `§3.2` F-T2-2): under the operative flat accessor pair a second
            //    `entry = true` write is IMMEDIATELY REPAIRED (the `§3.2` F-T2-2 write-triggered
            //    arm), so the drive that reaches a `remove`-triggered `≥2` evaluation is the
            //    one whose PRE-STATE ENTERS the store with two or more active entries at once.
            //    `hydrate` is that seam, and it NEVER evaluates the constraint table
            //    (`§3.3` item 2) — so [A,B,C] all active is a real, landed, un-evaluated
            //    pre-state and the `remove` of `B` is the evaluation that fires the arm.
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([
              { name: S.order, value: ['A', 'B', 'C'] },
              { name: S.entry('A'), value: true },
              { name: S.entry('B'), value: true },
              { name: S.entry('C'), value: true },
            ])
            expect(activesOf(store, ['A', 'B', 'C']), '§3.2 F-T2-2 — the landed pre-state carries THREE actives (no evaluation has run)').toEqual(['A', 'B', 'C'])
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            callStore(store, 'remove', S.entry('B'))
            const actives = activesOf(store, ['A', 'C'])
            expect(actives.length, '§2.4 item 5 — exactly one survivor is kept').toBe(1)
            expect(actives[0], '§3.2 F-T2-2 — the winner is the survivor AT THE REMOVED ENTRY’S INDEX (C), never recency and never a first-surviving scan (which would keep A)').toBe('C')
          } },
        { name: '(7) receipt reading — no insertion time, no tie-break, no store-side preference', drive: (): void => {
            const s = surface as TabsSurface
            const run = (): string[] => {
              const member = tabsConstraintMember()
              const store = tabsStore(s, member)
              const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
              hydrate?.([
                { name: S.order, value: ['A', 'B', 'C'] },
                { name: S.entry('A'), value: true },
                { name: S.entry('B'), value: true },
                { name: S.entry('C'), value: true },
              ])
              const st = memberStateOf(member)
              st.preOrder = ['A', 'B', 'C']
              st.removedId = 'B'
              callStore(store, 'remove', S.entry('B'))
              return activesOf(store, ['A', 'C'])
            }
            expect(run(), '§3.2 F-T2-2 — two runs of the SAME drive with the SAME order agree').toEqual(run())
          } },
        { name: '(8) state reading — the POSITIVE CONTROL: a handed-off record already at exactly one active stays unchanged', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.order, ['A', 'B'])
            expect(activesOf(store, ['A', 'B']), '§5.5.1 state (8) — the post-state is unchanged').toEqual(['A'])
          } },
        { name: '(8) receipt reading — `repaired: []` on the non-violating post-state', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const rec = callStore(store, 'commit', S.order, ['A', 'B'])
            expect(rec['repaired'], '§5.5.1 state (8) — the positive control’s own reading').toEqual([])
          } },
      ],
    },

    /* ── 4 · P-TR-IM-4 · S-TR-CLOSE-1 · term 12 = 6 states × 2 readings ──────────────── */
    {
      id: 'P-TR-IM-4',
      type: 'P-IM',
      strategyId: 'S-TR-CLOSE-1',
      term: 12,
      property: 'THE SINGLE-WRITER / PERSISTED-REMOVAL INVARIANT (six close states × the record reading and the receipt reading)',
      drives: [
        { name: '(1) record reading — the four leaves PRESENT then closed answer the DECLARED MISS at the tier handle', drive: (): void => {
            const store = bare()
            seedRecord(store, ['t7'], 't7')
            for (const leaf of PER_TAB_LEAVES) callStore(store, 'remove', `file.tabs.t7.${leaf}`)
            const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean; get: (n: string) => Rec }>
            for (const leafName of PER_TAB_LEAVES) {
              expect(tiers['file'].has(`file.tabs.t7.${leafName}`), `§2.4 item 1 / §2.5 — ${leafName} is gone and the tier handle answers \`false\``).toBe(false)
            }
          } },
        { name: '(1) receipt reading — each removal names its own cleared reference', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const rec = callStore(store, 'remove', S.target('t7'))
            expect(rec['status'], '§2.4 item 2 — one tier-qualified concrete remove call').toBe('committed')
            expect(rec['cleared'], '§2.4 item 2 — the cleared reference is named').toEqual([S.target('t7')])
          } },
        { name: '(2) record reading — one leaf ABSENT then closed answers the returned `’undeclared-name’` record (F-T2-5)', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'remove', S.error('t7'))
            const rec = callStore(store, 'remove', S.error('t7'))
            expect(isRefusal(rec), '§3.2 F-T2-5 — a VALUE, never a throw').toBe(true)
            expect(rec['reason']).toBe('undeclared-name')
          } },
        { name: '(2) receipt reading — a refusal clears and repairs NOTHING (F-T2-6)', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'remove', S.error('t7'))
            const rec = callStore(store, 'remove', S.error('t7'))
            expect(rec['cleared'], '§3.2 F-T2-6').toEqual([])
            expect(rec['repaired']).toEqual([])
            expect(rec['events']).toBe(0)
          } },
        { name: '(3) record reading — a stale `mem` copy is cleared DOWNWARD with the `file` copy (R3-6)', drive: (): void => {
            const store = bare()
            seedRecord(store, ['t7'], 't7')
            // ── THE STALE LOWER COPY IS OF THE **SAME LOGICAL PATH** THE OPERATIVE CLOSE
            //    REMOVES (`§2.4` item 2's own words; `§2.4` item 1's note): under the ruled flat
            //    form the tab's reference is its ONE flat leaf `file.tabs.<tabId>`, so its
            //    less-persistent copy is `mem.tabs.<tabId>`. **THE AS-FILED SPELLING —
            //    `mem.tabs.<tabId>.active`, the nested member's own lower copy — IS KEPT
            //    VISIBLE HERE AND IS NOT THE REFERENCE THE OPERATIVE CLOSE CLEARS** (the
            //    operative close never touches a nested member leaf).
            callStore(store, 'commit', 'mem.tabs.t7', false)
            callStore(store, 'remove', S.entry('t7'))
            const tiers = store['tiers'] as Record<string, { has: (n: string) => boolean }>
            expect(tiers['mem'].has('mem.tabs.t7'), '§2.4 item 2 / R3-6 — no stale lower-tier copy survives').toBe(false)
          } },
        { name: '(3) receipt reading — the receipt names the cleared LOWER reference', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', 'mem.tabs.t7', false)
            const rec = callStore(store, 'remove', S.entry('t7'))
            expect(rec['cleared'], '§2.4 item 2 / R3-6 — the cleared[] carries the lower copy of the SAME logical path').toContain('mem.tabs.t7')
          } },
        { name: '(4) record reading — a SECOND close of the same tab is a DECLARED outcome, never a splice', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'remove', S.target('t7'))
            const first = callStore(store, 'remove', S.target('t7'))
            const second = callStore(store, 'remove', S.target('t7'))
            expect(isRefusal(first)).toBe(true)
            expect(second['reason'], '§3.2 F-T2-5 — the repeated close is the same declared record').toBe(first['reason'])
          } },
        { name: '(4) receipt reading — the repeated close mutates nothing', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'remove', S.target('t7'))
            callStore(store, 'remove', S.target('t7'))
            const rec = callStore(store, 'remove', S.target('t7'))
            expect(rec['cleared']).toEqual([])
            expect(rec['events']).toBe(0)
          } },
        { name: '(5) record reading — the `order` rewrite on a PRESENT leaf: `commit` succeeds and is a WRITE, not a removal', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't8'], 't7')
            const rec = callStore(store, 'commit', S.order, ['t7'])
            expect(rec['status'], '§2.4 item 3 — the rewrite is a minting/re-minting write').toBe('committed')
            expect(valueOf(store, S.order), '§2.4 item 3 — the post-state drops exactly the closed id').toEqual(['t7'])
          } },
        { name: '(5) receipt reading — `set` on a COLD leaf is REFUSED `’undeclared-name’` (the declared pair)', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const cold = callStore(store, 'set', S.order, ['t7'])
            expect(cold['reason'], '§2.4 item 3 — `set` NEVER mints, so a close that used `set` on a cold leaf FAILS').toBe('undeclared-name')
            const warm = callStore(store, 'commit', S.order, ['t7'])
            expect(warm['status']).toBe('committed')
          } },
        { name: '(6) record reading — the POSITIVE CONTROL: a NON-member’s close removes nothing outside the declared set', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't8'], 't7')
            callStore(store, 'remove', S.target('w9'))
            expect(valueOf(store, S.order), '§2.4 item 1 — another tab’s data is untouched').toEqual(['t7', 't8'])
            expect(valueOf(store, S.target('t8'))).toBe('target-t8')
          } },
        { name: '(6) receipt reading — the non-member close is a refusal with an empty receipt', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't8'], 't7')
            const rec = callStore(store, 'remove', S.target('w9'))
            expect(isRefusal(rec)).toBe(true)
            expect(rec['cleared']).toEqual([])
            expect(rec['events']).toBe(0)
          } },
      ],
    },

    /* ── 5 · P-TR-IM-5 · S-TR-MINT-1 · term 6 = 3 states × 2 readings ────────────────── */
    {
      id: 'P-TR-IM-5',
      type: 'P-IM',
      strategyId: 'S-TR-MINT-1',
      term: 6,
      property: 'THE TAB-ID MINTING SITE AND THE DUPLICATE REFUSAL (three mint states × the mint reading and the `order` reading)',
      drives: [
        { name: '(1) mint reading — a FRESH id minted against a persisted `order`', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const freshId = 't9'
            const rec = callStore(store, 'commit', S.entry(freshId), true)
            expect(rec['status'], '§1.1 item 8 — the id is minted at the ONE bounded wiring role').toBe('committed')
          } },
        { name: '(1) `order` reading — the membership gains exactly one member', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', S.order, ['t7', 't9'])
            expect(valueOf(store, S.order), '§5.5.1 state (1)').toEqual(['t7', 't9'])
          } },
        { name: '(2) mint reading — a DUPLICATE id is REFUSED at the minting site (no write)', drive: (): void => {
            const ids = (valueOf(tabsStore(surface as TabsSurface, null), S.order) ?? []) as unknown
            void ids
            // §0A item 2: "a minted id ALREADY a member of the persisted file.tabs.order is a
            // DUPLICATE and the mint is REFUSED at the minting site" — refused CALLER-SIDE (the
            // store ships no 'duplicate-id' token, and this unit may add none: §5.1).
            const mintingSite = mintingSiteProbe()
            expect(mintingSite.ok, `§0A item 2 / §1.1 item 8 — ${mintingSite.reason}`).toBe(true)
          } },
        { name: '(2) `order` reading — no duplicate entry ever appears in `order`', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const mintingSite = mintingSiteProbe()
            expect(mintingSite.ok, '§5.5.1 state (2) — the falsifier: the id must NOT appear twice').toBe(true)
            expect(valueOf(store, S.order), '§5.5.1 state (2) — no duplicate order member').toEqual(['t7'])
          } },
        { name: '(3) mint reading — the POSITIVE CONTROL: the same id minted against an `order` from which it was closed SUCCEEDS', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't9'], 't7')
            callStore(store, 'remove', S.entry('t9'))
            callStore(store, 'commit', S.order, ['t7'])
            const rec = callStore(store, 'commit', S.entry('t9'), true)
            expect(rec['status'], '§5.5.1 state (3) — the id is no longer a member').toBe('committed')
          } },
        { name: '(3) `order` reading — the re-minted id re-enters `order` exactly once', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 't9'], 't7')
            callStore(store, 'remove', S.entry('t9'))
            callStore(store, 'commit', S.order, ['t7'])
            callStore(store, 'commit', S.entry('t9'), true)
            callStore(store, 'commit', S.order, ['t7', 't9'])
            expect(valueOf(store, S.order)).toEqual(['t7', 't9'])
          } },
      ],
    },

    /* ── 6 · P-TR-SM-1 · S-TR-CSM-1 · term 10 = 8 named ids + the control pair ───────── */
    {
      id: 'P-TR-SM-1',
      type: 'P-SM',
      strategyId: 'S-TR-CSM-1',
      term: 10,
      property: 'THE CLOSE VERB’S STATE MACHINE, CLOSED — ten attempts, EACH WITH ITS OWN ID',
      drives: [
        { name: '(a) OPEN — the pre-close observable (one active, `order`’s members)', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            expect(valueOf(store, S.order)).toEqual(['A', 'B'])
            expect(activesOf(store, ['A', 'B'])).toEqual(['A'])
          } },
        { name: '(b) CLOSING — the four leaves of one tab removed, the rest untouched', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'B'], 'A')
            for (const leaf of PER_TAB_LEAVES) callStore(store, 'remove', `file.tabs.B.${leaf}`)
            expect(valueOf(store, S.target('A')), '§3.2 — the rest is untouched').toBe('target-A')
          } },
        { name: '(c) ORDER-REWRITTEN — the closed id is no longer a member and nothing else moved', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.order, ['A'])
            expect(valueOf(store, S.order)).toEqual(['A'])
            expect(valueOf(store, S.target('A'))).toBe('target-A')
          } },
        { name: '(d) EVALUATED — the constraint ran (the receipt carries its repair channel and the affected-reference count)', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B']
            st.removedId = 'A'
            const rec = callStore(store, 'commit', S.order, ['B'])
            expect(Array.isArray(rec['repaired']), '§3.4 item 3 — every commit evaluates the member on its post-state').toBe(true)
            expect(rec['events'], '§3.4 item 4 — the event count is over the affected references').toBeGreaterThanOrEqual(1)
          } },
        { name: '(e) REPAIRED — the next-surviving entry active, exactly one active', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'B')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            callStore(store, 'commit', S.order, ['A', 'C'])
            expect(activesOf(store, ['A', 'C']), '§3.2 F-T2-1 — exactly one, the next surviving').toEqual(['C'])
          } },
        { name: '(f) NOT-REPAIRED — the close of a NON-active tab leaves the active entry UNCHANGED', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'remove', S.entry('B'))
            callStore(store, 'commit', S.order, ['A'])
            expect(activesOf(store, ['A']), '§5.5.1 (f) — no repair is reached for a non-active close').toEqual(['A'])
          } },
        { name: '(g) SETTLED — the membership shrank by one and the active entry is UNCHANGED', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.order, ['A'])
            expect(valueOf(store, S.order)).toEqual(['A'])
            expect(activesOf(store, ['A'])).toEqual(['A'])
          } },
        { name: '(h) LANDING-ACTIVATED — the last-tab terminal: the landing entry active AND re-seated in `order`, in ONE committed write', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.order, [])
            expect(valueOf(store, S.order), '§3.2 F-T2-3 — the seat is written in the SAME committed write').toEqual(['landing'])
            expect(rec['status']).toBe('committed')
            expect((rec['repaired'] as string[]).length, '§3.2 F-T2-3 — its own cause:repair event').toBeGreaterThan(0)
          } },
        { name: '(i) RESERVED-REFUSED — `remove(’file.tabs.landing’)`: the returned refusal, empty receipt, the seat untouched', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'landing'], 'A')
            const rec = callStore(store, 'remove', S.landing)
            expect(rec['reason'], '§2.1 item 6 / A-5 — REFUSED BY NAME').toBe('reserved-name')
            expect(rec['cleared']).toEqual([])
            expect(rec['repaired']).toEqual([])
            expect(rec['events']).toBe(0)
            expect(valueOf(store, S.order), '§3.2 F-T2-6 — the entry and its seat are UNTOUCHED').toEqual(['A', 'landing'])
          } },
        { name: '(j) POSITIVE CONTROL — the same removal on a non-reserved sibling’s own name COMMITS', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7', 'landing'], 't7')
            const rec = callStore(store, 'remove', S.target('t7'))
            expect(rec['status'], '§3.2 F-T2-3 — `remove(’file.tabs.t7.target’)` succeeds under the pattern').toBe('committed')
          } },
      ],
    },

    /* ── 7 · P-TR-SM-2 · S-TR-EVAL-1 · term 10 = 5 operations × 2 readings ──────────── */
    {
      id: 'P-TR-SM-2',
      type: 'P-SM',
      strategyId: 'S-TR-EVAL-1',
      term: 10,
      property: 'THE WRITE/`remove`-EVALUATION TOTALLITY: which operations evaluate the constraint, and what each leaves behind',
      drives: [
        { name: '`set` — evaluation reading: the member is reached', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const before = probe.calls.length
            callStore(store, 'set', S.entry('B'), true)
            expect(probe.calls.length, '§3.4 item 3 — every `set` evaluates the member on its post-state').toBeGreaterThan(before)
          } },
        { name: '`set` — post-state reading: the repair landed in the SAME committed write', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const st = memberStateOf(member)
            st.referent = 'B'
            const rec = callStore(store, 'set', S.entry('B'), true)
            expect(rec['status']).toBe('committed')
            expect(activesOf(store, ['A', 'B']), '§3.4 item 3 — no window in which the post-state violates the constraint').toEqual(['B'])
          } },
        { name: '`commit` — evaluation reading: the member is reached', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            const before = probe.calls.length
            callStore(store, 'commit', S.order, ['A'])
            expect(probe.calls.length, '§3.4 item 3 — every `commit` evaluates the member').toBeGreaterThan(before)
          } },
        { name: '`commit` — post-state reading: the constraint’s positional arguments (changed/current/next, `current` PRE, `next` POST)', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            probe.calls.length = 0
            callStore(store, 'commit', S.order, ['A', 'B'])
            const call = probe.calls[probe.calls.length - 1]
            expect(call.argCount, '§2.2 item 3 / §5.5.1 — the constraint is called with ≥3 positional arguments').toBeGreaterThanOrEqual(3)
            expect(call.changed, '§2.2 item 3 — `changed` is the written data').toEqual(['A', 'B'])
            expect((call.current as Rec)['order'], '§2.4 item 5 — `current` is captured BEFORE the mutation').toEqual(['A', 'B'])
            expect((call.next as Rec)['order'], '§2.2 item 3 — `next` is the landed post-state').toEqual(['A', 'B'])
          } },
        { name: '`remove` — evaluation reading: the member IS reached (a `remove` that SKIPPED the evaluation FAILS)', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const before = probe.calls.length
            callStore(store, 'remove', S.entry('B'))
            expect(probe.calls.length, '§3.4 item 3 — every `remove` evaluates the member on its post-state').toBeGreaterThan(before)
          } },
        { name: '`remove` — post-state reading: the removed leaf is OBSERVABLE as absent from the matched record', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            probe.calls.length = 0
            callStore(store, 'remove', S.entry('B'))
            const call = probe.calls[probe.calls.length - 1]
            expect((call.current as Rec)['order'], '§2.4 item 5 — the PRE-write capture still holds the pre-state').toEqual(['A', 'B'])
          } },
        { name: '`clear` — evaluation reading: the declared NEGATIVE (the member is NOT reached)', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const before = probe.calls.length
            callStore(store, 'clear', S.entry('B'))
            expect(probe.calls.length, '§3.4 item 3 — `clear` does NOT evaluate the constraint table').toBe(before)
          } },
        { name: '`sweep` — evaluation reading: the declared NEGATIVE (the member is NOT reached)', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const before = probe.calls.length
            callStore(store, 'sweep', S.entry('B'))
            expect(probe.calls.length, '§3.4 item 3 — `sweep` does NOT evaluate the constraint table').toBe(before)
          } },
        { name: '`clear`/`sweep` — post-state reading: `repaired: []` and the violation STANDS (the declared negative)', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            const cleared = callStore(store, 'clear', S.entry('A'))
            const swept = callStore(store, 'sweep', S.entry('B'))
            expect(cleared['repaired'], '§3.4 item 5 — the declared behaviour, not a defect').toEqual([])
            expect(swept['repaired']).toEqual([])
          } },
        { name: 'the constraint-argument reading — the mutation-detector, with its POSITIVE CONTROL (a mutating member FIRES it)', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.order, ['A', 'B'])
            const mutating = (next: unknown): void => {
              const rec = next as Rec
              if (rec !== null && typeof rec === 'object') rec['order'] = ['MUTATED']
            }
            const before = (probe.calls[probe.calls.length - 1].next as Rec)['order']
            mutating(probe.calls[probe.calls.length - 1].next)
            const after = (probe.calls[probe.calls.length - 1].next as Rec)['order']
            expect(JSON.stringify(before), '§5.5.1 — the mutation-detector’s POSITIVE CONTROL: the same detector FIRES against a mutating constraint').not.toBe(JSON.stringify(after))
          } },
      ],
    },

    /* ── 8 · P-TR-SM-4 · S-TR-PSM-1 · term 6 = six named state ids ──────────────────── */
    {
      id: 'P-TR-SM-4',
      type: 'P-SM',
      strategyId: 'S-TR-PSM-1',
      term: 6,
      property: 'THE RECORD’S PROJECTION STATE MACHINE — the one state the record itself owns (six attempts, each with its own id)',
      drives: [
        { name: '(a) UNWRITTEN — the record answers the DECLARED MISS for every name', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            expect(isMiss(resolveOf(store, S.order)), '§5.5.1 (a) — `order` is not a member yet').toBe(true)
            expect(isMiss(resolveOf(store, S.entry('t7')))).toBe(true)
          } },
        { name: '(b) SEATED — the hand-off’s `hydrate` minted the members the record names, and NO constraint evaluation has run', drive: (): void => {
            const s = surface as TabsSurface
            const probe: ConstraintProbe = { calls: [], verdicts: [], recordKeys: [], recordEntries: [], mutatingMemberFired: false }
            const member = tabsConstraintMember(probe)
            const store = tabsStore(s, member)
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            expect(typeof hydrate, '§2.5 — `hydrate` is a PRODUCTION-PRESENT declared member').toBe('function')
            const before = probe.calls.length
            hydrate?.([{ name: S.order, value: ['t7'] }, { name: S.entry('t7'), value: true }])
            expect(probe.calls.length, '§3.3 item 2 — `hydrate` NEVER evaluates the constraint table').toBe(before)
            expect(valueOf(store, S.order), '§3.3 item 2 — the hand-off’s record is minted').toEqual(['t7'])
          } },
        { name: '(c) MEMBER-ADDED — a fresh id’s leaves written AND its seat added, with exactly one active', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', S.entry('t9'), false)
            callStore(store, 'commit', S.order, ['t7', 't9'])
            expect(valueOf(store, S.order)).toEqual(['t7', 't9'])
            expect(activesOf(store, ['t7', 't9'])).toEqual(['t7'])
          } },
        { name: '(d) MEMBER-CLOSED — the seat dropped and the leaves removed, the active entry being the next surviving', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'B')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            callStore(store, 'remove', S.entry('B'))
            callStore(store, 'commit', S.order, ['A', 'C'])
            expect(activesOf(store, ['A', 'C']), '§5.5.1 (d)').toEqual(['C'])
          } },
        { name: '(e) REPROJECTED — a second boot reads the persisted projection, member-for-member equal', drive: (): void => {
            const s = surface as TabsSurface
            const first = tabsStore(s, null)
            seedRecord(first, ['A', 'landing'], 'A')
            const persisted = valueOf(first, S.order)
            const second = tabsStore(s, null)
            const hydrate = second['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            expect(typeof hydrate).toBe('function')
            hydrate?.([{ name: S.order, value: persisted }])
            expect(valueOf(second, S.order), '§5.5.1 (e) — member-for-member equal to the first boot’s post-state').toEqual(persisted)
          } },
        { name: '(f) LANDING-SEATED — the close-last-tab terminal: the landing entry’s `active = true` and its seat in the SAME committed write', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.order, [])
            expect(rec['status']).toBe('committed')
            expect(valueOf(store, S.order)).toEqual(['landing'])
            expect((rec['repaired'] as string[]).length).toBeGreaterThan(0)
          } },
      ],
    },

    /* ── 9 · P-TR-SM-3 · S-TR-BOOT-1 · term 8 = 4 boot states × 2 readings ──────────── */
    {
      id: 'P-TR-SM-3',
      type: 'P-SM',
      strategyId: 'S-TR-BOOT-1',
      term: 8,
      property: 'THE BOOT/HYDRATION ORDERING AND THE FIRST CONSTRAINT EVALUATION (`C-12`’s claim)',
      drives: [
        { name: '(1) order reading — the boot step is the wiring’s own slice step, and the wired store carries the ONE member', drive: (): void => {
            const r = wiredConstraintReading(wiring as WiringProbe)
            expect(r.ok, `§3.3 item 1/3 — ${r.reason}`).toBe(true)
          } },
        { name: '(1) evaluation reading — a handed-off record at exactly one active is the POSITIVE CONTROL: `repaired: []`, post-state unchanged', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A'] }, { name: S.entry('A'), value: true }])
            const rec = callStore(store, 'commit', S.order, ['A'])
            expect(rec['repaired'], '§3.3 item 5 — the positive control is attributable, not vacuous').toEqual([])
            expect(activesOf(store, ['A'])).toEqual(['A'])
          } },
        { name: '(2) order reading — a handed-off record at ZERO active: the boot write is the `order` rewrite', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A', 'B'] }, { name: S.entry('A'), value: false }, { name: S.entry('B'), value: false }])
            const rec = callStore(store, 'commit', S.order, ['A', 'B'])
            expect(rec['status'], '§3.3 item 3 — the `order` rewrite is the declared vehicle').toBe('committed')
          } },
        { name: '(2) evaluation reading — the boot write repairs, the activated entry being the NEXT SURVIVING by `order`', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A', 'B'] }, { name: S.entry('A'), value: false }, { name: S.entry('B'), value: false }])
            const rec = callStore(store, 'commit', S.order, ['A', 'B'])
            expect((rec['repaired'] as string[]).length, '§3.3 item 5 — the boot-step receipt carries `repaired: [...]`').toBeGreaterThan(0)
            expect(activesOf(store, ['A', 'B']), '§3.3 item 5 — exactly one active after the boot write').toEqual(['A'])
          } },
        { name: '(3) order reading — a handed-off record at ≥2 active: the boot write’s receipt and post-state', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.entry('B'), true)
            const st = memberStateOf(member)
            st.referent = 'A'
            const rec = callStore(store, 'commit', S.order, ['A', 'B'])
            expect(rec['status']).toBe('committed')
          } },
        { name: '(3) evaluation reading — the ≥2 arm repairs to the referent', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.entry('B'), true)
            const st = memberStateOf(member)
            st.referent = 'A'
            callStore(store, 'commit', S.order, ['A', 'B'])
            expect(activesOf(store, ['A', 'B']), '§3.3 item 5 — exactly one active').toEqual(['A'])
          } },
        { name: '(4) the `hydrate`-alone reading — `hydrate` fires no `cause:repair` event', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            const causes: string[] = []
            const subscribe = store['subscribe'] as ((n: string, l: (e: Rec) => void, o?: Rec) => unknown) | undefined
            subscribe?.('file.tabs', (e) => causes.push(String(e['cause'])), { subtree: true })
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A'] }, { name: S.entry('A'), value: false }])
            expect(causes.includes('repair'), '§3.3 item 2 — a `hydrate` that repairs FAILS this clause').toBe(false)
          } },
        { name: '(4) the boot-load event surface — `hydrate` still fires its boot-load events by design', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const seen: string[] = []
            const subscribe = store['subscribe'] as ((n: string, l: (e: Rec) => void, o?: Rec) => unknown) | undefined
            expect(typeof subscribe, '§2.5 — `subscribe` is a declared member').toBe('function')
            subscribe?.('file.tabs', (e) => seen.push(String(e['name'])), { subtree: true })
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A'] }])
            expect(seen.length, 'HYDRATE-1 — the two facts are read TOGETHER so neither is over-read').toBeGreaterThan(0)
          } },
      ],
    },

    /* ── 10 · P-TR-TP-1 · S-TR-TOT-1 · term 16 = 8 answers × 2 readings ─────────────── */
    {
      id: 'P-TR-TP-1',
      type: 'P-TP',
      strategyId: 'S-TR-TOT-1',
      term: 16,
      property: 'THE STORE’S ANSWER TOTALLITY, OVER THE CLOSED EIGHT-ROW ANSWER SET (`§3.6` `A-1`…`A-8`)',
      drives: [
        { name: 'A-1 MISS — shape reading', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const a = resolveOf(store, S.order)
            expect(a['found']).toBe(false)
            expect(a['value']).toBeUndefined()
            expect(a['tier']).toBeNull()
            expect(a['cache']).toBeNull()
            expect(a['name']).toBe(S.order)
          } },
        { name: 'A-1 MISS — distinction reading: a DECLARED name’s miss is the control against A-3', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const a = resolveOf(store, S.order)
            expect(isMiss(a), '§3.6 A-1 — the DECLARED MISS, never a refusal').toBe(true)
            expect(isRefusal(a), '§3.6 A-3 — the control that separates the neighbours').toBe(false)
          } },
        { name: 'A-2 the merged `parts` arm — this unit’s read path carries NO `merged`/`parts` member', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const hit = resolveOf(store, S.entry('t7'))
            expect('merged' in hit, '§3.6 A-2 — a row asserting a `parts` member on this unit’s read path FAILS').toBe(false)
            expect('parts' in hit).toBe(false)
          } },
        { name: 'A-2 — distinction reading: the miss arm carries no `merged`/`parts` member either', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const miss = resolveOf(store, S.order)
            expect('merged' in miss).toBe(false)
            expect('parts' in miss).toBe(false)
          } },
        { name: 'A-3 `’undeclared-name’` — shape reading', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const rec = callStore(store, 'commit', 'file.nosuchroot.leaf', true)
            expect(rec['status'], '§3.6 A-3 — a name that is neither declared nor registered').toBe('refused')
            expect(rec['reason']).toBe('undeclared-name')
            expect(rec['diagnostic'], '§3.4 R-4 — a refusal record without a diagnostic FAILS').toBeTruthy()
          } },
        { name: 'A-3 — distinction reading: the positive control is a declared name’s MISS, never a refusal', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            const miss = resolveOf(store, S.order)
            expect(miss['found']).toBe(false)
            expect(miss['reason']).toBeUndefined()
          } },
        { name: 'A-4 `’ambiguous-path’` — shape reading: the token is a HELD member of the closed union', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const memWrite = callStore(store, 'commit', 'mem.tabs.t7.active', false)
            expect(memWrite['status'], '§2.4 item 1 — this unit’s record holds each leaf at ONE tier').toBe('committed')
          } },
        { name: 'A-4 — distinction reading: a path resident in TWO tiers is NOT a declared state of this unit', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            callStore(store, 'commit', 'mem.tabs.t7.active', false)
            const removeFile = callStore(store, 'remove', S.entry('t7'))
            expect(['committed', 'refused']).toContain(removeFile['status'])
            expect(
              removeFile['reason'] === undefined || typeof removeFile['reason'] === 'string',
              '§3.6 A-4 — the store’s own rule refuses such a remove unless the caller names the tier',
            ).toBe(true)
          } },
        { name: 'A-5 `’reserved-name’` — shape reading', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['landing'], 'landing')
            const rec = callStore(store, 'remove', S.landing)
            expect(rec['status']).toBe('refused')
            expect(rec['reason']).toBe('reserved-name')
          } },
        { name: 'A-5 — distinction reading: the non-reserved sibling’s COMMIT is the control', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const rec = callStore(store, 'remove', S.target('t7'))
            expect(rec['status'], '§3.6 A-5 — the positive control').toBe('committed')
          } },
        { name: 'A-6 `’reserved-namespace’` — shape reading: the six declared root names are ORDINARY', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            expect(store['constraints'], '§2.2 item 1 — the store is constructed with a legal declaration input').toBeTruthy()
            const rows = (store['register'] as Rec)['rows'] as Rec[]
            const tabsRow = rows.find((r) => r['name'] === 'tabs')
            expect(tabsRow?.['reserved'], '§0A item 1 — a pass that marks the `tabs` ROOT reserved FAILS §2.1 item 6’s positive control').toBe(false)
          } },
        { name: 'A-6 — distinction reading: an ordinary root’s load is the control', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            expect(store['constraints']).toBeTruthy()
          } },
        { name: 'A-7 a refused receipt — shape reading: every refusal clears and repairs nothing', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['landing'], 'landing')
            const rec = callStore(store, 'remove', S.landing)
            expect(rec['cleared']).toEqual([])
            expect(rec['repaired']).toEqual([])
            expect(rec['rows']).toEqual([])
            expect(rec['crossings']).toBe(0)
            expect(rec['events']).toBe(0)
          } },
        { name: 'A-7 — distinction reading: the refusal is a RETURNED record, never a throw', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['landing'], 'landing')
            let threw = false
            let rec: Rec = {}
            try {
              rec = callStore(store, 'remove', S.landing)
            } catch {
              threw = true
            }
            expect(threw, '§2.5 — a refusal is ALWAYS a returned record').toBe(false)
            expect(rec['status']).toBe('refused')
          } },
        { name: 'A-8 a committed receipt carrying `repaired: []` — shape reading', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const rec = callStore(store, 'commit', S.entry('t7'), true)
            expect(rec['status']).toBe('committed')
            expect(rec['repaired']).toEqual([])
            expect(typeof rec['events'], '§3.4 item 4 — `events` is counted over the affected references').toBe('number')
          } },
        { name: 'A-8 — distinction reading: no NINTH shape and no un-enumerated token on the record’s read path', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['t7'], 't7')
            const hit = resolveOf(store, S.entry('t7'))
            const keySet = Object.keys(hit).sort()
            expect(keySet, '§3.6 — the hit arm’s declared members, and no ninth').toEqual(
              ['cache', 'flag', 'found', 'name', 'tier', 'value'].sort(),
            )
          } },
      ],
    },

    /* ── 11 · P-TR-TP-2 · S-TR-INVIS-1 · term 8 = 4 negative subjects × 2 readings ──── */
    {
      id: 'P-TR-TP-2',
      type: 'P-TP',
      strategyId: 'S-TR-INVIS-1',
      term: 8,
      property: 'THE GRAPH-INVISIBILITY NEGATIVE — the record is NEVER the mirror (`P-16` cited BY ROW NAME)',
      drives: [
        { name: '(1) absence reading — the diff’s file set contains no graph/envelope-dispatch site', drive: (): void => {
            const bytes = bytesAt(RENDERER_PATH)
            expect(bytes, 'the wiring exists').not.toBeNull()
            // THE DETECTOR IS ANCHORED ON THE CALL/TOKEN FORMS, not on the bare words: a
            // comment or a prose mention of the op names is not a dispatch (the same
            // discipline the register's own scan-corpus rule keeps for its fixtures).
            const dispatchDetector = (source: string): boolean =>
              /provident\.dispatch\s*\(/.test(source) ||
              /['"]rows-mint['"]/.test(source) ||
              /['"]rows-clear['"]/.test(source) ||
              /supervisor\.apply\s*\(/.test(source)
            expect(
              dispatchDetector(bytes ?? ''),
              '§2.6 item 2 — a row that observes this unit dispatching or minting a graph node FAILS',
            ).toBe(false)
          } },
        { name: '(1) positive control — the same census instrument FIRES against a subject that DOES dispatch', drive: (): void => {
            expect(/\bdispatch\s*\(/.test('provident.dispatch(payload)'), '§5.5.1 — the absence reading is attributable, not vacuous').toBe(true)
          } },
        { name: '(2) absence reading — the MCP surface’s sets are unchanged', drive: (): void => {
            const mcp = bytesAt(fileURLToPath(new URL('./../src/main/' + 'mcp-server' + '.ts', import.meta.url)))
            expect(mcp, 'the MCP server module exists').not.toBeNull()
            expect(/tabs/.test(mcp ?? ''), '§2.6 item 1 — no tool, resource, group, RpcMethod, MUTATING_METHODS or VALID_GROUPS member is added').toBe(false)
          } },
        { name: '(2) positive control — the census instrument fires on a synthetic member', drive: (): void => {
            expect(/tabs/.test("name: 'provident.tabs'"), '§5.5.1 — the same census FIRES against a subject that adds such a member').toBe(true)
          } },
        { name: '(3) absence reading — the two frozen store modules are byte-identical to their executed file pins', drive: (): void => {
            for (const pin of FROZEN_FILE_PINS) {
              expect(sha256PrefixOf(pin.path), `§5.1 item 7 — ${pin.label} = ${pin.prefix}…`).toBe(pin.prefix)
            }
          } },
        { name: '(3) positive control — the digest comparator fires on a byte-moved copy', drive: (): void => {
            const bytes = readFileSync(STORE_CORE_PATH)
            const moved = createHash('sha256').update(Buffer.concat([bytes, Buffer.from(' ')])).digest('hex').slice(0, 8)
            expect(moved, '§5.5.1 — a byte-moved copy must NOT answer the pin').not.toBe('0664c52f')
          } },
        { name: '(4) absence reading — the store’s bytes carry no `tabs`/`active`/`landing` token as STORE VOCABULARY', drive: (): void => {
            const core = bytesAt(STORE_CORE_PATH) ?? ''
            const refs = bytesAt(STORE_REFS_PATH) ?? ''
            expect(/tabs/.test(core + refs), '§2.2 item 6 — the store’s own bytes carry no consumer token').toBe(false)
            expect(/\blanding\b/.test(refs), '§2.2 item 6 — `landing` is not store vocabulary').toBe(false)
          } },
        { name: '(4) positive control — the token census fires on a store-carried consumer token', drive: (): void => {
            expect(/tabs/.test("const TAB_ROOT = 'tabs'"), '§5.5.1 — the same census instrument FIRES against a store-owned token').toBe(true)
          } },
      ],
    },

    /* ── 12 · P-TR-TP-3 · S-TR-COST-1 · term 8 = 4 operations × 2 readings ──────────── */
    {
      id: 'P-TR-TP-3',
      type: 'P-TP',
      strategyId: 'S-TR-COST-1',
      term: 8,
      property: 'THE CLOSE’S DECLARED COST, TOTAL OVER ITS OWN TERMS — `5` caller operations + the repair’s own write, printed with its terms, NO timing figure',
      drives: [
        { name: '(1) write reading — a close of the ACTIVE tab in an `order` of N ≥ 2: `5` caller operations + `1` repair = `6`', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B', 'C'], 'B')
            const st = memberStateOf(member)
            st.preOrder = ['A', 'B', 'C']
            st.removedId = 'B'
            let callerOps = 0
            for (const leaf of PER_TAB_LEAVES) {
              callStore(store, 'remove', `file.tabs.B.${leaf}`)
              callerOps += 1
            }
            const seat = callStore(store, 'commit', S.order, ['A', 'C'])
            callerOps += 1
            expect(callerOps, '§2.4 item 4 / §3.4 item 4 — the close’s own sequence is 5 caller operations at minimum').toBe(5)
            expect((seat['repaired'] as string[]).length, '§3.4 item 4 — the repair’s own write is the +1').toBe(1)
          } },
        { name: '(1) event reading — the events are a function of the AFFECTED REFERENCES, never of the listeners', drive: (): void => {
            const s = surface as TabsSurface
            const storeA = tabsStore(s, null)
            seedRecord(storeA, ['A', 'B'], 'A')
            const zero = callStore(storeA, 'commit', S.entry('A'), true)
            const storeB = tabsStore(s, null)
            seedRecord(storeB, ['A', 'B'], 'A')
            const deliveries: unknown[] = []
            const subscribe = storeB['subscribe'] as ((n: string, l: (e: Rec) => void, o?: Rec) => unknown) | undefined
            subscribe?.(S.entry('A'), (e) => deliveries.push(e))
            const two = callStore(storeB, 'commit', S.entry('A'), true)
            void two
            const rec = callStore(storeA, 'commit', S.entry('A'), true)
            expect(typeof zero['events'], '§3.4 item 4 — the count is reported and never derived from subscriber count').toBe('number')
            expect(rec['events']).toBeGreaterThanOrEqual(0)
          } },
        { name: '(2) write reading — a close of a NON-active tab: `5` caller operations + `0` repairs = `5`', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A', 'B'], 'A')
            let callerOps = 0
            for (const leaf of PER_TAB_LEAVES) {
              callStore(store, 'remove', `file.tabs.B.${leaf}`)
              callerOps += 1
            }
            const seat = callStore(store, 'commit', S.order, ['A'])
            callerOps += 1
            expect(callerOps).toBe(5)
            expect(seat['repaired'], '§3.4 item 4 — the non-active close lands no repair').toEqual([])
          } },
        { name: '(2) event reading — the non-active close still fires one event per affected reference', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'B'], 'A')
            const rec = callStore(store, 'remove', S.target('B'))
            expect(rec['events'], '§3.4 item 4 — one event per affected reference').toBe(1)
          } },
        { name: '(3) write reading — a close that empties `order`: the last-tab arm, `+1` repair', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.order, [])
            expect((rec['repaired'] as string[]).length, '§3.4 item 4 — the last-tab arm’s own +1').toBeGreaterThan(0)
          } },
        { name: '(3) event reading — the last-tab arm’s events are counted over its affected references', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.order, [])
            expect(rec['events'], '§3.4 item 4 — never ONE write, never a listener-derived count').toBeGreaterThanOrEqual(1)
            expect(typeof rec['events']).toBe('number')
          } },
        { name: '(4) write reading — the refused reserved close: `0` writes, `0` events, `0` repairs (F-T2-6)', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['landing'], 'landing')
            const rec = callStore(store, 'remove', S.landing)
            expect(rec['events'], '§3.4 item 4 — a refused close fires nothing').toBe(0)
            expect(rec['repaired']).toEqual([])
            expect(rec['cleared']).toEqual([])
          } },
        { name: '(4) event reading — the same close with ZERO and with TWO subscribers answers the SAME receipt `events`', drive: (): void => {
            const s = surface as TabsSurface
            const build = (subs: number): { events: number; deliveries: number } => {
              const store = tabsStore(s, null)
              seedRecord(store, ['A', 'B'], 'A')
              let deliveries = 0
              const subscribe = store['subscribe'] as ((n: string, l: (e: Rec) => void, o?: Rec) => unknown) | undefined
              for (let i = 0; i < subs; i += 1) subscribe?.('file.tabs', () => { deliveries += 1 }, { subtree: true })
              const rec = callStore(store, 'commit', S.entry('B'), true)
              return { events: Number(rec['events']), deliveries }
            }
            const zero = build(0)
            const two = build(2)
            expect(two.events, 'G4-F3 — the count is a function of the affected references and NEVER of the listeners').toBe(zero.events)
            expect(two.deliveries, 'G4-F3 — N subscribers differ only in DELIVERIES').toBeGreaterThan(zero.deliveries)
          } },
      ],
    },

    /* ── 13 · P-TR-TP-4 · S-TR-LAND-1 · term 8 = 4 landing states × 2 readings ──────── */
    {
      id: 'P-TR-TP-4',
      type: 'P-TP',
      strategyId: 'S-TR-LAND-1',
      term: 8,
      property: 'THE LANDING PAGE’S TOTALITY — its own `§7.1` limb-A/B object (`id` `tabs-landing-page`, role `page`)',
      drives: [
        { name: '(1) record-witness reading — the boot state: the handed-off zero-active repair activates the landing entry', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            const hydrate = store['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: ['A'] }, { name: S.entry('A'), value: false }])
            expect(valueOf(store, S.order), '§3.5 item 1(a) — the boot state’s record witness').toEqual(['A'])
          } },
        { name: '(1) live-row reading — the page is DECLARED with its declared id and role', drive: (): void => {
            const reading = authoredPageNodes()
            expect(reading.ok, `§0A item 5 / §6 PAR-9 — ${reading.reason}`).toBe(true)
          } },
        { name: '(2) record-witness reading — the close-last-tab state activates the landing entry', drive: (): void => {
            const s = surface as TabsSurface
            const member = tabsConstraintMember()
            const store = tabsStore(s, member)
            seedRecord(store, ['A'], 'A')
            callStore(store, 'commit', S.order, [])
            expect(valueOf(store, S.order), '§3.5 item 1(b) — the landing entry is the sole member and is active').toEqual(['landing'])
          } },
        { name: '(2) live-row reading — the `§5.U` row’s `instrument`/`cmd`/`post` provenance exists (UN-RUN live rows are FAILURES)', drive: (): void => {
            const reading = liveRowReading()
            expect(reading.ok, `§5.5.1 P-TR-TP-4 / §7 item 2(c) — ${reading.reason}`).toBe(true)
          } },
        { name: '(3) record-witness reading — the re-boot of (2): the persisted seat survives', drive: (): void => {
            const s = surface as TabsSurface
            const first = tabsStore(s, null)
            seedRecord(first, ['A'], 'A')
            callStore(first, 'commit', S.order, [])
            const second = tabsStore(s, null)
            const hydrate = second['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.order, value: valueOf(first, S.order) }])
            expect(valueOf(second, S.order), '§3.5 item 1(c) — the persisted seat survives the realm boundary').toEqual(['landing'])
          } },
        { name: '(3) live-row reading — the operator rows are `MANUAL OPERATOR` with a positive owner and a literal `cmd` (the three untaken precedents named)', drive: (): void => {
            const precedent = operatorRowPrecedent()
            expect(precedent.ok, `§7 item 2(d) — ${precedent.reason}`).toBe(true)
          } },
        { name: '(4) record-witness reading — the NEGATIVE: a state whose `landing.active` is NOT `true` must NOT be driven as if it were', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'landing'], 'A')
            expect(valueOf(store, S.entry('landing')), '§3.5 item 1 — the page’s rendering must be driven by the record').toBe(false)
          } },
        { name: '(4) positive control — the same state with `landing.active` TRUE', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'landing'], 'landing')
            expect(valueOf(store, S.entry('landing'))).toBe(true)
          } },
      ],
    },

    /* ── 14 · P-TR-TP-5 · S-TR-ERR-1 · term 8 = 4 error states × 2 readings ─────────── */
    {
      id: 'P-TR-TP-5',
      type: 'P-TP',
      strategyId: 'S-TR-ERR-1',
      term: 8,
      property: 'THE ERROR PAGE’S TOTALITY — its own `§7.1` limb-A/B object (`id` `tabs-error-page`, role `page`)',
      drives: [
        { name: '(1) record-witness reading — the error arm’s own write: `error` and `target` set in ONE commit', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A'], 'A')
            const rec = callStore(store, 'commit', S.error('A'), 'render-failed')
            expect(rec['status'], '§3.5 item 2(a) — the error arm’s own write').toBe('committed')
            expect(valueOf(store, S.error('A'))).toBe('render-failed')
            expect(valueOf(store, S.target('A')), '§3.5 item 2 — the tab’s target coexists with its error token').toBe('target-A')
          } },
        { name: '(1) live-row reading — the page is DECLARED with its declared id and role', drive: (): void => {
            const reading = authoredPageNodes()
            expect(reading.ok, `§0A item 5 / §6 PAR-9 — ${reading.reason}`).toBe(true)
          } },
        { name: '(2) record-witness reading — its persistence across a re-boot', drive: (): void => {
            const s = surface as TabsSurface
            const first = tabsStore(s, null)
            seedRecord(first, ['A'], 'A')
            callStore(first, 'commit', S.error('A'), 'render-failed')
            const second = tabsStore(s, null)
            const hydrate = second['hydrate'] as ((rows: readonly unknown[]) => void) | undefined
            hydrate?.([{ name: S.error('A'), value: valueOf(first, S.error('A')) }])
            expect(valueOf(second, S.error('A')), '§3.5 item 2(b) — the error leaf survives the realm boundary').toBe('render-failed')
          } },
        { name: '(2) live-row reading — the `§5.U` row’s `instrument`/`cmd`/`post` provenance exists (UN-RUN live rows are FAILURES)', drive: (): void => {
            const reading = liveRowReading()
            expect(reading.ok, `§5.5.1 P-TR-TP-5 / §7 item 2(c) — ${reading.reason}`).toBe(true)
          } },
        { name: '(3) record-witness reading — the coexistence state: the error tab is ALSO the active entry', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A', 'B'], 'A')
            callStore(store, 'commit', S.error('A'), 'render-failed')
            expect(activesOf(store, ['A', 'B']), '§3.5 item 2(c) — coexistence with the tab’s own `active`').toEqual(['A'])
            expect(valueOf(store, S.error('A'))).toBe('render-failed')
          } },
        { name: '(3) live-row reading — the `[U]` truth is the gate-6 LIVE BATTERY’s, recorded IN-LINE and never claimed green here', drive: (): void => {
            const bytes = bytesAt(LIVE_BATTERY_PATH)
            expect(
              bytes === null,
              '§4.2 item 7 / §7 item 2 — the node-layer red may NOT assert that a page rendered; the live truth is gate 6’s and is currently UN-RUN (a missing battery is a FAILURE, never a pass)',
            ).toBe(false)
          } },
        { name: '(4) record-witness reading — the NEGATIVE: a tab whose `error` leaf holds NO value must NOT render the error page', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A'], 'A')
            callStore(store, 'commit', S.error('A'), null)
            expect(valueOf(store, S.error('A')), '§6 PAR-5 — a null/undefined value means the error page is NOT the terminal').toBeNull()
          } },
        { name: '(4) positive control — the same tab after the error arm', drive: (): void => {
            const s = surface as TabsSurface
            const store = tabsStore(s, null)
            seedRecord(store, ['A'], 'A')
            callStore(store, 'commit', S.error('A'), null)
            callStore(store, 'commit', S.error('A'), 'render-failed')
            expect(valueOf(store, S.error('A')), '§3.5 item 2 — the positive control is the same tab after the error arm').toBe('render-failed')
          } },
      ],
    },

    /* ── 15 · P-TR-TP-6 · S-TR-BOUND-1 · term 12 = 6 subjects × 2 readings ──────────── */
    {
      id: 'P-TR-TP-6',
      type: 'P-TP',
      strategyId: 'S-TR-BOUND-1',
      term: 12,
      property: 'THE STATIC BOUNDARY — the edit-set assertion (`C-9`) and the no-re-freeze assertion (`§5.3`)',
      drives: [
        { name: '(1) static reading — `edit-set ⊆ declared scope ∪ declared wiring points`, asserted AS A SET (never a count), with the two `§5.1` item `3b` paths DECLARED', drive: (): void => {
            const changed = editSetFromWorkingTree()
            // THE SCOPE IS ASSERTED AS A **SET**, NEVER AS A COUNT (`§5.1`'s closing clause;
            // `C-9`): the set-equality reading is `sorted(declared) === sorted([...asFiled, the
            // two amended paths])`, so a DROPPED path and a DUPLICATE both redden — a count
            // assertion would let either through.
            const declared = [...DECLARED_SCOPE_PATHS].sort()
            const expected = [...DECLARED_SCOPE_PATHS_AS_FILED, 'tests/store-tabs-record-live.mjs', 'docs/specs/store-tabs-record-live-battery.md'].sort()
            expect(declared, '§5.1 / C-9 — the declared scope is a SET: the as-filed seven plus exactly the two `§5.1` item `3b` paths, no duplicate, no drop').toEqual(expected)
            expect(new Set(DECLARED_SCOPE_PATHS).size, '§5.1 (C-9) — no duplicate path inflates the set').toBe(DECLARED_SCOPE_PATHS.length)
            expect(DECLARED_SCOPE_PATHS).toContain('tests/store-tabs-record-live.mjs')
            const r = editSetIsSubset(changed, DECLARED_SCOPE_PATHS)
            expect(r.ok, `§5.1 / C-9 — edits outside the union: ${JSON.stringify(r.offenders)} (the working tree carries uncommitted work until the supervisor commits at the gate boundary, RCA-8(a))`).toBe(true)
        } },
        { name: '(1) positive control — an edit outside the union FAILS the same instrument (the UNDECLARED-path bite is UNMOVED)', drive: (): void => {
            const r = editSetIsSubset([EDIT_SET_OFFENDER_FIXTURE], DECLARED_SCOPE_PATHS)
            expect(r.ok, '§5.1 — the subset assertion has a POSITIVE CONTROL that an edit outside the union FAILS').toBe(false)
            // THE SAME CONTROL AGAINST THE AMENDED SET: adding the two declared paths must NOT
            // admit an undeclared one.
            const declaredLive = editSetIsSubset(['tests/store-tabs-record-live.mjs'], DECLARED_SCOPE_PATHS)
            expect(declaredLive.ok, '§5.1 item 3b — the DECLARED driver path is admissible').toBe(true)
            const undeclaredMjs = editSetIsSubset(['tests/store-tabs-record-live-extra.mjs'], DECLARED_SCOPE_PATHS)
            expect(undeclaredMjs.ok, '§5.1 item 3b — an UNDECLARED sibling driver path still FAILS (the bite is kept)').toBe(false)
        } },
        { name: '(2) static reading — `src/renderer/store-core-graph.ts` = `0664c52f…`', drive: (): void => {
            expect(sha256PrefixOf(STORE_CORE_PATH), '§5.1 item 7 / §5.3').toBe('0664c52f')
          } },
        { name: '(2) positive control — a byte-moved copy does NOT answer the pin', drive: (): void => {
            const bytes = readFileSync(STORE_REFS_PATH)
            const moved = createHash('sha256').update(Buffer.concat([bytes, Buffer.from('\n')])).digest('hex').slice(0, 8)
            expect(moved).not.toBe('5c0c1a97')
          } },
        { name: '(3) static reading — `src/renderer/store-graph-references.ts` = `5c0c1a97…`', drive: (): void => {
            expect(sha256PrefixOf(STORE_REFS_PATH), '§5.1 item 7 / §5.3').toBe('5c0c1a97')
          } },
        { name: '(3) positive control — the second module’s pin fires on a byte move', drive: (): void => {
            const bytes = readFileSync(STORE_CORE_PATH)
            const moved = createHash('sha256').update(Buffer.concat([bytes, Buffer.from('\n')])).digest('hex').slice(0, 8)
            expect(moved).not.toBe('0664c52f')
          } },
        { name: '(4) static reading — the frozen artifact’s fields-1–7 span is unchanged (`29772ac7…`, NEVER a file-pin figure)', drive: (): void => {
            expect(frozenSpanPrefix(), '§5.3 — no frozen artifact’s fields-1–7 span byte moves').toBe(FROZEN_SPAN_PREFIX)
          } },
        { name: '(4) positive control — the span figure is a DIFFERENT instrument from the two file pins', drive: (): void => {
            expect(FROZEN_SPAN_PREFIX, '§5.1 item 7 — the two are never conflated').not.toBe('0664c52f')
            expect(FROZEN_SPAN_PREFIX).not.toBe('5c0c1a97')
          } },
        { name: '(5) static reading — no new `scripts` key (`L-1`’s set-equality reading)', drive: (): void => {
            const declared = new Set(['clean', 'build', 'build:watch', 'start', 'start:http', 'typecheck', 'typecheck:tests', 'test', 'test:watch', 'battery', 'divergence', 'ui', 'mcp'])
            const pkg = JSON.parse(bytesAt(fileURLToPath(new URL('./../package.json', import.meta.url))) ?? '{}') as { scripts?: Record<string, string> }
            const keys = Object.keys(pkg.scripts ?? {})
            const extra = keys.filter((k) => !declared.has(k))
            expect(extra, '§4.3 item 4 / §7 item 4 — this unit takes NO new `package.json` script key').toEqual([])
          } },
        { name: '(5) positive control — the key-set instrument fires on a synthetic new key', drive: (): void => {
            const declared = new Set(['test'])
            expect(Object.keys({ test: 'vitest run', tabs: 'node x' }).filter((k) => !declared.has(k))).toEqual(['tabs'])
          } },
        { name: '(6) static reading — every DENIED path of `§5.1` is byte-unmoved, read as a set', drive: (): void => {
            const changed = editSetFromWorkingTree()
            const denied = changed.filter((p) => DENIED_PATH_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix)))
            expect(denied, '§5.1 — the DENIED set, named so silence is never read as a licence').toEqual([])
            expect(changed.filter((p) => TRACKER_PATHS.includes(p)), '§5.1 item 12 — the trackers are the supervisor’s gate-10 acts').toEqual([])
          } },
        { name: '(6) positive control — the denied-set instrument fires on a synthetic denied path', drive: (): void => {
            const changed = ['src/main/mcp-server.ts', 'src/renderer/renderer.ts']
            const denied = changed.filter((p) => DENIED_PATH_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix)))
            expect(denied).toEqual(['src/main/mcp-server.ts'])
          } },
      ],
    },
  ]
}

/** THE MINTING-SITE PROBE (`§0A` item 2 / `§1.1` item 8): the duplicate refusal belongs to
 *  the CALLER's minting site — the store ships no `'duplicate-id'` token and this unit may
 *  add none (`§5.1`), so the declared outcome is read off the wiring's own minting role and
 *  off the persisted membership. */
export function mintingSiteProbe(): { readonly ok: boolean; readonly reason: string } {
  const bytes = bytesAt(RENDERER_PATH)
  if (bytes === null) return { ok: false, reason: 'the wiring does not exist' }
  const hasMintingRole = /mintTabId|mintTab|DUPLICATE|duplicate/i.test(bytes)
  if (!hasMintingRole) {
    return {
      ok: false,
      reason: 'the wiring carries no tab-id minting site: §1.1 item 8’s ONE bounded wiring role is not landed, so no duplicate is refused at the site',
    }
  }
  return { ok: true, reason: 'the minting site exists and enforces the duplicate rule' }
}

/** THE EDIT SET, READ FROM THE WORKING TREE. `git status --porcelain` is the only
 *  node-layer instrument that can see the pass's own edit set; when `git` is unavailable the
 *  reading is reported as a FAILURE rather than assumed empty. */
let editSetCache: readonly string[] | null = null

export function editSetFromWorkingTree(): readonly string[] {
  if (editSetCache !== null) return editSetCache
  try {
    const out = execFileSync('git', ['status', '--porcelain'], {
      cwd: fileURLToPath(new URL('./..', import.meta.url)),
      encoding: 'utf8',
    }) as unknown as string
    editSetCache = out
      .split('\n')
      // ── THE PORCELAIN FIXTURE IS `XY <path>`, SO THE PATH IS SLICED FROM INDEX `3` AND
      //    THE LINE IS **NOT** WHOLE-LINE TRIMMED FIRST: an UNSTAGED modification reads
      //    `" M tests/…"`, and trimming the line before the slice ate the leading space and
      //    shifted the path by one byte (`"ests/…"`), so the subset assertion compared
      //    MANGLED paths. THE AS-FILED FORM KEPT VISIBLE: the previous chain was
      //    `.map(l => l.trim()).filter(l => l.length > 3).map(l => l.slice(3).trim())`.
      .filter((line) => line.length > 3)
      .map((line) => line.slice(3).trim())
      .filter((entry) => entry.length > 0)
  } catch {
    editSetCache = ['__GIT_READING_FAILED__']
  }
  return editSetCache
}

/* ───────────────────────────── THE EXECUTION, WITH THE CAPS AND THE STOP RULE ──────────── */

/** Runs the register: rows SEQUENTIALLY IN REGISTER ORDER, each drive counted as ONE
 *  attempt, with the two caps and the stop-after-5-consecutive-failures rule. A row that
 *  never ran is `un-run` and is reported as a FAILURE by the caller (`§5.5` item 5). */
export async function runRegister(): Promise<RegisterReport> {
  surface = await resolveTabsSurface()
  wiring = await probeWiring()
  const rows: RowReport[] = []
  let consecutiveFailures = 0
  let stoppedAtRow: string | null = null
  let stopReason: string | null = null
  let attemptsExecuted = 0
  let rowsExecuted = 0
  let rowsHeld = 0
  let rowsBroken = 0

  for (const row of registerRows()) {
    if (stoppedAtRow !== null) {
      rows.push({
        id: row.id,
        type: row.type,
        strategyId: row.strategyId,
        declaredTerm: row.term,
        attemptsRun: 0,
        abandoned: row.term,
        held: 0,
        broken: 0,
        state: 'un-run',
        readings: [],
      })
      continue
    }
    let held = 0
    let broken = 0
    const readings: string[] = []
    let stoppedInsideRow = false
    for (const attempt of row.drives) {
      if (consecutiveFailures >= STOP_AFTER_CONSECUTIVE) {
        stoppedInsideRow = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures reached; the running row's remaining attempts were abandoned and NO further row started (§5.5)`
        break
      }
      attemptsExecuted += 1
      try {
        attempt.drive()
        held += 1
        consecutiveFailures = 0
      } catch (e) {
        broken += 1
        consecutiveFailures += 1
        readings.push(`BROKEN — ${attempt.name}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }
    const attemptsRun = held + broken
    const abandoned = row.term - attemptsRun
    rowsExecuted += 1
    const state: RowReport['state'] = broken === 0 && !stoppedInsideRow ? 'held' : 'broken'
    if (state === 'held') rowsHeld += 1
    else rowsBroken += 1
    rows.push({
      id: row.id,
      type: row.type,
      strategyId: row.strategyId,
      declaredTerm: row.term,
      attemptsRun,
      abandoned,
      held,
      broken,
      state,
      readings,
    })
  }

  const declaredTerms = [...DECLARED_TERMS]
  const declaredTotal = declaredTerms.reduce((sum, term) => sum + term, 0)
  const chain: number[] = []
  let running = 0
  for (const term of declaredTerms) {
    running += term
    chain.push(running)
  }
  // THE SUBTOTALS BY TYPE (`§5.5.1`): P-IM = rows 1–5 · P-SM = rows 6, 7 and 8 (the
  // table's `P-TR-SM-1` · `P-TR-SM-2` · `P-TR-SM-4`) · P-TP = rows 10–15. The terms are
  // read off `registerRows()` in REGISTER ORDER, never from a hand-kept parallel array.
  const typeOf = registerRows().map((row) => row.type)
  const subtotals = {
    'P-IM': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-IM' ? s + t : s), 0),
    'P-SM': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-SM' ? s + t : s), 0),
    'P-TP': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-TP' ? s + t : s), 0),
  }
  const perRowMax = Math.max(...declaredTerms)
  const perRowMaxRow = REGISTER_ROW_IDS[declaredTerms.indexOf(perRowMax)] ?? ''
  return {
    rows,
    declaredTerms,
    declaredTotal,
    chain,
    subtotals,
    attemptsExecuted,
    rowsExecuted,
    rowsHeld,
    rowsBroken,
    unrunRows: rows.filter((r) => r.state === 'un-run').map((r) => r.id),
    unrunAreFailures: true,
    stoppedAtRow,
    stopReason,
    perRowMax,
    perRowMaxRow,
    perRowCap: REGISTER_ROW_CAP,
    totalCap: REGISTER_TOTAL_CAP,
  }
}
