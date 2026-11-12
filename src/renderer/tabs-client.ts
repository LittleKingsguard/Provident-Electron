// src/renderer/tabs-client.ts — THE TAB RECORD'S CLIENT (D-63's client role; `docs/L2/store-tabs-record/interface.md`
// §6). **STAGE A OF THE RENDERER MIGRATION (`strata/next-steps.md` row 1): the client APPEARS, and nothing is deleted** —
// no `TABS_CONSTRAINT`, no `readTabsRef`, no `mintTabId`, no `closeTab`, no `evaluateTabsBootStep`, no
// `driveTabsLandingPage` and no `file.tabs.*` write moves or changes on this pass; `main()`'s boot hand-off is byte-for-byte
// the boot it drove before. What this module adds is THE INSTRUMENT, and the row that consumes it is Stage B's.
//
// ⟶ **STAGE A IS SPENT AND THIS PARAGRAPH ABOVE IS ITS DATED TEXT, NOT THE FILE'S PRESENT STATE** (`D-46`: supersede the
// framing, never the dated words). Stage B landed at `D-92` — the tab machinery is derived from THIS module's reading or
// sent through the crossing's own route — and `D-93` then DELETED the frozen graph store the paragraph's `file.tabs.*`
// clause was written against: `main()`'s boot hand-off, the hydration it fed and the store itself are gone, so there is no
// `file.tabs.*` write anywhere in the renderer to move or not move. This module is now the record's ONE read surface in
// this realm and the two authored pages' driver.
//
// WHAT IT IS. A READER of the record the store owns and nothing else: it reads through `tabs.read()`, RE-READS after every
// `tabs.onChanged` delivery, and HOLDS NO SECOND RECORD — no rows, no `order`, no landing seat, and no `file.tabs.*` byte
// of its own (L2 §6: "Hold, construct or persist a second record" is the first thing the role must never do). L2 §6 names
// the duty in one line — **RE-READ AFTER EVERY `onChanged`** — and this module is that line's only implementation: the push
// carries an ADDRESS and never a value (`guide §6.4`; L2 §2), a write a pair REFUSED delivers nothing at all (D-71), and
// `repaired` is exactly the case where the record that stands is not the one the act intended (L2 §3) — so a value this
// client answers is ALWAYS one it re-read, never one it remembered and never one it composed.
//
// WHY IT EXISTS AT ALL — THE WITNESS, which is the whole value of Stage A. L2 §6 fixes the derivation from `read()`'s
// answer ALONE: the **landing** terminal stands where exactly one row reads `active: true` AND THAT ROW'S `target` IS THE
// LANDING PAGE — L2 §6's own words are "`landing` names a row reading `active: true`, and no other row does", and the fact
// that decides *the stage shows the landing content* is the active row's `target` — the landing page (`TABS_LANDING_PAGE_ID`)
// **or this realm's own no-content marker (`NEW_TAB_TARGET_PREFIX`), because a tab nobody seeded looks at the landing content
// and is still its own tab** — see the predicate's own block below for the measured defect that moved the key off the entry's
// id and for the fallback that moved the content-coercion OFF the record (`D-241`; `D-210` still owns the anti-tautology half:
// `answer.landing` is NOT consulted) — and the **error** terminal where a row carries an `error`. Both page nodes are the ENVELOPE's
// (`TABS_LANDING_PAGE_ID` / `TABS_ERROR_PAGE_ID`, `src/shared/demo-envelope.ts`) and are resolved through
// `Runtime.elementForNodeId`; this module authors no element, no class and no text — it resolves the nodes the envelope
// already carries, exactly as the wiring's landed driver does (`src/renderer/renderer.ts`'s `driveTabsLandingPage`).
//
// WHAT IT MUST NOT DO, AND DOES NOT (L2 §6's "What it must never do"). It registers no constraint at `['tabs']` and no
// second authority on `exactly-one-active` (the six pairs are the module's and the boot's batch, D-65, D-83). It writes nothing:
// **Stage A takes NO WRITE ROUTE AT ALL** — `commit` and `remove` are L2 §2's third and fourth routes and Stage B's, and a
// write site with no caller is a route nobody drives. It never notifies by writing, because a listener runs in its own
// commit (`guide §6.5`) and an `onChanged` body that wrote would be a second writer inside the one that fired it (D-71).
//
// **NO `provident-storeroom` IMPORT, AND THAT IS A GATE RATHER THAN A PREFERENCE**: `tests/e2e/central-data/scenarios.test.ts`
// asserts that the package's importers are exactly three main-side files, so a renderer import would red a gating e2e row.
// The surface below is the bridge's declared answer read through LOCAL TYPES — the `Tier1StoreSurface` precedent in
// `src/renderer/renderer.ts` — because the ambient `Window.provident` declaration is another module's bytes
// (`src/renderer/secure-panels.ts`'s `declare global`, whose `tabs?:` member is OPTIONAL and must stay optional).
//
// **THE ABSENT CASE, STATED SO IT IS ANSWERED RATHER THAN INFERRED.** `window.provident.tabs` is optional at its
// declaration, and this module is driven in three realms where it is simply NOT THERE: the node suite's layout-less
// shim (which installs a `document` and no bridge), a plain page loaded without the preload, and an older bridge that
// predates the crossing. **In all three the client answers `{ status: 'absent' }`** — a VALUE with a closed reason
// (`'no-tabs-member'` when the member is not there, `'no-read-route'` when the member is there and carries no `read`) —
// and it is NOT a refusal: L2 §3's refusal vocabulary is the store's own words, and a realm with no crossing has no store
// to have spoken. Nothing in this module throws on any of the four arms, so no caller needs a `try` to learn that the
// instrument has nothing to read.

