// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/settings-surface/surface.test.ts — THE L3 UNIT BATTERY for the `settings-surface`
// module (`src/main/settings-surface/index.ts`), driven through the surface
// `docs/L3/security-store-storeroom/signatures.md` §3 declares and nothing else.
//
// THE CONTRACT is `docs/L3/security-store-storeroom/design-settings-surface.md` §2-§7, read on
// `docs/L2/security-store-storeroom/interface.md` §5/§5.1 and `behaviour.md` §10. The grain is the
// unit's own and not the L2 battery's restatement (`tests/integration/security-store-storeroom/
// surface.test.ts`): the re-patch's **removal set** (design §6 ASM-5), the **delivery count** on
// the declared sink (design §6), the transition's **totality** over outside values and the gate's
// epoch (design §4, §6), and the store that cannot stand with a sink already attached (interface.md
// §2.1, §5.1). THE HOLDER ROW IS GONE (`D-117`): `src/main/tier4-state.ts` is deleted and its row's
// only subject went with it, so the writer census that row carried is measured at `FS-T4-12`.
//
// THE GATE IS THE REAL `ProvidentMcpServer` (D-17, D-18): the one sink helper below is the
// **structural seam** `signatures.md` §3 declares, and every row that asserts gate state points it
// at a live server, so no gate behaviour is stubbed (examiner.md §2). Red today is the expected
// state: `src/main/settings-surface/` does not exist at this head (examiner.md §3, D-1 §4).
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { createSettingsSurface } from '../../../src/main/settings-surface'

const FILE = 'provident-operator-settings.json' // persistence.md §1: the instance's one written name

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'settings-surface-unit-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const backend: McpBackend = { invoke: async () => ({}) }

/** THE LIVE GATE: `src/main/main.ts` hands `attach` exactly this object, so no row supplies a gate
 *  of its own (interface.md §5; D-17, D-18). */
function liveServer(): ProvidentMcpServer {
  return new ProvidentMcpServer({ backend, transport: 'stdio' })
}

interface Delivered { kind: 'patch' | 'exclusion'; value: unknown }

/** The recorder's own shape, stated with the live server's argument types so the seam carries no
 *  cast and no stub: it is assignable to `SettingsGateSink` as `signatures.md` §3 declares it. */
interface RecordingSink {
  calls: Delivered[]
  applyGatePatch(patch: Parameters<ProvidentMcpServer['applyGatePatch']>[0]): unknown
  applyExclusion(state: 'mcp-enabled' | 'mcp-disabled'): unknown
  readonly gate: ProvidentMcpServer['gate'] | { exclusionState(): 'mcp-enabled' }
}

/** THE DECLARED STRUCTURAL SINK (`signatures.md` §3): it records every delivery, and delegates to
 *  a live server where one is supplied — so a row can count the surface's deliveries, and a row
 *  can attach a sink that touches no gate, without a stub standing in for either
 *  (design-settings-surface.md §5, §6). */
function recordingSink(server?: ProvidentMcpServer): RecordingSink {
  const calls: Delivered[] = []
  return {
    calls,
    applyGatePatch(patch) {
      calls.push({ kind: 'patch', value: { ...patch } })
      return server?.applyGatePatch(patch)
    },
    applyExclusion(state) {
      calls.push({ kind: 'exclusion', value: state })
      return server?.applyExclusion(state)
    },
    get gate() {
      return server?.gate ?? { exclusionState: () => 'mcp-enabled' as const }
    },
  }
}

