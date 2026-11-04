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
import { clampToBounds } from '../shared/gutter.js'
import { createTabsClient, type TabsClient, type TabsClientReading, type TabsNodeResolver, type TabsSubscription } from './tabs-client.js'
import { createViewClient, type ViewClient, type ViewClientReading, type ViewSubscription } from './view-client.js'
import { createModuleClient, type ModuleClient, type ModuleClientReading, type ModuleSubscription } from './module-client.js'
import { createSecurityClient, type SecurityClient, type SecurityClientReading, type SecuritySubscription } from './security-client.js'
import { DEFAULT_PANE_ID, defaultPaneGeometry, type ViewThemeRecord } from '../shared/view-shape.js'
/** **THE APPEARANCE MECHANISM IS NO LONGER IMPORTED HERE, AND THAT IS THE INSTRUCTION THIS HEAD CARRIES** (`D-97`: *"No boot
 *  time declarations — use constraint repairs"*). `D-96` wired `resolveTheme`/`applyThemeDeclaration` into `startThemeDeclaration`
 *  in THIS file and drove it from the boot's change push, which is exactly the shape `D-96` had to bolt a `changed` guard on
 *  to keep `npm run divergence` green. **The resolution is now PRODUCED BY A CONSTRAINT REPAIR at the crossing**
 *  (`theme-must-stand`, `src/main/view-record/index.ts`) and STORED on the view record beside the pane geometry, the mirror
 *  and the zone family; this file READS that record over the bridge and APPLIES `props.<name>` from it. So the mechanism has
 *  one in-tree consumer, it is `src/main/`'s, and the renderer computes no declaration at all — it cannot, because
 *  `resolveTheme` and `applyThemeDeclaration` are not in scope here.
 *
 *  **WHAT THIS FILE STILL HOLDS, AND WHY IT IS NOT A DECLARATION**: `themeWiringRole` (below) derives the AUTHORED state
 *  node's id from the envelope and carries the CALLER-SUPPLIED attribute name — `docs/specs/theme-control.md` `§2.1` item 4
 *  and `§2.4` item 2 hold that name to the consuming wiring and to no other site. The name is now handed to the route
 *  (`commitTheme(token, attributeName)`) and echoed back by the mechanism inside the record's declaration; the node id is
 *  where the record's declaration lands. */

/** **THE WITNESS DERIVATION IS NOT RE-EXPORTED HERE, AND THE RE-EXPORT LEFT WITH THE DRIVER THAT JUSTIFIED IT** (`D-99`).
 *  This module carried `export { deriveTabsWitness } from './tabs-client.js'` under a docblock whose whole justification was
 *  `tests/store-tabs-record-live.mjs`'s agreement row — and that driver was retired whole at `D-93`, imports nothing, and
 *  exits `2` claiming no reading. A census over `src/` and `tests/` finds ZERO consumers of the name off THIS path: the one
 *  test that exercises it, `tests/integration/store-tabs-record/tabs-client.test.ts`, imports it from `tabs-client.ts`
 *  directly, which is where it is defined and where `createTabsClient` still derives the reading. A re-export with no
 *  importer is a surface a reader has to disprove, so both the export and its justification are deleted rather than
 *  re-pointed — and `src/main/view-record/index.ts` re-exports no such name, so nothing else carries it. */

/** **THE FROZEN GRAPH STORE IS DELETED, AND THIS PARAGRAPH STANDS WHERE ITS BINDING STOOD** (`D-93`, the purge's last
 *  deletion; `D-78`'s ruling, `D-92`'s UNUSED head, `D-90`'s enumeration). What this module held here was
 *  `wiredGraphStore` — `U-STORE-CORE`'s single per-realm binding, constructed once at boot by `buildWiredGraphStore` and
 *  answered on every call by `getWiredGraphStore`, with `FILE_TIER_ROOT_NAMES`, `WiredStoreOptions`, `Tier1StoreSurface`,
 *  `bootHandoff`, `wiredDeclarations`, the `crossing: {put}` seam, the `hydrate(bootHandoff)` call, the Y-1 hand-off read
 *  and the Y-3 registration feeding it. **After `D-92` nothing read any of it**: the tab machinery is `tabs-client.ts`'s,
 *  the pane geometry and the zone family are the view record's, the preview is this composition's closure, and the
 *  construction was the one act left — writing rows to a store whose every read had a successor. **THERE IS NO SECOND
 *  AUTHORITY TO LEAVE BEHIND**: a construction with no reader is a store-like thing standing against `D-78`'s own number,
 *  so it goes whole rather than half-emptied. The realm's two store-like things — the normal crossing and the secure
 *  crossing — are `src/main/`'s and are reached only over the bridge. */

/** **THE VIEW RECORD'S CLIENT — THE SHAPE THIS REALM RENDERS FROM (`D-88`).** Constructed EXACTLY ONCE per realm, at the
 *  same boot point the deleted frozen store's was, and lazily in a realm where `main()` never runs (the W4 form), so the focus
 *  route an MCP call reaches works in a node realm too. **IT IS NOT A STORE**: it holds no address space, owns no
 *  persistence, carries no constraint and is REPLACED WHOLE by every delivery it is refilled from —
 *  `src/renderer/view-client.ts`'s header states the distinction in the convention's own terms. What is held HERE is the
 *  CLIENT and never the shape: no module-level binding names a pane size or a mirror. **ITS ONE STATED BOOT READ IS
 *  `fill()`**, run at the end of `main()` beside the tab client's instrument; every later fill is a delivery's. */
let viewClient: ViewClient | null = null

/** THE SHAPE'S ONE PER-REALM CLIENT — the same identity on every call, the `getTabsClient()` form.
 *  It is the ONLY per-realm binding this file holds over a crossing's data: after `D-93` there is no store
 *  binding beside it, and no lazy construction of any store-like thing anywhere in the renderer. */
export function getViewClient(): ViewClient {
  if (viewClient === null) viewClient = createViewClient()
  return viewClient
}

