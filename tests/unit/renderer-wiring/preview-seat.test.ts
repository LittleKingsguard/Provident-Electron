// tests/unit/renderer-wiring/preview-seat.test.ts — **THE SEAT** (`D-145`; `docs/L3/renderer-wiring/design.md` §8's owed row).
//
// THE SUBJECT, AND WHY NOTHING ELSE IN THIS TREE COULD MEASURE IT. `startGutterAffordance` is the wiring that holds the
// gesture's ONE WRITE SEAT: its `applyPreview` is the affordance's one preview call, and from there the routes are
// ADDED to the inline-style write rather than substituted for it (`§2` `P3`–`P5`). NO battery in this tree constructs it
// — `tests/gutter-ui.test.ts` drives `createGutterAffordance`'s own mechanism, and every drag row constructs
// `createPaneDrag` directly — so `P4` (an observed move's placement change), `P5` (the revert), the presentation gate
// `P1`/`P2` that precedes both, and the ONE constant `GESTURE_KEY` handed at BOTH seats are unmeasured. This file is the
// instrument §8 named and fixed the shape of, and it drives the wiring through its DECLARED ENTRY POINT only.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked-file` marker and GATES (`D-40`): it is UNMARKED, has
// no carve-out, and is meant to be able to fail — a green here is evidence about a battery, not a re-statement of one.
//
// THE HARNESS, AS §8 FIXES IT. A stub runtime answers `elementForNodeId` with an element double for EVERY node id
// `demoEnvelope()` AUTHORS (minted lazily, one object per id, so the wiring's reads and the rows' `press()`/`moveAt()` speak
// to the SAME double) and `null` for anything else — so the source this harness models is the graph a boot renders, and a
// handle the envelope gains needs no edit here (`app-layout`'s `menus-handle-drag`: the wiring went from ONE address to a
// declared LIST, and a harness holding its own literal copy of that list would be the second answer the list deleted). It
// RECORDS every read WITH its answer, so "resolved to nothing" is a reading and not an assumption. Each double carries
// `addEventListener`/`getAttribute`/`style`, so the wiring's own event source (`domEventSource`) and its attribute-reading
// seams are exercised rather than replaced, and the runtime records its `applyCommand` calls. A stub `window.provident`
// carries the `view` member (seven routes, each counted — that counting IS the (a)/(b)/(c) reading) and the `data` member
// the ghost's one read rides. Then `startGutterAffordance(runtime)` is called and a gesture is driven through the STAGE
// handle's own listeners: `pointerdown` establishes, `pointermove` is an observed move, `pointerup` is the release,
// `pointercancel` is the cancel.
//
// WHAT THIS GREEN IS WORTH (`AGENTS.md`, D-27): the module rows run under no layout and no renderer, so this is
// envelope-green — the seat's DECISIONS and its two routes, never a rendered surface. The live legs carry no pointer event
// at all (`§7`), which is exactly why the seat needed a node instrument.
//
//   · `PS-1` — **EVERY DECLARED HANDLE IS RESOLVABLE, AND THE DECLARATION IS THE ENVELOPE'S** — driven, then, at the stage
//     handle: a VALID observed move sends ONE `commitDrag(DEFAULT_PANE_ID, {height})` and NO `clearDrag`, the pane's
//     ADJUSTABLE member, whose NAME is its axis (`D-189`, `D-190`). **THE SUBJECT IS NOT "THE EXACT LIST OF IDS THE WIRING
//     RESOLVES"** (`app-layout`'s `menus-handle-drag`, this row's re-grain): the wiring now resolves `[gutter-target,
//     gutter-horizontal, menus-vertical]` because the gesture was generalised into a declared list, and a literal list here
//     would need editing per handle — a row edited per handle is a row edited carelessly, and a list nobody re-reads is a
//     list that stops measuring at its second entry. So the row reads the wiring's OWN per-declaration reading
//     (`handles`), asserts each entry resolved to an ELEMENT and attached, and censuses the declaration against the handles
//     `demoEnvelope()` AUTHORS — in both directions, with a control proving the census bites. It reds on a declared handle
//     that fails to resolve, on one that resolves to nothing, and on a declaration and an envelope that disagree.
//   · `PS-2` — a REVERT sends ONE `clearDrag` and NO `commitDrag`.
//   · `PS-3` — a SECOND ending turn sends NOTHING — the ONE `clearDrag` the flag owns, and NO `applyCommand` at all: the app
//     hands the release no sink (`D-129`), so this row's `commands` reading is `0` where the seat's one sink write used to be.
//   · `PS-4` — the ghost turn is RETURNED, and BOTH seats carry the SAME key.
//   · `PS-5` — **THE STATEMENT'S READER, SYNCHRONOUS** (`docs/L3/renderer-wiring/design.md` §2 `N1`; `D-126`'s `F10`,
//     `D-167`'s routing): the three routes' `{status:'absent'}` is a write that went NOWHERE, so `move`, `release` and
//     `endReading` each `console.warn` once, with the `reason` verbatim and the turn's own `what` spelling; a
//     `sent`-answering member warns nothing; and a `null` `view` says it ONCE at construction, the three per-turn
//     statements staying silent by design.
//   · `PS-6` — **THE RECEIPT'S PUSH, ASYNCHRONOUS** (§2 `N2`; L2 §9): the one register a construction takes reports
//     `refused` as an error carrying `reason`/`message`, `unread` as a warning, and stays silent on `committed` — and it
//     is SCOPED to the `pane` and `drag` route words, so a `zone` and a `theme` refusal of the same shape is not this
//     realm's news.
//
// **THE CONSOLE IS READ THROUGH A SPY AND NOT THROUGH A REDIRECT** (`RS-6`'s idiom, followed rather than re-invented): both
// members are spied and MUTED, the messages collected, and the spies restored in a `finally` — each row then reads
// `vi.isMockFunction` to prove the globals are the real functions again, because a spy left behind would silence every
// later file's report.

import { afterEach, describe, expect, it, vi } from 'vitest'

import { createPaneDrag, startGutterAffordance } from '../../../src/renderer/renderer.js'
import type { PaneGestureReading } from '../../../src/renderer/renderer.js'
import { createViewClient } from '../../../src/renderer/view-client.js'
import type { Runtime } from '../../../src/renderer/runtime.js'
import { DECLARED_PANE_IDS, DEFAULT_PANE_ID } from '../../../src/shared/view-shape.js'
import { demoEnvelope, GUTTER_AFFORDANCE_ID, GUTTER_STATUS_ID, GUTTER_TARGET_ID } from '../../../src/shared/demo-envelope.js'

/** **THE CENSUS'S TWO SIDES, BOTH DERIVED AND NEITHER A LITERAL.** The envelope's authored handle nodes are read off
 *  `demoEnvelope()`'s own DATA at module load, once, so `PS-1` compares the wiring's declaration against the tree a boot
 *  renders rather than against a second hand-kept copy of the same names — a copy would agree with a wrong list, which is
 *  `PM-1`'s idiom and its reason. */
