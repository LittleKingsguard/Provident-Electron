// tests/unit/renderer-wiring/state-checked-paint.test.ts — **THE STATE CHECK, DRIVEN** (`D-163`; `docs/L3/renderer-wiring/design.md`
// §4, §6 and §8's owed `RS-1`…`RS-6`).
//
// THE SUBJECT, AND WHY NOTHING ELSE IN THIS TREE COULD MEASURE IT. `D-163` replaces three `lastApplied`-shaped CHANGE GUARDS with a
// check of the node the write would LAND ON, and rev 13 corrects that check's arm: the paint is owed unless the surface answers a
// POSITIVE SETTLED MATCH — `wanted !== undefined && readable && held === wanted` — so a REMOVAL ALWAYS PAINTS, even where the
// member already reads absent. `D-163`'s `!readable || held !== wanted` skipped exactly that arm, and the measurement is `OV-12`'s
// close (`written: false`) and `OV-14`'s tag still carrying `inert="true"` over a pane the record had closed. **NO ROW IN THIS TREE
// READS A `props.<name>` WRITE BACK BEFORE THIS FILE** (design §4's own sentence: `T-2` asserts the RENDERED attribute and `OV-14`
// the reading), so the positive arm had no instrument at all and the removal arm none it could fail on — which is why this file is
// the first `props` read-back and not a re-grain of an existing one.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked-file` marker and GATES (`D-40`): UNMARKED, no carve-out, and
// every row is meant to be able to fail. `RS-3` in particular is the row that would have caught this defect, and the row was
// PROVED able to red by reverting the predicate to `held === wanted` on a throwaway copy of the source (its own note says so).
//
// THE HARNESS — A STUB RUNTIME WHOSE `nodeState` ANSWERS `states[0].props` (and `states[0].content`, which is the read-out's own
// relation). It APPLIES the `state-slice` it is handed back onto that surface, so the second delivery of a row is measured against
// a surface the first delivery MOVED — the shape of a real renderer graph, and the only way a SKIP can be told from an unreached
// arm. Both state-checked sites are driven through their own declared factories (`startThemeApplication`, `startOverlayApplication`)
// and the read-out through `startGutterAffordance`'s returned `renderPaneSize`; the view client is the realm's ONE singleton,
// refilled by `adopt` — the delivery's own refill — so no bridge is stubbed and no route is invented.
//
// THE ROWS:
//   · `RS-1` — the read-out's paint is owed IFF the family arm reads `'record'`; a `'default'` panes arm paints NOTHING (`D-127`).
//   · `RS-2` — a POSITIVE SETTLED MATCH skips: `readable && held === wanted` paints nothing.
//   · `RS-3` — **A REMOVAL ALWAYS PAINTS**, even where `held` already reads `undefined` (the point of the pass).
//   · `RS-4` — an UNREADABLE surface fails open: it paints, and its refusal does not throw out of either turn.
//   · `RS-5` — a removal delivery takes NO `nodeState` read (the operand order decides it first), while a positive-wanted site
//     takes exactly ONE per delivery.
//   · `RS-6` — **THE WRITE'S OWN ANSWER ENDS THE TRANSIENT, AND ONLY THE RIGHT ANSWER DOES** (`D-166`'s `F6`, design §4/§8):
//     a `refused` close CLEARS `closing` and leaves the STORE's word (the refusal moves no `derived`, and the pane stays up);
//     a SUPERSEDED answer settles nothing; a LOST answer (a rejection, or a thenable carrying no usable `status`) clears by
//     the same path; a NON-THENABLE settles nothing, so the DELIVERY stays the only clearer — the clause that keeps
//     `OV-1(4)`, `OV-7` and `OV-14(c)` green — and a `committed` answer settles nothing either, the arm that reds the moment a
//     fix settles on ANY answer; and the two registers are `console.error` for a refusal and `console.warn` for a
//     loss, each carrying its own reason. **THIS ROW IS THE TREE'S FIRST CONSOLE READING**: both members are spied and MUTED,
//     the messages collected, and the spies restored in a `finally` — the row then reads `vi.isMockFunction` to prove the
//     globals are the real functions again, because a spy left behind would silence every later file's report.
//
// WHAT THIS GREEN IS WORTH (`AGENTS.md`, D-27): the node suite runs under a layout-less DOM shim, so this is ENVELOPE-green — three
// wiring turns' decisions over a stub surface, never a rendered one. The rendered-surface instruments are `npm run ui`'s overlay
// row and `npm run divergence`.

import { describe, expect, it, vi } from 'vitest'

import {
  getViewClient,
  startGutterAffordance,
  startOverlayApplication,
  startThemeApplication,
  type OverlayApplicationReading,
  type OverlayPaneCrossing,
  type ThemeApplicationReading,
} from '../../../src/renderer/renderer.js'
import type { Runtime } from '../../../src/renderer/runtime.js'
import type { ViewCommittedReading } from '../../../src/renderer/view-client.js'
import {
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  viewThemePlaceholder,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewThemeDeclaration,
} from '../../../src/shared/view-shape.js'
import { APP_ROOT_ID, GUTTER_STATUS_ID, OVERLAY_STATE_ID } from '../../../src/shared/demo-envelope.js'

/** One `state-slice` mutation, as the stub reads it back: the members the two applications compose and nothing else. */
interface Mutation {
  readonly targetProp?: unknown
  readonly mode?: unknown
  readonly value?: unknown
}

/** One `applyCommand`'s payload — the command the wiring handed the runtime, recorded by value. */
interface Command {
  readonly kind?: unknown
  readonly node?: unknown
  readonly mutation?: readonly Mutation[]
}

/** **THE SURFACE THE STUB HOLDS FOR ONE NODE** — the two members the three paints read as `states[0]`. `content` is the
 *  read-out's (`authoredSettingOf`), `props` the two declarations' (`authoredPropOf`); the stub carries both so ONE surface
 *  can answer all three sites and a row never has to pretend a node has one shape. */
interface Surface {
  content?: string
  readonly props: Record<string, unknown>
}

