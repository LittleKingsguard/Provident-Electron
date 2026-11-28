// tests/integration/secure-panels/roster.test.ts — THE L2 BATTERY for `secure-panels`, part 1:
// THE ARRANGEMENT, AND THE ROUTE A CLICK REACHES.
//
// THE CONTRACT: `docs/L3/secure-panels/roster-and-placeholders.md` (the split page `S-10` wrote at the ceiling; the
// standing L2 page's rev 10 is OWED and is named in §8) and `behaviour.md` §1 and §3. **THE ARRANGEMENT `S-10` REPLACES
// IS THE ONE THIS BATTERY USED TO READ**: the roster was a hand-written label table typed against the gate's closed
// `ToolGroup` union, and it is now the DECLARATION REGISTRY'S PROJECTION — foundation first, then each module's own
// order, each id labelled by its declarer (`C-9`). §4's surface does not move: one `label` node per roster row, its two
// attributes, one generated handler, and the route a click's body reaches. behaviour.md §3 is what one click does, in
// order; part 2 of this battery is the bytes, in `persistence.test.ts` beside this file.
//
// EACH ROW IS ONE CLAIM, and each names the document it reads. **`M-10`'s three arms DRIVE the pane's isolated graph** and
// read the AUTHORED nodes off the supervisor — the stronger witness, because an envelope that echoed its input would pass
// a roster-array read; rows 4-6 drive the click and the route module. Nothing here is inferred from prose alone.
//
// **`M-10` IS THE NET THE RETIRED UNION LEFT** (`S-10`: the compile-time `Record<ToolGroup, string>` binding died with
// `S-8`'s `ToolGroup = string`). It is a RUNTIME SET EQUALITY in both directions, red by id, plus the placeholder domain —
// and it is filed HERE rather than in a new battery because the rows it replaces lived here (`D-40`: the row's grain is
// its subject's, and this subject is the pane's construction).
//
// WHAT THIS BATTERY IS NOT. It is not the unit's decisive evidence and it does NOT re-test `P-1`…`P-7`
// (docs/L1/secure-panels.md §4.3): the rendered sixth toggle, its rendered attribute, the status
// line, the restart paint and the `tools/list` set differences belong to the live leg
// (`tests/e2e/secure-panels/panes-live.mjs`; D-37), and no row here states one of them. Nor is it a
// rendered-surface battery: no row reads a box, a coordinate, a screenshot or a real renderer. The
// one DOM it touches is the module suite's LAYOUT-LESS shim (`src/shared/dom-shim.ts`), whose whole
// purpose is that a pane handler can be DRIVEN — authored envelope, DomAdapter, dispatch — with no
// display and no geometry; a shim element is an attribute bag, never a rendered surface
// (brief.md §6, D-27). Rows 1-2 are DECLARATION READS and say so: the pane's roster and its table
// are module-private (`src/renderer/secure-panels.ts:72-79`), and the instrument is the one
// `tests/integration/security-store-storeroom/isolation.test.ts` §`ISO-3` uses for the same reason
// and with the same stated limit.
//
// WHICH CLAIMS ARE EXECUTED RATHER THAN TYPE-CHECKED — and the direction reversed with `S-10`. The retired net was a
// COMPILE-TIME one (`TS2741` on a seventh group with no table row), and a vitest row could not observe a compiler
// diagnostic, so the old rows read the table's SHAPE and said so. **`M-10` executes the claim instead**: the registry's
// declared ids and the envelope's authored nodes are compared at RUN time, by name, in both directions — the net the
// union could not give once `ToolGroup` became a `string`. No row here pretends to read a compiler.
//
// THE PAIRING THIS BATTERY READS, AND ITS DIRECTION. The pane's body issues
// `window.provident.security.set(...)`; the ROUTE half here is the real
// `createSettingsSurface` — the module `ipcMain.handle(IPC_SECURITY_SET)` calls
// (`src/main/main.ts:338`) — driven in-process. The fake in rows 3-4 stands at the IPC boundary
// ONLY, to RECORD the patch a body issued, which no other level can see (`interface.md` §7: the
// leg proves the outcome and never the patch). The store, the surface, the envelope and the pane
// are the real artifacts: no mock, no stub, no `todo`.
//
// NO MARKER: authored for this unit AFTER D-30's sweep, so it is new evidence and it gates (D-40).
// It carries NO MARKER LINE deliberately — the mark covers what existed when the rework was decided,
// and a unit that marks its own new battery has said nobody should trust it yet.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { installShim, mountEl } from '../../../src/shared/dom-shim.js'
import { PLACEHOLDER_IDS, SecurePanels } from '../../../src/renderer/secure-panels.js'
import { paneRegistry } from './foundation-registry.js'
import { createSecurityClient } from '../../../src/renderer/security-client.js'
import { createSettingsSurface, type SettingsGateSink } from '../../../src/main/settings-surface/index.js'