/** **THE APP-STATE ROWS' CLIENT — THE SHAPE THIS REALM RENDERS THE MODULE REGISTRY FROM** (`D-104`; `D-82`'s `V3`).
 *  Constructed EXACTLY ONCE per realm, at the same lazy-on-demand point as `getViewClient()` and `getTabsClient()`, so a
 *  node realm that reaches a role without `main()` still has one. **IT IS NOT A STORE**: it holds no address space, owns no
 *  persistence, carries no constraint, takes no write route, and is REPLACED WHOLE by every delivery it is refilled from —
 *  `src/renderer/module-client.ts`'s header states the discipline in the same terms the other two clients do. What is held
 *  HERE is the CLIENT and never the shape: no module-level binding names a module row.
 *  **AND IT REMOVES A PULL RATHER THAN ADDING A LISTEN BESIDE ONE**: `SecurePanels.refresh()` used to read
 *  `window.provident.module.get()` at request time — on every boot, every authored click and every `dispatch()` seam — and
 *  that read is GONE. The rows reach the pane from THIS client's shape, adopted from a read taken INSIDE its listener. */
let moduleClient: ModuleClient | null = null

/** THE APP-STATE SHAPE'S ONE PER-REALM CLIENT — the same identity on every call, the `getViewClient()` form. */
export function getModuleClient(): ModuleClient {
  if (moduleClient === null) moduleClient = createModuleClient()
  return moduleClient
}

/** **THE SECURITY RECORD'S CLIENT — THE SHAPE THE PANE PAINTS FROM** (`D-106`; `D-104`'s rule read as the architecture:
 *  *"the renderer does not ask state, it listens. If it needs to ask, it does so within a listener."*). Constructed EXACTLY
 *  ONCE per realm, at the same lazy-on-demand point as the three clients above, so a node realm that reaches a role without
 *  `main()` still has one. **IT IS NOT A STORE**: no address space, no persistence, no constraint, no write route, and the
 *  shape is REPLACED WHOLE by every delivery it is refilled from — `src/renderer/security-client.ts`'s header states the
 *  discipline in the same terms the other clients do. What is held HERE is the CLIENT and never the shape.
 *  **AND IT REMOVES A PULL RATHER THAN ADDING A LISTEN BESIDE ONE**: `SecurePanels.refresh()` read
 *  `window.provident.security.get()` at request time — at the boot, after EVERY authored click and at the `dispatch()`
 *  seam — and that read is GONE. The record reaches the pane from THIS client's shape, adopted from a read taken INSIDE its
 *  listener, exactly as the app-state rows do. */
let securityClient: SecurityClient | null = null

/** THE SECURITY SHAPE'S ONE PER-REALM CLIENT — the same identity on every call, the `getModuleClient()` form. */
export function getSecurityClient(): SecurityClient {
  if (securityClient === null) securityClient = createSecurityClient()
  return securityClient
}

/** THE FOCUS CARRIER — `U-STORE-FOCUS`'s boot-constructed seam composition (`docs/specs/store-focus.md` §2.3 item 1):
 *  a WIRING-HELD binding, set at boot from `getViewClient()` (and lazily in a node realm where `main()` never runs — the W4
 *  form), with the client living in the factory's argument + the closures. **THE FOCUS STATE ITSELF IS NEVER HELD HERE**:
 *  it is the client's shape, refilled by deliveries, never a module-level focus-state carrier (`D-88`). */
