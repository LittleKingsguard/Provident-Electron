// src/main/module-channel/facade.ts — THE STORE FACADE: the app's ONE store, decorated to the same fifteen members
// (`docs/L3/module-channel/design.md` §3). `listen`/`register` are the BINDING; `write`/`delete`/`addConstraint` are
// the WRITER's entrance; the other members pass through. A handle outside `module:` is not a module declaration's and
// is never wrapped — the app's own records keep their exact behaviour (`C-3`, `D-310`).
import type { StoreSurface } from '../../shared/module-contract.js'
import { isModuleHandle } from '../../shared/module-channels.js'
import type { ChannelWriter } from './writer.js'

export interface BindingRecord {
  readonly handle: string
  readonly address: readonly string[]
  body?: (address: readonly string[]) => unknown
}

export function createStoreFacade(store: StoreSurface, writer: ChannelWriter, records: Map<string, BindingRecord>): StoreSurface {
  return {
    read: (...args) => store.read(...args),
    readLiteral: (...args) => store.readLiteral(...args),
    readTiered: (...args) => store.readTiered(...args),
    rollback: (...args) => store.rollback(...args),
    constraints: () => store.constraints(),
    constraintOn: (...args) => store.constraintOn(...args),
    constraintOff: (...args) => store.constraintOff(...args),
    removeConstraint: (...args) => store.removeConstraint(...args),
    // THE DELIVERING VERBS ARE THE WRITER'S: the store answers the receipt and the writer holds the turn (`D-311`).
    write: (...args) => writer.act('write', args) as ReturnType<StoreSurface['write']>,
    delete: (...args) => writer.act('delete', args) as ReturnType<StoreSurface['delete']>,
    addConstraint: (...args) => writer.act('addConstraint', args) as ReturnType<StoreSurface['addConstraint']>,
    listen: (handle, addresses) => {
      if (isModuleHandle(handle)) {
        records.set(handle, { handle, address: (addresses[0] ?? []) as readonly string[] })
      }
      return store.listen(handle, addresses)
    },
    register: (handle, listener) => {
      const record = records.get(handle)
      if (record === undefined) {
        store.register(handle, listener)
        return
      }
      record.body = listener as (address: readonly string[]) => unknown
      store.register(handle, (address) => {
        const delivered = address as readonly string[]
        writer.fired(handle, delivered)
        try {
          return (listener as (passed: readonly string[]) => unknown)(delivered)
        } catch {
          // THE BINDING CONTAINS THE MAIN HALF'S THROW: the store catches nothing and would carry it out of an
          // unrelated writer's call (`S-11`, `D-105`). The turn records the arm; the caller's write still answers.
          writer.threw(handle, delivered)
          return undefined
        }
      })
    },
    removeListener: (handle) => {
      records.delete(handle)
      store.removeListener(handle)
    },
    unlisten: (handle) => {
      records.delete(handle)
      store.unlisten(handle)
    },
  }
}
