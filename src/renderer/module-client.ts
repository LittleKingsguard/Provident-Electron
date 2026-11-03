// src/renderer/module-client.ts — THE APP-STATE ROWS' SHAPE, HELD IN THIS REALM AND FILLED BY DELIVERIES (`D-104`).
//
// ═══ THE RULE THIS MODULE EXISTS TO SATISFY, IN THE USER'S OWN WORDS ═══
// **"The renderer does not ask state, it listens. If it needs to ask, it does so within a listener."** Until this pass the
// app-state rows — the secure crossing's `['operator-app-state']` record, which carries the module registry's
// `file.modules.<id>` leaves — reached this realm ONE way: `secure-panels`' read of `window.provident.module.get()` at
// request time, inside a method every DOM click and every boot called. `D-82` clause 2 measured the address delivering
// **zero** for that reason. It delivers now (`src/main/operator-settings/index.ts`'s `subscribe` binds the third address
// and routes its deliveries to a second body, the surface hands the change to the composition's broadcast, and
// `IPC_MODULE_CHANGED` carries the signal here), and this module is the shape the delivery fills.
//
// ═══ THE CHAIN, IN `D-78`'s ORDER ═══
// store acts (a module install, an update, the operator's disable toggle — every one of them ONE `commit` of the whole
// rows list) → the crossing's delivery → `IPC_MODULE_CHANGED` → **this module's re-read** → the shape → the consumer
// (`SecurePanels`' `module-status` and `module-list` nodes, which are provident data in the pane graph). It holds THE DATA
// SHAPE and nothing else, and the same three disciplines `tabs-client.ts` and `view-client.ts` carry:
//
//   · **IT IS NOT A STORE** — no address space, no persistence, no constraint, no listener registration of its own beyond
//     the one subscription the consumer takes, and no accumulation: every `adopt` REPLACES the whole shape.
//   · **THE PUSH CARRIES A SIGNAL AND NEVER A VALUE** (`guide §6.4`; `D-82` clause 2), so the only correct answer to a
//     delivery is a fresh read, and a value this module answers is ALWAYS one it read — never one it remembered, never one
//     it composed.
//   · **EXACTLY ONE STATED BOOT READ** — `fill()` — because a boot's own store acts happened in `main()` before this realm
//     could subscribe and a cold profile changes nothing afterwards, so the first fill has no delivery to ride. **EVERY
//     LATER FILL IS A DELIVERY'S, and the read sits INSIDE the listener** (`subscribe`'s body below): there is no timer, no
//     poll, no interval, no re-read on render and no call site anywhere in this realm that asks at request time.
//
// **NO `src/main/` IMPORT, AND NO `provident-storeroom` IMPORT**: the renderer bundle is a browser bundle. The one type it
// borrows is `ModuleListEntry` from `src/shared/types.ts` — a SHARED module both realms already read — and the bridge is
// narrowed structurally by a LOCAL type (the `tabs-client.ts` precedent), because `window.provident.module` must stay
// OPTIONAL at the ambient declaration (`src/renderer/secure-panels.ts`) and a realm with no bridge at all — the node
// suite's layout-less shim, a plain page, an older preload — is the declared ABSENT case rather than a `ReferenceError`.
// Nothing here throws on any arm, so no caller needs a `try`.

import type { ModuleListEntry } from '../shared/types.js'

/** **THE READING'S COMMITTED ARM — `IPC_MODULE_GET`'s declared answer, member for member**: the boot's diagnosis, the two
 *  name lists the pane paints, and one entry per `file.modules.<id>` row. It is required member for required member, so an
 *  answer carrying a partial record reaches the caller as `unread` rather than as a shape derived from it — and NO ROW IS
 *  INVENTED: an entry whose `name` or `version` is not a string is dropped, exactly where the crossing would refuse one. */
export interface ModuleCommittedReading {
  readonly status: 'committed'
  readonly corrupt: boolean
  readonly quarantined: readonly string[]
  readonly loaded: readonly string[]
  readonly modules: readonly ModuleListEntry[]
}

