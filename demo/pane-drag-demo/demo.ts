/**
 * `demo/pane-drag-demo/demo.ts` — **THE PANE-DRAG DEMO'S SOURCE, AND IT IS THE APP'S CODE** (`D-118`).
 *
 * WHAT THIS FILE IS. The demo page is a 100%-disposable Electron window (`electron-main.cjs`, no preload, no main process)
 * that loads `demo.mjs`, the bundle `build.mjs` produces from THIS file. **IT AUTHORS NO MECHANISM.** Every line below
 * either (a) reads a DOM element, (b) supplies an argument to an app module, or (c) writes a readout. The mechanism —
 * the gesture session, the resize controller, the gutter affordance, and the pane-drag composition `D-117` wired the live
 * drag onto — arrives by IMPORT from `src/`, so the demo cannot drift from the app: the bundler inlines the app's own bytes
 * and `npm run typecheck` reads this file against the app's own declarations (both are the defects `D-94` recorded about
 * the deleted `demo.ts`, and the reason this rebuild exists).
 *
 * THE COMPOSITION THE DEMO VISIBLY REPEATS, AND WHAT IT REPLACES WITH A PARAMETER. `src/renderer/renderer.ts`'s
 * `startGutterAffordance(runtime)` is the app's wiring, and it cannot be CALLED here for one reason: it resolves its three
 * elements through `Runtime.elementForNodeId` (a read of the producing graph) and writes its sink through
 * `Runtime.applyCommand` (a graph write) — **the app's main process and its bridge, which this page does not have.** So the
 * same five roles are taken here with the graph calls replaced by direct DOM references and one status node:
 *
 *   (i)   the SESSION, constructed once, with the app's own non-forwarding recorder as its commit channel (`D-117` (i):
 *         the single sink writer is the affordance's `commit` seam, never the session's channel);
 *   (ii)  the THREE ELEMENTS — the affordance handle, the preview target and the status node — by `querySelector`;
 *   (iii) `createGutterAffordance(...).attach()`, whose GEOMETRY SEAMS ARE THE COMPOSITION'S (`D-117`): `startSizeOf` and
 *         `boundsOf` are `createPaneDrag(...)`'s, so the gesture reads the SHAPE (`paneGeometryIn` over a stub standing for
 *         `['panes']`) and commits through `release` — where before `D-117` it read the authored element's `size`/`min`/`max`
 *         attributes;
 *   (iv)  the PREVIEW write — the declared transient inline-style write on the target (`§2.5` item 4), never a graph write,
 *         and THE TWO ROUTES THE APP'S OWN SEAM ADDS AFTER IT (`D-117`, `D-132`): `drag.move` on a valid state, whose `M3`
 *         sends the ONE `commitDrag` writing the placement at `['drag']`, and `drag.cancel` on an invalid one, whose ending
 *         deletes that family;
 *   (v)   the CURSOR write — the example's own (`gutterSeamExample().applyCursor`).
 *
 * **THE SEAMS SPLIT EXACTLY WHERE `D-117` SAYS THEY DO.** `gutterSeamExample()` supplies the FOUR that are the EXAMPLE's
 * and not the record's: `pointerOf` (the event's coordinate pair), `axisOf` (the handle's authored `axis` attribute — the
 * token `pane-a`, which is how `paneIdOf` derives the pane the family is asked about), `resizableOf` and `applyCursor`.
 * The demo supplies the THREE that belong to a caller's own channel: `sizeFromPointer` (see below), `cursorOf` (the
 * example's cursor table is keyed by the example's own axis tokens) and `applyPreview` (the wiring's declared transient
 * write). The SINK is the demo's status node; the ROUTE is `createPaneDrag`'s `release`, writing into `stub-view.ts`.
 *
 * **AND THE IN-PROCESS VALUE IS READ AT ITS ADDRESS, WHICH IS WHY NO MEMBER READS IT** (`D-132`; L2 §1): the preview while
 * the pointer moves is `['drag']` at `temp` — one member per pane id, `{size}` — written by the composition's `move` and
 * deleted whole by the gesture's ending. This file therefore reads it through the demo's own seam (`stub.drag()`, the
 * page's stand-in for that family) and NOT through the surface: the `previewOf` member that read a closure copy is
 * deleted with the copy it read, and a member re-added here would be a second value that could disagree with the address.
 *
 * **THE ONE ARITHMETIC THIS FILE OWNS, STATED SO IT IS NOT MISTAKEN FOR THE APP'S.** `sizeFromPointer` is a CALLER SEAM.
 * The example's form is `pointer.x − start` — a raw magnitude, which reads a sensible size only from a layout whose pane
 * starts at the viewport's left edge. The demo maps `start + (pointer.x − pressX)`, where `pressX` is the pointer x at the
 * press (captured by the demo's own listener on the handle), so a drag of `dx` changes the size by `dx`. **That mapping
 * is the demo's, it is this file's only arithmetic, and `README.md` says so** — no app function is transcribed here.
 *
 * **AND THE POINTER IS CAPTURED, WHICH THE APP'S OWN SOURCE DOES NOT DO.** The session's tracking listeners live ON the
 * handle (`gesture-session.ts`'s `begin` attaches move/up/cancel to `record.element`), and a 14px handle stops receiving
 * `pointermove` the moment the pointer leaves it. `domEventSource()` advertises no `capturePointer`; the demo's own
 * listener calls `setPointerCapture` on the start event, which is the DOM's own mechanism for exactly this. **Whether the
 * app's live drag survives the pointer leaving its handle is UNMEASURED in this tree** (no leg drives a real coordinate
 * drag against the app: `npm run panes`'s "gesture" is a `dispatch` click), so this file claims nothing about it and the
 * README states the gap.
 */
