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
// THE HARNESS, AS §8 FIXES IT. A stub runtime answers `elementForNodeId` with THREE element doubles (the affordance's, the
// target's, and the authored status node's — the two the wiring resolves, plus the node its `applyCommand` sink names) and
// records its `applyCommand` calls; each double carries `addEventListener`/`getAttribute`/`style`, so the wiring's own
// event source (`domEventSource`) and its attribute-reading seams are exercised rather than replaced. A stub
// `window.provident` carries the `view` member (seven routes, each counted — that counting IS the (a)/(b)/(c) reading) and
// the `data` member the ghost's one read rides. Then `startGutterAffordance(runtime)` is called and a gesture is driven
// through the doubles' own listeners: `pointerdown` establishes, `pointermove` is an observed move, `pointerup` is the
// release, `pointercancel` is the cancel.
//
// WHAT THIS GREEN IS WORTH (`AGENTS.md`, D-27): the module rows run under no layout and no renderer, so this is
// envelope-green — the seat's DECISIONS and its two routes, never a rendered surface. The live legs carry no pointer event
// at all (`§7`), which is exactly why the seat needed a node instrument.
//
//   · `PS-1` — a VALID observed move sends ONE `commitDrag(DEFAULT_PANE_ID, {size})` and NO `clearDrag`.
//   · `PS-2` — a REVERT sends ONE `clearDrag` and NO `commitDrag`.
//   · `PS-3` — a SECOND ending turn sends NOTHING — the ONE `clearDrag` the flag owns, and NO `applyCommand` at all: the app
//     hands the release no sink (`D-129`), so this row's `commands` reading is `0` where the seat's one sink write used to be.
//   · `PS-4` — the ghost turn is RETURNED, and BOTH seats carry the SAME key.

import { afterEach, describe, expect, it } from 'vitest'

import { startGutterAffordance } from '../../../src/renderer/renderer.js'
import type { Runtime } from '../../../src/renderer/runtime.js'
import { DEFAULT_PANE_ID } from '../../../src/shared/view-shape.js'
import { GUTTER_AFFORDANCE_ID, GUTTER_STATUS_ID, GUTTER_TARGET_ID } from '../../../src/shared/demo-envelope.js'

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

interface Seat {
  readonly started: { readonly attached: boolean; readonly renderGhost: () => void }
  readonly routes: Routes
  /** **EVERY `applyCommand` THE WIRING MADE** — and after `D-129` that is the READ-OUT'S turn (`renderPaneSize`, this file's
   *  sibling `RS-1`) and nothing in the gesture: the seat's `commit` seam omits `release`'s third argument, so `R3` sends no
   *  write and this counter is the row's statement that the deleted second authority has not come back. */
  readonly commands: unknown[]
  /** Every id the wiring resolved through `elementForNodeId`, in order: the graph read, never a selector. */
  readonly resolved: string[]
  readonly affordance: ElementDouble
  readonly target: ElementDouble
  readonly status: ElementDouble
  /** The gesture's four turns, driven at the AFFORDANCE ELEMENT the wiring attached to. */
  press(): void
  moveAt(clientX: number): void
  end(): void
  cancel(): void
}

/** **THE HARNESS §8 FIXES, IN ONE PLACE**: the stub runtime, the stub bridge, the three doubles, and the construction.
 *  It is built per row so each row's counters start at zero and no row inherits another's gesture. */
function seat(): Seat {
  const routes: Routes = { commitDrag: [], clearDrag: 0, commitPane: [], dragReads: [] }
  /** **THE `view` MEMBER — seven routes, each counted.** The client reads the ambient member AT CALL TIME, so this object
   *  is the app's own bridge and not an injected one; the reads the drag needs (`paneSizeOf`/`paneBoundsOf`) are the
   *  shape's and answer the MEASURED DEFAULT on a shape nothing has filled — which is why the arithmetic below is the
   *  envelope's own `100` and not a number this file invented. */
  const view = {
    read: async (): Promise<unknown> => ({ status: 'committed' }),
    commitPane: async (id: string, geometry: unknown): Promise<unknown> => {
      routes.commitPane.push([id, geometry])
      return { status: 'committed' }
    },
    commitZones: async (): Promise<unknown> => ({ status: 'committed' }),
    commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
    commitDrag: async (id: string, geometry: unknown): Promise<unknown> => {
      routes.commitDrag.push([id, geometry])
      return { status: 'committed' }
    },
    clearDrag: async (): Promise<unknown> => {
      routes.clearDrag += 1
      return { status: 'committed' }
    },
    onChanged: (): (() => void) => (): void => undefined,
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

  const affordance = elementDouble()
  const target = elementDouble()
  const status = elementDouble()
  const elements = new Map<string, ElementDouble>([
    [GUTTER_AFFORDANCE_ID, affordance],
    [GUTTER_TARGET_ID, target],
    [GUTTER_STATUS_ID, status],
  ])
  const commands: unknown[] = []
  const resolved: string[] = []
  const runtime = {
    elementForNodeId(id: string): unknown {
      resolved.push(id)
      const held = elements.get(id)
      return held === undefined ? null : held
    },
    applyCommand(command: unknown): { readonly status: string } {
      commands.push(command)
      return { status: 'applied' }
    },
  }
  const started = startGutterAffordance(runtime as unknown as Runtime)
  return {
    started,
    routes,
    commands,
    resolved,
    affordance,
    target,
    status,
    press: (): void => affordance.fire('pointerdown', { button: 0 }),
    moveAt: (clientX: number): void => affordance.fire('pointermove', { clientX, clientY: 0 }),
    end: (): void => affordance.fire('pointerup', { clientX: 250, clientY: 0 }),
    cancel: (): void => affordance.fire('pointercancel', {}),
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
  it('PS-1 — **A VALID OBSERVED MOVE SENDS ONE `commitDrag(DEFAULT_PANE_ID, {size})` AND NO `clearDrag`**: the preview seam\'s `P4` arm is the WHOLE placement change, so the family is written once per observed move, naming the COMPOSITION\'s pane and the CLAMPED value the affordance computed — and an ending there would end the reading the move had just written, which is the shape a `P5`/release route in the move arm would produce', () => {
    const live = seat()
    expect(
      live.started.attached,
      'PS-1 — `attached` is the wiring\'s own reading and the precondition every clause below rides: a REFUSED `attach()` leaves the drag INERT (`D-117`), and a route missing for that reason would be misread here as a seat that never fired',
    ).toBe(true)
    expect(
      live.resolved,
      'PS-1 — the two elements the wiring resolves are the graph read, by id and in the order the closure takes them, never a selector or a created element',
    ).toEqual([GUTTER_AFFORDANCE_ID, GUTTER_TARGET_ID])

    live.press()
    live.moveAt(250)

    expect(
      live.routes.commitDrag,
      'PS-1 — ONE write per placement change, at the composition\'s pane (the measured `DEFAULT_PANE_ID`, not the authored element\'s name) carrying the clamped size: this envelope answers the measured default 100 for a pane no family names and clamps into the measured {0, 200} pair, so the pointer\'s own 250 is the size 150',
    ).toEqual([[DEFAULT_PANE_ID, { size: 150 }]])
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
})
