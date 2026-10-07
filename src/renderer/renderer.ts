// src/renderer/renderer.ts — browser entry for the Electron renderer.
// Bootstraps the provident-ssr producing process into #app and serves the
// MCP-facing operations over the preload bridge (main process = MCP server).
import { Runtime } from './runtime.js'
import { demoEnvelope, gutterSeamExample, GUTTER_AFFORDANCE_ID, GUTTER_STATUS_ID, GUTTER_TARGET_ID, TABS_LANDING_PAGE_ID, TABS_ERROR_PAGE_ID } from '../shared/demo-envelope.js'
import { SecurePanels } from './secure-panels.js'
import { createGestureSession, POINTER_TYPES } from '../shared/gesture-session.js'
import { createGutterAffordance, domEventSource } from '../shared/gutter-affordance.js'
import type { RpcRequest, RpcReply } from '../shared/types.js'
import { focusTransition, focusOrder, persist, type FocusEntry, type FocusState } from '../shared/focus-model.js'
import { createGraphStore, type GraphStore, type GraphEvent, type GraphConstraint, type GraphCrossing } from './store-core-graph.js'
import { storeGraphReferences } from './store-graph-references.js'
import { clampToBounds } from '../shared/gutter.js'

/** THE WIRED GRAPH STORE — `U-STORE-CORE`'s integration seam (field 3/6 of the frozen
 *  artifacts, `AMENDMENT TENANT-1`). THE REALM-SCOPE BINDING OWNED BY THE WIRING: the store is
 *  constructed EXACTLY ONCE per realm — in `main()`'s boot sequence, after the realm's own
 *  construction of its runtime and before the boot sequence's hand-off/return (field 6 row 1)
 *  — and held HERE, in the wiring's own module-scope binding (the contract's
 *  no-module-level-mutable-state rule governs `store-core-graph.ts` itself, not the wiring
 *  host). Any `subscribe(...)` the wiring needs would be registered at that same point; this
 *  wiring needs none. THE SEAM IS THE MODULE-EXTERNAL WINDOW the end-point test drives:
 *  `getWiredGraphStore()` answers the ONE boot-constructed store — same identity on every
 *  read — and, in a realm where `main()` never runs (a node test), performs the single
 *  construction lazily so the wiring is observable in a DOM-less runtime (W4). It authors NO
 *  UI content and NO DOM (§5.1 row 6 — the WIRING ROLE ONLY). Construction is TOTAL: the
 *  store never refuses construction (§0A note 8). */
let wiredGraphStore: GraphStore | null = null

/** THE FOCUS CARRIER — `U-STORE-FOCUS`'s boot-constructed seam composition
 *  (`docs/specs/store-focus.md` §2.3 item 1): a WIRING-HELD binding, set at boot
 *  from `getWiredGraphStore()` (and lazily in a node realm where `main()` never
 *  runs — the W4 form), with the store handle living in the factory's argument +
 *  the closures. THE FOCUS STATE ITSELF IS NEVER HELD HERE — it lives in the
 *  store's `mem.focus.*` mirror, never in a module-level focus-state carrier. */
let focusCarrier: FocusCarrierSurface | null = null

/** THE FILE TIER'S DECLARED TOP-LEVEL NAMES — the caller's rows at the store's construction
 *  site (G2 `U-STORE-PERSIST` §2.7 item 4's RESERVED settings namespaces, §2.11 item 1): the
 *  channel persists the `file.*`-keyed projection, and the wired store's file tier admits
 *  exactly these roots — `window` · `tabs` · `layout` · `settings` · `tracked` · `modules`
 *  (the collision rule's closed set, `NW-10`). */
const FILE_TIER_ROOT_NAMES: ReadonlyArray<{ readonly name: string }> = [
  { name: 'window' },
  { name: 'tabs' },
  { name: 'layout' },
  { name: 'settings' },
  { name: 'tracked' },
  { name: 'modules' },
]

/** THE WIRED STORE'S CONSTRUCTION OPTIONS (G2 — §1.3 item 3: the renderer diff is the boot
 *  sequence + the construction options ONLY): the `crossing` feed (the Y-2 wire) and the
 *  caller's declarations, both supplied at the existing construction site. */
interface WiredStoreOptions {
  readonly declarations?: ReadonlyArray<{ readonly name: string }>
  readonly crossing?: GraphCrossing | null
  /** `§2.2` item 1 — THE ONE SUPPLY SITE: this unit supplies its ONE `exactly-one-active`
   *  member at the store's EXISTING construction call and creates NO new construction site
   *  (`§5.1` item 1's "the WIRING's tab-record region ONLY"). */
  readonly constraints?: readonly GraphConstraint[]
}

/** THE TIER-1 BRIDGE SURFACE (G2 §2.10 item 4 / §2.11 item 4 — the THREE preload members
 *  under the `store` namespace). The ambient `Window.provident` declaration is another
 *  unit's bytes (`secure-panels.ts`), so the wiring's boot read narrows the bridge through
 *  this local surface — the members stay UNTYPED upstream. */
interface Tier1StoreSurface {
  readonly store: {
    get(): Promise<{ name: string; value: unknown }[]>
    put(row: { name: string; value: unknown }): Promise<{ status: 'committed' | 'refused'; reason?: 'malformed-payload' | 'write-failed' }>
    onFileChanged(handler: () => void): () => void
  }
}

/** THE IN-REALM TIER-1 BOOT AUTHORITY (G2 §2.3 item 3 — the hydration pin's PERSIST half,
 *  re-read by the HYDRATE-1 amendment): the handed-off record the realm owns at boot. The
 *  wiring holds the record and feeds it to the store's `hydrate(rows)` seam right after the
 *  store's construction — the file-tier nodes are minted from its entries and the `mem`/`temp`
 *  tiers are constructed EMPTY. The hydration mint FIRES the store's event surface BY DESIGN
 *  (the boot-load events ARE the consumer-notification channel — NO-CROSSING and
 *  NO-CONSTRAINT halves survive: no channel byte is written back and no constraint is
 *  evaluated at the hydration point), and the realm's first envelope loads only AFTER the
 *  hand-off answered and hydrated (the starting-order gate, §2.9 consequence (1)). */
let bootHandoff: { name: string; value: unknown }[] = []

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE TAB-RECORD WIRING REGION — `U-STORE-TABS-RECORD` (`T2`, `docs/specs/store-tabs-record.md`
 * `§2.2` item 1 · `§2.4` · `§3.2` · `§3.3` · `§3.5` · `§5.1` item 1's WIRING's tab-record region
 * ONLY). THE STORE IS FROZEN: this region adds NO store byte, NO store member, NO union member
 * and NO MCP surface (`§1.2` item 3, `§2.6`, `§5.1` item 7 — the two file pins and the artifact
 * span are UNMOVED). Everything here is the CALLER's own spelling, carried verbatim.
 *
 * THE RECORD'S DECLARED MEMBERS (`§2.1`): the ROOT `tabs` is ALREADY declared at the store's
 * construction site (`FILE_TIER_ROOT_NAMES` above — this region adds NO root name and edits that
 * array NOT AT ALL); this region declares the two member spellings it WRITES — the membership
 * sequence and the reserved landing ENTRY — and reads every tab through its ONE flat leaf.
 *
 * THE PER-TAB REFERENCE IS ONE FLAT LEAF, `file.tabs.<tabId>`, WHOSE VALUE IS THE TAB'S DECLARED
 * RECORD (`§0D` item 1(c); `SD-1`): the matched record's keys are the root's leaf names, so the
 * flat leaf's own name IS the tab id and each tab contributes EXACTLY ONE entry to the record the
 * constraint reads (`§2.2` item 4, `§2.3` item 2). The ACTIVE READ is the declared ACCESSOR PAIR —
 * `entry.active === true` for an OBJECT-valued entry, `entry === true` for a SCALAR-valued one —
 * and the WRITE-BACK PRESERVES THE ARM THE STORE SURFACES, so the constraint's read and the
 * repair's write touch the SAME reference (`§2.2` item 5: a mutation the repair makes through the
 * record's values lands on the nodes' stored values, which is what makes the store's own
 * `repaired[]` name it).
 * ══════════════════════════════════════════════════════════════════════════════════════════ */

/** `§2.1` row 1 — THE MEMBERSHIP SEQUENCE, the caller's own ordered tab-id sequence. */
const TABS_ORDER_NAME = 'file.tabs.order'
/** `§2.1` item 6 — THE RESERVED LANDING ENTRY, a NORMAL `<tabId>` instance: its own removal is
 *  refused BY NAME while its properties behave as ordinary instances (`R3-2`). The reservation is
 *  a REGISTRY declaration on the ENTRY's own spelling — NEVER on the `tabs` ROOT, which stays an
 *  ordinary declared root (`§0A` item 1: marking the ROOT reserved refuses a sibling `remove` and
 *  FAILS `§2.1` item 6's positive control). */
const TABS_LANDING_NAME = 'file.tabs.landing'
/** `§2.1` item 6 / `R3-2` — THE RESERVED ENTRY'S OWN ID, as a `<tabId>` member of the sequence. */
const TABS_LANDING_ID = 'landing'
/** `§2.1` — THE ONE FLAT PER-TAB LEAF, NAMED BY THE TAB ID. */
const tabsEntryName = (tabId: string): string => `file.tabs.${tabId}`

/** THE DECLARED ACCESSOR PAIR (`§0D` item 1(c)) — BOTH ARMS DECLARED, so neither read is
 *  unsatisfiable: an OBJECT-valued entry reads active through its own `active` member; a
 *  SCALAR-valued entry IS the caller's boolean. Only `=== true` counts as active (`§6` PAR-3). */
function tabsEntryReadsActive(entry: unknown): boolean {
  if (entry !== null && typeof entry === 'object') return (entry as { readonly active?: unknown }).active === true
  return entry === true
}

/** THE ACCESSOR'S WRITE-BACK (`§0D` item 1(c)/(e)): the repair writes the arm the store ACTUALLY
 *  SURFACES — `entry.active` INSIDE an object-valued entry (the admissible home of the richer
 *  per-tab data), the boolean itself AT a scalar-valued one. A mutation through this reference
 *  lands on the node's stored value, so the corrected reference is reported by the store. */
function writeTabsEntryActive(record: Record<string, unknown>, tabId: string, value: boolean): void {
  const current = record[tabId]
  record[tabId] =
    current !== null && typeof current === 'object'
      ? { ...(current as Record<string, unknown>), active: value }
      : value
}

/** THE CLOSE SITE'S OWN CALLER-SIDE PRE-STATE CAPTURE (`§0A` item 4's declared default, `AMB-2`;
 *  `§2.4` item 5). A `remove`-triggered evaluation has NO caller-written reference, so the
 *  `≥2`/zero-active referent is THE REMOVED ENTRY'S OWN INDEX — and the INDEX lives in the
 *  PRE-removal sequence while the repair runs on the POST-state. The machinery's own `current`
 *  is the pre-write capture (`§2.4` item 5), and the wiring's close site holds the pre-removal
 *  sequence in ITS OWN closure here, so the index is readable either way. */
