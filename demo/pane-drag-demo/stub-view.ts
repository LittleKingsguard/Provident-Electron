/**
 * `demo/pane-drag-demo/stub-view.ts` — **THE STUB THE DEMO SUPPLIES WHERE THE APP HANDS ITS CROSSING** (`D-118`).
 *
 * WHY THIS FILE EXISTS, IN THE APP'S OWN TERMS. `createPaneDrag(backing, source)` takes `backing.view` and reads it
 * synchronously — `paneSizeOf(id)`, `paneBoundsOf(id)`, `zoneOf(id)` — and writes through `commitPane(id, geometry)`
 * (`src/renderer/renderer.ts`, the composition `D-117` wires the live drag onto). In the app that object is
 * `getViewClient()`: `src/renderer/view-client.ts`'s projection, filled by deliveries from the main process over the
 * preload bridge. **THIS PAGE HAS NO PRELOAD BRIDGE AND NO MAIN PROCESS**, and `D-94`/`D-95` refused to grow a fake one
 * ("a crossings demo would need the app's main process and the bridge — a third instrument is a unit's work"). So the
 * dependency arrives the way the app's own discipline says a dependency arrives — **AS AN ARGUMENT** (`D-90`'s *"it is not
 * data, it is closure state"*, read for a caller-supplied backing): the demo supplies a STUB SHAPE standing for the view
 * record, and says so here rather than simulating a crossing.
 *
 * **WHAT THE STUB STANDS FOR, EXACTLY.** `['panes']` — the record's first family — at the `file` tier, one admitted value
 * `{id, width, height, bounds?, zone?}` (`D-189`'s split, the shape `src/shared/view-shape.ts` declares), holding `pane-a`
 * at the tree's MEASURED defaults (`D-87`'s `100`, `bounds {min: 0, max: 200}`, now read at TWO members — `width` and
 * `height` — because `paneOf` admits no unstated axis member),
 * re-derived here from `src/shared/view-shape.ts`'s constants rather than re-spelled). Every read is the app's own
 * PURE derivation `paneGeometryIn`, so the answer a pane the family does not name receives is the app's measured default
 * and not the stub's invention, and the `source` word (`'record'` / `'default'`) is the derivation's, not this file's.
 * The zone family is EMPTY, and its read is `zoneIn`'s own missing arm (`null`, `D-91`) rather than a geometry.
 *
 * **AND IT STANDS FOR THE DRAG FAMILY TOO** (`D-132`; `docs/L2/view-record/interface.md` §1): the composition's `move`
 * turn writes the gesture's in-process placement at `['drag']` at `temp` through the client's `commitDrag`, and its ending
 * (`release`/`cancel`/`rightClick`) deletes that family through `clearDrag`. So the stub answers BOTH the drag routes and
 * holds the one family they write, and `drag()` is the demo's READ of it — the address is the storage, so this page reads
 * what the composition wrote instead of keeping a copy beside it (the closure member `D-132` deleted). The family's
 * ABSENCE is a state of its own here as it is in the store: `clearDrag` DELETES it whole, never a placeholder.
 *
 * **THE ONE THING THAT IS NOT THE APP'S, STATED PLAINLY.** The app's `commitPane` SENDS a route across the bridge and the
 * shape is refilled by the delivery that commit causes a tick later (`D-88`). There is no bridge here, so the stub
 * composes the write into its own family at the moment of the call — the same "a supplied member is written over what
 * stands, every other member is kept" rule the crossing's `composePane` applies (`D-87`) — records it in `writes()`, and
 * answers the SAME declared statement the client answers (`{status: 'sent'}`, `ViewWriteStatement`). **IT IS NOT A
 * CROSSING AND CLAIMS NOTHING ACROSS A BOUNDARY**: it is the demo's own status the release writes to, held in this page.
 * `commitDrag` is the same stand-in one family over — the placement lands where the address would hold it, and the
 * delivery the app's commit would cause has no stand-in — so `drag()` reads this page's own write, which is the point
 * the demo exists to show.
 *
 * **WHY THE MEMBERS ARE TYPED OFF THE APP'S CLIENT AND NOT DECLARED HERE.** `StubViewMembers` is a `Pick` of the app's
 * `ViewClient`. That is the whole anti-drift mechanism: if the composition starts reading a member the stub does not
 * answer, or a member's signature moves, `npm run typecheck` reds on THIS file instead of the demo quietly answering a
 * shape nobody asked for — which is the defect `D-94` recorded about the deleted `demo.ts` and this pass exists to not
 * repeat.
 */