/** **THE CLIENT'S READING — the committed arm plus the TWO STATEMENTS this module can make and must never hide**: the member
 *  is not there (`absent`) and the route did not answer (`unread`). The route has no `refused` arm (a module row's commit is
 *  the main side's and its refusal never crosses `IPC_MODULE_GET`), so those two arms are the whole of what stands beside
 *  `committed`. No arm throws, so `reading()`/`fill()` are total. */
export type ModuleClientReading =
  | ModuleCommittedReading
  | { readonly status: 'absent'; readonly reason: 'no-module-member' | 'no-get-route' }
  | { readonly status: 'unread'; readonly reason: 'route-threw' | 'answer-not-declared'; readonly detail: string | null }

/** **THE SHAPE — WHAT THE CONSUMER PAINTS.** `filled` is the honest statement of whether any delivery or the one boot read
 *  has answered yet: `false` means the four members are the declared empty pair because nothing has been read, never
 *  because a store said so. */
export interface ModuleShape {
  readonly filled: boolean
  readonly corrupt: boolean
  readonly quarantined: readonly string[]
  readonly loaded: readonly string[]
  readonly modules: readonly ModuleListEntry[]
}

/** THE SUBSCRIPTION'S OWN ANSWER — the `tabs-client` shape: whether it installed, why it did not, and a withdrawal that is
 *  always callable and never throws. */
export interface ModuleSubscription {
  readonly subscribed: boolean
  readonly reason: 'no-module-member' | 'no-changed-route' | 'register-threw' | null
  readonly release: () => void
}

/** **THE BRIDGE MEMBER THIS CLIENT USES — TWO ROUTES AND NO THIRD.** `get` is the read; `onChanged` is the delivery. The
 *  client takes NO WRITE ROUTE AT ALL: a module row is written on the main side (the `module.*` tools, the operator's
 *  disable toggle), and a client that could write would be a second authority beside them.
 *  Every answer is `unknown` on purpose: a bridge is a TRUST BOUNDARY, so a shape that arrived is checked before it is
 *  read, and a member answering a value its own declaration does not admit reaches the caller as `unread`. */
export interface ModuleClientBridge {
  get(): Promise<unknown>
  onChanged(handler: () => void): () => void
}

export interface ModuleClientOptions {
  /** The member to read through. OMITTED (and never `null`) means **read the ambient `window.provident.module` at each
   *  call**, which is what the app does and what a node test drives by installing (or not installing) a stub; `null`
   *  states the absent case on a realm where a member would otherwise be found. */
  readonly bridge?: ModuleClientBridge | null
}

/** **THE CLIENT — the shape, the one read, and the one subscription.** `fill()` is the read; `subscribe()` is the
 *  delivery's duty, and the ONLY three members there are beside the pure `adopt`/`reading` statements. */
export interface ModuleClient {
  shape(): ModuleShape
  fill(): Promise<ModuleClientReading>
  subscribe(handler: (reading: ModuleClientReading) => void): ModuleSubscription
  adopt(reading: ModuleClientReading): void
  reading(): ModuleClientReading | null
}

/** The shape before anything has answered: the empty pair and `filled: false`. **IT IS NOT A SUBSTITUTION AT THE READ**: the
 *  two lists are empty because nothing has been read, and the consumer's own line says `corrupt: false` about a store it has
 *  not heard from rather than about one it knows to be clean. */
const emptyShape = (): ModuleShape => ({ filled: false, corrupt: false, quarantined: [], loaded: [], modules: [] })

/** THE AMBIENT MEMBER, READ AT CALL TIME — never at construction, so a bridge installed after the client was built is still
 *  found, and a realm with no `window` at all is the absent case rather than a `ReferenceError`. TOTAL: every step is a
 *  `typeof` guard. */