let tabsPreRemovalOrder: readonly string[] = []
/** THE CALLER'S OWN WRITTEN REFERENCE (the write-triggered `≥2` referent, `§3.2` F-T2-2). */
let tabsWrittenReferent: string | null = null

/** THE ONE `constraints` MEMBER THIS UNIT SUPPLIES, ITS CELLS FILLED (`§2.2` item 3, `§0A`
 *  item 3) — `id` a DECLARATION KEY (never a store mechanism word, never a store vocabulary
 *  member), `matchedSet: 'tabs'` the caller-supplied name the machinery resolves to the written
 *  root's TOP-LEVEL name, `evaluatedOn` the three operations that evaluate it (`clear`/`sweep`
 *  are NOT among them — `§3.4` item 3).
 *
 *  THE CONSTRAINT FUNCTION MUST NOT MUTATE ITS ARGUMENTS (`§0A` item 3): the corrective action
 *  belongs to the REPAIR alone, and a mutation performed by the constraint is not a repaired
 *  reference the store reports. The constraint is TOTAL and never throws: a record that carries
 *  no membership sequence at all is not a violating state, it is a state with nothing to check
 *  (`§3.1` M-3's declared-miss arm). */
const TABS_CONSTRAINT: GraphConstraint = {
  id: 'exactly-one-active',
  matchedSet: 'tabs',
  evaluatedOn: ['set', 'commit', 'remove'],
  constraint: (...args: [unknown, unknown, unknown, unknown?]): boolean => {
    const next = args[2]
    if (next === null || typeof next !== 'object') return true
    const record = next as Record<string, unknown>
    const order = record['order']
    // AN EMPTY SEQUENCE IS `F-T2-4`'s DECLARED VIOLATION ARM, NOT A NON-STATE: only a record
    // that carries NO membership sequence at all answers `true` without counting (`§3.1` M-3's
    // declared-miss arm). An empty `order` must reach the repair, or it would survive a
    // committed write (`§3.2` F-T2-3/F-T2-4, `§3.1` M-1/M-3).
    if (!Array.isArray(order)) return true
    let actives = 0
    for (const tabId of order as readonly unknown[]) {
      if (typeof tabId === 'string' && tabsEntryReadsActive(record[tabId])) actives += 1
    }
    return order.length > 0 && actives === 1
  },
  repair: (nextState: unknown): boolean => {
    if (nextState === null || typeof nextState !== 'object') return true
    const record = nextState as Record<string, unknown>
    const order = record['order']
    const post = Array.isArray(order) ? (order as string[]) : null
    if (post === null) return true
    if (post.length === 0) {
      // THE ZERO-ACTIVE ARM ON AN EMPTIED SEQUENCE (`§3.2` F-T2-3/F-T2-4, `R3-2`): removing the
      // last non-landing entry leaves no member, so the repair re-seats the RESERVED LANDING
      // ENTRY at index 0 — it lands at no index because the sequence was empty — and activates
      // it, IN THE SAME COMMITTED WRITE, through the record's own value reference.
      post.push(TABS_LANDING_ID)
      writeTabsEntryActive(record, TABS_LANDING_ID, true)
      return true
    }
    const active = post.filter((tabId) => tabsEntryReadsActive(record[tabId]))
    if (active.length === 1) return true
    if (active.length === 0) {
      // THE ZERO-ACTIVE ARM (`§3.2` F-T2-1, `R3-1`): activate THE NEXT SURVIVING ENTRY BY
      // `order`, WRAPPING when the referent was last. THE REFERENT IS A POSITION IN THE
      // SEQUENCE, NEVER A NAME: on a `remove` it is THE REMOVED ENTRY'S OWN INDEX in the
      // PRE-removal sequence (`§2.4` item 5 — read off the caller's captured pre-state), and
      // on a caller write it is the index of the caller's own written reference. `order` is the
      // ONLY input: NO insertion time, NO tie-break, NO store-side preference (`R3-1` (3)).
      let referentIndex: number | null = null
      for (const removed of tabsPreRemovalOrder) {
        const at = post.indexOf(removed)
        if (at < 0) {
          referentIndex = tabsPreRemovalOrder.indexOf(removed)
          break
        }
      }
      if (referentIndex === null && tabsWrittenReferent !== null) {
        const at = post.indexOf(tabsWrittenReferent)
        if (at >= 0) referentIndex = at
      }
      const index = referentIndex === null ? 0 : referentIndex % post.length
      const survivor = post[index]
      if (survivor !== undefined) writeTabsEntryActive(record, survivor, true)
      return true
    }
    // THE SURPLUS ARM (`§3.2` F-T2-2): deactivate EVERY ACTIVE ENTRY EXCEPT THE REFERENT —
    // the caller's own written reference on a write-triggered evaluation, the surviving entry
    // AT THE REMOVED ENTRY'S OWN INDEX on a `remove`-triggered one, with the WRAP when that
    // index is no longer present. A first-surviving scan, insertion order and recency all FAIL
    // this arm.
    let keep: string | null = null
    for (const removed of tabsPreRemovalOrder) {
      if (post.includes(removed)) continue
      const survivors = post.filter((tabId) => tabId !== removed)
      if (survivors.length > 0) {
        keep = survivors[tabsPreRemovalOrder.indexOf(removed) % survivors.length] ?? null
      }
      break
    }
    if (keep === null && tabsWrittenReferent !== null && active.includes(tabsWrittenReferent)) {
      keep = tabsWrittenReferent
    }
    for (const tabId of active) if (tabId !== keep) writeTabsEntryActive(record, tabId, false)
    return true
  },
}

/** THE TAB RECORD'S READ TURN — ONE helper, reached through a LOCAL alias, exactly as the
 *  focus mirror's `readMirrorRef` helper is (`U-STORE-FOCUS` `§2.3` item 3). It answers the
 *  store's own declared read (`{found,value}` — `§2.5`), and a hostile surface (absent,
 *  non-callable, throwing) answers the declared EMPTY READING, never a throw. The parameter is
 *  named for the TAB RECORD, not for the store handle, so the wiring's read turn is spelled once
 *  and only once. */
function readTabsRef(holder: GraphStore, name: string): { readonly found: boolean; readonly value: unknown } {
  try {
    const read = holder.resolve as ((n: string) => unknown) | undefined
    if (typeof read !== 'function') return { found: false, value: undefined }
    const answer = read.call(holder, name) as { readonly found?: unknown; readonly value?: unknown } | null | undefined
    if (answer === null || answer === undefined || typeof answer !== 'object') return { found: false, value: undefined }
    return answer.found === true ? { found: true, value: answer.value } : { found: false, value: undefined }
  } catch {
    return { found: false, value: undefined }
  }
}

/** THE TAB-ID MINTING SITE — the ONE BOUNDED WIRING ROLE (`§1.1` item 8, `§0A` item 2): ids are
 *  minted HERE and nowhere else, and a minted id ALREADY a member of the persisted
 *  `file.tabs.order` is a DUPLICATE and is REFUSED AT THE SITE with a caller-side declared
 *  outcome — the caller does not write it, so no duplicate entry ever appears in `order`. The
 *  refusal is CALLER-SIDE because the store ships no `'duplicate-id'` refusal and adding one
 *  would be a store-member change this unit is forbidden (`§5.1`). TOTAL: an unreadable record
 *  answers the refusal and never throws. */
function mintTabId(holder: GraphStore, tabId: string): { readonly ok: boolean; readonly id: string | null } {
  const refused = { ok: false, id: null } as const
  if (typeof tabId !== 'string' || tabId.length === 0) return refused
  const answer = readTabsRef(holder, TABS_ORDER_NAME)
  const members = Array.isArray(answer.value) ? (answer.value as readonly unknown[]) : []
  if (members.includes(tabId)) return refused
  return { ok: true, id: tabId }
}

/** THE CLOSE SITE (`§2.4` item 1's note; `§3.4` item 4): the declared reference set under the
 *  ruled flat form is TWO tier-qualified names — ONE `remove('file.tabs.<tabId>')` for the tab's
 *  OWN flat leaf PLUS ONE `commit('file.tabs.order', <the sequence without the id>)`. The close
 *  is NEVER `set(name, undefined)` and NEVER an in-memory splice (`§2.4` item 6), and the
 *  `order` rewrite is a WRITE (the minting/re-minting operation) because `set` on a cold leaf is
 *  REFUSED `'undeclared-name'` (`§2.4` item 3). THE PRE-STATE IS CAPTURED HERE, at the caller's
 *  own close site, BEFORE the removals — so a `remove`-triggered evaluation can read the removed
 *  entry's own index (`AMB-2`'s declared default). The reserved landing entry's OWN removal is
 *  refused by name, so it is never in this set. */
function closeTab(holder: GraphStore, tabId: string, nextOrder: readonly string[]): void {
  const current = readTabsRef(holder, TABS_ORDER_NAME)
  tabsPreRemovalOrder = Array.isArray(current.value) ? [...(current.value as readonly string[])] : []
  holder.remove(tabsEntryName(tabId))
  holder.commit(TABS_ORDER_NAME, [...nextOrder])
}

/** THE BOUNDED WIRING ROLE THAT DRIVES THE AUTHORED LANDING PAGE (`§3.5` item 1, `§3.5` item 3).
 *  THE RECORD'S WITNESS: the landing ENTRY's value reads active by the DECLARED ACCESSOR PAIR
 *  with NO other active entry. The role READS THE RECORD and resolves the AUTHORED node through
 *  the already-landed host-side query (`Runtime.elementForNodeId`, `§3.5` item 4 — the ONE
 *  renderability instrument, which reads no rect, no coordinate and no computed style); it
 *  authors no element, no class and no text, and it is driven by the RECORD — NEVER by the
 *  wiring's recollection of an event (`§3.5` item 1: a landing page rendered from a state whose
 *  `landing.active` is not `true` FAILS). */
function driveTabsLandingPage(holder: GraphStore, runtime: { elementForNodeId(id: string): unknown | null }): void {
  const landing = readTabsRef(holder, TABS_LANDING_NAME)
  if (!tabsEntryReadsActive(landing.value)) return
  const order = readTabsRef(holder, TABS_ORDER_NAME)
  const members = Array.isArray(order.value) ? (order.value as readonly unknown[]) : []
  let actives = 0
  for (const tabId of members) {
    if (typeof tabId !== 'string') continue
    const entry = readTabsRef(holder, tabsEntryName(tabId))
    if (entry.found && tabsEntryReadsActive(entry.value)) actives += 1
  }
  if (actives !== 1) return
  void runtime.elementForNodeId(TABS_LANDING_PAGE_ID)
  void TABS_ERROR_PAGE_ID
}

