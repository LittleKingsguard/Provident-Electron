/**
 * INTEGRATION RED SET — module wave, unit `U-STORE-CORE` (ledger G1), PHASE 5 (the family's T4),
 * re-frozen by `AMENDMENT TENANT-1` (2026-10-03, the tenant-admitting pass — the architect's
 * "Proceed with integration").
 *
 * SOLE INPUTS (the re-frozen artifacts; nothing else was read):
 *   - `module-wave-scratch/frozen-surface.md`                         (module `store-core-graph`)
 *   - `module-wave-scratch/frozen-surface-store-graph-references.md`  (module `store-graph-references`)
 * The consuming tree's `src/**` implementation, the unit's legacy in-repo suite
 * (`tests/store-core-graph.test.ts`, `tests/store-core-graph-register.ts`) and every other spec
 * were NOT read. The only declarations about the second root used here are: the field-3 supplied
 * pair, field 6's wiring point, and field 7's licence.
 *
 * THE SUPPLIED PAIR (field 3, `AMENDMENT TENANT-1`):
 *   START — `src/renderer/renderer.ts` `main()`: the realm's BOOT path — the store is constructed
 *           ONCE per realm at boot, after the realm's own runtime construction and before the
 *           boot sequence's hand-off, held in a realm-scope binding OWNED BY THE WIRING; the
 *           `subscribe(...)` calls the wiring needs are registered at that same point (field 6
 *           row 1; the contract's §5.1 row 6 — the WIRING ROLE ONLY, it authors NO UI content
 *           and NO DOM; §0A note 8 — the store is TOTAL and never refuses construction).
 *   END — THIS FILE: the module-external test that imports the wired surface and asserts the
 *           settled end states of that boot flow — never a value read out of the module's
 *           internals (field 3's own outside-value).
 *
 * THE SEAM THIS TEST DECLARES (legitimate red-row driver — the brief's licence: "report any seam
 * that needs the Implementer to expose an export"). `main()` cannot run in a node test (its boot
 * needs the bridge/DOM), and the artifact's END requires a test that "imports the wired surface
 * and asserts the settled end states of that boot flow"; the store lives in a wiring-owned
 * binding (field 3/6). The ONLY module-external window on the boot flow's end states is
 * therefore a named export the wiring exposes from `src/renderer/renderer.ts`:
 *
 *     export function getWiredGraphStore(): GraphStore
 *
 * answering the realm's ONE boot-constructed store (constructed, per field 6, in `main()`'s boot
 * sequence after the runtime and before the hand-off). `src/renderer/renderer.ts` is edit-set
 * member 3 (the declared host wiring point); THIS TEST is edit-set member 4: the Implementer
 * conforms the wiring TO this seam name and makes these rows green — this test's declarations are
 * the red set's. Every W/S row below is RED TODAY because renderer.ts constructs no store and
 * exposes no such seam (field 3's as-filed measurement: "main() ... never constructs a graph
 * store"; D-9: "the location is unexercised").
 *
 * ROW GROUPS AND DERIVATIONS (every row is derived from the artifact cells cited in its own
 * comment; every runtime row is RED against the current second root):
 *   W1–W4  wiring / start flow ................... field 3 + field 6 + §5.1 row 6 + §0A note 8
 *   S1–S9  the wired store's settled end states .. field 2 (2.1/2.2/2.3/2.4) + field 4 + field 5,
 *          driven THROUGH the wiring seam (the END point's "through the wiring" breadth — the
 *          seat owns the 84-row sweep; here the breadth is the artifact's own pins)
 *   E1–E2  the input module boundary (E-1/D-5) ... sibling artifact field 2 + field 5; store
 *          field 5 T-1(a) — rows carried VERBATIM and UNINTERPRETED all the way to the store's
 *          construction refusal (E3 was authored, then DROPPED — the landed build already
 *          refuses duplicate declarations at construction, so a direct drive of arm (c) runs
 *          GREEN; a row that passes today is a finding)
 *   C1a/b  the export census BY NAME (D-1) ........ field 2's census (2 values + 27 types = 29);
 *          measured as a static byte-scan because type declarations have no runtime presence —
 *          the artifact's field 2 demands "a row asserting a COUNT without NAMING the names
 *          FAILS", and the review's own measurement ("2 + 29 = 31 against the operative 2 + 27
 *          = 29") is a byte measure of the same surface
 *   C2     [typecheck-leg row, D-1/D-3] .......... the store's `resolve` return type is exactly
 *          `GraphReadHit | GraphReadMiss` (three cases and no fourth) — a compile-time equality;
 *          it reddens `npm run typecheck:tests` (the only instrument that can measure a type
 *          union) while the merged arm stands in the union, and M1 carries the same closure at
 *          runtime (C3 was authored, then dropped: the current build's `keyof GraphReadHit` /
 *          `GraphReadMiss` do not contain the withdrawn members, so the member-level rows ran
 *          green — see the dropped-note in the file)
 *   M1–M3  the merged arm and the second authority . field 2.3 (three cases and no fourth; HIT
 *          "answers from that node alone — no composition, no provenance list, no second
 *          holder"), D-1/D-3 (merged arm WITHDRAWN), E-3 (CR-1: a refused write must not mint a
 *          root), D-6 (no depth bound — "a red set may drive a chain deeper than 64 and must not
 *          be written to depend on the bound's presence")
 *   M4/M5  THE GATE-4 REMAND (the T6 HIGH, from the artifact alone): the tier-local clear of a
 *          written parent whose CHILD survives — the parent read answers the DECLARED MISS
 *          (declared-but-unwritten-parent-with-a-written-child) and the surviving child answers
 *          HIT, DISCRIMINATED from a WRITTEN leaf holding `undefined` as its own VALUE (a legal
 *          HIT — the value is opaque) .. field 2's clear row + MISS arm + value row, §2.8 item 4,
 *          §3.1 M-5's re-derived form (iii)/(i). RED today: the conformed walk answers
 *          HIT-with-`undefined` at the cleared parent — the clear leaves the node in place and
 *          the walk has no value-presence check, so the declared MISS arm is never reached.
 *   X1/X2  the crossing seam (D-4) ................. field 2.1/2.5 + §2.8 items 5(5)/7/8 — the
 *          `file`-tier write pushes a STABLE-JSON translation through the declared seam,
 *          `crossings: 1` for the whole regenerated set — never a synthesised integer
 *   U1/U2  the sixteen-token refusal union (field 5): a reason is a RETURNED RECORD member,
 *          NEVER a throw (tokens #14/#16 driven as their declared returned records)
 *
 * DETERMINISM AND SCOPE: no `Math.random`, no clock, no ambient read; enumeration rows print
 * their terms (C1a's 29 names, E2's malformed-row terms, S9's eight seam keys, the eight `cause`
 * arms as data, U0's sixteen tokens); totals are modest — 33 runtime rows + 1 type-level row,
 * and RCAP-1's 1024-enumeration is NOT re-driven here (the seat owns the exhaustive sweep).
 *
 * LEG NOTE: row C2 is erased at vitest runtime (type unions have no runtime bytes). It is part
 * of this red set precisely because the D-1/D-3 merged-arm closure is a TYPE-surface fact; it
 * reddens the repo's `npm run typecheck:tests` leg and is reported here as such.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  createGraphStore,
  type GraphEvent,
  type GraphLoadError,
  type GraphNodeFlag,
  type GraphReadHit,
  type GraphReadMiss,
  type GraphRefusalReason,
  type GraphRegisterRow,
  type GraphResolveResult,
  type GraphStore,
  type GraphTierHandle,
  type GraphWriteReceipt,
  type GraphTierToken,
  type GraphNodeRef,
  type GraphAnchor,
  type GraphLink,
  type GraphNode,
  type GraphCrossing,
  type GraphConstraint,
  type GraphRegister,
  type GraphRegisterCacheEntry,
  type GraphLinkCacheEntry,
  type GraphResolveStep,
  type GraphResolveDiagnostic,
  type GraphSubscription,
  type GraphWriteOptions,
  type GraphAffectedRow,
  type GraphTierGetResult,
} from '../src/renderer/store-core-graph.js'
import {
  storeGraphReferences,
  type StoreGraphDeclarationInput,
  type StoreGraphDeclarationRow,
  type StoreGraphReferenceFixture,
} from '../src/renderer/store-graph-references.js'

/* =============================================================================================
 * G0 — PRINTED TERMS (the by-name data the artifact's own counting rules demand; data, not rows)
 * ============================================================================================= */

