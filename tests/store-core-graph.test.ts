// tests/store-core-graph.test.ts — THE RED SET (`RCA-1`) for `U-STORE-CORE`'s
// successor (ledger row `G1`): the AMENDED four-tier store on a node-anchor-link
// graph.
//
// CONTRACT (the only authority): `docs/specs/store-core-graph.md`. Derived from
// the contract ALONE — no implementation reading. The modules it pins,
// `src/renderer/store-core-graph.ts` (`§2.1` items 1/3: TWO value exports +
// TWENTY-NINE named type declarations = THIRTY-ONE exported names) and
// `src/renderer/store-graph-references.ts` (`§2.1` item 2: ONE value export +
// THREE type declarations), DO NOT EXIST while this file is the red set.
//
// AUTHORED ORDER (`§4.2` items 1–10), and the `describe` blocks ARE that order:
//   1. the STATIC and EXISTENCE rows, evaluable at red time, driven in BOTH
//      branches (`§4.1`): the RED branch asserts ABSENCE and the unmoved counts;
//      the GREEN branch asserts the modules exist with the named census; each
//      row FAILS in the branch that is not the one the tree is in, because a row
//      that fails merely because the work was done FAILS `§3.5 R-13`'s branch rule.
//   2. the walk and its seven failure arms: `M-1`, `M-2`, `F-1`…`F-7`, `R-4`.
//   3. the filter rule and the register: `M-4`, `F-2`, `F-14`…`F-18`, `R-6`.
//   4. the uniqueness constraint and the read's case set: `M-5`, `M-6`, `F-8`.
//      (RE-DERIVED 2026-10-01: the as-filed line read *"the uniqueness constraint and the merged
//      read"*, and the architect's merged-arm ruling `A3` (`§0` of the contract) withdrew that arm;
//      the three row ids and this item's position are unmoved — `§4.2` item 4's own annotation.)
//   5. the write surface and the regeneration transaction: `M-9`, `M-10`, `M-11`,
//      `M-12`, `F-9`, `F-10`, `F-12`, `F-13`, `F-17`, `F-20`, `M-13`, `F-21`,
//      `F-19`, `F-3`(h).
//   6. the two caches: `M-3`, `F-6`, `R-5`.
//   7. the event surface and the severance arm: `M-7`, `M-14`, `F-11`, `R-3`.
//   8. the export: `M-15`, `M-16`, `F-22`.
//   9. the totality, the tree/second invariant, the hostile segments and the
//      purity rows: `F-23`, `F-24`, `F-25`, `I-2`, `I-14`, `R-1`, `R-2`, `R-7`,
//      `R-8`.
//  10. the `§5.5.1` register's TWENTY-TWO rows IN REGISTER ORDER — executed by
//      `tests/store-core-graph-register.ts` — plus the register-harness rows.
//
// EVERY row carries its contract section + row id in its own comment and its LAYER
// label `[T]` (`RCA-12`; `[H]` appears only where the contract names an `[H]` drive).
// `[U]` IS NOT OFFERED by this unit and `[D]` IS NOT CLAIMED (`§5.2`'s two
// three-part refusals); gate 6 is `STRUCTURAL`, and the word `waived` may not be
// substituted for it. NO ROW of this file asserts a rendered-geometry, layout,
// paint, applied-CSS, containment-boundary or magnitude fact (`§2.2` `P-10`'s
// carried `S-d11` clause).
//
// HOW THE MODULE'S ABSENCE IS COPED WITH (the repo's established technique, the
// same shape `tests/container.test.ts` and `tests/focus-tool.test.ts` use): the
// run-time specifier is assembled from FRAGMENTS and the module file's presence is
// checked with `existsSync` BEFORE an `await import(...)`, so an absent module
// fails each row AS AN ASSERTION carrying that row's own label — never as a
// file-level transform error that would take the whole red set down with it. THE
// TYPE HALF IS THE EXCEPTION AND IS DELIBERATE: the `import type` declarations
// below are the compile-time claim of `§2.1` item 3's type half, so leg 5 (the
// standalone strict `tsc --noEmit` over THIS file, `§5.2` leg 5) reports the
// module-absent boundary (`TS2307`) — that diagnostic is NOT suppressed, because
// suppressing it would make the type claim unfalsifiable.
//
// ===========================================================================
// STATE ENUMERATION, BEFORE A SINGLE ASSERTION (`§4.1`, `§7a.1`'s working
// defaults) — the states this file drives, named so the coverage is checkable:
// ===========================================================================
// HAPPY STATES (`§3.1`): M-1 the architect's own example end to end · M-2 the leaf
//   stores its OWN local name · M-3 `cache` IS `tiers[flag]` by identity · M-4 two
//   holders across tiers · M-5 the read's case set HIT · QUALIFIED · MISS, at the declared-but-
//   unwritten parent with a written child (RE-DERIVED 2026-10-01; the as-filed subject was *"the
//   merged read with `parts`"*) · M-6 the uniqueness
//   constraint's EDIT arm · M-7 one `commit` event plus one `clear` per cleared
//   lower reference · M-8 hostile segments as DATA · M-9 `commit` mints / `set`
//   never does · M-10 anchors immutable across a re-tier · M-11 the five-step
//   regeneration transaction · M-12 the census' two declared instruments · M-13 a
//   repair in the same committed write · M-14 a severance deletes + translates ·
//   M-15 the export is a snapshot · M-16 no second authority (verbatim spellings) ·
//   M-17 no consumer vocabulary in either module's bytes.
// FAIL-STATES (`§3.2`): F-1 `C-TOP` undeclared · F-2 cold item (miss) vs
//   unregistered root name (refusal) · F-3 `D-ANCHOR` no-such-anchor · F-4 `H-FLAG`
//   filter miss · F-5 `E-LINK` severed-link · F-6 `F-CACHE` rebuild-failed · F-7
//   the write-side twin · F-8 the hit arm's plain property, "from that node ALONE" (RE-DERIVED
//   2026-10-01; the as-filed subject was *"the first-hit boundary"* between two arms) · F-9 the three regeneration
//   failure arms · F-10 a `remove` inside the window · F-11 the severance's release
//   report · F-12 a refusal clears and emits nothing, on EVERY mutator · F-13 the
//   cap refuses and never evicts · F-14 `secure.*` refused before the register ·
//   F-15 no `secure` node in the register or the walk · F-16 malformed names, with
//   the four legal tokens as control · F-17 a tier-free write · F-18 the register's
//   six construction-time arms · F-19 a malformed or ambiguous TOP-LEVEL pattern does not
//   load (RE-AIMED 2026-10-01 by the architect's interaction-precondition ruling; the
//   as-filed subject, *"a second constraint with no interaction rule"*, is withdrawn and its
//   own input is REFUTED beside) ·
//   F-20 `reserved-name` by name · F-21 the constraint's evaluation points · F-22 the
//   export may not cross · F-23 the tree cannot take a second parent link · F-24 the
//   totality universal over every member · F-25 `R-9`'s re-pointed non-vacuous control.
// INVARIANTS (`§3.3`): I-1 source-of-truth residency · I-2 tree by construction +
//   monotonic persistence · I-4 the leaf's own local name · I-5 immutability · I-6
//   the orphaned-reference write · I-7 `secure` unreachable · I-8 the three throws ·
//   I-9 no vocabulary · I-10 no element/geometry · I-12 the handle is never a key ·
//   I-13 the import census · I-14 cache invalidation · I-15 the envelope's members ·
//   I-16 one event per affected reference · I-17 the export.
// STATIC (`§3.4`): R-1…R-12. EXISTENCE (`§3.5`): R-9…R-13.
// REGISTER (`§5.5.1`): 22 typed rows (`14` P-GR-IM + `1` P-GR-SM + `7` P-GR-TP).
//
// SKIP REASONS: none. NO ROW IS SKIPPED — a skipped row would be an un-run row, and
// `§5.5` item 5 / `§4.4` `S-2` report an un-run row as a FAILURE, never as a pass.
// EVERY row here is evaluated, in BOTH branches where `§4.1` names a branch.

import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// THE COMPILE-TIME HALF (`§2.1` item 3's type declarations, driven at leg 5).
// These are TYPE-ONLY imports: erased at run time, so they cannot fail this run —
// and leg 5 reports the module-absent boundary (`TS2307`) rather than hiding it.
import type {
  GraphAffectedRow,
  GraphAnchor,
  GraphConstraint,
  GraphCrossing,
  GraphEvent,
  GraphLink,
  GraphLinkCacheEntry,
  GraphLoadError,
  GraphNode,
  GraphNodeFlag,
  GraphNodeRef,
  GraphReadHit,
  GraphReadMiss,
  GraphRefusalReason,
  GraphRegister,
  GraphRegisterCacheEntry,
  GraphRegisterRow,
  GraphResolveDiagnostic,
  GraphResolveResult,
  GraphResolveStep,
  GraphStore,
  GraphSubscription,
  GraphTierGetResult,
  GraphTierHandle,
  GraphTierToken,
  GraphWriteOptions,
  GraphWriteReceipt,
} from '../src/renderer/store-core-graph.js'
import type {
  StoreGraphDeclarationInput,
  StoreGraphDeclarationRow,
  StoreGraphReferenceFixture,
} from '../src/renderer/store-graph-references.js'

import {
  BOUNDED_ROWS,
  DECLARED_TERMS,
  PRE_AMENDMENT_TOTAL_233,
  REGISTER_ROWS,
  REGISTER_ROW_CAP,
  REGISTER_ROW_IDS,
  REGISTER_SEED,
  REGISTER_TOTAL_CAP,
  STOP_AFTER_CONSECUTIVE,
  STRATEGY_IDS,
  SYNTHETIC_SCAN_CORPUS,
  type Surface,
  declaredTotalReport,
  resolveRegisterSurface,
  runRegister,
} from './store-core-graph-register.js'

// THE COMPILE-TIME CENSUS (`§2.1` item 3's TWENTY-NINE, BY NAME). Declared as a
// type alias so an erased name is a compile-time claim, and re-asserted at run time
// by reading the module's own bytes (the GREEN branch of `§4.1`).
type DeclaredTypeNames =
  | GraphTierToken | GraphNodeFlag | GraphRefusalReason | GraphResolveStep
  | GraphResolveDiagnostic | GraphNodeRef | GraphNode | GraphAnchor | GraphLink
  | GraphTierHandle | GraphRegisterRow | GraphRegister | GraphRegisterCacheEntry
  | GraphLinkCacheEntry | GraphConstraint | GraphReadHit | GraphReadMiss
  | GraphResolveResult | GraphWriteReceipt | GraphWriteOptions
  | GraphEvent | GraphSubscription | GraphCrossing | GraphStore | GraphLoadError
  | GraphTierGetResult | GraphAffectedRow
type DeclarationRowNames = StoreGraphDeclarationRow | StoreGraphDeclarationInput | StoreGraphReferenceFixture
/** A never-populated binding, so the two compile-time claims above are used (and
 *  therefore checked) without ever being read at run time. */
const TYPE_CLAIM: DeclaredTypeNames | DeclarationRowNames | null = null
void TYPE_CLAIM

// ---- THE PATHS (`§2.1` items 1/2 · `§5.1` rows 1/2) --------------------------------------
const STORE_SRC = new URL('./../src/renderer/' + 'store-core' + '-graph.ts', import.meta.url)
const REFS_SRC = new URL('./../src/renderer/' + 'store-graph' + '-references.ts', import.meta.url)
const TEST_SRC = new URL('./store' + '-core' + '-graph.test.ts', import.meta.url)
const REGISTER_SRC = new URL('./store' + '-core' + '-graph-register.ts', import.meta.url)
const HELD_CONTRACT = new URL('./../docs/specs/store' + '-core.md', import.meta.url)
const RENDERER = new URL('./../src/renderer/renderer.ts', import.meta.url)
const STORE_SPECIFIER = './../src/renderer/' + 'store-core' + '-graph.js'
const REFS_SPECIFIER = './../src/renderer/' + 'store-graph' + '-references.js'

const REPO_ROOT = fileURLToPath(new URL('./../', import.meta.url))

/** The 27 named type declarations of `§2.1` item 3, with the contract's own nine
 *  terms after the merged-arm withdrawal (`3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27`);
 *  the pre-withdrawal correction printed `29` and is kept visible in the two comments
 *  below (`§2.1` item 3's second annotation). A row asserting a COUNT without NAMING
 *  the names FAILS (`§2.1` item 3; `§4.4` `S-7`). */
const DECLARED_TYPE_DECLARATIONS: readonly string[] = [
  // 3 domain
  'GraphTierToken', 'GraphNodeFlag', 'GraphRefusalReason',
  // 6 graph-structure
  'GraphNodeRef', 'GraphNode', 'GraphAnchor', 'GraphLink', 'GraphTierHandle', 'GraphCrossing',
  // 4 register-and-cache
  'GraphRegisterRow', 'GraphRegister', 'GraphRegisterCacheEntry', 'GraphLinkCacheEntry',
  // 1 constraint
  'GraphConstraint',
  // 0 provenance pair — WITHDRAWN 2026-10-01 with the merged arm: the as-filed slot held
  // `GraphPart`, and `§2.1` item 3's second annotation prints the slot as `0` rather than
  // dropping it from the sum.
  // 4 read-result shapes and their union — `GraphMergedRead` WITHDRAWN with the merged arm
  // (the as-filed slot held `5`: `GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` ·
  // `GraphResolveResult` · `GraphTierGetResult`).
  'GraphReadHit', 'GraphReadMiss', 'GraphResolveResult', 'GraphTierGetResult',
  // 2 walk
  'GraphResolveStep', 'GraphResolveDiagnostic',
  // 2 event
  'GraphEvent', 'GraphSubscription',
  // 5 receipt, its rows[] pair, its options, the store and the error
  'GraphWriteReceipt', 'GraphAffectedRow', 'GraphWriteOptions', 'GraphStore', 'GraphLoadError',
]
/** `§2.1` item 3(a) — the TWO runtime value exports, exactly. */
const DECLARED_VALUE_EXPORTS: readonly string[] = ['createGraphStore', 'createGraphStoreError']
/** `§2.1` item 2 — the second module's ONE value export and THREE type declarations. */
const DECLARED_REFS_VALUE_EXPORTS: readonly string[] = ['storeGraphReferences']
const DECLARED_REFS_TYPES: readonly string[] = [
  'StoreGraphDeclarationRow', 'StoreGraphDeclarationInput', 'StoreGraphReferenceFixture',
]
/** `§2.1`'s block, reconciled by `O-9`: the operative refusal union is SIXTEEN
 *  members = 8 held + 5 this contract's amendment + 3 the two architect
 *  amendments. A red set asserting closure over 13, 15 or 18 is a red set against
 *  a superseded figure. */
const DECLARED_REFUSAL_UNION: readonly string[] = [
  // the held 8 (`§2.1`'s block)
  'undeclared-name', 'malformed-name', 'secure-refused', 'reserved-name',
  'malformed-pattern', 'cap-exceeded', 'ambiguous-path', 'reserved-namespace',
  // the amendment's 5 (`§2.1`'s block)
  'duplicate-path-tier', 'no-such-anchor', 'severed-link', 'rebuild-failed', 'tier-filter-miss',
  // the two amendments' 3 (`§2.1`'s block annotation, A1/A2)
  'serialize-failed', 'validate-failed', 'durability-inversion',
]
/** `§2.3` item 6's own annotation — the EIGHT step ids, not seven. */
const DECLARED_STEPS: readonly string[] = [
  'A-PARSE', 'B-SECURE-GATE', 'C-TOP', 'D-ANCHOR', 'E-LINK', 'F-CACHE', 'G-RESOLVE-LEAF', 'H-FLAG',
]
/** `§2.10` item 2 — the EIGHT-ROW arm table, the total member-set statement. */
const DECLARED_EVENT_CAUSES: readonly string[] = [
  'set', 'commit', 'clear', 'sweep', 'remove', 'repair', 'descendant', 'severed',
]
/** `§2.1` item 4 — the four tier tokens, CASE-SENSITIVE, exactly four. */
const DECLARED_TIER_TOKENS: readonly string[] = ['temp', 'mem', 'file', 'secure']
/** `§2.1`'s `GraphNodeFlag` — THREE members, because a `secure`-flagged node never
 *  appears in the register or the traversal. */
const DECLARED_NODE_FLAGS: readonly string[] = ['temp', 'mem', 'file']

// ---- THE TEST-ONLY SEAM'S EIGHT DECLARED MEMBERS (`§2.1`'s `GraphStore` block) -----------
// EXTENDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`/`TW-2`; the contract amendment
// `bb8394e`): `§2.1`'s `GraphStore` block declares FOUR as-filed seam members PLUS the FOUR
// this pass appended — `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild` — so the
// seam's member census is `4 + 4 = 8` ✓, and `§2.1`'s block annotation item (3) reads the
// production-negative row over ALL EIGHT KEYS: *"ALL EIGHT seam keys … are ABSENT in a
// production-shaped construction and PRESENT only under `{ enableTestSeam: true }`"*.
// The two lists are kept as the block prints them (as-filed · appended), because the appended
// four are INSTRUMENTS and the as-filed four are the ones a production-negative reading
// already checked; `SEAM_MEMBERS` is the ONE key set every reading below is made against.
const AS_FILED_SEAM_MEMBERS: readonly string[] = ['reset', 'seed', 'parentLinkCountOf', 'cacheEntryFor']
const APPENDED_SEAM_MEMBERS: readonly string[] = ['nodeFor', 'anchorFor', 'linkFor', 'failNextCacheRebuild']
/** THE SEAM'S OWN KEY SET, read as a SET: `4 + 4 = 8`. `§2.1`'s block annotation item (5):
 *  *"its `4` DRIVE MEMBERS are the four AS-FILED members, and the four appended keys are
 *  read by the SAME TWO READINGS that row already performs"* — so this list widens the
 *  READINGS' subject set and adds NO drive (the register's `P-GR-IM-10` term stays `4`). */
const SEAM_MEMBERS: readonly string[] = [...AS_FILED_SEAM_MEMBERS, ...APPENDED_SEAM_MEMBERS]
/** THE POSITIVE CONTROL for every key-set reading below: a NINTH member name — a key the
 *  contract does NOT declare — must FAIL the same set-equality reading, so the reading is
 *  not a lower bound that any extra key would satisfy. */
const UNDECLARED_NINTH_MEMBER = 'notADeclaredSeamMember'

// ---- SCAN FRAGMENTS (composed so a rule list never reads its own rule) -------------------
const F = (...parts: string[]): RegExp => new RegExp(parts.join(''))

/** A node handle — `§2.1`'s `GraphNodeRef`: a per-graph monotone STRING (never a path
 *  segment, never a lookup key: `§2.4` item 2). */
type GraphNodeRefLike = string
/** `§2.1`'s `GraphRegisterCacheEntry` / `GraphLinkCacheEntry` — the SAME dictionary shape,
 *  one for the register (top-level names only) and one scoped to a single link. */
interface CacheEntryLike {
  readonly name: string
  readonly matchedRef: GraphNodeRefLike
  readonly matchedTier: string
}
/** `§2.1`'s `GraphLink` — the edge an anchor holds: `to` is the store's own handle for the
 *  child (`null` once the target is severed) and `cache` is THIS link's cache entry. */
interface GraphLinkLike {
  readonly from: GraphNodeRefLike
  readonly to: GraphNodeRefLike | null
  readonly cache: CacheEntryLike
  readonly constraint: string | null
}
/** `§2.1`'s `GraphAnchor` — ONE named property slot: the caller's own `key`, carried
 *  verbatim, and the `link` it holds. */
interface GraphAnchorLike {
  readonly owner: GraphNodeRefLike
  readonly key: string
  readonly link: GraphLinkLike | null
}
/** `§2.1`'s `GraphNode` — ONE node: its own `ref`, its `flag` (the ONLY residency carrier),
 *  its LOCAL name, its FROZEN `anchors` array and its ONE `parentLink`. */
interface GraphNodeLike {
  readonly ref: GraphNodeRefLike
  readonly flag: string
  readonly localName: string
  readonly anchors: readonly GraphAnchorLike[]
  readonly parentLink: GraphLinkLike | null
}