import { TABS_ERROR_PAGE_ID, TABS_LANDING_PAGE_ID } from '../shared/demo-envelope.js'
import type { TabsRecordRow } from '../shared/types.js'

/** **THIS REALM'S OWN NO-CONTENT MARKER — ONE SPELLING, AND IT HAS TWO READERS ON PURPOSE** (`D-239`'s `+` press, and the
 *  landing witness's fallback below). This app authors no node for a new tab's content, so the string a `+` hands the act is
 *  `untitled-<n>` — a placeholder THIS REALM invented — and **that same prefix is what the landing witness reads as "the
 *  active tab is looking at the landing content"**: a new tab therefore LOOKS like the landing page without BECOMING the
 *  landing tab (its `target` stays its own, so `seatOf` still seats its own row when its chip is clicked — the defect that
 *  ended the coercion of the RECORD, `D-241`'s repair undone at this head).
 *
 *  **IT LIVES HERE BECAUSE THIS MODULE IS THE READER THE WIRING CANNOT SEE, AND THE IMPORT RUNS ONE WAY ONLY**:
 *  `src/renderer/renderer.ts` imports this module and nothing here imports the wiring, so the `+` imports this spelling and
 *  the fallback uses it in place. **A SECOND COPY ON EITHER SIDE WOULD BE THE WHOLE DEFECT BACK**: the `+` and the witness
 *  disagreeing by one character turns every fresh tab into a `display: none` stage again, and no row would say so. */
export const NEW_TAB_TARGET_PREFIX = 'untitled-'

/** THE READ ANSWER'S COMMITTED ARM — L2 §2's three members, verbatim: `order` (the record's one stored seat),
 *  `landing` (the DERIVATION of which tab is shown, never a stored pointer — D-76) and `rows` (one per tab, the state
 *  itself). A client reads all three and spells none of them. */
export type TabsCommittedAnswer = {
  readonly status: 'committed'
  readonly order: readonly string[]
  readonly landing: string
  readonly rows: readonly TabsRecordRow[]
}

/** THE READ ANSWER'S REFUSAL ARM — L2 §2/§3: every refusal is a VALUE, and its `reason` is the store's own status, or
 *  the module's `'malformed-row'` / `'seat-name'`; the client mints no refusal word of its own beyond carrying these. */
export type TabsRefusedAnswer = {
  readonly status: 'refused'
  readonly reason: string
  readonly message: string
  readonly address: readonly (string | number)[] | null
}

/** L2 §2's declared read answer — the two arms and no third. */
export type TabsReadAnswer = TabsCommittedAnswer | TabsRefusedAnswer

/** THE ENVELOPE-QUERY THE WITNESS IS RESOLVED THROUGH — `Runtime.elementForNodeId`'s declared answer (`value` or `null`),
 *  narrowed structurally so this module imports no runtime: the same narrow shape `driveTabsLandingPage` takes. */
