// src/main/modules/activation.ts — compile `entry`, run it with the MAIN half's four-member ctx,
// collect the runtime declarations and tool registrations, register ONE store entry per DECLARED
// listener, mint the `ActiveRecord`, and run the inverse (`L2` §6, §9, §10; `design.md` §4).
//
// NOTHING REACHES THE STORE BEFORE THE COMPARISON: the four members are a literal, the store member
// refuses EVERY verb `reentrant-call` as a VALUE (`D-311`), and `compare` runs in both directions
// before `listen`/`register` is called once — so a refused activation leaves no store entry behind.
import {
  moduleHandle,
  toolName,
  type ListenerBinding,
  type MainHalfCtx,
  type ModuleHost,
  type ModuleManifest,
  type Refusal,
  type RefusalName,
  type StoreSurface,
} from '../../shared/module-contract.js'
import type { Address, Listener } from 'provident-storeroom'
import { FOUNDATION, compare, declaredListeners, isFoundationTool, type Registrations } from './admission.js'
import { addressKey, listenerHandle } from './handles.js'
import type { LoadedModule } from './loader.js'

export interface ActiveRecord {
  readonly name: string
  readonly version: string
  readonly manifest: ModuleManifest
  readonly tools: readonly string[]
  readonly listeners: readonly ListenerBinding[]
  /** THE DOOR's map, keyed by the FULL published name: what this activation's run filled, and what
   *  `invoke` reads AT THE TURN. It rides the RECORD and never `Activation`, so no listing consumer is
   *  handed a callable that outlives its activation (`L2` §11, `ASM-MS-4`). */
  readonly handlers: ReadonlyMap<string, (args: unknown) => unknown>
}

export type ActivationOutcome =
  | { readonly ok: true; readonly record: ActiveRecord }
  | { readonly ok: false; readonly reason: RefusalName; readonly subject: string }

/** The mutable carrier the ctx writes through; `Registrations` is its read-only face for `compare`. */
interface RegistrationState {
  readonly tools: Set<string>
  readonly mains: Map<string, ((address: readonly string[]) => unknown) | null>
  readonly handlers: Map<string, (args: unknown) => unknown>
  refusal: Refusal | null
}