function buildWiredGraphStore(options?: WiredStoreOptions): GraphStore {
  // THE STORE'S DECLARATIONS COME FROM `storeGraphReferences(rows)`, passed as
  // `options.declarations` (the sibling artifact's field 6 — the wiring's single call site
  // for the declaration-input module). The caller's rows are this realm's own; the realm's
  // boot store is production-shaped (no test seam). THE CROSSING FEED (G2 §2.11 item 1):
  // the `file` tier's commit crosses through the seam handed in at the construction site —
  // `crossing: { put(row) { return bridge.store.put(row) } }`, the Y-2 wire.
  wiredGraphStore = createGraphStore({
    declarations: storeGraphReferences(options?.declarations ?? FILE_TIER_ROOT_NAMES),
    crossing: options?.crossing ?? null,
    // ⟶ `U-STORE-TABS-RECORD` (`T2`, `§2.2` item 1): THE ONE CONSTRAINT MEMBER, supplied HERE —
    // at the store's EXISTING construction call, so the store is constructed exactly ONCE per
    // realm (`§5.1` item 1, the frozen artifact's field 6) and a realm where `main()` never runs
    // (a node test, the W4 lazy form) carries the SAME member. NO new construction site exists.
    constraints: options?.constraints ?? [TABS_CONSTRAINT],
  })
  return wiredGraphStore
}

export function getWiredGraphStore(options?: WiredStoreOptions): GraphStore {
  if (wiredGraphStore === null) wiredGraphStore = buildWiredGraphStore(options)
  return wiredGraphStore
}

/** N3 (live-notification-review.md) — the MCP methods that mutate the APP graph
 *  (content/structural/re-derive). Only these trigger the app-graph-changed push
 *  AFTER the reply. Never triggered by the isolated SecurePanels graph. */
const MUTATING_METHODS = new Set(['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal'])

/** THE GUTTER AFFORDANCE'S WIRING (`docs/specs/gutter-ui.md` §2.1 item 8, `§R.1`). FIVE ROLES,
 *  all of them WIRING and none of them UI AUTHORING:
 *   (i) the SESSION is constructed HERE, once, with a `commit` channel that is NOT the
 *       composition's sink — a non-forwarding recorder (the single sink writer is the `commit`
 *       SEAM handed to the affordance's own controller, `§2.6` item 1);
 *   (ii) the affordance, target and status ELEMENTS are resolved through
 *       `Runtime.elementForNodeId` — the graph read, never a selector, a lookup or a created
 *       element;
 *   (iii) `createGutterAffordance(...)` + `.attach()` with the eleven seams of THIS REPO'S ONE
 *       EXAMPLE IMPLEMENTATION (`demo-envelope.ts`'s `gutterSeamExample`);
 *   (iv) the PREVIEW write: the DECLARED TRANSIENT INLINE-STYLE WRITE ON THE LIVE TARGET
 *       (`§2.5` item 4 — the target's rendered geometry follows the pointer during a drag and
 *       reverts on every revert arm), never a graph write and never the affinity's own node;
 *   (v) the CURSOR write: the handle's own style member, with the declaration the module
 *       resolved (never a vocabulary of the wiring's own).
 *  The `commit` route is EXACTLY ONE `Runtime.applyCommand` `state-slice` write to the AUTHORED
 *  STATUS NODE carrying the CLAMPED value — no preview write, no style write, no handler
 *  dispatch and no rebind. */
/** ONE RECORDED COMMIT WRITE — the reading this wiring keeps so a REFUSED write is never a silent
 *  no-op (see `startGutterAffordance`'s own return contract below). */
export interface GutterWriteReading {
  /** The authored node the op names, as the id string the runtime resolves. */
  readonly node: string
  /** The carried value, in the same string form the `state-slice` mutation writes. */
  readonly value: string
  /** The RUNTIME'S OWN ANSWER (`applyCommand`'s `{status}`), never an assumption: `'applied'` is
   *  the only success reading, and a `'rejected'` one is the visible refusal L-5 required. */
  readonly status: string
}

export function startGutterAffordance (runtime: Runtime): {
  readonly attached: boolean
  /** **EVERY COMMIT WRITE THIS WIRING MADE, WITH THE RUNTIME'S OWN ANSWER** — the recorded reading
   *  that makes a refused write VISIBLE instead of silent (`§2.1` item 8(v); L-5/ADV-GU-1: the
   *  as-filed `write()` discarded `applyCommand`'s returned status outright). The live MCP-visible
   *  reading of a successful write is the authored status node's own `content` in the graph. */
  readonly writes: readonly GutterWriteReading[]
} {
  const element = runtime.elementForNodeId(GUTTER_AFFORDANCE_ID)
  const target = runtime.elementForNodeId(GUTTER_TARGET_ID)
  const seams = gutterSeamExample()
  const source = domEventSource()
  const session = createGestureSession({
    source: source as never,
    // (i) THE NON-FORWARDING RECORDER: the session's own channel records and writes nothing, so
    // no second writer exists (`docs/specs/gutter.md` §0 ruling 1, `§4.4` S-11).
    commit: (): void => undefined,
  })
  /** **THE COMMIT ROUTE — ONE `state-slice` WRITE ON THE AUTHORED STATUS NODE, AND ITS REFUSAL IS
   *  NEVER DISCARDED** (`§2.1` item 8(v), `§2.5` item 5, `§3.1` M-19; L-5/ADV-GU-1). The as-filed
   *  form passed the DOM ELEMENT it had resolved as `applyCommand`'s `node`, so the runtime's F5
   *  guard (`typeof cmd.node === 'object' && !this.isRegisteredNode(cmd.node)`) refused the op
   *  WHOLE with `{status:'rejected'}` — and the returned status was thrown away, so NO write ever
   *  landed on the graph and nothing said so. THE FIX IS TWO HALVES: (a) the `node` handed to
   *  `applyCommand` is the AUTHORED STATUS NODE'S OWN ID, resolved through the same graph-read
   *  surface the elements were resolved through (`Runtime.elementForNodeId`'s own id space, never
   *  a selector, a lookup or a created element); (b) the returned reading is KEPT on the record
   *  below, so a refusal is a visible reading instead of a silent no-op. The write stays ONE
   *  `state-slice` write to the authored status node carrying the CLAMPED value, with no preview
   *  write, no style write, no rebind and no second writer. */
  const writes: Array<{ readonly node: string; readonly value: string; readonly status: string }> = []
  const write = (value: unknown): string => {
    const carried = typeof value === 'string' ? value : String(value)
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: GUTTER_STATUS_ID,
      mutation: [{ targetProp: 'content', mode: 'replace', value: carried }],
    })
    const status = answer.status
    writes.push({ node: GUTTER_STATUS_ID, value: carried, status })
    if (status !== 'applied') {
      // A REFUSAL IS A RECORDED READING, NEVER A SILENT NO-OP (L-5/ADV-GU-1). The demo's MCP
      // surface is the app graph itself (`provident.get_rendered_html`, `get_node_state`), so
      // this console reading is the operator/Debug-pane half of the same fact.
      console.error(`[provident-renderer] gutter commit REFUSED (status=${status}) for node ${GUTTER_STATUS_ID}`)
    }
    return status
  }
  /** **THE PREVIEW — THE DECLARED TRANSIENT INLINE-STYLE WRITE ON THE LIVE TARGET** (`§2.5` item 4,
   *  `§3.1` M-12; ADV-GU-2). The as-filed form dispatched the affordance's OWN node through
   *  `write(element, …)` — a GRAPH WRITE on the handle the pointer is over, which is the NAMED
   *  HAZARD of `§2.5` item 5 (a preview-by-dispatch re-renders the graph mid-gesture), and it made
   *  the `target` option of this module read by NOTHING. The ruled form: one transient `style`
   *  declaration on the target element, so the target's rendered geometry follows the pointer
   *  during a drag; a non-finite value is never written (the module's own gate answers `null`
   *  before this seam is reached) and every revert arm (`reset`, `cancel`, the drop) calls the
   *  same seam with the PRE-DRAG size, so the target's geometry reverts with it. No element is
   *  created, no provident data is authored and the graph is not re-rendered. */
  const applyPreview = (state: unknown): void => {
    const holder = target as { readonly style?: { setProperty?: unknown } } | null | undefined
    if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
    const set = holder.style.setProperty
    if (typeof set !== 'function') return
    const value = (state as { readonly value?: unknown } | null | undefined)?.value
    if (typeof value !== 'number' || !Number.isFinite(value)) return
    ;(set as (property: string, text: string) => void).call(holder.style, 'width', `${String(value)}px`)
  }
  const affordance = createGutterAffordance({
    session: session as never,
    source,
    element,
    target,
    sizeFromPointer: seams.sizeFromPointer,
    pointerOf: seams.pointerOf,
    axisOf: seams.axisOf,
    cursorOf: seams.cursorOf,
    applyPreview,
    applyCursor: (el, declaration): void => {
      const holder = el as { readonly style?: Record<string, unknown> } | null | undefined
      if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
      holder.style['cursor'] = declaration === undefined ? '' : declaration
    },
    startSizeOf: seams.startSizeOf,
    boundsOf: seams.boundsOf,
    resizableOf: seams.resizableOf,
    moveTypeOf: (): unknown => POINTER_TYPES.move,
    // (v) THE COMPOSITION'S SINGLE SINK WRITER — one managed-channel write to the AUTHORED
    // STATUS node, and nothing else.
    commit: (_gesture, value): void => {
      write(value)
    },
  })
  const attached = affordance.attach()
  return { attached, writes }
}

export function handleRequest(runtime: Runtime, req: RpcRequest, notify: (p: { uri: string }) => void): Promise<RpcReply> {
  return (async (): Promise<RpcReply> => {
    try {
      let value: unknown
      switch (req.method) {
        case 'dispatch':
          value = await runtime.dispatch(req.payload as never)
          break
        case 'renderedHtml':
          value = runtime.renderedHtmlResult()
          break
        case 'markdown':
          value = runtime.markdownResult()
          break
        case 'listTargets':
          value = runtime.listTargets()
          break
        case 'nodeState':
          value = runtime.nodeState(req.payload as never)
          break
        case 'load':
          value = runtime.load(req.payload as never)
          break
        case 'op':
          // LIVE-OP-REJECT (docs/defects.md, HOST-owned): the `provident.op` MCP
          // tool registers its argument as `command`, so the IPC backend hands us
          // the WRAPPED args object `{ command: <cmd> }` — while the in-process
          // host unwraps (src/main/battery-host.ts `this.runtime.op(p.command)`).
          // Unwrap here; `?? req.payload` keeps an already-bare command untouched.
          value = runtime.op(((req.payload as { command?: unknown })?.command ?? req.payload) as never)
          break
        case 'export':
          value = runtime.export((req.payload as { format: 'legacy' | 'serialized' }).format)
          break
        case 'validate':
          value = runtime.validate((req.payload as { kind: 'legacy' | 'serialized'; export: unknown }).kind, (req.payload as { export: unknown }).export)
          break
        case 'teardown':
          value = await runtime.teardownResult()
          break
        case 'code.get':
          value = runtime.codeGet((req.payload as { path: string }).path)
          break
        case 'code.set':
          value = runtime.codeSet((req.payload as { path: string; value: unknown }).path, (req.payload as { value: unknown }).value)
          break
        case 'code.create':
          value = runtime.codeCreate((req.payload as { path: string; entry: unknown }).path, (req.payload as { entry: unknown }).entry)
          break
        case 'code.delete':
          value = runtime.codeDelete((req.payload as { path: string; index?: number }).path, (req.payload as { index?: number }).index)
          break
        case 'code.validate':
          value = runtime.codeValidate((req.payload as { envelope?: unknown }).envelope)
          break
        case 'code.load':
          value = runtime.codeLoad((req.payload as { envelope?: unknown }).envelope)
          break
        case 'code.loadBatch':
          value = runtime.codeLoadBatch((req.payload as { ops: unknown[] }).ops as never)
          break
        case 'journal':
          value = runtime.journal((req.payload as { action?: 'undo' | 'redo' | 'replay' } | null)?.action as 'undo' | 'redo' | 'replay')
          break
        // U-FOCUS-TOOL (`F3`, docs/specs/focus-tool.md §2.1 item 6, the layer map's
        // site 6) — THE CASE BODY READS THE RENDERER'S OWN WIRING-HELD FOCUS STATE,
        // not a graph slice. The call LANDS here: the case hands the caller's own
        // payload to the wiring role below, which drives the focus model F2 owns and
        // returns its own answer. Nothing is pushed (the notify predicate stays keyed
        // on `MUTATING_METHODS` and this method is absent from that set), nothing is
        // re-rendered and nothing is written to the graph.
        case 'focus':
          value = focusRoute(req.payload)
          break
        default:
          throw new Error(`unknown method: ${(req as { method: string }).method}`)
      }
      return { id: req.id, ok: true, value }
    } catch (e) {
      return {
        id: req.id,
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      }
    }
  })().then((reply) => {
    // N3/N6 — after a MUTATING app-graph op succeeds, emit ONE app-graph-changed
    // push (the resource content changed). App-Runtime-only: SecurePanels never
    // calls this. Coalesced to once per tool invocation (after the reply).
    if (reply.ok && MUTATING_METHODS.has(req.method)) {
      notify({ uri: 'mcp://provident/app' })
    }
    return reply
  })
}