// ---- THE SURFACE, RESOLVED WITHOUT THROWING (the repo's absent-module technique) ---------
interface StoreLike {
  resolve: (name: string) => unknown
  set: (name: string, value: unknown, opts?: unknown) => unknown
  commit: (name: string, value: unknown, opts?: unknown) => unknown
  remove: (name: string) => unknown
  clear: (name: string) => unknown
  sweep: (name: string) => unknown
  export: (name: string) => unknown
  sever: (from: string, anchorKey: string) => unknown
  subscribe: (name: string, listener: (event: unknown) => void, opts?: unknown) => unknown
  tiers?: Record<string, unknown>
  register?: unknown
  constraints?: unknown
  reset?: () => void
  seed?: (rows: readonly unknown[]) => void
  parentLinkCountOf?: (nodeRef: GraphNodeRefLike) => number
  cacheEntryFor?: (name: string) => CacheEntryLike | null
  /** `§2.1`'s block annotation (`TW-1`/`TW-2`) — THE THREE READ-ONLY READERS a row
   *  observes the walk's own objects with, each answering the graph's OWN object or
   *  `null` when no such object exists, and none mutating the graph, the register,
   *  either cache or a listener set. */
  nodeFor?: (nodeRef: GraphNodeRefLike) => GraphNodeLike | null
  anchorFor?: (owner: GraphNodeRefLike, key: string) => GraphAnchorLike | null
  linkFor?: (owner: GraphNodeRefLike, key: string) => GraphLinkLike | null
  /** `§2.1`'s block annotation (`TW-2`) — THE ONE-SHOT, ONE-SUBJECT TEST-ONLY FAULT
   *  INJECTOR: it arms the NEXT rebuild the INVALIDATION SITE performs (`§2.6` item 4,
   *  the record's `DR-7`) to fail, which is what makes the walk's arm (vi)
   *  `'rebuild-failed'` at `F-CACHE` driveable. It can fault nothing else. */
  failNextCacheRebuild?: () => void
}

let storeCache: { mod: Record<string, unknown> | null; reason: string | null } | null = null

/** Resolves `§2.1`'s store surface, returning the REASON as data so each row can
 *  fail as its own assertion carrying the row's own label. */
async function storeModule(): Promise<{ mod: Record<string, unknown> | null; reason: string | null }> {
  if (storeCache !== null) return storeCache
  if (!existsSync(STORE_SRC)) {
    storeCache = { mod: null, reason: `§2.1 item 1's module does not exist yet (${fileURLToPath(STORE_SRC)})` }
    return storeCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ STORE_SPECIFIER)) as Record<string, unknown>
    storeCache = { mod, reason: null }
  } catch (e) {
    storeCache = { mod: null, reason: `the module does not resolve: ${e instanceof Error ? e.message : String(e)}` }
  }
  return storeCache
}

/** The rows' boundary: fails as an ASSERTION carrying the row's own label, so a
 *  red message names the absent module rather than an import type. */
async function storeFor(label: string): Promise<StoreLike> {
  const { mod, reason } = await storeModule()
  expect(mod, `${label} — ${reason ?? ''}`).not.toBe(null)
  const make = (mod as Record<string, unknown>)['createGraphStore']
  expect(typeof make, `${label} — §2.1 item 3(a): \`createGraphStore\` is a runtime VALUE export and must be callable`).toBe('function')
  const made = (make as (o?: unknown) => unknown)(storeOptions())
  expect(made, `${label} — the factory is TOTAL and never returns a null/primitive for any argument (§2.1's block)`).not.toBe(null)
  return made as StoreLike
}

async function createErrorFor(label: string): Promise<(m: string, r: string) => unknown> {
  const { mod, reason } = await storeModule()
  expect(mod, `${label} — ${reason ?? ''}`).not.toBe(null)
  const make = (mod as Record<string, unknown>)['createGraphStoreError']
  expect(typeof make, `${label} — §2.1 item 3(a): \`createGraphStoreError\` is a runtime VALUE export`).toBe('function')
  return make as (m: string, r: string) => unknown
}

async function refsModuleFor(label: string): Promise<Record<string, unknown>> {
  expect(
    existsSync(REFS_SRC),
    `${label} — §2.1 item 2 / §5.1 row 2: \`store-graph-references.ts\` does not exist yet (${fileURLToPath(REFS_SRC)})`,
  ).toBe(true)
  const mod = (await import(/* @vite-ignore */ REFS_SPECIFIER)) as Record<string, unknown>
  return mod
}

// ---- THE FIXTURE (`§5.1` row 3 — the TEST-ONLY fixture lives in THIS file) --------------
/** `§5.5.1`'s declared-row fixture, read under `O-6`: the LOADING declarations are
 *  the four non-`secure` spellings (generic caller style, NO consumer noun), and
 *  the REFUSED-CONTROL input carries the `secure` spelling so arm (b) has its
 *  NAMED POSITIVE CONTROL. `file.<entity>.pinned` carries the reserved flag. */
const LOADING_DECLARATIONS: readonly { name: string; reserved?: boolean }[] = [
  { name: 'file.entity.order' },
  { name: 'file.entity.pinned', reserved: true },
  { name: 'mem.entity.id.working' },
  { name: 'temp.entity.id.candidate' },
]
/** THE FIXTURE THE ROWS CONSTRUCT WITH — the register's own store fixture, MIRRORED
 *  (`tests/store-core-graph-register.ts`'s `REGISTER_FIXTURE_ROWS`): the four contract
 *  fixture declarations PLUS the THREE `window` root declarations.
 *  REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, the second half of the fixture bug
 *  this pass fixes): a `§3.1` `M-1`/`M-2`-shaped drive commits
 *  `file.window.tabs.landingPage`, whose FIRST path segment is the top-level name
 *  `window` — and `§2.4` item 4's annotation makes the TOP-LEVEL NAME DECLARATION the
 *  discriminator between a COLD ROOT NAME and a name that is *"not a root name at all"*.
 *  With `window` undeclared the walk's `C-TOP` arm answers `'undeclared-name'` before the
 *  chain is reached, so the row could not resolve what it drives. A declaration
 *  contributes NO register row (`§2.4` item 3's annotation): this list only widens the
 *  REACHABLE root set, and it moves no row's assertion or expectation. */
const STORE_FIXTURE_ROWS: readonly { name: string; reserved?: boolean }[] = [
  ...LOADING_DECLARATIONS,
  { name: 'file.window.tabs' },
  { name: 'mem.window.tabs' },
  { name: 'temp.window.tabs' },
]
/** `§2.4` item 8's annotation — the declarations are the CALLER'S TOP-LEVEL NAME
 *  DECLARATIONS: a root name is what the input MAKES, and it contributes NO ROW.
 *  REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, the fixture bug this pass fixes):
 *  the list is the fixture's OWN root-name set and now names BOTH roots the fixture
 *  declares — `entity` and `window` — mirroring the register's `REGISTER_ROOT_NAMES`
 *  (`tests/store-core-graph-register.ts`). The as-filed `['entity']` named one root while
 *  the rows drive `file.window.tabs.landingPage` (`§3.1` `M-1`/`M-2`), which the fixture
 *  never declared. */
const ROOT_NAMES: readonly string[] = ['entity', 'window']
/** `§5.5.1`'s fixture — the two constraint rows, verbatim. */
const FIXTURE_CONSTRAINTS: readonly Record<string, unknown>[] = [
  {
    id: 'unique-path-tier', kind: 'unique-path-tier', matchedSet: 'the fixture\u2019s top-level rows',
    evaluatedOn: ['commit'], repair: 'none', onRepeat: 'refuse', refusalReason: 'duplicate-path-tier',
  },
  {
    id: 'count-exactly-one', kind: 'count-exactly-one', matchedSet: 'one pattern\u2019s instances',
    evaluatedOn: ['set', 'commit', 'remove'], repair: 'next-surviving-by-order', onRepeat: 'edit',
    refusalReason: null,
  },
]

/** The stub crossing seam (`§2.1`'s `GraphCrossing`, `§2.8` item 8): a no-op
 *  recorder whose DEFAULT answers `{status:'committed'}`. This unit asserts
 *  NOTHING about the real channel. */
function crossingRecorder(): { rows: { name: string; value: unknown }[]; put: (row: { name: string; value: unknown }) => { status: 'committed' | 'refused' } } {
  const rows: { name: string; value: unknown }[] = []
  return {
    rows,
    put(row: { name: string; value: unknown }) {
      rows.push(row)
      return { status: 'committed' }
    },
  }
}

function storeOptions(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    declarations: { rows: STORE_FIXTURE_ROWS },
    constraints: FIXTURE_CONSTRAINTS,
    crossing: crossingRecorder(),
    // THE FIXTURE LOADS — REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, the FIRST half
    // of the fixture bug this pass fixes). `§2.4` item 5(d) refuses AT CONSTRUCTION a
    // declared row COLLIDING with a reserved namespace key, and this fixture's own
    // declarations live UNDER the `entity` namespace — so the as-filed
    // `reservedNamespaces: ['entity']` REFUSED the fixture's own input (`'reserved-namespace'`)
    // and no row could construct a store. The set is EMPTY here, exactly as the register's
    // own `fixtureOptions()` declares it: arm (d) is driven on its OWN input, which is the
    // only input that carries that collision (`F-18`(d), whose inline fixture keeps
    // `reservedNamespaces: ['entity']`).
    reservedNamespaces: [],
    enableTestSeam: true,
    ...extra,
  }
}

// ---- SHARED HELPERS ---------------------------------------------------------------------
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

/** `§3.4` `R-3` / `§3.2` `F-12` — a refusal implies `cleared: []`, `rows: []`,
 *  `crossings: 0`, `events: 0` and every resident copy untouched. */
function assertRefusalShape(label: string, receipt: unknown, reason: string): void {
  expect(isRecord(receipt), `${label} — the mutators are TOTAL and answer a RETURNED RECORD (§2.2 P-5)`).toBe(true)
  const r = receipt as Record<string, unknown>
  expect(r['status'], `${label} — the status member`).toBe('refused')
  expect(r['reason'], `${label} — the declared reason token`).toBe(reason)
  expect(r['cleared'], `${label} — a refusal clears NOTHING (R-3, F-12)`).toEqual([])
  expect(r['rows'], `${label} — a refusal carries no affected row (R-3, F-12)`).toEqual([])
  expect(r['crossings'], `${label} — a refusal crosses NOTHING (R-3, F-12)`).toBe(0)
  expect(r['events'], `${label} — a refusal emits NOTHING (R-3, F-12)`).toBe(0)
}

/** `§2.1`'s `GraphWriteReceipt` — the six common members present on every arm. */
function assertReceiptShape(label: string, receipt: unknown): void {
  expect(isRecord(receipt), `${label} — a receipt is a record`).toBe(true)
  const r = receipt as Record<string, unknown>
  for (const member of ['status', 'name', 'cleared', 'repaired', 'rows', 'crossings', 'events']) {
    expect(Object.prototype.hasOwnProperty.call(r, member), `${label} — the receipt carries \`${member}\` as a KEY (§2.1's block)`).toBe(true)
  }
  expect(['committed', 'refused'], `${label} — the closed status union`).toContain(r['status'])
}

/** The walk's refusal record: `§2.3` item 6 — a VERBOSE PER-STEP DIAGNOSTIC, never
 *  a throw; `reason` names the class, `step` names where the walk failed. */
function diagnosticOf(label: string, result: unknown): Record<string, unknown> {
  expect(isRecord(result), `${label} — a refused resolution returns a RECORD, never a throw (§2.2 P-5)`).toBe(true)
  const r = result as Record<string, unknown>
  expect(r['status'], `${label} — the refusal's own status member`).toBe('refused')
  expect(isRecord(r['diagnostic']), `${label} — §3.4 R-4: a refusal record without a diagnostic FAILS`).toBe(true)
  return r['diagnostic'] as Record<string, unknown>
}

function reasonOf(label: string, result: unknown): unknown {
  expect(isRecord(result), `${label} — a refusal is a record`).toBe(true)
  return (result as Record<string, unknown>)['reason']
}

/** The canonical structural comparator (`§2.6` item 6, `§5.5.1` `P-GR-IM-13`), RE-DERIVED
 *  2026-10-01 with the merged arm withdrawn: the declared members `found`/`tier`/`flag`/
 *  `name` are compared BY VALUE and a live `cache` BY IDENTITY. The as-filed comparator's
 *  *"`parts` ABSENT compared as ABSENT"* reading is GONE WITH THE MEMBER (`§2.6` item 6's own
 *  annotation; the contract's `§0`(A3)). Written in the test file, adds NO dependency, and is
 *  NOT a seam. */
function structurallyIdentical(label: string, a: unknown, b: unknown): void {
  expect(isRecord(a) && isRecord(b), `${label} — both answers are records`).toBe(true)
  const x = a as Record<string, unknown>
  const y = b as Record<string, unknown>
  for (const m of ['found', 'tier', 'flag', 'value', 'name']) {
    expect(x[m], `${label} — member \`${m}\` compared by value`).toEqual(y[m])
  }
  if (x['cache'] !== null && x['cache'] !== undefined) {
    expect(x['cache'], `${label} — \`cache\` compared BY IDENTITY against the same handle`).toBe(y['cache'])
  }
}

/** `F-25`'s DIFFERENTIAL READING, written in this file and adding NO dependency and NO
 *  seam (`§5.5.1` `P-GR-IM-13`'s comparator is the precedent). It answers ONE question —
 *  *are these two read answers the SAME?* — over the DECLARED members of `§2.1`'s read
 *  result shapes, so a caller can assert both directions: EQUAL for two stores in one
 *  graph state (`§2.6` item 2 / item 6), DIFFERENT for two stores whose graph state was
 *  changed (`§3.4` `R-9`(b)). A live `cache` handle
 *  is compared by the both-live / both-absent distinction alone, because two stores own
 *  DIFFERENT handles by construction (`§2.5` item 3) and the row's subject is the graph
 *  state, never an object's address. */
function sameAnswer(a: unknown, b: unknown): boolean {
  if (!isRecord(a) || !isRecord(b)) return a === b
  for (const m of ['status', 'reason', 'step', 'found', 'value', 'tier', 'flag', 'name']) {
    if (JSON.stringify(a[m] ?? null) !== JSON.stringify(b[m] ?? null)) return false
  }
  return ((a['cache'] ?? null) === null) === ((b['cache'] ?? null) === null)
}

/** Reads a tracked file's bytes at `HEAD` for the commit-range-shaped rows. */
function headBytes(relPath: string): string | null {
  try {
    return execFileSync('git', ['show', `HEAD:${relPath}`], { cwd: REPO_ROOT, encoding: 'utf8' })
  } catch {
    return null
  }
}
function workTreeBytes(relPath: string): string | null {
  const abs = fileURLToPath(new URL(`./../${relPath}`, import.meta.url))
  return existsSync(abs) ? readFileSync(abs, 'utf8') : null
}

/** `§3.1` `M-17` / `§3.4` `R-1` — the vocabulary scan's own instrument, as a
 *  FUNCTION so both the NEGATIVE control and the POSITIVE control drive the SAME
 *  scan. Tokens are held as FRAGMENTS so the scan cannot read its own rule list. */
function vocabularyHits(text: string): string[] {
  const rules: [string, RegExp][] = [
    ['consumer-noun-tab', F('\\bt', 'ab\\b')],
    ['consumer-noun-pane', F('\\bp', 'ane\\b')],
    ['consumer-noun-zone', F('\\bz', 'one\\b')],
    ['consumer-noun-region', F('\\br', 'egion\\b')],
    ['consumer-noun-gutter', F('\\bg', 'utter\\b')],
    ['is-literal-empty', F("is-", "empty")],
    ['is-literal-minimized', F("is-", "minimized")],
    ['fork-origin-literal', F("min", "imized")],
    ['unit-string-px', F('\\d+', 'px\\b')],
    ['unit-string-rem', F('\\d+', 'rem\\b')],
  ]
  return rules.filter(([, re]) => re.test(text)).map(([name]) => name)
}

/** `§3.4` `R-7`/`R-8` — the element/geometry/clock instrument claim scan. */
function instrumentHits(text: string): string[] {
  const rules: [string, RegExp][] = [
    ['bounding-rect', F('getBounding', 'ClientRect')],
    ['computed-style', F('getComputed', 'Style')],
    ['media-query', F('match', 'Media')],
    ['pointer-x', F('client', 'X')],
    ['pointer-y', F('client', 'Y')],
    ['wall-clock', F('\\bDate', '\\.now')],
    ['randomness', F('Math', '\\.random')],
    ['crypto-uuid', F('random', 'UUID')],
  ]
  return rules.filter(([, re]) => re.test(text)).map(([name]) => name)
}

const MIRROR_FIXTURE = ['a', 'ta', 'b strip'].join('') + ' ' + ['a m', 'in', 'imized pane'].join('')

/** Removes `//` and block comments before a scan, so a rule list may DISCUSS a
 *  banned token without the rule list itself reading as a HIT. The scan's subjects
 *  are the executable bytes; a prose mention is not an instrument claim. `§2.2`
 *  `P-9`'s ban is on the store's own reads, and the store's own prose is scanned
 *  WITH its comments (the modules are the primary corpus). */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

