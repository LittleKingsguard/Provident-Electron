# L3 — `module-channel`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `module-channel` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW**: `docs/L2/module-channel/interface.md` rev 1 and `docs/L3/module-channel/design.md` rev 1 fix the I/O surface and the structure; this page fixes the declarations under them (`D-1`, `D-306`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§10; `L2` §0–§9; `docs/L2/module-system/interface.md` §4/§9; `docs/L3/module-system/design.md` §4/§6; `src/shared/module-contract.ts` (`StoreSurface`, `ListenerBinding`, `RegistrationFrame`, `Refusal`, `RefusalName`); `D-307`, `D-310`, `D-311`, `D-312`, `D-105` · **A stub is a DECLARATION and never a body**: every `declare` below is L4's to fill (D-3)
- **Read order:** §1 the message file → §2 the main side → §3 the realm side → §4 the invariants a stub reader must not lose

## 1. `src/shared/module-channels.ts` — the data, and the seam's two ends

```ts
/** The five arms C-2 fixes, and no sixth (L3 design §5). */
export type ChannelOutcome = 'return' | 'passthrough' | 'empty' | 'threw' | 'refused'
/** Only the two CHANNEL-side refusals ride an entry; a client-registration refusal is the proxy's, not an entry's. */
export type ChannelRefusal = 'main-half-threw' | 'not-transport-safe'

/** ONE entry per listener that spoke (`ASM-MC-5`: `address` is the WRITE's, for the prefix relation). */
export interface ChannelEntry {
  readonly turn: number
  readonly module: string
  readonly listener: string // the declaration's ONE handle, client-keyed when it names a client half (`C-3`)
  readonly outcome: ChannelOutcome
  readonly address?: readonly string[]
  readonly data?: unknown
  readonly refusal?: ChannelRefusal
}

/** The message's TWO kinds and no third (C-15). */
export type ChannelMessage =
  | { readonly kind: 'write-turn'; readonly turn: number; readonly entries: readonly ChannelEntry[] }
  | { readonly kind: 'registration'; readonly module: string; readonly client: string }

/** The data half of the store surface the client proxy exposes (`ASM-MC-1`, L3 design §8). */
export type ClientStoreVerb =
  | 'read' | 'readLiteral' | 'readTiered' | 'write' | 'delete' | 'rollback'
  | 'constraints' | 'constraintOn' | 'constraintOff'

/** The client act's own envelope, NOT a ChannelMessage kind and NOT the shared RpcRequest (C-15). */
export interface StoreRequest { readonly id: number; readonly verb: ClientStoreVerb; readonly args: readonly unknown[] }
export interface StoreAnswer { readonly id: number; readonly answer: unknown }

/** ONE bridge member, two directions (`S-12`; L3 design §2). The wire implements both ends. */
export interface ChannelTransportMain {
  push(message: ChannelMessage): void
  onRequest(handler: (request: StoreRequest) => Promise<StoreAnswer>): void
}
export interface ChannelTransportRealm {
  onMessage(handler: (message: ChannelMessage) => void): () => void
  request(request: StoreRequest): Promise<StoreAnswer>
}

export const isWriteTurn = (m: ChannelMessage): m is Extract<ChannelMessage, { kind: 'write-turn' }> => m.kind === 'write-turn'
export const isRegistration = (m: ChannelMessage): m is Extract<ChannelMessage, { kind: 'registration' }> => m.kind === 'registration'
```

## 2. `src/main/module-channel/` — the facade, the writer, and the one composition

```ts
import type { ListenerBinding, RegistrationFrame, StoreSurface } from '../../shared/module-contract.js'
import type { ChannelEntry, ChannelMessage, ChannelTransportMain, StoreAnswer, StoreRequest } from '../../shared/module-channels.js'

/** ONE declaration's store entry, as the binding holds it (L3 design §3). */
export interface BindingRecord {
  readonly module: string
  readonly handle: string
  readonly address: readonly string[]
  readonly hasMain: boolean
  /** The body the store holds: the channel's wrapper, never the module's function alone. */
  readonly body: (address: readonly string[]) => unknown
}

/** The turn: the receipt, the settled edge, the firing record, the flush (L3 design §4). */
export interface Writer {
  /** The facade's delivering verbs call this and answer the store's own receipt or Promise. */
  act(verb: 'write' | 'delete' | 'addConstraint', args: readonly unknown[]): unknown
  /** The message of the turn just closed, or null where the act delivered nothing (an empty turn is lawful). */
  flush(turn: number): ChannelMessage | null
}

/** The facade: the SAME fifteen members over the app's ONE store (C-16, L3 design §3). */
export function createStoreFacade(store: StoreSurface, writer: Writer, bindings: Map<string, BindingRecord>): StoreSurface

export interface ModuleChannelOptions {
  readonly store: StoreSurface
  readonly transport: ChannelTransportMain
}
export interface ModuleChannel {
  /** The fifteen-member surface every consumer of the app's store is handed (L3 design §3). */
  readonly surface: StoreSurface
  /** The executor's `ModuleHost.sendRegistration` is wired to this in `main.ts` (L2 §9). */
  pushRegistration(frame: RegistrationFrame): void
}
export function createModuleChannel(options: ModuleChannelOptions): ModuleChannel
```

