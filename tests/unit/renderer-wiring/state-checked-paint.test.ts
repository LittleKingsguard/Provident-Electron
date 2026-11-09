// tests/unit/renderer-wiring/state-checked-paint.test.ts — **THE STATE CHECK, DRIVEN** (`D-163`; `docs/L3/renderer-wiring/design.md`
// §4, §6 and §8's owed `RS-1`…`RS-5`).
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
//
// WHAT THIS GREEN IS WORTH (`AGENTS.md`, D-27): the node suite runs under a layout-less DOM shim, so this is ENVELOPE-green — three
// wiring turns' decisions over a stub surface, never a rendered one. The rendered-surface instruments are `npm run ui`'s overlay
// row and `npm run divergence`.

import { describe, expect, it } from 'vitest'

import {
  getViewClient,
  startGutterAffordance,
  startOverlayApplication,
  startThemeApplication,
  type OverlayApplicationReading,
  type ThemeApplicationReading,
} from '../../../src/renderer/renderer.js'
import type { Runtime } from '../../../src/renderer/runtime.js'
import type { ViewCommittedReading } from '../../../src/renderer/view-client.js'
import {
  DEFAULT_PANE_ID,
  viewThemePlaceholder,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewThemeDeclaration,
} from '../../../src/shared/view-shape.js'
import { APP_ROOT_ID, GUTTER_STATUS_ID } from '../../../src/shared/demo-envelope.js'

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
 *  the `source` word names. */
const panesAt = (size: number): readonly ViewPaneGeometry[] => [
  { id: DEFAULT_PANE_ID, size, bounds: { min: 0, max: 200 } },
]

/** A crossing that answers the store's own word and records the acts — the overlay's two members, no third. */
function crossingOf(word: boolean): { open(): boolean; write(): void } {
  return { open: () => word, write: (): void => undefined }
}

describe('D-163 · `docs/L3/renderer-wiring/design.md` §4/§6 — the state-checked paint, `RS-1`…`RS-5`', () => {
  it('RS-1 — **THE PAINT IS OWED IFF THE FAMILY ARM READS `\'record\'`**: a `[\'panes\']` delivery carrying `140` over a `\'record\'` family paints `content` `140` on `GUTTER_STATUS_ID`, a SECOND delivery of the same size writes NOTHING (the state check), and a `\'default\'` panes arm paints NOTHING even though its figure is the same `140` — the gate is the FAMILY and never `filled` (`D-127`)', () => {
    const stub = stubRuntime()
    // THE ENVELOPE'S AUTHORED FIGURE — what the read-out carries before any delivery paints it.
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
      'RS-1 — one `state-slice` for the delivery: the surface carried the authored `100` and the record says `140`',
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
      'RS-1 — NOTHING is painted on the `\'default\'` arm: the envelope\'s authored `content` stands, because a panes family the record did not answer carries no figure this realm may call a state (`D-127`)',
    ).toBe(before + 1)
    expect(stub.surfaceOf(GUTTER_STATUS_ID).content, 'RS-1 — and the authored surface is untouched, which is the reading the arm leaves').toBe('999')
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
})
