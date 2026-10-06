// tests/secure-exclusion-register.ts — THE `§5.5.1` TYPED PROPERTY REGISTER of
// `U-SECURE-EXCLUSION` (ledger row `S1`, wave `S`), the access-control
// mutual-exclusion gate between the MCP server and the `secure` (tier-4) store.
//
// This module is NOT a test file (`vitest.config.ts` includes
// `tests/**/*.test.ts` only, so it is never collected as a suite). It carries the
// register's TYPED ROWS and the harness that EXECUTES them;
// `tests/secure-exclusion.test.ts` imports both, so the register rides the SAME
// node suite (`npm test`, `§5.2` leg 1) exactly as `§5.5.1` requires and the test
// file itself stays reviewable. The precedents are `tests/store-core-graph-register.ts`
// (the harness's executed-layer form) and `tests/store-security.test.ts` (the
// same-wave sibling's inline register).
//
// CONTRACT (the only authority): `docs/specs/secure-exclusion.md`
//   `§5.5`      — the strategy discipline, the caps, the stop rule, the re-prefix.
//   `§5.5.1`    — THE TABLE: `9` typed rows (`4` `P-EX-IM` + `3` `P-EX-SM` +
//                 `2` `P-EX-TP`), `9` strategy ids (`S-EX-*`), the declared total
//                 `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10` with the chain
//                 `12 -> 24 -> 34 -> 46 -> 58 -> 72 -> 84 -> 96 -> 106`, and the
//                 subtotals `P-IM 44 + P-SM 38 + P-TP 24 = 106`.
//   `§5.5.2`    — the honesty block: EVERY row's table is the CLOSED input set;
//                 no `(bounded)` marking is owed (no row draws); an un-run row is
//                 a FAILURE, never a pass; the `[U]` half is NOT in this register.
//   `§5.5.3`    — the attempt arithmetic, readable against each term's factors:
//                 `12 = 2 x 6` · `12 = 12 x 1` · `10 = 10 x 1` · `12 = 5 x 2 + 2` ·
//                 `14 = 7 x 2` · `12 = 7 + 3 + 2` · `12 = 5 x 2 + 2` · `12 = 9 + 3` ·
//                 `10 = 5 + 5` — the nine terms sum to `106`.
//   `§4.2`      — the authoring order: register rows FIRST, then the behavioural
//                 `M-EX-*`/`FS-EX-*` rows, then the static census rows, then the
//                 `[U]` pre-live rows.
//   `§4.3.1`    — the caps: `<=100` attempts per row, `<=400` in total, sequential
//                 in register order, STOP AFTER 5 CONSECUTIVE FAILURES.
//
// THE TERMS, PRINTED WITH THEIR FACTORS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`):
//   P-EX-IM-1  12 = 2 legal states x 6 readings
//   P-EX-IM-2  12 = 12 drive cells (a)..(l)
//   P-EX-IM-3  10 = 10 drive cells (a)..(j)
//   P-EX-SM-1  12 = 5 transition classes x 2 readings + 2 machine-level readings
//   P-EX-SM-2  14 = 7 drive cells x 2 readings
//   P-EX-SM-3  12 = 7 input classes + 3 order readings + 2 persistence readings
//   P-EX-TP-1  12 = 5 refusal classes x 2 readings + 2 reading cells
//   P-EX-TP-2  12 = 9 payload classes + 3 channel readings
//   P-EX-IM-4  10 = 5 isolation probes + 5 carrier/notify probes
//
// ⟶ THE AS-FILED BLOCK ABOVE IS KEPT BYTE-FOR-BYTE AND IS SUPERSEDED IN PLACE
// (`RCA-8(d)` ANNOTATE-BESIDE — a term change is ANNOTATED, never silently rewritten).
// **THE OPERATIVE TERMS AFTER THE GATE-4 RED PASS (`2026-10-05`, the adversarial
// pass's A-1/A-2/A-3 host findings). The three rows below gained drives, so their
// terms moved; the other six are unchanged:**
//   P-EX-IM-1  12 = 2 legal states x 6 readings                                   (UNCHANGED)
//   P-EX-IM-2  15 = 12 drive cells (a)..(l) + 3 `A-1` live-transition cells        (12 -> 15)
//   P-EX-IM-3  13 = 10 drive cells (a)..(j) + 3 `A-2` epoch/stale-arm cells        (10 -> 13)
//   P-EX-SM-1  13 = 5 transition classes x 2 readings + 2 machine-level readings
//                     + 1 `A-3` T-2(d) widen cell                                  (12 -> 13)
//   P-EX-SM-2  14 = 7 drive cells x 2 readings                                    (UNCHANGED)
//   P-EX-SM-3  12 = 7 input classes + 3 order readings + 2 persistence readings   (UNCHANGED)
//   P-EX-TP-1  12 = 5 refusal classes x 2 readings + 2 reading cells              (UNCHANGED)
//   P-EX-TP-2  12 = 9 payload classes + 3 channel readings                        (UNCHANGED)
//   P-EX-IM-4  10 = 5 isolation probes + 5 carrier/notify probes                  (UNCHANGED)
// **THE OPERATIVE TOTAL IS `113 = 12 + 15 + 13 + 13 + 14 + 12 + 12 + 12 + 10`**
// (chain `12 -> 27 -> 40 -> 53 -> 67 -> 79 -> 91 -> 103 -> 113`), subtotals
// `P-IM 50 + P-SM 39 + P-TP 24 = 113`. **THE DELTA VS THE SPEC'S `§5.5.1` AS-FILED
// DECLARED FIGURES IS `+7` and it is REPORTED, never smoothed**: the spec declares
// `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10` with subtotals `44 + 38 + 24`,
// and this pass authorises 7 NEW DRIVE CELLS (`P-EX-IM-2` +3, `P-EX-IM-3` +3,
// `P-EX-SM-1` +1) for the three host findings the adversarial pass raised. **THE
// SPEC IS NOT EDITED BY A TESTWRITER** (`§1.3` item 10) — the discrepancy is a
// finding for the spec amendment, carried by `SPEC_AS_FILED_*` below and printed
// BESIDE the operative arithmetic by the register's own report. No term VALUE other
// than those three moved, no row, strategy id, property or cap moved, and the
// largest row (`15`) and the total (`113`) both remain inside their own caps.
//
// THE MODULE'S ABSENCE IS DATA, NOT AN ERROR: this file never statically imports
// the modules under test (`§4.1`'s ABSENT-symbol red classes). It resolves them
// the way the repo's other red harnesses do — an `existsSync` check before a
// fragment-assembled dynamic specifier — so an absent module makes each of a row's
// attempts a counted BROKEN attempt carrying the reason, and the stop rule can fire
// on real data. A placeholder drive is a lie about coverage; every drive below is
// the REAL assertion its row's property states and throws ONLY when the property
// is actually falsified.
//
// A DRIVE WHOSE SUBJECT THE CONTRACT DOES NOT SUPPLY IS STILL WRITTEN AS A REAL
// ASSERTION and reported as a CONTRACT GAP in this pass's report rather than
// satisfied with a placeholder or a fabricated seam.