import { createGestureSession, POINTER_TYPES } from '../../src/shared/gesture-session.js'
import { createGutterAffordance, domEventSource } from '../../src/shared/gutter-affordance.js'
import { gutterSeamExample } from '../../src/shared/demo-envelope.js'
import { clampToBounds } from '../../src/shared/gutter.js'
import { createPaneDrag, type PaneDragSurface } from '../../src/renderer/renderer.js'
import { DEFAULT_PANE_ID, paneGeometryIn } from '../../src/shared/view-shape.js'
import { createStubView } from './stub-view.js'

/** THE PAGE'S ROOT, and a throw rather than a silent no-op if the page and this bundle disagree (`main()`'s own rule). */
const app = document.getElementById('app')
if (app === null) throw new Error('demo: the page carries no #app root')

const handleHolder = document.querySelector('[data-gutter-handle]')
const targetHolder = document.querySelector('[data-gutter-target]')
const statusHolder = document.getElementById('gutter-status')
const paneWidthNode = document.getElementById('pane-width')
const stubReadingNode = document.getElementById('stub-reading')
const dragReadingNode = document.getElementById('drag-reading')
const zoneReadingNode = document.getElementById('zone-reading')
if (handleHolder === null) throw new Error('demo: the page carries no [data-gutter-handle]')
if (targetHolder === null) throw new Error('demo: the page carries no [data-gutter-target]')
if (statusHolder === null) throw new Error('demo: the page carries no #gutter-status (the release SINK)')

/** THE THREE RESOLVED ELEMENTS, at the DOM types the demo's own writes need (the app resolves each from the graph). */
const handle = handleHolder as HTMLElement
const target = targetHolder as HTMLElement
const statusNode = statusHolder

/** THE STUB THE COMPOSITION IS HANDED — the demo's stand-in for the view record; `stub-view.ts` says what it stands for. */
const stub = createStubView()

/** THE APP'S OWN EVENT SOURCE, unmodified: element-backed `addEventListener`/`removeEventListener`, and no capture claim. */
const source = domEventSource()

/** **THE APP'S COMPOSITION, IMPORTED** (`D-117`): reads `stub.members`, writes through `stub.members.commitPane`. */
const drag: PaneDragSurface = createPaneDrag({ view: stub.members }, source)

/** **THE SESSION** — constructed once, with the NON-FORWARDING RECORDER `D-117` (i) prescribes as its commit channel. */
const session = createGestureSession({
  source,
  commit: (): void => undefined,
})

