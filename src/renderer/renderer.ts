// src/renderer/renderer.ts — browser entry for the Electron renderer.
// Bootstraps the provident-ssr producing process into #app and serves the
// MCP-facing operations over the preload bridge (main process = MCP server).
import { Runtime } from './runtime.js'
import { demoEnvelope, gutterSeamExample, GUTTER_AFFORDANCE_ID, GUTTER_STATUS_ID, GUTTER_TARGET_ID, TABS_LANDING_PAGE_ID, TABS_ERROR_PAGE_ID, TABS_ROWS_ID, TABS_ROW_PROTOTYPE_ID, TABS_ADD_ID, APP_ROOT_ID, OVERLAY_STATE_ID, OVERLAY_OPEN_ID, OVERLAY_CLOSE_ID, OVERLAY_DIALOG_ID, MENUS_AFFORDANCE_ID, MENUS_RECEIPT_ID, LAYOUT_MEASURED_ID } from '../shared/demo-envelope.js'
import { overlayTransition, overlayInertDeclaration, type OverlayState } from '../shared/overlay.js'
import { SecurePanels } from './secure-panels.js'
import { createGestureSession, POINTER_TYPES } from '../shared/gesture-session.js'
import { createGutterAffordance, domEventSource } from '../shared/gutter-affordance.js'
import type { RpcRequest, RpcReply, TabsRecordRow } from '../shared/types.js'
import { clampToBounds } from '../shared/gutter.js'
import { createTabsClient, NEW_TAB_TARGET_PREFIX, type TabsClient, type TabsClientReading, type TabsCommittedAnswer, type TabsNodeResolver, type TabsSubscription } from './tabs-client.js'
import { createViewClient, type ViewClient, type ViewClientReading, type ViewSubscription, type ViewWriteOutcome } from './view-client.js'
import { createModuleClient, type ModuleClient, type ModuleClientReading, type ModuleSubscription } from './module-client.js'
import { createSecurityClient, type SecurityClient, type SecurityClientReading, type SecuritySubscription } from './security-client.js'
import { DEFAULT_PANE_BOUNDS, DEFAULT_PANE_ID, MENUS_PANE_ID, defaultPaneGeometry, zoneIn, type ViewPaneGeometry, type ViewThemeRecord } from '../shared/view-shape.js'
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
 *  It answers the runtime's status word, or this file's own `'threw'`/`'no-answer'` statement.
 *
 *  **THE VALUE IS CSS TEXT, NOT AN OBJECT, AND `D-203` IS WHY**: measured in a real Electron DOM against this module's
 *  own `Runtime`, an OBJECT on `css.style` answers `applied` and writes **NOTHING** — the `style` attribute ends up
 *  EMPTY and the computed style does not move — while CSS text in the same slot lands. So the object spelling made this
 *  drive a write that reported success and showed nothing, in every terminal this app has ever hidden. **THE ENGINE'S
 *  OBJECT HANDLING STAYS UPSTREAM-OWNED** (`D-5`): the spelling changes here, the mechanism does not. */
function drivePageDisplay(runtime: TabsPageRuntime | null, nodeId: string, shown: boolean): string | null {
  if (runtime === null) return null
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'css.style', mode: 'replace', value: `display: ${shown ? 'block' : 'none'}` }],
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

/** **THE GESTURE'S ADDRESS — ONE ENTRY PER AUTHORED HANDLE, AND THE LOOKUP IS A DECLARED LIST RATHER THAN ONE CONSTANT**
 *  (`D-189`, `D-192`, `D-193`; `app-layout`'s `menus-handle-drag`, the user's report *"Menu pane does not drag when clicking
 *  and dragging handle"*). **THE DEFECT THIS SHAPE DELETES, MEASURED**: the wiring was SINGLE-ADDRESSED — one
 *  `elementForNodeId(GUTTER_AFFORDANCE_ID)` and one closure constant naming THAT handle — so the menus pane's authored
 *  handle (`MENUS_AFFORDANCE_ID`, painted at `D-232`) carried its `axis` attribute and NO GESTURE AT ALL, while the
 *  envelope's own note claimed the tree's one drag composition was bound to `DEFAULT_PANE_ID`.
 *
 *  **THREE MEMBERS, AND WHY THE MEMBER IS NOT ONE OF THEM.** `handleId` is the authored node's id — which is ALSO the
 *  gesture key every seat of that handle is handed (`move`/`release`/`cancel`) and the id whose element the wiring
 *  resolves through `Runtime.elementForNodeId`, the graph read and never a selector. `paneId` is the RECORD's key, declared
 *  once in `src/shared/view-shape.ts`. **THE AXIS MEMBER IS DELIBERATELY ABSENT**: which of a pane's two stored members a
 *  gesture may move is the pane's own `zone`'s selection (`adjustableMemberNameOf`; `D-189`, `D-191` — the orthogonal one,
 *  the zone's fixed axis being the fill), read by the composition at this entry's pane id, so a member spelled here would
 *  be a second answer to a question the record already answers and the two could disagree the moment a `zone` moved.
 *
 *  **`sign` IS THE HANDLE'S EDGE AND NOT A TASTE** (`C-13`, `D-189`, `D-192`): `GUTTER_AFFORDANCE_ID` sits at `pane-a`'s
 *  TOP-RIGHT, so a pointer moving right/down GROWS the figure (`+1`); `MENUS_AFFORDANCE_ID` now sits at the menus pane's
 *  TOP-RIGHT too — the pane's RIGHT edge, for the reason the entry below states — so the same rightward pointer grows
 *  the width and the same `+1` stands. **THE SIGN MULTIPLIES THE DELTA FROM THE PRESS AND NEVER THE FIGURE**
 *  (`sizeFromPointerFor` at the mapping's own site): the figure is `sizeAtPress ± (pointer − press)`, so one sign per
 *  handle and no second arithmetic.
 *
 *  **AND THE MENUS HANDLE MOVED FROM THE PANE'S LEFT EDGE TO ITS RIGHT, WHICH CONTRADICTS `D-189`'S SENTENCE AND FOLLOWS
 *  ITS REASON.** `D-189` (user-sourced, verbatim) says *"drag handle to left side of horizontally-oriented (top/bottom
 *  zone) pane"*, and states why: *"the handle therefore always sits at an edge the adjustable axis can move."* **THIS
 *  PANE IS LEFT-ANCHORED** — it is the top zone's first child, a block at its own painted width — so its LEFT EDGE IS
 *  THE ANCHOR: it does not move when the width changes, and the pointer standing on it can never travel with the figure
 *  it writes. The two readings of the sentence therefore disagree: *"the pane's left side"* names the edge the box is
 *  pinned by, and the sentence's own reason asks for the edge the axis CAN move, which for a left-anchored box is the
 *  RIGHT one. **This pass takes the reason.** **THE COST IS THE USER'S OWN SENTENCE AND IS ROUTED, NOT HIDDEN**: a
 *  user-sourced placement is contradicted here and the contradiction belongs to L0/L3, not to this seat (`D-3`); what it
 *  buys is that a press, a drag and the painted edge are ONE point — the property the user's complaint asks for. **AND
 *  THE MEASUREMENT SETTLES IT AGAINST THE ALTERNATIVE**: with the grip on the pane's left edge the handle box begins
 *  `2px` from the window's left edge (`D-245`'s measured `[2,36,14,125]`), so *"dragging left grows a left-anchored
 *  pane"* — the one sign that would make that edge coherent — could widen the pane by the `~9px` between the strip and
 *  the window and no more. A resize that cannot grow is not coherent in either reading. */
export interface PaneGestureAddress {
  /** The authored handle's own node id — and the gesture key every seat of THIS handle is handed. */
  readonly handleId: string
  /** The pane this handle's gesture addresses — the record's own key (`DECLARED_PANE_IDS`). */
  readonly paneId: string
  /** `+1` where the handle stands at the pane's TOP-RIGHT edge, `-1` where it would stand on the LEFT one — the edge the
   *  adjustable axis CAN move, which is why both of this app's pane handles carry `+1` (see the block above). */
  readonly sign: 1 | -1
}

/** **THE LIST — A THIRD HANDLE COSTS ONE LINE HERE AND NO SECOND COPY OF THE GESTURE.** Its FIRST entry is the stage's, and
 *  it is the `GESTURE_KEY` constant this wiring used to spell (`D-138`'s one key becoming one key PER HANDLE, unchanged in
 *  value for the handle that had one); the second entry is the menus pane's, and it is the whole of the menus handle's
 *  wiring. The composition is constructed ONCE (`S-9`'s call-site count is unmoved), the affordance mechanism is the
 *  module's, and nothing about the two entries is duplicated: each costs one closure set and one `attach()` reading.
 *  **AND THE MENUS ENTRY'S `sign` IS `+1` BECAUSE ITS HANDLE STANDS ON THE PANE'S RIGHT EDGE** — the edge away from the
 *  pane's left anchor, the edge the width can move and the point a press can therefore travel with. What the entry
 *  states is unchanged and only its FIGURE moved: `-1` was correct for a handle on the left edge of a box that grew
 *  leftward, and this box grows rightward (`PANE_NODE`'s own left-anchoring, `demo-envelope.ts`'s authored pane). */
const PANE_DRAG_HANDLES: readonly PaneGestureAddress[] = [
  { handleId: GUTTER_AFFORDANCE_ID, paneId: DEFAULT_PANE_ID, sign: 1 },
  { handleId: MENUS_AFFORDANCE_ID, paneId: MENUS_PANE_ID, sign: 1 },
]

/** **THE ZONE'S COUNTERPART OF `PaneGestureAddress` — THE SAME THREE IDEAS AND ONE MEMBER MORE**
 *  (`docs/L3/renderer-wiring/design-zone-handles.md` rev 1 §3; `D-234`, `D-238`, `D-243`).
 *  `handleId` is the authored strip's own node id — also the gesture key every seat of that strip is handed — and
 *  `zoneId` is the RECORD's declared id (`DECLARED_ZONE_IDS`' member), never the node's id spelling: the two are one
 *  string on this app's tree, and that equality is a ROW's (`AL-10`'s form) and never a derivation (`D-188` debt 2).
 *  **THE TWO MEMBERS A PANE'S ENTRY DOES NOT HAVE ARE THE ONES A ZONE NEEDS**: `axis` is the POINTER coordinate the
 *  strip reads — `y` for `top`/`bottom`, `x` for `left`/`right` — and it is declared HERE because, unlike a pane's, it
 *  is not the record's to answer: a pane's adjustable axis is selected by its `zone` (`adjustableMemberNameOf`), while
 *  a zone's fixed axis is the layout constant `LAYOUT_ZONE_AXES` states. `targetId` is the ZONE node the inline
 *  transient is written on — the strip's SUBJECT, where the pane composition has one fixed `GUTTER_TARGET_ID`. */
interface ZoneGestureAddress {
  /** The authored strip's own node id — and the gesture key every seat of THIS strip is handed. */
  readonly handleId: string
  /** The zone this strip resizes — the record's own key (`DECLARED_ZONE_IDS`). */
  readonly zoneId: string
  /** The POINTER coordinate this strip reads: `y` for `top`/`bottom`, `x` for `left`/`right`. */
  readonly axis: 'x' | 'y'
  /** `+1` where the bounding edge moves toward increasing coordinate, `-1` where it moves back. */
  readonly sign: 1 | -1
  /** The ZONE node the inline preview is written on — this strip's subject, never the composition's one target. */
  readonly targetId: string
}

/** **THE FOUR ZONE STRIPS, ON THE EDGE THE STAGE NAMES** — `top` on its BOTTOM edge, `bottom` on its TOP, `left` on its
 *  RIGHT and `right` on its LEFT, because that bound's POSITION is the zone's `size` (`D-185`): the edge facing the stage
 *  is the one a person pushes, and `top`/`left` grow as that edge moves toward the increasing coordinate (`+1`) while
 *  `bottom`/`right` grow as it moves back (`-1`).
 *  **THE SIGN IS ONE COEFFICIENT AND NOT A TASTE** (`D-238`'s own form, `D-192`): one mapping — the anchored
 *  `sizeAtPress ± (pointer − press)` this pass makes true at the mapping's own site — with the sign applied to the DELTA
 *  where the edge's sense inverts, so four rows carry four facts and no second arithmetic exists. **THE FOUR SIGNS ARE
 *  THE EDGES' AND THEY STAND UNMOVED BY THAT FIX**, because each follows from WHERE the strip stands: `top`'s strip is
 *  `#top`'s FOLLOWING sibling, i.e. below it, so a downward pointer (+y) grows the figure (`+1`); `bottom`'s strip is
 *  `#bottom`'s PRECEDING sibling, i.e. above it, and a `bottom` size is the distance from the window's foot UP to that
 *  edge, so a downward pointer SHRINKS it (`-1`); `left`'s strip is `#left`'s following sibling in the arrangement row, so
 *  a rightward pointer (+x) grows it (`+1`); and `right`'s strip precedes `#right`, and a `right` size is the distance
 *  from the window's right in, so a rightward pointer SHRINKS it (`-1`).
 *  **`PANE_DRAG_HANDLES` IS NOT RE-GRAINED AND THAT IS DELIBERATE** (`D-238`, `PS-1`…`PS-4`): its entries, its absent
 *  axis member and the ONE `sign` this pass moved (the menus entry's, with its edge — see the block above the list) are
 *  a landed MEASUREMENT, and `gestureAddressesOf()` below maps it verbatim into the one list the affordance loop walks.
 *  The second subject KIND is therefore an adapter at the loop's head and never a second gesture (`D-238`'s own reason,
 *  one subject over).
 *  **NOTHING HERE IS EXPORTED**: a published name would move this module's surface and the design refuses one, while the
 *  four ids are LITERALS on both sides — the envelope's (`zoneStripNodeOf`'s call sites) and this table's — with the
 *  equality measured by `PS-1`'s census rather than derived (the zone ids' own precedent, `LAYOUT_ZONE_AXES`'). */
const ZONE_DRAG_HANDLES: readonly ZoneGestureAddress[] = [
  { handleId: 'zone-top-horizontal', zoneId: 'top', axis: 'y', sign: 1, targetId: 'top' },
  { handleId: 'zone-bottom-horizontal', zoneId: 'bottom', axis: 'y', sign: -1, targetId: 'bottom' },
  { handleId: 'zone-left-vertical', zoneId: 'left', axis: 'x', sign: 1, targetId: 'left' },
  { handleId: 'zone-right-vertical', zoneId: 'right', axis: 'x', sign: -1, targetId: 'right' },
]

/** **WHAT A HANDLE'S FIGURE LANDS IN** — the one thing that differs between the two subject kinds, and the ONLY member
 *  of this adapter that is not already declared: a pane's entry is `{kind: 'pane', id: paneId}` (mapped verbatim from
 *  `PANE_DRAG_HANDLES`) and a strip's is `{kind: 'zone', id: zoneId}`. `id` is a pane's record key or a zone's declared
 *  id, and the `kind` is what tells the two vocabularies apart — never the string's spelling. */
interface GestureSubject {
  readonly kind: 'pane' | 'zone'
  readonly id: string
}

/** **ONE ROW OF THE LIST THE LOOP WALKS** — the two declarations' common shape: the authored handle, the subject its
 *  figure lands in, the pointer axis and sign its mapping reads, and the element an inline preview is written on. */
interface GestureAddress {
  readonly handleId: string
  readonly subject: GestureSubject
  readonly axis: 'x' | 'y'
  readonly sign: 1 | -1
  readonly targetId: string
}

/** **THE ADAPTER AT THE LOOP'S HEAD — THE SECOND SUBJECT KIND COSTING NO SECOND GESTURE** (design §3).
 *  `PANE_DRAG_HANDLES` is mapped VERBATIM and gains nothing: its `axis` is `'x'` — the pane arm reads the pointer's x,
 *  the landed declaration `PS-1`'s gesture clause pins, and NOT a member this pass re-grains — and its `targetId` is the
 *  composition's ONE target (`D-144`). **THE MAPPING ITSELF IS NEITHER THIS TABLE'S NOR THE ADAPTER'S**: the figure is
 *  `sizeFromPointerFor`, anchored on the record's figure at the press, and each entry contributes only its `sign`. The
 *  four strips follow it in declaration order, so the loop's resolution order is the pane handles' first and the strips'
 *  after, which is what `PS-1`'s order reading states. **THE PANE ARM'S `axis` DOES NOT MOVE AND THE ZONE ARM IS THE ONLY
 *  NEW BEHAVIOUR** — and a hostile or frozen `PANE_DRAG_HANDLES` cannot reach it: both sides are module constants.
 *  **ONE DEBT NAMED RATHER THAN TAKEN**: the stage handle reads `x` while the member it resizes is `pane-a`'s `height`
 *  and the handle stands at that pane's TOP-RIGHT, so its figure grows along the wrong coordinate for its edge. It is
 *  `D-189`'s placement rule as landed and `PS-1` pins the read it produces (`clientX 250 → 150`), so the axis is that
 *  row's and not this pass's; the anchoring fix above is indifferent to which coordinate the entry names. */
function gestureAddressesOf (): readonly GestureAddress[] {
  const panes: GestureAddress[] = PANE_DRAG_HANDLES.map((handle) => ({
    handleId: handle.handleId,
    subject: { kind: 'pane', id: handle.paneId },
    axis: 'x',
    sign: handle.sign,
    targetId: GUTTER_TARGET_ID,
  }))
  const zones: GestureAddress[] = ZONE_DRAG_HANDLES.map((handle) => ({
    handleId: handle.handleId,
    subject: { kind: 'zone', id: handle.zoneId },
    axis: handle.axis,
    sign: handle.sign,
    targetId: handle.targetId,
  }))
  return [...panes, ...zones]
}

/** **THE CLAMP'S CEILING — THE WINDOW'S OWN EXTENT ON THE AXIS A ZONE FIXES** (`docs/L3/renderer-wiring/
 *  design-zone-handles.md` rev 1 §5); `null` is this read's STATED ABSENCE and never a figure: a zone can never exceed
 *  the window it stands in, which is the *"bounded by the window"* half in its only measurable form.
 *  **THE READ IS STRUCTURAL AND ANSWERS `null`, NEVER A THROW AND NEVER `undefined`-INTO-`NaN`**: the W1 idiom — a realm
 *  that does not answer a finite POSITIVE number gets the degradation, and the degradation is the CALLER's (the record's
 *  own figure, `zoneBoundsOf` below). **THAT IS `D-238`'S LESSON TAKEN AT ITS OWN SITE**: the menus pane's handle was
 *  wired and inert because `paneBoundsOf` answered `undefined`, `clampToBounds` turned it into `NaN` and every move was
 *  invalid — the failure mode that looks wired. So this function's two arms are a number and an explicit absence, and the
 *  arm it does not have is the one that answers `undefined`.
 *  **AND IT IS READ PER MOVE RATHER THAN CACHED**: the extent is `window.innerWidth`/`innerHeight`, which moves with the
 *  window, so a figure captured at construction would be stale at the first resize — a read has no such lifetime. */
function zoneExtentOf (axis: 'x' | 'y'): number | null {
  try {
    if (typeof window === 'undefined') return null
    const raw = axis === 'x' ? window.innerWidth : window.innerHeight
    return typeof raw === 'number' && Number.isFinite(raw) && raw > 0 ? raw : null
  } catch {
    // a hostile realm is the same arm as one that measures nothing: the caller degrades to the record's own figure
    return null
  }
}

/** **THE MEMBER A ZONE'S FIGURE LANDS ON, READ OFF `LAYOUT_ZONE_AXES` RATHER THAN SPELLED A SECOND TIME** (`D-243`,
 *  `D-240`): the paint's own table already answers which of `height`/`width` each declared zone fixes, and the inline
 *  preview writes the SAME member the delivery will paint (`Z5`). **A SECOND TABLE WOULD SPELL FOUR FACTS TWICE WITH NO
 *  INSTRUMENT TO CATCH THEM DRIFTING** (`D-188` debt 2) — and a strip previewing a member the paint never writes would
 *  move a box that snaps back on the next delivery, which is `D-238`'s class of defect one layer down. `null` is the
 *  declared absence for an id the closed four do not name: no member, no preview, and the commit is still the record's. */
function zoneMemberOf (zoneId: string): 'height' | 'width' | null {
  const held = LAYOUT_ZONE_AXES.find((entry) => entry.id === zoneId)
  return held === undefined ? null : held.member
}

/** **WHAT THE WIRING READ FOR ONE HANDLE** — its authored id, the SUBJECT it addresses (`paneId`, carrying the record's
 *  pane key or the record's zone id according to `subject`) and whether the affordance ATTACHED. A
 *  REFUSED `attach()` is the DECLARED silent failure the affordance cannot report itself (`D-117`): the handle is then
 *  INERT and every later gesture on it is a no-op nobody hears, so the reading is returned for `main()` to say out loud —
 *  the rule that was applied to the one handle and is now owed to every entry of the list.
 *  **`paneId` IS THE SUBJECT'S KEY AND `subject` SAYS WHICH VOCABULARY THAT KEY IS IN**: for a pane handle the two are the
 *  same thing (`PS-1`'s pane clause, `main()`'s refusal line), and the four strips report their ZONE's declared id in the
 *  same member — one member for one idea, with the KIND beside it so no reader has to infer a vocabulary from a string's
 *  spelling. **THE MEMBER KEEPS ITS NAME** because every existing reader reads a page of pane entries, and renaming it
 *  would move those readers for the sake of the four entries that widened the list. */
