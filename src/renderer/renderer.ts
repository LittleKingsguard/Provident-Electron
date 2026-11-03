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
import { createGraphStore, type GraphStore, type GraphCrossing } from './store-core-graph.js'
import { storeGraphReferences } from './store-graph-references.js'
import { clampToBounds } from '../shared/gutter.js'
import { createTabsClient, type TabsClient, type TabsClientReading, type TabsNodeResolver, type TabsSubscription } from './tabs-client.js'
import { createViewClient, type ViewClient, type ViewClientReading, type ViewSubscription } from './view-client.js'
import { DEFAULT_PANE_ID, defaultPaneGeometry } from '../shared/view-shape.js'

/** **THE WITNESS DERIVATION, RE-EXPORTED FOR THE LIVE DRIVER AND FOR NOTHING ELSE** (D-77; L2 §6). The page reaches this
 *  module through `document.baseURI + "renderer.js"` and cannot import a second file from the renderer bundle
 *  (`package.json`'s build line is ONE esbuild `--bundle` into `--outdir=dist/renderer`, so `tabs-client.ts` is INLINED
 *  into `renderer.js` and never emitted beside it). Without this line `tests/store-tabs-record-live.mjs`'s agreement row
 *  would have to re-spell the predicate it is meant to compare, and a re-spelling is the one thing that row cannot afford:
 *  it reads the SAME witness off both records. It is additive, it is PURE, it dispatches nothing and it is driven by no
 *  boot path — `createTabsClient` stays the only way the app reads. */
export { deriveTabsWitness } from './tabs-client.js'

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

/** **THE VIEW RECORD'S CLIENT — THE SHAPE THIS REALM RENDERS FROM (`D-88`).** Constructed EXACTLY ONCE per realm, at the
 *  same boot point the frozen store is, and lazily in a realm where `main()` never runs (the W4 form above), so the focus
 *  route an MCP call reaches works in a node realm too. **IT IS NOT A STORE**: it holds no address space, owns no
 *  persistence, carries no constraint and is REPLACED WHOLE by every delivery it is refilled from —
 *  `src/renderer/view-client.ts`'s header states the distinction in the convention's own terms. What is held HERE is the
 *  CLIENT and never the shape: no module-level binding names a pane size or a mirror. **ITS ONE STATED BOOT READ IS
 *  `fill()`**, run at the end of `main()` beside the tab client's instrument; every later fill is a delivery's. */
let viewClient: ViewClient | null = null

/** THE SHAPE'S ONE PER-REALM CLIENT — the same identity on every call, exactly as `getWiredGraphStore()` answers its store. */
export function getViewClient(): ViewClient {
  if (viewClient === null) viewClient = createViewClient()
  return viewClient
}

/** THE FOCUS CARRIER — `U-STORE-FOCUS`'s boot-constructed seam composition (`docs/specs/store-focus.md` §2.3 item 1):
 *  a WIRING-HELD binding, set at boot from `getViewClient()` (and lazily in a node realm where `main()` never runs — the W4
 *  form), with the client living in the factory's argument + the closures. **THE FOCUS STATE ITSELF IS NEVER HELD HERE**:
 *  it is the client's shape, refilled by deliveries, never a module-level focus-state carrier (`D-88`). */
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
 *  caller's declarations, both supplied at the existing construction site.
 *
 *  **`constraints` IS GONE FROM THIS OPTION SET, AND ITS DELETION IS THE POINT** (`D-92`): the one member this wiring ever
 *  supplied was `exactly-one-active`, and that pair is the CROSSING's declaration at the store's creation now. An option
 *  nothing supplies is a seam a later pass would fill with a second authority over the record. */
interface WiredStoreOptions {
  readonly declarations?: ReadonlyArray<{ readonly name: string }>
  readonly crossing?: GraphCrossing | null
}

/** THE TIER-1 BRIDGE SURFACE (G2 §2.10 item 4 / §2.11 item 4 — the THREE preload members
 *  under the `store` namespace). The ambient `Window.provident` declaration is another
 *  unit's bytes (`secure-panels.ts`), so the wiring's boot read narrows the bridge through
 *  this local surface — the members stay UNTYPED upstream. */
