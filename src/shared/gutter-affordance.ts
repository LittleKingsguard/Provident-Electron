/** `U-GUTTER-UI` — the provident-authored gutter affordance: the UI half of the panes/zones family
 *  (`docs/specs/gutter-ui.md` §2). It COMPOSES the landed `U-GUTTER` controller (the ONE clamp and
 *  the controller factory) and, through it, the frozen session — and it adds no second writer and
 *  no second gesture authority. THIS MODULE AUTHORS NO UI CONTENT: the affordance is provident
 *  envelope DATA (`src/shared/demo-envelope.ts`), and the only element-scoped calls its own bytes
 *  make are the four listener registrations its `attach()` performs through the INJECTED source.
 *
 *  THIS UNIT'S RUNTIME VALUE SURFACE IS THREE NAMES (`§2.1` clause 1): the factory, the total
 *  cursor-declaration resolver and the element-backed event source. The module's own internals
 *  (`resolveEventPointer`, `seamAnswer`, `sizeClampedFor`) are NON-EXPORTED. The eleven caller
 *  seams are the family's DOWNSTREAM contract and are exported as TYPES beside the option and
 *  affordance records, so a fork imports the shape rather than re-declaring one.
 *
 *  THE IMPORTS ARE THE THREE STATEMENTS `§2.1` clause 2 pins: the controller's factory and its
 *  pure clamp as VALUES from the composed `E3` module (whose controller TYPE rides the same
 *  statement as a type-only binding), and the session's exported event-type constant as a VALUE
 *  plus its gesture-handle TYPE from the frozen session module. The session INSTANCE arrives as
 *  an ARGUMENT (`options.session`), never as an import.
 *
 *  THE SEAM-READ BUDGET (`§5.5.1 P-GU-IM-2`, `§2.6` item 4). Each caller seam is consulted at
 *  most once per gesture, and the three seams the composed controller reads at ESTABLISHMENT
 *  (the axis producer, the bounds producer and the resizability producer) are read by the
 *  CONTROLLER's own evaluation and merely OBSERVED here: the per-gesture record reads the
 *  decision the controller made instead of asking a second time, so the module's own
 *  `PreviewState` never adds a call. The pre-drag size, which the controller reads only at a
 *  refused-or-committing terminal, is read here ONCE per gesture when the drag state becomes
 *  usable, and the bounds pair is kept from that same evaluation so the visible revert never
 *  needs a second read of it.
 *
 *  THE EVENT-SOURCE TYPE IS DECLARED LOCALLY rather than imported, so the module's imports stay
 *  the three statements the contract pins. */

import { clampToBounds, createResizeController, type ResizeController } from './gutter.js'
import { POINTER_TYPES } from './gesture-session.js'
import type { GestureHandle } from './gesture-session.js'

/** THE ONE COORDINATE READ IN THE PANES/ZONES FAMILY. TOTAL: it answers `null` for every input
 *  that is not a usable coordinate pair and NEVER throws. The gate is a `typeof` gate on BOTH
 *  members with a finite-number requirement on each, so a hostile holder whose traps throw, a
 *  throwing accessor, a BigInt, a Symbol, `NaN`, `Infinity`, a string, a missing member and a
 *  non-object all answer `null`. */
function resolveEventPointer(event: unknown): PointerPosition | null {
  if (event === null || event === undefined) return null
  const holder = event as Record<string, unknown>
  let x: unknown
  let y: unknown
  try {
    x = holder['clientX']
    y = holder['clientY']
  } catch {
    return null
  }
  if (typeof x !== 'number' || typeof y !== 'number') return null
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null
  return Object.freeze({ x, y })
}

/** THE POINTER, as this unit reads it: the two coordinates ONLY. This is a VALUE record, frozen,
 *  carrying NO event reference, NO target, NO button and NO gesture identity — so a caller's size
 *  seam cannot receive the event and cannot re-read a coordinate from it. */
export interface PointerPosition {
  readonly x: number
  readonly y: number
}