export interface PaneGestureReading {
  readonly handleId: string
  readonly paneId: string
  readonly subject: 'pane' | 'zone'
  readonly attached: boolean
}

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
   *  `console.error` now (the sink closure's ONE surviving virtue), as it always was.
   *  **IT IS THE FIRST ENTRY'S READING** — `PANE_DRAG_HANDLES`' stage handle, whose `attach()` this member
   *  has always reported — so every existing reader (and every row measuring this member in a realm where
   *  only the stage's handle resolves) reads exactly what it read before the list existed. `handles` beside
   *  it carries the same fact for EVERY entry. */
  readonly attached: boolean
  /** **EVERY HANDLE'S OWN READING, IN THE LIST'S ORDER** — the per-entry successor of `attached`, one record per
   *  declaration, so a second handle's refusal is as sayable as the first one's (`D-117`'s rule applied to a list). */
  readonly handles: readonly PaneGestureReading[]
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
  // **THE TARGET IS RESOLVED ONCE AND IS THE SAME NODE FOR EVERY ENTRY** (`D-144`): `GUTTER_TARGET_ID` is the element the
  // ghost's `data-ghost` declaration and the inline preview write to, and it is the COMPOSITION's, not a handle's — the
  // declaration list names handles and panes and nothing else.
  const target = runtime.elementForNodeId(GUTTER_TARGET_ID)
  const seams = gutterSeamExample()
  const source = domEventSource()
  /** **THE LIVE GESTURE'S GEOMETRY, BUILT ONCE FROM THE CROSSING** (`D-117`). `createPaneDrag` is the
   *  composition that reads `view.paneSizeOf`/`paneBoundsOf` and writes with `commitPane`; until this
   *  pass it had NO caller under `src/` and the app's live gesture went round it, reading the authored
   *  pane element's attributes through `gutterSeamExample`'s pair. The `source` is this wiring's own
   *  event source, which carries no `layout` member: **NO ZONE TURN STANDS ON THIS SURFACE** (`renderZone` is DELETED —
   *  `D-168`), no zone turn was ever called, and **no layout PROJECTION is rendered anywhere in this tree** — the
   *  delivery's ONE body is `theme?.apply(); ghost?.(); readout?.(); paint?.()` and it calls nothing else, where the FOURTH
   *  member is the LAYOUT PAINT (`D-185`, `D-194`): it reads the view record and writes four authored nodes' `css.style`,
   *  which is not `renderZone` returning and needs no `layout` member to do it.
   *  CONSTRUCTED HERE AND NOT PER GESTURE, and it reads nothing: every read is a caller turn.
   *  **AND IT IS HANDED THE PANE ELEMENT THE GHOST'S DECLARATION LANDS ON** (`D-144`): `target` is this
   *  function's own `elementForNodeId(GUTTER_TARGET_ID)` reading, the element the inline preview writes
   *  to, so the declared transient and the preview's style write land on ONE element and no second
   *  resolution exists.
   *  **AND IT IS HANDED THE LIST** (`app-layout`'s `menus-handle-drag`): `addressing` is how ONE construction serves
   *  every handle — the gesture key each seat carries names the pane that seat writes, and the element each read is
   *  handed names its pane the same way, so no second composition, no second route and no second read derivation
   *  exists. A backing that supplies none of it behaves exactly as it did before the list (the composition's
   *  `DEFAULT_PANE_ID`), which is what the node batteries and the demo construct. */
  const drag = createPaneDrag({ view: getViewClient(), ghostTarget: target, addressing: PANE_DRAG_HANDLES }, source)
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
   *  *failed read turned into a state*. **AND THE READ-OUT IS EMPTY UNTIL A `'record'` DELIVERY PAINTS IT**, on a
   *  first boot and on a second alike: `demo-envelope.ts` no longer authors `content` on `#gutter-status` — a local
   *  default over a shape `panesMustStand` already enforces, `D-129`'s case (b) — so the node authors no figure at
   *  all and `authoredSettingOf` reads that absence as a readable `''`, which no size string can equal (`D-174`:
   *  an empty reading that is never wrong, rather than a `'100'` that was right on one boot and false on the next).
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
  /** **THE SEAT'S KEY IS THE HANDLE'S OWN — ONE PER ENTRY OF `PANE_DRAG_HANDLES`** (`D-138`, ASM-L3-2; `app-layout`'s
   *  `menus-handle-drag`). It was ONE closure constant, `GESTURE_KEY = GUTTER_AFFORDANCE_ID`, handed to BOTH drag writes
   *  of the app's ONE gesture; the list's FIRST ENTRY IS THAT CONSTANT, unchanged in value (`GUTTER_AFFORDANCE_ID`), and
   *  the second entry's key is the menus handle's own id. The property the constant had is kept PER HANDLE: the `commit`
   *  seam's `release` and the preview seam's two arms of one handle are handed the SAME string, so each gesture's ending is
   *  reached exactly once — and the composition's ending flag is keyed by that string, so two handles cannot suppress each
   *  other's erase. It is the affordance ELEMENT's authored id, the id this wiring resolves; the HANDLE the `commit` seam is
   *  handed carries a NUMBER `id`, which is why the old `gestureIdOf` read retired rather than answering `''`. */
  /** **THE ONE ARITHMETIC, TAKEN TWICE: THE EXAMPLE'S MAPPING ANSWERS THE DELTA, NOT THE FIGURE** (`C-13`, `D-189`,
   *  `D-192`). `gutterSeamExample().sizeFromPointer(pointer, origin)` answers `pointer.x − origin` and
   *  `verticalFromPointer` the same in `y`, so ONE expression states the distance between a pointer and an origin on
   *  either axis — and this pass reads it against TWO origins rather than writing a second mapping beside it. */
  const deltaFromPointer = (address: GestureAddress, pointer: { readonly x: number }, origin: number): number =>
    address.axis === 'x' ? seams.sizeFromPointer(pointer, origin) : verticalFromPointer(pointer, origin)
  /** **THE FIGURE IS `sizeAtPress ± (pointer − press)` — ANCHORED ON THE FIGURE THE RECORD ALREADY HOLDS, AND THE COPY
   *  THAT WAS NOT ANCHORED IS THE DEFECT THIS PASS DELETES** (the user's report: *"On drag start, the zone resizes to 0
   *  size, then allows the drag. This results in the handle being separated from the pointer"*). What stood here was
   *  the EXAMPLE's mapping read as a FIGURE — `pointer[axis] − start` — which is correct for the demo's own pane and
   *  for nothing else: the demo's pane BEGINS at zero, so there the pointer's coordinate and the distance from the
   *  press are the same number. **A zone already holds `140` at the press, so the first observed move wrote `≈0`**: the
   *  box collapsed under the pointer, the handle that stands on that very edge went with it, and every later move
   *  landed on the page instead of on the handle (`D-245`'s measurement and its `busy` latch). **THE SAME MAPPING DROVE
   *  THE PANE HANDLE**, which is why a trusted drag took `['panes','pane-menus','width']` `100 → 0`.
   *
   *  **SO THE FIGURE IS ANCHORED, AND `start` IS ALREADY THE ANCHOR'S FIGURE.** The affordance calls this seam once
   *  per observed move as `sizeFromPointer(pointer, current.start)`, and `current.start` is `startSizeOf`'s answer —
   *  read EXACTLY ONCE, at establishment (`§2.4` item 3, `P-GU-IM-2`). For a PANE that read is the composition's
   *  (`drag.startSizeOf` → `readPaneSize` → `paneSizeOf(<this handle's pane>)`, the crossing's measured default for a
   *  pane the family does not name); for a ZONE STRIP it is `zoneSizeOf`, i.e. `['zones', <id>, 'size']` off the same
   *  client. **So the figure the record holds at the press reaches this seam through the affordance's own recorded
   *  answer, and the anchored figure costs one subtraction and opens no channel.** The PRESS COORDINATE is this
   *  wiring's (`anchorOnPress` below): the gesture's own `pointerdown`, whose `clientX`/`clientY` the example's
   *  `pointerOf` resolves, recorded per handle at the press that opened it.
   *
   *  **THE `sign` MULTIPLIES THE DELTA AND NEVER THE FIGURE** (`D-189`, `D-192`): `+1` where a pointer moving toward the
   *  increasing coordinate grows the figure, `-1` where it shrinks it — the handle's EDGE, stated per entry above. The
   *  clamp that follows is the composition's, unchanged.
   *
   *  **AND THE NO-FIGURE ARM IS A REFUSAL, NEVER A DECLARED DEFAULT.** A zone whose record states no `size` answers
   *  `undefined` from `zoneSizeOf`, and `Number.NaN` out of this seam makes every observed move INVALID: the reset arm
   *  fires, the preview reverts, and the release's own gate refuses a non-finite figure — so **NOTHING IS WRITTEN**. A
   *  declared default there would be `D-129`'s second authority, right on one boot and false after the first gesture
   *  (`D-174`, `D-243`'s no-default rule): the record is the only author of a figure, so a gesture that cannot read one
   *  declines rather than inventing one. **A PANE CANNOT REACH THAT ARM** — `paneSizeOf` answers its measured default.
   *
   *  **AND THE ARM WHERE THE PRESS ITSELF STATES NO COORDINATE KEEPS THE EXAMPLE'S MAPPING, DELIBERATELY.** The
   *  layout-less shim is the whole node suite's realm (`D-27`) and its pointers carry no coordinate at the press
   *  (`tests/unit/renderer-wiring/preview-seat.test.ts` drives `pointerdown` with `{button: 0}`), so there is no anchor
   *  to subtract and the example's own arithmetic is the only figure such a realm can answer. It is the DECLARED
   *  degradation, it is reachable in no window (a real `pointerdown` always carries `clientX`/`clientY`), and the
   *  alternative — a no-op move — would silently un-measure `PS-1`'s gesture. */
  const sizeFromPointerFor = (address: GestureAddress, pressCoordinateOf: () => number | null) =>
    (pointer: { readonly x: number }, start: number): number => {
      // THE FIGURE THE RECORD STATED AT THE PRESS — `startSizeOf`'s one answer. Without it this gesture declines.
      if (typeof start !== 'number' || !Number.isFinite(start)) return Number.NaN
      const signed = (delta: number): number => (address.sign === 1 ? delta : -delta)
      const press = pressCoordinateOf()
      // THE DEGRADED ARM: a realm whose press states no coordinate cannot anchor, so the example's mapping stands.
      if (press === null) return signed(deltaFromPointer(address, pointer, start))
      // THE ANCHORED FIGURE: the record's own, moved by the signed distance the pointer has travelled since the press.
      return start + signed(deltaFromPointer(address, pointer, press))
    }
  /** **THE VERTICAL ARM OF THE ONE MAPPING — `pointer.y - start`, AND THE SEAM'S TYPE DOES NOT DECLARE `y`**
   *  (design §3; `gutterSeamExample().sizeFromPointer` types the pointer `{ readonly x: number }`, `:345`). So the
   *  `y` member is read STRUCTURALLY through the example's own `typeof` gate and the answer for anything that is not a
   *  number is `Number.NaN` — **the example's own degradation, carried over rather than invented**: a `NaN` makes the
   *  affordance's `M1`-shaped gate call the move INVALID rather than write a figure, which is exactly what a pointer
   *  this realm cannot read must do. **NO OTHER MODULE'S FILE MOVES**: widening the seam's type would be a second
   *  owner's hunk for a member the runtime already carries (`pointerOf` answers `{x, y}`, frozen, at
   *  `demo-envelope.ts`). */
  const verticalFromPointer = (pointer: { readonly x: number }, start: number): number => {
    let coordinate: unknown
    try {
      const held = pointer as unknown as { readonly y?: unknown } | null | undefined
      coordinate = held === null || held === undefined ? undefined : held.y
    } catch {
      // a hostile pointer is the non-number arm below: an INVALID move and no write
      return Number.NaN
    }
    return typeof coordinate === 'number' ? coordinate - start : Number.NaN
  }
  /** **Z1 — THE RECORD'S OWN FIGURE, AND NOTHING ELSE** (design §4; `view-client.ts`'s `zoneOf`, `D-152`, `D-174`).
   *  `['zones', <zone>, 'size']` is the ONE source of a zone's dimension, and this read answers it off the shape the
   *  client holds — the same synchronous read `drag.startSizeOf` is for a pane. **THE ABSENCE ARM IS THE WHOLE OF IT**:
   *  a zone the family does not name, or one it names with NO `size`, answers `undefined` and the gesture then writes
   *  NOTHING (a `NaN` start makes every move invalid and the release's own gate refuses a non-finite figure) — no
   *  default, no fallback and no remembered figure, because a `size` the record does not state is a figure this realm
   *  must not invent (`D-174`, `D-191`'s `OWED-4`, `D-233`'s no-default rule one family over).
   *  **AND IT IS TOTAL OVER A SHAPE WHOSE READ THROWS** (`D-95`): a throwing `zoneOf` answers the same absence an
   *  absent family does, so no exception escapes a listener turn. */
  const zoneSizeOf = (zoneId: string): number | undefined => {
    try {
      const zone = getViewClient().zoneOf(zoneId)
      const figure = zone === null ? undefined : zone.size
      return typeof figure === 'number' ? figure : undefined
    } catch {
      // a hostile shape must never throw out of the size read — the absent member's own answer, and no write
      return undefined
    }
  }
  /** **Z3 — THE CLAMP, AND IT IS FINITE IN EVERY REALM** (design §5; `D-238`, `D-240`, `D-26`).
   *  `{min: 0, max: the WINDOW's extent on the axis this zone fixes}` — a zone can never exceed the window it stands in,
   *  which is the charter's *"bounded by the window"* in its only measurable form. **THE FLOOR IS `0` AND IT IS LAWFUL**:
   *  the record already carries a `0` minimize marker (`D-234`'s repair keeps it, the paint's own gate admits
   *  `size >= 0`), so a drag CAN produce `0` and a `0`-sized zone is a record the design admits rather than a state the
   *  gesture must forbid — recoverable, because the strip is the zone's SIBLING and keeps its own `14px`.
   *  **THE DEGRADATION IS THE RECORD'S OWN FIGURE AND THE HONEST DIRECTION**: where the realm answers no finite positive
   *  extent — the layout-less shim, which is the whole node suite's realm (`D-27`) — the ceiling is the zone's current
   *  `size`, so the gesture can only SHRINK what it cannot measure. **A `NaN` HERE IS WHAT MADE THE MENUS HANDLE INERT
   *  WITH THE WIRING LOOKING CORRECT** (`D-238`: `paneBoundsOf` answered `undefined`, `clampToBounds` turned it into
   *  `NaN`, every move was invalid) — so every arm of this closure answers a FINITE pair, and the arm it does not have
   *  is the one that answers `undefined`. A zone stating no figure at all answers `{0, 0}`, which the `NaN` start
   *  beside it has already made unreachable as a write. */
  const zoneBoundsOf = (address: GestureAddress): { readonly min: number; readonly max: number } => {
    const extent = zoneExtentOf(address.axis)
    if (extent !== null) return { min: 0, max: extent }
    const own = zoneSizeOf(address.subject.id)
    return { min: 0, max: own === undefined ? 0 : own }
  }
  /** **Z5 — THE TRANSIENT IS AN INLINE STYLE WRITE ON THE ZONE ELEMENT** (design §4; `D-138`'s `P1`–`P5` shape,
   *  `D-234`, `D-243`). It is `applyPreview`'s own class: a RENDERED element write and NEVER a graph write, so no
   *  second author touches the `css.style` the painter replaces whole (`D-129`) — **and the next delivery replacing it
   *  is the declared transient's own contract, not a bug**: a preview that outlives its gesture is replaced by the
   *  record's figure, so a stale figure is never fabricated and never persisted.
   *  **THE MEMBER IS THE ONE THE PAINT WRITES** (`zoneMemberOf` over `LAYOUT_ZONE_AXES`) — a preview on any other
   *  member would move a box the delivery never restores, and reading the table rather than spelling `height`/`width`
   *  here is `D-243`'s own rule.
   *  **IT RESOLVES THE ZONE LAZILY AND NEVER AT CONSTRUCTION**: `elementForNodeId(address.targetId)` is called here, on
   *  the arm that actually writes, so the wiring's construction resolves the composition's ONE target and one element
   *  per declared HANDLE and nothing else — the order and the count `PS-1` reads. A zone element the graph does not
   *  resolve is the declared no-write arm (`P1`/`P2`): the pointer moves, the transient is skipped, and the RELEASE's
   *  commit still lands the figure in the record, which is where a zone's size actually lives. */
  const zonePreviewOf = (address: GestureAddress, state: unknown): void => {
    const value = (state as { readonly value?: unknown } | null | undefined)?.value
    if (typeof value !== 'number' || !Number.isFinite(value)) return
    const member = zoneMemberOf(address.subject.id)
    if (member === null) return
    let element: unknown = null
    try {
      element = runtime.elementForNodeId(address.targetId)
    } catch {
      element = null
    }
    const holder = element as { readonly style?: { setProperty?: unknown } } | null | undefined
    if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
    const set = holder.style.setProperty
    if (typeof set !== 'function') return
    ;(set as (property: string, text: string) => void).call(holder.style, member, `${String(value)}px`)
  }
  /** **Z6 — THE ONE WRITE: `commitZones(<zoneId>, { size })`, ONE LEAF AT `['zones', <zoneId>, 'size']`, TIER `mem`**
   *  (design §4; `D-151`'s route — which had NO UI caller until this turn — `D-152`, `D-91`'s family table).
   *  **THE CALLER STATES NO TIER, BECAUSE A DRAG DOES NOT CHOOSE ONE**: `mem` is the family's own, and the route writes
   *  one leaf per supplied member, so this turn supplies one member and no address is composed here.
   *  **IT RIDES NO `['drag']` FAMILY, AND THAT IS THE DESIGN'S THREE REASONS KEPT** (`D-145`, `D-243`, `D-129`):
   *  `['drag']` is keyed by PANE ID and is gesture-blind (the ghost turn's predicate reads `branch[DEFAULT_PANE_ID]`,
   *  so a zone key would make ONE declared transient answer for two subject kinds); what `['drag']` buys the pane
   *  gesture is a GRAPH-declared transient while the zone's is the ZONE's own inline style at the same instant (Z5);
   *  and `['drag']` is declared UNPAIRED, so nothing repairs it and nothing should grow into it. **So a zone gesture has
   *  exactly ONE write and it is the `mem`-tiered one, at release.**
   *  **AND THE STATEMENT IS READ, NEVER SWALLOWED** (`D-117`'s register, `N1`'s sibling): `commitZones` answers
   *  `{status:'absent', reason}` when the write went nowhere, which is said here with its `reason` VERBATIM. A refusal
   *  or an unread answer is the PUSH's (`reportReceipt` below), which is why the `zone` route word joins that filter in
   *  this rev. **MOVES AND CANCELS WRITE NOTHING** (design §4 Z7): the only writer is this one, at the seat's release. */
  const zoneCommitOf = (address: GestureAddress, value: unknown): void => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return
    try {
      const held = getViewClient().commitZones(address.subject.id, { size: value })
      const statement = held as unknown as { readonly status?: unknown; readonly reason?: unknown } | null | undefined
      if (statement === null || statement === undefined || statement.status !== 'absent') return
      const reason = typeof statement.reason === 'string' ? statement.reason : 'no reason stated'
      console.warn(`[provident-renderer] the zone commit: the write went NOWHERE (reason=${reason}) — no receipt is owed, so nothing else will report it`)
    } catch {
      // a hostile client must never throw out of the release turn: the gesture ends and nothing is claimed
    }
  }
  /** **`PP` — THE PANE ARM'S PREVIEW LANDS ON THE ELEMENT AND THE MEMBER THE DELIVERY PAINTS** (the user's report *"Also
   *  the drag resize doesn't update live"*, MEASURED through a trusted CDP pointer on a real window, one sample per move:
   *  during a drag `#gutter-target`'s style went `width: 100px → 106px → 110px → 104px` while `#pane-menus` read
   *  `height: 100%; width: 100px; overflow-x: auto;` and `[0,36,100,140]` at EVERY sample, the record `['panes']` read
   *  `pane-menus` `100` until the release, and the pane's painted width only moved then (`104px`)).
   *  **SO THE WRITE WAS NEVER MISSING AND WAS NEVER WIPED — IT WENT TO THE WRONG NODE, WITH THE WRONG MEMBER ONE HANDLE
   *  OVER.** The composition's ONE target is `GUTTER_TARGET_ID` (`D-144`, the ghost's element), which is `pane-a`'s
   *  child INSIDE the landing page's gutter card — not the pane any delivery paints, and not the pane `pane-menus`'s
   *  handle adjusts; and the property was the bare `'width'`, where the paint writes the member the pane's own `zone`
   *  selects (`paneAxisMembers`, `adjustableMemberNameOf`) — `width` in `top`/`bottom`, `height` for `left`/`right` and
   *  for the STAGE (`C-9`, `C-12`), so the stage handle's preview moves an axis the record never commits. **THE DELIVERY
   *  IS NOT THE CULPRIT AND IS NOT CHANGED**: `paintStyle` replaces `css.style` whole and would restore the record's
   *  figure on any delivery, but no delivery runs during the moves (`commitDrag` writes the `temp` family and the paint's
   *  gate is the record's `committed` reading) — which is exactly why the transient can be seen to survive a gesture
   *  instead of being replaced under it.
   *  **WHAT THIS TURN ADDS IS THE PAINT'S OWN SUBJECT, AND NOTHING ELSE**: the node is `nodeIdForPane(<this handle's
   *  pane>)` — the SAME map the paint and the self-report consult (`D-194`, `D-224`) — and the member is the record's
   *  selection, read through `adjustableMemberNameOf` over the shape's own `zone`, exactly as `paneMemberOf` answers it
   *  inside the composition. So the transient moves the box the next delivery will paint, from the figure the release
   *  will commit, and a drag is visible while it happens.
   *  **IT IS A SECOND WRITE BESIDE THE FIRST AND NOT A SUBSTITUTION** (`D-144`'s declared transient stands): the
   *  `GUTTER_TARGET_ID` write below is BYTE-UNCHANGED, because `PS-2`/`PS-3`/`PS-4` read it and because that element is
   *  the composition's own ghost target rather than a presentation this pass may re-aim. **IT WRITES NOTHING ELSE**: no
   *  route, no node, no channel, no bridge member — a render-realm style declaration on an already-resolved element, in
   *  the declared no-write arm where the map or the element is absent (`P1`/`P2`'s own discipline, `D-127`). */
  const panePaintedMemberOf = (paneId: string): 'width' | 'height' => {
    try {
      const held = getViewClient().shape().panes.find((pane) => pane.id === paneId)
      if (held !== undefined) return adjustableMemberNameOf(held.zone)
    } catch {
      // a hostile shape is the absent zone's own arm: the stage pane's member, which is what `paneMemberOf` degrades to
    }
    return adjustableMemberNameOf(undefined)
  }
  const panePreviewOf = (address: GestureAddress, value: number): void => {
    const nodeId = nodeIdForPane(address.subject.id)
    if (nodeId === null) return
    let element: unknown = null
    try {
      element = runtime.elementForNodeId(nodeId)
    } catch {
      element = null
    }
    const holder = element as { readonly style?: { setProperty?: unknown } } | null | undefined
    if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
    const set = holder.style.setProperty
    if (typeof set !== 'function') return
    ;(set as (property: string, text: string) => void).call(holder.style, panePaintedMemberOf(address.subject.id), `${String(value)}px`)
  }
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
   *  `P1`/`P2` precede the routes, so a target with no usable `style` sends no route either.
   *  **AND IT IS ONE CLOSURE SET PER HANDLE** (`app-layout`'s `menus-handle-drag`): the two routes carry THAT entry's
   *  key, which is how one seam serves two handles without a second discriminator.
   *  **AND A PANE'S PRESENTATION IS `PP` ABOVE PLUS THE COMPOSITION'S TARGET — WHICH IS THE STAGE PANE'S ALONE, SO ONE
   *  HANDLE MOVES ONE PANE** (`D-251`): the record's own painted element/member is the write EVERY pane handle makes and
   *  the one a person sees move (it is the box the delivery paints and the release commits), while the composition's
   *  declared target is `DEFAULT_PANE_ID`'s ghost target and is written by that handle only. Measured before the split: a
   *  drag on the MENUS strip moved the stage's demo pane from three lines to two in the same stroke. */
  const previewFor = (address: GestureAddress) => (state: unknown): void => {
    // **THE ZONE ARM IS THE ELEMENT WRITE AND NO ROUTE AT ALL** (design §4 `Z5`/`Z7`): the strip's transient is the
    // ZONE's own inline style, so there is no second transient to declare and no `['drag']` seat to send — the pane arm
    // below is unchanged in its routes, and `PP` adds the pane's own painted subject beside its declared target.
    if (address.subject.kind === 'zone') {
      zonePreviewOf(address, state)
      return
    }
    const value = (state as { readonly value?: unknown } | null | undefined)?.value
    if (typeof value !== 'number' || !Number.isFinite(value)) return
    // **ONE HANDLE ADJUSTS ONE PANE — AND THE COMPOSITION'S ONE DECLARED TARGET IS `DEFAULT_PANE_ID`'S GHOST TARGET, NOT
    // A SECOND SUBJECT EVERY HANDLE ALSO WRITES** (`D-251`). Measured through a trusted CDP pointer, one sample per move:
    // a drag on `menus-vertical` wrote `#pane-menus`'s own member AND `#gutter-target`'s `width` in the same stroke, so the
    // STAGE's demo pane reflowed (rect `100×44` → `137×28`, its text 3 lines → 2) while the person was resizing the MENUS
    // pane — the user's report *"the demo pane inside the stage also changes from 1 to 2 lines, indicating that the handle
    // is changing more than just its own pane"*. `target` is `GUTTER_TARGET_ID`, the element the composition's ghost
    // declaration and `D-144`'s declared transient land on, and `createPaneDrag` is constructed for `DEFAULT_PANE_ID` (its
    // ghost turn reads `branch[DEFAULT_PANE_ID]`) — so that element belongs to THE STAGE PANE'S gesture and to no other
    // handle's. **THE ADDRESS IS THE TEST AND NOT THE ELEMENT'S IDENTITY**: a handle's `subject.id` IS the record key its
    // figure lands in (`PANE_DRAG_HANDLES`' `paneId`), so a handle whose subject is not the composition's pane skips the
    // write BY CONSTRUCTION — a third pane handle costs one list entry and writes its own node, and there is no state, no
    // flag and no boot reading that could leave the two subjects fused again. **THE STAGE ARM IS BYTE-UNCHANGED**: its
    // write, its gate (`P1`/`P2` precede the routes) and its order are exactly what they were, which is what `PS-2`,
    // `PS-3` and `PS-4` read.
    if (address.subject.id === DEFAULT_PANE_ID) {
      const holder = target as { readonly style?: { setProperty?: unknown } } | null | undefined
      if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
      const set = holder.style.setProperty
      if (typeof set !== 'function') return
      ;(set as (property: string, text: string) => void).call(holder.style, 'width', `${String(value)}px`)
    }
    // **`PP` — AND THE PANE THE RECORD PAINTS AND THE RELEASE COMMITS** (`panePreviewOf` above): the element is
    // `nodeIdForPane(<this handle's pane>)` and the member is that pane's `zone`'s selection, so the transient lands on
    // the box a delivery will next paint, from the figure the release will commit. **THE ROUTE ORDER IS UNMOVED**: the
    // declared target's write above (the stage handle's alone), then this one, then the same two routes on the same
    // `valid` flag — the gesture's arithmetic, its clamp, its capture and its commit are untouched, and the record is not
    // written until the release. **AND IT IS THE ONE WRITE EVERY PANE HANDLE MAKES**: it is the handle's OWN subject, so
    // the exclusivity above cannot take anything from a handle that is the one being used.
    panePreviewOf(address, value)
    const stateRecord = state as { readonly valid?: unknown } | null | undefined
    if (stateRecord?.valid === true) drag.move(address.handleId, state)
    if (stateRecord?.valid === false) drag.cancel(address.handleId)
  }
  /** **THE PANE'S TWO SEAMS — THE COMPOSITION'S, SPELLED AS THIS WIRING HAS ALWAYS SPELLED THEM** (`D-117`;
   *  `tests/pane-drag-compliance.test.ts`'s `D-117/LIVE-READ` reads this exact form out of the module's CODE, so the two
   *  bindings stand here verbatim: `startSizeOf` is `drag.startSizeOf` and `boundsOf` is `drag.boundsOf`, and the
   *  example's `seams.*` pair occurs NOWHERE in code). */
  const seamsOfPanes = (): { readonly startSizeOf: (el: unknown, token: unknown) => unknown; readonly boundsOf: (el: unknown, token: unknown) => unknown } => ({
    startSizeOf: (el: unknown, token: unknown): unknown => drag.startSizeOf(el, token),
    boundsOf: (el: unknown, token: unknown): unknown => drag.boundsOf(el, token),
  })
  /** **AND A STRIP'S TWO SEAMS ARE THE ZONE FAMILY'S** (design §4 `Z1`/`Z3`): `zoneSizeOf` reads
   *  `['zones', <id>, 'size']` off the SAME client the composition reads `['panes']` from — the `view` the shape's
   *  single delivery fills — and `zoneBoundsOf` answers `{0, the window's extent}`, degrading to the record's own figure
   *  and NEVER to a `NaN` (`D-238`). **A STRIP TAKES NO ELEMENT AND NO TOKEN**: its subject is its DECLARATION's
   *  (`address.subject.id`), not a read of the element it was pressed on, so the strip's identity cannot drift from the
   *  zone it moves. */
  const seamsOfZones = (address: GestureAddress): { readonly startSizeOf: (el: unknown, token: unknown) => unknown; readonly boundsOf: (el: unknown, token: unknown) => unknown } => ({
    startSizeOf: (): unknown => zoneSizeOf(address.subject.id),
    boundsOf: (): unknown => zoneBoundsOf(address),
  })
  /** **ONE READ OF THE PAIR, BY SUBJECT KIND** — the only seam set that differs between the two kinds of handle. */
  const seamsFor = (address: GestureAddress) => (address.subject.kind === 'zone' ? seamsOfZones(address) : seamsOfPanes())
  /** **THE PAGE REALM'S ONE GESTURE OBLIGATION: POINTER CAPTURE ON THE PRESS — AND ITS ABSENCE WAS THE WHOLE OF THE
   *  DEFECT THE USER REPORTED** (the user's report *"UI drag doesn't work"*, MEASURED through a trusted CDP pointer on a
   *  real window: press → `mouseMoved` × n → `mouseReleased`, with the record read back over the app's own crossing).
   *  **THE MECHANISM IS THE MODULE'S AND THE CAPTURE IS THE REALM'S, WHICH THE MODULE ITSELF STATES**: the affordance
   *  declares `capturePointer?: boolean` *"DECLARED AND IGNORED: the capture opt-in cannot be delivered by the composed
   *  controller's `attach`, so this module passes no capture field anywhere"* — and `domEventSource()` *"advertises no
   *  capture capability"* on purpose, its `capturePointer` seam being called with NO pointer id (so a source cannot pass
   *  one to the DOM, which needs exactly that argument). **THE FOURTEEN-PIXEL HANDLE IS THE REASON IT IS NOT OPTIONAL**:
   *  `setPointerCapture` is the DOM's own mechanism for keeping `pointermove`/`pointerup` on the element a press started
   *  on, and both the strips and the pane handles are `14px` on one axis by design (`D-194`) — so the FIRST observed move
   *  writes a preview that re-lays the very box the pointer is standing in (§4 `Z5`; the zone strip follows the zone's
   *  edge, the pane handle the pane's width) and every later move lands wherever the box has moved to, never on the
   *  handle. **MEASURED, BEFORE THIS LINE EXISTED**: on `zone-top-horizontal` a press at `(490,183)` followed by 120px of
   *  moves left `['zones','top','size']` at `140`, the zone's painted `height` at `140px`, and the moves' `event.target`
   *  reading `tabs-landing-page` — and on `menus-vertical` a press at `(9,99)` plus 120px of moves left
   *  `['panes','pane-menus','width']` at `100` with the moves' target `pane-menus`. **AND THE SECOND, WORSE HALF**: the
   *  release lands outside the handle too, so the session's own terminal never runs, its ONE gesture slot is never
   *  released, and EVERY LATER GESTURE ON ANY OF THE SIX HANDLES IS REFUSED `busy` for the life of the page — the state
   *  a probe sees as "the first drag previews once and then nothing ever again". **WITH THE CAPTURE INSTALLED THE SAME TWO
   *  GESTURES MOVE THE RECORD**: `['zones','top','size']` `140 → 163` with the painted `height: 163px`, and
   *  `['panes','pane-menus','width']` `100 → 0` with the pane's painted `width: 0px` — and a THIRD gesture afterwards
   *  still lands (`['zones','left','size']` `120 → 107`), which is the busy slot not latched. **THE PRECEDENT IS THE
   *  DEMO'S OWN AND IT IS THE SAME LINE** (`demo/pane-drag-demo/demo.ts`'s `pointerdown` listener calling
   *  `setPointerCapture`, `README.md`: *"the 14px handle stops targeting it; the demo's own `pointerdown` listener calls
   *  `setPointerCapture`"*) — the demo realm is where that obligation was met, and this wiring is the app's realm, so this
   *  is where the app meets it. **IT IS A LISTENER ON THE INJECTED SOURCE, WHICH IS THIS WIRING'S ONLY EVENT CHANNEL**
   *  (`S-11`'s one registration idiom, no second source and no second mechanism): installed ONCE per handle at
   *  construction, on the SAME resolved element every seat of that handle is handed, and it writes no node, sends no
   *  route, opens no channel, adds no export and changes no member — a render-realm listener and nothing else. **TOTAL
   *  IN EVERY REALM WITHOUT ONE**: an element with no `setPointerCapture`, a non-number `pointerId` and a throw from
   *  either are all the DECLARED DEGRADATION (the layout-less shim is the whole node suite's realm, `D-27`), so a realm
   *  that cannot capture behaves exactly as it did before this line. */
  const captureOnPress = (element: unknown): void => {
    if (element === null || element === undefined || typeof element !== 'object') return
    source.on(element, POINTER_TYPES.start, (event: unknown): void => {
      let pointerId: unknown
      try {
        pointerId = (event as { readonly pointerId?: unknown } | null | undefined)?.['pointerId']
      } catch {
        // a throwing accessor is the same arm as an event carrying no id: no capture and no throw
        return
      }
      if (typeof pointerId !== 'number') return
      let capture: unknown
      try {
        capture = (element as { readonly setPointerCapture?: unknown })['setPointerCapture']
      } catch {
        return
      }
      if (typeof capture !== 'function') return
      try {
        ;(capture as (id: number) => void).call(element, pointerId)
      } catch {
        // a realm that refuses the capture is the degradation above: the gesture is unchanged, and every later turn is too
      }
    })
  }
  /** **THE PRESS IS THE GESTURE'S ANCHOR, AND IT IS THIS WIRING'S OWN READING** (`sizeFromPointerFor` above; the user's
   *  report *"the handle being separated from the pointer"*). The figure a move writes is `sizeAtPress ± (pointer −
   *  press)`, and of its three inputs exactly one is NOT already answered: the affordance hands this wiring the record's
   *  figure at the press (`startSizeOf`, once, at establishment) and the pointer of the move being observed, but the
   *  PRESS COORDINATE is the gesture's own opening event — which the composed mechanism never passes to a seam. So it is
   *  recorded HERE, on the SAME element and the SAME event type the capture above listens for, through the example's own
   *  `pointerOf` (the resolver the affordance itself is handed, so a coordinate this read accepts is one the move turn
   *  accepts too, under the same `typeof` + `Number.isFinite` gate).
   *
   *  **IT WRITES NOTHING AND OPENS NOTHING**: one listener per handle installed once at construction, no node written, no
   *  route sent, no channel and no export, and the coordinate lives in the closure of the entry that owns the handle —
   *  so a second handle's gesture can neither read nor overwrite the first one's anchor. **AND IT IS TOTAL**: an absent
   *  coordinate, a primitive event, a throwing accessor and a realm with no `pointerdown` are all the SAME declared
   *  absence (`null`), which `sizeFromPointerFor` degrades on rather than a `NaN` invented here. The anchor is re-taken at
   *  EVERY press, so a second gesture starts from its own figure and not from the first one's. */
  const anchorOnPress = (element: unknown, axis: 'x' | 'y', record: (coordinate: number | null) => void): void => {
    if (element === null || element === undefined || typeof element !== 'object') return
    source.on(element, POINTER_TYPES.start, (event: unknown): void => {
      let coordinate: number | null = null
      try {
        const pointer = seams.pointerOf(event)
        const held = pointer === null ? undefined : axis === 'x' ? pointer.x : pointer.y
        coordinate = typeof held === 'number' && Number.isFinite(held) ? held : null
      } catch {
        // a throwing resolver is the same arm as a pointer this realm cannot read: no anchor, and the declared degradation
        coordinate = null
      }
      record(coordinate)
    })
  }
  /** **THE LIST, WIRED — ONE AFFORDANCE PER ENTRY AND NOTHING ELSE PER ENTRY** (the user's charter: a third handle costs one
   *  line). Each affordance is the module's own mechanism over ITS resolved handle element, its own seam set and its own
   *  key; the session is SHARED, because it is one gesture state machine over a ledger that is keyed by the element each
   *  `install` was handed (`src/shared/gesture-session.ts`) — so one session serves both handles and one active gesture at a
   *  time is its declared reading, not a second authority. A handle whose element the graph does not resolve is the one
   *  refusal the affordance cannot say itself, so `attach()`'s answer is reported per entry.
   *  **AND THE LOOP WALKS THE ADAPTER, SO A ZONE STRIP IS A SECOND SUBJECT AND NOT A SECOND GESTURE** (design §3 — `D-238`'s
   *  own reason, one subject over): the mechanism, the session, the source, the cursor seam and the whole `createPaneDrag`
   *  composition are the same objects for all six handles, and the ONLY thing an entry's `subject.kind` decides is WHICH
   *  record the figure lands in and which three closures answer the read, the clamp and the write. **No gesture engine is
   *  written a second time**: the pointer listeners, the establishment, the move gate, the clamp's arithmetic
   *  (`clampToBounds`, one clamp in the family) and the abandon terminals are all the affordance's and the session's. */
  const handles: PaneGestureReading[] = []
  for (const address of gestureAddressesOf()) {
    const element = runtime.elementForNodeId(address.handleId)
    // **AND THE REALM MEETS ITS OWN OBLIGATION HERE, ON THE SAME RESOLVED ELEMENT** (`captureOnPress` above): one capture
    // listener per handle, installed once at construction and before the affordance attaches — so the press that opens a
    // gesture is the press that pins the pointer to this handle, and the moves and the release that follow stay here even
    // though the handle is `14px` thick and the preview re-lays the box under the pointer on the first observed move.
    captureOnPress(element)
    // **AND THE SAME PRESS IS THE ANCHOR THIS HANDLE'S FIGURE IS MEASURED FROM** (`anchorOnPress` above): the coordinate
    // is kept in THIS iteration's own closure, so each of the six handles anchors on its own press and a gesture that
    // never pressed — a stray move from a previous pointer — anchors on nothing and the mapping degrades as declared.
    let pressAt: number | null = null
    anchorOnPress(element, address.axis, (coordinate: number | null): void => { pressAt = coordinate })
    const affordance = createGutterAffordance({
      session: session as never,
      source,
      element,
      target,
      sizeFromPointer: sizeFromPointerFor(address, () => pressAt),
      pointerOf: seams.pointerOf,
      axisOf: seams.axisOf,
      cursorOf: seams.cursorOf,
      applyPreview: previewFor(address),
      applyCursor: (el, declaration): void => {
        const holder = el as { readonly style?: Record<string, unknown> } | null | undefined
        if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
        holder.style['cursor'] = declaration === undefined ? '' : declaration
      },
      /** **THE PRE-DRAG SIZE AND THE BOUNDS PAIR ARE THE SHAPE'S, NOT THE ELEMENT'S** (`D-117`). They were
       *  `seams.startSizeOf`/`seams.boundsOf` — the authored pane's `size`/`min`/`max` attributes with the
       *  seam's own `100`/`{0…200}` fallbacks — and NOTHING in this path read `['panes']`. They are the
       *  composition's now: `readPaneSize`/`readPaneBounds`, answered off the crossing's shape at the pane
       *  id `paneIdOf` derives from THIS element — which from the list is the pane the element's handle id
       *  DECLARES (`DEFAULT_PANE_ID` for the stage's, `MENUS_PANE_ID` for the menus pane's) — with the
       *  crossing's MEASURED DEFAULT for a pane the family does not name. **AND `startSizeOf` IS THE
       *  DEFAULT-SIZE TURN TOO**: the affordance's own controller reads its `defaultSizeFor` seam from the
       *  establishment answer this one seam produced (`P-GU-IM-2`: `startSizeOf` exactly once per gesture),
       *  so handing `drag.startSizeOf` hands both turns — and **`createPaneDrag`'s own `defaultSizeFor`
       *  member is DELETED** (`D-168`) rather than kept as a second name over the same closure: the
       *  affordance's `options.defaultSizeFor` seam IS the reset arm's read, so after the deletion ONE read
       *  has ONE name.
       *  `resizableOf` STAYS the example's: resizability is the authored pane's declaration, not a member
       *  of the panes family, and the family declares none to read. **AND IT IS THE EXAMPLE'S FOR A STRIP
       *  TOO, WHICH IS WHY NO `resizable` ATTRIBUTE IS AUTHORED**: it reads the PARENT element's attribute,
       *  a strip's parent is the app root or the arrangement, and an ABSENT attribute is the demo's own
       *  "no veto" reading. */
      ...seamsFor(address),
      resizableOf: seams.resizableOf,
      moveTypeOf: (): unknown => POINTER_TYPES.move,
      /** **THE COMPOSITION'S ONE END-TURN IS `release`, AND THE APP HANDS IT NO SINK** (`D-117`, `D-138`,
       *  `D-129`): ONE `commitPane(<this handle's pane>, {<the record's member>})` across the crossing, then its
       *  OWN ending of the drag family the moves wrote. That is `release`'s own contract at `R4`/`R5` — **`R3` IS
       *  STILL THERE AND IS STILL FIRST, but this realm passes it NOTHING**, because the read-out it used to
       *  author is `renderPaneSize`'s now, painted from the delivery (design §5). `release`'s STEPS are unmoved
       *  and its third parameter is widened to OPTIONAL at `PaneDragSurface`'s own declaration, which is what
       *  lets THIS call omit it while `demo/pane-drag-demo/demo.ts` — a realm with no crossing and no delivery
       *  to paint from — still supplies one and still compiles (`D-118`). Two changes and only two: the gesture
       *  id it hands the turn is THIS HANDLE's key — the list's first entry being the old `GESTURE_KEY` constant,
       *  and never a read of the handle's numeric `id` (`gestureIdOf` is RETIRED) — and the THIRD ARGUMENT is
       *  gone. It stays an INLINE PROPERTY of this literal on purpose:
       *  `tests/pane-drag-compliance.test.ts`'s `D-117/LIVE-READ` probes this exact form, so hoisting it to a
       *  `const` would red a gating row.
       *  **AND A STRIP'S END-TURN IS `commitZones`, WHICH IS A DIFFERENT ROUTE AND NOT A SECOND ENGINE**
       *  (design §4 `Z6`): the release value is the affordance's CLAMPED figure — the same arithmetic, over the
       *  ZONE's own pair — and it lands as ONE LEAF at `['zones', <zoneId>, 'size']` at the family's own `mem`
       *  tier. It sends NO `['drag']` turn and ends no family, because a zone gesture never opened one. */
      commit: (gesture, value): void => {
        if (address.subject.kind === 'zone') zoneCommitOf(address, value)
        else drag.release(address.handleId, value)
      },
    })
    handles.push({ handleId: address.handleId, paneId: address.subject.id, subject: address.subject.kind, attached: affordance.attach() })
  }
  /** **`attached` IS THE FIRST ENTRY'S READING** — the stage handle's, which is the reading this member has always
   *  carried — and `handles` beside it carries one per declaration, so the menus pane's handle has the same sayable
   *  refusal the gutter card's has (`main()` reads both). **THE STRIPS FOLLOW THE TWO PANE HANDLES IN THE LIST'S ORDER**,
   *  so the first entry is unmoved and every existing reader of `attached` reads exactly what it read before. */
  const first = handles[0]
  const attached = first !== undefined && first.attached
  return { attached, handles, renderGhost: drag.renderGhost, renderPaneSize }
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
 *  S6b THE SEAT *IS* THE RECORD'S ACTIVE ROW, SO THE ACT IS A NO-OP: the record as it stands answers, no write is
 *      attempted and no delivery follows — the ONE member consulted is the resolved row's own `active` (see below);
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
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // **S6b — THE SEAT THAT IS ALREADY THE RECORD'S ACTIVE ROW IS A NO-OP, AND THAT IS THE WHOLE OF THE CURE.**
  //
  // **WHAT WAS MEASURED, WHICH IS WHY THIS ARM EXISTS**: dispatching a `click` at the minted row of the tab the record
  // ALREADY showed answered `results: ["focus tabs-landing-page"]`, the row was RE-MINTED (`node-225` → `node-249`) and
  // the fresh row carried `active="true"` — so the RECORD was right the whole time and the only thing a person could
  // perceive was the CHURN: the chip under the pointer was destroyed and rebuilt, which reads as the tab "disappearing"
  // until the next delivery brings it back. The user's own sentence names the cure — "clicking the tab that is already
  // active should be a no-op" — so the act stops acting when there is nothing to move.
  //
  // **THE MEMBER THIS KEYS ON IS THE ROW'S OWN `active`, AND IT IS THE RECORD'S ANSWER RATHER THAN A GUESS**: `seatOf`
  // resolves the row OFF `reading.rows` (`seatOf` above), so `seat.row.active === true` is the record's own flag for the
  // very row the caller named — the SAME member `tabs-client.ts`'s `deriveTabsWitness` counts
  // (`rows.filter((row) => row.active === true)`) and the SAME one `driveTabsRows` publishes as `props.active`, which the
  // paint emits as the bare `active="true"` attribute the page sheet keys `.tab-row[active="true"]` on. **THE TWO DERIVED
  // SPELLINGS ARE NOT USED AND NEITHER IS WRONG**: `reading.landing` is BY DEFINITION the id of the row reading active
  // (`D-76`), and `reading.witness.landing.activeIds` is that same count — so either would answer the identical question
  // from the derived side, one comparison removed from the state itself. The primitive is used because a derived member
  // that disagrees with its own source is a defect this arm must not inherit, and because `seat.row` is already in hand.
  //
  // **IT CANNOT SKIP A NEEDED STAGE REPAINT, AND THE REASON IS THAT ONE MEMBER DECIDES BOTH**: `rowForSeat`'s seat arm is
  // `{...seat.row, active: true, lastActiveAt}`, so on a row that already reads active the ONE member the write would
  // change is the CLOCK, `lastActiveAt` — and no part of the stage reads it: `deriveTabsWitness` reads `active`, `target`
  // and `error` off the rows, and `driveTabsLandingPage` writes the two pages' `display` from that witness alone. So an
  // already-active click could never move the stage's own inputs, and the two cannot disagree about which tab is shown.
  // **A stage that DID disagree would be a paint that never landed**, and re-writing the row would re-force it only as a
  // side effect of a delivery — that is the repair the surface's own delivery path owes on every `['tabs']` read, not a
  // duty of this act, which would be paying a whole mint to repeat a claim it did not change.
  //
  // **AND THE ANSWER IS THE SAME SHAPE, WHICH IS WHY NO DISPATCHER SEES A DIFFERENCE** (`D-209`'s cost (ii) read the other
  // way): the committed reading is answered exactly as S4 answers one — no `refused` member is invented, so `provident.focus`
  // answers a record and not a refusal — and `dispatch`'s `results` is the ROW BODY's own word (`focus <target>`), which
  // this route never mints and therefore cannot change. **AND `dirtied` IS NOT THE DISCRIMINATOR, WHICH WAS MEASURED RATHER
  // THAN ASSUMED**: it is the dispatched EVENT's own apply cascade (`apply().dirtied ∪ keys(takePass2States())`,
  // `src/shared/types.ts`), so a click at an already-active row answers a full set of node ids either way — measured live
  // at `:3801`, 63 ids for the no-op and the same shape of set for a click that DID write — and the two facts that separate
  // the arms are read elsewhere: the store's `lastActiveAt` for that row, which does not advance, and that row's node id,
  // which is not re-minted. What this arm gives up is the WRITE and the delivery it owed; what it keeps is the reading,
  // the word and the terminal state of every member.
  //
  // **THE `open` ARM CANNOT REACH IT**: a minted row is not in `reading.rows` yet, so a newly opened tab's row is never the
  // record's active one and `newTab: true` always writes. ══════════════════════════════════════════════════════════════
  if (seat.kind === 'seat' && seat.row.active === true) return reading
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
  // ⟶ **AND EVERY HANDLE BESIDE IT IS READ THE SAME WAY** (`app-layout`'s `menus-handle-drag`; `D-117`'s rule applied to a
  //    list). The menus pane's handle is the entry that had NO gesture at all before this pass — the user's report was
  //    *"Menu pane does not drag when clicking and dragging handle"* — so a refused `attach()` there is exactly the defect
  //    coming back, and it is said out loud at the ONE site that can say it. `gutter.attached` above stays the FIRST
  //    entry's reading, so the message the stage's handle has always produced is unmoved.
  for (const handle of gutter.handles) {
    if (handle.handleId === GUTTER_AFFORDANCE_ID || handle.attached) continue
    // **AND A STRIP'S REFUSAL IS SAID IN ITS OWN VOCABULARY** (design §3; `D-117`): the four zone strips are the entries
    // this list gained, and `paneId` on one of them is the ZONE's declared id (`PaneGestureReading`'s `subject` member says
    // which vocabulary a given entry's key is in) — so the line names a zone's size rather than calling a strip a pane drag.
    if (handle.subject === 'zone') {
      console.error(`[provident-renderer] the zone strip did NOT attach — the ${handle.paneId} zone's size has no affordance (handle ${handle.handleId})`)
      continue
    }
    console.error(`[provident-renderer] the pane drag did NOT attach — ${handle.paneId} does not drag (handle ${handle.handleId})`)
  }
  // ⟶ **TURN 4 — THE MENUS' ONE BOOT REGISTRATION (`S-11`; `D-181`, `D-196`, `D-209`)** — taken HERE, beside the
  //    affordance's attach, because the menus pane is AUTHORED and nothing mints it: the eighteen static items exist as
  //    soon as the first envelope loaded, so their listeners AND their wiring-installed handler bodies are installed once
  //    and no delivery, mint, subscription or timer is added (`D-82` clause 4). **IT SENDS NO ROUTE AT BOOT**: the eleven
  //    admitted roles are called by a CLICK or by an agent's DISPATCH, never here, so this site sends nothing over the
  //    bridge, awaits nothing and cannot move a step `tests/e2e/bundle-boot-seam`'s `B-5` orders — what it DOES write is
  //    ONE `handlers` state-slice per item, graph bytes in this realm with no crossing behind them (`D-209`). **AND ITS
  //    ONE RETURNED READING IS READ**, the gutter's own rule above (`D-117`): zero attached items is a pane that renders
  //    as the menu it claims and can perform nothing, and that is said out loud at the one site that can say it. **THE
  //    SEVEN A MACHINE MAY NOT DISPATCH TAKE THE SAME CLICK LISTENER AND THE SAME INSTALLED BODY** (`D-181`, `D-209`,
  //    `D-232`): they are STYLED ENABLED because a person's trusted click EXECUTES them, they refuse a machine at `main`'s
  //    admitted set, and this realm installs the SAME handler on all eighteen because a render-side guard is the one an
  //    agent's `provident.dispatch` runs around (`D-196`) — the body vets no role and the route's refusal is written to the
  //    carrier like any other answer. **AND A `disabled` MARK VETOES A CLICK AT THE LISTENER**, so the mark is never paint
  //    with a live act behind it.
  const menus = startMenusItems(runtime)
  if (menus.attached === 0) {
    console.error('[provident-renderer] the menus items took NO click listener — the pane renders the menu it claims and no role can reach the route')
  }
  // ⟶ **AND THE `+` TAKES THE SAME ONE REGISTRATION, ONE NODE OVER** (the add-tab control, `TABS_ADD_ID`): the act
  //    `provident.focus` already had — `newTab: true` with a distinct target — and the interface had no control for. It is
  //    AUTHORED, so it is installed here beside the menus' items and never per delivery, and **IT SENDS NO ROUTE**: the act
  //    is a press's, so this site awaits nothing and writes no byte of the tabs record (`B-5`'s order is untouched).
  //    **ITS READING IS READ**, the gutter's and the menus' own rule (`D-117`): a control that took no listener is an act a
  //    person cannot perform and an agent cannot dispatch, and that is said out loud where it happens.
  const addTab = startAddTab(runtime)
  if (!addTab.installed || !addTab.attached) {
    console.error(
      `[provident-renderer] the add-tab control (\`${TABS_ADD_ID}\`, node ${String(addTab.nodeId)}) is NOT fully wired — ` +
        `installed=${String(addTab.installed)} attached=${String(addTab.attached)}, so a press reaches no act`,
    )
  }
  // ⟶ **AND THE PANE'S RELOCATION TAKES THE SAME ONE REGISTRATION, ONE AFFORDANCE OVER** (`docs/L3/renderer-wiring/
  //    design-pane-relocation.md` rev 1 §3): the second gesture `D-244` designed and never built — a `grab` grip per
  //    pane and four authored zone drops, revealed by `props.tabindex` + `:focus-within` and NEVER by a state. The
  //    nodes are AUTHORED, so they exist as soon as the first envelope loaded: this site installs ONE live body and
  //    ONE `click` per drop and nothing else, so it awaits nothing, sends no route and writes no byte of the pane
  //    record — a boot that is never pressed cannot move `B-5`'s order. **ITS THREE READINGS ARE READ**, the gutter's
  //    and the `+`'s own rule (`D-117`): a drop that never resolved, never took a body or never took a listener is a
  //    relocation a person cannot perform and an agent cannot dispatch, and it is said out loud where it happens.
  const paneMove = startPaneMove(runtime)
  if (
    paneMove.drops !== PANE_MOVE_DROP_IDS.length ||
    paneMove.installed !== paneMove.drops ||
    paneMove.attached !== paneMove.drops ||
    paneMove.grips !== PANE_MOVE_GRIP_IDS.length ||
    paneMove.captured !== paneMove.grips
  ) {
    console.error(
      `[provident-renderer] the pane-move affordance is NOT fully wired — resolved ${String(paneMove.drops)}/${String(PANE_MOVE_DROP_IDS.length)} ` +
        `of \`${PANE_MOVE_DROP_IDS.join('`, `')}\`, installed ${String(paneMove.installed)}, attached ${String(paneMove.attached)}, ` +
        `and ${String(paneMove.grips)}/${String(PANE_MOVE_GRIP_IDS.length)} grip(s) of \`${PANE_MOVE_GRIP_IDS.join('`, `')}\` with ` +
        `${String(paneMove.captured)} drag(s) installed, so a press, a dispatch or a drag may reach no act`,
    )
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
  //  record's own re-read rides). **THE WRITE'S ANSWER IS RETURNED AND NOT READ HERE, AND NO LOCAL MACHINE MOVES FIRST**
  //  (`D-166`'s `F6`, design §4): the store's constraint settles the ports, its delivery closes the socket and re-patches
  //  the gate, and the pane's own delivery is what this realm renders — while the member's own answer is the ONE signal that
  //  can tell *not yet processed* from *refused*, so this site RETURNS it rather than `void`-ing it (not awaited, not
  //  `.then`-ed here) and the act settles it. A realm with no bridge has no member to ask, so the answer is `undefined` and
  //  the delivery stays the only clearer — the arm a crossing that answers nothing has.
  const overlayApplication = startOverlayApplication(runtime, {
    pane: {
      open: () => { const shape = getSecurityClient().shape(); return shape.filled && shape.pane !== null ? shape.pane.open : null },
      write: (open) => bridge?.security?.setPane(open),
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
  // composition registers no subscriber of its own and no second subscription is taken (`D-90`, `D-92` `M-4`).
  // **AND THE FOURTH IS THE LAYOUT PAINT** (`S-6`; `D-185`, `D-194`): the turn reads the shape the client has just adopted —
  // `getViewClient().reading()`, the same client and the same reading the three turns above were handed beside — and writes
  // the four zones' fixed dimension and the panes' adjustable member. It is a CALL rather than a stored value, so the turn
  // reads the delivery's own answer and never a reading captured at boot; a realm that has read nothing hands it `null` and
  // it writes nothing (`D-127`).
  startViewShape(themeApplication, gutter.renderGhost, gutter.renderPaneSize, () => {
    driveLayoutRegions(getViewClient().reading(), runtime)
  })
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

/** **THE ROW'S ONE HANDLER NAME, AND NOTHING DISCOVERS A ROW BY IT** (`D-209`): a minted row carries its act as a
 *  `handlers` entry on the DATUM, and the address book of rows is the mint's own `minted` answer (`D-182` m1) — so this
 *  name is stated once, here, and never read back off a node. It is also **not** the menus' `MENUS_ITEM_HANDLER`: that one
 *  is a CENSUS KEY the authored items are found by, while nothing in this file enumerates rows. */
const TABS_ROW_HANDLER = 'tab-row-act'

/** **THE DELIVERY'S OTHER TURN — THE MINT, BESIDE THE PAGES' DRIVE** (`S-4`; `D-179`'s spike, `D-182`'s five measurements,
 *  `D-198`'s string `target`, `D-200`'s resolvable prototype; `docs/L2/renderer-wiring/interface.md` §2 turn 1). ONE
 *  in-process `runtime.applyCommand({kind:'rows-mint', …})` per `['tabs']` DELIVERY — and **ON A `'committed'` READING ALONE**,
 *  the gate `driveTabsLandingPage` already keeps for the same reason: `order` and `rows` exist on that arm only, so a mint
 *  driven from an `unread` or `absent` reading would REPLACE the row set with nothing (`D-127`).
 *
 *  **THE DATUM IS THE WHOLE PAINT, AND EVERY DELIVERY MINTS FRESH — `keyField` IS DELIBERATELY NOT DECLARED HERE** (`D-201`,
 *  which supersedes `D-191`'s "`keyField` REQUIRED" and half of `D-182` m5's premise). **MEASURED, BOTH WAYS**: with
 *  `keyField`, a re-mint answers `minted: []` because the engine REUSES each matched row's node — the label is re-applied
 *  from the datum while a `props`-carried member FREEZES on the reused node (`rows-reuse-shape-ignored`), so a value that
 *  MOVES is rendered once and never again; without it, every node is minted fresh, so the label AND everything the datum's
 *  `props` carries are composed AT MINT and nothing has to address a row afterwards. **A READER TEMPTED TO RESTORE
 *  `keyField: 'id'` MUST READ THAT SENTENCE FIRST**: it buys stable row ids, and a stable id is exactly what nothing here
 *  needs, because the ATTACH turn below re-attaches to whatever the mint answers — the old nodes and their listeners are
 *  gone. The price is DOM churn on each `['tabs']` delivery (N tabs' nodes replaced), which `D-201` records as the cheaper
 *  of the two failures and the only one that leaves a `props`-carried value correct. **AND THE DATUM'S KEY ORDER IS
 *  LOAD-BEARING, MEASURED**: the engine renders a minted row's text from its FIRST SCALAR source-anchor binding
 *  (`dist/core/render-helpers.js`'s `scalarBinding`, read at the plain-node emit), so `label` is composed BEFORE the
 *  record's own row — a datum whose `id` came first renders the TAB ID as the label, which is what `D-182`'s spike saw
 *  (`r1`, `r2`). `content` is not that slot: a datum's `content` is a SHAPE field and the scalar binding still wins, so this
 *  turn carries none.
 *
 *  **WHAT EACH DATUM IS, AND WHY IT CARRIES `props.target`** (`docs/L2/store-tabs-record/interface.md` §1, `D-201`): one
 *  datum per `['tabs'].order` entry, being the record's own row for that id (`reading.rows`) WHOLE, so no member of it is
 *  dropped (`D-76`), with `label` first and **the tab's own id as its fallback** — the one member every row has (`D-194`) —
 *  and **the tab's `target` carried AGAIN under `props`**, which is the ONE slot a row's own value reaches the rendered
 *  node in: **measured**, a plain datum member becomes a source anchor and reaches NO prop, while `props.<name>` reaches
 *  the attribute AT MINT (`D-201`). That slot is what lets the ATTACH turn's listener ask the NODE what it stands for
 *  instead of consulting a map, a closure over the previous mint or a captured id (`S-5`, `D-129`), and the plain `target`
 *  the record's row already carries stays where it is because the row travels WHOLE — one value, in the record's own member
 *  and in the engine's one readable slot, never a second authority over it.
 *
 *  **AND THE THREE OPERANDS THAT NAME THINGS THIS APP DOES NOT AUTHOR**: `target` and `hookName` are **`TABS_ROWS_ID`** — the
 *  row node's own id and the name the envelope DECLARES its hook under (`hooks: [TABS_ROWS_ID]`, `hooksKind` `'placement'`),
 *  read from that source so neither is re-spelled here — and the target is handed as a **STRING** which the runtime's own arm
 *  resolves, because a mint's target must be a live Node and `applyCommand` resolves `node`/`source` and never `target`
 *  (`S-1`, `D-198`). **`placementName` NAMES NOTHING IN THIS TREE, AND THAT IS WHY IT IS PASSED AS AN OPERAND AND NOTHING
 *  MORE**: the engine requires one on a `'placement'` mint (`rows-placement-name-missing` refuses a silent no-placement),
 *  while this app authors NO placement container at all — `D-182`'s one negative, where a post-bootstrap mint renders at its
 *  target's family path and never inside a container (ASM-RW-5) — so the value handed over is the row's own name and no line
 *  of this file ever reads a placement back.
 *
 *  **AND THE ACTIVE MARKER IS THE SECOND `props` MEMBER, WHICH IS THE WHOLE OF ITS MECHANISM** (`D-201`'s marker half,
 *  answered by `D-202`'s `keyField` removal rather than by a new operand): `props.active` carries **the record's own flag**
 *  beside `target`, so the row the record marks active renders `active="true"` and every other row `active="false"` —
 *  **measured on the rendered HTML across TWO deliveries with the flag moved**, both rows fresh each time
 *  (`node-125/126 → node-143/144`), the marker on the other row and no stale value on either. **WHY IT NEEDS NO
 *  `state-slice`, NO MAP AND NO SECOND MINT**: `D-201` measured a `props`-carried member FREEZING on a node that `keyField`
 *  REUSED, and this turn declares no key, so every delivery mints every row fresh and a fresh mint composes every `props`
 *  member the datum carries. **A READER WHO RESTORES `keyField` TURNS THIS MARKER BACK INTO A FROZEN ONE** — that sentence is
 *  the reason the marker moved into the datum rather than into a mechanism. **AND THE VALUE IS A BOOLEAN, WHICH THE ENGINE
 *  RENDERS AS TEXT**: measured, `false` renders `active="false"` (the attribute PRESENT and literal) and an OMITTED member
 *  renders no attribute at all — so `active` is passed as a boolean and never as `'true'`/`'false'`, and the fallback where
 *  the record names no row for a seat is `false`.
 *
 *  **AND THE DATUM CARRIES A HANDLER BODY AS A LIVE FUNCTION, WHICH IS WHAT MAKES THE ROW A CONTROL FOR AN AGENT AND NOT
 *  ONLY FOR A POINTER** (`D-209`, discharging `D-208`'s `AL-3` red without touching the surface or the preload). **MEASURED,
 *  NOT TRACED**: a `rows-mint` datum may carry `handlers: [{ name, event: 'click', body: <function> }]`, the minted node
 *  renders with it, and `provident.dispatch` runs it with `ctx` — while a **STRING** body would be adopted and **never run**
 *  (`rows-mint` does not compile bodies; `dispatchEvent` skips a non-function `body` outright). **So the body here is a
 *  CLOSURE over this turn's own `focusActRoute` and the seat's own `target` — NOT a body that names `window.provident`**,
 *  which is the whole ruling: an authored/compiled body is `new Function`-compiled in the renderer's global scope and could
 *  name every preload member, whereas a minted closure calls the realm's OWN act and opens no surface to an agent's
 *  dispatch. **THE TWO PATHS CALL THE SAME ACT AND NEITHER REPLACES THE OTHER** — `attachRowAct` below stays exactly as it
 *  was for a human's click, and this body is the agent's arm of the same act.
 *
 *  **AND ITS RETURN CROSSES `JSON.stringify`** (`D-209`'s cost (ii)): `focusActRoute` is ASYNC, so the body must **not**
 *  return its promise — it starts the act and answers **its own short string**, which is what `dispatch`'s `results`
 *  carries. **A DATUM'S `target` IS THE VALUE THE BODY CLOSES OVER AND THE VALUE `props.target` PUBLISHES**: one seat, one
 *  delivery, one closure — and because `keyField` is not declared every delivery mints fresh nodes, so the closure cannot
 *  outlive the value it carries (the same freshness argument this turn makes for re-attaching listeners, `D-201`).
 *  **`handlers` SITS BEFORE `props` SO THAT `props` STAYS LAST**, which is the member order the two paragraphs above hold
 *  (the first scalar composes the row's text, and `props` reaches the attributes). */
function driveTabsRows(reading: TabsClientReading, runtime: Runtime | null): void {
  if (reading.status !== 'committed' || runtime === null) return
  const recordById = new Map<string, TabsRecordRow>()
  for (const row of reading.rows) recordById.set(row.id, row)
  const rows = reading.order.map((id) => {
    const record = recordById.get(id)
    // THE SEAT'S OWN TARGET, DERIVED ONCE AND CARRIED BY BOTH HALVES OF THE DATUM — `props.target`, which the listener reads
    // back off the node, and the handler body's closure, which is the agent's arm of the same act. One value, two members,
    // and no third spelling of it (`D-129`).
    const seatTarget = record?.target ?? id
    // `label` FIRST — see this turn's own note: it is the binding the engine renders the row's text from, and the tab id is
    // the fallback where the record carries no title (`D-194`). The record's row follows WHOLE, so `target`, `active` and
    // every other member travel as the reading gave them (`D-76`); `handlers` sits BESIDE them as a live-function body, the
    // agent's reachable half (`D-209`); `props` LAST is the row's own values in the one slot the engine renders attributes
    // from — `target`, the slot the ATTACH turn's listener reads back off the node (`D-201`), with the tab's own id as the
    // same fallback the label takes where the record names no row for that seat, and `active`, the record's own flag
    // BESIDE it, which is the whole of the marker: every delivery mints FRESH (`keyField` is not declared — see this turn's
    // own note), and a fresh mint composes every `props` member the datum carries, so the flag is painted at each mint
    // instead of freezing on a reused node (`D-201`'s freeze measurement).
    return {
      label: record?.label ?? id,
      ...(record ?? {}),
      // THE AGENT-REACHABLE HALF (`D-209`): a CLOSURE calling this realm's own `focusActRoute`, which is the SAME act
      // `attachRowAct`'s DOM listener calls below — neither replaces the other, a human clicks and an agent dispatches. The
      // body does NOT name `window.provident` (no surface is opened to an agent's dispatch) and does NOT return the act's
      // promise: it starts the act and answers its own JSON-safe word for `dispatch`'s `results`.
      handlers: [
        {
          name: TABS_ROW_HANDLER,
          event: 'click',
          body: (): string => {
            void focusActRoute({ target: seatTarget })
            return `focus ${seatTarget}`
          },
        },
      ],
      props: { target: seatTarget, active: record?.active === true },
    }
  })
  let minted: readonly string[] = []
  try {
    const answer = runtime.applyCommand({
      kind: 'rows-mint',
      target: TABS_ROWS_ID,
      hookName: TABS_ROWS_ID,
      mintKind: 'placement',
      prototypeName: TABS_ROW_PROTOTYPE_ID,
      placementName: TABS_ROWS_ID,
      // NO `keyField` — see this turn's own note: a keyed re-mint REUSES nodes and freezes what their `props` carry, so the
      // attach below is re-made per mint instead, and the ids this answer names are the whole address book (`D-201`).
      rows,
    })
    // **A REFUSED MINT IS REPORTED, NEVER SILENT** (`D-179`: the four refusals are the ENGINE's — `hook-kind-mismatch`,
    // `rows-prototype-unresolved`, `rows-placement-name-missing`, `rows-shape-invalid` — and a `rejected` is this realm's own
    // unresolved target). The applied arm says nothing: the rows are the markup's to report (`AL-2`, `AL-4`).
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status !== 'applied') {
      console.error(`[provident-renderer] tabs rows: the mint answered ${status}; ${rows.length} row(s) stand unrendered`)
    } else if (Array.isArray(answer.minted)) {
      // THE MINT'S OWN ANSWER IS THE ADDRESS BOOK (`D-182` m1): the ids it minted, read and not remembered — a map from a
      // row's key to the node it landed on would be the copy `D-129` forbids and the stale id `D-201` measured the cost of.
      minted = answer.minted
    }
  } catch (error) {
    // A throw is a defect in the runtime's own totality, held here rather than left to surface as a page error.
    console.error(`[provident-renderer] tabs rows: the mint threw; ${rows.length} row(s) stand unrendered`, error)
  }
  // **TURN 2 — THE ATTACH, ON THE SAME BODY AND ON THIS MINT'S OWN IDS** (`S-5`; `D-201`). One `click` listener per row the
  // mint answered, installed on the node the id names. Nothing is attached where the mint answered nothing, which is the
  // refused and the throwing arms alike, and no listener is ever installed twice on one node.
  let attached = 0
  for (const nodeId of minted) if (attachRowAct(runtime, nodeId)) attached += 1
  if (attached < minted.length) {
    console.error(`[provident-renderer] tabs rows: ${String(minted.length - attached)} of ${String(minted.length)} minted row(s) took no click listener`)
  }
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // **THE SETTLE WRITE — AND IT IS THE `+` BUG'S WHOLE CURE, MEASURED RATHER THAN GUESSED** (the head after `D-240`; the
  // report: *"'+' button causes the tabs row and stage to stop rendering until it is reloaded"*).
  //
  // **WHAT THE MEASUREMENT FOUND, WHICH IS NONE OF THE THREE THINGS THE BUG WAS BLAMED ON.** In a real renderer, one press
  // takes the record from one row to two (`order: ['landing','tab-2']`, read back `committed`, both rows standing) and
  // **`#tab-rows` is left EMPTY**, with every fresh row rendered as a child of the MOUNT ROOT — `document.querySelectorAll(
  // '#tab-rows .tab-row')` read `0` while the same rows sat under `#app`. So the mint did not refuse, did not throw and was
  // not swallowed: `MutationObserver` transcript of one press is `ADD <row> -> tab-rows`, `REM <row> <- tab-rows`,
  // `ADD <row> -> app`, and the old batch re-parented home in the SAME pass — the rows are minted into the row set and
  // then re-emitted at the root. **`Runtime.applyCommand` is why, and the reason is a member order rather than a bug in the
  // mint**: it re-compiles each node of the mint's `dirtied` set FOCUSED ON ITSELF (`focusNodeId: node.id`), that set is
  // `[target, ...minted]`, and the minted rows' own focused states are therefore written into `prevStates` LAST — so the
  // render emits each fresh row as a root-level element and its anchored parent's emission is overwritten. The boot row is
  // placed correctly because the FIRST render is the bootstrap's full compile, which is why the app looks right until
  // something mints — and RELOADING restores it, which is exactly the user's own report.
  //
  // **WHY THIS ONE WRITE IS THE CURE, AND WHY THE OBVIOUS TWO WERE MEASURED AND REJECTED.** A re-EMIT alone does not fix
  // it (`runtime.bootstrap()` after the mint was tried first and measured: the rows stayed under `#app`, because the
  // focused states are still what is re-emitted) — what settles the placement is a pass in which the ROW NODE is the
  // focused subject, since its own compile carries the family children it anchors and its grouped states are written after
  // everything the mint wrote. So this turn makes ONE more `state-slice` on `TABS_ROWS_ID`, re-asserting the `props.id` it
  // was AUTHORED with (`css.id === props.id === TABS_ROWS_ID`, `ASM-AE-2`) — **no new value, no new member and no second
  // authority**: the byte written is the byte the envelope already carries, and what it buys is the re-compile.
  // **AND IT IS A WRITE THE APP CANNOT OTHERWISE MAKE**: a mint op re-mints (and would land its own fresh rows at the root
  // again), a plain render is private to the runtime, and `dispatch` needs an event and runs a body. This is the one public
  // op whose subject is a node the app authors and whose product is a state re-emit.
  // **THE COST IS NAMED**: one `slice-*` layer on the row node per `['tabs']` delivery, the engine's own write record for a
  // `state-slice` (the form `installAddTabHandler` already takes once at boot). It carries the value the node already has,
  // so the rendered attribute is unmoved. **THE ENGINE'S HALF IS RECORDED AS UPSTREAM-OWNED** (`D-5`): a minted node's
  // focused state rendering it at the mount root is the engine's placement behaviour, so this is the app's compensation at
  // the same boundary `D-203`'s CSS-text spelling takes.
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  try {
    runtime.applyCommand({
      kind: 'state-slice',
      node: TABS_ROWS_ID,
      mutation: [{ targetProp: 'props.id', mode: 'replace', value: TABS_ROWS_ID }],
    })
  } catch (error) {
    // A hostile runtime is a reading this turn leaves standing, said out loud: the rows stay where the mint's own render put
    // them, which is the defect this write exists for and never a throw out of the delivery turn (`D-127`).
    console.error(`[provident-renderer] tabs rows: the settle write threw; the fresh rows may stand outside #${TABS_ROWS_ID}`, error)
  }
}

/** **TURN 2 — ONE `click` PER MINTED ROW, PER MINT** (`S-5`; `D-194`'s attach turn, re-attached per delivery at `D-201`). It
 *  is handed the NODE ID the mint answered — never a tab id and never a target — and the turn reads **that row's own
 *  `props.target`** at CLICK time through this file's `authoredPropOf`, the relation the paint already reads a node's
 *  surface through (`Runtime.nodeState`'s `props`, `D-163`), and hands it to the realm's existing act as
 *  `focusActRoute({ target })`.
 *
 *  **THE NODE KNOWS ITS OWN VALUE, WHICH IS THE WHOLE REASON THE DATUM CARRIES IT**: no map over minted nodes, no closure
 *  over the previous mint and no captured target — a closure carrying the datum would be the copy `D-129` forbids, and it
 *  would go stale the moment the record moved. **AND THE MEMBER IS `target`, NEVER `id`** (`:805`'s `seatOf`): the seat is
 *  the FIRST row of `order` whose `target` matches the caller's string, so a row id handed here would answer
 *  `target-absent` and write nothing (`D-194`, L2 §4).
 *
 *  **AND "PER MINT" IS NOT A LEAK, WHICH IS WHY THIS TURN MAY RE-ATTACH WHERE `D-194` SAID "ONE LISTENER PER ROW, EVER"**:
 *  `keyField` is not declared (`D-201`), so every delivery mints every row FRESH — **the previous rows are DESTROYED and
 *  their listeners die with them**, so this installs one listener on a node that carries none, and no listener outlives
 *  its node. A per-delivery attach over REUSED nodes is what would accumulate, and that is exactly the shape the removed
 *  key would have bought.
 *
 *  Two rows sharing one `target` both reach that seat, and `seatOf` seats the FIRST of `order` — so the later row is
 *  unclickable and `AL-3` drives a unique target. **A ROW THAT WILL NOT RESOLVE OR WILL NOT TAKE A LISTENER ATTACHES
 *  NOTHING AND THROWS NOTHING** (`D-127`); the answer says whether the listener landed so the delivery can report it.
 *
 *  **AND THIS LISTENER IS NOT REPLACED BY THE ROW'S HANDLER BODY, NOR IS IT A SECOND ACT BESIDE IT** (`D-209`): the datum's
 *  `handlers` entry is the AGENT's arm — `provident.dispatch` at the row's node id — and this is the HUMAN's; both call
 *  `focusActRoute({ target })` with the seat's own target, so there is ONE implementation of the switch and two causes that
 *  reach it. A reader who finds two paths must not read the newer one as having retired this one. */
function attachRowAct(runtime: Runtime, nodeId: string): boolean {
  let element: unknown = null
  try {
    element = runtime.elementForNodeId(nodeId)
  } catch {
    element = null
  }
  const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
  if (typeof add !== 'function') return false
  const turn = (): void => {
    const held = authoredPropOf(runtime, nodeId, 'target')
    if (!held.readable || typeof held.held !== 'string') return
    // THE ACT IS THE REALM'S OWN AND IS CALLED, NEVER RE-SPELLED (`D-142`): `{ target }` is S1's argument space, and the
    // seat, the row, the write and the re-read are all inside it.
    void focusActRoute({ target: held.held })
  }
  ;(add as (type: string, handler: () => void) => void).call(element, 'click', turn)
  return true
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE LANDING-PAGE REPAIR IS UNDONE — THIS IS ITS HEADSTONE, NOT ITS HOME (`D-241`'s repair, undone on measurement)
 *
 * **WHAT STOOD HERE, AND WHAT IT GOT WRONG.** `repairUnpagedTarget(reading)` read a `['tabs']` delivery and, where the
 * ACTIVE row's `target` was this realm's own `untitled-<n>` placeholder, wrote that row WHOLE with
 * `target: TABS_LANDING_PAGE_ID` through the `dataRoute('write', …)` passthrough — the user's ruling, *"The new tab should
 * be coerced to the landing-page content by repair if it isn't seeded with any"*, discharged by changing the RECORD. **IT
 * BOUGHT THE VIEW ITS RULING ASKED FOR AND SOLD THE ROW'S IDENTITY**, which is the one thing that makes a chip
 * addressable: `seatOf` above (S6) seats the FIRST row of `reading.order` whose `target` matches the string a chip hands
 * the act, so once the new row and the `landing` row carried ONE target, **every click in the bar resolved to the
 * `landing` row** — earlier in `order` — and the user saw exactly that: *"clicking on any tab (including the currently
 * active one) switches the active tab to the landing."* The already-active `landing` chip looked fine only because it
 * landed on itself.
 *
 * **SO THE FIX IS THE CONTENT AND NEVER THE IDENTITY, AND IT LIVES ONE MODULE OVER.** A row's `target` stays what the `+`
 * gave it (`NEW_TAB_TARGET_PREFIX` + n, this realm's own marker, imported at this file's head), so every tab keeps a
 * distinct identity and each chip's click addresses its OWN row. **What the stage shows is decided where it has always been
 * decided — the LANDING TERMINAL'S WITNESS** (`src/renderer/tabs-client.ts`'s `deriveTabsWitness`), whose one comparison now
 * answers `true` for the landing page OR for this realm's own no-content marker: **a new tab LOOKS like the landing content
 * without BECOMING the landing tab.** This file therefore writes no row, holds no closure guard and takes no route for the
 * ruling at all — no write, no `coercedUnpaged`, no second reader of the record — and the marker's ONE spelling is
 * `tabs-client.ts`'s, read by the `+`'s derivation below and by the witness that decides the paint.
 *
 * **WHAT A TAB CREATED BY `provident.focus` WITH A CALLER'S OWN UNKNOWN TARGET GETS, STATED EXACTLY**: its caller's target,
 * carried untouched and never rewritten, and **the landing terminal does NOT stand for it** — the fallback keys on this
 * realm's own marker and NEVER on "the target resolves no authored page". That wider key was measured RED on gating
 * `tests/e2e/focus-retirement/`'s `F-1`, which opens a row with `/delta` and asserts the opened row CARRIES it: a caller's
 * string is a SEED by definition, while `untitled-<n>` is this realm's own declaration that it has nothing to put there.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE ADD-A-TAB CONTROL — THE ONE AFFORDANCE THE ACT HAD AND THE INTERFACE DID NOT
 *
 * **WHAT WAS MISSING, IN THE USER'S OWN WORDS**: *"I don't see a way to add new tabs in the ui"*. The act existed —
 * `provident.focus` with `newTab: true` and a distinct target opens a row (`focusActRoute`'s S6 open arm, `seatOf`'s
 * minted `tab-<n>` id) — and NOTHING IN THE INTERFACE OFFERED IT: the minted chips all carry `{ target }` with `newTab`
 * absent, so every click in the bar could only ever SEAT a standing row.
 *
 * **WHERE THE CONTROL LIVES IS DECIDED BY THE MINT, NOT BY TASTE**: `driveTabsRows` mints the row set INTO
 * `TABS_ROWS_ID` and `D-201`'s shape REPLACES that row set on every `['tabs']` delivery — so a `+` authored INSIDE that
 * node would be destroyed by the next delivery, and one minted as a row datum would be a TAB. The envelope therefore
 * authors it as the row's FOLLOWING SIBLING in the bar (`TABS_ADD_ID`, `src/shared/demo-envelope.ts`), in the drag
 * region's `no-drag` like every chip, and this turn is its ONE boot registration.
 *
 * **THE PATH IS THE MENUS' AND IT IS NOT RE-INVENTED** (`D-209`): the envelope authors a `handlers` entry with a no-op
 * STRING body, the wiring REPLACES that entry under the SAME `(name, event)` pair with a LIVE closure, and it also
 * attaches the DOM `click` a person's press lands on — the agent's arm and the human's arm, one act behind both
 * (`installAddTabHandler` / `attachAddTab`, exactly `installMenuItemHandler` / `attachMenuItem`). No channel, no bridge
 * member and no tool is added: the act is `focusActRoute`, the realm's own.
 *
 * **AND ITS TARGET MUST DIFFER PER PRESS** (`seatOf`'s premise, measured by the corpus): a `+` that always sent one
 * string would work ONCE — the second press would match the row the first opened, `seatOf` would answer that SEAT, and
 * S6b's already-active arm would write nothing. **WHAT MUST DIFFER IS THE `target` STRING AND NEVER THE ROW ID**: the id
 * is the ACT's to mint (`tab-<n>` upward, accepted by `mintTabId`) and `focusActRoute` is not ours to change, so this
 * turn supplies only the target and derives it against the record's own carried targets — `untitled-1`, `untitled-2`, …
 * skipping any string a row already carries. That is a derivation and not a counter: it holds nothing between presses,
 * which is also why it works on a realm whose record already carries an `untitled-1` from some other cause.
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE `+`'S ONE HANDLER NAME — THE ENVELOPE'S OWN SPELLING OF THE PAIR IT AUTHORS** (`TABS_ADD_HANDLER_NAME` in
 *  `src/shared/demo-envelope.ts`). **THE TWO SITES MUST AGREE**: the engine's `(name, event)` rule REPLACES an entry the
 *  node already carries and APPENDS one it does not, so a rename on one side alone would leave the authored no-op in
 *  front of this body — an agent's `dispatch` would run the placeholder and the act would silently not happen. */
const TABS_ADD_HANDLER = 'tab-add-act'

/** **THE `+`'S TARGET PREFIX IS NOT SPELLED HERE — IT IS `tabs-client.ts`'S ONE `NEW_TAB_TARGET_PREFIX`, IMPORTED AT THIS
 *  FILE'S HEAD, AND BOTH READERS READ THE SAME BYTES**: this turn hands the act `untitled-<n>` for a tab it opened with no
 *  content (`src/shared/types.ts`'s row docblock: a `target` is the CONTENT a tab holds, and this app authors no node for a
 *  new tab's content; the record's own title repair, `tab-has-title`/`'untitled'`, is what the chip reads), and the landing
 *  terminal's witness (`src/renderer/tabs-client.ts`'s `deriveTabsWitness`) reads that same prefix as "this tab is looking
 *  at the landing content" — **so a fresh tab shows the landing page while its own `target`, and therefore its own seat,
 *  stays its own.** The constant lives at the witness because that module is the reader this file cannot hand a value to
 *  (this file imports it, never the reverse); a second copy on either side is the collision `D-241` recorded, back. */

/** **THE LAST TARGET THIS TURN HANDED THE ACT, AND IT IS CLOSURE STATE AND NEVER DATA** (the form
 *  `startThemeApplication`'s `lastSetting` already has): the derivation below reads the RECORD for every string a row
 *  already carries, and this one member covers the gap between a press and the record catching up with it — two presses
 *  inside one delivery interval would otherwise derive the SAME candidate, and the second would open a second row whose
 *  target `seatOf` seats to the first (`D-201`'s two-rows-one-target note). It is never read as a record and it is reset
 *  by nothing: a stale string only ever costs the next press a higher `n`. */
let handedNewTabTarget: string | null = null

/** **THE DISTINCT TARGET, DERIVED OFF THE RECORD'S OWN ROWS** — the first `untitled-<n>`, from `n = 1` upward, that no
 *  row's `target` carries and that this turn has not just handed. **TERMINATION IS BY ARGUMENT**, the same one `seatOf`
 *  makes for its ids: only finitely many candidates are members of a finite `rows`, and the handed guard covers one more.
 *  **A READING THAT IS NOT `committed` CARRIES NO ROWS AND THEREFORE NO CONSTRAINT**: the act refuses that realm before it
 *  seats anything (S3), so the string this turn hands there is never written — it is `untitled-1`, and the ANSWER is the
 *  refusal, not a row. */
function newTabTargetOf(reading: TabsClientReading): string {
  const carried = new Set<string>()
  if (reading.status === 'committed') for (const row of reading.rows) carried.add(row.target)
  for (let n = 1; ; n += 1) {
    const candidate = `${NEW_TAB_TARGET_PREFIX}${String(n)}`
    if (carried.has(candidate)) continue
    if (candidate === handedNewTabTarget) continue
    return candidate
  }
}

/** **THE `+`'S ONE ACT — THE ROW'S OWN ACT, ENTERED WITH `newTab: true`** (`D-142`, `D-18`): ONE read so the target can be
 *  derived against the record, then `focusActRoute`'s S1 argument space with `{ target, newTab: true }` — which is S6's
 *  open arm, S8's one row write at `['tabs', row.id]` `file`, S9's re-read and S10's judgement. **THE ACT IS CALLED AND
 *  NEVER RE-SPELLED**: no member of it is composed here, and this turn writes no byte of its own. **THE SECOND READ IS
 *  THE ACT'S**, and it is not redundant: the derivation needs a record to avoid and the act needs its own reading to seat
 *  in, and only the act's write decides what stands. Its answer travels whole, exactly as `provident.focus` answers it. */
async function newTabAct(): Promise<FocusActAnswer> {
  const reading = await getTabsClient().read()
  const target = newTabTargetOf(reading)
  handedNewTabTarget = target
  return focusActRoute({ target, newTab: true })
}

/** **THE CONTROL'S OWN NODE ID, ASKED OF THE GRAPH** (the `menuItemNodeIds` census, keyed by an ID instead of a class,
 *  because `TABS_ADD_ID` is a published name and the node carries it as `props.id` — the same relation `authoredPropOf`
 *  reads for a row's `target`). **TOTAL**: a census that throws, answers no `nodes` or answers a shape that is not a list
 *  states `null`, so a realm with no such node degrades to no listener and no throw (`D-127`). **THE COST IS NAMED**: one
 *  `nodeState` read per in-tree node, ONCE at boot — the price `menuItemNodeIds` already pays, and no per-delivery read. */
function addTabNodeId(runtime: Runtime): string | null {
  let listed: unknown = null
  try {
    listed = runtime.listTargets()
  } catch {
    return null
  }
  const nodes = (listed as { readonly nodes?: unknown } | null | undefined)?.nodes
  if (!Array.isArray(nodes)) return null
  for (const entry of nodes as readonly unknown[]) {
    if (entry === null || typeof entry !== 'object') continue
    const nodeId = (entry as { readonly nodeId?: unknown }).nodeId
    if (typeof nodeId !== 'string' || nodeId === '') continue
    const held = authoredPropOf(runtime, nodeId, 'id')
    if (held.readable && held.held === TABS_ADD_ID) return nodeId
  }
  return null
}

/** **THE CONTROL'S ONE INSTALLED HANDLER BODY — THE AGENT'S ARM, INSTALLED BY THE WIRING** (`D-209`'s path, one node over
 *  from the menus): ONE `state-slice` at boot writing a `handlers` list whose single entry is a **live FUNCTION** under
 *  the name the envelope authored, so the engine's append-with-override REPLACES the authored no-op instead of adding a
 *  second `click`. **THE BODY IS A CLOSURE OVER THIS FILE'S `newTabAct`**, so no surface is opened to an agent's
 *  `dispatch`, and **ITS RETURN IS ITS OWN WORD AND NEVER THE ACT'S PROMISE**: a body's return crosses `JSON.stringify`
 *  into `dispatch`'s `results`, so the act is STARTED and the body answers a short string (`D-209`'s cost (ii)). A
 *  refused write is REPORTED, never silent (`D-117`). */
function installAddTabHandler(runtime: Runtime, nodeId: string): boolean {
  const body = (): string => {
    void newTabAct()
    return 'add tab'
  }
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'handlers', mode: 'replace', value: [{ name: TABS_ADD_HANDLER, event: 'click', body }] }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status === 'applied') return true
    console.error(`[provident-renderer] the add-tab control on ${nodeId} refused its installed handler (status=${status})`)
    return false
  } catch (error) {
    // NOTHING ESCAPES THE INSTALL: a hostile runtime is a reading this turn leaves standing, said out loud.
    console.error(`[provident-renderer] the add-tab install on ${nodeId} threw; an agent's dispatch reaches no act there`, error)
    return false
  }
}

/** **THE CONTROL'S ONE DOM `click` — THE HUMAN'S ARM** (`attachRowAct`'s and `attachMenuItem`'s form, and one listener, not
 *  two): the node is AUTHORED and never re-minted, so this listener is installed once at boot and no churn can leave a
 *  second one behind — the reason the rows need a per-delivery attach and this control does not. It calls the SAME act the
 *  installed body starts (`newTabAct`), so a person's press and an agent's dispatch cannot diverge. **A NODE THAT WILL NOT
 *  RESOLVE OR WILL NOT TAKE A LISTENER ATTACHES NOTHING AND THROWS NOTHING** (`D-127`). */
function attachAddTab(runtime: Runtime, nodeId: string): boolean {
  let element: unknown = null
  try {
    element = runtime.elementForNodeId(nodeId)
  } catch {
    element = null
  }
  const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
  if (typeof add !== 'function') return false
  ;(add as (type: string, handler: () => void) => void).call(element, 'click', (): void => {
    void newTabAct()
  })
  return true
}

/** **TURN 5 — THE `+`'S ONE BOOT REGISTRATION** (`startMenusItems`' shape, and taken at the same site for the same reason):
 *  the node is AUTHORED, so it exists as soon as the first envelope loaded and nothing mints, subscribes or re-attaches.
 *  **IT SENDS NO ROUTE AND WRITES NO RECORD**: the act is a press's, so a boot that is never pressed writes no byte of the
 *  tabs record and cannot delay or fail `tests/e2e/bundle-boot-seam`'s `B-5` (the install writes one `handlers` layer, graph
 *  bytes with no crossing behind them). **BOTH READINGS ARE RETURNED**, so the boot's one site can say out loud that the
 *  control is not there or takes no listener (`D-117`). */
function startAddTab(runtime: Runtime): { readonly nodeId: string | null; readonly installed: boolean; readonly attached: boolean } {
  const nodeId = addTabNodeId(runtime)
  if (nodeId === null) return { nodeId: null, installed: false, attached: false }
  const installed = installAddTabHandler(runtime, nodeId)
  const attached = attachAddTab(runtime, nodeId)
  return { nodeId, installed, attached }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// **TURN 6 — THE PANE'S RELOCATION IS A DRAG: ONE GRIP PER PANE, FOUR AUTHORED ZONES, ONE WHOLE-PANE WRITE**
// (`docs/L3/renderer-wiring/design-pane-relocation.md` rev 1; the second affordance `D-244` designed and never built.)
//
// **THE GESTURE IS A DRAG, AND THE TWO THINGS THAT MADE IT A PICK THE FIRST TIME ARE BOTH ANSWERED HERE BY MEASURED
// CAUSES RATHER THAN BY RE-DESIGN.** **(i)** §1's reason the pick was chosen — *"the landed affordance installs no
// pointer capture local to another region, so a drag that leaves the strip's box loses its reading"* — **WAS THE
// `D-245` DEFECT, NOT A PROPERTY OF THE GESTURE**: every handle in this realm went inert on its first move for want of
// `setPointerCapture`, and `captureOnGripPress` below is that row's fix applied to the two grips, on the same
// `pointerdown`, with the same total degradations (`D-245`). **(ii)** §2's reason no hit-test is taken —
// `getBoundingClientRect` THROWS in the layout-less DOM shim — **IS ABOUT MEASURABILITY AND NOT ABOUT THE HAND,
// so nothing here measures a box either**: the four drops are AUTHORED OVERLAYS given their ZONE'S OWN EXTENT while a drag
// is in flight (`paneMoveDropBoxOf` below: the four stored figures and their order, no node added), and the drag asks
// **the DOM** which of them the pointer is standing on — `document.elementFromPoint` in a realm that has layout, and the
// event's own `target` in a realm that does not (the whole node suite, `D-27`). So a row can drive the gesture by
// dispatching at a drop, while the real window resolves the drop under a real pointer.
// **AND THE PREVIEW IS THE DRAG'S OWN TRANSIENT** (`D-246`'s lesson: a preview written to the wrong node moves nothing
// a person can see): the **zone the record would receive** is outlined through a transient `style` declaration on the
// ZONE ELEMENT — one of the four PAINTED nodes, which `paintStyle` replaces WHOLE on the next delivery and which no
// delivery touches mid-gesture — and **the authored overlay under the pointer** is filled in beside it, so the person
// sees both the vicinity window and the zone that will take the record. **NO GHOST OF THE PANE IS DRAWN**: a ghost is
// a NEW ELEMENT, and every element in this realm is provident data (`AGENTS.md`'s UI authority) — the authored census is
// pinned at `89` nodes by `theme-control`, and the pane's own element may not be re-parented (`D-182`, §6).
// **THE `['drag']` FAMILY IS NOT FORCED TO CARRY IT**: that family's writer is `commitDrag(<pane>, {<member>: <figure>})`
// — a PANE-KEYED, GEOMETRY-SHAPED `{size}` transient (`D-145`, §1 of `design-zone-handles.md`) — and its reader is the
// ghost turn, which reads `branch[DEFAULT_PANE_ID]`. A placement is neither keyed by a figure nor answerable in a `size`,
// so encoding a zone into it would be a second authority in the quietest form (`D-129`); the family stays exactly what
// the resize drags made it, and the placement preview is the inline-style transient above.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE TWO DECLARED GRIPS, BY THEIR AUTHORED IDS — THE SECOND HALF OF THE ADDRESS BOOK, SPELLED LIKE THE DROPS'
 *  EIGHT** (`D-235`, `D-188` debt 2): the envelope's `MENUS_GRAB_ID`/`GUTTER_GRAB_ID` are private and this file spells
 *  the same two strings, so the equality is a ROW's (`theme-control`'s per-id census) and never a derivation across the
 *  module boundary. **THE PAIRING IS THE ENVELOPE'S OWN ID CONVENTION AND IS DERIVED INSIDE THIS FILE**: a drop is
 *  `${gripId}-${zone}` (`demo-envelope.ts`'s `paneMoveGripNodeOf`), and both ends of that spelling stand in this file as
 *  literals — so pairing a grip with its four drops by prefix derives nothing this file does not already state. */
const PANE_MOVE_GRIP_IDS: readonly string[] = ['menus-grab', 'gutter-grab']

/** **THE DISTANCE THE POINTER MUST TRAVEL BEFORE A PRESS IS A DRAG RATHER THAN A CLICK** (`D-245`'s instrument: a real
 *  pointer, one sample per move). **IT IS THE ONE THING THAT KEEPS A CLICK A CLICK**: pressing a grip reveals its four
 *  zone overlays, and the grip's own box stands INSIDE one of those overlays (the menus pane is in the `top` zone) — so
 *  without a threshold a plain press-and-release on the grip would COMMIT the zone the grip happens to stand in. `4px`
 *  is below the smallest deliberate move and above a hand's tremor. **A REALM THAT CANNOT MEASURE THE COORDINATES ARMS
 *  ON THE FIRST MOVE IT HEARS** (`pointerOf`'s null arm), because a move it cannot measure is still a move. */
const PANE_MOVE_ARM_DISTANCE = 4

/** **THE EIGHT DECLARED DROPS, BY THEIR AUTHORED IDS — THE ADDRESS BOOK AND NOT A WALK** (§3 `M1`; `D-235`). The
 *  envelope derives each id from its grip's one spelling (`'menus-grab'`/`'gutter-grab'` + `-<zone>`), so these eight
 *  literals are the SECOND spelling and the equality is a ROW's business, never a derivation — the ids cannot cross the
 *  module boundary without becoming published names, which the design refuses (`D-41`, `D-188` debt 2, §7). The census
 *  resolves each of them to the NODE id the graph minted (a node id is not a `props.id`: `addTabNodeId`'s lesson), and
 *  a drop naming a pane or a zone the record does not declare is REFUSED BY THE STORE rather than dropped here (§3). */
const PANE_MOVE_DROP_IDS: readonly string[] = [
  'menus-grab-top', 'menus-grab-bottom', 'menus-grab-left', 'menus-grab-right',
  'gutter-grab-top', 'gutter-grab-bottom', 'gutter-grab-left', 'gutter-grab-right',
]

/** **THE ONE `(name, event)` PAIR EVERY DROP AUTHORS AND THIS FILE INSTALLS OVER** (`TABS_ADD_HANDLER`'s two-spelling
 *  rule, exactly): the envelope states it (`demo-envelope.ts`'s `PANE_MOVE_HANDLER_NAME`) and this copy names the body
 *  it installs. A rename on either side would silently turn the install into a SECOND handler rather than a
 *  replacement, which is why both sites say so. */
const PANE_MOVE_HANDLER = 'pane-move'

/** One census hit: the AUTHORED id the tree spells and the NODE id the graph minted (`addTabNodeId`'s lesson). */
interface PaneMoveNodeRef {
  readonly id: string
  readonly nodeId: string
}

/** One DROP as a drag target: its census reference plus the element the graph answered for it (`elementForNodeId`), which
 *  is the identity the DOM's hit-test is compared against. **THE ELEMENT IS RESOLVED ONCE AT BOOT** and is the same one
 *  `attachPaneMove` installed the `click` on, so a drag and a pick address one node. */
interface PaneMoveDropTarget extends PaneMoveNodeRef {
  readonly element: unknown
}

/** **THE CENSUS — EVERY DECLARED GRIP AND DROP RESOLVED TO THE NODE THE GRAPH MINTED, IN ONE WALK** (`D-235`; the
 *  `addTabNodeId`/`menuItemNodeIds` form): `props.id` is read off every in-tree node ONCE at boot and compared against
 *  the two grip literals and the eight drop literals above, so no node id is spelled and no selector is used. **TOTAL**:
 *  a census that throws, answers no `nodes` or answers a shape that is not a list states an EMPTY answer, so a realm with
 *  no such node degrades to no listener and no throw (`D-127`). **THE COST IS NAMED**: one `nodeState` read per in-tree
 *  node, once — the price `addTabNodeId` already pays, and no per-delivery read. **TWO LISTS AND NOT ONE, BECAUSE THE TWO
 *  KINDS ARE TWO ARMS**: the grips take the press and the pointer, the drops take the release's act, and a boot reading
 *  that confused them would capture on a drop. **A MISSING NODE IS NOT INVENTED**: each list carries what the tree
 *  answered, and the boot's one site compares both lengths against their declared literals. */
function paneMoveCensusOf(runtime: Runtime): { readonly grips: readonly PaneMoveNodeRef[]; readonly drops: readonly PaneMoveNodeRef[] } {
  let listed: unknown = null
  try {
    listed = runtime.listTargets()
  } catch {
    return { grips: [], drops: [] }
  }
  const nodes = (listed as { readonly nodes?: unknown } | null | undefined)?.nodes
  if (!Array.isArray(nodes)) return { grips: [], drops: [] }
  const grips: PaneMoveNodeRef[] = []
  const drops: PaneMoveNodeRef[] = []
  for (const entry of nodes as readonly unknown[]) {
    if (entry === null || typeof entry !== 'object') continue
    const nodeId = (entry as { readonly nodeId?: unknown }).nodeId
    if (typeof nodeId !== 'string' || nodeId === '') continue
    const held = authoredPropOf(runtime, nodeId, 'id')
    if (!held.readable || typeof held.held !== 'string') continue
    if (PANE_MOVE_GRIP_IDS.includes(held.held)) {
      grips.push({ id: held.held, nodeId })
      continue
    }
    if (!PANE_MOVE_DROP_IDS.includes(held.held)) continue
    drops.push({ id: held.held, nodeId })
  }
  return { grips, drops }
}

/** **THE ACT — ONE DROP'S PRESS, AND THE WHOLE PANE RECORD WRITTEN ONCE** (§3 `X1`–`X4`). It is TOTAL: every arm
 *  answers and nothing throws (`D-127`), so no caller wraps an IPC turn in a `try`.
 *
 *  **`X0` — THE TWO OPERANDS ARE READ OFF THE NODE AT PRESS TIME** (`D-129`'s ask-don't-remember rule, the form
 *  `attachMenuItem` uses for `props.role`): the drop's `props.pane` is the RECORD id its act addresses and `props.zone`
 *  the DECLARED zone id it relocates to. A node whose `props` cannot be read is REPORTED and no act is attempted.
 *  **`X1` — THE STANDING RECORD COMES FROM THE SHAPE, AND A PANE THE FAMILY DOES NOT NAME HAS NO ACT**: the client's
 *  held reading is the realm's one copy of the family (`D-117`), and a miss is reported rather than filled with
 *  `paneGeometryIn`'s measured DEFAULT — a default written back would INVENT a figure the record never stored, which is
 *  `D-174`'s class exactly.
 *  **`X2` — THE VALUE IS THE WHOLE RECORD: BOTH FIGURES VERBATIM, THE ZONE THE DROP NAMES, AND NO `BOUNDS`** (§4).
 *  Both axis members are stored for every pane and `paneOf` admits no half geometry, so **NO FIGURE IS INVENTED ON
 *  ARRIVAL**: the pane arrives in its new zone already carrying the figure that zone makes adjustable, and the member
 *  it no longer adjusts stays as the MEMORY `D-189` keeps. **`bounds` is the DRAG's pixel clamp and belongs to the axis
 *  it was measured on** (`D-243`), so carrying a stage pane's `{0,200}` into a `top` zone would clamp an axis never
 *  measured for it — `D-129`'s second authority in its quietest form. **IT IS DROPPED BY NOT BEING COPIED**, and a pane
 *  that returns to the stage answers the measured pair through the read's own absent arm (`D-186`).
 *  **`X3` — ONE WRITE, AT THE FAMILY'S OWN ADDRESS, THROUGH THE REALM'S EXISTING `dataRoute('write')`** (`D-191`,
 *  `D-112`): `['panes', <pane>]` at `file`, WHICH IS THE RECORD AND NOT A LEAF — **and it is NOT `commitPane`**: that
 *  route carries `{width?, height?, bounds?}`, names no placement, and REFUSES a member the pane's `zone` does not make
 *  adjustable (*"a `width` handed to a sidebar pane is a fault, not an update"*), so a relocation cannot be expressed
 *  through it at all. No route, no channel, no bridge member and no new MCP tool is added (`D-18`, `D-123`). **THE
 *  ANSWER IS REPORTED IN `D-117`'S REGISTER**: a refusal is `console.error` with its `reason` and `message` verbatim, an
 *  answer that is not `committed` is `console.warn`, and a COMMIT IS SILENT.
 *  **`X4` — NOTHING ELSE**: no paint, no re-read and no poll stands here. The record's own push repaints (`D-82`
 *  clause 4): `paneFillAxisOf`/`paneAxisMembers` read the record's `zone` on EVERY delivery, so the next one paints the
 *  NEW zone's fill, figure and scroll with no byte of this file's paint moving (`D-243`). **AND NOTHING IS RE-PARENTED**:
 *  the region a pane renders inside stays the authored tree's, which is `D-182`'s upstream routing defect and the limit
 *  the design declares rather than papers over (§6). */
async function paneMoveAct(runtime: Runtime, dropNodeId: string): Promise<void> {
  // X0 — THE TWO OPERANDS, READ OFF THE NODE.
  const pane = authoredPropOf(runtime, dropNodeId, 'pane')
  const zone = authoredPropOf(runtime, dropNodeId, 'zone')
  if (!pane.readable || typeof pane.held !== 'string' || pane.held === '') {
    console.error(`[provident-renderer] pane move: the drop on ${dropNodeId} states no readable \`pane\`, so no act was attempted`)
    return
  }
  if (!zone.readable || typeof zone.held !== 'string' || zone.held === '') {
    console.error(`[provident-renderer] pane move: the drop on ${dropNodeId} states no readable \`zone\`, so no act was attempted`)
    return
  }
  const paneId = pane.held
  const zoneId = zone.held
  // X1 — THE STANDING RECORD, OUT OF THE SHAPE THIS REALM ALREADY HOLDS. No route is asked and no default stands in.
  const standing = getViewClient().shape().panes.find((entry) => entry.id === paneId)
  if (standing === undefined) {
    console.error(`[provident-renderer] pane move: the record names no pane \`${paneId}\`, so nothing was written and nothing was invented`)
    return
  }
  // X2 — THE WHOLE RECORD: both figures VERBATIM, the zone the drop names, and NO `bounds`.
  const value = { id: standing.id, width: standing.width, height: standing.height, zone: zoneId }
  // X3 — ONE WRITE AT THE FAMILY'S OWN ADDRESS, THROUGH THE REALM'S OWN PASSTHROUGH.
  let written: unknown = null
  try {
    written = await dataRoute('write', { path: ['panes', paneId], tier: 'file', value })
  } catch (error) {
    // THE ROUTE THAT THREW IS AN ARM AND NOT AN ESCAPE: a rejected `data.write` is reported here and no caller sees it.
    console.error(`[provident-renderer] pane move: the write at ['panes','${paneId}'] threw — ${String(error)}`)
    return
  }
  const answer = written !== null && typeof written === 'object' ? (written as Record<string, unknown>) : {}
  const status = typeof answer['status'] === 'string' ? answer['status'] : 'no-answer'
  if (status === 'committed') return
  if (status === 'refused') {
    console.error(
      `[provident-renderer] pane move: the write at ['panes','${paneId}'] was REFUSED (${String(answer['reason'])}): ${String(answer['message'])}`,
    )
    return
  }
  console.warn(`[provident-renderer] pane move: the write at ['panes','${paneId}'] answered \`${status}\`, so the store's answer is unread`)
}

/** **THE DROP'S ONE INSTALLED HANDLER BODY — THE AGENT'S ARM** (`D-239`'s path, one control class over): ONE
 *  `state-slice` at boot whose `handlers` list holds a LIVE FUNCTION under the name the envelope authored, so the
 *  engine's append-with-override REPLACES the authored no-op instead of adding a second `click`. **THE BODY IS A
 *  CLOSURE OVER THIS FILE'S OWN ACT**, so no surface is opened to an agent's `dispatch`, and **ITS RETURN IS ITS OWN
 *  WORD AND NEVER THE ACT'S PROMISE**: a body's return crosses `JSON.stringify` into `dispatch`'s `results`, so the act
 *  is STARTED and the body answers a short string (`D-209`'s cost (ii)). */
function installPaneMoveHandler(runtime: Runtime, dropNodeId: string): boolean {
  const body = (): string => {
    void paneMoveAct(runtime, dropNodeId)
    return 'pane move'
  }
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: dropNodeId,
      mutation: [{ targetProp: 'handlers', mode: 'replace', value: [{ name: PANE_MOVE_HANDLER, event: 'click', body }] }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status === 'applied') return true
    console.error(`[provident-renderer] pane move: the drop on ${dropNodeId} refused its installed handler (status=${status})`)
    return false
  } catch (error) {
    console.error(`[provident-renderer] pane move: the install on ${dropNodeId} threw; an agent's dispatch reaches no act there`, error)
    return false
  }
}

/** **THE DROP'S ONE DOM `click` — THE HUMAN'S PICK, AND STILL A CAUSE OF THE SAME ACT** (`attachAddTab`'s form, and ONE
 *  listener, not two): the drop is AUTHORED and never re-minted, so this listener is installed once at boot and no churn
 *  can leave a second one behind. It calls the SAME act the installed body starts (`paneMoveAct`), so a person's press and
 *  an agent's dispatch cannot diverge — one act, two causes (`AL-3`'s instrument, `D-239`). **IT IS THE PICK ARM AND NOT
 *  THE DRAG'S**: a grip's four drops are revealed while the grip holds focus, so a press followed by a click on a revealed
 *  zone overlay still relocates, and the drag below is the second cause of the same `paneMoveAct`. **A PRESS AND A
 *  RELEASE ARE NOT THIS LISTENER'S** — a `click` is only dispatched when press and release land on one node, and a release
 *  over a zone is the grip's (`onEnd` below), which is why the two arms cannot both fire for one gesture.
 *  **A NODE THAT WILL NOT RESOLVE OR WILL NOT TAKE A LISTENER ATTACHES NOTHING AND THROWS NOTHING** (`D-127`); its answer
 *  is the ELEMENT it attached to, so the drag's target map takes the SAME resolution and the two arms can never name two
 *  different elements. */
function attachPaneMove(runtime: Runtime, dropNodeId: string): unknown | null {
  let element: unknown = null
  try {
    element = runtime.elementForNodeId(dropNodeId)
  } catch {
    element = null
  }
  const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
  if (typeof add !== 'function') return null
  ;(add as (type: string, handler: () => void) => void).call(element, 'click', (): void => {
    void paneMoveAct(runtime, dropNodeId)
  })
  return element
}

/** **THE PREVIEW'S TWO DECLARATIONS — WHAT A PERSON SEES WHILE THE DRAG IS IN FLIGHT, AND ON WHICH NODES**
 *  (`D-246`'s second defect is the reason this is spelled out node by node: a preview written one node away moves
 *  nothing a person can see).
 *  **`zone` — THE ZONE THE RECORD WOULD RECEIVE, OUTLINED ON THE ZONE ELEMENT ITSELF.** That element is one of the four
 *  PAINTED nodes: `paintStyle` hands the engine its `css.style` in `replace` mode (`D-234`), so this declaration is a
 *  TRANSIENT by construction — the next delivery replaces the zone's whole style and takes it with it, and no delivery
 *  runs during a gesture (`D-246` measured exactly that on the zone strip's own preview). It is the same node class and
 *  the same write mechanism as `zonePreviewOf`'s size transient, one property over.
 *  **`drop` — THE AUTHORED OVERLAY UNDER THE POINTER, FILLED IN.** This element is authored data (`demo-envelope.ts`'s
 *  four zone overlays), so its base paint is the page sheet's and this inline write only emphasises the one the pointer is
 *  standing in; removing it restores the sheet's fill with nothing remembered.
 *  **BOTH ARE CLEARED BY `paneMovePreviewClear` AND NOTHING ELSE, AND THE CLEAR IS BY PROPERTY NAME** — so a realm whose
 *  `style` cannot set answers the declared no-write arm (`P1`/`P2`'s discipline) and the drag still commits. */
const PANE_MOVE_PREVIEW: Readonly<Record<'zone' | 'drop', readonly { readonly property: string; readonly text: string }[]>> = {
  zone: [
    { property: 'outline', text: '2px solid #2f6fb0' },
    { property: 'outline-offset', text: '-2px' },
  ],
  drop: [{ property: 'background-color', text: 'rgba(47, 111, 176, 0.32)' }],
}

/** **ONE ELEMENT'S STYLE, AS THE TWO VERBS THE PREVIEW NEEDS, OR `null`** — the guarded resolver every preview write and
 *  every clear goes through, so a realm with no `style`, a `style` that is not an object, or a member that is not a
 *  function is the DECLARED NO-WRITE ARM (`D-127`: nothing here throws out of a pointer turn). */
function paneMoveStyleOf (element: unknown): { readonly set: (property: string, text: string) => void; readonly remove: (property: string) => void } | null {
  if (element === null || element === undefined || typeof element !== 'object') return null
  let style: unknown = null
  try {
    style = (element as { readonly style?: unknown }).style
  } catch {
    return null
  }
  if (style === null || style === undefined || typeof style !== 'object') return null
  let set: unknown
  let remove: unknown
  try {
    set = (style as { readonly setProperty?: unknown }).setProperty
    remove = (style as { readonly removeProperty?: unknown }).removeProperty
  } catch {
    return null
  }
  if (typeof set !== 'function' || typeof remove !== 'function') return null
  return {
    set: (property: string, text: string): void => {
      try {
        ;(set as (property: string, text: string) => void).call(style, property, text)
      } catch {
        // a realm that refuses the declaration is the no-write arm: the move is still a move, the record is untouched
      }
    },
    remove: (property: string): void => {
      try {
        ;(remove as (property: string) => void).call(style, property)
      } catch {
        // the same arm: a refused clear leaves a transient a delivery replaces whole
      }
    },
  }
}

/** **THE PREVIEW'S ONE WRITER** — both declarations of one kind on one element, by property NAME (`PANE_MOVE_PREVIEW`). */
function paneMovePreviewWrite(element: unknown, kind: 'zone' | 'drop'): void {
  const style = paneMoveStyleOf(element)
  if (style === null) return
  for (const declaration of PANE_MOVE_PREVIEW[kind]) style.set(declaration.property, declaration.text)
}

/** **THE PREVIEW'S ONE CLEARER — THE RELEASE, THE CANCEL AND A NEW PRESS ALL END HERE**, and it removes exactly the
 *  properties the writer set, so nothing is remembered and the authored paint (the overlay's) or the next delivery's
 *  `css.style` (the zone's) is what stands afterwards. **THIS IS HOW THE PREVIEW IS CLEARED ON RELEASE** (`D-216`'s
 *  rule: nothing paints without an event — the preview is the DRAG's own transient, written by a pointer event and
 *  cleared by the pointer event that ends it, and the record's own push paints from there). */
function paneMovePreviewClear(element: unknown, kind: 'zone' | 'drop'): void {
  const style = paneMoveStyleOf(element)
  if (style === null) return
  for (const declaration of PANE_MOVE_PREVIEW[kind]) style.remove(declaration.property)
}

/** **THE SIX BOX PROPERTIES THE DRAG OWNS ON A DROP, AND THE ONE THAT MAKES IT VISIBLE** (`D-249` defect: the drops' boxes
 *  were `25vh`/`20vw` OF THE VIEWPORT, which is not a zone). **THE BOX IS COMPUTED FROM THE RECORD AND NEVER AUTHORED**:
 *  a zone's extent is `['zones', <id>, 'size']` — the envelope states it in words for the one reason it states no figure
 *  (`demo-envelope.ts`'s `paneMoveDropStyleOf`, `D-129`, `D-174`) — so the four drops are placed here, at the press, from
 *  the same family `driveLayoutRegions` paints the zones from, and are **`position: fixed`, so they are placed against the
 *  VIEWPORT while their figures are the ZONES'**: `top` owns the band `0 … top.size`, `bottom` the band
 *  `window − bottom.size … window` and `left`/`right` own the lanes BETWEEN those two bands, at their own width. **THE
 *  FOUR WINDOWS ARE DISJOINT BY CONSTRUCTION** and the stage — the middle, below the top band and beside the lanes — belongs
 *  to none of them, which is what keeps a release elsewhere from being read as a destination.
 *  **`opacity` IS PART OF THIS LIST AND NOT DECORATION**: the sheet reveals all four drops on `.pane-grab:focus-within`, and
 *  an overlay that is not the one under the pointer is debris over the whole app (measured: a drag released over no zone
 *  leaves the grip focused and four translucent windows standing). The authored state is `opacity: 0`; the drag shows the
 *  hovered one and hides the rest. **OPACITY AND NOT `display`**: a `display: none` element is not hit-testable, and these
 *  four boxes are exactly what `document.elementFromPoint` has to answer. */
const PANE_MOVE_DROP_BOX: readonly string[] = ['top', 'right', 'bottom', 'left', 'width', 'height']
const PANE_MOVE_DROP_OPACITY: Readonly<Record<'shown' | 'hidden', string>> = { shown: '1', hidden: '0' }

/** **THE FOUR ZONES' PAINTED FIGURES, READ OFF THE RECORD'S OWN FAMILY ONCE PER PRESS** (`D-129`'s ask-don't-remember:
 *  the drag asks the standing record at the gesture's first instant rather than remembering a shape a delivery may have
 *  replaced). Total over every arm (`D-127`): a throwing client, a shape with no `zones` list, a non-object row, a
 *  non-string id and a figure that is not a finite non-negative number each contribute NOTHING, so a zone the record does
 *  not state simply has no window and no drop of its own can be reached. **NO DEFAULT IS INVENTED** (`D-174`, `D-233`): a
 *  missing figure leaves the drop at its authored box, which is no box at all. */
function paneMoveZoneFigures (): ReadonlyMap<string, number> {
  const figures = new Map<string, number>()
  let shape: unknown = null
  try {
    shape = getViewClient().shape()
  } catch {
    return figures
  }
  const zones = (shape as { readonly zones?: unknown } | null | undefined)?.zones
  if (!Array.isArray(zones)) return figures
  for (const entry of zones as readonly unknown[]) {
    if (entry === null || typeof entry !== 'object') continue
    const id = (entry as { readonly id?: unknown }).id
    const size = (entry as { readonly size?: unknown }).size
    if (typeof id !== 'string' || id === '') continue
    if (typeof size !== 'number' || !Number.isFinite(size) || size < 0) continue
    figures.set(id, size)
  }
  return figures
}

/** **ONE DROP'S BOX, COMPOSED FROM THE ZONE'S FIGURE AND THE FOUR ZONES' ORDER — OR `null` WHERE THE RECORD STATES NO
 *  FIGURE.** The bands are the zones' own extents against the window's two edges, and the lanes run between them, so
 *  *"the vicinity of a zone"* is resolved against THE ZONES and never against a grid of viewport percentages (the defect
 *  measured at a `230`-wide window: a `50px` lane against a `115px` rail). Every side is stated on every arm — the unused
 *  ones as `auto` — because these are inline declarations on ONE element and a leftover side from the previous target would
 *  be a box nobody composed. **`null` IS THE STATED ABSENCE AND NEVER A FALLBACK** (`D-174`). */
function paneMoveDropBoxOf (zone: string, figures: ReadonlyMap<string, number>): Record<string, string> | null {
  const top = figures.get('top')
  const bottom = figures.get('bottom')
  const own = figures.get(zone)
  if (top === undefined || bottom === undefined || own === undefined) return null
  const px = (figure: number): string => `${String(figure)}px`
  if (zone === 'top') return { top: '0', bottom: 'auto', left: '0', right: '0', height: px(own), width: 'auto' }
  if (zone === 'bottom') return { top: 'auto', bottom: '0', left: '0', right: '0', height: px(own), width: 'auto' }
  if (zone === 'left') return { top: px(top), bottom: px(bottom), left: '0', right: 'auto', width: px(own), height: 'auto' }
  if (zone === 'right') return { top: px(top), bottom: px(bottom), right: '0', left: 'auto', width: px(own), height: 'auto' }
  return null
}

/** **ONE DROP'S BOX, WRITTEN ON THE PRESS** — the six properties of the composed box, and the hidden state, on the element
 *  the census resolved. A realm whose `style` refuses is the declared no-write arm (`paneMoveStyleOf`'s own, `D-127`), and
 *  the gesture still commits: what is lost is the picture, never the act. */
function paneMoveDropBoxWrite (element: unknown, zone: string, figures: ReadonlyMap<string, number>): void {
  const style = paneMoveStyleOf(element)
  if (style === null) return
  style.set('opacity', PANE_MOVE_DROP_OPACITY.hidden)
  const box = paneMoveDropBoxOf(zone, figures)
  if (box === null) return
  for (const property of PANE_MOVE_DROP_BOX) {
    const text = box[property]
    if (text === undefined) continue
    style.set(property, text)
  }
}

/** **AND CLEARED ON THE RELEASE, THE CANCEL AND A NEW PRESS** — the same six properties and the opacity, by NAME, so the
 *  authored style (fixed, a pointer cursor, `opacity: 0`) is what stands afterwards and nothing is remembered. */
function paneMoveDropBoxClear (element: unknown): void {
  const style = paneMoveStyleOf(element)
  if (style === null) return
  for (const property of PANE_MOVE_DROP_BOX) style.remove(property)
  style.remove('opacity')
}

/** **THE ONE DROP THE DRAG IS OFFERING, AND ITS THREE SIBLINGS MADE INVISIBLE** — the emphasis transition, written and
 *  cleared by the same `highlight` turn that writes and clears the fill, so the picture a person sees is always exactly the
 *  placement the release would commit. */
function paneMoveDropEmphasis (element: unknown, shown: boolean): void {
  const style = paneMoveStyleOf(element)
  if (style === null) return
  style.set('opacity', shown ? PANE_MOVE_DROP_OPACITY.shown : PANE_MOVE_DROP_OPACITY.hidden)
}

/** **THE POINTER'S TWO COORDINATES, OR `null`** — the ONE coordinate read this file takes, total over a primitive event, a
 *  throwing accessor and a realm that carries no `clientX`/`clientY` (the layout-less shim: `pointerOf`'s own null arm,
 *  which the drag treats as "a move I cannot measure, which is still a move"). */
function paneMovePointOf (event: unknown): { readonly x: number; readonly y: number } | null {
  try {
    const holder = event as { readonly clientX?: unknown; readonly clientY?: unknown } | null | undefined
    const x = holder?.clientX
    const y = holder?.clientY
    if (typeof x === 'number' && Number.isFinite(x) && typeof y === 'number' && Number.isFinite(y)) return { x, y }
  } catch {
    return null
  }
  return null
}

/** **WHICH DECLARED DROP AN ELEMENT IS, OR ITS NEAREST ANCESTOR, OR `null`** — the comparison is OBJECT IDENTITY against
 *  the elements the graph answered (`elementForNodeId`), never a selector and never an id string read off an attribute:
 *  the census has already resolved the address book, so a hit is matched to a node the wiring knows by construction. The
 *  eight-hop ancestor walk exists because `elementFromPoint` answers the DEEPEST element and a drop that gains a child
 *  would otherwise be invisible; it is bounded, so a tree that answered a cycle cannot spin here. */
function paneMoveTargetOfHit (hit: unknown, targets: ReadonlyMap<unknown, PaneMoveDropTarget>): PaneMoveDropTarget | null {
  let candidate = hit
  for (let hop = 0; hop < 8; hop += 1) {
    if (candidate === null || candidate === undefined || typeof candidate !== 'object') return null
    const found = targets.get(candidate)
    if (found !== undefined) return found
    let parent: unknown = null
    try {
      parent = (candidate as { readonly parentElement?: unknown }).parentElement
    } catch {
      return null
    }
    if (parent === null || parent === undefined || typeof parent !== 'object') return null
    candidate = parent
  }
  return null
}

/** **THE DRAG'S TARGET — HOW *"IN THE VICINITY OF A ZONE"* IS ANSWERED, AND BY THE DOM RATHER THAN BY ARITHMETIC ON BOXES**
 *  (`design-pane-relocation.md` §2 rejected box hit-testing because `getBoundingClientRect` THROWS in the layout-less shim
 *  — a rejection about MEASURABILITY, not about a hand, so the gesture takes the two arms below and measures nothing).
 *  **(1) A REALM WITH LAYOUT — THE WINDOW — ASKS THE DOM**: the four authored drops are ZONE-SIZED OVERLAYS while a drag
 *  is in flight (`paneMoveDropBoxOf` below, from the record's own zone figures), so `document.elementFromPoint(x, y)` lands
 *  on one of them, and the drop is the element it answered. **This is the arm a real pointer needs and no node row can
 *  reach** (`D-27`).
 *  **(2) A REALM WITH NO LAYOUT — THE WHOLE NODE SUITE — TAKES THE EVENT'S OWN `target`**: `elementFromPoint` is a member
 *  of the DOCUMENT and not of an element, so a shim that carries `document` at all need not carry it, and a row that
 *  dispatches `pointerdown` at the grip and `pointerup` at a drop hands the drop over as the event's target. **So the
 *  gesture is drivable where its rows live, and the target is still resolved by DOM identity and never by a box.**
 *  **NOTHING HERE IS AMBIENT IN A NODE REALM**: `document` is read behind `typeof`, `elementFromPoint` behind a
 *  `typeof` on the member, and its call behind a `try` — a realm with neither answers `null`, which is the gesture's own
 *  "no zone under the pointer" arm. */
function paneMoveDropUnderPointer (event: unknown, targets: ReadonlyMap<unknown, PaneMoveDropTarget>): PaneMoveDropTarget | null {
  const point = paneMovePointOf(event)
  const held = typeof document === 'undefined' ? null : (document as unknown as { readonly elementFromPoint?: unknown })
  let fromPoint: unknown = null
  try {
    fromPoint = held === null ? null : held.elementFromPoint
  } catch {
    fromPoint = null
  }
  if (typeof fromPoint === 'function' && point !== null) {
    let hit: unknown = null
    try {
      hit = (fromPoint as (x: number, y: number) => unknown).call(held, point.x, point.y)
    } catch {
      hit = null
    }
    // THE DOM'S ANSWER IS THE ANSWER IN A LAYOUT REALM: a hit that is no drop is the pointer standing over no zone.
    if (hit !== null && hit !== undefined) return paneMoveTargetOfHit(hit, targets)
  }
  let own: unknown = null
  try {
    own = (event as { readonly target?: unknown } | null | undefined)?.target
  } catch {
    return null
  }
  return paneMoveTargetOfHit(own, targets)
}

/** **ONE GRIP'S DRAG: THE PRESS CAPTURES THE POINTER (`D-245`'s fix, on the two grips), THE MOVES DRAW THE PREVIEW, THE
 *  RELEASE COMMITS THE ONE ACT.** It is installed ONCE per grip at boot on the element the graph resolved for the grip's
 *  node id, and it takes the four DROP elements this grip addresses as its second arm.
 *
 *  **THE CAPTURE IS THIS GESTURE'S WHOLE PREMISE AND IT IS `D-245`'S FIX, MIRRORED LINE FOR LINE FROM
 *  `captureOnPress`** (the resize handles' own, above in this file): the same `pointerdown`, the same
 *  `setPointerCapture(event.pointerId)` on the SAME resolved element, and the same three degradations — an element with no
 *  `setPointerCapture`, a non-number `pointerId` and a throw from either are the DECLARED no-op, so the layout-less shim
 *  (the whole node suite's realm, `D-27`) behaves as it did before the line and every row that drives this wiring stays
 *  green. **WHAT IT BUYS HERE IS EXACTLY WHAT IT BOUGHT THE STRIPS**: a grip is `14px` square, the preview changes the
 *  screen under the pointer, and the four drop targets only exist while the drag does — so without the capture the first
 *  move that re-lays anything would take the pointer off the grip, the release would miss, and the session's slot would
 *  latch (`D-245` measured that latch silencing five other handles for the page's life; this turn has no session slot to
 *  latch, but it has the same lost release, which is the same defect with one fewer casualty).
 *  **THE PRESS ALSO REVEALS THE DROPS, AND THAT IS STILL NO STATE** (`D-248`): a `pointerdown` on a `tabindex="0"` node
 *  focuses it in this realm and the page sheet's `:focus-within` rule is what shows the four overlays — the menus'
 *  mechanism, *"NO STATE, NO TOGGLE AND NO NEW RECORD"*. The drag adds no class, no attribute and no member.
 *  **THE ARMING DISTANCE KEEPS A CLICK A CLICK** (`PANE_MOVE_ARM_DISTANCE`): the grip's own box stands inside one of its
 *  own overlays (the menus pane is in the `top` zone), so a press-and-release in place would otherwise commit the zone the
 *  grip happens to sit in — which is not a gesture a person performed.
 *  **THE RELEASE COMMITS EXACTLY THE ACT `D-248` MEASURED** — `paneMoveAct(runtime, <the drop's node id>)`, one whole-pane
 *  write at `['panes', <id>]` at `file`, both figures kept and `bounds` dropped, never through `commitPane` — and the two
 *  operands are read OFF THE DROP NODE by that act, so the drag supplies a node id and invents no value. **A RELEASE OVER
 *  NO ZONE WRITES NOTHING AT ALL**: the preview is cleared and the gesture ends where it began — the four overlays stay
 *  revealed because the grip still holds focus, which is the same screen a plain press on the grip leaves, so nothing
 *  pretends a placement happened. **A COMMITTED RELEASE BLURS THE GRIP**, which is how the reveal collapses behind the
 *  act: the preview's own `style` declarations are gone either way, and the overlays are the sheet's to hide.
 *  **IT WRITES NO RECORD ON ANY MOVE**: the only crossing in this function is the release's, through the act. */
function installPaneMoveDrag (runtime: Runtime, grip: PaneMoveNodeRef, targets: readonly PaneMoveDropTarget[]): boolean {
  let element: unknown = null
  try {
    element = runtime.elementForNodeId(grip.nodeId)
  } catch {
    element = null
  }
  const listen = (holder: unknown, type: string, handler: (event: unknown) => void): void => {
    const add = (holder as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
    if (typeof add !== 'function') return
    ;(add as (type: string, handler: (event: unknown) => void) => void).call(holder, type, handler)
  }
  const byElement = new Map<unknown, PaneMoveDropTarget>()
  for (const target of targets) if (target.element !== null && target.element !== undefined) byElement.set(target.element, target)
  /** **THE GESTURE'S ONE STATE — A CLOSURE PER GRIP, so a second grip's drag can neither read nor overwrite the first's.**
   *  It holds no record, no node and no figure: `pressed` is the pointer's, `armed` is the arming distance's, `press` is
   *  the coordinate the distance is measured from, and the last two are the PREVIEW's own subjects. */
  const state: {
    pressed: boolean
    armed: boolean
    press: { readonly x: number; readonly y: number } | null
    drop: PaneMoveDropTarget | null
    zone: unknown
  } = { pressed: false, armed: false, press: null, drop: null, zone: null }
  /** **THE PREVIEW'S ONE TRANSITION** — the target under the pointer, or `null` for none. It clears the two transient
   *  writes of the target it is leaving and writes the two of the target it enters, so the screen always carries exactly
   *  the placement the drag would commit, and the SAME call with `null` is the release's clear. **THE ZONE'S ID IS READ OFF
   *  THE DROP NODE ON EVERY TRANSITION** (`D-129`'s ask-don't-remember: the value comes from the authored `props.zone`,
   *  never from a table this closure keeps) and resolved through the graph (`elementForNodeId`, the same read
   *  `zonePreviewOf` takes). **AND AN UNCHANGED TARGET IS RE-STATED RATHER THAN SKIPPED**: a delivery would replace a
   *  zone's `css.style` WHOLE (`D-234`) and silently take the outline with it, so a re-write of the same two declarations
   *  is what keeps the preview from vanishing under a pointer that has not moved — it is idempotent and costs two property
   *  writes per move. No delivery runs mid-gesture, which is `D-246`'s measurement and not this turn's assumption. */
  const highlight = (target: PaneMoveDropTarget | null): void => {
    if (state.drop === target) {
      if (target === null) return
      paneMoveDropEmphasis(target.element, true)
      paneMovePreviewWrite(target.element, 'drop')
      if (state.zone !== null) paneMovePreviewWrite(state.zone, 'zone')
      return
    }
    if (state.drop !== null) {
      paneMovePreviewClear(state.drop.element, 'drop')
      paneMoveDropEmphasis(state.drop.element, false)
    }
    if (state.zone !== null) paneMovePreviewClear(state.zone, 'zone')
    state.drop = target
    state.zone = null
    if (target === null) return
    paneMoveDropEmphasis(target.element, true)
    paneMovePreviewWrite(target.element, 'drop')
    const authored = authoredPropOf(runtime, target.nodeId, 'zone')
    if (!authored.readable || typeof authored.held !== 'string' || authored.held === '') return
    let zoneElement: unknown = null
    try {
      zoneElement = runtime.elementForNodeId(authored.held)
    } catch {
      zoneElement = null
    }
    if (zoneElement === null || zoneElement === undefined) return
    state.zone = zoneElement
    paneMovePreviewWrite(zoneElement, 'zone')
  }
  /** **`D-245`'S FIX, MIRRORED** — the press pins the pointer to this grip for the whole gesture, and every degradation is
   *  the declared no-op. */
  const captureOnGripPress = (event: unknown): void => {
    let pointerId: unknown
    try {
      pointerId = (event as { readonly pointerId?: unknown } | null | undefined)?.pointerId
    } catch {
      return
    }
    if (typeof pointerId !== 'number') return
    let capture: unknown
    try {
      capture = (element as { readonly setPointerCapture?: unknown })['setPointerCapture']
    } catch {
      return
    }
    if (typeof capture !== 'function') return
    try {
      ;(capture as (id: number) => void).call(element, pointerId)
    } catch {
      // a realm that refuses the capture is the degradation above: the gesture is unchanged, and so is every later turn
    }
  }
  /** **THE REVEAL'S COLLAPSE AFTER A COMMIT** — `:focus-within` is what shows the four overlays, so the focus is what ends
   *  it. Total: a realm with no `blur` (the shim) is the same no-op the capture's absence is. */
  const blurGrip = (): void => {
    let blur: unknown
    try {
      blur = (element as { readonly blur?: unknown })['blur']
    } catch {
      return
    }
    if (typeof blur !== 'function') return
    try {
      ;(blur as () => void).call(element)
    } catch {
      // a grip this realm will not blur keeps its reveal; the preview and the record are already settled
    }
  }
  /** **THE FOUR BOXES, WRITTEN AT THE PRESS FROM THE RECORD'S OWN ZONE FIGURES** — this grip's four drops and no other
   *  grip's, each composed by `paneMoveDropBoxOf` against the figures asked ONCE (`paneMoveZoneFigures`). **IT IS THE
   *  PRESS'S AND NOT THE BOOT'S**: the boxes tile the window's edges and lanes, so a drop given a box outside a gesture
   *  would be an invisible full-window hit-catcher over the app; written here and cleared on the end, the four exist while
   *  the pointer does and no longer. A drop whose zone states no figure takes no box (`paneMoveDropBoxOf`'s `null`) and is
   *  therefore unreachable — the honest arm, and never an invented window (`D-174`). */
  const boxDrops = (): void => {
    const figures = paneMoveZoneFigures()
    for (const target of targets) {
      const authored = authoredPropOf(runtime, target.nodeId, 'zone')
      const zone = authored.readable && typeof authored.held === 'string' ? authored.held : ''
      paneMoveDropBoxWrite(target.element, zone, figures)
    }
  }
  /** **AND THE SAME FOUR CLEARED ON EVERY END** — by property NAME, so the authored style (fixed, a pointer cursor and
   *  `opacity: 0`) is what stands again and nothing of the gesture is remembered. */
  const unboxDrops = (): void => {
    for (const target of targets) paneMoveDropBoxClear(target.element)
  }
  const onPress = (event: unknown): void => {
    captureOnGripPress(event)
    state.pressed = true
    state.armed = false
    state.press = paneMovePointOf(event)
    // A NEW GESTURE CLAIMS NO PLACEMENT: whatever the last one left is cleared before this one draws its own.
    highlight(null)
    boxDrops()
  }
  /** **THE ARMING GATE** — a measurable pointer arms past `PANE_MOVE_ARM_DISTANCE`; a pointer this realm cannot measure
   *  arms on the first move it hears, because a move is still a move. */
  const travelArmed = (event: unknown): boolean => {
    if (state.armed) return true
    const point = paneMovePointOf(event)
    if (point === null || state.press === null) {
      state.armed = true
      return true
    }
    const dx = point.x - state.press.x
    const dy = point.y - state.press.y
    if (dx * dx + dy * dy >= PANE_MOVE_ARM_DISTANCE * PANE_MOVE_ARM_DISTANCE) state.armed = true
    return state.armed
  }
  const onMove = (event: unknown): void => {
    if (!state.pressed) return
    if (!travelArmed(event)) return
    highlight(paneMoveDropUnderPointer(event, byElement))
  }
  /** **THE RELEASE — THE GESTURE'S ONE CROSSING.** The preview is cleared first and unconditionally, so no arm can leave a
   *  transient standing; then a resolved drop commits the act and collapses the reveal; then nothing else happens. */
  const onEnd = (event: unknown): void => {
    if (!state.pressed) return
    const target = state.armed ? paneMoveDropUnderPointer(event, byElement) : null
    state.pressed = false
    state.armed = false
    state.press = null
    highlight(null)
    unboxDrops()
    if (target === null) return
    void paneMoveAct(runtime, target.nodeId)
    blurGrip()
  }
  const onCancel = (): void => {
    state.pressed = false
    state.armed = false
    state.press = null
    highlight(null)
    unboxDrops()
  }
  // THE PRESS IS THE GRIP'S ALONE: only a gesture that started on the grip can end in a commit, which is what keeps a
  // press on a revealed overlay the CLICK arm's (`attachPaneMove`) and never this one's.
  listen(element, POINTER_TYPES.start, onPress)
  listen(element, POINTER_TYPES.move, onMove)
  listen(element, POINTER_TYPES.end, onEnd)
  listen(element, POINTER_TYPES.cancel, onCancel)
  // AND THE FOUR DROPS CARRY THE SAME THREE TURNS: in a realm WITH capture these never fire (the pointer is retargeted to
  // the grip) and in a realm without one they are the gesture's only arm — which is exactly the realm a row drives, where
  // the release is dispatched AT the drop it means.
  for (const target of targets) {
    listen(target.element, POINTER_TYPES.move, onMove)
    listen(target.element, POINTER_TYPES.end, onEnd)
    listen(target.element, POINTER_TYPES.cancel, onCancel)
  }
  return typeof (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener === 'function'
}

/** **TURN 6 — `main()`'S ONE BOOT REGISTRATION FOR THE RELOCATION**, taken beside `startAddTab`'s and for its reason: the
 *  grips and their drops are AUTHORED, so they exist as soon as the first envelope loaded and nothing mints,
 *  subscribes or re-attaches. **IT SENDS NO ROUTE AND WRITES NO RECORD**: the act is a press's, so a boot that is never
 *  pressed writes no byte of the pane record and cannot delay or fail `tests/e2e/bundle-boot-seam`'s `B-5` (the
 *  install writes one `handlers` layer per drop — graph bytes with no crossing behind them). **ALL FIVE READINGS ARE
 *  RETURNED**, so the boot's one site can say out loud that a drop is missing, took no body or took no listener, that a
 *  GRIP is missing, or that a grip's drag took no listeners (`D-117`). **THE DRAG IS INSTALLED ON THE GRIP'S OWN ELEMENT
 *  AND TAKES ITS OWN FOUR DROPS** — paired by the envelope's `<grip>-<zone>` spelling, both ends of which stand in this
 *  file as literals (`PANE_MOVE_GRIP_IDS`, `PANE_MOVE_DROP_IDS`), so a grip whose drops did not resolve installs a drag
 *  with no target rather than a target belonging to the other pane. */
function startPaneMove(runtime: Runtime): {
  readonly grips: number
  readonly captured: number
  readonly drops: number
  readonly installed: number
  readonly attached: number
} {
  const census = paneMoveCensusOf(runtime)
  let installed = 0
  let attached = 0
  const targets: PaneMoveDropTarget[] = []
  for (const drop of census.drops) {
    if (installPaneMoveHandler(runtime, drop.nodeId)) installed += 1
    const element = attachPaneMove(runtime, drop.nodeId)
    if (element === null) continue
    attached += 1
    targets.push({ id: drop.id, nodeId: drop.nodeId, element })
  }
  let captured = 0
  for (const grip of census.grips) {
    const own = targets.filter((target) => target.id.startsWith(`${grip.id}-`))
    if (installPaneMoveDrag(runtime, grip, own)) captured += 1
  }
  return { grips: census.grips.length, captured, drops: census.drops.length, installed, attached }
}

/** **THE DELIVERY'S TURN — HOLD THE READING AND DRIVE THE PAGES FROM IT** (`D-92`). A delivery is a RE-READ (L2 §6: the
 *  push carries an address and not a value), so the client has already re-read when this runs; what is left is to hold
 *  the answer and to let the record drive the two authored terminals. **THE HELD READING IS THE DRIVE'S INPUT**
 *  (`D-117`): the pages are driven FROM `tabsClientReading`, so the binding has a reader here rather than being a copy of
 *  the argument that shadowed it, and nothing else in this file writes either one. */
function holdTabsReading(reading: TabsClientReading, runtime: Runtime | null): void {
  tabsClientReading = reading
  // **NO REPAIR RUNS HERE ANY MORE, AND THAT IS THE `D-241` HEADSTONE ABOVE** (`repairUnpagedTarget` wrote a row's `target`
  // and made two rows one seat). A delivery is a RE-READ and this body makes of it two things only: the rows' mint, and the
  // two authored terminals' drive — **and the fresh tab's landing content is the WITNESS's answer, not a record write**
  // (`deriveTabsWitness`'s marker arm), so nothing here writes a byte of the record on a delivery at all.
  // **AND THE MINT — WITH ITS ATTACH — IS MADE FROM THE SAME HELD READING** (`S-4`/`S-5`, `D-179`, `D-201`): one `rows-mint`
  // per delivery, in the one body that already holds it, followed by one `click` listener per row that mint answered. It
  // writes no page, resolves nothing through a map and holds no record: a delivery that is not `'committed'` mints nothing
  // and attaches nothing (that gate is the turn's own). **THE RUNTIME IS THE WIDER `Runtime` HERE AND NOT `TabsPageRuntime`**:
  // the attach reads each row's own `props.target` through `authoredPropOf`'s `nodeState`, which that narrowed surface does
  // not carry (`docs/L3/renderer-wiring/design.md` §1).
  // **AND THE MINT NOW RUNS FIRST — BEFORE THE PAGES' DRIVE, WHERE IT USED TO RUN AFTER IT** (`D-208`'s `AL-5` red, whose
  // stated cause the measurement below does not confirm). **WHAT MOVED IS THE ORDER AND NOTHING ELSE**: the same two calls,
  // on the same held reading, from the same body — the datum, the attach, the `'committed'` gate and the terminals' two
  // writes are what they were.
  // **AND THE ORDER WAS MEASURED BOTH WAYS IN A REAL RENDERER, WHICH IS WHY IT IS RECORDED RATHER THAN CREDITED**: a
  // `css.style` write on either authored terminal, then a `rows-mint` — and the same mint, then the same write — leaves the
  // write standing at its value across every render that follows (a `state-slice` on `tabs-landing-page` read back
  // `display: none;` after two mints, and after a delivery's whole dirtied set). **SO THE MINT'S RENDER DISCARDS NOTHING**,
  // and this ordering changes no reading: the terminals' red was the WITNESS's, not this turn's — that seat's
  // `deriveTabsWitness` landing arm compared the active row's id against the reading's own `landing` member, which IS that
  // id (`src/main/tabs-record/index.ts`'s `TabsRecordReading.landing`), so a record showing the ERROR tab asked the landing
  // page to show; **THAT PREDICATE HAS SINCE MOVED TO THE ACTIVE ROW'S `target`** (`src/renderer/tabs-client.ts`), so the
  // record showing the ERROR tab now asks the landing page to HIDE. That arm is `tabs-client.ts`'s subject and not this file's.
  driveTabsRows(tabsClientReading, runtime)
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

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * TURN 3 — THE LAYOUT PAINT, THE DELIVERY'S FOURTH HAND-OUT (`S-6`; `D-185`, `D-187`, `D-189`, `D-191`, `D-194`;
 * `docs/L2/renderer-wiring/interface.md` §2 turn 3, `docs/L3/renderer-wiring/design.md` §1).
 *
 * **IT IS NOT `renderZone` RETURNING** (`D-168`, `D-185`): that turn took a `source.layout` member no source in this tree
 * carries and resolved a layout PROJECTION, while this one reads the view record and writes four authored nodes'
 * `css.style` through the runtime's one write surface — which is how `['zones']` gets its first reader since `D-169` with no
 * projection module pressed into service.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE FOUR AUTHORED ZONE NODES, THE ONE AXIS EACH ONE FIXES, AND THE AXIS EACH ONE SCROLLS ON** (`D-185`, `D-234`;
 *  L1 §3 `S-6(a)`): `top` and `bottom` fix the HEIGHT, `left` and `right` the WIDTH, and the figure for every one of them
 *  is `['zones', <id>, 'size']`.
 *  **THE FOUR IDS ARE SPELLED HERE BECAUSE THE ENVELOPE SPELLS THEM**: `src/shared/demo-envelope.ts` authors the four zone
 *  nodes with these four LITERALS on `css.id` and `props.id` and publishes no constant for any of them — five more exports
 *  would move that module's surface past the `19` its map row counts (§9 there), so the literal is the one spelling both
 *  sides carry. **THE EQUALITY IS `AL-10`'s TO MEASURE AND NOTHING DERIVES IT** (`D-188` debt 2): an id here that the
 *  envelope does not author writes into nothing.
 *
 *  **THE `scroll` COLUMN EXISTS BECAUSE THE PAINT MUST CARRY THE SCROLL RATHER THAN DEPEND ON THE AUTHORED ONE** (`D-234`'s
 *  routed finding; the user's charter: *"zones top/bottom/left/right all scrolling internally and fixed"*). A zone scrolls
 *  on the axis its arrangement spans — `top`/`bottom` HORIZONTALLY, `left`/`right` VERTICALLY (`C-12`, `D-187`) — and **it
 *  is a LAYOUT CONSTANT of the design, not record data**: no `['zones', …]` member states it, exactly as none states which
 *  axis a zone fixes. **THE AUTHORED HALF CANNOT BE RELIED ON, AND THIS IS THE MEASURED REASON**: `paintStyle` hands the
 *  engine ONE `css.style` value in `replace` mode, so the authored `overflow-x`/`overflow-y` on those four nodes is GONE the
 *  moment the paint writes the size — the nodes read `height: 140px` and nothing else (`D-234`). **MERGING IS REFUSED HERE**
 *  for the same reason it is refused there: `paintStyle` replaces whole for EVERY painted node and `D-225`'s routed finding
 *  records that as its behaviour, so the writer that composes the zone's whole style string is the one place the constant
 *  can stand (`D-174`'s rule one level up: what this turn writes, this turn states). */
const LAYOUT_ZONE_AXES: readonly {
  readonly id: string
  readonly member: 'height' | 'width'
  readonly scroll: 'overflow-x' | 'overflow-y'
}[] = [
  { id: 'top', member: 'height', scroll: 'overflow-x' },
  { id: 'bottom', member: 'height', scroll: 'overflow-x' },
  { id: 'left', member: 'width', scroll: 'overflow-y' },
  { id: 'right', member: 'width', scroll: 'overflow-y' },
]

/** **THE PANE'S FILL IS A RELATION AND NEVER A FIGURE — `100%` ON THE AXIS THE PANE'S ZONE FIXES** (`D-187`'s invariant,
 *  which `demo-envelope.ts`'s `menusPaneStyle` states in the authored half: *"it FILLS the zone's height as a RELATION
 *  (`height: '100%'`, never a figure), it ADJUSTS its width, and it SCROLLS the axis it adjusts (`overflow-x`)"*).
 *  **IT IS THE SAME CLASS OF DECLARATION AS `LAYOUT_ZONE_AXES`' `scroll` COLUMN AND AS `PANE_NODE_IDS`** (`D-240`,
 *  `D-225`): a LAYOUT CONSTANT of the design, stated by NO record member, and it must stand wherever the whole style
 *  string is composed — because `paintStyle` hands the engine ONE `css.style` value in `replace` mode (`D-225`'s routed
 *  finding), so the authored fill dies at the same instant as the authored scroll. **THAT IS MEASURED, NOT SUPPOSED**:
 *  `#pane-menus` served `style="width: 100px;"` with its authored `height: 100%` and `overflow-x: auto` GONE, which is
 *  `D-234`'s zone collision one family over and the defect this declaration exists to end.
 *  **IT CARRIES NO NUMBER, AND THAT IS THE WHOLE OF IT**: a percentage is the cascade's own resolution of "the extent of
 *  the zone this pane stands in", so any px here would be a SECOND AUTHORITY beside `['zones', <zone>, 'size']` —
 *  `D-129`'s fault, and the one thing `DEFAULT_ZONE_SIZES` may be for a ZONE (its own figure, at its own address) and may
 *  never be for a PANE (a sibling family's figure). **`100%` IS ALSO WHY THE FILL CANNOT BE STALE**: the zone's figure
 *  changes, the pane's relation does not. */
const PANE_FILL = '100%'

/** **THE PANE'S FILL AXIS AND ITS SCROLL AXIS, READ OFF `LAYOUT_ZONE_AXES` RATHER THAN SPELLED A SECOND TIME** — the
 *  table one declaration above, whose four rows already answer exactly these two questions for the zone node (`D-240`,
 *  `D-234`). **A PANE FILLS THE AXIS ITS ZONE FIXES AND SCROLLS THE AXIS IT ADJUSTS**, so its fill axis IS that row's
 *  `member` and its scroll IS that row's `scroll` column: one table answers both nodes, and **A SECOND TABLE WOULD SPELL
 *  THE SAME FOUR FACTS TWICE WITH NO INSTRUMENT TO CATCH THEM DRIFTING** (`D-188` debt 2's rule, applied where it does
 *  not bite: `PANE_NODE_IDS`' equalities are two literals in two MODULES and cannot be derived, while these are one row of
 *  one table and can be). **THE MEMBER THE RECORD'S FIGURE GOES ON IS NOT ANSWERED HERE** — that is `paneAxisMembers`
 *  below, the complement of this fill, declared once at its own site and read by the same arm; two derivations of one axis
 *  pair would be the second authority this file refuses.
 *
 *  **WHAT THIS CANNOT ANSWER IS THE STAGE AND AN UNDECLARED ZONE, AND `null` IS THE STATED ABSENCE FOR BOTH** (`D-174`):
 *  a pane stating no `zone` stands in the STAGE, which the arrangement derives and which fixes no axis at all (`C-9`,
 *  `D-185`) — so there is no zone extent to fill and no zone axis to scroll on, and a fill would have to name an axis the
 *  design has not chosen — while an id the closed four do not name names no axis either (`D-129`), which is the same
 *  answer `paneAxisMembers` gives it. **AND A HOSTILE OR NON-STRING `zone` IS THE SAME ARM**: `find` over a DECLARED list
 *  compares, and a comparison against a non-string is a miss and never a coercion (`paneGeometryIn`'s `find`). */
function paneFillAxisOf(zone: unknown): { readonly fill: 'width' | 'height'; readonly scroll: 'overflow-x' | 'overflow-y' } | null {
  const held = LAYOUT_ZONE_AXES.find((entry) => entry.id === zone)
  return held === undefined ? null : { fill: held.member, scroll: held.scroll }
}

/** **THE PANE ↔ NODE MAP: WHICH AUTHORED NODE A RECORD'S PANE ID IS PAINTED ONTO** (`D-194`'s gap, `D-214`'s
 *  measurement, `D-224`'s limits; `docs/L3/renderer-wiring/design-pane-node-map.md` §2–§3). **IT EXISTS BECAUSE BOTH
 *  RE-NAMINGS ARE REFUSED, AND THAT IS THE WHOLE OF ITS REASON**: `src/shared/view-shape.ts:136-139` states the position
 *  verbatim — *"the store's family is keyed by the id the COMPOSITION addresses, and that is the rendering's business,
 *  not the address's"* — so `gutter-pane` stays the authored node's name (the envelope's own spelling, `D-41`) and `pane-a`
 *  stays the record's key (`['panes']` is addressed by `commitPane`/`commitDrag` and repaired by `panesMustStand`, `D-138`,
 *  `D-191`). **THE TWO NAMES DIFFER BY DESIGN, SO THE CORRESPONDENCE IS A THIRD THING AND IT STANDS HERE**, in the one
 *  layer that holds both vocabularies.
 *
 *  **THE NODE SIDE IS A LITERAL AND THE RECORD SIDE IS IMPORTED**, which is `LAYOUT_ZONE_AXES`' own precedent one
 *  declaration above: `src/shared/demo-envelope.ts` authors `#gutter-pane` (`:960-961`) and `#pane-menus` (`:723-724`) as
 *  raw literals and publishes no constant for either (§2 (c)), so the literal is the one spelling both sides carry, while
 *  the record's ids come from `view-shape.ts` where they are declared.
 *
 *  **TWO ENTRIES, AND BOTH ARE EXPLICIT EVEN WHERE THE IDS ALREADY MATCH**: `pane-menus`' node id happens to equal its
 *  record key `today`, and that is a MEASUREMENT and never a law — two literals in two modules, each with its own reason
 *  (`D-41`) — so the equality is DECLARED here and measured by `AL-10` rather than derived by anything (`D-188` debt 2).
 *  A map carrying only `pane-a` would leave the menus pane's paint standing on a silent identity rule, which is the state
 *  this declaration exists to delete. **THE LIST MUST BE TOTAL OVER `DECLARED_PANE_IDS`** (`view-shape.ts:165`); a third
 *  declared pane would write nothing and be reported `absent`. */
const PANE_NODE_IDS: readonly { readonly paneId: string; readonly nodeId: string }[] = [
  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' }, // the STAGE pane: the record's id is the COMPOSITION's, the node's the ENVELOPE's (`D-138`)
  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' }, // measured EQUAL today and DECLARED regardless — an equality nothing derives
]

/** **THE MAP CONSULTED, AND ITS MISSING ARM IS `null` AND NEVER THE PANE ID** (§3; `D-174`'s standard applied to a lookup).
 *  **A DECLARED ABSENCE CANNOT BE WRONG, WHERE AN IDENTITY FALLBACK IS RIGHT ONCE AND WRONG AFTER**: `?? paneId` would
 *  make `pane-menus` work by coincidence and would hand every undeclared pane id a live route to any element that merely
 *  shares its name — the confusion `view-shape.ts:137-138` refuses. **A `find` OVER A DECLARED LIST AND NOT AN INDEX
 *  SIGNATURE**: `tsconfig.json` carries `strict` but not `noUncheckedIndexedAccess`, so a `Record<string, string>` would
 *  type the lookup `string` and lie at runtime about a missing key (`paneGeometryIn`'s own `find`, `view-shape.ts:264`). */
function nodeIdForPane(paneId: string): string | null {
  const held = PANE_NODE_IDS.find((entry) => entry.paneId === paneId)
  return held === undefined ? null : held.nodeId
}

/** **THE PANE'S TWO AXIS MEMBERS, AND THE PANE'S `zone` IS WHAT SELECTS WHICH ONE IT PAINTS** (`D-186`'s axis rule as
 *  `D-189`/`D-191` settled it; `D-194`); in `top`/`bottom` the zone fixes the height, so the pane's own member is its
 *  **`width`**; in `left`/`right` the zone fixes the width, so the pane's own member is its **`height`**; and **with no
 *  `zone` the pane stands in the STAGE** (`C-9`'s absence rule), which is derived and fixes no axis at all, so **both**
 *  members are the pane's own — a stage pane behaving as a sidebar pane, and nothing overriding either figure.
 *  **THE MEMBER THIS RETURNS NOTHING FOR IS MEMORY AND NOT A SECOND AUTHORITY**: it stays stored, it is never written here,
 *  and it is read again the moment the pane's `zone` changes (`D-189`). **A `zone` that is none of the four names no axis**,
 *  and that answers `[]`: an axis no zone of the closed four declares is not a figure this turn may write (`D-129` — absent
 *  is lawful, an invented axis is not). */
function paneAxisMembers(zone: unknown): readonly ('width' | 'height')[] {
  if (zone === undefined) return ['width', 'height']
  if (zone === 'top' || zone === 'bottom') return ['width']
  if (zone === 'left' || zone === 'right') return ['height']
  return []
}

/** **THE PANE'S PLACE IN THE TREE IS THE RECORD'S `zone`, AND THE DELIVERY IS WHAT PUTS IT THERE** (`D-252`, overturning
 *  the *"the record relocates and the rendered region does not"* limit `D-248` took from `D-182`, on the user's ruling
 *  that the behaviour is a defect and not a design: *"Dragging the pane should cause a save to the storeroom, which
 *  triggers a listener that regenerates the zone's section of the tree."*).
 *
 *  **THE ACT AND THE DELIVERY WERE ALREADY RIGHT AND ONLY THE PAINT WAS MISSING.** The whole-pane write at
 *  `['panes', <id>]` is `D-248`'s and unmoved; the delivery that carries it is `startViewShape`'s; and the paint read the
 *  record's `zone` on every delivery (`D-243`) — it just stopped at the pane's `css.style`, so the pane changed AXIS inside
 *  the box it was authored in. **WHAT THIS ADDS IS THE ONE THING A `css` WRITE CANNOT SAY: WHO THE PANE'S PARENT IS.**
 *
 *  **IT IS THE ENGINE'S OWN `move` OP AND NOTHING INVENTED HERE.** `types.d.ts` declares it —
 *  `MoveOp { kind:'move'; node: Node; to: { parent: Node; priority?: number } }` — and `supervisor.js` executes it as a
 *  safe per-node `detachNodeSafe` followed by `addAnchor('child', …, toParent.familyLinkFor())`, journaled `applied` with
 *  `dirtied: [node.id]`. So a re-parent is EXPRESSIBLE, the destination is a real zone node, and nothing is minted, cloned
 *  or re-authored: **no authored node is added and the census does not move** — the pane keeps its id, its children, its
 *  handlers and its place in the graph, and only its family edge changes. **A `rows-mint` COULD NOT HAVE DONE THIS**: it
 *  mints NEW nodes from a prototype (`ops.d.ts`'s `rowsMint`), the authored children inside the pane are not that
 *  prototype, and a minted copy would be a second pane with a fresh id — a new node in the census and an authored one left
 *  behind. `D-182`'s measurement that a keyed re-mint answers `minted: []` is about REUSING ids across a replace and blocks
 *  nothing here: no mint is issued.
 *
 *  **"REGENERATES THE ZONE'S SECTION" IS EXACTLY WHAT A MOVE CAUSES, WITH NO NEW MACHINERY.** The op dirties the moved
 *  node, `Runtime.applyCommand` recompiles it with its focused slice (the node, its ancestor chain and its subtree, so the
 *  pane's children are recompiled with the new path), and the render diff emits the appends that put the pane's element
 *  under the destination and take it out of the origin — so the OLD ZONE NO LONGER HOLDS IT, which is the half a style
 *  write could never reach.
 *
 *  **AND NOTHING IS CACHED, SO IT IS REVERSIBLE BY THE SAME TURN** (`D-248`'s whole-pane shape): the destination is read
 *  from the record on EVERY delivery, so the delivery that says `top` again moves the pane back — no memory of where it
 *  came from, no previous-zone member, no undo. **A COLD PROFILE NEEDS NO SECOND PATH EITHER**: the boot's own delivery
 *  runs this turn, so a record whose `zone` is `left` puts the pane in `left` on the first delivery of a fresh boot,
 *  where the pane was authored in `top`.
 *
 *  **THE ALREADY-THERE ARM IS A READ OF THE TREE AND NOT OF A REMEMBERED FIGURE**: `paneStandsIn` compares the pane's
 *  rendered element with the zone's, so an unchanged record costs no journal entry, no recompile and no DOM churn — the
 *  same discipline `diffMinimal` keeps for an unchanged child order. **ITS ANSWER IS `false` WHERE EITHER ELEMENT DOES NOT
 *  RESOLVE**, which issues the move rather than assuming it landed: an unresolvable tree is not a tree that agrees.
 *
 *  **THE ABSENT ARM IS THE LAYOUT'S OWN, ONE FAMILY OVER** (`D-183`, `C-9`, `D-174`): a pane with no `zone` stands in the
 *  STAGE, and the stage is not one of the four — so its record names NO destination, this turn moves it NOTHING, and it
 *  stays where the envelope authored it. **THAT IS THE ONE PLACE THIS TURN CANNOT UNDO A RELOCATION**: the four drops name
 *  four zones and none names the stage, so `pane-a` reaches `left` and only a record naming `top`/`bottom`/`left`/`right`
 *  can move it again. Stated here rather than discovered, and it is the record's shape and not this turn's. */
function relocatePaneInZone(runtime: TabsPageRuntime, nodeId: string, zone: unknown): void {
  // THE DESTINATION IS DECLARED OR THERE IS NONE — the four zone ids, which are also the four authored NODE ids the paint
  // addresses (`LAYOUT_ZONE_AXES`), and `undefined` for an absent or undeclared `zone`: the two arms `paneFillAxisOf`
  // answers `null` for, read here from the SAME table rather than from a second list of the same four names.
  const destination = LAYOUT_ZONE_AXES.find((entry) => entry.id === zone)
  if (destination === undefined) return
  if (paneStandsIn(runtime, nodeId, destination.id)) return
  // ONE COMMAND, THE SAME SURFACE EVERY OTHER WRITE IN THIS FILE USES, and a refusal REPORTED rather than swallowed — the
  // paint's own rule two functions up. **NOTHING ESCAPES THE DELIVERY**: a hostile runtime is a reading this turn leaves
  // standing, and the next delivery asks again because nothing here remembered this one.
  try {
    const answer = runtime.applyCommand({ kind: 'move', node: nodeId, to: { parent: destination.id } })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status !== 'applied') {
      console.error(`[provident-renderer] layout move: the pane ${nodeId} answered ${status} to its move into ${destination.id}`)
    }
  } catch (error) {
    console.error(`[provident-renderer] layout move: the pane ${nodeId}'s move into ${destination.id} threw — ${String(error)}`)
  }
}

/** **IS THE PANE ALREADY THE ZONE'S CHILD? — THE TREE'S ANSWER, COMPARED BY ELEMENT IDENTITY** (the already-there arm of
 *  `relocatePaneInZone` above; `D-252`). **A STORED "LAST ZONE" WOULD BE THE SECOND AUTHORITY `D-129` REFUSES**: it would
 *  be right until the first delivery it missed and then move the pane forever against the record. The two elements come
 *  from `Runtime.elementForNodeId`, the read the report beside this turn already uses, and the comparison is of the
 *  PLATFORM's objects — no id string is compared, so a zone whose `css.id` and `props.id` disagree cannot confuse it.
 *
 *  **A DIRECT CHILD AND NOT A DESCENDANT**, because that is the claim the record makes and the one `get_rendered_html`'s
 *  nesting is read to confirm: *"after a drag the pane is a child of the zone the record names"*. A wrapper inserted
 *  between the two would answer `false` and be moved to the zone itself — the honest reading of a record that names a zone.
 *
 *  **AND THE ANCESTOR MEMBER IS CENSUSED IN TWO SPELLINGS, WHICH IS THE ONE REALM DIFFERENCE THIS READ HAS TO CARRY**: the
 *  platform answers `parentElement` (`null` at a root) and the suite's DOM shim keeps the bookkeeping on `parent`; both are
 *  read, `parentElement` first, and an element answering neither is `null` — which `relocatePaneInZone` reads as "not
 *  there" and answers by issuing the move. */
function paneStandsIn(runtime: TabsPageRuntime, nodeId: string, zoneId: string): boolean {
  const pane = runtime.elementForNodeId(nodeId)
  if (pane === null || pane === undefined) return false
  const zone = runtime.elementForNodeId(zoneId)
  if (zone === null || zone === undefined) return false
  return ancestorElementOf(pane) === zone
}

/** The ONE member two realms spell differently — `parentElement` on the platform, `parent` in `shared/dom-shim.ts` — read
 *  in that order and answered as `null` where neither is a value. Nothing is coerced and nothing is descended. */
function ancestorElementOf(element: unknown): unknown {
  if (element === null || typeof element !== 'object') return null
  const holder = element as { readonly parentElement?: unknown; readonly parent?: unknown }
  if (holder.parentElement !== undefined) return holder.parentElement
  return holder.parent ?? null
}

/** **ONE `css.style` WRITE ON ONE AUTHORED NODE — THE FORM `drivePageDisplay` ALREADY USES** (`:250`): one `state-slice`
 *  whose single mutation replaces that key. **THE ENGINE COMPOSES `css` PER KEY, SO ONE `css.style` LAYER REPLACES THE
 *  STANDING STYLE OBJECT WHOLE** — which is why a zone's dimension and its `display` are composed into ONE record here and
 *  written once, never as two members (`D-194`: one style value, not two writes), and why the value handed over is the whole
 *  style this paint wants on that node. **THE COLLISION THAT LEAVES IS `app-envelope`'s AND IS ROUTED, NOT TAKEN** (design §6):
 *  a region's authored `overflow`/fill cannot stand BESIDE a painted dimension, so a region's static layout must move to a
 *  class or to a child this paint never writes.
 *
 *  **THE RECORD STAYS THE PARAMETER AND THE VALUE SLOT CARRIES CSS TEXT** (`D-203`): the callers compose the members, and
 *  what the engine is handed is `${property}: ${value}` joined by `'; '` — the spelling a real renderer APPLIES, where the
 *  object spelling answered `applied` and wrote an EMPTY attribute. **NOT ONE OPERAND MOVES**: the members composed above are
 *  still the zone's fixed axis, its `display` and the pane's adjustable axis. **NO KEY CONVERTER IS ADDED, because none is
 *  needed**: every property reaching here is `width`/`height`/`display` — single lowercase words, kebab-case already
 *  (`D-194`'s callers compose the keys; nothing camel-cases one on the way).
 *  It answers `true` only where the runtime said `applied`; every other arm — a refusal, a `'threw'`, a hostile runtime — is
 *  `false`, and the CALLER reports it in `D-117`'s register rather than letting a refusal read as a paint. */
function cssTextOf(style: Record<string, string>): string {
  return Object.entries(style)
    .map(([property, value]) => `${property}: ${value}`)
    .join('; ')
}

function paintStyle(runtime: TabsPageRuntime, nodeId: string, style: Record<string, string>): boolean {
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'css.style', mode: 'replace', value: cssTextOf(style) }],
    })
    return (typeof answer?.status === 'string' ? answer.status : 'no-answer') === 'applied'
  } catch {
    return false
  }
}

/** **TURN 3 — THE LAYOUT PAINT: THE DELIVERY'S FOURTH HAND-OUT** (`S-6`; `D-185`, `D-187`, `D-189`, `D-191`, `D-194`).
 *  Three `css.style` subjects and no fourth:
 *
 *   (a) **THE FOUR ZONES' FIXED DIMENSION AND THEIR SCROLL AXIS**, each figure read from `['zones', id, 'size']` through
 *       the client's own family — a **height** for `top`/`bottom`, a **width** for `left`/`right` — with the zone's
 *       participation (`display`) composed into the SAME style value. **THE SCROLL IS THE LAYOUT CONSTANT `LAYOUT_ZONE_AXES`
 *       STATES** (`D-234`'s routed finding): `top`/`bottom` carry `overflow-x: auto`, `left`/`right` `overflow-y: auto`, in
 *       the same value — because this write REPLACES `css.style` whole and the node's authored `overflow` dies with it.
 *       **A ZONE STATING NO `size` IS WRITTEN NOTHING**: no fallback, no default, no authored height, so such a zone renders
 *       on its authored `css` alone — its `overflow` INCLUDED, which is the one window in which that half still applies —
 *       until a writer speaks (`D-191`'s `OWED-4` answer, `D-174`).
 *   (b) **THE PANE'S THREE PARTS: THE FILL, THE RECORD'S FIGURE, AND THE SCROLL** — **the same shape the zone arm above
 *       composes**, for the same reason and in the same order (`D-187`'s invariant, `D-240`'s routed finding). **THE FILL
 *       IS THE LAYOUT CONSTANT `PANE_FILL`**, written on the axis the pane's `zone` FIXES — a `height` in `top`/`bottom`,
 *       a `width` in `left`/`right` — so a pane "fills its zone" as a RELATION and never as a figure. **THE FIGURE IS THE
 *       RECORD'S OWN**, written on the axis that zone makes ADJUSTABLE and only where the record STATES it; its other
 *       stored member is retained-but-unpainted and is never written, because at any instant exactly one figure is painted
 *       per axis and a leaf cannot reach a sibling (`D-189`/`D-191`). **THE SCROLL IS THE LAYOUT CONSTANT
 *       `LAYOUT_ZONE_AXES`' `scroll` COLUMN**, on the axis the pane adjusts (`top`/`bottom` `overflow-x`, `left`/`right`
 *       `overflow-y`) — because this write REPLACES `css.style` whole and the node's authored `overflow-x` dies with it.
 *       **A ZONE-RESIDENT PANE IS STILL A PANE WHERE ITS RECORD STATES NO FIGURE**: the fill and the scroll are written
 *       regardless, so such a pane reads `height: 100%; overflow-x: auto` and its ADJUSTABLE AXIS IS LEFT UNSET — no
 *       default is invented there, because the record is that axis's only authority (`D-129`, `D-233`'s own no-default
 *       rule one family over) and a declared figure would be right on one boot and false after the first gesture.
 *       **A STAGE PANE HAS NO ZONE, SO BOTH ITS MEMBERS ARE ITS OWN AND IT FILLS NOTHING** — `paneFillAxisOf` answers
 *       `null` for it, no fill and no scroll are written, and only the members the record states are (`C-9`, `D-185`).
 *       **AND A PANE'S RECORD ID IS NOT ITS NODE ID**: what is written goes to `nodeIdForPane(pane.id)`'s answer and never
 *       to the record's key, and a pane the map declares no entry for is written NOTHING — no resolution, no invented id —
 *       while the report states its absence at the record's key (§4, `D-194`).
 *   (c) **THE STAGE'S CONTENT**: the active tab's `target`, resolved to an authored node and driven through
 *       `drivePageDisplay`'s existing form (one `state-slice` per authored page, the member the landing/error witnesses
 *       already write). **THE STAGE'S OWN DIMENSIONS ARE DERIVED FROM THE REMAINDER AND ARE NEVER WRITTEN** (`D-185`): it
 *       carries no record, no member and no write, and this turn paints its CHILDREN and no dimension of it.
 *
 *  **NOTHING IS WRITTEN FROM A READING THAT IS NOT `committed`** — the gate `driveTabsLandingPage` keeps, for its own
 *  reason: `absent` and `unread` are not a record saying the regions carry no figure, and a fault delivers no correction
 *  (`D-127`).
 *
 *  **IT IS PRIVATE AND ANSWERS NOTHING**, the form `driveTabsRows` landed in (`D-201`): `signatures.md` §3 declares
 *  `{written: number}` and no caller reads such a count, so the count would be a name with no reader (`D-70`) — the refusals
 *  are REPORTED here instead, and the answer `AL-10` reads is the markup.
 *
 *  **AND ITS LAST ACT IS THE SELF-REPORT** (`D-203`'s missing instrument, `D-204`, `D-208`; design §4's `W1`–`W5`, `AL-12`):
 *  `reportMeasuredFigures(runtime)` below reads the COMPUTED figure of each node these three loops just wrote and lands them
 *  in the authored carrier's `content` as `id.property=value` text. **THE CARRIER IS AN INSTRUMENT AND NEVER A REGION**: it
 *  is a fourth WRITE and not a fourth subject, and a realm that answers no `getComputedStyle` writes nothing to it at all.
 *  **NOT A FIFTH HAND-OUT AND NOT A FIFTH PARAMETER** (`D-45`): it stands inside this turn, on the deliveries this turn's
 *  own gate admits. */
function driveLayoutRegions(reading: ViewClientReading | null, runtime: TabsPageRuntime | null): void {
  if (runtime === null) return
  if (reading === null || reading.status !== 'committed') return
  // (a) THE FOUR ZONES' FIXED DIMENSION — ONE `css.style` VALUE PER NODE, ONE WRITE (`D-185`, `D-194`).
  for (const zone of LAYOUT_ZONE_AXES) {
    // THE CLIENT'S OWN DERIVATION, NOT A SECOND ONE: `zoneIn` answers `null` for an id the family does not declare and the
    // members it carries for one the record wrote — so a memberless zone states no `size`. **AND THE CREATION REPAIR NO
    // LONGER WRITES ONE** (`D-233`'s item (4)): `zones-must-stand` repairs every declared zone to its declared default
    // `size` (`shared/view-shape.ts`'s `DEFAULT_ZONE_SIZES`), so this `continue` is the arm an OUTSIDE writer's memberless
    // record meets and no longer the cold profile's.
    const held = zoneIn(reading.zones, zone.id)
    if (held === null || held.size === undefined) continue
    if (!Number.isFinite(held.size) || held.size < 0) continue
    // THE SIZE AND THE SCROLL AXIS, IN THE ONE VALUE THIS ARM HANDS `paintStyle` (`D-234`'s routed finding): the write is a
    // whole-key REPLACE, so the authored `overflow-x`/`overflow-y` on this node does not survive it and the zone's scroll —
    // the user's charter's *"all scrolling internally and fixed"*, `C-12` — must be restated by the one arm composing the
    // style. **THE AXIS IS THE TABLE'S AND NOT THE RECORD'S**: no `['zones', …]` member states it (see `LAYOUT_ZONE_AXES`),
    // and it is emitted BEFORE any `display`, so the string this paint writes reads `height: 140px; overflow-x: auto`.
    // **THE ZONE'S AUTHORED `css` STILL CARRIES IT** (`demo-envelope.ts`'s `horizontalZoneStyle`/`verticalZoneStyle`) and is
    // LEFT THERE: it is overwritten on every write this arm makes, and it is the only scroll a zone has while a size-less
    // record is written NOTHING (the `continue` above) — so it is neither a second authority nor dead prose.
    const style: Record<string, string> = { [zone.member]: `${String(held.size)}px`, [zone.scroll]: 'auto' }
    // THE PARTICIPATION COMPOSES INTO THAT SAME VALUE, and only where the record states one — an unstated `display` is not
    // authored here either.
    if (held.display !== undefined) style['display'] = held.display
    if (!paintStyle(runtime, zone.id, style)) {
      console.error(`[provident-renderer] layout paint: the ${zone.id} zone refused its ${zone.member}/${zone.scroll} (${String(held.size)})`)
    }
  }
  // (b) EVERY DECLARED PANE IN THREE PARTS — THE FILL, THE MEMBER ITS `zone` MAKES ADJUSTABLE, AND THE SCROLL — read
  // STRUCTURALLY, because the record's pane shape is `store-view-record`'s and this turn may not invent a member the
  // record does not carry. **THE TWO PARTS THAT ARE NOT THE RECORD'S ARE THE LAYOUT'S** (`PANE_FILL`, `paneFillAxisOf`),
  // and they are composed into the SAME value as the zone arm's above, because one `css.style` write replaces the
  // authored style whole (`D-240`).
  for (const pane of reading.panes) {
    // THE MAP IS CONSULTED BEFORE ANY RESOLUTION (`M2`, §4 `B1`): the record's id is not the node's id, and a pane the map
    // does not declare is written NOTHING — no lookup, no invented id — and the report states it (`W2`). **NOT A SILENT
    // SKIP**: this `continue` writes no DOM and the carrier prints `pane-x.<member>=absent` at the RECORD's own key.
    const nodeId = nodeIdForPane(pane.id)
    if (nodeId === null) continue
    const record = pane as unknown as Record<string, unknown>
    // ⟶ **THE PANE'S PLACE IN THE TREE, IN THE SAME TURN AND FROM THE SAME MEMBER** (`D-252`): the record's `zone` is
    //    not only which axis this pane fills and scrolls — it is **which zone holds it**, and this delivery is what puts
    //    it there. **IT STANDS AHEAD OF THE STYLE COMPOSITION ON PURPOSE**, so the `continue` below (a pane that fills
    //    nothing) cannot skip a relocation: that arm is the SAME absence — no destination named — and the two are read
    //    from one member by one declaration (`LAYOUT_ZONE_AXES`).
    relocatePaneInZone(runtime, nodeId, record['zone'])
    // THE PANE'S ZONE, ASKED ONCE: its fill axis and its scroll axis are the LAYOUT's (`PANE_FILL`, `paneFillAxisOf`),
    // and `null` is a stage-resident pane or an id the closed four do not name — the two arms that fill nothing.
    const placement = paneFillAxisOf(record['zone'])
    const style: Record<string, string> = {}
    // THE FILL FIRST — the zone's fixed axis, as a RELATION (`100%`) and never as a figure: the whole-key replace below
    // is why the authored `height: 100%` on `#pane-menus` cannot be relied on (`D-240`'s collision, `D-225`'s finding).
    if (placement !== null) style[placement.fill] = PANE_FILL
    // THEN THE RECORD'S FIGURE, on the one axis this pane's `zone` makes adjustable — and only where the record STATES it,
    // so an unstated adjustable axis stays UNSET rather than taking a default this turn would have to invent.
    for (const member of paneAxisMembers(record['zone'])) {
      const figure = record[member]
      if (typeof figure !== 'number' || !Number.isFinite(figure) || figure < 0) continue
      style[member] = `${String(figure)}px`
    }
    // AND THE SCROLL LAST, on the axis the pane adjusts (`D-234`'s column, the zone arm's own rule): the write replaces
    // `css.style` whole, so a pane's authored `overflow-x` does not survive it and the pane must restate it here — which is
    // what makes the eighteen items scroll rather than clip when the menus pane is dragged narrow.
    if (placement !== null) style[placement.scroll] = 'auto'
    // NOTHING STATED, NOTHING WRITTEN — the one rule that makes an unstated figure silent rather than defaulted. **IT IS
    // REACHED ONLY BY A PANE THAT FILLS NOTHING** (the stage pane with no stated member): a zone-resident pane is still a
    // pane and always carries its fill and its scroll, so this `continue` never withholds them (`D-187`, `D-189`).
    if (Object.keys(style).length === 0) continue
    if (!paintStyle(runtime, nodeId, style)) {
      console.error(`[provident-renderer] layout paint: the pane ${pane.id} (node ${nodeId}) refused its ${Object.keys(style).join('/')}`)
    }
  }
  // (c) THE STAGE'S CONTENT — THE ACTIVE TAB'S `target` THROUGH `drivePageDisplay`'s FORM, so a page's `display` keeps its ONE
  // author (`D-129`, `C-4`). The rows are the realm's HELD statement about the tab record: `holdTabsReading` writes that
  // binding and this turn reads it, so no second subscription, no second read route and no poll is added (`D-82` clause 4).
  // **AND THE GUARD IS A GUARD AND NOT AN EARLY RETURN** (`D-208`'s self-report, design §4 `W5`): the report below must be
  // this turn's LAST ACT on EVERY delivery the paint's own gate admits, so a delivery with no committed tab record skips
  // (c)'s writes and still measures. WHAT (c) WRITES, IN WHAT ORDER, ON WHICH DELIVERIES IS BYTE-UNCHANGED.
  const tabs = tabsClientReading
  if (tabs !== null && tabs.status === 'committed') {
    for (const row of tabs.rows) {
      if (row.target === '') continue
      // RESOLVED FIRST: an authored node is what a page's `display` can be written to at all, and a target naming none is
      // written NOTHING rather than refused — `driveTabsLandingPage`'s own resolution arm, one level down (`D-127`).
      let resolved: unknown = null
      try {
        resolved = runtime.elementForNodeId(row.target)
      } catch {
        resolved = null
      }
      if (resolved === null || resolved === undefined) continue
      const status = drivePageDisplay(runtime, row.target, row.active === true)
      if (status !== 'applied') {
        console.error(`[provident-renderer] layout paint: the page ${row.target} answered ${String(status)}`)
      }
    }
  }
  // THE SELF-REPORT IS THE LAST ACT, INSIDE THIS TURN AND ON THE SAME DELIVERIES (`W5`): no second subscription, no timer,
  // no poll, no retry (`D-82` clause 4).
  reportMeasuredFigures(runtime)
}

/** **TURN 3'S LAST ACT — THE SELF-REPORT: WHAT THE PAINT JUST APPLIED, MEASURED AND WRITTEN DOWN** (`D-203`'s missing
 *  instrument, `D-204`, `D-208`; design §4's `W1`–`W5`, §1 turn 3; `AL-12`). **IT IS NOT A FIFTH HAND-OUT**: it stands
 *  INSIDE `driveLayoutRegions`, so `startViewShape` keeps FOUR parameters and `T-5`'s edge is untouched (`D-45`).
 *
 *  **WHY IT EXISTS AT ALL**: `AL-10` reads the MARKUP — a `css.style` write carrying CSS TEXT is in the rendered HTML — and
 *  **no markup read can say whether the browser APPLIED it**. This relation reads the CASCADE instead and puts the answer
 *  where a battery can read it as markup: the carrier's `content` (`LAYOUT_MEASURED_ID`). **THE WRITE AND THE READ ARE
 *  DIFFERENT MECHANISMS, WHICH IS WHY MEASURING ONE'S OWN OUTPUT IS NOT CIRCULAR**: the write is a graph `state-slice` the
 *  engine bakes into a declaration, the read is the browser resolving that declaration — and the cascade answers the FILL
 *  when the declaration never landed, which is `D-203`'s own measurement (`484px` over a record's `40`).
 *
 *  **`W1` — THE REALM'S `getComputedStyle` IS CENSUSED FIRST, AND A REALM THAT DOES NOT ANSWER A FUNCTION RETURNS, HAVING
 *  WRITTEN NOTHING AND THROWN NOTHING.** That realm is the DOM SHIM'S, which is the whole unit suite's: the carrier then
 *  stays EMPTY, which is `D-174`'s one state that is never wrong — a placeholder, a default or "the figure it meant to
 *  write" would be right once and false after. **ABSENCE IS THE READABLE STATE**: a realm that HAS the function and an
 *  EMPTY carrier is a RED row's job (`AL-12`), so this arm is a STATED degradation and no fallback stands in it.
 *
 *  **`W2`–`W3` — THE SUBJECTS ARE THE PAINT'S OWN THREE LOOPS AND NOTHING ELSE**, so the report cannot measure a node the
 *  paint did not write: the four zones `LAYOUT_ZONE_AXES` names (each only where the record states the `size` the paint
 *  required), every pane `reading.panes` declares (only the members its `zone` makes adjustable AND the record states) and
 *  every `row.target` `(c)` resolved — the landing terminal among them. Each one resolves through
 *  `runtime.elementForNodeId`, and a throw or an absent node is the figure `absent`, STATED and never silently skipped
 *  (`D-127`'s arm one level down); the figure itself is `styleOf(element).getPropertyValue(property)` — **THE CASCADE'S
 *  ANSWER, NEVER THE ATTRIBUTE'S TEXT**, because the `style` attribute is the layer's own serialisation and the very text
 *  `D-203` measured EMPTY under an `applied` answer. **A PANE RESOLVES THROUGH `nodeIdForPane`, THE SAME MAP THE PAINT
 *  USED**, so a pane the map declares no entry for is a subject whose node id is `null`: it prints at its RECORD's key as
 *  `absent` with `elementForNodeId` NEVER CALLED, so the absence is a DECLARED READING and not a lookup that missed.
 *  **THE CARRIER'S PRINTED KEY IS THE PAINT'S SUBJECT KEY** — the record's pane id for the pane family, and the node's own
 *  id for the zones and the rows, where the two coincide, so their output does not move. **AND THE ONE LIMIT THAT SURVIVES
 *  IS THE MAP'S AND NOT THE INSTRUMENT'S** (`D-224`'s limit `(ii)`): the write and the report consult the SAME map, so a map
 *  entry naming another EXISTING node would put a figure on the wrong element and read it back — *which node* is the
 *  MARKUP's to measure (`AL-10`), and this report proves APPLICATION only.
 *
 *  **`W4`–`W5` — ONE `state-slice` `content` REPLACE, AS `id.property=value` TEXT**, a member a real renderer applies as
 *  written (`D-207`'s receipt is the same shape already measured); a status that is not `applied` is `console.error` and
 *  nothing throws. **THE REPORT RUNS AFTER EVERY REGION WRITE, INSIDE THE SAME TURN** — no second subscription, no timer, no
 *  poll, no retry (`D-82` clause 4) — and the reading it re-walks is the client's HELD one, the same adopted reading this
 *  turn was handed, so no route is asked a second time. **ITS OUTPUT IS BOUNDED-STALE BY ONE DELIVERY** (`D-117`): a figure
 *  is only true of ITS turn, so a row spends one more record write to force the turn it reads.
 *
 *  **AND THE ONE THING IT MUST NOT DO IS THE ONE THING THAT WOULD MAKE IT CHEAP**: it reads no `nodeState` copy of what the
 *  paint set, no `css.style` member and no `style` attribute — that is the same layer that wrote the figure, and reading it
 *  back would measure the write instead of the render (design §4, the named circular case). */
function reportMeasuredFigures(runtime: TabsPageRuntime): void {
  // W1 — THE REALM'S ONE MEMBER, CENSUSED FIRST AND READ STRUCTURALLY (the module's own idiom: a shim, an older realm and
  // a hostile global are one arm).
  const realm = typeof window === 'undefined' ? null : (window as unknown as { readonly getComputedStyle?: unknown })
  const styleOf = realm === null ? undefined : realm.getComputedStyle
  if (typeof styleOf !== 'function') return
  // THE PAINT'S OWN SUBJECTS, IN THE PAINT'S OWN ORDER: (a) the zones, (b) the panes, (c) the rows' targets. **EACH SUBJECT
  // CARRIES ITS PAINT'S KEY BESIDE THE NODE IT RESOLVES** (`M3`, `W2`): the key is what the carrier PRINTS — the RECORD's
  // id for a pane and the node's own id for a zone or a row, where the two coincide — and the node id is what the paint
  // wrote, `null` where the map declares no entry. A node-keyed carrier could not express a pane the rendering does not
  // display at all, which is why the record's key is the printed one (`D-204`, `D-127`).
  const subjects: { readonly key: string; readonly nodeId: string | null; readonly property: string }[] = []
  const reading = getViewClient().reading()
  if (reading !== null && reading.status === 'committed') {
    for (const zone of LAYOUT_ZONE_AXES) {
      // THE PAINT'S OWN GATE, RESTATED BESIDE ITS LOOP: a zone stating no `size` was written nothing, so it measured nothing.
      const held = zoneIn(reading.zones, zone.id)
      if (held === null || held.size === undefined) continue
      if (!Number.isFinite(held.size) || held.size < 0) continue
      subjects.push({ key: zone.id, nodeId: zone.id, property: zone.member })
    }
    for (const pane of reading.panes) {
      const record = pane as unknown as Record<string, unknown>
      for (const member of paneAxisMembers(record['zone'])) {
        // THE MEMBER IS A SUBJECT ONLY WHERE THE RECORD STATES THE FIGURE THE PAINT WROTE (the same three tests).
        const figure = record[member]
        if (typeof figure !== 'number' || !Number.isFinite(figure) || figure < 0) continue
        // THE PANE ARM RESOLVES THROUGH THE MAP THE PAINT USED — and a pane the map declares no entry for is a subject whose
        // node id is `null`, so the figure loop answers `absent` WITHOUT resolving anything (`W2`, §4).
        subjects.push({ key: pane.id, nodeId: nodeIdForPane(pane.id), property: member })
      }
    }
  }
  // (c) EVERY `row.target` THE PAINT RESOLVED — the landing terminal among them, and each tab's own page.
  const tabs = tabsClientReading
  if (tabs !== null && tabs.status === 'committed') {
    for (const row of tabs.rows) {
      if (row.target === '') continue
      subjects.push({ key: row.target, nodeId: row.target, property: 'display' })
    }
  }
  const figures: string[] = []
  for (const subject of subjects) {
    // W2 — RESOLVED THROUGH THE RUNTIME, AND AN ABSENT OR THROWING SUBJECT IS THE FIGURE `absent`. **A SUBJECT THE MAP
    // GIVES NO NODE ID IS `absent` BEFORE ANY RESOLUTION**: `elementForNodeId` is never called for it, so the absence is the
    // declared reading and never a lookup that happened to miss (`D-129`, `D-174`).
    let figure = 'absent'
    if (subject.nodeId !== null) {
      try {
        const element = runtime.elementForNodeId(subject.nodeId)
        if (element !== null && element !== undefined) {
          const style = (styleOf as (element: unknown) => unknown).call(realm, element)
          const read = (style as { readonly getPropertyValue?: unknown } | null | undefined)
          if (read !== null && read !== undefined && typeof read.getPropertyValue === 'function') {
            // W3 — THE CASCADE'S ANSWER. A NON-STRING IS `absent`; an EMPTY string is WRITTEN AS THE CASCADE GAVE IT, because
            // inventing a word for it would be the placeholder `D-174` deletes.
            const value = (read.getPropertyValue as (property: string) => unknown).call(style, subject.property)
            figure = typeof value === 'string' ? value : 'absent'
          }
        }
      } catch {
        figure = 'absent'
      }
    }
    figures.push(`${subject.key}.${subject.property}=${figure}`)
  }
  // NOTHING MEASURED, NOTHING WRITTEN — the same rule as every other arm of this file.
  if (figures.length === 0) return
  // W4/W5 — ONE WRITE, AS TEXT, AND EVERY NON-`applied` ANSWER REPORTED RATHER THAN SWALLOWED (`D-117`'s register).
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: LAYOUT_MEASURED_ID,
      mutation: [{ targetProp: 'content', mode: 'replace', value: figures.map((figure) => `${figure};`).join('') }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status !== 'applied') {
      console.error(`[provident-renderer] layout report: the measured carrier answered ${String(status)}`)
    }
  } catch (error) {
    // NOTHING ESCAPES THE DELIVERY: a hostile runtime is a reading this turn leaves standing.
    console.error(`[provident-renderer] layout report: the carrier write threw — ${String(error)}`)
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * TURN 4 — THE MENUS: A BOOT REGISTRATION AND NOT A DELIVERY (`S-11`; `D-181`, `D-196`; L1 `AL-6`/`AL-7`,
 * `docs/L2/renderer-wiring/interface.md` §2 turn 4, `docs/L3/renderer-wiring/design.md` §1 turn 4).
 *
 * **THE PANE IS AUTHORED, SO NOTHING MINTS IT.** The four menus and their eighteen items are STATIC nodes of the
 * envelope (`src/shared/demo-envelope.ts`), not rows a mint produces — so this turn is ONE registration at boot,
 * beside the affordance's attach, and never a per-delivery turn: there is no delivery to ride and no mint answer
 * that could name an item's node. That is the whole difference between this turn and turns 1–2.
 *
 * **ONE LISTENER PER AUTHORED ITEM, AND THE ROLE IS READ OFF THE NODE** (`D-129`, `D-194`'s form): the click turn
 * asks THAT node for its own `props.role` through `authoredPropOf` at CLICK time and hands it, unchanged, to
 * `window.provident.menu` — the ONE route `app-shell` landed (`D-181`, `D-196`: one channel, one preload member, one
 * `ipcMain.handle`). **NO ROLE NAME APPEARS IN THIS FILE**: not one of the eleven and not one of the seven is
 * spelled here, and no closure map from a node to a role stands in for the node's own prop — a captured role would
 * be the copy `D-129` forbids and would go stale the moment the envelope's authored text moved.
 *
 * **AND EVERY ITEM ALSO GAINS A WIRING-INSTALLED HANDLER BODY, WHICH IS THE AGENT'S ARM OF THE SAME ACT** (`D-209`,
 * discharging `D-208`'s `AL-7` red). The items are AUTHORED, so a body authored beside them would be a **STRING** —
 * adopted by `rows-mint`'s datum path and **never run** by `dispatchEvent` (which skips a non-function `body`) — and the
 * only way such a body could reach the route would be to name `window.provident` **inside the envelope**, which is exactly
 * the surface `D-209` refuses. **So the body is a CLOSURE this file installs as a `handlers` `state-slice`, per item**, and
 * the naming of `window.provident.menu` lives in this file's own `menuRoleRoute` — in the app's code, never in a body. The
 * engine merges a slice layer's handlers **append-with-override per `(name, event)`**, so on the eleven the installed
 * function **OVERRIDES** the authored no-op under the same key rather than standing beside a second `click` path, and on
 * the seven it is the item's **only** dispatch body. **A HUMAN CLICKS AND AN AGENT DISPATCHES, AND BOTH CALL ONE ACT**
 * (`menuRoleAct`): the DOM listener below is NOT replaced by the installed body, and a reader who finds two paths must not
 * read the newer one as having retired the older.
 *
 * **AND THE FOCUS RULE, WHICH IS A RULE AND NOT A NICETY** (`D-196`, and the reason it is written down): the edit
 * roles — `undo`, `redo`, `cut`, `copy`, `paste`, `delete`, `selectall` — are `webContents` operations that act on
 * the **FOCUSED ELEMENT**, and clicking an authored `<div>` moves focus ONTO that div first. A native menu never has
 * this problem because it lives OUTSIDE the document. **So a `mousedown` listener calls `preventDefault()`**, which
 * stops focus from moving while leaving the `click` to fire on mouseup — and only then does the role execute, against
 * the element the user was actually in. **WITHOUT THIS LISTENER SIX OF THE ELEVEN EXECUTE AGAINST A COPY OF NOTHING**:
 * the receipt would read `admitted` over an edit that reached no text. **IT IS A DOM LISTENER AND A DISPATCHED CLICK HAS
 * NO MOUSEDOWN**: an agent's `provident.dispatch` never moves the document's focus, so the focus rule is the HUMAN's half
 * of the arrangement and the dispatch arm needs no equivalent of it.
 *
 * **THE SEVEN ARE DATA AND THE GUARD IS `main`'s** (`D-181`, whose split is FIXED and is not adjusted here): the seven
 * items the ruling refuses AN AGENT are the seven the trusted-click path EXECUTES FOR A PERSON, so **they are STYLED
 * ENABLED** — the record marks none of them (`D-232`'s correction, the user's ruling *"un-grey them — they work for a
 * person, so show them enabled"*). **THE ELEVEN AND THE SEVEN TAKE THE SAME TWO `click` PATHS**: a DOM listener and the
 * wiring-installed body, and the refusal a machine reads is `src/main/main.ts`'s admitted set, tested there before any
 * other arm of `menuRoleAnswer` (an agent's `provident.dispatch` synthesises a click, so it reaches every installed body
 * this file writes, and only the main-process bound stops the seven however the click arrived — `D-196`). **AND A
 * `disabled` MARK IS NOW A VETO AT BOTH LAYERS**: this file's DOM listener refuses to call `menuRoleAct` for a marked
 * element (`disabledMarkOn`) and `src/main/preload.ts`'s witness refuses to record a gesture on one — so a mark is
 * either a real enforcement or nothing at all, never a grey that a person's click walks straight through.
 * **SO EVERY ITEM THE CENSUS ANSWERS** — **all eighteen**, not the eleven — is given the same body, and that body
 * **does not vet a role, read a
 * role list or refuse anything**; a refusal it receives is the route's answer, written to the carrier like any other. To
 * have installed on the eleven and SKIPPED the seven would be this file making the refusal decision a second time, in the
 * realm an agent's own `dispatch` runs in — the second authority `D-181` puts on `main` and the one `D-196` measured a
 * render-side guard cannot hold.
 *
 * **AND THE ANSWER LANDS IN THE ENVELOPE'S ONE RECEIPT CARRIER** (`MENUS_RECEIPT_ID`): the route's answer is written
 * as ONE `state-slice` `content` on that authored node — the write kind the corpus already uses for a STATUS node
 * (`renderPaneSize`'s on `#gutter-status`) and the kind the envelope's own note names for this carrier. **THE VALUE
 * IS TEXT AND NOT A `css.style`, SO `D-203` DOES NOT BITE HERE**: that row's rule is that a `css.style` write must
 * carry CSS TEXT rather than an object (the object spelling is a silent no-op in a real renderer), and this turn
 * writes `content` — a text member — which is applied as written on both realms. A realm that carries no `menu`
 * member, a route that rejects and a route that throws each answer a STATED receipt rather than a throw or a
 * silence, because a click that reached nothing is a reading and not an exception.
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE ENVELOPE'S ITEM TOKEN — ONE SPELLING, TWO AUTHORED USES, AND THE CENSUS CRITERION THIS TURN ADDS**
 *  (`D-181`, `D-126`'s discipline; `D-209`). The envelope authors `css: { classes: ['menu-item'] }` on **ALL EIGHTEEN**
 *  items and `handlers: [{ name: 'menu-item', event: 'click' }]` on the **ELEVEN** admitted ones — the same token in both
 *  places. **THIS FILE READS THE CLASS** as "which nodes are menu items", because that is the criterion the seven are
 *  absent from and must not be (the agent's arm belongs on all eighteen, `D-181`'s refusal being `main`'s), and **INSTALLS
 *  UNDER THE SAME NAME**, which is the `(name, event)` key the eleven's authored body already occupies — so the engine's
 *  append-with-override REPLACES that no-op with the function instead of leaving two `click` handlers on one item.
 *  **IT IS A TOKEN AND NOT A ROSTER**: no role is listed and no count is asserted; a node this criterion misses is a node
 *  no agent can dispatch at (`provident.list_targets` shows the same handler list to an agent, which is why the install is
 *  also visible there). */
const MENUS_ITEM_HANDLER = 'menu-item'

/** **THE AUTHORED CLASS TOKEN OF ONE NODE, AS THE GRAPH HOLDS IT** (`runtime.nodeState`'s `states[0].css`) — the read
 *  `authoredPropOf` makes for `props`, made for `css`. **BOTH SPELLINGS THE TREE CAN CARRY ARE ANSWERED**: the authored
 *  `classes` may reach the compiled state as the ARRAY the envelope writes or as the SPACE-JOINED string the adapters
 *  compose before emitting the attribute, and this relation accepts either rather than assuming one. TOTAL — a `''` id,
 *  an absent node, an answer with no `states`, a `css` that is not an object and a read that THROWS all answer NO CLASS. */
function authoredClassesOf(runtime: Runtime, nodeId: string): readonly string[] {
  if (nodeId === '') return []
  try {
    const answer = runtime.nodeState(nodeId) as { readonly states?: readonly unknown[] } | null | undefined
    const states = answer?.states
    if (!Array.isArray(states) || states.length === 0) return []
    const css = (states[0] as { readonly css?: unknown } | null | undefined)?.css
    if (css === null || typeof css !== 'object' || Array.isArray(css)) return []
    const classes = (css as Record<string, unknown>)['classes']
    if (Array.isArray(classes)) return classes.filter((token): token is string => typeof token === 'string' && token !== '')
    if (typeof classes === 'string') return classes.split(/\s+/).filter((token) => token !== '')
    return []
  } catch {
    return []
  }
}

/** **THE AUTHORED ITEMS' NODE IDS, ASKED OF THE GRAPH** (`runtime.listTargets` for the population, `runtime.nodeState`
 *  for the one token — the two relations this file already reads): every in-tree node carrying the envelope's own item
 *  class. **ALL EIGHTEEN, AND THAT IS DELIBERATE** (`D-181`, `D-209`): the seven refused items are items, they render, and
 *  a dispatch at one must reach the route and be refused BY `main` — so the wiring installs their body and this function
 *  refuses nothing. **THE COST IS NAMED, NOT HIDDEN**: one `nodeState` read per in-tree node, ONCE at boot, because the
 *  class is a `css` member and the census `listTargets` answers carries no `css` — the tree is a few dozen nodes
 *  (`theme-control.test.ts` counts `72`), so this is a boot registration's price and not a per-delivery one (`D-82` clause
 *  4). TOTAL — a runtime whose census throws, answers no `nodes` or answers a shape that is not a list states NO item, so
 *  the turn degrades to no listener and no throw. */
function menuItemNodeIds(runtime: Runtime): readonly string[] {
  let listed: unknown = null
  try {
    listed = runtime.listTargets()
  } catch {
    return []
  }
  const nodes = (listed as { readonly nodes?: unknown } | null | undefined)?.nodes
  if (!Array.isArray(nodes)) return []
  const ids: string[] = []
  for (const entry of nodes as readonly unknown[]) {
    if (entry === null || typeof entry !== 'object') continue
    const node = entry as { readonly nodeId?: unknown }
    if (typeof node.nodeId !== 'string' || node.nodeId === '') continue
    if (!authoredClassesOf(runtime, node.nodeId).includes(MENUS_ITEM_HANDLER)) continue
    ids.push(node.nodeId)
  }
  return ids
}

/** **THE APP'S ONE CALL INTO THE MENUS ROUTE** (`D-181`, `D-196`; `D-209`'s reason written where the naming happens): the
 *  route is `window.provident.menu`, reached through the app's EXISTING bridge handle — **and THIS is the only site that
 *  spells it for a role's journey**, so the wiring-installed handler body below can be a closure that names nothing an
 *  agent's `dispatch` could widen into a surface. `menu` is declared `menu?` on the ambient bridge, so a realm with an
 *  older preload has no member at all: that arm is `no-route` and NOT a throw. **A SYNCHRONOUS THROW IS AN ARM TOO** — the
 *  route is asked through `Promise.resolve` so a member that throws before answering and one that rejects answer the same
 *  way, and neither escapes a click. */
type MenuRouteAttempt =
  | { readonly kind: 'sent'; readonly answer: Promise<unknown> }
  | { readonly kind: 'no-route' }
  | { readonly kind: 'threw'; readonly detail: string }

function menuRoleRoute(role: string): MenuRouteAttempt {
  const bridge = typeof window === 'undefined' ? undefined : window.provident
  const route = bridge?.menu
  if (bridge === undefined || typeof route !== 'function') return { kind: 'no-route' }
  try {
    return { kind: 'sent', answer: Promise.resolve(route.call(bridge, role)) }
  } catch (error) {
    return { kind: 'threw', detail: String(error) }
  }
}

/** **ONE ITEM'S ACT — READ THE NODE'S OWN ROLE, ASK THE ONE ROUTE, WRITE THE ONE RECEIPT** (L2 §2 turn 4; `D-129`,
 *  `D-194`): the SINGLE implementation the two causes share — the DOM `click` listener and the wiring-installed handler
 *  body both call it, so a human's click and an agent's `provident.dispatch` take the same path (neither replaces the
 *  other, `D-209`). The role is read **at the moment of the act** and never captured, the answer is written verbatim, and
 *  every arm — no route, a rejection, a synchronous throw — lands a STATED receipt (`D-117`'s register). It **refuses
 *  nothing and vets no role**: the refusal is `main`'s (`D-181`, `D-196`) and this turn writes whatever came back. */
function menuRoleAct(runtime: Runtime, nodeId: string): { readonly role: string | null } {
  const held = authoredPropOf(runtime, nodeId, 'role')
  if (!held.readable || typeof held.held !== 'string' || held.held === '') return { role: null }
  const role = held.held
  const attempt = menuRoleRoute(role)
  if (attempt.kind === 'no-route') {
    writeMenuReceipt(runtime, `no route: this realm's preload carries no \`menu\` member, so '${role}' reached nothing`)
    return { role }
  }
  if (attempt.kind === 'threw') {
    writeMenuReceipt(runtime, `no answer: the menus route threw for '${role}' (${attempt.detail})`)
    return { role }
  }
  void attempt.answer.then(
    (answer: unknown) => { writeMenuReceipt(runtime, menuReceiptText(role, answer)) },
    (error: unknown) => { writeMenuReceipt(runtime, `no answer: the menus route rejected for '${role}' (${String(error)})`) },
  )
  return { role }
}

/** **THE ITEM'S ONE INSTALLED HANDLER BODY — THE AGENT'S ARM, INSTALLED BY THE WIRING** (`D-209`; L1 `AL-7`'s reason for
 *  being red, discharged here). ONE `state-slice` per item, at boot, writing a `handlers` list whose single entry is a
 *  **live FUNCTION** — and the function is a CLOSURE over this file's `menuRoleAct`, so the route's naming stays in the
 *  app's code and the envelope stays data (`D-129`). **THE NAME IS THE AUTHORED ONE**, so on the eleven the engine's
 *  append-with-override `(name, event)` rule REPLACES the authored no-op body instead of adding a second `click` handler,
 *  and on the seven — which author none — it is the whole of their dispatch path. **THE BODY VETS NOTHING**: it does not
 *  know the admitted set, does not hold a roster and refuses no role; the refusal is `main`'s answer, and this body writes
 *  it to the carrier through the same act a click uses. **AND ITS RETURN IS ITS OWN WORD AND NEVER THE ACT'S PROMISE**:
 *  a body's return crosses `JSON.stringify` into `dispatch`'s `results`, so `menuRoleAct` is STARTED and the body answers a
 *  short string (`D-209`'s cost (ii)). A refused write is REPORTED, never silent (`D-117`). */
function installMenuItemHandler(runtime: Runtime, nodeId: string): boolean {
  // THE CLOSURE CLOSES OVER THE NODE ID, NOT THE ROLE: the authored node does not churn, and the role is read off the node
  // by `menuRoleAct` at dispatch time — the same relation the DOM listener has (`D-129`'s no-captured-role rule).
  const body = (): string => {
    const act = menuRoleAct(runtime, nodeId)
    return act.role === null ? 'menu-item: no role' : `menu-item ${act.role}`
  }
  try {
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: nodeId,
      mutation: [{ targetProp: 'handlers', mode: 'replace', value: [{ name: MENUS_ITEM_HANDLER, event: 'click', body }] }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status === 'applied') return true
    console.error(`[provident-renderer] menus: the item on ${nodeId} refused its installed handler (status=${status})`)
    return false
  } catch (error) {
    // NOTHING ESCAPES THE INSTALL: a hostile runtime is a reading this turn leaves standing, said out loud.
    console.error(`[provident-renderer] menus: the install on ${nodeId} threw; an agent's dispatch reaches no act there`, error)
    return false
  }
}

/** **THE RECEIPT'S TEXT — WHAT THE ROUTE ANSWERED, IN THE ROUTE'S OWN WORDS** (`D-181`, `D-196`; L2 §2 turn 4): an
 *  admitted role reads `admitted <role>`, and a refusal reads `refused <role>: <reason> — <message>`, with the
 *  role the ANSWER names where it names one (a malformed call carries `''` there, so the node's own role stands in)
 *  and the route's `message` verbatim — nothing is re-worded, softened or summarised. TOTAL: an answer that is not
 *  an object, a status that is not a string and a refusal with no reason each answer a sentence rather than a throw. */
function menuReceiptText(role: string, answer: unknown): string {
  const record = answer !== null && typeof answer === 'object' ? (answer as Record<string, unknown>) : {}
  const status = typeof record['status'] === 'string' ? record['status'] : ''
  if (status === 'admitted') return `admitted ${role}`
  const named = typeof record['role'] === 'string' && record['role'] !== '' ? record['role'] : role
  const reason = typeof record['reason'] === 'string' ? record['reason'] : status === '' ? 'no-answer' : status
  const message = typeof record['message'] === 'string' ? record['message'] : ''
  return message === '' ? `refused ${named}: ${reason}` : `refused ${named}: ${reason} — ${message}`
}

/** **THE RECEIPT'S ONE WRITE — ONE `state-slice` `content` ON THE AUTHORED CARRIER** (`MENUS_RECEIPT_ID`; the form
 *  `renderPaneSize`'s `S3`/`S4` writes on `#gutter-status`, and that is why this turn borrows it: a status node in
 *  this realm has ONE landed write kind and a second spelling of it would be a second authority). The surface is
 *  ASKED and nothing is remembered — `authoredSettingOf` answers whether the node already carries this text, and
 *  the write is skipped where it does, so "not owed" means "the write would be a no-op" by construction (`D-129`).
 *  **`text` is never `undefined`, so this turn has NO removal arm** — the absence-keyed skip `D-163` convicted is
 *  unrepresentable here — and a status but `'applied'` is REPORTED rather than swallowed (`D-117`'s register). */
function writeMenuReceipt(runtime: Runtime, text: string): void {
  try {
    const authored = authoredSettingOf(runtime, MENUS_RECEIPT_ID)
    if (authored.readable && authored.setting === text) return
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: MENUS_RECEIPT_ID,
      mutation: [{ targetProp: 'content', mode: 'replace', value: text }],
    })
    const status = typeof answer?.status === 'string' ? answer.status : 'no-answer'
    if (status !== 'applied') {
      console.error(`[provident-renderer] menus receipt REFUSED (status=${status}) for node ${MENUS_RECEIPT_ID}`)
    }
  } catch (error) {
    // NOTHING ESCAPES A CLICK: a hostile answer or runtime is the reading this turn leaves standing.
    console.error(`[provident-renderer] menus receipt: the write threw; the answer to "${text}" stands nowhere`, error)
  }
}

/** **THE `disabled` MARK ON A RESOLVED ELEMENT — THE DOM LAYER OF THE GUARD THAT MAKES A HALF-WORKING MARK
 *  IMPOSSIBLE** (the user's ruling, `D-232`'s correction): the paint writes an authored `props.disabled` as the BARE
 *  ATTRIBUTE, and on a `div` that attribute does NOTHING — `disabled` is a form-control attribute, so a marked item
 *  stays pressable and `D-232`'s trusted path used to execute it for a person (a real click is `isTrusted === true`).
 *  **SO PRESENCE IS THE MARK AND PRESENCE IS THE VETO**: the element's own `disabled` attribute, read HERE at click
 *  time (never captured), stops the click before `menuRoleAct` — which means a future marking cannot be a paint
 *  instruction that leaves the act live, and it cannot be half-honoured either. **THE VALUE IS NOT INTERPRETED**: a
 *  DOM boolean attribute is present-or-absent, and the CSS the page keys on (`[disabled="true"]`) is a PAINT detail,
 *  not this rule's subject. The property arm exists for a node whose authored prop reached a real form control, which
 *  is the one shape in which the platform would have enforced this itself. TOTAL: no `getAttribute`, a read that
 *  throws, an absent attribute and a non-`true` property all answer NOT MARKED, so an ordinary item behaves exactly as
 *  it did and no click is lost to a hostile element. */
function disabledMarkOn(element: unknown): boolean {
  if (element === null || typeof element !== 'object') return false
  const read = (element as { readonly getAttribute?: unknown }).getAttribute
  if (typeof read === 'function') {
    try {
      const held = (read as (name: string) => unknown).call(element, 'disabled')
      // AN ABSENT ATTRIBUTE ANSWERS `null` IN THIS PLATFORM'S DOM AND `undefined` IN A SHIM THAT SPELLS IT THAT WAY:
      // both read as NOT MARKED, so the guard never invents a mark out of a missing attribute.
      return held !== null && held !== undefined
    } catch {
      return false
    }
  }
  const listed = (element as { readonly hasAttribute?: unknown }).hasAttribute
  if (typeof listed === 'function') {
    try {
      return (listed as (name: string) => unknown).call(element, 'disabled') === true
    } catch {
      return false
    }
  }
  return (element as { readonly disabled?: unknown }).disabled === true
}

/** **ONE ITEM'S TWO LISTENERS — THE FOCUS RULE AND THE CLICK** (`D-196`; L2 §2 turn 4). The turn is handed the NODE
 *  ID the census answered — never a role, never an element — so both listeners ask the NODE for its own
 *  `props.role` at click time and nothing is captured (`D-129`).
 *
 *  `mousedown` → `preventDefault()`: THE FOCUS RULE, and the mechanism is exactly that one call (see this region's
 *  headstone: without it the seven edit roles execute against the item div rather than the element the user was in).
 *  It cannot cancel the click — `preventDefault` on `mousedown` stops focus and the text selection a press would
 *  start, and the `click` still fires on mouseup.
 *
 *  `click` → the route, called with the role the node carries, its answer written into the carrier. **THE ROUTE IS
 *  READ STRUCTURALLY AND OFF THE BRIDGE'S OWN OBJECT**: `menu` is declared `menu?` on the ambient bridge, so a realm
 *  with an older preload has no member at all — that arm writes a stated `no route` receipt, and a rejection or a
 *  synchronous throw from the channel writes the same way. **A CLICK THAT REACHED NOTHING IS A READING**: it is never
 *  an exception out of a handler and never silence.
 *
 *  **AND THE CALL IS `menuRoleAct`, WHICH IS THE SAME ACT THE INSTALLED HANDLER BODY RUNS** (`D-209`): the body does not
 *  replace this listener and this listener does not second-guess the body — one act, two causes (a human's click and an
 *  agent's `provident.dispatch`), one receipt. The role read, the route call and the carrier write all live there.
 *
 *  Two items sharing one role are two callers of one route and the route answers each of them; this turn keys nothing
 *  by role. **A NODE THAT WILL NOT RESOLVE OR WILL NOT TAKE A LISTENER ATTACHES NOTHING AND THROWS NOTHING**
 *  (`D-127`), and the answer says so, so the boot can report it. */
function attachMenuItem(runtime: Runtime, nodeId: string): boolean {
  let element: unknown = null
  try {
    element = runtime.elementForNodeId(nodeId)
  } catch {
    element = null
  }
  const add = (element as { readonly addEventListener?: unknown } | null | undefined)?.addEventListener
  if (typeof add !== 'function') return false
  const listen = add as (type: string, handler: (event: unknown) => void) => void
  // THE FOCUS RULE (`D-196`) — a menu item is a control that must not take focus, and `preventDefault` on `mousedown`
  // is the whole mechanism: focus stays on the element the user was in while the `click` still fires on mouseup.
  listen.call(element, 'mousedown', (event: unknown): void => {
    const prevent = (event as { readonly preventDefault?: unknown } | null | undefined)?.preventDefault
    if (typeof prevent === 'function') (prevent as () => void).call(event)
  })
  // THE HUMAN'S ARM — the same act the installed handler body is the agent's arm of (`D-209`): read the node's own role,
  // ask the one route, write the one receipt. Neither path is the other's implementation.
  // **AND A MARKED ITEM RUNS NOTHING** (`disabledMarkOn`, the DOM layer of the guard): the mark is read off the
  // element at CLICK time — never captured at attach time — because the paint may write or clear it after this
  // listener exists, and a captured reading would be the stale copy `D-129` forbids. This is the layer that makes the
  // contradiction impossible from the human's side; `src/main/preload.ts`'s witness is the one that keeps a trusted
  // gesture from ever being earned on such an element.
  listen.call(element, 'click', (): void => {
    if (disabledMarkOn(element)) return
    menuRoleAct(runtime, nodeId)
  })
  return true
}

/** **TURN 4 — `main()`'S ONE BOOT REGISTRATION, ONCE, BESIDE THE AFFORDANCE'S ATTACH** (`S-11`; `D-181`, `D-196`,
 *  `D-209`; design §1 turn 4). It discovers the authored items from the graph's own census, gives each ONE
 *  `mousedown` and ONE `click` (`attachMenuItem`) AND ONE wiring-installed handler body
 *  (`installMenuItemHandler`) — the two arms of one act, a human's and an agent's — and answers how many took their
 *  listener. **IT CREATES NOTHING, MINTS NOTHING, REGISTERS NO SUBSCRIPTION, AWAITS NOTHING AND SENDS NO ROUTE ITSELF**:
 *  every route call is a click's or a dispatch's, so a boot that never clicks writes no byte and cannot delay or fail
 *  `tests/e2e/bundle-boot-seam`'s `B-5` order (the install writes one `handlers` layer per item — graph bytes, no
 *  surface, no route and no await). **AND A FAILED ATTACH OR A REFUSED INSTALL IS REPORTED PER ITEM** in `D-117`'s
 *  register — the boot's reading of this turn is the count it answers, which `main()` reads. */
function startMenusItems(runtime: Runtime): { readonly attached: number } {
  const items = menuItemNodeIds(runtime)
  let attached = 0
  for (const nodeId of items) {
    // THE AGENT'S ARM FIRST, THE HUMAN'S BESIDE IT (`D-209`): both are installed on every item the census answered, and
    // neither depends on the other succeeding.
    installMenuItemHandler(runtime, nodeId)
    if (attachMenuItem(runtime, nodeId)) {
      attached += 1
    } else {
      console.error(`[provident-renderer] menus: the item on ${nodeId} took no click listener — its role cannot be reached from a click`)
    }
  }
  return { attached }
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
 *  **AND THE FOURTH ARGUMENT IS THE LAYOUT PAINT, CALLED FOURTH IN THAT SAME BODY** (`S-6`; `D-185`, `D-194`): the four
 *  authored zones' fixed dimension from `['zones']`, the panes' adjustable member from `['panes']`, and the stage's content
 *  through `drivePageDisplay`'s form — ONE subscription writing four rendered values **and, inside the fourth, the
 *  self-report's fifth: the carrier's measured text** (`reportMeasuredFigures`, `D-203`/`D-208`; design §4's `W1`–`W5`), so
 *  the fifth write rides a turn that already ran and no parameter is added here. It is the turn
 *  `driveLayoutRegions` above declares, and it is **NOT `renderZone` returning** (`D-168`, `D-185`): no layout projection, no
 *  `source.layout` member, no zone turn on any surface.
 *
 *  **THE HEADER SPELLS `function startViewShape(` WITH NO SPACE**, because two probes in
 *  `tests/theme-declaration.test.ts` search that exact text. **ITS `parameterNamesOf` ARITY ROW STILL READS `.toBe(3)` AND
 *  THIS FOURTH PARAMETER REDS IT** — `chrome`'s same-edit re-grain to `4`, named here and routed rather than taken (`D-3`,
 *  `D-128`; design §6: the count is three at that head, and this is the hand-out that makes it four). */
function startViewShape(
  theme: ThemeApplication | null,
  ghost: (() => void) | null,
  readout: (() => void) | null,
  paint: (() => void) | null,
): void {
  const client = getViewClient()
  viewSubscription = client.subscribe(() => {
    // A DELIVERY IS A RE-READ (the client has already adopted it) and its appearance turn, then the ghost's, then the
    // read-out's, then the layout paint's. A record with no applicable declaration — the placeholder, which names no
    // attribute — writes nothing, so a delivery that moved another family costs one read and no appearance write; the ghost
    // turn is the drag address's own transient and asks its own route once; the read-out's turn paints the panes family's
    // stored size and skips the write where the authored status node already carries it; and the paint writes the four
    // zones' dimension and the panes' adjustable member from the record, writing NOTHING where the record states no figure.
    theme?.apply()
    ghost?.()
    readout?.()
    paint?.()
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
    const panes = reading.panes.map((pane) => {
      // BOTH AXIS MEMBERS, EACH AT ITS OWN NAME, AND THE TWO OPTIONAL ONES SAID AS ABSENCES WHERE THEY ARE ABSENT
      // (`D-189`, `D-186`, `D-129`): a zone-resident pane stores no `bounds`, and a pane with no `zone` is in the STAGE.
      const bounds = pane.bounds === undefined ? 'no bounds' : `${String(pane.bounds.min)}…${String(pane.bounds.max)}`
      return `${pane.id}=${String(pane.width)}×${String(pane.height)}[${bounds}] (${pane.zone === undefined ? 'stage' : pane.zone})`
    })
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
  /** **Whether the act was OWED**, and the reference it is measured against is the CAUSE's (see `commitSetting`): the
   *  setting MOVED since the last act this realm carried, on the reply path — or, on a CLICK, the painted surface does not
   *  already carry the token the control carries. `false` is an act that asked the crossing nothing. */
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
  /** **THE SURFACE'S OWN ANSWER TO "IS THIS TOKEN ALREADY PAINTED", ASKED AND NEVER REMEMBERED** (`D-129`; design §4) —
   *  `authoredPropOf` is the relation `applyTurn` below reads, and this is the same question from the ACT's side: the
   *  painted node's `props.<attributeName>` against the token a control carries. **ONLY A POSITIVE SETTLED MATCH SKIPS A
   *  CLICK'S ACT** (`D-163`'s rule at this arm): an unreadable surface, an absent member and a node that did not resolve all
   *  answer `false`, so the act is CARRIED rather than silently dropped — fail open, because the store is the authority and
   *  a click is its external cause (`D-82` clause 4). It stores nothing: an absence in `props` is what a REBUILT node, a
   *  not-yet-applied removal and a never-written surface all look like. */
  const surfaceCarries = (setting: string): boolean => {
    const held = authoredPropOf(runtime, nodeId, attributeName)
    return held.readable && held.held === setting
  }

  /** **THE ACT ITSELF, keyed on the SETTING it carries** — the one body both causes reach: the reply path's turn reads
   *  the setting off the AUTHORED CARRIER, and the DOM-originated turn is handed the setting the CLICK carried. Neither
   *  composes a declaration and neither awaits a receipt.
   *
   *  **AND THE TWO CAUSES ARE MEASURED AGAINST DIFFERENT REFERENCES — THE DEFECT THIS PASS FIXES, MEASURED ON THE REAL
   *  WINDOW (2026-11-12, a FRESH profile through CDP).** A **CLICK** is measured against the SURFACE (`surfaceCarries`,
   *  `D-129`'s relation), and the **REPLY path** against `lastCarried`, the boot BASELINE. They cannot share one reference:
   *  the baseline is seeded at a boot from the AUTHORED CARRIER — `THEME_INITIAL_TOKEN`, `'dark'` — and its whole purpose is
   *  to stop the FIRST reply of a boot from carrying the token the ENVELOPE authored as though a person had chosen it
   *  (`T-7`; without the seed `npm run divergence` redded). **What that seed then did to a person is the report**: on a
   *  fresh profile the record stands at the placeholder, the authored node carries NO `theme` attribute, and the carrier
   *  reads `dark` — so a click on `Dark` "moved nothing" against the baseline and reached the crossing NEVER (measured: the
   *  record byte-identical before and after, no attribute, no delivery, no paint), while `Light` — a DIFFERENT token —
   *  delivered and painted, after which `Dark` could too. That is the reported *"dark doesn't work, unless it was
   *  previously set to light mode"* exactly. **A person pressing a control labelled `Dark` asks the store for dark; whether
   *  the demo card's own carrier already says `dark` is not a question the store has ever been asked.** So the click asks
   *  the SURFACE instead, and a click on a token the paint already carries sends nothing — the "once per real change" the
   *  baseline bought, kept without a copy of what was written. **THE BASELINE IS NOT WEAKENED**: no reply path's turn is
   *  touched, no boot step moves, and nothing is scheduled — the click is still the only thing that makes this write. */
  const commitSetting = (setting: string, cause: 'reply' | 'click'): ThemeApplicationReading => {
    const changed = cause === 'click' ? !surfaceCarries(setting) : lastCarried === null || lastCarried.setting !== setting
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
    return commitSetting(read.setting, 'reply')
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
     *  the turn reads the token the EVENT carries and hands it to `commitSetting` with its CAUSE named, which is the same
     *  act the reply path performs against a DIFFERENT reference (`D-129`): a click is owed exactly when the painted
     *  surface does not already carry the token, so a click on the theme already on screen sends nothing and the crossing
     *  is still asked once per real change rather than once per click. **The arm that matters is the one the baseline used
     *  to swallow: a click on the token the ENVELOPE itself authored is now ASKED**, which is the reported
     *  *"dark doesn't work"* measured and fixed. The ids are the ROLE's — derived from the envelope by `themeControlIds`,
     *  never re-spelled here. */
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
        // **THE CLICK'S CAUSE IS NAMED, AND IT IS WHAT MAKES THE ACT POSSIBLE AT ALL** (`commitSetting` above): the surface
        // is this turn's reference, so a person pressing `Dark` on a fresh profile reaches the crossing even though the
        // card's own carrier already reads `dark`. The baseline's seed answered `no` to a question the store was never asked
        // (`commitSetting`'s docblock), and that is the defect this cause-argument names.
        commitSetting(carried, 'click')
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
 *  delivery — arrives back through `open` on the realm's ONE security subscription, and `render()` is its consumer.
 *  **AND `write` HANDS BACK THAT MEMBER'S OWN ANSWER** (`D-166`'s `F6`, design §4): `Promise<unknown> | void`, because the
 *  answer is the ONLY signal that can tell *not yet processed* from *refused* — a store read answers `open` for both — and
 *  a `void` answer could not carry it even if `main()` kept it. It is read STRUCTURALLY for its `{status:'refused'}` arm,
 *  as every boundary answer in this module is; a crossing that answers NOTHING (`undefined`) is a realm with no
 *  `security.setPane`, a bridge older than `D-123` or a battery's double, and then the DELIVERY stays the only clearer. */
export interface OverlayPaneCrossing {
  readonly open: () => boolean | null
  readonly write: (open: boolean) => Promise<unknown> | void
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
   *  delivery — **BY A DELIVERY OR BY THE ANSWER THAT REFUSES IT** (`D-166`'s `F6`, design §4): the terms the pane drag's
   *  preview was judged by. **`closing` IS PRODUCED AND `held` IS NOT, AND THE DIFFERENCE IS THE MECHANISM'S OWN MEANING**:
   *  `closing` is a pane that is up and on its way out, which is exactly the window between a close ACT and the word that
   *  ends it — the DELIVERY, or a `refused`/LOST ANSWER from the crossing when no delivery is owed at all; `held` is a pane
   *  that is UP AND HELD, and after this inversion there is no such moment — a pane is up when the store says `open` and not
   *  before, so a word meaning "up but not confirmed" has no state left to name. `held` therefore stays a member of the
   *  mechanism's closed set (`held × open` stays `held`, driven by that module's own rows) and this app never produces it.
   *  **AND NEITHER WORD MAY RENDER**: `up` below is the STORE's word alone, so a transient can neither open a pane the
   *  store has not opened nor close one the store has not closed. */
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

  /** **THE ASK'S ORDINAL — THE SETTLE'S ONLY GUARD** (`G1`'s supersession idiom, read at this transient; `D-166`, design
   *  §4). It counts the writes this act has SENT at the crossing, so an answer that arrives after a LATER ask settles
   *  nothing: a superseded answer may never end a newer window. */
  let lastAsk = 0

  /** **THE SETTLE — THE WRITE'S OWN ANSWER IS THE ONLY SIGNAL THAT CAN END A `closing` NO DELIVERY IS COMING FOR**
   *  (`D-166`'s `F6`; `D-127` refused the read-keyed attempt on measurement, design §4). ONE continuation, and its arms are
   *  the answer's own vocabulary read STRUCTURALLY: a `committed` answer settles NOTHING — the store processed the write and
   *  the pane's DELIVERY is still owed — while a `refused` answer and a LOST one (a rejection, or an answer carrying no
   *  status at all) REPORT (`console.error`/`console.warn`, `D-117`'s register, the console being this fact's only
   *  observability) and then end the transient through `renderTurn`'s ONE clearing site, the turn the delivery itself runs.
   *  **A CROSSING THAT ANSWERS NOTHING SETTLES NOTHING**: a `void` `write` hands back no thenable, so the DELIVERY stays the
   *  only clearer there. **AND A STALE ORDINAL SETTLES NOTHING**, checked at the ask and again at the answer, because a
   *  thenable answers later than the act that sent it. */
  const settle = (ordinal: number, answer: unknown): void => {
    if (ordinal !== lastAsk) return
    const thenable = answer as { readonly then?: unknown } | null | undefined
    if (thenable === null || thenable === undefined) return
    if (typeof thenable.then !== 'function') return
    try {
      // BOTH ARMS ARE HANDLED, so no rejection is left unhandled: an unhandled one is this damage surfacing as a page error
      // instead of as a word (`D-166`).
      void (thenable as PromiseLike<unknown>).then(
        (settled: unknown) => { settleAnswer(ordinal, settled) },
        (rejected: unknown) => { settleLost(ordinal, `the ask was rejected: ${String(rejected)}`) },
      )
    } catch {
      settleLost(ordinal, 'the answer could not be subscribed')
    }
  }

  /** THE ANSWER'S THREE ARMS, member by member — `committed` settles nothing, `refused` reports, and anything else is LOST. */
  const settleAnswer = (ordinal: number, answer: unknown): void => {
    if (ordinal !== lastAsk) return
    const record = answer !== null && typeof answer === 'object'
      ? (answer as { readonly status?: unknown; readonly reason?: unknown; readonly message?: unknown })
      : null
    const status = typeof record?.status === 'string' ? record.status : ''
    // A `committed` ANSWER SETTLES NOTHING: the store has processed the write, so the pane's DELIVERY is still owed —
    // clearing here would read the shape before that delivery refilled it and claim a pane is up over a closed store.
    if (status === 'committed') return
    if (status !== 'refused') {
      settleLost(ordinal, `the answer carried no status (status=${status === '' ? 'none' : status})`)
      return
    }
    const reason = typeof record?.reason === 'string' ? record.reason : 'unspecified'
    const message = typeof record?.message === 'string' ? record.message : 'no message'
    console.error(`[provident-renderer] overlay write REFUSED (status=${status} reason=${reason}): ${message}`)
    // THE CLEARING SITE IS `renderTurn`'s AND STAYS ONE (`D-166`, design §4): the pane the store still holds comes back with
    // it, and with the carrier mirror the next click at the same control resolves its target again.
    void renderTurn(true)
  }

  /** A LOST ANSWER — the ask never reached the store, so no delivery is owed either, and this is the boot reads' register:
   *  a fault is not a state (`D-127`, `D-117`). */
  const settleLost = (ordinal: number, detail: string): void => {
    if (ordinal !== lastAsk) return
    console.warn(`[provident-renderer] overlay write LOST its answer (${detail}): no delivery is owed, so the transient is over and the store's word stands`)
    void renderTurn(true)
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
    // **THE ANSWER IS KEPT, NOT THROWN AWAY** (`D-166`'s `F6`, design §4): `crossing.write` now HANDS BACK the crossing
    // member's own answer, and it is settled below rather than `void`-ed — the ONE signal that can tell *not yet processed*
    // from *refused*, since a store read answers `open` to both.
    let ordinal = 0
    let settled: unknown = undefined
    if (crossing !== null) {
      lastAsk += 1
      ordinal = lastAsk
      try {
        settled = crossing.write(asked)
        wrote = true
      } catch {
        // THE SINK'S OWN THROW IS THE SINK'S: the overlay's turn is not a store's act, and a failed ask is not a failed act
        wrote = false
      }
    }
    // THE ONE TRANSIENT (`D-90`'s judgement): a pane that is UP and on its way out is `closing` until a DELIVERY, or the
    // ANSWER THAT REFUSES IT, says otherwise. The SET stays synchronous and unmoved (`wrote && !asked`); the settle follows
    // it, so no answer — a thenable's included — can arrive ahead of the window it may end.
    if (wrote && !asked) transient = 'closing'
    if (wrote) settle(ordinal, settled)
    return { verb: verbWord, asked, wrote, escaped: focused }
  }

  /** **THE RENDER — WHAT THE DELIVERY SAYS, APPLIED AS ONE `state-slice` ON THE AUTHORED APP ROOT** (`D-125`; `D-113`'s
   *  declaration site, unchanged). `clear` is the DELIVERY's own turn — **AND, ON A `refused` OR LOST ANSWER, THE SETTLE'S**
   *  (`D-166`'s `F6`, design §4): a refused close has no delivery coming to correct it, so the answer that refuses it runs
   *  this SAME turn and this same `if (clear) transient = null` is the transient's ONE clearing site, reached twice and
   *  written once. A word that has not arrived (`null`) renders nothing at all — nothing is fabricated about a pane the
   *  realm has not heard of — and the RENDER PREDICATE IS THE STORE'S WORD ALONE, never a transient and never the boolean
   *  an act asked for. */
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
    // CARRIER A READING OF THE STATE**: it writes the store's own word here, on the DELIVERY and on the SETTLE that answers
    // a refused or lost ask — a second OCCASION and never a second author (`D-131`, `D-166`) — so the body's next read
    // resolves the next target and the carrier MOVES on every click that would change something.
    // **IT RUNS ON `clear` AND NOT ON EVERY TURN** because `clear` is exactly the delivery's call (`render()`) — and now the
    // settle's, which is the same call — while `drive()`'s turn runs BEFORE the store has answered: mirroring there would
    // overwrite the target the body just wrote with the state that target exists to change. **`lastCarried` MOVES WITH IT**,
    // so the wiring never mistakes its own mirror for an act, and it moves ONLY IF THE MIRROR LANDED: a refused write leaves
    // the carrier holding the target, which is what makes the next click re-ask rather than suppress. */
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
 * binding (§3.4 R-2). The composition registers NO SUBSCRIBER of its own: the ghost turn is the `renderGhost` member
 * below, handed OUT to the shape's ONE delivery — whose whole body is `theme?.apply(); ghost?.(); readout?.(); paint?.()` —
 * and the
 * composition takes NO `onChanged`/`subscribe` registration, on the bridge, on the store or on the client, so the push
 * still has exactly one consumer in this realm. **THE ONE REGISTRATION IT DOES TAKE IS THE RECEIPT'S PUSH**
 * (`onWriteOutcome`, once at construction — design §2 `N2`): a write's answer is not a delivery, a refusal produces none
 * at all, and a reader of it therefore cannot be the shape's subscription. NO byte of the four
 * mechanism modules moves (§3.4 R-1/R-5).
 *
 * THE SEAM SURFACE (`PaneDragSurface`) satisfies the family's EXPORTED seam types of
 * §2.1 — `StartSizeOf`, `BoundsOf` — plus the §2.1 C temp-write turns
 * (`move`/`release`/`cancel`) and the ghost turn. **THE RELOCATE CANDIDATE PRODUCTION AND THE
 * RENDER TURN ARE DELETED AND HAVE NO SUCCESSOR** (`D-168`): `src/shared/relocate.ts` has no
 * `src/` importer (`D-111`) and no layout consumer exists here. The
 * composition's ONE per-gesture binding (whether the family's ending was SENT) lives in THIS closure, never at
 * module scope. The `<id>` segments are the CALLER'S OWN spellings, derived by the
 * caller's own element/token mapping (§2.1 A); the gesture-end writes bind to the
 * wiring's own pane id (§2.4 names 1/2/9), carried verbatim.
 *
 * **THE READS ARE THE SHAPE'S, AND THE FLOW'S OWN ARE THE PANE GEOMETRY'S** (`D-88`; `D-168` for the zone family's): the
 * pane's `size`/`bounds` are answered SYNCHRONOUSLY by `paneSizeOf`/`paneBoundsOf` off the shape a delivery filled. The
 * frozen store's tier-qualified `mem.layout.*` route — `tierRead` — is DELETED from this composition, and with it the last
 * `mem.layout.*` spelling under `src/`. **NO ZONE READ STANDS IN THIS CLOSURE ANY MORE**: its `zoneOf`/`zoneIdOf` had exactly
 * two readers, `renderZone` and `candidatesFor`, and both are DELETED (`D-168`), so the zone family's read keeps its owner —
 * `store-view-record`'s `view.zoneOf` at `['zones']`, whose derivation `driveLayoutRegions` reuses as `zoneIn` off the
 * reading it is handed. **THE FILE'S ONE CALLER OF THAT FAMILY IS THE PAINT** (`D-185`), and it is not this composition's.
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
 * **THE DELIVERY'S ONE BODY IS `theme?.apply(); ghost?.(); readout?.(); paint?.()` AND IT CALLS NOTHING ELSE** (`D-168`;
 * FOUR members from `D-194`, the fourth being the LAYOUT PAINT above): this
 * composition takes NO `onChanged` registration — on the client, the bridge or the store — because a second one would be
 * a second consumer of one push and a second read per delivery. **ITS ONE REGISTRATION IS THE RECEIPT'S PUSH**
 * (`onWriteOutcome`, taken once at construction, `reportReceipt`): a write's answer is not a delivery and a refusal
 * produces none at all, so the two registrations answer two different signals and neither is a second consumer of the
 * other. **NO ZONE TURN STANDS ON THIS SURFACE TO BE CALLED**:
 * `renderZone` is DELETED from the surface, the app's only `source` is `domEventSource()` and carries no `layout` member,
 * and **NO LAYOUT PROJECTION IS RENDERED ANYWHERE IN THIS TREE**. **`['zones']` HAS A READER AGAIN, AND IT IS THE PAINT'S**
 * (`D-185`): the zone family's `size`/`display` are read by `driveLayoutRegions` above and written to the four authored
 * nodes' `css.style` through `applyCommand` — a record read and a render write, which revives no projection, no `layout`
 * member and no `renderZone` (`D-168`'s deletion stands whole). Every read is guarded: an absent client, an absent shape
 * and a throwing read all land the DECLARED degradation, and never a throw escapes a wiring turn (§3.2 F-8).
 * **AND THE GHOST TURN (`renderGhost`) IS THE ONE TURN THE DELIVERY REACHES HERE** — it asks the address's own read
 * and paints the declared transient the address has no other way to show.
 * ══════════════════════════════════════════════════════════════════════════════════ */

/** The composition's surface — §2.1's A/B/C seam implementations plus the temperature
 *  turns, matching the family's EXPORTED seam types (`StartSizeOf`, `BoundsOf`) — and the
 *  ghost turn the shape's ONE delivery calls. **NO RENDER TURN AND NO RELOCATE-CANDIDATE
 *  PRODUCTION STAND HERE** (`D-168`): both are DELETED, and nothing in this tree renders a
 *  zone layout or produces a candidate. */
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
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
  cancel(gestureId: string): void
  /** **THE GHOST TURN — THE SHAPE'S ONE DELIVERY CALLS IT** (`D-138`, `D-144`, `D-168`; design §4 `G1`–`G9`).
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
  /** **THE GESTURE'S ADDRESSES — ONE DECLARATION PER AUTHORED HANDLE** (`app-layout`'s `menus-handle-drag`): the wiring's
   *  own `PANE_DRAG_HANDLES` list, handed at the ONE construction site beside `view` and `ghostTarget`. **IT IS HOW ONE
   *  COMPOSITION SERVES EVERY HANDLE WITHOUT A SECOND ONE**, and it answers the two questions a turn cannot ask:
   *   · the KEY a write turn is handed (`move`/`release`/`cancel`) names the entry's `paneId`, so a `commitDrag` and a
   *     `commitPane` address the pane THAT handle adjusts and never a hard-coded one;
   *   · the ELEMENT a read seam is handed carries the entry's `handleId`, so `paneIdOf` reaches the same pane's record —
   *     which is what makes the pre-drag figure and the bounds pair the RECORD's for a zone-resident pane too.
   *  **ABSENT IS THE DECLARED DEGRADATION AND IS TODAY'S BEHAVIOUR**: a backing that names nothing answers
   *  `DEFAULT_PANE_ID` on every arm — exactly what the node batteries and `demo/pane-drag-demo/demo.ts` construct — so no
   *  existing caller's reading moves. Entries are read structurally and an unreadable one is skipped, never a throw. */
  readonly addressing?: readonly PaneGestureAddress[]
}

/** **THE MEMBER ONE PANE'S `zone` MAKES ADJUSTABLE — NAMED ONCE, AND READ BY EVERY TURN THAT ANSWERS OR WRITES A FIGURE**
 *  (`D-189`, `D-191`; `docs/L2/renderer-wiring/interface.md` §3/§4). `width` in a `top`/`bottom` zone, `height` in a
 *  `left`/`right` one, and **`height` where the `zone` member is ABSENT** — the STAGE, which `C-9` derives and `C-12` makes
 *  sidebar-equivalent, so `pane-a`'s adjustable member is its `height` as its `size` always was (`D-189`'s rename is a
 *  stored-member rename and not a value change). **THE OTHER MEMBER IS MEMORY, NEVER AN AUTHORITY**: a `top` pane's stored
 *  `height` is retained and unpainted and a gesture must not move it (`D-129`, `D-186`). One selection, no
 *  re-interpretation of a figure: each member's own name already says its axis. */
function adjustableMemberNameOf(zone: string | undefined): 'width' | 'height' {
  return zone === 'top' || zone === 'bottom' ? 'width' : 'height'
}

/** THE FIGURE THAT SELECTION NAMES, off one admitted geometry — so the drag's read, the read-out's figure and the ghost's
 *  declared transient cannot disagree about WHICH member they are reading (`D-117`). */
function adjustableFigureOf(pane: ViewPaneGeometry): number {
  return pane[adjustableMemberNameOf(pane.zone)]
}

/** THE WIRED COMPOSITION (§2.1 A/B/C + the shape's delivery turn + §7a.1 item 1's reconcile turns), bound to the
 *  caller-supplied BACKINGS above and the RECORDING SOURCE DOUBLE. Every read is the shape's; the temp preview is this
 *  closure's; the ghost turn is a member the shape's one delivery calls. **NO TURN READS `source` ANY MORE** (`D-168`):
 *  the surface's only reader of it was `renderZone`'s `layout` guard, and that turn is DELETED — so this closure holds no
 *  source binding at all, and the parameter stands because `backing, source` is the signature both callers (the wiring's
 *  ONE construction, the demo's) are written against, and `domEventSource()` carries no `layout` member to read anyway. */
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface {
  const backingRecord = (backing ?? null) as { readonly view?: unknown; readonly ghostTarget?: unknown; readonly addressing?: unknown } | null
  /** THE SHAPE, where the caller supplied one. `null` is a realm with no crossing: the reads answer the measured default
   *  and every write is the client's `absent` statement, which is the declared degradation and never a throw. */
  const view = (backingRecord?.view ?? null) as ViewClient | null
  /** **THE ELEMENT THE GHOST'S DECLARATION LANDS ON** (`D-144`; design §4): the wiring's pane element, handed beside the
   *  shape at the ONE construction site. STRUCTURAL and never inspected at construction — the ghost turn reads the two
   *  members it needs, per call, and a target carrying neither paints nothing. */
  const ghostTarget = backingRecord?.ghostTarget ?? null
  /** **THE GESTURE'S ADDRESSES, READ STRUCTURALLY — AN ABSENT OR UNREADABLE LIST IS EMPTY, NEVER A THROW** (`D-95`'s
   *  total-read discipline applied to a list): an entry that is not a record with a non-empty `handleId` and `paneId` is
   *  SKIPPED rather than judged, so a hostile list can only ever degrade to the `DEFAULT_PANE_ID` arm below. */
  const addressing: readonly PaneGestureAddress[] = Array.isArray(backingRecord?.addressing)
    ? (backingRecord.addressing as readonly unknown[]).filter((entry): entry is PaneGestureAddress => {
        if (entry === null || typeof entry !== 'object') return false
        const held = entry as { readonly handleId?: unknown; readonly paneId?: unknown }
        return typeof held.handleId === 'string' && held.handleId.length > 0 && typeof held.paneId === 'string' && held.paneId.length > 0
      })
    : []
  /** **THE PANE ONE HANDLE'S GESTURE ADDRESSES, OR `null` WHERE THE DECLARATIONS DO NOT NAME IT** — the list's ONE reader,
   *  consulted by the write turns (through the gesture KEY) and by the read seams (through the ELEMENT's id), so the two
   *  can never point at different panes (`D-117`'s one-member rule applied to one handle). A find over a declared list and
   *  never an index signature, which is `PANE_NODE_IDS`' own reason (`D-188` debt 2): a missing key answers absence. */
  const declaredPaneFor = (handleId: string): string | null => {
    try {
      const declared = addressing.find((entry) => entry.handleId === handleId)
      return declared === undefined ? null : declared.paneId
    } catch {
      // A HOSTILE LIST ANSWERS ABSENCE — the same arm an absent one does, and no write.
      return null
    }
  }
  /** **THE PANE A GESTURE KEY ADDRESSES — AND ITS FALLBACK IS THE DECLARED ONE** (the member's own reason above): a key the
   *  list does not name is the composition's own pane, which is what every caller that supplies no list means, and what
   *  the wiring's first entry means too (`GUTTER_AFFORDANCE_ID` → `DEFAULT_PANE_ID`). */
  const paneOfKey = (key: string): string => declaredPaneFor(key) ?? DEFAULT_PANE_ID

  /** **THE CALLER'S OWN PANE ID, AND ITS FALLBACK IS THE *DECLARED* ONE — NEVER A LITERAL OF THIS FILE'S** (`D-138`,
   *  `D-152`). `<id>` is the caller's element/token mapping (§2.1 A) where the element carries an `id` or the token is a
   *  non-empty string; absent both, the gesture-end turns (§2.4 names 1/2/9) address `DEFAULT_PANE_ID`, imported from
   *  `src/shared/view-shape.ts`. **THE RECORD DECLARES THE PANE IDS IN THAT FILE AND THIS REALM MUST NOT SPELL ITS OWN**:
   *  the id domain is CLOSED to `DECLARED_PANE_IDS` (derived from that constant) and the route refuses an id it does not
   *  declare (`undeclared-pane`), so a literal here would be a second answer to "which pane does this app address" — and
   *  the two could disagree about it, the failure landing as a gesture turn writing a pane the record no longer declares.
   *  **THE VALUE IS UNCHANGED** (`DEFAULT_PANE_ID` is `'pane-a'`), so this is one spelling and no behaviour.
   *  **AND FROM THE LIST IT IS THE PANE THE HANDLE DECLARES** (`app-layout`'s `menus-handle-drag`): an element/token that
   *  names a HANDLE resolves to that handle's `paneId` first — `GUTTER_AFFORDANCE_ID` answers `pane-a` and
   *  `MENUS_AFFORDANCE_ID` answers `pane-menus` — so the reads behind `startSizeOf`/`boundsOf`/`release` reach the record
   *  of the pane the gesture actually adjusts. A name the list does not declare is returned AS GIVEN, which is what every
   *  caller that supplies no list reads (`D-117/LIVE-READ`'s `'gutter-pane'` token is that arm), and it is why the reads
   *  and the writes cannot disagree about one handle. */
  const paneIdOf = (element: unknown, token: unknown): string => {
    const viaElement = (element as { readonly id?: unknown } | null | undefined)?.id
    if (typeof viaElement === 'string' && viaElement.length > 0) return declaredPaneFor(viaElement) ?? viaElement
    if (typeof token === 'string' && token.length > 0) return declaredPaneFor(token) ?? token
    return DEFAULT_PANE_ID
  }

  /** **WHICH MEMBER A GESTURE ON THIS PANE MAY MOVE — THE PANE'S OWN `zone`, READ FOR JUDGEMENT AND NEVER MERGED INTO A
   *  WRITE** (`D-189`, `D-191`; `docs/L2/view-record/interface.md` §2). `width` under `top`/`bottom`, `height` under
   *  `left`/`right`, and `height` where the `zone` member itself is absent — the stage, `C-9`/`C-12`. **THE READ IS THE
   *  SHAPE'S AND IS TOTAL** (`D-95`): a null `view`, a hostile shape and a pane the family does not name all answer the
   *  measured default's own selection, because `defaultPaneGeometry` carries no `zone` and therefore selects `height`. */
  const paneMemberOf = (id: string): 'width' | 'height' => {
    if (view !== null) {
      try {
        const held = view.shape().panes.find((pane) => pane.id === id)
        if (held !== undefined) return adjustableMemberNameOf(held.zone)
      } catch {
        // A HOSTILE SHAPE ANSWERS THE MEASURED DEFAULT'S MEMBER — the absent shape's own arm, and no write.
      }
    }
    return adjustableMemberNameOf(defaultPaneGeometry(id).zone)
  }

  /** **A `null` `view` REPORTS ONCE, AT CONSTRUCTION, AND THE THREE PER-TURN GUARDS STAY SILENT BY DESIGN** (design §2
   *  `N1`/`N2`; `D-167`'s routing of the three discarding routes). It is ONE fact known before any gesture — this
   *  composition's writes reach no crossing and the gesture is presentational — so it is said here, once, and **the three
   *  guards carry the pointer to this one word** instead of repeating it: a per-move repetition at pointer frequency is
   *  not a reading but noise, on the one realm where the console is the only observability. **AND NO "LAST REPORTED" FLAG
   *  BOUNDS IT**: a flag remembering what was written is exactly the copy `D-129` forbids. */
  if (view === null) {
    console.warn('[provident-renderer] the pane drag has NO view client — this composition\'s writes reach no crossing (said ONCE here; the three per-turn statements stay silent while this stands)')
  }

  /** **THE STATEMENT'S READER — `reportUnreached(what, statement)`, ONE PRIVATE TOTAL RELATION AT THE THREE ROUTES**
   *  (design §2 `N1`; `D-167`'s routing, `D-126`'s `F10`). Each drag turn is handed a SYNCHRONOUS statement and, until this
   *  pass, discarded it. A `{status:'absent'}` statement is a write that went NOWHERE — there is no receipt to come, so
   *  this is the only reading that write will ever have — and it is reported in `D-117`'s register as **`console.warn`**,
   *  the LOST class and never the refused one, with its `reason` spelled VERBATIM: `no-view-member` is the absence
   *  `:1056` states for a missing preload, and **`no-route` is a `warn` too** because `C-9`(b) calls that realm *an older
   *  preload* — a lawful degradation of the realm and NOT a defect this tree owns.
   *  **A `{status:'sent'}` STATEMENT SAYS NOTHING** (that receipt is the push's, `reportReceipt` below) **and so does
   *  anything that is not a statement at all**, because a total relation invents no fault. */
  const reportUnreached = (what: string, statement: unknown): void => {
    if (statement === null || typeof statement !== 'object') return
    const held = statement as { readonly status?: unknown; readonly reason?: unknown }
    if (held.status !== 'absent') return
    const reason = typeof held.reason === 'string' ? held.reason : 'no reason stated'
    console.warn(`[provident-renderer] ${what}: the write went NOWHERE (reason=${reason}) — no receipt is owed, so nothing else will report it`)
  }

  /** **THE RECEIPT'S READER — THE PUSH'S HANDLER, SCOPED TO THE THREE ROUTE WORDS THIS CLOSURE SENDS** (design §2 `N2`;
   *  `docs/L2/view-record/interface.md` §9). The client pushes each write's answer from the very continuation that holds
   *  it, so this body rides the answer's own arrival: **`refused` → `console.error`** (a fault this tree owns — an answer
   *  that said no), **`unread` → `console.warn`** (a boundary that did not speak), **`committed` → SILENCE**, because the
   *  store processed the write and the pane's DELIVERY is still owed.
   *  **`'theme'` IS NOT THIS REALM'S NEWS AND IS NOT REPORTED**: this file sends the `pane`, `drag` and `zone` routes —
   *  the release turn's `commitPane`, the move turn's `commitDrag`, the ending turn's `clearDrag`, and a ZONE STRIP's
   *  release `commitZones` — and sends no `commitTheme`, so that receipt belongs to the caller that sent it (the
   *  appearance control's own wiring) and reporting it here would be a second realm claiming another act's answer.
   *  **THE `zone` WORD JOINS THIS FILTER AT THIS REV, AND THE SENTENCE IT REPLACES IS RE-GRAINED RATHER THAN LEFT
   *  STANDING**: it read *"the zone family has no UI caller at all"* (`D-151`), which is FALSE from the moment the four
   *  strips send that route — so a zone write's refusal is now this realm's fault to report, on the same two registers.
   *  **IT REPORTS AND COMPOSES NOTHING**: `release` still returns `void`, no caller's answer is built from a receipt, and
   *  the two registers are `D-117`'s — `error` for a fault this tree owns, `warn` for a degradation the realm declares or
   *  a boundary that did not speak. */
  const reportReceipt = (receipt: ViewWriteOutcome): void => {
    const outcome = receipt as unknown as
      | { readonly route?: unknown; readonly status?: unknown; readonly reason?: unknown; readonly message?: unknown }
      | null
      | undefined
    if (outcome === null || outcome === undefined) return
    if (outcome.route !== 'pane' && outcome.route !== 'drag' && outcome.route !== 'zone') return
    if (outcome.status === 'refused') {
      const reason = typeof outcome.reason === 'string' ? outcome.reason : 'unspecified'
      const message = typeof outcome.message === 'string' ? outcome.message : 'no message'
      console.error(`[provident-renderer] ${String(outcome.route)} write REFUSED (reason=${reason}): ${message}`)
      return
    }
    if (outcome.status === 'unread') {
      const reason = typeof outcome.reason === 'string' ? outcome.reason : 'unspecified'
      console.warn(`[provident-renderer] ${String(outcome.route)} write LOST its answer (reason=${reason}) — a boundary that did not speak is no state of the record`)
    }
  }

  /** **THE REGISTRATION — ONCE, AT CONSTRUCTION, AND STRUCTURALLY TOLERANT THE OTHER WAY TOO** (design §2 `N2`): a `view`
   *  carrying no `onWriteOutcome` — a battery's `Pick`, the demo's stub — registers NOTHING, so those realms keep exactly
   *  the silence they have today, a missing member being the declared degradation here and never a fault (the
   *  `subscribe` `subscribed: false` idiom). The withdrawal is NOT kept: this closure lives as long as the realm, and a
   *  binding no turn reads is the class `D-70` names. A registration that threw installed nothing, and nothing is owed
   *  for it: the receipt keeps its hold at `writeOutcome()` either way. */
  if (view !== null) {
    const register = (view as { readonly onWriteOutcome?: unknown }).onWriteOutcome
    if (typeof register === 'function') {
      try {
        ;(register as (handler: (outcome: ViewWriteOutcome) => void) => unknown).call(view, reportReceipt)
      } catch {
        // a registration that threw installed nothing: no receipt reaches this realm and none is claimed
      }
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
   *  The affordance's `PreviewState` carries a CLAMPED `value`; this turn reads it and sends ONE `commitDrag(<the pane the
   *  KEY addresses>, {<that pane's adjustable member>})` — no tier, no path, no composer, and no second judgement: a preview
   *  whose value is not a finite non-negative number sends NOTHING and leaves whatever last stood standing (§3.2 F-8). `M2`
   *  clears the ending flag FIRST, so a first move RE-OPENS the gesture and the erase gates the ERASE and never the gesture.
   *  The sink is never touched (SINK-1). **THE PANE IS THE KEY'S** (`app-layout`'s `menus-handle-drag`): `paneOfKey` answers
   *  the declaration that owns this key — the stage's handle its own pane, the menus handle `pane-menus` — and a key the
   *  declarations do not name is `DEFAULT_PANE_ID`, which is the arm every caller that supplies no list reads. */
  const move = (key: string, preview: unknown): void => {
    try {
      const size = (preview as { readonly value?: unknown } | null | undefined)?.value
      if (typeof size !== 'number' || !Number.isFinite(size) || size < 0) return
      gestures.set(key, { erased: false })
      const paneId = paneOfKey(key)
      // THE STATEMENT IS READ (`N1`), and the per-turn silence on a null `view` is the construction's one word above.
      // **THE MEMBER IS THE PANE'S ADJUSTABLE ONE AND ITS NAME IS ITS AXIS** (`D-189`, `D-190`): `{height}` for `pane-a`,
      // the stage-resident pane, and `{width}` for `pane-menus`, whose `zone` is `top` — so the `['drag']` reading and the
      // release's `file` commit name ONE member, for whichever pane the key addressed.
      if (view !== null) reportUnreached('the drag move', view.commitDrag(paneId, { [paneMemberOf(paneId)]: size }))
    } catch {
      // a hostile key, preview or view must never throw out of the move turn
    }
  }

  /** **THE SIZE READ — §2.1 A's `startSizeOf`, the ONE name the flow has for it since `defaultSizeFor` was DELETED
   *  (`D-168`; `gutter-ui.md` §2.1 item 3), AND IT IS NOW THE SHAPE'S READ (D-88).** It was `mem.layout.pane.<id>.size` then
   *  `file.settings.pane.<id>.size` through two `tierRead` calls; the two tiers COLLAPSE to one `file` address (`['panes']`,
   *  D-87's inherited fact (i)) and the answer is the client's, READ SYNCHRONOUSLY and never awaited — the reason the shape
   *  exists. A pane the standing family does not name answers the MEASURED DEFAULT (100, the authored pane's `props.size`)
   *  instead of the `undefined` that made the release refuse `'unusable-default'`: the missing default was the frozen
   *  store's, and D-87's ground measured it. **NO WRITE HAPPENS HERE** — a read that misses leaves the miss (`D-82`
   *  clause 4).
   *
   *  **AND IT IS TOTAL OVER A SHAPE WHOSE READ THROWS** (`D-95`): what an ABSENT shape answers, a THROWING one answers
   *  too — the measured default — because a read that could throw out of `startSizeOf`/`boundsOf` was the one pair of the
   *  surface's surviving turns that could (§3.2 F-8; `D-94`'s open item (e)). The other guards were read to be copied, not
   *  widened: each catches around its own shape call and answers the degradation IT declares (the ghost turn's removal, the
   *  ending and release turns' silence), so this one answers the default IT declares. */
  const readPaneSize = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    // A REALM WITH NO CROSSING: the measured default stands, stated from the ONE shared declaration rather than invented —
    // and read at the member that default's own selection names (`adjustableFigureOf`, i.e. its `height`, the stage's).
    const measured = adjustableFigureOf(defaultPaneGeometry(id))
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
   *  what an absent shape answers — the pair is COPIED, so no caller holds `DEFAULT_PANE_BOUNDS`.
   *  **AND A LAWFUL `undefined` IS ANSWERED WITH THAT SAME PAIR** (`D-186`, `D-129`; `app-layout`'s `menus-handle-drag`):
   *  a ZONE-RESIDENT pane stores NO `bounds` — its clamp is the LAYOUT's — so `paneBoundsOf(MENUS_PANE_ID)` answers
   *  `undefined` by declaration, and handing that to `clampToBounds` answers `NaN`, which makes EVERY observed move
   *  INVALID (`§3.2 F-8`) and the handle INERT with the mechanism reporting nothing. The declared pair this read already
   *  computes for its other two degradation arms is the arm that serves this one, so the three arms of one read answer ONE
   *  figure (the measured `{min: 0, max: 200}`) and the menus pane's width is clamped into it. **NOTHING IS INVENTED AND THE
   *  RECORD IS NOT OVERRIDDEN**: a pane that DOES store a pair still answers the record's, verbatim. */
  const readPaneBounds = (element: unknown, token: unknown): unknown => {
    const id = paneIdOf(element, token)
    // `bounds` IS OPTIONAL ON THE ADMITTED RECORD (`D-186`, `D-129`); the measured pair is this read's declared degradation,
    // so it is taken from the ONE shared declaration and COPIED, and the caller's pair is never a constant of that module.
    const measured = defaultPaneGeometry(id).bounds ?? DEFAULT_PANE_BOUNDS
    const fallback = { min: measured.min, max: measured.max }
    if (view === null) return fallback
    try {
      const stored = view.paneBoundsOf(id)
      // THE LAWFUL ABSENCE AND THE THROWING SHAPE ANSWER ONE PAIR — the declared degradation, never a `NaN`-making `undefined`.
      if (stored === undefined) return { min: fallback.min, max: fallback.max }
      return stored
    } catch {
      // A HOSTILE SHAPE MUST NEVER THROW OUT OF THE BOUNDS READ — the absent member's own pair, and no write.
      return { min: fallback.min, max: fallback.max }
    }
  }


  /** **THE RELEASE/RESET TERMINAL — the sink, then the `file` commit, then the `temp` ending** (design §3 `R1`–`R5`;
   *  `D-138`, `D-144`). The E10-single-sink discipline is unmoved (`final` is EXACTLY the value the sink received, the sink
   *  is invoked once), and the E3 gate is unmoved (a non-useful `final` — a non-number or `NaN` — is NEVER sent, ZERO
   *  writes). The frozen store's TWO synchronous commits (`file.settings.pane.<id>.size` then `mem.layout.pane.<id>.size`)
   *  collapsed to ONE `commitPane` on the one `file` address, and its receipt does NOT come back in this turn — it is
   *  **PUSHED** to this composition's `reportReceipt` by the client's `onWriteOutcome`, registered once at construction,
   *  so the report rides the answer's own arrival and no turn polls for one (design §2 `N2`).
   *  **AND THE RELEASE NOW ENDS THE DRAG FAMILY ITSELF** (`R5`): ONE
   *  `clearDrag()` AFTER the sink and AFTER the file commit, so the gesture's two PHASES stay distinct — `move` is the
   *  drag-update phase at `temp`, `release` is the release phase at `file` — and the ending is a THIRD statement that
   *  writes no placement, carries no geometry and judges no value (L2 §5). The two refusing arms (`R1`/`R2`) send NOTHING
   *  at all: no sink, no route, no ending. `R5` is NEVER suppressed by the flag — the flag gates the ERASE route alone. */
  const release = (gestureId: string, final: unknown, sink?: unknown): void => {
    try {
      if (typeof final !== 'number' || Number.isNaN(final)) return
      /** **THE PANE IS THE GESTURE'S KEY'S** (`app-layout`'s `menus-handle-drag`): R2's standing read, the commit and
       *  the member named below all address the pane the handle DECLARES, so the stage's release is byte-for-byte the
       *  reading it always was (its key names `DEFAULT_PANE_ID`) and the menus pane's width is committed at
       *  `['panes', 'pane-menus', 'width']`. */
      const paneId = paneOfKey(gestureId)
      const standing = readPaneSize({}, paneId)
      if (typeof standing === 'number' && Number.isFinite(standing)) {
        const narrowed = clampToBounds(standing, readPaneBounds({}, paneId))
        if (Number.isNaN(narrowed)) return
      }
      if (typeof sink === 'function') {
        ;(sink as (value: unknown) => unknown).call(null, final)
      }
      // ONE ROUTE, ONE AXIS MEMBER: the id names the pane and the figure lands at the member the pane's own `zone` makes
      // ADJUSTABLE (`{ height }` for `pane-a`, the stage-resident pane — `D-189`, `D-191` — and `{ width }` for `pane-menus`,
      // whose `zone` is `top`), which is the member the move wrote at `temp`, so the gesture and the record name one member
      // and nothing translates between them.
      // THE STATEMENT IS READ (`N1`) — a write that went nowhere is the only reading this turn will ever have of it. The
      // per-turn silence on a null `view` is the construction's one word above, pointed at rather than repeated.
      if (view !== null) reportUnreached('the pane commit', view.commitPane(paneId, { [paneMemberOf(paneId)]: final }))
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
   *  AND NO PLACEMENT WRITE**: an abandon terminal ends the family and commits nothing. Reached from `cancel`
   *  and the release (`R5`) — and from NOTHING ELSE, because `rightClick` was THIS SAME CALL and is DELETED (`D-168`):
   *  the affordance's three abandon arms all reach `cancel`, so ONE terminal is named once — and whichever of the two
   *  ending turns ends the reading FIRST is the one that sends the route. */
  const endReading = (key: string): void => {
    try {
      const prior = gestures.get(key)
      if (prior?.erased === true) return
      gestures.set(key, { erased: true })
      // THE STATEMENT IS READ (`N1`): the ending turn's write went nowhere is a fact somebody must be told. The per-turn
      // silence on a null `view` is the construction's one word above, pointed at rather than repeated.
      if (view !== null) reportUnreached('the drag clear', view.clearDrag())
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
      // **THE MEMBER'S NAME IS THE AXIS THE GESTURE MOVES** (`D-189`, `D-190`; design §4): the `['drag']` reading carries
      // the ADJUSTABLE member — `{height}` for `pane-a` — and it is a LEAF NODE on the live route (`D-134`'s node contract):
      // `data.read` answers every node as the store's own `{_tier, …}`, so the placement's figure arrives as
      // `{_tier, value: 200}` while a bare number is the same fact stated without a node (the shape a double may answer).
      // BOTH ARE READ; **a `size` member, or any member whose name is not this pane's adjustable axis, is a CLOSED ARM** —
      // it names no axis at all, so the declaration is removed rather than painted from a figure of unknown meaning.
      const carried = (member as unknown as Record<string, unknown>)[paneMemberOf(DEFAULT_PANE_ID)]
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
    move,
    release,
    cancel: (gestureId: string): void => endReading(gestureId),
    renderGhost,
  }
}