/** Field 2's export census BY NAME: 2 value exports + 27 type declarations = 29, arithmetic
 *  `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓. `GraphPart`/`GraphMergedRead` are WITHDRAWN
 *  (D-1) and are NOT in this list. */
const SURFACE_CENSUS_29: readonly string[] = [
  // 2 value exports
  'createGraphStore',
  'createGraphStoreError',
  // 3 domain
  'GraphTierToken',
  'GraphNodeFlag',
  'GraphRefusalReason',
  // 6 graph-structure
  'GraphNodeRef',
  'GraphNode',
  'GraphAnchor',
  'GraphLink',
  'GraphTierHandle',
  'GraphCrossing',
  // 4 register-and-cache
  'GraphRegisterRow',
  'GraphRegister',
  'GraphRegisterCacheEntry',
  'GraphLinkCacheEntry',
  // 1 constraint
  'GraphConstraint',
  // 0 provenance — NONE, GraphPart being WITHDRAWN (D-1)
  // 4 read-result shapes and their union
  'GraphReadHit',
  'GraphReadMiss',
  'GraphResolveResult',
  'GraphTierGetResult',
  // 2 walk
  'GraphResolveStep',
  'GraphResolveDiagnostic',
  // 2 event
  'GraphEvent',
  'GraphSubscription',
  // 5 receipt / rows-pair / options / store / error
  'GraphWriteReceipt',
  'GraphAffectedRow',
  'GraphWriteOptions',
  'GraphStore',
  'GraphLoadError',
]

/** Field 5's CLOSED refusal-reason union BY NAME — SIXTEEN members:
 *  `8` held + `5` this contract's amendment + `3` the two architect amendments, 8 + 5 + 3 = 16 ✓.
 *  "A reason is a RETURNED RECORD MEMBER; it is NEVER a throw." */
const REFUSAL_UNION_SIXTEEN: readonly GraphRefusalReason[] = [
  'undeclared-name',
  'malformed-name',
  'secure-refused',
  'reserved-name',
  'malformed-pattern',
  'cap-exceeded',
  'ambiguous-path',
  'reserved-namespace',
  'duplicate-path-tier',
  'no-such-anchor',
  'severed-link',
  'rebuild-failed',
  'tier-filter-miss',
  'serialize-failed',
  'validate-failed',
  'durability-inversion',
]

/** Field 4.3's event envelope — the EIGHT `cause` arms, printed with their member sets
 *  (✓ = required and non-empty in substance; — = required as a KEY, empty/undefined): */
const CAUSE_ARMS_EIGHT: readonly { cause: GraphEvent['cause']; name: boolean; flag: boolean; value: boolean; cleared: boolean; origin: boolean; subtree: boolean }[] = [
  { cause: 'set', name: true, flag: true, value: true, cleared: false, origin: false, subtree: false },
  { cause: 'commit', name: true, flag: true, value: true, cleared: true, origin: false, subtree: false },
  { cause: 'clear', name: true, flag: true, value: false, cleared: false, origin: false, subtree: false },
  { cause: 'sweep', name: true, flag: true, value: false, cleared: false, origin: false, subtree: false },
  { cause: 'remove', name: true, flag: true, value: false, cleared: true, origin: false, subtree: false },
  { cause: 'repair', name: true, flag: true, value: true, cleared: true, origin: false, subtree: false },
  { cause: 'descendant', name: true, flag: true, value: false, cleared: false, origin: true, subtree: true },
  { cause: 'severed', name: true, flag: true, value: false, cleared: true, origin: false, subtree: false },
]

/** The eight test-seam members (field 2.3's seam census, `4` as-filed + `4` appended = `8` ✓);
 *  PRESENT only under `{ enableTestSeam: true }`, ABSENT in a production-shaped construction. */
const TEST_SEAM_KEYS_EIGHT: readonly string[] = [
  'reset',
  'seed',
  'parentLinkCountOf',
  'cacheEntryFor',
  'nodeFor',
  'anchorFor',
  'linkFor',
  'failNextCacheRebuild',
]

/* =============================================================================================
 * HELPERS
 * ============================================================================================= */

/** The wiring seam — see the header's SEAM declaration. RED today (renderer.ts constructs no
 *  store; D-9: "the location is unexercised"). */
async function wiringSeam(): Promise<() => GraphStore> {
  const ns = (await import('../src/renderer/renderer.js')) as unknown as Record<string, unknown>
  const seam = ns.getWiredGraphStore
  if (typeof seam !== 'function') {
    throw new Error(
      'W1-red: src/renderer/renderer.ts exposes no getWiredGraphStore() seam — field 3/6 declare the ' +
        'store constructed once per realm at boot, held in a realm-scope binding owned by the wiring, ' +
        'observable only through the exported wiring surface this test pins; the wiring has not landed',
    )
  }
  return seam as unknown as () => GraphStore
}

/** The wired store — the END point's settled object of the boot flow, driven through the seam. */
async function wiredStore(): Promise<GraphStore> {
  const seam = await wiringSeam()
  return seam()
}

/** Field 2.3's HIT arm shape, exact: `{ found: true, value, tier, flag, cache, name }`. */
const HIT_KEYS: readonly string[] = ['cache', 'flag', 'found', 'name', 'tier', 'value']
/** Field 2.3's MISS arm shape, exact: `{ found: false, value: undefined, tier: null, cache: null, name }`. */
const MISS_KEYS: readonly string[] = ['cache', 'found', 'name', 'tier', 'value']

