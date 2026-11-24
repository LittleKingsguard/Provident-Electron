// tests/integration/module-channel/channel.test.ts — the INTEGRATION battery for `module-channel` (`CH-1`…`CH-6`,
// `docs/L2/module-channel/interface.md` §8): the facade, the writer and the realm end over a REAL `createProfileStore`
// and a connected transport pair. UNMARKED and GATING. The store is the subject's real crossing; the transport pair is
// the one declared seam, and the realm's `fire` is `module-system`'s own router. **A MAIN HALF RETURNS A THENABLE where
// the row reads a value**, because the store settles a suspending body and stands the value on the receipt (`D-310`).
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { createModuleChannel } from '../../../src/main/module-channel/index.js'
import { createModuleChannelClient } from '../../../src/renderer/module-channel-client.js'
import { CapabilityRouter } from '../../../src/renderer/extensions.js'
import { moduleHandle, type Activation, type StoreSurface } from '../../../src/shared/module-contract.js'
import type { ChannelEntry, ChannelMessage, ChannelTransportMain, ChannelTransportRealm, StoreAnswer, StoreRequest } from '../../../src/shared/module-channels.js'

const HANDLE = moduleHandle('m', 'note')
const ROOT = moduleHandle('m', 'root')
const scratch: string[] = []
afterAll(() => { for (const dir of scratch.splice(0)) { try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort */ } } })

function realStore(): StoreSurface {
  const dir = mkdtempSync(join(tmpdir(), 'module-channel-int-'))
  scratch.push(dir)
  return createProfileStore({ filePath: join(dir, 'provident-profile.json') }) as unknown as StoreSurface
}

interface Wire {
  readonly main: ChannelTransportMain
  readonly realm: ChannelTransportRealm
  readonly messages: ChannelMessage[]
  readonly requests: StoreRequest[]
}

function wire(): Wire {
  let realmHandler: ((message: ChannelMessage) => void) | null = null
  let mainHandler: ((request: StoreRequest) => Promise<StoreAnswer>) | null = null
  const messages: ChannelMessage[] = []
  const requests: StoreRequest[] = []
  return {
    messages,
    requests,
    main: {
      push: (message) => { messages.push(message); realmHandler?.(message) },
      onRequest: (handler) => { mainHandler = handler },
    },
    realm: {
      onMessage: (handler) => { realmHandler = handler; return () => { realmHandler = null } },
      request: async (request) => {
        requests.push(request)
        if (mainHandler === null) throw new Error('the main request handler does not stand')
        return mainHandler(request)
      },
    },
  }
}

interface Subject {
  readonly facade: StoreSurface
  readonly channel: ReturnType<typeof createModuleChannel>
  readonly client: ReturnType<typeof createModuleChannelClient>
  readonly router: CapabilityRouter
  readonly wire: Wire
  readonly fired: ChannelEntry[]
  readonly evaluated: unknown[]
  readonly activations: Activation[]
}

function subject(): Subject {
  const store = realStore()
  const wirePair = wire()
  const activations: Activation[] = []
  const channel = createModuleChannel({ store, transport: wirePair.main, bindings: () => activations })
  const fired: ChannelEntry[] = []
  const evaluated: unknown[] = []
  let router: CapabilityRouter | null = null
  const client = createModuleChannelClient({
    transport: wirePair.realm,
    evaluate: (frame) => { evaluated.push(frame) },
    fire: (handle, entry) => { router?.fire(handle, entry) },
  })
  router = new CapabilityRouter({ store: client.store, log: () => undefined })
  client.start()
  return { facade: channel.surface, channel, client, router, wire: wirePair, fired, evaluated, activations }
}

/** One declaration, registered through the facade, over the real store. */
function declare(s: Subject, module: string, address: readonly string[], handle: string, main: (address: readonly string[]) => unknown, key = 'note', onClient?: (entry: ChannelEntry) => void): void {
  s.activations.push({ name: module, version: '1.0.0', tools: [], listeners: [{ address: [...address], handle, main }] })
  s.router.registerModule(module, (ctx) => {
    ctx.onDelivery(key, (entry) => { if (onClient) onClient(entry); else s.fired.push(entry) })
  })
  s.facade.listen(handle, [address])
  s.facade.register(handle, main as never)
}