const ENVELOPE_NODES: readonly unknown[] = envelopeNodesOf(demoEnvelope())

/** Every node id the envelope authors (`css.id` and `props.id`, deduplicated) — **THE GRAPH THIS FILE'S STUB ANSWERS FOR**:
 *  an id here is an element a boot renders, an id it does not carry is an element no boot renders. Read once and shared by
 *  the census and the harness, so the two cannot disagree about what the envelope authored. */
const AUTHORED_NODE_IDS: ReadonlySet<string> = new Set(authoredNodeIdsOf(ENVELOPE_NODES))

/** **EVERY OBJECT THE ENVELOPE'S DATA REACHES, IN DOCUMENT ORDER AND EACH ONE ONCE** — the walk both readings below make. It
 *  descends `children`, a prototype's `component.value` and anything else the literal carries, because a handle authored
 *  inside any of those is a handle the wiring must carry: a walk that knew the tree's one shape would go blind the day the
 *  shape moved, which is the failure a census exists to refuse. Cycles are guarded by IDENTITY, never by depth. */
function envelopeNodesOf(value: unknown): unknown[] {
  const out: unknown[] = []
  const seen = new Set<unknown>()
  const visit = (candidate: unknown): void => {
    if (candidate === null || typeof candidate !== 'object') return
    if (seen.has(candidate)) return
    seen.add(candidate)
    out.push(candidate)
    const entries: readonly unknown[] = Array.isArray(candidate)
      ? candidate
      : Object.values(candidate as Record<string, unknown>)
    for (const entry of entries) visit(entry)
  }
  visit(value)
  return out
}

/** One node's authored ids — `css.id` and `props.id`, the two members the envelope spells the same string into for every
 *  addressable element (`AGENTS.md`'s UI-authority rule: an element is provident DATA, and its address is authored here). */
function idsOf(node: unknown): string[] {
  const holder = node as { readonly css?: { readonly id?: unknown }; readonly props?: { readonly id?: unknown } } | null
  const out: string[] = []
  for (const candidate of [holder?.css?.id, holder?.props?.id]) {
    if (typeof candidate === 'string' && candidate !== '') out.push(candidate)
  }
  return out
}

/** **THE NODE IDS THE ENVELOPE AUTHORS**, deduplicated, in document order. */
function authoredNodeIdsOf(nodes: readonly unknown[]): string[] {
  const out: string[] = []
  for (const node of nodes) for (const id of idsOf(node)) if (!out.includes(id)) out.push(id)
  return out
}

/** **THE HANDLES THE ENVELOPE AUTHORS** — a node carrying a `props.axis` STRING, reported by its own id. That member is the
 *  affordance's `axisOf` seam's one input (`src/shared/demo-envelope.ts`'s `axisOf`, which reads it as the bare `axis`
 *  attribute); it is what makes a bar a HANDLE rather than a box; and the two authored handles carry it and no other node in
 *  the tree does (`D-189`, `D-192`) — so it, and not a class token nothing reads, is the marker this census keys on. A node
 *  carrying an axis and no id is reported as a named problem rather than dropped: an unaddressable handle is one the wiring
 *  cannot declare. */
function authoredHandlesOf(nodes: readonly unknown[]): { readonly handles: string[]; readonly problems: string[] } {
  const handles: string[] = []
  const problems: string[] = []
  for (const node of nodes) {
    const axis = (node as { readonly props?: { readonly axis?: unknown } } | null)?.props?.axis
    if (typeof axis !== 'string' || axis === '') continue
    const id = idsOf(node)[0]
    if (id === undefined) {
      problems.push(`the envelope authors a handle on the axis ${axis} and spells NO id for it: an unaddressable handle is one the wiring cannot declare`)
      continue
    }
    handles.push(id)
  }
  return { handles, problems }
}

/** **`PS-1`'S CENSUS COMPARATOR — THE DECLARED LIST AGAINST THE ENVELOPE'S AUTHORED HANDLES, AS A SUM OF NAMED PARTS**, in
 *  both directions and with the duplicate and empty arms that a set comparison cannot see (`pane-node-map.test.ts`'s `PM-1`
 *  comparator, for the same vacuity reasons). Every line NAMES the handle it is about, so a red is a sentence and not a moved
 *  count (`D-168`). */
function handleCensusDivergences(
  declared: readonly Pick<PaneGestureReading, 'handleId'>[],
  authored: readonly string[],
): string[] {
  const out: string[] = []
  const declaredIds = declared.map((handle) => handle.handleId)
  for (const id of authored) {
    if (declaredIds.includes(id)) continue
    out.push(`${id} — the envelope authors this HANDLE and \`PANE_DRAG_HANDLES\` carries no entry for it: an authored strip with no gesture is a pressable bar that can never move its pane`)
  }
  for (const id of declaredIds) {
    if (authored.includes(id)) continue
    out.push(`${id} — \`PANE_DRAG_HANDLES\` declares this handle and the envelope authors NO element under that id: its element cannot resolve, so its affordance is the inert refusal \`D-117\` names`)
  }
  for (const id of [...new Set(declaredIds)]) {
    const times = declaredIds.filter((carried) => carried === id).length
    if (times > 1) out.push(`${id} — declared by ${String(times)} entries: one authored handle with two entries is two affordances on ONE element, and a SET comparison cannot see it`)
  }
  if (authored.length === 0) out.push('the envelope authors NO handle — two empty sides compare equal and prove nothing')
  if (declaredIds.length === 0) out.push('`PANE_DRAG_HANDLES` declares NO handle — the comparison would pass on nothing at all')
  return out
}

/** The divergences a given id is named in — the control reads the reds by NAME rather than by their count. */
function namedIn(divergences: readonly string[], id: string): readonly string[] {
  return divergences.filter((line) => line.startsWith(`${id} —`))
}

/** **THE ELEMENT DOUBLE — the three members §8 fixes, plus the one the event source consults before it will install a
 *  gesture.** `addEventListener`/`removeEventListener` are the wiring's own event source's only surface
 *  (`domEventSource`), `getAttribute` is what the authored-seam example reads (`props` land as bare attributes), and
 *  `style` is where BOTH presentation arms write: the preview's `setProperty('width', …)` and the cursor's own member.
 *  `setAttribute`/`removeAttribute` are the ghost declaration's, which are not this file's subject but must be present
 *  for the returned turn to be callable at all. **AND `isConnected` IS MEASURED, NOT DECORATION** (`F-9`): the session
 *  asks it once per `begin` and only an exact `false` refuses the gesture, so a double without it is a DISCONNECTED
 *  element — every gesture refused before a listener fires, and this file's four clauses would all read zero for a reason
 *  none of them is about (`domEventSource.isConnected` answers `false` for an attribute-less holder: MEASURED here). */
