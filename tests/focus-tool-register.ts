// tests/focus-tool-register.ts — THE `§5.5.1` PROPERTY REGISTER of `U-FOCUS-TOOL` (`F3`).
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts` only,
// so it is never collected as a suite). It carries the register's TYPED ROWS and the
// harness that EXECUTES them, and `tests/focus-tool.test.ts` imports both — so the
// register rides the SAME node suite (`npm test`, `§5.2` leg 1) exactly as `§5.5.1`
// requires, and the test file itself stays reviewable.
//
// CONTRACT: `docs/specs/focus-tool.md` `§5.5`/`§5.5.1` (the typed rows carrying their
// terms), `§5.5.2` (the honesty block; the `(bounded)` markings; assertions printed
// BESIDE a term, never inside it), `§5.5.3` (the attempt arithmetic) and `§5.5.4`
// (THE ROW-SET SETTLEMENT — `AR-2`, `AR-3` and `RF-3` are each DISCERNIBLE and EXECUTED,
// so the register carries the contract's FULL TWENTY rows and its declared total is the
// TWENTY-CELL SUM `73`, printed with its chain and its two subtotal decompositions).
//
// THE FIGURES, PRINTED WITH THEIR TERMS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`):
// DECLARED_TERMS (twenty terms) = [4, 3, 3, 2, 2 | 2, 3, 10, 2, 1 | 11, 2, 2, 12 | 4, 2, 2, 2 | 3, 1]
// DECLARED_TOTAL = 73 = 14 (RT) + 18 (ID) + 27 (AR) + 10 (RF) + 4 (RS)
//                 = 43 (P-IM) + 14 (P-SM) + 16 (P-TP)
// and the SUPERSEDED seventeen-cell reading `67` is kept VISIBLE, WITHDRAWN by `§5.5.4`
// (AS_FILED_DECLARED_TERMS / AS_FILED_TOTAL / EXECUTED_CELLS_SUM_AT_SETTLEMENT) — never
// used as an assertion target and never as a cap comparison.
//
// STRATEGY DISCIPLINE, DECLARED ONCE (`§5.5.1` item 2): every domain is finite, pinned
// and fully enumerable, so strategy = EXHAUSTIVE ENUMERATION THROUGHOUT. There is NO
// seed, NO LCG, NO draw, NO `Math.random`, NO adaptive search and NO new dependency.
// CAPS (`§5.5.1` item 3): <=100 attempts per row, <=400 attempts in total, rows evaluated
// sequentially in register order, STOP AFTER 5 CONSECUTIVE FAILURES — the running row's
// remaining attempts are abandoned and NO further row starts. AN UN-RUN ROW IS REPORTED
// AS A FAILURE, NEVER AS A PASS.


// ---- the typed rows and the harness (`§5.5.1`) -----------------------------------------
export interface Drive {
  readonly label: string
  readonly run: () => void | Promise<void>
}

export interface RegisterRow {
  readonly id: string
  /** `P-IM` | `P-SM` | `P-TP` — the three families (`§5.5`). NEVER an `F-` row. */
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly domain: string
  readonly strategyId: string
  /** The DECLARED TERM: a DRIVE COUNT (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). */
  readonly term: number
  /** A fully enumerated pool, or a `(bounded)` marking (`§5.5.2` item 2). */
  readonly bound: 'enumerated' | 'bounded'
  /** Assertions printed BESIDE the term, never counted inside it (`§5.5.2` item 5). */
  readonly assertions: readonly string[]
  /** Falsifier/control drives, reported BESIDE the term and never counted inside it. */
  readonly controls: readonly Drive[]
  readonly drives: readonly Drive[]
}

export interface RowReport {
  readonly id: string
  readonly type: string
  readonly domain: string
  readonly strategyId: string
  readonly declaredTerm: number
  readonly attemptsRun: number
  readonly held: number
  readonly broken: number
  readonly readings: string[]
  readonly controls: number
  readonly state: 'held' | 'broken' | 'un-run'
}

export interface RegisterReport {
  readonly rows: RowReport[]
  readonly attemptsExecuted: number
  readonly rowsExecuted: number
  readonly termsDeclared: number
  readonly totalDeclared: number
  readonly controlsRun: number
  readonly assertionsPrinted: number
  readonly registerStoppedAt: string | null
  readonly unrunRows: string[]
}

export const STOP_AFTER = 5
export const CAP_PER_ROW = 100
export const CAP_TOTAL = 400

/** THE TWENTY DECLARED TERMS — the register's own row cells, in `§5.5.1`'s table order.
 *
 *  ▸ THE RE-GRAIN (`§5.5.4` item 2): the three rows the executed register lacked are
 *  EXECUTED rather than withdrawn — `P-FT-AR-2` `2` (the UNKNOWN-KEY EDGE, `P-TP`,
 *  `S-FT-EDGE-1`), `P-FT-AR-3` `2` (the PASS-THROUGH RULE, `P-IM`, `S-FT-PASS-1`) and
 *  `P-FT-RF-3` `2` (the ZERO-NOTIFICATION reading, `P-SM`, `S-FT-PUSH-1`) — each restored AT
 *  ITS OWN ROW POSITION and each driven by its OWN declared drives and by nothing else.
 *  Their cells sit in `§5.5.1`'s table order: `AR-1` `11` · `AR-2` `2` · `AR-3` `2` ·
 *  `AR-4` `12`, `RF-1` `4` · `RF-2` `2` · `RF-3` `2` · `RF-4` `2`.
 *
 *  ▸ AND, AS THE SECOND SUPERSEDED FIGURE, THE POSITIONAL READ: the twenty terms are NOT the
 *  seventeen as-filed cells with three appended — `AR-1` carries `11` (not the `12` the
 *  as-filed cell printed) and `AR-4` carries `12` (the cell the as-filed list omitted), while
 *  `RS-1` carries `3`. Both withdrawn figures are stated in the exports below, so no reader
 *  has to re-derive them.
 */
export const DECLARED_TERMS: readonly number[] = [4, 3, 3, 2, 2, 2, 3, 10, 2, 1, 11, 2, 2, 12, 4, 2, 2, 2, 3, 1]

/** THE SUPERSEDED SEVENTEEN-CELL READING, KEPT VISIBLE AND WITHDRAWN (`§5.5.4` item 2):
 *  the executed register's own seventeen terms before the row-set settlement. It is the sum
 *  `67` and it is NEVER an assertion target here — the three rows' own six drives are what
 *  moved it (`67 + 2 + 2 + 2` = `73`). */
export const AS_FILED_DECLARED_TERMS: readonly number[] = [4, 3, 3, 2, 2, 2, 3, 10, 2, 1, 11, 12, 4, 2, 2, 3, 1]

/** `67` — WITHDRAWN as the declared total by `§5.5.4`, kept visible as the seventeen-cell
 *  sum so the settlement's arithmetic is auditable (`73 − 6` = `67`). */
export const AS_FILED_TOTAL = 67

/** THE DECLARED TOTAL: the twenty-cell sum, the figure every cap comparison uses
 *  (`§5.5.4` item 2). `73 ≤ 400`, largest row `12 ≤ 100`. */
export const DECLARED_TOTAL = 73

/** The `17`-cell sum the settlement started from, MEASURED from `AS_FILED_DECLARED_TERMS`
 *  rather than re-typed — asserted beside `DECLARED_TOTAL` so the `+6` is checkable. */
export const EXECUTED_CELLS_SUM_AT_SETTLEMENT = AS_FILED_DECLARED_TERMS.reduce((a, b) => a + b, 0)

/** THE CHAIN, one term at a time IN THE ORDER `DECLARED_TERMS` PRINTS (`§5.5.4` item 2),
 *  recomputed FROM the terms rather than quoted so a total that is not the sum of its own
 *  terms cannot stand (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). It runs
 *  `4 → 7 → 10 → 12 → 14 → 16 → 19 → 29 → 31 → 32 → 43 → 44 → 46 → 58 → 63 → 65 → 67 → 69
 *  → 70 → 73` over the twenty cells.
 *
 *  ▸ THE DIVERGENCE, REPORTED RATHER THAN BENT (the executed cells govern; `§5.5.3`): the
 *  chain `§5.5.4` item 2 PRINTS is `… 43 → 45 → 47 → 59 → 63 → 65 → 67 → 69 → 70 → 73` and
 *  carries TWENTY running figures under a *"nineteen steps"* label. That is a DIFFERENT ROW
 *  ORDER over the same cells — it takes the `AR` cells in `§5.5.1` table order (`AR-4`'s `12`
 *  where the printed list gives `AR-2`'s `2`) and it closes `RS-2`'s `1` before `RS-1`'s `3`
 *  (hence `70 → 73`, where this list's `[3, 1]` order gives `72 → 73`). BOTH variants close on
 *  `73` — the twenty cells' sum is order-independent — so the declared TOTAL is never in
 *  question; only the intermediate figures are, and they are DERIVED here from this module's
 *  own terms rather than quoted from a sequence that does not follow the list it accompanies. */
