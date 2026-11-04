// src/renderer/security-client.ts — THE SECURITY RECORD'S SHAPE, HELD IN THIS REALM AND FILLED BY DELIVERIES (`D-106`).
//
// ═══ THE RULE THIS MODULE EXISTS TO SATISFY, IN THE USER'S OWN WORDS ═══
// **"The renderer does not ask state, it listens. If it needs to ask, it does so within a listener."** (`D-104`, read
// there as the ARCHITECTURE and not as a request for one more consumer.) Until this pass the secure crossing's record —
// `['operator-settings']` and the `mem` `['operator-exclusion']` pair the instance's one subscription has always bound —
// reached this realm ONE way: `SecurePanels.refresh()`'s read of `window.provident.security.get()` at REQUEST time, from
// the boot, from every authored click (`handleDomEvent`) and from the `dispatch()` seam. `D-104` classified that as the
// class the rule condemns and NAMED it as what remained; this module is what replaced it.
//
// ═══ THE CHAIN, IN `D-78`'s ORDER ═══
// a store act (`security.set`, `security.setExclusion` — one `commit` each) → the crossing's delivery (`onDelivery`, the
// body the instance has always had) → `IPC_SECURITY_CHANGED` → **this module's re-read** → the shape → the consumer
// (`SecurePanels`' security nodes: the status line, the token input, the six group toggles, the exclusion control and the
// journal-length input, all provident data in the ISOLATED pane graph). It holds THE DATA SHAPE and nothing else, and it
// carries the same three disciplines `module-client.ts`, `tabs-client.ts` and `view-client.ts` carry:
//
//   · **IT IS NOT A STORE** — no address space, no persistence, no constraint, no listener registration of its own beyond
//     the one subscription the consumer takes, and no accumulation: every `adopt` REPLACES the whole shape.
//   · **THE PUSH CARRIES A SIGNAL AND NEVER A VALUE** (`guide §6.4`; `D-82` clause 2), so the only correct answer to a
//     delivery is a fresh read, and a value this module answers is ALWAYS one it read — never one it remembered, never one
//     it composed. **ONE CHANNEL FOR THE RECORD AND THE PAIR**: the signal names neither address, so the realm re-reads
//     the whole record and cannot mistake one family's change for the other's.
//   · **EXACTLY ONE STATED BOOT READ** — `fill()` — because a boot's own store acts happened in `main()` before this realm
//     could subscribe and a cold profile changes nothing afterwards, so the first fill has no delivery to ride. **EVERY
//     LATER FILL IS A DELIVERY'S, and the read sits INSIDE the listener** (`subscribe`'s body below): there is no timer, no
//     poll, no interval, no re-read on render and no call site anywhere in this realm that asks at request time.
//
// **NO `src/main/` IMPORT BUT TWO TYPE-ONLY ONES, AND NO `provident-storeroom` IMPORT**: the renderer bundle is a browser
// bundle. The two types it borrows — the gate's closed pair and the tier-4 refusal — are erased at build exactly as the
// pane's own type-only imports of them are, and the bridge is narrowed structurally by a LOCAL type (the `tabs-client.ts`
// precedent), because `window.provident.security` must stay OPTIONAL at the ambient declaration
// (`src/renderer/secure-panels.ts`) and a realm with no bridge at all — the node suite's layout-less shim, a plain page, an
// older preload — is the declared ABSENT case rather than a `ReferenceError`. Nothing here throws on any arm, so no caller
// needs a `try`.

import type { ExclusionState } from '../main/security.js'
import type { Tier4ClosedRefusal } from '../main/settings-surface/index.js'

/** **THE READING'S COMMITTED ARM — `IPC_SECURITY_GET`'s declared answer, member for member**: the two durable members the
 *  record has always carried, the operator's journal cap where one stands, and the two additive members the two channels
 *  deliver (`exclusion` from the pair, `read` from the tier-4 arm). It is required member for required member, so an answer
 *  carrying a partial record reaches the caller as `unread` rather than as a shape derived from it. */
export interface SecurityCommittedReading {
  readonly status: 'committed'
  readonly token: string | null
  readonly enabled: readonly string[]
  readonly maxJournalLength?: number
  readonly exclusion: ExclusionState
  readonly read: Tier4ClosedRefusal | null
}

/** **THE CLIENT'S READING — the committed arm plus the TWO STATEMENTS this module can make and must never hide**: the
 *  member is not there (`absent`) and the route did not answer (`unread`). The route has no `refused` arm (a record's
 *  commit is the crossing's and its refusal is the WRITE's answer, never `IPC_SECURITY_GET`'s), so those two arms are the
 *  whole of what stands beside `committed`. No arm throws, so `reading()`/`fill()` are total. */
