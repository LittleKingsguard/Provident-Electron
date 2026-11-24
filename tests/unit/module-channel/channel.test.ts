// tests/unit/module-channel/channel.test.ts — the UNIT battery for `module-channel`: the facade's binding, the writer's
// turn and the five arms, over a DECLARED store double and a RECORDING transport (`docs/L3/module-channel/design.md`
// §3–§5, §11). UNMARKED and GATING (D-40, D-30). The subject is real; the two seams are the double and the transport.
import { describe, expect, it } from 'vitest'
import { createModuleChannel } from '../../../src/main/module-channel/index.js'
import type { Activation, StoreSurface } from '../../../src/shared/module-contract.js'
import type { ChannelMessage, StoreAnswer, StoreRequest } from '../../../src/shared/module-channels.js'

type Body = (address: readonly string[]) => unknown

interface Double {
  readonly surface: StoreSurface
  readonly fire: { handle: string | null; fail: boolean }
  /** The latest receipt, read by name exactly as the writer reads it. */
  receipt(): { returnedValues: Map<string, unknown>; bodyFailures: Map<string, unknown> }
}

function storeDouble(): Double {
  const listeners = new Map<string, Body>()
  const fire = { handle: null as string | null, fail: false }
  let last = { returnedValues: new Map<string, unknown>(), bodyFailures: new Map<string, unknown>() }
  const surface = {
    read: () => undefined, readLiteral: () => undefined, readTiered: () => ({}), rollback: () => ({}),
    constraints: () => [], constraintOn: () => undefined, constraintOff: () => undefined, removeConstraint: () => undefined,
    addConstraint: () => 'pair',
    listen: (handle: string) => handle,
    unlisten: () => undefined,
    removeListener: () => undefined,
    register: (handle: string, listener: Body) => { listeners.set(handle, listener) },
    write: (address: readonly string[]) => {
      const returnedValues = new Map<string, unknown>()
      const bodyFailures = new Map<string, unknown>()
      const handle = fire.handle
      if (handle !== null) {
        if (fire.fail) {
          // The BODY STILL RAN; the store settled it as a rejection and stood the rank-23 datum on the receipt.
          listeners.get(handle)?.(address)
          bodyFailures.set(handle, { status: 'ListenerBodyRejected' })
        } else {
          const value = listeners.get(handle)?.(address)
          if (value !== undefined) returnedValues.set(handle, value)
        }
      }
      last = { returnedValues, bodyFailures }
      return last
    },
    delete: () => {
      const returnedValues = new Map<string, unknown>()
      const handle = fire.handle
      if (handle !== null) {
        const value = listeners.get(handle)?.(['m'])
        if (value !== undefined) returnedValues.set(handle, value)
      }
      last = { returnedValues, bodyFailures: new Map() }
      return { record: { commit: last } }
    },
  } as unknown as StoreSurface
  return { surface, fire, receipt: () => last }
}

interface Transport {
  readonly main: { push(message: ChannelMessage): void; onRequest(handler: (request: StoreRequest) => Promise<StoreAnswer>): void }
  readonly messages: ChannelMessage[]
  ask(request: StoreRequest): Promise<StoreAnswer>
}

function recordingTransport(): Transport {
  const messages: ChannelMessage[] = []
  let handler: ((request: StoreRequest) => Promise<StoreAnswer>) | null = null
  return {
    main: {
      push: (message) => { messages.push(message) },
      onRequest: (registered) => { handler = registered },
    },
    messages,
    ask: (request) => {
      if (handler === null) throw new Error('no request handler stood')
      return handler(request)
    },
  }
}

const HANDLE = 'module:ms#note'
const binding = (main: Body | undefined): Activation[] => [{
  name: 'ms',
  version: '1.0.0',
  tools: [],
  listeners: [{ address: ['m'], handle: HANDLE, ...(main === undefined ? {} : { main }) }],
}]

interface Subject {
  readonly surface: StoreSurface
  readonly transport: Transport
  readonly double: Double
}

/** The store's own listener arity, so the test never narrows an `Address` the store could deliver. */
type StoreListener = Parameters<StoreSurface['register']>[1]

function subject(main: Body | undefined, body?: Body): Subject {
  const double = storeDouble()
  const transport = recordingTransport()
  const channel = createModuleChannel({ store: double.surface, transport: transport.main, bindings: () => binding(main) })
  channel.surface.listen(HANDLE, [['m']])
  channel.surface.register(HANDLE, (body ?? main ?? ((address: readonly string[]) => address)) as unknown as StoreListener)
  double.fire.handle = HANDLE
  return { surface: channel.surface, transport, double }
}

