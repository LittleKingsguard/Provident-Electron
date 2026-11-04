// tests/integration/secure-panels/roster.test.ts — THE L2 BATTERY for `secure-panels`, part 1:
// THE ARRANGEMENT, AND THE ROUTE A CLICK REACHES.
//
// THE CONTRACT: docs/L2/secure-panels/interface.md §1-§5 and §7, and behaviour.md §1 and §3. §1 is
// the decision this unit exists for — the pane's group roster stops being a second hand-written list
// and becomes a PROJECTION of ONE label table typed exhaustively against the gate's `ToolGroup`. §2
// is why that arm won. §4 is the surface the arrangement does not change: one `label` node per
// group, its two attributes, one generated handler, and the route a click's body reaches. §5 is
// exactly what is added for the sixth group — one table entry, no second list, no MCP tool, no
// route, no class. behaviour.md §3 is what one click does, in order; part 2 of this battery is the
// bytes, in `persistence.test.ts` beside this file.
//
// EACH ROW IS ONE CLAIM, and each names the document it reads. Rows 1-2 read the pane's SOURCE;
// rows 3-5 DRIVE the pane and the route module. Nothing here is inferred from prose alone.
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
// WHICH CLAIMS ARE TYPE-CHECKED RATHER THAN EXECUTED — stated here because it is the claim most
// easily faked. The net interface.md §1 relies on is that a `ToolGroup` member with no label-table
// entry reddens `npm run typecheck` (`interface.md` §3 `S-1`: `TS2741`), and that is a COMPILE-TIME
// claim: a vitest row cannot observe a compiler diagnostic, and no row here pretends to — none
// compares the table's key set against the union and calls the difference a failure. That would be
// a second, weaker net wearing the typecheck's name, and `interface.md` §7 already declines it
// ("no, and it is the wrong home anyway"). What IS executed is the SHAPE that net rests on (row 1)
// and the ORDER the projection paints (row 2). Row 1's annotation check states the BINDING; the
// net's own reading is `npm run typecheck`'s, and no row here claims to have taken it.
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
import { SecurePanels } from '../../../src/renderer/secure-panels.js'
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
function gateGroupsOf(source: string): string[] {
  const union = /export type ToolGroup =([^\n]*)/.exec(source)
  if (union === null) throw new Error(`${GATE_FILE}: no \`ToolGroup\` union is declared`)
  return [...union[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
}

const GATE_GROUPS = gateGroupsOf(GATE)

/** THE FIVE LANDED ROWS, in their landed order (L1 §5; `src/renderer/secure-panels.ts:72` at this
 *  head). A hand-written list ON PURPOSE: this is the expected data of the order claim, and a list
 *  derived from the pane would make the row vacuous — the same reason `isolation.test.ts` spells
 *  `RPC_METHODS` out while reading the union beside it. */
const LANDED = ['read', 'dispatch', 'graph', 'code', 'module']

/** THE ORDER ROW'S EXPECTED SIXTH: whatever member the gate declares that the five landed rows do
 *  not carry — computed, so this battery follows the union instead of restating it (D-26, D-39). */
const SIXTH = GATE_GROUPS.filter((group) => !LANDED.includes(group))

/** One `label`-table declaration of the pane: the annotation it carries and the keys it authors, in
 *  authored order. The table is found BY SHAPE rather than by its identifier, because the spelling
 *  of §1's annotation is L3's (`interface.md` §8 `R-3`) and a row must not pin it. */
interface LabelTable {
  name: string
  annotation: string
  keys: string[]
}

function labelTablesOf(source: string): LabelTable[] {
  const tables: LabelTable[] = []
  for (const declaration of source.matchAll(/^const (\w+)\b([^=\n]*)=\s*\{/gm)) {
    const open = declaration.index + declaration[0].length
    const close = source.indexOf('\n}', open)
    if (close === -1) continue
    const body = source.slice(open, close)
    const keys = [...body.matchAll(/^\s{2}(\w+):\s*'/gm)].map((match) => match[1]).filter((key) => GATE_GROUPS.includes(key))
    if (keys.length <= 1) continue
    // THE BINDING MAY BE AN ANNOTATION ON THE DECLARATION (`: Record<ToolGroup, string>`) OR A
    // `satisfies` CLAUSE AFTER IT. Both are "typed against the union" — interface.md §1 states the
    // binding, and which of the two spells it is L3's (`interface.md` §8 `R-3`) — so this reader
    // takes either instead of pinning a spelling the design did not fix.
    const lineEnd = source.indexOf('\n', close + 1)
    const after = source.slice(close, lineEnd === -1 ? source.length : lineEnd)
    const satisfies = /satisfies\s+([^\n]+)/.exec(after)?.[1] ?? ''
    tables.push({ name: declaration[1], annotation: `${declaration[2].trim()} ${satisfies.trim()}`.trim(), keys })
  }
  return tables
}

/** The expression `paneEnvelope()` iterates to author one row per group — the roster, as the pane
 *  itself computes it. Read without pinning a spelling: an inline call is returned as written, and
 *  a bare identifier is resolved to its own initializer. A name with no initializer in this file
 *  (an import, a parameter) is returned as the name. */
function rosterExpressionOf(source: string): string {
  const envelope = /function paneEnvelope\(\): LegacyInitialData \{([\s\S]*?)\n\}/.exec(source)
  if (envelope === null) throw new Error(`${PANE_FILE}: no \`paneEnvelope()\` is declared, so the roster has no authored expression this row can read`)
  const receiver = /([A-Za-z_$][\w$.]*(?:\([^()]*\))?)\.map\s*\(/.exec(envelope[1])
  if (receiver === null) {
    // No `.map(`: the envelope must still author its rows FROM the table it holds. This row reads
    // what it can see and says so rather than passing on a shape it did not find.
    const table = labelTablesOf(source)[0]
    if (table !== undefined && envelope[1].includes(table.name)) return table.name
    throw new Error(`${PANE_FILE}: \`paneEnvelope()\` authors no row set this row can read — neither a \`.map(\` receiver nor a reference to the label table`)
  }
  const expression = receiver[1]
  if (expression.includes('(')) return expression
  const initializer = new RegExp(`const ${expression}\\b[^=\\n]*=\\s*([^\\n]*)`).exec(source)
  return initializer === null ? expression : initializer[1]
}

/** Every import of the gate module and whether it is TYPE-ONLY (`import type`), so `ASM-L2-2`'s
 *  claim — the binding costs no runtime edge and no bundle byte (`interface.md` §3 `S-4`) — is read
 *  from the import list rather than assumed. */
function gateImportsOf(source: string): Array<{ specifier: string; names: string[]; typeOnly: boolean }> {
  const imports: Array<{ specifier: string; names: string[]; typeOnly: boolean }> = []
  for (const found of source.matchAll(/^import\s+(type\s+)?(?:\{([^}]*)\}|\*\s+as\s+\w+|\w+)\s+from\s+'([^']*security[^']*)'/gm)) {
    const names = (found[2] ?? '').split(',').map((name) => name.trim().split(/\s+as\s+/)[0]).filter((name) => name !== '')
    imports.push({ specifier: found[3], names, typeOnly: found[1] !== undefined })
  }
  return imports
}

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

/** Boot the real pane under the layout-less shim with the carrier answer `initial` stands for, then
 *  click one authored row by its generated id (`props.id` = `toggle:<group>`, `interface.md` §4). */
async function clickRow(group: string, initial: { token: string | null; enabled: string[] }): Promise<{ patches: SetPatch[] }> {
  installShim()
  const recorder = recordingBridge(initial)
  ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: recorder.bridge } }
  const panels = new SecurePanels(mountEl() as never)
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
  const panels = new SecurePanels(mountEl() as never)
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
  it('the roster has ONE author: a label table bound to the gate’s `ToolGroup` by a type-only import, with the roster computed from its keys (interface.md §1, §2 (b); ASM-L2-2)', () => {
    const tables = labelTablesOf(PANE)
    expect(tables.length, 'exactly one declaration in the pane maps a group name to a label — a second table would be the copy this unit removes').toBe(1)
    const table = tables[0]!
    expect(table.keys.length, 'and it is the group table, not an incidental object: its keys are gate group names').toBeGreaterThan(1)
    // THE BINDING, NOT THE NET. The annotation is the shape the compile-time net rests on
    // (`Record<ToolGroup, string>`, `interface.md` §1); whether the table is EXHAUSTIVE is
    // `npm run typecheck`'s reading (`S-1`), which this row cannot take and does not fake.
    expect(table.annotation, 'the table is annotated against the gate’s union, so a member it does not spell is `TS2741` at `npm run typecheck` — the annotation, not this row, is that net (interface.md §3 S-1)').toContain('ToolGroup')
    const gateImports = gateImportsOf(PANE)
    const binding = gateImports.find((entry) => entry.typeOnly && entry.names.includes('ToolGroup'))
    expect(binding, '`ToolGroup` reaches the pane by a TYPE-ONLY import of the gate module — the same idiom the pane already uses for `ExclusionState` (ASM-L2-2, S-4)').toBeDefined()
    expect(gateImports.filter((entry) => !entry.typeOnly).map((entry) => entry.specifier), 'and the gate module is imported for no value: a value import would put a main module in the renderer bundle (ASM-L2-2, S-4)').toEqual([])
    const roster = rosterExpressionOf(PANE)
    expect(roster.trimStart().startsWith('['), 'the roster is COMPUTED, never authored: a hand-written group array beside the table is the third copy L1 §8 `F-3` files').toBe(false)
    expect(roster, 'and it is computed FROM the table, so the table’s keys are the roster’s only author (interface.md §1: "the table’s own key set in the table’s own authoring order — never a second literal beside it")').toContain(table.name)
  })

  it('the projection’s ORDER keeps the five landed rows where they stand and lands the gate’s sixth LAST — order, never a count (interface.md §1-§2, S-3)', () => {
    const tables = labelTablesOf(PANE)
    if (tables.length === 0) throw new Error(`${PANE_FILE}: no group→label table is declared, so the projection has no order this row can read`)
    const keys = tables[0]!.keys
    // `Object.keys` over a non-numeric-keyed literal answers INSERTION order (S-3), so the table's
    // authored order IS the order the roster paints. That mechanism is why this row reads authored
    // order; the five rendered rows' preservation against the landed paint is `P-7`'s row, and the
    // COUNT of the set is nobody's (`behaviour.md` §1: "the set difference is the claim, never a
    // count").
    expect(keys, 'the five landed rows keep their relative order and the union’s sixth is appended after them').toEqual([...LANDED, ...SIXTH])
    expect(keys.slice(-1), 'so the sixth is last, and no landed row moved to make room for it').toEqual(SIXTH)
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
    expect(sequence, 'attach is the boot terminal: one patch and one exclusion, and no third call (the surface’s own `ASM-3`)').toEqual(['patch', 'exclusion:mcp-enabled'])

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
