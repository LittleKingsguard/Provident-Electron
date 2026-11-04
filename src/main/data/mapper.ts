// src/main/data/mapper.ts — the store-status mapping and this module's fixed sentences
// (`signatures.md` §3; `interface.md` §2, §3; `guide §8.1, §8.2, §8.3`). The mapping is ONE table,
// closed against the package's twenty-status set plus its escape arm: a status outside the mapped
// set is never read as success — it answers `store-refused` carrying that status verbatim (G8).
//
// No sentence here carries a reversal word: nothing on this surface reverses, replays or repairs
// a change (D-12; G4).
//
// **AND A REFUSAL A STORE ANSWERED CARRIES THE ENTRIES THAT PRODUCED IT** (`D-107`, taking the residue
// `D-103` named): the package hands its refusal the same `{status, message, log, address}` shape it hands a
// passing act, so the list is FORWARDED here rather than discarded — through the seam's ONE declared reader,
// `commitLog`, and not through a `.log` read, because `D-103`'s narrowing is that no file under
// `src/main/data/` reads the member itself (`tests/integration/central-data/message-log.test.ts` `L-6` pins
// that, `mapper.ts` included). The refusal's own member is ENUMERABLE and the passing arm's is not — measured
// on the installed `1.9.2` — so the same accessor serves both and no second one is minted.

import { commitLog } from '../storeroom.js'

import type { DataLedger, DataPath, DataRefusalReason } from './types.js'

/** The module's fixed sentences, one per reason word (`interface.md` §3). */
const SENTENCES: Record<DataRefusalReason, string> = {
  'malformed-arguments': 'the arguments are not the members this tool declares',
  'root-not-writable': 'the empty address names the whole register, which is readable and never writable',
  'volatile-path':
    "the first segment names a volatile tier ('mem.', 'temp.' or 'secure.') and this surface holds the durable profile only",
  'declared-tier':
    "the address is a root that a crossing declares, so its tier is the family's and not the caller's",
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
 *  (`signatures.md` §3; ASM-L3-5).
 *
 *  **`log` IS FORWARDED WHERE THE PACKAGE HANDED ONE, AND ABSENT WHERE IT DID NOT** (`D-107`). The store's
 *  refusal arm carries `{status, message, log, address}` on every arm measured — a `ConstraintPassRefused`
 *  from a family's value arm answers the pair's `constraint-check` and the refusal's own `outcome`, and a
 *  refusal composed before any pass (`ParentAnchorMonotonicityViolation`, `AddressMalformed`) carries `[]`
 *  — so `commitLog` never answers `null` for a thrown store refusal and the two arms the `??` would fold are
 *  kept apart by the spread below. **THE ASSIGNMENT IS UNCONDITIONAL AND THE SPREAD IS NOT**: a caught value
 *  that is not a package refusal at all (a `TypeError` from a malformed call) carries no list, and answering
 *  `log: []` for it would say a pass ran and appended nothing. So the member appears exactly where a list
 *  exists, which is the same rule `storeStatus` follows one member below it. */
export function refusalLedger(caught: unknown, path?: DataPath): DataLedger {
  const status = statusOf(caught)
  const reason: DataRefusalReason = status === null ? 'store-refused' : (REASONS[status] ?? 'store-refused')
  const message = status === null ? sentence(reason) : (messageOf(caught) ?? sentence(reason))
  const log = commitLog(caught)
  return {
    status: 'refused',
    reason,
    message,
    ...(log !== null ? { log } : {}),
    ...(status !== null && reason === 'store-refused' ? { storeStatus: status } : {}),
    ...(path !== undefined ? { path: [...path] } : {}),
  }
}

/** Classify a caught store READ refusal: a container to re-read, an absence to answer, or a ledger
 *  to return. `branch` means the caller then reads the branch (`design.md` §3; `guide §4`).
 *
 *  **`TierNotFound` IS AN ABSENCE AND NOT A FAULT** (`D-101`; `guide §5.1`: *"a read narrowed to a tier the key
 *  no longer holds refuses `TierNotFound`"*). While the tier was nobody's, no arm of this module could ask a
 *  narrowed read and the status stayed in the escape arm; now that a caller may name the tier, a reading that
 *  finds nothing AT THAT TIER is the same answer as a reading that finds nothing: `absent`. Serving it as
 *  `store-refused` would report a lawful question as a store fault — and `delete`'s own probe answers the empty
 *  receipt off this arm, so the two verbs would disagree about one absence if it did not. */
export function readOutcome(
  caught: unknown,
): { kind: 'branch' } | { kind: 'absent' } | { kind: 'ledger'; ledger: DataLedger } {
  const status = statusOf(caught)
  if (status === 'ReadTargetIsBranch') return { kind: 'branch' }
  if (status === 'AddressNotFound' || status === 'LeafHasNoDownstream' || status === 'TierNotFound') return { kind: 'absent' }
  return { kind: 'ledger', ledger: refusalLedger(caught) }
}

/** The reading's refusal: the profile's one name cannot be occupied, so NO store is built, nothing
 *  is created and no byte moved — for all five operations, `journal` included (`design.md` §2;
 *  `behaviour.md` §9; ASM-L2-7). It carries no `storeStatus`, because no store answered. */
export function unreachableLedger(): DataLedger {
  return { status: 'refused', reason: 'store-unreachable', message: sentence('store-unreachable') }
}