interface ElementDouble {
  readonly handlers: Map<string, ((event: unknown) => void)[]>
  readonly attributes: Map<string, string>
  readonly style: { width?: string; cursor?: string; setProperty(property: string, text: string): void }
  readonly isConnected: true
  addEventListener(type: string, handler: (event: unknown) => void): void
  removeEventListener(type: string, handler: (event: unknown) => void): void
  getAttribute(name: string): string | null
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
  /** Fire one event at the listeners registered for it, in REGISTRATION ORDER — the ordering the mechanism depends on
   *  (`§2.3` row 8: this module's own move turn is registered before the session's wrapped one). The list is copied
   *  first, because a handler may detach its siblings in the same turn (the reset arm's terminal does exactly that). */
  fire(type: string, event: unknown): void
}

function elementDouble(): ElementDouble {
  const handlers = new Map<string, ((event: unknown) => void)[]>()
  const attributes = new Map<string, string>()
  const style: ElementDouble['style'] = {
    width: '',
    cursor: '',
    setProperty(property: string, text: string): void {
      ;(style as unknown as Record<string, string>)[property] = text
    },
  }
  return {
    handlers,
    attributes,
    style,
    isConnected: true,
    addEventListener(type: string, handler: (event: unknown) => void): void {
      const held = handlers.get(type)
      if (held === undefined) handlers.set(type, [handler])
      else held.push(handler)
    },
    removeEventListener(type: string, handler: (event: unknown) => void): void {
      handlers.set(type, (handlers.get(type) ?? []).filter((candidate) => candidate !== handler))
    },
    getAttribute(name: string): string | null {
      const held = attributes.get(name)
      return held === undefined ? null : held
    },
    setAttribute(name: string, value: string): void {
      attributes.set(name, value)
    },
    removeAttribute(name: string): void {
      attributes.delete(name)
    },
    fire(type: string, event: unknown): void {
      for (const handler of [...(handlers.get(type) ?? [])]) handler(event)
    },
  }
}

/** **THE ROUTES' OWN CALL LOG — the four counters assertions (a)/(b)/(c) ARE.** A `clearDrag()` carries no id and no
 *  geometry and its entry says so rather than borrowing a pane id (`theme-act`'s `A-5` convention); `dragReads` is the
 *  ghost's one read, recorded by payload so (d) can state the address it names. */
interface Routes {
  readonly commitDrag: [string, unknown][]
  /** The ending's own count: mutable, because every call moves it. */
  clearDrag: number
  readonly commitPane: [string, unknown][]
  readonly dragReads: unknown[]
}

/** **THE ONE DEGRADATION `PS-5` DRIVES, AND NOTHING ELSE**: the member that answered while the three write routes are
 *  NOT THERE — `no-route`, which `C-9`(b) calls *an older preload*. Absent by default, so `PS-1`…`PS-4` construct exactly
 *  the member they always did. */
interface SeatOptions {
  readonly withoutWriteRoutes?: boolean
}

interface Seat {
  /** **THE WIRING'S OWN READING, WHOLE** — `attached` (the first entry's, as the return contract declares) and `handles`,
   *  one record per DECLARED entry, in the list's order. `PS-1` reads the declaration through `handles` and never through a
   *  literal of this file's: a second copy of the list is the second authority the list deleted. */
  readonly started: {
    readonly attached: boolean
    readonly handles: readonly PaneGestureReading[]
    readonly renderGhost: () => void
  }
  readonly routes: Routes
  /** **EVERY `applyCommand` THE WIRING MADE** — and after `D-129` that is the READ-OUT'S turn (`renderPaneSize`, this file's
   *  sibling `RS-1`) and nothing in the gesture: the seat's `commit` seam omits `release`'s third argument, so `R3` sends no
   *  write and this counter is the row's statement that the deleted second authority has not come back. */
  readonly commands: unknown[]
  /** Every id the wiring resolved through `elementForNodeId`, in order: the graph read, never a selector. */
  readonly resolved: string[]
  /** **WHAT THE GRAPH ANSWERED FOR EACH ID IT WAS ASKED FOR** — `null` included, and `has` distinguishes "answered nothing"
   *  from "was never asked". A resolution list alone cannot tell a handle that resolved from one the runtime was asked
   *  about and could not place, and "resolves to NOTHING" is the arm `D-117`'s refusal is made of. */
  readonly answered: ReadonlyMap<string, unknown>
  readonly affordance: ElementDouble
  readonly target: ElementDouble
  readonly status: ElementDouble
  /** The gesture's four turns, driven at the AFFORDANCE ELEMENT the wiring attached to. */
  press(): void
  moveAt(clientX: number): void
  end(): void
  cancel(): void
}

/** **THE HARNESS §8 FIXES, IN ONE PLACE**: the stub runtime, the stub bridge, the element source, and the construction. It is
 *  built per row so each row's counters start at zero and no row inherits another's gesture. */
function seat(options: SeatOptions = {}): Seat {
  const routes: Routes = { commitDrag: [], clearDrag: 0, commitPane: [], dragReads: [] }
  /** **THE `view` MEMBER — seven routes, each counted.** The client reads the ambient member AT CALL TIME, so this object
   *  is the app's own bridge and not an injected one; the reads the drag needs (`paneSizeOf`/`paneBoundsOf`) are the
   *  shape's and answer the MEASURED DEFAULT on a shape nothing has filled — which is why the arithmetic below is
   *  `view-shape.ts`'s measured `100` (`DEFAULT_PANE_SIZE`, the figure `D-87` measured off the authored pane) and not a
   *  number this file invented. **IT IS NOT THE ENVELOPE'S**: no envelope node has authored that figure since `F11`
   *  (`D-129`, `D-171`). */
  const view: Record<string, unknown> = {
    read: async (): Promise<unknown> => ({ status: 'committed' }),
    commitZones: async (): Promise<unknown> => ({ status: 'committed' }),
    commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
    onChanged: (): (() => void) => (): void => undefined,
  }
  if (options.withoutWriteRoutes !== true) {
    view['commitPane'] = async (id: string, geometry: unknown): Promise<unknown> => {
      routes.commitPane.push([id, geometry])
      return { status: 'committed' }
    }
    view['commitDrag'] = async (id: string, geometry: unknown): Promise<unknown> => {
      routes.commitDrag.push([id, geometry])
      return { status: 'committed' }
    }
    view['clearDrag'] = async (): Promise<unknown> => {
      routes.clearDrag += 1
      return { status: 'committed' }
    }
  }
  /** **THE `data` MEMBER** — the ghost turn's ONE read route (`D-112`'s pass-through). It answers a ledger arm, so the
   *  turn's own painting decision stays `DC-8(a)`'s subject and this file measures only that the RETURNED member is what
   *  asks. */
  const data = {
    read: async (payload: unknown): Promise<unknown> => {
      routes.dragReads.push(payload)
      return { status: 'absent', reason: 'no-drag' }
    },
    write: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-drag' }),
    delete: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-drag' }),
    list: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-drag' }),
    journal: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-drag' }),
  }
  ;(globalThis as Record<string, unknown>)['window'] = { provident: { view, data } }

  /** **THE ELEMENT SOURCE IS THE ENVELOPE'S GRAPH AND NOT A LITERAL PAIR OF IDS.** A double is minted for every node id
   *  `demoEnvelope()` AUTHORS — lazily, kept by id, so the wiring's reads and the rows' `press()`/`moveAt()` speak to the
   *  SAME object — and an id the envelope does not author answers `null`, which is the `attach()`-refused arm `D-117` names.
   *  **WHY THE AUTHORED SET AND NOT A LIST HERE**: the wiring resolves its handles from `PANE_DRAG_HANDLES`, so a harness
   *  seeding its own hand-kept list would go stale at the SECOND handle and read as a wiring that resolved nothing — the
   *  double is the element a boot renders, and where the envelope authors one, a boot renders one. */
  const elements = new Map<string, ElementDouble>()
  const elementOf = (id: string): ElementDouble => {
    const held = elements.get(id)
    if (held !== undefined) return held
    const fresh = elementDouble()
    elements.set(id, fresh)
    return fresh
  }
  const commands: unknown[] = []
  const resolved: string[] = []
  const answered = new Map<string, unknown>()
  const runtime = {
    elementForNodeId(id: string): unknown {
      resolved.push(id)
      // the ANSWER is recorded with the read: `null` here is a resolution that produced nothing, not an unasked id.
      const held = AUTHORED_NODE_IDS.has(id) ? elementOf(id) : null
      answered.set(id, held)
      return held
    },
    applyCommand(command: unknown): { readonly status: string } {
      commands.push(command)
      return { status: 'applied' }
    },
  }
  const started = startGutterAffordance(runtime as unknown as Runtime)
  /** The three doubles the rows name, READ OUT OF THE ONE ELEMENT SOURCE — the same objects the wiring was handed, because
   *  `elementOf` is keyed by id and every call answers the entry it minted first. */
  const affordance = elementOf(GUTTER_AFFORDANCE_ID)
  const target = elementOf(GUTTER_TARGET_ID)
  const status = elementOf(GUTTER_STATUS_ID)
  return {
    started,
    routes,
    commands,
    resolved,
    answered,
    affordance,
    target,
    status,
    press: (): void => affordance.fire('pointerdown', { button: 0 }),
    moveAt: (clientX: number): void => affordance.fire('pointermove', { clientX, clientY: 0 }),
    end: (): void => affordance.fire('pointerup', { clientX: 250, clientY: 0 }),
    cancel: (): void => affordance.fire('pointercancel', {}),
  }
}

