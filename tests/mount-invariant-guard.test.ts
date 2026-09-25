// tests/mount-invariant-guard.test.ts
// ===========================================================================
// U-MOUNTGUARD · wave D · **THE RED SET** (RCA-1)
// Contract: docs/specs/mount-invariant-guard.md (`§2.1` exact surface, `§2.2`
// prohibitions, `§2.3` the short must-not list, `§2.4` how the probe reads the
// tree, `§3.1`/`§3.2`/`§3.3` the row tables, `§4` the red), `§5.1` diff scope,
// `§5.2` legs, `§5.5` the zero-row register exemption.
//
// AUTHORED ORDER (§4.2 step 1): `I-1..I-6`, `M-1..M-16`, `F-1..F-10` — the
// describe blocks below are in exactly that order (plus the harness
// preconditions and the `§2.1`/`§2.2` surface+prohibition rows, which the spec
// declares in its own tables but does not give `M`/`I`/`F` ids).
//
// THE UNIT'S ONE DECISIVE FACT (§4.1). The rows below are written FIRST and
// RUN before any implementation. `M-3` is the cycle-2 cross-envelope drive and
// it is **the one row whose OBSERVATION is written against the TREE, not
// against the module**: it counts the mount's engine-emitted direct children
// through a local, in-file mirror of `§2.4`'s read (direct children only;
// `data-node-id` read through `getAttribute` when the child exposes it, else
// parsed out of the child's serialized form; an EMPTY value is NOT
// engine-emitted, `F-9`). So the raw count is obtainable BEFORE the module
// exists — which is the reason the red can settle rule 3 at all. Every raw
// observation is reported in the assertion MESSAGES (raw `count`, raw
// `nodeIds`, raw `mount.children.length`), never as a summary (§4.1).
//
// THE IMPORT BOUNDARY. `src/shared/mount-invariant-guard.ts` DOES NOT EXIST, so
// this file may not statically import it. The spec-named surface is reached
// through the repo's established technique — a STRUCTURAL TYPE plus a CAST at
// the import boundary (`tests/dom-shim-remove-attribute.test.ts:35-38`,
// `tests/host-guard-panes.test.ts:74-80`) — adapted to a NOT-YET-EXISTING
// module: the boundary is (1) an fs existence assertion and (2) a computed
// dynamic specifier (so Vite cannot fail the whole file's TRANSFORM on an
// unresolvable import), and every row then fails as an ASSERTION
// ("the module/export is not there yet") rather than as a module-collection
// error that would take the whole red set with it. `PRE-1` proves the boundary
// itself resolves, against an existing module.
//
// WHAT THIS FILE DOES NOT DO (§4.3, §5.1): it touches no `src/**` file, adds
// no shim member (`src/shared/dom-shim.ts` is host-owned test code at its
// landed 143 lines and this unit ships NO shim change — `§2.4.4`), edits no
// existing test, and runs nothing but the node suite (the optional real-DOM
// `[U]` row of `§5.2` is NOT taken: it needs the `ui` leg and is
// precondition-gated).
// ===========================================================================
import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import type { ShimElement } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'

const hasOwn = Object.prototype.hasOwnProperty

beforeAll(() => {
  installShim()
})

// ===========================================================================
// The §2.1 contract shapes, MIRRORED as structural types (the module cannot be
// imported for its types — it does not exist yet). Field names, optionality and
// the exact key sets are `§2.1`'s, and they are asserted as such by `S-1`/`S-2`.
// ===========================================================================
type MountRootObservation = { nodeId: string; element: unknown; serialization: string }
type MountViolationCode =
  | 'no-root'
  | 'multiple-roots'
  | 'root-identity-mismatch'
  | 'mount-not-appendable'
  | 'mount-reference-mismatch'
  | 'expect-mismatch'
const VIOLATION_CODES: readonly MountViolationCode[] = [
  'no-root',
  'multiple-roots',
  'root-identity-mismatch',
  'mount-not-appendable',
  'mount-reference-mismatch',
  'expect-mismatch',
]
type MountViolation = {
  code: MountViolationCode
  message: string
  count: number
  nodeIds: readonly string[]
  expectedRootNodeId?: string
}
type MountInvariantResult = {
  ok: boolean
  count: number
  roots: readonly MountRootObservation[]
  foreignSiblings: readonly unknown[]
  mount: unknown
  violation: MountViolation | null
  expectedRootNodeId?: string
}
type MountExpectation = { rootNodeId?: string | null; mount?: unknown }
type ProbeFn = (mount: unknown, expect?: MountExpectation | null) => MountInvariantResult
type AssertFn = (mount: unknown, expect?: MountExpectation | null) => MountInvariantResult

/** The §2.1 result key set for a cardinality-only probe (no `expect.rootNodeId`
 *  supplied): `expectedRootNodeId` is the ONE optional field. */
const RESULT_KEYS = ['count', 'foreignSiblings', 'mount', 'ok', 'roots', 'violation'].sort()
const RESULT_KEYS_WITH_EXPECTATION = [...RESULT_KEYS, 'expectedRootNodeId'].sort()

const MODULE_SRC = new URL('../src/shared/mount-invariant-guard.ts', import.meta.url)
/** The runtime specifier of `§5.1` row 1, assembled at RUN time so the
 *  unresolvable import cannot fail this file's transform while the module is
 *  absent (the repo's `.js` → `.ts` resolution still applies at run time). */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'mount-invariant-guard.js'].join('/')

let surfaceCache: { probe: ProbeFn; assertion: AssertFn; mod: Record<string, unknown> } | null = null

/** THE IMPORT BOUNDARY (§2.1). Structural type + cast; a row that reaches it
 *  before the module lands fails as an ASSERTION carrying `label` (which the
 *  cardinality rows fill with their RAW tree observations, §4.1). */
async function guard(label: string): Promise<{ probe: ProbeFn; assertion: AssertFn; mod: Record<string, unknown> }> {
  if (surfaceCache) return surfaceCache
  expect(
    existsSync(MODULE_SRC),
    `RED — U-MOUNTGUARD red set: the module of §5.1 row 1 does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). The contract surface of §2.1 (probeMountInvariant, assertMountInvariant) is what this row calls. [${label}]`,
  ).toBe(true)
  const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
  const probe = mod['probeMountInvariant']
  const assertion = mod['assertMountInvariant']
  expect(typeof probe, `RED — §2.1's probeMountInvariant is not exported yet. [${label}]`).toBe('function')
  expect(typeof assertion, `RED — §2.1's assertMountInvariant is not exported yet. [${label}]`).toBe('function')
  surfaceCache = { probe: probe as ProbeFn, assertion: assertion as AssertFn, mod }
  return surfaceCache
}

// ===========================================================================
// THE MEASUREMENT INSTRUMENT — a local, in-file mirror of §2.4's read of the
// tree, used ONLY by the rows whose subject is CARDINALITY (so the raw count is
// obtainable before the module exists, §4.2 step 2). It is not an
// implementation of the module under test: it is the instrument that measures
// the same fact independently, and `PRE-2` self-checks it.
// ===========================================================================
type RawObservation = {
  /** `mount.children.length` exactly as read. */
  childCount: number
  /** Direct children carrying a NON-EMPTY `data-node-id` (§2.4.1 + `F-9`). */
  engineChildCount: number
  /** Their values, in document order, duplicates included (`F-8`). */
  nodeIds: string[]
  /** Every direct child's serialization, as the shim emits it. */
  serializations: (string | null)[]
  /** The MOUNT's own serialization read (`mount.innerHTML`), recorded so the
   *  `M-11`/`M-12` red report carries §3.1 M-11's "serialization side of the
   *  same fact" verbatim alongside the raw child count. */
  mountHTML: string | null
}

function surfaceOf(child: unknown): Record<string, unknown> | null {
  if (child === null || typeof child !== 'object') return null
  return child as Record<string, unknown>
}

/** `§2.4.2`: a child exposing `getAttribute('data-node-id')` is read through
 *  it; a null/absent/non-string value is NOT an engine id (`F-9`), and a child
 *  with no readable attribute surface yields `null` (falls through to the
 *  serialization read). */
function readNodeIdViaAttribute(child: unknown): string | null {
  const surface = surfaceOf(child)
  if (surface === null) return null
  const getAttribute = surface['getAttribute']
  if (typeof getAttribute !== 'function') return null
  try {
    const value = (getAttribute as (k: string) => unknown).call(child, 'data-node-id')
    return typeof value === 'string' && value.length > 0 ? value : null
  } catch {
    return null
  }
}

/** The child's serialized form, or `null` when the child exposes none (`F-7`). */
function serializationOf(child: unknown): string | null {
  const surface = surfaceOf(child)
  if (surface === null) return null
  try {
    const value = surface['outerHTML']
    return typeof value === 'string' ? value : null
  } catch {
    return null
  }
}

/** `§2.4.2`'s second read: parse the value out of the serialized form. */
function readNodeIdViaSerialization(child: unknown): string | null {
  const serial = serializationOf(child)
  if (serial === null) return null
  const m = /data-node-id="([^"]*)"/.exec(serial)
  if (!m) return null
  return m[1].length > 0 ? m[1] : null
}

function rawNodeId(child: unknown): string | null {
  const viaAttr = readNodeIdViaAttribute(child)
  if (viaAttr !== null) return viaAttr
  return readNodeIdViaSerialization(child)
}

