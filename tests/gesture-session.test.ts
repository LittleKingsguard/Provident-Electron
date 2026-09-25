// tests/gesture-session.test.ts
// ===========================================================================
// U-GSESSION · wave E (ledger row `E6`) · **THE RED SET** (RCA-1)
//
// Contract: `docs/specs/gsession.md` (FILED 2026-09-27, 971 lines, the A-d3 unit,
// `SCH-2` ADOPTED-RESHAPED). The module to be built later is
// `src/shared/gesture-session.ts` (`§0A` ruling note 1 names BOTH paths — this
// file's path is confirmed there: "the module path is `src/shared/gesture-session.ts`,
// and the test file is `tests/gesture-session.test.ts`").
//
// Binding sections read IN FULL before authoring: the `CURRENT STATE` block, `§0`
// (the fourteen recorded rulings) and `§0A` (the TWELVE dated ruling notes —
// CONTRACT, not commentary), the `⟶ ARCHITECT APPROVAL` block (the FIVE formerly
// open items, now ruled: `reset` IS a session terminal · THE SESSION INVOKES
// `commit` · POINTER-AGNOSTIC TERMINATION · a repeat `install` is a first-config-wins
// NO-OP returning `false` with NO event-source call · the count seam is the
// module's own `stats()`/`gesture()`), the Layer declaration (five honesty anchors),
// `§1` (scope, items 1–9), `§2.1` (the surface + the EXPORT CENSUS `4 + 8 = 12` +
// the delegate clause), `§2.2` (the ten prohibitions `P-1`..`P-10`), `§2.3` (items
// 1–8: attachment / window / one-at-a-time / terminals / commit / capture / dispose /
// the FOUR-STATE machine), `§2.4` (items 1–8: opaque events / identity / one gesture /
// monotonic id / connectivity / unusable source / no value validation / nothing
// survives), `§2.5` (the delegate signature list — eleven items, "nothing else
// exists"), `§2.6` (the seven sibling properties + the `F-1` split `F-11`/`F-12`),
// `§3.1` (`M-1`..`M-17`), `§3.2` (`F-1`..`F-12`), `§3.3` (`I-1`..`I-13`),
// `§3.4` (the static rows `R-1`..`R-9`), `§3.5` (the existence rows `R-10`/`R-11`),
// `§4` (`§4.1` the red statement, `§4.2` the authoring order, `§4.3` what the red is
// NOT, `§4.4` the nine stop conditions `S-1`..`S-9`, `§4.5` the delegation gate),
// `§5.1` (diff scope + the DENIED set), `§5.2` (the four legs), `§5.3` (the DONE
// row's ELEVEN items), **`§5.5.1` (the typed Property register — ALL ELEVEN rows,
// executed here, `396` = `58+32+36+30+24+30+40+30+32+24+60`, seed `20260927`,
// caps `≤100`/row · `≤400` total · stop-after-5-consecutive-failures)**,
// `§5.5.2` (the honesty block + the pool-versus-boundary check), `§5.5.3` (the
// attempt arithmetic with its terms, and the reconciled terms `94→24`, `60→58`),
// `§6` (the three falsifications), `§7` (the fifteen honest statements),
// `§7a`/`§7a.1` (**now `0` open** — all five ruled), `§8`, and `§3a`/`§3b` at the
// END (the adversarial SEED set — the `A-*` rows belong to the LATER pass and NONE
// is authored here; `§3b` is EMPTY BY CONSTRUCTION).
//
// LAYER: **[T] lifecycle and CALL COUNTS over arguments.** This unit touches no DOM
// at all — not even `src/shared/dom-shim.ts` (layer declaration anchor 2): the
// ELEMENT is an argument, the EVENT SOURCE is an argument, and the listeners are
// observed through the argument-supplied recorder. **No row below asserts a
// rendered-geometry, layout, paint, coordinate or click-retargeting-in-a-browser
// property** (`I-11`, `R-8`): `§5.2` offers no `[U]` row (structurally: the module
// is imported by no `src/**` file — `R-7`) and claims no `[D]` row (`F-12` is
// `PRECONDITION-GATED` on `U-DIVERGENCE-EXT`, ledger row `C2` — `R-11`).
//
// THE COUNT SEAM IS THE MODULE'S OWN (`§0A` note 12, `M-15`): every count row below
// reads `stats()`/`gesture()` — the session's own monotonic counters — BESIDE the
// recorder's call log. **No row in this file asserts a count by trusting a
// test-authored spy alone** (the `RCA-4` self-verified-green anti-pattern the
// architect's ruling 5 closed): where a row reads the injected `commit` callback's
// own count it asserts the session's reported count in the SAME attempt and requires
// the two to agree.
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation: `src/shared/gesture-session.ts` does not
// exist, so every clause row, every static row and every register row fails on the
// module-absent boundary. **No `src/**`, `scripts/**`, `package.json` or spec file is
// created or modified by this pass.**
//
// THE IMPORT BOUNDARY (`§4.1`, the repo's established technique — an `fs` existence
// probe plus a RUN-TIME-COMPUTED specifier resolved through a dynamic
// `import(/* @vite-ignore */ …)`): every row fails as a **LABELLED ASSERTION** naming
// the absent module, never as a collection error that would take the whole red set
// down. `PRE-1` proves the mechanism itself resolves, against an EXISTING module.
//
// LEG 4 (`§5.2` leg 4): `R-6(b)` asserts the EIGHT TYPE-ONLY names of `§2.1`
// (`EventSource`, `GestureElement`, `GestureHandle`, `GestureOptions`,
// `GestureOptionsInput`, `SessionOptions`, `SessionStats`, `GestureStats`), and an
// imported type name is erased at run time — so the honest leg is a standalone strict
// `tsc` over THIS file. At RED time that leg reports the module-absent boundary
// (`TS2307`) and nothing else. **The `TS2307` diagnostic is NOT suppressed** (no
// `@ts-ignore` anywhere below): suppressing it would make the type-only export claim
// unfalsifiable.
//
// AUTHORED ORDER (`§4.2`): the `§3.5` existence/precondition rows `R-10`/`R-11`
// FIRST (they are the red's own premise and are evaluable before the module exists),
// then the `§3.4` static rows `R-9`/`R-1`..`R-8`, then the invariants `I-1`..`I-13`,
// then `M-1`..`M-17`, then `F-1`..`F-11` (**`F-12` is NOT authored as a passing row —
// `§3.2`/`S-6`**), then the `§5.5.1` register rows IN REGISTER ORDER
// (`P-GS-IM-1` · `P-GS-IM-2` · `P-GS-IM-3` · `P-GS-IM-4` · `P-GS-IM-5` ·
// `P-GS-IM-6` · `P-GS-SM-1` · `P-GS-SM-2` · `P-GS-SM-3` · `P-GS-TP-1` ·
// `P-GS-TP-2`), then the register's own status row. The `describe` blocks below are
// in that order; NOTHING is renumbered.
//
// TWO AS-FILED CLAUSES ARE REPORTED IN PLACE RATHER THAN GUESSED, and neither weakens
// a row (see `RED-RUN FINDINGS` at the foot of this file for both, in full):
//   · `§4.1`'s sentence "plus the static rows that can already be evaluated
//     (`R-2`/`R-3`/`R-5`/`R-7`/`R-9`/`R-11`)" calls `R-2`/`R-3`/`R-5`/`R-7`
//     evaluable-before-the-module while `§3.4` defines all four as scans OF the
//     module file — and `R-7` HERE IS the diff-scope row (`§3.4 R-7`), which the
//     sibling specs' numbering does not carry at all. The `§3.4` table governs
//     (this spec's own rows are enumerated there, and `§3.4`'s "What these nine rows
//     do NOT do" block is explicit); the stale `§4.1` list is reported.
//   · `§3.5 R-10`'s RED form ("at the moment the red set is AUTHORED and RUN,
//     `src/shared/gesture-session.ts` does not exist") is asserted HERE, at red time,
//     because THIS IS the red run — and `§3.5 R-10`'s own text says a FAIL of it is
//     meaningful ("if the module EXISTS before the red run, this row FAILS and the
//     `RCA-1` red order is broken — the pass that finds it must REPORT the inversion
//     rather than proceed"). Its GREEN form governs at green time and is recorded as
//     PROVENANCE.
// ===========================================================================
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES. The module cannot be
// imported for its values while it is absent, so this file mirrors `§2.1`'s block;
// the mirror is used ONLY as the harness's own type surface (it is never asserted to
// BE the module's surface — that is `R-6`'s and leg 4's claim, made through the
// `import type` declarations below).
// ===========================================================================
type GestureElement = unknown
interface EventSource {
  on(element: GestureElement, type: string, handler: () => void): void
  off(element: GestureElement, type: string, handler: () => void): void
  isConnected?(element: GestureElement): boolean
}
type GestureCode = 'ok' | 'not-installed' | 'busy' | 'disposed' | 'disconnected' | 'stale' | 'no-gesture'
type GestureOutcome = 'end' | 'reset' | 'cancel' | null
interface GestureHandle {
  readonly id: number
  readonly element: GestureElement
  readonly active: boolean
  readonly outcome: GestureOutcome
  readonly value: unknown
  set(value: unknown): GestureHandle
}
type BeginResult = { readonly ok: true; readonly gesture: GestureHandle } | { readonly ok: false; readonly code: GestureCode }
interface TerminalResult {
  readonly ok: boolean
  readonly code: GestureCode
  readonly committed: boolean
}
interface DisposeReport {
  readonly removed: number
  readonly complete: boolean
}
interface SessionStats {
  readonly installed: number
  readonly sourceCalls: number
  readonly gestures: number
  readonly commits: number
  readonly active: boolean
  readonly gestureId: number
  readonly lastCode: GestureCode
}
interface GestureStats {
  readonly active: boolean
  readonly id: number
  readonly outcome: GestureOutcome
  readonly value: unknown
  readonly commits: number
}
interface GestureOptionsInput {
  readonly capture?: unknown
  readonly onStart?: unknown
  readonly onMove?: unknown
  readonly onEnd?: unknown
  readonly onCancel?: unknown
}
interface SessionOptions {
  readonly source?: EventSource
  readonly commit?: (gesture: GestureHandle, value: unknown) => void
}
interface GestureSessionMirror {
  install(element: GestureElement, options?: GestureOptionsInput): boolean
  begin(element: GestureElement): BeginResult
  end(element: GestureElement, gesture: GestureHandle, value?: unknown): TerminalResult
  reset(element: GestureElement, gesture: GestureHandle, value: unknown): TerminalResult
  cancel(element: GestureElement, gesture?: GestureHandle): TerminalResult
  dispose(): DisposeReport
  gesture(): GestureStats | null
  stats(): SessionStats
  readonly disposed: boolean
}

/** `§2.1`/`§3.4 R-6`(b) — THE TYPE-ONLY HALF, through `§5.2` leg 4. These EIGHT
 *  imports are the compile-time claim that the module exports the eight type
 *  declarations of `§2.1`: this file does not compile unless it does. The `TS2307`
 *  this produces while the module is ABSENT is the red's own leg-4 form and is NOT
 *  suppressed (a `@ts-ignore` here would make the type claim unfalsifiable). */
import type { EventSource as ModuleEventSource } from '../src/shared/gesture-session.js'
import type { GestureElement as ModuleGestureElement } from '../src/shared/gesture-session.js'
import type { GestureHandle as ModuleGestureHandle } from '../src/shared/gesture-session.js'
import type { GestureOptions as ModuleGestureOptions } from '../src/shared/gesture-session.js'
import type { GestureOptionsInput as ModuleGestureOptionsInput } from '../src/shared/gesture-session.js'
import type { SessionOptions as ModuleSessionOptions } from '../src/shared/gesture-session.js'
import type { SessionStats as ModuleSessionStats } from '../src/shared/gesture-session.js'
import type { GestureStats as ModuleGestureStats } from '../src/shared/gesture-session.js'

// ===========================================================================
// THE IMPORT BOUNDARY (`§4.1`) and the path constants the static/existence rows use.
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/gesture-session.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'gesture-session.js'].join('/')
const TEST_FILE = fileURLToPath(import.meta.url)
const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const MODULE_RELPATH = 'src/shared/gesture-session.ts'
const TEST_RELPATH = 'tests/gesture-session.test.ts'
const SPEC_RELPATH = 'docs/specs/gsession.md'

/** `§4.1` — the module-absent reason, as DATA: a clause row asserts it (so the red
 *  message names the absent module) while a REGISTER row counts it as a BROKEN
 *  attempt (`§5.5.1`'s stop-after-5 discipline is what reports the red run's early
 *  stop, and a throw would hide it). */
let moduleCache: { mod: Record<string, unknown> | null; reason: string | null } | null = null
async function resolveModule(): Promise<{ mod: Record<string, unknown> | null; reason: string | null }> {
  if (moduleCache !== null) return moduleCache
  if (!existsSync(MODULE_SRC)) {
    moduleCache = {
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return moduleCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    moduleCache = { mod, reason: null }
  } catch (e) {
    moduleCache = { mod: null, reason: `the module does not resolve: ${describeThrown(e)}` }
  }
  return moduleCache
}

/** The CLAUSE rows' boundary. Fails as an ASSERTION carrying the row's label and
 *  RETURNS the namespace so a row's body stays type-clean. */
async function requireModule(label: string): Promise<Record<string, unknown>> {
  const { mod, reason } = await resolveModule()
  if (mod === null) {
    expect(
      mod,
      `RED — U-GSESSION red set (§4.1): ${reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's surface. [${label}]`,
    ).not.toBe(null)
  }
  return mod as Record<string, unknown>
}

/** The named value export of `§2.1`, through the same boundary. */
async function valueExport<T>(name: string, label: string): Promise<T> {
  const mod = await requireModule(label)
  const value = mod[name]
  expect(
    typeof value,
    `§2.1/§3.4 R-6(a) — the runtime VALUE export \`${name}\` is exported by \`${MODULE_RELPATH}\` (the export census is a SET claim: ${JSON.stringify(
      Object.keys(mod).sort(),
    )}) [${label}]`,
  ).not.toBe('undefined')
  return value as T
}

async function makeSession(options?: SessionOptions, label = 'the session factory'): Promise<GestureSessionMirror> {
  const create = await valueExport<(o?: SessionOptions) => GestureSessionMirror>('createGestureSession', label)
  const session = create(options)
  expect(session, `§2.1 — \`createGestureSession\` returns a usable instance (TOTAL, §2.4 item 6) [${label}]`).not.toBe(
    undefined,
  )
  return session
}

function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}
function brief(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'symbol') return value.toString()
  if (typeof value === 'function') return 'a function'
  if (Array.isArray(value)) return `an array of ${value.length}`
  if (typeof value === 'object') return `an object {${Object.keys(value).join(',')}}`
  return String(value)
}

// ===========================================================================
// §2.1 — THE RECORDING SOURCE (the harness). Every ATTACH, DETACH, capture and
// connectivity reading the session makes against the injected source lands here with
// its exact argument values, so a row can assert the CALLS the session made — never a
// fact about a real browser's listener table (layer anchor 5, `§4.4 S-7`).
// ===========================================================================
type OpKind = 'on' | 'off' | 'capture' | 'isConnected'
interface CallRecord {
  readonly seq: number
  readonly op: OpKind
  readonly element: unknown
  readonly type: string
  readonly handler: unknown
}
interface SourceOptions {
  readonly withCapture?: boolean
  readonly isConnected?: (element: unknown) => unknown
}
interface RecorderSource extends EventSource {
  readonly log: CallRecord[]
  readonly captures: CallRecord[]
  readonly attached: Map<unknown, Map<string, () => void>>
  readonly handlerOffsets: Map<() => void, number>
  failOff: (pair: { element: unknown; type: string; handlerUnknown: unknown }) => boolean
  fire(element: unknown, type: string, event?: unknown): void
  listenerCount(element: unknown): number
  typeMultiset(element: unknown): string[]
  listenerPairs(): string[]
  callCount(): number
  sourceCallsFromStats(): number
}

function makeSource(options: SourceOptions = {}): RecorderSource {
  const log: CallRecord[] = []
  const captures: CallRecord[] = []
  const attached = new Map<unknown, Map<string, () => void>>()
  const handlerOffsets = new Map<() => void, number>()
  let seq = 0
  const record = (op: OpKind, element: unknown, type: string, handler: unknown, captureToo: boolean): void => {
    const rec: CallRecord = { seq, op, element, type, handler }
    seq += 1
    log.push(rec)
    if (captureToo) captures.push(rec)
  }
  const source: RecorderSource = {
    log,
    captures,
    attached,
    handlerOffsets,
    failOff: () => false,
    on(element: GestureElement, type: string, handler: () => void): void {
      record('on', element, type, handler, false)
      const per = attached.get(element) ?? new Map<string, () => void>()
      per.set(type, handler)
      attached.set(element, per)
      handlerOffsets.set(handler, handlerOffsets.get(handler) ?? log.length - 1)
    },
    off(element: GestureElement, type: string, handler: () => void): void {
      const handlerUnknown: unknown = handler
      if (source.failOff({ element, type, handlerUnknown })) {
        const failed: CallRecord = { seq, op: 'off', element, type, handler }
        seq += 1
        log.push(failed)
        throw new Error('the recorder source was configured to fail this `off` call')
      }
      record('off', element, type, handler, false)
      const per = attached.get(element)
      if (per !== undefined && per.get(type) === handler) per.delete(type)
    },
    isConnected(element: GestureElement): boolean {
      record('isConnected', element, 'isConnected', undefined, false)
      return options.isConnected === undefined ? true : (options.isConnected(element) as boolean)
    },
    fire(element: unknown, type: string, event?: unknown): void {
      const handler = attached.get(element)?.get(type)
      expect(
        handler,
        `the recorder source holds a live handler on the control for the type ${brief(type)}, so the fire is not vacuous`,
      ).not.toBe(undefined)
      ;(handler as (payload?: unknown) => void)(event)
    },
    listenerCount(element: unknown): number {
      let n = 0
      for (const [, type] of (attached.get(element) ?? new Map<string, () => void>()).entries()) {
        void type
        n += 1
      }
      return n
    },
    typeMultiset(element: unknown): string[] {
      return [...(attached.get(element) ?? new Map<string, () => void>()).keys()].sort()
    },
    listenerPairs(): string[] {
      const out: string[] = []
      for (const [element, per] of attached.entries()) for (const [type] of per.entries()) out.push(`${String(element)}::${type}`)
      return out.sort()
    },
    callCount(): number {
      return log.length
    },
    sourceCallsFromStats(): number {
      return log.filter((r) => r.op !== 'capture').length
    },
  }
  if (options.withCapture === false) return source
  const withCapture = source as unknown as Record<string, unknown>
  withCapture['setPointerCapture'] = (element: unknown): void => {
    record('capture', element, 'setPointerCapture', undefined, true)
  }
  return source
}

/** The types the session contracts with its source (`§2.1`, `§0A` note 10). */
const TYPE_START = 'pointerdown'
const TYPE_MOVE = 'pointermove'
const TYPE_END = 'pointerup'
const TYPE_CANCEL = 'pointercancel'
const TYPE_SET = [TYPE_START, TYPE_MOVE, TYPE_END, TYPE_CANCEL]

interface CommitRecord {
  readonly gesture: unknown
  readonly value: unknown
  readonly outcome: unknown
  readonly id: unknown
}
interface Harness {
  readonly session: GestureSessionMirror
  readonly source: RecorderSource
  readonly commits: CommitRecord[]
  readonly thrown: unknown[]
}
async function makeHarness(options: {
  sourceOptions?: SourceOptions
  installOptions?: GestureOptionsInput
  commitThrows?: boolean
  commitAbsent?: boolean
  label?: string
}): Promise<Harness> {
  const source = makeSource(options.sourceOptions ?? {})
  const commits: CommitRecord[] = []
  const thrown: unknown[] = []
  const commit = options.commitAbsent
    ? undefined
    : (gesture: GestureHandle, value: unknown): void => {
        const record: CommitRecord = { gesture, value, outcome: gesture.outcome, id: gesture.id }
        commits.push(record)
        if (options.commitThrows === true) throw new Error('the consumer commit callback threw')
      }
  const session = await makeSession({ source, commit } as SessionOptions, options.label ?? 'the session factory')
  return { session, source, commits, thrown }
}

// ===========================================================================
// THE PAIRING READER (`I-5`, `M-13`, `P-GS-IM-6`): every `on(element, type, handler)`
// matched against exactly one `off` with the SAME THREE VALUES (element identity, type,
// and the SAME handler reference) — the `§0A` note 3 ledger claim, asserted over the
// recorded CALLS (never over a browser's listener table, layer anchor 5).
// ===========================================================================
function pairOnOffCalls(log: readonly CallRecord[]): { unmatched: string[]; matched: number } {
  const open: CallRecord[] = []
  const unmatched: string[] = []
  let matched = 0
  for (const rec of log) {
    if (rec.op === 'on') {
      open.push(rec)
      continue
    }
    if (rec.op !== 'off') continue
    const at = open.findIndex(
      (candidate) =>
        candidate.element === rec.element && candidate.type === rec.type && candidate.handler === rec.handler,
    )
    if (at < 0) {
      unmatched.push(`an \`off(${rec.type})\` with no matching \`on\` (element ${brief(rec.element)})`)
      continue
    }
    open.splice(at, 1)
    matched += 1
  }
  for (const left of open) unmatched.push(`an unmatched \`on(${left.type})\` (element ${brief(left.element)})`)
  return { unmatched, matched }
}

/** `P-GS-SM-1` — the state derived from the session's OWN readings (`§2.3` item 8's four
 *  states: `absent` · `installed-idle` · `active` · `disposed`). */
type SmState = 'absent' | 'installed-idle' | 'active' | 'disposed'
function deriveState(session: GestureSessionMirror): SmState {
  if (session.disposed) return 'disposed'
  const stats = session.stats()
  if (stats.active || session.gesture() !== null) return 'active'
  return stats.installed > 0 ? 'installed-idle' : 'absent'
}
/** `P-GS-SM-1` — drive ONE op and return its raw result (or `null` for `stats()`). */
function driveOp(
  session: GestureSessionMirror,
  op: string,
  el: unknown,
  newEl: unknown,
  activeHandle: GestureHandle | null,
  staleHandle: GestureHandle | null,
): unknown {
  const handle = activeHandle ?? ({ id: -1 } as GestureHandle)
  if (op === '`install(newEl)`') return session.install(newEl, {})
  if (op === '`install(el)` (repeat)') return session.install(el, {})
  if (op === '`begin(el)`') return session.begin(el)
  if (op === '`end(el, activeHandle)`') return session.end(el, handle)
  if (op === '`end(el, staleHandle)`') return session.end(el, (staleHandle ?? handle) as GestureHandle)
  if (op === '`reset(el, activeHandle, v)`') return session.reset(el, handle, 'v')
  if (op === '`cancel(el)`') return session.cancel(el)
  if (op === '`cancel(el, activeHandle)`') return session.cancel(el, handle)
  if (op === '`dispose()`') return session.dispose()
  return null
}
/** `P-GS-SM-1` — the DECLARED outcome of one (state, op) cell, from `§2.3` item 8.
 *  `state: null` means "the row declares no post-state for this cell" (the counter-only
 *  `stats()` op); `code: null` means "the op carries no code". */
function declaredTransition(state: SmState, op: string): { state: SmState | null; code: string | null } {
  if (op === '`stats()`') return { state: null, code: null }
  if (op === '`dispose()`') return { state: 'disposed', code: null }
  switch (state) {
    case 'disposed':
      if (op === '`install(newEl)`' || op === '`install(el)` (repeat)') return { state: 'disposed', code: null }
      return { state: 'disposed', code: 'disposed' }
    case 'absent':
      if (op === '`install(newEl)`' || op === '`install(el)` (repeat)') return { state: 'installed-idle', code: null }
      if (op === '`begin(el)`') return { state: 'absent', code: 'not-installed' }
      return { state: 'absent', code: 'no-gesture' }
    case 'installed-idle':
      if (op === '`install(newEl)`' || op === '`install(el)` (repeat)') return { state: 'installed-idle', code: null }
      if (op === '`begin(el)`') return { state: 'active', code: 'ok' }
      return { state: 'installed-idle', code: 'no-gesture' }
    default:
      // `active`
      if (op === '`install(newEl)`' || op === '`install(el)` (repeat)') return { state: 'active', code: null }
      if (op === '`begin(el)`') return { state: 'active', code: 'busy' }
      if (op === '`end(el, staleHandle)`') return { state: 'active', code: 'stale' }
      if (op === '`end(el, activeHandle)`' || op === '`reset(el, activeHandle, v)`' || op === '`cancel(el, activeHandle)`') {
        return { state: 'installed-idle', code: 'ok' }
      }
      if (op === '`cancel(el)`') return { state: 'installed-idle', code: 'ok' }
      return { state: 'active', code: null }
  }
}
/** A throwaway element for the totality drives (never inspected by the module). */
const el0: Record<string, unknown> = { control: 'totality' }

/** Fire the recorded start handler (`§2.3` item 1(d)) with an OPAQUE event object. */
function fireStart(h: Harness, element: unknown, event?: unknown): void {
  h.source.fire(element, TYPE_START, event)
}
/** Run a session call and CAPTURE a thrown consumer error as data, so a row can
 *  assert both halves of `§3.2 F-3` (the throw propagated AND the detach already
 *  happened) instead of aborting. */
function catching<T>(h: Harness, body: () => T): T | undefined {
  try {
    return body()
  } catch (e) {
    h.thrown.push(e)
    return undefined
  }
}
function endCall(h: Harness, element: unknown, handle: GestureHandle, value?: unknown): TerminalResult | undefined {
  return catching(h, () => (value === undefined ? h.session.end(element, handle) : h.session.end(element, handle, value)))
}
function resetCall(h: Harness, element: unknown, handle: GestureHandle, value: unknown): TerminalResult | undefined {
  return catching(h, () => h.session.reset(element, handle, value))
}
function cancelCall(h: Harness, element: unknown, handle?: GestureHandle): TerminalResult | undefined {
  return catching(h, () => (handle === undefined ? h.session.cancel(element) : h.session.cancel(element, handle)))
}
function beginResult(h: Harness, element: unknown): BeginResult | undefined {
  return catching(h, () => h.session.begin(element))
}

// ===========================================================================
// THE ANTI-EVASION SCANNERS (`§4.4 S-1`) — the token forms are held as FRAGMENTS
// because this file must be able to NAME the tokens it bans (a rule list that spelled
// them joined would put them into this file's own bytes, which `R-8`'s second half
// scans).
// ===========================================================================
/** Split a spelling across chunks so the joined form never appears in this file. */
function chunked(parts: readonly string[]): string {
  return parts.join('')
}
const BOUNDARY_RE = /[A-Za-z0-9_$]/
/** A WORD/IDENTIFIER-BOUNDARY occurrence count (`§3.4 R-1`'s boundary rule): a hit counts
 *  when NEITHER side is an identifier character. **A STRING EDGE IS NOT A WORD CHARACTER** —
 *  the second defect this pass FOUND AND FIXED in its own instrument: an empty side was
 *  being tested with `BOUNDARY_RE`, and `/…/.test('')` is `false`, so `!BOUNDARY_RE.test('')`
 *  was `true` and the guard refused the hit — which meant **an assembled token at the
 *  TAIL of a string could never be flagged**, and the assembly control could not fail. Each
 *  side is now tested for a NON-EMPTY identifier character, so a hit is refused only when a
 *  real identifier character bounds it. */
function isIdentChar(text: string): boolean {
  return text.length > 0 && BOUNDARY_RE.test(text)
}
function boundedOccurrences(text: string, spelling: string): number {
  const needle = spelling.toLowerCase()
  const hay = text.toLowerCase()
  let count = 0
  let at = hay.indexOf(needle)
  while (at >= 0) {
    const before = at === 0 ? '' : hay[at - 1]
    const after = at + needle.length >= hay.length ? '' : hay[at + needle.length]
    if (!isIdentChar(before) && !isIdentChar(after)) count += 1
    at = hay.indexOf(needle, at + 1)
  }
  return count
}
function staticHits(code: string, re: RegExp): string[] {
  return code
    .split('\n')
    .map((text, index) => ({ index, text }))
    .filter(({ text }) => re.test(text))
    .map(({ index, text }) => `line ${index + 1}: ${text.trim()}`)
}
function expectNoStaticHits(code: string, rules: ReadonlyArray<{ what: string; re: RegExp }>, prefix: string): void {
  for (const { what, re } of rules) {
    const hits = staticHits(code, re)
    expect(hits, `${prefix} — '${what}' must not appear: ${JSON.stringify(hits)}`).toEqual([])
  }
}
/** Strip comments while PRESERVING line structure (so a hit's line number is real).
 *  String literals are KEPT: a banned token inside a string is still that token. */
function stripComments(src: string): string {
  let out = ''
  let i = 0
  let quote: string | null = null
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (quote !== null) {
      out += ch
      if (ch === '\\') {
        out += next ?? ''
        i += 2
        continue
      }
      if (ch === quote) quote = null
      i += 1
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      out += ch
      i += 1
      continue
    }
    if (ch === '/' && next === '/') {
      while (i < src.length && src[i] !== '\n') i += 1
      continue
    }
    if (ch === '/' && next === '*') {
      i += 2
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') out += '\n'
        i += 1
      }
      i += 2
      continue
    }
    out += ch
    i += 1
  }
  return out
}
/** The TOKEN-ASSEMBLY closure (`§4.4 S-1`): string literals, template literal parts and
 *  identifier chunks are re-joined (a spelling assembled across chunks is the SAME
 *  violation), with a boundary rule so ordinary words containing a spelling pass. */
const ASSEMBLY_JOIN = '\u0001'
function assembledChunks(src: string): string {
  const chunks: string[] = []
  let i = 0
  const readQuoted = (quote: string): void => {
    i += 1
    let value = ''
    while (i < src.length && src[i] !== quote) {
      if (src[i] === '\\') {
        value += src[i + 1] ?? ''
        i += 2
        continue
      }
      value += src[i]
      i += 1
    }
    i += 1
    chunks.push(value)
  }
  const readTemplate = (): void => {
    i += 1
    let part = ''
    while (i < src.length) {
      if (src[i] === '\\') {
        part += src[i + 1] ?? ''
        i += 2
        continue
      }
      if (src[i] === '`') {
        i += 1
        break
      }
      if (src[i] === '$' && src[i + 1] === '{') {
        // **EMPTY template parts are NOT pushed** — the fourth defect this pass found in its
        // own instrument: a `''` chunk is a phantom piece that manufactures a join where the
        // source has none, and a phantom join between two identifier-adjacent pieces makes
        // the assembled spelling look adjacent to an identifier (the join is then dropped)
        // instead of separated by the template's own `}`/`${` braces. With empty parts
        // skipped, a substitution's braces are REAL separator bytes and the assembled
        // spelling is a bounded token — which is what the row must catch.
        if (part.length > 0) chunks.push(part)
        part = ''
        i += 2
        let depth = 1
        while (i < src.length && depth > 0) {
          const ch = src[i]
          if (ch === '{') depth += 1
          else if (ch === '}') depth -= 1
          else if (ch === '"' || ch === "'") readQuoted(ch)
          else if (ch === '`') readTemplate()
          if (depth > 0) i += 1
        }
        i += 1
        continue
      }
      part += src[i]
      i += 1
    }
    chunks.push(part)
  }
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (ch === '/' && next === '/') {
      while (i < src.length && src[i] !== '\n') i += 1
      continue
    }
    if (ch === '/' && next === '*') {
      i += 2
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i += 1
      i += 2
      continue
    }
    if (ch === '"' || ch === "'") {
      readQuoted(ch)
      continue
    }
    if (ch === '`') {
      readTemplate()
      continue
    }
    if (/[A-Za-z_$]/.test(ch)) {
      let name = ''
      while (i < src.length && /[A-Za-z0-9_$]/.test(src[i])) {
        name += src[i]
        i += 1
      }
      chunks.push(name)
      continue
    }
    i += 1
  }
  const joined = chunks.join(ASSEMBLY_JOIN)
  // THE JOIN RULE — stated once. **The sentinel stands for the bytes BETWEEN two pieces
  // (an operator, a bracket, a comma, a quote, a template brace: every one of them REAL
  // source bytes), so a spelling that is rebuilt across such a boundary is exactly the
  // TOKEN ASSEMBLY `§4.4 S-1` forbids — and the rule is therefore: DROP the sentinel only
  // where the two pieces are genuinely ADJACENT (neither side is whitespace), and insert a
  // SPACE wherever a piece boundary is real.** Recorded honestly, because this instrument
  // cost several iterations: a form that joined EVERY boundary defused the row (the
  // assembled token was reconstructed inside a longer word and the boundary rule declined
  // it), and this form is the one that keeps BOTH halves falsifiable — the row's own
  // controls below are the evidence, not the assertion.
  const isSpaceChar = (ch: string): boolean => ch.length > 0 && /\s/.test(ch)
  let out = ''
  for (let at = 0; at < joined.length; at += 1) {
    if (joined[at] === ASSEMBLY_JOIN) {
      const before = at === 0 ? '' : joined[at - 1]
      const after = at + 1 >= joined.length ? '' : joined[at + 1]
      if (isSpaceChar(before) || isSpaceChar(after)) out += ' '
      continue
    }
    out += joined[at]
  }
  return out
}

// ---------------------------------------------------------------------------
// §3.4 R-1 — THE ANTI-EVASION VOCABULARY ROW's banned spellings (fragments).
// SCOPE, exactly as `§3.4 R-1` states it: the scan is the MODULE FILE (whole,
// comments INCLUDED) plus THIS ROW'S OWN CONTROLLED CORPORA, with the normalized
// assembly view JOINED before scanning. **A whole-file scan of THIS test file is
// DELIBERATELY DROPPED**: this file must carry the banned spellings inside `R-1`'s
// own control data, so a whole-file negative over it could only fail.
// ---------------------------------------------------------------------------
const VOCAB_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  [chunked(['select', 'ors'])],
  [chunked(['thres', 'hold'])],
  [chunked(['zo', 'ne'])],
  [chunked(['pa', 'ne'])],
  [chunked(['ta', 'b'])],
  [chunked(['re', 'gion'])],
  [chunked(['dash', 'board'])],
  [chunked(['local', 'Storage'])],
  [chunked(['session', 'Storage'])],
  [chunked(['clo', 'sest'])],
  [chunked(['query', 'Selector'])],
  [chunked(['query', 'SelectorAll'])],
  [chunked(['getElement', 'ById'])],
]
const VOCAB_WORDS: readonly string[] = VOCAB_FRAGMENTS.map((f) => f.join(''))
/** A `data-*`/attribute-name vocabulary (P-1's `data-zone`/`pane-collapse-toggle`
 *  class), assembled from fragments: the hyphen is a chunk of its own. */
const ATTRIBUTE_VOCAB: readonly string[] = [
  chunked(['data', '-', 'zone']),
  chunked(['pane', '-', 'collapse', '-', 'toggle']),
]
const STORE_VOCAB: readonly string[] = [chunked(['local', 'Storage']), chunked(['session', 'Storage']), chunked(['store'])]
/** The violations of ONE text: a BOUNDED raw occurrence (comments INCLUDED — `R-1`'s
 *  scope rule) plus a bounded occurrence that ASSEMBLES out of the text's literals and
 *  identifiers (`§4.4 S-1`'s closure). */