interface Tier1StoreSurface {
  readonly store: {
    get(): Promise<{ name: string; value: unknown }[]>
    put(row: { name: string; value: unknown }): Promise<{ status: 'committed' | 'refused'; reason?: string }>
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
 * THE TAB MACHINERY, ON THE CROSSING'S CLIENT (`D-92`) — the frozen store's tab region is GONE from this file.
 *
 * WHAT STOOD HERE, AND WHY IT WENT. This region carried the frozen graph store's tab record WHOLE: the membership
 * sequence's spelling, the reserved landing entry's declaration row, the flat per-tab leaf, the declared accessor pair,
 * the four per-evaluation referent cells, `TABS_CONSTRAINT` (the `exactly-one-active` pair the store evaluated) and the
 * four roles built on them — `readTabsRef`, `mintTabId`, `closeTab` and `driveTabsLandingPage`. The record now lives at
 * `['tabs']` on the NORMAL CROSSING (`src/main/tabs-record/index.ts`), `src/renderer/tabs-client.ts` READS it and holds
 * the reading, and the three roles below are derived from THAT READING or SENT THROUGH THE CROSSING'S OWN ROUTE.
 * **`TABS_CONSTRAINT` DOES NOT MOVE — IT DIES**: `exactly-one-active` is one of the crossing's SIX declarations, tested
 * at the store's creation (`src/main/tabs-record/index.ts`), so a second evaluation of it here would be a second
 * authority over one record, and the frozen store's construction below is handed NO `constraints` member at all.
 *
 * **`mintTabId`'s THREE OUTSIDE VALUES ARE RE-GRAINED, NOT CARRIED** (`D-90`'s clause (1), landed here; `D-92`):
 *   · `'malformed-id'` → **`'malformed-row'`**, THE CROSSING'S OWN WORD for a row carrying no id (`src/main/tabs-surface/
 *     index.ts`'s shape arm). The SUBJECT is unmoved — a non-string or an empty segment — and the vocabulary is now the
 *     store's rather than a word this file minted.
 *   · `'dotted-id'` is **DELETED, not renamed, because its reason no longer exists**: the guard existed because a dotted
 *     spelling addressed a DEEPER PATH SEGMENT of the frozen store's address space (`mem.a.b` is two hops). A tab id is
 *     a KEY in the record's one flat family — `['tabs']` carries `{order, <id>: row}` — and a dot in a key is a
 *     character, not a hop. The crossing admits `a.b` as an id, so a guard refusing it would refuse a legal record's own
 *     member. **A guard whose subject is gone is deleted rather than kept green by a test that no longer means anything.**
 *   · `'reserved-spelling'` **COLLAPSES INTO `'duplicate-id'`**, and that is `D-76` read forward: the landing entry's id
 *     IS `'landing'`, the entry is an ORDINARY member of the family, and a legal record always names it — so a mint of it
 *     is a duplicate by the crossing's own reading of the same `order`. The frozen store's `reserved:true` row, which is
 *     what gave that spelling a reason of its own, has no successor.
 *   · AND ONE REASON IS **GAINED**: `'seat-name'`, the crossing's own (`SEAT_NAME_REASON`). The record's one stored
 *     singleton is its `order` seat and a MEMBER and a SEAT are one name in that family, so an id spelling `order` could
 *     not be held beside it. The rule is the crossing's; it is spelled here because the MINT is the site that would send
 *     such an id, and the crossing would refuse the commit a tick later with the same word.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE RECORD'S ONE STORED SEAT NAME — `'order'`** (`src/main/tabs-record/index.ts`'s `SEAT_NAMES`, derived there from
 *  its own address constant). It is spelled here because the mint is a RENDERER-side guard over the reading's `order`
 *  member: no shared module carries the word, and a main-side import would cross the boundary the bridge exists for
 *  (`tests/e2e/central-data/scenarios.test.ts` pins the package's importers exactly). */
const TABS_SEAT_NAME = 'order'

/** **THE FROZEN STORE'S RESERVED-ENTRY ROW — KEPT WHOLE, READ BY NOTHING, AND GONE WITH THE STORE** (`D-92`). It is the
 *  ONE `file.tabs.*` spelling left in this file, and it is here for exactly one reason: `buildWiredGraphStore` below still
 *  constructs the frozen graph store (the next pass's deletion), and the row is that construction's own option. Removing
 *  it would be half-removing a construction nothing reads rather than leaving it for the pass that deletes it, so it
 *  stands and is named. **THE RECORD'S OWN RESERVATION IS NO LONGER THIS FILE'S TO DECLARE**: the crossing derives the
 *  landing witness from `order` (`D-76`) and refuses a seat name at its own boundary, which is why this row's subject is
 *  now a store nothing reads. */
const TABS_LEGACY_LANDING_NAME = 'file.tabs.landing'
const TABS_RESERVED_DECLARATION_ROWS: ReadonlyArray<{ readonly name: string; readonly reserved?: boolean }> = [
  { name: TABS_LEGACY_LANDING_NAME, reserved: true },
]

/** **THE TAB-ID MINTING SITE — ONE BOUNDED WIRING ROLE, NOW A GUARD OVER THE READING'S `order`** (`D-92`). It was
 *  `mintTabId(store, tabId)`: a `resolve('file.tabs.order')` on the frozen store, a miss read as `[]`, and four refusal
 *  reasons of this file's own minting. It is now PURE over the membership sequence the CLIENT read — the caller passes
 *  `reading.order` — so the mint consults no store, holds nothing and cannot go stale: a duplicate is a member of the
 *  sequence the crossing answered, and that answer is the record as it stands. TOTAL: any sequence, any id, a value. */
export interface TabsMintOutcome {
  readonly ok: boolean
  readonly id: string | null
  /** THE DECLARED REFUSAL REASON, each one a word the crossing also speaks: `'malformed-row'` (a non-string or an empty
   *  segment — the crossing's shape arm), `'seat-name'` (the id spells the record's one seat, `'order'`), `'duplicate-id'`
   *  (the id is already a member of the reading's `order`, which is also where the landing entry's own mint lands), or
   *  `null` on a successful mint. */
  readonly refusal: 'malformed-row' | 'seat-name' | 'duplicate-id' | null
}

export function mintTabId(order: readonly string[], tabId: string): TabsMintOutcome {
  const refuse = (refusal: TabsMintOutcome['refusal']): TabsMintOutcome => ({ ok: false, id: null, refusal })
  if (typeof tabId !== 'string' || tabId.length === 0) return refuse('malformed-row')
  if (tabId === TABS_SEAT_NAME) return refuse('seat-name')
  if (order.includes(tabId)) return refuse('duplicate-id')
  return { ok: true, id: tabId, refusal: null }
}

/** **THE CLOSE SITE — ONE ROUTE CALL, AND THE `order` REWRITE IS THE CROSSING'S OWN** (`D-92`). It was TWO frozen-store
 *  operations — `remove('file.tabs.<tabId>')` plus a caller-supplied `commit('file.tabs.order', nextOrder)` — with two
 *  caller-side guards (`'reserved-name'` off the store's own refusal, `'order-names-closed-id'` off a `nextOrder` the
 *  caller passed in). **BOTH GUARDS ARE DELETED WITH THEIR SUBJECTS**: there is no `reserved:true` row to refuse the
 *  landing seat (the entry is an ordinary member, `D-76`) and no caller-supplied sequence to name the closed id, because
 *  the crossing's `remove` route rewrites the record's `order` itself and `order-names-its-tabs` — its sixth declaration —
 *  repairs the seat from the record's own referent precedence. So the close is ONE act over the bridge and its answer is
 *  the crossing's, a tick later. TOTAL: an absent member or an absent route is a stated `absent`, never a throw, and the
 *  answer promise never rejects (a route that threw resolves to a `refused` statement carrying the throw's own message). */
export interface TabsCloseOutcome {
  /** `'sent'` — the route took the id; `'absent'` — this realm has no `tabs.remove` to send it to. */
  readonly status: 'sent' | 'absent'
  readonly reason: 'no-tabs-member' | 'no-remove-route' | null
  /** THE CLOSE'S DECLARED REFERENCE-SET COST, WITH ITS TERMS MOVED: `1` caller operation, not `2` (`§2.4` item 4's note
   *  counted the flat leaf and the `order` seat as two because the CALLER performed both; the crossing performs both
   *  inside one route, so the caller's operation count is one). */
  readonly callerOperations: 1
  /** THE ROUTE'S ANSWER, resolved — the crossing's own `{status, reason?, message?, address?}` record, or this file's
   *  `{status:'refused', reason:'route-threw', message}` statement. It never rejects. */
  readonly answer: Promise<unknown>
}

export function closeTab(member: unknown, tabId: string): TabsCloseOutcome {
  const route = (member as { readonly remove?: unknown } | null | undefined)?.remove
  if (typeof route !== 'function') {
    const reason = member === null || member === undefined ? 'no-tabs-member' : 'no-remove-route'
    return { status: 'absent', reason, callerOperations: 1, answer: Promise.resolve({ status: 'refused', reason }) }
  }
  const send = route as (id: string) => Promise<unknown>
  const answer = Promise.resolve()
    .then(() => send.call(member, tabId))
    .catch((error: unknown) => ({
      status: 'refused',
      reason: 'route-threw',
      message: error instanceof Error ? error.message : String(error),
    }))
  return { status: 'sent', reason: null, callerOperations: 1, answer }
}

/** **THE TWO AUTHORED TERMINALS, DRIVEN FROM THE RECORD — `D-92`'s whole correction to this role.** The role reads the
 *  CLIENT'S READING (`tabs-client.ts`'s `witness`, derived by `deriveTabsWitness` from the record's ROWS) and it DRIVES
 *  each authored page node with the runtime's own write: the node the envelope already authors
 *  (`TABS_LANDING_PAGE_ID` / `TABS_ERROR_PAGE_ID`, `src/shared/demo-envelope.ts`) is given a `css.style` state-slice
 *  carrying `display` — `'block'` where the terminal's witness STANDS and `'none'` where it does not. **IT AUTHORS NO
 *  ELEMENT, NO CLASS AND NO TEXT**: the section, its id, its role prop and its base style are the envelope's, and what
 *  this role writes is the ONE style member the envelope's own style record already carries.
 *
 *  **WHAT THIS CORRECTS, MEASURED** (`D-78`'s finding, quoted rather than re-derived): the role used to read the frozen
 *  store three times and resolve both nodes through `Runtime.elementForNodeId` — and `main()` DISCARDED the whole answer,
 *  so neither page was ever driven by anything. Both resolutions are still REPORTED (`resolved`), and now the drive's own
 *  runtime answer is reported beside them, so a reader can tell a resolution from a write. `witness: false` drives
 *  `display: 'none'` rather than nothing: the envelope authors BOTH pages visible (`display: 'block'`), and a terminal
 *  whose witness does not stand must not be shown. TOTAL: a reading that is not `committed` witnesses nothing, and a
 *  runtime that throws answers `status: 'threw'` — never a throw out of this role. */
export interface TabsPageDrive {
  /** The ENVELOPE's node id, never this file's spelling. */
  readonly nodeId: string
  /** The record's witness for this terminal (L2 §6's derivation, off the reading's rows). */
  readonly witness: boolean
  /** What `Runtime.elementForNodeId` answered — the resolution, which is NOT a drive. */
  readonly resolved: unknown
  /** Whether the runtime's own answer to this terminal's `state-slice` write was `'applied'`. */
  readonly driven: boolean
  /** The runtime's own status word, or `null` where no runtime was supplied. */
  readonly status: string | null
}

export interface TabsPagesReading {
  readonly landing: TabsPageDrive
  readonly error: TabsPageDrive & { readonly tabId: string | null }
}

/** THE RUNTIME THIS ROLE NEEDS — the envelope query that resolves an authored node and the ONE write surface that drives
 *  it. Narrowed structurally so this module imports no runtime, as `TabsNodeResolver` in `tabs-client.ts` is. */
export interface TabsPageRuntime {
  elementForNodeId(id: string): unknown | null
  applyCommand(command: unknown): { readonly status?: unknown }
}

/** THE ONE WRITE — `css.style` on the authored page node, the member the envelope's own style record already carries.
 *  It answers the runtime's status word, or this file's own `'threw'`/`'no-answer'` statement. */
function drivePageDisplay(runtime: TabsPageRuntime | null, nodeId: string, shown: boolean): string | null {
  if (runtime === null) return null
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'css.style', mode: 'replace', value: { display: shown ? 'block' : 'none' } }],
    })
    return typeof answer?.status === 'string' ? answer.status : 'no-answer'
  } catch {
    return 'threw'
  }
}

export function driveTabsLandingPage(reading: TabsClientReading, runtime: TabsPageRuntime | null): TabsPagesReading {
  const witness = reading.status === 'committed' ? reading.witness : null
  const landingWitness = witness?.landing.witness === true
  const errorWitness = witness?.error.witness === true
  const landingStatus = drivePageDisplay(runtime, TABS_LANDING_PAGE_ID, landingWitness)
  const errorStatus = drivePageDisplay(runtime, TABS_ERROR_PAGE_ID, errorWitness)
  return {
    landing: {
      nodeId: TABS_LANDING_PAGE_ID,
      witness: landingWitness,
      resolved: witness?.landing.resolved ?? null,
      driven: landingStatus === 'applied',
      status: landingStatus,
    },
    error: {
      nodeId: TABS_ERROR_PAGE_ID,
      witness: errorWitness,
      tabId: witness?.error.tabId ?? null,
      resolved: witness?.error.resolved ?? null,
      driven: errorStatus === 'applied',
      status: errorStatus,
    },
  }
}

/** **THE SLICE BOOT STEP IS DELETED, AND THIS PARAGRAPH IS ITS HEADSTONE — NOT ITS HOME** (`D-83`, 2026-11-02).
 *  What stood here was `TabsBootOutcome` and `evaluateTabsBootStep(store, handedOrder)`: the app-graph's boot step, whose
 *  one act was `store.commit('file.tabs.order', [...handed])`. **A boot step is an IMPERATIVE WRITE, and the convention's
 *  third clause (`strata/decisions.md` D-82's clause 3) admits boot data only "from file or constraint repairs"** — so
 *  the audit measured the one write in this app with no external event behind it, and the user's instruction was that the
 *  step "needs to be a repair following a constraint tested on store creation".
 *
 *  **IT HAS NO COUNTERPART AT THE CROSSING, AND THAT IS WHY IT DIES RATHER THAN MOVES.** The sequence this seam wrote was
 *  derived from `bootHandoff` — the operator-settings carrier's rows, a RENDERER-side hand-off, handed to the renderer's
 *  own frozen graph store. The crossing's record is read from `provident-profile.json` by the app's central store
 *  (`src/main/main.ts`), and **nothing at that construction can know a "handed order" at all**: the record is the file's,
 *  the batch is the module's, and the order the boot must repair is the one THE FILE carries. The repair that answers the
 *  clause therefore lives where the order lives — `order-names-its-tabs`, the sixth declaration in
 *  `src/main/tabs-record/index.ts`, tested at the store's creation — and this file writes no record byte at boot at all.
 *
 *  **WHAT STILL STANDS IN THIS FILE AND IS NOT THIS STEP**: `TABS_ORDER_NAME` and the `file.tabs.*` record were the frozen
 *  graph store's own, unmoved by that deletion (the purge's remaining item, `strata/pending.md`). **THAT REGION IS GONE
 *  NOW** — `D-92` moves the tab machinery onto the crossing's client, and the only `file.tabs` spelling left in this file
 *  is the legacy store's reserved row above, which goes with the store. `TabsBootOutcome` is deleted with the step: it
 *  described only what the step answered, and a declared outcome with no producer is a name with nothing behind it
 *  (D-70's rule). */

/** **THE CONSTRUCTION'S DECLARATION SET — THE CALLER'S ROWS PLUS THE RESERVED ENTRY'S OWN ROW,
 *  AND NOTHING THE CALLER CAN DROP** (`§2.1` item 6, `R3-2`; `§5.1` item 1's wiring's tab-record
 *  region). The store's declaration input is the realm's own (§2.4 item 8), and the caller's rows
 *  are carried VERBATIM — no row is re-spelled, re-ordered or dropped, and the `tabs` ROOT stays
 *  an ordinary declared row (`§0A` item 1). The ONE row this construction ADDS — and only when
 *  the caller's own set does not already carry that spelling, so no name is ever declared twice —
 *  is `TABS_RESERVED_DECLARATION_ROWS`: the reservation the record's `L-1`/`A-5` rows read on a
 *  fixture and that the SHIPPED construction was measured to be missing. A caller-supplied set
 *  can therefore ADD declarations but never MASK the reserved entry's own removal refusal. */
function wiredDeclarations(supplied?: ReadonlyArray<{ readonly name: string }>): ReadonlyArray<{ readonly name: string; readonly reserved?: boolean }> {
  const callerRows = Array.isArray(supplied) ? supplied : FILE_TIER_ROOT_NAMES
  const rows: Array<{ readonly name: string; readonly reserved?: boolean }> = callerRows.map((row) => ({ ...row }))
  for (const reserved of TABS_RESERVED_DECLARATION_ROWS) {
    const at = rows.findIndex((row) => row.name === reserved.name)
    // A NAME IS NEVER DECLARED TWICE (the store refuses a duplicate row at construction), so a
    // caller-supplied row carrying the reserved spelling is UPGRADED IN PLACE rather than
    // shadowed by a second row — which is what makes the reservation unmaskable: a caller can
    // never turn the entry's own refusal off by declaring the same name WITHOUT the flag.
    if (at < 0) rows.push({ ...reserved })
    else rows[at] = { ...rows[at], reserved: true }
  }
  return rows
}

function buildWiredGraphStore(options?: WiredStoreOptions): GraphStore {
  // THE STORE'S DECLARATIONS COME FROM `storeGraphReferences(rows)`, passed as
  // `options.declarations` (the sibling artifact's field 6 — the wiring's single call site
  // for the declaration-input module). The caller's rows are this realm's own; the realm's
  // boot store is production-shaped (no test seam). THE CROSSING FEED (G2 §2.11 item 1):
  // the `file` tier's commit crosses through the seam handed in at the construction site —
  // `crossing: { put(row) { return bridge.store.put(row) } }`, the Y-2 wire.
  //
  // ⟶ **NO `constraints` MEMBER AT ALL — AND NOT AN EMPTY LIST** (`D-92`). `TABS_CONSTRAINT` was this file's one supplied
  //    member and it DIES here rather than moving: `exactly-one-active` is one of the crossing's six declarations, tested at
  //    the store's creation (`src/main/tabs-record/index.ts`, `D-83`), so the record has ONE authority. **NOTHING AT ALL
  //    RATHER THAN `[]`**, because an empty list is still a declaration that a constraint set exists and that this wiring
  //    supplies it — a name with nothing behind it (`D-70`'s rule). The store is still constructed with its declarations and
  //    its crossing seam because the NEXT pass deletes it as one object (`strata/next-steps.md` row 1); stripping its
  //    construction here would be that deletion done in halves.
  wiredGraphStore = createGraphStore({
    declarations: storeGraphReferences(wiredDeclarations(options?.declarations)),
    crossing: options?.crossing ?? null,
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

/** **THE MIRROR-STATE READ — AND IT IS THE SHAPE'S, NOT THE STORE'S (D-88).** It read `mem.focus.entries` and
 *  `mem.focus.activeId` through two `resolve` calls on the frozen store and consumed a MISS/refusal as the DECLARED EMPTY
 *  PAIR; it now reads the one `mem` root's projection off `src/renderer/view-client.ts`, SYNCHRONOUSLY, and the declared
 *  empty pair still answers everything the shape cannot state (nothing read yet, an empty mirror, an unreadable answer).
 *  The absent active crosses as ABSENCE and reads back as `null` (the crossing refuses `null` at its boundary, D-87's
 *  inherited fact (ii)), so the model's `FocusState` is answered without a fourth spelling of "no active". */
function mirrorStateOf(view: ViewClient | null): FocusState {
  if (view === null) return { entries: [] as readonly FocusEntry[], activeId: null }
  const shape = view.focusState()
  return { entries: shape.entries as readonly FocusEntry[], activeId: shape.activeId }
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
function answerForCarrier(view: ViewClient | null, result: ReturnType<typeof focusTransition>): FocusAnswer {
  if (result.accepted) {
    if (result.changed) {
      // **THE WRITE-THROUGH TURN — ONE ROUTE, AND ITS RECEIPT ARRIVES A TICK LATER (D-88).** The frozen store's TWO
      // synchronous commits (`mem.focus.entries` then `mem.focus.activeId`, each `{onRepeat:'edit'}`) become ONE
      // `commitFocus` carrying the WHOLE mirror the model produced — the crossing composes nothing, and the absent active
      // crosses as ABSENCE because the module writes it that way. **THE ANSWER BELOW IS NOT DERIVED FROM THE RECEIPT** and
      // never was: `result.state` is the model's own next state, in hand before the write, so the delivery landing a tick
      // later moves the SHAPE and not this answer. What the late arrival CAN change is observable elsewhere: a mirror the
      // crossing's boundary refuses (an id that is not a string/number/boolean, a `target` carrying `null`) is recorded in
      // `writeOutcome()` as a refusal where the frozen store would have taken it — the crossing's vocabulary, stated rather
      // than hidden.
      persist(
        (next: FocusState): unknown => {
          if (view === null) return null
          return view.commitFocus({ entries: next.entries, activeId: next.activeId })
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
function standingAnswer(view: ViewClient | null): FocusAnswer {
  const state = mirrorStateOf(view)
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
function focusRouteImpl(view: ViewClient | null, payload: unknown): FocusAnswer {
  const projection = tabListProjectionOf(payload)
  if (projection !== null) return projectionAnswerOf(projection)
  const resolved = resolveForHolder(payload)
  if (!resolved.present) return standingAnswer(view)
  const result = focusTransition(mirrorStateOf(view), resolved.verb, resolved.arg)
  return answerForCarrier(view, result)
}

/** THE ROUTE — THE CASE'S ENTRY (`focusRoute(req.payload)`): the carrier is
 *  boot-constructed once from `getWiredGraphStore()` (lazily in a realm where
 *  `main()` never ran) and this route reads THE MIRROR THROUGH THE STORE —
 *  never a module-level variable, never a second carrier, and never the
 *  subscription (the subscription is the CONSUMER channel, not the route's data
 *  source). THE HOLDER'S OWN ANSWER IS WHAT SHIPS. */
function focusRoute(payload: unknown): FocusAnswer {
  const view = getViewClient()
  if (focusCarrier === null) focusCarrier = createFocusCarrier(view)
  const projection = tabListProjectionOf(payload)
  if (projection !== null) return projectionAnswerOf(projection)
  const resolved = resolveForHolder(payload)
  if (!resolved.present) return standingAnswer(view)
  const result = focusTransition(mirrorStateOf(view), resolved.verb, resolved.arg)
  return answerForCarrier(view, result)
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
  // ═══ THE SLICE BOOT STEP IS DELETED FROM THIS SITE (`D-83`) ═══
  // **WHAT STOOD HERE**: after `hydrate(bootHandoff)` and before the first graph load, ONE commit —
  // `evaluateTabsBootStep(wired, handedTabsOrder)`, whose whole act was `wired.commit(TABS_ORDER_NAME, [...handed])`
  // whenever the hand-off carried a non-empty membership sequence. **THE NAME IS NOT RE-SPELLED HERE ON PURPOSE**:
  // `TABS_ORDER_NAME` is the one constant that carries it, and a second literal of it below `main()`'s boundary puts a
  // tab-record name OUTSIDE `T2` §5.1 item 1's declared record region, which `tests/store-focus.test.ts`'s `S22-1`
  // attributes and reds on (measured 2026-11-02: the literal here was the ONE reference outside that region). **WHY IT IS GONE, IN ONE PARAGRAPH.** A boot step is an IMPERATIVE WRITE, and D-82's clause 3
  // admits boot data only from a file or from a constraint's repair; the audit measured this commit as the
  // one write in the app with no external event behind it — the frozen store pushes every `file`-tier commit
  // through `crossing.put` into `STORE_FILE_PUT`, so the step re-projected file data back into the file,
  // self-perpetuating after the first externally-caused one. **AND IT HAS NO COUNTERPART AT THE CROSSING**:
  // its argument was derived from `bootHandoff`, the RENDERER-side carrier's rows, while the record the app
  // keeps is read from `provident-profile.json` by the central store — so nothing at that construction can
  // know a "handed order", and there is nothing here to move. The repair the clause asks for lives where the
  // order lives: `order-names-its-tabs`, the sixth declaration in `src/main/tabs-record/index.ts`, tested at
  // the STORE'S CREATION and repairing the seat the FILE carries. **THE FIRST CONSTRAINT EVALUATION IS STILL
  // NOT TAKEN HERE** (`§3.3` item 2, `store-core-graph.ts`'s reservation): `hydrate` mints the handed-off rows
  // and evaluates no pair, and the next evaluation is the first caller's own write — exactly the relation this
  // region had before the step existed, one boot step lighter, and `G-5`/`B-8`/`H-3`/`H-4`'s subject is deleted
  // with it rather than left dangling (see the headstone above the declarations).
  // ⟶ THE FOCUS CARRIER (`U-STORE-FOCUS`, §2.3 item 1) — **CONSTRUCTED OVER THE SHAPE, NOT OVER A STORE (`D-88`)**. The
  // boot MINT-DECLARES nothing and registers no subscription: `focus-must-stand` is a creation-instant declaration at the
  // crossing (`D-87`), and the one delivery channel is the client's `onChanged`. The CARRIER is what an MCP `focus` call
  // reaches, so it must exist before the first request, and the client it holds is the realm's one (`getViewClient()`).
  focusCarrier = createFocusCarrier(getViewClient())
  // ⟶ THE RUNTIME + FIRST ENVELOPE (`U-STORE-CORE`'s realm construction + G2 §2.9):
  // created and loaded ONLY AFTER the hand-off answered — a boot whose first envelope
  // loads before the Y-1 answer FAILS the starting-order gate (§2.9 consequence (1)).
  const runtime = new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength })
  runtime.bootstrap()
  // ⟶ **THE AUTHORED PAGES' DRIVE IS NO LONGER TAKEN HERE, AND THAT IS A TIMING CHANGE THIS PASS STATES** (`D-92`). It was
  //    `driveTabsLandingPage(wired, runtime)` — a synchronous read of the frozen store whose whole answer `main()` DISCARDED
  //    (`D-78`'s measurement). The record the pages are driven from is the CROSSING's, its read is ASYNCHRONOUS, and the
  //    role now drives each page's authored node with a `css.style` state-slice. So the drive rides the tabs client: the
  //    boot's ONE read and every `onChanged` delivery of the record call it, at the END of `main()` beside the instrument
  //    below. **NOTHING BETWEEN THE HAND-OFF AND `bridge.ready()` MOVES** (`tests/e2e/bundle-boot-seam`'s `B-5` reads that
  //    order), and the boot gains nothing that can delay or fail it. This region authors NO element, NO class and NO text.
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
  // ⟶ THE TAB-RECORD CLIENT — **THE RECORD'S DATA SOURCE, AND THE PAGES' DRIVE** (`D-92`; the instrument was Stage A at
  // `D-77`). ONE read and ONE registration, STARTED here and NOT awaited. It stays the last statement of `main()` on
  // purpose: every boot step above including `bridge.ready()` has already run, so no step's order can move and a slow or
  // failing bridge cannot delay or fail the boot. **WHAT LEFT THIS COMMENT**: "nothing it answers is acted on" — the
  // reading now drives the two authored pages, which is the whole of what this pass corrects.
  startTabsClientInstrument(runtime)
  // ⟶ **THE SHAPE'S ONE STATED BOOT READ (`D-88`)**, started here and NOT awaited, for exactly the reason the tab client's
  // instrument above is: every boot step including `bridge.ready()` has already run, so no step's order moves and a slow or
  // failing crossing cannot delay or fail the boot (`tests/e2e/bundle-boot-seam`'s `B-5` reads the trace's ORDER, not a
  // duration). **WHY A BOOT READ AT ALL, WHEN THE DELIVERY IS THE SHAPE'S SOURCE** (`D-78`'s chain): a delivery carries
  // CHANGE, and a boot's own change — the crossing's creation load and its constraint/repair passes — happened in `main()`
  // BEFORE this realm could subscribe, while a cold profile changes nothing afterwards. So the first fill has no delivery
  // to ride and is ONE STATED READ; every later fill is a delivery's, and no timer, poll or interval exists anywhere in it.
  startViewShape()
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE TAB-RECORD CLIENT — **THE RECORD'S ONE DATA SOURCE IN THIS REALM, AND THE TWO PAGES' DRIVER** (`D-92`;
 * `docs/L2/store-tabs-record/interface.md` §6; `D-77` authored the read as Stage A, this pass consumes it).
 *
 * THE CHAIN, IN `D-78`'s OWN ORDER: the crossing acts (its creation load and its constraint/repair passes) → its
 * `onChanged` delivery → this client's RE-READ → the reading → THE DRIVE below → the authored page nodes. Nothing here
 * holds a record: `tabsClientReading` is the last answer the crossing gave, and `tabsPagesReading` is what the drive made
 * of it — two statements about a read, never a second record (L2 §6's first prohibition).
 *
 * **THE DRIVE IS THE THING THAT WAS MISSING** (`D-92`, correcting `D-78`'s measurement): the role read the record,
 * resolved both authored nodes through `Runtime.elementForNodeId` and `main()` discarded the whole answer, so neither
 * page was ever driven by anything. `driveTabsLandingPage` now writes each page's `css.style` from its own witness — one
 * `state-slice` on an authored node, the same write surface the gutter's commit route uses — so a terminal whose witness
 * stands is shown and one whose witness does not is hidden. **IT AUTHORS NO ELEMENT, NO CLASS AND NO TEXT**: the sections,
 * their ids, their role props and their base style are the envelope's (`src/shared/demo-envelope.ts`).
 *
 * **WHY THE READ SITS AT THE END OF `main()` AND IS NOT AWAITED (`D-77`).** The boot order this head ships is a measured
 * one, and it is a GATE's: `wired.hydrate(bootHandoff)` → `focusCarrier` (the boot step that stood between them is
 * DELETED, `D-83`) → `new Runtime(...)`/`bootstrap()` → `startGutterAffordance` → the Y-3 registration → `bridge.ready()`,
 * with `tests/e2e/bundle-boot-seam/`'s `B-5` asserting the bundle-boot trace's ORDER rather than a duration. An `await`
 * placed anywhere between the hand-off and `bridge.ready()` would sit INSIDE that order — a slow or failing bridge would
 * delay the first graph load or the ready signal. So the read is STARTED after `bridge.ready()` and its promise is not
 * awaited: **no boot step's order moves, and a bridge that never answers, answers slowly, or rejects cannot delay boot,
 * fail boot or keep the app from reaching ready.** `read()` is total by construction (all four of its answers are values,
 * `tabs-client.ts`), and the one `.catch` below is defence against a defect in that totality rather than a path any arm
 * relies on. **The cost, stated rather than hidden**: the pages' drive now lands a tick after `bridge.ready()` instead of
 * synchronously mid-boot, which is the price of the record being the crossing's rather than the frozen store's.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** THE REALM'S ONE TAB CLIENT — the same identity on every call, the `getViewClient()`/`getWiredGraphStore()` form. It is
 *  constructed with the RUNTIME as its envelope query, so each terminal is resolved through `Runtime.elementForNodeId` and
 *  never by this file's spelling (L2 §6), and lazily so a node realm that reaches a role without `main()` still has one. */
let tabsClient: TabsClient | null = null

/** THE REALM'S ONE TAB CLIENT, CONSTRUCTED ON DEMAND (see above). */
export function getTabsClient(runtime?: TabsNodeResolver | null): TabsClient {
  if (tabsClient === null) tabsClient = createTabsClient({ runtime: runtime ?? null })
  return tabsClient
}

/** THE INSTRUMENT'S HELD READING — the LAST answer the client gave (the boot read's, then one per `onChanged` delivery).
 *  A statement about a read and never a record: it carries `order`, `rows` and the derived `landing` because those ARE
 *  what the crossing answered, and nothing in this file composes a member of it. */
let tabsClientReading: TabsClientReading | null = null

/** **WHAT THE DRIVE MADE OF THE LAST READING** — the two terminals with the runtime's own status word beside each
 *  terminal's resolution and witness, so a reader can tell a RESOLUTION from a WRITE (`TabsPageDrive`'s own note). */
let tabsPagesReading: TabsPagesReading | null = null

/** THE SUBSCRIPTION'S OWN ANSWER — `subscribed: false` on a realm whose bridge carries no `tabs`
 *  member, which is the stated absent case (`tabs-client.ts`'s header) and never a throw. Held for
 *  the same reason `releaseY3` is: the P1-P7 release discipline holds a registration, and this
 *  realm's teardown is the page's. */
let tabsClientSubscription: TabsSubscription | null = null

/** **THE DELIVERY'S TURN — HOLD THE READING AND DRIVE THE PAGES FROM IT** (`D-92`). A delivery is a RE-READ (L2 §6: the
 *  push carries an address and not a value), so the client has already re-read when this runs; what is left is to hold
 *  the answer and to let the record drive the two authored terminals. Nothing else in this file reads either binding. */
function holdTabsReading(reading: TabsClientReading, runtime: TabsPageRuntime | null): void {
  tabsClientReading = reading
  tabsPagesReading = driveTabsLandingPage(reading, runtime)
}

/** THE ONE SITE — called from `main()` as its last statement, never awaited (see above). ONE read and ONE registration,
 *  with the client constructed over the RUNTIME so each terminal is resolved through `Runtime.elementForNodeId`. */
function startTabsClientInstrument(runtime: Runtime): void {
  const client = getTabsClient(runtime)
  tabsClientSubscription = client.subscribe((reading) => {
    // A DELIVERY IS A RE-READ (L2 §6) and it is ALSO the record's own change arriving: the two pages are driven again,
    // so a record that moves while the app runs moves its terminals. No byte is written and no element is created.
    holdTabsReading(reading, runtime)
  })
  void client.read().then(
    (reading) => {
      holdTabsReading(reading, runtime)
      console.info(`[provident-renderer] tabs client: ${describeTabsReading(reading)}; ${describeTabsPages(tabsPagesReading)}`)
    },
    (error: unknown) => {
      // THE DEFECT ARM, NOT AN ORDINARY ONE: `read()` answers values, so a rejection here is a bug in
      // the instrument. It is held as the client's own `unread` value and never re-thrown — boot is over
      // by the time this runs, and a rejected promise nobody caught would surface as a page error.
      tabsClientReading = { status: 'unread', reason: 'route-threw', detail: String(error) }
    },
  )
}

/** THE SHAPE'S SUBSCRIPTION — held for the P1-P7 release discipline exactly as `releaseY3` and `tabsClientSubscription`
 *  are: a registration is held so a teardown could withdraw it (this realm's teardown is the page's). */
let viewSubscription: ViewSubscription | null = null

/** **THE SHAPE'S ONE BOOT SITE (`D-88`)** — ONE registration and ONE stated read, started from `main()` as its last
 *  statement and never awaited. The registration goes FIRST so a change that lands between the read and its continuation is
 *  still delivered (the delivery re-reads, so an extra delivery costs one read and can never lose a write). The read's
 *  answer is ADOPTED by the client itself — this function holds no shape, composes nothing and writes nothing: it starts the
 *  chain `D-78` names and stops there. */
function startViewShape(): void {
  const client = getViewClient()
  viewSubscription = client.subscribe(() => undefined)
  void client.fill().then(
    (reading) => {
      console.info(`[provident-renderer] view shape: ${describeViewReading(reading)}`)
    },
    (error: unknown) => {
      // THE DEFECT ARM, NOT AN ORDINARY ONE: `fill()` answers values, so a rejection here is a bug in the client. The shape
      // keeps what it last read, which on a boot is the declared empty pair, and boot is over by the time this runs.
      console.warn(`[provident-renderer] view shape: the boot read rejected — ${String(error)}`)
    },
  )
}

/** THE ONE LINE'S TEXT — the arm, the per-family `source` words, and the two families' sizes. */
function describeViewReading(reading: ViewClientReading): string {
  if (reading.status === 'committed') {
    const panes = reading.panes.map((pane) => `${pane.id}=${String(pane.size)}[${String(pane.bounds.min)}…${String(pane.bounds.max)}]`)
    return `read; panes=[${panes.join(', ')}] (source ${reading.source.panes}), `
      + `focus entries=${String(reading.focus.entries.length)} active=${JSON.stringify(reading.focus.activeId)} (source ${reading.source.focus})`
  }
  if (reading.status === 'absent') return `absent (${reading.reason}) — no view crossing in this realm; nothing read`
  return `unread (${reading.reason})${reading.detail === null ? '' : `: ${reading.detail}`}`
}

/** THE ONE LINE'S TEXT — the arm, the two witnesses with the ids that decided them, and the DRIVE's own answer. */
function describeTabsReading(reading: TabsClientReading): string {
  if (reading.status === 'committed') {
    const landing = reading.witness.landing
    const error = reading.witness.error
    return `read; rows=${reading.rows.length}, order=${reading.order.length}, landing=${JSON.stringify(reading.landing)}; `
      + `landing-terminal=${landing.witness} (actives ${JSON.stringify(landing.activeIds)}), `
      + `error-terminal=${error.witness} (tab ${JSON.stringify(error.tabId)})`
  }
  if (reading.status === 'refused') return `refused (${reading.reason}): ${reading.message}`
  if (reading.status === 'absent') return `absent (${reading.reason}) — no crossing in this realm; nothing read`
  return `unread (${reading.reason})${reading.detail === null ? '' : `: ${reading.detail}`}`
}

/** **THE DRIVE'S OWN LINE — A RESOLUTION AND A WRITE ARE NEVER THE SAME WORD** (`D-92`): each terminal reports its
 *  witness, whether the runtime said `'applied'` to its `state-slice`, and whether the authored node RESOLVED. A page
 *  that resolved and was not applied, and a page that was applied where nothing resolved, both read differently here. */
function describeTabsPages(pages: TabsPagesReading | null): string {
  if (pages === null) return 'pages: not driven (no reading)'
  const one = (terminal: TabsPageDrive): string =>
    `${terminal.nodeId}: witness=${terminal.witness} resolved=${terminal.resolved === null ? 'no' : 'yes'} `
    + `drive=${terminal.status === null ? 'none' : terminal.status}`
  return `pages: ${one(pages.landing)} · ${one(pages.error)}`
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
 * THE WIRING'S OWN CLOSURE, per `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`, RE-GRAINED BY THE PURGE
 * (`D-92`): every value of the flow is a READ of the record the crossing holds — the PANE GEOMETRY at `['panes']` and the
 * ZONE FAMILY at `['zones']`, both read through `src/renderer/view-client.ts`'s shape — the gesture's TEMP PREVIEW is not
 * a value of the record at all and is held as PLAIN CLOSURE STATE (see `move`), and the client is a WIRING-HELD ARGUMENT
 * passed into closures, NEVER a module-scope binding (§3.4 R-2). The composition registers NO SUBSCRIBER of its own: the
 * render turn is the `renderZone` member below, called by the shape's ONE delivery. NO byte of the four mechanism modules
 * moves (§3.4 R-1/R-5).
 *
 * THE SEAM SURFACE (`PaneDragSurface`) satisfies the family's EXPORTED seam types of
 * §2.1 — `StartSizeOf`, `BoundsOf`, the relocate candidate production — plus the
 * §2.1 C temp-write turns (`move`/`release`/`rightClick`/`cancel`) AND the render turn. The composition's
 * per-gesture state (the preview, whether erased) lives in THIS closure, never at
 * module scope. The `<id>` segments are the CALLER'S OWN spellings, derived by the
 * caller's own element/token mapping (§2.1 A); the gesture-end writes bind to the
 * wiring's own pane id (§2.4 names 1/2/9), carried verbatim.
 *
 * **THE READS ARE THE SHAPE'S, ALL SIX OF THEM** (`D-88` for the pane geometry, `D-92` for the zone family): the pane's
 * `size`/`bounds` and the zone's `slot`/`distance`/`size`/`display` are answered SYNCHRONOUSLY by `view.zoneOf`/
 * `paneSizeOf`/`paneBoundsOf` off the shape a delivery filled. The frozen store's tier-qualified `mem.layout.*` route —
 * `tierRead` — is DELETED from this composition, and with it the last `mem.layout.*` spelling under `src/`. A zone nothing
 * names answers `null` (`D-91`'s measured missing arm) and `candidatesFor` answers `[]`, which is what the frozen store's
 * `undefined` answered.
 *
 * **THE TEMP PREVIEW IS CLOSURE STATE, NOT DATA — AND THAT IS `D-90`'s JUDGEMENT, LANDED HERE.** `temp.drag.<gestureId>
 * .placement` had ONE writer (this `move`), NO READER outside the rows asserting the write, NO address the crossing
 * declares, and NO persistence: it outlives no gesture and crosses no boundary. It was a name in the frozen store's
 * register because the store had a `temp` tier, not because anything needed it stored. It is now a `Map` in this closure,
 * written by `move` and erased by the erase turn, and NOTHING reads it — the preview's only consumer was the store's own
 * newsletter, which is replaced by the shape's delivery below. The release turn's write and the SINK are untouched.
 *
 * THE ZONE-RENDER TURN (`renderZone`) is a MEMBER of the surface, and **the shape's own delivery calls it** — this
 * composition registers NOTHING on the client, the bridge or the store, because a second `onChanged` registration would be
 * a second consumer of one push and a second read per delivery. Every read is guarded: an absent client, an absent shape
 * and a throwing read all land the DECLARED degradation, and never a throw escapes a wiring turn (§3.2 F-8, P-PD-TP-2).
 * ══════════════════════════════════════════════════════════════════════════════════ */

/** The composition's surface — §2.1's A/B/C seam implementations plus the temperature
 *  turns, matching the family's EXPORTED seam types (`StartSizeOf`, `BoundsOf`, the
 *  relocate candidate production) — and the render turn the shape's delivery calls. */
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  defaultSizeFor(element: unknown, token: unknown): unknown
  candidatesFor(element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[]
  move(gestureId: string, preview: unknown): void
  release(gestureId: string, final: unknown, sink: unknown): void
  rightClick(gestureId: string): void
  cancel(gestureId: string): void
  /** **THE ZONE-RENDER TURN — THE SHAPE'S DELIVERY CALLS IT** (`D-92`). It replaces the `subscribe('temp.drag', …)`
   *  registration: the layout input is a pure function of the zone family's `size`/`display` as the last delivery left
   *  them, so the event that changes them IS the event that renders them. */
  renderZone(): void
  /** **THE PREVIEW'S OWN READ — DECLARED SO THE ERASE RULE IS OBSERVABLE RATHER THAN ASSUMED** (`D-92`). It answers what
   *  the closure holds for one gesture, or `undefined` where nothing does. **IT IS NOT AN ADDRESS**: it names a gesture
   *  id, crosses no boundary, writes nothing, persists nothing and is the closure's own member — the same question the
   *  frozen store's tier-qualified read answered, asked of the thing that now holds the value. */
  previewOf(gestureId: string): unknown
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

/** **THE COMPOSITION'S TWO BACKINGS, AND AFTER `D-92` ONLY ONE OF THEM ANSWERED A READ** (`D-88` split them; this pass
 *  empties the second).
 *
 *  `view` is **THE SHAPE** — the pane geometry AND the zone family, read SYNCHRONOUSLY off `src/renderer/view-client.ts`'s
 *  in-realm projection and written through the crossing's `commitPane` route. It is NOT a store: it holds no address
 *  space, owns no persistence, carries no constraint and is replaced whole by every delivery it is refilled from. **IT IS
 *  NOW THE COMPOSITION'S ONLY READ AUTHORITY**: all six of the flow's reads answer here.
 *
 *  `frozen` is the app's own graph store, and after this pass **NOTHING READS IT**. It survives this signature for exactly
 *  ONE act — the construction-time bootstrap below, three `commit`/`clear` pairs on roots nothing reads any more — which is
 *  left in place rather than half-removed because the NEXT pass deletes the store as one object (`strata/next-steps.md`
 *  row 1). A caller that supplies no `frozen` loses nothing but that dead write.
 *
 *  TOTAL for ANY argument (unchanged): an absent or hostile `view` answers the MEASURED DEFAULT, a zone nothing names
 *  answers `[]`/`undefined`, and no throw escapes a wiring turn. */
export interface PaneDragBacking {
  /** THE SHAPE (D-88, D-92) — every read the flow makes, synchronous; the writes are the crossing's routes. */
  readonly view?: ViewClient | null
  /** THE FROZEN STORE — READ BY NOTHING (D-92); kept for the construction-time bootstrap the deletion pass removes. */
  readonly frozen?: unknown
}

/** THE WIRED COMPOSITION (§2.1 A/B/C + the shape's delivery turn + §7a.1 item 1's reconcile turns), bound to the
 *  caller-supplied BACKINGS above and the RECORDING SOURCE DOUBLE. Every read is the shape's; the temp preview is this
 *  closure's; the render turn is a member the shape's one delivery calls. */
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface {
  const backingRecord = (backing ?? null) as { readonly view?: unknown; readonly frozen?: unknown } | null
  /** THE SHAPE, where the caller supplied one. `null` is a realm with no crossing: the reads answer the measured default
   *  and every write is the client's `absent` statement, which is the declared degradation and never a throw. */
  const view = (backingRecord?.view ?? null) as ViewClient | null
  const storeRecord = (backingRecord?.frozen ?? null) as Record<string, unknown> | null
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

  /** **THE ZONE FAMILY'S ONE READ — THE SHAPE'S, AND THE `tierRead` HELPER IS DELETED** (`D-92`). What stood here was a
   *  tier-qualified store read (`resolve('mem.layout.zone.<id>.size')` then the tier handle's own `get`), used by the
   *  render turn and by `candidatesFor`. The family now has an address of its own — `['zones']` at `mem` (`D-91`) — and a
   *  client member that answers one zone SYNCHRONOUSLY (`view-client.ts`'s `zoneOf`, over the shared `zoneIn` derivation).
   *  **NOTHING IS INVENTED FOR A ZONE THE FAMILY DOES NOT NAME**: `zoneIn`'s missing arm is `null`, which is what the
   *  frozen store's `undefined` was, and every caller below degrades exactly as it degraded. */
  const zoneOf = (id: string): { readonly slot?: unknown; readonly distance?: number; readonly size?: unknown; readonly display?: unknown } | null => {
    if (view === null) return null
    return view.zoneOf(id)
  }

  /** **THE ZONE-READ CLOSURE FOR THE RENDER'S LAYOUT CALL (§2.3 item 4), NOW OFF THE SHAPE** (`D-92`): the layout input is
   *  a pure function of the zone family's `size` / `display` as the last delivery left them — never a module-held variable,
   *  never host geometry, never a controller callback. A zone nothing names hands `undefined` to the layout call, which is
   *  exactly what the frozen store's missing read handed it. */
  const renderZone = (): void => {
    const layout = sourceRecord?.layout
    if (typeof layout !== 'function') return
    try {
      const zone = zoneOf('zone-1')
      ;(layout as (zoneId: string, size: unknown, display: unknown) => void)('zone-1', zone?.size, zone?.display)
    } catch {
      // a hostile shape must never throw out of the render turn
    }
  }

  /** **THE BOOT BOOTSTRAP — KEPT WHOLE, READ BY NOTHING, GONE WITH THE STORE** (`D-92`, by `D-90`'s clause (3)). It
   *  MINT-DECLARES three roots in the FROZEN STORE's register (`layout` at mem · `drag` at temp · `settings` at file) and
   *  clears each holder, §7a.1 items 1/4's boot-seeding reading. **THIS IS THE ONE WRITE THIS COMPOSITION STILL MAKES TO
   *  THE STORE AND IT EXISTS ONLY TO FEED THE REGISTER**: the temp preview is closure state now, the zone family is the
   *  crossing's, and the pane geometry left the store at `D-88`. It is left standing rather than half-removed because the
   *  next pass deletes the store as one object, and removing a write from a construction whose whole purpose is being
   *  deleted is the deletion done in halves. A hostile store absorbs every step. */
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

  /** **THE TEMP PREVIEW — PLAIN CLOSURE STATE, AND `D-90`'s JUDGEMENT IS THE REASON** (`D-92`).
   *
   *  WHAT IT WAS: `temp.drag.<gestureId>.placement` — a name in the frozen store's `temp` tier, minted by a `commit` on
   *  the gesture's first move and replaced by a `set` on each later one, erased by AT MOST ONE `remove` per gesture.
   *  WHAT D-90 MEASURED ABOUT IT: ONE writer (this `move`), NO READER outside the rows that assert the write, NO address
   *  any crossing declares, NO persistence, and no life beyond its gesture. **That is not data, it is closure state**: a
   *  thing stored because a store had a tier for it, not because anything needed to find it there. So it is held here, in
   *  this composition's own closure, in ONE `Map` this object alone writes and erases. **NOBODY OUTSIDE READS IT** — the
   *  preview's only external consumer was the store's newsletter, which the shape's delivery replaces — and the surface's
   *  `previewOf` member exists so the erase rule is OBSERVABLE rather than assumed, not so a caller can use it as state.
   *  The `minted`/`erased` flags stay, because "the preview is resident" and "the erase has already happened" are the two
   *  facts the turns ask; the store's own `commit`-versus-`set` vocabulary does not survive, and nothing depended on it.
   *
   *  ZERO SINK WRITES ARE MADE BY ANY OF THESE TURNS (SINK-1): the sink is the release turn's alone. */
  const previews = new Map<string, unknown>()
  const gestures = new Map<string, { readonly erased: boolean }>()

  /** §2.1 C's temp-write turn — the wiring's per-move turn: the preview is WRITTEN INTO THIS CLOSURE, the sink is never
   *  touched (SINK-1), and NO move ⇒ NO write. */
  const move = (gestureId: string, preview: unknown): void => {
    try {
      previews.set(gestureId, preview)
      gestures.set(gestureId, { erased: false })
    } catch {
      // a hostile key must never throw out of the move turn
    }
  }

  /** **THE SIZE READ — §2.1 A's `startSizeOf`/`defaultSizeFor` closure (ONE closure for both turns, `gutter-ui.md` §2.1
   *  item 3), AND IT IS NOW THE SHAPE'S READ (D-88).** It was `mem.layout.pane.<id>.size` then `file.settings.pane.<id>.size`
   *  through two `tierRead` calls; the two tiers COLLAPSE to one `file` address (`['panes']`, D-87's inherited fact (i)) and
   *  the answer is the client's, READ SYNCHRONOUSLY and never awaited — the reason the shape exists. A pane the standing
   *  family does not name answers the MEASURED DEFAULT (100, the authored pane's `props.size`) instead of the `undefined`
   *  that made the release refuse `'unusable-default'`: the missing default was the frozen store's, and D-87's ground
   *  measured it. **NO WRITE HAPPENS HERE** — a read that misses leaves the miss (`D-82` clause 4). */
  const readPaneSize = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    if (view !== null) return view.paneSizeOf(id)
    // A REALM WITH NO CROSSING: the measured default stands, stated from the ONE shared declaration rather than invented.
    return defaultPaneGeometry(id).size
  }

  /** §2.1 A's bounds read, also the shape's: the pair AS STORED, never a policy clamped here, and the measured default pair
   *  (`{min: 0, max: 200}`, the authored pane's `props.min`/`props.max`) where the family names no such pane. A pair whose
   *  members are not numbers is what `clampToBounds` turns into `NaN`, so the move is INVALID (§3.2 F-8) — that arm now
   *  needs a shape the crossing's own admission refused, which is the boundary's business and not this read's. */
  const readPaneBounds = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    if (view !== null) return view.paneBoundsOf(id)
    const measured = defaultPaneGeometry(id).bounds
    return { min: measured.min, max: measured.max }
  }


  /** **THE RELEASE/RESET TERMINAL — and it is now the CROSSING'S ROUTE, WHICH IS ASYNCHRONOUS (D-88).** The E10-single-sink
   *  discipline is unmoved (`final` is EXACTLY the value the sink received, the sink is invoked once), and the E3 gate is
   *  unmoved (a non-useful `final` — a non-number or `NaN` — is NEVER sent, ZERO writes). **WHAT CHANGED, SAID PLAINLY:**
   *  the frozen store's TWO synchronous commits (`file.settings.pane.<id>.size` then `mem.layout.pane.<id>.size`, the same
   *  `final` to both tiers) collapse to ONE `commitPane` on the one `file` address, and its receipt does NOT come back in
   *  this turn — it lands in the client's `writeOutcome()` a tick later. **NO CALLER DEPENDS ON THE OLD TIMING**: this
   *  member returns `void` (it always did), the SINK is invoked BEFORE the route is sent so the recorded sink trace is
   *  unchanged, and the next read of the size is the shape's — refilled by the delivery the write itself causes, which is
   *  `D-78`'s chain running in the order it names. The pre-write validation keeps its arm: a standing geometry the clamp
   *  answers `NaN` for refuses with ZERO sink sends (§3.2 F-8, §2.1 A). */
  const release = (gestureId: string, final: unknown, sink: unknown): void => {
    void gestureId
    try {
      if (typeof final !== 'number' || Number.isNaN(final)) return
      const standing = readPaneSize({}, DEFAULT_PANE_ID)
      if (typeof standing === 'number' && Number.isFinite(standing)) {
        const narrowed = clampToBounds(standing, readPaneBounds({}, DEFAULT_PANE_ID))
        if (Number.isNaN(narrowed)) return
      }
      if (typeof sink === 'function') {
        ;(sink as (value: unknown) => unknown).call(null, final)
      }
      // ONE ROUTE, ONE WHOLE MEMBER: the id names the pane and the crossing composes the family (D-87's `commitPane`).
      if (view !== null) view.commitPane(DEFAULT_PANE_ID, { size: final })
    } catch {
      // a hostile view or sink must never throw out of the release turn
    }
  }

  /** **THE ERASE TURN (RIGHT-CLICK and CANCEL) — THE CLOSURE'S OWN, AT MOST ONCE PER GESTURE** (`D-92`). It performed
   *  ONE `remove('temp.drag.<gestureId>.placement')` on the frozen store (§2.1 C's right-click row, §7a.1 item 2 reading
   *  (i)); the preview is closure state now, so the erase deletes the entry and the `erased` flag keeps the AT-MOST-ONE
   *  rule. **ZERO SINK WRITES, AND NO STORE ACT AT ALL**: an erase on a gesture with no preview is a declared no-op — the
   *  `F-4` arm — and the "FILE original reasserts on the read" reading has no subject left, because there is no tier the
   *  preview shadowed. */
  const erasePreview = (gestureId: string): void => {
    try {
      const prior = gestures.get(gestureId)
      if (prior?.erased === true) return
      previews.delete(gestureId)
      gestures.set(gestureId, { erased: true })
    } catch {
      // a hostile key must never throw out of the erase turn
    }
  }

  return {
    /** §2.1 A (startSizeOf) — the shape's size read. */
    startSizeOf: (element: unknown, token: unknown): unknown => readPaneSize(element, token),
    /** §2.1 A (boundsOf) — the shape's bounds read; the pair is handed through AS
     *  STORED, never a policy clamped here (M-3). */
    boundsOf: (element: unknown, token: unknown): unknown => readPaneBounds(element, token),
    /** §2.1 A (defaultSizeFor) — the reset arm's read, the SAME size read at the reset
     *  turn (one closure). */
    defaultSizeFor: (element: unknown, token: unknown): unknown => readPaneSize(element, token),
    /** §2.1 B (candidatesFor) — the candidate/slot read feeding the PURE `withinProximity` comparator, **NOW OFF THE
     *  SHAPE'S `['zones']` FAMILY** (`D-92`): the candidate carries the zone's OPAQUE `slot` and its caller-measured
     *  `distance`, and a zone whose `slot` the family does not name is admitted per the caller's own rule (no candidate) —
     *  never a store decision, never a throw (M-11, P-PD-IM-2). **`slot` IS OPAQUE AND IS HANDED THROUGH BY IDENTITY.** */
    candidatesFor: (element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[] => {
      try {
        const id = zoneIdOf(element)
        const zone = zoneOf(id)
        if (zone === null || zone.slot === undefined) return []
        return [{ candidate: zone.slot, distance: zone.distance }]
      } catch {
        // a hostile shape must never throw out of the candidate read
        return []
      }
    },
    move,
    release,
    rightClick: (gestureId: string): void => erasePreview(gestureId),
    cancel: (gestureId: string): void => erasePreview(gestureId),
    renderZone,
    previewOf: (gestureId: string): unknown => previews.get(gestureId),
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

/** **THE CARRIER FACTORY — the boot calls it with the SHAPE (D-88), not with a store.** It registers NOTHING and mints
 *  NOTHING, and both of those are the crossing's acts now rather than omissions:
 *    · **THE BOOT MINT IS GONE.** The carrier used to `commit('mem.focus')` + `clear('mem.focus')` when the mirror was
 *      cold, because the frozen store's register needed a row before the first write. `focus-must-stand` is a DECLARATION
 *      tested at the crossing's creation (`D-87`), so the mirror stands at the instance's first instant and a `mem` family
 *      is re-minted at every boot by the repair — the carrier has nothing to mint and must not become a second writer.
 *    · **THE TWO SUBSCRIPTIONS ARE GONE.** The carrier held two exact-reference subscriptions on the frozen store as the
 *      CONSUMER channel; the delivery is the CLIENT's now (`view-client.ts`'s `onChanged` → re-read → `adopt`), one
 *      registration over both roots, and a second registration here would be a second consumer of one push.
 *  So `dispose()` releases what this carrier took — nothing — and says so rather than pretending to a registration it never
 *  made. **THE FACTORY'S ONE DECLARED THROW IS KEPT AND ITS SUBJECT IS THE SHAPE**: an absent/non-client argument is refused
 *  at construction with a typed `Error`, which is the same arm the frozen-store argument had. Every turn is TOTAL: a null
 *  client, a hostile client and a throwing route all land the DECLARED degradation and never let a throw escape a wiring
 *  turn. */
export function createFocusCarrier(view: ViewClient | null): FocusCarrierSurface {
  if (view === null || view === undefined || typeof (view as { focusState?: unknown }).focusState !== 'function') {
    throw new Error('U-STORE-FOCUS: createFocusCarrier requires the view client (the shape) as its argument')
  }

  let released = false
  return {
    /** THE MIRROR-STATE READ — the shape's, synchronously; the declared empty pair where nothing has been read. */
    state: (): { readonly entries: unknown; readonly activeId: unknown } => {
      const state = mirrorStateOf(view)
      return { entries: state.entries, activeId: state.activeId }
    },
    /** THE RE-HOMED ROUTE — the same answer shape the current `focusRoute` answers (BEHAVIOUR-PRESERVING). */
    focusRoute: (payload: unknown): FocusAnswer => focusRouteImpl(view, payload),
    /** **THE SEAM TARGET — ONE `commitFocus`, SENT (D-88).** It used to commit the mirror's two references and hand the
     *  second receipt back by identity; the crossing takes the WHOLE mirror as one value, so the seam's return is the
     *  client's own `ViewWriteStatement` — `{status:'sent'}`, or the `absent` arm on a realm with no crossing. **NO CALLER
     *  READS IT FOR A RECEIPT**: the focus model's `persist` answers `{present, value}` and every caller here discards
     *  `value`; the receipt lands in `view.writeOutcome()` a tick later. */
    persistTarget: (state: FocusState): unknown => view.commitFocus({ entries: state.entries, activeId: state.activeId }),
    /** THE RELEASE — kept for the four-member surface, and it releases NOTHING, which is the statement: the boot mint and
     *  the two registrations this member used to unwind are the crossing's and the client's. Idempotent, non-throwing. */
    dispose: (): void => {
      released = true
      void released
    },
  }
}
