// src/main/modules/index.ts — `createModuleExecutor` and `L2` §11's four doors (`design.md` §3–§4).
//
// `install` is §4–§5 in one act: load, admit, resolve against the host's ONE application number, then
// activate in the RESOLVER's order and not the delivery's; `deactivate` is §4's inverse; `activations()`
// answers the records in that same order, so no caller sorts (`D-304`). The tool handler table is the
// executor's own, and the route by which the transport reaches a handler is `ASM-MS-4`'s one undeclared
// cell: this file adds NO fifth host member and NO `invoke` (`L2` §11).
import type {
  Activation,
  DeactivationVerdict,
  ModuleDelivery,
  ModuleExecutor,
  ModuleHost,
  ModuleManifest,
  ModuleVerdict,
  RefusalName,
} from '../../shared/module-contract.js'
import { FOUNDATION, admitDeclaration, admitSource } from './admission.js'
import { activate, withdraw, type ActivationOutcome, type ActiveRecord } from './activation.js'
import { loadDelivery, type LoadedModule } from './loader.js'
import { resolve, type Candidate } from './resolver.js'

/** The refusal shape both admission and the resolver answer with — a name AND its subject. */
type Reasoned = { readonly reason: RefusalName; readonly subject: string }

export function createModuleExecutor(host: ModuleHost): ModuleExecutor {
  const records = new Map<string, ActiveRecord>()
  let order: readonly string[] = []

  const rejected = (module: LoadedModule, refusal: Reasoned): ModuleVerdict => ({
    status: 'rejected',
    name: module.manifest.name,
    version: module.manifest.version,
    // THE NAME *AND* the thing it refused (`ASM-MS-3`, `D-105`).
    reason: `${refusal.reason}: ${refusal.subject}`,
  })

  const sendFrame = (manifest: ModuleManifest): void => {
    const client = manifest.client
    if (typeof client === 'string' && client !== '') host.sendRegistration({ module: manifest.name, client })
  }

  const install = (delivery: ModuleDelivery): readonly ModuleVerdict[] => {
    let loaded: readonly LoadedModule[]
    try {
      loaded = loadDelivery(delivery)
    } catch (error) {
      // A delivery that is not a manifest is CONTAINED as a verdict and never thrown across the door.
      return [{ status: 'rejected', name: '', version: '', reason: `entry-malformed: ${message(error)}` }]
    }

    const refused = new Map<string, Reasoned>()
    for (const module of loaded) {
      for (const check of [admitSource, (candidate: LoadedModule) => admitDeclaration(candidate, FOUNDATION)]) {
        const admission = check(module)
        if (!admission.ok && !refused.has(module.manifest.name)) refused.set(module.manifest.name, admission)
      }
    }

    const incoming = new Map<string, LoadedModule>()
    for (const module of loaded) {
      if (!refused.has(module.manifest.name)) incoming.set(module.manifest.name, module)
    }

    // The standing set first, in the order it already stands, then this delivery's additions — arrival
    // order is what ties keep — and a re-delivered name REPLACES its standing candidate rather than
    // standing twice in the resolver's input (`L2` §7).
    const candidates: readonly Candidate[] = [
      ...order
        .filter((name) => records.has(name) && !incoming.has(name))
        .map((name) => candidateOf((records.get(name) as ActiveRecord).manifest)),
      ...[...incoming.values()].map((module) => candidateOf(module.manifest)),
    ]

    const plan = resolve(candidates, host.appVersion())
    if (!plan.ok) return loaded.map((module) => rejected(module, refused.get(module.manifest.name) ?? plan))

    const answered = new Map<string, ModuleVerdict>()
    for (const module of loaded) {
      const refusal = refused.get(module.manifest.name)
      if (refusal !== undefined) answered.set(module.manifest.name, rejected(module, refusal))
    }

    for (const name of plan.order) {
      const module = incoming.get(name)
      if (module === undefined) continue // a standing module the resolver did not re-order into this delivery
      const standing = records.get(name)
      if (standing !== undefined && standing.version === module.manifest.version) {
        // THE SAME NAME AT THE SAME VERSION IS A `no-op` THAT RE-SENDS THE FRAME: the boot read adds no
        // member and makes no store call (`L2` §9, `design.md` §4).
        sendFrame(standing.manifest)
        answered.set(name, { status: 'no-op', name, version: standing.version })
        continue
      }
      if (standing !== undefined) {
        const failures = withdraw(standing, host.store)
        if (failures.length === 0) records.delete(name)
      }
      let made: ActivationOutcome
      try {
        made = activate(module, host)
      } catch (error) {
        // Nothing crosses the door: a store that throws at registration is a refusal, by value (`D-105`).
        made = { ok: false, reason: 'entry-threw', subject: message(error) }
      }
      if (made.ok) {
        records.set(name, made.record)
        answered.set(name, { status: standing === undefined ? 'installed' : 'updated', name, version: made.record.version })
      } else {
        answered.set(name, rejected(module, made))
      }
    }

    // THE ORDER IS THE RESOLVER'S ANSWER, and only what actually stands is in it.
    order = [...new Set(plan.order)].filter((name) => records.has(name))

    // Every delivered name is answered by construction: a refused one above, an incoming one by the
    // loop. The assertion records that invariant rather than minting a refusal for an arm that cannot run.
    return loaded.map((module) => answered.get(module.manifest.name) as ModuleVerdict)
  }

  const deactivate = (name: string): DeactivationVerdict => {
    const record = records.get(name)
    if (record === undefined) return { status: 'no-op', name } // nothing stands: NO store call, no throw
    const failures = withdraw(record, host.store)
    if (failures.length > 0) {
      // The record STANDS, so the inverse stays retryable (`design.md` §4, `L2` §6).
      return { status: 'rejected', name, reason: failures[0] as string }
    }
    records.delete(name)
    order = order.filter((standing) => standing !== name)
    return { status: 'deactivated', name }
  }

  const activations = (): readonly Activation[] =>
    order
      .filter((name) => records.has(name))
      .map((name) => {
        const record = records.get(name) as ActiveRecord
        return { name: record.name, version: record.version, tools: record.tools, listeners: record.listeners }
      })

  return { install, deactivate, activations }
}

function candidateOf(manifest: ModuleManifest): Candidate {
  return { name: manifest.name, version: manifest.version, requires: manifest.requires }
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
