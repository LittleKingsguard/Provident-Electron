// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/security-store-storeroom/surface.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 2: THE OPERATOR-SETTINGS SURFACE MODULE.
//
// THE CONTRACT: docs/L2/security-store-storeroom/interface.md §5 and §5.1, and behaviour.md §10 —
// the carrier's read and its `read` condition, the three manual-UI channels, `attach` as the only
// gate edge, the composition site, and the declared-surface census. The subject is the real
// `createSettingsSurface`, and the gate it is attached to is the real `ProvidentMcpServer`: no
// mock, no stub of either, and every assertion is an observable answer or an observable gate
// state, never an internal call (examiner.md §2).
//
// REV 2 — THE FOUR RE-GRAINS the L2 examiner's FAIL binds this file to:
//   · row #5 asserted a `write` member on the TRANSITION answer. `src/main/preload.ts:64` declares
//     `setExclusion` as `{applied, state, reason?: 'malformed-state'}` and declares the receipt
//     member `write` on `set` alone (`:63`), so the interface now declares no receipt there
//     (`interface.md` §5.1, `ASM-L2-4`) and the row asserts only `applied`/`state` plus the
//     readers that do carry the outcome. The refusal therefore rides the record and the `set`
//     channel, which the new row below drives.
//   · row #9 demanded `Object.keys(surface)`'s own-enumerable layout, which a class-instance
//     product lawful under `interface.md` §5 fails — one implementation style could pass it. It
//     is re-grained to the DECLARED surface: the four verbs are callable, and the module entry's
//     run-time export census is the one value name §5 declares.
//   · rows #1 and #5 now cite the condition §5 declares for the carrier's `read` member.
//   · row #8 now cites the composition site §5 names (`ASM-L2-8`).
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate } from '../../../src/main/security.js'
import * as settingsSurfaceModule from '../../../src/main/settings-surface'
import { createSettingsSurface, type SettingsSurface } from '../../../src/main/settings-surface'

const OPERATOR_FILE = 'provident-operator-settings.json'
const SRC_DIR = fileURLToPath(new URL('../../../src', import.meta.url))

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-surface-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const backend: McpBackend = { invoke: async () => ({}) }

/** The live gate the composition site supplies: the real server, never a recorder standing in
 *  for it — `src/main/main.ts:288` constructs exactly this, and `attach` is given the server. */
function liveServer(): ProvidentMcpServer {
  const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
  return new ProvidentMcpServer({ backend, gate, transport: 'stdio' })
}

interface Composed {
  surface: SettingsSurface
  server: ProvidentMcpServer
}

function composed(): Composed {
  const server = liveServer()
  const surface = createSettingsSurface({ userDataDir })
  surface.attach(server)
  return { surface, server }
}

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const at = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(at))
    else if (entry.name.endsWith('.ts')) out.push(at)
  }
  return out
}