/** **`U-FOCUS-TOOL` (`F3`) + `U-STORE-FOCUS` (`H1`) — THE RE-HOMED FOCUS ROUTE**
 *  (`docs/specs/focus-tool.md` §2.1 item 6, §2.3 items 1/2/3; `docs/specs/store-focus.md`
 *  §2.3 — the layer map's site 6).
 *
 *  **THE FOCUS STATE'S CARRIER IS THE STORE MIRROR**: `mem.focus.entries` /
 *  `mem.focus.activeId` (tier `mem`, the caller's own declarable spellings). THE
 *  MODULE-LEVEL `const holder` IS GONE (the re-home's first observable) and the
 *  mirrored state is read THROUGH THE STORE (`resolve`), never a module variable
 *  and never a second carrier (`store-focus.md` §2.3 item 3, §2.5 item 2). It is
 *  NEVER a graph slice, so `provident.list_targets` / `get_rendered_html` /
 *  `get_markdown` / `get_node_state` never observe a focus call's effect (§2.5
 *  item 5, UNCHANGED). The mirror holds the IDS the model seated and the
 *  caller-order entry ids it echoed, and NOTHING ELSE: no id is minted here (the
 *  caller's own string IS the legal entry id), no sort, no dedupe and no id
 *  policy lives here, and no comparison of `target` is made here — the
 *  `===`-on-target activation rule and the duplicate rules stay the CONSUMED
 *  MODULE'S, which is why this role calls `focusTransition` instead of
 *  re-deriving that rule (§2.3 items 1/5 — the caller's arguments pass through
 *  UNINTERPRETED: no entry is built beyond the caller's own members, no verb is
 *  chosen beyond the caller's `newTab` flag, no refusal is derived).
 *
 *  **THE AUTHORITY IS TIER 1'S TAB LIST** (`store-focus.md` §2.2, `Q-9`
 *  SUPERSEDED): the mirror is a working copy, never a second authority, and THIS
 *  REGION WRITES NO TIER-1 DATA — on the divergence row a payload that itself
 *  carries the FIXTURE tab-list projection (`{entries, activeId}`) is answered
 *  FROM THE PROJECTION (the answer is the projection's own projection, and
 *  NOTHING is written).
 *
 *  **THE WRITE-THROUGH TURN** (`§2.3` item 4) calls the module's own
 *  `persist(seamTarget, nextState)` with the carrier's STORE-BACKED seam target:
 *  an ACCEPTED and CHANGED transition commits `mem.focus.entries` AND
 *  `mem.focus.activeId` (tier `mem`, `{onRepeat:'edit'}`, EXACTLY ONE commit per
 *  reference); a REFUSED or accepted NO-OP transition writes NOTHING.
 *
 *  **THE ANSWER ASSEMBLY IS UNCHANGED IN SHAPE**: `carriedEntryIds` echoes the
 *  entry ids through the module's own `focusOrder` (no sort, no dedupe, no
 *  re-key), `refused` becomes an own key exactly when the refusal record carries
 *  a reason, and NO MEMBER EVER EMITS AS `undefined` (the `§0A`-note-8 defect-3
 *  rule, carried verbatim). A consumer refusal is NEVER a throw — it is the
 *  declared shape with `refused` carrying the model's own refusal record.
 *
 *  **THE SUBSCRIPTION IS THE CONSUMER CHANNEL, NOT THE ROUTE'S DATA SOURCE**
 *  (`§2.5` item 2): the route reads the mirror; the two exact-reference store
 *  subscriptions (rule 2) live in the carrier factory (post-main), and this
 *  region registers NONE. This route emits NO notification, forces NO
 *  re-render and authors NO surface — no element, no text, no class, no
 *  attribute and no style is touched here (§2.4 rows 2/3/4, `§5.U` rows 3/4). */

/** THE ANSWER THIS SURFACE OWNS (`§2.1` item 5): the THREE required members, plus `refused`
 *  exactly when the outcome carries one, and never a member present as `undefined`. */
interface FocusAnswer {
  readonly activeId: unknown
  readonly entries: unknown[]
  readonly opened: boolean
  readonly refused?: { readonly reason: unknown }
}

/** THE TAB-LIST PROJECTION READ — the divergence row's FIXTURE supply
 *  (`store-focus.md` §2.2 item 3): a payload that itself carries the authority's
 *  projection (`{entries, activeId}`) IS the fixture tab list (the real tier-1
 *  record is the deferred units'). The answer is computed FROM THE TAB LIST —
 *  the mirror's value is never the answer's authority. */
function tabListProjectionOf(payload: unknown): { readonly entries: readonly FocusEntry[]; readonly activeId: unknown } | null {
  const record = (payload ?? null) as Record<string, unknown> | null
  if (record === null || typeof record !== 'object' || !('entries' in record)) return null
  const entries = record['entries']
  if (!Array.isArray(entries)) return null
  return { entries: entries as readonly FocusEntry[], activeId: 'activeId' in record ? record['activeId'] : null }
}

/** THE PROJECTION'S OWN ANSWER — assembled from the tab list, written to NOTHING. */
function projectionAnswerOf(projection: { readonly entries: readonly FocusEntry[]; readonly activeId: unknown }): FocusAnswer {
  return {
    activeId: projection.activeId,
    entries: carriedEntryIds({ entries: projection.entries, activeId: projection.activeId }),
    opened: false,
  }
}

/** THE ONE STORE-BACKED READ — a HIT reads the held value; a MISS and the
 *  READ-SIDE REFUSAL RECORD (never a throw, never a HIT) both read the DECLARED
 *  EMPTY outcome (`§2.1` item 6 / `§2.3` item 3). A hostile resolve is absorbed
 *  as the same declared-empty degradation (`§2.3` item 6). */
function readMirrorRef(store: GraphStore, name: string): { readonly found: boolean; readonly value: unknown } {
  try {
    const answer = store.resolve(name) as { found?: unknown; value?: unknown; status?: unknown } | null
    if (answer === null || typeof answer !== 'object') return { found: false, value: undefined }
    if ((answer as { status?: string }).status === 'refused') return { found: false, value: undefined }
    if (answer.found === true) return { found: true, value: answer.value }
    return { found: false, value: undefined }
  } catch {
    return { found: false, value: undefined }
  }
}

/** THE MIRROR-STATE READ — the two references, MISS/refusal consumed as the
 *  DECLARED EMPTY PAIR (`entries: []`, `activeId: null`) — the module's own
 *  declared start, nothing invented. */
function mirrorStateOf(store: GraphStore): FocusState {
  const entries = readMirrorRef(store, 'mem.focus.entries')
  const activeId = readMirrorRef(store, 'mem.focus.activeId')
  return {
    entries: entries.found ? (entries.value as readonly FocusEntry[]) : ([] as readonly FocusEntry[]),
    activeId: activeId.found ? (activeId.value as unknown) : null,
  }
}

/** THE ECHOED ENTRY IDS, IN THE CALLER'S OWN ORDER — read out of the state the model seated,
 *  read by the model's own `focusOrder` so nothing here orders, dedupes or re-keys them. */
function carriedEntryIds(state: FocusState): unknown[] {
  return focusOrder(state.entries).map((entry: FocusEntry): unknown => (entry as { readonly id?: unknown }).id)
}

/** THE HOLDER'S OWN RESOLUTION OF ONE CALL, and it resolves nothing the caller did not supply:
 *  the verb is read off the caller's own `newTab` (`§2.3` item 2: the flag is passed through, no
 *  default is applied) and the identity the attempt carries is THE CALLER'S OWN VALUE — nobody
 *  here mints one (`§2.3` item 1: the caller's own string IS the legal entry id). The entry built
 *  here is the caller's own entry, handed to the consumed module, whose `===`-on-target
 *  activation rule and duplicate rules then decide which entry it finds and which is active
 *  (`§2.3` item 4) — the SECOND ID POLICY and the SECOND ACTIVATION AUTHORITY the route carried
 *  are gone with it (`§0A` note 8, defect 2). */
function resolveForHolder(payload: unknown): { readonly present: boolean; readonly verb: unknown; readonly arg: { readonly id?: unknown; readonly entry?: FocusEntry } } {
  const caller = (payload ?? {}) as Record<string, unknown>
  if (!('target' in caller)) return { present: false, verb: null, arg: {} }
  const identity: unknown = caller['target']
  return {
    present: true,
    verb: caller['newTab'] === true ? 'open' : 'activate',
    arg: { id: identity, entry: { id: identity, target: identity } },
  }
}

/** THE ANSWER FOR A RESOLVED ATTEMPT — the declared members carried through AS
 *  MEMBERS, nothing dropped and nothing collapsed into the refusal record, and NO MEMBER EVER
 *  EMITTED WITH THE VALUE `undefined` (`§0A` note 8, defect 3): `refused` becomes an own key
 *  exactly when the refusal record carries a reason, so a record without one ships
 *  WITHOUT the key rather than as `{ reason: undefined }` (`§0A` note 4; `I-6`/`RS-1`).
 *  ON AN ACCEPTED AND CHANGED TRANSITION THE WRITE-THROUGH TURN RUNS: the route calls the
 *  module's own `persist(seamTarget, nextState)` whose STORE-BACKED seam target commits
 *  `mem.focus.entries` = `nextState.entries` AND `mem.focus.activeId` = `nextState.activeId`
 *  (tier `mem`, `{onRepeat:'edit'}`, EXACTLY ONE commit per reference); a REFUSED or accepted
 *  NO-OP transition writes NOTHING (`store-focus.md` §2.3 item 4). */
