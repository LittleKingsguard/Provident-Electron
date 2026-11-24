// tests/unit/module-channel/client.test.ts — the REALM half's unit battery (`docs/L3/module-channel/design.md` §7–§8,
// §11): both kinds' receipt, the fan-out by entry, the async proxy and the registration refusal. UNMARKED and GATING.
import { describe, expect, it } from 'vitest'
import { createClientStore, createModuleChannelClient } from '../../../src/renderer/module-channel-client.js'
import type { ChannelEntry, ChannelMessage, ChannelTransportRealm, StoreRequest } from '../../../src/shared/module-channels.js'
import type { StoreSurface } from '../../../src/shared/module-contract.js'

interface Realm {
  readonly transport: ChannelTransportRealm
  readonly requests: StoreRequest[]
  send(message: ChannelMessage): void
  listening(): boolean
}

function realm(): Realm {
  let handler: ((message: ChannelMessage) => void) | null = null
  const requests: StoreRequest[] = []
  const transport: ChannelTransportRealm = {
    onMessage: (registered) => {
      handler = registered
      return () => { handler = null }
    },
    request: async (request) => {
      requests.push(request)
      return { id: request.id, answer: { echo: request.verb } }
    },
  }
  return {
    transport,
    requests,
    send: (message) => {
      if (handler === null) throw new Error('no message handler stood')
      handler(message)
    },
    listening: () => handler !== null,
  }
}

const entry = (module: string, listener: string, outcome: ChannelEntry['outcome'], data?: unknown): ChannelEntry => ({
  turn: 1, module, listener, outcome, ...(data === undefined ? {} : { data }),
})

describe('module-channel — realm grain: the two kinds, the fan-out, the async proxy (§7–§8)', () => {
  it('MC-9 — a registration frame EVALUATES its client source once, through the given evaluator', () => {
    const wire = realm()
    const evaluated: unknown[] = []
    const client = createModuleChannelClient({ transport: wire.transport, evaluate: (frame) => { evaluated.push(frame) }, fire: () => undefined })
    client.start()
    wire.send({ kind: 'registration', module: 'ms', client: 'function (ctx) { void ctx }' })
    expect(evaluated, 'the frame is `{module, client}` and the realm evaluates it, never a graph text').toEqual([
      { module: 'ms', client: 'function (ctx) { void ctx }' },
    ])
  })

  it('MC-10 — a write-turn fans out ONE call per module and fires each client half with the ENTRY', () => {
    const wire = realm()
    const fired: Array<[string, ChannelEntry]> = []
    const client = createModuleChannelClient({ transport: wire.transport, evaluate: () => undefined, fire: (handle, at) => { fired.push([handle, at]) } })
    client.start()
    const entries = [entry('a', 'module:a#x', 'return', 1), entry('a', 'module:a#y', 'empty'), entry('b', 'module:b#z', 'passthrough', ['x'])]
    wire.send({ kind: 'write-turn', turn: 1, entries })
    expect(fired.map(([handle]) => handle), 'every entry, in the message\'s order, grouped by module').toEqual([
      'module:a#x', 'module:a#y', 'module:b#z',
    ])
    expect(fired[0][1], 'the ENTRY is the payload — the arm, the address, the data and the refusal ride it').toEqual(entries[0])
  })

  it('MC-11 — the client proxy sends the act and answers a Promise of the store\'s own answer', async () => {
    const wire = realm()
    const client = createModuleChannelClient({ transport: wire.transport, evaluate: () => undefined, fire: () => undefined })
    const answer = await client.store.write(['m'], 'mem', 1)
    expect(wire.requests, 'ONE request, the verb and the caller\'s args by identity').toEqual([{ id: 1, verb: 'write', args: [['m'], 'mem', 1] }])
    expect(answer, 'the answer is the main channel\'s own, not a wrapper').toEqual({ echo: 'write' })
    const surface = client.store as unknown as Record<string, () => Promise<{ reason: string }>>
    expect((await surface.listen!()).reason, 'a registration verb is refused BY NAME on the proxy').toBe('client-registration-refused')
  })

  it('MC-12 — under ONE realm the proxy wraps the store\'s answers in Promises and still refuses registration', async () => {
    const store = {
      read: () => 'literal', readLiteral: () => 'literal', readTiered: () => ({ _tier: 'mem' }), rollback: () => ({}),
      write: () => ({ opId: 'w' }), delete: () => ({ opId: 'd' }), constraints: () => [],
      constraintOn: () => undefined, constraintOff: () => undefined,
    } as unknown as StoreSurface
    const surface = createClientStore({ store })
    expect(await surface.read(['m']), 'the realm store\'s answer is resolved, never a second authority').toBe('literal')
    const proxy = surface as unknown as Record<string, () => Promise<{ status: string; reason: string }>>
    expect(await proxy.register!()).toMatchObject({ status: 'refused', reason: 'client-registration-refused' })
  })

  it('MC-13 — `start` registers ONE handler and its stop withdraws it', () => {
    const wire = realm()
    const client = createModuleChannelClient({ transport: wire.transport, evaluate: () => undefined, fire: () => undefined })
    const stop = client.start()
    expect(wire.listening(), 'the transport holds the handler after start').toBe(true)
    expect(client.start(), 'a second start returns the SAME stop and registers nothing twice').toBe(stop)
    stop()
    expect(wire.listening(), 'the stop withdraws the handler').toBe(false)
  })
})