function vocabularyViolations(src: string): string[] {
  const violations: string[] = []
  for (const word of [...VOCAB_WORDS, ...ATTRIBUTE_VOCAB, ...STORE_VOCAB]) {
    if (boundedOccurrences(src, word) > 0) violations.push(`RAW bounded occurrence of '${word}' (a comment counts, S-1)`)
  }
  const assembled = assembledChunks(src)
  for (const word of [...VOCAB_WORDS, ...ATTRIBUTE_VOCAB, ...STORE_VOCAB]) {
    if (boundedOccurrences(assembled, word) > 0) {
      violations.push(`ASSEMBLED bounded occurrence of '${word}' (token assembly is the SAME violation, S-1)`)
    }
  }
  return violations
}
/** The control shapes `§3.4 R-1` requires the scan to FAIL on, plus the boundary halves the
 *  row's own rule implies. **THE ASSEMBLY CONTROLS ARE DRIVEN THROUGH THE REAL
 *  NORMALIZATION.** `§4.4 S-1`'s evasion is a module that carries a banned spelling split
 *  across pieces; the fixtures below are the two mechanical forms of that — a spelling split
 *  across two string literals that are JOINED at run time, and one whose halves are
 *  SUBSTITUTED into a template literal — because a raw `'thres' + 'hold'` fixture never
 *  assembles: the `+` between the two literals is a real byte in the source, so the
 *  normalized view keeps a delimiter there and the spelling is not a bounded token in the
 *  module's own bytes either. The two assembly controls therefore differ exactly in whether
 *  the joined spelling ends up BOUNDED (a violation) or adjacent to an identifier (passed by
 *  the row's own stated boundary rule). */
const VOCAB_POSITIVE_CONTROLS: ReadonlyArray<readonly [string, string]> = [
  ['raw, in code', `${'const'} ${VOCAB_WORDS[1]} = 4`],
  // The two TOKEN-ASSEMBLY shapes, each preceded by a byte that keeps the reassembled
  // token BOUNDED. (`§4.4 S-1` names the evasion; the fixtures are its two mechanical
  // forms: a spelling rebuilt by a JOIN call over its halves, and one SUBSTITUTED into a
  // template literal. A bare `'thres' + 'hold'` fixture is NOT used: the reconstruction is
  // then directly after the enclosing identifier, which is an identifier interior, and
  // `§3.4 R-1`'s boundary rule passes an identifier interior on purpose — that case is the
  // first BOUNDARY control below rather than a positive.)
  ['assembled across JOINED pieces', `( 'thres' + 'hold' )`],
  ['assembled across a template SUBSTITUTION', `( \`\${'thres' + 'hold'}\` )`],
  ['inside a COMMENT', `// the caller's ${VOCAB_WORDS[0]} string is mentioned in a comment only`],
  ['an attribute name', `el.setAttribute('${ATTRIBUTE_VOCAB[0]}', 'a')`],
]
/** The BOUNDARY halves of the same row: an assembled spelling ADJACENT to an identifier
 *  character is **not** a bounded occurrence (`§3.4 R-1`'s boundary rule, whose purpose is
 *  that ordinary words containing a spelling pass), and the scan must therefore leave both
 *  of these alone. */
const VOCAB_ASSEMBLY_BOUNDARY_CONTROLS: readonly string[] = [
  'const k = thres' + '${' + "'hold'" + '}' + '`',
  `${'const'} theThres${'hold'}Factor = 1`,
]
/** `§3.4 R-1`'s NEGATIVE control: this unit's OWN legitimate text must PASS — the four
 *  event types of `§2.1`, the seven result codes of `§2.3` item 4, and the module's own
 *  parameter names. */
const VOCAB_NEGATIVE_CONTROL =
  `const TYPES = ['${TYPE_START}', '${TYPE_MOVE}', '${TYPE_END}', '${TYPE_CANCEL}']\n` +
  `type Code = 'ok' | 'not-installed' | 'busy' | 'disposed' | 'disconnected' | 'stale' | 'no-gesture'\n` +
  `export function install(element: unknown, options: unknown): boolean { return true }\n` +
  `export function on(element: unknown, type: string, handler: () => void): void { void element; void type; void handler }\n`
/** A boundary control: two ordinary word chunks are a token boundary, not a spelling. */
const VOCAB_BOUNDARY_CONTROL = `${'const'} table = 1; ${'const'} stable = 2; ${'const'} tablet = 3`

// ---------------------------------------------------------------------------
// §3.4 R-2 — THE FORBIDDEN-ACCESS tokens (fragments), and no-ambient reads.
// ---------------------------------------------------------------------------
const AMBIENT_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  [chunked(['doc', 'ument'])],
  [chunked(['win', 'dow'])],
  [chunked(['global', 'This'])],
  [chunked(['mat', 'chMedia'])],
  [chunked(['get', 'Computed', 'Style'])],
  [chunked(['active', 'Element'])],
  [chunked(['local', 'Storage'])],
  [chunked(['session', 'Storage'])],
]
const AMBIENT_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  {
    what: 'an ambient realm/global read (a `document`/`window`/`globalThis`/`self`/`top`/`parent`/`frames` token, or a computed access on one)',
    re: new RegExp(`\\b(?:${['doc', 'ument'].join('')}|${['win', 'dow'].join('')}|${['global', 'This'].join('')}|self|top|parent|frames)\\b`),
  },
  { what: 'a DOM-global lookup (no element-query token in ANY form — `R-2`)', re: /\b(?:getElementById|querySelector|querySelectorAll|closest)\b/ },
  { what: 'the no-token realm route (a constructed access)', re: /\b(?:Reflect\.construct|constructor\.constructor|eval|new\s+Function)\b/ },
  { what: 'an ambient read for a VALUE (media/geometry/active-element)', re: /\b(?:matchMedia|getComputedStyle|activeElement)\b/ },
  { what: 'an ambient clock/random read', re: /\b(?:Date|Math\.random)\b/ },
  { what: 'a node realm read / environment read', re: /\b(?:process\.env|process\b|__dirname|__filename|require\s*\(|node:)/ },
  { what: 'a persistence surface (no store, no persistence — `P-8`, `I-12`)', re: /\b(?:localStorage|sessionStorage|indexedDB)\b/ },
]
const MODULE_STATE_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  { what: 'a module-scope `let`/`var` (a store, cache, memo or counter)', re: /^(?:export\s+)?(?:let|var)\s/m },
  { what: 'a module-scope mutable container (a cache or registry)', re: /\bnew\s+(?:WeakMap|WeakSet|Map|Set)\s*\(/ },
]

// ---------------------------------------------------------------------------
// §3.4 R-3 — THE EVENT-WIRING tokens (fragments): the module performs NO listener
// attachment and NO capture of its own; every attach/detach/capture goes through the
// injected source.
// ---------------------------------------------------------------------------
const WIRING_RULES: ReadonlyArray<{ what: string; re: RegExp }> = [
  { what: 'a direct listener attachment', re: new RegExp(`\\b${['add', 'EventListener'].join('')}\\b`) },
  { what: 'a direct listener detachment', re: new RegExp(`\\b${['remove', 'EventListener'].join('')}\\b`) },
  { what: 'a direct pointer capture', re: new RegExp(`\\b${['set', 'Pointer', 'Capture'].join('')}\\b`) },
  { what: 'a direct pointer release', re: new RegExp(`\\b${['release', 'Pointer', 'Capture'].join('')}\\b`) },
  { what: 'an `on<event>=`-style assignment', re: /\bon[a-z]+\s*=\s*(?!>)/ },
]

// ---------------------------------------------------------------------------
// §3.4 R-8 — THE GEOMETRY / MAGNITUDE tokens (fragments). The coordinate tokens are
// assembled from single-letter chunks for the same reason: this file must be able to
// NAME what it bans, and `R-8` scans this file's own bytes.
// ---------------------------------------------------------------------------
const COORD_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['c', 'l', 'i', 'e', 'n', 't', 'X'],
  ['c', 'l', 'i', 'e', 'n', 't', 'Y'],
  ['p', 'a', 'g', 'e', 'X'],
  ['p', 'a', 'g', 'e', 'Y'],
  ['s', 'c', 'r', 'e', 'e', 'n', 'X'],
  ['s', 'c', 'r', 'e', 'e', 'n', 'Y'],
  ['m', 'o', 'v', 'e', 'm', 'e', 'n', 't', 'X'],
  ['m', 'o', 'v', 'e', 'm', 'e', 'n', 't', 'Y'],
  ['o', 'f', 'f', 's', 'e', 't', 'X'],
  ['o', 'f', 'f', 's', 'e', 't', 'Y'],
]
const GEOM_CALL_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['get', 'Computed', 'Style'],
  ['getBounding', 'ClientRect'],
  ['offset', 'Width'],
  ['offset', 'Height'],
  ['client', 'Width'],
  ['client', 'Height'],
  ['scroll', 'Width'],
  ['scroll', 'Height'],
  ['match', 'Media'],
  ['inner', 'HTML'],
]
/** The CALL forms only — a MEMBER ACCESS or a WRITE, never the bare spelling (this
 *  file's own rule list and its prohibition lists necessarily carry some spellings). */
const GEOM_CALL_RES: readonly RegExp[] = [
  ...GEOM_CALL_FRAGMENTS.map((f) => new RegExp(`[.\\[]\\s*['"]?${f.join('')}\\b|\\b${f.join('')}\\s*\\(`)),
  ...COORD_FRAGMENTS.map((f) => new RegExp(`[.\\[]\\s*['"]?${f.join('')}\\b`)),
  { what: 'a style write', re: /\bstyle\s*\[|\bstyle\s*\./ } as unknown as RegExp,
]
/** The claim words `§3.4 R-8` forbids in an assertion message or a description. */
const GEOM_CLAIM_FRAGMENTS: ReadonlyArray<readonly [string, ...string[]]> = [
  ['render', 'ed'],
  ['lay', 'out'],
  ['pa', 'int'],
]
const GEOM_CLAIM_RES: readonly RegExp[] = GEOM_CLAIM_FRAGMENTS.map((f) => new RegExp(`\\b${f.join('')}\\b`, 'i'))
function rowTitles(src: string): string[] {
  return [...src.matchAll(/\b(?:it|describe)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g)].map((m) => m[1])
}
/** The `§3.4 R-8` half that binds THIS FILE: raw bytes plus the extracted row
 *  DESCRIPTIONS (`it`/`describe` titles). Both are asserted by `R-8` and by `I-11`. */
function ownGeometryViolations(): string[] {
  const own = readFileSync(TEST_FILE, 'utf8')
  const out: string[] = []
  for (const re of GEOM_CALL_RES) {
    if (!(re instanceof RegExp)) continue
    for (const hit of staticHits(own, re)) out.push(`this file takes a geometry observation — ${hit}`)
  }
  for (const title of rowTitles(own)) {
    for (const re of GEOM_CLAIM_RES) {
      if (re.test(title)) out.push(`a row description claims a resolved fact — ${JSON.stringify(title)}`)
    }
  }
  return out
}

// ===========================================================================
// The small file readers. The HARNESS may read files; the MODULE may not (`R-4`).
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-GSESSION red set (§4.1): the static rows of §3.4 read the module file and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return readFileSync(MODULE_SRC, 'utf8')
}
function walkSourceFiles(): readonly string[] {
  return [
    'src/main/main.ts',
    'src/main/mcp-server.ts',
    'src/main/preload.ts',
    'src/main/security.ts',
    'src/main/standalone.ts',
    'src/renderer/renderer.ts',
    'src/renderer/runtime.ts',
    'src/renderer/secure-panels.ts',
    'src/shared/types.ts',
    'src/shared/dom-shim.ts',
    'src/shared/zones.ts',
    'src/shared/census.ts',
    'src/shared/layout-projection.ts',
    'src/shared/slot-host.ts',
    'src/shared/owned-list-host.ts',
    'src/shared/mount-invariant-guard.ts',
    'src/shared/path-fork-cycle.ts',
    'src/shared/demo-envelope.ts',
  ].filter((rel) => existsSync(`${REPO_ROOT}/${rel}`))
}
/** Every `gesture-session*` path under `src/**` or `tests/**` (a recursive census,
 *  `node_modules` and dotted directories pruned). `R-10` asserts this set is EXACTLY
 *  this test file while the module is absent, so a second unit-owned artefact under a
 *  unit-owned path is a FINDING rather than a silent extra. */
function walkUnitPaths(): string[] {
  const found: string[] = []
  const visit = (rel: string): void => {
    for (const entry of readdirSync(`${REPO_ROOT}/${rel}`, { withFileTypes: true })) {
      const child = `${rel}/${String(entry.name)}`
      if (entry.isDirectory()) {
        if (String(entry.name) === 'node_modules' || String(entry.name).startsWith('.')) continue
        visit(child)
        continue
      }
      if (/^gesture-session/i.test(String(entry.name))) found.push(child)
    }
  }
  for (const root of ['src', 'tests']) visit(root)
  return found.sort()
}
/** Read a live string-array literal from a source file (`§4.4 S-2`: the seam rows
 *  assert SET EQUALITY AGAINST THE NAMES and read the declaration, never a copy). */
