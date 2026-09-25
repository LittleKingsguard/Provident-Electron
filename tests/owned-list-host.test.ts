// tests/owned-list-host.test.ts
// ===========================================================================
// U-LISTHOST · wave D · **THE RED SET** (RCA-1)
//
// Contract: docs/specs/listhost.md — `§2.1` (the new module
// `src/shared/owned-list-host.ts` and its **SEVEN exports**, each signature,
// return shape and refusal pattern), `§2.2` (the six prohibitions), `§2.3`
// (own-node ownership — the `V-7` hard row), `§2.4` (order-as-projection),
// `§3.1` (`M-1`..`M-21`), `§3.2` (`F-1`..`F-11`), `§3.3` (`I-1`..`I-9`),
// `§4` (the red), `§5.1` (diff scope: this file + the module, nothing else),
// `§5.2` (the node suite is leg 1) and `§5.5.1` (the SEVEN-row typed property
// register, whose `§5.5.0` zero-row exemption is SUPERSEDED).
//
// ⟶ 2026-09-27, THE REGRESSION-ROW PASS (`ADV-LH-*`): this file is no longer
// only the `52`-row red set of `§4.1` — it is that set PLUS the rows the
// amended contract owes. `§3.1 M-19`/`M-20`/`M-21` and `§3.2 F-11` were NOT in
// the `52`-row red set that was RUN (`§4.2` item 1, `§3.1`'s own note), and
// neither were the `ADV-LH-1`/`ADV-LH-3` regression rows: they are APPENDED
// here, **authored RED from `§2.1`'s totality clause (both halves: an injected
// `orderOf` and the injected functions' four NAMED safe defaults) and its
// ACCEPTANCE rule + `N-5`**, before the Implementer fixes anything. `F-2`, `F-6`,
// `M-15`, `P-LH-IM-1` and `P-LH-TP-1` are RE-PINNED IN TEXT ONLY (their drives
// and their attempt counts are unchanged; `F-2`'s first-wins is scoped to
// ACCEPTED occurrences, `F-6`'s detached node now DOES appear in `removed`,
// `M-15`'s `order`-vs-`placed` non-parallelism is annotated, `P-LH-IM-1` carries
// the `YES (bounded)` marking `ADV-LH-6` added, and `P-LH-TP-1`'s pool list and
// generator step form are reconciled to the executed `22` shapes / two steps per
// attempt). `P-LH-IM-4`'s STRATEGY is strengthened per `ADV-LH-5` — its
// statement, its row id and its `5`-attempt discipline are UNCHANGED.
//
// LAYER: **[T] — the repo's node suite against `src/shared/dom-shim.ts` ONLY.**
// No window is booted, no IPC round-trip runs, no real DOM is touched, no
// rendered geometry or layout is observed, and the module expands **no** shim
// member. **A green here is envelope/pure-layer evidence and NEVER
// assembled-app evidence** (layer declaration anchor 1). The optional `[U]`
// real-DOM identity row of `§5.2` is **NOT taken** (it needs the `ui` leg and is
// precondition-gated), and no row below depends on it.
//
// THE PROPERTY LAYER IS `§5.5.1`'s REGISTER — 7 rows (`P-LH-IM-1`,
// `P-LH-IM-2`, `P-LH-IM-3`, `P-LH-IM-4`, `P-LH-SM-1`, `P-LH-SM-2`,
// `P-LH-TP-1`), all executed **deterministically in this file**: plain vitest,
// hand-authored tables, and a hand-rolled 32-bit LCG pinned to the seed
// **`20260927`** whose constants are literals right here
// (`state₁ = (state₀ · 1664525 + 1013904223) mod 2³²`). **No `fast-check`, no
// generator library, no property runner, no new dependency.** The register's
// caps are honoured: **≤100 attempts per row, ≤400 attempts in total**, rows
// evaluated in register order, **STOP AFTER 5 CONSECUTIVE FAILURES** (the
// running row's remaining attempts are abandoned and no further row starts).
// `P-LH-TP-1` is `YES (bounded)` — its enumeration is smaller than its property
// text, and the row's record says so; `P-LH-IM-1` now carries the SAME honest
// bounded marking (`ADV-LH-6`, 2026-09-27 — a DOC act: its property text
// ("EVERY permutation") is larger than its enumeration (`n = 3` and `n = 4`
// only), so its cell reads `YES (bounded)` too, and its statement and its `33`
// attempts are unchanged). **The attempt total this file's tables
// drive is `168` = `33 + 34 + 8 + 5 + 8 + 8 + 72` — `§5.5.1`'s CORRECTED
// arithmetic (2026-09-27); the as-filed `157` omitted `P-LH-IM-1`'s third fixed
// `setOrder` table (`+3`) and `P-LH-TP-1`'s fixed after-`dispose()` sweep
// (`+8`). `PRE-3` asserts that total green against the tables below.** The
// `P-LH-TP-1` pool is the executed **`22` shapes** (`§5.5.1`'s `ADV-LH-7`
// reconciliation; the cell's list named `20`, and the executed pool holds `22`
// — its two extra members are REPORTED as a spec/test contradiction below the
// pool's own record, because the two shapes the spec names for them are NOT in
// the executed pool and adding them would change the pool size, the draw
// indices and the attempt discipline the same ruling forbids changing), the
// generator consumes **TWO LCG steps
// per attempt** (`next(1) === 0` by construction, the pool index read from the
// RAW state as `state mod pool.length`), and a **`Symbol`-keyed shape is NOT in
// the pool** — the pool's stated BOUNDARY, not an omission.
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation: `src/shared/owned-list-host.ts` does
// not exist, so every clause row, every static row and every register row fails
// on the module-absent boundary, and the failing set is reported to the
// supervisor verbatim. No `src/**` file is created or modified by this pass.
//
// THE IMPORT BOUNDARY (the repo's established technique — a structural type
// plus a cast at a run-time specifier, `tests/mount-invariant-guard.test.ts:
// 105-131`): (1) an `fs` existence assertion and (2) a **computed** dynamic
// specifier, so Vite cannot fail this whole file's transform on an unresolvable
// import while the module is absent. Every row therefore fails as an
// **ASSERTION** whose message names the absent module / missing export, not as a
// module-collection error that would take the whole red set with it. `PRE-1`
// proves the boundary mechanism itself resolves, against an EXISTING module.
//
// AUTHORED ORDER (`§4.2` step 1, EXTENDED 2026-09-27): `I-1..I-9`,
// `M-1..M-21`, `F-1..F-11`, then the `ADV-LH-*` regression rows of the
// 2026-09-27 adversarial pass, then the `§2.1` surface / `§2.2` static rows and
// `§5.5.1`'s register. The describe blocks below are in that order; `M-19`..
// `M-21` append after `M-18` and `F-11` after `F-10`, and NOTHING is renumbered.
// ===========================================================================
import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import type { ShimElement } from '../src/shared/dom-shim.js'

beforeAll(() => {
  installShim()
})

const hasOwn = Object.prototype.hasOwnProperty

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES (the module cannot
// be imported for its types: it does not exist yet). Field names, optionality
// and the refusal vocabulary are `§2.1`'s.
//
// The declarations below now mirror the RECONCILED `§2.1` exactly: `ListEntry`
// declares `readonly node?: N | null` (the spec's own amendment — the four-case
// node rule `N-1`..`N-4` is stated at `§2.1` and its drives are `M-5`/`M-6`/
// `F-3`/`F-4`), and `ListHostRefusal` declares `readonly key: unknown` (the
// spec's own amendment — the field holds the supplied value VERBATIM, so it can
// carry `42`/`null`/`{}`, exactly as `§3.2 F-5` supplies them). Both were
// reported by the previous pass rather than guessed, and both are now ruled in
// the spec; nothing below deviates from it any more.
// ===========================================================================
type ListKey = string
type RefusalCode = 'unknown-key' | 'duplicate-key' | 'no-node' | 'factory-returned-null' | 'malformed-entry'
/** `§2.1`'s `ListHostRefusal['code']` — the ONLY string union in the contract,
 *  and its exactly FIVE members (no sixth: `§5.5.1`'s `P-LH-SM-2`). */
const REFUSAL_CODES: readonly RefusalCode[] = [
  'unknown-key',
  'duplicate-key',
  'no-node',
  'factory-returned-null',
  'malformed-entry',
]

interface ListEntry<N = unknown> {
  readonly key: ListKey
  readonly node?: N | null
  readonly payload?: unknown
}

interface OwnedListHostOptions {
  readonly mount: unknown | null
  readonly orderOf?: (entry: ListEntry<unknown>) => string | number
  readonly itemFactory?: (entry: ListEntry<unknown>) => unknown | null
  readonly onActivate?: (key: ListKey, entry: ListEntry<unknown>) => void
  readonly onClose?: (key: ListKey, entry: ListEntry<unknown>) => void
  readonly order?: readonly ListKey[]
}

interface ListHostRefusal {
  /** `§2.1` ⟶ AMENDED 2026-09-27 (the TestWriter-handoff pass; finding 5): the
   *  field is `unknown`, NOT `ListKey` — it holds the supplied value VERBATIM
   *  (a `ListKey` when the input was a string; `42`/`null`/`{}` when it was not),
   *  with no `String(...)` coercion and no trim. The as-filed `readonly key:
   *  ListKey` could not hold the non-string keys `§3.2 F-5` refuses. */
  readonly key: unknown
  readonly code: RefusalCode
  readonly message: string
}

interface ListHostResult {
  readonly ok: boolean
  readonly order: readonly ListKey[]
  readonly placed: readonly unknown[]
  readonly removed: readonly unknown[]
  readonly refused: readonly ListHostRefusal[]
}

interface OwnedListHost {
  setEntries(entries: readonly ListEntry<unknown>[] | null | undefined): ListHostResult
  remove(key: ListKey): ListHostResult
  setOrder(keys: readonly ListKey[]): ListHostResult
  render(): ListHostResult
  activate(key: ListKey): ListHostResult
  close(key: ListKey): ListHostResult
  keys(): readonly ListKey[]
  dispose(): void
}

type CreateOwnedListHost = (options: OwnedListHostOptions) => OwnedListHost

/** `§2.1`'s `ListHostResult` field set — asserted by every result-taking row. */
const RESULT_KEYS = ['ok', 'order', 'placed', 'removed', 'refused'].sort()
/** `§2.1`'s eight public methods, in the interface's own order. */
const HOST_METHODS = ['setEntries', 'remove', 'setOrder', 'render', 'activate', 'close', 'keys', 'dispose'] as const
type HostMethod = (typeof HOST_METHODS)[number]
/** The SEVEN exports `§2.1` declares (six of them are type-only). */
const DECLARED_EXPORTS: ReadonlyArray<readonly [name: string, kind: string]> = [
  ['ListKey', 'type'],
  ['ListEntry', 'interface'],
  ['OwnedListHostOptions', 'interface'],
  ['ListHostRefusal', 'interface'],
  ['ListHostResult', 'interface'],
  ['OwnedListHost', 'interface'],
  ['createOwnedListHost', 'function'],
]

// ===========================================================================
// THE IMPORT BOUNDARY (§4.1) + THE SHIM-TREE HELPERS.
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/owned-list-host.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution still applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'owned-list-host.js'].join('/')

type Surface = { create: CreateOwnedListHost | null; mod: Record<string, unknown> | null; reason: string | null }
let surfaceCache: Surface | null = null

/** Resolves `§2.1`'s surface WITHOUT throwing: the reason a row is red is data,
 *  so a clause row can report it and a register row can count it as a broken
 *  attempt (§5.5.1's stop-after-5 discipline). */
async function resolveSurface(): Promise<Surface> {
  if (surfaceCache !== null) return surfaceCache
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = {
      create: null,
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const create = mod['createOwnedListHost']
    surfaceCache =
      typeof create === 'function'
        ? { create: create as CreateOwnedListHost, mod, reason: null }
        : { create: null, mod, reason: "§2.1's `createOwnedListHost` is not exported (or is not a function)" }
  } catch (e) {
    surfaceCache = { create: null, mod: null, reason: `the module does not resolve: ${String(e)}` }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's label, so
 *  the red message is about the absent module/method, never an import type. */
async function surface(label: string): Promise<{ create: CreateOwnedListHost; mod: Record<string, unknown> }> {
  const s = await resolveSurface()
  if (s.create === null) {
    expect(
      s.create,
      `RED — U-LISTHOST red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's createOwnedListHost(options) → OwnedListHost. [${label}]`,
    ).not.toBe(null)
    throw new Error(`U-LISTHOST red set — module absent: ${s.reason ?? 'unavailable'} [${label}]`)
  }
  return { create: s.create, mod: s.mod ?? {} }
}

/** A caller-created node (the host never creates one — `§2.2` prohibition 2). */
function nodeEl(tag = 'div', id = ''): ShimElement {
  const el = mountEl()
  if (tag !== 'div') el.tagName = tag.toUpperCase()
  if (id !== '') el.id = id
  return el
}

function sameRef(a: unknown, b: unknown): boolean {
  return a === b
}

/** A `catch`-and-record drive: the throw is DATA, not an escape. Used by the
 *  `ADV-LH-1`/`ADV-LH-3` regression rows, whose whole assertion is that a
 *  caller-supplied injected function's throw NEVER escapes a method
 *  (`§2.1`'s totality clause + its totality-extends-to-injected-functions
 *  clause). `null` in `thrown` means the drive did not escape. */
type DriveRecord = { label: string; thrown: unknown; value: unknown }
function tryDrive(label: string, fn: () => unknown): DriveRecord {
  try {
    return { label, thrown: null, value: fn() }
  } catch (e) {
    return { label, thrown: e, value: undefined }
  }
}

/** The first escaped drive of a list, as one sentence — `null` when none
 *  escaped (the property HOLDS). */
function firstEscape(drives: readonly DriveRecord[]): string | null {
  for (const d of drives) {
    if (d.thrown !== null) {
      const kind = d.thrown instanceof Error ? `${d.thrown.name}: ${d.thrown.message}` : String(d.thrown)
      return `${d.label} ESCAPED (${kind}) — §2.1: no method of this host throws, for any input, and a caller-supplied injected function's throw is CAUGHT with the safe default named for that injection`
    }
  }
  return null
}

/** The escaped drives as a multi-line report (for the assertion message). */
function escapeReport(drives: readonly DriveRecord[]): string {
  const escaped = drives.filter((d) => d.thrown !== null)
  if (escaped.length === 0) return '(none escaped)'
  return escaped
    .map((d) => `  · ${d.label} → ${d.thrown instanceof Error ? `${d.thrown.name}: ${d.thrown.message}` : String(d.thrown)}`)
    .join('\n')
}

function childrenOf(mount: unknown): unknown[] {
  if (mount === null || mount === undefined || typeof mount !== 'object') return []
  const c = (mount as { children?: unknown }).children
  return Array.isArray(c) ? c : []
}

function snapshotChildren(mount: unknown): unknown[] {
  return [...childrenOf(mount)]
}

function containsRef(haystack: readonly unknown[], needle: unknown): boolean {
  return haystack.some((x) => sameRef(x, needle))
}

/** The host-owned / foreign split of a mount's direct children, by reference. */
function foreignSubsequence(mount: unknown, foreign: readonly ShimElement[]): unknown[] {
  return childrenOf(mount).filter((c) => foreign.some((f) => sameRef(f, c)))
}

function expectRefsEqual(actual: readonly unknown[], expected: readonly unknown[], label: string): void {
  expect(actual.length, `${label} — length`).toBe(expected.length)
  for (let i = 0; i < expected.length; i += 1) {
    expect(actual[i], `${label} — element ${i} is the SAME object, at the same index`).toBe(expected[i])
  }
}

/** The mount's own observable surface (`§2.3` item 3 / `I-3`). */
function mountSurface(mount: unknown): string {
  const kids = childrenOf(mount)
  const attrs = mount !== null && typeof mount === 'object' ? (mount as { attrs?: unknown }).attrs : undefined
  return JSON.stringify({ childCount: kids.length, attrs: attrs ?? null })
}

/** The mount's ATTRIBUTE surface ONLY — the half of `mountSurface` that is
 *  legitimately invariant across a host's life (`§2.3` item 2: the host writes
 *  no attribute on anything; `§3.3 I-4`). The `childCount` half is NOT invariant:
 *  placement adds children and `remove`/`close` take the host's own child back
 *  out (`§3.1 M-2`/`M-11`), so a whole-`mountSurface` comparison across a
 *  placement is unsatisfiable by any conforming host.
 *
 *  **⟶ HARNESS FIX 2026-09-27 (the red/green test-harness remand; the `I-4`
 *  baseline/assertion defect).** `I-4` captured `mountSurface(mount)` BEFORE the
 *  host existed (`childCount: 0`) and compared it to the mount at the end of a
 *  sequence that had placed two caller nodes and removed one — so the row could
 *  only have passed for a host that removed a node the caller never asked it to
 *  remove, exactly what `§2.3` item 2 and `§3.1 M-2`/`M-11` forbid. The row's
 *  stated intent (no attribute/class/style/text write on the mount) is asserted
 *  through THIS helper, and the child-count claim is stated separately, against
 *  the contract-forced sequence. */
function mountAttrSurface(mount: unknown): string {
  const attrs = mount !== null && typeof mount === 'object' ? (mount as { attrs?: unknown }).attrs : undefined
  return JSON.stringify(attrs ?? null)
}

/** One method drive: the subject of `§2.1`'s "no method of this host throws —
 *  for any input" (`§3.3 I-8`). Driven ONCE (never twice — a double drive would
 *  change a callback count). */
function drive(fn: () => unknown, label: string): unknown {
  let out: unknown = undefined
  let thrown: unknown = null
  try {
    out = fn()
  } catch (e) {
    thrown = e
  }
  expect(
    thrown,
    `${label} — §2.1: no method of this host throws, for any input (it threw: ${
      thrown instanceof Error ? thrown.message : String(thrown)
    })`,
  ).toBe(null)
  return out
}

/** The `ListHostResult` shape check: the exact `§2.1` field set, the four array
 *  fields, and `ok === (refused.length === 0)` (`§3.3 I-1`). */
function asResult(value: unknown, label: string): ListHostResult {
  expect(value !== null && typeof value === 'object', `${label} — §2.1: a ListHostResult object is returned`).toBe(true)
  const r = value as ListHostResult
  expect(Object.keys(r).sort(), `${label} — §2.1: the exact ListHostResult field set {ok, order, placed, removed, refused}`).toEqual(
    RESULT_KEYS,
  )
  expect(Array.isArray(r.order), `${label} — §2.1: order is an array`).toBe(true)
  expect(Array.isArray(r.placed), `${label} — §2.1: placed is an array`).toBe(true)
  expect(Array.isArray(r.removed), `${label} — §2.1: removed is an array`).toBe(true)
  expect(Array.isArray(r.refused), `${label} — §2.1: refused is an array`).toBe(true)
  expect(
    r.ok,
    `${label} — §3.3 I-1: ok === (refused.length === 0); got ok=${String(r.ok)} with refused.length=${r.refused.length}`,
  ).toBe(r.refused.length === 0)
  return r
}

/** Per-key identity: `placed[order.indexOf(key)]` must be the very object the
 *  caller supplied (or the factory returned) — `§2.3` item 5 / `I-6`. */
function identityBreak(res: ListHostResult, suppliedByKey: Record<string, unknown>, label: string): string | null {
  for (const [key, node] of Object.entries(suppliedByKey)) {
    const idx = res.order.indexOf(key)
    if (idx < 0) return `${label}: the owned key '${key}' is absent from order (${JSON.stringify(res.order)})`
    if (!sameRef(res.placed[idx], node)) {
      return `${label}: placed[${idx}] (key '${key}') is NOT the object supplied for it — the host re-parented, cloned or re-created a caller node`
    }
  }
  const counted = new Map<string, number>()
  for (const k of res.order) counted.set(k, (counted.get(k) ?? 0) + 1)
  for (const [k, n] of counted) if (n !== 1) return `${label}: order names '${k}' ${n} times (each owned key exactly once, §3.3 I-7)`
  return null
}

function keysConsistentWithOrder(res: ListHostResult, keys: readonly ListKey[], label: string): string | null {
  if (keys.length !== res.order.length) return `${label}: keys().length === ${keys.length} but order.length === ${res.order.length}`
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== res.order[i]) return `${label}: keys()[${i}] === ${JSON.stringify(keys[i])} but order[${i}] === ${JSON.stringify(res.order[i])}`
  }
  return null
}

// ===========================================================================
// §2.2 static-source readers (the rows over the module FILE).
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-LISTHOST red set (§4.1): the static rows read the module file of §2.2/§2.4/§5.1 and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return readFileSync(MODULE_SRC, 'utf8')
}

/** Strip comments while PRESERVING line structure (so a hit's line number is the
 *  real one). String literals are kept: a forbidden token in a string is still a
 *  forbidden token in code. */
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
    expect(hits, `${prefix} — '${what}' must not appear in the module: ${JSON.stringify(hits)}`).toEqual([])
  }
}

/** A short, verbatim rendering of a malformed argument for a row's message. */
function brief(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value)
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return '<function>'
  try {
    return JSON.stringify(value) ?? String(value)
  } catch {
    return String(value)
  }
}

/** `§2.1`'s `ListHostRefusal.key` is `unknown` after the 2026-09-27 amendment:
 *  it holds the supplied value VERBATIM. This is the assertion helper for that
 *  field — one `===`-by-value comparison that needs no type narrowing, so every
 *  refusal-key row is legal under `npm run typecheck` (no cast, no `String()`).
 *
 *  **⟶ HARNESS FIX 2026-09-27 (the red/green test-harness remand; finding 1).**
 *  This helper was as-filed a *predicate factory* — `keyIdentity(expected)`
 *  returned `(actual) => actual === expected` — and every row below handed that
 *  returned **function** to `.toBe(...)`. `toBe` is `Object.is`, so a value was
 *  being compared against a function and could never match ("expected 'k' to be
 *  [Function anonymous]"): a TEST defect, with no bearing on the module. The
 *  factory is removed. The comparison now **takes both sides and returns the
 *  boolean** (`keyIsVerbatim(expected, actual)`), so the rows assert
 *  `expect(keyIsVerbatim(key, r.refused[0].key), '…').toBe(true)`. The
 *  comparison itself is UNCHANGED and is still one verbatim `===`: no `String()`,
 *  no `JSON.stringify`, no trim, no case-fold, no unicode normalization — every
 *  row's intent and message text is untouched. */
function keyIsVerbatim(expected: unknown, actual: unknown): boolean {
  return actual === expected
}

/** The caller node's own observable surface — `§3.3 I-4`: the host writes NO
 *  attribute, class, style or text. */
function nodeSurface(el: ShimElement): string {
  return JSON.stringify({
    tagName: el.tagName,
    attrs: el.attrs,
    id: el.id,
    className: el.className,
    styleCssText: el.style.cssText,
    textContent: el.textContent,
    value: el.value,
    listeners: Object.keys(el.listeners),
  })
}

/** The declared shape of ONE drive, per `§2.1`: a `ListHostResult` for the SIX
 *  result-returning methods (`setEntries`, `remove`, `setOrder`, `render`,
 *  `activate`, `close`), `readonly ListKey[]` for `keys()` and `void` for
 *  `dispose()`. `§5.5.1`'s `P-LH-TP-1` cell said "the SEVEN result-returning
 *  methods" AS FILED; that was a mis-count, and `§2.1`'s surface census — EIGHT
 *  declared methods, SIX returning a `ListHostResult` — is now stated in the
 *  spec itself (CORRECTED 2026-09-27, finding 4). This helper pins `§2.1`'s own
 *  declarations, and the register row's title/comment pins the corrected count. */
function shapeBreaks(value: unknown, method: HostMethod, label: string): string[] {
  const breaks: string[] = []
  if (method === 'keys') {
    if (!Array.isArray(value)) breaks.push(`${label}: keys() did not return an array`)
    else for (const k of value) if (typeof k !== 'string') breaks.push(`${label}: keys() returned a non-string entry ${brief(k)}`)
    return breaks
  }
  if (method === 'dispose') {
    if (value !== undefined) breaks.push(`${label}: dispose() returned ${brief(value)} — §2.1 declares void`)
    return breaks
  }
  if (value === null || typeof value !== 'object') {
    breaks.push(`${label}: ${method}() did not return a ListHostResult (got ${brief(value)})`)
    return breaks
  }
  const r = value as ListHostResult
  const keys = Object.keys(r).sort()
  if (JSON.stringify(keys) !== JSON.stringify(RESULT_KEYS)) {
    breaks.push(`${label}: the ListHostResult field set is ${JSON.stringify(keys)} (expected ${JSON.stringify(RESULT_KEYS)})`)
  }
  for (const field of ['order', 'placed', 'removed', 'refused'] as const) {
    if (!Array.isArray(r[field])) breaks.push(`${label}: '${field}' is not an array`)
  }
  if (!Array.isArray(r.refused)) return breaks
  if (r.ok !== (r.refused.length === 0)) {
    breaks.push(`${label}: ok === ${String(r.ok)} with refused.length === ${r.refused.length} (§3.3 I-1)`)
  }
  for (const ref of r.refused) {
    if (ref === null || typeof ref !== 'object') {
      breaks.push(`${label}: a refusal is not an object (${brief(ref)})`)
      continue
    }
    if (!REFUSAL_CODES.includes(ref.code)) {
      breaks.push(`${label}: refusal code ${brief(ref.code)} is outside the five-member vocabulary (no sixth)`)
    }
    if (!hasOwn.call(ref, 'key')) breaks.push(`${label}: a refusal carries no 'key' field (§2.1)`)
    if (typeof ref.message !== 'string' || ref.message.length === 0) breaks.push(`${label}: a refusal carries no non-empty message (§2.1)`)
  }
  return breaks
}

/** The `P-LH-TP-1` shape assertion of one drawn attempt, plus "order is always a
 *  permutation of a subset of the keys the host has been given". */
function tpShapeBreak(value: unknown, method: HostMethod, givenKeys: readonly ListKey[], label: string): string | null {
  const breaks = shapeBreaks(value, method, label)
  if (breaks.length > 0) return breaks.join(' | ')
  if (method === 'keys' || method === 'dispose') return null
  const r = value as ListHostResult
  if (new Set(r.order).size !== r.order.length) return `${label}: order repeats a key (${brief(r.order)}) — §2.1: each owned key once`
  for (const k of r.order) {
    if (typeof k !== 'string') return `${label}: order carries a non-string key ${brief(k)}`
    if (!givenKeys.includes(k)) return `${label}: order carries '${k}', a key the host was never given (${brief(givenKeys)})`
  }
  return null
}

