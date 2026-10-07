// tests/tier4-arbitrary-storage-register.ts — THE `§5.5.1` TYPED PROPERTY REGISTER
// of `U-TIER4-ARBITRARY-STORAGE` (ledger row `S2`, wave `S`), the store-local
// arbitrary-storage opening + the four gating clauses.
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts`
// only), so it is never collected as a suite. It carries the register's TYPED ROWS
// and the harness that EXECUTES them; `tests/tier4-arbitrary-storage.test.ts` imports
// both, so the register rides the SAME node suite (`npm test`, `§5.2` leg 1).
// Precedents: `tests/secure-exclusion-register.ts` (the dynamic-load harness) and
// `tests/store-security.test.ts` (the inline register).
//
// CONTRACT (the only authority): `docs/specs/tier4-arbitrary-storage.md`
//   `§5.5.1`  — THE TABLE: `10` typed rows (`5` `P-T4-IM` + `1` `P-T4-SM` + `4` `P-T4-TP`),
//               `10` strategy ids (`S-T4-*`), the declared total
//               `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8`, subtotals
//               `P-IM 46 (12+8+10+8+8) · P-SM 10 · P-TP 52 (12+10+14+16)`.
//   `§5.5.1`  — the caps: `<=100` attempts per row · `<=400` in total ·
//               STOP AFTER 5 CONSECUTIVE FAILURES; an UN-RUN row is a FAILURE.
//   `§5.5.2`  — the honesty block: every strategy is a CLOSED, exhaustively enumerated
//               input set; no row takes a draw; no new dependency.
//   `§5.2` item 6 — the `§7.1` predicate TRIGGERS (limbs A + B PRESENT), so gate 6 is a
//               MANDATORY live battery — the `[U]` matrix is NOT driven here (this file
//               is the `[T]` layer; `§5.2` item 6's U-subjects are CITED, never re-derived).
//   `§1.4` item 3 — no timing figure is claimed anywhere: every drive asserts ORDER
//               and OUTCOME, never duration.
//
// THE MODULE'S ABSENCE IS DATA, NOT AN ERROR: this file never statically imports the
// production modules under test. It resolves `src/main/security-store.ts` the way the
// repo's other red harnesses do (`existsSync` + a fragment-assembled dynamic specifier),
// so an absent module makes each attempt a counted BROKEN attempt carrying its reason.
// A placeholder drive is a lie about coverage; every drive is the REAL assertion its
// row's property states and throws ONLY when the property is actually falsified.
//
// ⟶ ANNOTATED BESIDE 2026-10-11 (THE `S2` RED PASS — `RCA-8(d)` ANNOTATE-BESIDE):
// **THIS REGISTER IS AUTHORED AT THE `§5.5.1` AS-FILED FIGURES AND ITS EXECUTED TERMS
// ARE `108`, UNMOVED.** No term, row, strategy id or cap is re-grained by the red pass;
// the red is REPORTED (per-row `held`/`broken`), never smoothed.
//
// ⟶ RE-GRAINED `2026-10-11` (THE GATE-6 `F-1` **EVASION** RULING — `AGENTS.md` item 11(f): *"a
// property the live layer could FALSIFY while this register read `broken === 0` is a measured
// EVASION … so the term is ADDED, never merged away, and the row's count is an OUTCOME, not a
// budget"*; `RCA-8(d)`: **annotate BESIDE, never over** — every byte of the contract block above
// STANDS, and the as-filed `108` and the gate-4 `112` forms stand below, each under its own dated
// note). **THE REGISTER'S OPERATIVE DECLARED TOTAL IS NOW
// `113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`**, with `P-IM 47 = 12 + 8 + 11 + 8 + 8` ·
// `P-SM 10` · `P-TP 56 = 12 + 10 + 14 + 20`, and `47 + 10 + 56 = 113`; chain
// `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113`; caps: largest row `20 ≤ 100` · total
// `113 ≤ 400`; an un-run row is still reported as a FAILURE, never as a pass.
//
// **WHAT MOVED, AND WHY IT IS +1 AND NOT A MERGE (`§5.5.1` row 6 = `P-T4-IM-3`, strategy
// `S-T4-PANE-1`): THE AS-FILED TERM `10 = 2 (the `MCP:` segment · the toggle's `data-state`) ×
// 2 (states) = 4 + 6 (the six fabrications) STAYS PRINTED HERE, BESIDE THE RE-GRAINED `11`.**
// The added term is the **PRE-CARRIER FAMILY**: `(a)` no `window.provident.security` at all ·
// `(b)` a `get()` that REJECTS · `(c)` the FIRST-PAINT shape driven synchronously (a carrier
// read IN FLIGHT, `refreshDebug` in the same turn) · `(d)` a carrier answer OMITTING the
// `exclusion` member. **ITS CAUSE IS NAMED: `F-1`, THE GATE-6 LIVE FINDING**
// (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§5` `F-1` / its `§3` `U-1`, verdict
// `FAIL`). None of row 6's as-filed ten drives reads the PRE-CARRIER shape — `FABRICATION 2`
// drives the pane's own PRIOR state, `FABRICATION 4` the affordance substitution — so the
// register held `112/112` while the live first paint carried a `data-state: 'mcp-enabled'` the
// carrier had never supplied, the **INVERSE** of the carried state in the MCP-DISABLED document.
// **THAT IS THE EVASION THIS TERM CLOSES: the property was FALSIFIABLE and was not driven.**
//
// **WHERE THE TERM'S DRIVE LIVES, STATED SO NO LATER READER HAS TO INFER IT:** the as-filed ten
// drives of row 6 are built by `buildRegister()` in `tests/tier4-arbitrary-storage.test.ts`. This
// pass's edit set is THIS FILE ONLY, so the added term is carried as a **REGISTER-OWNED TERM**
// (`REGISTER_OWNED_TERMS` below) that `executeRegister` composes INTO the row **in-row** — the
// term is one attempt of row 6, not a new row and not a separate row's control — and the executor
// cross-checks `the row's own drives + its register-owned terms === the declared cell`
// (`DECLARED_TERMS`), so the two files' numbers cannot drift apart silently. **THE RELOCATION IS
// OWED AND NAMED:** when the sibling test file is free to be edited, the same drive belongs in
// row 6's own `drives` array beside its as-filed ten, and this table empties.
//
// ⟶ RELOCATED `2026-10-11` (THE OWED RELOCATION, LANDED — `RCA-8(d)`: the paragraph above STANDS,
// every byte of it, and this one is inserted BESIDE it, never over it). **THE DECLARED CELL AND THE
// DRIVE'S HOME ARE NOW ROW 6'S OWN:** `tests/tier4-arbitrary-storage.test.ts`'s `buildRegister()`
// declares `P-T4-IM-3 … term: 11` and its `drives` array carries ELEVEN entries — the as-filed ten,
// then `...preCarrierPaneDrives()` (THIS module's own drive builder, still live, still carrying the
// four controls `CTL-0` · `CTL-P` · `CTL-N` · `NV`). **THIS TABLE NOW STANDS EMPTY**
// (`REGISTER_OWNED_TERMS = []`): the executor composes nothing into any row and its cross-check
// binds `row.drives.length` DIRECTLY to `DECLARED_TERMS[i]`, so the two files' numbers still cannot
// drift apart silently. The arithmetic is UNMOVED by the relocation — `113 = 12 + 10 + 12 + 8 + 14
// + 11 + 10 + 20 + 8 + 8` · `P-IM 47` · `P-SM 10` · `P-TP 56` · `47 + 10 + 56 = 113` · chain
// `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113` — and BOTH as-filed forms stay printed,
// each under its own dated note, in `arithmeticForms()` below.
//
// **THE SHAPE TAKEN, NAMED (the supervisor's obligation 2, and WHY):** the TERM'S HOME — its
// declared cell and its count inside row 6's own strategy table — is RELOCATED; the DRIVE'S BUILDER
// stays in this module as a LIVE, SINGLE-CONSUMER factory invoked by that table (so the four
// controls above remain THIS harness's own, driven verbatim, and NO second, unexecuted copy of the
// drive exists — a dead instrument is exactly what `§3c`'s `S2-ADV-09` condemned for the stale pin).
// Deleting the builder instead would be a destructive edit this pass cannot commit (`RCA-8(b)`:
// commit before a destructive-capable operation; `RCA-8(c)`: a whole-file rewrite of a >200-line
// file is forbidden unless committed in the same pass), and re-writing its body inline in the test
// file would duplicate it. No row, term, strategy id or cap moves with the relocation.

import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

// ---- PATHS -----------------------------------------------------------------------------
const TESTS_DIR = new URL('./', import.meta.url)
const REPO = new URL('./../', TESTS_DIR)
export const SRC = (rel: string): string => fileURLToPath(new URL('./src/' + rel, REPO))
export const TEST = (rel: string): string => fileURLToPath(new URL('./' + rel, TESTS_DIR))

export const SECURITY_STORE_SRC = SRC('main/security-store.ts')
/** `§0A` item 1 (AMENDED `2026-10-11`, the architect's `A-1` ruling) — **THE STATIC HOLDER'S OWN
 *  MODULE**: the ONE main-side LEAF that holds the one boolean (`tier4OpenState()` /
 *  `setTier4OpenState()`), added to `§5.1` item 1's allowed edit set as its item (6). */
export const TIER4_STATE_SRC = SRC('main/tier4-state.ts')
export const MCP_SERVER_SRC = SRC('main/mcp-server.ts')
export const MAIN_SRC = SRC('main/main.ts')
export const PRELOAD_SRC = SRC('main/preload.ts')
export const SECURE_PANELS_SRC = SRC('renderer/secure-panels.ts')
export const STORE_CHANNELS_SRC = SRC('main/store-channels.ts')
export const STORE_CORE_SRC = SRC('renderer/store-core-graph.ts')
export const STORE_REFS_SRC = SRC('renderer/store-graph-references.ts')
export const SHARED_TYPES_SRC = SRC('shared/types.ts')

// ---- THE DECLARED TOKEN + MESSAGE (`§2.4` items 1/4) ------------------------------------
export const TIER4_CLOSED = 'tier4-closed'
export const TIER4_CLOSED_MESSAGE =
  'Tier-4 access is blocked because the MCP endpoint is open — disable MCP before reading or writing secured data.'
export const EXCLUSION_CLOSED = 'exclusion-closed'
export const STATE_MCP_ENABLED = 'mcp-enabled' as const
export const STATE_MCP_DISABLED = 'mcp-disabled' as const

// ---- THE DECLARED CENSUS TERMS (`§5.1` item 4) ------------------------------------------
export const DECLARED_SURFACE_MEMBERS: readonly string[] = ['get', 'lastWriteReceipt', 'readEntry', 'set', 'writeEntry']
export const LANDED_SURFACE_MEMBERS: readonly string[] = ['get', 'lastWriteReceipt', 'set']
/** ⟶ RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed constant asserted
 *  the SUPERSEDED clause). `§0A` item 1's `A-1` amendment, quoted: *"**`SecurityStoreOptions` IS
 *  UNMOVED AT `{ path: string }`** … the operative census is **`1 = 1 (path)`**, UNMOVED and owed
 *  by no amendment."* The DECLARED census is therefore `1`, identical to the landed one — the
 *  as-filed `2` (and the `1 → 2` movement it read) is WITHDRAWN, and `LANDED_OPTION_CENSUS` below
 *  keeps the landed figure it always carried. */
export const DECLARED_OPTION_CENSUS = 1
export const LANDED_OPTION_CENSUS = 1
export const DECLARED_CARRIER_MEMBERS: readonly string[] = ['exclusion', 'read']
export const LANDED_CARRIER_MEMBERS: readonly string[] = ['exclusion']

/** `§2.7` item 1's two measured frozen pins, PLUS the `S3`/`S1` pin chain's current term
 *  (`8ed09c97…`) which `§7b` row 1 says a FIFTH dated move re-points — the four earlier
 *  values stay awake and distinct in the test file's own `SECURITY_STORE_PIN` record. */
export const MEASURED_FROZEN_PINS: Readonly<Record<string, string>> = {
  'src/renderer/store-core-graph.ts': '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450',
  'src/renderer/store-graph-references.ts': '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
}
/** THE PIN CHAIN (`§2.7` item 5 / `§7b` row 1): `c7359530…` as-filed → `99618ac2…` `S3`'s green
 *  → `a98273b8…` `ADV-1` → `8ed09c97…` the `§2.6` write-lock amendment → **`fd242633…` the `A-1`
 *  STATIC-HOLDER landing (`19da51d`, `docs/specs/tier4-arbitrary-storage.md` `§10b` item 5's
 *  recorded digest)**. The red set keeps every term awake and distinct.
 *
 *  ⟶ ANNOTATED BESIDE `2026-10-11` (GATE 4's REPAIR CONTRACT, **D-x** — `RCA-8(d)`: annotate
 *  beside, never over). THE AS-FILED FORM OF THIS CELL WAS A **DEAD STALE PIN**: `SECURITY_STORE_PIN`
 *  read `8ed09c97358b…`, the FOURTH term, while the module's bytes had already moved to
 *  `fd2426339a41…` at `19da51d` — and the constant was **imported and read by NO ROW** of the red
 *  set, so nothing in this repo asserted it. D-x makes the pin LIVE: the operative term is
 *  re-pointed to the CURRENT bytes (`fd2426339a41…`, the FIFTH dated move) and `P-T4-PINS-FULL`
 *  in `tests/tier4-arbitrary-storage.test.ts` now asserts `sha256Of(SECURITY_STORE_SRC) ===
 *  SECURITY_STORE_PIN` at FULL 64-hex length. The as-filed fourth term stays VISIBLE in the chain
 *  and awake — it is never erased, and no term is rewritten to silence it.
 *  **THE FIFTH MOVE'S OWN CONSEQUENCE, STATED SO IT IS NOT READ AS A REGRESSION:** the repair
 *  pass on `src/main/security-store.ts` moves the digest AGAIN; `§7b` row 1 already owns that
 *  amendment cell, and the pin follows the artifact (a byte-pin that refused to follow an
 *  authorized move would be an instrument demanding an unauthorized rollback).
 *
 *  ⟶ RE-POINTED `2026-10-11` (THE GATE-4 REPAIR'S IMPLEMENTER PASS, `D-i`…`D-iv` — `RCA-8(a):
 *  ONE CAUSE, ONE LINE`). **THE PREDICTED MOVE ABOVE HAS HAPPENED, AND THE PIN FOLLOWS THE
 *  ARTIFACT.** `src/main/security-store.ts`'s bytes moved `fd2426339a41…` → **`39bfa51a578a…`**
 *  under the ruled repair the contract's `§3c.4` authorizes (the `-0` refusal — `D-i`; the
 *  null-prototype ingestion map — `D-ii`; the non-object record's corrupt arm — `D-iii`; the
 *  DECLARED `fs` construction input with its completeness test and its `fs.rmSync` cleanup —
 *  `D-iv`; `§5.1` item 1's allowed-edit-set item (1) names this very file). **THE AS-FILED FOURTH
 *  TERM (`8ed09c97…`) AND THE FIFTH (`fd242633…`) STAY AWAKE AND NAMED — the fifth is the term
 *  this re-point moves FROM — and the chain keeps its declared FIVE terms, distinct, with the
 *  operative one at its head position (the D-x row asserts exactly that shape).** No row, term,
 *  strategy id, cap or declared total moves with it. */
export const SECURITY_STORE_PIN_CHAIN: readonly string[] = [
  'c7359530', // as filed
  '99618ac2', // S3's green
  'a98273b8', // ADV-1
  '8ed09c97', // the §2.6 write-lock amendment (kept awake)
  '39bfa51a', // ⟶ the gate-4 REPAIR landing (D-i…D-iv); it moved FROM fd242633 (the A-1 static-holder landing, kept awake in the note above)
]
export const SECURITY_STORE_PIN = '39bfa51a578a1c56acc188199caf190957e1a52d770c5471a530c55c98410295'

// ---- THE REGISTER'S DECLARED NUMBERS (`§5.5.1`) -----------------------------------------
export const REGISTER_ROW_CAP = 100
export const REGISTER_TOTAL_CAP = 400
export const STOP_AFTER_CONSECUTIVE = 5

export const REGISTER_ROW_IDS: readonly string[] = [
  'P-T4-TP-1', 'P-T4-TP-2', 'P-T4-IM-1', 'P-T4-IM-2', 'P-T4-TP-3',
  'P-T4-IM-3', 'P-T4-SM-1', 'P-T4-TP-4', 'P-T4-IM-4', 'P-T4-IM-5',
]
/** THE DECLARED TERMS (`§5.5.1`), WITH THEIR DATED MOVE.
 *
 *  **AS FILED (`§5.5.1`): `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8`** — the as-filed
 *  row 8 (`P-T4-TP-4`) declared `16 = 4 (the four surface arms) × 2 (states) = 8 + 8 (the eight
 *  value classes the write admission REFUSES)`.
 *
 *  ⟶ ANNOTATED BESIDE `2026-10-11` (GATE 4's REPAIR CONTRACT, the row-8 re-grain —
 *  `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`: a mis-sum is corrected by annotating BESIDE the
 *  as-filed form, never by silently rewriting it): **row 8 GAINS FOUR TERMS**, each the drive of
 *  an assertion the repair contract names —
 *  `+ 1` THE NAMESPACE SEAM (`writeEntry('token', …)` / `writeEntry('entries', …)` leave the file's
 *  top-level `token`/`enabled`/`maxJournalLength` UNMOVED and round-trip under their own names) ·
 *  `+ 1` THE `__proto__` KEY (D-ii: preserved VERBATIM at boot, on write, in the bytes, and across
 *  a RE-CONSTRUCTED store) · `+ 1` THE `-0` VALUE (D-i: REFUSED whole-request, `0` still commits) ·
 *  `+ 1` AN OUT-OF-INGESTION-DOMAIN NAME SURVIVING EVERY WRITE (`§2.2` item 4 arm 3's residue).
 *  **SO THE OPERATIVE TERM IS `108 + 4 = 112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8`**,
 *  with row 8 = `20 = 16 (the as-filed four arms × two states + the eight value classes) + 4 (the
 *  four added terms above)`; the subtotals move `P-TP 52 → 56` and `P-IM 46` / `P-SM 10` are
 *  UNMOVED, so `46 + 10 + 56 = 112`. **NO term is dropped, no row is merged and the `≤8` figure
 *  stays a SIGNAL, never a ceiling.**
 *
 *  ⟶ RE-GRAINED BESIDE `2026-10-11` (THE GATE-6 `F-1` EVASION RULING — the row-6 PRE-CARRIER
 *  term; `RCA-8(d)`: neither form above is overwritten, and BOTH keep their own dated note in
 *  `DECLARED_TERMS_AS_FILED` / `DECLARED_TERMS_ROW8_REGRAIN` below): **ROW 6 (`P-T4-IM-3`,
 *  `S-T4-PANE-1`) GAINS ONE TERM — `10 → 11`, the PRE-CARRIER FAMILY, whose as-filed form
 *  `10 = 2 × 2 + 6` stays printed above and in the row's own table.** Cause, named: **`F-1`, the
 *  gate-6 live finding** — the toggle node carried the AUTHORED envelope literal
 *  `props['data-state'] = 'mcp-enabled'` before any carrier answer, so the register's `112/112`
 *  stood while the live layer FALSIFIED the property. **SO THE OPERATIVE TERM IS
 *  `112 + 1 = 113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`**, with row 6 =
 *  `11 = 10 (as filed: 4 + 6) + [1] (the PRE-CARRIER family)`; the subtotals move
 *  `P-IM 46 → 47 (12 + 8 + 11 + 8 + 8)` while `P-SM 10` and `P-TP 56` are UNMOVED, so
 *  `47 + 10 + 56 = 113`; the chain is `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113`; the
 *  caps are `largest row 20 ≤ 100` and `113 ≤ 400`. **NO term is dropped, no row is merged and
 *  the `≤8` figure stays a SIGNAL, never a ceiling.** */

/** THE AS-FILED FORM (`§5.5.1`, the spec-gate filing of `2026-10-11`) — **KEPT AWAKE AND
 *  DISTINCT, NEVER SILENTLY REWRITTEN.** Its own dated note, its own arithmetic, and it is
 *  printed BESIDE the operative form on every register run (`registerReportLines`):
 *  `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8` · `P-IM 46 = 12 + 8 + 10 + 8 + 8` ·
 *  `P-SM 10` · `P-TP 52 = 12 + 10 + 14 + 16` · `46 + 10 + 52 = 108`. */
export const DECLARED_TERMS_AS_FILED: readonly number[] = [12, 10, 12, 8, 14, 10, 10, 16, 8, 8]
/** THE GATE-4 FORM (`2026-10-11`, the row-8 re-grain — `D-i`…`D-iv`'s four added terms at row 8)
 *  — **KEPT AWAKE AND DISTINCT** beside the as-filed form it moved from and beside the operative
 *  form that moved from IT: `112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8` · `P-IM 46` ·
 *  `P-SM 10` · `P-TP 56 = 12 + 10 + 14 + 20` · `46 + 10 + 56 = 112`. */
export const DECLARED_TERMS_ROW8_REGRAIN: readonly number[] = [12, 10, 12, 8, 14, 10, 10, 20, 8, 8]
/** THE OPERATIVE FORM (`2026-10-11`, the gate-6 `F-1` re-grain): row 6 gains the PRE-CARRIER
 *  family — **`113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`**. */
export const DECLARED_TERMS: readonly number[] = [12, 10, 12, 8, 14, 11, 10, 20, 8, 8]

/** ONE DATED ARITHMETIC FORM of the register — every figure DERIVED from its own term list
 *  (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`: a total is never quoted without its terms, and
 *  a mis-sum is corrected by annotating BESIDE the as-filed form). */
export interface ArithmeticForm {
  readonly name: string
  readonly dated: string
  readonly cause: string
  readonly terms: readonly number[]
  readonly sum: number
  readonly chain: string
  readonly subtotals: { im: number; sm: number; tp: number }
  readonly largestRow: number
  readonly operative: boolean
}
export function arithmeticFormOf(
  name: string, dated: string, cause: string, terms: readonly number[], operative: boolean,
): ArithmeticForm {
  let running = 0
  const chain = terms.map((t) => (running += t)).join(' → ')
  const byType = (type: 'P-IM' | 'P-SM' | 'P-TP'): number =>
    terms.reduce((s, t, i) => (DECLARED_TYPES[i] === type ? s + t : s), 0)
  return {
    name, dated, cause, terms, sum: running, chain, operative,
    subtotals: { im: byType('P-IM'), sm: byType('P-SM'), tp: byType('P-TP') },
    largestRow: terms.length === 0 ? 0 : Math.max(...terms),
  }
}
/** THE THREE DATED FORMS, each printed WITH its terms, its chain, its subtotals and its caps. */
export function arithmeticForms(): readonly ArithmeticForm[] {
  return [
    arithmeticFormOf(
      'AS FILED (§5.5.1 — the spec-gate filing)', '2026-10-11',
      'row 8 (`P-T4-TP-4`) declared 16 = 4 × 2 + 8',
      DECLARED_TERMS_AS_FILED, false,
    ),
    arithmeticFormOf(
      'RE-GRAINED (gate-4 repair contract — the row-8 re-grain)', '2026-10-11',
      'row 8 gains `+ 1` × 4 (the namespace seam · `__proto__` · `-0` · the out-of-ingestion-domain name)',
      DECLARED_TERMS_ROW8_REGRAIN, false,
    ),
    arithmeticFormOf(
      'RE-GRAINED (gate-6 `F-1` EVASION RULING — the row-6 PRE-CARRIER term, OPERATIVE)', '2026-10-11',
      '`F-1`: row 6 (`P-T4-IM-3`, `S-T4-PANE-1`) gains the PRE-CARRIER family — 10 → 11',
      DECLARED_TERMS, true,
    ),
  ]
}
export const STRATEGY_IDS: readonly string[] = [
  'S-T4-WGATE-1', 'S-T4-RGATE-1', 'S-T4-PAIR-1', 'S-T4-STATE-1', 'S-T4-VOCAB-1',
  'S-T4-PANE-1', 'S-T4-BOOT-1', 'S-T4-OPEN-1', 'S-T4-HOME-1', 'S-T4-CARRIER-1',
]
export const DECLARED_TYPES: readonly ('P-IM' | 'P-SM' | 'P-TP')[] = [
  'P-TP', 'P-TP', 'P-IM', 'P-IM', 'P-TP', 'P-IM', 'P-SM', 'P-TP', 'P-IM', 'P-IM',
]
export const BOUNDED_ROWS: readonly string[] = []

export function declaredTotalReport(): { terms: readonly number[]; sum: number; chain: string } {
  let running = 0
  const chain = DECLARED_TERMS.map((t) => (running += t)).join(' → ')
  return { terms: DECLARED_TERMS, sum: running, chain }
}

// ---- THE DYNAMIC MODULE RESOLUTION ------------------------------------------------------
export function sourceOf(path: string): string {
  return readFileSync(path, 'utf8')
}
export function sourceOrEmpty(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}
export function sha256Of(path: string): string {
  return existsSync(path) ? createHash('sha256').update(readFileSync(path)).digest('hex') : 'ABSENT'
}
export function exists(path: string): boolean {
  return existsSync(path)
}

/** The declared reason vocabulary, extracted from the MODULE's own receipt type bytes
 *  (`§2.1` item 7: exactly two tokens). Reads the `SecurityWriteReceipt` line only, so the
 *  new sibling form cannot leak into the reading. */
export function declaredReasonTokens(): string[] {
  const src = sourceOrEmpty(SECURITY_STORE_SRC)
  const line = /export type SecurityWriteReceipt\s*=\s*([^\n]+)/.exec(src)?.[1] ?? ''
  return [...line.matchAll(/reason:\s*'([^']+)'/g)].map((m) => m[1])
}

export interface StoreModule {
  createSecurityStore: (opts: unknown) => unknown
}

/** Resolve `src/main/security-store.ts`'s factory. The specifier is FRAGMENT-ASSEMBLED so
 *  no static import exists for tsc to resolve (the `-mend` precedent), and an absent module
 *  answers a reason string rather than throwing at collection time. */
export async function loadStoreModule(): Promise<{ module: StoreModule | null; reason: string }> {
  if (!exists(SECURITY_STORE_SRC)) return { module: null, reason: `ABSENT: ${SECURITY_STORE_SRC}` }
  try {
    const spec = ['..', 'src', 'main', 'security-store.js'].join('/')
    const mod = (await import(/* @vite-ignore */ spec)) as Partial<StoreModule>
    if (typeof mod.createSecurityStore !== 'function') {
      return { module: null, reason: 'ABSENT: the module exports no `createSecurityStore`' }
    }
    return { module: mod as StoreModule, reason: '' }
  } catch (e) {
    return { module: null, reason: `ABSENT: ${e instanceof Error ? e.message : String(e)}` }
  }
}

// ---- THE REGISTER'S ROW / REPORT TYPES ---------------------------------------------------
export interface Drive {
  readonly label: string
  readonly run: () => void | Promise<void>
}
export interface RegisterRow {
  readonly id: string
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  /** The DECLARED TERM: a DRIVE COUNT (`§5.5.1`'s own attempt cell). */
  readonly term: number
  readonly property: string
  readonly drives: readonly Drive[]
}
export interface RowReport {
  readonly id: string
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  /** The row's declared term AS FILED (the row object's own `term`, carried by the row's own
   *  `drives`), PLUS `harnessOwnedTerm` below when a register-owned term is composed in. */
  readonly declaredTerm: number
  /** THE REGISTER-OWNED TERM COUNT composed into this row (`2026-10-11`, the gate-6 `F-1`
   *  re-grain): `0` for every row but `P-T4-IM-3`, whose declared cell is its as-filed `10` PLUS
   *  `1` register-owned attempt. Recorded so `declared 11` is never misread as eleven as-filed
   *  drives.
   *  ⟶ RELOCATED `2026-10-11`: this count is now `0` for EVERY row — row 6's `+ 1` term lives in
   *  that row's OWN `drives` array (`tests/tier4-arbitrary-storage.test.ts`, `term: 11` with
   *  ELEVEN drives) — so `declared 11` IS eleven as-filed drives and nothing is composed in. */
  readonly harnessOwnedTerm: number
  readonly attemptsRun: number
  readonly abandoned: number
  readonly held: number
  readonly broken: number
  readonly state: 'held' | 'broken' | 'un-run' | 'stopped'
  readonly maxConsecutiveFailures: number
  readonly readings: readonly string[]
  /** The row's own PROPERTY text (`§5.5.1`'s "The property" cell), carried so the report
   *  prints each row's terms beside what it claims — never re-typed by hand. */
  readonly property: string
}
export interface ExecReport {
  readonly rows: readonly RowReport[]
  readonly declaredTotal: number
  readonly declaredTerms: readonly number[]
  readonly chain: string
  readonly attemptsExecuted: number
  readonly rowsExecuted: number
  readonly rowsHeld: number
  readonly rowsBroken: number
  readonly unrunRows: readonly string[]
  readonly unrunAreFailures: true
  readonly stoppedAtRow: string | null
  readonly stopReason: string
  readonly registerReasons: readonly string[]
  readonly subtotals: { im: number; sm: number; tp: number }
}

/* ═════════════════════════════════════════════════════════════════════════════════════════
 * THE REGISTER-OWNED TERM OF ROW 6 (`P-T4-IM-3` · strategy `S-T4-PANE-1`) — **THE PRE-CARRIER
 * FAMILY** (`§5.5.1` row 6, re-grained `10 → 11` by the gate-6 `F-1` evasion ruling).
 *
 * WHY THIS DRIVE IS HERE AND NOT IN THE ROW'S OWN `drives` ARRAY: the as-filed ten drives of
 * row 6 are built by `buildRegister()` in `tests/tier4-arbitrary-storage.test.ts`; the re-grain
 * pass's edit set is THIS FILE ONLY, so the added term is carried as a REGISTER-OWNED TERM and
 * `executeRegister` composes it INTO the row (`in-row`: one more attempt of row 6, never a new
 * row, never another row's control). The executor cross-checks
 * `row.drives.length + owned terms === DECLARED_TERMS[i]`, so the declared cell and the drives
 * that carry it cannot drift apart silently. **THE DRIVE IS A REAL ASSERTION AND THROWS ONLY
 * WHEN THE PROPERTY IS FALSIFIED** — and the module's absence would make this attempt a counted
 * BROKEN attempt carrying its reason, exactly as for every other absent subject here.
 *
 * THE PROPERTY IT DRIVES (`§2.6` item 3's dated `D-vi` note · item 1(b) · `§3.2` `FS-T4-13` + its
 * dated note): **BEFORE ANY CARRIER ANSWER — and ON A BRIDGE REJECTION — the toggle node writes
 * NO `data-state` PROP**, so its `props['data-state']` carries **NEITHER** `'mcp-enabled'`
 * **NOR** `'mcp-disabled'`; and **no affordance word** is painted either. THE STATES THIS TERM
 * ENUMERATES (the closed PRE-CARRIER family, `§5.5.1` vocabulary):
 *   `S1` **NO CARRIER AT ALL** — `window.provident.security` ABSENT.
 *   `S2` **A BRIDGE THAT REJECTS** — `get()` throws; no reading was taken this turn.
 *   `S3` **THE FIRST PAINT, DRIVEN SYNCHRONOUSLY** — the carrier is PRESENT and its answer has
 *        NOT arrived (its read is IN FLIGHT); `refreshDebug` runs in the SAME turn, which is the
 *        `[T]` shape of `renderer.ts`'s un-awaited `void panels.refresh()` beside the synchronous
 *        `refreshDebug(runtime)`.
 *   `S4` **A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER** — the pane's own declared
 *        `undefined`-counts-as-`null` arm.
 * AND ITS CONTROLS, DRIVEN IN-ROW SO THE TERM CAN FAIL (`RCA-8(d)`: a detector that cannot fail
 * proves nothing — and the term may NOT be satisfied by blanking the toggle forever):
 *   `CTL-0` the fabrication predicate is driven on the **AS-FILED AUTHORED LITERAL**
 *           `'mcp-enabled'` with NO carrier supply ⇒ it **FIRES** (the `F-1` falsifier itself).
 *   `CTL-P` (**POSITIVE**) the same probe, on a pane whose CARRIER SUPPLIED the **INVERSE** word
 *           `'mcp-disabled'` ⇒ it **READS** that word, exactly as supplied.
 *   `CTL-N` (**NEGATIVE**) the fabrication predicate does **NOT** fire on the settled carrier
 *           value — the word standing there is the carrier's, not the pane's.
 *   `NV`    (**NON-VACUITY**) the settled arm still writes **BOTH** cells from the carrier, in
 *           BOTH directions — so a pane that blanked the prop forever FAILS this term.
 *
 * ⟶ RELOCATED `2026-10-11` (THE OWED RELOCATION, LANDED — `RCA-8(d)`: every byte above STANDS, and
 * this note is added BESIDE it). **THE PARAGRAPH ABOVE'S PREMISE IS NOW HISTORICAL, NAMED SO IT IS
 * NOT READ AS CURRENT:** the drive is NO LONGER a `REGISTER-OWNED TERM` composed in-row by
 * `executeRegister` — `REGISTER_OWNED_TERMS` below stands EMPTY — and it is NO LONGER out of the
 * test file's reach. **ITS HOME IS ROW 6'S OWN `drives` ARRAY** in
 * `tests/tier4-arbitrary-storage.test.ts` (`P-T4-IM-3`, `S-T4-PANE-1`, `term: 11`), whose eleventh
 * entry is `...preCarrierPaneDrives()` — this builder, UNCHANGED, now reached as one more attempt
 * of that row rather than composed by the register. THE FOUR STATES, THE FOUR CONTROLS AND THE
 * READING (`the toggle node's `props['data-state']` carries NEITHER state word and no affordance
 * word, at every PRE-CARRIER state`) are EXACTLY as filed; the term's count is unchanged at one
 * attempt (`11 = 10 as filed + 1`), and the register's arithmetic is UNMOVED:
 * `113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`.
 * ═════════════════════════════════════════════════════════════════════════════════════════ */

export const PANE_TOGGLE_NODE_ID = 'exclusion-toggle'
export const PANE_STATE_PROP = 'data-state'
export const PANE_AFFORDANCE_WORD = /Disable MCP|Enable MCP/
export const PRE_CARRIER_STATE_WORDS: readonly string[] = [STATE_MCP_ENABLED, STATE_MCP_DISABLED]

interface PaneLike {
  refresh(): Promise<void>
  refreshDebug(runtime: unknown): void
  supervisor: { allNodes(): unknown[] }
}
interface PaneTools {
  readonly SecurePanels: new (mount: unknown) => PaneLike
  readonly mountEl: () => unknown
  readonly installShim: () => void
}

/** Resolve the pane class + the DOM shim the way every other red harness here does: the
 *  specifiers are FRAGMENT-ASSEMBLED, so no static import exists for tsc to resolve and an
 *  absent module answers a reason string rather than throwing at collection time. */
export async function loadPaneTools(): Promise<{ tools: PaneTools | null; reason: string }> {
  try {
    const paneSpec = ['..', 'src', 'renderer', 'secure-panels.js'].join('/')
    const shimSpec = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const pane = (await import(/* @vite-ignore */ paneSpec)) as { SecurePanels?: unknown }
    const shim = (await import(/* @vite-ignore */ shimSpec)) as { mountEl?: unknown; installShim?: unknown }
    if (typeof pane.SecurePanels !== 'function') {
      return { tools: null, reason: 'ABSENT: `src/renderer/secure-panels.ts` exports no `SecurePanels`' }
    }
    if (typeof shim.mountEl !== 'function' || typeof shim.installShim !== 'function') {
      return { tools: null, reason: 'ABSENT: `src/shared/dom-shim.ts` exports no `mountEl`/`installShim`' }
    }
    return {
      tools: {
        SecurePanels: pane.SecurePanels as PaneTools['SecurePanels'],
        mountEl: shim.mountEl as PaneTools['mountEl'],
        installShim: shim.installShim as PaneTools['installShim'],
      },
      reason: '',
    }
  } catch (e) {
    return { tools: null, reason: `ABSENT: ${e instanceof Error ? e.message : String(e)}` }
  }
}

function toggleNodeOf(panels: PaneLike): { props?: Record<string, unknown>; content?: unknown } {
  const nodes = panels.supervisor.allNodes()
  for (const n of nodes) {
    const node = n as { props?: Record<string, unknown>; content?: unknown }
    if (node.props?.id === PANE_TOGGLE_NODE_ID) return node
  }
  throw new Error(`the pane carries no node with id "${PANE_TOGGLE_NODE_ID}" — the toggle this term reads is absent`)
}
/** THE ONE READING this term asserts on: the toggle node's own `data-state` member. */
export function toggleStateWordOf(panels: PaneLike): unknown {
  return (toggleNodeOf(panels).props ?? {})[PANE_STATE_PROP]
}
/** The toggle's AFFORDANCE word (its `content`). */
export function toggleAffordanceOf(panels: PaneLike): string {
  return String(toggleNodeOf(panels).content ?? '')
}
/** THE DETECTOR: does the node carry one of the clause's TWO state words? (`§2.6` item 1(b):
 *  the closed pair, and the authored literal `'mcp-enabled'` is one of them.) */
export function carriesStateWord(word: unknown): boolean {
  return typeof word === 'string' && PRE_CARRIER_STATE_WORDS.includes(word)
}
/** THE FABRICATION PREDICATE: a state word standing that the CARRIER did not supply. */
export function fabricatesState(word: unknown, carrierSupplied: unknown): boolean {
  if (word === undefined || word === null) return false
  return word !== carrierSupplied
}

/** THE DRIVE-LEVEL ASSERTION. This module is NOT a test file (it is never collected as a suite
 *  and it imports nothing from a test runner), so a drive THROWS — with the measured reading in
 *  the message — exactly when its property is falsified, and `executeRegister` counts that
 *  throw as a BROKEN attempt. */
function mustHold(condition: boolean, message: string): void {
  if (!condition) throw new Error(message)
}

function installCarrier(bridge: Record<string, unknown> | null): void {
  const windowValue: unknown = bridge === null ? {} : { provident: { security: bridge } }
  ;(globalThis as unknown as { window?: unknown }).window = windowValue
}

/** THE ONE DRIVE = ONE ATTEMPT of row 6: the four PRE-CARRIER states, each read at the node,
 *  with its positive, negative and non-vacuity controls driven FIRST (so a failure message
 *  carries the whole measured family and hides none of it). */
export function preCarrierPaneDrives(): readonly Drive[] {
  return [
    {
      label: 'PRE-CARRIER FAMILY — row 6\'s OWN ELEVENTH drive (`P-T4-IM-3`, `term: 11`; RELOCATED `2026-10-11` beside the as-filed carrier label `REGISTER-OWNED TERM (+1) \`S-T4-PANE-1\``, which is no longer its home): S1 no carrier at all · S2 a rejecting bridge · S3 the first paint driven synchronously (a read IN FLIGHT) · S4 a carrier answer omitting `exclusion` ⇒ at EVERY one of them the toggle node carries NEITHER `mcp-enabled` NOR `mcp-disabled` and NO affordance word; CONTROLS: the predicate FIRES on the as-filed authored literal (CTL-0) · the same probe READS a carrier-supplied inverse word (CTL-P) · the predicate does NOT fire on the settled carrier value (CTL-N) · the settled arm writes BOTH cells from the carrier, BOTH directions (NV)',
      run: async () => {
        const { tools, reason } = await loadPaneTools()
        if (tools === null) throw new Error(`the PRE-CARRIER term cannot be driven — ${reason}`)
        /* the suite's own `beforeAll` installs the shim; install it only if it is genuinely
         * absent, so this drive is self-sufficient without disturbing the suite's byId state. */
        if ((globalThis as { document?: unknown }).document === undefined) tools.installShim()
        const fresh = (): PaneLike => new tools.SecurePanels(tools.mountEl())
        const runtimeStub = {
          renderedHtmlResult: () => ({
            census: { inTree: 0, registered: 0, unplaced: 0, destroyed: 0, prototypes: 0 },
            ssrHtml: '',
          }),
        }
        const carrierAnswer = (exclusion: unknown, read: unknown): Record<string, unknown> => ({
          token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion, read,
        })

        /* ── `CTL-0` — THE FALSIFIER ITSELF, DRIVEN: the AS-FILED authored literal standing with
         * NO carrier supply is EXACTLY what the per-state assertion must catch (`F-1`). Both the
         * detector the four states assert with AND the fabrication predicate are driven on it, so
         * the term is SEEN to bite on the as-filed bytes (`git show HEAD:src/renderer/secure-panels.ts`
         * declared `props: { id: 'exclusion-toggle', 'data-state': 'mcp-enabled' }`) and to hold on
         * the repaired bytes: an instrument that could not do both proves nothing. */
        mustHold(
          carriesStateWord(STATE_MCP_ENABLED),
          'CONTROL (`CTL-0`): the per-state detector FIRES on the AS-FILED AUTHORED LITERAL `\'mcp-enabled\'` — so the four `!carriesStateWord(prop)` assertions below WOULD have failed at the as-filed node',
        )
        mustHold(
          !carriesStateWord(undefined),
          'CONTROL (`CTL-0`): and the detector does NOT fire on the clause’s own admissible reading — no state member at all',
        )
        mustHold(
          fabricatesState(STATE_MCP_ENABLED, undefined),
          'CONTROL (`CTL-0`): the fabrication predicate FIRES on the AS-FILED AUTHORED LITERAL `\'mcp-enabled\'` with NO carrier supply — this is the live `F-1` reading the term exists to catch',
        )
        mustHold(
          !fabricatesState(undefined, undefined),
          'CONTROL (`CTL-0`): and it does NOT fire on the clause’s own admissible reading (no state member at all)',
        )

        /* ── `CTL-P` + `CTL-N` — THE SAME PROBE, ON A CARRIER THAT SUPPLIED THE **INVERSE** WORD
         * (`mcp-disabled`, the inverse of the authored literal), driven FIRST so the four
         * no-answer readings below are readings by a probe SEEN to read a supplied word. */
        installCarrier({ get: async () => ({ ...carrierAnswer(STATE_MCP_DISABLED, null) }) })
        const suppliedInverse = fresh()
        await suppliedInverse.refresh()
        const suppliedWord = toggleStateWordOf(suppliedInverse)
        mustHold(
          carriesStateWord(suppliedWord),
          `POSITIVE CONTROL (\`CTL-P\`): the SAME probe FIRES on the carrier-supplied INVERSE word — measured ${JSON.stringify(suppliedWord)}. Without this the term could be satisfied by blanking the toggle forever.`,
        )
        mustHold(
          suppliedWord === STATE_MCP_DISABLED,
          `POSITIVE CONTROL (\`CTL-P\`): and it is EXACTLY the word the carrier supplied — measured ${JSON.stringify(suppliedWord)}, supplied ${JSON.stringify(STATE_MCP_DISABLED)}`,
        )
        mustHold(
          !fabricatesState(suppliedWord, STATE_MCP_DISABLED),
          'NEGATIVE CONTROL (`CTL-N`): the fabrication predicate does NOT fire on the settled carrier value — the word standing there is the carrier’s, not the pane’s',
        )

        /* ── `NV` — THE SETTLED ARM'S NON-VACUITY, BOTH DIRECTIONS, BOTH CELLS: the carrier’s
         * word is written to `data-state` AND to the affordance word, so a permanently blanked
         * toggle FAILS here (the second admissible shape of the same clause). */
        installCarrier({ get: async () => ({ ...carrierAnswer(STATE_MCP_ENABLED, null) }) })
        const settledEnabled = fresh()
        await settledEnabled.refresh()
        mustHold(
          toggleStateWordOf(settledEnabled) === STATE_MCP_ENABLED,
          `NON-VACUITY: the settled arm writes the CARRIER’s \`mcp-enabled\` into \`data-state\` — measured ${JSON.stringify(toggleStateWordOf(settledEnabled))}`,
        )
        mustHold(
          PANE_AFFORDANCE_WORD.test(toggleAffordanceOf(settledEnabled)),
          `NON-VACUITY: and its affordance word is painted from the same carrier reading — measured ${JSON.stringify(toggleAffordanceOf(settledEnabled))}`,
        )
        installCarrier({ get: async () => ({ ...carrierAnswer(STATE_MCP_DISABLED, null) }) })
        const settledDisabled = fresh()
        await settledDisabled.refresh()
        mustHold(
          toggleStateWordOf(settledDisabled) === STATE_MCP_DISABLED,
          `NON-VACUITY: the OTHER direction, from the carrier — measured ${JSON.stringify(toggleStateWordOf(settledDisabled))}`,
        )
        mustHold(
          PANE_AFFORDANCE_WORD.test(toggleAffordanceOf(settledDisabled)),
          `NON-VACUITY: and the other direction’s affordance word — measured ${JSON.stringify(toggleAffordanceOf(settledDisabled))}`,
        )
        mustHold(
          toggleAffordanceOf(settledDisabled) !== toggleAffordanceOf(settledEnabled),
          'NON-VACUITY: the two directions paint DIFFERENT affordance words (a single constant word satisfies neither direction)',
        )

        /* ── THE PRE-CARRIER FAMILY, EACH STATE READ AT THE NODE ────────────────────────────── */
        const readings: Array<{ state: string; prop: unknown; affordance: string }> = []
        const take = (state: string, panels: PaneLike): void => {
          readings.push({ state, prop: toggleStateWordOf(panels), affordance: toggleAffordanceOf(panels) })
        }

        /* `S1` — NO CARRIER AT ALL: the pane’s declared read is skipped entirely. */
        installCarrier(null)
        const s1 = fresh()
        await s1.refresh()
        take('S1 no-carrier-at-all', s1)

        /* `S2` — A BRIDGE THAT REJECTS: no reading was TAKEN this turn. */
        installCarrier({ get: async () => { throw new Error('bridge down') } })
        const s2 = fresh()
        await s2.refresh()
        take('S2 bridge-rejects', s2)

        /* `S3` — THE FIRST PAINT, DRIVEN SYNCHRONOUSLY: the carrier is PRESENT, its read is IN
         * FLIGHT and never answers; `refreshDebug` runs in the SAME turn. */
        installCarrier({ get: () => new Promise<never>(() => undefined) })
        const s3 = fresh()
        void s3.refresh()
        s3.refreshDebug(runtimeStub)
        take('S3 first-paint (synchronous)', s3)

        /* `S4` — A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER. */
        installCarrier({
          get: async () => ({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, read: null }),
        })
        const s4 = fresh()
        await s4.refresh()
        take('S4 carrier-answer-omits-exclusion', s4)

        /* ── THE TERM ───────────────────────────────────────────────────────────────────────── */
        const measured = readings
          .map((r) => `${r.state}: data-state=${JSON.stringify(r.prop)} affordance=${JSON.stringify(r.affordance)}`)
          .join(' | ')
        for (const r of readings) {
          mustHold(
            !carriesStateWord(r.prop),
            `${r.state} — the toggle node carries NEITHER \`mcp-enabled\` NOR \`mcp-disabled\` before a carrier answer (measured ${JSON.stringify(r.prop)}); FULL FAMILY: ${measured}`,
          )
          mustHold(
            r.prop === undefined,
            `${r.state} — and \`§2.6\` item 3’s \`D-vi\` binds the PROP itself: *"writes NO \`data-state\` PROP"* (measured ${JSON.stringify(r.prop)}); FULL FAMILY: ${measured}`,
          )
          mustHold(
            !PANE_AFFORDANCE_WORD.test(r.affordance),
            `${r.state} — nor is the AFFORDANCE word painted before a carrier answer (measured ${JSON.stringify(r.affordance)}); FULL FAMILY: ${measured}`,
          )
        }
      },
    },
  ]
}

/** A TERM THE REGISTER ITSELF OWNS AND EXECUTES IN-ROW — the shape the gate-6 `F-1` re-grain
 *  needs while the sibling test file is out of the pass’s edit set. `executeRegister` composes
 *  `row.drives` with these, and refuses to run at all unless
 *  `row.drives.length + Σ term === the row’s DECLARED_TERMS cell`.
 *
 *  THE MEASURED OUTCOME OF THIS TERM'S FIRST RUN (`2026-10-11`, recorded because a later reader
 *  will ask whether the re-grained term BITES or HOLDS): **`P-T4-IM-3` executed `11 = 10 (as
 *  filed) + 1` and reported `held 11 · BROKEN 0`** against the tree at that head, because the
 *  rule-11(f) repair the same wave authorized in `src/renderer/secure-panels.ts` (the removal of
 *  the AUTHORED envelope literal) was ALREADY in the working tree when the term was driven — the
 *  `[T]` row `F-1` in `tests/tier4-arbitrary-storage.test.ts` read the same repair as `PASS` in
 *  the SAME run. **THAT IS THE INSTRUMENT FOLLOWING THE ARTIFACT, NOT A VACUOUS TERM**, and the
 *  proof that it bites is driven IN-ROW rather than argued: `CTL-0` runs the term’s own detector
 *  and fabrication predicate on the AS-FILED literal `'mcp-enabled'` (which
 *  `git show 8955c4f:src/renderer/secure-panels.ts` declares) and BOTH FIRE there — so at the
 *  as-filed bytes this attempt would have been a BROKEN one. **A red re-grain here must never be
 *  manufactured by pinning bytes; it is read from the node, and the node now answers silence.**
 *
 *  ⟶ RELOCATED `2026-10-11` (`RCA-8(d)`: the whole note above STANDS, unedited, and this one is
 *  inserted BESIDE it). **THE SHAPE THIS INTERFACE WAS AUTHORED FOR IS NOW THE EMPTY CASE:** the
 *  re-grain's own premise — *"while the sibling test file is out of the pass’s edit set"* — no
 *  longer holds. Row 6's term is declared and carried in THAT file (`P-T4-IM-3`, `term: 11`,
  * eleven drives, the last of them `...preCarrierPaneDrives()`), `REGISTER_OWNED_TERMS` below
 *  stands EMPTY, `Σ term = 0` for every row, and the cross-check this interface names now reduces
 *  to `row.drives.length === DECLARED_TERMS[i]` — still a refusal to run, still per row. The
 *  interface and the composition path are KEPT so a future register-owned term is expressible;
 *  NOTHING is deleted, and the measured outcome quoted above (`held 11 · BROKEN 0`) is the reading
 *  the relocated term reproduces as row 6's own eleventh attempt. */
export interface RegisterOwnedTerm {
  readonly rowId: string
  readonly strategyId: string
  readonly term: number
  readonly cause: string
  readonly drives: readonly Drive[]
}
export const REGISTER_OWNED_TERMS: readonly RegisterOwnedTerm[] = [
  /* ⟶ EMPTIED `2026-10-11` (THE OWED RELOCATION, LANDED — `RCA-8(d)`: the as-filed entry that stood
   * here is RECORDED HERE, never erased). **THE TERM'S HOME IS ROW 6'S OWN `drives` ARRAY** in
   * `tests/tier4-arbitrary-storage.test.ts` (`P-T4-IM-3`, `S-T4-PANE-1`, `term: 11`; its ELEVENTH
   * driver is `...preCarrierPaneDrives()`), so THE REGISTER OWNS NO TERM OF ANY ROW: the executor's
   * in-row composition composes nothing and its cross-check binds `row.drives.length` DIRECTLY to
   * the row's declared cell.
   *
   * THE AS-FILED ENTRY, KEPT VISIBLE, STOOD EXACTLY:
   *   `{ rowId: 'P-T4-IM-3', strategyId: 'S-T4-PANE-1', term: 1, drives: preCarrierPaneDrives() }`
   * with the cause *"GATE-6 `F-1` (HIGH): the toggle node carried the AUTHORED envelope literal
   * `data-state: 'mcp-enabled'` before any carrier answer, so the register held `112/112` while
   * the live layer FALSIFIED the property — the row's as-filed `10 = 4 + 6` drives the fabrications
   * but reads NO PRE-CARRIER shape."* THAT CAUSE IS UNCHANGED and now rides the row's own drive.
   *
   * THE ARITHMETIC IS UNMOVED BY THE RELOCATION (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`):
   * `113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8` · `P-IM 47 = 12 + 8 + 11 + 8 + 8` ·
   * `P-SM 10` · `P-TP 56 = 12 + 10 + 14 + 20` · `47 + 10 + 56 = 113` · chain
   * `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113` — and BOTH as-filed forms (`108`… the spec
   * gate; `112`… the gate-4 row-8 re-grain) stay printed beside it in `arithmeticForms()`.
   *
   * **NOTHING WAS DELETED FROM THIS MODULE:** `RegisterOwnedTerm`, `registerOwnedTermsFor`, the
   * executor's composition path and its cross-check all STAND — empty-case exercised — so a future
   * register-owned term is still expressible, and `preCarrierPaneDrives()` below stays LIVE with
   * its one consumer (row 6's own table). */
]
export function registerOwnedTermsFor(row: RegisterRow): readonly RegisterOwnedTerm[] {
  return REGISTER_OWNED_TERMS.filter((t) => t.rowId === row.id && t.strategyId === row.strategyId)
}

/** THE EXECUTOR — every row's FULL declared term, sequentially, in register order; the caps
 *  enforced by the caller; STOP AFTER 5 CONSECUTIVE FAILURES across the register. An un-run
 *  row is a FAILURE, never a pass. A row whose `term` is not its `drives.length` is a FAILURE
 *  (the table IS the closed input set).
 *
 *  THE STOP RULE'S READING, RECORDED SO NO LATER PASS OVER-READS IT (the sibling register's
 *  own recorded interpretation): with every row a deterministic FINITE closed table, a literal
 *  stop-at-5 at RED would leave most rows UN-RUN and destroy the very evidence the red set
 *  exists to produce (`§4.1`: the register's un-run rows are reported as FAILURES). The
 *  completed reading is therefore the operative one and `honourStopRule: true` supplies the
 *  literal reading's row to the report. */
export async function executeRegister(
  rows: readonly RegisterRow[],
  opts?: { honourStopRule?: boolean },
): Promise<ExecReport> {
  const honourStopRule = opts?.honourStopRule ?? false
  const reports: RowReport[] = []
  const registerReasons: string[] = []
  let attemptsExecuted = 0
  let rowsExecuted = 0
  let rowsHeld = 0
  let rowsBroken = 0
  let consecutive = 0
  let stopped = false
  let stoppedAtRow: string | null = null
  let stopReason = ''

  for (const row of rows) {
    if (row.drives.length !== row.term) {
      throw new Error(`register FAILURE: row ${row.id} declares term ${row.term} but carries ${row.drives.length} drives — the term is misdeclared`)
    }
    /* THE REGISTER-OWNED TERMS OF THIS ROW (`2026-10-11`, the gate-6 `F-1` re-grain): composed
     * IN-ROW, so the declared cell is the row's own drives PLUS what the register itself owns —
     * and the two are cross-checked against the declared cell, so neither can drift silently.
     * ⟶ RELOCATED `2026-10-11`: `REGISTER_OWNED_TERMS` stands EMPTY, so this path composes NOTHING
     * for ANY row and the cross-check below now binds `row.drives.length` DIRECTLY to
     * `DECLARED_TERMS[i]` — the empty case is what the ten rows exercise. The path is KEPT (not
     * removed): a future register-owned term is still expressible, and the cross-check keeps its
     * bite either way. */
    const owned = registerOwnedTermsFor(row)
    const ownedTerm = owned.reduce((a, t) => a + t.term, 0)
    const ownedDrives = owned.flatMap((t) => [...t.drives])
    if (ownedDrives.length !== ownedTerm) {
      throw new Error(`register FAILURE: row ${row.id}'s register-owned terms declare ${ownedTerm} attempt(s) but carry ${ownedDrives.length} drive(s) — the owned term is misdeclared`)
    }
    const declaredCell = REGISTER_ROW_IDS.indexOf(row.id)
    if (declaredCell >= 0 && DECLARED_TERMS[declaredCell] !== row.term + ownedTerm) {
      throw new Error(`register FAILURE: row ${row.id} carries ${row.drives.length} as-filed drive(s) + ${ownedTerm} register-owned term(s) = ${row.term + ownedTerm}, but its declared cell reads ${DECLARED_TERMS[declaredCell]} — the term is misdeclared`)
    }
    const effectiveTerm = row.term + ownedTerm
    const drives: readonly Drive[] = ownedDrives.length === 0 ? row.drives : [...row.drives, ...ownedDrives]
    if (stopped) {
      reports.push({
        id: row.id, type: row.type, strategyId: row.strategyId, declaredTerm: effectiveTerm,
        harnessOwnedTerm: ownedTerm,
        attemptsRun: 0, abandoned: effectiveTerm, held: 0, broken: 0, state: 'un-run',
        maxConsecutiveFailures: 0, property: row.property,
        readings: ['UN-RUN — the stop rule fired before this row; an un-run row is a FAILURE, never a pass'],
      })
      registerReasons.push(`${row.id} (${row.strategyId}) — UN-RUN (the stop rule fired at ${stoppedAtRow})`)
      continue
    }
    rowsExecuted += 1
    const readings: string[] = []
    let held = 0
    let broken = 0
    let maxConsec = 0
    let inRow = 0
    let abandoned = 0
    let rowStopped = false
    for (let i = 0; i < drives.length; i++) {
      const drive = drives[i]
      attemptsExecuted += 1
      let ok = false
      let detail = ''
      try {
        await drive.run()
        ok = true
        detail = 'held'
      } catch (e) {
        ok = false
        detail = e instanceof Error ? e.message : String(e)
      }
      if (ok) {
        held += 1
        consecutive = 0
        inRow = 0
        readings.push(`HELD   — ${drive.label}`)
      } else {
        broken += 1
        consecutive += 1
        inRow += 1
        if (inRow > maxConsec) maxConsec = inRow
        readings.push(`BROKEN — ${drive.label}: ${detail.slice(0, 240)}`)
      }
      if (honourStopRule && consecutive >= STOP_AFTER_CONSECUTIVE) {
        stopped = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures at ${row.id} drive "${drive.label}" — STOP`
        abandoned = drives.length - (i + 1)
        rowStopped = true
        break
      }
    }
    const state: RowReport['state'] = rowStopped ? 'stopped' : broken === 0 ? 'held' : 'broken'
    if (state === 'held') rowsHeld += 1
    else rowsBroken += 1
    if (state !== 'held') registerReasons.push(`${row.id} (${row.strategyId}) — ${broken} broken of ${held + broken} attempted`)
    reports.push({
      id: row.id, type: row.type, strategyId: row.strategyId, declaredTerm: effectiveTerm,
      harnessOwnedTerm: ownedTerm, attemptsRun: held + broken, abandoned, held, broken, state,
      maxConsecutiveFailures: maxConsec, readings, property: row.property,
    })
  }

  const total = declaredTotalReport()
  const unrun = reports.filter((r) => r.state === 'un-run').map((r) => r.id)
  const subtotals = {
    im: reports.filter((r) => r.type === 'P-IM').reduce((s, r) => s + r.declaredTerm, 0),
    sm: reports.filter((r) => r.type === 'P-SM').reduce((s, r) => s + r.declaredTerm, 0),
    tp: reports.filter((r) => r.type === 'P-TP').reduce((s, r) => s + r.declaredTerm, 0),
  }
  return {
    rows: reports, declaredTotal: total.sum, declaredTerms: total.terms, chain: total.chain,
    attemptsExecuted, rowsExecuted, rowsHeld, rowsBroken, unrunRows: unrun, unrunAreFailures: true,
    stoppedAtRow, stopReason, registerReasons, subtotals,
  }
}

// ---- THE REPORT ------------------------------------------------------------------------
export function registerReportLines(r: ExecReport): string[] {
  const lines: string[] = []
  lines.push('REGISTER-ATTEMPT-TOTALS (§5.5.1 — printed WITH their terms; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`):')
  lines.push(`  OPERATIVE TOTAL ${r.declaredTotal} = ${r.declaredTerms.join(' + ')}  (chain ${r.chain})`)
  lines.push(`  subtotals BY TYPE — P-IM ${r.subtotals.im} · P-SM ${r.subtotals.sm} · P-TP ${r.subtotals.tp} — ${r.subtotals.im} + ${r.subtotals.sm} + ${r.subtotals.tp} = ${r.subtotals.im + r.subtotals.sm + r.subtotals.tp}`)
  for (const f of arithmeticForms()) {
    lines.push(`  ${f.operative ? 'OPERATIVE' : 'AS FILED '} · ${f.name} · ${f.dated} · cause: ${f.cause}`)
    lines.push(`      ${f.sum} = ${f.terms.join(' + ')}`)
    lines.push(`      chain ${f.chain}`)
    lines.push(`      P-IM ${f.subtotals.im} · P-SM ${f.subtotals.sm} · P-TP ${f.subtotals.tp} — ${f.subtotals.im} + ${f.subtotals.sm} + ${f.subtotals.tp} = ${f.subtotals.im + f.subtotals.sm + f.subtotals.tp} · caps: largest row ${f.largestRow} ≤ ${REGISTER_ROW_CAP} · total ${f.sum} ≤ ${REGISTER_TOTAL_CAP}`)
  }
  lines.push(`  caps, EACH AGAINST ITS OWN: largest row ${Math.max(...r.rows.map((x) => x.declaredTerm))} ≤ ${REGISTER_ROW_CAP} per row ✓ · total ${r.declaredTotal} ≤ ${REGISTER_TOTAL_CAP} in total ✓ (headroom ${REGISTER_TOTAL_CAP - r.declaredTotal}) · STOP AFTER ${STOP_AFTER_CONSECUTIVE} CONSECUTIVE FAILURES`)
  lines.push(`  attempts executed: ${r.attemptsExecuted} · rows executed: ${r.rowsExecuted} of ${r.rows.length} · un-run: ${r.unrunRows.length === 0 ? 'none' : r.unrunRows.join(', ')}`)
  lines.push(`  AN UN-RUN ROW IS REPORTED AS A FAILURE, NEVER AS A PASS — un-run rows here: ${r.unrunRows.length} (each one counts as a FAILURE against this register)`)
  lines.push(`  no seed, no generator, no Math.random — every row is the closed input set (§5.5.2 item 3)`)
  lines.push(`  registerStoppedAt: ${r.stoppedAtRow === null ? 'null' : r.stoppedAtRow} (the completed reading; the literal stop-after-5 reading is reported beside it)`)
  lines.push('')
  lines.push('REGISTER-ROW-OUTCOMES (executed run):')
  for (const o of r.rows) {
    const owned = o.harnessOwnedTerm > 0 ? ` = ${o.declaredTerm - o.harnessOwnedTerm} (as filed) + ${o.harnessOwnedTerm} (REGISTER-OWNED TERM: the PRE-CARRIER family)` : ''
    // ⟶ `2026-10-11`: THE `else` BRANCH IS NOW THE OPERATIVE ONE FOR EVERY ROW (`REGISTER_OWNED_TERMS`
    // stands EMPTY after the relocation of row 6's term into row 6's OWN `drives` array), so no row's
    // line is annotated as composed; row 6 prints `declared 11 → attempts 11 · held 11`, its eleven
    // drives being its own.
    lines.push(`  ${o.id} [${o.type}] ${o.strategyId}: declared ${o.declaredTerm}${owned} → attempts ${o.attemptsRun} · held ${o.held} · BROKEN ${o.broken} · state ${o.state} · maxConsecutiveFailures ${o.maxConsecutiveFailures} · cap ${o.declaredTerm} ≤ ${REGISTER_ROW_CAP} ${o.declaredTerm <= REGISTER_ROW_CAP ? '✓' : '✗'}`)
  }
  if (r.registerReasons.length > 0) {
    lines.push('')
    lines.push('REGISTER-BROKEN/UN-RUN REASONS (each one a FAILURE of this register):')
    for (const reason of r.registerReasons) lines.push(`  ${reason}`)
  }
  lines.push('')
  for (const o of r.rows) {
    lines.push(`  ── ${o.id} (${o.strategyId}) — ${o.property.slice(0, 150)}`)
    for (const reading of o.readings) lines.push(`      ${reading}`)
  }
  return lines
}

// ---- CONTROLS (`RCA-8(d)`: a detector that cannot fail proves nothing) -------------------
export interface BrokenCountCheck {
  readonly broken: number
  readonly unrun: number
  readonly brokenOk: boolean
  readonly unrunOk: boolean
  readonly heldOk: boolean
}
export function brokenCountCheckOf(r: ExecReport): BrokenCountCheck {
  const broken = r.rows.reduce((a, x) => a + x.broken, 0)
  const held = r.rows.reduce((a, x) => a + x.held, 0)
  const unrun = r.unrunRows.length
  return {
    broken, unrun,
    brokenOk: broken === 0,
    unrunOk: unrun === 0,
    heldOk: held === r.attemptsExecuted && r.rowsExecuted === r.rows.length,
  }
}
/** CONTROL ONLY — the pre-repair (vacuous) form, kept so the report row can prove the new
 *  bound FAILS a deliberately broken run while the old form passes it. Never used by a
 *  contract assertion. */
export function brokenCountGuardOldForm(r: ExecReport): boolean {
  const broken = r.rows.reduce((a, x) => a + x.broken, 0)
  return typeof broken === 'number'
}
export function syntheticBrokenRegisterControlOnly(): Promise<ExecReport> {
  const row: RegisterRow = {
    id: 'P-T4-CONTROL-1', type: 'P-IM', strategyId: 'S-T4-CONTROL-1', term: 1,
    property: 'CONTROL ONLY — one synthetic drive that falsifies itself, so the broken-count guard is exercised against a run that REALLY carries a broken attempt',
    drives: [{ label: 'CONTROL — asserts a bound its own subject falsifies', run: () => { throw new Error('CONTROL: broken by construction') } }],
  }
  return executeRegister([row])
}
export function syntheticUnRunRegisterControlOnly(): ExecReport {
  const total = declaredTotalReport()
  const rows: RowReport[] = REGISTER_ROW_IDS.map((id, i) => ({
    id, type: DECLARED_TYPES[i], strategyId: STRATEGY_IDS[i], declaredTerm: DECLARED_TERMS[i],
    harnessOwnedTerm: 0,
    attemptsRun: 0, abandoned: DECLARED_TERMS[i],
    held: 0, broken: 0, state: i === 0 ? 'held' : 'un-run',
    maxConsecutiveFailures: 0, readings: [], property: 'CONTROL ONLY (synthetic un-run register)',

  }))
  const subtotals = {
    im: rows.filter((x) => x.type === 'P-IM').reduce((s, x) => s + x.declaredTerm, 0),
    sm: rows.filter((x) => x.type === 'P-SM').reduce((s, x) => s + x.declaredTerm, 0),
    tp: rows.filter((x) => x.type === 'P-TP').reduce((s, x) => s + x.declaredTerm, 0),
  }
  return {
    rows, declaredTotal: total.sum, declaredTerms: total.terms, chain: total.chain,
    attemptsExecuted: 0, rowsExecuted: 1, rowsHeld: 1, rowsBroken: 0,
    unrunRows: rows.filter((x) => x.state === 'un-run').map((x) => x.id),
    unrunAreFailures: true, stoppedAtRow: null, stopReason: 'CONTROL ONLY (synthetic un-run)',
    registerReasons: [], subtotals,
  }
}

export { TESTS_DIR, REPO }