import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

// ---- THE PATHS (`§1.3` item 1, `§5.1` item 1) -------------------------------------------
/** `tests/` — the directory this module lives in (`import.meta.url` is
 *  `<repo>/tests/secure-exclusion-register.ts`, so `./` resolves INSIDE `tests/`). */
const TESTS_DIR = new URL('./', import.meta.url)
/** `<repo>/` — one level ABOVE `tests/`. */
const REPO = new URL('./../', TESTS_DIR)
const SRC = (rel: string): string => fileURLToPath(new URL('./src/' + rel, REPO))
const TEST = (rel: string): string => fileURLToPath(new URL('./' + rel, TESTS_DIR))

export const SECURITY_SRC = SRC('main/security.ts')
/** The same path under the name the test file's census list uses. */
export const SECURITY_TS_SRC = SECURITY_SRC
export const MCP_SERVER_SRC = SRC('main/mcp-server.ts')
export const MAIN_SRC = SRC('main/main.ts')
export const PRELOAD_SRC = SRC('main/preload.ts')
export const SECURE_PANELS_SRC = SRC('renderer/secure-panels.ts')
export const STORE_CHANNELS_SRC = SRC('main/store-channels.ts')
export const STORE_CORE_SRC = SRC('renderer/store-core-graph.ts')
export const STORE_REFS_SRC = SRC('renderer/store-graph-references.ts')
export const SECURITY_STORE_SRC = SRC('main/security-store.ts')
/** `<repo>/docs/` — the repo-root `docs/` tree, resolved from the constant this
 *  module already documents as **the repo root**.
 *
 *  **⟶ REPAIRED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3, KICK-BACK OUTCOME (a):
 *  A MALFORMED INSTRUMENT, NOT A CONTRACT DEFECT** (`RCA-8(d)` annotate-beside —
 *  the as-filed form is RECORDED here and RE-DRIVEN by the control row
 *  `SURFACE_ARTIFACT_RESOLUTION_CONTROLS`, never silently rewritten).
 *
 *  **THE AS-FILED FORM WAS** `new URL('./../docs/specs/…', REPO)`.  `REPO` is
 *  ALREADY `<repo>/` — one level ABOVE `tests/` — so the extra `./../` resolved
 *  **ONE DIRECTORY LEVEL TOO FAR OUT**.  Measured pre-repair (supervisor-verified
 *  first-hand, and re-measured by this pass's own control):
 *  ```
 *  TESTS_DIR        = file:///…/Provident-Electron/tests/
 *  REPO             = file:///…/Provident-Electron/
 *  SURFACE_ARTIFACT = /media/ryanr/Shared Files/Projects/docs/specs/store-core-module-store-core-graph-surface.md  ← OUTSIDE THE REPO
 *  exists? false
 *  ```
 *  `exists()` was therefore `false`, `sha256Of()` answered the sentinel `'ABSENT'`,
 *  and BOTH consumers of the path measured nothing: `FORBIDDEN_PATHS`' existence
 *  check and the `FS-EX-15` byte-pin (which is why **it failed at red too** — the
 *  signature of an instrument that resolves nothing rather than of a broken claim).
 *
 *  **THE REPAIR**: the artifact is anchored on `REPO` through the repo-root `docs/`
 *  prefix it always meant — `'./docs/specs/…'` from `REPO` is byte-for-byte the same
 *  path as `'./../docs/specs/…'` from `TESTS_DIR`, so **the CLAIM is unchanged** (the
 *  frozen artifact is byte-identical to its measured digest) and only the
 *  instrument's resolution is corrected. */
