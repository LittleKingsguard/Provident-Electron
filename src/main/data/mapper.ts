// src/main/data/mapper.ts — the store-status mapping and this module's fixed sentences
// (`signatures.md` §3; `interface.md` §2, §3; `guide §8.1, §8.2, §8.3`). The mapping is ONE table,
// closed against the package's twenty-status set plus its escape arm: a status outside the mapped
// set is never read as success — it answers `store-refused` carrying that status verbatim (G8).
//
// No sentence here carries a reversal word: nothing on this surface reverses, replays or repairs
// a change (D-12; G4).

import type { DataLedger, DataPath, DataRefusalReason } from './types.js'

/** The module's fixed sentences, one per reason word (`interface.md` §3). */
const SENTENCES: Record<DataRefusalReason, string> = {
  'malformed-arguments': 'the arguments are not the members this tool declares',
  'root-not-writable': 'the empty address names the whole register, which is readable and never writable',
  'volatile-path':
    "the first segment names a volatile tier ('mem.', 'temp.' or 'secure.') and this surface holds the durable profile only",
  'cursor-unknown':
    'the requested cursor lies outside the change window this process retains; re-anchor from the floor it carries',
  'store-unreachable':
    "the profile's file name cannot be occupied here, so no store stands behind this answer and nothing was created",
  'address-malformed': 'the address is outside the domain the store walks',
  'parent-absent': 'the parent of this address does not stand, and a write never creates one',
  'container-kind-conflict': 'a container of another kind stands at this address, and the store never converts one',
  'value-not-admitted': 'the value is outside the tree the store admits at its boundary',
  'write-failed': 'the file-tier save did not land',
  'store-refused': 'the store refused this call with a status outside the set this module maps',
}

/** The fixed module sentence for one reason word. */
export function sentence(reason: DataRefusalReason): string {
  return SENTENCES[reason]
}

/** Every store status this module can meet, and the one word it answers with (`signatures.md` §3).
 *  Anything absent from this table is the escape arm: `store-refused`, status verbatim. */
const REASONS: Record<string, DataRefusalReason> = {
  AddressMalformed: 'address-malformed',
  AddressNotFound: 'parent-absent',
  LeafHasNoDownstream: 'parent-absent',
  ContainerKindConflict: 'container-kind-conflict',
  WriteParentNotLink: 'container-kind-conflict',
  ValueRefusedAtBoundary: 'value-not-admitted',
  ValueNotAdmitted: 'value-not-admitted',
  FileCommitFailed: 'write-failed',
  FilePathUnreachable: 'store-unreachable',
  ConstructionArgumentMissing: 'store-unreachable',
}

/** A caught value's `status`, where it carries a string one (`guide §8.3`: never assume it does). */
function statusOf(caught: unknown): string | null {
  if (caught === null || typeof caught !== 'object') return null
  const status = (caught as { status?: unknown }).status
  return typeof status === 'string' ? status : null
}

/** The store's own generated sentence, where the caught value carries one. */
function messageOf(caught: unknown): string | null {
  if (caught === null || typeof caught !== 'object') return null
  const message = (caught as { message?: unknown }).message
  return typeof message === 'string' ? message : null
}

/** Map one caught store refusal to the ledger this module answers with. A thrown value carrying
 *  no string `status` answers `store-refused` with `storeStatus` absent and a fixed sentence
 *  (`signatures.md` §3; ASM-L3-5). */
export function refusalLedger(caught: unknown, path?: DataPath): DataLedger {
  const status = statusOf(caught)
  const reason: DataRefusalReason = status === null ? 'store-refused' : (REASONS[status] ?? 'store-refused')
  const message = status === null ? sentence(reason) : (messageOf(caught) ?? sentence(reason))
  return {
    status: 'refused',
    reason,
    message,
    ...(status !== null && reason === 'store-refused' ? { storeStatus: status } : {}),
    ...(path !== undefined ? { path: [...path] } : {}),
  }
}

/** Classify a caught store READ refusal: a container to re-read, an absence to answer, or a ledger
 *  to return. `branch` means the caller then reads the branch (`design.md` §3; `guide §4`). */
export function readOutcome(
  caught: unknown,
): { kind: 'branch' } | { kind: 'absent' } | { kind: 'ledger'; ledger: DataLedger } {
  const status = statusOf(caught)
  if (status === 'ReadTargetIsBranch') return { kind: 'branch' }
  if (status === 'AddressNotFound' || status === 'LeafHasNoDownstream') return { kind: 'absent' }
  return { kind: 'ledger', ledger: refusalLedger(caught) }
}

/** The reading's refusal: the profile's one name cannot be occupied, so NO store is built, nothing
 *  is created and no byte moved — for all five operations, `journal` included (`design.md` §2;
 *  `behaviour.md` §9; ASM-L2-7). It carries no `storeStatus`, because no store answered. */
export function unreachableLedger(): DataLedger {
  return { status: 'refused', reason: 'store-unreachable', message: sentence('store-unreachable') }
}