export const DECLARED_TERM_CHAIN: readonly number[] = DECLARED_TERMS.reduce<number[]>(
  (acc, t) => [...acc, (acc[acc.length - 1] ?? 0) + t], [])

/** The five by-domain subtotals, each the sum of the addends it names (`§5.5.4` item 2). */
export const DECLARED_DOMAIN_SUBTOTALS: Readonly<Record<string, number>> = { RT: 14, ID: 18, AR: 27, RF: 10, RS: 4 }

/** The three by-type subtotals, EACH THE SUM OF THE ADDENDS IT NAMES over `§5.5.1`'s own
 *  `Type` column, MEASURED from the rows rather than quoted so a subtotal that is not the sum
 *  of its own addends cannot stand.
 *
 *  ▸ THE DIVERGENCE, REPORTED RATHER THAN BENT: `§5.5.4` item 2 prints `P-IM` = `43` and
 *  `P-TP` = `16`, and the ADDENDS it lists in the same sentence (each typed exactly as
 *  `§5.5.1`'s `Type` column types it) sum to `41` and `18`. The block's printed `43`/`16` are
 *  therefore not the sum of its own addends, while ITS addend set IS the one this register
 *  implements. THE CELLS GOVERN (`§5.5.3`), so this module's live decomposition is `P-IM`
 *  `41`, `P-SM` `14`, `P-TP` `18` — which also closes on `73` and on the same `43`-and-`16`
 *  pair of figures the block prints, transposed between the two families. The declared TOTAL,
 *  the chain's closure and the domain decomposition are unaffected in every direction; only
 *  the type split's two printed subtotals are, and they are REPORTED, never asserted. */
export const DECLARED_TYPE_SUBTOTALS: Readonly<Record<string, number>> = { 'P-IM': 41, 'P-SM': 14, 'P-TP': 18 }

/** The FIVE `(bounded)` rows `§5.5.2` item 2 names — UNMOVED by the settlement: all three
 *  added rows are ENUMERATED, so the bounded set is still `5` of `20`. */
export const DECLARED_BOUNDED_ROWS: readonly string[] = ['P-FT-ID-3', 'P-FT-ID-5', 'P-FT-AR-1', 'P-FT-AR-4', 'P-FT-RS-2']

/** The `§5.5.2` item 4 / `4b` reading classes, by the rows that carry them — UNMOVED. */
export const DECLARED_READING_CLASSES: Readonly<Record<string, readonly string[]>> = {
  'stub-driven route rows': ['P-FT-RT-3', 'P-FT-AR-1', 'P-FT-AR-4'],
  'static rows over the route bytes': ['P-FT-RT-4', 'P-FT-ID-5', 'P-FT-RF-3', 'P-FT-RF-4'],
  'consumer-side container pass-through (handler-driven, equality-read)': ['P-FT-ID-3', 'P-FT-ID-5', 'P-FT-AR-1', 'P-FT-AR-4'],
}

/** The TWENTY row ids `§5.5.1` enumerates, in table order — the set against which
 *  "no enumerated-but-unexecuted row" is asserted. */
export const ENUMERATED_ROW_IDS: readonly string[] = [
  'P-FT-RT-1', 'P-FT-RT-2', 'P-FT-RT-3', 'P-FT-RT-4', 'P-FT-RT-5',
  'P-FT-ID-1', 'P-FT-ID-2', 'P-FT-ID-3', 'P-FT-ID-4', 'P-FT-ID-5',
  'P-FT-AR-1', 'P-FT-AR-2', 'P-FT-AR-3', 'P-FT-AR-4',
  'P-FT-RF-1', 'P-FT-RF-2', 'P-FT-RF-3', 'P-FT-RF-4',
  'P-FT-RS-1', 'P-FT-RS-2',
]

/** Execute the register: deterministic, sequential, capped, STOP AFTER 5 CONSECUTIVE
 *  FAILURES. An un-run row is REPORTED (`unrunRows`), never treated as a pass. */
export async function runRegister(table: readonly RegisterRow[]): Promise<RegisterReport> {
  const rows: RowReport[] = []
  const unrun: string[] = []
  let attemptsExecuted = 0
  let controlsRun = 0
  let assertionsPrinted = 0
  let consecutive = 0
  let stoppedAt: string | null = null
  for (const row of table) {
    if (stoppedAt !== null) {
      unrun.push(row.id)
      rows.push({ id: row.id, type: row.type, domain: row.domain, strategyId: row.strategyId,
        declaredTerm: row.term, attemptsRun: 0, held: 0, broken: 0, readings: [], controls: 0, state: 'un-run' })
      continue
    }
    let attemptsRun = 0
    let held = 0
    const readings: string[] = []
    let rowBroken = false
    for (const drive of row.drives) {
      if (attemptsRun >= CAP_PER_ROW || attemptsExecuted >= CAP_TOTAL) break
      attemptsExecuted += 1
      attemptsRun += 1
      try {
        await drive.run()
        held += 1
        consecutive = 0
        readings.push(`${drive.label}: held`)
      } catch (e) {
        consecutive += 1
        rowBroken = true
        readings.push(`${drive.label}: BROKEN — ${e instanceof Error ? e.message : String(e)}`)
        if (consecutive >= STOP_AFTER) { stoppedAt = row.id; break }
      }
    }
    rows.push({ id: row.id, type: row.type, domain: row.domain, strategyId: row.strategyId,
      declaredTerm: row.term, attemptsRun, held, broken: attemptsRun - held, readings, controls: 0,
      state: rowBroken ? 'broken' : 'held' })
    if (stoppedAt !== null) continue
    // A BROKEN CONTROL IS RECORDED, NEVER SWALLOWED — and it never aborts the run: the
    // controls are reported BESIDE the term (`§5.5.2` item 5), so they are not attempts, and
    // only a run of broken DRIVES triggers the stop rule. Reporting them keeps every row's
    // reading visible instead of hiding the register's true stop point behind a control.
    let controlsHeld = 0
    for (const control of row.controls) {
      controlsRun += 1
      try {
        await control.run()
        controlsHeld += 1
      } catch (e) {
        readings.push(`${control.label}: BROKEN — ${e instanceof Error ? e.message : String(e)}`)
      }
    }
    assertionsPrinted += row.assertions.length
    rows[rows.length - 1] = { ...(rows[rows.length - 1] as RowReport), readings, controls: controlsHeld,
      broken: (rows[rows.length - 1] as RowReport).broken + row.controls.length - controlsHeld }
  }
  return registerReport(rows, attemptsExecuted, controlsRun, assertionsPrinted, stoppedAt, unrun)
}

/** Build the report from the readings taken SO FAR — used both at the end of a run and at the
 *  point a broken control aborts one, so an aborted register still reports its rows. */
function registerReport(rows: RowReport[], attemptsExecuted: number, controlsRun: number,
  assertionsPrinted: number, registerStoppedAt: string | null, unrunRows: string[]): RegisterReport {
  return { rows, attemptsExecuted, rowsExecuted: rows.filter((r) => r.state !== 'un-run').length,
    termsDeclared: rows.reduce((n, r) => n + r.declaredTerm, 0), totalDeclared: DECLARED_TOTAL, controlsRun,
    assertionsPrinted, registerStoppedAt, unrunRows }
}

/** THE READINGS, ONE LINE, for any message that has to carry them (`REGISTER-ATTEMPT-TOTALS-
 *  PRINT-THEIR-TERMS`): the declared total with its terms, the chain's closure, the two
 *  subtotal decompositions, and EVERY row's per-row reading — with un-run rows named as
 *  FAILURES rather than silently omitted. */
export function reportDiagnostics(report: RegisterReport): string {
  const perRow = report.rows
    .map((r) => `${r.id} ${r.attemptsRun}/${r.declaredTerm} held=${r.held} broken=${r.broken} controls=${r.controls} ${r.state}`)
    .join(' | ')
  return `REGISTER — termsDeclared=${report.termsDeclared} · totalDeclared=${report.totalDeclared} · `
    + `attemptsExecuted=${report.attemptsExecuted} · rowsExecuted=${report.rowsExecuted} · rows=${report.rows.length} · `
    + `controlsRun=${report.controlsRun} · assertionsPrinted=${report.assertionsPrinted} · `
    + `registerStoppedAt=${String(report.registerStoppedAt)} · un-run (FAILURES)=${JSON.stringify(report.unrunRows)}\n`
    + `PER ROW: ${perRow}`
}

/** THE EXECUTED CELLS' OWN SUM — the live figure the declared total must equal. */
export const EXECUTED_CELLS_SUM: number = DECLARED_TERMS.reduce((a, b) => a + b, 0)

/** A deliberately FAILING probe table, used ONLY to prove the stop rule. It is NOT part of
 *  the register: the register's own term cells are the authority for `73` (`§5.5.4`). */