const DOCS = (rel: string): string => fileURLToPath(new URL('./docs/' + rel, REPO))
export const SURFACE_ARTIFACT = DOCS('specs/store-core-module-store-core-graph-surface.md')
/** CONTROL ONLY — the PRE-REPAIR resolution, kept under a clearly-named helper so the
 *  control row can drive the malformed form in-line and PROVE it resolves outside the
 *  repo (`RCA-8(d)` / the `handlerBodyOf` repair's `oldBrokenHandlerBodyOf` precedent). */
export function oldOverResolvedSurfaceArtifactPath(): string {
  return fileURLToPath(new URL('./../docs/specs/store-core-module-store-core-graph-surface.md', REPO))
}
export const TEST_FILE = TEST('secure-exclusion.test.ts')

/** `§1.3` item 1 — THE FOUR FORBIDDEN PATHS, named so the list is checkable. */
export const FORBIDDEN_PATHS: readonly { label: string; path: string }[] = [
  { label: 'the store module (frozen field-1..7 content)', path: STORE_CORE_SRC },
  { label: 'the references module', path: STORE_REFS_SRC },
  { label: 'the frozen SURFACE ARTIFACT', path: SURFACE_ARTIFACT },
  { label: 'the tier-4 store module', path: SECURITY_STORE_SRC },
]

// ---- THE REGISTER'S OWN CONSTANTS (`§5.5` items 1/2, `§5.5.3`) --------------------------
/** `§5.5.3` item (9) — the per-row cap. */
export const REGISTER_ROW_CAP = 100
/** `§5.5.3` item (9) — the total cap. */
export const REGISTER_TOTAL_CAP = 400
/** `§4.3.1` — the stop rule. */
export const STOP_AFTER_CONSECUTIVE = 5

/** `§5.5.1` — THE DECLARED TERMS, in register order, nine of them.
 *
 *  **⟶ ANNOTATED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3, RED-SET REPAIR 2, PER
 *  `RCA-8(d)` (ANNOTATE-BESIDE — never a silent rewrite).**
 *
 *  **THE MEASURED FACT (this repair's own reading of the executed register):** the
 *  nine rows carry their declared terms in register order as
 *  **`P-EX-IM-1` 12 · `P-EX-IM-2` 12 · `P-EX-IM-3` 10 · `P-EX-SM-1` 12 ·
 *  `P-EX-SM-2` **14** · `P-EX-SM-3` 12 · `P-EX-TP-1` 12 · `P-EX-TP-2` 12 ·
 *  `P-EX-IM-4` 10**, `drives.length === term` for every row.  That is **exactly
 *  `§5.5.1`'s per-row TABLE** — its row `# 5` is `P-EX-SM-2`/`S-EX-REARM-1` with
 *  term `14` (`7` drive cells × `2` readings) and its row `# 6` is
 *  `P-EX-SM-3`/`S-EX-BOOT-1` with term `12` (`7` input classes + `3` order
 *  readings + `2` persistence readings) — and this array prints that table's terms
 *  in that table's row order.  **NO TERM'S `VALUE` MOVED IN THIS REPAIR**: the `14`
 *  is still `P-EX-SM-2`'s and the `12` is still `P-EX-SM-3`'s, exactly as the table
 *  declares; what the repair re-pinned is the ROW ORDER (`P-EX-IM-4` LAST, per
 *  `§5.5.1`'s row numbering).
 *
 *  **⟶ REPORTED SPEC DISCREPANCY (a `docs/specs/*.md` amendment the TestWriter may
 *  not make), recorded rather than smoothed away:** `§5.5.1`'s printed arithmetic
 *  line (line 1219; the identical string is re-printed in `§5.5` item 2's line 1194
 *  and `§5.5.1`'s heading line 1198) reads **`106 = 12 + 12 + 10 + 12 + 12 + 14 +
 *  12 + 12 + 10`**, i.e. `12, 14` in positions `5`, `6` — the TRANSPOSE of its own
 *  table's rows `# 5`/`# 6`.  The two readings are arithmetically
 *  indistinguishable: the total (`106`), the chain's multiset, the `P-IM` subtotal
 *  (`12 + 12 + 10 + 10 = 44`), the `P-TP` subtotal (`12 + 12 = 24`) and the `P-SM`
 *  subtotal (`12 + 14 + 12 = 38`) all hold under either order.  **So no property, no
 *  row, no term value and no total is affected — only the intra-`P-SM` order of two
 *  adjacent rows — and the per-row TABLE governs the per-row pairing.**  The
 *  arithmetic line's positions `5`/`6` are the thing to reconcile (they should read
 *  `12 + 14`); the finding is REPORTED to the supervisor, not resolved here.  **The
 *  declared total is still `106` and is still the sum of these nine terms.** */
