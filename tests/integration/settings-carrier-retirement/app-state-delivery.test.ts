// tests/integration/settings-carrier-retirement/app-state-delivery.test.ts — **THE APP-STATE ROWS GET AN ADDRESS THE
// RENDERER LISTENS TO** (`D-104`, closing `D-82`'s `V3`).
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// ═══ THE RULE, IN THE USER'S OWN WORDS ═══
// **"The renderer does not ask state, it listens. If it needs to ask, it does so within a listener."** `D-82`'s clause-2
// audit measured the secure crossing's third address delivering **zero**: `['operator-app-state']` — the rows the module
// registry's `file.modules.<id>` leaves stand in — was not in `subscribe`'s address list, so a module row's change reached
// the renderer **only by its own request** (`IPC_MODULE_GET`, inside `SecurePanels.refresh()`, which every boot, every
// authored click and the `dispatch()` seam called). That is an ON-DEMAND ASK, and this battery is the measurement that it is
// gone: the address is in the subscription, the delivery crosses, and the realm's shape is refilled INSIDE the listener.
//
// ═══ WHAT IS DRIVEN, AND WHAT IS NOT ═══
// The subject is the composition `src/main/main.ts` builds, in the order it builds it — the surface over a real
// `provident-storeroom` instance on a scratch profile, `attach` of a sink, the composition's broadcast, the bridge member
// `src/main/preload.ts` exposes, and `src/renderer/module-client.ts` — so no row here is a stand-in for a mechanism the app
// does not have. **TWO THINGS ARE THE NODE SUITE'S AND ARE NAMED RATHER THAN HIDDEN**: the `BrowserWindow` fan-out is
// `main.ts`'s and is not constructible here (`main.ts` imports `electron` at module scope), so the broadcast is the
// composition's own callback and the bridge's `onChanged` is the one the preload registers on the same channel; and the
// renderer's `startAppStateShape` is not importable for the same reason, so the ROW drives the client's two turns —
// `subscribe` then ONE `fill` — exactly as that function does.
//
// **EVERY ROW CAN FAIL.** The revert that kills `AP-1`/`AP-2`/`AP-5` is the one this pass' instruction names: remove
// `APP_STATE_ADDRESS` from `subscribe`'s address list and the delivery count returns to ZERO. `AP-3` is the structural
// half — an assertion over COMMENT-ELIDED code that the module-shaped read sits inside the listener and nowhere else — and
// its own revert is a read put back at request time.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createSettingsSurface } from '../../../src/main/settings-surface/index.js'
import { createModuleClient } from '../../../src/renderer/module-client.js'

const ROOT = fileURLToPath(new URL('../../../', import.meta.url))

/** The registry's row prefix, spelled here as `main.ts` spells it (a name is a member of a row, never a path segment). */
const PREFIX = 'file.modules.'
const SOURCE = 'export const greeting = () => "hello"'

const sha256 = (source: string): string => createHash('sha256').update(source, 'utf8').digest('hex')

/** **`main.ts`'s `moduleBridgeResult()`, member for member** — the answer the bridge's `get` serves, built from the
 *  surface's own rows: the row list projected to the four members the pane paints and the boot's diagnosis beside it. */
function moduleAnswerOf(rows: readonly { name: string; value: unknown }[], legacy: string, storage: string): unknown {
  const modules: Array<Record<string, unknown>> = []
  const loaded: string[] = []
  const quarantined: string[] = []
  for (const row of rows) {
    if (!row.name.startsWith(PREFIX)) continue
    const held = row.value
    if (held === null || typeof held !== 'object' || Array.isArray(held)) continue
    const rec = held as Record<string, unknown>
    if (rec['hash'] !== sha256(String(rec['source']))) quarantined.push(String(rec['name']))
    else if (rec['disabled'] !== true) loaded.push(String(rec['name']))
    modules.push({ name: rec['name'], version: rec['version'], capabilities: rec['capabilities'], disabled: rec['disabled'], quarantined: rec['quarantined'] })
  }
  return { corrupt: legacy === 'corrupt' || storage === 'unreachable', quarantined, loaded, modules }
}

