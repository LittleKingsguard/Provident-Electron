// src/main/modules/handles.ts — the MAIN side's two spellings, and nothing else (`D-310`).
//
// ONE HANDLE PER DECLARATION, composed from the contract's `moduleHandle` and from nowhere else: no
// counter, no random id, no store-minted handle, no collision with a constraint id (`C-3`, `D-310`).
// `toolName` is the PUBLISHED name and is never minted here (`L2` §4 vs §11).
import { moduleHandle } from '../../shared/module-contract.js'

/** The key ONE declaration is held under: its address, written once and read by every side. */
export function addressKey(address: readonly string[]): string {
  return address.join('/')
}

/** The declaration's ONE handle — the store's own identity for the entry it holds (`C-3`), and the SAME
 *  identity the realm's `onDelivery` mints: **client-keyed when the declaration names a client half, address-keyed
 *  otherwise**, so a declaration's two halves never carry two handles (`C-3`, `D-307`). */
export function listenerHandle(module: string, declaration: { readonly address: readonly string[]; readonly client?: string }): string {
  return moduleHandle(module, declaration.client ?? addressKey(declaration.address))
}