type HostCallArgs = { setEntriesArg: unknown; keyArg: unknown; orderArg: unknown }

/** One public-method drive with the fixed per-method argument form. */
function callHostMethod(h: OwnedListHost, method: HostMethod, args: HostCallArgs): unknown {
  switch (method) {
    case 'setEntries':
      return h.setEntries(args.setEntriesArg as never)
    case 'remove':
      return h.remove(args.keyArg as never)
    case 'setOrder':
      return h.setOrder(args.orderArg as never)
    case 'render':
      return h.render()
    case 'activate':
      return h.activate(args.keyArg as never)
    case 'close':
      return h.close(args.keyArg as never)
    case 'keys':
      return h.keys()
    case 'dispose':
      return h.dispose()
    default:
      return undefined
  }
}

/** `P-LH-TP-1`'s ordered pool of **22 input shapes**, exactly as `§5.5.1`
 *  enumerates it. Each shape supplies the host options and the fixed per-method
 *  argument forms; `options` receives the factory because one shape (a mount
 *  already holding host-placed children) is built BY a prior host instance. */
type TpShape = {
  id: string
  options: (create: CreateOwnedListHost) => OwnedListHostOptions
  entryArg: () => unknown
  keyArg: () => unknown
  orderArg: () => unknown
}
const TP_POOL: readonly TpShape[] = [
  { id: 'null', options: () => ({ mount: mountEl() }), entryArg: () => null, keyArg: () => null, orderArg: () => null },
  { id: 'undefined', options: () => ({ mount: mountEl() }), entryArg: () => undefined, keyArg: () => undefined, orderArg: () => undefined },
  { id: '42', options: () => ({ mount: mountEl() }), entryArg: () => 42, keyArg: () => 42, orderArg: () => 42 },
  { id: 'NaN', options: () => ({ mount: mountEl() }), entryArg: () => NaN, keyArg: () => NaN, orderArg: () => NaN },
  { id: "''", options: () => ({ mount: mountEl() }), entryArg: () => '', keyArg: () => '', orderArg: () => '' },
  { id: "'x'", options: () => ({ mount: mountEl() }), entryArg: () => 'x', keyArg: () => 'x', orderArg: () => 'x' },
  { id: '[]', options: () => ({ mount: mountEl() }), entryArg: () => [], keyArg: () => [], orderArg: () => [] },
  { id: '[{}]', options: () => ({ mount: mountEl() }), entryArg: () => [{}], keyArg: () => ({}), orderArg: () => [{}] },
  {
    id: '[{key:42}]',
    options: () => ({ mount: mountEl() }),
    entryArg: () => [{ key: 42, node: nodeEl('div', 'key-42') }],
    keyArg: () => 42,
    orderArg: () => [42],
  },
  {
    id: 'a non-string key ({key:null})',
    options: () => ({ mount: mountEl() }),
    entryArg: () => [{ key: null, node: nodeEl('div', 'key-null') }],
    keyArg: () => null,
    orderArg: () => [null],
  },
  {
    id: 'an entry with no node and no factory',
    options: () => ({ mount: mountEl() }),
    entryArg: () => [{ key: 'no-node' }],
    keyArg: () => 'no-node',
    orderArg: () => ['no-node'],
  },
  {
    id: 'itemFactory: () => null',
    options: () => ({ mount: mountEl(), itemFactory: () => null }),
    entryArg: () => [{ key: 'fnull' }],
    keyArg: () => 'fnull',
    orderArg: () => ['fnull'],
  },
  {
    id: 'a detached node',
    options: () => ({ mount: mountEl() }),
    entryArg: () => {
      const detached = nodeEl('div', 'detached')
      const mount = mountEl()
      mount.appendChild(detached)
      detached.remove() // the caller detaches it BEFORE handing it to the host
      return [{ key: 'detached', node: detached }]
    },
    keyArg: () => 'detached',
    orderArg: () => ['detached'],
  },
  {
    id: 'a ShimElement mount already holding host-placed children',
    options: (create) => {
      const mount = mountEl()
      const prior = create({ mount })
      prior.setEntries([{ key: 'prior-a', node: nodeEl('div', 'prior-a') }, { key: 'prior-b', node: nodeEl('div', 'prior-b') }])
      prior.render()
      return { mount }
    },
    entryArg: () => [{ key: 'new-a', node: nodeEl('div', 'new-a') }],
    keyArg: () => 'new-a',
    orderArg: () => ['new-a'],
  },
  { id: 'mount: null', options: () => ({ mount: null }), entryArg: () => [{ key: 'a', node: nodeEl('div', 'a') }], keyArg: () => 'a', orderArg: () => ['a'] },
  { id: 'mount: {}', options: () => ({ mount: {} as never }), entryArg: () => [{ key: 'a', node: nodeEl('div', 'a') }], keyArg: () => 'a', orderArg: () => ['a'] },
  { id: 'mount: 42', options: () => ({ mount: 42 as never }), entryArg: () => [{ key: 'a', node: nodeEl('div', 'a') }], keyArg: () => 'a', orderArg: () => ['a'] },
  { id: "mount: 'div'", options: () => ({ mount: 'div' as never }), entryArg: () => [{ key: 'a', node: nodeEl('div', 'a') }], keyArg: () => 'a', orderArg: () => ['a'] },
  {
    id: 'a frozen array',
    options: () => ({ mount: mountEl() }),
    entryArg: () => Object.freeze([Object.freeze({ key: 'frozen', node: nodeEl('div', 'frozen') })]),
    keyArg: () => 'frozen',
    orderArg: () => Object.freeze(['frozen']),
  },
  {
    id: 'a caller array also held by the test',
    options: () => ({ mount: mountEl() }),
    entryArg: () => TP_HELD_ARRAY,
    keyArg: () => 'held',
    orderArg: () => TP_HELD_KEYS,
  },
  {
    id: 'a duplicate-key pair',
    options: () => ({ mount: mountEl() }),
    entryArg: () => [{ key: 'dup', node: nodeEl('div', 'dup-1') }, { key: 'dup', node: nodeEl('div', 'dup-2') }],
    keyArg: () => 'dup',
    orderArg: () => ['dup', 'dup'],
  },
  {
    id: "a key of ''",
    options: () => ({ mount: mountEl() }),
    entryArg: () => [{ key: '', node: nodeEl('div', 'empty-key') }],
    keyArg: () => '',
    orderArg: () => [''],
  },
]
/** The "caller array also held by the test" shape (`§5.5.1` pool item 20): the
 *  SAME array object the row hands to the host, so an aliasing store is visible. */
const TP_HELD_ARRAY: ListEntry<unknown>[] = [{ key: 'held', node: nodeEl('div', 'held') }]
const TP_HELD_KEYS: ListKey[] = ['held']

/** The keys a host has been given by a shape's `setEntries` argument. */
function givenKeysOf(entryArg: unknown): ListKey[] {
  if (!Array.isArray(entryArg)) return []
  const out: ListKey[] = []
  for (const e of entryArg) {
    if (e !== null && typeof e === 'object' && typeof (e as { key?: unknown }).key === 'string') out.push((e as { key: string }).key)
  }
  return out
}

/** ONE `P-LH-TP-1` attempt: build the shape's host, drive the FIXED argument
 *  form of the drawn method, and report a break cause when anything throws or
 *  when the declared shape/invariants do not hold. */
function tpAttempt(create: CreateOwnedListHost, shape: TpShape, method: HostMethod, label: string): string | null {
  const entryArg = shape.entryArg()
  const keyArg = shape.keyArg()
  const orderArg = shape.orderArg()
  let options: OwnedListHostOptions
  let h: OwnedListHost
  try {
    options = shape.options(create)
    h = create(options)
  } catch (e) {
    return `${label}: building the host THREW: ${e instanceof Error ? e.message : String(e)} (§2.1: no method throws, for any input)`
  }
  if (h === null || typeof h !== 'object') return `${label}: createOwnerListHost did not return a host object`
  if (method !== 'setEntries') {
    try {
      h.setEntries(entryArg as never)
    } catch (e) {
      return `${label}: the preamble setEntries(${brief(entryArg)}) THREW: ${e instanceof Error ? e.message : String(e)}`
    }
  }
  let value: unknown
  try {
    value = callHostMethod(h, method, { setEntriesArg: entryArg, keyArg, orderArg })
  } catch (e) {
    return `${label}: ${method}(${brief(method === 'setEntries' ? entryArg : method === 'setOrder' ? orderArg : method === 'render' || method === 'keys' || method === 'dispose' ? '' : keyArg)}) THREW: ${
      e instanceof Error ? e.message : String(e)
    } (§3.3 I-8 / §5.5.1 P-LH-TP-1)`
  }
  return tpShapeBreak(value, method, givenKeysOf(entryArg), label)
}

// ===========================================================================
// §5.5.1 — THE PROPERTY REGISTER'S EXECUTION MACHINERY.
// Caps (uniform for the whole register): ≤100 attempts per row, ≤400 attempts in
// total, rows evaluated sequentially in register order, STOP AFTER 5
// CONSECUTIVE FAILURES (the running row's remaining attempts are abandoned and
// no further row starts). Each row's `it` title carries its row id AND its
// strategy id, and each row logs its own record line so the audit can read
// attempts-run / held / broken per row from the output.
// ===========================================================================
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const SEED = 20260927
const LCG_A = 1664525
const LCG_C = 1013904223
const LCG_MOD = 4294967296

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

  /** ONE attempt. `body` returns `null` when the property HELD, else the break
   *  cause as a sentence (a throw is caught and is itself a break cause). */
  run(label: string, body: () => string | null): void {
    if (registerState.stoppedAtRow !== null) {
      // The register is stopped: no further row starts. A row that already ran
      // attempts is NOT "not started" (its own record keeps its counts).
      if (this.attemptsRun === 0) this.notStarted = true
      return
    }
    if (this.attemptsRun >= REGISTER_ROW_CAP) {
      this.stoppedEarly = true
      this.causes.push(`the ≤${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the ≤${REGISTER_TOTAL_CAP}-attempts register cap was reached`
      return
    }
    this.attemptsRun += 1
    registerState.attempts += 1
    let cause: string | null = null
    try {
      cause = body()
    } catch (e) {
      cause = `the attempt threw: ${e instanceof Error ? e.message : String(e)}`
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

  /** The row's own verdict + its `§5.5.1`/`§5.3` item 9 record line. An un-run
   *  row FAILS on purpose: an un-executed register row may not look green. */
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
    const line = `§5.5.1 register record :: ${JSON.stringify(record)}`
    console.log(line)
    if (this.attemptsRun === 0) {
      expect(
        this.attemptsRun,
        `${line} — this row NEVER STARTED: the register's stop-after-${CONSECUTIVE_FAILURE_CAP}-consecutive-failures ` +
          `discipline triggered at row ${registerState.stoppedAtRow ?? 'an earlier row'} (${registerState.stoppedFor ?? 'cause unrecorded'}). ` +
          `An un-run register row is reported as a FAILURE, never as a pass (§5.5.1 cap 3).`,
      ).toBeGreaterThan(0)
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

/** The pinned-seed generator of `S-LH-SEED-1`: a hand-rolled 32-bit LCG whose
 *  constants are literals in THIS file. No `Math.random`, no wall-clock seed, no
 *  shrinking, no adaptive search. `next(k) = floor(stateₙ₊₁ / 2³² · k)`; the
 *  pool is indexed `state mod pool.length`. */
function makeLcg(seed: number): { next: (k: number) => number; state: () => number } {
  let state = seed >>> 0
  return {
    next(k: number): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return Math.floor((state / LCG_MOD) * k)
    },
    state: (): number => state,
  }
}

/** `S₃` and `S₄` — HAND-AUTHORED permutation tables (literal key arrays: no
 *  generator, no library). 6 + 24 = the `30` exhaustive permutation attempts that
 *  `P-LH-IM-1` and `P-LH-IM-2` each drive; `P-LH-IM-1`'s own total is `33`
 *  (`+` its 3-shape partial table) per `§5.5.1`'s corrected arithmetic. */
const S3_KEYS: readonly string[] = ['a', 'b', 'c']
const S4_KEYS: readonly string[] = ['a', 'b', 'c', 'd']
const PERMS_S3: ReadonlyArray<readonly string[]> = [
  ['a', 'b', 'c'],
  ['a', 'c', 'b'],
  ['b', 'a', 'c'],
  ['b', 'c', 'a'],
  ['c', 'a', 'b'],
  ['c', 'b', 'a'],
]
const PERMS_S4: ReadonlyArray<readonly string[]> = [
  ['a', 'b', 'c', 'd'],
  ['a', 'b', 'd', 'c'],
  ['a', 'c', 'b', 'd'],
  ['a', 'c', 'd', 'b'],
  ['a', 'd', 'b', 'c'],
  ['a', 'd', 'c', 'b'],
  ['b', 'a', 'c', 'd'],
  ['b', 'a', 'd', 'c'],
  ['b', 'c', 'a', 'd'],
  ['b', 'c', 'd', 'a'],
  ['b', 'd', 'a', 'c'],
  ['b', 'd', 'c', 'a'],
  ['c', 'a', 'b', 'd'],
  ['c', 'a', 'd', 'b'],
  ['c', 'b', 'a', 'd'],
  ['c', 'b', 'd', 'a'],
  ['c', 'd', 'a', 'b'],
  ['c', 'd', 'b', 'a'],
  ['d', 'a', 'b', 'c'],
  ['d', 'a', 'c', 'b'],
  ['d', 'b', 'a', 'c'],
  ['d', 'b', 'c', 'a'],
  ['d', 'c', 'a', 'b'],
  ['d', 'c', 'b', 'a'],
]

// ===========================================================================
// PRE-1..PRE-3 — HARNESS PRECONDITIONS (not spec rows). They are the
// instruments every row above depends on, asserted so a red row cannot be a
// harness artefact. All three are expected GREEN today.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['mountEl']).toBe('function')
    const cast = mod['mountEl'] as unknown as () => { children: unknown[] }
    expect(Array.isArray(cast().children), 'the shim surface is reachable through the boundary technique').toBe(true)
  })

  it('PRE-2 the pinned-seed LCG is the literal one §5.5.1 `S-LH-SEED-1` names (constants frozen)', () => {
    // The FIRST three draws from seed 20260927, computed from the literals
    // above, are pinned so a later edit of a constant reddens HERE.
    const s1 = (SEED * LCG_A + LCG_C) % LCG_MOD
    const s2 = (s1 * LCG_A + LCG_C) % LCG_MOD
    const s3 = (s2 * LCG_A + LCG_C) % LCG_MOD
    const lcg = makeLcg(SEED)
    const draws = [lcg.next(1000), lcg.next(1000), lcg.next(1000)]
    expect(lcg.state(), 'after three steps the state is state₃').toBe(s3)
    expect(draws, 'the pinned draws from seed 20260927 are reproducible literals').toEqual([
      Math.floor((s1 / LCG_MOD) * 1000),
      Math.floor((s2 / LCG_MOD) * 1000),
      Math.floor((s3 / LCG_MOD) * 1000),
    ])
    expect(draws.every((d) => Number.isInteger(d) && d >= 0 && d < 1000)).toBe(true)
    expect(SEED, 'the seed is the pinned literal').toBe(20260927)
  })

  it('PRE-3 the register tables are the ones §5.5.1 specifies (sizes, exhaustiveness, pool, arithmetic)', () => {
    const permKey = (p: readonly string[]) => p.join('')
    expect(PERMS_S3.length, 'S₃ has 6 permutations').toBe(6)
    expect(PERMS_S4.length, 'S₄ has 24 permutations').toBe(24)
    expect(new Set(PERMS_S3.map(permKey)).size, 'S₃ entries are distinct').toBe(6)
    expect(new Set(PERMS_S4.map(permKey)).size, 'S₄ entries are distinct').toBe(24)
    for (const p of PERMS_S3) expect([...p].sort(), 'every S₃ entry is a permutation of {a,b,c}').toEqual(['a', 'b', 'c'])
    for (const p of PERMS_S4) expect([...p].sort(), 'every S₄ entry is a permutation of {a,b,c,d}').toEqual(['a', 'b', 'c', 'd'])
    expect(TP_POOL.length, "§5.5.1 P-LH-TP-1's input pool is 22 shapes (the EXECUTED pool; `ADV-LH-7` reconciles the cell's `20`-member list to this count — see the contradiction recorded at that row's comment)").toBe(22)
    expect(new Set(TP_POOL.map((s) => s.id)).size, 'the 22 pool shapes are distinct').toBe(22)
    // THE ARITHMETIC, checked against THIS file's own tables. `§5.5.1` states the
    // CORRECTED total (2026-09-27, finding 4/the arithmetic correction):
    // `168` = `33 + 34 + 8 + 5 + 8 + 8 + 72`, where `33` = the `6` `S₃` + `24` `S₄`
    // permutations + PARTIAL_SHAPES.length (the `3` partial-`setOrder` drives for
    // `F-8`), and `72` = the `64` pinned-seed draws + the fixed after-`dispose()`
    // sweep of all `HOST_METHODS.length` (`8`) methods. The as-filed `157` omitted
    // exactly those `+3` and `+8` terms; what this file DRIVES is unchanged.
    const arithmetic = {
      'P-LH-IM-1': PERMS_S3.length + PERMS_S4.length + PARTIAL_SHAPES.length,
      'P-LH-IM-2': PERMS_S3.length + PERMS_S4.length + 4,
      'P-LH-IM-3': 4 * 2,
      'P-LH-IM-4': 5,
      'P-LH-SM-1': 4 * 2,
      'P-LH-SM-2': 8,
      'P-LH-TP-1': 64 + HOST_METHODS.length,
    }
    const total = Object.values(arithmetic).reduce((a, b) => a + b, 0)
    expect(
      total,
      "the register total, computed from THIS file's tables — §5.5.1's CORRECTED arithmetic (33+34+8+5+8+8+72 = 168)",
    ).toBe(168)
    for (const [row, n] of Object.entries(arithmetic)) expect(n, `${row} is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(total, `the register total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
  })
})

/** The third FIXED table of `P-LH-IM-1`/`S-LH-PERM-1` (the `§3.2 F-8` shape).
 *  `§5.5.1`'s CORRECTED arithmetic (2026-09-27) COUNTS these `3` `setOrder`
 *  drives as part of `P-LH-IM-1`'s total (`6 + 24 + 3 = 33`), where the as-filed
 *  `30`/`157` form omitted them. */
const PARTIAL_SHAPES: ReadonlyArray<readonly string[]> = [['c', 'a'], ['c', 'a', 'nope'], ['a', 'a', 'c']]