export function activate(module: LoadedModule, host: ModuleHost): ActivationOutcome {
  const manifest = module.manifest
  const state: RegistrationState = { tools: new Set(), mains: new Map(), handlers: new Map(), refusal: null }
  const registrations: Registrations = state

  const ctx: MainHalfCtx = {
    store: refusingStore(),
    declare: (declaration) => {
      const key = addressKey(declaration.address)
      // THE DECLARATION'S MAIN HALF ARRIVES IN ONE OF ITS TWO LAWFUL SPELLINGS: the MANIFEST carries it
      // as a function-STRING, and the ENTRY — already compiled code — hands the live function. Both are
      // the same half, so `compileMain` is the identity on the second and never a second member.
      const spelled: unknown = (declaration as { readonly main?: unknown }).main
      let compiled: ((address: readonly string[]) => unknown) | null = null
      if (typeof spelled === 'function') {
        compiled = spelled as (address: readonly string[]) => unknown
      } else if (typeof spelled === 'string' && spelled !== '') {
        try {
          compiled = compileHalf(spelled) as (address: readonly string[]) => unknown
        } catch (error) {
          state.refusal ??= refusal('entry-malformed', key, message(error))
        }
      }
      state.mains.set(key, compiled)
      return moduleHandle(manifest.name, key)
    },
    tool: (tool, handler) => {
      const name = toolName(manifest.name, tool)
      if (isFoundationTool(tool, FOUNDATION)) {
        state.refusal ??= refusal('foundation-tool', name, `${name} occupies the foundation's own namespace`)
      }
      state.tools.add(name)
      // THE MAP THE DOOR READS (§3): keyed by the FULL published name, the closure the entry itself
      // handed `tool`, so `invoke` runs it with the state this run created (`D-307`, guardrail 12).
      state.handlers.set(name, handler)
      return name
    },
    log: (line, detail) => host.log(`module:${manifest.name}: ${line}`, detail),
  }

  const entry = manifest.entry
  if (typeof entry === 'string' && entry !== '') {
    let run: (passed: MainHalfCtx) => unknown
    try {
      run = compileHalf(entry) as (passed: MainHalfCtx) => unknown
    } catch (error) {
      return { ok: false, reason: 'entry-malformed', subject: message(error) }
    }
    try {
      run(ctx)
    } catch (error) {
      return { ok: false, reason: 'entry-threw', subject: message(error) }
    }
  }

  const mismatch = compare(manifest.capabilities, registrations)
  if (mismatch !== null) return { ok: false, reason: mismatch.reason, subject: mismatch.subject }
  if (state.refusal !== null) return { ok: false, reason: state.refusal.reason, subject: state.refusal.subject }

  const bindings: ListenerBinding[] = []
  for (const declaration of declaredListeners(manifest.capabilities)) {
    const key = addressKey(declaration.address)
    const handle = listenerHandle(manifest.name, declaration)
    const main = state.mains.get(key) ?? null
    if (typeof declaration.main === 'string' && declaration.main !== '' && main === null) {
      return { ok: false, reason: 'declaration-overstated', subject: key }
    }
    bindings.push({ address: declaration.address, handle, ...(main === null ? {} : { main }) })
    try {
      // ONE store entry per DECLARATION, under the declaration's ONE handle (`D-307`, `L2` §4). The
      // watching is a SET of addresses and the declaration names one (`C-3`'s chosen narrowing).
      host.store.listen(handle, [declaration.address])
      // The body the store holds: the entry's own main half, or the PASSTHROUGH arm the channel reads —
      // never an absence (`D-307`). `contained` is the containment `U3`'s binding inherits.
      host.store.register(handle, contained(main ?? passthrough(declaration.address)))
    } catch (error) {
      return { ok: false, reason: 'entry-threw', subject: `${handle}: ${message(error)}` }
    }
  }

  const client = manifest.client
  if (typeof client === 'string' && client !== '') host.sendRegistration({ module: manifest.name, client })

  return {
    ok: true,
    record: {
      name: manifest.name,
      version: manifest.version,
      manifest,
      tools: [...state.tools],
      listeners: bindings,
      handlers: state.handlers,
    },
  }
}

/** The inverses, contained: BOTH of one entry's own store-side verbs as a UNIT, in reverse of the
 *  registration order, each inside its own `catch`. A failed body-withdrawal ABORTS that entry's pair,
 *  so the watching the retry needs is never consumed (`L2` §6, guardrail 10). */
export function withdraw(record: ActiveRecord, store: StoreSurface): readonly string[] {
  const failures: string[] = []
  for (const binding of [...record.listeners].reverse()) {
    for (const verb of ['removeListener', 'unlisten'] as const) {
      try {
        store[verb](binding.handle)
      } catch (error) {
        failures.push(`${binding.handle}: ${message(error)}`)
        break
      }
    }
    if (failures.length > 0) break
  }
  return failures
}

/** The MAIN half's store: every verb a `Refusal` by name, in place of a throw (`D-105`, `L2` §10). */
function refusingStore(): StoreSurface {
  const refused = (verb: string): Refusal => ({
    status: 'refused',
    reason: 'reentrant-call',
    subject: verb,
    message: `a main half opens no store verb: the channel owns every write turn (${verb})`,
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

/** The body a main-less declaration stands on: the channel carries the address to its client half. */
function passthrough(address: readonly string[]): (delivered: readonly string[]) => unknown {
  return (delivered) => {
    void address
    return delivered
  }
}

function contained(body: (address: readonly string[]) => unknown): Listener {
  return (address: Address) => {
    try {
      return body(address as readonly string[])
    } catch {
      return undefined
    }
  }
}

/** A function-STRING compiled in the main realm — a half that will not compile is `entry-malformed`. */
function compileHalf(source: string): (passed: never) => unknown {
  const factory: unknown = new Function(`"use strict"; return (${source});`)()
  if (typeof factory !== 'function') throw new Error('the delivered half is not a function')
  return factory as (...args: never[]) => unknown
}

function refusal(reason: RefusalName, subject: string, detail: string): Refusal {
  return { status: 'refused', reason, subject, message: `${reason}: ${subject} (${detail})` }
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
