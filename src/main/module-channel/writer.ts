// src/main/module-channel/writer.ts — THE TURN: the receipt, the settled edge, the firing record, the message
// (`docs/L3/module-channel/design.md` §4–§6). The channel is the writer (`D-311`), so the receipt is the channel's
// and the entries are composed from it — never from a capture beside it. Data only reaches the transport; this file
// invokes no graph, pane or template (`C-10`).
import type { Activation, StoreSurface } from '../../shared/module-contract.js'
import type { ChannelEntry, ChannelMessage, ChannelTransportMain } from '../../shared/module-channels.js'

/** What one firing of a bound declaration recorded: the store's address, and whether the body threw. */
interface Firing {
  readonly handle: string
  readonly address: readonly string[]
  readonly threw: boolean
}

export interface ChannelWriter {
  readonly turn: number
  /** The facade's wrapper calls this before the body runs (`design.md` §3). */
  fired(handle: string, address: readonly string[]): void
  /** …and this instead when the body threw: the throw is CONTAINED here, never carried out of the writer's call. */
  threw(handle: string, address: readonly string[]): void
  /** Execute one delivering act against the store and push its ONE message (`design.md` §4). */
  act(verb: 'write' | 'delete' | 'addConstraint', args: readonly unknown[]): unknown
}

export interface ChannelWriterOptions {
  readonly store: StoreSurface
  readonly transport: ChannelTransportMain
  /** The executor's PUBLIC `activations()`, attached after both objects stand (`design.md` §3). */
  readonly bindings: () => readonly Activation[]
}

/** A value the channel's encoder can carry; a function, a symbol, a bigint or a cycle cannot cross (`C-2`). */
function portable(value: unknown, seen = new WeakSet<object>()): boolean {
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') return false
  if (value === null || typeof value !== 'object') return true
  if (seen.has(value)) return false
  seen.add(value)
  for (const key of Object.keys(value)) {
    if (!portable((value as Record<string, unknown>)[key], seen)) return false
  }
  return true
}

/** The store's `returnedValues`/`bodyFailures` are non-enumerable own getters over a map keyed by the handle; a
 *  `delete`'s receipt carries the pair under `record.commit`, so the read is the same read at three declared sites. */
function readMap(receipt: unknown, name: string, handle: string): { found: boolean; value?: unknown } {
  const candidates: unknown[] = [receipt]
  const record = (receipt as Record<string, unknown> | null)?.['record']
  if (record !== null && typeof record === 'object') candidates.push((record as Record<string, unknown>)['commit'])
  candidates.push((receipt as Record<string, unknown> | null)?.['commit'])
  for (const candidate of candidates) {
    const held = (candidate as Record<string, unknown> | null)?.[name]
    if (held instanceof Map) {
      if (held.has(handle)) return { found: true, value: held.get(handle) }
      continue
    }
    if (held !== null && typeof held === 'object') {
      if (Object.prototype.hasOwnProperty.call(held, handle)) {
        return { found: true, value: (held as Record<string, unknown>)[handle] }
      }
    }
  }
  return { found: false }
}

export function createChannelWriter(options: ChannelWriterOptions): ChannelWriter {
  let turn = 0
  const firings = new Map<string, Firing>()

  const bindingFor = (handle: string): { activation: Activation; main: boolean } | null => {
    for (const activation of options.bindings()) {
      const listener = activation.listeners.find((entry) => entry.handle === handle)
      if (listener !== undefined) return { activation, main: listener.main !== undefined }
    }
    return null
  }

  const compose = (current: number, receipt: unknown): ChannelMessage => {
    const entries: ChannelEntry[] = []
    for (const firing of firings.values()) {
      const bound = bindingFor(firing.handle)
      // A firing at a handle no activation publishes is not a module listener's: it is not in this message at all.
      if (bound === null) continue
      const base = { turn: current, module: bound.activation.name, listener: firing.handle, address: firing.address }
      if (firing.threw) {
        entries.push({ ...base, outcome: 'threw', refusal: 'main-half-threw' })
        continue
      }
      if (!bound.main) {
        entries.push({ ...base, outcome: 'passthrough', data: firing.address })
        continue
      }
      const returned = readMap(receipt, 'returnedValues', firing.handle)
      if (returned.found) {
        entries.push(portable(returned.value)
          ? { ...base, outcome: 'return', data: returned.value }
          : { ...base, outcome: 'refused', refusal: 'not-transport-safe' })
        continue
      }
      // A rejecting body is `empty`'s SECOND SHAPE: the rank-23 datum stands in the receipt's `bodyFailures` (`D-310`).
      entries.push({ ...base, outcome: 'empty' })
    }
    firings.clear()
    return { kind: 'write-turn', turn: current, entries }
  }

  const thenable = (value: unknown): value is PromiseLike<unknown> =>
    value !== null && (typeof value === 'object' || typeof value === 'function')
    && typeof (value as { then?: unknown }).then === 'function'

  const act = (verb: 'write' | 'delete' | 'addConstraint', args: readonly unknown[]): unknown => {
    const answer = (options.store[verb] as unknown as (...passed: readonly unknown[]) => unknown)(...args)
    // THE EDGE IS THE SETTLED ANSWER (`D-310`, `H-4`): a suspending set answers a Promise, so the turn is marked at its
    // resolution and the message composed from the SETTLED record — never from the thenable itself (`C-2`).
    if (thenable(answer)) {
      return Promise.resolve(answer).then((settled) => {
        turn += 1
        options.transport.push(compose(turn, settled))
        return settled
      })
    }
    turn += 1
    options.transport.push(compose(turn, answer))
    return answer
  }

  return {
    get turn() { return turn },
    fired(handle, address) { firings.set(handle, { handle, address, threw: false }) },
    threw(handle, address) { firings.set(handle, { handle, address, threw: true }) },
    act,
  }
}
