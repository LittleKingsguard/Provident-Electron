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
 *   P1–P7  the seven UNIT-ADV-1 PIN DRIVES (AMENDMENT UNIT-ADV-1, 2026-10-03 — added by the
 *          G1 integration wave under field 7 member 4's licence, the seat's R185–R191
 *          siblings; each row drives one pin's WHAT-TO-DRIVE clause): P1 = G4-F1 (the
 *          write-side C-TOP gate), P2 = G4-F2 (the read-side top is the segment at index 1,
 *          by position; the silent re-spell is FORBIDDEN), P3 = G4-F3 (the receipt's
 *          `events` counts the EMITTED events, never the deliveries), P4 = G4-F4 (the
 *          sweep's cleared[]/event set matches its post-state), P5 = G4-F5 (the export is a
 *          FRESH deep copy at every depth — no aliasing, no depth bound), P6 = G4-F6 (the
 *          constraint evaluation's data record is PROTOTYPE-SAFE), P7 = G4-F7 ("equal value"
 *          is the pinned `===`, not `Object.is`)
 *   H1–H8  the HYDRATE-1 SEAM DRIVES (AMENDMENT HYDRATE-1, 2026-10-03 — added by the G2
 *          HYDRATE-1 re-cycle under field 7 member 4's licence, the seat's R192–R199
 *          siblings): H1 = the seam-census boundary (hydrate is PRODUCTION-PRESENT, never a
 *          test-seam key), H2 = the mint + the fired event surface (one event per minted
 *          reference, the existing envelope, void return), H3 = NEVER CROSSES (zero
 *          GraphCrossing.put calls on a recording double; the control commit crosses once),
 *          H4 = NEVER EVALUATES THE CONSTRAINT TABLE (call-count 0 on a hydrate; the control
 *          commit under the hydrated top evaluates), H5 = NOT set/commit/remove + the
 *          register's top-level projection (only the minted tops enter), H6 = the SKIP
 *          posture (7 enumerated malformed terms), H7 = totality on a non-array + the cold
 *          boot's `[]`, H8 = the read-back (ALL N entries resolve at tier-1 — the G2 spec's
 *          M-7 satisfiable)
 *
 * DETERMINISM AND SCOPE: no `Math.random`, no clock, no ambient read; enumeration rows print
 * their terms (C1a's 29 names, E2's malformed-row terms, S9's eight seam keys, the eight `cause`
 * arms as data, U0's sixteen tokens); totals are modest — 48 runtime rows + 1 type-level row
 * (33 as filed + the seven P1–P7 pin drives added by the G1 pass + the eight H1–H8 hydrate
 * drives added by the G2 HYDRATE-1 re-cycle), and RCAP-1's 1024-enumeration
 * is NOT re-driven here (the seat owns the exhaustive sweep).
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
    // ⟶ RE-GRAINED 2026-10-05 (U-STORE-CORE G1, the POST-UNIT-ADV-1 re-grain family): the
    // as-filed drive wrote `'mem.r4.par'` FIRST — a CHAIN write under a top the wired boot's
    // EMPTY declarations (`storeGraphReferences([])`) never declares. G4-F1 (the F1 pin, the
    // write-side C-TOP gate) REFUSES that mint (`'undeclared-name'` at C-TOP, segment `r4` —
    // "the write-side mint NEVER mints an undeclared or dotted root"), so the as-filed drive
    // could not reach the record. The re-grain keeps the row's INTENT (the record write/readback
    // works through the store; the tier-local clear leaves the child alone and the parent reads
    // the DECLARED MISS) and RE-ROUTES the drive through the declared top: (1) the F1 REFUSAL
    // arm for the undeclared case is asserted first (the refusal receipt's shape + the store
    // unchanged — no `r4` row, no node), then (2) the ROOT-LEVEL mint `commit('mem.r4', 1)` lifts
    // the top into the registered state (the F1 positive control — the F-2 state (ii) cold-root
    // mint), and the `r4.par` / `r4.par.kid` writes ride the now-registered-declared path.
    const store = await wiredStore()
    // (1) THE F1 REFUSAL ARM — the undeclared top is refused with the exact receipt shape and
    // the store is left UNCHANGED (nothing minted, nothing registered, no node).
    const beforeRows = store.register.rows.map((r) => r.name).sort()
    const refused = store.commit('mem.r4.par', 1)
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('undeclared-name')
    expect(refused.name).toBe('mem.r4.par') // the receipt's name is the caller's own spelling
    expect(refused.cleared).toEqual([])
    expect(refused.repaired).toEqual([])
    expect(refused.rows).toEqual([])
    expect(refused.crossings).toBe(0)
    expect(refused.events).toBe(0)
    expect(store.register.rows.map((r) => r.name).sort()).toEqual(beforeRows) // unchanged
    expect(store.tiers.mem.get('mem.r4.par').found).toBe(false) // no node exists at the refused path
    // (2) THE DECLARED-TOP ROUTE: the root-level mint MINT-DECLARES `r4` (F-2 state (ii) — the
    // ONE legal cold-root mint), then the parent/child writes are the registered-declared path.
    expect(store.commit('mem.r4', 1).status).toBe('committed') // (1) the ROOT minted — the declared top
    expect(store.commit('mem.r4.par', 1).status).toBe('committed') // (2) the parent minted WITH a value
    expect(store.commit('mem.r4.par.kid', 2).status).toBe('committed') // (3) the child at the SAME tier
    const receipt = store.clear('mem.r4.par') // (4) the TIER-LOCAL, NON-RECURSIVE clear of the parent
    expect(receipt.status).toBe('committed')
    expect(receipt.cleared).toEqual(['mem.r4.par']) // the one cleared reference
    const child = store.resolve('mem.r4.par.kid') as GraphReadHit // (5) M-5 RE-DERIVED (i)
    expect(child.found).toBe(true) // the child SURVIVES: the clear "leaves its descendants alone"
    expect(child.value).toBe(2) // the CHILD's own value
    expect(child.flag).toBe('mem') // the CHILD's OWN flag
    const miss = store.resolve('mem.r4.par') // (6) M-5 RE-DERIVED (iii) — the parent reference's read
    expect(miss.found).toBe(false) // the DECLARED MISS — never a HIT-with-undefined
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
    // parent (the pre-re-freeze wrong arm) or MISS at the written leaf — FAILS this row.
    // ⟶ RE-GRAINED 2026-10-05 (U-STORE-CORE G1, the POST-UNIT-ADV-1 re-grain family): the
    // as-filed drive wrote `'mem.r5.par'` FIRST under the wired boot's EMPTY declarations —
    // G4-F1 (the F1 pin) REFUSES that chain mint (`'undeclared-name'` at C-TOP, segment `r5`).
    // The re-grain keeps the row's INTENT (the record write/readback works through the store;
    // the two `value: undefined` states are discriminated by ENTRY-PRESENCE) and RE-ROUTES
    // through the declared top exactly as M4 does: (1) the F1 refusal arm for the undeclared
    // case first, then (2) the root-level cold mint `commit('mem.r5', …)` and the
    // registered-declared parent/child/leaf writes.
    // THE DRIVE'S PRINTED TERMS: parent 'mem.r5.par' (value 1) · child 'mem.r5.par.kid'
    // (value 2) · tier 'mem' (the same tier, both) · tier-local clear 'mem.r5.par' · written
    // leaf 'mem.r5.udleaf' whose OWN VALUE is `undefined` — driven at the mem tier so no
    // file-tier serialization arm is involved (field 2's value row's one non-representability
    // rule is file-tier-only, §2.8 item 6(b)).
    const store = await wiredStore()
    // (1) THE F1 REFUSAL ARM — the undeclared top 'r5' is refused; nothing minted.
    const beforeRows = store.register.rows.map((r) => r.name).sort()
    const refused = store.commit('mem.r5.par', 1)
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('undeclared-name')
    expect(refused.cleared).toEqual([])
    expect(refused.repaired).toEqual([])
    expect(refused.rows).toEqual([])
    expect(refused.crossings).toBe(0)
    expect(refused.events).toBe(0)
    expect(store.register.rows.map((r) => r.name).sort()).toEqual(beforeRows) // unchanged
    expect(store.tiers.mem.get('mem.r5.par').found).toBe(false)
    // (2) THE DECLARED-TOP ROUTE — the root-level mint declares `r5`, then the mirror writes.
    expect(store.commit('mem.r5', 1).status).toBe('committed') // the declared top minted
    store.commit('mem.r5.par', 1)
    store.commit('mem.r5.par.kid', 2)
    store.clear('mem.r5.par') // → the structural parent now holds NO value entry
    store.commit('mem.r5.udleaf', undefined) // → a WRITTEN leaf whose VALUE is undefined
    const parent = store.resolve('mem.r5.par')
    const leaf = store.resolve('mem.r5.udleaf') as GraphReadHit
    // THE MISS HALF — the cleared parent answers the DECLARED MISS (the entry-presence fact)
    expect(parent.found).toBe(false)
    expect(Object.keys(parent).sort()).toEqual(MISS_KEYS)
    expect((parent as GraphReadMiss).value).toBeUndefined()
    expect((parent as GraphReadMiss).tier).toBeNull()
    expect((parent as GraphReadMiss).cache).toBeNull()
    expect((parent as GraphReadMiss).name).toBe('mem.r5.par')
    // THE HIT HALF — the written-undefined leaf answers the HIT arm outright (the
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

  /* ===========================================================================================
   * GROUP P — THE SEVEN UNIT-ADV-1 PIN DRIVES (AMENDMENT UNIT-ADV-1, 2026-10-03 — added by
   * the G1 integration wave; the seat's R185–R191 sibling drives). Each row drives one pin's
   * WHAT-TO-DRIVE clause from the re-frozen artifact (field 2 / 2.6 / 4.3, the ¬AMENDED
   * ¶UNIT-ADV-1¬ clauses): P1 = G4-F1 (write-side C-TOP) · P2 = G4-F2 (read-side top by
   * position) · P3 = G4-F3 (emitter-counted events) · P4 = G4-F4 (sweep truthfulness) ·
   * P5 = G4-F5 (export deep copy at every depth) · P6 = G4-F6 (prototype-safe records) ·
   * P7 = G4-F7 (the pinned `===`).
   * =========================================================================================== */

  it('P1 (G4-F1) — the write-side C-TOP gate: a commit/set/seed whose TOP name is NOT DECLARED (F-2 state (iii)) is refused \'undeclared-name\' and the write-side mint NEVER mints an undeclared or dotted root — every refusal leaves the store UNCHANGED; a commit on a DECLARED-but-cold root name MINTS (the named positive control)', () => {
    // Field 2's F1 clause: "'a commit/set/seed whose TOP name … is NOT DECLARED is REFUSED
    // \"undeclared-name\"'", "the write-side mint NEVER mints an undeclared or dotted root",
    // "Every refusal leaves the store UNCHANGED", "a commit on a DECLARED-but-cold root name
    // MINTS — the named positive control". The seed arm drives through the ORDINARY write
    // path (the seam member's own row: seed's pinned refusal sentence IS the write-side gate).
    const store = createGraphStore()
    const r1: GraphWriteReceipt = store.commit('mem.undeclared.x', 'v')
    expect(r1.status).toBe('refused')
    expect(r1.reason).toBe('undeclared-name')
    expect(r1.name).toBe('mem.undeclared.x') // the receipt's name is the caller's own spelling
    expect(r1.cleared).toEqual([])
    expect(r1.repaired).toEqual([])
    expect(r1.rows).toEqual([])
    expect(r1.crossings).toBe(0)
    expect(r1.events).toBe(0)
    expect(store.register.rows).toHaveLength(0) // nothing minted, nothing registered — store UNCHANGED
    expect((store.tiers.mem.get('mem.undeclared.x') as GraphTierGetResult).found).toBe(false)
    expect((store.resolve('mem.undeclared.x') as { reason?: unknown }).reason).toBe('undeclared-name')

    const r2: GraphWriteReceipt = store.commit('file.undeclaredTop.x', 'v') // the file-tier spelling — the gate precedes the crossing transaction
    expect(r2.status).toBe('refused')
    expect(r2.reason).toBe('undeclared-name')
    expect(r2.crossings).toBe(0) // the refused write never reaches the crossing
    expect(store.register.rows).toHaveLength(0)

    const r3: GraphWriteReceipt = store.commit('mem.a.b.c', 'v') // a deep-dotted write with nothing declared — top 'a' is state (iii)
    expect(r3.status).toBe('refused')
    expect(r3.reason).toBe('undeclared-name')
    expect(store.register.rows).toHaveLength(0) // the mint NEVER mints a dotted root

    const r4: GraphWriteReceipt = store.set('mem.undeclared.x', 'v')
    expect(r4.status).toBe('refused')
    expect(r4.reason).toBe('undeclared-name')

    const seam = createGraphStore({ enableTestSeam: true })
    seam.seed?.([{ name: 'temp.undeclared.y', value: 'v' }]) // a refused seed row leaves the store UNCHANGED
    expect(seam.register.rows).toHaveLength(0)
    expect((seam.resolve('temp.undeclared.y') as { reason?: unknown }).reason).toBe('undeclared-name')

    // The positive controls (F-18's one-control-per-arm): a commit on a DECLARED-but-cold
    // root name MINTS (F-2 state (ii)); the dotted shape WITH its top declared is the
    // F1-GREEN arm — the top IS declared, so the gate passes and the mint creates the legal
    // root, never a dotted one (exactly ONE register row).
    const s3 = createGraphStore({ declarations: storeGraphReferences([{ name: 'mint' }]) })
    expect(s3.commit('mem.mint', 'm').status).toBe('committed')
    expect(s3.register.rows).toHaveLength(1)
    expect((s3.resolve('mem.mint') as GraphReadHit).value).toBe('m')

    const s4 = createGraphStore({ declarations: storeGraphReferences([{ name: 'a' }]) })
    expect(s4.commit('mem.a.b.c', 'ab').status).toBe('committed')
    expect(s4.register.rows.map((row) => row.name)).toEqual(['a']) // ONE root row — never a dotted root
  })

  it('P2 (G4-F2) — the read-side top is the segment at index 1 BY POSITION: a name whose index-1 segment is undeclared (and unregistered) answers the DECLARED \'undeclared-name\' refusal at C-TOP BEFORE any traversal — no anchor/link/cache/leaf walk, no silent re-spell; a DECLARED index-1 segment walks by the ordinary rules', () => {
    // Field 2's F2 clause: "the parse reads rootParts[1] BY POSITION, never 'the first
    // declared segment anywhere in the tail'", "refused at C-TOP on its index-1 segment and
    // NEVER resolves against the declared leaf", "the same spelling with a DECLARED index-1
    // segment walks by the ordinary rules".
    const s = createGraphStore({ declarations: storeGraphReferences([{ name: 'window' }]) })
    s.commit('mem.window.tabs', { active: true })
    const r = s.resolve('file.x.window.tabs.landingPage') as unknown as Record<string, unknown>
    expect(r.reason).toBe('undeclared-name') // the index-1-segment-undeclared spelling answers the declared refusal
    expect(r.step).toBe('C-TOP') // BEFORE any traversal
    expect(r.segment).toBe('x') // the caller's OWN index-1 segment (the F-1 shape)
    expect(r.owner).toBeNull()
    expect((r as unknown as GraphReadHit).found).not.toBe(true) // never a MISS and never the window data
    const hit = s.resolve('mem.window.tabs') as GraphReadHit
    expect(hit.found).toBe(true) // the DECLARED index-1 segment walks by the ordinary rules
    expect(hit.value).toEqual({ active: true })
    expect(hit.flag).toBe('mem')

    const s2 = createGraphStore({ declarations: storeGraphReferences([{ name: 'declaredLeaf' }]) })
    s2.commit('mem.declaredLeaf', 'leaf-data')
    const r2 = s2.resolve('file.undeclaredTop.declaredLeaf') as unknown as Record<string, unknown>
    expect(r2.reason).toBe('undeclared-name') // 'file.undeclaredTop.declaredLeaf' is refused on its index-1 segment
    expect(r2.step).toBe('C-TOP')
    expect(r2.segment).toBe('undeclaredTop')
    expect((r2 as unknown as GraphReadHit).found).not.toBe(true) // NEVER the declared leaf's value — the deeper declared segment never re-points the read

    // The refusal-before-traversal corner: committed data under an undeclared index-1 top
    // (F1's subject — its setup commit is refused in the fixed world; the read's answer is
    // F2's and may never be a traversal).
    const s3 = createGraphStore({ declarations: storeGraphReferences([{ name: 'window' }]) })
    s3.commit('mem.x.window.tabs.landingPage', { active: true }) // setup — F1 refuses this; unasserted here
    const r3 = s3.resolve('file.x.window.tabs.landingPage') as unknown as Record<string, unknown>
    expect(r3.reason).toBe('undeclared-name') // refusal BEFORE any traversal — never an answer from the tail
    expect(r3.step).toBe('C-TOP')
    expect(r3.segment).toBe('x')
  })

  it('P3 (G4-F3) — the receipt\'s `events` is a function of the AFFECTED REFERENCES, not of the listeners: one affected reference answers events:1 whether or not ANY subscriber exists, and a second subscriber changes the DELIVERIES to two while the receipt\'s events stays 1', () => {
    // Field 2.6's F3 clause: "One affected reference answers events: 1 whether or not ANY
    // subscriber exists", "a receipt's events NEVER reads 0 for a write that affected one
    // reference SOLELY BECAUSE no listener matched", "a second subscriber on the same
    // reference changes the DELIVERIES to two while the receipt's events stays 1".
    const s = createGraphStore({ declarations: storeGraphReferences([{ name: 'p' }]) })
    // ZERO subscribers registered: the write that affects ONE reference still answers
    // events: 1 — the emission exists on the surface and is counted by the receipt.
    expect(s.commit('mem.p', 'x').events).toBe(1)
    expect(s.set('mem.p', 'y').events).toBe(1)
    expect(s.remove('mem.p').events).toBe(1)
    // The two-subscriber arm: the second subscriber changes the deliveries, never the count —
    // one event, two deliveries.
    s.commit('mem.p', 0)
    let deliveries = 0
    s.subscribe('mem.p', () => { deliveries += 1 })
    s.subscribe('mem.p', () => { deliveries += 1 })
    expect(s.commit('mem.p', 7).events).toBe(1) // the receipt's events stays 1
    expect(deliveries).toBe(2) // the second subscriber changed the DELIVERIES, never the count
  })

  it('P4 (G4-F4) — the sweep\'s cleared[]/cause:\'sweep\' set matches its POST-STATE: cleared[] lists AND fires cause:\'sweep\' for EXACTLY the references the sweep actually clears — a descendant that remains readable after the sweep is neither named nor fired, and events equals that count', () => {
    // Field 2.3's F4 clause: "lists in cleared[] AND emits cause:\"sweep\" for EXACTLY the
    // references it actually clears", "a reference that still answers a value after the sweep
    // was never swept, so it is neither named nor counted", "never a still-readable descendant
    // in cleared[], never a still-readable descendant's event, and never one list-carrying
    // event".
    const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'hub' }]) })
    store.commit('file.hub', 'h')
    store.commit('mem.hub.chan.a', 'x')
    const ev: GraphEvent[] = []
    store.subscribe('mem.hub.chan.a', (e) => ev.push(e)) // exact — captures the descendant's own sweep event
    const rec: GraphWriteReceipt = store.sweep('file.hub')
    expect(rec.status).toBe('committed')
    const descStillAnswers = (store.tiers.mem.get('mem.hub.chan.a') as GraphTierGetResult).found
    if (descStillAnswers) {
      // the pin's drive: the sweep's post-state leaves the descendant readable ⇒ it was never
      // swept ⇒ neither named in cleared[] nor fired.
      expect(rec.cleared).not.toContain('mem.hub.chan.a')
      expect(ev.some((e) => e.name === 'mem.hub.chan.a')).toBe(false)
    }
    // Either way, the receipt's set matches its own post-state truth: one event per cleared
    // reference, every cleared/event-named reference answering false on its own tier, never
    // one list-carrying event.
    expect(rec.events).toBe(rec.cleared.length)
    for (const name of rec.cleared) {
      const t = name.split('.')[0] as GraphNodeFlag
      expect((store.tiers[t].get(name) as GraphTierGetResult).found).toBe(false)
    }
    for (const e of ev) {
      expect(e.cause).toBe('sweep')
      const t = e.name.split('.')[0] as GraphNodeFlag
      expect((store.tiers[t].get(e.name) as GraphTierGetResult).found).toBe(false)
    }
    expect(new Set(ev.map((e) => e.name)).size).toBe(ev.length)
  })

  it('P5 (G4-F5) — the export NEVER aliases a live stored object: a FRESH deep copy at EVERY depth (no depth bound), cyclic or deeply nested; two exports of one state are different objects; mutating the export at ANY depth changes nothing the store holds', () => {
    // Field 2.3's F5 clause: "'a FRESH deep copy at EVERY depth: there is NO depth bound above
    // which the live object is returned — a cyclic or deeply-nested stored value NEVER aliases
    // into the export, and mutating the export NEVER mutates the store'", "two exports of one
    // state are different objects (M-15's freshness/identity drive)".
    const cyc: { name: string; deep: { level: number }; self: unknown } = { name: 'cyc', deep: { level: 1 }, self: null }
    cyc.self = cyc // cyclic at depth 1, nested at depth 2
    const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'cyc' }]) })
    expect(store.commit('mem.cyc', cyc).status).toBe('committed') // the mem tier never refuses a shape (field 2's value row: the file tier only declares non-representability)
    const stored = (store.tiers.mem.get('mem.cyc') as GraphTierGetResult).value
    const e1 = store.export('mem.cyc') as GraphReadHit
    const e2 = store.export('mem.cyc') as GraphReadHit
    expect(e1).not.toBe(e2) // a FRESH object per call (M-15)
    expect(e1.found).toBe(true)
    expect(e1.value).not.toBe(stored) // depth 1: the export's value is NOT the stored object
    expect(e1.value).not.toBe(e2.value) // two exports of one state are different objects at depth 1
    expect((e1.value as { deep: unknown }).deep).not.toBe((cyc as { deep: unknown }).deep) // depth 2: a fresh copy
    expect((e1.value as { deep: unknown }).deep).not.toBe((stored as { deep: unknown }).deep)
    expect((e1.value as { self: unknown }).self).not.toBe(cyc) // the cyclic reference is a fresh copy
    // mutating the export at ANY depth changes nothing the store holds.
    ;(e1.value as { self: unknown }).self = 'HACKED'
    ;(e1.value as { deep: { level: number } }).deep.level = 99
    const after = store.resolve('mem.cyc') as GraphReadHit
    expect((after.value as { self: unknown }).self).toBe(cyc) // the store's cyclic self-reference is the ORIGINAL object
    expect((after.value as { deep: { level: number } }).deep.level).toBe(1) // the store's deep member is the ORIGINAL value
  })

  it('P6 (G4-F6) — the constraint evaluation\'s DATA record is PROTOTYPE-SAFE: a caller-owned key named \'__proto__\' is carried as DATA — never OMITTED (the entry exists and is readable) and never POISONING (the caller\'s data never becomes the record\'s prototype)', () => {
    // Field 2.6's F6 clause: "the changed/current/next records the passed constraint function
    // receives … is built PROTOTYPE-SAFE (Object.create(null) or a Map, never a plain object
    // whose key set inherits Object.prototype)", "it never POISONS … and never OMITS (the entry
    // still exists and is readable)".
    const tabValue = { active: true, lastActive: 1 }
    const seen: unknown[] = []
    const member: GraphConstraint = {
      id: 'c',
      matchedSet: 'tabs',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: (changed, current, next) => {
        seen.push(next)
        return true
      },
    }
    const store = createGraphStore({ constraints: [member], declarations: storeGraphReferences([{ name: 'tabs' }]) })
    const rec: GraphWriteReceipt = store.commit('mem.tabs.__proto__', tabValue)
    expect(rec.status).toBe('committed') // the constraint/feedback answers as declared — true ⇒ the write commits
    expect(seen).toHaveLength(1) // the evaluation happened — the record was built and handed to the passed function
    const record = seen[0] as Record<string, unknown>
    expect(Object.hasOwn(record, '__proto__')).toBe(true) // the '__proto__' entry EXISTS as an own key — never omitted
    expect(Object.keys(record)).toContain('__proto__') // the record's own key set carries the hostile name as DATA
    expect((record['__proto__'] as { active: boolean }).active).toBe(true) // keyed read returns the tab's own data
    expect(Object.getPrototypeOf(record)).not.toBe(tabValue) // no prototype POLLUTION — the caller's data never becomes the record's prototype
  })

  it('P7 (G4-F7) — \'equal value\' is the pinned `===`, NOT `Object.is`: NaN === NaN is false, so a SECOND NaN write FIRES (events:1, the delivery lands); -0 === 0 is true, so a 0 write after -0 is equal-value and fires NOTHING; the ===-equal primitive control fires nothing', () => {
    // Field 4.3's F7 clause: "the fire/no-fire decision is ===-based on the stored value, and
    // the subscribers' delivery record observes the same decision", "set(\"mem.p\", NaN) twice —
    // the second answers events: 1 and the subscriber's record gains the delivery",
    // "set(\"mem.p\", -0) then set(\"mem.p\", 0) — the second fires NOTHING (equal under ===)".
    const s = createGraphStore({ declarations: storeGraphReferences([{ name: 'p' }, { name: 'q' }, { name: 'r' }]) })
    s.commit('mem.p', 0)
    const ev: GraphEvent[] = []
    s.subscribe('mem.p', (e) => ev.push(e))
    s.set('mem.p', NaN) // the first NaN write — not equal to 0 — fires
    const second: GraphWriteReceipt = s.set('mem.p', NaN)
    expect(second.status).toBe('committed')
    expect(second.events).toBe(1) // the second NaN write FIRES — NaN === NaN is false
    expect(ev).toHaveLength(2) // the subscriber's delivery record gains the second delivery
    expect(ev[1]?.cause).toBe('set')
    expect(Number.isNaN(ev[1]?.value)).toBe(true)
    const s2 = createGraphStore({ declarations: storeGraphReferences([{ name: 'q' }]) })
    s2.commit('mem.q', 123) // the landmark — the seeding write is subscribed AFTER
    const ev2: GraphEvent[] = []
    s2.subscribe('mem.q', (e) => ev2.push(e))
    expect(s2.set('mem.q', -0).events).toBe(1) // -0 is not equal to the landmark 123 — it fires
    expect(s2.set('mem.q', 0).events).toBe(0) // 0 after -0 is EQUAL under the pinned === — it fires NOTHING
    expect(ev2).toHaveLength(1) // the delivery record observes the same decision
    const s3 = createGraphStore({ declarations: storeGraphReferences([{ name: 'r' }]) })
    s3.commit('mem.r', 'same')
    const ev3: GraphEvent[] = []
    s3.subscribe('mem.r', (e) => ev3.push(e))
    expect(s3.set('mem.r', 'same').events).toBe(0) // the ===-equal primitive control fires NOTHING
    expect(ev3).toHaveLength(0)
  })

  /* =============================================================================================
   * GROUP H — THE HYDRATE-1 SEAM DRIVES (G2 HYDRATE-1 re-cycle, 2026-10-03).
   * Derived from the frozen-surface artifact's HYDRATE-1 amendment (field 2, the boot-hydration
   * seam), `docs/decisions.md`'s ACTIVE row 'THE BOOT HYDRATION MINT'S EVENTS ARE INTENTIONAL'
   * (by row name), and `docs/specs/store-persist.md` §2.3 item 3's re-read / §2.9 / M-7's
   * annotation: `store.hydrate(rows)` MINTS the file-tier nodes for the Y-1 hand-off's record,
   * FIRES the store's event surface BY DESIGN (the boot-load events ARE the consumer-
   * notification channel — readiness is DELIVERED by the event surface, never a return value),
   * NEVER CROSSES (no GraphCrossing.put — the record came FROM main; a boot write-back is a
   * redundant round-trip), NEVER EVALUATES THE CONSTRAINT TABLE (the first evaluation stays
   * U-STORE-FOCUS's boot step), is NOT set/commit/remove (the register/ref-count change ONLY by
   * the file-tier nodes the record's names mint), SKIPS malformed rows (never a throw — the 16-
   * member union and the three throw classes are UNCHANGED), and returns void.
   * =========================================================================================== */

  it('H1 (HYDRATE-1, clause (5) — the seam-census boundary) — hydrate is a PRODUCTION-PRESENT declared member: present on the WIRED boot store and on a construction WITHOUT { enableTestSeam: true }; the flag neither gates nor removes it; hydrate is NOT one of the eight test-seam keys (a row asserting it behaves like a test-seam key — ABSENT without the flag, or throwing without it — FAILS)', async () => {
    // Field 2's clause (5): "hydrate is a PRODUCTION-PRESENT declared member — the boot wiring
    // calls it after the Y-1 hand-off"; "a row asserting that hydrate behaves like a test-seam
    // key (ABSENT without {enableTestSeam:true}, or throwing without the flag) FAILS"; "the
    // census above — 4 as-filed + 4 appended = 8 ✓ — is UNCHANGED and those keys stay absent
    // from production constructions".
    const wired = await wiredStore()
    expect(typeof wired.hydrate).toBe('function') // present on the realm's boot store
    const prod = createGraphStore({ declarations: storeGraphReferences([{ name: 'w' }]) })
    expect(typeof prod.hydrate).toBe('function') // present WITHOUT the test seam
    const seam = createGraphStore({ enableTestSeam: true })
    expect(typeof seam.hydrate).toBe('function') // the flag neither gates nor removes it
    expect(TEST_SEAM_KEYS_EIGHT).toHaveLength(8)
    expect(TEST_SEAM_KEYS_EIGHT.includes('hydrate')).toBe(false) // never one of the census keys
  })

  it('H2 (HYDRATE-1, clauses (1)/(7)/(8) — the mint + the fired event surface) — hydrate a `file.settings.theme.token` row into a FRESH store: the file-tier node is MINTED, resolve answers the hydrated value, and the subscriber on the minted reference gains the DELIVERY — ONE event per minted reference, the existing envelope (name = the reference\'s spelling, flag = file, value present as a key, cleared[] present); the return is VOID; the seam registers/releases no subscription', () => {
    // Field 2's clauses (1)/(7)/(8): "mints the FILE-TIER nodes for a handed-off record",
    // "FIRES the store's EVENT SURFACE: the boot-load events ARE the consumer-notification
    // channel", "a subscriber on a minted reference gains the delivery, one event per minted
    // reference (§3.3 I-16's one-event-per-affected-reference rule read over the minted
    // nodes; §2.10 item 5's delivery record)", "The return: void — readiness is DELIVERED by
    // the event surface, never by a return value". RED today: store.hydrate does not exist.
    const store = createGraphStore()
    const got: GraphEvent[] = []
    const sub = store.subscribe('file.settings.theme.token', (e) => got.push(e))
    let ret: unknown = 'sentinel'
    expect(() => {
      ret = store.hydrate([{ name: 'file.settings.theme.token', value: { theme: 'dark' } }])
    }).not.toThrow() // the seam itself NEVER throws
    expect(ret).toBeUndefined() // the return is VOID
    const hit = store.resolve('file.settings.theme.token') as GraphReadHit
    expect(hit.found).toBe(true) // the file-tier node is MINTED — resolve answers the hydrated value
    expect(hit.value).toEqual({ theme: 'dark' })
    expect(hit.flag).toBe('file')
    expect(got).toHaveLength(1) // the boot-load event fired BY DESIGN — one event per minted reference
    const ev = got[0]
    expect(ev.name).toBe('file.settings.theme.token') // the reference's own spelling
    expect(ev.flag).toBe('file') // the tier that FIRED
    expect('value' in ev).toBe(true) // present as a KEY on every arm
    expect(Array.isArray(ev.cleared)).toBe(true) // PRESENT AND POSSIBLY EMPTY
    expect(sub.unsubscribe()).toBe(true) // the pre-existing subscription is still live
  })

  it('H3 (HYDRATE-1, clause (2) — NEVER CROSSES) — a hydrate into a store with a RECORDING crossing double answers ZERO put calls (no channel byte, no GraphCrossing.put invocation — the record came FROM main at the Y-1 hand-off, and a boot write-back is a redundant round-trip); the mint still lands; the LIVE control — a file-tier commit — drives the seam exactly once', () => {
    // Field 2's clause (2): "It NEVER CROSSES — no channel byte, no GraphCrossing.put
    // invocation"; the D-4 control: the double must be driven (`crossings: 1` for a
    // regenerated set, never a synthesised integer). RED today: store.hydrate does not exist.
    const calls: unknown[] = []
    const crossing: GraphCrossing = {
      put(row) {
        calls.push(row)
        return { status: 'committed' }
      },
    }
    const store = createGraphStore({ crossing })
    store.hydrate([{ name: 'file.settings.theme.token', value: 'hydrated' }])
    expect(calls).toHaveLength(0) // a hydrate NEVER CROSSES — zero put calls, no channel byte
    expect((store.resolve('file.settings.theme.token') as GraphReadHit).value).toBe('hydrated') // the no-cross rule is not a no-mint rule
    const ctl = store.commit('file.ctl', 'x')
    expect(ctl.status).toBe('committed')
    expect(ctl.crossings).toBe(1) // the control drives the seam — crossings: 1 for the whole set
    expect(calls).toHaveLength(1) // the recording double is LIVE — it recorded the control, never the hydrate
  })

  it('H4 (HYDRATE-1, clause (2) — NEVER EVALUATES THE CONSTRAINT TABLE) — a store WITH a constraint member whose matchedSet matches the hydrated top: the hydrate answers no repair/refusal and the constraint function\'s call-count stays 0; the LIVE control — a commit under the hydrated top — DOES evaluate the matched member (the FIRST constraint evaluation stays reserved for the slice\'s boot step, U-STORE-FOCUS\'s)', () => {
    // Field 2's clause (2): "It NEVER EVALUATES THE CONSTRAINT TABLE — the FIRST constraint
    // evaluation stays reserved for the slice's boot step, U-STORE-FOCUS's, before the first
    // graph load"; the RE-DERIVED constraint member's evaluation points are every write
    // (set/commit) and every remove on the call's POST-STATE — hydrate is not among them.
    let calls = 0
    const member: GraphConstraint = {
      id: 'c1',
      matchedSet: 'settings',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: () => {
        calls += 1
        return true
      },
    }
    const store = createGraphStore({ constraints: [member] })
    const before = calls
    store.hydrate([{ name: 'file.settings.theme.token', value: { theme: 'dark' } }])
    expect(calls).toBe(before) // the hydrate never evaluated the table — call-count stays 0
    expect((store.resolve('file.settings.theme.token') as GraphReadHit).found).toBe(true) // no repair, no refusal — the value is present
    const ctl = store.commit('mem.settings.ctl', 1)
    expect(ctl.status).toBe('committed') // the control commit commits under the hydrated top
    expect(calls).toBe(before + 1) // the control DID evaluate the matched member
  })

  it('H5 (HYDRATE-1, clause (2) — NOT set/commit/remove, and the register\'s own top-level projection) — the write-census double\'s set/commit/remove counts stay 0 on a hydrate; the return is VOID; the register is UNCHANGED except the file-tier nodes the record\'s names mint (pre-existing rows byte-identical, the minted tops enter under the register\'s top-level-projection rule); no lower-tier regeneration clear ran', () => {
    // Field 2's clause (2): "It is NOT set, NOT commit, NOT remove … and it leaves the
    // register/ref-count unchanged EXCEPT the file-tier nodes the record's names mint (the
    // top-level rows those names imply enter the register under the register's own
    // top-level-projection rule)". RED today: store.hydrate does not exist.
    function withCensus(store: GraphStore): { proxy: GraphStore; census: { set: number; commit: number; remove: number } } {
      const census = { set: 0, commit: 0, remove: 0 }
      const proxy = new Proxy(store, {
        get(target, prop) {
          const v = (target as unknown as Record<string, unknown>)[prop as string]
          if (typeof v !== 'function') return v
          if (Object.hasOwn(census, prop as string)) {
            return (...args: unknown[]) => {
              census[prop as 'set' | 'commit' | 'remove'] += 1
              return (v as (...a: unknown[]) => unknown).apply(target, args)
            }
          }
          return (v as (...a: unknown[]) => unknown).bind(target)
        },
      })
      return { proxy, census }
    }
    const store = createGraphStore()
    expect(store.commit('mem.dock', 1).status).toBe('committed') // pre-existing row 1
    expect(store.commit('file.alpha', 'a').status).toBe('committed') // pre-existing row 2 (a file-tier root)
    const { proxy, census } = withCensus(store)
    const before = proxy.register.rows
    const namesBefore = new Set(before.map((r) => r.name))
    let ret: unknown = 'sentinel'
    expect(() => {
      ret = proxy.hydrate([
        { name: 'file.settings.theme.token', value: { theme: 'dark' } },
        { name: 'file.window.tabs.active', value: true },
      ])
    }).not.toThrow()
    expect(ret).toBeUndefined() // VOID — never a receipt
    expect(census.set).toBe(0)
    expect(census.commit).toBe(0)
    expect(census.remove).toBe(0)
    const after = proxy.register.rows
    const added = after.filter((r) => !namesBefore.has(r.name)).map((r) => r.name).sort()
    expect(added).toEqual(['settings', 'window']) // the minted tops entered the register — exactly the file-tier nodes
    expect(after).toHaveLength(before.length + 2) // nothing else entered
    for (const row of after) {
      if (namesBefore.has(row.name)) {
        const beforeRow = before.find((b) => b.name === row.name)
        expect(row).toEqual(beforeRow) // the pre-existing row is byte-identical
      } else {
        expect(row.derived).toBe(true)
        expect(row.nodeRef).not.toBeNull()
        expect(row.constraintId).toBeNull()
      }
    }
    expect((store.tiers.mem.get('mem.dock') as GraphTierGetResult).found).toBe(true) // no lower-tier regeneration clear
    expect((store.tiers.file.get('file.alpha') as GraphTierGetResult).found).toBe(true)
    expect((store.tiers.mem.get('mem.settings') as GraphTierGetResult).found).toBe(false) // file-tier nodes only
    expect((store.tiers.file.get('file.window.tabs.active') as GraphTierGetResult).found).toBe(true)
  })

  it('H6 (HYDRATE-1, clause (4) — THE SKIP POSTURE, DECLARED) — a row that is not a record, or whose name is not a string, or whose spelling is not file.*-qualified, is SKIPPED: it mints nothing, fires nothing and leaves the store unchanged for that name; the record\'s OTHER rows still mint and still fire; the seam itself NEVER throws — attempts: 7 enumerated row terms (1 valid + 6 skipped)', () => {
    // Field 2's clause (4): "A row of the record that is not a record, or whose name is not a
    // string, or whose spelling is not file.*-qualified, is SKIPPED: it mints nothing, fires
    // nothing and leaves the store unchanged for that name; the record's other rows still mint
    // and still fire. The seam itself NEVER throws."
    const rows: unknown[] = [
      { name: 'file.ok', value: 'v' },
      null, // a non-record
      7, // a non-record
      'junk', // a non-record
      { name: 42, value: 'x' }, // a non-string name
      { name: 'mem.x.v', value: 'z' }, // a non-file.* spelling
      { value: 'y' }, // a name-less row
    ]
    expect(rows).toHaveLength(7)
    const store = createGraphStore()
    const okEv: GraphEvent[] = []
    const xEv: GraphEvent[] = []
    store.subscribe('file.ok', (e) => okEv.push(e))
    const xSub = store.subscribe('mem.x.v', (e) => xEv.push(e))
    let ret: unknown = 'sentinel'
    expect(() => {
      // The term array is DECLARED `unknown[]` because six of its rows are deliberately
      // out-of-domain runtime data (null, 7, 'junk', a non-string name, a name-less row);
      // the call asserts the seam's declared parameter shape (`HYDRATE-1`, field 2 —
      // `rows: { name: string; value: unknown }[]`) — the interface is NOT weakened.
      ret = store.hydrate(rows as readonly { readonly name: string; readonly value: unknown }[])
    }).not.toThrow() // never a throw — the row-level skip re-uses the seed seam's skip shape
    expect(ret).toBeUndefined()
    expect((store.resolve('file.ok') as GraphReadHit).found).toBe(true) // the record's OTHER rows still mint
    expect((store.resolve('file.ok') as GraphReadHit).value).toBe('v')
    expect(okEv).toHaveLength(1) // the valid row still FIRES — one event per minted reference
    expect((store.tiers.mem.get('mem.x.v') as GraphTierGetResult).found).toBe(false) // minted NOTHING for that name
    expect(xEv).toHaveLength(0) // the skipped row fired NOTHING for its name
    expect(store.register.rows.map((r) => r.name)).toEqual(['ok']) // only the valid row's top entered the register
    expect(xSub.unsubscribe()).toBe(true) // no subscription registered/released by the seam
  })

  it('H7 (HYDRATE-1, clause (8) — totality on a non-array + the cold boot) — hydrate(\'not-an-array\'), hydrate({}) and the cold-boot hydrate([]) never throw and mint nothing: a non-array is OUTSIDE the rows domain and is SKIPPED under clause (4) — never a throw', () => {
    // Field 2's clause (8): "Outside: a non-array … A row outside the domain is SKIPPED under
    // clause (4) — never a throw"; "a `{ name: string; value: unknown }[]` … `[]` for a cold
    // boot (the hand-off answers [] and the renderer boots on that)"; §2.2 P-5 — the seam
    // itself NEVER throws.
    const terms: unknown[] = ['not-an-array', {}, []]
    expect(terms).toHaveLength(3)
    const store = createGraphStore()
    for (const term of terms) {
      // `term` is declared `unknown` because 'not-an-array' / {} are out-of-domain runtime
      // data; the call asserts the seam's declared parameter shape (`HYDRATE-1`, field 2) —
      // the interface is NOT weakened.
      expect(() => store.hydrate(term as readonly { readonly name: string; readonly value: unknown }[])).not.toThrow() // never a throw
    }
    expect(store.register.rows).toHaveLength(0) // no mint — the register stays empty
    expect((store.tiers.file.get('file.anything') as GraphTierGetResult).found).toBe(false)
  })

  it('H8 (HYDRATE-1, clause (3) — THE READ-BACK) — after a hydrate of N entries, ALL N resolve the hydrated values at tier-1 — the G2 spec\'s M-7 ("the renderer answers the handed-off values") is thereby satisfiable, and a persisted-record boot\'s first rendered graph answers the handed-off values — attempts: 4 deterministic entries, ALL N read back', () => {
    // Field 2's clause (3): "After a hydrate at boot, tier-1 resolves answer the hydrated
    // values — the G2 spec's M-7 … is thereby satisfiable"; store-persist.md M-7's annotation:
    // "every tier-1 resolve answers the handed-off value (or the declared miss)".
    const entries: { name: string; value: unknown }[] = [
      { name: 'file.settings.theme.token', value: { theme: 'dark' } },
      { name: 'file.window.tabs.active', value: true },
      { name: 'file.session.last.key', value: 3 },
      { name: 'file.preferences.locale.lang', value: 'en' },
    ]
    expect(entries).toHaveLength(4)
    const store = createGraphStore()
    store.hydrate(entries)
    for (const { name, value } of entries) {
      const hit = store.resolve(name) as GraphReadHit
      expect(hit.found).toBe(true) // ALL N answer a HIT after the hydrate
      expect(hit.value).toEqual(value) // the hydrated value
      expect(hit.flag).toBe('file') // tier-1 resolves answer the hydrated values
      expect(hit.cache).toBe(store.tiers.file) // the HIT's cache IS store.tiers[flag] by identity (M-3)
    }
    expect(store.register.rows).toHaveLength(4) // four tops entered under the register's top-level-projection rule
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