import type { ViewClient } from '../../src/renderer/view-client.js'
import {
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  paneGeometryIn,
  zoneIn,
  type ViewPaneGeometry,
  type ViewZone,
} from '../../src/shared/view-shape.js'

/** **THE SIX MEMBERS THE COMPOSITION READS AND WRITES — taken from the client's own declaration, never re-spelled**: the
 *  panes family's four (`D-117`) and the drag pair the composition's `move` and its ending turn route through (`D-132`). */
export type StubViewMembers = Pick<
  ViewClient,
  'paneSizeOf' | 'paneBoundsOf' | 'zoneOf' | 'commitPane' | 'commitDrag' | 'clearDrag'
>

/** One write the release sent through the route, kept so the demo can show it happened (the stub is the only reader). */
export interface StubPaneWrite {
  readonly id: string
  readonly geometry: unknown
}

/** **THE DRAG FAMILY'S READING — THE ADDRESS THE COMPOSITION WRITES, AS THIS PAGE CAN SEE IT** (`D-132`, L2 §1). `present`
 *  carries the store's own distinction rather than a convenience: the family is DELETED by the gesture's ending, so "no
 *  gesture in process" is an ABSENT address and never an empty family, and the demo cannot confuse the two either. */
export interface StubDragReading {
  /** THE ONE SPELLING of the address this page reads — `['drag']`, the root `D-132` gave the in-process placement. */
  readonly address: readonly string[]
  readonly present: boolean
  /** One member per pane id carrying the placement ALONE — **the ADJUSTABLE axis's own member and no other**, `{width}` or
   *  `{height}`, never a geometry and never a `size` (`docs/L2/view-record/interface.md` §1, `D-189`): `member` names the
   *  axis and `value` is its figure. */
  readonly members: readonly StubDragMember[]
}

/** **ONE PLACEMENT AT THE ADDRESS** — the member's NAME is its axis (`D-189`, `D-190`), so this page never has to interpret a
 *  standing number: `member` is `'width'` for a horizontally-oriented pane and `'height'` for a vertical one. */
export interface StubDragMember {
  readonly id: string
  readonly member: 'width' | 'height'
  readonly value: number
}

/** The stub, and the controls the demo's panel drives it with. `members` is what `createPaneDrag` is handed. */
export interface StubView {
  /** THE SHAPE AS THE COMPOSITION SEES IT — the six members, and nothing else, so a seventh read cannot be answered by luck. */
  readonly members: StubViewMembers
  /** THE STANDING FAMILY, as a fresh array of copies. */
  panes(): readonly ViewPaneGeometry[]
  /** **THE DRAG FAMILY AS THE COMPOSITION LEFT IT** — the demo's read of the address the moves write and the ending deletes. */
  drag(): StubDragReading
  /** ONE PANE THROUGH THE APP'S OWN DERIVATION — `source` says whether the family named it. */
  geometryOf(id: string): ReturnType<typeof paneGeometryIn>
  /** THE CONTROL'S WRITE: a new **`width`** for one pane, CLAMPED by the caller (`clampToBounds`, `gutter.ts`) into its own
   *  pair. **IT NAMES ITS AXIS** (`D-189`): the demo's gesture is the HORIZONTAL one — its `sizeFromPointer` reads the
   *  pointer's x and its preview writes `style.width` — so the member this page moves is the width, and the figure the
   *  control carried as a `size` before the split is that same figure. */
  setWidth(id: string, width: number): void
  /** THE CONTROL'S WRITE: a new bounds pair for one pane. */
  setBounds(id: string, bounds: { readonly min: number; readonly max: number }): void
  /** BACK TO THE MEASURED DEFAULTS — `defaultPaneGeometry`'s own answer, for the one pane (or a fresh family). */
  reset(id?: string): void
  /** EVERY WRITE THE ROUTE RECEIVED, in order. */
  writes(): readonly StubPaneWrite[]
}

/** The zone family the stub stands for: EMPTY, which is what a realm that never read `['zones']` holds (`D-95`'s `V-2`). */
const ZONES: readonly ViewZone[] = []

/** **THE DRAG ADDRESS, SPELLED ONCE IN THIS FILE** — `docs/L2/view-record/interface.md` §1's fourth root (`D-132`). Its
 *  constant lives in the crossing (`src/main/view-record/index.ts`), which this page has no process for and cannot import,
 *  so the one spelling stands here and the readout shows THIS value rather than a second string written beside it. */
const DRAG_ADDRESS: readonly string[] = ['drag']

