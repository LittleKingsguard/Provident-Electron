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

import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

// ---- PATHS -----------------------------------------------------------------------------
const TESTS_DIR = new URL('./', import.meta.url)
const REPO = new URL('./../', TESTS_DIR)
export const SRC = (rel: string): string => fileURLToPath(new URL('./src/' + rel, REPO))
export const TEST = (rel: string): string => fileURLToPath(new URL('./' + rel, TESTS_DIR))

export const SECURITY_STORE_SRC = SRC('main/security-store.ts')
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
export const DECLARED_OPTION_CENSUS = 2
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
 *  → `a98273b8…` `ADV-1` → `8ed09c97…` the `§2.6` write-lock amendment. The red set keeps all
 *  four awake and distinct; the CURRENT bytes are asserted against the FOURTH (`8ed09c97…`) at
 *  red, and the fifth move is `§7b` row 1's owner. */
export const SECURITY_STORE_PIN_CHAIN: readonly string[] = [
  'c7359530', // as filed
  '99618ac2', // S3's green
  'a98273b8', // ADV-1
  '8ed09c97', // the §2.6 write-lock amendment (the operative term)
]
export const SECURITY_STORE_PIN = '8ed09c97358b0eaab81b60d665519498552cd6f20bb748afceaff030494f0419'

// ---- THE REGISTER'S DECLARED NUMBERS (`§5.5.1`) -----------------------------------------
export const REGISTER_ROW_CAP = 100
export const REGISTER_TOTAL_CAP = 400
export const STOP_AFTER_CONSECUTIVE = 5

export const REGISTER_ROW_IDS: readonly string[] = [
  'P-T4-TP-1', 'P-T4-TP-2', 'P-T4-IM-1', 'P-T4-IM-2', 'P-T4-TP-3',
  'P-T4-IM-3', 'P-T4-SM-1', 'P-T4-TP-4', 'P-T4-IM-4', 'P-T4-IM-5',
]
export const DECLARED_TERMS: readonly number[] = [12, 10, 12, 8, 14, 10, 10, 16, 8, 8]
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
  readonly declaredTerm: number
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
    if (stopped) {
      reports.push({
        id: row.id, type: row.type, strategyId: row.strategyId, declaredTerm: row.term,
        attemptsRun: 0, abandoned: row.term, held: 0, broken: 0, state: 'un-run',
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
        readings.push(`BROKEN — ${drive.label}: ${detail.slice(0, 240)}`)
      }
      if (honourStopRule && consecutive >= STOP_AFTER_CONSECUTIVE) {
        stopped = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures at ${row.id} drive "${drive.label}" — STOP`
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
      attemptsRun: held + broken, abandoned, held, broken, state,
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
  lines.push('REGISTER-ATTEMPT-TOTALS (§5.5.1 — printed WITH their terms):')
  lines.push(`  TOTAL ${r.declaredTotal} = ${r.declaredTerms.join(' + ')}  (chain ${r.chain})`)
  lines.push(`  subtotals BY TYPE — P-IM ${r.subtotals.im} · P-SM ${r.subtotals.sm} · P-TP ${r.subtotals.tp} — ${r.subtotals.im} + ${r.subtotals.sm} + ${r.subtotals.tp} = ${r.subtotals.im + r.subtotals.sm + r.subtotals.tp}`)
  lines.push(`  caps: largest row ${Math.max(...r.rows.map((x) => x.declaredTerm))} ≤ ${REGISTER_ROW_CAP} · total ${r.declaredTotal} ≤ ${REGISTER_TOTAL_CAP} (headroom ${REGISTER_TOTAL_CAP - r.declaredTotal})`)
  lines.push(`  attempts executed: ${r.attemptsExecuted} · rows executed: ${r.rowsExecuted} of ${r.rows.length} · un-run: ${r.unrunRows.length === 0 ? 'none' : r.unrunRows.join(', ')}`)
  lines.push(`  no seed, no generator, no Math.random — every row is the closed input set (§5.5.2 item 3)`)
  lines.push(`  registerStoppedAt: ${r.stoppedAtRow === null ? 'null' : r.stoppedAtRow} (the completed reading; the literal stop-after-5 reading is reported beside it)`)
  lines.push('')
  lines.push('REGISTER-ROW-OUTCOMES (executed run):')
  for (const o of r.rows) {
    lines.push(`  ${o.id} [${o.type}] ${o.strategyId}: declared ${o.declaredTerm} → attempts ${o.attemptsRun} · held ${o.held} · BROKEN ${o.broken} · state ${o.state} · maxConsecutiveFailures ${o.maxConsecutiveFailures}`)
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
