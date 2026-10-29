// tests/integration/security-store-storeroom/surface.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 2: THE OPERATOR-SETTINGS SURFACE MODULE.
//
// THE CONTRACT: docs/L2/security-store-storeroom/interface.md §5/§6 and behaviour.md §9-§10 — the
// carrier's read, the three manual-UI channels, `attach` as the only gate edge, the
// one-construction census and the product census. The subject is the real
// `createSettingsSurface`, and the gate it is attached to is the real `ProvidentMcpServer`: no
// mock, no stub of either, and every assertion is an observable answer or an observable gate
// state, never an internal call (examiner.md §2).
//
// RED BEFORE GREEN (examiner.md §3): `src/main/settings-surface/` does not exist at this head, so
// this file is the red set the implementation has to turn green — and it fails at collection
// today rather than row by row, which is the shape a filed-before-implementation battery has.
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate } from '../../../src/main/security.js'
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
  it('the carrier’s read answers the landed superset on a first boot (src/main/main.ts:427-443)', () => {
    const { surface } = composed()
    const answer = surface.read()
    expect({ token: answer.token, enabled: answer.enabled }, 'the record members are the landed SecuritySettings ones').toEqual({ token: null, enabled: ['read', 'dispatch'] })
    expect(answer.maxJournalLength).toBeUndefined()
    expect(answer.read, 'the tier-4 read token is null because the read was performed with MCP enabled').toBeNull()
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
    expect(answer.write.status, 'the SET answer carries the receipt of THIS write as a value').toBe('committed')
    expect(answer.exclusion).toBe('mcp-enabled')
    expect([...answer.enabled].sort(), 'the answer is the post-state record').toEqual(['data', 'dispatch', 'graph', 'read'])
    expect([...server.getGateConfig().enabled].sort(), 'and the live gate already agrees when the answer is minted').toEqual(['data', 'dispatch', 'graph', 'read'])
    expect(readdirSync(userDataDir), 'the write landed in the instance’s own file and nowhere else').toEqual([OPERATOR_FILE])
  })

  it('a refused write leaves the live gate unpatched: the re-patch is the subscription’s, not the call site’s (interface.md §5)', () => {
    const { surface, server } = composed()
    const before = [...server.getGateConfig().enabled].sort()
    const answer = surface.set({ maxJournalLength: Number.NaN })
    expect(answer.write.status, 'a non-finite cap is a value the crossing refuses (guide §10.2)').toBe('refused')
    if (answer.write.status !== 'refused') throw new Error('the row needs the refused arm to read its reason word')
    expect(answer.write.reason).toBe('ValueRefusedAtBoundary')
    expect([...server.getGateConfig().enabled].sort(), 'no commit, no delivery, so no re-patch').toEqual(before)
  })

  it('the transition channel commits, re-reads and refuses nothing while the pair stands open (src/main/main.ts:472-483)', () => {
    const { surface, server } = composed()
    const answer = surface.transition('mcp-disabled')
    expect(answer.applied, 'the transition applied').toBe(true)
    expect(answer.state).toBe('mcp-disabled')
    expect(answer.write.status).toBe('committed')
    expect(server.exclusionSnapshot(), 'the live gate now refuses at the invocation turn').not.toBeNull()
    const carrier = surface.read()
    expect(carrier.exclusion, 'the carrier and the gate are one reading, never two states').toBe('mcp-disabled')
    expect(carrier.read?.reason, 'and the read member carries the closed tier-4 token, which is a READ token and not a write outcome (D-16)').toBe('tier4-closed')
  })

  it('a malformed transition is refused as a value: `malformed-state`, never a throw, and the gate is unmoved', () => {
    const { surface, server } = composed()
    const answer = surface.transition('nonsense')
    expect(answer.applied).toBe(false)
    expect(answer.reason).toBe('malformed-state')
    expect(answer.state).toBe('mcp-enabled')
    expect(server.exclusionSnapshot(), 'a malformed request is not a transition').toBeNull()
  })

  it('a settings write is admitted while the pair stands open: the store’s own gate consult is gone (D-16)', () => {
    const { surface } = composed()
    surface.transition('mcp-disabled')
    const answer = surface.set({ token: 'q' })
    expect(answer.write.status, 'the tier-4 refusal does not survive as a write outcome; the hazard it answered is closed by D-18').toBe('committed')
    expect(answer.token).toBe('q')
    expect(answer.exclusion, 'and the pair is unmoved by the settings write').toBe('mcp-disabled')
  })

  it('exactly one construction of the surface exists outside the module, and it is the composition site’s (D-18, ISO-5)', () => {
    const moduleDir = join(SRC_DIR, 'main', 'settings-surface') + '/'
    const owners = walk(SRC_DIR)
      .filter((file) => !file.startsWith(moduleDir))
      .filter((file) => readFileSync(file, 'utf8').includes('createSettingsSurface('))
    expect(owners.map((file) => file.slice(SRC_DIR.length + 1)).sort(), 'one operator-only reference, held by the composition site and nowhere else').toEqual(['main/main.ts'])
  })

  it('the product’s own member set is the four verbs of interface.md §5 — the fifth value name is the factory, not a member', () => {
    const { surface } = composed()
    expect(Object.keys(surface).sort(), 'the surface exposes `read`, `set`, `transition` and `attach` and nothing else').toEqual(['attach', 'read', 'set', 'transition'])
  })
})