/** THE SEAMS THE EXAMPLE OWNS (`D-117`: resizability and the pointer mapping are the authored card's, not a family's). */
const seams = gutterSeamExample()

/** THE PRESS: the demo's own listener, for the two facts the app's seams cannot carry — the reference x and the capture. */
let pressX = 0
handle.addEventListener('pointerdown', (event: Event): void => {
  pressX = (event as PointerEvent).clientX
  try {
    handle.setPointerCapture((event as PointerEvent).pointerId)
  } catch {
    /* capture is the DOM's; a refusal leaves the declared degradation (moves only while the pointer is over the handle) */
  }
})

/** THE DEMO'S OBSERVATIONS — recorded by the seams below, never computed by them. */
const observed = {
  starts: [] as unknown[],
  boundsReads: [] as unknown[],
  releases: [] as { readonly value: unknown; readonly gestureId: string }[],
  sinkWrites: [] as unknown[],
  previews: 0,
  lastPreview: null as null | { readonly value: number; readonly token: unknown; readonly valid: boolean; readonly resizable: boolean },
  attachRefusals: 0,
}

/** THE SINK — **THE DEMO'S OWN STATUS NODE** (`D-117`'s `write` role, with an authored node instead of a graph node). */
const write = (value: unknown): void => {
  const carried = typeof value === 'string' ? value : String(value)
  observed.sinkWrites.push(value)
  statusNode.textContent = `release: committed ${carried}`
  renderReadouts()
}

/** THE HANDLE'S ID WHERE IT CARRIES ONE — `''` otherwise, exactly as the app's own wiring reads it (`D-117`). */
const gestureIdOf = (gesture: unknown): string => {
  const held = (gesture as { readonly id?: unknown } | null | undefined)?.id
  return typeof held === 'string' ? held : ''
}

/** **THE DEMO'S ONE GESTURE KEY** — the app's closure keeps one (`GESTURE_KEY`) and hands it to every routed turn, because
 *  the composition's ending flag is keyed by whatever string it is handed and is total over any string (`renderer.ts`'s
 *  `gestures`). This page's handle authors no `id`, so the key is the `''` the sink's readout already records, and the
 *  preview's two routes and the release's sink reading all speak it. */
const GESTURE_KEY = gestureIdOf(handle)

/** THE PREVIEW — the DECLARED TRANSIENT INLINE-STYLE WRITE on the live target (`§2.5` item 4), never a graph write. */
const applyPreview = (state: unknown): void => {
  const held = state as { readonly value?: unknown; readonly token?: unknown; readonly valid?: unknown; readonly resizable?: unknown } | null | undefined
  const value = held?.value
  if (typeof value !== 'number' || !Number.isFinite(value)) return
  observed.previews += 1
  observed.lastPreview = { value, token: held?.token, valid: held?.valid === true, resizable: held?.resizable === true }
  // THE PREVIEW IS THE TARGET'S OWN WRITE — the readouts follow it, and the RECORD is NOT re-rendered over it.
  target.style.width = `${String(value)}px`
  // **AND THE ROUTES ARE ADDED, NEVER SUBSTITUTED** (`D-117`'s own seam form): a valid move sends the composition's ONE
  // `commitDrag` — so the placement lands at `['drag']` and the readout below reads what the composition wrote — and an
  // invalid one sends its ending, exactly as the app's `applyPreview` does. The style write precedes both.
  if (held?.valid === true) drag.move(GESTURE_KEY, state)
  if (held?.valid === false) drag.cancel(GESTURE_KEY)
  renderReadouts()
}

/**
 * THE AFFORDANCE — the app's, with the seams `D-117` splits. The two geometry seams DELEGATE to the composition and
 * record its answer: they compute nothing, they are the demo's probe around `createPaneDrag`, and that is the one place
 * the demo observes what the gesture read at establishment.
 */