/** The mount's own serialization read, or `null` when it exposes none. */
function mountSerializationOf(mount: unknown): string | null {
  const surface = surfaceOf(mount)
  if (surface === null) return null
  try {
    const value = surface['innerHTML']
    return typeof value === 'string' ? value : null
  } catch {
    return null
  }
}

/** The raw observation of a mount: direct children only (§2.4.1). */
function observeMount(mount: unknown): RawObservation {
  const surface = surfaceOf(mount)
  const children = surface !== null && Array.isArray(surface['children']) ? (surface['children'] as unknown[]) : []
  const nodeIds = children.map(rawNodeId).filter((v): v is string => v !== null)
  return {
    childCount: children.length,
    engineChildCount: nodeIds.length,
    nodeIds,
    serializations: children.map(serializationOf),
    mountHTML: mountSerializationOf(mount),
  }
}

/** The compact, verbatim form of an observation, used in assertion messages
 *  (§4.1: the raw count, the raw nodeIds, the raw child count — never a
 *  summary). */
function verbatimOf(obs: RawObservation): string {
  return JSON.stringify({
    childCount: obs.childCount,
    count: obs.engineChildCount,
    nodeIds: obs.nodeIds,
    mountHTML: obs.mountHTML,
  })
}

/** The verbatim form of a labelled SEQUENCE of observations. `withHTML` adds
 *  each point's own serialization read — used only where the serialization
 *  side IS the cited fact (`M-11`/`M-12`; `tests/runtime-host.test.ts:150-161`). */
function verbatimList(entries: Array<{ point: string; obs: RawObservation }>, withHTML = false): string {
  return JSON.stringify(
    entries.map((e) => ({
      point: e.point,
      childCount: e.obs.childCount,
      count: e.obs.engineChildCount,
      nodeIds: e.obs.nodeIds,
      ...(withHTML ? { mountHTML: e.obs.mountHTML } : {}),
    })),
  )
}

/** The raw cardinality assertion — its MESSAGE carries the verbatim
 *  observation (§4.1: raw count, raw nodeIds, raw child count). */
function expectRawEngineRoots(mount: unknown, label: string, expected: number): RawObservation {
  const obs = observeMount(mount)
  expect(
    obs.engineChildCount,
    `${label} — RAW TREE OBSERVATION (engine-emitted DIRECT children of the mount): ${verbatimOf(obs)}`,
  ).toBe(expected)
  return obs
}

// ===========================================================================
// The hosts. `bootstrap()` renders the graph into the mount (M-1's state);
// every re-derivation below goes through the landed Runtime surface
// (`loadEnvelope`, `loadDoc`, `teardown`, `codeLoad`, `codeLoadBatch`,
// `exportLegacy`, `exportSerialized` — §1.4's four paths).
// ===========================================================================
function freshDemo(): { runtime: Runtime; mount: ShimElement } {
  const mount = mountEl()
  const runtime = new Runtime({ mount: mount as never, envelope: demoEnvelope() as never })
  return { runtime, mount }
}

function bootedDemo(): { runtime: Runtime; mount: ShimElement } {
  const host = freshDemo()
  host.runtime.bootstrap()
  return host
}

/** A local envelope whose ROOT carries an authored `props.id`/`css.id`: `M-4`
 *  reads its expectation FROM THE GRAPH (`§3.1 M-4`), and the demo envelope's
 *  root carries no authored id at all. */