describe('security-store-storeroom · the surface module, its channels and the live gate', () => {
  it('the carrier’s read answers the landed superset on a first boot, with `read` null because the read was performed with MCP enabled (interface.md §5, src/main/main.ts:427-443)', () => {
    const { surface } = composed()
    const answer = surface.read()
    expect({ token: answer.token, enabled: answer.enabled }, 'the record members are the landed SecuritySettings ones').toEqual({ token: null, enabled: ['read', 'dispatch'] })
    expect(answer.maxJournalLength).toBeUndefined()
    expect(answer.read, '`read` is null iff the answer was minted while exclusion is mcp-enabled').toBeNull()
    expect(answer.exclusion).toBe('mcp-enabled')
  })

  it('attach is the only gate edge: it re-patches the gate from the record and lands the boot terminal (L1 §4)', () => {
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    expect(server.getGateConfig().enabled, 'before `attach` the gate is untouched').toEqual(['read', 'dispatch'])
    surface.attach(server)
    expect([...server.getGateConfig().enabled].sort(), 'after it the gate carries the record’s grant set').toEqual(['dispatch', 'read'])
    expect(server.exclusionSnapshot(), 'and the boot terminal is `mcp-enabled`, so the gate refuses nothing').toBeNull()
    expect(surface.read().exclusion, 'one fact, two readers').toBe('mcp-enabled')
  })

  it('a settings write commits, and the live gate is re-patched inside the change path before the answer is minted (D-17)', () => {
    const { surface, server } = composed()
    const answer = surface.set({ groups: ['graph', 'data'] })
    expect(answer.write.status, 'the SET answer carries the receipt of THIS write as a value — the member preload.ts:63 declares on `set` alone').toBe('committed')
    expect(answer.exclusion).toBe('mcp-enabled')
    expect([...answer.enabled].sort(), 'the answer is the post-state record').toEqual(['data', 'dispatch', 'graph', 'read'])
    expect([...server.getGateConfig().enabled].sort(), 'and the live gate already agrees when the answer is minted').toEqual(['data', 'dispatch', 'graph', 'read'])
    expect(readdirSync(userDataDir), 'the write landed in the instance’s own file and nowhere else').toEqual([OPERATOR_FILE])
  })

  it('a refused write leaves the live gate unpatched: the re-patch is the subscription’s, not the call site’s (interface.md §5)', () => {
    const { surface, server } = composed()
    const before = [...server.getGateConfig().enabled].sort()
    // THE REFUSING MEMBER IS `+Infinity` — NOT `NaN`, AND NOT `-Infinity`: interface.md §2 carries
    // the landed clear/refuse split in the tree's own guard ORDER, where `NaN` and any cap `<= 0`
    // CLEAR the cap and commit, and `-Infinity` is `<= 0`, so it takes that same clear arm; only a
    // value that survives those guards and then fails `Number.isFinite` — `+Infinity`, the one
    // infinity left — refuses the patch (the `write` body's cap arm in
    // `src/main/operator-settings/index.ts`; behaviour.md §2). A `NaN` here would assert a refusal
    // the document does not declare — the over-fit this row was corrected for — and a `-Infinity`
    // would assert the opposite of what it declares.
    const answer = surface.set({ maxJournalLength: Number.POSITIVE_INFINITY })
    if (answer.write.status !== 'refused') throw new Error(`the row needs the refused arm to read its reason word; it answered ${JSON.stringify(answer.write)}`)
    expect(answer.write.reason, 'a non-finite cap refuses the patch before any store verb (guide §10.2; interface.md §2)').toBe('ValueRefusedAtBoundary')
    expect([...server.getGateConfig().enabled].sort(), 'no commit, no delivery, so no re-patch').toEqual(before)
    expect(surface.read().maxJournalLength, 'and the cap stands where it stood').toBeUndefined()
  })

  it('the transition channel answers `applied` and `state` and NO receipt member, because the bridge declares none on that route (interface.md §5.1, ASM-L2-4)', () => {
    const { surface, server } = composed()
    const answer = surface.transition('mcp-disabled')
    expect(answer.applied, 'the transition applied').toBe(true)
    expect(answer.state).toBe('mcp-disabled')
    expect('write' in answer, 'the transition answer carries no receipt: `src/main/preload.ts:64` declares `{applied, state, reason?}` and `write` rides `set` alone').toBe(false)
    expect(server.exclusionSnapshot(), 'the live gate now refuses at the invocation turn').not.toBeNull()
    const carrier = surface.read()
    expect(carrier.exclusion, 'the carrier and the gate are one reading, never two states').toBe('mcp-disabled')
    expect(carrier.read?.reason, 'and the read member carries the closed tier-4 token, which is a READ token and not a write outcome (D-16)').toBe('tier4-closed')
    // THE REFUSAL'S OWN CHANNEL, so the receipt is observable somewhere and not nowhere: the
    // `set` route still carries one, and it commits while the pair stands open (D-16).
    const receipt = surface.set({ token: 'after-transition' }).write
    expect(receipt.status, 'the receipt of a write made while the pair stands open rides the `set` channel').toBe('committed')
  })

  it('a malformed transition is refused as a value: `malformed-state`, never a throw, and the gate is unmoved', () => {
    const { surface, server } = composed()
    const answer = surface.transition('nonsense')
    if (answer.applied !== false) throw new Error(`the row needs the unapplied arm; it answered ${JSON.stringify(answer)}`)
    expect(answer.reason).toBe('malformed-state')
    expect(answer.state).toBe('mcp-enabled')
    expect(server.exclusionSnapshot(), 'a malformed request is not a transition').toBeNull()
  })

  it('a store that cannot stand refuses both channels as values and throws nothing: `FilePathUnreachable` on the write, `applied:false` with no reason on the transition (interface.md §2.1, §5.1)', () => {
    // THE DIRECTORY OCCUPIES THE INSTANCE'S OWN NAME, so construction cannot stand (guide §8.2: a
    // path that is a directory answers `FilePathUnreachable` with nothing created).
    mkdirSync(join(userDataDir, OPERATOR_FILE))
    const surface = createSettingsSurface({ userDataDir })
    expect(surface.read().token, 'no instance stands, so the carrier serves the first-run default').toBeNull()

    const written = surface.set({ token: 'never' })
    if (written.write.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(written.write)}`)
    expect(written.write.reason, 'the construction refused, so each later write answers it (guide §8.2)').toBe('FilePathUnreachable')

    const transition = surface.transition('mcp-disabled')
    expect(transition.applied, 'the transition cannot apply with no record to commit to').toBe(false)
    expect(transition.state, 'and the state it reports is the unmoved one').toBe('mcp-enabled')
    expect('reason' in transition, 'no `reason` rides it: `malformed-state` is the input arm’s word, and this input was well-formed (interface.md §5.1)').toBe(false)
  })

  it('a settings write is admitted while the pair stands open: the store’s own gate consult is gone (D-16)', () => {
    const { surface } = composed()
    surface.transition('mcp-disabled')
    const answer = surface.set({ token: 'q' })
    expect(answer.write.status, 'the tier-4 refusal does not survive as a write outcome; the hazard it answered is closed by D-18').toBe('committed')
    expect(answer.token).toBe('q')
    expect(answer.exclusion, 'and the pair is unmoved by the settings write').toBe('mcp-disabled')
  })

  it('exactly one construction of the surface exists outside the module, and it is the composition site’s (D-18, interface.md §5 ASM-L2-8)', () => {
    const moduleDir = join(SRC_DIR, 'main', 'settings-surface') + '/'
    const owners = walk(SRC_DIR)
      .filter((file) => !file.startsWith(moduleDir))
      .filter((file) => readFileSync(file, 'utf8').includes('createSettingsSurface('))
    expect(owners.map((file) => file.slice(SRC_DIR.length + 1)).sort(), 'one operator-only reference, held by the composition site and nowhere else').toEqual(['main/main.ts'])
  })

  it('the declared surface is the four verbs and the one factory value — asserted without pinning a layout (interface.md §5)', () => {
    const { surface } = composed()
    for (const verb of ['read', 'set', 'transition', 'attach'] as const) {
      expect(typeof surface[verb], `the product answers the declared verb \`${verb}\` as a callable`).toBe('function')
    }
    // THE MODULE ENTRY'S RUN-TIME EXPORT CENSUS, which is the declared surface and not a layout: a
    // class-instance product, a closure product and a frozen record all pass this, and §5's
    // `N = 15` counts the factory as the one value name the entry mints.
    expect(Object.keys(settingsSurfaceModule).sort(), 'the entry exports the factory and no other value; every type §5 declares erases at build').toEqual(['createSettingsSurface'])
  })
})