export interface TabsNodeResolver {
  elementForNodeId(id: string): unknown | null
}

/** ONE TERMINAL'S WITNESS. `witness` is the derivation; `nodeId` is the ENVELOPE's id and never this module's spelling;
 *  `resolved` is what `Runtime.elementForNodeId` answered for it, or `null` where the witness is false (the node is not
 *  driven) or where no resolver was supplied (a node test's node-less drive). */
export interface TabsWitnessTerminal {
  readonly witness: boolean
  readonly nodeId: string
  readonly resolved: unknown
}

/** THE TWO TERMINALS, EACH CARRYING THE EVIDENCE THAT DECIDED IT. `landing.activeIds` is the row ids that read active —
 *  the count is what decides "exactly one", so a record with TWO actives answers `false` AND NAMES BOTH, which is what
 *  makes the failing case readable instead of merely red. `error.tabId` is the first row carrying an `error` token
 *  (`null` where none does), the same answer the wiring's landed driver carries. */
export interface TabsWitness {
  readonly landing: TabsWitnessTerminal & { readonly activeIds: readonly string[] }
  readonly error: TabsWitnessTerminal & { readonly tabId: string | null }
}

/** THE CLIENT'S READING — L2 §2's two arms plus the TWO STATEMENTS the client itself can make and must never hide: the
 *  member is not there (`absent`) and the route did not answer (`unread`). No arm throws, so `read()` is total. */
export type TabsClientReading =
  | (TabsCommittedAnswer & { readonly witness: TabsWitness })
  | TabsRefusedAnswer
  | { readonly status: 'absent'; readonly reason: 'no-tabs-member' | 'no-read-route' }
  | { readonly status: 'unread'; readonly reason: 'route-threw' | 'answer-not-declared'; readonly detail: string | null }

/** THE SUBSCRIPTION'S OWN ANSWER. `subscribed` is `true` exactly where the member's own `onChanged` installed this
 *  handler; `reason` names why a subscription did NOT install (`'no-tabs-member'`, `'no-changed-route'` where the member
 *  carries no such function, `'register-threw'` where it refused or threw) and is `null` when it did. `release` is the
 *  member's own withdrawal, or a declared NO-OP where nothing installed — so a caller always has something to call and
 *  a release is never a throw. */
export interface TabsSubscription {
  readonly subscribed: boolean
  readonly reason: 'no-tabs-member' | 'no-changed-route' | 'register-threw' | null
  readonly release: () => void
}

/** THE BRIDGE MEMBER THIS CLIENT USES — TWO of L2 §2's four routes and not the other two (see the header). `read`'s
 *  answer is `unknown` on purpose: a bridge is a TRUST BOUNDARY, and a shape that arrived is checked before it is read,
 *  so a member that answers a value its own declaration does not admit reaches the caller as `unread` rather than as a
 *  witness derived from a partial record. */
export interface TabsClientBridge {
  read(): Promise<unknown>
  onChanged(handler: () => void): () => void
}

export interface TabsClientOptions {
  /** The member to read through. OMITTED (and never `null`) means **read the ambient `window.provident.tabs` at each
   *  call**, which is what the app does and what a node test drives by installing (or not installing) a shim stub;
   *  `null` states the absent case on a realm where a member would otherwise be found. */
  readonly bridge?: TabsClientBridge | null
  /** The envelope-query the two terminals are resolved through. Omitted or `null` leaves every `resolved` at `null` and
   *  changes NO witness — the derivation is a claim about the RECORD, and the resolution is a claim about the ENVELOPE. */
  readonly runtime?: TabsNodeResolver | null
}

/** THE CLIENT. `read()` is the read; `subscribe()` is L2 §6's re-read-on-change duty, and the ONLY two members there are. */
export interface TabsClient {
  read(): Promise<TabsClientReading>
  subscribe(handler: (reading: TabsClientReading) => void): TabsSubscription
}

/** THE AMBIENT MEMBER, READ AT CALL TIME — never at construction, so a bridge installed after the client was built is still
 *  found, and a realm with no `window` at all (the node suite's shim installs `document` and no `window`) is the absent
 *  case rather than a `ReferenceError`. TOTAL: every step is a `typeof` guard. */