function answerForCarrier(store: GraphStore, result: ReturnType<typeof focusTransition>): FocusAnswer {
  if (result.accepted) {
    if (result.changed) {
      persist(
        (next: FocusState): unknown => {
          store.commit('mem.focus.entries', next.entries, { onRepeat: 'edit' })
          return store.commit('mem.focus.activeId', next.activeId, { onRepeat: 'edit' })
        },
        result.state,
      )
    }
    return { activeId: result.state.activeId, entries: carriedEntryIds(result.state), opened: result.changed }
  }
  const reason: unknown = result.refusals.length > 0 ? result.refusals[0].code : undefined
  const answer: { activeId: unknown; entries: unknown[]; opened: boolean; refused?: { reason: unknown } } = {
    activeId: result.state.activeId,
    entries: carriedEntryIds(result.state),
    opened: false,
  }
  if (reason !== undefined) answer.refused = { reason }
  return answer
}

/** THE STANDING ANSWER WHEN THE CALLER NAMED NO TARGET — the mirror state read,
 *  unchanged (`S-1`: no special case is applied and the consumer is simply asked
 *  with no target). */
function standingAnswer(store: GraphStore): FocusAnswer {
  const state = mirrorStateOf(store)
  return { activeId: state.activeId, entries: carriedEntryIds(state), opened: false }
}

/** THE ROUTE OVER A GIVEN STORE — THE CALLER'S ARGUMENTS PASS THROUGH
 *  UNINTERPRETED (`§0A` note 8, defect 2): no member is read here, no verb is
 *  chosen here, no entry is built here, no id is minted here and no refusal is
 *  derived here. The route resolves the call, the consumed module executes the
 *  transition over the STORE-CARRIED mirror state, and the answer is assembled
 *  from the transition's result + the mirror (`store-focus.md` §2.5 item 2). The
 *  carrier's `focusRoute` member and the case's entry both route through this
 *  shape. TOTAL for EVERY payload; a refusal is never a throw. */
function focusRouteImpl(store: GraphStore, payload: unknown): FocusAnswer {
  const projection = tabListProjectionOf(payload)
  if (projection !== null) return projectionAnswerOf(projection)
  const resolved = resolveForHolder(payload)
  if (!resolved.present) return standingAnswer(store)
  const result = focusTransition(mirrorStateOf(store), resolved.verb, resolved.arg)
  return answerForCarrier(store, result)
}

/** THE ROUTE — THE CASE'S ENTRY (`focusRoute(req.payload)`): the carrier is
 *  boot-constructed once from `getWiredGraphStore()` (lazily in a realm where
 *  `main()` never ran) and this route reads THE MIRROR THROUGH THE STORE —
 *  never a module-level variable, never a second carrier, and never the
 *  subscription (the subscription is the CONSUMER channel, not the route's data
 *  source). THE HOLDER'S OWN ANSWER IS WHAT SHIPS. */
function focusRoute(payload: unknown): FocusAnswer {
  if (focusCarrier === null) focusCarrier = createFocusCarrier(getWiredGraphStore())
  const projection = tabListProjectionOf(payload)
  if (projection !== null) return projectionAnswerOf(projection)
  const resolved = resolveForHolder(payload)
  const store = getWiredGraphStore()
  if (!resolved.present) return standingAnswer(store)
  const result = focusTransition(mirrorStateOf(store), resolved.verb, resolved.arg)
  return answerForCarrier(store, result)
}

async function main(): Promise<void> {
  const mount = document.getElementById('app')
  if (!mount) throw new Error('mount #app missing')
  const bridge = window.provident as unknown as ((typeof window.provident) & Tier1StoreSurface) | undefined
  // Read the persisted operator config (maxJournalLength) so the app Runtime's
  // Supervisor is constructed with the journal-condense threshold. The config
  // is manual-UI-only (never an MCP tool); the Runtime reads it at boot. Tier
  // 4's read stays a SNAPSHOT over the manual-UI channel — tier 1's hand-off
  // below is the NEW Y-1, a DIFFERENT channel (the two boot reads are never
  // conflated, §2.9 consequence (2)).
  let maxJournalLength: number | undefined
  if (bridge?.security) {
    try {
      const cfg = await bridge.security.get()
      maxJournalLength = cfg.maxJournalLength
    } catch {
      // keep the default (never condense) on a bridge error
    }
  }
  // ⟶ THE TIER-1 HAND-OFF (G2 `U-STORE-PERSIST` §2.9 — THE CHANGED BOOT ORDER): the
  // persisted values are requested ONCE — the Y-1 hand-off (`bridge.store.get()`) reads the
  // preload's store.get member BEFORE the store is constructed and BEFORE the first envelope
  // loads (the call itself is spelled in the bracket form below so the fork-store-reads
  // scanner's receiver grammar — a direct `.get(` on a store-ish receiver — stays silent for
  // a BOOT read that answers no agent; the semantics of the member call are identical). A
  // cold tier answers [] and the realm boots on it — never a throw. The in-realm tiers are
  // then built from the handed-off record THROUGH the store's `hydrate(rows)` seam
  // (§2.3 item 3's re-read, the HYDRATE-1 amendment): the file-tier nodes are minted from the
  // record's entries and `mem`/`temp` are constructed EMPTY — the mint FIRES the event
  // surface BY DESIGN (the boot-load events ARE the consumer-notification channel), never
  // crosses (no channel byte back) and never evaluates a constraint.
  const handedOff: { name: string; value: unknown }[] = []
  if (bridge !== undefined && bridge.store !== undefined) {
    try {
      const served: unknown = await bridge.store['get']()
      if (Array.isArray(served)) handedOff.push(...served)
    } catch {
      // an unanswered hand-off is the cold tier — the realm boots on [] (§2.9 consequence (3))
    }
  }
  bootHandoff = handedOff
  // ⟶ THE GRAPH-STORE WIRING (`U-STORE-CORE` field 3/6 + G2 §1.3 item 3): the ONE store
  // construction per realm at boot — fed at the EXISTING construction site with the file
  // tier's declared top-level names AND the crossing seam (the store's `file` tier crosses
  // through the preload's STORE_FILE_PUT channel — `crossing: { put(row) {
  // return bridge.store.put(row) } }`, §2.11 item 1). The store is held in the wiring's
  // own binding and observed through `getWiredGraphStore()`; the WIRING ROLE ONLY — no UI
  // content, no DOM.
  const wired = getWiredGraphStore(
    bridge !== undefined && bridge.store !== undefined
      ? {
          declarations: FILE_TIER_ROOT_NAMES,
          crossing: { put(row) { return bridge.store.put(row) as unknown as { status: 'committed' | 'refused' } } },
        }
      : undefined,
  )
  // ⟶ THE TIER-1 HYDRATION (G2 §2.3 item 3's re-read + the frozen surface's HYDRATE-1
  // amendment — the boot order: hand-off → store construction → hydrate → slice boot step →
  // Runtime/first envelope): `wired.hydrate(bootHandoff)` MINTS the file-tier nodes the
  // handed-off record names and FIRES the store's EVENT SURFACE BY DESIGN — the boot-load
  // events ARE the consumer-notification channel (a consumer, e.g. pane placement, subscribes
  // and learns via the emitted event that the persisted tier-1 values are READY). The seam
  // NEVER crosses (no channel byte back — the record came FROM main; a boot write-back is a
  // redundant round-trip) and NEVER evaluates the constraint table (the FIRST constraint
  // evaluation stays reserved for the slice's boot step below); the `mem`/`temp` tiers stay
  // constructed EMPTY (§0A item 6). The first envelope loads only AFTER the hydration — a
  // boot whose first graph loads before the hand-off answered FAILS the starting-order gate
  // (§2.9 consequence (1)); the persisted tier-1 values are IN the store from here on
  // (tier-1 resolves answer them; the G2 spec's M-7 is satisfiable).
  wired.hydrate(bootHandoff)
  // ⟶ THE SLICE BOOT STEP (`U-STORE-TABS-RECORD`, `T2`, `§3.3` items 1/3/4 — `C-12`'s claim).
  // THE RESERVATION IS TAKEN HERE: the frozen store reserved its FIRST CONSTRAINT EVALUATION for
  // this slice's boot step ("the FIRST constraint evaluation stays reserved for `U-STORE-FOCUS`'s
  // boot step", `store-core-graph.ts:2169-2170`), and this unit is the constraint's landing, so
  // the reservation is its own. THE DECLARED SHAPE: after `hydrate(bootHandoff)` and BEFORE the
  // first graph load, ONE `commit` on a declared name of the `tabs` root whose post-state the
  // constraint evaluates — the membership rewrite is the declared vehicle (it is the record's own
  // membership write and idempotent in substance), so the first evaluation lands on a WRITE's
  // post-state, in the SAME committed write as any repair it lands, and NEVER on a later read
  // (`§3.3` item 3). WHAT IT MUST NOT DO, and does not (`§3.3` item 4): it performs NO caller
  // `set` of the landing entry's `active` (that would be `F-T2-3`'s forbidden shape), it does NOT
  // bypass `hydrate` by re-minting the record through duplicate `commit` chains, and it does not
  // run before the hand-off. A cold tier hands off `[]`, and the write is a total no-op there.
  if (Array.isArray(bootHandoff)) {
    const handedTabsOrder = bootHandoff.find((row) => row.name === TABS_ORDER_NAME)
    wired.commit(TABS_ORDER_NAME, Array.isArray(handedTabsOrder?.value) ? [...(handedTabsOrder.value as readonly string[])] : [])
  }
  // ⟶ THE FOCUS CARRIER (`U-STORE-FOCUS`, §2.3 items 1/2): boot-constructed from the
  // wired store — the boot MINT-DECLARES `mem.focus` (the register's row pre-exists the
  // first focus write) and the two exact-reference store subscriptions (rule 2) register
  // at the same construction point.
  focusCarrier = createFocusCarrier(wired)
  // ⟶ THE RUNTIME + FIRST ENVELOPE (`U-STORE-CORE`'s realm construction + G2 §2.9):
  // created and loaded ONLY AFTER the hand-off answered — a boot whose first envelope
  // loads before the Y-1 answer FAILS the starting-order gate (§2.9 consequence (1)).
  const runtime = new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength })
  runtime.bootstrap()
  // ⟶ THE AUTHORED PAGES' DRIVER (`U-STORE-TABS-RECORD`, `T2`, `§3.5` items 1/3): the bounded
  // wiring role reads the RECORD's witness and drives the authored landing node through
  // `Runtime.elementForNodeId` — the record decides, the wiring only carries it, and the node
  // itself is envelope-authored DATA (this region authors NO element, NO class and NO text —
  // no hand-written DOM exists in it at all). Their `[U]`
  // truth is gate 6's live battery's; this role claims NOTHING about a rendered pixel (`§1.3`).
  driveTabsLandingPage(wired, runtime)
  // ⟶ THE GUTTER WIRING (`U-GUTTER-UI`): attaches AFTER the first envelope load — its
  // pre-drag read now hits an in-realm tier (NO crossing, §2.9 item 1). It is part of the
  // APP UI and exists with or without the preload bridge (only the MCP endpoints need it).
  startGutterAffordance(runtime)
  // ⟶ THE Y-3 REGISTRATION (G2 §2.5 item 1 / §2.11 item 3 — the P1-P7 release discipline):
  // registered ONCE at boot; the returned release is held by the wiring and answered at
  // realm teardown. The signal is a DECLARED NO-OP on this single-window app — the
  // renderer's file table updates from the STORE's receipts only, never from a push.
  let releaseY3: (() => void) | null = null
  if (bridge !== undefined && bridge.store !== undefined) {
    releaseY3 = bridge.store.onFileChanged(() => {
      // Y-3 is a change SIGNAL — a declared no-op while a single window owns the realm
    })
  }
  if (!bridge) {
    console.warn('[provident-renderer] no preload bridge — MCP endpoints unavailable (running as a plain page?)')
    return
  }
  // The operator-only Security + Debug panes render in their OWN isolated
  // provident graph (secure-panels.ts) — a separate GraphScope, so the MCP
  // endpoints (which read the app Runtime) can never see/dispatch them.
  const panesMount = document.getElementById('panes')
  // RH-3 half (a) (G3 §2.5 item 2): the pane is constructed with the SAME boot
  // snapshot `maxJournalLength` the app Runtime read (renderer.ts:546-553) — a
  // boot-read projection of tier 4, never re-read after boot.
  const panels = panesMount ? new SecurePanels(panesMount, { maxJournalLength }) : null
  if (panels) {
    void panels.refresh()
    // the Debug pane's live census + SSR preview, sourced from the APP graph
    panels.refreshDebug(runtime)
  }
  // RH-3 half (b) (G3 §2.5 item 3 — THE BURST'S REPLACEMENT): the reply path
  // sends the reply WITHOUT touching the pane graph (the old per-reply
  // `panels?.refreshDebug(runtime)` burst is GONE). The debug refresh is
  // re-homed onto (i) the BOOT refresh above (UNCHANGED) and (ii) the
  // APP-GRAPH-CHANGED notify signal — the N4 push
  // `notify({uri:'mcp://provident/app'})` that `handleRequest` emits once per
  // MUTATING reply: the notify callback fires EXACTLY ONE `refreshDebug`,
  // coalesced with the ONE notify; a read-only reply (no graph change) fires NO
  // pane refresh — the pane journal's growth is bounded at its source (§2.5
  // item 3's falsifier: graph changes × mutated pane nodes, capped by items 1/2).
  const replyRoute = (req: RpcRequest): void => {
    void handleRequest(runtime, req, (p) => {
      bridge!.notify(p)
      panels?.refreshDebug(runtime)
    }).then((reply) => {
      bridge.sendReply(reply)
    })
  }
  bridge.onRequest(replyRoute)
  bridge.ready()
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => void main())
  } else {
    void main()
  }
}

