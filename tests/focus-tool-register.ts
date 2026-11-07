// tests/focus-tool-register.ts — THE `§5.5.1` PROPERTY REGISTER of `U-FOCUS-TOOL` (`F3`), RE-GRAINED.
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts` only,
// so it is never collected as a suite). It carries the register's TYPED ROWS and the
// harness that EXECUTES them, and `tests/focus-tool.test.ts` imports both — so the
// register rides the SAME node suite (`npm test`, `§5.2` leg 1) exactly as `§5.5.1`
// requires, and the test file itself stays reviewable.
//
// CONTRACT NOW — `docs/L2/mcp-surface/interface.md`: **`§3` THE ANSWER SHAPE** (the reading the route
// answered: `status`/`order`/`landing`/`rows`/`witness` — the client's committed reading, `witness`
// included — plus the `refused` member a refusal rides with, its `reason`/`message` the writing
// realm's own, and the SEPARATE third arm whose members are the reading's OWN carried unchanged),
// **`§4` THE ARGUMENT SPACE** (a non-string `target` is the ROUTE's refusal VALUE, never this tool's
// throw — the tool's one refusal class is its arguments' `TypeError`), **`§5` THE DESCRIPTION AND THE
// SCHEMA PROSE** (prose, and NOT a battery's subject), **`§7` THIS MODULE'S DISPOSITIONS** (each row's
// re-grain or headstone, by id). The DELETED answer shape was the renderer focus model's
// `{ activeId, entries, opened }`: it does NOT survive, and those three names appear in
// NO answer fixture and in NO assertion about an answer below (D-141, D-142).
//
// THE ARCHIVED `docs/specs/focus-tool.md` IS THE GATE-ERA RECORD — CITED, NOT ASSERTED.
// It is filed at `archive/gate-corpus-2026-10-29/specs/focus-tool.md`, and the `§5.5.x`,
// `§3.x` and `§0A` cites below name ITS clauses so a reader can audit where each claim
// came from; no row reads that document's sentences as its subject.
//
// THE TOOL'S OWN ROLE BYTES ARE UNMOVED: the name `provident.focus`, the title `Focus a
// target`, the declared `{ target?, newTab? }` shape, the `dispatch` gate group and the ONE
// invoke seam (`focusHandler`'s `backend.invoke('focus', passed)`). What moved is the ANSWER
// SHAPE and the registration's DESCRIPTION.
//
// THE REGISTER KEEPS ITS TWENTY ROWS AND ITS TWENTY TERMS, so its declared total is still
// the TWENTY-CELL SUM `73`, printed with its chain and its two subtotal decompositions —
// EVERY row keeps its id under a RE-GRAIN or a HEADSTONE, never under a RETIREMENT, so no
// count is orphaned by this pass (D-30, D-40). DECLARED_TERMS, DECLARED_TOTAL, the
// superseded seventeen-cell `67`, the chain, the two subtotal decompositions, the bounded
// set and the reading classes are UNMOVED: that arithmetic is the register's, not this
// pass's. (The figures, printed with their terms, are `DECLARED_TERMS` = `[4, 3, 3, 2, 2 |
// 2, 3, 10, 2, 1 | 11, 2, 2, 12 | 4, 2, 2, 2 | 3, 1]` and `DECLARED_TOTAL` = `73` = `14`
// (RT) + `18` (ID) + `27` (AR) + `10` (RF) + `4` (RS).)
//
// THE BATTERY THAT EXECUTES THIS REGISTER CARRIES THE FILE-SCOPE `rework` MARK, and this
// module is executed only from there, so EVERY row of both files reports **ON NOTICE** and
// nothing here gates (`strata/decisions.md` D-30, D-40). The rows that pin the DELETION EACH
// NAME THEIR OWN EDIT and are green once it lands: `P-FT-RS-1`'s third drive scans the FOCUS
// REGISTRATION BLOCK's own bytes in `src/main/mcp-server.ts` (L1 §6 `E-5`'s description included,
// bounded at that block's closing brace by `registrationRegionOf`), and the test file's `G4-E1`…`E4`
// headstones read `src/renderer/renderer.ts` (`E-1`). A row that reds on the deletion is reporting
// the deletion, not a broken tool — and a row that reds on a SIBLING tool's words is reporting its
// own REGION, which is why that bound is a reading with a control, not a convention.
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
// THE TWO AUTHORED TERMINALS' IDS, for the `witness` fixture below: the envelope's own spelling, never this
// register's (`src/shared/demo-envelope.ts`; `src/renderer/tabs-client.ts` resolves through them too).
import { TABS_ERROR_PAGE_ID, TABS_LANDING_PAGE_ID } from '../src/shared/demo-envelope.js'
// **THE CONSUMED MODULE'S OWN RULE IS NOT IMPORTED ANY MORE** (D-142): the retained focus
// model's holder role — `focusTransition`, `focusOrder`, `FocusState` and the
// `consumerResolution` surface that replayed a forwarded payload through them — is no
// longer consulted by this tool. The authority is now the TAB RECORD and its own
// `exactly-one-active` repair (`docs/L2/store-tabs-record/interface.md` §1, §4), so the
// rows read the record's answer and the record's write route instead of a model rule.
// `src/shared/focus-model.ts` still exists and still has its own battery; this register
// just holds no claim about it (D-30).

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TOOL_NAME = 'provident.focus'
const METHOD = 'focus'
// **THE GATE-ERA RECORD'S ARCHIVED PATH** is `archive/gate-corpus-2026-10-29/specs/
// focus-tool.md`: it is the document the `§5.5.x`/`§3.x`/`§0A` cites below name, CITED and
// NOT ASSERTED (`docs/L2/mcp-surface/interface.md` §7). The live contract is
// `docs/L2/mcp-surface/interface.md`, and no row here reads the archived document's
// sentences as its subject.
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
  // The sixth group's five names, moved here by the declared census exception
  // (`docs/L1/central-data-census-exception.md` §4: `ALL_TOOLS` 22 → 27).
  'provident.data.read', 'provident.data.write', 'provident.data.delete', 'provident.data.list',
  'provident.data.journal',
]
export const EXPECTED_GROUPS: string[] = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
export const EXPECTED_MUTATING: string[] = ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal']
/** **THE RECORD ARM'S ALWAYS-PRESENT MEMBERS — THE FIVE NAMES `docs/L2/mcp-surface/
 *  interface.md` §3 declares for the act that landed and was re-read** (`status`, `order`,
 *  `landing`, `rows`, `witness`): the tab client's COMMITTED READING, copied VERBATIM by the
 *  seam — the record's own declared read answer (`docs/L2/store-tabs-record/interface.md` §2)
 *  plus the `witness` `createTabsClient` derives over its rows (`src/renderer/tabs-client.ts`'s
 *  `TabsClientReading`/`TabsWitness`; `src/renderer/renderer.ts`'s `FocusActAnswer` is
 *  `TabsClientReading & {refused?}`, which is why the answer carries it).
 *
 *  **THE SHAPE MOVED; THE READ DID NOT.** The deleted shape was the renderer focus model's
 *  `{ activeId, entries, opened }` (D-142). The re-grained surface is the reading's: the
 *  active id is read off `landing` (the record's DERIVED landing entry — `landingOf`, D-76),
 *  the ordered ids off `order`, the row content off `rows`, and "opening" is read off
 *  `order` GROWING BY ONE, because there is no `opened` member in any arm. **`witness` IS NOT
 *  A MEMBER OF THE RECORD**: it is the client's own derivation — which authored terminal stands,
 *  and what the envelope resolved for it — and this register carries it because the ANSWER
 *  carries it; a fixture without it would model an answer the renderer cannot send.
 *
 *  The as-filed reading asked a record's own key set to EQUAL all the declared names, which
 *  is MUTUALLY EXCLUSIVE with the requirement that `refused` be ABSENT on an act that was
 *  not refused. The two readings cannot both be driven, so the surface itself is what is
 *  asserted: **THE FIVE REQUIRED MEMBERS ARE ALWAYS PRESENT ON THE RECORD ARM, AND `refused`
 *  IS PRESENT IFF THE ACT'S WRITE WAS REFUSED** — with a falsifier for BOTH failure modes
 *  kept real (`P-FT-RS-1`'s own controls). */
export const REQUIRED_MEMBERS: string[] = ['status', 'order', 'landing', 'rows', 'witness']
/** THE OPTIONAL MEMBER, NAMED ONCE: present IFF the act's write was refused, and never as
 *  `undefined` (`docs/L2/mcp-surface/interface.md` §3, D-136, D-142). */
export const OPTIONAL_MEMBER = 'refused'
/** THE SIX DECLARED NAMES THE RECORD ARM'S FIXTURES USE — required ∪ optional. This list is
 *  a READER'S union, never one key-set equality: the equality is asserted through the two
 *  helpers below, which is the reading the surface actually declares. */
export const DECLARED_MEMBERS: string[] = [...REQUIRED_MEMBERS, OPTIONAL_MEMBER]
/** **THE FOUR MEMBERS OF A READING THE CLIENT ITSELF REFUSED** — asserted SEPARATELY from the
 *  record arm (`docs/L2/mcp-surface/interface.md` §3: "the two arms' key sets are asserted
 *  separately, because `status` is what tells them apart"). The four names are
 *  `src/renderer/tabs-client.ts`'s `TabsRefusedAnswer` (`status`/`reason`/`message`/`address`),
 *  whose vocabulary is `docs/L2/store-tabs-record/interface.md` §3's; `address` is `null` where
 *  the refused read named none.
 *
 *  **A READING THAT IS `absent` OR `unread` IS NOT THIS ARM** (`interface.md` §3's third arm):
 *  the client declares those with their OWN members (`{status, reason}` and
 *  `{status, reason, detail}`), so they are carried unchanged and asserted BY IDENTITY — a key
 *  set minted here for them would re-spell a status and two members the surface never sends. */
export const REFUSAL_ARM_MEMBERS: string[] = ['status', 'reason', 'message', 'address']
/** **THE `refused` MEMBER'S THREE ALWAYS-PRESENT NAMES** — the WIDENED shape
 *  `docs/L2/mcp-surface/interface.md` §3 (rev 3) declares for the member that rides a refused act's
 *  record arm, and §7's `P-FT-RF-1` row re-grains: the WRITER'S LEDGER, carried MEMBER FOR MEMBER.
 *  `status:'refused'`, the writer's own `reason` and the `message` beside it are present on EVERY
 *  refusal, whichever writer refused — the store's (`ASM-10`) or the route's own two words.
 *
 *  **THIS IS A DIFFERENT SUBJECT FROM `REFUSAL_ARM_MEMBERS` BESIDE IT.** That constant names the
 *  tab CLIENT's refused READING `{status, reason, message, address}` — the third arm's answer,
 *  asserted by `assertRefusalArm`. This one names the `refused` MEMBER of the SECOND arm, which
 *  is the store's ledger and never the reading; the two sets coincide on `status`/`reason`/
 *  `message` and on nothing else, so one key set would be satisfiable only by an answer the
 *  contract does not declare (§3). */
export const REFUSED_ALWAYS_MEMBERS: string[] = ['status', 'reason', 'message']
/** **THE THREE NAMES THE `refused` MEMBER CARRIES ONLY WHERE THE WRITER SENT THEM** (§3, §7 rev 3;
 *  `ASM-10`; D-142, D-103, D-107). The ledger's `storeStatus`, `path` and `log` are SPREAD IN ONLY
 *  WHERE ANSWERED — `storeStatus` says WHICH store arm refused, `path` is the address the pass
 *  named, and `log` is an ENUMERABLE array of plain records (D-103, D-107), which is exactly why an
 *  MCP answer can carry it. A member the writer did not send is **ABSENT, never an own
 *  `undefined` key**, and a member the writer DID send may not be dropped: electing which of the
 *  store's members an agent may see would be the surface SELECTING, a transformation D-142's
 *  *"no transformation"* forbids as much for MEMBERS as for VALUES (`ASM-10`).
 *
 *  **AND THE EXCLUDED TWO ARE `floor`/`through`**: they ride the ledger's `cursor-unknown` arm
 *  alone, an arm this route's `write` composes on none, so neither is in either list here — a
 *  fixture that minted one would be pinning a shape the writer cannot send at this crossing. */
export const REFUSED_CARRIED_MEMBERS: string[] = ['storeStatus', 'path', 'log']
/** **THE DELETED SHAPE'S THREE MEMBER NAMES** (D-142). NO answer fixture and NO assertion
 *  about an answer carries them: they are named ONCE here so `deletedShapeSites` can prove
 *  their absence from the tool's own route bytes and from every record fixture. */
export const DELETED_SHAPE_MEMBERS: string[] = ['activeId', 'entries', 'opened']

/** **THE `witness` THE CLIENT DERIVES, AS THE RECORD-ARM FIXTURE CARRIES IT** — `src/renderer/tabs-client.ts`'s
 *  `TabsWitness`: the two authored terminals, each `{witness, nodeId, resolved}` plus the evidence that decided it
 *  (`landing.activeIds`, `error.tabId`). **THIS IS A STAND-IN AND ITS EVIDENCE IS THE KEY SET, NOT THE DERIVATION**:
 *  the derivation is `deriveTabsWitness`'s own battery (`tests/integration/store-tabs-record/tabs-client.test.ts`),
 *  and no row here reads a member of this object — what the rows read is whether the ANSWER carries the member the
 *  client declares (`docs/L2/mcp-surface/interface.md` §3). `resolved` is `null` on both terminals because the
 *  register supplies no envelope query, exactly the client's own answer on a resolver-less realm. */
export const WITNESS_FIXTURE: Record<string, unknown> = {
  landing: { witness: true, nodeId: TABS_LANDING_PAGE_ID, activeIds: [], resolved: null },
  error: { witness: false, nodeId: TABS_ERROR_PAGE_ID, tabId: null, resolved: null },
}

/** **THE RECORD ARM'S ANSWER, BUILT ONCE** — the shape `docs/L2/mcp-surface/interface.md` §3
 *  declares for an act that landed and was re-read: the client's committed reading, so the
 *  record's four members PLUS the `witness` the client derives over its rows (`WITNESS_FIXTURE`).
 *  `refused` is spliced in ONLY when it is supplied (the writing realm's own refusal answer,
 *  carried with its `reason`/`message`), so the fixture cannot carry a `refused: undefined` own
 *  key. `order`, `landing` and `rows` are deliberately typed `unknown`: the rows arrive as
 *  `unknown` fixtures in this node battery (a non-array `rows`, an array-like holder and a
 *  throwing-accessor array are three of `P-FT-ID-3`'s ten shapes), and the tool is a
 *  passthrough that must not normalise any of them — the same reason `witness` is a constant
 *  here and not a function of `rows`. */
export function recordAnswer(
  order: unknown, landing: unknown, rows: unknown, refused?: Record<string, unknown>,
): Record<string, unknown> {
  const answer: Record<string, unknown> = { status: 'committed', order, landing, rows, witness: WITNESS_FIXTURE }
  if (refused !== undefined) answer['refused'] = refused
  return answer
}