export type SecurityClientReading =
  | SecurityCommittedReading
  | { readonly status: 'absent'; readonly reason: 'no-security-member' | 'no-get-route' }
  | { readonly status: 'unread'; readonly reason: 'route-threw' | 'answer-not-declared'; readonly detail: string | null }

/** **THE SHAPE — WHAT THE CONSUMER PAINTS.** `filled` is the honest statement of whether any delivery or the one boot read
 *  has answered yet: `false` means the members are the declared empty pair because NOTHING HAS BEEN READ, never because a
 *  store said so — which is the pane's own `cfg.exclusion === null` discipline (`D-vi`), carried up one level. `exclusion`
 *  and `read` are `null` before the first answer for the same reason: nothing is fabricated about a record the realm has
 *  not heard from. */
export interface SecurityShape {
  readonly filled: boolean
  readonly token: string | null
  readonly enabled: readonly string[]
  readonly maxJournalLength?: number
  readonly exclusion: ExclusionState | null
  readonly read: Tier4ClosedRefusal | null
}

/** THE SUBSCRIPTION'S OWN ANSWER — the `tabs-client` shape: whether it installed, why it did not, and a withdrawal that is
 *  always callable and never throws. */
export interface SecuritySubscription {
  readonly subscribed: boolean
  readonly reason: 'no-security-member' | 'no-changed-route' | 'register-threw' | null
  readonly release: () => void
}

/** **THE BRIDGE MEMBER THIS CLIENT USES — TWO ROUTES AND NO THIRD.** `get` is the read; `onChanged` is the delivery. The
 *  client takes NO WRITE ROUTE AT ALL: a record write is the operator's act through the pane's authored handlers, and a
 *  client that could write would be a second authority beside them. Every answer is `unknown` on purpose: a bridge is a
 *  TRUST BOUNDARY, so a shape that arrived is checked before it is read. */
export interface SecurityClientBridge {
  get(): Promise<unknown>
  onChanged(handler: () => void): () => void
}

export interface SecurityClientOptions {
  /** The member to read through. OMITTED (and never `null`) means **read the ambient `window.provident.security` at each
   *  call**, which is what the app does and what a node test drives by installing (or not installing) a stub; `null`
   *  states the absent case on a realm where a member would otherwise be found. */
  readonly bridge?: SecurityClientBridge | null
}

/** **THE CLIENT — the shape, the one read, and the one subscription.** `fill()` is the read; `subscribe()` is the
 *  delivery's duty, and the only three members there are beside the pure `adopt`/`reading` statements. */
export interface SecurityClient {
  shape(): SecurityShape
  fill(): Promise<SecurityClientReading>
  subscribe(handler: (reading: SecurityClientReading) => void): SecuritySubscription
  adopt(reading: SecurityClientReading): void
  reading(): SecurityClientReading | null
}

/** The shape before anything has answered: the empty pair, `filled: false`, and the two additive members at the `null` the
 *  pane's `D-vi` reading gives them. **IT IS NOT A SUBSTITUTION AT THE READ**: a consumer that has heard nothing paints
 *  nothing about the record, which is exactly what the pane did with `refresh()`'s never-answered arm. */
const emptyShape = (): SecurityShape => ({ filled: false, token: null, enabled: [], exclusion: null, read: null })

/** THE AMBIENT MEMBER, READ AT CALL TIME — never at construction, so a bridge installed after the client was built is still
 *  found, and a realm with no `window` at all is the absent case rather than a `ReferenceError`. TOTAL: every step is a
 *  `typeof` guard. */
function ambientSecurityMember(): unknown {
  if (typeof window === 'undefined') return null
  const provident = (window as unknown as { provident?: unknown }).provident
  if (provident === null || provident === undefined || typeof provident !== 'object') return null
  const member = (provident as { security?: unknown }).security
  return member === null || member === undefined ? null : member
}

const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'

/** ONE STRING LIST, admitted whole — a member that is not an array of strings makes the answer undeclared rather than
 *  partially read, because the list IS the six group toggles' state and a partial one paints a half-granted gate. */
function stringsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  return held.every((member) => typeof member === 'string') ? (held as readonly string[]) : null
}

/** THE PAIR'S ONE WORD, admitted by its own domain — the store's closed pair and nothing wider: an unknown word would be
 *  painted as `· MCP: enabled` by the pane's `=== 'mcp-disabled'` test, which is a state the carrier never supplied. */
function exclusionIn(held: unknown): ExclusionState | null {
  return held === 'mcp-enabled' || held === 'mcp-disabled' ? held : null
}

/** THE TIER-4 REFUSAL, admitted by its token — the pane paints the TOKEN alone (`· refused: tier4-closed`), never the
 *  message, so a refusal-shaped object carrying the closed reason is the whole of what this module must recognise. The
 *  `'absent'` arm is the declared `null` ("the last observed read was performed") and is NOT a divergence. */