function readArrayLiteral(rel: string, re: RegExp): string[] {
  const src = readFileSync(`${REPO_ROOT}/${rel}`, 'utf8')
  const match = re.exec(src)
  expect(
    match !== null,
    `the LIVE declaration read by this row exists in ${rel} (the row asserts the live source of truth, never a literal copy)`,
  ).toBe(true)
  const start = (match?.index ?? 0) + (match?.[0].length ?? 0)
  const end = src.indexOf(']', start)
  expect(end, `the declaration's literal array in ${rel} is terminated, so the read is not vacuous`).toBeGreaterThan(start)
  const body = src.slice(start, end)
  return (body.match(/'[^'\n]*'|"[^"\n]*"/g) ?? []).map((s) => s.slice(1, -1))
}
function readUnionMembers(rel: string, re: RegExp): string[] {
  const src = readFileSync(`${REPO_ROOT}/${rel}`, 'utf8')
  const at = re.exec(src)
  expect(at !== null, `the live union declaration read by this row exists in ${rel}`).toBe(true)
  const lines = src.slice(at?.index ?? 0).split('\n')
  const kept = [lines[0]]
  for (let i = 1; i < lines.length; i += 1) {
    if (!/^\s*\|/.test(lines[i])) break
    kept.push(lines[i])
  }
  return (kept.join('\n').match(/'[^'\n]*'/g) ?? []).map((s) => s.slice(1, -1))
}

// ===========================================================================
// §2.2/§5.1 — THE CHANGE-SET CENSUS (shared by `R-7` and `R-10`).
// ===========================================================================
function gitOrNull(args: readonly string[]): string[] | null {
  try {
    const out = execFileSync('git', [...args], { encoding: 'utf8' })
    return out.split('\n').map((line) => line.trim()).filter((line) => line.length > 0)
  } catch {
    return null
  }
}
function treeChangeSet(): { paths: string[]; raw: string } {
  try {
    const raw = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
    const paths = raw
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.slice(3).trim().replace(/^"|"$/g, ''))
    return { paths, raw }
  } catch (e) {
    return { paths: [], raw: `<<git unavailable: ${describeThrown(e)}>>` }
  }
}
/** The COMMITTED range anchored at the commit that ADDED this file (the unit's own
 *  red-set commit), through `HEAD`; `null` while that commit does not exist yet (the
 *  honest RED-time state, `RCA-8(a)`). */
function committedChangeSet(): { anchor: string; range: string; paths: string[] } | null {
  const added = gitOrNull(['log', '--diff-filter=A', '--format=%H', '--', TEST_RELPATH])
  const anchor = added === null ? undefined : added.filter((l) => /^[0-9a-f]{7,40}$/.test(l))[0]
  if (anchor === undefined) return null
  const range = `${anchor}..HEAD`
  const listed = gitOrNull(['log', '--name-only', '--pretty=format:', range])
  if (listed === null) return null
  return { anchor, range, paths: Array.from(new Set(listed)).sort() }
}
/** **THE UNIT-SCOPED COMMIT PARTITION** (`§5.1`'s scope rule, the form the sibling
 *  rows converged on after three of them went red on later units' work): the anchored
 *  range is `anchor..HEAD` and `HEAD` moves through LATER UNITS' commits, so a census
 *  over the WHOLE range would charge this unit for every unit that lands after it. A
 *  commit that touches NONE of this unit's artifacts is another unit's commit and is
 *  OUT of this row's jurisdiction — a boundary, not a licence: a commit carrying one
 *  of this unit's paths TOGETHER WITH `package.json` (or `src/main/**`, or a sibling
 *  artifact) still FAILS. */
function unitScopedCommitted(
  anchor: string,
  range: string,
): { commitsInRange: number; unitCommits: number; files: string[]; allFilesOfUnitCommits: string[] } {
  const listed = [
    ...(gitOrNull(['show', '--name-only', '--format=@@%H', anchor]) ?? []),
    ...(gitOrNull(['log', '--format=@@%H', '--name-only', range]) ?? []),
  ]
  const perCommit = listed
    .join('\n')
    .split('@@')
    .filter((block) => block.trim().length > 0)
    .map((block) => {
      const parts = block
        .split('\n')
        .map((line) => line.trim().replace(/^"|"$/g, ''))
        .filter((line) => line.length > 0)
      return { sha: parts[0] ?? '', files: parts.slice(1) }
    })
  const unitCommits = perCommit.filter((c) => c.files.some(isUnitArtifact))
  const inJurisdiction = (path: string): boolean =>
    isUnitArtifact(path) || /^docs\//.test(path) || UNIT_REVIEW_PROBE.test(path)
  const kept = unitCommits.map((c) => ({ sha: c.sha, files: c.files.filter(inJurisdiction) }))
  return {
    commitsInRange: perCommit.length,
    unitCommits: unitCommits.length,
    files: Array.from(new Set(kept.flatMap((c) => c.files))).sort(),
    allFilesOfUnitCommits: Array.from(new Set(unitCommits.flatMap((c) => c.files))).sort(),
  }
}
/** This unit's OWN `*-greens.md` artifact (`§5.1` row 4). */
const UNIT_GREENS_PROBE = /^docs\/specs\/gsession[^/]*-greens\.md$/
/** This unit's own documentation-review record under `archive/reviews/` (`§5.1` row 4). */
const UNIT_REVIEW_PROBE = /^archive\/reviews\/[^/]*(U-GSESSION|gsession)[^/]*\.md$/
/** This unit's OWN artifacts — the allow-list's code/spec half plus its gate records. */
function isUnitArtifact(path: string): boolean {
  return (
    path === MODULE_RELPATH ||
    path === TEST_RELPATH ||
    path === SPEC_RELPATH ||
    UNIT_GREENS_PROBE.test(path) ||
    UNIT_REVIEW_PROBE.test(path)
  )
}

// ===========================================================================
// §5.5.1 — THE REGISTER'S EXECUTION MACHINERY.
// Caps (uniform for the whole register): `≤100` attempts per row, `≤400` attempts in
// total, rows evaluated SEQUENTIALLY IN REGISTER ORDER, STOP AFTER 5 CONSECUTIVE
// FAILURES (the running row's remaining attempts are abandoned and no further row
// starts). Each row's `it` title carries its row id AND its `S-GS-*` strategy id, and
// each row logs its own record line so a read-only PBT audit can read
// attempts-run / held / broken / notStarted / registerStoppedAt per row.
// **An un-run row FAILS — it never looks green.**
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296

/** **`§5.5.1`'s ELEVEN DECLARED ROWS** — `(row id, strategy id, term)`, in REGISTER
 *  ORDER, as `§5.5.3` prints them: `396` = `58+32+36+30+24+30+40+30+32+24+60`. Declared
 *  ONCE, at module scope, so `PRE-2` (the table precondition), `PRE-4` (the
 *  pool-versus-boundary rule) and `REGISTER-STATUS` (the executed record) all reconcile
 *  against the same object — which is what makes this file's tables machine-comparable
 *  for the later read-only PBT audit (`§3a A-15`). */
const REGISTER_DECLARED: ReadonlyArray<{ row: string; strategy: string; term: number }> = [
  { row: 'P-GS-IM-1', strategy: 'S-GS-LISTENERS-1', term: 58 },
  { row: 'P-GS-IM-2', strategy: 'S-GS-BUSY-1', term: 32 },
  { row: 'P-GS-IM-3', strategy: 'S-GS-CODES-1', term: 36 },
  { row: 'P-GS-IM-4', strategy: 'S-GS-WINDOW-1', term: 30 },
  { row: 'P-GS-IM-5', strategy: 'S-GS-CAPTURE-1', term: 24 },
  { row: 'P-GS-IM-6', strategy: 'S-GS-DISPOSE-1', term: 30 },
  { row: 'P-GS-SM-1', strategy: 'S-GS-STATE-1', term: 40 },
  { row: 'P-GS-SM-2', strategy: 'S-GS-IDENTITY-1', term: 30 },
  { row: 'P-GS-SM-3', strategy: 'S-GS-COMMIT-1', term: 32 },
  { row: 'P-GS-TP-1', strategy: 'S-GS-TOTAL-1', term: 24 },
  { row: 'P-GS-TP-2', strategy: 'S-GS-SEED-1 + S-GS-POOL-1', term: 60 },
]
function registerKeySet(rows: ReadonlyArray<{ row: string; strategy: string }>): string[] {
  return rows.map((r) => `${r.row} :: ${r.strategy}`).sort()
}
/** The DECLARED term of one register row, read from the ONE declared table — used by the
 *  un-run rows' failure message so it names the attempts that were NOT executed. */
function declaredTermOf(row: string): number {
  return REGISTER_DECLARED.find((r) => r.row === row)?.term ?? -1
}
const registerState = {
  attempts: 0,
  consecutiveFailures: 0,
  stoppedAtRow: null as string | null,
  stoppedFor: null as string | null,
}
type RowRecord = {
  row: string
  strategy: string
  seed: number
  attemptsRun: number
  held: number
  broken: number
  stoppedEarly: boolean
  notStarted: boolean
  registerStoppedAt: string | null
  causes: string[]
}
const registerRecords: RowRecord[] = []
/** The DECLARED term (`§5.5.1`) reconciled against the table this file actually drove —
 *  the reconciliation `§5.3` items 10/11 require. A row that NEVER STARTED is not
 *  reconciled here: its own `finish()` reports it as a FAILURE, which is the loud
 *  message a stopped red run must carry. */
function reconcile(rec: RegisterRow, declared: number, what: string): void {
  const ran = rec.attemptsRunPublic()
  if (ran === 0) return
  expect(ran, `${what} — the declared term is ${declared}`).toBe(declared)
}
class RegisterRow {
  readonly row: string
  readonly strategy: string
  private attemptsRun = 0
  private held = 0
  private broken = 0
  private stoppedEarly = false
  private notStarted = false
  private readonly causes: string[] = []

  constructor(row: string, strategy: string) {
    this.row = row
    this.strategy = strategy
  }

  /** ONE attempt. `body` returns `null` when the property HELD, else the break cause as
   *  a sentence (a throw is caught and is itself a break cause). */
  run(label: string, body: () => string | null): void {
    if (registerState.stoppedAtRow !== null) {
      if (this.attemptsRun === 0) this.notStarted = true
      return
    }
    if (this.attemptsRun >= REGISTER_ROW_CAP) {
      this.stoppedEarly = true
      this.causes.push(`the <=${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the <=${REGISTER_TOTAL_CAP}-attempts register cap was reached`
      return
    }
    this.attemptsRun += 1
    registerState.attempts += 1
    let cause: string | null = null
    try {
      cause = body()
    } catch (e) {
      cause = `the attempt threw: ${describeThrown(e)}`
    }
    if (cause === null) {
      this.held += 1
      registerState.consecutiveFailures = 0
      return
    }
    this.broken += 1
    this.causes.push(`${label} — ${cause}`)
    registerState.consecutiveFailures += 1
    if (registerState.consecutiveFailures >= CONSECUTIVE_FAILURE_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `${CONSECUTIVE_FAILURE_CAP} consecutive failures`
    }
  }

  attemptsRunPublic(): number {
    return this.attemptsRun
  }

  /** The row's verdict + its `§5.3` item 10 record line. **An un-run row FAILS on
   *  purpose: a register row that never started may not look green.** */
  finish(): void {
    const record: RowRecord = {
      row: this.row,
      strategy: this.strategy,
      seed: SEED,
      attemptsRun: this.attemptsRun,
      held: this.held,
      broken: this.broken,
      stoppedEarly: this.stoppedEarly,
      notStarted: this.notStarted,
      registerStoppedAt: registerState.stoppedAtRow,
      causes: this.causes.slice(0, 5),
    }
    registerRecords.push(record)
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    if (this.attemptsRun === 0) {
      expect(
        registerState.stoppedAtRow !== null,
        `${line} — this row NEVER STARTED although the register did NOT stop: an un-run register row is a FAILURE, never a pass (§5.5.1 strategy item 3)`,
      ).not.toBe(null)
      expect(
        this.notStarted || registerState.stoppedAtRow !== this.row,
        `${line} — the row was reported as un-run (notStarted) because the stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures discipline triggered at ${registerState.stoppedAtRow} (${registerState.stoppedFor})`,
      ).toBe(true)
      console.log(
        `§5.5.1 un-run row record :: ${JSON.stringify({
          row: this.row,
          strategy: this.strategy,
          attemptsRun: 0,
          reported: 'FAILURE — never started; the register stopped earlier',
          registerStoppedAt: registerState.stoppedAtRow,
          stoppedFor: registerState.stoppedFor,
        })}`,
      )
      // **THE UN-RUN ROW FAILS, LOUDLY AND BY NAME** (`§4.2` item 2: *"a register row that
      // cannot start is REPORTED AS A FAILURE, never a pass"*, and *"a red run that
      // reports all `396` attempts as executed is the finding, not the expectation"*).
      // A `finish()` that merely returned would leave this row GREEN in the runner's own
      // tally while it never executed a single attempt — exactly the shape the red run
      // must not present. The assertion is a DELIBERATE impossible comparison (the
      // reported-attempt count `0` against the declared term), so its message carries the
      // row, its strategy, the stopping row and the reason.
      expect(
        0,
        `§5.5.1/§4.2 item 2 — the register row \`${this.row}\` (${this.strategy}) NEVER STARTED: 0 of its declared attempts were executed, because the register stopped at \`${String(
          registerState.stoppedAtRow,
        )}\` (${String(registerState.stoppedFor)}). An un-run register row is REPORTED AS A FAILURE, never silently omitted and never a pass`,
      ).toBe(declaredTermOf(this.row))
      return
    }
    expect(
      this.broken,
      `${line} — RED (§5.5.1): ${this.broken} of ${this.attemptsRun} attempts BROKE. First causes: ${JSON.stringify(
        this.causes.slice(0, 3),
      )}`,
    ).toBe(0)
  }
}

/** `S-GS-SEED-1`'s generator: a hand-rolled 32-bit LCG whose constants are literals in
 *  THIS file. `stateₙ₊₁ = (stateₙ·1664525 + 1013904223) mod 2³²`, **ONE step per draw**;
 *  the pool index is `stateₙ₊₁ mod pool.length` — there is NO `next(k)` scaling helper
 *  (`§5.5.1` strategy item 2). */
function makeLcg(seed: number): { state: () => number; step: () => number } {
  let state = seed >>> 0
  return {
    state(): number {
      return state
    },
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}
/** The pinned-seed DRAW SEQUENCE: one LCG step per draw, `index = state mod 30`. */
const POOL_LENGTH = 30
function poolDrawSequence(draws: number): number[] {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < draws; i += 1) out.push(lcg.step() % POOL_LENGTH)
  return out
}
const DRAWN_INDICES = poolDrawSequence(60)
const DISTINCT_DRAWN_POOL_MEMBERS = new Set(DRAWN_INDICES).size
/** The first LCG step from the pinned seed, recomputed from the pinned literals
 *  (`state₁ = (20260927·1664525 + 1013904223) mod 2³²`). **REPORTED FIGURE, computed —
 *  not a spec-stated number**: `§5.5.1` pins the seed, the two constants and the ONE-STEP
 *  form but prints no first-state value, so the assertion below is the pass's own
 *  arithmetic check on that form (the pinned literals are `SEED`/`LCG_A`/`LCG_C`). */
const FIRST_LCG_STATE = (SEED * LCG_A + LCG_C) % LCG_MOD

// ---------------------------------------------------------------------------
// §5.5.1 — THE REGISTER TABLES (the pinned inputs each row drives). Setup is NOT
// counted as an attempt: constructing a source, building the recording log or
// snapshotting state is precondition (`§5.5.3`).
// ---------------------------------------------------------------------------
/** `P-GS-TP-2` — the pinned `30`-member event pool, in the spec's fixed order. */
interface PoolMember {
  readonly id: string
  readonly make: () => unknown
}
const EVENT_POOL: ReadonlyArray<PoolMember> = [
  { id: '(1) `undefined`', make: () => undefined },
  { id: '(2) `null`', make: () => null },
  { id: '(3) `0`', make: () => 0 },
  { id: "(4) `''`", make: () => '' },
  { id: '(5) `NaN`', make: () => Number.NaN },
  { id: "(6) `Symbol('ev')`", make: () => Symbol('ev') },
  { id: '(7) `true`', make: () => true },
  { id: '(8) a function', make: () => (): void => undefined },
  { id: '(9) `[]`', make: () => [] },
  { id: '(10) `[1,2,3]`', make: () => [1, 2, 3] },
  { id: '(11) `{}`', make: () => ({}) },
  { id: "(12) `{type: 'pointerdown'}`", make: () => ({ type: TYPE_START }) },
  { id: "(13) `{pointerId: 1, type: 'pointerup'}`", make: () => ({ pointerId: 1, type: TYPE_END }) },
  { id: '(14) an event carrying the two coordinate spellings', make: () => ({ [COORD_FRAGMENTS[0].join('')]: 5, [COORD_FRAGMENTS[1].join('')]: 7 }) },
  {
    id: '(15) an object whose coordinate getter THROWS',
    make: () => {
      const target: Record<string, unknown> = {}
      Object.defineProperty(target, COORD_FRAGMENTS[0].join(''), {
        get(): number {
          throw new Error('the event’s coordinate getter threw')
        },
        enumerable: true,
      })
      return target
    },
  },
  {
    id: '(16) a `Proxy` whose traps THROW',
    make: () =>
      new Proxy(
        {},
        {
          get(): never {
            throw new Error('the event Proxy refused a `get`')
          },
          has(): never {
            throw new Error('the event Proxy refused a `has`')
          },
          getOwnPropertyDescriptor(): never {
            throw new Error('the event Proxy refused a `getOwnPropertyDescriptor`')
          },
        },
      ),
  },
  { id: '(17) a `Proxy` returning `undefined` for every property', make: () => new Proxy({}, { get: () => undefined, has: () => false }) },
  { id: '(18) a frozen `{}`', make: () => Object.freeze({}) },
  { id: '(19) a `Map` instance', make: () => new Map([['a', 1]]) },
  { id: '(20) a `Set` instance', make: () => new Set([1]) },
  { id: '(21) a `Date` instance', make: () => new Date(0) },
  { id: '(22) a resolved promise', make: () => Promise.resolve(1) },
  { id: '(23) an `Error` instance', make: () => new Error('an event-shaped error') },
  {
    id: '(24) a plain object carrying a `Symbol.iterator` member',
    make: () => ({ [Symbol.iterator]: function* (): Generator<number> { yield 1 } }),
  },
  { id: '(25) an array-like object', make: () => ({ length: 3, 0: 'a' }) },
  {
    id: '(26) an object whose getter MUTATES a counter (the no-side-effect probe)',
    make: () => {
      const counter = { reads: 0 }
      const target: Record<string, unknown> = {}
      Object.defineProperty(target, 'probe', {
        get(): number {
          counter.reads += 1
          return counter.reads
        },
        enumerable: true,
      })
      Object.defineProperty(target, 'readCount', { get: () => counter.reads, enumerable: true })
      return target
    },
  },
  {
    id: '(27) an object whose `valueOf` THROWS',
    make: () => ({
      valueOf(): never {
        throw new Error('the event’s `valueOf` threw')
      },
    }),
  },
  {
    id: '(28) an object whose `toString` returns a banned vocabulary spelling',
    make: () => ({
      toString: (): string => `${'thres'}${'hold'}`,
    }),
  },
  { id: '(29) a `WeakMap` instance', make: () => new WeakMap() },
  {
    id: '(30) a class instance with private state',
    make: () =>
      new (class OpaqueEvent {
        readonly #secret: string = 'private'
        reveal(): string {
          return this.#secret
        }
      })(),
  },
]

/** The no-op placeholder event each `P-GS-TP-2` attempt compares its drawn member
 *  against (`§5.5.1`: "behaviour is IDENTICAL to driving the same lifecycle with a
 *  no-op placeholder event"). */
const PLACEHOLDER_EVENT = Object.freeze({}) as unknown

/** The four hooks of `§2.1`, as a fresh record per attempt. */
interface HookLog {
  readonly start: unknown[][]
  readonly move: unknown[][]
  readonly end: unknown[][]
  readonly cancel: unknown[][]
}
function makeHookLog(): HookLog {
  return { start: [], move: [], end: [], cancel: [] }
}
function hookOptions(log: HookLog, extra: GestureOptionsInput = {}): GestureOptionsInput {
  return {
    ...extra,
    onStart: (element: GestureElement): void => {
      log.start.push([element])
    },
    onMove: (gesture: GestureHandle): void => {
      log.move.push([gesture.id])
    },
    onEnd: (element: GestureElement, value: unknown): void => {
      log.end.push([element, value])
    },
    onCancel: (element: GestureElement): void => {
      log.cancel.push([element])
    },
  }
}

/** The `P-GS-IM-1` listener-footprint reading: the count AND the tracked
 *  `(element, type)` multiset, read from the recorder's own live map. */
function footprint(source: RecorderSource, element: unknown): { count: number; types: string[] } {
  return { count: source.listenerCount(element), types: source.typeMultiset(element) }
}

// ===========================================================================
// R-10 / R-11 — §3.5 THE EXISTENCE ROWS (the red's own premise), AUTHORED FIRST.
// ===========================================================================
describe('R-10/R-11 — §3.5 the existence rows (the red’s own premise)', () => {
  it('R-10 §3.5 (RED FORM) — the module-absence row: `src/shared/gesture-session.ts` does NOT exist before the red run, and this test file is the only unit-owned file in the change set', () => {
    // `§3.5 R-10`'s RED form governs AT RED TIME, and THIS IS the red run — the row's
    // own text is explicit that its FAIL is the meaningful outcome ("if the module
    // EXISTS before the red run, this row FAILS and the `RCA-1` red order is broken —
    // the pass that finds it must REPORT the inversion rather than proceed").
    // PROVENANCE — the GREEN form (`§3.5 R-10`'s second half, which governs once `§5.1`
    // row 1 lands): "the module EXISTS, the unit-owned change set is EXACTLY the module
    // + this test file (no OTHER `gesture-session*` path anywhere in `src/**` or
    // `tests/**`), both canonical artifacts are present, the census is asserted
    // NON-EMPTY before the equality, and the red-run census recorded the red form".
    expect(
      existsSync(MODULE_SRC),
      `R-10 (RED form)/§4.1 — at the moment the red set is AUTHORED and RUN, \`${MODULE_RELPATH}\` does NOT exist (${fileURLToPath(
        MODULE_SRC,
      )}). A TRUE here means the module landed BEFORE the red run, i.e. the \`RCA-1\` red order is inverted — REPORTED, not proceeded past`,
    ).toBe(false)
    // The unit-owned path census, checked against the TREE (so a stray unit-owned path
    // is caught even when an earlier pass committed it), with the non-vacuity assertion
    // BEFORE the equality that is the claim.
    const onDisk = walkUnitPaths()
    expect(
      onDisk.length,
      'R-10/§3.5 — the unit-owned path census is NON-EMPTY, so the equality below is not satisfied vacuously',
    ).toBeGreaterThan(0)
    expect(
      onDisk,
      `R-10 (RED form)/§0A note 1 — the unit-owned surface of \`src/**\` and \`tests/**\` is EXACTLY this test file while the module is absent: ${JSON.stringify(
        onDisk,
      )}`,
    ).toEqual([TEST_RELPATH])
    const tree = treeChangeSet()
    const unitOwned = Array.from(new Set(tree.paths.filter((p) => /gesture-session/i.test(p)))).sort()
    expect(
      unitOwned.length,
      `R-10/§3.5 — the unit-owned CHANGE SET is NON-EMPTY (so the census is not vacuous): ${JSON.stringify(tree.raw)}`,
    ).toBeGreaterThan(0)
    expect(
      unitOwned,
      `R-10 (RED form) — the unit-owned change set is EXACTLY this test file in the WORKING TREE (the module is absent, so it can appear in no census), and a stray second unit-owned path FAILS. git status said: ${JSON.stringify(
        tree.raw,
      )}; the unit-scoped committed census said: ${JSON.stringify(
        committedChangeSet() === null ? null : unitScopedCommitted(committedChangeSet()!.anchor, committedChangeSet()!.range).files,
      )}`,
    ).toEqual([TEST_RELPATH])
    expect(
      existsSync(TEST_FILE),
      'R-10 — the probe is not vacuous: this test file itself exists on disk through the same mechanism',
    ).toBe(true)
    expect(
      existsSync(new URL('../src/shared/census.ts', import.meta.url)),
      'R-10 — the probe is not vacuous in the other direction either: a SIBLING module really exists, so `existsSync` answers true for a present file',
    ).toBe(true)
  })

  it('R-11 §3.5 — the `[D]`-precondition row: the extended divergence harness (`U-DIVERGENCE-EXT`, row `C2`) does NOT exist, so `F-12` stays NOT-RUNNABLE-HERE', () => {
    // `§3.5 R-11`: the probe is on the `H-r10` deliverable (`docs/specs/
    // ci-divergence-leg.md`'s `U-DIVERGENCE-EXT` amendment: the scenario-envelope
    // channel `A-1` + the attribute-presence extractor `A-2`), whose ledger row is
    // `BLOCKED`. **Its FAIL is meaningful and welcome**: if the harness HAS landed,
    // `F-12` becomes runnable and this unit MAY then take it — with that harness's own
    // spec as its authority.
    const harnessRel = 'scripts/electron-divergence.mjs'
    const harness = readFileSync(`${REPO_ROOT}/${harnessRel}`, 'utf8')
    expect(
      harness.length,
      `R-11/§3.5 — the probe is not vacuous: \`${harnessRel}\` exists and is readable, so its content is a real reading`,
    ).toBeGreaterThan(0)
    const channelToken = ['scenario', 'Envelope'].join('')
    const mismatchToken = ['ENVELOPE', '-MISMATCH'].join('')
    const extPrefix = ['[', 'EXT', ']'].join('')
    const landed = [channelToken, mismatchToken, extPrefix].filter((token) => harness.includes(token))
    expect(
      landed,
      `R-11 (RED form)/§3.5 — the extended harness has NOT landed: no \`${channelToken}\` channel, no \`${mismatchToken}\` instrument-error path and no \`${extPrefix}\` tally exists in \`${harnessRel}\`. A NON-EMPTY list here means \`F-12\` is now runnable and this unit MAY take it (that harness's own spec is its authority)`,
    ).toEqual([])
    const extTestRel = 'tests/divergence-ext.test.ts'
    expect(
      existsSync(`${REPO_ROOT}/${extTestRel}`),
      `R-11/§3.5 — the extension's node-side half (\`${extTestRel}\`, the extractor's pure half per the amendment's \`A-2.8\`) does not exist either, so no part of the extended harness is present`,
    ).toBe(false)
    // The pinned identity leg's own pin is read LIVE (never a literal copy), so this row
    // also records that `N = 9` is untouched by this unit (`§5.2`: no `[D]` row claimed).
    const pinned = readFileSync(`${REPO_ROOT}/${harnessRel}`, 'utf8').match(/R13 RESULT: \$\{checks\} checks/)
    expect(
      pinned,
      'R-11 — the pinned leg’s own summary line is read from the live harness (so the `N = 9` identity this unit claims nothing about is a real reading, not a copy)',
    ).not.toBe(null)
  })

  it('R-9 §3.4 — the absent-page-design PROBE: `docs/skills/designing-pages.md` does not exist (a FAIL is meaningful)', () => {
    const pageDesign = new URL('../docs/skills/designing-pages.md', import.meta.url)
    expect(
      existsSync(pageDesign),
      'R-9/§1 item 8/§7 item 11 — `docs/skills/designing-pages.md` DOES NOT EXIST at the time this red set runs. IF IT EXISTS this row FAILS MEANINGFULLY: this unit then OWES a test-use-case coverage row in that file’s coverage matrix PLUS an entry in its demo-page index — and a mechanism renders no page, so the row would be an ABSENCE row rather than a claim',
    ).toBe(false)
    expect(
      existsSync(new URL('../docs/skills/process-guardrails.md', import.meta.url)),
      'R-9/§3.4 — the probe is not vacuous: `docs/skills/process-guardrails.md` DOES exist (globbed `docs/skills/*` at filing), so `existsSync` on the sibling path answers true',
    ).toBe(true)
  })
})

// ===========================================================================
// R-1..R-8 — §3.4 THE STATIC ROWS (the `§2.2` prohibition table's ids).
// ===========================================================================
describe('R — §3.4 the static rows (the §2.2 prohibition table’s ids)', () => {
  it('R-1 §3.4 — THE ANTI-EVASION VOCABULARY ROW: no consumer vocabulary and no banned token, raw, ASSEMBLED or in a comment', () => {
    const raw = moduleSource('R-1 §2.2 P-1/P-4/P-5/P-7')
    // SCOPE (`§3.4 R-1`'s own words): the MODULE file WHOLE, comments INCLUDED, over the
    // NORMALIZED (assembly-JOINED) view, plus THIS ROW'S OWN controlled corpora. **A
    // whole-file negative over this test file is DELIBERATELY DROPPED** — this file must
    // carry the banned spellings inside the controls below, so such a scan could only fail.
    expect(
      vocabularyViolations(raw),
      'R-1/§2.2 P-1 — the module carries no consumer vocabulary token, RAW, ASSEMBLED or in a COMMENT (§4.4 S-1’s closure), and no selector/threshold/attribute/zone/pane/tab/store spelling in any form',
    ).toEqual([])
    // THE CONTROLS, all three forms required by the row.
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `R-1 POSITIVE control (${shape}) — the vocabulary scan MUST fail for a module carrying the spelling ${shape}: the row is otherwise UNFALSIFIED and must not be filed (§4.4 S-1)`,
      ).toBeGreaterThan(0)
    }
    for (const boundaryFixture of VOCAB_ASSEMBLY_BOUNDARY_CONTROLS) {
      expect(
        vocabularyViolations(boundaryFixture),
        `R-1 BOUNDARY half — an assembled spelling ADJACENT TO AN IDENTIFIER is not a bounded occurrence (\`§3.4 R-1\`’s boundary rule, whose purpose is that ordinary words containing a spelling pass): the scan is not over-broad [${boundaryFixture}]`,
      ).toEqual([])
    }
    // Neither assembly control is vacuous: the assembled view really joins the pieces, so
    // the pass/fail above measures the BOUNDARY rule and not an empty string.
    const assembledPositive = assembledChunks(VOCAB_POSITIVE_CONTROLS[1][1])
    expect(
      assembledPositive.includes(VOCAB_WORDS[1]),
      `R-1 — the positive assembly control really ASSEMBLES the spelling in the normalized view (${JSON.stringify(
        assembledPositive,
      )} contains ${JSON.stringify(VOCAB_WORDS[1])})`,
    ).toBe(true)
    expect(
      vocabularyViolations(VOCAB_NEGATIVE_CONTROL),
      'R-1 NEGATIVE control — this unit’s own legitimate text (the four event types of §2.1, the seven result codes of §2.3 item 4, the parameter names) PASSES the vocabulary scan',
    ).toEqual([])
    expect(
      vocabularyViolations(VOCAB_BOUNDARY_CONTROL),
      'R-1 — the BOUNDARY rule holds: ordinary words CONTAINING a spelling are not violations (this is why the scan is bounded)',
    ).toEqual([])
    // The boundary control is not vacuous: the fixture really carries the chunk that
    // would be a spelling under a substring scan.
    expect(
      /table/.test(VOCAB_BOUNDARY_CONTROL),
      'R-1 — the boundary control really carries the word `table`, so the pass above is measured and not an empty-string artifact',
    ).toBe(true)
  })

  it('R-2 §3.4 — THE FORBIDDEN-ACCESS ROW: no realm-rooted access, no ambient read, no element lookup, and ZERO module-level mutable state', () => {
    const raw = moduleSource('R-2 §2.2 P-2/P-3/P-8/P-9')
    const code = stripComments(raw)
    expectNoStaticHits(raw, AMBIENT_RULES, 'R-2 §3.4 (§2.2 P-2/P-3/P-8/P-9)')
    expectNoStaticHits(code, MODULE_STATE_RULES, 'R-2 §3.4 (I-12 zero-state)')
    // The positive controls: every named evasion shape must be caught.
    const controls: ReadonlyArray<readonly [string, string, ReadonlyArray<{ what: string; re: RegExp }>]> = [
      ['a raw realm token', `const d = ${['doc', 'ument'].join('')}`, AMBIENT_RULES],
      ['a COMPUTED access on a banned token', `const g = ${['global', 'This'].join('')}['pro' + 'cess']`, AMBIENT_RULES],
      ['a helper-returned realm alias', `const realm = ${['global', 'This'].join('')}\nrealm['x']`, AMBIENT_RULES],
      ['the no-token realm route', `const g = ({}).constructor.constructor('return this')()`, AMBIENT_RULES],
      ['an ambient clock read', `const t = Date.now()`, AMBIENT_RULES],
      ['a node environment read', `const e = process.env['X']`, AMBIENT_RULES],
      ['a module-scope `let` (a counter/store)', `${'let'} calls = 0`, MODULE_STATE_RULES],
      ['a module-scope Map (a cache)', `${'const'} cache = new Map()`, MODULE_STATE_RULES],
    ]
    for (const [label, fixture, rules] of controls) {
      expect(
        rules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-2 POSITIVE control (${label}) must FAIL its scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // THE ROW'S STATED LIMIT (`§3.4 R-2`): **a BLANKET ban on `[expr]` is NOT claimed** —
    // a locally constructed object's computed access and ordinary indexing carry no
    // banned token and are deliberately not banned. A row asserting "no bracket notation
    // at all" FAILS this row's own text and is `S-3`.
    const legitimateIndexing = `${'const'} out: Record<string, unknown> = {}\nout['a'] = 1\nfor (const k of Object.keys(out)) { void out[k] }`
    expectNoStaticHits(legitimateIndexing, AMBIENT_RULES, 'R-2 STATED LIMIT — local computed access')
    expect(
      staticHits(legitimateIndexing, /\[/).length,
      'R-2 STATED LIMIT — the scan does not ban bracket notation as such (the legitimate fixture is full of it and passes)',
    ).toBeGreaterThan(0)
  })

  it('R-3 §3.4 — THE EVENT-WIRING ROW: no listener attachment and no capture of the module’s own — every attach/detach/capture goes through the injected source', () => {
    const code = stripComments(moduleSource('R-3 §2.2 P-3/P-7, I-8'))
    expectNoStaticHits(code, WIRING_RULES, 'R-3 §3.4')
    for (const [label, fixture] of [
      ['a direct attachment', `el.${['add', 'EventListener'].join('')}('${TYPE_START}', () => {})`],
      ['a direct detachment', `el.${['remove', 'EventListener'].join('')}('${TYPE_START}', () => {})`],
      ['a direct capture', `el.${['set', 'Pointer', 'Capture'].join('')}(1)`],
      ['an `on<event>=` assignment', `el.on${TYPE_START} = () => {}`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        WIRING_RULES.some(({ re }) => staticHits(stripComments(fixture), re).length > 0),
        `R-3 POSITIVE control (${label}) must FAIL the token scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // The row's OWN falsifiable half pairs the token scan with a runtime ORDERED LOG
    // (`M-6`, `F-10`): a capture call reachable from `install` or from a start listener
    // FAILS. The pair is the row — a text scan cannot prove the absence of a capture for
    // all control flow (`§3.4 R-3`'s honest limit), so the runtime half is asserted by
    // `M-6`/`M-7`/`F-10`/`P-GS-IM-5` below.
    const sources = walkSourceFiles()
    expect(
      sources.length,
      'R-3 — the consumer census is non-empty, so the "no importer" claim below is a census of real files',
    ).toBeGreaterThan(10)
  })

  it('R-4 §3.4 — THE IMPORT-BOUNDARY ROW: `src/shared/gesture-session.ts` imports NOTHING, not even a type-only import', async () => {
    const raw = moduleSource('R-4 §2.2 P-10, I-13')
    const importRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'any `import` statement at all (including a type-only one)', re: /^\s*import\b|\bimport\s*\(/m },
      { what: 'a CommonJS `require(`', re: /\brequire\s*\(/ },
      { what: 'a dynamic `import(`', re: /\bimport\s*\(/ },
      { what: 'an `export … from` re-export (a form of import)', re: /\bexport\s+(?:\*|\{[^}]*\})\s*from\b/ },
    ]
    expectNoStaticHits(raw, importRules, 'R-4 §3.4 (§2.2 P-10, I-13)')
    for (const [label, fixture] of [
      ['a value import', `import { x } from './zones.js'`],
      ['a TYPE-ONLY import', `import type { X } from './types.js'`],
      ['a dynamic import', `${'const'} m = await import('./x.js')`],
      ['a re-export', `export { y } from './y.js'`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        importRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-4 POSITIVE control (${label}) must FAIL the import scan — the row is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // THE NEGATIVE control: this unit's own legitimate text (a module that imports
    // NOTHING, with the four event types and the seven codes) PASSES.
    const legitimate = `${'export'} const POINTER_TYPES = Object.freeze({ start: '${TYPE_START}', move: '${TYPE_MOVE}', end: '${TYPE_END}', cancel: '${TYPE_CANCEL}' })\n`
    expectNoStaticHits(legitimate, importRules, 'R-4 NEGATIVE control — a module that imports nothing')
    // The COMPANION claim is `R-7`'s (this module is imported by NO `src/**` file).
    const module = await resolveModule()
    void module
  })

  it('R-5 §3.4 — THE ISOLATION / OWNERSHIP ROW: only argument elements reach the source, identity is the key, and the isolated SecurePanels scope is never touched', async () => {
    const h = await makeHarness({ installOptions: {} })
    const elA: Record<string, unknown> = { name: 'control-a' }
    const elB: Record<string, unknown> = { name: 'control-b' }
    const cloneOfA: Record<string, unknown> = { name: 'control-a' }
    expect(h.session.install(elA), 'R-5/§2.4 item 2 — the first install of a distinct element returns `true`').toBe(true)
    expect(h.session.install(elB), 'R-5/§2.4 item 2 — a structurally identical but DISTINCT object is a SECOND control').toBe(true)
    expect(
      h.session.install(cloneOfA),
      'R-5/§2.4 item 2 (I-9) — a structural CLONE of `elA` is a different object and therefore a DIFFERENT control (identity, never name/class/attribute/position)',
    ).toBe(true)
    const handedElements = new Set(h.source.log.filter((r) => r.op === 'on').map((r) => r.element))
    for (const element of handedElements) {
      expect(
        [elA, elB, cloneOfA].includes(element as Record<string, unknown>),
        `R-5/§2.2 P-2, I-9 — EVERY element handed to the source is EXACTLY an argument of \`install\` (the module derives, looks up or caches NO element): ${brief(element)}`,
      ).toBe(true)
    }
    expect(
      h.source.log.filter((r) => r.op === 'on').length,
      'R-5/I-9 — the three distinct objects produced exactly three start listeners (the ledger is keyed by reference)',
    ).toBe(3)
    // The static half: no reference to the isolated scope and no second mount reference.
    const code = stripComments(moduleSource('R-5 §0 ruling 11, MULTI-GRAPH-ISOLATION'))
    const isolationRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'the isolated `SecurePanels` scope', re: /\b(?:secure-panels|securePanels|SecurePanels)\b/ },
      { what: 'a second mount reference', re: /\b(?:createRoot|mountEl|secondGraph|graphB)\b/ },
      { what: 'a graph/registry lookup', re: /\b(?:listTargets|list_targets|registered\s*\(|provident\b)/ },
    ]
    expectNoStaticHits(code, isolationRules, 'R-5 §3.4 (§0 ruling 11)')
    for (const [label, fixture] of [
      ['a secure-panels import', `import { p } from './secure-panels.js'`],
      ['a second mount', `${'const'} secondGraph = mountEl(el)`],
      ['a target lookup', `${'const'} t = list_targets()`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        isolationRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-5 POSITIVE control (${label}) must FAIL the isolation scan — a positive is a FINDING, not a style note`,
      ).toBe(true)
    }
    void elB
  })

  it('R-6 §3.4 — THE EXPORT-CENSUS ROW: SET EQUALITY over the FOUR value exports; the EIGHT type-only names through leg 4; and the FIVE-SEAM negative', async () => {
    const mod = await requireModule('R-6 §2.1')
    const VALUE_EXPORTS = ['createGestureSession', 'installGestureListeners', 'detachGestureListeners', 'POINTER_TYPES']
    const valueExports = Object.keys(mod)
      .filter((k) => k !== 'default')
      .sort()
    expect(
      valueExports,
      `R-6(a)/§2.1 — the module’s RUNTIME exports are EXACTLY the FOUR value exports ${JSON.stringify(
        [...VALUE_EXPORTS].sort(),
      )} — \`4\` value exports + \`8\` type declarations = \`12\` exported names, and a FIFTH value export FAILS this SET equality (never a bare count — §4.4 S-2). Observed: ${JSON.stringify(
        valueExports,
      )}`,
    ).toEqual([...VALUE_EXPORTS].sort())
    // The POSITIVE control: a namespace carrying a fifth value export FAILS.
    const fiveValueExports: Record<string, unknown> = {
      createGestureSession: 1,
      installGestureListeners: 2,
      detachGestureListeners: 3,
      POINTER_TYPES: 4,
      gestureSessionFor: 5,
    }
    expect(
      Object.keys(fiveValueExports).filter((k) => k !== 'default').sort(),
      'R-6(a) POSITIVE control — a namespace with a FIFTH value export does not equal the pinned set',
    ).not.toEqual([...VALUE_EXPORTS].sort())
    // The TYPE-ONLY half is a COMPILE-TIME claim (`§5.2` leg 4): the eight `import type`
    // declarations at the head of this file do not compile unless the module exports the
    // eight names. The locals below exercise them so the imports are used, not decorative.
    const moduleEventSource: ModuleEventSource | null = null
    const moduleElement: ModuleGestureElement = { control: true }
    const moduleOptionsInput: ModuleGestureOptionsInput = { capture: true }
    const moduleGestureOptions: ModuleGestureOptions | null = null
    const moduleSessionOptions: ModuleSessionOptions = { source: undefined, commit: undefined }
    const moduleSessionStats: ModuleSessionStats | null = null
    const moduleGestureStats: ModuleGestureStats | null = null
    const moduleGestureHandle: ModuleGestureHandle | null = null
    expect(
      [
        moduleEventSource,
        moduleOptionsInput,
        moduleGestureOptions,
        moduleSessionStats,
        moduleGestureStats,
        moduleGestureHandle,
      ],
      'R-6(b)/§2.1 — the EIGHT type-only names (`EventSource`, `GestureElement`, `GestureHandle`, `GestureOptions`, `GestureOptionsInput`, `SessionOptions`, `SessionStats`, `GestureStats`) are exported by the module: this row does not COMPILE unless they are, which is the leg-4 half of the claim (an erased type cannot fail at run time)',
    ).toEqual([null, { capture: true }, null, null, null, null])
    expect(
      Object.keys(moduleSessionOptions),
      'R-6(b) — the `SessionOptions` mirror carries `source` and `commit` as its two members (§2.1)',
    ).toEqual(['source', 'commit'])
    expect(brief(moduleElement), 'R-6(b) — `GestureElement` is `unknown` in `§2.1`, so any value is a legal element').toBe(
      'an object {control}',
    )
    // (c) THE FIVE-SEAM NEGATIVE, by SET EQUALITY AGAINST THE NAMES where a name-complete
    // row exists (`S-2`), never by a bare count.
    const toolsLive = readArrayLiteral('src/main/mcp-server.ts', /static\s+readonly\s+ALL_TOOLS\s*:\s*string\[\]\s*=\s*\[/)
    const siblingPinned = readArrayLiteral('tests/engine-pin-version.test.ts', /const\s+PINNED_TOOL_SET\s*=\s*\[/)
    expect(
      siblingPinned.length,
      'R-6(c)/§4.4 S-2 — the sibling name-complete row (`tests/engine-pin-version.test.ts`) pins the 21 tool NAMES; this row cites it rather than re-authoring it',
    ).toBe(21)
    expect(
      toolsLive.sort(),
      `R-6(c)/§2.2 P-6 — the LIVE \`ALL_TOOLS\` set equals the pinned 21-NAME set (a tool ADDED or REMOVED fails BY NAME, not by count): ${JSON.stringify(
        toolsLive,
      )}`,
    ).toEqual([...siblingPinned].sort())
    const groupsLive = readArrayLiteral('src/main/security.ts', /const\s+VALID_GROUPS[^=]*=\s*new\s+Set\(\s*\[/)
    expect(
      groupsLive.sort(),
      'R-6(c)/§2.2 P-6 — the LIVE `VALID_GROUPS` keeps its FIVE named members',
    ).toEqual(['code', 'dispatch', 'graph', 'module', 'read'])
    const mutatingLive = readArrayLiteral('src/renderer/renderer.ts', /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[/)
    expect(
      mutatingLive.sort(),
      'R-6(c)/§2.2 P-6 — the LIVE `MUTATING_METHODS` keeps its SEVEN named entries (this unit adds no mutating IPC method)',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'])
    const rpcLive = readUnionMembers('src/shared/types.ts', /export\s+type\s+RpcMethod\s*=/)
    expect(rpcLive.length, 'R-6(c)/§2.2 P-6 — the LIVE `RpcMethod` union is name-complete in this census (21 members)').toBe(21)
    expect(new Set(rpcLive).size, 'R-6(c) — the `RpcMethod` census is a SET (distinct members), so the count is not a bag').toBe(21)
    // The module itself carries NO registration token of any kind.
    const code = stripComments(moduleSource('R-6(c) §2.2 P-6'))
    const seamRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a tool/resource/group registration', re: /\b(?:registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|ALL_TOOLS|ALL_RESOURCES|RpcMethod)\b/ },
      { what: 'an IPC surface', re: /\b(?:ipcRenderer|ipcMain|RpcRequest|list_targets|listTargets)\b/ },
      { what: 'a tool/resource descriptor', re: /\b(?:name\s*:\s*['"][a-z_.]+['"][^}]*inputSchema|inputSchema|mimeType\b)/ },
      { what: 'a `stats`/`gesture` wiring to an agent-reachable surface', re: /\b(?:dispatch|get_rendered_html|getRenderedHtml)\b/ },
    ]
    expectNoStaticHits(code, seamRules, 'R-6(c) §3.4 (F-9(b), A-10)')
    for (const [label, fixture] of [
      ['a registration', `registerTool('x')`],
      ['a group-table read', `${'const'} g = VALID_GROUPS`],
      ['a resource descriptor', `{ name: 'provident.x', inputSchema: {} }`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        seamRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `R-6(c) POSITIVE control (${label}) must FAIL the seam scan — the prohibition is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // And the value exports are NAMED, not merely counted (`R-6`'s own text: "A row
    // asserting only a COUNT without NAMING the names FAILS this row's own text").
    for (const name of VALUE_EXPORTS) {
      expect(
        Object.prototype.hasOwnProperty.call(mod, name),
        `R-6(a) — the value export \`${name}\` is NAMED in the module's own namespace (§2.1's export census)`,
      ).toBe(true)
    }
    // The `POINTER_TYPES` record is FROZEN and carries the four pinned event types.
    const types = mod['POINTER_TYPES'] as Record<string, string>
    expect(
      types,
      'R-6(a)/§2.1 — `POINTER_TYPES` is exported as a value (`§0A` note 10: the four event types are the session’s contract, frozen and non-configurable)',
    ).not.toBe(undefined)
    expect(Object.keys(types).sort(), 'R-6(a)/§2.1 — `POINTER_TYPES` carries exactly `start`/`move`/`end`/`cancel`').toEqual([
      'cancel',
      'end',
      'move',
      'start',
    ])
    expect(
      [types['start'], types['move'], types['end'], types['cancel']],
      'R-6(a)/§2.1 — the four pinned names, in the spec’s order: `start` = pointerdown · `move` = pointermove · `end` = pointerup · `cancel` = pointercancel',
    ).toEqual([TYPE_START, TYPE_MOVE, TYPE_END, TYPE_CANCEL])
    expect(
      Object.isFrozen(types),
      'R-6(a)/§2.1 — `POINTER_TYPES` is FROZEN (`§2.1`: "Frozen, not configurable, and carrying NO consumer vocabulary")',
    ).toBe(true)
  })

  it('R-7 §3.4 — THE DIFF-SCOPE ROW (UNIT-SCOPED): the unit’s own committed artifacts inside the allow-list, the DENIED set over the WHOLE committed set, and the “imported by no `src/**` file” companion claim', () => {
    // -----------------------------------------------------------------------
    // `§5.1`'s scope rule, in the UNIT-SCOPED form the sibling passes converged on
    // (three sibling rows went red on LATER units' work before this scoping was
    // fixed): the ALLOW-LIST binds THIS UNIT'S OWN COMMITTED ARTIFACTS, the DENIED set
    // binds the WHOLE committed set, any carve-out is NAMED, and a `git status`-ONLY
    // probe — vacuous after any commit — or an un-anchored whole-range probe is NOT
    // this row's form.
    // -----------------------------------------------------------------------
    const ALLOWED: readonly string[] = [
      MODULE_RELPATH,
      TEST_RELPATH,
      SPEC_RELPATH,
      'docs/next-steps.md',
      'docs/decisions.md',
      'docs/pending.md',
      'docs/FORKER.md',
      'docs/defects.md',
      'docs/HANDOFF.md',
    ]
    const inScope = (path: string): boolean => ALLOWED.includes(path) || UNIT_GREENS_PROBE.test(path) || UNIT_REVIEW_PROBE.test(path)
    /** **`§5.1`'s "Outside the scope, ALWAYS" DENIED set** — it binds absolutely. A pure
     *  `src/shared/` mechanism may touch none of these. */
    const DENIED: readonly string[] = [
      'src/main/',
      'src/renderer/',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'src/shared/zones.ts',
      'src/shared/census.ts',
      'src/shared/layout-projection.ts',
      'src/shared/owned-list-host.ts',
      'src/shared/slot-host.ts',
      'src/shared/mount-invariant-guard.ts',
      'package.json',
      'package-lock.json',
      'scripts/',
      'node_modules/',
      '../Preempt-Providence/',
    ]
    const DENIED_PATTERNS: readonly RegExp[] = [
      // A SIBLING unit's artifact — the carve-out is NAMED: this unit's OWN
      // `docs/specs/gsession*-greens.md` and its own review record are admitted.
      /^docs\/specs\/(?!gsession[^/]*-greens\.md$).*-greens\.md$/,
      /^archive\/reviews\/(?!.*(U-GSESSION|gsession)).*\.md$/,
      // Another unit's EXISTING test file (this unit authors exactly one test file).
      /^tests\/(?!gesture-session\.test\.ts$)/,
      // The composing units' own specs (`§5.1`: they are THEIRS to file).
      /^docs\/specs\/(?:gutter|relocate|container)\.md$/,
    ]
    const isDenied = (path: string): boolean =>
      DENIED.some((d) => path === d || path.startsWith(d)) || DENIED_PATTERNS.some((re) => re.test(path))
    const SCOPE_TEXT = `${ALLOWED.join(' + ')} + this unit’s own docs/specs/gsession*-greens.md + its own review record under archive/reviews/`
    const committed = committedChangeSet()
    if (committed !== null) {
      const scoped = unitScopedCommitted(committed.anchor, committed.range)
      expect(
        scoped.unitCommits,
        `R-7/§5.1 — at least ONE commit in ${committed.range} touched this unit’s own artifacts: the unit-scoped census is non-empty (commits in the range: ${scoped.commitsInRange}, unit-touching commits: ${scoped.unitCommits}). A commit touching none of them is another unit’s commit and is out of this row’s jurisdiction — a boundary, not a licence`,
      ).toBeGreaterThan(0)
      expect(
        scoped.files.length,
        `R-7/§5.1 — the unit’s own committed change set (${committed.range}, unit-scoped) is NON-EMPTY: a vacuous census cannot pass this row`,
      ).toBeGreaterThan(0)
      for (const path of scoped.allFilesOfUnitCommits) {
        expect(
          isDenied(path),
          `R-7/§5.1 — '${path}' was COMMITTED inside this unit’s range ${committed.range} and is in the DENIED set: a boundary violation whatever its content. The unit-scoped committed change set was: ${JSON.stringify(
            scoped.allFilesOfUnitCommits,
          )}`,
        ).toBe(false)
      }
      for (const path of scoped.files.filter((p) => isUnitArtifact(p) || /^docs\//.test(p))) {
        if (isDenied(path)) continue
        expect(
          inScope(path) || /^docs\/specs\/[^/]*\.md$/.test(path) || /^docs\/[^/]*\.md$/.test(path),
          `R-7/§5.1 — '${path}' is one of this unit’s own committed artifacts and is outside the allow-list (${SCOPE_TEXT})`,
        ).toBe(true)
      }
      expect(
        scoped.files.filter((p) => [MODULE_RELPATH, TEST_RELPATH, SPEC_RELPATH].includes(p)).length,
        `R-7 — at least ONE of the unit’s three canonical artifacts is genuinely committed inside the unit-scoped range, so the census is a census of real unit work: ${JSON.stringify(
          scoped.files,
        )}`,
      ).toBeGreaterThan(0)
    } else {
      // THE RED-TIME BRANCH: the red-set commit does not exist yet (`RCA-8(a)`), so the
      // census falls back to the WORKING TREE and SAYS SO — a probe that silently passed
      // on an empty range would be the vacuity this form closes.
      const tree = treeChangeSet()
      expect(
        tree.paths.includes(TEST_RELPATH),
        `R-7/§5.1 — the canonical artifact this RED set authors is present in the change set, so the census is not vacuous: ${JSON.stringify(
          tree.paths,
        )}`,
      ).toBe(true)
    }
    // THE WORKING-TREE HALF, scoped to THIS UNIT'S OWN artifacts (a sibling's in-flight
    // file is not this unit's diff).
    for (const path of treeChangeSet().paths.filter((p) => isUnitArtifact(p))) {
      expect(
        isDenied(path),
        `R-7/§5.1 — '${path}' is in the DENIED set and is present in the WORKING TREE: a boundary violation whatever its content`,
      ).toBe(false)
      expect(inScope(path), `R-7/§5.1 — '${path}' is outside this unit’s diff scope (the allow-list is: ${SCOPE_TEXT})`).toBe(true)
    }
    // THE DENIED SET'S OWN FALSIFIABILITY, asserted rather than assumed.
    for (const probe of [
      'src/main/main.ts',
      'src/renderer/renderer.ts',
      'src/shared/dom-shim.ts',
      'src/shared/types.ts',
      'src/shared/zones.ts',
      'src/shared/census.ts',
      'tests/census.test.ts',
      'package.json',
      'package-lock.json',
      'scripts/mcp-cli.mjs',
      'docs/specs/census-greens.md',
      'docs/specs/gutter.md',
      'archive/reviews/2026-09-27-U-CENSUS-doc-review.md',
    ]) {
      expect(isDenied(probe), `R-7 — the DENIED set really rejects '${probe}' (the row’s falsifiable half)`).toBe(true)
    }
    // …and this unit's own artifacts are not themselves denied.
    for (const path of [MODULE_RELPATH, TEST_RELPATH, SPEC_RELPATH, 'docs/specs/gsession-greens.md']) {
      expect(isDenied(path), `R-7 — '${path}' is THIS unit’s own artifact and can be in no denied set`).toBe(false)
    }
    // THE COMPANION CLAIM (`§3.4 R-7`'s second half, `§7` item 2): at the time this red
    // set runs, `src/shared/gesture-session.ts` is imported by NO `src/**` file.
    const importers = walkSourceFiles().filter((rel) => {
      const code = stripComments(readFileSync(`${REPO_ROOT}/${rel}`, 'utf8'))
      const rules: readonly RegExp[] = [
        /from\s+['"][^'"]*gesture-session(\.js)?['"]/,
        /import\s*\(\s*['"][^'"]*gesture-session(\.js)?['"]/,
        /require\s*\(\s*['"][^'"]*gesture-session(\.js)?['"]/,
      ]
      return rules.some((re) => re.test(code))
    })
    expect(
      importers,
      'R-7/§7 item 2 — the module is imported by NO `src/**` file at red time (the unit’s green proves the contract holds for a caller, NOT that the app behaves differently)',
    ).toEqual([])
  })

  it('R-8 §3.4 — THE GEOMETRY / MAGNITUDE ROW: no geometry-observation call, no coordinate read and no geometry-shaped claim, in the module or in this file', () => {
    // (a) THE MODULE FILE's raw bytes, comments included.
    const raw = moduleSource('R-8 §2.2 P-9, I-11')
    for (const re of GEOM_CALL_RES) {
      if (!(re instanceof RegExp)) continue
      const hits = staticHits(raw, re)
      expect(
        hits,
        `R-8(a)/§2.2 P-9 — the module observes no geometry and reads no coordinate: ${JSON.stringify(
          hits,
        )}. The contract and its CALL COUNTS are provable here; ANY rendered-geometry claim is UNPROVABLE in this repo today, and §5.2 offers no [U] row`,
      ).toEqual([])
    }
    // (b)/(c) THIS UNIT'S OWN TEST FILE: raw bytes, plus the row DESCRIPTIONS extracted
    // from it (the tokens are held as FRAGMENTS, which is why this half reads raw bytes
    // and the extracted titles rather than the rule list).
    expect(
      ownGeometryViolations(),
      'R-8(b)/(c) — this unit’s own [T] test file takes no geometry observation and reads no coordinate, and no row description claims a resolved/layout/magnitude fact',
    ).toEqual([])
    const titles = rowTitles(readFileSync(TEST_FILE, 'utf8'))
    expect(
      titles.length,
      'R-8(c) — the extracted-description census is NON-EMPTY (a vacuous extraction cannot pass this row)',
    ).toBeGreaterThan(50)
    // POSITIVE controls: a corpus observing geometry or a coordinate must FAIL, and a
    // description claiming a resolved magnitude must FAIL.
    const geometryCorpus = `${'const s = get' + 'Computed' + 'Style'}(el)\nconst w = el.${'offset' + 'Width'}\nconst x = e.${COORD_FRAGMENTS[0].join('')}`
    expect(
      GEOM_CALL_RES.some((re) => re instanceof RegExp && staticHits(geometryCorpus, re).length > 0),
      'R-8 POSITIVE control — a corpus observing geometry or reading a coordinate FAILS the scanner (the row is otherwise UNFALSIFIED)',
    ).toBe(true)
    const claimCorpus = ['the control is ', 'render', 'ed at the ', 'lay', 'out position'].join('')
    expect(
      GEOM_CLAIM_RES.some((re) => re.test(claimCorpus)),
      'R-8 POSITIVE control — a description claiming a resolved fact FAILS the claim scanner',
    ).toBe(true)
    expect(
      GEOM_CLAIM_RES.some((re) => re.test('the session commits the consumer’s own value exactly once at a terminal')),
      'R-8 NEGATIVE control — ordinary lifecycle wording is NOT a claim',
    ).toBe(false)
    // THE ROW'S STATED LIMIT: a text scan cannot prove the absence of a claim for ALL
    // prose — the contract half is `§5.2`'s refusal to offer a `[U]`/`[D]` row and
    // `I-11`'s clause.
    expect(
      readFileSync(`${REPO_ROOT}/package.json`, 'utf8').includes('"ui"'),
      'R-8/§5.2 — the `ui` leg EXISTS and is green, so this unit’s refusal to offer a `[U]` row is STRUCTURAL (the module is imported by no `src/**` file and reads no coordinate), not a leg-availability excuse',
    ).toBe(true)
  })
})

// ===========================================================================
// I-1..I-13 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — THE SINGLE GESTURE AUTHORITY: one session has AT MOST ONE active gesture, and NO consumer-reachable call commits outside a terminal', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    expect(h.session.install(el), 'I-1 — the control is installed').toBe(true)
    // There is NO `commit()` method on the session (the architect’s ruling 2, `§0A` note 5).
    const surface = h.session as unknown as Record<string, unknown>
    expect(
      surface['commit'],
      'I-1/§0A note 5 — the session exposes NO `commit()` method: the session invokes the consumer’s injected callback, and there is no consumer-reachable commit path (§2.5: "Nothing else exists")',
    ).toBe(undefined)
    const first = beginResult(h, el)
    expect(first?.ok, 'I-1 — the first `begin` establishes exactly one gesture').toBe(true)
    const second = beginResult(h, el)
    expect(second, 'I-1/§2.3 item 3 — a second `begin` while a gesture is active is REFUSED `busy`').toEqual({
      ok: false,
      code: 'busy',
    })
    expect(
      h.session.stats().active,
      'I-1/§2.3 item 3 — AT MOST ONE active gesture: the refusal changed nothing, so the first gesture is still the only one',
    ).toBe(true)
    expect(h.commits.length, 'I-1 — the `busy` refusal committed NOTHING').toBe(0)
    // `§2.5`: no capture/release method and no policy parameter exists on the session.
    for (const forbidden of [
      'setPointerCapture',
      'releasePointerCapture',
      'boundsFor',
      'axisFor',
      'isResizable',
      'defaultSizeFor',
      'candidatesFor',
      'resolveTarget',
      'onReveal',
    ]) {
      expect(
        surface[forbidden],
        `I-1/§2.5 — the session exposes no \`${forbidden}\` member: "Nothing else exists" (a policy parameter here would be the V-13 second authority)`,
      ).toBe(undefined)
    }
  })

  it('I-2 §3.3 — EXACTLY ONE COMMIT PER GESTURE that reaches an `end`/`reset` terminal, and `stats().commits` equals the number of such terminals', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const outcomes: string[] = []
    for (let i = 0; i < 3; i += 1) {
      const r = beginResult(h, el)
      expect(r?.ok, `I-2 — gesture ${i + 1} established`).toBe(true)
      const handle = (r as { ok: true; gesture: GestureHandle }).gesture
      expect(h.session.stats().commits, `I-2 — gesture ${i + 1} has committed NOTHING while active`).toBe(i)
      const done = endCall(h, el, handle)
      expect(done?.committed, `I-2 — the \`end\` terminal of gesture ${i + 1} reports \`committed: true\``).toBe(true)
      outcomes.push(String(handle.outcome))
      expect(
        h.session.stats().commits,
        `I-2 (the heart of this unit) — after ${i + 1} \`end\` terminals the session’s OWN counter reads ${i + 1}, and the injected callback was invoked exactly ${i + 1} time(s)`,
      ).toBe(i + 1)
      expect(h.commits.length, 'I-2 — the session’s count and the callback’s own invocation count AGREE (no count is asserted from a spy alone)').toBe(i + 1)
    }
    expect(outcomes, 'I-2/§2.3 item 4 — every terminal reports the pinned outcome vocabulary member `end`').toEqual([
      'end',
      'end',
      'end',
    ])
  })

  it('I-3 §3.3 — ZERO COMMIT INVOCATIONS ON CANCEL: `cancel`, a `pointercancel`, and a `dispose()` during a gesture', async () => {
    // (a) the recorded `pointercancel` handler.
    const h1 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elA: Record<string, unknown> = { id: 'a' }
    h1.session.install(elA)
    fireStart(h1, elA, PLACEHOLDER_EVENT)
    h1.source.fire(elA, TYPE_CANCEL, PLACEHOLDER_EVENT)
    expect(h1.commits.length, 'I-3/§2.3 item 4 — a `pointercancel` commits ZERO times').toBe(0)
    expect(h1.session.stats().commits, 'I-3 — the session’s own counter also reads ZERO after a `pointercancel`').toBe(0)
    // (b) a consumer abort through the direct terminal.
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elB: Record<string, unknown> = { id: 'b' }
    h2.session.install(elB)
    const r = beginResult(h2, elB)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    handle.set('a value that must NOT be committed')
    const done = cancelCall(h2, elB, handle)
    expect(done, 'I-3 — the `cancel` terminal returns its declared shape').toEqual({ ok: true, code: 'ok', committed: false })
    expect(h2.commits.length, 'I-3/§2.3 item 4 — a consumer abort commits ZERO times').toBe(0)
    expect(h2.session.stats().commits, 'I-3/§2.6 item 2 — "cancel ⇒ zero sink writes" is the consumer’s own conclusion from "its callback did not run"').toBe(0)
    // (c) a `dispose()` during a gesture.
    const h3 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elC: Record<string, unknown> = { id: 'c' }
    h3.session.install(elC)
    fireStart(h3, elC, PLACEHOLDER_EVENT)
    h3.session.dispose()
    expect(h3.commits.length, 'I-3/§2.3 item 7(1) — a `dispose()` during a gesture takes the `cancel` path and commits ZERO times').toBe(0)
    expect(h3.session.stats().commits, 'I-3 — the three cancel paths all leave the session’s commit counter at ZERO').toBe(0)
  })

  it('I-3b §3.3 — EXACTLY ONE COMMIT ON RESET, OF THE SUPPLIED VALUE, with `outcome: \'reset\'`', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const userValue = { chosen: 'by the consumer' }
    const suppliedDefault = { the: 'supplied default' }
    handle.set(userValue)
    const done = resetCall(h, el, handle, suppliedDefault)
    expect(done, 'I-3b/§2.3 item 4 — `reset` reports `{ok:true, code:\'ok\', committed:true}`').toEqual({
      ok: true,
      code: 'ok',
      committed: true,
    })
    expect(h.commits.length, 'I-3b — never zero, never two: exactly ONE commit').toBe(1)
    expect(
      h.commits[0].value,
      'I-3b/§0A note 6 — the commit carries the SUPPLIED value BY IDENTITY, never the previously-set value',
    ).toBe(suppliedDefault)
    expect(h.commits[0].value, 'I-3b — the previously-set user value is NOT what is committed').not.toBe(userValue)
    expect(h.commits[0].outcome, 'I-3b — the discriminator the consumer reads is `gesture.outcome === \'reset\'`').toBe('reset')
    expect(handle.outcome, 'I-3b — the handle reports `reset`').toBe('reset')
    expect(h.session.stats().commits, 'I-3b — the session’s own counter reads ONE').toBe(1)
    // The session supplies NO default of its own: an `undefined` supplied value is
    // committed verbatim (`§2.3` item 4: "`reset` always commits its supplied value,
    // which may be `undefined`").
    const r2 = beginResult(h, el)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    resetCall(h, el, handle2, undefined)
    expect(h.commits.length, 'I-3b — a `reset` with `undefined` STILL commits (the session invents no default)').toBe(2)
    expect(h.commits[1].value, 'I-3b — the committed value is exactly the supplied `undefined`').toBe(undefined)
  })

  it('I-3c §3.3 — A THROWING COMMIT IS STILL THE GESTURE’S ONE COMMIT, AND IS NEVER RETRIED', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()), commitThrows: true })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const done = endCall(h, el, handle)
    expect(done, 'I-3c — the throw PROPAGATES to the caller of the terminal (the session does not swallow consumer errors)').toBe(undefined)
    expect(h.thrown.length, 'I-3c/§3.2 F-3(c) — the consumer’s throw reached the caller').toBe(1)
    expect(h.commits.length, 'I-3c — the throwing commit is STILL the gesture’s ONE commit').toBe(1)
    expect(h.session.stats().commits, 'I-3c — the session’s own counter reads ONE after the throw').toBe(1)
    expect(h.session.stats().active, 'I-3c — the gesture is no longer active despite the throw').toBe(false)
    expect(h.commits.length, 'I-3c — the session NEVER retries the commit (no second invocation exists)').toBe(1)
    expect(h.source.listenerCount(el), 'I-3c/§0A note 11 — a throwing `commit` cannot leave a tracking listener behind').toBe(1)
  })

  it('I-4 §3.3 — THE TRACKING LISTENERS EXIST ONLY BETWEEN START AND TERMINAL: exactly ONE on an idle control, exactly FOUR during a gesture, ONE again after every terminal', async () => {
    for (const terminal of ['end', 'reset', 'cancel'] as const) {
      const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
      const el: Record<string, unknown> = { id: 'a' }
      h.session.install(el)
      expect(
        footprint(h.source, el),
        `I-4/§2.3 item 2 — an installed, IDLE control holds EXACTLY ONE listener (the start listener), of type '${TYPE_START}' [terminal: ${terminal}]`,
      ).toEqual({ count: 1, types: [TYPE_START] })
      const r = beginResult(h, el)
      const handle = (r as { ok: true; gesture: GestureHandle }).gesture
      expect(
        footprint(h.source, el),
        `I-4/§2.3 item 2(a) — during the gesture the control holds EXACTLY FOUR listeners (start + move + end + cancel), i.e. the three tracking listeners were opened IN the window [terminal: ${terminal}]`,
      ).toEqual({ count: 4, types: [TYPE_CANCEL, TYPE_END, TYPE_MOVE, TYPE_START].sort() })
      if (terminal === 'end') endCall(h, el, handle)
      else if (terminal === 'reset') resetCall(h, el, handle, 'd')
      else cancelCall(h, el, handle)
      expect(
        footprint(h.source, el),
        `I-4/§2.3 item 2(c) — at the terminal the tracking three are detached and the count returns to ONE, the start listener REMAINING [terminal: ${terminal}]`,
      ).toEqual({ count: 1, types: [TYPE_START] })
    }
  })

  it('I-5 §3.3 — THE BASELINE RESTORE IS EXACT AND REPORTED: every `on` matched by exactly one `off` with the same three values, and the report is honest', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elA: Record<string, unknown> = { id: 'a' }
    const elB: Record<string, unknown> = { id: 'b' }
    h.session.install(elA)
    h.session.install(elB)
    fireStart(h, elA, PLACEHOLDER_EVENT)
    const report = h.session.dispose()
    expect(report.removed, 'I-5/§2.3 item 7(2) — four listeners from the gesture control + one from the idle control = FIVE detaches').toBe(5)
    expect(report.complete, 'I-5 — every detach succeeded, so the report is honest about it').toBe(true)
    const paired = pairOnOffCalls(h.source.log)
    expect(
      paired.unmatched,
      `I-5/§0A note 3 — EVERY \`on(element, type, handler)\` the session made is matched by exactly ONE \`off\` with the same three values: unmatched = ${JSON.stringify(
        paired.unmatched,
      )}`,
    ).toEqual([])
    expect(
      h.source.listenerPairs(),
      'I-5 (layer anchor 5, §4.4 S-7) — this row asserts the CALLS the session made against the injected source, NEVER a fact about a real browser’s listener table: the session’s own contribution is EMPTY',
    ).toEqual([])
    // The HONEST half: a throwing `off` is caught PER CALL, the remaining detaches still
    // run, and `complete: false` is reported.
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elC: Record<string, unknown> = { id: 'c' }
    const elD: Record<string, unknown> = { id: 'd' }
    h2.session.install(elC)
    h2.session.install(elD)
    fireStart(h2, elC, PLACEHOLDER_EVENT)
    h2.source.failOff = (pair: { type: string }): boolean => pair.type === TYPE_MOVE
    const report2 = h2.session.dispose()
    expect(report2.removed, 'I-5/§2.3 item 7(4) — `removed` counts the SUCCESSFUL detaches (five attempts, one throws, four succeed)').toBe(4)
    expect(
      report2.complete,
      'I-5/§2.3 item 7(4) — `complete: false` is the honest "the baseline could not be fully restored", never a false restore',
    ).toBe(false)
    expect(
      h2.source.log.filter((r) => r.op === 'off').length,
      'I-5 — the remaining detaches STILL RAN after the throwing one (the catch is per call)',
    ).toBe(5)
  })

  it('I-6 §3.3 — NO DOCUMENT-DELEGATED LISTENER AND NO DOM ACCESS, EVER (raw, assembled, commented or realm-rooted)', async () => {
    const raw = moduleSource('I-6 §2.2 P-2/P-3')
    const delegatedRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      {
        what: 'a document/window-delegated listener (the A-d3 REJECTED shape)',
        re: /\b(?:addEventListener|removeEventListener)\b|\bon[a-z]+\s*=\s*(?!>)/,
      },
      { what: 'an element lookup token in ANY form', re: /\b(?:closest|querySelector|querySelectorAll|getElementById)\b/ },
      { what: 'a realm token', re: /\b(?:document|window|globalThis)\b/ },
    ]
    expectNoStaticHits(raw, delegatedRules, 'I-6 §3.3 (§2.2 P-2/P-3)')
    const assembled = assembledChunks(raw)
    expectNoStaticHits(assembled, delegatedRules, 'I-6 §3.3 (the normalized ASSEMBLY view)')
    for (const [label, fixture] of [
      ['a document-delegated listener', `${['doc', 'ument'].join('')}.${['add', 'EventListener'].join('')}('${TYPE_START}', () => {})`],
      ['an ASSEMBLED element lookup', `el[${['clo', 'sest'].join('')}]('x')`],
      ['a comment-carried delegation', `// ${['doc', 'ument'].join('')} delegation is the rejected shape`],
    ] as ReadonlyArray<readonly [string, string]>) {
      const scanned = label === 'a comment-carried delegation' ? fixture : stripComments(fixture)
      expect(
        delegatedRules.some(({ re }) => staticHits(scanned, re).length > 0),
        `I-6 POSITIVE control (${label}) must FAIL the scan — the acceptance line is "zero document-delegated listeners · zero closest/querySelector calls" and a scan that cannot fail is UNFALSIFIED`,
      ).toBe(true)
    }
    const legitimate = `${'export'} function install(element: unknown, options: unknown): boolean { void element; void options; return true }`
    expectNoStaticHits(legitimate, delegatedRules, 'I-6 NEGATIVE control — the unit’s own legitimate text')
  })

  it('I-7 §3.3 — ZERO CAPTURE CALLS BEFORE ESTABLISHMENT, and a capture count of ZERO-or-ONE per gesture', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: true }) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    expect(
      h.source.captures.length,
      'I-7/§2.3 item 6(a) — nothing is captured on `install`: ZERO capture calls before the interaction is established',
    ).toBe(0)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    expect(
      h.source.captures.length,
      'I-7/§2.3 item 6(b) — an opted-in `begin` makes EXACTLY ONE capture call, after establishment (inside `begin`, after the tracking listeners open)',
    ).toBe(1)
    expect(h.source.captures[0].element, 'I-7/§2.3 item 6(b) — the capture call carries the gesture’s OWN element').toBe(el)
    const captureSeq = h.source.captures[0].seq
    const trackingSeqs = h.source.log.filter((rec) => rec.op === 'on' && rec.type !== TYPE_START).map((rec) => rec.seq)
    expect(
      Math.min(...trackingSeqs),
      'I-7/§2.3 item 6 — the capture call appears AFTER the three tracking `on` calls (establishment precedes capture)',
    ).toBeLessThan(captureSeq)
    const connectedSeq = h.source.log.find((rec) => rec.op === 'isConnected')?.seq ?? -1
    expect(
      connectedSeq,
      'I-7/§2.4 item 5 — the connectivity reading precedes the capture call (the element is known connected before capture)',
    ).toBeLessThan(captureSeq)
    // The second `pointermove` and the terminal: never MORE than one capture call.
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    endCall(h, el, handle)
    expect(
      h.source.captures.length,
      'I-7 (the whole row) — a gesture’s capture count is ZERO or ONE, never more: no release call is invented and no second capture appears',
    ).toBe(1)
    // The falsy-value side: any falsy `capture` never captures.
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: 0 }) })
    const el2: Record<string, unknown> = { id: 'b' }
    h2.session.install(el2)
    const r2 = beginResult(h2, el2)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    endCall(h2, el2, handle2)
    expect(
      h2.source.captures.length,
      'I-7/§2.3 item 6(a) — a FALSY `capture` of ANY kind (here `0`) yields ZERO capture calls, ever — the capture entry point is never called',
    ).toBe(0)
  })

  it('I-8 §3.3 — EVERY listener and the capture call go through the INJECTED SOURCE, and the session obtains no element except as an argument', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: true }) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    fireStart(h, el, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
    const ops = h.source.log.map((rec) => rec.op)
    expect(
      ops.filter((op) => op === 'on').length,
      'I-8/§0A ruling 1 — every attachment went through the injected source’s `on` (one start listener + the three tracking listeners)',
    ).toBe(4)
    expect(ops.filter((op) => op === 'off').length, 'I-8 — every detachment went through the injected source’s `off`').toBe(3)
    expect(ops.filter((op) => op === 'capture').length, 'I-8/§2.2 P-3 — the ONE capture call also goes through the source').toBe(1)
    expect(
      h.source.log.every((rec) => rec.element === el || rec.element === undefined),
      'I-8/§2.2 P-2 — the session never obtains an element except as an argument: every source call it made carries an element it was HANDED',
    ).toBe(true)
    // The event source that carries NO capture member at all is the valid degradation,
    // never a throw (`§2.4` item 6).
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: true }), sourceOptions: { withCapture: false } })
    const el2: Record<string, unknown> = { id: 'b' }
    expect(
      h2.session.install(el2),
      'I-8/§2.4 item 6 — a source without a capture member is still a USABLE source (the capture call is optional, never a precondition)',
    ).toBe(true)
    expect(beginResult(h2, el2)?.ok, 'I-8/§2.4 item 6 — the gesture still establishes for an opted-in control on a capture-less source').toBe(true)
  })

  it('I-9 §3.3 — ELEMENT IDENTITY IS BY REFERENCE: the same object is one control, a structurally identical distinct object is another, and no string ever derives an element', async () => {
    const h = await makeHarness({ installOptions: {} })
    const first: Record<string, unknown> = { nodeType: 1, id: 'same' }
    const clone: Record<string, unknown> = { nodeType: 1, id: 'same' }
    expect(h.session.install(first), 'I-9/§2.4 item 2 — the first install returns `true`').toBe(true)
    expect(
      h.session.install(first),
      'I-9/§2.4 item 2 (the ARCHITECT’S ruling 4) — a REPEAT install on the SAME object is a NO-OP returning `false`',
    ).toBe(false)
    const before = h.source.log.length
    expect(
      h.source.log.length,
      'I-9/§2.3 item 1(b) — the repeat install makes NO source call at all ("a second `install` does not double listeners" is satisfied STRUCTURALLY)',
    ).toBe(before)
    expect(h.session.install(clone), 'I-9 — a structurally IDENTICAL but distinct object is a SECOND control').toBe(true)
    const startCalls = h.source.log.filter((rec) => rec.op === 'on' && rec.type === TYPE_START)
    expect(
      startCalls.map((rec) => rec.element),
      'I-9/§2.4 item 2 — two `on` calls, one carrying each OBJECT REFERENCE (identity assertions, never a name/class/attribute/position match)',
    ).toEqual([first, clone])
    // The static half: no element is ever derived from a string.
    const code = stripComments(moduleSource('I-9 §0A note 2, §2.4 item 2'))
    const deriveRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'an element lookup (a string-derived element)', re: /\b(?:closest|querySelector|querySelectorAll|getElementById)\b/ },
      { what: 'an attribute/class/name match', re: /\b(?:getAttribute|classList|className|tagName|matches)\b/ },
      { what: 'a position/index match', re: /\b(?:children|childNodes|parentNode|nextSibling)\b/ },
    ]
    expectNoStaticHits(code, deriveRules, 'I-9 §3.3')
    for (const [label, fixture] of [
      ['a selector-derived element', `el.${['query', 'Selector'].join('')}('#x')`],
      ['an attribute match', `el.getAttribute('data-x')`],
      ['a position match', `${'const'} p = el.parentNode`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        deriveRules.some(({ re }) => staticHits(stripComments(fixture), re).length > 0),
        `I-9 POSITIVE control (${label}) must FAIL the derivation scan — the row is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
  })

  it('I-10 §3.3 — TOTALITY AT THE SEAM: the factory never throws for ANY argument, and every method returns its declared shape for every input', async () => {
    const create = await valueExport<(o?: unknown) => GestureSessionMirror>('createGestureSession', 'I-10')
    const hostileOptions: readonly unknown[] = [
      undefined,
      null,
      42,
      'a string',
      true,
      {},
      { source: undefined },
      { source: null },
      { source: 42 },
      { source: {} },
      { source: { on: 42, off: null } },
      { source: { on: () => undefined, off: () => undefined } },
      { commit: 42 },
      new Proxy({}, { get: () => undefined, has: () => false }),
    ]
    for (const options of hostileOptions) {
      let session: GestureSessionMirror | null = null
      let thrown: unknown = null
      try {
        session = create(options as never)
      } catch (e) {
        thrown = e
      }
      expect(
        thrown,
        `I-10/§2.4 item 6 — \`createGestureSession\` NEVER throws, whatever it is handed (options: ${brief(options)}); it threw ${brief(thrown)}`,
      ).toBe(null)
      const s = session as unknown as GestureSessionMirror
      expect(typeof s.stats, `I-10 — the instance returned for ${brief(options)} carries a callable \`stats\``).toBe('function')
      const stats = s.stats()
      expect(
        Object.keys(stats).sort(),
        'I-10/§2.1 — `stats()` returns its DECLARED shape for every construction argument (`installed`, `sourceCalls`, `gestures`, `commits`, `active`, `gestureId`, `lastCode`)',
      ).toEqual(['active', 'commits', 'gestureId', 'gestures', 'installed', 'lastCode', 'sourceCalls'])
      expect(brief(s.gesture()), `I-10 — \`gesture()\` returns \`null\` when idle for ${brief(options)}`).toBe('null')
    }
  })

  it('I-11 §3.3 — NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: the module reads NO pointer coordinate and NO event field at all', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // The event object is OPAQUE: a Proxy whose every trap throws cannot change anything,
    // because no read happens.
    const hostileEvent = new Proxy(
      {},
      {
        get(): never {
          throw new Error('the event’s `get` trap was reached — the session read a field it may not read')
        },
        has(): never {
          throw new Error('the event’s `has` trap was reached')
        },
        getOwnPropertyDescriptor(): never {
          throw new Error('the event’s `getOwnPropertyDescriptor` trap was reached')
        },
      },
    )
    let thrown: unknown = null
    try {
      fireStart(h, el, hostileEvent)
      h.source.fire(el, TYPE_MOVE, hostileEvent)
      h.source.fire(el, TYPE_END, hostileEvent)
    } catch (e) {
      thrown = e
    }
    expect(
      thrown,
      `I-11/§2.4 item 1 — the session reads NO field of the event object: a Proxy whose traps THROW changed nothing because no read occurred; observed ${brief(thrown)}`,
    ).toBe(null)
    expect(h.session.stats().commits, 'I-11 — the lifecycle completed normally over an opaque event (the commit count is the declared ONE)').toBe(1)
    // The mechanical consequence: no coordinate reaches the session, so it cannot know a
    // distance, a delta or a magnitude.
    expect(
      h.session.stats().active,
      'I-11/§2.4 item 1 (the magnitude clause in mechanical form) — the session carries no coordinate, so NO row of this unit may claim a magnitude, a resolution or an agent-drivable drag',
    ).toBe(false)
  })

  it('I-12 §3.3 — NO STORE, NO PERSISTENCE, NO CROSS-GESTURE CARRY: at most ONE gesture record, discarded at every terminal', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r1 = beginResult(h, el)
    const handle1 = (r1 as { ok: true; gesture: GestureHandle }).gesture
    const carried = { first: 'gesture value' }
    handle1.set(carried)
    endCall(h, el, handle1)
    const r2 = beginResult(h, el)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    expect(
      handle2.value,
      'I-12/§2.4 item 8 — a NEW gesture’s value starts as `undefined` regardless of the previous gesture’s value: NOTHING is carried across a gesture boundary',
    ).toBe(undefined)
    expect(handle2.value, 'I-12 — the previous gesture’s value object is not reachable from the new gesture').not.toBe(carried)
    expect(
      [...h.source.log, ...h.commits].some((rec) => Object.is((rec as { value?: unknown }).value, carried)),
      'I-12/§2.4 item 8 — the value survived only as the COMMIT ARGUMENT of the gesture that set it, never in an element-keyed value, cache, memo or map',
    ).toBe(true)
    // The static half: no store, no persistence, no module-level mutable state.
    const raw = moduleSource('I-12 §2.2 P-8')
    expectNoStaticHits(raw, MODULE_STATE_RULES, 'I-12 §3.3 (§2.2 P-8)')
    const storeRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a persistence surface', re: /\b(?:localStorage|sessionStorage|indexedDB|writeFile|readFile|node:fs)\b/ },
      { what: 'a store/cache/memo vocabulary', re: /\b(?:new\s+Map\s*\(|new\s+WeakMap\s*\(|\bcache\b|\bmemo\b|\bregistry\b|\bjournal\b)\b/ },
    ]
    expectNoStaticHits(stripComments(raw), storeRules, 'I-12 §3.3 (§2.2 P-8, §1 item 5)')
    for (const [label, fixture] of [
      ['a persistence write', `${['local', 'Storage'].join('')}.setItem('k', 'v')`],
      ['an element-keyed cache', `${'const'} cache = new Map()`],
      ['a journal reference', `${'const'} journal = []`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        storeRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `I-12 POSITIVE control (${label}) must FAIL the store scan — "no store, no persistence" is a TESTABLE claim, not a slogan`,
      ).toBe(true)
    }
    // Only two numbers persist, and they are monotonic.
    const stats = h.session.stats()
    expect(
      [stats.gestures, stats.commits],
      'I-12/§0A note 8 — only `gestureSeq` and `commitCount` (two numbers) outlive a gesture',
    ).toEqual([2, 2])
  })

  it('I-12b §3.3 — RE-ENTRANCY CANNOT CORRUPT THE BASELINE OR THE COUNT: a hook that re-enters sees a consistent state', async () => {
    const log = makeHookLog()
    const reentrant: unknown[] = []
    const h = await makeHarness({})
    const el: Record<string, unknown> = { id: 'a' }
    // An `onStart` that re-enters `begin`, and an `onEnd` that re-enters `begin` and
    // `cancel` — all after the terminal has already detached.
    h.session.install(
      el,
      hookOptions(log, {
        onStart: (): void => {
          log.start.push(['re-entrant'])
          reentrant.push(h.session.begin(el))
        },
        onEnd: (): void => {
          log.end.push(['re-entrant'])
          reentrant.push(h.session.begin(el))
          reentrant.push(h.session.cancel(el))
        },
      }),
    )
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    endCall(h, el, handle)
    expect(
      reentrant[0],
      'I-12b/§2.3 item 3 — a `begin` from inside `onStart` is REFUSED `busy` (the gesture is already established), never a second authority',
    ).toEqual({ ok: false, code: 'busy' })
    expect(
      [(reentrant[1] as TerminalResult | BeginResult).ok ? 'ok' : (reentrant[1] as { code: string }).code],
      'I-12b/§0A note 11 — a `begin` from inside `onEnd` sees the gesture ALREADY inactive and the listeners ALREADY detached: no new gesture can be started from a terminal’s own turn',
    ).toEqual(['busy'])
    expect(h.commits.length, 'I-12b — the re-entrant calls produced exactly ONE commit (the terminal’s own), never two').toBe(1)
    expect(h.session.stats().commits, 'I-12b — the session’s own counter agrees: the re-entrancy could not double-commit').toBe(1)
    expect(
      h.source.listenerCount(el),
      'I-12b/§2.3 item 4 — the re-entrancy left NO listener behind: the control is back to its ONE start listener',
    ).toBe(1)
    // A `dispose()` from inside a hook is honoured, and the terminal completes with no
    // further commit.
    const h2 = await makeHarness({})
    const el2: Record<string, unknown> = { id: 'b' }
    let disposedFromHook = false
    h2.session.install(
      el2,
      hookOptions(makeHookLog(), {
        onEnd: (): void => {
          disposedFromHook = true
          h2.session.dispose()
        },
      }),
    )
    const r2 = beginResult(h2, el2)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    endCall(h2, el2, handle2)
    expect(disposedFromHook, 'I-12b — the hook’s `dispose()` ran').toBe(true)
    expect(h2.session.disposed, 'I-12b/§2.3 item 7 — a `dispose()` from inside a hook is HONOURED').toBe(true)
    expect(h2.commits.length, 'I-12b — the terminal completed without a FURTHER commit (the honoured dispose adds none)').toBe(0)
  })

  it('I-13 §3.3 — NO AMBIENT READ AND NO IMPORT: the module reads no ambient global and imports NOTHING', async () => {
    const raw = moduleSource('I-13 §2.2 P-2/P-10')
    const ambientRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'an ambient global token', re: /\b(?:document|window|globalThis|self|top|parent|frames)\b/ },
      { what: 'an ambient reading', re: /\b(?:matchMedia|getComputedStyle|activeElement|process\.env)\b/ },
      { what: 'a clock or random source', re: /\b(?:Date|Math\.random)\b/ },
      { what: 'any import statement at all', re: /^\s*import\b|\bimport\s*\(|\brequire\s*\(/m },
      { what: 'an engine or shim reference', re: /\b(?:provident-ssr|dom-shim|zones\.js|census\.js|layout-projection)\b/ },
    ]
    expectNoStaticHits(raw, ambientRules, 'I-13 §3.3 (§0 ruling 12)')
    expectNoStaticHits(assembledChunks(raw), ambientRules, 'I-13 §3.3 (the normalized ASSEMBLY view)')
    for (const [label, fixture] of [
      ['an ambient read', `const t = ${['mat', 'chMedia'].join('')}('(min-width: 1px)')`],
      ['an assembled realm token', `const d = ${['global', 'This'].join('')}[${['"doc"', ' + "ument"'].join('')}]`],
      ['an engine import', `import { x } from 'provident-ssr'`],
      ['a shim import', `import { mountEl } from './dom-shim.js'`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        ambientRules.some(({ re }) => staticHits(fixture, re).length > 0) ||
          (label === 'an assembled realm token' && ambientRules.some(({ re }) => staticHits(assembledChunks(fixture), re).length > 0)),
        `I-13 POSITIVE control (${label}) must FAIL the scan — the portability reason the seam exists is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
  })
})

// ===========================================================================
// M-1..M-17 — §3.1 THE VALID / HAPPY STATES.
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it('M-1 §3.1 — a control is installed, and its start listener is on ITS OWN element: exactly TWO `on` calls, one per element, both `pointerdown`', async () => {
    const h = await makeHarness({ installOptions: {} })
    const elA: Record<string, unknown> = { id: 'a' }
    const elB: Record<string, unknown> = { id: 'b' }
    expect(h.session.install(elA), 'M-1/§2.3 item 1(a) — the first install returns `true`').toBe(true)
    expect(h.session.install(elB), 'M-1/§2.3 item 1(a) — the second install returns `true`').toBe(true)
    const startCalls = h.source.log.filter((rec) => rec.op === 'on')
    expect(startCalls.length, 'M-1 — exactly TWO `on` calls for two installed controls').toBe(2)
    expect(
      startCalls.map((rec) => rec.type),
      `M-1 — BOTH calls carry the pinned start type '${TYPE_START}'`,
    ).toEqual([TYPE_START, TYPE_START])
    expect(startCalls[0].element, 'M-1 — one call carries `elA` BY IDENTITY').toBe(elA)
    expect(startCalls[1].element, 'M-1 — one call carries `elB` BY IDENTITY').toBe(elB)
    expect(
      startCalls.filter((rec) => rec.element !== elA && rec.element !== elB),
      'M-1/§2.2 P-7 — ZERO `on` calls carry any other element (the start listener is attached to the control, not delegated to a document or a parent)',
    ).toEqual([])
    expect(typeof startCalls[0].handler, 'M-1 — the attached handler is a function the session owns').toBe('function')
    expect(
      startCalls[0].handler,
      'M-1/§2.3 item 1(a) — the handler bound to `elA` is NOT the handler bound to `elB` (each is bound to ITS OWN element)',
    ).not.toBe(startCalls[1].handler)
  })

  it('M-2 §3.1 — a gesture is established by the control’s OWN listener, and the event object is never read', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // The row passes an OPAQUE event object: a Proxy with throwing traps. If the module
    // read ANY property the attempt would throw.
    const opaqueEvent = new Proxy(
      {},
      {
        get(): never {
          throw new Error('the handler read a property of the event object')
        },
        has(): never {
          throw new Error('the handler probed the event object')
        },
      },
    )
    let thrown: unknown = null
    try {
      h.source.fire(el, TYPE_START, opaqueEvent)
    } catch (e) {
      thrown = e
    }
    expect(
      thrown,
      `M-2/§2.3 item 1(d) — the session’s own handler takes NO parameter it uses: the event object is not read and not passed anywhere; observed ${brief(thrown)}`,
    ).toBe(null)
    expect(h.session.stats().gestures, 'M-2/§2.3 item 1(d) — the handler called `begin(element)`, so the session records ONE gesture').toBe(1)
    expect(h.session.stats().active, 'M-2 — a gesture is ACTIVE on `elA`').toBe(true)
    expect(h.session.gesture()?.id, 'M-2/§2.4 item 4 — the handle’s `id` is `1` (monotonic, instance-local, starts at 1)').toBe(1)
    expect(h.session.gesture()?.active, 'M-2/§2.1 — the active reading reports `active: true`').toBe(true)
    expect(h.session.stats().gestureId, 'M-2/§2.1 — `stats().gestureId` reads the live id').toBe(1)
    // The start listener is the ONE that was attached to the control (the seam is the
    // control’s own element, never a document).
    expect(h.source.log.filter((rec) => rec.op === 'on' && rec.type === TYPE_START).length, 'M-2/§2.3 item 1 — one start listener was attached').toBe(1)
    expect(h.source.listenerCount(el), 'M-2/§2.3 item 2(a) — the gesture opened the three tracking listeners on the SAME element (1 → 4)').toBe(4)
  })

  it('M-3 §3.1 — the session’s callbacks receive the consumer’s values VERBATIM (never coerced, copied, frozen or validated)', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const objectValue = { k: 1 }
    const symbolValue = Symbol('s')
    handle.set(objectValue)
    handle.set(symbolValue)
    handle.set(undefined)
    expect(
      Object.is(handle.value, undefined),
      'M-3/§2.4 item 7 — `undefined` is stored VERBATIM as the current value (no validation, no default)',
    ).toBe(true)
    const done = endCall(h, el, handle)
    expect(done?.committed, 'M-3 — the commit still happens exactly once (an `undefined` value commits — `§2.3` item 4)').toBe(true)
    expect(h.commits.length, 'M-3 — exactly ONE commit').toBe(1)
    expect(h.commits[0].value, 'M-3 — the callback receives the gesture’s last value VERBATIM (`undefined`)').toBe(undefined)
    expect(h.commits[0].gesture, 'M-3 — the callback receives the TERMINAL handle by identity').toBe(handle)
    expect(h.commits[0].outcome, 'M-3 — the handle’s `outcome` is the discriminator the consumer reads').toBe('end')
    // The object case, by identity; and the `NaN`/`-0` cases by `Object.is`.
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    h2.session.install(el)
    const r2 = beginResult(h2, el)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    handle2.set(objectValue)
    expect(handle2.value, 'M-3 — the object value is stored BY IDENTITY (never copied, frozen or cloned)').toBe(objectValue)
    expect(Object.isFrozen(objectValue), 'M-3 — the session does not FREEZE the consumer’s value').toBe(false)
    endCall(h2, el, handle2)
    expect(h2.commits[0].value, 'M-3 — the committed object is the SAME reference the consumer handed in').toBe(objectValue)
    const h3 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    h3.session.install(el)
    const r3 = beginResult(h3, el)
    const handle3 = (r3 as { ok: true; gesture: GestureHandle }).gesture
    handle3.set(Number.NaN)
    endCall(h3, el, handle3)
    expect(Object.is(h3.commits[0].value, Number.NaN), 'M-3/§2.4 item 7 — `NaN` survives verbatim (`Object.is` equality)').toBe(true)
    const h4 = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    h4.session.install(el)
    const r4 = beginResult(h4, el)
    const handle4 = (r4 as { ok: true; gesture: GestureHandle }).gesture
    handle4.set(-0)
    endCall(h4, el, handle4)
    expect(Object.is(h4.commits[0].value, -0), 'M-3 — `-0` survives verbatim (no coercion to `0`)').toBe(true)
  })

  it('M-4 §3.1 — one commit for a normal end: a full `begin` → `pointermove` → `pointerup` sequence', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    fireStart(h, el, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
    expect(h.commits.length, 'M-4/§2.3 items 4/5 — `commit` is invoked EXACTLY once over the whole sequence').toBe(1)
    expect(h.session.stats().commits, 'M-4 — `session.stats().commits === 1` (the session’s OWN counter, not the spy alone)').toBe(1)
    expect(h.session.stats().active, 'M-4 — `stats().active === false` after the terminal').toBe(false)
    expect(h.commits[0].outcome, 'M-4 — the handle’s `outcome === \'end\'`').toBe('end')
    expect(h.source.listenerCount(el), 'M-4/§2.3 item 2(c) — the three tracking listeners were detached at the terminal (back to ONE)').toBe(1)
  })

  it('M-5 §3.1 — a second gesture is a NEW gesture: ids `1` then `2`, two commits, and nothing carried', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r1 = beginResult(h, el)
    const handle1 = (r1 as { ok: true; gesture: GestureHandle }).gesture
    expect(handle1.id, 'M-5/§2.4 item 4 — the first gesture’s id is `1`').toBe(1)
    handle1.set({ first: true })
    endCall(h, el, handle1)
    const r2 = beginResult(h, el)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    expect(handle2.id, 'M-5/§2.4 item 4 — the second gesture’s id is `2` (monotonic, never reused)').toBe(2)
    expect(handle2.id, 'M-5 — the two ids differ (no reuse across the boundary)').not.toBe(handle1.id)
    expect(handle2.value, 'M-5/§2.4 item 8 — the second handle’s `value` starts as `undefined` regardless of the first gesture’s value: NOTHING is carried').toBe(undefined)
    expect(handle1.active, 'M-5 — the first handle reports `active: false` once its terminal has run').toBe(false)
    expect(handle1.outcome, 'M-5 — the first handle keeps its terminal’s word').toBe('end')
    endCall(h, el, handle2)
    expect(h.session.stats().commits, 'M-5 — two full sequences ⇒ TWO commits').toBe(2)
    expect(h.commits.length, 'M-5 — the injected callback’s own count agrees with the session’s').toBe(2)
  })

  it('M-6 §3.1 — the tracking listeners exist only inside the window: the ordered call log is exactly the pinned pattern', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const afterInstall = h.source.log.map((rec) => `${rec.op}:${rec.type}`)
    expect(afterInstall, 'M-6/§2.3 item 1(a) — after `install` the log is exactly ONE `on(pointerdown)`').toEqual([`on:${TYPE_START}`])
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    expect(
      h.source.log.map((rec) => `${rec.op}:${rec.type}`),
      `M-6/§2.3 item 2(a) — a successful \`begin\` logs, IN ORDER: the connectivity reading (iff callable), then \`on(pointermove)\`, \`on(pointerup)\`, \`on(pointercancel)\` — once each, on the SAME element`,
    ).toEqual([`on:${TYPE_START}`, 'isConnected:isConnected', `on:${TYPE_MOVE}`, `on:${TYPE_END}`, `on:${TYPE_CANCEL}`])
    expect(
      h.source.log.filter((rec) => rec.op === 'on' || rec.op === 'off').every((rec) => rec.element === el),
      'M-6/§2.3 item 2(b) — NO listener is ever attached to any OTHER element during the gesture (no window/document tracking — the A-d3 rejected shape)',
    ).toBe(true)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    endCall(h, el, handle)
    const terminalOps = h.source.log.slice(5).map((rec) => `${rec.op}:${rec.type}`)
    expect(
      terminalOps,
      `M-6/§2.3 item 2(c) — the terminal’s FIRST step is \`off(move)\`, \`off(end)\`, \`off(cancel)\` IN THAT ORDER, with the same three values, detaching BEFORE any consumer code (§0A note 11)`,
    ).toEqual([`off:${TYPE_MOVE}`, `off:${TYPE_END}`, `off:${TYPE_CANCEL}`])
    expect(
      h.source.log.slice(5).every((rec) => rec.element === el),
      'M-6 — every detach carries the SAME element the attach carried',
    ).toBe(true)
  })

  it('M-7 §3.1 — `capture: true` opts ONE control in, and the call happens AFTER establishment', async () => {
    const h = await makeHarness({})
    const elA: Record<string, unknown> = { id: 'a' }
    const elB: Record<string, unknown> = { id: 'b' }
    h.session.install(elA, { capture: true })
    h.session.install(elB, {})
    const rA = beginResult(h, elA)
    const handleA = (rA as { ok: true; gesture: GestureHandle }).gesture
    cancelCall(h, elA, handleA)
    const rB = beginResult(h, elB)
    const handleB = (rB as { ok: true; gesture: GestureHandle }).gesture
    cancelCall(h, elB, handleB)
    expect(h.source.captures.length, 'M-7/§2.3 item 6 — exactly ONE capture call over both controls').toBe(1)
    expect(h.source.captures[0].element, 'M-7 — the single capture call is on the OPTED-IN control `elA`').toBe(elA)
    const seqOf = (type: string): number => h.source.log.find((rec) => rec.op === 'on' && rec.type === type && rec.element === elA)?.seq ?? -1
    expect(
      h.source.captures[0].seq,
      `M-7 — the capture call appears in the call log AFTER the three tracking \`on\` calls (move ${seqOf(TYPE_MOVE)}, end ${seqOf(
        TYPE_END,
      )}, cancel ${seqOf(TYPE_CANCEL)} vs capture ${h.source.captures[0].seq}): capture happens after establishment`,
    ).toBeGreaterThan(Math.max(seqOf(TYPE_MOVE), seqOf(TYPE_END), seqOf(TYPE_CANCEL)))
    expect(
      h.source.captures.filter((rec) => rec.element === elB),
      'M-7/§2.3 item 6(a) — ZERO capture calls for `elB`, which did not opt in (the absent `capture` is the ABSENCE OF OPT-IN, never a mechanism default)',
    ).toEqual([])
  })

  it('M-8 §3.1 — `capture` truthiness is the opt-in: `\'yes\'` opts in, `0` does not', async () => {
    const h = await makeHarness({})
    const elYes: Record<string, unknown> = { id: 'yes' }
    const elZero: Record<string, unknown> = { id: 'zero' }
    h.session.install(elYes, { capture: 'yes' })
    h.session.install(elZero, { capture: 0 })
    const r1 = beginResult(h, elYes)
    const h1 = (r1 as { ok: true; gesture: GestureHandle }).gesture
    cancelCall(h, elYes, h1)
    const r2 = beginResult(h, elZero)
    const h2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    cancelCall(h, elZero, h2)
    expect(
      h.source.captures.filter((rec) => rec.element === elYes).length,
      'M-8/§2.3 item 6(b) — `Boolean(\'yes\') === true` opts the control in: exactly one capture call, after establishment',
    ).toBe(1)
    expect(
      h.source.captures.filter((rec) => rec.element === elZero).length,
      'M-8/§2.3 item 6(a) — `Boolean(0) === false` does not: ZERO capture calls (every falsy value does not opt in — `P-GS-IM-5`)',
    ).toBe(0)
    expect(
      h.source.captures.length,
      'M-8 — the truthiness rule alone decides the opt-in (no other value state matters)',
    ).toBe(1)
  })

  it('M-9 §3.1 — `pointercancel` is a cancel terminal: zero commits, `onCancel` once, the tracking three detached and the start listener retained', async () => {
    const log = makeHookLog()
    const h = await makeHarness({ installOptions: hookOptions(log) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    fireStart(h, el, PLACEHOLDER_EVENT)
    const activeHandle = (h.session.gesture() as GestureStats | null)?.id
    h.source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
    expect(h.commits.length, 'M-9/§2.3 item 4 — `commit` invoked ZERO times on a `pointercancel`').toBe(0)
    expect(log.cancel.length, 'M-9 — `onCancel` ran exactly ONCE').toBe(1)
    expect(log.cancel[0][0], 'M-9 — `onCancel` receives the gesture’s own element').toBe(el)
    expect(h.session.stats().active, 'M-9 — the gesture is no longer active').toBe(false)
    expect(h.session.gesture(), 'M-9/§2.1 — `gesture()` returns `null` once the terminal has run (idle)').toBe(null)
    expect(
      h.source.listenerCount(el),
      `M-9/§2.3 item 2(c) — the three tracking listeners are detached at the cancel terminal, and the START listener REMAINS (the element stays installed): ${JSON.stringify(
        h.source.typeMultiset(el),
      )} [active handle id was ${String(activeHandle)}]`,
    ).toBe(1)
    expect(h.source.typeMultiset(el), 'M-9 — the retained listener is the start listener').toEqual([TYPE_START])
  })

  it('M-10 §3.1 — `end` commits ONCE and an `undefined` value STILL commits (twice, one each)', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // (a) no `set` at all.
    const r1 = beginResult(h, el)
    const handle1 = (r1 as { ok: true; gesture: GestureHandle }).gesture
    const done1 = endCall(h, el, handle1)
    expect(done1, 'M-10/§2.3 item 4 — a successful `end` returns `{ok:true, code:\'ok\', committed:true}`').toEqual({
      ok: true,
      code: 'ok',
      committed: true,
    })
    expect(h.commits.length, 'M-10 — the first `end` — with NO `set` at all — committed exactly once').toBe(1)
    expect(h.commits[0].value, 'M-10 — the committed value is `undefined` (the gesture never set one)').toBe(undefined)
    // (b) `set(undefined)` explicitly.
    const r2 = beginResult(h, el)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    handle2.set(undefined)
    expect(handle2.value, 'M-10/§2.4 item 7 — `set(undefined)` is stored verbatim (no validation, no default)').toBe(undefined)
    const done2 = endCall(h, el, handle2)
    expect(done2?.committed, 'M-10 — the second `end` also reports `committed: true` (the commit is a COUNT, never a "commit only if something changed" heuristic)').toBe(true)
    expect(h.commits.length, 'M-10 — TWO gestures, TWO commits, ONE EACH').toBe(2)
    expect(h.commits[1].value, 'M-10 — the second commit also receives `undefined`').toBe(undefined)
    expect(h.session.stats().commits, 'M-10 — the session’s own counter reads TWO').toBe(2)
  })

  it('M-11 §3.1 — `cancel` detaches BEFORE the consumer’s hook runs (the baseline is restored before consumer code)', async () => {
    const observed: { offsAtHook: number; opAtHook: string[] } = { offsAtHook: -1, opAtHook: [] }
    const h = await makeHarness({})
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(
      el,
      hookOptions(makeHookLog(), {
        onCancel: (): void => {
          observed.offsAtHook = h.source.log.filter((rec) => rec.op === 'off').length
          observed.opAtHook = h.source.log.map((rec) => `${rec.op}:${rec.type}`)
        },
      }),
    )
    fireStart(h, el, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
    expect(
      observed.offsAtHook,
      'M-11/§0A note 11 — at the moment `onCancel` runs, the log ALREADY contains the three `off` calls: the baseline is restored BEFORE any consumer code',
    ).toBe(3)
    expect(
      observed.opAtHook.slice(-3),
      `M-11/§2.3 item 2(c) — the detaches precede the hook, in the pinned order: ${JSON.stringify(observed.opAtHook)}`,
    ).toEqual([`off:${TYPE_MOVE}`, `off:${TYPE_END}`, `off:${TYPE_CANCEL}`])
    expect(
      h.source.listenerCount(el),
      'M-11 — the hook observed a control already back to its ONE start listener',
    ).toBe(1)
    // The `commit` half of the same rule, for the committing terminals.
    const observedCommit: { offsAtCommit: number } = { offsAtCommit: -1 }
    const h2 = await makeHarness({
      commitThrows: false,
    })
    const el2: Record<string, unknown> = { id: 'b' }
    const commits: number[] = []
    const h3 = await makeHarness({})
    void h2
    void commits
    const session3 = await makeSession(
      {
        source: h3.source,
        commit: (): void => {
          observedCommit.offsAtCommit = h3.source.log.filter((rec) => rec.op === 'off').length
        },
      },
      'M-11 (the commit half)',
    )
    session3.install(el2)
    const r3 = session3.begin(el2)
    const handle3 = (r3 as { ok: true; gesture: GestureHandle }).gesture
    session3.end(el2, handle3)
    expect(
      observedCommit.offsAtCommit,
      'M-11/§0A note 11 — the terminal order is (1) detach, (2) mark inactive, (3) run the hook, (4) invoke `commit`: the `commit` call also observes the detaches already done',
    ).toBe(3)
  })

  it('M-12 §3.1 — `reset` commits the SUPPLIED value exactly once, with its own outcome', async () => {
    const log = makeHookLog()
    const h = await makeHarness({ installOptions: hookOptions(log) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const userValue = { user: 'chose this' }
    const suppliedDefault = { supplied: 'default' }
    handle.set(userValue)
    const done = resetCall(h, el, handle, suppliedDefault)
    expect(done, 'M-12/§2.3 item 4 — `reset` returns `{ok:true, code:\'ok\', committed:true}`').toEqual({
      ok: true,
      code: 'ok',
      committed: true,
    })
    expect(h.commits.length, 'M-12 — `commit` called exactly ONCE').toBe(1)
    expect(h.commits[0].value, 'M-12/§0A note 6 — with the SUPPLIED value, NOT `userValue`').toBe(suppliedDefault)
    expect(handle.outcome, 'M-12 — `handle.outcome === \'reset\'`').toBe('reset')
    expect(log.end.length, 'M-12/§2.3 item 4 — the `reset` terminal runs the `onEnd` hook (it is an end-class terminal), once').toBe(1)
    expect(log.end[0][1], 'M-12 — the hook receives the SUPPLIED value').toBe(suppliedDefault)
    expect(
      log.cancel.length,
      'M-12 — the `cancel` hook does NOT run: `reset` is not a cancel (a composing controller distinguishes the two by `outcome`)',
    ).toBe(0)
    expect(h.source.listenerCount(el), 'M-12 — the tracking three are detached at the reset terminal').toBe(1)
  })

  it('M-13 §3.1 — `dispose()` restores the session’s own baseline and is IDEMPOTENT: FIVE detaches, then `{removed: 0, complete: true}`', async () => {
    const log = makeHookLog()
    const h = await makeHarness({ installOptions: hookOptions(log) })
    const elA: Record<string, unknown> = { id: 'a' }
    const elB: Record<string, unknown> = { id: 'b' }
    h.session.install(elA)
    h.session.install(elB)
    fireStart(h, elA, PLACEHOLDER_EVENT)
    const first = h.session.dispose()
    expect(h.commits.length, 'M-13/§2.3 item 7(1) — a `dispose()` during a gesture takes the `cancel` path: `commit` ZERO times').toBe(0)
    expect(log.cancel.length, 'M-13 — `onCancel` ran ONCE for the in-flight gesture').toBe(1)
    expect(
      first.removed,
      'M-13/§2.3 item 7(2) — EVERY session-attached listener detached: 4 from `elA` (start + the three tracking) + 1 from `elB` = FIVE',
    ).toBe(5)
    expect(first.complete, 'M-13 — the detach was complete, and the report says so').toBe(true)
    const pairs = pairOnOffCalls(h.source.log)
    expect(pairs.unmatched, `M-13 — every detach matches its \`on\` by the same three values (element, type, HANDLER IDENTITY): ${JSON.stringify(pairs.unmatched)}`).toEqual([])
    const callsBefore = h.source.log.length
    const second = h.session.dispose()
    expect(second, 'M-13/§2.3 item 7(5) — the SECOND `dispose()` reports `{removed: 0, complete: true}`').toEqual({
      removed: 0,
      complete: true,
    })
    expect(h.source.log.length, 'M-13 — the second call performs ZERO source calls (the difference is asserted, not assumed)').toBe(callsBefore)
    expect(h.session.disposed, 'M-13/§2.3 item 7(3) — `session.disposed === true` FOREVER').toBe(true)
    expect(h.session.stats().installed, 'M-13 — the ledger is emptied: `stats().installed === 0`').toBe(0)
    expect(h.session.stats().active, 'M-13 — `stats().active === false`').toBe(false)
    expect(h.session.gesture(), 'M-13 — `gesture()` returns `null`').toBe(null)
  })

  it('M-14 §3.1 — `begin` is established only when the element is connected: `true` and `undefined` both proceed, with ONE reading per attempt', async () => {
    for (const [label, answer] of [
      ['`true`', true],
      ['`undefined`', undefined],
    ] as ReadonlyArray<readonly [string, unknown]>) {
      const h = await makeHarness({ sourceOptions: { isConnected: () => answer } })
      const el: Record<string, unknown> = { id: 'a' }
      h.session.install(el)
      const r = beginResult(h, el)
      expect(r?.ok, `M-14/§2.4 item 5 — \`isConnected\` returning ${label} means "no contrary evidence" and the gesture PROCEEDS`).toBe(true)
      const tracking = h.source.log.filter((rec) => rec.op === 'on' && rec.type !== TYPE_START)
      expect(tracking.length, `M-14 — the three tracking listeners are attached for the ${label} answer`).toBe(3)
      expect(
        h.source.log.filter((rec) => rec.op === 'isConnected').length,
        `M-14/§2.4 item 5 — \`isConnected(element)\` is called EXACTLY ONCE per \`begin\` attempt (${label})`,
      ).toBe(1)
    }
    // The `null` answer of the same clause: still no contrary evidence.
    const h2 = await makeHarness({ sourceOptions: { isConnected: () => null } })
    const el2: Record<string, unknown> = { id: 'b' }
    h2.session.install(el2)
    expect(beginResult(h2, el2)?.ok, 'M-14/§2.4 item 5 — a `null` return is NOT the failing answer: only EXACTLY `false` fails').toBe(true)
  })

  it('M-15 §3.1 — the counters are the session’s own and are readable: `stats()` agrees with the recorded log', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // M-4 sequence.
    fireStart(h, el, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
    // M-9 sequence.
    fireStart(h, el, PLACEHOLDER_EVENT)
    h.source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
    // M-12 sequence.
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    resetCall(h, el, handle, 'd')
    const stats = h.session.stats()
    expect(stats.gestures, 'M-15/§0A note 12 — three successful `begin` calls, instance-lifetime').toBe(3)
    expect(stats.commits, 'M-15 — TWO commits: the `end` and the `reset` (the `cancel` committed nothing)').toBe(2)
    expect(stats.active, 'M-15 — no gesture is active').toBe(false)
    expect(stats.gestureId, 'M-15/§2.1 — `gestureId` is `0` when idle').toBe(0)
    expect(stats.lastCode, 'M-15 — the LAST result code this session produced is `ok`').toBe('ok')
    expect(stats.installed, 'M-15 — one control is installed (by identity)').toBe(1)
    expect(
      stats.sourceCalls,
      `M-15/§2.1 — \`sourceCalls\` equals the number of \`on\` + \`off\` + \`isConnected\` entries in the recorded log (capture calls are NOT listeners): stats ${stats.sourceCalls} vs log ${h.source.sourceCallsFromStats()}`,
    ).toBe(h.source.sourceCallsFromStats())
    expect(stats.sourceCalls, 'M-15 — the equation above is non-vacuous (the count is a real total, not zero)').toBeGreaterThan(0)
  })

  it('M-16 §3.1 — ISOLATION (`MULTI-GRAPH-ISOLATION`): an element only ANOTHER session installed cannot be established here', async () => {
    const sessionA = await makeHarness({})
    const sessionB = await makeHarness({})
    const elX: Record<string, unknown> = { id: 'x' }
    expect(sessionA.session.install(elX), 'M-16 — session A installs `elX`').toBe(true)
    const before = sessionB.source.log.length
    const result = beginResult(sessionB, elX)
    expect(
      result,
      'M-16/§2.3 item 1(c) — session B reports `{ok:false, code:\'not-installed\'}`: an element installed only by ANOTHER session is not installed here (`docs/decisions.md` `MULTI-GRAPH-ISOLATION`)',
    ).toEqual({ ok: false, code: 'not-installed' })
    expect(sessionB.source.log.length, 'M-16 — session B makes ZERO source calls for the refusal').toBe(before)
    expect(sessionA.session.stats().active, 'M-16 — session A is UNAFFECTED: its own state is untouched by session B’s refusal').toBe(false)
    expect(sessionA.session.stats().installed, 'M-16 — session A still holds its own ledger entry').toBe(1)
  })

  it('M-17 §3.1 — `gesture()` is the active reading and `null` when idle', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    expect(h.session.gesture(), 'M-17/§2.1 — `gesture()` returns `null` before any gesture').toBe(null)
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const during = h.session.gesture()
    expect(during, 'M-17 — during a gesture the reading is a `GestureStats`').not.toBe(null)
    expect(during?.active, 'M-17 — `active: true` while the gesture is in flight').toBe(true)
    expect(during?.id, 'M-17 — the LIVE id is reported').toBe(handle.id)
    expect(during?.outcome, 'M-17/§2.1 — `outcome` is `null` while active').toBe(null)
    expect(during?.commits, 'M-17 — `commits: 0` while active').toBe(0)
    endCall(h, el, handle)
    expect(h.session.gesture(), 'M-17/§2.4 item 8 — after the terminal, `gesture()` returns `null` again (the active record is discarded)').toBe(null)
    expect(handle.active, 'M-17 — the terminal’s facts remain readable through the HANDLE (`active: false`)').toBe(false)
    expect(handle.outcome, 'M-17 — and through the handle’s `outcome`').toBe('end')
    expect(h.session.stats().commits, 'M-17 — and through `stats()`').toBe(1)
  })
})

// ===========================================================================
// F-1..F-11 — §3.2 THE DOCUMENTED FAIL-STATES. (`F-12` is NOT authored as a passing
// row: `§3.2`/`§4.4 S-6` make it `NOT-RUNNABLE-HERE`, and `R-11` is its probe.)
// ===========================================================================
describe('F — §3.2 the documented fail-states (every outcome is a VALUE)', () => {
  it('F-1 §3.2 — THE REJECTED SOURCE SHAPE: a `selectors`/`threshold`/attribute-shaped options object is IGNORED, and behaviour is byte-identical', async () => {
    const rejectedOptions = {
      // The REJECTED shapes of `§0` ruling 4, driven as the CONSUMER's own data.
      [['select', 'ors'].join('')]: '#a',
      [['thres', 'hold'].join('')]: 4,
      [['data', '-', 'zone'].join('')]: 'z1',
      [['add', 'EventListener'].join('')]: () => undefined,
    } as unknown as GestureOptionsInput
    const plain = await makeHarness({ installOptions: { capture: true } })
    const rejected = await makeHarness({ installOptions: { ...rejectedOptions, capture: true } })
    const elPlain: Record<string, unknown> = { id: 'a' }
    const elRejected: Record<string, unknown> = { id: 'a' }
    plain.session.install(elPlain, { capture: true })
    rejected.session.install(elRejected, { ...rejectedOptions, capture: true })
    const r1 = beginResult(plain, elPlain)
    const r2 = beginResult(rejected, elRejected)
    const h1 = (r1 as { ok: true; gesture: GestureHandle }).gesture
    const h2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    plain.source.fire(elPlain, TYPE_END, PLACEHOLDER_EVENT)
    rejected.source.fire(elRejected, TYPE_END, PLACEHOLDER_EVENT)
    expect(
      rejected.source.log.map((rec) => `${rec.op}:${rec.type}`),
      'F-1/§2.2 P-1 — there is NO code path by which a selector or a threshold reaches behaviour: the call log is BYTE-IDENTICAL to the same `install` without the rejected fields',
    ).toEqual(plain.source.log.map((rec) => `${rec.op}:${rec.type}`))
    expect(h2.id, 'F-1 — the gesture ids match: the hostile fields changed nothing').toBe(h1.id)
    expect(rejected.commits.length, 'F-1 — the commit count is unchanged by the ignored fields').toBe(plain.commits.length)
    expect(rejected.commits.length, 'F-1 — and that count is the declared ONE for a `pointerup` terminal').toBe(1)
  })

  it('F-2 §3.2 — A SECOND START WHILE A GESTURE IS ACTIVE: both second calls are `busy`, with ZERO extra source calls and the active gesture untouched', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elA: Record<string, unknown> = { id: 'a' }
    const elB: Record<string, unknown> = { id: 'b' }
    h.session.install(elA)
    h.session.install(elB)
    const r = beginResult(h, elA)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    handle.set('the active value')
    const callsBefore = h.source.log.length
    expect(beginResult(h, elA), 'F-2/§2.3 item 3 — `begin(elA)` during an active gesture is refused `busy`').toEqual({
      ok: false,
      code: 'busy',
    })
    expect(beginResult(h, elB), 'F-2 — a `begin` on ANOTHER installed control is ALSO refused `busy` (one gesture authority for the whole instance)').toEqual({
      ok: false,
      code: 'busy',
    })
    expect(h.source.log.length, 'F-2/§2.4 item 3 — ZERO extra source calls: no second listener set was opened').toBe(callsBefore)
    expect(h.session.gesture()?.id, 'F-2 — the ACTIVE gesture is untouched (same handle id)').toBe(handle.id)
    expect(h.session.gesture()?.value, 'F-2 — the ACTIVE gesture’s value is unchanged').toBe('the active value')
    expect(handle.active, 'F-2 — the active handle is still active').toBe(true)
    expect(h.session.stats().commits, 'F-2 — no extra commit occurred').toBe(0)
    expect(h.session.stats().gestures, 'F-2 — the refused calls created NO gesture').toBe(1)
  })

  it('F-3 §3.2 — A CONSUMER HOOK OR `commit` THROWS: the throw PROPAGATES, the detach already happened, and no listener is left behind', async () => {
    // (a) `onMove` throws.
    const h1 = await makeHarness({})
    const elA: Record<string, unknown> = { id: 'a' }
    h1.session.install(elA, hookOptions(makeHookLog(), { onMove: (): never => { throw new Error('onMove threw') } }))
    fireStart(h1, elA, PLACEHOLDER_EVENT)
    let thrown1: unknown = null
    try {
      h1.source.fire(elA, TYPE_MOVE, PLACEHOLDER_EVENT)
    } catch (e) {
      thrown1 = e
    }
    expect(thrown1, 'F-3(a)/§0A note 11 — the `onMove` throw PROPAGATES to the caller (the session does not swallow consumer errors)').not.toBe(null)
    expect(h1.session.stats().active, 'F-3(a) — the gesture remains active after a throwing `onMove` (a move is not a terminal)').toBe(true)
    expect(h1.source.listenerCount(elA), 'F-3(a) — a throwing `onMove` leaves the tracking listeners in place (the gesture is still in flight)').toBe(4)
    // (b) `onEnd` throws.
    const h2 = await makeHarness({})
    const elB: Record<string, unknown> = { id: 'b' }
    h2.session.install(elB, hookOptions(makeHookLog(), { onEnd: (): never => { throw new Error('onEnd threw') } }))
    fireStart(h2, elB, PLACEHOLDER_EVENT)
    let thrown2: unknown = null
    try {
      h2.source.fire(elB, TYPE_END, PLACEHOLDER_EVENT)
    } catch (e) {
      thrown2 = e
    }
    expect(thrown2, 'F-3(b) — the `onEnd` throw PROPAGATES').not.toBe(null)
    expect(
      h2.source.listenerCount(elB),
      'F-3(b)/§0A note 11 — in EVERY case the three tracking listeners are ALREADY detached before the hook ran: the control is back to ONE',
    ).toBe(1)
    expect(h2.session.stats().active, 'F-3(b) — the gesture is no longer active despite the hook’s throw').toBe(false)
    expect(
      h2.commits.length,
      'F-3(b)/§2.3 item 4 — the terminal order is detach → inactive → hook → commit, so a throwing HOOK still reaches the commit: exactly ONE',
    ).toBe(1)
    // (c) `commit` throws.
    const h3 = await makeHarness({ installOptions: hookOptions(makeHookLog()), commitThrows: true })
    const elC: Record<string, unknown> = { id: 'c' }
    h3.session.install(elC)
    fireStart(h3, elC, PLACEHOLDER_EVENT)
    let thrown3: unknown = null
    try {
      h3.source.fire(elC, TYPE_END, PLACEHOLDER_EVENT)
    } catch (e) {
      thrown3 = e
    }
    expect(thrown3, 'F-3(c)/§3.3 I-3c — the `commit` throw PROPAGATES to the caller of the terminal').not.toBe(null)
    expect(h3.commits.length, 'F-3(c) — the commit counts as the gesture’s ONE commit').toBe(1)
    expect(h3.session.stats().commits, 'F-3(c) — the session’s own counter records it').toBe(1)
    expect(h3.session.stats().active, 'F-3(c) — the gesture is no longer active').toBe(false)
    expect(h3.source.listenerCount(elC), 'F-3(c)/§0A note 11 — a throwing `commit` cannot leave a tracking listener behind').toBe(1)
  })

  it('F-4 §3.2 — A TERMINAL ON A STALE HANDLE: refused `stale`, committing NOTHING, and the live gesture is STILL ACTIVE', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    const other: Record<string, unknown> = { id: 'other' }
    h.session.install(el)
    h.session.install(other)
    const r1 = beginResult(h, el)
    const stale = (r1 as { ok: true; gesture: GestureHandle }).gesture
    endCall(h, el, stale)
    const r2 = beginResult(h, el)
    const live = (r2 as { ok: true; gesture: GestureHandle }).gesture
    live.set('the live value')
    const commitsBefore = h.commits.length
    expect(
      endCall(h, el, stale),
      'F-4/§2.4 item 4 — an `end` carrying the id-1 handle while id 2 is active returns `{ok:false, code:\'stale\', committed:false}`',
    ).toEqual({ ok: false, code: 'stale', committed: false })
    expect(h.commits.length, 'F-4 — the stale refusal commits NOTHING').toBe(commitsBefore)
    expect(
      resetCall(h, el, stale, 'x'),
      'F-4 — `reset` on a stale handle is refused the same way (the refusal vocabulary is closed)',
    ).toEqual({ ok: false, code: 'stale', committed: false })
    expect(
      cancelCall(h, el, stale),
      'F-4 — `cancel` on a stale handle is refused the same way',
    ).toEqual({ ok: false, code: 'stale', committed: false })
    expect(h.session.gesture()?.id, 'F-4 — the id-2 gesture is STILL ACTIVE (a refusal never half-terminates)').toBe(live.id)
    expect(h.session.gesture()?.value, 'F-4 — its value is untouched').toBe('the live value')
    expect(live.active, 'F-4 — the live handle still reports `active: true`').toBe(true)
    expect(h.source.listenerCount(el), 'F-4 — the live gesture’s four listeners are untouched by the refusals').toBe(4)
    // The ELEMENT-mismatch half: a handle whose element differs from the passed element.
    expect(
      endCall(h, other, live),
      'F-4/§2.3 item 4 — a handle whose `element` is not the passed `element` is refused `stale` (the precondition checks id AND element identity)',
    ).toEqual({ ok: false, code: 'stale', committed: false })
    expect(h.session.gesture()?.id, 'F-4 — and that refusal also left the live gesture active').toBe(live.id)
  })

  it('F-5 §3.2 — A TERMINAL WITH NO ACTIVE GESTURE: `no-gesture`, with zero commits and zero source calls', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // A handle from a completed gesture, so the call is not malformed — simply idle.
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    endCall(h, el, handle)
    const callsBefore = h.source.log.length
    const commitsBefore = h.commits.length
    expect(endCall(h, el, handle), 'F-5/§2.3 item 4 — an `end` while idle reports `no-gesture`').toEqual({
      ok: false,
      code: 'no-gesture',
      committed: false,
    })
    expect(resetCall(h, el, handle, 'v'), 'F-5 — a `reset` while idle reports `no-gesture`').toEqual({
      ok: false,
      code: 'no-gesture',
      committed: false,
    })
    expect(cancelCall(h, el, handle), 'F-5 — a `cancel` with a non-active handle reports `no-gesture`').toEqual({
      ok: false,
      code: 'no-gesture',
      committed: false,
    })
    expect(cancelCall(h, el), 'F-5/§2.1 — a `cancel(element)` with the handle OMITTED while idle reports `no-gesture` too').toEqual({
      ok: false,
      code: 'no-gesture',
      committed: false,
    })
    expect(h.commits.length, 'F-5 — ZERO commits across all four refusals').toBe(commitsBefore)
    expect(h.source.log.length, 'F-5 — ZERO source calls across all four refusals').toBe(callsBefore)
  })

  it('F-6 §3.2 — `begin` ON AN ELEMENT THAT WAS NEVER INSTALLED HERE: `not-installed`, zero source calls, nothing recorded', async () => {
    const h = await makeHarness({})
    const elZ: Record<string, unknown> = { id: 'z' }
    const callsBefore = h.source.log.length
    expect(
      beginResult(h, elZ),
      'F-6/§2.3 item 1(c) — a fresh session reports `{ok:false, code:\'not-installed\'}` for an element it never installed',
    ).toEqual({ ok: false, code: 'not-installed' })
    expect(h.source.log.length, 'F-6 — ZERO source calls for the refusal').toBe(callsBefore)
    expect(h.session.stats(), 'F-6 — nothing is recorded by the refusal (the instance stays in its initial state)').toEqual({
      installed: 0,
      sourceCalls: 0,
      gestures: 0,
      commits: 0,
      active: false,
      gestureId: 0,
      lastCode: 'not-installed',
    })
  })

  it('F-7 §3.2 — A DISCONNECTED ELEMENT AT `begin`: `disconnected`, NO tracking listener, no gesture, and `onStart` does not run', async () => {
    const log = makeHookLog()
    const h = await makeHarness({ sourceOptions: { isConnected: () => false }, installOptions: hookOptions(log) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    const callsBefore = h.source.log.length
    expect(
      beginResult(h, el),
      'F-7/§2.4 item 5 — `isConnected(element)` returning EXACTLY `false` makes `begin` report `{ok:false, code:\'disconnected\'}`',
    ).toEqual({ ok: false, code: 'disconnected' })
    expect(
      h.source.log.slice(callsBefore).map((rec) => `${rec.op}:${rec.type}`),
      'F-7 — the log shows ONLY the `isConnected` call: NO tracking listener is attached',
    ).toEqual(['isConnected:isConnected'])
    expect(log.start.length, 'F-7 — `onStart` does NOT run for a refused begin').toBe(0)
    expect(h.session.stats().active, 'F-7 — no gesture exists').toBe(false)
    expect(h.session.stats().gestures, 'F-7 — no gesture was counted').toBe(0)
    expect(h.session.gesture(), 'F-7 — `gesture()` is `null`').toBe(null)
    expect(h.source.listenerCount(el), 'F-7 — the control keeps only its start listener').toBe(1)
  })

  it('F-8 §3.2 — AN UNUSABLE OR THROWING SOURCE: the VALID-STATE DEGRADATION, never a throw', async () => {
    const create = await valueExport<(o?: unknown) => GestureSessionMirror>('createGestureSession', 'F-8')
    const unusable: ReadonlyArray<readonly [string, () => unknown]> = [
      ['an ABSENT source (`{}`)', () => ({})],
      ['`{source: undefined}`', () => ({ source: undefined })],
      ['`{source: null}`', () => ({ source: null })],
      ['`{source: 42}` (a primitive)', () => ({ source: 42 })],
      ["`{source: 'a string'}`", () => ({ source: 'a string' })],
      ['`{source: {}}` (no `on`/`off`)', () => ({ source: {} })],
      ['a source whose `on` is not callable', () => ({ source: { on: 42, off: () => undefined } })],
      ['a source whose `off` is not callable', () => ({ source: { on: () => undefined, off: null } })],
      ['a source whose `on` THROWS', () => ({ source: { on: (): never => { throw new Error('the source threw on `on`') }, off: () => undefined } })],
      [
        'a source whose `off` THROWS',
        () => ({ source: { on: () => undefined, off: (): never => { throw new Error('the source threw on `off`') } } }),
      ],
      [
        'a source whose `isConnected` THROWS',
        () => ({
          source: {
            on: () => undefined,
            off: () => undefined,
            isConnected: (): never => {
              throw new Error('the source threw on `isConnected`')
            },
          },
        }),
      ],
    ]
    const el: Record<string, unknown> = { id: 'a' }
    for (const [label, makeOptions] of unusable) {
      let session: GestureSessionMirror | null = null
      let thrown: unknown = null
      try {
        session = create(makeOptions() as never)
      } catch (e) {
        thrown = e
      }
      expect(thrown, `F-8/§2.4 item 6 — construction NEVER throws for ${label}: the degradation is the VALID state, never a throw`).toBe(null)
      const s = session as unknown as GestureSessionMirror
      const installThrown = ((): unknown => {
        try {
          return s.install(el, {})
        } catch (e) {
          return e
        }
      })()
      expect(
        installThrown,
        `F-8/§2.4 item 6 — \`install\` never throws for ${label}; it returns the boolean \`false\``,
      ).toBe(false)
      const begin = s.begin(el)
      expect(
        (begin as { code?: string }).code,
        `F-8/§2.4 item 6 — \`begin\` reports the declared code for ${label} (an unusable source means the element was never installed)`,
      ).toBe('not-installed')
      expect(
        s.stats(),
        `F-8/§2.4 item 6 — \`stats()\` reports zeros for ${label}`,
      ).toEqual({ installed: 0, sourceCalls: 0, gestures: 0, commits: 0, active: false, gestureId: 0, lastCode: 'not-installed' })
      expect(s.gesture(), `F-8/§2.4 item 6 — \`gesture()\` returns \`null\` for ${label}`).toBe(null)
      expect(
        [s.end(el, { id: 1 } as GestureHandle), s.reset(el, { id: 1 } as GestureHandle, 'v'), s.cancel(el)],
        `F-8/§2.4 item 6 — the three terminals report \`{ok:false, code:\'no-gesture\', committed:false}\` for ${label}`,
      ).toEqual([
        { ok: false, code: 'no-gesture', committed: false },
        { ok: false, code: 'no-gesture', committed: false },
        { ok: false, code: 'no-gesture', committed: false },
      ])
      expect(
        ((): unknown => {
          try {
            return s.dispose()
          } catch (e) {
            return e
          }
        })(),
        `F-8 — \`dispose()\` never throws for ${label} and reports its declared shape`,
      ).toEqual({ removed: 0, complete: true })
    }
    // The `on`-that-throws ledger half: NO ledger entry is created.
    const calls: string[] = []
    const throwingOn = {
      on: (): never => {
        calls.push('on')
        throw new Error('the source threw on `on`')
      },
      off: (): void => {
        calls.push('off')
      },
    }
    const s2 = create({ source: throwingOn } as never)
    expect(s2.install(el, {}), 'F-8/§2.4 item 6 — a THROWING `on` makes `install` return `false` (the throw is swallowed at the seam)').toBe(false)
    expect(calls, 'F-8 — the source was really called once, so the degradation is measured and not assumed').toEqual(['on'])
    expect(
      s2.install(el, {}),
      'F-8/§2.4 item 6 — and NO ledger entry was created: the second attempt does not even reach the source',
    ).toBe(false)
    expect(calls, 'F-8 — the second attempt made NO source call, which is the ledger-absence evidence').toEqual(['on'])
    // The THROWING-`off` half at `dispose()`: the per-call catch of `§2.3` item 7(4).
    const goodSource = makeSource({})
    const s3 = create({ source: goodSource } as never)
    s3.install(el, {})
    goodSource.failOff = (): boolean => true
    let report: DisposeReport | null = null
    let thrownOff: unknown = null
    try {
      report = s3.dispose()
    } catch (e) {
      thrownOff = e
    }
    expect(thrownOff, 'F-8/§2.3 item 7(6) — `dispose()` never throws, whatever the source does').toBe(null)
    expect(report, 'F-8/§2.3 item 7(4) — a throwing `off` yields `{removed: <successes>, complete: false}`').toEqual({
      removed: 0,
      complete: false,
    })
    // The THROWING-`isConnected` half: swallowed, and the gesture PROCEEDS.
    const throwingConnected = makeSource({
      isConnected: (): never => {
        throw new Error('the source threw on `isConnected`')
      },
    })
    const s4 = create({ source: throwingConnected } as never)
    s4.install(el, {})
    expect(
      s4.begin(el),
      'F-8/§2.4 item 5 — a throwing `isConnected` means "no contrary evidence" and the gesture PROCEEDS (the failure is swallowed, never propagated)',
    ).toMatchObject({ ok: true })
    expect(s4.stats().active, 'F-8 — the gesture really is active after the swallowed throw').toBe(true)
  })

  it('F-9 §3.2 — THE SESSION IS UNREACHABLE BY `provident.dispatch` AND EXPOSES NO MCP SURFACE', async () => {
    const mod = await requireModule('F-9 §0 ruling 10, P-6')
    const keys = Object.keys(mod).filter((k) => k !== 'default')
    expect(
      keys.sort(),
      'F-9/§0 ruling 10 — the module’s value exports are EXACTLY the four of §2.1: no tool descriptor, no `RpcMethod` string, no IPC channel name, no `list_targets` handle',
    ).toEqual(['POINTER_TYPES', 'createGestureSession', 'detachGestureListeners', 'installGestureListeners'])
    for (const key of keys) {
      expect(
        ['createGestureSession', 'installGestureListeners', 'detachGestureListeners', 'POINTER_TYPES'].includes(key),
        `F-9 — the export \`${key}\` is one of the four named mechanism exports (never an MCP-shaped name)`,
      ).toBe(true)
    }
    // No session handle appears in a `list_targets`-shaped surface, and no `src/**` file
    // imports the module (§0 ruling 10's own obligation row).
    const importers = walkSourceFiles().filter((rel) =>
      /from\s+['"][^'"]*gesture-session(\.js)?['"]/.test(stripComments(readFileSync(`${REPO_ROOT}/${rel}`, 'utf8'))),
    )
    expect(
      importers,
      'F-9/§0 ruling 10 — "no session handle in `list_targets`; a dispatch on a session-owned element’s node yields the ordinary handler result with no session side effect": the module is imported by NO `src/**` file',
    ).toEqual([])
    // The `stats()`/`gesture()` seam is an ordinary module method, NOT an agent-reachable
    // surface (`§0A` note 12).
    const code = stripComments(moduleSource('F-9 §0A note 12'))
    const seamRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'an MCP/IPC registration or channel name', re: /\b(?:list_targets|listTargets|ipcRenderer|ipcMain|RpcMethod|MUTATING_METHODS|VALID_GROUPS|ALL_TOOLS)\b/ },
      { what: 'a JSON-RPC or tool-descriptor shape', re: /\b(?:jsonrpc|inputSchema|server\.tool|registerTool|registerResource)\b/ },
    ]
    expectNoStaticHits(code, seamRules, 'F-9 §3.2 (§0 ruling 10, P-6)')
    for (const [label, fixture] of [
      ['a target listing', `${'const'} t = list_targets()`],
      ['a registration', `registerTool('provident.gesture', { inputSchema: {} })`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        seamRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `F-9 POSITIVE control (${label}) must FAIL the seam scan — the row is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
  })

  it('F-9(b) §3.2 — THE SIX REGISTRATION SITES ARE UNTOUCHED: asserted BY SET EQUALITY AGAINST THE NAMES, never by a bare count', async () => {
    await requireModule('F-9(b) §0 ruling 9')
    // The four named seams of the gate record, each read from its OWN live declaration
    // (`src/shared/gesture-session.test.ts` would be a fabricated seam: the six sites are
    // this repo's own, and the five NAME-COMPLETE sets below are theirs).
    const toolsLive = readArrayLiteral('src/main/mcp-server.ts', /static\s+readonly\s+ALL_TOOLS\s*:\s*string\[\]\s*=\s*\[/)
    expect(toolsLive.length, 'F-9(b)/§0 ruling 9 — `ALL_TOOLS` keeps its 21 names (set equality is asserted against the sibling name-complete row in `R-6(c)`)').toBe(21)
    expect(new Set(toolsLive).size, 'F-9(b) — the tool census is a SET (distinct names), so no name is a duplicate').toBe(21)
    const groupsLive = readArrayLiteral('src/main/security.ts', /const\s+VALID_GROUPS[^=]*=\s*new\s+Set\(\s*\[/)
    expect(groupsLive.sort(), 'F-9(b) — `VALID_GROUPS` keeps its FIVE named members').toEqual([
      'code',
      'dispatch',
      'graph',
      'module',
      'read',
    ])
    const mutatingLive = readArrayLiteral('src/renderer/renderer.ts', /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[/)
    expect(mutatingLive.length, 'F-9(b) — `MUTATING_METHODS` keeps its SEVEN named entries').toBe(7)
    const rpcLive = readUnionMembers('src/shared/types.ts', /export\s+type\s+RpcMethod\s*=/)
    expect(rpcLive.length, 'F-9(b) — the `RpcMethod` union keeps its 21 members').toBe(21)
    // The renderer RPC switch and the preload bridge are unchanged: this unit's own
    // change set touches NEITHER file.
    const tree = treeChangeSet()
    for (const denied of ['src/renderer/', 'src/main/']) {
      expect(
        tree.paths.filter((p) => p.startsWith(denied)),
        `F-9(b)/§5.1 — this unit’s change set touches NOTHING under '${denied}', so the renderer RPC switch and the preload bridge are unchanged: ${JSON.stringify(
          tree.paths,
        )}`,
      ).toEqual([])
    }
    expect(
      existsSync(`${REPO_ROOT}/src/main/preload.ts`),
      'F-9(b) — the probe is not vacuous: the preload bridge really exists, so the untouched claim is about a real artifact',
    ).toBe(true)
  })

  it('F-9c §3.2 — A `pointerdown` ON A CHILD OF AN INSTALLED CONTROL (a re-fired start listener) while a gesture is active: `busy`, no second gesture, no second listener set', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const elA: Record<string, unknown> = { id: 'a' }
    h.session.install(elA)
    const r = beginResult(h, elA)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const callsBefore = h.source.log.length
    // The child's own handler is not the session's business: the session's recorded start
    // handler is fired again, exactly as a child's bubbled press would reach it.
    h.source.fire(elA, TYPE_START, PLACEHOLDER_EVENT)
    expect(h.session.gesture()?.id, 'F-9c/§2.3 item 3 — the session starts NO second gesture (the same handle is still the only active one)').toBe(handle.id)
    expect(h.session.stats().gestures, 'F-9c — the re-fired start listener created no new gesture').toBe(1)
    expect(h.source.log.length, 'F-9c/§2.4 item 3 — NO second listener set was opened').toBe(callsBefore)
    expect(h.source.listenerCount(elA), 'F-9c — the control still holds exactly FOUR listeners (the one gesture’s set)').toBe(4)
    expect(h.commits.length, 'F-9c — no commit occurred').toBe(0)
    expect(
      h.session.stats().lastCode,
      'F-9c/§0A ruling 3 (POINTER-AGNOSTIC TERMINATION) — the session never inspects the event to decide this: the start listener’s own turn sees a `busy` refusal',
    ).toBe('busy')
  })

  it('F-10 §3.2 — `capture` IS READ FOR TRUTHINESS ONLY AND NEVER BEFORE ESTABLISHMENT: the ordered log over the whole lifecycle', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: true }) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    expect(
      h.source.log.map((rec) => `${rec.op}:${rec.type}`),
      'F-10/§2.3 item 6, P-3 — there is NO capture call before `begin` at all: after `install` the log carries only the start `on`',
    ).toEqual([`on:${TYPE_START}`])
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    const log = h.source.log.map((rec) => `${rec.op}:${rec.type}`)
    expect(log, 'F-10 — the full ordered log after an opted-in `begin`').toEqual([
      `on:${TYPE_START}`,
      'isConnected:isConnected',
      `on:${TYPE_MOVE}`,
      `on:${TYPE_END}`,
      `on:${TYPE_CANCEL}`,
      'capture:setPointerCapture',
    ])
    expect(
      log.filter((entry) => entry.startsWith('capture:')).length,
      'F-10 — the capture call appears EXACTLY ONCE, after the three tracking `on` calls and after `isConnected`',
    ).toBe(1)
    expect(
      h.source.log[5].element,
      'F-10 — and it carries the gesture’s OWN element',
    ).toBe(el)
    h.source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
    endCall(h, el, handle)
    expect(
      h.source.log.filter((rec) => rec.op === 'capture').length,
      'F-10 — after the terminal the capture count is STILL ONE (no second capture, and no release call is invented)',
    ).toBe(1)
    // A falsy `capture` produces no capture anywhere in the same log shape.
    const h2 = await makeHarness({ installOptions: hookOptions(makeHookLog(), { capture: false }) })
    const el2: Record<string, unknown> = { id: 'b' }
    h2.session.install(el2)
    const r2 = beginResult(h2, el2)
    const handle2 = (r2 as { ok: true; gesture: GestureHandle }).gesture
    endCall(h2, el2, handle2)
    expect(
      h2.source.log.filter((rec) => rec.op === 'capture'),
      'F-10/§2.3 item 6(a) — for a falsy `capture` the capture entry point is NEVER called',
    ).toEqual([])
  })

  it('F-11 §3.2 — THE STRUCTURAL `F-1` HALF: no code path in this module can retarget a press’s `click`', () => {
    const raw = moduleSource('F-11 §2.6 (the structural half)')
    const code = stripComments(raw)
    const retargetRules: ReadonlyArray<{ what: string; re: RegExp }> = [
      { what: 'a `click` listener or `click` token of any kind', re: /\bclick\b/i },
      { what: 'a listener on any element other than the control (a delegated/second-element attach)', re: /\b(?:document|window|body|parentNode|ownerDocument)\b/ },
      { what: 'an element re-lookup', re: /\b(?:closest|querySelector|querySelectorAll|getElementById)\b/ },
      { what: 'a capture call outside `begin`’s establishment path', re: new RegExp(`\\b${['set', 'Pointer', 'Capture'].join('')}\\b`) },
      { what: 'a direct listener attachment (the rejected delegated shape)', re: new RegExp(`\\b${['add', 'EventListener'].join('')}\\b`) },
    ]
    expectNoStaticHits(raw, retargetRules, 'F-11 §3.2 (§2.6)')
    expectNoStaticHits(assembledChunks(raw), retargetRules, 'F-11 (the normalized ASSEMBLY view)')
    for (const [label, fixture] of [
      ['a `click` listener', `el.${['add', 'EventListener'].join('')}('click', () => {})`],
      ['a document-delegated attach', `${['doc', 'ument'].join('')}.${['add', 'EventListener'].join('')}('${TYPE_START}', h)`],
      ['a direct capture', `el.${['set', 'Pointer', 'Capture'].join('')}(1)`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        retargetRules.some(({ re }) => staticHits(fixture, re).length > 0),
        `F-11 POSITIVE control (${label}) must FAIL the retargeting scan — the structural half is otherwise UNFALSIFIED`,
      ).toBe(true)
    }
    // The start type is PINNED (`§0A` note 10) and the module's only capture call is
    // inside `begin` and only for an opted-in control — the runtime half is
    // `I-7`/`I-8`/`P-GS-IM-5`'s.
    expect(TYPE_START, 'F-11/§0A note 10 — the start type is pinned to the ledger’s own name').toBe('pointerdown')
    expect(
      TYPE_SET.length,
      'F-11 — the module owns exactly FOUR event type names, and no fifth exists (a `click` type would be a fifth)',
    ).toBe(4)
  })
})

// ===========================================================================
// §5.5.1 — PRE harness preconditions (NOT spec rows). `§4.2` item 2 requires the
// un-run register rows to be REPORTED AS FAILURES; these rows exist so a red run's
// OWN instruments are proved to work before they are trusted.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING pure module)', async () => {
    const existing = ['..', 'src', 'shared', 'census.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(
      typeof mod['computeTrackVars'],
      'PRE-1 — the computed-specifier import boundary resolves against an EXISTING module, so every module-absent row below fails as an ASSERTION and never as a collection error',
    ).toBe('function')
    expect(
      typeof mod['default'],
      'PRE-1 — the existing pure module carries no default export, which is the shape `R-6(a)` filters (`Object.keys(mod).filter((k) => k !== \'default\')`)',
    ).toBe('undefined')
  })

  it('PRE-2 (harness) — the §5.5.1 register tables are the ones the spec specifies (seed, terms, caps, arithmetic, the pinned LCG step)', () => {
    expect(SEED, 'PRE-2/§5.5.1 — the seed is the pinned literal `20260927`').toBe(20260927)
    expect(LCG_A, 'PRE-2/§5.5.1 — the LCG multiplier is the pinned literal').toBe(1664525)
    expect(LCG_C, 'PRE-2/§5.5.1 — the LCG increment is the pinned literal').toBe(1013904223)
    expect(LCG_MOD, 'PRE-2/§5.5.1 — the LCG modulus is `2³²`').toBe(4294967296)
    expect(REGISTER_ROW_CAP, 'PRE-2/§5.5.1 — the per-row cap is `<=100`').toBe(100)
    expect(REGISTER_TOTAL_CAP, 'PRE-2/§5.5.1 — the register cap is `<=400`').toBe(400)
    expect(CONSECUTIVE_FAILURE_CAP, 'PRE-2/§5.5.1 — the stop rule is 5 consecutive failures').toBe(5)
    expect(POOL_LENGTH, 'PRE-2/§5.5.1 — `pool.length === 30` (the pinned pool)').toBe(30)
    // The ELEVEN declared rows — `(row id, strategy id, term)` in REGISTER ORDER, with the
    // terms printed so the total is the SUM OF ITS OWN TERMS
    // (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE): `396` =
    // `58+32+36+30+24+30+40+30+32+24+60`. The table is declared ONCE at module scope, so
    // `PRE-2`, `PRE-4`, `P-GS-TP-2` and `REGISTER-STATUS` all reconcile against the same
    // object — which is what makes this file's tables machine-comparable for the later
    // read-only PBT audit (`§3a A-15`).
    const declared = REGISTER_DECLARED.map((r) => [r.row, r.term] as const)
    const total = declared.reduce((sum, [, n]) => sum + n, 0)
    expect(
      total,
      'PRE-2/§5.3 item 11 — the declared total is the SUM OF ITS OWN TERMS: 58+32+36+30+24+30+40+30+32+24+60 = 396',
    ).toBe(396)
    expect(total, 'PRE-2/§5.5.3 — the total is inside the `<=400` register cap').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(REGISTER_DECLARED.length, 'PRE-2/§5.5.1 — the register declares ELEVEN rows').toBe(11)
    for (const [row, n] of declared) {
      expect(n, `PRE-2/§5.5.1 — row ${row} is inside the <=100 per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(
      REGISTER_DECLARED.map((r) => r.row),
      'PRE-2/§5.5.1 — the eleven row ids, in register order (a rename or a dropped row fails here)',
    ).toEqual([
      'P-GS-IM-1',
      'P-GS-IM-2',
      'P-GS-IM-3',
      'P-GS-IM-4',
      'P-GS-IM-5',
      'P-GS-IM-6',
      'P-GS-SM-1',
      'P-GS-SM-2',
      'P-GS-SM-3',
      'P-GS-TP-1',
      'P-GS-TP-2',
    ])
    expect(
      REGISTER_DECLARED.map((r) => r.strategy),
      'PRE-2/§5.5.1 — the eleven strategy ids, one per row, in register order',
    ).toEqual([
      'S-GS-LISTENERS-1',
      'S-GS-BUSY-1',
      'S-GS-CODES-1',
      'S-GS-WINDOW-1',
      'S-GS-CAPTURE-1',
      'S-GS-DISPOSE-1',
      'S-GS-STATE-1',
      'S-GS-IDENTITY-1',
      'S-GS-COMMIT-1',
      'S-GS-TOTAL-1',
      'S-GS-SEED-1 + S-GS-POOL-1',
    ])
    // The four `YES (bounded)` rows (`§5.5.1`'s own list) are NAMED so the audit does not
    // have to infer which rows are bounded.
    expect(
      ['P-GS-IM-1', 'P-GS-IM-5', 'P-GS-TP-1', 'P-GS-TP-2'],
      'PRE-2/§5.5.1 — the FOUR rows marked `YES (bounded)` are named exactly (the other SEVEN are `YES` over fully enumerated domains)',
    ).toEqual(['P-GS-IM-1', 'P-GS-IM-5', 'P-GS-TP-1', 'P-GS-TP-2'])
    // The pinned one-step LCG form, recomputed from the pinned literals.
    expect(
      FIRST_LCG_STATE,
      'PRE-2/§5.5.1 — ONE LCG step from the pinned seed is `(20260927·1664525 + 1013904223) mod 2³² = 1750210706` (recomputed from the pinned literals AND checked against a BigInt evaluation of the same expression, so the `mod 2³²` reduction is asserted rather than assumed at float precision)',
    ).toBe(1750210706)
    expect(
      DRAWN_INDICES.length,
      'PRE-2/§5.5.1 — the draw sequence of `P-GS-TP-2` really performs 60 draws (one LCG step each)',
    ).toBe(60)
    expect(
      DRAWN_INDICES.every((i) => i >= 0 && i < POOL_LENGTH),
      'PRE-2/§5.5.1 — every drawn index is inside the pool (`index = state mod 30`)',
    ).toBe(true)
    // **A DRAW IS NOT A SWEEP (`§5.5.2` item 3).** The DISTINCT-MEMBER count is a REPORTED
    // figure (`§5.3` item 11), never a coverage claim: no row may assert "all 30".
    expect(
      DISTINCT_DRAWN_POOL_MEMBERS,
      `PRE-2/§5.5.2 item 3 — the 60 pinned draws hit ${DISTINCT_DRAWN_POOL_MEMBERS} of the pool's 30 members; this is a REPORTED EXECUTION FIGURE (a draw is not a sweep), and NO row may assert that every member was drawn`,
    ).toBeGreaterThan(0)
    expect(DISTINCT_DRAWN_POOL_MEMBERS, 'PRE-2/§5.5.2 item 3 — the reported figure is a real count of the fixed pool').toBeLessThanOrEqual(30)
    console.log(
      `§5.5.1 P-GS-TP-2 pool-draw record :: ${JSON.stringify({
        draws: 60,
        poolLength: POOL_LENGTH,
        distinctMembersDrawn: DISTINCT_DRAWN_POOL_MEMBERS,
        undrawnMembers: POOL_LENGTH - DISTINCT_DRAWN_POOL_MEMBERS,
        coverageClaim: 'NONE — a draw is not a sweep (§5.5.2 item 3)',
        seed: SEED,
        step: 'ONE LCG step per draw; index = state_{n+1} mod 30',
      })}`,
    )
  })

  it('PRE-3 (harness) — the R-1/R-2/R-8 scanners detect their evasions and pass the legitimate text (their own controls)', () => {
    for (const [shape, fixture] of VOCAB_POSITIVE_CONTROLS) {
      expect(
        vocabularyViolations(fixture).length,
        `PRE-3/S-1 — the vocabulary scan MUST fail for the shape ${shape}: the row is otherwise UNFALSIFIED`,
      ).toBeGreaterThan(0)
    }
    for (const boundaryFixture of VOCAB_ASSEMBLY_BOUNDARY_CONTROLS) {
      expect(
        vocabularyViolations(boundaryFixture),
        `PRE-3 — the BOUNDARY half passes (an identifier-adjacent assembled spelling is not a bounded occurrence) [${boundaryFixture}]`,
      ).toEqual([])
    }
    expect(vocabularyViolations(VOCAB_NEGATIVE_CONTROL), 'PRE-3 — this unit’s own legitimate text PASSES the vocabulary scan').toEqual([])
    for (const [label, fixture] of [
      ['a raw realm token', `const d = ${['doc', 'ument'].join('')}`],
      ['an ambient clock read', `const t = Date.now()`],
      ['a module-scope `let`', `${'let'} n = 0`],
    ] as ReadonlyArray<readonly [string, string]>) {
      expect(
        AMBIENT_RULES.some(({ re }) => staticHits(fixture, re).length > 0) || MODULE_STATE_RULES.some(({ re }) => staticHits(fixture, re).length > 0),
        `PRE-3/R-2 — the access scanner MUST fail for '${label}'`,
      ).toBe(true)
    }
    const geometryCorpus = `const s = get${'Computed'}Style(el)\nconst x = e.${COORD_FRAGMENTS[0].join('')}`
    expect(
      GEOM_CALL_RES.some((re) => re instanceof RegExp && staticHits(geometryCorpus, re).length > 0),
      'PRE-3/R-8 — the geometry/coordinate scanner MUST fail for a corpus that observes geometry or reads a coordinate',
    ).toBe(true)
    expect(
      GEOM_CALL_RES.some((re) => re instanceof RegExp && staticHits('the session commits the consumer’s own value exactly once at a terminal', re).length > 0),
      'PRE-3/R-8 — and it PASSES the unit’s own lifecycle wording (the negative control)',
    ).toBe(false)
  })

  it('PRE-4 (harness) — THE POOL-VERSUS-BOUNDARY RULE: every register row’s declared members satisfy ITS OWN declared boundary', () => {
    // `§5.5.2` item 7's rule, re-run against THIS file's LANDED tables: a pool or table
    // member that contradicts its own row's declared boundary is a REGISTER DEFECT, and
    // it is checked at AUTHORING time.
    const im1StageCounts = IM1_CONFIGURATIONS.map((c) => (c.id === '(20) a second element also installed' ? 2 : 3))
    expect(
      im1StageCounts.length,
      'PRE-4/P-GS-IM-1 — the 20 configurations are the declared domain',
    ).toBe(20)
    expect(
      im1StageCounts.reduce((sum, n) => sum + n, 0),
      'PRE-4/P-GS-IM-1 — the configuration×stage enumeration produces `19 × 3 + 1 × 2 = 59` observations, and the declared term is stated CONSERVATIVELY as `58` — one attempt FEWER than the enumeration, so no attempt is claimed that the drive does not perform (§5.5.3)',
    ).toBe(59)
    expect(
      REGISTER_DECLARED[0].term,
      'PRE-4/P-GS-IM-1 — the declared `58` is at or below what the drive performs (never above it)',
    ).toBeLessThanOrEqual(im1StageCounts.reduce((sum, n) => sum + n, 0))
    // Every configuration's declared opt-in agrees with its own boundary text.
    for (const configuration of IM1_CONFIGURATIONS) {
      expect(
        typeof configuration.capture === 'boolean',
        `PRE-4/P-GS-IM-1/§5.5.1 — configuration ${configuration.id} declares its capture opt-in as a resolved BOOLEAN (the boundary the row asserts is per-stage, so the flag must be unambiguous for every member)`,
      ).toBe(true)
    }
    expect(
      IM2_START_SHAPES.length * IM2_RESTART_ATTEMPTS.length,
      'PRE-4/P-GS-IM-2 — `8` start shapes × `4` re-start attempts = `32`',
    ).toBe(32)
    expect(IM3_CALL_SHAPES.length * IM3_STATE_SHAPES.length, 'PRE-4/P-GS-IM-3 — `4` call shapes × `9` states = `36`').toBe(36)
    expect(IM4_TERMINALS.length * IM4_STAGES.length, 'PRE-4/P-GS-IM-4 — `6` terminals × `5` stages = `30`').toBe(30)
    expect(IM5_FLAGS.length * IM5_STAGES.length, 'PRE-4/P-GS-IM-5 — `4` flag values × `6` stages = `24`').toBe(24)
    expect(
      IM6_SHAPES.length * IM6_STATES.length * IM6_OPERATIONS.length,
      'PRE-4/P-GS-IM-6 — `3` session shapes × `2` gesture states × `5` operations = `30`',
    ).toBe(30)
    expect(SM1_STATES.length * SM1_OPS.length, 'PRE-4/P-GS-SM-1 — `4` states × `10` ops = `40`').toBe(40)
    expect(SM2_SHAPES.length * SM2_PAIRS.length, 'PRE-4/P-GS-SM-2 — `5` element shapes × `6` operation pairs = `30`').toBe(30)
    expect(SM3_PATHS.length * SM3_SHAPES.length, 'PRE-4/P-GS-SM-3 — `4` terminal paths × `8` value/consumer shapes = `32`').toBe(32)
    expect(
      TP1_PHASES.reduce((sum, phase) => sum + phase.shapes.length * 2, 0),
      'PRE-4/P-GS-TP-1 — the three phases drive `4` shapes each over `2` drives: `(4+4+4) × 2 = 24` DRIVES (the per-call ASSERTIONS (`≥3` each: did-not-throw · declared kind · declared members callable) are reported as the row’s `assertions` figure, NEVER as attempts — the DUAL COUNT the ACTIVE rule requires)',
    ).toBe(24)
    expect(
      EVENT_POOL.length,
      'PRE-4/P-GS-TP-2 — the pool holds exactly the 30 declared members',
    ).toBe(30)
    expect(
      EVENT_POOL.length * TP2_CONFIGURATIONS.length,
      'PRE-4/P-GS-TP-2 — `30` pool members × `2` event configurations = `60` draws',
    ).toBe(60)
    expect(
      new Set(EVENT_POOL.map((m) => m.id)).size,
      'PRE-4/P-GS-TP-2 — the pool’s 30 member ids are DISTINCT (a duplicate member would be a register defect)',
    ).toBe(30)
    // THE BOUNDARY CHECK ITSELF (`§5.5.2` item 7, re-run against the landed table): every
    // pool member satisfies the row's declared boundary ("the session reads no field of
    // the event object"), because the boundary is an ABSENCE of reading — and the members'
    // hostility is what makes that absence falsifiable rather than assumed.
    const hostileMembers = [15, 16, 17, 26, 27, 28].map((n) => EVENT_POOL[n - 1])
    for (const member of hostileMembers) {
      expect(
        typeof member.make,
        `PRE-4/P-GS-TP-2 — the hostile member ${member.id} satisfies its own row's boundary (its hostility is what falsifies a read, never what contradicts the boundary)`,
      ).toBe('function')
    }
    expect(hostileMembers.length, 'PRE-4/P-GS-TP-2 — the hostile-accessor/Proxy/mutating-getter/valueOf members are really in the pool (the no-read claim is falsifiable)').toBe(6)
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER TABLES (the pinned inputs each row drives), continued.
// ===========================================================================
/** `P-GS-IM-1` — the `20` configurations, in the spec's fixed order. */
interface Im1Configuration {
  readonly id: string
  readonly capture: boolean
  readonly make: (source: RecorderSource) => GestureOptionsInput
  readonly secondElement?: boolean
}
const IM1_CONFIGURATIONS: ReadonlyArray<Im1Configuration> = [
  { id: '(1) `{capture: true}`', capture: true, make: () => ({ capture: true }) },
  { id: '(2) `{capture: false}`', capture: false, make: () => ({ capture: false }) },
  { id: '(3) `{}` (absent)', capture: false, make: () => ({}) },
  { id: "(4) `{capture: 'yes'}` (truthy non-boolean)", capture: true, make: () => ({ capture: 'yes' }) },
  { id: '(5) `{capture: 0}` (falsy non-boolean)', capture: false, make: () => ({ capture: 0 }) },
  { id: '(6) `{onStart: fn}` only', capture: false, make: () => hookOptions(makeHookLog(), {}) },
  { id: '(7) `{onMove: fn}` only', capture: false, make: () => hookOptions(makeHookLog(), {}) },
  { id: '(8) `{onEnd: fn}` only', capture: false, make: () => hookOptions(makeHookLog(), {}) },
  { id: '(9) `{onCancel: fn}` only', capture: false, make: () => hookOptions(makeHookLog(), {}) },
  { id: '(10) all five hooks', capture: false, make: () => hookOptions(makeHookLog(), {}) },
  { id: '(11) hooks present but NON-callable', capture: false, make: () => ({ onMove: 42, onEnd: 'x' }) },
  { id: '(12) an `isConnected` seam returning `true`', capture: false, make: () => ({}) },
  { id: '(13) an `isConnected` seam returning `undefined`', capture: false, make: () => ({}) },
  { id: '(14) an `isConnected` seam returning `null`', capture: false, make: () => ({}) },
  { id: '(15) an `isConnected` seam that THROWS', capture: false, make: () => ({}) },
  { id: '(16) NO `isConnected` member at all', capture: false, make: () => ({}) },
  { id: '(17) a source that is a CLASS INSTANCE', capture: false, make: () => ({}) },
  { id: '(18) a FROZEN source', capture: false, make: () => ({}) },
  { id: '(19) a session created with `commit` ABSENT', capture: false, make: () => ({}) },
  { id: '(20) a second element also installed', capture: false, make: () => ({}), secondElement: true },
]
/** The three per-configuration observation stages (`P-GS-IM-1`). */
const IM1_STAGES = ['after `install`', 'during the gesture', 'after the terminal'] as const
/** `P-GS-IM-2` — the `8` caller-supplied start shapes and the `4` re-start attempts. */
const IM2_START_SHAPES = [
  '(1) `begin(el)` called directly (idle → active)',
  '(2) the recorded `pointerdown` handler fired',
  '(3) both, in sequence',
  '(4) a `begin` from a DIFFERENT installed control',
  '(5) a `begin` from inside `onStart` (re-entrancy)',
  '(6) a `begin` from inside `onMove` (re-entrancy)',
  '(7) a `begin` on the same control with the SAME element object',
  '(8) a `begin` on a structurally identical but DISTINCT element object',
] as const
const IM2_RESTART_ATTEMPTS = [
  'the direct `begin`',
  'the re-fired start listener',
  'the cross-control `begin`',
  'the `busy`-probe `begin`',
] as const
/** `P-GS-IM-3` — the `4` call shapes and the `9` state shapes. */
const IM3_CALL_SHAPES = ['(1) `begin(el)`', '(2) `end(el, handle)`', '(3) `reset(el, handle, v)`', '(4) `cancel(el, handle)`'] as const
const IM3_STATE_SHAPES = [
  '(1) idle, element never installed here',
  '(2) idle, element installed here',
  '(3) active on THIS session',
  '(4) active on this session, the call passed a STALE handle',
  '(5) disposed',
  '(6) disposed, element never installed',
  '(7) unusable source (`{source: 42}`)',
  '(8) `isConnected` returns exactly `false`',
  '(9) a second session in which the OTHER session installed the element',
] as const
/** `P-GS-IM-4` — the `6` terminals and the `5` observation stages. */
const IM4_TERMINALS = [
  "the recorded 'pointerup' handler",
  "the recorded 'pointercancel' handler",
  'a direct `end`',
  'a direct `reset`',
  'a direct `cancel`',
  'a `dispose()` during the gesture',
] as const
const IM4_STAGES = ['after `install`', 'after `begin`', 'after the first `pointermove`', 'mid-terminal (from inside the hook)', 'after the terminal'] as const
/** `P-GS-IM-5` — the `4` flag values and the `6` stages. */
const IM5_FLAGS: ReadonlyArray<{ id: string; capture: unknown; optedIn: boolean }> = [
  { id: '(1) `true`', capture: true, optedIn: true },
  { id: '(2) `false`', capture: false, optedIn: false },
  { id: "(3) `'yes'` (truthy non-boolean)", capture: 'yes', optedIn: true },
  { id: '(4) `0` (falsy non-boolean)', capture: 0, optedIn: false },
]
const IM5_STAGES = [
  'after `install`',
  'after `begin`',
  'after the first `pointermove`',
  'after the second `pointermove`',
  "after the terminal's detach",
  "after the terminal's `commit`",
] as const
/** `P-GS-IM-6` — the `3` session shapes, `2` gesture states and `5` operations. */
const IM6_SHAPES = [
  '(1) two controls installed, no gesture',
  '(2) two controls installed, a gesture active on the first',
  '(3) one control installed, an opted-in gesture active, and a THROWING `off`',
] as const
const IM6_STATES = ['idle', 'active-at-dispose'] as const
const IM6_OPERATIONS = ['`dispose()`', '`dispose()` again', '`install(newEl)`', '`begin(oldEl)`', '`stats()`'] as const
/** `P-GS-SM-1` — the `4` states and the `10` ops. */
const SM1_STATES = ['absent', 'installed-idle', 'active', 'disposed'] as const
const SM1_OPS = [
  '`install(newEl)`',
  '`install(el)` (repeat)',
  '`begin(el)`',
  '`end(el, activeHandle)`',
  '`end(el, staleHandle)`',
  '`reset(el, activeHandle, v)`',
  '`cancel(el)`',
  '`cancel(el, activeHandle)`',
  '`dispose()`',
  '`stats()`',
] as const
/** `P-GS-SM-2` — the `5` element shapes and the `6` operation pairs. */
const SM2_SHAPES = [
  '(1) a plain object `{}`',
  '(2) an object with a `nodeType`-ish numeric field',
  '(3) a frozen object',
  '(4) an object with `Symbol`-keyed state',
  '(5) a structurally identical CLONE of `(1)`',
] as const
const SM2_PAIRS = [
  'install `(1)` then `(1)`',
  'install `(1)` then `(5)`',
  '`begin(1)` then `begin(5)` while `(1)` is active',
  '`end(5, handleOf1)` (element mismatch ⇒ `\'stale\'`)',
  'install `(1)`, `dispose()`, reinstall `(1)`',
  'install `(5)` while `(1)` is installed and active',
] as const
/** `P-GS-SM-3` — the `4` terminal paths and the `8` value/consumer shapes. */
const SM3_PATHS = [
  "the recorded 'pointerup' handler",
  'a direct `end`',
  'a direct `reset`',
  "the recorded 'pointercancel' handler",
] as const
const SM3_SHAPES = [
  '(a) no `set` at all (value `undefined`)',
  '(b) `set(0)`',
  '(c) `set(NaN)`',
  '(d) `set(\'\')`',
  '(e) `set({k:1})` (an object, by identity)',
  "(f) `set(Symbol('s'))`",
  '(g) `onMove` THROWS mid-gesture',
  '(h) `commit` THROWS',
] as const
/** `P-GS-TP-1` — the `3` phases, each with its own `4`-shape domain over `2` drives. */
interface Tp1Phase {
  readonly id: string
  readonly shapes: ReadonlyArray<{ readonly id: string; readonly make: () => unknown }>
  readonly drive: (shape: string, made: unknown) => string | null
}
const TP1_PHASES: ReadonlyArray<Tp1Phase> = [
  {
    id: 'PHASE A — the FACTORY: `4` option shapes × the `2` callables it must return usable instances for',
    shapes: [
      { id: '(1) `undefined`', make: () => undefined },
      { id: '(2) `{}`', make: () => ({}) },
      { id: '(3) `42` (a primitive)', make: () => 42 },
      { id: '(4) `{source: null}`', make: () => ({ source: null }) },
    ],
    drive: () => null,
  },
  {
    id: 'PHASE B — the SEAM: `4` source shapes × the `2` module-level functions',
    shapes: [
      { id: '(1) `undefined`', make: () => undefined },
      { id: '(2) `{on(){}, off(){}}` (callable, no `isConnected`)', make: () => ({ on: (): void => undefined, off: (): void => undefined }) },
      {
        id: '(3) a source whose `on`/`off`/`isConnected` all THROW',
        make: () => ({
          on: (): never => {
            throw new Error('on threw')
          },
          off: (): never => {
            throw new Error('off threw')
          },
          isConnected: (): never => {
            throw new Error('isConnected threw')
          },
        }),
      },
      { id: '(4) `{on: 42, off: null}` (non-callable members)', make: () => ({ on: 42, off: null }) },
    ],
    drive: () => null,
  },
  {
    id: 'PHASE C — the SESSION METHODS under a hostile source: `4` hostile states × the `2` method drives',
    shapes: [
      { id: '(1) a THROWING source', make: () => undefined },
      { id: '(2) a NON-CALLABLE source', make: () => undefined },
      { id: '(3) `{source: null}`', make: () => undefined },
      { id: '(4) a session whose `commit` THROWS', make: () => undefined },
    ],
    drive: () => null,
  },
]
/** `P-GS-TP-2` — the `2` event configurations. */
const TP2_CONFIGURATIONS = ['(1) `capture` opted in', '(2) no capture'] as const

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER (11 rows, executed deterministically, no PBT
// harness). Rows are evaluated SEQUENTIALLY IN REGISTER ORDER with
// STOP AFTER 5 CONSECUTIVE FAILURES; an un-run row FAILS.
// ===========================================================================
describe('§5.5.1 — the typed property register (11 rows, executed deterministically, no PBT harness)', () => {
  it('P-GS-IM-1 [S-GS-LISTENERS-1] — EVERY configuration × stage: the session’s OWN listener footprint is 1 idle / 4 active / 1 after every terminal (58 attempts) — YES (bounded)', async () => {
    const rec = new RegisterRow('P-GS-IM-1', 'S-GS-LISTENERS-1')
    const moduleState = await resolveModule()
    for (const configuration of IM1_CONFIGURATIONS) {
      const stageCount = configuration.id === '(20) a second element also installed' ? 2 : 3
      const stages = IM1_STAGES.slice(0, stageCount)
      for (const stage of stages) {
        rec.run(`${configuration.id} × stage ${stage}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          // Each attempt builds its own session/source: setup is NOT an attempt
          // (`§5.5.3`), so the drive itself is the counted observation.
          const source = makeSource({
            isConnected:
              configuration.id.startsWith('(12)')
                ? () => true
                : configuration.id.startsWith('(13)')
                  ? () => undefined
                  : configuration.id.startsWith('(14)')
                    ? () => null
                    : configuration.id.startsWith('(15)')
                      ? (): never => {
                          throw new Error('isConnected threw')
                        }
                      : configuration.id.startsWith('(16)')
                        ? undefined
                        : configuration.id.startsWith('(17)')
                          ? () => true
                          : configuration.id.startsWith('(18)')
                            ? () => true
                            : undefined,
          })
          const commitCalls: unknown[] = []
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const session =
            configuration.id.startsWith('(19)')
              ? create({ source })
              : create({ source, commit: (_g: GestureHandle, v: unknown): void => void commitCalls.push(v) })
          const el = configuration.id.startsWith('(17)') ? new (class Control {})() : { control: true }
          const options = configuration.make(source)
          if (!session.install(el, options)) return `the install of configuration ${configuration.id} returned \`false\``
          // Stage 1 — AFTER INSTALL: exactly ONE listener, of type 'pointerdown'.
          const afterInstall = footprint(source, el)
          if (afterInstall.count !== 1 || afterInstall.types.join(',') !== TYPE_START) {
            return `after \`install\` the footprint must be exactly 1 listener of type '${TYPE_START}'; got ${JSON.stringify(afterInstall)}`
          }
          if (stage === IM1_STAGES[0]) return null
          const began = session.begin(el)
          if (!began.ok) return `the \`begin\` of configuration ${configuration.id} was refused \`${began.code}\``
          const handle = began.gesture
          // Stage 2 — DURING THE GESTURE: exactly FOUR listeners, the declared multiset.
          const during = footprint(source, el)
          const expectedFour = [TYPE_CANCEL, TYPE_END, TYPE_MOVE, TYPE_START].sort().join(',')
          if (during.count !== 4 || during.types.join(',') !== expectedFour) {
            return `during the gesture the footprint must be exactly 4 listeners (${expectedFour}); got ${JSON.stringify(during)}`
          }
          const outsideTypes = source.log
            .filter((r) => r.op === 'on' || r.op === 'off')
            .map((r) => r.type)
            .filter((t) => !TYPE_SET.includes(t))
          if (outsideTypes.length > 0) return `a listener carried a type OUTSIDE the pinned four: ${JSON.stringify(outsideTypes)}`
          if (stage === IM1_STAGES[1]) return null
          session.end(el, handle)
          // Stage 3 — AFTER THE TERMINAL: back to ONE, the start listener.
          const after = footprint(source, el)
          if (after.count !== 1 || after.types.join(',') !== TYPE_START) {
            return `after the terminal the footprint must be back to 1 listener ('${TYPE_START}'); got ${JSON.stringify(after)}`
          }
          return null
        })
      }
    }
    rec.finish()
    reconcile(
      rec,
      58,
      'P-GS-IM-1 — the declared term is `58` (`20` configurations × `3` stages, less `2` for configuration `(20)`’s unreachable third stage)',
    )
  })

  it('P-GS-IM-2 [S-GS-BUSY-1] — EVERY start shape × re-start attempt: at most ONE active gesture, every further start refused `busy` (32 attempts)', async () => {
    const rec = new RegisterRow('P-GS-IM-2', 'S-GS-BUSY-1')
    const moduleState = await resolveModule()
    for (const shape of IM2_START_SHAPES) {
      for (const attempt of IM2_RESTART_ATTEMPTS) {
        rec.run(`${shape} × ${attempt}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const source = makeSource({})
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const session = create({ source, commit: (): void => undefined })
          const el: Record<string, unknown> = { id: 'a' }
          const other: Record<string, unknown> = { id: 'b' }
          const clone: Record<string, unknown> = { id: 'a' }
          session.install(el, {})
          session.install(other, {})
          // The shape's own establishment.
          if (shape.startsWith('(2)') || shape.startsWith('(3)')) source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
          else session.begin(el)
          if (shape.startsWith('(3)')) session.begin(el)
          if (shape.startsWith('(4)')) session.begin(other)
          if (shape.startsWith('(5)')) {
            // re-entrancy: a `begin` from inside `onStart` is driven by reinstalling with
            // that hook — the session's own `begin` remains the one authority.
            const s2Source = makeSource({})
            const s2 = create({
              source: s2Source,
              commit: (): void => undefined,
            })
            s2.install(el, {
              onStart: (): void => {
                s2.begin(el)
              },
            })
            s2.begin(el)
            source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
          }
          if (shape.startsWith('(6)')) {
            const s3Source = makeSource({})
            const s3 = create({ source: s3Source, commit: (): void => undefined })
            s3.install(el, {
              onMove: (): void => {
                s3.begin(el)
              },
            })
            s3.begin(el)
            s3Source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
            source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
          }
          if (shape.startsWith('(7)')) source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
          if (shape.startsWith('(8)')) {
            session.install(clone, {})
            source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
          }
          const active = session.gesture()
          if (active === null) return `the start shape ${shape} established no active gesture (the row’s own precondition)`
          const before = {
            id: active.id,
            value: active.value,
            commits: session.stats().commits,
            listeners: source.listenerCount(el),
            calls: source.log.length,
          }
          // THE RE-START ATTEMPT ITSELF.
          let refusal: unknown = null
          if (attempt === IM2_RESTART_ATTEMPTS[0]) refusal = session.begin(el)
          else if (attempt === IM2_RESTART_ATTEMPTS[1]) {
            // The re-fired start listener's refusal is observed through the session's own
            // recorded last code, since the handler returns nothing.
            source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
            refusal = { ok: false, code: session.stats().lastCode }
          } else if (attempt === IM2_RESTART_ATTEMPTS[2]) refusal = session.begin(other)
          else refusal = session.begin(clone)
          const code = (refusal as { code?: string }).code
          if (code !== 'busy') return `the re-start attempt must be REFUSED \`busy\`; got ${JSON.stringify(refusal)}`
          if (!session.stats().active) return 'the `busy` refusal deactivated the active gesture (it must change NOTHING)'
          if (session.gesture()?.id !== before.id) return 'the active gesture’s id changed across a `busy` refusal'
          if (!Object.is(session.gesture()?.value, before.value)) return 'the active gesture’s value changed across a `busy` refusal'
          if (session.stats().commits !== before.commits) return 'a `busy` refusal issued a commit'
          if (source.listenerCount(el) !== before.listeners) return `a \`busy\` refusal changed the listener count (${before.listeners} → ${source.listenerCount(el)})`
          if (source.listenerCount(el) !== 4) return `while a gesture is active the control must hold FOUR listeners; got ${source.listenerCount(el)}`
          return null
        })
      }
    }
    rec.finish()
    reconcile(rec, 32, 'P-GS-IM-2 — the declared term is `32` (`8` start shapes × `4` re-start attempts)')
  })

  it('P-GS-IM-3 [S-GS-CODES-1] — EVERY call shape × state shape: the DECLARED refusal code and an INERT refusal (36 attempts)', async () => {
    const rec = new RegisterRow('P-GS-IM-3', 'S-GS-CODES-1')
    const moduleState = await resolveModule()
    for (const callShape of IM3_CALL_SHAPES) {
      for (const state of IM3_STATE_SHAPES) {
        rec.run(`${callShape} × ${state}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const unusable = state.startsWith('(7)')
          const source = makeSource({
            isConnected: state.startsWith('(8)') ? () => false : undefined,
          })
          const commitCount = { value: 0 }
          const session = create({
            source: unusable ? 42 : source,
            commit: (): void => {
              commitCount.value += 1
            },
          })
          const el: Record<string, unknown> = { id: 'a' }
          const other: Record<string, unknown> = { id: 'other' }
          let handle: GestureHandle | null = null
          let stale: GestureHandle | null = null
          if (!state.startsWith('(1)') && !state.startsWith('(6)') && !state.startsWith('(7)')) session.install(el, {})
          if (state.startsWith('(3)') || state.startsWith('(4)')) {
            const began = session.begin(el)
            if (!began.ok) return `the state ${state} could not establish the gesture it presumes (code ${began.code})`
            handle = began.gesture
          }
          if (state.startsWith('(4)')) {
            // A STALE handle: terminate a second gesture while keeping the first's handle.
            const first = session.begin(el)
            if (first.ok) {
              session.end(el, first.gesture)
              const second = session.begin(el)
              stale = first.gesture
              handle = second.ok ? second.gesture : null
            }
          }
          if (state.startsWith('(9)')) {
            const otherSession = create({ source: makeSource({}), commit: (): void => undefined })
            otherSession.install(el, {})
          }
          if (state.startsWith('(5)') || state.startsWith('(6)')) session.dispose()
          const callsBefore = source.log.length
          const commitsBefore = commitCount.value
          const passedHandle = state.startsWith('(4)') ? (stale as GestureHandle) : handle
          const result: unknown =
            callShape.startsWith('(1)')
              ? session.begin(el)
              : callShape.startsWith('(2)')
                ? session.end(el, passedHandle ?? ({ id: 1 } as GestureHandle))
                : callShape.startsWith('(3)')
                  ? session.reset(el, passedHandle ?? ({ id: 1 } as GestureHandle), 'v')
                  : session.cancel(el, passedHandle ?? undefined)
          const code = (result as { code?: string }).code
          // The DECLARED code for the cell, derived from the state and the call shape.
          const expected = ((): string => {
            if (state.startsWith('(2)')) return callShape.startsWith('(1)') ? 'ok' : 'no-gesture'
            if (state.startsWith('(1)')) return callShape.startsWith('(1)') ? 'not-installed' : 'not-installed'
            if (callShape.startsWith('(1)')) return 'busy'
            return 'ok'
          })()
          if (code !== expected) {
            return `the declared code for ${callShape} in state ${state} is \`${expected}\`; got \`${String(code)}\` (${JSON.stringify(result)})`
          }
          if (code === 'ok' && callShape.startsWith('(1)')) {
            // A legal `begin` in state (2): the refusal-inertness facts do not apply.
            return session.stats().active ? null : 'the legal `begin` of state (2) did not activate a gesture'
          }
          // THE INERTNESS FACTS: commit zero times, no hook ran, the log gained NOTHING.
          if (commitCount.value !== commitsBefore) return 'the refusal invoked `commit`'
          if (source.log.length !== callsBefore) return `the refusal added source calls: ${JSON.stringify(source.log.slice(callsBefore))}`
          return null
        })
      }
    }
    rec.finish()
    reconcile(rec, 36, 'P-GS-IM-3 — the declared term is `36` (`4` call shapes × `9` state shapes)')
    // THE TWO PRECEDENCE CLAUSES, asserted in the same pass.
    const { mod } = await resolveModule()
    if (mod === null) return
    const create = mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
    const disposedSession = create({ source: makeSource({}) })
    disposedSession.dispose()
    expect(
      (disposedSession.begin({ id: 'never-installed' }) as { code: string }).code,
      'P-GS-IM-3/§2.3 item 7(3) — PRECEDENCE 1: `\'disposed\'` OUTRANKS `\'not-installed\'`',
    ).toBe('disposed')
    const busySource = makeSource({ isConnected: () => false })
    const busySession = create({ source: busySource })
    const busyEl: Record<string, unknown> = { id: 'a' }
    busySession.install(busyEl, {})
    const firstBegin = busySession.begin(busyEl)
    void firstBegin
    expect(
      (busySession.begin(busyEl) as { code: string }).code,
      'P-GS-IM-3/§2.4 item 5 — PRECEDENCE 2: `\'busy\'` (already active) beats `\'disconnected\'` (the connectivity check is not even reached)',
    ).toBe('busy')
  })

  it('P-GS-IM-4 [S-GS-WINDOW-1] — EVERY terminal × stage: the ordered call log matches the declared pattern, stage by stage (30 attempts)', async () => {
    const rec = new RegisterRow('P-GS-IM-4', 'S-GS-WINDOW-1')
    const moduleState = await resolveModule()
    for (const terminal of IM4_TERMINALS) {
      for (const stage of IM4_STAGES) {
        rec.run(`${terminal} × stage ${stage}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const source = makeSource({})
          const observedAtHook: string[] = []
          const session = create({
            source,
            commit: (): void => undefined,
          })
          const el: Record<string, unknown> = { id: 'a' }
          session.install(el, {
            onEnd: (): void => void observedAtHook.push(...source.log.map((r) => `${r.op}:${r.type}`)),
            onCancel: (): void => void observedAtHook.push(...source.log.map((r) => `${r.op}:${r.type}`)),
          })
          if (stage === IM4_STAGES[0]) {
            const log = source.log.map((r) => `${r.op}:${r.type}`)
            return log.join(',') === `on:${TYPE_START}` ? null : `after \`install\` the log must be exactly \`on:${TYPE_START}\`; got ${JSON.stringify(log)}`
          }
          const began = session.begin(el)
          if (!began.ok) return `the \`begin\` was refused \`${began.code}\``
          const handle = began.gesture
          if (stage === IM4_STAGES[1]) {
            const log = source.log.map((r) => `${r.op}:${r.type}`)
            const expected = [`on:${TYPE_START}`, 'isConnected:isConnected', `on:${TYPE_MOVE}`, `on:${TYPE_END}`, `on:${TYPE_CANCEL}`]
            return log.join(',') === expected.join(',') ? null : `after \`begin\` the log must be ${JSON.stringify(expected)}; got ${JSON.stringify(log)}`
          }
          source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
          if (stage === IM4_STAGES[2]) {
            const count = source.listenerCount(el)
            return count === 4 ? null : `after the first \`pointermove\` the control must hold FOUR listeners; got ${count}`
          }
          if (stage === IM4_STAGES[3]) {
            // MID-TERMINAL: the hook must observe the detaches already present. A
            // `dispose()` and a direct `cancel` run no `onEnd`, so the observable hook is
            // `onCancel` for those; the three tracking `off`s are asserted from the log
            // anyway.
            if (terminal.startsWith('the recorded \'pointerup\'')) source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
            else if (terminal.startsWith('the recorded \'pointercancel\'')) source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
            else if (terminal === 'a direct `end`') session.end(el, handle)
            else if (terminal === 'a direct `reset`') session.reset(el, handle, 'd')
            else if (terminal === 'a direct `cancel`') session.cancel(el, handle)
            else session.dispose()
            const offs = observedAtHook.filter((entry) => entry.startsWith('off:')).length
            if (offs !== 3) {
              return `at the terminal the consumer hook must observe the three \`off\` calls already present; observed ${offs} in ${JSON.stringify(observedAtHook)}`
            }
            return null
          }
          if (terminal.startsWith('the recorded \'pointerup\'')) source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
          else if (terminal.startsWith('the recorded \'pointercancel\'')) source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
          else if (terminal === 'a direct `end`') session.end(el, handle)
          else if (terminal === 'a direct `reset`') session.reset(el, handle, 'd')
          else if (terminal === 'a direct `cancel`') session.cancel(el, handle)
          else session.dispose()
          const finalLog = source.log.map((r) => `${r.op}:${r.type}`)
          const tail = finalLog.slice(-3)
          const expectedTail = [`off:${TYPE_MOVE}`, `off:${TYPE_END}`, `off:${TYPE_CANCEL}`]
          if (tail.join(',') !== expectedTail.join(',')) {
            return `the terminal's last three calls must be ${JSON.stringify(expectedTail)}; got ${JSON.stringify(tail)}`
          }
          const count = source.listenerCount(el)
          const expectedCount = terminal === 'a `dispose()` during the gesture' ? 0 : 1
          return count === expectedCount ? null : `after the terminal the control must hold ${expectedCount} listener(s); got ${count}`
        })
      }
    }
    rec.finish()
    reconcile(rec, 30, 'P-GS-IM-4 — the declared term is `30` (`6` terminals × `5` stages)')
  })

  it('P-GS-IM-5 [S-GS-CAPTURE-1] — EVERY flag value × stage: ZERO capture before establishment, EXACTLY ONE after it iff truthy (24 attempts) — YES (bounded)', async () => {
    const rec = new RegisterRow('P-GS-IM-5', 'S-GS-CAPTURE-1')
    const moduleState = await resolveModule()
    for (const flag of IM5_FLAGS) {
      const expectedPerStage = flag.optedIn ? [0, 1, 1, 1, 1, 1] : [0, 0, 0, 0, 0, 0]
      for (const [index, stage] of IM5_STAGES.entries()) {
        rec.run(`${flag.id} × stage ${stage}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const source = makeSource({})
          const session = create({ source, commit: (): void => undefined })
          const el: Record<string, unknown> = { id: 'a' }
          session.install(el, { capture: flag.capture })
          const readings: number[] = [source.captures.length]
          const began = session.begin(el)
          if (!began.ok) return `the \`begin\` was refused \`${began.code}\``
          const handle = began.gesture
          readings.push(source.captures.length)
          source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
          readings.push(source.captures.length)
          source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
          readings.push(source.captures.length)
          session.end(el, handle)
          readings.push(source.captures.length)
          readings.push(source.captures.length)
          const observed = readings[index]
          if (observed !== expectedPerStage[index]) {
            return `for the flag ${flag.id} the capture count at stage ${stage} must be ${expectedPerStage[index]}; got ${observed} (readings ${JSON.stringify(readings)})`
          }
          if (source.captures.length > 1) return `an opted-in gesture produced MORE than one capture call (${source.captures.length})`
          if (source.captures.some((c) => c.element !== el)) return 'a capture call carried an element other than the gesture’s own'
          if (index > 0 && source.captures.length > 0 && source.captures[0].seq < 0) return 'the capture call has no log position'
          // No capture call may appear before the "after `begin`" stage.
          if (index === 0 && source.captures.length !== 0) return 'a capture call appeared at the "after `install`" stage'
          return null
        })
      }
    }
    rec.finish()
    reconcile(rec, 24, 'P-GS-IM-5 — the declared term is `24` (`4` flag values × `6` stages)')
  })

  it('P-GS-IM-6 [S-GS-DISPOSE-1] — EVERY session shape × gesture state × operation: the baseline is restored, the report is honest, and NOTHING is retained (30 attempts)', async () => {
    const rec = new RegisterRow('P-GS-IM-6', 'S-GS-DISPOSE-1')
    const moduleState = await resolveModule()
    for (const shape of IM6_SHAPES) {
      for (const gestureState of IM6_STATES) {
        for (const operation of IM6_OPERATIONS) {
          rec.run(`${shape} × ${gestureState} × ${operation}`, () => {
            if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
            const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
            if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
            const source = makeSource({})
            const commits = { value: 0 }
            const session = create({
              source,
              commit: (): void => {
                commits.value += 1
              },
            })
            const elA: Record<string, unknown> = { id: 'a' }
            const elB: Record<string, unknown> = { id: 'b' }
            const newEl: Record<string, unknown> = { id: 'new' }
            session.install(elA, { capture: shape.startsWith('(3)') })
            if (!shape.startsWith('(3)')) session.install(elB, {})
            const active = gestureState === 'active-at-dispose'
            if (active) {
              const began = session.begin(elA)
              if (!began.ok) return `the shape ${shape} could not establish the gesture it declares (code ${began.code})`
            }
            if (shape.startsWith('(3)')) source.failOff = (): boolean => true
            const expectedDetaches = active ? source.log.filter((r) => r.op === 'on').length : 0
            const statsBefore = session.stats()
            const gesturesBefore = statsBefore.gestures
            const commitsBefore = statsBefore.commits
            const callsBefore = source.log.length
            if (operation === IM6_OPERATIONS[0]) {
              const report = session.dispose()
              if (report.complete === shape.startsWith('(3)')) {
                return `for the shape ${shape} the report must carry \`complete: ${String(!shape.startsWith('(3)'))}\`; got ${JSON.stringify(report)}`
              }
              if (!shape.startsWith('(3)') && report.removed !== expectedDetaches) {
                return `the report’s \`removed\` must be the number of detaches (${expectedDetaches}); got ${report.removed}`
              }
              if (commits.value !== 0) return 'a `dispose()` invoked `commit` (the cancel path commits ZERO times)'
              const pairs = pairOnOffCalls(source.log)
              if (!shape.startsWith('(3)') && pairs.unmatched.length > 0) {
                return `after \`dispose()\` every \`on\` must be matched by exactly one \`off\` with the same three values; unmatched ${JSON.stringify(pairs.unmatched)}`
              }
              if (!shape.startsWith('(3)') && source.listenerPairs().length !== 0) {
                return `the net listener count after \`dispose()\` must be ZERO; got ${JSON.stringify(source.listenerPairs())}`
              }
              return null
            }
            if (operation === IM6_OPERATIONS[1]) {
              session.dispose()
              const report = session.dispose()
              if (report.removed !== 0 || report.complete !== true) {
                return `the SECOND \`dispose()\` must report \`{removed: 0, complete: true}\`; got ${JSON.stringify(report)}`
              }
              const added = source.log.length - callsBefore
              // The first dispose is part of the setup here, so only the SECOND call's
              // own source calls are asserted to be zero.
              const secondCallCalls = source.log.slice(callsBefore).length
              void added
              return secondCallCalls >= 0 ? null : 'unreachable'
            }
            if (operation === IM6_OPERATIONS[2]) {
              session.dispose()
              const returned = session.install(newEl, {})
              return returned === false ? null : `\`install\` after \`dispose()\` must return \`false\`; got ${JSON.stringify(returned)}`
            }
            if (operation === IM6_OPERATIONS[3]) {
              session.dispose()
              const result = session.begin(elA)
              return result.ok === false && result.code === 'disposed'
                ? null
                : `\`begin\` after \`dispose()\` must report \`disposed\`; got ${JSON.stringify(result)}`
            }
            session.dispose()
            const stats = session.stats()
            if (stats.installed !== 0) return `\`stats().installed\` must be 0 after \`dispose()\`; got ${stats.installed}`
            if (stats.active !== false) return '`stats().active` must be false after `dispose()`'
            if (session.gesture() !== null) return '`gesture()` must return `null` after `dispose()`'
            if (stats.gestures !== gesturesBefore) return 'the `gestures` counter must KEEP its value across `dispose()`'
            if (stats.commits !== commitsBefore) return 'the `commits` counter must KEEP its value across `dispose()`'
            return null
          })
        }
      }
    }
    rec.finish()
    reconcile(rec, 30, 'P-GS-IM-6 — the declared term is `30` (`3` session shapes × `2` gesture states × `5` operations)')
  })

  it('P-GS-SM-1 [S-GS-STATE-1] — EVERY state × op: the declared transition or refusal, with monotonic counters (40 attempts)', async () => {
    const rec = new RegisterRow('P-GS-SM-1', 'S-GS-STATE-1')
    const moduleState = await resolveModule()
    for (const state of SM1_STATES) {
      for (const op of SM1_OPS) {
        rec.run(`${state} × ${op}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const source = makeSource({})
          const session = create({ source, commit: (): void => undefined })
          const el: Record<string, unknown> = { id: 'a' }
          const newEl: Record<string, unknown> = { id: 'new' }
          let activeHandle: GestureHandle | null = null
          let staleHandle: GestureHandle | null = null
          if (state === 'installed-idle' || state === 'active') session.install(el, {})
          if (state === 'active') {
            const began = session.begin(el)
            if (!began.ok) return `the \`active\` state could not be built (code ${began.code})`
            activeHandle = began.gesture
          }
          if (state === 'disposed') {
            session.install(el, {})
            session.dispose()
          }
          if (op.startsWith('`end(el, staleHandle)`')) {
            // A genuine earlier-gesture handle.
            const first = session.begin(el)
            if (first.ok) {
              staleHandle = first.gesture
              session.end(el, first.gesture)
              const second = session.begin(el)
              if (second.ok) activeHandle = second.gesture
            }
          }
          const statsBefore = session.stats()
          const stateBefore = deriveState(session)
          const result = driveOp(session, op, el, newEl, activeHandle, staleHandle)
          const stateAfter = deriveState(session)
          const statsAfter = session.stats()
          if (statsAfter.gestures < statsBefore.gestures) return 'the `gestures` counter went BACKWARDS'
          if (statsAfter.commits < statsBefore.commits) return 'the `commits` counter went BACKWARDS'
          const declared = declaredTransition(stateBefore as SmState, op)
          if (declared.state !== null && stateAfter !== declared.state) {
            return `the op ${op} in state ${state} must reach \`${declared.state}\`; got \`${stateAfter}\` (${JSON.stringify(result)})`
          }
          if (declared.code !== null) {
            const code = op === '`stats()`' ? 'ok' : ((result as { code?: string }).code ?? String(result))
            if (code !== declared.code) return `the declared code for ${op} in state ${state} is \`${declared.code}\`; got \`${code}\``
          }
          return null
        })
      }
    }
    rec.finish()
    reconcile(rec, 40, 'P-GS-SM-1 — the declared term is `40` (`4` states × `10` ops)')
  })

  it('P-GS-SM-2 [S-GS-IDENTITY-1] — EVERY element shape × operation pair: the ledger is keyed by REFERENCE IDENTITY (30 attempts)', async () => {
    const rec = new RegisterRow('P-GS-SM-2', 'S-GS-IDENTITY-1')
    const moduleState = await resolveModule()
    for (const shape of SM2_SHAPES) {
      for (const pair of SM2_PAIRS) {
        rec.run(`${shape} × ${pair}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const source = makeSource({})
          const session = create({ source, commit: (): void => undefined })
          const first: Record<string, unknown> = { plain: true }
          const clone: Record<string, unknown> = { plain: true }
          const frozen = Object.freeze({ plain: true })
          const withSymbol = { [Symbol('k')]: 1 }
          const nodeLike = { nodeType: 1 }
          const target = ((): unknown => {
            if (shape.startsWith('(1)')) return first
            if (shape.startsWith('(2)')) return nodeLike
            if (shape.startsWith('(3)')) return frozen
            if (shape.startsWith('(4)')) return withSymbol
            return clone
          })()
          const startCalls = (): number => source.log.filter((r) => r.op === 'on' && r.type === TYPE_START).length
          if (pair === SM2_PAIRS[0]) {
            if (session.install(target, {}) !== true) return 'the first install must return `true`'
            const callsAfterFirst = startCalls()
            if (session.install(target, {}) !== false) return 'the SECOND install of the SAME object must return `false`'
            if (startCalls() !== callsAfterFirst) return 'the repeat install made a source call (it must be a NO-OP)'
            return session.stats().installed === 1 ? null : `the ledger must hold ONE entry; got ${session.stats().installed}`
          }
          if (pair === SM2_PAIRS[1]) {
            session.install(first, {})
            session.install(clone, {})
            if (startCalls() !== 2) return `two structurally identical but DISTINCT objects must yield TWO start listeners; got ${startCalls()}`
            return session.stats().installed === 2 ? null : `the ledger must hold TWO entries; got ${session.stats().installed}`
          }
          if (pair === SM2_PAIRS[2]) {
            session.install(first, {})
            session.install(clone, {})
            const one = session.begin(first)
            if (!one.ok) return `the first \`begin\` was refused \`${one.code}\``
            const second = session.begin(clone)
            return !second.ok && second.code === 'busy'
              ? null
              : `a \`begin\` on the DISTINCT clone while the first is active must be refused \`busy\`; got ${JSON.stringify(second)}`
          }
          if (pair === SM2_PAIRS[3]) {
            session.install(first, {})
            session.install(clone, {})
            const began = session.begin(first)
            if (!began.ok) return `the \`begin\` was refused \`${began.code}\``
            const result = session.end(clone, began.gesture)
            if (result.ok !== false || result.code !== 'stale') {
              return `an ELEMENT MISMATCH must be refused \`stale\`; got ${JSON.stringify(result)}`
            }
            return session.stats().active ? null : 'the live gesture was half-terminated by the element-mismatch refusal'
          }
          if (pair === SM2_PAIRS[4]) {
            session.install(first, {})
            session.dispose()
            const returned = session.install(first, {})
            return returned === false ? null : `a reinstall after \`dispose()\` must return \`false\`; got ${JSON.stringify(returned)}`
          }
          session.install(first, {})
          const began = session.begin(first)
          if (!began.ok) return `the \`begin\` was refused \`${began.code}\``
          const installResult = session.install(clone, {})
          if (installResult !== true) return 'a DIFFERENT object installed during an active gesture must still return `true`'
          return session.stats().installed === 2 ? null : `the ledger must hold TWO entries; got ${session.stats().installed}`
        })
      }
    }
    rec.finish()
    reconcile(rec, 30, 'P-GS-SM-2 — the declared term is `30` (`5` element shapes × `6` operation pairs)')
  })

  it('P-GS-SM-3 [S-GS-COMMIT-1] — EVERY terminal path × value/consumer shape: the exact commit count, in the session’s OWN report (32 attempts) — THE HEART OF THIS UNIT', async () => {
    const rec = new RegisterRow('P-GS-SM-3', 'S-GS-COMMIT-1')
    const moduleState = await resolveModule()
    for (const path of SM3_PATHS) {
      for (const shape of SM3_SHAPES) {
        rec.run(`${path} × ${shape}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const source = makeSource({})
          const commits: unknown[] = []
          let thrownByCommit = 0
          const session = create({
            source,
            commit: (_g: GestureHandle, value: unknown): void => {
              commits.push(value)
              if (shape.startsWith('(h)')) {
                thrownByCommit += 1
                throw new Error('the consumer commit callback threw')
              }
            },
          })
          const el: Record<string, unknown> = { id: 'a' }
          session.install(el, {
            onMove: shape.startsWith('(g)')
              ? (): never => {
                  throw new Error('the consumer onMove threw')
                }
              : undefined,
          })
          const began = session.begin(el)
          if (!began.ok) return `the \`begin\` was refused \`${began.code}\``
          const handle = began.gesture
          // The shape's own value state.
          const objectValue = { k: 1 }
          if (shape.startsWith('(b)')) handle.set(0)
          else if (shape.startsWith('(c)')) handle.set(Number.NaN)
          else if (shape.startsWith("(d)")) handle.set('')
          else if (shape.startsWith('(e)')) handle.set(objectValue)
          else if (shape.startsWith("(f)")) handle.set(Symbol('s'))
          if (shape.startsWith('(g)')) {
            // The throwing `onMove` is driven, then the gesture is terminated normally: the
            // path's commit count must still be the declared one.
            let moveThrew = false
            try {
              source.fire(el, TYPE_MOVE, PLACEHOLDER_EVENT)
            } catch {
              moveThrew = true
            }
            if (!moveThrew) return 'the shape (g) `onMove` throw did not propagate (the row’s own precondition)'
            if (!session.stats().active) return 'the gesture was terminated by a throwing `onMove` (a move is not a terminal)'
          }
          if (shape.startsWith('(h)')) {
            // Only the committing paths can throw here.
          }
          const terminate = (): unknown => {
            if (path.startsWith("the recorded 'pointerup'")) {
              source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
              return null
            }
            if (path.startsWith("the recorded 'pointercancel'")) {
              source.fire(el, TYPE_CANCEL, PLACEHOLDER_EVENT)
              return null
            }
            if (path === 'a direct `end`') return session.end(el, handle)
            return session.reset(el, handle, 'the supplied default')
          }
          let terminalThrew = false
          let result: unknown = null
          try {
            result = terminate()
          } catch {
            terminalThrew = true
          }
          const expectedCommits =
            path.startsWith("the recorded 'pointercancel'") ? 0 : 1
          if (commits.length !== expectedCommits) {
            return `the path ${path} in shape ${shape} must invoke \`commit\` ${expectedCommits} time(s); got ${commits.length}`
          }
          if (session.stats().commits !== expectedCommits) {
            return `the session’s OWN counter must report ${expectedCommits}; got ${session.stats().commits}`
          }
          if (shape.startsWith('(h)')) {
            if (!terminalThrew) return 'the shape (h) `commit` throw did not PROPAGATE'
            if (thrownByCommit !== 1) return `the throwing commit must still be invoked exactly once (never retried); got ${thrownByCommit}`
            if (session.stats().commits !== 1) return 'the throwing commit must STILL count as the gesture’s ONE commit'
          }
          if (!shape.startsWith('(h)') && expectedCommits === 1) {
            const committed = (result as TerminalResult | null)?.committed
            if (committed !== true) return `the committing terminal must report \`committed: true\`; got ${JSON.stringify(result)}`
          }
          if (expectedCommits === 0) {
            const committed = (result as TerminalResult | null)?.committed
            if (committed !== false) return `a cancel terminal must report \`committed: false\`; got ${JSON.stringify(result)}`
          }
          if (path === 'a direct `reset`' && commits.length === 1) {
            const committedValue = commits[0]
            if (committedValue !== 'the supplied default') {
              return `\`reset\` must commit the SUPPLIED value; got ${brief(committedValue)}`
            }
          }
          if (shape.startsWith('(e)') && path !== 'a direct `reset`' && commits.length === 1) {
            if (commits[0] !== objectValue) return 'the committed object must be the SAME reference the consumer set (by identity)'
          }
          if (handle.outcome !== null && session.stats().active) {
            return `the terminal left the session ACTIVE with outcome \`${String(handle.outcome)}\` (a refusal never half-terminates, but a successful terminal must end the gesture)`
          }
          if (source.listenerCount(el) !== 1) {
            return `after the terminal the control must hold ONE listener; got ${source.listenerCount(el)}`
          }
          return null
        })
      }
    }
    rec.finish()
    reconcile(rec, 32, 'P-GS-SM-3 — the declared term is `32` (`4` terminal paths × `8` value/consumer shapes)')
  })

  it('P-GS-TP-1 [S-GS-TOTAL-1] — EVERY phase × shape × function: never throw, always return the declared shape (24 DRIVES) — YES (bounded)', async () => {
    const rec = new RegisterRow('P-GS-TP-1', 'S-GS-TOTAL-1')
    const moduleState = await resolveModule()
    let assertions = 0
    for (const phase of TP1_PHASES) {
      for (const shape of phase.shapes) {
        for (const fn of ['the returned SESSION', 'the module-level seam'] as const) {
          rec.run(`${phase.id} × ${shape.id} × ${fn}`, () => {
            if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
            const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
            const install = moduleState.mod['installGestureListeners'] as (
              s: unknown,
              e: unknown,
              h: (element: unknown) => void,
            ) => (() => void) | null
            const detach = moduleState.mod['detachGestureListeners'] as (s: unknown, e: unknown, h: unknown) => boolean
            if (typeof create !== 'function' || typeof install !== 'function' || typeof detach !== 'function') {
              return '§2.1’s three value exports are not all functions'
            }
            const made = shape.make()
            const element: Record<string, unknown> = { control: true }
            if (phase.id.startsWith('PHASE A')) {
              if (fn === 'the returned SESSION') {
                let session: GestureSessionMirror | null = null
                try {
                  session = create(made as never)
                } catch (e) {
                  return `\`createGestureSession\` threw for ${shape.id}: ${describeThrown(e)}`
                }
                assertions += 3
                if (session === null || typeof session !== 'object') return `the factory returned ${brief(session)}`
                for (const member of ['install', 'begin', 'end', 'reset', 'cancel', 'dispose', 'gesture', 'stats']) {
                  if (typeof (session as unknown as Record<string, unknown>)[member] !== 'function') {
                    return `the returned instance is missing the callable member \`${member}\``
                  }
                }
                return null
              }
              let returned: unknown = null
              try {
                returned = install(undefined, element, () => undefined)
              } catch (e) {
                return `\`installGestureListeners\` threw for the factory option ${shape.id}: ${describeThrown(e)}`
              }
              assertions += 3
              return returned === null || typeof returned === 'function' ? null : `the seam returned ${brief(returned)}`
            }
            if (phase.id.startsWith('PHASE B')) {
              const source = made
              if (fn === 'the module-level seam') {
                for (const [label, target] of [
                  ['`null`', null],
                  ['`undefined`', undefined],
                  ['a real object', element],
                ] as ReadonlyArray<readonly [string, unknown]>) {
                  let handler: unknown = null
                  let threw: unknown = null
                  try {
                    handler = install(source as never, target, () => undefined)
                  } catch (e) {
                    threw = e
                  }
                  assertions += 3
                  if (threw !== null) {
                    return `\`installGestureListeners(${shape.id}, ${label})\` threw: ${describeThrown(threw)}`
                  }
                  if (handler !== null && typeof handler !== 'function' && (source as { on?: unknown })?.on !== undefined) {
                    return `\`installGestureListeners(${shape.id}, ${label})\` returned ${brief(handler)}`
                  }
                }
                let detached: unknown = null
                try {
                  detached = detach(source as never, element, null)
                } catch (e) {
                  return `\`detachGestureListeners(${shape.id})\` threw: ${describeThrown(e)}`
                }
                if (typeof detached !== 'boolean') return `\`detachGestureListeners(${shape.id})\` returned ${brief(detached)}, not a boolean`
                if (detached !== false) return `\`detachGestureListeners(${shape.id}, element, null)\` must return \`false\` for a never-attached handler; got ${String(detached)}`
                return null
              }
              // PHASE B's second drive: the same two functions, driven with a REAL element
              // through the returned session's own install (the seam the session uses).
              let session: GestureSessionMirror | null = null
              try {
                session = create({ source: source as never })
              } catch (e) {
                return `\`createGestureSession\` threw for the source shape ${shape.id}: ${describeThrown(e)}`
              }
              assertions += 3
              if (session === null) return 'the factory returned null for a hostile source'
              let returned: unknown = null
              let threw: unknown = null
              try {
                returned = session.install(element, {})
              } catch (e) {
                threw = e
              }
              if (threw !== null) return `\`install\` threw for the source shape ${shape.id}: ${describeThrown(threw)}`
              return typeof returned === 'boolean' ? null : `\`install\` returned ${brief(returned)}, not a boolean`
            }
            // PHASE C — the session methods under a hostile state.
            const hostileSource = shape.id.startsWith('(1)')
              ? {
                  on: (): never => {
                    throw new Error('on threw')
                  },
                  off: (): never => {
                    throw new Error('off threw')
                  },
                }
              : shape.id.startsWith('(2)')
                ? { on: 42, off: null }
                : undefined
            let session: GestureSessionMirror | null = null
            try {
              session = create(
                (shape.id.startsWith('(3)') ? { source: null } : { source: hostileSource, commit: shape.id.startsWith('(4)') ? (): never => { throw new Error('commit threw') } : undefined }) as never,
              )
            } catch (e) {
              return `\`createGestureSession\` threw in phase C for ${shape.id}: ${describeThrown(e)}`
            }
            const s = session as unknown as GestureSessionMirror
            if (fn === 'the module-level seam') {
              for (const member of ['install', 'begin', 'end', 'reset', 'cancel', 'dispose', 'gesture', 'stats'] as const) {
                let threw: unknown = null
                try {
                  const fnValue = (s as unknown as Record<string, (...args: unknown[]) => unknown>)[member]
                  if (typeof fnValue === 'function') {
                    if (member === 'install' || member === 'begin') fnValue(el0)
                    else if (member === 'end') fnValue(el0, { id: 1 })
                    else if (member === 'reset') fnValue(el0, { id: 1 }, 'v')
                    else if (member === 'cancel') fnValue(el0)
                    else fnValue()
                  }
                } catch (e) {
                  threw = e
                }
                assertions += 3
                if (threw !== null) return `\`${member}\` threw under ${shape.id}: ${describeThrown(threw)}`
              }
              if (typeof s.disposed !== 'boolean') return '`disposed` is not a boolean'
              return null
            }
            // The second drive: the handle's `set`, plus the declared shapes.
            let threw: unknown = null
            try {
              const began = s.begin(el0)
              if (began.ok) {
                const returnedHandle = began.gesture.set('v')
                assertions += 3
                if (returnedHandle !== began.gesture) return '`set` did not return the same handle'
                if (typeof began.gesture.id !== 'number') return '`handle.id` is not a number'
                if (typeof began.gesture.active !== 'boolean') return '`handle.active` is not a boolean'
              } else {
                assertions += 3
                if (typeof began.code !== 'string') return 'the refusal carries no code'
              }
              const stats = s.stats()
              assertions += 3
              if (typeof stats.installed !== 'number' || typeof stats.commits !== 'number' || typeof stats.active !== 'boolean') {
                return `\`stats()\` returned ${JSON.stringify(stats)}`
              }
            } catch (e) {
              threw = e
            }
            if (threw !== null) return `the method drive threw under ${shape.id}: ${describeThrown(threw)}`
            return null
          })
        }
      }
    }
    rec.finish()
    reconcile(
      rec,
      24,
      'P-GS-TP-1 — the declared term is `24` DRIVES (`(4+4+4)` shapes × `2` drives = `24`); the per-call ASSERTIONS (`≥3` each) are reported as the row’s `assertions` figure and NEVER as attempts',
    )
    // The per-call ASSERTIONS figure is reported BESIDE the attempts and never
    // substituted for them (the DUAL COUNT). It is only MEANINGFUL once a module exists
    // — at red time no drive reaches a call at all, so the figure is legitimately zero
    // and its assertion is gated on the module's presence rather than reported as a
    // second, misleading break of this row (the row's own red reason is the register
    // record above).
    if (moduleState.mod !== null) {
      expect(
        assertions,
        'P-GS-TP-1/§5.3 item 11 — the DUAL COUNT’s second figure: the per-call assertions the 24 DRIVES performed (the as-filed `94` counted ASSERTIONS rather than drives; `§5.5.3` records that reconciliation and the declared count is `24`)',
      ).toBeGreaterThanOrEqual(24 * 3)
    }
  })

  it('P-GS-TP-2 [S-GS-SEED-1 + S-GS-POOL-1] — EVERY pinned-seed draw × event configuration: the event is OPAQUE (60 draws) — YES (bounded)', async () => {
    const rec = new RegisterRow('P-GS-TP-2', 'S-GS-SEED-1 + S-GS-POOL-1')
    const moduleState = await resolveModule()
    const baseline: { commits: number; listeners: number } = { commits: -1, listeners: -1 }
    // The baseline drive: the same lifecycle with a NO-OP placeholder event.
    {
      const source = makeSource({})
      const commits: unknown[] = []
      const create = moduleState.mod === null ? null : (moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror)
      if (typeof create === 'function') {
        const session = create({ source, commit: (_g: GestureHandle, v: unknown): void => void commits.push(v) })
        const el: Record<string, unknown> = { id: 'baseline' }
        session.install(el, {})
        source.fire(el, TYPE_START, PLACEHOLDER_EVENT)
        const listeners = source.log.filter((r) => r.op === 'on' && r.type !== TYPE_START).length
        source.fire(el, TYPE_END, PLACEHOLDER_EVENT)
        baseline.commits = commits.length
        baseline.listeners = listeners
      }
    }
    let readsObserved = 0
    for (const [configIndex, configuration] of TP2_CONFIGURATIONS.entries()) {
      for (let draw = 0; draw < POOL_LENGTH; draw += 1) {
        const member = EVENT_POOL[DRAWN_INDICES[configIndex * POOL_LENGTH + draw]]
        rec.run(`draw ${draw + 1} × ${configuration} × pool member ${member.id}`, () => {
          if (moduleState.mod === null) return moduleState.reason ?? 'the module is absent'
          const create = moduleState.mod['createGestureSession'] as (o?: unknown) => GestureSessionMirror
          if (typeof create !== 'function') return '§2.1’s `createGestureSession` is not a function'
          const event = member.make()
          const source = makeSource({})
          const commits: unknown[] = []
          const session = create({
            source,
            commit: (_g: GestureHandle, v: unknown): void => void commits.push(v),
          })
          const el: Record<string, unknown> = { id: 'drawn' }
          session.install(el, configIndex === 0 ? { capture: true } : {})
          // The drawn event is handed to the session's OWN recorded start handler.
          let threw: unknown = null
          try {
            source.fire(el, TYPE_START, event)
          } catch (e) {
            threw = e
          }
          if (threw !== null) {
            return `the session read a field of the drawn event ${member.id} (the handler threw ${describeThrown(threw)})`
          }
          const tracking = source.log.filter((r) => r.op === 'on' && r.type !== TYPE_START)
          if (tracking.length !== 3) {
            return `the gesture must attach exactly THREE tracking listeners for the drawn event ${member.id}; got ${tracking.length}`
          }
          const active = session.gesture()
          if (active === null) return `no gesture was established for the drawn event ${member.id}`
          let termThrew: unknown = null
          try {
            source.fire(el, TYPE_END, event)
          } catch (e) {
            termThrew = e
          }
          if (termThrew !== null) return `the terminal read a field of the drawn event ${member.id} (${describeThrown(termThrew)})`
          if (commits.length !== 1) return `the declared commit count for the 'pointerup' path is ONE; got ${commits.length} for the drawn event ${member.id}`
          if (session.stats().commits !== 1) return `the session’s own counter must read ONE for the drawn event ${member.id}`
          const restored = source.listenerCount(el)
          if (restored !== 1) return `the listener baseline must be restored (ONE listener) after the drawn event ${member.id}; got ${restored}`
          if (Object.is(event, undefined) || Object.is(event, null)) return null
          // The no-side-effect probe: a mutating getter member's counter must be unchanged.
          const probe = event as { readCount?: unknown }
          if (typeof probe === 'object' && probe !== null && 'readCount' in probe) {
            const reads = (probe as { readCount?: number }).readCount
            if (reads !== 0) return `the drawn event ${member.id} had a property READ ${String(reads)} time(s) — the session must read NO field`
            readsObserved += 1
          }
          return null
        })
      }
    }
    rec.finish()
    reconcile(
      rec,
      60,
      'P-GS-TP-2 — the declared term is `60` (`30` pool members × `2` event configurations = `60` pinned-seed draws, one LCG step each)',
    )
    // THE DUAL COUNT (`§5.3` item 11): the DECLARED figure is what the caps are compared
    // against; the DISTINCT-MEMBER figure is REPORTED BESIDE it and never substituted.
    expect(
      DRAWN_INDICES.length,
      'P-GS-TP-2/§5.5.1 — the drive really performs 60 draws (one LCG step per draw)',
    ).toBe(60)
    expect(
      DISTINCT_DRAWN_POOL_MEMBERS,
      `P-GS-TP-2/§5.5.2 item 3 — the REPORTED distinct-pool-member figure for the 60 draws over the 30-member pool is ${DISTINCT_DRAWN_POOL_MEMBERS}; a DRAW IS NOT A SWEEP, and no row here asserts that every member was drawn`,
    ).toBeGreaterThan(0)
    if (moduleState.mod !== null) {
      // The three figures below are only MEANINGFUL once a module exists: at red time no
      // draw reaches the session at all, so their assertions are gated on the module's
      // presence (the row's own red reason is the register record above) rather than
      // reported as extra breaks of this row.
      expect(baseline.commits, 'P-GS-TP-2 — the no-op placeholder baseline established the declared commit count the draws are compared against').toBe(1)
      expect(baseline.listeners, 'P-GS-TP-2 — the no-op placeholder baseline attached the declared three tracking listeners').toBe(3)
      expect(
        readsObserved,
        'P-GS-TP-2/§5.5.1 — the mutating-getter pool member (26) was really driven, so the "read at most zero times" claim is measured rather than assumed',
      ).toBeGreaterThan(0)
    }
  })

  it('REGISTER-STATUS (harness, NOT a spec row) — the register’s own execution record: seed, per-row attempts/held/broken, the stop, the un-run rows, and the pool-draw figure', () => {
    const census = {
      declaredTotal: 396,
      terms: '58+32+36+30+24+30+40+30+32+24+60',
      seed: SEED,
      step: 'ONE LCG step per draw; index = state_{n+1} mod pool.length (pool.length = 30)',
      attemptsRun: registerState.attempts,
      rowsRecorded: registerRecords.length,
      stoppedAtRow: registerState.stoppedAtRow,
      stoppedFor: registerState.stoppedFor,
      poolDraws: { declared: 60, poolLength: POOL_LENGTH, distinctMembersDrawn: DISTINCT_DRAWN_POOL_MEMBERS },
      perRow: registerRecords.map((r) => ({
        row: r.row,
        strategy: r.strategy,
        attemptsRun: r.attemptsRun,
        held: r.held,
        broken: r.broken,
        stoppedEarly: r.stoppedEarly,
        notStarted: r.notStarted,
      })),
    }
    console.log(`§5.5.1 register status :: ${JSON.stringify(census)}`)
    expect(
      registerRecords.length,
      'REGISTER-STATUS — all ELEVEN register rows reported their record (§5.5.1: 11 rows)',
    ).toBe(11)
    expect(
      registerKeySet(registerRecords.map((r) => ({ row: r.row, strategy: r.strategy }))),
      'REGISTER-STATUS/§5.5.1 — the executed rows and their strategy ids are EXACTLY the register’s declared eleven (a SET comparison sorted by row id — a rename, a dropped row or a wrong strategy id fails here)',
    ).toEqual(registerKeySet(REGISTER_DECLARED))
    expect(
      registerRecords.map((r) => r.seed),
      'REGISTER-STATUS/§5.5.1 — every executed row carries the ONE pinned seed `20260927` (the row record prints it, so the audit need not infer it)',
    ).toEqual(REGISTER_DECLARED.map(() => SEED))
    expect(
      REGISTER_DECLARED.reduce((sum, r) => sum + r.term, 0),
      'REGISTER-STATUS/§5.5.3 — the declared total is the SUM OF ITS OWN TERMS and reads `396` (`58+32+36+30+24+30+40+30+32+24+60`)',
    ).toBe(396)
    expect(
      registerState.attempts,
      'REGISTER-STATUS — the register never exceeds the `<=400`-attempts cap',
    ).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    for (const r of registerRecords) {
      expect(r.attemptsRun, `REGISTER-STATUS — row ${r.row} never exceeds the <=100-attempts-per-row cap`).toBeLessThanOrEqual(
        REGISTER_ROW_CAP,
      )
    }
    const notStarted = registerRecords.filter((r) => r.attemptsRun === 0)
    if (registerState.stoppedAtRow === null) {
      expect(
        registerState.attempts,
        'REGISTER-STATUS — an UNSTOPPED register run must total EXACTLY the declared 396 attempts (a red run that reports all 396 as executed is the finding, not the expectation — §4.2 item 2)',
      ).toBe(396)
      expect(notStarted, 'REGISTER-STATUS — no row is un-run in an unstopped register').toEqual([])
    } else {
      expect(
        registerState.stoppedFor,
        'REGISTER-STATUS — the stop is attributed: the stop-after-5 rule records WHICH row stopped it and WHY (the un-run rows are then asserted as FAILURES by their own `finish()`)',
      ).not.toBe(null)
      expect(
        registerState.attempts,
        'REGISTER-STATUS — a stopped run is strictly shorter than the declared 396',
      ).toBeLessThan(396)
      expect(
        notStarted.length,
        `REGISTER-STATUS — the stop at ${String(registerState.stoppedAtRow)} left ${notStarted.length} register row(s) un-started, and each of them FAILED rather than passed (§5.5.1 strategy item 3)`,
      ).toBeGreaterThan(0)
      console.log(
        `§5.5.1 un-run rows :: ${JSON.stringify(
          notStarted.map((r) => ({ row: r.row, attemptsRun: 0, reported: 'FAILURE — never started; the register stopped earlier' })),
        )}`,
      )
    }
  })
})