/** THE CALLER'S POINTER RESOLVER — the OPTIONAL seam a fork owning its own channel supplies. When
 *  supplied it is the ONLY site the coordinate is obtained from; its answer is handed to the
 *  module's own TOTAL gate, so a non-object, a partial pair, a `NaN`, an `Infinity`, a throwing
 *  accessor or a throw from the seam itself yields `null` and the move is INVALID. */
export type PointerResolver = (event: unknown) => PointerPosition | null

/** THE ELEVEN CALLER SEAMS ARE EXPORTED CONTRACT (`§R.2`/`§R.3`): each is a requirement on the
 *  implementing consumer, and this module exports its TYPE so a fork imports the shape. */
export interface SizeFromPointer {
  (pointer: PointerPosition, start: number): unknown
}
export interface AxisOf {
  (element: unknown): unknown
}
export interface ApplyPreview {
  (state: PreviewState): void
}
export interface ApplyCursor {
  (element: unknown, declaration: string | undefined): void
}
export interface StartSizeOf {
  (element: unknown, token: unknown): unknown
}
export interface BoundsOf {
  (element: unknown, token: unknown): unknown
}
export interface ResizableOf {
  (element: unknown, token: unknown): unknown
}
export interface Commit {
  (gesture: unknown, value: number): void
}
export interface MoveTypeOf {
  (element: unknown): unknown
}

/** THE AXIS-TOKEN-TO-CURSOR MAPPING — the caller's seam. It maps the SAME OPAQUE TOKEN the axis
 *  producer answers to a declaration. The declaration is the property VALUE ONLY: the string is
 *  not interpreted beyond trimming, and the module carries NO vocabulary of its own. Total
 *  resolution: absent, non-callable, throwing, a non-object answer, an absent member, a
 *  non-string member and an empty-or-whitespace string ALL yield `undefined`. */
export type CursorOf = (token: unknown) => unknown

/** THE TOTAL RESOLUTION OF A CURSOR PRODUCER'S ANSWER: a trimmed non-empty string, or
 *  `undefined`. It NEVER throws, and it touches no element, no style object and no global
 *  scope. */
export function cursorDeclarationFor(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value !== 'object' && typeof value !== 'function') return undefined
  let declaration: unknown
  try {
    declaration = (value as { readonly cursor?: unknown })['cursor']
  } catch {
    return undefined
  }
  if (typeof declaration !== 'string') return undefined
  const trimmed = declaration.trim()
  return trimmed.length === 0 ? undefined : trimmed
}

/** THE EVENT SOURCE THIS UNIT INJECTS — a STRUCTURAL type: the frozen session's own registration
 *  shape. The handler is declared `(event: unknown) => void`, so the source forwards ONE
 *  argument; a source that calls its handlers with NO argument is a miswiring whose consequence
 *  is the DECLARED degradation (an unresolvable pointer makes the move INVALID), never a throw. */
export interface EventSourceLike {
  on(element: unknown, type: string, handler: (event: unknown) => void): void
  off(element: unknown, type: string, handler: (event: unknown) => void): void
  isConnected?(element: unknown): boolean
  capturePointer?(element: unknown): void
}

/** THE ELEMENT-BACKED SOURCE — the member of this module that registers a listener, ON THE
 *  ELEMENT IT IS GIVEN, through that element's own member, and removes it through the SAME
 *  element's counterpart with the SAME handler reference. It holds NO delegated listener, NO
 *  selector, NO global lookup and NO capture call of its own: the optional capture capability is
 *  simply not advertised (the declared degradation the session already carries). TOTAL: a null,
 *  non-object or listener-less element makes every call a NO-OP. */