/** **THE THIRD ARM'S REFUSED READING** — `{ status: 'refused', reason, message, address }`, the arm
 *  answered when the reading is a REFUSED one (`docs/L2/mcp-surface/interface.md` §3's third arm:
 *  a reading that is not a record, carried verbatim — `renderer-wiring` §7 `ASM-6`). These four
 *  members are the tab client's own `TabsRefusedAnswer` (`src/renderer/tabs-client.ts`) and
 *  `reason` is the reading's own word, so nothing here is the tool's invention. THE OTHER TWO
 *  NON-RECORD READINGS ARE NOT THIS SHAPE AND ARE NOT BUILT HERE: `absent` is `{status, reason}`
 *  and `unread` is `{status, reason, detail}`, and `readingArm` builds those so the rows can
 *  assert them BY IDENTITY.
 *
 *  **AND THE TWO NO-ACT CASES ARE THIS ARM'S NEITHER**: an act that names no row writes nothing
 *  and answers the RECORD AS READ (`renderer-wiring` §2: "an act that names no row has no act"),
 *  and an act whose target no standing row carries with `newTab` not `true` answers the record as
 *  read BESIDE the route's own reason in the `refused` member (`renderer-wiring` §7 `ASM-5`) —
 *  i.e. the record arm with `refused` present, never this arm. */
export function refusalAnswer(
  reason: unknown, message: unknown, address: readonly (string | number)[] | null,
): Record<string, unknown> {
  return { status: 'refused', reason, message, address }
}

/** **A READING THE CLIENT ANSWERED THAT IS NOT A RECORD** — carried BY IDENTITY, never re-spelt.
 *  `src/renderer/tabs-client.ts`'s `TabsClientReading` declares `absent` as `{status, reason}`
 *  and `unread` as `{status, reason, detail}`, so this fixture mints no fifth member, rewrites no
 *  status and invents no `message`: the rows assert the answer EQUALS what the seam answered
 *  (`docs/L2/mcp-surface/interface.md` §3's third arm). */
export function readingArm(status: 'absent' | 'unread', reason: string, detail?: string | null): Record<string, unknown> {
  return detail === undefined ? { status, reason } : { status, reason, detail }
}

/** **THE WRITING REALM'S OWN REFUSAL, CARRIED AS THE `refused` MEMBER** — the store surface's
 *  refusal answer UNCHANGED (`docs/L2/mcp-surface/interface.md` §3 rev 3, §7; the store's members
 *  are `central-data` §2's `DataLedger`, site `src/main/data/mapper.ts`'s `refusalLedger`, whose
 *  vocabulary is `docs/L2/store-tabs-record/interface.md` §3's). **THE MEMBER IS AN OBJECT AND
 *  NEVER A BARE WORD**: `reason` is always present, so a caller reads `refused.reason`.
 *
 *  **THE WIDENED RULE, STATED HERE RATHER THAN LEFT TO "whatever else the writer sent"** (§3 rev 3,
 *  `ASM-10`; D-142, D-103, D-107): the members of this object are THE LEDGER'S, spread in ONLY
 *  WHERE THE WRITER SENT THEM — `storeStatus`, `path` and `log` are present exactly when `extra`
 *  carries them and ABSENT otherwise, so no own `undefined` key is ever minted for one the writer
 *  did not answer; **`floor` and `through` are EXCLUDED**, because they ride the ledger's
 *  `cursor-unknown` arm alone and this route's `write` composes on none. `log` is an enumerable
 *  array of plain `DataLogEntry` records (`src/main/data/types.ts`), which is why an MCP answer can
 *  carry it at all. A ROUTE-side refusal without a write (`ASM-5`) rides the same member with the
 *  route's own reason and NO carried member; the surface re-spells neither, drops nothing and
 *  invents nothing — `assertRefusedLedger` is the reading of that. */
export function storeRefused(
  reason: unknown, message: unknown, extra?: Record<string, unknown>,
): Record<string, unknown> {
  return { status: 'refused', reason, message, ...(extra ?? {}) }
}

/** A RECORD ROW FIXTURE — the local narrow shape the rows are built from. It is deliberately
 *  NOT an import of `src/shared/types.ts`'s `TabsRecordRow` (`{ id: string, target: string,
 *  active: boolean, error?, label?, lastActiveAt? }`, READ and not guessed): the record's rows
 *  arrive here as `unknown` fixtures, and this register imports no `src/` type it cannot
 *  resolve exactly (`docs/L2/mcp-surface/interface.md` §3). */
export interface RecordRowFixture {
  readonly id: string
  readonly target: string
  readonly active?: boolean
  readonly error?: string | null
  readonly label?: string
  readonly lastActiveAt?: number | string
}

/** ONE ROW, from its id — `target` defaults to `target-<id>` so a fixture's row content is
 *  readable at the call site. */
export function recordRow(id: string, extra?: Partial<RecordRowFixture>): RecordRowFixture {
  return { id, target: `target-${id}`, ...(extra ?? {}) }
}

/** **THE DELETED SHAPE'S SITES, FOUND IN TEXT** — the instrument behind `P-FT-RS-1`'s third
 *  drive and the test file's `G4-E1`…`E4` headstones. It scans for the three names D-142 deletes
 *  (`DELETED_SHAPE_MEMBERS`, word-boundary, so `entries` is not found inside a longer word) and
 *  returns the offending lines as `<line>: <trimmed text>` — so a row can assert EMPTINESS over
 *  the tool's own route bytes, and a control can prove the same reader CAN hit a canary
 *  carrying those names. A scan without that control would be a vacuous scan. */
export function deletedShapeSites(src: string): string[] {
  return scanLines(src, new RegExp(`\\b(?:${DELETED_SHAPE_MEMBERS.join('|')})\\b`))
}


/** The `src/main/security.ts` export NAMES as filed at this unit's red time — THE FROZEN BASELINE the
 *  `P-FT-RT-5` drive `(2)` reads, so an undeclared NEW EXPORT (an alias, a re-export, a second resolution
 *  path) FAILS the row rather than being absorbed (`§5.5.2` item 4b's obfuscation fence).
 *
 *  **⟶ AMENDED 2026-10-05 (THE CROSS-UNIT SIBLING-REGISTRY REPAIR PASS — `U-SECURE-EXCLUSION` `S1`'s TWO
 *  DECLARED ADDITIONS; THE AS-FILED LIST ABOVE IS KEPT BYTE-FOR-BYTE AND IS *NOT* REWRITTEN).**
 *  **THE MEASURED CAUSE:** `S1`'s gate-3 green added `ExclusionState` (a `type`) and `exclusionAllowsWork`
 *  (a `function`) to `src/main/security.ts`, and the as-filed read — *"no export name beyond this list"* —
 *  therefore listed exactly those two names and reported `P-FT-RT-5` broken. **THE ADDITIONS ARE THE
 *  CONTRACT'S, NOT THE FOCUS UNIT'S:** `docs/specs/secure-exclusion.md` `§2.2` item 1 REQUIRES
 *  `exclusionAllowsWork` (the gate's exclusion predicate), and `ExclusionState` types the `§2.4` item 4 /
 *  `PAR-13` read-side widening; both live in `security.ts` because that is where the gate lives. Under
 *  `docs/specs/gutter.md` `§3.4 R-4` (*"a later unit that legitimately imports THIS module is not a
 *  violation of it"*) and `§5.1`'s commit-range scope rule, a *sibling row reading a later unit's commits
 *  as its own diff* is the instrument's defect, not the unit's.
 *  **THE AS-FILED INSTRUMENT IS A PROXY FOR THE CLAIM, AND THE AMENDMENT RE-SCOPES IT TO THE CLAIM:** the
 *  row exists to stop **THE FOCUS UNIT** from obfuscating its OWN group resolution — an alias, a re-export
 *  or a second resolution path — not to freeze every unrelated name in a file the tool merely consumes.
 *  So the fence now reads: **EVERY name in `security.ts` must be DECLARED — either in the frozen baseline
 *  above, or in `S1_OWNED_SECURITY_EXPORTS` below WITH ITS OWNING UNIT AND SPEC CLAUSE NAMED — so an
 *  UNDECLARED export FAILS the row, and the focus unit's own added name FAILS it twice over** (undeclared,
 *  and a focus-shaped addition is exactly what `§2.2 P-FT-5`'s name-set pins forbid).
 *  **WHAT THE AMENDMENT DOES *NOT* WEAKEN:** the fence still bites (`addedSecurityExports` is driven both
 *  ways at the row's own controls — a synthetic focus-shaped ALIAS is REJECTED, and the PRE-AMENDMENT form
 *  is driven inline over the LIVE file and MUST report the two names, which is the proof that the
 *  narrowing was owed rather than convenient); no baseline name is removed or renamed; the branch scan
 *  (`branchLines`) and the required group-map data row (`mapLiteral`) are untouched; and this list remains
 *  a DECLARATION SITE — a name is admitted only by naming its owner and the clause that requires it, never
 *  by emptying the list or by a `true`-hatch. */
export const SECURITY_EXPORTS_AT_FILING: string[] = ['ToolGroup', 'groupForTool', 'toolAllowed', 'moduleToolAllowed', 'defaultSecurityConfig', 'authorized', 'applyPatch', 'SecurityConfig', 'SecurityGate']
/** **THE CROSS-UNIT DECLARATION (`2026-10-05`) — `src/main/security.ts`'s names ADDED BY A UNIT OTHER THAN
 *  THIS ONE, EACH ENTERED WITH ITS OWNER AND THE CLAUSE THAT REQUIRES IT.** An entry here is admissible
 *  ONLY with an owner naming a real unit + spec clause (the sibling-registry discipline: the `R-12`
 *  registry's declarations each carry their measured cause); the set is read as a lookup by
 *  `addedSecurityExports`, so an undeclared name — including one the focus unit itself adds — is still a
 *  FAILING finding. */
export const S1_OWNED_SECURITY_EXPORTS: string[] = [
  // `docs/specs/secure-exclusion.md` §2.2 item 1 — the exclusion predicate the gate consults (its `[H]`-layer
  // API), added by `U-SECURE-EXCLUSION` (`S1`) in `src/main/security.ts` because the gate lives there.
  'exclusionAllowsWork',
  // `docs/specs/secure-exclusion.md` §2.4 item 4 / `PAR-13` — the closed two-token state type typing the
  // read-side return widening; `S1`'s addition, NOT this unit's.
  'ExclusionState',
]
/** **THE EXPORT-NAME READ (`§5.5.2` item 4b's fence), RE-SCOPED TO THE CLAIM:** every `export` name in
 *  `security.ts` that is NOT declared — neither in the frozen baseline nor by an owning unit below. Driven
 *  by `P-FT-RT-5` drive `(2)` for the live file and by that row's own controls over synthetic text, so the
 *  instrument is exercised in both directions. */
export function addedSecurityExports(security: string): string[] {
  const declared = new Set([...SECURITY_EXPORTS_AT_FILING, ...S1_OWNED_SECURITY_EXPORTS])
  return [...security.matchAll(/export\s+(?:function|class|const|let|interface|type)\s+([A-Za-z0-9_$]+)/g)]
    .map((m) => m[1])
    .filter((n) => !declared.has(n))
}

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

/** **THE BRANCH SCAN, NAMED ONCE (`P-FT-RT-5` drive `(2)` and that row's control (iii) read the SAME
 *  authority).** The CLAIM is *"no focus-specific BRANCH"* — a conditional keyed on the method name, a
 *  second resolution path — never the absence of the REQUIRED group-map data row (`§0A` note 7, defect 2).
 *  A SPLIT/BUILT literal is caught by control (iii) driving the branch form directly, and the export fence
 *  (`addedSecurityExports`) catches the alias/re-export route; keeping the scan in ONE function means both
 *  reads cannot drift apart. */
export function branchLinesOf(security: string): string[] {
  return scanLines(security, /\bfocus\b/i).filter((line) => /\bif\b|\?|&&|\|\||\bcase\b|\bswitch\b|\bthrow\b|\breturn\b/.test(line))
}

// ===========================================================================
// `MODEL-RULE SITES` — THE RE-SCOPED NO-RE-DERIVATION INSTRUMENT FOR THE TWO
// ROWS THAT SHARE IT (`§5.5.1 ID-2` and `§3.3 I-10 / §2.3` item 4)
// ===========================================================================
/** **THE MODEL-RULE SITES INSIDE THE TOOL'S OWN ROUTE REGION** — the instrument `P-FT-ID-2`
 *  and `I-10` share.
 *
 *  **⟶ 2026-09-27 RE-SCOPE, AND THE REASON IT IS A RE-SCOPE RATHER THAN A DELETION.** The
 *  as-filed instrument was *"any `===`, `.includes(` or `.indexOf(` inside the route region is
 *  the tool re-deriving a model rule"* — and it FLAGGED A MANDATORY GUARD: the tool's own
 *  unknown-key guard reads `DECLARED_ARGUMENTS.includes(key)`, and rejecting a key outside the
 *  declared set is a `§2.1` item 4 REQUIREMENT other rows (F-1/`AR-2`) pin. The scan's intent
 *  is **NO RE-DERIVATION OF THE MODEL'S RULES** — the model's ACTIVATION on the target, its
 *  IDENTITY rule and its ID POLICY (`docs/specs/focus-model.md` `§2.3`) — and **NOT "no key
 *  validation"**. THE TOOL IS RIGHT AND THE SCAN WAS OVER-BROAD, so the instrument is scoped
 *  TO THE CLAIM IT EXISTS TO CARRY.
 *
 *  **THE MODEL-RULE TOKENS — WHAT THIS SCAN NOW FLAGS, AND EACH IS A RE-IMPLEMENTATION:**
 *   (1) an ASSIGNMENT to, or an EQUALITY/INEQUALITY COMPARISON of, the model-owned fields the
 *       caller passes through (`target`, `entryId`) — a tool-side `===` on the target is a
 *       SECOND ACTIVATION AUTHORITY, which `§2.3` item 4 and the row's own cell forbid;
 *   (2) a MEMBERSHIP TEST / SEARCH over the caller's OPAQUE VALUES (`entries` / `activeId` /
 *       `opened`) — the tool asking "is this entry already there" rather than reading the
 *       consumer's answer;
 *   (3) an ID-MINTING SITE (`randomUUID` / `uuid` / a `counter`).
 *
 *  **THE EXEMPTION IS NAMED, NOT SMUGGLED.** KEY VALIDATION AGAINST THE TOOL'S OWN DECLARED
 *  SET — `DECLARED_ARGUMENTS.includes(key)` — is NOT a membership test over the caller's
 *  opaque values and is NOT re-derivation: it is the REQUIRED rejection of an undeclared key
 *  (`F-1`). The exemption fires ONLY for that reading and ONLY when the line is not an
 *  assignment into a model-owned field, so hiding a comparison behind it still FAILS.
 *
 *  **THE FALSIFIER STAYS REAL: A BODY THAT RE-IMPLEMENTS ONE OF THE MODEL'S RULES STILL
 *  FAILS.** A second equality on the target, a membership test over the caller's values or a
 *  minted id is caught (see the `ID-2` control drive and the `I-10` falsifier row, both
 *  driven, and `RT-5(b)`'s region control). */