describe('module-channel — integration grain: the facade, the writer and the realm over a real store (§3–§8)', () => {
  it('CH-1 — one declaration, one store entry, and the write\'s turn reaches the realm with the SETTLED value', async () => {
    const s = subject()
    declare(s, 'm', ['m'], HANDLE, async () => ({ v: 1 }))
    await s.facade.write(['m'], 'mem', 1)
    expect(s.fired.length, 'the realm fired the one declaration').toBe(1)
    expect(s.fired[0], 'the settled value is read off the receipt and crosses as the entry\'s data').toMatchObject({
      module: 'm', listener: HANDLE, outcome: 'return', data: { v: 1 }, address: ['m'], turn: 1,
    })
    expect(s.wire.messages[0], 'ONE message for the turn').toMatchObject({ kind: 'write-turn', turn: 1 })
  })

  it('CH-2 — the arms over the real receipt: a settled return, a contained throw, silence, and a refused value', async () => {
    const s = subject()
    let mode: 'return' | 'threw' | 'empty' | 'refused' = 'return'
    const cyclic: Record<string, unknown> = {}; cyclic['self'] = cyclic
    declare(s, 'm', ['m'], HANDLE, () => {
      if (mode === 'threw') throw new Error('main-boom')
      if (mode === 'empty') return undefined
      if (mode === 'refused') return Promise.resolve(cyclic)
      return Promise.resolve({ v: 2 })
    })
    await s.facade.write(['m'], 'mem', 1)
    mode = 'threw'; await s.facade.write(['m'], 'mem', 2)
    mode = 'empty'; await s.facade.write(['m'], 'mem', 3)
    mode = 'refused'; await s.facade.write(['m'], 'mem', 4)
    expect(s.fired.map((entry) => [entry.outcome, entry.refusal, entry.data]), 'each write answers its own arm').toEqual([
      ['return', undefined, { v: 2 }],
      ['threw', 'main-half-threw', undefined],
      ['empty', undefined, undefined],
      ['refused', 'not-transport-safe', undefined],
    ])
  })

  it('CH-3 — the registration frame is a KIND of the one message and calls the realm\'s evaluator', () => {
    const s = subject()
    s.channel.pushRegistration({ module: 'm', client: 'function (ctx) { void ctx }' })
    expect(s.evaluated, 'the realm evaluates the frame\'s client STRING').toEqual([{ module: 'm', client: 'function (ctx) { void ctx }' }])
    expect(s.wire.messages.at(-1), 'and the frame answers nothing — it is not a write turn').toEqual({ kind: 'registration', module: 'm', client: 'function (ctx) { void ctx }' })
  })

  it('CH-4 — one turn, one message, and the store\'s PREFIX relation fires the root subscriber and the leaf half together', async () => {
    const s = subject()
    s.activations.push({ name: 'm', version: '1.0.0', tools: [], listeners: [
      { address: ['m'], handle: ROOT, main: async () => 'root' },
      { address: ['m', 'leaf'], handle: HANDLE, main: async () => 'leaf' },
    ] })
    s.router.registerModule('m', (ctx) => {
      ctx.onDelivery('root', (entry) => { s.fired.push(entry) })
      ctx.onDelivery('note', (entry) => { s.fired.push(entry) })
    })
    s.facade.listen(ROOT, [['m']]); s.facade.register(ROOT, (async () => 'root') as never)
    s.facade.listen(HANDLE, [['m', 'leaf']]); s.facade.register(HANDLE, (async () => 'leaf') as never)
    await s.facade.write(['m'], 'mem', { leaf: 0 })
    s.fired.length = 0; s.wire.messages.length = 0
    await s.facade.write(['m', 'leaf'], 'mem', 1)
    expect(s.fired.map((entry) => [entry.listener, entry.data]).sort(), 'a root subscriber hears a leaf write, and the leaf half hears it too').toEqual([
      [HANDLE, 'leaf'],
      [ROOT, 'root'],
    ].sort())
    expect(new Set(s.fired.map((entry) => entry.turn)).size, 'and both entries share ONE turn').toBe(1)
    expect(s.wire.messages.filter((message) => message.kind === 'write-turn').length, 'the writer flushed ONE message').toBe(1)
  })

  it('CH-5 — containment is PER MODULE: a client half that throws stops neither its batch nor the next module', async () => {
    const s = subject()
    declare(s, 'c', ['c'], moduleHandle('c', 'note'), async () => 'c', 'note', () => { throw new Error('client-boom') })
    declare(s, 'd', ['d'], moduleHandle('d', 'note'), async () => 'd')
    await s.facade.write(['c'], 'mem', 1)
    await s.facade.write(['d'], 'mem', 2)
    expect(s.fired.map((entry) => entry.module), 'the throwing module\'s half is CONTAINED, and the next module still fires').toEqual(['d'])
  })

  it('CH-6 — the client act is a request/answer over the ONE member, and the channel is its writer', async () => {
    const s = subject()
    declare(s, 'm', ['m'], HANDLE, async () => 'value')
    const answer = await s.client.store.write(['m'], 'mem', 9)
    expect(s.wire.requests, 'ONE StoreRequest, the nine data verbs\' own envelope').toMatchObject([{ verb: 'write', args: [['m'], 'mem', 9] }])
    expect(answer, 'the answer is the store\'s own settled receipt').toBeTruthy()
    expect(s.fired.length, 'and the delivering act still flushed its turn to the realm').toBe(1)
  })
})