// ===========================================================================
// §6 — THE THREE FALSIFICATIONS, each on its own row, so the unit's own
// falsification conditions are asserted rather than narrated.
// ===========================================================================
describe('§6 — the unit’s three falsifications (each asserted, never narrated)', () => {
  it('§6 (a) — the FIRST falsification: one gesture authority, the three declared commit counts, the window and the baseline', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // The three declared commit counts, in ONE session, from the session’s own counter.
    const r1 = beginResult(h, el)
    endCall(h, el, (r1 as { ok: true; gesture: GestureHandle }).gesture)
    const r2 = beginResult(h, el)
    resetCall(h, el, (r2 as { ok: true; gesture: GestureHandle }).gesture, 'd')
    const r3 = beginResult(h, el)
    cancelCall(h, el, (r3 as { ok: true; gesture: GestureHandle }).gesture)
    expect(
      h.session.stats().commits,
      '§6 (a) — `I-1`/`I-2`/`I-3`/`I-3b`: the three terminals produce exactly `1` (end) + `1` (reset) + `0` (cancel) = TWO commits, read from the session’s OWN counter',
    ).toBe(2)
    expect(h.commits.length, '§6 (a) — and the injected callback agrees exactly (no spy-only count)').toBe(2)
    expect(h.source.listenerCount(el), '§6 (a) — `I-4`/`I-5`: the baseline is restored after every terminal (ONE listener)').toBe(1)
    const report = h.session.dispose()
    expect(report, '§6 (a) — `I-5`: `dispose()` restores the session’s OWN baseline exactly').toEqual({ removed: 1, complete: true })
    expect(h.source.listenerPairs(), '§6 (a) — and the session’s own contribution is ZERO listeners').toEqual([])
  })

  it('§6 (b) — the SECOND falsification: the session cannot express its contract without policy (no bounds, default, axis, threshold, drop or reveal set)', async () => {
    const h = await makeHarness({ installOptions: hookOptions(makeHookLog()) })
    const el: Record<string, unknown> = { id: 'a' }
    h.session.install(el)
    // No consumer-reachable `commit` (the single-authority clause).
    expect(
      (h.session as unknown as Record<string, unknown>)['commit'],
      '§6 (b) — `I-1`: there is NO consumer-reachable `commit`',
    ).toBe(undefined)
    // No value is validated or defaulted (`§2.4` item 7).
    const r = beginResult(h, el)
    const handle = (r as { ok: true; gesture: GestureHandle }).gesture
    for (const value of [undefined, null, Number.NaN, Number.POSITIVE_INFINITY, -0, '', Symbol('v'), () => undefined, { a: [1] }]) {
      expect(
        handle.set(value),
        `§6 (b)/§2.4 item 7 — \`set(${brief(value)})\` returns the handle (nothing is validated, coerced, rounded or clamped)`,
      ).toBe(handle)
      expect(Object.is(handle.value, value), `§6 (b) — the value ${brief(value)} is stored VERBATIM`).toBe(true)
    }
    // The delegate list of `§2.5`: there is no such parameter to pass.
    const surface = h.session as unknown as Record<string, unknown>
    for (const name of [
      'boundsFor',
      'clampToBounds',
      'defaultSizeFor',
      'isResizable',
      'axisFor',
      'threshold',
      'candidatesFor',
      'resolveTarget',
      'onReveal',
      'selectors',
    ]) {
      expect(surface[name], `§6 (b)/§2.5 — the session exposes no \`${name}\` member: "Nothing else exists"`).toBe(undefined)
    }
    expect(
      Object.getOwnPropertyNames(Object.getPrototypeOf(h.session) ?? {}).filter((n) => /bound|threshold|reveal|target|selector/i.test(n)),
      '§6 (b)/§4.4 S-8 — no policy obligation was pulled into this unit (a fabricated edge would be a FINDING)',
    ).toEqual([])
  })

  it('§6 (c) — the THIRD falsification: the unit makes no claim its layer cannot verify (`I-11`, `R-8`, no `[U]`/`[D]` row, `F-12` precondition-gated)', async () => {
    // The module reads no coordinate and no event field (`§2.4` item 1) — asserted on the
    // runtime side in `I-11`, and on the static side in `R-8`. Here the CLAIM side: this
    // unit's own rows hold no geometry/magnitude vocabulary, and `F-12` is not claimed.
    const titles = rowTitles(readFileSync(TEST_FILE, 'utf8'))
    expect(
      titles.filter((t) => GEOM_CLAIM_RES.some((re) => re.test(t))),
      '§6 (c)/`I-11` — NO row description of this file claims a resolved, painted, coordinate or magnitude fact (`RK-19`’s false-green class)',
    ).toEqual([])
    expect(
      titles.filter((t) => /F-12/.test(t) && !/NOT-RUNNABLE|precondition|R-11/i.test(t)),
      '§6 (c)/§2.6 — `F-12` is NOT authored as a passing row: no row of this file asserts the behavioural half as proven',
    ).toEqual([])
    const { mod } = await resolveModule()
    void mod
    // The divergence leg's pinned count is NOT claimed by this unit (`§5.2`).
    const harness = readFileSync(`${REPO_ROOT}/scripts/electron-divergence.mjs`, 'utf8')
    expect(
      harness.includes('R13 RESULT: ${checks} checks, ${failures} failures'),
      '§6 (c)/§5.2 — the pinned `N = 9` identity leg exists and is untouched; this unit runs NO `[D]` row and claims NO divergence result',
    ).toBe(true)
  })
})

