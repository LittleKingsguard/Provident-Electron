// tests/unit/renderer-wiring/zone-collapse.test.ts — **A ZONE'S COLLAPSE, AND THE ONE STATE NOBODY STORES**
// (`docs/L3/renderer-wiring/design-zone-collapse.md` rev 1; `D-234`, `D-243`, `D-262`, `D-269`, `D-270`; §9's SIX DECLARED
// unit rows `ZC-1`…`ZC-6`).
//
// THE SUBJECT. A zone's collapse is an OPTIONAL record member (`['zones', <id>, 'collapsed']`) whose ABSENCE is answered by
// a DERIVATION in the paint — collapsed exactly when the zone holds no pane — and the collapse is never a stored extent:
// the collapsed box is `auto` on the axis the zone fixes and `hidden` on the axis it scrolls, and the only figure in it is
// the pane head row's own thickness, which no byte of `src/` states. THIS FILE PINS THAT, row for row, in the order §9
// declares it. The design's own names (`zoneCollapsedOf`, `installZoneCollapse`) DO NOT EXIST AT THIS HEAD — L4 lands them —
// so the rows are expected RED here, and each red names the design sentence it is about.
//
// THE HARNESS, TWO KINDS, BECAUSE THIS REV ADDS ONE EXPORTED PREDICATE AND ONE EXPORTED TURN AND NO THIRD DOOR.
//
//   (1) **DRIVEN**, for `ZC-1`, `ZC-4` and `ZC-5`. `ZC-1` is a pure predicate over two families and needs no realm at all.
//       `ZC-4` drives the design's own turn — `installZoneCollapse(runtime)` — over a stub runtime that answers
//       `nodeState(id)` with the record id the authored control names on `props.zone` (the design's `C2`: the operand is read
//       OFF THE NODE, never a table in the wiring), `elementForNodeId(id)` with an element double carrying
//       `addEventListener`, and records every `applyCommand`. The press is the HUMAN cause: a `click` fired at the double the
//       turn attached to (`C4`; one act, two causes, `AL-3`). `ZC-5` drives the EXISTING `installPaneCollapse(runtime)` — the
//       same three authored pane controls, the same one click — because that is the turn §8's branch (b) changes. A stub
//       `window.provident.data` member records every `data.write` PAYLOAD, which is what these rows assert: the address, the
//       tier and the value, never a pixel. The records the acts read come from `getViewClient().adopt(…)` — the delivery's own
//       refill, so no bridge, no route and no poll is stubbed.
//
//   (2) **READ FROM THE SOURCE**, for `ZC-2`, `ZC-3` and `ZC-6`, and the reason is stated rather than hidden: those three rows
//       measure `driveLayoutRegions`' TWO ARMS and `paneMoveAct`'s chained pair, and the design keeps all of them PRIVATE
//       (`§2`: *"`panePaintOf`, `driveLayoutRegions` and `drivePaneHeads` stay PRIVATE"*). No exported turn reaches them at
//       this head — `startViewShape` is private and called only from `main()` (`renderer.ts:2027`), `startPaneMove` likewise
//       (`:1867`) — so a unit row cannot call them, and a row that pretended to would be measuring a copy. THE TREE'S OWN
//       IDIOM FOR A PRIVATE RELATION IS THE SOURCE PROBE (`pane-node-map.test.ts`'s `PM-1`: *"the source TEXT is the only
//       reading there is"*; `tests/renderer-delivery-compliance.test.ts`'s `DC-8(b)`, whose `functionRegion` this file
//       re-uses). **AND THE SOURCE IS READ WITH ITS COMMENTS ELIDED** — this file's own row would otherwise be satisfied by
//       the design's prose pasted into a comment above the code, which is exactly what L4 is asked to do.
//
// WHAT THIS GREEN IS WORTH (`AGENTS.md`, `D-27`): the module rows run under a layout-less DOM shim, so there is no
// `getBoundingClientRect`, no `getComputedStyle` and no layout: this is ENVELOPE-green — the derivation's answers, the
// commands the acts send, and the composition the paint would write, never a rendered surface. The two rendered-surface
// instruments are `npm run ui` and `npm run divergence`, and §10 forbids claiming either.
//
// WHAT THESE ROWS DO **NOT** PROVE, STATED HERE BECAUSE IT IS THREE SITES AND NOT ONE (reported to L3, not patched here).
// The member `['zones', <id>, 'collapsed']` has to SURVIVE the two admissions between the store and this arithmetic before a
// green here means anything in the app: `ViewZone` (`src/shared/view-shape.ts:117`) declares no `collapsed`; `zoneIn`
// (`:443`) copies `slot`/`distance`/`size`/`display` and would drop it; and `zoneOfWire`
// (`src/renderer/view-client.ts:366`) DROPS EVERY MEMBER IT DOES NOT NAME at the renderer's own trust boundary, so a real
// delivery cannot hand `collapsed` to `shape().zones` at all. §9 owes three STORE-side rows and names none of these three
// sites. The rows below hand records to the predicate directly (and `adopt` copies a reading verbatim), so they measure the
// design's own arithmetic and are silent about that crossing — which is the honest reading of them.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked` marker and GATES (`D-40`): UNMARKED, no carve-out, and
// every row is meant to be able to fail. Nothing here is `skip`/`todo`/`on notice`.
//
//   · `ZC-1` — the DERIVATION's four arms (stated `true`, stated `false`, absent-and-empty, absent-and-occupied) plus its
//     two degradations: an id the record does not declare is NO ZONE (`false`, `D-91`'s closed four), and an empty family of
//     panes is the derived default's own arm, not an error.
//   · `ZC-2` — the ZONE ARM's composition: `auto`/`hidden` with NO `<member>: <size>px`, the zone node's `collapsed`
//     attribute in the SAME command, and the size arm's `continue` — a zone stating no finite non-negative `size` is written
//     NOTHING AT ALL, collapse included. Both axes are exercised off `LAYOUT_ZONE_AXES`' own pairing.
//   · `ZC-3` — the PANE ARM's EFFECTIVE collapse: a silent pane in a collapsed zone composes the collapsed box and
//     `collapsed: 'true'`; the same pane in an expanded zone composes the record's figure and passes the REMOVAL; a pane whose
//     OWN record states `collapsed: true` in an expanded zone stays collapsed, because the effective state ORs the two.
//   · `ZC-4` — the ZONE CONTROL's toggle writes the NEGATION OF THE DERIVED ANSWER: an empty zone stating nothing writes
//     `false` (the row that proves an expanded empty zone persists), the second press writes `true`, a record already saying
//     `true` writes `false` — one write per press, at `['zones', <zone>, 'collapsed']`, at `mem`.
//   · `ZC-5` — the PANE CONTROL's branch: inside a collapsed zone ONE write at the ZONE's leaf and NONE at the pane's; with the
//     zone expanded ONE write at the pane's leaf with the negated record value and NONE at the zone's.
//   · `ZC-6` — the CHAINED PAIR of a drop into a collapsed zone: the zone write FIRST, the pane write only on `committed`, a
//     refusal aborting (and reported, not thrown), and both answers read in `D-117`'s register.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import * as wiring from '../../../src/renderer/renderer.js'
import { getViewClient, installPaneCollapse } from '../../../src/renderer/renderer.js'
import type { Runtime } from '../../../src/renderer/runtime.js'
import type { ViewCommittedReading } from '../../../src/renderer/view-client.js'
import {
  DECLARED_ZONE_IDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  MENUS_PANE_ID,
  viewThemePlaceholder,
} from '../../../src/shared/view-shape.js'
import type { ViewGeometrySource, ViewPaneGeometry, ViewZone } from '../../../src/shared/view-shape.js'

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE DESIGN'S TWO NAMES, AND WHY THEY ARE READ THROUGH A CAST (`D-45`)
 *
 * `zoneCollapsedOf`, `installZoneCollapse` and `ZoneCollapseControls` are §2's additions to
 * `renderer.ts`'s surface and DO NOT EXIST AT THIS HEAD — L4 lands them. A static named import
 * of an export that is not there fails at LINK time, which would redden all six rows with one
 * collection error and say nothing about any of them; a namespace read behind a cast keeps the
 * file importing (so `ZC-2`/`ZC-3`/`ZC-6` still report their own reds), keeps `typecheck:tests`
 * clean against the current sources, and makes each row's first assertion the missing export
 * itself, NAMED. When L4 adds the two names the cast is satisfied structurally and the rows
 * measure what they were written to measure.
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** §2's `Z1`–`Z3`, whole: the record's member, then the DERIVED default off the OTHER family. */
type ZoneCollapsedOf = (
  records: readonly ViewZone[],
  panes: readonly ViewPaneGeometry[],
  zoneId: string,
) => boolean