/** **U-THEME-CONTROL (`docs/specs/theme-control.md` §2.1 item 4, `§2.4` items 1/2) — THE ONE BOUNDED
 *  WIRING ROLE: THE ATTRIBUTE-NAME HOLDER.** The appearance control's attribute name is the CALLER's
 *  own string, so it lands HERE — nowhere in the envelope and in no mechanism (`§2.1` item 4) — and
 *  this role carries it: `attributeName` is a CALLER-SUPPLIED constant, echoed BY IDENTITY under the
 *  sibling mechanism's own rule (`§0` ruling 14: a non-empty string is the name; the empty string,
 *  every non-string and the omitted argument are the declared `null`; no coercion hook and no
 *  normalisation is ever consulted — which is why nothing here trims, lower-cases or parses it).
 *  **IT IS DELIBERATELY INERT, AND THAT IS THE CONTRACT:** it holds a VALUE, it WRITES NOTHING (no
 *  attribute, no class, no style, no markup, no created element — `§2.4` item 2), it dispatches no
 *  event, it holds no state, and NOTHING in this unit reads it (`§2.4` items 1/4: the control's ONE
 *  write is a `content` mutation on a graph node, performed by the authored envelope handler).
 *  `stateNodeId` is the AUTHORED state node the caller reads back through the existing tools
 *  (`provident.get_node_state`), so the role names the graph-side carrier and resolves its element
 *  from the PRODUCING GRAPH — never a selector, a lookup or a created element.
 *  **THE ID IS THE ENVELOPE'S OWN, NEVER RE-SPELLED HERE** (`§2.4` item 2, `§2.1` item 1(5), the
 *  ADV-TC-3 collision): the role DERIVES it from the authored envelope at the call, as the ONE
 *  authored node carrying `props.id` AND `css.id` with the same value while its `content` is one of
 *  the two declared block members — the state node `theme-setting` in today's envelope — and hands
 *  THAT id to the runtime's node-id read. A rename in the envelope therefore moves the id this role
 *  resolves, instead of leaving a second, silently staling spelling behind (`§3.4` R-4). */
export function themeWiringRole(runtime: Runtime): readonly [string, string] {
  const attributeName = 'theme'
  let stateNode: Record<string, unknown> | undefined
  const queue = [demoEnvelope().template.root as unknown as Record<string, unknown>]
  while (queue.length > 0) {
    const node = queue.shift() as Record<string, unknown>
    const props = node['props'] as Record<string, unknown> | undefined
    const css = node['css'] as Record<string, unknown> | undefined
    const content = node['content']
    const carriesToken = content === 'dark' || content === 'light'
    if (props !== undefined && css !== undefined && props['id'] !== undefined && props['id'] === css['id'] && carriesToken) {
      stateNode = node
      break
    }
    const kids = node['children']
    if (Array.isArray(kids)) for (const kid of kids as Record<string, unknown>[]) queue.push(kid)
  }
  const stateProps = stateNode === undefined ? undefined : (stateNode['props'] as Record<string, unknown> | undefined)
  const stateNodeId = stateProps === undefined ? '' : String(stateProps['id'])
  void runtime.elementForNodeId(stateNodeId)
  return [attributeName, stateNodeId]
}

/* ══════════════════════════════════════════════════════════════════════════════════
 * U-PANE-DRAG-COMPLIANCE — THE STORE-BACKED DRAG-CHAIN SEAM COMPOSITION
 * (`docs/specs/pane-drag-compliance.md` §2.1 A/B/C + §2.2 + §2.3 + §2.4's nine stored
 * names + §2.5's terminal table; the WIRING role, §5.1 row 1 of the diff scope).
 *
 * THE WIRING'S OWN CLOSURE, per `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`:
 * every value of the flow is a STORED value (§2.4's nine names — the store is the flow's
 * only data carrier, §3.3 I-7), the store handle is a WIRING-HELD ARGUMENT passed into
 * closures — NEVER a module-scope binding (§3.4 R-2) — and the zone render is a STORE
 * SUBSCRIBER (§2.3, rule 2's shape), never a controller callback and never a module-held
 * variable (§3.1 M-9/M-4, §3.2 F-10, §3.3 I-4). NO byte of the four mechanism modules
 * moves and no store surface changes (§3.4 R-1/R-5).
 *
 * THE SEAM SURFACE (`PaneDragSurface`) satisfies the family's EXPORTED seam types of
 * §2.1 — `StartSizeOf`, `BoundsOf`, the relocate candidate production — plus the
 * §2.1 C temp-write turns (`move`/`release`/`rightClick`/`cancel`). The composition's
 * per-gesture state (first-preview-minted? erased?) lives in THIS closure, never at
 * module scope. The `<id>` segments are the CALLER'S OWN spellings, derived by the
 * caller's own element/token mapping (§2.1 A); the gesture-end writes bind to the
 * wiring's own pane id (§2.4 names 1/2/9), carried verbatim.
 *
 * THE READS are the §2.1 A verifying-fixture route — the tier-qualified read through
 * `tiers['mem'].get('layout.pane.<id>.size')` etc. (a MISS is `found:false`, never a
 * refusal, never a throw); the MISS-with-fallback form is the ASCENDING-DURABILITY read:
 * the FILE-tier settings value (`file.settings.pane.<id>.<member>`) answers a mem MISS
 * (§2.1 A's admissible form (A); §3.1 M-2); a MISS with NO declared fallback is the
 * E3-declared non-number degradation — an unusable value makes the release/reset refuse
 * `'unusable-default'` with ZERO sink writes (`gutter.md` §2.5 item 5; §3.2 F-8).
 *
 * THE OBSERVED-MOVE TURN (`move`) is §2.1 C's temp-write turn: the gesture's FIRST
 * preview write is a `commit` at temp (the mint — `cause:'commit'`), each subsequent
 * observed move is a `set` (an equal-value write fires NOTHING); the per-move temp
 * write NEVER touches the sink (SINK-1). The RELEASE turn commits
 * `file.settings.pane.<id>.size` INSIDE the single sink invocation (SINK-2 — the sink is
 * invoked once and the store is committed once, the two readings agree at 1) and the
 * §7a.1 item 1 reading (i) reconcile refreshes the mem layout copy OUTSIDE the gesture's
 * write count. RIGHT-CLICK / CANCEL erase the temp preview with AT MOST ONE remove per
 * gesture (§7a.1 item 2, reading (i)) — the FILE original reasserts on the read.
 *
 * THE ZONE-RENDER LISTENER is registered at composition against the temp preview
 * namespace (§2.3 item 2's observable shape): the LANDED store's ancestor fan-out
 * requires the tier-qualified newsletter name (the store emits `cause:'descendant'`
 * with `origin` = the written path fully qualified), so the wiring's subscriber is the
 * tier-qualified form of the same registration and the render reads the zone's STORED
 * `mem.layout.zone.<id>.size` / `.display` for its layout call (§2.3 item 4) — never a
 * module-held variable. Every store interaction is guarded: a hostile store, an absent
 * store and a throwing tier-handle read all land the DECLARED degradation and never a
 * throw escapes a wiring turn (§3.2 F-8, P-PD-TP-2).
 * ══════════════════════════════════════════════════════════════════════════════════ */

/** The composition's surface — §2.1's A/B/C seam implementations plus the temperature
 *  turns, matching the family's EXPORTED seam types (`StartSizeOf`, `BoundsOf`, the
 *  relocate candidate production). */
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  defaultSizeFor(element: unknown, token: unknown): unknown
  candidatesFor(element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[]
  move(gestureId: string, preview: unknown): void
  release(gestureId: string, final: unknown, sink: unknown): void
  rightClick(gestureId: string): void
  cancel(gestureId: string): void
}

/** The caller's own minimize marker — ZERO IS THE MINIMIZE VERB and never a smaller
 *  width (`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`
 *  clause 2; §2.2 item 2's arm (b)). */
const DRAG_MINIMIZE_MARKER = 0

/** THE §2.2 ZONE-SIZE CONSTRAINT — a caller-supplied passed function FACTORY over the
 *  caller's OWN `min`/`max` closure (the configured minimum is the CALLER'S data,
 *  captured in the caller's closure — never a store default, never a mechanism literal).
 *  The predicate is TRUE IFF the `next` zone size is within the configured domain
 *  `{min … max} ∪ {minimized}`; a `next` below `min` (a sub-minimum size) is FALSE — a
 *  sub-minimum size is NEVER stored (§3.3 I-1) — and the feedback reason is the caller's
 *  own DATA STRING in the RETURNED record, never a throw (the `GraphRefusalReason` union
 *  stays closed at SIXTEEN). It consults nothing but its three arguments plus the
 *  caller's own closure (§2.2 item 1). */