const affordance = createGutterAffordance({
  session: session as never,
  source,
  element: handle,
  target,
  /** THE DEMO'S MAPPING — see this file's header: `start + (pointer.x − pressX)`, so a drag of `dx` changes the size by `dx`. */
  sizeFromPointer: (pointer, start): unknown => start + (pointer.x - pressX),
  pointerOf: seams.pointerOf,
  axisOf: seams.axisOf,
  /** THE DEMO'S CURSOR TABLE, keyed by the token the example's `axisOf` answers for THIS handle (`pane-a`). */
  cursorOf: (token: unknown): unknown => ({ cursor: token === DEFAULT_PANE_ID ? 'col-resize' : undefined }),
  applyPreview,
  applyCursor: seams.applyCursor,
  startSizeOf: (element: unknown, token: unknown): unknown => {
    const answer = drag.startSizeOf(element, token)
    observed.starts.push(answer)
    renderReadouts()
    return answer
  },
  boundsOf: (element: unknown, token: unknown): unknown => {
    const answer = drag.boundsOf(element, token)
    observed.boundsReads.push(answer)
    renderReadouts()
    return answer
  },
  resizableOf: seams.resizableOf,
  moveTypeOf: (): unknown => POINTER_TYPES.move,
  /** **THE SINGLE SINK WRITER IS `release`** (`D-117`): the sink first (this page's status node), then the route. */
  commit: (gesture, value): void => {
    observed.releases.push({ value, gestureId: gestureIdOf(gesture) })
    drag.release(gestureIdOf(gesture), value, write)
    // THE ROUTE HAS COMPOSED BY NOW (the stub applies it in the call; the app's crossing answers a tick later), so the
    // geometry the page shows after a release is the RECORD's — the preview's transient width is replaced by the truth.
    renderGeometry()
    renderReadouts()
  },
})

if (!affordance.attach()) {
  observed.attachRefusals += 1
  throw new Error('demo: the gutter affordance REFUSED to attach — the pane drag is inert')
}

/** THE MEASURED PANE (the family's own id) and A PANE THE FAMILY DOES NOT NAME — both through the app's derivation. */
const geometryOfPane = (): ReturnType<typeof paneGeometryIn> => stub.geometryOf(DEFAULT_PANE_ID)

/** THE GEOMETRY THE PAGE PAINTS — the record's size and pair, and nothing else (the preview writes over it in between). */
function renderGeometry(): void {
  const geometry = geometryOfPane()
  target.style.width = `${String(geometry.pane.size)}px`
  if (paneWidthNode !== null) {
    paneWidthNode.textContent = `${String(geometry.pane.size)}px · bounds {${String(geometry.pane.bounds.min)}, ${String(geometry.pane.bounds.max)}}`
  }
}

/** THE READOUTS — every number they show is a read of the stub, the composition or a module counter. */
function renderReadouts(): void {
  const geometry = geometryOfPane()
  const unnamed = stub.geometryOf('pane-unknown')
  if (stubReadingNode !== null) {
    stubReadingNode.textContent = [
      `stub shape for ['panes'] — the demo's stand-in for the view record (no bridge on this page)`,
      `  pane-a        size=${String(geometry.pane.size)}  bounds={min:${String(geometry.pane.bounds.min)}, max:${String(geometry.pane.bounds.max)}}  source='${geometry.source}'`,
      `  pane-unknown  size=${String(unnamed.pane.size)}  bounds={min:${String(unnamed.pane.bounds.min)}, max:${String(unnamed.pane.bounds.max)}}  source='${unnamed.source}'  (the measured default, D-87)`,
      `  route         commitPane calls=${String(stub.writes().length)}  ${JSON.stringify(stub.writes())}`,
    ].join('\n')
  }
  if (dragReadingNode !== null) {
    const sessionStats = session.stats()
    const affordanceStats = affordance.stats()
    const controllerStats = affordance.controller.stats()
    const lastStart = observed.starts.length === 0 ? '—' : JSON.stringify(observed.starts[observed.starts.length - 1])
    const lastBounds = observed.boundsReads.length === 0 ? '—' : JSON.stringify(observed.boundsReads[observed.boundsReads.length - 1])
    dragReadingNode.textContent = [
      `the gesture (every figure below is the app module's own counter)`,
      `  start read by the composition   ${lastStart}   (bounds ${lastBounds})`,
      `  session     ${JSON.stringify(sessionStats)}`,
      `  affordance  ${JSON.stringify(affordanceStats)}`,
      `  controller  ${JSON.stringify(controllerStats)}`,
      `  preview     ${JSON.stringify(observed.lastPreview)}   previews written=${String(observed.previews)}`,
      `  address     ['drag'] = ${JSON.stringify(stub.drag())}   (the composition's ONE write per move and its ending's delete, read at the address the record holds it — D-132: the surface keeps no member for it)`,
      `  releases    ${JSON.stringify(observed.releases)}   sink writes=${JSON.stringify(observed.sinkWrites)}`,
    ].join('\n')
  }
  if (zoneReadingNode !== null) {
    zoneReadingNode.textContent = [
      `the zone family this page does not have`,
      `  zoneOf('zone-1') = ${JSON.stringify(stub.members.zoneOf('zone-1'))}   zoneIn's measured missing arm is null (D-91)`,
      `  decoy on the handle's parent: size=${String(handle.parentElement?.getAttribute('size'))} min=${String(handle.parentElement?.getAttribute('min'))} max=${String(handle.parentElement?.getAttribute('max'))} — NEVER read by the composition`,
    ].join('\n')
  }
  // THE STATUS NODE'S INITIAL LINE, so the sink has a before-reading (a release overwrites it).
  if (observed.sinkWrites.length === 0) statusNode.textContent = 'release: none yet'
}