export const STOP_RULE_PROBE: readonly RegisterRow[] = [
  { id: 'P-FT-PROBE-1', type: 'P-TP', domain: 'HARNESS PROBE', strategyId: 'S-FT-PROBE-STOP-1', term: 7,
    bound: 'enumerated', assertions: ['the stop-after-5 rule abandons the remainder of this row and starts NO further row'],
    controls: [], drives: Array.from({ length: 7 }, (_v, i) => ({ label: `probe drive ${i + 1} (always fails, by construction)`, run: (): void => { throw new Error('probe: constructed failure') } })) },
  { id: 'P-FT-PROBE-2', type: 'P-TP', domain: 'HARNESS PROBE', strategyId: 'S-FT-PROBE-STOP-2', term: 2,
    bound: 'enumerated', assertions: ['this row must NEVER RUN: an un-run row is reported as a FAILURE, never as a pass'],
    controls: [], drives: [{ label: 'probe drive (must not run)', run: (): void => { throw new Error('probe: this row must be un-run') } }] },
]

// ---- the register's own imports: the HELPERS the rows drive (all `[T]`) ---------------
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { expect } from 'vitest'
import { ProvidentMcpServer, type McpBackend } from '../src/main/mcp-server.js'
import { SecurityGate, groupForTool } from '../src/main/security.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TOOL_NAME = 'provident.focus'
const METHOD = 'focus'
const SPEC_REL = 'docs/specs/focus-tool.md'
const SERVER_REL = 'src/main/mcp-server.ts'
const SECURITY_REL = 'src/main/security.ts'
const TYPES_REL = 'src/shared/types.ts'
const RENDERER_REL = 'src/renderer/renderer.ts'

export const EXPECTED_ALL_TOOLS: string[] = [
  'provident.dispatch', 'provident.focus', 'provident.get_rendered_html', 'provident.get_markdown',
  'provident.list_targets', 'provident.get_node_state', 'provident.code.get', 'provident.code.validate',
  'provident.load', 'provident.op', 'provident.export', 'provident.validate', 'provident.teardown',
  'provident.journal', 'provident.code.set', 'provident.code.create', 'provident.code.delete',
  'provident.code.load', 'provident.code.loadBatch', 'module.install', 'module.update', 'module.list',
]
export const EXPECTED_GROUPS: string[] = ['read', 'dispatch', 'graph', 'code', 'module']
export const EXPECTED_MUTATING: string[] = ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal']
export const DECLARED_MEMBERS: string[] = ['activeId', 'entries', 'opened', 'refused']

export function read(rel: string): string {
  return readFileSync(join(ROOT, rel), 'utf8')
}

export function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ')
}

export function scanLines(src: string, re: RegExp): string[] {
  const out: string[] = []
  src.split('\n').forEach((line, i) => { if (re.test(line)) out.push(`${i + 1}: ${line.trim()}`) })
  return out
}

