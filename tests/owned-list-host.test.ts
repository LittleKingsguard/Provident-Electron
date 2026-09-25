// tests/owned-list-host.test.ts
// ===========================================================================
// U-LISTHOST · wave D · **THE RED SET** (RCA-1)
//
// Contract: docs/specs/listhost.md — `§2.1` (the new module
// `src/shared/owned-list-host.ts` and its **SEVEN exports**, each signature,
// return shape and refusal pattern), `§2.2` (the six prohibitions), `§2.3`
// (own-node ownership — the `V-7` hard row), `§2.4` (order-as-projection),
// `§3.1` (`M-1`..`M-17`), `§3.2` (`F-1`..`F-10`), `§3.3` (`I-1`..`I-9`),
// `§4` (the red), `§5.1` (diff scope: this file + the module, nothing else),
// `§5.2` (the node suite is leg 1) and `§5.5.1` (the SEVEN-row typed property
// register, whose `§5.5.0` zero-row exemption is SUPERSEDED).
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
// text, and the row's record says so.
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
// AUTHORED ORDER (`§4.2` step 1): `I-1..I-9`, `M-1..M-17`, `F-1..F-10` — the
// describe blocks below are in exactly that order, followed by the `§2.1`
// surface / `§2.2` static rows and then `§5.5.1`'s register.
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
// ONE DELIBERATE DEVIATION, recorded rather than hidden: `§2.1` declares
// `ListEntry.node` as REQUIRED (`readonly node: N`), yet `§3.1 M-6`'s drive is
// `setEntries([{key}])` and `§3.2 F-3`'s is an entry "with no node and no
// factory" — inputs a required `node` cannot express. This mirror is
// `node?: N | null` so those DOCUMENTED drives are expressible; **no row below
// asserts the optionality itself**, and the tension is reported to the
// supervisor (item 3 of this pass's report) rather than resolved here.
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
  readonly key: ListKey
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

/** The declared shape of ONE drive, per `§2.1`: a `ListHostResult` for the
 *  result-returning methods, `readonly ListKey[]` for `keys()` and `void` for
 *  `dispose()`. NOTE, reported rather than hidden: `§5.5.1`'s `P-LH-TP-1` cell
 *  says "a `ListHostResult` for the SEVEN result-returning methods", but `§2.1`
 *  declares EIGHT methods of which only SIX return a `ListHostResult` (`keys()`
 *  returns the key list, `dispose()` returns `void`). This helper pins `§2.1`'s
 *  own declarations. */
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
 *  generator, no library). 6 + 24 = the 30 exhaustive attempts of `P-LH-IM-1`. */
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
    expect(TP_POOL.length, "§5.5.1 P-LH-TP-1's input pool is 22 shapes").toBe(22)
    expect(new Set(TP_POOL.map((s) => s.id)).size, 'the 22 pool shapes are distinct').toBe(22)
    // THE ARITHMETIC, checked against this file's own tables (the pass reports
    // the real numbers; §5.5.1's 157 is reconciled in the report, not here).
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
    expect(total, 'the register total, computed from THIS file\'s tables').toBe(168)
    for (const [row, n] of Object.entries(arithmetic)) expect(n, `${row} is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(total, `the register total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
  })
})

/** The third FIXED table of `P-LH-IM-1`/`S-LH-PERM-1` (the `§3.2 F-8` shape).
 *  §5.5.1's "157" arithmetic does NOT count these 3 setOrder drives; they are
 *  executed and counted anyway (reported — never hidden). */
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
    const snapshot = { a: nodeSurface(a), b: nodeSurface(b), mount: mountSurface(mount) }
    const h = create({ mount })
    drive(() => h.setEntries([{ key: 'a', node: a }, { key: 'b', node: b }]), 'I-4 setEntries')
    drive(() => h.render(), 'I-4 render')
    drive(() => h.setOrder(['b', 'a']), 'I-4 setOrder')
    drive(() => h.activate('a'), 'I-4 activate')
    drive(() => h.remove('b'), 'I-4 remove')
    expect(nodeSurface(a), 'I-4: the caller node\'s own surface is untouched (no attribute, class, style or textContent write)').toEqual(snapshot.a)
    expect(nodeSurface(b), 'I-4: the second caller node\'s surface is untouched').toEqual(snapshot.b)
    expect(mountSurface(mount), 'I-4: the mount\'s own surface is untouched (no attribute write on the mount)').toEqual(snapshot.mount)
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
// M-1..M-17 — §3.1, the valid/happy states (one per reasonable data state).
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
})