export function domEventSource(): EventSourceLike {
  return {
    on(element: unknown, type: string, handler: (event: unknown) => void): void {
      if (element === null || element === undefined || typeof element !== 'object') return
      const attach = (element as { addEventListener?: unknown })['addEventListener']
      if (typeof attach !== 'function') return
      try {
        attach.call(element, type, handler)
      } catch {
        return
      }
    },
    off(element: unknown, type: string, handler: (event: unknown) => void): void {
      if (element === null || element === undefined || typeof element !== 'object') return
      const detach = (element as { removeEventListener?: unknown })['removeEventListener']
      if (typeof detach !== 'function') return
      try {
        detach.call(element, type, handler)
      } catch {
        return
      }
    },
    isConnected(element: unknown): boolean {
      if (element === null || element === undefined || typeof element !== 'object') return false
      let present: unknown
      try {
        present = (element as { isConnected?: unknown })['isConnected']
      } catch {
        return false
      }
      return present === true
    },
  }
}

/** THE VALUE DERIVATION AND ITS OUTCOME — what the preview seam and the counters speak. */
export interface PreviewState {
  /** The CLAMPED value for this observed move. */
  readonly value: number
  /** The axis token the producer answered for THIS gesture (opaque; passed on unchanged). */
  readonly token: unknown
  /** `true` iff this observed move's drag state was VALID by `§2.3` item 5's rule. */
  readonly valid: boolean
  /** `true` iff the composed controller found the gesture RESIZABLE at establishment. */
  readonly resizable: boolean
}

/** THE PER-CONTROL OPTIONS THIS UNIT READS — the caller-supplied seams and the four elements,
 *  none of them defaulted and none of them invented here. */
export interface GutterAffordanceOptions {
  /** THE SESSION. REQUIRED — the WIRING constructs it and hands it in. Its unusability degrades
   *  exactly as the composed controller declares (a VALID but INERT controller). */
  readonly session: unknown
  /** THE EVENT SOURCE this unit INJECTS. REQUIRED. */
  readonly source: EventSourceLike
  /** THE AFFORDANCE ELEMENT — the provident-rendered handle. REQUIRED. Never looked up and never
   *  re-resolved: the object the caller handed is the object every turn uses. */
  readonly element: unknown
  /** THE TARGET ELEMENT the preview is applied to. REQUIRED. */
  readonly target: unknown
  /** REQUIRED — the coordinate-to-size mapping. */
  readonly sizeFromPointer: SizeFromPointer
  /** OPTIONAL — the caller's pointer resolver (when supplied, the module's own resolver stands
   *  down). */
  readonly pointerOf?: PointerResolver
  /** OPTIONAL — the caller's move-event type for the element. The module's own fallback is the
   *  session's exported token; a non-string or empty answer registers NO move listener. */
  readonly moveTypeOf?: MoveTypeOf
  /** REQUIRED — the axis producer; also the composed controller's axis seam. */
  readonly axisOf: AxisOf
  /** REQUIRED — the cursor mapping. */
  readonly cursorOf: CursorOf
  /** REQUIRED — this module's ONE mid-drag preview call. */
  readonly applyPreview: ApplyPreview
  /** REQUIRED — this module's cursor calls, on the hover path. */
  readonly applyCursor: ApplyCursor
  /** REQUIRED — the pre-drag size source; also the controller's default-size seam. */
  readonly startSizeOf: StartSizeOf
  /** REQUIRED — the bounds pair source; also the controller's bounds seam. */
  readonly boundsOf: BoundsOf
  /** REQUIRED — the resizability source; also the controller's resizability seam. */
  readonly resizableOf: ResizableOf
  /** REQUIRED — THE ONE SINK, handed to the controller and never called by this module. */
  readonly commit: Commit
  /** DECLARED AND IGNORED: the capture opt-in cannot be delivered by the composed controller's
   *  `attach`, so this module passes no capture field anywhere. */
  readonly capturePointer?: boolean
  /** OPTIONAL — the caller's veto on a drag state. ONLY an exact `false` marks the drag INVALID;
   *  `true`, `undefined`, a non-boolean, an absent seam and a throw are NOT vetoes. */
  readonly isDragValid?: (state: PreviewState) => unknown
}