/** One module row, in the shape `main.ts`'s `put` composes: the hash always re-derived from `source`. */
function moduleRow(name: string, version: string, extra: Record<string, unknown> = {}): { name: string; value: unknown } {
  return { name: `${PREFIX}${name}`, value: { name, version, source: SOURCE, hash: sha256(SOURCE), installedAt: '2026-11-03T00:00:00.000Z', disabled: false, quarantined: false, ...extra } }
}

interface Composition {
  surface: ReturnType<typeof createSettingsSurface>
  client: ReturnType<typeof createModuleClient>
  /** The composition's broadcast: how many times the surface called it, and how many handler invocations reached the realm. */
  readonly broadcasts: { count: number }
  readonly handlerCalls: () => number
  commitRows(rows: readonly { name: string; value: unknown }[]): void
  settle(): Promise<void>
}

/** **THE COMPOSITION `main.ts` BUILDS, IN ITS OWN ORDER** — surface, sink, broadcast, bridge, client, one boot fill. */
function compose(userDataDir: string): Composition {
  const handlers: Array<() => void> = []
  const broadcasts = { count: 0 }
  let calls = 0
  // THE BROADCAST IS THE COMPOSITION'S CALLBACK (`src/main/main.ts`'s `onAppStateChanged`), and the bridge's `onChanged` is
  // the preload's own registration on `IPC_MODULE_CHANGED`: here the two are joined by a function call, which is the whole
  // of what the channel does between them.
  const surface = createSettingsSurface({
    userDataDir,
    onAppStateChanged: () => {
      broadcasts.count += 1
      for (const handler of handlers) handler()
    },
  })
  surface.attach({
    applyGatePatch: () => undefined,
    applyExclusion: () => undefined,
    gate: { exclusionState: () => 'mcp-enabled' },
  })
  const bridge = {
    get: async () => {
      const answer = surface.state()
      return moduleAnswerOf(answer.rows, answer.legacy, answer.storage)
    },
    onChanged: (handler: () => void): (() => void) => {
      handlers.push(handler)
      return () => {
        const at = handlers.indexOf(handler)
        if (at >= 0) handlers.splice(at, 1)
      }
    },
  }
  const client = createModuleClient({ bridge: bridge as never })
  // THE ROW COUNTS THE REALM'S HANDLER INVOCATIONS, never the broadcast: a delivery that crossed the channel but reached no
  // listener would leave this counter still and the row red.
  client.subscribe(() => {
    calls += 1
  })
  return {
    surface,
    client,
    broadcasts,
    handlerCalls: () => calls,
    commitRows: (rows) => {
      const answer = surface.commit(rows)
      if (answer.status !== 'committed') throw new Error(`the module-row commit was REFUSED: ${JSON.stringify(answer)}`)
    },
    // THE CLIENT'S READ IS ASYNCHRONOUS (a delivery is a RE-READ), so a row that asserts a refilled shape awaits one turn.
    settle: () => new Promise<void>((resolve) => setTimeout(resolve, 0)),
  }
}

let dir: string
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'provident-app-state-delivery-'))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

/** **COMMENTS ELIDED** — the absence and presence assertions below read CODE: a `//` line and every `/* … *\/` block are
 *  removed before a claim is made, so no row can pass on a comment that mentions a name (`D-103`'s `L-6` discipline). */
function elided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => {
      const at = line.indexOf('//')
      return at >= 0 ? line.slice(0, at) : line
    })
    .join('\n')
}

const sourceOf = (path: string): string => readFileSync(join(ROOT, path), 'utf8')