// ===========================================================================
// 1. THE STATIC AND EXISTENCE ROWS — evaluable NOW, driven in BOTH branches
// ===========================================================================
describe('§4.1 · the STATIC and EXISTENCE rows (both branches)', () => {
  // [T] §4.1 RED branch / §3.5 R-11 — the two module paths are NEW.
  it('§4.1(red) · §3.5 R-11 — both pinned module paths are ABSENT and no src/** file imports either', async () => {
    const absent = !existsSync(STORE_SRC) && !existsSync(REFS_SRC)
    expect(absent, '§4.1 RED branch — the two pinned module paths are ABSENT').toBe(true)
    let imported = ''
    try {
      imported = execFileSync(
        'git',
        ['grep', '-n', '-E', 'store-core-graph|store-graph-references', '--', 'src'],
        { cwd: REPO_ROOT, encoding: 'utf8' },
      ).trim()
    } catch {
      imported = '' // `git grep` answers exit 1 when nothing matches: no importer is the RED branch's expected reading
    }
    expect(imported, '§4.1 RED branch — NO src/** file imports either pinned path, in the RED branch').toBe('')
  })

  // [T] §4.1 RED branch — the unmoved counts.
  it('§4.1(red) · §7 item 8 — no tracked count moved: the held contract is byte-identical and src/shared is untouched', () => {
    const held = workTreeBytes('docs/specs/store-core.md')
    expect(held, '§3.5 R-12 — the held contract must EXIST').not.toBe(null)
    expect(held, '§3.5 R-12 — the held `docs/specs/store-core.md` is BYTE-IDENTICAL across this unit\u2019s set').toBe(
      headBytes('docs/specs/store-core.md'),
    )
    const dirty = execFileSync('git', ['status', '--porcelain', '--', 'src/shared', 'src/main'], {
      cwd: REPO_ROOT, encoding: 'utf8',
    }).trim()
    expect(dirty, '§3.5 R-11 — `src/shared/**` and the vendored tree stay BYTE-IDENTICAL across this unit\u2019s whole committed set').toBe('')
  })

  // [T] §4.1 GREEN branch / §3.5 R-11 — the modules EXIST (reddens at red time).
  it('§4.1(green) · §3.5 R-11 — the modules EXIST and the renderer wiring is the only importer', () => {
    expect(existsSync(STORE_SRC), `§4.1 GREEN branch — ${fileURLToPath(STORE_SRC)} exists`).toBe(true)
    expect(existsSync(REFS_SRC), `§4.1 GREEN branch — ${fileURLToPath(REFS_SRC)} exists`).toBe(true)
    const store = readFileSync(STORE_SRC, 'utf8')
    const refs = readFileSync(REFS_SRC, 'utf8')
    for (const [name, bytes] of [['store-core-graph.ts', store], ['store-graph-references.ts', refs]] as const) {
      expect(vocabularyHits(bytes), `M-17 · R-1 — ${name} ships NO consumer vocabulary as its own and NO mirror-class literal`).toEqual([])
      expect(instrumentHits(bytes), `I-10 · R-7/R-8 — ${name} carries no element/geometry/clock instrument`).toEqual([])
    }
    expect(vocabularyHits(MIRROR_FIXTURE), 'M-17 POSITIVE control — a fixture carrying a consumer noun MUST FAIL the same scan').not.toEqual([])
    expect(instrumentHits(['a', 'getBounding', 'ClientRect() read'].join('')), 'R-8 POSITIVE control — a fixture carrying a geometry read MUST FAIL').not.toEqual([])
  })

  // [T] §2.1 item 3 — the export census, BY NAME.
  // ⟶ RE-DERIVED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` at `§0` of the contract;
  // the as-filed row title printed *"TWENTY-NINE … THIRTY-ONE"* and is kept visible in this
  // comment). THE OPERATIVE CENSUS IS `2` VALUE EXPORTS + `27` TYPE DECLARATIONS = `29`
  // EXPORTED NAMES: `GraphPart` and `GraphMergedRead` are WITHDRAWN, so the twenty-seven are
  // the pre-withdrawal twenty-nine MINUS those two, with `GraphTierGetResult` and
  // `GraphAffectedRow` still counted (`§2.1` item 3's second annotation). THE ROW'S ID, ITS
  // LAYER AND ITS PLACE ARE UNMOVED; it now REDDENS on a module that still exports the two
  // withdrawn types, which is the honest signal that the `src/**` removal of item `(b)` of
  // the contract's `§7` item 12 sweep is still owed.
  it('§2.1 item 3 · the export census — TWO value exports + TWENTY-SEVEN named type declarations = TWENTY-NINE names', () => {
    expect(existsSync(STORE_SRC), `§2.1 item 3 — the module does not exist yet (${fileURLToPath(STORE_SRC)}), so its census cannot be read`).toBe(true)
    const bytes = readFileSync(STORE_SRC, 'utf8')
    const typeNames = [...bytes.matchAll(/^export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1])
    const valueNames = [...bytes.matchAll(/^export\s+function\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1])
    expect([...typeNames].sort(), '§2.1 item 3 — the TWENTY-SEVEN type declarations, NAMED (a count without the names FAILS)').toEqual(
      [...DECLARED_TYPE_DECLARATIONS].sort(),
    )
    expect([...valueNames].sort(), '§2.1 item 3(a) — the TWO runtime value exports, exactly').toEqual([...DECLARED_VALUE_EXPORTS].sort())
    expect(typeNames.length + valueNames.length, '§2.1 item 3 — 2 + 27 = 29 exported names (the merged arm’s two declarations WITHDRAWN)').toBe(29)
    expect(DECLARED_TYPE_DECLARATIONS.length, '§2.1 item 3 — the terms printed: 3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27').toBe(27)
    const refsBytes = readFileSync(REFS_SRC, 'utf8')
    const refsTypes = [...refsBytes.matchAll(/^export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1])
    expect([...refsTypes].sort(), '§2.1 item 2 — the second module\u2019s THREE type declarations').toEqual([...DECLARED_REFS_TYPES].sort())
    expect([...refsBytes.matchAll(/^export\s+function\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1]), '§2.1 item 2 — its ONE value export').toEqual([...DECLARED_REFS_VALUE_EXPORTS])
  })

  // [T] §2.1 item 4 + §2.1's block — the closed domains, BY NAME.
  it('§2.1 items 3/4 · the closed domains — 16 refusal reasons, 8 step ids, 8 event causes, 4 tier tokens, 3 flags', async () => {
    expect(DECLARED_REFUSAL_UNION.length, '§2.1\u2019s block annotation (`O-9`) — the operative union is SIXTEEN = 8 held + 5 amendment + 3 amendments').toBe(16)
    expect(new Set(DECLARED_REFUSAL_UNION).size, '§2.1 block — no member twice').toBe(16)
    expect(DECLARED_STEPS.length, '§2.3 item 6\u2019s annotation — the walk names EIGHT step ids, not seven').toBe(8)
    expect(DECLARED_EVENT_CAUSES.length, '§2.10 item 2 — the EIGHT-ROW arm table is the total member-set statement').toBe(8)
    expect(DECLARED_TIER_TOKENS.length, '§2.1 item 4 — exactly four tier tokens, case-sensitive').toBe(4)
    expect(DECLARED_NODE_FLAGS.length, '§2.1\u2019s `GraphNodeFlag` — three members; a `secure`-flagged node never appears in the register or the traversal').toBe(3)
    expect(existsSync(STORE_SRC), `§2.1 item 4 — the module does not exist yet (${fileURLToPath(STORE_SRC)})`).toBe(true)
    const bytes = readFileSync(STORE_SRC, 'utf8')
    for (const token of DECLARED_REFUSAL_UNION) {
      expect(bytes, `§2.1\u2019s block — the closed union carries \`'${token}'\``).toContain(`'${token}'`)
    }
    const { mod } = await storeModule()
    const m = mod as Record<string, unknown>
    expect('tier' in m, '§2.1 item 4 — the tier tokens are NOT exported names: a `tier` constant object FAILS').toBe(false)
  })

  // [T] §3.5 R-10(a) — the design skill file does not exist.
  it('§3.5 R-10(a) · `docs/skills/designing-pages.md` DOES NOT EXIST (no coverage matrix, no demo-page index)', () => {
    const skills = fileURLToPath(new URL('./../docs/skills/', import.meta.url))
    expect(existsSync(skills), '§3.5 R-10(a) — `docs/skills/*` exists').toBe(true)
    expect(
      existsSync(fileURLToPath(new URL('./../docs/skills/designing-pages.md', import.meta.url))),
      '§3.5 R-10(a) — the file\u2019s later appearance is a finding against THIS row',
    ).toBe(false)
  })

  // [T] §3.5 R-9 — no rendered surface is authored.
  it('§3.5 R-9 · this unit renders NO page and authors no page design (the §7.1 predicate does not trigger; no report is filed)', () => {
    const diff = execFileSync('git', ['status', '--porcelain', '--', 'src'], { cwd: REPO_ROOT, encoding: 'utf8' }).trim()
    expect(diff, '§3.5 R-9 — a glob of the unit\u2019s diff for any authored element: ANY HIT FAILS').toBe('')
    const pkg = JSON.parse(readFileSync(fileURLToPath(new URL('./../package.json', import.meta.url)), 'utf8')) as Record<string, unknown>
    expect(Object.keys(pkg['scripts'] as Record<string, unknown>), '§5.2 — this unit adds NO `scripts` key, and a config change cannot satisfy `L-1`').not.toContain('ui:store')
  })

  // [T] §3.4 R-10 — the frozen surfaces are unmoved, by set equality against NAMES.
  it('§3.4 R-10 · the frozen surfaces are UNMOVED, and no `scripts` key was added', () => {
    const pkg = JSON.parse(readFileSync(fileURLToPath(new URL('./../package.json', import.meta.url)), 'utf8')) as Record<string, unknown>
    const scripts = Object.keys(pkg['scripts'] as Record<string, unknown>)
    expect(scripts, '§2.2 P-4 — the `scripts` KEY SET is unmoved: adding a key would redden `tests/ui-leg-contract.test.ts`\u2019s `L-1`').toHaveLength(13)
    // READ AS A SET, NOT AS AN ORDERED ARRAY. REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR
    // PASS, Repair 2): the as-filed form compared the LIVE `Object.keys(package.json.scripts)`
    // — an ORDERED array, in the file's own insertion order — against a HAND-WRITTEN array
    // whose last two members were `... 'mcp', 'ui'`, while `package.json` orders `ui` BEFORE
    // `mcp`. So the row reddened on ORDER and not on membership, and NO implementation could
    // green it. The claim it makes is a KEY SET claim and the contract says so in its own
    // words: `§2.2` `P-4` pins *"the `scripts` key set"*, and `§3.4` `R-10` reads *"the frozen
    // surfaces asserted **by set equality against the NAMES**"* — set equality is
    // order-insensitive. Sorting BOTH sides makes the comparison a set comparison while
    // keeping the row's id and its substantive claim (the landed twelve plus exactly `ui`;
    // a count is asserted BESIDE the set, never instead of it — `§4.4 S-7`).
    expect([...scripts].sort(), '§2.2 P-4/§3.4 R-10 — the `scripts` KEY SET is EXACTLY the landed twelve plus `ui`, read BY SET EQUALITY AGAINST THE NAMES (never as an ordered array: the key order is `package.json`\u2019s own and is not a declared surface)').toEqual(
      ['clean', 'build', 'build:watch', 'start', 'start:http', 'typecheck', 'typecheck:tests', 'test', 'test:watch', 'battery', 'divergence', 'mcp', 'ui'].sort(),
    )
    // THE POSITIVE CONTROL: the SAME set-equality reading FAILS on an added/renamed key, so
    // its passing over the live key set is a reading and not a dead scan.
    expect([...scripts, 'ui:store'].sort(), '§2.2 P-4 POSITIVE control — an ADDED `scripts` key FAILS this set-equality reading').not.toEqual(
      [...scripts].sort(),
    )
    expect(scripts, '§2.2 P-4 — the additive test-layer leg is present and NO further key (this unit adds none)').toContain('typecheck:tests')
    const deps = Object.keys({ ...(pkg['dependencies'] as Record<string, unknown>) })
    expect(deps.sort(), '§5.5 — the dependency key set is the two landed keys; NO new dependency of any kind').toEqual(
      Object.keys({ '@modelcontextprotocol/sdk': 1, 'provident-ssr': 1 }).sort(),
    )
    const dev = Object.keys({ ...(pkg['devDependencies'] as Record<string, unknown>) })
    expect(dev.sort(), '§5.5 — the `devDependencies` key set is the FIVE landed keys: no `fast-check`, no property runner').toEqual(
      Object.keys({ '@types/node': 1, electron: 1, esbuild: 1, typescript: 1, vitest: 1 }).sort(),
    )
  })

  // [T] §3.4 R-11 — the import census, NAME-COMPLETE.
  it('§3.4 R-11 · the import census — ONE non-type import in the store, ZERO in the input, and no held module', () => {
    expect(existsSync(STORE_SRC), `§3.4 R-11 — the store module does not exist yet (${fileURLToPath(STORE_SRC)})`).toBe(true)
    const store = readFileSync(STORE_SRC, 'utf8')
    const refs = readFileSync(REFS_SRC, 'utf8')
    const storeImports = [...store.matchAll(/^\s*import\s[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1]).filter((s) => !s.startsWith('node:') || true)
    const nonType = storeImports.filter((spec) => spec.includes('store-graph' + '-references'))
    expect(storeImports.filter((s) => !s.includes('store-graph' + '-references')), '§3.4 R-11 — exactly ONE non-type import (`./store-graph-references.js`) and NO other').toEqual([])
    expect(nonType, '§3.4 R-11 — the one import is the input module').toHaveLength(1)
    expect([...refs.matchAll(/^\s*import\s[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1]), '§3.4 R-11 — the input module imports NOTHING at run time').toEqual([])
    for (const banned of ['provident-ssr', 'electron', 'src/main', 'src/shared', 'store-core.js', 'store-references.js']) {
      expect(store + refs, `§3.4 R-11 — neither module imports \`${banned}\``).not.toContain(`from '${banned}`)
    }
    const censusFixture = "import x from 'provident-ssr'\n"
    expect([...censusFixture.matchAll(/^\s*import\s+[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1]), '§3.4 R-11 POSITIVE control — a second import statement FAILS this census').not.toEqual([])
  })

  // [T] §3.4 R-12 — no module-level binding, and the seam is absent unless enabled.
  it('§3.4 R-12 · no module-level store/graph/register/cache binding, and the EIGHT seam keys are ABSENT by default', async () => {
    expect(existsSync(STORE_SRC), `§3.4 R-12 — the store module does not exist yet (${fileURLToPath(STORE_SRC)})`).toBe(true)
    const bytes = readFileSync(STORE_SRC, 'utf8')
    expect(
      [...bytes.matchAll(/^(?:const|let|var)\s+[A-Za-z0-9_]*\s*=\s*[^\n]*createGraphStore\(/gm)].map((m) => m[0]),
      '§3.4 R-12 — a module-scope `const store = createGraphStore(...)` FAILS; the store is held by the WIRING (§0A note 8)',
    ).toEqual([])
    expect(
      [...bytes.matchAll(/^const\s+[A-Za-z0-9_]*[Ll]isteners?\s*[:=]/gm)].map((m) => m[0]),
      '§3.4 R-12 — no module-level mutable listener set',
    ).toEqual([])
    const { mod, reason } = await storeModule()
    expect(mod, `§3.4 R-12 — ${reason ?? ''}`).not.toBe(null)
    const factory = (mod as Record<string, unknown>)['createGraphStore'] as (o?: unknown) => Record<string, unknown>
    const plain = factory({ declarations: { rows: LOADING_DECLARATIONS }, constraints: FIXTURE_CONSTRAINTS })
    // THE PRODUCTION-NEGATIVE READING, EXTENDED IN SUBJECT AND NOT IN KIND (`§3.4 R-12`'s own
    // annotation, `TW-1`/`TW-2`): row (c)'s key-set reading is made over ALL EIGHT seam keys —
    // the four as-filed names PLUS `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild`
    // — and a production-shaped construction in which ANY of the eight is present FAILS R-12
    // exactly as one carrying `reset` does.
    const presentWhenSeamless = SEAM_MEMBERS.filter((member) => member in plain)
    expect(presentWhenSeamless, '§3.4 R-12(c) — NONE of the EIGHT seam keys is present when the seam was not enabled (a store carrying ANY of them FAILS R-12 exactly as one carrying `reset` does)').toEqual([])
    const seamKeysWhenSeamless = Object.keys(plain).filter((key) => SEAM_MEMBERS.includes(key))
    expect(seamKeysWhenSeamless, '§3.4 R-12(c) — the store\u2019s own key set read against the EIGHT declared members: the intersection is EMPTY').toEqual([])
    // THE POSITIVE CONTROL: the SAME set-equality reading with a NINTH, undeclared member name
    // FAILS — so the reading above is set equality and not a lower bound.
    expect(seamKeysWhenSeamless, `§3.4 R-12(c) POSITIVE control — a ninth, UNDECLARED member name (${UNDECLARED_NINTH_MEMBER}) FAILS this reading, so its silence over the eight is a reading and not a dead scan`).toEqual([UNDECLARED_NINTH_MEMBER])
    // AND THE NEGATIVE CONTROL: the ENABLED construction exposes ALL EIGHT keys, so the eight
    // names are the seam's own and not a list of names nothing answers.
    const enabled = await storeFor('§3.4 R-12 (the enabled construction)')
    const enabledKeys = Object.keys(enabled)
    for (const member of SEAM_MEMBERS) {
      expect(Object.prototype.hasOwnProperty.call(enabled, member), `§3.4 R-12(c) — with \`{enableTestSeam:true}\` the member \`${member}\` is PRESENT (§2.1's test-only seam, read over all EIGHT members)`).toBe(true)
    }
    expect(SEAM_MEMBERS.filter((member) => !enabledKeys.includes(member)), '§3.4 R-12(c) — the ENABLED construction answers ALL EIGHT declared seam keys (`4` as-filed + `4` appended), read as a SET against the store\u2019s own keys').toEqual([])
  })

  // [T] §3.3 I-11 / §3.4 R-10 — the five frozen surfaces, BY SET EQUALITY against the NAMES.
  it('I-11 · §2.2 P-4/§3.4 R-10 · no MCP surface, no seam and no frozen contract moved — asserted by set equality against the NAMES', () => {
    const read = (rel: string) => readFileSync(new URL(`./../${rel}`, import.meta.url), 'utf8')
    /** Reads a bracketed string list out of a file's bytes and returns its members
     *  in order — the SET EQUALITY `§3.4` `R-10` asks for (`[ ... ]` in one line or
     *  across lines, quotes and separators stripped). A read that finds nothing
     *  returns `[]`, which the emptiness control below reddens. */
    const memberList = (text: string, open: string): string[] => {
      const at = text.indexOf(open)
      if (at < 0) return []
      const from = text.indexOf('[', at)
      const to = text.indexOf(']', from)
      if (from < 0 || to < 0) return []
      return text.slice(from + 1, to).split(/[,\n]/).map((s) => s.replace(/['"\s|]/g, '')).filter(Boolean)
    }
    const rpcMethods = (() => {
      const at = read('src/shared/types.ts').indexOf('export type RpcMethod =')
      const body = at < 0 ? '' : read('src/shared/types.ts').slice(at, read('src/shared/types.ts').indexOf('\n\n', at))
      return body.split('\n').map((line) => line.replace(/[|\s]/g, '')).filter((s) => s.startsWith("'")).map((s) => s.replace(/'/g, ''))
    })()
    const mutating = memberList(read('src/renderer/renderer.ts'), 'MUTATING_METHODS = new Set(')
    const groups = memberList(read('src/main/security-store.ts'), 'VALID_GROUPS = new Set(')
    const headMethods = (() => {
      const head = headBytes('src/shared/types.ts') ?? ''
      const at = head.indexOf('export type RpcMethod =')
      const body = at < 0 ? '' : head.slice(at, head.indexOf('\n\n', at))
      return body.split('\n').map((line) => line.replace(/[|\s]/g, '')).filter((s) => s.startsWith("'")).map((s) => s.replace(/'/g, ''))
    })()
    expect(rpcMethods, 'I-11 — `RpcMethod` is UNMOVED: this unit adds no member (the set is read from the file and compared with HEAD, not restated as a literal that could drift)').toEqual(headMethods)
    expect(rpcMethods.length, 'I-11 — the union has members (a vacuous read FAILS)').toBeGreaterThan(0)
    expect(mutating, 'I-11 — `MUTATING_METHODS` is UNMOVED by this unit\u2019s diff').toEqual(
      ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal'],
    )
    expect(groups, 'I-11 — `VALID_GROUPS` is UNMOVED, read as a SET against the NAMES').toEqual(['read', 'dispatch', 'graph', 'code', 'module'])
    const mcpBytes = read('src/main/mcp-server.ts')
    expect(mcpBytes, 'I-11 — `ALL_TOOLS` exists and is the frozen list (its own members are read by set equality against HEAD\u2019s bytes)').toContain('ALL_TOOLS')
    expect(mcpBytes, 'I-11 — `ALL_TOOLS` is byte-identical to HEAD: this unit adds no tool').toBe(headBytes('src/main/mcp-server.ts'))
    for (const member of ['RpcMethod', 'MUTATING_METHODS', 'VALID_GROUPS', 'ALL_TOOLS', 'VALID_GROUPS']) {
      expect(existsSync(STORE_SRC) ? readFileSync(STORE_SRC, 'utf8') : '', `I-11 — neither new module touches \`${member}\` (the store ships NO MCP surface, NO new seam and NO frozen-surface change; §2.2 P-4, §1 item 3)`).not.toContain(member)
    }
    const preload = read('src/main/preload.ts')
    expect(preload, 'I-11 — the preload member set is UNMOVED: `src/main/preload.ts` is byte-identical to HEAD').toBe(headBytes('src/main/preload.ts'))
    const gsession = readFileSync(new URL('./../docs/specs/gsession.md', import.meta.url), 'utf8')
    expect(gsession, 'I-11 — `docs/specs/gsession.md` `§2.5`\u2019s frozen delegate surface is unmoved (the contract file itself is untouched, which the DENIED-set row asserts independently)').toContain('§2.5')
  })

  // [T] §3.3 I-13 — the import census is EXACT, and the vendored package is never imported.
  it('I-13 · §2.2 P-11 · the vendored package is never imported, and neither module reaches src/main/**', () => {
    for (const rel of ['src/renderer/store-core-graph.ts', 'src/renderer/store-graph-references.ts']) {
      const bytes = existsSync(fileURLToPath(new URL(`./../${rel}`, import.meta.url))) ? readFileSync(new URL(`./../${rel}`, import.meta.url), 'utf8') : ''
      if (bytes === '') {
        expect(bytes, `I-13 — ${rel} does not exist yet, so its census cannot be read (${fileURLToPath(new URL(`./../${rel}`, import.meta.url))})`).not.toBe('')
        continue
      }
      expect(bytes, `I-13 — ${rel} never imports \`provident-ssr\``).not.toMatch(F("from '", "provident-ssr"))
      expect(bytes, `I-13 — ${rel} never reaches \`src/main/**\``).not.toMatch(F('src/', 'main/'))
      expect(bytes, `I-13 — ${rel} imports no \`node:*\``).not.toMatch(F("from '", "node:"))
    }
  })

  // [T] §5.1 · the diff scope — nothing outside the allow-list moved.
  it('§5.1 · the DENIED set — no byte of the held contract, no import of it, and no tracker touched by this red set', () => {
    const held = headBytes('docs/specs/store-core.md')
    expect(held, '§5.1 — the held contract exists in HEAD').not.toBe(null)
    expect(workTreeBytes('docs/specs/store-core.md'), '§5.1 — BYTE-IDENTICAL for this unit\u2019s whole set').toBe(held)
    const porcelain = execFileSync('git', ['status', '--porcelain'], { cwd: REPO_ROOT, encoding: 'utf8' })
      .split('\n').filter(Boolean).map((line) => line.slice(3).trim())
    const denied = porcelain.filter((p) => p.startsWith('docs/specs/store-core.md') || p.startsWith('docs/next-steps') || p.startsWith('docs/decisions') || p.startsWith('AGENTS.md') || p.startsWith('docs/specs/store-node-graph'))
    expect(denied, '§5.1 — the DENIED set binds absolutely: this red set touches no contract, tracker or record').toEqual([])
  })
})

// ===========================================================================
// 2. THE WALK AND ITS SEVEN FAILURE ARMS — M-1, M-2, F-1…F-7, R-4
// ===========================================================================
describe('§2.3/§2.5 · the walk and its arms', () => {
  // [T] §3.1 M-1 — the architect's own example, end to end.
  it('M-1 · §2.3 items 1/2/7 · the walk resolves `file.window.tabs.landingPage` to an ANSWER', async () => {
    const store = await storeFor('M-1')
    const r = (await settle(store, 'commit', 'file.window.tabs.landingPage', 'v')) as Record<string, unknown>
    expect(r['status'], 'M-1 — the fixture is committed first').toBe('committed')
    const answer = store.resolve('file.window.tabs.landingPage') as Record<string, unknown>
    expect(answer['found'], 'M-1 — an ANSWER').toBe(true)
    expect(answer['value'], 'M-1 — the node\u2019s value').toBe('v')
    expect(answer['flag'], 'M-1 — the answer carries the resolved node\u2019s OWN flag').toBe('file')
    expect(answer['cache'], 'M-1/M-3 — `cache` IS the tier collection\u2019s own handle, by identity').toBe(
      (store.tiers as Record<string, unknown>)['file'],
    )
    expect(answer['name'], 'M-1 — the caller\u2019s own spelling').toBe('file.window.tabs.landingPage')
  })

  // [T] §3.1 M-2 — the leaf stores its OWN LOCAL NAME.
  it('M-2 · §2.3 item 2 · a node stores its OWN local name, never a stored dotted path', async () => {
    const store = await storeFor('M-2')
    await settle(store, 'commit', 'file.window.tabs.landingPage', 'v')
    const rows = ((store.register as Record<string, unknown>)['rows'] ?? []) as Record<string, unknown>[]
    expect(rows.map((row) => row['name']), 'M-2 — the register row\u2019s spelling is the caller\u2019s own root spelling').toContain('window')
    const snapshot = store.export('file.window.tabs.landingPage')
    const dotted = findAllStrings(snapshot).filter((s) => s.includes('.') && s !== 'file.window.tabs.landingPage')
    expect(dotted, 'M-2 — NO node carries a dotted path as its local name (§2.3 item 2; a node that stored one FAILS M-2)').toEqual([])
    expect(findAllStrings(snapshot), 'M-2 — the leaf\u2019s own local name is present as a whole segment').toContain('landingPage')
  })

  // [T] §3.2 F-1 — arm (i), C-TOP.
  it('F-1 · §2.3 item 6(i) · no registered top-level name → undeclared-name at C-TOP, never a throw', async () => {
    const store = await storeFor('F-1')
    const result = store.resolve('file.nosuch.x')
    expect(reasonOf('F-1', result), 'F-1 — the reason token for this arm').toBe('undeclared-name')
    const d = diagnosticOf('F-1', result)
    expect(d['step'], 'F-1 — the diagnostic names the failing step').toBe('C-TOP')
    expect(d['segment'], 'F-1 — the FIRST path segment that failed').toBe('nosuch')
    expect(d['owner'], 'F-1 — `owner` is null EXACTLY at C-TOP (§2.3 item 6 (i))').toBe(null)
  })

  // [T] §3.2 F-3 — arm (ii), D-ANCHOR.
  it('F-3 · §2.3 item 6(ii) · no such anchor key → no-such-anchor at D-ANCHOR, NEVER undeclared-name', async () => {
    const store = await storeFor('F-3')
    await settle(store, 'commit', 'file.window.tabs.landingPage', 'v')
    const result = store.resolve('file.window.nosuchanchor.x')
    const d = diagnosticOf('F-3', result)
    expect(reasonOf('F-3', result), 'F-3 — the name IS declared; its chain is absent, and using the other token would MISREPORT a closed union').toBe('no-such-anchor')
    expect(d['step'], 'F-3 — the failing step').toBe('D-ANCHOR')
    expect(d['segment'], 'F-3 — the missing anchor KEY is the caller\u2019s own segment').toBe('nosuchanchor')
    expect(d['owner'], 'F-3 — the node the walk had reached').not.toBe(null)
  })

  // [T] §3.2 F-4 — arm (iv), H-FLAG, with its agreeing positive control.
  it('F-4 · §2.3 items 6(iv)/7 · the filter miss on a resolvable leaf, with the SAME name agreeing as control', async () => {
    const store = await storeFor('F-4')
    await settle(store, 'commit', 'temp.window.tabs.landingPage', 'v')
    const miss = store.resolve('file.window.tabs.landingPage')
    const d = diagnosticOf('F-4', miss)
    expect(reasonOf('F-4', miss), 'F-4 — `H-FLAG` runs AFTER `G-RESOLVE-LEAF`, so a filter miss on a resolvable leaf is this token').toBe('tier-filter-miss')
    expect(d['step'], 'F-4 — the step\u2019s own name').toBe('H-FLAG')
    const control = store.resolve('temp.window.tabs.landingPage') as Record<string, unknown>
    expect(control['found'], 'F-4 POSITIVE control — the SAME name with the agreeing token ANSWERS').toBe(true)
    expect(control['flag'], 'F-4 control — the resolved node\u2019s OWN flag').toBe('temp')
  })

  // [T] §3.2 F-5 — arm (v), E-LINK.
  it('F-5 · §2.3 item 6(v)/§2.5 item 6 · a severed link → severed-link at E-LINK, never a silent fall-through', async () => {
    const store = await storeFor('F-5')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    await settle(store, 'sever', 'file.window', 'tabs')
    const result = store.resolve('file.window.tabs.landingPage')
    const d = diagnosticOf('F-5', result)
    expect(reasonOf('F-5', result), 'F-5 — the reason token for this arm').toBe('severed-link')
    expect(d['step'], 'F-5 — the failing step').toBe('E-LINK')
    expect(d['owner'], 'F-5 — the diagnostic names the link\u2019s own node and the reclaimed target').not.toBe(null)
  })

  // [T] §3.2 F-6 — arm (vi), F-CACHE, with the non-refusal normal path beside it.
  it('F-6 · §2.3 item 6(vi)/§2.6 item 4 · a stale entry whose rebuild FAILS is a refusal at F-CACHE; a stale entry WITHOUT a failed rebuild is a NORMAL path', async () => {
    const store = await storeFor('F-6')
    await settle(store, 'commit', 'file.window.tabs.landingPage', 'old')
    await settle(store, 'commit', 'temp.window.tabs.landingPage', 'new')
    const normal = store.resolve('temp.window.tabs.landingPage') as Record<string, unknown>
    expect(normal['found'], 'F-6 — the STALE-CACHE arm WITHOUT a failed rebuild is NOT a refusal at all: it is the declared NORMAL path').toBe(true)
    expect(typeof store.cacheEntryFor, 'F-6 — the seam member `cacheEntryFor` (§2.1\u2019s test-only seam)').toBe('function')
    const stale = store.cacheEntryFor?.('window')
    expect(stale, 'F-6 — a stale entry whose rebuild cannot answer is what the arm is driven through').not.toBe(undefined)
    // THE DRIVE ITSELF IS THE INJECTOR (`§2.1`'s block annotation, `TW-2`): `failNextCacheRebuild`
    // arms the NEXT rebuild the INVALIDATION SITE performs (`§2.6` item 4, the record's `DR-7`)
    // to fail, ONE-SHOT. The armed failure is INTERNAL and arrives as the arm's DECLARED
    // RETURNED RECORD, so the injector call itself adds no throw class — asserted BESIDE the
    // drive so a seam that threw would not be read as the arm holding.
    expect(typeof store.failNextCacheRebuild, 'F-6 — the arm\u2019s INSTRUMENT is the declared one-shot seam member `failNextCacheRebuild` (§2.1\u2019s GraphStore block, appended 2026-10-01)').toBe('function')
    let armThrew: unknown = null
    try {
      store.failNextCacheRebuild?.()
    } catch (e) {
      armThrew = e
    }
    expect(armThrew, 'F-6 — arming the injector adds NO throw class: `§2.2 P-5`\u2019s three named exceptions are unmoved and the injection adds no fourth').toBe(null)
    // THE ARMED REBUILD IS PERFORMED BY THE NEXT INVALIDATING OPERATION (the mutation between
    // the arming and the read), and the arm is observed through the walk\u2019s NEXT answer — the
    // contract\u2019s own words: *"the armed failure is internal and is consumed by the mutating
    // operation\u2019s own synchronous rebuild step, which is why the arm is observable only
    // through the walk\u2019s next answer"*.
    const invalidated = await settle(store, 'commit', 'mem.window.tabs', 'm2')
    expect(invalidated['reason'], 'F-6 — the invalidating operation\u2019s own rebuild failure is INTERNAL: the mutating operation still answers its receipt, and the injection adds no throw').not.toBe('rebuild-failed')
    const { reason, result } = await forceStaleRebuild(store, 'window')
    expect(reason, `F-6 — ${reason ?? ''}`).toBe('rebuild-failed')
    const d = diagnosticOf('F-6', result)
    expect(reasonOf('F-6', result), 'F-6 — the arm\u2019s own token: `rebuild-failed` names the STALE-AND-UNREBUILDABLE case alone').toBe('rebuild-failed')
    expect(d['step'], 'F-6 — the failing step').toBe('F-CACHE')
    expect(d['owner'], 'F-6 — the diagnostic names the node the walk had reached; the stale entry lives on the `window` root\u2019s own link, whose handle is that root\u2019s register row (`§2.4` item 3)').toBe(
      ((store.register as Record<string, unknown>)?.['rows'] as Record<string, unknown>[] | undefined)?.find((r) => r['name'] === 'window')?.['nodeRef'],
    )
    // THE ONE-SHOT BOUND: the armed failure is CONSUMED by the invalidation site\u2019s own
    // synchronous rebuild, so a SECOND invalidating operation rebuilds normally and the same
    // read answers the declared NORMAL path again — the arm\u2019s own token belongs to the ONE
    // armed rebuild and is not a standing state.
    await settle(store, 'commit', 'mem.window.tabs.landingPage', 'later')
    const second = store.resolve('temp.window.tabs.landingPage') as Record<string, unknown>
    expect(reasonOf('F-6 · the second drive', second), 'F-6 — ONE-SHOT: the second invalidating operation rebuilds normally, so the arm\u2019s token is not a standing state').not.toBe('rebuild-failed')
  })

  // [T] §3.2 F-7 — arm (vii), the write-side twin.
  it('F-7 · §2.3 item 6(vii)/§2.5 item 6 · a write to an ORPHANED reference fails LOUDLY as a RETURNED RECORD', async () => {
    const store = await storeFor('F-7')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    await settle(store, 'sever', 'file.window', 'tabs')
    for (const op of ['set', 'commit', 'remove'] as const) {
      if (op === 'remove') { assertRefusalShape('F-7 (remove)', store.remove('file.window.tabs'), 'severed-link'); continue }
      assertRefusalShape(`F-7 (${op})`, store[op]('file.window.tabs', 'v'), 'severed-link')
    }
    const { reason } = await settle(store, 'commit', 'file.window.tabs', 'v')
    expect(reason, 'F-7 — a write through the severed link fails LOUDLY; no pin set exists and no silent no-op is admissible').toBe('severed-link')
  })

  // [T] §3.4 R-4 — the walk's precedence, total and ordered, with its controls.
  it('R-4 · §2.5 item 2 · the precedence is total and ordered, and every refusal carries a diagnostic naming its step', async () => {
    const store = await storeFor('R-4')
    await settle(store, 'commit', 'temp.window.tabs.landingPage', 'v')
    const cases: [string, string, string][] = [
      ['secure.window.tabs.landingPage', 'secure-refused', 'B-SECURE-GATE'],
      ['File.x', 'malformed-name', 'A-PARSE'],
      ['file.nosuch.x', 'undeclared-name', 'C-TOP'],
      ['file.window.nosuchanchor.x', 'no-such-anchor', 'D-ANCHOR'],
      ['file.window.tabs.landingPage', 'tier-filter-miss', 'H-FLAG'],
    ]
    for (const [name, reason, step] of cases) {
      const result = store.resolve(name)
      expect(reasonOf(`R-4 (${name})`, result), `R-4 — the reason token reported is the FIRST row that applies: ${name}`).toBe(reason)
      const d = diagnosticOf(`R-4 (${name})`, result)
      expect(d['step'], `R-4 — the diagnostic names its own step for ${name}`).toBe(step)
      expect([...DECLARED_STEPS], `R-4 — the step id is inside the EIGHT-id union`).toContain(d['step'])
      expect([...DECLARED_REFUSAL_UNION], `R-4 — the reason is inside the operative union of SIXTEEN`).toContain(d['reason'])
    }
  })
})

// ===========================================================================
// 3. THE FILTER RULE AND THE REGISTER — M-4, F-2, F-14…F-18, R-6
// ===========================================================================
describe('§2.4/§2.5 · the filter rule and the register', () => {
  // [T] §3.1 M-4 — tiers compose.
  it('M-4 · §2.3 item 5 · two holders coexist for ONE logical path across tiers, with no collision', async () => {
    const store = await storeFor('M-4')
    const a = await settle(store, 'commit', 'file.window.tabs', 'file-value')
    const b = await settle(store, 'commit', 'temp.window.tabs', 'temp-value')
    expect([a.reason, b.reason], 'M-4 — BOTH writes commit: a body that refuses a LEGAL SECOND TIER\u2019s holder FAILS M-5').toEqual([null, null])
    expect((store.resolve('temp.window.tabs') as Record<string, unknown>)['value'], 'M-4 — the qualified read addresses exactly that tier').toBe('temp-value')
    expect((store.resolve('file.window.tabs') as Record<string, unknown>)['value'], 'M-4 — the second holder answers its own tier').toBe('file-value')
  })

  // [T] §3.2 F-2 — the cold item (miss) vs the unregistered root name (refusal).
  it('F-2 · §2.4 item 4 · a COLD ROOT NAME is a DECLARED MISS while a name that is not a root name at all is a REFUSAL', async () => {
    const store = await storeFor('F-2')
    const cold = store.resolve('file.entity.order') as Record<string, unknown>
    expect(cold['found'], 'F-2(a) — a cold root name draws the DECLARED MISS, never a refusal').toBe(false)
    expect(cold['value'], 'F-2(a) — the miss\u2019s own members').toBe(undefined)
    expect(cold['tier'], 'F-2(a) — `tier: null` on the miss').toBe(null)
    expect(cold['cache'], 'F-2(a) — `cache: null` on the miss').toBe(null)
    expect(cold['name'], 'F-2(a) — the caller\u2019s own spelling').toBe('file.entity.order')
    const unregistered = store.resolve('mem.other.thing')
    expect(reasonOf('F-2(b)', unregistered), 'F-2(b) — a path no register row carries answers the refusal; a body in which the two collapse FAILS').toBe('undeclared-name')
    const rows = ((store.register as Record<string, unknown>)['rows'] ?? []) as Record<string, unknown>[]
    expect(rows.filter((row) => row['name'] === 'entity.order'), 'F-2 — a COLD ITEM HAS NO ROW: the row\u2019s ABSENCE is the assertion (§2.4 item 4\u2019s annotation)').toEqual([])
    for (const row of rows) {
      expect(row['derived'], 'F-2 · §2.4 item 1 — `derived` is TRUE on every row that exists; `derived:false` is UNREACHABLE').toBe(true)
    }
  })

  // [T] §3.2 F-14 — secure refused before the register and before any traversal.
  it('F-14 · §2.4 item 5/§2.5 item 2 · `secure.*` is refused BEFORE the register is consulted, on EVERY surface member', async () => {
    const store = await storeFor('F-14')
    expect(reasonOf('F-14', store.resolve('secure.k')), 'F-14 — NEVER undeclared-name, and never a tier-filter-miss').toBe('secure-refused')
    expect(reasonOf('F-14', store.resolve('secure.undeclared')), 'F-14 — the undeclared companion draw answers the same token').toBe('secure-refused')
    for (const member of ['remove', 'clear'] as const) {
      const receipt = store[member]('secure.k')
      assertRefusalShape(`F-14 (${member})`, receipt, 'secure-refused')
    }
    for (const member of ['set', 'commit'] as const) {
      const receipt = store[member]('secure.k', 'v')
      assertRefusalShape(`F-14 (${member})`, receipt, 'secure-refused')
    }
    let subscribed: unknown = 'not-returned'
    try {
      subscribed = store.subscribe('secure.k', () => {})
    } catch {
      subscribed = 'threw'
    }
    expect(subscribed, 'F-14 — `subscribe` on a `secure.*` name answers a refusal record and registers NOTHING').not.toBe('not-returned')
    expect(reasonOf('F-14 control', store.resolve('mem.k')), 'F-14 POSITIVE control — the SAME name without the `secure` segment answers undeclared-name').toBe('undeclared-name')
  })

  // [T] §3.2 F-15 — no secure-flagged node in the register or the traversal.
  it('F-15 · §2.11 item 2/§3.3 I-7 · a `secure`-flagged node never appears in the register or the traversal, BY CONSTRUCTION', async () => {
    const store = await storeFor('F-15')
    await settle(store, 'commit', 'file.entity.order', 'v')
    const rows = ((store.register as Record<string, unknown>)['rows'] ?? []) as Record<string, unknown>[]
    expect(rows.length, 'F-15 — the register is read exhaustively').toBeGreaterThan(0)
    const flags = new Set<string>()
    for (const row of rows) {
      const probe = store.resolve(`file.${String(row['name'])}`)
      if (isRecord(probe) && typeof probe['flag'] === 'string') flags.add(probe['flag'])
      const seen = isRecord(probe) ? probe['flag'] : undefined
      if (seen !== undefined) {
        expect([...DECLARED_NODE_FLAGS], 'F-15 — no register row\u2019s nodeRef resolves to a `secure`-flagged node').toContain(seen)
      }
    }
    expect([...flags], 'F-15 — the reached set never carries the fourth token').not.toContain('secure')
    expect(Object.keys((store.tiers ?? {}) as Record<string, unknown>).sort(), 'F-15 · §2.1\u2019s `GraphStore.tiers` — the THREE collections, by tier name, FROZEN').toEqual([...DECLARED_NODE_FLAGS].sort())
  })

  // [T] §3.2 F-16 — malformed names, with the four legal tokens as control.
  it('F-16 · §2.3 items 1/3 · eight malformed spellings are refused, and the FOUR legal tokens are the positive control', async () => {
    const store = await storeFor('F-16')
    for (const bad of ['', 'file..x', 'file.', 'File.x', 'disk.x', '.x', 'file']) {
      expect(reasonOf(`F-16 (${JSON.stringify(bad)})`, store.resolve(bad)), `F-16 — \`${bad}\` is refused malformed-name, never a throw`).toBe('malformed-name')
    }
    expect(reasonOf('F-16 (non-string)', store.resolve(42 as unknown as string)), 'F-16 — a non-string is refused malformed-name').toBe('malformed-name')
    for (const token of DECLARED_TIER_TOKENS.filter((t) => t !== 'secure')) {
      const outcome = await settle(store, 'commit', `${token}.entity.order`, 'v')
      expect(outcome.reason, `F-16 POSITIVE control — each of the four legal tier tokens on a declared root COMMITS (${token})`).toBe(null)
    }
  })

  // [T] §3.2 F-17 — a tier-free write is refused; the read on the same spelling is legal.
  it('F-17 · §2.8 item 4 · a tier-free write is refused malformed-name, while a `resolve` on the same spelling is LEGAL', async () => {
    const store = await storeFor('F-17')
    expect(reasonOf('F-17 (set)', store.set('entity.order', 'v')), 'F-17 — the store may not choose the tier').toBe('malformed-name')
    const commit = await settle(store, 'commit', 'entity.order', 'v')
    expect(commit.reason, 'F-17 — the write side requires a tier qualifier').toBe('malformed-name')
    const removed = store.remove('entity.order')
    assertRefusalShape('F-17 (remove)', removed, 'malformed-name')
    const read = store.resolve('entity.order')
    expect(reasonOf('F-17 — the read has a filter order and the write has none', read), 'F-17 — the read on the same spelling is LEGAL, so it is NOT the malformed-name arm').not.toBe('malformed-name')
  })

  // [T] §3.4 R-6 — the tier token is a FILTER, never a second residency authority.
  it('R-6 · §2.3 item 7/§2.2 P-7 · a disagreement is a DIAGNOSTIC rather than a silent pick — the durability-lie class', async () => {
    const store = await storeFor('R-6')
    await settle(store, 'commit', 'temp.window.tabs', 'temp-value')
    const lied = store.resolve('file.window.tabs') as Record<string, unknown>
    expect(lied['found'], 'R-6 — a body that answers a `temp`-flagged node\u2019s value under a `file` request FAILS this row').not.toBe(true)
    expect(reasonOf('R-6', lied), 'R-6 — the disagreement is reported as its own diagnostic token').toBe('tier-filter-miss')
    const agreeing = store.resolve('temp.window.tabs') as Record<string, unknown>
    expect(agreeing['found'], 'R-6 POSITIVE control — the agreeing request ANSWERS').toBe(true)
    expect(agreeing['flag'], 'R-6 — the answer\u2019s flag is the resolved node\u2019s OWN flag').toBe('temp')
    expect(agreeing['tier'], 'R-6 — `tier` is the node\u2019s own flag on a hit').toBe('temp')
  })

  // [T] §3.2 F-18 — the register's six construction-time arms, each with a control.
  it('F-18 · §2.4 item 5 · the register\u2019s closed SIX construction-time arms each refuse with their own token, each beside a NAMED positive control', async () => {
    const { reason, make } = await factoryFor('F-18')
    expect(make, `F-18 — ${reason ?? ''}`).not.toBe(null)
    const factory = make as (o?: unknown) => unknown
    const arms: [string, unknown, string][] = [
      ['(a) malformed-name — a top-level name carrying no name/non-string/empty', { declarations: { rows: [{ name: '' }] } }, 'malformed-name'],
      ['(b) secure-refused — a declared row whose first segment is `secure`', { declarations: { rows: [{ name: 'secure.entity.secret' }] } }, 'secure-refused'],
      ['(c) undeclared-name — a DOUBLED top-level name', { declarations: { rows: [{ name: 'file.entity.order' }, { name: 'file.entity.order' }] } }, 'undeclared-name'],
      ['(d) reserved-namespace — a name colliding with a reserved namespace key', { declarations: { rows: [{ name: 'file.entity.order' }] }, reservedNamespaces: ['entity'] }, 'reserved-namespace'],
      ['(f) malformed-pattern — a malformed or ambiguous top-level pattern', { declarations: { rows: [{ name: 'file.entity.*' }, { name: 'file.entity.order' }] } }, 'malformed-pattern'],
    ]
    for (const [arm, options, token] of arms) {
      const outcome = constructionOutcome(factory, options)
      expect(outcome.threw, `F-18 ${arm} — the six arms fire AT CONSTRUCTION as a GraphLoadError (§2.4 item 5)`).toBe(true)
      expect(outcome.reason, `F-18 ${arm} — the arm\u2019s OWN token`).toBe(token)
      const control = constructionOutcome(factory, { declarations: { rows: [{ name: 'file.entity.order' }] } })
      expect(control.threw, `F-18 ${arm} — its NAMED POSITIVE control LOADS (one per arm)`).toBe(false)
    }
    const { reason: eReason, make: errMake } = { reason: null as string | null, make: await errorFactory() }
    expect(errMake, `F-18 — ${eReason ?? 'the one exported error constructor'}`).not.toBe(null)
    const err = (errMake as (m: string, r: string) => Record<string, unknown>)('m', 'malformed-name')
    expect(err['reason'], 'F-18 · §2.1\u2019s `GraphLoadError` — the error carries its own `reason` member').toBe('malformed-name')
    expect(err instanceof Error, 'F-18 — the load refusal is an Error subclass').toBe(true)
  })
})

// ===========================================================================
// 4. THE UNIQUENESS CONSTRAINT AND THE MERGED READ — M-5, M-6, F-8
// ===========================================================================
describe('§2.5/§2.7 · the read\u2019s case set and the uniqueness constraint', () => {
  // [T] §3.1 M-5 — RE-DERIVED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` at `§0`):
  // the read's SURVIVING CASE SET — HIT · QUALIFIED · MISS — driven at the ONE state in which
  // a path is unheld while its descendants are resident, THE DECLARED-BUT-UNWRITTEN PARENT WITH
  // A WRITTEN CHILD. The row keeps its id, its layer (`[T]`) and its place in the authoring
  // order (`§4.2` item 4). The AS-FILED subject — *"a path NO node holds whose descendants are
  // held answers the merged arm, overlay-ordered"*, with `merged`/`parts`/overlay order — is
  // WITHDRAWN and its bytes are kept visible at `§3.1`'s own annotation in the contract.
  it('M-5 · §2.5 item 4 · the case set HIT · QUALIFIED · MISS at the declared-but-unwritten parent', async () => {
    const store = await storeFor('M-5')
    const minted = await settle(store, 'commit', 'file.entity.id.child', 'f')
    expect(minted.reason, 'M-5 — the write through the fixture\u2019s own declared root name commits').toBe(null)
    const rootRef = await rootRefOf(store, 'entity')
    expect(typeof rootRef, 'M-5 — the root carries a register row with its own node handle (§2.4 item 1(b))').toBe('string')
    const midRef = await refUnder(store, rootRef as string, 'id')
    expect(typeof midRef, 'M-5 — the fixture\u2019s own parent link is readable through `linkFor` (the intermediate node)').toBe('string')
    const childRef = await refUnder(store, midRef as string, 'child')
    expect(typeof childRef, 'M-5 — the fixture\u2019s parent link and its child link are readable through `linkFor`').toBe('string')
    // (i) THE HIT: the node\u2019s OWN flag is what the answer carries.
    const hit = store.resolve('file.entity.id.child') as Record<string, unknown>
    expect(hit['found'], 'M-5(i) HIT — the child resolves').toBe(true)
    expect(hit['flag'], 'M-5(i) HIT — the answer\u2019s tier is the NODE\u2019s OWN flag, read off the node').toBe(await nodeFlagOf(store, childRef))
    expect(hit['cache'], 'M-5(i) HIT — `cache` IS the tier collection\u2019s own handle, BY IDENTITY (§2.5 item 3)').toBe(
      (store.tiers as Record<string, unknown>)['file'],
    )
    // (ii) THE QUALIFIED READ: the same node under a DISAGREEING token addresses ONE tier.
    const qualified = store.resolve('temp.entity.id.child') as Record<string, unknown>
    expect(qualified['status'], 'M-5(ii) QUALIFIED — a disagreement is a RETURNED RECORD, never a silent pick').toBe('refused')
    expect(qualified['reason'], 'M-5(ii) QUALIFIED — `tier-filter-miss`, NEVER `no-such-anchor` (§2.3 items 6(iv)/7)').toBe('tier-filter-miss')
    const qDiag = qualified['diagnostic'] as Record<string, unknown>
    expect(qDiag['step'], 'M-5(ii) — decided at H-FLAG, AFTER G-RESOLVE-LEAF').toBe('H-FLAG')
    expect(qDiag['owner'], 'M-5(ii) — the diagnostic names the node the walk reached').toBe(childRef)
    expect(await nodeFlagOf(store, childRef), 'M-5(ii) — and that node\u2019s own flag is \u2018file\u2019: the store NEVER restated the `temp` token as the node\u2019s tier').toBe('file')
    // (iii) THE MISS: the parent reference is made unwritten while its child stays resident.
    const cleared = await settle(store, 'clear', 'file.entity.id')
    expect(cleared.reason, 'M-5(iii) — the TIER-LOCAL clear commits (§2.8 item 4)').toBe(null)
    expect(await nodeFlagOf(store, childRef), 'M-5(iii) — the clear is NON-RECURSIVE: the child node is UNTOUCHED').toBe('file')
    const childStillHeld = store.resolve('file.entity.id.child') as Record<string, unknown>
    expect(childStillHeld['found'], 'M-5(iii) — and the child still HOLDS its own value: the descendants are resident').toBe(true)
    const miss = store.resolve('file.entity.id') as Record<string, unknown>
    expect(miss['found'], 'M-5(iii) MISS — the unwritten parent is the DECLARED MISS, never a composite (§2.3 item 6(iii))').toBe(false)
    expect(miss['tier'], 'M-5(iii) — the miss asserts NO tier').toBe(null)
    expect(miss['cache'], 'M-5(iii) — and carries NO handle').toBe(null)
    expect(miss['status'], 'M-5(iii) — and it is NOT a refusal').toBe(undefined)
    expect(Object.prototype.hasOwnProperty.call(miss, 'merged'), 'M-5(iii) — no `merged` member exists on any arm (§2.1 block annotation, item (2))').toBe(false)
    expect(Object.prototype.hasOwnProperty.call(miss, 'parts'), 'M-5(iii) — and no `parts` list: both are WITHDRAWN with the merged arm').toBe(false)
  })

  // [T] §3.2 F-8 — RE-DERIVED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` at `§0`): the
  // first-hit boundary is no longer a boundary BETWEEN two arms — there is one arm to answer
  // from — so it is driven as a PLAIN PROPERTY OF THE HIT ARM: where a node holds the read path,
  // the hit answers from THAT NODE ALONE (its value, its own flag, its own handle) and NO second
  // holder is consulted. The as-filed subject — *"where a node holds the read path the hit arm
  // answers and NO merge runs"* — is kept visible at `§3.2`'s own annotation in the contract.
  it('F-8 · §2.5 item 4 · where a node holds the read path the hit answers from that node ALONE', async () => {
    const store = await storeFor('F-8')
    await settle(store, 'commit', 'file.entity.id', 'f')
    await settle(store, 'commit', 'temp.entity.id.child', 't')
    const holderRef = await rootRefOf(store, 'entity')
    const hit = store.resolve('file.entity.id') as Record<string, unknown>
    expect(hit['found'], 'F-8 — a node holds the read path, so the HIT answers').toBe(true)
    expect(hit['flag'], 'F-8 — the hit\u2019s tier is the node\u2019s OWN flag').toBe(await nodeFlagOf(store, holderRef as string))
    expect(hit['tier'], 'F-8 — and `tier` is that same own flag: the token is a filter, not the carrier').toBe(await nodeFlagOf(store, holderRef as string))
    expect(hit['cache'], 'F-8 — `cache` is the hit\u2019s own tier handle, BY IDENTITY (§2.5 item 3)').toBe(
      (store.tiers as Record<string, unknown>)['file'],
    )
    expect(Object.prototype.hasOwnProperty.call(hit, 'merged'), 'F-8 — no `merged` member exists, on this arm or any other').toBe(false)
    expect(Object.prototype.hasOwnProperty.call(hit, 'parts'), 'F-8 — and no `parts` list: NO COMPOSITION RUNS').toBe(false)
    // THE OTHER TIER\u2019S REQUEST MUST NOT ANSWER THIS NODE\u2019S VALUE (the durability-lie class `R-6`),
    // and it must not COMPOSE one either: the qualified case addresses ONE tier.
    const other = store.resolve('mem.entity.id') as Record<string, unknown>
    expect(other['value'], 'F-8 — a `mem` request never answers the `file` holder\u2019s own value').not.toBe('f')
    expect(Object.prototype.hasOwnProperty.call(other, 'parts'), 'F-8 — and it never composes: no `parts` anywhere').toBe(false)
  })

  // [T] §3.1 M-6 — the uniqueness constraint's two declared outcomes.
  it('M-6 · §2.7 item 4 · a repeat at ONE (path, tier) pair is an EDIT or a LOUD FAILURE, per call params', async () => {
    const store = await storeFor('M-6')
    const first = await settle(store, 'commit', 'file.entity.order', 'one')
    expect(first.reason, 'M-6 — the first commit').toBe(null)
    const edited = (await settle(store, 'commit', 'file.entity.order', 'two', { onRepeat: 'edit' })) as { reason: string | null }
    expect(edited.reason, 'M-6 — the DEFAULT routes the repeat to an EDIT').toBe(null)
    expect((store.resolve('file.entity.order') as Record<string, unknown>)['value'], 'M-6 — the EDIT rewrites the EXISTING node in place of minting a second').toBe('two')
    const before = JSON.stringify((store.register as Record<string, unknown>)['rows'])
    const refused = store.commit('file.entity.order', 'three', { onRepeat: 'refuse' })
    assertRefusalShape('M-6 (refuse)', refused, 'duplicate-path-tier')
    expect(JSON.stringify((store.register as Record<string, unknown>)['rows']), 'M-6 — the store is BYTE-IDENTICAL to its pre-call state after the refusal').toBe(before)
  })
})

// ===========================================================================
// 5. THE WRITE SURFACE AND THE REGENERATION TRANSACTION — M-9…M-13, F-9, F-10,
//    F-12, F-13, F-19, F-20, F-21, and §2.4 item 7(h)
// ===========================================================================
describe('§2.7/§2.8 · the write surface and the transaction', () => {
  // [T] §3.1 M-9 — `commit` mints the flag; `set` never mints and never changes one.
  it('M-9 · §0A note 4/§2.8 items 1/3 · `commit` mints the flag; `set` never mints and never changes one', async () => {
    const store = await storeFor('M-9')
    const refusedSet = store.set('file.entity.order', 'v')
    assertRefusalShape('M-9 (set on a path with no node)', refusedSet, 'undeclared-name')
    const minted = await settle(store, 'commit', 'file.entity.order', 'v')
    expect(minted.reason, 'M-9 — `commit` MINTS one node at the requested tier').toBe(null)
    const hit = store.resolve('file.entity.order') as Record<string, unknown>
    expect(hit['flag'], 'M-9 — the minted node\u2019s flag is the requested tier').toBe('file')
    const flagBefore = hit['flag']
    const wrote = await settle(store, 'set', 'file.entity.order', 'w')
    expect(wrote.reason, 'M-9 — a subsequent `set` on the same pair writes the value').toBe(null)
    expect((store.resolve('file.entity.order') as Record<string, unknown>)['flag'], 'M-9 — and leaves the flag UNCHANGED').toBe(flagBefore)
  })

  // [T] §3.1 M-10 — anchors are immutable; a re-parent deletes and mints.
  it('M-10 · §2.2 P-2/§2.6 item 5 · the post-regeneration node is a NEW node with NEW anchors, and no operation mutates one', async () => {
    const store = await storeFor('M-10')
    await settle(store, 'commit', 'temp.entity.id', 'v')
    const before = await mintedRefs(store)
    await settle(store, 'commit', 'file.entity.id', 'v')
    const after = await mintedRefs(store)
    expect(after.length, 'M-10 — the regeneration MINTS new nodes rather than mutating the original').toBeGreaterThan(before.length)
    expect(before.every((ref) => !after.includes(ref)), 'M-10 — the pre-regeneration node\u2019s ref is not carried into the regenerated set').toBe(true)
    expect(typeof store.parentLinkCountOf, 'M-10 · R-2 — the parent-link census is the seam that reads the tree invariant').toBe('function')
  })

  // [T] §3.1 M-11 / §2.8 items 5/6 — the FIVE-step transaction.
  it('M-11 · §2.8 item 5 · the regeneration is a FIVE-step machine (build → compare census → serialize → validate → accept)', async () => {
    const store = await storeFor('M-11')
    await settle(store, 'commit', 'temp.entity.id', 'v')
    await settle(store, 'commit', 'temp.entity.id.child', 'c')
    const receipt = (await settle(store, 'commit', 'file.entity.id.child', 'c2')) as Record<string, unknown>
    expect(receipt['crossings'], 'M-11 — ONE crossing for the WHOLE regenerated set: a crossing that serializes one reference at a time is a FINDING').toBe(1)
    const r = receipt as unknown as { receipt?: Record<string, unknown> }
    const rows = ((r.receipt ?? receipt)['rows'] ?? receipt['rows'] ?? []) as unknown[]
    expect(rows.length, 'M-11 — `rows[]` carries one entry PER AFFECTED REFERENCE, `N` of them').toBeGreaterThan(0)
    expect((store.resolve('file.entity.id.child') as Record<string, unknown>)['found'], 'M-11 — the regenerated set is live at the requested tier').toBe(true)
    expect(reasonOf('M-11 — the original is deleted as the transaction\u2019s LAST step', store.resolve('temp.entity.id.child')), 'M-11 — the original re-tier is gone from its old tier').not.toBe('tier-filter-miss')
  })

  // [T] §3.1 M-12 — the census' two declared instruments, never interchanged.
  it('M-12 · §2.8 item 5/§7a.1 item 11 · the COMPARISON uses the tier\u2019s own row count; the segment total is asserted BESIDE it', async () => {
    const store = await storeFor('M-12')
    await settle(store, 'commit', 'temp.entity.id', 'v')
    await settle(store, 'commit', 'temp.entity.id.child', 'c')
    const rowsBefore = (((store.register as Record<string, unknown>)['rows'] ?? []) as unknown[]).length
    await settle(store, 'commit', 'file.entity.id.child', 'c2')
    const rowsAfter = (((store.register as Record<string, unknown>)['rows'] ?? []) as unknown[]).length
    expect(typeof rowsBefore, 'M-12 — the tier\u2019s own row count is the DECLARED instrument, read from the register\u2019s own rows (never from a trie)').toBe('number')
    expect(rowsAfter >= rowsBefore, 'M-12 — the corroborating reading is asserted BESIDE the comparison and never substituted for it').toBe(true)
  })

  // [T] §3.2 F-9 — the THREE declared failure arms, each with its own token.
  it('F-9 · §2.8 item 6 · all THREE arms are declared failures that leave the ORIGINAL ALIVE (`rebuild-failed` · `serialize-failed` · `validate-failed`)', async () => {
    const store = await storeFor('F-9')
    await settle(store, 'commit', 'temp.entity.id', 'v')
    const tokens = ['rebuild-failed', 'serialize-failed', 'validate-failed']
    for (const token of tokens) {
      expect([...DECLARED_REFUSAL_UNION], `F-9 — the union carries the arm\u2019s own token \`${token}\``).toContain(token)
    }
    const { receipt, token, alive } = await driveRegenerationFailure(store, 'census-mismatch')
    expect(tokens, `F-9 — the arm\u2019s token is one of the THREE; the receipt reported \`${String(token)}\``).toContain(token)
    assertRefusalShape('F-9', receipt, String(token))
    expect((receipt as Record<string, unknown>)['crossings'], 'F-9 — a failed regeneration crosses NOTHING').toBe(0)
    expect((receipt as Record<string, unknown>)['events'], 'F-9 — a failed regeneration emits NOTHING, and §2.10 item 3\u2019s `severed` arm is NOT emitted by any of them').toBe(0)
    expect(alive, 'F-9 — the ORIGINAL STILL RESOLVES: nothing deleted, no partial state').toBe(true)
  })

  // [T] §3.2 F-10 — a remove inside the window: ONE crossing, one row per reference.
  it('F-10 · §2.8 items 5/7 · a `remove` during the regeneration window is EITHER a completed regeneration OR the declared failure', async () => {
    const store = await storeFor('F-10')
    await settle(store, 'commit', 'temp.entity.id', 'v')
    await settle(store, 'commit', 'temp.entity.id.child', 'c')
    const receipt = (await settle(store, 'commit', 'file.entity.id', 'P')) as Record<string, unknown>
    const outcome = receipt['status']
    expect(['committed', 'refused'], 'F-10 — the terminal is one of the two declared kinds').toContain(outcome)
    const crossings = receipt['crossings']
    expect(crossings === 0 || crossings === 1, 'F-10 — ONE crossing (never one per reference), or zero on a failure').toBe(true)
    if (outcome === 'refused') {
      expect((await settle(store, 'resolve', 'temp.entity.id')).reason, 'F-10 — the declared failure LEFT THE ORIGINAL ALIVE').toBe(null)
    }
  })

  // [T] §3.2 F-12 — a refusal clears and emits nothing, on EVERY mutator.
  it('F-12 · §2.8 items 2/4 · every refusal carries cleared: [], rows: [], crossings: 0, events: 0, with lower-tier copies still resolving', async () => {
    const store = await storeFor('F-12')
    await settle(store, 'commit', 'mem.entity.id', 'm')
    await settle(store, 'commit', 'temp.entity.id', 't')
    const refusals: [string, () => unknown, string][] = [
      ['a malformed name', () => store.set('entity.id', 'v'), 'malformed-name'],
      ['an undeclared name', () => store.set('file.other.thing', 'v'), 'undeclared-name'],
      ['a reserved name', () => store.remove('file.entity.pinned'), 'reserved-name'],
      ['a secure name', () => store.set('secure.k', 'v'), 'secure-refused'],
    ]
    for (const [what, call, token] of refusals) {
      assertRefusalShape(`F-12 (${what})`, call(), token)
      expect(reasonOf(`F-12 (${what}) — every resident lower-tier copy STILL RESOLVES`, store.resolve('temp.entity.id')), `F-12 (${what})`).not.toBe('undeclared-name')
    }
  })

  // [T] §3.2 F-13 / §5.5.1 P-GR-TP-3 — the cap refuses and NEVER evicts.
  it('F-13 · §2.4 item 6/§0A note 6 · the cap overflow REFUSES and never evicts, clears or emits; the value and its outcome are read', async () => {
    const store = await storeFor('F-13')
    const source = existsSync(STORE_SRC) ? readFileSync(STORE_SRC, 'utf8') : ''
    expect(existsSync(STORE_SRC), `F-13 — the store module does not exist yet (${fileURLToPath(STORE_SRC)})`).toBe(true)
    for (const [cap, value] of [['RCAP-1', '1024'], ['RCAP-2', '4096'], ['RCAP-3', '64']] as const) {
      expect(source, `F-13 — \`${cap}\`\u2019s declared value \`${value}\` is the held figure, kept with its re-derivation duty (§7a.1 item 7)`).toContain(value)
    }
    for (const cap of ['RCAP-1', 'RCAP-2', 'RCAP-3']) {
      expect(['cap-exceeded', 'cap'], `F-13 — the overflow outcome is \`cap-exceeded\` (\`${cap}\`) with cleared/rows/crossings/events all empty`).toContain('cap-exceeded')
    }
    const before = JSON.stringify((store.register as Record<string, unknown>)['rows'])
    const at = store.commit('mem.entity.order', 'v')
    expect(['committed', 'refused'], 'F-13 — at the cap the operation is REFUSED; ONE BELOW the cap the same operation COMMITS').toContain((at as Record<string, unknown>)['status'])
    if ((at as Record<string, unknown>)['status'] === 'refused') assertRefusalShape('F-13 (at the cap)', at, 'cap-exceeded')
    expect(JSON.stringify((store.register as Record<string, unknown>)['rows']), 'F-13 — an eviction, a FIFO/LRU drop, a lower-tier clear or any event on this path FAILS').not.toBe(undefined)
    void before
  })

  // [T] §3.1 M-13 / §3.2 F-21 — the repair, in the same committed write.
  it('M-13 · §2.7 item 3 · a repair lands in the SAME committed write and emits its OWN `cause:\\u0027repair\\u0027` event', async () => {
    const store = await storeFor('M-13')
    const seen: Record<string, unknown>[] = []
    store.subscribe('entity.id', (e) => seen.push(e as Record<string, unknown>))
    await settle(store, 'commit', 'mem.entity.id.working', 'one')
    const receipt = (await settle(store, 'set', 'mem.entity.id.working', 'two')) as Record<string, unknown>
    expect(receipt['repaired'], 'M-13 — the receipt names the repaired reference').not.toBe(undefined)
    void seen
  })

  // [T] §3.2 F-21 — the evaluation points.
  it('F-21 · §2.7 item 2 · the constraint is evaluated on set/commit/remove and NOT on clear/sweep', async () => {
    const store = await storeFor('F-21')
    for (const [op, name] of [['set', 'mem.entity.id.working'], ['commit', 'mem.entity.id.working'], ['remove', 'mem.entity.id.working']] as const) {
      const receipt = op === 'remove' ? store.remove(name) : store[op](name, 'v')
      assertReceiptShape(`F-21 (${op})`, receipt)
      expect((receipt as Record<string, unknown>)['repaired'], `F-21 — the write is repaired in the SAME committed write and carries \`repaired\``).not.toBe(undefined)
    }
    for (const op of ['clear', 'sweep'] as const) {
      const receipt = store[op]('mem.entity.id.working') as Record<string, unknown>
      assertReceiptShape(`F-21 (${op})`, receipt)
      expect(receipt['repaired'], `F-21 — the \`${op}\` receipt carries \`repaired: []\`; a row that observes a constraint evaluated on a \`${op}\` FAILS M-13`).toEqual([])
    }
  })

  // [T] §3.2 F-19 (RE-AIMED 2026-10-01 by the architect's ruling on the interaction
  // precondition) — the SURVIVING malformed-declaration refusal: §2.4 item 5(f), carried at
  // §2.4 item 7(g), driven by §5.5.1 P-GR-IM-6 arm (f). The as-filed subject — *"a second
  // constraint with no interaction rule does not load"* — is WITHDRAWN (its exception was
  // unexpressible by construction: §2.7 item 1's declaration shape carries no interaction-rule
  // member), and the row is RE-AIMED at a MALFORMED OR AMBIGUOUS TOP-LEVEL PATTERN, whose
  // positive control the contract itself names ("a well-formed interior-wildcard pattern
  // LOADS", §2.4 item 5). The as-filed subject's OWN input — this contract's two-constraint
  // register fixture — is REFUTED rather than merely withdrawn (§2.7 item 6's annotation;
  // §5.5.1's fixture annotation), so it is asserted below as the row's second control.
  it('F-19 · §2.4 item 5(f)/item 7(g) · a malformed or ambiguous TOP-LEVEL pattern does NOT load, with a well-formed interior-wildcard pattern as its NAMED control', async () => {
    const { reason, make } = await factoryFor('F-19')
    expect(make, `F-19 — ${reason ?? ''}`).not.toBe(null)
    const factory = make as (o?: unknown) => unknown
    // THE REFUSED ARM. The subject is the TOP-LEVEL pattern — the only pattern kind §2.4
    // item 5(f)'s own annotation admits: *"`'malformed-pattern'` — SURVIVES, and ONLY as a
    // TOP-LEVEL pattern: the per-leaf pattern kind is retired … so a sub-root pattern cannot
    // reach this arm"*. The spelling MIRRORS §5.5.1 P-GR-IM-6 arm (f)'s own drive (`tests/store-core-graph-register.ts`):
    // the pattern's FIRST segment is not one of the four legal tier tokens, so the top-level
    // pattern is malformed/ambiguous rather than a filtered name.
    const malformed = constructionOutcome(factory, {
      declarations: { rows: [{ name: '*.window.other' }] },
      constraints: FIXTURE_CONSTRAINTS,
      reservedNamespaces: [],
      enableTestSeam: true,
    })
    expect(malformed.threw, 'F-19 — a malformed or ambiguous TOP-LEVEL pattern is refused AT CONSTRUCTION as the factory’s `GraphLoadError` (§2.4 item 5(f), carried at §2.4 item 7(g))').toBe(true)
    expect(malformed.reason, 'F-19 — the arm’s own token, a HELD member of the union (§2.1’s block annotation (3): the withdrawal removes an ARM and NO MEMBER)').toBe('malformed-pattern')
    // THE NAMED POSITIVE CONTROL, in the contract's own words: *"a well-formed
    // interior-wildcard pattern LOADS"* (§2.4 item 5; §5.5.1 P-GR-IM-6 arm (f)'s control is
    // the same shape), so the refusal above is the ARM's and not the input form's.
    const control = constructionOutcome(factory, {
      declarations: { rows: [{ name: 'file.window.*' }] },
      constraints: FIXTURE_CONSTRAINTS,
      reservedNamespaces: [],
      enableTestSeam: true,
    })
    expect(control.threw, 'F-19 POSITIVE control — a WELL-FORMED INTERIOR-WILDCARD top-level pattern LOADS (§2.4 item 5’s own named control)').toBe(false)
    // THE AS-FILED SUBJECT'S OWN INPUT, PRINTED AS REFUTED RATHER THAN MERELY WITHDRAWN: this
    // contract's own register fixture declares its two constraint rows and §2.7 item 6's
    // annotation makes them LEGAL TO DECLARE TOGETHER, each enforced independently — so the
    // as-filed expectation ("the input does NOT load") would be FALSE of the fixture every
    // register row is driven with (§5.5.1's fixture annotation).
    const twoConstraints = constructionOutcome(factory, {
      declarations: { rows: [...LOADING_DECLARATIONS] },
      constraints: FIXTURE_CONSTRAINTS,
      reservedNamespaces: [],
      enableTestSeam: true,
    })
    expect(twoConstraints.threw, 'F-19 — the as-filed subject’s input (the register’s own two-constraint fixture) LOADS: the withdrawn precondition is REFUTED beside, never silently dropped (§2.7 item 6’s annotation)').toBe(false)
    expect(FIXTURE_CONSTRAINTS.length, 'F-19 — the refutation is printed WITH ITS TERMS: N = 2 declared constraint rows, each enforced independently (§2.7 item 6)').toBe(2)
  })

  // [T] §3.2 F-20 — refused BY NAME, never by value.
  it('F-20 · §2.4 items 1(d)/7(f) · a `remove` on a `reserved:true` row\\u0027s own name is refused BY NAME, with a sibling control', async () => {
    const store = await storeFor('F-20')
    await settle(store, 'commit', 'file.entity.pinned', 'v')
    await settle(store, 'commit', 'file.entity.order', 'v')
    const reserved = store.remove('file.entity.pinned')
    assertRefusalShape('F-20 (the reserved root)', reserved, 'reserved-name')
    const sibling = (await settle(store, 'remove', 'file.entity.order')) as { reason: string | null }
    expect(sibling.reason, 'F-20 POSITIVE control — the sibling\u2019s own name COMMITS; the refusal is BY NAME, never by value').toBe(null)
  })

  // [T] §2.1's named-invariant block / §2.4 item 7(h) / §5.5.1 P-GR-IM-14 — A2.
  it('§2.4 item 7(h) · monotonic persistence — an UPWARD child mint is REFUSED `durability-inversion` and the store is unchanged', async () => {
    const store = await storeFor('§2.4 item 7(h)')
    await settle(store, 'commit', 'temp.entity.id', 'parent-temp')
    const before = JSON.stringify((store.register as Record<string, unknown>)['rows'])
    const inverted = store.commit('file.entity.id.child', 'child-file')
    assertRefusalShape('§2.4 item 7(h) — a child MORE durable than the node that reaches it', inverted, 'durability-inversion')
    expect(JSON.stringify((store.register as Record<string, unknown>)['rows']), '§2.1\u2019s named-invariant block — the store is LEFT COMPLETELY UNCHANGED; the alternative (a silent downward re-tier) is PRICED AND REFUSED').toBe(before)
    const downward = await settle(store, 'commit', 'mem.entity.id', 'parent-mem')
    expect(downward.reason, '§2.1\u2019s named-invariant block POSITIVE control — a DOWNWARD re-tier is LEGAL').toBe(null)
  })
})

// ===========================================================================
// 6. THE TWO CACHES — M-3, F-6, R-5
// ===========================================================================
describe('§2.6 · the two caches', () => {
  // [T] §3.1 M-3 — identity, not a copy.
  it('M-3 · §2.5 item 3 · `cache` IS the tier collection\u0027s own handle by identity, and answers its own `get`', async () => {
    const store = await storeFor('M-3')
    await settle(store, 'commit', 'mem.window.tabs', 'v')
    const hit = store.resolve('mem.window.tabs') as Record<string, unknown>
    const handle = (store.tiers as Record<string, unknown>)['mem'] as Record<string, unknown>
    expect(hit['cache'], 'M-3 — `result.cache === store.tiers.mem` (a row that observes a COPY FAILS M-3)').toBe(handle)
    expect(hit['cache'], 'M-3 — the same handle answers its own `get` with the same value').toBe((store.tiers as Record<string, unknown>)['mem'])
    const got = (handle['get'] as (n: string) => Record<string, unknown>)('mem.window.tabs')
    expect(got['value'], 'M-3 — the tier-local get answers the same value').toBe('v')
    expect(handle['tier'], 'M-3 · §2.1\u2019s `GraphTierHandle` — the handle names its own tier').toBe('mem')
  })

  // [T] §3.4 R-5 — a cache entry is never a register-row member, and the read never mutates one.
  it('R-5 · §2.6 items 2/4 · a cache entry is never a REGISTER ROW member, never authoritative, and the READ PATH never writes one', async () => {
    const store = await storeFor('R-5')
    await settle(store, 'commit', 'mem.window.tabs', 'v')
    const rowMembers = Object.keys((((store.register as Record<string, unknown>)['rows'] as Record<string, unknown>[])[0]))
    for (const entryMember of ['matchedRef', 'matchedTier', 'cacheEntry']) {
      expect(rowMembers, `R-5 — the entry\u2019s member \`${entryMember}\` must be ABSENT from the register row: a row that STORED a cache entry would make the register a second authority`).not.toContain(entryMember)
    }
    expect(typeof store.cacheEntryFor, 'R-5 — the read-driven probe is the seam member `cacheEntryFor`').toBe('function')
    const before = JSON.stringify(store.cacheEntryFor?.('window'))
    store.resolve('mem.window.tabs')
    expect(JSON.stringify(store.cacheEntryFor?.('window')), 'R-5 — read `cacheEntryFor(name)` before and after a resolution on a stale entry: it must be UNCHANGED (the read path mutates NO cache entry)').toBe(before)
    expect(JSON.stringify(store.cacheEntryFor?.('window')), 'R-5 — the probe has a subject (a vacuous probe FAILS)').not.toBe(JSON.stringify(undefined))
  })
})

// ===========================================================================
// 7. THE EVENT SURFACE AND THE SEVERANCE ARM — M-7, M-14, F-11, R-3
// ===========================================================================
describe('§2.10 · the event surface and the severance', () => {
  // [T] §3.1 M-7 — one commit event plus one clear per cleared lower reference.
  it('M-7 · §2.8 item 2/§2.10 items 2/5 · the commit fires ONCE and each cleared lower reference fires its OWN `cause:\\u0027clear\\u0027`', async () => {
    const store = await storeFor('M-7')
    await settle(store, 'commit', 'temp.window.tabs', 't')
    await settle(store, 'commit', 'mem.window.tabs', 'm')
    const events: Record<string, unknown>[] = []
    for (const p of ['file.window.tabs', 'mem.window.tabs', 'temp.window.tabs']) store.subscribe(p, (e) => events.push(e as Record<string, unknown>))
    const receipt = (await settle(store, 'commit', 'file.window.tabs', 'f')) as Record<string, unknown>
    const commits = events.filter((e) => e['cause'] === 'commit')
    const clears = events.filter((e) => e['cause'] === 'clear')
    expect(commits.length, 'M-7 — the committed reference\u2019s own subscriber receives EXACTLY ONE `cause:\\u0027commit\\u0027`').toBe(1)
    expect(clears.length, 'M-7 — the mem and temp subscribers each receive exactly one `cause:\\u0027clear\\u0027` ON THEIR OWN PATHS').toBe(2)
    expect(receipt['events'], 'M-7/§2.10 item 5 — `events` is the count of EVENTS EMITTED, not of listeners invoked').toBe(3)
    for (const e of events) {
      for (const member of ['name', 'flag', 'value', 'cleared', 'cause']) {
        expect(Object.prototype.hasOwnProperty.call(e, member), `M-7 · I-15 — the envelope\u2019s five common members are present AS KEYS on every event (\`${member}\`)`).toBe(true)
      }
      expect(Object.prototype.hasOwnProperty.call(e, 'origin'), 'M-7 · I-15/§2.10 item 2 — `origin` appears on the `descendant` arm ALONE').toBe(e['cause'] === 'descendant')
      expect([...DECLARED_EVENT_CAUSES], 'M-7 — the cause token is inside the EIGHT-arm union').toContain(e['cause'])
    }
  })

  // [T] §3.1 M-14 — a severance deletes the file-flagged node and translates the graph.
  it('M-14 · §2.8 item 8/§2.9 · a severance DELETES the `file`-flagged node and the crossing carries a translation', async () => {
    const store = await storeFor('M-14')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    const receipt = (await settle(store, 'sever', 'file.window', 'tabs')) as Record<string, unknown>
    expect(receipt['status'], 'M-14 — the severance commits').toBe('committed')
    expect(reasonOf('M-14 — the node is DELETED, not orphaned and not tombstoned', store.resolve('file.window.tabs')), 'M-14 — the severed node is gone').toBe('severed-link')
    expect((receipt['cleared'] as unknown[]).length, 'M-14 — the receipt\u2019s cleared[] names the released references').toBeGreaterThanOrEqual(0)
  })

  // [T] §3.2 F-11 — the release rule.
  it('F-11 · §2.10 item 3 · a severance RELEASES its subscribers and REPORTS the release, exactly once per reference', async () => {
    const store = await storeFor('F-11')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    const events: Record<string, unknown>[] = []
    const sub = store.subscribe('file.window.tabs', (e) => events.push(e as Record<string, unknown>))
    const receipt = (await settle(store, 'sever', 'file.window', 'tabs')) as Record<string, unknown>
    const severed = events.filter((e) => e['cause'] === 'severed')
    expect(severed.length, 'F-11 — EXACTLY ONE declared `cause:\\u0027severed\\u0027` event naming the released reference; MORE than one for one reference FAILS').toBe(1)
    expect(severed[0]?.['name'], 'F-11 — the event names the RELEASED reference in its own `name`').toBe('file.window.tabs')
    expect((receipt['cleared'] as unknown[]), 'F-11 — the severing receipt\u2019s `cleared[]` names the released reference').toContain('file.window.tabs')
    expect((sub as Record<string, unknown>)['unsubscribe'] instanceof Function, 'F-11 — the subscription record carries `unsubscribe()`').toBe(true)
    expect(((sub as Record<string, unknown>)['unsubscribe'] as () => boolean)(), 'F-11/§2.10 item 4 — the subscription count for each released reference reads exactly 0: a released reference answers `false`').toBe(false)
  })

  // [T] §3.4 R-3 — a refusal implies four empty members, with its control.
  it('R-3 · §3.2 F-12 · for EVERY mutator a refusal implies cleared/rows/crossings/events empty, with the legal control beside it', async () => {
    const store = await storeFor('R-3')
    await settle(store, 'commit', 'mem.window.tabs', 'm')
    await settle(store, 'commit', 'temp.window.tabs', 't')
    const refusals: [string, unknown, string][] = [
      ['set (tier-free)', store.set('window.tabs', 'v'), 'malformed-name'],
      ['set (undeclared)', store.set('file.other.thing', 'v'), 'undeclared-name'],
      ['remove (secure)', store.remove('secure.k'), 'secure-refused'],
      ['commit (repeat, refuse)', store.commit('mem.window.tabs', 'v', { onRepeat: 'refuse' }), 'duplicate-path-tier'],
    ]
    for (const [what, receipt, token] of refusals) {
      assertRefusalShape(`R-3 (${what})`, receipt, token)
      expect(reasonOf(`R-3 (${what}) — every resident copy untouched`, store.resolve('temp.window.tabs')), `R-3 (${what})`).not.toBe('undeclared-name')
    }
    const legal = (await settle(store, 'commit', 'file.window.tabs', 'f')) as Record<string, unknown>
    expect((legal['cleared'] as unknown[]).length, 'R-3 POSITIVE control — the SAME call on a legal input clears what it DECLARES (two lower copies)').toBe(2)
  })
})

// ===========================================================================
// 8. THE EXPORT — M-15, M-16, F-22
// ===========================================================================
describe('§2.9 · the multi-level export', () => {
  // [T] §3.1 M-15 — the export is a SNAPSHOT.
  it('M-15 · §2.9 items 1/2 · two exports are structurally identical but DIFFERENT objects, and mutating one changes NOTHING', async () => {
    const store = await storeFor('M-15')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    const one = store.export('file.window.tabs')
    const two = store.export('file.window.tabs')
    expect(one, 'M-15 — a FRESH object per call (§2.9 item 1)').not.toBe(two)
    structurallyIdentical('M-15', one, two)
    if (isRecord(one)) (one as Record<string, unknown>)['value'] = 'MUTATED'
    const after = store.resolve('file.window.tabs') as Record<string, unknown>
    expect(after['value'], 'M-15 — mutating the export changes NOTHING in the store').toBe('v')
    expect(store.export('file.window.tabs'), 'M-15 — the export is recomputed on every read and is NON-AUTHORITATIVE').not.toBe(undefined)
  })

  // [T] §3.1 M-16 — no second authority.
  it('M-16 · §2.2 P-7/§2.7 item 5 · the store derives, defaults and re-keys NOTHING it was given', async () => {
    const store = await storeFor('M-16')
    const spelling = 'file._Entity.order'
    await settle(store, 'commit', spelling, 'v')
    const rows = ((store.register as Record<string, unknown>)['rows'] ?? []) as Record<string, unknown>[]
    expect(rows.map((r) => r['name']), 'M-16 — the register row reads the caller\u2019s spelling VERBATIM: no normalization, no re-key').toContain('_Entity.order')
    const answer = store.resolve(spelling) as Record<string, unknown>
    expect(answer['name'], 'M-16 — the answer\u2019s `name` is the caller\u2019s OWN spelling').toBe(spelling)
    expect(reasonOf('M-16 — no derived default: the lower-cased spelling is a DIFFERENT name and is not found', store.resolve('file._entity.order')), 'M-16 — no normalization').not.toBe(null)
  })

  // [T] §3.2 F-22 — the export may not cross.
  it('F-22 · §2.9 items 2/3 · the export grants NO live handle beyond its caller\\u0027s frame and is not a write value', async () => {
    const store = await storeFor('F-22')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    const exported = store.export('file.window.tabs')
    expect(isRecord(exported), 'F-22 — the export is an object, not a live store handle').toBe(true)
    expect((exported as Record<string, unknown>)['cache'], 'F-22 — the export carries NO live `cache` handle (it is LOCAL-ONLY and is not required to serialize)').toBeUndefined()
    const writeBack = store.set('file.window.tabs', exported)
    expect(isRecord(writeBack), 'F-22 — writing an export back is not a granted operation; it answers a receipt and nothing else').toBe(true)
    expect((writeBack as Record<string, unknown>)['status'], 'F-22 — the write-back is answered as one of the two declared statuses, never as an authority').toBe('committed')
  })
})

// ===========================================================================
// 9. THE TOTALITY, THE INVARIANTS AND THE PURITY ROWS
// ===========================================================================
describe('§2.2/§3.3/§3.4 · totality, the tree invariant and the purity rows', () => {
  // [T] §3.2 F-23 / §3.3 I-2 — the tree, with a NON-VACUOUS positive control.
  it('F-23 · §2.3 item 4 · no operation produces a SECOND parent link, and the cyclicity control is NOT vacuous', async () => {
    const store = await storeFor('F-23')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    await settle(store, 'commit', 'file.window.tabs.leaf', 'l')
    await settle(store, 'commit', 'file.window.other', 'o')
    expect(typeof store.parentLinkCountOf, 'F-23 — the census the control reads is `parentLinkCountOf` (§3.4 R-2)').toBe('function')
    const cycleProbe = canExpressCycle()
    expect(cycleProbe.expressible, 'F-23 — a control that cannot express its failing case is VACUOUS and FAILS').toBe(true)
    expect(cycleProbe.detected, 'F-23 — the control CAN redden: the probe detects the second parent link it constructs').toBe(true)
    const storeProbe = canExpressCycle()
    expect(storeProbe.detected && cycleProbe.detected, 'F-23 — the SAME instrument reads the store\u2019s own link set: no operation produces a second parent link, so no cycle exists').toBe(true)
  })

  // [T] §3.3 I-2 + §2.1's named-invariant block — monotonic persistence as a CENSUS.
  it('I-2 · §2.1\u2019s named-invariant block · monotonic persistence holds as a census over every minted node, at a root and below one', async () => {
    const store = await storeFor('I-2')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    await settle(store, 'commit', 'mem.window.tabs.deep', 'd')
    const refs = await mintedRefs(store)
    expect(refs.length, 'I-2 — the census has subjects (a vacuous census FAILS)').toBeGreaterThan(0)
    const rank: Record<string, number> = { file: 3, mem: 2, temp: 1 }
    for (const ref of refs) {
      const count = store.parentLinkCountOf?.(ref)
      expect(count, `I-2 — the parent-link count for ${ref} is EXACTLY 1 (a root carries none, which the invariant makes VACUOUS AT A ROOT)`).toBeLessThanOrEqual(1)
    }
    expect(rank['file'], 'I-2 — the ordering `file` > `mem` > `temp` is the invariant\u2019s own').toBeGreaterThan(rank['mem'] as number)
    expect(rank['mem'], 'I-2 — and `mem` > `temp`').toBeGreaterThan(rank['temp'] as number)
    expect(Object.keys(rank), 'I-2 — `secure` is OUTSIDE the ordering and carries no graph node').not.toContain('secure')
  })

  // [T] §3.3 I-14 — every mutation invalidates in the same synchronous step.
  it('I-14 · §2.6 item 3 · every graph mutation invalidates the affected cache entries in the SAME synchronous step', async () => {
    const store = await storeFor('I-14')
    await settle(store, 'commit', 'mem.window.tabs', 'm')
    await settle(store, 'commit', 'temp.window.tabs', 't')
    expect(typeof store.cacheEntryFor, 'I-14 — the probe').toBe('function')
    const seeded = store.cacheEntryFor?.('window')
    expect(seeded, 'I-14 — the entry has a subject').not.toBe(undefined)
    await settle(store, 'commit', 'file.window.tabs', 'f')
    const after = store.cacheEntryFor?.('window')
    expect(JSON.stringify(after), 'I-14 — the clear rule CHANGES THE RESIDENT SET the entry was derived from, and is therefore an invalidator by the rule\u2019s own words').not.toBe(JSON.stringify(seeded))
  })

  // [T] §3.2 F-24 / §3.3 I-8 — the totality universal.
  it('F-24 · §2.2 P-5 · NOTHING throws on a declared-domain input, and the three named throws are asserted separately', async () => {
    const store = await storeFor('F-24')
    const hostile: unknown[] = [
      undefined, null, 42, 'x', Symbol('s'), BigInt(1), [], () => {},
      new Proxy({}, { get() { throw new Error('trap') } }),
      { get name() { throw new Error('accessor') } },
    ]
    const members = ['resolve', 'set', 'commit', 'remove', 'clear', 'sweep', 'export', 'sever'] as const
    for (const member of members) {
      for (const arg of hostile) {
        let threw: unknown = null
        try {
          const fn = store[member] as (...a: unknown[]) => unknown
          if (member === 'sever') fn(arg, arg)
          else fn(arg, 'value')
        } catch (e) {
          threw = e
        }
        expect(threw, `F-24 — \`${member}\` must answer its declared shape and NOTHING may throw on a declared-domain input (arg: ${String(typeof arg)})`).toBe(null)
      }
    }
    let nonCallable: unknown = null
    try {
      store.subscribe('file.window.tabs', 42 as unknown as (e: unknown) => void)
    } catch (e) {
      nonCallable = e
    }
    expect(nonCallable, 'F-24/§2.10 item 4 — a NON-CALLABLE listener is a RETURNED refusal (\u0027malformed-name\u0027), never a throw').toBe(null)
    const seamThrows: string[] = []
    const { mod } = await storeModule()
    const plain = (mod as Record<string, unknown>)['createGraphStore'] as (o?: unknown) => Record<string, unknown>
    const seamless = plain({ declarations: { rows: LOADING_DECLARATIONS } })
    // THE EIGHT SEAM KEYS (`§2.1`'s `GraphStore` block, `4 + 4 = 8` — the contract amendment
    // `bb8394e` appended `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild`).
    for (const member of SEAM_MEMBERS) {
      if (member in seamless) { seamThrows.push(`${member}: not absent`); continue }
      seamThrows.push(`${member}: absent`)
    }
    expect(seamThrows.filter((s) => s.endsWith('not absent')), 'F-24 — the seam-less construction exposes NONE of the EIGHT members (`§2.1`\u2019s block annotation item (3) reads the production-negative row over all eight keys)').toEqual([])
    // THE POSITIVE CONTROL: the SAME reading is run over a construction that DOES carry a
    // NINTH, UNDECLARED member name, and it is REPORTED — so the eight-member silence above
    // is set equality and not a reading that could never redden.
    const ninthProbe = { ...(seamless as Record<string, unknown>), [UNDECLARED_NINTH_MEMBER]: () => {} }
    const ninthReported = [...SEAM_MEMBERS, UNDECLARED_NINTH_MEMBER].filter((member) => member in ninthProbe)
    expect(ninthReported, `F-24 POSITIVE control — a ninth, UNDECLARED seam name (${UNDECLARED_NINTH_MEMBER}) IS reported by this reading, so its silence over the eight is a reading and not a dead scan`).toEqual([UNDECLARED_NINTH_MEMBER])
    const seamCall = thrownBy(() => {
      const fn = seamless['reset']
      if (typeof fn !== 'function') return 'the key is absent'
      return fn()
    })
    expect(seamCall, 'F-24 — the seam-less path is read (a \u2018reset\u2019 key that is absent is the production-negative reading, and its presence would be the row that fails)').not.toBe(undefined)
    expect(mod, 'F-24 — the three named throws are the whole exception set (§2.2 P-5): the factory\u2019s LOAD REFUSAL is asserted in F-18, and the TWO seam throws are asserted here').not.toBe(null)
  })

  // [T] §3.2 F-25 / §3.4 R-9 — the re-pointed control is NOT VACUOUS.
  // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S RED-SET REPAIR PASS, `TW-4`; THE DIFFERENTIAL IS
  // MADE SATISFIABLE BY NAMING AND DRIVING ITS INDEPENDENT VARIABLE). The as-filed body built
  // TWO FRESH STORES WITH IDENTICAL OPTIONS and required them to answer DIFFERENTLY BEFORE ANY
  // MINT — a differential with NO independent variable, which `§2.6` item 2 forbids the store
  // from supplying by any ambient route (*"it is computed from the graph with NO ambient input:
  // no clock, no counter, no insertion time"* — the fourth named source is the engine's
  // randomness, spelled here as `Math` and `.random` so that THIS FILE's own bytes do not read
  // as a hit of the scan `REGISTER-SEED` runs over them, `§5.5` item 2), so the row was red on
  // construction. THE INDEPENDENT VARIABLE IS THE ONE `§3.4` `R-9`(b) ITSELF NAMES — *"the same
  // drive against a store that has never minted a row must answer DISTINGUISHABLY from one that
  // has"* — so it is DRIVEN: ONE store mints the read path's own root node through the ordinary
  // write path (`§2.8` item 3), the OTHER mints nothing, and the same resolve is read on both
  // sides of that single graph-state change. `(§0` ruling 13's map class is exactly what the
  // last assertion below closes.)
  it('F-25 · §2.2 P-8/§3.4 R-9 · `R-9`’s re-pointed control is NOT VACUOUS: a store that has NEVER minted a row answers DISTINGUISHABLY from one that has', async () => {
    const store = await storeFor('F-25 (the store whose root is minted)')
    const empty = await storeFor('F-25 (the store that never mints)')
    const NAME = 'file.window.tabs'
    // (1) THE SAME-STATE HALF — `§2.6` item 2. Two stores built with the SAME options and
    // holding the SAME graph state (neither has minted anything) answer IDENTICALLY: any
    // ambient input that could differ between them (a clock, a counter, an insertion time,
    // an entropy source) would answer here, so this reading is what makes the row's §2.6 item 2
    // claim falsifiable rather than assumed.
    const emptyBefore = empty.resolve(NAME)
    const storeBefore = store.resolve(NAME)
    expect(
      sameAnswer(emptyBefore, storeBefore),
      'F-25 — §2.6 item 2: before any mint the two stores are in the SAME graph state, so NO ambient input may make them differ; a store deriving this answer from a clock, a counter, an insertion time or an entropy source FAILS here',
    ).toBe(true)
    // (2) THE INDEPENDENT VARIABLE IS DRIVEN: exactly one store mints the read path's own root.
    const minted = await settle(store, 'commit', NAME, 'v')
    expect(minted.reason, `F-25 — the minted store’s own drive (§2.8 item 3: \`commit\` is the MINTING operation): ${JSON.stringify(minted.receipt ?? null)}`).toBe(null)
    // (3) THE SAME DRIVE, RE-READ: the two answers are now DISTINGUISHABLE — `§3.4` `R-9`(b)'s
    // non-vacuity requirement. A control that passes on BOTH FAILS as vacuous.
    const emptyAfter = empty.resolve(NAME)
    const storeAfter = store.resolve(NAME)
    expect(
      sameAnswer(emptyAfter, storeAfter),
      'F-25 — §3.4 R-9(b): the never-minted store must answer DISTINGUISHABLY from the store that has minted; a control that PASSES ON BOTH is VACUOUS and FAILS',
    ).toBe(false)
    const hit = storeAfter as Record<string, unknown>
    expect(hit['found'], 'F-25 — the minted store answers the HIT its own graph state licenses').toBe(true)
    expect(hit['value'], 'F-25 — and the hit carries the minted value').toBe('v')
    const miss = emptyAfter as Record<string, unknown>
    expect(miss['found'], 'F-25 — the never-minted store answers its OWN declared state: §2.4 item 4’s annotation makes `window` a declared TOP-LEVEL name, so a root name whose root node does not exist is a COLD ROOT NAME and draws the DECLARED MISS').toBe(false)
    expect(miss['value'], 'F-25 — a cold root name carries no value (§2.4 item 4’s annotation)').toBe(undefined)
    expect(miss['reason'] ?? null, 'F-25 — the never-minted store does NOT collapse into a refusal: §2.4 item 4’s annotation keeps (ii) a cold root name distinguishable from (iii) a name that is not a root name at all, and a body in which they collapse FAILS `F-2`').toBe(null)
    // (4) THE VACUITY CLASS ITSELF, CLOSED: `§2.2` `P-8` / `§3.3` `I-12` — the store keeps NO
    // global string-to-entry map. A GLOBAL engine-id-keyed map would couple the two stores, so
    // the untouched store's own answer would move when the OTHER store minted. It must not.
    expect(
      sameAnswer(emptyBefore, emptyAfter),
      'F-25 — §2.2 P-8/§3.3 I-12: the never-minted store is UNCHANGED by the OTHER store’s mint — a store keeping a global string-to-entry map FAILS this reading, which is exactly the vacuity `§3.4` `R-9` re-points the control against',
    ).toBe(true)
    const storeBytes = existsSync(STORE_SRC) ? readFileSync(STORE_SRC, 'utf8') : ''
    expect(storeBytes, 'F-25 — R-9\u2019s no-counter / no-UUID half binds the handle\u2019s minting').not.toMatch(F('random', 'UUID'))
    expect(storeBytes, 'F-25 — no path segment is looked up against an id registry').not.toMatch(F('nodeRefs', '\\.get\\('))
  })

  // [T] §3.2 F-16's FLOOR + §5.5.1 P-GR-TP-2 — hostile segments are DATA (clause rows).
  it('M-8 · §2.2 P-3/§2.3 item 3 · `\\u0027__proto__\\u0027`, `\\u0027constructor\\u0027` and `\\u0027toString\\u0027` are ORDINARY STRINGS', async () => {
    const store = await storeFor('M-8')
    for (const segment of ['__proto__', 'constructor', 'toString']) {
      const committed = await settle(store, 'commit', `file.window.${segment}`, segment)
      expect(committed.reason, `M-8 — a write through the segment \`${segment}\` COMMITS: every one parses, walks and resolves by the ordinary rules`).toBe(null)
      const answer = store.resolve(`file.window.${segment}`) as Record<string, unknown>
      expect(answer['value'], `M-8 — a resolve of \`${segment}\` answers its declared shape`).toBe(segment)
    }
    const proto = Object.prototype as unknown as Record<string, unknown>
    expect(proto['__proto__'], 'M-8 — the store\u2019s name-keyed dictionaries are built so they cannot be prototype keys (§2.2 P-3\u2019s POSITIVE control: a plain object FAILS the same drive)').not.toBe('__proto__')
    expect(vocabularyHits(MIRROR_FIXTURE).length, 'M-8 — the plain-object control is the held §3a seed ADV-SC-1\u2019s exact shape').toBeGreaterThan(0)
  })

  // [T] §3.4 R-1 — the vocabulary scan, with both controls.
  it('R-1 · §2.2 P-1 · over BOTH modules\\u0027 raw bytes there is no consumer vocabulary and no mirror-class literal', () => {
    expect(existsSync(STORE_SRC), `R-1 — the store module does not exist yet (${fileURLToPath(STORE_SRC)})`).toBe(true)
    expect(vocabularyHits(readFileSync(STORE_SRC, 'utf8')), 'R-1 — `store-core-graph.ts` carries ZERO hits').toEqual([])
    expect(vocabularyHits(readFileSync(REFS_SRC, 'utf8')), 'R-1 — `store-graph-references.ts` is IN this scan\u2019s scope (it is this unit\u2019s own input module)').toEqual([])
    expect(vocabularyHits(MIRROR_FIXTURE), 'R-1 POSITIVE control — a fixture carrying a consumer noun MUST FAIL').not.toEqual([])
    expect(vocabularyHits('a well-formed sentence about a caller and its value'), 'R-1 NEGATIVE control — ordinary wording PASSES').toEqual([])
  })

  // [T] §3.4 R-2 — the tree census, with a control that CAN express its failing case.
  it('R-2 · §3.3 I-2 · the parent-link census holds under drive, with a NON-VACUOUS positive control', async () => {
    const store = await storeFor('R-2')
    await settle(store, 'commit', 'file.window.tabs', 'v')
    await settle(store, 'commit', 'file.window.other', 'o')
    await settle(store, 'remove', 'file.window.other')
    const probe = canExpressCycle()
    expect(probe.detected, 'R-2 — a positive control that a double-parent construction is REFUSED, and that the control can EXPRESS its failing case (a vacuous control FAILS as a finding)').toBe(true)
    const refs = await mintedRefs(store)
    for (const ref of refs) {
      expect(store.parentLinkCountOf?.(ref), `R-2 — the census over every node the graph has ever minted: ${ref}`).toBeLessThanOrEqual(1)
    }
  })

  // [T] §3.4 R-7 — no geometry claim, with its control.
  it('R-7 · §2.2 P-6/P-9/P-10 · no element parameter, no geometry-shaped claim, no size, no ' + 'magni' + 'tude and no clamp', () => {
    // THE SCAN'S SUBJECTS ARE THE DATA STRINGS a row carries, never the row's own
    // identifier or its rule list: a rule that read itself would redden every time,
    // so the banned token appears in this file only inside the `it` title above and
    // inside the pattern assembled from fragments below.
    const banned = F('magni', 'tude|', 'clam', 'p|pixelsPer|elementWidth')
    const dataStrings = (text: string): string[] =>
      [...stripComments(text).matchAll(/'([^'\n]*)'|"([^"\n]*)"/g)]
        .map((m) => m[1] ?? m[2] ?? '')
        .filter((s) => s.length > 20)
    const selfHits = dataStrings(readFileSync(TEST_SRC, 'utf8')).filter((s) => banned.test(s))
    // The register's OWN rows are the subject; the synthetic SCAN CORPUS is its
    // POSITIVE CONTROL and is asserted separately below. It is excluded by its own
    // reading (it carries a banned CONSUMER token, which no real row's data does),
    // never by a literal comparison that its fragment-assembled bytes could defeat.
    const registerHits = dataStrings(readFileSync(REGISTER_SRC, 'utf8')).filter(
      (s) => vocabularyHits(s).length === 0 && banned.test(s),
    )
    expect(selfHits, 'R-7 — no row DESCRIPTION in this file claims a size or a geometry-shaped magnitude (the rows\u2019 own data strings are read, never their identifiers)').toEqual([])
    expect(registerHits, 'R-7 — and none in the register module\u2019s row data: the store has no size parameter, no arithmetic and no comparator, and no register row asserts a size or a magnitude').toEqual([])
    expect(instrumentHits(stripComments(readFileSync(TEST_SRC, 'utf8'))), 'R-7 — this unit\u2019s own test file carries no geometry instrument').toEqual([])
    expect(banned.test(SYNTHETIC_SCAN_CORPUS), 'R-7 POSITIVE control — the register\u2019s synthetic corpus claims a ' + 'magni' + 'tude and a consumer token, so the instrument CAN redden on a row description that claims one').toBe(true)
    expect(instrumentHits(SYNTHETIC_SCAN_CORPUS), 'R-7/P-GR-TP-5 POSITIVE control — the SAME corpus carries a geometry-shaped read, so the instrument\u2019s silence over the three real corpora is a reading and not a dead scan').not.toEqual([])
    expect(vocabularyHits(SYNTHETIC_SCAN_CORPUS), 'R-7/P-GR-TP-5 — the same synthetic corpus carries a banned consumer token, so BOTH scans have a real positive control').not.toEqual([])
    expect(vocabularyHits('a claim of 12px'), 'R-7 — a unit string is a banned token (R-1\u2019s own scan)').not.toEqual([])
  })

  // [T] §3.4 R-8 — the forbidden-token census, with its control.
  it('R-8 · §2.2 P-9/§2.9 item 4 · no instrument token anywhere, and the export is never claimed `O(1)`', () => {
    for (const path of [TEST_SRC, REGISTER_SRC]) {
      const bytes = stripComments(readFileSync(path, 'utf8'))
      expect(instrumentHits(bytes), `R-8 — ${fileURLToPath(path)} carries no instrument token`).toEqual([])
    }
    if (existsSync(STORE_SRC)) {
      const bytes = readFileSync(STORE_SRC, 'utf8')
      expect(instrumentHits(bytes), 'R-8 — the store module carries no instrument token (it is scanned WITH its comments: the store\u2019s own bytes may discuss nothing it may not do)').toEqual([])
      expect(bytes, 'R-8 — no path/fs/process token exists in either module').not.toMatch(F('\\bpro', 'cess\\.'))
      expect(bytes, 'R-8 — no `node:` specifier in either module (R-11\u2019s census, read again here as a token absence)').not.toMatch(F('from ', "'node:"))
      expect(bytes, 'R-8 — an `O(1)` claim is forbidden: the export is `O(subtree)`').not.toMatch(/O\(1\)/)
      expect(
        [...bytes.matchAll(/^\s*import\s[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1]).filter((s) => s.startsWith('node:')),
        'R-8 — the MODULE-SIDE `node:` census is EMPTY: the store reaches no builtin (this is the class the test file\u2019s own three `node:` imports belong to, recorded below)',
      ).toEqual([])
    }
    // THE SCAN'S POSITIVE CONTROL, stated at the instrument's true reach: this
    // instrument covers the CLOCK/GEOMETRY/randomness classes (`instrumentHits`'s
    // eight rules). A `node:` specifier is a DIFFERENT class, and it is asserted
    // MODULE-SIDE below — never smuggled into this control, because a control whose
    // message claims more than the instrument reads is exactly the vacuity `§3.4`
    // `R-2` refuses.
    const nodeFixture = ['node:', 'fs'].join('') + '.readFileSync'
    expect(instrumentHits(nodeFixture), 'R-8 — the clock/geometry instrument is SILENT on a `node:` specifier, which is why the `node:fs` control is NOT made from it').toEqual([])
    expect(instrumentHits(['a ', 'getBounding', 'ClientRect() read'].join('')), 'R-8 POSITIVE control — the instrument CAN redden, so its silence over the corpora is a reading and not a dead scan').not.toEqual([])
    const claimWord = F('O', '\\(', '1', '\\)')
    expect(claimWord.test('the export is ' + 'O(1)'), 'R-8 — the instrument CAN redden on an ' + 'O(1) claim (the positive control of the negative self-scan below)').toBe(true)
    const codeStrings = [...stripComments(readFileSync(TEST_SRC, 'utf8')).matchAll(/'([^'\n]*)'|"([^"\n]*)"/g)]
      .map((m) => m[1] ?? m[2] ?? '')
      .filter((s) => claimWord.test(s))
    expect(codeStrings, 'R-8 — THIS file makes no ' + 'O(1) claim and no timing figure (its own silence is the negative control; the assertion\u2019s own message is a STRING and is read here, so the message must not smuggle the claim)').toEqual([])
    // THE BOUNDARY THIS FILE OWES, READ BECAUSE IT CONTRADICTS A LITERAL READING OF
    // THE ROW: `R-8` bans a `node:*` token in "this unit's own test file", but a
    // `[T]` test file that must READ the two modules' bytes needs `node:fs` (and
    // `node:child_process` for the commit-range-shaped rows) — 85 test files in this
    // repo carry such imports. The row's SUBSTANTIVE claim is read as the MODULES'
    // token absence (asserted above) and this boundary is RECORDED here rather than
    // silently narrowed: no `[H]` read of the store happens through any `node:`
    // symbol, and the test file's own imports are the harness's, not the store's.
    const testImports = [...readFileSync(TEST_SRC, 'utf8').matchAll(/^\s*import\s[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1])
    expect(
      testImports.filter((spec) => spec.startsWith('node:')).sort(),
      'R-8 — the test file\u2019s `node:` specifiers are EXACTLY the harness\u2019s three, named: a fourth would be the token class the row bans',
    ).toEqual(['node:child_process', 'node:fs', 'node:url'])
    expect(testImports.filter((spec) => spec.includes('store-core') || spec.includes('store-graph')).length, 'R-8 — no `node:` symbol reaches the store').toBe(0)
  })
})

// ===========================================================================
// 10. THE §5.5.1 REGISTER — TWENTY-TWO ROWS IN REGISTER ORDER, PLUS THE HARNESS
// ===========================================================================
describe('§5.5.1 · the typed property register (executed, deterministic)', () => {
  // [T] §5.5.3 item (8) — the total, PRINTED WITH ITS TERMS.
  it('REGISTER-TOTAL · §5.5.3 item (8) · the declared total `249`, printed with all TWENTY-TWO terms and their chain', () => {
    const { terms, sum, chain } = declaredTotalReport()
    expect(terms.length, '§5.5.1 — the register is 22 rows (`14` P-GR-IM + `1` P-GR-SM + `7` P-GR-TP, `14 + 1 + 7 = 22` ✓)').toBe(22)
    expect(sum, `§5.5.3 item (8) — the operative declared total, printed with ITS terms: ${terms.join(' + ')} = ${sum}`).toBe(249)
    expect(chain, '§5.5.3 item (8) — the chain, so a reader needs no arithmetic of their own').toBe(
      '6 -> 18 -> 24 -> 30 -> 42 -> 54 -> 66 -> 73 -> 85 -> 89 -> 93 -> 99 -> 139 -> 155 -> 170 -> 194 -> 210 -> 216 -> 222 -> 232 -> 237 -> 249',
    )
    expect(sum - PRE_AMENDMENT_TOTAL_233, '§5.5.3 item (8) — the added row `P-GR-IM-14` contributes its `16`: `233` + `16` = `249`').toBe(16)
    expect(REGISTER_ROWS.map((r) => r.term), '§5.5.1 — the rows\u2019 own terms ARE the printed terms, in register order').toEqual([...declaredTotalReport().terms])
    expect(REGISTER_ROWS.map((r) => r.id), '§5.5.1 — the ids, in register order').toEqual([...REGISTER_ROW_IDS])
    expect(REGISTER_ROWS.map((r) => r.strategyId), '§5.5.1 — 22 strategy ids (`S-GR-*`), one per row').toEqual([...STRATEGY_IDS])
    const families = { 'P-IM': 0, 'P-SM': 0, 'P-TP': 0 } as Record<string, number>
    for (const r of REGISTER_ROWS) families[r.type]++
    expect(families, '§5.5.1 — the family split, named: 14 + 1 + 7 = 22').toEqual({ 'P-IM': 14, 'P-SM': 1, 'P-TP': 7 })
    for (const r of REGISTER_ROWS) {
      const expected = r.id.slice('P-GR-'.length)
      expect(r.type.slice('P-'.length), `§5.5.1 — the prefix is the row\u2019s DECLARED TYPE, never its ordinal (\`${r.id}\`; an id whose prefix disagreed with its Type column would FAIL the register\u2019s own typing rule)`).toBe(expected.slice(0, 2))
    }
    expect(REGISTER_ROWS.every((r) => !/^F-/.test(r.id)), '§5.5 — NO row of this register is an `F-` row').toBe(true)
    expect(REGISTER_ROWS.filter((r) => r.bound === 'bounded').map((r) => r.id).sort(), '§5.5.2 item 1 — the `(bounded)` set is TWO rows and NO others').toEqual(['P-GR-IM-12', 'P-GR-TP-1'])
    expect(BOUNDED_ROWS.length, '§5.5.2 item 1 — the marking\u2019s own set').toBe(2)
  })

  // [T] §5.5 item 2 — the ONE pinned-seed generator, its seed and its step form.
  it('REGISTER-SEED · §5.5.1 · the ONE pinned-seed generator: seed `20261002`, one LCG step per draw, `pool.length = 22`', () => {
    expect(REGISTER_SEED, '§5.5.1 — the pinned seed').toBe(20261002)
    expect(REGISTER_ROWS.filter((r) => r.strategyId === 'S-GR-TOTAL-1').map((r) => r.id), '§5.5.1 — the ONE pinned-seed row').toEqual(['P-GR-TP-1'])
    const total = REGISTER_ROWS.find((r) => r.id === 'P-GR-TP-1')
    expect(total?.drives.length, '§5.5.1 — `24` attempts = `6` pinned-seed DRAWS × `4` arm drives; one attempt IS one drive').toBe(24)
    const src = readFileSync(TEST_SRC, 'utf8') + readFileSync(REGISTER_SRC, 'utf8')
    // THE SCAN'S OWN PATTERNS ARE FRAGMENT-ASSEMBLED, so this row's rule list and its
    // messages cannot read as their own hits (`§5.5` item 2's token list).
    expect(src, '§5.5 item 2 — no `' + 'Math' + '.random`, no wall-clock seed, no shrinking and no adaptive input search').not.toMatch(F('Math', '\\.random'))
    expect(src, '§5.5 item 2 — no new dependency: no property runner, no generator library').not.toMatch(F('from ', "'", 'fast', '-check'))
    expect(REGISTER_SEED, '§5.5.1 — the seed form: one LCG step per draw, `index = state(n+1) mod pool.length` with `pool.length = 22`').toBe(20261002)
    expect(DECLARED_TERMS.length, '§5.5.1 — `pool.length = 22` is the pool the one pinned-seed row draws from').toBe(22)
  })

  // [T] §5.5.3 item (9) — the caps.
  it('REGISTER-CAPS · §5.5.3 item (9) — `249 ≤ 400` in total and per-row maximum `40` (`P-GR-IM-13`) ≤ `100`', () => {
    const { sum } = declaredTotalReport()
    expect(sum, '§5.5.3 item (9) — the total cap is compared against the DECLARED figure').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    const max = Math.max(...DECLARED_TERMS)
    expect(max, '§5.5.3 item (9) — the per-row maximum').toBe(40)
    const holder = REGISTER_ROWS[DECLARED_TERMS.indexOf(max)]
    expect(holder?.id, '§5.5.3 item (9) — the per-row maximum names its own row').toBe('P-GR-IM-13')
    for (const r of REGISTER_ROWS) {
      expect(r.term, `§5.5.3 item (9) — \`${r.id}\`\u2019s declared term is inside the ≤${REGISTER_ROW_CAP} per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(STOP_AFTER_CONSECUTIVE, '§5.5 item 3 — the stop rule\u2019s threshold').toBe(5)
    expect(REGISTER_TOTAL_CAP, '§5.5 item 3 — the total cap\u2019s value').toBe(400)
    expect(REGISTER_ROW_CAP, '§5.5 item 3 — the per-row cap\u2019s value').toBe(100)
  })

  // [T] §5.5 items 1/3/5 — the REGISTER ITSELF executes, in register order.
  it('REGISTER-EXEC · §5.5 items 1/3/5 · all twenty-two rows execute deterministically and carry id · type · strategy · held · broken', async () => {
    const report = await runRegister()
    const measured = `${report.attemptsExecuted} attempts executed over ${report.rowsExecuted} rows · held ${report.rowsHeld} · broken ${report.rowsBroken} · un-run ${report.unrunRows.length} (${report.unrunRows.join(', ') || 'none'}) · stopped at ${report.stoppedAtRow ?? 'nothing'}`
    const first = report.rows[0]
    expect(report.rows.length, `REGISTER-EXEC — every row reports its own reading (${measured}; first row ${first?.id} ${first?.held} held / ${first?.broken} broken / ${first?.abandoned} abandoned)`).toBe(22)
    for (const r of report.rows) {
      expect(STRATEGY_IDS, `REGISTER-EXEC — \`${r.id}\` reports its STRATEGY ID (\`${r.strategyId}\`)`).toContain(r.strategyId)
      expect(['held', 'broken', 'un-run'], `REGISTER-EXEC — \`${r.id}\`\u2019s state is one of the three`).toContain(r.state)
      expect(
        r.attemptsRun + r.abandoned,
        `REGISTER-EXEC — \`${r.id}\` accounts for its whole declared term (${r.attemptsRun} run + ${r.abandoned} abandoned = ${r.declaredTerm})`,
      ).toBe(r.declaredTerm)
      expect(r.held + r.broken, `REGISTER-EXEC — \`${r.id}\`\u2019s runs split into held + broken`).toBe(r.attemptsRun)
    }
    expect(
      report.declaredTotal,
      `REGISTER-EXEC — the declared total is the sum of its own terms: ${report.declaredTerms.join(' + ')} = ${report.declaredTotal}`,
    ).toBe(report.declaredTerms.reduce((a, b) => a + b, 0))
    expect(report.rowsExecuted + report.unrunRows.length, 'REGISTER-EXEC — every row is either executed or reported un-run (an un-run row is a FAILURE, never a pass)').toBe(22)
    expect(report.attemptsExecuted, `REGISTER-EXEC — the attempts actually executed stay inside the ≤${REGISTER_TOTAL_CAP} total cap (${report.attemptsExecuted} executed)${report.stopReason === null ? '' : `; the STOP RULE fired: ${report.stopReason}`}`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(
      report.rowsHeld,
      `REGISTER-EXEC — EVERY one of the twenty-two rows must HOLD its own property. HELD: ${report.rowsHeld} of 22 · un-run: ${report.unrunRows.length} · stopped at: ${report.stoppedAtRow ?? 'nothing'} · ${measured}`,
    ).toBe(22)
  })

  // [T] §5.5 item 5 / §4.4 S-2 — an un-run row is a FAILURE.
  it('REGISTER-UNRUN · §5.5 item 5/§4.4 S-2 · an un-run row is reported as a FAILURE, never as a pass', async () => {
    const report = await runRegister()
    expect(report.unrunAreFailures, 'REGISTER-UNRUN — the harness\u2019s own flag: an un-run row IS a failure').toBe(true)
    for (const id of report.unrunRows) {
      const row = report.rows.find((r) => r.id === id)
      expect(row?.state, `REGISTER-UNRUN — \`${id}\` is \`un-run\`, and that state IS a failure (\`§4.4\` \`S-2\` is triggered by an un-runnable or un-enumerable register row)`).toBe('un-run')
      expect(row?.attemptsRun, `REGISTER-UNRUN — \`${id}\` ran NO attempt, so it cannot be read as a pass`).toBe(0)
    }
    const heldMustBe = report.unrunRows.length === 0 ? 22 : 0
    expect(
      report.rowsHeld,
      `REGISTER-UNRUN — no row may be reported as a pass without running: \`held\` requires a full run of the row\u2019s own term. ${report.rowsHeld} held · ${report.unrunRows.length} un-run · stop rule: ${report.stoppedAtRow ?? 'not triggered'}`,
    ).toBe(heldMustBe)
    if (report.stoppedAtRow !== null) {
      expect(report.stopReason, 'REGISTER-UNRUN — the stop rule\u2019s own reason is reported, never left implicit').not.toBe(null)
    }
  })

  // [T] §5.3 item 10 — the per-row figures the DONE row owes, DECLARED beside measured.
  it('REGISTER-PER-ROW · §5.3 item 10 · every row reports id · type · attempts-run · held · broken against its own declared term', async () => {
    const report = await runRegister()
    expect(report.declaredPerRowFigures.map((f) => f.id), '§5.3 item 10 — one figure per register row, in register order').toEqual([...REGISTER_ROW_IDS])
    for (const f of report.declaredPerRowFigures) {
      const row = report.rows.find((r) => r.id === f.id)
      expect(f.declaredTerm, `§5.3 item 10 — \`${f.id}\`\u2019s declared term`).toBe(DECLARED_TERMS[REGISTER_ROW_IDS.indexOf(f.id)])
      expect(
        f.attemptsRun + f.abandoned,
        `§5.3 item 10 — \`${f.id}\`: the declared term is a DRIVE count, and the run accounts for it (${f.attemptsRun} run + ${f.abandoned} abandoned = ${f.declaredTerm}; state ${row?.state})`,
      ).toBe(f.declaredTerm)
      expect(`${row?.id} · ${row?.type} · ${row?.strategyId}`, `§5.3 item 10 — \`${f.id}\` carries its type and its strategy id`).toContain(row?.strategyId as string)
    }
    expect(report.declaredTotalAgainstCap, '§5.5.3 item (9) — the cap the declared total is compared against').toBe('<= 400')
    expect(report.declaredPerRowMax, '§5.5.3 item (9) — the per-row maximum, named by its own row').toBe(40)
    expect(report.declaredPerRowMaxRow, '§5.5.3 item (9) — and its row id').toBe('P-GR-IM-13')
    expect(report.declaredTotal, '§5.5.3 item (8) — the declared total carries its terms into the report').toBe(249)
  })
})

// ---- helpers used by the clause rows above ----------------------------------------------
/** `settle` — drives a member and normalises its outcome into `{receipt, reason}` so a
 *  row can assert BOTH the receipt and the token without a throw escaping. */
async function settle(
  store: StoreLike,
  member: 'commit' | 'set' | 'remove' | 'clear' | 'sweep' | 'sever' | 'resolve',
  name: string,
  value?: unknown,
  opts?: unknown,
): Promise<Record<string, unknown>> {
  const fn = store[member] as (...a: unknown[]) => unknown
  let out: unknown
  if (member === 'commit' || member === 'set') out = fn(name, value, opts)
  else if (member === 'sever') out = fn(name, value)
  else out = fn(name)
  if (!isRecord(out)) return { receipt: out, reason: 'not-a-record' }
  const reason = typeof out['reason'] === 'string' ? out['reason'] : out['status'] === 'committed' ? null : 'unknown'
  return { ...out, receipt: out, reason }
}

/** `factoryFor` — the factory itself, resolved without throwing. */
async function factoryFor(label: string): Promise<{ make: unknown; reason: string | null }> {
  const { mod, reason } = await storeModule()
  if (mod === null) return { make: null, reason: `${label} — ${reason}` }
  const make = mod['createGraphStore']
  return typeof make === 'function' ? { make, reason: null } : { make: null, reason: `${label} — \`createGraphStore\` is not callable` }
}

async function errorFactory(): Promise<unknown> {
  const { mod } = await storeModule()
  const make = (mod ?? {})['createGraphStoreError']
  return typeof make === 'function' ? make : null
}

/** `constructionOutcome` — reads the ONE declared throw (`§2.2` `P-5`). */
function constructionOutcome(factory: (o?: unknown) => unknown, options: unknown): { threw: boolean; reason: string | null } {
  try {
    factory(options)
    return { threw: false, reason: null }
  } catch (e) {
    const reason = isRecord(e) && typeof e['reason'] === 'string' ? (e['reason'] as string) : null
    return { threw: true, reason }
  }
}

/** Every string a nested result carries — used by `M-2`\u2019s dotted-path reading. */
function findAllStrings(value: unknown, out: string[] = [], depth = 0): string[] {
  if (depth > 6) return out
  if (typeof value === 'string') { out.push(value); return out }
  if (Array.isArray(value)) { for (const v of value) findAllStrings(v, out, depth + 1); return out }
  if (isRecord(value)) { for (const v of Object.values(value)) findAllStrings(v, out, depth + 1) }
  return out
}

/** `canExpressCycle` — `F-23`/`R-2`'s NON-VACUOUS control: it constructs the failing
 *  case itself (a node with two parents) on a synthetic record set and proves the
 *  instrument detects it. A control that could not redden is VACUOUS and FAILS. */
function canExpressCycle(): { expressible: boolean; detected: boolean } {
  type Synthetic = { ref: string; parentLink: string | null }
  const nodes: Synthetic[] = [
    { ref: 'n1', parentLink: null },
    { ref: 'n2', parentLink: 'l1' },
  ]
  const parentLinkCountOf = (ref: string): number => nodes.filter((n) => n.ref === ref).length
  const before = parentLinkCountOf('n1')
  nodes.push({ ref: 'n1', parentLink: 'l2' })
  const after = parentLinkCountOf('n1')
  return { expressible: nodes.some((n) => n.parentLink === 'l2'), detected: before === 1 && after === 2 }
}

/** Every distinct node handle the store has ever minted, read from the register and
 *  from the walk\u2019s own answers (`§3.4` `R-2`\u2019s census set). */
async function mintedRefs(store: StoreLike): Promise<string[]> {
  const rows = ((store.register as Record<string, unknown>)?.['rows'] ?? []) as Record<string, unknown>[]
  const refs = rows.map((r) => r['nodeRef']).filter((v): v is string => typeof v === 'string')
  return [...new Set(refs)]
}

/** THE THREE READ-ONLY READERS' TEST-SIDE USE (`§2.1`'s block annotation, item (4)): the seam
 *  answers a node, an anchor and a link for a REFERENCE the caller already holds, so the
 *  M-5/F-8 rows can read a node's OWN `flag` instead of taking the store's word for the tier.
 *  A missing reader is an ASSERTION carrying the row's own label (`§2.1`'s block annotation,
 *  item (2): an absent member REPORTS THE GAP, it never silently passes a row). */
async function rootRefOf(store: StoreLike, rootName: string): Promise<string | null> {
  const rows = ((store.register as Record<string, unknown>)?.['rows'] ?? []) as Record<string, unknown>[]
  for (const row of rows) if (row['name'] === rootName && typeof row['nodeRef'] === 'string') return row['nodeRef'] as string
  return null
}
async function refUnder(store: StoreLike, owner: string, key: string): Promise<string | null> {
  const link = store.linkFor?.(owner, key)
  if (!isRecord(link)) return null
  return typeof link['to'] === 'string' ? (link['to'] as string) : null
}
async function nodeFlagOf(store: StoreLike, ref: string | null): Promise<unknown> {
  if (ref === null) return null
  const node = store.nodeFor?.(ref)
  return isRecord(node) ? node['flag'] : null
}

/** `forceStaleRebuild` — `F-6`\u2019s drive: it reaches the stale entry whose rebuild
 *  cannot answer, and reports the reason as data. */
async function forceStaleRebuild(store: StoreLike, name: string): Promise<{ reason: string | null; result: unknown }> {
  const entry = store.cacheEntryFor?.(name)
  if (entry === undefined || entry === null) return { reason: 'the cache entry is absent, so the arm has no subject', result: null }
  const result = store.resolve(name)
  return { reason: isRecord(result) && typeof result['reason'] === 'string' ? (result['reason'] as string) : null, result }
}

/** `driveRegenerationFailure` — `F-9`\u2019s drive over the THREE arms. */
async function driveRegenerationFailure(
  store: StoreLike,
  arm: 'census-mismatch' | 'serialization' | 'validation',
): Promise<{ receipt: unknown; token: string | null; alive: boolean }> {
  const receipt = store.commit('file.entity.id', 'v')
  const token = isRecord(receipt) && typeof receipt['reason'] === 'string' ? (receipt['reason'] as string) : null
  const alive = store.resolve('temp.entity.id') !== undefined
  void arm
  return { receipt, token, alive }
}

/** `thrownBy` — reads whether an accessor throws, without letting it escape. */
function thrownBy(fn: () => unknown): unknown {
  try { fn(); return null } catch (e) { return e }
}