let focusCarrier: FocusCarrierSurface | null = null

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
 * authority over one record — which is why `D-92` handed the frozen store's construction no `constraints` member, and why
 * `D-93` deletes that construction whole (see the headstone below).
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
 *  NOW** — `D-92` moved the tab machinery onto the crossing's client, and **`D-93` leaves NOT ONE `file.tabs` SPELLING IN THIS
 *  FILE**: the legacy store's reserved row went with the store it was an option of. `TabsBootOutcome` is deleted with the
 *  step: it described only what the step answered, and a declared outcome with no producer is a name with nothing behind it
 *  (D-70's rule). */

/* ═════════════════════════════════════════════════════════════════════════════════════════
 * THE CONSTRUCTION IS DELETED — THIS IS ITS HEADSTONE, NOT ITS HOME (`D-93`; `D-78`'s purge, `D-92`'s UNUSED head,
 * `D-90`'s enumeration of every surface it still provided).
 *
 * WHAT STOOD HERE, IN THREE PARTS, AND WHERE EACH SUBJECT WENT.
 *   · `wiredDeclarations(supplied)` — the store's construction-time declaration set: `FILE_TIER_ROOT_NAMES` (the six
 *     `file` roots `window` · `tabs` · `layout` · `settings` · `tracked` · `modules`) plus `TABS_RESERVED_DECLARATION_ROWS`,
 *     the `file.tabs.landing` reservation row whose `reserved: true` flag made the landing entry's removal a refusal.
 *     **THE RESERVATION HAS NO SUCCESSOR AND NEEDS NONE**: after `D-76` the landing entry is an ORDINARY member of the
 *     record's one family, the crossing derives the landing witness from `order`, and it refuses a seat name at its OWN
 *     boundary (`src/main/tabs-record/index.ts`'s `SEAT_NAMES`). The six roots were the frozen store's file tier's
 *     admissible names; the projection that persisted them (`STORE_FILE_PUT`) is deleted with this pass, so no name has
 *     an address here any more.
 *   · `buildWiredGraphStore(options)` — the ONE construction per realm: `createGraphStore` over
 *     `storeGraphReferences(wiredDeclarations(...))` with the `crossing: {put(row){ return bridge.store.put(row) }}` seam
 *     (the Y-2 wire) and, before `D-92`, `TABS_CONSTRAINT`; `D-92` handed it no `constraints` member at all.
 *   · `getWiredGraphStore(options)` — the module-external window: one lazy construction, the same identity on every call,
 *     which the node suite drove as the end-point seam (W4).
 *
 * **WHY NOTHING IS KEPT.** Every read of the thing these three built had a successor by `D-92` — the tab machinery on
 * `tabs-client.ts`, the pane geometry and the zone family on the view record's shape, the preview as this composition's
 * closure — and the Y-1 hand-off, the hydration, the crossing seam and the Y-3 registration existed ONLY to feed it. What
 * was left was a construction writing rows no read answers, which is exactly what `D-78` rules out by its own number. A
 * store-like thing kept "for the test seam" would be a third one standing, and a deletion done in halves.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

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
 *  boot-constructed once from `getViewClient()` (lazily in a realm where
 *  `main()` never ran) and this route reads THE MIRROR THROUGH THE SHAPE —
 *  never a module-level variable, never a second carrier, and never the
 *  subscription (the subscription is the CONSUMER channel, not the route's data
 *  source). THE HOLDER'S OWN ANSWER IS WHAT SHIPS. (`D-88` moved the mirror off
 *  the frozen store; `D-93` deletes the store, so there is no third source.) */
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
  // **NO LOCAL BRIDGE SURFACE ANY MORE** (`D-93`): the `Tier1StoreSurface` narrowing existed because the ambient
  // `Window.provident` declaration (`secure-panels.ts`, another unit's bytes) never carried the `store` namespace. That
  // namespace is deleted from the preload with this pass, so the declaration is now complete and the cast is the plain one.
  const bridge = window.provident as unknown as typeof window.provident | undefined
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
  // ═════════════════════════════════════════════════════════════════════════════════════════
  // ⟶ THE Y-1 HAND-OFF, THE STORE CONSTRUCTION AND THE TIER-1 HYDRATION ARE DELETED FROM THIS SITE (`D-93`).
  //
  // **WHAT STOOD HERE, IN THREE STEPS OF ONE CHAIN.** *(1)* the Y-1 hand-off: `bridge.store.get()` read ONCE, before the
  // store was constructed and before the first envelope loaded, into a `handedOff` array — a cold tier answered `[]` and
  // the realm booted on it. *(2)* `getWiredGraphStore({declarations: FILE_TIER_ROOT_NAMES, crossing: {put(row){…}}})` — the
  // ONE frozen-store construction per realm, the `file` tier's commits crossing into `STORE_FILE_PUT` (the Y-2 wire).
  // *(3)* `wired.hydrate(bootHandoff)` — the file-tier nodes minted from the handed-off rows, firing the store's event
  // surface by design, with `mem`/`temp` constructed EMPTY.
  //
  // **WHY NOTHING IS LEFT TO MOVE** (`D-92`'s measurement, `D-78`'s ruling). The hand-off's rows were the operator settings
  // instance's `['operator-app-state']` rows — the renderer's `file.*` projection, which is exactly the content the purge
  // rules out. The record this realm renders from is READ where it lives now: the tab record through
  // `src/renderer/tabs-client.ts` (one boot read + every `onChanged` delivery), the pane geometry and zone family through
  // `src/renderer/view-client.ts` (`fill()` + deliveries). Nothing consumed the hydration's minted nodes and nothing read
  // the store it minted them into. **THE BOOT ORDER THE GATE READS IS UNCHANGED IN SEQUENCE AND SHORTER IN STEPS**:
  // `tests/e2e/bundle-boot-seam`'s `B-5` pins the trace's order against `bridge.ready()`, and the steps that leave are
  // three that ran strictly between the operator-config read and the focus carrier — so every step that remains keeps its
  // relative order.
  //
  // **THE FIRST ENVELOPE STILL LOADS AFTER THE ONE OPERATOR-CONFIG READ ABOVE** (`bridge.security.get()`, tier 4's own
  // snapshot, a DIFFERENT channel that is not this pass's subject): that read is the only awaited bridge call left before
  // the first graph load, and it never was the Y-1 hand-off's.
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

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
  // ⟶ **THE APPEARANCE APPLICATION (`D-97`)** — constructed here, ONCE, after the first envelope load so the authored state
  //    node exists: `themeWiringRole` derives the caller-held attribute name and the authored carrier's id, and the returned
  //    pair of turns is the app's ONE application site. **IT READS NOTHING AND WRITES NOTHING AT THIS SITE** — `D-96`'s boot
  //    read is deleted with its drive (`D-97`) — and it adds no subscription, no timer and no boot step that
  //    `tests/e2e/bundle-boot-seam`'s `B-5` could read as an order move.
  const themeApplication = startThemeApplication(runtime)
  // ⟶ **THE Y-3 REGISTRATION IS DELETED FROM THIS SITE** (`D-93`; `D-90`'s clause (3), the legacy projection dying whole).
  // It was `bridge.store.onFileChanged(…)` — ONE registration at boot whose body was a DECLARED NO-OP ("a change SIGNAL
  // while a single window owns the realm"), plus the `releaseY3` binding held for the P1-P7 release discipline that the
  // page's teardown never reached. **IT FED NOTHING AND NOTHING FED IT**: the renderer's file table was to update from the
  // frozen store's receipts, and that store and its projection (`STORE_FILE_PUT`, `provident:store:file:changed`) are
  // deleted with it. **A LIVE REGISTRATION IS NOT KEPT FOR ITS OWN SAKE**: the P1-P7 discipline is satisfied by holding the
  // registrations that remain — `tabsClientSubscription` and `viewSubscription` below, one per crossing this realm reads.
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
    // **THIS CALL IS A PAINT AND NO LONGER A READ** (`D-106`): it used to open an IPC read of the security record — the boot's
    // own ask, `D-104`'s audit class (i) — and the record now reaches the pane from the shape `startSecurityShape` below
    // starts, whose ONE stated boot fill is that read's successor. The paint stays because the constructor renders nothing: it
    // is what puts the envelope's authored words on the page before any delivery exists.
    panels.refresh()
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
      // ⟶ **THE APPEARANCE ACT RIDES THIS PUSH** (`D-97`, correcting `D-96`'s shape). The notify callback is the app's
      //    ONE app-graph-changed signal — `RH-3` half (b) already re-homed the Debug pane's refresh onto it — and the act
      //    is carried BEFORE it. **WHAT RIDES IS THE USER'S ACT AND NOT A DECLARATION**: a dispatch at the authored control
      //    has just written the setting, this turn reads it, and — only if it MOVED — hands it to the crossing's route, where
      //    the constraint repair resolves it. A reply that moved nothing sends nothing.
      themeApplication.commit()
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
  // **AND IT APPLIES NOTHING** (`D-97`) — **AND FROM `D-98` THAT IS A PROPERTY OF THIS PATH AND NO LONGER ONE OF THE DATA**.
  // At `mem` the record a boot carried was always the placeholder, so `declaration.name` was `null` and there was no
  // `props.<name>` to write. The tier is `file` now, so on a SECOND boot the record can be a real, legal declaration a
  // previous run persisted — measured on this tree with the real app over a seeded profile: the record stood at
  // `{token: 'light', declaration: {name: 'theme', …}}` and `get_rendered_html` carried NO `theme` attribute. **The
  // silence is THIS continuation's**: `fill()` ADOPTS and applies nothing, and `apply()` is reached from the DELIVERY's
  // subscription alone — so a standing record is DATA at a boot and never an application.
  startViewShape(themeApplication)
  // ⟶ **THE APP-STATE ROWS' SHAPE (`D-104`; `D-82`'s `V3`)** — the pane that displays the module registry is filled from a
  //    DELIVERY from here on, and the request-time read `panels.refresh()` used to make is deleted. Started LAST and never
  //    awaited, for the reason the two sites above it are: every boot step including `bridge.ready()` has already run, so no
  //    step's order moves and a slow or failing crossing cannot delay or fail the boot.
  startAppStateShape(panels)
  // ⟶ **THE SECURITY RECORD'S SHAPE (`D-106`)** — the pane's `cfg` is filled from a DELIVERY from here on, and the
  //    request-time read `panels.refresh()` made at the boot, after every authored click and at the `dispatch()` seam is
  //    deleted. Started beside the three above and never awaited, for their reason.
  startSecurityShape(panels)
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

/** THE REALM'S ONE TAB CLIENT — the same identity on every call, the `getViewClient()` form (the `getWiredGraphStore()`
 *  form it also named is deleted, `D-93`). It is
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
 *  the P1-P7 release discipline: a registration is held so a teardown could withdraw it, and this
 *  realm's teardown is the page's. **IT IS THE ONLY SUCH REGISTRATION THE TAB RECORD HAS HERE** (`D-93`: the Y-3
 *  registration that stood beside it in `main()` is deleted with the store it fed). */
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

/** THE SHAPE'S SUBSCRIPTION — held for the P1-P7 release discipline exactly as `tabsClientSubscription` is: a registration
 *  is held so a teardown could withdraw it (this realm's teardown is the page's). **THESE TWO AND NO THIRD** (`D-93`: the
 *  Y-3 registration is gone, so the realm holds one registration per crossing it reads and nothing else). **⟶ AND FROM
 *  `D-104` THE COUNT IS THREE**: the app-state rows' own registration below, the secure crossing's third address reaching
 *  the pane that displays the module rows. A fourth exists nowhere: the realm holds one registration per crossing it reads. */
let viewSubscription: ViewSubscription | null = null

/** THE APP-STATE SHAPE'S SUBSCRIPTION — the third registration, held for the same discipline and for the same reason. */
let appStateSubscription: ModuleSubscription | null = null

/** **THE SECURITY SHAPE'S SUBSCRIPTION** (`D-106`) — the fourth registration, held for the P1-P7 release discipline the
 *  realm's other three are held for; this realm's teardown is the page's. **THESE FOUR AND NO FIFTH**: the realm holds one
 *  registration per crossing it reads — the tab record's, the view's, the app-state rows' and the security record's. */
let securitySubscription: SecuritySubscription | null = null

/** **THE SECURITY SHAPE'S ONE BOOT SITE** (`D-106`) — ONE registration and ONE stated read, started from `main()` beside the
 *  three above and never awaited, for exactly their reason: every boot step including `bridge.ready()` has already run, so no
 *  step's order moves and a slow or failing crossing cannot delay or fail the boot (`tests/e2e/bundle-boot-seam`'s `B-5`
 *  reads the trace's ORDER, not a duration).
 *
 *  **THE REGISTRATION GOES FIRST** so a change that lands between the read and its continuation is still delivered (a
 *  delivery re-reads, so an extra delivery costs one read and can never lose a write). **AND THE DELIVERY IS WHERE THE PANE
 *  IS FILLED**: the client re-reads inside its own listener and REPLACES the shape, and this body hands the shape to the one
 *  consumer that paints the record — `SecurePanels.applySecurity`, which writes `cfg` and re-renders through the managed
 *  channel. The boot read below does the same thing once, and there is no third turn: nothing in this realm reads the
 *  security record at request time, because `SecurePanels.refresh()` no longer does.
 *
 *  **THE ONE READ THIS FILE MAKES OUTSIDE THIS CLIENT IS NAMED AND IS NOT A COUNTERPART**: `main()`'s `bridge.security.get()`
 *  above is the TIER-4 SNAPSHOT the app Runtime's Supervisor is constructed from — a value read ONCE before the first graph
 *  load, consumed by a construction and never painted. It is `D-104`'s audit class (i), a boot fill, and it stays. */
function startSecurityShape(panels: SecurePanels | null): void {
  const client = getSecurityClient()
  securitySubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and the shape is what the consumer paints.
    panels?.applySecurity(client.shape())
  })
  void client.fill().then(
    (reading) => {
      panels?.applySecurity(client.shape())
      console.info(`[provident-renderer] security shape: ${describeSecurityReading(client.shape(), reading)}`)
    },
    (error: unknown) => {
      // THE DEFECT ARM, NOT AN ORDINARY ONE: `fill()` answers values, so a rejection here is a bug in the client. The shape
      // keeps what it last read, which on a boot is the declared empty record, and boot is over by the time this runs.
      console.warn(`[provident-renderer] security shape: the boot read rejected — ${String(error)}`)
    },
  )
}

