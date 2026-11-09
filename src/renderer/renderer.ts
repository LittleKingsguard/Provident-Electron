// src/renderer/renderer.ts — browser entry for the Electron renderer.
// Bootstraps the provident-ssr producing process into #app and serves the
// MCP-facing operations over the preload bridge (main process = MCP server).
import { Runtime } from './runtime.js'
import { demoEnvelope, gutterSeamExample, GUTTER_AFFORDANCE_ID, GUTTER_STATUS_ID, GUTTER_TARGET_ID, TABS_LANDING_PAGE_ID, TABS_ERROR_PAGE_ID, APP_ROOT_ID, OVERLAY_STATE_ID, OVERLAY_OPEN_ID, OVERLAY_CLOSE_ID, OVERLAY_DIALOG_ID } from '../shared/demo-envelope.js'
import { overlayTransition, overlayInertDeclaration, type OverlayState } from '../shared/overlay.js'
import { SecurePanels } from './secure-panels.js'
import { createGestureSession, POINTER_TYPES } from '../shared/gesture-session.js'
import { createGutterAffordance, domEventSource } from '../shared/gutter-affordance.js'
import type { RpcRequest, RpcReply, TabsRecordRow } from '../shared/types.js'
import { clampToBounds } from '../shared/gutter.js'
import { createTabsClient, type TabsClient, type TabsClientReading, type TabsCommittedAnswer, type TabsNodeResolver, type TabsSubscription } from './tabs-client.js'
import { createViewClient, type ViewClient, type ViewClientReading, type ViewSubscription } from './view-client.js'
import { createModuleClient, type ModuleClient, type ModuleClientReading, type ModuleSubscription } from './module-client.js'
import { createSecurityClient, type SecurityClient, type SecurityClientReading, type SecuritySubscription } from './security-client.js'
import { DEFAULT_PANE_ID, DEFAULT_ZONE_ID, defaultPaneGeometry, type ViewThemeRecord } from '../shared/view-shape.js'
/** **THE APPEARANCE MECHANISM IS NO LONGER IMPORTED HERE, AND THAT IS THE INSTRUCTION THIS HEAD CARRIES** (`D-97`: *"No boot
 *  time declarations — use constraint repairs"*). `D-96` wired `resolveTheme`/`applyThemeDeclaration` into `startThemeDeclaration`
 *  in THIS file and drove it from the boot's change push, which is exactly the shape `D-96` had to bolt a `changed` guard on
 *  to keep `npm run divergence` green. **The resolution is now PRODUCED BY A CONSTRAINT REPAIR at the crossing**
 *  (`theme-must-stand`, `src/main/view-record/index.ts`) and STORED on the view record beside the pane geometry and the
 *  zone family; this file READS that record over the bridge and APPLIES `props.<name>` from it. So the mechanism has
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
 *  same boot point the deleted frozen store's was, and lazily in a realm where `main()` never runs (the W4 form), so a node
 *  realm that reaches it reads a client and never a null binding. **IT IS NOT A STORE**: it holds no address space, owns no
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
  /** **THE RECORD'S witness for this terminal** (L2 §6's derivation, off the reading's rows) — and `null` where there was no
   *  record to derive it from. **THE NULL IS NOT A `false`**: a terminal nobody read about is not a terminal the record says
   *  does not stand, and collapsing the two is what let a fault blank both authored pages (`D-127`). */
  readonly witness: boolean | null
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
  // **A READING THAT IS NOT `committed` IS NOT A RECORD, AND IT SUPPLIES NO BOOT DATA** (`D-127`; `D-82` clause 3, "boot
  // data comes from file or constraint repairs"). `absent` is a route that answered *there is no such member* and `unread`
  // is a transport fault or a throw; neither is a record saying *neither terminal stands*. Driving from them painted
  // `display: 'none'` over a record this realm never saw — so on a realm with NO BRIDGE AT ALL (a plain page) both authored
  // pages were hidden for the life of the page, and a single blip blanked them until something else re-drove them, since a
  // fault delivers no correction. **THE DRIVE IS TAKEN ON `committed` ALONE**: every other arm writes NOTHING and reports
  // `status: null`, so the surface keeps the envelope's authored `display: 'block'` (or the last record's word), and the
  // reading still REPORTS what it could not read instead of converting it into a state. It is the same rule the appearance
  // family follows (`D-126`): a realm that has heard nothing renders nothing it was not authored with.
  const witnessed = reading.status === 'committed'
  const witness = witnessed ? reading.witness : null
  const landingWitness = witness?.landing.witness === true
  const errorWitness = witness?.error.witness === true
  const landingStatus = witnessed ? drivePageDisplay(runtime, TABS_LANDING_PAGE_ID, landingWitness) : null
  const errorStatus = witnessed ? drivePageDisplay(runtime, TABS_ERROR_PAGE_ID, errorWitness) : null
  return {
    landing: {
      nodeId: TABS_LANDING_PAGE_ID,
      witness: witnessed ? landingWitness : null,
      resolved: witness?.landing.resolved ?? null,
      driven: landingStatus === 'applied',
      status: landingStatus,
    },
    error: {
      nodeId: TABS_ERROR_PAGE_ID,
      witness: witnessed ? errorWitness : null,
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
 *   (iii) `createGutterAffordance(...)` + `.attach()` — and **ITS GEOMETRY SEAMS ARE THE CROSSING'S**
 *       (`D-117`): the pre-drag size, the bounds pair and the default-size turn are
 *       `createPaneDrag({view: getViewClient()})`'s, so the live gesture reads `['panes']` and commits
 *       through `commitPane`, where it used to read the authored pane element's own attributes and
 *       write nothing but the status node. `gutterSeamExample()` still supplies the four seams that
 *       are the EXAMPLE's and not the record's — the pointer-to-size mapping, the pointer resolver,
 *       the axis producer whose token the cursor maps, and the resizability the authored pane declares;
 *   (iv) the PREVIEW write: the DECLARED TRANSIENT INLINE-STYLE WRITE ON THE LIVE TARGET
 *       (`§2.5` item 4 — the target's rendered geometry follows the pointer during a drag and
 *       reverts on every revert arm), never a graph write and never the affinity's own node;
 *   (v) the CURSOR write: the handle's own style member, with the declaration the module
 *       resolved (never a vocabulary of the wiring's own).
 *  The `commit` seam is `createPaneDrag`'s `release`, and **THE APP HANDS IT NO SINK** (`D-129`; design §5): the
 *  seam's THIRD ARGUMENT IS DELETED, so the turn makes ONE `commitPane(DEFAULT_PANE_ID, {size})` across the
 *  crossing and then its own ending — no sink write, no preview write, no style write, no handler dispatch and
 *  no rebind. **THE READ-OUT THE SINK USED TO AUTHOR IS `renderPaneSize`'s NOW**, painted from the DELIVERY that
 *  carries the record's stored size (returned below and called by the shape's one subscription body), while
 *  `release`'s `R3` keeps its position and its signature for `demo/pane-drag-demo/demo.ts` — a realm with no
 *  crossing and no delivery to paint from (`D-118`). A clamped gesture figure written into a rendered node
 *  beside `['panes']` at `file` was the SECOND AUTHORITY; the record wins every arm the two can disagree in. */

export function startGutterAffordance (runtime: Runtime): {
  /** **THE ONE READING THIS WIRING NOW RETURNS, AND IT HAS A READER** (`D-117`). A REFUSED `attach()`
   *  is the DECLARED silent failure the affordance cannot report itself: it returns `false`, the drag
   *  is INERT, and every later gesture is a no-op nobody hears. `main()` reads this member to say so.
   *  **THE `writes` ARRAY THIS SIGNATURE ALSO CARRIED IS DELETED** (`D-117`): it recorded every commit
   *  with the runtime's own status so a refusal would be a visible reading, and `main()` discarded the
   *  whole return value, so the record had NO reader and the visibility it existed for was never
   *  delivered — a refusal is made visible AT THE TURN THAT TOOK IT, and that turn is `renderPaneSize`'s
   *  `console.error` now (the sink closure's ONE surviving virtue), as it always was. */
  readonly attached: boolean
  /** **THE GHOST TURN, HANDED OUT** (`D-138`, `D-144`; design §1): the composition's `renderGhost` member,
   *  RETURNED rather than called here, because the delivery that drives it is the SHAPE's —
   *  `startViewShape`'s ONE subscription body calls it beside `theme?.apply()`, and `main()` is what
   *  hands it over. The composition registers NO subscriber of its own, so this return value is the
   *  whole of the wiring between the delivery and the declared transient. */
  readonly renderGhost: () => void
  /** **THE READ-OUT'S TURN, HANDED OUT** (`D-129`; design §4 `S1`–`S4`): the DELETED sink's successor, and
   *  `#gutter-status`'s one writer from here on. It is RETURNED for the ghost turn's reason — the delivery
   *  that drives it is the shape's — and `main()` hands it to `startViewShape` as its THIRD turn, so ONE
   *  subscription body repaints the appearance, the transient and the read-out and no second subscription
   *  is taken (`D-90`, `D-126`). **IT READS THE SHAPE AND NEVER THE GESTURE**: the value is the record's
   *  stored `paneSizeOf(DEFAULT_PANE_ID)`, the same member `startSizeOf` answers, so the read-out and the
   *  next gesture's start figure cannot disagree (`D-117`). */
  readonly renderPaneSize: () => void
} {
  const element = runtime.elementForNodeId(GUTTER_AFFORDANCE_ID)
  const target = runtime.elementForNodeId(GUTTER_TARGET_ID)
  const seams = gutterSeamExample()
  const source = domEventSource()
  /** **THE LIVE GESTURE'S GEOMETRY, BUILT ONCE FROM THE CROSSING** (`D-117`). `createPaneDrag` is the
   *  composition that reads `view.paneSizeOf`/`paneBoundsOf` and writes with `commitPane`; until this
   *  pass it had NO caller under `src/` and the app's live gesture went round it, reading the authored
   *  pane element's attributes through `gutterSeamExample`'s pair. The `source` is this wiring's own
   *  event source, which carries no `layout` member, so the composition's `renderZone` turn — a member
   *  the SHAPE's delivery calls — stays the declared no-op it is on a realm with no layout consumer.
   *  CONSTRUCTED HERE AND NOT PER GESTURE, and it reads nothing: every read is a caller turn.
   *  **AND IT IS HANDED THE PANE ELEMENT THE GHOST'S DECLARATION LANDS ON** (`D-144`): `target` is this
   *  function's own `elementForNodeId(GUTTER_TARGET_ID)` reading, the element the inline preview writes
   *  to, so the declared transient and the preview's style write land on ONE element and no second
   *  resolution exists. */
  const drag = createPaneDrag({ view: getViewClient(), ghostTarget: target }, source)
  const session = createGestureSession({
    source: source as never,
    // (i) THE NON-FORWARDING RECORDER: the session's own channel records and writes nothing, so
    // no second writer exists (`docs/specs/gutter.md` §0 ruling 1, `§4.4` S-11).
    commit: (): void => undefined,
  })
  /** **THE READ-OUT'S TURN — `#gutter-status` PAINTED FROM THE DELIVERY, WHICH IS THE WHOLE OF `D-129`'S `F3`**
   *  (`D-129`, `D-126`; design §4 `S1`–`S4`). It replaces the `write` closure this seat used to hand
   *  `release`, and the difference is AUTHORSHIP rather than shape: the sink wrote the GESTURE's CLAMPED
   *  figure into a rendered node beside `['panes']` at `file` — the read-out's SECOND AUTHORITY, which the
   *  record can falsify at a second boot, at a refused commit, at another writer's act and at a refusing
   *  release — while this turn reads the SHAPE and paints the figure the record itself carries. **THE APP
   *  HANDS `release` NO SINK AT ALL** (the seam's third argument is deleted below), and `R3` keeps its
   *  position for the demo realm's sake.
   *  `S1` — **NO PAINT WHERE THE FAMILY DID NOT ANSWER**: the gate is `shape().source.panes === 'record'`,
   *  the FAMILY's own arm and NOT `filled`, because `filled` only says that SOME reading landed while a
   *  `'default'` panes arm is a family the record did not answer — painting its figure would be `D-127`'s
   *  *failed read turned into a state*. The envelope's authored `content` then stands.
   *  `S2` — **THE VALUE IS THE RECORD'S, AND IT IS THE SAME MEMBER THE GESTURE READS**:
   *  `String(getViewClient().paneSizeOf(DEFAULT_PANE_ID))`, which is what `startSizeOf` answers, so the
   *  read-out and the next gesture's start figure cannot disagree (`D-117`). Its per-id default arm is
   *  not a second authority one level below `S1`: a `'record'` family that does not name the pane answers
   *  `paneGeometryIn`'s declared figure — the same derivation the gesture reads.
   *  `S3` — **THE STATE CHECK**: `authoredSettingOf(runtime, GUTTER_STATUS_ID)` — this realm's own authored
   *  read, the relation the appearance act's baseline already uses — asks whether the node already carries
   *  that `content`, and the write is SKIPPED where it does, so "not owed" means "the write would be a
   *  no-op" by construction and no binding remembers a paint.
   *  `S4` — ONE `state-slice` `content` write on the AUTHORED STATUS NODE, and a status but `'applied'`
   *  `console.error`ed: the deleted closure's ONE surviving virtue (`D-117`'s own visible-refusal half).
   *  **IT WRITES THE RECORD AT NO TIER, OPENS NO ROUTE, COMPOSES NO MEMBER AND ADDS NO SUBSCRIPTION**: it
   *  is a RENDER write of a value the delivery already carries, the class `theme?.apply()` is. */
  const renderPaneSize = (): void => {
    try {
      const client = getViewClient()
      // S1 — the family's own arm, never `filled`: a `'default'` panes family is one the record did not answer.
      if (client.shape().source.panes !== 'record') return
      // S2 — the record's stored figure, spelled exactly as the drag's `startSizeOf` reads it.
      const value = String(client.paneSizeOf(DEFAULT_PANE_ID))
      // S3 — the surface is asked, and nothing is remembered: a node already carrying this content owes no write.
      const authored = authoredSettingOf(runtime, GUTTER_STATUS_ID)
      if (authored.readable && authored.setting === value) return
      // S4 — ONE `state-slice` on the AUTHORED status node, and a refusal said out loud rather than swallowed.
      const answer = runtime.applyCommand({
        kind: 'state-slice',
        node: GUTTER_STATUS_ID,
        mutation: [{ targetProp: 'content', mode: 'replace', value }],
      })
      const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
      if (status !== 'applied') {
        // A REFUSAL IS A RECORDED READING, NEVER A SILENT NO-OP (L-5/ADV-GU-1). The demo's MCP
        // surface is the app graph itself (`provident.get_rendered_html`, `get_node_state`), so
        // this console reading is the operator/Debug-pane half of the same fact.
        console.error(`[provident-renderer] gutter read-out REFUSED (status=${status}) for node ${GUTTER_STATUS_ID}`)
      }
    } catch {
      // NOTHING ESCAPES THE DELIVERY: a hostile shape or runtime is the reading such a turn leaves standing
    }
  }
  /** **THE SEAT'S ONE KEY** (`D-138`, ASM-L3-2): ONE closure constant, handed to BOTH drag writes — the
   *  `commit` seam's `release` and the preview seam's two arms — so the app's ONE gesture is keyed ONE
   *  way and its ending is reached exactly once. It is the affordance ELEMENT's authored id, the id this
   *  closure already resolves; the HANDLE the `commit` seam is handed carries a NUMBER `id`, which is why
   *  the old `gestureIdOf` read retired rather than answering `''`. */
  const GESTURE_KEY: string = GUTTER_AFFORDANCE_ID
  /** **THE PREVIEW — THE DECLARED TRANSIENT INLINE-STYLE WRITE ON THE LIVE TARGET** (`§2.5` item 4,
   *  `§3.1` M-12; ADV-GU-2) **AND THE GESTURE'S ONE PREVIEW SEAM** (`D-138`; design §2 `P1`–`P5`). The
   *  as-filed form dispatched the affordance's OWN node through `write(element, …)` — a GRAPH WRITE on
   *  the handle the pointer is over, which is the NAMED HAZARD of `§2.5` item 5 (a preview-by-dispatch
   *  re-renders the graph mid-gesture), and it made the `target` option of this module read by NOTHING.
   *  The ruled form: one transient `style` declaration on the target element, so the target's rendered
   *  geometry follows the pointer during a drag; a non-finite value is never written (the module's own
   *  gate answers `null` before this seam is reached) and every revert arm (`reset`, `cancel`, the drop)
   *  calls the same seam with the PRE-DRAG size, so the target's geometry reverts with it. No element is
   *  created, no provident data is authored and the graph is not re-rendered.
   *  **THE STYLE WRITE IS ON EVERY ARM AND THE ROUTES ARE ADDED, NEVER SUBSTITUTED**: `P3` is this
   *  wiring's own presentation, then `P4`/`P5` read the AFFORDANCE'S OWN `valid` flag — `true` is an
   *  observed move's placement change and goes to `drag.move` (whose `M3` sends the ONE `commitDrag`),
   *  `false` is the revert `revertStateFor` builds for all three abandon arms and goes to `drag.cancel`
   *  (whose `E3` sends the ONE `clearDrag`). `valid` is a boolean, so there is no third arm, and no
   *  second listener on the gesture's events is registered here (`D-126`). **THE ORDER IS THE GATE**:
   *  `P1`/`P2` precede the routes, so a target with no usable `style` sends no route either. */
  const applyPreview = (state: unknown): void => {
    const holder = target as { readonly style?: { setProperty?: unknown } } | null | undefined
    if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
    const set = holder.style.setProperty
    if (typeof set !== 'function') return
    const value = (state as { readonly value?: unknown } | null | undefined)?.value
    if (typeof value !== 'number' || !Number.isFinite(value)) return
    ;(set as (property: string, text: string) => void).call(holder.style, 'width', `${String(value)}px`)
    const stateRecord = state as { readonly valid?: unknown } | null | undefined
    if (stateRecord?.valid === true) drag.move(GESTURE_KEY, state)
    if (stateRecord?.valid === false) drag.cancel(GESTURE_KEY)
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
    /** **THE PRE-DRAG SIZE AND THE BOUNDS PAIR ARE THE SHAPE'S, NOT THE ELEMENT'S** (`D-117`). They were
     *  `seams.startSizeOf`/`seams.boundsOf` — the authored pane's `size`/`min`/`max` attributes with the
     *  seam's own `100`/`{0…200}` fallbacks — and NOTHING in this path read `['panes']`. They are the
     *  composition's now: `readPaneSize`/`readPaneBounds`, answered off the crossing's shape at the pane
     *  id `paneIdOf` derives from THIS element, with the crossing's MEASURED DEFAULT for a pane the
     *  family does not name. **AND `startSizeOf` IS THE DEFAULT-SIZE TURN TOO**: the affordance's own
     *  controller reads its `defaultSizeFor` seam from the establishment answer this one seam produced
     *  (`P-GU-IM-2`: `startSizeOf` exactly once per gesture), so handing `drag.startSizeOf` hands both
     *  turns, and `createPaneDrag.defaultSizeFor` — the same `readPaneSize` closure under the family's
     *  own name for that turn — has no separate consumer here for exactly that reason.
     *  `resizableOf` STAYS the example's: resizability is the authored pane's declaration, not a member
     *  of the panes family, and the family declares none to read. */
    startSizeOf: (el: unknown, token: unknown): unknown => drag.startSizeOf(el, token),
    boundsOf: (el: unknown, token: unknown): unknown => drag.boundsOf(el, token),
    resizableOf: seams.resizableOf,
    moveTypeOf: (): unknown => POINTER_TYPES.move,
    /** **THE COMPOSITION'S ONE END-TURN IS `release`, AND THE APP HANDS IT NO SINK** (`D-117`, `D-138`,
     *  `D-129`): ONE `commitPane(DEFAULT_PANE_ID, {size})` across the crossing, then its OWN ending of the
     *  drag family the moves wrote. That is `release`'s own contract at `R4`/`R5` — **`R3` IS STILL THERE AND
     *  IS STILL FIRST, but this realm passes it NOTHING**, because the read-out it used to author is
     *  `renderPaneSize`'s now, painted from the delivery (design §5). `release`'s STEPS are unmoved and its third
     *  parameter is widened to OPTIONAL at `PaneDragSurface`'s own declaration, which is what lets THIS call omit it
     *  while `demo/pane-drag-demo/demo.ts` — a realm with no crossing and no delivery to paint from — still supplies
     *  one and still compiles (`D-118`). Two changes and only two: the gesture id it hands the turn is the closure's
     *  ONE constant `GESTURE_KEY`, never a read of the handle's numeric `id` (`gestureIdOf` is RETIRED), and
     *  the THIRD ARGUMENT is gone. It stays an INLINE PROPERTY of this literal on purpose:
     *  `tests/pane-drag-compliance.test.ts`'s `D-117/LIVE-READ` probes this exact form, so hoisting it to a
     *  `const` would red a gating row. */
    commit: (gesture, value): void => {
      drag.release(GESTURE_KEY, value)
    },
  })
  const attached = affordance.attach()
  return { attached, renderGhost: drag.renderGhost, renderPaneSize }
}

/** **THE FIVE `data.*` ROUTES' ANSWER SITE IN THIS REALM** (`D-112`; `docs/L2/central-data/interface.md` §5). The arm hands
 *  the caller's payload — VERBATIM, unwrapped, no member read — to the preload member of the same name, so a bridge request
 *  and the `provident.data.*` tool of that name reach ONE adapter (`src/main/data/surface.ts`) and can carry no two answers;
 *  the shape that comes back is §2's, `repaired` and `log` included (D-103, D-105, D-107). **NOTHING IS COMPOSED HERE**: no
 *  path, no tier and no value is read, defaulted or re-spelled, because a route that composed an address would be a second
 *  authority over the register.
 *
 *  **A REALM WITH NO `data` MEMBER GETS A STATED REFUSAL AND NOT A THROW, AND IT MINTS NO THIRTEENTH REASON WORD.** The three
 *  realms the client roles beside this one answer `absent` in — the node suite's layout-less shim, a page loaded without the
 *  preload, an older bridge predating the crossing — are the same three that would reach these arms, and §2's closed
 *  vocabulary has no `absent` arm for a route. So the arm answers the ledger's own `store-unreachable`, which is exactly
 *  the claim being made (there is no store this realm can reach) and which is answered *before any store is consulted* in
 *  its declared sense too (`interface.md` §1); the sentence names the missing member, so a reader is told which half is
 *  absent. `bridge-route.test.ts` drives this arm beside the five. */
function dataRoute(verb: 'read' | 'write' | 'delete' | 'list' | 'journal', payload: unknown): Promise<unknown> {
  const member = typeof window === 'undefined' ? undefined : window.provident?.data
  if (member === undefined) {
    return Promise.resolve({
      status: 'refused',
      reason: 'store-unreachable',
      message: 'no `data` member on the preload bridge: this realm has no route to the profile register, so no store was consulted',
    })
  }
  switch (verb) {
    case 'read': return member.read(payload)
    case 'write': return member.write(payload)
    case 'delete': return member.delete(payload)
    case 'list': return member.list(payload)
    case 'journal': return member.journal(payload)
  }
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
        // U-FOCUS-TOOL (`F3`) — **THE ACT'S ONE ENTRY** (`D-142`, L2 §1): the case keeps its quoted label and its `RpcMethod`
        // member and its whole body is the route below — AWAITED, because the act reads, writes and re-reads. The route
        // writes the TAB RECORD through the existing `data.write` passthrough, so the record's own listener delivers the
        // change (`IPC_TABS_CHANGED` → `tabs.onChanged` → the client re-reads) and this method still adds nothing to
        // `MUTATING_METHODS`: the app-graph push predicate is unchanged and no second signal is invented (`D-137`, `D-112`).
        case 'focus':
          value = await focusActRoute(req.payload)
          break
        // ═══ THE FIVE `data.*` ARMS (`D-112`) ═══ Each hands off to the bridge and composes nothing (`dataRoute`'s own
        // docblock carries the four clauses). **NONE OF THEM JOINS `MUTATING_METHODS`**: that predicate's declared meaning is
        // "the MCP methods that mutate the APP GRAPH" and its consequence is ONE `mcp://provident/app` resource-updated push
        // — a `data.*` write moves the PROFILE register and adds no graph node (`interface.md` §7), so a push here would
        // announce a resource that did not change; and where a write lands at a root a crossing declares, THAT FAMILY's
        // listener already delivers it, so a second signal would be a duplicate of the first.
        case 'data.read':
          value = await dataRoute('read', req.payload)
          break
        case 'data.write':
          value = await dataRoute('write', req.payload)
          break
        case 'data.delete':
          value = await dataRoute('delete', req.payload)
          break
        case 'data.list':
          value = await dataRoute('list', req.payload)
          break
        case 'data.journal':
          value = await dataRoute('journal', req.payload)
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

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE `focus` ACT — THE CARRIER'S SUCCESSOR (`D-142`; `docs/L3/renderer-wiring/design.md` §2/§3).
 *
 * WHAT STOOD HERE, AND WHY IT WENT WHOLE (L2 §4, `D-142`): the `focus` route with its mirror read
 * (`mirrorStateOf`), its payload-carried projection arm (`tabListProjectionOf` / `projectionAnswerOf`), the retained
 * model's transition call (`focusTransition`), the `focusOrder` echo (`carriedEntryIds`), the holder's own resolution
 * (`resolveForHolder`) and the whole answer assembly (`answerForCarrier`, `standingAnswer`, the route's own body) — every
 * one of them reading the `['focus']` mirror at `mem`, a family this unit DELETES WHOLE. **NONE OF THEM IS RE-DECLARED**:
 * the act is `focusActRoute`, the ONE ROW it writes is `rowForSeat`'s, and the answer is the tab client's own reading
 * (`signatures.md` §5 — a name L4 finds inconvenient is a design finding, never a local invention, `D-45`).
 *
 * THE ACT, IN ONE LINE: take the realm's ONE committed reading of `['tabs']` through `getTabsClient()`, seat the caller's
 * row in the RECORD's own terms, write the ONE ROW `rowForSeat` answers at `['tabs', row.id]` at `file` through the
 * EXISTING `dataRoute` passthrough, and answer the record as RE-READ after the write with the store's judgement beside it
 * (`ASM-2`, `D-136`, `D-137`). **THE ACT NAMES NO OTHER ROW AT ALL, WHICH IS WHY NO `active: false` IS WRITTEN HERE**: one
 * leaf row write at the row's own address cannot drop a sibling (`D-138`), the `'seat'` repair appends an opened id to
 * `order` and `healRecord` deactivates the standing active row — both inside the caller's own commit (`ASM-3`, `D-129`,
 * `D-142`, `D-158`, `D-159`).
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE ACT'S ANSWER (`ASM-2`, `D-142`)**: the record as re-read after the write, with the store's judgement beside it.
 *  **IT IS FLAT, AND THAT IS THE POINT**: the reading's own members (`status`, `order`, `landing`, `rows`, `witness`) carry
 *  the record and `refused` rides BESIDE them, so the two `status` members cannot collide on one key. */
export type FocusActAnswer = TabsClientReading & { readonly refused?: FocusRefusal }

/** **`refused` IS PRESENT ON EVERY ARM THAT ANSWERS A REFUSAL, AND ON NO OTHER — absent exactly where NOTHING was refused**
 *  (`D-136`, `D-127`, L2 §2): S3, S5 and S7 answer `withRefusal(...)` and S11 puts the store's arm beside the re-read, while S4
 *  answers the bare reading and a landed write answers `after` — a write is what this member may REPORT, never what puts it there. */
export interface FocusRefusal {
  readonly status: 'refused'
  readonly reason: string
  readonly message: string
  readonly storeStatus?: string
  readonly path?: readonly (string | number)[]
  readonly log?: readonly unknown[]
}

/** **THE SEAT THE ROUTE RESOLVED, IN THE RECORD'S OWN TERMS** (`ASM-1`, `D-142`): a standing row (`seat` — the caller's
 *  string named a row's own `target`, and the arm CARRIES THE ROW it resolved), the row an OPEN mints (`open`, carrying
 *  the caller's `target`), or no row at all (`unresolved`, S7's arm). **THE SEAT ARM CARRIES THE ROW AND NOT ITS ID**
 *  (`D-158`, `signatures.md` §3): `seatOf` found the row in `reading.rows`, so a second lookup could miss a row the record
 *  does not hold and no default could be invented for one — the id is the row's own rather than a second spelling of it. */
export type FocusSeat =
  | { readonly kind: 'seat'; readonly row: TabsRecordRow }
  | { readonly kind: 'open'; readonly id: string; readonly target: string }
  | { readonly kind: 'unresolved' }

/** THE THREE ARMS THAT ARE NOT A RECORD (`D-127`, L2 §3's third arm): `reason` exists on each, which is why S3's parameter is
 *  NARROWED and never `TabsClientReading` whole — the committed arm carries no `reason` (`tabs-client.ts:56`). */
type UnreadableReading = Exclude<TabsClientReading, { readonly status: 'committed' }>

/** **S7's ARM, MADE UNREPRESENTABLE RATHER THAN GUARDED** (`signatures.md` §3, `D-45`): the route answers an unresolved seat
 *  BEFORE any write, so the row builder takes this narrowed pair — the `UnreadableReading` idiom — and the composition's
 *  third arm has no subject left. */
export type ActedSeat = Exclude<FocusSeat, { readonly kind: 'unresolved' }>

/** **THE ONE SURVIVING FUNCTION OF THE COMPOSITION — THE ROW THIS ACT WRITES, AND NOTHING ELSE** (`D-158`, `D-159`,
 *  `design.md` §3). It reads no store, calls no route and holds nothing between calls; **its ONE input beside its argument
 *  is the CLOCK, read ONCE per call** — `lastActiveAt` is `new Date().toISOString()` at the call, the third input the
 *  composition that stood here never admitted while `C3` read it.
 *   · the SWITCH arm — `{...seat.row, active: true, lastActiveAt}`: the reading's row WHOLE, so `error`/`label` travel exactly
 *     as carried and no member of it can be dropped (`D-76`), with the instant stamped for the `tab-has-lastActiveAt` pair;
 *   · the OPEN arm — `{id: seat.id, target: seat.target, active: true, lastActiveAt}`: NO `label`, because the record's three
 *     field pairs fill it in BOTH `healedFamily` scopes, and NO `error`, because nobody fills one — `error` is an OPTIONAL
 *     member, so a tab that has not failed carries none and a local default would be a key the act forbids (`D-158`);
 *   · and NOTHING ELSE: NO third arm, NO `order`, NO `landing`, no seat id, no standing active row and no other row — the
 *     value is the record's own `TabsRecordRow`, written at `['tabs', seat.row.id]`, one address, one row (`D-136`, `D-142`). */
export function rowForSeat(seat: ActedSeat): TabsRecordRow {
  const lastActiveAt = new Date().toISOString()
  return seat.kind === 'open'
    ? { id: seat.id, target: seat.target, active: true, lastActiveAt }
    : { ...seat.row, active: true, lastActiveAt }
}

/** **S6 — THE SEAT, IN THE RECORD'S OWN TERMS** (`D-142`, `ASM-1`): the FIRST row in `reading.order` whose `target`
 *  matches the caller's string is the seat (`{kind:'seat', row}` — **and it answers THE ROW IT RESOLVED**, so no lookup is
 *  repeated downstream and no default is invented for a row the record does not hold, `D-158`), and nothing about that
 *  row's identity moves — the caller's string names a row's CONTENT REFERENCE and never an id, so there is no second
 *  identity rule here. No row matches and `newTab === true` OPENS one; no row matches and `newTab` is not `true` is
 *  `unresolved` (S7), because opening a row there would empty `newTab: true` of its declared meaning (`D-18`, L2 §4).
 *
 *  **THE OPENED ROW'S ID IS MINTED, NEVER THE CALLER'S TARGET** (`ASM-1`, `D-142`): candidate `tab-<n>` from
 *  `n = order.length + 1` upward, accepted by the EXISTING `mintTabId(order, candidate)` — whose three reasons
 *  (`malformed-row`, `seat-name`, `duplicate-id`) are REUSED and never re-spelled. Termination is by argument:
 *  `tab-<n>` is never the record's seat name, and only finitely many candidates are members of a finite `order`. */
function seatOf(reading: TabsCommittedAnswer, target: string, opens: boolean): FocusSeat {
  for (const id of reading.order) {
    const row = reading.rows.find((candidate) => candidate.id === id)
    if (row !== undefined && row.target === target) return { kind: 'seat', row }
  }
  if (!opens) return { kind: 'unresolved' }
  for (let n = reading.order.length + 1; ; n += 1) {
    const mint = mintTabId(reading.order, `tab-${String(n)}`)
    if (mint.ok && mint.id !== null) return { kind: 'open', id: mint.id, target }
  }
}

/** **A READING WITH THE STORE'S JUDGEMENT BESIDE IT** (`ASM-2`, `signatures.md` §1): the record that stands, and `refused`
 *  riding BESIDE it — never a success converted out of a refusal and never a refusal of the record. */
function withRefusal(reading: TabsClientReading, refusal: FocusRefusal): FocusActAnswer {
  return { ...reading, refused: refusal }
}

/** **S3 — A READING THAT IS NOT `committed` IS NOT A RECORD** (`D-127`, L2 §3's third arm): `absent`, `unread` and `refused`
 *  supply no rows, so the route refuses rather than composing over a state the realm never read — and it MINTS NO WORD:
 *  this carries the READING's OWN `reason`, from the client's closed set (`tabs-client.ts`'s `TabsClientReading`:
 *  `no-tabs-member`, `no-read-route`, `route-threw`, `answer-not-declared`, or the store's own on a `refused` arm), and the
 *  reading travels as the answer's report of what it could not read. */
function unreadableOf(reading: UnreadableReading): FocusRefusal {
  return {
    status: 'refused',
    reason: reading.reason,
    message: `the tab record answered '${reading.status}', so this realm holds no record to compose over`,
  }
}

/** **S5 — A `target` THAT IS NOT A STRING IS THIS ROUTE'S OWN REFUSAL, AND THE TOOL'S OWN CLASS IS ITS ARGUMENT HOLDER'S**
 *  (`D-112`, `D-105`, `D-142`): a row's `target` is a string (`TabsRecordRow`), so no other value can be written as a row and
 *  NO STORE IS ASKED. **THE TOOL'S OWN REFUSAL IS ITS ARGUMENTS'** — a `TypeError` raised in `focusHandler`'s argument holder
 *  BEFORE any invoke, judging the HOLDER and never a member's VALUE — so the word this arm answers is the ROUTE's, borrowed
 *  from the `data` ledger (`malformed-arguments`, `src/main/data/types.ts`). The parameter states the arm's subject and is read
 *  nowhere below: the declared sentence names the RULE and echoes no caller value. */
function malformed(target: unknown): FocusRefusal {
  void target
  return {
    status: 'refused',
    reason: 'malformed-arguments',
    message: "provident.focus: a tab row's `target` is a string, so a non-string target can be no row",
  }
}

/** **S7 — NO STANDING ROW CARRIES THE TARGET AND NO OPEN WAS ASKED FOR** (`D-18`, L2 §4): the route writes NOTHING and answers the
 *  record as read beside a reason of its OWN, `target-absent` — L2 §4 fixes that the route answers "a refusal reason of its
 *  own", so `signatures.md` §3 names it. */
function absentTarget(target: string): FocusRefusal {
  return {
    status: 'refused',
    reason: 'target-absent',
    message: `provident.focus: no standing row carries '${target}' and newTab is not true, so no row is opened`,
  }
}

/** **S10/S11 — THE STORE'S JUDGEMENT, CARRIED MEMBER FOR MEMBER, OR `null`**: a `data.write` answer's refusal arm
 *  (`status`, `reason`, `message`, plus `storeStatus`/`path`/`log` where the writer answered them — `DataLedger`, `src/main/data/types.ts`) passes THROUGH, member for member, nothing minted;
 *  every other answer — the `committed` receipt, and a realm with no `data` member alike — answers `null`, because a write
 *  that was not refused is not a refusal. */
function refusalOf(written: unknown): FocusRefusal | null {
  if (written === null || typeof written !== 'object') return null
  const answer = written as Record<string, unknown> ; if (answer['status'] !== 'refused') return null
  const { reason, message, storeStatus, path, log } = answer
  if (typeof reason !== 'string' || typeof message !== 'string') return null
  return { status: 'refused', reason, message,
    ...(typeof storeStatus === 'string' ? { storeStatus } : {}), ...(Array.isArray(path) ? { path: path as readonly (string | number)[] } : {}),
    ...(Array.isArray(log) ? { log } : {}) }
}

/** **THE ACT — THIS MODULE'S ONE BODY FOR `provident.focus`** (`D-142`, `docs/L3/renderer-wiring/design.md` §2). It is
 *  TOTAL: every arm answers a value and none throws, so no caller wraps an IPC turn in a `try` (`D-127`, L2 §2).
 *
 *  S1  the argument space, and its shape GUARDED rather than trusted: `caller` is an object and `hasTarget` reads it, so
 *      `'target' in <non-object>` is never attempted; `opens` is `newTab === true` with no default and no coercion (a third
 *      own key and a non-object payload are `focusHandler`'s refusal BEFORE the seam, `D-18`, `D-137`);
 *  S2  ONE reading, through the realm's own client (`getTabsClient()`) — never a direct `window.provident.tabs.read()`;
 *  S3  a reading that is not `committed` refuses and writes NOTHING (`D-127`);
 *  S4  an act naming no row has no act: the record as it stands IS the answer, and no write is attempted;
 *  S5  a `target` that can be no row is THIS ROUTE's own refusal, and no store is asked — the tool's own class is its
 *      argument holder's (`focusHandler`), which judges the holder and never a member's value;
 *  S6  the seat in the RECORD's own terms — `seatOf` answers the row it resolved, never a second lookup (`D-158`);
 *  S7  no standing row carries it and no open was asked for: refusal of the route's own, and no write (`D-18`, L2 §4);
 *  S8  ONE ROW, ONE passthrough, NO RETRY: `rowForSeat(seat)` is the act's WHOLE product and it is handed on VERBATIM —
 *      `['tabs', row.id]` is the row's own address, `file` the record's own tier, the one the declared-root guard admits
 *      (`D-101`, `D-112`, `D-136`) — so one store verb, one commit, one delivery, and no member re-spelled;
 *  S9  the record as RE-READ after the write: what STANDS is the repair's answer, not the value sent nor its ledger, and
 *      this re-read is the ANSWER's — it is NOT a delivery and does not feed `holdTabsReading` (`ASM-2`, `D-137`) — and it
 *      is owed MORE than before, because the act can predict neither the `'seat'` repair's append position nor the survivor
 *      `exactly-one-active` keeps (`D-158`, `D-159`);
 *  S10/S11  the store's judgement rides beside it as `refused`, carried verbatim and never converted into a success. */
async function focusActRoute(payload: unknown): Promise<FocusActAnswer> {
  const caller = payload !== null && typeof payload === 'object' ? (payload as Record<string, unknown>) : {}
  const hasTarget = 'target' in caller
  const target: unknown = caller['target']
  const opens = caller['newTab'] === true
  const reading = await getTabsClient().read()
  if (reading.status !== 'committed') return withRefusal(reading, unreadableOf(reading))
  if (!hasTarget) return reading
  if (typeof target !== 'string') return withRefusal(reading, malformed(target))
  const seat = seatOf(reading, target, opens)
  if (seat.kind === 'unresolved') return withRefusal(reading, absentTarget(target))
  const row = rowForSeat(seat)
  const written = await dataRoute('write', { path: ['tabs', row.id], tier: 'file', value: row })
  const after = await getTabsClient().read()
  const refusal = refusalOf(written)
  return refusal === null ? after : withRefusal(after, refusal)
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
  // three that ran strictly between the operator-config read and the runtime's own construction — so every step that
  // remains keeps its relative order, and the boot anchor the notes above name is the step that still STANDS
  // (`new Runtime(...)` and `bootstrap()` below), never a carrier (`D-142`).
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
  // tab-record name OUTSIDE `T2` §5.1 item 1's declared record region. **THE BATTERY THAT ONCE READ THAT RULE IS RETIRED
  // WITH ITS REFERENT** (`D-9`): `tests/store-focus.test.ts` and its `S22-1` row (measured 2026-11-02: the literal here was
  // the ONE reference outside that region) are gone from this tree, so the claim now rests on `TABS_SEAT_NAME`'s own
  // docblock above — the file's one spelling of the record's seat — and on no citation of a file that does not exist
  // (`D-142`). **WHY IT IS GONE, IN ONE PARAGRAPH.** A boot step is an IMPERATIVE WRITE, and D-82's clause 3
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
  // ⟶ **THE FOCUS CARRIER'S BOOT CONSTRUCTION IS DELETED HERE AND NOTHING REPLACES IT** (`D-142`, L2 §4). The carrier was
  //    what an MCP `focus` call reached; the act is reached by NO boot step now — it takes the tab client the realm holds
  //    (`getTabsClient()`, constructed on demand, exactly as this file's other clients are) and writes the record through
  //    the existing `data.write` passthrough. So the boot mints nothing, registers nothing and its step list only SHORTENS:
  //    no traced step moves (`tests/e2e/bundle-boot-seam`'s `B-5` reads the trace's ORDER against `bridge.ready()`).
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
  // ⟶ THE GUTTER WIRING (`U-GUTTER-UI`): attaches AFTER the first envelope load — its pre-drag read
  // now hits an in-realm tier (NO crossing, §2.9 item 1). It is part of the
  // APP UI and exists with or without the preload bridge (only the MCP endpoints need it).
  // **AND ITS ONE RETURNED READING IS READ HERE** (`D-117`): a REFUSED `attach()` returns `false` and the
  // affordance is then INERT — every later gesture is a no-op — so the failure is said out loud at the
  // one site that can say it. Before this pass the call's value was discarded whole and the `writes`
  // array it also returned had no reader at all.
  const gutter = startGutterAffordance(runtime)
  if (!gutter.attached) {
    console.error(`[provident-renderer] the gutter affordance did NOT attach — the pane drag is inert (handle ${GUTTER_AFFORDANCE_ID})`)
  }
  // ⟶ **THE APPEARANCE APPLICATION (`D-97`)** — constructed here, ONCE, after the first envelope load so the authored state
  //    node exists: `themeWiringRole` derives the caller-held attribute name and the authored carrier's id, and the returned
  //    pair of turns is the app's ONE application site. **IT READS NOTHING AND WRITES NOTHING AT THIS SITE** — `D-96`'s boot
  //    read is deleted with its drive (`D-97`) — and it adds no subscription, no timer and no boot step that
  //    `tests/e2e/bundle-boot-seam`'s `B-5` could read as an order move.
  const themeApplication = startThemeApplication(runtime)
  // **AND ITS DOM-ORIGINATED TURN IS ATTACHED HERE (`D-126`)** — the same site and for the same reason the overlay's
  // `attach()` is called below: after the first envelope load, so the authored controls exist. It installs two listeners
  // and changes no node, so no boot step moves and `npm run divergence` (which compares the two realms' SSR fragments
  // before any act) cannot see it. **ITS ONE RETURNED READING IS READ, the gutter's own rule above (`D-117`)**: a control
  // this realm could not resolve is an act a human cannot perform, and the failure is said out loud at the one site that
  // can say it, rather than left to be inferred from a click that did nothing.
  const appearanceAttached = themeApplication.attach()
  if (appearanceAttached.attached === 0) {
    console.error('[provident-renderer] the appearance controls did NOT attach — a real click on the theme card reaches no store (an agent\'s dispatch still rides the reply path)')
  }
  // ⟶ **THE OVERLAY'S CONSUMER (`D-113`)** — the mechanism `src/shared/overlay.ts` was owed, constructed here for the
  //    reason the appearance application above is: ONCE, after the first envelope load, so the authored app root, the
  //    authored state carrier and the three authored controls all exist. **IT READS NOTHING AND WRITES NOTHING AT THIS
  //    SITE** — `attach()` installs three listeners on graph-resolved elements and changes no node, so no boot step moves
  //    and `npm run divergence` (which compares the two realms' SSR fragments before any act) cannot see it. The
  //    transition and the inert declaration are the REPLY route's turn, beside the appearance act.
  //  **AND ITS CROSSING IS THE STORE'S, IN BOTH DIRECTIONS** (`D-125`, correcting `D-124`'s direction): the user's act
  //  writes ONE boolean at `['operator-pane']` over `security.setPane`, and the pane RENDERS from the store's word as the
  //  realm's ONE security subscription delivers it (`startSecurityShape`'s body below, which is the same subscription the
  //  record's own re-read rides). **THE WRITE'S ANSWER IS NOT READ HERE AND NO LOCAL MACHINE MOVES FIRST**: the store's
  //  constraint settles the ports, its delivery closes the socket and re-patches the gate, and the pane's own delivery is
  //  what this realm renders. A realm with no bridge has no crossing to read or write, which is the honest arm for a page
  //  with none.
  const overlayApplication = startOverlayApplication(runtime, {
    pane: {
      open: () => { const shape = getSecurityClient().shape(); return shape.filled && shape.pane !== null ? shape.pane.open : null },
      write: (open) => { void bridge?.security?.setPane(open) },
    },
  })
  overlayApplication.attach()
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
      // ⟶ **THE OVERLAY'S ACT RIDES THE SAME PUSH (`D-113`).** A dispatch at the authored opener, the close control, the
      //    scrim or the dialog's escape handler has just written the caller's VERB token into the authored state node;
      //    this turn reads it, hands it to `overlayTransition`, and — only when the state MOVED — writes the mechanism's
      //    inert declaration to the authored app root as ONE `state-slice`. A reply that moved no token sends nothing.
      overlayApplication.drive()
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
  // **AND THE SECOND ARGUMENT IS THE GHOST TURN** (`D-138`, `D-144`): `gutter` is `startGutterAffordance(runtime)`'s
  // reading above, and its `renderGhost` member is the composition's own turn — handed HERE so the ONE delivery calls it
  // beside the appearance application. No new registration, no new boot step and nothing awaited: the turn runs inside the
  // subscription body the shape already owns.
  // **AND THE THIRD ARGUMENT IS THE READ-OUT'S TURN** (`D-129`; design §1, §4 `S1`–`S4`): `gutter.renderPaneSize` is the
  // DELETED sink's successor — the delivery paints `#gutter-status` from the record's stored size instead of the gesture
  // writing its clamped figure into a rendered node. One hand-over, one subscription body, three rendered values; the
  // composition registers nothing and no second subscription is taken (`D-90`, `D-92` `M-4`).
  startViewShape(themeApplication, gutter.renderGhost, gutter.renderPaneSize)
  // ⟶ **THE APP-STATE ROWS' SHAPE (`D-104`; `D-82`'s `V3`)** — the pane that displays the module registry is filled from a
  //    DELIVERY from here on, and the request-time read `panels.refresh()` used to make is deleted. Started LAST and never
  //    awaited, for the reason the two sites above it are: every boot step including `bridge.ready()` has already run, so no
  //    step's order moves and a slow or failing crossing cannot delay or fail the boot.
  startAppStateShape(panels)
  // ⟶ **THE SECURITY RECORD'S SHAPE (`D-106`)** — the pane's `cfg` is filled from a DELIVERY from here on, and the
  //    request-time read `panels.refresh()` made at the boot, after every authored click and at the `dispatch()` seam is
  //    deleted. Started beside the three above and never awaited, for their reason.
  startSecurityShape(panels, overlayApplication)
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
 * one, and it is a GATE's: `new Runtime(...)`/`bootstrap()` → `startGutterAffordance` → the appearance application and the
 * overlay's `attach()` → `bridge.ready()`, with `tests/e2e/bundle-boot-seam/`'s `B-5` asserting the bundle-boot trace's
 * ORDER rather than a duration. **The anchor is the step that still STANDS** (`D-142`): the deleted `hydrate`/carrier
 * steps of the frozen-store boot are named nowhere here, so a reader is never sent looking for a boot step this file no
 * longer runs. An `await`
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
 *  the answer and to let the record drive the two authored terminals. **THE HELD READING IS THE DRIVE'S INPUT**
 *  (`D-117`): the pages are driven FROM `tabsClientReading`, so the binding has a reader here rather than being a copy of
 *  the argument that shadowed it, and nothing else in this file writes either one. */
function holdTabsReading(reading: TabsClientReading, runtime: TabsPageRuntime | null): void {
  tabsClientReading = reading
  // **THE DRIVE IS MADE FROM THE HELD READING AND NOT FROM ITS ARGUMENT** (`D-117`). The two were the same
  // value, but only one of them had a reader: `tabsClientReading` was written here and at the defect arm
  // below and READ NOWHERE, so it named nothing (`D-70`). Reading the binding here is what the comment
  // above the declaration already claimed — "`tabsPagesReading` is what the drive made of the LAST
  // READING" — and it makes the two statements about a read one pair rather than a pairing and a copy.
  tabsPagesReading = driveTabsLandingPage(tabsClientReading, runtime)
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
      // **AND IT IS SAID OUT LOUD** (`D-117`): this arm's only effect used to be a write to a binding
      // nothing read, so a rejected boot read was silent everywhere — the held value is now described
      // through the SAME reader the boot's info line uses, which is what makes the arm observable.
      tabsClientReading = { status: 'unread', reason: 'route-threw', detail: String(error) }
      console.error(`[provident-renderer] tabs client: ${describeTabsReading(tabsClientReading)}`)
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
function startSecurityShape(panels: SecurePanels | null, overlay?: OverlayApplication | null): void {
  const client = getSecurityClient()
  securitySubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and the shape is what the consumer paints.
    panels?.applySecurity(client.shape())
    // **AND IT IS THE OVERLAY'S RENDER** (`D-125`): the pane is a LISTENER'S PRODUCT, so the turn that applies the
    // mechanism's `inert` declaration is this one — the delivery that carried the store's `{open}` word. The wiring holds
    // no subscription of its own: one consumer per push is the rule the drag composition states (`D-92`), and a second
    // registration would be a second read per delivery for a value this one already carries.
    try {
      overlay?.render()
    } catch {
      /* the consumer's own throw is the consumer's: a failed render is not a failed delivery */
    }
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
 *  crossing's push, the client re-reads, and the record's declaration lands on the authored node then.
 *
 *  **AND THE SECOND ARGUMENT IS THE GHOST'S DELIVERY** (`D-138`, `D-144`; design §3, `DC-8(b)`): the body calls the
 *  composition's `renderGhost` turn BESIDE `theme?.apply()`, so one delivery re-reads the record once and then repaints
 *  the drag's declared transient from `['drag']`'s own node. The turn is a MEMBER the wiring handed out —
 *  `startGutterAffordance`'s return value — because THIS function is the shape's ONE subscription and the composition
 *  registers no second consumer of the push (`D-92` `M-4`, `D-126`). A realm whose gutter did not attach still holds a
 *  turn; it answers the declared degradation and paints nothing.
 *
 *  **AND THE THIRD ARGUMENT IS THE READ-OUT'S TURN, CALLED THIRD IN THE ONE BODY** (`D-129`; design §1, §4 `S1`–`S4`):
 *  `gutter.renderPaneSize` paints `#gutter-status` from the record's stored size when the panes family answered, and the
 *  sink that used to write it keeps no write at all. **NO SECOND SUBSCRIPTION IS TAKEN** (`D-90`): one body drives the
 *  appearance, the transient and the read-out, in that order, and each turn is total — a hostile shape is a reading each
 *  of them leaves standing, never an exception out of the delivery.
 *
 *  **THE HEADER SPELLS `function startViewShape(` WITH NO SPACE**, because two probes in
 *  `tests/theme-declaration.test.ts` search that exact text; its `parameterNamesOf` arity row is `chrome`'s same-edit
 *  re-grain (`D-3`, `D-128`) — the third turn makes the count three. */
function startViewShape(theme: ThemeApplication | null, ghost: (() => void) | null, readout: (() => void) | null): void {
  const client = getViewClient()
  viewSubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and its appearance turn, then the ghost's, then the
    // read-out's. A record with no applicable declaration — the placeholder, which names no attribute — writes nothing,
    // so a delivery that moved another family costs one read and no appearance write; the ghost turn is the drag
    // address's own transient and asks its own route once; the read-out's turn paints the panes family's stored size
    // and skips the write where the authored status node already carries it.
    theme?.apply()
    ghost?.()
    readout?.()
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
    `${terminal.nodeId}: witness=${terminal.witness === null ? 'none' : terminal.witness} resolved=${terminal.resolved === null ? 'no' : 'yes'} `
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

/** **THE AUTHORED CONTROLS' IDS, DERIVED AND NEVER RE-SPELLED AT THE WIRING** (`D-126`) — `themeWiringRole`'s own
 *  discipline, applied to the pair the DOM-originated turn attaches to. A rename in the envelope therefore moves the ids
 *  this returns instead of leaving a second, silently staling spelling behind (`§3.4` R-4, `§2.4` item 2, ADV-TC-3).
 *
 *  **THE MARKER IS THE AUTHORED STRUCTURE AND NOT A NAME**: the controls are the `button` children of the card that
 *  carries the state node, that author a `props.value` — which is exactly what a control needs to hand the DOM bridge a
 *  token at all (`D-126`), so a control that could not carry its token is not one this turn can attach to. The walk
 *  keeps the PARENT because the card is the envelope's own grouping; nothing here counts, indexes or assumes order
 *  beyond the authored child order, and an envelope carrying neither returns `[]` rather than a fabricated id. */
function themeControlIds(): readonly string[] {
  interface Located {
    readonly node: Record<string, unknown>
    readonly parent: Record<string, unknown> | null
  }
  const queue: Located[] = [{ node: demoEnvelope().template.root as unknown as Record<string, unknown>, parent: null }]
  while (queue.length > 0) {
    const here = queue.shift() as Located
    const node = here.node
    const props = node['props'] as Record<string, unknown> | undefined
    const css = node['css'] as Record<string, unknown> | undefined
    const content = node['content']
    const isStateNode =
      props !== undefined && css !== undefined && props['id'] !== undefined && props['id'] === css['id'] &&
      (content === 'dark' || content === 'light')
    if (isStateNode) {
      const card = here.parent
      const kids = card === null ? undefined : card['children']
      if (!Array.isArray(kids)) return []
      const ids: string[] = []
      for (const kid of kids as Record<string, unknown>[]) {
        if (kid['type'] !== 'button') continue
        const kidProps = kid['props'] as Record<string, unknown> | undefined
        const kidCss = kid['css'] as Record<string, unknown> | undefined
        const value = kidProps === undefined ? undefined : kidProps['value']
        const id = kidCss === undefined ? undefined : kidCss['id']
        if (typeof value !== 'string' || typeof id !== 'string' || id === '') continue
        ids.push(id)
      }
      return ids
    }
    const kids = node['children']
    if (Array.isArray(kids)) for (const kid of kids as Record<string, unknown>[]) queue.push({ node: kid, parent: node })
  }
  return []
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
  /** **Whether a paint was OWED** — the authored surface did not already carry this declaration's own mutation
   *  (`D-129`; the member read *"moved since the last one applied"* while `lastApplied` stood, and that copy of a paint is
   *  what this pass deletes). */
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
  /** **THE DOM-ORIGINATED TURN** (`D-126`) — install the listeners that make a REAL CLICK the same act `commit()`
   *  carries. Returns the count installed, so the one site that can say a failure out loud can say it. */
  attach(): { readonly attached: number }
}

/** **THE AUTHORED SETTING AS THE GRAPH HOLDS IT, OR THE DECLARED UNREADABLE ANSWER** when the state node is absent, was
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

/** **THE SURFACE'S OWN MEMBER, ASKED AND NOT REMEMBERED** (`D-129`, `D-126`'s `F5`/`F9`; design §4) — `authoredSettingOf`'s
 *  twin, and the relation the two state-checked paints read instead of a copy of what they last wrote. It answers
 *  `runtime.nodeState(nodeId)`'s `states[0].props[name]` as `{readable, held}`, and it is **TOTAL**: a `''` node id, an
 *  absent node, an answer with no `states`, a `states[0]` carrying no `props` object, and a read that THROWS
 *  (`resolveTarget`'s own *unresolved target*) all answer `readable: false` and never propagate. A readable surface that
 *  simply lacks the member answers `held: undefined`, which is the fact a removal write would leave behind.
 *  **WHY IT IS NOT A SECOND AUTHORITY**: a copy of what was WRITTEN is a claim about the PAST that a graph-touching
 *  reply which REBUILDS the node falsifies, while this reads the state itself — the check stores nothing, and after this
 *  pass no binding in either application remembers a write. **AN ABSENCE-KEYED SKIP IS UNSOUND ON EVERY SURFACE** (`D-163`;
 *  design §6): an absent `held` is what a REBUILT node, a store-projected state AND a NOT-YET-APPLIED REMOVAL all look
 *  like, so a member's ABSENCE establishes nothing — only a POSITIVE SETTLED MATCH (`held.held === wanted`) may license a
 *  skip, and each site decides its removal arm BEFORE it calls this relation. **IT IS FAILED OPEN**: an unreadable surface
 *  paints, and the engine's own refusal then returns as the reading's `status` rather than as silence — the fail-open rule
 *  read at the arm where no match can be established at all. **THE COST IS NAMED, NOT HIDDEN**: where `wanted` is a VALUE,
 *  one `nodeState` read per site per delivery — the read-out asks one on every delivery its family allows, and each
 *  declaration asks one whenever its arm is the positive one — and each `nodeState` projects one node's states AND builds a
 *  whole-graph `census()`, so it is one graph walk per such site per delivery. **A REMOVAL
 *  DELIVERY TAKES NO READ AND COSTS ONE REDUNDANT IDEMPOTENT `state-slice`**, and it cannot loop because a renderer graph
 *  write raises no view push: it is a PRICE, not a defect, because the alternative is a pane the record closed with a DOM
 *  still carrying `inert` (`OV-12`, `OV-14`). The cheaper DOM read was refused on `D-130`'s measurement — the DOM is a
 *  flush BEHIND the `props` a write sets, so it could skip an owed paint — and that sentence is the same one that convicts
 *  a `props` read in the REMOVAL direction: the instrument was never the fault, the SKIP was too wide. */
function authoredPropOf(
  runtime: Runtime,
  nodeId: string,
  name: string,
): { readonly readable: boolean; readonly held: unknown } {
  if (nodeId === '') return { readable: false, held: undefined }
  try {
    const answer = runtime.nodeState(nodeId) as { readonly states?: readonly unknown[] } | null | undefined
    const states = answer?.states
    if (!Array.isArray(states) || states.length === 0) return { readable: false, held: undefined }
    const props = (states[0] as { readonly props?: unknown } | null | undefined)?.props
    if (props === null || typeof props !== 'object' || Array.isArray(props)) return { readable: false, held: undefined }
    return { readable: true, held: (props as Record<string, unknown>)[name] }
  } catch {
    return { readable: false, held: undefined }
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
  /** **`lastApplied` IS DELETED HERE** (`D-129`, `D-126`'s `F5`; design §4): it was a copy of the last declaration this
   *  realm WROTE — a claim about the past that a graph-touching reply which REBUILDS the authored node falsifies, because
   *  the node loses the declaration and the copy still says it was applied, so NOTHING repaints. What `applyTurn` asks
   *  instead is the SURFACE, through `authoredPropOf`: the check stores nothing, and after this pass no binding in this
   *  application remembers a write. **`lastCarried` STAYS** — it guards an ACT (whether the crossing has been asked the
   *  setting this realm read), which is a store question and never a copy of a paint. */

  const reading = (base: {
    readonly setting: string | null
    readonly changed: boolean
    readonly sent: boolean
    readonly declaration: { readonly name: string; readonly value: string; readonly removal: boolean } | null
    readonly declared: boolean
    readonly status: string | null
    readonly written: boolean
  }): ThemeApplicationReading => ({ nodeId, attributeName, ...base })

  // THE TWO TURNS ARE `const`s RATHER THAN OBJECT-LITERAL METHODS, because `attach()` below installs a listener
  // whose whole job is the FIRST of them: a DOM listener has to reach the same turn the reply path calls, and
  // capturing it is what keeps ONE implementation of the act instead of two that can drift.
  /** **THE ACT ITSELF, keyed on the SETTING it carries** — the one body both causes reach: the reply path's turn reads
   *  the setting off the AUTHORED CARRIER, and the DOM-originated turn is handed the setting the CLICK carried. Neither
   *  composes a declaration and neither awaits a receipt; the `changed` guard is what keeps a second cause from asking
   *  the crossing a question the first already answered. */
  const commitSetting = (setting: string): ThemeApplicationReading => {
    const changed = lastCarried === null || lastCarried.setting !== setting
    if (!changed) {
      return reading({ setting, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
    }
    // **THE ACT, SENT AS THE ACT** — the setting and the caller-held name, and no declaration: the crossing's pair
    // resolves it inside the commit this causes. The answer is the client's `sent`/`absent` statement; nothing is awaited
    // and no receipt composes a decision.
    const sent = getViewClient().commitTheme(setting, attributeName).status === 'sent'
    if (sent) lastCarried = { setting }
    return reading({ setting, changed: true, sent, declaration: null, declared: false, status: null, written: false })
  }

  const commitTurn = (): ThemeApplicationReading => {
    const read = authoredSettingOf(runtime, nodeId)
    // AN UNREADABLE CARRIER IS A READING, NOT AN ACT: nothing is sent, and no status word is fabricated.
    if (!read.readable) {
      return reading({ setting: null, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
    }
    return commitSetting(read.setting)
  }

  /** **THE DELIVERY'S TURN** — read the record the crossing's answer now carries and write `props.<declaration.name>`
   *  on the AUTHORED state node, as ONE `state-slice`, **WHEN THE SURFACE DOES NOT ALREADY CARRY IT** (`D-129`, `D-126`'s
   *  `F5`; design §4). What decides the paint is the node the write would LAND ON — `authoredPropOf(runtime, nodeId,
   *  declaration.name)` — asked for **the very expression this turn's mutation carries**. */
  const applyTurn = (): ThemeApplicationReading => {
    const theme = getViewClient().themeRecord()
    const declaration = applicableDeclaration(theme)
    // NO APPLICABLE DECLARATION: the placeholder, which names no attribute. Nothing is written and nothing is claimed.
    if (declaration === null) {
      return reading({ setting: theme.token, changed: false, sent: false, declaration: null, declared: false, status: null, written: false })
    }
    // **ONLY A POSITIVE SETTLED MATCH MAY SKIP THE PAINT** (`D-163`'s corrected rule; design §4, §6): `wanted` is the
    // mutation's OWN expression (`removal ? undefined : value`), so the paint is owed UNLESS the surface already holds
    // THAT value — `declared = wanted === undefined || !held.readable || held.held !== wanted`, i.e. it skips only where
    // `wanted !== undefined && held.readable && held.held === wanted`.
    // **THE OPERANDS ARE ORDERED SO A REMOVAL IS DECIDED BEFORE ANY READ IS TAKEN**: absence in `props` is what a REBUILT
    // node, a store-projected state AND a NOT-YET-APPLIED REMOVAL all look like, so an absent member establishes nothing
    // and a removal ALWAYS PAINTS — it is ONE redundant idempotent `state-slice` (`OV-12`, `OV-14`), a price paid per
    // delivery and never a budget, because the alternative is a node the record closed with a DOM still carrying the
    // attribute. **A REMOVAL DELIVERY THEREFORE COSTS NO READ AT ALL**: the read is taken only where `wanted !== undefined`.
    // An unreadable surface FAILS OPEN on the POSITIVE arm alone and paints, its refusal returning as `status`.
    const wanted = declaration.removal ? undefined : declaration.value
    let declared = true
    if (wanted !== undefined) {
      const held = authoredPropOf(runtime, nodeId, declaration.name)
      declared = !held.readable || held.held !== wanted
    }
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
            // declared attribute REMOVAL, and never an empty string that happens to be falsy. IT IS THE SAME EXPRESSION
            // THE CHECK ABOVE COMPARES WITH, which is why the two cannot drift.
            value: wanted,
          },
        ],
      })
      status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    } catch {
      status = 'threw'
    }
    const written = status === 'applied'
    // **NOTHING IS REMEMBERED HERE** (`D-129`): a refused write is retried by the next delivery because the SURFACE
    // still does not carry it, not because a seed says so.
    return reading({ setting: theme.token, changed: false, sent: false, declaration, declared: true, status, written })
  }

  return {
    attributeName,
    nodeId,
    commit: commitTurn,
    apply: applyTurn,
    /** **THE DOM-ORIGINATED TURN (`D-126`) — THE ACT THE SURFACE WAS MISSING.** Until this member existed the
     *  appearance family had exactly ONE cause: `commit()` reached from the reply path's notify, gated on a MUTATING
     *  reply. A human clicking the authored control therefore wrote the AUTHORED CARRIER and reached the crossing
     *  NEVER — the store was not in the path at all, and no delivery existed to reconcile the two surfaces, because
     *  no delivery was ever caused. **`npm run divergence` cannot see this class** (it compares the realms before any
     *  act) and **neither can any unit row** (it dispatches, which is the agent's path). `D-125` rules the direction for
     *  the pane — the operator's act writes the store and the render is a listener's product — and this is the same
     *  correction for the appearance family.
     *
     *  **THE LISTENER SPELLS NO TOKEN.** A real click runs the AUTHORED handler first (provident registered its own
     *  listener at render, before this one), and that handler writes the caller's token into the AUTHORED carrier. So
     *  the turn reads the token the EVENT carries and hands it to `commitSetting`, which is the same act the reply
     *  path performs, with the same `changed` guard: a click that moved nothing sends nothing, and the crossing is asked
     *  once per real change rather than once per click. The ids are the ROLE's — derived from the envelope by
     *  `themeControlIds`, never re-spelled here. */
    attach(): { readonly attached: number } {
      /** **THE CLICK'S TOKEN IS READ FROM THE EVENT, AND THAT IS MEASURED RATHER THAN PREFERRED.** The authored handler
       *  runs first and writes the carrier, but ITS WRITE LANDS ON A LATER TURN — measured on this tree: synchronously
       *  after the dispatch the carrier still held the PREVIOUS token and it moved on the first microtask — so a listener
       *  that read the carrier here would act on the value the click was REPLACING, and on the very first act of a session
       *  would send nothing at all. The event carries the token because the CONTROL authors it (`props.value`) and the
       *  runtime's DOM bridge reads exactly that (`src/renderer/runtime.ts`:
       *  `'value' in target ? [String(target.value)] : []`), which is the same expression, taken from the same place. **A
       *  CONTROL THAT CARRIES NO TOKEN IS NOT AN ACT**: an empty or absent `value` sends nothing rather than writing the
       *  empty setting, because the empty setting is ABSENCE and a click on a labelled control never means it. */
      const turn = (event: unknown): void => {
        const target = (event as { readonly target?: unknown } | null | undefined)?.target
        const carried = (target as { readonly value?: unknown } | null | undefined)?.value
        if (typeof carried !== 'string' || carried === '') return
        commitSetting(carried)
      }
      let attached = 0
      for (const id of themeControlIds()) {
        let element: unknown = null
        try {
          element = runtime.elementForNodeId(id)
        } catch {
          element = null
        }
        const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
        if (typeof add !== 'function') continue
        ;(add as (type: string, handler: (event: unknown) => void) => void).call(element, 'click', turn)
        attached += 1
      }
      return { attached }
    },
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * THE OVERLAY'S CONSUMER (`D-113`) — THE MECHANISM `src/shared/overlay.ts` WAS OWED, WIRED AT THE APP RENDERER.
 *
 * `D-96` stopped here because the app authored no overlay for the mechanism's declaration to land on, and `pending.md`
 * row `5` carried that stop. The user's ruling, VERBATIM: *"The overlay is used to contain UI elements that should block
 * general app access while open, ex. security tools and other configuration settings"* — so the app now AUTHORS that
 * surface (`src/shared/demo-envelope.ts`'s overlay layer) and this file is the CONSUMER the mechanism needed.
 *
 * **⟶ AND SINCE `D-125` THE DIRECTION IS THE OTHER WAY ROUND, WHICH IS THE CORRECTION THIS BLOCK CARRIES.** `D-124` had this
 * wiring HOLD the four-state machine, move it from the authored token and REPORT the predicate it computed — the renderer
 * was the machine and the store followed it, so the incompatibility between an open pane and open ports was enforced by a
 * SEQUENCE and not by the state machine. Now the user's act is ONE write at `['operator-pane']`, the crossing's constraint
 * repairs the ports and its delivery closes the socket, and THIS file renders what the store's delivery says: `open` and
 * `closed` are DERIVED from the store, `closing` is this wiring's one transient, and `held` has no producer here. The
 * mechanism still owns the verb vocabulary — it is handed the STORE'S word as its state — and the wiring owns nothing.
 *
 * TWO OF THIS FILE'S ESTABLISHED FORMS, REUSED RATHER THAN RE-INVENTED:
 *   · `overlayWiringRole` is the `themeWiringRole` form — the CALLER-held attribute name and the AUTHORED ids, held in
 *     ONE place. **THE ATTRIBUTE NAME IS THE CALLER'S AND `overlay.ts` OWNS NONE**: the module takes it as an argument,
 *     echoes it BY IDENTITY, and hands it back inside `{name, value, removal, target}`. The single spelling of it in this
 *     tree is the `attributeName` constant below — no second site to drift from, which is exactly what `theme`'s role
 *     already guarantees for the appearance attribute.
 *   · `startOverlayApplication` is the `startThemeApplication` form — the mechanism COMPUTES (`overlayTransition`), the
 *     wiring APPLIES (`overlayInertDeclaration` → ONE `runtime.applyCommand({kind:'state-slice', …})`), and the write lands
 *     as `props.<name>` on an AUTHORED node. **NO HAND-WRITTEN DOM, NO ATTRIBUTE STAMPED ON `document.body`, NO INJECTED
 *     CSS** (`AGENTS.md` § "UI authority"): the element is the graph's, so the declaration is visible to
 *     `provident.get_rendered_html`, `get_markdown` and `get_node_state` because it IS the graph.
 *
 * **WHAT IS INERT, AND WHY THE MECHANISM'S `target` IS THE APP ROOT.** The declaration is written to `APP_ROOT_ID` — the
 * authored node every general-app card stands inside — and NOT to the envelope root, because the overlay layer is a
 * SIBLING of that node: `inert` on a root that contained the dialog would block the dialog's own close control and the
 * ruling's subject would be unreachable. `held` is inert with `open` (the overlay is up); `closing` is not (it is on its
 * way out); `closed` is the REMOVAL arm of the declaration, not an empty value.
 *
 * **TOTAL, AND NO THROW OUT OF A WIRING TURN**: an absent or renamed state node, a thrown graph read, a runtime that
 * refuses the op and a callback that throws all answer a READING — the last of those is the mechanism's own absorption
 * (`overlayTransition`'s `escape` arm), which this wiring relies on rather than duplicating.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** The wiring-held role: the caller's attribute name and the authored ids, in one place. */
export interface OverlayWiringRole {
  /** **THE CALLER-SUPPLIED ATTRIBUTE NAME** — the ONE spelling of it in this tree. `overlay.ts` owns no name. */
  readonly attributeName: string
  /** The authored node the declaration lands on (the app's general surface). */
  readonly appRootId: string
  /** The authored node carrying the caller's VERB token. */
  readonly stateNodeId: string
  /** The authored opener, close control and dialog — the three elements the wiring listens on. */
  readonly openerId: string
  readonly closeId: string
  readonly dialogId: string
}

/** **THE ONE BOUNDED WIRING ROLE — THE ATTRIBUTE-NAME HOLDER** (`themeWiringRole`'s sibling, `docs/specs/overlay.md`
 *  §2.5 item 2: *"the applied write is the CONSUMER's"*). It holds a VALUE and four AUTHORED ids taken from the envelope
 *  module that declares them, so a rename in the envelope moves what this role resolves instead of leaving a second,
 *  silently staling spelling behind. It writes nothing, dispatches nothing and holds no state. */
export function overlayWiringRole(): OverlayWiringRole {
  const attributeName = 'inert'
  return {
    attributeName,
    appRootId: APP_ROOT_ID,
    stateNodeId: OVERLAY_STATE_ID,
    openerId: OVERLAY_OPEN_ID,
    closeId: OVERLAY_CLOSE_ID,
    dialogId: OVERLAY_DIALOG_ID,
  }
}

/** **ONE TURN OF THE CONSUMER — WHAT THE ACT ASKED THE STORE FOR, AND WHAT THE DELIVERY THEN RENDERED** (`D-125`).
 *  The two halves are separate members because they happen in separate turns: an act asks (`asked`/`wrote`) and the pane
 *  moves only when the crossing's delivery says so (`state`/`written`). */
export interface OverlayApplicationReading {
  /** The word this wiring holds AFTER the turn: the store's derived `open`/`closed`, or a transient while a write is in
   *  flight. It is never the boolean the act asked for, which is the whole of the correction. */
  readonly state: OverlayState
  /** The caller's verb this turn consumed (`null` where the carrier was unreadable). */
  readonly verb: string | null
  /** Whether the RENDER moved the machine's state — the delivery's product, never the act's. */
  readonly changed: boolean
  /** The boolean this turn asked the store for (`null` where the verb is no act, or where it asked for the state the
   *  store already reported — a write with no external cause behind it is not made). */
  readonly asked: boolean | null
  /** Whether the act reached the crossing's write route at all. */
  readonly wrote: boolean
  /** The declaration this turn produced, or `null` where no write was attempted. */
  readonly declaration: { readonly name: string; readonly value: 'true' | false; readonly removal: boolean } | null
  /** The runtime's OWN answer to the `state-slice` write, or `null` where no write was attempted. */
  readonly status: string | null
  /** Whether the declaration reached the authored app root (`status === 'applied'`). */
  readonly written: boolean
  /** Whether the `escape` verb's focus return ran this turn (`D-125`: the verb's semantics are the mechanism's, and the
   *  focus return is this realm's act). */
  readonly escaped: boolean
}

/** **THE CROSSING THE WIRING READS AND WRITES — TWO MEMBERS AND NO THIRD** (`D-125`). `open` is the store's LAST DELIVERED
 *  word and `write` is the ONE write the user's act makes, at `['operator-pane']`. **THE WIRING DECIDES NOTHING**: it does
 *  not transition, does not close a port, does not write an exclusion, and does not render what it asked for. What the
 *  store does with the write — the invariant's repair, the port following the exclusion's delivery, the pane's own
 *  delivery — arrives back through `open` on the realm's ONE security subscription, and `render()` is its consumer. */
export interface OverlayPaneCrossing {
  readonly open: () => boolean | null
  readonly write: (open: boolean) => void
}

/** The consumer's surface — the turns and the readings the batteries drive. */
export interface OverlayApplication {
  readonly attributeName: string
  readonly appRootId: string
  readonly stateNodeId: string
  /** The machine's current word: `open`/`closed` DERIVED from the store, or `held`/`closing` while a write is in flight. */
  state(): OverlayState
  /** **THE REPLY ROUTE'S TURN** (`D-125`): read the authored verb token, and only when it MOVED hand the verb to the
   *  mechanism's translation and write the store. It renders what the store's last word says and never what it asked for. */
  drive(): OverlayApplicationReading
  /** **A DIRECT VERB** — the turn the wiring's own listeners hand a verb to (the authored body has already recorded it).
   *  It ACTS and renders nothing: the pane is the store's product, which is the whole of the correction. */
  apply(verb: unknown): OverlayApplicationReading
  /** **THE DELIVERY'S TURN — THE RENDERER IS A LISTENER** (`D-125`; `D-82` clause 2): called from the realm's ONE security
   *  subscription after the client has re-read, it renders the pane from the store's word and applies the declaration. */
  render(): OverlayApplicationReading
  /** Install the listeners on the authored controls. Returns how many of them it attached. */
  attach(): { readonly attached: number }
}

/** **THE AUTHORED VERB TOKEN, AS THE GRAPH HOLDS IT** — the `authoredSettingOf` form, total over every shape: an absent
 *  node, a renamed one, a null answer and a throwing read all answer the declared UNREADABLE reading, and a node that
 *  carries no `content` at all is a READABLE absence. */
function authoredOverlayToken(
  runtime: Runtime,
  nodeId: string,
): { readonly readable: boolean; readonly token: string } {
  if (nodeId === '') return { readable: false, token: '' }
  try {
    const answer = runtime.nodeState(nodeId) as { readonly states?: readonly unknown[] } | null | undefined
    const states = answer?.states
    if (!Array.isArray(states) || states.length === 0) return { readable: false, token: '' }
    const content = (states[0] as { readonly content?: unknown } | null | undefined)?.content
    if (typeof content === 'string') return { readable: true, token: content }
    if (content === null || content === undefined) return { readable: true, token: '' }
    return { readable: false, token: '' }
  } catch {
    return { readable: false, token: '' }
  }
}

/** **WHAT THE CONSUMER IS HANDED BESIDE THE RUNTIME** (`D-125`): the crossing the pane's open state is read from and
 *  written to, and NOTHING else. It is optional because a realm with no preload bridge has no crossing — the pane then
 *  renders nothing, and no act reaches a store, which is the honest arm for a page that has none. */
export interface OverlayApplicationOptions {
  readonly pane?: OverlayPaneCrossing
}

/** ONE ACT'S OWN ANSWER, before any render: what the verb asked for and whether it reached the crossing. */
interface OverlayActAnswer {
  readonly verb: string | null
  readonly asked: boolean | null
  readonly wrote: boolean
  readonly escaped: boolean
}

export function startOverlayApplication(runtime: Runtime, options?: OverlayApplicationOptions): OverlayApplication {
  const { attributeName, appRootId, stateNodeId, openerId, closeId, dialogId } = overlayWiringRole()
  const crossing = options?.pane ?? null
  /** **THE STORE'S LAST DELIVERED WORD, READ THROUGH THE CROSSING** — `null` where no crossing stands or its reader
   *  throws, which is the arm the render answers with nothing rather than with a fabricated `false`. */
  const storedOpen = (): boolean | null => {
    if (crossing === null) return null
    try {
      return crossing.open()
    } catch {
      return null
    }
  }
  /** **THE ONE TRANSIENT THIS REALM PRODUCES, AND IT RENDERS NOTHING** (`D-90`'s judgement, read at this mechanism). A
   *  transient is closure state: one writer (this file), no persistence, no crossing, no second reader, and it outlives no
   *  delivery — the terms the pane drag's preview was judged by. **`closing` IS PRODUCED AND `held` IS NOT, AND THE
   *  DIFFERENCE IS THE MECHANISM'S OWN MEANING**: `closing` is a pane that is up and on its way out, which is exactly the
   *  window between a close ACT and the delivery that answers it; `held` is a pane that is UP AND HELD, and after this
   *  inversion there is no such moment — a pane is up when the store says `open` and not before, so a word meaning "up but
   *  not confirmed" has no state left to name. `held` therefore stays a member of the mechanism's closed set (`held × open`
   *  stays `held`, driven by that module's own rows) and this app never produces it. **AND NEITHER WORD MAY RENDER**:
   *  `up` below is the STORE's word alone, so a transient can neither open a pane the store has not opened nor close one
   *  the store has not closed. */
  let transient: OverlayState | null = null
  /** THE LAST VERB TOKEN THIS REALM CARRIED — the `theme` application's `lastCarried` form, so a carrier that did not
   *  move is not an act. */
  const boot = authoredOverlayToken(runtime, stateNodeId)
  let lastCarried: string | null = boot.readable ? boot.token : null
  /** **`lastApplied` IS DELETED HERE, AND ITS SEED WITH IT** (`D-129`, `D-126`'s `F9`; design §4). It was a copy of the
   *  last declaration this application WROTE — a claim about the past that a graph-touching reply which REBUILDS the app
   *  root falsifies, so the surface lost the declaration and the copy still said it stood and NOTHING repainted. **THE
   *  SEED WENT FURTHER AND WAS `D-129` CASE (b) EXACTLY**: `{name: attributeName, value: false, removal: true}` asserted
   *  that the authored root already carried the removal arm WITHOUT ASKING — a local DEFAULT standing in for a reading.
   *  What `renderTurn` asks instead is the SURFACE, through `authoredPropOf(runtime, appRootId, composed.name)`; the check
   *  stores nothing, so after this pass no binding in this application remembers a write. **`derived` STAYS**: it repeats
   *  the STORE's last delivered word — the reading — and is not a memory of what this realm wrote. */
  /** THE DERIVED WORD THE LAST RENDER LEFT — what `changed` is measured against, and the machine's only durable memory. */
  let derived: OverlayState = 'closed'
  /** **THE ONE SPELLING OF THE PANE'S PREDICATE** — `D-123`'s own (`state === 'open' || state === 'held'`), read here for
   *  the ask and for the render alike, so a verb and a delivery can never mean two different panes. */
  function paneIsUp(word: OverlayState): boolean {
    return word === 'open' || word === 'held'
  }
  /** **WHAT THE WIRING HOLDS: THE STORE'S WORD, WITH THE ONE TRANSIENT ON TOP WHILE A CLOSE IS IN FLIGHT.** */
  const heldState = (): OverlayState => transient ?? derived
  /** THE ELEMENT THE DECLARATION NAMES — resolved through the graph, never a selector. Re-resolved per turn because a
   *  graph load replaces the rendered nodes. */
  const targetOf = (): unknown => {
    try {
      return runtime.elementForNodeId(appRootId)
    } catch {
      return null
    }
  }
  /** **THE FOCUS RETURN THE `escape` VERB ASKS FOR.** A modal's escape returns the operator's focus to the control that
   *  opened it — the one behaviour the verb is FOR. The MECHANISM says WHEN (its `escape` arm invokes the callback it is
   *  handed, and absorbs a throw); the act is this realm's, and it is total: an absent opener cannot make an act throw. */
  const restoreFocus = (): void => {
    let opener: unknown = null
    try {
      opener = runtime.elementForNodeId(openerId)
    } catch {
      opener = null
    }
    const focus = (opener as { readonly focus?: unknown } | null | undefined)?.focus
    if (typeof focus === 'function') (focus as () => void).call(opener)
  }

  const reading = (
    base: {
      readonly state: OverlayState
      readonly verb: string | null
      readonly changed: boolean
      readonly asked: boolean | null
      readonly wrote: boolean
      readonly declaration: { readonly name: string; readonly value: 'true' | false; readonly removal: boolean } | null
      readonly status: string | null
      readonly written: boolean
      readonly escaped: boolean
    },
  ): OverlayApplicationReading => ({ ...base })

  /** **THE ACT — ONE WRITE AT `['operator-pane']` AND NOTHING ELSE** (`D-125`, and `D-82` clause 4: a write is the
   *  operator's own act). The verb is translated by the MECHANISM against the STORE's word, so this file spells no verb,
   *  and the write carries the one boolean the crossing's fourth address holds. **NO LOCAL MACHINE MOVES FIRST**: the word
   *  this wiring holds is still the store's, and the render happens when the store's delivery arrives. A verb that asks
   *  for the state the store already reports is not a write at all — a write with no external cause behind it is the
   *  `D-82` clause-4 fault, and `D-123`'s note against a per-turn write is the same rule. */
  const act = (verb: unknown): OverlayActAnswer => {
    const before = storedOpen()
    let focused = false
    // **THE MECHANISM IS HANDED THE STORE'S OWN WORD AS ITS STATE** — that is the direction this pass inverts, and the
    // whole of it: `D-124` fed `overlayTransition` the AUTHORED TOKEN as its state and kept the answer as the state this
    // wiring held, so the renderer was the machine and the store followed it. Here the state argument is the store's, the
    // answer is used as the ASK alone, and the word this wiring holds is re-derived from the store at every delivery.
    const answer = overlayTransition(before === true ? 'open' : 'closed', verb, () => {
      focused = true
      restoreFocus()
    })
    const verbWord = typeof verb === 'string' ? verb : null
    // THE MECHANISM'S OWN `changed` IS THE NO-ACT ARM: `open` on an open pane, `close` on a closed one and `toggle` from
    // `held` all answer `changed:false`, and a write with no external cause behind it is the `D-82` clause-4 fault.
    if (!answer.changed) return { verb: verbWord, asked: null, wrote: false, escaped: focused }
    const asked = paneIsUp(answer.state)
    let wrote = false
    if (crossing !== null) {
      try {
        crossing.write(asked)
        wrote = true
      } catch {
        // THE SINK'S OWN THROW IS THE SINK'S: the overlay's turn is not a store's act, and a failed ask is not a failed act
        wrote = false
      }
    }
    // THE ONE TRANSIENT (`D-90`'s judgement): a pane that is UP and on its way out is `closing` until the delivery answers.
    if (wrote && !asked) transient = 'closing'
    return { verb: verbWord, asked, wrote, escaped: focused }
  }

  /** **THE RENDER — WHAT THE DELIVERY SAYS, APPLIED AS ONE `state-slice` ON THE AUTHORED APP ROOT** (`D-125`; `D-113`'s
   *  declaration site, unchanged). `clear` is the DELIVERY's own turn: the store has answered, so a transient is over. A
   *  word that has not arrived (`null`) renders nothing at all — nothing is fabricated about a pane the realm has not heard
   *  of — and the RENDER PREDICATE IS THE STORE'S WORD ALONE, never a transient and never the boolean an act asked for. */
  const renderTurn = (clear: boolean): OverlayApplicationReading => {
    const before = derived
    const word = storedOpen()
    if (clear) transient = null
    if (word !== null) derived = word ? 'open' : 'closed'
    const up = paneIsUp(derived)
    // **THE STATE MIRROR — THE DELIVERY KEEPS THE AUTHORED CARRIER TRUTHFUL** (`D-131`, `D-126`'s finding `F2`). The
    // carrier used to hold only a VERB, written by whichever control was clicked, so the toggle control's body had no
    // state to read and wrote the same word every time — and the `changed` guard in `drive()` then refused an agent's
    // second dispatch, leaving the store's pane open with the act silently dropped. **THIS TURN IS WHAT MAKES READING THE
    // CARRIER A READING OF THE STATE**: it writes the store's own word here, on the DELIVERY and on nothing else, so the
    // body's next read resolves the next target and the carrier MOVES on every click that would change something.
    // **IT RUNS ON `clear` AND NOT ON EVERY TURN** because `clear` is exactly the delivery's call (`render()`), while
    // `drive()`'s turn runs BEFORE the store has answered — mirroring there would overwrite the target the body just
    // wrote with the state that target exists to change. **`lastCarried` MOVES WITH IT**, so the wiring never mistakes
    // its own mirror for an act, and it moves ONLY IF THE MIRROR LANDED: a refused write leaves the carrier holding the
    // target, which is what makes the next click re-ask rather than suppress. */
    if (clear && word !== null) {
      const stateWord = up ? 'open' : 'closed'
      let mirrored = false
      try {
        const answer = runtime.applyCommand({
          kind: 'state-slice',
          node: stateNodeId,
          mutation: [{ targetProp: 'content', mode: 'replace', value: stateWord }],
        })
        mirrored = typeof answer?.status === 'string' && answer.status === 'applied'
      } catch {
        mirrored = false
      }
      if (mirrored) lastCarried = stateWord
    }
    const declaration = overlayInertDeclaration(targetOf(), attributeName, up)
    const state = heldState()
    if (word === null || declaration.name === null) {
      return reading({ state, verb: null, changed: state !== before, asked: null, wrote: false, declaration: null, status: null, written: false, escaped: false })
    }
    const composed: { readonly name: string; readonly value: 'true' | false; readonly removal: boolean } = {
      name: declaration.name,
      value: declaration.value,
      removal: declaration.removal,
    }
    // **ONLY A POSITIVE SETTLED MATCH MAY SKIP THE PAINT** (`D-163`'s corrected rule; design §4, §6) — asked of the
    // SURFACE, through the same relation the appearance application uses, and asked for the very expression the mutation
    // below carries (`removal ? undefined : value`). The predicate is `same = wanted !== undefined && held.readable &&
    // held.held === wanted`, so the paint is owed on `wanted === undefined || !held.readable || held.held !== wanted`.
    // **THE OPERANDS ARE ORDERED SO A REMOVAL IS DECIDED BEFORE ANY READ IS TAKEN**: absence in `props` is what a REBUILT
    // root, a store-projected state AND a NOT-YET-APPLIED REMOVAL all look like, so an absent member establishes nothing
    // and a removal ALWAYS PAINTS — ONE redundant idempotent `state-slice`, a price paid per delivery and never a budget,
    // because the alternative is a pane the record closed with a DOM still carrying `inert`. **A REMOVAL DELIVERY
    // THEREFORE COSTS NO READ AT ALL**: the read is taken only where `wanted !== undefined`. An unreadable root FAILS OPEN
    // on the POSITIVE arm alone and paints, its refusal returning as `status`.
    const wanted = composed.removal ? undefined : composed.value
    let same = false
    if (wanted !== undefined) {
      const held = authoredPropOf(runtime, appRootId, composed.name)
      same = held.readable && held.held === wanted
    }
    if (same) {
      return reading({ state, verb: null, changed: state !== before, asked: null, wrote: false, declaration: composed, status: null, written: false, escaped: false })
    }
    let status: string
    try {
      const written = runtime.applyCommand({
        kind: 'state-slice',
        node: appRootId,
        mutation: [
          {
            targetProp: `props.${composed.name}`,
            mode: 'replace',
            // THE REMOVAL ARM IS THE MECHANISM'S `removal` MEMBER — an `undefined` on `props.<key>` is the engine's
            // declared attribute REMOVAL, never an empty string that happens to be falsy (`theme`'s own note). IT IS THE
            // SAME EXPRESSION THE CHECK ABOVE COMPARES WITH.
            value: wanted,
          },
        ],
      })
      status = typeof written?.status === 'string' ? written.status : 'no-answer'
    } catch {
      status = 'threw'
    }
    const landed = status === 'applied'
    // **NOTHING IS REMEMBERED HERE** (`D-129`): a refused write is retried by the next delivery because the SURFACE still
    // does not carry it, not because a seed says so.
    return reading({ state, verb: null, changed: state !== before, asked: null, wrote: false, declaration: composed, status, written: landed, escaped: false })
  }

  const apply = (verb: unknown): OverlayApplicationReading => {
    const acted = act(verb)
    return reading({
      state: heldState(),
      verb: acted.verb,
      changed: false,
      asked: acted.asked,
      wrote: acted.wrote,
      declaration: null,
      status: null,
      written: false,
      escaped: acted.escaped,
    })
  }

  return {
    attributeName,
    appRootId,
    stateNodeId,
    state: heldState,
    /** THE DELIVERY'S TURN — the renderer as a listener. It is the app's ONE security subscription body that calls it, and
     *  no second registration is taken for the pane (a second consumer of one push is a second read per delivery). */
    render: () => renderTurn(true),
    drive(): OverlayApplicationReading {
      const carried = authoredOverlayToken(runtime, stateNodeId)
      if (!carried.readable) return renderTurn(false)
      if (lastCarried !== null && lastCarried === carried.token) return renderTurn(false)
      lastCarried = carried.token
      const acted = act(carried.token)
      const rendered = renderTurn(false)
      return { ...rendered, verb: carried.token, asked: acted.asked, wrote: acted.wrote, escaped: acted.escaped }
    },
    apply,
    attach(): { readonly attached: number } {
      let attached = 0
      /** **THE DOM-ORIGINATED TURN — THE CALLER'S VERB IS READ FROM THE GRAPH, NEVER FROM THIS FILE.**
       *  A real click on the opener runs the AUTHORED body first (provident registered its own listener at render, before
       *  this one), and that body writes the caller's verb token into the authored carrier. So the listener does not need
       *  to know which verb its element carries: it takes the token the graph now holds, hands it to the act, and THE ACT
       *  IS ONE STORE WRITE. **THIS IS WHY NO VERB WORD IS SPELLED IN THIS FILE** — `overlay.ts` owns none, the envelope
       *  authors them, the mechanism translates them, and the wiring reads them; a second spelling here would be exactly
       *  the drift the attribute-name rule forbids. */
      const turn = (): void => {
        const carried = authoredOverlayToken(runtime, stateNodeId)
        if (!carried.readable) return
        lastCarried = carried.token
        apply(carried.token)
      }
      const listen = (id: string, event: string): void => {
        let element: unknown = null
        try {
          element = runtime.elementForNodeId(id)
        } catch {
          element = null
        }
        const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
        if (typeof add !== 'function') return
        ;(add as (type: string, handler: () => void) => void).call(element, event, turn)
        attached += 1
      }
      listen(openerId, 'click')
      listen(closeId, 'click')
      listen(dialogId, 'keydown')
      return { attached }
    },
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════
 * U-PANE-DRAG-COMPLIANCE — THE STORE-BACKED DRAG-CHAIN SEAM COMPOSITION
 * (`docs/specs/pane-drag-compliance.md` §2.1 A/B/C + §2.2 + §2.3 + §2.4's nine stored
 * names + §2.5's terminal table; the WIRING role, §5.1 row 1 of the diff scope).
 *
 * THE WIRING'S OWN CLOSURE, per `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`, RE-GRAINED BY THE PURGE
 * (`D-92`) AND AGAIN BY THE ADDRESS (`D-132`, `D-138`, `D-144`): every value of the flow is a READ of the record the
 * crossing holds — the PANE GEOMETRY at `['panes']`, the ZONE FAMILY at `['zones']` and now the DRAG'S OWN VALUE at
 * `['drag']`, whose node stands at `temp` — read through `src/renderer/view-client.ts`'s shape or, for `['drag']`, through
 * the realm's own `data.read` route; the client is a WIRING-HELD ARGUMENT passed into closures, NEVER a module-scope
 * binding (§3.4 R-2). The composition registers NO SUBSCRIBER of its own: the render turn is the `renderZone` member
 * below and the ghost turn the `renderGhost` member beside it, both called by the shape's ONE delivery. NO byte of the four
 * mechanism modules moves (§3.4 R-1/R-5).
 *
 * THE SEAM SURFACE (`PaneDragSurface`) satisfies the family's EXPORTED seam types of
 * §2.1 — `StartSizeOf`, `BoundsOf`, the relocate candidate production — plus the
 * §2.1 C temp-write turns (`move`/`release`/`rightClick`/`cancel`), the render turn and the ghost turn. The
 * composition's ONE per-gesture binding (whether the family's ending was SENT) lives in THIS closure, never at
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
 * **THE TEMP PREVIEW IS AN ADDRESS NOW, AND WHAT THE CLOSURE KEEPS IS ONE FLAG** (`D-132` superseding `D-90` by pointer;
 * `D-138`; design §5). It was `temp.drag.<gestureId>.placement` in the frozen store, and then a `Map` in this closure with
 * a `previewOf` member so the erase rule was OBSERVABLE rather than assumed. **BOTH ARE DELETED**: the drag's value is
 * `['drag']` at `temp`, whose WRITER is the client's `commitDrag` (one whole member per placement change, `{size}`), whose
 * READ is the ghost turn below, and whose END is the client's `clearDrag` (a tier-scoped delete, never a placeholder). What
 * remains here is `gestures` — ONE bookkeeping `Map` holding the ENDING FLAG and no value, because `['drag']` is keyed by
 * PANE ID and is GESTURE-BLIND. The release turn's write and the SINK are untouched, and **THE TWO PHASES STAY DISTINCT**:
 * `move` writes at `temp` and commits nothing, `release` is the ONLY `file` writer. `D-137`'s "one event" was about
 * COLLISION, never about collapsing them.
 *
 * THE ZONE-RENDER TURN (`renderZone`) is a MEMBER of the surface, and **the shape's own delivery calls it** — this
 * composition registers NOTHING on the client, the bridge or the store, because a second `onChanged` registration would be
 * a second consumer of one push and a second read per delivery. Every read is guarded: an absent client, an absent shape
 * and a throwing read all land the DECLARED degradation, and never a throw escapes a wiring turn (§3.2 F-8, P-PD-TP-2).
 * **AND THE GHOST TURN (`renderGhost`) IS ITS SIBLING** — the same delivery calls it, it asks the same address's own read
 * and paints the declared transient the address has no other way to show.
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
  /** **THE END-TURN, AND THE THIRD PARAMETER IS OPTIONAL BECAUSE THE APP HANDS NO SINK** (`D-129`; design §3 `R1`–`R5`,
   *  §5). `R3` keeps its POSITION and its meaning — a sink, when one is supplied, is invoked exactly once, FIRST, before
   *  the `file` commit and before the ending — and `demo/pane-drag-demo/demo.ts` still supplies one, a realm with no
   *  crossing and no delivery to paint from (`D-118`). This realm supplies NONE: the read-out it used to author is
   *  `renderPaneSize`'s now. **THE OPTIONALITY IS THE ONE THING THE TWO DESIGN STATEMENTS COULD NOT BOTH SPELL**: the
   *  seam's exact form `drag.release(GESTURE_KEY, value)` and a strict three-argument declaration are unsatisfiable at
   *  `tsc` (TS2554), so the parameter is widened to optional rather than the call carrying a token the design deletes —
   *  `release`'s order, its three steps and every existing caller are unmoved. */
  release(gestureId: string, final: unknown, sink?: unknown): void
  rightClick(gestureId: string): void
  cancel(gestureId: string): void
  /** **THE ZONE-RENDER TURN — THE SHAPE'S DELIVERY CALLS IT** (`D-92`). It replaces the `subscribe('temp.drag', …)`
   *  registration: the layout input is a pure function of the zone family's `size`/`display` as the last delivery left
   *  them, so the event that changes them IS the event that renders them. */
  renderZone(): void
  /** **THE GHOST TURN — THE SHAPE'S ONE DELIVERY CALLS IT BESIDE `renderZone`** (`D-138`, `D-144`; design §4 `G1`–`G9`).
   *  The drag's in-process value became an ADDRESS (`['drag']` at `temp`), so the transient a human sees mid-gesture is
   *  a READ of that address painted as a DECLARED TRANSIENT: ONE `data.read({path: ['drag']})`, its answer checked
   *  against the realm's own `_tier` readout, and `data-ghost="temp"` declared on the backing's `ghostTarget` IFF the
   *  node is a branch standing at `temp` whose `DEFAULT_PANE_ID` member carries a finite non-negative `size` — the
   *  declaration REMOVED on every other arm THAT REACHES A REMOVAL, while the ATTRIBUTE-LESS target's arm RETURNS AHEAD of
   *  the paint, so it removes nothing and paints nothing (`ghostTarget` below; design §4 `G9`) — and nothing thrown out of
   *  the turn. **NO POLL, NO TIMER, NO RETRY**: the
   *  one read rides the delivery's turn, and a lost delivery is a stale declaration rather than a fabricated one. */
  renderGhost(): void
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
  /** **THE PANE ELEMENT THE GHOST'S DECLARATION LANDS ON** (`D-144`; design §4): the wiring's own
   *  `runtime.elementForNodeId(GUTTER_TARGET_ID)`, handed at the ONE construction site beside `view` — the same
   *  element `startGutterAffordance`'s inline preview writes, so the transient and the preview agree.
   *  **STRUCTURAL, AND TOTAL OVER EVERY SHAPE**: anything carrying `setAttribute`/`removeAttribute` is used; absent,
   *  hostile or attribute-less means the ghost turn paints nothing, removes nothing and throws nothing (ASM-RW-3). */
  readonly ghostTarget?: unknown
}

/** THE WIRED COMPOSITION (§2.1 A/B/C + the shape's delivery turn + §7a.1 item 1's reconcile turns), bound to the
 *  caller-supplied BACKINGS above and the RECORDING SOURCE DOUBLE. Every read is the shape's; the temp preview is this
 *  closure's; the render turn is a member the shape's one delivery calls. */
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface {
  const backingRecord = (backing ?? null) as { readonly view?: unknown; readonly ghostTarget?: unknown } | null
  /** THE SHAPE, where the caller supplied one. `null` is a realm with no crossing: the reads answer the measured default
   *  and every write is the client's `absent` statement, which is the declared degradation and never a throw. */
  const view = (backingRecord?.view ?? null) as ViewClient | null
  /** **THE ELEMENT THE GHOST'S DECLARATION LANDS ON** (`D-144`; design §4): the wiring's pane element, handed beside the
   *  shape at the ONE construction site. STRUCTURAL and never inspected at construction — the ghost turn reads the two
   *  members it needs, per call, and a target carrying neither paints nothing. */
  const ghostTarget = backingRecord?.ghostTarget ?? null
  const sourceRecord = (source ?? null) as { readonly layout?: unknown } | null

  /** **THE CALLER'S OWN PANE ID, AND ITS FALLBACK IS THE *DECLARED* ONE — NEVER A LITERAL OF THIS FILE'S** (`D-138`,
   *  `D-152`). `<id>` is the caller's element/token mapping (§2.1 A) where the element carries an `id` or the token is a
   *  non-empty string; absent both, the gesture-end turns (§2.4 names 1/2/9) address `DEFAULT_PANE_ID`, imported from
   *  `src/shared/view-shape.ts`. **THE RECORD DECLARES THE PANE IDS IN THAT FILE AND THIS REALM MUST NOT SPELL ITS OWN**:
   *  the id domain is CLOSED to `DECLARED_PANE_IDS` (derived from that constant) and the route refuses an id it does not
   *  declare (`undeclared-pane`), so a literal here would be a second answer to "which pane does this app address" — and
   *  the two could disagree about it, the failure landing as a gesture turn writing a pane the record no longer declares.
   *  **THE VALUE IS UNCHANGED** (`DEFAULT_PANE_ID` is `'pane-a'`), so this is one spelling and no behaviour. */
  const paneIdOf = (element: unknown, token: unknown): string => {
    const viaElement = (element as { readonly id?: unknown } | null | undefined)?.id
    if (typeof viaElement === 'string' && viaElement.length > 0) return viaElement
    if (typeof token === 'string' && token.length > 0) return token
    return DEFAULT_PANE_ID
  }
  /** **THE CALLER'S OWN ZONE ID, AND ITS FALLBACK IS THE *DECLARED* ONE — NEVER A LITERAL OF THIS FILE'S** (`D-151`,
   *  `D-152`). `<id>` is the caller's element/token mapping where the element carries a `zoneId`; absent one, the read
   *  addresses `DEFAULT_ZONE_ID`, imported beside `DEFAULT_PANE_ID` from `src/shared/view-shape.ts`. **THE RECORD DECLARES
   *  THE ZONE IDS IN THAT FILE AND THIS REALM MUST NOT SPELL ITS OWN**: the id domain is CLOSED to `DECLARED_ZONE_IDS`
   *  (derived from that constant) and the route refuses an id it does not declare (`undeclared-zone`), so a literal here
   *  would be a second answer to "which zone does this app address" — and the two could disagree about it, the failure
   *  landing as a render turn reading a zone the record no longer declares. **THE VALUE IS UNCHANGED** (`DEFAULT_ZONE_ID`
   *  is `'zone-1'`), so this is one spelling and no behaviour. */
  const zoneIdOf = (element: unknown): string => {
    const viaElement = (element as { readonly zoneId?: unknown } | null | undefined)?.zoneId
    if (typeof viaElement === 'string' && viaElement.length > 0) return viaElement
    return DEFAULT_ZONE_ID
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
   *  exactly what the frozen store's missing read handed it. **THE ID READ AND THE ID HANDED ON ARE BOTH
   *  `DEFAULT_ZONE_ID`** (`D-151`, `D-152`): the record declares its zone ids in `src/shared/view-shape.ts` and this realm
   *  must not spell its own, so one constant names the zone at the read and at the layout call — a literal at either would
   *  let the turn and the declared set drift about which zone the app addresses. **THE VALUE IS UNCHANGED**
   *  (`DEFAULT_ZONE_ID` is `'zone-1'`), and the arguments are the same `undefined`/figure pair as before. */
  const renderZone = (): void => {
    const layout = sourceRecord?.layout
    if (typeof layout !== 'function') return
    try {
      const zone = zoneOf(DEFAULT_ZONE_ID)
      ;(layout as (zoneId: string, size: unknown, display: unknown) => void)(DEFAULT_ZONE_ID, zone?.size, zone?.display)
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

  /** **THE STORAGE IS AN ADDRESS NOW, AND WHAT THIS CLOSURE KEEPS IS ONE FLAG** (`D-132` superseding `D-90` by pointer;
   *  design §5). The preview used to be a `Map` in this closure — `previews`, with `previewOf` answering it so the erase
   *  rule was observable rather than assumed. **BOTH ARE DELETED**: the placement is `['drag']` at `temp`, whose writer is
   *  the client's `commitDrag` and whose end is its `clearDrag`, so the value has an address and this closure has nothing
   *  to hold. `gestures` REMAINS and is NOT storage: `['drag']` is keyed by PANE ID and is GESTURE-BLIND, so the address
   *  cannot say "this gesture has already ended" and ONE flag must. It is keyed by the key each turn is handed (total over
   *  any string), `move` CLEARS it, `endReading` SETS it before its route is sent, and no other line writes it.
   *
   *  ZERO SINK WRITES ARE MADE BY ANY OF THESE TURNS (SINK-1): the sink is the release turn's alone. */
  const gestures = new Map<string, { readonly erased: boolean }>()

  /** **THE PER-MOVE TURN — ONE WRITE TO THE ADDRESS, AND `M1` IS THE TURN'S OWN TOTALITY** (design §2 `M1`–`M3`, `D-138`).
   *  The affordance's `PreviewState` carries a CLAMPED `value`; this turn reads it and sends ONE `commitDrag(DEFAULT_PANE_ID,
   *  {size})` naming the composition's pane — no tier, no path, no composer, and no second judgement: a preview whose value
   *  is not a finite non-negative number sends NOTHING and leaves whatever last stood standing (§3.2 F-8). `M2` clears the
   *  ending flag FIRST, so a first move RE-OPENS the gesture and the erase gates the ERASE and never the gesture. The sink
   *  is never touched (SINK-1). */
  const move = (key: string, preview: unknown): void => {
    try {
      const size = (preview as { readonly value?: unknown } | null | undefined)?.value
      if (typeof size !== 'number' || !Number.isFinite(size) || size < 0) return
      gestures.set(key, { erased: false })
      if (view !== null) view.commitDrag(DEFAULT_PANE_ID, { size })
    } catch {
      // a hostile key, preview or view must never throw out of the move turn
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


  /** **THE RELEASE/RESET TERMINAL — the sink, then the `file` commit, then the `temp` ending** (design §3 `R1`–`R5`;
   *  `D-138`, `D-144`). The E10-single-sink discipline is unmoved (`final` is EXACTLY the value the sink received, the sink
   *  is invoked once), and the E3 gate is unmoved (a non-useful `final` — a non-number or `NaN` — is NEVER sent, ZERO
   *  writes). The frozen store's TWO synchronous commits (`file.settings.pane.<id>.size` then `mem.layout.pane.<id>.size`)
   *  collapsed to ONE `commitPane` on the one `file` address, and its receipt does NOT come back in this turn — it lands
   *  in the client's `writeOutcome()` a tick later. **AND THE RELEASE NOW ENDS THE DRAG FAMILY ITSELF** (`R5`): ONE
   *  `clearDrag()` AFTER the sink and AFTER the file commit, so the gesture's two PHASES stay distinct — `move` is the
   *  drag-update phase at `temp`, `release` is the release phase at `file` — and the ending is a THIRD statement that
   *  writes no placement, carries no geometry and judges no value (L2 §5). The two refusing arms (`R1`/`R2`) send NOTHING
   *  at all: no sink, no route, no ending. `R5` is NEVER suppressed by the flag — the flag gates the ERASE route alone. */
  const release = (gestureId: string, final: unknown, sink?: unknown): void => {
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
      endReading(gestureId)
    } catch {
      // a hostile view or sink must never throw out of the release turn
    }
  }

  /** **THE ERASE — THE DRAG FAMILY'S END, AT MOST ONCE PER GESTURE, AND `D-132` RE-GRAINED IT UNDER THIS NAME** (design §2
   *  `E1`–`E3`, §5). It performed ONE `remove('temp.drag.<gestureId>.placement')` on the frozen store, then deleted the
   *  closure's entry; the placement is an ADDRESS now, so the erase is the client's `clearDrag()` and the flag says the
   *  ROUTE WAS SENT. **`E1`'s other arm is lawful and required** (`M-6`, `F-4`): a gesture that never moved has no entry,
   *  so an erase sends exactly ONE `clearDrag` — the store answers `committed` whether or not the family stood, and this
   *  composition decides nothing about that answer. A second ending for the SAME gesture sends nothing. **ZERO SINK WRITES
   *  AND NO PLACEMENT WRITE**: an abandon terminal ends the family and commits nothing. Reached from `rightClick`, `cancel`
   *  and the release (`R5`), so whichever ending turn ends the reading FIRST is the one that sends the route. */
  const endReading = (key: string): void => {
    try {
      const prior = gestures.get(key)
      if (prior?.erased === true) return
      gestures.set(key, { erased: true })
      if (view !== null) view.clearDrag()
    } catch {
      // a hostile key or view must never throw out of the ending turn
    }
  }

  /** **THE GHOST TURN — THE DRAG'S ADDRESS, READ ONCE PER DELIVERY AND PAINTED AS A DECLARED TRANSIENT** (design §4
   *  `G1`–`G9`; `D-138`, `D-144`, `D-112`). The ONLY caller is `startViewShape`'s ONE subscription body, which this
   *  closure hands the turn OUT to (`startGutterAffordance`'s return): the composition registers NO subscriber, so there is
   *  no second consumer of the push and no poll, timer or retry anywhere in it (`D-82` clause 4).
   *
   *  **THE ASK IS THE REALM'S EXISTING PASS-THROUGH** — ONE `dataRoute('read', {path: ['drag']})`, the same `data.read`
   *  route every `data.*` arm of this file uses, with no member invented and no tier argument. The answer's own node carries
   *  its `_tier` readout (`tier-readout` landed it), and THAT node's tier is what the declaration states — one token, never
   *  a set.
   *
   *  **THE PAINT IS THE ONE POSITIVE ARM, AND ITS PREDICATE IS TWO FACTS**: `data-ghost="temp"` is declared IFF the answer
   *  names a committed reading whose node stands at `_tier: 'temp'` AND that same node's `DEFAULT_PANE_ID` member — the
   *  composition's pane — carries a usable `size`. The size is read as the LEAF NODE it is on the live route: `data.read`
   *  answers every node as the store's own `{_tier, …}` (`D-134`), so the number arrives as `member.size.value`, and a bare
   *  number is the same fact stated without its node (the shape a double may answer). Nothing else is judged here and no
   *  tier is re-derived from the leaf.
   *
   *  **EVERY OTHER ARM FAILS CLOSED — IT REMOVES THE DECLARATION AND THROWS NOTHING** (ASM-RW-3): a realm with no `data`
   *  member at all (this file's own `store-unreachable` refusal), a route that throws synchronously or rejects, an answer
   *  that is not a committed reading (`absent`, a ledger arm), a `_tier` that is not `temp`, a node naming another pane, and
   *  a `size` that is not a finite non-negative number each reach the ONE removal, `clearGhost`. A SUPERSEDED turn's answer
   *  mutates NOTHING, neither a paint nor a removal (`G3`, the epoch), because it answers for a reading this turn never
   *  asked for.
   *
   *  **THE ATTRIBUTE-LESS TARGET IS THE ONE ARM THAT IS NOT A REMOVAL, AND IT IS STATED APART** (`G9`): a target whose
   *  `setAttribute` is not a function RETURNS **AHEAD OF THE PAINT** — no declaration is set and `clearGhost` is NEVER
   *  called, so the arm removes NOTHING and paints NOTHING. Nothing is owed there: this turn paints only onto a target that
   *  can take the attribute, so an attribute-less target never carried the declaration and has none to lose. (Its neighbour,
   *  read per call: a target answering `setAttribute` but not `removeAttribute` paints and can never thereafter be cleared —
   *  `clearGhost`'s own gate.) The staleness is stated, not hidden: a delivery that never arrives paints nothing, a
   *  declaration already standing when one is lost stays standing, and no retry stands here — a lost delivery leaves a STALE
   *  declaration, never a fabricated one (`D-117`'s bounded staleness, measured by `P-3`/`P-4`). */
  let ghostEpoch = 0

  /** THE DECLARATION'S ONE REMOVAL (`ASM-3`) — total over the target too: a closed element is not a throw. */
  const clearGhost = (): void => {
    try {
      const holder = ghostTarget as { readonly removeAttribute?: unknown } | null | undefined
      if (holder === null || holder === undefined) return
      if (typeof holder.removeAttribute !== 'function') return
      ;(holder.removeAttribute as (name: string) => void).call(holder, 'data-ghost')
    } catch {
      /* the target is closed too, not only the route */
    }
  }

  /** THE SETTLE — one answer, checked against the epoch it was ASKED under (`G3`): a superseded turn mutates NOTHING,
   *  neither a paint nor a removal. `G5`–`G9` are the answer's own node, field by field, and EVERY FAILING ARM OF THE
   *  ANSWER CLEARS — a status that is not `read`, a node that is not an object, a `_tier` that is not `temp`, a node
   *  naming another pane and a `size` that is not a finite non-negative number each reach the ONE `clearGhost()`, as a
   *  hostile answer's `catch` does. **THE TARGET ARM IS NOT ONE OF THEM** (`G9`): a target whose `setAttribute` is not a
   *  function RETURNS AHEAD OF THE PAINT, so it sets nothing and clears nothing — that target never carried the
   *  declaration, and has none to lose. */
  const settleGhost = (epoch: number, answer: unknown): void => {
    if (epoch !== ghostEpoch) return
    try {
      const record = answer as { readonly status?: unknown; readonly value?: unknown } | null | undefined
      const node = record !== null && record !== undefined && typeof record === 'object' && record.status === 'read' ? record.value : null
      if (node === null || typeof node !== 'object' || Array.isArray(node)) {
        clearGhost()
        return
      }
      const branch = node as Record<string, unknown>
      if (branch['_tier'] !== 'temp') {
        clearGhost()
        return
      }
      const member = branch[DEFAULT_PANE_ID]
      if (member === null || typeof member !== 'object' || Array.isArray(member)) {
        clearGhost()
        return
      }
      // **THE MEMBER'S `size` IS A LEAF NODE ON THE LIVE ROUTE** (`D-134`'s node contract): `data.read` answers every node
      // as the store's own `{_tier, …}` — an object node with its members INLINE, a LEAF as `{_tier, value:<literal>}` — so
      // the placement's size arrives as `{_tier, value: 200}` and a bare number is the same fact stated without a node (which
      // is the shape a double may answer). BOTH ARE READ; anything else is the closed arm. Nothing is judged here: the leaf
      // is unwrapped to the value it carries and no tier is re-derived (the branch's own `_tier` above is the one fact).
      const carried = (member as { readonly size?: unknown }).size
      const size = carried !== null && typeof carried === 'object' && !Array.isArray(carried)
        ? (carried as { readonly value?: unknown }).value
        : carried
      if (typeof size !== 'number' || !Number.isFinite(size) || size < 0) {
        clearGhost()
        return
      }
      const holder = ghostTarget as { readonly setAttribute?: unknown } | null | undefined
      if (holder === null || holder === undefined || typeof holder.setAttribute !== 'function') return
      ;(holder.setAttribute as (name: string, value: string) => void).call(holder, 'data-ghost', 'temp')
    } catch {
      // nothing escapes the delivery: a hostile answer clears the declaration rather than propagating
      clearGhost()
    }
  }

  const renderGhost = (): void => {
    ghostEpoch += 1
    const epoch = ghostEpoch
    try {
      void dataRoute('read', { path: ['drag'] }).then(
        (answer: unknown) => { settleGhost(epoch, answer) },
        () => { settleGhost(epoch, null) },
      )
    } catch {
      // A SYNCHRONOUS THROW FROM THE ROUTE IS CLOSED HERE, not only a rejection
      clearGhost()
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
    /** §2.1 B (candidatesFor) — THE CANDIDATE PRODUCTION SEAM, AND IT IMPLEMENTS **THE SEAM SHAPE `src/shared/relocate.ts`
     *  DECLARES WITHOUT IMPORTING IT** (`CandidateFor`, `{readonly candidate, readonly distance?}`), which is what this
     *  surface's own docblock above already says. **NO `src/` FILE IMPORTS THAT MODULE**, so the pure comparator there has
     *  no call site here and none is claimed: the record is produced and handed on by identity and the comparison is the
     *  caller's — the only importer in the tree is a battery's own drive (`D-111`). **NOW OFF THE SHAPE'S `['zones']`
     *  FAMILY** (`D-92`): the candidate carries the zone's OPAQUE `slot` and its caller-measured `distance`, and a zone
     *  whose `slot` the family does not name is admitted per the caller's own rule (no candidate) — never a store
     *  decision, never a throw (M-11, P-PD-IM-2). **`slot` IS OPAQUE AND IS HANDED THROUGH BY IDENTITY.** */
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
    rightClick: (gestureId: string): void => endReading(gestureId),
    cancel: (gestureId: string): void => endReading(gestureId),
    renderZone,
    renderGhost,
  }
}