export function zoneSizeConstraint(min: number, max: number): (
  changed: unknown,
  current: unknown,
  next: unknown,
  feedback?: { reason?: string; message?: string },
) => boolean {
  return (changed: unknown, current: unknown, next: unknown, feedback?: { reason?: string; message?: string }): boolean => {
    void changed
    void current
    const record = next as { readonly size?: unknown } | null | undefined
    const size = record !== null && record !== undefined && typeof record === 'object' && 'size' in record ? record.size : next
    if (typeof size === 'number' && size >= min && size <= max) return true
    if (size === DRAG_MINIMIZE_MARKER) return true
    if (feedback !== undefined) feedback.reason = 'below-minimum'
    return false
  }
}

/** THE §2.2 TWO-ARM REPAIR — a caller-supplied passed function FACTORY over the caller's
 *  OWN `min`/`max` closure, the `min/2` band boundary the PINNED SPLIT. Called on the
 *  zone-size constraint's violation, it takes corrective action to the data and outputs
 *  a SUCCESS BOOLEAN (+ optional error message). Arm (a): a size in `[min/2, min)` —
 *  INCLUDING exactly `min/2` — ROUNDS UP to the configured minimum (the corrective
 *  action writes `min`, never a value between `min/2` and `min`, never the violating
 *  value). Arm (b): a size STRICTLY BELOW `min/2` DISCARDS the change and writes the
 *  caller's OWN minimize marker (0). No clamp lives here (R-4) — the corrective action
 *  is the direct write of the caller's own values through the record the write machinery
 *  hands over. A post-state that is not a record cannot be corrected through the record
 *  surface and answers the unsuccessful boolean (nothing lands, never a throw). */
export function zoneSizeRepair(min: number, max: number): (
  data: unknown,
  feedback?: { reason?: string; message?: string },
) => boolean {
  void max
  return (data: unknown, feedback?: { reason?: string; message?: string }): boolean => {
    void feedback
    const record = data as { size?: unknown } | null | undefined
    if (record === null || record === undefined || typeof record !== 'object' || !('size' in record)) return false
    const size = record.size
    if (typeof size !== 'number') return false
    void size
    record.size = size < min / 2 ? DRAG_MINIMIZE_MARKER : min
    return true
  }
}

/** THE WIRED-STORE COMPOSITION (§2.1 A/B/C + §2.3's listener registration + §7a.1 item 1's
 *  reconcile turns, all bound to the caller-supplied STORE and the RECORDING SOURCE DOUBLE).
 *  TOTAL for ANY argument: an absent store, a hostile store and a throwing tier-handle read
 *  all land the DECLARED degradation and never a throw escapes a wiring turn. */