const REPO = new URL('../../../', import.meta.url)
const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')

/** The pane, whose roster and label table are the subject of rows 1-2 (`interface.md` §1). */
const PANE_FILE = 'src/renderer/secure-panels.ts'
/** The gate, whose `ToolGroup` union is the set the table is bound to (`src/main/security.ts:3`). */
const GATE_FILE = 'src/main/security.ts'
/** The sixth group's name is read from the instance's own seed file below — `provident-security.json`
 *  is the retired carrier the import-once path reads (`persistence.md` §4; D-19). */
const SEED_FILE = 'provident-security.json'

const PANE = sourceOf(PANE_FILE)
const GATE = sourceOf(GATE_FILE)

/** The gate's own union, read as DATA out of its declaration — the way `P-1`'s row reads the tree,
 *  and the reason no row here carries a hand-written list of the six names. The union's CENSUS is
 *  `P-1`'s claim; this battery reads it only as the name set the pane's table must be bound to. */
// **⟶ S-8 RE-GRAIN (`U2`, 2026-11-27): THE UNION IS RETIRED.** `ToolGroup` is `string` and the gate's group set is the
// declaration registry's `declaredGroups()`; the ONE source of the six ids is now `FOUNDATION_GROUPS` in
// `src/shared/types.ts` (with `TOOL_GROUP_IDS` its projection). This battery reads that source, so it follows the tree
// instead of restating it (`D-26`, `D-39`); `S-10`'s runtime set-equality row (`M-10`) is the net the retired union left.
function gateGroupsOf(source: string): string[] {
  if (/export type ToolGroup = string/.test(source)) {
    const types = sourceOf('src/shared/types.ts')
    const block = /export const FOUNDATION_GROUPS: readonly FoundationGroup\[\] = \[([\s\S]*?)\n\]/.exec(types)?.[1]
    if (block === undefined) throw new Error('src/shared/types.ts: no `FOUNDATION_GROUPS` declaration is readable')
    return [...block.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1])
  }
  const union = /export type ToolGroup =([^\n]*)/.exec(source)
  if (union === null) throw new Error(`${GATE_FILE}: no \`ToolGroup\` union is declared and no foundation set is readable`)
  return [...union[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
}

const GATE_GROUPS = gateGroupsOf(GATE)

/** **THE DEAD READS ARE RETIRED WITH THE NET THEY MEASURED** (`S-10`, `M-10`): `labelTablesOf`, `rosterExpressionOf`,
 *  `gateImportsOf`, `LANDED` and `SIXTH` read a label TABLE and the union binding it carried, and both are gone — the table
 *  by `S-10`, the binding by `S-8` (`ToolGroup` is `string`). `M-10`'s three arms above are the net that replaced them, and
 *  they read the AUTHORED graph rather than the source, which is the stronger witness. `gateGroupsOf` stays: row 4 still
 *  walks the foundation's ids, and the walk must not restate them (`D-26`, `D-39`). */

/** A `security.set` patch, as the bridge and the surface both declare it
 *  (`src/main/preload.ts:108-110`; `src/main/settings-surface/index.ts:67-68`). The pane's body
 *  issues a patch of exactly this shape, and this battery hands the captured value on VERBATIM. */
type SetPatch = { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }

/** THE FAKE STANDS AT THE IPC BOUNDARY ONLY (`interface.md` §4's route: `ipcRenderer.invoke` one
 *  side, `settingsSurface.set` the other). It records the patches a real pane body issued; it does
 *  not model the store — rows 4's second half hands the recorded patch to the REAL surface. */
function recordingBridge(initial: { token: string | null; enabled: string[] }): {
  patches: SetPatch[]
  bridge: { get: () => Promise<{ token: string | null; enabled: string[]; read: null; exclusion: 'mcp-enabled' }>; set: (patch: SetPatch) => Promise<unknown> }
} {
  const patches: SetPatch[] = []
  let cfg = { token: initial.token, enabled: [...initial.enabled] }
  return {
    patches,
    bridge: {
      get: async () => ({ token: cfg.token, enabled: [...cfg.enabled], read: null, exclusion: 'mcp-enabled' as const }),
      set: async (patch: SetPatch) => {
        patches.push(patch)
        const next = { token: cfg.token, enabled: [...cfg.enabled] }
        if (Array.isArray(patch.groups)) for (const group of patch.groups) if (!next.enabled.includes(group)) next.enabled.push(group)
        if (Array.isArray(patch.disable)) next.enabled = next.enabled.filter((group) => !patch.disable!.includes(group))
        cfg = next
        return { token: next.token, enabled: [...next.enabled], exclusion: 'mcp-enabled' as const }
      },
    },
  }
}

/** **`D-106` — THE PANE'S `cfg` IS A DELIVERY'S NOW, SO A ROW THAT WANTS A READING DRIVES THE SHAPE'S ONE BOOT
 *  FILL.** `SecurePanels.refresh()` used to re-read the security record from the bridge after every click and at the boot;
 *  that read is DELETED, so `refresh()` paints and a row can no longer obtain a carrier reading from it. This helper takes
 *  the path the app takes: the shape's ONE read (`src/renderer/security-client.ts`), and the pane's adopt step — exactly the
 *  two turns `startSecurityShape` performs at the boot and on every delivery. **THE CLAIM OF EVERY ROW BELOW IS UNCHANGED**:
 *  the row's `data-on` is still read off the CARRIER's answer, which is what makes the direction the body composes the
 *  carrier's and never the pane's prior intent. */
async function fillPane(panels: SecurePanels): Promise<void> {
  const client = createSecurityClient()
  await client.fill()
  panels.applySecurity(client.shape())
}

/** **THE ENVELOPE'S AUTHORED NODES, READ OFF THE SUPERVISOR AND NOT OFF THE ROSTER ARRAY** (`M-10`): the pane's own graph is
 *  the only witness to what was AUTHORED, so an envelope that echoed its input cannot pass by construction. The supervisor is
 *  the pane's private engine, reached the way `tests/host-guard-panes.test.ts` reaches it — the same instrument, stated. */
function authoredNodesOf(panels: SecurePanels): Array<{ content?: unknown; props?: { id?: string; content?: unknown } }> {
  return (panels as unknown as { supervisor: { allNodes(): Array<{ content?: unknown; props?: { id?: string; content?: unknown } }> } }).supervisor.allNodes()
}

/** Every authored `toggle:<id>`'s id, in the envelope's order. */
function authoredToggleIds(panels: SecurePanels): string[] {
  return authoredPropsIds(panels)
    .filter((id) => id.startsWith('toggle:'))
    .map((id) => id.slice('toggle:'.length))
}

/** Every authored `props.id`, in the envelope's order. */
function authoredPropsIds(panels: SecurePanels): string[] {
  return authoredNodesOf(panels)
    .map((node) => node.props?.id)
    .filter((id): id is string => typeof id === 'string' && id !== '')
}

/** **THE FOUR AUTHORED LIVE REGIONS, HAND-WRITTEN ON PURPOSE** (`M-10(iii)`): "this authored element is a region a delivery
 *  FILLS" is a judgement about the envelope's intent, and no node property states it. Spelling the four here is what makes
 *  the second direction a claim rather than a tautology; `PLACEHOLDER_IDS` must equal it in both directions, and each must be
 *  authored. A fifth live region is a foundation edit and this list is where its author records it. */
const LIVE_REGIONS = ['security-status', 'status', 'module-status', 'module-list']

/** Boot the real pane under the layout-less shim with the carrier answer `initial` stands for, then
 *  click one authored row by its generated id (`props.id` = `toggle:<group>`, `interface.md` §4). */
async function clickRow(group: string, initial: { token: string | null; enabled: string[] }): Promise<{ patches: SetPatch[] }> {
  installShim()
  const recorder = recordingBridge(initial)
  ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: recorder.bridge } }
  const panels = new SecurePanels(mountEl() as never, { registry: paneRegistry() })
  panels.refresh()
  await fillPane(panels)
  await panels.dispatch(`toggle:${group}`)
  return { patches: recorder.patches }
}

