// src/main/module-channel/index.ts — the ONE composition: the facade, the writer and the transport, and nothing else
// (`docs/L3/module-channel/design.md` §1). The surface it answers is the app's ONE store, decorated; `pushRegistration`
// is the executor's registration frame's one sender (`C-15`). The transport is `S-12`'s eleventh member, injected.
import type { Activation, RegistrationFrame, StoreSurface } from '../../shared/module-contract.js'
import type { ChannelTransportMain, StoreAnswer, StoreRequest } from '../../shared/module-channels.js'
import { createStoreFacade, type BindingRecord } from './facade.js'
import { createChannelWriter } from './writer.js'

export interface ModuleChannelOptions {
  readonly store: StoreSurface
  readonly transport: ChannelTransportMain
  /** The executor's public `activations()`; attached after both objects stand. Absent ⇒ no entry is a module's. */
  readonly bindings?: () => readonly Activation[]
}
export interface ModuleChannel {
  /** The fifteen-member surface every consumer of the app's store is handed (`design.md` §3). */
  readonly surface: StoreSurface
  /** The executor's `ModuleHost.sendRegistration` is wired to this (`L2` §9). */
  pushRegistration(frame: RegistrationFrame): void
}

export function createModuleChannel(options: ModuleChannelOptions): ModuleChannel {
  const records = new Map<string, BindingRecord>()
  const bindings = options.bindings ?? ((): readonly Activation[] => [])
  const writer = createChannelWriter({ store: options.store, transport: options.transport, bindings })
  const surface = createStoreFacade(options.store, writer, records)

  // THE CLIENT ACT'S REQUEST/ANSWER, over the SAME one member and no second route (`ASM-MC-3`): the facade executes
  // the data verb — the delivering verbs already pushed their turn — and the answer is the store's own.
  options.transport.onRequest(async (request: StoreRequest): Promise<StoreAnswer> => {
    const member = (surface as unknown as Record<string, unknown>)[request.verb]
    const answer = typeof member === 'function' ? (member as (...passed: readonly unknown[]) => unknown)(...request.args) : undefined
    return { id: request.id, answer: await answer }
  })

  return {
    surface,
    pushRegistration: (frame) => options.transport.push({ kind: 'registration', module: frame.module, client: frame.client }),
  }
}