/** §2's `C1`–`C4`'s returned readings — the census, and the two arms each control must have taken. */
interface ZoneCollapseControls {
  readonly controls: number
  readonly installed: number
  readonly attached: number
}

interface DesignSurface {
  readonly zoneCollapsedOf?: ZoneCollapsedOf
  readonly installZoneCollapse?: (runtime: Runtime) => ZoneCollapseControls
}

const DESIGN = wiring as unknown as DesignSurface

/** **THE PREDICATE, OR A RED THAT NAMES THE DESIGN SENTENCE** (§2, §9's `ZC-1`). Every row that reads the derivation calls
 *  this first, so a missing export is reported as what it is and not as a `TypeError` three lines later. */
function predicateAt(row: string): ZoneCollapsedOf {
  const held = DESIGN.zoneCollapsedOf
  expect(
    typeof held,
    `${row} — \`zoneCollapsedOf\` is one of the TWO names the design adds to this file's surface (\`design-zone-collapse.md\` §2, \`§9\`'s \`ZC-1\`…\`ZC-6\`): the derivation is the ONE fact the zone arm, the pane arm and the zone control each read, and a row that cannot ask it cannot measure a reader of it`,
  ).toBe('function')
  return held as ZoneCollapsedOf
}

/** **THE TURN, OR A RED THAT NAMES IT** (§2's `C1`–`C4`): four authored controls, each taking a body AND a listener. */
function installerAt(row: string): (runtime: Runtime) => ZoneCollapseControls {
  const held = DESIGN.installZoneCollapse
  expect(
    typeof held,
    `${row} — \`installZoneCollapse\` is the design's other new export (\`§2\`, \`design-zone-handles.md\`'s \`startGutterAffordance\` standing), and \`ZC-4\`'s ONLY route to the toggle: \`paneCollapseAct\` is private and no other turn writes a zone's \`collapsed\``,
  ).toBe('function')
  return held as (runtime: Runtime) => ZoneCollapseControls
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE FIXTURES — TWO FAMILIES, AND A RECORD THAT STATES ONLY WHAT A ROW HANDS IT
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** **ONE ZONE RECORD, WITH THE MEMBER THIS REV ADDS.** `ViewZone` declares `id`/`slot`/`distance`/`size`/`display` and no
 *  `collapsed` at this head, so the row states the member on an intersection and the object stays assignable everywhere the
 *  family is handed (`ViewZone` in, exactly as the design's signature declares). **THE INTERSECTION IS NOT A LICENCE**: a
 *  zone record that states `collapsed: undefined` would be one that spoke, and the fixtures below can only omit the member
 *  by not carrying the key at all — which is what `Z3`'s "states NOTHING" means. */
type ZoneRecord = ViewZone & { readonly collapsed?: boolean }

interface ZoneMembers {
  readonly size?: number
  readonly display?: string
  readonly collapsed?: boolean
}

function zoneRecord(id: string, members: ZoneMembers = {}): ZoneRecord {
  const record: { id: string; size?: number; display?: string; collapsed?: boolean } = { id }
  if (members.size !== undefined) record.size = members.size
  if (members.display !== undefined) record.display = members.display
  if (members.collapsed !== undefined) record.collapsed = members.collapsed
  return record
}

interface PaneMembers {
  readonly zone?: string
  readonly collapsed?: boolean
  readonly width?: number
  readonly height?: number
}

/** **ONE PANE RECORD** — both axis members, as `ViewPaneGeometry` requires them, and only the optional members the row names.
 *  The `zone` member is what `Z3` counts and what the pane arm's effective collapse ORs; the pane's own `collapsed` is the
 *  memory §8's branch (b) leaves untouched. */
function paneGeometry(id: string, members: PaneMembers = {}): ViewPaneGeometry {
  const record: { id: string; width: number; height: number; zone?: string; collapsed?: boolean } = {
    id,
    width: members.width ?? DEFAULT_PANE_SIZE,
    height: members.height ?? DEFAULT_PANE_SIZE,
  }
  if (members.zone !== undefined) record.zone = members.zone
  if (members.collapsed !== undefined) record.collapsed = members.collapsed
  return record
}

interface ShapeOptions {
  readonly zones?: readonly ViewZone[]
  readonly panes?: readonly ViewPaneGeometry[]
  readonly zonesSource?: ViewGeometrySource
  readonly panesSource?: ViewGeometrySource
}

/** **THE DELIVERY'S OWN REFILL** — `createViewClient`'s `adopt`, the member `fill()` and every delivery end in, driven
 *  directly (`state-checked-paint.test.ts`'s idiom): the acts under test read `getViewClient().shape()`, so the record a row
 *  states is the record every turn of that row sees, and no route, no push and no poll is invented for it. */
function adoptShape(options: ShapeOptions = {}): ViewCommittedReading {
  const reading: ViewCommittedReading = {
    status: 'committed',
    panes: options.panes ?? [],
    zones: options.zones ?? [],
    theme: viewThemePlaceholder(),
    source: {
      panes: options.panesSource ?? 'record',
      zones: options.zonesSource ?? 'record',
      theme: 'default',
    },
  }
  getViewClient().adopt(reading)
  return reading
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE STUB REALM THE TWO ACT ROWS PRESS — a graph that answers, and a `data` member that records
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** The three members a control's installation consults, plus the `fire` a press uses. `isConnected` is present for the same
 *  reason `preview-seat.test.ts` measures it: an element double without it is a DISCONNECTED node, and a turn that asks
 *  would refuse for a reason no row is about. */
interface ElementDouble {
  readonly handlers: Map<string, ((event: unknown) => void)[]>
  readonly style: { setProperty(property: string, text: string): void }
  readonly isConnected: true
  addEventListener(type: string, handler: (event: unknown) => void): void
  removeEventListener(type: string, handler: (event: unknown) => void): void
  getAttribute(name: string): string | null
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
  fire(type: string): void
}

function elementDouble(): ElementDouble {
  const handlers = new Map<string, ((event: unknown) => void)[]>()
  const attributes = new Map<string, string>()
  return {
    handlers,
    style: {
      setProperty(): void {
        // no act in these rows paints; the declaration is here so a turn that reaches for it finds a holder
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
    fire(type: string): void {
      for (const handler of [...(handlers.get(type) ?? [])]) handler({ type })
    },
  }
}

interface ActHarnessOptions {
  /** **WHAT EACH AUTHORED CONTROL NAMES AS ITS RECORD'S ZONE** (`props.zone`, the design's `C2`): the four zone controls carry
   *  one, and the zone ids are read off them and never out of a table in the wiring (§7). */
  readonly controlZones?: Readonly<Record<string, string>>
  /** **WHAT EACH PANE CONTROL NAMES AS ITS RECORD'S PANE** (`props.pane`, `installPaneCollapse`'s `X0`). */
  readonly controlPanes?: Readonly<Record<string, string>>
}

interface ActHarness {
  readonly runtime: Runtime
  /** Every `applyCommand` the TURNS make — the installs' `handlers` layers, and any paint a press must NOT make (`X4`). */
  readonly commands: unknown[]
  /** **EVERY `data.write` PAYLOAD, IN ORDER** — the address, the tier and the value, which is what these rows assert. */
  readonly writes: unknown[]
  /** Every node id the turns resolved through `elementForNodeId`, in order: the graph read, never a selector. */
  readonly resolved: string[]
  control(nodeId: string): ElementDouble
  /** The HUMAN cause: one `click` at the element the turn attached its body to (`C4`). */
  press(nodeId: string): void
}

/** **THE STUB REALM.** `nodeState` answers `states[0].props` for the two operands the acts read and nothing else — so a
 *  control the harness does not name is a control whose operand is UNREADABLE, the `X0` refusal, reported and never filled
 *  with a default. `applyCommand` records and answers `applied`. The ambient `data` member records the payloads and answers
 *  `committed`: §2's `X3`/§8's chain ask for an answer and read its `status`, so a member that answered nothing would put
 *  every row on the unread arm instead of the one it names. */
function actHarness(options: ActHarnessOptions = {}): ActHarness {
  const commands: unknown[] = []
  const writes: unknown[] = []
  const resolved: string[] = []
  const elements = new Map<string, ElementDouble>()
  const elementOf = (id: string): ElementDouble => {
    const held = elements.get(id)
    if (held !== undefined) return held
    const fresh = elementDouble()
    elements.set(id, fresh)
    return fresh
  }
  const controlZones = options.controlZones ?? {}
  const controlPanes = options.controlPanes ?? {}
  ;(globalThis as Record<string, unknown>)['window'] = {
    provident: {
      data: {
        read: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-record' }),
        write: async (payload: unknown): Promise<unknown> => {
          writes.push(payload)
          return { status: 'committed' }
        },
        delete: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-record' }),
        list: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-record' }),
        journal: async (): Promise<unknown> => ({ status: 'absent', reason: 'no-record' }),
      },
    },
  }
  const runtime = {
    elementForNodeId(id: string): unknown {
      resolved.push(id)
      return elementOf(id)
    },
    nodeState(id: string): unknown {
      const props: Record<string, unknown> = {}
      const zone = controlZones[id]
      if (zone !== undefined) props['zone'] = zone
      const pane = controlPanes[id]
      if (pane !== undefined) props['pane'] = pane
      return { nodeId: id, states: [{ props }] }
    },
    applyCommand(command: unknown): { readonly status: string } {
      commands.push(command)
      return { status: 'applied' }
    },
  }
  return {
    runtime: runtime as unknown as Runtime,
    commands,
    writes,
    resolved,
    control: elementOf,
    press: (nodeId: string): void => {
      elementOf(nodeId).fire('click')
    },
  }
}

/** The acts settle on a promise they do not await (`void … then(…)`), so a row that reads its route drains the microtask
 *  queue first. No timer, no fake clock: a microtask drain is exactly what those continuations are. */
async function settled(): Promise<void> {
  for (let turn = 0; turn < 6; turn += 1) await Promise.resolve()
}

/** The four authored controls `§7` states, each carrying its zone's RECORD id on `props.zone` — the operand read OFF THE NODE
 *  (`C2`: *"the RECORD id, read OFF THE NODE — never a table here"*). */
const ZONE_CONTROL_ZONES: Readonly<Record<string, string>> = {
  'top-collapse': 'top',
  'bottom-collapse': 'bottom',
  'left-collapse': 'left',
  'right-collapse': 'right',
}

/** The three authored PANE controls and the record ids they name (`PANE_COLLAPSE_IDS`, `installPaneCollapse`'s `X0`). */
const PANE_CONTROL_PANES: Readonly<Record<string, string>> = {
  'menus-collapse': MENUS_PANE_ID,
  'inspector-collapse': 'pane-inspector',
  'gutter-collapse': DEFAULT_PANE_ID,
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * THE SOURCE READING — THE THREE ROWS THE DESIGN LEAVES NO DOOR TO (see the header)
 * ══════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE REALM THIS FILE READS, BY SITE** (`D-41`: sites, never offsets). It is the same module the rows above import; what
 *  differs is that a PRIVATE turn's body is a thing only its bytes can state. */
const RENDERER = 'src/renderer/renderer.ts'

/** **COMMENT-ELIDED SOURCE** (`tests/renderer-delivery-compliance.test.ts`'s discipline, applied here because L4 is asked to
 *  paste this page's sentences above the code they describe): a line whose first non-space characters open a `//`, and every
 *  stretch inside a block comment, is dropped. A row satisfied by prose would measure nothing at all. */
function commentElided(source: string): string {
  const kept: string[] = []
  let inBlock = false
  for (const raw of source.split('\n')) {
    let line = raw
    if (inBlock) {
      const close = line.indexOf('*/')
      if (close < 0) continue
      line = line.slice(close + 2)
      inBlock = false
    }
    let out = ''
    let rest = line
    for (;;) {
      const block = rest.indexOf('/*')
      const slash = rest.indexOf('//')
      if (slash >= 0 && (block < 0 || slash < block)) {
        out += rest.slice(0, slash)
        break
      }
      if (block < 0) {
        out += rest
        break
      }
      out += rest.slice(0, block)
      const close = rest.indexOf('*/', block + 2)
      if (close < 0) {
        inBlock = true
        break
      }
      rest = rest.slice(close + 2)
    }
    if (out.trim().length > 0) kept.push(out)
  }
  return kept.join('\n')
}

const CODE = commentElided(readFileSync(fileURLToPath(new URL(`../../../${RENDERER}`, import.meta.url)), 'utf8'))

/** ONE top-level function's CODE, from its header to the next top-level `function` — `DC-8(b)`'s helper, re-used rather than
 *  re-invented. It answers `''` where the function is not there, which every row states as a red rather than passing on. */
function functionRegion(source: string, name: string): string {
  const at = source.search(new RegExp(`(?:^|\\n)(?:export )?(?:async )?function ${name}\\s*\\(`))
  if (at < 0) return ''
  const rest = source.slice(at + 1)
  const next = rest.search(/\n(?:export )?(?:async )?function /)
  return next < 0 ? rest : rest.slice(0, next)
}

/** The span from one token to another, both INSIDE the region handed in — the shape a row uses to speak about one arm. */
function regionBetween(source: string, from: string, to: string): string {
  const start = source.indexOf(from)
  if (start < 0) return ''
  const end = source.indexOf(to, start + from.length)
  return end < 0 ? source.slice(start) : source.slice(start, end)
}

/** **A NAMED PART OF A ROW** — the shape every probe below is written in, so a red is a SENTENCE and never a moved count
 *  (`D-168`): `what` says which design clause is missing, `held` is the reading. */
interface Fact {
  readonly what: string
  readonly held: boolean
}

function unproven(facts: readonly Fact[]): string[] {
  return facts.filter((fact) => !fact.held).map((fact) => fact.what)
}

/** `driveLayoutRegions`' ZONE ARM — from the loop over the axis table to the arrangement turn that follows it. */
function zoneArmOf(): string {
  const paint = functionRegion(CODE, 'driveLayoutRegions')
  return regionBetween(paint, 'for (const zone of LAYOUT_ZONE_AXES)', 'driveZoneArrangement(')
}

/** `driveLayoutRegions`' PANE ARM — from the loop over the panes family to the head arm that follows it. */
function paneArmOf(): string {
  const paint = functionRegion(CODE, 'driveLayoutRegions')
  return regionBetween(paint, 'for (const pane of reading.panes)', 'drivePaneHeads(')
}

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * HOUSEKEEPING
 * ══════════════════════════════════════════════════════════════════════════════════════════════ */

/** The rows install the ambient `data` member per row and withdraw it after, so no member a row stubbed becomes the next
 *  row's bridge (`preview-seat.test.ts`'s rule: a node realm has no `window` of its own). */
afterEach(() => {
  delete (globalThis as Record<string, unknown>)['window']
})

describe('ZC · `docs/L3/renderer-wiring/design-zone-collapse.md` rev 1 — a zone\'s collapse, its derived default, and the one extent nobody stores', () => {
  it('ZC-1 — **THE DERIVATION\'S FOUR ARMS AND ITS TWO DEGRADATIONS**: `collapsed: true` is collapsed whatever the family says, `collapsed: false` is EXPANDED even where the zone holds no pane (the record overturns the default), a zone stating NOTHING is collapsed exactly when no pane names it (`pane.zone === zoneId`), an id the record does not declare is NO ZONE and answers expanded, and an EMPTY panes family is the default\'s own arm rather than an error — while a PANE\'s own `collapsed` is not the zone\'s state and cannot move this answer', () => {
    const zoneCollapsedOf = predicateAt('ZC-1')
    // TWO FIXTURES, AND THE MEMBERS THEY STATE ARE THE WHOLE OF THE DIFFERENCE: `top`/`bottom` speak, `left`/`right` do not.
    const zones: readonly ViewZone[] = [
      zoneRecord('top', { size: 140, collapsed: true }),
      zoneRecord('bottom', { size: 60, collapsed: false }),
      zoneRecord('left', { size: 120 }),
      zoneRecord('right', { size: 90 }),
    ]
    /** ONE PANE, IN `right` AND NOWHERE ELSE: it is what makes "absent and occupied" a different fixture from "absent and
     *  empty" in the same family, so the two arms cannot both pass on one reading. */
    const occupiesRight: readonly ViewPaneGeometry[] = [paneGeometry(MENUS_PANE_ID, { zone: 'right' })]

    // ─── (1) THE RECORD STATING `true` — §1: "`collapsed === true` → collapsed", whatever else stands ─────────────────────
    expect(
      zoneCollapsedOf(zones, occupiesRight, 'top'),
      'ZC-1 — the record stating `collapsed: true` answers COLLAPSED: the member is the family\'s own leaf (§1), and a zone holding a pane is exactly the state a person has spoken about',
    ).toBe(true)

    // ─── (2) THE RECORD STATING `false` — "`=== false` → expanded", and THE RECORD BEATS THE DEFAULT ─────────────────────
    expect(
      zoneCollapsedOf(zones, occupiesRight, 'bottom'),
      'ZC-1 — the record stating `collapsed: false` answers EXPANDED **while `bottom` holds no pane at all**: this is the arm that proves the derivation is a DEFAULT and not a rule, and the one §1\'s "a person who expands an empty zone must keep it expanded" is made of',
    ).toBe(false)

    // ─── (3) THE RECORD STATING NOTHING AND NO PANE NAMING IT — THE DERIVED DEFAULT ───────────────────────────────────────
    expect(
      zoneCollapsedOf(zones, occupiesRight, 'left'),
      'ZC-1 — a zone stating NOTHING with no pane naming it answers COLLAPSED (`Z3`: `panes.every((pane) => pane.zone !== zoneId)`), and the presence of a pane in ANOTHER zone must not move it',
    ).toBe(true)

    // ─── (4) THE RECORD STATING NOTHING AND A PANE NAMING IT — EXPANDED ───────────────────────────────────────────────────
    expect(
      zoneCollapsedOf(zones, occupiesRight, 'right'),
      'ZC-1 — the same absent member with a pane naming the zone answers EXPANDED: emptiness lives in the OTHER family (`§1`: *"no repair reads `[\'panes\']`"*), which is why this answer is a derivation in the paint and not a stored default',
    )
      .toBe(false)

    // AND THE PANE'S OWN STATE IS NOT THE ZONE'S: a collapsed PANE in an expanded ZONE leaves the ZONE expanded (§3's two
    // authorities over two boxes, `D-129`) — the row that keeps `Z3` from reading the wrong member.
    expect(
      zoneCollapsedOf(zones, [paneGeometry(MENUS_PANE_ID, { zone: 'right', collapsed: true })], 'right'),
      'ZC-1 — a COLLAPSED PANE inside a zone does not collapse the ZONE: `Z3` counts panes that NAME the zone and reads no member of theirs',
    ).toBe(false)

    // ─── (5) THE TWO DEGRADATIONS: AN UNDECLARED ID AND AN EMPTY FAMILY ───────────────────────────────────────────────────
    const undeclared = 'centre'
    expect(
      [...DECLARED_ZONE_IDS],
      'ZC-1 — the id this row uses for the undeclared arm is genuinely OUTSIDE the closed four: a degradation fixture that drifted onto a declared id would measure the ordinary arm and call it the degradation',
    ).not.toContain(undeclared)
    expect(
      zoneCollapsedOf(zones, [], undeclared),
      'ZC-1 — **an id the record does not declare is NO ZONE (`Z1`) and answers EXPANDED** (`D-91`): the closed four are the only ids this family answers for, and a zone the record does not declare is not a zone to collapse',
    ).toBe(false)
    expect(
      zoneCollapsedOf([], [], 'top'),
      'ZC-1 — an EMPTY records family is the same arm: no record declares `top`, so `top` is no zone and nothing is collapsed',
    ).toBe(false)
    expect(
      zoneCollapsedOf([zoneRecord('top')], [], 'top'),
      'ZC-1 — an EMPTY `panes` family is the DERIVATION\'s own arm and not an error: `panes.every(…)` over nothing is `true`, so a zone nobody has spoken about presents COLLAPSED — the reading `AZ-1` carries into the record\'s bytes',
    ).toBe(true)
    expect(
      zoneCollapsedOf([zoneRecord('top', { collapsed: true })], [], 'top'),
      'ZC-1 — and an empty family does not overrule a record that answered: `true` is still `true` with no pane in sight',
    ).toBe(true)

    // ─── (6) AND IT IS TOTAL OVER THE CLOSED FOUR: every declared zone, stated nothing, held by nothing ───────────────────
    for (const id of DECLARED_ZONE_IDS) {
      expect(
        zoneCollapsedOf([zoneRecord(id)], [], id),
        `ZC-1 — the derived default ANSWERS for every declared zone, and ${id} is one of them: a derivation that knew one axis pair or one id would leave the other three collapsed by accident rather than by rule`,
      ).toBe(true)
    }
  })

  it('ZC-2 — **THE ZONE ARM\'S COMPOSITION: `auto`/`hidden` AND NO `<member>: <size>px`, THE ATTRIBUTE IN THE SAME COMMAND, AND A SIZE-LESS ZONE WRITTEN NOTHING AT ALL (COLLAPSE INCLUDED)** — with both axes exercised off `LAYOUT_ZONE_AXES`\' own pairing rather than one hard-coded zone; the arm is PRIVATE, so the composition is read from its source with the comments elided and the ANSWER that selects the branch is driven through `zoneCollapsedOf`', () => {
    const zoneCollapsedOf = predicateAt('ZC-2')

    // ─── (a) THE ARM'S INPUT, MEASURED — the three answers the two branches below are selected by ────────────────────────
    expect(
      zoneCollapsedOf([zoneRecord('top', { size: 140 })], [], 'top'),
      'ZC-2 — the `top` fixture the composed style is asserted against is a COLLAPSED zone by the derivation (no pane names it), which is the branch this row\'s first clause is about',
    ).toBe(true)
    expect(
      zoneCollapsedOf([zoneRecord('top', { size: 140 })], [paneGeometry(MENUS_PANE_ID, { zone: 'top' })], 'top'),
      'ZC-2 — and the CONTROL that makes the clause above a reading: the same record with a pane naming it is EXPANDED, so the two branches are selected by one fact and not by the fixture\'s spelling',
    ).toBe(false)
    expect(
      zoneCollapsedOf([zoneRecord('left', { size: 120 })], [], 'left'),
      'ZC-2 — the SECOND axis\'s fixture is collapsed by the same derivation: `left` is a WIDTH and `top` a HEIGHT (`LAYOUT_ZONE_AXES`), so the two clauses below cannot be one axis read twice',
    ).toBe(true)
    expect(
      zoneCollapsedOf([zoneRecord('left', { size: 120 })], [paneGeometry(MENUS_PANE_ID, { zone: 'left' })], 'left'),
      'ZC-2 — and `left` is expanded by the same one pane, the second axis\'s control',
    ).toBe(false)

    // ─── (b) THE TABLE'S OWN PAIRING, ASSERTED AT THE TABLE — the two axes, and the arm reads ITS columns ────────────────
    const axes = regionBetween(CODE, 'const LAYOUT_ZONE_AXES', 'const PANE_FILL')
    expect(
      axes.length,
      'ZC-2 — `LAYOUT_ZONE_AXES` is the ONE table that pairs each zone with the member it fixes and the axis it scrolls (`§3`: *"`LAYOUT_ZONE_AXES`\' `member` column, read once"*), and this row asserts the pairing there rather than hard-coding one zone',
    ).toBeGreaterThan(0)
    expect(
      axes,
      'ZC-2 — the `top` row pairs the HEIGHT with the horizontal scroll: a collapsed `top` zone resolves its `auto` against the head row\'s `14px` height',
    ).toMatch(/\{\s*id:\s*'top',\s*member:\s*'height',\s*scroll:\s*'overflow-x'\s*\}/)
    expect(
      axes,
      'ZC-2 — and the `left` row pairs the WIDTH with the vertical scroll: the same collapse on the other axis, which is the axis §4\'s rotated lane exists for',
    ).toMatch(/\{\s*id:\s*'left',\s*member:\s*'width',\s*scroll:\s*'overflow-y'\s*\}/)

    // ─── (c) THE ARM ITSELF ───────────────────────────────────────────────────────────────────────────────────────────────
    const arm = zoneArmOf()
    expect(
      arm.length,
      'ZC-2 — `driveLayoutRegions`\' zone arm is the region this row speaks about (`for (const zone of LAYOUT_ZONE_AXES)` → the arrangement turn); an empty region is a row that cannot read what it measures, never a pass',
    ).toBeGreaterThan(0)

    const facts: readonly Fact[] = [
      {
        what: 'ZC-2 — the zone arm asks the ONE derivation (`zoneCollapsedOf(`) rather than deciding the collapse for itself: one fact, three readers (§1)',
        held: arm.includes('zoneCollapsedOf('),
      },
      {
        what: "ZC-2 — the collapsed box composes the member as `auto` (`§2`: `${member}: auto`), the one declaration that means the same thing on either axis",
        held: /(['"])auto\1/.test(arm),
      },
      {
        what: "ZC-2 — and the scroll as `hidden` (`§2`: `${scroll}: hidden`) — a collapsed zone CLIPS rather than scrolls, because a scrollbar in a one-head-row band would spend the whole band",
        held: /(['"])hidden\1/.test(arm),
      },
      {
        what: "ZC-2 — the EXPANDED arm keeps the record's figure on the member (`}px`) rather than replacing it with a constant",
        held: arm.includes('}px'),
      },
      {
        what: "ZC-2 — both members are composed from the TABLE's own columns (`zone.member`, `zone.scroll`) and never from a literal here, which is what lets the `top` and `left` clauses above be one arm and not two",
        held: arm.includes('zone.member') && arm.includes('zone.scroll'),
      },
      {
        what: "ZC-2 — the `display` arm is UNCHANGED (§2: *\"the `display` arm is unchanged\"*): the zone's participation still composes into the SAME style value (`D-194`, one value and not two writes)",
        held: arm.includes('display'),
      },
      {
        what: "ZC-2 — the same command carries the zone node's `collapsed` attribute: `paintStyle(runtime, zone.id, …)` gains the fourth argument (§2: *\"the same command carries `props.collapsed` on the ZONE node\"*)",
        held: /paintStyle\(\s*runtime,\s*zone\.id,[\s\S]{0,700}?collapsed:/.test(arm),
      },
      {
        what: "ZC-2 — the attribute is `'true'` where the derivation answers collapsed and the ENGINE'S REMOVAL (`undefined`) where it answers expanded: removal is the one spelling of EXPANDED (`D-253`'s absent arm)",
        held: /collapsed:[\s\S]{0,260}?'true'[\s\S]{0,120}?:\s*undefined/.test(arm),
      },
    ]
    expect(
      unproven(facts),
      `ZC-2 — every part of the zone arm's composition, each named above (\`${RENDERER}\`'s \`driveLayoutRegions\`, its zone arm)`,
    ).toEqual([])

    // ─── (d) THE SIZE ARM'S `continue` STANDS AHEAD OF THE COLLAPSE — §2's LIMIT (`D-174`) ─────────────────────────────────
    const sizeGate = arm.indexOf('held.size === undefined')
    const derivation = arm.indexOf('zoneCollapsedOf(')
    const figure = arm.indexOf('}px')
    expect(
      sizeGate,
      "ZC-2 — the size arm's `continue` (`held.size === undefined`) is what makes a zone the record states no `size` for written NOTHING AT ALL, and it must still stand in the arm",
    ).toBeGreaterThanOrEqual(0)
    expect(
      derivation,
      'ZC-2 — the collapse branch stands in the same arm as the size gate',
    ).toBeGreaterThan(sizeGate)
    expect(
      figure,
      "ZC-2 — **and the figure is composed only in the EXPANDED arm**: `<member>: <size>px` stands AFTER the derivation's own test, so a collapsed zone's command cannot carry it — while the size gate above withholds EVERY write, the collapse included, from a zone that states no figure (§2's limit, `D-174`)",
    ).toBeGreaterThan(derivation)
  })

  it('ZC-3 — **THE PANE ARM\'S EFFECTIVE COLLAPSE**: a pane whose own record states nothing and which stands in a COLLAPSED zone composes the collapsed box (`auto` on the adjustable axis, `hidden` on the scroll) and the pane\'s `collapsed: \'true\'`; the same pane with its zone EXPANDED composes the record\'s figure and passes the attribute as a REMOVAL; and a pane whose OWN record states `collapsed: true` in an expanded zone stays collapsed, because the effective state ORs the two', () => {
    const zoneCollapsedOf = predicateAt('ZC-3')
    /** **THE ONE PANE, ITS OWN RECORD SILENT** — no `collapsed` member, in `top`, and its figure stated at both axis members
     *  so that "the record's figure" and "the collapsed box" are two different readings of one fixture. */
    const silent = paneGeometry(MENUS_PANE_ID, { zone: 'top', width: 100, height: 100 })
    /** **ITS OWN RECORD STATING `true`** — the third clause's fixture. */
    const ownCollapsed = paneGeometry(MENUS_PANE_ID, { zone: 'top', width: 100, height: 100, collapsed: true })
    const zoneCollapsed = [zoneRecord('top', { size: 140, collapsed: true })] as const
    const zoneExpanded = [zoneRecord('top', { size: 140, collapsed: false })] as const

    // ─── (a) THE SAME PANE, ITS ZONE COLLAPSED — the answer the pane arm must compose FROM ───────────────────────────────
    expect(
      zoneCollapsedOf(zoneCollapsed, [silent], 'top'),
      'ZC-3 — with its ZONE collapsed and its OWN record silent, the derivation answers COLLAPSED for the zone: the pane arm composes `record.collapsed === true || zoneCollapsedOf(…)` (§2), and this is the second operand being `true` while the first is absent',
    ).toBe(true)
    // ─── (b) THE SAME PANE, THE ZONE EXPANDED — the record's figure is what is composed ──────────────────────────────────
    expect(
      zoneCollapsedOf(zoneExpanded, [silent], 'top'),
      'ZC-3 — the same pane with its zone EXPANDED: the effective collapse is `false`, so the arm composes the record\'s own figure and passes the attribute as a REMOVAL',
    ).toBe(false)
    // ─── (c) THE PANE'S OWN MEMBER IS THE OTHER OPERAND OF THE OR — and it is NOT the derivation's business ────────────────
    expect(
      zoneCollapsedOf(zoneExpanded, [ownCollapsed], 'top'),
      "ZC-3 — a pane whose OWN record states `collapsed: true` in an EXPANDED zone: the ZONE's answer is expanded — the member is the PANE's, and this derivation reads no member of a pane — while the arm's effective state stays COLLAPSED because it ORs the two. The probe below is what pins that OR",
    ).toBe(false)

    // ─── (d) THE COMPOSITION, READ FROM THE TWO SITES §2 MOVES ───────────────────────────────────────────────────────────
    const paint = functionRegion(CODE, 'panePaintOf')
    expect(
      paint.length,
      'ZC-3 — `panePaintOf` is the ONE composition both callers paint from (`:4632`), so a row that cannot read it cannot see the collapsed box at all',
    ).toBeGreaterThan(0)
    const parameters = /function panePaintOf\s*\(([\s\S]*?)\)/.exec(paint)?.[1] ?? ''
    const arm = paneArmOf()
    expect(
      arm.length,
      "ZC-3 — `driveLayoutRegions`' pane arm is the delivery's caller of that composition",
    ).toBeGreaterThan(0)

    const facts: readonly Fact[] = [
      {
        what: 'ZC-3 — `panePaintOf` gains ONE third operand, the EFFECTIVE collapse, declared `collapsed: boolean` (§2: *"gains ONE third parameter (`collapsed: boolean`) in place of its `record.collapsed === true` read"*)',
        held: /\bcollapsed\s*:\s*boolean\b/.test(parameters),
      },
      {
        what: "ZC-3 — and it no longer derives the collapse from its own record: `record['collapsed']` is GONE from the composition, because a composition that read it would be the second answer beside the caller's effective one",
        held: !/record\[['"]collapsed['"]\]/.test(paint) && !/record\.collapsed\b/.test(paint),
      },
      {
        what: 'ZC-3 — the collapsed box is `auto` on the adjustable axis (`paneAxisMembers(zone)`) and `hidden` on the scroll: the two halves of one composition, the box and its clipping',
        held: /auto/.test(paint) && /hidden/.test(paint) && paint.includes('paneAxisMembers('),
      },
      {
        what: "ZC-3 — the record's figure survives the change on the EXPANDED arm (`}px`), which is what makes an expansion restore the number a person set with ZERO writes (§3)",
        held: paint.includes('}px'),
      },
      {
        what: "ZC-3 — the pane ARM composes the effective collapse as the OR of the record's own member and the zone's derivation (`record.collapsed === true || zoneCollapsedOf(…)`)",
        held: /record(?:\[['"]collapsed['"]\]|\.collapsed)\s*===\s*true\s*\|\|[\s\S]{0,200}?zoneCollapsedOf\(/.test(arm),
      },
      {
        what: "ZC-3 — the pane node's `collapsed` attribute is written in the SAME command as its style (`paintStyle(runtime, nodeId, …, { collapsed: … })`)",
        held: /paintStyle\(\s*runtime,\s*nodeId,[\s\S]{0,700}?collapsed:/.test(arm),
      },
      {
        what: "ZC-3 — **and the attribute is the EFFECTIVE answer and not the record's own member alone**: the old `collapsed: record['collapsed'] === true ? 'true' : undefined` cannot stand here any more, or a pane in a collapsed zone would paint itself expanded",
        held: !/collapsed:\s*record(?:\[['"]collapsed['"]\]|\.collapsed)\s*===\s*true\s*\?/.test(arm),
      },
      {
        what: "ZC-3 — `'true'` where the effective answer is collapsed and the ENGINE'S REMOVAL (`undefined`) where it is expanded: absence stays the one spelling of EXPANDED",
        held: /'true'[\s\S]{0,120}?:\s*undefined/.test(arm),
      },
      {
        what: 'ZC-3 — the SCROLL goes to the pane\'s BODY (`D-270`): the second write of the same composition, unchanged by this rev',
        held: /paint\.body[\s\S]{0,400}?bodyId|bodyId[\s\S]{0,400}?paint\.body/.test(arm),
      },
    ]
    expect(
      unproven(facts),
      `ZC-3 — every part of the pane arm's effective collapse, each named above (\`${RENDERER}\`'s \`panePaintOf\` and \`driveLayoutRegions\`' pane arm)`,
    ).toEqual([])
  })

  it('ZC-4 — **THE ZONE CONTROL\'S TOGGLE WRITES THE NEGATION OF THE DERIVED ANSWER**: an EMPTY zone stating no `collapsed` member is derived collapsed, so its first press sends ONE write with value `false` — the row that proves an expanded empty zone PERSISTS — a second press from a record stating `false` sends `true`, and a record already stating `true` sends `false`; every write lands at `[\'zones\', <zone>, \'collapsed\']` at `mem`, and one press is one write', async () => {
    const installZoneCollapse = installerAt('ZC-4')
    const harness = actHarness({ controlZones: ZONE_CONTROL_ZONES })
    const controls = installZoneCollapse(harness.runtime)
    // THE PRECONDITION EVERY CLAUSE BELOW RIDES: four authored controls, each with a live body AND a listener (`C1`–`C4`).
    expect(
      controls.controls,
      'ZC-4 — the turn walks the FOUR authored zone controls `§7` states; a census that lost one is a zone a person cannot collapse',
    ).toBe(4)
    expect(
      [controls.installed, controls.attached],
      'ZC-4 — and each of the four took BOTH causes — the installed body (`provident.dispatch` reaches it) and the `click` a person fires (`AL-3`: one act, two causes). A press measured on a refused install reaches no act for a reason this row is not about',
    ).toEqual([4, 4])
    expect(
      harness.resolved,
      "ZC-4 — the four ids the turn resolves are `§7`'s authored literals: the control's own `css.id`/`props.id` on both sides (`D-41`, `D-188` debt 2)",
    ).toEqual(expect.arrayContaining(['top-collapse', 'bottom-collapse', 'left-collapse', 'right-collapse']))

    // ─── (a) AN EMPTY ZONE STATING NOTHING: DERIVED COLLAPSED, SO THE PRESS WRITES `false` ────────────────────────────────
    adoptShape({ zones: [zoneRecord('top', { size: 140 })], panes: [] })
    const before = harness.commands.length
    harness.press('top-collapse')
    await settled()
    expect(
      harness.writes,
      'ZC-4 — **ONE write per press, and the value is `false`**: the zone states nothing and holds no pane, so `Z3` answers COLLAPSED and `X2` negates the DERIVATION — a toggle of the record\'s absent member would write `true` and leave an empty zone a person just expanded collapsing again (`D-129`\'s class: a state the delivery cannot read is a state the next delivery overrules)',
    ).toHaveLength(1)
    expect(
      harness.writes[0],
      "ZC-4 — the write's ADDRESS, its TIER and its value, whole: `{ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: false }` (`X3`; `['zones']` keeps `mem`, `D-91`) — a member written at another tier or another leaf is not this act",
    ).toEqual({ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: false })
    expect(
      harness.commands.length,
      'ZC-4 — and `X4` holds: NO paint call and no re-read on the press — the record\'s own push repaints (`D-82` clause 4), so the act\'s whole bill is the ONE route write above',
    ).toBe(before)

    // ─── (b) THE SECOND PRESS, FROM A RECORD NOW STATING `false` ──────────────────────────────────────────────────────────
    adoptShape({ zones: [zoneRecord('top', { size: 140, collapsed: false })], panes: [] })
    harness.press('top-collapse')
    await settled()
    expect(
      harness.writes,
      'ZC-4 — the SECOND press is the other half of §1\'s sentence: the record now STATES the disagreement (`false`), so the derived answer is EXPANDED and the press writes `true` — and there is still exactly one write per press',
    ).toHaveLength(2)
    expect(
      harness.writes[1],
      'ZC-4 — the second write is the same address, the same tier and the negation of the record\'s own word: `true`',
    ).toEqual({ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: true })

    // ─── (c) A ZONE THE RECORD ALREADY STATES `true` ─────────────────────────────────────────────────────────────────────
    adoptShape({ zones: [zoneRecord('top', { size: 140, collapsed: true })], panes: [] })
    harness.press('top-collapse')
    await settled()
    expect(
      harness.writes,
      'ZC-4 — one press, one write, on every arm: the third press adds exactly one',
    ).toHaveLength(3)
    expect(
      harness.writes[2],
      'ZC-4 — a record stating `true` sends `false`: the toggle negates the answer WHATEVER arm produced it — the derivation when the member is absent, the record when it is stated',
    ).toEqual({ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: false })

    // ─── (d) EVERY WRITE IS THE ZONE'S OWN LEAF AT `mem` — and none is a family write, a `display` or a pane's leaf ───────
    for (const [at, payload] of harness.writes.entries()) {
      const write = payload as { readonly path?: readonly unknown[]; readonly tier?: unknown }
      expect(
        write.path?.[0],
        `ZC-4 — write ${String(at)} addresses the ZONE family: the member stands at ['zones', <id>, 'collapsed'] and the act writes no other family (§1: *"written by the ACTS and by nothing else"*)`,
      ).toBe('zones')
      expect(
        write.path?.[2],
        `ZC-4 — write ${String(at)} names the member the design adds and nothing else: \`['zones', <zone>, 'collapsed']\` (§1) — never \`display\`, which is the OTHER extreme member and is not this act's to write (§1, §10)`,
      ).toBe('collapsed')
      expect(
        write.tier,
        `ZC-4 — write ${String(at)} is at \`mem\`: \`['zones']\` keeps the tier it has (brief §2, \`D-91\`)`,
      ).toBe('mem')
    }
  })

  it('ZC-5 — **THE PANE CONTROL\'S BRANCH**: with the pane\'s ZONE collapsed, one press of the pane\'s own control sends ONE write at `[\'zones\', <zone>, \'collapsed\']` with value `false` and NO write at `[\'panes\', …]`; with the zone EXPANDED it sends ONE write at `[\'panes\', <pane>, \'collapsed\']` with the NEGATED record value and NONE at `[\'zones\', …]` — one control, one act, chosen by the state its own glyph already shows (§8, trigger (b))', async () => {
    const harness = actHarness({ controlPanes: PANE_CONTROL_PANES })
    const controls = installPaneCollapse(harness.runtime)
    expect(
      controls.controls,
      'ZC-5 — the pane collapse controls the realm installs are the ones this row presses: a control that took no body or no listener reaches no act, and a press measured there would read as a silent act rather than a refused install',
    ).toBeGreaterThan(0)
    expect(
      [controls.installed, controls.attached],
      'ZC-5 — every installed control took BOTH causes (`installPaneCollapse`\'s `C3`/`C4`)',
    ).toEqual([controls.controls, controls.controls])

    // ─── (a) THE PANE'S ZONE IS COLLAPSED: the press belongs to the ZONE ──────────────────────────────────────────────────
    adoptShape({
      zones: [zoneRecord('top', { size: 140, collapsed: true })],
      panes: [paneGeometry(MENUS_PANE_ID, { zone: 'top' })],
    })
    harness.press('menus-collapse')
    await settled()
    expect(
      harness.writes,
      "ZC-5 — **inside a collapsed zone ONE press writes ONE leaf, and it is the ZONE'S**: the pane's painted `collapsed` is the EFFECTIVE one (§2), so the press the person makes is an open press — *\"the presentation that must change is the zone's, and the pane's own member is memory this press did not speak about\"* (§8)",
    ).toHaveLength(1)
    expect(
      harness.writes[0],
      "ZC-5 — the write is `{ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: false }`: an expansion is `false` at the ZONE's own address — and NOTHING at `['panes', …]`, which is the whole difference between this branch and the next",
    ).toEqual({ path: ['zones', 'top', 'collapsed'], tier: 'mem', value: false })

    // ─── (b) THE ZONE IS EXPANDED: the press is the pane's own ───────────────────────────────────────────────────────────
    adoptShape({
      zones: [zoneRecord('top', { size: 140, collapsed: false })],
      panes: [paneGeometry(MENUS_PANE_ID, { zone: 'top', collapsed: true })],
    })
    harness.press('menus-collapse')
    await settled()
    expect(
      harness.writes,
      'ZC-5 — and with the zone EXPANDED the second press adds exactly one write, at the PANE\'s own leaf',
    ).toHaveLength(2)
    expect(
      harness.writes[1],
      "ZC-5 — `{ path: ['panes', 'pane-menus', 'collapsed'], tier: 'file', value: false }`: the NEGATED record value (`X2`: `standing.collapsed !== true`) at the pane family's own tier — and NONE at `['zones', …]`, because this press spoke about the pane and not about the zone",
    ).toEqual({ path: ['panes', MENUS_PANE_ID, 'collapsed'], tier: 'file', value: false })

    // ─── (c) THE TWO ARMS ARE ONE WRITE EACH AND NEVER A PAIR ─────────────────────────────────────────────────────────────
    expect(
      harness.writes.map((payload) => (payload as { readonly path?: readonly unknown[] }).path?.[0]),
      'ZC-5 — the two presses addressed two different families, once each: the branch is a READ of the zone\'s record and never a second write, so no press carries both addresses (§8: *"no act calls another"*)',
    ).toEqual(['zones', 'panes'])
  })

  it('ZC-6 — **THE CHAINED PAIR OF A DROP INTO A COLLAPSED ZONE**: the zone write is sent FIRST and the pane\'s whole-family write only if the zone\'s answer is `committed`; a REFUSED zone answer ABORTS the pane write (and is reported, not thrown); and both answers are read in `D-117`\'s register — `refused` → `console.error`, `unread` → `console.warn`, `committed` → silence', () => {
    const move = functionRegion(CODE, 'paneMoveAct')
    expect(
      move.length,
      "ZC-6 — `paneMoveAct` is the ONE act both expand triggers ride (`§8`, `:2787`); §2 keeps it PRIVATE, so this row reads the chain from its source with the comments elided — a row satisfied by the design's prose in a comment would measure nothing",
    ).toBeGreaterThan(0)

    // THE TWO ADDRESSES THE PAIR NAMES, located by their own spelling: the zone write by the `'zones'` literal `X3` hands
    // `dataRoute`, and the pane write by `PANES_ADDRESS` — the family's one root, spelled once in this module (`:3251`).
    const zoneAt = move.search(/(['"])zones\1/)
    const panesAt = move.indexOf('PANES_ADDRESS')
    expect(
      zoneAt,
      "ZC-6 — the act SENDS the zone's member at all (`path: ['zones', <zone>, 'collapsed']`, §8's trigger (a)): without it a drop into a collapsed zone relocates a pane into a zone nobody expanded",
    ).toBeGreaterThanOrEqual(0)
    expect(
      panesAt,
      'ZC-6 — and it still sends the placement at the panes family\'s own root (`PANES_ADDRESS`, one whole-family value, `D-259`)',
    ).toBeGreaterThanOrEqual(0)
    expect(
      zoneAt,
      'ZC-6 — **THE ORDER IS THE SAFETY**: the zone write stands FIRST, because a refusal at the zone leaves the panes exactly where they stand — a person sees an open zone and an unmoved pane and can retry — while the inverse order would land a relocation nobody can see (§8)',
    ).toBeLessThan(panesAt)

    // THE GATE: everything between the two writes, which is where the answer is read and the chain is decided.
    const gate = move.slice(zoneAt, panesAt)
    const facts: readonly Fact[] = [
      {
        what: "ZC-6 — the zone's member is written at the family's own tier (`mem`, `D-91`) and not at the panes family's",
        held: /(['"])mem\1/.test(gate),
      },
      {
        what: "ZC-6 — the zone write's answer is AWAITED before the pane write is composed (`await`), because the pair's gate is an answer and not an intention",
        held: /await/.test(gate),
      },
      {
        what: "ZC-6 — **the pane write is GATED on `'committed'`**: an answer that is anything else returns BEFORE the placement is sent, which is the arm that keeps a refused expansion from landing a relocation",
        held: /(['"])committed\1/.test(gate) && /return\s+false/.test(gate),
      },
      {
        what: "ZC-6 — a REFUSED zone answer is reported in `console.error` — carrying the answer's `reason` and `message` — and is not thrown: the act is TOTAL (`D-127`), so no caller wraps it in a `try`",
        held: /(['"])refused\1/.test(gate) && /console\.error/.test(gate),
      },
      {
        what: "ZC-6 — an UNREAD answer is `console.warn`, the register's middle arm (`D-117`): an answer that is neither a commit nor a refusal leaves the store's word unread and says so",
        held: /console\.warn/.test(gate),
      },
      {
        what: "ZC-6 — the zone write stands inside a `try`/`catch` whose catch reports and returns, so a route that throws is an ARM and not an escape",
        held: /catch/.test(gate),
      },
    ]
    expect(
      unproven(facts),
      `ZC-6 — every part of the chained pair, each named above (\`${RENDERER}\`'s \`paneMoveAct\`, the span between its two writes)`,
    ).toEqual([])

    // ─── AND THE PANE WRITE'S OWN REGISTER IS UNMOVED — the pair is two answers in ONE vocabulary (`D-117`) ────────────────
    const placement = move.slice(panesAt)
    expect(
      placement,
      "ZC-6 — the placement's own answer keeps its one meaning and its one register: `committed` is SILENCE (the act's `true` says the placement committed), a refusal is `console.error` with `reason`/`message` verbatim, and anything else is `console.warn` — this rev adds an arm and moves no word of the existing one",
    ).toMatch(/console\.error[\s\S]{0,600}?console\.warn/)
    expect(
      placement,
      "ZC-6 — and the act's answer is still `true` only where the store said `committed`: a no-op, a refusal and an unreadable answer all leave the record exactly as it stood, which is what the drag's release and the preview's restore read",
    ).toMatch(/(['"])committed\1[\s\S]{0,80}?return\s+true/)
  })
})