export function modelRuleSites(src: string): string[] {
  const callerOpaque = /\b(?:entries|activeId|opened)\b/
  const membershipOrSearch = /\.(?:includes|indexOf|lastIndexOf|find|findIndex|some|filter|splice|push|concat)\s*\(/
  const modelField = /\b(?:target|entryId)\b/
  const equalityOnModelField = /\b(?:target|entryId)\b[^=!<>]*?[!=]==?/
  const assignmentToModelField = /\b(?:target|entryId)\s*(?:\?\?|(?<![=!<>])=(?!=))/
  const minting = /randomUUID|\buuid\b|\bcounter\b/i
  const declaredKeyGuard = /DECLARED_ARGUMENTS\s*\.includes\s*\(\s*key\s*\)/
  const out: string[] = []
  src.split('\n').forEach((line, i) => {
    const t = line.trim()
    const modelRule = equalityOnModelField.test(t)
      || assignmentToModelField.test(t)
      || (membershipOrSearch.test(t) && (callerOpaque.test(t) || /\bargs\b/.test(t)))
      || minting.test(t)
    if (!modelRule) return
    // THE NAMED EXEMPTION (`F-1`'s required guard): validation against the tool's OWN declared
    // key set is not a model rule — and it is exempt ONLY as a pure guard, never when the same
    // line is an assignment into a model-owned field or a search over the caller's values.
    const pureDeclaredGuard = declaredKeyGuard.test(t)
      && !assignmentToModelField.test(t)
      && !callerOpaque.test(t)
    if (pureDeclaredGuard) return
    out.push(`${i + 1}: ${t}`)
  })
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

/** **THE TOOL'S OWN BYTES — WHERE THEY ACTUALLY LIVE (`§5.1` rows 1/2; conflict 2).** The
 *  route's BYTES are NOT a single contiguous span: the tool's REGISTRATION BLOCK is inside
 *  `registerTools` (600 lines below), while its HANDLER, its declared-members list and its
 *  key guard sit at the module's top level beside the other handlers the registration refers
 *  to. Reading EITHER alone is what let the scans look green while reading the wrong bytes, so
 *  the region is the union of the two spans and every scan row reads BOTH.
 *
 *  THE HANDLER SPAN is found by the tool's own HANDLER NAME (`function focusHandler`) and runs
 *  to the closing brace of its KEY GUARD (`function keyAllowed`), so it carries the handler, the
 *  declared-members list and the guard — AND NOTHING ELSE: the two functions ABOVE it
 *  (`invokeModuleTool`) and BELOW it (`handleModuleTool`) belong to other units and are excluded. */
function toolHandlerSpan(src: string): { start: number; end: number } | null {
  const handler = src.indexOf('function focusHandler')
  if (handler === -1) return null
  const guard = src.indexOf('function keyAllowed', handler)
  if (guard === -1) return null
  const guardEnd = src.indexOf('\n}\n', guard)
  return { start: handler, end: guardEnd === -1 ? guard : guardEnd + 3 }
}

/** **THE BRACE THAT CLOSES THE BLOCK A REGISTRATION MARKER INTRODUCES** — the bound
 *  `registrationRegionOf` reads, found by BRACE MATCH from INSIDE the block (`depth` begins at `1`,
 *  because the marker's own `{` sits on the line the region deliberately excludes). String literals,
 *  template literals, line comments and block comments are skipped WHOLE, so a brace spelled inside
 *  the registration's own DESCRIPTION — `{ target?, newTab? }` — is prose and never a block boundary,
 *  and a `//` inside a description is not a comment either. `null` when the block never closes, which
 *  the caller reports as a stated FALLBACK bound rather than silently widening the region. */
function blockCloseAt(src: string, from: number): number | null {
  let depth = 1
  let i = from
  while (i < src.length) {
    const ch = src[i]
    if (ch === '/' && src[i + 1] === '/') { const n = src.indexOf('\n', i); if (n === -1) return null; i = n + 1; continue }
    if (ch === '/' && src[i + 1] === '*') { const c = src.indexOf('*/', i + 2); if (c === -1) return null; i = c + 2; continue }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      i += 1
      let closed = false
      while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue }
        if (src[i] === quote) { i += 1; closed = true; break }
        i += 1
      }
      if (!closed) return null
      continue
    }
    if (ch === '{') depth += 1
    else if (ch === '}') { depth -= 1; if (depth === 0) return i + 1 }
    i += 1
  }
  return null
}

/** THE ROUTE REGION — **BOUNDED BY THE CONTRACT'S OWN STATEMENT, NOT BY A QUOTING CONVENTION**
 *  (`§5.5.2` item 4b; `§0A` note 7 item 2(b)). The as-filed reader sliced FROM THE FIRST QUOTED
 *  OCCURRENCE OF THE TOOL NAME TO END-OF-FILE, so ANY earlier occurrence of that quoted name
 *  silently MOVED EVERY SCAN ROW'S REGION — which is how `P-FT-ID-2`'s *"the tool re-derived no
 *  rule"* scan reddened against a legitimate `===` belonging to the SHARED `graph` loop.
 *
 *  **⟶ THE REGION STARTS AT THE MARKER BLOCK'S END (conflict 2, this pass), NOT AT THE MARKER
 *  LINE'S NEXT LINE.** Two readings in a row were dishonest, and this is the second: the marker
 *  line `if (allowed.includes('provident.focus')) {` itself carries the `.includes(` a route scan
 *  forbids, so starting ON it handed every scan row a pattern its own region always carried; but
 *  moving `start` to the marker line's NEWLINE made the region the block's BODY ONLY — and the
 *  tool's own route bytes (its `focusHandler`, its declared-members list and its `keyAllowed`
 *  guard) were then moved OUTSIDE the region to satisfy the scans, so the rows read a region the
 *  tool's bytes no longer inhabited and the scans measured nothing of the tool's.
 *
 *  **THE CONTRACT'S OWN STATEMENT IS THE BOUNDARY: THE REGION IS THE TOOL'S OWN ROUTE BYTES —
 *  ITS SCHEMA, ITS HANDLER AND ITS GUARDS — WITH THE MARKER LINE *ITSELF* OUTSIDE IT.** So the
 *  region is the UNION of (a) the block the marker line introduces and (b) the tool's handler span.
 *  THE BOUNDED-REGION CLAIM IS KEPT AND STRENGTHENED: `start` is the marker block's FIRST INNER
 *  BYTE and `end` the LAST byte of that block, so a SECOND RESOLUTION PATH, a NEW EXPORT or an alias
 *  written INSIDE the block the marker introduces is INSIDE the region — and the HANDLER SPAN is
 *  inside it too, so a minting/coercion/comparison site written into the tool's own handler or guard
 *  is read as well rather than escaping into the file's 600 unread lines.
 *
 *  **⟶ THE FOURTH DEFECT, THIS PASS'S, AND THE WORST OF THE FOUR BECAUSE IT MADE A ROW READ A
 *  SIBLING'S WORDS (`P-FT-RS-1` drive 3, measured `1 failed / 89 passed` at `E-5`'s landing).** The
 *  `end` was *the next POSITIVE `if (allowed.includes(…))` marker*, and the six `provident.data.*`
 *  registrations that follow the focus block are gated by a NEGATIVE read —
 *  `if (!allowed.includes(name)) continue` — which that pattern does not match. So the region ran
 *  from the focus block THROUGH the whole `dataTools` literal to the data loop, and drive 3's scan
 *  for the three DELETED names (`activeId`, `entries`, `opened`) hit `provident.data.write`'s own
 *  description — *"`log` is the entries the commit appended"* — a DATA-JOURNAL word and not this
 *  tool's member. **THE ROW WAS RED ON A SIBLING'S PROSE, AND GREENING IT BY RE-WORDING THAT
 *  DESCRIPTION WOULD HAVE BEEN ENGINEERING THE INSTRUMENT'S NEIGHBOUR TO MAKE THE INSTRUMENT GREEN**
 *  — exactly what `RT-5(b)`'s own comment forbids (`tests/focus-tool.test.ts`), and what no grant of
 *  this unit's `E-5` covers. **A REGION IS THE TOOL'S OWN BYTES OR IT IS NOT THIS TOOL'S** (D-18,
 *  D-142): `end` is now the CLOSING BRACE of the block the marker introduces — the registration, its
 *  DESCRIPTION, its schema and its handler reference — and not one byte of the sibling registrations
 *  below it. The bound is DRIVEN BOTH WAYS over the live file at `P-FT-RS-1`'s own control (e): with
 *  the three names re-inserted into the live description the same read REPORTS them, and with them
 *  absent it reports none. */
