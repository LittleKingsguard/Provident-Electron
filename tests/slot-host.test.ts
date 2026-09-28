// tests/slot-host.test.ts
// ===========================================================================
// U-SLOTHOST · wave D (ledger row D3) · **THE RED SET** (RCA-1)
//
// Contract: docs/specs/slothost.md (FILED + amended 2026-09-27) — its `§2.1`
// (the new module `src/shared/slot-host.ts` and its **EXACTLY SEVEN exports**,
// each signature, return shape, refusal pattern, the widened
// `SlotHostRefusal.key: unknown`, the refusal-code domain — **3 EMITTED,
// 1 DECLARED-BUT-NOT-EMITTED** — and the **CONTAINER-SOURCE clause: the
// injected `containerFactory` seam is the SOLE container source, with its
// fifth named safe default**), `§2.2` (the six prohibitions, which are the
// static rows' source, prohibitions 1/2 carrying the **TIGHTENED
// anti-assembly ban**), `§2.3` (the declared-key typed refusal), `§2.4`
// (own-node ownership — the `V-7` hard row: a foreign sibling survives BY
// REFERENCE), `§2.5` (order-and-attributes as projection), `§3.1`
// (`M-1`..`M-19`, incl. the amended `M-1`/`M-18` whose containers come FROM
// the factory, and the NEW row `M-19` — a caller-detached node is NOT
// re-appended), `§3.2` (`F-1`..`F-12`, incl. the amended `F-6`/`F-7`
// per-method container-state table, the amended `F-9` whose `removed`
// membership is **PINNED**, the amended `F-10` whose four injected-callback
// SAFE DEFAULTS are now contract, the negative row `F-11`, and the NEW row
// `F-12` — the five factory drives and their two negatives),
// `§3.3` (`I-1`..`I-10`), `§4.1`/`§4.2` (the red set and its authoring order),
// `§4.4` (`S-1`..`S-7`; `S-2`/`S-4` **RE-SCOPED AND STRENGTHENED**), `§5.1`
// (diff scope: this file + the module ONLY), `§5.2` (leg 1 — the node suite,
// with the **harness clause: leg 1's harness supplies the injected factory**),
// `§5.3` (the DONE row, incl. item 10), `§5.5.1` (the typed property register
// executed in THIS file), `§7`, `§7a` (the ambiguity report), **`§7a.1` (its
// nine RULINGS)** and **`§3b`/`§3b`-1/`§3b`-3 (the adversarial pass's fifteen
// findings, the six REMANDED red rows and the three strategy gaps — every one
// ruled TEST-SIDE)**.
//
// LAYER: **[T] — the repo's node suite against `src/shared/dom-shim.ts` ONLY.**
// No real DOM, no `window`, no IPC, no assembled app, no rendered geometry, no
// class/CSS resolution (the shim's `className` is a plain string field). **A
// green here is envelope/pure-layer evidence and NEVER assembled-app
// evidence** (layer declaration anchor 1), and every row below is a SHIM-TREE
// row (anchor 2). The optional `[U]` real-DOM identity row of `§5.2` is **NOT
// taken** (it needs the `ui` leg and is precondition-gated), and no row here
// depends on it.
//
// **ANCHOR 3 IS NOW AN ASSERTION THIS FILE CAN FAIL, NOT A DESCRIPTION OF THE
// CODE**: the containers come from the **injected `containerFactory`** (the
// harness supplies it on every drive — `§5.2`'s harness clause) and the module
// may read **no ambient global and no assembled/computed member lookup**
// (`ADV-SH-1`'s evasion, `ADV-SH-4`'s two now-false claims). `installShim()`
// stays in `beforeAll` for ONE reason, stated so it is not read as reliance:
// **the realm must be PRESENT, or a host that still falls back to
// `globalThis['doc'+'ument']` would silently DEGRADE into the `F-6` class and
// pass `F-12` as a false green.** No row depends on the global for its own
// container: `mountEl()` needs no realm, `F-12`'s no-realm control DELETES the
// global and drives the seam with it absent, and the static rows `S-2`/`S-4`
// now fail the assembled lookup itself.
//
// THE PROPERTY LAYER IS `§5.5.1`'s REGISTER — **6 rows** (`P-SH-IM-1`,
// `P-SH-IM-2`, `P-SH-IM-3`, `P-SH-SM-1`, `P-SH-SM-2`, `P-SH-TP-1`), authored
// HERE and RUN with the `§3` rows (`§4.2` item 4): plain deterministic vitest,
// hand-authored `S₃`/`S₄` permutation tables, and ONE hand-rolled 32-bit LCG
// pinned to the literal seed **`20260927`** (`stateₙ₊₁ = (stateₙ·1664525 +
// 1013904223) mod 2³²`, **one step per draw**, pool index `= stateₙ₊₁ mod
// pool.length`, one LCG step per attempt). **No `fast-check`, no property
// runner, no new dependency, no `package.json` change, no fourth leg.** The
// caps are honoured: **≤100 attempts per row, ≤400 in total**, rows evaluated
// in register order, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
// remaining attempts are abandoned and no further row starts). Each row logs a
// record line carrying **row id · strategy id · seed · attemptsRun · held ·
// broken · stoppedEarly · notStarted · registerStoppedAt**, and **a register row
// that never started is reported as a FAILURE** (an un-run row may not look
// green). The register's own arithmetic, computed from THIS file's tables, is
// **`155` = `33 + 34 + 8 + 12 + 8 + 60`** — the `30` shared permutation
// attempts are counted in BOTH `P-SH-IM-1` and `P-SH-IM-2` and are **not**
// deduplicated (`§5.5.1`). `P-SH-IM-1` and `P-SH-TP-1` are `YES (bounded)`:
// neither is a proof of its unbounded universal.
//
// **THIS FILE IS THE UNIT'S RED SET (`§4.1`) AND NOTHING ELSE.** It is authored
// FIRST and RUN before any implementation, and it is now the **POST-AMENDMENT**
// red set: the six rows the adversarial pass remanded (`M-14`, `M-17`, `F-7`,
// `P-SH-SM-1`, `P-SH-SM-2` sequence 5, `S-5` — ALL SIX ruled TEST-SIDE, no code
// defect among them) are fixed per their own rulings, the THREE strategy gaps
// (`ADV-SH-7` `P-SH-IM-1`, `ADV-SH-8` `P-SH-IM-3`, `ADV-SH-14` `M-17`) are
// closed without touching a row's statement, strategy id or attempt count, and
// the amendment's NEW behaviour is authored RED-first: `§3.2 F-12` (the five
// `containerFactory` drives × the seven methods, with the two negatives and the
// no-realm control) and `§3.1 M-19`. `§4.4`'s `S-2`/`S-4` are STRENGTHENED (an
// assembled/computed member lookup fails the scan) and `S-5` now asserts the
// LIVE seams (`VALID_GROUPS` from `src/main/security.ts`, plus `ALL_TOOLS`,
// `ALL_RESOURCES`, `MUTATING_METHODS`, `RpcMethod`) instead of counting literals
// inline in a sibling test file (`ADV-SH-5`). **The module does NOT yet carry
// the seam** (`src/shared/slot-host.ts` still obtains containers through the
// DELETED ambient read), so the factory rows and the tightened static rows are
// EXPECTED RED and are reported as such. No `src/**` file is created or
// modified by this pass.
//
// **THE HARNESS SUPPLIES THE FACTORY (`§5.2`).** `resolveSurface()` hands every
// row a **seam-wired** `create` (`seamCreate`/`withContainerSeam`: the factory
// is injected on any options object that does not already carry one, returning
// the shim's element-factory product `mountEl()` — a value offering
// `appendChild`, `§2.1`'s accepted shape), plus the module's **`bare`**
// `createSlotHost` for the drives that must supply (or omit) the factory
// themselves (`F-12`'s five drives, `F-11`'s amended enumeration). A row that
// asserts the containers ARE the factory's values (`M-1`, `M-18`) or tracks the
// per-key calls passes its own factory and the harness keeps it.
//
// THE IMPORT BOUNDARY (the repo's established technique — a structural type
// plus a computed specifier at RUN time, so Vite cannot fail this whole file's
// transform on an unresolvable import while the module is absent): every row
// fails as an **ASSERTION** whose message names the absent module / missing
// export, not as a module-collection error that would take the whole red set
// with it. `PRE-1` proves the boundary mechanism itself resolves, against an
// EXISTING module, and `S-5` imports the two existing seam modules through the
// SAME technique (never a static import, so neither enters this file's
// standalone typecheck graph).
//
// AUTHORED ORDER (`§4.2` item 1): `I-1..I-10`, `M-1..M-19`, `F-1..F-12`, then
// the `§2.2`/`§4.4` static rows and `§5.5.1`'s register. The describe blocks
// below are in that order and NOTHING is renumbered. `F-12` appends after
// `F-11` and `M-19` after `M-18`, exactly as `§3.1`/`§3.2` write the id sets —
// and `F-9`/`F-10` are authored from their **AMENDED** text (`removed`
// membership pinned; the four named safe defaults), never from the superseded
// cells.
// ===========================================================================
import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl, ShimElement } from '../src/shared/dom-shim.js'

beforeAll(() => {
  // The realm is installed so the DELETED ambient path (if a host still takes
  // it) is caught rather than silently degraded into the `F-6` class and passing
  // `F-12` as a false green — see the layer note above. No row depends on it for
  // its own container: the harness supplies the injected factory (`§5.2`) and
  // `F-12`'s no-realm control deletes this global while driving the seam.
  installShim()
})

// ===========================================================================
// §2.1 — THE CONTRACT SHAPES, MIRRORED AS STRUCTURAL TYPES (the module cannot
// be imported for its types: it does not exist yet). Field names, optionality
// and the refusal vocabulary are `§2.1`'s, exactly.
// ===========================================================================
type SlotKey = string

/** `§2.1`'s `SlotHostRefusal['code']` — the ONLY string union in the contract.
 *  **FOUR declared members, THREE emitted**: `'no-container'` is
 *  DECLARED-BUT-NOT-EMITTED (`§2.1`'s refusal-code-domain clause, `§7a` item 1)
 *  and the negative is the row `F-11`. */
type RefusalCode = 'unknown-key' | 'no-container' | 'malformed-node' | 'container-not-appendable'
const DECLARED_CODES: readonly RefusalCode[] = ['unknown-key', 'no-container', 'malformed-node', 'container-not-appendable']
/** The EMITTED domain of `§2.1`: the declared four minus the not-emitted one.
 *  `P-SH-SM-2`'s per-step assertion is re-pinned to THIS set (`§7a` item 1). */
const EMITTED_CODES: readonly RefusalCode[] = ['unknown-key', 'malformed-node', 'container-not-appendable']
/** The code NO method of this unit may ever emit — `F-11`'s negative. */
const NOT_EMITTED_CODE: RefusalCode = 'no-container'

interface SlotAttribute {
  readonly name: string
  readonly value: string | number | boolean
}

interface SlotHostOptions {
  readonly container: unknown | null
  readonly keys: readonly SlotKey[]
  readonly orderOf?: (key: SlotKey) => string | number
  readonly classNameOf?: (key: SlotKey, node: unknown) => string | null | undefined
  readonly attributesOf?: (key: SlotKey, node: unknown) => readonly SlotAttribute[] | null | undefined
  readonly refuse?: (refusal: SlotHostRefusal) => void
  /** `§2.1`'s **container-source clause** (⟶ ADDED 2026-09-27, the architect's
   *  option-(a) ruling on `ADV-SH-1`): **the SOLE container source** — the
   *  caller's element factory, called once per declared key that needs a
   *  container; the value it returns IS that key's container. The accepted shape
   *  is **"offers `appendChild`"** (the same predicate the module uses for
   *  `isNodeShaped`). **Absent / non-callable / throwing / returning an unusable
   *  value ⇒ the EXISTING `F-6`-CLASS degradation** — a valid no-op, `refused`
   *  `[]`, `ok === true`, `placed` `[]`, `containerFor(k)` `null` — the FIFTH
   *  named safe default beside `F-10`'s four (`§3.2 F-12`). */
  readonly containerFactory?: (key: SlotKey) => unknown
}

interface SlotHostRefusal {
  /** `§2.1` ⟶ WIDENED 2026-09-27 (`§7a` item 5): `unknown`, NOT `SlotKey` — it
   *  holds the supplied value VERBATIM (a `SlotKey` when the input was a string;
   *  `42`/`null`/`undefined`/`{}` when it was not), with no `String(...)`, no
   *  trim and no coercion. `F-3` drives the non-string values this field must
   *  be able to carry. */
  readonly key: unknown
  readonly code: RefusalCode
  readonly message: string
}

interface SlotHostResult {
  readonly ok: boolean
  readonly order: readonly SlotKey[]
  readonly placed: readonly SlotKey[]
  readonly removed: readonly unknown[]
  readonly refused: readonly SlotHostRefusal[]
}

interface SlotHost {
  setNode(key: SlotKey, node: unknown | null): SlotHostResult
  remove(key: SlotKey): SlotHostResult
  setOrder(keys: readonly SlotKey[]): SlotHostResult
  render(): SlotHostResult
  keys(): readonly SlotKey[]
  containerFor(key: SlotKey): unknown | null
  dispose(): void
}

type CreateSlotHost = (options: SlotHostOptions) => SlotHost

/** `§2.1`'s `SlotHostResult` field set — asserted by every result-taking row. */
const RESULT_KEYS = ['ok', 'order', 'placed', 'removed', 'refused'].sort()
/** `§2.1`'s SEVEN methods, in the interface's own order. */
const HOST_METHODS = ['setNode', 'remove', 'setOrder', 'render', 'keys', 'containerFor', 'dispose'] as const
type HostMethod = (typeof HOST_METHODS)[number]
/** The `SlotHostResult`-returning methods of `§2.1` (the FOUR `§7a` item 3 scopes
 *  `F-7`'s refusal clause to). */
const RESULT_METHODS: readonly HostMethod[] = ['setNode', 'remove', 'setOrder', 'render']
/** The SEVEN exports `§2.1` declares (six of them are type-only). */
const DECLARED_EXPORTS: ReadonlyArray<readonly [name: string, kind: string]> = [
  ['SlotKey', 'type'],
  ['SlotAttribute', 'interface'],
  ['SlotHostOptions', 'interface'],
  ['SlotHostRefusal', 'interface'],
  ['SlotHostResult', 'interface'],
  ['SlotHost', 'interface'],
  ['createSlotHost', 'function'],
]

// ===========================================================================
// THE IMPORT BOUNDARY (`§4.1`) — a computed run-time specifier.
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/slot-host.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution still applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'slot-host.js'].join('/')

type Surface = {
  /** The SEAM-WIRED `createSlotHost` of `§5.2`'s harness clause: the injected
   *  `containerFactory` is added to every options object that does not carry one
   *  (`§2.1`'s container-source clause). Every container-dependent row drives
   *  THIS one, so no row relies on the DELETED ambient read. */
  create: CreateSlotHost | null
  /** The module's OWN `createSlotHost`, untouched — `F-12`'s five factory drives
   *  and `F-11`'s amended enumeration must supply (or omit) the factory
   *  themselves, so they use this one. */
  bare: CreateSlotHost | null
  mod: Record<string, unknown> | null
  reason: string | null
}
let surfaceCache: Surface | null = null

/** Resolves `§2.1`'s surface WITHOUT throwing: the reason a row is red is data,
 *  so a clause row can report it and a register row can count it as a broken
 *  attempt (`§5.5.1`'s stop-after-5 discipline). */
async function resolveSurface(): Promise<Surface> {
  if (surfaceCache !== null) return surfaceCache
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = {
      create: null,
      bare: null,
      mod: null,
      reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    const create = mod['createSlotHost']
    surfaceCache =
      typeof create === 'function'
        ? { create: seamCreate(create as CreateSlotHost), bare: create as CreateSlotHost, mod, reason: null }
        : {
            create: null,
            bare: null,
            mod,
            reason: "§2.1's `createSlotHost` is not exported (or is not a function)",
          }
  } catch (e) {
    surfaceCache = { create: null, bare: null, mod: null, reason: `the module does not resolve: ${String(e)}` }
  }
  return surfaceCache
}

/** The clause rows' boundary. Fails as an ASSERTION carrying the row's label, so
 *  the red message is about the absent module/method, never an import type. */
async function surface(
  label: string,
): Promise<{ create: CreateSlotHost; bare: CreateSlotHost; mod: Record<string, unknown> }> {
  const s = await resolveSurface()
  if (s.create === null || s.bare === null) {
    expect(
      s.create,
      `RED — U-SLOTHOST red set (§4.1): ${s.reason ?? 'the module surface is unavailable'}. ` +
        `This row drives §2.1's createSlotHost(options) → SlotHost. [${label}]`,
    ).not.toBe(null)
    throw new Error(`U-SLOTHOST red set — module absent: ${s.reason ?? 'unavailable'} [${label}]`)
  }
  return { create: s.create, bare: s.bare, mod: s.mod ?? {} }
}

// ===========================================================================
// THE INJECTED CONTAINER SOURCE (`§2.1`'s container-source clause + `§5.2`'s
// harness clause). **The harness SUPPLIES the factory**: every host built
// through the harness's `create` carries a `containerFactory` returning the
// shim's own element-factory product (`mountEl()`, "any value offering
// `appendChild`"), so the module never needs the realm and no row depends on
// the DELETED ambient read. A row that needs its own factory (`M-1`/`M-18`,
// which assert the containers ARE the factory's values; `F-12`, which supplies
// or omits it) passes one and the harness KEEPS it.
// ===========================================================================
/** The harness's injected element factory: one fresh shim element per call. */
function seamFactory(): (key: SlotKey) => unknown {
  return () => mountEl()
}

/** `§5.2`: the harness's options carry the factory unless the row supplies one. */
function withContainerSeam(options: SlotHostOptions): SlotHostOptions {
  const supplied = options as unknown as Record<string, unknown>
  if (supplied === null || typeof supplied !== 'object') return options
  if (Object.prototype.hasOwnProperty.call(supplied, 'containerFactory')) return options
  return { ...options, containerFactory: seamFactory() }
}

/** The seam-wired form of `§2.1`'s `createSlotHost` (`§5.2`). */
function seamCreate(create: CreateSlotHost): CreateSlotHost {
  return (options: SlotHostOptions) => create(withContainerSeam(options))
}

// ===========================================================================
// THE SHIM-TREE HELPERS. No shim member is added or expanded (`§4.4 S-2`,
// `H-r5`): the assertions below use `children` + `appendChild` +
// `setAttribute` + `remove` + the plain `className`/`attrs` fields, and every
// identity claim is `toBe`/`===` BY REFERENCE — never an "is a DOM element"
// predicate, which the shim does not model and which would be true by
// construction on `§2.1`'s `unknown | null` return (`§7a` item 7).
// ===========================================================================
function isShim(v: unknown): v is ShimElement {
  return v instanceof ShimElement
}

/** A caller-created node (the host never creates one — `§2.2` prohibition 2). */
function nodeEl(id = ''): ShimElement {
  const el = mountEl()
  if (id !== '') el.id = id
  return el
}

/** A caller-created FOREIGN sibling (`§2.4` item 3). */
function foreignEl(id: string): ShimElement {
  return nodeEl(`foreign-${id}`)
}

function childrenOf(container: unknown): unknown[] {
  if (!isShim(container)) return []
  return container.children
}

function snapshotChildren(container: unknown): unknown[] {
  return [...childrenOf(container)]
}

function sameRef(a: unknown, b: unknown): boolean {
  return a === b
}

function containsRef(haystack: readonly unknown[], needle: unknown): boolean {
  return haystack.some((x) => sameRef(x, needle))
}

function expectRefsEqual(actual: readonly unknown[], expected: readonly unknown[], label: string): void {
  expect(actual.length, `${label} — length`).toBe(expected.length)
  for (let i = 0; i < expected.length; i += 1) {
    expect(actual[i], `${label} — element ${i} is the SAME object, at the same index (§7a` + ' item 8)').toBe(expected[i])
  }
}

/** A `catch`-and-record drive: the throw is DATA, not an escape. `null` in
 *  `thrown` means the drive did not escape (`§2.1`'s totality universal). */
type DriveRecord = { label: string; thrown: unknown; value: unknown }
function tryDrive(label: string, fn: () => unknown): DriveRecord {
  try {
    return { label, thrown: null, value: fn() }
  } catch (e) {
    return { label, thrown: e, value: undefined }
  }
}

function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}

/** One method drive that MUST NOT throw (`§2.1`/`§3.3 I-8`). Driven ONCE. */
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
    `${label} — §2.1: no method of this host throws, for any input (it threw: ${describeThrown(thrown)})`,
  ).toBe(null)
  return out
}

/** The `SlotHostResult` shape check: the exact `§2.1` field set, the four array
 *  fields, and `ok === (refused.length === 0)` (`§3.3 I-1`). */
