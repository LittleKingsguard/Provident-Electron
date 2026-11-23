// src/renderer/extensions.ts — THE REALM HALF (`L1` §3 `S-2b`): the client ctx as its OWN five-member
// literal, the module's `client` source evaluated here, the delivery table `onDelivery` stands on, the
// named-action table the engine matches at dispatch, and the contribution records `U4`'s ordered point
// reads (`docs/L3/module-system/design.md` §6, `signatures.md` §3).
//
// THE REPLACED `ModuleCtx` RETIRES WHOLE AND IS NOT EXTENDED (`D-305`, `L2` §3): `captureView`,
// `onRender`, `emit`, `transform`, `uploadQueue` and `fetch` are gone — six members, four of them stubs
// or unwired, and `transform` the post-compile string class this rebuild forbids (`D-231`). A member
// present-but-inert is unspellable: the ctx this file hands an entry is a literal of EXACTLY
// `{store, onDelivery, action, graph, log}` and `declare`/`tool` are main's alone.
//
// NO dispatch-time resolver and no source text in graph data: `action` installs a LIVE closure keyed by
// name (`C-10`, `D-313`). The batch that calls `fire` is `module-channel`'s and never this file's.
import { moduleHandle } from '../shared/module-contract.js'
import type {
  ClientHalfCtx,
  ContributionHandle,
  DeliveryHandle,
  GraphContribution,
  Refusal,
  StoreSurface,
} from '../shared/module-contract.js'

export type { ClientHalfCtx, GraphContribution, DeliveryHandle, ContributionHandle }

/** What the realm is handed. An ABSENT store is the named refusal `no-store-host`, not a stub. */
export interface ClientHalfDeps {
  /** At `U3` the channel hands its own surface here and owns the write turn (`D-311`). */
  readonly store?: StoreSurface
  readonly log?: (line: string, detail?: unknown) => void
}

export interface ClientListenerRecord {
  readonly module: string
  readonly listener: string
  readonly handle: DeliveryHandle
}

export interface ActionRecord {
  readonly module: string
  readonly name: string
}

export interface ContributionRecord {
  readonly module: string
  readonly contribution: GraphContribution
}

export type DeliveryOutcome = {
  readonly status: 'delivered' | 'refused'
  readonly handle: DeliveryHandle
  readonly reason?: string
}

/** The capability router: ONE registration frame in, ONE five-member ctx out. */
export class CapabilityRouter {
  private readonly deps: ClientHalfDeps
  private registered: string[] = []
  private listenerRecords: ClientListenerRecord[] = []
  private actionRecords: ActionRecord[] = []
  private contributionRecords: ContributionRecord[] = []
  private readonly bodies = new Map<DeliveryHandle, (data: unknown, address: readonly string[]) => void>()
  private readonly handlers = new Map<string, (ctx: never, ...args: unknown[]) => unknown>()
  private noHost: StoreSurface | null = null

  /** Zero-arg stays lawful (`L2` §12's `I-2` constructs it so). */
  constructor(deps: ClientHalfDeps = {}) {
    this.deps = deps
  }

  /** A STRING is `L2` §9's `{module, client}` payload EVALUATED here; a function is the in-tree arm. */
  registerModule(module: string, entry: string | ((ctx: ClientHalfCtx) => void)): void {
    if (typeof module !== 'string' || module === '' || module.includes('.') || module.includes(':')) {
      this.log(`module register: invalid name ${JSON.stringify(String(module))} (no '.' and no ':')`)
      return
    }
    // ONE frame per module: a second delivery of the same name adds no member (`L2` §9).
    if (this.registered.includes(module)) return
    this.registered = [...this.registered, module]
    const ctx: ClientHalfCtx = {
      store: this.storeSurface(),
      onDelivery: (listener, fn) => {
        const handle = moduleHandle(module, listener)
        this.listenerRecords = [...this.listenerRecords, { module, listener, handle }]
        this.bodies.set(handle, fn)
        return handle
      },
      action: (name, fn) => {
        this.actionRecords = [...this.actionRecords, { module, name }]
        this.handlers.set(actionKey(module, name), fn)
      },
      graph: (contribution) => {
        this.contributionRecords = [...this.contributionRecords, { module, contribution }]
        return moduleHandle(module, `graph:${contribution.parent}`)
      },
      log: (line, detail) => this.log(line, detail),
    }
    if (typeof entry === 'string') {
      let run: (passed: ClientHalfCtx) => void
      try {
        run = evaluate(entry)
      } catch (error) {
        this.log('entry-malformed', message(error))
        return
      }
      try {
        run(ctx)
      } catch (error) {
        this.log('entry-threw', message(error))
      }
      return
    }
    try {
      entry(ctx)
    } catch (error) {
      this.log('entry-threw', message(error))
    }
  }