export const DECLARED_TERMS: readonly number[] = [12, 15, 13, 13, 14, 12, 12, 12, 10]
/* **⟶ ANNOTATED 2026-10-05 (GATE 4 RED PASS — the annotation ABOVE is the GATE-3
 * reading and is kept byte-for-byte).  THREE TERMS MOVED because this pass authored
 * SEVEN new drive cells for the adversarial pass's host findings: `P-EX-IM-2`
 * `12 -> 15`, `P-EX-IM-3` `10 -> 13`, `P-EX-SM-1` `12 -> 13`; the other six terms,
 * every row id, every strategy id, every property and both caps are unmoved.  The
 * spec's `§5.5.1` figures are preserved as `SPEC_AS_FILED_*` below and the `+7`
 * delta is REPORTED as the spec-amendment finding (`§1.3` item 10).** */
/** **THE SPEC'S AS-FILED ARITHMETIC — KEPT SO THE DELTA IS PRINTED BESIDE IT**
 *  (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; `RCA-8(d)` annotate-beside).
 *
 *  These are `§5.5.1`'s OWN printed figures, byte-for-byte as filed: the
 *  arithmetic line `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`, the chain
 *  `12 -> 24 -> 34 -> 46 -> 58 -> 72 -> 84 -> 96 -> 106`, and the subtotals
 *  `P-IM 44 + P-SM 38 + P-TP 24 = 106`.
 *
 *  **THEY ARE NOT THE OPERATIVE TERMS OF THIS REGISTER** (`DECLARED_TERMS` above
 *  is) and they are NOT a second authority: they exist so that (a) each row's
 *  as-filed figure stays visible beside its operative figure, and (b) the pass
 *  that changed three terms PRINTS the delta instead of hiding it. **THE DELTA IS
 *  `+7` ON THE TOTAL (`113` vs `106`) BECAUSE THIS PASS AUTHORED SEVEN NEW DRIVE
 *  CELLS** — `P-EX-IM-2` +3 (`A-1`: the live transition, the resource
 *  counterpart, the positive control), `P-EX-IM-3` +3 (`A-2`: the real
 *  transition's three obligations, the epoch reader, the reply-turn stale arm)
 *  and `P-EX-SM-1` +1 (`A-3`: the `T-2(d)` widen cell) — each required by an
 *  adversarial finding, and **every pre-existing term, row, strategy id, property
 *  and cap is unmoved.** The spec's `§5.5.1` table and its arithmetic paragraph
 *  therefore OWE an amendment (a TestWriter may not make it: `§1.3` item 10), and
 *  the amended form must re-print the total WITH its terms exactly as this
 *  register does. */
export const SPEC_AS_FILED_TERMS: readonly number[] = [12, 12, 10, 12, 12, 14, 12, 12, 10]
/** **THE AS-FILED PER-ROW TABLE PAIRING** — the same nine `§5.5.1` figures, in the
 *  spec TABLE's own ROW order, which is the PER-ROW AUTHORITY (`§5.5.1`'s own dated
 *  annotation: the table numbers row `#5` = `P-EX-SM-2` at `14` and row `#6` =
 *  `P-EX-SM-3` at `12`, while the arithmetic line above transposes those two
 *  positions).  **A PER-ROW DELTA MUST BE MEASURED AGAINST THIS ARRAY**, because
 *  pairing the arithmetic line's positions `5`/`6` to the rows would report a
 *  phantom `+2` on `P-EX-SM-2` and `-2` on `P-EX-SM-3` — the transpose artefact,
 *  not a term move.  The two arrays sum to the SAME `106`, so the TOTAL delta is
 *  unaffected by which is used. */
export const SPEC_AS_FILED_TABLE_TERMS: readonly number[] = [12, 12, 10, 12, 14, 12, 12, 12, 10]
/** The as-filed total — the sum of the as-filed terms above. */
export const SPEC_AS_FILED_TOTAL = 106
/** The as-filed per-type subtotals (`§5.5.1`: `44 + 38 + 24 = 106`). */
export const SPEC_AS_FILED_SUBTOTALS: { readonly im: number; readonly sm: number; readonly tp: number } = { im: 44, sm: 38, tp: 24 }
/** The per-row term MOVES this pass made, in register order — named so the delta is
 *  printed PER ROW rather than as a bare total. Every row not listed reads `0`. */
export const TERM_MOVES: Readonly<Record<string, number>> = {
  'P-EX-IM-2': 3, 'P-EX-IM-3': 3, 'P-EX-SM-1': 1,
}
/** `SPEC_AS_FILED_TERMS`' report, in the same shape `declaredTotalReport()` returns
 *  — so the delta is printed through ONE formatter, never by hand-typed arithmetic. */