/** **THE SECURITY LINE** — the arm, whether anything has answered, and the two closed members the pane paints as WORDS
 *  (`token: '••••'` for a standing token and never the token, the exclusion's word, and the tier-4 refusal's token). */
function describeSecurityReading(shape: { filled: boolean; token: string | null; enabled: readonly string[]; exclusion: string | null; read: unknown }, reading: SecurityClientReading): string {
  const arm = reading.status === 'committed' ? 'read' : reading.status === 'absent' ? `absent (${reading.reason})` : `unread (${reading.reason})`
  return `${arm}; filled=${String(shape.filled)}, token=${shape.token === null ? '(none)' : '••••'}, enabled=[${shape.enabled.join(', ')}], `
    + `exclusion=${String(shape.exclusion)}, refused=${String(shape.read !== null)}`
}

/** **THE SHAPE'S ONE BOOT SITE (`D-88`)** — ONE registration and ONE stated read, started from `main()` as its last
 *  statement and never awaited. The registration goes FIRST so a change that lands between the read and its continuation is
 *  still delivered (the delivery re-reads, so an extra delivery costs one read and can never lose a write). The read's
 *  answer is ADOPTED by the client itself — this function holds no shape and composes nothing.
 *
 *  **AND THE DELIVERY IS WHERE THE APPEARANCE DECLARATION IS APPLIED** (`D-97`): the body hands the turn to the application
 *  the boot constructed, and NOTHING is applied by the boot read above — the two are different turns of one chain, and the
 *  difference is the one `D-96` had to key a `changed` record on. A committed appearance act reaches this body through the
 *  crossing's push, the client re-reads, and the record's declaration lands on the authored node then. */