function ambientTabsMember(): unknown {
  if (typeof window === 'undefined') return null
  const provident = (window as unknown as { provident?: unknown }).provident
  if (provident === null || provident === undefined || typeof provident !== 'object') return null
  const member = (provident as { tabs?: unknown }).tabs
  return member === null || member === undefined ? null : member
}

const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'

/** Every `order` member is a tab id — a string — and every row carries a string `id`. **NO ROW IS DROPPED AND NO PARTIAL
 *  READING IS DERIVED**: a record whose rows cannot all be read is `answer-not-declared`, because dropping an unreadable
 *  row would silently change the very count the landing witness is made of. */
function committedOrDivergence(raw: Record<string, unknown>): { readonly answer: TabsCommittedAnswer } | { readonly detail: string } {
  const order = raw['order']
  if (!Array.isArray(order)) return { detail: 'order is not an array' }
  if (!order.every((id) => typeof id === 'string')) return { detail: 'order carries a non-string member' }
  const landing = raw['landing']
  if (typeof landing !== 'string') return { detail: 'landing is not a string' }
  const rows = raw['rows']
  if (!Array.isArray(rows)) return { detail: 'rows is not an array' }
  const badRow = rows.findIndex((row) => !isObject(row) || typeof row['id'] !== 'string')
  if (badRow >= 0) return { detail: `rows[${badRow}] carries no string id` }
  return {
    answer: {
      status: 'committed',
      order,
      landing,
      // Every row passed the guard above, so the whole array is the declared row set; the cast is the guard's own
      // conclusion and not a guess (`active`/`error`/`label` are read, never required, below).
      rows: rows as unknown as readonly TabsRecordRow[],
    },
  }
}

/** L2 §2's TWO ARMS, CHECKED RATHER THAN ASSUMED. A `refused` arm must carry the store's `reason` and `message` (the
 *  vocabulary is L2 §3's and this module re-spells none of it); a `committed` arm must carry the three members; anything
 *  else — a third `status`, a missing member, a `rows` that is not one row per tab — is the client's own
 *  `answer-not-declared` with the divergence named, never a witness derived from it. */
function answerOrDivergence(raw: unknown): { readonly answer: TabsReadAnswer } | { readonly detail: string } {
  if (!isObject(raw)) return { detail: `answer is ${raw === null ? 'null' : typeof raw}` }
  const status = raw['status']
  if (status === 'refused') {
    const reason = raw['reason']
    const message = raw['message']
    if (typeof reason !== 'string' || typeof message !== 'string') return { detail: 'refused arm carries no reason/message' }
    const address = raw['address']
    const carried: readonly (string | number)[] | null = Array.isArray(address)
      ? (address.filter((segment) => typeof segment === 'string' || typeof segment === 'number') as readonly (string | number)[])
      : null
    return { answer: { status: 'refused', reason, message, address: carried } }
  }
  if (status !== 'committed') return { detail: `status is ${typeof status === 'string' ? `'${status}'` : typeof status}` }
  return committedOrDivergence(raw)
}