export function registrationRegionOf(
  src: string, toolName: string = TOOL_NAME,
): { name: string; start: number; end: number; bound: 'block-close' | 'group-gate' | 'file-end' } | null {
  const blocks = [...src.matchAll(/if\s*\(\s*allowed\.includes\(\s*(['"])([^'"]+)\1\s*\)\s*\)/g)]
    .map((m) => ({ name: m[2] as string, start: m.index as number, markerEnd: (m.index as number) + m[0].length }))
  const first = blocks.find((b) => b.name === toolName)
  if (first === undefined) return null
  // THE MARKER LINE IS OUTSIDE, ITS BLOCK IS INSIDE (conflict 2): `start` is the first byte of the
  // marker block's INNER span — past the marker match and past its line terminator, which is where
  // the block the marker introduces begins (`§5.1` row 1's schema and registration).
  const lineEnd = src.indexOf('\n', first.markerEnd)
  const start = lineEnd === -1 ? src.length : lineEnd + 1
  // THE BOUND (this pass): the block the marker introduces, closed at ITS OWN LAST BRACE, so the
  // region ends where this tool's bytes end and never reaches a sibling registration.
  const close = blockCloseAt(src, start)
  if (close !== null) return { name: first.name, start, end: close, bound: 'block-close' }
  // THE FALLBACK, OF ANY POLARITY: a group gate of EITHER sign is a registration boundary, so a file
  // whose block does not close (a broken file) is bounded at the next gate of either sign rather than
  // running to end-of-file — which is precisely the reading the POSITIVE-ONLY form could not make.
  const gates = [...src.matchAll(/if\s*\(\s*!?\s*allowed\.includes\(/g)]
    .map((m) => m.index as number).filter((offset) => offset > start)
  if (gates.length > 0) return { name: first.name, start, end: Math.min(...gates), bound: 'group-gate' }
  return { name: first.name, start, end: src.length, bound: 'file-end' }
}

export function routeRegion(): ReturnType<typeof registrationRegionOf> {
  return registrationRegionOf(read(SERVER_REL))
}

/** THE HANDLER SPAN'S EXTENT, exposed so the region row asserts that the tool's OWN handler bytes
 *  are INSIDE the scanned region (conflict 2) as a READING rather than as a claim about them. */
export function routeHandlerExtent(): { start: number; end: number; body: string } | null {
  const src = read(SERVER_REL)
  const span = toolHandlerSpan(src)
  return span === null ? null : { ...span, body: src.slice(span.start, span.end) }
}

/** **IS A BYTE OFFSET INSIDE THE CONTRACT-NAMED ROUTE REGION?** — the reader the region row uses
 *  to state the region's EXTENT in this file's own terms (conflict 2), so the falsifier is a
 *  reading rather than a quoted claim. The region is the marker block's INNER span PLUS the
 *  tool's own handler span; EVERYTHING ELSE in the file — the marker line itself, the 600 lines
 *  of sibling registrations — is OUTSIDE it. */
export function inRouteRegion(offset: number): boolean {
  const region = routeRegion()
  if (region === null) return false
  if (offset >= region.start && offset < region.end) return true
  const handler = routeHandlerExtent()
  return handler !== null && offset >= handler.start && offset < handler.end
}

/** **THE MARKER OFFSET / LINE END** — the marker line ITSELF is deliberately OUTSIDE the region (its
 *  own line carries the `.includes(` a route scan forbids), so the row needs both offsets to assert
 *  the boundary rather than describe it. */
export function routeMarkerExtent(): { markerStart: number; markerLineEnd: number; markerLength: number; blockEnd: number } | null {
  const src = read(SERVER_REL)
  const marker = new RegExp(`if\\s*\\(\\s*allowed\\.includes\\(\\s*(['"])${TOOL_NAME}\\1\\s*\\)\\s*\\)`).exec(src)
  if (marker === null) return null
  const lineBreak = src.indexOf('\n', marker.index + marker[0].length)
  const region = routeRegion()
  return {
    markerStart: marker.index,
    markerLineEnd: lineBreak === -1 ? src.length : lineBreak,
    markerLength: marker[0].length,
    blockEnd: region === null ? src.length : region.end,
  }
}

/** THE SCANNED BYTES: the marker block's INNER span, FOLLOWED BY the tool's own handler span — the
 *  tool's own route bytes, in one reading (`§5.5.2` item 4b). A scan row that reads only one of the
 *  two is reading a region the tool's bytes do not inhabit, which is exactly the second defect
 *  (conflict 2) this reader closes. */
export function focusRouteSource(): string | null {
  const region = routeRegion()
  if (region === null) return null
  const src = read(SERVER_REL)
  const handler = routeHandlerExtent()
  const spans = handler === null ? `${src.slice(region.start, region.end)}` : `${src.slice(region.start, region.end)}\n${handler.body}`
  return spans
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

/** **THE LIVE MOCK SESSION — ONE TRANSPORT PER SERVER, CONNECTED ONCE AND REUSED
 *  (`§5.5.1 RT-3`/`ID-1`/`ID-2` drive `callTool` MORE THAN ONCE ON ONE `server`).**
 *
 *  THE MEASURED DEFECT THIS CACHE EXISTS FOR: the as-filed `callTool` called
 *  `server.connectMockTransport()` on EVERY invocation, which builds a FRESH transport and
 *  `connect()`s it to the SAME SDK `Server` — and the SDK throws *"Already connected to a
 *  transport. Call close() before connecting to a new transport, or use a separate Protocol
 *  instance per connection."* So every SECOND call on one server threw a harness error, and
 *  because the as-filed helper read `sent[0]` of ITS OWN fresh array it could not reuse a
 *  connection even if one had survived. A MULTI-CALL DRIVE WAS THEREFORE IMPOSSIBLE and four
 *  register rows (`RT-3`, `ID-1`, `ID-2` and `AR-3`) read `broken` for a reason that no host
 *  byte can fix — the failing read is the TEST HARNESS'S OWN (`§0A` note 7 item 3).
 *
 *  THE REPAIR, AT THE HARNESS'S OWN SITE: the transport is created and connected ONCE per
 *  `server` (a `WeakMap`, so each drive's fresh server gets its OWN session and no state
 *  crosses drives), and EVERY call pushes its request into that ONE live `sent` array and
 *  reads the reply the live connection emits. NO ROW'S CLAIM, CONTROL OR TERM MOVES: a row
 *  that drove two calls still drives two calls, and the drive now reaches the tool. */
const LIVE_SESSIONS = new WeakMap<ProvidentMcpServer, { sent: Array<Record<string, unknown>>; onmessage: (m: unknown, e?: unknown) => void }>()

async function liveSession(server: ProvidentMcpServer): Promise<{ sent: Array<Record<string, unknown>>; onmessage: (m: unknown, e?: unknown) => void }> {
  const held = LIVE_SESSIONS.get(server)
  if (held !== undefined) return held
  const sent: Array<Record<string, unknown>> = []
  const transport = {
    start: async (): Promise<void> => {},
    send: async (msg: Record<string, unknown>): Promise<void> => { sent.push(msg) },
    close: async (): Promise<void> => {},
    onclose: undefined as (() => void) | undefined,
    onerror: undefined as ((e: unknown) => void) | undefined,
    onmessage: undefined as unknown,
  }
  const sdk = server.ensureServerRegistered() as unknown as { connect(t: unknown): Promise<void>; server?: { _transport?: unknown } }
  await sdk.connect(transport)
  // THE HANDLER IS THE ONE THE CONNECTION INSTALLED: `Protocol.connect` wraps the transport's
  // own `onmessage` and stores the WRAPPED form on `_transport` — which is the function that
  // routes a JSON-RPC request into the request handlers. Reading it from the LIVE connection
  // (rather than from a private field read before `connect`) is what lets a SECOND call on the
  // same server reach the tool instead of the SDK's already-connected throw.
  const connected = sdk.server?.['_transport'] as { onmessage?: unknown } | undefined
  const onmessage = connected?.['onmessage']
  if (typeof onmessage !== 'function') throw new Error('tools/call: the connected server exposes no request handler — the mock session cannot deliver a message')
  const session = { sent, onmessage: (m: unknown, e?: unknown): void => { (onmessage as (msg: unknown, extra?: unknown) => void)(m, e) } }
  LIVE_SESSIONS.set(server, session)
  return session
}

export async function callTool(
  server: ProvidentMcpServer, name: string, args: unknown, opts?: { omitArguments?: boolean },
): Promise<unknown> {
  const session = await liveSession(server)
  const before = session.sent.length
  const id = 11 + before
  const params: Record<string, unknown> = { name }
  if (opts?.omitArguments !== true) params['arguments'] = args
  session.onmessage({ jsonrpc: '2.0', id, method: 'tools/call', params }, {})
  for (let i = 0; i < 60 && session.sent.length === before; i += 1) await new Promise((r) => setTimeout(r, 5))
  const reply = session.sent[before] as { id?: unknown; result?: unknown; error?: unknown } | undefined
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

/** **THE RECORD ARM'S SHAPE, READ AS `docs/L2/mcp-surface/interface.md` §3 DECLARES IT**:
 *  the FIVE REQUIRED members (`status`, `order`, `landing`, `rows`, `witness`) are always
 *  present, the OPTIONAL `refused` is present IFF the act's write was refused, and NO SIXTH
 *  member appears. The falsifier for the absence direction is `Object.prototype.hasOwnProperty`
 *  (`refused: undefined` is a PRESENT own key and FAILS), and the falsifier for the extra
 *  direction is the key-set difference below (any name outside the six declared names is a
 *  sixth member).
 *
 *  THE ARM IS NOT THIS HELPER'S SUBJECT: the refusal arm (`REFUSAL_ARM_MEMBERS`) is asserted
 *  SEPARATELY by `assertRefusalArm`, because `status` is what tells the two apart and a single
 *  key-set equality over both would be satisfiable only by an answer the contract does not
 *  declare (`docs/L2/mcp-surface/interface.md` §3). */
export function assertDeclaredShape(value: unknown, label: string): void {
  const got = value as Record<string, unknown>
  const keys = keysOf(value)
  for (const member of REQUIRED_MEMBERS) {
    expect(keys, `${label} — the REQUIRED member '${member}' is ALWAYS present (its absence FAILS).`).toContain(member)
  }
  expect(
    keys.filter((k) => !DECLARED_MEMBERS.includes(k)),
    `${label} — NO SIXTH MEMBER: every own key is one of the six declared names.`,
  ).toEqual([])
  const hasOptional = Object.prototype.hasOwnProperty.call(got, OPTIONAL_MEMBER)
  expect(
    keys.includes(OPTIONAL_MEMBER),
    `${label} — the OPTIONAL member '${OPTIONAL_MEMBER}' is present IFF the act's write was refused (never as \`undefined\`).`,
  ).toBe(hasOptional)
}

/** **THE OPTIONAL MEMBER'S OWN PRESENCE, NAMED ONCE** — the arm a caller declares, asserted rather
 *  than assumed: `true` requires an own `refused` key whose value is not `undefined`; `false`
 *  requires NO own `refused` key at all. A record carrying `refused` with no such outcome FAILS,
 *  and one omitting it on a refusal FAILS. */
export function assertOptionalMember(value: unknown, present: boolean, label: string): void {
  const got = value as Record<string, unknown>
  const keys = keysOf(value)
  if (present) {
    expect(keys, `${label} — the outcome CARRIES a '${OPTIONAL_MEMBER}': it must be an own key.`).toContain(OPTIONAL_MEMBER)
    expect(got[OPTIONAL_MEMBER], `${label} — and it is never present as \`undefined\`.`).not.toBe(undefined)
  } else {
    expect(keys, `${label} — the outcome carries NO '${OPTIONAL_MEMBER}': it must be ABSENT, not \`undefined\`.`).not.toContain(OPTIONAL_MEMBER)
  }
}

/** **A READING THE CLIENT ITSELF REFUSED, ASSERTED AS ITS OWN KEY SET**
 *  (`docs/L2/mcp-surface/interface.md` §3): exactly `REFUSAL_ARM_MEMBERS` — own keys, sorted — and
 *  NO member present as `undefined`. This helper's subject is the tab client's `refused` reading
 *  and NOTHING ELSE: a reading that is `absent` or `unread` is carried unchanged with its OWN
 *  members (`readingArm`), asserted by identity and never through this key set, because the
 *  surface re-spells neither its status nor its members. It is NOT the record arm's shape either
 *  and is never asserted through `assertDeclaredShape`. */
export function assertRefusalArm(value: unknown, label: string): void {
  const got = value as Record<string, unknown>
  expect(
    keysOf(value),
    `${label} — the REFUSAL ARM's own key set is EXACTLY status/reason/message/address (own keys, sorted): a fifth member, a missing member, or a renamed one FAILS.`,
  ).toEqual([...REFUSAL_ARM_MEMBERS].sort())
  expect(
    Object.values(got).every((v) => v !== undefined),
    `${label} — and NO member of the refusal arm is present as \`undefined\`.`,
  ).toBe(true)
  expect(got['status'], `${label} — \`status\` is what tells the two arms apart: the refusal arm reads 'refused'.`).toBe('refused')
}

/** **THE `refused` MEMBER'S OWN SHAPE, READ AGAINST WHAT THE WRITER SENT** — the WIDENED reading
 *  `docs/L2/mcp-surface/interface.md` §3 (rev 3) declares and §7's `P-FT-RF-1` row re-grains: the
 *  member is the WRITER'S LEDGER, carried member for member, and **THE TOOL DROPS AND INVENTS
 *  NOTHING** (`ASM-10`; D-142's *"no transformation"*, read as governing MEMBERS as well as
 *  VALUES).
 *
 *  WHAT IT READS: `value` is the answer's `refused` member as the tool returned it, and `sent` is
 *  the very fixture object the writer handed the seam — so the second argument is the LEDGER'S OWN
 *  KEY SET and never a list of names this battery hopes for. Four readings, in this order (a later
 *  one is unreadable if an earlier one already failed, so the order is load-bearing):
 *
 *  1. **NO MEMBER OUTSIDE THE DECLARED SET** — every own key is one of `REFUSED_ALWAYS_MEMBERS` ∪
 *     `REFUSED_CARRIED_MEMBERS`. `floor`/`through` ride the ledger's `cursor-unknown` arm alone and
 *     this route's `write` composes none, so their appearance here is a shape the writer cannot
 *     have sent (§3).
 *  2. **THE THREE ALWAYS-PRESENT NAMES ARE OWN KEYS** — the refusal's own `status`/`reason`/`message`
 *     are what makes the member readable as a judgement at all.
 *  3. **EACH CARRIED NAME IS AN OWN KEY IFF THE WRITER SENT IT** — the equality is against
 *     `hasOwnProperty.call(sent, member)`, so BOTH directions are driven: a member the writer sent
 *     and the tool withheld FAILS (the surface SELECTING, which `ASM-10` forbids), and a member the
 *     writer never sent and the tool minted FAILS too.
 *  4. **NO OWN VALUE IS `undefined`** — a present-but-`undefined` key is the same invention spelled
 *     the other way round, and `status`/`reason`/`message` would be unreadable behind it.
 *
 *  THIS HELPER READS THE MEMBER AND NEVER THE ARM: it is not `assertRefusalArm`'s subject (the tab
 *  client's refused READING) and not `assertDeclaredShape`'s (the record arm's own six names), so
 *  no row is asked to satisfy two shapes at once (§3). */
export function assertRefusedLedger(value: unknown, sent: Record<string, unknown>, label: string): void {
  const got = value as Record<string, unknown>
  const keys = keysOf(value)
  const declared = [...REFUSED_ALWAYS_MEMBERS, ...REFUSED_CARRIED_MEMBERS]
  expect(
    keys.filter((k) => !declared.includes(k)),
    `${label} — NO MEMBER OUTSIDE THE WRITER'S DECLARED SET: a member outside the writer's declared set is the surface inventing one, and \`floor\`/\`through\` ride the ledger's \`cursor-unknown\` arm alone, an arm this route's \`write\` never composes (docs/L2/mcp-surface/interface.md §3; ASM-10).`,
  ).toEqual([])
  for (const member of REFUSED_ALWAYS_MEMBERS) {
    expect(
      keys.includes(member),
      `${label} — the member '${member}' is ALWAYS present on \`refused\`: a ledger missing it is not the writer's judgement any more, and an agent cannot read which arm refused (ASM-10).`,
    ).toBe(true)
  }
  for (const member of REFUSED_CARRIED_MEMBERS) {
    const writerSentIt = Object.prototype.hasOwnProperty.call(sent, member)
    expect(
      keys.includes(member),
      `${label} — '${member}' is present IFF the writer carried it (writer sent it: ${String(writerSentIt)}): dropped, the surface is SELECTING which of the store's members an agent may see (D-142's "no transformation", ASM-10); minted where the writer sent none, it is an own \`undefined\` key by another name.`,
    ).toBe(writerSentIt)
  }
  expect(
    Object.values(got).every((v) => v !== undefined),
    `${label} — and NO member of \`refused\` is present as \`undefined\`: the spread is of members the writer ANSWERED, never of a placeholder for one it did not (ASM-10).`,
  ).toBe(true)
}

export function keysOf(value: unknown): string[] {
  return Object.keys(value as Record<string, unknown>).sort()
}

/** THE GUARDED KEY READ (`§5.5.2` item 3(a)): THE HARNESS MUST NOT COMPUTE A KEY READ OUTSIDE
 *  ITS OWN GUARD. A REVOKED `Proxy` (the `P-FT-AR-4` drive `(10)` the contract names) and an
 *  own-keys-TRAP-THROWING `Proxy` (drive `(11)`) make `Object.keys` itself throw — so a driver
 *  that read the caller`s keys in order to BUILD ITS OWN READING STRING aborted the drive BEFORE
 *  the tool was ever reached, which made the row UNHOLDABLE BY ANY IMPLEMENTATION. Every caller
 *  key read therefore goes through this guarded form: it RETURNS the reading, or reports that
 *  the shape does not admit one — never throws into the harness. */
export function guardedKeysOf(value: unknown): string[] | null {
  try { return keysOf(value) } catch { return null }
}

export async function thrown(fn: () => Promise<unknown>): Promise<string | null> {
  try { await fn(); return null } catch (e) { return e instanceof Error ? e.message : String(e) }
}

// ===========================================================================
// THE GATE-4 REGRESSION HARNESS (`docs/specs/focus-tool.md` `§0A` note 8)
// ===========================================================================
// THE FIVE DISPOSITIONS (`§0A` note 8) ARE THE AUTHORITY FOR THE ROWS THE TEST
// FILE AUTHORS BESIDE THIS HARNESS. THE HARNESS ADDS **NOTHING** TO THE REGISTER:
// no row id, no strategy id, no term, no cap, no seed and no cell moves — these
// helpers serve the ROWS, not a register entry.

// ---- THE RENDERER WIRING's OWN BYTES (`§0A` note 8, defect 2; re-grained by D-142) -------
// **THE RETAINED FOCUS MODEL'S HOLDER HARNESS IS DELETED WHOLE** (D-142): `consumerResolution`,
// `ConsumerResolutionCall`, `ConsumerResolution`, `holderResolution`, `consumerVerbOf`, `shapeOf`
// and the `focusTransition`/`focusOrder`/`FocusState` import went with the answer shape they
// spoke for. Their subject — *"the holder is the entry-resolution authority"* — is no longer
// consulted by this tool: the authority is the TAB RECORD (`docs/L2/store-tabs-record/
// interface.md` §1, §4), whose own `exactly-one-active` repair judges the value, and whose
// `read()` answer (`{status, rows, order, landing}`) is what the tool carries unchanged
// (`docs/L2/mcp-surface/interface.md` §3). What remains below are the WIRING READERS: the
// region reader the headstone rows use to prove the carrier route is GONE, and the replacement
// reader that locates the record's write route where the carrier stood.
//
/** **THE WIRING'S BYTES, READ WHOLE.** The gate-4 rows once used this reader to find the
 *  defect `§0A` note 8 measured at the renderer's holder call site. That site's subject is
 *  now DELETED WHOLE (D-142): the renderer's focus CARRIER route is gone and the act is the
 *  TAB RECORD's write, so the headstone rows read this source to prove the carrier route is
 *  absent (`wiringFocusRegion()` → `null`) and that the REPLACEMENT site exists
 *  (`wiringTabsWriteSites`). `src/renderer/renderer.ts` is read, never edited, from here. */
export function wiringSource(): string {
  return read(RENDERER_REL)
}

/** **THE CARRIER ROUTE'S EXTENT, OR `null` WHEN IT IS GONE** — from `function focusRoute(`
 *  to that function's closing brace. **AFTER D-142 THIS MUST ANSWER `null`**: the renderer's
 *  focus-carrier route is deleted whole (`docs/L2/mcp-surface/interface.md` §7, the `G4-E1`…
 *  `E4` headstones), so a non-null answer here is the DELETION not having landed yet, and the
 *  headstone rows RED on it rather than reading a region the tool no longer has. */
export function wiringFocusRegion(): string | null {
  const src = wiringSource()
  const start = src.indexOf('function focusRoute(')
  if (start === -1) return null
  const end = src.indexOf('\n}', start)
  return end === -1 ? src.slice(start) : src.slice(start, end + 2)
}

/** **THE REPLACEMENT SITE READER — THE TAB RECORD'S WRITE ROUTE** (D-142,
 *  `docs/L2/store-tabs-record/interface.md` §5). What stands where the carrier route stood is
 *  the renderer composing the whole record from its own committed reading and handing it to
 *  the existing `data.write` route at `['tabs']` / `file` (renderer-wiring §2, §3).
 *
 *  **IT IS TOLERANT OF THE EXACT SPELLING L4 LANDS**, because the claim is *"the record's
 *  write route is here"* and never *"it is spelled this way"* (D-41: the SITE is the call, and
 *  a call is not a line): a line is a site when it carries the record's ADDRESS `['tabs']` with
 *  the tier `'file'` ANYWHERE WITHIN FOUR LINES of it, or the write CALL (`dataRoute('write'` or
 *  `data.write(`) with the member name `'tabs'` within the same window — so a multi-line call
 *  whose `path` and `tier` members stand on separate lines is read as the call it is. A window
 *  that carries neither half never matches, so a control can prove the reader does not hit an
 *  unrelated line. */
export function wiringTabsWriteSites(src: string): string[] {
  const address = /\[\s*['"]tabs['"]\s*\]/
  const namedTabs = /['"]tabs['"]/
  const fileTier = /['"]file['"]/
  const writeCall = /dataRoute\s*\(\s*['"]write['"]|data\s*\.\s*write\s*\(/
  const WINDOW = 4
  const raw = src.split('\n')
  // **PROSE IS NOT A SITE**: a line that is a comment (`//`, `/*` or a `*` continuation) states no
  // call, so it is neither a candidate nor a window member — otherwise two adjacent sentences
  // carrying the address and the tier would satisfy "the replacement site is located".
  const prose = (line: string): boolean => /^\s*(\/\/|\/\*|\*)/.test(line)
  const near = (index: number, pattern: RegExp): boolean => {
    const from = Math.max(0, index - WINDOW)
    const to = Math.min(raw.length - 1, index + WINDOW)
    for (let i = from; i <= to; i += 1) {
      const candidate = raw[i] as string
      if (!prose(candidate) && pattern.test(candidate)) return true
    }
    return false
  }
  const out: string[] = []
  raw.forEach((line, index) => {
    if (prose(line)) return
    const t = line.trim()
    const addressSite = address.test(t) && near(index, fileTier)
    const callSite = writeCall.test(t) && near(index, namedTabs)
    if (addressSite || callSite) out.push(`${index + 1}: ${t}`)
  })
  return out
}

/** **THE ID-POLICY SITES** — the falsifier shape `§0A` note 8, defect 2 named: the wiring
 *  CONSTRUCTS the entry whose id is the caller\'s target (`entry = { id: …, target: … }`), a
 *  SECOND ID POLICY. The site that carried it is DELETED (D-142), so this reader is kept as the
 *  GATE-ERA PATTERN READER the deletion\'s headstones control against: the entry-building shape
 *  must remain findable where it exists, or the deletion\'s absence proves nothing. */
export function wiringIdPolicySites(src: string): string[] {
  return scanLines(src, /\bid\s*:\s*(?:attempt\.target|payload\.target|target)\b|\bentry\s*:\s*\{/)
}

/** **THE VERB-CHOICE SITES** — the wiring decides between the open and the activate verb
 *  ITSELF (`newTab === true ? \'open\' : \'activate\'`), a SECOND ACTIVATION AUTHORITY the
 *  record now owns (`§2.1` item 7, `§0A` note 8, defect 2). Read after D-142 over the WHOLE
 *  renderer file, where its absence is the claim (`G4-E3`). */
export function wiringVerbChoiceSites(src: string): string[] {
  return scanLines(src, /\?\s*[\'"]open[\'"]\s*:\s*[\'"]activate[\'"]|[\'"]activate[\'"]\s*:\s*[\'"]open[\'"]/)
}

/** **THE REFUSAL-DERIVATION SITES** — the wiring EXTRACTS a refusal code out of a model
 *  refusal record and ships it as the `reason`, rather than carrying the STORE\'s own refusal
 *  value through: THE TOOL MAY NOT DERIVE A REFUSAL (`§0A` note 8, defect 2; `§0A` note 4:
 *  `reason` is the store\'s own string, carried verbatim —
 *  `docs/L2/mcp-surface/interface.md` §3). Read after D-142 over the WHOLE renderer file,
 *  where its absence is the claim (`G4-E4`). */
export function wiringRefusalDerivationSites(src: string): string[] {
  return scanLines(src, /refusals\s*\[\s*0\s*\]|refusals\s*\.\s*at\s*\(/)
}

// ---- the multi-line drive pools, built once and referenced by their rows -----------------
/** **`P-FT-ID-3` — THE `rows` ECHO BY IDENTITY** (`docs/L2/mcp-surface/interface.md` §7:
 *  *re-grained from the `entries` echo to the record's `rows` echo*). The SAME ten container
 *  shapes the gate-era cell drove are applied to the member that survives: an array of rows,
 *  the empty list, one row, a duplicated id, whitespace/unicode/long labels, a descending
 *  unsorted sequence, a NON-array value, an array-like holder, a frozen array, and an accessor
 *  that throws. NOTHING IS NORMALISED — the tool is a passthrough over the record's own answer —
 *  so the length, the element content, the element order and the non-array value are the
 *  fixture's own: a duplicated id is not deduped and `['c','b','a']` is not sorted. (The seam
 *  serialises the value on its way out, as it does for every answer; the claim is that the TOOL
 *  transforms nothing, so each element is read back member for member.) */
const ID3_DRIVES: Drive[] = (() => {
  const rowsAb = [recordRow('a'), recordRow('b')]
  const shapes: Array<{ label: string; rows: () => unknown; check: (got: unknown) => void }> = [
    {
      label: '(1) a plain row array',
      rows: (): unknown => rowsAb,
      check: (got: unknown): void => {
        const rows = (got as Record<string, unknown>)['rows'] as RecordRowFixture[]
        expect(rows, 'ID-3(1) — the rows the record answered with: two of them, no more and no fewer.').toHaveLength(2)
        expect(rows[0], "ID-3(1) — the FIRST element, member for member: the tool re-shapes nothing.").toEqual(rowsAb[0])
        expect(rows[1], 'ID-3(1) — and the second element likewise.').toEqual(rowsAb[1])
        expect(rows.map((r) => r.id), 'ID-3(1) — the ORDER is the answer\'s own order.').toEqual(['a', 'b'])
      },
    },
    {
      label: '(2) an empty row array — the empty record',
      rows: (): unknown => [],
      check: (got: unknown): void => {
        expect((got as Record<string, unknown>)['rows'], 'ID-3(2) — the empty list stays empty: no seed row is invented.').toEqual([])
      },
    },
    {
      label: '(3) a one-row array',
      rows: (): unknown => [recordRow('only')],
      check: (got: unknown): void => {
        expect((((got as Record<string, unknown>)['rows']) as RecordRowFixture[]).map((r) => r.id), 'ID-3(3) — one row, one id.').toEqual(['only'])
      },
    },
    {
      label: '(4) the SAME id twice — NO DEDUPE',
      rows: (): unknown => [recordRow('d'), recordRow('d', { label: 'second' })],
      check: (got: unknown): void => {
        const rows = (got as Record<string, unknown>)['rows'] as RecordRowFixture[]
        expect(rows, 'ID-3(4) — two rows carrying the same id: the tool dedupes nothing.').toHaveLength(2)
        expect(rows.map((r) => r.id), 'ID-3(4) — both ids survive, in the answer\'s own order.').toEqual(['d', 'd'])
      },
    },
    {
      label: '(5) empty/whitespace/unicode labels and a very long one — NO TRIM',
      rows: (): unknown => [recordRow('e1', { label: '' }), recordRow('e2', { label: '  sp  ' }), recordRow('e3', { label: 'unicode-pad-ü' }), recordRow('e4', { label: 'L'.repeat(5000) })],
      check: (got: unknown): void => {
        expect((((got as Record<string, unknown>)['rows']) as RecordRowFixture[]).map((r) => r.label), 'ID-3(5) — every label is carried untrimmed and uncut.').toEqual(['', '  sp  ', 'unicode-pad-ü', 'L'.repeat(5000)])
      },
    },
    {
      label: '(6) a DESCENDING, unsorted row sequence — NO SORT',
      rows: (): unknown => [recordRow('c'), recordRow('b'), recordRow('a')],
      check: (got: unknown): void => {
        expect((((got as Record<string, unknown>)['rows']) as RecordRowFixture[]).map((r) => r.id), 'ID-3(6) — a descending sequence is NOT sorted: the record\'s own order is what ships.').toEqual(['c', 'b', 'a'])
      },
    },
    {
      label: '(7) a NON-ARRAY `rows` value (null) — passed through unchanged',
      rows: (): unknown => null,
      check: (got: unknown): void => {
        expect((got as Record<string, unknown>)['rows'], 'ID-3(7) — a non-array rows value is passed through, never normalised to an empty list.').toBe(null)
      },
    },
    {
      label: '(8) an array-like holder — passed through rather than normalised',
      rows: (): unknown => ({ length: 2, 0: recordRow('a'), 1: recordRow('b') }),
      check: (got: unknown): void => {
        expect((got as Record<string, unknown>)['rows'], 'ID-3(8) — the array-like holder is carried as it arrived, not turned into an array.').toEqual({ length: 2, 0: recordRow('a'), 1: recordRow('b') })
      },
    },
    {
      label: '(9) a frozen row array — passed through',
      rows: (): unknown => Object.freeze([recordRow('f')]),
      check: (got: unknown): void => {
        expect((((got as Record<string, unknown>)['rows']) as RecordRowFixture[]).map((r) => r.id), 'ID-3(9) — a frozen array is echoed, not copied over or thawed.').toEqual(['f'])
      },
    },
    {
      label: '(10) a row array whose accessor THROWS on an index read',
      rows: (): unknown => new Proxy([recordRow('x')], { get: (): never => { throw new Error('accessor threw') } }),
      check: (): void => undefined,
    },
  ]
  return shapes.map((shape) => ({
    label: shape.label,
    run: async (): Promise<void> => {
      const rec = recorder([recordAnswer(['a', 'b'], 'a', shape.rows())])
      const server = newServer(rec.backend)
      const message = await thrown(() => callHandler(server, TOOL_NAME, {}))
      if (shape.label.startsWith('(10)')) {
        expect(message === null || /accessor threw/.test(String(message)), "ID-3(10) — a failure here must be the RECORD's own (the accessor the fixture holds), never one invented by the tool.").toBe(true)
        return
      }
      expect(message, `ID-3 ${shape.label} — nothing threw on this shape.`).toBe(null)
      assertOneFocusCall(rec, `ID-3 ${shape.label}`)
      shape.check(await callHandler(server, TOOL_NAME, {}))
      expect(rec.calls.map((c) => c.method), `ID-3 ${shape.label} — one renderer call per call.`).toEqual([METHOD, METHOD])
      expect(deletedShapeSites(JSON.stringify(rec.calls[0]?.args ?? {})), `ID-3 ${shape.label} — the forwarded arguments name NO deleted-shape member.`).toEqual([])
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
      const rec = recorder([recordAnswer([], '', [])])
      const server = newServer(rec.backend)
      const got = d.omit
        ? await callTool(server, TOOL_NAME, undefined, { omitArguments: true })
        : await callTool(server, TOOL_NAME, d.args)
      assertDeclaredShape(got, `AR-1 ${d.label}`)
      assertOptionalMember(got, false, `AR-1 ${d.label}`)
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

/** **`P-FT-RF-1` — THE STORE'S REFUSAL, CARRIED AS THE `refused` MEMBER** (`docs/L2/mcp-surface/
 *  interface.md` §3, §7: *re-grained — the `refused` member is the store's refusal unchanged,
 *  carried on the accepted arm and never converted into a success*). The four shapes are the
 *  same four the gate-era cell drove, now read on the member that survives: a plain reason
 *  string, an EMPTY reason, whitespace/unicode, and a NON-string reason — each carried with
 *  `message` BESIDE it, `refused`'s own key set exactly what the store sent (no invented member,
 *  no `undefined`-valued member), and the reading's five members still standing beside it.
 *
 *  **AND THE FIXTURES DRIVE THE WIDENING BOTH WAYS** (§3, §7 rev 3; `ASM-10`): drive `(1)` hands the
 *  seam the ledger with ALL THREE carried members — `storeStatus`, `path` and a `log` of two
 *  `DataLogEntry`-shaped plain records (`src/main/data/types.ts`, D-103/D-107) — and drives `(2)`…`(4)`
 *  hand it `storeStatus` ALONE. `assertRefusedLedger` reads each against the very object sent, so one
 *  member dropped at this crossing REDS drive `(1)` and one minted where the writer sent none REDS
 *  drives `(2)`…`(4)`; a fixture that always sent the whole ledger would leave the absent half unread. */
const RF1_DRIVES: Drive[] = (() => {
  const refusals = [
    {
      label: '(1) a plain reason string',
      reason: 'declared-tier' as unknown,
      message: "the tab record stands at 'file'" as unknown,
      carried: {
        storeStatus: 'ConstraintPassRefused',
        path: ['tabs'],
        log: [
          { kind: 'constraint-check', id: 'tabs-must-stand', opId: null, message: "the tab record stands at 'file'", state: null },
          { kind: 'outcome', id: null, opId: null, message: 'the pass closed as a refusal', state: 'KC-3' },
        ],
      },
    },
    { label: '(2) an EMPTY reason (the empty string is legal and carried verbatim)', reason: '' as unknown, message: '' as unknown, carried: { storeStatus: 'declared-tier' } },
    { label: '(3) a reason with whitespace and unicode (carried untrimmed)', reason: '  unicode-pad-ü  ' as unknown, message: '  message-pad  ' as unknown, carried: { storeStatus: 'declared-tier' } },
    { label: '(4) a NON-string reason (passed through, no coercion)', reason: { code: 7 } as unknown, message: 42 as unknown, carried: { storeStatus: 'declared-tier' } },
  ]
  return refusals.map((d) => ({
    label: d.label,
    run: async (): Promise<void> => {
      const refused = storeRefused(d.reason, d.message, d.carried)
      const rec = recorder([recordAnswer(['r'], 'r', [recordRow('r', { active: true })], refused)])
      const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'r' }) as Record<string, unknown>
      assertDeclaredShape(got, `RF-1 ${d.label}`)
      assertOptionalMember(got, true, `RF-1 ${d.label}`)
      const carried = got['refused'] as Record<string, unknown>
      expect(carried, `RF-1 ${d.label} — refused is carried on the record arm.`).toBeTruthy()
      expect(carried['reason'], `RF-1 ${d.label} — the STORE's own reason, carried unchanged; the tool invents no code and re-routes nothing.`).toEqual(d.reason)
      expect(carried['message'], `RF-1 ${d.label} — and the store's own \`message\` rides BESIDE it (no coercion, no re-spelling).`).toEqual(d.message)
      expect(Object.keys(carried).sort(), `RF-1 ${d.label} — refused's own key set is EXACTLY what the store sent: no member invented, none dropped.`).toEqual(Object.keys(refused).sort())
      // THE WIDENED SHAPE, READ AS §3 (rev 3) DECLARES IT: the three always-present names, and each
      // carried name present IFF the writer carried it — with `floor`/`through` outside the set.
      assertRefusedLedger(carried, refused, `RF-1 ${d.label}`)
      expect(Object.values(carried).every((v) => v !== undefined), `RF-1 ${d.label} — and no member of it is present as \`undefined\`.`).toBe(true)
      expect(Object.prototype.hasOwnProperty.call(got, 'refused') && got['refused'] !== undefined, `RF-1 ${d.label} — never a refused: undefined own key.`).toBe(true)
      // THE READING'S FIVE MEMBERS STILL STAND BESIDE IT: a refusal member is not a body.
      for (const member of REQUIRED_MEMBERS) {
        expect(Object.keys(got), `RF-1 ${d.label} — the record member '${member}' still stands beside the refused member.`).toContain(member)
      }
      expect(got['status'], `RF-1 ${d.label} — \`status\` keeps reporting the RECORD's read ('committed'), so the answer is not converted into a refusal.`).toBe('committed')
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
      const rec = recorder([recordAnswer([], '', [])])
      const server = newServer(rec.backend)
      const args = d.make()
      // THE CALLER-SIDE KEY READ IS GUARDED (`§5.5.2` item 3(a)): a revoked `Proxy` and an
      // own-keys-trap `Proxy` make `Object.keys` throw, and an UNGUARDED read here would
      // abort the drive BEFORE the tool was reached — the harness's own read, which no
      // implementation can make succeed. `null` means "this shape does not admit the
      // reading", and the byte-identity clause below is then satisfied BOTH times.
      const before = args !== null && (typeof args === 'object' || typeof args === 'function')
        ? guardedKeysOf(args)
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
        const after = guardedKeysOf(args)
        expect(
          after,
          `AR-4 ${d.label} — the caller's arguments object is byte-identical afterwards, and its own key set stays READABLE (an unreadable key set on the SECOND read is a mutation of the shape, and FAILS).`,
        ).toEqual(before)
      }
      if (d.label.startsWith('(6)')) {
        const rec2 = recorder([recordAnswer([], '', [])])
        const m = await thrown(() => callHandler(newServer(rec2.backend), TOOL_NAME, 12n as unknown as Record<string, unknown>))
        expect(m !== null || rec2.calls.length === 1, 'AR-4(6) — a 12n is read in the same drive: it throws the declared class or is serviced.').toBe(true)
      }
      if (d.label.startsWith('(9)')) {
        const rec3 = recorder([recordAnswer([], '', [])])
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
      const rec = recorder([recordAnswer([], '', [])])
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
      const rec = recorder([recordAnswer([], '', [])])
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
      // THE FALSIFIER, so the scan is a reading and not a ritual: a CANARY LINE CARRYING THIS
      // DRIVE'S OWN COERCION FORM is hit by at least one of the patterns this drive forbids.
      // (The as-filed control drove `forbid[0]` — `target`'s `String(…)` form — for EVERY
      // member, so the `newTab` drive ran a canary its own `Boolean(…)`/`!!`/`typeof`/`??`
      // patterns cannot match and the control reddened a row whose SCAN had actually held.
      // The canary is now member-specific and the match is asserted over the drive's whole
      // pattern set, never at a fixed index.)
      const canary = p.member === 'target' ? 'const t = String(args.target)' : 'const t = Boolean(args.newTab)'
      const caught = p.forbid.filter((re) => scanLines(canary, re).length > 0)
      expect(
        caught.length,
        `AR-3 ${p.label} control — at least one of THIS drive's ${p.forbid.length} forbidden patterns catches its own coercion form (${JSON.stringify(canary)}), so the no-coercion scan CAN hit.`,
      ).toBeGreaterThan(0)
      const defaulted = { ...args } as Record<string, unknown>
      if (p.member === 'newTab') defaulted['newTab'] = false
      else delete defaulted['target']
      expect(Object.is(defaulted[p.member], p.value), `AR-3 ${p.label} control — the identity read REJECTS a defaulted member.`).toBe(false)
    },
  }))
})()

// ---- `P-FT-RF-3`'s drive pool: THE ZERO-NOTIFICATION reading (`§5.5.4` item 1(c)) ----------
/** `2` drives, ONE DRIVE EACH, as `§5.5.1`'s own cell declares and `§5.5.4` item 1(c) restores.
 *  **THE PUSH IS THE TAB RECORD'S, NOT THIS TOOL'S** (D-137, D-142): the renderer follows the
 *  record's own change push, which exists already, so this row's negative claim is exactly
 *  *"a focus call invokes no notification and the name sets are unchanged"* — no more.
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

// ---- THE REGISTER (`§5.5.1` + `§5.5.4`): 20 typed rows / 20 terms ------------------------
/** THE REGISTER — the contract's declared TWENTY typed rows / TWENTY terms (`§5.5.1`'s full
 *  table, whose every row `§5.5.4` gives a recorded fate), in the contract's own table order,
 *  each carrying its declared TERM. NO probe row rides the register: the stop-rule control is a
 *  SEPARATE table reported BESIDE it. THE THREE ROWS `§5.5.4` item 1 restores (`P-FT-AR-2` `2`,
 *  `P-FT-AR-3` `2`, `P-FT-RF-3` `2`) are driven BY THEIR OWN DECLARED DRIVES AND BY NOTHING
 *  ELSE, and NO existing row id, strategy id, seed, cap or drive was moved to make room.
 *
 *  **THE RE-GRAIN (`docs/L2/mcp-surface/interface.md` §7), ROW BY ROW.** Every id, `type`,
 *  `strategyId`, `term`, `bound` and drive count below is UNMOVED; what moved is the CONTENT
 *  each drive reads: `RT-1`…`RT-5`, `RS-2` are FIXTURES ONLY (name, listing, group, `RpcMethod`
 *  member, the renderer's `case 'focus'`, the one-call rule, the security-export fence — all
 *  claims unmoved); `ID-1`, `ID-2` read the record's derived `landing`; `ID-3` reads the `rows`
 *  echo; `ID-4` reads the DELETION (`order` growing by one, and no `opened` member anywhere);
 *  `AR-1`…`AR-4` keep every argument-space claim; `RF-1` reads the STORE's `refused` member
 *  carried unchanged; `RF-3`/`RF-4` keep their negative readings (the change push belongs to
 *  the TAB RECORD, never to this tool); `RS-1` asserts the two arms' key sets SEPARATELY and
 *  adds the deletion's own static drive. */
export const REGISTER: readonly RegisterRow[] = [
  {
    id: "P-FT-RT-1", type: "P-IM", domain: "THE ROUTE — the listing", strategyId: "S-FT-LIST-1", term: 4, bound: "enumerated",
    // listing, uniqueness and the equality form used
    assertions: ["membership of `provident.focus` in the name set", "the set size read as a duplicate check", "the absence of a duplicate entry", "the absence of a second new name (set equality)"],
    controls: [{ label: 'control: a name that is NOT in the set is rejected by the same read', run: () => { expect(liveAllTools()).not.toContain('provident.focus_missing_control') } }],
    drives: [
      { label: '(1) membership of `provident.focus` in the name set', run: () => expect(liveAllTools(), 'RT-1 — the name is in the listing.').toContain(TOOL_NAME) },
      { label: '(2) the set size as a duplicate check', run: () => expect(liveAllTools().length, 'RT-1 — 27 members.').toBe(27) },
      { label: '(3) the absence of a duplicate entry', run: () => expect(new Set(liveAllTools()).size, 'RT-1 — no duplicate.').toBe(liveAllTools().length) },
      { label: '(4) the absence of a second new name', run: () => expect([...liveAllTools()].sort(), 'RT-1 — name-set equality against the 27 declared names.').toEqual([...EXPECTED_ALL_TOOLS].sort()) },
    ],
  },
  {
    id: "P-FT-RT-2", type: "P-IM", domain: "THE ROUTE — the registration and the DEFAULT-GATE placement", strategyId: "S-FT-GATE-1", term: 3, bound: "enumerated",
    // the resolved name, the default state, and that no seventh group exists
    assertions: ["the resolved group name", "the default state of `dispatch`", "that no seventh group name exists", "no per-call registration branch on the route"],
    controls: [{ label: 'control: an unknown tool name resolves to `null`, so the group read can fail', run: () => expect(groupForTool('provident.nonexistent_control')).toBe(null) }],
    drives: [
      { label: '(1) the group-name lookup for `focus`', run: () => expect(groupForTool(TOOL_NAME), 'RT-2 — the tool resolves to the EXISTING `dispatch` group.').toBe('dispatch') },
      { label: '(2) the ON-by-default reading of `dispatch`', run: () => expect(newServer(recorder([{}]).backend).getGateConfig().enabled, 'RT-2 — `dispatch` is ON by default, so no human grant is required.').toContain('dispatch') },
      { label: '(3) the `VALID_GROUPS` six-member name-set equality', run: () => expect(liveValidGroups().sort(), 'RT-2 — name-set-equal to its six members, NO SEVENTH.').toEqual([...EXPECTED_GROUPS].sort()) },
    ],
  },
  {
    id: "P-FT-RT-3", type: "P-SM", domain: "THE ROUTE — the INVOKE PATH and the one-call rule (the ROUTE'S OWN CELL)", strategyId: "S-FT-INVOKE-1", term: 3, bound: "enumerated",
    // the member, the case, the call count, and the routing independence
    assertions: ["the union member's presence", "the switch case's presence", "the renderer stub's call count is exactly 1 on a valid call", "the routing decision is independent of the mutating set"],
    controls: [{ label: 'control: the recording stub is a real recorder (two calls show two)', run: async () => { const rec = recorder([recordAnswer([], '', []), recordAnswer([], '', [])]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, {}); await callTool(s, TOOL_NAME, {}); expect(rec.calls.length).toBe(2) } }],
    drives: [
      { label: '(1) the union-member read against the switch case', run: () => { expect(liveRpcMethods(), 'RT-3 — the union member.').toContain(METHOD); expect(read(RENDERER_REL), "RT-3 — the switch case, read in the renderer's OWN QUOTED CASE-LABEL FORM (`case 'focus':` — the form `X-1b`/`N-11`/`RS-2` read; the as-filed form here omitted the quotes, which matches NO case label in this file and reddened the row against a conformant switch).").toMatch(new RegExp("case[ ]+'" + METHOD + "'[ ]*:")) } },
      { label: '(2) the invoke path through a recording stub (call count exactly 1)', run: async () => { const rec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })])]); const s = newServer(rec.backend); const got = await callTool(s, TOOL_NAME, { target: 'a' }); assertOneFocusCall(rec, 'RT-3(2)'); assertDeclaredShape(got, 'RT-3(2)') } },
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
    controls: [
      { label: 'control: the gate read distinguishes a disabled group (a graph tool under the default gate is absent)', run: () => expect(newServer(recorder([{}]).backend).allowedToolNames()).not.toContain('provident.load') },
      // THE OBFUSCATION FENCE'S FALSIFIERS, ALL FOUR DRIVEN (`§5.5.2` item 4b; the 2026-10-05 amendment):
      // the fence was RE-SCOPED to its claim (the FOCUS unit's own additions), NOT weakened, and these
      // controls are the proof. (i)/(ii) drive the AMENDED read in both directions over synthetic text;
      // (iii) drives a focus-flavoured ALIAS; (iv) drives the PRE-AMENDMENT form inline over the LIVE file
      // — it MUST report `S1`'s two declared names, which is exactly why the amendment was owed.
      { label: 'control: a focus-related ALIAS export still FAILS the amended fence (and a DECLARED name does not)', run: () => {
        expect(addedSecurityExports(`export function groupForToolAlias(): string { return 'dispatch' }\nexport const ${TOOL_NAME.replace('.', '_')}Group = 'dispatch'\n`),
          'RT-5 control (i) — an ALIAS and a focus-shaped added export are UNDECLARED and MUST FAIL the re-scoped fence.').toEqual(['groupForToolAlias', 'provident_focusGroup'])
        expect(addedSecurityExports(`export const declared = 1\n`.replace('declared', SECURITY_EXPORTS_AT_FILING[1])),
          'RT-5 control (ii) — a name DECLARED by the frozen baseline must NOT be reported (the fence is not a blanket ban).').toEqual([])
        expect(addedSecurityExports(`export function thing(): void {}\n`.replace('thing', S1_OWNED_SECURITY_EXPORTS[0])),
          'RT-5 control (ii) — and a name DECLARED by its OWNING UNIT (`S1`) must NOT be reported either.').toEqual([])
      } },
      { label: 'control: a RE-EXPORT/split-literal obfuscation still FAILS, and the PRE-AMENDMENT form is driven over the LIVE file', run: () => {
        const live = stripComments(read(SECURITY_REL))
        // (iii) THE OBFUSCATION SHAPE THE FENCE EXISTS FOR, DRIVEN AS A FALSIFIER: a re-spelled/second
        // resolution path (`export { map as groups }`, `export const X = 'provident.' + 'focus'`) is
        // carried by the branch scan and by an added export, and both reads MUST still bite.
        expect(scanLines("export { TOOL_GROUPS as groups } from './security.js'", /export\s*\{/),
          'RT-5 control (iii) — a re-export IS an added surface and must be visible to the fence\'s reads.').not.toEqual([])
        // THE CANARY CARRIES BOTH HALVES OF THE CLAIM ON ITS OWN TERMS: a SPLIT/BUILT literal
        // (`'provident.' + 'focus'`) AND a conditional keyed ON the method name — which is what the
        // branch scan reads. (The as-filed canary's second line read `if (n) return 'dispatch'`, which
        // carries no focus token at all: the branch scan could not hit it, so the control threw while
        // its claim held. The reading is repaired rather than the claim relented.)
        expect(branchLinesOf(`const n = 'provident.' + '${METHOD}'\nif (n === '${METHOD}') return 'dispatch'`),
          'RT-5 control (iii) — a SPLIT/BUILT literal plus a second resolution path MUST FAIL the branch scan.').not.toEqual([])
        // (iv) THE PRE-AMENDMENT INSTRUMENT, DRIVEN INLINE UNDER ITS OWN CONTROL-ONLY NAME: the as-filed
        // read (`SECURITY_EXPORTS_AT_FILING` alone, no owning-unit declarations) reports the LIVE file's two
        // `S1` names — the measured cause of this amendment, reproduced rather than asserted.
        const asFiled = [...live.matchAll(/export\s+(?:function|class|const|let|interface|type)\s+([A-Za-z0-9_$]+)/g)]
          .map((m) => m[1]).filter((n) => !SECURITY_EXPORTS_AT_FILING.includes(n))
        expect(asFiled.sort(), "RT-5 control (iv) — the PRE-AMENDMENT form reports `S1`'s two DECLARED additions over the live file, so the narrowing was owed, not convenient.").toEqual([...S1_OWNED_SECURITY_EXPORTS].sort())
        expect(addedSecurityExports(live), 'RT-5 control (iv) — the AMENDED form reports NOTHING undeclared: the fence holds with the sibling\'s declared additions in view.').toEqual([])
      } },
    ],
    drives: [
      { label: '(1) `dispatch` ON — the tool resolves and is callable', run: () => expect(newServer(recorder([{}]).backend).allowedToolNames(), 'RT-5 — registered under the default gate.').toContain(TOOL_NAME) },
      { label: '(2) `dispatch` OFF — the tool is not registered/listed', run: async () => { const gate = new SecurityGate().apply({ disable: ['dispatch'] }); expect(newServer(recorder([{}]).backend, gate).allowedToolNames(), "RT-5 — the endpoint's existing group semantics, not a new case.").not.toContain(TOOL_NAME); const security = stripComments(read(SECURITY_REL)); const focusMentions = scanLines(security, /focus/i); const branchLines = branchLinesOf(security); const mapLiteral = new RegExp(`(['"])${TOOL_NAME.replace('.', '\\.')}\\1\\s*:\\s*(['"])dispatch\\2`).test(security); // THE RE-SCOPED INSTRUMENT (`§5.5.1 RT-5`; `§0A` note 7, defect 2): THE CLAIM IS *"no
        // focus-specific BRANCH"* — NEVER the absence of the group-map DATA row `§2.1` item 2
        // and `§5.1` row 2 REQUIRE. The as-filed form asserted the method name does NOT appear
        // in this file at all, which FORBADE that required data row: NO implementation could
        // satisfy both. The required data row is therefore ASSERTED (its absence FAILS), and
        // the branch scan carries the claim. OBFUSCATION IS NOT A SATISFACTION: a SPLIT or
        // BUILT literal, a NEW EXPORT, a re-export, an alias or a computed name that hides the
        // name from this read is its own FAILING finding (`§2.2 P-FT-5`).
        //
        // **⟶ AND THE EXPORT FENCE ITSELF IS RE-SCOPED TO ITS CLAIM (2026-10-05, `U-SECURE-EXCLUSION`
        // `S1`):** the as-filed read — *"no export name beyond `SECURITY_EXPORTS_AT_FILING`"* — was a
        // PROXY for *"the focus unit must not obfuscate its own group resolution by alias/re-export/
        // second path"*, and it fired on `S1`'s DECLARED additions (`security.ts`'s `ExclusionState` and
        // `exclusionAllowsWork`; `docs/specs/secure-exclusion.md` `§2.2` item 1 + `§2.4` item 4/`PAR-13`)
        // — a sibling unit's legitimate addition, which `§3.4 R-4` says is NOT this module's violation.
        // The fence now requires every name to be DECLARED (baseline, or `S1_OWNED_SECURITY_EXPORTS` with
        // its owner named), so an UNDECLARED name — a focus-side alias, re-export or second resolution
        // path above all — STILL FAILS, and both directions are driven at this row's controls (i)–(iv).
        expect(focusMentions, `RT-5 — the gate's group-map DATA row names the tool (the row \`§5.1\` row 2 REQUIRES). Security-source mentions measured: ${JSON.stringify(focusMentions)}`).not.toEqual([]); expect(mapLiteral, `RT-5 — and it resolves to the EXISTING \`dispatch\` group as DATA, never by a new case. Security-source mentions measured: ${JSON.stringify(focusMentions)}`).toBe(true); expect(branchLines, `RT-5 — NO focus-specific BRANCH: no conditional keyed on the method name and no second resolution path alongside \`TOOL_GROUPS\`/\`groupForTool\`. A branch FAILS this row. Measured: ${JSON.stringify(branchLines)}`).toEqual([]); const addedExports = addedSecurityExports(security); expect(addedExports, `RT-5 — no UNDECLARED EXPORT, alias or second resolution path is introduced (each declared name is in the frozen baseline or carries an OWNING UNIT in \`S1_OWNED_SECURITY_EXPORTS\`; an added name that is neither FAILS). Measured: ${JSON.stringify(addedExports)}`).toEqual([]) } },
    ],
  },
  {
    id: "P-FT-ID-1", type: "P-IM", domain: "THE RECORD'S LANDING IDENTITY — the caller's own string as the target the landing settles on", strategyId: "S-FT-ID-1", term: 2, bound: "enumerated",
    // the missing minting site, the returned identity, and the second renderer call
    assertions: ["the absence of a minting site on the route", "the absence of a tool-side registry/`Map`/counter", "the returned identity is the record's own DERIVED `landing`", "the second call performs a SECOND renderer call (no cache)"],
    controls: [{ label: 'control: the minting scan CAN hit', run: () => expect(scanLines('const counter = 1', /\bcounter\b/)).not.toEqual([]) }],
    drives: [
      { label: '(1) a plain-string target call', run: async () => { const rec = recorder([recordAnswer(['k'], 'k', [recordRow('k', { active: true })])]); const got = await callTool(newServer(rec.backend), TOOL_NAME, { target: 'k' }) as Record<string, unknown>; expect(got['landing'], "ID-1 — the record's own DERIVED landing names the caller's string: the tool minted nothing and resolved nothing itself (`docs/L2/store-tabs-record/interface.md` §1, D-76).").toBe('k'); expect(scanLines(stripComments(focusRouteSource() ?? ''), /\bcounter\b|randomUUID|new\s+Map\b|new\s+Set\b/), 'ID-1 — no minting/holding site on the route.').toEqual([]) } },
      { label: '(2) a `newTab: true` call, serviced with no id derivation inside the tool', run: async () => { const opened = recordAnswer(['t', 't2'], 't2', [recordRow('t'), recordRow('t2', { active: true })]); const rec = recorder([opened, opened]); const s = newServer(rec.backend); const first = await callTool(s, TOOL_NAME, { target: 't', newTab: true }) as Record<string, unknown>; const second = await callTool(s, TOOL_NAME, { target: 't', newTab: true }) as Record<string, unknown>; expect(rec.calls.map((c) => c.method), 'ID-1 — a SECOND renderer call: no tool-side cache.').toEqual([METHOD, METHOD]); expect(second['landing'], 'ID-1 — and the identity is still the record\'s own: the tool derives no id from the target.').toBe('t2'); expect(Object.keys(second).sort(), 'ID-1 — the answer is the record arm, member for member: no `opened` and no minted member.').toEqual([...REQUIRED_MEMBERS].sort()); expect(second, 'ID-1 — the second answer is the record re-read, verbatim.').toEqual(first) } },
    ],
  },
  {
    id: "P-FT-ID-2", type: "P-SM", domain: "THE RECORD'S LANDING IDENTITY — the activation, observed THROUGH the answer the record re-read", strategyId: "S-FT-ACT-1", term: 3, bound: "enumerated",
    // the identities, the count, the seated landing, and the no-comparison reading
    assertions: ["the returned `order` identities", "the returned row count", "the seated `landing` the record derived", "the tool performed no comparison of its own"],
    controls: [
      { label: 'control: nothing is appended on the repeated-target arm', run: async () => { const settled = recordAnswer(['n'], 'n', [recordRow('n', { active: true })]); const rec = recorder([settled, settled]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'n' }); const again = await callTool(s, TOOL_NAME, { target: 'n' }) as Record<string, unknown>; expect((again['order'] as unknown[]).length).toBe(1) } },
      // THE RE-SCOPED INSTRUMENT'S FALSIFIER, DRIVEN (`§0A` note 7 defect 2; `§5.5.2` item 4b):
      // a body that RE-IMPLEMENTS one of the model's rules MUST still FAIL the scan, while the
      // tool's REQUIRED declared-key guard is exempt BY NAME and never by relenting the claim.
      { label: 'control: a RE-IMPLEMENTED model rule still FAILS the re-scoped scan', run: () => {
        expect(modelRuleSites("  if (args.target === 'x') return {}"), 'ID-2 control — a second equality on the target is a re-derived ACTIVATION rule and MUST FAIL.').not.toEqual([])
        expect(modelRuleSites('  if (args.entries.includes(args.target)) return {}'), "ID-2 control — a membership test over the caller's opaque values re-implements the IDENTITY rule and MUST FAIL.").not.toEqual([])
        expect(modelRuleSites('  const id = crypto.randomUUID()'), "ID-2 control — a minted id re-implements the model's ID POLICY and MUST FAIL.").not.toEqual([])
        expect(modelRuleSites('  return DECLARED_ARGUMENTS.includes(key)'), 'ID-2 control — the REQUIRED unknown-key guard is NOT a model rule: it is exempt BY NAME (`F-1`).').toEqual([])
      } },
    ],
    drives: [
      { label: '(1) a repeated target, the standing row INACTIVE: the record seats it, NO APPEND', run: async () => { const rec = recorder([recordAnswer(['e'], '', [recordRow('e')]), recordAnswer(['e'], 'e', [recordRow('e', { active: true })])]); const s = newServer(rec.backend); const first = await callTool(s, TOOL_NAME, { target: 'e' }) as Record<string, unknown>; const got = await callTool(s, TOOL_NAME, { target: 'e' }) as Record<string, unknown>; expect(first['landing'], 'ID-2 — the record before the seating: its derived landing is the empty spelling (the empty string) — no row reads active.').toBe(''); expect(got['landing'], "ID-2 — the standing row's own id, as the record DERIVED it.").toBe('e'); expect((got['order'] as unknown[]).length, 'ID-2 — NO APPEND.').toBe(1); expect(modelRuleSites(stripComments(focusRouteSource() ?? '')), "ID-2 — the tool re-derived no rule: NO comparison/assignment on `target`/`entryId`, NO membership test over the caller's values and NO minted id on the route (the as-filed `===`/`.includes(`/`.indexOf(` scan is RE-SCOPED — it flagged the REQUIRED declared-key guard, `§0A` note 7 defect 2).").toEqual([]) } },
      { label: '(2) the same repeated target, the standing row ALREADY ACTIVE', run: async () => { const settled = recordAnswer(['e'], 'e', [recordRow('e', { active: true })]); const rec = recorder([settled, settled]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'e' }); const got = await callTool(s, TOOL_NAME, { target: 'e' }) as Record<string, unknown>; expect(got['landing'], 'ID-2 — the identity is stable on the already-active arm.').toBe('e'); expect((got['order'] as unknown[]).length, 'ID-2 — still no append.').toBe(1) } },
      { label: '(3) an APPEND CONTROL: `newTab: true` appends, as declared', run: async () => { const rec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })]), recordAnswer(['a', 'b'], 'b', [recordRow('a'), recordRow('b', { active: true })])]); const s = newServer(rec.backend); await callTool(s, TOOL_NAME, { target: 'a' }); const got = await callTool(s, TOOL_NAME, { target: 'b', newTab: true }) as Record<string, unknown>; expect(got['order'], "ID-2 — the append is the RECORD's rule, echoed: the tool adds nothing.").toEqual(['a', 'b']); expect(got['landing'], 'ID-2 — and the landing is the row the record derived as active.').toBe('b') } },
    ],
  },
  {
    id: "P-FT-ID-3", type: "P-IM", domain: "THE RECORD'S ROWS — the `rows` echo BY IDENTITY", strategyId: "S-FT-ECHO-1", term: 10, bound: "bounded",
    // the container identity/pass-through, the order, the length, and nothing throwing
    assertions: ["the identity/pass-through of the returned `rows` container", "the row order", "the length", "nothing threw (except the record's own reading on the throwing-accessor drive)", "the declared type is a CONTRACT, not a validation boundary"],
    controls: [{ label: 'control: the echo read is not vacuous — a normalising tool would fail drive (6)', run: () => expect(['c', 'b', 'a']).not.toEqual(['a', 'b', 'c']) }],
    drives: ID3_DRIVES,
  },
  {
    id: "P-FT-ID-4", type: "P-SM", domain: "THE DELETED `opened` MEMBER — no opening witness in any arm, and opening read off `order`", strategyId: "S-FT-OPEN-1", term: 2, bound: "enumerated",
    // the opened deletion, the refused presence, and the two arms' key sets
    assertions: ["the DELETION of the `opened` member: it appears in NO arm (`docs/L2/mcp-surface/interface.md` §3)", "opening is read off `order` GROWING BY ONE, never off a boolean", "the presence/absence of `refused` on the record arm", "the refusal arm's own key set, asserted separately"],
    controls: [
      // THE FALSIFIER FOR THE DELETION'S OWN INSTRUMENT: the reader that proves the member absent
      // MUST be able to find it where it exists, or its emptiness over the answer proves nothing.
      { label: 'control: the deleted-shape reader CAN hit a canary carrying the three names', run: () => expect(deletedShapeSites('const answer = { activeId: null, entries: [], opened: false }'), 'ID-4 control — the deleted-shape reader is a real scan: a canary carrying the three deleted names IS found.').not.toEqual([]) },
      { label: 'control: a `refused` present where the act was NOT refused would fail the optionality read', run: () => expect(Object.prototype.hasOwnProperty.call({ status: 'committed', order: [], landing: '', rows: [], refused: {} }, OPTIONAL_MEMBER)).toBe(true) },
    ],
    drives: [
      { label: '(1) an OPENING act — `order` gains exactly one id and NO `opened` member appears', run: async () => {
        const before = recordAnswer(['a'], 'a', [recordRow('a', { active: true })])
        const after = recordAnswer(['a', 'b'], 'b', [recordRow('a'), recordRow('b', { active: true })])
        const rec = recorder([before, after])
        const server = newServer(rec.backend)
        const first = await callHandler(server, TOOL_NAME, { target: 'a' }) as Record<string, unknown>
        const second = await callHandler(server, TOOL_NAME, { target: 'b', newTab: true }) as Record<string, unknown>
        const firstOrder = first['order'] as readonly string[]
        const secondOrder = second['order'] as readonly string[]
        expect(secondOrder.length, 'ID-4 — the opening act grows `order` by EXACTLY ONE id.').toBe(firstOrder.length + 1)
        expect(secondOrder.filter((id) => !firstOrder.includes(id)), 'ID-4 — and the id it gains is exactly the one the new row carries.').toEqual(['b'])
        expect(Object.hasOwn(second, 'opened'), 'ID-4 — NO `opened` member: opening is read off `order`, not off a boolean the answer could coerce.').toBe(false)
        expect(Object.keys(second).sort(), 'ID-4 — the answer\'s own key set is the record\'s five: no deleted-shape member was added in its place.').toEqual([...REQUIRED_MEMBERS].sort())
        expect(deletedShapeSites(JSON.stringify(second)), 'ID-4 — and the deleted-shape reader finds none of the three names in the answer.').toEqual([])
        expect(deletedShapeSites(JSON.stringify(first)), 'ID-4 — nor in the answer before the opening.').toEqual([])
      } },
      { label: '(2) the STORE\'s refusal — `refused` present IFF the write was refused, and the refusal arm\'s own key set', run: async () => {
        const refused = storeRefused('declared-tier', "the tab record stands at 'file'", { storeStatus: 'declared-tier' })
        const refusedRec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })], refused)])
        const gotRefused = await callHandler(newServer(refusedRec.backend), TOOL_NAME, { target: 'a' }) as Record<string, unknown>
        assertDeclaredShape(gotRefused, 'ID-4(2) record arm, write refused')
        assertOptionalMember(gotRefused, true, 'ID-4(2) record arm, write refused')
        expect(Object.keys(gotRefused).sort(), 'ID-4 — the refused record arm carries the SIX declared names and no seventh.').toEqual([...DECLARED_MEMBERS].sort())
        expect(Object.hasOwn(gotRefused, OPTIONAL_MEMBER), 'ID-4 — `refused` IS an own key when the write was refused.').toBe(true)
        expect(Object.keys(gotRefused['refused'] as object).sort(), "ID-4 — and refused's own members are the store's own, unchanged.").toEqual(Object.keys(refused).sort())
        assertRefusedLedger(gotRefused['refused'], refused, 'ID-4(2) refused member')
        const landedRec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })])])
        const gotLanded = await callHandler(newServer(landedRec.backend), TOOL_NAME, { target: 'a' }) as Record<string, unknown>
        expect(Object.hasOwn(gotLanded, OPTIONAL_MEMBER), 'ID-4 — and `refused` is ABSENT when the write landed.').toBe(false)
        const arm = refusalAnswer('parent-absent', 'the tab record does not stand', null)
        const armRec = recorder([arm])
        const gotArm = await callHandler(newServer(armRec.backend), TOOL_NAME, {}) as Record<string, unknown>
        assertRefusalArm(gotArm, 'ID-4(2) refusal arm')
        expect(gotArm, 'ID-4 — a reading the client itself REFUSED is carried unchanged, member for member.').toEqual(arm)
        expect(Object.keys(gotArm).sort(), 'ID-4 — the refused reading\'s key set is its OWN four names, never the reading\'s five (the arms are told apart by `status`).').toEqual([...REFUSAL_ARM_MEMBERS].sort())
        // AND THE OTHER TWO NON-RECORD READINGS ARE NOT RE-SPELLED (`interface.md` §3's third arm):
        // `absent` and `unread` arrive with the client's OWN members and no `message` is invented.
        for (const reading of [readingArm('absent', 'no-tabs-member'), readingArm('unread', 'route-threw', 'the route rejected')]) {
          const gotReading = await callHandler(newServer(recorder([reading]).backend), TOOL_NAME, {}) as Record<string, unknown>
          expect(gotReading, `ID-4 — a '${String(reading['status'])}' reading is carried BY IDENTITY: no status is rewritten, no member minted.`).toEqual(reading)
          expect(Object.keys(gotReading).sort(), `ID-4 — and a '${String(reading['status'])}' reading keeps its OWN keys, never the four-member refusal shape.`).toEqual(Object.keys(reading).sort())
          expect(Object.values(gotReading).every((v) => v !== undefined), `ID-4 — no member of the '${String(reading['status'])}' arm is present as \`undefined\`.`).toBe(true)
        }
        expect(deletedShapeSites(JSON.stringify(gotRefused)), 'ID-4 — the deleted-shape reader finds none of the three names on the refused record arm.').toEqual([])
        expect(deletedShapeSites(JSON.stringify(gotArm)), 'ID-4 — nor on the refusal arm.').toEqual([])
      } },
    ],
  },
  {
    id: "P-FT-ID-5", type: "P-TP", domain: "THE RECORD'S LANDING — the no-minting-anywhere rule over the tool's own bytes", strategyId: "S-FT-NOMINT-1", term: 1, bound: "bounded",
    // the absence of each minting token class, with the exemption list named
    assertions: ["the scan's exemption list is NAMED (the tool/method name `focus`; the endpoint's member names) and stands VACUOUS for every tab/pane/zone/region token", "the pass-through `rows`/`landing` echo is NAMED as the reason those tokens are not hits: the record mints and derives, and this tool neither mints nor derives"],
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
    controls: [{ label: 'control: a KNOWN key is NOT refused by the same read (so the edge is a real edge, not a blanket refusal)', run: async () => { const rec = recorder([recordAnswer([], '', [])]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a', newTab: false })); expect(m).toBe(null); expect(rec.calls.map((c) => c.method)).toEqual([METHOD]) } }],
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
    controls: [
      { label: 'control: a legal shape services (so the either/or is not satisfied vacuously by always throwing)', run: async () => { const rec = recorder([recordAnswer([], '', [])]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null); expect(rec.calls).toHaveLength(1) } },
      // THE HARNESS-OWN GUARD, PROVEN RATHER THAN ASSERTED (`§5.5.2` item 3(a)): the caller-side
      // key read on a REVOKED `Proxy` and on an own-keys-TRAP `Proxy` THROWS — so this control
      // proves the guarded read can fail AND that the guarded form does not throw, which is what
      // makes the row HOLDABLE by a conformant tool instead of aborting the whole register.
      { label: 'control: the caller-side key read CAN throw, and the GUARDED form never does (a revoked Proxy and an own-keys-trap Proxy)', run: (): void => {
        const revoked = Proxy.revocable({}, {}); revoked.revoke()
        const traps: unknown[] = [revoked.proxy, new Proxy({}, { ownKeys: (): string[] => { throw new Error('trap threw') } })]
        for (const shape of traps) {
          let raw = false
          try { keysOf(shape) } catch { raw = true }
          expect(raw, 'AR-4 control — the RAW key read throws on this shape, which is exactly why the unguarded form aborted the register.').toBe(true)
          expect(guardedKeysOf(shape), 'AR-4 control — the GUARDED read returns null instead of throwing into the harness.').toBe(null)
        }
      } },
    ],
    drives: AR4_DRIVES,
  },
  {
    id: "P-FT-RF-1", type: "P-IM", domain: "THE REFUSAL AND READINESS — the STORE's refusal carried as the `refused` member", strategyId: "S-FT-REFUSE-1", term: 4, bound: "enumerated",
    // the own key set, the reason identity, and the reading's five members beside it
    assertions: ["the own key set of the RECORD arm (the five REQUIRED members always present, `refused` IFF the act's write was refused)", "the `reason` identity and the `message` BESIDE it", "`refused`'s own key set is exactly what the store sent", "`refused: undefined` as an OWN KEY fails, and no member is present as `undefined`"],
    controls: [{ label: 'control: a refusal is NOT a throw (so the five-name read is a real reading)', run: async () => { const rec = recorder([recordAnswer([], '', [], storeRefused('declared-tier', "the tab record stands at 'file'"))]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null) } }],
    drives: RF1_DRIVES,
  },
  {
    id: "P-FT-RF-2", type: "P-SM", domain: "THE REFUSAL AND READINESS — the NOT-READY REJECTION (the FIFTH negative)", strategyId: "S-FT-READY-1", term: 2, bound: "enumerated",
    // the outcome, the error form, the call count, and the no-queue reading
    assertions: ["the rejection/serviced outcome", "the error's declared form", "the record's identity before and after", "the renderer stub's call count", "NOTHING is queued, no silent no-op, no fallback"],
    controls: [{ label: 'control: the READY arm services the same call (so the rejection is not the only reachable reading)', run: async () => { const rec = recorder([recordAnswer([], '', [])]); const m = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, {})); expect(m).toBe(null) } }],
    drives: [
      { label: '(1) NOT READY — the rejection, the untouched state, no queue', run: async () => { const rec = recorder([], 'renderer not ready (timeout 250ms)'); const m = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, { target: 'a' })); expect(m, 'RF-2 — the rejection is the whole claim and it is node-observable.').toMatch(/renderer not ready \(timeout 250ms\)/); expect(rec.calls, 'RF-2 — exactly one attempt: nothing queued, no retry.').toEqual([{ method: METHOD, args: { target: 'a' } }]) } },
      { label: '(2) READY — the same call SERVICED', run: async () => { const rec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })])]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a' }); assertDeclaredShape(got, 'RF-2(2)'); expect(rec.calls.map((c) => c.method), 'RF-2 — serviced once ready.').toEqual([METHOD]) } },
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
    id: "P-FT-RS-1", type: "P-IM", domain: "THE RESULT SHAPE AND TOTALITY — the RETURNED KEY SET, arm by arm, and the DELETION's own bytes", strategyId: "S-FT-SHAPE-1", term: 3, bound: "enumerated",
    // the record arm's key set, the two arms kept apart, and the deleted shape's absence from the route
    assertions: ["the RECORD arm's own key set (the five REQUIRED members always present, no sixth)", "the optionality of `refused` on the record arm (present IFF the act's write was refused)", "the REFUSAL arm's own key set, asserted separately (`status`/`reason`/`message`/`address`)", "the DELETED shape's three names occur NOWHERE in the FOCUS REGISTRATION BLOCK's own bytes — its description and schema inside, a sibling tool's words outside — plus the tool's handler span (D-18, D-142)", "asserted on EVERY attempt of the whole register (which is why this row's own term is 3, not 17)"],
    controls: [
      // THE FALSIFIERS, ALL REAL: (a) a record arm MISSING a REQUIRED member fails the required
      // half; (b) a record arm CARRYING `refused` when nothing was refused fails the optional half;
      // (c) a sixth member fails the closure read; (d) the DELETED-SHAPE READER must be able to
      // HIT the three names where they exist, or its emptiness over the route proves nothing.
      { label: 'control: the required half CAN fail (a record arm missing `rows` fails it)', run: () => expect(REQUIRED_MEMBERS.filter((m) => keysOf({ status: 'committed', order: [], landing: '' }).includes(m)), 'RS-1 control (a) — a required member is MISSING, so the required half FAILS here.').not.toEqual([...REQUIRED_MEMBERS]) },
      { label: 'control: the optional half CAN fail in BOTH directions (a present `refused` with no refusal, and an absent `refused` on a refused act)', run: () => {
        const carried = keysOf(recordAnswer([], '', [], storeRefused('declared-tier', "the tab record stands at 'file'")))
        const absent = keysOf(recordAnswer([], '', []))
        expect(carried, 'RS-1 control (b) — `refused` PRESENT where the act was not refused FAILS the absence arm.').not.toEqual([...REQUIRED_MEMBERS].sort())
        expect(absent, 'RS-1 control (b) — `refused` ABSENT where the act WAS refused FAILS the presence arm.').not.toEqual([...DECLARED_MEMBERS].sort())
      } },
      { label: 'control: the key-set read can fail (a sixth member fails the six-name read)', run: () => expect(keysOf({ ...recordAnswer([], '', [], storeRefused('x', 'y')), fifth: 1 })).not.toEqual([...DECLARED_MEMBERS].sort()) },
      { label: 'control: the DELETED-SHAPE reader CAN hit the three names (so drive (3) is not a vacuous scan)', run: () => expect(deletedShapeSites('const shape = { activeId: null, entries: [], opened: false }'), 'RS-1 control (d) — the reader that proves the three names absent MUST find them where they exist; a canary carrying all three IS reported.').toHaveLength(1) },
      // (e) THE REGION'S OWN FALSIFIER, DRIVEN BOTH WAYS OVER THE LIVE FILE (this pass). Drive (3) can
      // only be evidence if the bytes it reads are THIS TOOL'S and if the same read CAN find the three
      // names in them. (e) drives both halves: the region stops at the focus block's closing brace, so
      // a sibling `provident.data.*` description is never its subject; and the SAME three names
      // re-inserted into the LIVE description are reported by the SAME read, so a red at drive (3) is
      // reachable at its own subject and its green is a reading rather than a ritual (D-30's rule that
      // a battery which cannot fail is not evidence — `RT-5(b)`'s comment is the same rule).
      { label: 'control: THE REGION BOUND is the focus registration\'s own bytes — driven BOTH WAYS over the LIVE file (a re-inserted deleted name is REPORTED; a sibling\'s word is OUTSIDE the region)', run: () => {
        const live = read(SERVER_REL)
        const region = registrationRegionOf(live)
        expect(region, 'RS-1 control (e) — the live region is LOCATABLE, or neither half below is a reading.').not.toBe(null)
        const bounded = region as NonNullable<ReturnType<typeof registrationRegionOf>>
        expect(bounded.bound, 'RS-1 control (e) — the region is CLOSED at the marker block\'s own brace: the next-positive-marker bound cannot see a `if (!allowed.includes(…)) continue` group gate and ran into a sibling\'s bytes.').toBe('block-close')
        const own = live.slice(bounded.start, bounded.end)
        expect(own.includes('provident.data.'), 'RS-1 control (e) — no `provident.data.*` registration is inside the region, so a SIBLING tool\'s description (`log` is the entries the commit appended) is never this row\'s subject.').toBe(false)
        expect(own.includes("description:"), 'RS-1 control (e) — and the focus registration\'s OWN description IS inside it: the region is the block\'s whole span, not a narrower slice of it.').toBe(true)
        expect(deletedShapeSites(own), 'RS-1 control (e) — over the live bytes, as they stand, the deleted three are ABSENT.').toEqual([])
        const anchor = "Set the active tab in the app\\'s tab record"
        expect(live.includes(anchor), 'RS-1 control (e) — the falsifier has an ANCHOR: the live registration description\'s own sentence is present to re-insert the names into.').toBe(true)
        const injected = live.replace(anchor, "Set { activeId, entries, opened } as the active tab in the app\\'s tab record")
        const injectedRegion = registrationRegionOf(injected) as NonNullable<ReturnType<typeof registrationRegionOf>>
        const hits = deletedShapeSites(injected.slice(injectedRegion.start, injectedRegion.end))
        expect(hits.length, 'RS-1 control (e) — with `{ activeId, entries, opened }` RE-INSERTED into the focus description, the same read REPORTS it: `P-FT-RS-1` drive (3) REDS on its own subject, so the row is falsifiable.').toBe(1)
        expect(hits[0], 'RS-1 control (e) — and the line it reports is the DESCRIPTION\'s own line.').toContain('activeId')
      } },
    ],
    drives: [
      { label: "(1) a serviced call with the record's own answer — the five required members, `refused` ABSENT", run: async () => { const rec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })])]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a' }); assertDeclaredShape(got, 'RS-1(1)'); assertOptionalMember(got, false, 'RS-1(1)'); expect(Object.keys(got as object), 'RS-1 — in any KEY ORDER, but no sixth member.').toHaveLength(REQUIRED_MEMBERS.length); expect(keysOf(got), 'RS-1 — and the key set is exactly the reading\'s five names.').toEqual([...REQUIRED_MEMBERS].sort()) } },
      { label: "(2) the record arm with the STORE's `refused` present — the six declared names, and `refused`'s own members unchanged", run: async () => { const refused = storeRefused('parent-absent', 'the tab record does not stand', { path: ['tabs'] }); const rec = recorder([recordAnswer(['a'], 'a', [recordRow('a', { active: true })], refused)]); const got = await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a' }) as Record<string, unknown>; assertDeclaredShape(got, 'RS-1(2)'); assertOptionalMember(got, true, 'RS-1(2)'); expect(Object.keys(got).sort(), 'RS-1 — the five reading members plus the optional `refused` the refused act carries; no seventh member.').toEqual([...DECLARED_MEMBERS].sort()); expect(Object.keys(got['refused'] as object).sort(), "RS-1 — refused's own key set is exactly what the store sent (no member invented, none dropped).").toEqual(Object.keys(refused).sort()); assertRefusedLedger(got['refused'], refused, 'RS-1(2) refused member'); expect((got['refused'] as Record<string, unknown>)['reason'], "RS-1 — and the store's reason is carried verbatim.").toBe('parent-absent') } },
      { label: "(3) THE DELETION — the FOCUS REGISTRATION BLOCK's own bytes (its description and schema included, a sibling's words excluded) name NONE of `activeId`/`entries`/`opened`", run: () => {
        expect(focusRouteSource(), 'RS-1(3) — the route region must be LOCATABLE, or the deletion read below is vacuous.').not.toBe(null)
        const body = stripComments(focusRouteSource() ?? '')
        expect(body.length, 'RS-1(3) — and the region is non-empty: the scan reads real bytes.').toBeGreaterThan(0)
        const sites = deletedShapeSites(body)
        expect(sites, `RS-1(3) — \`docs/L2/mcp-surface/interface.md\` §3: the deleted model's three members appear in NO arm, and THE SURFACE'S OWN BYTES STOP NAMING THEM (D-142). The region this drive reads is the FOCUS REGISTRATION BLOCK (\`registrationRegionOf\`, bounded at that block's closing brace) plus the tool's handler span — its own description, schema and handler, and NOT the sibling \`provident.data.*\` registrations below it, whose descriptions carry \`entries\` as a journal word (D-18). Measured: ${JSON.stringify(sites)}`).toEqual([])
      } },
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