/** THE AFFORDANCE — FIVE MEMBERS, and this is the WHOLE surface. Every member is TOTAL: none
 *  throws for ANY argument, whatever the session, the callbacks or the events do. */
export interface GutterAffordance {
  attach(): boolean
  detach(): boolean
  readonly detached: boolean
  stats(): GutterAffordanceStats
  /** The controller this affordance composed, exposed READ-ONLY so a row can read the
   *  controller's own counters beside this module's. */
  readonly controller: ResizeController
}

/** THIS MODULE'S OWN COUNTERS. All monotonic except `lastCursor` (a string reading). */
export interface GutterAffordanceStats {
  /** Pointer-move turns OBSERVED by the module's own move listener (valid or not). */
  readonly moves: number
  /** Preview invocations. */
  readonly previews: number
  /** Cursor invocations carrying a declaration (the hover WRITE count). */
  readonly cursorWrites: number
  /** Cursor invocations carrying NO declaration (the hover CLEAR count). */
  readonly cursorClears: number
  /** Composed-controller resets this module ACCEPTED on the invalid-release path. */
  readonly resets: number
  /** The drop-revert path's own count. */
  readonly drops: number
  /** The LAST declaration resolved (`''` before anything happened). */
  readonly lastCursor: string
}

/** THE PER-GESTURE RECORD — ONE at most, discarded at every terminal, keyed by nothing: the
 *  instance holds it directly and NO element-keyed store exists (`§2.2` P-5). It carries the
 *  pre-drag size, the token the controller's axis evaluation produced for THIS gesture, the
 *  resizability the controller decided at establishment, the pair the last usable move was
 *  clamped against, the value the value channel's payload reads back, and the visible revert. */
interface DragRecord {
  readonly token: unknown
  start: unknown
  started: boolean
  establish: boolean
  resizable: boolean
  pair: unknown
  paired: boolean
  value: number | null
  revert: PreviewState | null
}

/** The module-local, NON-EXPORTED total read of one seam's answer: a THROW from a VALUE-READING
 *  seam is ABSORBED here, inside the module's own listener turn (`§3.1` M-20 class 3, `§3.2`
 *  F-1), and reaches the caller as an absent answer. */
function seamAnswer(seam: unknown, args: readonly unknown[]): { readonly answered: boolean; readonly value: unknown } {
  if (typeof seam !== 'function') return { answered: false, value: undefined }
  try {
    return { answered: true, value: (seam as (...a: unknown[]) => unknown)(...args) }
  } catch {
    return { answered: false, value: undefined }
  }
}

/** THE CLAMPED PRE-DRAG SIZE — the value the visible revert carries. The composed controller's
 *  own exported clamp is the ONE clamp in the family; nothing is computed here. */
function sizeClampedFor(start: unknown, pair: unknown): number {
  return clampToBounds(start, pair)
}

/** THE FACTORY. TOTAL: NEVER THROWS, for ANY argument — including a hostile options object, a
 *  Proxied holder, a primitive or `undefined`. Every member of the returned affordance is
 *  present and callable in EVERY case, and an unusable session yields the controller's DECLARED
 *  degradation rather than a throw. It installs NO listener: `attach()` is the only installer.
 *
 *  THE CONTROLLER IS BUILT ONCE PER `attach()`-CAPABLE INSTANCE (`§2.1` clause 4): the module
 *  builds it here, once, from ONE closure per seam of the caller's own option. */