/** **THE CONSOLE, SPYED AND MUTED, WITH ITS RESTORE MEASURED** (`RS-6`'s idiom — this tree's first console reading, followed
 *  rather than re-invented): the two messages a report can be, and a `restore` the caller owes in a `finally`. The rows
 *  below then read `vi.isMockFunction` to prove the globals are the REAL functions again — a spy left standing would
 *  silence every later file's report, and a row that did not check would never know. */
interface ConsoleCapture {
  readonly errors: string[]
  readonly warns: string[]
  restore(): void
}

function captureConsole(): ConsoleCapture {
  const errors: string[] = []
  const warns: string[] = []
  const errorSpy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    errors.push(args.map((arg) => String(arg)).join(' '))
  })
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warns.push(args.map((arg) => String(arg)).join(' '))
  })
  return {
    errors,
    warns,
    restore(): void {
      errorSpy.mockRestore()
      warnSpy.mockRestore()
    },
  }
}

/** The rows install the ambient bridge per row and withdraw it after, exactly as `tests/theme-act.test.ts` installs its
 *  crossing: a node realm has no `window` of its own, and a member left standing would be the next row's. */
afterEach(() => {
  delete (globalThis as Record<string, unknown>)['window']
})

/** The ghost turn settles on a promise it does not await, so a row that reads its route waits one macrotask. */
const flushed = (): Promise<void> => new Promise<void>((resolve) => { setTimeout(resolve, 0) })