/** **THE WITNESS PREDICATE — L2 §6, QUOTED AS IT IS DECIDED.** "(a) whether the landing terminal stands — `landing` names
 *  a row reading `active: true`, and no other row does — and (b) whether the error terminal stands — a row carries
 *  `error`." It is decided over THE ROWS and never over a list of ids: `rows` IS the state (D-76's derivation of the `landing`
 *  member is the same fact read from the other side), so "no other row does" counts ROWS, and a record carrying TWO actives
 *  answers `witness: false` with `activeIds` naming both.
 *
 *  **"Exactly one active" is ONE comparison and not two**: exactly one row reads active (`activeIds.length === 1`) AND that
 *  row's `target` IS the landing PAGE (`activeRows[0].target === TABS_LANDING_PAGE_ID`) — or this realm's own no-content
 *  marker, the fallback stated in its own paragraph below. **THE KEY IS THE TARGET AND NO LONGER THE ENTRY'S ID, AND THAT IS
 *  A MEASURED DEFECT RATHER THAN A CHANGE OF TASTE.** The comparison this block used to carry was
 *  `activeIds[0] === TABS_LANDING_ENTRY_ID` — the active row's *identity* against the landing ENTRY's id, the spelling
 *  `src/shared/tabs-landing.ts` held for both realms. **A `+` press activates a row whose id is MINTED (`tab-2`) and whose
 *  content this app never seeded**, so the id is not the landing entry, and **this predicate answered `false` over a record the
 *  stage had every reason to show**. MEASURED on a live boot: one row before the press (`landing` active, landing page
 *  `display: block`), a press reaching two rows with the new row `active: true`, and **BOTH authored terminals reading
 *  `display: none`** — the tab the user is looking at contained nothing visible at all. **What "the landing terminal stands"
 *  MEANS is "the stage shows the landing content",** so the fact that decides it is the content the active row names, and
 *  `target` is that member (a row's `target` is the content it contains; its `id` is its identity — `src/main/tabs-record/index.ts`'s
 *  spelling of the two, `D-75`, `D-76`).
 *
 *  **`answer.landing` IS STILL NOT CONSULTED, AND THE ANTI-TAUTOLOGY PROPERTY SURVIVES THE MOVE** (`D-210`): it is DERIVED
 *  as *the id of the row reading active*, so a comparison against it compares the active row's id with itself — a predicate
 *  with no false arm, which answered `witness: true` on a record whose shown tab was any tab at all. **THE NEW KEY IS STILL
 *  INDEPENDENT OF THE THING IT GUARDS**, and in one respect more plainly so: it reads a DIFFERENT ROW MEMBER (`target`, the
 *  content pointer) and compares it against a constant the ENVELOPE authors (`TABS_LANDING_PAGE_ID`, `'tabs-landing-page'`,
 *  `src/shared/demo-envelope.ts`) that no derivation in this realm produces. `landing` remains unread, and this predicate
 *  still has false arms a legal act reaches: an active row whose target is `tabs-error-page`, or a caller's own `/delta` (the
 *  target `provident.focus` was HANDED, which this realm carries unrepaired), both answer `false`. A record no legal act has
 *  left has no active row, so the count arm alone denies it and no terminal is derived, which is the intended answer and not
 *  a special case. **A RECORD SEATING TWO ACTIVES STILL ANSWERS `false` with `activeIds` naming both**, because a record with
 *  no ONE active row has no one content the stage can be said to show. An `error` token is CARRIED where the member is
 *  present and neither `null` nor `undefined` (an empty string is a token the record carries; the wiring's landed driver reads
 *  the same three lines), and the FIRST such row in `rows` order names `error.tabId`.
 *
 *  **⟶ AND THE FALLBACK IS THE COERCION, MOVED OFF THE RECORD ONTO THE CONTENT — WITH THE RECORD'S OWN `target` LEFT ALONE**
 *  (`D-241`'s repair, undone at this head). **THE SECOND ARM ANSWERS `true` FOR THIS REALM'S OWN NO-CONTENT MARKER**
 *  (`NEW_TAB_TARGET_PREFIX`, above): an active row whose `target` is `untitled-<n>` is a tab NOBODY SEEDED, so what the
 *  stage shows for it is the landing content. **WHAT THE FIXED REPAIR GOT WRONG IS THE DISTINCTION THIS FILE NOW HOLDS**: it
 *  wrote `target: TABS_LANDING_PAGE_ID` INTO the new row to get the same view, and **a row's `target` is its IDENTITY FOR
 *  THE FOCUS ACT** — `seatOf` (`src/renderer/renderer.ts`) seats the FIRST row of `order` whose `target` matches the clicked
 *  chip's string — so the coerced row and the `landing` row then carried ONE target, and **clicking the new chip seated the
 *  `landing` row**, which stands earlier in `order`: the user's report, *"clicking on any tab (including the currently active
 *  one) switches the active tab to the landing"*. The chip the user was looking at was the landing tab's seat, not its own.
 *  **THE TWO FACTS ARE DIFFERENT THINGS AND NOW LIVE IN DIFFERENT PLACES**: the record keeps the DISTINCT identity the `+`
 *  gave it (so a click addresses its own row), and this witness answers the CONTENT question (so a fresh tab paints the
 *  landing page). **MEASURED AFTER THE MOVE**: one press reaches two rows — `order: ['landing','tab-2']` with targets
 *  `'tabs-landing-page'` and `'untitled-1'` — the landing terminal reads `display: block`, a click at `tab-2`'s chip leaves
 *  `tab-2` active, and a click at `landing`'s chip moves the marker `landing`-ward.
 *
 *  **THE KEY IS THE MARKER AND NEVER "THE TARGET RESOLVES NO AUTHORED PAGE"**, and that widening was MEASURED red: gating
 *  `tests/e2e/focus-retirement/`'s `F-1` opens a row with `/delta` through `provident.focus` and asserts the row CARRIES that
 *  target untouched — a caller's string is a SEED by definition, so the app must neither rewrite it nor paint over it. Only the
 *  marker this realm itself writes means "nobody seeded this", which is why the second arm keys on it alone.
 *
 *  **AND `TABS_LANDING_ENTRY_ID` IS NO LONGER READ HERE** — this module's import of it is gone with the comparison, so the
 *  shared constant's remaining reader is the main-side record that seats the row (`src/main/tabs-record/index.ts`). That is
 *  not a lost spelling: one realm still derives the id from one place, and this realm no longer needs it, because whether a
 *  row is the landing ENTRY is not what decides whether the stage shows the landing page.
 *
 *  **THE NODES ARE THE ENVELOPE'S AND ARE RESOLVED, NEVER AUTHORED.** A false witness resolves nothing (`resolved: null` —
 *  the terminal is not driven), and a resolver that throws answers `null` for that node rather than throwing out of a read:
 *  this function is pinned TOTAL because a client's read is — which is also why a `target` that is not even a string (a hostile
 *  bridge) answers `false` instead of throwing on `.startsWith`. */