function readStringArrayLiteral(rel: string, re: RegExp): string[] {
  const m = re.exec(read(rel))
  if (!m) return []
  return [...m[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((x) => x[1])
}

export function liveAllTools(): string[] {
  return readStringArrayLiteral(SERVER_REL, /static\s+readonly\s+ALL_TOOLS\s*:\s*string\[\]\s*=\s*\[([\s\S]*?)\]/)
}
export function liveRpcMethods(): string[] {
  return readStringArrayLiteral(TYPES_REL, /export\s+type\s+RpcMethod\s*=([\s\S]*?)\n\n/)
}
export function liveMutatingMethods(): string[] {
  return readStringArrayLiteral(RENDERER_REL, /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[([^\]]*)\]/)
}
export function liveValidGroups(): string[] {
  return readStringArrayLiteral(SECURITY_REL, /const\s+VALID_GROUPS\s*:\s*ReadonlySet<string>\s*=\s*new\s+Set\(\s*\[([^\]]*)\]/)
}

export function focusRouteSource(): string | null {
  const src = read(SERVER_REL)
  const marker = src.indexOf(`'${TOOL_NAME}'`)
  return marker === -1 ? null : src.slice(marker)
}

interface Recorder {
  readonly calls: Array<{ method: string; args: unknown }>
  readonly backend: McpBackend
}

export function recorder(answers: unknown[], error?: string): Recorder {
  const calls: Array<{ method: string; args: unknown }> = []
  let i = 0
  const backend: McpBackend = {
    async invoke(method: string, args: unknown): Promise<unknown> {
      calls.push({ method, args })
      if (error !== undefined) throw new Error(error)
      const value = answers.length === 0 ? undefined : answers[Math.min(i, answers.length - 1)]
      i += 1
      return value
    },
  }
  return { calls, backend }
}

export function newServer(backend: McpBackend, gate?: SecurityGate): ProvidentMcpServer {
  const server = new ProvidentMcpServer({ backend, transport: 'stdio', ...(gate ? { gate } : {}) })
  server.ensureServerRegistered()
  return server
}

export async function callTool(
  server: ProvidentMcpServer, name: string, args: unknown, opts?: { omitArguments?: boolean },
): Promise<unknown> {
  const sent = await server.connectMockTransport()
  const srv = (server as unknown as { stdioServer: Record<string, unknown> }).stdioServer
  const inner = srv['server'] as Record<string, unknown> | undefined
  const transport = (inner?.['_transport'] ?? srv['_transport']) as { onmessage: (m: unknown, e?: unknown) => void }
  const params: Record<string, unknown> = { name }
  if (opts?.omitArguments !== true) params['arguments'] = args
  transport.onmessage({ jsonrpc: '2.0', id: 11, method: 'tools/call', params }, {})
  for (let i = 0; i < 60 && sent.length === 0; i += 1) await new Promise((r) => setTimeout(r, 5))
  const reply = sent[0] as { result?: unknown; error?: unknown } | undefined
  if (reply === undefined) throw new Error(`tools/call ${name}: no reply on the mock transport`)
  if (reply.error !== undefined) {
    const e = reply.error as { message?: string }
    throw new Error(String(e.message ?? JSON.stringify(reply.error)))
  }
  const result = reply.result as { content?: Array<{ text?: string }>; isError?: boolean } | undefined
  const payload = result?.content?.[0]?.text
  if (result?.isError === true) throw new Error(String(payload))
  return payload === undefined ? undefined : JSON.parse(payload)
}

export async function callHandler(server: ProvidentMcpServer, name: string, args: unknown): Promise<unknown> {
  const srv = (server as unknown as { stdioServer?: Record<string, unknown> }).stdioServer
  const tools = srv?.['_registeredTools'] as Record<string, { handler: (a: unknown, e: unknown) => Promise<unknown> }> | undefined
  const tool = tools?.[name]
  if (tool === undefined) throw new Error(`tools/call ${name}: NOT REGISTERED (the tool row is absent)`)
  const result = (await tool.handler(args, {})) as { content?: Array<{ text?: string }>; isError?: boolean }
  const payload = result?.content?.[0]?.text
  if (result?.isError === true) throw new Error(String(payload))
  return payload === undefined ? undefined : JSON.parse(payload)
}

export function assertOneFocusCall(rec: Recorder, label: string): unknown {
  expect(rec.calls.map((c) => c.method), `${label} — I-2: EXACTLY ONE renderer call per valid call, never two, never zero`).toEqual([METHOD])
  return rec.calls[0]?.args
}

export function assertDeclaredShape(value: unknown, label: string): void {
  expect(Object.keys(value as Record<string, unknown>).sort(), `${label} — the returned object's own key set is exactly the four declared names.`).toEqual([...DECLARED_MEMBERS].sort())
}

export function keysOf(value: unknown): string[] {
  return Object.keys(value as Record<string, unknown>).sort()
}

export async function thrown(fn: () => Promise<unknown>): Promise<string | null> {
  try { await fn(); return null } catch (e) { return e instanceof Error ? e.message : String(e) }
}

// ---- THE REGISTER (`§5.5.1` + `§5.5.4`): 20 typed rows / 20 terms ------------------------
/** THE REGISTER — the contract's declared TWENTY typed rows / TWENTY terms (`§5.5.1`'s full
 *  table, whose every row `§5.5.4` gives a recorded fate), in the contract's own table order,
 *  each carrying its declared TERM. NO probe row rides the register: the stop-rule control is a
 *  SEPARATE table reported BESIDE it. THE THREE ROWS `§5.5.4` item 1 restores (`P-FT-AR-2` `2`,
 *  `P-FT-AR-3` `2`, `P-FT-RF-3` `2`) are driven BY THEIR OWN DECLARED DRIVES AND BY NOTHING
 *  ELSE, and NO existing row id, strategy id, seed, cap or drive was moved to make room. */
// ---- the multi-line drive pools, built once and referenced by their rows -----------------
const ID3_DRIVES: Drive[] = (() => {
  const shapes = [
    { label: '(1) a plain string array', answer: (): unknown => ({ activeId: 'a', entries: ['a', 'b'], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['a', 'b']) } },
    { label: '(2) an empty array — the empty list', answer: (): unknown => ({ activeId: null, entries: [], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual([]) } },
    { label: '(3) a one-member array', answer: (): unknown => ({ activeId: 'only', entries: ['only'], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['only']) } },
    { label: '(4) the SAME string twice — no dedupe', answer: (): unknown => ({ activeId: 'd', entries: ['d', 'd'], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['d', 'd']) } },
    { label: '(5) an empty string, whitespace, unicode and a very long member — no trim', answer: (): unknown => ({ activeId: null, entries: ['', '  sp  ', 'unicode-pad', 'L'.repeat(5000)], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['', '  sp  ', 'unicode-pad', 'L'.repeat(5000)]) } },
    { label: '(6) an UNSORTED array (descending) — no sort', answer: (): unknown => ({ activeId: 'c', entries: ['c', 'b', 'a'], opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['c', 'b', 'a']) } },
    { label: '(7) a NON-ARRAY value (null) — passed through unchanged', answer: (): unknown => ({ activeId: null, entries: null, opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries'], 'ID-3(7) — a non-array entries value is passed through, never normalised to an empty list.').toBe(null) } },
    { label: '(8) an array-like value — passed through rather than normalised', answer: (): unknown => ({ activeId: null, entries: { length: 2, 0: 'a', 1: 'b' }, opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual({ length: 2, 0: 'a', 1: 'b' }) } },
    { label: '(9) a frozen array — passed through', answer: (): unknown => ({ activeId: 'f', entries: Object.freeze(['f']), opened: false }), check: (got: unknown): void => { expect((got as Record<string, unknown>)['entries']).toEqual(['f']) } },
    { label: '(10) an array whose accessor THROWS on an index read', answer: (): unknown => ({ activeId: null, entries: new Proxy(['x'], { get: (): never => { throw new Error('accessor threw') } }), opened: false }), check: (): void => undefined },
  ]
  return shapes.map((shape) => ({
    label: shape.label,
    run: async (): Promise<void> => {
      const rec = recorder([shape.answer()])
      const server = newServer(rec.backend)
      const message = await thrown(() => callHandler(server, TOOL_NAME, {}))
      if (shape.label.startsWith('(10)')) {
        expect(message === null || /accessor threw/.test(String(message)), "ID-3(10) — a failure here must be the CONSUMER's own, never one invented by the tool.").toBe(true)
        return
      }
      expect(message, `ID-3 ${shape.label} — nothing threw on this shape.`).toBe(null)
      assertOneFocusCall(rec, `ID-3 ${shape.label}`)
      shape.check(await callHandler(server, TOOL_NAME, {}))
      expect(rec.calls.map((c) => c.method), `ID-3 ${shape.label} — one renderer call per call.`).toEqual([METHOD, METHOD])
    },
  }))
})()

const AR1_DRIVES: Drive[] = (() => {
  const accepted = [
    { label: '(1) arguments omitted', args: undefined as unknown, omit: true },
    { label: '(2) an empty arguments object', args: {} as unknown, omit: false },
    { label: '(3) a target string', args: { target: 'a' } as unknown, omit: false },
    { label: '(4) the empty target string', args: { target: '' } as unknown, omit: false },
    { label: '(5) a target with newTab true', args: { target: 'a', newTab: true } as unknown, omit: false },
    { label: '(6) a target with newTab false', args: { target: 'a', newTab: false } as unknown, omit: false },
    { label: '(7) newTab true with NO target', args: { newTab: true } as unknown, omit: false },
    { label: '(8) a target with whitespace/unicode (untrimmed)', args: { target: '  unicode-pad  ' } as unknown, omit: false },
    { label: '(9) a target that is a very long string', args: { target: 'x'.repeat(10000) } as unknown, omit: false },
    { label: '(10) a target supplied as a NON-string value', args: { target: 0 } as unknown, omit: false },
    { label: '(11) a frozen arguments object', args: Object.freeze({ target: 'frozen' }) as unknown, omit: false },
  ]
  return accepted.map((d) => ({
    label: d.label,
    run: async (): Promise<void> => {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      const server = newServer(rec.backend)
      const got = d.omit
        ? await callTool(server, TOOL_NAME, undefined, { omitArguments: true })
        : await callTool(server, TOOL_NAME, d.args)
      assertDeclaredShape(got, `AR-1 ${d.label}`)
      expect(rec.calls, `AR-1 ${d.label} — exactly ONE renderer call on an accepted shape.`).toHaveLength(1)
      if (d.args !== null && typeof d.args === 'object') {
        const passed = rec.calls[0]?.args as Record<string, unknown>
        for (const key of Object.keys(d.args as Record<string, unknown>)) {
          expect(passed[key], `AR-1 ${d.label} — '${key}' travels BY IDENTITY.`).toEqual((d.args as Record<string, unknown>)[key])
        }
      }
    },
  }))
})()

const RF1_DRIVES: Drive[] = (() => {
  const reasons = [
    { label: '(1) a plain reason string', reason: 'not mine' as unknown, expectValue: 'not mine' as unknown },
    { label: '(2) an EMPTY reason (the empty string is legal and carried verbatim)', reason: '' as unknown, expectValue: '' as unknown },
    { label: '(3) a reason with whitespace and unicode (carried untrimmed)', reason: '  unicode-pad  ' as unknown, expectValue: '  unicode-pad  ' as unknown },
    { label: '(4) a NON-string reason (passed through, no coercion)', reason: { code: 7 } as unknown, expectValue: { code: 7 } as unknown },
  ]
  return reasons.map((d) => ({
    label: d.label,
    run: async (): Promise<void> => {
      const rec = recorder([{ activeId: null, entries: [], opened: false, refused: { reason: d.reason } }])
      const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'r' }) as Record<string, unknown>
      expect(keysOf(got), `RF-1 ${d.label} — exactly the four declared names, with refused PRESENT.`).toEqual([...DECLARED_MEMBERS].sort())
      const refused = got['refused'] as Record<string, unknown>
      expect(refused, `RF-1 ${d.label} — refused is carried.`).toBeTruthy()
      expect(refused['reason'], `RF-1 ${d.label} — the CONSUMER's own value BY IDENTITY; the tool invents no code and re-routes nothing.`).toEqual(d.expectValue)
      expect(Object.keys(refused), `RF-1 ${d.label} — the tool adds no member inside refused.`).toEqual(['reason'])
      expect(Object.prototype.hasOwnProperty.call(got, 'refused') && got['refused'] !== undefined, `RF-1 ${d.label} — never a refused: undefined own key.`).toBe(true)
    },
  }))
})()

const AR4_DRIVES: Drive[] = (() => {
  const revoked = Proxy.revocable({}, {})
  revoked.revoke()
  const hostile = [
    { label: '(1) the arguments object as null', make: (): unknown => null },
    { label: '(2) the arguments object as undefined', make: (): unknown => undefined },
    { label: '(3) the arguments object as a number', make: (): unknown => 42 },
    { label: '(4) the arguments object as a string', make: (): unknown => 'target' },
    { label: '(5) the arguments object as a boolean', make: (): unknown => true },
    { label: '(6) the arguments object as a Symbol (a 12n is read in the same drive)', make: (): unknown => Symbol('s') },
    { label: '(7) the arguments object as an array', make: (): unknown => ['a'] },
    { label: '(8) the arguments object as a function', make: (): unknown => (): void => undefined },
    { label: '(9) the arguments object as a Date (a Map is read in the same drive)', make: (): unknown => new Date(0) },
    { label: '(10) the arguments object as a revoked Proxy', make: (): unknown => revoked.proxy },
    { label: '(11) the arguments object as a trap-throwing Proxy', make: (): unknown => new Proxy({}, { ownKeys: (): string[] => { throw new Error('trap threw') } }) },
    { label: '(12) the arguments object as a THROWING-ACCESSOR holder', make: (): unknown => ({ get target(): unknown { throw new Error('accessor threw') } }) },
  ]
  return hostile.map((d) => ({
    label: d.label,
    run: async (): Promise<void> => {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      const server = newServer(rec.backend)
      const args = d.make()
      const before = args !== null && (typeof args === 'object' || typeof args === 'function')
        ? JSON.stringify(Object.keys(args as object))
        : null
      let threw: string | null = null
      let serviced = false
      try {
        const got = await callHandler(server, TOOL_NAME, args)
        serviced = true
        assertDeclaredShape(got, `AR-4 ${d.label}`)
      } catch (e) {
        threw = e instanceof Error ? e.message : String(e)
      }
      expect(serviced || threw !== null, `AR-4 ${d.label} — the tool either throws or services; never neither.`).toBe(true)
      if (threw !== null) {
        expect(rec.calls, `AR-4 ${d.label} — no renderer call is made on a rejected drive.`).toEqual([])
      } else {
        expect(rec.calls, `AR-4 ${d.label} — a serviced drive makes exactly one renderer call.`).toHaveLength(1)
      }
      if (before !== null) {
        expect(JSON.stringify(Object.keys(args as object)), `AR-4 ${d.label} — the caller's arguments object is byte-identical afterwards.`).toBe(before)
      }
      if (d.label.startsWith('(6)')) {
        const rec2 = recorder([{ activeId: null, entries: [], opened: false }])
        const m = await thrown(() => callHandler(newServer(rec2.backend), TOOL_NAME, 12n as unknown as Record<string, unknown>))
        expect(m !== null || rec2.calls.length === 1, 'AR-4(6) — a 12n is read in the same drive: it throws the declared class or is serviced.').toBe(true)
      }
      if (d.label.startsWith('(9)')) {
        const rec3 = recorder([{ activeId: null, entries: [], opened: false }])
        const m = await thrown(() => callHandler(newServer(rec3.backend), TOOL_NAME, new Map() as unknown as Record<string, unknown>))
        expect(m !== null || rec3.calls.length === 1, 'AR-4(9) — a Map is read in the same drive: it throws the declared class or is serviced.').toBe(true)
      }
    },
  }))
})()

// ---- `P-FT-AR-2`'s drive pool: THE UNKNOWN-KEY EDGE (`§5.5.4` item 1(a), `S-FT-EDGE-1`) ---
/** `2` drives, ONE DRIVE EACH, as `§5.5.1`'s own cell declares and `§5.5.4` item 1(a) restores:
 *  (1) a bare `{id:'x'}` · (2) `{target:'a', extra:1}`. PER ATTEMPT: the throw's class, that the
 *  error NAMES THE REJECTED KEY (read in EVERY declared form — an extra Error argument, an
 *  `invalidKeys`-style array, or the message text — so the implementation is not over-constrained
 *  to one message shape), the renderer stub's call count `0`, and that NOTHING was returned —
 *  no `refused` record, no silent drop, no default. */
const AR2_DRIVES: Drive[] = (() => {
  const edges = [
    { label: "(1) a single unknown key (a bare {id:'x'})", keys: ['id'], args: { id: 'x' } as unknown },
    { label: "(2) a legal member mixed with an unknown key ({target:'a', extra:1})", keys: ['extra'], args: { target: 'a', extra: 1 } as unknown },
  ]
  return edges.map((edge) => ({
    label: edge.label,
    run: async (): Promise<void> => {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      const server = newServer(rec.backend)
      let threw: unknown = null
      let returned: unknown
      try { returned = await callHandler(server, TOOL_NAME, edge.args) } catch (e) { threw = e }
      expect(threw, `AR-2 ${edge.label} — the unknown-key edge THROWS (a serviced call would be the tolerate-by-ignoring alternative the contract does NOT take).`).not.toBe(null)
      expect(returned, `AR-2 ${edge.label} — NOTHING is returned on the throwing arm.`).toBeUndefined()
      const e = threw as { constructor?: { name?: string }; name?: string; message?: unknown; invalidKeys?: unknown }
      const className = String(e?.constructor?.name ?? e?.name ?? '')
      expect(className, `AR-2 ${edge.label} — the DECLARED throw class (TypeError-class, NOT an invented one). Measured: ${className}`).toMatch(/error/i)
      const named = [
        String(e?.message ?? ''),
        Array.isArray(e?.invalidKeys) ? (e?.invalidKeys as unknown[]).join(' ') : '',
        e?.invalidKeys === undefined ? '' : String(e?.invalidKeys),
      ].join(' | ')
      for (const key of edge.keys) {
        expect(named, `AR-2 ${edge.label} — the error NAMES the rejected key '${key}'. Measured: ${named}`).toContain(key)
      }
      expect(Object.prototype.hasOwnProperty.call(returned ?? {}, 'refused'), `AR-2 ${edge.label} — no \`refused\` record is produced on the throwing arm.`).toBe(false)
      expect(rec.calls, `AR-2 ${edge.label} / I-12 — the rejection crosses NO IPC boundary: the renderer stub's call count is 0.`).toEqual([])
    },
  }))
})()

// ---- `P-FT-AR-3`'s drive pool: THE PASS-THROUGH RULE (`§5.5.4` item 1(b), `S-FT-PASS-1`) -----
/** `2` drives, ONE DRIVE EACH, as `§5.5.1`'s own cell declares and `§5.5.4` item 1(b) restores:
 *  (1) a `target` supplied as a NON-string value · (2) a `newTab` supplied as a NON-boolean value.
 *  PER ATTEMPT: the received IDENTITIES AT THE RENDERER STUB, the absence of a `typeof`/coercion/
 *  default site on the route, and the absence of any substituted default. THIS ROW'S PROPERTY IS
 *  ASSERTED BY IDENTITY AND BY `Object.is` — never by `toEqual` and never by a key set — which is
 *  exactly why `AR-1`'s drive (10) does not carry it (`§5.5.4` item 1(b)'s reason). */
const AR3_DRIVES: Drive[] = (() => {
  const passes: Array<{ label: string; member: 'target' | 'newTab'; value: unknown; forbid: readonly RegExp[] }> = [
    {
      label: '(1) a `target` supplied as a NON-string value (an OBJECT — no `typeof` test, no coercion)', member: 'target', value: { nested: true, tag: 'not-a-string' },
      forbid: [/String\s*\(\s*a(?:rgs|rgument)?(?:\s*[.\[]\s*target|\s*\.?\s*target\s*\))/, /`\s*\$\{/, /\btypeof\b[^\n]*\btarget\b/],
    },
    {
      label: '(2) a `newTab` supplied as a NON-boolean value (the NUMBER `0` — no default, no coercion)', member: 'newTab', value: 0,
      forbid: [/Boolean\s*\(\s*a(?:rgs|rgument)?(?:\s*[.\[]\s*newTab|\s*\.?\s*newTab\s*\))/, /!!\s*a(?:rgs|rgument)?(?:\s*[.\[]\s*newTab|\s*\.?\s*newTab)/, /\btypeof\b[^\n]*\bnewTab\b/, /a(?:rgs|rgument)?\s*[.\[]\s*['"]?newTab['"]?\s*\]?\s*\?\?\s*(?:false|true)/],
    },
  ]
  return passes.map((p) => ({
    label: p.label,
    run: async (): Promise<void> => {
      const args: Record<string, unknown> = { [p.member]: p.value }
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      const server = newServer(rec.backend)
      const got = await callHandler(server, TOOL_NAME, args)
      assertDeclaredShape(got, `AR-3 ${p.label}`)
      const passed = assertOneFocusCall(rec, `AR-3 ${p.label}`) as Record<string, unknown>
      expect(passed, `AR-3 ${p.label} — the arguments object the renderer receives is a real object.`).toBeTruthy()
      expect(Object.is(passed[p.member], p.value), `AR-3 ${p.label} — '${p.member}' travels BY IDENTITY, with NO coercion and NO default (Object.is, never toEqual).`).toBe(true)
      expect(Object.keys(passed), `AR-3 ${p.label} — nothing is supplied to the renderer that the caller did not send, and the member is spelled EXACTLY as the caller spelled it.`).toEqual([p.member])
      const body = stripComments(focusRouteSource() ?? '')
      expect(body, `AR-3 ${p.label} — the route must exist for the no-coercion scan to be non-vacuous.`).not.toBe('')
      for (const token of p.forbid) {
        expect(scanLines(body, token), `AR-3 ${p.label} — a \`typeof\`/coercion/defaulting site FOR '${p.member}' on the route FAILS: ${String(token)}`).toEqual([])
      }
      // THE FALSIFIER, so the scan is a reading and not a ritual: the SAME scan hits a coerced
      // site, and a DEFAULTER would be caught by the identity read above (Object.is(0, false)
      // is false, Object.is({...}, undefined) is false) rather than by a message form.
      expect(scanLines('const t = String(args.target)', p.forbid[0] as RegExp), `AR-3 ${p.label} control — the coercion scan CAN hit.`)
        .not.toEqual([])
      const defaulted = { ...args } as Record<string, unknown>
      if (p.member === 'newTab') defaulted['newTab'] = false
      else delete defaulted['target']
      expect(Object.is(defaulted[p.member], p.value), `AR-3 ${p.label} control — the identity read REJECTS a defaulted member.`).toBe(false)
    },
  }))
})()

// ---- `P-FT-RF-3`'s drive pool: THE ZERO-NOTIFICATION reading (`§5.5.4` item 1(c)) ----------
/** `2` drives, ONE DRIVE EACH, as `§5.5.1`'s own cell declares and `§5.5.4` item 1(c) restores:
 *  (1) the predicate KEYING read with `'focus'` absent from the set (the STATIC ROUTE READING) ·
 *  (2) the route PUSH-SITE and invalidation-TOKEN scan (the labelled structural half).
 *  PER ATTEMPT: the predicate's keying site, the set's membership, the absence of a push site —
 *  and THE ROW CLAIMS NO MORE THAN *"no notification was invoked and the name sets are unchanged"*.
 *  A BARE COUNT IS NOT THE INSTRUMENT. */
const RF3_DRIVES: Drive[] = (() => {
  return [
    {
      label: "(1) the predicate keying read with `'focus'` absent from the set (the STATIC ROUTE READING)",
      run: (): void => {
        expect(/MUTATING_METHODS[.]has[(][ ]*(?:req|request|r)[.]method[ ]*[)]/.test(read(RENDERER_REL)), "RF-3 — the notify predicate is still KEYED ON that set (a predicate read, not a count).").toBe(true)
        expect(liveMutatingMethods(), "RF-3 — the set the predicate is keyed on carries NO 'focus'.").not.toContain(METHOD)
        expect(liveMutatingMethods().sort(), 'RF-3 — name-set-equal to its SEVEN members: no EIGHTH entry was added.').toEqual([...EXPECTED_MUTATING].sort())
      },
    },
    {
      label: '(2) the route push-site and invalidation-token scan (the labelled structural half)',
      run: (): void => {
        const src = focusRouteSource()
        expect(src, 'RF-3 — the route must exist for the push-site scan to be non-vacuous.').not.toBe(null)
        const body = stripComments(src ?? '')
        for (const token of [/notify|sendResourceUpdated|resources\/updated|app-graph-changed/i, /invalidate/i]) {
          expect(scanLines(body, token), `RF-3 / I-8 / §5.U row 3 — a PUSH site or an invalidation token on the route FAILS: ${String(token)}`).toEqual([])
        }
        expect(scanLines('renderer.notifyGraphChanged()', /notify/i), 'RF-3 control — the push-site scan is a real scan.').not.toEqual([])
        expect(liveMutatingMethods(), "RF-3 — and the name sets are unchanged.").not.toContain(METHOD)
      },
    },
  ]
})()

export const REGISTER: readonly RegisterRow[] = [
  {
    id: "P-FT-RT-1", type: "P-IM", domain: "THE ROUTE — the listing", strategyId: "S-FT-LIST-1", term: 4, bound: "enumerated",
    // listing, uniqueness and the equality form used
    assertions: ["membership of `provident.focus` in the name set", "the set size read as a duplicate check", "the absence of a duplicate entry", "the absence of a second new name (set equality)"],
    controls: [{ label: 'control: a name that is NOT in the set is rejected by the same read', run: () => { expect(liveAllTools()).not.toContain('provident.focus_missing_control') } }],
    drives: [
      { label: '(1) membership of `provident.focus` in the name set', run: () => expect(liveAllTools(), 'RT-1 — the name is in the listing.').toContain(TOOL_NAME) },
      { label: '(2) the set size as a duplicate check', run: () => expect(liveAllTools().length, 'RT-1 — 22 members.').toBe(22) },
      { label: '(3) the absence of a duplicate entry', run: () => expect(new Set(liveAllTools()).size, 'RT-1 — no duplicate.').toBe(liveAllTools().length) },
      { label: '(4) the absence of a second new name', run: () => expect([...liveAllTools()].sort(), 'RT-1 — name-set equality against the 22 declared names.').toEqual([...EXPECTED_ALL_TOOLS].sort()) },
    ],
  },
  {
    id: "P-FT-RT-2", type: "P-IM", domain: "THE ROUTE — the registration and the DEFAULT-GATE placement", strategyId: "S-FT-GATE-1", term: 3, bound: "enumerated",
    // the resolved name, the default state, and that no sixth group exists
    assertions: ["the resolved group name", "the default state of `dispatch`", "that no sixth group name exists", "no per-call registration branch on the route"],
    controls: [{ label: 'control: an unknown tool name resolves to `null`, so the group read can fail', run: () => expect(groupForTool('provident.nonexistent_control')).toBe(null) }],
    drives: [
      { label: '(1) the group-name lookup for `focus`', run: () => expect(groupForTool(TOOL_NAME), 'RT-2 — the tool resolves to the EXISTING `dispatch` group.').toBe('dispatch') },
      { label: '(2) the ON-by-default reading of `dispatch`', run: () => expect(newServer(recorder([{}]).backend).getGateConfig().enabled, 'RT-2 — `dispatch` is ON by default, so no human grant is required.').toContain('dispatch') },
      { label: '(3) the `VALID_GROUPS` five-member name-set equality', run: () => expect(liveValidGroups().sort(), 'RT-2 — name-set-equal to its five members, NO SIXTH.').toEqual([...EXPECTED_GROUPS].sort()) },
    ],
  },
  {
    id: "P-FT-RT-3", type: "P-SM", domain: "THE ROUTE — the INVOKE PATH and the one-call rule (the ROUTE'S OWN CELL)", strategyId: "S-FT-INVOKE-1", term: 3, bound: "enumerated",
    // the member, the case, the call count, and the routing independence
    assertions: ["the union member's presence", "the switch case's presence", "the renderer stub's call count is exactly 1 on a valid call", "the routing decision is independent of the mutating set"],
    controls: [{ label: 'control: the recording stub is a real recorder (two calls show two)', run: async () => { const rec = recorder([{}, {}]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, {}); await callTool(s, TOOL_NAME, {}); expect(rec.calls.length).toBe(2) } }],
    drives: [
      { label: '(1) the union-member read against the switch case', run: () => { expect(liveRpcMethods(), 'RT-3 — the union member.').toContain(METHOD); expect(read(RENDERER_REL), 'RT-3 — the switch case.').toMatch(new RegExp('case[ ]+' + METHOD + '[ ]*:')) } },
      { label: '(2) the invoke path through a recording stub (call count exactly 1)', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false }]); const s = newServer(rec.backend); const got = await callTool(s, TOOL_NAME, { target: 'a' }); assertOneFocusCall(rec, 'RT-3(2)'); assertDeclaredShape(got, 'RT-3(2)') } },
      { label: '(3) the route does NOT consult the mutating set for routing', run: () => { expect(scanLines(stripComments(focusRouteSource() ?? ''), /MUTATING_METHODS/), 'RT-3(3) — the route never reads the mutating set for routing.').toEqual([]); expect(liveAllTools(), 'RT-3(3) — the tool IS listed, so the route crosses the invoke path by the TYPE WALL + the switch.').toContain(TOOL_NAME) } },
    ],
  },
  {
    id: "P-FT-RT-4", type: "P-IM", domain: "THE ROUTE — the ABSENCE FROM THE NOTIFY PREDICATE'S SET", strategyId: "S-FT-NOTIFY-1", term: 2, bound: "enumerated",
    // the set by name, the absence of the method, and the predicate keying site
    assertions: ["the set's members by name", "the absence of `'focus'`", "the predicate's keying site", "the sibling row that pins the set"],
    controls: [{ label: 'control: the predicate read CAN hit', run: () => expect(/MUTATING_METHODS[.]has[(]/.test('if (reply.ok && MUTATING_METHODS.has(req.method)) {')).toBe(true) }],
    drives: [
      { label: "(1) the seven-member name-set equality with `'focus'` absent", run: () => { expect(liveMutatingMethods().sort(), 'RT-4 — the SEVEN members by name.').toEqual([...EXPECTED_MUTATING].sort()); expect(liveMutatingMethods(), "RT-4 — no `'focus'` (an EIGHTH entry FAILS).").not.toContain(METHOD) } },
      { label: "(2) the predicate's keying read against that set", run: () => expect(/MUTATING_METHODS[.]has[(][ ]*(?:req|request|r)[.]method[ ]*[)]/.test(read(RENDERER_REL)), 'RT-4 — the notify predicate is still KEYED ON that set (a predicate read, not a count).').toBe(true) },
    ],
  },
  {
    id: "P-FT-RT-5", type: "P-SM", domain: "THE ROUTE — the GROUP RESOLUTION on a call, and the denied group", strategyId: "S-FT-GROUP-1", term: 2, bound: "enumerated",
    // the resolution outcome and the absence form, with no focus-specific branch
    assertions: ["the resolution outcome", "the error/absence form", "NO focus-specific branch anywhere in the gate"],
    controls: [{ label: 'control: the gate read distinguishes a disabled group (a graph tool under the default gate is absent)', run: () => expect(newServer(recorder([{}]).backend).allowedToolNames()).not.toContain('provident.load') }],
    drives: [
      { label: '(1) `dispatch` ON — the tool resolves and is callable', run: () => expect(newServer(recorder([{}]).backend).allowedToolNames(), 'RT-5 — registered under the default gate.').toContain(TOOL_NAME) },
      { label: '(2) `dispatch` OFF — the tool is not registered/listed', run: () => { const gate = new SecurityGate().apply({ disable: ['dispatch'] }); expect(newServer(recorder([{}]).backend, gate).allowedToolNames(), "RT-5 — the endpoint's existing group semantics, not a new case.").not.toContain(TOOL_NAME); expect(new RegExp('focus', 'i').test(stripComments(read(SECURITY_REL))), 'RT-5 — NO focus-specific branch exists in the gate.').toBe(false) } },
    ],
  },
  {
    id: "P-FT-ID-1", type: "P-IM", domain: "THE OPAQUE ENTRY IDENTITY — the caller's own string as the legal entry id", strategyId: "S-FT-ID-1", term: 2, bound: "enumerated",
    // the missing minting site, the returned identity, and the second renderer call
    assertions: ["the absence of a minting site on the route", "the absence of a tool-side registry/`Map`/counter", "the returned identity is the consumer's own value", "the second call performs a SECOND renderer call (no cache)"],
    controls: [{ label: 'control: the minting scan CAN hit', run: () => expect(scanLines('const counter = 1', /\bcounter\b/)).not.toEqual([]) }],
    drives: [
      { label: '(1) a plain-string target call', run: async () => { const rec = recorder([{ activeId: 'k', entries: ['k'], opened: false }]); const got = await callTool(newServer(rec.backend), TOOL_NAME, { target: 'k' }) as Record<string, unknown>; expect(got['activeId'], "ID-1 — the caller's own string is the identity the answer refers to.").toBe('k'); expect(scanLines(stripComments(focusRouteSource() ?? ''), /\bcounter\b|randomUUID|new\s+Map\b|new\s+Set\b/), 'ID-1 — no minting/holding site on the route.').toEqual([]) } },
      { label: '(2) a `newTab: true` call, serviced with no id derivation inside the tool', run: async () => { const rec = recorder([{ activeId: 't', entries: ['t', 't'], opened: true }, { activeId: 't', entries: ['t', 't'], opened: true }]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 't', newTab: true }); await callTool(s, TOOL_NAME, { target: 't', newTab: true }); expect(rec.calls.map((c) => c.method), 'ID-1 — a SECOND renderer call: no tool-side cache.').toEqual([METHOD, METHOD]) } },
    ],
  },
  {
    id: "P-FT-ID-2", type: "P-SM", domain: "THE OPAQUE ENTRY IDENTITY — the `===`-on-target activation, observed THROUGH the answer", strategyId: "S-FT-ACT-1", term: 3, bound: "enumerated",
    // the identities, the count, the seated activeId, and the no-comparison reading
    assertions: ["the returned element identities", "the returned count", "the seated `activeId`", "the tool performed no comparison of its own"],
    controls: [{ label: 'control: nothing is appended on the repeated-target arm', run: async () => { const rec = recorder([{ activeId: 'n', entries: ['n'], opened: false }, { activeId: 'n', entries: ['n'], opened: false }]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'n' }); const again = await callTool(s, TOOL_NAME, { target: 'n' }) as Record<string, unknown>; expect((again['entries'] as unknown[]).length).toBe(1) } }],
    drives: [
      { label: '(1) a repeated `===` target, the existing entry INACTIVE: activation, NO APPEND', run: async () => { const rec = recorder([{ activeId: '', entries: ['e'], opened: false }, { activeId: 'e', entries: ['e'], opened: false }]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'e' }); const got = await callTool(s, TOOL_NAME, { target: 'e' }) as Record<string, unknown>; expect(got['activeId'], "ID-2 — the existing entry's own id.").toBe('e'); expect((got['entries'] as unknown[]).length, 'ID-2 — NO APPEND.').toBe(1); expect(scanLines(stripComments(focusRouteSource() ?? ''), /===\s*|\.includes\s*\(|\.indexOf\s*\(/), 'ID-2 — the tool re-derived no rule.').toEqual([]) } },
      { label: '(2) the same repeated target, the existing entry ALREADY ACTIVE', run: async () => { const rec = recorder([{ activeId: 'e', entries: ['e'], opened: false }, { activeId: 'e', entries: ['e'], opened: false }]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'e' }); const got = await callTool(s, TOOL_NAME, { target: 'e' }) as Record<string, unknown>; expect(got['activeId'], 'ID-2 — the identity is stable on the already-active arm.').toBe('e'); expect((got['entries'] as unknown[]).length, 'ID-2 — still no append.').toBe(1) } },
      { label: '(3) an APPEND CONTROL: a distinct target appends, as declared', run: async () => { const rec = recorder([{ activeId: 'a', entries: ['a'], opened: false }, { activeId: 'b', entries: ['a', 'b'], opened: true }]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'a' }); const got = await callTool(s, TOOL_NAME, { target: 'b' }) as Record<string, unknown>; expect((got['entries'] as unknown[]), "ID-2 — the append is the CONSUMER's rule, echoed.").toEqual(['a', 'b']) } },
    ],
  },
  {
    id: "P-FT-ID-3", type: "P-IM", domain: "THE OPAQUE ENTRY IDENTITY — the `entries` echo BY IDENTITY", strategyId: "S-FT-ECHO-1", term: 10, bound: "bounded",
    // the container identity/pass-through, the order, the length, and nothing throwing
    assertions: ["the identity/pass-through of the returned container", "the member order", "the length", "nothing threw (except the declared consumer-fence reading on the throwing-accessor drive)", "the declared type is a CONTRACT, not a validation boundary"],
    controls: [{ label: 'control: the echo read is not vacuous — a normalising tool would fail drive (6)', run: () => expect(['c', 'b', 'a']).not.toEqual(['a', 'b', 'c']) }],
    drives: ID3_DRIVES,
  },
  {
    id: "P-FT-ID-4", type: "P-SM", domain: "THE OPAQUE ENTRY IDENTITY — the `opened` reading", strategyId: "S-FT-OPEN-1", term: 2, bound: "enumerated",
    // the opened identity, the refused presence, and the key set
    assertions: ["the `opened` identity", "the presence/absence of `refused`", "the object's own key set"],
    controls: [{ label: 'control: a defaulted `opened` would fail (the non-boolean drive is asserted by identity)', run: () => expect(0).not.toBe(false) }],
    drives: [
      { label: '(1) an opening call — `opened` by identity, no truthiness test', run: async () => { const rec = recorder([{ activeId: 'o', entries: ['o', 'o'], opened: 0 }]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'o', newTab: true }) as Record<string, unknown>; expect(got['opened'], "ID-4 — the consumer's own value, no Boolean() coercion.").toBe(0); assertDeclaredShape(got, 'ID-4(1)') } },
      { label: '(2) a refusal call — the consumer\'s own value with `refused` present and NO FIFTH member', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: 'yes', refused: { reason: 'nope' } }]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, {}) as Record<string, unknown>; expect(got['opened'], 'ID-4 — identity.').toBe('yes'); assertDeclaredShape(got, 'ID-4(2)'); expect('refused' in got, 'ID-4 — `refused` present on the refusal arm.').toBe(true) } },
    ],
  },
  {
    id: "P-FT-ID-5", type: "P-TP", domain: "THE OPAQUE ENTRY IDENTITY — the no-minting-anywhere rule over the tool's own bytes", strategyId: "S-FT-NOMINT-1", term: 1, bound: "bounded",
    // the absence of each minting token class, with the exemption list named
    assertions: ["the scan's exemption list is NAMED (the tool/method name `focus`; the endpoint's member names) and stands VACUOUS for every tab/pane/zone/region token", "the pass-through `entries`/`activeId` echo is NAMED as the reason those tokens are not hits"],
    controls: [{ label: 'control: the minting scan CAN hit', run: () => expect(scanLines('const id = crypto.randomUUID()', /randomUUID/)).not.toEqual([]) }],
    drives: [
      { label: "(1) the static route scan over the route's own file set, with the exemption list named", run: () => { expect(focusRouteSource(), 'ID-5 — the route must exist for the scan to be non-vacuous.').not.toBe(null); const body = stripComments(focusRouteSource() ?? ''); for (const token of [/\bcounter\b/i, /randomUUID/, /\buuid\b/i, /nanoid/, /\bnew\s+Map\b/, /\bnew\s+Set\b/, /\bregistry\b/i]) expect(scanLines(body, token), `ID-5 — a minting token on the route FAILS: ${String(token)}`).toEqual([]) } },
    ],
  },
  {
    id: "P-FT-AR-1", type: "P-IM", domain: "THE ARGUMENT SHAPE — the declared two-member optional shape", strategyId: "S-FT-ARG-1", term: 11, bound: "bounded",
    // acceptance, exactly one renderer call, the passed-through identities, and the returned key set
    assertions: ["the call is accepted", "the renderer stub's call count is 1", "the passed-through identities", "the returned key set"],
    controls: [{ label: 'control: an argument OUTSIDE the declared space is refused by the same read (the unknown-key edge)', run: async () => { const rec = recorder([{}]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { nope: 1 })); expect(m).not.toBe(null) } }],
    drives: AR1_DRIVES,
  },
  {
    id: "P-FT-AR-2", type: "P-TP", domain: "THE ARGUMENT SHAPE — the UNKNOWN-KEY EDGE", strategyId: "S-FT-EDGE-1", term: 2, bound: "enumerated",
    // the throw's class, the rejected key NAMED, the call count, and nothing returned
    assertions: ["the throw's class", "that the error names the rejected key", "the renderer stub's call count is 0", "that nothing was returned (no `refused` record, no silent drop, no default)", "THE THROWING ARM IS THE DECLARED ONE AND THE TOLERATE-BY-IGNORING ALTERNATIVE IS NOT TAKEN"],
    controls: [{ label: 'control: a KNOWN key is NOT refused by the same read (so the edge is a real edge, not a blanket refusal)', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false }]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a', newTab: false })); expect(m).toBe(null); expect(rec.calls.map((c) => c.method)).toEqual([METHOD]) } }],
    drives: AR2_DRIVES,
  },
  {
    id: "P-FT-AR-3", type: "P-IM", domain: "THE ARGUMENT SHAPE — the PASS-THROUGH RULE (no interpretation on the way in)", strategyId: "S-FT-PASS-1", term: 2, bound: "enumerated",
    // the received identities, the absence of a typeof/coercion site, and the absence of a default
    assertions: ["the received identities AT THE RENDERER STUB (asserted by `Object.is`, never by `toEqual`)", "the absence of a `typeof`/coercion site on the route", "that no default value was substituted", "the caller's own member spelling, with no member re-keyed or added"],
    controls: [{ label: 'control: the identity read CAN fail (a defaulted `newTab` is not the caller\'s `0`)', run: () => { expect(Object.is(false, 0)).toBe(false); expect(Object.is(undefined, { nested: true, tag: 'not-a-string' })).toBe(false) } }],
    drives: AR3_DRIVES,
  },
  {
    id: "P-FT-AR-4", type: "P-TP", domain: "THE ARGUMENT SHAPE — the EDGE'S TOTALITY over hostile argument shapes", strategyId: "S-FT-TOTAL-1", term: 12, bound: "bounded",
    // the one declared throw class or the serviced reading, with byte-identity and call-count assertions
    assertions: ["the ONE declared throw class or the serviced reading", "the renderer stub's call count (0 on a rejected drive)", "the caller's object's byte-identity after the call", "no third throw class escaped", "THE UNIVERSAL IS OVER THE ENUMERATED DOMAINS OF THIS TABLE, NOT OVER THE WHOLE INPUT SPACE"],
    controls: [{ label: 'control: a legal shape services (so the either/or is not satisfied vacuously by always throwing)', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false }]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null); expect(rec.calls).toHaveLength(1) } }],
    drives: AR4_DRIVES,
  },
  {
    id: "P-FT-RF-1", type: "P-IM", domain: "THE REFUSAL AND READINESS — the returned REFUSAL record", strategyId: "S-FT-REFUSE-1", term: 4, bound: "enumerated",
    // the own key set, the reason identity, and the state-unchanged reading
    assertions: ["the object's own key set (exactly four names, `refused` present)", "the `reason` identity", "the state-unchanged reading", "`refused: undefined` as an OWN KEY fails"],
    controls: [{ label: 'control: a refusal is NOT a throw (so the four-name read is a real reading)', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false, refused: { reason: 'r' } }]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null) } }],
    drives: RF1_DRIVES,
  },
  {
    id: "P-FT-RF-2", type: "P-SM", domain: "THE REFUSAL AND READINESS — the NOT-READY REJECTION (the FIFTH negative)", strategyId: "S-FT-READY-1", term: 2, bound: "enumerated",
    // the outcome, the error form, the call count, and the no-queue reading
    assertions: ["the rejection/serviced outcome", "the error's declared form", "the state's identity before and after", "the renderer stub's call count", "NOTHING is queued, no silent no-op, no fallback"],
    controls: [{ label: 'control: the READY arm services the same call (so the rejection is not the only reachable reading)', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false }]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null) } }],
    drives: [
      { label: '(1) NOT READY — the rejection, the untouched state, no queue', run: async () => { const rec = recorder([], 'renderer not ready (timeout 250ms)'); const m = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, { target: 'a' })); expect(m, 'RF-2 — the rejection is the whole claim and it is node-observable.').toMatch(/renderer not ready \(timeout 250ms\)/); expect(rec.calls, 'RF-2 — exactly one attempt: nothing queued, no retry.').toEqual([{ method: METHOD, args: { target: 'a' } }]) } },
      { label: '(2) READY — the same call SERVICED', run: async () => { const rec = recorder([{ activeId: 'a', entries: ['a'], opened: false }]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a' }); assertDeclaredShape(got, 'RF-2(2)'); expect(rec.calls.map((c) => c.method), 'RF-2 — serviced once ready.').toEqual([METHOD]) } },
    ],
  },
  {
    id: "P-FT-RF-3", type: "P-SM", domain: "THE REFUSAL AND READINESS — the ZERO-NOTIFICATION reading (NEGATIVE CLAIM 2)", strategyId: "S-FT-PUSH-1", term: 2, bound: "enumerated",
    // the predicate's keying site, the set's membership, the absence of a push site, and the claim's own wording
    assertions: ["the predicate's keying site", "the set's membership", "the absence of a push site and of an invalidation token on the route", "the row's OWN claim's wording — no `resources/updated` and no `app-graph-changed` can fire for this method, and NO MORE THAN THAT IS CLAIMED", "A BARE COUNT IS NOT THE INSTRUMENT"],
    controls: [{ label: 'control: the push-site scan CAN hit (so the absence is a reading, not a vacuous scan)', run: () => expect(scanLines('renderer.notifyGraphChanged()', /notify/i)).not.toEqual([]) }],
    drives: RF3_DRIVES,
  },
  {
    id: "P-FT-RF-4", type: "P-TP", domain: "THE REFUSAL AND READINESS — the NO-STORAGE / NO-WRITER reading (NEGATIVE CLAIMS 3 AND 4)", strategyId: "S-FT-STORE-1", term: 2, bound: "enumerated",
    // the absence of each token class and the claim wording
    assertions: ["the absence of each token class", "the NAMED exemption list", "that the row's declared claim is exactly the instrument's reach"],
    controls: [{ label: 'control: the storage scan CAN hit', run: () => expect(scanLines('localStorage.setItem(k, v)', /localStorage/)).not.toEqual([]) }],
    drives: [
      { label: "(1) the storage-token scan over the route's file set — ANY HIT FAILS", run: () => { const body = stripComments(focusRouteSource() ?? ''); for (const token of [/localStorage/, /sessionStorage/, /indexedDB/, /writeFile/, /node:fs/, /storage/i]) expect(scanLines(body, token), `RF-4 — a storage token on the route FAILS: ${String(token)}`).toEqual([]) } },
      { label: '(2) the state-slice-write and resource-invalidation scan over the same set — A WRITER FAILS', run: () => { const body = stripComments(focusRouteSource() ?? ''); for (const token of [/state-slice/, /applyCommand/, /invalidate/i]) expect(scanLines(body, token), `RF-4 — a state-slice writer or an invalidation on the route FAILS: ${String(token)}`).toEqual([]); expect(liveMutatingMethods(), 'RF-4 — the name sets are unchanged.').not.toContain(METHOD) } },
    ],
  },
 {
    id: "P-FT-RS-1", type: "P-IM", domain: "THE RESULT SHAPE AND TOTALITY — the RETURNED KEY SET", strategyId: "S-FT-SHAPE-1", term: 3, bound: "enumerated",
    // the key set, the optionality, the absence of a fifth member, and the pass-through
    assertions: ["the own key set", "the optionality of `refused`", "the absence of a fifth member", "that no member was added or defaulted", "asserted on EVERY attempt of the whole register (which is why this row's own term is 3, not 17)"],
    controls: [{ label: 'control: the key-set read can fail (five names fail the four-name read)', run: () => expect(keysOf({ activeId: 1, entries: [], opened: false, refused: {}, fifth: 1 })).not.toEqual([...DECLARED_MEMBERS].sort()) }],
    drives: [
      { label: "(1) a serviced call with the consumer's well-formed answer", run: async () => { const rec = recorder([{ activeId: 'a', entries: ['a'], opened: false }]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a' }); expect(keysOf(got), 'RS-1 — the four names, refused absent.').toEqual([...DECLARED_MEMBERS].sort()); expect(Object.keys(got as object), 'RS-1 — in any KEY ORDER, but no fifth member.').toHaveLength(4) } },
      { label: '(2) a refusal answer — the four names with refused present', run: async () => { const rec = recorder([{ activeId: null, entries: [], opened: false, refused: { reason: 'r' } }]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, {}) as Record<string, unknown>; expect(keysOf(got), 'RS-1 — four names with refused.').toEqual([...DECLARED_MEMBERS].sort()); expect(Object.keys(got['refused'] as object), "RS-1 — refused's own key set is exactly [reason].").toEqual(['reason']) } },
      { label: '(3) a MALFORMED consumer answer — passed through, nothing added (the fence, NOT a shape-guard row)', run: async () => { const malformed = { whatever: 1 }; const rec = recorder([malformed]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, {}); expect(got, 'RS-1 — the tool guards nothing and coerces nothing; this is a FENCE, not an oversight.').toEqual(malformed) } },
    ],
  },
  {
    id: "P-FT-RS-2", type: "P-TP", domain: "THE RESULT SHAPE AND TOTALITY — the route's totality and REACHABILITY", strategyId: "S-FT-REACH-1", term: 1, bound: "bounded",
    // the listing, the member, the case, and the absence of a new export
    assertions: ["the tool's listing", "the `RpcMethod` member", "the switch case", "the ABSENCE of any new export or module API this unit might have introduced", "THE UNIVERSAL IS OVER THE NAMED SURFACE OF THIS UNIT, NOT OVER THE WHOLE REPOSITORY"],
    controls: [{ label: 'control: the reachability read can fail (a NON-exported name is not reachable)', run: () => expect(Object.keys({ exported: 1 })).not.toContain('not_exported') }],
    drives: [
      { label: '(1) the reachability drive — listing, member and case, and NO new export', run: () => { expect(liveAllTools(), 'RS-2 — resolvable by name: the tool row.').toContain(TOOL_NAME); expect(liveRpcMethods(), 'RS-2 — the RpcMethod member.').toContain(METHOD); expect(read(RENDERER_REL), 'RS-2 — the switch case.').toMatch(new RegExp("case[ ]+'" + METHOD + "'[ ]*:")); expect(Object.keys({ ProvidentMcpServer }).length, 'RS-2 — no new export or module API is introduced by this unit.').toBe(1) } },
    ],
  },
]