function asResult(value: unknown, label: string): SlotHostResult {
  expect(value !== null && typeof value === 'object', `${label} — §2.1: a SlotHostResult object is returned`).toBe(true)
  const r = value as SlotHostResult
  expect(
    Object.keys(r).sort(),
    `${label} — §2.1: the exact SlotHostResult field set {ok, order, placed, removed, refused}`,
  ).toEqual(RESULT_KEYS)
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

/** The host's containers in the injected container's CHILD ORDER — the
 *  node/`[T]`-layer observable `§2.5` item 3 / `M-3` / `I-10` name (`§7a` item
 *  9: the "zero graph ops" half is `S-7`'s STATIC row, never a `[T]` claim). */
function containerChildSequence(host: SlotHost, container: unknown, keys: readonly SlotKey[]): unknown[] {
  const containers = keys.map((k) => host.containerFor(k))
  const kids = childrenOf(container)
  return kids.filter((child) => containers.some((c) => sameRef(c, child)))
}

/** `F-1`/`I-10`'s no-silent-create half, measured before and after a call. */
function childCountOf(container: unknown): number {
  return childrenOf(container).length
}

/** The coherence clauses `P-SH-SM-2` asserts per step (`I-1`, the EMITTED code
 *  domain + the `'no-container'` negative, `I-2`, `I-7`, `keys() === order`). */
function coherenceBreaks(
  host: SlotHost,
  r: unknown,
  declaredKeys: readonly SlotKey[],
  label: string,
): string[] {
  const breaks: string[] = []
  const res = asResult(r, label)
  for (const ref of res.refused) {
    if (ref.code === NOT_EMITTED_CODE) {
      breaks.push(`${label}: a refusal carries '${NOT_EMITTED_CODE}' — F-11: that member is DECLARED-BUT-NOT-EMITTED`)
    } else if (!EMITTED_CODES.includes(ref.code)) {
      breaks.push(`${label}: a refusal carries '${ref.code}', outside the three EMITTED members (§2.1)`)
    }
    if (!DECLARED_CODES.includes(ref.code)) breaks.push(`${label}: a refusal code is outside the DECLARED union too`)
  }
  const counted = new Map<string, number>()
  for (const k of res.order) counted.set(k, (counted.get(k) ?? 0) + 1)
  for (const [k, n] of counted) {
    if (n !== 1) breaks.push(`${label}: order names '${k}' ${n} times (§3.3 I-2: each declared key ONCE)`)
  }
  for (const k of res.order) {
    if (!declaredKeys.includes(k)) breaks.push(`${label}: order names '${k}', which is NOT declared (I-2/I-10)`)
  }
  for (const k of declaredKeys) {
    if (!res.order.includes(k)) breaks.push(`${label}: order DROPPED the declared key '${k}' (§3.3 I-2)`)
  }
  for (const k of res.placed) {
    if (!res.order.includes(k)) breaks.push(`${label}: placed names '${k}', which is not in order (§3.3 I-7: placed ⊆ order)`)
  }
  const ks = host.keys()
  if (ks.length !== res.order.length) breaks.push(`${label}: keys().length === ${ks.length} but order.length === ${res.order.length}`)
  else for (let i = 0; i < ks.length; i += 1) {
    if (ks[i] !== res.order[i]) breaks.push(`${label}: keys()[${i}] === '${String(ks[i])}' but order[${i}] === '${String(res.order[i])}'`)
  }
  return breaks
}

/** Every refusal a call produced, from the RESULT and from the injected
 *  listener (`F-11`'s enumeration reads both, `M-17`). */
function refusalsSeen(r: SlotHostResult, seen: readonly SlotHostRefusal[]): SlotHostRefusal[] {
  return [...r.refused, ...seen]
}

// ===========================================================================
// §2.2 static-source readers (the rows over the module FILE) — `§4.4`'s
// `S-1`..`S-7` outcomes, whose static half lives here by construction.
// ===========================================================================
function moduleSource(label: string): string {
  expect(
    existsSync(MODULE_SRC),
    `RED — U-SLOTHOST red set (§4.1): the static rows read the module file of §2.2/§4.4/§5.1 and it does not exist yet (${fileURLToPath(
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

/** A short, verbatim rendering of a value for a row's message. */
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

const hasOwn = Object.prototype.hasOwnProperty

// ===========================================================================
// PRE-1..PRE-2 — HARNESS PRECONDITIONS (not spec rows). They are the
// instruments every row above depends on, asserted so a red row cannot be a
// harness artefact. Both are expected GREEN today.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    const existing = ['..', 'src', 'shared', 'dom-shim.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['mountEl']).toBe('function')
    const cast = mod['mountEl'] as unknown as () => { children: unknown[] }
    expect(Array.isArray(cast().children), 'the shim surface is reachable through the boundary technique').toBe(true)
    const el = mountEl()
    expect(el instanceof ShimElement, 'the shim element class is imported as a VALUE, so `instanceof` is a shim-tree check').toBe(true)
  })

  it('PRE-2 the register tables are the ones §5.5.1 specifies (sizes, exhaustiveness, pool, arithmetic, seed)', () => {
    const permKey = (p: readonly string[]) => p.join('')
    expect(PERMS_S3.length, 'S₃ has 6 permutations').toBe(6)
    expect(PERMS_S4.length, 'S₄ has 24 permutations').toBe(24)
    expect(new Set(PERMS_S3.map(permKey)).size, 'S₃ entries are distinct').toBe(6)
    expect(new Set(PERMS_S4.map(permKey)).size, 'S₄ entries are distinct').toBe(24)
    for (const p of PERMS_S3) expect([...p].sort(), 'every S₃ entry is a permutation of {a,b,c}').toEqual(['a', 'b', 'c'])
    for (const p of PERMS_S4) expect([...p].sort(), 'every S₄ entry is a permutation of {a,b,c,d}').toEqual(['a', 'b', 'c', 'd'])
    expect(PARTIAL_DRIVES.length, "P-SH-IM-1's third fixed table holds the 3 partial-order drives").toBe(3)
    expect(MIXED_CLASSES.length, "P-SH-SM-1's (a) half drives the 3 classes §3.2 gives a trigger").toBe(3)
    expect(TP_POOL.length, "§5.5.1 P-SH-TP-1's input pool holds the 20 named shapes").toBe(20)
    expect(new Set(TP_POOL.map((s) => s.id)).size, 'the 20 pool shapes are distinct').toBe(20)
    const covered = new Set([
      ...TP_POOL.map((s) => s.method),
      ...TP_DRAW_INDICES.map((_, i) => HOST_METHODS[i % HOST_METHODS.length]),
    ])
    for (const m of HOST_METHODS) expect(covered.has(m), `the pool plus its draw cycle make the method axis total: '${m}' is covered`).toBe(true)
    // THE ARITHMETIC, checked against THIS file's own tables (`§5.5.1`'s
    // "Attempt arithmetic" block, `155` = 33 + 34 + 8 + 12 + 8 + 60). The `30`
    // shared permutation attempts are counted in BOTH `P-SH-IM-1` and
    // `P-SH-IM-2` — deliberately NOT deduplicated.
    const arithmetic = {
      'P-SH-IM-1': PERMS_S3.length + PERMS_S4.length + PARTIAL_DRIVES.length,
      'P-SH-IM-2': PERMS_S3.length + PERMS_S4.length + 4,
      'P-SH-IM-3': 4 * 2,
      'P-SH-SM-1': MIXED_CLASSES.length * 2 + 4 + 2,
      'P-SH-SM-2': 8,
      'P-SH-TP-1': TP_DRAWS,
    }
    expect(arithmetic['P-SH-IM-1'], "P-SH-IM-1's attempts: 6 + 24 + 3").toBe(33)
    expect(arithmetic['P-SH-IM-2'], "P-SH-IM-2's attempts: 30 (re-driven) + 4").toBe(34)
    expect(arithmetic['P-SH-IM-3'], "P-SH-IM-3's attempts: 4 shapes × 2 calls").toBe(8)
    expect(arithmetic['P-SH-SM-1'], "P-SH-SM-1's attempts: 6 + 4 + 2").toBe(12)
    expect(arithmetic['P-SH-SM-2'], "P-SH-SM-2's attempts: the 8 fixed sequences").toBe(8)
    expect(arithmetic['P-SH-TP-1'], "P-SH-TP-1's attempts: 60 pinned-seed draws").toBe(60)
    const total = Object.values(arithmetic).reduce((a, b) => a + b, 0)
    expect(total, "the register total, computed from THIS file's tables — §5.5.1's arithmetic (155)").toBe(155)
    for (const [row, n] of Object.entries(arithmetic)) {
      expect(n, `${row} is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(total, `the register total is inside the ≤${REGISTER_TOTAL_CAP} cap`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(SEED, 'the seed is the pinned literal §5.5.1 names').toBe(20260927)
    // The LCG's first three STATES from the literals below, so a later edit of a
    // constant reddens HERE, and the pool index of each of the first draws.
    const s1 = (SEED * LCG_A + LCG_C) % LCG_MOD
    const s2 = (s1 * LCG_A + LCG_C) % LCG_MOD
    const s3 = (s2 * LCG_A + LCG_C) % LCG_MOD
    const lcg = makeLcg(SEED)
    const states = [lcg.step(), lcg.step(), lcg.step()]
    expect(states, 'the first three LCG states from seed 20260927 are the literals recomputed here').toEqual([s1, s2, s3])
    expect(TP_DRAW_INDICES.length, 'the 60 draws are materialised as indices').toBe(TP_DRAWS)
    expect(
      TP_DRAW_INDICES.slice(0, 3),
      'one LCG step per draw: the first three pool indices are state₁₋₃ mod 20',
    ).toEqual([s1 % TP_POOL.length, s2 % TP_POOL.length, s3 % TP_POOL.length])
  })

  it('PRE-3 (harness, not a spec row) — §5.2\'s seam wiring injects the factory and KEEPS a row-supplied one', () => {
    // The instrument every container-dependent row depends on (`§2.1`'s
    // container-source clause, `§5.2`'s harness clause): asserted here so a red
    // container row cannot be a wiring artefact.
    const captured: SlotHostOptions[] = []
    const probe: CreateSlotHost = (options) => {
      captured.push(options)
      return {} as SlotHost
    }
    const wired = seamCreate(probe)
    wired({ container: mountEl(), keys: ['a'] })
    expect(typeof captured[0].containerFactory, 'PRE-3: the harness injects a containerFactory on a plain options object').toBe('function')
    const made = (captured[0].containerFactory as (key: SlotKey) => unknown)('a')
    expect(
      typeof (made as { appendChild?: unknown }).appendChild,
      'PRE-3 / §2.1: the harness\'s factory returns a value offering `appendChild` — the accepted shape',
    ).toBe('function')
    expect(sameRef(made, (captured[0].containerFactory as (key: SlotKey) => unknown)('a')), 'PRE-3: …a FRESH element per call').toBe(false)
    // A row's OWN factory is kept, never overwritten: `M-1`/`M-18` assert the
    // containers ARE the factory's values, and `F-12`'s drives supply or omit it
    // themselves (they use the module's `bare` create).
    const mine = (): unknown => 'mine'
    wired({ container: mountEl(), keys: ['a'], containerFactory: mine })
    expect(captured[1].containerFactory, 'PRE-3: a row-supplied factory is respected').toBe(mine)
    wired({ container: mountEl(), keys: ['a'], containerFactory: undefined })
    expect(
      Object.prototype.hasOwnProperty.call(captured[2], 'containerFactory'),
      'PRE-3: an EXPLICIT `undefined` factory is respected (F-12 drive (2)), never replaced',
    ).toBe(true)
    expect(captured[2].containerFactory, 'PRE-3: …and it stays undefined').toBe(undefined)
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER'S EXECUTION MACHINERY.
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

  /** The row's own verdict + its `§5.5.1`/`§5.3` item 10 record line. An un-run
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

/** The pinned-seed generator of `S-SH-SEED-1`: a hand-rolled 32-bit LCG whose
 *  constants are literals in THIS file. `stateₙ₊₁ = (stateₙ·1664525 +
 *  1013904223) mod 2³²`, **ONE step per draw**; the pool index is
 *  `stateₙ₊₁ mod pool.length`. No `Math.random`, no wall-clock seed, no
 *  shrinking, no adaptive search, no `next(k)` scaling helper (the step form is
 *  stated exactly so a two-step form cannot be read into it — `§5.5.1` item 2). */
function makeLcg(seed: number): { step: () => number } {
  let state = seed >>> 0
  return {
    step(): number {
      state = (state * LCG_A + LCG_C) % LCG_MOD
      return state
    },
  }
}

/** `S₃` and `S₄` — HAND-AUTHORED permutation tables (literal key arrays: no
 *  generator, no library). 6 + 24 = the `30` exhaustive permutation attempts that
 *  `P-SH-IM-1` and `P-SH-IM-2` EACH drive (`§5.5.1`: the shared `30` are counted
 *  twice and may not be deduplicated). */
const S3_KEYS: readonly SlotKey[] = ['a', 'b', 'c']
const S4_KEYS: readonly SlotKey[] = ['a', 'b', 'c', 'd']
const PERMS_S3: ReadonlyArray<readonly SlotKey[]> = [
  ['a', 'b', 'c'],
  ['a', 'c', 'b'],
  ['b', 'a', 'c'],
  ['b', 'c', 'a'],
  ['c', 'a', 'b'],
  ['c', 'b', 'a'],
]
const PERMS_S4: ReadonlyArray<readonly SlotKey[]> = [
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

/** `P-SH-IM-1`'s THIRD fixed table (`S-SH-PERM-1` `+3`): the `M-15` ignored-key
 *  and duplicate-key ground of `§2.5` item 2, one `setOrder` each on a 3-key
 *  host. COUNTED in the row's `33`. */
const PARTIAL_DRIVES: ReadonlyArray<readonly SlotKey[]> = [['c', 'a'], ['c', 'a', 'nope'], ['a', 'a', 'c']]

/** `P-SH-SM-1`'s (a) half: the THREE refusal classes `§3.2` gives a trigger
 *  (`§2.1`'s emitted domain — the fourth declared member is deliberately NOT
 *  driven, `§5.5.1`'s cell + `§7a` item 1). */
const MIXED_CLASSES: ReadonlyArray<readonly [id: string, code: RefusalCode]> = [
  ['F-1 undeclared key', 'unknown-key'],
  ['F-2 malformed node', 'malformed-node'],
  ['F-7 present-but-unusable container', 'container-not-appendable'],
]

/** The pinned-seed draw count of `P-SH-TP-1` (`§5.5.1`: `60` draws over the `20`
 *  shapes — "draws `60` times in a fixed draw order"). */
const TP_DRAWS = 60

// The pool of `20` literal input shapes (`§5.5.1 P-SH-TP-1`'s own list: `null` ·
// `undefined` · `42` · `NaN` · `''` · `'x'` · `[]` · `[{}]` · `[42]` · a
// non-object argument used where a node is expected · `{key: null}` as a node ·
// an object with no `appendChild` · an object whose `appendChild` is `42` ·
// `container: null` · `container: 42` · `container: 'div'` · `keys: null` ·
// `keys: 'a,b'` · `keys: [1,2]` · a caller node already detached). **A
// callback-throwing shape is NOT in the pool** — the row is `YES (bounded)` and
// the four seams live in the `§3.2` row `F-10` (`§2.1`'s totality boundary: "a
// throwing caller callback is excluded"). A `Symbol` key is NOT in the pool by
// design (`§2.1`: `type SlotKey = string`).
//
// EVERY method is covered: each draw calls the shape's own method AND the
// cycling method of its draw index (draw `d`'s cycle method is
// `HOST_METHODS[d mod 7]`), so the `60` draws cover the method axis as well as
// the input axis — `PRE-2` asserts the shape axis and the method axis are both
// total.
type TpShape = {
  id: string
  method: HostMethod
  config: () => SlotHostOptions
  keys: readonly SlotKey[]
  call: (h: SlotHost) => unknown
}

const BAD_CONTAINER: unknown = { noAppendChildHere: true }
const BAD_APPEND_CHILD: unknown = { appendChild: 42 }
const DETACHED_NODE = (() => {
  const n = nodeEl('detached')
  const holder = mountEl()
  holder.appendChild(n)
  n.remove()
  return n
})()

/** The shape's own `setNode` key: a declared key where one exists, else a key
 *  that the shape's malformed `keys` option cannot declare (so the drive still
 *  reaches the host and is refused, never throwing). */
function tpKey(declared: readonly SlotKey[]): SlotKey {
  return declared.length > 0 ? declared[0] : 'a'
}

const TP_POOL: readonly TpShape[] = [
  {
    id: 'null as the node',
    method: 'setNode',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.setNode('a', null),
  },
  {
    id: 'undefined as the node',
    method: 'render',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', undefined)
      return h.render()
    },
  },
  {
    id: '42 as the node',
    method: 'containerFor',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', 42)
      return h.containerFor('a')
    },
  },
  {
    id: 'NaN as the node',
    method: 'remove',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', Number.NaN)
      return h.remove('a')
    },
  },
  {
    id: "'' as the node",
    method: 'setOrder',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', '')
      return h.setOrder(['a'])
    },
  },
  {
    id: "'x' as the node (a bare string used where a node is expected)",
    method: 'dispose',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', 'x')
      return h.dispose()
    },
  },
  {
    id: '[] as the node',
    method: 'setNode',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.setNode('a', []),
  },
  {
    id: '[{}] as the node',
    method: 'render',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', [{}])
      return h.render()
    },
  },
  {
    id: '[42] as the node',
    method: 'keys',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', [42])
      return h.keys()
    },
  },
  {
    id: 'a non-object argument (a bare string) used where a node is expected',
    method: 'setNode',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.setNode('a', 'not-a-node'),
  },
  {
    id: '{key: null} as the node value',
    method: 'containerFor',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', { key: null })
      return h.containerFor('a')
    },
  },
  {
    id: 'an object with no appendChild (present-but-unusable, F-7)',
    method: 'setNode',
    config: () => ({ container: BAD_CONTAINER, keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.setNode('a', nodeEl('u')),
  },
  {
    id: 'an object whose appendChild is 42 (present-but-unusable, F-7)',
    method: 'render',
    config: () => ({ container: BAD_APPEND_CHILD, keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.render(),
  },
  {
    id: 'container: null (the supported no-op configuration, F-6)',
    method: 'setOrder',
    config: () => ({ container: null, keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.setOrder(['a']),
  },
  {
    id: 'container: 42',
    method: 'remove',
    config: () => ({ container: 42, keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.remove('a'),
  },
  {
    id: "container: 'div'",
    method: 'dispose',
    config: () => ({ container: 'div', keys: ['a'] }),
    keys: ['a'],
    call: (h) => h.dispose(),
  },
  {
    id: 'keys: null (a malformed option ⇒ an empty declared set, F-4)',
    method: 'containerFor',
    config: () => ({ container: mountEl(), keys: null as unknown as readonly SlotKey[] }),
    keys: [],
    call: (h) => h.containerFor('a'),
  },
  {
    id: "keys: 'a,b' (a string where an array is declared, F-4)",
    method: 'keys',
    config: () => ({ container: mountEl(), keys: 'a,b' as unknown as readonly SlotKey[] }),
    keys: [],
    call: (h) => h.keys(),
  },
  {
    id: 'keys: [1,2] (non-string members, F-4)',
    method: 'setNode',
    config: () => ({ container: mountEl(), keys: [1, 2] as unknown as readonly SlotKey[] }),
    keys: [],
    call: (h) => h.setNode('a', nodeEl('n')),
  },
  {
    id: 'a caller node already DETACHED from its container',
    method: 'remove',
    config: () => ({ container: mountEl(), keys: ['a'] }),
    keys: ['a'],
    call: (h) => {
      h.setNode('a', DETACHED_NODE)
      return h.remove('a')
    },
  },
]

/** The `60` pool indices, materialised from the PINNED seed with ONE LCG step
 *  per draw (`§5.5.1` item 2: no two-step form). The cycling method of draw `d`
 *  is `HOST_METHODS[d mod HOST_METHODS.length]`, so the method axis is total. */
/** The `60` pool indices, materialised from the PINNED seed with ONE LCG step
 *  per draw (`§5.5.1` item 2: no two-step form). */
const TP_DRAW_INDICES: readonly number[] = (() => {
  const lcg = makeLcg(SEED)
  const out: number[] = []
  for (let i = 0; i < TP_DRAWS; i += 1) out.push(lcg.step() % TP_POOL.length)
  return out
})()

/** Draw `d`'s CYCLING method (`HOST_METHODS[d mod 7]`) — the method axis the
 *  pool's own `method` bindings also cover. */
const TP_CYCLE_METHODS: readonly HostMethod[] = TP_DRAW_INDICES.map((_, i) => HOST_METHODS[i % HOST_METHODS.length])

/** ONE cycling drive of a named method on an already-built host — the
 *  "all methods are covered" half of `P-SH-TP-1`'s pool (`§5.5.1`). */
function driveTpMethod(host: SlotHost, method: HostMethod, keys: readonly SlotKey[]): unknown {
  const key = tpKey(keys)
  switch (method) {
    case 'setNode':
      return host.setNode(key, nodeEl('cyc'))
    case 'remove':
      return host.remove(key)
    case 'setOrder':
      return host.setOrder(keys)
    case 'render':
      return host.render()
    case 'keys':
      return host.keys()
    case 'containerFor':
      return host.containerFor(key)
    case 'dispose':
      return host.dispose()
  }
}

// ===========================================================================
// I-1..I-10 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — ok === (refused.length === 0) in EVERY state (no "ok with refusals" state exists)', async () => {
    const { create } = await surface('I-1')
    const cases: Array<{ id: string; make: () => unknown }> = [
      { id: 'M-1 (three declared keys, a fresh container)', make: () => create({ container: mountEl(), keys: ['a', 'b', 'c'] }).render() },
      { id: 'M-8 (keys: [])', make: () => create({ container: mountEl(), keys: [] }).render() },
      { id: 'M-5 (a valid placement)', make: () => create({ container: mountEl(), keys: ['a'] }).setNode('a', nodeEl('n')) },
      { id: 'F-1 (an undeclared key)', make: () => create({ container: mountEl(), keys: ['a'] }).setNode('nope', nodeEl('n')) },
      { id: 'F-2 (a malformed node)', make: () => create({ container: mountEl(), keys: ['a'] }).setNode('a', null) },
      { id: 'F-6 (an absent container — NOT a refusal)', make: () => create({ container: null, keys: ['a'] }).setNode('a', nodeEl('n')) },
      { id: 'F-7 (an unusable container)', make: () => create({ container: BAD_CONTAINER, keys: ['a'] }).render() },
    ]
    for (const c of cases) {
      const r = asResult(drive(c.make, `I-1 ${c.id}`), `I-1 ${c.id}`)
      expect(r.ok, `I-1 ${c.id}: ok === (refused.length === 0)`).toBe(r.refused.length === 0)
    }
  })

  it('I-2 §3.3 — order is EXACTLY the declared key set, each key ONCE, in every state', async () => {
    const { create } = await surface('I-2')
    const h = create({ container: mountEl(), keys: ['a', 'b', 'c'] })
    const states: Array<[string, () => unknown]> = [
      ['render()', () => h.render()],
      ['setNode(a)', () => h.setNode('a', nodeEl('a'))],
      ['setOrder([c,a])', () => h.setOrder(['c', 'a'])],
      ['remove(b) (never placed)', () => h.remove('b')],
      ['setNode(undeclared)', () => h.setNode('nope', nodeEl('nope'))],
      ['remove(undeclared)', () => h.remove('nope')],
      ['setOrder([a,a,nope])', () => h.setOrder(['a', 'a', 'nope'])],
    ]
    for (const [id, fn] of states) {
      const r = asResult(drive(fn, `I-2 ${id}`), `I-2 ${id}`)
      expect([...r.order].sort(), `I-2 ${id}: order is exactly the declared key set, each key ONCE`).toEqual(['a', 'b', 'c'])
    }
  })

  it('I-3 §3.3 — foreign siblings are reference-identical before and after EVERY call', async () => {
    const { create } = await surface('I-3')
    const container = mountEl()
    const f1 = foreignEl('1')
    const f2 = foreignEl('2')
    container.appendChild(f1)
    container.appendChild(f2)
    const h = create({ container, keys: ['a', 'b'] })
    const n = nodeEl('n')
    const calls: Array<[string, () => unknown]> = [
      ['render()', () => h.render()],
      ['setNode(a, n)', () => h.setNode('a', n)],
      ['setNode(undeclared)', () => h.setNode('nope', nodeEl('x'))],
      ['setOrder([b,a])', () => h.setOrder(['b', 'a'])],
      ['remove(a)', () => h.remove('a')],
      ['remove(undeclared)', () => h.remove('nope')],
    ]
    for (const [id, fn] of calls) {
      drive(fn, `I-3 ${id}`)
      const kids = childrenOf(container)
      const foreignKids = kids.filter((c) => sameRef(c, f1) || sameRef(c, f2))
      expect(foreignKids, `I-3 ${id}: both foreign siblings are STILL the same objects (the V-7 hard row)`).toEqual([f1, f2])
      expect(kids.filter((c) => sameRef(c, f1)).length, `I-3 ${id}: f1 occurs exactly once`).toBe(1)
      expect(kids.filter((c) => sameRef(c, f2)).length, `I-3 ${id}: f2 occurs exactly once`).toBe(1)
    }
    // …and inside the host's own containers every node's identity holds too
    // (I-3's second half) — asserted through the placement rows' `toBe` claims.
    expect(childrenOf(h.containerFor('a')), 'I-3: containerFor(a) holds no child after remove(a)').toEqual([])
  })

  it('I-4 §3.3 — the host authors NO content (no text/class/ARIA/style write, no default node)', async () => {
    const { create } = await surface('I-4')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b'] })
    h.render()
    for (const k of ['a', 'b']) {
      const c = h.containerFor(k)
      expect(isShim(c), `I-4 containerFor('${k}'): a shim element the host created`).toBe(true)
      const el = c as ShimElement
      expect(el.textContent, `I-4 containerFor('${k}'): the host writes NO text`).toBe('')
      expect(el.className, `I-4 containerFor('${k}'): the host writes NO class value of its own`).toBe('')
      expect(el.style.cssText, `I-4 containerFor('${k}'): the host writes NO style`).toBe('')
      expect(el.attrs, `I-4 containerFor('${k}'): the host writes NO attribute (no role/ARIA, no default)`).toEqual({})
      expect(el.children, `I-4 containerFor('${k}'): the host authors NO default node`).toEqual([])
    }
    expect(hasOwn.call(h, 'publish') || 'publish' in h, 'I-4 / ruling 1: no publish-shaped member exists').toBe(false)
  })

  it('I-5 §3.3 — after dispose() the host retains NO key, container reference, node reference or state', async () => {
    const { create } = await surface('I-5')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b'] })
    const n = nodeEl('n')
    h.setNode('a', n)
    h.render()
    const cA = h.containerFor('a')
    expect(cA !== null, 'I-5: a container existed before dispose').toBe(true)
    expect(drive(() => h.dispose(), 'I-5 dispose()'), 'I-5: dispose() returns void').toBe(undefined)
    expect(h.keys(), 'I-5: no declared key survives dispose()').toEqual([])
    expect(h.containerFor('a'), 'I-5: no container reference survives dispose()').toBe(null)
    expect(childrenOf(container), 'I-5: the injected container holds no host container after dispose()').toEqual([])
    expect(n, 'I-5 / §2.4 item 5: the caller NODE object still exists (it is not destroyed)').toBe(n)
    expect(drive(() => h.dispose(), 'I-5 a second dispose()'), 'I-5: an idempotent second dispose() is a no-op').toBe(undefined)
  })

  it('I-6 §3.3 — for every placed key, the container holds the caller node BY REFERENCE (never a clone)', async () => {
    const { create } = await surface('I-6')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({ container, keys: ['a'] })
    const r = asResult(drive(() => h.setNode('a', n), 'I-6 setNode(a, n)'), 'I-6 setNode(a, n)')
    const kids = childrenOf(h.containerFor('a'))
    expect(kids.length, 'I-6: exactly the placed node is in the container').toBe(1)
    expect(kids[0], 'I-6: the container holds the caller node BY REFERENCE — never a clone').toBe(n)
    expect(r.placed, 'I-6: the key is placed').toEqual(['a'])
  })

  it('I-7 §3.3 — placed is a SUBSET of order, and order holds EVERY declared key regardless of placement', async () => {
    const { create } = await surface('I-7')
    const h = create({ container: mountEl(), keys: ['a', 'b'] })
    h.setNode('a', nodeEl('a'))
    h.render()
    const r = asResult(drive(() => h.render(), 'I-7 render()'), 'I-7 render()')
    expect(r.order, 'I-7: order holds EVERY declared key').toEqual(['a', 'b'])
    expect(r.placed, 'I-7: placed holds only the key that holds a host-placed node').toEqual(['a'])
    for (const k of r.placed) expect(r.order.includes(k), `I-7: placed key '${k}' is in order`).toBe(true)
    expect(r.placed.length, 'I-7: placed ⊆ order (strict here — b holds no node)').toBeLessThan(r.order.length)
  })

  it('I-8 §3.3 — NO method throws, for any input (the deterministic table; S-1/S-5 not triggered)', async () => {
    const { create } = await surface('I-8')
    const drives: Array<[string, () => unknown]> = []
    const inputs: Array<[string, unknown]> = [
      ['null', null],
      ['undefined', undefined],
      ['42', 42],
      ["''", ''],
      ["'x'", 'x'],
      ['[]', []],
      ['[{}]', [{}]],
    ]
    for (const [id, value] of inputs) {
      drives.push([`setNode('a', ${id}) on a declared key`, () => create({ container: mountEl(), keys: ['a'] }).setNode('a', value)])
      drives.push([`setNode(${id} as a KEY, n)`, () => create({ container: mountEl(), keys: ['a'] }).setNode(value as unknown as SlotKey, nodeEl('n'))])
    }
    drives.push(['setNode(undeclared, n)', () => create({ container: mountEl(), keys: ['a'] }).setNode('nope', nodeEl('n'))])
    drives.push(['remove(undeclared)', () => create({ container: mountEl(), keys: ['a'] }).remove('nope')])
    drives.push(['setOrder(null)', () => create({ container: mountEl(), keys: ['a'] }).setOrder(null as unknown as readonly SlotKey[])])
    drives.push(['setOrder([1,2])', () => create({ container: mountEl(), keys: ['a'] }).setOrder([1, 2] as unknown as readonly SlotKey[])])
    drives.push(['containerFor(undeclared)', () => create({ container: mountEl(), keys: ['a'] }).containerFor('nope')])
    drives.push(['keys()', () => create({ container: mountEl(), keys: ['a'] }).keys()])
    drives.push(['dispose()', () => create({ container: mountEl(), keys: ['a'] }).dispose()])
    for (const [id, v] of [
      ['null', null],
      ['undefined', undefined],
      ['{}', {}],
      ['42', 42],
      ["'div'", 'div'],
      ['an object with no appendChild', BAD_CONTAINER],
      ['appendChild: 42', BAD_APPEND_CHILD],
    ]) {
      drives.push([`render() with container: ${id}`, () => create({ container: v as unknown, keys: ['a', 'b'] }).render()])
      drives.push([`setNode with container: ${id}`, () => create({ container: v as unknown, keys: ['a'] }).setNode('a', nodeEl('n'))])
      drives.push([`keys() with container: ${id}`, () => create({ container: v as unknown, keys: ['a'] }).keys()])
      drives.push([`containerFor with container: ${id}`, () => create({ container: v as unknown, keys: ['a'] }).containerFor('a')])
    }
    drives.push([
      'a detached node, then remove()',
      () => {
        const n = nodeEl('d')
        const holder = mountEl()
        holder.appendChild(n)
        n.remove()
        const h = create({ container: mountEl(), keys: ['a'] })
        h.setNode('a', n)
        return h.remove('a')
      },
    ])
    const escaped = drives.map(([label, fn]) => tryDrive(label, fn)).filter((d) => d.thrown !== null)
    expect(
      escaped.map((d) => `${d.label}: ${describeThrown(d.thrown)}`),
      'I-8 / §2.1: no method of this host throws — for any input shape (a throwing caller callback is excluded; no such shape is driven here)',
    ).toEqual([])
    expect(drives.length, 'I-8: the deterministic table is the one §3.3 I-8 lists').toBeGreaterThanOrEqual(30)
  })

  it('I-9 §3.3 — every returned array is a FRESH array (reference inequality + the mutation half)', async () => {
    const { create } = await surface('I-9')
    const h = create({ container: mountEl(), keys: ['a', 'b'] })
    h.setNode('a', nodeEl('a'))
    const first = asResult(drive(() => h.render(), 'I-9 render() #1'), 'I-9 render() #1')
    const second = asResult(drive(() => h.render(), 'I-9 render() #2'), 'I-9 render() #2')
    expect(second === first, 'I-9: the result OBJECT is not reused across calls').toBe(false)
    for (const field of ['order', 'placed', 'removed', 'refused'] as const) {
      expect(sameRef(second[field], first[field]), `I-9: the '${field}' array is NOT the same array object across two calls`).toBe(false)
    }
    const removeRes = asResult(drive(() => h.remove('a'), 'I-9 remove(a)'), 'I-9 remove(a)')
    expect(sameRef(removeRes.order, second.order), "I-9: two DIFFERENT methods' results do not share an array either").toBe(false)
    // The MUTATION half: a returned array is the caller's to mutate, and doing so
    // cannot change the host's state (re-read keys() and observe the pre-mutation
    // values).
    const before = [...h.keys()]
    const r3 = asResult(drive(() => h.render(), 'I-9 render() #3'), 'I-9 render() #3')
    const snapshotOrder = [...r3.order]
    ;(r3.order as SlotKey[]).push('INJECTED')
    ;(r3.placed as SlotKey[]).sort()
    ;(r3.refused as SlotHostRefusal[]).push({ key: 'INJECTED', code: 'unknown-key', message: 'caller-injected' })
    expect(h.keys(), 'I-9: mutating a returned array does NOT change the host state').toEqual(before)
    const r4 = asResult(drive(() => h.render(), 'I-9 render() #4'), 'I-9 render() #4')
    expect(r4.order, 'I-9: the next call reports the pre-mutation values').toEqual(snapshotOrder)
    expect(r4.refused, 'I-9: a caller-injected refusal does not leak into the host state').toEqual([])
  })

  it('I-10 §3.3 — the host-created container count is exactly keys.length after a successful render(), and NEVER more', async () => {
    const { create } = await surface('I-10')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b', 'c'] })
    h.render()
    expect(containerChildSequence(h, container, ['a', 'b', 'c']), 'I-10: exactly 3 host containers, in keys order').toHaveLength(3)
    expect(childrenOf(container).length, 'I-10: and NO other child was created').toBe(3)
    const before = childCountOf(container)
    // An undeclared key through EVERY write entry point creates nothing.
    for (const [id, fn] of [
      ["setNode('nope', n)", () => h.setNode('nope', nodeEl('x'))],
      ["remove('nope')", () => h.remove('nope')],
      ["containerFor('nope')", () => h.containerFor('nope')],
      ["setOrder(['nope'])", () => h.setOrder(['nope'])],
    ] as Array<[string, () => unknown]>) {
      drive(fn, `I-10 ${id}`)
      expect(childCountOf(container), `I-10 ${id}: the container child count is UNCHANGED (no silent create)`).toBe(before)
    }
  })
})

// ===========================================================================
// M-1..M-19 — §3.1, the valid / happy states. One row per state, each row's
// drive and its expected observable taken from the row's own text (with the
// `§7a` re-pins applied: the per-step child-reference sequence, reference
// identity, and the `containerFor` anti-vacuity observables), and with the
// 2026-09-27 amendment applied to `M-1`/`M-18`: **the containers COME FROM THE
// INJECTED `containerFactory`** — that is what a host that ignores the seam (or
// falls back to a realm-created element) FAILS.
// ===========================================================================
describe('M — §3.1 the valid states', () => {
  it("M-1 §3.1 — declared keys ⇒ one container each, in keys order (the containerFor observables + the INJECTED factory)", async () => {
    const { create } = await surface('M-1')
    const container = mountEl()
    // ⟶ AMENDED 2026-09-27 (the architect's option-(a) ruling on the container
    // source; `ADV-SH-1`): the three containers are the three values the
    // INJECTED factory returned for 'a'/'b'/'c' — the host creates none of them
    // itself and reads no ambient global to obtain one (§2.1's container-source
    // clause, §2.2 prohibition 2). The reference-identity observables below are
    // UNCHANGED; the drive gains the seam, and the factory's per-key returns are
    // tracked so a realm fallback FAILS this row.
    const factoryValues = new Map<SlotKey, unknown>()
    const factoryCalls: SlotKey[] = []
    const h = create({
      container,
      keys: ['a', 'b', 'c'],
      containerFactory: (key) => {
        factoryCalls.push(key)
        const el = mountEl()
        factoryValues.set(key, el)
        return el
      },
    })
    const r = asResult(drive(() => h.render(), 'M-1 render()'), 'M-1 render()')
    expect(r.ok, 'M-1: ok === true').toBe(true)
    expect(r.order, "M-1: order === ['a','b','c']").toEqual(['a', 'b', 'c'])
    const kids = childrenOf(container)
    expect(kids, "M-1: the injected container's children are EXACTLY three host-created elements, in that order").toHaveLength(3)
    // §7a item 7, observable 1 — reference identity with the injected
    // container's child at the projected index ("is the second" as a CAN-FAIL
    // assertion, never as "is an element").
    expect(h.containerFor('b'), "M-1: containerFor('b') IS the injected container's children[1] — by reference").toBe(kids[1])
    expect(h.containerFor('a'), "M-1: containerFor('a') IS children[0]").toBe(kids[0])
    expect(h.containerFor('c'), "M-1: containerFor('c') IS children[2]").toBe(kids[2])
    // §7a item 7, observable 2 — per-key identity across two calls, and distinct
    // objects for distinct keys.
    expect(h.containerFor('b'), "M-1: a SECOND containerFor('b') returns the SAME object").toBe(h.containerFor('b'))
    expect(h.containerFor('a') === h.containerFor('b'), 'M-1: two declared keys have DIFFERENT containers').toBe(false)
    expect(h.containerFor('a') === h.containerFor('c'), 'M-1: two declared keys have DIFFERENT containers').toBe(false)
    for (const k of ['a', 'b', 'c']) {
      const kIds = childrenOf(h.containerFor(k))
      expect(kIds, `M-1: containerFor('${k}') holds no caller node yet`).toEqual([])
      expect((h.containerFor(k) as ShimElement).textContent, `M-1: containerFor('${k}') holds NO text`).toBe('')
      // ⟶ AMENDED 2026-09-27: the container IS the INJECTED factory's value —
      // §2.1's container-source clause item 2 ("called once per declared key
      // that needs a container … the value it returns IS that key's container").
      // A host that ignores the seam, or manufactures the element from anything
      // else (a realm read, an assembled/computed member lookup), FAILS here.
      expect(
        factoryValues.has(k),
        `M-1: the injected containerFactory was called for the declared key '${k}' (§2.1's container-source clause item 2)`,
      ).toBe(true)
      expect(
        h.containerFor(k),
        `M-1: containerFor('${k}') IS the value the injected factory returned for '${k}' — the seam is the SOLE container source`,
      ).toBe(factoryValues.get(k))
    }
    expect(factoryCalls.length, 'M-1: the factory is called exactly once per declared key that needs a container').toBe(3)
    expect(new Set(factoryCalls).size, 'M-1: …once per KEY, never twice for the same key').toBe(3)
    expect(r.placed, 'M-1: placed is []').toEqual([])
  })

  it('M-2 §3.1 — omitted orderOf ⇒ the supplied keys order, with NO sorting (prohibition 3)', async () => {
    const { create } = await surface('M-2')
    const container = mountEl()
    // 'z' first and 'a' last: any sorting would invert this, and 'a' would move.
    const h = create({ container, keys: ['z', 'a'] })
    const r = asResult(drive(() => h.render(), 'M-2 render()'), 'M-2 render()')
    expect(r.order, 'M-2: order is EXACTLY the supplied keys order — no sorting occurs').toEqual(['z', 'a'])
    expect(h.keys(), 'M-2: keys() reports the supplied order').toEqual(['z', 'a'])
    expect(containerChildSequence(h, container, ['z', 'a']), 'M-2: the child sequence is the supplied order').toEqual([
      container.children[0],
      container.children[1],
    ])
  })

  it("M-3 §3.1 — orderOf-projected container order ({a:2,b:0,c:1} ⇒ ['b','c','a'])", async () => {
    const { create } = await surface('M-3')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b', 'c'], orderOf: (k) => ({ a: 2, b: 0, c: 1 })[k] as number })
    const r = asResult(drive(() => h.render(), 'M-3 render()'), 'M-3 render()')
    expect(r.order, "M-3: order === ['b','c','a']").toEqual(['b', 'c', 'a'])
    const kids = childrenOf(container)
    // The NODE-LAYER observable (§2.5 item 3's layer ruling, §7a item 9): the
    // injected container's CHILD SEQUENCE — element by element, by reference.
    expect(kids, 'M-3: three host containers').toHaveLength(3)
    expectRefsEqual(kids, [h.containerFor('b'), h.containerFor('c'), h.containerFor('a')], 'M-3: the child sequence matches')
    expect(kids[0], "M-3: children[0] IS containerFor('b')").toBe(h.containerFor('b'))
  })

  it('M-4 §3.1 — orderOf TIES keep the supplied key order (stability; no invented tiebreak)', async () => {
    const { create } = await surface('M-4')
    const container = mountEl()
    const h = create({ container, keys: ['first', 'second', 'lowest'], orderOf: (k) => ({ first: 1, second: 1, lowest: 0 })[k] as number })
    const r = asResult(drive(() => h.render(), 'M-4 render()'), 'M-4 render()')
    expect(r.order, 'M-4: the tied pair keeps the SUPPLIED order').toEqual(['lowest', 'first', 'second'])
    expect(r.order.indexOf('first'), 'M-4: the first-supplied tied key precedes the second-supplied one').toBeLessThan(r.order.indexOf('second'))
    // The same tie data supplied in the OPPOSITE order keeps THAT order too — the
    // tie is not resolved by an invented rule such as key order.
    const container2 = mountEl()
    const h2 = create({ container: container2, keys: ['zebra', 'apple'], orderOf: () => 1 })
    const r2 = asResult(drive(() => h2.render(), 'M-4 the reversed supplied order'), 'M-4 the reversed supplied order')
    expect(r2.order, 'M-4: with the supply order reversed, the tie follows the NEW supplied order').toEqual(['zebra', 'apple'])
    expect(containerChildSequence(h2, container2, ['zebra', 'apple']), 'M-4: the child sequence follows that stable projection').toEqual([
      h2.containerFor('zebra'),
      h2.containerFor('apple'),
    ])
  })

  it("M-5 §3.1 — setNode places the caller's node, BY REFERENCE; removed is []", async () => {
    const { create } = await surface('M-5')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({ container, keys: ['a'] })
    const r = asResult(drive(() => h.setNode('a', n), 'M-5 setNode(a, n)'), 'M-5 setNode(a, n)')
    expect(r.ok, 'M-5: ok === true').toBe(true)
    expect(r.placed, "M-5: placed contains 'a'").toEqual(['a'])
    const kids = childrenOf(h.containerFor('a'))
    expect(kids.length, "M-5: containerFor('a') holds exactly one child").toBe(1)
    expect(kids[0], "M-5: containerFor('a')'s child IS the caller's node n (toBe)").toBe(n)
    expect(containsRef(kids, n), "M-5: …and it is n by reference").toBe(true)
    expect(r.removed, 'M-5: removed is []').toEqual([])
  })

  it('M-6 §3.1 (classNameOf half) — the class value is applied VERBATIM, and the host adds no class of its own', async () => {
    const { create } = await surface('M-6 classNameOf')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({ container, keys: ['a'], classNameOf: () => 'caller-class' })
    const r = asResult(drive(() => h.setNode('a', n), 'M-6 setNode(a, n)'), 'M-6 setNode(a, n)')
    expect(n.className, 'M-6: the node\'s class is EXACTLY "caller-class" (verbatim — nothing prefixed)').toBe('caller-class')
    expect(n.attrs, 'M-6: the host added NO attribute of its own').toEqual({})
    expect(r.ok, 'M-6: ok === true').toBe(true)
  })

  it('M-6 §3.1 (attributesOf half) — attribute writes are verbatim, in array order, LAST WRITE WINS', async () => {
    const { create } = await surface('M-6 attributesOf')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({
      container,
      keys: ['a'],
      attributesOf: () => [
        { name: 'data-k', value: 'v' },
        { name: 'data-k', value: 'w' },
      ],
    })
    const r = asResult(drive(() => h.setNode('a', n), 'M-6 setNode(a, n)'), 'M-6 setNode(a, n)')
    expect(n.attrs, 'M-6: the attribute store holds data-k = "w" (last write wins) and NOTHING else').toEqual({ 'data-k': 'w' })
    expect(Object.keys(n.attrs).sort(), "M-6: the attribute-name set is EXACTLY {data-k} plus whatever the node already had").toEqual(['data-k'])
    // The node's pre-existing attributes are untouched and are part of that set.
    const n2 = nodeEl('n2')
    n2.setAttribute('data-preexisting', 'yes')
    const h2 = create({
      container: mountEl(),
      keys: ['a'],
      attributesOf: () => [
        { name: 'data-k', value: 'v' },
        { name: 'data-k', value: 'w' },
      ],
    })
    asResult(drive(() => h2.setNode('a', n2), 'M-6 setNode(a, n2)'), 'M-6 setNode(a, n2)')
    expect(Object.keys(n2.attrs).sort(), 'M-6: the name set is exactly {data-k, data-preexisting} — the host adds nothing of its own').toEqual([
      'data-k',
      'data-preexisting',
    ])
    expect(n2.attrs['data-k'], 'M-6: last write wins on n2 as well').toBe('w')
    expect(r.removed, 'M-6: nothing was removed').toEqual([])
  })

  it('M-7 §3.1 — FOREIGN SIBLINGS SURVIVE (the V-7 hard row): the same objects after TWO renders', async () => {
    const { create } = await surface('M-7')
    const container = mountEl()
    const f1 = foreignEl('1')
    const f2 = foreignEl('2')
    container.appendChild(f1)
    container.appendChild(f2)
    const before = snapshotChildren(container)
    const h = create({ container, keys: ['a'] })
    const r1 = asResult(drive(() => h.render(), 'M-7 render() #1'), 'M-7 render() #1')
    expect(r1.ok, 'M-7: ok === true').toBe(true)
    const afterFirst = snapshotChildren(container)
    const r2 = asResult(drive(() => h.render(), 'M-7 render() #2'), 'M-7 render() #2')
    expect(r2.ok, 'M-7: ok === true after the second render').toBe(true)
    const afterSecond = snapshotChildren(container)
    expect(afterSecond.length, 'M-7: two render() cycles add exactly one host container each cycle — never a duplicate').toBe(3)
    // BOTH foreign elements are the SAME objects after the second render (toBe).
    expect(containsRef(afterSecond, f1), 'M-7: f1 is still the same object after the second render').toBe(true)
    expect(containsRef(afterSecond, f2), 'M-7: f2 is still the same object after the second render').toBe(true)
    expect(afterSecond.filter((c) => sameRef(c, f1)).length, 'M-7: f1 was never removed — it occurs once').toBe(1)
    expect(afterSecond.filter((c) => sameRef(c, f2)).length, 'M-7: f2 was never removed — it occurs once').toBe(1)
    // They were never removed or re-appended: their relative order and positions
    // are unchanged from before the host existed.
    expect(afterSecond.indexOf(f1), 'M-7: f1 keeps its position').toBe(before.indexOf(f1))
    expect(afterSecond.indexOf(f2), 'M-7: f2 keeps its position').toBe(before.indexOf(f2))
    expect(afterFirst.indexOf(f1), 'M-7: f1 keeps its position after the FIRST render too').toBe(before.indexOf(f1))
    expect(
      afterSecond.filter((c) => sameRef(c, f1) || sameRef(c, f2)),
      'M-7: the foreign subsequence is reference-identical after two renders',
    ).toEqual([f1, f2])
  })

  it('M-8 §3.1 — keys: [] ⇒ an empty container, empty arrays, and NOTHING throws', async () => {
    const { create } = await surface('M-8')
    const container = mountEl()
    const h = create({ container, keys: [] })
    const r = asResult(drive(() => h.render(), 'M-8 render()'), 'M-8 render()')
    expect(r.ok, 'M-8: ok === true').toBe(true)
    expect(r.order, 'M-8: order is []').toEqual([])
    expect(r.placed, 'M-8: placed is []').toEqual([])
    expect(r.refused, 'M-8: refused is []').toEqual([])
    expect(childrenOf(container), 'M-8: the injected container is UNCHANGED — no child').toEqual([])
    expect(h.keys(), 'M-8: keys() is []').toEqual([])
    expect(h.containerFor('a'), 'M-8: containerFor on a key that cannot be declared returns null').toBe(null)
  })

  it('M-9 §3.1 — a node MOVES between declared keys: one node, one key, one container at a time', async () => {
    const { create } = await surface('M-9')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({ container, keys: ['a', 'b'] })
    h.setNode('a', n)
    h.render()
    const rAChildrenBefore = snapshotChildren(h.containerFor('a'))
    expect(rAChildrenBefore, "M-9: containerFor('a') held n").toEqual([n])
    const r = asResult(drive(() => h.setNode('b', n), 'M-9 setNode(b, n)'), 'M-9 setNode(b, n)')
    expect(childrenOf(h.containerFor('a')), "M-9: containerFor('a') NO LONGER holds n").toEqual([])
    const kidsB = childrenOf(h.containerFor('b'))
    expect(kidsB.length, "M-9: containerFor('b') holds exactly one child").toBe(1)
    expect(kidsB[0], 'M-9: containerFor(b) holds n BY REFERENCE').toBe(n)
    expect(r.order, 'M-9: order is unchanged').toEqual(['a', 'b'])
    expect(r.placed, "M-9: placed contains 'b' and not 'a'").toEqual(['b'])
    expect(containsRef(r.placed as unknown[], n), 'M-9: placed reports KEYS, never nodes').toBe(false)
  })

  it('M-10 §3.1 — REPLACEMENT: the same key, a different node ⇒ n1 in removed, the container holds n2', async () => {
    const { create } = await surface('M-10')
    const container = mountEl()
    const n1 = nodeEl('n1')
    const n2 = nodeEl('n2')
    const h = create({ container, keys: ['a'] })
    h.setNode('a', n1)
    h.render()
    const r = asResult(drive(() => h.setNode('a', n2), 'M-10 setNode(a, n2)'), 'M-10 setNode(a, n2)')
    expect(r.removed.length, 'M-10: n1 appears in removed').toBe(1)
    expect(r.removed[0], 'M-10: removed[0] IS n1, by reference').toBe(n1)
    const kids = childrenOf(h.containerFor('a'))
    expect(kids, 'M-10: the container holds n2 (by reference) and nothing else').toEqual([n2])
    expect(kids[0], 'M-10: …and it is n2 itself').toBe(n2)
    expect(r.order.filter((k) => k === 'a').length, "M-10: 'a' still appears in order EXACTLY once").toBe(1)
    expect(r.placed, "M-10: 'a' is still placed").toEqual(['a'])
  })

  it('M-11 §3.1 — a null/undefined class-or-attribute return is NO WRITE (no empty string, no empty class)', async () => {
    const { create } = await surface('M-11')
    const container = mountEl()
    const n = nodeEl('n')
    const before = JSON.stringify({ attrs: n.attrs, className: n.className })
    const h = create({ container, keys: ['a'], classNameOf: () => null, attributesOf: () => undefined })
    const r = asResult(drive(() => h.setNode('a', n), 'M-11 setNode(a, n)'), 'M-11 setNode(a, n)')
    expect(JSON.stringify({ attrs: n.attrs, className: n.className }), 'M-11: the node\'s attribute set and class are UNCHANGED').toBe(before)
    expect(n.className, 'M-11: no empty class is written').toBe('')
    expect(n.attrs, 'M-11: no empty-string attribute is written').toEqual({})
    expect(JSON.stringify(n.attrs).includes('""'), 'M-11: …and nothing empty-string-shaped is in the store').toBe(false)
    expect(r.ok, 'M-11: ok === true').toBe(true)
  })

  it('M-12 §3.1 — remove() keeps the container and the declaration, and drops the node', async () => {
    const { create } = await surface('M-12')
    const container = mountEl()
    const n = nodeEl('n')
    const h = create({ container, keys: ['a'] })
    h.setNode('a', n)
    h.render()
    const cA = h.containerFor('a')
    const r = asResult(drive(() => h.remove('a'), 'M-12 remove(a)'), 'M-12 remove(a)')
    expect(containsRef(r.removed, n), "M-12: n is in removed, by reference").toBe(true)
    expect(h.keys(), "M-12: 'a' is STILL declared (keys() still contains it)").toContain('a')
    expect(h.containerFor('a'), "M-12: containerFor('a') is STILL the same host container").toBe(cA)
    expect(r.order, "M-12: 'a' is still in order").toEqual(['a'])
    expect(childrenOf(h.containerFor('a')), 'M-12: the node is gone from the container').toEqual([])
    expect(r.placed, "M-12: 'a' is no longer placed").toEqual([])
    expect(r.ok, 'M-12: ok === true').toBe(true)
  })

  it('M-13 §3.1 — dispose() removes the host containers, destroys NO caller node, is idempotent, retains no state', async () => {
    const { create } = await surface('M-13')
    const container = mountEl()
    const foreign = foreignEl('1')
    container.appendChild(foreign)
    const h = create({ container, keys: ['a', 'b', 'c'] })
    const nodes = [nodeEl('a'), nodeEl('b'), nodeEl('c')]
    ;['a', 'b', 'c'].forEach((k, i) => h.setNode(k, nodes[i]))
    h.render()
    expect(childrenOf(container).length, 'M-13: the container holds the foreign sibling + 3 host containers').toBe(4)
    expect(drive(() => h.dispose(), 'M-13 dispose()'), 'M-13: dispose() does not throw').toBe(undefined)
    expect(childrenOf(container), 'M-13: the injected container holds ONLY the foreign sibling it held before').toEqual([foreign])
    expect(nodes[0], 'M-13: node 1 still exists as an object').toBe(nodes[0])
    expect(nodes[1], 'M-13: node 2 still exists as an object').toBe(nodes[1])
    expect(nodes[2], 'M-13: node 3 still exists as an object').toBe(nodes[2])
    expect(nodes[0].parent === null || isShim(nodes[0].parent), 'M-13: the node object is intact (never destroyed)').toBe(true)
    expect(h.keys(), 'M-13: keys() is [] after dispose()').toEqual([])
    expect(drive(() => h.dispose(), 'M-13 a second dispose()'), 'M-13: a second dispose() is a no-op').toBe(undefined)
    expect(childrenOf(container), 'M-13: the second dispose() changed nothing (no state retained — I-5)').toEqual([foreign])
  })

  it('M-14 §3.1 — a null/undefined/absent/malformed container ⇒ a valid state on every method, read method by method against §3.2 F-7’s per-method table (the reads driven AS reads)', async () => {
    // ⟶ CORRECTED 2026-09-27 (the RE-PIN pass): this row's title read
    // *"M-14 §3.1 — a null/absent/malformed container ⇒ every operation a NO-OP
    // with a valid state (the reads driven AS reads)"*. `M-14`'s five container
    // values are TWO CONTAINER STATES (`§3.1 M-14`'s RECONCILED cell), so
    // "every operation a NO-OP" holds for the ABSENT class only — the
    // PRESENT-BUT-UNUSABLE class (`{}`/`42`/`'div'`) refuses
    // `'container-not-appendable'` on every call that attempts a node write. The
    // title now names the state and the table; the row id, the clause citations
    // and every drive below are unchanged.
    const { create } = await surface('M-14')
    // §2.1's container-source clause item 5: an absent container AND a supplied
    // factory together give the SAME no-op state (once, not two degradations
    // stacked) — the harness injects the factory (§5.2) and nothing is placeable
    // because there is no mount to project onto.
    //
    // TWO CLASSES, ONE DRIVE LIST: M-14's own trigger names `null`/`undefined`/
    // `{}`/`42`/`'div'`, and they are TWO CONTAINER STATES. `null`/`undefined`
    // are the ABSENT class of the per-method table (column (a): no refusal,
    // `ok === true`, everything a no-op). `{}`/`42`/`'div'` are the
    // PRESENT-BUT-UNUSABLE class (column (b): `ok === false` with exactly one
    // EMITTED `'container-not-appendable'` refusal per attempted node write),
    // exactly as `§3.1 M-14`'s RECONCILED 2026-09-27 cell splits them.
    //
    // ⟶ RE-PINNED 2026-09-27 (this pass; the superseded classification this row
    // previously encoded is KEPT VISIBLE here, verbatim and un-elided): the
    // row's earlier reading was
    // *"TWO CLASSES, ONE DRIVE LIST: M-14's own trigger names `null`/`undefined`/
    // `{}`/`42`/`'div'`. `null`/`undefined`/`42`/`'div'` are the ABSENT class of
    // the per-method table (column (a): no refusal, `ok === true`, everything a
    // no-op). **`{}` is NOT that class**: `F-6`'s own text ("`container-not-appendable`
    // therefore fires only when a container is present but refused by the
    // environment (e.g. an object with no `appendChild`)") and the per-method
    // table's column (b) classify that very value as PRESENT-BUT-UNUSABLE, so this
    // variant asserts the observables COMMON to both classes plus `containerFor(k)
    // === null` (column (b)'s own value), never "ok === true". ⟶ REPORTED, never
    // fixed here: the M-14 cell and the table disagree for `{}` (see this row's
    // report; the row drives every variant it names rather than dropping one)."*
    // — and the report it filed was **RECONCILED, in the direction it named**:
    // `§3.2 F-7`'s per-method table GOVERNED (`§7a` item 2's ruling) and
    // `§3.1 M-14`'s cell now reads *"`{}` / `42` / `'div'` are the
    // PRESENT-BUT-UNUSABLE container"* — so it was `42` and `'div'` that the
    // superseded cell had misclassified as ABSENT, and `{}` was already right.
    // Every variant now drives its OWN class's per-method observables: the
    // table's columns are asserted per call, never collapsed into one `ok` for
    // all five methods.
    const variants: Array<[string, unknown, 'absent' | 'present-but-unusable']> = [
      ['null', null, 'absent'],
      ['undefined', undefined, 'absent'],
      ['42', 42, 'present-but-unusable'],
      ["'div'", 'div', 'present-but-unusable'],
      ['{}', {}, 'present-but-unusable'],
    ]
    for (const [id, v, containerState] of variants) {
      // ⟶ THE PER-CALL TABLE THIS ROW NOW READS (`§3.2 F-7`'s per-method table,
      // the text `§7a` item 2 RULED governs), method by method and state by
      // state, as the table's OWN clauses scope it — read against THIS drive's
      // step order, so nothing is collapsed into one `ok` for all five calls:
      //   · `setNode('a', n)` on the UNUSABLE class: the table's `setNode` row is
      //     categorical for this class — one refusal per attempted placement.
      //   · `remove('a')`: the table's `remove` row refuses on this class **when
      //     the host actually owns a node under that key**, and this drive
      //     reaches that branch — the refused `setNode` established the
      //     ownership first, so the declaration stands (`§2.4` item 1) and the
      //     call relinquishes an ownership the host cannot express.
      //   · `render()`: the table's `render` row gives **one refusal per key the
      //     call ATTEMPTS TO PLACE**. This drive reaches `render()` only AFTER
      //     `remove('a')` has dropped the declaration's node, so the call
      //     attempts to place NOTHING — zero refusals, `ok === true`. That is
      //     the same unifying clause the `remove`-with-nothing-owned no-op is
      //     read through (an operation that attempts NO node write produces no
      //     container-state refusal) and `I-10` is not in conflict with it
      //     (`I-10` is scoped to a SUCCESSFUL `render()`); the refusing
      //     `render()` is asserted by `SH-REG-3` and `F-7`, where a node is
      //     still held when it is driven.
      //   · `setOrder(['b','a'])` on BOTH classes: WRITE-FREE — the method the
      //     scoping exists for — `ok === true`, `refused` `[]`.
      // Nothing is ever placeable on either shape, so `placed` is `[]`
      // throughout.
      const absent: [boolean, number] = [true, 0]
      const unusableWrite: [boolean, number] = [false, 1]
      // The UNUSABLE class's step-ordered readings: `render()` runs last and
      // therefore finds nothing left to attempt.
      const unusableAfterRemove: [boolean, number] = [true, 0]
      const expected: Record<string, [boolean, number]> = {
        "setNode('a', n)": containerState === 'absent' ? absent : unusableWrite,
        "setOrder(['b','a'])": absent,
        "remove('a')": containerState === 'absent' ? absent : unusableWrite,
        'render()': containerState === 'absent' ? absent : unusableAfterRemove,
      }
      const h = create({ container: v as unknown, keys: ['a', 'b'] })
      const n = nodeEl('n')
      const calls: Array<[string, () => unknown]> = [
        ["setNode('a', n)", () => h.setNode('a', n)],
        ["setOrder(['b','a'])", () => h.setOrder(['b', 'a'])],
        ["remove('a')", () => h.remove('a')],
        ['render()', () => h.render()],
        ["setNode('nope', n)", () => h.setNode('nope', n)],
      ]
      for (const [callId, fn] of calls) {
        const raw = drive(fn, `M-14 container: ${id} — ${callId}`)
        const r = asResult(raw, `M-14 container: ${id} — ${callId}`)
        expect(r.placed, `M-14 container: ${id} — ${callId}: placed is [] (the host has nowhere to place)`).toEqual([])
        if (callId.includes('nope')) {
          expect(r.ok, `M-14 container: ${id} — ${callId}: an UNDECLARED key is still refused`).toBe(false)
          expect(r.refused.length, `M-14 container: ${id} — ${callId}: exactly ONE refusal`).toBe(1)
          expect(r.refused[0].code, `M-14 container: ${id} — ${callId}: code === 'unknown-key' (F-1)`).toBe('unknown-key')
        } else if (containerState === 'absent') {
          // COLUMN (a) — `§3.2 F-6`: no refusal, `ok === true`, everything a
          // no-op (the host simply has nowhere to place).
          expect(r.ok, `M-14 container: ${id} — ${callId}: ok === true — nothing is refused (F-6, column (a))`).toBe(true)
          expect(r.refused, `M-14 container: ${id} — ${callId}: refused is []`).toEqual([])
        } else {
          // COLUMN (b) — `§3.2 F-7`'s PRESENT-BUT-UNUSABLE class, as the table's
          // own clauses scope it: a call that ATTEMPTS a node write (`setNode`
          // on a declared key; `remove` where the host owns the key's node —
          // `§2.4` item 1, which is what the preceding refused `setNode` left
          // standing — one refusal per key `render()` attempts to place) carries
          // `ok === false` with EXACTLY ONE EMITTED `'container-not-appendable'`
          // refusal, while a call that attempts NO node write carries `ok ===
          // true` with `refused` `[]` (the WRITE-FREE `setOrder`, and a
          // `render()`/`remove` with nothing left to attempt). Never
          // 'no-container' (F-11's negative) and never a fifth code.
          const [wantOk, wantRefusals] = expected[callId]
          expect(
            r.ok,
            `M-14 container: ${id} — ${callId}: ok === ${String(wantOk)} for this container state (§3.2 F-7's per-method table, column (b)); I-1 (ok === (refused.length === 0)) holds on this class too`,
          ).toBe(wantOk)
          expect(
            r.refused.length,
            `M-14 container: ${id} — ${callId}: ${wantRefusals} refusal(s) on this container state — §3.2 F-7's per-method table gives one refusal per attempted node write, and this drive's own step order decides which calls attempt one (the write-free 'setOrder', and a 'render()'/'remove' with nothing left to attempt, attempt none) (got ${JSON.stringify(r.refused.map((ref) => ref.code))})`,
          ).toBe(wantRefusals)
          if (wantRefusals === 1) {
            expect(
              r.refused[0].code,
              `M-14 container: ${id} — ${callId}: the ONE refusal is the EMITTED 'container-not-appendable' (F-11: never 'no-container')`,
            ).toBe('container-not-appendable')
          } else {
            expect(r.refused, `M-14 container: ${id} — ${callId}: refused is []`).toEqual([])
          }
        }
        expect(r.order.length, `M-14 container: ${id} — ${callId}: order is still valid`).toBe(2)
      }
      // ⟶ THE READ, DRIVEN AS A READ (`§2.1`, the per-method table, `I-8`'s scope
      // clause): `containerFor` returns `unknown | null`, carries NO `ok` and NO
      // `refused`, and is NEVER funnelled through the `SlotHostResult` helper.
      // The value is pinned BY VALUE: `null` exactly (both container-state
      // columns), never `undefined`.
      const readA = drive(() => h.containerFor('a'), `M-14 container: ${id} — containerFor('a') (a READ)`)
      expect(readA, `M-14 container: ${id}: containerFor(k) returns null, and NOT undefined (both columns of the per-method table)`).toBe(null)
      expect(readA === undefined, `M-14 container: ${id}: the read never returns undefined`).toBe(false)
      expect(h.containerFor('b'), `M-14 container: ${id}: containerFor(k) is null for EVERY key`).toBe(null)
      // The drive's own `setOrder(['b','a'])` updates the PROJECTION (the table's
      // setOrder row: "the projection is updated and reported — the projection is
      // the host's own state, not the tree"), so `keys()` reads the projected
      // order; the DECLARED SET is what M-14 pins, and it is intact.
      expect(h.keys(), `M-14 container: ${id}: keys() reports the DECLARED keys in the projected order (setOrder was driven)`).toEqual(['b', 'a'])
      expect([...h.keys()].sort(), `M-14 container: ${id}: keys() still reports the DECLARED key set`).toEqual(['a', 'b'])
      expect(drive(() => h.dispose(), `M-14 container: ${id} — dispose()`), `M-14 container: ${id}: dispose() returns void`).toBe(undefined)
    }
  })

  it('M-15 §3.1 — setOrder ignores undeclared and duplicate keys (never refuses them)', async () => {
    const { create } = await surface('M-15')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b', 'c'] })
    const r = asResult(drive(() => h.setOrder(['a', 'a', 'nope']), "M-15 setOrder(['a','a','nope'])"), "M-15 setOrder(['a','a','nope'])")
    expect(r.ok, 'M-15: ok === true').toBe(true)
    expect(r.refused, 'M-15: refused is [] — ignored, NOT refused').toEqual([])
    expect(r.order, "M-15: the declared key set in the requested relative order (here ['a', …rest])").toEqual(['a', 'b', 'c'])
    expect(r.order.length, 'M-15: no duplicate and no undeclared key is projected').toBe(3)
    const r2 = asResult(drive(() => h.setOrder(['c', 'c', 'nope', 'a']), "M-15 setOrder(['c','c','nope','a'])"), 'M-15 the second drive')
    expect(r2.order, "M-15: requested relative order 'c' before 'a', undeclared/duplicate ignored").toEqual(['c', 'a', 'b'])
  })

  it('M-16 §3.1 — render() is idempotent: the PER-STEP CHILD-REFERENCE SEQUENCE is unchanged', async () => {
    const { create } = await surface('M-16')
    const container = mountEl()
    const foreign = foreignEl('1')
    container.appendChild(foreign)
    const h = create({ container, keys: ['a', 'b'] })
    const n = nodeEl('n')
    h.setNode('a', n)
    h.render()
    const before = snapshotChildren(container)
    const beforeInner = ['a', 'b'].map((k) => snapshotChildren(h.containerFor(k)))
    const r = asResult(drive(() => h.render(), 'M-16 render() #2'), 'M-16 render() #2')
    expect(r.removed, 'M-16: the second call removes NOTHING').toEqual([])
    expect(r.refused, 'M-16: the second call refuses NOTHING').toEqual([])
    const after = snapshotChildren(container)
    expectRefsEqual(after, before, 'M-16: the injected container\'s per-step child-reference sequence is unchanged (§7a item 8)')
    for (let i = 0; i < before.length; i += 1) {
      expect(after[i], `M-16: children[${i}] is the SAME object (a re-append would move it to the end)`).toBe(before[i])
    }
    for (let ki = 0; ki < 2; ki += 1) {
      const k = ['a', 'b'][ki]
      const inner = snapshotChildren(h.containerFor(k))
      expect(inner.length, `M-16: containerFor('${k}')'s child count is unchanged`).toBe(beforeInner[ki].length)
      for (let i = 0; i < inner.length; i += 1) {
        expect(inner[i], `M-16: containerFor('${k}').children[${i}] is reference-identical`).toBe(beforeInner[ki][i])
      }
    }
    expect(after[after.length - 1], 'M-16: the last-positioned host container is unchanged').toBe(before[before.length - 1])
  })

  it('M-17 §3.1 — the refusal listener is notified ONCE per refusal, in order, its return value is ignored, and its rejected promise is NEVER observed', async () => {
    const { create } = await surface('M-17')
    const seen: SlotHostRefusal[] = []
    const container = mountEl()
    const h = create({
      container,
      keys: ['a'],
      refuse: (refusal) => {
        seen.push(refusal)
        // A hostile listener: a BOGUS RETURN VALUE. §2.1: the host ignores its
        // return value, so `ok` and the outcome are unchanged. (The rejected
        // promise is driven SEPARATELY below — `ADV-SH-14` remanded the old
        // self-catching form precisely because it could never surface.)
        return { nonsense: true } as unknown as void
      },
    })
    // ONE call, ONE refusal, ONE notification — §2.1 scopes `refused` to "this
    // call's refusals", and `refuse` is notified once PER refusal, so the count
    // is read as this call's DELTA, never as a cumulative total across calls.
    const r = asResult(
      drive(() => h.setNode('nope', nodeEl('x')), 'M-17 setNode(undeclared, nodeEl)'),
      'M-17 setNode(undeclared, nodeEl)',
    )
    expect(r.refused.length, 'M-17: the call produced ONE refusal').toBe(1)
    expect(seen.length, 'M-17: refuse was called exactly once for that refusal').toBe(1)
    expect(seen[seen.length - 1], 'M-17: the notified object is deepEqual to its entry in the returned refused list').toEqual(r.refused[0])
    expect(seen[seen.length - 1].code, "M-17: and it is the 'unknown-key' refusal").toBe('unknown-key')
    // ── ENCOUNTER ORDER, AND `refused` IS PER-CALL ──────────────────────────
    // ⟶ REMANDED TEST-SIDE (`§3b`-3 / the M-17 red row): §2.1 scopes `refused`
    // to "THIS call's refusals, in encounter order", so two calls carry ONE
    // refusal EACH. The row asserts each call's own single refusal, and keeps
    // the listener-count assertion separate (the listener is notified across
    // calls, the returned list is not cumulative).
    const seen2: SlotHostRefusal[] = []
    const h2 = create({
      container: mountEl(),
      keys: ['a'],
      refuse: (refusal) => {
        seen2.push(refusal)
        return undefined
      },
    })
    const r2a = asResult(drive(() => h2.setNode('nope1', nodeEl('x')), 'M-17 call 1'), 'M-17 call 1')
    expect(r2a.refused.length, "M-17 call 1: THIS call's refused list holds exactly ONE entry (never a cumulative count)").toBe(1)
    expect(r2a.refused[0].key, 'M-17 call 1: …the FIRST refusal, in encounter order').toBe('nope1')
    expect(r2a.ok, 'M-17 call 1: ok === false (I-1)').toBe(false)
    expect(seen2.length, 'M-17 call 1: the listener has been notified ONCE so far').toBe(1)
    const r2b = asResult(drive(() => h2.setNode('nope2', nodeEl('y')), 'M-17 call 2'), 'M-17 call 2')
    expect(r2b.refused.length, "M-17 call 2: the SECOND call's list holds exactly ONE entry too — refused is per call").toBe(1)
    expect(r2b.refused[0].key, 'M-17 call 2: …the second refusal').toBe('nope2')
    expect(r2b.ok, 'M-17 call 2: the listener\'s return value changed nothing — ok is still decided by refused.length').toBe(false)
    expect(seen2.length, 'M-17: the listener was notified exactly twice across the two calls').toBe(2)
    expect(seen2.map((x) => x.code), 'M-17: both notifications carry the same code').toEqual(['unknown-key', 'unknown-key'])
    expect(seen2[0].key, 'M-17: the first notification is the FIRST refusal, in encounter order').toBe('nope1')
    expect(seen2[1].key, 'M-17: the second notification is the second refusal').toBe('nope2')
    expect(seen2[0], 'M-17: notification 1 is deepEqual to the FIRST call\'s refused[0]').toEqual(r2a.refused[0])
    expect(seen2[1], 'M-17: notification 2 is deepEqual to the SECOND call\'s refused[0]').toEqual(r2b.refused[0])
    // ── THE REJECTED-PROMISE DRIVE (`ADV-SH-14`, `§3b`-1) ───────────────────
    // §2.1: `refuse` "is NOTIFIED, never awaited … the host … ignores its return
    // value and any promise it returns". The old drive fired
    // `void Promise.reject(...).catch(...)` INSIDE the listener, so the rejection
    // was handled by the test's own callback and a host that awaited, chained or
    // re-threw it still passed — the clause was UNFALSIFIED. This drive hands the
    // host a GENUINELY REJECTED promise through an instrumented thenable: every
    // `then`/`catch`/`finally` OBSERVATION the host makes is counted, so a host
    // that awaits or chains it FAILS. The inner rejection is settled and handled
    // OUTSIDE the listener (so the drive itself leaves no unhandled rejection),
    // which is what makes "ignored" observable rather than assumed.
    let observations = 0
    let settledRejected = false
    const inner: Promise<never> = Promise.reject(new Error('M-17: the listener returned a rejected promise'))
    const thenable = {
      then(onFulfilled?: (v: unknown) => unknown, onRejected?: (e: unknown) => unknown): unknown {
        observations += 1
        return inner.then(onFulfilled, onRejected)
      },
      catch(onRejected?: (e: unknown) => unknown): unknown {
        observations += 1
        return inner.catch(onRejected)
      },
      finally(fn?: () => void): unknown {
        observations += 1
        return inner.finally(fn)
      },
    }
    const h3 = create({
      container: mountEl(),
      keys: ['a'],
      refuse: () => thenable as unknown as void,
    })
    const d3 = tryDrive('M-17 the rejected-promise drive', () => h3.setNode('nope', nodeEl('x')))
    // Handled HERE, outside the listener: the rejection is real and settled, and
    // the host's own observation of it stays countable.
    inner.catch(() => {
      settledRejected = true
    })
    // Flush the microtask queue (and a macrotask) so a LAZILY chained observation
    // — `Promise.resolve(thenable)` schedules `then` in a microtask — is counted
    // too, before the assertion runs.
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(
      d3.thrown,
      `M-17 / §2.1: the method does not throw and does not re-throw the listener's rejection (threw: ${describeThrown(d3.thrown)})`,
    ).toBe(null)
    expect(
      observations,
      "M-17 / §2.1 + ADV-SH-14: the host NEVER awaits, chains or otherwise observes the listener's returned promise — any then/catch/finally call FAILS this row",
    ).toBe(0)
    expect(settledRejected, 'M-17 / ADV-SH-14: the promise handed to the listener was GENUINELY REJECTED (a resolved stub could not be ignored)').toBe(true)
    const r3 = asResult(d3.value, 'M-17 the rejected-promise drive')
    expect(r3.ok, 'M-17: the rejection changed no outcome — ok === false (I-1)').toBe(false)
    expect(r3.refused.length, 'M-17: the refusal was already recorded before/independently of the listener').toBe(1)
    expect(r3.refused[0].code, "M-17: …with its own code 'unknown-key', never one invented for the listener").toBe('unknown-key')
  })

  it('M-18 §3.1 — the key set is allocated to the CONTAINER, not to the caller node (order vs placed differ; the containers ARE the factory\'s)', async () => {
    const { create } = await surface('M-18')
    const container = mountEl()
    const n = nodeEl('n')
    // ⟶ AMENDED 2026-09-27 (same amendment as `M-1`): both containers COME FROM
    // THE INJECTED `containerFactory` — one call per declared key, the returned
    // value IS that key's container — so `containerFor('b')` is the FACTORY's
    // value for 'b' observed as the injected container's `children[1]`, not a
    // realm-created element. The `!==`/`toBe` observables are unchanged.
    const factoryValues = new Map<SlotKey, unknown>()
    const h = create({
      container,
      keys: ['a', 'b'],
      containerFactory: (key) => {
        const el = mountEl()
        factoryValues.set(key, el)
        return el
      },
    })
    const r = asResult(drive(() => h.setNode('a', n), 'M-18 setNode(a, n)'), 'M-18 setNode(a, n)')
    const kids = childrenOf(container)
    expect(kids, "M-18: BOTH containers exist").toHaveLength(2)
    // §7a item 7 observable 1 + 2 (never "is an element", which cannot fail).
    expect(h.containerFor('b'), "M-18: containerFor('b') IS the injected container's children[1]").toBe(kids[1])
    expect(h.containerFor('b') === h.containerFor('a'), "M-18: containerFor('b') is an OBJECT distinct from containerFor('a')").toBe(false)
    for (const k of ['a', 'b']) {
      expect(
        factoryValues.has(k),
        `M-18: the injected containerFactory was called for the declared key '${k}' (§2.1's container-source clause item 2)`,
      ).toBe(true)
      expect(
        h.containerFor(k),
        `M-18: containerFor('${k}') IS the value the injected factory returned — the seam is the SOLE container source`,
      ).toBe(factoryValues.get(k))
    }
    const kidsB = childrenOf(h.containerFor('b'))
    expect(kidsB, "M-18: containerFor('b') holds NO node — the container exists without a placement").toEqual([])
    expect(childrenOf(h.containerFor('a')), "M-18: containerFor('a') holds n").toEqual([n])
    expect(r.placed, "M-18: placed === ['a']").toEqual(['a'])
    expect(r.order, "M-18: order === ['a','b']").toEqual(['a', 'b'])
    expect(r.placed.length === r.order.length, 'M-18: the two fields are defined differently (a row asserts the difference)').toBe(false)
  })

  it('M-19 §3.1 (NEW — judgment call #17, pinned) — render() does NOT re-append a caller-DETACHED node: the detach is PERMANENT', async () => {
    const { create } = await surface('M-19')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b'] })
    const n = nodeEl('n')
    const r1 = asResult(drive(() => h.setNode('a', n), 'M-19 setNode(a, n)'), 'M-19 setNode(a, n)')
    expect(r1.placed, "M-19: 'a' is placed").toEqual(['a'])
    const cA = h.containerFor('a')
    expect(childrenOf(cA), 'M-19: the container holds n by reference').toEqual([n])
    // The CALLER detaches its own node (no `remove(key)` call runs in this row).
    n.remove()
    expect(childrenOf(cA), 'M-19: the caller detached n from its container').toEqual([])
    const before = snapshotChildren(container)
    for (let i = 1; i <= 3; i += 1) {
      // Any number of render() calls: `render()` is NOT an undo for a node the
      // caller took back.
      const r = asResult(drive(() => h.render(), `M-19 render() #${i}`), `M-19 render() #${i}`)
      expect(r.ok, `M-19 render() #${i}: ok === true (nothing is refused — a caller detach is not a refusal)`).toBe(true)
      expect(r.refused, `M-19 render() #${i}: refused is []`).toEqual([])
      expect(
        containsRef(childrenOf(cA), n),
        `M-19 render() #${i}: render() does NOT re-append the caller-detached node — the detach is PERMANENT (a host that re-appends it FAILS this row)`,
      ).toBe(false)
      expect(childrenOf(cA), `M-19 render() #${i}: the key's container stays empty of n`).toEqual([])
      // M-16's observable: the injected container's child-reference sequence is
      // unchanged by the render() (per index, by reference).
      expectRefsEqual(snapshotChildren(container), before, `M-19 render() #${i}: the injected container's child-reference sequence is unchanged`)
      expect(r.order, `M-19 render() #${i}: order is unchanged`).toEqual(['a', 'b'])
      // §2.4 item 1 + `I-7`: the ownership RECORD is unchanged by a caller
      // detach, so `placed` may still report 'a' — this row asserts only that
      // `placed` stays a SUBSET of `order` (the row pins render()'s policy, not
      // the bookkeeping), and never that 'a' was silently dropped.
      for (const k of r.placed) expect(r.order.includes(k), `M-19 render() #${i}: placed ⊆ order (I-7)`).toBe(true)
    }
    expect(h.keys(), "M-19: 'a' stays DECLARED after every render()").toEqual(['a', 'b'])
    expect(h.containerFor('a'), "M-19: containerFor('a') is still the same container").toBe(cA)
    expect(containsRef(snapshotChildren(container), cA), "M-19: the container is still projected onto the injected container").toBe(true)
    // §7 item 9's surviving half: this row asserts NOTHING about `removed` (no
    // `remove(key)` call ran) — `F-9` owns that membership.
  })
})

// ===========================================================================
// F-1..F-12 — §3.2, the documented fail-states / refusals. `F-9` and `F-10` are
// authored from their AMENDED text (`§7a.1` items 6 and 4), `F-11` is the
// negative row appended after `F-10` (whose enumeration the amendment EXTENDS
// with `F-12`'s five factory drives), and `F-12` is the container-source row the
// architect's option-(a) ruling added after `F-11`.
//
// `F-12` SHARED MACHINERY — the five ways `containerFactory` may be supplied,
// and the one seven-method drive both `F-12` and `F-11` use. Every configuration
// runs against a VALID injected shim mount, so the mount is NEVER the reason
// nothing is placed (`F-12`'s own trigger clause).
// ===========================================================================
type F12Config = {
  /** The drive's own label (which of the five ways this entry is). */
  id: string
  /** `false` ⇒ the factory property is OMITTED ENTIRELY (drive (1)). */
  present: boolean
  factory: unknown
}

/** ⟶ ADDED 2026-09-27 (the architect's option-(a) ruling; `F-12`, `§2.1`'s
 *  container-source clause). The FIVE drives, with the trigger's own values:
 *  (1) omitted · (2) `undefined` · (3) present but NOT CALLABLE (4 values) ·
 *  (4) callable but THROWING · (5) callable, returning an UNUSABLE value
 *  (6 values). */
const F12_CONFIGS: readonly F12Config[] = [
  { id: 'drive (1) · the factory is OMITTED entirely', present: false, factory: undefined },
  { id: 'drive (2) · containerFactory: undefined', present: true, factory: undefined },
  { id: 'drive (3a) · containerFactory: 42 (not callable)', present: true, factory: 42 },
  { id: 'drive (3b) · containerFactory: \'div\' (not callable)', present: true, factory: 'div' },
  { id: 'drive (3c) · containerFactory: {} (not callable)', present: true, factory: {} },
  { id: 'drive (3d) · containerFactory: null (not callable)', present: true, factory: null },
  {
    id: 'drive (4) · the factory THROWS (§2.1\'s fifth named safe default)',
    present: true,
    factory: () => {
      throw new Error('F-12: the injected element factory threw')
    },
  },
  { id: 'drive (5a) · the factory returns {} (no appendChild)', present: true, factory: () => ({}) },
  { id: 'drive (5b) · the factory returns {appendChild: 42}', present: true, factory: () => ({ appendChild: 42 }) },
  { id: 'drive (5c) · the factory returns 42', present: true, factory: () => 42 },
  { id: 'drive (5d) · the factory returns \'div\'', present: true, factory: () => 'div' },
  { id: 'drive (5e) · the factory returns null', present: true, factory: () => null },
  { id: 'drive (5f) · the factory returns undefined', present: true, factory: () => undefined },
]

const F12_KEYS: readonly SlotKey[] = ['a', 'b']

/** The options of one `F-12` configuration: a VALID shim mount + the supplied
 *  (or omitted) factory. §2.1: the seam is optional, and an explicitly supplied
 *  `undefined` is the SAME absence as an omitted property — never a
 *  harness-substituted factory (the drives use the module's `bare` create, so
 *  nothing re-injects one). */
function f12Options(mount: unknown, cfg: F12Config): SlotHostOptions {
  const base: SlotHostOptions = { container: mount, keys: F12_KEYS }
  if (!cfg.present) return base
  return { ...base, containerFactory: cfg.factory as (key: SlotKey) => unknown }
}

type F12DriveResult = { breaks: string[]; refusals: SlotHostRefusal[] }

/** The `F-12` drive: **all seven methods** (`setNode` on a declared key with a
 *  valid node, `setNode` on an undeclared key, `remove` on a declared key,
 *  `setOrder`, `render()`, `keys()`, `containerFor(k)`, `dispose()`) against the
 *  `F-6`-CLASS DEGRADATION, plus the row's TWO NEGATIVES:
 *  **(i)** no container-state refusal is produced — in particular
 *  `'no-container'` is NOT emitted, and neither is `'container-not-appendable'`
 *  (the CONTAINER is not present-but-unusable here; the SOURCE is absent);
 *  **(ii)** NO container is manufactured by any other means — the injected
 *  mount's child count is UNCHANGED from before the drive for EVERY method (a
 *  host that falls back to a realm read FAILS this, and `S-2`/`S-4` fail the
 *  assembled lookup itself).
 *  Returns every break as DATA (this row reports the whole drive, never aborts
 *  on the first failure). */
function f12Drive(create: CreateSlotHost, cfg: F12Config, label: string): F12DriveResult {
  const breaks: string[] = []
  const refusals: SlotHostRefusal[] = []
  const mount = mountEl()
  const node = nodeEl('f12-node')
  const before = childCountOf(mount)
  let h: SlotHost | null = null
  try {
    h = create({ ...f12Options(mount, cfg), refuse: (r) => refusals.push(r) })
  } catch (e) {
    return { breaks: [`${label}: createSlotHost THREW ${describeThrown(e)} — F-4: it never throws`], refusals }
  }
  // NEGATIVE (ii) — no container may be manufactured by ANY means, for every
  // method of the drive.
  const noManufacture = (step: string): void => {
    const after = childCountOf(mount)
    if (after !== before) {
      breaks.push(
        `${label} · ${step}: the injected container's child count changed from ${before} to ${after} — ` +
          `F-12 negative (ii): NO container may be manufactured by any other means (a realm read, an ambient factory, a fallback element)`,
      )
    }
  }
  const step = (name: string, fn: () => unknown): unknown => {
    const d = tryDrive(`${label} · ${name}`, fn)
    noManufacture(name)
    if (d.thrown !== null) {
      breaks.push(`${label} · ${name}: THREW ${describeThrown(d.thrown)} — §2.1's totality universal (no method throws, for any input)`)
      return undefined
    }
    return d.value
  }
  const softResult = (name: string, value: unknown): SlotHostResult | null => {
    if (value === undefined) return null // `step` already recorded the throw
    if (value === null || typeof value !== 'object') {
      breaks.push(`${label} · ${name}: returned ${brief(value)} — §2.1 declares a SlotHostResult`)
      return null
    }
    const r = value as SlotHostResult
    const fields = Object.keys(r).sort()
    if (JSON.stringify(fields) !== JSON.stringify(RESULT_KEYS)) {
      breaks.push(`${label} · ${name}: the field set is ${JSON.stringify(fields)}, not §2.1's {ok, order, placed, removed, refused}`)
      return null
    }
    for (const f of ['order', 'placed', 'removed', 'refused'] as const) {
      if (!Array.isArray(r[f])) {
        breaks.push(`${label} · ${name}: '${f}' is not an array (§2.1)`)
        return null
      }
    }
    if (r.ok !== (r.refused.length === 0)) {
      breaks.push(`${label} · ${name}: I-1 broke — ok=${String(r.ok)} with refused.length=${r.refused.length}`)
      return null
    }
    refusals.push(...r.refused)
    return r
  }
  // 1 · setNode on a DECLARED key with a valid node.
  const declaredSet = softResult('setNode(declared, node)', step('setNode(declared, node)', () => h === null ? undefined : h.setNode('a', node)))
  if (declaredSet !== null) {
    if (declaredSet.ok !== true) breaks.push(`${label} · setNode(declared): ok === ${String(declaredSet.ok)} — the degradation refuses NOTHING for a valid input (F-6 class)`)
    if (declaredSet.refused.length !== 0) breaks.push(`${label} · setNode(declared): refused is ${JSON.stringify(declaredSet.refused)} — F-12 negative (i)`)
    if (declaredSet.placed.length !== 0) breaks.push(`${label} · setNode(declared): placed === ${JSON.stringify(declaredSet.placed)} — nothing is placeable`)
    if (JSON.stringify(declaredSet.order) !== JSON.stringify(F12_KEYS)) {
      breaks.push(`${label} · setNode(declared): order === ${JSON.stringify(declaredSet.order)} (expected the DECLARED keys ${JSON.stringify(F12_KEYS)})`)
    }
  }
  // 2 · setNode on an UNDECLARED key: still the 'unknown-key' refusal (F-1/F-3 —
  // the factory's absence never disables the contract's central refusal).
  const unknownSet = softResult('setNode(undeclared, node)', step('setNode(undeclared, node)', () => h === null ? undefined : h.setNode('nope', nodeEl('f12-nope'))))
  if (unknownSet !== null) {
    if (unknownSet.ok !== false) breaks.push(`${label} · setNode(undeclared): ok === true — an undeclared key is ALWAYS refused (F-1)`)
    if (unknownSet.refused.length !== 1 || unknownSet.refused[0].code !== 'unknown-key') {
      breaks.push(`${label} · setNode(undeclared): refused === ${JSON.stringify(unknownSet.refused)} (expected ONE 'unknown-key')`)
    }
    if (unknownSet.placed.length !== 0) breaks.push(`${label} · setNode(undeclared): placed is not []`)
  }
  // 3 · remove on a declared key — no refusal, no ownership ever existed here.
  const removed = softResult("remove('a')", step("remove('a')", () => h === null ? undefined : h.remove('a')))
  if (removed !== null) {
    if (removed.ok !== true) breaks.push(`${label} · remove('a'): ok === false — no node was ever placeable, so no ownership can be relinquished`)
    if (removed.refused.length !== 0) breaks.push(`${label} · remove('a'): refused is not [] — F-12 negative (i)`)
    if (removed.placed.length !== 0) breaks.push(`${label} · remove('a'): placed is not []`)
  }
  // 4 · setOrder — write-free: the projection is updated and reported.
  const ordered = softResult("setOrder(['b','a'])", step("setOrder(['b','a'])", () => h === null ? undefined : h.setOrder(['b', 'a'])))
  if (ordered !== null) {
    if (ordered.ok !== true || ordered.refused.length !== 0) breaks.push(`${label} · setOrder: it is write-free and NEVER refuses on a container-SOURCE state`)
    if (JSON.stringify(ordered.order) !== JSON.stringify(['b', 'a'])) {
      breaks.push(`${label} · setOrder: order === ${JSON.stringify(ordered.order)} — the projection must reflect setOrder even with no factory`)
    }
  }
  // 5 · render() — nothing is written and NOTHING is manufactured.
  const rendered = softResult('render()', step('render()', () => h === null ? undefined : h.render()))
  if (rendered !== null) {
    if (rendered.ok !== true || rendered.refused.length !== 0) breaks.push(`${label} · render(): ok/refused — the degradation refuses nothing (F-6 class)`)
    if (rendered.placed.length !== 0) breaks.push(`${label} · render(): placed is not []`)
    if (JSON.stringify(rendered.order) !== JSON.stringify(['b', 'a'])) breaks.push(`${label} · render(): order is no longer valid (${JSON.stringify(rendered.order)})`)
  }
  // 6 · keys() — a READ: the declared keys in the projected order, no ok/refused.
  const declaredRead = step('keys()', () => h === null ? undefined : h.keys())
  if (JSON.stringify(declaredRead) !== JSON.stringify(['b', 'a'])) {
    breaks.push(`${label} · keys(): ${brief(declaredRead)} — the DECLARED keys must survive an absent factory, in the projected order`)
  }
  // 7 · containerFor(k) — `null` BY VALUE for EVERY key: a declared key, a key a
  // broken factory was called for, and an undeclared key alike; never undefined.
  for (const k of ['a', 'b', 'nope']) {
    const value = step(`containerFor('${k}')`, () => h === null ? undefined : h.containerFor(k))
    if (value !== null) {
      breaks.push(`${label} · containerFor('${k}'): ${brief(value)} — F-12: null for EVERY key (never undefined, never a manufactured container)`)
    }
  }
  // 8 · dispose() — void, idempotent, retains nothing (I-5).
  const first = step('dispose()', () => h === null ? undefined : h.dispose())
  if (first !== undefined) breaks.push(`${label} · dispose(): returned ${brief(first)} — §2.1 declares void`)
  const second = step('dispose() (idempotent)', () => h === null ? undefined : h.dispose())
  if (second !== undefined) breaks.push(`${label} · the second dispose(): returned ${brief(second)} — idempotent`)
  const afterDispose = step('keys() after dispose()', () => h === null ? undefined : h.keys())
  if (JSON.stringify(afterDispose) !== JSON.stringify([])) {
    breaks.push(`${label} · keys() after dispose(): ${brief(afterDispose)} — I-5: no key, no container reference, no state survives`)
  }
  // NEGATIVE (i), over EVERY refusal observed in the drive (result lists AND the
  // injected listener — M-17).
  for (const ref of refusals) {
    if (ref.code === NOT_EMITTED_CODE) {
      breaks.push(`${label}: a refusal carries '${NOT_EMITTED_CODE}' — F-11: that member is DECLARED-BUT-NOT-EMITTED, and F-12 emits NO container-state refusal`)
    }
    if (ref.code === 'container-not-appendable') {
      breaks.push(`${label}: a refusal carries 'container-not-appendable' — wrong CLASS: the injected container is present and usable; the SOURCE is absent (F-6's class, never F-7's)`)
    }
    if (!EMITTED_CODES.includes(ref.code)) {
      breaks.push(`${label}: a refusal carries '${ref.code}', outside the three EMITTED members (§2.1)`)
    }
  }
  return { breaks, refusals }
}

// ===========================================================================
// F — §3.2 the documented fail-states / refusals
// ===========================================================================
describe('F — §3.2 the documented fail-states / refusals', () => {
  it("F-1 §3.2 — an UNDECLARED key is refused with 'unknown-key' and creates NOTHING", async () => {
    const { create } = await surface('F-1')
    const container = mountEl()
    const notified: SlotHostRefusal[] = []
    const h = create({ container, keys: ['a'], refuse: (r) => notified.push(r) })
    const n = nodeEl('n')
    h.render()
    const before = childCountOf(container)
    const beforeOrder = [...h.keys()]
    const r = asResult(drive(() => h.setNode('nope', n), "F-1 setNode('nope', n)"), "F-1 setNode('nope', n)")
    expect(r.ok, 'F-1: ok === false').toBe(false)
    expect(r.refused.length, 'F-1: ONE refusal').toBe(1)
    expect(r.refused[0].code, "F-1: code === 'unknown-key'").toBe('unknown-key')
    expect(r.refused[0].key, 'F-1: the EXACT key string as supplied').toBe('nope')
    expect(typeof r.refused[0].message, 'F-1: the refusal carries a message').toBe('string')
    expect(childCountOf(container), "F-1: NO container is created — the injected container's child count is unchanged").toBe(before)
    expect(h.keys(), 'F-1: order/keys() are unchanged').toEqual(beforeOrder)
    expect(r.placed, 'F-1: placed is unchanged').toEqual([])
    expect(childrenOf(container).length, 'F-1: the host never grew its own key set (the child count is still 1)').toBe(before)
    // The same through remove().
    const r2 = asResult(drive(() => h.remove('nope'), "F-1 remove('nope')"), "F-1 remove('nope')")
    expect(r2.ok, 'F-1 remove: ok === false').toBe(false)
    expect(r2.refused[0].code, "F-1 remove: code === 'unknown-key'").toBe('unknown-key')
    expect(r2.refused[0].key, 'F-1 remove: the exact key string').toBe('nope')
    expect(notified.length, 'F-1: refuse was notified once per refusal (two refusals ⇒ two notifications)').toBe(2)
  })

  it("F-2 §3.2 — a malformed node is refused with 'malformed-node' and leaves the PRIOR node as it was", async () => {
    const { create } = await surface('F-2')
    const container = mountEl()
    const h = create({ container, keys: ['a'] })
    const good = nodeEl('good')
    h.setNode('a', good)
    h.render()
    const malformed: Array<[string, unknown]> = [
      ['null', null],
      ['undefined', undefined],
      ['42', 42],
      ["'x'", 'x'],
      ['{}', {}],
      ['[]', []],
    ]
    for (const [id, value] of malformed) {
      const r = asResult(drive(() => h.setNode('a', value), `F-2 setNode('a', ${id})`), `F-2 setNode('a', ${id})`)
      expect(r.ok, `F-2 ${id}: ok === false`).toBe(false)
      expect(r.refused.length, `F-2 ${id}: ONE refusal`).toBe(1)
      expect(r.refused[0].code, `F-2 ${id}: code === 'malformed-node'`).toBe('malformed-node')
      expect(r.refused[0].key, `F-2 ${id}: the refusal reports the key as supplied`).toBe('a')
      expect(childrenOf(h.containerFor('a')), `F-2 ${id}: the key's PRIOR node is left as it was (a malformed input never removes a valid placement)`).toEqual([good])
      expect(r.removed, `F-2 ${id}: nothing was removed`).toEqual([])
      expect(r.placed, `F-2 ${id}: 'a' is still placed`).toEqual(['a'])
    }
  })

  it("F-3 §3.2 — a non-string/'' key: a DECLARED '' works, an undeclared non-string is 'unknown-key' with the VERBATIM key", async () => {
    const { create } = await surface('F-3')
    // Half 1 — a DECLARED '' is a valid key ('' is a string, and keys is a string array).
    const c1 = mountEl()
    const h1 = create({ container: c1, keys: [''] })
    const n = nodeEl('n')
    const ok = asResult(drive(() => h1.setNode('', n), "F-3 setNode('', n) on a DECLARED ''"), "F-3 setNode('', n) on a DECLARED ''")
    expect(ok.ok, "F-3: a declared '' is a valid key — ok === true").toBe(true)
    expect(ok.refused, "F-3: no refusal for a declared ''").toEqual([])
    expect(ok.order, "F-3: '' is projected in order, verbatim (never normalized away)").toEqual([''])
    expect(childrenOf(h1.containerFor('')), "F-3: the node is placed in the ''-keyed container").toEqual([n])
    // Half 2 — an UNDECLARED non-string / '' is refused, and the refusal's `key`
    // field holds the supplied value VERBATIM (§7a item 5: a 42-keyed refusal
    // whose key reads '42' FAILS this row).
    const h2 = create({ container: mountEl(), keys: ['a'] })
    const cases: Array<[string, unknown]> = [
      ['42', 42],
      ['null', null],
      ["'' (undeclared)", ''],
      ['undefined', undefined],
      ['{}', {}],
    ]
    for (const [id, value] of cases) {
      const r = asResult(
        drive(() => h2.setNode(value as unknown as SlotKey, n), `F-3 setNode(${id}, n)`),
        `F-3 setNode(${id}, n)`,
      )
      expect(r.ok, `F-3 ${id}: ok === false`).toBe(false)
      expect(r.refused.length, `F-3 ${id}: ONE refusal`).toBe(1)
      expect(r.refused[0].code, `F-3 ${id}: code === 'unknown-key'`).toBe('unknown-key')
      const expected = id === "'' (undeclared)" ? '' : value
      expect(r.refused[0].key, `F-3 ${id}: the refusal's key field holds the SUPPLIED value verbatim (no String(), no trim, no coercion)`).toBe(expected)
      expect(typeof r.refused[0].key, `F-3 ${id}: the field retains the supplied TYPE (never coerced to a string)`).toBe(typeof expected)
    }
    const rNull = asResult(drive(() => h2.remove(null as unknown as SlotKey), 'F-3 remove(null)'), 'F-3 remove(null)')
    expect(rNull.refused[0].code, "F-3 remove(null): 'unknown-key'").toBe('unknown-key')
    expect(rNull.refused[0].key, 'F-3 remove(null): the key field is null itself, never the string "null"').toBe(null)
  })

  it('F-4 §3.2 — an empty/malformed keys option never throws: an empty declared set, and every setNode is unknown-key', async () => {
    const { create } = await surface('F-4')
    // Malformed keys option: createSlotHost itself NEVER throws.
    const malformed: Array<[string, unknown]> = [
      ['null', null],
      ["'a,b'", 'a,b'],
      ['[1,2]', [1, 2]],
      ['42', 42],
      ['undefined', undefined],
    ]
    for (const [id, value] of malformed) {
      const h = drive(
        () => create({ container: mountEl(), keys: value as readonly SlotKey[] }),
        `F-4 createSlotHost({ keys: ${id} })`,
      ) as SlotHost
      expect(h.keys(), `F-4 keys: ${id} ⇒ an EMPTY declared set`).toEqual([])
      const r = asResult(drive(() => h.setNode('a', nodeEl('n')), `F-4 setNode('a', n) with keys: ${id}`), `F-4 setNode('a', n) with keys: ${id}`)
      expect(r.ok, `F-4 ${id}: the setNode is refused (an empty declared set) ⇒ ok === false`).toBe(false)
      expect(r.refused.length, `F-4 ${id}: ONE refusal`).toBe(1)
      expect(r.refused[0].code, `F-4 ${id}: code === 'unknown-key'`).toBe('unknown-key')
      expect(r.order, `F-4 ${id}: order is []`).toEqual([])
      expect(h.containerFor('a'), `F-4 ${id}: no container can exist`).toBe(null)
    }
    // keys: [] is the VALID form of the same state (M-8's control).
    const valid = create({ container: mountEl(), keys: [] })
    const rValid = asResult(drive(() => valid.setNode('a', nodeEl('n')), 'F-4 the valid keys: [] control'), 'F-4 the valid keys: [] control')
    expect(rValid.refused[0].code, "F-4: keys: [] is valid and behaves identically (code 'unknown-key')").toBe('unknown-key')
  })

  it('F-5 §3.2 — containerFor on an undeclared key returns null BY VALUE and is NOT a refusal', async () => {
    const { create } = await surface('F-5')
    const container = mountEl()
    const h = create({ container, keys: ['a'] })
    h.render()
    const beforeChildren = snapshotChildren(container)
    const value = drive(() => h.containerFor('nope'), "F-5 containerFor('nope')")
    expect(value, 'F-5: the value is null EXACTLY — undefined does NOT satisfy this row').toBe(null)
    expect(value === null, 'F-5: …and it is `=== null`, never merely falsy').toBe(true)
    expect(value === undefined, 'F-5: the read never returns undefined').toBe(false)
    expect(snapshotChildren(container), 'F-5: the read created nothing and changed nothing').toEqual(beforeChildren)
    // The asymmetry with F-1, pinned so a later pass does not "unify" them: the
    // READ does not refuse, while the WRITE under the same key does.
    const declared = h.containerFor('a')
    expect(declared !== null, "F-5: containerFor('a') on a DECLARED key is not null").toBe(true)
    const write = asResult(drive(() => h.setNode('nope', nodeEl('n')), "F-5 setNode('nope')"), "F-5 setNode('nope')")
    expect(write.ok, 'F-5: the WRITE (setNode) under the same undeclared key DOES refuse — ok === false').toBe(false)
    expect(write.refused[0].code, "F-5: …with code 'unknown-key'").toBe('unknown-key')
    expect(h.containerFor('nope'), 'F-5: and the read is STILL null afterwards').toBe(null)
  })

  it('F-6 §3.2 — a null/absent container is NOT a refusal (asymmetric with U-MOUNTGUARD, deliberately)', async () => {
    const { create } = await surface('F-6')
    for (const [id, v] of [
      ['absent (undefined)', undefined],
      ['null', null],
    ] as Array<[string, unknown]>) {
      const h = create({ container: v as unknown, keys: ['a'] })
      const n = nodeEl('n')
      const r = asResult(drive(() => h.setNode('a', n), `F-6 setNode with container ${id}`), `F-6 setNode with container ${id}`)
      expect(r.refused, `F-6 ${id}: refused is []`).toEqual([])
      expect(r.ok, `F-6 ${id}: ok === true — an absent container is a supported no-op, NOT a refusal`).toBe(true)
      expect(r.placed, `F-6 ${id}: placed is [] — the valid input is simply not placeable`).toEqual([])
      const rr = asResult(drive(() => h.render(), `F-6 render with container ${id}`), `F-6 render with container ${id}`)
      expect(rr.refused, `F-6 ${id}: render() refuses nothing either`).toEqual([])
      expect(rr.ok, `F-6 ${id}: render() is ok === true`).toBe(true)
      expect(h.containerFor('a'), `F-6 ${id}: no container was created (null, by value)`).toBe(null)
    }
    // The DISTINCTION the row exists for: the codes of F-6 and F-7 differ — the
    // absent container's shape produces NO refusal, while the unusable one's
    // code is `'container-not-appendable'`. (`F-11` then pins that the absent
    // shape never emits the DECLARED-BUT-NOT-EMITTED member either.)
    const absentCaseCode: string | null = null
    expect(absentCaseCode === 'container-not-appendable', 'F-6/F-7: the absent case is the no-op and the unusable case is the other code').toBe(false)
    const notEmittedAsWide: string = NOT_EMITTED_CODE
    expect(notEmittedAsWide, 'F-6/F-7: the declared-but-not-emitted member is the FOURTH member, NOT the unusable-container code').not.toBe('container-not-appendable')
  })

  it("F-7 §3.2 — a present-but-unusable container refuses 'container-not-appendable' PER THE PER-METHOD TABLE", async () => {
    const { create } = await surface('F-7')
    for (const [shapeId, bad] of [
      ['{} (no appendChild)', BAD_CONTAINER],
      ['{appendChild: 42}', BAD_APPEND_CHILD],
    ] as Array<[string, unknown]>) {
      const h = create({ container: bad as unknown, keys: ['a', 'b'] })
      // setNode — ONE refusal per attempted placement, ok === false, placed [].
      const rs = asResult(
        drive(() => h.setNode('a', nodeEl('n')), `F-7 setNode (${shapeId})`),
        `F-7 setNode (${shapeId})`,
      )
      expect(rs.ok, `F-7 setNode (${shapeId}): ok === false`).toBe(false)
      expect(rs.refused.length, `F-7 setNode (${shapeId}): ONE refusal per attempted placement`).toBe(1)
      expect(rs.refused[0].code, `F-7 setNode (${shapeId}): code === 'container-not-appendable'`).toBe('container-not-appendable')
      expect(rs.placed, `F-7 setNode (${shapeId}): placed is []`).toEqual([])
      // ⟶ THE CHILD COUNT ON THIS CLASS (remanded TEST-SIDE, `§3b`-3): **no
      // container is created AT ALL** here — `containerFor(k)` is `null` for
      // every key (the table's `containerFor` row) — so `I-10`'s `keys.length`
      // clause, scoped to a **SUCCESSFUL** `render()`, does NOT apply to this
      // shape. The falsifiable clause is ZERO host children: a host that
      // manufactured a container despite the unusable mount FAILS.
      expect(
        childCountOf(bad),
        `F-7 (${shapeId}): NO container is created on this class — the child count is 0, never keys.length (I-10 is scoped to a successful render())`,
      ).toBe(0)
      // render — ONE refusal per key the call ATTEMPTS to place: 'a' holds the
      // caller's node (the declaration stands — §2.4 item 1; the table's
      // `remove` row reads the same ownership), 'b' holds none — so ONE, never
      // one per DECLARED key (the remanded count).
      const rr = asResult(drive(() => h.render(), `F-7 render (${shapeId})`), `F-7 render (${shapeId})`)
      expect(rr.ok, `F-7 render (${shapeId}): ok === false`).toBe(false)
      expect(
        rr.refused.length,
        `F-7 render (${shapeId}): ONE refusal — "once per attempted node write" (§7a items 2/3), so one for the ONE key this call attempts to place, never one per declared key`,
      ).toBe(1)
      for (const ref of rr.refused) {
        expect(ref.code, `F-7 render (${shapeId}): every refusal is 'container-not-appendable'`).toBe('container-not-appendable')
      }
      expect(rr.placed, `F-7 render (${shapeId}): placed is []`).toEqual([])
      // remove on a DECLARED key with NO host-owned node — a NO-OP on this shape
      // too (the unifying clause: the call attempts no node write). Driven on 'b'
      // — 'a' DOES hold the caller's declaration, and that branch is the row's
      // second half below.
      const rNoop = asResult(drive(() => h.remove('b'), `F-7 remove('b') (${shapeId}) with nothing owned`), `F-7 remove('b') (${shapeId}) with nothing owned`)
      expect(rNoop.ok, `F-7 remove('b') (${shapeId}) with nothing owned: ok === true`).toBe(true)
      expect(rNoop.refused, `F-7 remove('b') (${shapeId}) with nothing owned: refused is []`).toEqual([])
      expect(h.keys(), `F-7 remove('b') (${shapeId}): the key stays DECLARED`).toEqual(['a', 'b'])
      // setOrder — RESULT-returning but WRITE-FREE: never refuses on either state.
      const ro = asResult(drive(() => h.setOrder(['b', 'a']), `F-7 setOrder (${shapeId})`), `F-7 setOrder (${shapeId})`)
      expect(ro.ok, `F-7 setOrder (${shapeId}): ok === true — setOrder attempts NO node write (§3.2's per-method table)`).toBe(true)
      expect(ro.refused, `F-7 setOrder (${shapeId}): refused is []`).toEqual([])
      expect(ro.order, `F-7 setOrder (${shapeId}): the projection IS updated and reported`).toEqual(['b', 'a'])
      // The READS return their declared shape, never refuse and never throw.
      expect(h.keys(), `F-7 keys() (${shapeId}): the declared keys in the projected order`).toEqual(['b', 'a'])
      for (const k of ['a', 'b', 'nope']) {
        expect(h.containerFor(k), `F-7 containerFor('${k}') (${shapeId}): null for EVERY key — never undefined`).toBe(null)
      }
      expect(drive(() => h.dispose(), `F-7 dispose() (${shapeId})`), `F-7 dispose() (${shapeId}): void, idempotent, no throw`).toBe(undefined)
    }
    // remove() on a key WHERE THE HOST OWNS A NODE on this shape.
    const h2 = create({ container: BAD_CONTAINER, keys: ['a'] })
    h2.setNode('a', nodeEl('n'))
    const owned = asResult(drive(() => h2.remove('a'), 'F-7 remove with something owned'), 'F-7 remove with something owned')
    expect(owned.ok, 'F-7 remove with something owned: ok === false (the operation relinquishes an ownership it cannot express)').toBe(false)
    expect(owned.refused.length, 'F-7 remove with something owned: ONE refusal').toBe(1)
    expect(owned.refused[0].code, "F-7 remove with something owned: code === 'container-not-appendable'").toBe('container-not-appendable')
  })

  it('F-8 §3.2 — a malformed classNameOf/attributesOf value is SKIPPED, the call is not failed, well-formed entries still apply', async () => {
    const { create } = await surface('F-8')
    const container = mountEl()
    const n = nodeEl('n')
    // A malformed attributes array: entries with no name, a non-object entry, a
    // non-primitive value — alongside well-formed entries.
    const h = create({
      container,
      keys: ['a'],
      attributesOf: () =>
        [
          { name: 'good-1', value: 'v1' },
          42,
          { value: 'nameless' },
          { name: 'bad-value', value: {} },
          { name: 'good-2', value: 7 },
          null,
        ] as unknown as readonly SlotAttribute[],
      classNameOf: () => 42 as unknown as string,
    })
    const r = asResult(drive(() => h.setNode('a', n), 'F-8 setNode(a, n)'), 'F-8 setNode(a, n)')
    expect(r.ok, 'F-8: ok is NOT forced false — attribute application is best-effort per entry').toBe(true)
    expect(r.refused, 'F-8: no refusal is invented for a malformed attribute entry').toEqual([])
    expect(n.attrs['good-1'], 'F-8: the well-formed entry is still applied').toBe('v1')
    expect(n.attrs['good-2'], 'F-8: the second well-formed entry is applied too (its numeric value verbatim as the shim stores it)').toBe('7')
    expect(hasOwn.call(n.attrs, 'bad-value'), 'F-8: the malformed entry is SKIPPED').toBe(false)
    expect(hasOwn.call(n.attrs, 'undefined'), 'F-8: a nameless entry is skipped, never stored under "undefined"').toBe(false)
    expect(childrenOf(h.containerFor('a')), 'F-8: the node is still placed').toEqual([n])
  })

  it('F-9 §3.2 — a node the caller DETACHED, then removed: no throw, no dangling ownership, and removed CONTAINS it (amend-ED)', async () => {
    const { create } = await surface('F-9')
    const container = mountEl()
    const h = create({ container, keys: ['a', 'b'] })
    const n = nodeEl('n')
    const other = nodeEl('other')
    h.setNode('a', n)
    h.setNode('b', other)
    h.render()
    const cA = h.containerFor('a')
    // The CALLER detaches its own node from the host's container.
    n.remove()
    expect(childrenOf(cA), 'F-9: the caller detached n, so the container is empty').toEqual([])
    const r = asResult(drive(() => h.remove('a'), "F-9 remove('a')"), "F-9 remove('a')")
    expect(r.ok, 'F-9: no throw (and nothing is refused — the removal is legal)').toBe(true)
    expect(r.refused, 'F-9: refused is []').toEqual([])
    // §2.1's `removed` doc string + §2.4 items 1–2 + §7a item 6: the node
    // detached by the caller is STILL a node the host placed, so the remove call
    // — the call that ends the host's ownership — reports it.
    expect(r.removed.length, 'F-9: removed CONTAINS n (the membership IS pinned — §7a item 6)').toBe(1)
    expect(r.removed[0], 'F-9: …by reference (toBe)').toBe(n)
    expect(containsRef(r.removed, n), 'F-9: n appears in removed by reference').toBe(true)
    expect(r.placed, "F-9: the key is no longer placed (and 'b' still is)").toEqual(['b'])
    expect(h.keys(), "F-9: keys() still shows 'a' as declared (M-12: no dangling ownership)").toEqual(['a', 'b'])
    expect(h.containerFor('a'), "F-9: 'a' still owns its container").toBe(cA)
    expect(childrenOf(cA), 'F-9: and the container stays empty').toEqual([])
    expect(containsRef(r.removed, other), 'F-9: the OTHER node is not reported — the host reports only what it owned under that key').toBe(false)
  })

  it('F-10 §3.2 (AMENDED, §7a item 4) — each of the FOUR injected callbacks that throws is caught with its NAMED SAFE DEFAULT', async () => {
    const { create } = await surface('F-10')
    // ── seam 1 · orderOf ⇒ the supplied `keys` order (the omitted-orderOf fallback)
    const c1 = mountEl()
    let orderOfCalls = 0
    const h1 = create({
      container: c1,
      keys: ['a', 'b', 'c'],
      orderOf: () => {
        orderOfCalls += 1
        throw new Error('orderOf boom')
      },
    })
    const r1 = asResult(drive(() => h1.render(), 'F-10 orderOf throws — render()'), 'F-10 orderOf throws — render()')
    expect(orderOfCalls, 'F-10 orderOf: the injected policy WAS called (the seam is real)').toBeGreaterThan(0)
    expect(r1.ok, "F-10 orderOf: no refusal is invented for a caller-code failure — ok === true").toBe(true)
    expect(r1.refused, 'F-10 orderOf: refused is []').toEqual([])
    expect(r1.order, 'F-10 orderOf: the SAFE DEFAULT is the supplied keys order (§2.5 item 1)').toEqual(['a', 'b', 'c'])
    expect(r1.order.length, 'F-10 orderOf: each declared key once (I-2)').toBe(3)
    expect(r1.placed, 'F-10 orderOf: placed/ownership is unaffected').toEqual([])
    expect(childrenOf(c1), 'F-10 orderOf: the containers are still created (the throw is not a placement failure)').toHaveLength(3)
    const r1b = asResult(drive(() => h1.setNode('a', nodeEl('n')), 'F-10 orderOf throws — setNode()'), 'F-10 orderOf throws — setNode()')
    expect(r1b.ok, 'F-10 orderOf: a later call still returns its declared result').toBe(true)
    expect(r1b.placed, 'F-10 orderOf: the node is placed (the projection default does not block placement)').toEqual(['a'])
    // ── seam 2 · classNameOf ⇒ NO class write for that node (M-11's null rule)
    const n2 = nodeEl('n2')
    n2.className = 'pre-existing'
    const h2 = create({
      container: mountEl(),
      keys: ['a'],
      classNameOf: () => {
        throw new Error('classNameOf boom')
      },
    })
    const r2 = asResult(drive(() => h2.setNode('a', n2), 'F-10 classNameOf throws'), 'F-10 classNameOf throws')
    expect(r2.ok, 'F-10 classNameOf: no refusal is invented — ok === true').toBe(true)
    expect(r2.refused, 'F-10 classNameOf: refused is []').toEqual([])
    expect(n2.className, "F-10 classNameOf: the node's class field is unchanged (no empty class written)").toBe('pre-existing')
    expect(childrenOf(h2.containerFor('a')), 'F-10 classNameOf: the node is still placed').toEqual([n2])
    // ── seam 3 · attributesOf ⇒ NO attribute write for that node
    const n3 = nodeEl('n3')
    n3.setAttribute('data-before', 'yes')
    const h3 = create({
      container: mountEl(),
      keys: ['a'],
      attributesOf: () => {
        throw new Error('attributesOf boom')
      },
    })
    const r3 = asResult(drive(() => h3.setNode('a', n3), 'F-10 attributesOf throws'), 'F-10 attributesOf throws')
    expect(r3.ok, 'F-10 attributesOf: no refusal — ok === true').toBe(true)
    expect(Object.keys(n3.attrs).sort(), 'F-10 attributesOf: the attribute-name set is UNCHANGED').toEqual(['data-before'])
    expect(childrenOf(h3.containerFor('a')), 'F-10 attributesOf: the node is still placed').toEqual([n3])
    // ── seam 4 · refuse ⇒ SWALLOWED, with the refusal ALREADY recorded
    const notified: SlotHostRefusal[] = []
    const h4 = create({
      container: mountEl(),
      keys: ['a'],
      refuse: (refusal) => {
        notified.push(refusal)
        throw new Error('refuse boom')
      },
    })
    const r4 = asResult(drive(() => h4.setNode('nope', nodeEl('x')), "F-10 refuse throws — setNode('nope')"), "F-10 refuse throws — setNode('nope')")
    expect(notified.length, 'F-10 refuse: the listener was ATTEMPTED exactly once per refusal').toBe(1)
    expect(r4.refused.length, 'F-10 refuse: the refusal IS present in the returned refused list — already recorded').toBe(1)
    expect(r4.refused[0].code, "F-10 refuse: …with its own code ('unknown-key'), not one invented for the callback throw").toBe('unknown-key')
    expect(r4.ok, 'F-10 refuse: the outcome is unchanged — ok === false').toBe(false)
    expect(notified[0], 'F-10 refuse: the notified object equals the recorded refusal (order preserved)').toEqual(r4.refused[0])
    const after = asResult(drive(() => h4.setNode('a', nodeEl('n')), 'F-10 refuse: a later call still returns its declared result'), 'F-10 refuse: a later call still returns its declared result')
    expect(after.ok, 'F-10 refuse: the host is not left in a state a later call cannot read').toBe(true)
    expect(after.refused, 'F-10 refuse: and nothing was poisoned').toEqual([])
  })

  it("F-11 §3.2 (the negative row) — 'no-container' is NEVER emitted, and the same enumeration DOES observe the other three", async () => {
    const { create, bare } = await surface('F-11')
    const allRefusals: SlotHostRefusal[] = []
    const noThrow: string[] = []
    const driveAll = (label: string, fn: () => unknown): unknown => {
      const d = tryDrive(label, fn)
      if (d.thrown !== null) noThrow.push(`${label}: ${describeThrown(d.thrown)}`)
      return d.value
    }
    // (i) the deterministic table of I-8's drives, each with a `refuse` listener
    //     attached so both surfaces of the domain are read (M-17).
    const makeHost = (config: () => SlotHostOptions) =>
      create({ ...config(), refuse: (r) => allRefusals.push(r) })
    const drives: Array<[string, () => unknown]> = [
      ['F-1 unknown key via setNode', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setNode('nope', nodeEl('n'))],
      ['F-1 unknown key via remove', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).remove('nope')],
      ['F-2 malformed node (null)', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setNode('a', null)],
      ['F-2 malformed node (42)', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setNode('a', 42)],
      ['F-3 non-string key (42)', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setNode(42 as unknown as SlotKey, nodeEl('n'))],
      ["F-3 '' on a declared ''-keyed host (valid, no refusal)", () => makeHost(() => ({ container: mountEl(), keys: [''] })).setNode('', nodeEl('n'))],
      ['F-4 malformed keys: null', () => makeHost(() => ({ container: mountEl(), keys: null as unknown as readonly SlotKey[] })).setNode('a', nodeEl('n'))],
      ['F-4 malformed keys: [1,2]', () => makeHost(() => ({ container: mountEl(), keys: [1, 2] as unknown as readonly SlotKey[] })).setNode('a', nodeEl('n'))],
      ['F-6 absent container — a no-op, never a refusal', () => makeHost(() => ({ container: null, keys: ['a'] })).setNode('a', nodeEl('n'))],
      ['F-6 absent container — render()', () => makeHost(() => ({ container: null, keys: ['a'] })).render()],
      ['M-14 container: {}', () => makeHost(() => ({ container: {}, keys: ['a'] })).setNode('a', nodeEl('n'))],
      ['M-14 container: 42', () => makeHost(() => ({ container: 42, keys: ['a'] })).setNode('a', nodeEl('n'))],
      ['F-7 unusable container (no appendChild) — setNode', () => makeHost(() => ({ container: BAD_CONTAINER, keys: ['a'] })).setNode('a', nodeEl('n'))],
      ['F-7 unusable container (appendChild: 42) — render', () => makeHost(() => ({ container: BAD_APPEND_CHILD, keys: ['a'] })).render()],
      ['F-7 remove where the host owns a node', () => {
        const h = makeHost(() => ({ container: BAD_CONTAINER, keys: ['a'] }))
        h.setNode('a', nodeEl('n'))
        return h.remove('a')
      }],
      ['M-1 a valid configuration as the CONTROL (ok, no refusal)', () => makeHost(() => ({ container: mountEl(), keys: ['a', 'b'] })).render()],
      ['M-5 a valid placement as the CONTROL', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setNode('a', nodeEl('n'))],
      ['M-8 keys: [] as the CONTROL', () => makeHost(() => ({ container: mountEl(), keys: [] })).render()],
      ['M-15 setOrder with undeclared/duplicate keys (ignored, never refused)', () => makeHost(() => ({ container: mountEl(), keys: ['a'] })).setOrder(['a', 'a', 'nope'])],
      ['M-16 two render() cycles', () => {
        const h = makeHost(() => ({ container: mountEl(), keys: ['a'] }))
        h.render()
        return h.render()
      }],
    ]
    const seenFromResults: SlotHostRefusal[] = []
    for (const [label, fn] of drives) {
      const value = driveAll(label, fn)
      if (value !== null && typeof value === 'object' && Array.isArray((value as SlotHostResult).refused)) {
        seenFromResults.push(...(value as SlotHostResult).refused)
      }
    }
    // (ii) EVERY shape of P-SH-TP-1's 20-shape pool under the pinned-seed draws.
    for (let i = 0; i < TP_DRAW_INDICES.length; i += 1) {
      const shape = TP_POOL[TP_DRAW_INDICES[i]]
      const value = driveAll(`TP draw ${i + 1} (${shape.id})`, () => {
        const h = makeHost(shape.config)
        return shape.call(h)
      })
      if (value !== null && typeof value === 'object' && Array.isArray((value as SlotHostResult).refused)) {
        seenFromResults.push(...(value as SlotHostResult).refused)
      }
    }
    // (iii) ⟶ ADDED 2026-09-27 (the architect's option-(a) ruling on the
    // container source): **`F-12`'s five factory drives are INSIDE this
    // negative's enumeration** — "plus `F-12`'s five factory drives" is the
    // amended F-11 trigger. They are driven through the module's BARE
    // `createSlotHost` so each configuration supplies (or omits) the factory
    // itself; both surfaces of the domain are read (`refuse` attached, M-17).
    for (const cfg of F12_CONFIGS) {
      const value = driveAll(`F-12 ${cfg.id} · setNode(declared) + render()`, () => {
        const h = bare({ ...f12Options(mountEl(), cfg), refuse: (r) => allRefusals.push(r) })
        h.setNode('a', nodeEl('f12-n'))
        return h.render()
      })
      if (value !== null && typeof value === 'object' && Array.isArray((value as SlotHostResult).refused)) {
        seenFromResults.push(...(value as SlotHostResult).refused)
      }
    }
    expect(noThrow, 'F-11: no call in the enumeration throws (the negative row is asserted over completed calls)').toEqual([])
    const everything = refusalsSeen({ ok: true, order: [], placed: [], removed: [], refused: seenFromResults }, allRefusals)
    expect(everything.length, 'F-11: the enumeration OBSERVED refusals (non-vacuous — a host that emitted nothing at all FAILS the control half below)').toBeGreaterThan(0)
    expect(
      everything.filter((r) => r.code === NOT_EMITTED_CODE).map((r) => brief(r.key)),
      "F-11: NO call ever produces a refusal whose code === 'no-container' (the declared-but-not-emitted member)",
    ).toEqual([])
    const outside = everything.filter((r) => !EMITTED_CODES.includes(r.code))
    expect(outside.map((r) => `${String(r.code)} for ${brief(r.key)}`), 'F-11: no fifth code and no not-emitted member appears anywhere').toEqual([])
    // THE CONTROL HALF — the same enumeration DOES observe the other three codes.
    const codes = new Set(everything.map((r) => r.code))
    for (const code of EMITTED_CODES) {
      expect(codes.has(code), `F-11 control: the enumeration DOES observe '${code}' (a host that emitted nothing fails this row)`).toBe(true)
    }
  })

  it('F-12 §3.2 (NEW — the container-source seam) — the five factory drives × the seven methods: the F-6-class degradation, its TWO negatives, and the no-realm control', async () => {
    const { bare } = await surface('F-12')
    // ── THE FIVE DRIVES (`F-12`'s trigger), each through ALL SEVEN METHODS ────
    // ⟶ ADDED 2026-09-27 (the architect's option-(a) ruling on the container
    // source; appended after `F-11`, renumbering nothing). `F-12`: the container
    // source is absent (drive (1) omitted · (2) `undefined`) or
    // present-but-broken ((3) not callable · (4) throwing · (5) returning an
    // unusable value), and EVERY one of them is the EXISTING `F-6`-class
    // degradation — the SAME behaviour for all five, with a VALID injected mount
    // so the mount is not the reason nothing is placed.
    const breaks: string[] = []
    let refusalsInsideTheDrives = 0
    for (const cfg of F12_CONFIGS) {
      const d = f12Drive(bare, cfg, `F-12 ${cfg.id}`)
      refusalsInsideTheDrives += d.refusals.length
      breaks.push(...d.breaks)
    }
    // The negative is not vacuous: the drives DO observe refusals — the
    // `'unknown-key'` refusal of the undeclared-key step, which the factory's
    // absence never disables (F-1/F-3) — and every one of them is in the EMITTED
    // domain (checked inside each drive).
    expect(
      refusalsInsideTheDrives,
      'F-12: the enumeration observed refusals only inside the EMITTED domain (the undeclared-key step is the non-vacuity control)',
    ).toBeGreaterThan(0)
    // ── THE NO-REALM CONTROL (`§5.2`'s harness clause; `F-12`'s negative (ii)) ─
    // The harness's own container supply is the INJECTED factory (`mountEl()`
    // needs no realm), so this control DELETES the ambient global and drives the
    // seam with the realm ABSENT: a host whose container source is still the
    // realm cannot place anything, and a host that manufactured a container by
    // any OTHER means fails the reference/count halves. This is the drive that
    // shows **the harness can run without the shim global installed** where the
    // contract allows it. The global is restored in a `finally`.
    const realm = globalThis as { document?: unknown }
    const savedRealm = realm.document
    const controlBreaks: string[] = []
    try {
      delete realm.document
      const mount = mountEl()
      const factoryEl = mountEl()
      const controlNode = nodeEl('f12-control-node')
      const h = bare({ container: mount, keys: ['a'], containerFactory: () => factoryEl })
      const placed = h.setNode('a', controlNode)
      if (placed.ok !== true || placed.refused.length !== 0) {
        controlBreaks.push(`setNode refused something (${JSON.stringify(placed.refused)}) — the factory is the SOLE source and no realm exists`)
      }
      if (JSON.stringify(placed.placed) !== JSON.stringify(['a'])) {
        controlBreaks.push(`placed === ${JSON.stringify(placed.placed)} (expected ['a']) — with the realm absent the INJECTED factory must still supply the container`)
      }
      if (h.containerFor('a') !== factoryEl) {
        controlBreaks.push("containerFor('a') is NOT the injected factory's value — a host reaching for the realm (or any other source) FAILS this control")
      }
      if (!containsRef(childrenOf(mount), factoryEl)) {
        controlBreaks.push("the factory's container is not projected onto the injected mount")
      }
      if (childCountOf(mount) !== 1) {
        controlBreaks.push(`the injected container holds ${childCountOf(mount)} host children (expected exactly 1 — the factory's)`)
      }
      if (!containsRef(childrenOf(factoryEl), controlNode)) {
        controlBreaks.push("the caller's node is not in the factory-supplied container BY REFERENCE")
      }
    } catch (e) {
      controlBreaks.push(`the no-realm control THREW ${describeThrown(e)} — §2.1's totality universal`)
    } finally {
      realm.document = savedRealm
    }
    // ── THE COMBINED VERDICT: the drives' breaks AND the control's ───────────
    // Reported TOGETHER so the failure names both halves: a host without the
    // seam breaks the five drives (it manufactures containers from the realm and
    // places the valid node) AND the control (with the realm absent it places
    // nothing at all).
    const reported = [...breaks.slice(0, 6), ...controlBreaks]
    expect(
      reported,
      `F-12 (the F-6-class degradation for all five factory drives — negative (i) NO container-state refusal, ` +
        `negative (ii) NO container manufactured by any other means — plus the no-realm control of §5.2's harness clause): ` +
        `${breaks.length} break(s) across the five drives; ${controlBreaks.length} in the no-realm control: ${JSON.stringify(reported)}`,
    ).toEqual([])
    expect(realm.document, 'F-12: the ambient global is restored — the control leaves no trace for the rows that follow').toBe(savedRealm)
  })
})

// ===========================================================================
// S — §2.1's surface + §2.2's prohibitions + §4.4's `S-1`..`S-7` outcomes as
// STATIC rows over the module file. `S-7`'s "zero graph ops on order change" half
// is HERE (static) and is NEVER asserted from the node suite (`§2.5` item 3,
// `§7a` item 9).
// ===========================================================================
describe('S — §2.1 the surface + §2.2/§4.4 the static rows over the module', () => {
  it('S-1 §2.1 — the runtime exports are exactly the one function, and the SOURCE declares exactly the SEVEN names', async () => {
    const { mod } = await surface('S-1 §2.1 the seven-export surface')
    expect(
      Object.keys(mod).sort(),
      "§2.1: the module's RUNTIME exports are exactly ['createSlotHost'] — the six other exports are types (erased at run time)",
    ).toEqual(['createSlotHost'])
    const src = moduleSource('S-1 §2.1 the seven-export surface')
    for (const [name, kind] of DECLARED_EXPORTS) {
      expect(src.includes(`export ${kind} ${name}`), `§2.1: the module declares 'export ${kind} ${name}'`).toBe(true)
    }
    const exportLines = staticHits(src, /^export\s/)
    expect(exportLines, `§2.1: SEVEN exports, and NOTHING ELSE — found ${exportLines.length}: ${JSON.stringify(exportLines)}`).toHaveLength(7)
    expect(
      /export\s+type\s+SlotKey\s*=\s*string\b/.test(src),
      '§2.1 / §2.2 prohibition 1: `SlotKey` is an OPEN alias `type SlotKey = string`, not a closed union — a consumer value can never be a member',
    ).toBe(true)
    expect(
      /readonly\s+key\s*:\s*unknown\b/.test(src),
      '§2.1 / §7a item 5: `SlotHostRefusal.key` is declared `unknown` (the widened field that holds the supplied value verbatim)',
    ).toBe(true)
    for (const code of DECLARED_CODES) {
      expect(src.includes(`'${code}'`), `§2.1: the declared code literal '${code}' is present in the four-member union`).toBe(true)
    }
  })

  it('S-2 §2.2 prohibition 1 (STRENGTHENED 2026-09-27) — NO consumer vocabulary anywhere, AND no ASSEMBLED/computed member lookup', () => {
    const raw = moduleSource('S-2 §2.2 prohibition 1')
    const hits = staticHits(raw, /(\bzones?\b|\bpanes?\b|\btabs?\b|\bregions?\b|is-empty|is-minimized|is-revealed|\bstatus\b)/i)
    expect(
      hits,
      `§2.2 prohibition 1 / H-r15's named hazard — zone/pane/tab/region/is-empty/is-minimized/is-revealed/status must not occur ANYWHERE in the module, a comment included (a comment naming one is a re-entry signal): ${JSON.stringify(
        hits,
      )}`,
    ).toEqual([])
    expect(staticHits(raw, /\bdocument\b/), '§2.2 prohibition 1 / §1: no `document` reference anywhere').toEqual([])
    expect(staticHits(raw, /['"](empty|minimized|revealed)['"]/), '§2.2 prohibition 1: no mirror-class literal').toEqual([])
    // ⟶ RE-SCOPED AND STRENGTHENED 2026-09-27 (`§4.4 S-2`'s amendment; the
    // architect's option-(a) ruling on the container source, `ADV-SH-1`, HIGH):
    // **a property name assembled from literals is the SAME violation as the
    // literal token.** `globalThis['doc' + 'ument'].createElement('div')` did the
    // banned thing while defeating the `/document/i` scan above, so the scan now
    // rejects the ASSEMBLY (and the two neighbouring construction forms) too.
    // This row must FAIL on that shape — a token-only scan is an INCOMPLETE row.
    expectNoStaticHits(
      raw,
      [
        {
          what: "an ASSEMBLED property name (a bracketed member lookup built from string literals — the exact `globalThis['doc' + 'ument']` evasion)",
          re: /\[\s*(?:'[^'\n]*'|"[^"\n]*")\s*\+/,
        },
        { what: 'a TEMPLATE-LITERAL property name (an assembled member lookup)', re: /\[\s*`/ },
        { what: 'an eval/Function-constructed access (§2.2 prohibition 1 tightened: the same violation as the token)', re: /\b(eval|Function)\s*\(/ },
      ],
      'S-2 §2.2 prohibition 1 (the anti-assembly clause)',
    )
  })

  it('S-3 §2.2 prohibition 2 — the host authors NO content: no text/attribute/class/style write, no default node, no publish', () => {
    const code = stripComments(moduleSource('S-3 §2.2 prohibition 2'))
    expectNoStaticHits(
      code,
      [
        { what: 'a textContent write (§2.2 prohibition 2)', re: /\.textContent\s*=/ },
        { what: 'a className/classList write of the host\'s own (§1 item 4: only the INJECTED classNameOf value is applied)', re: /\bclassList\b/ },
        { what: 'a hard-coded class VALUE literal applied by the host (§2.2 prohibition 2: zero class value literal)', re: /\.className\s*=\s*['"]/ },
        { what: 'a style write', re: /\.style\s*(\.|\[|=)/ },
        { what: 'a role/aria attribute literal (no ARIA authorship)', re: /['"](role|aria-[a-z-]+)['"]/ },
        { what: 'a publish-shaped export (ruling 1: the publisher half is DECLINED)', re: /\b(publish|setText|defaultLabel)\b/ },
        { what: 'innerHTML/outerHTML authorship', re: /\b(inner|outer)HTML\b/ },
        { what: 'cloneNode (the host never clones a caller node — §2.4 item 4)', re: /\bcloneNode\b/ },
        // ⟶ ADDED 2026-09-27 (the same ruling; `§2.2` prohibition 2's static half
        // gains the source-of-containers negative): the host creates NO element of
        // its own — the containers come FROM the injected `containerFactory` — so
        // ANY element construction in the module is a violation.
        { what: 'an element construction of the host\'s own (the containers come from the injected factory only)', re: /\b(createElement|createElementNS|createTextNode|new\s+ShimElement)\b/ },
      ],
      'S-3 §2.2 prohibition 2',
    )
  })

  it('S-4 §2.2 prohibitions 4/6 + §1 (STRENGTHENED 2026-09-27) — no store, no persistence, no module-level mutable state, no ambient global AND no assembled/computed lookup', () => {
    const code = stripComments(moduleSource('S-4 §2.2 prohibition 4/6'))
    expectNoStaticHits(
      code,
      [
        { what: 'localStorage/sessionStorage/indexedDB (persistence)', re: /\b(localStorage|sessionStorage|indexedDB)\b/ },
        { what: 'a WeakMap/WeakSet registry keyed by the container', re: /\b(WeakMap|WeakSet)\b/ },
        { what: 'a module-level Map/Set registry (mutable module state)', re: /^(?:export\s+)?const\s+[\w$]+\s*(?::[^=]+)?=\s*new\s+(Map|Set|WeakMap|WeakSet)\b/m },
        { what: 'a module-level `let`/`var` (no state survives the host instance)', re: /^(?:export\s+)?(?:let|var)\s/m },
        { what: 'randomness (the mechanism is deterministic)', re: /\bMath\.random\b/ },
        { what: 'a network/IPC surface', re: /\b(fetch|XMLHttpRequest|ipcRenderer|ipcMain|require\s*\()\b/ },
        {
          what:
            'an ambient-global / realm reference (§1, the Layer declaration anchor 3, §2.2 prohibition 1: the container is INJECTED — `globalThis`/`window` are banned outright, an aliased or re-derived global with them)',
          re: /\b(document|window|globalThis|global|self|matchMedia|getElementById|activeElement|getComputedStyle|querySelector|querySelectorAll|closest)\b/,
        },
        // ⟶ RE-SCOPED AND STRENGTHENED 2026-09-27 (`§4.4 S-4`'s amendment, the
        // same ruling): the ambient-vocabulary scan must reject the
        // ASSEMBLED/COMPUTED member lookup too — that is precisely the shape that
        // evaded this word-boundary list. No rejection above is dropped.
        { what: 'an ASSEMBLED property name (a bracketed member lookup built from string literals)', re: /\[\s*(?:'[^'\n]*'|"[^"\n]*")\s*\+/ },
        { what: 'a TEMPLATE-LITERAL property name (an assembled member lookup)', re: /\[\s*`/ },
        { what: 'an eval/Function-constructed access', re: /\b(eval|Function)\s*\(/ },
      ],
      'S-4 §2.2 prohibition 4/6',
    )
  })

  it('S-5 §2.2 prohibition 5 + §1 (FIXED 2026-09-27, ADV-SH-5) — the five-seam negative asserted against the LIVE sources of truth: `VALID_GROUPS`, `ALL_TOOLS`, `ALL_RESOURCES`, `MUTATING_METHODS`, `RpcMethod`', async () => {
    const code = stripComments(moduleSource('S-5 §2.2 prohibition 5'))
    expectNoStaticHits(
      code,
      [
        { what: 'an import from src/main/** (the MCP/security seam)', re: /from\s+['"][^'"]*\/main\// },
        { what: 'an import from src/renderer/**', re: /from\s+['"][^'"]*\/renderer\// },
        { what: 'an import from shared/types (the RpcMethod surface)', re: /from\s+['"][^'"]*shared\/types/ },
        { what: 'the electron module', re: /from\s+['"]electron['"]/ },
        { what: 'provident-ssr (the engine)', re: /from\s+['"]provident-ssr['"]/ },
        { what: 'a tool/resource/group registration', re: /\b(registerTool|registerResource|VALID_GROUPS|MUTATING_METHODS|RpcMethod)\b/ },
      ],
      'S-5 §2.2 prohibition 5',
    )
    // =======================================================================
    // ⟶ FIXED 2026-09-27 (`§3b`-1 `ADV-SH-5` / the `S-5` red row; the
    // brittle line-regex over `tests/engine-pin-version.test.ts` — which counted
    // GROUP LITERALS that file merely holds inline, and read 0 on this tree — is
    // GONE). The prohibition's real assertion is unchanged: **no new group, tool,
    // resource, `RpcMethod` member or `MUTATING_METHODS` entry**, `ALL_TOOLS`
    // stays `21` — and it is now asserted against each seam's OWN source of truth,
    // read (never edited: `§5.1` puts `src/main/**` out of this unit's diff
    // scope). `VALID_GROUPS` is module-local in `src/main/security.ts` (not
    // exported), so the live set is read from its declaration and then probed
    // BEHAVIOURALLY through the exported `applyPatch`, which accepts exactly the
    // live members.
    // =======================================================================
    const PINNED_GROUPS: readonly string[] = ['read', 'dispatch', 'graph', 'code', 'module']
    expect([...PINNED_GROUPS].sort(), 'S-5: the pinned group set of §1/§2.2 is the five the spec names').toEqual([
      'code',
      'dispatch',
      'graph',
      'module',
      'read',
    ])
    const securitySrc = readFileSync(new URL('../src/main/security.ts', import.meta.url), 'utf8')
    const groupsDecl = /const\s+VALID_GROUPS\s*:[^=]*=\s*new\s+Set\(\s*\[([^\]]*)\]\s*\)/.exec(securitySrc)
    expect(
      groupsDecl !== null,
      'S-5: `VALID_GROUPS` is declared in src/main/security.ts — the row asserts the LIVE set, never a literal count inside a sibling test file',
    ).toBe(true)
    const liveGroups = (groupsDecl?.[1].match(/'[^']*'|"[^"]*"/g) ?? []).map((s) => s.slice(1, -1)).sort()
    expect(
      liveGroups,
      "S-5 / §2.2 prohibition 5 / §1's five-seam negative: the LIVE `VALID_GROUPS` set (src/main/security.ts) is EXACTLY the pinned five — a NEW group member FAILS this row",
    ).toEqual([...PINNED_GROUPS].sort())
    const security = (await import(/* @vite-ignore */ ['..', 'src', 'main', 'security.js'].join('/'))) as {
      applyPatch: (
        config: { token: string | null; enabled: string[] },
        patch: { groups?: string[]; disable?: string[] },
      ) => { token: string | null; enabled: string[] }
      groupForTool: (toolName: string) => string | null
    }
    for (const group of PINNED_GROUPS) {
      const patched = security.applyPatch({ token: null, enabled: [] }, { groups: [group] })
      expect(patched.enabled, `S-5: the LIVE gate ACCEPTS the pinned group '${group}' (the set is read behaviourally, not just textually)`).toEqual([group])
    }
    const probed = security.applyPatch({ token: null, enabled: [] }, { groups: ['no-such-group-probe'] })
    expect(probed.enabled, 'S-5: a group OUTSIDE the live set is REJECTED — the probe above is not vacuous').toEqual([])
    // The tool seam: `ALL_TOOLS` reads 22 (`N-18`: `provident.focus` joins the
    // live listing in the SAME COMMIT — this site's own edit bar names the sibling
    // census file as one it may not edit, which is why the obligation lands here),
    // and every tool still resolves into the pinned group domain (a new tool bound
    // to a NEW group fails both halves).
    const mcp = (await import(/* @vite-ignore */ ['..', 'src', 'main', 'mcp-server.js'].join('/'))) as {
      ProvidentMcpServer: {
        ALL_TOOLS: string[]
        ALL_RESOURCES: Array<{ uri?: string; uriTemplate?: string }>
      }
    }
    const allTools = mcp.ProvidentMcpServer.ALL_TOOLS
    expect(Array.isArray(allTools), 'S-5: the LIVE `ALL_TOOLS` list is reachable').toBe(true)
    expect(allTools.length, 'S-5 / §2.2 prohibition 5 / `N-18`: `ALL_TOOLS` reads 22 — the live listing, read from its OWN live module').toBe(22)
    for (const tool of allTools) {
      const group = security.groupForTool(tool)
      expect(
        PINNED_GROUPS.includes(group as string),
        `S-5: the live tool '${tool}' resolves into the pinned group domain (got ${String(group)}) — no tool may acquire a NEW group`,
      ).toBe(true)
    }
    // The resource seam: no new resource member.
    const allResources = mcp.ProvidentMcpServer.ALL_RESOURCES
    expect(allResources.length, 'S-5 / §1\'s five-seam negative: the resource seam gains NO member').toBe(3)
    expect(
      allResources.map((r) => r.uri ?? r.uriTemplate).sort(),
      'S-5: the live resources are exactly the pinned three',
    ).toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
    // The renderer's mutating-method seam (module-local, so read from its source).
    const rendererSrc = readFileSync(new URL('../src/renderer/renderer.ts', import.meta.url), 'utf8')
    const mutDecl = /const\s+MUTATING_METHODS\s*=\s*new\s+Set\(\s*\[([^\]]*)\]\s*\)/.exec(rendererSrc)
    expect(mutDecl !== null, 'S-5: `MUTATING_METHODS` is declared in src/renderer/renderer.ts').toBe(true)
    const liveMutating = (mutDecl?.[1].match(/'[^']*'|"[^"]*"/g) ?? []).map((s) => s.slice(1, -1)).sort()
    expect(
      liveMutating,
      'S-5 / §2.2 prohibition 5: `MUTATING_METHODS` stays the pinned SEVEN (src/renderer/renderer.ts:12) — no new IPC method is mutating',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'])
    // The renderer RPC union (type-only, so read from its source declaration).
    const typesSrc = readFileSync(new URL('../src/shared/types.ts', import.meta.url), 'utf8')
    const unionAt = typesSrc.indexOf('export type RpcMethod =')
    expect(unionAt, 'S-5: `RpcMethod` is declared in src/shared/types.ts').toBeGreaterThan(-1)
    const unionLines = typesSrc.slice(unionAt).split('\n')
    const memberLines = [unionLines[0]]
    for (let i = 1; i < unionLines.length; i += 1) {
      if (!/^\s*\|/.test(unionLines[i])) break
      memberLines.push(unionLines[i])
    }
    expect(
      (memberLines.join('\n').match(/'[^']*'/g) ?? []).length,
      'S-5 / §2.2 prohibition 5 / `N-18`: `RpcMethod` reads 22 — no new IPC method beyond `focus`, read from its OWN live module',
    ).toBe(22)
    // …and the sibling census that pins the same five seams must still exist and
    // run in the same suite (`§2.2` prohibition 5 names it; this unit may not
    // edit it, `§5.1`). Its PASSING is that file's own business — this row asserts
    // the LIVE values above instead of re-counting its inline literals.
    expect(
      existsSync(new URL('./engine-pin-version.test.ts', import.meta.url)),
      "S-5: `tests/engine-pin-version.test.ts`'s census is still present and part of the same node suite (it is NOT re-parsed for group literals — ADV-SH-5)",
    ).toBe(true)
  })

  it('S-6 §4.4 S-7 (+ §2.5 item 3, §7a item 9) — ZERO graph seam: no dispatch/op/applyCommand/load, no renderer import', () => {
    const code = stripComments(moduleSource('S-6 §4.4 S-7 / §2.5 item 3'))
    expectNoStaticHits(
      code,
      [
        { what: 'dispatch/a graph command (§2.5 item 3: an order change performs ZERO graph ops)', re: /\b(dispatch|applyCommand|dispatchEvent|renderProducingProcess|loadEnvelope|loadDoc)\b/ },
        { what: 'a graph/op vocabulary', re: /\b(graphOps?|opQueue)\b/ },
        { what: 'an import from src/renderer/** (the graph lives there)', re: /from\s+['"][^'"]*\/renderer\// },
        { what: 'a spy/hook/injection point for a graph seam (§4.4 S-7 forbids adding one)', re: /\b(spyOn|__graphProbe|instrument)\b/ },
      ],
      'S-6 §4.4 S-7',
    )
  })

  it('S-7 §4.4 S-1/S-2/S-3/S-6 — no shim expansion, no node destruction, no content-authoring escape hatch', () => {
    const raw = moduleSource('S-7 §4.4 S-1/S-2/S-3/S-6')
    const code = stripComments(raw)
    // S-2: no new shim member is needed — the module touches only the shim's
    // public surface (children/appendChild/setAttribute/remove/className).
    const shimImports = staticHits(code, /from\s+['"][^'"]*dom-shim/)
    expect(shimImports, 'S-2: no shim member is expanded — the module imports NOTHING from the shim (the container is injected, `unknown`)').toEqual([])
    // S-6: dispose() removes the CONTAINERS it created and destroys no caller node.
    expectNoStaticHits(
      code,
      [
        { what: 'a node-destroying call (S-6: dispose() may not destroy a caller node)', re: /\b(removeChild|\bdeleteNode\b|destroyNode|\.innerHTML\s*=\s*['"]['"])\b/ },
        { what: 'a per-zone/per-pane semantic (S-5: the H-r15 hazard)', re: /\b(perZone|perPane|zoneOf|paneOf)\b/ },
        { what: 'a region concept (S-5 / H-r17: this unit acquires none)', re: /\b(regionName|resolveMount|regionRegistry)\b/ },
      ],
      'S-7 §4.4 S-1/S-3/S-6',
    )
    expect(raw.length, 'S-7: the module is a real source file (the static rows read its bytes)').toBeGreaterThan(0)
  })
})

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER (6 rows, ALL executed deterministically).
//
// Type algebra (`docs/specs/engine-pin.md` §5.5's): `P-IM` invariant ·
// `P-SM` state-machine · `P-TP` totality. Each row's `it` title carries the row
// id AND its strategy id. Caps: ≤100 attempts per row, ≤400 total, register
// order, STOP AFTER 5 CONSECUTIVE FAILURES. `P-SH-IM-1` and `P-SH-TP-1` are
// `YES (bounded)` — neither is a proof of its unbounded universal.
// ===========================================================================
describe('§5.5.1 — the typed property register (6 rows, executed deterministically, no PBT harness)', () => {
  it('P-SH-IM-1 [S-SH-PERM-1] — for EVERY permutation in S₃∪S₄ (+3 partial drives): order === p, no refusal, nothing removed, the child sequence is p', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-IM-1', 'S-SH-PERM-1')

    /** One counted attempt: a `setOrder` call on a fresh n-key host whose nodes
     *  are all placed and rendered (the `setNode`-per-key + `render()` setup is
     *  NOT counted — `§5.5.1`'s "how the counting works"). */
    const permAttempt = (keys: readonly SlotKey[], perm: readonly SlotKey[]) => (): string | null => {
      if (create === null) return reason
      const container = mountEl()
      const nodes: Record<string, ShimElement> = {}
      for (const k of keys) nodes[k] = nodeEl(`p-${k}`)
      const h = create({ container, keys })
      for (const k of keys) h.setNode(k, nodes[k])
      h.render()
      const r = h.setOrder(perm)
      if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)}) — a setOrder of declared keys is never refused`
      if (r.refused.length !== 0) return `refused.length === ${r.refused.length} (expected 0): ${JSON.stringify(r.refused)}`
      if (r.removed.length !== 0) return `removed.length === ${r.removed.length} — a permutation removes NOTHING`
      if (JSON.stringify(r.order) !== JSON.stringify([...perm])) {
        return `order === ${JSON.stringify(r.order)} (expected EXACTLY ${JSON.stringify([...perm])} — same keys, once each, in p's order)`
      }
      if (r.order.length !== keys.length) return `order.length === ${r.order.length} (expected ${keys.length}: no extra key)`
      if (![...r.order].every((k) => keys.includes(k))) return `order names a key OUTSIDE the declared set: ${JSON.stringify(r.order)}`
      // The NODE-LAYER observable (§2.5 item 3 / §7a item 9): the injected
      // container's host-created containers read in CHILD order, element by
      // element, BY REFERENCE.
      const seq = containerChildSequence(h, container, keys)
      if (seq.length !== keys.length) return `the child-reference sequence holds ${seq.length} host containers (expected ${keys.length})`
      for (let i = 0; i < perm.length; i += 1) {
        if (!sameRef(seq[i], h.containerFor(perm[i]))) {
          return `the child sequence's index ${i} is not containerFor('${perm[i]}') — the projected container order is not the permutation`
        }
      }
      for (const k of keys) {
        const kids = childrenOf(h.containerFor(k))
        if (kids.length !== 1 || !sameRef(kids[0], nodes[k])) {
          return `containerFor('${k}') does not hold exactly the node placed for it, by reference (a permutation must not re-parent a caller node)`
        }
      }
      return null
    }

    for (const p of PERMS_S3) rec.run(`S₃ permutation ${p.join('')} of {a,b,c}`, permAttempt(S3_KEYS, p))
    for (const p of PERMS_S4) rec.run(`S₄ permutation ${p.join('')} of {a,b,c,d}`, permAttempt(S4_KEYS, p))
    // The THIRD fixed table (M-15's ignored-key and duplicate-key ground) — the
    // `+3` term of the row's `33`.
    for (const p of PARTIAL_DRIVES) {
      rec.run(`partial setOrder(${JSON.stringify(p)})`, () => {
        if (create === null) return reason
        const container = mountEl()
        const keys: readonly SlotKey[] = ['a', 'b', 'c']
        const nodes: Record<string, ShimElement> = { a: nodeEl('a'), b: nodeEl('b'), c: nodeEl('c') }
        const h = create({ container, keys })
        for (const k of keys) h.setNode(k, nodes[k])
        h.render()
        const r = h.setOrder(p)
        if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)}) — M-15: undeclared/duplicate keys are IGNORED, never refused`
        if (r.refused.length !== 0) return `refused.length === ${r.refused.length} (M-15)`
        if (r.removed.length !== 0) return `removed.length === ${r.removed.length} — nothing is removed by a setOrder`
        const survivors: SlotKey[] = []
        for (const k of p) if (keys.includes(k) && !survivors.includes(k)) survivors.push(k)
        const expected = [...survivors, ...keys.filter((k) => !survivors.includes(k))]
        if (JSON.stringify(r.order) !== JSON.stringify(expected)) {
          return `order === ${JSON.stringify(r.order)} (expected ${JSON.stringify(expected)} — the declared set in the requested relative order, undeclared/duplicate ignored)`
        }
        if (new Set(r.order).size !== keys.length) return `order repeats a key: ${JSON.stringify(r.order)}`
        const seq = containerChildSequence(h, container, keys)
        // ⟶ STRATEGY FIXED 2026-09-27 (`§3b`-1 `ADV-SH-7`; the row's STATEMENT,
        // its `33` attempts and its strategy id are UNCHANGED): the child-sequence
        // half is read over the **WHOLE PROJECTED SEQUENCE** — the declared key
        // set in the requested relative order, undeclared/duplicate keys ignored,
        // i.e. `M-15`'s own expected `order` — and NOT filtered to the keys the
        // caller happened to list. A host that ignores `setOrder`'s request and
        // keeps the DECLARED order therefore FAILS these three drives (the old
        // survivor-filtered reading let it pass).
        const projected = expected.map((k) => h.containerFor(k))
        if (seq.length !== keys.length) {
          return `the child-reference sequence holds ${seq.length} host containers (expected the FULL projected sequence, ${keys.length} — one per declared key)`
        }
        for (let i = 0; i < projected.length; i += 1) {
          if (!sameRef(seq[i], projected[i])) {
            return `the child sequence's index ${i} is not containerFor('${expected[i]}') — the WHOLE projected sequence must read ${JSON.stringify(expected)} in child order (declaration order is not the projection)`
          }
        }
        for (const k of keys) {
          const kids = childrenOf(h.containerFor(k))
          if (kids.length !== 1 || !sameRef(kids[0], nodes[k])) {
            return `containerFor('${k}') does not hold exactly the node placed for it, by reference (a setOrder must not re-parent a caller node)`
          }
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-SH-IM-2 [S-SH-IDENT-1] — the same permutation family driven AGAIN + 4 fixed identity shapes: every reference is preserved', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-IM-2', 'S-SH-IDENT-1')

    for (const keys of [S3_KEYS, S4_KEYS]) {
      const perms = keys.length === 3 ? PERMS_S3 : PERMS_S4
      for (const perm of perms) {
        rec.run(`identity across permutation ${perm.join('')} of {${keys.join(',')}}`, () => {
          if (create === null) return reason
          const container = mountEl()
          const f1 = foreignEl('1')
          const f2 = foreignEl('2')
          container.appendChild(f1)
          container.appendChild(f2)
          const nodes: Record<string, ShimElement> = {}
          for (const k of keys) nodes[k] = nodeEl(`i-${k}`)
          const h = create({ container, keys })
          for (const k of keys) h.setNode(k, nodes[k])
          h.render()
          const containersBefore: Record<string, unknown> = {}
          for (const k of keys) containersBefore[k] = h.containerFor(k)
          const r = h.setOrder(perm)
          if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)})`
          // The container element per key is the SAME object before and after.
          for (const k of keys) {
            if (!sameRef(h.containerFor(k), containersBefore[k])) return `containerFor('${k}') is NOT the same object after the permutation`
          }
          // The caller's node is the SAME object, never cloned/re-created.
          for (const k of keys) {
            const kids = childrenOf(h.containerFor(k))
            if (kids.length !== 1 || !sameRef(kids[0], nodes[k])) return `containerFor('${k}') does not hold the SAME caller node by reference`
          }
          // `placed` contains that key and no other — over the whole permutation.
          if (JSON.stringify([...r.placed].sort()) !== JSON.stringify([...keys].sort())) {
            return `placed === ${JSON.stringify(r.placed)} (expected every declared key, and no other)`
          }
          for (const k of r.placed) if (!keys.includes(k)) return `placed names an undeclared key '${k}'`
          // Every foreign sibling is STILL the same object (the V-7 half).
          const kids = childrenOf(container)
          if (!containsRef(kids, f1) || !containsRef(kids, f2)) return 'a foreign sibling was removed by the permutation'
          if (kids.filter((c) => sameRef(c, f1)).length !== 1 || kids.filter((c) => sameRef(c, f2)).length !== 1) {
            return 'a foreign sibling was re-appended (it occurs more than once)'
          }
          return null
        })
      }
    }

    // THE FOUR FIXED IDENTITY SHAPES of the cell (the `+4` term of this row's `34`).
    type Shape = { id: string; run: () => string | null }
    const shapes: readonly Shape[] = [
      {
        id: 'shape 1 · one caller node placed for EVERY declared key of a 3-key host',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const nodes: Record<string, ShimElement> = { a: nodeEl('a'), b: nodeEl('b'), c: nodeEl('c') }
          const h = create({ container, keys: ['a', 'b', 'c'] })
          for (const k of ['a', 'b', 'c']) h.setNode(k, nodes[k])
          const r = h.render()
          for (const k of ['a', 'b', 'c']) {
            const kids = childrenOf(h.containerFor(k))
            if (kids.length !== 1 || !sameRef(kids[0], nodes[k])) return `containerFor('${k}') lost the caller node's identity`
          }
          if (JSON.stringify([...r.placed].sort()) !== JSON.stringify(['a', 'b', 'c'])) return `placed === ${JSON.stringify(r.placed)}`
          return null
        },
      },
      {
        id: 'shape 2 · the container option ABSENT (null) — the no-op places nothing and preserves every reference it was handed',
        run: () => {
          if (create === null) return reason
          const n = nodeEl('n')
          const h = create({ container: null, keys: ['a', 'b'] })
          const r = h.setNode('a', n)
          if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)}) — an absent container is a no-op (F-6)`
          if (r.placed.length !== 0) return `placed === ${JSON.stringify(r.placed)} (nothing is placed without a container)`
          if (h.containerFor('a') !== null) return 'containerFor is not null on an absent-container host'
          if (n.parent !== null) return 'the caller node was re-parented by a no-op configuration'
          return null
        },
      },
      {
        id: 'shape 3 · two caller-created FOREIGN siblings appended BEFORE the host exists, then two render() cycles (M-7)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const f1 = foreignEl('1')
          const f2 = foreignEl('2')
          container.appendChild(f1)
          container.appendChild(f2)
          const before = snapshotChildren(container)
          const h = create({ container, keys: ['a'] })
          h.render()
          h.render()
          const after = snapshotChildren(container)
          if (!containsRef(after, f1) || !containsRef(after, f2)) return 'a foreign sibling did not survive two renders BY REFERENCE'
          if (after.indexOf(f1) !== before.indexOf(f1) || after.indexOf(f2) !== before.indexOf(f2)) {
            return 'a foreign sibling changed position — it was removed and re-appended'
          }
          return null
        },
      },
      {
        id: 'shape 4 · one node MOVED between two declared keys (M-9) and then REPLACED by a second (M-10)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const n1 = nodeEl('n1')
          const n2 = nodeEl('n2')
          const h = create({ container, keys: ['a', 'b'] })
          h.setNode('a', n1)
          h.render()
          const moved = h.setNode('b', n1)
          if (childrenOf(h.containerFor('a')).length !== 0) return "M-9: containerFor('a') still holds the moved node"
          const kidsB = childrenOf(h.containerFor('b'))
          if (kidsB.length !== 1 || !sameRef(kidsB[0], n1)) return "M-9: containerFor('b') does not hold the SAME node by reference"
          if (JSON.stringify(moved.placed) !== JSON.stringify(['b'])) return `M-9: placed === ${JSON.stringify(moved.placed)}`
          const replaced = h.setNode('b', n2)
          if (replaced.removed.length !== 1 || !sameRef(replaced.removed[0], n1)) return 'M-10: removed does not hold the FIRST node by reference'
          const kidsB2 = childrenOf(h.containerFor('b'))
          if (kidsB2.length !== 1 || !sameRef(kidsB2[0], n2)) return 'M-10: the container does not hold the REPLACEMENT node by reference'
          return null
        },
      },
    ]
    for (const shape of shapes) rec.run(shape.id, shape.run)
    rec.finish()
  })

  it('P-SH-IM-3 [S-SH-REPEAT-1] — a second call with unchanged inputs performs NO child mutation (4 shapes × 2 calls)', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-IM-3', 'S-SH-REPEAT-1')

    // The shapes are BUILT inside an attempt, through a `make` that takes the
    // resolved factory as a parameter (never closing over a possibly-absent
    // `create`, so a module-absent run reports BROKEN attempts, not a TypeError).
    type Shape = {
      id: string
      make: (factory: CreateSlotHost) => { container: unknown; host: SlotHost }
    }
    const shapes: readonly Shape[] = [
      {
        id: 'shape 1 · render() twice with 3 declared keys and 3 placed caller nodes',
        make: (factory) => {
          const container = mountEl()
          const h = factory({ container, keys: ['a', 'b', 'c'] })
          for (const k of ['a', 'b', 'c']) h.setNode(k, nodeEl(k))
          return { container, host: h }
        },
      },
      {
        id: 'shape 2 · render() twice with 1 declared key and 1 placed node',
        make: (factory) => {
          const container = mountEl()
          const h = factory({ container, keys: ['only'] })
          h.setNode('only', nodeEl('only'))
          return { container, host: h }
        },
      },
      {
        id: 'shape 3 · render() twice with keys: [] (M-8)',
        make: (factory) => {
          const container = mountEl()
          return { container, host: factory({ container, keys: [] }) }
        },
      },
      {
        id: 'shape 4 · render() twice on the ABSENT-container configuration (M-14)',
        make: (factory) => ({ container: null, host: factory({ container: null, keys: ['a', 'b'] }) }),
      },
    ]

    for (const shape of shapes) {
      let host: SlotHost | null = null
      let firstRes: SlotHostResult | null = null
      let outerContainer: unknown = null
      let firstChildren: unknown[] = []
      let firstInner: unknown[][] = []
      rec.run(`${shape.id} · call #1`, () => {
        if (create === null) return reason
        const built = shape.make(create)
        host = built.host
        const r = host.render()
        firstRes = r
        outerContainer = built.container
        firstChildren = snapshotChildren(built.container)
        const ks = host.keys()
        firstInner = ks.map((k) => snapshotChildren(host === null ? null : host.containerFor(k)))
        if (r.refused.length !== 0) return `call #1 refused ${r.refused.length}: ${JSON.stringify(r.refused)}`
        return null
      })
      rec.run(`${shape.id} · call #2 (unchanged inputs)`, () => {
        if (create === null) return reason
        if (host === null || firstRes === null) return 'the first call did not run, so the repeat cannot be compared'
        const first: SlotHostResult = firstRes
        const h: SlotHost = host
        const r = h.render()
        if (r.removed.length !== 0) return `removed.length === ${r.removed.length} — a repeat with unchanged inputs removes NOTHING`
        if (r.refused.length !== 0) return `refused.length === ${r.refused.length} — and refuses NOTHING`
        if (r.ok !== true) return 'ok === false on a repeat with unchanged inputs'
        if (JSON.stringify(r.order) !== JSON.stringify(first.order)) return `order changed: ${JSON.stringify(r.order)} vs ${JSON.stringify(first.order)}`
        if (JSON.stringify(r.placed) !== JSON.stringify(first.placed)) return `placed changed: ${JSON.stringify(r.placed)} vs ${JSON.stringify(first.placed)}`
        // ⟶ STRATEGY FIXED 2026-09-27 (`§3b`-1 `ADV-SH-8`; the row's statement,
        // its `8` attempts and its strategy id are UNCHANGED): the **OUTER**
        // snapshot — the INJECTED container's own child-reference sequence, per
        // index, BY REFERENCE (`M-16`'s per-step child-reference sequence, `§7a`
        // item 8). Without it a host that detaches and RE-APPENDS its containers
        // on an unchanged `render()` passed the inner-only comparison.
        const outerAfter = snapshotChildren(outerContainer)
        if (outerAfter.length !== firstChildren.length) {
          return `the injected container's child count changed: ${outerAfter.length} vs ${firstChildren.length} — a repeat with unchanged inputs mutates NOTHING`
        }
        for (let i = 0; i < firstChildren.length; i += 1) {
          if (!sameRef(outerAfter[i], firstChildren[i])) {
            return `the injected container's children[${i}] is not reference-identical — the host RE-APPENDED its own container (a re-append moves it to the end)`
          }
        }
        // No node is re-appended: the child-reference sequence is unchanged.
        const ks = h.keys()
        for (let i = 0; i < ks.length; i += 1) {
          const inner = snapshotChildren(h.containerFor(ks[i]))
          if (inner.length !== firstInner[i].length) return `containerFor('${ks[i]}')'s child count changed (a re-append)`
          for (let j = 0; j < inner.length; j += 1) {
            if (!sameRef(inner[j], firstInner[i][j])) return `containerFor('${ks[i]}').children[${j}] is not reference-identical — a re-append moves it to the end`
          }
        }
        // …and every returned array is a FRESH array (I-9 / §7a item 8's half (b)).
        if (sameRef(r, first)) return 'the result OBJECT was reused across calls'
        for (const field of ['order', 'placed', 'removed', 'refused'] as const) {
          if (sameRef(r[field], first[field])) return `the '${field}' array was REUSED across calls (I-9: a fresh array)`
        }
        return null
      })
    }
    rec.finish()
  })

  it('P-SH-SM-1 [S-SH-MIXED-1] — valid placements beside exactly one REFUSED input: placed and owned, no silent create (12 attempts)', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-SM-1', 'S-SH-MIXED-1')

    /** The per-attempt assertions of the cell: `ok === (refused.length === 0)`,
     *  the refusal's code is EXACTLY the class under test, `refuse` was notified
     *  once with a `deepEqual` object whose return value changed nothing (M-17),
     *  **the container child count of THE CLASS AT HAND** (the no-silent-create
     *  half — `I-10`'s `keys.length` clause applies only where a container EXISTS,
     *  i.e. to a SUCCESSFUL `render()`; the unusable-container class creates NO
     *  container, so its falsifiable clause is ZERO host children), and `order` is
     *  the declared set once each. */
    const assertRefusedStep = (
      h: SlotHost,
      container: unknown,
      declared: readonly SlotKey[],
      notified: readonly SlotHostRefusal[],
      r: SlotHostResult,
      expectedCode: RefusalCode,
      label: string,
    ): string | null => {
      if (r.ok !== (r.refused.length === 0)) return `${label}: ok === ${String(r.ok)} with refused.length === ${r.refused.length} (I-1)`
      if (r.refused.length !== 1) return `${label}: ${r.refused.length} refusals (expected EXACTLY one — the class under test)`
      if (r.refused[0].code !== expectedCode) return `${label}: code === '${r.refused[0].code}' (expected exactly '${expectedCode}')`
      if (notified.length !== 1) return `${label}: refuse was notified ${notified.length} times (expected once — M-17)`
      if (JSON.stringify(notified[0]) !== JSON.stringify(r.refused[0])) return `${label}: the notified object is not deepEqual to the recorded refusal`
      // ⟶ RE-ANCHORED 2026-09-27 (`§3b`-3's `P-SH-SM-1` red row — `11/12`, ruled
      // TEST-SIDE): the child-count clause is CLASS-SCOPED, never one blanket
      // `I-10` reading over both classes. On the `'container-not-appendable'`
      // class NO container is created at all (`containerFor(k)` is `null` for
      // every key — `F-7`'s own `containerFor` row), so the clause there is
      // ZERO host children; on the classes where a container exists it is
      // `keys.length` after the successful `render()` (`I-10`).
      if (expectedCode === 'container-not-appendable') {
        if (childCountOf(container) !== 0) {
          return `${label}: the injected container holds ${childCountOf(container)} host children (expected 0 — this class creates NO container: F-7's containerFor row; I-10 is scoped to a SUCCESSFUL render())`
        }
        for (const k of declared) {
          if (h.containerFor(k) !== null) return `${label}: containerFor('${k}') is not null on the unusable-container class (F-7)`
        }
      } else if (childCountOf(container) !== declared.length) {
        return `${label}: the container holds ${childCountOf(container)} host children (expected exactly ${declared.length} — the DECLARED keys, so the refused input created nothing: I-10)`
      }
      if (r.order.length !== declared.length || new Set(r.order).size !== declared.length) {
        return `${label}: order === ${JSON.stringify(r.order)} (expected the declared key set once each — I-2)`
      }
      for (const k of declared) if (!r.order.includes(k)) return `${label}: order dropped the declared key '${k}'`
      if (r.placed.some((k) => !declared.includes(k))) return `${label}: placed names an undeclared key: ${JSON.stringify(r.placed)}`
      const c = coherenceBreaks(h, r, declared, label)
      if (c.length > 0) return c[0]
      return null
    }

    // (a) the 3 refusal classes × 2 steps (6 attempts): a refused attempt, then a
    //     VALID placement for a declared key (proving the refusal did not poison
    //     the host's state).
    for (const [id, code] of MIXED_CLASSES) {
      const declared: readonly SlotKey[] = ['a', 'b']
      const container = mountEl()
      const notified: SlotHostRefusal[] = []
      const bad = code === 'container-not-appendable' ? BAD_CONTAINER : container
      // The host is built INSIDE an attempt (never in the row's setup), so a
      // module-absent run reports this row as BROKEN attempts rather than as a
      // TypeError outside the register's accounting.
      let host: SlotHost | null = null
      const hostOf = (): SlotHost | null => {
        if (create === null || host === null) return null
        return host
      }
      rec.run(`${id} · step 1 (the refused input)`, () => {
        if (create === null) return reason
        host = create({ container: bad as unknown, keys: declared, refuse: (r) => notified.push(r) })
        const h = host
        h.render()
        // The child-count clause is measured on the INJECTED container (`bad` —
        // which IS the mount on the two present-container classes).
        const before = childCountOf(bad)
        const r =
          code === 'unknown-key'
            ? h.setNode('nope', nodeEl('n'))
            : code === 'malformed-node'
              ? h.setNode('a', null)
              : h.setNode('a', nodeEl('n'))
        const brk = assertRefusedStep(h, bad as unknown, declared, notified, r, code, `${id} step 1`)
        if (brk !== null) return brk
        if (bad === container && childCountOf(container) !== before) return `${id} step 1: the child count changed on a refused input`
        return null
      })
      rec.run(`${id} · step 2 (a valid placement for a declared key — the state was not poisoned)`, () => {
        if (create === null) return reason
        const h = hostOf()
        if (h === null) return 'step 1 did not build the host, so the follow-up step cannot drive it'
        if (code === 'container-not-appendable') {
          // This shape cannot place anything; the "valid" step asserts the declared
          // RESULT SHAPE and the coherence clauses instead of a placement.
          const r = h.render()
          if (r.ok !== (r.refused.length === 0)) return `${id} step 2: I-1 broke`
          const c = coherenceBreaks(h, r, declared, `${id} step 2`)
          return c.length > 0 ? c[0] : null
        }
        const r = h.setNode('b', nodeEl('b-valid'))
        if (r.ok !== true) return `${id} step 2: a valid placement was refused — refused=${JSON.stringify(r.refused)}`
        if (JSON.stringify(r.placed) !== JSON.stringify(['b'])) return `${id} step 2: placed === ${JSON.stringify(r.placed)} (expected ['b'])`
        const kids = childrenOf(h.containerFor('b'))
        if (kids.length !== 1) return `${id} step 2: containerFor('b') does not hold the valid node`
        const c = coherenceBreaks(h, r, declared, `${id} step 2`)
        return c.length > 0 ? c[0] : null
      })
    }

    // (b) a 4-position ROTATION of a mixed drive (4 attempts): the REFUSED input
    //     rotated through positions 1–4 of a 4-step drive on ONE host, so that
    //     each position 0..3 is the refused step on its own rotation. The drive is
    //     built from the refusal classes `§3.2` triggers (`F-1` undeclared key,
    //     `F-2` malformed node, `F-3` non-string key) — the fourth entry is a
    //     VALID placement on the present-container shape, because `F-6`'s
    //     absent-container no-op cannot host the valid steps of the rotation.
    //     `F-6`'s no-op is still driven by this register row: the `P-SH-SM-2`
    //     sequence 5 (absent container through all seven methods) and
    //     `P-SH-TP-1`'s `container: null` pool shape.
    const rotationSteps: ReadonlyArray<{ id: string; code: RefusalCode | null; key: unknown }> = [
      { id: "F-1 · setNode('nope', n)", code: 'unknown-key', key: 'nope' },
      { id: 'F-2 · setNode(a, null)', code: 'malformed-node', key: 'a' },
      { id: 'F-3 · setNode(42, n)', code: 'unknown-key', key: 42 },
      { id: 'a VALID placement for a declared key', code: null, key: 'b' },
    ]
    for (let pos = 0; pos < rotationSteps.length; pos += 1) {
      const ordered = [...rotationSteps.slice(pos), ...rotationSteps.slice(0, pos)]
      rec.run(`rotation ${pos + 1}/4 · the refused input at position ${pos + 1} (${ordered[0].id})`, () => {
        if (create === null) return reason
        const declared: readonly SlotKey[] = ['a', 'b']
        const container = mountEl()
        const notified: SlotHostRefusal[] = []
        const h = create({ container, keys: declared, refuse: (r) => notified.push(r) })
        h.render()
        let refusals = 0
        for (let i = 0; i < ordered.length; i += 1) {
          const step = ordered[i]
          const r =
            step.code === 'malformed-node'
              ? h.setNode(step.key as SlotKey, null)
              : h.setNode(step.key as SlotKey, nodeEl(`n${i}`))
          const brk = coherenceBreaks(h, r, declared, `rotation ${pos + 1} step ${i + 1} (${step.id})`)
          if (brk.length > 0) return brk[0]
          if (r.refused.length > 0) {
            refusals += 1
            if (r.refused.length !== 1) return `rotation ${pos + 1} step ${i + 1}: ${r.refused.length} refusals`
            if (step.code !== null && r.refused[0].code !== step.code) {
              return `rotation ${pos + 1} step ${i + 1}: code === '${r.refused[0].code}' (expected '${step.code}')`
            }
          } else if (step.code !== null) {
            return `rotation ${pos + 1} step ${i + 1}: no refusal was produced (expected '${step.code}')`
          }
        }
        if (refusals !== 3) return `rotation ${pos + 1}: ${refusals} refused steps (expected exactly 3 — one per refusing entry)`
        if (notified.length !== refusals) return `rotation ${pos + 1}: refuse was notified ${notified.length} times for ${refusals} refusals`
        if (notified.some((x) => x.code === NOT_EMITTED_CODE)) return `rotation ${pos + 1}: a call emitted '${NOT_EMITTED_CODE}'`
        if (childCountOf(container) !== declared.length) {
          return `rotation ${pos + 1}: the child count is ${childCountOf(container)}, not the declared ${declared.length} (no silent create: a refused input creates NO container)`
        }
        return null
      })
    }

    // (c) the ''-key pair (2 attempts): a DECLARED '' is valid while an
    //     UNDECLARED non-string is 'unknown-key' (F-3's own two halves).
    rec.run("the ''-key pair · a DECLARED '' is a valid key", () => {
      if (create === null) return reason
      const container = mountEl()
      const declared: readonly SlotKey[] = ['']
      const notified: SlotHostRefusal[] = []
      const h = create({ container, keys: declared, refuse: (r) => notified.push(r) })
      h.render()
      const r = h.setNode('', nodeEl('empty-key'))
      if (r.ok !== true) return `ok === false (refused=${JSON.stringify(r.refused)}) — a declared '' is a valid key`
      if (r.refused.length !== 0 || notified.length !== 0) return `a refusal was produced for a declared ''`
      if (JSON.stringify(r.order) !== JSON.stringify([''])) return `order === ${JSON.stringify(r.order)} (expected [''])`
      const kids = childrenOf(h.containerFor(''))
      if (kids.length !== 1) return `containerFor('') does not hold the placed node`
      if (childCountOf(container) !== 1) return `the container holds ${childCountOf(container)} host children (expected 1)`
      return null
    })
    rec.run("the ''-key pair · an UNDECLARED non-string is 'unknown-key' with the VERBATIM key", () => {
      if (create === null) return reason
      const container = mountEl()
      const declared: readonly SlotKey[] = ['a']
      const notified: SlotHostRefusal[] = []
      const h = create({ container, keys: declared, refuse: (r) => notified.push(r) })
      h.render()
      const r = h.setNode(42 as unknown as SlotKey, nodeEl('n'))
      const brk = assertRefusedStep(h, container, declared, notified, r, 'unknown-key', "the ''-key pair (non-string half)")
      if (brk !== null) return brk
      if (r.refused[0].key !== 42) return `the refusal's key field reads ${brief(r.refused[0].key)} — the supplied value must be held VERBATIM (42, never '42')`
      return null
    })
    rec.finish()
  })

  it('P-SH-SM-2 [S-SH-SEQ-1] — the 8 fixed operation sequences keep the host COHERENT at every step', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-SM-2', 'S-SH-SEQ-1')

    /** The four coherence clauses per step, plus the post-refusal callability
     *  clause: after any refusal EVERY method is still callable and still returns
     *  a valid `SlotHostResult`. Returns the first break cause, or `null`. */
    const coherence = (h: SlotHost, declared: readonly SlotKey[], label: string): string | null => {
      const r = drive(() => h.render(), `${label} — render() is still callable after the step`)
      const c = coherenceBreaks(h, r, declared, `${label} — post-step coherence`)
      if (c.length > 0) return c[0]
      const ks = h.keys()
      if (ks.length !== declared.length) return `${label}: keys() lost a declared key (${JSON.stringify(ks)})`
      const cf = drive(() => h.containerFor(declared[0] ?? 'a'), `${label} — containerFor() is still callable`)
      expect(cf === null || cf === undefined || typeof cf === 'object', `${label}: containerFor returned a declared-shape value`).toBe(true)
      return null
    }

    const sequences: ReadonlyArray<{ id: string; run: () => string | null }> = [
      {
        id: 'sequence 1 · two render() cycles over 3 declared keys with 2 placed (M-16)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const declared: readonly SlotKey[] = ['a', 'b', 'c']
          const h = create({ container, keys: declared })
          h.setNode('a', nodeEl('a'))
          h.setNode('b', nodeEl('b'))
          const first = h.render()
          const before = snapshotChildren(container)
          const second = h.render()
          const after = snapshotChildren(container)
          if (second.removed.length !== 0) return 'sequence 1: the second render removed something'
          if (JSON.stringify(second.order) !== JSON.stringify(first.order)) return 'sequence 1: order changed across an unchanged render'
          expectRefsEqual(after, before, 'sequence 1: the child-reference sequence is unchanged')
          return coherence(h, declared, 'sequence 1')
        },
      },
      {
        id: 'sequence 2 · render() with keys: [] (M-8)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const declared: readonly SlotKey[] = []
          const h = create({ container, keys: declared })
          const r = h.render()
          const c = coherenceBreaks(h, r, declared, 'sequence 2')
          if (c.length > 0) return c[0]
          if (childrenOf(container).length !== 0) return 'sequence 2: a container was created for an empty declared set'
          return coherence(h, declared, 'sequence 2')
        },
      },
      {
        id: "sequence 3 · setNode on an undeclared key, then render() (F-1)",
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const declared: readonly SlotKey[] = ['a']
          const h = create({ container, keys: declared })
          const r = h.setNode('nope', nodeEl('x'))
          if (r.refused.length !== 1 || r.refused[0].code !== 'unknown-key') return 'sequence 3: the undeclared key was not refused as unknown-key'
          if (childCountOf(container) !== 0) return 'sequence 3: a container was created for an undeclared key'
          return coherence(h, declared, 'sequence 3')
        },
      },
      {
        id: 'sequence 4 · remove on an undeclared key, then containerFor on the same key (F-1/F-5 — the read is not a refusal)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const declared: readonly SlotKey[] = ['a']
          const h = create({ container, keys: declared })
          const r = h.remove('nope')
          if (r.refused.length !== 1 || r.refused[0].code !== 'unknown-key') return 'sequence 4: remove on an undeclared key was not refused as unknown-key'
          const read = h.containerFor('nope')
          if (read !== null) return `sequence 4: containerFor('nope') returned ${brief(read)} (expected null, BY VALUE — F-5)`
          if (childCountOf(container) !== 0) return 'sequence 4: the read created a container'
          return coherence(h, declared, 'sequence 4')
        },
      },
      {
        id: 'sequence 5 · the ABSENT-container configuration (null) through all seven methods (M-14/F-6)',
        run: () => {
          if (create === null) return reason
          const declared: readonly SlotKey[] = ['a', 'b']
          const h = create({ container: null, keys: declared })
          const steps: Array<[string, () => SlotHostResult | readonly SlotKey[] | unknown]> = [
            ['setNode(a, n)', () => h.setNode('a', nodeEl('a'))],
            ['remove(a)', () => h.remove('a')],
            ["setOrder(['b','a'])", () => h.setOrder(['b', 'a'])],
            ['render()', () => h.render()],
            ['keys()', () => h.keys()],
            ['containerFor(a)', () => h.containerFor('a')],
            ['dispose()', () => h.dispose()],
          ]
          for (const [id, fn] of steps) {
            const value = drive(fn, `sequence 5 · ${id}`)
            if (id === 'keys()') {
              if (JSON.stringify(value) !== JSON.stringify(['b', 'a'])) return `sequence 5 keys(): ${brief(value)} (expected the projected declared keys ['b','a'])`
              continue
            }
            if (id === 'containerFor(a)') {
              if (value !== null) return `sequence 5 containerFor(a): ${brief(value)} (expected null)`
              continue
            }
            if (id === 'dispose()') {
              if (value !== undefined) return `sequence 5 dispose(): ${brief(value)} (expected void)`
              continue
            }
            const r = value as SlotHostResult
            if (r.ok !== (r.refused.length === 0)) return `sequence 5 ${id}: I-1 broke`
            if (r.refused.length !== 0 || r.ok !== true) return `sequence 5 ${id}: an absent container refused something (F-6: refused is [], ok === true for valid inputs)`
            if (r.placed.length !== 0) return `sequence 5 ${id}: placed === ${JSON.stringify(r.placed)} (nothing is placeable)`
          }
          // ⟶ FIXED 2026-09-27 (`§3b`-3's `P-SH-SM-2` red row — `7/8`, ruled
          // TEST-SIDE): the PRE-`dispose()` read is kept EXACTLY as it was (the
          // projection the drive's `setOrder(['b','a'])` reported), and the
          // POST-`dispose()` expectation is `[]` — `I-5`/`M-13` and the register's
          // own note fix `keys()` at `[]` after `dispose()`. The row's statement,
          // its `8` sequences and the register's `155` total are UNCHANGED.
          const after = h.keys()
          if (JSON.stringify(after) !== JSON.stringify([])) {
            return `sequence 5: keys() after dispose() is ${brief(after)} — I-5/M-13 fix it at [] (no declared key, no container reference, no state survives dispose())`
          }
          if (h.containerFor('a') !== null) return 'sequence 5: containerFor(a) is not null after dispose() (I-5)'
          if (drive(() => h.dispose(), 'sequence 5 · a second dispose() after the first') !== undefined) {
            return 'sequence 5: the second dispose() did not return void (idempotent)'
          }
          return null
        },
      },
      {
        id: 'sequence 6 · keys: null and keys: [1,2] (F-4) — an empty declared set, then render()',
        run: () => {
          if (create === null) return reason
          for (const bad of [null, [1, 2]]) {
            const container = mountEl()
            const declared: readonly SlotKey[] = []
            const h = create({ container, keys: bad as unknown as readonly SlotKey[] })
            if (h.keys().length !== 0) return `sequence 6 (${brief(bad)}): the malformed keys option declared ${h.keys().length} keys`
            const r = h.setNode('a', nodeEl('n'))
            if (r.refused.length !== 1 || r.refused[0].code !== 'unknown-key') return `sequence 6 (${brief(bad)}): a setNode was not refused as unknown-key`
            const c = coherence(h, declared, `sequence 6 (${brief(bad)})`)
            if (c !== null) return c
          }
          return null
        },
      },
      {
        id: 'sequence 7 · the PRESENT-BUT-UNUSABLE container, then setNode/render/keys/containerFor/dispose (F-7)',
        run: () => {
          if (create === null) return reason
          const declared: readonly SlotKey[] = ['a']
          const h = create({ container: BAD_CONTAINER, keys: declared })
          const s1 = h.setNode('a', nodeEl('n'))
          if (s1.refused.length !== 1 || s1.refused[0].code !== 'container-not-appendable') return 'sequence 7: setNode did not refuse with container-not-appendable'
          const s2 = h.render()
          if (s2.refused.length !== 1 || s2.refused[0].code !== 'container-not-appendable') return 'sequence 7: render did not refuse once per key it attempts to place'
          if (s2.placed.length !== 0) return 'sequence 7: placed is not [] on an unusable container'
          if (JSON.stringify(h.keys()) !== JSON.stringify(declared)) return 'sequence 7: keys() did not return the declared keys'
          if (h.containerFor('a') !== null) return 'sequence 7: containerFor is not null (never undefined) on an unusable container'
          if (drive(() => h.dispose(), 'sequence 7 · dispose()') !== undefined) return 'sequence 7: dispose() did not return void'
          return null
        },
      },
      {
        id: 'sequence 8 · a DETACHED node — setNode, detach, then remove the key (F-9, membership PINNED)',
        run: () => {
          if (create === null) return reason
          const container = mountEl()
          const declared: readonly SlotKey[] = ['a']
          const h = create({ container, keys: declared })
          const n = nodeEl('n')
          h.setNode('a', n)
          h.render()
          n.remove()
          const r = h.remove('a')
          if (r.refused.length !== 0) return `sequence 8: remove refused something (${JSON.stringify(r.refused)}) — the removal is legal`
          if (r.removed.length !== 1 || !sameRef(r.removed[0], n)) {
            return 'sequence 8: removed does NOT contain the caller-detached node by reference (F-9: the membership is PINNED, §7a item 6)'
          }
          if (!h.keys().includes('a')) return "sequence 8: keys() lost 'a' — a dangling ownership (M-12)"
          const c = coherence(h, declared, 'sequence 8')
          return c
        },
      },
    ]
    for (const seq of sequences) rec.run(seq.id, seq.run)
    rec.finish()
  })

  it('P-SH-TP-1 [S-SH-SEED-1] — 60 pinned-seed draws over the 20-shape pool: NO method throws (YES (bounded))', async () => {
    const s = await resolveSurface()
    const create = s.create
    const reason = s.reason ?? 'the module surface is unavailable'
    const rec = new RegisterRow('P-SH-TP-1', 'S-SH-SEED-1')

    /** The per-call assertions of the cell: the call did not throw, the return
     *  is the DECLARED SHAPE for that method, `ok === (refused.length === 0)`
     *  where a `SlotHostResult` is returned, and any refusal code is in the
     *  DECLARED four and never the not-emitted member. */
    const checkCall = (method: HostMethod, value: unknown, label: string): string | null => {
      if (method === 'dispose') {
        return value === undefined ? null : `dispose() returned ${brief(value)} — §2.1 declares void`
      }
      if (method === 'keys') {
        if (!Array.isArray(value)) return `keys() returned ${brief(value)} — §2.1 declares readonly SlotKey[]`
        for (const k of value as readonly unknown[]) if (typeof k !== 'string') return `keys() returned a non-string entry ${brief(k)}`
        return null
      }
      if (method === 'containerFor') {
        if (value !== null && value !== undefined && typeof value !== 'object') {
          return `containerFor() returned ${brief(value)} — §2.1 declares unknown | null`
        }
        return null
      }
      // A result-returning method: the declared shape, I-1, and the code domain.
      const r = asResult(value, label)
      for (const ref of r.refused) {
        if (ref === null || typeof ref !== 'object') return `a refusal is not an object (${brief(ref)})`
        if (!DECLARED_CODES.includes(ref.code)) {
          return `refusal code ${brief(ref.code)} is outside the FOUR declared members (no fifth code)`
        }
        if (ref.code === NOT_EMITTED_CODE) {
          return `a refusal carries '${NOT_EMITTED_CODE}' — F-11: that member is DECLARED-BUT-NOT-EMITTED`
        }
        if (!hasOwn.call(ref, 'key')) return 'a refusal carries no key field (§2.1)'
        if (typeof ref.message !== 'string' || ref.message.length === 0) return 'a refusal carries no non-empty message (§2.1)'
      }
      return null
    }

    for (let i = 0; i < TP_DRAW_INDICES.length; i += 1) {
      const shape = TP_POOL[TP_DRAW_INDICES[i]]
      const cycle = TP_CYCLE_METHODS[i]
      rec.run(`draw ${i + 1} · pool[${TP_DRAW_INDICES[i]}] · ${shape.method}() then ${cycle}() · ${shape.id}`, () => {
        if (create === null) return reason
        const h = create(shape.config())
        const d = tryDrive(`draw ${i + 1}: ${shape.method}() on ${shape.id}`, () => shape.call(h))
        if (d.thrown !== null) {
          return `THREW: ${describeThrown(d.thrown)} — §2.1/§3.3 I-8: no method of this host throws for any input shape (a throwing caller callback is excluded; no such shape is in the pool)`
        }
        const first = checkCall(shape.method, d.value, `draw ${i + 1} — ${shape.method}()`)
        if (first !== null) return first
        // …and the CYCLING method of this draw's index, so all `7` methods are
        // driven across the `60` draws (`§5.5.1`: "Every method is covered").
        const c = tryDrive(`draw ${i + 1}: ${cycle}() on ${shape.id}`, () => driveTpMethod(h, cycle, shape.keys))
        if (c.thrown !== null) {
          return `the cycling ${cycle}() THREW: ${describeThrown(c.thrown)} — §2.1: no method of this host throws for any input shape`
        }
        return checkCall(cycle, c.value, `draw ${i + 1} — cycling ${cycle}()`)
      })
    }
    rec.finish()
  })
})

// ===========================================================================
// SH-REG-1..SH-REG-3 — THE TWO REAL DEFECTS THE BLIND GREENS RUN FOUND,
// RE-PINNED AS REGRESSION ROWS (the RED half of the fix cycle). **The block is
// APPENDED after `§5.5.1`'s register, and the register is NOT edited** (its six
// rows, strategy ids, `20`-shape pool, `155` arithmetic and caps are exactly as
// they were — the arithmetic PRE-2 checks is untouched). No existing row's id,
// statement, drive or expectation is changed by this block.
//
// THE EVIDENCE THESE ROWS PIN (`docs/specs/slothost-greens.md`, read):
//   · `§8.1` `SH-G-58` — **the run's one FAIL**: the control
//     `setNode('a', c1)` → `setNode('a', c2)` reads `removedLen:1` /
//     `removed0IsC1:true`, while the drive `setNode('a', n1)` →
//     `setNode('b', n1)` (the `M-9` move) → `setNode('a', n2)` reads
//     `replRemovedLen:0` / `removed0IsN1:false` (with `replPlaced:['a','b']`,
//     `aHoldsN2:true`, `bHoldsN1:true`). **The same host reports the replaced
//     node when no move precedes the write and does NOT report it when one
//     does** — the move erases the ownership bookkeeping the report derives
//     from.
//   · `§8.2` `O-1` — with **no factory**, `container: 42` and `container:
//     'div'` accept `setNode('a', node)` (`ok:true`, `refused:[]`,
//     `placed:[]`), while `container: {}` refuses it (`ok:false`,
//     `'container-not-appendable'`): a non-object container is read as ABSENT
//     instead of PRESENT-BUT-UNUSABLE.
//
// THE CLAUSES THESE ROWS ARE DERIVED FROM (`docs/specs/slothost.md`, read in
// its RECONCILED 2026-09-27 text):
//   · `§2.1`'s `removed` doc string — *"Every node this call REMOVED (the ones
//     the host had placed), by reference"* — with `§2.4` items 1–2 (*the host
//     owns exactly the nodes it placed; on a replacement it removes exactly
//     those*) and `§2.4` item 6 / `§3.1 M-9` (*a move leaves the first key
//     holding no host-placed node*). The call that ends the host's ownership of
//     the node under a key is the call that reports it — the pin `F-9`'s ruling
//     gives the caller-detached shape, on the same bookkeeping path.
//   · `§3.1 M-14`'s reconciled cell + `§3.2 F-7`'s trigger list + **the
//     PER-METHOD TABLE under `§3.2 F-7`**: `null`/`undefined` are the ABSENT
//     class (`§3.2 F-6`: no refusal, `ok === true`, `refused` `[]`, `placed`
//     `[]`, `containerFor(k)` `null`), while `{}` / `42` / `'div'` are the
//     PRESENT-BUT-UNUSABLE class — **one refusal per attempted node write**,
//     `code === 'container-not-appendable'` (the EMITTED code), `ok === false`,
//     `placed` `[]` — with `setOrder` `ok === true` on BOTH classes (write-free)
//     and a `remove` with no host-owned node a no-op on BOTH, and the READS
//     (`keys()`, `containerFor()`) returning their declared shape and never
//     refusing (`I-8`'s scope clause).
//   · `§2.1`'s refusal-code domain: `'no-container'` is DECLARED-BUT-NOT-EMITTED
//     (`F-11`'s negative), so no cell of these rows may carry it.
//
// **NO `§3` ID IS CLAIMED BY THESE ROWS.** The clauses they pin already have
// ids: the reconciliation changed the CONTRACT's reading of `M-14`
// (`{}`/`42`/`'div'` are ONE class — the unusable one) without adding a row, and
// `§8.1` says in writing that `§3.1` has no "move, then write for the vacated
// key" row. Neither gap is closed from here: these rows are the regression pins,
// authored RED-first, and the module is NOT touched by this pass. **What these
// rows deliberately do NOT pin** (recorded, never guessed — see the rows'
// comments): the MOVE's own `removed` membership (`M-9` is silent; `§8.2`
// `O-2` records `removedLen:0`) and the `removed` membership of a `remove()` on
// a container state where nothing was ever placeable.
//
// EXPECTED VERDICTS OF THIS PASS (measured, not assumed — each row logs its
// own `SH-REG record ::` line carrying the values verbatim):
//   `SH-REG-1` **RED** (the `removed` half; its control half is green) ·
//   `SH-REG-2` **GREEN** (the absent class — the control for `SH-REG-3`) ·
//   `SH-REG-3` **RED** on the `42` and `'div'` cells, green on the `{}` control
//   cell.
// ===========================================================================
describe('SH-REG — the two blind-greens defects re-pinned (regression rows; no §3 id is claimed)', () => {
  /** ONE `M-14` container value driven through the SAME call sequence on ONE
   *  container-source configuration. It returns the observations AND the breaks
   *  of the observables the two container-state classes SHARE, so the
   *  class-specific halves are asserted by the calling row and every cell of a
   *  cell table is driven before any cell's failure can stop the row. */
  type CellObserved = {
    id: string
    setNodeOk: boolean
    setNodeRefused: number
    setNodeCodes: string[]
    setNodePlacedLen: number
    renderOk: boolean
    renderRefused: number
    renderCodes: string[]
    setOrderOk: boolean
    setOrderRefused: number
    setOrderOrder: string[]
    removeUnownedOk: boolean
    removeUnownedRefused: number
    removeOwnedOk: boolean
    removeOwnedRefused: number
    removeOwnedCodes: string[]
    removeOwnedRemovedLen: number
    keysReported: string[]
    containerFor: unknown[]
    disposeVoid: boolean
    disposeAgainVoid: boolean
    allCodes: string[]
  }

  function driveContainerCell(
    mk: CreateSlotHost,
    id: string,
    value: unknown,
  ): { o: CellObserved; breaks: string[] } {
    const seen: SlotHostRefusal[] = []
    const h = mk({
      container: value,
      keys: ['a', 'b'],
      refuse: (ref: SlotHostRefusal) => {
        seen.push(ref)
      },
    })
    const node = nodeEl(`${id}-node`)
    const lbl = (call: string): string => `SH-REG ${id} — ${call}`
    // Every call below is driven through the file's own no-throw boundary
    // (`§2.1`/`§3.3 I-8`: no method throws, for any input) and every
    // result-returning call through `asResult` (the declared `SlotHostResult`
    // field set + `I-1`), so "no throw" and the declared shapes are asserted on
    // both classes.
    const setNode = asResult(drive(() => h.setNode('a', node), lbl("setNode('a', n)")), lbl("setNode('a', n)"))
    const render = asResult(drive(() => h.render(), lbl('render()')), lbl('render()'))
    const setOrder = asResult(
      drive(() => h.setOrder(['b', 'a']), lbl("setOrder(['b','a'])")),
      lbl("setOrder(['b','a'])"),
    )
    // A `remove` on a key with NO host-owned node — the class-COMMON no-op half
    // of `F-7`'s per-method table.
    const removeUnowned = asResult(
      drive(() => h.remove('b'), lbl("remove('b') — no host-owned node")),
      lbl("remove('b') — no host-owned node"),
    )
    // The READS, driven AS reads (`I-8`'s scope clause: no `ok`, no `refused`,
    // never funnelled through the result helper) — pinned BY VALUE.
    const keysReported = [...(drive(() => h.keys(), lbl('keys()')) as readonly SlotKey[])]
    const readKeys = ['a', 'b', 'nope']
    const containerFor = readKeys.map((k) => drive(() => h.containerFor(k), lbl(`containerFor('${k}')`)))
    // A `remove` on the key whose DECLARATION the host holds: the table's
    // `remove` row's F-7 branch on the unusable class, a no-op on the absent
    // class. Its `removed` membership is RECORDED, never scored (see the rows).
    const removeOwned = asResult(
      drive(() => h.remove('a'), lbl("remove('a') — the declaration stands")),
      lbl("remove('a') — the declaration stands"),
    )
    const disposeVoid = drive(() => h.dispose(), lbl('dispose()')) === undefined
    const disposeAgainVoid = drive(() => h.dispose(), lbl('dispose() #2 (idempotent)')) === undefined

    const refusedLists: ReadonlyArray<readonly SlotHostRefusal[]> = [
      setNode.refused,
      render.refused,
      setOrder.refused,
      removeUnowned.refused,
      removeOwned.refused,
    ]
    const allRefusals = [...refusedLists.flat(), ...seen]
    const breaks: string[] = []
    // ---- the class-COMMON observables (BOTH columns of the per-method table,
    // plus `§2.1`'s code domain and `I-1`/`I-2`/`I-7`/`I-8`) ----------------
    for (const ref of allRefusals) {
      if (ref.code === NOT_EMITTED_CODE) {
        breaks.push(`${id}: a refusal carries '${NOT_EMITTED_CODE}' — F-11: that member is DECLARED-BUT-NOT-EMITTED`)
      } else if (!EMITTED_CODES.includes(ref.code)) {
        breaks.push(`${id}: a refusal carries '${ref.code}', outside the THREE emitted members (§2.1)`)
      }
    }
    if (setNode.placed.length !== 0) {
      breaks.push(`${id}: setNode reported placed ${JSON.stringify(setNode.placed)} — placed is [] on BOTH container states`)
    }
    if (render.placed.length !== 0) {
      breaks.push(`${id}: render reported placed ${JSON.stringify(render.placed)} — placed is [] on BOTH container states`)
    }
    if (!setOrder.ok || setOrder.refused.length !== 0) {
      breaks.push(
        `${id}: setOrder read ok=${String(setOrder.ok)} with ${JSON.stringify(setOrder.refused.map((r) => r.code))} — it is WRITE-FREE and ok === true on BOTH columns (F-7's per-method table)`,
      )
    }
    if (JSON.stringify(keysReported) !== JSON.stringify([...setOrder.order])) {
      breaks.push(
        `${id}: keys() reads ${JSON.stringify(keysReported)} while the projected order is ${JSON.stringify([...setOrder.order])} — the projection is the host's own state (§2.5 item 3)`,
      )
    }
    for (const k of ['a', 'b']) {
      if (keysReported.indexOf(k) === -1) breaks.push(`${id}: keys() DROPPED the DECLARED key '${k}' (I-2/the reads' declared shape)`)
    }
    containerFor.forEach((v, i) => {
      if (v !== null) {
        breaks.push(
          `${id}: containerFor('${readKeys[i]}') returned ${brief(v)} — BY VALUE null (never undefined) on BOTH columns of the per-method table`,
        )
      }
    })
    if (!removeUnowned.ok || removeUnowned.refused.length !== 0) {
      breaks.push(
        `${id}: remove() on a key with NO host-owned node read ok=${String(removeUnowned.ok)} with ${JSON.stringify(removeUnowned.refused.map((r) => r.code))} — a NO-OP with ok === true on BOTH columns (the unifying clause: it attempts no node write)`,
      )
    }
    if (!disposeVoid || !disposeAgainVoid) {
      breaks.push(`${id}: dispose() did not return void, or was not idempotent (§2.1; I-5)`)
    }

    const o: CellObserved = {
      id,
      setNodeOk: setNode.ok,
      setNodeRefused: setNode.refused.length,
      setNodeCodes: setNode.refused.map((r) => r.code),
      setNodePlacedLen: setNode.placed.length,
      renderOk: render.ok,
      renderRefused: render.refused.length,
      renderCodes: render.refused.map((r) => r.code),
      setOrderOk: setOrder.ok,
      setOrderRefused: setOrder.refused.length,
      setOrderOrder: [...setOrder.order],
      removeUnownedOk: removeUnowned.ok,
      removeUnownedRefused: removeUnowned.refused.length,
      removeOwnedOk: removeOwned.ok,
      removeOwnedRefused: removeOwned.refused.length,
      removeOwnedCodes: removeOwned.refused.map((r) => r.code),
      removeOwnedRemovedLen: removeOwned.removed.length,
      keysReported,
      containerFor,
      disposeVoid,
      disposeAgainVoid,
      allCodes: allRefusals.map((r) => r.code),
    }
    return { o, breaks }
  }

  it('SH-REG-1 (§2.1 `removed` doc string × §2.4 items 1–2/6 × §3.1 M-9/M-10; greens §8.1 `SH-G-58`) — a node REPLACED after an M-9 MOVE is reported in `removed`, exactly as the same host reports it with NO move', async () => {
    const { create } = await surface('SH-REG-1')
    // =====================================================================
    // THE CONTROL HALF (no move) — the `M-10` shape, on the SAME host shape as
    // the drive below (two declared keys, the harness's injected factory). It
    // is the row's NON-VACUITY half: if this half did not report the replaced
    // node, the row's RED claim would be unfalsifiable.
    // =====================================================================
    const controlContainer = mountEl()
    const control = create({ container: controlContainer, keys: ['a', 'b'] })
    const c1 = nodeEl('c1')
    const c2 = nodeEl('c2')
    control.setNode('a', c1)
    const ctrl = asResult(
      drive(() => control.setNode('a', c2), "SH-REG-1 control — setNode('a', c2), NO move precedes it"),
      "SH-REG-1 control — setNode('a', c2), NO move precedes it",
    )
    // =====================================================================
    // THE DRIVE — `setNode('a', n1)` → `setNode('b', n1)` (the `M-9` move) →
    // `setNode('a', n2)` (the replacement the RED claim is about). The move's
    // OWN `removed` membership is RECORDED, never scored: `M-9` does not pin it
    // and `§8.2` `O-2` records the observed `0` as an open reading (`§8.4`
    // item 1 lists both readings as derivable).
    // =====================================================================
    const driveContainer = mountEl()
    const h = create({ container: driveContainer, keys: ['a', 'b'] })
    const n1 = nodeEl('n1')
    const n2 = nodeEl('n2')
    h.setNode('a', n1)
    const move = asResult(
      drive(() => h.setNode('b', n1), "SH-REG-1 — setNode('b', n1) (the M-9 move)"),
      "SH-REG-1 — setNode('b', n1) (the M-9 move)",
    )
    const afterMoveA = [...childrenOf(h.containerFor('a'))]
    const afterMoveB = [...childrenOf(h.containerFor('b'))]
    const repl = asResult(
      drive(() => h.setNode('a', n2), "SH-REG-1 — setNode('a', n2) (the replacement of the vacated key)"),
      "SH-REG-1 — setNode('a', n2) (the replacement of the vacated key)",
    )
    const kidsA = [...childrenOf(h.containerFor('a'))]
    const kidsB = [...childrenOf(h.containerFor('b'))]
    const replHasN1 = containsRef(repl.removed, n1)
    const replHasN2 = containsRef(repl.removed, n2)
    console.log(
      `SH-REG record :: ${JSON.stringify({
        row: 'SH-REG-1',
        control: { placed: [...ctrl.placed], removedLen: ctrl.removed.length, removed0IsC1: ctrl.removed[0] === c1 },
        move: { ok: move.ok, placed: [...move.placed], removedLen: move.removed.length },
        repl: {
          ok: repl.ok,
          placed: [...repl.placed],
          order: [...repl.order],
          removedLen: repl.removed.length,
          removedContainsN1: replHasN1,
          removedContainsN2: replHasN2,
          aHoldsN2: kidsA.length === 1 && kidsA[0] === n2,
          aHoldsN1: containsRef(kidsA, n1),
          bHoldsN1: kidsB.length === 1 && kidsB[0] === n1,
        },
      })}`,
    )
    // ---- THE CONTROL'S ASSERTIONS (`M-10`; expected GREEN) ---------------
    expect(ctrl.removed.length, 'SH-REG-1 control (no move): the replaced node IS reported — `removed` holds exactly one node').toBe(1)
    expect(ctrl.removed[0], 'SH-REG-1 control (no move): `removed[0]` IS c1, by reference (`§2.1`\'s `removed` doc string)').toBe(c1)
    expect(ctrl.placed, "SH-REG-1 control (no move): `placed` is ['a'] — the replacement keeps the key placed (M-10)").toEqual(['a'])
    // ---- `M-9`'s OWN HALVES (expected GREEN; `M-9` pins the move's tree and
    // its `placed`) --------------------------------------------------------
    expect(afterMoveA, "SH-REG-1: after the move, containerFor('a') NO LONGER holds n1 (§2.4 item 6 / M-9)").toEqual([])
    expect(afterMoveB.length, "SH-REG-1: after the move, containerFor('b') holds exactly one child").toBe(1)
    expect(afterMoveB[0], 'SH-REG-1: …and it IS n1, by reference (M-9)').toBe(n1)
    expect(move.placed, "SH-REG-1: the move's own result reads placed === ['b'] (M-9)").toEqual(['b'])
    // ---- THE TREE AFTER THE REPLACEMENT (expected GREEN) -----------------
    expect(kidsA.length, "SH-REG-1: after setNode('a', n2), containerFor('a') holds exactly one child").toBe(1)
    expect(kidsA[0], "SH-REG-1: …and it IS n2, by reference (M-10's tree half)").toBe(n2)
    expect(kidsB.length, "SH-REG-1: the move SURVIVES the replacement — containerFor('b') still holds exactly one child").toBe(1)
    expect(kidsB[0], "SH-REG-1: …and it IS still n1, by reference (§2.4 item 6)").toBe(n1)
    expect(repl.ok, 'SH-REG-1: the replacement is a VALID call — ok === true with no refusal (§3.3 I-1)').toBe(true)
    expect(repl.refused, 'SH-REG-1: refused is [] — nothing about this drive is a refusal').toEqual([])
    expect(repl.order, 'SH-REG-1: order is unchanged by the move or the replacement').toEqual(['a', 'b'])
    expect(repl.order.filter((k) => k === 'a').length, "SH-REG-1: 'a' still appears in order EXACTLY once (I-2)").toBe(1)
    expect(repl.placed, "SH-REG-1: placed is a SUBSET of order and keeps the move's placement of 'b' (I-7)").toContain('b')
    expect(replHasN2, 'SH-REG-1: `removed` does NOT name the node this call PLACED (n2) — it names the node it relinquished').toBe(false)
    // ---- THE RED CLAIM, LAST, so every green half above has already run ---
    expect(
      replHasN1,
      `SH-REG-1 — RED, §2.1's \`removed\` doc string ("Every node this call REMOVED (the ones the host had placed), by reference") + §2.4 items 1–2 + §3.1 M-9/M-10: the call setNode('a', n2) REPLACED the node the host had placed under 'a' — n1, which the preceding M-9 move put under 'b' — so n1 MUST be reported BY REFERENCE in this call's \`removed\`; the move must NOT erase the ownership bookkeeping the report is derived from. OBSERVED: removed.length=${repl.removed.length}, removedContainsN1=${String(replHasN1)}, removed=${brief(repl.removed)}. CONTROL HALF OF THIS SAME ROW (no move, M-10): removed.length=${ctrl.removed.length}, removed[0] === c1 → ${String(ctrl.removed[0] === c1)}.`,
    ).toBe(true)
  })

  it('SH-REG-2 (§3.1 M-14 ABSENT half + §3.2 F-6 + the per-method table column (a); greens §8.2 O-1) — `container: null` / `undefined` is a supported NO-OP on BOTH container-source configurations: NO refusal, declared keys intact, nothing placeable', async () => {
    const { create, bare } = await surface('SH-REG-2')
    // =====================================================================
    // THE ABSENT CLASS, and the CONTROL for `SH-REG-3`: the SAME drive sequence
    // (the shared `driveContainerCell`) on the class the contract allows NO
    // refusal, so a red in `SH-REG-3` cannot be read as a harness artefact.
    // The two configurations are driven because the `container` value is
    // classified BEFORE the source is consulted (`§2.1`'s container-source
    // clause item 4: an absent container AND an absent factory are the SAME
    // no-op state, once, not two stacked degradations).
    // =====================================================================
    const fails: string[] = []
    const observed: CellObserved[] = []
    const cells: Array<{ id: string; value: unknown; mk: CreateSlotHost }> = []
    for (const [valueId, value] of [
      ['null', null],
      ['undefined', undefined],
    ] as Array<[string, unknown]>) {
      for (const [sourceId, mk] of [
        ['no factory (bare)', bare],
        ["the harness factory (§5.2), absent container", create],
      ] as Array<[string, CreateSlotHost]>) {
        cells.push({ id: `container: ${valueId} · ${sourceId}`, value, mk })
      }
    }
    for (const cell of cells) {
      const { o, breaks } = driveContainerCell(cell.mk, cell.id, cell.value)
      observed.push(o)
      fails.push(...breaks)
      // The absent class produces NO refusal on ANY call, and every
      // result-returning call is ok === true (§3.2 F-6, M-14's admitted half).
      if (!o.setNodeOk || o.setNodeRefused !== 0) {
        fails.push(
          `${cell.id}: setNode('a', n) read ok=${String(o.setNodeOk)} with ${o.setNodeRefused} refusal(s) ${JSON.stringify(o.setNodeCodes)} — §3.2 F-6: the absent container is a supported no-op, NOT a refusal (ok === true, refused [])`,
        )
      }
      if (!o.renderOk || o.renderRefused !== 0) {
        fails.push(
          `${cell.id}: render() read ok=${String(o.renderOk)} with ${o.renderRefused} refusal(s) ${JSON.stringify(o.renderCodes)} — §3.2 F-6 / column (a): no refusal, ok === true`,
        )
      }
      if (!o.removeOwnedOk || o.removeOwnedRefused !== 0) {
        fails.push(
          `${cell.id}: remove('a') (the declaration stands) read ok=${String(o.removeOwnedOk)} with ${o.removeOwnedRefused} refusal(s) — column (a)'s remove row: no refusal, ok === true; its removed.length=${o.removeOwnedRemovedLen} is RECORDED, never scored (the contract does not pin that membership)`,
        )
      }
      if (o.allCodes.length !== 0) {
        fails.push(
          `${cell.id}: the absent class produced refusal code(s) ${JSON.stringify(o.allCodes)} — it produces NONE (F-6; never '${NOT_EMITTED_CODE}', F-11)`,
        )
      }
    }
    console.log(`SH-REG record :: ${JSON.stringify({ row: 'SH-REG-2', cells: observed })}`)
    expect(
      fails,
      `SH-REG-2 — §3.1 M-14's ABSENT half + §3.2 F-6 + the per-method table's column (a): container: null/undefined must be the supported no-op on both container-source configurations (no throw, ok === true, refused [], placed [], containerFor(k) === null by value, the DECLARED keys reported, no '${NOT_EMITTED_CODE}'), while setOrder stays ok === true and a remove with no host-owned node is a no-op.`,
    ).toEqual([])
  })

  it("SH-REG-3 (§3.1 M-14's PRESENT-BUT-UNUSABLE half + §3.2 F-7's per-method table column (b); greens §8.2 O-1) — `{}`, `42` and `'div'` take the F-7 REFUSING path ('container-not-appendable' per attempted node write) on BOTH container-source configurations", async () => {
    const { create, bare } = await surface('SH-REG-3')
    // =====================================================================
    // THE UNUSABLE CLASS — the CONTRACT puts `{}`, `42` and `'div'` in ONE class
    // (`§3.1 M-14`'s reconciled cell: *"the five trigger values … are TWO
    // CONTAINER STATES, not one"*, and `§3.2 F-7`'s trigger list), and the
    // per-method table's column (b) gives that class the F-7 refusal on every
    // call that attempts a NODE WRITE. `{}` is driven as the row's CONTROL cell
    // (it refuses today, `SH-G-16`/`SH-G-28`), so the two red cells cannot make
    // the row pass or fail vacuously.
    // =====================================================================
    const fails: string[] = []
    const observed: CellObserved[] = []
    const cells: Array<{ id: string; value: unknown; mk: CreateSlotHost }> = []
    for (const [valueId, value] of [
      ['{}', {}],
      ['42', 42],
      ["'div'", 'div'],
    ] as Array<[string, unknown]>) {
      for (const [sourceId, mk] of [
        ['no factory (bare)', bare],
        ['the harness factory (§5.2)', create],
      ] as Array<[string, CreateSlotHost]>) {
        cells.push({ id: `container: ${valueId} · ${sourceId}`, value, mk })
      }
    }
    for (const cell of cells) {
      const { o, breaks } = driveContainerCell(cell.mk, cell.id, cell.value)
      observed.push(o)
      fails.push(...breaks)
      // ONE refusal per attempted NODE WRITE, with the EMITTED code, and
      // ok === false — the three write-attempt calls of the shared drive.
      const oneRefusal = (call: string, ok: boolean, codes: string[]): void => {
        if (ok) {
          fails.push(
            `${cell.id}: ${call} read ok === true — §3.2 F-7 column (b) requires ok === false for a call that ATTEMPTS a node write into a present-but-unusable container`,
          )
        }
        if (codes.length !== 1) {
          fails.push(
            `${cell.id}: ${call} produced ${codes.length} refusal(s) ${JSON.stringify(codes)} — the table's "once per attempted placement" is read as ONE refusal per attempted node write`,
          )
        } else if (codes[0] !== 'container-not-appendable') {
          fails.push(
            `${cell.id}: ${call} produced code ${JSON.stringify(codes[0])} — the EMITTED code for this class is 'container-not-appendable', NEVER '${NOT_EMITTED_CODE}' (F-11)`,
          )
        }
      }
      oneRefusal("setNode('a', n)", o.setNodeOk, o.setNodeCodes)
      oneRefusal('render()', o.renderOk, o.renderCodes)
      oneRefusal("remove('a') (the declaration stands)", o.removeOwnedOk, o.removeOwnedCodes)
      // The class's every refusal is that ONE code — no fifth code, and never
      // the declared-but-not-emitted member.
      const foreign = o.allCodes.filter((c) => c !== 'container-not-appendable')
      if (foreign.length !== 0) {
        fails.push(
          `${cell.id}: refusal code(s) ${JSON.stringify(foreign)} are outside this class's code — every refusal here is 'container-not-appendable' (§2.1's emitted domain; F-11's negative)`,
        )
      }
    }
    console.log(`SH-REG record :: ${JSON.stringify({ row: 'SH-REG-3', cells: observed })}`)
    expect(
      fails,
      `SH-REG-3 — §3.1 M-14's PRESENT-BUT-UNUSABLE half (the three values {}, 42 and 'div' are ONE class) + §3.2 F-7's per-method table column (b): each of the three values must take the F-7 REFUSING path on both container-source configurations — ok === false with exactly one 'container-not-appendable' refusal per attempted node write (setNode / render / remove-with-ownership), while placed stays [], containerFor(k) is null by value, keys() reports the DECLARED keys, setOrder stays ok === true, a remove with no host-owned node is a no-op, and no refusal carries '${NOT_EMITTED_CODE}'.`,
    ).toEqual([])
  })
})