interface StubOptions {
  /** Every `nodeState` read THROWS — `resolveTarget`'s own *unresolved target*, the declared unreadable arm. */
  readonly readThrows?: boolean
  /** The status every `applyCommand` answers (`'applied'` by default; `'refused'` drives the reported-refusal arm). */
  readonly writeStatus?: string
}

/** **THE ELEMENT DOUBLE THE AFFORDANCE NEEDS** — the members `domEventSource` and the affordance's own gates consult
 *  (`tests/unit/renderer-wiring/preview-seat.test.ts`'s double, cut to what this file drives: no gesture is fired here, so no
 *  `fire` member). `isConnected` is MEASURED and not decoration: the session asks it once per `begin` and only an exact `true`
 *  admits a gesture — this file never begins one, but the wiring's `attached` reading depends on the listeners installing. */
interface ElementDouble {
  readonly handlers: Map<string, ((event: unknown) => void)[]>
  readonly style: { setProperty(property: string, text: string): void }
  readonly isConnected: true
  addEventListener(type: string, handler: (event: unknown) => void): void
  removeEventListener(type: string, handler: (event: unknown) => void): void
  getAttribute(name: string): string | null
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
}

function elementDouble(): ElementDouble {
  const handlers = new Map<string, ((event: unknown) => void)[]>()
  return {
    handlers,
    style: {
      setProperty(): void {
        // the preview's inline write is `PS-2`/`PS-3`'s subject and this file drives no gesture at all
      },
    },
    isConnected: true,
    addEventListener(type: string, handler: (event: unknown) => void): void {
      const held = handlers.get(type)
      if (held === undefined) handlers.set(type, [handler])
      else held.push(handler)
    },
    removeEventListener(type: string, handler: (event: unknown) => void): void {
      handlers.set(type, (handlers.get(type) ?? []).filter((candidate) => candidate !== handler))
    },
    getAttribute(): string | null {
      return null
    },
    setAttribute(): void {
      // the ghost declaration is not this file's subject
    },
    removeAttribute(): void {
      // …nor its removal
    },
  }
}

interface Stub {
  readonly runtime: Runtime
  readonly reads: string[]
  readonly commands: Command[]
  /** Seed one node's surface BEFORE the row drives a turn: the authored state a boot would have rendered. */
  seed(id: string, next: { readonly content?: string; readonly props?: Record<string, unknown> }): void
  /** The surface as it now stands — the write-back the second delivery of a row is measured against. */
  surfaceOf(id: string): Surface
}

/** **THE STUB RUNTIME — `nodeState` IS THE ROLE, AND THE WRITE LANDS ON THE SURFACE IT ANSWERS.** `elementForNodeId` answers a
 *  fresh element double for every id the affordance resolves, `applyCommand` RECORDS the command and APPLIES it (a `content`
 *  replace, a `props.<name>` replace and a `props.<name>` REMOVAL — the three mutations the wiring composes), and `nodeState`
 *  answers `states[0]` of that same surface or an ABSENT node (no `states`, the declared unreadable answer) when nothing was
 *  seeded. The read is pushed to `reads` BEFORE the throw gate, so a row can state that an unreadable site's read was TAKEN. */
function stubRuntime(options: StubOptions = {}): Stub {
  const surfaces = new Map<string, Surface>()
  const reads: string[] = []
  const commands: Command[] = []
  const surfaceFor = (id: string): Surface => {
    const held = surfaces.get(id)
    if (held !== undefined) return held
    const fresh: Surface = { props: {} }
    surfaces.set(id, fresh)
    return fresh
  }
  const runtime = {
    elementForNodeId(): unknown {
      return elementDouble()
    },
    nodeState(id: string): unknown {
      reads.push(id)
      if (options.readThrows === true) throw new Error('unresolved target')
      const held = surfaces.get(id)
      // AN ABSENT NODE ANSWERS NO `states` — the arm `authoredPropOf`/`authoredSettingOf` read as `readable: false`.
      if (held === undefined) return { nodeId: id }
      return { nodeId: id, states: [{ content: held.content, props: held.props }] }
    },
    applyCommand(command: Command): { readonly status: string } {
      commands.push(command)
      const node = typeof command.node === 'string' ? command.node : ''
      if (node !== '' && command.kind === 'state-slice') {
        const held = surfaceFor(node)
        for (const mutation of command.mutation ?? []) {
          const prop = mutation.targetProp
          if (prop === 'content') {
            held.content = String(mutation.value)
          } else if (typeof prop === 'string' && prop.startsWith('props.')) {
            const name = prop.slice('props.'.length)
            // THE REMOVAL ARM IS THE MECHANISM'S: an `undefined` on `props.<key>` takes the member OFF the surface, which is
            // exactly the state a second removal delivery paints over again (`RS-3`).
            if (mutation.value === undefined) delete held.props[name]
            else held.props[name] = mutation.value
          }
        }
      }
      return { status: options.writeStatus ?? 'applied' }
    },
  }
  return {
    runtime: runtime as unknown as Runtime,
    reads,
    commands,
    seed(id: string, next: { readonly content?: string; readonly props?: Record<string, unknown> }): void {
      const held = surfaceFor(id)
      if (next.content !== undefined) held.content = next.content
      // THE `props` OBJECT IS REPLACED MEMBER FOR MEMBER AND ITS IDENTITY IS KEPT — the same object every `nodeState` answers, so a
      // row can take a member OFF a surface (`RS-2`'s control) and the delivery under test still reads the surface it moved.
      if (next.props !== undefined) {
        for (const name of Object.keys(held.props)) delete held.props[name]
        for (const [name, value] of Object.entries(next.props)) held.props[name] = value
      }
    },
    surfaceOf: surfaceFor,
  }
}

interface AdoptOptions {
  readonly panes?: readonly ViewPaneGeometry[]
  readonly panesSource?: ViewGeometrySource
  readonly declaration?: ViewThemeDeclaration
}

/** **THE DELIVERY'S OWN REFILL** — `createViewClient`'s `adopt`, the member `fill()` and every delivery end in, driven directly so
 *  no bridge, no route and no poll is stubbed. A family whose `source` word the row does not set stands at `'default'`: the arm
 *  where the record did NOT answer, which is `RS-1`'s control. */
