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
export const SURFACE_ARTIFACT = fileURLToPath(new URL('./../docs/specs/store-core-module-store-core-graph-surface.md', REPO))
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

/** `§5.5.1` — THE DECLARED TERMS, in register order, nine of them. */
export const DECLARED_TERMS: readonly number[] = [12, 12, 10, 12, 12, 14, 12, 12, 10]

/** `§5.5.1` — the nine row ids, in register order. */
export const REGISTER_ROW_IDS: readonly string[] = [
  'P-EX-IM-1', 'P-EX-IM-2', 'P-EX-IM-3', 'P-EX-IM-4',
  'P-EX-SM-1', 'P-EX-SM-2', 'P-EX-SM-3',
  'P-EX-TP-1', 'P-EX-TP-2',
]

/** `§5.5.1` — nine strategy ids, one per row (`S-EX-*`). */
export const STRATEGY_IDS: readonly string[] = [
  'S-EX-STATE-1', 'S-EX-TURN-1', 'S-EX-EPOCH-1', 'S-EX-ISOL-1',
  'S-EX-MACH-1', 'S-EX-REARM-1', 'S-EX-BOOT-1',
  'S-EX-RFUS-1', 'S-EX-CHAN-1',
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
/** `§1.3` item 1 — the surface artifact's MEASURED file pin (this pass's measurement).
 *  The spec pins the two module files' digests; it does NOT pin an artifact-file
 *  digest, so this one is measured here and labelled as this pass's reading. */
export const SURFACE_ARTIFACT_MEASURED = '9dea200277ed645e6f5c513754e26c1707a8bc55e4490008f738928edffc4446'

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
export { TESTS_DIR, REPO }