// ===========================================================================
// I-1..I-9 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — ok === (refused.length === 0) in EVERY state (no "ok with refusals" state exists)', async () => {
    const { create } = await surface('I-1')
    const cases: Array<{ id: string; make: () => unknown }> = [
      { id: 'M-1 (an empty set on a fresh mount)', make: () => create({ mount: mountEl() }).setEntries([]) },
      {
        id: 'M-2 (three caller nodes, no orderOf)',
        make: () =>
          create({ mount: mountEl() }).setEntries([
            { key: 'a', node: nodeEl('div', 'a') },
            { key: 'b', node: nodeEl('div', 'b') },
            { key: 'c', node: nodeEl('div', 'c') },
          ]),
      },
      {
        id: 'F-2 (a duplicate key in one call)',
        make: () =>
          create({ mount: mountEl() }).setEntries([
            { key: 'k', node: nodeEl('div', 'k1') },
            { key: 'k', node: nodeEl('div', 'k2') },
          ]),
      },
      { id: 'F-3 (an entry with no node and no factory)', make: () => create({ mount: mountEl() }).setEntries([{ key: 'k' }]) },
      {
        id: 'F-4 (the factory returns null)',
        make: () => create({ mount: mountEl(), itemFactory: () => null }).setEntries([{ key: 'k' }]),
      },
      {
        id: 'F-5 (a malformed entry — a non-string key)',
        make: () => create({ mount: mountEl() }).setEntries([{ key: 42 as never, node: nodeEl() }]),
      },
      {
        id: 'F-1 (an unknown key on remove)',
        make: () => {
          const h = create({ mount: mountEl() })
          h.setEntries([])
          return h.remove('nope')
        },
      },
      { id: 'F-1 (an unknown key on activate)', make: () => create({ mount: mountEl() }).activate('nope') },
      { id: 'F-1 (an unknown key on close)', make: () => create({ mount: mountEl() }).close('nope') },
      { id: 'M-15 (a null mount, a valid input)', make: () => create({ mount: null }).setEntries([{ key: 'a', node: nodeEl('div', 'a') }]) },
      { id: 'M-16 (a malformed mount surface, a valid input)', make: () => create({ mount: {} as never }).setEntries([{ key: 'a', node: nodeEl('div', 'a') }]) },
      {
        id: 'F-8 (setOrder with unknown and duplicate keys)',
        make: () => {
          const h = create({ mount: mountEl() })
          h.setEntries([{ key: 'a', node: nodeEl('div', 'a') }])
          return h.setOrder(['a', 'a', 'nope'])
        },
      },
      { id: 'M-14 (dispose() itself is void, so its drive is checked separately)', make: () => create({ mount: mountEl() }).render() },
    ]
    for (const c of cases) {
      const r = asResult(drive(c.make, `I-1 ${c.id}`), `I-1 ${c.id}`)
      expect(r.ok, `I-1 ${c.id}: ok === (refused.length === 0)`).toBe(r.refused.length === 0)
      for (const ref of r.refused) {
        expect(
          REFUSAL_CODES.includes(ref.code),
          `I-1 ${c.id}: every refusal code is one of the five declared members — got ${JSON.stringify(ref.code)}`,
        ).toBe(true)
      }
    }
  })

  it('I-2 §3.3 — a render() with unchanged inputs performs NO child mutation (removed === [] and no re-append)', async () => {
    const { create } = await surface('I-2')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'I-2 setEntries')
    const first = asResult(drive(() => h.render(), 'I-2 render #1'), 'I-2 render #1')
    expectRefsEqual(childrenOf(mount), [a, b], 'I-2 precondition: the mount holds the two placed nodes, in the projected order')
    const before = snapshotChildren(mount)
    const second = asResult(drive(() => h.render(), 'I-2 render #2'), 'I-2 render #2')
    expect(second.removed, 'I-2: a render with unchanged inputs removes NOTHING').toEqual([])
    expect(second.order, 'I-2: the projection is unchanged').toEqual(first.order)
    expectRefsEqual(
      snapshotChildren(mount),
      before,
      'I-2: every child is at the SAME index and the SAME object — nothing was removed and no node was re-appended (a re-append would move it to the end)',
    )
  })

  it('I-3 §3.3 — foreign siblings are reference-identical before and after EVERY call', async () => {
    const { create } = await surface('I-3')
    const mount = mountEl()
    const f1 = nodeEl('div', 'foreign-1')
    const f2 = nodeEl('div', 'foreign-2')
    mount.appendChild(f1)
    mount.appendChild(f2)
    const h = create({ mount, itemFactory: (e) => nodeEl('div', `owned-${String(e.key)}`) })
    const steps: Array<{ id: string; run: () => unknown }> = [
      { id: 'setEntries([a,b])', run: () => h.setEntries([{ key: 'a' }, { key: 'b' }]) },
      { id: 'render()', run: () => h.render() },
      { id: 'setOrder([b,a])', run: () => h.setOrder(['b', 'a']) },
      { id: 'activate(a)', run: () => h.activate('a') },
      { id: 'remove(a)', run: () => h.remove('a') },
      { id: 'setEntries(null)', run: () => h.setEntries(null) },
      { id: 'close(b)', run: () => h.close('b') },
      { id: 'activate(nope) — a refusal must not touch the tree either', run: () => h.activate('nope') },
      { id: 'dispose()', run: () => h.dispose() },
    ]
    for (const s of steps) {
      const value = drive(s.run, `I-3 ${s.id}`)
      expectRefsEqual(foreignSubsequence(mount, [f1, f2]), [f1, f2], `I-3 after ${s.id}: the foreign siblings are the SAME objects, in the SAME relative order`)
      expect(f1.removed, `I-3 after ${s.id}: foreign sibling #1 was never removed (shim \`removed\` flag)`).toBe(false)
      expect(f2.removed, `I-3 after ${s.id}: foreign sibling #2 was never removed (shim \`removed\` flag)`).toBe(false)
      expect(f1.parent, `I-3 after ${s.id}: foreign sibling #1 was never re-parented`).toBe(mount)
      expect(f2.parent, `I-3 after ${s.id}: foreign sibling #2 was never re-parented`).toBe(mount)
      if (value !== null && value !== undefined && typeof value === 'object' && hasOwn.call(value, 'removed')) {
        const r = value as ListHostResult
        expect(
          containsRef(r.removed, f1) || containsRef(r.removed, f2),
          `I-3 after ${s.id}: removed contains no foreign node — got ${JSON.stringify(r.removed.map((x) => (x as ShimElement).id))}`,
        ).toBe(false)
      }
    }
  })

  it('I-4 §3.3 — the host writes ONLY placement and removal of its OWN nodes (no attribute/text/class/style write)', async () => {
    const { create } = await surface('I-4')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    a.setAttribute('data-caller-owned', 'yes')
    a.className = 'caller-class'
    a.style.cssText = 'color: red'
    a.textContent = 'caller text'
    const b = nodeEl('div', 'b')
    b.setAttribute('aria-hidden', 'true')
    const snapshot = { a: nodeSurface(a), b: nodeSurface(b), mountAttrs: mountAttrSurface(mount) }
    const h = create({ mount })
    const placed = asResult(
      drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'I-4 setEntries'),
      'I-4 setEntries',
    )
    // THE BASELINE IS TAKEN **HERE**, not before the host existed: the mount
    // legitimately HOLDS the host's placed children from this point on, and the
    // child count is contract-forced by `§3.1 M-2` (the supplied order IS the
    // child sequence) — so a "mount unchanged" claim measured against the
    // pre-host state is unsatisfiable for any conforming host. What must hold is
    // that after this baseline NOTHING ELSE of the mount's own surface moves:
    // attribute, class, style, text, id, value or listener (`§2.3` item 2,
    // `§3.3 I-4`) — and that the child-count moves are EXACTLY the placement and
    // removal the caller asked for (`§3.1 M-2`/`M-11`).
    const atPlacement = mountSurface(mount)
    const atPlacementCount = childrenOf(mount).length
    expect(atPlacementCount, "I-4 after setEntries: the mount holds exactly the TWO children the caller's setEntries placed (M-2)").toBe(2)
    drive(() => h.render(), 'I-4 render')
    drive(() => h.setOrder(['b', 'a']), 'I-4 setOrder')
    drive(() => h.activate('a'), 'I-4 activate')
    const removed = asResult(drive(() => h.remove('b'), "I-4 remove('b')"), "I-4 remove('b')")
    expect(nodeSurface(a), 'I-4: the caller node\'s own surface is untouched (no attribute, class, style or textContent write)').toEqual(snapshot.a)
    expect(nodeSurface(b), 'I-4: the second caller node\'s surface is untouched').toEqual(snapshot.b)
    // The WHOLE mount surface is compared against the baseline taken at
    // placement: only `childCount` may differ, and only by the ONE node the
    // caller's own `remove('b')` took back out.
    expect(mountAttrSurface(mount), 'I-4: the mount\'s ATTRIBUTE surface never moves (no attribute write on the mount)').toEqual(snapshot.mountAttrs)
    expect(mountAttrSurface(mount), 'I-4: the mount gained and lost no attribute NAME across the whole sequence').toBe(JSON.stringify({}))
    expect(childrenOf(mount).length, "I-4 after remove('b'): the mount holds exactly the ONE caller node no removal asked for (a stays — M-2's placement is the host's only tree write; M-11's remove takes back only the node it placed)").toBe(1)
    expect(containsRef(childrenOf(mount), a), 'I-4: the untouched caller node a is still the mount\'s child').toBe(true)
    expect(containsRef(childrenOf(mount), b), "I-4: b is gone from the mount — and only because the caller asked for remove('b')").toBe(false)
    expect(containsRef(removed.removed, b), "I-4: b left the mount as remove('b')'s OWN removal, by reference (M-11)").toBe(true)
    // With `childCount` accounted for, the mount's FULL surface (childCount AND
    // attrs) is provably equal to the placement baseline MINUS the one removal
    // the caller asked for — every other byte is the baseline's.
    expect(mountSurface(mount), "I-4: the whole mount surface is exactly the placement baseline minus remove('b') — no other write of any kind").toBe(
      JSON.stringify({ childCount: atPlacementCount - 1, attrs: JSON.parse(snapshot.mountAttrs) }),
    )
    expect(placed.placed, 'I-4: setEntries placed exactly the two caller nodes, by reference').toHaveLength(2)
    expect(atPlacement, 'I-4: the placement baseline itself held exactly the two placed children and no attribute').toBe(
      JSON.stringify({ childCount: atPlacementCount, attrs: JSON.parse(snapshot.mountAttrs) }),
    )
  })

  it('I-5 §3.3 — after dispose() the host retains NO owned key, NO placed-node reference and no other state', async () => {
    const { create } = await surface('I-5')
    const mount = mountEl()
    const n1 = nodeEl('div', 'n1')
    const n2 = nodeEl('div', 'n2')
    const n3 = nodeEl('div', 'n3')
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'a', node: n1 }, { key: 'b', node: n2 }, { key: 'c', node: n3 }]), 'I-5 setEntries')
    drive(() => h.dispose(), 'I-5 dispose()')
    expect(h.keys(), 'I-5: no owned key survives dispose()').toEqual([])
    const postRender = asResult(drive(() => h.render(), 'I-5 render() after dispose()'), 'I-5 render() after dispose()')
    expect(postRender.placed, 'I-5: render() after dispose() places nothing').toEqual([])
    expect(postRender.removed, 'I-5: render() after dispose() removes nothing').toEqual([])
    expect(postRender.refused, 'I-5: render() after dispose() refuses nothing').toEqual([])
    expect(postRender.order, 'I-5: the projected order is empty').toEqual([])
    const nz = nodeEl('div', 'z')
    const postSet = asResult(drive(() => h.setEntries([{ key: 'z', node: nz }]), 'I-5 setEntries() after dispose()'), 'I-5 setEntries() after dispose()')
    expect(postSet.placed, 'I-5: a post-dispose setEntries places only THAT call\'s node — no held placed-node reference is replayed').toEqual([nz])
    expect(postSet.removed, 'I-5: the disposed host holds no placed-node reference, so it removes nothing').toEqual([])
    expect(h.keys(), 'I-5: the post-dispose declaration owns exactly its own key').toEqual(['z'])
  })

  it('I-6 §3.3 — for every owned key, placed[i] is reference-identical for the WHOLE life of the entry', async () => {
    const { create } = await surface('I-6')
    const mount = mountEl()
    const supplied: Record<string, ShimElement> = { a: nodeEl('div', 'a'), b: nodeEl('div', 'b'), c: nodeEl('div', 'c') }
    const entries = [supplied.a, supplied.b, supplied.c].map((n, i) => ({ key: ['a', 'b', 'c'][i], node: n }))
    const h = create({ mount })
    const steps: Array<{ id: string; run: () => ListHostResult }> = [
      { id: 'setEntries([a,b,c])', run: () => h.setEntries(entries) },
      { id: 'render()', run: () => h.render() },
      { id: 'setOrder([c,b,a])', run: () => h.setOrder(['c', 'b', 'a']) },
      { id: 'setOrder([b,c,a])', run: () => h.setOrder(['b', 'c', 'a']) },
      { id: 'activate(a)', run: () => h.activate('a') },
      { id: 'setEntries([a,b,c]) again (the same data)', run: () => h.setEntries(entries) },
      { id: 'remove(c)', run: () => h.remove('c') },
    ]
    for (const s of steps) {
      const res = asResult(drive(s.run, `I-6 ${s.id}`), `I-6 ${s.id}`)
      const owned: Record<string, unknown> = {}
      for (const k of res.order) owned[k] = supplied[k]
      const brk = identityBreak(res, owned, `I-6 after ${s.id}`)
      expect(brk, `I-6 after ${s.id}: every owned node is reference-identical to the object the caller supplied`).toBe(null)
    }
  })

  it('I-7 §3.3 — order is EXACTLY the current key set, each key ONCE (and keys() agrees with it)', async () => {
    const { create } = await surface('I-7')
    const mount = mountEl()
    const h = create({ mount })
    const drives: Array<{ id: string; run: () => ListHostResult }> = [
      { id: 'setEntries([a,b,c])', run: () => h.setEntries([{ key: 'a', node: nodeEl('div', 'a') }, { key: 'b', node: nodeEl('div', 'b') }, { key: 'c', node: nodeEl('div', 'c') }]) },
      { id: "setOrder(['c','a','nope'])", run: () => h.setOrder(['c', 'a', 'nope']) },
      { id: "setOrder(['a','a','c'])", run: () => h.setOrder(['a', 'a', 'c']) },
      { id: "remove('b')", run: () => h.remove('b') },
      { id: "close('c')", run: () => h.close('c') },
      { id: "setEntries([{key:'z'}]) with a factory", run: () => h.setEntries([{ key: 'z' }]) },
      { id: 'setEntries(null)', run: () => h.setEntries(null) },
      { id: "setEntries([{key:'x',node}]) after the empty set", run: () => h.setEntries([{ key: 'x', node: nodeEl('div', 'x') }]) },
    ]
    for (const d of drives) {
      const res = asResult(drive(d.run, `I-7 ${d.id}`), `I-7 ${d.id}`)
      expect(new Set(res.order).size, `I-7 after ${d.id}: no key appears twice in order — ${JSON.stringify(res.order)}`).toBe(res.order.length)
      expect([...res.order].sort(), `I-7 after ${d.id}: order is EXACTLY the key set keys() reports`).toEqual([...h.keys()].sort())
      const brk = keysConsistentWithOrder(res, h.keys(), `I-7 after ${d.id}`)
      expect(brk, `I-7 after ${d.id}: §2.1 — keys() reports the SAME keys in the SAME projected order as \`order\``).toBe(null)
    }
  })

  it('I-8 §3.3 — NO method throws for ANY input (the totality claim, a deterministic table)', async () => {
    const { create } = await surface('I-8')
    const preSeededMount = mountEl()
    const preA = nodeEl('div', 'pre-a')
    const preB = nodeEl('div', 'pre-b')
    preSeededMount.appendChild(preA)
    preSeededMount.appendChild(preB)
    const detached = nodeEl('div', 'detached')
    // The OPTION shapes are exactly the ones §3's own rows pin: `§2.1`'s mount
    // doc + `M-15` (null/absent) + `M-16` (a malformed child surface: `{}`, 42,
    // `'div'`) + `I-8`'s own list (arrays-in-place-of-objects, a ShimElement
    // mount already holding children). **Deliberately NOT included: malformed
    // CALLBACKS (`orderOf`/`itemFactory`/`onActivate`/`onClose` as non-functions)
    // and a non-array `order`** — those are the adversarial SEED `A-12`, and
    // §3a states in terms that no seed "is a finding" and none "may be cited as
    // one" until the pass RULES it (§7 item 8 leaves `A-5`/`A-9` unruled for the
    // same reason). Pinning them here would pick an answer the contract has not
    // given; they are reported instead.
    const malformedOptions: Array<{ id: string; options: OwnedListHostOptions }> = [
      { id: 'mount: null', options: { mount: null } },
      { id: 'mount: undefined (absent)', options: { mount: undefined } },
      { id: "mount: 'div'", options: { mount: 'div' as never } },
      { id: 'mount: 42', options: { mount: 42 as never } },
      { id: 'mount: {}', options: { mount: {} as never } },
      { id: 'mount: [] (an array)', options: { mount: [] as never } },
      { id: 'a ShimElement mount already holding children', options: { mount: preSeededMount } },
    ]
    const malformedArgs: unknown[] = [
      null,
      undefined,
      42,
      NaN,
      '',
      'x',
      [],
      [{}],
      [{ key: 42 }],
      [{ key: '' }],
      [{ key: 'k', node: null }],
      [{ key: 'k' }],
      Object.freeze([{ key: 'frozen', node: nodeEl('div', 'frozen') }]),
      detached,
      nodeEl('div', 'a-caller-node-as-an-entry'),
      true,
    ]
    const breaks: string[] = []
    for (const o of malformedOptions) {
      const value = drive(() => create(o.options), `I-8 create(${o.id}) — the constructor must not throw either`)
      if (value === null || typeof value !== 'object') {
        breaks.push(`I-8 create(${o.id}): a host object was not returned`)
        continue
      }
      const h = value as OwnedListHost
      for (const method of HOST_METHODS) {
        if (method === 'render' || method === 'keys' || method === 'dispose') {
          const out = drive(() => callHostMethod(h, method, { setEntriesArg: null, keyArg: null, orderArg: null }), `I-8 ${method}() after create(${o.id})`)
          breaks.push(...shapeBreaks(out, method, `I-8 ${method}() after create(${o.id})`))
          continue
        }
        const argFor = method === 'setEntries' ? malformedArgs : method === 'setOrder' ? malformedArgs : malformedArgs
        for (const arg of argFor) {
          const out = drive(() => callHostMethod(h, method, { setEntriesArg: arg, keyArg: arg, orderArg: arg }), `I-8 ${method}(${brief(arg)}) after create(${o.id})`)
          breaks.push(...shapeBreaks(out, method, `I-8 ${method}(${brief(arg)}) after create(${o.id})`))
        }
      }
    }
    expect(breaks, `I-8 (§2.1's totality claim): every drive must return its declared shape — breaks: ${JSON.stringify(breaks.slice(0, 8))}`).toEqual([])
  })

  it('I-9 §3.3 — every returned array is FRESH, no result object is reused, and mutation cannot reach host state', async () => {
    const { create } = await surface('I-9')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'a', node: a }]), 'I-9 setEntries')
    const r1 = asResult(drive(() => h.render(), 'I-9 render #1'), 'I-9 render #1')
    const r2 = asResult(drive(() => h.render(), 'I-9 render #2'), 'I-9 render #2')
    expect(r2, 'I-9: the result OBJECT is not reused across calls').not.toBe(r1)
    for (const field of ['order', 'placed', 'removed', 'refused'] as const) {
      expect(r2[field], `I-9: the '${field}' array is FRESH on every call`).not.toBe(r1[field])
    }
    const keysBefore = [...h.keys()]
    const orderBefore = [...r1.order]
    ;(r1.order as ListKey[]).push('injected')
    ;(r1.placed as unknown[]).push(nodeEl('div', 'injected'))
    ;(r1.removed as unknown[]).push(nodeEl('div', 'injected'))
    ;(r1.refused as ListHostRefusal[]).push({ key: 'injected', code: 'unknown-key', message: 'injected by the caller' })
    expect(h.keys(), 'I-9: a caller mutating a returned array cannot change host state').toEqual(keysBefore)
    const r3 = asResult(drive(() => h.render(), 'I-9 render #3'), 'I-9 render #3')
    expect(r3.order, 'I-9: the next result is unaffected by the mutation of the earlier one').toEqual(orderBefore)
    expect(r3.placed, 'I-9: placed is unaffected by the mutation of the earlier array').toEqual([a])
    expect(r3.refused, 'I-9: refused is unaffected by the mutation of the earlier array').toEqual([])
    expect(r3.removed, 'I-9: a fresh call with unchanged inputs removes nothing').toEqual([])
  })
})