export function deriveTabsWitness(answer: TabsCommittedAnswer, runtime?: TabsNodeResolver | null): TabsWitness {
  const activeRows = answer.rows.filter((row) => row.active === true)
  const activeIds = activeRows.map((row) => row.id)
  // THE ONE COMPARISON: the single active row's CONTENT against the envelope's landing page — the landing page itself, or this
  // realm's own no-content marker, which is a tab nobody seeded and therefore one that shows the landing content. `answer.landing`
  // is never read, and a non-string target (a hostile answer) is `false` rather than a throw.
  const shown = activeRows.length === 1 ? activeRows[0]?.target : null
  const landingWitness = typeof shown === 'string' && (shown === TABS_LANDING_PAGE_ID || shown.startsWith(NEW_TAB_TARGET_PREFIX))
  let errorTabId: string | null = null
  for (const row of answer.rows) {
    const carried: unknown = row.error
    if (carried !== null && carried !== undefined) {
      errorTabId = row.id
      break
    }
  }
  const errorWitness = errorTabId !== null
  return {
    landing: {
      witness: landingWitness,
      nodeId: TABS_LANDING_PAGE_ID,
      activeIds,
      resolved: landingWitness ? resolveNode(runtime, TABS_LANDING_PAGE_ID) : null,
    },
    error: {
      witness: errorWitness,
      nodeId: TABS_ERROR_PAGE_ID,
      tabId: errorTabId,
      resolved: errorWitness ? resolveNode(runtime, TABS_ERROR_PAGE_ID) : null,
    },
  }
}

/** ONE NODE, THROUGH THE RUNTIME'S OWN QUERY — `null` where no resolver was supplied or where the query throws, never a
 *  throw out of the derivation. */
function resolveNode(runtime: TabsNodeResolver | null | undefined, nodeId: string): unknown {
  if (runtime === null || runtime === undefined) return null
  try {
    return runtime.elementForNodeId(nodeId)
  } catch {
    return null
  }
}