function adopt(options: AdoptOptions = {}): ViewCommittedReading {
  const reading: ViewCommittedReading = {
    status: 'committed',
    panes: options.panes ?? [],
    zones: [],
    theme:
      options.declaration === undefined
        ? viewThemePlaceholder()
        : { token: 'dark', attribute: 'data-theme', declaration: options.declaration },
    source: {
      panes: options.panesSource ?? 'default',
      zones: 'default',
      theme: options.declaration === undefined ? 'default' : 'record',
    },
  }
  getViewClient().adopt(reading)
  return reading
}

/** The panes family's ONE entry for the app's measured pane — the figure `paneSizeOf(DEFAULT_PANE_ID)` answers, whichever arm
 *  the `source` word names. **THE FIGURE SITS AT THE PANE'S ADJUSTABLE MEMBER AND THE OTHER MEMBER IS THE CONTROL** (`D-189`,
 *  `D-191`): `pane-a` carries no `zone`, so `C-9`/`C-12` make its ADJUSTABLE axis the `height` — the `width` is held at the
 *  measured default, so a read-out that painted the wrong member could not answer the record's figure by coincidence. */
const panesAt = (figure: number): readonly ViewPaneGeometry[] => [
  { id: DEFAULT_PANE_ID, width: DEFAULT_PANE_SIZE, height: figure, bounds: { min: 0, max: 200 } },
]

/** A crossing that answers the store's own word and records the acts — the overlay's two members, no third. */
function crossingOf(word: boolean): { open(): boolean; write(): void } {
  return { open: () => word, write: (): void => undefined }
}

/** **A DEFERRED ANSWER — THE ONE THING A `write` THAT ANSWERS LATE NEEDS** (`D-166`, design §4). The crossing's member hands
 *  back this promise and the ROW decides when, and with what, it settles — which is the only way a superseded answer can be
 *  resolved AFTER a newer ask, and the only way a rejection can be delivered on cue. */
interface Deferred {
  readonly promise: Promise<unknown>
  settle(answer: unknown): void
  fail(reason: unknown): void
}

function deferred(): Deferred {
  let fulfil: (answer: unknown) => void = () => undefined
  let fail: (reason: unknown) => void = () => undefined
  const promise = new Promise<unknown>((resolve, reject) => {
    fulfil = resolve
    fail = reject
  })
  return {
    promise,
    settle: (answer: unknown): void => {
      fulfil(answer)
    },
    fail: (reason: unknown): void => {
      fail(reason)
    },
  }
}

interface AnsweringCrossing {
  readonly crossing: OverlayPaneCrossing
  /** Every boolean the act asked the crossing for, in order — the ASK, never the outcome. */
  readonly asks: boolean[]
}

/** **THE SETTLE'S INSTRUMENT — A CROSSING WHOSE `write` HANDS BACK WHAT THE ROW TELLS IT TO** (`D-166`, design §4). `open()`
 *  is the store's LAST DELIVERED WORD (the row moves the store by calling `render()` after the word has moved, never by a
 *  write) and `write(open)` records the ask and returns the row's own answer: a deferred promise, a settled one, a rejection,
 *  or one of the shapes the declared member `Promise<unknown> | void` does NOT admit — `null`, a bare answer object carrying
 *  no `then`. That is why the literal is CAST, once, here and only here: the settle reads the answer STRUCTURALLY, so its
 *  non-thenable arm can only be driven by handing back something the type forbids, and a double is where such a shape
 *  belongs. */
function answeringCrossing(word: boolean | null, answer: (open: boolean) => unknown): AnsweringCrossing {
  const asks: boolean[] = []
  const crossing = {
    open: (): boolean | null => word,
    write: (open: boolean): unknown => {
      asks.push(open)
      return answer(open)
    },
  } as unknown as OverlayPaneCrossing
  return { crossing, asks }
}

interface ConsoleCapture {
  readonly errors: string[]
  readonly warns: string[]
  restore(): void
}

/** **THE TREE'S FIRST CONSOLE READING** (design §8) — a helper rather than five inline spies, because a spy that is not
 *  restored is a GLOBAL patched for every file after it, silently swallowing their reports. The two channels are collected
 *  with the spies MUTED (an expected refusal must not print into the run) and `restore()` is called from a `try/finally`,
 *  while the row's last assertion reads `vi.isMockFunction` rather than trusting the `finally` to have run. */
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

/** **FLUSH THE MICROTASK QUEUE** — the settle's continuation runs off the promise the crossing handed back, so a row that has
 *  just resolved one must let the queue drain before it reads the transient. No timer, no fake clock, no sleep: a microtask
 *  drain is exactly what that continuation is. */
async function flushAnswers(): Promise<void> {
  for (let turn = 0; turn < 6; turn += 1) await Promise.resolve()
}