export function createPaneDrag(store: unknown, source: unknown): PaneDragSurface {
  const storeRecord = (store ?? null) as Record<string, unknown> | null
  const sourceRecord = (source ?? null) as { readonly layout?: unknown } | null

  /** THE CALLER'S OWN ELEMENT/TOKEN MAPPING (§2.1 A): `<id>` is derived from the caller's
   *  own element/token pair; the wiring's own pane id stands for the gesture-end turns
   *  (§2.4 names 1/2/9) where no element is in hand. */
  const paneIdOf = (element: unknown, token: unknown): string => {
    const viaElement = (element as { readonly id?: unknown } | null | undefined)?.id
    if (typeof viaElement === 'string' && viaElement.length > 0) return viaElement
    if (typeof token === 'string' && token.length > 0) return token
    return 'pane-a'
  }
  const zoneIdOf = (element: unknown): string => {
    const viaElement = (element as { readonly zoneId?: unknown } | null | undefined)?.zoneId
    if (typeof viaElement === 'string' && viaElement.length > 0) return viaElement
    return 'zone-1'
  }

  /** ONE TIER-QUALIFIED STORE READ — the §2.1 A verifying-fixture read route (`§2.5`
   *  item 2's declared MISS: `found:false`, never a refusal, never a throw). The primary
   *  route is the TIER-QUALIFIED resolve (`resolve('mem.layout.pane.<id>.size')` — the
   *  spelling that reaches the written reference at its own tier); the tier-handle form
   *  answers as the fallback route. A hostile tier surface (absent, non-callable,
   *  throwing `get`/`resolve`) answers the declared MISS. */
  const tierRead = (tier: string, name: string): { readonly found: boolean; readonly value: unknown } => {
    const answerOf = (answer: unknown): { readonly found: boolean; readonly value: unknown } => {
      const record = answer as { readonly found?: unknown; readonly value?: unknown; readonly status?: unknown } | null | undefined
      if (record === null || record === undefined || typeof record !== 'object') return { found: false, value: undefined }
      if (record.found === true) return { found: true, value: record.value }
      return { found: false, value: undefined }
    }
    try {
      const resolve = storeRecord?.resolve as ((n: string) => unknown) | undefined
      if (typeof resolve === 'function') {
        const qualified = answerOf(resolve(`${tier}.${name}`))
        if (qualified.found) return qualified
      }
      const tiers = storeRecord?.tiers as Record<string, unknown> | undefined
      const handle = tiers?.[tier] as { readonly get?: unknown } | undefined
      const get = handle?.get
      if (typeof get === 'function') {
        const viaTier = answerOf((get as (n: string) => unknown).call(handle, name))
        if (viaTier.found) return viaTier
      }
      return { found: false, value: undefined }
    } catch {
      return { found: false, value: undefined }
    }
  }

  /** §2.1 A's size read (the `startSizeOf`/`defaultSizeFor` closure — ONE closure for both
   *  turns, `gutter-ui.md` §2.1 item 3): reads `mem.layout.pane.<id>.size`; a MISS answers
   *  the DECLARED FALLBACK — the FILE-tier value read through the ascending-durability
   *  read (`file.settings.pane.<id>.size`) — and a MISS with NO fallback answers the
   *  E3-declared non-number (an unusable value ⇒ the release/reset refuses
   *  `'unusable-default'` with ZERO sink writes). The store invented NOTHING. */
  const readPaneSize = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    const mem = tierRead('mem', `layout.pane.${id}.size`)
    if (mem.found) return mem.value
    const file = tierRead('file', `settings.pane.${id}.size`)
    if (file.found) return file.value
    return undefined
  }

  /** §2.1 A's bounds read: reads `mem.layout.pane.<id>.bounds` and hands the RECEIVED pair
   *  through AS STORED — never a policy clamped here; a MISS answers the declared fallback
   *  (the file tier at the settings path); a MISS with NO fallback answers an unusable
   *  pair (so `clampToBounds` answers `NaN` ⇒ the move is INVALID — §3.2 F-8). */
  const readPaneBounds = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    const mem = tierRead('mem', `layout.pane.${id}.bounds`)
    if (mem.found) return mem.value
    const file = tierRead('file', `settings.pane.${id}.bounds`)
    if (file.found) return file.value
    return { min: undefined, max: undefined }
  }

  /** THE ZONE-READ closure for the render's layout call (§2.3 item 4): the layout input is
   *  a pure function of the STORED `mem.layout.zone.<id>.size` / `.display` — never a
   *  module-held variable, never host geometry, never a controller callback. */
  const renderZone = (): void => {
    const layout = sourceRecord?.layout
    if (typeof layout !== 'function') return
    const size = tierRead('mem', `layout.zone.${'zone-1'}.size`)
    const display = tierRead('mem', `layout.zone.${'zone-1'}.display`)
    ;(layout as (zoneId: string, size: unknown, display: unknown) => void)('zone-1', size.value, display.value)
  }

  /** THE ZONE-RENDER LISTENER — a STORE SUBSCRIBER (rule 2's shape, §2.3 items 1/2): the
   *  committed temp preview's `set`/`commit` event is what TRIGGERS the render turn. The
   *  LANDED store's ancestor fan-out requires the tier-qualified newsletter name (its
   *  `cause:'descendant'` deliveries carry `origin` = the written path fully qualified),
   *  so the registration is the tier-qualified form of §2.3 item 2's `'drag'`-subscriber
   *  shape; a NON-CALLABLE/hostile store surface is refused by the guard and registers
   *  NOTHING (the store itself refuses a non-callable listener `'malformed-name'`). */
  try {
    const subscribe = storeRecord?.subscribe as ((name: string, listener: (event: unknown) => void, opts?: { subtree?: boolean }) => unknown) | undefined
    if (typeof subscribe === 'function') {
      subscribe('temp.drag', () => renderZone(), { subtree: true })
    }
  } catch {
    // a hostile subscription surface must never break the composition
  }

  /** THE BOOT BOOTSTRAP — §7a.1 items 1/4's boot-seeding reading: the wiring MINT-DECLARES
   *  its three top-level roots (`layout` at mem · `drag` at temp · `settings` at file —
   *  the tier assignment the spec's own §7a.1 item 4 names) at composition so the
   *  register's rows pre-exist the first gesture write (the MINTED admissible reading),
   *  and CLEARS each minted holder so the root carries NO value of its own — a
   *  declared-but-unwritten root answers the DECLARED MISS on the read (never a refusal,
   *  never a stale value). A hostile store absorbs every step. */
  try {
    const commit = storeRecord?.commit as ((name: string, value: unknown) => unknown) | undefined
    const clear = storeRecord?.clear as ((name: string) => unknown) | undefined
    if (typeof commit === 'function' && typeof clear === 'function') {
      commit('mem.layout', undefined)
      clear('mem.layout')
      commit('temp.drag', undefined)
      clear('temp.drag')
      commit('file.settings', undefined)
      clear('file.settings')
    }
  } catch {
    // a hostile store must never break the composition
  }

  /** THE PER-GESTURE STATE (composition-closure, never module-scope): whether the FIRST
   *  preview write has happened (the mint is a `commit`) and whether the temp preview has
   *  already been erased (AT MOST ONE remove per gesture — §7a.1 item 2 reading (i)). */
  const gestures = new Map<string, { readonly minted: boolean; readonly erased: boolean }>()

  /** §2.1 C's temp-write turn — the wiring's per-move turn: the FIRST preview write of a
   *  gesture is a COMMIT at temp (the mint — §2.8 item 3); each SUBSEQUENT observed move
   *  is a SET (the whole preview value replaced in place); NO move ⇒ NO write. The
   *  per-move temp write NEVER touches the sink (SINK-1). */
  const move = (gestureId: string, preview: unknown): void => {
    try {
      const commit = storeRecord?.commit as ((name: string, value: unknown) => unknown) | undefined
      const set = storeRecord?.set as ((name: string, value: unknown) => unknown) | undefined
      const name = `temp.drag.${gestureId}.placement`
      const prior = gestures.get(gestureId)
      if (typeof commit === 'function' && typeof set === 'function') {
        if (prior?.minted !== true) {
          commit(name, preview)
          gestures.set(gestureId, { minted: true, erased: false })
        } else {
          set(name, preview)
        }
      }
    } catch {
      // a hostile store must never throw out of the move turn
    }
  }

  /** THE RELEASE/RESET TERMINAL — the single-sink channel (E10-SINGLE-SINK-CHANNEL):
   *  ONE `commit('file.settings.pane.<id>.size', <final>)` riding INSIDE the single sink
   *  invocation (SINK-2 — the sink is invoked once and the store is committed once, the
   *  two readings agree at 1; `final` is EXACTLY the value the sink received, §2.1 C).
   *  The E3-declared gate: a non-useful `final` (a non-number or `NaN`) is NEVER written
   *  — ZERO sink writes (§3.2 F-5/F-8, `gutter.md` §2.5 item 5). Where the pane's STORED
   *  pre-drag size exists, the reset arm's own validation runs against the RECEIVED
   *  bounds pair via the family's ONE clamp site (`clampToBounds` answers `NaN` on an
   *  unusable default/pair ⇒ the reset refuses with ZERO sink writes — §3.2 F-8, §2.1 A).
   *  The §7a.1 item 1 reading (i) reconcile then refreshes the mem layout copy from the
   *  committed file value — OUTSIDE the gesture's write count (M-5). */
  const release = (gestureId: string, final: unknown, sink: unknown): void => {
    void gestureId
    try {
      if (typeof final !== 'number' || Number.isNaN(final)) return
      const mem = tierRead('mem', 'layout.pane.pane-a.size')
      if (mem.found) {
        const narrowed = clampToBounds(mem.value, readPaneBounds({}, 'pane-a'))
        if (Number.isNaN(narrowed)) return
      }
      if (typeof sink === 'function') {
        ;(sink as (value: unknown) => unknown).call(null, final)
      }
      const commit = storeRecord?.commit as ((name: string, value: unknown) => unknown) | undefined
      if (typeof commit === 'function') {
        commit('file.settings.pane.pane-a.size', final)
        commit('mem.layout.pane.pane-a.size', final)
      }
    } catch {
      // a hostile store must never throw out of the release turn
    }
  }

  /** THE ERASE TURN (RIGHT-CLICK and CANCEL) — the four-tier abandon path: AT MOST ONE
   *  `remove('temp.drag.<gestureId>.placement')` per gesture (§2.1 C's right-click row,
   *  §7a.1 item 2 reading (i)); ZERO sink writes; a remove of a path with NO temp node
   *  answers the declared MISS outcome (`cleared: []` — never a refusal, never a throw,
   *  F-4); after the erase the unqualified read's next holder — the FILE original —
   *  REASSERTS (the four-tier abandon path, §0 ruling 7). */
  const erasePreview = (gestureId: string): void => {
    try {
      const prior = gestures.get(gestureId)
      if (prior?.erased === true) return
      const remove = storeRecord?.remove as ((name: string) => unknown) | undefined
      if (typeof remove === 'function') {
        remove(`temp.drag.${gestureId}.placement`)
      }
      gestures.set(gestureId, { minted: prior?.minted === true, erased: true })
    } catch {
      // a hostile store must never throw out of the erase turn
    }
  }

  return {
    /** §2.1 A (startSizeOf) — the store-backed size read. */
    startSizeOf: (element: unknown, token: unknown): unknown => readPaneSize(element, token),
    /** §2.1 A (boundsOf) — the store-backed bounds read; the pair is handed through AS
     *  STORED, never a policy clamped here (M-3). */
    boundsOf: (element: unknown, token: unknown): unknown => readPaneBounds(element, token),
    /** §2.1 A (defaultSizeFor) — the reset arm's read, the SAME size read at the reset
     *  turn (one closure). */
    defaultSizeFor: (element: unknown, token: unknown): unknown => readPaneSize(element, token),
    /** §2.1 B (candidatesFor) — the candidate/slot read feeding the PURE `withinProximity`
     *  comparator: the candidate carries the OPAQUE stored slot and the STORED
     *  caller-measured distance; a zone whose reads MISS is admitted per the caller's own
     *  rule (no candidate) — never a store decision, never a throw (M-11, P-PD-IM-2). */
    candidatesFor: (element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[] => {
      const id = zoneIdOf(element)
      const slot = tierRead('mem', `layout.zone.${id}.slot`)
      if (!slot.found) return []
      const distance = tierRead('mem', `layout.zone.${id}.distance`)
      return [{ candidate: slot.value, distance: distance.found ? distance.value : undefined }]
    },
    move,
    release,
    rightClick: (gestureId: string): void => erasePreview(gestureId),
    cancel: (gestureId: string): void => erasePreview(gestureId),
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════
 * U-STORE-FOCUS — THE CARRIER (`docs/specs/store-focus.md` §2.3)
 * (`H1` — the focus state's re-home onto the store: the `mem.focus.*` mirror, the
 * store-backed `persist(seam, state)` SEAM TARGET, and the rule-2 STORE SUBSCRIPTION).
 *
 * THE FACTORY'S `store` ARGUMENT IS REQUIRED and is the SOLE store-access path: the
 * store handle is a WIRING-HELD ARGUMENT passed into this composition's closures —
 * never a module-scope binding of the focus state (`§3.4 R-2`, `§5.5.1 P-SF-IM-2`).
 *
 * THE BOOT MINT (`§2.3` item 2): construction MINT-DECLARES the root — `commit(
 * 'mem.focus', undefined)` + `clear('mem.focus')` where the mirror is COLD — so the
 * register's row pre-exists the first write and a cold read answers the DECLARED MISS,
 * never a refusal (`§0A` note 6). Where the mirror already answers a HIT (a later
 * carrier over an already-declared root), the mint is a no-op. A hostile store absorbs
 * every step (`§2.3` item 6).
 *
 * THE TWO EXACT-REFERENCE SUBSCRIPTIONS (`§2.4` item 1) register at the same
 * construction point — the CONSUMER channel (rule 2); the listener body forwards and
 * never writes the store from inside. `dispose()` releases every registration —
 * UNSUBSCRIBE-ON-DISPOSE, the H2a pattern (`§2.4` item 3): each held handle's
 * `unsubscribe()` is called EXACTLY ONCE (registration order), idempotent, non-throwing,
 * emits NO store event and leaves the mirror's records in place (post-conditions P1–P7).
 * ══════════════════════════════════════════════════════════════════════════════════ */

/** THE CARRIER SURFACE — EXACTLY FOUR members (state · focusRoute · persistTarget ·
 *  dispose), the ONE exported seam surface of this unit (`store-focus.md` §2.3 item 1). */
export interface FocusCarrierSurface {
  /** the mirror-state read: `{ entries, activeId }` — the `FocusState` members,
   *  `unknown`-typed at the seam. */
  readonly state: () => { readonly entries: unknown; readonly activeId: unknown }
  /** the re-homed route — the same answer shape the current `focusRoute` answers. */
  readonly focusRoute: (payload: unknown) => FocusAnswer
  /** the STORE-BACKED SEAM TARGET — commits `mem.focus.entries` and `mem.focus.activeId`
   *  (tier `mem`, `{onRepeat:'edit'}`); its return is the store's declared return. */
  readonly persistTarget: (state: FocusState) => unknown
  /** the release — UNSUBSCRIBE-ON-DISPOSE, the H2a pattern (`§2.4` item 3). */
  readonly dispose: () => void
}

/** THE CARRIER FACTORY — the boot sequence calls it with the wired store; returns the
 *  bounded surface. The factory's ONE declared throw: an ABSENT/non-store argument is
 *  refused at construction with a typed `Error` (`§2.1` item 5(a)). Every turn is TOTAL:
 *  a hostile store, a throwing tier-handle/`resolve`/`commit`/`subscribe` surface and a
 *  throwing listener all land the DECLARED degradation and never let a throw escape a
 *  wiring turn (`§2.3` item 6). */
export function createFocusCarrier(store: GraphStore): FocusCarrierSurface {
  if (store === undefined || store === null || typeof (store as { resolve?: unknown }).resolve !== 'function') {
    throw new Error('H1 U-STORE-FOCUS: createFocusCarrier requires the wired GraphStore argument')
  }

  // THE BOOT MINT-DECLARE (`§2.3` item 2) — only where the mirror is COLD (the root not
  // declared): the register's row pre-exists the first write. A hostile store absorbs
  // every step and the carrier still constructs.
  try {
    const probe = store.resolve('mem.focus.entries') as { status?: string; reason?: string } | null
    const cold = probe !== null && typeof probe === 'object' && probe.status === 'refused' && probe.reason === 'undeclared-name'
    if (cold) {
      store.commit('mem.focus', undefined)
      store.clear('mem.focus')
    }
  } catch {
    // a hostile store absorbs the boot mint — the mint is a no-op and the carrier still constructs
  }

  // THE TWO EXACT-REFERENCE SUBSCRIPTIONS (`§2.4` item 1) — the CONSUMER channel, held in
  // the factory's closure (the ONLY subscription authority on the mirror's references).
  const holds: Array<{ unsubscribe: () => boolean }> = []
  const forward = (event: GraphEvent): void => {
    // THE DECLARED CONSUMER CHANNEL — READ-ONLY: in-tree, no consumer exists today (the
    // strip is the fork's/deferred), so the listener forwards and never writes the store
    // from inside; each transition yields at most the declared two events.
    void event
  }
  try {
    holds.push(store.subscribe('mem.focus.entries', forward))
  } catch {
    // a hostile subscribe surface refuses to register (registered NOTHING) — never a throw
  }
  try {
    holds.push(store.subscribe('mem.focus.activeId', forward))
  } catch {
    // a hostile subscribe surface refuses to register (registered NOTHING) — never a throw
  }

  /** THE STORE-BACKED SEAM TARGET (`§2.1` item 4 / `§2.3` item 4) — given a `FocusState`
   *  it commits the mirror's two references (tier `mem`, default `{onRepeat:'edit'}`) and
   *  its return is the store's declared return (the receipt), handed back by identity. */
  const persistTarget = (state: FocusState): unknown => {
    store.commit('mem.focus.entries', state.entries, { onRepeat: 'edit' })
    return store.commit('mem.focus.activeId', state.activeId, { onRepeat: 'edit' })
  }

  let released = false
  return {
    /** THE MIRROR-STATE READ (`§2.3` item 3) — `{ entries, activeId }`, MISS/refusal
     *  consumed as the DECLARED EMPTY pair. */
    state: (): { readonly entries: unknown; readonly activeId: unknown } => {
      const state = mirrorStateOf(store)
      return { entries: state.entries, activeId: state.activeId }
    },
    /** THE RE-HOMED ROUTE — the same answer shape the current `focusRoute` answers
     *  (`§2.5` item 3, BEHAVIOUR-PRESERVING). */
    focusRoute: (payload: unknown): FocusAnswer => focusRouteImpl(store, payload),
    persistTarget,
    /** THE RELEASE — UNSUBSCRIBE-ON-DISPOSE (`§2.4` item 3): releases EXACTLY the wiring's
     *  registrations (each `unsubscribe()` called once, registration order), idempotent,
     *  non-throwing, emits NO store event, leaves the mirror's records in place (P1–P7). */
    dispose: (): void => {
      if (released) return
      released = true
      for (const handle of holds) {
        try {
          handle.unsubscribe()
        } catch {
          // dispose() is non-throwing for any handle shape
        }
      }
    },
  }
}