// ===========================================================================
// M-1..M-21 — §3.1, the valid/happy states (one per reasonable data state).
// `M-19`/`M-20`/`M-21` APPEND after `M-18` (2026-09-27, the adversarial +
// PBT-audit pass) and NOTHING is renumbered (`§3.1`'s own note).
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it('M-1 §3.1 — the empty set: ok, empty arrays, and the mount is UNCHANGED', async () => {
    const { create } = await surface('M-1')
    const mount = mountEl()
    const h = create({ mount })
    const before = mountSurface(mount)
    const r1 = asResult(drive(() => h.render(), 'M-1 render() on a fresh host'), 'M-1 render() on a fresh host')
    expect(r1.ok, 'M-1: ok === true').toBe(true)
    expect(r1.order, 'M-1: order is []').toEqual([])
    expect(r1.placed, 'M-1: placed is []').toEqual([])
    expect(r1.removed, 'M-1: removed is []').toEqual([])
    expect(r1.refused, 'M-1: refused is []').toEqual([])
    const r2 = asResult(drive(() => h.setEntries([]), 'M-1 setEntries([])'), 'M-1 setEntries([])')
    expect(r2.ok, 'M-1: setEntries([]) is ok === true').toBe(true)
    expect(r2.order, 'M-1: order is [] after setEntries([])').toEqual([])
    expect(r2.placed, 'M-1: placed is [] after setEntries([])').toEqual([])
    expect(r2.removed, 'M-1: removed is [] after setEntries([])').toEqual([])
    expect(r2.refused, 'M-1: refused is [] after setEntries([])').toEqual([])
    expect(mountSurface(mount), 'M-1: the mount is UNCHANGED (no child, no attribute)').toEqual(before)
    expect(childrenOf(mount).length, 'M-1: the mount holds no child').toBe(0)
  })

  it('M-2 §3.1 — the supplied order IS the default projection (no orderOf), identity preserved', async () => {
    const { create } = await surface('M-2')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const c = nodeEl('div', 'c')
    const h = create({ mount })
    const r = asResult(
      drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }, { key: 'c', node: c }]), 'M-2 setEntries([a,b,c])'),
      'M-2 setEntries([a,b,c])',
    )
    expect(r.order, 'M-2: order is exactly [a.key, b.key, c.key]').toEqual(['a', 'b', 'c'])
    expectRefsEqual(r.placed, [a, b, c], 'M-2: placed[i] is entry i\'s node, BY REFERENCE')
    expectRefsEqual(childrenOf(mount), [a, b, c], "M-2: the mount's child sequence for those nodes is a, b, c")
    expect(r.removed, 'M-2: nothing was removed').toEqual([])
    expect(r.refused, 'M-2: nothing was refused').toEqual([])
  })

  it('M-3 §3.1 — the orderOf-projected order (payloads 2, 0, 1 ⇒ ascending n), identity preserved', async () => {
    const { create } = await surface('M-3')
    const mount = mountEl()
    const na = nodeEl('div', 'a')
    const nb = nodeEl('div', 'b')
    const nc = nodeEl('div', 'c')
    const h = create({ mount, orderOf: (e) => (e.payload as { n: number }).n })
    const r = asResult(
      drive(
        () =>
          h.setEntries([
            { key: 'a', node: na, payload: { n: 2 } },
            { key: 'b', node: nb, payload: { n: 0 } },
            { key: 'c', node: nc, payload: { n: 1 } },
          ]),
        'M-3 setEntries with orderOf',
      ),
      'M-3 setEntries with orderOf',
    )
    expect(r.order, 'M-3: order is by ascending orderOf value').toEqual(['b', 'c', 'a'])
    expectRefsEqual(r.placed, [nb, nc, na], 'M-3: placed follows the projection; identity preserved')
    expectRefsEqual(childrenOf(mount), [nb, nc, na], "M-3: the mount's child sequence follows the projection")
    expect(h.keys(), 'M-3: keys() reports the projected order too (§2.1)').toEqual(['b', 'c', 'a'])
  })

  it('M-4 §3.1 — orderOf TIES keep the SUPPLIED order (the host invents no tiebreak)', async () => {
    const { create } = await surface('M-4')
    const mount = mountEl()
    const first = nodeEl('div', 'first')
    const second = nodeEl('div', 'second')
    const lowest = nodeEl('div', 'lowest')
    const h = create({ mount, orderOf: (e) => (e.payload as { n: number }).n })
    const r = asResult(
      drive(
        () =>
          h.setEntries([
            { key: 'first', node: first, payload: { n: 1 } },
            { key: 'second', node: second, payload: { n: 1 } },
            { key: 'lowest', node: lowest, payload: { n: 0 } },
          ]),
        'M-4 setEntries with equal orderOf values',
      ),
      'M-4 setEntries with equal orderOf values',
    )
    expect(r.order, 'M-4: the tied pair keeps the SUPPLIED order (stability, prohibition 3)').toEqual(['lowest', 'first', 'second'])
    expect(r.order.indexOf('first'), 'M-4: the first-supplied tied entry precedes the second-supplied one').toBeLessThan(r.order.indexOf('second'))
    expectRefsEqual(r.placed, [lowest, first, second], 'M-4: placed follows the stable projection')
    // The same data supplied in the OPPOSITE order keeps THAT order (the tie is
    // not resolved by an invented rule such as key order).
    const mount2 = mountEl()
    const h2 = create({ mount: mount2, orderOf: (e) => (e.payload as { n: number }).n })
    const r2 = asResult(
      drive(
        () =>
          h2.setEntries([
            { key: 'second', node: nodeEl('div', 'second'), payload: { n: 1 } },
            { key: 'first', node: nodeEl('div', 'first'), payload: { n: 1 } },
          ]),
        'M-4 the reversed supplied order',
      ),
      'M-4 the reversed supplied order',
    )
    expect(r2.order, 'M-4: with the supply order reversed, the tie follows the NEW supplied order').toEqual(['second', 'first'])
  })

  it('M-5 §3.1 — the caller supplies nodes directly, and itemFactory is NEVER called', async () => {
    const { create } = await surface('M-5')
    const mount = mountEl()
    const supplied = nodeEl('div', 'supplied')
    let factoryCalls = 0
    const h = create({
      mount,
      itemFactory: () => {
        factoryCalls += 1
        return nodeEl('div', 'factory')
      },
    })
    const r = asResult(drive(() => h.setEntries([{ key: 'only', node: supplied }]), 'M-5 setEntries([{key,node}])'), 'M-5 setEntries([{key,node}])')
    expect(r.placed[0], 'M-5: placed[0] === the node the caller supplied (toBe)').toBe(supplied)
    expect(factoryCalls, 'M-5: itemFactory is never called when the caller supplied a node').toBe(0)
    expect(r.refused, 'M-5: nothing was refused').toEqual([])
  })

  it('M-6 §3.1 — the caller-INJECTED factory path: its return by reference, once per node-less entry', async () => {
    const { create } = await surface('M-6')
    const mount = mountEl()
    const made: Record<string, ShimElement> = {}
    let calls = 0
    const h = create({
      mount,
      itemFactory: (e) => {
        calls += 1
        const n = nodeEl('div', `made-${String(e.key)}`)
        made[String(e.key)] = n
        return n
      },
    })
    const r = asResult(drive(() => h.setEntries([{ key: 'a' }, { key: 'b' }]), 'M-6 setEntries([{key:a},{key:b}])'), 'M-6 setEntries([{key:a},{key:b}])')
    expect(calls, 'M-6: the factory is called ONCE PER node-less entry').toBe(2)
    expect(r.placed[0], "M-6: placed[0] is the factory's return BY REFERENCE for 'a'").toBe(made['a'])
    expect(r.placed[1], "M-6: placed[1] is the factory's return BY REFERENCE for 'b'").toBe(made['b'])
    expect(r.order, 'M-6: the supplied order is the projection').toEqual(['a', 'b'])
    expect(r.refused, 'M-6: nothing was refused').toEqual([])
  })

  it('M-7 §3.1 — order-as-projection: a permutation reorders the placed nodes and preserves identity', async () => {
    const { create } = await surface('M-7')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const c = nodeEl('div', 'c')
    const h = create({ mount })
    const first = asResult(drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }, { key: 'c', node: c }]), 'M-7 setEntries'), 'M-7 setEntries')
    const r = asResult(drive(() => h.setOrder(['c', 'a', 'b']), "M-7 setOrder(['c','a','b'])"), "M-7 setOrder(['c','a','b'])")
    expect(r.order, 'M-7: order === [c, a, b]').toEqual(['c', 'a', 'b'])
    expectRefsEqual(r.placed, [c, a, b], 'M-7: placed is in the NEW order, each element the SAME object as before')
    for (let i = 0; i < r.placed.length; i += 1) {
      expect(
        containsRef(first.placed, r.placed[i]),
        `M-7: placed[${i}] was already placed by the earlier call — the reorder re-parented nothing`,
      ).toBe(true)
    }
    expect(r.removed, 'M-7: a reorder removes NOTHING').toEqual([])
    expectRefsEqual(childrenOf(mount), [c, a, b], 'M-7: the mount child sequence follows the projection')
    expect(r.refused, 'M-7: no refusal').toEqual([])
  })

  it('M-8 §3.1 — FOREIGN SIBLINGS SURVIVE the V-7 hard row: two renders, same objects, same relative position', async () => {
    const { create } = await surface('M-8')
    const mount = mountEl()
    const f1 = nodeEl('div', 'foreign-1')
    const f2 = nodeEl('div', 'foreign-2')
    mount.appendChild(f1)
    mount.appendChild(f2)
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const h = create({ mount })
    const r1 = asResult(drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'M-8 setEntries'), 'M-8 setEntries')
    expect(r1.ok, 'M-8: ok === true after the first render').toBe(true)
    expectRefsEqual(foreignSubsequence(mount, [f1, f2]), [f1, f2], 'M-8 after render #1: both foreign elements are the SAME objects, same relative order')
    const r2 = asResult(drive(() => h.render(), 'M-8 render #2'), 'M-8 render #2')
    expect(r2.ok, 'M-8: ok === true after the second render').toBe(true)
    expectRefsEqual(foreignSubsequence(mount, [f1, f2]), [f1, f2], 'M-8 after render #2: both foreign elements are the SAME objects (toBe), same RELATIVE position')
    expect(f1.removed, 'M-8: foreign sibling #1 was never removed (shim `removed` flag)').toBe(false)
    expect(f2.removed, 'M-8: foreign sibling #2 was never removed (shim `removed` flag)').toBe(false)
    expect(f1.parent, 'M-8: foreign sibling #1 was never re-parented').toBe(mount)
    expect(f2.parent, 'M-8: foreign sibling #2 was never re-parented').toBe(mount)
    expect(
      containsRef(r1.removed, f1) || containsRef(r2.removed, f1),
      'M-8: no foreign sibling ever appears in a `removed` list',
    ).toBe(false)
    expect(containsRef(childrenOf(mount), a) && containsRef(childrenOf(mount), b), "M-8: the host placed its OWN nodes inside the SAME mount").toBe(true)
  })

  it('M-9 §3.1 — activate fires EXACTLY ONCE per call (activation is not one-shot)', async () => {
    const { create } = await surface('M-9')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const entry = { key: 'a', node: a }
    const seen: Array<{ key: ListKey; entry: unknown }> = []
    const h = create({ mount, onActivate: (key, e) => seen.push({ key, entry: e }) })
    drive(() => h.setEntries([entry]), 'M-9 setEntries')
    const beforeFirst = seen.length
    const r1 = asResult(drive(() => h.activate('a'), "M-9 activate('a') #1"), "M-9 activate('a') #1")
    expect(seen.length - beforeFirst, 'M-9: onActivate is called EXACTLY ONCE for one activate(key) call').toBe(1)
    expect(seen[seen.length - 1].key, 'M-9: the callback receives the key').toBe('a')
    expect(seen[seen.length - 1].entry, "M-9: the callback receives the caller's own entry object BY REFERENCE").toBe(entry)
    expect(r1.ok, 'M-9: ok === true for a known key').toBe(true)
    expect(r1.refused, 'M-9: refused is []').toEqual([])
    const beforeSecond = seen.length
    const r2 = asResult(drive(() => h.activate('a'), "M-9 activate('a') #2"), "M-9 activate('a') #2")
    expect(seen.length - beforeSecond, 'M-9: a second activate(key) calls it AGAIN exactly once (never twice)').toBe(1)
    expect(r2.ok, 'M-9: the second call is ok too').toBe(true)
    expect(seen.length, 'M-9: two calls, two firings — never one, never three').toBe(2)
  })

  it('M-10 §3.1 — close fires onClose EXACTLY ONCE and drops ownership (the node leaves the mount)', async () => {
    const { create } = await surface('M-10')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const seen: Array<{ key: ListKey; entry: unknown }> = []
    const h = create({ mount, onClose: (key, e) => seen.push({ key, entry: e }) })
    const entries = [{ key: 'a', node: a }, { key: 'b', node: b }]
    drive(() => h.setEntries(entries), 'M-10 setEntries')
    const before = seen.length
    const r = asResult(drive(() => h.close('a'), "M-10 close('a')"), "M-10 close('a')")
    expect(seen.length - before, 'M-10: onClose is called EXACTLY ONCE').toBe(1)
    expect(seen[seen.length - 1].key, 'M-10: the callback receives the key').toBe('a')
    expect(seen[seen.length - 1].entry, "M-10: the callback receives the caller's entry object BY REFERENCE").toBe(entries[0])
    expect(h.keys(), 'M-10: the key leaves keys()').toEqual(['b'])
    expect(containsRef(childrenOf(mount), a), 'M-10: the node the host placed is REMOVED from the mount').toBe(false)
    expect(containsRef(r.removed, a), 'M-10: removed contains that node, by reference').toBe(true)
    expect(r.ok, 'M-10: a known key is not a refusal').toBe(true)
    expect(r.refused, 'M-10: refused is []').toEqual([])
  })

  it("M-11 §3.1 — remove(key) is close's sibling and does NOT fire onClose (count 0)", async () => {
    const { create } = await surface('M-11')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    let closeCalls = 0
    const h = create({ mount, onClose: () => { closeCalls += 1 } })
    drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'M-11 setEntries')
    const r = asResult(drive(() => h.remove('a'), "M-11 remove('a')"), "M-11 remove('a')")
    expect(closeCalls, 'M-11: onClose is NOT called by remove(key) — the two are distinguishable').toBe(0)
    expect(h.keys(), 'M-11: the key leaves keys()').toEqual(['b'])
    expect(containsRef(childrenOf(mount), a), 'M-11: the node is removed from the mount').toBe(false)
    expect(containsRef(r.removed, a), 'M-11: removed contains the node, by reference').toBe(true)
    expect(r.ok, 'M-11: a known key is not a refusal').toBe(true)
    expect(r.refused, 'M-11: refused is []').toEqual([])
  })

  it("M-12 §3.1 — a repeated setEntries with the caller's SAME node keeps identity and cycles nothing", async () => {
    const { create } = await surface('M-12')
    const mount = mountEl()
    const n = nodeEl('div', 'k')
    const entry = { key: 'k', node: n }
    const h = create({ mount })
    const r1 = asResult(drive(() => h.setEntries([entry]), 'M-12 setEntries #1'), 'M-12 setEntries #1')
    const childrenAfterFirst = snapshotChildren(mount)
    const r2 = asResult(drive(() => h.setEntries([entry]), 'M-12 setEntries #2 (the same data)'), 'M-12 setEntries #2 (the same data)')
    expect(r2.placed[0], 'M-12: the same node object is still placed (toBe)').toBe(n)
    expect(containsRef(r1.placed, n), 'M-12: it was placed by the first call too').toBe(true)
    expect(r2.removed, 'M-12: NO remove+re-add cycle is observable (I-2)').toEqual([])
    expect(r2.order, "M-12: order still names 'k'").toEqual(['k'])
    expectRefsEqual(snapshotChildren(mount), childrenAfterFirst, 'M-12: no child was removed and no node was re-appended')
    expect(containsRef(childrenOf(mount), n), 'M-12: the node is still a child of the mount').toBe(true)
  })

  it('M-13 §3.1 — setEntries REPLACES a changed node for the same key (n1 removed, n2 placed, key once)', async () => {
    const { create } = await surface('M-13')
    const mount = mountEl()
    const n1 = nodeEl('div', 'n1')
    const n2 = nodeEl('div', 'n2')
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'k', node: n1 }]), 'M-13 setEntries #1')
    const r = asResult(drive(() => h.setEntries([{ key: 'k', node: n2 }]), 'M-13 setEntries #2 (a changed node)'), 'M-13 setEntries #2 (a changed node)')
    expect(containsRef(r.removed, n1), 'M-13: n1 appears in removed').toBe(true)
    expect(r.placed[0], 'M-13: placed[0] === n2').toBe(n2)
    expect(r.removed.length, 'M-13: exactly the replaced node was removed').toBe(1)
    expect(r.order, "M-13: order still contains 'k' ONCE").toEqual(['k'])
    expect(new Set(r.order).size, "M-13: 'k' once, not twice").toBe(1)
    expect(h.keys(), "M-13: keys() names 'k' once").toEqual(['k'])
    expect(containsRef(childrenOf(mount), n1), 'M-13: the replaced node is no longer a child of the mount').toBe(false)
    expect(containsRef(childrenOf(mount), n2), 'M-13: the new node is a child of the mount').toBe(true)
  })

  it('M-14 §3.1 — dispose() relinquishes ownership WITHOUT destroying caller nodes, and is idempotent', async () => {
    const { create } = await surface('M-14')
    const mount = mountEl()
    const nodes = [nodeEl('div', 'n1'), nodeEl('div', 'n2'), nodeEl('div', 'n3')]
    const h = create({ mount })
    drive(() => h.setEntries(nodes.map((n, i) => ({ key: `k${i + 1}`, node: n }))), 'M-14 setEntries')
    const placedBefore = snapshotChildren(mount)
    drive(() => h.dispose(), 'M-14 dispose()')
    expect(h.keys(), 'M-14: keys() is [] after dispose()').toEqual([])
    for (let i = 0; i < nodes.length; i += 1) {
      expect(nodes[i], `M-14: node ${i} is the SAME object the caller holds (reference-held)`).toBe(placedBefore[i])
      expect(nodes[i].removed, `M-14: node ${i} was NOT removed by the host (reference-held, NOT removed — §2.3 item 4)`).toBe(false)
    }
    expectRefsEqual(snapshotChildren(mount), placedBefore, 'M-14: dispose() destroys and removes NOTHING — the caller owns the nodes')
    drive(() => h.dispose(), 'M-14 a second dispose()')
    expect(h.keys(), 'M-14: a second dispose() is a no-op — keys() is still []').toEqual([])
    const r = asResult(drive(() => h.render(), 'M-14 render() after dispose()'), 'M-14 render() after dispose()')
    expect(r.placed, 'M-14: render() after dispose() places nothing (no further host state, I-5)').toEqual([])
    expect(r.ok, 'M-14: no method throws and the empty state is ok').toBe(true)
  })

  it('M-15 §3.1 — a null/absent mount ⇒ every operation a NO-OP with a VALID state, read once', async () => {
    // ⟶ ANNOTATED 2026-09-27 (the adversarial + PBT-audit pass; judgment call 9 —
    // TEXT ONLY: the drive below is UNCHANGED). **This drive is the WITNESS that
    // this contract NEVER asserts index-parallelism of `order` and `placed`**:
    // over an unplaceable mount, `order` is the CURRENT KEY SET (an OWNERSHIP /
    // projection statement) while `placed` is `[]` (a PLACEMENT statement), so
    // `order.length === placed.length` is false here — deliberately, and per
    // `§2.1`'s mount-absence paragraph and `§3.3 I-7`'s SHARPENED clause. A row
    // or register cell may assert parallelism ONLY over a PLACEABLE mount.
    const { create } = await surface('M-15')
    for (const mountCase of [{ id: 'mount: null', mount: null }, { id: 'mount: undefined (absent)', mount: undefined }] as const) {
      const na = nodeEl('div', 'a')
      const nb = nodeEl('div', 'b')
      const h = create({ mount: mountCase.mount as never })
      const r1 = asResult(
        drive(() => h.setEntries([{ key: 'a', node: na }, { key: 'b', node: nb }]), `M-15 ${mountCase.id} setEntries`),
        `M-15 ${mountCase.id} setEntries`,
      )
      expect(r1.ok, `M-15 ${mountCase.id}: ok === true — nothing was refused (the host simply has nowhere to place)`).toBe(true)
      expect(r1.refused, `M-15 ${mountCase.id}: refused is []`).toEqual([])
      expect(r1.placed, `M-15 ${mountCase.id}: placed is []`).toEqual([])
      expect(r1.removed, `M-15 ${mountCase.id}: removed is []`).toEqual([])
      expect(r1.order, `M-15 ${mountCase.id}: the keys are still owned, in the supplied order`).toEqual(['a', 'b'])
      expect(
        r1.placed.length !== r1.order.length,
        `M-15 ${mountCase.id}: THE NON-PARALLELISM WITNESS — order is the current key set while placed is [] (never asserted index-parallel by this contract, §2.1 mount-absence paragraph / §3.3 I-7)`,
      ).toBe(true)
      const r2 = asResult(drive(() => h.setOrder(['b', 'a']), `M-15 ${mountCase.id} setOrder`), `M-15 ${mountCase.id} setOrder`)
      expect(r2.ok, `M-15 ${mountCase.id}: setOrder is ok`).toBe(true)
      expect(r2.refused, `M-15 ${mountCase.id}: setOrder refuses nothing`).toEqual([])
      expect(r2.placed, `M-15 ${mountCase.id}: placed is []`).toEqual([])
      expect(r2.removed, `M-15 ${mountCase.id}: removed is []`).toEqual([])
      const r3 = asResult(drive(() => h.activate('a'), `M-15 ${mountCase.id} activate`), `M-15 ${mountCase.id} activate`)
      expect(r3.ok, `M-15 ${mountCase.id}: activate on a KNOWN key is ok`).toBe(true)
      expect(r3.refused, `M-15 ${mountCase.id}: activate refuses nothing`).toEqual([])
      expect(r3.placed, `M-15 ${mountCase.id}: placed is []`).toEqual([])
      expect(r3.removed, `M-15 ${mountCase.id}: removed is []`).toEqual([])
      const r4 = asResult(drive(() => h.close('a'), `M-15 ${mountCase.id} close`), `M-15 ${mountCase.id} close`)
      expect(r4.ok, `M-15 ${mountCase.id}: close on a KNOWN key is ok`).toBe(true)
      expect(r4.placed, `M-15 ${mountCase.id}: placed is []`).toEqual([])
      expect(r4.removed, `M-15 ${mountCase.id}: removed is [] — the host never placed that node, so it removes nothing`).toEqual([])
      const r5 = asResult(drive(() => h.render(), `M-15 ${mountCase.id} render`), `M-15 ${mountCase.id} render`)
      expect(r5.placed, `M-15 ${mountCase.id}: render() places nothing`).toEqual([])
      expect(r5.removed, `M-15 ${mountCase.id}: render() removes nothing`).toEqual([])
      expect(h.keys(), `M-15 ${mountCase.id}: keys() still reports the CURRENT keys`).toEqual(['b'])
      // The option is read ONCE: no setter exists, and a later mount is NOT retro-fitted.
      const realMount = mountEl()
      expect(
        (h as unknown as Record<string, unknown>)['setMount'],
        `M-15 ${mountCase.id}: the host exposes NO mount setter (the option is read once)`,
      ).toBe(undefined)
      ;(h as unknown as { mount?: unknown }).mount = realMount
      const r6 = asResult(drive(() => h.setEntries([{ key: 'z', node: nodeEl('div', 'z') }]), `M-15 ${mountCase.id} post-hoc mount`), `M-15 ${mountCase.id} post-hoc mount`)
      expect(r6.placed, `M-15 ${mountCase.id}: a later mount is NOT retro-fitted — placed is still []`).toEqual([])
      expect(childrenOf(realMount).length, `M-15 ${mountCase.id}: the retro-attached mount is untouched`).toBe(0)
    }
  })

  it('M-16 §3.1 — a mount whose child surface is malformed is a valid NO-OP, never a throw', async () => {
    const { create } = await surface('M-16')
    const malformed: Array<{ id: string; mount: unknown }> = [
      { id: 'mount: {}', mount: {} },
      { id: 'mount: 42', mount: 42 },
      { id: "mount: 'div'", mount: 'div' },
      { id: 'mount: [] (an array)', mount: [] },
      { id: 'mount: { children: 42 }', mount: { children: 42 } },
    ]
    for (const m of malformed) {
      const na = nodeEl('div', 'a')
      const h = create({ mount: m.mount as never })
      const r1 = asResult(drive(() => h.setEntries([{ key: 'a', node: na }, { key: 'b', node: nodeEl('div', 'b') }]), `M-16 ${m.id} setEntries`), `M-16 ${m.id} setEntries`)
      expect(r1.ok, `M-16 ${m.id}: ok === true for a valid input (nothing was refused)`).toBe(true)
      expect(r1.refused, `M-16 ${m.id}: refused is [] — the mount's absence is a CONFIGURATION, not an error`).toEqual([])
      expect(r1.placed, `M-16 ${m.id}: placed is []`).toEqual([])
      expect(r1.removed, `M-16 ${m.id}: removed is []`).toEqual([])
      expect(h.keys(), `M-16 ${m.id}: keys() reports the current keys`).toEqual(['a', 'b'])
      const r2 = asResult(drive(() => h.setOrder(['b', 'a']), `M-16 ${m.id} setOrder`), `M-16 ${m.id} setOrder`)
      expect(r2.ok, `M-16 ${m.id}: setOrder is ok`).toBe(true)
      expect(r2.refused, `M-16 ${m.id}: setOrder refuses nothing`).toEqual([])
      const r3 = asResult(drive(() => h.activate('a'), `M-16 ${m.id} activate`), `M-16 ${m.id} activate`)
      expect(r3.ok, `M-16 ${m.id}: activate on a known key is ok`).toBe(true)
      expect(r3.refused, `M-16 ${m.id}: activate refuses nothing`).toEqual([])
      const r4 = asResult(drive(() => h.close('a'), `M-16 ${m.id} close`), `M-16 ${m.id} close`)
      expect(r4.ok, `M-16 ${m.id}: close on a known key is ok`).toBe(true)
      expect(r4.removed, `M-16 ${m.id}: removed is []`).toEqual([])
      const r5 = asResult(drive(() => h.render(), `M-16 ${m.id} render`), `M-16 ${m.id} render`)
      expect(r5.ok, `M-16 ${m.id}: render() is ok`).toBe(true)
      expect(r5.placed, `M-16 ${m.id}: placed is []`).toEqual([])
      expect(r5.removed, `M-16 ${m.id}: removed is []`).toEqual([])
      drive(() => h.dispose(), `M-16 ${m.id} dispose`)
      expect(h.keys(), `M-16 ${m.id}: dispose() leaves an empty, valid state`).toEqual([])
      if (m.mount !== null && typeof m.mount === 'object' && Array.isArray((m.mount as { children?: unknown }).children)) {
        expect((m.mount as { children: unknown[] }).children, `M-16 ${m.id}: the mount's own children array was not written to`).toEqual([])
      }
    }
  })

  it('M-17 §3.1 — ok reflects the CURRENT call only (refusals do not accumulate into host state)', async () => {
    const { create } = await surface('M-17')
    const mount = mountEl()
    const h = create({ mount })
    const bad = asResult(
      drive(() => h.setEntries([{ key: 'k', node: nodeEl('div', 'k1') }, { key: 'k', node: nodeEl('div', 'k2') }]), 'M-17 the refused call'),
      'M-17 the refused call',
    )
    expect(bad.ok, 'M-17 precondition: the first call has exactly one refusal, so ok === false').toBe(false)
    expect(bad.refused, 'M-17 precondition: exactly one refusal').toHaveLength(1)
    const clean = asResult(drive(() => h.setEntries([{ key: 'good', node: nodeEl('div', 'good') }]), 'M-17 the clean call'), 'M-17 the clean call')
    expect(clean.ok, "M-17: the SECOND call's ok === true").toBe(true)
    expect(clean.refused, 'M-17: refusals do not accumulate into host state').toEqual([])
    expect(h.keys(), 'M-17: the clean call owns exactly its own key').toEqual(['good'])
    const clean2 = asResult(drive(() => h.render(), 'M-17 a render after the clean call'), 'M-17 a render after the clean call')
    expect(clean2.ok, 'M-17: a later call is clean too — the earlier refusal left no residue').toBe(true)
    expect(clean2.refused, 'M-17: still no refusals').toEqual([])
  })

  it('M-18 §3.1 — an EMPTY-STRING key is an ordinary opaque key: four opaque-key STATES, nothing normalizes a key', async () => {
    // =====================================================================
    // THE STATES THIS ROW ENUMERATES (§3.1 M-18, ADDED 2026-09-27 by the
    // TestWriter-handoff reconciliation; finding 2 — appended AFTER M-17,
    // nothing renumbered):
    //   (1) the four opaque-key SHAPES, in the row's own order —
    //       `''` (the empty string) · `' b\t'` (whitespace/tab) ·
    //       `'ünïcøde'` (non-ASCII) · `'x'.repeat(4096)` (very long);
    //   (2) the PROJECTION state — the four keys supplied in one
    //       `setOrder(...)` argument, reordered;
    //   (3) the CALLBACK/host state — `close('')` on the now-known `''` key
    //       (fires `onClose` once, removes that node from the mount, drops
    //       the key);
    //   (4) the UNKNOWN-key edge of the same rule — `setOrder([''])` while
    //       `''` is unknown: `§3.2 F-8`/"the `''` drive table" of the F-5
    //       ruling says an unknown key in `setOrder` is IGNORED, never
    //       refused (recorded here as an extension the row names, not a
    //       refusal class of its own).
    // The row is RED today for the same single reason as every other clause
    // row: `src/shared/owned-list-host.ts` does not exist.
    // =====================================================================
    const { create } = await surface('M-18')
    const longKey = 'x'.repeat(4096)
    const keys: readonly string[] = ['', ' b\t', 'ünïcøde', longKey]
    const nodes = keys.map((_, i) => nodeEl('div', `opaque-${i}`))
    const mount = mountEl()
    const seen: Array<{ key: ListKey; entry: ListEntry<unknown> }> = []
    const h = create({ mount, onClose: (key, entry) => seen.push({ key, entry }) })

    const r = asResult(
      drive(
        () =>
          h.setEntries([
            { key: '', node: nodes[0] },
            { key: ' b\t', node: nodes[1] },
            { key: 'ünïcøde', node: nodes[2] },
            { key: longKey, node: nodes[3] },
          ]),
        'M-18 setEntries of the four opaque keys',
      ),
      'M-18 setEntries of the four opaque keys',
    )
    expect(r.ok, 'M-18: ok === true for every call — no key shape is a refusal').toBe(true)
    expect(r.refused, 'M-18: refused === []').toEqual([])
    // BYTE-IDENTICAL: no trim, no case-folding, no unicode normalization, no
    // length check and NO empty-string special case.
    expect(r.order, "M-18: the four keys are reported VERBATIM, and '' is a key like any other").toEqual([...keys])
    expect(new Set(r.order).size, "M-18: '' never collides with ' b\\t' or the long key — four distinct keys").toBe(4)
    for (let i = 0; i < keys.length; i += 1) {
      expect(r.placed[i], `M-18: placed[${i}] is the supplied node by reference`).toBe(nodes[i])
    }
    expect(h.keys(), "M-18: keys() contains '' exactly once").toEqual([...keys])
    expect(h.keys().filter((k) => k === '').length, "M-18: '' appears exactly once").toBe(1)

    // (2) the PROJECTION state: the long key first, then '', then the others.
    const projection: readonly string[] = [longKey, '', 'ünïcøde', ' b\t']
    const r2 = asResult(drive(() => h.setOrder([...projection]), 'M-18 setOrder of the four opaque keys'), 'M-18 setOrder of the four opaque keys')
    expect(r2.ok, 'M-18: the projection is clean').toBe(true)
    expect(r2.refused, 'M-18: refused === []').toEqual([])
    expect(r2.order, 'M-18: the projected order is the requested one, verbatim').toEqual([...projection])
    expect(h.keys(), 'M-18: keys() follows the projection').toEqual([...projection])
    for (let i = 0; i < projection.length; i += 1) {
      const idx = keys.indexOf(projection[i])
      expect(r2.placed[i], `M-18: identity is preserved through the projection (key ${brief(projection[i])})`).toBe(nodes[idx])
    }

    // (3) the CALLBACK/host state: `close('')` fires `onClose` ONCE with `('', entry)`.
    const r3 = asResult(drive(() => h.close(''), "M-18 close('') on the KNOWN '' key"), "M-18 close('') on the KNOWN '' key")
    expect(r3.ok, "M-18: close('') on a known key is not a refusal").toBe(true)
    expect(r3.refused, "M-18: close('') refused === []").toEqual([])
    expect(seen.length, "M-18: onClose fires EXACTLY once for close('')").toBe(1)
    expect(keyIsVerbatim('', seen[0].key), "M-18: the callback receives the '' key verbatim").toBe(true)
    expect(seen[0].entry.key, "M-18: the callback receives the entry whose key is ''").toBe('')
    expect(containsRef(r3.removed, nodes[0]), "M-18: close('') removes that node (it appears in removed)").toBe(true)
    expect(containsRef(childrenOf(mount), nodes[0]), "M-18: close('') takes the node OUT of the mount").toBe(false)
    expect(h.keys().includes(''), "M-18: '' is no longer owned after the close").toBe(false)
    expect(h.keys().length, "M-18: the other three opaque keys are still owned").toBe(3)
    for (const k of [' b\t', 'ünïcøde', longKey]) {
      expect(h.keys().includes(k), `M-18: the key ${brief(k)} survived the close untouched (no normalization)`).toBe(true)
    }

    // (4) the UNKNOWN-key edge of the same rule: an unknown `''` is IGNORED by
    // `setOrder`, never refused (`§3.2 F-8` + the F-5 ruling's `''` drive table).
    const fresh = create({ mount: mountEl() })
    const r4 = asResult(drive(() => fresh.setOrder(['']), "M-18 setOrder(['']) while '' is unknown"), "M-18 setOrder(['']) while '' is unknown")
    expect(r4.ok, "M-18: an unknown '' in setOrder is IGNORED, never refused (F-8)").toBe(true)
    expect(r4.refused, "M-18: refused === [] — no refusal class is produced by ''").toEqual([])
    expect(r4.order, "M-18: the unknown '' never appears in order").toEqual([])
  })

  it('M-19 §3.1 — a REFUSED first occurrence does NOT reserve its key: the later VALID duplicate is PLACED (the ADV-LH-4 valid-state half)', async () => {
    // =====================================================================
    // THE STATES THIS ROW ENUMERATES (`§3.1 M-19`, ADDED 2026-09-27 by the
    // adversarial + PBT-audit pass; finding `ADV-LH-4`, MED — the valid-state
    // half of the hole `§3.2 F-11` documents; the contract text is `§2.1`'s
    // ACCEPTANCE rule + node-rule case `N-5`).
    //   (1) the REFUSED-FIRST state — `setEntries([{key:'k'}, {key:'k', node:n}])`
    //       with NO `itemFactory`: exactly ONE refusal, `no-node`, and NO
    //       `duplicate-key` refusal at all (a refused occurrence contributes
    //       NOTHING — least of all a reserved key);
    //   (2) the PLACED/OWNED state — the second, independently VALID occurrence
    //       IS placed and owned: `placed === [n]` by reference (`toBe`),
    //       `order === ['k']` (each key ONCE, `I-7`), `ok === false` (`I-1`);
    //   (3) the CLOSE state — `close('k')` on the now-known key removes `n`
    //       from the mount and fires `onClose` exactly once.
    // GREEN REGRESSION ROW (`ADV-LH-4`, MED, `CONTRACT-AMENDED`): the host guard
    // on the ACCEPTANCE rule has LANDED (`seen.add(key)` now runs only AFTER an
    // occurrence is ACCEPTED), so the row pins §2.1's ACCEPTANCE rule + `N-5`.
    // (2026-09-27 old wording, kept visible: "the as-shipped host calls
    // `seen.add(key)` BEFORE the node/factory question, so this drive yields TWO
    // refusals (`no-node` + `duplicate-key`) ... NOTHING placed".)
    // =====================================================================
    const { create } = await surface('M-19')
    const mount = mountEl()
    const n = nodeEl('div', 'n')
    const closed: Array<{ key: ListKey; entry: ListEntry<unknown> }> = []
    const h = create({ mount, onClose: (key, entry) => closed.push({ key, entry }) })

    const r = asResult(
      drive(() => h.setEntries([{ key: 'k' }, { key: 'k', node: n }]), 'M-19 setEntries([{key:k}, {key:k, node:n}]) with no itemFactory'),
      'M-19 setEntries([{key:k}, {key:k, node:n}]) with no itemFactory',
    )
    expect(r.refused, 'M-19: EXACTLY ONE refusal — one per REFUSED occurrence (§2.1 ACCEPTANCE rule, N-5)').toHaveLength(1)
    expect(r.refused[0].code, 'M-19: the refusal class of the FIRST occurrence — no-node, not duplicate-key').toBe('no-node')
    expect(keyIsVerbatim('k', r.refused[0].key), 'M-19: the refusal names the key as supplied').toBe(true)
    expect(
      r.refused.some((x) => x.code === 'duplicate-key'),
      'M-19: NO duplicate-key refusal exists for this call — a REFUSED occurrence reserves nothing (ADV-LH-4)',
    ).toBe(false)
    expect(r.order, "M-19: order is exactly ['k'] — the valid duplicate is owned, each key ONCE (§3.3 I-7)").toEqual(['k'])
    expect(r.placed, 'M-19: placed is exactly [n]').toHaveLength(1)
    expect(r.placed[0], 'M-19: the VALID occurrence is placed BY REFERENCE (§2.3 item 5 / I-6)').toBe(n)
    expect(r.ok, 'M-19: ok === false — the first occurrence WAS refused (§3.3 I-1)').toBe(false)
    expect(h.keys(), "M-19: the key is owned once").toEqual(['k'])
    expect(containsRef(childrenOf(mount), n), 'M-19: the valid occurrence is really placed in the mount').toBe(true)

    const rc = asResult(drive(() => h.close('k'), "M-19 close('k') on the now-known key"), "M-19 close('k') on the now-known key")
    expect(rc.ok, "M-19: close('k') on a KNOWN key is not a refusal").toBe(true)
    expect(closed.length, 'M-19: onClose fires EXACTLY once for the close').toBe(1)
    expect(containsRef(rc.removed, n), "M-19: close('k') removes n (it appears in removed)").toBe(true)
    expect(containsRef(childrenOf(mount), n), "M-19: close('k') takes n OUT of the mount").toBe(false)
    expect(h.keys(), 'M-19: the key is gone after the close').toEqual([])
  })

  it('M-20 §3.1 — a NON-ARRAY argument is a silent empty set / a no-op: never a throw, and setEntries drops prior ownership', async () => {
    // =====================================================================
    // THE STATES THIS ROW ENUMERATES (`§3.1 M-20`, ADDED 2026-09-27 by the
    // adversarial + PBT-audit pass; judgment call 5 — `PARKED-with-revisit-
    // condition` as a READING, while the ownership-drop CONSEQUENCE is
    // contract text at `§2.1 setEntries`/`setOrder`).
    //   (1) `setEntries(42)` / `setEntries({})` / `setEntries('x')` after a
    //       populated 3-entry set: NO throw, `ok === true`, `refused === []`,
    //       `order === []`, `placed === []`, and **the 3 previously placed
    //       nodes are removed and appear in `removed`** — the silent empty set
    //       DROPS prior ownership;
    //   (2) `setOrder(42)` after a projected order: NO throw, the projected
    //       order is UNCHANGED, `ok === true`, `refused === []`.
    // =====================================================================
    const { create } = await surface('M-20')
    for (const arg of [42, {}, 'x'] as const) {
      const mount = mountEl()
      const nodes = [nodeEl('div', 'a'), nodeEl('div', 'b'), nodeEl('div', 'c')]
      const h = create({ mount })
      drive(
        () => h.setEntries(nodes.map((node, i) => ({ key: ['a', 'b', 'c'][i], node }))),
        `M-20 ${brief(arg)}: the populate call`,
      )
      const r = asResult(drive(() => h.setEntries(arg as never), `M-20 setEntries(${brief(arg)})`), `M-20 setEntries(${brief(arg)})`)
      expect(r.ok, `M-20 setEntries(${brief(arg)}): ok === true — a non-array is not a refusal`).toBe(true)
      expect(r.refused, `M-20 setEntries(${brief(arg)}): refused === []`).toEqual([])
      expect(r.order, `M-20 setEntries(${brief(arg)}): order === [] (read as an EMPTY set)`).toEqual([])
      expect(r.placed, `M-20 setEntries(${brief(arg)}): placed === []`).toEqual([])
      expect(r.removed, `M-20 setEntries(${brief(arg)}): the 3 previously placed nodes are REMOVED — the ownership drop is the observable consequence`).toHaveLength(3)
      for (let i = 0; i < nodes.length; i += 1) {
        expect(containsRef(r.removed, nodes[i]), `M-20 setEntries(${brief(arg)}): node ${i} is in removed, by reference`).toBe(true)
        expect(containsRef(childrenOf(mount), nodes[i]), `M-20 setEntries(${brief(arg)}): node ${i} left the mount`).toBe(false)
      }
      expect(h.keys(), `M-20 setEntries(${brief(arg)}): keys() is []`).toEqual([])
    }

    // (2) `setOrder` with a non-array keys argument is a NO-OP on the projection.
    const mount2 = mountEl()
    const h2 = create({ mount: mount2 })
    drive(
      () => h2.setEntries([{ key: 'a', node: nodeEl('div', 'a') }, { key: 'b', node: nodeEl('div', 'b') }]),
      'M-20 setOrder(42): the populate call',
    )
    const projected = asResult(drive(() => h2.setOrder(['b', 'a']), "M-20 setOrder(['b','a'])"), "M-20 setOrder(['b','a'])")
    expect(projected.order, "M-20 precondition: the projection is ['b','a']").toEqual(['b', 'a'])
    const r2 = asResult(drive(() => h2.setOrder(42 as never), 'M-20 setOrder(42)'), 'M-20 setOrder(42)')
    expect(r2.ok, 'M-20 setOrder(42): ok === true — never a throw').toBe(true)
    expect(r2.refused, 'M-20 setOrder(42): refused === []').toEqual([])
    expect(r2.order, 'M-20 setOrder(42): the current projected order is left UNCHANGED').toEqual(['b', 'a'])
    expect(h2.keys(), 'M-20 setOrder(42): keys() is unchanged too').toEqual(['b', 'a'])
  })

  it('M-21 §3.1 — render() never re-appends a caller-detached node: the detach is PERMANENT for that key', async () => {
    // =====================================================================
    // THE STATES THIS ROW ENUMERATES (`§3.1 M-21`, ADDED 2026-09-27 by the
    // adversarial + PBT-audit pass; judgment call 10 — `ACCEPTED-AS-PINNED`;
    // contract text at `§2.1 render()`'s doc string and `§3.2 F-6`).
    //   (1) the CALLER-DETACHED state — the caller removes a host-placed node
    //       from the mount itself;
    //   (2) the FIRST `render()` — the node is NOT re-appended (the host writes
    //       only where its OWN bookkeeping disagrees with the mount, and the
    //       bookkeeping still owns the key), so the node stays out of
    //       `mount.children`; `keys()`/`order` still name the key (`I-7`);
    //   (3) the SECOND `render()` — a no-op at the DOM level: `removed === []`
    //       and the mount's child sequence is reference-identical (`I-2`);
    //   (4) the `close(key)` state — the key is not left dangling: no throw,
    //       the detached node is not resurrected, and the key leaves `keys()`.
    // =====================================================================
    const { create } = await surface('M-21')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'M-21 setEntries')
    expectRefsEqual(childrenOf(mount), [a, b], 'M-21 precondition: both nodes are placed')
    a.remove() // the CALLER detaches a host-placed node itself
    expect(containsRef(childrenOf(mount), a), 'M-21 precondition: the caller detached the node').toBe(false)

    const r1 = asResult(drive(() => h.render(), 'M-21 render() #1 after the caller detach'), 'M-21 render() #1 after the caller detach')
    expect(containsRef(childrenOf(mount), a), 'M-21: render() does NOT re-append the detached node — the detach is PERMANENT').toBe(false)
    expect(r1.placed, "M-21: placed reports the host's placement bookkeeping").toHaveLength(2)
    expect(r1.order, "M-21: order still names the key (I-7)").toEqual(['a', 'b'])
    expect(h.keys(), "M-21: keys() still names the key — it is not left dangling").toEqual(['a', 'b'])

    const before = snapshotChildren(mount)
    const r2 = asResult(drive(() => h.render(), 'M-21 render() #2 (the no-op)'), 'M-21 render() #2 (the no-op)')
    expect(r2.removed, 'M-21: the second render is a no-op at the DOM level — removed === []').toEqual([])
    expectRefsEqual(snapshotChildren(mount), before, 'M-21: the mount child sequence is reference-identical — nothing was re-appended')

    const rc = asResult(drive(() => h.close('a'), "M-21 close('a') on the detached key"), "M-21 close('a') on the detached key")
    expect(rc.ok, "M-21: close() on the detached key does not throw and is not a refusal").toBe(true)
    expect(rc.refused, 'M-21: refused === []').toEqual([])
    expect(h.keys(), "M-21: the key leaves keys()").toEqual(['b'])
    expect(containsRef(childrenOf(mount), a), 'M-21: close() resurrections nothing — the node stays out of the mount').toBe(false)
  })
})

