// src/renderer/module-channel-client.ts — THE REALM END of `module-channel` (`docs/L3/module-channel/design.md`
// §7–§8): the two kinds' receipt, the fan-out that fires each client half with its ENTRY, the registration frame's
// evaluation, and the ASYNC client store proxy. It constructs no store and invokes no graph write of its own.
import type { ClientStoreSurface, Refusal, StoreSurface } from '../shared/module-contract.js'
import type { ChannelEntry, ChannelTransportRealm, ClientStoreVerb } from '../shared/module-channels.js'

export interface ModuleChannelClientOptions {
  readonly transport: ChannelTransportRealm
  /** `module-system`'s client-source evaluation: `CapabilityRouter.registerModule(module, client)` (`L3` §6). */
  readonly evaluate: (frame: { readonly module: string; readonly client: string }) => void
  /** `module-system`'s ONE delivery entry, contained per handle; `ASM-MC-6` fires it with the ENTRY. */
  readonly fire: (handle: string, entry: ChannelEntry) => void
  /** Under ONE realm the store is realm-side; the proxy still answers Promises and still refuses registration. */
  readonly store?: StoreSurface
}

export interface ModuleChannelClient {
  /** The client ctx's `store` member: the nine data verbs, each answer a Promise (ASM-MC-1). */
  readonly store: ClientStoreSurface
  /** Registers both kinds on the transport; the returned function withdraws it. Idempotent. */
  start(): () => void
}

/** The six registration verbs are the foundation's; a client half that reaches one gets a named refusal, not a hole. */
const registration = (verb: string): Refusal => ({
  status: 'refused',
  reason: 'client-registration-refused',
  subject: verb,
  message: `the six registration verbs are the foundation's, not a client half's (${verb})`,
})

/** The client store's ONE proxy: a `StoreRequest` over the transport, or the realm store's answers resolved. */
export function createClientStore(source: { readonly transport: ChannelTransportRealm } | { readonly store: StoreSurface }): ClientStoreSurface {
  let id = 0
  const refuse = (verb: ClientStoreVerb | string): Promise<Refusal> => Promise.resolve(registration(verb))
  if ('store' in source) {
    const store = source.store
    const surface = {
      read: (...args: Parameters<StoreSurface['read']>) => Promise.resolve(store.read(...args)),
      readLiteral: (...args: Parameters<StoreSurface['readLiteral']>) => Promise.resolve(store.readLiteral(...args)),
      readTiered: (...args: Parameters<StoreSurface['readTiered']>) => Promise.resolve(store.readTiered(...args)),
      rollback: (...args: Parameters<StoreSurface['rollback']>) => Promise.resolve(store.rollback(...args)),
      write: (...args: Parameters<StoreSurface['write']>) => Promise.resolve(store.write(...args)),
      delete: (...args: Parameters<StoreSurface['delete']>) => Promise.resolve(store.delete(...args)),
      constraints: () => Promise.resolve(store.constraints()),
      constraintOn: (...args: Parameters<StoreSurface['constraintOn']>) => Promise.resolve(store.constraintOn(...args)),
      constraintOff: (...args: Parameters<StoreSurface['constraintOff']>) => Promise.resolve(store.constraintOff(...args)),
      listen: () => refuse('listen'),
      unlisten: () => refuse('unlisten'),
      addConstraint: () => refuse('addConstraint'),
      removeConstraint: () => refuse('removeConstraint'),
      register: () => refuse('register'),
      removeListener: () => refuse('removeListener'),
    }
    return surface as unknown as ClientStoreSurface
  }
  const ask = (verb: ClientStoreVerb) => (...args: readonly unknown[]): Promise<unknown> =>
    source.transport.request({ id: (id += 1), verb, args }).then((answer) => answer.answer)
  const surface = {
    read: ask('read'),
    readLiteral: ask('readLiteral'),
    readTiered: ask('readTiered'),
    rollback: ask('rollback'),
    write: ask('write'),
    delete: ask('delete'),
    constraints: ask('constraints'),
    constraintOn: ask('constraintOn'),
    constraintOff: ask('constraintOff'),
    listen: () => refuse('listen'),
    unlisten: () => refuse('unlisten'),
    addConstraint: () => refuse('addConstraint'),
    removeConstraint: () => refuse('removeConstraint'),
    register: () => refuse('register'),
    removeListener: () => refuse('removeListener'),
  }
  return surface as unknown as ClientStoreSurface
}

export function createModuleChannelClient(options: ModuleChannelClientOptions): ModuleChannelClient {
  const store = createClientStore(options.store === undefined ? { transport: options.transport } : { store: options.store })
  let stopMessages: (() => void) | null = null
  return {
    store,
    start() {
      if (stopMessages !== null) return stopMessages
      stopMessages = options.transport.onMessage((message) => {
        if (message.kind === 'registration') {
          options.evaluate({ module: message.module, client: message.client })
          return
        }
        // THE BATCH IS THE MESSAGE; THE FIRING IS PER ENTRY, IN THE MESSAGE'S ORDER (`D-320`, `S-13`). The grouping below
        // is an ORDERING DEVICE and no call boundary: an entry names exactly ONE handle (`ChannelEntry.listener`), so a
        // per-module call could only be an envelope around per-entry firings. Each entry's client half is fired with the
        // ENTRY (`ASM-MC-4`/`ASM-MC-6`); a module with no registered client half contributes nothing, never a fault.
        const byModule = new Map<string, ChannelEntry[]>()
        for (const entry of message.entries) {
          const held = byModule.get(entry.module)
          if (held === undefined) byModule.set(entry.module, [entry])
          else held.push(entry)
        }
        for (const entries of byModule.values()) {
          for (const entry of entries) options.fire(entry.listener, entry)
        }
      })
      return stopMessages
    },
  }
}