describe('U-STORE-CORE module wave — T4 integration red set (fields 3/6 wiring + modules\' exported surfaces)', () => {
  /* ===========================================================================================
   * GROUP W — THE WIRING SURFACE (the start flow) — field 3 + field 6 + §5.1 row 6 + §0A note 8
   * Every row red today: renderer.ts constructs no store and exposes no seam.
   * =========================================================================================== */

  it('W1 — the wired surface exports the wiring seam (renderer.ts must expose getWiredGraphStore())', async () => {
    // Field 3 (END): "the module-external test file at the second root that imports the wired
    // surface and asserts the settled end states of that boot flow" — the wiring's realm-scope
    // binding (field 6) must be reachable by import; field 6 names main() as the only legitimate
    // wiring location, and main() is not driveable in a node test, so the seam is the export
    // this row pins (the brief's license: report any seam needing an exported seam — this is it).
    const ns = (await import('../src/renderer/renderer.js')) as unknown as Record<string, unknown>
    expect(typeof ns.getWiredGraphStore).toBe('function')
  })

  it('W2 — the seam answers a GraphStore-shaped object and never refuses construction (total store, §0A note 8)', async () => {
    // Field 6: the wiring "constructs the store once per realm at boot". §0A note 8: "the store is
    // TOTAL and never refuses construction". Field 2.3: GraphStore's members. Derivable words only —
    // the seam's store must be an object with the interface's callable members and view members.
    const seam = await wiringSeam()
    const store = seam() // no throw = construction never refused
    expect(typeof store.resolve).toBe('function')
    expect(typeof store.set).toBe('function')
    expect(typeof store.commit).toBe('function')
    expect(typeof store.subscribe).toBe('function')
    expect(typeof store.tiers).toBe('object')
    expect(typeof store.register).toBe('object')
  })

  it('W3 — exactly ONE store per realm at boot: the seam answers the SAME binding on every read', async () => {
    // Field 3/field 6: constructed once per realm at boot, "held in a realm-scope binding owned by
    // the wiring" — repeated reads of the seam answer the one held store, never a second
    // construction (a second construction is the ROW that counts constructions, §3.4 R-12(b)).
    const seam = await wiringSeam()
    expect(seam()).toBe(seam())
  })

  it('W4 — the wiring authors NO UI content and NO DOM: the seam constructs in a DOM-less node runtime', async () => {
    // Field 6 / §5.1 row 6: "It authors NO UI content and NO DOM". The observable through the
    // module-external seam: the seam's construction must work in this bare environment (no
    // `document`, no `window`), i.e. the wiring's construction does not hand-write DOM.
    expect((globalThis as { document?: unknown }).document).toBeUndefined() // environment precondition
    const seam = await wiringSeam()
    const store = seam()
    expect(typeof store.commit).toBe('function')
  })

  /* ===========================================================================================
   * GROUP S — THE WIRED STORE'S SETTLED END STATES, driven THROUGH the wiring seam
   * (fields 2/4/5 — the breadth the artifact pins; the seat owns the exhaustive sweep).
   * Every row red today: the seam does not exist.
   * =========================================================================================== */

  it('S1 — a HIT resolves with the exact { found, value, tier, flag, cache, name } shape; cache IS store.tiers[flag] by identity; name is the caller\'s spelling', async () => {
    // Field 2.3 HIT arm (exact shape); §2.5 item 3 / §3.1 M-3: `cache` IS `store.tiers[hit.flag]`
    // (`toBe`) — a VIEW, never a copy; name = "the caller's own spelling".
    const store = await wiredStore()
    store.commit('mem.s1', { k: 1 })
    const hit = store.resolve('mem.s1')
    expect(hit).toBeTypeOf('object')
    if (hit.found !== true) throw new Error('S1-red: expected a HIT for a committed reference')
    expect(Object.keys(hit).sort()).toEqual(HIT_KEYS)
    expect(hit.value).toEqual({ k: 1 })
    expect(hit.tier).toBe('mem')
    expect(hit.flag).toBe('mem')
    expect(hit.cache).toBe(store.tiers[hit.flag])
    expect(hit.name).toBe('mem.s1')
  })

  it('S2 — a MISS answers the exact { found: false, value: undefined, tier: null, cache: null, name } shape (a removed logical path\'s post-state)', async () => {
    // Field 2.3 remove row: "its post-state is a MISS on that logical path at every tier the name
    // reaches"; field 2.3 MISS arm (exact shape) — "NEVER a composite and NEVER a refusal".
    const store = await wiredStore()
    store.commit('mem.miss1', 1)
    store.remove('mem.miss1')
    const miss = store.resolve('mem.miss1')
    expect(miss.found).toBe(false)
    expect(Object.keys(miss).sort()).toEqual(MISS_KEYS)
    expect((miss as GraphReadMiss).value).toBeUndefined()
    expect((miss as GraphReadMiss).tier).toBeNull()
    expect((miss as GraphReadMiss).cache).toBeNull()
    expect((miss as GraphReadMiss).name).toBe('mem.miss1')
  })

  it('S3 — a tier-qualified read of a node held at another flag answers the QUALIFIED returned record \'tier-filter-miss\' at H-FLAG — never a fall-through, never a throw', async () => {
    // Field 2.3 QUALIFIED arm: the returned record 'tier-filter-miss' at step H-FLAG, naming the
    // node's OWN flag AND the flag the filter asked for — "NOT a fall-through". Field 5 token #13.
    const store = await wiredStore()
    store.commit('mem.q1', 1)
    const ans = store.resolve('file.q1') as unknown as { reason?: string; step?: string }
    expect(ans.reason).toBe('tier-filter-miss')
    expect(ans.step).toBe('H-FLAG')
    const rendered = JSON.stringify(ans)
    expect(rendered).toContain('"mem"') // the node's OWN flag
    expect(rendered).toContain('"file"') // the flag the filter asked for
  })

  it('S4 — set never mints and never clears; commit is the only minting operation; set rewrites a held pair and answers cleared: []', async () => {
    // Field 2.3 set row: "NEVER CLEARS, NEVER MINTS A NODE AND NEVER CHANGES A FLAG … a set on a
    // path with no node is REFUSED 'undeclared-name'"; commit row: "THE MINTING … OPERATION".
    const store = await wiredStore()
    const refused = store.set('mem.s4', 1)
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('undeclared-name')
    expect(refused.cleared).toEqual([])
    const minted = store.commit('mem.s4', 1)
    expect(minted.status).toBe('committed')
    const edited = store.set('mem.s4', 2)
    expect(edited.status).toBe('committed')
    expect(edited.cleared).toEqual([]) // "a set on a path whose pair holds a node writes that node's value and answers cleared: []"
    expect((store.resolve('mem.s4') as GraphReadHit).value).toBe(2)
  })

  it('S5 — commit at a higher tier CLEARS THE SAME LOGICAL PATH in every lower-durability tier (by logical path, after acceptance), and the node\'s flag is the committed tier\'s', async () => {
    // Field 2.3 commit row: "CLEARS THE SAME LOGICAL PATH IN EVERY LOWER-DURABILITY TIER, AND ONLY
    // THAT — AFTER the higher tier durably accepted the value, NEVER BEFORE; by logical path,
    // never by suffix/prefix, never a higher tier, never recursive".
    const store = await wiredStore()
    store.commit('temp.cle', 1)
    const regenerated = store.commit('mem.cle', 2)
    expect(regenerated.status).toBe('committed')
    expect(regenerated.cleared).toContain('temp.cle')
    const hit = store.resolve('mem.cle') as GraphReadHit
    expect(hit.found).toBe(true)
    expect(hit.value).toBe(2)
    expect(hit.flag).toBe('mem')
  })

  it('S6 — remove clears downward (the named tier and every less-persistent copy), names the cleared references in cleared[], and leaves a MISS on that logical path at every tier it reaches', async () => {
    // Field 2.3 remove row: "remove('temp.x') → temp only", "its post-state is a MISS on that
    // logical path at every tier the name reaches".
    const store = await wiredStore()
    store.commit('temp.r1', 1)
    const receipt = store.remove('temp.r1')
    expect(receipt.status).toBe('committed')
    expect(receipt.cleared).toEqual(['temp.r1'])
    const miss = store.resolve('temp.r1') as GraphReadMiss
    expect(miss.found).toBe(false)
    expect(miss.value).toBeUndefined()
  })

  it('S7 — subscribe returns { name, subtree:false, unsubscribe() }; a write emits the envelope {name, flag, value, cleared[], cause} per arm; events counts EVENTS not deliveries; an equal-value set fires NOTHING; a write pings only its own path', async () => {
    // Field 2.3 subscribe row + field 4.3's eight-arm table (set/commit/remove rows) + field 2.6:
    // "events IS the count of events emitted — NOT the count of listeners invoked" (§2.10 item 5);
    // 'set' row: "an equal-value write fires NOTHING"; "a write pings exactly its own path and
    // NEVER writes, clears or pings a persistent ancestor" (§2.10 item 6); "cleared[] is PRESENT
    // AND POSSIBLY EMPTY on every arm and is NEVER omitted"; "value is present as a KEY on every
    // arm"; subscription is PER REALM, PER REFERENCE.
    const store = await wiredStore()
    const deliveries: GraphEvent[] = []
    const otherDeliveries: GraphEvent[] = []
    store.commit('mem.ev', 1)
    const sub = store.subscribe('mem.ev', (e) => deliveries.push(e))
    store.subscribe('mem.other', (e) => otherDeliveries.push(e))
    expect(sub.name).toBe('mem.ev')
    expect(sub.subtree).toBe(false)
    expect(typeof sub.unsubscribe).toBe('function')

    const setReceipt = store.set('mem.ev', 2)
    expect(setReceipt.events).toBe(1) // one event emitted
    expect(deliveries).toHaveLength(1)
    expect(deliveries[0].cause).toBe('set')
    expect(deliveries[0].name).toBe('mem.ev')
    expect(deliveries[0].flag).toBe('mem')
    expect(deliveries[0].value).toBe(2)
    expect('value' in deliveries[0]).toBe(true) // value present as a KEY on every arm
    expect('cleared' in deliveries[0]).toBe(true) // cleared[] NEVER omitted
    expect(otherDeliveries).toHaveLength(0) // a write pings exactly its own path

    store.commit('mem.ev', 3)
    expect(deliveries[1].cause).toBe('commit')

    store.set('mem.ev', 3) // EQUAL value — fires NOTHING ("a set is NOT a commit")
    expect(deliveries).toHaveLength(2)

    store.remove('mem.ev')
    expect(deliveries[2].cause).toBe('remove')
    expect(deliveries[2].value).toBeUndefined() // the 'remove' arm is distinguishable by token and by value: undefined
    expect('value' in deliveries[2]).toBe(true)

    expect(sub.unsubscribe()).toBe(true)
    expect(sub.unsubscribe()).toBe(false) // true the FIRST time and false on every later call — never a throw (§2.10 item 4)
    store.commit('mem.ev', 4)
    expect(deliveries).toHaveLength(3) // unsubscribed: no further deliveries
  })

  it('S7b — sever deletes the file-flagged far-side node, emits EXACTLY ONE cause:\'severed\' event per released reference, names the released reference in the receipt\'s cleared[], and the released subscription is gone', async () => {
    // Field 2.3 sever row: "DELETES the file-flagged node on the far side of the link, RELEASES
    // EVERY SUBSCRIPTION registered on that node or on any reference it held, and EMITS EXACTLY
    // ONE cause:'severed' EVENT PER RELEASED REFERENCE, naming the released reference in its own
    // name and in the severing receipt's cleared[]; after the severance the subscription count for
    // each released reference reads exactly 0"; field 4.3 'severed' arm: cleared[] = the references
    // the severance cleared.
    const store = await wiredStore()
    store.commit('file.sevpar', 1) // file root; invariant vacuous at a root
    store.commit('file.sevpar.kid', 2) // file child under a file parent — monotonic persistence holds
    const sevDeliveries: GraphEvent[] = []
    store.subscribe('file.sevpar.kid', (e) => sevDeliveries.push(e))
    const receipt = store.sever('file.sevpar', 'kid')
    expect(receipt.status).toBe('committed')
    expect(receipt.cleared).toContain('file.sevpar.kid')
    expect(sevDeliveries).toHaveLength(1)
    expect(sevDeliveries[0].cause).toBe('severed')
    expect(sevDeliveries[0].name).toBe('file.sevpar.kid')
    // the release is real: "after the severance the subscription count for each released
    // reference reads exactly 0" — re-minting the reference does NOT re-arm the released
    // subscription, and a write on the re-minted reference delivers nothing to it
    store.commit('file.sevpar.kid', 3)
    store.set('file.sevpar.kid', 4)
    expect(sevDeliveries).toHaveLength(1)
  })

  it('S7c — ancestors fire ONLY for {subtree:true} subscribers: a descendant write delivers cause:\'descendant\' with origin = the written path fully qualified and subtree:true; an exact subscriber on the ancestor is not pinged', async () => {
    // Field 2.3 subscribe opts row: "{subtree:true} is the AMPLIFIER FORM"; field 4.3 'descendant'
    // row: "ancestors fire ONLY for {subtree:true} subscribers; an ancestor with no opt-in
    // subscriber fires NOTHING; origin is the WRITTEN PATH FULLY QUALIFIED"; "a write pings
    // exactly its own path".
    const store = await wiredStore()
    store.commit('mem.anc', 1)
    const ancestorEvents: GraphEvent[] = []
    const exactEvents: GraphEvent[] = []
    const sub = store.subscribe('mem.anc', (e) => ancestorEvents.push(e), { subtree: true })
    expect(sub.subtree).toBe(true)
    store.subscribe('mem.anc', (e) => exactEvents.push(e)) // exact-reference subscriber — never capped
    store.commit('mem.anc.kid', 2)
    expect(ancestorEvents).toHaveLength(1)
    expect(ancestorEvents[0].cause).toBe('descendant')
    expect(ancestorEvents[0].origin).toBe('mem.anc.kid') // the WRITTEN PATH FULLY QUALIFIED
    expect(ancestorEvents[0].subtree).toBe(true)
    expect(exactEvents).toHaveLength(0)
  })

  it('S7d — a non-callable listener is refused \'malformed-name\' and registers NOTHING (field 5 token #2; §2.10 item 4)', async () => {
    // Field 5 token #2's observable: "Subscribe: the same token, registering nothing". The
    // observable through the store surface: the call does not throw, and a later write on the
    // same reference delivers nothing.
    const store = await wiredStore()
    const deliveries: GraphEvent[] = []
    store.commit('mem.nc', 1)
    expect(() =>
      store.subscribe('mem.nc', 42 as unknown as (event: GraphEvent) => void),
    ).not.toThrow()
    store.subscribe('mem.nc', (e) => deliveries.push(e))
    store.set('mem.nc', 2)
    expect(deliveries).toHaveLength(1) // exactly the one real listener was registered
  })

  it('S8 — the tiers/register views: tiers is the three collections {temp, mem, file} (GraphNodeFlag — no secure collection), each handle the SAME object every read; tier.get answers { found, value, name } with the caller\'s spelling; register rows are top-level-only, derived: true, nodeRef never null, with NO tier member', async () => {
    // Field 2.3 tiers/register rows + field 2.4: "GraphNodeFlag is 'temp' | 'mem' | 'file' — three
    // members"; handles are "the SAME object each time it is read"; tier get's `readonly name` is
    // the caller's own spelling; register row: "derived is true on every row that exists;
    // nodeRef:null never appears in a register row; No register row carries a tier member at all".
    const store = await wiredStore()
    expect(Object.keys(store.tiers).sort()).toEqual(['file', 'mem', 'temp'])
    expect(store.tiers.mem).toBe(store.tiers.mem)
    const handle: GraphTierHandle = store.tiers.mem
    store.commit('mem.v8', 7)
    const got = handle.get('mem.v8')
    expect(got).toMatchObject({ found: true, value: 7, name: 'mem.v8' })
    store.commit('temp.t8', 9)
    const rows: readonly GraphRegisterRow[] = store.register.rows
    const names = rows.map((r) => r.name)
    expect(names).toContain('v8')
    expect(names).toContain('t8')
    for (const row of rows) {
      expect(row.derived).toBe(true) // derived:false is UNREACHABLE
      expect(row.nodeRef).not.toBeNull()
      expect(row).not.toHaveProperty('tier') // no tier member at all
      expect(row.name).not.toContain('.') // top-level names only — nothing below a root is registered
    }
  })

  it('S9 — the wired store is production-shaped: all EIGHT test-seam members are ABSENT as rows (only { enableTestSeam: true } enables them; §3.4 R-12(c) read over all eight)', async () => {
    // Field 2.3's seam census (8 = 4 as-filed + 4 appended ✓): "ALL EIGHT KEYS ARE ABSENT in a
    // production-shaped construction and PRESENT only under { enableTestSeam: true }"; §3.4
    // R-12(c): the key set is read over all eight. The realm's boot store is a production store.
    const store = await wiredStore()
    for (const key of TEST_SEAM_KEYS_EIGHT) {
      expect((store as unknown as Record<string, unknown>)[key], key).toBeUndefined()
    }
  })

  /* ===========================================================================================
   * GROUP E — THE INPUT MODULE BOUNDARY (E-1 / D-5): rows carried VERBATIM and UNINTERPRETED
   * into the store's construction — the six-arm construction refusal set is the store's own
   * (sibling artifact field 2/5; store field 5 T-1). RED today: the landed input module
   * filters/rebuilds rows, so a malformed row never reaches construction (E-1/D-5).
   * =========================================================================================== */

  it('E1 — storeGraphReferences carries the caller\'s rows VERBATIM: the returned input holds the caller\'s own row objects, { name, reserved:false } kept exactly as given (no rebuild, no default, no spelling of its own)', () => {
    // Sibling field 2: "the rows are carried VERBATIM and UNINTERPRETED, and the module adds no
    // default, no policy predicate and no spelling of its own"; field 4.2: "the rows are the
    // caller's own values, carried; the array wrapper is the module's".
    const row: StoreGraphDeclarationRow = { name: 'mem.window', reserved: false }
    const input: StoreGraphDeclarationInput = storeGraphReferences([row])
    expect(input.rows).toHaveLength(1)
    expect(input.rows[0]).toBe(row) // the caller's own value, carried — not a rebuilt object
    expect(input.rows[0].reserved).toBe(false) // no default, no re-spelling
  })

  it.each([42, 'x', null, Symbol('s'), [1, 2]])(
    'E2 — malformed row term %s is carried through storeGraphReferences into the STORE\'s construction, which REFUSES it with a thrown GraphLoadError reason \'malformed-name\' (T-1 arm (a))',
    (term) => {
      // Sibling field 2: the malformed shapes are "the store's own construction-refusal subjects
      // and are NOT this module's fail-states"; field 5 T-1(a): "a declared row carrying no name,
      // a non-string or an empty name → 'malformed-name' at construction — thrown GraphLoadError";
      // the sibling's field-5 rule: "A red set derived from this artifact alone must drive a
      // malformed row all the way to the store's construction refusal". RED today: E-1/D-5 — the
      // landed module silently skips each of these rows, construction LOADS, and no throw occurs.
      const input = storeGraphReferences([term as unknown as StoreGraphDeclarationRow])
      let thrown: unknown = null
      try {
        createGraphStore({ declarations: input })
      } catch (err) {
        thrown = err
      }
      expect(thrown).toBeInstanceOf(Error) // a thrown GraphLoadError — T-1 arm (a)
      expect((thrown as GraphLoadError).reason).toBe('malformed-name')
    },
  )

  // NOTE (E3, AUTHORED AND DROPPED): "a name declared TWICE in the input reaches the store's
  // construction refusal arm (c): thrown GraphLoadError with reason 'undeclared-name' (field 5
  // token #1's construction site)" — driven directly on the module's exported surface this row
  // runs GREEN today: the landed build already refuses duplicate declarations at construction.
  // A row that passes today is a finding (the brief's own discipline), so the direct drive is
  // removed; arm (c) is the seat's sweep's subject, not a divergence of the second root.

  /* ===========================================================================================
   * GROUP C — THE EXPORT CENSUS BY NAME (D-1) and the type-surface rows (D-1/D-3).
   * RED today: the landed store module exports 31 names (2 values + 29 types) including the
   * withdrawn `GraphPart` / `GraphMergedRead`, against the surface's 29.
   * =========================================================================================== */

  it('C1a — the store module\'s export census, measured byte-for-byte, equals the surface\'s TWENTY-NINE names BY NAME (2 values + 27 types — the contract\'s §2.1 item 3 census; D-1)', () => {
    // Field 2's census: "TWENTY-NINE exported names", "a row asserting a COUNT without NAMING the
    // names FAILS". Type declarations have no runtime presence, so the by-name census is measured
    // as a static scan of the module's own bytes — the same byte-measure the review §2 row 6 used
    // ("2 + 29 = 31 against the operative 2 + 27 = 29"). RED today: the scan finds 31 names.
    const source = readFileSync(new URL('../src/renderer/store-core-graph.ts', import.meta.url), 'utf8')
    const scanned = exportedNamesOf(source)
    expect([...scanned].sort()).toEqual([...SURFACE_CENSUS_29].sort())
  })

  it('C1b — the WITHDRAWN pair GraphPart and GraphMergedRead are NOT exported (D-1: the two withdrawn declarations must not be reachable)', () => {
    // Field 2, D-1: the extra two build declarations "are the pair the architect's merged-arm
    // ruling (§0(A3)) WITHDREW — GraphPart and GraphMergedRead". RED today: both are still in the
    // build's export set.
    const source = readFileSync(new URL('../src/renderer/store-core-graph.ts', import.meta.url), 'utf8')
    const scanned = exportedNamesOf(source)
    expect(scanned).not.toContain('GraphPart')
    expect(scanned).not.toContain('GraphMergedRead')
  })

  // -------------------------------------------------------------------------------------------
  // [typecheck-leg rows — C2/C3] Compiled by `npm run typecheck:tests` (tsc, not vitest: type
  // exports are erased at vitest runtime). RED today, green once the modules conform to D-1/D-3.
  // -------------------------------------------------------------------------------------------
  /* C2 — the surface's `GraphResolveResult = GraphReadHit | GraphReadMiss` (§2.5 item 4's
   * annotation: the read's surviving case set is "three cases and no fourth: HIT · QUALIFIED ·
   * MISS"): the row is pointed at the REACHABLE surface — the store's `resolve` return type
   * (field 2.1's interface) — where the landed build's stale merged arm is observed (D-1/E-3:
   * "the read's merged arm is still LIVE"); the type-level equality fails while the arm stands
   * in the union, and passes once the modules conform. */
  type C2_RESOLVE_RETURNS_HIT_OR_MISS = Expect<
    Equal<ReturnType<GraphStore['resolve']>, GraphReadHit | GraphReadMiss>
  >
  /* C3 — AUTHORED AND DROPPED. "the hit and miss arms carry NO `merged` and NO `parts` member
   * at all (D-3)" was written as four type-level rows (`'merged' extends keyof GraphReadHit ?
   * false : true` …); on the CURRENT build `keyof GraphReadHit` / `keyof GraphReadMiss` do NOT
   * contain the withdrawn members, so all four rows compile clean — a row that passes today is
   * a finding, and the drop is recorded rather than silently kept. The D-3 closure is carried
   * by the reachable surface instead: C2 above (the resolve-return union) and M1 at runtime
   * (a resolve answer carries no `merged`/`parts` key). Revisit only if a future build's type
   * surface regrows the members — the rows must sit on a surface that reddens. */

  /* ===========================================================================================
   * GROUP M — THE MERGED ARM / THE SECOND AUTHORITY / THE DEPTH BOUND (D-1/D-3, E-3(CR-1), D-6)
   * =========================================================================================== */

  it('M1 — a tier-free resolve over a logical path held at TWO tiers answers HIT or MISS — the exact two shapes, never a merged/composite fourth case, no merged/parts members', async () => {
    // Field 2.3 HIT arm: "answers from that node alone — no composition, no provenance list, no
    // second holder"; §2.5 item 4: "three cases and no fourth: HIT · QUALIFIED · MISS"; D-1/D-3:
    // the merged arm is WITHDRAWN and must not be reachable. RED today: the landed build's merged
    // arm is still live (D-1/E-3), so the answer reaches a composite fourth case.
    const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'x' }]) })
    store.commit('mem.x', 10) // (x, mem) pair minted
    store.commit('temp.x', 20) // (x, temp) pair minted — two tier holders of one logical path
    const ans = store.resolve('x') as unknown as Record<string, unknown> // tier-free resolve is LEGAL (§3.2 F-16/F-17)
    expect(ans).not.toHaveProperty('merged')
    expect(ans).not.toHaveProperty('parts')
    const keys = Object.keys(ans).sort()
    if (ans.found === true) {
      expect(keys).toEqual(HIT_KEYS)
    } else {
      expect(keys).toEqual(MISS_KEYS)
    }
  })

  it('M2 — a REFUSED write leaves the store DECLARATION-EXACT: a name a refused set() touched is still not a root, and resolve answers the \'undeclared-name\' refusal record at C-TOP — never a cold-name MISS (no second authority over roots)', async () => {
    // Field 5 token #1's read-side observable: a refusal record "reason:'undeclared-name',
    // step:'C-TOP', segment:'<the first segment>', owner:null" for a first segment with no
    // register row and that is not a cold root name; §2.4 item 8 / §2.2 P-7: the declaration
    // input is the ONLY authority over which names are roots; E-3(1) (CR-1): the landed build
    // writes a root declaration for any root name a write touches before refusals. RED today:
    // the build turns the later resolve into a cold-name MISS.
    const store = createGraphStore({ declarations: storeGraphReferences([]) })
    const refused = store.set('mem.n', 1) // set never mints — refused 'undeclared-name'
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('undeclared-name')
    const afters = store.resolve('mem.n') as unknown as { reason?: unknown; step?: unknown; segment?: unknown; owner?: unknown }
    expect(afters.reason).toBe('undeclared-name')
    expect(afters.step).toBe('C-TOP')
    expect(afters.segment).toBe('n')
    expect(afters.owner).toBeNull()
  })

  it('M3 — a chain DEEPER than 64 regenerates fully: the store owes NO depth bound (D-6), so a 66-segment chain committed at temp and regenerated at mem answers HIT at its deepest reference', async () => {
    // Field 2.3's name grammar: "zero or more non-empty segments" — no bound; D-6: "a red set may
    // drive a chain deeper than 64 and must not be written to depend on the bound's presence",
    // naming BOTH landed bound sites: the walk's climbToBound AND the regeneration's subtree-
    // climb. RED today: the regeneration's subtree-climb clamps the chain, so the deepest
    // reference of the regenerated subtree is not reachable and cannot answer HIT.
    const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'deep' }]) })
    const depth = 66
    const segments: string[] = []
    for (let i = 0; i < depth; i += 1) segments.push(`s${i}`)
    const deepAtTemp = `temp.deep.${segments.join('.')}`
    const deepAtMem = `mem.deep.${segments.join('.')}`
    expect(store.commit(deepAtTemp, 7).status).toBe('committed')
    const regenerated = store.commit(deepAtMem, 8) // regeneration transaction at mem over the whole deep subtree
    expect(regenerated.status).toBe('committed')
    const hit = store.resolve(deepAtMem) as GraphReadHit
    expect(hit.found).toBe(true)
    expect(hit.value).toBe(8)
  })

  it('M4 — THE GATE-4 REMAND (T6 HIGH): after a TIER-LOCAL clear of a written parent whose CHILD survives, the parent read answers the DECLARED MISS {found:false, value:undefined, tier:null, cache:null, name:<the caller\'s own spelling>} — never a HIT-with-undefined and never a refusal', async () => {
    // Field 2's `clear` row: "TIER-LOCAL, NON-RECURSIVE, and one event per cleared reference; a
    // tier-local clear of a parent leaves its descendants alone — which is what makes the M-5
    // miss-at-an-unwritten-parent state reachable" (§2.8 item 4; §3.1 M-5's re-derived form).
    // Field 2's MISS arm: "{found:false, value:undefined, tier:null, cache:null, name:<the
    // caller's own spelling>} — NEVER a composite and NEVER a refusal. Its subject is the
    // DECLARED-BUT-UNWRITTEN PARENT WITH A WRITTEN CHILD" (§2.5 item 4(iii); §2.4 item 4's
    // annotation). §3.1 M-5 RE-DERIVED — (iii) the read of the unwritten parent reference
    // answers the DECLARED MISS; (i) the surviving CHILD answers HIT with its OWN value and its
    // OWN flag. The tree-by-construction invariant (§2.3 item 2 / §2.2 P-3: a descendant is
    // reached THROUGH its parent's anchors) is what makes the parent GENUINELY
    // declared-but-unwritten-with-a-written-child — never a cold name, never a removed subtree.
    // THE DRIVE'S PRINTED TERMS: parent spelling 'mem.r4.par' · its own value 1 · child
    // spelling 'mem.r4.par.kid' · its own value 2 · tier 'mem' — the SAME tier for both (the
    // brief's "at the same tier (or lower)"; the artifact's clear row ties the state to a
    // tier-LOCAL clear, not to a particular token) · the tier-local clear 'mem.r4.par' →
    // receipt {status:'committed', cleared:['mem.r4.par'], events:1} (one event per cleared
    // reference) · post-state: the child SURVIVES, the parent holds NO value of its own.
    // NOTE ON THE EVENTS HALF: the clear row's "one event per cleared reference" is cited for
    // the DRIVE's shape; the receipt-visible observable of the one cleared reference is its
    // `cleared[]`, which this row asserts. A subscriber-LESS clear's `events` is a
    // delivery-dependent figure in the landed build (§2.10 item 5's emitted-vs-delivered
    // semantics are the seat's sweep's subject, not this remand's); this row does NOT pin it,
    // so the row's red point is exactly the finding — the parent read's wrong arm.
    // RED TODAY (the T6 finding, in the conformed walk's own words): the walk answers
    // {found:true, value:undefined, tier:'mem', …} at the parent path — a HIT with an undefined
    // value — because the clear leaves the node in place and the walk has NO value-presence
    // check, so the declared MISS arm is never reached.
    const store = await wiredStore()
    expect(store.commit('mem.r4.par', 1).status).toBe('committed') // (1) the parent minted WITH a value
    expect(store.commit('mem.r4.par.kid', 2).status).toBe('committed') // (2) the child at the SAME tier
    const receipt = store.clear('mem.r4.par') // (3) the TIER-LOCAL, NON-RECURSIVE clear of the parent
    expect(receipt.status).toBe('committed')
    expect(receipt.cleared).toEqual(['mem.r4.par']) // the one cleared reference
    const child = store.resolve('mem.r4.par.kid') as GraphReadHit // (4) M-5 RE-DERIVED (i)
    expect(child.found).toBe(true) // the child SURVIVES: the clear "leaves its descendants alone"
    expect(child.value).toBe(2) // the CHILD's own value
    expect(child.flag).toBe('mem') // the CHILD's OWN flag
    const miss = store.resolve('mem.r4.par') // (5) M-5 RE-DERIVED (iii) — the parent reference's read
    expect(miss.found).toBe(false) // ← RED today: the conformed walk answers found:true (HIT-with-undefined)
    expect(Object.keys(miss).sort()).toEqual(MISS_KEYS) // the declared MISS shape — never a refusal record
    expect((miss as GraphReadMiss).value).toBeUndefined()
    expect((miss as GraphReadMiss).tier).toBeNull()
    expect((miss as GraphReadMiss).cache).toBeNull()
    expect((miss as GraphReadMiss).name).toBe('mem.r4.par') // the caller's own spelling
  })

  it('M5 — THE DISCRIMINATION, IN ONE STORE: a WRITTEN leaf holding `undefined` as its VALUE answers the HIT arm (the value is opaque — any JS value including undefined is in-domain), while the cleared structural parent answers the MISS — two DIFFERENT observable states, never collapsed', async () => {
    // Field 2's `value` row: "any JavaScript value, including undefined … THE STORE NEVER
    // REFUSES A SIZE, A MAGNITUDE OR A SHAPE, and it never interprets the value" — a node that
    // GENUINELY HOLDS `undefined` as its own VALUE is a legal HIT, answered from that node
    // alone (field 2.3's HIT arm; §2.5 item 3 / M-3: `cache` IS `store.tiers[flag]` BY
    // IDENTITY). Field 2's MISS arm's subject is the DECLARED-BUT-UNWRITTEN parent — a node
    // with NO VALUE ENTRY of its own. The two states BOTH carry `value: undefined` (M4
    // printed the same) — so the discrimination the Implementer's fix must preserve is the
    // ENTRY-PRESENCE one, and this row makes it explicit: MISS = found:false · tier:null ·
    // cache:null · name = the caller's spelling; HIT = found:true · tier/flag = the node's own
    // · cache BY IDENTITY. A fix that collapses them — HIT-with-undefined at the cleared
    // parent (today's wrong arm) or MISS at the written leaf — FAILS this row.
    // THE DRIVE'S PRINTED TERMS: parent 'mem.r5.par' (value 1) · child 'mem.r5.par.kid'
    // (value 2) · tier 'mem' (the same tier, both) · tier-local clear 'mem.r5.par' · written
    // leaf 'mem.r5.udleaf' whose OWN VALUE is `undefined` — driven at the mem tier so no
    // file-tier serialization arm is involved (field 2's value row's one non-representability
    // rule is file-tier-only, §2.8 item 6(b)).
    const store = await wiredStore()
    store.commit('mem.r5.par', 1)
    store.commit('mem.r5.par.kid', 2)
    store.clear('mem.r5.par') // → the structural parent now holds NO value entry
    store.commit('mem.r5.udleaf', undefined) // → a WRITTEN leaf whose VALUE is undefined
    const parent = store.resolve('mem.r5.par')
    const leaf = store.resolve('mem.r5.udleaf') as GraphReadHit
    // THE MISS HALF — RED today: the conformed walk answers found:true at the cleared parent
    expect(parent.found).toBe(false) // ← the wrong arm today
    expect(Object.keys(parent).sort()).toEqual(MISS_KEYS)
    expect((parent as GraphReadMiss).value).toBeUndefined()
    expect((parent as GraphReadMiss).tier).toBeNull()
    expect((parent as GraphReadMiss).cache).toBeNull()
    expect((parent as GraphReadMiss).name).toBe('mem.r5.par')
    // THE HIT HALF — the written-undefined leaf answers the HIT arm outright (green today; the
    // value-presence fix must NOT turn it into a MISS — value is opaque, undefined is in-domain)
    expect(leaf.found).toBe(true)
    expect(Object.keys(leaf).sort()).toEqual(HIT_KEYS)
    expect(leaf.value).toBeUndefined() // value opaque — undefined is in-domain
    expect(leaf.tier).toBe('mem')
    expect(leaf.flag).toBe('mem')
    expect(leaf.cache).toBe(store.tiers[leaf.flag]) // BY IDENTITY (M-3) — a VIEW, never a copy
    expect(leaf.name).toBe('mem.r5.udleaf') // the caller's own spelling
    // THE DISCRIMINATION: same store, both states live, `value` undefined in BOTH — they
    // differ in found/tier/cache/name, i.e. the observable is an ENTRY-PRESENCE fact, never a
    // value-substance one.
  })

  /* ===========================================================================================
   * GROUP X — THE CROSSING SEAM (D-4): the `file`-tier write pushes a STABLE-JSON translation
   * through the declared seam — `crossings: 1` for the whole regenerated set, never a
   * synthesised integer. RED today: the seam is declared-but-never-called (D-4/CR-2).
   * =========================================================================================== */

  it('X1 — a file-tier REGENERATION drives the crossing seam EXACTLY ONCE with a STABLE-JSON translation string, and the receipt reads crossings: 1 — the whole set is ONE committed write', () => {
    // Field 2.5/§2.8 items 5(5)/7/8: the file-tier write "puts a STABLE-JSON TRANSLATION OF THE
    // GRAPH through the declared, stubbed crossing seam", "crossings: 1 for the whole regenerated
    // set", "a crossing that serializes one reference at a time is a FINDING"; D-4: the landed
    // build reads options.crossing and never calls crossing.put — `crossings` is a synthesised
    // integer. RED today: the recorder answers zero put-calls.
    const puts: { name: string; value: unknown }[] = []
    const crossing: GraphCrossing = {
      put(row: { readonly name: string; readonly value: unknown }) {
        puts.push(row)
        return { status: 'committed' }
      },
    }
    const store = createGraphStore({
      declarations: storeGraphReferences([{ name: 'xc' }]),
      crossing,
    })
    store.commit('temp.xc', 1)
    const receipt: GraphWriteReceipt = store.commit('file.xc', 2) // regeneration at the file tier
    expect(receipt.status).toBe('committed')
    expect(puts).toHaveLength(1) // exactly ONE committed write — a per-reference crossing is a FINDING
    expect(typeof puts[0].value).toBe('string') // a STABLE-JSON TRANSLATION, not a live object
    expect(receipt.crossings).toBe(1) // not a synthesised integer — the seam was actually driven
  })

  it('X2 — the seam cargo is STABLE-JSON: two file-tier regenerations of the SAME settled graph are BYTE-IDENTICAL, and the payload\'s object keys are emitted in SORTED order (field 2.5\'s stability rules (a) and (f))', () => {
    // Field 2.5 rule (a): "an object's own enumerable own keys are emitted in SORTED order";
    // rule (f): "two translations of the same graph whose nodes were created in a different order
    // are BYTE-IDENTICAL". RED today: the seam is never called, so neither put exists.
    const puts: string[] = []
    const crossing: GraphCrossing = {
      put(row: { readonly name: string; readonly value: unknown }) {
        puts.push(String(row.value))
        return { status: 'committed' }
      },
    }
    const store = createGraphStore({
      declarations: storeGraphReferences([{ name: 'z' }]),
      crossing,
    })
    store.commit('temp.z', 1)
    store.commit('file.z', 10) // regeneration #1 — settled graph { file.z: 10 }
    store.commit('temp.z', 1) // re-create the lower copy (nodes created in a different order)
    store.commit('file.z', 10) // regeneration #2 — settled graph { file.z: 10 } again
    expect(puts).toHaveLength(2)
    expect(puts[0]).toBe(puts[1]) // byte-identical translations of the same settled graph
    const parsed = JSON.parse(puts[0]) as Record<string, unknown>
    const keys = Object.keys(parsed)
    expect([...keys].sort()).toEqual(keys) // own enumerable keys emitted in SORTED order
  })

  /* ===========================================================================================
   * GROUP U — THE SIXTEEN-TOKEN REFUSAL UNION (field 5): a reason is a RETURNED RECORD member,
   * NEVER a throw. U0 = the by-name print above (REFUSAL_UNION_SIXTEEN); U1/U2 drive two of the
   * regeneration transaction's returned-record arms to their declared exact observables.
   * =========================================================================================== */

  it('U1 — A2\'s durability-inversion arm (token #16) answers a RETURNED RECORD {status:\'refused\', reason:\'durability-inversion\', cleared:[], repaired:[], rows:[], crossings:0, events:0} with the store LEFT COMPLETELY UNCHANGED — never a throw, never a silent re-tier', () => {
    // Field 5 token #16: "a MINT … whose requested tier is MORE DURABLE than the node's own
    // PARENT NODE's flag … a RETURNED RECORD {status:'refused', reason:'durability-inversion',
    // cleared: [], repaired: [], rows: [], crossings: 0, events: 0} with the store LEFT
    // COMPLETELY UNCHANGED"; "It is a DECLARED REFUSAL, NOT A REPAIR". The subject is the parent
    // node's flag read from the node's parentLink (a mem-flags node is the child's parent here).
    const store = createGraphStore({ declarations: storeGraphReferences([]) })
    store.commit('mem.du', 1) // root at mem — the future child's parent node
    const receipt: GraphWriteReceipt = store.commit('file.du.child', 2) // mint requested at file — MORE durable than the mem parent
    expect(receipt).toMatchObject({
      status: 'refused',
      reason: 'durability-inversion',
      cleared: [],
      repaired: [],
      rows: [],
      crossings: 0,
      events: 0,
    })
    const hit = store.resolve('mem.du') as GraphReadHit // the store is UNCHANGED
    expect(hit.found).toBe(true)
    expect(hit.value).toBe(1)
  })

  it('U2 — the WIRED store answers A1\'s serialization arm (token #14) as a RETURNED RECORD for a file-tier value that cannot be represented as saveable JSON — original alive, nothing deleted, crossings: 0, events: 0 (never a throw)', async () => {
    // Field 5 token #14: "a value of the built set cannot be represented as saveable JSON, at
    // step (3) of the transaction's five … a RETURNED RECORD … the original alive · nothing
    // deleted · cleared: [] · repaired: [] · rows: [] · crossings: 0 · events: 0". Driven through
    // the WIRED surface (the END point's settled end states) — a direct module drive of the same
    // assertion runs GREEN today (the landed build already carries this arm), and a row that
    // passes today is a finding; through the wiring seam it is red today and green only once the
    // wiring lands with the conformed modules.
    const store = await wiredStore()
    const cyclic: { x: number; self?: unknown } = { x: 1 }
    cyclic.self = cyclic // not representable as saveable JSON
    const receipt: GraphWriteReceipt = store.commit('file.cyc', cyclic)
    expect(receipt).toMatchObject({
      status: 'refused',
      reason: 'serialize-failed',
      cleared: [],
      repaired: [],
      rows: [],
      crossings: 0,
      events: 0,
    })
  })
})