// ===========================================================================
// F-1..F-11 — §3.2, the documented fail-states (each is a typed `code`).
// `F-11` appends after `F-10` (ADDED 2026-09-27 by the adversarial + PBT-audit
// pass); NOTHING is renumbered (`§3.2`'s own note).
// ===========================================================================
describe('F — §3.2 the documented fail-states / refusals', () => {
  it('F-1 §3.2 — an UNKNOWN key: refused, never thrown, the exact key string, and no callback fires', async () => {
    const { create } = await surface('F-1')
    for (const method of ['remove', 'close', 'activate'] as const) {
      for (const key of ['nope', '  nope  ', 'NOPE']) {
        const mount = mountEl()
        const a = nodeEl('div', 'a')
        let activateCalls = 0
        let closeCalls = 0
        const h = create({ mount, onActivate: () => { activateCalls += 1 }, onClose: () => { closeCalls += 1 } })
        drive(() => h.setEntries([{ key: 'known', node: a }]), `F-1 ${method}(${brief(key)}) setEntries`)
        const before = snapshotChildren(mount)
        const r = asResult(drive(() => h[method](key), `F-1 ${method}(${brief(key)})`), `F-1 ${method}(${brief(key)})`)
        expect(r.ok, `F-1 ${method}(${brief(key)}): ok === false`).toBe(false)
        expect(r.refused, `F-1 ${method}(${brief(key)}): refused has EXACTLY one member`).toHaveLength(1)
        expect(r.refused[0].code, `F-1 ${method}(${brief(key)}): the typed code`).toBe('unknown-key')
        expect(
          keyIsVerbatim(key, r.refused[0].key),
          `F-1 ${method}(${brief(key)}): the EXACT key string as supplied (never normalized)`,
        ).toBe(true)
        expect(typeof r.refused[0].message, `F-1 ${method}(${brief(key)}): a message is present`).toBe('string')
        expect(r.refused[0].message.length, `F-1 ${method}(${brief(key)}): the message is one non-empty sentence`).toBeGreaterThan(0)
        expect(activateCalls, `F-1 ${method}(${brief(key)}): NO callback fires`).toBe(0)
        expect(closeCalls, `F-1 ${method}(${brief(key)}): NO callback fires`).toBe(0)
        expect(h.keys(), `F-1 ${method}(${brief(key)}): state unchanged`).toEqual(['known'])
        expectRefsEqual(snapshotChildren(mount), before, `F-1 ${method}(${brief(key)}): the tree is unchanged`)
      }
    }
  })

  it('F-2 §3.2 — a DUPLICATE key in one setEntries call: one refusal, FIRST-WINS, the key once', async () => {
    // ⟶ RE-PINNED 2026-09-27 (the adversarial + PBT-audit pass; finding
    // `ADV-LH-4` — TEXT ONLY: the drive below is UNCHANGED). `§3.2 F-2` is
    // SCOPED, not weakened: **first-wins applies when the FIRST occurrence is
    // itself ACCEPTED**, i.e. the `duplicate-key` test is made against keys
    // ACCEPTED in this call (`§2.1`'s ACCEPTANCE rule — a key joins the seen set
    // only AFTER its occurrence passes BOTH the key check and the node/factory
    // check). A first occurrence that is REFUSED reserves NOTHING and its key may
    // be taken by a later VALID occurrence — that shape is `§3.2 F-11` (refusal
    // half) and `§3.1 M-19` (valid-state half). THIS row stays the two-VALID-
    // occurrences shape, and its assertion is therefore the full first-wins
    // statement: one refusal, the FIRST occurrence placed.
    const { create } = await surface('F-2')
    const mount = mountEl()
    const first = nodeEl('div', 'first')
    const second = nodeEl('div', 'second')
    const h = create({ mount })
    const r = asResult(
      drive(() => h.setEntries([{ key: 'k', node: first }, { key: 'k', node: second }]), 'F-2 setEntries with a duplicate key'),
      'F-2 setEntries with a duplicate key',
    )
    expect(r.ok, 'F-2: ok === false').toBe(false)
    expect(r.refused, 'F-2: ONE refusal').toHaveLength(1)
    expect(r.refused[0].code, 'F-2: the typed code').toBe('duplicate-key')
    expect(keyIsVerbatim('k', r.refused[0].key), 'F-2: the refusal names the duplicated key').toBe(true)
    expect(r.order, "F-2: order contains 'k' ONCE").toEqual(['k'])
    expect(r.placed, 'F-2: exactly one node was placed').toHaveLength(1)
    expect(r.placed[0], 'F-2: the FIRST occurrence is placed (first-wins, stated so it is unambiguous)').toBe(first)
    expect(containsRef(childrenOf(mount), second), 'F-2: the SECOND occurrence is refused — its node is never placed').toBe(false)
    expect(containsRef(childrenOf(mount), first), 'F-2: the first occurrence IS placed').toBe(true)
    expect(h.keys(), "F-2: keys() names 'k' once").toEqual(['k'])
  })

  it('F-3 §3.2 — an entry with NO node and NO factory: no-node, not owned, absent from order', async () => {
    const { create } = await surface('F-3')
    const mount = mountEl()
    const h = create({ mount })
    const r = asResult(drive(() => h.setEntries([{ key: 'k' }]), 'F-3 setEntries([{key}]) without a factory'), 'F-3 setEntries([{key}]) without a factory')
    expect(r.ok, 'F-3: ok === false').toBe(false)
    expect(r.refused, 'F-3: exactly one refusal').toHaveLength(1)
    expect(r.refused[0].code, 'F-3: the typed code').toBe('no-node')
    expect(keyIsVerbatim('k', r.refused[0].key), 'F-3: the exact key as supplied').toBe(true)
    expect(h.keys(), 'F-3: the key is NOT owned').toEqual([])
    expect(r.order, 'F-3: order does not contain it').toEqual([])
    expect(r.placed, 'F-3: nothing was placed — the host NEVER creates a node itself').toEqual([])
    // The totality note (§2.1): the refusal is of THIS entry only.
    const r2 = asResult(
      drive(() => h.setEntries([{ key: 'k' }, { key: 'ok', node: nodeEl('div', 'ok') }]), 'F-3 a mixed call'),
      'F-3 a mixed call',
    )
    expect(r2.refused, 'F-3: exactly one refusal in the mixed call too').toHaveLength(1)
    expect(r2.order, 'F-3: the valid entry is placed normally alongside the refused one').toEqual(['ok'])
    expect(h.keys(), 'F-3: only the valid key is owned').toEqual(['ok'])
  })

  it('F-4 §3.2 — the factory returns null (or undefined): factory-returned-null, the key not owned', async () => {
    const { create } = await surface('F-4')
    for (const ret of [null, undefined] as const) {
      const mount = mountEl()
      const h = create({ mount, itemFactory: () => ret as never })
      const r = asResult(drive(() => h.setEntries([{ key: 'k' }]), `F-4 itemFactory returning ${String(ret)}`), `F-4 itemFactory returning ${String(ret)}`)
      expect(r.ok, `F-4 (${String(ret)}): ok === false`).toBe(false)
      expect(r.refused, `F-4 (${String(ret)}): exactly one refusal`).toHaveLength(1)
      expect(r.refused[0].code, `F-4 (${String(ret)}): the typed code`).toBe('factory-returned-null')
      expect(keyIsVerbatim('k', r.refused[0].key), `F-4 (${String(ret)}): the exact key as supplied`).toBe(true)
      expect(h.keys(), `F-4 (${String(ret)}): the key is NOT owned`).toEqual([])
      expect(childrenOf(mount).length, `F-4 (${String(ret)}): the mount stays empty`).toBe(0)
    }
  })

  it('F-5 §3.2 — a MALFORMED entry: malformed-entry, and the OTHER entries of the same call are placed', async () => {
    const { create } = await surface('F-5')
    // THE CORRECTED TRIGGER (`§3.2 F-5`, annotated 2026-09-27; finding 2): a
    // NON-OBJECT entry, or a NON-STRING `key` (`42`, `null`, `{}`, `undefined`).
    // `''` IS A VALID KEY and is never `malformed-entry` — its positive drive is
    // row `M-18`; and the shape "`node: null` with no factory", which the as-filed
    // cell listed here, is `no-node` per `§2.1`'s node rule `N-3` + `F-3`, so it
    // is asserted under `F-3` (and cross-checked below) and NOT here.
    const cases: Array<{ id: string; entry: unknown; expectedKey: unknown; keyIsSupplied: boolean }> = [
      { id: 'a non-object entry (a bare string)', entry: 'not-an-entry', expectedKey: undefined, keyIsSupplied: false },
      { id: 'a non-object entry (a number)', entry: 42, expectedKey: undefined, keyIsSupplied: false },
      { id: 'key not a string (42)', entry: { key: 42, node: nodeEl('div', 'x') }, expectedKey: 42, keyIsSupplied: true },
      { id: 'key not a string (null)', entry: { key: null, node: nodeEl('div', 'x') }, expectedKey: null, keyIsSupplied: true },
      { id: 'key not a string ({})', entry: { key: {}, node: nodeEl('div', 'x') }, keyIsSupplied: false, expectedKey: undefined },
      { id: 'key not a string (undefined)', entry: { key: undefined, node: nodeEl('div', 'x') }, keyIsSupplied: false, expectedKey: undefined },
    ]
    for (const c of cases) {
      const mount = mountEl()
      const good = nodeEl('div', 'good')
      const h = create({ mount })
      const r = asResult(
        drive(() => h.setEntries([c.entry as never, { key: 'good', node: good }]), `F-5 ${c.id}`),
        `F-5 ${c.id}`,
      )
      expect(r.ok, `F-5 ${c.id}: ok === false`).toBe(false)
      expect(r.refused, `F-5 ${c.id}: exactly one refusal`).toHaveLength(1)
      expect(r.refused[0].code, `F-5 ${c.id}: the typed code`).toBe('malformed-entry')
      if (c.keyIsSupplied) {
        // `ListHostRefusal.key` holds the supplied value VERBATIM (`§2.1`, amended):
        // `42`/`null` stay `42`/`null`, never `'42'`/`'null'`.
        expect(
          keyIsVerbatim(c.expectedKey, r.refused[0].key),
          `F-5 ${c.id}: the key VERBATIM, no String() coercion and no normalization`,
        ).toBe(true)
      }
      expect(r.order, `F-5 ${c.id}: the malformed entry is not owned; the valid one is (§2.1 totality note)`).toEqual(['good'])
      expect(containsRef(r.placed, good), `F-5 ${c.id}: the other entry in the same call is placed normally`).toBe(true)
      expect(h.keys(), `F-5 ${c.id}: only the valid key is owned`).toEqual(['good'])
      // `''` is a VALID key: `setEntries([{key:'', node: n}])` is placed, never
      // refused, and never malformed (the ruling at `§3.2 F-5`; positive drive
      // `M-18`).
      const emptyNode = nodeEl('div', 'empty-key')
      const rEmpty = asResult(
        drive(() => h.setEntries([{ key: '', node: emptyNode }]), `F-5 ${c.id}: the '' key is NOT malformed`),
        `F-5 ${c.id}: the '' key is NOT malformed`,
      )
      expect(rEmpty.ok, `F-5 ${c.id}: '' is a valid key — the call is clean`).toBe(true)
      expect(rEmpty.refused, `F-5 ${c.id}: '' is never malformed-entry (F-5's corrected trigger)`).toEqual([])
      expect(rEmpty.order, `F-5 ${c.id}: the '' key is owned verbatim`).toEqual([''])
    }
    // THE RE-HOMED SHAPE, asserted where the ruling puts it: `node: null` (or
    // absent) with NO factory is `no-node` (`§2.1` node rule `N-3`, `§3.2 F-3`) —
    // never `malformed-entry`, and therefore never asserted under `F-5`'s class.
    for (const node of [null, undefined] as const) {
      const mount = mountEl()
      const h = create({ mount })
      const r = asResult(
        drive(() => h.setEntries([{ key: 'k-nullnode', node }]), `F-5/F-3 re-home: node ${String(node)} with no factory`),
        `F-5/F-3 re-home: node ${String(node)} with no factory`,
      )
      expect(r.refused, `F-5/F-3 re-home (node ${String(node)}): exactly one refusal`).toHaveLength(1)
      expect(
        r.refused[0].code,
        `F-5/F-3 re-home (node ${String(node)}): 'node: null/absent with no factory' is NO-NODE (N-3/F-3), NOT malformed-entry (F-5)`,
      ).toBe('no-node')
      expect(keyIsVerbatim('k-nullnode', r.refused[0].key), `F-5/F-3 re-home (node ${String(node)}): the exact key as supplied`).toBe(true)
      expect(h.keys(), `F-5/F-3 re-home (node ${String(node)}): the key is not owned`).toEqual([])
    }
  })

  it('F-6 §3.2 — a previously placed node DETACHED by the caller: no throw, no dangling ownership', async () => {
    const { create } = await surface('F-6')
    for (const driveKind of ['close', 'setEntries(null)'] as const) {
      const mount = mountEl()
      const a = nodeEl('div', 'a')
      const b = nodeEl('div', 'b')
      const h = create({ mount })
      drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), `F-6 ${driveKind} setEntries`)
      a.remove() // the CALLER detaches a host-placed node itself
      expect(containsRef(childrenOf(mount), a), `F-6 ${driveKind}: precondition — the caller detached the node`).toBe(false)
      const r = asResult(
        drive(() => (driveKind === 'close' ? h.close('a') : h.setEntries(null)), `F-6 ${driveKind} after the caller's detach`),
        `F-6 ${driveKind} after the caller's detach`,
      )
      expect(r.ok, `F-6 ${driveKind}: the removal is a no-op, never a refusal`).toBe(true)
      expect(r.refused, `F-6 ${driveKind}: refused is []`).toEqual([])
      expect(h.keys().includes('a'), `F-6 ${driveKind}: the key is NOT left dangling in keys()`).toBe(false)
      // ⟶ PINNED 2026-09-27 (the adversarial + PBT-audit pass; judgment call 10 —
      // this replaces the OLD "deliberately NOT pinned" text, because the
      // contract now rules it): a DETACHED node still DOES appear in `removed`.
      // `§3.2 F-6`'s "or not" is no longer an open implementer choice — the host
      // reports what it removed for the key, whether or not the tree still held
      // it (`§3.2 F-6`'s own pinned ruling; `§3.1 M-21` carries the permanence).
      expect(
        containsRef(r.removed, a),
        `F-6 ${driveKind}: the caller-detached node STILL appears in removed — the pinned reading (judgment call 10 at §3.2 F-6, 2026-09-27)`,
      ).toBe(true)
      if (driveKind === 'close') {
        expect(r.removed, `F-6 close('a'): removed is exactly [a] — one key dropped, one node reported`).toEqual([a])
      } else {
        expect(r.removed, `F-6 setEntries(null): the already-detached 'a' is reported alongside the still-placed 'b'`).toEqual([a, b])
      }
      for (const node of r.removed) {
        expect(
          node === a || node === b,
          `F-6 ${driveKind}: only the host's OWN nodes (a, b) appear in removed — never a node it did not place (§2.3 item 2)`,
        ).toBe(true)
      }
    }
  })

  it('F-7 §3.2 — a null/absent mount is NOT a refusal (the deliberate asymmetry with U-MOUNTGUARD)', async () => {
    const { create } = await surface('F-7')
    for (const mount of [null, undefined] as const) {
      const h = create({ mount: mount as never })
      const r = asResult(drive(() => h.setEntries([{ key: 'a', node: nodeEl('div', 'a') }]), `F-7 mount=${String(mount)}`), `F-7 mount=${String(mount)}`)
      expect(r.refused, `F-7 mount=${String(mount)}: refused is []`).toEqual([])
      expect(r.ok, `F-7 mount=${String(mount)}: ok === true`).toBe(true)
      expect(
        r.refused.some((x) => (x as { code?: string }).code === 'mount-not-appendable'),
        "F-7: U-MOUNTGUARD's `mount-not-appendable` class does NOT apply here — the asymmetry is deliberate and a later pass must not harmonise the two",
      ).toBe(false)
    }
  })

  it('F-8 §3.2 — setOrder with unknown/duplicate keys: IGNORED, never refused', async () => {
    const { create } = await surface('F-8')
    const mount = mountEl()
    const h = create({ mount })
    drive(
      () => h.setEntries([{ key: 'a', node: nodeEl('div', 'a') }, { key: 'b', node: nodeEl('div', 'b') }, { key: 'c', node: nodeEl('div', 'c') }]),
      'F-8 setEntries',
    )
    const r1 = asResult(drive(() => h.setOrder(['c', 'a']), "F-8 setOrder(['c','a']) — an omitted key"), "F-8 setOrder(['c','a']) — an omitted key")
    expect(r1.ok, 'F-8: ok === true — an omitted key is not a refusal').toBe(true)
    expect(r1.refused, "F-8: refused is [] — 'b' is not refused, it is simply not named").toEqual([])
    expect(r1.order.length, 'F-8: order is the current key set, each once').toBe(3)
    expect(new Set(r1.order).size, 'F-8: no key appears twice').toBe(3)
    expect(r1.order.indexOf('c'), "F-8: the requested RELATIVE order is kept ('c' before 'a')").toBeLessThan(r1.order.indexOf('a'))

    const r2 = asResult(drive(() => h.setOrder(['a', 'a', 'nope']), "F-8 setOrder(['a','a','nope'])"), "F-8 setOrder(['a','a','nope'])")
    expect(r2.ok, 'F-8: ok === true — the unknown and the duplicate key are IGNORED, not refused').toBe(true)
    expect(r2.refused, 'F-8: refused is []').toEqual([])
    expect(r2.order.length, 'F-8: order is exactly the current key set').toBe(3)
    expect(new Set(r2.order).size, 'F-8: the duplicate key appears ONCE').toBe(3)
    expect(r2.order[0], "F-8: the requested relative order puts 'a' first").toBe('a')
    expect(r2.order.includes('nope'), "F-8: the unknown key NEVER appears in order").toBe(false)
    expect(h.keys().length, 'F-8: the key set is unchanged').toBe(3)
  })

  it('F-9 §3.2 — setEntries(null)/(undefined) after a populated set: the placed nodes are removed, foreign siblings are not', async () => {
    const { create } = await surface('F-9')
    const mount = mountEl()
    const f1 = nodeEl('div', 'foreign-1')
    const f2 = nodeEl('div', 'foreign-2')
    mount.appendChild(f1)
    mount.appendChild(f2)
    const nodes = [nodeEl('div', 'a'), nodeEl('div', 'b'), nodeEl('div', 'c')]
    const h = create({ mount })
    drive(() => h.setEntries(nodes.map((n, i) => ({ key: ['a', 'b', 'c'][i], node: n }))), 'F-9 setEntries #1 (populate 3)')
    const r = asResult(drive(() => h.setEntries(null), 'F-9 setEntries(null)'), 'F-9 setEntries(null)')
    expect(r.ok, 'F-9: ok === true (no refusal)').toBe(true)
    expect(r.refused, 'F-9: refused is []').toEqual([])
    expect(r.order, 'F-9: order is []').toEqual([])
    expect(r.removed.length, 'F-9: the three host-placed nodes appear in removed').toBe(3)
    for (let i = 0; i < nodes.length; i += 1) {
      expect(containsRef(r.removed, nodes[i]), `F-9: node ${i} is in removed, by reference`).toBe(true)
      expect(containsRef(childrenOf(mount), nodes[i]), `F-9: node ${i} left the mount`).toBe(false)
    }
    expect(h.keys(), 'F-9: keys() is []').toEqual([])
    // the M-8 row re-run in THIS shape
    expectRefsEqual(foreignSubsequence(mount, [f1, f2]), [f1, f2], 'F-9: foreign siblings UNTOUCHED — the same objects, same relative order')
    expect(f1.removed, 'F-9: foreign sibling #1 was never removed').toBe(false)
    expect(f2.removed, 'F-9: foreign sibling #2 was never removed').toBe(false)

    // §2.1's setEntries doc: `null`/`undefined` ⇒ an EMPTY set — the same fact.
    const h2 = create({ mount: mountEl() })
    drive(() => h2.setEntries([{ key: 'a', node: nodeEl('div', 'a') }]), 'F-9 undefined-shape populate')
    const r2 = asResult(drive(() => h2.setEntries(undefined), 'F-9 setEntries(undefined)'), 'F-9 setEntries(undefined)')
    expect(r2.ok, 'F-9 (undefined): ok === true').toBe(true)
    expect(r2.order, 'F-9 (undefined): order is []').toEqual([])
    expect(h2.keys(), 'F-9 (undefined): keys() is []').toEqual([])
  })

  it('F-10 §3.2 — activate on a key whose node was DETACHED: the callback still fires once', async () => {
    const { create } = await surface('F-10')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const seen: ListKey[] = []
    const h = create({ mount, onActivate: (key) => seen.push(key) })
    drive(() => h.setEntries([{ key: 'a', node: a }]), 'F-10 setEntries')
    a.remove() // the caller detaches the placed node
    expect(containsRef(childrenOf(mount), a), 'F-10 precondition: the node is detached from the mount').toBe(false)
    const before = seen.length
    const r = asResult(drive(() => h.activate('a'), "F-10 activate('a') with a detached node"), "F-10 activate('a') with a detached node")
    expect(seen.length - before, 'F-10: the callback STILL fires exactly once — activation is a caller-semantic event, not a DOM event').toBe(1)
    expect(seen[seen.length - 1], 'F-10: the fired key is the requested one').toBe('a')
    expect(r.ok, 'F-10: a KNOWN key is not refused, detached or not').toBe(true)
    expect(r.refused, 'F-10: refused is []').toEqual([])
    expect(h.keys(), 'F-10: the key is still owned').toEqual(['a'])
  })

  it('F-11 §3.2 — a REFUSED first occurrence followed by a VALID one: ONE no-node refusal, no duplicate-key, the valid occurrence PLACED (the ADV-LH-4 refusal half)', async () => {
    // =====================================================================
    // THE STATES THIS ROW ENUMERATES (`§3.2 F-11`, ADDED 2026-09-27 by the
    // adversarial + PBT-audit pass; finding `ADV-LH-4`, MED — the REFUSAL half;
    // the valid-state half is `§3.1 M-19`, ruled by `§2.1`'s ACCEPTANCE rule +
    // node-rule case `N-5`).
    //   (1) the REFUSAL state — `setEntries([{key:'k'}, {key:'k', node:n}])`
    //       with no `itemFactory`: **ONE** refusal, `code === 'no-node'`, the
    //       refused key `'k'` VERBATIM, and **NO** `duplicate-key` member;
    //   (2) the PLACEMENT state — the second, valid occurrence IS placed:
    //       `placed === [n]` by reference (`toBe`), `order === ['k']`;
    //   (3) the CALLBACK state — a subsequent `close('k')` fires `onClose`
    //       once and removes `n` from the mount (`M-10`/`M-19`).
    // F-2 and F-11 are TWO DIFFERENT SHAPES and both remain rows: F-2 is two
    // VALID occurrences (first-wins); F-11 is a REFUSED first occurrence
    // followed by a valid one (the valid occurrence wins the key outright).
    // GREEN REGRESSION ROW (`ADV-LH-4`, MED, `CONTRACT-AMENDED` — the REFUSAL
    // half the `§3b`-1 row owes): the guard has LANDED, so ONE `no-node` refusal
    // is the whole refusal set and the VALID occurrence is placed.
    // (2026-09-27 old wording, kept visible: "TWO refusals (`no-node` +
    // `duplicate-key`), `order === []`, `placed === []`".)
    // =====================================================================
    const { create } = await surface('F-11')
    const mount = mountEl()
    const n = nodeEl('div', 'n')
    const closed: ListKey[] = []
    const h = create({ mount, onClose: (key) => closed.push(key) })

    const r = asResult(
      drive(() => h.setEntries([{ key: 'k' }, { key: 'k', node: n }]), 'F-11 setEntries([{key:k}, {key:k, node:n}]) with no itemFactory'),
      'F-11 setEntries([{key:k}, {key:k, node:n}]) with no itemFactory',
    )
    expect(r.ok, 'F-11: ok === false — the first occurrence was refused (§3.3 I-1)').toBe(false)
    expect(r.refused, 'F-11: refused has EXACTLY one member').toHaveLength(1)
    expect(r.refused[0].code, 'F-11: the typed code of the FIRST occurrence — no-node').toBe('no-node')
    expect(keyIsVerbatim('k', r.refused[0].key), 'F-11: the refusal names the key exactly as supplied').toBe(true)
    expect(
      r.refused.some((x) => x.code === 'duplicate-key'),
      'F-11: NO duplicate-key refusal — the duplicate test is made against keys ACCEPTED in this call (ADV-LH-4 / §2.1 ACCEPTANCE rule)',
    ).toBe(false)
    expect(r.placed, 'F-11: the second, VALID occurrence IS placed — placed === [n]').toHaveLength(1)
    expect(r.placed[0], 'F-11: by reference (the host never clones or re-creates a caller node)').toBe(n)
    expect(r.order, "F-11: order === ['k'] — the key is owned once, not reserved by the refused occurrence").toEqual(['k'])
    expect(containsRef(childrenOf(mount), n), 'F-11: the valid occurrence really is in the mount').toBe(true)

    const rc = asResult(drive(() => h.close('k'), "F-11 close('k')"), "F-11 close('k')")
    expect(closed, "F-11: onClose fires exactly once, with the key").toEqual(['k'])
    expect(containsRef(rc.removed, n), "F-11: close('k') removes n").toBe(true)
    expect(containsRef(childrenOf(mount), n), "F-11: n left the mount").toBe(false)
    expect(h.keys(), 'F-11: no ownership survives the close').toEqual([])
  })
})