function ambientModuleMember(): unknown {
  if (typeof window === 'undefined') return null
  const provident = (window as unknown as { provident?: unknown }).provident
  if (provident === null || provident === undefined || typeof provident !== 'object') return null
  const member = (provident as { module?: unknown }).module
  return member === null || member === undefined ? null : member
}

const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'

/** ONE ENTRY, ADMITTED FIELD BY FIELD FROM THE WIRE — the shape the pane paints, and nothing wider: `name` and `version` are
 *  the two it cannot paint without, `capabilities`/`disabled`/`quarantined` are carried where they are present. An entry it
 *  cannot admit is DROPPED, which is the crossing's own disposition (`view-client.ts`'s `paneOf`, applied to a module). */
function entryOf(held: unknown): ModuleListEntry | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const name = held['name']
  const version = held['version']
  if (typeof name !== 'string' || name === '') return null
  if (typeof version !== 'string' || version === '') return null
  const entry: { name: string; version: string; capabilities?: ModuleListEntry['capabilities']; disabled?: boolean; quarantined?: boolean } = { name, version }
  if (isObject(held['capabilities'])) entry.capabilities = held['capabilities'] as ModuleListEntry['capabilities']
  if (typeof held['disabled'] === 'boolean') entry.disabled = held['disabled']
  if (typeof held['quarantined'] === 'boolean') entry.quarantined = held['quarantined']
  return entry
}

/** ONE STRING LIST, admitted whole — a member that is not an array of strings makes the answer undeclared rather than
 *  partially read, because the two lists ARE a count the pane paints. */
function stringsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  return held.every((member) => typeof member === 'string') ? (held as readonly string[]) : null
}

/** `IPC_MODULE_GET`'s ONE ANSWER, CHECKED RATHER THAN ASSUMED. An answer that carries a member this module cannot read is
 *  `answer-not-declared` with the divergence named, never a shape derived from a partial record. */
function committedOrDivergence(raw: unknown): { readonly reading: ModuleCommittedReading } | { readonly detail: string } {
  if (!isObject(raw) || Array.isArray(raw)) return { detail: `answer is ${raw === null ? 'null' : typeof raw}` }
  const corrupt = raw['corrupt']
  if (typeof corrupt !== 'boolean') return { detail: 'corrupt is not a boolean' }
  const quarantined = stringsIn(raw['quarantined'])
  if (quarantined === null) return { detail: 'quarantined is not a string array' }
  const loaded = stringsIn(raw['loaded'])
  if (loaded === null) return { detail: 'loaded is not a string array' }
  const heldModules = raw['modules']
  if (!Array.isArray(heldModules)) return { detail: 'modules is not an array' }
  const modules: ModuleListEntry[] = []
  for (const candidate of heldModules) {
    const entry = entryOf(candidate)
    if (entry !== null) modules.push(entry)
  }
  return { reading: { status: 'committed', corrupt, quarantined, loaded, modules } }
}