function refusalArm(held: unknown): { readonly refusal: Tier4ClosedRefusal | null } | { readonly detail: string } {
  // `undefined` IS THE `null` ARM AT BOTH DECLARATIONS THAT MATTER: the pane's own `cfg.read` is declared `Tier4ClosedRefusal
  // | null | undefined` and its `syncConfig` reads a missing member as "the last observed read WAS performed" (`D-vi`), so a
  // carrier that omits the member has made the declaration's own statement and not a divergent one.
  if (held === null || held === undefined) return { refusal: null }
  if (!isObject(held) || Array.isArray(held)) return { detail: 'read is neither null nor an object' }
  if (held['status'] !== 'refused' || typeof held['reason'] !== 'string' || typeof held['message'] !== 'string') {
    return { detail: 'read is not the tier-4 refusal' }
  }
  return { refusal: held as unknown as Tier4ClosedRefusal }
}

/** `IPC_SECURITY_GET`'s ONE ANSWER, CHECKED RATHER THAN ASSUMED. An answer that carries a member this module cannot read is
 *  `answer-not-declared` with the divergence named, never a shape derived from a partial record. */
function committedOrDivergence(raw: unknown): { readonly reading: SecurityCommittedReading } | { readonly detail: string } {
  if (!isObject(raw) || Array.isArray(raw)) return { detail: `answer is ${raw === null ? 'null' : typeof raw}` }
  const token = raw['token']
  if (token !== null && typeof token !== 'string') return { detail: 'token is neither a string nor null' }
  const enabled = stringsIn(raw['enabled'])
  if (enabled === null) return { detail: 'enabled is not a string array' }
  const heldCap = raw['maxJournalLength']
  if (heldCap !== undefined && !(typeof heldCap === 'number' && Number.isFinite(heldCap))) return { detail: 'maxJournalLength is neither a finite number nor absent' }
  const exclusion = exclusionIn(raw['exclusion'])
  if (exclusion === null) return { detail: 'exclusion is not one of the pair’s two words' }
  const refusal = refusalArm(raw['read'])
  if ('detail' in refusal) return { detail: refusal.detail }
  const reading: { status: 'committed'; token: string | null; enabled: readonly string[]; maxJournalLength?: number; exclusion: ExclusionState; read: Tier4ClosedRefusal | null } = { status: 'committed', token, enabled, exclusion, read: refusal.refusal }
  if (heldCap !== undefined) reading.maxJournalLength = heldCap
  return { reading }
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
export function createSecurityClient(options: SecurityClientOptions = {}): SecurityClient {
  let shape: SecurityShape = emptyShape()
  let lastReading: SecurityClientReading | null = null
  /** The member, at THIS call: an injected one where the caller supplied one (including `null`, the stated absent case),
   *  the ambient `window.provident.security` otherwise. */
  const memberFor = (): unknown => (options.bridge === undefined ? ambientSecurityMember() : options.bridge)

  function adopt(reading: SecurityClientReading): void {
    lastReading = reading
    if (reading.status !== 'committed') return
    const next: { filled: boolean; token: string | null; enabled: readonly string[]; maxJournalLength?: number; exclusion: ExclusionState | null; read: Tier4ClosedRefusal | null } = {
      filled: true,
      token: reading.token,
      enabled: reading.enabled,
      exclusion: reading.exclusion,
      read: reading.read,
    }
    if (reading.maxJournalLength !== undefined) next.maxJournalLength = reading.maxJournalLength
    shape = next
  }

  /** **THE READ — THE ONE PLACE IN THIS REALM THAT ASKS THE SECURITY RECORD ANYTHING.** It is called from exactly two
   *  call sites and no third: the subscription's delivery body below (a delivery is a re-read) and the consumer's ONE
   *  stated boot fill. A THROWN ROUTE IS A STATEMENT ABOUT THE TRANSPORT, NOT ABOUT THE RECORD, so it answers `unread` and
   *  leaves the shape as it stood rather than emptying it. */
  async function fill(): Promise<SecurityClientReading> {
    const member = memberFor()
    if (member === null) return report({ status: 'absent', reason: 'no-security-member' })
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
  function report(reading: SecurityClientReading): SecurityClientReading {
    lastReading = reading
    return reading
  }

  return {
    shape(): SecurityShape {
      // A COPY OF THE ONE LIST, so no caller can move the shape the next delivery replaces.
      const held: SecurityShape = { filled: shape.filled, token: shape.token, enabled: [...shape.enabled], exclusion: shape.exclusion, read: shape.read }
      return shape.maxJournalLength === undefined ? held : { ...held, maxJournalLength: shape.maxJournalLength }
    },

    fill,

    subscribe(handler: (reading: SecurityClientReading) => void): SecuritySubscription {
      const noop = (): void => undefined
      const member = memberFor()
      if (member === null) return { subscribed: false, reason: 'no-security-member', release: noop }
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

    reading(): SecurityClientReading | null {
      return lastReading
    },
  }
}