describe('security-store-storeroom · the settings surface at unit grain', () => {
  it('the carrier is the landed superset, and `read` is null iff the answer was minted while the pair stands at mcp-enabled (interface.md §5; design-settings-surface.md §2)', () => {
    const surface = createSettingsSurface({ userDataDir })
    const first = surface.read()
    expect({ token: first.token, enabled: first.enabled }, 'the record members are the landed SecuritySettings ones').toEqual({ token: null, enabled: ['read', 'dispatch'] })
    expect(first.maxJournalLength, 'no cap on a first boot').toBeUndefined()
    expect(first.read, '`read` is null while the pair stands at mcp-enabled').toBeNull()
    expect(first.exclusion).toBe('mcp-enabled')
    expect('entries' in first, '`entries` is not on the carrier: SecuritySettings stays byte-identical (design §2)').toBe(false)
    expect('write' in first, 'and neither is the receipt member, which is `set`\'s alone (design §2)').toBe(false)

    surface.set({ maxJournalLength: 12 })
    expect(surface.read().maxJournalLength, 'the optional carrier member appears once a cap stands').toBe(12)

    surface.transition('mcp-disabled')
    const open = surface.read()
    expect(open.read, 'the closed tier-4 value rides the answer while the pair is open (D-16)').toEqual({ status: 'refused', reason: 'tier4-closed', message: expect.any(String) })
    expect({ token: open.token, enabled: open.enabled, exclusion: open.exclusion }, 'and the record is still served beside it').toEqual({ token: null, enabled: ['read', 'dispatch'], exclusion: 'mcp-disabled' })

    surface.transition('mcp-enabled')
    expect(surface.read().read, 'the condition is an iff: reopening the pair clears the read token again').toBeNull()
  })

  it('attach is the only gate edge: a surface that is not attached patches no gate, and attaching one lands the record and the boot terminal (interface.md §5; L1 §4)', () => {
    const bystander = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    const answer = surface.set({ groups: ['graph', 'data'] })
    expect(answer.write.status).toBe('committed')
    expect([...bystander.getGateConfig().enabled].sort(), 'no call site re-patches: the gate stands untouched until `attach` (design §5)').toEqual(['dispatch', 'read'])

    surface.attach(bystander)
    expect([...bystander.getGateConfig().enabled].sort(), 'attach re-patches the record it finds').toEqual(['data', 'dispatch', 'graph', 'read'])
    expect(bystander.gate.exclusionState(), 'and lands the boot terminal').toBe('mcp-enabled')
    expect(bystander.exclusionSnapshot(), 'so the gate refuses nothing before any transition').toBeNull()
  })

  it('the listener\'s re-patch carries the removal set: the answer merges the record\'s order then the caller\'s, and a revoked group leaves the live gate (design §3, §6 ASM-5)', () => {
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(server)

    const widened = surface.set({ groups: ['data', 'read', 'graph'] })
    expect(widened.enabled, 'held groups first, then each new name in the caller\'s own order, deduplicated').toEqual(['read', 'dispatch', 'data', 'graph'])
    expect([...server.getGateConfig().enabled].sort(), 'and the gate already agrees when the answer is minted').toEqual(['data', 'dispatch', 'graph', 'read'])

    const revoked = surface.set({ disable: ['graph'] })
    expect(revoked.enabled, 'a disable removes the name from the record').toEqual(['read', 'dispatch', 'data'])
    expect([...server.getGateConfig().enabled].sort(), 'and the removal reaches the gate: the disable set is the surface\'s own last-applied list (design §6)').toEqual(['data', 'dispatch', 'read'])
  })

  it('the sink is the change path: one delivery per commit carrying the post-state, and a refused write delivers nothing (design §3, §6; D-17)', () => {
    const server = liveServer()
    const sink = recordingSink(server)
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(sink)
    // **THE FIGURES MOVE AND THE CLAIM DOES NOT, AND THE CAUSE IS `D-221`** (`docs/L3/operator-settings/delivery.md` §8):
    // `attach` subscribes FIRST, so the creation's four held addresses are delivered INSIDE that call — the record, the pair
    // and the pane through `onDelivery` (two patch arms and one exclusion arm; the app-state address goes to the surface's
    // OTHER body and never to this sink) — and only then does `attach` perform its own two, `applyGatePatch` and
    // `applyExclusion`. **So `attach` is still ONE boot terminal with nothing else behind it**: what stands behind it is the
    // creation's own event, which is a delivery and not a second boot.
    expect(sink.calls.length, 'attach lands the boot terminal AND the creation’s three draining deliveries: two patches and one exclusion from the drain, then attach’s own patch and exclusion').toBe(5)
    expect(sink.calls.map((call) => call.kind).sort(), 'three patches and two exclusions, in either order: the delivery\'s order is not declared (guide §6.4)').toEqual(['exclusion', 'exclusion', 'patch', 'patch', 'patch'])

    const answer = surface.set({ token: 'q', groups: ['graph'] })
    expect(sink.calls.length, 'the receipt answers with the delivery already made: the re-patch is the listener\'s, inside the write — one call behind the boot’s five').toBe(6)
    const patches = sink.calls.filter((call) => call.kind === 'patch')
    expect((patches[patches.length - 1].value as { groups?: string[] }).groups, 'the patch carries the post-state grant set, so the answer and the gate cannot carry two states').toEqual(answer.enabled)
    expect([...server.getGateConfig().enabled].sort()).toEqual(['dispatch', 'graph', 'read'])

    const refused = surface.set({ maxJournalLength: Number.POSITIVE_INFINITY })
    expect(refused.write.status, 'a non-finite cap refuses the patch in the instance\'s own member domain (design §6)').toBe('refused')
    expect(sink.calls.length, 'no commit, no delivery: the sink is not consulted at all').toBe(6)
    expect([...server.getGateConfig().enabled].sort(), 'and the live gate keeps the state it had').toEqual(['dispatch', 'graph', 'read'])
  })

  it('the transition answers `applied` and `state` and no receipt, is total over outside values, and moves the gate\'s epoch once per real transition (interface.md §5.1; design §4, §6)', () => {
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(server)

    const closed = surface.transition('mcp-disabled')
    expect({ applied: closed.applied, state: closed.state }).toEqual({ applied: true, state: 'mcp-disabled' })
    expect('write' in closed, 'the bridge declares no receipt on this route, so none is carried (ASM-L2-4)').toBe(false)
    const epoch = server.gate.exclusionEpoch()

    const outside: unknown[] = ['', 'MCP-DISABLED', ' mcp-disabled', 'mcp-disabled ', 'nonsense', 1, 0, true, null, undefined, {}, [], ['mcp-disabled']]
    for (const [index, state] of outside.entries()) {
      const answer = surface.transition(state)
      expect(answer.applied, `an outside value never applies (design §4): case ${index}`).toBe(false)
      if (answer.applied) continue
      expect(answer.reason, `and the input arm's own word rides it: case ${index}`).toBe('malformed-state')
      expect(answer.state, `the state it reports is the unmoved one: case ${index}`).toBe('mcp-disabled')
    }
    expect(server.gate.exclusionEpoch(), 'no malformed input reached the gate').toBe(epoch)

    const self = surface.transition('mcp-disabled')
    expect(self.applied, 'a self-transition is lawful (design §6)').toBe(true)
    expect(server.gate.exclusionEpoch(), 'and bumps no epoch (src/main/mcp-server.ts:476-491)').toBe(epoch)

    const reopened = surface.transition('mcp-enabled')
    expect({ applied: reopened.applied, state: reopened.state }).toEqual({ applied: true, state: 'mcp-enabled' })
    expect(server.gate.exclusionEpoch() - epoch, 'one real transition, one bump').toBe(1)
    expect(surface.read().read, 'and the carrier follows the one record').toBeNull()
  })

  it('while the pair stands open the operator\'s write channel stays open while the gate still refuses at the invocation turn (D-16; interface.md §5; behaviour.md §10)', () => {
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(server)
    surface.transition('mcp-disabled')
    expect(server.exclusionSnapshot(), 'the gate refuses').not.toBeNull()

    const answer = surface.set({ token: 'q', groups: ['graph'], maxJournalLength: 7 })
    expect(answer.write.status, 'yet the settings write commits: the store-side tier-4 consult retired with the displaced file (D-16)').toBe('committed')
    expect({ token: answer.token, exclusion: answer.exclusion }).toEqual({ token: 'q', exclusion: 'mcp-disabled' })
    expect(answer.enabled).toEqual(['read', 'dispatch', 'graph'])
    expect([...server.getGateConfig().enabled].sort(), 'and the grant widen reached the gate although the pair is open').toEqual(['dispatch', 'graph', 'read'])
    expect(surface.read().maxJournalLength).toBe(7)
    expect(surface.read().read?.reason, 'the closed token stays a READ token and is never a write outcome (D-16)').toBe('tier4-closed')
  })

  /* ── THE HOLDER'S WRITER ROW IS RETIRED WHOLE (`D-117`), AND ITS SUBJECT IS THE REASON: this row
   * asserted that `attach` and every committed pair write reached `tier4OpenState()`, the module-level
   * projection in `src/main/tier4-state.ts`. That FILE IS DELETED, so the row had no referent — its
   * subject was the holder and nothing else — and what it was proving about the SURFACE is proved by
   * the rows around it: the gate is the real `ProvidentMcpServer` and the two `applyExclusion` calls at
   * `attach` and on each delivery are `FS-T4-12`'s census, beside the gate's own record. */

  it('a store that cannot stand refuses the write as a value and the transition as `applied:false` with no reason, with the boot terminal already landed (interface.md §2.1, §5.1)', () => {
    mkdirSync(join(userDataDir, FILE))
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(server)
    expect(server.gate.exclusionState(), 'the boot terminal lands even with no instance standing').toBe('mcp-enabled')
    expect(surface.read().token, 'and the carrier serves the first-run default').toBeNull()

    const written = surface.set({ token: 'never' })
    if (written.write.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(written.write)}`)
    expect(written.write.reason, 'every later write answers the construction\'s refusal (guide §8.2)').toBe('FilePathUnreachable')
    expect([...server.getGateConfig().enabled], 'no commit, so no delivery: the gate is untouched').toEqual(['read', 'dispatch'])

    const transition = surface.transition('mcp-disabled')
    expect(transition.applied, 'the transition cannot commit with no instance standing').toBe(false)
    expect(transition.state, 'and it reports the unmoved state').toBe('mcp-enabled')
    expect('reason' in transition, '`malformed-state` is the input arm\'s word and this input was well-formed (interface.md §5.1)').toBe(false)
    expect(server.gate.exclusionState(), 'and the gate never moved').toBe('mcp-enabled')
    expect(readdirSync(userDataDir), 'nothing was created beside the occupied name').toEqual([FILE])
  })
})