// ===========================================================================
// ADV-LH-1 / ADV-LH-3 / ADV-LH-4 — THE REGRESSION ROWS OF THE 2026-09-27
// ADVERSARIAL + PBT-AUDIT PASS (`docs/specs/listhost.md` §3b-1's four fix-side
// findings; §0's adversarial status note names the clause each row is written
// against). These rows are the RED half of the next cycle: they are authored
// from the CONTRACT TEXT (`§2.1`'s totality clause, its totality-extends-to-
// injected-functions clause with its four named safe defaults, and its
// ACCEPTANCE rule + `N-5`) and every one of them is RED against the as-shipped
// host. `ADV-LH-4`'s two halves are the contract rows `§3.1 M-19` and `§3.2
// F-11`, driven above in their own blocks; this block carries the three
// totality rows plus the FOUR per-seam rows the finding takes.
// ===========================================================================
describe('ADV-LH — the adversarial regression rows (§2.1 totality, per-seam safe defaults, the ACCEPTANCE rule)', () => {
  it('ADV-LH-1 (§3b-1, HIGH) — an injected orderOf that THROWS escapes NO result-returning method; the SUPPLIED order is used and NO refusal is invented for it', async () => {
    // =====================================================================
    // THE BEHAVIOUR CONTRACT THIS ROW IS WRITTEN AGAINST (`§2.1`'s totality
    // clause, RULED 2026-09-27 by `ADV-LH-1`; `§3a A-5` is RULED BY IT, not
    // deferred). Drive: `createOwnedListHost({ mount, orderOf: () => { throw new
    // Error('x') } })`, then `setEntries([a,b])` / `render()` / `setOrder([...])`.
    // THE OBSERVABLE, in the three parts the spec states:
    //   (1) NO escape from any of the SIX result-returning methods
    //       (`setEntries`, `remove`, `setOrder`, `render`, `activate`, `close`);
    //   (2) NOTHING is lost to the throw: every VALID entry is still placed and
    //       owned, exactly as if `orderOf` had been omitted — the SUPPLIED
    //       order is the fallback, and `order` is the current key set in
    //       supplied order, each key ONCE (`I-7`);
    //   (3) NO refusal code is invented for it — `orderOf` is CALLER code, the
    //       vocabulary is FIVE codes and none of them is "the comparator threw",
    //       so a swallowed `orderOf` throw contributes NO `ListHostRefusal`
    //       entry and `ok === true` when nothing was refused (`I-1`).
    // GREEN REGRESSION ROW — the `ADV-LH-1` "escape" was REVERSED to
    // `NOT-A-FINDING` (code) by the 2026-09-27 documentation/supervisor
    // verification: the comparator has ONE invocation site, inside
    // `projectionFor`'s own `try/catch`, and `setOrder` never invokes it — so no
    // escape EVER existed, and the row is a green positive regression row pinning
    // §2.1's totality observable (`keys()`/placement/no invented refusal) with
    // its assertions re-pinned to the correct drive boundary (`§3b`-1 `ADV-LH-1`).
    // (2026-09-27 old wording, kept visible: the as-shipped `setEntries` "calls
    // the projection OUTSIDE any `try`, so the throw escapes the row's very first
    // drive".)
    // =====================================================================
    const { create } = await surface('ADV-LH-1')
    const mount = mountEl()
    const foreign = nodeEl('div', 'foreign')
    mount.appendChild(foreign) // a foreign sibling, so the row also pins §2.3 item 3
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')

    let comparatorCalls = 0
    const h = create({
      mount,
      orderOf: () => {
        comparatorCalls += 1
        throw new Error('x')
      },
    })

    const r1 = tryDrive('setEntries([a,b])', () => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]))

    // -----------------------------------------------------------------------
    // THE `setEntries`-TIME ASSERTIONS. Everything below is asserted BEFORE the
    // row's remaining drives run, because those drives MOVE the state it talks
    // about: `r5` `close('b')` and `r6` `remove('a')` are exactly the two
    // methods that drop ownership and take the host's node back out of the
    // mount (`§3.1 M-10`/`M-11`). Asserting these three claims after the whole
    // six-drive sequence would contradict the row's own later assertions
    // (`['a']` after the close, `[]` after the remove) and could only pass for a
    // host that ignored its own `close`/`remove` — `§2.1 keys()` + `§3.1 M-10`.
    // -----------------------------------------------------------------------
    expect(h.keys(), 'ADV-LH-1: the keys are OWNED, in the supplied order').toEqual(['a', 'b'])
    const s1 = asResult(r1.value, 'ADV-LH-1 setEntries([a,b]) with a throwing orderOf')
    expect(s1.refused, 'ADV-LH-1: NO refusal is invented for the comparator throw (a swallowed orderOf throw contributes no ListHostRefusal)').toEqual([])
    expect(s1.ok, 'ADV-LH-1: ok === true — nothing was refused (I-1)').toBe(true)
    expect(s1.order, 'ADV-LH-1: order is the current key set in the SUPPLIED order, each key once (§2.1 totality clause, I-7)').toEqual(['a', 'b'])
    expect(s1.placed, 'ADV-LH-1: every VALID entry is still placed — nothing is lost to the throw').toHaveLength(2)
    expect(s1.placed[0], 'ADV-LH-1: placed[0] is the supplied node for a, by reference').toBe(a)
    expect(s1.placed[1], 'ADV-LH-1: placed[1] is the supplied node for b, by reference').toBe(b)
    expect(childrenOf(mount)[0], 'ADV-LH-1: the foreign sibling is still the first child (§2.3 item 3)').toBe(foreign)
    expect(containsRef(childrenOf(mount), a), 'ADV-LH-1: the valid entry a is really placed in the mount').toBe(true)
    expect(containsRef(childrenOf(mount), b), 'ADV-LH-1: the valid entry b is really placed in the mount').toBe(true)

    const r2 = tryDrive('render()', () => h.render())
    const s2 = asResult(r2.value, 'ADV-LH-1 render() with a throwing orderOf')
    expect(s2.refused, 'ADV-LH-1: render() refuses nothing').toEqual([])
    expect(s2.ok, 'ADV-LH-1: render() is ok').toBe(true)
    expect(s2.order, 'ADV-LH-1: render() keeps the supplied order').toEqual(['a', 'b'])

    const r3 = tryDrive("setOrder(['b','a'])", () => h.setOrder(['b', 'a']))
    const s3 = asResult(r3.value, "ADV-LH-1 setOrder(['b','a']) with a throwing orderOf")
    expect(s3.refused, 'ADV-LH-1: setOrder refuses nothing — the caught comparator falls back to the supplied order').toEqual([])
    expect(s3.ok, 'ADV-LH-1: setOrder is ok').toBe(true)
    expect(s3.order, "ADV-LH-1: setOrder(['b','a']) projects the requested order even though the comparator threw").toEqual(['b', 'a'])

    const r4 = tryDrive("activate('zzz') (an UNKNOWN key — the only refusal in this sequence)", () => h.activate('zzz'))
    const s4 = asResult(r4.value, "ADV-LH-1 activate('zzz') on an unknown key")
    expect(s4.refused, "ADV-LH-1: the ONLY refusal in this sequence is the unknown key's — never the comparator's").toHaveLength(1)
    expect(s4.refused[0].code, "ADV-LH-1: and its class is unknown-key (the five-code vocabulary has no comparator-threw member)").toBe('unknown-key')
    expect(keyIsVerbatim('zzz', s4.refused[0].key), 'ADV-LH-1: the refusal holds the supplied key verbatim').toBe(true)
    expect(s4.ok, 'ADV-LH-1: ok === false for the refused call (I-1)').toBe(false)

    // `close('b')` and its ownership claim are asserted TOGETHER: the claim is
    // about the state THIS call leaves (b dropped, a still owned), so it is read
    // before `remove('a')` — the very next drive — drops the rest.
    const r5 = tryDrive("close('b')", () => h.close('b'))
    const s5 = asResult(r5.value, "ADV-LH-1 close('b')")
    expect(s5.refused, 'ADV-LH-1: close on a KNOWN key refuses nothing').toEqual([])
    expect(s5.ok, 'ADV-LH-1: close is ok').toBe(true)
    expect(h.keys(), "ADV-LH-1: close('b') dropped b, and a is still owned").toEqual(['a'])

    const r6 = tryDrive("remove('a')", () => h.remove('a'))
    const s6 = asResult(r6.value, "ADV-LH-1 remove('a')")
    expect(s6.refused, 'ADV-LH-1: remove on a KNOWN key refuses nothing').toEqual([])
    expect(s6.ok, 'ADV-LH-1: remove is ok').toBe(true)
    expect(h.keys(), 'ADV-LH-1: the host ends owned-empty, with no throw anywhere').toEqual([])

    // The six-drive sequence's own report, read last: every drive is asserted
    // above on its own state, and this is the whole-sequence totality check.
    const drives = [r1, r2, r3, r4, r5, r6]
    const escaped = firstEscape(drives)
    expect(
      escaped,
      `ADV-LH-1: the throws that escaped (each is a §2.1 totality violation):\n${escapeReport(drives)}`,
    ).toBe(null)
    expect(comparatorCalls, 'ADV-LH-1: the injected comparator really IS called (its throw is swallowed, never avoided by not calling it)').toBeGreaterThan(0)
  })

  it('ADV-LH-3 · seam 1 — a THROWING orderOf is caught with the NAMED safe default: the SUPPLIED order, and no refusal', async () => {
    // The `§2.1` injected-function table's FIRST row: `orderOf` ⇒ the entry
    // takes the SUPPLIED order, identical to the omitted-`orderOf` default
    // (§2.2 prohibition 3: no policy is invented). No throw; `order` is the
    // current key set in supplied order, once each; NO refusal; ownership and
    // placement unaffected. Participating methods: `setEntries`/`setOrder` (the
    // projection paths) and `render`/`remove`/`close` (the sync paths).
    // BOTH projection paths are asserted on their FULL observable, because the
    // as-shipped host catches the comparator on `setOrder` ONLY: the
    // `setEntries` half of this seam's drive is what is RED today (the same
    // escape `ADV-LH-1` drives — `§2.1`'s totality clause makes the catch the
    // contract on BOTH paths, and the observable is asserted here, not just the
    // absence of a throw, so a no-throw-but-nothing-placed host cannot pass).
    const { create } = await surface('ADV-LH-3 · orderOf')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    const b = nodeEl('div', 'b')
    let calls = 0
    const h = create({
      mount,
      orderOf: () => {
        calls += 1
        throw new Error('orderOf')
      },
    })
    const d1 = tryDrive('setEntries([a,b])', () => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]))

    // -----------------------------------------------------------------------
    // THE `setEntries`-TIME ASSERTIONS — the seam's ownership/placement half,
    // asserted on `d1`'s own state BEFORE the remaining drives run. The drives
    // below END in `close('b')`/`remove('a')`, which are exactly the two methods
    // that drop ownership and take the host's node back out of the mount
    // (`§3.1 M-10`/`M-11`): `keys()` is `['a','b']` HERE and `[]` after them, so
    // the claim can only be pinned at this moment — asserted after the sequence
    // it would contradict the ownership-EMPTY assertion below and could only
    // pass for a host that ignored its own `close`/`remove` (`§2.1 keys()`).
    // -----------------------------------------------------------------------
    expect(h.keys(), 'ADV-LH-3 orderOf: the keys ARE owned after the setEntries path (the as-shipped escape loses them)').toEqual(['a', 'b'])
    const s1 = asResult(d1.value, 'ADV-LH-3 orderOf setEntries')
    expect(s1.refused, 'ADV-LH-3 orderOf: no refusal — the throw is not a contract refusal class').toEqual([])
    expect(s1.ok, 'ADV-LH-3 orderOf: ok === true').toBe(true)
    expect(s1.order, 'ADV-LH-3 orderOf: order is the current key set in SUPPLIED order, once each').toEqual(['a', 'b'])
    expect(s1.placed, 'ADV-LH-3 orderOf: ownership/placement unaffected — both entries placed').toHaveLength(2)
    expect(s1.placed[0], 'ADV-LH-3 orderOf: placed[0] is the supplied node by reference').toBe(a)
    expect(s1.placed[1], 'ADV-LH-3 orderOf: placed[1] is the supplied node by reference').toBe(b)
    expect(containsRef(childrenOf(mount), a), 'ADV-LH-3 orderOf: nothing is lost to the throw — a is really placed').toBe(true)

    const d2 = tryDrive("setOrder(['b','a'])", () => h.setOrder(['b', 'a']))
    const d3 = tryDrive('render()', () => h.render())
    const d4 = tryDrive("close('b')", () => h.close('b'))
    const d5 = tryDrive("remove('a')", () => h.remove('a'))
    const drives = [d1, d2, d3, d4, d5]
    expect(firstEscape(drives), `ADV-LH-3 orderOf: the throws that escaped:\n${escapeReport(drives)}`).toBe(null)
    expect(calls, 'ADV-LH-3 orderOf: the comparator is CALLED — the safe default is a CATCH, not an avoidance').toBeGreaterThan(0)
    const s2 = asResult(d2.value, "ADV-LH-3 orderOf setOrder(['b','a'])")
    expect(s2.refused, 'ADV-LH-3 orderOf: setOrder refuses nothing').toEqual([])
    expect(s2.order, 'ADV-LH-3 orderOf: the requested projection is applied').toEqual(['b', 'a'])
    expect(h.keys(), 'ADV-LH-3 orderOf: the sequence ends owned-EMPTY — close(b) and remove(a) dropped the rest (§3.1 M-10/M-11)').toEqual([])
  })

  it('ADV-LH-3 · seam 2 — a THROWING itemFactory is caught with the NAMED safe default: ONE factory-returned-null refusal, the key not owned', async () => {
    // The `§2.1` injected-function table's SECOND row: `itemFactory` ⇒ the
    // entry is refused **`factory-returned-null`** — the SAME class as a factory
    // that RETURNS `null`/`undefined` (`F-4`): no throw; `ok === false`; ONE
    // refusal; the key is NOT owned and ABSENT from `order` (`N-4`).
    // GREEN REGRESSION ROW — the `ADV-LH-3` `itemFactory` guard has LANDED, so
    // the row pins the ONE `factory-returned-null` refusal with the key NOT owned
    // (§2.1's injected-function clause; `§3b`'s `ADV-LH-3` table row).
    // (2026-09-27 old wording, kept visible: "the factory's throw escapes
    // `setEntries`".)
    const { create } = await surface('ADV-LH-3 · itemFactory')
    const mount = mountEl()
    const good = nodeEl('div', 'good')
    let calls = 0
    const h = create({
      mount,
      itemFactory: () => {
        calls += 1
        throw new Error('itemFactory')
      },
    })
    const drives = [tryDrive('setEntries([{key:bad}, {key:good, node}])', () => h.setEntries([{ key: 'bad' }, { key: 'good', node: good }]))]
    expect(firstEscape(drives), `ADV-LH-3 itemFactory: the throws that escaped:\n${escapeReport(drives)}`).toBe(null)
    expect(calls, 'ADV-LH-3 itemFactory: the factory is CALLED once for the node-less entry').toBe(1)
    const r = asResult(drives[0].value, 'ADV-LH-3 itemFactory setEntries')
    expect(r.ok, 'ADV-LH-3 itemFactory: ok === false — the entry was refused').toBe(false)
    expect(r.refused, 'ADV-LH-3 itemFactory: exactly ONE refusal (the node-less entry), not one per entry').toHaveLength(1)
    expect(r.refused[0].code, 'ADV-LH-3 itemFactory: the NAMED safe default class — factory-returned-null (the same class F-4 pins)').toBe('factory-returned-null')
    expect(keyIsVerbatim('bad', r.refused[0].key), 'ADV-LH-3 itemFactory: the refused key is the node-less one, verbatim').toBe(true)
    expect(r.order, 'ADV-LH-3 itemFactory: the key is NOT owned and is ABSENT from order (N-4)').toEqual(['good'])
    expect(containsRef(r.placed, good), 'ADV-LH-3 itemFactory: the other entry is placed normally (the §2.1 totality note)').toBe(true)
    expect(h.keys(), 'ADV-LH-3 itemFactory: keys() names only the valid key').toEqual(['good'])
  })

  it('ADV-LH-3 · seam 3 — a THROWING onActivate is SWALLOWED: the key stays owned and the callback is attempted exactly once per activate()', async () => {
    // The `§2.1` injected-function table's THIRD row: `onActivate` ⇒ the event
    // is **swallowed**: no throw; `ok === true`; the key stays owned; the
    // callback is attempted **exactly once** for that `activate(key)` (`M-9`).
    // GREEN REGRESSION ROW — the `ADV-LH-3` `onActivate` guard has LANDED: the
    // callback's throw is SWALLOWED and the key stays owned (§2.1's
    // injected-function clause, third row; `§3b`'s `ADV-LH-3` table row).
    // (2026-09-27 old wording, kept visible: "the throw escapes `activate`".)
    const { create } = await surface('ADV-LH-3 · onActivate')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    let calls = 0
    const h = create({
      mount,
      onActivate: () => {
        calls += 1
        throw new Error('onActivate')
      },
    })
    const drives = [tryDrive('setEntries([{key:a}])', () => h.setEntries([{ key: 'a', node: a }]))]
    expect(firstEscape(drives), `ADV-LH-3 onActivate: the throws that escaped:\n${escapeReport(drives)}`).toBe(null)
    const act1 = tryDrive("activate('a') #1", () => h.activate('a'))
    expect(firstEscape([act1]), 'ADV-LH-3 onActivate: the callback throw must not escape activate()').toBe(null)
    expect(calls, 'ADV-LH-3 onActivate: the callback is attempted EXACTLY once for that activate(key) (M-9)').toBe(1)
    const s1 = asResult(act1.value, "ADV-LH-3 onActivate activate('a') #1")
    expect(s1.ok, 'ADV-LH-3 onActivate: ok === true — the swallowed event is not a refusal').toBe(true)
    expect(s1.refused, 'ADV-LH-3 onActivate: refused === []').toEqual([])
    expect(h.keys(), 'ADV-LH-3 onActivate: the key STAYS OWNED').toEqual(['a'])
    const act2 = tryDrive("activate('a') #2 (activation is not one-shot)", () => h.activate('a'))
    expect(firstEscape([act2]), 'ADV-LH-3 onActivate: the second activate is swallowed too').toBe(null)
    expect(calls, 'ADV-LH-3 onActivate: exactly ONE call per activate(key) — the count is 2 after two calls').toBe(2)
  })

  it("ADV-LH-3 · seam 4 — a THROWING onClose is SWALLOWED and the drop STANDS (ok === true, the key gone, the node removed, `removed` holds it)", async () => {
    // The `§2.1` injected-function table's FOURTH row: `onClose` ⇒ swallowed AND
    // **the ownership drop STANDS** — the drop happens BEFORE the callback would
    // fire, so the host can catch the throw and still return its result: no
    // throw; `ok === true`; the key is GONE from `keys()`; its node is removed
    // (`M-10`) and appears in `removed`; never "ownership dropped with no result
    // returned" (the `ADV-LH-3` finding's own wording).
    // GREEN REGRESSION ROW — the `ADV-LH-3` `onClose` guard has LANDED: the
    // callback's throw is SWALLOWED with the drop STANDING and the declared
    // result still returned (§2.1's injected-function clause, fourth row).
    // (2026-09-27 old wording, kept visible: "the throw escapes `close`, WITH the
    // ownership already dropped".)
    const { create } = await surface('ADV-LH-3 · onClose')
    const mount = mountEl()
    const a = nodeEl('div', 'a')
    let calls = 0
    const h = create({
      mount,
      onClose: () => {
        calls += 1
        throw new Error('onClose')
      },
    })
    const drives = [tryDrive('setEntries([{key:a}])', () => h.setEntries([{ key: 'a', node: a }]))]
    expect(firstEscape(drives), `ADV-LH-3 onClose: the throws that escaped before the close:\n${escapeReport(drives)}`).toBe(null)
    const cl = tryDrive("close('a')", () => h.close('a'))
    expect(firstEscape([cl]), 'ADV-LH-3 onClose: the callback throw must NOT escape close() — the drop stands and the RESULT is still returned').toBe(null)
    expect(calls, 'ADV-LH-3 onClose: the callback is attempted exactly once for that close(key) (M-10)').toBe(1)
    const s = asResult(cl.value, "ADV-LH-3 onClose close('a')")
    expect(s.ok, 'ADV-LH-3 onClose: ok === true — a swallowed callback is not a refusal').toBe(true)
    expect(s.refused, 'ADV-LH-3 onClose: refused === []').toEqual([])
    expect(h.keys(), 'ADV-LH-3 onClose: the key is GONE from keys() — the drop STANDS').toEqual([])
    expect(containsRef(s.removed, a), "ADV-LH-3 onClose: the node is in `removed` — it was removed for that key").toBe(true)
    expect(containsRef(childrenOf(mount), a), 'ADV-LH-3 onClose: the node is really out of the mount (M-10)').toBe(false)
  })
})