describe('settings-carrier-retirement · THE APP-STATE ROWS’ DELIVERY (D-104; `D-82`’s `V3`)', () => {
  it('AP-1 · A MODULE-ROW CHANGE COMMITTED MAIN-SIDE DELIVERS TO THE RENDERER WITHOUT THE RENDERER ASKING — measured by the realm’s own handler counter, and ZERO before the change', async () => {
    const composed = compose(dir)
    await composed.client.fill()
    expect(composed.handlerCalls(), 'the boot fill is a READ and never a delivery: the subscription’s handler has not run').toBe(0)
    // **THE ONE BROADCAST THAT STANDS HERE IS THE BOOT'S OWN, AND IT IS THE DRAIN** (`D-221`; `docs/L3/operator-settings/
    // delivery.md` §4): `attach` subscribes FIRST, so the creation's four held addresses are handed over inside it — and the
    // app-state one is routed to this composition's `onAppStateChanged`. **NO APP-STATE ACT HAS BEEN COMMITTED**, which is
    // what this figure has to keep saying; what moved is that the boot's own firing is a delivery rather than silence.
    expect(composed.broadcasts.count, 'one broadcast, and it is the CREATION’s: no app-state act has been committed, and the realm’s handler still has not run').toBe(1)

    // ONE module row, committed the way every writer class commits it — ONE whole rows list through the surface.
    composed.commitRows([moduleRow('alpha', '1.0.0')])
    expect(composed.broadcasts.count, 'the surface handed the change to the composition’s broadcast INSIDE the write — before the commit’s own answer, and one behind the boot’s own draining delivery').toBe(2)
    await composed.settle()
    expect(composed.handlerCalls(), 'and it crossed the channel to the realm’s registered handler with NOTHING asked for by the realm').toBe(1)

    // A SECOND act delivers again — the address is bound to the one subscription, not to one lucky instant.
    composed.commitRows([moduleRow('alpha', '1.0.0'), moduleRow('beta', '0.2.0')])
    await composed.settle()
    expect(composed.handlerCalls(), 'a second module-row change is a second delivery').toBe(2)
    expect(composed.broadcasts.count, 'and a second broadcast').toBe(3)
    expect(composed.client.shape().modules.map((m) => m.name), 'and the realm’s shape carries both rows it was TOLD about').toEqual(['alpha', 'beta'])
  })

  it('AP-2 · THE SHAPE CARRIES THE ROWS AFTER THE DELIVERY, AND ITS VALUE EQUALS WHAT A READ WOULD HAVE ANSWERED — so the shape is not a guess', async () => {
    const composed = compose(dir)
    expect(composed.client.shape().filled, 'nothing has answered yet, so the shape says so: no delivery, and the boot read has not run').toBe(false)

    composed.commitRows([moduleRow('alpha', '1.0.0')])
    await composed.settle()
    const shape = composed.client.shape()
    expect(shape.filled, 'the delivery refilled the shape').toBe(true)

    // THE EQUALITY IS AGAINST A READ TAKEN NOW, not against the row this file wrote: the bridge’s own `get` is the route the
    // app reads through, so the shape must answer exactly what asking would have answered.
    const readNow = await composed.client.fill()
    expect(readNow.status, 'the read taken now is the committed arm').toBe('committed')
    if (readNow.status !== 'committed') throw new Error('unreachable: asserted above')
    expect({ corrupt: shape.corrupt, quarantined: shape.quarantined, loaded: shape.loaded, modules: shape.modules }).toEqual({
      corrupt: readNow.corrupt,
      quarantined: readNow.quarantined,
      loaded: readNow.loaded,
      modules: readNow.modules,
    })
    expect(shape.loaded, 'and the row it was told about is the row the read serves: the hash re-verifies, so it is loaded').toEqual(['alpha'])

    // A DISABLE MOVES BOTH THE READ AND THE SHAPE, and the shape’s own account of `loaded` follows the crossing’s rule.
    composed.commitRows([moduleRow('alpha', '1.0.0', { disabled: true })])
    await composed.settle()
    expect(composed.client.shape().loaded, 'a disabled row is no longer loaded, and the shape says so without being asked').toEqual([])
    expect(composed.client.shape().modules.map((m) => m.disabled), 'the entry carries the flag the crossing stored').toEqual([true])
  })

  it('AP-3 · NO PULL REMAINS — over COMMENT-ELIDED code: the renderer’s module-shaped read lives in ONE file, inside the listener’s own re-read, and the consumer asks for nothing', () => {
    const rendererFiles = ['src/renderer/renderer.ts', 'src/renderer/secure-panels.ts', 'src/renderer/tabs-client.ts', 'src/renderer/view-client.ts', 'src/renderer/module-client.ts', 'src/renderer/runtime.ts', 'src/renderer/extensions.ts']
    const code = new Map(rendererFiles.map((path) => [path, elided(sourceOf(path))]))

    // (a) THE READ ROUTE IS ACQUIRED IN EXACTLY ONE FILE, and it is the client that owns the shape: the predicate is the
    //     ACQUISITION of the member at run time — `provident?.module`, or the narrowed cast that reads it off the ambient
    //     object — so a file that merely DECLARES the member (the pane's `declare global`) is not mistaken for a reader.
    const acquires = rendererFiles.filter((path) => /\bprovident\??\s*\.\s*module\b|\)\s*\.\s*module\b/.test(code.get(path) as string))
    expect(acquires, 'the app-state rows are asked for in the client and nowhere else — no pane, no wiring module, no handler body').toEqual(['src/renderer/module-client.ts'])

    // (b) THE CONSUMER READS NO MODULE AT ALL: `secure-panels` was the on-demand ask (`moduleBridge.get()` inside `refresh()`,
    //     called by the boot, by every authored click and by the `dispatch()` seam) and it is gone.
    const panels = code.get('src/renderer/secure-panels.ts') as string
    expect(/provident\?\.module|moduleBridge/.test(panels), 'the pane asks the app-state rows nothing: no `provident?.module` read stands in it').toBe(false)
    expect(/applyAppState/.test(panels), 'and what fills it is a DELIVERY’s turn, by name').toBe(true)
    expect(/module\.get\s*\(|moduleBridge/.test(elided(sourceOf('src/renderer/renderer.ts'))), 'the wiring module performs no module-shaped read of its own').toBe(false)

    // (c) THE READ SITS INSIDE THE LISTENER. In `module-client.ts` the route is invoked ONCE, in `fill`; `fill` is invoked
    //     from the subscription’s body — the delivery’s duty — and once more by the export the consumer’s ONE stated boot
    //     fill calls. THREE counts, no fourth.
    const client = code.get('src/renderer/module-client.ts') as string
    expect((client.match(/getRoute as \(\) => Promise<unknown>\)\.call\(member\)/g) ?? []).length, 'the module read is ONE expression, inside `fill`').toBe(1)
    expect((client.match(/void fill\(\)\.then\(/g) ?? []).length, 'and `fill` is invoked from the subscription’s own body: a delivery is a re-read').toBe(1)
    const fillBodyAt = client.indexOf('async function fill(')
    const callAt = client.indexOf('.call(member)')
    expect(fillBodyAt, '`fill` is the function that holds the read').toBeGreaterThan(-1)
    expect(callAt, 'and the read stands INSIDE it, never beside it').toBeGreaterThan(fillBodyAt)

    // (d) THE WIRING’S ONLY TWO TURNS — one registration and one stated boot fill — and no third call site. The census is
    //     scoped to the ONE function (`startAppStateShape`), because the wiring module holds a second client (the view
    //     record’s) whose own boot fill sits above it and is not this subject.
    const wiring = elided(sourceOf('src/renderer/renderer.ts'))
    expect((wiring.match(/startAppStateShape\(panels\)/g) ?? []).length, 'the shape is started at ONE boot site').toBe(1)
    const at = wiring.indexOf('function startAppStateShape(')
    expect(at, 'the boot site is one function, named').toBeGreaterThan(-1)
    const shapeBody = wiring.slice(at)
    expect((shapeBody.match(/client\.subscribe\(/g) ?? []).length, 'that function takes ONE subscription').toBe(1)
    expect((shapeBody.match(/client\.fill\(\)/g) ?? []).length, 'and performs the ONE stated boot read, never a second').toBe(1)
    expect(
      (shapeBody.match(/panels\?\.applyAppState\(/g) ?? []).length,
      'and the ONLY two turns that reach the consumer are the delivery’s and the boot fill’s — a shape nothing hands on is a listener that displays nothing',
    ).toBe(2)
  })

  it('AP-4 · THE CONTROL: A DELIVERY FOR A FAMILY THE RENDERER DOES NOT LISTEN TO DOES NOTHING — a record write and an exclusion transition move neither the counter nor the shape', async () => {
    const composed = compose(dir)
    await composed.client.fill()
    composed.commitRows([moduleRow('alpha', '1.0.0')])
    await composed.settle()
    const afterModule = composed.client.shape()
    const callsAfterModule = composed.handlerCalls()
    expect(callsAfterModule, 'the app-state delivery is the one this battery counts').toBe(1)

    // THE SAME TWO ADDRESSES THE ONE SUBSCRIPTION HAS ALWAYS BOUND, driven as acts: neither is the app-state family.
    expect(composed.surface.set({ token: 'tok', groups: ['module'] }).write.status, 'a committed record write').toBe('committed')
    expect(composed.surface.transition('mcp-disabled').applied, 'and a committed exclusion transition').toBe(true)
    await composed.settle()

    expect(composed.broadcasts.count, 'the composition broadcast NOTHING for either family: the push is the third address’s alone, so the figure is the boot’s own one plus the module-row delivery and no third').toBe(2)
    expect(composed.handlerCalls(), 'the realm’s handler did not run').toBe(callsAfterModule)
    expect(composed.client.shape(), 'and the shape is the shape the module-row delivery left, member for member').toEqual(afterModule)
  })

  it('AP-5 · THE ADDRESS IS IN THE SUBSCRIPTION BY NAME, AND THE SURFACE HANDS ITS DELIVERY TO THE COMPOSITION — the two halves that make the row above reachable', () => {
    // THE INSTANCE: one subscription, FOUR addresses, and the third routed to its own body rather than the record’s.
    const instance = elided(sourceOf('src/main/operator-settings/index.ts'))
    const list = /const addresses: readonly OperatorSettingsAddress\[\] = \[([^\]]*)\]/.exec(instance)
    expect(list, 'the address list of the one subscription is declared once').not.toBeNull()
    // ⟶ **THE LIST MOVES `3 → 4` AT `D-123`**: the pane's open state is the fourth address, bound by the same name and
    // routed by the same body — a family's change reaches its consumers as a delivery, which is this row's own claim.
    expect((list as RegExpExecArray)[1].split(',').map((name) => name.trim()).filter((name) => name.length > 0), 'and it names the record, the pair, the app-state rows and `D-123`’s pane record').toEqual(['RECORD_ADDRESS', 'EXCLUSION_ADDRESS', 'APP_STATE_ADDRESS', 'PANE_ADDRESS'])
    expect(/address\[0\] === APP_STATE_ADDRESS\[0\]/.test(instance), 'the app-state delivery is ROUTED by the module’s own constant, so no other file spells the address (`D-53`)').toBe(true)
    // **AND SINCE `D-221` THE REGISTRATION IS THE CONSTRUCTION'S AND THERE IS NO OTHER** (`docs/L3/operator-settings/
    // delivery.md` §6 `OD-2`/`OD-3`/`OD-4`; `OG-1`): the delivery's four entries are adopted by `storeCreate`, so the
    // subscription is a FAN-OUT entry — `subscribe` spells no `listen`/`register`, and the withdrawal the subscriber is
    // handed spells no `unlisten`. This is the census that makes `D-129`'s one-registration rule structural rather than a
    // claim: two registrations for one address cannot be written here, because the verbs that would spell one are gone.
    expect(/\bstanding\.listen\(|\bstanding\.register\(|\.unlisten\(|\.removeListener\(/.test(instance), 'no `listen`, `register`, `unlisten` or `removeListener` remains in the module: the crossing takes ONE registration and the construction is where it is taken').toBe(false)
    expect(/listeners: \[\.\.\.delivery\.entries\]/.test(instance), 'and the construction hands the package the delivery’s four entries where `listeners: []` stood').toBe(true)

    // THE SURFACE: the one subscription carries the second body.
    const surface = elided(sourceOf('src/main/settings-surface/index.ts'))
    expect(/settings\.subscribe\(onDelivery, onAppStateDelivery\)/.test(surface), 'the surface subscribes with BOTH bodies in the one registration').toBe(true)
    expect(/options\.onAppStateChanged\?\.\(\)/.test(surface), 'and hands the change to the composition’s broadcast, inside the delivery and never at a call site').toBe(true)

    // AND THE ADDRESS IS SPELLED IN THE CODE OF EXACTLY ONE FILE (`ISO-7`'s census, unchanged by this pass).
    const spellers = ['src/main/operator-settings/index.ts', 'src/main/settings-surface/index.ts', 'src/main/main.ts', 'src/main/preload.ts', 'src/renderer/renderer.ts', 'src/renderer/module-client.ts']
      .filter((path) => elided(sourceOf(path)).includes('operator-app-state'))
    expect(spellers, 'one file declares the address; the surface reaches it through the instance’s own constant').toEqual(['src/main/operator-settings/index.ts'])
  })
})