describe('D-163 · `docs/L3/renderer-wiring/design.md` §4/§6 — the state-checked paint, `RS-1`…`RS-6`', () => {
  it('RS-1 — **THE PAINT IS OWED IFF THE FAMILY ARM READS `\'record\'`**: a `[\'panes\']` delivery carrying `140` over a `\'record\'` family paints `content` `140` on `GUTTER_STATUS_ID`, a SECOND delivery of the same size writes NOTHING (the state check), and a `\'default\'` panes arm paints NOTHING even though its figure is the same `140` — the gate is the FAMILY and never `filled` (`D-127`)', () => {
    const stub = stubRuntime()
    // A STUB DOUBLE SEEDING THE RUNTIME, NOT A COPY OF THE ENVELOPE (`F3`, `D-129`): the envelope authors NO figure on this
    // node any more — `#gutter-status` carries `css.id`, `css.classes` and `props.id` and no `content` — so what the read-out
    // carries before its first delivery paints it is NOTHING. The `100` below is the STUB'S — a surface for the state check
    // to compare against, which is why the seed's value may stay a figure the envelope does not author.
    stub.seed(GUTTER_STATUS_ID, { content: '100' })
    const started = startGutterAffordance(stub.runtime)
    expect(
      started.attached,
      'RS-1 — the wiring is LIVE (its listeners installed, `D-117`): a turn measured over a refused `attach()` would be inert for a reason this row is not about',
    ).toBe(true)
    expect(
      typeof started.renderPaneSize,
      'RS-1 — the read-out is a THIRD hand-out and not the deleted sink (`F3`): the turn exists to be called by the shape\'s ONE delivery',
    ).toBe('function')

    // (a) THE RECORD ANSWERED: the delivery's figure is painted.
    adopt({ panes: panesAt(140), panesSource: 'record' })
    const before = stub.commands.length
    started.renderPaneSize()
    expect(
      stub.commands.length,
      'RS-1 — one `state-slice` for the delivery: the surface carried this stub\'s OWN seed `100` (the envelope authors no `content` on this node, `D-174`) and the record says `140`',
    ).toBe(before + 1)
    expect(
      stub.commands[before],
      'RS-1 — and it is ONE `content` replace on the AUTHORED status node, carrying the record\'s own figure as a string — the same member `startSizeOf` answers (`D-117`)',
    ).toEqual({
      kind: 'state-slice',
      node: GUTTER_STATUS_ID,
      mutation: [{ targetProp: 'content', mode: 'replace', value: '140' }],
    })
    expect(stub.surfaceOf(GUTTER_STATUS_ID).content, 'RS-1 — so `get_node_state` now reads the record\'s figure').toBe('140')

    // (b) A SECOND DELIVERY CARRYING THE SAME SIZE WRITES NOTHING: the surface already holds it, and a presence comparison is
    //     exactly the skip the rule ALLOWS (`F3`'s check has no removal arm: `value` is `String(…)` and never `undefined`).
    started.renderPaneSize()
    expect(
      stub.commands.length,
      'RS-1 — the redundant delivery is SKIPPED: this paint is presence-keyed, which is the one shape an absence-keyed skip\'s defect cannot reach (`D-163`, design §4 `S3`)',
    ).toBe(before + 1)

    // (c) THE `\'default\'` ARM, DRIVEN EXPLICITLY: the record did NOT answer, and the figure it would paint is still `140` — so
    //     a row that let the size decide would paint here. `D-127`: a failed read turned into a state.
    adopt({ panes: panesAt(140), panesSource: 'default' })
    expect(
      getViewClient().shape().source.panes,
      'RS-1 — the control: this reading\'s arm IS `\'default\'`, which is the fact the gate reads',
    ).toBe('default')
    expect(
      getViewClient().paneSizeOf(DEFAULT_PANE_ID),
      'RS-1 — and the figure is AVAILABLE and unchanged, so the silence below is the ARM\'s and not a missing value',
    ).toBe(140)
    stub.seed(GUTTER_STATUS_ID, { content: '999' })
    started.renderPaneSize()
    expect(
      stub.commands.length,
      'RS-1 — NOTHING is painted on the `\'default\'` arm: the surface keeps this stub\'s OWN seed `999` — the envelope authors no `content` on this node, so no authored figure stands (`D-174`) — because a panes family the record did not answer carries no figure this realm may call a state (`D-127`)',
    ).toBe(before + 1)
    expect(stub.surfaceOf(GUTTER_STATUS_ID).content, 'RS-1 — and the surface this stub seeded stands untouched at `999`, which is the reading the arm leaves').toBe('999')
  })

  it('RS-2 — **A POSITIVE SETTLED MATCH SKIPS**: `readable && held === wanted` paints NOTHING — the surface already carries the very value the mutation would replace, so the write would be a no-op by construction', () => {
    const stub = stubRuntime()
    const application = startThemeApplication(stub.runtime)
    // THE SURFACE ALREADY CARRIES THE DECLARATION — the state a REBUILT graph re-establishes, and the one a change-guard's copy of
    // `lastApplied` could not see (`D-129`'s whole argument).
    stub.seed(application.nodeId, { content: 'dark', props: { 'data-theme': 'dark' } })
    adopt({ declaration: { name: 'data-theme', value: 'dark', removal: false } })
    const before = stub.commands.length
    const skipped: ThemeApplicationReading = application.apply()
    expect(
      [skipped.declared, skipped.written],
      'RS-2 — the paint is NOT owed (`declared: false`) and nothing landed: a positive settled match is the ONLY arm that may skip',
    ).toEqual([false, false])
    expect(stub.commands.length, 'RS-2 — ZERO writes: the match was established before the mutation was composed').toBe(before)
    expect(stub.surfaceOf(application.nodeId).props['data-theme'], 'RS-2 — and the surface is unmoved, as a no-op write would have left it').toBe('dark')

    // THE CONTROL THAT MAKES THE SKIP A MATCH AND NOT AN UNREACHED ARM: the same declaration over a surface that does NOT hold it
    // paints, so the absence above is the comparison's answer.
    stub.seed(application.nodeId, { content: 'dark', props: {} })
    const owed: ThemeApplicationReading = application.apply()
    expect(
      [owed.declared, owed.written],
      'RS-2 — the control: the same delivery over a surface lacking the member IS owed, and it lands',
    ).toEqual([true, true])
    expect(stub.commands.length, 'RS-2 — so the control wrote exactly once, and the difference between the two turns is the MATCH').toBe(before + 1)
    expect(stub.surfaceOf(application.nodeId).props['data-theme'], 'RS-2 — and the member now stands on the surface').toBe('dark')
  })

  it('RS-3 — **A REMOVAL ALWAYS PAINTS, EVEN WHERE `held` ALREADY READS `undefined`**: the surface\'s absence of the member is indistinguishable from a not-yet-applied removal, so the removal arm is decided BEFORE any read and the write is always issued — this is the row that would have caught `OV-12`/`OV-14`', () => {
    const stub = stubRuntime()
    const application = startThemeApplication(stub.runtime)
    // THE EXACT FACT `held === wanted` WOULD READ AS *ALREADY DONE*: a readable surface whose member is ABSENT, which is what a
    // rebuilt node, a store-projected state AND a removal the render has not yet applied all look like (`D-163`, design §6).
    stub.seed(application.nodeId, { content: 'dark', props: {} })
    adopt({ declaration: { name: 'data-theme', value: '', removal: true } })
    const before = stub.commands.length
    const removal: ThemeApplicationReading = application.apply()
    expect(
      [removal.declared, removal.written],
      'RS-3 — the removal is OWED and it LANDS: `declared` is true even though the surface did not carry the member, because absence establishes nothing',
    ).toEqual([true, true])
    expect(stub.commands.length, 'RS-3 — ONE `state-slice` per removal delivery, and the read did not cancel it').toBe(before + 1)
    const mutation = stub.commands[before]?.mutation?.[0]
    expect(mutation === undefined ? 'no mutation' : mutation.targetProp, 'RS-3 — the mutation names the declared member').toBe('props.data-theme')
    expect(
      mutation !== undefined && 'value' in mutation && mutation.value === undefined,
      'RS-3 — and its value is the removal EXPRESSION (`undefined`), CARRIED rather than dropped: the key the engine reads as the attribute\'s removal is present on the command',
    ).toBe(true)

    // IDEMPOTENT AND NEVER SKIPPED: a SECOND removal delivery over the surface the first one left (which still lacks the member)
    // paints again. This is the redundant write the brief names as the price — it cannot loop, because a renderer graph write
    // raises no view push (`D-163`).
    const again: ThemeApplicationReading = application.apply()
    expect([again.declared, again.written], 'RS-3 — the second removal delivery is owed too: the rule prices redundancy and never skips an owed removal').toEqual([true, true])
    expect(stub.commands.length, 'RS-3 — so two removal deliveries cost two writes, and no delivery is ever skipped on absence').toBe(before + 2)

    // THE CONTROL: the SAME absent surface under a POSITIVE declaration is owed too — so `declared: true` above is not this file
    // claiming every turn paints; `RS-2` shows the arm where it does not.
    adopt({ declaration: { name: 'data-theme', value: 'dark', removal: false } })
    const positive: ThemeApplicationReading = application.apply()
    expect([positive.declared, positive.written], 'RS-3 — the control: a positive declaration over the same absent member paints as well').toEqual([true, true])

    // AND THE SECOND SITE, WHICH IS THE ONE `OV-14` MEASURED: the overlay's close arm over an app root whose `props` ALREADY LACK
    // `inert` — the exact shape that read `written: false` (and left `inert="true"` on the tag) under the removed skip.
    const overlayStub = stubRuntime()
    overlayStub.seed(APP_ROOT_ID, { props: {} })
    const overlay = startOverlayApplication(overlayStub.runtime, { pane: crossingOf(false) })
    const closed: OverlayApplicationReading = overlay.render()
    expect(
      closed.written,
      'RS-3 — the overlay\'s close arm PAINTS TOO over a root that already lacks the member: the removal is decided before any read at both sites, so a pane the record closed can never keep its attribute',
    ).toBe(true)
    expect(
      overlayStub.commands.some((command) => (command.mutation ?? []).some((mutation) => mutation.targetProp === 'props.inert' && mutation.value === undefined)),
      'RS-3 — and the command it landed is the declared REMOVAL expression on `props.inert` (`undefined`), not an empty string that merely happens to be falsy',
    ).toBe(true)
    // RED ON REVERT (MEASURED THREE TIMES, not asserted): with the predicate reverted to `!held.readable || held.held !== wanted` —
    // `D-163`'s pre-correction form, the read taken on every arm — this row reddens AT EACH SITE INDEPENDENTLY: the theme site's
    // revert reads `[false, false]` here, and the overlay site's revert alone reads `false` on the close arm below, which is exactly
    // `OV-12`'s `written: false` and `OV-14`'s surviving `inert="true"` in a node row. `RS-5` reddens beside it in both runs (its
    // removal arm reads one `nodeState` read where it must read zero), so the pair names the defect twice from two directions;
    // `RS-1`/`RS-2`/`RS-4` stayed green, which is right — a PRESENCE comparison is the one shape the old form got right (`F3`'s
    // `S3`) and fail-open never read a surface at all. Measured by reverting IN PLACE over a backup of `src/renderer/renderer.ts`
    // and restoring it byte for byte (checksum-verified: `a8c61b47…`).
  })

  it('RS-4 — **AN UNREADABLE SURFACE FAILS OPEN**: a throwing `nodeState` PAINTS, and its refusal returns as the reading\'s `status` rather than as silence — nothing throws out of either turn', () => {
    // (a) THE THEME'S DELIVERY OVER A SURFACE IT CANNOT READ.
    const stub = stubRuntime({ readThrows: true })
    const application = startThemeApplication(stub.runtime)
    adopt({ declaration: { name: 'data-theme', value: 'dark', removal: false } })
    let reading: ThemeApplicationReading | null = null
    expect(() => {
      reading = application.apply()
    }, 'RS-4 — nothing escapes the delivery: an unreadable surface is a reading and never a throw').not.toThrow()
    expect((reading as ThemeApplicationReading | null)?.written, 'RS-4 — FAIL OPEN: with no match establishable at all, the paint is issued rather than suppressed').toBe(true)
    expect(stub.commands.length, 'RS-4 — one write, exactly as the readable positive arm would make').toBe(1)
    expect(stub.reads.length, 'RS-4 — and the read WAS attempted: the fail-open arm is a refused read and not an uncalled relation').toBeGreaterThan(0)

    // …AND THE REFUSAL IS REPORTED: a write the engine refuses answers a `status`, and `written` says the declaration did not land —
    // the visible-refusal half the deleted sink closure also carried (`D-117`).
    const refusing = stubRuntime({ readThrows: true, writeStatus: 'refused' })
    const refusedApp = startThemeApplication(refusing.runtime)
    adopt({ declaration: { name: 'data-theme', value: 'dark', removal: false } })
    const refused: ThemeApplicationReading = refusedApp.apply()
    expect([refused.status, refused.written], 'RS-4 — an unreadable surface whose write is refused answers `refused` and reports the declaration did NOT land').toEqual(['refused', false])

    // (b) THE OVERLAY'S DELIVERY OVER THE SAME KIND OF SURFACE — "either turn" is both of them, and the root is unreadable too.
    const overlayStub = stubRuntime({ readThrows: true })
    const overlay = startOverlayApplication(overlayStub.runtime, { pane: crossingOf(true) })
    let rendered: OverlayApplicationReading | null = null
    expect(() => {
      rendered = overlay.render()
    }, 'RS-4 — and nothing escapes the renderer\'s turn either').not.toThrow()
    expect((rendered as OverlayApplicationReading | null)?.written, 'RS-4 — the inert declaration is painted over an unreadable app root: fail open, at the site `OV-14` measured the failure of').toBe(true)
  })

  it('RS-5 — **A REMOVAL DELIVERY TAKES NO `nodeState` READ** (the operand order decides it first) **WHILE A POSITIVE-WANTED SITE TAKES EXACTLY ONE PER DELIVERY**: the removal arm is decided before any read, so the read is never taken where `wanted === undefined`', () => {
    // (a) THE THEME SITE: one read per POSITIVE delivery, and none for a removal.
    const stub = stubRuntime()
    const application = startThemeApplication(stub.runtime)
    stub.seed(application.nodeId, { content: 'dark', props: { 'data-theme': 'light' } })
    adopt({ declaration: { name: 'data-theme', value: 'dark', removal: false } })
    const base = stub.reads.length
    application.apply()
    expect(stub.reads.length - base, 'RS-5 — a positive `wanted` costs EXACTLY ONE `nodeState` read: the check asks the node its write would land on').toBe(1)
    application.apply()
    expect(
      stub.reads.length - base,
      'RS-5 — and one per delivery, not one per site: the second delivery paid its own read (the surface moved, so the paint was owed again)',
    ).toBe(2)

    adopt({ declaration: { name: 'data-theme', value: '', removal: true } })
    const beforeRemoval = stub.reads.length
    const removal: ThemeApplicationReading = application.apply()
    expect(removal.written, 'RS-5 — the removal still PAINTS (the control that makes the zero below a measured cost and not a skipped turn)').toBe(true)
    expect(
      stub.reads.length - beforeRemoval,
      'RS-5 — and it takes ZERO reads: the removal arm is the predicate\'s FIRST operand, so the read is never reached — the operand ORDER is what the row measures',
    ).toBe(0)

    // (b) THE OVERLAY SITE, THE SECOND OF THE TWO DECLARATIONS: its close arm reads nothing either, and its open arm reads once.
    const closeStub = stubRuntime()
    const closing = startOverlayApplication(closeStub.runtime, { pane: crossingOf(false) })
    const afterBoot = closeStub.reads.length
    const closed: OverlayApplicationReading = closing.render()
    expect(closed.written, 'RS-5 — the overlay\'s close arm paints the removal declaration').toBe(true)
    expect(
      closeStub.reads.length - afterBoot,
      'RS-5 — and it reads the app root ZERO times: `inert` removal is decided before the check, at the second site the same predicate is written',
    ).toBe(0)

    const openStub = stubRuntime()
    openStub.seed(APP_ROOT_ID, { props: {} })
    const opening = startOverlayApplication(openStub.runtime, { pane: crossingOf(true) })
    const afterOpenBoot = openStub.reads.length
    const opened: OverlayApplicationReading = opening.render()
    expect(opened.written, 'RS-5 — the control: the overlay\'s OPEN arm paints the set declaration').toBe(true)
    expect(
      openStub.reads.length - afterOpenBoot,
      'RS-5 — and it costs exactly one read of the app root — the positive arm, at the same site',
    ).toBe(1)
    expect(openStub.reads[openStub.reads.length - 1], 'RS-5 — the read names the AUTHORED app root and no other node').toBe(APP_ROOT_ID)
  })

  it('RS-6 — **THE WRITE\'S OWN ANSWER ENDS THE TRANSIENT, AND ONLY THE RIGHT ANSWER DOES**: a `refused` close clears `closing` and leaves the STORE\'s word (the refusal moves no `derived`, and the pane stays up), a SUPERSEDED answer settles nothing, a LOST answer (a rejection, or a thenable carrying no usable `status`) clears by the same path, a NON-THENABLE settles nothing so the DELIVERY stays the only clearer — the clause that keeps `OV-1(4)`/`OV-7`/`OV-14(c)` green — and the two registers are `console.error` for a refusal and `console.warn` for a loss, each carrying its own reason (`D-166`\'s `F6`, design §4/§8)', async () => {
    const reports = captureConsole()
    try {
      // ══ (1) A REFUSED CLOSE — THE STATE NOTHING IN THIS TREE MEASURED BEFORE THIS ROW (`D-166`). The crossing's `write`
      //    hands back a pending promise, so the ACT sets the transient and the ANSWER — not a delivery — is what must end it.
      const stub = stubRuntime()
      const refusal = deferred()
      const answering = answeringCrossing(true, () => refusal.promise)
      const overlay = startOverlayApplication(stub.runtime, { pane: answering.crossing })
      // THE STORE'S WORD FIRST, THROUGH THE DELIVERY: `derived` stands at `open` and the pane is UP on the app root before any
      // act — the state a refusal must LEAVE STANDING, which is what makes `open` below the store's word and not a default.
      overlay.render()
      expect(overlay.state(), 'RS-6 — the boot word is the STORE\'s: the crossing says the pane is up (`D-125`)').toBe('open')
      expect(
        stub.surfaceOf(APP_ROOT_ID).props['inert'],
        'RS-6 — and the delivery declared it, so the pane is UP on the app root — the state a refused close must not undo',
      ).toBe('true')

      const closing: OverlayApplicationReading = overlay.apply('close')
      expect(
        { asked: closing.asked, wrote: closing.wrote, state: closing.state },
        'RS-6 — the act ASKS for a close (`asked: false`) and sets the transient SYNCHRONOUSLY, before any answer exists — the window this row is about',
      ).toEqual({ asked: false, wrote: true, state: 'closing' })
      expect(answering.asks, 'RS-6 — ONE write reached the crossing, carrying the boolean the act asked for').toEqual([false])

      const beforeRefusal = stub.commands.length
      const errorsBeforeRefusal = reports.errors.length
      refusal.settle({ status: 'refused', reason: 'locked-by-repair', message: 'the operator pane is held by a repair' })
      await flushAnswers()
      expect(
        overlay.state(),
        'RS-6 — **A REFUSED CLOSE CLEARS THE TRANSIENT**: the pane is not left `closing` over a store that refused it, and the word it falls back to is the STORE\'S — `open` — because `derived` has one assignment and that assignment reads `storedOpen()` (`D-166`)',
      ).toBe('open')
      expect(
        stub.commands.slice(beforeRefusal),
        'RS-6 — and the settle ran `renderTurn(true)`, the SAME clearing site the delivery runs and the ONLY one: the carrier mirror is written on `clear` alone and it carries the STORE\'s word, so there is no second clearing site and no fifth state word',
      ).toEqual([
        { kind: 'state-slice', node: OVERLAY_STATE_ID, mutation: [{ targetProp: 'content', mode: 'replace', value: 'open' }] },
      ])
      expect(
        stub.surfaceOf(APP_ROOT_ID).props['inert'],
        'RS-6 — **THE REFUSAL MOVES NO `derived` AND LEAVES THE PANE UP**: the clearing turn finds a positive settled match (`inert` already `true`) and skips, so a refusal paints no removal and the surface still says what the store says',
      ).toBe('true')
      const after: OverlayApplicationReading = overlay.render()
      expect(
        [after.changed, after.written],
        'RS-6 — and the next delivery reports NO change and paints NOTHING: the word and the surface already stand where the store has them, where a refusal-derived word — `closed`, or a failure state of the wiring\'s own — would report a change here',
      ).toEqual([false, false])
      expect(
        reports.errors.length - errorsBeforeRefusal,
        'RS-6 — **THE REFUSAL REGISTER**: a refused close reports ONCE, through `console.error` (`D-117`\'s register — the console is this fact\'s only observability, since an MCP client cannot see a realm)',
      ).toBe(1)
      expect(reports.warns.length, 'RS-6 — and NOT through `console.warn`: a refusal is not a lost ask, and the two registers are told apart').toBe(0)
      const refusalMessage = reports.errors[errorsBeforeRefusal] ?? ''
      expect(refusalMessage, 'RS-6 — the answer\'s own `reason` reaches the message').toContain('locked-by-repair')
      expect(
        refusalMessage,
        'RS-6 — and so does its `message`: an operator can tell WHICH refusal this was, which is the whole point of reporting it',
      ).toContain('the operator pane is held by a repair')

      // ══ (2) A SUPERSEDED ANSWER SETTLES NOTHING — TWO ACTS, AND THE FIRST ONE'S ANSWER ARRIVES **LAST**.
      const supersededStub = stubRuntime()
      const first = deferred()
      const second = deferred()
      let asked = 0
      const queued = answeringCrossing(true, () => {
        asked += 1
        return asked === 1 ? first.promise : second.promise
      })
      const racing = startOverlayApplication(supersededStub.runtime, { pane: queued.crossing })
      racing.render()
      racing.apply('close')
      expect(racing.state(), 'RS-6 — the FIRST act opens a window of its own').toBe('closing')
      racing.apply('close')
      expect(
        [queued.asks, racing.state()],
        'RS-6 — and a SECOND act is a REAL act (the store still says `open`, so this close has its own external cause) that re-sets the transient and owns the newer ordinal',
      ).toEqual([[false, false], 'closing'])
      const errorsBeforeStale = reports.errors.length
      first.settle({ status: 'refused', reason: 'locked-by-repair', message: 'the operator pane is held by a repair' })
      await flushAnswers()
      expect(
        racing.state(),
        'RS-6 — **A SUPERSEDED ANSWER SETTLES NOTHING**: an answer for an EARLIER act must not clear the transient a LATER act set — the ask\'s ordinal is the settle\'s only guard (`G1`\'s supersession idiom)',
      ).toBe('closing')
      expect(reports.errors.length - errorsBeforeStale, 'RS-6 — and it reports nothing either: a stale answer is not this window\'s news').toBe(0)
      second.settle({ status: 'refused', reason: 'locked-by-repair', message: 'the operator pane is held by a repair' })
      await flushAnswers()
      expect(
        racing.state(),
        'RS-6 — while the CURRENT answer DOES clear it, so the guard above is an ordinal and not a settlement refused altogether',
      ).toBe('open')
      expect(reports.errors.length - errorsBeforeStale, 'RS-6 — exactly ONE report for the two answers: the superseded one was silent').toBe(1)

      // ══ (3) A LOST ANSWER — CLEARED BY THE SAME PATH, IN THE OTHER REGISTER. First a REJECTION: the ask never reached the
      //    store, so no delivery is owed either and the transient cannot stand waiting for one.
      const lostStub = stubRuntime()
      const rejected = deferred()
      const lost = answeringCrossing(true, () => rejected.promise)
      const losing = startOverlayApplication(lostStub.runtime, { pane: lost.crossing })
      losing.render()
      losing.apply('close')
      expect(losing.state(), 'RS-6 — the window is open before the ask is lost').toBe('closing')
      const errorsBeforeLoss = reports.errors.length
      const warnsBeforeLoss = reports.warns.length
      rejected.fail(new Error('the bridge is gone'))
      await flushAnswers()
      expect(
        losing.state(),
        'RS-6 — **A LOST ANSWER CLEARS BY THE SAME PATH**: a rejection is a lost ask, so the pane the store still holds comes back rather than staying `closing` forever',
      ).toBe('open')
      expect(
        [reports.warns.length - warnsBeforeLoss, reports.errors.length - errorsBeforeLoss],
        'RS-6 — **THE LOST REGISTER**: ONE `console.warn` and NO `console.error` — a fault is not a state (`D-127`)',
      ).toEqual([1, 0])
      expect(reports.warns[warnsBeforeLoss] ?? '', 'RS-6 — and the rejection\'s own words reach it, so a lost ask is diagnosable').toContain('the bridge is gone')

      // …THEN A THENABLE THAT CARRIES NO USABLE `status`: a RESOLVED promise is not a `committed` answer, and a `status` the
      // settle does not know is not one either — both are LOST, and both clear by the same turn.
      const shapelessCases: { readonly name: string; readonly answer: unknown }[] = [
        { name: 'a `status` the settle does not know', answer: { status: 'pending' } },
        { name: 'no `status` at all', answer: undefined },
      ]
      for (const shape of shapelessCases) {
        const shapelessStub = stubRuntime()
        const shapeless = answeringCrossing(true, () => Promise.resolve(shape.answer))
        const app = startOverlayApplication(shapelessStub.runtime, { pane: shapeless.crossing })
        app.render()
        app.apply('close')
        expect(app.state(), `RS-6 — the window is open before the shapeless answer (${shape.name})`).toBe('closing')
        const warnsBefore = reports.warns.length
        const errorsBefore = reports.errors.length
        await flushAnswers()
        expect(
          app.state(),
          `RS-6 — **A THENABLE CARRYING NO USABLE \`status\` IS LOST AND CLEARS** (${shape.name}): a resolved promise is not a committed one, so it may not leave the transient standing either`,
        ).toBe('open')
        expect(
          [reports.warns.length - warnsBefore, reports.errors.length - errorsBefore],
          `RS-6 — reported in the LOST register and not the refusal one (${shape.name})`,
        ).toEqual([1, 0])
      }

      // ══ (4) A NON-THENABLE SETTLES NOTHING — THE CLAUSE THAT KEEPS `OV-1(4)`, `OV-7` AND `OV-14(c)` GREEN. Their crossings
      //    answer NOTHING, so if a settle read any answer at all those three rows would have been measuring nothing.
      const silentCases: { readonly name: string; readonly answer: () => unknown }[] = [
        { name: 'the declared `void` arm (`undefined`)', answer: () => undefined },
        { name: '`null`', answer: () => null },
        { name: 'a bare answer object carrying no `then`', answer: () => ({ status: 'refused', reason: 'locked-by-repair', message: 'not a promise' }) },
      ]
      for (const silent of silentCases) {
        const quietStub = stubRuntime()
        const quiet = answeringCrossing(true, silent.answer)
        const app = startOverlayApplication(quietStub.runtime, { pane: quiet.crossing })
        app.render()
        const errorsBefore = reports.errors.length
        const warnsBefore = reports.warns.length
        app.apply('close')
        expect(app.state(), `RS-6 — (${silent.name}) the transient stands while the ask is in flight`).toBe('closing')
        await flushAnswers()
        expect(
          app.state(),
          `RS-6 — **A NON-THENABLE SETTLES NOTHING** (${silent.name}): a crossing that answers nothing leaves the DELIVERY as the ONLY clearer — a settle that read any answer, or that treated a bare \`{status:'refused'}\` object as one, would clear HERE, and the three gating rows resting on this arm would have been measuring nothing`,
        ).toBe('closing')
        expect(
          [reports.errors.length - errorsBefore, reports.warns.length - warnsBefore],
          `RS-6 — and nothing is reported: there is no answer to report (${silent.name})`,
        ).toEqual([0, 0])
        const cleared: OverlayApplicationReading = app.render()
        expect(
          cleared.state,
          `RS-6 — the DELIVERY clears it, and only the delivery (${silent.name}): this is the arm \`OV-1(4)\`, \`OV-7\` and \`OV-14(c)\` drive`,
        ).toBe('open')
      }

      // ══ (4b) AND A `committed` ANSWER SETTLES NOTHING EITHER — the arm design §8 names as the one that reds the moment a
      //    fix settles on ANY answer at all: the store has processed the write, so the pane's DELIVERY is still owed, and
      //    clearing here would claim a pane is up over a store whose own delivery has not refilled the shape yet.
      const committedStub = stubRuntime()
      const committed = answeringCrossing(true, () => Promise.resolve({ status: 'committed' }))
      const settled = startOverlayApplication(committedStub.runtime, { pane: committed.crossing })
      settled.render()
      settled.apply('close')
      expect(settled.state(), 'RS-6 — the transient is set by the act, as on every other arm').toBe('closing')
      const errorsBeforeCommitted = reports.errors.length
      const warnsBeforeCommitted = reports.warns.length
      const commandsBeforeCommitted = committedStub.commands.length
      await flushAnswers()
      expect(
        settled.state(),
        'RS-6 — **A `committed` ANSWER SETTLES NOTHING**: the store processed the write, so the pane\'s DELIVERY is still owed and `closing` stands until it arrives — a settle that ended the window on ANY answer reads `open` here',
      ).toBe('closing')
      expect(
        [reports.errors.length - errorsBeforeCommitted, reports.warns.length - warnsBeforeCommitted, committedStub.commands.length - commandsBeforeCommitted],
        'RS-6 — and it neither reports nor clears: a `committed` answer is not news, and it is not a clearing turn',
      ).toEqual([0, 0, 0])
      const deliveredCommitted: OverlayApplicationReading = settled.render()
      expect(deliveredCommitted.state, 'RS-6 — the DELIVERY is what ends this window, and the only thing that does').toBe('open')

      // ══ (5) THE TWO REGISTERS, COUNTED ONCE FOR THE WHOLE ROW: every arm above wrote into ONE channel and none into the
      //    other, so the registers are not merely two names for the same report.
      expect(
        [reports.errors.length, reports.warns.length],
        'RS-6 — **TWO REFUSALS THROUGH `console.error`** (the refused close and the racing pair\'s current answer) **and THREE LOSSES THROUGH `console.warn`** (the rejection and the two shapeless answers)',
      ).toEqual([2, 3])
    } finally {
      reports.restore()
    }
    expect(
      [vi.isMockFunction(console.error), vi.isMockFunction(console.warn)],
      'RS-6 — **THE GLOBALS ARE NOT LEFT PATCHED**: both members are the REAL functions again, so the next file\'s reports land where they always did — the restore is measured here rather than trusted to the `finally`',
    ).toEqual([false, false])
  })
})