export function specAsFiledTotalReport(): { terms: readonly number[]; sum: number; chain: string } {
  const chain: number[] = []
  let running = 0
  for (const term of SPEC_AS_FILED_TERMS) {
    running += term
    chain.push(running)
  }
  return { terms: SPEC_AS_FILED_TERMS, sum: running, chain: chain.join(' -> ') }
}
/** `§5.5.1` — the nine row ids, IN THE ORDER THE REGISTER EXECUTES THEM.
 *
 *  **⟶ CORRECTED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3, RED-SET REPAIR 2** — the
 *  as-filed array carried `P-EX-IM-4` **FOURTH** while the already-repaired
 *  `STRATEGY_IDS` carried its id (`S-EX-ISOL-1`) **NINTH**, so the two arrays this
 *  module and `secure-exclusion.test.ts` assert are the LOCKSTEP PARTNERS of the
 *  executed rows disagreed with each other.  `§5.5.1` numbers `P-EX-IM-4` row
 *  `# 9`, so it sits LAST here — and `registerSpecs` is now the third member of
 *  the lockstep (`rows[i].id === REGISTER_ROW_IDS[i]`, `rows[i].strategyId ===
 *  STRATEGY_IDS[i]`, asserted in the test file).  **No id's text changed — only
 *  its position**, and the register still executes exactly the same nine rows with
 *  exactly the same drives and terms.
 *
 *  **THE INTRA-`P-SM` ORDER (`P-EX-SM-2` before `P-EX-SM-3`)** is the order
 *  `§5.5.1`'s printed arithmetic line (`12 + 12 + 14` for the `P-SM` group), its
 *  declared total (`106`) and its chain (`… 58 → 72 → 84 …`) are written in, and
 *  therefore the order in which the executed rows' terms reproduce this module's
 *  `DECLARED_TERMS` — see that constant's annotation for the reported discrepancy
 *  with the spec TABLE's row numbers `# 5`/`# 6`. */
export const REGISTER_ROW_IDS: readonly string[] = [
  'P-EX-IM-1', 'P-EX-IM-2', 'P-EX-IM-3',
  'P-EX-SM-1', 'P-EX-SM-2', 'P-EX-SM-3',
  'P-EX-TP-1', 'P-EX-TP-2',
  'P-EX-IM-4',
]

/** `§5.5.1` — nine strategy ids, one per row (`S-EX-*`), IN REGISTER ORDER.
 *
 *  **⟶ ORDER CORRECTED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3, KICK-BACK
 *  OUTCOME (a)** — the as-filed array carried `S-EX-ISOL-1` FOURTH (mirroring the
 *  `registerSpecs` row order that was itself wrong).  `S-EX-ISOL-1` is
 *  `P-EX-IM-4`'s strategy id and `§5.5.1` places that row NINTH, so the id must sit
 *  NINTH for the array to be the lockstep partner of `REGISTER_ROW_IDS` it is
 *  asserted against. **No id's text changed — only its position**, and the register
 *  still executes exactly the same nine rows with exactly the same drives. */
export const STRATEGY_IDS: readonly string[] = [
  'S-EX-STATE-1', 'S-EX-TURN-1', 'S-EX-EPOCH-1',
  'S-EX-MACH-1', 'S-EX-REARM-1', 'S-EX-BOOT-1',
  'S-EX-RFUS-1', 'S-EX-CHAN-1',
  'S-EX-ISOL-1',
]

/** `§5.5.2` item 3 — the `(bounded)` set is EMPTY: no row draws. */
export const BOUNDED_ROWS: readonly string[] = []

/** `§1.3` item 1 / `§5.5.1`'s `P-EX-IM-2` cell (k) — THE MEASURED FILE BYTE-PINS.
 *  DISTINGUISHED FROM THE ARTIFACT SPAN FIGURE per `docs/specs/store-security.md`'s
 *  attribution annotation (the `G3` gate-4 doc-review item 4): `sha256:29772ac7…` is
 *  the frozen ARTIFACT's SPAN digest at the `HYDRATE-1` head (the
 *  `store-core-module-store-core-graph-surface.md` fields-1–7 span), NEVER a FILE
 *  hash of the store module's bytes. **A later pass re-deriving the byte-pin MUST
 *  quote the file hashes; `29772ac7…` is never a file-pin figure.** */
export const MEASURED_FILE_PINS: Readonly<Record<string, string>> = {
  'renderer/store-core-graph.ts': '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450',
  'renderer/store-graph-references.ts': '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
}
/** The ARTIFACT SPAN figure — recorded here so it is never mistaken for a file pin. */
export const ARTIFACT_SPAN_FIGURE = '29772ac7'
/** `§1.3` item 1 — the surface artifact's MEASURED file pin.
 *
 *  **THIS IS THIS PASS'S MEASUREMENT OF THE LIVE ARTIFACT FILE** — computed with
 *  `node:crypto` over `SURFACE_ARTIFACT`'s bytes, i.e. over
 *  `<repo>/docs/specs/store-core-module-store-core-graph-surface.md`.  **IT IS
 *  NEITHER OF THE TWO `MEASURED` MODULE PINS ABOVE, AND IT IS NOT THE ARTIFACT
 *  SPAN FIGURE** — the three figures are DISTINCT and must never be conflated:
 *  1. `MEASURED_FILE_PINS['renderer/store-core-graph.ts']` = `0664c52f…` — the
 *     store MODULE file's digest (spec-pinned).
 *  2. `MEASURED_FILE_PINS['renderer/store-graph-references.ts']` = `5c0c1a97…` —
 *     the references MODULE file's digest (spec-pinned).
 *  3. `ARTIFACT_SPAN_FIGURE` = `29772ac7…` — the frozen artifact's **fields-1–7
 *     SPAN** digest at the `HYDRATE-1` head, **NEVER a file hash**, per
 *     `docs/specs/store-security.md`'s attribution annotation (the `G3` gate-4
 *     doc-review item 4) — the rule the spec itself cites at `§1.3` item 1.
 *  4. **THIS VALUE** — the artifact FILE's whole-file digest.  `docs/specs/
 *     secure-exclusion.md` pins no artifact-FILE digest, so the pin is taken here
 *     and labelled as **this pass's reading**; the `FS-EX-15` row asserts it
 *     against the live bytes.
 *
 *  **⟶ UPDATED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3** (the same kick-back that
 *  repaired the path above): at red-authoring the value below could not have been
 *  confirmed by the instrument at all, because the path resolved outside the repo
 *  and `sha256Of()` answered `'ABSENT'`.  With the resolution repaired, this pass
 *  re-measured the live file directly: **`9dea2002…` — CONFIRMED BY INDEPENDENT
 *  MEASUREMENT (`sha256sum docs/specs/store-core-module-store-core-graph-surface.md`
 *  and the supervisor's own reading agree byte-for-byte).** */