/** The same drive with NO bridge at all: `window.provident` absent, as on a plain page. The claim is
 *  structural — the shared body's `!s` guard returns on its first statement, so with no bridge there
 *  is no member to call and nothing is composed; what a row can take is that the drive THREW nothing
 *  and left the window as it found it. */
async function clickRowWithoutBridge(group: string): Promise<{ threw: unknown; bridgeAfter: unknown }> {
  installShim()
  ;(globalThis as unknown as { window?: unknown }).window = undefined
  const panels = new SecurePanels(mountEl() as never, { registry: paneRegistry() })
  let threw: unknown = null
  try {
    panels.refresh()
    await panels.dispatch(`toggle:${group}`)
  } catch (caught) {
    threw = caught
  }
  const bridge = (globalThis as unknown as { window?: { provident?: { security?: unknown } } }).window?.provident?.security
  return { threw, bridgeAfter: bridge }
}

/** A scratch profile for the route rows: its retired seed is written by the row that needs one. */
let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'secure-panels-roster-'))
})

afterEach(() => {
  delete (globalThis as { window?: unknown }).window
  rmSync(userDataDir, { recursive: true, force: true })
})

describe('secure-panels · the arrangement and the route a click reaches', () => {
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // `M-10` — `S-10`'s RUNTIME SET-EQUALITY, THREE ARMS (`docs/L3/secure-panels/roster-and-placeholders.md` §6). The
  // union's compile-time net died with `ToolGroup = string` (`S-8`), and these arms are its replacement: the registry's
  // declared set and the envelope's AUTHORED toggle nodes are compared AS SETS, red BY NAME in both directions, with the
  // placeholder domain read the same way. **The envelope's rows are read off the SUPERVISOR** — the authored nodes, not the
  // roster array — so an envelope that authored a row nobody declared cannot pass by echoing its own input.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  it('M-10(i) · A DECLARED GROUP WITH NO ROW REDS BY ITS ID — every id the registry declares has an authored `toggle:<id>` node', () => {
    installShim()
    const carrier = { name: 'alpha-module', capabilities: { groups: [{ id: 'alpha', label: 'alpha (fixture module)' }] } }
    const registry = paneRegistry([{ module: 'alpha-module', domain: 'group', ids: ['alpha'] }])
    const panels = new SecurePanels(mountEl() as never, { registry, carriers: [carrier] })
    const declared = registry.declaredGroups()
    expect(declared, 'the set the row compares against is the registry\'s own, not a list this row wrote').toContain('alpha')
    const authored = authoredToggleIds(panels)
    const missing = declared.filter((id) => !authored.includes(id))
    expect(missing, 'a declared group with no authored row reds BY NAME — the envelope is not a list beside the set, it is the set\'s projection').toEqual([])
    expect(authored, 'and the module row is labelled by its DECLARER (`C-9`): the carrier\'s text, never the foundation\'s pair').toContain('alpha')
    const row = authoredNodesOf(panels).find((node) => node.props?.id === 'toggle:alpha')
    const label = row?.content ?? row?.props?.content
    expect(label, 'the label it paints is the declaring carrier\'s `capabilities.groups[].label`').toBe('alpha (fixture module)')
  })

  it('M-10(ii) · A ROW WITH NO GROUP REDS BY ITS ID — every authored `toggle:<id>` names an id the registry declares', () => {
    installShim()
    const registry = paneRegistry()
    const panels = new SecurePanels(mountEl() as never, { registry })
    const declared = registry.declaredGroups()
    const undeclared = authoredToggleIds(panels).filter((id) => !declared.includes(id))
    expect(undeclared, 'an authored row whose id no registry declares reds BY NAME — the direction that catches a hand-written row').toEqual([])
    // AND THE ABSENT REGISTRY AUTHORS NOTHING, which is what makes arm (ii) non-vacuous: a pane handed no set has no row,
    // because a roster is a READING (`D-129`) and this constructor invents no default (`ASM-SP-1`).
    const bare = new SecurePanels(mountEl() as never)
    expect(authoredToggleIds(bare), 'no registry, no row: the pane says nothing about a set it was not handed').toEqual([])
  })

  it('M-10(iii) · THE PLACEHOLDER SET IS TOTAL, BOTH DIRECTIONS — every pinned id is authored and every authored live region is pinned', () => {
    installShim()
    const registry = paneRegistry()
    const panels = new SecurePanels(mountEl() as never, { registry })
    const authored = authoredPropsIds(panels)
    const missing = PLACEHOLDER_IDS.filter((id) => !authored.includes(id))
    expect(missing, 'every id the fifth domain pins is authored by the envelope — the set is closed HERE because the envelope authors it').toEqual([])
    const stray = LIVE_REGIONS.filter((id) => authored.includes(id) && !PLACEHOLDER_IDS.includes(id))
    expect(stray, 'and every authored live region is in the set: an authored region outside it is a fill target nobody pinned').toEqual([])
    expect(registry.declaredPlaceholders(), 'the registry\'s placeholder domain IS the set — the pane hands it as its foundation contribution').toEqual([...PLACEHOLDER_IDS])
  })



  it('a click composes ONE patch naming ONE name in ONE direction, taken off the row’s own props — and a click with no bridge composes nothing at all (behaviour.md §3 steps 1-2)', async () => {
    // THE CONTROL comes first: a LANDED row, so a red below cannot be this instrument's failure.
    const off = await clickRow('code', { token: null, enabled: ['read', 'dispatch'] })
    expect(off.patches.length, 'one gesture is one call: no second channel member, no second store verb and no `RpcMethod` member anywhere in the chain (behaviour.md §3, D-18)').toBe(1)
    expect(Object.keys(off.patches[0]!).sort(), 'the body chose the GRANT direction because the row authored `data-on: "false"`').toEqual(['groups'])
    expect(off.patches[0]!.groups, 'and it names exactly one group — the row’s own `data-group`, never a set').toEqual(['code'])

    const on = await clickRow('code', { token: null, enabled: ['read', 'dispatch', 'code'] })
    expect(on.patches, 'the same click on an ON row flips the other way: the direction is read off the row’s `data-on`, never off the pane’s prior intent (the `D-vi` shape)').toEqual([{ disable: ['code'] }])

    const silent = await clickRowWithoutBridge('code')
    expect(silent.threw, 'a click with no bridge returns silently: the shared body’s `!s` guard is its first statement, so a plain page throws nothing (behaviour.md §3)').toBeNull()
    expect(silent.bridgeAfter, 'and no bridge was conjured by the attempt: the guard writes nothing, so nothing stands where nothing stood').toBeUndefined()
  })

  it('every gate group has its own toggle row, and the sixth row’s click composes the grant the live route accepts and the read answer reflects (interface.md §4-§5; behaviour.md §1, §3)', async () => {
    // ONE ROW PER GATE GROUP, resolved through the generated id scheme (`props.id` `toggle:<group>`;
    // §4: "no handler name, node id scheme or class is authored twice"). A group the pane has no row
    // for is the FAILURE here — that is L1 §8 `F-3` itself.
    for (const group of GATE_GROUPS) {
      // THE CARRIER ANSWER IS BUILT SO THIS ROW IS OFF: every group but this one is granted, so the
      // row's `data-on` is authored `false` and stays `false` through the first refresh. A row that
      // is ON would issue the revoke, and the claim here is the row's EXISTENCE and its group name.
      const drive = await clickRow(group, { token: null, enabled: GATE_GROUPS.filter((other) => other !== group) })
      expect(drive.patches, `the pane graph resolves a toggle row for the gate group \`${group}\`, and clicking it issues that one group: a gate group with no pane row is the copy this unit removes`).toEqual([{ groups: [group] }])
    }

    // THE ROUTE HALF, with the SAME patch the body issued, handed VERBATIM to the module
    // `ipcMain.handle(IPC_SECURITY_SET)` calls (`src/main/main.ts:338`) — not a re-typed copy.
    writeFileSync(join(userDataDir, SEED_FILE), JSON.stringify({ enabled: ['read', 'dispatch', 'graph', 'code'] }))
    const surface = createSettingsSurface({ userDataDir })
    const before = surface.read()
    expect(before.enabled, 'the seed the sixth row must gain beside, served through the import-once path (persistence.md §4)').toEqual(['read', 'dispatch', 'graph', 'code'])

    const grant = await clickRow('data', { token: null, enabled: before.enabled })
    expect(grant.patches, 'the sixth row’s click composes the grant patch the one shared body issues for any off row').toEqual([{ groups: ['data'] }])
    const granted = surface.set(grant.patches[0]!)
    expect(granted.write.status, 'the route accepts the click’s own patch: `security.set` is the manual-UI channel, never an `RpcMethod` member (interface.md §4, D-18)').toBe('committed')
    expect(granted.enabled, 'and the read answer GAINS the group — `enabled` names `data` after the click (behaviour.md §1; D-17)').toEqual([...before.enabled, 'data'])

    const revoke = await clickRow('data', { token: null, enabled: granted.enabled })
    expect(revoke.patches, 'clicked again the row is ON, so the same body composes the revoke').toEqual([{ disable: ['data'] }])
    expect(surface.set(revoke.patches[0]!).enabled, 'and the read answer loses it: one body serves both directions, so the sixth row needed no handler of its own (§5)').toEqual([...before.enabled])
  })

  it('the click’s write re-patches the gate INSIDE the call, so the gate holds the grant before the answer is minted (behaviour.md §3 step 4, D-17)', () => {
    const surface = createSettingsSurface({ userDataDir })
    const sequence: string[] = []
    const patches: SetPatch[] = []
    const sink: SettingsGateSink = {
      applyGatePatch: (patch) => {
        sequence.push('patch')
        patches.push(patch)
        return undefined
      },
      applyExclusion: (state) => {
        sequence.push(`exclusion:${state}`)
        return undefined
      },
      gate: { exclusionState: () => 'mcp-enabled' },
    }
    surface.attach(sink)
    // **THE PREFIX IS THE CREATION'S, AND THE BOOT TERMINAL IS THE SAME TWO CALLS BEHIND IT** (`D-221`; `docs/L3/operator-
    // settings/delivery.md` §4): `attach` subscribes first, so the creation's four HELD addresses are delivered inside that
    // `subscribe` — the record and the pane through the patch arm, the pair through the exclusion arm, and the app-state rows
    // through the surface's OTHER body, which this sink never sees. **So the boot terminal is still one patch and one
    // exclusion and there is still no third ACT**; what stands in front of it is the creation's own event, one `deliver` per
    // address, which is the row's new grain and not a second boot.
    expect(sequence, 'attach is the boot terminal behind the creation’s three draining deliveries: the drain’s patch, exclusion and patch, then attach’s own patch and exclusion, and no fourth call').toEqual(['patch', 'exclusion:mcp-enabled', 'patch', 'patch', 'exclusion:mcp-enabled'])

    sequence.length = 0
    patches.length = 0
    const granted = surface.set({ groups: ['data'] })
    sequence.push('returned')
    expect(sequence, 'the delivery lands INSIDE the write — the subscription’s re-patch runs before the handler answers, so no reader can see the record moved and the gate not (D-17)').toEqual(['patch', 'returned'])
    expect(patches[0], 'and the patch carries the granted group, so the gate the next `tools/list` reads already holds it (`P-4` reads that ANSWER; this row reads the patch nobody else sees)').toMatchObject({ groups: expect.arrayContaining(['data']) })
    expect(granted.enabled, 'the answer was minted after that delivery, so it names the grant the gate was just handed').toContain('data')

    sequence.length = 0
    surface.set({ disable: ['data'] })
    expect(patches.slice(-1)[0], 'a revoke’s patch names the REMOVAL set, because the gate removes only what `disable` names: a group the record dropped cannot stay enabled on it').toMatchObject({ disable: ['data'] })
  })
})