/** A THROWN OR REJECTED ROUTE, STATED — the message where the value has one, its spelling where it does not. */
function detailOf(error: unknown): string {
  if (error !== null && typeof error === 'object' && typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  return typeof error === 'string' ? error : 'the route rejected with no message'
}

/** **THE CLIENT FACTORY.** Two members, and both are TOTAL: `read()` answers one of L2 §6's four states, and `subscribe()`
 *  answers whether it installed and a withdrawal to call either way. Nothing here holds a record, a row, an id or an
 *  answer between calls — the caller holds what it read, and the next read replaces it. */
export function createTabsClient(options: TabsClientOptions = {}): TabsClient {
  const runtime = options.runtime ?? null
  /** The member, at THIS call: an injected one where the caller supplied one (including `null`, the stated absent case),
   *  the ambient `window.provident.tabs` otherwise. */
  const memberFor = (): unknown => (options.bridge === undefined ? ambientTabsMember() : options.bridge)

  async function read(): Promise<TabsClientReading> {
    const member = memberFor()
    if (member === null) return { status: 'absent', reason: 'no-tabs-member' }
    const readRoute = (member as { read?: unknown }).read
    if (typeof readRoute !== 'function') return { status: 'absent', reason: 'no-read-route' }
    let raw: unknown
    try {
      raw = await (readRoute as () => Promise<unknown>).call(member)
    } catch (error) {
      // A ROUTE THAT THREW IS A STATEMENT ABOUT THE TRANSPORT, NOT ABOUT THE RECORD: the store never refused anything here,
      // so this is `unread` and never `refused`, and the caller learns the record is unknown instead of assuming it is empty.
      return { status: 'unread', reason: 'route-threw', detail: detailOf(error) }
    }
    // THE ANSWER IS READ INSIDE A GATE, BECAUSE READING IT IS ITSELF A TRUST BOUNDARY: `status`, `order`, `landing` and
    // `rows` are four GETTERS on an object this module did not build, so an answer whose own member THROWS on the read is
    // the same class as a route that threw — `unread`, with the throw's own message as the detail. Without the gate a
    // hostile member would reject the promise and make `read()` a route a caller has to `try`, which is the one thing L2 §6's
    // client must not be (an IPC crossing delivers plain data by structured clone, so this arm is the boundary's shape
    // stated rather than a path the app meets).
    let resolved: ReturnType<typeof answerOrDivergence>
    try {
      resolved = answerOrDivergence(raw)
    } catch (error) {
      return { status: 'unread', reason: 'answer-not-declared', detail: detailOf(error) }
    }
    if ('detail' in resolved) return { status: 'unread', reason: 'answer-not-declared', detail: resolved.detail }
    if (resolved.answer.status === 'refused') {
      return { status: 'refused', reason: resolved.answer.reason, message: resolved.answer.message, address: resolved.answer.address }
    }
    let witness: TabsWitness
    try {
      witness = deriveTabsWitness(resolved.answer, runtime)
    } catch (error) {
      return { status: 'unread', reason: 'answer-not-declared', detail: detailOf(error) }
    }
    return { ...resolved.answer, witness }
  }

  function subscribe(handler: (reading: TabsClientReading) => void): TabsSubscription {
    const noop = (): void => undefined
    const member = memberFor()
    if (member === null) return { subscribed: false, reason: 'no-tabs-member', release: noop }
    const changedRoute = (member as { onChanged?: unknown }).onChanged
    if (typeof changedRoute !== 'function') return { subscribed: false, reason: 'no-changed-route', release: noop }
    let withdrawn: unknown
    try {
      withdrawn = (changedRoute as (h: () => void) => unknown).call(member, () => {
        // **THE DUTY, IN ONE LINE (L2 §6): RE-READ AFTER EVERY DELIVERY.** The delivery carries an address and not a
        // value, so the only correct answer to it is a fresh `read()`; the caller is handed THAT reading and this module
        // keeps nothing. A handler's own throw is the handler's: it is caught here so it cannot become an unhandled
        // rejection out of a subscription, and a read that somehow rejected is caught for the same reason (the read
        // itself is total, so that arm is defence and not a path any arm below relies on).
        void read().then(
          (reading) => {
            try {
              handler(reading)
            } catch {
              /* the caller's handler, the caller's error */
            }
          },
          () => undefined,
        )
      })
    } catch {
      return { subscribed: false, reason: 'register-threw', release: noop }
    }
    const bridgeWithdrawal = typeof withdrawn === 'function' ? (withdrawn as () => void) : noop
    return {
      subscribed: true,
      reason: null,
      release: () => {
        try {
          bridgeWithdrawal.call(member)
        } catch {
          /* a withdrawal that threw has still withdrawn nothing further; it never escapes here */
        }
      },
    }
  }

  return { read, subscribe }
}