export const SURFACE_ARTIFACT_MEASURED = '9dea200277ed645e6f5c513754e26c1707a8bc55e4490008f738928edffc4446'

/** CONTROL ONLY — THE AS-FILED `registerSpecs` ROW ORDER, at the authoring site
 *  where it must be driven in-line: **`P-EX-IM-4` listed FOURTH while `§5.5.1`
 *  numbers that row NINTH** (and, in lockstep, `REGISTER_ROW_IDS` carried it
 *  fourth too, while `STRATEGY_IDS` already carried `S-EX-ISOL-1` ninth — the
 *  disagreement RED-SET REPAIR 2 closed).  This constant exists ONLY so the control
 *  row can PROVE the pairing assertion can fail (`RCA-8(d)` / the `handlerBodyOf`
 *  repair's precedent); the register itself now executes `P-EX-IM-4` LAST.
 *
 *  **⟶ RE-PINNED 2026-10-05 (RED-SET REPAIR 2)** — it previously held the
 *  `P-EX-IM-4`-LAST shape, because at that pass `REGISTER_ROW_IDS` declared the row
 *  FOURTH.  With the declared order moved to `P-EX-IM-4` LAST, the mutant that must
 *  FAIL is the as-filed one, which is what is held here. */
export const OLD_REGISTER_ROW_ORDER_CONTROL_ONLY: readonly string[] = [
  'P-EX-IM-1', 'P-EX-IM-2', 'P-EX-IM-3', 'P-EX-IM-4',
  'P-EX-SM-1', 'P-EX-SM-2', 'P-EX-SM-3',
  'P-EX-TP-1', 'P-EX-TP-2',
]

/** THE DECLARED ORDER PAIRING, AS ONE FUNCTION — so the assertion and its control
 *  drive the SAME predicate. Given the executed rows' ids and the register's
 *  declared ids, it answers whether the executed order IS the declared order
 *  (`§5.5.1`, asserted by `the register executes all 9 rows …`). */
export function declaredOrderHolds(executedIds: readonly string[], declaredIds: readonly string[]): boolean {
  return executedIds.length === declaredIds.length && executedIds.every((id, i) => id === declaredIds[i])
}

/** The exclusion's two closed refusal tokens (`§2.5` items 1/3). */
export const EXCLUSION_CLOSED = 'exclusion-closed'
export const MALFORMED_STATE = 'malformed-state'
/** The two closed state tokens (`§0A` item 1). */
export const STATE_MCP_ENABLED = 'mcp-enabled'
export const STATE_MCP_DISABLED = 'mcp-disabled'

/** THE DECLARED TOTAL, printed WITH its terms (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). */
export function declaredTotalReport(): { terms: readonly number[]; sum: number; chain: string } {
  const chain: number[] = []
  let running = 0
  for (const term of DECLARED_TERMS) {
    running += term
    chain.push(running)
  }
  return { terms: DECLARED_TERMS, sum: running, chain: chain.join(' -> ') }
}

// ---- THE SURFACE RESOLUTION (module absence is data, never an error) --------------------
/** `resolveRegisterSurface()` — the fragment-assembled dynamic import so this
 *  module's own bytes carry no resolvable specifier for a module that does not
 *  exist yet. Every failure mode (a missing file, a missing export, a throwing
 *  constructor) is returned as `reason`, and the caller turns it into a counted
 *  BROKEN attempt (`§4.1.3`'s ABSENT-symbol class). */
export interface ResolvedSurface {
  SecurityGate: (new (initial?: unknown) => Record<string, unknown>) | null
  exclusionAllowsWork: ((state: unknown) => boolean) | null
  ProvidentMcpServer: (new (opts: unknown) => Record<string, unknown>) | null
  RendererBackend: (new (opts?: unknown) => Record<string, unknown>) | null
  reason: string
}

let cachedSurface: ResolvedSurface | null = null