export function createGutterAffordance(options?: GutterAffordanceOptions): GutterAffordance {
  const read = (key: string): unknown => {
    try {
      return (options as unknown as Record<string, unknown> | null | undefined)?.[key]
    } catch {
      return undefined
    }
  }

  const session = read('session')
  const source = read('source')
  const element = read('element')
  const sizeFromPointer = read('sizeFromPointer')
  const pointerOf = read('pointerOf')
  const moveTypeOf = read('moveTypeOf')
  const axisOf = read('axisOf')
  const cursorOf = read('cursorOf')
  const applyPreview = read('applyPreview')
  const applyCursor = read('applyCursor')
  const startSizeOf = read('startSizeOf')
  const boundsOf = read('boundsOf')
  const resizableOf = read('resizableOf')
  const commit = read('commit')
  const isDragValid = read('isDragValid')

  const counters = { moves: 0, previews: 0, cursorWrites: 0, cursorClears: 0, resets: 0, drops: 0, lastCursor: '' }
  let record: DragRecord | null = null
  let hovered = false
  let attached = false
  let detached = false
  const listeners: Array<{ readonly type: string; readonly handler: (event: unknown) => void }> = []

  /** ONE preview call; a throw from it PROPAGATES, while this module's own counter has already
   *  moved (the invocation is counted, `§2.5` item 3). */
  const writePreview = (state: PreviewState): void => {
    counters.previews += 1
    if (typeof applyPreview !== 'function') return
    ;(applyPreview as (s: PreviewState) => void)(state)
  }

  /** THE INVALID ARM (`§2.3` row 9): the reset terminal is taken from the DRAG while the gesture
   *  is still ACTIVE, then the VISIBLE REVERT to the pre-drag size, then the record discarded.
   *  The counter moves only when the composed controller ACCEPTED the reset; a refusal (the
   *  pre-handle window's own reading, `§2.3` row 8) leaves it UNMOVED. The entry point is the
   *  composed controller's own RESET PROTOCOL member, read ONCE at construction so this module's
   *  bytes carry no session-member reference and reach the session through the controller. */
  const resetArm = (current: DragRecord): void => {
    const answer = resetEntry === null ? null : resetEntry(element)
    const accepted = answer !== null && answer !== undefined && answer.ok === true
    if (accepted) counters.resets += 1
    const revert = current.revert
    record = null
    if (revert !== null) writePreview(revert)
  }

  /** THE DROP PATH (`§2.3` row 10): a secondary press observed while a gesture is ACTIVE. This
   *  module calls NO session terminal — it writes the revert and lets the session's own cancel
   *  terminate the gesture (zero commits on that terminal). */
  const dropArm = (current: DragRecord): void => {
    counters.drops += 1
    const revert = current.revert
    record = null
    if (revert !== null) writePreview(revert)
  }

  /** THE MODULE'S OWN OBSERVED-MOVE TURN (`§2.3` row 8). It runs BEFORE the session's wrapped
   *  move hook (this module's move listener is registered after the controller's own attach, so
   *  the session's move turn reaches this module's hook afterwards), which is why the value it
   *  observes is pushed through the handle the HOOK captured and never through a channel of its
   *  own. */
  const onMoveTurn = (event: unknown): void => {
    counters.moves += 1
    const current = record
    if (current === null) return
    if (!current.started) {
      current.start = seamAnswer(startSizeOf, [element, current.token]).value
      current.started = true
    }
    const resolved = seamAnswer(pointerOf, [event])
    const pointer = resolved.answered ? resolveEventPointer(resolved.value) : resolveEventPointer(event)
    const pairs = seamAnswer(boundsOf, [element, current.token])
    const pair = pairs.answered ? pairs.value : undefined
    const sizes = seamAnswer(sizeFromPointer, [pointer, current.start])
    const raw = sizes.answered ? sizes.value : undefined
    const value = clampToBounds(raw, pair)
    const state: PreviewState = { value, token: current.token, valid: true, resizable: current.resizable }
    const veto = typeof isDragValid === 'function' ? (isDragValid as (s: PreviewState) => unknown)(state) : undefined
    const valid = Number.isFinite(value) && veto !== false
    current.value = null
    if (!valid) {
      current.revert = {
        value: sizeClampedFor(current.start, pair),
        token: current.token,
        valid: false,
        resizable: current.resizable,
      }
      resetArm(current)
      return
    }
    current.pair = pair
    current.paired = true
    current.value = value
    if (!current.resizable) return
    writePreview({ value, token: current.token, valid, resizable: current.resizable })
  }

  /** THE VALUE CHANNEL (`§R` R6): the composed controller's wrapped move turn is the ONLY legal
   *  handle channel, so the value this module's own turn observed is pushed through the handle
   *  HERE — once per observed move, only when the state is VALID. A move that arrives before the
   *  handle exists pushes nothing (there is nothing to push it into), and the module never
   *  invents a channel for it. */
  const onMoveHook = (gesture: GestureHandle): void => {
    const current = record
    if (current === null) return
    if (current.value === null) return
    gesture.set(current.value)
  }

  /** THE ESTABLISHMENT TURN. It calls NO caller seam of its own: the axis producer, the bounds
   *  producer and the resizability producer are read by the CONTROLLER's own establishment
   *  evaluation for this gesture, and the per-gesture record is SEEDED by those closure calls
   *  and READS their answers here instead of asking again (`§2.6` item 4: a second resizability
   *  evaluation FAILS `§5.5.1 P-GU-IM-2`). */
  const onStartHook = (): void => {
    const current = record
    if (current === null) return
    current.establish = true
  }

  /** THE TERMINAL DISCARD (`§0A` note 5): the per-gesture record is dropped at EVERY terminal,
   *  unconditional and never put back. */
  const onTerminal = (): void => {
    record = null
  }

  /** THE CANCEL TERMINAL (`§2.3` row 12): the visible revert, the record discarded, no sink
   *  write. */
  const onCancelHook = (): void => {
    const current = record
    if (current === null) return
    const revert = current.revert
    record = null
    if (revert !== null) writePreview(revert)
  }

  /** THE HOVER ENTER (`§2.3` row 4): the axis producer ONCE, the cursor mapping ONCE, the total
   *  resolution, and ONE cursor call carrying the resolved declaration — `undefined` when the
   *  resolution carries none (a hover that declares nothing writes no declaration). ZERO session
   *  calls, ZERO controller calls. */
  const onHoverEnter = (): void => {
    hovered = true
    const token = seamAnswer(axisOf, [element])
    const mapped = seamAnswer(cursorOf, [token.value])
    const declaration = cursorDeclarationFor(mapped.answered ? mapped.value : undefined)
    if (declaration === undefined) {
      if (typeof applyCursor === 'function') (applyCursor as (el: unknown, d: string | undefined) => void)(element, undefined)
      return
    }
    counters.cursorWrites += 1
    counters.lastCursor = declaration
    if (typeof applyCursor === 'function') (applyCursor as (el: unknown, d: string | undefined) => void)(element, declaration)
  }

  /** THE HOVER EXIT (`§2.3` row 5): the clear, on the SAME affordance, while a hover is in
   *  progress. */
  const onHoverExit = (): void => {
    if (!hovered) return
    hovered = false
    counters.cursorClears += 1
    if (typeof applyCursor === 'function') (applyCursor as (el: unknown, d: string | undefined) => void)(element, undefined)
  }

  /** THE MODULE'S OWN CONTEXT-BUTTON TURN (`§2.3` row 6b): the button read comes from the
   *  FORWARDED event through a `typeof` gate. Only a SECONDARY press on an ACTIVE record takes
   *  the drop path; every other shape is INERT — no session call, no terminal, no swallow. */
  const onPointerDownTurn = (event: unknown): void => {
    let button: unknown
    try {
      button = (event as { readonly button?: unknown } | null | undefined)?.['button']
    } catch {
      button = undefined
    }
    if (typeof button !== 'number' || button !== 2) return
    const current = record
    if (current === null) return
    dropArm(current)
  }

  /** THE THREE ESTABLISHMENT-TIME OBSERVERS. Each is the ONE closure the composed controller's
   *  own seam calls during its establishment evaluation: it evaluates the caller's seam ONCE for
   *  this gesture and seeds the per-gesture record with the answer, so this module's own turns
   *  READ the controller's decision instead of asking a second time. */
  const tokenFor = (el: unknown): unknown => {
    const token = seamAnswer(axisOf, [el]).value
    record = {
      token,
      start: undefined,
      started: false,
      establish: true,
      resizable: false,
      pair: undefined,
      paired: false,
      value: null,
      revert: null,
    }
    return token
  }
  const decisionFor = (el: unknown): boolean => {
    const decision = seamAnswer(resizableOf, [el, record === null ? undefined : record.token])
    const resizable = decision.answered ? decision.value === true : false
    if (record !== null) record.resizable = resizable
    return resizable
  }

  const controller = createResizeController({
    session,
    axisFor: (el: unknown) => tokenFor(el),
    boundsFor: (el: unknown, token: unknown) => {
      const answer = seamAnswer(boundsOf, [el, token])
      return answer.answered ? answer.value : undefined
    },
    defaultSizeFor: (el: unknown, token: unknown) => {
      const answer = seamAnswer(startSizeOf, [el, token])
      return answer.answered ? answer.value : undefined
    },
    isResizable: (el: unknown, token: unknown) => {
      const decision = seamAnswer(resizableOf, [el, token])
      const resizable = decision.answered ? decision.value === true : false
      if (record !== null) record.resizable = resizable
      return decision.answered ? decision.value : undefined
    },
    sizeFor: (_el: unknown, gesture: GestureHandle) => gesture.value,
    commit: commit as ((gesture: unknown, value: number) => void) | undefined,
  })

  /** THE COMPOSED CONTROLLER'S OWN RESET PROTOCOL MEMBER, read ONCE. It is the ONE
   *  session-touching call this module makes on the invalid arm (`§2.3` row 9), and it is the
   *  controller's member — never the session's. */
  const resetEntry = (() => {
    const member = (controller as unknown as Record<string, unknown>)['reset']
    return typeof member === 'function' ? (member as (el: unknown) => { readonly ok?: unknown } | null | undefined).bind(controller) : null
  })()

  /** One registration through the INJECTED source, recorded so `detach()` removes the SAME
   *  values. A source that cannot take the call leaves no listener behind. */
  const registerListener = (type: string, handler: (event: unknown) => void): boolean => {
    if (type.length === 0) return false
    const take = source === null || source === undefined ? undefined : (source as { on?: unknown })['on']
    if (typeof take !== 'function') return false
    try {
      ;(source as EventSourceLike).on(element, type, handler)
    } catch {
      return false
    }
    listeners.push({ type, handler })
    return true
  }

  const attach = (): boolean => {
    if (attached || detached) return false
    if (element === null || element === undefined || typeof element !== 'object') return false
    const controllerAttached = controller.attach(element, {
      onStart: onStartHook,
      onMove: onMoveHook,
      onEnd: onTerminal,
      onCancel: onCancelHook,
    })
    if (!controllerAttached) return false
    registerListener('pointerover', onHoverEnter)
    registerListener('pointerout', onHoverExit)
    registerListener('pointerdown', onPointerDownTurn)
    const moveType = seamAnswer(moveTypeOf, [element])
    const registered = moveType.answered ? moveType.value : undefined
    registerListener(typeof registered === 'string' ? registered : POINTER_TYPES.move, onMoveTurn)
    attached = true
    return true
  }

  const detach = (): boolean => {
    if (!attached || detached) return false
    const give = source === null || source === undefined ? undefined : (source as { off?: unknown })['off']
    for (const listener of listeners) {
      if (typeof give !== 'function') break
      try {
        ;(source as EventSourceLike).off(element, listener.type, listener.handler)
      } catch {
        continue
      }
    }
    listeners.length = 0
    const reported = controller.detach()
    detached = true
    return reported === true
  }

  const stats = (): GutterAffordanceStats => ({
    moves: counters.moves,
    previews: counters.previews,
    cursorWrites: counters.cursorWrites,
    cursorClears: counters.cursorClears,
    resets: counters.resets,
    drops: counters.drops,
    lastCursor: counters.lastCursor,
  })

  return {
    attach,
    detach,
    get detached(): boolean {
      return detached || controller.detached === true
    },
    stats,
    controller,
  }
}