function startViewShape(theme: ThemeApplication | null): void {
  const client = getViewClient()
  viewSubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and its appearance turn. A record with no applicable
    // declaration — the placeholder, which names no attribute — writes nothing, so a delivery that moved another family
    // costs one read and no appearance write.
    theme?.apply()
  })
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

/** **THE APP-STATE SHAPE'S ONE BOOT SITE** (`D-104`; `D-82`'s `V3`) — ONE registration and ONE stated read, started from
 *  `main()` beside the tab client's instrument and the view shape's, and never awaited, for the reason both of those are
 *  not: every boot step including `bridge.ready()` has already run, so no step's order moves and a slow or failing crossing
 *  cannot delay or fail the boot (`tests/e2e/bundle-boot-seam`'s `B-5` reads the trace's ORDER, not a duration).
 *
 *  **THE REGISTRATION GOES FIRST** so a change that lands between the read and its continuation is still delivered (a
 *  delivery re-reads, so an extra delivery costs one read and can never lose a write). **AND THE DELIVERY IS WHERE THE PANE
 *  IS FILLED**: the client re-reads inside its own listener and REPLACES the shape, and this body hands the shape to the one
 *  consumer that displays the module rows — `SecurePanels.applyAppState`, which paints the two authored nodes. The boot read
 *  above does the same thing once, and there is no third turn: nothing in this realm reads the app-state rows at request
 *  time, because `SecurePanels.refresh()` no longer does.
 *
 *  **THE `release` IS HELD** (`appStateSubscription`) for the P1-P7 release discipline the realm's other two registrations
 *  are held for; this realm's teardown is the page's. */
function startAppStateShape(panels: SecurePanels | null): void {
  const client = getModuleClient()
  appStateSubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and the shape is what the consumer paints.
    panels?.applyAppState(client.shape())
  })
  void client.fill().then(
    (reading) => {
      panels?.applyAppState(client.shape())
      console.info(`[provident-renderer] app state: ${describeModuleReading(client.shape(), reading)}`)
    },
    (error: unknown) => {
      // THE DEFECT ARM, NOT AN ORDINARY ONE: `fill()` answers values, so a rejection here is a bug in the client. The shape
      // keeps what it last read, which on a boot is the declared empty pair, and boot is over by the time this runs.
      console.warn(`[provident-renderer] app state: the boot read rejected — ${String(error)}`)
    },
  )
}

/** **THE APP-STATE LINE** — what the delivery left: the count of rows the crossing answered, the diagnosis word, and the
 *  reading's own arm. A `filled: false` shape says so rather than reading as an empty registry, which is the difference
 *  between "nothing has been read" and "the store says no module stands". */
function describeModuleReading(shape: { filled: boolean; corrupt: boolean; modules: readonly { name: string; version: string }[] }, reading: ModuleClientReading): string {
  const names = shape.modules.map((m) => `${m.name}@${m.version}`)
  const arm = reading.status === 'committed' ? 'read' : reading.status === 'absent' ? `absent (${reading.reason})` : `unread (${reading.reason})`
  return `${arm}; filled=${String(shape.filled)}, corrupt=${String(shape.corrupt)}, modules=[${names.join(', ')}]`
}

