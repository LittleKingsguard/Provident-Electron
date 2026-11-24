// src/shared/module-channels.ts — THE CHANNEL'S DATA, AND NOTHING ELSE (`docs/L3/module-channel/design.md` §2).
//
// One message with TWO kinds and no third: a write turn's envelope, and the registration frame that carries a
// module's client source as a STRING. The client's own store act travels as a request/answer envelope of its own —
// NOT a ChannelMessage kind and NOT the shared `RpcRequest` — so the one `S-12` member carries both directions and
// `RpcMethod` gains nothing (`C-15`, `D-307`, `D-311`). No behaviour, no store import, no `src/main/**` import.

/** The five arms `C-2` fixes, and no sixth (`design.md` §5). */
export type ChannelOutcome = 'return' | 'passthrough' | 'empty' | 'threw' | 'refused'

/** Only the two CHANNEL-side refusals ride an entry; a client-registration refusal is the proxy's, not an entry's. */
export type ChannelRefusal = 'main-half-threw' | 'not-transport-safe'

/** ONE entry per listener that spoke (`ASM-MC-5`: `address` is the WRITE's, for the prefix relation). */
export interface ChannelEntry {
  readonly turn: number
  readonly module: string
  /** The declaration's ONE handle: client-keyed when it names a client half, address-keyed otherwise (`C-3`). */
  readonly listener: string
  readonly outcome: ChannelOutcome
  readonly address?: readonly string[]
  readonly data?: unknown
  readonly refusal?: ChannelRefusal
}

/** The message's TWO kinds and no third (`C-15`). */
export type ChannelMessage =
  | { readonly kind: 'write-turn'; readonly turn: number; readonly entries: readonly ChannelEntry[] }
  | { readonly kind: 'registration'; readonly module: string; readonly client: string }

/** The data half of the store surface the client proxy exposes (`ASM-MC-1`, `design.md` §8). */
export type ClientStoreVerb =
  | 'read' | 'readLiteral' | 'readTiered' | 'write' | 'delete' | 'rollback'
  | 'constraints' | 'constraintOn' | 'constraintOff'

/** The client act's own envelope, NOT a ChannelMessage kind and NOT the shared RpcRequest (`C-15`). */
export interface StoreRequest { readonly id: number; readonly verb: ClientStoreVerb; readonly args: readonly unknown[] }
export interface StoreAnswer { readonly id: number; readonly answer: unknown }

/** ONE bridge member, two directions (`S-12`; `design.md` §2). The wire implements both ends. */
export interface ChannelTransportMain {
  push(message: ChannelMessage): void
  onRequest(handler: (request: StoreRequest) => Promise<StoreAnswer>): void
}
export interface ChannelTransportRealm {
  onMessage(handler: (message: ChannelMessage) => void): () => void
  request(request: StoreRequest): Promise<StoreAnswer>
}

/** A store entry this channel binds is a module declaration's; every other handle passes through unwrapped. */
export const MODULE_HANDLE_PREFIX = 'module:'
export const isModuleHandle = (handle: string): boolean => handle.startsWith(MODULE_HANDLE_PREFIX)

export const isWriteTurn = (m: ChannelMessage): m is Extract<ChannelMessage, { kind: 'write-turn' }> => m.kind === 'write-turn'
export const isRegistration = (m: ChannelMessage): m is Extract<ChannelMessage, { kind: 'registration' }> => m.kind === 'registration'