// ===========================================================================
// S-1..S-6 — the §2.1 surface row and the §2.2/§2.4/§5.1 STATIC rows.
//
// §4.4's STOP CONDITIONS S-3 and S-4 govern two of these rows, and that is how
// they are labelled: S-3 says a row that would read the TREE to establish order
// must instead be written against `keys()`/`order` **and** that the module
// contains no child-order read other than its own bookkeeping; S-4 says the
// "zero graph ops on order change" row is **STATIC** (module imports/calls) and
// that no spy, hook or injection point may be added. The remaining static rows
// are `§2.2`'s prohibitions 1/2/4/6 (whose binding assertions the spec states as
// static rows over the module file) and `§5.1`'s diff scope.
// ===========================================================================
describe('S — §2.1 the surface + §2.2/§2.4/§5.1 the static rows over the module', () => {
  it("S-1 §2.1 — the module's runtime exports are exactly the one function, and the SOURCE declares the seven names", async () => {
    const { mod } = await surface('S-1 §2.1 the seven-export surface')
    expect(
      Object.keys(mod).sort(),
      "§2.1: the module's RUNTIME exports are exactly ['createOwnedListHost'] — the six other exports are types (erased at run time)",
    ).toEqual(['createOwnedListHost'])
    const src = moduleSource('S-1 §2.1 the seven-export surface')
    for (const [name, kind] of DECLARED_EXPORTS) {
      expect(src.includes(`export ${kind} ${name}`), `§2.1: the module declares 'export ${kind} ${name}'`).toBe(true)
    }
    const exportLines = staticHits(src, /^export\s/)
    expect(exportLines, `§2.1: SEVEN exports, and NOTHING ELSE — found ${exportLines.length}: ${JSON.stringify(exportLines)}`).toHaveLength(7)
  })

  it('S-2 §2.2 prohibition 1 — NO tab-strip / consumer vocabulary anywhere in the module; the only union is the five contract codes', () => {
    const raw = moduleSource('S-2 §2.2 prohibition 1')
    const hits = staticHits(
      raw,
      /(\btabs?\b|\bstrips?\b|\bpanes?\b|\bzones?\b|\bregions?\b|\boverflow\b|\bactive\b|\bselected\b)/i,
    )
    expect(
      hits,
      `§2.2 prohibition 1 — tab-strip / consumer vocabulary (tab, strip, pane, zone, region, overflow, active, selected) must not occur ANYWHERE in the module, a comment included (a comment naming one is a re-entry signal): ${JSON.stringify(
        hits,
      )}`,
    ).toEqual([])
    expect(staticHits(raw, /\bdocument\b/), '§2.2 prohibition 1 / §1: no `document` reference anywhere in the module').toEqual([])
    expect(
      /\bexport\s+type\s+ListKey\s*=\s*string\b/.test(raw),
      "§2.2 prohibition 1: keys are an OPEN `type ListKey = string` alias — so a consumer value can never be a member of a closed union",
    ).toBe(true)
    for (const code of REFUSAL_CODES) {
      expect(raw.includes(`'${code}'`), `§2.2 prohibition 1: the contract diagnostic literal '${code}' is present (the only string union)`).toBe(true)
    }
  })

  it('S-3 §4.4 stop-condition S-3 (+ §2.4 item 4) — order is NEVER read off the tree: no query API, no child-order read', () => {
    const code = stripComments(moduleSource('S-3 §4.4 S-3 / §2.4 item 4'))
    expectNoStaticHits(
      code,
      [
        { what: 'querySelectorAll (the SCH-11 acceptance line, §2.2 prohibition 6)', re: /\bquerySelectorAll\b/ },
        { what: 'querySelector', re: /\bquerySelector\b/ },
        { what: 'closest', re: /\bclosest\b/ },
        { what: 'getElementById (the shim AUTO-CREATES on a miss)', re: /\bgetElementById\b/ },
        { what: 'matchMedia (§2.2 prohibition 1/6, §1 out-of-scope)', re: /\bmatchMedia\b/ },
        { what: 'getComputedStyle', re: /\bgetComputedStyle\b/ },
        { what: 'activeElement (the ambient focus read)', re: /\bactiveElement\b/ },
        { what: 'a child-collection read (childNodes)', re: /\bchildNodes\b/ },
        { what: 'a first/last-child read', re: /\b(first|last)Child\b/ },
        { what: 'a sibling read', re: /\b(next|previous)Sibling\b/ },
        { what: 'a serialization read (innerHTML/outerHTML)', re: /\b(inner|outer)HTML\b/ },
        { what: 'a tree-order read through `children` indexes — the host tracks its OWN order (S-3: order is a projection)', re: /\bchildren\s*\[/ },
      ],
      'S-3 §4.4 S-3 / §2.4 item 4',
    )
  })

  it('S-4 §4.4 stop-condition S-4 (+ §2.4 item 5, §5.1, §6) — ZERO graph seam: no renderer/main import, no graph op', () => {
    const code = stripComments(moduleSource('S-4 §4.4 S-4 / §2.4 item 5'))
    expectNoStaticHits(
      code,
      [
        { what: 'an import from src/renderer/** (§5.1 outside-the-scope, §6 second falsification)', re: /from\s+['"][^'"]*\/renderer\// },
        { what: 'an import from src/main/** (§5.1 outside-the-scope)', re: /from\s+['"][^'"]*\/main\// },
        { what: 'an import from src/shared/types (an MCP/Rpc surface, §2.2 prohibition 5)', re: /from\s+['"][^'"]*shared\/types/ },
        { what: 'the electron module', re: /from\s+['"]electron['"]/ },
        { what: 'node:fs / any file I/O', re: /\b(require\s*\(|node:fs|node:path|process\.)/ },
        { what: 'provident-ssr (the engine)', re: /from\s+['"]provident-ssr['"]/ },
        { what: 'dispatch / a graph command (§2.4 item 5: ZERO graph ops on an order change)', re: /\b(dispatch|applyCommand|dispatchEvent)\b/ },
        { what: 'a load/teardown/bootstrap seam', re: /\b(loadEnvelope|loadDoc|codeLoad|teardown|bootstrap|renderProducingProcess)\b/i },
        { what: 'a graph/op vocabulary (§2.4 item 5: no graph pass on order change)', re: /\b(graph|op)\b/ },
      ],
      'S-4 §4.4 S-4 / §2.4 item 5',
    )
  })

  it('S-5 §2.2 prohibition 2 (+ §2.3) — the host authors NO content: no attribute/class/style/text write, no node creation', () => {
    const code = stripComments(moduleSource('S-5 §2.2 prohibition 2'))
    expectNoStaticHits(
      code,
      [
        { what: 'document.createElement (the host creates NO node — §2.2 prohibition 2/3)', re: /\bcreateElement\b/ },
        { what: 'setAttribute (no attribute write of any kind)', re: /\.setAttribute\s*\(/ },
        { what: 'removeAttribute', re: /\.removeAttribute\s*\(/ },
        { what: 'a textContent write', re: /\.textContent\s*=/ },
        { what: 'a className/classList write', re: /(\.className\s*=|\bclassList\b)/ },
        { what: 'a style write', re: /\.style\s*(\.|\[|=)/ },
        { what: 'a role/aria attribute literal (no ARIA authorship)', re: /['"](role|aria-[a-z-]+)['"]/ },
        { what: 'cloneNode (the host never clones a caller node — §2.3 item 5)', re: /\bcloneNode\b/ },
        { what: 'insertBefore / replaceChild (the host never re-parents a foreign sibling)', re: /\b(insertBefore|replaceChild)\b/ },
        { what: 'an ambient document/window reference (§1 out-of-scope)', re: /\b(document|window|globalThis)\b/ },
      ],
      'S-5 §2.2 prohibition 2',
    )
  })

  it('S-6 §2.2 prohibition 4/6 (+ §1) — no store, no persistence, no module-level mutable state, no randomness', () => {
    const code = stripComments(moduleSource('S-6 §2.2 prohibition 4/6'))
    expectNoStaticHits(
      code,
      [
        { what: 'localStorage/sessionStorage (persistence)', re: /\b(localStorage|sessionStorage|indexedDB)\b/ },
        { what: 'a WeakMap/WeakSet registry keyed by mount', re: /\b(WeakMap|WeakSet)\b/ },
        { what: 'a module-level Map/Set registry (mutable module state)', re: /^(?:export\s+)?const\s+[\w$]+\s*(?::[^=]+)?=\s*new\s+(Map|Set|WeakMap|WeakSet)\b/m },
        { what: 'a module-level `let`/`var` (the host holds NO state between calls)', re: /^(?:export\s+)?(?:let|var)\s/m },
        { what: 'randomness (the mechanism is deterministic)', re: /\bMath\.random\b/ },
        { what: 'a network/IPC surface', re: /\b(fetch|XMLHttpRequest|ipcRenderer|ipcMain)\b/ },
      ],
      'S-6 §2.2 prohibition 4/6',
    )
  })
})

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER (7 rows, ALL executed deterministically).
//
// Type algebra (`docs/specs/engine-pin.md` §5.5's): `P-IM` invariant ·
// `P-SM` state-machine · `P-TP` totality. Each row's `it` title carries the row
// id AND its strategy id. Caps: ≤100 attempts per row, ≤400 total, register
// order, STOP AFTER 5 CONSECUTIVE FAILURES.
// ===========================================================================
describe('§5.5.1 — the typed property register (7 rows, executed deterministically, no PBT harness)', () => {
  it('P-LH-IM-1 [S-LH-PERM-1] — for EVERY permutation of the current key set: order === p, no refusals, identity preserved, nothing removed', async () => {
    // ⟶ RE-PINNED 2026-09-27 (the adversarial + PBT-audit pass; finding
    // `ADV-LH-6`, LOW — `ACCEPTED-AS-PINNED`, a DOC act: the row's STATEMENT and
    // its `33`-attempt discipline are UNCHANGED). `§5.5.1 P-LH-IM-1` now carries
    // the SAME HONEST BOUNDED MARKING `P-LH-TP-1` carries: the property TEXT
    // ("for EVERY permutation of the current key set") is **LARGER THAN ITS
    // ENUMERATION** — what is executed is the exhaustive `S₃` (`6`) and `S₄`
    // (`24`) tables below plus the `3` partial-`setOrder` drives of `§3.2 F-8`,
    // i.e. `n = 3` and `n = 4` ONLY. So this row's executed cell reads
    // **`YES (bounded)`** — an exhaustive-over-what-is-enumerated claim, never a
    // proof of the unbounded universal. No clause of the statement is weakened:
    // every permutation IN THE TABLES is asserted exactly.
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-IM-1', 'S-LH-PERM-1')

    const permCases: Array<{ keys: readonly string[]; perm: readonly string[] }> = [
      ...PERMS_S3.map((p) => ({ keys: S3_KEYS, perm: p })),
      ...PERMS_S4.map((p) => ({ keys: S4_KEYS, perm: p })),
    ]
    for (const c of permCases) {
      rec.run(`permutation ${c.perm.join('')} of {${c.keys.join(',')}}`, () => {
        if (create === null) return reason
        const mount = mountEl()
        const supplied: Record<string, ShimElement> = {}
        for (const k of c.keys) supplied[k] = nodeEl('div', `p-${k}`)
        const h = create({ mount })
        h.setEntries(c.keys.map((k) => ({ key: k, node: supplied[k] })))
        h.render()
        const r = h.setOrder(c.perm)
        if (r.refused.length !== 0) return `refused.length === ${r.refused.length} (expected 0): ${JSON.stringify(r.refused)}`
        if (JSON.stringify(r.order) !== JSON.stringify([...c.perm])) return `order === ${JSON.stringify(r.order)} (expected ${JSON.stringify([...c.perm])})`
        if (r.removed.length !== 0) return `removed.length === ${r.removed.length} — a permutation removes NOTHING`
        for (let i = 0; i < c.perm.length; i += 1) {
          if (!sameRef(r.placed[i], supplied[c.perm[i]])) {
            return `placed[${i}] is not the object supplied for '${c.perm[i]}' — identity broken by the permutation`
          }
        }
        const owned = childrenOf(mount).filter((child) => c.keys.some((k) => sameRef(child, supplied[k])))
        const ownedOrder = owned.map((child) => c.keys.find((k) => sameRef(child, supplied[k])) ?? '?')
        if (JSON.stringify(ownedOrder) !== JSON.stringify([...c.perm])) {
          return `the host-owned subsequence of mount.children is ${JSON.stringify(ownedOrder)} (expected ${JSON.stringify([...c.perm])})`
        }
        return null
      })
    }

    // THE THIRD FIXED TABLE of the cell (§3.2 F-8's ignored-key/duplicate rule).
    // COUNTED in `§5.5.1`'s corrected arithmetic (`P-LH-IM-1` = 6 + 24 + 3 = 33):
    // these 3 `setOrder` drives are attempts of this row, and the as-filed "157"
    // form omitted them.
    for (const p of PARTIAL_SHAPES) {
      rec.run(`partial setOrder(${JSON.stringify(p)})`, () => {
        if (create === null) return reason
        const mount = mountEl()
        const supplied: Record<string, ShimElement> = { a: nodeEl('div', 'a'), b: nodeEl('div', 'b'), c: nodeEl('div', 'c') }
        const current = Object.keys(supplied)
        const h = create({ mount })
        h.setEntries(current.map((k) => ({ key: k, node: supplied[k] })))
        const r = h.setOrder(p)
        if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)}) — F-8: unknown/duplicate keys are IGNORED, never refused`
        if (r.refused.length !== 0) return `refused.length === ${r.refused.length} (F-8: ignored, not refused)`
        if (r.order.length !== current.length) return `order.length === ${r.order.length} (expected the ${current.length} current keys, once each)`
        if (new Set(r.order).size !== r.order.length) return `order repeats a key: ${JSON.stringify(r.order)}`
        const survivors: string[] = []
        for (const k of p) if (current.includes(k) && !survivors.includes(k)) survivors.push(k)
        const got = [...r.order].filter((k) => survivors.includes(k))
        if (JSON.stringify(got) !== JSON.stringify(survivors)) {
          return `the surviving keys' REQUESTED relative order is ${JSON.stringify(got)} (expected ${JSON.stringify(survivors)})`
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-IM-2 [S-LH-IDENT-1] — for EVERY owned key and every enumeration above, placed[i] is the very object supplied (or returned)', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-IM-2', 'S-LH-IDENT-1')

    const permCases: Array<{ keys: readonly string[]; perm: readonly string[] }> = [
      ...PERMS_S3.map((p) => ({ keys: S3_KEYS, perm: p })),
      ...PERMS_S4.map((p) => ({ keys: S4_KEYS, perm: p })),
    ]
    for (const c of permCases) {
      rec.run(`identity across permutation ${c.perm.join('')} of {${c.keys.join(',')}}`, () => {
        if (create === null) return reason
        const mount = mountEl()
        const supplied: Record<string, ShimElement> = {}
        for (const k of c.keys) supplied[k] = nodeEl('div', `i-${k}`)
        const h = create({ mount })
        const first = h.setEntries(c.keys.map((k) => ({ key: k, node: supplied[k] })))
        const before = identityBreak(first, supplied, `setEntries of {${c.keys.join(',')}}`)
        if (before !== null) return before
        const after = h.setOrder(c.perm)
        const brk = identityBreak(after, supplied, `setOrder(${JSON.stringify([...c.perm])})`)
        if (brk !== null) return brk
        const keys = h.keys()
        if (JSON.stringify(keys) !== JSON.stringify([...c.perm])) return `keys() === ${JSON.stringify(keys)} (expected the projected order ${JSON.stringify([...c.perm])})`
        return null
      })
    }

    // THE FOUR FIXED IDENTITY SHAPES of the cell — `P-LH-IM-2`'s own total is
    // `34` (`§5.5.1`: the `30` shared permutation attempts re-driven here `+`
    // these `4` identity shapes); the `3` partial `F-8` drives of `P-LH-IM-1`'s
    // third table are NOT re-driven here.
    const shapes: Array<{ id: string; run: () => string | null }> = [
      {
        id: 'shape 1 · caller nodes',
        run: () => {
          if (create === null) return reason
          const mount = mountEl()
          const supplied: Record<string, ShimElement> = { a: nodeEl('div', 'a'), b: nodeEl('div', 'b'), c: nodeEl('div', 'c') }
          const h = create({ mount })
          const r = h.setEntries(Object.entries(supplied).map(([key, node]) => ({ key, node })))
          return identityBreak(r, supplied, 'shape 1 (caller nodes)')
        },
      },
      {
        id: 'shape 2 · factory nodes',
        run: () => {
          if (create === null) return reason
          const mount = mountEl()
          const made: Record<string, ShimElement> = {}
          const h = create({
            mount,
            itemFactory: (e) => {
              const n = nodeEl('div', `made-${String(e.key)}`)
              made[String(e.key)] = n
              return n
            },
          })
          const r = h.setEntries([{ key: 'a' }, { key: 'b' }, { key: 'c' }])
          return identityBreak(r, made, 'shape 2 (factory nodes)')
        },
      },
      {
        id: 'shape 3 · a changed node for a repeated key (M-13)',
        run: () => {
          if (create === null) return reason
          const mount = mountEl()
          const n1 = nodeEl('div', 'n1')
          const n2 = nodeEl('div', 'n2')
          const h = create({ mount })
          h.setEntries([{ key: 'k', node: n1 }])
          const r = h.setEntries([{ key: 'k', node: n2 }])
          if (!containsRef(r.removed, n1)) return "shape 3: the replaced node n1 is not in removed (M-13)"
          return identityBreak(r, { k: n2 }, 'shape 3 (a changed node for a repeated key)')
        },
      },
      {
        id: 'shape 4 · a factory node for one key while another key is node-less',
        run: () => {
          if (create === null) return reason
          const mount = mountEl()
          const callerNode = nodeEl('div', 'a')
          const made: Record<string, ShimElement> = {}
          const h = create({
            mount,
            itemFactory: (e) => {
              const n = nodeEl('div', `made-${String(e.key)}`)
              made[String(e.key)] = n
              return n
            },
          })
          const r = h.setEntries([{ key: 'a', node: callerNode }, { key: 'b' }])
          return identityBreak(r, { a: callerNode, b: made['b'] }, 'shape 4 (mixed caller/factory)')
        },
      },
    ]
    for (const shape of shapes) rec.run(shape.id, shape.run)
    rec.finish()
  })

  it('P-LH-IM-3 [S-LH-REPEAT-1] — a second call with unchanged inputs performs NO child mutation, over a fixed 4-shape table × 2 calls', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-IM-3', 'S-LH-REPEAT-1')

    type Shape = { id: string; entries: () => readonly ListEntry<unknown>[]; factory?: () => (e: ListEntry<unknown>) => unknown }
    const shapes: readonly Shape[] = [
      {
        id: 'shape A · 3 entries with caller nodes',
        entries: () => [nodeEl('div', 'a'), nodeEl('div', 'b'), nodeEl('div', 'c')].map((n, i) => ({ key: ['a', 'b', 'c'][i], node: n })),
      },
      {
        id: 'shape B · 3 entries through a factory',
        entries: () => [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
        factory: () => (e) => nodeEl('div', `f-${String(e.key)}`),
      },
      { id: 'shape C · 1 entry', entries: () => [{ key: 'only', node: nodeEl('div', 'only') }] },
      { id: 'shape D · an empty set', entries: () => [] },
    ]
    for (const shape of shapes) {
      const mount = mountEl()
      let host: OwnedListHost | null = null
      let firstRes: ListHostResult | null = null
      let firstChildren: unknown[] = []
      rec.run(`${shape.id} · call #1 (setEntries → render)`, () => {
        if (create === null) return reason
        host = create({ mount, ...(shape.factory !== undefined ? { itemFactory: shape.factory() as never } : {}) })
        host.setEntries(shape.entries())
        const r = host.render()
        firstRes = r
        firstChildren = snapshotChildren(mount)
        return null
      })
      rec.run(`${shape.id} · call #2 (render with unchanged inputs)`, () => {
        if (create === null) return reason
        if (host === null || firstRes === null) return 'the first call did not run, so the repeat cannot be compared'
        const first: ListHostResult = firstRes
        const r = host.render()
        if (r.removed.length !== 0) return `removed.length === ${r.removed.length} — a repeat with unchanged inputs removes NOTHING (I-2)`
        if (JSON.stringify(r.order) !== JSON.stringify(first.order)) return `order changed: ${JSON.stringify(r.order)} vs ${JSON.stringify(first.order)}`
        if (r.placed.length !== first.placed.length) return `placed.length changed: ${r.placed.length} vs ${first.placed.length}`
        for (let i = 0; i < first.placed.length; i += 1) {
          if (!sameRef(r.placed[i], first.placed[i])) return `placed[${i}] is not the SAME object the first call returned`
        }
        const now = snapshotChildren(mount)
        if (now.length !== firstChildren.length) return `mount.children.length changed: ${now.length} vs ${firstChildren.length}`
        for (let i = 0; i < firstChildren.length; i += 1) {
          if (!sameRef(now[i], firstChildren[i])) return `mount.children[${i}] is not reference-identical (a re-append moves a node to the end)`
        }
        if (r === first) return 'the result OBJECT was reused across calls (I-9)'
        for (const field of ['order', 'placed', 'removed', 'refused'] as const) {
          if (sameRef(r[field], first[field])) return `the '${field}' array was REUSED across calls (I-9)`
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-IM-4 [S-LH-FOREIGN-1] — over 5 fixed operation sequences, every foreign sibling survives by reference at an unchanged relative index', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-IM-4', 'S-LH-FOREIGN-1')

    type Ctx = {
      mount: ShimElement
      foreign: ShimElement[]
      supplied: Record<string, ShimElement>
      h: OwnedListHost
      removedSeen: unknown[]
      check: (stepId: string) => string | null
    }
    const entriesOf = (supplied: Record<string, ShimElement>) => Object.entries(supplied).map(([key, node]) => ({ key, node }))
    const sequences: Array<{ id: string; steps: Array<{ id: string; run: (c: Ctx) => void }> }> = [
      {
        id: 'sequence 1 · setEntries → render',
        steps: [
          { id: 'setEntries([a,b,c])', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render()', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
        ],
      },
      {
        id: 'sequence 2 · sequence 1 then setOrder of the reverse key set',
        steps: [
          { id: 'setEntries([a,b,c])', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render()', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
          { id: "setOrder(['c','b','a'])", run: (c) => void c.removedSeen.push(...c.h.setOrder(['c', 'b', 'a']).removed) },
        ],
      },
      {
        id: 'sequence 3 · two setEntries → render cycles',
        steps: [
          { id: 'setEntries([a,b,c]) #1', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render() #1', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
          { id: 'setEntries([a,b,c]) #2 (the same data)', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render() #2', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
        ],
      },
      {
        id: "sequence 4 · close('b')",
        steps: [
          { id: 'setEntries([a,b,c])', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render()', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
          { id: "close('b')", run: (c) => void c.removedSeen.push(...c.h.close('b').removed) },
        ],
      },
      {
        id: 'sequence 5 · setEntries(null)',
        steps: [
          { id: 'setEntries([a,b,c])', run: (c) => void c.removedSeen.push(...c.h.setEntries(entriesOf(c.supplied)).removed) },
          { id: 'render()', run: (c) => void c.removedSeen.push(...c.h.render().removed) },
          { id: 'setEntries(null)', run: (c) => void c.removedSeen.push(...c.h.setEntries(null).removed) },
        ],
      },
    ]

    for (const seq of sequences) {
      rec.run(seq.id, () => {
        if (create === null) return reason
        const mount = mountEl()
        const foreign = [nodeEl('div', 'foreign-a'), nodeEl('div', 'foreign-b'), nodeEl('div', 'foreign-c')]
        for (const f of foreign) mount.appendChild(f) // the caller seeds them BEFORE the host exists
        const supplied: Record<string, ShimElement> = { a: nodeEl('div', 'a'), b: nodeEl('div', 'b'), c: nodeEl('div', 'c') }
        const removedSeen: unknown[] = []
        // ⟶ ADV-LH-5 (2026-09-27, the adversarial + PBT-audit pass; HIGH): the
        // row's STATEMENT stays exactly as written and is NOT weakened — what is
        // strengthened is the strategy's POWER, so the row can FAIL for a host
        // that RE-APPENDS a node it already holds on every `sync()`. Every one of
        // the four assertions that stood here (the foreign siblings' RELATIVE
        // order among themselves, `removed === false`, `parent === mount`, and
        // non-membership in `removed`) HOLDS for that mutation — a re-appended
        // node is still the same object, still ordered among its siblings and
        // still parented — which is why this row could not fail for it.
        //
        // THE STRENGTHENED FORM (the TestWriter's choice between the spec's two
        // named options — "the mount's FULL CHILD REFERENCE SEQUENCE per step,
        // or an append/re-place COUNTER"): the mount's full child reference
        // sequence is captured BEFORE and AFTER every step, and the FOREIGN
        // siblings' exact indices are asserted to be INVARIANT across that
        // step's write — so the row reads the mount's whole child reference
        // sequence per step, not just the foreign subsequence. A re-append MOVES
        // an already-present child to the END (the shim's `appendChild` splices
        // it out first, `src/shared/dom-shim.ts:22-28`), so a foreign sibling
        // driven through it lands at the END of `mount.children` and its index
        // CHANGES — reported here as `foreign sibling … MOVED to index …
        // (RE-APPENDED)` whether the host drove the re-append through the mount
        // or through the child's own parent. The alternative form the spec names
        // (an append/re-place COUNTER) is subsumed by this one: the index
        // comparison catches the re-append on BOTH paths and needs no instrument
        // the contract does not already expose. The OWNED nodes are deliberately
        // NOT index-pinned, because two of the five sequences legitimately
        // REORDER them (`setOrder`) and two legitimately REMOVE them (`close`,
        // `setEntries(null)`) — pinning those too would make the row assert
        // something the contract does not state, which is precisely the failure
        // mode `ADV-LH-5` is about.
        const foreignIndexOf = (kids: readonly unknown[], f: unknown): number => kids.findIndex((child) => sameRef(child, f))
        const transition = (stepId: string, pre: readonly unknown[], post: readonly unknown[]): string | null => {
          // (a) every foreign sibling occupies the SAME index after the step as
          //     before it — it was neither removed, nor re-parented, nor
          //     re-appended.
          for (const f of foreign) {
            const before = foreignIndexOf(pre, f)
            const after = foreignIndexOf(post, f)
            if (after === -1) {
              return `${stepId}: foreign sibling ${before} is GONE from mount.children after the step (§2.3 item 3)`
            }
            if (after !== before) {
              return (
                `${stepId}: foreign sibling ${before} MOVED to index ${after} — the host RE-APPENDED a node it already held ` +
                `(the full child reference sequence per step: ${pre.map((c) => (c as { id?: string }).id ?? '?').join(',')} → ` +
                `${post.map((c) => (c as { id?: string }).id ?? '?').join(',')}) (ADV-LH-5)`
              )
            }
          }
          // (b) a FOREIGN sibling may never be dropped by a step (§2.3 item 3);
          //     the two steps that DO remove children remove only the host's own
          //     nodes, which the `check` below accounts for through `removedSeen`.
          for (const child of pre) {
            if (foreign.some((f) => sameRef(f, child)) && !containsRef(post, child)) {
              return `${stepId}: a FOREIGN sibling was REMOVED from the mount during the step (§2.3 item 3)`
            }
          }
          return null
        }
        const check = (stepId: string): string | null => {
          const kids = childrenOf(mount)
          const foreignNow = kids.filter((child) => foreign.some((f) => sameRef(f, child)))
          if (foreignNow.length !== foreign.length) return `${stepId}: ${foreignNow.length} of ${foreign.length} foreign siblings remain in the mount`
          for (let i = 0; i < foreign.length; i += 1) {
            if (!sameRef(foreignNow[i], foreign[i])) return `${stepId}: foreign sibling ${i} is not the same object, or its relative index changed`
          }
          for (const f of foreign) {
            if (f.removed) return `${stepId}: a foreign sibling was REMOVED by the host (shim \`removed\` flag)`
            if (!sameRef(f.parent, mount)) return `${stepId}: a foreign sibling was RE-PARENTED`
          }
          for (const r of removedSeen) {
            if (foreign.some((f) => sameRef(f, r))) return `${stepId}: a foreign sibling appeared in the host's \`removed\` list`
          }
          const owned = kids.filter((child) => Object.values(supplied).some((n) => sameRef(n, child)))
          for (const n of owned) if (!containsRef(kids, n)) return `${stepId}: an owned node is not a child of the mount`
          return null
        }
        const h = create({ mount })
        const ctx: Ctx = { mount, foreign, supplied, h, removedSeen, check }
        let stepsRun = 0
        for (const step of seq.steps) {
          const pre = snapshotChildren(mount)
          step.run(ctx)
          stepsRun += 1
          const moved = transition(step.id, pre, childrenOf(mount))
          if (moved !== null) return moved
          const verdict = check(step.id)
          if (verdict !== null) return verdict
        }
        // The step count is data: `§5.5.1 P-LH-IM-4` fixes the five sequences'
        // step lists, and an un-run step would make the attempt vacuous.
        if (stepsRun !== seq.steps.length) return `${seq.id}: ${stepsRun} of ${seq.steps.length} steps ran`
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-SM-1 [S-LH-MIXED-1] — a set mixing valid entries with EXACTLY ONE refused entry: re-pinned BY CLASS (three classes absent from order/keys(), duplicate-key owned exactly once)', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-SM-1', 'S-LH-MIXED-1')

    // THE ROW'S STATEMENT, RE-PINNED BY REFUSAL CLASS (§5.5.1 P-LH-SM-1,
    // CORRECTED 2026-09-27; finding 3), and asserted per attempt below:
    //   · `no-node`, `factory-returned-null`, `malformed-entry` ⇒ the refused key
    //     is ABSENT from `order`/`keys()`;
    //   · `duplicate-key` ⇒ the key stays owned EXACTLY ONCE and the refused
    //     occurrence contributes NO node and NO second `order` entry (`§3.2 F-2`
    //     first-wins, `§2.4` item 2, `I-7`).
    // The row id is unchanged; only the statement is restated, and the table
    // below already drove exactly this behaviour.
    type MixedCase = {
      id: string
      build: () => MixedBuilt
      code: RefusalCode
      /** The value the drive supplies in the refused position, VERBATIM — a
       *  string when the drive supplies a string, `42`/`{}` when it does not.
       *  `§2.1`'s amended `ListHostRefusal.key: unknown` holds exactly this. */
      refusalKey: unknown
      expectedValidKeys: ListKey[]
      /** F-2's first-wins keeps the key owned for the duplicate class. */
      refusedKeyStaysOwned: boolean
    }
    type OwnedListOptionsLike = { itemFactory?: (e: ListEntry<unknown>) => unknown | null }
    type MixedBuilt = {
      entries: ListEntry<unknown>[]
      valid: Record<string, ShimElement>
      options: OwnedListOptionsLike
      /** The node the drive supplies in the REFUSED position, when it supplies
       *  one — asserted to be absent from the mount (`F-2`/`F-3`/`F-4`/`F-5`). */
      refusedNode?: () => unknown
    }
    const mk = (id: string) => nodeEl('div', id)
    const cases: readonly MixedCase[] = [
      {
        id: '3-entry set · no-node first',
        code: 'no-node',
        refusalKey: 'k-nonode',
        expectedValidKeys: ['v1', 'v2'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2') }
          return { entries: [{ key: 'k-nonode' }, { key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }], valid, options: {} }
        },
      },
      {
        id: '4-entry set · no-node at position 0',
        code: 'no-node',
        refusalKey: 'k-nonode',
        expectedValidKeys: ['v1', 'v2', 'v3'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2'), v3: mk('v3') }
          return {
            entries: [{ key: 'k-nonode' }, { key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }, { key: 'v3', node: valid.v3 }],
            valid,
            options: {},
          }
        },
      },
      {
        id: '3-entry set · factory-returned-null first',
        code: 'factory-returned-null',
        refusalKey: 'k-fnull',
        expectedValidKeys: ['v1', 'v2'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2') }
          return { entries: [{ key: 'k-fnull' }, { key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }], valid, options: { itemFactory: () => null } }
        },
      },
      {
        id: '4-entry set · factory-returned-null at position 1',
        code: 'factory-returned-null',
        refusalKey: 'k-fnull',
        expectedValidKeys: ['v1', 'v2', 'v3'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2'), v3: mk('v3') }
          return {
            entries: [{ key: 'v1', node: valid.v1 }, { key: 'k-fnull' }, { key: 'v2', node: valid.v2 }, { key: 'v3', node: valid.v3 }],
            valid,
            options: { itemFactory: () => null },
          }
        },
      },
      {
        id: '3-entry set · malformed-entry first (a NON-STRING key: 42)',
        code: 'malformed-entry',
        refusalKey: 42,
        expectedValidKeys: ['v1', 'v2'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2') }
          const bad = mk('k-mal-42')
          // A NON-STRING key is not expressible as a `ListEntry` (whose `key` is
          // `ListKey`) — it is exactly what `§3.2 F-5` REFUSES, so the drive casts it.
          return {
            entries: [{ key: 42, node: bad } as never, { key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }],
            valid,
            options: {},
            refusedNode: () => bad,
          }
        },
      },
      {
        id: '4-entry set · malformed-entry at position 2 (a non-object entry)',
        code: 'malformed-entry',
        refusalKey: 'not-an-entry',
        expectedValidKeys: ['v1', 'v2', 'v3'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2'), v3: mk('v3') }
          return {
            entries: [{ key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }, 'not-an-entry' as never, { key: 'v3', node: valid.v3 }],
            valid,
            options: {},
          }
        },
      },
      {
        id: '3-entry set · duplicate-key at position 1',
        code: 'duplicate-key',
        refusalKey: 'dup',
        expectedValidKeys: ['v1', 'dup'],
        refusedKeyStaysOwned: true,
        build: () => {
          const valid = { v1: mk('v1'), dup: mk('dup-1') }
          const second = mk('dup-2')
          return { entries: [{ key: 'v1', node: valid.v1 }, { key: 'dup', node: valid.dup }, { key: 'dup', node: second }], valid, options: {}, refusedNode: () => second }
        },
      },
      {
        id: '4-entry set · duplicate-key at position 3',
        code: 'duplicate-key',
        refusalKey: 'dup',
        expectedValidKeys: ['v1', 'v2', 'dup'],
        refusedKeyStaysOwned: true,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2'), dup: mk('dup-1') }
          const second = mk('dup-2')
          return {
            entries: [{ key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }, { key: 'dup', node: valid.dup }, { key: 'dup', node: second }],
            valid,
            options: {},
            refusedNode: () => second,
          }
        },
      },
    ]

    for (const c of cases) {
      rec.run(c.id, () => {
        if (create === null) return reason
        const mount = mountEl()
        const built = c.build()
        // The mount is the row's own (the per-case `options` carry only the
        // factory), so the spread is narrowed to exclude it rather than
        // overwriting it.
        const h = create({ mount, ...(built.options as Omit<OwnedListHostOptions, 'mount'>) })
        const r = h.setEntries(built.entries)
        if (r.ok !== false) return `ok === true (expected false — the class entry must be refused)`
        if (r.refused.length !== 1) return `refused.length === ${r.refused.length} (expected exactly ONE refusal): ${JSON.stringify(r.refused)}`
        if (r.refused[0].code !== c.code) return `refused[0].code === ${JSON.stringify(r.refused[0].code)} (expected ${JSON.stringify(c.code)})`
        // VERBATIM, by `===`-identity: a string when the drive supplied a string,
        // `42` when it did not — no `String(...)`, no normalization.
        if (r.refused[0].key !== c.refusalKey) {
          return `refused[0].key === ${JSON.stringify(r.refused[0].key)} (expected the value supplied VERBATIM: ${JSON.stringify(c.refusalKey)})`
        }
        if (JSON.stringify(r.order) !== JSON.stringify(c.expectedValidKeys)) {
          return `order === ${JSON.stringify(r.order)} (expected the VALID keys in their supplied order: ${JSON.stringify(c.expectedValidKeys)})`
        }
        const brk = identityBreak(r, built.valid, `${c.id}: every valid node placed by reference`)
        if (brk !== null) return brk
        const keys = h.keys()
        // The refused occurrence's node is NEVER placed — true of all four classes
        // (`F-2` for duplicate-key, `F-3`/`F-4`/`F-5` for the other three).
        const refusedNode = built.refusedNode?.()
        if (refusedNode !== undefined && containsRef(childrenOf(mount), refusedNode)) {
          return `the REFUSED entry's node was placed (key ${JSON.stringify(c.refusalKey)}): a refused entry contributes no node`
        }
        if (c.refusedKeyStaysOwned) {
          // §3.2 F-2 first-wins: the key stays owned by its FIRST occurrence —
          // §5.5.1's as-written "the refused key absent from keys()" cannot hold
          // for this class; the RE-PINNED statement says "owned exactly once".
          if (keys.filter((k) => k === c.refusalKey).length !== 1) {
            return `keys() names ${JSON.stringify(c.refusalKey)} ${keys.filter((k) => k === c.refusalKey).length} times (first-wins keeps it owned exactly once)`
          }
          if (r.order.filter((k) => k === c.refusalKey).length !== 1) {
            return `order names ${JSON.stringify(c.refusalKey)} ${r.order.filter((k) => k === c.refusalKey).length} times (the refused occurrence adds NO second order entry)`
          }
        } else if (keys.includes(c.refusalKey as ListKey)) {
          return `the refused key ${JSON.stringify(c.refusalKey)} IS owned (keys() === ${JSON.stringify(keys)}) — for no-node/factory-returned-null/malformed-entry the refused key is absent from order and keys()`
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-SM-2 [S-LH-SEQ-1] — over 8 literal step/expected-outcome sequences the host state stays coherent (I-1/I-5/I-7, five codes, no resurrection)', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-SM-2', 'S-LH-SEQ-1')

    type Outcome = {
      ok?: boolean
      refusedCount?: number
      refusedCode?: RefusalCode | null
      onActivate?: number
      onClose?: number
      keys?: readonly ListKey[]
    }
    type SmStep = { id: string; outcome: Outcome; run: (c: SmCtx) => unknown }
    type SmCtx = {
      mount: ShimElement
      nodes: Record<string, ShimElement>
      h: OwnedListHost
      counts: { onActivate: number; onClose: number }
      removedFlags: Record<string, boolean>
    }

    const sequences: Array<{ id: string; steps: readonly SmStep[] }> = [
      {
        id: 'sequence 1 · activate known → unknown',
        steps: [
          { id: "activate('a') — a KNOWN key", outcome: { ok: true, refusedCount: 0, onActivate: 1, keys: ['a', 'b'] }, run: (c) => c.h.activate('a') },
          { id: "activate('nope') — UNKNOWN", outcome: { ok: false, refusedCount: 1, refusedCode: 'unknown-key', onActivate: 0 }, run: (c) => c.h.activate('nope') },
        ],
      },
      {
        id: 'sequence 2 · close known → unknown',
        steps: [
          { id: "close('a') — a KNOWN key", outcome: { ok: true, refusedCount: 0, onClose: 1, keys: ['b'] }, run: (c) => c.h.close('a') },
          { id: "close('nope') — UNKNOWN", outcome: { ok: false, refusedCount: 1, refusedCode: 'unknown-key', onClose: 0 }, run: (c) => c.h.close('nope') },
        ],
      },
      {
        id: 'sequence 3 · remove known → unknown',
        steps: [
          { id: "remove('a') — a KNOWN key", outcome: { ok: true, refusedCount: 0, onClose: 0, keys: ['b'] }, run: (c) => c.h.remove('a') },
          { id: "remove('nope') — UNKNOWN", outcome: { ok: false, refusedCount: 1, refusedCode: 'unknown-key' }, run: (c) => c.h.remove('nope') },
        ],
      },
      {
        id: 'sequence 4 · setEntries([]) after a populated set',
        steps: [{ id: 'setEntries([])', outcome: { ok: true, refusedCount: 0, keys: [] }, run: (c) => c.h.setEntries([]) }],
      },
      {
        id: 'sequence 5 · setEntries(null) after a populated set',
        steps: [{ id: 'setEntries(null)', outcome: { ok: true, refusedCount: 0, keys: [] }, run: (c) => c.h.setEntries(null) }],
      },
      {
        id: 'sequence 6 · dispose() then keys()/render()/setEntries',
        steps: [
          { id: 'dispose()', outcome: { keys: [] }, run: (c) => c.h.dispose() },
          { id: 'render() after dispose()', outcome: { ok: true, refusedCount: 0, keys: [] }, run: (c) => c.h.render() },
          { id: 'keys() after dispose()', outcome: { keys: [] }, run: (c) => c.h.keys() },
          { id: "activate('a') after dispose() — no ownership may be resurrected", outcome: { ok: false, refusedCount: 1, refusedCode: 'unknown-key' }, run: (c) => c.h.activate('a') },
          { id: "setEntries([{key:'z',node}]) after dispose() — a FRESH declaration", outcome: { ok: true, refusedCount: 0, keys: ['z'] }, run: (c) => c.h.setEntries([{ key: 'z', node: nodeEl('div', 'z') }]) },
        ],
      },
      {
        id: "sequence 7 · activate on a DETACHED node's key (F-10)",
        steps: [
          { id: 'the caller detaches the placed node', outcome: {}, run: (c) => { c.nodes['a'].remove(); return null } },
          { id: "activate('a') with the node detached", outcome: { ok: true, refusedCount: 0, onActivate: 1 }, run: (c) => c.h.activate('a') },
        ],
      },
      {
        id: 'sequence 8 · a caller-DETACHED placed node then close (F-6)',
        steps: [
          { id: 'the caller detaches the placed node', outcome: {}, run: (c) => { c.nodes['a'].remove(); return null } },
          { id: "close('a') after the caller's detach", outcome: { ok: true, refusedCount: 0, keys: ['b'] }, run: (c) => c.h.close('a') },
        ],
      },
    ]

    for (const seq of sequences) {
      rec.run(seq.id, () => {
        if (create === null) return reason
        const mount = mountEl()
        const nodes: Record<string, ShimElement> = { a: nodeEl('div', 'a'), b: nodeEl('div', 'b') }
        const counts = { onActivate: 0, onClose: 0 }
        const h = create({
          mount,
          onActivate: () => { counts.onActivate += 1 },
          onClose: () => { counts.onClose += 1 },
        })
        h.setEntries([{ key: 'a', node: nodes['a'] }, { key: 'b', node: nodes['b'] }])
        const removedFlags = { a: nodes['a'].removed, b: nodes['b'].removed }
        const ctx: SmCtx = { mount, nodes, h, counts, removedFlags }
        for (const step of seq.steps) {
          const before = { onActivate: counts.onActivate, onClose: counts.onClose }
          let value: unknown
          try {
            value = step.run(ctx)
          } catch (e) {
            return `${step.id}: the drive THREW (${e instanceof Error ? e.message : String(e)}) — §2.1's totality claim`
          }
          const o = step.outcome
          if (o.onActivate !== undefined && counts.onActivate - before.onActivate !== o.onActivate) {
            return `${step.id}: onActivate fired ${counts.onActivate - before.onActivate} times (expected ${o.onActivate})`
          }
          if (o.onClose !== undefined && counts.onClose - before.onClose !== o.onClose) {
            return `${step.id}: onClose fired ${counts.onClose - before.onClose} times (expected ${o.onClose})`
          }
          const keys = h.keys()
          if (o.keys !== undefined && JSON.stringify(keys) !== JSON.stringify([...o.keys])) {
            return `${step.id}: keys() === ${JSON.stringify(keys)} (expected ${JSON.stringify([...o.keys])})`
          }
          if (value !== undefined && value !== null && typeof value === 'object' && hasOwn.call(value, 'ok')) {
            const r = value as ListHostResult
            if (r.ok !== (r.refused.length === 0)) return `${step.id}: ok === ${String(r.ok)} with refused.length === ${r.refused.length} (I-1)`
            for (const ref of r.refused) {
              if (!REFUSAL_CODES.includes(ref.code)) return `${step.id}: refusal code ${JSON.stringify(ref.code)} is outside the five declared members (no sixth)`
            }
            if (o.refusedCount !== undefined && r.refused.length !== o.refusedCount) {
              return `${step.id}: refused.length === ${r.refused.length} (expected ${o.refusedCount}): ${JSON.stringify(r.refused)}`
            }
            if (o.refusedCode !== undefined && o.refusedCode !== null && r.refused[0]?.code !== o.refusedCode) {
              return `${step.id}: refused[0].code === ${JSON.stringify(r.refused[0]?.code)} (expected ${JSON.stringify(o.refusedCode)})`
            }
            const kbrk = keysConsistentWithOrder(r, keys, `${step.id}: keys() consistent with order`)
            if (kbrk !== null) return kbrk
          }
        }
        // The dispose() sequence's OWN half: no ownership survives, and every
        // caller node is still reference-reachable with its `removed` flag
        // unchanged BY THE HOST.
        if (seq.id.startsWith('sequence 6')) {
          for (const key of ['a', 'b']) {
            if (!sameRef(nodes[key], ctx.nodes[key])) return `sequence 6: node '${key}' is no longer the caller's object`
            if (nodes[key].removed !== removedFlags[key as 'a' | 'b']) {
              return `sequence 6: dispose() changed node '${key}'s \`removed\` flag (the host must not destroy caller nodes)`
            }
          }
          if (h.keys().length !== 1 || h.keys()[0] !== 'z') return `sequence 6: after the post-dispose declaration keys() === ${JSON.stringify(h.keys())} (only the FRESH key may be owned)`
          if (nodes['a'].removed) return "sequence 6: the disposed node 'a' was removed from the mount"
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-TP-1 [S-LH-SEED-1] — for EVERY shape drawn from the 22-shape pool (seed 20260927), no method throws and every method returns its declared shape', async () => {
    // THE CELL'S SCOPE, RE-PINNED (`§5.5.1 P-LH-TP-1`, CORRECTED 2026-09-27;
    // finding 4): "a ListHostResult for the SEVEN result-returning methods" was a
    // MIS-COUNT. `§2.1`'s own surface census declares EIGHT methods of which SIX
    // return a `ListHostResult` — `setEntries`, `remove`, `setOrder`, `render`,
    // `activate`, `close` — one (`keys()`) returns `readonly ListKey[]`, and one
    // (`dispose()`) returns `void`. This row asserts exactly that declared shape
    // for every one of the eight methods (see `shapeBreaks`).
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-TP-1', 'S-LH-SEED-1')

    const lcg = makeLcg(SEED)
    // `64` pinned-seed attempts: each draws (method, input) from the 22-shape pool.
    // `P-LH-TP-1`'s own total is `72` = these `64` drawn attempts `+` the fixed
    // after-`dispose()` sweep of all `8` methods (`§5.5.1`, corrected arithmetic).
    //
    // ⟶ RE-PINNED 2026-09-27 (the adversarial + PBT-audit pass; finding
    // `ADV-LH-7`, LOW — `PARKED-with-revisit-condition`, a DOC reconciliation:
    // the STATEMENT and the `22`/`64`/`72` numbers are UNCHANGED). TWO cells of
    // `§5.5.1 P-LH-TP-1` are reconciled to what is EXECUTED:
    //   (i) THE POOL LIST. The cell's own list named `20` shapes while the
    //       EXECUTED pool (`TP_POOL` above, asserted `22` by `PRE-3`) holds
    //       **`22`**, and the `22` executed ids are exactly: `null` ·
    //       `undefined` · `42` · `NaN` · `''` · `'x'` · `[]` · `[{}]` ·
    //       `[{key:42}]` · a non-string key (`{key:null}`) · an entry with no
    //       node and no factory · `itemFactory: () => null` · a detached node ·
    //       a `ShimElement` mount already holding host-placed children ·
    //       `mount: null` · `mount: {}` · `mount: 42` · `mount: 'div'` ·
    //       a frozen array · a caller array also held by the test · a
    //       duplicate-key pair · a key of `''`. **REPORTED, NOT RECONCILED
    //       SILENTLY:** `§5.5.1`'s `ADV-LH-7` block names the two members it
    //       says the list "OMITS" as **`true`** and **"an object argument that
    //       is a CALLER NODE used as an entry"** — and **neither of those two
    //       shapes is in the executed pool** (checked against `TP_POOL`
    //       member-by-member: there is no `true` entry and no caller-node-as-
    //       entry entry; the nearest executed primitives are `42`/`NaN`).
    //       Reconciling the WORDING by ADDING them would change the pool size
    //       (`22` → `24`), the `64` draws' indices and the row's attempt
    //       discipline — which the spec's own `ADV-LH-7` ruling forbids
    //       ("the pool's `22`-shape count, the `64` draws and the `72`-attempt
    //       row total are unchanged"). So the drift is REPORTED to the
    //       supervisor as a spec/test contradiction instead of being papered
    //       over here, and the executed pool stays what it is.
    //       The pool's **STATED BOUNDARY** (this half of the ruling reconciles
    //       cleanly): a **`Symbol`-keyed shape** is NOT in the pool,
    //       deliberately — a `Symbol` is not a `ListKey`, so the pool is silent
    //       about it BY DESIGN rather than by omission (revisit condition: if
    //       one is admitted).
    //   (ii) THE GENERATOR'S ACTUAL STEP FORM. `S-LH-SEED-1` is deterministic and
    //       pinned to `20260927`; it consumes **TWO LCG steps per attempt**, and
    //       the first of them always draws `next(1)` — which is `0` **by
    //       construction** (`floor(state · 1 / 2³²)` with `state < 2³²`) — while
    //       the pool index is taken from the **RAW state** (`state mod
    //       pool.length`), not from a `next(k)` draw. So the two calls below are
    //       exactly the executed form: one step whose `next(1)` draw is discarded
    //       (it exists so the index is read from the advanced state), then the
    //       pool index from the raw state, then a second step for the method.
    for (let attempt = 1; attempt <= 64; attempt += 1) {
      rec.run(`attempt ${attempt} (seed ${SEED})`, () => {
        if (create === null) return reason
        const zeroDraw = lcg.next(1) // LCG step 1 — `next(1) === 0` by construction (§5.5.1, ADV-LH-7)
        if (zeroDraw !== 0) return `next(1) drew ${zeroDraw} — the pinned generator draws 0 by construction (two LCG steps per attempt, ADV-LH-7)`
        const poolIdx = lcg.state() % TP_POOL.length // the pool index comes from the RAW state
        const method = HOST_METHODS[lcg.next(HOST_METHODS.length)] // LCG step 2 — the method draw
        const shape = TP_POOL[poolIdx]
        return tpAttempt(create, shape, method, `attempt ${attempt} (pool #${poolIdx} '${shape.id}' · method '${method}')`)
      })
    }

    // The explicit FIXED after-dispose() sweep: all 8 methods once.
    for (const method of HOST_METHODS) {
      rec.run(`after dispose() sweep · ${method}`, () => {
        if (create === null) return reason
        const mount = mountEl()
        const na = nodeEl('div', 'a')
        const nb = nodeEl('div', 'b')
        const h = create({ mount })
        h.setEntries([{ key: 'a', node: na }, { key: 'b', node: nb }])
        const beforeDispose = h.keys()
        h.dispose()
        const keysAfter = h.keys()
        if (keysAfter.length !== 0) return `keys() === ${JSON.stringify(keysAfter)} after dispose() (was ${JSON.stringify(beforeDispose)}) — no ownership may survive dispose() (I-5)`
        const args = { setEntriesArg: [{ key: 'z', node: nodeEl('div', 'z') }], keyArg: 'a', orderArg: ['a'] }
        let value: unknown
        try {
          value = callHostMethod(h, method, args)
        } catch (e) {
          return `after dispose(), ${method}() THREW: ${e instanceof Error ? e.message : String(e)}`
        }
        const shapeBreak = tpShapeBreak(value, method, ['z'], `after dispose() · ${method}`)
        if (shapeBreak !== null) return shapeBreak
        if ((method === 'activate' || method === 'close' || method === 'remove') && (value as ListHostResult).refused[0]?.code !== 'unknown-key') {
          return `after dispose(), ${method}('a') returned ${JSON.stringify((value as ListHostResult).refused)} — the disposed ownership must NOT be resurrected`
        }
        if (method === 'dispose' && h.keys().length !== 0) return 'a second dispose() resurrected state'
        return null
      })
    }
    rec.finish()
  })
})