/** A fresh copy of one geometry, so no caller of `panes()` can move the stub's record. **BOTH AXIS MEMBERS ARE CARRIED AND
 *  THE TWO OPTIONAL ONES ONLY WHERE THE RECORD NAMES ONE** (`D-189`, `D-186`, `D-129`): a zone-resident pane's absent
 *  `bounds` is lawful — its clamp is the layout's — and copying a pair into it would be a member the record never had. */
const copyOf = (pane: ViewPaneGeometry): ViewPaneGeometry => {
  const copy: {
    id: string
    width: number
    height: number
    bounds?: { readonly min: number; readonly max: number }
    zone?: string
  } = { id: pane.id, width: pane.width, height: pane.height }
  if (pane.bounds !== undefined) copy.bounds = { min: pane.bounds.min, max: pane.bounds.max }
  if (pane.zone !== undefined) copy.zone = pane.zone
  return copy
}

/** THE PAIR THE CONTROL CLAMPS INTO, or the measured one where the pane stores none — the demo's own pane always stores
 *  one, so this is the stated arm and never a second authority (`D-186`). */
const boundsOfPane = (pane: ViewPaneGeometry): { readonly min: number; readonly max: number } =>
  pane.bounds === undefined ? { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } : { min: pane.bounds.min, max: pane.bounds.max }

/**
 * THE STUB'S FACTORY. Seeded with the app's measured defaults for `DEFAULT_PANE_ID` (`pane-a`, `100`, `{0, 200}`) — not a
 * pair of literals written here — and total over every id it is asked about (`paneGeometryIn` answers the default for a
 * pane the family does not name, which is the app's behaviour and not a convenience of this file).
 */