export async function resolveRegisterSurface(): Promise<ResolvedSurface> {
  if (cachedSurface) return cachedSurface
  const out: ResolvedSurface = {
    SecurityGate: null, exclusionAllowsWork: null, ProvidentMcpServer: null, RendererBackend: null, reason: '',
  }
  if (!existsSync(SECURITY_SRC)) {
    out.reason = 'ABSENT: src/main/security.ts does not exist'
    cachedSurface = out
    return out
  }
  try {
    const securitySpec = './../src/main/' + 'secur' + 'ity.js'
    const sec = (await import(/* @vite-ignore */ securitySpec)) as Record<string, unknown>
    out.SecurityGate = (sec.SecurityGate as ResolvedSurface['SecurityGate']) ?? null
    out.exclusionAllowsWork = (sec.exclusionAllowsWork as ResolvedSurface['exclusionAllowsWork']) ?? null
    const mcpSpec = './../src/main/' + 'mcp-' + 'server.js'
    const mcp = (await import(/* @vite-ignore */ mcpSpec)) as Record<string, unknown>
    out.ProvidentMcpServer = (mcp.ProvidentMcpServer as ResolvedSurface['ProvidentMcpServer']) ?? null
    out.RendererBackend = (mcp.RendererBackend as ResolvedSurface['RendererBackend']) ?? null
  } catch (e) {
    out.reason = `ABSENT: the surface import threw — ${e instanceof Error ? e.message : String(e)}`
  }
  cachedSurface = out
  return out
}

/** THE ABSENT-SYMBOL REPORTER — a drive that needs a symbol the module does not
 *  export throws THIS, so the attempt is BROKEN with the DECLARED reason (the
 *  clause id), never a bare `TypeError: x is not a function`. */
export function absent(clause: string, what: string): never {
  throw new Error(`RED (absent symbol): ${what} does not exist — ${clause}`)
}

// ---- THE HARNESS (`§5.5` items 1/3, `§4.3.1`) -------------------------------------------
export interface Drive {
  readonly label: string
  readonly run: () => void | Promise<void>
}

export interface RegisterRow {
  readonly id: string
  /** `P-IM` | `P-SM` | `P-TP` — the row's DECLARED TYPE, never its ordinal. */
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  /** The DECLARED TERM: a DRIVE COUNT. */
  readonly term: number
  readonly property: string
  readonly drives: readonly Drive[]
}