/* =============================================================================================
 * TYPE-LEVEL INSTRUMENTS (rows C2/C3) — compiled by tsc under tsconfig.tests.json strictness
 * ============================================================================================= */
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Expect<T extends true> = T

/** Static export-census scan — measures the module's export declarations BY NAME (the same
 *  byte-measure the review §2 row 6 used for D-1). */
function exportedNamesOf(source: string): readonly string[] {
  const names: string[] = []
  const declRe = /\bexport\s+(?:default\s+)?(?:async\s+)?(?:function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g
  const listRe = /\bexport\s*\{([^}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = declRe.exec(source)) !== null) names.push(m[1])
  while ((m = listRe.exec(source)) !== null) {
    for (const item of m[1].split(',')) {
      const trimmed = item.trim()
      if (trimmed === '') continue
      const withoutTypeKeyword = trimmed.replace(/^(?:type\s+)/, '').split(/\s+as\s+/)[0]
      if (/^[A-Za-z_$][\w$]*$/.test(withoutTypeKeyword)) names.push(withoutTypeKeyword)
    }
  }
  return names
}

// Keep the type-import census visible to tsc (the positive half of the BY-NAME census):
void (0 as unknown as {
  GraphStore: GraphStore
  GraphTierToken: GraphTierToken
  GraphNodeFlag: GraphNodeFlag
  GraphRefusalReason: GraphRefusalReason
  GraphNodeRef: GraphNodeRef
  GraphNode: GraphNode
  GraphAnchor: GraphAnchor
  GraphLink: GraphLink
  GraphTierHandle: GraphTierHandle
  GraphCrossing: GraphCrossing
  GraphRegisterRow: GraphRegisterRow
  GraphRegister: GraphRegister
  GraphRegisterCacheEntry: GraphRegisterCacheEntry
  GraphLinkCacheEntry: GraphLinkCacheEntry
  GraphConstraint: GraphConstraint
  GraphReadHit: GraphReadHit
  GraphReadMiss: GraphReadMiss
  GraphResolveResult: GraphResolveResult
  GraphTierGetResult: GraphTierGetResult
  GraphResolveStep: GraphResolveStep
  GraphResolveDiagnostic: GraphResolveDiagnostic
  GraphEvent: GraphEvent
  GraphSubscription: GraphSubscription
  GraphWriteReceipt: GraphWriteReceipt
  GraphAffectedRow: GraphAffectedRow
  GraphWriteOptions: GraphWriteOptions
  GraphLoadError: GraphLoadError
  StoreGraphDeclarationRow: StoreGraphDeclarationRow
  StoreGraphDeclarationInput: StoreGraphDeclarationInput
  StoreGraphReferenceFixture: StoreGraphReferenceFixture
})