/** THE WHOLE PAGE — the record's geometry AND the readouts (the controls and the boot use this one). */
function render(): void {
  renderGeometry()
  renderReadouts()
}

/** THE CONTROLS — the demo's own, and the only way the stub's geometry moves. */
const control = (id: string): HTMLButtonElement | null => document.getElementById(id) as HTMLButtonElement | null
const sizeStep = (delta: number): void => {
  const current = geometryOfPane()
  stub.setSize(DEFAULT_PANE_ID, clampToBounds(current.pane.size + delta, current.pane.bounds))
  render()
}
control('ctl-size-inc')?.addEventListener('click', () => sizeStep(40))
control('ctl-size-dec')?.addEventListener('click', () => sizeStep(-40))
control('ctl-bounds-tight')?.addEventListener('click', () => {
  stub.setBounds(DEFAULT_PANE_ID, { min: 20, max: 180 })
  render()
})
control('ctl-bounds-default')?.addEventListener('click', () => {
  const measured = stub.geometryOf('pane-unknown').pane.bounds
  stub.setBounds(DEFAULT_PANE_ID, { min: measured.min, max: measured.max })
  render()
})
control('ctl-reset')?.addEventListener('click', () => {
  stub.reset()
  render()
})

render()

/** THE DRIVER'S DOOR — the same shape the retired demo exposed, rebuilt on the demo's own readings. */
;(window as unknown as Record<string, unknown>)['__pgdemo'] = {
  read: (): unknown => ({
    stub: { panes: stub.panes(), writes: stub.writes() },
    geometry: {
      [DEFAULT_PANE_ID]: stub.geometryOf(DEFAULT_PANE_ID),
      'pane-unknown': stub.geometryOf('pane-unknown'),
    },
    zone: stub.members.zoneOf('zone-1'),
    decoy: {
      size: handle.parentElement?.getAttribute('size') ?? null,
      min: handle.parentElement?.getAttribute('min') ?? null,
      max: handle.parentElement?.getAttribute('max') ?? null,
    },
    probe: { starts: [...observed.starts], boundsReads: [...observed.boundsReads] },
    drag: {
      releases: [...observed.releases],
      sinkWrites: [...observed.sinkWrites],
      previews: observed.previews,
      preview: observed.lastPreview,
      surfaceDrag: stub.drag(),
      attachRefusals: observed.attachRefusals,
      status: statusNode.textContent,
    },
    session: session.stats(),
    affordance: affordance.stats(),
    controller: affordance.controller.stats(),
    handle: { axis: handle.getAttribute('axis'), id: handle.id, cursor: handle.style.cursor },
    target: { width: target.style.width },
  }),
}