export interface RowReport {
  readonly id: string
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  readonly declaredTerm: number
  readonly attemptsRun: number
  readonly abandoned: number
  readonly held: number
  readonly broken: number
  readonly state: 'held' | 'broken' | 'un-run' | 'stopped'
  readonly maxConsecutiveFailures: number
  readonly readings: readonly string[]
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

/** THE EXECUTOR — every row's FULL declared term, sequentially, in register
 *  order; the caps enforced (`<=100`/row, `<=400` total, asserted by the caller);
 *  STOP AFTER 5 CONSECUTIVE FAILURES across the register. An un-run row is a
 *  FAILURE, never a pass (`§5.5.1`, `§5.5.2` item 3). A row whose `term` is not
 *  its `drives.length` is a FAILURE (the table is the CLOSED input set). */
export async function executeRegister(
  rows: readonly RegisterRow[],
  opts?: { honourStopRule?: boolean },
): Promise<ExecReport> {
  // THE STOP RULE'S INTERPRETATION (`§4.3.1` / `§5.5.1`), RECORDED SO NO LATER
  // PASS OVER-READS IT — the sibling's own recorded reading
  // (`tests/store-security.test.ts`'s header block, the §5.5.1 paragraphs):
  // "STOP AFTER 5 CONSECUTIVE FAILURES is implemented as the RUN-AWAY guard for
  // a drive — with every row a deterministic FINITE closed table (`§5.5.1`: 'NO
  // seed, NO generator'; no row carries a `(bounded)` marking) no attempt drive
  // can loop, so the guard has no triggerable condition and the register cannot
  // be truncated mid-evidence".  Truncation would directly contradict `§4.3.2`'s
  // "the register's rows MUST fail first" and `§4.1.3`'s "the fail-states the
  // red MUST drive, each named" — at RED every row fails, so a literal
  // stop-at-5 would leave 8 of the 9 rows UN-RUN and destroy the very evidence
  // the red set exists to produce.  `opts.honourStopRule` therefore defaults to
  // FALSE so the register COMPLETES its evidence; the caller reports BOTH
  // readings — the completed one and the literal stop-at-5 one — and
  // `registerStoppedAt` carries the literal reading's row.
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
    if (stopped) {
      reports.push({
        id: row.id, type: row.type, strategyId: row.strategyId, declaredTerm: row.term,
        attemptsRun: 0, abandoned: row.term, held: 0, broken: 0, state: 'un-run',
        maxConsecutiveFailures: 0, readings: ['UN-RUN — the stop rule fired before this row; an un-run row is a FAILURE, never a pass (AGENTS.md item 11(b))'],
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
    for (let i = 0; i < row.drives.length; i++) {
      const drive = row.drives[i]
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
        readings.push(`BROKEN — ${drive.label}: ${detail}`)
      }
      if (honourStopRule && consecutive >= STOP_AFTER_CONSECUTIVE) {
        stopped = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures at ${row.id} drive "${drive.label}" — STOP (AGENTS.md item 11(b))`
        abandoned = row.drives.length - (i + 1)
        rowStopped = true
        break
      }
    }
    const state: RowReport['state'] = rowStopped ? 'stopped' : broken === 0 ? 'held' : 'broken'
    if (state === 'held') rowsHeld += 1
    else rowsBroken += 1
    if (state !== 'held') registerReasons.push(`${row.id} (${row.strategyId}) — ${broken} broken of ${held + broken} attempted`)
    reports.push({
      id: row.id, type: row.type, strategyId: row.strategyId, declaredTerm: row.term,
      attemptsRun: held + broken, abandoned, held, broken, state, maxConsecutiveFailures: maxConsec,
      readings,
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

// ---- SOURCE PROBES (the static/existence rows ride the same reads) ----------------------
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

// ---- THE WINDOW RECEIVER (the `[H]` fixture the manual-UI drives read) -------------------
/** **THE `window.provident` RECEIVER'S DECLARED MEMBER SET (`§2.4` item 4 / `§2.PAR`,
 *  `PAR-8`/`PAR-9`/`PAR-13`) — and the string row the receiver carries on a REFUSAL.**
 *
 *  **⟶ INSTALLED 2026-10-05 BY THE AUTHOR ROLE AT GATE 3** (kick-back outcome (a);
 *  the fixture gap the supervisor named): the `beforeAll`'s `installShim()` sets
 *  `globalThis.document` and **NOT** `globalThis.window`, so the drives that read
 *  `globalThis.window.provident.security.setExclusion` — `M-EX-3`, `FS-EX-8`, and
 *  the `P-EX-TP-2` register row's two legal-token payloads, the malformed-payload
 *  drive and the no-throw drive — reached an ABSENT receiver and reported the SAME
 *  red for every payload class, including the ones that must be GREEN.
 *
 *  **WHY A RECEIVER IS THE RIGHT INSTRUMENT (and nothing in `src/` can supply it):**
 *  the member's real home is `contextBridge.exposeInMainWorld('provident', bridge)`
 *  (`src/main/preload.ts:140`), which is **Electron-runtime-only** — under node
 *  vitest there is no `contextBridge` and no renderer world, so no `src/` code path
 *  can install this receiver.  The drives' subject is the **DECLARED SURFACE**
 *  (`window.provident.security.setExclusion` + its answered form), exactly as the
 *  file's own `callSetExclusion` helper already documents; the receiver is the
 *  fixture, and `src/main/main.ts`'s `IPC_SECURITY_EXCLUSION` handler remains
 *  `M-EX-2`/`M-EX-7`/`P-EX-TP-2`'s **static** reading (`handlerBodyOf`).
 *
 *  **THE DISCIPLINE THAT KEEPS THE FIXTURE HONEST — NO CLAIM IS WEAKENED:**
 *  - the member set is `['get', 'set', 'setExclusion']` — the SAME declared
 *    `2 → 3` member set the preload census row measures (`§1.3` item 9);
 *  - `get`/`set` are present but **DELIBERATELY UNIMPLEMENTED stubs that THROW**:
 *    NOTHING in this red set calls them, so they can never silently answer;
 *  - `setExclusion` **MIRRORS `§2.4` item 4's DECLARED CONTRACT** (the two legal
 *    tokens applied; EVERY outside value refused as a VALUE with `'malformed-state'`
 *    and the UNCHANGED state) over its OWN local state.  It is a fixture, so a
 *    transition driven through it is **NOT** verification that `src/` implements
 *    the contract — that is `M-EX-2`/`M-EX-3`'s `src/`-side reading and
 *    `P-EX-TP-2`'s two driver cells;
 *  - the receiver is the LAST thing `beforeAll` installs and is installed on
 *    `globalThis` only for the duration of the suite. */
export const WINDOW_RECEIVER_MEMBERS: readonly string[] = ['get', 'set', 'setExclusion']

/** Install `globalThis.window.provident` with the declared member set. Returns the
 *  receiver so a control can prove the receiver is LIVE and the pre-repair state
 *  (no receiver at all) is reproducible. */
export function installWindowReceiver(): {
  window: Record<string, unknown>
  state: () => string
} {
  let current = STATE_MCP_ENABLED
  const security = {
    get: (): never => {
      throw new Error('fixture: `security.get` is NOT driven by this red set (the receipt row is M-EX-7\'s static reading)')
    },
    set: (): never => {
      throw new Error('fixture: `security.set` is NOT driven by this red set (the receipt row is M-EX-7\'s static reading)')
    },
    setExclusion: (state: unknown): { applied: boolean; state: string; reason?: string } => {
      if (state === STATE_MCP_ENABLED || state === STATE_MCP_DISABLED) {
        current = state
        return { applied: true, state: current }
      }
      return { applied: false, state: current, reason: MALFORMED_STATE }
    },
  }
  const win = { provident: { security } }
  ;(globalThis as Record<string, unknown>).window = win
  return { window: win as unknown as Record<string, unknown>, state: () => current }
}
export { TESTS_DIR, REPO }