  modules(): readonly string[] {
    return [...this.registered]
  }

  listeners(): readonly ClientListenerRecord[] {
    return [...this.listenerRecords]
  }

  actions(): readonly ActionRecord[] {
    return [...this.actionRecords]
  }

  contributions(): readonly ContributionRecord[] {
    return [...this.contributionRecords]
  }

  /** The realm's ONE delivery entry: contained per handle, so one half's throw stops no other (`D-307`). */
  fire(handle: DeliveryHandle, data: unknown, address: readonly string[]): DeliveryOutcome {
    const body = this.bodies.get(handle)
    if (body === undefined) return { status: 'refused', handle, reason: 'no-store-host: no listener stands under this handle' }
    try {
      body(data, address)
      return { status: 'delivered', handle }
    } catch (error) {
      return { status: 'refused', handle, reason: message(error) }
    }
  }

  /** The realm's inverse of ONE registration frame; `false` where the module was never registered. */
  withdraw(module: string): boolean {
    if (!this.registered.includes(module)) return false
    const listeners = this.listenerRecords.filter((record) => record.module === module)
    for (const record of listeners) this.bodies.delete(record.handle)
    this.registered = this.registered.filter((name) => name !== module)
    this.listenerRecords = this.listenerRecords.filter((record) => record.module !== module)
    this.actionRecords = this.actionRecords.filter((record) => record.module !== module)
    this.contributionRecords = this.contributionRecords.filter((record) => record.module !== module)
    return true
  }

  private log(line: string, detail?: unknown): void {
    this.deps.log?.(line, detail)
  }

  /** The GIVEN writer, by identity — never a copy (`L2` §10, `D-311`). */
  private storeSurface(): StoreSurface {
    if (this.deps.store !== undefined) return this.deps.store
    this.noHost ??= noStoreHost()
    return this.noHost
  }
}

const actionKey = (module: string, name: string): string => `${module}\u0000${name}`

/** A client source is a function-STRING delivered as DATA and evaluated HERE (`C-15`, `D-308`). */
function evaluate(source: string): (ctx: ClientHalfCtx) => void {
  const factory: unknown = new Function(`"use strict"; return (${source});`)()
  if (typeof factory !== 'function') throw new Error('the delivered client source is not a function')
  return factory as (ctx: ClientHalfCtx) => void
}

/** No writer handed in: EVERY verb answers the named refusal `no-store-host` as a VALUE (`D-105`). */
function noStoreHost(): StoreSurface {
  const refused = (verb: string): Refusal => ({
    status: 'refused',
    reason: 'no-store-host',
    subject: verb,
    message: `the realm holds no store writer yet, so \`${verb}\` is a request the channel executes at U3`,
  })
  const surface = {
    read: () => refused('read'),
    readLiteral: () => refused('readLiteral'),
    readTiered: () => refused('readTiered'),
    rollback: () => refused('rollback'),
    write: () => refused('write'),
    delete: () => refused('delete'),
    constraints: () => refused('constraints'),
    listen: () => refused('listen'),
    unlisten: () => refused('unlisten'),
    addConstraint: () => refused('addConstraint'),
    constraintOn: () => refused('constraintOn'),
    constraintOff: () => refused('constraintOff'),
    removeConstraint: () => refused('removeConstraint'),
    register: () => refused('register'),
    removeListener: () => refused('removeListener'),
  }
  return surface as unknown as StoreSurface
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