describe('D-145 · `docs/L3/renderer-wiring/design.md` §8 — the seat, driven through `startGutterAffordance`', () => {
  it('PS-1 — **EVERY DECLARED HANDLE IS RESOLVABLE, AND THE DECLARATION IS THE ENVELOPE\'S — and a VALID OBSERVED MOVE then sends ONE `commitDrag(DEFAULT_PANE_ID, {size})` and NO `clearDrag`**: the declaration is read through the wiring\'s OWN per-entry reading (`handles`) and censused against the handles `demoEnvelope()` AUTHORS, so a third handle costs a line in the list and no edit in this row — while a declared handle that fails to resolve, one that resolves to NOTHING, and a list that disagrees with the envelope each red here by NAME. The gesture clause is unchanged: the preview seam\'s `P4` arm is the WHOLE placement change, so the family is written once per observed move, naming the COMPOSITION\'s pane and the CLAMPED value the affordance computed — and an ending there would end the reading the move had just written', () => {
    const live = seat()
    const declared = live.started.handles

    // ─── (a) THE DECLARATION, READ OFF THE WIRING ────────────────────────────────────────────────────────────────────────
    expect(
      live.started.attached,
      'PS-1 — `attached` is the wiring\'s own reading and the precondition every clause below rides: a REFUSED `attach()` leaves the drag INERT (`D-117`), and a route missing for that reason would be misread here as a seat that never fired',
    ).toBe(true)
    expect(
      declared.length,
      'PS-1 — **the declaration is not EMPTY**: a list the row cannot read is a list it would pass on silence, which is the vacuity this row replaces the old literal with and must not re-introduce',
    ).toBeGreaterThan(0)
    expect(
      declared[0]?.attached,
      'PS-1 — and the returned `attached` IS the FIRST entry\'s reading, as the return contract declares, so the member every existing reader trusts still names the stage handle (the constant `GESTURE_KEY` used to spell)',
    ).toBe(live.started.attached)

    // ─── (b) THE GRAPH READ: THE TARGET ONCE, THEN EVERY DECLARED HANDLE, IN DECLARATION ORDER ──────────────────────────
    // The expected side is DERIVED from the declaration and never spelled here. It is not vacuous: `resolved` is the
    // runtime's log of what was ASKED, `handles` is the wiring's report of what it DECLARED, and the two are produced by
    // different turns — so a handle declared and never resolved, resolved twice, or resolved in another order each red
    // below, and a handle dropped from the list entirely is caught by the census in (d).
    expect(
      live.resolved,
      'PS-1 — the elements the wiring resolves are the graph read, by id and in the order the closure takes them — the composition\'s ONE target first, then one read per declared handle — never a selector and never a created element',
    ).toEqual([GUTTER_TARGET_ID, ...declared.map((handle) => handle.handleId)])

    // ─── (c) EVERY DECLARED HANDLE, BY NAME: ASKED, ANSWERED AN ELEMENT, AND ATTACHED ──────────────────────────────────
    for (const handle of declared) {
      expect(
        live.answered.has(handle.handleId),
        `PS-1 — the wiring ASKED the graph for the declared handle ${handle.handleId}: a declaration no read answers is a handle nobody wired`,
      ).toBe(true)
      expect(
        live.answered.get(handle.handleId),
        `PS-1 — and the graph ANSWERED it an ELEMENT — \`null\` here would be the declared handle ${handle.handleId} resolving to NOTHING, the inert strip \`D-117\` names, whose presses no listener hears`,
      ).not.toBeNull()
      expect(
        handle.attached,
        `PS-1 — and ${handle.handleId}'s affordance ATTACHED: the element is resolvable AND live, so its gesture is installed rather than merely found`,
      ).toBe(true)
    }

    // ─── (d) THE CENSUS: THE DECLARATION AGAINST THE ENVELOPE'S AUTHORED HANDLES, IN BOTH DIRECTIONS ────────────────────
    const authored = authoredHandlesOf(ENVELOPE_NODES)
    expect(
      authored.problems,
      'PS-1 — every authored handle SPELLS AN ID: a handle on an axis with no address is one the wiring could not declare even if it wanted to',
    ).toEqual([])
    expect(
      authored.handles.length,
      'PS-1 — the envelope authors at least one handle, so the census has two sides',
    ).toBeGreaterThan(0)
    expect(
      handleCensusDivergences(declared, authored.handles),
      `PS-1 — **the declared list IS the envelope's authored handles**: each authored handle carries an entry (no authored strip is left without a gesture) and each entry names an authored handle (no declared handle's element is missing), compared as a sum of NAMED parts — ${JSON.stringify(declared.map((handle) => handle.handleId))} against ${JSON.stringify(authored.handles)}`,
    ).toEqual([])
    // AND THE PANE SIDE IS THE RECORD'S, NOT THIS FILE'S: an entry naming a pane `view-shape.ts` does not declare would
    // address a pane no family answers, which the composition would then have to invent a default for.
    for (const handle of declared) {
      expect(
        [...DECLARED_PANE_IDS],
        `PS-1 — the handle ${handle.handleId} addresses the pane ${handle.paneId}, which \`DECLARED_PANE_IDS\` declares`,
      ).toContain(handle.paneId)
    }

    // ─── (e) THE CENSUS CAN BITE — the control, over fixtures in the declaration's own shape ─────────────────────────────
    // A control reading the tree's own declaration would red beside (d) and hide which arm bit (`PM-3`'s reason for its
    // fixture domain), so the ids below are NEUTRAL: this arm measures the comparator, never the list.
    const fixtureDeclaration = [{ handleId: 'handle-a' }, { handleId: 'handle-b' }]
    const fixtureAuthored = ['handle-a', 'handle-b']
    expect(
      handleCensusDivergences(fixtureDeclaration, fixtureAuthored),
      'PS-1(e) — the comparator PASSES on a declaration that agrees with its envelope: without this arm every red below could be a comparator that only knows how to say no',
    ).toEqual([])
    const third = handleCensusDivergences(fixtureDeclaration, [...fixtureAuthored, 'handle-c'])
    expect(
      namedIn(third, 'handle-c'),
      'PS-1(e) — **an authored handle with NO declared entry reds, and is NAMED**: that is a third authored strip the wiring does not carry, the defect `app-layout`\'s `menus-handle-drag` was filed for',
    ).toHaveLength(1)
    expect(third, 'PS-1(e) — one divergence and no more: the authored third is the only disagreement').toHaveLength(1)
    const vanished = handleCensusDivergences(fixtureDeclaration, ['handle-a'])
    expect(
      namedIn(vanished, 'handle-b'),
      'PS-1(e) — and a DECLARED handle the envelope authors nowhere reds, NAMED: its element cannot resolve, which is the `null` arm of (c)',
    ).toHaveLength(1)
    const duplicated = handleCensusDivergences([{ handleId: 'handle-a' }, { handleId: 'handle-a' }], ['handle-a', 'handle-b'])
    expect(
      namedIn(duplicated, 'handle-a'),
      'PS-1(e) — a DUPLICATED entry reds even where both SETS agree: two entries on one authored handle are two affordances on one element',
    ).toHaveLength(1)
    // THE VACUITY ARMS — one per side, without which a deleted list and an emptied envelope would compare equal.
    for (const arm of [handleCensusDivergences([], []), handleCensusDivergences([], fixtureAuthored), handleCensusDivergences(fixtureDeclaration, [])]) {
      expect(
        arm.length,
        'PS-1(e) — **an EMPTY side is a divergence**, so two empty sets cannot compare equal and a deleted list cannot pass as an agreed one',
      ).toBeGreaterThan(0)
    }
    expect(
      handleCensusDivergences([], []).length,
      'PS-1(e) — both empty sides red TWICE (one term per side), so the vacuity is named on each rather than once',
    ).toBe(2)
    expect(
      handleCensusDivergences([], []).join(' | '),
      'PS-1(e) — and each of the two empty-side terms says which side it is about, so a reader is told what is missing and not that something is',
    ).toContain('NO handle')

    // ─── (f) THE GESTURE, DRIVEN AT THE STAGE HANDLE — unchanged by the generalisation ─────────────────────────────────
    live.press()
    live.moveAt(250)

    expect(
      live.routes.commitDrag,
      'PS-1 — ONE write per placement change, at the composition\'s pane (the measured `DEFAULT_PANE_ID`, not the authored element\'s name) carrying the clamped figure AT THE PANE\'S ADJUSTABLE MEMBER — `{height}` for `pane-a`, which is stage-resident and therefore sidebar-equivalent (`C-9`, `C-12`, `D-189`), the same member the release commits: this envelope answers the measured default 100 for a pane no family names and clamps into the measured {0, 200} pair, so the pointer\'s own 250 is the figure 150',
    ).toEqual([[DEFAULT_PANE_ID, { height: 150 }]])
    expect(
      live.routes.clearDrag,
      'PS-1 — a placement change is NOT an ending: `P4` goes to `move` and only `P5` (a revert) or the release reaches the erase, so a `clearDrag` in the move turn would end the `temp` family the same turn wrote',
    ).toBe(0)
    expect(
      live.routes.commitPane,
      'PS-1 — and the move commits NOTHING at `file`: the release is the only `commitPane` writer (`§3` `R4`), so the two phases stay distinct',
    ).toEqual([])
  })

  it('PS-2 — **A REVERT SENDS ONE `clearDrag` AND NO `commitDrag`**: the preview seam\'s `P5` arm is the gesture\'s END, reached by every abandon terminal, so the family ends ONCE and no placement is written — a `P5` that also committed would make an abandon arm a resize', () => {
    const live = seat()
    live.press()
    live.cancel()

    expect(
      live.target.style.width,
      'PS-2 — the revert REACHED the seat\'s presentation arm first (`P3`, and `P1`/`P2` ahead of the routes): its `value` is the clamped PRE-DRAG size this envelope measures, so the `clearDrag` below is the route that follows a written revert and not a silent refusal at the gate',
    ).toBe('100px')
    expect(
      live.routes.clearDrag,
      'PS-2 — ONE ending for the gesture, sent at the revert: the affordance\'s cancel terminal writes its revert and calls no committing terminal, so this erase IS the whole of the route traffic',
    ).toBe(1)
    expect(
      live.routes.commitDrag,
      'PS-2 — and NO placement change: a revert is `P5` alone, so nothing was written at the drag family on the way out and the absent family is what this arm leaves standing (`M-6`, `F-4`)',
    ).toEqual([])
  })

  it('PS-3 — **A SECOND ENDING TURN SENDS NOTHING**: one gesture, TWO ending turns — this envelope\'s unusable pointer makes an observed move INVALID, so the affordance takes its reset arm, which drives the session\'s committing terminal (the RELEASE seat, whose `R5` sends the one `clearDrag`) and THEN the same turn\'s revert (the PREVIEW seat, `P5`) — and the closure flag gates the SECOND to the route alone, so exactly one ending is sent, the `file` commit is never skipped by it, and the sink is not handed at all', () => {
    const live = seat()
    live.press()
    live.moveAt(250)
    expect(
      live.target.style.width,
      'PS-3 — the control for the pair below: the move\'s own preview landed at the observed value, so the width read after the reset is a CHANGE and not the untouched default',
    ).toBe('150px')
    expect(
      live.routes.commitDrag.length,
      'PS-3 — the valid move wrote the family once, and the reset arm\'s own move is INVALID so it writes no placement',
    ).toBe(1)

    live.moveAt(Number.NaN)

    expect(
      live.target.style.width,
      'PS-3 — the revert\'s presentation arm RAN (the clamped pre-drag 100 replaced the moved 150), which is what makes the second ending turn\'s silence a FLAG and not an unreached seat',
    ).toBe('100px')
    expect(
      live.routes.commitPane.length,
      'PS-3 — and the release seat ran too: the reset\'s committing terminal is what wrote the `file` family, so both ending turns of this gesture are measured to have happened',
    ).toBe(1)
    expect(
      live.commands.length,
      'PS-3 — and NO `applyCommand` stands in the gesture at all: the seat hands `release` NO SINK (`D-129`; design §5), so the release\'s `R3` sends nothing and the read-out it used to author is `renderPaneSize`\'s now, painted from the DELIVERY (this row\'s sibling file, `RS-1`). The flag\'s whole property — it skips the ERASE ROUTE ALONE — is carried by the two readings above and below instead of by this one: the `file` commit ran (`commitPane`, one) and the route was suppressed (`clearDrag`, one for two ending turns), which is the same pair a sink write would have had to prove by its own count. A `1` here would be the deleted second authority returning, and a `0` that came from an UNREACHED release is excluded by `commitPane`\'s `1`',
    ).toBe(0)
    expect(
      live.routes.clearDrag,
      'PS-3 — EXACTLY ONE `clearDrag` for the gesture, though two ending turns ran: the erase is gated by the closure flag `E1`, and a second route here would be a second ending of a family already gone',
    ).toBe(1)
  })

  it('PS-4 — **THE GHOST TURN IS RETURNED, AND BOTH SEATS CARRY THE SAME KEY**: `startGutterAffordance` hands `renderGhost` OUT instead of calling it (the delivery that drives it is the SHAPE\'s, `D-138`), and the ONE constant `GESTURE_KEY` is the key the move seat, the release seat and the preview seat all carry — measured here as two gestures whose ending turns meet on ONE flag entry, which a per-gesture key (the handle\'s numeric `id` the retired `gestureIdOf` read) could not do', async () => {
    const ghost = seat()
    expect(
      typeof ghost.started.renderGhost,
      'PS-4 — the turn is RETURNED: it is a member of the returned reading, because the composition registers no subscriber and the wiring that owns the delivery is the shape\'s',
    ).toBe('function')
    expect(
      ghost.routes.dragReads,
      'PS-4 — and it was NOT called at construction: zero reads, because a turn called by the wiring would be a second driver of a delivery it does not own',
    ).toEqual([])
    ghost.started.renderGhost()
    await flushed()
    expect(
      ghost.routes.dragReads,
      'PS-4 — the returned member IS the ghost seat: invoking it issues ONE read of the drag family\'s own address and nothing else — no tier argument, no write, no second member invented',
    ).toEqual([{ path: ['drag'] }])

    // THE KEY, DRIVEN AND NOT READ OFF THE SOURCE — and the reading that discriminates a CONSTANT from a per-gesture
    // value is the SECOND gesture's ending, because the flag is keyed by the string the seats were handed. GESTURE ONE
    // ends at the COMMIT seat (a release, `R5`); GESTURE TWO observes no move and ends at the PREVIEW seat (a cancel's
    // revert, `P5`). Under ONE constant both turns meet on ONE entry, so the second sends nothing. Had either seat keyed
    // itself by the HANDLE's own `id` — the per-gesture NUMBER the retired `gestureIdOf` read — gesture two's handle
    // would name a key no entry answers, `E1` would find nothing erased, and a SECOND `clearDrag` would be sent.
    const live = seat()
    live.press()
    live.moveAt(250)
    live.end()
    expect(
      live.routes.commitDrag.length,
      'PS-4 — the first gesture observed ONE move, so the family was written once before it ended',
    ).toBe(1)
    expect(
      live.routes.commitPane.length,
      'PS-4 — and it RELEASED at the commit seat: the `file` family was committed once, so the ending below belongs to the release turn and not to an abandon',
    ).toBe(1)
    expect(
      live.routes.clearDrag,
      'PS-4 — the release\'s own ending (`R5`), sent by the COMMIT seat: the reading is now marked ended under whichever key that seat carried',
    ).toBe(1)
    expect(
      live.target.style.width,
      'PS-4 — the control for the pair below: the move\'s preview stands at the observed value, so the width read after the second ending is a CHANGE and not the untouched default',
    ).toBe('150px')

    live.press()
    live.cancel()

    expect(
      live.target.style.width,
      'PS-4 — the second gesture\'s revert REACHED the PREVIEW seat (`P3` ran, writing the clamped pre-drag 100), so its silence below is the flag\'s and not an unreached arm',
    ).toBe('100px')
    expect(
      live.routes.clearDrag,
      'PS-4 — BOTH SEATS CARRIED THE SAME KEY: the commit seat\'s ending and the preview seat\'s ending met on ONE flag entry, so the second was skipped and the reading stands at ONE route for two ending turns. A seat keyed by the handle\'s numeric `id` would name a key no entry answers, find nothing erased, and send a second `clearDrag`',
    ).toBe(1)
  })

  it('PS-5 — **THE STATEMENT IS READ: an `absent` WRITE WENT NOWHERE AND IS WARNED ONCE PER TURN**, with the `reason` VERBATIM and the turn\'s own `what` spelling — a `sent`-answering member warns NOTHING, and a NULL `view` says it ONCE AT CONSTRUCTION while the three per-turn statements stay silent (`D-126`\'s `F10`, design §2 `N1`)', async () => {
    const reports = captureConsole()
    try {
      // ══ (a) A MEMBER THAT ANSWERED AND ROUTES THAT ARE NOT THERE — `no-route`, `C-9`(b)'s *older preload*. The
      //    wiring's own `view` is the CLIENT and is never null here, so all three turns reach their statement and the
      //    statement is what says the write went nowhere.
      const degraded = seat({ withoutWriteRoutes: true })
      expect(
        degraded.started.attached,
        'PS-5 — the wiring is LIVE (its listeners installed): a seat refused at `attach()` would be silent for a reason this row is not about',
      ).toBe(true)
      degraded.press()
      degraded.moveAt(250)
      expect(
        reports.warns.length,
        'PS-5 — **the MOVE turn warns ONCE for its one write**: `M3` reads the statement it was always handed and reports the LOST class, never the refused one (`D-117`\'s register)',
      ).toBe(1)
      expect(
        reports.warns[0],
        'PS-5 — with the turn\'s OWN `what` spelling and the statement\'s `reason` VERBATIM: a message that re-worded either would pass a text-blind row and fail a reader',
      ).toContain('the drag move')
      expect(reports.warns[0]).toContain('reason=no-route')
      expect(degraded.routes.commitDrag, 'PS-5 — and the route really was ABSENT: the member was never handed the write, so this is the `absent` arm and not a refusal').toEqual([])

      degraded.end()
      expect(
        reports.warns.length,
        'PS-5 — the release reaches TWO turns, so it warns twice: `R4` the `file` commit and `R5` the ending, each with its own word — one line per WRITE the gesture lost',
      ).toBe(3)
      expect(reports.warns[1], 'PS-5 — the commit seat\'s word is its own').toContain('the pane commit')
      expect(reports.warns[1]).toContain('reason=no-route')
      expect(reports.warns[2], 'PS-5 — and the ending turn\'s, which is a different write and a different sentence').toContain('the drag clear')
      expect(reports.warns[2]).toContain('reason=no-route')
      expect(
        [degraded.routes.commitPane.length, degraded.routes.clearDrag],
        'PS-5 — the control that keeps the count above from being noise: NO route was handed anything, so all three statements were `absent`',
      ).toEqual([0, 0])
      expect(reports.errors, 'PS-5 — **and none of them is an ERROR**: an `absent` statement is a DEGRADATION the realm declares, not a fault this tree owns').toEqual([])

      // ══ (b) A `sent` STATEMENT SAYS NOTHING — the receipt is the push's, and a synchronous reader that reported a sent
      //    write would double every answer `PS-6` measures.
      const sent = seat()
      expect(sent.started.attached, 'PS-5 — the control\'s precondition').toBe(true)
      sent.press()
      sent.moveAt(250)
      sent.end()
      expect(
        [sent.routes.commitDrag.length, sent.routes.commitPane.length, sent.routes.clearDrag],
        'PS-5 — all three turns SENT their write, so the silence below is the STATEMENT\'s arm and not an unreached seat',
      ).toEqual([1, 1, 1])
      expect(
        reports.warns.length,
        'PS-5 — **a `{status:\'sent\'}` statement says NOTHING**: the answer is not in the caller\'s turn, and the receipt that will arrive is `PS-6`\'s',
      ).toBe(3)
      expect(reports.errors.length, 'PS-5 — and nothing is an error here either').toBe(0)

      // ══ (c) A NULL `view` IS ONE FACT, SAID ONCE: the composition's writes reach no crossing and the gesture is
      //    presentational, so a per-move repetition at pointer frequency would be noise on the one realm where the
      //    console is the only observability. **THE COUNT IS THE CLAUSE**, not only the text.
      const noView = createPaneDrag({ view: null }, {})
      expect(
        reports.warns.length,
        'PS-5 — **exactly ONE word at construction**, where the three per-turn statements used to be able to fire on every turn of every gesture',
      ).toBe(4)
      expect(
        reports.warns[3],
        'PS-5 — and it is the construction word, naming the ONE fact and the ONE place it is said',
      ).toContain('the pane drag has NO view client')
      expect(reports.warns[3], 'PS-5 — carrying its own note that it is said here and that the three guards stay silent (`design.md` §2 `N1`)').toContain(
        'said ONCE here',
      )
      noView.move('gutter', { value: 150 })
      noView.release('gutter', 150, undefined)
      noView.cancel('gutter')
      expect(
        reports.warns.length,
        'PS-5 — **and the three per-turn statements stay SILENT while it stands**: a null `view` reaching `M3`/`R4`/`E3` reports nothing, so a guard that warned per turn reads `7` here',
      ).toBe(4)
      expect(reports.errors.length, 'PS-5 — the whole row reports on ONE channel and it is `warn`').toBe(0)
    } finally {
      reports.restore()
    }
    expect(
      [vi.isMockFunction(console.error), vi.isMockFunction(console.warn)],
      'PS-5 — **THE GLOBALS ARE NOT LEFT PATCHED**: both members are the REAL functions again, so the next file\'s reports land where they always did — the restore is measured here rather than trusted to the `finally`',
    ).toEqual([false, false])
  })

  it('PS-6 — **THE RECEIPT IS PUSHED, AND THE REPORT IS SCOPED TO THE TWO ROUTE WORDS THIS REALM SENDS**: the ONE register a construction takes reports `refused` as an ERROR carrying `reason`/`message` and `unread` as a WARNING, stays SILENT on `committed`, and ignores a `zone` and a `theme` receipt of the very same shape (design §2 `N2`, L2 §9)', async () => {
    const reports = captureConsole()
    try {
      // **WHY THIS ROW BUILDS ITS OWN CLIENT AND DRIVES `createPaneDrag` DIRECTLY, STATED RATHER THAN LEFT TO LOOK LIKE A
      // SHORTCUT.** The two relations `PS-5`/`PS-6` measure are `createPaneDrag`'s PRIVATE ones (`signatures.md` §2), and
      // the register is taken ONCE per CONSTRUCTION — while `getViewClient()` is the realm's singleton, so every `seat()`
      // in this file registers one more handler on the SAME client and each receipt is then reported once per handler.
      // A count over that singleton would measure this file's row order, not the wiring: so the row constructs the
      // client itself, `createPaneDrag` takes it as its `view`, and **ONE registration is then readable as a 1:1 count of
      // lines to writes** — a register re-taken per turn would read `1 + 2 + 3 + 4 = 10` for the four writes below.
      const routes = {
        commitPane: [] as [string, unknown][],
        commitDrag: [] as [string, unknown][],
        commitZones: [] as [string, unknown][],
        commitTheme: [] as [string, string][],
        clearDrag: 0,
      }
      const answers = {
        commitPane: { status: 'committed' } as unknown,
        commitDrag: { status: 'committed' } as unknown,
        clearDrag: { status: 'committed' } as unknown,
        commitZones: { status: 'committed' } as unknown,
        commitTheme: { status: 'committed' } as unknown,
      }
      const member = {
        read: async (): Promise<unknown> => ({ status: 'committed' }),
        commitPane: async (id: string, geometry: unknown): Promise<unknown> => {
          routes.commitPane.push([id, geometry])
          return answers.commitPane
        },
        commitDrag: async (id: string, geometry: unknown): Promise<unknown> => {
          routes.commitDrag.push([id, geometry])
          return answers.commitDrag
        },
        clearDrag: async (): Promise<unknown> => {
          routes.clearDrag += 1
          return answers.clearDrag
        },
        commitZones: async (id: string, zone: unknown): Promise<unknown> => {
          routes.commitZones.push([id, zone])
          return answers.commitZones
        },
        commitTheme: async (token: string, attributeName: string): Promise<unknown> => {
          routes.commitTheme.push([token, attributeName])
          return answers.commitTheme
        },
        onChanged: (): (() => void) => (): void => undefined,
      }
      const client = createViewClient({ bridge: member as never })
      const drag = createPaneDrag({ view: client }, {})
      expect(
        typeof drag.move,
        'PS-6 — the surface `createPaneDrag` returns is where §2 `N2`\'s register is taken, so this is the declared entry point and not a private one reached around',
      ).toBe('function')

      // ══ (a) `refused` → `console.error`, carrying the crossing\'s own `reason` and `message` VERBATIM — and ONE line for
      //    ONE write, which is the registration\'s count read through the only surface it has.
      answers.commitDrag = { status: 'refused', reason: 'malformed-geometry', message: 'the supplied size is not a finite non-negative number' }
      drag.move('gutter', { value: 150 })
      await flushed()
      expect(routes.commitDrag.length, 'PS-6 — the route WAS handed the write, so the report below is an answer\'s and not a missing call').toBe(1)
      expect(
        reports.errors.length,
        'PS-6 — **one refusal, ONE error**: the register is taken once at construction, so a second registration would read `2` here for one write',
      ).toBe(1)
      expect(reports.errors[0], 'PS-6 — the refusal\'s own `reason` travels in the sentence, spelled as the crossing spelled it').toContain('malformed-geometry')
      expect(
        reports.errors[0],
        'PS-6 — with its `message` beside it: a refusal reported without its sentence is a word a reader cannot act on',
      ).toContain('the supplied size is not a finite non-negative number')
      expect(reports.warns, 'PS-6 — and a REFUSAL is never the LOST class (`D-117`: `error` for a fault this tree owns)').toEqual([])

      // ══ (b) `committed` → SILENCE. The store processed the write, so the pane\'s DELIVERY is still owed: a receipt that
      //    reported a commit would be an answer pretending to be a state.
      answers.commitDrag = { status: 'committed' }
      const sentBefore = routes.commitDrag.length
      drag.move('gutter', { value: 160 })
      await flushed()
      expect(routes.commitDrag.length - sentBefore, 'PS-6 — the control: the move sent its write, so the silence below is the ARM\'s').toBe(1)
      expect(
        [reports.errors.length, reports.warns.length],
        'PS-6 — **a `committed` receipt reports NOTHING**, unchanged from the refusal above, on both channels: the delivery is the one thing that will speak',
      ).toEqual([1, 0])

      // ══ (c) `unread` → `console.warn`, ON BOTH CONTINUATIONS: an answer no route of L2 declares, and a rejection.
      answers.commitDrag = { status: 'sealed' }
      const sealedBefore = routes.commitDrag.length
      drag.move('gutter', { value: 170 })
      await flushed()
      expect(routes.commitDrag.length - sealedBefore, 'PS-6 — the control: the second `unread` write was sent').toBe(1)
      expect(reports.warns.length, 'PS-6 — **an answer no route declares is a LOST one**: the boundary spoke, and it said a word L2 does not mint').toBe(1)
      expect(reports.warns[0]).toContain('answer-not-declared')
      answers.commitDrag = Promise.reject(new Error('ipc boom'))
      const throwingBefore = routes.commitDrag.length
      drag.move('gutter', { value: 180 })
      await flushed()
      expect(routes.commitDrag.length - throwingBefore, 'PS-6 — the control: the rejecting route was reached').toBe(1)
      expect(
        reports.warns.length,
        'PS-6 — and the route\'s THROW lands in the same register: `send`\'s reject arm mints `route-threw` and pushes it exactly as the resolve arm does',
      ).toBe(2)
      expect(reports.warns[1]).toContain('route-threw')
      expect(reports.errors.length, 'PS-6 — neither `unread` arm is an error: a boundary that did not speak is no state of the record').toBe(1)

      // ══ (d) THE SCOPE, DRIVEN ONE ROUTE WORD AT A TIME. `zone` and `theme` belong to the senders that sent them — the
      //    zone family has no UI caller at all (`D-151`) — so this realm may not report another act\'s answer. The control
      //    is the SAME refusal shape on a route word this realm DOES send: a report that did not read the route word would
      //    find the two pairs indistinguishable.
      answers.commitZones = { status: 'refused', reason: 'malformed-zone', message: 'the commit carries no zone id' }
      answers.commitTheme = { status: 'refused', reason: 'malformed-theme', message: 'the commit carries no setting token' }
      const beforeForeign = [reports.errors.length, reports.warns.length]
      client.commitZones('zone-1', { size: 10 })
      client.commitTheme('dark', 'data-theme')
      await flushed()
      expect(
        [routes.commitZones.length, routes.commitTheme.length],
        'PS-6 — the control that makes the silence mean something: BOTH foreign routes were handed their write, through the client\'s own members — the SAME client this register stands on — and both ANSWERED a refusal',
      ).toEqual([1, 1])
      expect(
        [reports.errors.length, reports.warns.length],
        'PS-6 — **a `zone` and a `theme` refusal are NOT this realm\'s news**: the register is scoped to `pane` and `drag`, and a report that ignored the route word would read `3` and `0` here',
      ).toEqual(beforeForeign)

      // THE SAME REGISTER, THE SAME SHAPE, A ROUTE WORD THIS REALM SENDS (`pane`, the release\'s one `file` commit).
      answers.commitPane = { status: 'refused', reason: 'undeclared-pane', message: 'the pane id names no pane this record declares' }
      drag.release('gutter', 150, undefined)
      await flushed()
      expect(routes.commitPane.length, 'PS-6 — the release seat sent the `file` commit, so the route word below is `pane` and not an inferred one').toBe(1)
      expect(
        [reports.errors.length - beforeForeign[0], reports.warns.length - beforeForeign[1]],
        'PS-6 — **and THAT refusal IS reported, on the error channel**: the scope is the route word, and not the silence of a register that never fired',
      ).toEqual([1, 0])
      expect(reports.errors[reports.errors.length - 1]).toContain('undeclared-pane')

      // ══ AND THE CENSUS THAT KEEPS CLAUSE (a) FROM BEING AN ACCIDENT: FIVE writes travelled through this ONE register
      //    above — one refusal, one commit, two losses and this one — and they produced FIVE lines, one each. A register
      //    taken per turn would read 15; a register taken twice, 10.
      expect(
        [reports.errors.length, reports.warns.length],
        'PS-6 — **the register is ONE, and its lines are one per write**: the whole row\'s two channels, counted once',
      ).toEqual([2, 2])
    } finally {
      reports.restore()
    }
    expect(
      [vi.isMockFunction(console.error), vi.isMockFunction(console.warn)],
      'PS-6 — **THE GLOBALS ARE NOT LEFT PATCHED**: both members are the REAL functions again, so the next file\'s reports land where they always did — the restore is measured here rather than trusted to the `finally`',
    ).toEqual([false, false])
  })
})