## 3. `src/renderer/module-channel-client.ts` — the realm's receipt, fan-out and proxy

```ts
import type { Refusal, StoreSurface } from '../../shared/module-contract.js'
import type { ChannelEntry, ChannelMessage, ChannelTransportRealm, StoreRequest } from '../../shared/module-channels.js'

export interface ModuleChannelClientOptions {
  readonly transport: ChannelTransportRealm
  /** `module-system`'s client-source evaluation: `CapabilityRouter.registerModule(module, source)` (L3 module-system §6). */
  readonly evaluate: (frame: { readonly module: string; readonly client: string }) => void
  /** `module-system`'s ONE delivery entry, contained per handle; `ASM-MC-6` fires it with the ENTRY. */
  readonly fire: (handle: string, entry: ChannelEntry) => void
  /** Under ONE realm the store is realm-side and the client proxy is the store itself (C-13, S-13b). */
  readonly store?: StoreSurface
}
export interface ModuleChannelClient {
  /** The client ctx's `store` member: the data verbs, the registration verbs refused (ASM-MC-1). */
  readonly store: StoreSurface
  /** Registers both kinds on the transport; the returned function withdraws it. */
  start(): () => void
}
export function createModuleChannelClient(options: ModuleChannelClientOptions): ModuleChannelClient

/** `ASM-MC-1`'s refusal: the six registration verbs answer this by name, as a VALUE (D-105). */
export type ClientRegistrationRefusal = Refusal & { readonly reason: 'client-registration-refused' }
/** The two realms' proxy: a `StoreRequest` over the transport, or the store itself under one realm. */
export function createClientStore(source: { readonly transport: ChannelTransportRealm } | { readonly store: StoreSurface }): StoreSurface
```

## 4. The invariants a stub reader must not lose

- **ONE facade, ONE writer, ONE transport, ONE store**: `createModuleChannel` composes them and constructs no second store; the facade's fifteen members are `C-16`'s (L3 design §3, `D-310`, `C-13`).
- **The receipt is read BY NAME and never copied**: `returnedValues`, `bodyFailures` and `discarded` are non-enumerable own getters, and a spread loses every body that spoke (`D-310`).
- **The turn is marked at the SETTLED answer, and only delivering acts mark one**: `write`, member `delete`, registration, boot and reversal; a read marks none (L3 design §4, `C-2`).
- **The client proxy's registration verbs are refused, not forwarded**: `client-registration-refused`, as a value; **`RefusalName` in `src/shared/module-contract.ts` gains that name in the same landing**, and the edit is `module-system`'s (`ASM-MC-1`, `D-105`).
- **The client half is fired with the ENTRY**, and **`module-system`'s `fire(handle, data, address)` is re-grained to `fire(handle, entry)`** in the same landing — a cross-seat L4 edit declared there and not here (`ASM-MC-6`, L2 §3, `M-11`).
- **No second bridge member, no `RpcMethod`, no third `ChannelMessage` kind**: the store act is the channel's own `StoreRequest`/`StoreAnswer` over the one `S-12` member (`ASM-MC-3`, `C-15`).
- **No `src/**` byte is declared here**: the three file groups, the boot's one-facade pass and the two cross-seat edits (`RefusalName`, `fire`) are L4's and their seats' (D-3, `D-301`/`D-302`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "module-channel", "writes": [{"path": "docs/L3/module-channel/signatures.md", "d": "D-307", "why": "this page, rev 1 NEW: the message data, the main facade/writer composition and the realm client's stubs, with the client proxy's refusal, the entry payload and the one transport seam — no `src/**` byte"}]}
```