function rootIdEnvelope(rootId: string, content = '0') {
  const childId = `${rootId}-child`
  return {
    template: {
      root: {
        type: 'div',
        css: { id: rootId },
        props: { id: rootId },
        children: [
          { type: 'h1', content: 'guard' },
          { type: 'div', css: { id: childId }, props: { id: childId }, content },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

/** The engine nodeId of the in-tree node authored at `authoredId` — the
 *  graph's OWN vocabulary (`M-4`/`F-3` read the expectation from here, never
 *  from a literal this file invents). */
function graphNodeId(runtime: Runtime, authoredId: string): string {
  const node = runtime.listTargets().nodes.find((n) => n.cssId === authoredId || n.propsId === authoredId)
  expect(node, `precondition: the graph carries an in-tree node authored at '${authoredId}'`).toBeTruthy()
  return node!.nodeId
}

function bootedLocal(rootId: string): { runtime: Runtime; mount: ShimElement; rootNodeId: string } {
  const mount = mountEl()
  const runtime = new Runtime({ mount: mount as never, envelope: rootIdEnvelope(rootId) as never })
  runtime.bootstrap()
  return { runtime, mount, rootNodeId: graphNodeId(runtime, rootId) }
}

/** A mount holding TWO engine-emitted direct children: the landed root plus a
 *  caller-appended element carrying `data-node-id` (`§3.2 F-1`). No `src/**`
 *  state is created — the second root is caller-supplied tree state. */
function twoRootState(): { mount: ShimElement; landedRootId: string } {
  const { mount } = bootedDemo()
  const before = expectRawEngineRoots(mount, 'twoRootState precondition (fresh bootstrapped demo mount)', 1)
  const extra = mountEl()
  extra.setAttribute('data-node-id', 'second-root')
  mount.appendChild(extra)
  return { mount, landedRootId: before.nodeIds[0] }
}

/** The `§2.4`-shaped projection used where element references are not
 *  comparable across mounts (order-independence, `I-6`). */
function project(res: MountInvariantResult) {
  return {
    ok: res.ok,
    count: res.count,
    nodeIds: res.roots.map((r) => r.nodeId),
    foreignSiblings: res.foreignSiblings.length,
    violationCode: res.violation === null ? null : res.violation.code,
    expectedRootNodeId: hasOwn.call(res, 'expectedRootNodeId') ? res.expectedRootNodeId : '<absent>',
  }
}

/** The attribute/write surface of every direct child, for `I-3`. */
function childSurface(child: unknown): string {
  const surface = surfaceOf(child)
  if (surface === null) return `${typeof child}:${String(child)}`
  const read = (k: string) => {
    try {
      return JSON.stringify(surface[k])
    } catch {
      return '<unreadable>'
    }
  }
  return [read('attrs'), read('id'), read('className'), read('value'), read('removed'), read('listeners')].join('|')
}

/** A depth-4 placement-routed envelope — the path-enumeration (`compilePath`)
 *  case of `§3.1 M-14`, copied from the landed host row that anchors it
 *  (`tests/runtime-host.test.ts:294-320`, read; that file is NOT edited). */
function placementEnvelope(depth = 4) {
  const children: unknown[] = []
  const payload: unknown[] = []
  for (let k = 1; k <= depth - 1; k += 1) {
    for (const slot of ['a', 'b']) {
      const proto = {
        type: slot === 'a' ? 'div' : 'span',
        props: { id: `p${k}${slot}`, 'stress:layer': k, 'stress:slot': slot, 'data-depth': String(k) },
        placement: {
          placementName: `zone-${k}`,
          ...(k >= 2 ? { targetPlacement: [`zone-${k - 1}`] } : {}),
        },
      }
      if (k === 1) children.push(proto)
      else payload.push(proto)
    }
  }
  return {
    template: { root: { type: 'app', props: { id: 'path-root' }, children } },
    content: [{ metadata: { title: 'placement' }, content: payload }],
    clientConfig: { runInstantiation: false, runMonitoring: true },
  }
}

// ===========================================================================
// PRE-1 / PRE-2 — HARNESS PRECONDITIONS (not spec rows: they are the two
// instruments every row above depends on, asserted so a red row cannot be a
// harness artefact). Both are expected GREEN today.
// ===========================================================================
describe('PRE — harness preconditions (not spec rows)', () => {
  it('PRE-1 the dynamic import boundary itself resolves and casts (proved against an EXISTING module)', async () => {
    // The boundary technique of this file (structural type + cast over a
    // run-time specifier) is proved against a module that DOES exist, so a red
    // row below cannot be an artefact of the boundary mechanism itself.
    const existing = ['..', 'src', 'shared', 'demo-envelope.js'].join('/')
    const mod = (await import(/* @vite-ignore */ existing)) as Record<string, unknown>
    expect(typeof mod['demoEnvelope']).toBe('function')
    const cast = mod['demoEnvelope'] as unknown as () => { template?: unknown }
    expect(typeof cast()).toBe('object')
  })

  it('PRE-2 the raw tree reader mirrors §2.4.2/§2.4.4: both read paths, and an EMPTY value is not an id (F-9)', () => {
    const mount = mountEl()
    const viaAttr = mountEl()
    viaAttr.setAttribute('data-node-id', 'g-1')
    const viaSerial = { outerHTML: '<div data-node-id="g-2"></div>' }
    const blank = mountEl()
    blank.setAttribute('data-node-id', '')
    const opaque: Record<string, unknown> = { notAnElement: true }
    const nullAttr = { getAttribute: () => null }
    ;(mount.children as unknown[]).push(viaAttr, viaSerial, blank, opaque, nullAttr)

    const obs = observeMount(mount)
    expect(obs.childCount).toBe(5)
    expect(obs.nodeIds).toEqual(['g-1', 'g-2']) // blank/opaque/null → NOT engine-emitted
    expect(readNodeIdViaAttribute(viaAttr)).toBe('g-1')
    expect(readNodeIdViaAttribute(viaSerial)).toBe(null) // no attribute surface → serialization path
    expect(readNodeIdViaSerialization(viaSerial)).toBe('g-2')
    expect(rawNodeId(blank)).toBe(null)
    expect(rawNodeId(opaque)).toBe(null)
    expect(rawNodeId(nullAttr)).toBe(null)
  })
})

// ===========================================================================
// S-1..S-3 — §2.1's EXACT SURFACE (four exports; every return shape; the throw
// pattern). The spec declares these as the surface of the module the rows call.
// ===========================================================================
describe('S — §2.1 the exact surface (exports, return shape, throw pattern)', () => {
  it("S-1 §2.1 — the module's RUNTIME exports are exactly the two functions (the two interfaces are type-only)", async () => {
    const { mod } = await guard('S-1 §2.1 four-exports surface')
    expect(Object.keys(mod).sort()).toEqual(['assertMountInvariant', 'probeMountInvariant'])
  })

  it('S-2 §2.1 — the result shape is EXACTLY the documented field set, in both outcomes', async () => {
    const { probe } = await guard('S-2 §2.1 return shape')
    const okRes = probe(bootedDemo().mount)
    expect(Object.keys(okRes).sort(), '§2.1: ok result — cardinality-only').toEqual(RESULT_KEYS)
    expect(typeof okRes.ok).toBe('boolean')
    expect(typeof okRes.count).toBe('number')
    expect(Array.isArray(okRes.roots)).toBe(true)
    expect(Array.isArray(okRes.foreignSiblings)).toBe(true)

    const violationRes = probe(mountEl())
    expect(Object.keys(violationRes).sort(), '§2.1: violation result — the SAME field set').toEqual(RESULT_KEYS)
    expect(violationRes.violation).not.toBe(null)
    for (const key of ['code', 'message', 'count', 'nodeIds']) {
      expect(hasOwn.call(violationRes.violation as object, key), `§2.1 MountViolation carries '${key}'`).toBe(true)
    }

    const host = bootedLocal('guard-root-shape')
    const withExpectation = probe(host.mount, { rootNodeId: host.rootNodeId })
    expect(Object.keys(withExpectation).sort(), '§2.1: expectedRootNodeId is the one optional field').toEqual(
      RESULT_KEYS_WITH_EXPECTATION,
    )
  })

  it('S-3 §2.1 — the throw pattern for EVERY documented code: prefix + violation.message + a plain Error', async () => {
    const { probe, assertion } = await guard('S-3 §2.1 throw pattern')
    const host = bootedLocal('guard-root-throw')
    const cases: Array<{ code: MountViolationCode; mount: unknown; expect?: MountExpectation | null }> = [
      { code: 'no-root', mount: mountEl() },
      { code: 'multiple-roots', mount: twoRootState().mount },
      { code: 'root-identity-mismatch', mount: host.mount, expect: { rootNodeId: 'stale-node-id-not-in-graph' } },
      { code: 'mount-reference-mismatch', mount: bootedDemo().mount, expect: { mount: mountEl() } },
      { code: 'mount-not-appendable', mount: null },
      { code: 'expect-mismatch', mount: bootedDemo().mount, expect: 'nope' },
    ]
    for (const c of cases) {
      const violation = probe(c.mount, c.expect).violation
      expect(violation, `S-3 ${c.code}: the probe reports the typed violation`).not.toBe(null)
      expect(violation!.code, `S-3 ${c.code}: violation.code`).toBe(c.code)

      let thrown: unknown = null
      try {
        assertion(c.mount, c.expect)
      } catch (e) {
        thrown = e
      }
      expect(thrown, `S-3 ${c.code}: assertMountInvariant throws on a violation`).toBeInstanceOf(Error)
      const err = thrown as Error
      const prefix = `mount invariant violated (${c.code}): `
      expect(err.message.startsWith(prefix), `S-3 ${c.code}: message begins '${prefix}' — got '${err.message}'`).toBe(true)
      expect(err.message.slice(prefix.length), `S-3 ${c.code}: message continues with violation.message`).toContain(
        violation!.message,
      )
      expect(
        Object.getOwnPropertyNames(err).sort(),
        `S-3 ${c.code}: §2.1 pins a PLAIN Error — no additional properties`,
      ).toEqual(['message', 'stack'])
    }
  })
})

// ===========================================================================
// S-4..S-7 — §2.2's prohibition table (`H-r8`), the static rows over the module
// file. Prohibition 3 is `M-5` (the omitted field); prohibition 6 is satisfied
// by every §3 row carrying `[T]`/`[H]` and by the absence of any query API
// below. Comments are stripped for the CODE-level rows so a doc comment that
// NAMES a forbidden call is not a false red; prohibition 1 scans the WHOLE file
// (a comment naming a region is a re-entry signal, §2.2).
// ===========================================================================
const SOURCE_TS = MODULE_SRC

function moduleSourceRaw(): string {
  expect(
    existsSync(SOURCE_TS),
    `RED — U-MOUNTGUARD red set: the §2.2 static rows read the module file, and it does not exist yet (${fileURLToPath(
      SOURCE_TS,
    )}).`,
  ).toBe(true)
  return readFileSync(SOURCE_TS, 'utf8')
}

/** Strip comments while PRESERVING line structure (so a hit's line number is
 *  the real one). String literals are kept — a forbidden token in a string is
 *  still a forbidden token in code. */
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

describe('S — §2.2 the six-prohibition assertion set (static rows over the module)', () => {
  it('S-4 §2.2 prohibition 1 — NO consumer vocabulary anywhere in the module; the only union is the six contract codes', () => {
    const raw = moduleSourceRaw()
    const hits = staticHits(raw, /\b(regions?|panes?|tabs?|zones?)\b/i)
    expect(
      hits,
      `§2.2 prohibition 1 — consumer vocabulary (region/pane/tab/zone/ShellRegion*) must not occur at all: ${JSON.stringify(
        hits,
      )}`,
    ).toEqual([])
    expect(staticHits(raw, /ShellRegion/), '§2.2 prohibition 1 — the DECLINED region half must not re-enter').toEqual([])
    for (const code of VIOLATION_CODES) {
      expect(raw.includes(`'${code}'`), `§2.2: the contract literal '${code}' is present`).toBe(true)
    }
  })

  it('S-5 §2.2 prohibition 2 + §2.3 — the module creates nothing and writes nothing (a reader, not a UI element)', () => {
    const code = stripComments(moduleSourceRaw())
    const forbidden: Array<{ what: string; re: RegExp }> = [
      { what: 'document.createElement', re: /\bcreateElement\b/ },
      { what: 'the ambient document', re: /\bdocument\b/ },
      { what: 'the ambient window', re: /\bwindow\b/ },
      { what: 'a body target', re: /\bbody\b/ },
      { what: 'a textContent write', re: /textContent\s*=/ },
      { what: 'appendChild', re: /\.appendChild\s*\(/ },
      { what: 'setAttribute', re: /\.setAttribute\s*\(/ },
      { what: 'removeAttribute', re: /\.removeAttribute\s*\(/ },
      { what: 'element removal', re: /\.remove\s*\(/ },
      { what: 'insertBefore', re: /\.insertBefore\s*\(/ },
      { what: 'replaceChild', re: /\.replaceChild\s*\(/ },
    ]
    for (const { what, re } of forbidden) {
      const hits = staticHits(code, re)
      expect(hits, `§2.3: the probe is a reader — '${what}' must not appear in the module code: ${JSON.stringify(hits)}`).toEqual(
        [],
      )
    }
  })

  it('S-6 §2.2 prohibition 4 + §2.3 — no global lookup, no store, no module-level mutable state', () => {
    const code = stripComments(moduleSourceRaw())
    const lookups: Array<{ what: string; re: RegExp }> = [
      { what: "getElementById (the shim AUTO-CREATES on a miss — §2.4.5's hazard)", re: /\bgetElementById\b/ },
      { what: 'querySelector', re: /\bquerySelector\b/ },
      { what: 'querySelectorAll (SCH-11 acceptance line, §2.4.2)', re: /\bquerySelectorAll\b/ },
      { what: 'closest', re: /\bclosest\b/ },
      { what: 'getComputedStyle', re: /\bgetComputedStyle\b/ },
      { what: 'matchMedia', re: /\bmatchMedia\b/ },
      { what: 'activeElement', re: /\bactiveElement\b/ },
      { what: 'localStorage/sessionStorage', re: /\b(localStorage|sessionStorage)\b/ },
      { what: 'a WeakMap of mounts', re: /\bWeakMap\b|\bWeakSet\b/ },
      { what: 'file/module I/O', re: /\b(require\s*\(|node:fs|process\.)\b/ },
    ]
    for (const { what, re } of lookups) {
      const hits = staticHits(code, re)
      expect(hits, `§2.3: '${what}' must not appear in the module code: ${JSON.stringify(hits)}`).toEqual([])
    }
    const moduleLevelMutable = staticHits(code, /^(?:export\s+)?(?:let|var)\s/)
    expect(
      moduleLevelMutable,
      `§2.2 prohibition 4 — the module holds NO state between calls (no module-level let/var): ${JSON.stringify(
        moduleLevelMutable,
      )}`,
    ).toEqual([])
  })

  it('S-7 §2.2 prohibition 5 + §2.3 — no renderer/main/electron import and no render/load/apply call', () => {
    const code = stripComments(moduleSourceRaw())
    const imports: Array<{ what: string; re: RegExp }> = [
      { what: 'an import from src/renderer/**', re: /from\s+['"][^'"]*\/renderer\// },
      { what: 'an import from src/main/**', re: /from\s+['"][^'"]*\/main\// },
      { what: 'the electron module', re: /from\s+['"]electron['"]/ },
      { what: 'node:fs', re: /from\s+['"]node:fs['"]/ },
      { what: 'provident-ssr', re: /from\s+['"]provident-ssr['"]/ },
    ]
    for (const { what, re } of imports) {
      const hits = staticHits(code, re)
      expect(hits, `§5.1/§2.3: '${what}' is outside the module's scope: ${JSON.stringify(hits)}`).toEqual([])
    }
    const calls: Array<{ what: string; re: RegExp }> = [
      { what: 'renderProducingProcess', re: /\brenderProducingProcess\b/ },
      { what: 'loadEnvelope/loadDoc', re: /\bload(?:Envelope|Doc)\b/ },
      { what: 'codeLoad', re: /\bcodeLoad\b/ },
      { what: 'teardown', re: /\bteardown\b/i },
      { what: 'bootstrap', re: /\bbootstrap\b/ },
      { what: 'dispatchEvent', re: /\bdispatchEvent\b/ },
      { what: 'a supervisor', re: /\bsupervisor\b/i },
      { what: 'an apply/render call', re: /\.apply\s*\(|\brender\s*\(/ },
    ]
    for (const { what, re } of calls) {
      const hits = staticHits(code, re)
      expect(hits, `§2.3: the module observes, it never acts — '${what}': ${JSON.stringify(hits)}`).toEqual([])
    }
  })
})

// ===========================================================================
// I-1..I-6 — §3.3, the invariants that hold in EVERY state.
// ===========================================================================
describe('I — §3.3 the every-state invariants', () => {
  it('I-1 §3.3 — roots.length === count ALWAYS, and the nodeIds list has length === count', async () => {
    const { probe } = await guard('I-1')
    const states: Array<{ id: string; mount: unknown }> = [
      { id: 'M-1 (one engine-emitted root, ok)', mount: bootedDemo().mount },
      { id: 'M-8 (malformed mount: null)', mount: null },
      { id: 'F-1 (two engine-emitted roots)', mount: twoRootState().mount },
      { id: 'F-5 (an object with a non-array children)', mount: { children: 'x' } },
    ]
    for (const state of states) {
      const res = probe(state.mount)
      const raw = observeMount(state.mount)
      expect(res.roots.length, `I-1 ${state.id}: roots.length === count`).toBe(res.count)
      expect(res.count, `I-1 ${state.id}: count === the RAW engine-emitted direct-child count`).toBe(raw.engineChildCount)
      // §2.1's RESULT surface carries no top-level `nodeIds` (S-2 pins the exact
      // key set): the list I-1 speaks of is the VIOLATION's, present in every
      // non-ok state; in the ok state it is `roots.map(nodeId)`.
      const list =
        hasOwn.call(res, 'nodeIds') && Array.isArray((res as { nodeIds?: unknown }).nodeIds)
          ? ((res as { nodeIds: string[] }).nodeIds as string[])
          : res.violation !== null
            ? [...res.violation.nodeIds]
            : res.roots.map((r) => r.nodeId)
      expect(list.length, `I-1 ${state.id}: the nodeIds list length === count`).toBe(res.count)
      if (res.violation !== null) {
        expect(res.violation.count, `I-1 ${state.id}: violation.count === result.count`).toBe(res.count)
        expect(res.violation.nodeIds.length, `I-1 ${state.id}: violation.nodeIds.length === count`).toBe(res.count)
      }
    }
  })

  it('I-2 §3.3 — violation === null IFF ok === true (no "ok with a violation" state exists)', async () => {
    const { probe } = await guard('I-2')
    const host = bootedLocal('guard-root-i2')
    const states: Array<{ id: string; mount: unknown; expect?: MountExpectation | null }> = [
      { id: 'M-1 (ok)', mount: bootedDemo().mount },
      { id: 'F-2 (no root)', mount: mountEl() },
      { id: 'F-1 (multiple roots)', mount: twoRootState().mount },
      { id: 'F-3 (identity mismatch)', mount: host.mount, expect: { rootNodeId: 'stale-node-id-not-in-graph' } },
      { id: 'F-4 (mount reference mismatch)', mount: bootedDemo().mount, expect: { mount: mountEl() } },
      { id: 'F-5 (malformed mount)', mount: { children: 'x' } },
      { id: 'F-6 (malformed expect)', mount: bootedDemo().mount, expect: 42 },
      { id: 'F-10 (expect === null)', mount: bootedDemo().mount, expect: null },
    ]
    for (const state of states) {
      const res = probe(state.mount, state.expect)
      expect(res.violation === null, `I-2 ${state.id}: violation === null iff ok === true`).toBe(res.ok === true)
      expect(res.violation !== null, `I-2 ${state.id}: a violation exists iff ok === false`).toBe(res.ok === false)
    }
  })

  it('I-3 §3.3 — the probe performs ZERO writes: children reference-identical and no attribute set changes', async () => {
    const { probe, assertion } = await guard('I-3')
    const host = bootedDemo()
    const withForeign = bootedDemo()
    const foreignA = mountEl()
    const foreignB = mountEl()
    withForeign.mount.appendChild(foreignA)
    withForeign.mount.appendChild(foreignB)

    const cases: Array<{ id: string; mount: unknown; expect?: MountExpectation | null; asserting?: boolean }> = [
      { id: 'M-1 (ok)', mount: host.mount },
      { id: 'M-7 (two foreign siblings present)', mount: withForeign.mount },
      { id: 'F-1 (multiple roots)', mount: twoRootState().mount },
      { id: 'F-2 (no root)', mount: mountEl() },
      { id: 'F-5 (malformed mount: null)', mount: null },
      { id: 'F-1 by ASSERT (a throw must not write either)', mount: twoRootState().mount, asserting: true },
      { id: 'M-1 by ASSERT (ok branch)', mount: host.mount, asserting: true },
    ]
    for (const c of cases) {
      const surface = surfaceOf(c.mount)
      const childrenArray = surface !== null && Array.isArray(surface['children']) ? (surface['children'] as unknown[]) : null
      const beforeKids = childrenArray === null ? null : [...childrenArray]
      const beforeSurface = childrenArray === null ? null : childrenArray.map(childSurface)
      const beforeJson = childrenArray === null ? null : JSON.stringify(beforeSurface)

      if (c.asserting === true) {
        try {
          assertion(c.mount, c.expect)
        } catch {
          // the throw is S-3's subject; this row only asserts it wrote nothing
        }
      } else {
        probe(c.mount, c.expect)
      }

      if (childrenArray === null || beforeKids === null) continue
      expect(surface!['children'], `I-3 ${c.id}: mount.children is the SAME array reference`).toBe(childrenArray)
      expect(childrenArray.length, `I-3 ${c.id}: no child was added or removed`).toBe(beforeKids.length)
      for (let i = 0; i < beforeKids.length; i += 1) {
        expect(childrenArray[i], `I-3 ${c.id}: child ${i} is reference-identical, in order`).toBe(beforeKids[i])
      }
      expect(JSON.stringify(childrenArray.map(childSurface)), `I-3 ${c.id}: no child's attribute set changed`).toBe(beforeJson)
      // no reordering is observable through the serialization either
      expect(observeMount(c.mount).serializations, `I-3 ${c.id}: the serialized child order is unchanged`).toEqual(
        beforeKids.map(serializationOf),
      )
    }
  })

  it('I-4 §3.3 — the probe holds NO state: fresh, deep-equal results; the earlier result is not a live view', async () => {
    const { probe } = await guard('I-4')
    const { mount } = bootedDemo()
    const first = probe(mount)
    const second = probe(mount)
    expect(second, 'I-4: each call returns a FRESH result object').not.toBe(first)
    expect(second, 'I-4: same arguments + same state → deep-equal results').toEqual(first)
    expect(second.roots, 'I-4: the roots array is fresh too').not.toBe(first.roots)
    expect(second.roots[0].element, "I-4: the element is the TREE's own, by reference").toBe(first.roots[0].element)
    expect(second.roots[0], 'I-4: no observation object is retained across calls').not.toBe(first.roots[0])

    // "no retained reference": mutate the tree and probe again — the second
    // call must see the change, and the FIRST result must not (it is a result,
    // not a live view of the tree).
    const foreign = mountEl()
    mount.appendChild(foreign)
    const third = probe(mount)
    expect(third.foreignSiblings.length, 'I-4: the later call sees the new foreign sibling').toBe(1)
    expect(third.foreignSiblings[0]).toBe(foreign)
    expect(first.foreignSiblings.length, 'I-4: the earlier result is NOT a live view').toBe(0)
    expect(third.count, 'I-4: a foreign sibling is not an engine-emitted root').toBe(1)
  })

  it('I-5 §3.3 — `mount` echoes the EXACT argument by reference in every outcome, malformed included', async () => {
    const { probe } = await guard('I-5')
    const okMount = bootedDemo().mount
    const malformed: unknown[] = [null, undefined, '', 42, { children: 'x' }, [], { getAttribute: 'nope' }]
    for (const arg of [okMount, ...malformed]) {
      const res = probe(arg)
      expect(hasOwn.call(res, 'mount'), `I-5: the field is present for ${String(arg)}`).toBe(true)
      expect(res.mount, `I-5: mount echoes the argument by reference (${String(arg)})`).toBe(arg)
    }
  })

  it('I-6 §3.3 — no outcome depends on the ORDER in which the caller called anything else (purity)', async () => {
    const { probe, assertion } = await guard('I-6')
    const { mount } = bootedDemo()
    const before = project(probe(mount))
    const rawBefore = observeMount(mount)

    // Unrelated calls of every kind in between (other mounts, malformed
    // arguments, an assert that throws, a fresh boot, a foreign append).
    probe(mountEl())
    probe(null)
    probe('nope')
    probe({ children: 'x' }, 42)
    bootedDemo()
    mountEl().setAttribute('data-node-id', 'unrelated')
    try {
      assertion(mountEl())
    } catch {
      /* the unrelated throw is not this row's subject */
    }
    expect(() => assertion(mountEl())).toThrow()

    const after = project(probe(mount))
    expect(after, 'I-6: the same mount, probed after unrelated work, yields the SAME outcome').toEqual(before)
    expect(observeMount(mount), 'I-6: no unrelated call wrote into the tree').toEqual(rawBefore)

    // ...and the outcome is a function of the TREE alone: two independently
    // booted mounts of the same shape project identically (ids are per-graph,
    // so the comparison is on the tree-derived shape).
    const x = project(probe(bootedDemo().mount))
    const y = project(probe(bootedDemo().mount))
    expect(x.nodeIds.length).toBe(y.nodeIds.length)
    expect({
      ok: x.ok,
      count: x.count,
      foreign: x.foreignSiblings,
      code: x.violationCode,
    }).toEqual({ ok: y.ok, count: y.count, foreign: y.foreignSiblings, code: y.violationCode })
  })
})

// ===========================================================================
// M-1..M-16 — §3.1, the valid/happy states (authored after `I`, §4.2 step 1).
// ===========================================================================
describe('M — §3.1 the valid states (one engine-emitted root, per re-derivation path)', () => {
  it('M-1 §3.1 — one engine-emitted root, fresh graph', async () => {
    const { runtime, mount } = bootedDemo()
    expect(runtime.listTargets().nodes.length, 'M-1 precondition: the graph is more than root-only').toBeGreaterThan(1)
    const raw = expectRawEngineRoots(mount, 'M-1 (fresh bootstrapped graph)', 1)
    const { probe } = await guard(`M-1 · RAW observation: ${verbatimOf(raw)}`)

    const res = probe(mount)
    expect(res.ok).toBe(true)
    expect(res.count).toBe(1)
    expect(res.roots.length).toBe(1)
    expect(res.violation).toBe(null)
    expect(typeof res.roots[0].nodeId, 'M-1: nodeId is a string').toBe('string')
    expect(res.roots[0].nodeId.length, 'M-1: nodeId is non-empty').toBeGreaterThan(0)
    expect(res.roots[0].nodeId, 'M-1: the probe reads the same id the raw read took').toBe(raw.nodeIds[0])
    const children = (mount as unknown as { children: unknown[] }).children
    expect(children.indexOf(res.roots[0].element), 'M-1: the root element is a DIRECT child of the mount, by reference').toBeGreaterThanOrEqual(0)
    expect(typeof res.roots[0].serialization).toBe('string')
    expect(res.roots[0].serialization).toContain('data-node-id')
  })

  it('M-2 §3.1 — one engine-emitted root after ONE re-derivation (cycle 2)', async () => {
    const { runtime, mount } = bootedDemo()
    runtime.loadEnvelope(demoEnvelope() as never)
    const raw = expectRawEngineRoots(mount, 'M-2 (after ONE loadEnvelope re-derivation)', 1)
    const { probe } = await guard(`M-2 · RAW observation: ${verbatimOf(raw)}`)
    const res = probe(mount)
    expect(res.ok).toBe(true)
    expect(res.count).toBe(1)
    expect(res.violation).toBe(null)
  })

  it('M-3 §3.1 — THE CROSS-ENVELOPE ROW: count === 1 at EVERY observation point (the unit\'s reason to exist)', async () => {
    const { runtime, mount } = freshDemo()
    // Observation point 0 is recorded RAW and is NOT a "count === 1" point:
    // before bootstrap the mount has no engine-emitted child, and §3.2 F-2
    // pins exactly that state as 'no-root'. The four "count === 1" points are
    // therefore the fresh bootstrapped graph (M-1's state) and the three loads
    // after it.
    const observations: Array<{ point: string; obs: RawObservation }> = []
    observations.push({ point: 'P0 · constructed, BEFORE bootstrap (F-2: expected 0)', obs: observeMount(mount) })

    runtime.bootstrap()
    observations.push({ point: 'P1 · after bootstrap (the fresh graph)', obs: observeMount(mount) })
    runtime.loadEnvelope(demoEnvelope() as never)
    observations.push({ point: 'P2 · after load #1', obs: observeMount(mount) })
    runtime.loadEnvelope(demoEnvelope() as never)
    observations.push({ point: 'P3 · after load #2', obs: observeMount(mount) })
    runtime.loadEnvelope(demoEnvelope() as never)
    observations.push({ point: 'P4 · after load #3', obs: observeMount(mount) })

    const rawVerbatim = verbatimList(observations)
    // The RAW observation, asserted straight against the tree: this is the
    // measurement that settles §0 ruling 3 BEFORE (and independently of) the
    // module. `count === 2` at any point is the HOST-fix branch of S-1.
    for (const o of observations.slice(1)) {
      expect(o.obs.engineChildCount, `M-3 RAW — ${o.point} must hold exactly ONE engine-emitted root. VERBATIM: ${rawVerbatim}`).toBe(1)
    }
    expect(observations[0].obs.engineChildCount, `M-3 RAW — P0 (pre-bootstrap) is the F-2 state, not a root state. VERBATIM: ${rawVerbatim}`).toBe(0)

    // Then the module, at every observation point (the module-absent red for
    // this row still carries the verbatim raw counts in its message).
    const { probe } = await guard(`M-3 · RAW observations (childCount / count / nodeIds): ${rawVerbatim}`)
    for (const o of observations.slice(1)) {
      const res = probe(mount)
      expect(res.count, `M-3 ${o.point}: the probe's count agrees with the tree. VERBATIM: ${rawVerbatim}`).toBe(1)
      expect(res.ok, `M-3 ${o.point}: ok === true`).toBe(true)
      expect(res.violation, `M-3 ${o.point}: violation === null`).toBe(null)
      expect(res.roots.length, `M-3 ${o.point}: roots.length === 1`).toBe(1)
    }
    // Same mount reference at every point (§1.1: "the mount reference may not
    // change across re-derivations").
    const res = probe(mount, { mount })
    expect(res.mount).toBe(mount)
    expect(res.violation === null ? null : res.violation.code, 'M-3: never a mount-reference-mismatch').not.toBe(
      'mount-reference-mismatch',
    )
  })

  it('M-4 §3.1 — identity: the root IS the graph\'s current root node (the expectation read FROM the graph)', async () => {
    const { mount, rootNodeId } = bootedLocal('guard-root-m4')
    const raw = expectRawEngineRoots(mount, 'M-4 (identity host)', 1)
    const { probe } = await guard(`M-4 · RAW observation: ${verbatimOf(raw)}`)
    const res = probe(mount, { rootNodeId })
    expect(res.ok).toBe(true)
    expect(res.roots[0].nodeId, 'M-4: the observed root is the graph root node').toBe(rootNodeId)
    expect(res.expectedRootNodeId).toBe(rootNodeId)
  })

  it('M-5 §3.1 — cardinality-only mode OMITS the identity field (absent, not undefined/null)', async () => {
    const { probe } = await guard('M-5')
    const { mount } = bootedDemo()
    const noExpect = probe(mount)
    expect(noExpect.ok).toBe(true)
    expect(
      hasOwn.call(noExpect, 'expectedRootNodeId'),
      'M-5 §2.2 prohibition 3 — no "assume 1" / no fallback rootNodeId: the field must be ABSENT',
    ).toBe(false)

    // ...and the same holds for a supplied expectation that carries NO
    // rootNodeId (the mount-only expectation).
    const mountOnly = probe(mount, { mount })
    expect(mountOnly.ok).toBe(true)
    expect(hasOwn.call(mountOnly, 'expectedRootNodeId'), 'M-5: { mount } alone is cardinality-only').toBe(false)
  })

  it('M-6 §3.1 — the mount identity does not change across N re-derivations', async () => {
    const { runtime, mount } = bootedDemo()
    const captured = mount
    const paths: Array<{ label: string; derive: () => void }> = [
      { label: 'loadEnvelope #1', derive: () => runtime.loadEnvelope(demoEnvelope() as never) },
      { label: 'loadEnvelope #2', derive: () => runtime.loadEnvelope(demoEnvelope() as never) },
      { label: 'teardown', derive: () => runtime.teardown() },
      { label: 'loadEnvelope #3 (after a teardown)', derive: () => runtime.loadEnvelope(demoEnvelope() as never) },
    ]
    // The raw cardinality of every path is RECORDED (not asserted — M-6's own
    // required behaviour is the mount echo) so the red report carries it.
    const seen: Array<{ point: string; obs: RawObservation }> = []
    for (const p of paths) {
      p.derive()
      seen.push({ point: p.label, obs: observeMount(captured) })
    }
    const { probe } = await guard(`M-6 · RAW observations per re-derivation path: ${verbatimList(seen)}`)
    for (const p of paths) {
      const res = probe(captured, { mount: captured })
      expect(res.mount, `M-6 ${p.label}: the probe echoes the captured mount by reference`).toBe(captured)
      expect(res.violation === null ? null : res.violation.code, `M-6 ${p.label}: no mount-reference-mismatch`).not.toBe(
        'mount-reference-mismatch',
      )
    }
  })

  it('M-7 §3.1 — foreign siblings are REPORTED, never swept (and nothing was removed)', async () => {
    const { mount } = bootedDemo()
    const a = mountEl()
    const b = mountEl()
    mount.appendChild(a)
    mount.appendChild(b)
    const before = observeMount(mount)
    expect(before.childCount, `M-7 precondition: root + two foreign siblings. VERBATIM: ${verbatimOf(before)}`).toBe(3)
    expect(before.engineChildCount, `M-7 precondition: ONE engine-emitted root. VERBATIM: ${verbatimOf(before)}`).toBe(1)
    const { probe } = await guard(`M-7 · RAW observation: ${verbatimOf(before)}`)

    const res = probe(mount)
    expect(res.ok).toBe(true)
    expect(res.count).toBe(1)
    expect(res.foreignSiblings.length, 'M-7: both foreign siblings are reported').toBe(2)
    expect(res.foreignSiblings[0], 'M-7: the same references, in document order').toBe(a)
    expect(res.foreignSiblings[1]).toBe(b)
    const after = observeMount(mount)
    expect(after.childCount, 'M-7: the probe removed nothing').toBe(before.childCount)
    expect(after.engineChildCount).toBe(1)
    const children = (mount as unknown as { children: unknown[] }).children
    expect(children[children.length - 1]).toBe(b)
  })

  it('M-8 §3.1 — a null/absent/blank/numeric mount is a TYPED refusal, never a throw', async () => {
    const { probe } = await guard('M-8')
    const malformed: unknown[] = [null, undefined, '', 42]
    for (const arg of malformed) {
      let res: MountInvariantResult | null = null
      expect(() => {
        res = probe(arg)
      }, `M-8 (${String(arg)}): §2.1 — the probe NEVER throws`).not.toThrow()
      expect(res, `M-8 (${String(arg)}): a result is returned`).not.toBe(null)
      expect(res!.ok).toBe(false)
      expect(res!.violation === null ? null : res!.violation.code, `M-8 (${String(arg)}): the typed code`).toBe(
        'mount-not-appendable',
      )
      expect(res!.count, `M-8 (${String(arg)}): count === 0`).toBe(0)
      expect(res!.roots.length, `M-8 (${String(arg)}): roots is empty`).toBe(0)
      expect(res!.mount, `M-8 (${String(arg)}): mount echoes the argument`).toBe(arg)
    }
  })

  it('M-9 §3.1 — a malformed `expect` is a typed refusal, never a throw', async () => {
    const { probe } = await guard('M-9')
    const { mount } = bootedDemo()
    const malformed = ['nope', 42, []]
    for (const arg of malformed) {
      let res: MountInvariantResult | null = null
      expect(() => {
        res = probe(mount, arg as never)
      }, `M-9 (${JSON.stringify(arg)}): §2.1 — the probe NEVER throws`).not.toThrow()
      expect(res!.ok).toBe(false)
      expect(res!.violation === null ? null : res!.violation.code, `M-9 (${JSON.stringify(arg)})`).toBe('expect-mismatch')
    }
  })

  it('M-10 §3.1 — assertMountInvariant returns the probe\'s own result on success (never a rebuild)', async () => {
    const { probe, assertion } = await guard('M-10')
    const { mount } = bootedDemo()
    const direct = probe(mount)
    expect(direct.ok).toBe(true)
    let returned: MountInvariantResult | null = null
    expect(() => {
      returned = assertion(mount)
    }, 'M-10: assertMountInvariant throws nothing on the M-1 state').not.toThrow()
    expect(returned).not.toBe(null)
    expect(project(returned!), 'M-10: deep-equal to the probe\'s own result on the same state').toEqual(project(direct))
    expect(returned!.roots.length).toBe(direct.roots.length)
    // The returned result carries the TREE's own references, not copies.
    const children = (mount as unknown as { children: unknown[] }).children
    expect(children.indexOf(returned!.roots[0].element), 'M-10: the element is the mount\'s direct child, by reference').toBeGreaterThanOrEqual(0)
    expect(returned!.roots[0].element).toBe(direct.roots[0].element)
    expect(returned!.mount).toBe(mount)
    // NOT OBSERVABLE FROM [T]: strict object identity with the probe's INTERNAL
    // single call — §2.1's surface exposes no seam to instrument, so the row
    // pins "the assert re-reads nothing, it returns a probe-shaped result over
    // the same tree references" and this half is recorded in the red report.
  })

  it('M-11 §3.1 — teardown leaves ZERO engine-emitted roots on the mount while the graph keeps the root', async () => {
    const { runtime, mount } = bootedDemo()
    runtime.teardown()
    // ⟶ AMENDED TO THE MEASUREMENT (2026-09-27, the red-set pass): `§3.1 M-11`
    // was amended after the red run measured `count 0` / `mountHTML: ""` after
    // `teardown()`. The as-filed one-root expectation is SUPERSEDED — it read a
    // `count === 1` into a citation (`tests/runtime-host.test.ts:157`/`:160`)
    // that itself asserts `mount.innerHTML === ''`. DO NOT "restore" the
    // one-root reading; the amended row asserts BOTH halves of the two-layer
    // fact (0 on the mount, 1 in the graph), and neither half alone.
    expect(runtime.renderedHtmlResult().census.inTree, 'M-11 (a) graph half: the graph is root-only').toBe(1)
    // THE RAW TREE, asserted FIRST and verbatim (§4.1).
    const raw = observeMount(mount)
    const rawVerbatim = verbatimOf(raw)
    expect(
      raw.engineChildCount,
      `M-11 (a) mount half: the mount must hold ZERO engine-emitted direct children after teardown. VERBATIM: ${rawVerbatim}`,
    ).toBe(0)
    expect(raw.childCount, `M-11 (a) mount half: zero direct children at all. VERBATIM: ${rawVerbatim}`).toBe(0)
    expect(raw.mountHTML, `M-11 (a) mount half: the serialization side is EMPTY. VERBATIM: ${rawVerbatim}`).toBe('')

    const inTree = runtime.listTargets().nodes.filter((n) => n.inTree)
    expect(inTree.length, 'M-11 (b) graph half: exactly one in-tree node (the root)').toBe(1)
    const rootNodeId = inTree[0].nodeId

    const { probe } = await guard(`M-11 · RAW observation: ${rawVerbatim}`)
    const res = probe(mount, { rootNodeId })
    expect(res.count, `M-11 (a) mount half: probe count === 0. VERBATIM: ${rawVerbatim}`).toBe(0)
    expect(res.roots.length, 'M-11 (a) mount half: no root is reported').toBe(0)
    expect(res.ok, 'M-11 (a) mount half: a state with no engine-emitted root is not "ok"').toBe(false)
    expect(res.violation === null ? null : res.violation.code, 'M-11 (a): §3.2 — the documented code for 0 roots').toBe(
      'no-root',
    )
    // (b) THE GRAPH HALF, asserted after the probe so the two are tied to the
    // same post-teardown state: the root is deliberately detached from the
    // mount while the graph keeps it — that IS the content of this row.
    const inTreeAfter = runtime.listTargets().nodes.filter((n) => n.inTree)
    expect(inTreeAfter.length, 'M-11 (b) graph half: the graph still holds exactly the root').toBe(1)
    expect(inTreeAfter[0].nodeId, 'M-11 (b) graph half: it is the same root node').toBe(rootNodeId)
  })

  it('M-12 §3.1 — teardown is idempotent across N cycles', async () => {
    const { runtime, mount } = bootedDemo()
    const cycles: Array<{ cycle: number; obs: RawObservation }> = []
    for (const cycle of [1, 2, 3]) {
      runtime.teardown()
      cycles.push({ cycle, obs: observeMount(mount) })
    }
    const rawVerbatim = verbatimList(
      cycles.map((c) => ({ point: `cycle ${c.cycle}`, obs: c.obs })),
      true,
    )
    // ⟶ AMENDED TO THE MEASUREMENT (2026-09-27, the red-set pass), consistently
    // with `M-11`: EVERY cycle holds the SAME two-layer state — `count === 0`
    // with `mountHTML === ""` on the mount, `inTree === 1` in the graph. The
    // as-filed "count === 1 after each" / "ok === true after each" is
    // SUPERSEDED (the red run measured 0 after each cycle). Idempotence is the
    // subject: a later cycle producing a DIFFERENT count (1 or 2) is the
    // failure this row rejects, in either direction — so the per-cycle
    // comparison against cycle 1 is asserted alongside the amended values.
    const rootNodeId = runtime.listTargets().nodes.filter((n) => n.inTree).map((n) => n.nodeId).join(',')
    const first = cycles[0].obs
    for (const c of cycles) {
      expect(c.obs.engineChildCount, `M-12 cycle ${c.cycle}: count === 0. VERBATIM: ${rawVerbatim}`).toBe(0)
      expect(c.obs.childCount, `M-12 cycle ${c.cycle}: zero direct children. VERBATIM: ${rawVerbatim}`).toBe(0)
      expect(c.obs.mountHTML, `M-12 cycle ${c.cycle}: the serialization side is EMPTY. VERBATIM: ${rawVerbatim}`).toBe(
        '',
      )
      // IDEMPOTENCE, the row's own subject: cycle 2 and 3 are the SAME state as
      // cycle 1 (a drift to `count 1` or `count 2` fails right here).
      expect(
        { childCount: c.obs.childCount, count: c.obs.engineChildCount, nodeIds: c.obs.nodeIds, mountHTML: c.obs.mountHTML },
        `M-12 cycle ${c.cycle}: the same mount state as cycle 1. VERBATIM: ${rawVerbatim}`,
      ).toEqual({
        childCount: first.childCount,
        count: first.engineChildCount,
        nodeIds: first.nodeIds,
        mountHTML: first.mountHTML,
      })
    }

    const { probe } = await guard(`M-12 · RAW observations: ${rawVerbatim}`)
    for (const c of cycles) {
      const res = probe(mount)
      expect(res.count, `M-12 cycle ${c.cycle}: count === 0`).toBe(0)
      expect(res.ok, `M-12 cycle ${c.cycle}: ok === false (no engine-emitted root)`).toBe(false)
      expect(res.violation === null ? null : res.violation.code, `M-12 cycle ${c.cycle}: the typed code`).toBe('no-root')
    }
    // THE GRAPH HALF of the same two-layer fact (`M-11` (b)), unchanged by any
    // cycle: the root stays in the graph after all three teardowns.
    expect(
      runtime.listTargets().nodes.filter((n) => n.inTree).length,
      'M-12 graph half: exactly one in-tree node (the root) after every cycle',
    ).toBe(1)
    expect(
      runtime.listTargets().nodes.filter((n) => n.inTree).map((n) => n.nodeId).join(','),
      'M-12 graph half: the same root node survives every cycle',
    ).toBe(rootNodeId)
  })

  it('M-13 §3.1 — the code.* route enters the same invariant (codeLoad, then the first codeLoadBatch)', async () => {
    const { runtime, mount } = bootedDemo()
    const loaded = runtime.codeLoad(demoEnvelope() as never)
    expect(loaded.census.inTree, 'M-13 precondition: codeLoad re-derived a non-root graph').toBeGreaterThan(1)
    const steps: Array<{ point: string; obs: RawObservation }> = []
    steps.push({
      point: 'after codeLoad (the loadEnvelope entry at runtime.ts:994)',
      obs: expectRawEngineRoots(mount, 'M-13 (after codeLoad)', 1),
    })

    const batch = runtime.codeLoadBatch([
      { op: 'create', path: 'template.root.children', entry: { type: 'div', props: { id: 'm13-added' }, content: 'added' } },
      { op: 'set', path: 'template.root.children[0].content', value: 'M-13' },
    ])
    expect(batch.ops.length, 'M-13 precondition: the batch staged both ops').toBe(2)
    steps.push({
      point: 'after the first codeLoadBatch (the multi-step staging path)',
      obs: expectRawEngineRoots(mount, 'M-13 (after the first codeLoadBatch)', 1),
    })

    const { probe } = await guard(`M-13 · RAW observations: ${verbatimList(steps)}`)
    const res = probe(mount)
    expect(res.count).toBe(1)
    expect(res.ok).toBe(true)
  })

  it('M-14 §3.1 — the placement-routed path obeys the same invariant (many elements, ONE root)', async () => {
    const mount = mountEl()
    const runtime = new Runtime({ mount: mount as never, envelope: demoEnvelope() as never })
    const census = runtime.loadEnvelope(placementEnvelope(4) as never)
    expect(census.inTree, 'M-14 precondition: the path-enumeration case (runtime-host.test.ts:183-189)').toBe(7)
    const html = runtime.renderedHtmlResult().renderedHtml
    const elementCount = (html.match(/data-node-id=/g) ?? []).length
    expect(elementCount, 'M-14 precondition: a depth-4 path emits MANY elements').toBeGreaterThan(3)

    // ATTRIBUTION PROBE (recorded, not a new row): the SAME construct-then-load
    // sequence with the NON-placement demo envelope, measured BEFORE the
    // assertion so the red report names whether a two-root observation belongs
    // to the placement path or to "one load into a runtime that was never
    // bootstrapped" — the sequence the landed row at
    // `tests/runtime-host.test.ts:183-189` itself uses.
    const plainMount = mountEl()
    const plainRuntime = new Runtime({ mount: plainMount as never, envelope: demoEnvelope() as never })
    plainRuntime.loadEnvelope(demoEnvelope() as never)
    const plainRaw = observeMount(plainMount)

    const raw = observeMount(mount)
    expect(
      raw.engineChildCount,
      `M-14 — RAW TREE OBSERVATION (engine-emitted DIRECT children of the mount): ${verbatimOf(
        raw,
      )} · ATTRIBUTION (same sequence, NON-placement demo envelope): ${verbatimOf(plainRaw)}`,
    ).toBe(1)
    expect(raw.childCount, `M-14: the probe counts DIRECT mount children only (§2.4.1). VERBATIM: ${verbatimOf(raw)}`).toBe(1)
    const { probe } = await guard(`M-14 · RAW observation: ${verbatimOf(raw)} · ATTR: ${verbatimOf(plainRaw)}`)
    const res = probe(mount)
    expect(res.count).toBe(1)
    expect(res.ok).toBe(true)
  })

  it('M-15 §3.1 — the loadDoc (snapshot) path obeys the same invariant', async () => {
    const { runtime, mount } = bootedDemo()
    const doc = runtime.exportSerialized()
    runtime.loadDoc(doc)
    const raw = expectRawEngineRoots(mount, 'M-15 (after loadDoc of the serialized export)', 1)
    const { probe } = await guard(`M-15 · RAW observation: ${verbatimOf(raw)}`)
    const res = probe(mount)
    expect(res.count).toBe(1)
    expect(res.ok).toBe(true)
  })

  it('M-16 §3.1 — round-trip identity: legacy → serialized → legacy, no cycle accumulates a second root', async () => {
    const { runtime, mount } = bootedDemo()
    const steps: Array<{ point: string; obs: RawObservation }> = []
    runtime.loadEnvelope(demoEnvelope() as never)
    steps.push({ point: 'step 1 · loadEnvelope(env)', obs: expectRawEngineRoots(mount, 'M-16 step 1', 1) })

    const exported = runtime.exportLegacy()
    expect(exported.template, 'M-16 precondition: exportLegacy returns a legacy envelope').toBeTruthy()
    runtime.loadEnvelope(exported as never)
    steps.push({ point: 'step 2 · loadEnvelope(exportLegacy())', obs: expectRawEngineRoots(mount, 'M-16 step 2', 1) })

    const doc = runtime.exportSerialized()
    runtime.loadDoc(doc)
    steps.push({ point: 'step 3 · loadDoc(exportSerialized())', obs: expectRawEngineRoots(mount, 'M-16 step 3', 1) })

    const { probe } = await guard(`M-16 · RAW observations: ${verbatimList(steps)}`)
    const res = probe(mount)
    expect(res.count).toBe(1)
    expect(res.ok).toBe(true)
  })
})

// ===========================================================================
// F-1..F-10 — §3.2, the documented fail-states (each one a typed violation).
// ===========================================================================
describe('F — §3.2 the documented fail-states (each is a typed violation, and each is a row)', () => {
  it('F-1 §3.2 — ≥ 2 engine-emitted roots: multiple-roots, every id in document order, and the assert THROWS', async () => {
    const { probe, assertion } = await guard('F-1')
    const { mount, landedRootId } = twoRootState()
    const raw = observeMount(mount)
    expect(raw.engineChildCount, `F-1 raw observation: ${JSON.stringify(raw)}`).toBe(2)

    const res = probe(mount)
    expect(res.ok).toBe(false)
    expect(res.violation === null ? null : res.violation.code, 'F-1: violation.code').toBe('multiple-roots')
    expect(res.count, 'F-1: count === 2').toBe(2)
    expect(res.violation!.nodeIds, 'F-1: EVERY child, in document order').toEqual([landedRootId, 'second-root'])
    expect(res.roots.map((r) => r.nodeId)).toEqual([landedRootId, 'second-root'])

    let thrown: unknown = null
    try {
      assertion(mount)
    } catch (e) {
      thrown = e
    }
    expect(thrown, 'F-1: assertMountInvariant throws on the defect class this unit exists for').toBeInstanceOf(Error)
    expect((thrown as Error).message.startsWith('mount invariant violated (multiple-roots): ')).toBe(true)
    expect((thrown as Error).message).toContain(res.violation!.message)
    // RULE 3: a `count === 2` observation is the HOST-FIX branch (S-1) — the
    // assertion above is reported verbatim, never softened.
  })

  it('F-2 §3.2 — zero engine-emitted roots: no-root, count 0, and never an exception or an ok', async () => {
    const { probe } = await guard('F-2')
    const mount = mountEl() // never bootstrapped
    let res: MountInvariantResult | null = null
    expect(() => {
      res = probe(mount)
    }, 'F-2: the empty-mount case is a typed refusal, not an exception').not.toThrow()
    expect(res!.ok, 'F-2: an empty mount is NOT reported as ok').toBe(false)
    expect(res!.violation === null ? null : res!.violation.code).toBe('no-root')
    expect(res!.count).toBe(0)
    expect(res!.roots.length).toBe(0)
    expect(observeMount(mount).engineChildCount, 'F-2 raw: the mount really holds zero engine-emitted children').toBe(0)
  })

  it('F-3 §3.2 — root identity mismatch: a STALE expectation captured before a reload', async () => {
    const { probe } = await guard('F-3')
    const mount = mountEl()
    const runtime = new Runtime({ mount: mount as never, envelope: rootIdEnvelope('guard-root-a') as never })
    runtime.bootstrap()
    const staleRootNodeId = graphNodeId(runtime, 'guard-root-a')

    // The reload: a DIFFERENT envelope whose root is a different node.
    runtime.loadEnvelope(rootIdEnvelope('guard-root-b') as never)
    const observedRootNodeId = graphNodeId(runtime, 'guard-root-b')
    expect(observedRootNodeId, 'F-3 precondition: the two envelopes have different roots').not.toBe(staleRootNodeId)
    expectRawEngineRoots(mount, 'F-3 (after the reload)', 1)

    const res = probe(mount, { rootNodeId: staleRootNodeId })
    expect(res.ok).toBe(false)
    expect(res.violation === null ? null : res.violation.code).toBe('root-identity-mismatch')
    expect(res.count, 'F-3: exactly one root was observed').toBe(1)
    expect(res.expectedRootNodeId, 'F-3: the expectation is echoed on the violation').toBe(staleRootNodeId)
    expect(res.violation!.expectedRootNodeId, 'F-3: §2.1 — the violation carries it too').toBe(staleRootNodeId)
    expect(res.violation!.nodeIds[0], 'F-3: nodeIds[0] is the OBSERVED root, not the expected one').toBe(observedRootNodeId)
    expect(res.roots[0].nodeId).toBe(observedRootNodeId)
  })

  it('F-4 §3.2 — the mount reference mismatch: the caller\'s own claim is checked (mountA !== mountB)', async () => {
    const { probe } = await guard('F-4')
    const mountA = bootedDemo().mount
    const mountB = bootedDemo().mount
    expect(mountA, 'F-4 precondition: two distinct mount elements').not.toBe(mountB)
    expectRawEngineRoots(mountB, 'F-4 (the probed mount itself is healthy)', 1)

    const res = probe(mountB, { mount: mountA })
    expect(res.ok).toBe(false)
    expect(res.violation === null ? null : res.violation.code, 'F-4: a violation of the CALLER\'s claim, not of the tree').toBe(
      'mount-reference-mismatch',
    )
    expect(res.mount, 'F-4: the echo is the probed mount, by reference').toBe(mountB)
  })

  it('F-5 §3.2 — a malformed mount is refused as mount-not-appendable, never thrown', async () => {
    const { probe } = await guard('F-5')
    const malformed: Array<{ label: string; mount: unknown }> = [
      { label: 'null', mount: null },
      { label: 'undefined', mount: undefined },
      { label: 'a string', mount: 'not-a-mount' },
      { label: 'a number', mount: 42 },
      { label: 'an array', mount: [] },
      { label: 'an object with a non-array children', mount: { children: 'x' } },
    ]
    for (const m of malformed) {
      let res: MountInvariantResult | null = null
      expect(() => {
        res = probe(m.mount)
      }, `F-5 (${m.label}): no throw`).not.toThrow()
      expect(res!.ok, `F-5 (${m.label}): ok === false`).toBe(false)
      expect(res!.violation === null ? null : res!.violation.code, `F-5 (${m.label})`).toBe('mount-not-appendable')
      expect(res!.roots.length, `F-5 (${m.label}): roots is empty`).toBe(0)
    }
  })

  it('F-6 §3.2 — a malformed expect is refused as expect-mismatch, never thrown', async () => {
    const { probe } = await guard('F-6')
    const { mount } = bootedDemo()
    const malformed = ['nope', 42, [], true]
    for (const arg of malformed) {
      let res: MountInvariantResult | null = null
      expect(() => {
        res = probe(mount, arg as never)
      }, `F-6 (${JSON.stringify(arg)}): no throw`).not.toThrow()
      expect(res!.ok, `F-6 (${JSON.stringify(arg)}): ok === false`).toBe(false)
      expect(res!.violation === null ? null : res!.violation.code, `F-6 (${JSON.stringify(arg)})`).toBe('expect-mismatch')
    }
  })

  it('F-7 §3.2 — a child with no readable attribute surface: no throw, and it lands in foreignSiblings', async () => {
    const { probe } = await guard('F-7')
    const cases: Array<{ label: string; child: unknown }> = [
      { label: 'neither getAttribute-bearing nor serializable', child: { notAnElement: true } },
      { label: 'serializable but carrying no data-node-id', child: { outerHTML: '<div class="x"></div>' } },
      { label: 'getAttribute-bearing but returning null', child: { getAttribute: () => null } },
      { label: 'a primitive', child: 'bare-string' },
      { label: 'null in the children array', child: null },
    ]
    for (const c of cases) {
      const { mount } = bootedDemo()
      ;(mount.children as unknown[]).push(c.child)
      let res: MountInvariantResult | null = null
      expect(() => {
        res = probe(mount)
      }, `F-7 (${c.label}): the probe must NOT throw on an unreadable child`).not.toThrow()
      expect(res!.count, `F-7 (${c.label}): only a READABLE non-empty id is engine-emitted`).toBe(1)
      expect(res!.ok, `F-7 (${c.label}): the healthy root keeps the state ok`).toBe(true)
      expect(res!.foreignSiblings.length, `F-7 (${c.label}): the unreadable child is a foreign sibling`).toBe(1)
      expect(res!.foreignSiblings[0], `F-7 (${c.label}): reported by reference`).toBe(c.child)
    }
  })

  it('F-8 §3.2 — a duplicated data-node-id is REPORTED twice, never deduped', async () => {
    const { probe } = await guard('F-8')
    // Case A — the same value on two caller-supplied children.
    const dupMount = mountEl()
    const first = mountEl()
    first.setAttribute('data-node-id', 'dup-root')
    const second = mountEl()
    second.setAttribute('data-node-id', 'dup-root')
    dupMount.appendChild(first)
    dupMount.appendChild(second)
    const resA = probe(dupMount)
    expect(resA.ok).toBe(false)
    expect(resA.violation === null ? null : resA.violation.code).toBe('multiple-roots')
    expect(resA.count).toBe(2)
    expect(resA.violation!.nodeIds, 'F-8: the value appears TWICE (a dedupe would hide F-1)').toEqual(['dup-root', 'dup-root'])
    expect(resA.violation!.nodeIds.filter((id) => id === 'dup-root').length).toBe(2)
    expect(resA.roots.length).toBe(2)

    // Case B — the SAME engine node emitted twice (the landed root duplicated).
    const { mount, landedRootId } = twoRootState()
    const echo = mountEl()
    echo.setAttribute('data-node-id', landedRootId)
    mount.appendChild(echo)
    const resB = probe(mount)
    expect(resB.count).toBe(3)
    expect(resB.violation!.nodeIds).toEqual([landedRootId, 'second-root', landedRootId])
    expect(new Set(resB.violation!.nodeIds).size, 'F-8: two distinct values, three observations').toBe(2)
  })

  it('F-9 §3.2 — an EMPTY-STRING data-node-id never satisfies the invariant (and is not a root)', async () => {
    const { probe } = await guard('F-9')
    // Case A — a mount whose ONLY child carries data-node-id="".
    const blankOnly = mountEl()
    const blank = mountEl()
    blank.setAttribute('data-node-id', '')
    blankOnly.appendChild(blank)
    const resA = probe(blankOnly)
    expect(resA.ok, 'F-9: a blank value must NOT satisfy the invariant').toBe(false)
    expect(resA.violation === null ? null : resA.violation.code, 'F-9: a mount of blanks reports no-root, not ok').toBe('no-root')
    expect(resA.count).toBe(0)
    expect(resA.roots.length).toBe(0)
    expect(resA.foreignSiblings.length, 'F-9: the blank child is a foreign sibling').toBe(1)
    expect(resA.foreignSiblings[0]).toBe(blank)

    // Case B — a real root PLUS a blank sibling: the blank must not become a
    // second root (which would be a FALSE multiple-roots) nor break the ok.
    const { mount } = bootedDemo()
    const blankSibling = mountEl()
    blankSibling.setAttribute('data-node-id', '')
    mount.appendChild(blankSibling)
    const resB = probe(mount)
    expect(resB.count, 'F-9: the blank sibling is not a root').toBe(1)
    expect(resB.ok).toBe(true)
    expect(resB.foreignSiblings).toContain(blankSibling)
    expect(resB.roots[0].nodeId.length, 'F-9: the engine-emitted root carries a non-empty id').toBeGreaterThan(0)
  })

  it('F-10 §3.2 — a second argument of null behaves EXACTLY as the omitted case', async () => {
    const { probe } = await guard('F-10')
    const { mount } = bootedDemo()
    const withNull = probe(mount, null)
    expect(withNull.ok).toBe(true)
    expect(withNull.count).toBe(1)
    expect(withNull.violation, 'F-10: no expect-mismatch for null').toBe(null)
    expect(hasOwn.call(withNull, 'expectedRootNodeId'), 'F-10: identical to M-5 — the field stays absent').toBe(false)
    expect(project(withNull)).toEqual(project(probe(mount)))
  })
})