/** A THROWN OR REJECTED ROUTE, STATED — the message where the value has one, its spelling where it does not. */
function detailOf(error: unknown): string {
  if (error !== null && typeof error === 'object' && typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  return typeof error === 'string' ? error : 'the route rejected with no message'
}

/** **THE CLIENT FACTORY.** It holds ONE binding — the shape — and every member is TOTAL. The shape is replaced whole by
 *  `adopt` and by nothing else, so no member can leave a partially-updated projection behind. */
export function createModuleClient(options: ModuleClientOptions = {}): ModuleClient {
  let shape: ModuleShape = emptyShape()
  let lastReading: ModuleClientReading | null = null
  /** The member, at THIS call: an injected one where the caller supplied one (including `null`, the stated absent case),
   *  the ambient `window.provident.module` otherwise. */
  const memberFor = (): unknown => (options.bridge === undefined ? ambientModuleMember() : options.bridge)

  function adopt(reading: ModuleClientReading): void {
    lastReading = reading
    if (reading.status !== 'committed') return
    shape = {
      filled: true,
      corrupt: reading.corrupt,
      quarantined: reading.quarantined,
      loaded: reading.loaded,
      modules: reading.modules,
    }
  }

  /** **THE READ — THE ONE PLACE IN THIS REALM THAT ASKS THE APP-STATE ROWS ANYTHING.** It is called from exactly two
   *  call sites and no third: the subscription's delivery body below (a delivery is a re-read) and the consumer's ONE
   *  stated boot fill. A THROWN ROUTE IS A STATEMENT ABOUT THE TRANSPORT, NOT ABOUT THE RECORD, so it answers `unread` and
   *  leaves the shape as it stood rather than emptying it. */
  async function fill(): Promise<ModuleClientReading> {
    const member = memberFor()
    if (member === null) return report({ status: 'absent', reason: 'no-module-member' })
    const getRoute = (member as { get?: unknown }).get
    if (typeof getRoute !== 'function') return report({ status: 'absent', reason: 'no-get-route' })
    let raw: unknown
    try {
      raw = await (getRoute as () => Promise<unknown>).call(member)
    } catch (error) {
      return report({ status: 'unread', reason: 'route-threw', detail: detailOf(error) })
    }
    let resolved: ReturnType<typeof committedOrDivergence>
    try {
      resolved = committedOrDivergence(raw)
    } catch (error) {
      return report({ status: 'unread', reason: 'answer-not-declared', detail: detailOf(error) })
    }
    if ('detail' in resolved) return report({ status: 'unread', reason: 'answer-not-declared', detail: resolved.detail })
    adopt(resolved.reading)
    return resolved.reading
  }

  /** A READING THAT FILLS NOTHING IS STILL THE LAST READING — the shape keeps what it last read, and the statement is held so
   *  a caller can tell "nothing has answered" from "the last answer was unreadable". */
  function report(reading: ModuleClientReading): ModuleClientReading {
    lastReading = reading
    return reading
  }

  return {
    shape(): ModuleShape {
      // A FRESH COPY OF THE TWO LISTS, so no caller can move the shape the next delivery replaces (`view-client.ts`'s
      // view-client's fresh-value reason, applied to the two arrays the pane paints).
      return { filled: shape.filled, corrupt: shape.corrupt, quarantined: [...shape.quarantined], loaded: [...shape.loaded], modules: [...shape.modules] }
    },

    fill,

    subscribe(handler: (reading: ModuleClientReading) => void): ModuleSubscription {
      const noop = (): void => undefined
      const member = memberFor()
      if (member === null) return { subscribed: false, reason: 'no-module-member', release: noop }
      const changedRoute = (member as { onChanged?: unknown }).onChanged
      if (typeof changedRoute !== 'function') return { subscribed: false, reason: 'no-changed-route', release: noop }
      let withdrawn: unknown
      try {
        withdrawn = (changedRoute as (h: () => void) => unknown).call(member, () => {
          // **THE DUTY, AND THE WHOLE POINT OF THIS FILE: THE READ SITS INSIDE THE LISTENER.** The push carries no value,
          // so the only correct answer to it is a fresh `fill()`; the answer REPLACES the shape and the caller is handed
          // that reading. A handler's own throw stops at the handler, and a read that somehow rejected is caught for the
          // same reason (`fill` itself is total, so that arm is defence and not a path any arm below relies on).
          void fill().then(
            (reading) => {
              try {
                handler(reading)
              } catch {
                /* the caller's handler, the caller's error */
              }
            },
            () => undefined,
          )
        })
      } catch {
        return { subscribed: false, reason: 'register-threw', release: noop }
      }
      const bridgeWithdrawal = typeof withdrawn === 'function' ? (withdrawn as () => void) : noop
      return {
        subscribed: true,
        reason: null,
        release: () => {
          try {
            bridgeWithdrawal.call(member)
          } catch {
            /* a withdrawal that threw has still withdrawn nothing further; it never escapes here */
          }
        },
      }
    },

    adopt,

    reading(): ModuleClientReading | null {
      return lastReading
    },
  }
}