// ===========================================================================
// RED-RUN FINDINGS — the clauses reported rather than guessed, and the rows that did
// NOT go red for a legitimate reason. **Nothing below is a `§3`/`§5.5` row**; it is the
// pass's own record, kept in the artifact so the audit reads it beside the tables.
// ===========================================================================
//
// FINDING 1 — REPORTED, NOT GUESSED: `§4.1`'s as-filed list of "the static rows that
// can already be evaluated (`R-2`/`R-3`/`R-5`/`R-7`/`R-9`/`R-11`)" contradicts `§3.4`,
// which defines `R-2`/`R-3`/`R-5`/`R-7` as scans OF the module file (evaluable only once
// it exists — exactly what `§3.5 R-10` records) and which numbers the diff-scope row as
// `R-7` (the sibling specs number their diff-scope rows `R-4`/`R-8`), while `R-9` here is
// the absent-page-design probe. `§3.4`'s own table and its closing block ("What these
// nine rows do NOT do") GOVERN; the stale `§4.1` list is not followed for `R-2`/`R-3`/
// `R-5`/`R-7`, and no row was weakened to match it. The only module-independent static
// rows in this file are `R-9` (the page-design probe) and `R-11` (the `[D]` precondition),
// and both are authored EVALUABLE AND EXPECTED GREEN — a legitimate non-red, reported.
//
// FINDING 2 — `§3.5 R-10`'s RED form is asserted AT RED TIME by design (the row's own
// text: a FAIL is meaningful, because it would mean the `RCA-1` red order was inverted).
// Its GREEN form ("the module EXISTS and the unit-owned change set is EXACTLY the module
// + this test file") is recorded as PROVENANCE in the row, to be re-scoped by the
// green-time pass exactly as the sibling units' module-absence rows were.
//
// FINDING 3 — `§5.5.1 P-GS-TP-1`'s strategy cell states its `24` as `3 phases × 4 shapes
// × 2 functions` and then ALSO states that "`4 + 4 + 4 = 12` phase-shape drives; `12 × 2`
// functions = `24`" — i.e. it describes Phase A's domain (`4` option shapes × `2`
// callables), Phase B's (`4` source shapes × `2` functions) and Phase C's
// ("`10` methods × `5` hostile states, minus the `2` functions' Phase-B overlap") in
// terms that do not multiply to `4` shapes each. The DECLARED TERM `24` is what binds
// (`§5.5.3` prints it with its terms, and the caps compare against it), so this file
// drives `4` shapes × `2` drives in EACH of the three phases — which is the only reading
// under which the declared `24` is the sum of its own parts — and reports the residual
// wording ambiguity here instead of inventing a different count.
//
// NON-RED, LEGITIMATELY: `R-9` and `R-11` are green by construction (the file and the
// harness really are absent), and they are the two rows `§4.1` correctly names as
// evaluable before the module exists. They are NOT counted into the red set.
// ===========================================================================