export function createStubView(): StubView {
  const family = new Map<string, ViewPaneGeometry>()
  const logged: StubPaneWrite[] = []
  /** **THE DRAG FAMILY, AND `null` IS THE ABSENT READING** (`D-132`): one member per pane id while a gesture is in process,
   *  and NO family at all once its ending deleted it — the store's own distinction, kept here so the demo reads a truth and
   *  not an empty placeholder. `move` writes it through `commitDrag`, the ending turns delete it through `clearDrag`. */
  let dragFamily: Map<string, StubDragMember> | null = null

  /** THE READ OF THAT ADDRESS — a fresh copy on every call, so no holder can alias the standing family. */
  const drag = (): StubDragReading => {
    const standing = dragFamily
    return {
      address: [...DRAG_ADDRESS],
      present: standing !== null,
      members: standing === null ? [] : [...standing.entries()].map(([id, placement]) => ({
        id,
        member: placement.member,
        value: placement.value,
      })),
    }
  }

  /** The family as an array, derived from the map on every read so no holder can alias it. */
  const panes = (): readonly ViewPaneGeometry[] => [...family.values()].map(copyOf)

  /** The measured default geometry, taken from the app's derivation rather than written here (`paneGeometryIn`'s
   *  `'default'` arm). No literal `100` and no literal `{0, 200}` stands in this file. */
  const seed = (id: string): void => {
    family.set(id, copyOf(paneGeometryIn([], id).pane))
  }

  seed(DEFAULT_PANE_ID)

  /** **A WRITE AT ONE MEMBER'S OWN NAME** — the crossing's leaf rule (`D-138`, `D-151`, `D-191`): the member supplied is the
   *  member written, and every other member of the standing record survives untouched. It is the rule this page's stub would
   *  otherwise quietly break by re-composing the geometry whole. */
  const writeMember = (id: string, member: 'width' | 'height' | 'bounds', value: number | { readonly min: number; readonly max: number }): void => {
    const held = family.get(id)
    const base = held === undefined ? copyOf(paneGeometryIn([], id).pane) : copyOf(held)
    const next: { id: string; width: number; height: number; bounds?: { readonly min: number; readonly max: number }; zone?: string } = {
      id: base.id,
      width: base.width,
      height: base.height,
    }
    if (base.bounds !== undefined) next.bounds = { min: base.bounds.min, max: base.bounds.max }
    if (base.zone !== undefined) next.zone = base.zone
    if (member === 'bounds') next.bounds = { min: (value as { readonly min: number }).min, max: (value as { readonly max: number }).max }
    else next[member] = value as number
    family.set(id, next)
  }

  const setWidth = (id: string, width: number): void => {
    writeMember(id, 'width', width)
  }

  const setBounds = (id: string, bounds: { readonly min: number; readonly max: number }): void => {
    writeMember(id, 'bounds', { min: bounds.min, max: bounds.max })
  }

  const reset = (id?: string): void => {
    if (id === undefined) {
      family.clear()
      seed(DEFAULT_PANE_ID)
      return
    }
    family.set(id, paneGeometryIn([], id).pane)
  }

  const members: StubViewMembers = {
    /** **THE DEMO'S OPERATIVE MEMBER READ — ONE NUMBER, AND ITS AXIS NAMED**: this page's gesture is horizontal (pointer-x
     *  onto `style.width`), so the member it reads is the pane's `width`, the same member the control writes and the release
     *  commits. The app's `pane-a` is stage-resident and its client read answers `height`; the two are one client member with
     *  two subjects, each stating its own axis, and the demo's figures are the ones its `size` used to carry (`D-189`). */
    paneSizeOf(id: string): unknown {
      return paneGeometryIn(panes(), id).pane.width
    },
    /** **THE DRAG'S BOUNDS READ** — the pair as stored; a pane the family does not name gets the measured default pair, and
     *  a pane storing none answers none rather than an invented one (`D-186`). */
    paneBoundsOf(id: string): unknown {
      const pane = paneGeometryIn(panes(), id).pane
      return pane.bounds === undefined ? undefined : { min: pane.bounds.min, max: pane.bounds.max }
    },
    /** **THE ZONE READ** — `zoneIn`'s measured missing arm: `null`, never an invented geometry (`D-91`). */
    zoneOf(id: string): ViewZone | null {
      return zoneIn(ZONES, id)
    },
    /** **THE ROUTE THE RELEASE WRITES THROUGH** — see this file's header: composed here, answered as the client answers. */
    commitPane(id: string, geometry: unknown): { readonly status: 'sent' } {
      // **THE ACT'S ARGUMENT IS THE RECORD'S OWN MEMBER SET** (`D-191`): `{ width?, height?, bounds? }`, each supplied member
      // landing at ITS OWN NAME and a member the act does not name keeping what stands — the crossing's leaf rule, stood in
      // for here because this page has no store. A member this stub cannot state writes nothing, as the route's own arms do.
      const record = (geometry ?? null) as { readonly width?: unknown; readonly height?: unknown; readonly bounds?: unknown } | null
      if (record !== null && record !== undefined) {
        for (const member of ['width', 'height'] as const) {
          const held = record[member]
          if (typeof held === 'number' && Number.isFinite(held) && held >= 0) writeMember(id, member, held)
        }
        const pair = record.bounds
        if (pair !== null && typeof pair === 'object' && !Array.isArray(pair)) {
          const min = (pair as { readonly min?: unknown }).min
          const max = (pair as { readonly max?: unknown }).max
          if (typeof min === 'number' && typeof max === 'number' && Number.isFinite(min) && Number.isFinite(max) && min <= max) {
            writeMember(id, 'bounds', { min, max })
          }
        }
      }
      logged.push({ id, geometry })
      return { status: 'sent' }
    },
    /** **THE DRAG'S MOVE ROUTE — ONE WHOLE VALUE THE CALLER FORMATTED** (`D-132`, `D-135`, `D-136`): the placement the
     *  composition's `move` read — **`{width}` or `{height}`, the pane's ADJUSTABLE member and no other** (`D-189`, `D-190`)
     *  — written as the family's single member because the composition drags one pane. A value its own shape arms cannot read
     *  (no id, no axis-named member, a figure that is not finite and non-negative) writes NOTHING and leaves what stands
     *  standing — the crossing's judgement, answered here from the same facts and added to. */
    commitDrag(id: string, geometry: unknown): { readonly status: 'sent' } {
      const record = (geometry ?? null) as { readonly width?: unknown; readonly height?: unknown } | null
      if (id.length > 0 && record !== null && record !== undefined) {
        for (const member of ['width', 'height'] as const) {
          const held = record[member]
          if (typeof held === 'number' && Number.isFinite(held) && held >= 0) {
            dragFamily = new Map([[id, { id, member, value: held }]])
            break
          }
        }
      }
      return { status: 'sent' }
    },
    /** **THE DRAG'S END — THE FAMILY IS DELETED WHOLE** (`D-132`, `D-140`): the act carries NO argument, and the address
     *  answers absent afterwards whether or not it stood — never a placeholder written to stand in for a gesture's end. */
    clearDrag(): { readonly status: 'sent' } {
      dragFamily = null
      return { status: 'sent' }
    },
  }

  return {
    members,
    panes,
    drag,
    geometryOf: (id: string) => paneGeometryIn(panes(), id),
    setWidth,
    setBounds,
    reset,
    writes: () => [...logged],
  }
}