const lastMessage = (transport: Transport): Extract<ChannelMessage, { kind: 'write-turn' }> => {
  const message = transport.messages.at(-1)
  if (message === undefined || message.kind !== 'write-turn') throw new Error('no write-turn message stood')
  return message
}

describe('module-channel — unit grain: the facade, the writer and the five arms (§3–§5)', () => {
  it('MC-1 — the binding holds ONE entry under the declaration\'s handle, and the return arm carries the SETTLED value', () => {
    const { surface, transport, double } = subject(() => ({ v: 1 }))
    surface.write(['m'], 'mem', 1)
    const message = lastMessage(transport)
    expect(message.turn, 'the turn is the writer\'s first').toBe(1)
    expect(message.entries, 'ONE entry per listener that spoke').toEqual([
      { turn: 1, module: 'ms', listener: HANDLE, address: ['m'], outcome: 'return', data: { v: 1 } },
    ])
    expect(double.receipt().returnedValues.has(HANDLE), 'the value was read off the receipt, keyed by the handle').toBe(true)
  })

  it('MC-2 — a main half that THROWS is CONTAINED by the binding: `threw` names it and the writer\'s call still answers', () => {
    const { surface, transport } = subject(() => { throw new Error('ms-boom') })
    expect(() => surface.write(['m'], 'mem', 1), 'the throw never crosses the writer\'s call').not.toThrow()
    expect(lastMessage(transport).entries[0], 'the arm is `threw` and the refusal is the channel\'s own').toMatchObject({
      outcome: 'threw',
      refusal: 'main-half-threw',
    })
  })

  it('MC-3 — a declaration with NO main half is the PASSTHROUGH arm, and its data is the address the store handed it', () => {
    const { surface, transport } = subject(undefined)
    surface.write(['m'], 'mem', 1)
    expect(lastMessage(transport).entries[0], 'the passthrough is a registered entry, not an absence (D-307)').toMatchObject({
      outcome: 'passthrough',
      data: ['m'],
    })
  })

  it('MC-4 — a declared main half that answers NOTHING is `empty`, and the entry carries no data', () => {
    const { surface, transport } = subject(() => undefined)
    surface.write(['m'], 'mem', 1)
    const entry = lastMessage(transport).entries[0]
    expect(entry.outcome, 'the undefined-returner is the declared silence').toBe('empty')
    expect(entry.data, 'and its data is absent, not `undefined`-shaped').toBeUndefined()
  })

  it('MC-5 — an answer that cannot cross is `refused` BY NAME, after settlement, and it is not a sixth arm', () => {
    const { surface, transport } = subject(() => () => 1)
    surface.write(['m'], 'mem', 1)
    expect(lastMessage(transport).entries[0], 'a function cannot cross the channel\'s encoder').toMatchObject({
      outcome: 'refused',
      refusal: 'not-transport-safe',
    })
  })

  it('MC-6 — ONE message per turn, the turn MONOTONE, and the registration frame is the message\'s second kind', () => {
    const double = storeDouble()
    const transport = recordingTransport()
    const channel = createModuleChannel({ store: double.surface, transport: transport.main, bindings: () => binding(() => 1) })
    channel.surface.listen(HANDLE, [['m']])
    channel.surface.register(HANDLE, () => 1)
    double.fire.handle = HANDLE
    channel.surface.write(['m'], 'mem', 1)
    channel.surface.write(['m'], 'mem', 2)
    const turns = transport.messages.filter((message) => message.kind === 'write-turn').map((message) => message.turn)
    expect(turns, 'two writes, two messages, the counter moving by one each time').toEqual([1, 2])
    channel.pushRegistration({ module: 'ms', client: 'function (ctx) {}' })
    expect(transport.messages.at(-1), 'the registration frame is a KIND of the same message and answers nothing').toEqual({
      kind: 'registration',
      module: 'ms',
      client: 'function (ctx) {}',
    })
  })

  it('MC-7 — a rejecting body is `empty`\'s second shape: the rank-23 datum stands in the receipt, not as a sixth arm', () => {
    const { surface, transport, double } = subject(() => undefined)
    double.fire.fail = true
    surface.write(['m'], 'mem', 1)
    expect(lastMessage(transport).entries[0].outcome, 'the entry stays `empty`').toBe('empty')
    expect(double.receipt().bodyFailures.has(HANDLE), 'and the failure is the RECEIPT\'s datum, read under the handle').toBe(true)
  })

  it('MC-8 — a DELETE is a delivering act, and its maps are read through `record.commit`', () => {
    const { surface, transport } = subject(() => 'gone')
    surface.delete(['m'])
    expect(lastMessage(transport).entries[0], 'the delete\'s receipt carries the pair under `record.commit`').toMatchObject({
      outcome: 'return',
      data: 'gone',
    })
  })
})