/** THE ONE LINE'S TEXT — the arm, the per-family `source` words, and the two families' sizes. */
function describeViewReading(reading: ViewClientReading): string {
  if (reading.status === 'committed') {
    const panes = reading.panes.map((pane) => `${pane.id}=${String(pane.size)}[${String(pane.bounds.min)}…${String(pane.bounds.max)}]`)
    return `read; panes=[${panes.join(', ')}] (source ${reading.source.panes}), `
      + `focus entries=${String(reading.focus.entries.length)} active=${JSON.stringify(reading.focus.activeId)} (source ${reading.source.focus}), `
      + `zones=${String(reading.zones.length)} (source ${reading.source.zones}), `
      + `theme=${JSON.stringify(reading.theme.declaration)} (source ${reading.source.theme})`
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

/** **THE APPEARANCE DECLARATION'S APPLICATION — THE RECORD'S DECLARATION, APPLIED AS PROVIDENT DATA, AND NOTHING COMPUTED**
 *  (`D-97`; `D-96`'s ruling that the mechanism is owed a consumer, taken one step further: the CONSUMER OF THE DECLARATION is
 *  this realm, and the PRODUCER of it is the crossing's constraint repair). `D-96` resolved and declared HERE, at a boot, and
 *  had to key the whole thing on "the setting moved" to keep a boot from moving the rendered surface. **This pass deletes that
 *  shape whole**: `startThemeDeclaration`, its `drive`, its boot read and its `changed` record are gone, `resolveTheme` and
 *  `applyThemeDeclaration` are no longer in this file's scope, and what stands here is two turns over the view record —
 *
 *    · **the USER ACTION's turn** (`commit`): read the authored setting the way the app's own control writes it
 *      (`Runtime.nodeState`, the surface `provident.get_node_state` answers on), and if it MOVED since the last act this
 *      realm sent, hand it to the crossing through `view.commitTheme(token, attributeName)` — the act, never a resolution;
 *    · **the DELIVERY's turn** (`apply`): read the record the crossing's answer now carries
 *      (`getViewClient().themeRecord()`) and write `props.<declaration.name>` on the AUTHORED state node with the
 *      declaration's own `value`/`removal`, as ONE `state-slice`.
 *
 *  **THE CHAIN IS `D-78`'s AND THE ORDER IS THE WHOLE DESIGN**: the pair resolves nothing until the crossing is asked, and the
 *  crossing is asked by a USER ACTION — so between the boot and the first act no declaration exists at all. **THE BOOT'S ONE
 *  READ IS A BASELINE AND NEVER A DECLARATION**: it records the authored setting this realm found (the `D-96` seed, kept for a
 *  reason `npm run divergence` measured), so the first act is a CHANGE a user made and not the token an envelope authored. **NOTHING IS
 *  APPLIED AT A BOOT, AND IT IS NOT A GUARD THAT MAKES THAT TRUE — IT IS THE PATH, AND FROM `D-98` THAT DISTINCTION IS
 *  LOAD-BEARING**: at `mem` the record a boot carried was always the placeholder, whose `declaration.name` is `null` and so
 *  had no `props.<name>` to write; the tier is `file` from `D-98`, so a SECOND boot's record can carry a real declaration a
 *  previous run persisted, and boot silence can no longer be claimed from the data's shape. It is claimed from the two
 *  turns: `startViewShape`'s ONE stated `fill()` ADOPTS and applies nothing, and `apply()` is reached only from the
 *  DELIVERY's subscription — measured on this tree over a seeded profile with the real app, the record standing at
 *  `{token: 'light', declaration: {name: 'theme', value: 'light', removal: false}}` while `get_rendered_html` carried no
 *  `theme` attribute. **A STANDING RECORD IS DATA AT A BOOT; THE DELIVERY IS THE ONLY PATH THAT WRITES.**
 *
 *  **WHY THAT MATTERS, MEASURED AND NOT ASSERTED**: an applied `props.<name>` lands in BOTH `renderedHtml` AND `ssrHtml`, and
 *  `npm run divergence` compares that `ssrHtml` between the REAL app and the headless battery host, which holds no renderer
 *  wiring at all (`src/main/battery-host.ts`). A declaration applied at a boot would make the two realms render differently
 *  and red a leg that exists to prove they do not — which is exactly what `D-96` recorded, and what this shape answers at the
 *  root instead of at the drive.
 *
 *  **NO HAND-WRITTEN DOM, AND NO SECOND WRITE SURFACE**: one `state-slice` on an AUTHORED node, whose attribute the engine
 *  renders from `props.<name>` (`props.resizable` → `resizable`, `src/shared/demo-envelope.ts`); the removal arm is
 *  `value: undefined`, the engine's declared attribute REMOVAL. No attribute stamp, no class flip, no style write, no created
 *  element and no injected CSS — the element is the graph's, so the write is visible to `get_rendered_html`, `get_markdown`
 *  and `get_node_state` because it IS the graph (`AGENTS.md` § "UI authority").
 *
 *  **TOTAL, AND NO THROW OUT OF A WIRING TURN**: an absent or renamed state node, a thrown graph read, a realm with no
 *  crossing, a route that answers `absent` and a runtime that throws all answer a READING — and never an exception. */
export interface ThemeApplicationReading {
  /** The AUTHORED state node the declaration is written to, as the envelope spells it (`''` where none was derived). */
  readonly nodeId: string
  /** The caller-supplied attribute name `themeWiringRole` holds — the name the route hands the crossing. */
  readonly attributeName: string
  /** The setting this turn READ off the authored node, normalised the way the mechanism does (`null` for the empty setting). */
  readonly setting: string | null
  /** Whether that setting MOVED since the last act this realm carried to the crossing. */
  readonly changed: boolean
  /** Whether the act was SENT (`sent`), or the realm has no crossing to send it to. */
  readonly sent: boolean
  /** The declaration the crossing's record carried at this turn, as applied, or `null` where nothing was applicable. */
  readonly declaration: { readonly name: string; readonly value: string; readonly removal: boolean } | null
  /** Whether THAT declaration moved since the last one applied here. */
  readonly declared: boolean
  /** The runtime's OWN answer to the `state-slice` write, or `null` where no write was attempted. */
  readonly status: string | null
  /** Whether the declaration reached the authored node (`status === 'applied'`). */
  readonly written: boolean
}

/** The wiring-held role: the two holders the corpus's own role derives, and the two turns that read and apply a record. */
export interface ThemeApplication {
  readonly attributeName: string
  readonly nodeId: string
  /** **THE USER ACTION'S TURN** — read the authored setting and, when it moved, commit it through the crossing's route. */
  commit(): ThemeApplicationReading
  /** **THE DELIVERY'S TURN** — apply the declaration the crossing's record carries, when it moved. */
  apply(): ThemeApplicationReading
}

/** The authored setting as the graph holds it, or the declared UNREADABLE answer when the state node is absent, was
 *  renamed, or the read throws. A node that carries no `content` at all is a READABLE absence — the empty setting. */
function authoredSettingOf(
  runtime: Runtime,
  nodeId: string,
): { readonly readable: boolean; readonly setting: string } {
  if (nodeId === '') return { readable: false, setting: '' }
  try {
    const answer = runtime.nodeState(nodeId) as { readonly states?: readonly unknown[] } | null | undefined
    const states = answer?.states
    if (!Array.isArray(states) || states.length === 0) return { readable: false, setting: '' }
    const content = (states[0] as { readonly content?: unknown } | null | undefined)?.content
    if (typeof content === 'string') return { readable: true, setting: content }
    if (content === null || content === undefined) return { readable: true, setting: '' }
    return { readable: false, setting: '' }
  } catch {
    return { readable: false, setting: '' }
  }
}

/** **THE DECLARATION THIS REALM WOULD APPLY, OR `null` WHERE THE RECORD OFFERS NONE.** A declaration with no attribute NAME
 *  is the placeholder, and a placeholder is not applicable: there is no `props.<name>` to compose. **That is the whole of
 *  what makes a DELIVERY that moved some other family cost one read and no appearance write** — and it is a property of
 *  the record rather than a guard in a turn. **IT IS NOT, HOWEVER, WHAT KEEPS A BOOT SILENT** (`D-98`, correcting `D-97`'s
 *  reading of this line): at `file` a boot's record can name an attribute, so boot silence is the boot PATH's — `fill()`
 *  never calls `apply()` — and never this function's. */
function applicableDeclaration(theme: ViewThemeRecord): { name: string; value: string; removal: boolean } | null {
  const name = theme.declaration.name
  if (name === null) return null
  return { name, value: theme.declaration.value, removal: theme.declaration.removal }
}

export function startThemeApplication(runtime: Runtime): ThemeApplication {
  // THE CORPUS'S OWN ROLE, CALLED AND NOT RE-SPELLED: the attribute NAME (the caller's string) and the AUTHORED state node
  // the declaration lands on. Neither is a declaration and neither is computed here.
  const [attributeName, nodeId] = themeWiringRole(runtime)
  /** **THE LAST SETTING THIS REALM HAS AN OPINION ABOUT — closure state, never data** (`D-90`'s judgement about the drag's
   *  preview, applied here), and it is SEEDED BY A READ. **THE SEED IS NOT A DECLARATION AND THE DISTINCTION IS MEASURED, NOT
   *  ARGUED**: without it the FIRST reply of a boot would carry the setting the realm merely FOUND — the envelope's own
   *  authored token — as if a user had chosen it, the crossing would resolve it, and the delivery would write
   *  `props.<name>` at a boot. **`npm run divergence` redded on exactly that draft** (measured: `dirtied ids match` read
   *  `electron=[5]` against `shim=[3]` and `SSR fragment matches` failed), which is the leg doing the job this pass's
   *  instruction relies on it for. So the boot reads the authored setting ONCE and records it here, declaring nothing — the
   *  `D-96` seed, kept because the alternative is a boot-time declaration that no `changed` guard can tell from an act.
   *  **AND IT MOVES ON AN ACT ONLY WHEN THE ROUTE WAS HANDED IT**, so a realm with no crossing retries the next time the
   *  setting is read rather than swallowing the act behind a seed that claims it was carried. */
  let lastCarried: { readonly setting: string } | null = null
  const boot = authoredSettingOf(runtime, nodeId)
  if (boot.readable) lastCarried = { setting: boot.setting }
  /** **THE LAST DECLARATION THIS REALM APPLIED** — the same kind of closure state, and the reason a delivery that changed
   *  another family writes nothing: the record's declaration is compared with the one already on the node. */
  let lastApplied: { readonly name: string; readonly value: string; readonly removal: boolean } | null = null

  const reading = (base: {
    readonly setting: string | null
    readonly changed: boolean
    readonly sent: boolean
    readonly declaration: { readonly name: string; readonly value: string; readonly removal: boolean } | null
    readonly declared: boolean
    readonly status: string | null
    readonly written: boolean
  }): ThemeApplicationReading => ({ nodeId, attributeName, ...base })

  return {
    attributeName,
    nodeId,

    commit(): ThemeApplicationReading {
      const read = authoredSettingOf(runtime, nodeId)
      // AN UNREADABLE CARRIER IS A READING, NOT AN ACT: nothing is sent, and no status word is fabricated.
      if (!read.readable) {
        return reading({ setting: null, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
      }
      const changed = lastCarried === null || lastCarried.setting !== read.setting
      if (!changed) {
        return reading({ setting: read.setting, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
      }
      // **THE ACT, SENT AS THE ACT** — the setting and the caller-held name, and no declaration: the crossing's pair
      // resolves it inside the commit this causes. The answer is the client's `sent`/`absent` statement; nothing is awaited
      // and no receipt composes a decision.
      const sent = getViewClient().commitTheme(read.setting, attributeName).status === 'sent'
      if (sent) lastCarried = { setting: read.setting }
      return reading({ setting: read.setting, changed: true, sent, declaration: null, declared: false, status: null, written: false })
    },

    apply(): ThemeApplicationReading {
      const theme = getViewClient().themeRecord()
      const declaration = applicableDeclaration(theme)
      // NO APPLICABLE DECLARATION: the placeholder, which names no attribute. Nothing is written and nothing is claimed.
      if (declaration === null) {
        return reading({ setting: theme.token, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
      }
      const declared =
        lastApplied === null ||
        lastApplied.name !== declaration.name ||
        lastApplied.value !== declaration.value ||
        lastApplied.removal !== declaration.removal
      if (!declared) {
        return reading({ setting: theme.token, changed: false, sent: false, declaration, declared: false, status: null, written: false })
      }
      if (nodeId === '') {
        return reading({ setting: theme.token, changed: false, sent: false, declaration, declared: true, status: null, written: false })
      }
      let status: string
      try {
        const answer = runtime.applyCommand({
          kind: 'state-slice',
          node: nodeId,
          mutation: [
            {
              targetProp: `props.${declaration.name}`,
              mode: 'replace',
              // THE REMOVAL ARM IS THE MECHANISM'S `removal` MEMBER — an `undefined` on `props.<key>` is the engine's
              // declared attribute REMOVAL, and never an empty string that happens to be falsy.
              value: declaration.removal ? undefined : declaration.value,
            },
          ],
        })
        status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
      } catch {
        status = 'threw'
      }
      const written = status === 'applied'
      // THE RECORD MOVES ONLY ON A DECLARATION THAT LANDED, so a refused write is retried by the next delivery rather than
      // being swallowed by a seed that claims it was applied.
      if (written) lastApplied = declaration
      return reading({ setting: theme.token, changed: false, sent: false, declaration, declared: true, status, written })
    },
  }
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

/** **THE COMPOSITION'S ONE BACKING** (`D-88` split it from the store; `D-92` emptied the store's half; `D-93` deletes it).
 *
 *  `view` is **THE SHAPE** — the pane geometry AND the zone family, read SYNCHRONOUSLY off `src/renderer/view-client.ts`'s
 *  in-realm projection and written through the crossing's `commitPane` route. It is NOT a store: it holds no address
 *  space, owns no persistence, carries no constraint and is replaced whole by every delivery it is refilled from. **IT IS
 *  THE COMPOSITION'S ONLY READ AUTHORITY**: all six of the flow's reads answer here.
 *
 *  **`frozen` IS GONE FROM THIS INTERFACE, AND ITS DELETION IS THE POINT** (`D-93`). It was the app's own frozen graph
 *  store, and after `D-92` NOTHING read it: the member survived for exactly one act, the construction-time
 *  `commit`/`clear` bootstrap of `mem.layout`/`temp.drag`/`file.settings` below, which wrote three roots no read answered.
 *  That bootstrap's subject is deleted here with the store, so the member goes too rather than becoming a duck-typed hole
 *  a later caller could fill with a second authority — the "third path" `D-90` rejected before it was offered.
 *
 *  TOTAL for ANY argument (unchanged): an absent or hostile `view` answers the MEASURED DEFAULT, a zone nothing names
 *  answers `[]`/`undefined`, and no throw escapes a wiring turn. */
export interface PaneDragBacking {
  /** THE SHAPE (D-88, D-92) — every read the flow makes, synchronous; the writes are the crossing's routes. */
  readonly view?: ViewClient | null
}

/** THE WIRED COMPOSITION (§2.1 A/B/C + the shape's delivery turn + §7a.1 item 1's reconcile turns), bound to the
 *  caller-supplied BACKINGS above and the RECORDING SOURCE DOUBLE. Every read is the shape's; the temp preview is this
 *  closure's; the render turn is a member the shape's one delivery calls. */
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface {
  const backingRecord = (backing ?? null) as { readonly view?: unknown } | null
  /** THE SHAPE, where the caller supplied one. `null` is a realm with no crossing: the reads answer the measured default
   *  and every write is the client's `absent` statement, which is the declared degradation and never a throw. */
  const view = (backingRecord?.view ?? null) as ViewClient | null
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

  /* **THE BOOT BOOTSTRAP IS DELETED FROM THIS SITE** (`D-93`, by `D-90`'s clause (3) and `D-92`'s head, which named it
   *  "the ONE write still made to it"). It was three `commit`/`clear` pairs mint-declaring `mem.layout`, `temp.drag` and
   *  `file.settings` in the FROZEN STORE's register — §7a.1 items 1/4's boot-seeding reading. **EVERY ROOT IT SEEDED HAD
   *  ALREADY LEFT**: the pane geometry became the view record's at `D-88` (`['panes']`), the zone family at `D-91`
   *  (`['zones']`), and the drag preview became this closure's `Map` at `D-92`. So the bootstrap wrote three roots no read
   *  answered, into a store no other line of this file touched. **WHAT IT COST TO REMOVE: NOTHING** — the composition's
   *  behaviour is a function of the shape and of `previews`, and no caller ever observed a register row. A caller that
   *  supplies no `view` still loses nothing but the declared degradation, and no throw escapes any turn.
   *
   *  **AND `temp.drag` WAS NEVER A ROOT OF THE FAMILY'S**: `D-90`'s clause (2) measured the preview as ONE writer with NO
   *  reader outside the rows asserting the write, holding no address, outliving no gesture, crossing no boundary. */

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
   *  measured it. **NO WRITE HAPPENS HERE** — a read that misses leaves the miss (`D-82` clause 4).
   *
   *  **AND IT IS TOTAL OVER A SHAPE WHOSE READ THROWS** (`D-95`): what an ABSENT shape answers, a THROWING one answers
   *  too — the measured default — because a read that could throw out of `startSizeOf`/`boundsOf` was the one pair of the
   *  seven turns that could (§3.2 F-8; `D-94`'s open item (e)). The other six guards were read to be copied, not widened:
   *  each catches around its own shape call and answers the degradation IT declares (`[]` for `candidatesFor`, nothing for
   *  the render turn), so this one answers the default IT declares. */
  const readPaneSize = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    // A REALM WITH NO CROSSING: the measured default stands, stated from the ONE shared declaration rather than invented.
    const measured = defaultPaneGeometry(id).size
    if (view === null) return measured
    try {
      return view.paneSizeOf(id)
    } catch {
      // A HOSTILE SHAPE MUST NEVER THROW OUT OF THE SIZE READ — the absent member's own answer, and no write.
      return measured
    }
  }

  /** §2.1 A's bounds read, also the shape's: the pair AS STORED, never a policy clamped here, and the measured default pair
   *  (`{min: 0, max: 200}`, the authored pane's `props.min`/`props.max`) where the family names no such pane. A pair whose
   *  members are not numbers is what `clampToBounds` turns into `NaN`, so the move is INVALID (§3.2 F-8) — that arm now
   *  needs a shape the crossing's own admission refused, which is the boundary's business and not this read's.
   *  **TOTAL BY THE SIZE READ'S OWN ARM** (`D-95`): a shape whose bounds read throws answers the measured pair, which is
   *  what an absent shape answers — the pair is COPIED, so no caller holds `DEFAULT_PANE_BOUNDS`. */
  const readPaneBounds = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    const measured = defaultPaneGeometry(id).bounds
    const fallback = { min: measured.min, max: measured.max }
    if (view === null) return fallback
    try {
      return view.paneBoundsOf(id)
    } catch {
      // A HOSTILE SHAPE MUST NEVER THROW OUT OF THE BOUNDS READ — the absent member's own pair, and no write.
      return { min: fallback.min, max: fallback.max }
    }
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