// ===========================================================================
// F-1..F-10 — §3.2, the documented fail-states (each is a typed `code`).
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
        expect(r.refused[0].key, `F-1 ${method}(${brief(key)}): the EXACT key string as supplied (never normalized)`).toBe(key)
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
    expect(r.refused[0].key, 'F-2: the refusal names the duplicated key').toBe('k')
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
    expect(r.refused[0].key, 'F-3: the exact key as supplied').toBe('k')
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
      expect(r.refused[0].key, `F-4 (${String(ret)}): the exact key as supplied`).toBe('k')
      expect(h.keys(), `F-4 (${String(ret)}): the key is NOT owned`).toEqual([])
      expect(childrenOf(mount).length, `F-4 (${String(ret)}): the mount stays empty`).toBe(0)
    }
  })

  it('F-5 §3.2 — a MALFORMED entry: malformed-entry, and the OTHER entries of the same call are placed', async () => {
    const { create } = await surface('F-5')
    const cases: Array<{ id: string; entry: unknown; expectedKey: ListKey | null }> = [
      { id: 'a non-object entry (a bare string)', entry: 'not-an-entry', expectedKey: null },
      { id: 'a non-object entry (a number)', entry: 42, expectedKey: null },
      { id: 'node: null with no factory', entry: { key: 'k-nullnode', node: null }, expectedKey: 'k-nullnode' },
      { id: 'key not a string (42)', entry: { key: 42, node: nodeEl('div', 'x') }, expectedKey: null },
      { id: 'key not a string (null)', entry: { key: null, node: nodeEl('div', 'x') }, expectedKey: null },
      { id: 'key not a string ({})', entry: { key: {}, node: nodeEl('div', 'x') }, expectedKey: null },
      { id: "key '' (F-5's own literal list)", entry: { key: '', node: nodeEl('div', 'x') }, expectedKey: '' },
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
      if (c.expectedKey !== null) {
        expect(r.refused[0].key, `F-5 ${c.id}: the exact key as supplied`).toBe(c.expectedKey)
      }
      expect(r.order, `F-5 ${c.id}: the malformed entry is not owned; the valid one is (§2.1 totality note)`).toEqual(['good'])
      expect(containsRef(r.placed, good), `F-5 ${c.id}: the other entry in the same call is placed normally`).toBe(true)
      expect(h.keys(), `F-5 ${c.id}: only the valid key is owned`).toEqual(['good'])
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
      // `removed` membership for the already-detached node is DELIBERATELY NOT
      // pinned — §3.2 F-6 leaves it a choice for the implementer (the shim's
      // `remove()` is idempotent). The pinned contract is: no throw, no dangling
      // ownership.
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
    // §5.5.1's "157" arithmetic does NOT count these 3 setOrder drives as
    // attempts; they are executed and REPORTED as 3 further attempts.
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

    // THE FOUR FIXED IDENTITY SHAPES of the cell.
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
        for (const step of seq.steps) {
          step.run(ctx)
          const verdict = check(step.id)
          if (verdict !== null) return verdict
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-LH-SM-1 [S-LH-MIXED-1] — a set mixing valid entries with EXACTLY ONE refused entry places the valid ones and refuses only that one', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-SM-1', 'S-LH-MIXED-1')

    type MixedCase = {
      id: string
      build: () => { entries: ListEntry<unknown>[]; valid: Record<string, ShimElement>; options: OwnedListOptionsLike }
      code: RefusalCode
      refusalKey: string
      expectedValidKeys: ListKey[]
      /** F-2's first-wins keeps the key owned for the duplicate class. */
      refusedKeyStaysOwned: boolean
      refusedNode?: () => unknown
    }
    type OwnedListOptionsLike = { itemFactory?: (e: ListEntry<unknown>) => unknown | null }
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
        id: '3-entry set · malformed-entry first',
        code: 'malformed-entry',
        refusalKey: 'k-mal',
        expectedValidKeys: ['v1', 'v2'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2') }
          return { entries: [{ key: 'k-mal', node: null }, { key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }], valid, options: {} }
        },
      },
      {
        id: '4-entry set · malformed-entry at position 2',
        code: 'malformed-entry',
        refusalKey: 'k-mal',
        expectedValidKeys: ['v1', 'v2', 'v3'],
        refusedKeyStaysOwned: false,
        build: () => {
          const valid = { v1: mk('v1'), v2: mk('v2'), v3: mk('v3') }
          return {
            entries: [{ key: 'v1', node: valid.v1 }, { key: 'v2', node: valid.v2 }, { key: 'k-mal', node: null }, { key: 'v3', node: valid.v3 }],
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
        const h = create({ mount, ...(built.options as OwnedListHostOptions) })
        const r = h.setEntries(built.entries)
        if (r.ok !== false) return `ok === true (expected false — the class entry must be refused)`
        if (r.refused.length !== 1) return `refused.length === ${r.refused.length} (expected exactly ONE refusal): ${JSON.stringify(r.refused)}`
        if (r.refused[0].code !== c.code) return `refused[0].code === ${JSON.stringify(r.refused[0].code)} (expected ${JSON.stringify(c.code)})`
        if (r.refused[0].key !== c.refusalKey) return `refused[0].key === ${JSON.stringify(r.refused[0].key)} (expected the exact key as supplied: ${JSON.stringify(c.refusalKey)})`
        if (JSON.stringify(r.order) !== JSON.stringify(c.expectedValidKeys)) {
          return `order === ${JSON.stringify(r.order)} (expected the VALID keys in their supplied order: ${JSON.stringify(c.expectedValidKeys)})`
        }
        const brk = identityBreak(r, built.valid, `${c.id}: every valid node placed by reference`)
        if (brk !== null) return brk
        const keys = h.keys()
        if (c.refusedKeyStaysOwned) {
          // §3.2 F-2 first-wins: the key stays owned by its FIRST occurrence —
          // §5.5.1's "the refused key absent from keys()" cannot hold for this
          // class (reported, not hidden).
          if (keys.filter((k) => k === c.refusalKey).length !== 1) return `keys() names '${c.refusalKey}' ${keys.filter((k) => k === c.refusalKey).length} times (first-wins keeps it owned exactly once)`
          const refusedNode = built.refusedNode?.()
          if (refusedNode !== undefined && containsRef(childrenOf(mount), refusedNode)) return `the REFUSED duplicate's node was placed — first-wins forbids it`
        } else if (keys.includes(c.refusalKey)) {
          return `the refused key '${c.refusalKey}' IS owned (keys() === ${JSON.stringify(keys)}) — a refused entry is not placed, not owned and absent from order`
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
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-LH-TP-1', 'S-LH-SEED-1')

    const lcg = makeLcg(SEED)
    // 64 pinned-seed attempts: each draws (method, input) from the pool.
    for (let attempt = 1; attempt <= 64; attempt += 1) {
      rec.run(`attempt ${attempt} (seed ${SEED})`, () => {
        if (create === null) return reason
        lcg.next(1) // one LCG step, then the pool index reads `state mod pool.length` (§5.5.1 S-LH-SEED-1)
        const poolIdx = lcg.state() % TP_POOL.length
        const method = HOST_METHODS[lcg.next(HOST_METHODS.length)]
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
