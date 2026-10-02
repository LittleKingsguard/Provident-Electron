// tests/store-core-graph-register.ts — THE `§5.5.1` TYPED PROPERTY REGISTER of
// `U-STORE-CORE`'s successor (ledger row `G1`), the amended four-tier store on a
// node-anchor-link graph.
//
// This module is NOT a test file (`vitest.config.ts` includes `tests/**/*.test.ts`
// only, so it is never collected as a suite). It carries the register's TYPED ROWS
// and the harness that EXECUTES them; `tests/store-core-graph.test.ts` imports both,
// so the register rides the SAME node suite (`npm test`, `§5.2` leg 1) exactly as
// `§5.5.1` requires and the test file itself stays reviewable. The precedent is
// `tests/focus-tool-register.ts` (the landed pilot shape).
//
// CONTRACT (the only authority): `docs/specs/store-core-graph.md`
//   `§5.5`      — the strategy discipline, the caps, the stop rule.
//   `§5.5.1`    — THE TABLE: 22 typed rows (`14` `P-GR-IM` + `1` `P-GR-SM` +
//                 `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓), 22 strategy ids (`S-GR-*`),
//                 one pinned-seed generator (`S-GR-TOTAL-1`, seed `20261002`, one
//                 LCG step per draw, `pool.length = 22`), and `2` `(bounded)` rows
//                 (`P-GR-TP-1`, `P-GR-IM-12`).
//   `§5.5.2`    — the honesty block: the `(bounded)` set is exactly those 2 rows;
//                 assertions are printed BESIDE a term, never inside it.
//   `§5.5.3`    — item (8): THE OPERATIVE DECLARED TOTAL, `249`, with all twenty-two
//                 terms in register order and the chain
//                 `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139
//                  → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249`.
//                 Items (2)/(3) keep the as-filed `427` and the pre-amendment `233`
//                 VISIBLE — neither is asserted here (`S-3`, annotate-beside).
//   `§5.5.3`    — item (9): `249 ≤ 400` total, per-row maximum `40` (`P-GR-IM-13`)
//                 ≤ `100`, and `P-GR-IM-14` "a row like any other".
//
// THE TERMS, PRINTED WITH THEIR FACTORS (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`):
//   P-GR-IM-1   6  = 6 operations × 1 node class        P-GR-IM-2  12 = 6 operations × 2 reads
//   P-GR-IM-3   6  = 6 pairs × 1 commit                 P-GR-IM-4   6 = 6 register states × 1 reading
//   P-GR-IM-5  12  = 6 invalidating ops × 2 reads       P-GR-IM-6  12 = 6 refusal arms × 2 halves
//   P-GR-IM-7  12  = 6 precedence classes × 2 forms     P-GR-IM-8   7 = 7 failure arms × 1 drive
//   P-GR-IM-9  12  = 6 subtree shapes × 2 outcomes      P-GR-IM-10  4 = 4 seam members × 1 drive
//   P-GR-IM-11  4  = 4 operations × 1 drive             P-GR-IM-12  6 = 3 states × 2 drives (bounded)
//   P-GR-IM-13 40  = 5 states × 4 calls × 2 runs        P-GR-IM-14 16 = 4 tokens × 4 tokens
//   P-GR-SM-1  15  = 5 transition classes × 3 terminals P-GR-TP-1  24 = 6 draws × 4 arm drives (bounded)
//   P-GR-TP-2  16  = 8 hostile inputs × 2 drives        P-GR-TP-3   6 = 3 caps × 2 halves
//   P-GR-TP-4   6  = 6 export shapes × 1 drive          P-GR-TP-5  10 = 5 severance classes × 2 drives
//   P-GR-TP-6   5  = 5 fixtures × 1 census              P-GR-TP-7  12 = 6 merge shapes × 2 drives
//
// CAPS AND STOP RULE (`§5.5` item 3, `§5.5.3` item (9)): <=100 attempts per row,
// <=400 in total, rows evaluated SEQUENTIALLY IN REGISTER ORDER, STOP AFTER 5
// CONSECUTIVE FAILURES. A row that never ran is reported `un-run` and EVERY un-run
// row is a FAILURE, never a pass (`§5.5` item 5, `§4.4` `S-2`).
//
// THE MODULE'S ABSENCE IS DATA, NOT AN ERROR: this file never statically imports
// the modules under test (`§2.1` items 1/2). It resolves them the way the repo's
// other red harnesses do — an `existsSync` check before a fragment-assembled
// dynamic specifier — so an absent module makes each of a row's attempts a counted
// BROKEN attempt carrying the reason, and the stop rule can fire on real data.
//
// ⟶ REPAIRED 2026-10-01 (`RCA-8(a)`, scoped to this register): the as-authored
// version carried THIRTY-ONE PLACEHOLDER drives — the literal body
// `throw new Error('drive not evaluated: the module is absent')` for every row
// after `P-GR-IM-1` — and a placeholder drive CAN NEVER HOLD, whatever `src/**`
// contains, so `REGISTER-EXEC`'s `rowsHeld === 22` was unsatisfiable by
// construction. MEASURED before the repair: `5 attempts executed over 1 rows ·
// held 0 · broken 1 · un-run 21 (P-GR-IM-2 … P-GR-TP-7) · stopped at
// P-GR-IM-1`. EVERY drive below is now the REAL ASSERTION its row's property
// states: each one drives the contract's own store surface (`§2.1`'s `GraphStore`)
// and throws ONLY when the property is actually falsified. THE PRECEDENT IS
// `tests/focus-tool-register.ts`, whose drives are real assertions.
//
// ⟶ REPAIRED AGAIN 2026-10-01 (THE TESTWRITER'S RED-SET REPAIR PASS, `TW-4`; the FINAL red-set
// repair, `RCA-8(a)`): FIVE drives of that first repair still threw UNCONDITIONALLY, so
// `REGISTER-EXEC`'s `rowsHeld === 22` remained unsatisfiable for a CORRECT implementation —
// `rowsHeld` counts a row as held only if NONE of its drives throws (`runRegister`'s own
// `broken === 0` test). THE FIVE, AND THEIR REPAIRS: `P-GR-IM-8`'s arm `(vii)` (the
// write-to-orphaned-reference drive, whose as-filed body asserted the arm was unreachable —
// WITHDRAWN beside; the drive now MIRRORS `§3.2` `F-7` on the clause at `§2.5` item 6 /
// `§2.3` item 6 row `(vii)`, and `§7` item `11`(a) carries this pass's dated annotation), and
// `P-GR-IM-14`'s FOUR `secure`-as-PARENT pairs (`(secure, file)` · `(secure, mem)` ·
// `(secure, temp)` · `(secure, secure)`), which now assert the token `§5.5.1`'s `TW-3` clause
// names PER DIRECTION for the `secure`-involving half — `'secure-refused'`, decided at the
// security gate (`§2.4` item 7(b)) — exactly as the SAME ROW's child-`secure` half is driven;
// `1 + 4 = 5` ✓. THE ROW COUNT, EVERY TERM, EVERY STRATEGY ID AND BOTH `(bounded)` MARKINGS
// ARE UNMOVED: `22` rows (`14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`), the declared total
// `249` with its twenty-two terms, chain and caps printed at the head of this file.
// ⟶ WITH THE FIVE GONE, NO DRIVE IN THIS FILE THROWS UNCONDITIONALLY: every remaining throw
// is either a falsified property or the module-absence report `resolveRegisterSurface()` makes
// (`makeStore` answers `null` per attempt), which is why the `rowsHeld === 22` expectation is
// REACHABLE — a correct implementation holds all `22` rows, and at RED time the harness
// reports `0` held over `1` row with `21` un-run, exactly as the module-absence state predicts.
//
// NO NON-CONTRACTUAL SEAM IS INVENTED. The as-authored `P-GR-IM-1` read a
// fabricated `(store as {__minted?})` member that the contract does not declare —
// REMOVED. The only observation seam any drive now uses is the ONE the contract
// declares as TEST-ONLY (`§2.1`'s `GraphStore` block: `reset` · `seed` ·
// `parentLinkCountOf` · `cacheEntryFor`, present only under
// `{enableTestSeam:true}`), together with the store's own public surface.
//
// A DRIVE WHOSE SUBJECT THE CONTRACT DOES NOT SUPPLY IS **STILL WRITTEN AS A REAL
// ASSERTION** and reported as a CONTRACT GAP in this pass's report rather than
// satisfied with a placeholder or a fabricated seam: the gap is a finding for the
// next gate, and a placeholder is a lie about coverage.

import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// ---- THE PATHS (`§2.1` items 1/2, `§5.1` rows 1/2) --------------------------------------
/** `§2.1` item 1 · `§5.1` row 1 — THE STORE. Fragmented so this module's own bytes
 *  never carry a resolvable specifier for a module that does not exist yet. */
const STORE_SRC = new URL('./../src/renderer/' + 'store-core' + '-graph.ts', import.meta.url)
/** `§2.1` item 2 · `§5.1` row 2 — THE INPUT. */
const REFS_SRC = new URL('./../src/renderer/' + 'store-graph' + '-references.ts', import.meta.url)
const STORE_SPECIFIER = './../src/renderer/' + 'store-core' + '-graph.js'
const REFS_SPECIFIER = './../src/renderer/' + 'store-graph' + '-references.js'

export const STORE_SRC_PATH = fileURLToPath(STORE_SRC)
export const REFS_SRC_PATH = fileURLToPath(REFS_SRC)

// ---- THE REGISTER'S OWN CONSTANTS (`§5.5` items 2/3, `§5.5.3` item (9)) -----------------
/** `§5.5.1`'s pinned seed — THE ONE generator form: `state0 = 20261002`. */
export const REGISTER_SEED = 20261002
/** `§5.5.1` — `pool.length = 22`, with EACH DRAW APPLYING EXACTLY ONE LCG STEP. */
export const POOL_SIZE = 22
/** `§5.5.3` item (9) — the per-row cap. */
export const REGISTER_ROW_CAP = 100
/** `§5.5.3` item (9) — the total cap, compared against the DECLARED figures. */
export const REGISTER_TOTAL_CAP = 400
/** `§5.5` item 3 — the stop rule. */
export const STOP_AFTER_CONSECUTIVE = 5

/** `§5.5.3` item (8) — the DECLARED TERMS, in register order, twenty-two of them. */
export const DECLARED_TERMS: readonly number[] = [
  6, 12, 6, 6, 12, 12, 12, 7, 12, 4, 4, 6, 40, 16, 15, 24, 16, 6, 6, 10, 5, 12,
]

/** `§5.5.1` — the twenty-two row ids, in register order. */
export const REGISTER_ROW_IDS: readonly string[] = [
  'P-GR-IM-1', 'P-GR-IM-2', 'P-GR-IM-3', 'P-GR-IM-4', 'P-GR-IM-5', 'P-GR-IM-6',
  'P-GR-IM-7', 'P-GR-IM-8', 'P-GR-IM-9', 'P-GR-IM-10', 'P-GR-IM-11', 'P-GR-IM-12',
  'P-GR-IM-13', 'P-GR-IM-14', 'P-GR-SM-1', 'P-GR-TP-1', 'P-GR-TP-2', 'P-GR-TP-3',
  'P-GR-TP-4', 'P-GR-TP-5', 'P-GR-TP-6', 'P-GR-TP-7',
]

/** `§5.5.1` — 22 strategy ids, one per row (`S-GR-*`). `S-GR-PERSIST-1` is the
 *  added row's own (`§5.5.1`'s `P-GR-IM-14`), and `S-GR-TOTAL-1` is the ONE
 *  pinned-seed generator. */
export const STRATEGY_IDS: readonly string[] = [
  'S-GR-TREE-1', 'S-GR-IMMUT-1', 'S-GR-UNIQ-1', 'S-GR-PROJ-1', 'S-GR-CACHE-1',
  'S-GR-REG-1', 'S-GR-PREC-1', 'S-GR-DIAG-1', 'S-GR-REGEN-1', 'S-GR-SEAM-1',
  'S-GR-FLAG-1', 'S-GR-LOAD-1', 'S-GR-DIFF-1', 'S-GR-PERSIST-1', 'S-GR-TXN-1',
  'S-GR-TOTAL-1', 'S-GR-HOSTILE-1', 'S-GR-CAP-1', 'S-GR-EXPORT-1', 'S-GR-SEVER-1',
  'S-GR-CENSUS-1', 'S-GR-MERGE-1',
]

/** `§5.5.2` item 1 — the `(bounded)` set is exactly TWO rows and no others. */
export const BOUNDED_ROWS: readonly string[] = ['P-GR-TP-1', 'P-GR-IM-12']

// ---- THE TEST-ONLY SEAM'S EIGHT DECLARED MEMBERS (`§2.1`'s `GraphStore` block) ----------
// EXTENDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`/`TW-2`; the contract amendment
// `bb8394e`): the block declares FOUR as-filed seam members PLUS the FOUR that amendment
// appended — `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild` — giving a member
// census of `4 + 4 = 8` ✓ (`§2.1`'s block annotation, item (1)). The appended four are
// INSTRUMENTS of drives the register already counts, so they add ASSERTIONS to the readings
// below and NO drive: `P-GR-IM-10`'s term stays `4` = `4` DRIVE MEMBERS × `1` DRIVE
// (block annotation, item (5)) and the operative twenty-two-term total stays `249`.
/** The four AS-FILED seam members, in the order the block prints them. */
export const AS_FILED_SEAM_MEMBERS: readonly string[] = ['reset', 'seed', 'parentLinkCountOf', 'cacheEntryFor']
/** The four APPENDED seam members (`TW-1`/`TW-2`), in the order the block prints them. */
export const APPENDED_SEAM_MEMBERS: readonly string[] = ['nodeFor', 'anchorFor', 'linkFor', 'failNextCacheRebuild']
/** THE SEAM'S OWN KEY SET, read as a SET: `4 + 4 = 8`. */
export const SEAM_MEMBERS: readonly string[] = [...AS_FILED_SEAM_MEMBERS, ...APPENDED_SEAM_MEMBERS]
/** THE POSITIVE CONTROL for the key-set readings: a NINTH, UNDECLARED member name must FAIL
 *  the same set-equality reading, so the reading is not a lower bound. */
export const UNDECLARED_NINTH_MEMBER = 'notADeclaredSeamMember'

/** `§5.5.3` item (11) — the SUPERSEDED figures, kept VISIBLE and never asserted:
 *  the as-filed drive column (`427`), the pre-amendment corrected column (`233`),
 *  and the filing-time `389` that no term set reproduces. */
export const AS_FILED_TOTAL_427 = 427
export const PRE_AMENDMENT_TOTAL_233 = 233
export const FILING_TIME_TOTAL_389 = 389

/** The declared total, printed WITH its terms (`§5.5.3` item (8)). */
export function declaredTotalReport(): { terms: readonly number[]; sum: number; chain: string } {
  const chain: number[] = []
  let running = 0
  for (const term of DECLARED_TERMS) {
    running += term
    chain.push(running)
  }
  return {
    terms: DECLARED_TERMS,
    sum: running,
    chain: chain.join(' -> '),
  }
}

// ---- THE LCG GENERATOR (`§5.5.1`, `S-GR-TOTAL-1`'s strategy cell) -----------------------
/** THE ONE PINNED-SEED GENERATOR: a hand-rolled 32-bit LCG, `state0 = 20261002`,
 *  `state(n+1) = (state(n) * 1664525 + 1013904223) mod 2^32`, EACH DRAW APPLYING
 *  EXACTLY ONE STEP, the resulting state selecting the pool member via
 *  `index = state(n+1) mod pool.length` with `pool.length = 22`. No `next(k)`
 *  helper, no `Math` `.random`, no wall-clock seed, no shrinking, no adaptive search,
 *  and NO NEW DEPENDENCY (`§5.5` item 2). Returns the drawn INDICES with each
 *  draw's own post-step state, so a reading can be reported. */
export function pinnedSeedDraws(count: number, poolLength: number = POOL_SIZE): { index: number; state: number }[] {
  const out: { index: number; state: number }[] = []
  let state = REGISTER_SEED
  for (let i = 0; i < count; i++) {
    state = (state * 1664525 + 1013904223) % 4294967296
    out.push({ index: state % poolLength, state })
  }
  return out
}

// ---- THE HARNESS (`§5.5` items 1/3/5) ---------------------------------------------------
export interface Drive {
  readonly label: string
  readonly run: (store: GraphStoreLike, surface: Surface) => void
}

export interface RegisterRow {
  readonly id: string
  /** `P-IM` | `P-SM` | `P-TP` — the row's DECLARED TYPE, never its ordinal (`§5.5.1`). */
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly domain: string
  readonly strategyId: string
  /** The DECLARED TERM: a DRIVE COUNT (`§5.5.3` item (8)). */
  readonly term: number
  readonly bound: 'enumerated' | 'bounded'
  /** Assertions printed BESIDE the term, never counted inside it (`§5.5.2`). */
  readonly assertions: readonly string[]
  /** The compensating `§3` sample rows the contract's own cell names. */
  readonly compensating: readonly string[]
  /** The row's `term` drives, in the contract's own order and factors. */
  readonly drives: readonly Drive[]
}

export interface RowReport {
  readonly id: string
  readonly type: string
  readonly domain: string
  readonly strategyId: string
  readonly declaredTerm: number
  readonly attemptsRun: number
  /** The attempts the STOP RULE abandoned inside this row (`§5.5` item 3): they are
   *  neither held nor broken, and `attemptsRun + abandoned + (un-run ? term : 0)`
   *  is the row's declared term. */
  readonly abandoned: number
  readonly held: number
  readonly broken: number
  readonly state: 'held' | 'broken' | 'un-run'
  readonly bounded: boolean
  readonly readings: readonly string[]
}

export interface RegisterReport {
  readonly rows: readonly RowReport[]
  readonly declaredTotal: number
  readonly declaredTerms: readonly number[]
  readonly chain: string
  readonly attemptsExecuted: number
  readonly rowsExecuted: number
  readonly rowsHeld: number
  readonly rowsBroken: number
  readonly unrunRows: readonly string[]
  readonly unrunAreFailures: true
  readonly stoppedAtRow: string | null
  readonly stopReason: string | null
  /** What the DECLARED figures are compared against (`§5.5.3` item (9)): the total
   *  cap and the per-row cap, both read from the declared terms and never from a run. */
  readonly declaredTotalAgainstCap: '<= 400'
  readonly declaredPerRowMax: number
  readonly declaredPerRowMaxRow: string
  /** `§5.3` item 10's DONE row owes, per register row, the id · type ·
   *  attempts-run · held · broken counts. When the STOP RULE abandons rows (it
   *  fires after `5` consecutive failures, `§5.5` item 3), this field carries the
   *  per-row DECLARED figures BESIDE the measured ones, so the report is complete
   *  without re-running a stopped register. */
  readonly declaredPerRowFigures: readonly { id: string; declaredTerm: number; attemptsRun: number; abandoned: number }[]
  readonly registerReasons: readonly string[]
}

// ---- THE SURFACE, RESOLVED WITHOUT THROWING ---------------------------------------------
/** The five members this register actually drives. Kept structural on purpose:
 *  the register never imports the store's types (`§2.1` items 1/2), so a renamed
 *  or missing member is DATA that the rows report. */
export interface Surface {
  readonly createGraphStore: ((options?: unknown) => GraphStoreLike) | null
  readonly createGraphStoreError: ((message: string, reason: string) => unknown) | null
  readonly storeGraphReferences: ((rows: readonly unknown[]) => unknown) | null
  readonly storeModule: Record<string, unknown> | null
  readonly refsModule: Record<string, unknown> | null
  readonly reason: string | null
}

/** The store's own members (`§2.1`'s `GraphStore`), reached by name so a missing
 *  member reddens the row that drives it instead of failing the file.
 *  THE TEST-ONLY SEAM'S EIGHT DECLARED MEMBERS are declared here in the block's own
 *  signatures and optionality (`?`), the four as-filed ones PLUS the four appended
 *  2026-10-01 by `TW-1`/`TW-2` (`§2.1`'s block annotation: `4 + 4 = 8`). */
export interface GraphStoreLike {
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
  /* ---- THE FOUR AS-FILED SEAM MEMBERS ---- */
  reset?: () => void
  seed?: (rows: readonly unknown[]) => void
  parentLinkCountOf?: (nodeRef: string) => number
  cacheEntryFor?: (name: string) => unknown
  /* ---- THE FOUR APPENDED SEAM MEMBERS (`TW-1`/`TW-2`, read-only + one-shot) ---- */
  /** `nodeFor` answers a NODE by the reference a resolution yielded — its `ref` and its
   *  `flag` — or `null` when no such object exists. Read-only. */
  nodeFor?: (nodeRef: string) => unknown
  /** `anchorFor` answers the ANCHOR on an owner for a caller's own `key` — its `key` and
   *  its `link` — or `null`. Read-only. */
  anchorFor?: (owner: string, key: string) => unknown
  /** `linkFor` answers the LINK that anchor holds — its target (the declared `to`, `null`
   *  once the target is severed) and its PER-LINK CACHE ENTRY (the declared `cache`). */
  linkFor?: (owner: string, key: string) => unknown
  /** `failNextCacheRebuild` arms the NEXT rebuild the INVALIDATION SITE performs (`§2.6`
   *  item 4, `DR-7`) to fail, ONE-SHOT, and it can fault nothing else. */
  failNextCacheRebuild?: () => void
}

let surfaceCache: Surface | null = null

/** Resolves `§2.1`'s surface WITHOUT throwing: the reason a row is broken is DATA,
 *  so the register can count it as a broken attempt and let the stop rule fire. */
export async function resolveRegisterSurface(): Promise<Surface> {
  if (surfaceCache !== null) return surfaceCache
  if (!existsSync(STORE_SRC)) {
    surfaceCache = {
      createGraphStore: null,
      createGraphStoreError: null,
      storeGraphReferences: null,
      storeModule: null,
      refsModule: null,
      reason: `the store module of §2.1 item 1 / §5.1 row 1 does not exist yet (${STORE_SRC_PATH})`,
    }
    return surfaceCache
  }
  try {
    const storeModule = (await import(/* @vite-ignore */ STORE_SPECIFIER)) as Record<string, unknown>
    const refsModule = existsSync(REFS_SRC)
      ? ((await import(/* @vite-ignore */ REFS_SPECIFIER)) as Record<string, unknown>)
      : null
    const createGraphStore = storeModule['createGraphStore']
    const createGraphStoreError = storeModule['createGraphStoreError']
    const storeGraphReferences = refsModule === null ? null : refsModule['storeGraphReferences']
    const missing: string[] = []
    if (typeof createGraphStore !== 'function') missing.push('createGraphStore')
    if (typeof createGraphStoreError !== 'function') missing.push('createGraphStoreError')
    if (typeof storeGraphReferences !== 'function') missing.push('storeGraphReferences')
    surfaceCache = {
      createGraphStore: typeof createGraphStore === 'function' ? (createGraphStore as (o?: unknown) => GraphStoreLike) : null,
      createGraphStoreError:
        typeof createGraphStoreError === 'function'
          ? (createGraphStoreError as (m: string, r: string) => unknown)
          : null,
      storeGraphReferences:
        typeof storeGraphReferences === 'function' ? (storeGraphReferences as (r: readonly unknown[]) => unknown) : null,
      storeModule,
      refsModule,
      reason: missing.length === 0 ? null : `§2.1's value exports are not all callable: ${missing.join(' · ')}`,
    }
  } catch (e) {
    surfaceCache = {
      createGraphStore: null,
      createGraphStoreError: null,
      storeGraphReferences: null,
      storeModule: null,
      refsModule: null,
      reason: `the store module does not resolve: ${e instanceof Error ? e.message : String(e)}`,
    }
  }
  return surfaceCache
}

/** THE ROWS' ENTRY POINT: a `null` store means the module is absent or its factory
 *  is not callable, and every caller must report that as its own reason.
 *  **REPAIRED 2026-10-01**: it now supplies the CONTRACT'S OWN DECLARED-ROW FIXTURE
 *  instead of the empty default, because the register's property text is *"the
 *  declared-row fixture this register runs against"* (`§5.5.1`'s fixture paragraph)
 *  and a store with no declaration can reach none of the fixture's paths. */
export function makeStore(surface: Surface, options?: unknown): GraphStoreLike | null {
  return constructStore(surface, options ?? fixtureOptions())?.store ?? null
}

// ---- THE CONTRACT'S DECLARED-ROW FIXTURE (`§5.5.1`'s fixture paragraph) ----------------
/** `§5.5.1`'s fixture, the FOUR loading declarations, as tier-qualified caller spellings
 *  (generic caller style, NO consumer noun): `file.<entity>.order` · `file.<entity>.pinned`
 *  (the reserved flag) · `mem.<entity>.<id>.working` · `temp.<entity>.<id>.candidate`.
 *  The `secure` spelling of the fixture paragraph is the REFUSED-CONTROL INPUT and is
 *  NEVER a loading declaration (`§5.5.1`'s `O-6` annotation, clause (1)). */
export const FIXTURE_LOADING_ROWS: readonly Record<string, unknown>[] = [
  { name: 'file.entity.order' },
  { name: 'file.entity.pinned', reserved: true },
  { name: 'mem.entity.id.working' },
  { name: 'temp.entity.id.candidate' },
]
/** The fixture's REFUSED-CONTROL INPUT (`§5.5.1`'s `O-6` annotation): arm (b) of `§2.4`
 *  item 5 has a `secure`-spelled declaration as its subject, and it NEVER LOADS. */
export const FIXTURE_REFUSED_CONTROL_ROWS: readonly Record<string, unknown>[] = [
  { name: 'secure.entity.secret' },
]
/** THE REGISTER'S OWN STORE FIXTURE: the four fixture declarations PLUS the ONE root
 *  name a `§3.1` `M-1`-shaped drive needs (`window`, the top-level name the contract's
 *  own worked example spells). A declaration is a top-level NAME and contributes NO
 *  row (`§2.4` item 3's annotation), so this list only widens the reachable root set. */
export const REGISTER_FIXTURE_ROWS: readonly Record<string, unknown>[] = [
  { name: 'file.entity.order' },
  { name: 'file.entity.pinned', reserved: true },
  { name: 'mem.entity.id.working' },
  { name: 'temp.entity.id.candidate' },
  { name: 'file.window.tabs' },
  { name: 'mem.window.tabs' },
  { name: 'temp.window.tabs' },
]
/** `§5.5.1`'s fixture paragraph, the TWO constraint rows VERBATIM. */
export const FIXTURE_CONSTRAINTS: readonly Record<string, unknown>[] = [
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
/** `§2.1`'s `GraphCrossing` — the DECLARED, STUBBED crossing seam. This unit asserts
 *  NOTHING about the real channel (`§2.8` item 8; `§5.5` item 6(a)). */
export const stubCrossing = { put: (_row: { readonly name: string; readonly value: unknown }) => ({ status: 'committed' as const }) }
/** The fixture names the register's drives commit, so a drive can tell a COLD root name
 *  (declared, no row yet → the declared miss) from a name that is not a root name at all
 *  (`'undeclared-name'`, `§2.4` item 4's annotation). */
export const REGISTER_ROOT_NAMES: readonly string[] = ['entity', 'window']
/** THE HOSTILE-INPUT POOL's segment class of `P-GR-TP-2` (`§5.5.1`). */
export const HOSTILE_SEGMENTS: readonly string[] = ['__proto__', 'constructor', 'toString', 'hasOwnProperty', 'valueOf']

/** `§2.1`'s factory options with the fixture's declarations and constraints. */
export function fixtureOptions(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    declarations: { rows: REGISTER_FIXTURE_ROWS },
    constraints: FIXTURE_CONSTRAINTS,
    crossing: stubCrossing,
    // THE FIXTURE LOADS: `\u00a72.4` item 5 arm (d) refuses a declaration COLLIDING with a
    // reserved namespace key, and the fixture's own four declarations live UNDER the
    // `entity` namespace \u2014 so the reserved-namespace set is EMPTY here and the arm is
    // driven on its OWN input, which is the only input that has that collision (`F-18`(d)).
    reservedNamespaces: [],
    enableTestSeam: true,
    ...extra,
  }
}

/** Constructs a store and reports the ONE declared throw (`§2.2` `P-5`) as DATA, so an
 *  arm that must refuse `'malformed-name'` at construction can read its own token
 *  instead of dying on a throw (`P-GR-IM-6`'s refusal drive). */
export function constructStore(
  surface: Surface,
  options?: unknown,
): { store: GraphStoreLike | null; threw: boolean; reason: string | null; step: string | null } {
  if (surface.createGraphStore === null) {
    return { store: null, threw: false, reason: surface.reason ?? 'the factory is not callable', step: null }
  }
  try {
    const made = surface.createGraphStore(options)
    return {
      store: made === null || typeof made !== 'object' ? null : made,
      threw: false,
      reason: null,
      step: null,
    }
  } catch (e) {
    return { store: null, threw: true, reason: thrownReason(e), step: thrownStep(e) }
  }
}

// ---- THE DRIVES' OWN ASSERTION AND OBSERVATION HELPERS -----------------------------------
function record(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null
}
function fail(label: string, detail: string): never {
  throw new Error(`${label} — ${detail}`)
}
function need(ok: unknown, label: string, detail: string): void {
  if (!ok) fail(label, detail)
}
function eq(got: unknown, want: unknown, label: string, detail: string): void {
  if (got !== want) fail(label, `${detail} (read ${JSON.stringify(got)}, declared ${JSON.stringify(want)})`)
}
function asArray(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? (value as readonly unknown[]) : []
}
function thrownReason(e: unknown): string | null {
  const r = record(e)
  return r !== null && typeof r['reason'] === 'string' ? (r['reason'] as string) : null
}
function thrownStep(e: unknown): string | null {
  const r = record(e)
  const d = r === null ? null : record(r['diagnostic'])
  if (d !== null && typeof d['step'] === 'string') return d['step'] as string
  return r !== null && typeof r['step'] === 'string' ? (r['step'] as string) : null
}
function callStore(store: GraphStoreLike, member: string, args: readonly unknown[]): { value: unknown; error: unknown } {
  const fn = (store as unknown as Record<string, unknown>)[member]
  if (typeof fn !== 'function') return { value: undefined, error: new Error(`the member \`${member}\` is absent (§2.1's GraphStore)`) }
  try {
    return { value: (fn as (...a: unknown[]) => unknown)(...args), error: null }
  } catch (e) {
    return { value: undefined, error: e }
  }
}

/** A mutator's READING: nothing throws (`§2.2` `P-5`), the answer is a RETURNED RECORD
 *  carrying the six common members (`§2.1`'s `GraphWriteReceipt`), and its own token. */
interface WriteReading {
  readonly receipt: Record<string, unknown>
  readonly status: unknown
  readonly reason: unknown
  readonly diagnostic: Record<string, unknown> | null
  readonly label: string
}
function readWrite(store: GraphStoreLike, member: string, args: readonly unknown[], label: string): WriteReading {
  const { value, error } = callStore(store, member, args)
  if (error !== null) fail(label, `NOTHING may throw on a declared-domain input (\u00a72.2 P-5); \`${member}\` threw: ${(error as Error).message ?? String(error)}`)
  const r = record(value)
  if (r === null) fail(label, `\`${member}\` answers a RETURNED RECORD (\u00a72.2 P-5), read ${JSON.stringify(value)}`)
  const receipt = r as Record<string, unknown>
  for (const key of ['status', 'name', 'cleared', 'repaired', 'rows', 'crossings', 'events']) {
    if (!Object.prototype.hasOwnProperty.call(receipt, key)) {
      fail(label, `the receipt carries \`${key}\` as a KEY on every arm (\u00a72.1's GraphWriteReceipt)`)
    }
  }
  if (receipt['status'] !== 'committed' && receipt['status'] !== 'refused') {
    fail(label, `the receipt's status is one of the two declared members, read ${JSON.stringify(receipt['status'])}`)
  }
  return {
    receipt,
    status: receipt['status'],
    reason: receipt['reason'] ?? null,
    diagnostic: record(receipt['diagnostic']),
    label,
  }
}
/** `§3.4` `R-3`: a REFUSAL implies `cleared: []`, `repaired: []`, `rows: []`, BOTH counts
 *  `0` and every resident copy untouched. */
function readRefusal(store: GraphStoreLike, member: string, args: readonly unknown[], label: string): WriteReading {
  const w = readWrite(store, member, args, label)
  eq(w.status, 'refused', label, `the declared arm is a REFUSAL`)
  eq(JSON.stringify(w.receipt['cleared']), '[]', label, 'a refusal CLEARS nothing (\u00a73.4 R-3)')
  eq(JSON.stringify(w.receipt['rows']), '[]', label, 'a refusal carries NO affected row (\u00a73.4 R-3)')
  eq(w.receipt['crossings'], 0, label, 'a refusal CROSSES nothing (\u00a73.4 R-3)')
  eq(w.receipt['events'], 0, label, 'a refusal EMITS nothing (\u00a73.4 R-3)')
  return w
}
/** The WALK's reading: a RETURNED RECORD — a resolve answer, or a refusal carrying its
 *  own diagnostic (`§2.3` item 6) — and never a throw. */
interface WalkReading {
  readonly answer: Record<string, unknown>
  readonly refused: boolean
  readonly reason: unknown
  readonly step: unknown
  readonly segment: unknown
  readonly owner: unknown
  readonly label: string
}
function readWalk(store: GraphStoreLike, name: string, label: string): WalkReading {
  const { value, error } = callStore(store, 'resolve', [name])
  if (error !== null) fail(label, `the walk is TOTAL and NOTHING throws (\u00a72.2 P-5); it threw: ${(error as Error).message ?? String(error)}`)
  const r = record(value)
  if (r === null) fail(label, `the walk answers a RETURNED RECORD (\u00a72.2 P-5), read ${JSON.stringify(value)}`)
  const answer = r as Record<string, unknown>
  const refused = answer['status'] === 'refused'
  const diagnostic = record(answer['diagnostic'])
  if (refused && diagnostic === null) fail(label, 'a refusal record WITHOUT a diagnostic FAILS (\u00a73.4 R-4)')
  return {
    answer,
    refused,
    reason: refused ? answer['reason'] : null,
    step: diagnostic === null ? null : diagnostic['step'],
    segment: diagnostic === null ? null : diagnostic['segment'],
    owner: diagnostic === null ? null : diagnostic['owner'],
    label,
  }
}
function isMiss(w: WalkReading): boolean {
  return !w.refused && w.answer['found'] === false
}
function isMerged(w: WalkReading): boolean {
  return !w.refused && w.answer['found'] === true && w.answer['merged'] === true
}

/** THE REGISTER'S OWN VIEW (`§2.4`), read structurally. */
function registerRows(store: GraphStoreLike): readonly Record<string, unknown>[] {
  const reg = record(store.register)
  if (reg === null) fail('register', 'the register is the graph\u2019s own READ-ONLY VIEW (\u00a72.4) and must be readable')
  const rows = asArray((reg as Record<string, unknown>)['rows'])
  return rows.map((row) => {
    const r = record(row)
    if (r === null) fail('register', `a register row is a record (\u00a72.1's GraphRegisterRow), read ${JSON.stringify(row)}`)
    return r as Record<string, unknown>
  })
}
function rowFor(store: GraphStoreLike, name: string): Record<string, unknown> | null {
  for (const row of registerRows(store)) if (row['name'] === name) return row
  return null
}
function nodeRefOf(store: GraphStoreLike, name: string): string | null {
  const row = rowFor(store, name)
  return row === null || typeof row['nodeRef'] !== 'string' ? null : (row['nodeRef'] as string)
}

/** THE GRAPH CENSUS (`§3.4` `R-2`'s "every node the graph has ever minted").
 *
 *  **WHAT THE CONTRACT LETS A DRIVE READ, STATED EXACTLY, because this is the boundary
 *  the census is built on:** `§2.1`'s `GraphStore` block declares NO node accessor — a
 *  node is reached by the walk through its anchors and links, and the store does not
 *  hand a node or a link to a caller. The ONE observation the contract declares for the
 *  graph's own shape is the TEST-ONLY seam `parentLinkCountOf(nodeRef)` (`§3.4` `R-2`),
 *  and the ONE inventory of node handles the contract declares is the register's own
 *  projection (`§2.4`: "the register is the graph's top-level projection AND ONLY THAT",
 *  one row per ROOT, whose `nodeRef` is a minted handle).
 *
 *  SO THE CENSUS IS READ FROM THE HANDLES THE STORE ITSELF EXPOSES — the register rows'
 *  `nodeRef`s — and the property is read OFF `parentLinkCountOf`, exactly as the
 *  contract's own `§3.4` `R-2` and `§3.3` `I-2` rows read it. A handle that is reachable
 *  only through a link (a non-root node) is enumerated by the WALK's own answers and by
 *  the operations the drives perform, which is what `tests/store-core-graph.test.ts`'s
 *  `mintedRefs` does for the same row. */
interface GraphCensus {
  readonly refs: readonly string[]
  readonly rowRefs: readonly string[]
  readonly parentLinks: ReadonlyMap<string, number>
  readonly violations: readonly string[]
}
function censusOf(store: GraphStoreLike, label: string): GraphCensus {
  if (typeof store.parentLinkCountOf !== 'function') {
    fail(label, 'the census the tree invariant is read with is `parentLinkCountOf` (\u00a73.4 R-2), and it is absent')
  }
  if (typeof store.cacheEntryFor !== 'function') {
    fail(label, 'the register-cache probe `cacheEntryFor` is the second declared test-only seam (\u00a72.1\u2019s GraphStore block), and it is absent')
  }
  const rows = registerRows(store)
  const rowRefs: string[] = []
  for (const row of rows) {
    const ref = row['nodeRef']
    if (typeof ref !== 'string') fail(label, `every existing register row carries a \`nodeRef\` (\u00a72.4 item 4's annotation: \`nodeRef: null\` never appears in a register row)`)
    rowRefs.push(ref)
  }
  const refs = [...new Set(rowRefs)]
  const parentLinks = new Map<string, number>()
  const violations: string[] = []
  for (const ref of refs) {
    const count = store.parentLinkCountOf(ref)
    parentLinks.set(ref, count)
    if (!(count <= 1)) {
      violations.push(`the node ${ref} carries ${String(count)} parent links; the tree invariant allows EXACTLY ONE (\u00a72.3 item 4, I-2)`)
    }
  }
  return { refs, rowRefs, parentLinks, violations }
}
/** `§2.1`'s ordering (`file` > `mem` > `temp`): `secure` is OUTSIDE it and carries no
 *  graph node. THE INVARIANT IS VACUOUS AT A ROOT. */
const DURABILITY_RANK: Readonly<Record<string, number>> = { file: 3, mem: 2, temp: 1 }
function isMoreDurable(child: unknown, parent: unknown): boolean {
  const c = DURABILITY_RANK[String(child)]
  const p = DURABILITY_RANK[String(parent)]
  return c !== undefined && p !== undefined && c > p
}
/** `§2.2` `P-2`'s `R-2` control: the instrument CAN express its failing case. */
/** `§2.3` item 4 / `§3.4` `R-2`: the tree invariant over the census — no register row's
 *  handle reads a second parent link, a ROOT reads NONE (the invariant is VACUOUS AT A
 *  ROOT), and the census has SUBJECTS (a vacuous census FAILS). */
function assertTreeInvariant(census: GraphCensus, label: string): void {
  need(census.refs.length > 0, label, 'the census has SUBJECTS: a census with no node handle is VACUOUS and FAILS')
  for (const violation of census.violations) fail(label, violation)
  for (const [ref, count] of census.parentLinks) {
    need(count >= 0, label, `the parent-link count of ${ref} is a count, read ${String(count)}`)
  }
}
/** The TIER-LOCAL handle (`§2.1`'s `GraphTierHandle`), read by tier name. */
function tierHandle(store: GraphStoreLike, token: string, label: string): Record<string, unknown> {
  const tiers = record(store.tiers)
  if (tiers === null) fail(label, 'the three collections are readable by tier name (\u00a72.6 item 1)')
  const handle = record((tiers as Record<string, unknown>)[token])
  if (handle === null) fail(label, `the \`${token}\` tier's own handle is readable`)
  return handle as Record<string, unknown>
}
/** The nodes a TOP-LEVEL name can be held by, read through the tier-local `has` of each
 *  handle: the flag the node ACTUALLY carries, without a node accessor. `§2.1`'s
 *  `GraphTierHandle` is the declared surface for this reading. */
function flagsOfName(store: GraphStoreLike, name: string, label: string): readonly string[] {
  const held: string[] = []
  for (const token of ['file', 'mem', 'temp']) {
    const handle = tierHandle(store, token, label)
    const has = handle['has']
    if (typeof has !== 'function') fail(label, `the \`${token}\` handle carries its own \`has\` (\u00a72.1's GraphTierHandle)`)
    // THE TIER HANDLE TAKES A TIER-QUALIFIED NAME: the handle is the FILTER, and the
    // spelling it filters is the caller's own (`\u00a72.1`'s `GraphTierHandle.has(name)`).
    if ((has as (n: string) => unknown)(`${token}.${name}`) === true) held.push(token)
  }
  return held
}
/** THE REGISTER-CACHE READING of a TOP-LEVEL NAME, compared STRUCTURALLY: the entry is
 *  `{name, matchedRef, matchedTier}` (`§2.6` item 2) and the contract declares no rebuild
 *  identity rule, so a rebuilt entry whose members agree is the same reading. */
function cacheEntryOf(store: GraphStoreLike, name: string, label: string): unknown {
  if (typeof store.cacheEntryFor !== 'function') {
    fail(label, 'the register-cache probe `cacheEntryFor` is the declared test-only seam (\u00a72.1\u2019s GraphStore block), and it is absent')
  }
  return store.cacheEntryFor(name)
}
function sameEntry(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null)
}
/** The register's own ROOT COUNT (`§2.4` item 3's ruling: `rows = R`, the parentless-node
 *  count): a row EXISTS for a root or not at all, so the row count IS the root count. */
function rootRowNames(store: GraphStoreLike): string[] {
  return registerRows(store).map((row) => String(row['name']))
}
/** `§2.2` `P-2`'s `R-2` control: the instrument CAN express its failing case. */
function doubleParentControl(): { expressible: boolean; detected: boolean } {
  const links: { ref: string; parentLink: string | null }[] = [
    { ref: 'n1', parentLink: null },
    { ref: 'n2', parentLink: 'l1' },
  ]
  const count = (ref: string): number => links.filter((l) => l.ref === ref).length
  const before = count('n1')
  links.push({ ref: 'n1', parentLink: 'l2' })
  return { expressible: links.some((l) => l.parentLink === 'l2'), detected: before === 1 && count('n1') === 2 }
}
/** The register's OWN instrument for `P-GR-TP-5`: the vocabulary and instrument scans,
 *  with their rules held as FRAGMENTS so a rule list never reads as its own hit. */
function vocabularyScan(text: string): string[] {
  const rules: [string, RegExp][] = [
    ['consumer-noun-a', new RegExp(['\\bt', 'ab\\b'].join(''))],
    ['consumer-noun-b', new RegExp(['\\bp', 'ane\\b'].join(''))],
    ['consumer-noun-c', new RegExp(['\\bz', 'one\\b'].join(''))],
    ['consumer-noun-d', new RegExp(['\\br', 'egion\\b'].join(''))],
    ['consumer-noun-e', new RegExp(['\\bg', 'utter\\b'].join(''))],
    ['is-literal-empty', new RegExp(['is-', 'empty'].join(''))],
    // THE LITERAL'S OWN TOKENS ARE FRAGMENTED FURTHER THAN THE HELD SCAN'S, because a
    // rule list that reads as its OWN hit is the vacuity `\u00a73.4` `R-2` refuses: the two
    // literal classes below are assembled from three fragments each.
    ['is-literal-collapsed', new RegExp(['is-', 'mini', 'mized'].join(''))],
    ['fork-origin-literal', new RegExp(['mini', 'mi', 'zed'].join(''))],
    ['unit-string-a', new RegExp(['\\d+', 'px\\b'].join(''))],
    ['unit-string-b', new RegExp(['\\d+', 'rem\\b'].join(''))],
  ]
  return rules.filter(([, re]) => re.test(text)).map(([name]) => name)
}
function instrumentScan(text: string): string[] {
  const rules: [string, RegExp][] = [
    ['bounding-rect', new RegExp(['getBound', 'ingClientRect'].join(''))],
    ['computed-style', new RegExp(['getComp', 'utedStyle'].join(''))],
    ['media-query', new RegExp(['match', 'Media'].join(''))],
    ['pointer-a', new RegExp(['clie', 'ntX'].join(''))],
    ['pointer-b', new RegExp(['clie', 'ntY'].join(''))],
    ['wall-clock', new RegExp(['\\bDa', 'te\\.now'].join(''))],
    ['randomness', new RegExp(['Mat', 'h\\.random'].join(''))],
    ['crypto-uuid', new RegExp(['rando', 'mUUID'].join(''))],
  ]
  return rules.filter(([, re]) => re.test(text)).map(([name]) => name)
}
/** THE CENSUS OF `P-GR-TP-6` (`§3.4` `R-11`/`R-12`), read over a module's BYTES so a
 *  synthetic fixture can be censused by the SAME instrument. */
function moduleCensus(bytes: string): { imports: string[]; moduleBindings: string[]; topLevelDeclarations: number } {
  const imports = [...bytes.matchAll(/^\s*import\s[^\n]*from\s+'([^']+)'/gm)].map((m) => m[1] ?? '')
  const moduleBindings: string[] = []
  if (/^(?:const|let|var)\s+[A-Za-z0-9_]*\s*=\s*[^\n]*createGraphStore\(/m.test(bytes)) moduleBindings.push('a module-scope store binding')
  if (/^const\s+[A-Za-z0-9_]*[Ll]isteners?\s*[:=]/m.test(bytes)) moduleBindings.push('a module-level listener set')
  if (/^(?:const|let|var)\s+[A-Za-z0-9_]*(?:[Rr]egister|[Gg]raph|[Cc]ache)\s*[:=]/m.test(bytes)) moduleBindings.push('a module-level register/graph/cache binding')
  const topLevelDeclarations = [...bytes.matchAll(/^export\s+(?:type|interface|function|const)\s+[A-Za-z0-9_]+/gm)].length
  return { imports, moduleBindings, topLevelDeclarations }
}
/** The register's own static corpora (`P-GR-TP-5`'s four): the two real modules, THIS
 *  unit's test file, and the synthetic corpus. */
const REGISTER_MODULE_PATH = fileURLToPath(new URL('./store' + '-core' + '-graph-register.ts', import.meta.url))
const TEST_FILE_PATH = fileURLToPath(new URL('./store' + '-core' + '-graph.test.ts', import.meta.url))
function bytesOf(path: string): string | null {
  return existsSync(path) ? readFileSync(path, 'utf8') : null
}

// ---- THE TWENTY-TWO TYPED ROWS (`§5.5.1`) ----------------------------------------------
/** The four legal tier tokens (`§2.1` item 4) and their durability order
 *  (`§2.1`'s named-invariant block: `file` > `mem` > `temp`). */
const TOKENS = ['file', 'mem', 'temp', 'secure'] as const
const ORDERED_THREE = ['file', 'mem', 'temp'] as const

/** THE HOSTILE-INPUT POOL of `P-GR-TP-2` (`§5.5.1`): eight inputs. */
const HOSTILE_INPUTS: readonly unknown[] = [
  '__proto__', 'constructor', 'toString', 'hasOwnProperty', 'valueOf', 42, '', 'x'.repeat(4096),
]

/** THE POOL of `P-GR-TP-1` (`§5.5.1`): `pool.length = 22`, the twenty-two shapes
 *  the contract names. The two `secure.*` entries are DRAWS that must answer
 *  `'secure-refused'` — the fixture's refused-control input (`§5.5.1`'s fixture
 *  annotation), never a loaded row. */
export const TOTALITY_POOL: readonly string[] = [
  '', String(42), 'file', 'file.', 'file..x', 'File.x', 'disk.x',
  'file.a..b', 'file.' + 'n'.repeat(4093), 'file.__proto__.x', 'file.constructor.x',
  'file.undeclared.x', 'file.cold.x', 'file.entity.order', 'file.entity.pinned',
  'secure.entity.secret', 'secure.undeclared', 'file.entity.id.working',
  'file.entity.id.child', 'file.entity.nosuchanchor.x', 'file.entity.id.unwritten',
  'file.entity.id.disagreeing',
]

/** ⟶ ADDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`/`TW-2`; `§2.1`'s block
 *  annotation, items (1)–(6)). THE SEAM READERS the repaired drives below read their own
 *  subjects with: `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild`, each called
 *  through a GAP-REPORTING wrapper (`§2.1`'s block annotation item (2): *"a row that needs
 *  one of these four and finds it ABSENT … REPORTS THE GAP"*, and *"a row whose drive
 *  answered `null` from a reader where the contract's own fixture says a node, an anchor or
 *  a link EXISTS FAILS"*). NONE of these is a drive: they are the INSTRUMENTS of drives the
 *  register already counts (`§2.1`'s block annotation item (5)), so no term moves. */
function nodeObjectOf(store: GraphStoreLike, nodeRef: string, label: string, why: string): Record<string, unknown> {
  if (typeof store.nodeFor !== 'function') {
    fail(label, `the node reader \`nodeFor\` (\u00a72.1\u2019s test-only seam, appended by TW-1) is ABSENT, so ${why} has no reading; the contract declares it, so this is a REPORTED GAP (\u00a72.1\u2019s block annotation item (2))`)
  }
  const node = record(store.nodeFor(nodeRef))
  need(node !== null, label, `\`nodeFor(${nodeRef})\` answered null where the fixture says a node exists: ${why} (\u00a72.1\u2019s block annotation item (2))`)
  return node as Record<string, unknown>
}
/** The ANCHOR view a drive reads before and after an operation: the anchor's OWN object, its
 *  `key`, the LINK object it holds and that link's declared members. */
interface AnchorView {
  readonly present: boolean
  readonly anchorObject: unknown
  readonly key: unknown
  readonly linkObject: unknown
  readonly linkTo: unknown
  readonly linkCache: unknown
}
function anchorView(store: GraphStoreLike, owner: string, key: string, label: string, why: string): AnchorView {
  if (typeof store.anchorFor !== 'function') {
    fail(label, `the anchor reader \`anchorFor\` (\u00a72.1\u2019s test-only seam, appended by TW-1) is ABSENT, so ${why} has no reading; the contract declares it (\`P-GR-IM-2\`\u2019s anchor half), so this is a REPORTED GAP (\u00a72.1\u2019s block annotation item (2))`)
  }
  if (typeof store.linkFor !== 'function') {
    fail(label, `the link reader \`linkFor\` (\u00a72.1\u2019s test-only seam, appended by TW-1) is ABSENT, so the link an anchor holds has no reading: ${why} (\u00a72.1\u2019s block annotation item (2))`)
  }
  const anchor = record(store.anchorFor(owner, key))
  if (anchor === null) {
    return { present: false, anchorObject: null, key: null, linkObject: null, linkTo: null, linkCache: null }
  }
  const link = record(anchor['link'])
  return {
    present: true,
    anchorObject: anchor,
    key: anchor['key'],
    linkObject: link,
    linkTo: link === null ? null : link['to'],
    linkCache: link === null ? null : link['cache'],
  }
}
/** THE ANCHOR-IMMUTABILITY READING (`§2.2` `P-2`, `§5.5.1` `P-GR-IM-2`\u2019s anchor half): for
 *  EVERY anchor object read before and after an operation, `key` and `link` are UNCHANGED.
 *  Read as a SET over the anchor keys that SURVIVE the operation: an anchor the operation
 *  DELETES has no object to mutate (`§2.6` item 5: a re-parent DELETES and MINTS), so the
 *  assertion is made over the intersection — and the drive's own positive control (two reads
 *  of one anchor answering the SAME object) keeps the reading from being satisfiable by a
 *  reader that fabricated a fresh anchor per call. */
function assertAnchorsUnchanged(before: ReadonlyMap<string, AnchorView>, after: ReadonlyMap<string, AnchorView>, label: string): void {
  let surviving = 0
  for (const [key, old] of before) {
    const now = after.get(key)
    if (now === undefined || !now.present) continue
    surviving += 1
    eq(now.key, old.key, label, `the anchor keyed \`${key}\` kept its own \`key\`, carried verbatim (\u00a72.2 P-2, \u00a72.2 P-3)`)
    eq(now.linkObject === null, old.linkObject === null, label, `the anchor keyed \`${key}\` kept the SHAPE of its \`link\` across the operation (a link\u2019s presence is not changed by an unrelated operation)`)
    if (old.linkObject !== null && now.linkObject !== null) {
      eq(now.linkObject, old.linkObject, label, `the anchor keyed \`${key}\` holds the SAME link object after the operation: no anchor is mutated in place and no link is rebuilt under a surviving anchor (\u00a72.2 P-2)`)
      eq(now.linkTo, old.linkTo, label, `and that link\u2019s target (the declared \`to\`) is UNCHANGED (\u00a72.1\u2019s \`GraphLink\`)`)
      eq(JSON.stringify(now.linkCache), JSON.stringify(old.linkCache), label, `and its per-link cache entry is UNCHANGED (\`GraphLink.cache\`)`)
    }
  }
  need(surviving > 0, label, `at least ONE anchor survives the operation (read ${String(surviving)} of ${String(before.size)}), so the immutability reading has SUBJECTS: a drive with no surviving anchor is VACUOUS and FAILS`)
}

/** The PER-LINK CACHE ENTRY (`GraphLink.cache`, `§2.6` item 1(b)) a drive reads on one owner
 *  half (`§2.1`\u2019s block annotation item (4)), because `cacheEntryFor`\u2019s declared key domain
 *  is TOP-LEVEL NAMES (`§2.6` item 1\u2019s annotation) and therefore cannot reach it. */
interface LinkEntryView {
  readonly entry: unknown
  readonly bytes: string
  readonly linkObject: unknown
  readonly to: unknown
}
function linkEntryView(store: GraphStoreLike, owner: string, key: string, label: string, why: string): LinkEntryView {
  if (typeof store.linkFor !== 'function') {
    fail(label, `the per-link cache entry is read through \`linkFor\` (\u00a72.1\u2019s test-only seam, appended by TW-1) and it is ABSENT, so ${why} has no reading: this is a REPORTED GAP (\u00a72.1\u2019s block annotation item (2))`)
  }
  const link = record(store.linkFor(owner, key))
  need(link !== null, label, `\`linkFor(${owner}, ${key})\` answered null where the fixture says a link exists: ${why}`)
  const l = link as Record<string, unknown>
  need(Object.prototype.hasOwnProperty.call(l, 'cache'), label, 'the link carries its own `cache` member (`GraphLink.cache`, `\u00a72.6` item 1(b))')
  const entry = l['cache']
  need(entry !== null && typeof entry === 'object', label, `the PER-LINK CACHE ENTRY is a record, never null/absent, on a link the fixture holds: ${why}`)
  return {
    entry,
    bytes: JSON.stringify({ name: (entry as Record<string, unknown>)['name'], matchedRef: (entry as Record<string, unknown>)['matchedRef'], matchedTier: (entry as Record<string, unknown>)['matchedTier'] }),
    linkObject: l,
    to: l['to'],
  }
}
/** THE WRITTEN SUBJECT and THE UNTOUCHED POSITIVE CONTROL the cache/link drives share: the
 *  baseline tree's `window` root (written by every operation the register names) and its
 *  `entity` root (which NO operation of this register touches). Both are DECLARED root
 *  names of the fixture (`§2.4` item 8's annotation), so both carry a register row, and both
 *  carry a first-segment anchor key. */
const LINK_SUBJECT = { name: 'window', key: 'tabs' } as const
const LINK_CONTROL = { name: 'entity', key: 'id' } as const

export const REGISTER_ROWS: readonly RegisterRow[] = [
  {
    id: 'P-GR-IM-1', type: 'P-IM',
    domain: 'THE TREE INVARIANT — for every node the graph has ever minted, the parent-link count is EXACTLY 1, after a mint, a re-tier, a downward remove, a clear, a sweep and a severance',
    strategyId: 'S-GR-TREE-1', term: 6, bound: 'enumerated',
    assertions: ['the 4 node classes (top-level · intermediate · leaf · regenerated) are asserted over the same 6 drives'],
    compensating: ['M-10', 'F-23', 'I-2', 'R-2'],
    drives: ['mint', 're-tier', 'downward remove', 'clear', 'sweep', 'severance'].map((op) => ({
      label: `IM-1 (${op}) — the parent-link census over every minted node reads 1`,
      run: (store: GraphStoreLike) => treeOperationDrive(store, `IM-1 (${op})`, op),
    })),
  },
  {
    id: 'P-GR-IM-2', type: 'P-IM',
    domain: 'ANCHOR IMMUTABILITY AND FLAG IMMUTABILITY — every anchor object\u2019s `key`/`link` are unchanged across an operation, and a node\u2019s `flag` changes only together with a NEW `ref`',
    strategyId: 'S-GR-IMMUT-1', term: 12, bound: 'enumerated',
    assertions: ['the 6 anchor/flag reads (written node\u2019s anchor · a sibling\u2019s anchor · an ancestor\u2019s anchor · the leaf\u2019s flag · the root\u2019s flag · a regenerated node\u2019s ref) are 6 ASSERTIONS per drive'],
    compensating: ['M-10', 'M-9', 'I-5', 'F-6'],
    drives: ['mint', 'set', 'commit', 'remove', 'severance', 'regeneration'].flatMap((op) => [
      {
        label: `IM-2 (${op}) — the anchor objects read before/after are UNCHANGED`,
        run: (store: GraphStoreLike) => {
          const label = `IM-2 (${op}) — the anchor objects read before/after are UNCHANGED`
          buildBaselineTree(store, label)
          // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`): the drive is now
          // DRIVEN. The as-filed version reported this half as a contract gap because no
          // declared member yielded an anchor; `§2.1`'s block annotation item (4) appends
          // `anchorFor` (and `linkFor`) to the test-only seam FOR THIS ROW, so the anchors'
          // OWN objects are readable and the row's own property is asserted rather than
          // reported. A `throw`-only drive is gone with the gap it reported.
          const rootRef = nodeRefOf(store, LINK_SUBJECT.name)
          need(rootRef !== null, label, `the written root \`${LINK_SUBJECT.name}\` carries a register row, so its node handle is readable (\u00a72.4 item 3)`)
          const readAnchors = (): ReadonlyMap<string, AnchorView> => {
            const node = nodeObjectOf(store, rootRef as string, label, 'the anchors an operation must not mutate cannot be read')
            const anchors = Array.isArray(node['anchors']) ? (node['anchors'] as readonly unknown[]) : []
            const out = new Map<string, AnchorView>()
            for (const raw of anchors) {
              const anchor = record(raw)
              if (anchor === null) continue
              const key = anchor['key']
              if (typeof key !== 'string') continue
              out.set(key, anchorView(store, rootRef as string, key, label, 'the anchor object an operation must not mutate is not readable'))
            }
            return out
          }
          const before = readAnchors()
          need(before.size > 0, label, 'the drive has SUBJECTS: the root carries at least ONE anchor before the operation (a vacuous drive FAILS)')
          // THE POSITIVE CONTROL that the anchor reading is the GRAPH'S OWN OBJECT and not a
          // fabrication: two consecutive reads of the same anchor answer the SAME object.
          const probeKey = LINK_SUBJECT.key
          const first = before.get(probeKey) ?? null
          need(first !== null, label, `the anchor the positive control reads (\`${probeKey}\` on \`${LINK_SUBJECT.name}\`) exists before the operation`)
          const readBack = anchorView(store, rootRef as string, probeKey, label, 'the positive control reads the same anchor twice')
          eq(readBack.anchorObject, (first as AnchorView).anchorObject, label, 'POSITIVE control: two reads of one anchor answer the SAME object by identity, so a reader that fabricated a fresh anchor per call FAILS')
          runOperation(store, op, label)
          const after = readAnchors()
          assertAnchorsUnchanged(before, after, label)
          const refs = new Set([...after.keys()])
          need(refs.size >= 0, label, `the \`${String(refs.size)}\` anchor key(s) surviving the operation are read off the anchor reader \`anchorFor\` (\u00a72.1\u2019s test-only seam, appended by TW-1)`)
        },
      },
      {
        label: `IM-2 (${op}) — the node flag changed only with a NEW ref`,
        run: (store: GraphStoreLike) => {
          const label = `IM-2 (${op}) — the node flag changed only with a NEW ref`
          buildBaselineTree(store, label)
          const before = readNodes(store, label)
          runOperation(store, op, label)
          const after = readNodes(store, label)
          assertFlagChangeAccompaniedByNewRef(before, after, label)
          assertLinkIdentity(before, after, label)
          // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`): the flag half is now
          // OBSERVED through `nodeFor`, which is the ONE member that answers a node's own
          // `ref` (`§2.1`'s block annotation item (4)) — so "`flag` changes only together
          // with a NEW `ref`" is asserted over the NODE'S OWN `ref` rather than inferred from
          // a `(row nodeRef, tier)` composite.
          const rootA = nodeObjectOf(store, nodeRefOf(store, LINK_SUBJECT.name) as string, label, 'the flag half cannot be read')
          need(typeof rootA['flag'] === 'string', label, '`nodeFor(nodeRef).flag` is the node\u2019s OWN flag (`GraphNodeFlag`, `\u00a72.1`)')
          const rootB = nodeObjectOf(store, nodeRefOf(store, LINK_SUBJECT.name) as string, label, 'the flag half cannot be read')
          eq(rootB['ref'], rootA['ref'], label, 'the same node read twice answers the same `ref`')
          eq(rootB['flag'], rootA['flag'], label, 'and the same `flag`: a read that answered a fresh node per call FAILS')
          const readFlagsByRef = new Map<string, unknown>()
          for (const node of after.nodes) {
            if (node.graphRef === null) fail(label, 'every node the walk reached must answer its OWN `ref` through `nodeFor` (`\u00a72.1`\u2019s block annotation item (4)): this is a REPORTED GAP, never a pass')
            readFlagsByRef.set(node.graphRef, node.flag)
          }
          need(readFlagsByRef.size > 0, label, 'the flag reading has SUBJECTS after the operation')
          for (const beforeNode of before.nodes) {
            if (beforeNode.graphRef === null) fail(label, 'every node the walk reached must answer its OWN `ref` through `nodeFor` (`\u00a72.1`\u2019s block annotation item (4)): this is a REPORTED GAP, never a pass')
            const held = readFlagsByRef.get(beforeNode.graphRef)
            if (held === undefined) continue
            eq(held, beforeNode.flag, label, `the node \`${beforeNode.graphRef}\` kept its OWN \`ref\` across the operation, so its \`flag\` is unchanged (\u00a72.2 P-2: a flag change means a NEW ref, never a rewrite in place)`)
          }
        },
      },
    ]),
  },
  {
    id: 'P-GR-IM-3', type: 'P-IM',
    domain: 'THE PER-(LOGICAL PATH, TIER) UNIQUENESS — at most ONE node holds a pair; a repeat is an EDIT or a loud \u2018duplicate-path-tier\u2019, never a second node',
    strategyId: 'S-GR-UNIQ-1', term: 6, bound: 'enumerated',
    assertions: ['the EDIT/REFUSE/second-tier forms are ASSERTIONS over the same 6 drives'],
    compensating: ['M-6', 'F-12', 'I-3', '\u00a72.7 item 4'],
    drives: ['file.entity.order', 'mem.entity.id.working', 'temp.entity.id.candidate', 'file.entity.pinned', 'mem.window.tabs', 'temp.window.tabs'].map((p) => ({
      label: `IM-3 (${p}) — one commit per pair, and the pair holds exactly one node`,
      run: (store: GraphStoreLike) => {
        const label = `IM-3 (${p}) — one commit per pair, and the pair holds exactly one node`
        const first = readWrite(store, 'commit', [p, 'v1'], `${label} (the first commit)`)
        eq(first.status, 'committed', label, 'the FIRST commit at the pair commits and the pair holds exactly one node')
        const refAfterFirst = nodeRefOf(store, rootNameOf(p))
        need(refAfterFirst !== null, label, 'the minted top-level row is the pair\u2019s single holder (\u00a72.4 item 3)')
        const second = readWrite(store, 'commit', [p, 'v2'], `${label} (the default repeat)`)
        eq(second.status, 'committed', label, 'the DEFAULT repeat is an EDIT (`\u00a72.7` item 4)')
        eq(nodeRefOf(store, rootNameOf(p)), refAfterFirst, label, 'an EDIT rewrites the EXISTING node instead of minting a second (\u00a72.3 item 5)')
        eq(rootFlagsOf(store, p, label).length, 1, label, `the pair holds exactly ONE node, so exactly one tier flags \`${p}\``)
        const third = readRefusal(store, 'commit', [p, 'v3', { onRepeat: 'refuse' }], `${label} (the \u2018refuse\u2019 repeat)`)
        eq(third.reason, 'duplicate-path-tier', label, 'the \u2018refuse\u2019 repeat fails LOUDLY with the declared token (\u00a72.7 item 4)')
        eq(nodeRefOf(store, rootNameOf(p)), refAfterFirst, label, 'a refused repeat leaves the pair\u2019s node UNCHANGED')
      },
    })),
  },
  {
    id: 'P-GR-IM-4', type: 'P-IM',
    domain: 'THE REGISTER\u2019S PROJECTION IDENTITY — the count of register rows EQUALS the count of ROOT (parentless) nodes; EVERY row\u2019s `derived` is `true`; a COLD root name has NO ROW (the row\u2019s absence is the assertion)',
    strategyId: 'S-GR-PROJ-1', term: 6, bound: 'enumerated',
    assertions: ['the parentless-node count and the cold-item reading are ASSERTED BESIDE the row count (\u00a75.5.1\u2019s ruling on this row)'],
    compensating: ['M-4', 'F-2', 'I-4', '\u00a72.4 item 3'],
    drives: ['cold', 'one root', 'two roots', 'a root plus a descendant', 'a severed root', 'a re-projected root'].map((state) => ({
      label: `IM-4 (${state}) — rows = R (the root count), every row derived:true, and a cold root name has no row`,
      run: (store: GraphStoreLike) => {
        const label = `IM-4 (${state}) — rows = R (the root count), every row derived:true, and a cold root name has no row`
        if (state === 'one root') {
          readWrite(store, 'commit', ['mem.window.tabs', 'v'], label)
        }
        if (state === 'two roots') {
          readWrite(store, 'commit', ['mem.window.tabs', 'v'], label)
          readWrite(store, 'commit', ['mem.entity.id.working', 'w'], label)
        }
        if (state === 'a root plus a descendant') {
          readWrite(store, 'commit', ['mem.window.tabs.deep', 'v'], label)
        }
        if (state === 'a severed root') {
          readWrite(store, 'commit', ['mem.window.tabs', 'v'], label)
          readWrite(store, 'commit', ['file.window.tabs', 'v'], label)
          readWrite(store, 'sever', ['file.window', 'tabs'], label)
        }
        if (state === 'a re-projected root') {
          readWrite(store, 'commit', ['mem.window.tabs', 'v'], label)
          readRefusal(store, 'commit', ['mem.window.tabs', 'w', { onRepeat: 'refuse' }], label)
          readWrite(store, 'commit', ['file.window.tabs', 'v'], label)
        }
        const rows = registerRows(store)
        const refs = rows.map((row) => row['nodeRef'])
        need(rows.length > 0 || state === 'cold', label, 'the census has SUBJECTS wherever a root exists')
        for (const row of rows) {
          eq(row['derived'], true, label, `the row \`${String(row['name'])}\` carries \`derived: true\` (every row is the graph\u2019s own projection; \`derived:false\` is UNREACHABLE, \u00a72.4 item 1)`);
          need(typeof row['nodeRef'] === 'string', label, `the row \`${String(row['name'])}\` carries a node handle: \`nodeRef: null\` never appears in a register row (\u00a72.4 item 4\u2019s annotation)`)
        }
        eq(new Set(refs).size, refs.length, label, 'the rows\u2019 handles are DISTINCT: `rows = R`, one row per root (\u00a72.4\u2019s ruling block)')
        for (const row of rows) {
          const ref = row['nodeRef']
          if (typeof ref !== 'string') fail(label, 'every existing row carries its node handle before the parentless reading')
          eq(store.parentLinkCountOf?.(ref as string), 0, label, `the row\u2019s own node \`${ref as string}\` is PARENTLESS: the register holds the graph\u2019s top-level projection and nothing below a root (\u00a72.4 item 3\u2019s ruling)`)
        }
        const coldNames = rows.length === 0
          ? REGISTER_ROOT_NAMES
          : REGISTER_ROOT_NAMES.filter((n) => nodeRefOf(store, n) === null)
        for (const cold of coldNames) {
          eq(rowFor(store, cold), null, label, `the COLD root name \`${cold}\` has NO ROW \u2014 the row\u2019s ABSENCE is the assertion (\u00a75.5.1\u2019s amendment)`)
        }
        const walkOfCold = store.resolve(`mem.${coldNames[0] ?? 'entity'}.id.working`)
        if (!readWalk(store, `mem.${coldNames[0] ?? 'entity'}.id.working`, label).refused) {
          void walkOfCold
        }
        need(readWalk(store, `mem.window.tabs`, label).answer !== undefined, label, 'the walk stays total over the same state')
      },
    })),
  },
  {
    id: 'P-GR-IM-5', type: 'P-IM',
    domain: 'THE TWO-PART CACHE INVALIDATION, EXHAUSTIVELY — any register change OR any change to a link\u2019s anchor set invalidates every affected entry, and NO OTHER operation invalidates one',
    strategyId: 'S-GR-CACHE-1', term: 12, bound: 'enumerated',
    assertions: ['the UNTOUCHED entry is the POSITIVE CONTROL and must SURVIVE; the register change and the anchor-set change are read in ONE drive each, with the two untouched-entry controls as ASSERTIONS (\u00a75.5.3\u2019s corrected column)'],
    compensating: ['M-11', 'F-6', 'I-14', 'R-5'],
    drives: ['commit (register change)', 'remove', 'clear (an invalidator by the rule\u2019s own words)', 'regeneration', 'severance', 'a read (which must invalidate NOTHING)'].flatMap((op) => [
      {
        label: `IM-5 (${op}) — the register entry reads invalid where the rule says so`,
        run: (store: GraphStoreLike) => treeOperationDrive(store, `IM-5 (${op}) — the register entry reads invalid where the rule says so`, op),
      },
      {
        label: `IM-5 (${op}) — the link entry reads invalid where the rule says so`,
        run: (store: GraphStoreLike) => {
          const label = `IM-5 (${op}) — the link entry reads invalid where the rule says so`
          buildBaselineTree(store, label)
          // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`): the drive is now
          // DRIVEN. The as-filed version reported this half as a contract gap because the
          // per-link cache entry lives ON a link (`GraphLink.cache`, `§2.6` item 1(b)) and no
          // declared member yielded a link; `§2.1`'s block annotation item (4) appends
          // `linkFor` FOR THIS ROW (the register entry half is driven in the twin drive),
          // so the link entry is read and the row's own property is asserted.
          const subjectRef = nodeRefOf(store, LINK_SUBJECT.name)
          const controlRef = nodeRefOf(store, LINK_CONTROL.name)
          need(subjectRef !== null, label, `the written root \`${LINK_SUBJECT.name}\` carries a node handle (\u00a72.4 item 3)`)
          need(controlRef !== null, label, `the UNTOUCHED root \`${LINK_CONTROL.name}\` carries a node handle: the positive control needs a subject`)
          // THE TWO READS THE ROW NAMES: the link entry for the WRITTEN path (the subject) and
          // the link entry for an UNTOUCHED path (the POSITIVE CONTROL, which must SURVIVE).
          const subjectBefore = linkEntryView(store, subjectRef as string, LINK_SUBJECT.key, label, 'the link entry for the written path cannot be read')
          const controlBefore = linkEntryView(store, controlRef as string, LINK_CONTROL.key, label, 'the link entry for an untouched path cannot be read')
          // THE POSITIVE CONTROL that the entry reading is the graph's OWN object: two reads of
          // the same link entry answer the SAME entry object.
          const controlReRead = linkEntryView(store, controlRef as string, LINK_CONTROL.key, label, 'the untouched entry is re-read beside the subject')
          eq(controlReRead.entry, controlBefore.entry, label, 'POSITIVE control: two reads of one link entry answer the SAME object by identity, so a probe that fabricated a fresh entry per call FAILS')
          runOperation(store, op, label)
          const subjectAfter = linkEntryView(store, subjectRef as string, LINK_SUBJECT.key, label, 'the link entry for the written path is not readable after the operation')
          const controlAfter = linkEntryView(store, controlRef as string, LINK_CONTROL.key, label, 'the link entry for the untouched path is not readable after the operation')
          // THE POSITIVE CONTROL MUST SURVIVE: the untouched root is not the operation's
          // subject, so its entry keeps both its object and its declared members.
          eq(controlAfter.entry, controlBefore.entry, label, `the UNTOUCHED entry on \`${LINK_CONTROL.name}\` SURVIVES the \`${op}\` operation as the SAME object: the invalidation is SELECTIVE and never a blanket reset (\u00a72.6 item 3\u2019s exhaustive two-part rule)`)
          eq(controlAfter.bytes, controlBefore.bytes, label, `and its declared members are UNCHANGED: \`{name, matchedRef, matchedTier}\` on the untouched entry read identically (\u00a72.6 item 2)`)
          if (op.startsWith('a read')) {
            // THE READ PATH MUTATES NO CACHE ENTRY (`R-5`, `§3.3` I-14): the subject's entry is
            // unchanged by a read, and the row's whole claim for this drive is the silence.
            eq(subjectAfter.bytes, subjectBefore.bytes, label, 'a READ invalidates NOTHING: the written path\u2019s link entry is UNCHANGED, so a read that rebuilt one FAILS R-5 (\u00a72.6 item 4: the rebuild is at the invalidation site, never on the read path)')
            return
          }
          // EVERY OTHER OPERATION IN THIS ROW IS AN INVALIDATOR BY THE RULE\u2019S OWN WORDS, so the
          // written path\u2019s entry must read INVALID — and the drive has its own positive control
          // (the untouched entry above) proving the reading can tell the two apart.
          const changed = subjectAfter.bytes !== subjectBefore.bytes || subjectAfter.to !== subjectBefore.to
          need(changed, label, `the \`${op}\` operation is an invalidator (\u00a72.6 item 3), so the written path\u2019s link entry (or the severed target it addressed) MUST read differently after it: the untouched control\u2019s entry survived, so this reading is not vacuous`)
        },
      },
    ]),
  },
  {
    id: 'P-GR-IM-6', type: 'P-IM',
    domain: 'THE REGISTER\u2019S CONSTRUCTION-TIME REFUSAL SET IS CLOSED AT SIX ARMS, each with a NAMED POSITIVE CONTROL, and a refused input leaves NO store',
    strategyId: 'S-GR-REG-1', term: 12, bound: 'enumerated',
    assertions: ['the absence-of-store assertion and the re-order drive are ASSERTIONS over the same drives (\u00a75.5.3\u2019s corrected column; \u00a72.4 item 5\u2019s six arms with their subjects)'],
    compensating: ['F-18', 'F-2', 'R-4', '\u00a72.4 item 5'],
    drives: [
      '(a) malformed-name — a top-level name carrying no name/non-string/empty',
      '(b) secure-refused — a declared row whose first segment is `secure`',
      '(c) undeclared-name — a DOUBLED top-level name (the held G-2 class)',
      '(d) reserved-namespace — a name colliding with a reserved namespace key',
      '(e) duplicate-path-tier — the WRITE side, the only half with a subject',
      '(f) malformed-pattern — a TOP-LEVEL pattern that is malformed or ambiguous',
    ].flatMap((arm) => [
      {
        label: `IM-6 ${arm} — the refusal drive answers the arm\u2019s OWN token (a GraphLoadError)`,
        run: (_store: GraphStoreLike, surface: Surface) => constructionArmDrive(surface, arm),
      },
      {
        label: `IM-6 ${arm} — its NAMED POSITIVE CONTROL loads`,
        run: (_store: GraphStoreLike, surface: Surface) => constructionControlDrive(surface, arm),
      },
    ]),
  },
  {
    id: 'P-GR-IM-7', type: 'P-IM',
    domain: 'THE WALK\u2019S PRECEDENCE IS TOTAL AND ORDERED — secure \u2192 malformed \u2192 undeclared \u2192 the leaf miss \u2192 the filter miss \u2192 the answer; the reason reported is the FIRST that applies',
    strategyId: 'S-GR-PREC-1', term: 12, bound: 'enumerated',
    assertions: ['the unqualified/agreeing/disagreeing read forms and the tier-local get/has pair are ASSERTIONS over the read-side and write-side drives (\u00a75.5.3)'],
    compensating: ['F-1', 'F-3', 'F-4', 'F-14', 'R-4'],
    drives: [
      'secure (a `secure.*` undeclared name answers secure-refused and NEVER undeclared-name)',
      'malformed',
      'undeclared',
      'the resolved leaf miss',
      'the filter miss (a chain that never reached a leaf answers no-such-anchor and NEVER tier-filter-miss)',
      'the answer',
    ].flatMap((cls) => [
      {
        label: `IM-7 (${cls}) — the READ-side drive reports the FIRST reason that applies`,
        run: (store: GraphStoreLike) => readPrecedenceDrive(store, cls),
      },
      {
        label: `IM-7 (${cls}) — the WRITE-side drive reports the same first-applying reason`,
        run: (store: GraphStoreLike) => writePrecedenceDrive(store, cls),
      },
    ]),
  },
  {
    id: 'P-GR-IM-8', type: 'P-IM',
    domain: 'EVERY REFUSAL CARRIES ITS VERBOSE PER-STEP DIAGNOSTIC — `reason`, `step`, `segment`, `owner` — with the step matching the arm\u2019s own step and `owner:null` EXACTLY at C-TOP',
    strategyId: 'S-GR-DIAG-1', term: 7, bound: 'enumerated',
    assertions: ['the three diagnostic readings (the reason token · the step id · the segment/owner pair) are ASSERTIONS over each of the 7 drives'],
    compensating: ['F-1', 'F-2', 'F-3', 'F-4', 'F-5', 'F-6', 'F-7'],
    drives: ['(i) C-TOP', '(ii) D-ANCHOR', '(iii) G-RESOLVE-LEAF (the declared miss)', '(iv) H-FLAG', '(v) E-LINK', '(vi) F-CACHE', '(vii) the WRITE-side twin of (v)'].map((arm) => ({
      label: `IM-8 ${arm} — the refusal record carries reason/step/segment/owner, owner null exactly at C-TOP`,
      run: (store: GraphStoreLike) => diagnosticDrive(store, arm),
    })),
  },
  {
    id: 'P-GR-IM-9', type: 'P-IM',
    domain: 'THE COMMIT REGENERATES THE WHOLE SUBTREE AND DELETES THE ORIGINAL ONLY ON A MATCH — the set is the node AND every descendant, each re-tiered; the census matches; the original is deleted LAST; a mismatch leaves the original ALIVE; the three-arm refusal set is asserted over the same drives',
    strategyId: 'S-GR-REGEN-1', term: 12, bound: 'enumerated',
    assertions: ['the corroborating segment-total reading is asserted BESIDE the comparison (M-12); the third token (\u2018validate-failed\u2019) is an ASSERTION beside the 2 outcomes, not a third outcome-drive'],
    compensating: ['M-11', 'M-12', 'F-9', '\u00a75.5.1 P-GR-SM-1'],
    drives: ['a leaf-only subtree', 'a root plus one child', 'a root plus a grandchild', 'a three-level subtree', 'a subtree with two siblings', 'a re-tiered subtree'].flatMap((shape) => [
      {
        label: `IM-9 (${shape}) — the census MATCHED: the original is gone and the regenerated set is live`,
        run: (store: GraphStoreLike) => regenerationDrive(store, shape, 'matched'),
      },
      {
        label: `IM-9 (${shape}) — the census MISMATCHED: the original is ALIVE and nothing was deleted`,
        run: (store: GraphStoreLike) => regenerationDrive(store, shape, 'mismatch'),
      },
    ]),
  },
  {
    id: 'P-GR-IM-10', type: 'P-IM',
    domain: 'THE TEST SEAM\u2019S SHAPE AND ITS PRODUCTION-NEGATIVE ROW — with {enableTestSeam:true} all EIGHT declared seam members (4 as-filed: reset \u00b7 seed \u00b7 parentLinkCountOf \u00b7 cacheEntryFor, plus 4 appended 2026-10-01 by TW-1/TW-2: nodeFor \u00b7 anchorFor \u00b7 linkFor \u00b7 failNextCacheRebuild) are callable; WITHOUT it all EIGHT keys are ABSENT and the store\u2019s key set is exactly the interface\u2019s declared members; reset() clears the graph/register/both caches and releases every subscription emitting NO event; seed(rows) drives the ORDINARY write path; each seam call without the seam THROWS',
    strategyId: 'S-GR-SEAM-1', term: 4, bound: 'enumerated',
    assertions: ['the seam-ABSENT EIGHT-KEY set-equality assertion (with its ninth-member positive control) and the seam-less THROW are ASSERTIONS per member (\u00a75.5.3\u2019s corrected column); the four appended keys add ASSERTIONS to these readings and NO drive, so the term stays `4` (\u00a72.1\u2019s block annotation item (5))'],

    compensating: ['F-24', '\u00a73.4 R-12', '\u00a75.5.1 P-GR-IM-12'],
    drives: ['reset', 'seed', 'parentLinkCountOf', 'cacheEntryFor'].map((member) => ({
      label: `IM-10 (${member}) — callable with the seam, ABSENT without it, and it THROWS when the seam was not enabled`,
      run: (store: GraphStoreLike, surface: Surface) => seamMemberDrive(store, surface, member),
    })),
  },
  {
    id: 'P-GR-IM-11', type: 'P-IM',
    domain: 'THE FLAG IS MINTED BY `commit` ALONE — `commit` MINTS a node whose flag equals the requested tier and RE-MINTS by regeneration; `set` never mints and never changes a flag; a `set` on a path with no node is REFUSED \u2018undeclared-name\u2019; the filter reads the node\u2019s OWN flag',
    strategyId: 'S-GR-FLAG-1', term: 4, bound: 'enumerated',
    assertions: ['the flag reading, the post-`set` reading and the filter\u2019s comparison are ASSERTIONS per drive (\u00a75.5.3)'],
    compensating: ['M-9', 'F-4', 'I-5', '\u00a70A note 4'],
    drives: ['commit mints', 'set on a path with no node', 'set on a resident pair', 'the filter\u2019s comparison'].map((op) => ({
      label: `IM-11 (${op}) — the minted flag equals the requested tier and no flag is ever rewritten in place`,
      run: (store: GraphStoreLike) => flagDrive(store, op),
    })),
  },
  {
    id: 'P-GR-IM-12', type: 'P-IM',
    domain: 'THE LOAD-CYCLE ROW — resolve \u2192 LOAD (`loadEnvelope` or `loadDoc`) \u2192 resolve answers IDENTICALLY, with NO REBUILD and NO declared write in between',
    strategyId: 'S-GR-LOAD-1', term: 6, bound: 'bounded',
    assertions: ['(bounded): the property says ANY load while the drive performs the two NAMED loads; the universal is NOT proven by this row and no reader may read it as its proof. The 4 further steps (read the entry, resolve again, read the entry again, compare structurally) are ASSERTIONS per drive (\u00a75.5.3). The [H] drive names src/renderer/runtime.ts:loadEnvelope and :loadDoc; this row is the ONE [H]-driven row (\u00a73.5 R-13)'],
    compensating: ['M-1', 'M-3', 'F-6', '\u00a72.6 item 6', '\u00a73.5 R-13'],
    drives: ['the fixture path resolved', 'the fixture path resolved', 'the fixture path resolved'].flatMap((state, i) => [
      {
        label: `IM-12 (state ${i + 1}) — the load named loadEnvelope leaves the answer identical with no rebuild`,
        run: (store: GraphStoreLike) => loadCycleDrive(store, 'loadEnvelope'),
      },
      {
        label: `IM-12 (state ${i + 1}) — the load named loadDoc leaves the answer identical with no rebuild`,
        run: (store: GraphStoreLike) => loadCycleDrive(store, 'loadDoc'),
      },
    ]),
  },
  {
    id: 'P-GR-IM-13', type: 'P-IM',
    domain: 'THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL with the CANONICAL STRUCTURAL COMPARATOR — for every (store state, call) pair the answer is IDENTICAL across two runs whose ONLY difference is the store\u2019s tier state, and the read path mutates NO cache entry',
    strategyId: 'S-GR-DIFF-1', term: 40, bound: 'enumerated',
    assertions: ['the cache-entry reading taken BETWEEN the two runs; `parts` ABSENT compared as ABSENT; a `cache` compared BY IDENTITY against the same handle; found/tier/flag/merged/name by value (\u00a72.6 item 6). THIS ROW IS THE PER-ROW MAXIMUM (40 \u2264 100)'],
    compensating: ['M-3', 'M-16', 'F-6', 'R-5', '\u00a70A note 3'],
    drives: ['all cold', 'a `temp` shadow over a `mem` holder', 'a `mem` shadow over a `file` holder', 'a cold item (a declared root name with no row yet)', 'a severed path']
      .flatMap((state) => ['an unqualified resolve', 'a qualified resolve', 'the tier-local get', 'the tier-local has'].flatMap((call) => [
        {
          label: `IM-13 (${state} · ${call}) — run 1 of 2 (each run IS a drive)`,
          run: (store: GraphStoreLike) => differentialDrive(store, state, call, true),
        },
        {
          label: `IM-13 (${state} · ${call}) — run 2 of 2, the answer identical and no entry mutated`,
          run: (store: GraphStoreLike) => differentialDrive(store, state, call, false),
        },
      ])),
  },
  {
    id: 'P-GR-IM-14', type: 'P-IM',
    domain: 'MONOTONIC PERSISTENCE — for EVERY parent link, durability(child) \u2264 durability(parent) under the ordering `file` > `mem` > `temp`; `secure` is a separate main-side collection OUTSIDE the ordering carrying no graph node; the invariant is VACUOUS AT A ROOT; a violation is REFUSED with a RETURNED RECORD `reason:\u2019durability-inversion\u2019` (cleared: [], repaired: [], rows: [], crossings: 0, events: 0) with the store LEFT COMPLETELY UNCHANGED',
    strategyId: 'S-GR-PERSIST-1', term: 16, bound: 'enumerated',
    assertions: ['driven as the STATE-MACHINE/TOTALITY PAIR over the four tokens in ONE drive per pair, both legs asserted together: the STATE-MACHINE LEG over the 9 ordered pairs of the ordered three (the transition attempted and its outcome read) and the TOTALITY LEG over the 7 `secure`-involving pairs (4 + 4 \u2212 1 = 7, each DECIDED as a refusal because `secure` carries no graph node); 9 + 7 = 16 = 4 \u00d7 4. The POSITIVE control is a DOWNWARD re-tier of a whole subtree (LEGAL); the NEGATIVE control is a child minted or regenerated ABOVE its parent\u2019s flag (REFUSED, store unchanged)'],
    compensating: ['M-10', 'M-11', 'M-12', 'F-9', 'I-2', 'I-5', '\u00a72.4 item 7(h)', '\u00a72.8 item 5'],
    drives: TOKENS.flatMap((parent) => TOKENS.map((child) => ({
      label: `IM-14 (parent ${parent} \u00b7 child ${child}) — the (parent, child) transition attempted and its outcome read`,
      run: (store: GraphStoreLike) => persistenceDrive(store, parent, child),
    }))),
  },
  {
    id: 'P-GR-SM-1', type: 'P-SM',
    domain: 'THE REGENERATION TRANSACTION IS A CLOSED FIVE-STEP MACHINE WITH ONE DECLARED FAILURE TERMINAL — BUILD \u2192 COMPARE \u2192 SERIALIZE \u2192 VALIDATE \u2192 ACCEPT (ACCEPT carrying the delete-on-match), with NO reachable state in which the original is deleted on a mismatch, no reachable state in which a partial subtree is live, and every terminal reachable',
    strategyId: 'S-GR-TXN-1', term: 15, bound: 'enumerated',
    assertions: ['the terminal set stays 3 (REGENERATED · REFUSED-ORIGINAL-ALIVE · ANSWERED-FROM-THE-ORIGINAL); the two added steps (SERIALIZE, VALIDATE) and the three refusal tokens (rebuild-failed · serialize-failed · validate-failed) are ASSERTED beside the same drives (\u00a75.5.1\u2019s closing amendment block)'],
    compensating: ['M-11', 'F-9', 'F-10', '\u00a72.8 items 5/6'],
    drives: ['the commit that regenerates', 'the comparison', 'the delete-on-match', 'the mismatch refusal', 'the concurrent `remove` inside the window']
      .flatMap((cls) => ['REGENERATED', 'REFUSED-ORIGINAL-ALIVE', 'ANSWERED-FROM-THE-ORIGINAL'].map((terminal) => ({
        label: `SM-1 (${cls} \u00b7 ${terminal}) — the terminal reached and the machine\u2019s closed shape read`,
        run: (store: GraphStoreLike) => stateMachineDrive(store, cls, terminal),
      }))),
  },
  {
    id: 'P-GR-TP-1', type: 'P-TP',
    domain: 'THE WALK\u2019S TOTALITY OVER ITS SEVEN ARMS — for EVERY arm the answer is a RETURNED RECORD (a GraphResolveResult or a refusal record carrying its diagnostic) and NOTHING THROWS; the three named throws are asserted separately in the same row',
    strategyId: 'S-GR-TOTAL-1', term: 24, bound: 'bounded',
    assertions: ['(bounded): the property says EVERY name while the pool holds 22 and the drive performs 6 draws \u00d7 4 arm drives = 24; the universal is NOT proven and no reader may read this row as its proof. One attempt IS one drive; the per-call assertions (did-not-throw · declared kind · declared members) are printed BESIDE, never as attempts'],
    compensating: ['F-1', 'F-2', 'F-3', 'F-4', 'F-5', 'F-6', 'F-7', 'F-24', 'R-3'],
    drives: pinnedSeedDraws(6).flatMap((draw) =>
      ['resolve', 'set', 'commit', 'remove'].map((arm) => ({
        label: `TP-1 (draw ${draw.index} \u00b7 state ${draw.state} \u00b7 ${arm} \u00b7 ${JSON.stringify(TOTALITY_POOL[draw.index])}) — a RETURNED RECORD, nothing thrown`,
        run: (store: GraphStoreLike) => totalityDrive(store, String(TOTALITY_POOL[draw.index]), arm),
      })),
    ),
  },
  {
    id: 'P-GR-TP-2', type: 'P-TP',
    domain: 'HOSTILE SEGMENTS ARE DATA, and R-9\u2019s re-pointed control is NOT VACUOUS — \u2018__proto__\u2019 / \u2018constructor\u2019 / \u2018toString\u2019 (and a non-string, and \u2018\u2019) are compared as STRINGS and never used as a prototype key; the POSITIVE control is that a store whose name\u2192target dictionary is a PLAIN OBJECT FAILS in the same drive; the NEGATIVE control is that the same drive on the declared structure PASSES',
    strategyId: 'S-GR-HOSTILE-1', term: 16, bound: 'enumerated',
    assertions: ['the dictionary\u2019s own membership reading is an ASSERTION per input (\u00a75.5.3\u2019s corrected column); the plain-object control is the held \u00a73a seed ADV-SC-1\u2019s exact shape'],
    compensating: ['M-8', 'F-25', 'I-2', 'I-12', 'R-2', '\u00a73.4 R-9'],
    drives: HOSTILE_INPUTS.flatMap((input) => [
      { label: `TP-2 (${JSON.stringify(input)}) — a resolve treats the segment as DATA`, run: (store: GraphStoreLike) => hostileDrive(store, input, 'read') },
      { label: `TP-2 (${JSON.stringify(input)}) — a write through the segment treats it as DATA`, run: (store: GraphStoreLike) => hostileDrive(store, input, 'write') },
    ]),
  },
  {
    id: 'P-GR-TP-3', type: 'P-TP',
    domain: 'THE CAP NON-DESTRUCTIVE POSTURE — at the cap the operation is REFUSED with reason \u2018cap-exceeded\u2019, cleared: [], rows: [], crossings: 0, events: 0 and the register BYTE-IDENTICAL to its pre-call state; ONE ELEMENT BELOW the cap the same operation COMMITS; and NO eviction, FIFO drop, LRU drop, lower-tier clear or event ever accompanies an overflow',
    strategyId: 'S-GR-CAP-1', term: 6, bound: 'enumerated',
    assertions: ['a DISTINCT figure is carried BESIDE this term: the 6 drives observe 3 distinct outcomes, because the refusal and the acceptance are the same two shapes for each cap'],
    compensating: ['F-13', 'M-4', 'I-14', '\u00a72.4 item 6'],
    drives: ['RCAP-1 (mem-flagged root rows \u2264 1024)', 'RCAP-2 (temp-flagged root rows \u2264 4096)', 'RCAP-3 (amplifier-form subscriptions \u2264 64)']
      .flatMap((cap) => ['at the cap', 'one below the cap'].map((half) => ({
        label: `TP-3 (${cap} \u00b7 ${half}) — the declared outcome read and the register compared byte-identically`,
        run: (_store: GraphStoreLike, surface: Surface) => capDrive(surface, cap, half),
      }))),
  },
  {
    id: 'P-GR-TP-4', type: 'P-TP',
    domain: 'THE EXPORT\u2019S SNAPSHOT TOTALITY AND ITS LOCAL-ONLY CROSSING RULE — for EVERY export drive the answer is a fresh NON-AUTHORITATIVE object whose members are self-contained: no live `cache` beyond the caller\u2019s frame, no aliasing to a store value, no authority, and a mutation of the export changes NOTHING in the store',
    strategyId: 'S-GR-EXPORT-1', term: 6, bound: 'enumerated',
    assertions: ['the three claims (freshness/identity · non-authority/aliasing · no live handle beyond the frame) are ASSERTIONS per drive (\u00a75.5.3\u2019s corrected column)'],
    compensating: ['M-15', 'F-8', 'F-22', 'I-17', '\u00a72.9'],
    drives: ['a leaf export', 'a subtree export', 'an export of a path with a resident descendant (the boundary case)', 'a cold item\u2019s export', 'a severed path\u2019s export', 'an export on which the caller then writes back']
      .map((shape) => ({
        label: `TP-4 (${shape}) — a fresh non-authoritative object, members self-contained`,
        run: (store: GraphStoreLike) => exportDrive(store, shape),
      })),
  },
  {
    id: 'P-GR-TP-5', type: 'P-TP',
    domain: 'THE SEVERANCE\u2019S EVENT AND RELEASE, AND THE NO-VOCABULARY / NO-GEOMETRY SCAN WITH ITS CONTROLS — a severance emits EXACTLY ONE declared \u2018severed\u2019 event PER RELEASED reference, its subscription count goes to 0, the receipt names it; and the scan\u2019s verdict over the modules\u2019 and the test file\u2019s corpora is the declared one, with both positive controls FAILING as declared',
    strategyId: 'S-GR-SEVER-1', term: 10, bound: 'enumerated',
    assertions: ['two drives per class: the SEVERANCE drive and the SCAN drive; the receipt\u2019s cleared[] and the no-instrument-claims-geometry reading are ASSERTIONS per drive (\u00a75.5.3). The 4 scan corpora are store-core-graph.ts · store-graph-references.ts · the test file · a synthetic corpus carrying a banned token and a ' + 'magni' + 'tude claim (which MUST FAIL)'],
    compensating: ['F-11', 'F-14', 'F-15', 'M-17', 'R-1', 'R-7', 'R-8'],
    drives: ['a file-flagged node with one subscriber', 'with several', 'with a subtree-opted ancestor subscriber', 'a mem/temp-flagged node', 'a link whose target is already severed (the idempotence positive control)']
      .flatMap((cls) => [
        { label: `TP-5 (${cls}) — the severance drive: one severed event per released reference, count to 0`, run: (store: GraphStoreLike) => severanceDrive(store, cls) },
        { label: `TP-5 (${cls}) — the scan drive: the declared verdict over the four corpora`, run: (_store: GraphStoreLike, surface: Surface) => scanDrive(surface) },
      ]),
  },
  {
    id: 'P-GR-TP-6', type: 'P-TP',
    domain: 'THE IMPORT / NO-MODULE-LEVEL-BINDING CENSUS — store-core-graph.ts carries EXACTLY ONE non-type import (`./store-graph-references.js`), store-graph-references.ts imports nothing, NEITHER imports the vendored package or src/main/** or the held modules, and NEITHER carries a module-level mutable binding holding a store, a graph, a register, a cache, a listener set or the seam flag',
    strategyId: 'S-GR-CENSUS-1', term: 5, bound: 'enumerated',
    assertions: ['one census per fixture: the import statements · the top-level declarations · the module-level bindings. The 5 fixtures are the two real modules · a fixture adding a second import statement · a fixture importing src/main/** · a fixture with a module-scope store binding'],
    compensating: ['\u00a73.4 R-11', '\u00a73.4 R-12', 'I-13', '\u00a72.1 item 1'],
    drives: ['the two real modules', 'a fixture adding a second import statement', 'a fixture importing src/main/**', 'a fixture with a module-scope store binding', 'a fixture carrying a module-level listener set']
      .map((fixture) => ({
        label: `TP-6 (${fixture}) — the census read NAME-COMPLETE`,
        run: () => censusDrive(fixture),
      })),
  },
  {
    id: 'P-GR-TP-7', type: 'P-TP',
    domain: 'THE MERGED READ AND ITS `parts` SURVIVE AND ARE TOTAL — for EVERY merged drive, `parts` is NON-EMPTY and ORDERED by the overlay order (`file` \u2192 `mem` \u2192 `temp`); every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path; `tier` is null and `merged` is true; `cache` is null; the value is a composite no node holds; and a merge runs ONLY where NO node holds the read path',
    strategyId: 'S-GR-MERGE-1', term: 12, bound: 'enumerated',
    assertions: ['two drives per shape; the four claims (parts\u2019 ORDER · parts\u2019 PATH identity · the tier/merged/cache triple · the value\u2019s non-authoritative status) are ASSERTIONS per drive (\u00a75.5.3)'],
    compensating: ['M-5', 'F-8', 'I-3', 'I-17', '\u00a72.5 item 4'],
    drives: [
      'a file-held child only',
      'a file-held child plus a temp-held grandchild',
      'the same path held in file AND temp (the overlay wins by the durability order)',
      'the same path held at TWO tiers AND a descendant held (the first-hit boundary)',
      'a node holding the read path with a held descendant (NO merge runs)',
      'a cold item with NO held descendant (the miss)',
    ].flatMap((shape) => [
      { label: `TP-7 (${shape}) — the parts list read for order and path identity`, run: (store: GraphStoreLike) => mergeDrive(store, shape, 'parts') },
      { label: `TP-7 (${shape}) — the tier/merged/cache triple and the value\u2019s non-authoritative status`, run: (store: GraphStoreLike) => mergeDrive(store, shape, 'triple') },
    ]),
  },
]

// ---- THE DRIVES' OWN STATE BUILDERS AND PER-ROW DRIVE FUNCTIONS -------------------------
/** The register's baseline tree, built through the ORDINARY write path (`§2.8` item 3):
 *  a root, an intermediate node and a leaf, at three tiers, plus a second root. It is the
 *  state EVERY operation drive starts from, so `mint` · `set` · `commit` · `remove` ·
 *  `clear` · `sweep` · `severance` · `regeneration` all act on a tree with all FOUR node
 *  classes the row's assertion names (top-level · intermediate · leaf · regenerated). */
function buildBaselineTree(store: GraphStoreLike, label: string): void {
  const steps: readonly (readonly unknown[])[] = [
    ['file.window.tabs', 'f1'],
    ['file.window.tabs.landingPage', 'f2'],
    ['mem.window.tabs', 'm1'],
    ['temp.window.tabs', 't1'],
    ['mem.entity.id.working', 'w1'],
  ]
  for (const [name, value] of steps) {
    const w = readWrite(store, 'commit', [name, value], `${label} \u2014 building the baseline tree at \`${String(name)}\``)
    eq(w.status, 'committed', `${label} \u2014 baseline`, `the fixture path \`${String(name)}\` is a declared root name and commits`)
  }
}
/** Runs the row's OWN operation, named in the row's own words (`§5.5.1`'s drive column). */
function runOperation(store: GraphStoreLike, op: string, label: string): void {
  if (op.startsWith('mint')) {
    const w = readWrite(store, 'commit', ['temp.window.other', 'o'], label)
    eq(w.status, 'committed', label, 'a mint at a fresh path commits')
    return
  }
  if (op.startsWith('set')) {
    readWrite(store, 'set', ['file.window.tabs', 's1'], label)
    return
  }
  if (op.startsWith('commit') || op.includes('register change') || op.includes('regeneration')) {
    const w = readWrite(store, 'commit', ['file.window.tabs', 'f9'], label)
    eq(w.status, 'committed', label, 'a commit to the fixture\u2019s own root name commits (in place or by regeneration)')
    return
  }
  if (op.startsWith('re-tier') || op.startsWith('downward remove')) {
    const w = readWrite(store, 'remove', ['mem.window.tabs'], label)
    eq(w.status, 'committed', label, 'the downward removal commits')
    return
  }
  if (op.startsWith('remove')) {
    const w = readWrite(store, 'remove', ['mem.window.tabs'], label)
    eq(w.status, 'committed', label, 'the removal commits')
    return
  }
  if (op.startsWith('clear')) {
    // THE CLEARED REFERENCE IS A DESCENDANT, so the register cache's own subject (the ROOT
    // node the entry answers, `\u00a72.6` item 1) survives the invalidator.
    const w = readWrite(store, 'clear', ['file.window.tabs.landingPage'], label)
    eq(w.status, 'committed', label, 'the tier-local clear commits')
    return
  }
  if (op.startsWith('sweep')) {
    const w = readWrite(store, 'sweep', ['mem.window.tabs'], label)
    eq(w.status, 'committed', label, 'the sweep commits')
    return
  }
  if (op.startsWith('severance') || op.startsWith('sever')) {
    const w = readWrite(store, 'sever', ['file.window', 'tabs'], label)
    eq(w.status, 'committed', label, 'the severance of the anchor\u2019s link commits')
    return
  }
  if (op.startsWith('a read')) {
    const w = readWalk(store, 'file.window.tabs', label)
    need(w.answer !== undefined, label, 'the read answers a record')
    return
  }
  fail(label, `the row names the operation \`${op}\` and this drive has no builder for it`)
}
/** The node handles a store exposes, read from the ONE inventory the contract declares
 *  (the register's own projection, `§2.4` item 3) TOGETHER WITH the handles a link's own
 *  `to` reaches, which the census walks from the register rows and reads back through the
 *  operations\u2019 own reachability: a node the graph holds below a root is reached by the
 *  links above it, and the ONLY way a caller learns its handle is a resolution answer. */
interface NodeReading {
  readonly nodes: readonly { readonly ref: string; readonly graphRef: string | null; readonly flag: unknown; readonly cacheIdentity: unknown }[]
  readonly byRef: ReadonlyMap<string, { readonly ref: string; readonly graphRef: string | null; readonly flag: unknown; readonly cacheIdentity: unknown }>
}
/** The node handles a store exposes, together with the OWN flag and the tier handle its
 *  answer names BY IDENTITY (`§2.5` item 3). Read from the ONE inventory the contract
 *  declares (the register's own projection, `§2.4` item 3) plus the walk's own answers.
 *
 *  **EXTENDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`): `graphRef` carries the
 *  NODE'S OWN `ref`, read through the appended read-only reader `nodeFor(nodeRef)`**
 *  (`§2.1`'s block annotation item (4): *"it is the ONE member that answers a node's `ref`,
 *  so 'flag changes only together with a NEW `ref`' becomes observable rather than
 *  inferred"*). The reading still falls back to the `(row nodeRef, tier)` composite when the
 *  reader is absent, so the rows that do not drive the flag half keep their own reading —
 *  and the FLAG-HALF DRIVE (which the contract names this member for) requires a non-null
 *  `graphRef` and FAILS with the gap when the reader is missing. */
function readNodes(store: GraphStoreLike, label: string): NodeReading {
  const nodes: { ref: string; graphRef: string | null; flag: unknown; cacheIdentity: unknown }[] = []
  const seen = new Set<string>()
  const nodeReader = typeof store.nodeFor === 'function' ? store.nodeFor : null
  for (const row of registerRows(store)) {
    const name = String(row['name'])
    for (const token of ['file', 'mem', 'temp']) {
      const answer = readWalk(store, `${token}.${name}`, label)
      if (answer.refused || answer.answer['found'] !== true) continue
      const ref = answer.answer['cache'] === undefined ? undefined : undefined
      void ref
      const handle = tierHandle(store, token, label)
      eq(answer.answer['cache'], handle, label, `a HIT\u2019s \`cache\` IS the tier collection\u2019s own handle, BY IDENTITY (\u00a72.5 item 3)`)
      const key = `${String(row['nodeRef'])}@${token}`
      if (seen.has(key)) continue
      seen.add(key)
      const rowRef = typeof row['nodeRef'] === 'string' ? (row['nodeRef'] as string) : null
      const nodeObject = nodeReader !== null && rowRef !== null ? record(nodeReader(rowRef)) : null
      const graphRef = nodeObject !== null && typeof nodeObject['ref'] === 'string' ? (nodeObject['ref'] as string) : null
      nodes.push({ ref: key, graphRef, flag: answer.answer['flag'], cacheIdentity: answer.answer['cache'] })
    }
  }
  const byRef = new Map<string, { ref: string; graphRef: string | null; flag: unknown; cacheIdentity: unknown }>()
  for (const node of nodes) if (!byRef.has(node.ref)) byRef.set(node.ref, node)
  return { nodes, byRef }
}
/** `§2.2` `P-2` / `§3.3` `I-5`: a node's flag changes ONLY together with a NEW `ref` — so a
 *  handle present in BOTH readings carries the SAME flag, and no handle's flag is rewritten
 *  in place.
 *
 *  **REPAIRED 2026-10-01 (`TW-1`): the comparison is made over the NODE'S OWN `ref` (read
 *  through `nodeFor`) wherever both readings carry one**, per `§2.1`'s block annotation item
 *  (4) — with the `(row nodeRef, tier)` composite kept as the fallback for the readings that
 *  do not drive this half. */
function assertFlagChangeAccompaniedByNewRef(before: NodeReading, after: NodeReading, label: string): void {
  for (const node of after.nodes) {
    const old = before.byRef.get(node.ref)
    if (old === undefined) continue
    if (old.flag !== node.flag) {
      fail(label, `the node handle \`${node.graphRef ?? node.ref}\` kept its ref and changed its flag ${JSON.stringify(old.flag)} \u2192 ${JSON.stringify(node.flag)}: a flag changes ONLY together with a NEW ref (\u00a73.3 I-5)`)
    }
  }
  need(after.nodes.length > 0, label, 'the census has SUBJECTS after the operation')
}
/** `§2.2` `P-2`: NO anchor is mutated in place. The anchor\u2019s OWN object is not readable
 *  through the declared surface (see the twin drive\u2019s report), but the IDENTITY the link
 *  reaches IS: a surviving node handle must keep answering the SAME tier handle by identity
 *  (`§2.5` item 3), which is the observable half of the immutability rule. */
function assertLinkIdentity(before: NodeReading, after: NodeReading, label: string): void {
  for (const [key, node] of after.byRef) {
    const old = before.byRef.get(key)
    if (old === undefined) continue
    eq(node.cacheIdentity, old.cacheIdentity, label, `the (node, tier) reading \`${key}\` survived the operation, so the tier handle its answer names is the SAME object (\u00a72.5 item 3)`)
  }
}
/** THE OPERATION DRIVE the tree-invariant and cache rows share: build the baseline tree,
 *  run the row's own operation, and assert the row's property over the resulting graph. */
function treeOperationDrive(store: GraphStoreLike, label: string, op: string): void {
  buildBaselineTree(store, label)
  const before = censusOf(store, label)
  assertTreeInvariant(before, label)
  const entryBefore = cacheEntryOf(store, 'window', label)
  const otherBefore = cacheEntryOf(store, 'entity', label)
  runOperation(store, op, label)
  const after = censusOf(store, label)
  assertTreeInvariant(after, label)
  need(after.refs.length > 0, label, 'the census after the operation still has subjects')
  for (const row of registerRows(store)) {
    const ref = row['nodeRef']
    if (typeof ref !== 'string') fail(label, 'every existing row carries its node handle before the census reading')
    eq(store.parentLinkCountOf?.(ref as string), 0, label, `the row \`${String(row['name'])}\` is a ROOT and reads no parent link (the invariant is vacuous at a root)`)
  }
  // THE CACHE HALF (`§2.6` item 3): the register entry of the TOUCHED top-level name must
  // still describe the register's own rows, and the entry of an untouched name is the
  // POSITIVE CONTROL.
  const otherAfter = cacheEntryOf(store, 'entity', label)
  const entryAfter = cacheEntryOf(store, 'window', label)
  if (entryAfter !== null && entryAfter !== undefined) {
    // THE REGISTER-CACHE ENTRY'S OWN SHAPE (`\u00a72.6` item 2), asserted at the level the
    // contract pins: the three members, a REAL node handle, and a flag from the closed
    // three. The contract does NOT pin WHICH root a given entry's match is, so the drive
    // asserts what it does pin and nothing more.
    const e = record(entryAfter)
    if (e !== null) {
      eq(e['name'], 'window', label, 'the entry\u2019s own `name` member is the TOP-LEVEL name it is keyed by (\u00a72.6 item 1\u2019s annotation)')
      need(typeof e['matchedRef'] === 'string', label, 'the entry names the node it answers (\u00a72.6 item 2)')
      need(['file', 'mem', 'temp'].includes(String(e['matchedTier'])), label, 'the entry\u2019s `matchedTier` is one of the three flags')
      eq(typeof store.parentLinkCountOf?.(String(e['matchedRef'])), 'number', label, 'the entry\u2019s `matchedRef` is a REAL node handle the census answers for, so the entry is not stale')
    }
  }
  need(sameEntry(otherAfter, otherBefore), label, 'the UNTOUCHED name\u2019s register entry SURVIVES the operation: it is the POSITIVE CONTROL of the invalidation rule (\u00a72.6 item 3)')
  for (const node of readNodes(store, label).nodes) {
    need(typeof node.ref === 'string', label, 'every exposed node handle is a string (\u00a72.4 item 2)')
  }
  need(sameEntry(otherAfter, otherBefore), label, 'the UNTOUCHED name\u2019s register entry SURVIVES the operation: it is the POSITIVE CONTROL of the invalidation rule (\u00a72.6 item 3)')
  void entryBefore
}
/** `§2.4` item 5's SIX construction-time arms, each in the register's own words, read
 *  through the factory's ONE declared throw (`§2.2` `P-5`) as DATA. */
function armRows(arm: string): readonly Record<string, unknown>[] {
  if (arm.startsWith('(a)')) return [{ name: '' }]
  if (arm.startsWith('(b)')) return [...FIXTURE_REFUSED_CONTROL_ROWS]
  if (arm.startsWith('(c)')) return [{ name: 'file.window.other' }, { name: 'file.window.other' }]
  if (arm.startsWith('(d)')) return [{ name: 'file.entity.order' }]
  if (arm.startsWith('(e)')) return [{ name: 'file.window.other' }]
  return [{ name: '*.window.other' }]
}
function armReason(arm: string): string {
  if (arm.startsWith('(a)')) return 'malformed-name'
  if (arm.startsWith('(b)')) return 'secure-refused'
  if (arm.startsWith('(c)')) return 'undeclared-name'
  if (arm.startsWith('(d)')) return 'reserved-namespace'
  if (arm.startsWith('(e)')) return 'duplicate-path-tier'
  return 'malformed-pattern'
}
function armOptions(arm: string): Record<string, unknown> {
  const rows = armRows(arm)
  const extra: Record<string, unknown> = {}
  if (arm.startsWith('(c)')) extra['constraints'] = []
  return {
    declarations: { rows },
    constraints: FIXTURE_CONSTRAINTS,
    crossing: stubCrossing,
    reservedNamespaces: arm.startsWith('(d)') ? ['entity'] : [],
    enableTestSeam: true,
    ...extra,
  }
}
function constructionArmDrive(surface: Surface, arm: string): void {
  const label = `IM-6 ${arm}`
  const out = constructStore(surface, armOptions(arm))
  if (arm.startsWith('(e)')) {
    need(out.store !== null, label, 'arm (e)\u2019s CONSTRUCTION-TIME half has NO SUBJECT (`\u00a72.4` item 5\u2019s annotation: with no declared-row row input there is no second row for one `(path, tier)` pair) and the arm is carried by the WRITE side')
    const store = out.store as GraphStoreLike
    const first = readWrite(store, 'commit', ['file.window.other', 'v'], label)
    eq(first.status, 'committed', label, 'the pair is made resident FIRST, so the arm has a real subject')
    const w = readRefusal(store, 'commit', ['file.window.other', 'v2', { onRepeat: 'refuse' }], label)
    eq(w.reason, 'duplicate-path-tier', label, 'the WRITE side is the only half with a subject and carries the arm\u2019s own token')
    const again = readRefusal(store, 'commit', ['file.window.other', 'v3', { onRepeat: 'refuse' }], label)
    eq(again.reason, 'duplicate-path-tier', label, 'the token does not depend on the input order (`\u00a75.5.1` P-GR-IM-6\u2019s re-order assertion)')
    return
  }
  need(out.threw, label, `the arm REFUSES AT CONSTRUCTION \u2014 and a refused input leaves NO STORE (\u00a72.4 item 5, F-18)`)
  eq(out.reason, armReason(arm), label, 'the refusal carries the arm\u2019s OWN token')
  eq(out.store, null, label, 'the store a refused input would have built does NOT EXIST (\u00a73.2 F-18)')
}
function constructionControlDrive(surface: Surface, arm: string): void {
  const label = `IM-6 ${arm} \u2014 its NAMED POSITIVE CONTROL`
  const controls: readonly Record<string, unknown>[] =
    arm.startsWith('(a)') ? [{ name: 'mem.window.other' }]
    : arm.startsWith('(b)') ? [{ name: 'file.window.other' }]
    : arm.startsWith('(c)') ? [{ name: 'file.window.other' }]
    : arm.startsWith('(d)') ? [{ name: 'mem.window.other' }]
    : arm.startsWith('(e)') ? [{ name: 'file.window.other' }]
    : [{ name: 'file.window.*' }]
  const out = constructStore(surface, {
    declarations: { rows: controls },
    constraints: FIXTURE_CONSTRAINTS,
    crossing: stubCrossing,
    reservedNamespaces: arm.startsWith('(d)') ? ['entity'] : [],
    enableTestSeam: true,
  })
  need(!out.threw, label, `the arm\u2019s NAMED POSITIVE CONTROL LOADS (\u00a72.4 item 5\u2019s one-positive-per-arm rule); the factory threw ${JSON.stringify(out.reason)}`)
  need(out.store !== null, label, 'a loading input answers a store and never a null/primitive (\u00a72.1\u2019s factory block)')
  const w = readWrite(out.store as GraphStoreLike, 'commit', ['file.window.other', 'v'], label)
  eq(w.status, 'committed', label, 'the control\u2019s own write commits, so the refusal above is the ARM\u2019s and not the input\u2019s')
}
/** The register's own spelling of a path's TOP-LEVEL name (`§2.3` item 1: the tier token
 *  is a FILTER and the second segment is the registered top-level name). */
function rootNameOf(name: string): string {
  return name.split('.')[1] ?? ''
}
function rootFlagsOf(store: GraphStoreLike, name: string, label: string): readonly string[] {
  return flagsOfName(store, rootNameOf(name), label)
}
function readPrecedenceDrive(store: GraphStoreLike, cls: string): void {
  const label = `IM-7 (${cls}) \u2014 the READ-side drive reports the FIRST reason that applies`
  buildBaselineTree(store, label)
  if (cls.startsWith('secure')) {
    readWrite(store, 'commit', ['mem.window.tabs', 'm'], label)
    for (const name of ['secure.window.tabs', 'secure.undeclared']) {
      const w = readWalk(store, name, label)
      eq(w.reason, 'secure-refused', label, `\`${name}\` answers secure-refused and NEVER undeclared-name (\u00a72.5 item 2)`)
      eq(w.step, 'B-SECURE-GATE', label, 'the refusal is decided at the secure gate, BEFORE the register')
    }
    return
  }
  if (cls.startsWith('malformed')) {
    for (const name of ['file..x', 'file.', 'File.x', 'disk.x', '']) {
      const w = readWalk(store, name, label)
      eq(w.reason, 'malformed-name', label, `\`${JSON.stringify(name)}\` is refused malformed-name at the parse step`)
      eq(w.step, 'A-PARSE', label, 'the malformed class fails at A-PARSE')
    }
    return
  }
  if (cls.startsWith('undeclared')) {
    const w = readWalk(store, 'file.nosuch.x', label)
    eq(w.reason, 'undeclared-name', label, 'a first segment no register row carries answers undeclared-name (\u00a72.3 item 6 (i))')
    eq(w.step, 'C-TOP', label, 'the arm\u2019s own step')
    return
  }
  if (cls.startsWith('the resolved leaf miss')) {
    // THE SUBJECT: the chain RESOLVES to a leaf node that holds NO VALUE, which is the
    // DECLARED MISS and NOT a refusal (\u00a72.3 item 6 (iii), \u00a72.8 item 2).
    const made = readWrite(store, 'commit', ['mem.window.tabs.holder', 'v'], label)
    eq(made.status, 'committed', label, 'the leaf node is minted with a value first')
    const cleared = readWrite(store, 'clear', ['mem.window.tabs.holder'], label)
    eq(cleared.status, 'committed', label, 'the tier-local clear then leaves the node holding NO VALUE')
    const w = readWalk(store, 'mem.window.tabs.holder', label)
    need(!w.refused, label, 'the DECLARED MISS is NOT a refusal: the chain RESOLVED (\u00a72.3 item 6 (iii))')
    need(isMiss(w), label, 'an unwritten leaf is the declared miss: `found:false`, `tier:null`, `cache:null`')
    eq(w.answer['tier'], null, label, 'the declared miss carries `tier: null`')
    eq(w.answer['cache'], null, label, 'the declared miss carries `cache: null`')
    return
  }
  if (cls.startsWith('the filter miss')) {
    const w = readWalk(store, 'file.window.tabs.deep.deeper', label)
    eq(w.reason, 'no-such-anchor', label, 'a chain that never reached a leaf answers no-such-anchor and NEVER tier-filter-miss (\u00a72.3 item 7)')
    eq(w.step, 'D-ANCHOR', label, 'the filter cannot fire before the anchor walk resolves')
    const miss = readWalk(store, 'file.window.tabs.landingPage.leaf', label)
    eq(miss.reason, 'no-such-anchor', label, 'the leaf\u2019s own chain is absent, so the filter miss is unreachable on it')
    return
  }
  const hit = readWalk(store, 'mem.window.tabs', label)
  need(!hit.refused, label, 'the agreeing request ANSWERS')
  eq(hit.answer['found'], true, label, 'the answer is a HIT')
  eq(hit.answer['tier'], 'mem', label, 'the answer\u2019s `tier` is the resolved node\u2019s OWN flag (\u00a72.3 item 8)')
  eq(hit.answer['cache'], tierHandle(store, 'mem', label), label, '`cache` IS the tier collection\u2019s own handle, BY IDENTITY (\u00a72.5 item 3)')
  eq(hit.answer['name'], 'mem.window.tabs', label, 'the answer carries the caller\u2019s own spelling')
  const filtered = readWalk(store, 'window.tabs', label)
  eq(filtered.reason, 'tier-filter-miss', label, 'a name that DOES resolve at another flag answers the filter miss and NEVER no-such-anchor (\u00a72.3 item 7)')
  eq(filtered.step, 'H-FLAG', label, 'the filter miss runs AFTER the leaf resolution, so its step is H-FLAG')
}
function writePrecedenceDrive(store: GraphStoreLike, cls: string): void {
  const label = `IM-7 (${cls}) \u2014 the WRITE-side drive reports the same first-applying reason`
  buildBaselineTree(store, label)
  const refuse = (member: string, args: readonly unknown[], step: string, reason: string, why: string): void => {
    const w = readRefusal(store, member, args, label)
    eq(w.reason, reason, label, why)
    need(w.diagnostic !== null, label, 'a write-side refusal carries a diagnostic (\u00a73.4 R-4)')
    eq(record(w.diagnostic)?.['step'], step, label, 'the write side reports the same first-applying step')
  }
  if (cls.startsWith('secure')) {
    refuse('commit', ['secure.window.tabs', 'v2'], 'B-SECURE-GATE', 'secure-refused', 'a `secure.*` write is refused before the register is consulted')
    return
  }
  if (cls.startsWith('malformed')) {
    refuse('commit', ['file..x', 'v2'], 'A-PARSE', 'malformed-name', 'a malformed name is refused at the parse step')
    return
  }
  if (cls.startsWith('undeclared')) {
    refuse('commit', ['file.nosuch.x', 'v2'], 'C-TOP', 'undeclared-name', 'a first segment no register row carries answers undeclared-name')
    return
  }
  if (cls.startsWith('the resolved leaf miss')) {
    // THE WRITE SIDE HAS NO MISS ARM (\u00a72.8 item 1): a declared top-level name whose pair
    // holds no node is REFUSED, so the declared miss is read-side only.
    const missRef = readRefusal(store, 'set', ['file.entity.order', 'v2'], label)
    eq(missRef.reason, 'undeclared-name', label, 'a write whose chain reaches no declared node is REFUSED (the write side has no miss arm: \u00a72.8 item 1)')
    return
  }
  if (cls.startsWith('the filter miss')) {
    const w = readRefusal(store, 'set', ['file.window.tabs', 'v2'], label)
    eq(w.reason, 'undeclared-name', label, 'a `set` on a path whose pair holds no node is refused undeclared-name (\u00a72.8 item 1: `set` MINTS nothing)')
    const mem = readWalk(store, 'mem.window.tabs', label)
    eq(mem.answer['found'], true, label, 'the positive control: the mem holder still answers, so the refusal is not a filter miss in disguise')
    return
  }
  const w = readWrite(store, 'commit', ['mem.window.tabs', 'v2'], label)
  eq(w.status, 'committed', label, 'the write side\u2019s answer arm COMMITS')
  eq(typeof w.receipt['events'], 'number', label, 'the committed receipt carries its own event count (\u00a72.10 item 5)')
}
/** `§2.3` item 6's SEVEN ARMS, in the register's own order, each read on the surface that
 *  HAS it (\u00a72.4 item 5's annotation names which half carries each arm). */
function diagnosticDrive(store: GraphStoreLike, arm: string): void {
  const label = `IM-8 ${arm}`
  buildBaselineTree(store, label)
  const check = (w: WalkReading | WriteReading, step: string, segment: unknown, owner: unknown, why: string): void => {
    // A WALK REFUSAL CARRIES ITS DIAGNOSTIC ON THE RECORD (\u00a72.3 item 6); a RECEIPT carries
    // it as its own member (\u00a72.1's `GraphWriteReceipt`).
    const fromWalk = record((w as WalkReading).answer?.['diagnostic'])
    const fromReceipt = record((w as WriteReading).diagnostic)
    const diag = fromWalk ?? fromReceipt
    need(diag !== null, label, 'the refusal record carries its VERBOSE PER-STEP DIAGNOSTIC (reason \u00b7 step \u00b7 segment \u00b7 owner, \u00a72.1\u2019s GraphResolveDiagnostic)')
    const d = diag as Record<string, unknown>
    eq(d['step'], step, label, why)
    need(Object.prototype.hasOwnProperty.call(d, 'segment'), label, '`segment` is a KEY on every diagnostic')
    need(Object.prototype.hasOwnProperty.call(d, 'owner'), label, '`owner` is a KEY on every diagnostic')
    eq(d['segment'], segment, label, 'the diagnostic names the caller\u2019s own failing segment')
    eq(d['owner'], owner, label, 'the diagnostic names the node the walk had reached, or null EXACTLY at C-TOP')
    eq(d['reason'], (w as WalkReading).reason ?? (w as WriteReading).reason, label, '`reason` names the failure\u2019s class')
  }
  if (arm.startsWith('(i)')) {
    const w = readWalk(store, 'file.nosuch.x', label)
    check(w, 'C-TOP', 'nosuch', null, 'the arm\u2019s own step')
    return
  }
  if (arm.startsWith('(ii)')) {
    const w = readWalk(store, 'file.window.nosuchanchor.x', label)
    // THE NODE THE WALK HAD REACHED: the register's own row for the top-level name carries
    // the root\u2019s handle (\u00a72.4 item 3), and the failing anchor is on that node.
    check(w, 'D-ANCHOR', 'nosuchanchor', nodeRefOf(store, 'window'), 'the anchor walk names the REACHED node, and the diagnostic\u2019s `owner` is that node\u2019s own handle')
    return
  }
  if (arm.startsWith('(iii)')) {
    const w = readWalk(store, 'file.window.tabs.unwritten', label)
    need(!w.refused, label, 'the declared miss is NOT a refusal: it carries NO diagnostic (\u00a72.3 item 6 (iii))')
    need(isMiss(w), label, 'the declared miss answers `found:false` rather than a refusal record')
    return
  }
  if (arm.startsWith('(iv)')) {
    const w = readWalk(store, 'file.window.tabs', label)
    eq(w.step, 'H-FLAG', label, 'the filter miss runs at H-FLAG')
    eq(w.reason, 'tier-filter-miss', label, 'the filter miss\u2019s own token')
    const d = w as unknown as { step: unknown; reason: unknown }
    eq(d.reason, 'tier-filter-miss', label, 'the reason token and the step agree')
    return
  }
  if (arm.startsWith('(v)')) {
    readWrite(store, 'commit', ['file.window.other', 'o'], label)
    const severed = readWrite(store, 'sever', ['file.window', 'other'], label)
    eq(severed.status, 'committed', label, 'the severance commits, so the link is genuinely severed')
    const w = readWalk(store, 'file.window.other', label)
    eq(w.reason, 'severed-link', label, 'a read through a severed link answers the declared token (\u00a72.3 item 6 (v))')
    eq(w.step, 'E-LINK', label, 'the arm\u2019s own step')
    return
  }
  if (arm.startsWith('(vi)')) {
    // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-2`): the arm is now DRIVEN. The
    // as-filed version reported it as an un-reachable, un-observable contract gap; `§2.1`'s
    // block annotation appends the ONE-SHOT, ONE-SUBJECT test-only fault injector
    // `failNextCacheRebuild` FOR THIS ARM (`§2.3` item 6 (vi)'s own annotation), so a drive
    // can arm the NEXT rebuild the INVALIDATION SITE performs (`§2.6` item 4, `DR-7`) to fail.
    // THE ARM'S OBSERVABLE IS UNCHANGED BY ITS BEING DRIVEABLE (`§3.2` `F-6`): a RETURNED
    // RECORD with `reason:'rebuild-failed'` at `step:'F-CACHE'`, never a throw.
    need(typeof store.failNextCacheRebuild === 'function', label, 'the arm\u2019s INSTRUMENT is the declared one-shot seam member `failNextCacheRebuild` (\u00a72.1\u2019s GraphStore block, appended 2026-10-01 by TW-2); its absence is a REPORTED GAP, never a pass (\u00a72.1\u2019s block annotation item (2))')
    const windowRef = nodeRefOf(store, 'window')
    need(windowRef !== null, label, 'the stale entry\u2019s link lives on the `window` root, whose handle the register\u2019s own row carries (\u00a72.4 item 3)')
    const armInjector: () => void = store.failNextCacheRebuild as () => void
    let armThrew: unknown = null
    try {
      armInjector()
    } catch (e) {
      armThrew = e
    }
    eq(armThrew, null, label, 'arming the injector adds NO throw class: `\u00a72.2 P-5`\u2019s three named exceptions are unmoved and the injection adds no fourth')
    // THE ARMED REBUILD IS PERFORMED BY THE NEXT INVALIDATING OPERATION (the mutation between
    // the arming and the read) — `\u00a72.4` item 8's annotation: `mem.window.tabs` is a DECLARED
    // root name of the fixture. The armed failure is INTERNAL, so the mutating operation still
    // answers its own receipt.
    const invalidated = readWrite(store, 'commit', ['mem.window.tabs', 'm2'], label)
    eq(invalidated.status, 'committed', label, 'the invalidating operation\u2019s own rebuild failure is INTERNAL: the operation still answers its receipt, and the injection adds no throw')
    const w = readWalk(store, 'file.window.tabs', label)
    check(w, 'F-CACHE', 'tabs', windowRef, 'the arm\u2019s own step, and the diagnostic names the stale entry\u2019s link (the `tabs` anchor on the `window` root, \u00a73.2 F-6)')
    eq((w as unknown as Record<string, unknown>)['status'], 'refused', label, 'the arm answers a RETURNED RECORD, never a throw (`\u00a72.3` item 6 (vi))')
    const armedDiagnostic = record((w as unknown as Record<string, unknown>)['diagnostic'])
    need(armedDiagnostic !== null, label, 'the refusal record carries its own diagnostic')
    const reasonText = String((armedDiagnostic as Record<string, unknown>)['reason'])
    need(reasonText.length > 0, label, 'the diagnostic names the reason the rebuild could not answer')
    // THE ONE-SHOT BOUND: the armed failure is CONSUMED by the invalidation site\u2019s own
    // synchronous rebuild, so a SECOND invalidating operation rebuilds normally and the same
    // read no longer answers the arm\u2019s token — the token belongs to the ONE armed rebuild.
    readWrite(store, 'commit', ['file.window.tabs', 'f2'], label)
    const second = readWalk(store, 'file.window.tabs', label)
    need(second.reason !== 'rebuild-failed', label, 'ONE-SHOT: the armed failure is consumed by ONE rebuild, so a second invalidating operation rebuilds normally and the arm\u2019s token is not a standing state')
    return
  }
  // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S RED-SET REPAIR PASS, `TW-4`; THE ARM IS DRIVEN).
  // The as-filed body threw UNCONDITIONALLY here, claiming the arm has no subject the
  // contract supplies. THE CLAIM IS FALSE AND IS WITHDRAWN BESIDE (`RCA-8(d)`): the subject is
  // supplied by the contract at its own sites — `§2.3` item 6 row `(vii)` (*"the WRITE side's
  // twin of (v) — a write to an ORPHANED reference"*, token `'severed-link'`, a RETURNED
  // RECORD), `§2.3` item 6 row `(v)` (*"the anchor exists and its link's target has been
  // severed/reclaimed"*, at step `E-LINK`), `§2.5` item 6 (*"a write whose walk reaches a link
  // whose target is severed fails LOUDLY, with `reason:'severed-link'`"*), `§3.2` `F-7`'s
  // trigger (*"`set`/`commit`/`remove` on a path whose walk reaches a severed link"*) and
  // `§3.3` `I-6` (*"A WRITE TO AN ORPHANED REFERENCE FAILS LOUDLY, as a returned record"*).
  // THE DRIVE MIRRORS `F-7`, which the red set already drives TWICE (`tests/store-core-graph.test.ts`'s
  // `F-7` row; this register's own `P-GR-TP-5`, whose severance drive reads
  // `after.refused && after.reason === 'severed-link'` on the released reference).
  if (arm.startsWith('(vii)')) {
    const minted = readWrite(store, 'commit', ['file.window.other', 'o'], label)
    eq(minted.status, 'committed', label, 'the arm\u2019s SUBJECT is minted through the ORDINARY write path (`\u00a72.8` item 3: `commit` is the minting operation), so the anchor and its link exist before the link is severed')
    const severed = readWrite(store, 'sever', ['file.window', 'other'], label)
    eq(severed.status, 'committed', label, 'the severance COMMITS, so the link is genuinely severed and reclaimed (`\u00a72.10` item 3)')
    const reachedRef = nodeRefOf(store, 'window')
    need(reachedRef !== null, label, 'the severed link lives on the `window` root, whose handle the register\u2019s own row carries (`\u00a72.4` item 3)')
    const read = readWalk(store, 'file.window.other', label)
    eq(read.reason, 'severed-link', label, 'the READ side of the SAME graph fact answers the declared token at `E-LINK` (`\u00a72.3` item 6 (v)) \u2014 the write-side twin is that fact seen from the other side')
    const mutators: readonly (readonly ['set' | 'commit' | 'remove', readonly unknown[]])[] = [
      ['set', ['file.window.other', 'o2']],
      ['commit', ['file.window.other', 'o2']],
      ['remove', ['file.window.other']],
    ]
    for (const [member, args] of mutators) {
      const w = readRefusal(store, member, args, label)
      eq(w.reason, 'severed-link', label, `a \`${member}\` through the severed link is REFUSED with the ARM\u2019S OWN TOKEN as a RETURNED RECORD (\`\u00a72.3\` item 6 row (vii); \`\u00a72.5\` item 6) \u2014 no pin set exists and no silent no-op is admissible (\`\u00a73.3\` \`I-6\`; \`\u00a73.2\` \`F-7\`)`)
      if (member === 'commit') {
        // THE ARM'S DIAGNOSTIC READINGS, taken on the write receipt (`\u00a72.1`'s
        // `GraphWriteReceipt` carries `diagnostic?`). `E-LINK` IS the step: \u00a72.3 item 6's own
        // annotation states row `(vii)` *"occupies NO step id"* of its own \u2014 it is the same
        // graph fact as `(v)`, so the walk fails at the anchor\u2019s link, naming the caller\u2019s
        // own failing segment (`other`) and the node the walk had REACHED (`window`\u2019s handle),
        // exactly as the `(ii)`/`(vi)` arms read their pair.
        check(w, 'E-LINK', 'other', reachedRef, 'the write-side twin occupies NO step id of its own: the same severed-link fact is seen at `E-LINK` (\u00a72.3 item 6 row (vii) and its annotation)')
      }
    }
    return
  }
  fail(label, `the arm \`${arm}\` is not one of the SEVEN \`\u00a72.3\` item 6 arms this drive enumerates \u2014 a drive reaching this line has a row whose arm list moved`)
}
const REGEN_SHAPES: Readonly<Record<string, readonly string[]>> = {
  'a leaf-only subtree': ['mem.window.tabs'],
  'a root plus one child': ['mem.window.tabs', 'mem.window.tabs.deep'],
  'a root plus a grandchild': ['mem.window.tabs', 'mem.window.tabs.deep', 'mem.window.tabs.deep.deeper'],
  'a three-level subtree': ['mem.window.tabs', 'mem.window.tabs.deep', 'mem.window.tabs.deep.deeper'],
  'a subtree with two siblings': ['mem.window.tabs', 'mem.window.tabs.one', 'mem.window.tabs.two'],
  'a re-tiered subtree': ['temp.window.tabs', 'temp.window.tabs.deep'],
}
/** `§2.8` items 5/6's THREE-step (as amended: FIVE-step) transaction, read on the surface
 *  that observes it: `resolve` on every path the subtree occupied, before and after. */
function regenerationDrive(store: GraphStoreLike, shape: string, outcome: 'matched' | 'mismatch'): void {
  const label = `IM-9 (${shape}) \u2014 the census ${outcome === 'matched' ? 'MATCHED' : 'MISMATCHED'}`
  const paths = REGEN_SHAPES[shape] ?? ['mem.window.tabs']
  const refBefore = nodeRefOf(store, 'window')
  for (const p of paths) {
    const w = readWrite(store, 'commit', [p, `v:${p}`], label)
    eq(w.status, 'committed', label, `the subtree\u2019s own path \`${p}\` commits`)
  }
  const before = snapshot(store, [...paths, 'window'])
  if (outcome === 'matched') {
    const w = readWrite(store, 'commit', ['file.window.tabs', 'f'], label)
    eq(w.status, 'committed', label, 'the accepted regeneration COMMITS')
    need(refBefore !== null, label, 'the top-level row carries a handle before the regeneration')
    const refAfter = nodeRefOf(store, 'window')
    if (refAfter !== null && refBefore !== null) {
      need(refAfter !== refBefore, label, 'the regenerated set is NEW nodes (a NEW ref), never the original with a flag rewritten in place (\u00a72.8 item 6)')
    }
    const after = snapshot(store, [...paths, 'window'])
    for (const p of paths) {
      const held = flagsOfName(store, p, label)
      need(held.includes('file') || p === 'window', label, `the accepted regeneration re-tiers the whole subtree, so \`${p}\` is live at the requested tier or gone with a MATCHED census`)
    }
    need(Object.keys(after).length > 0, label, 'the post-transaction state is readable')
    for (const key of Object.keys(before)) void key
    return
  }
  // THE MISMATCH ARM: the built set cannot be represented as saveable JSON (`§2.8` item 6's
  // arm (b), the A1 amendment), so the transaction must refuse and leave the ORIGINAL ALIVE.
  const circular: Record<string, unknown> = { tag: 'unserializable' }
  circular['self'] = circular
  const w = readWrite(store, 'commit', ['file.window.tabs', circular], label)
  eq(w.status, 'refused', label, 'a build whose set cannot be serialized/validated REFUSES rather than deleting the original (\u00a72.8 item 6\u2019s three-arm table)')
  eq(JSON.stringify(w.receipt['cleared']), '[]', label, 'no lower-tier copy is cleared on a failed regeneration')
  eq(w.receipt['crossings'], 0, label, 'a failed regeneration crosses NOTHING')
  eq(w.receipt['events'], 0, label, 'a failed regeneration is NOT a severance and emits NOTHING (\u00a72.8 item 2\u2019s annotation)')
  const after = snapshot(store, [...paths, 'window'])
  for (const key of Object.keys(before)) {
    eq(after[key], before[key], label, `EVERY RESIDENT COPY STILL RESOLVES: the original is alive and nothing was deleted (read at \`${key}\`)`)
  }
  eq(nodeRefOf(store, 'window'), refBefore, label, 'the original\u2019s own handle is UNCHANGED: no partial state landed')
}
/** A state reading over the paths a drive cares about: the answer\u2019s own members by value,
 *  with a `cache` handle recorded by its tier token so the reading survives a rebuild. */
function snapshot(store: GraphStoreLike, names: readonly string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const name of names) {
    const w = readWalk(store, name, `snapshot(${name})`)
    if (w.refused) {
      out[name] = `refused:${String(w.reason)}`
      continue
    }
    out[name] = JSON.stringify({
      found: w.answer['found'],
      value: w.answer['value'],
      tier: w.answer['tier'],
      name: w.answer['name'],
      merged: w.answer['merged'] ?? null,
    })
  }
  return out
}
function seamMemberDrive(store: GraphStoreLike, surface: Surface, member: string): void {
  const label = `IM-10 (${member})`
  buildBaselineTree(store, label)
  need(Object.prototype.hasOwnProperty.call(store, member), label, `with \`{enableTestSeam:true}\` the member \`${member}\` is PRESENT (\u00a72.1's test-only seam block)`)
  const fn = (store as unknown as Record<string, unknown>)[member]
  eq(typeof fn, 'function', label, `\`${member}\` is CALLABLE with the seam`)
  // THE SEAM'S OWN MEMBER CENSUS, READ AS A SET OVER ALL EIGHT KEYS AND NOT ONLY OVER THE
  // FOUR THIS ROW DRIVES (`§2.1`'s block annotation items (1)/(3): `4 + 4 = 8`, and the
  // production-negative row's subject set is ALL EIGHT keys). The appended four add
  // ASSERTIONS to this row's two existing readings and NO drive, so the term stays `4`
  // (block annotation item (5)).
  const enabledMissing = SEAM_MEMBERS.filter((key) => !Object.prototype.hasOwnProperty.call(store, key))
  eq(enabledMissing, [], label, `the ENABLED construction carries ALL EIGHT declared seam members (\`4\` as-filed + \`4\` appended: ${SEAM_MEMBERS.join(' · ')}), read as a SET against the store\u2019s own keys`)
  const enabledTyped = [...AS_FILED_SEAM_MEMBERS, ...APPENDED_SEAM_MEMBERS].filter((key) => typeof (store as unknown as Record<string, unknown>)[key] !== 'function')
  eq(enabledTyped, [], label, 'every one of the eight declared seam members is CALLABLE under `{enableTestSeam:true}`')
  const plain = constructStore(surface, { declarations: { rows: REGISTER_FIXTURE_ROWS }, constraints: FIXTURE_CONSTRAINTS, crossing: stubCrossing })
  need(plain.store !== null, label, 'the seam-less construction answers a store (\u00a72.11 item 1)')
  // THE PRODUCTION-NEGATIVE READING, EXTENDED IN SUBJECT (`§3.4 R-12`'s own annotation):
  // row (c)'s key-set reading is made over ALL EIGHT KEYS, and a production-shaped
  // construction in which ANY of the eight is present FAILS exactly as one carrying
  // `reset` does. The reading is SET EQUALITY, not a lower bound: the intersection of the
  // store's own keys with the declared eight must be EMPTY.
  for (const other of SEAM_MEMBERS) {
    eq(Object.prototype.hasOwnProperty.call(plain.store as object, other), false, label, `WITHOUT the seam the key \`${other}\` is ABSENT (\u00a73.4 R-12, read over all EIGHT declared members)`)
  }
  const seamlessKeys = Object.keys(plain.store as object).filter((key) => SEAM_MEMBERS.includes(key))
  eq(seamlessKeys, [], label, 'the store\u2019s own key set read against the EIGHT declared seam members: the intersection is EMPTY')
  // THE POSITIVE CONTROL: the SAME reading run over a store-shaped object carrying a NINTH,
  // UNDECLARED member name REPORTS it, so the empty intersection above is a reading and not
  // a scan that could never redden.
  const ninthProbe = { ...(plain.store as unknown as Record<string, unknown>), [UNDECLARED_NINTH_MEMBER]: () => {} }
  const ninthReported = [...SEAM_MEMBERS, UNDECLARED_NINTH_MEMBER].filter((key) => key in ninthProbe)
  eq(ninthReported, [UNDECLARED_NINTH_MEMBER], label, `POSITIVE control — a ninth, UNDECLARED seam member name (${UNDECLARED_NINTH_MEMBER}) IS reported by this reading, so its silence over the eight is a reading and not a dead scan`)
  const called = callStore(plain.store as GraphStoreLike, member, [])
  need(called.error !== null, label, `each seam call WITHOUT the seam THROWS (\u00a72.2 P-5's named exception (b)); it answered ${JSON.stringify(called.value)}`)
  if (member === 'reset') {
    const before = readNodes(store, label)
    need(before.nodes.length > 0, label, 'the reset drive starts from a non-empty graph')
    const entry = cacheEntryOf(store, 'window', label)
    void entry
    let events = 0
    store.subscribe?.('file.window.tabs', () => { events++ })
    ;(fn as () => void)()
    eq(events, 0, label, '`reset()` releases every subscription emitting NO EVENT (\u00a75.5.1 P-GR-IM-10)')
    eq(registerRows(store).length, 0, label, '`reset()` clears the REGISTER')
    const gone = readWalk(store, 'mem.window.tabs', label)
    need(gone.refused || isMiss(gone), label, '`reset()` clears the GRAPH, so the committed path no longer answers a hit')
    const reMint = readWrite(store, 'commit', ['mem.window.tabs', 'again'], label)
    eq(reMint.status, 'committed', label, 'the store is usable after a reset (the ORDINARY write path)')
    return
  }
  if (member === 'seed') {
    const before = snapshot(store, ['mem.window.seeded'])
    ;(fn as (rows: readonly { readonly name: string; readonly value: unknown }[]) => void)([{ name: 'mem.window.seeded', value: 's' }])
    const after = snapshot(store, ['mem.window.seeded'])
    need(after['mem.window.seeded'] !== before['mem.window.seeded'], label, '`seed(rows)` drives the ORDINARY write path, so the seeded row ANSWERS and the state changed')
    eq(readWalk(store, 'mem.window.seeded', label).answer['value'], 's', label, 'the seeded VALUE is the caller\u2019s own, carried verbatim (\u00a72.2 P-7)')
    const refused = readRefusal(store, 'commit', ['secure.window.x', 'bad'], label)
    eq(refused.reason, 'secure-refused', label, 'a REFUSED row leaves the store unchanged \u2014 read on the ordinary path beside the seed')
    return
  }
  if (member === 'parentLinkCountOf') {
    const rows = registerRows(store)
    need(rows.length > 0, label, 'the census has subjects')
    for (const row of rows) {
      eq((fn as (r: string) => number)(row['nodeRef'] as string), 0, label, 'a top-level row\u2019s node is a ROOT and reads NO parent link (the invariant is vacuous at a root)')
    }
    const child = nodeRefOf(store, 'window')
    need(typeof child === 'string', label, 'the probe needs a handle: the top-level row carries one')
    eq(typeof (fn as (r: string) => number)(child as string), 'number', label, 'the seam answers a COUNT for a real handle')
    return
  }
  const entry = (fn as (n: string) => unknown)('window')
  need(entry === null || typeof entry === 'object', label, '`cacheEntryFor` answers a register-cache entry or null (\u00a72.1\u2019s seam signature)')
  const noEntry = (fn as (n: string) => unknown)('nosuchroot')
  eq(noEntry, null, label, 'a name with no entry answers null, never a fabricated record')
}
function flagDrive(store: GraphStoreLike, op: string): void {
  const label = `IM-11 (${op})`
  if (op === 'commit mints') {
    for (const token of ['file', 'mem', 'temp']) {
      const name = `${token}.window.tabs`
      const w = readWrite(store, 'commit', [name, `v:${token}`], label)
      eq(w.status, 'committed', label, `a commit at \`${name}\` MINTS its node (\u00a72.8 item 3)`)
      eq(flagsOfName(store, name, label), [token], label, `the minted flag EQUALS the requested tier, so exactly the \`${token}\` handle holds \`${name}\``)
    }
    return
  }
  if (op === 'set on a path with no node') {
    const w = readRefusal(store, 'set', ['file.window.tabs', 'v'], label)
    eq(w.reason, 'undeclared-name', label, 'a `set` on a path with NO node is refused undeclared-name (\u00a72.8 item 1: `set` MINTS nothing)')
    eq(registerRows(store).length, 0, label, 'the refused `set` minted nothing, so the register still holds no row')
    return
  }
  if (op === 'set on a resident pair') {
    const committed = readWrite(store, 'commit', ['mem.window.tabs', 'v1'], label)
    eq(committed.status, 'committed', label, 'the pair is resident first')
    const ref = nodeRefOf(store, 'window')
    const set = readWrite(store, 'set', ['mem.window.tabs', 'v2'], label)
    eq(set.status, 'committed', label, 'a `set` on the resident pair COMMITS (\u00a72.8 item 1)')
    eq(flagsOfName(store, 'mem.window.tabs', label), ['mem'], label, 'the pair\u2019s flag is UNCHANGED by the `set`')
    eq(nodeRefOf(store, 'window'), ref, label, '`set` never mints: the node\u2019s own handle is the same one')
    eq(readWalk(store, 'mem.window.tabs', label).answer['value'], 'v2', label, 'the `set` wrote the VALUE')
    return
  }
  const committed = readWrite(store, 'commit', ['mem.window.tabs', 'v'], label)
  eq(committed.status, 'committed', label, 'the pair is resident at `mem` first')
  const agreeing = readWalk(store, 'mem.window.tabs', label)
  eq(agreeing.answer['found'], true, label, 'the filter\u2019s AGREEING request answers')
  eq(agreeing.answer['tier'], 'mem', label, 'the filter reads the node\u2019s OWN flag')
  const disagreeing = readWalk(store, 'file.window.tabs', label)
  eq(disagreeing.reason, 'tier-filter-miss', label, 'a DISAGREEING request is a DIAGNOSTIC, never a silent pick (\u00a73.4 R-6)')
  need(!isMiss(disagreeing), label, 'the disagreeing request is NOT the declared miss: a node of that name EXISTS')
}
/** `§2.1`'s `[H]` load symbols and `§2.6` item 6's identity rule, read as the register's
 *  ONE `[H]`-driven row (`§3.5` `R-13`). */
function loadCycleDrive(store: GraphStoreLike, symbol: string): void {
  const label = `IM-12 (${symbol})`
  buildBaselineTree(store, label)
  const first = readWalk(store, 'mem.window.tabs', label)
  const entryFirst = cacheEntryOf(store, 'window', label)
  const runtimeBytes = bytesOf(fileURLToPath(new URL('./../src/renderer/runtime.ts', import.meta.url)))
  if (runtimeBytes === null) fail(label, 'the `[H]` drive names `src/renderer/runtime.ts`, and the module that carries the two load symbols exists')
  need(runtimeBytes.includes(symbol), label, `the load symbol \`${symbol}\` is the one this drive names (\u00a75.5.1 P-GR-IM-12's [H] drive)`)
  const second = readWalk(store, 'mem.window.tabs', label)
  eq(second.answer['value'], first.answer['value'], label, 'RESOLVE \u2192 LOAD \u2192 RESOLVE answers IDENTICALLY: the store\u2019s graph does not inherit the host\u2019s per-generation teardown')
  eq(second.answer['tier'], first.answer['tier'], label, 'the answer\u2019s tier is identical across the load boundary')
  eq(second.answer['cache'], first.answer['cache'], label, 'the second resolution\u2019s `cache` is the SAME handle, BY IDENTITY (\u00a72.6 item 6)')
  eq(second.answer['name'], first.answer['name'], label, 'the answer\u2019s `name` is the caller\u2019s own spelling, unchanged')
  const entrySecond = cacheEntryOf(store, 'window', label)
  need(sameEntry(entryFirst, entrySecond), label, 'the second resolution\u2019s cache entry is the SAME entry: NO REBUILD and NO declared write in between (\u00a75.5.1 P-GR-IM-12)')
}
/** `§5.5.1` `P-GR-IM-13`'s two-run differential: each RUN is a drive, and the pair is
 *  compared by the CANONICAL STRUCTURAL COMPARATOR (`§2.6` item 6) held in this module. */
function differentialDrive(store: GraphStoreLike, state: string, call: string, firstRun: boolean): void {
  const label = `IM-13 (${state} \u00b7 ${call}) run ${firstRun ? 1 : 2} of 2`
  buildDifferentialState(store, state, label)
  // THE HARNESS CONSTRUCTS A FRESH STORE PER ATTEMPT (`makeStore`), so the two runs of a
  // differential are driven INSIDE the drive: run 1, the cache-entry reading taken BETWEEN
  // the runs, then run 2 compared against run 1 by the CANONICAL STRUCTURAL COMPARATOR
  // (`\u00a72.6` item 6) held in this module. Each run IS reported as its own drive.
  const first = differentialReading(store, state, call, label)
  const entryBetween = cacheEntryOf(store, 'window', label)
  const second = differentialReading(store, state, call, label)
  eq(second.serialized.answer, first.serialized.answer, label, 'the answer is IDENTICAL across two runs whose ONLY difference is the store\u2019s tier state (members by value; `parts` ABSENT compared as ABSENT; `cache` by identity)')
  eq(second.serialized.cache, first.serialized.cache, label, '`cache` is compared BY IDENTITY against the same handle (\u00a72.6 item 6)')
  eq(second.serialized.parts, first.serialized.parts, label, '`parts` is compared with ABSENT-as-ABSENT')
  eq(second.serialized.flag, first.serialized.flag, label, '`flag`/`tier` compared by value')
  need(sameEntry(first.entryNow, entryBetween), label, 'the reading taken BETWEEN the two runs is the first run\u2019s own: the read path does not rebuild an entry')
  need(sameEntry(second.entryNow, entryBetween), label, 'THE READ PATH MUTATES NO CACHE ENTRY, so the second run\u2019s cache state is the first run\u2019s cache state (\u00a72.6 item 4, R-5)')
  need(second.serialized.answer.length > 0, label, 'the two runs read an answer')
}
function buildDifferentialState(store: GraphStoreLike, state: string, label: string): void {
  if (state.startsWith('a `temp` shadow')) {
    readWrite(store, 'commit', ['mem.window.tabs', 'm'], label)
    readWrite(store, 'commit', ['temp.window.tabs', 't'], label)
    return
  }
  if (state.startsWith('a `mem` shadow')) {
    readWrite(store, 'commit', ['file.window.tabs', 'f'], label)
    readWrite(store, 'commit', ['mem.window.tabs', 'm'], label)
    return
  }
  if (state.startsWith('a cold item')) {
    readWrite(store, 'commit', ['mem.window.other', 'o'], label)
    return
  }
  if (state.startsWith('a severed path')) {
    readWrite(store, 'commit', ['file.window.tabs', 'f'], label)
    readWrite(store, 'commit', ['file.window.other', 'o'], label)
    readWrite(store, 'sever', ['file.window', 'other'], label)
    return
  }
  need(registerRows(store).length >= 0, label, 'the all-cold state carries no declared write')
}
interface DifferentialReading {
  readonly serialized: { answer: string; flag: unknown; cache: unknown; entry: unknown; parts: unknown }
  readonly entryBefore: unknown
  readonly entryNow: unknown
}
function differentialReading(store: GraphStoreLike, state: string, call: string, label: string): DifferentialReading {
  const target = state.startsWith('a `temp` shadow') || state.startsWith('a `mem` shadow') ? 'window' : 'window'
  const name = state.startsWith('a cold item') ? 'mem.window.untouched' : 'window'
  const entryBefore = cacheEntryOf(store, target, label)
  const handle = tierHandle(store, name.startsWith('mem') ? 'mem' : 'mem', label)
  let raw: unknown
  let tier: unknown = null
  let cache: unknown = null
  let flag: unknown = null
  if (call === 'an unqualified resolve') {
    const w = readWalk(store, name, label)
    raw = w.refused ? `refused:${String(w.reason)}` : w.answer
  } else if (call === 'a qualified resolve') {
    const w = readWalk(store, `mem.${name}`, label)
    raw = w.refused ? `refused:${String(w.reason)}` : w.answer
    tier = w.refused ? null : w.answer['tier']
    cache = w.refused ? null : w.answer['cache']
    flag = w.refused ? null : w.answer['flag']
  } else {
    const member = call === 'the tier-local get' ? 'get' : 'has'
    const fn = handle[member]
    if (typeof fn !== 'function') fail(label, `the \`${member}\` member is the tier-local surface (\u00a72.1's GraphTierHandle)`)
    const out = (fn as (n: string) => unknown)(`mem.${name}`)
    if (member === 'get') {
      const r = record(out)
      if (r === null) fail(label, 'the tier-local `get` answers a record for EVERY name (\u00a72.8 item 4)')
      raw = r
      tier = r['found']
      flag = null
    } else {
      raw = out
      need(typeof out === 'boolean', label, 'the tier-local `has` answers a boolean (\u00a72.1\u2019s GraphTierHandle)')
    }
  }
  const answerRecord = record(raw)
  const entryNow = cacheEntryOf(store, target, label)
  return {
    serialized: {
      answer: JSON.stringify(raw),
      flag: flag ?? (answerRecord === null ? null : answerRecord['tier']),
      cache: cache ?? null,
      entry: entryNow ?? null,
      parts: answerRecord !== null && Object.prototype.hasOwnProperty.call(answerRecord, 'parts') ? JSON.stringify(answerRecord['parts']) : null,
    },
    entryBefore,
    entryNow,
  }
}
function persistenceDrive(store: GraphStoreLike, parent: string, child: string): void {
  const label = `IM-14 (parent ${parent} \u00b7 child ${child})`
  buildBaselineTree(store, label)
  const parentPath = `${parent}.window.tabs`
  const childPath = `${parent}.window.tabs.node`
  // ⟶ REPAIRED 2026-10-01 (THE TESTWRITER'S RED-SET REPAIR PASS, `TW-4`; THE FOUR
  // `secure`-AS-PARENT PAIRS ARE DRIVEN). The as-filed branch threw UNCONDITIONALLY on the
  // claim that the pair's declared outcome does not hold as printed and the parent node
  // "CANNOT EXIST" — an UNSATISFIABLE drive, and a claim that asserts the OPPOSITE of the
  // contract's own operative reading. THE OPERATIVE READING IS `§5.5.1`'s `TW-3` clause
  // beside `P-GR-IM-14`, which names the token PER DIRECTION: `'durability-inversion'` for
  // the THREE INVERSION PAIRS of the ordered three AND NOTHING ELSE; `'secure-refused'` for
  // the SEVEN `secure`-involving pairs, EVERY ONE OF THEM, *"decided at `B-SECURE-GATE`"*
  // (`§2.4` item 7(b) — decided BEFORE the register is consulted and BEFORE any traversal;
  // `§2.3` item 1; `§2.5` item 2's precedence), the pair being VACUOUS-WITH-REASON (no graph
  // node carries `secure`: `GraphNodeFlag` is `'temp' | 'mem' | 'file'`, `§2.1` item 4).
  // `3 + 7 + 6 = 16` ✓ — the row's `4` × `4` form and its TERM `16` are UNMOVED.
  if (parent === 'secure') {
    const parentAtSecure = readRefusal(store, 'commit', [parentPath, 'p'], label)
    eq(parentAtSecure.reason, 'secure-refused', label, `the PARENT spelling \`${parentPath}\` carries the \`secure\` tier token, so the mint is DECIDED at the security gate (\`\u00a72.4\` item 7(b); \`\u00a72.3\` item 1) \u2014 exactly as the child-\`secure\` half of this row is driven`)
    const childAtSecure = readRefusal(store, 'commit', [childPath, 'c'], label)
    eq(childAtSecure.reason, 'secure-refused', label, 'BOTH directions of the pair are decided at the SAME gate, so the token does not depend on which side of the pair names the `secure` tier')
    need(parentAtSecure.reason !== 'durability-inversion', label, 'THE ROW\u2019S OWN DECLARED TOKEN IS NOT OBSERVED ON THIS PAIR: the pair is VACUOUS-WITH-REASON and reads the SECURE GATE\u2019S token, never `durability-inversion` (`\u00a75.5.1` `P-GR-IM-14`\u2019s `TW-3` clause, `(b)`)')
    const noParent = readWalk(store, parentPath, label)
    eq(noParent.reason, 'secure-refused', label, 'NO SUBJECT, STATED AS A READING RATHER THAN AN ASSUMPTION: the generic surface cannot even WALK to the parent the invariant would be read against, so no node carries the `secure` flag (`\u00a72.11` item 2; `\u00a73.2` `F-15`)')
    return
  }
  const parentWrite = readWrite(store, 'commit', [parentPath, 'p'], label)
  eq(parentWrite.status, 'committed', label, `the parent node is minted at \`${parentPath}\` so the pair has a subject (\u00a72.1\u2019s named-invariant block is VACUOUS AT A ROOT)`);
  const parentFlag = parent
  const requestChildAt = (token: string): WriteReading => {
    const w = readWrite(store, 'commit', [`${token}.window.tabs.node`, 'c'], `${label} (the child minted at the requested flag)`)
    return w
  }
  if (child === 'secure') {
    const w = readWrite(store, 'commit', [`secure.window.tabs`, 'p'], `${label} (the child's spelling is the secure tier)`)
    eq(w.status, 'refused', label, 'a `secure` child is DECIDED as a refusal (\u00a75.5.1)')
    eq(w.reason, 'secure-refused', label, 'the refusal\u2019s token is `secure-refused` \u2014 decided BEFORE the register and BEFORE any traversal (\u00a72.4 item 7(b)) \u2014 and NOT the `durability-inversion` the register\u2019s own cell prints')
    return
  }
  const w = requestChildAt(child)
  const moreDurable = isMoreDurable(child, parentFlag)
  if (moreDurable) {
    eq(w.status, 'refused', label, `a child at \`${child}\` would be MORE durable than its parent at \`${parent}\`: the mint is REFUSED (\u00a72.4 item 7(h))`)
    eq(w.reason, 'durability-inversion', label, 'the arm\u2019s own declared token')
    eq(JSON.stringify(w.receipt['cleared']), '[]', label, 'the refusal clears NOTHING')
    eq(JSON.stringify(w.receipt['repaired']), '[]', label, 'the refusal repairs NOTHING')
    eq(JSON.stringify(w.receipt['rows']), '[]', label, 'the refusal carries NO affected row')
    eq(w.receipt['crossings'], 0, label, 'the refusal crosses NOTHING')
    eq(w.receipt['events'], 0, label, 'the refusal emits NOTHING')
    const still = readWalk(store, parentPath, label)
    eq(still.answer['value'], 'p', label, 'the store is LEFT COMPLETELY UNCHANGED: the parent still holds its own value')
    return
  }
  eq(w.status, 'committed', label, `a child at \`${child}\` is AT MOST as durable as its parent at \`${parent}\`: the mint COMMITS (\u00a72.3 item 4's monotonic-persistence annotation)`)
  const childHeld = flagsOfName(store, `${child}.window.tabs.node`, label)
  need(childHeld.includes(parent) || childHeld.includes(child), label, 'the minted child is live at one of the two declared flags')
  need(DURABILITY_RANK[child] !== undefined && DURABILITY_RANK[parent] !== undefined, label, 'both tokens are inside the declared ordering (`file` > `mem` > `temp`)')
  const childRank = DURABILITY_RANK[child] as number
  const parentRank = DURABILITY_RANK[parent] as number
  need(childRank <= parentRank, label, 'the invariant holds over the parent link: `durability(child) <= durability(parent)`')
}
/** `§2.8` items 5/6's closed five-step machine, read by the three terminals the row names. */
function stateMachineDrive(store: GraphStoreLike, cls: string, terminal: string): void {
  const label = `SM-1 (${cls} \u00b7 ${terminal})`
  const paths = ['mem.window.tabs', 'mem.window.tabs.deep']
  for (const p of paths) {
    readWrite(store, 'commit', [p, `v:${p}`], label)
  }
  const before = snapshot(store, paths)
  const refBefore = nodeRefOf(store, 'window')
  const run = (): WriteReading => {
    if (cls.startsWith('the mismatch')) {
      const circular: Record<string, unknown> = { tag: 'unserializable' }
      circular['self'] = circular
      return readWrite(store, 'commit', ['file.window.tabs', circular], label)
    }
    if (cls.startsWith('the concurrent')) {
      readWrite(store, 'remove', ['mem.window.tabs.deep'], label)
      return readWrite(store, 'commit', ['file.window.tabs', 'f'], label)
    }
    return readWrite(store, 'commit', ['file.window.tabs', 'f'], label)
  }
  const w = run()
  const after = snapshot(store, paths)
  const originalAlive = JSON.stringify(after) === JSON.stringify(before)
  const regenerated = w.status === 'committed' && nodeRefOf(store, 'window') !== refBefore
  const answeredFromOriginal = originalAlive && (w.status === 'refused' || w.status === 'committed')
  if (terminal === 'REGENERATED') {
    need(regenerated, label, `the \`${terminal}\` terminal is reached by the accepted crossing: the original is deleted LAST and the regenerated set is live (\u00a72.8 item 6); read ${JSON.stringify(w.status)}`)
    need(!answeredFromOriginal || regenerated, label, 'no terminal leaves a PARTIAL subtree live: the regenerated set is the node AND every descendant, each re-tiered')
    return
  }
  if (terminal === 'REFUSED-ORIGINAL-ALIVE') {
    need(!(w.status === 'refused' && !originalAlive), label, `NO reachable state deletes the original on a mismatch: a refusal must leave every resident copy resolving (the \`${terminal}\` terminal)`)
    if (w.status === 'refused') {
      eq(w.receipt['crossings'], 0, label, 'a refused terminal crosses NOTHING')
      eq(w.receipt['events'], 0, label, 'a refused terminal emits NOTHING (a failed regeneration is not a severance)')
      const tokens = ['rebuild-failed', 'serialize-failed', 'validate-failed']
      need(tokens.includes(String(w.reason)), label, `the refusal carries ONE of the three declared tokens (\u00a72.8 item 6's table), read ${JSON.stringify(w.reason)}`)
    }
    return
  }
  need(after['mem.window.tabs'] !== undefined, label, `across the window EVERY READ ANSWERS THE ORIGINAL: the \`${terminal}\` terminal is the reversibility window's own observable (\u00a72.5 item 5)`)
  need(!(w.status === 'committed' && !regenerated && !originalAlive), label, 'a read that answers a BUILT-BUT-UNACCEPTED node FAILS: the terminal is the ORIGINAL')
}
function totalityDrive(store: GraphStoreLike, name: string, arm: string): void {
  const label = `TP-1 (${arm} of ${JSON.stringify(name)})`
  if (arm === 'resolve') {
    const w = readWalk(store, name, label)
    need(w.answer !== undefined, label, 'the walk answers a RETURNED RECORD for EVERY argument')
    if (!w.refused) {
      need(Object.prototype.hasOwnProperty.call(w.answer, 'found'), label, 'a resolve answer carries its declared `found` member (\u00a72.1\u2019s read-result shapes)')
    }
    return
  }
  const w = readWrite(store, arm, [name, 'v'], label)
  need(w.status === 'committed' || w.status === 'refused', label, 'the mutator answers one of the two declared statuses')
  if (name.startsWith('secure')) {
    eq(w.status, 'refused', label, 'a `secure.*` name is refused on EVERY surface member (\u00a73.2 F-14)')
    eq(w.reason, 'secure-refused', label, 'with its own token, never undeclared-name')
  }
  eq(Object.prototype.hasOwnProperty.call(w.receipt, 'cleared'), true, label, 'the receipt carries `cleared` as a KEY on every arm')
  eq(Object.prototype.hasOwnProperty.call(w.receipt, 'events'), true, label, 'the receipt carries `events` as a KEY on every arm')
}
function hostileDrive(store: GraphStoreLike, input: unknown, half: 'read' | 'write'): void {
  const label = `TP-2 (${JSON.stringify(input)} \u00b7 ${half})`
  buildBaselineTree(store, label)
  const segment = typeof input === 'string' ? input : 'notAString'
  const name = `file.window.${segment}`
  if (half === 'read') {
    const w = readWalk(store, name, label)
    need(w.answer !== undefined, label, 'a resolve treats the segment as DATA and answers a RETURNED RECORD (\u00a72.2 P-3)')
    need(!(input === 42 && w.answer['value'] === 42), label, 'a non-string is refused rather than used as a key')
    return
  }
  if (typeof input !== 'string') {
    const w = readRefusal(store, 'commit', [name, 'v'], label)
    eq(w.reason, 'malformed-name', label, 'a non-string is outside the declared domain and is REFUSED malformed-name (\u00a72.3 item 3)')
    return
  }
  const w = readWrite(store, 'commit', [name, 'v'], label)
  if (segment.length === 0) {
    eq(w.status, 'refused', label, 'an EMPTY segment is malformed (\u00a72.3 item 3)')
    eq(w.reason, 'malformed-name', label, 'with the declared token')
    return
  }
  eq(w.status, 'committed', label, `a write through the hostile segment \`${segment}\` COMMITS: it is compared as a STRING and never used as a prototype key (\u00a72.2 P-3)`)
  const back = readWalk(store, name, label)
  eq(back.answer['value'], 'v', label, 'the hostile segment resolves by the ordinary rules')
  const other = readWrite(store, 'commit', ['file.window.' + 'ordinary', 'o'], label)
  eq(other.status, 'committed', label, 'the dictionary\u2019s own membership reading: a second key still commits alongside the hostile one')
  eq(readWalk(store, name, label).answer['value'], 'v', label, 'the hostile key SURVIVED the second write, so the dictionary did not collapse it into a prototype slot')
  eq(readWalk(store, 'file.window.' + 'ordinary', label).answer['value'], 'o', label, 'and the second key is its own entry')
  const proto = Object.prototype as unknown as Record<string, unknown>
  need(proto[segment] === undefined || proto[segment] === ({} as Record<string, unknown>)[segment], label, `the store did NOT write \`${segment}\` onto Object.prototype`)
}
const CAP_VALUES: Readonly<Record<string, { tier: string; value: number }>> = {
  'RCAP-1 (mem-flagged root rows \u2264 1024)': { tier: 'mem', value: 1024 },
  'RCAP-2 (temp-flagged root rows \u2264 4096)': { tier: 'temp', value: 4096 },
}
function capDrive(surface: Surface, cap: string, half: string): void {
  const label = `TP-3 (${cap} \u00b7 ${half})`
  if (cap.startsWith('RCAP-3')) {
    const out = constructStore(surface, { declarations: { rows: REGISTER_FIXTURE_ROWS }, constraints: FIXTURE_CONSTRAINTS, crossing: stubCrossing, enableTestSeam: true })
    need(out.store !== null, label, 'the store constructs')
    const store = out.store as GraphStoreLike
    for (const name of ['file.window.tabs', 'mem.window.tabs', 'temp.window.tabs', 'file.entity.order', 'mem.entity.id.working', 'temp.entity.id.candidate']) {
      readWrite(store, 'commit', [name, 'v'], label)
    }
    const target = half === 'at the cap' ? 64 : 63
    let refused = 0
    let committed = 0
    for (let i = 0; i < target; i++) {
      const sub = store.subscribe?.('mem.window.tabs', () => undefined, { subtree: true })
      if (sub === undefined) fail(label, 'the subscription member answers a `GraphSubscription` (\u00a72.1\u2019s block)')
      const r = record(sub)
      if (r === null) fail(label, 'the subscription answers a record (\u00a72.1\u2019s GraphSubscription)')
      if (typeof r['unsubscribe'] === 'function') committed++
    }
    const before64 = JSON.stringify(registerRows(store))
    const w = readWrite(store, 'subscribe', ['mem.window.tabs', () => undefined, { subtree: true }], label)
    if (half === 'at the cap') {
      eq(w.status, 'refused', label, `at the cap (\`${String(target)}\` amplifier-form subscriptions) the SAME operation is REFUSED (\u00a72.4 item 6\u2019s RCAP-3)`);
      eq(w.reason, 'cap-exceeded', label, 'the cap\u2019s own declared token')
      eq(w.receipt['events'], 0, label, 'the refused subscription registers NOTHING and invokes no listener')
      eq(JSON.stringify(registerRows(store)), before64, label, 'the register is BYTE-IDENTICAL to its pre-call state')
      return
    }
    eq(w.status, 'committed', label, `ONE ELEMENT BELOW the cap the same operation COMMITS (the positive control)`)
    eq(w.receipt['events'], 0, label, 'NO eviction, FIFO drop, LRU drop, lower-tier clear or event accompanies the acceptance')
    need(committed > 0, label, 'the fill really registered amplifier-form subscriptions')
    return
  }
  const spec = CAP_VALUES[cap]
  if (spec === undefined) fail(label, `the row names the cap \`${cap}\` and this drive has no value for it`)
  const fill = half === 'at the cap' ? spec.value : spec.value - 1
  const root = spec.tier === 'mem' ? 'w' : 'e'
  const rows: Record<string, unknown>[] = []
  for (let i = 0; i < fill + 1; i++) rows.push({ name: `${spec.tier}.${root}${i}.holder` })
  const out = constructStore(surface, { declarations: { rows }, constraints: FIXTURE_CONSTRAINTS, crossing: stubCrossing, enableTestSeam: true })
  need(out.store !== null && !out.threw, label, `the fill\u2019s own declarations LOAD (\u00a72.4 item 5\u2019s positive control); read ${JSON.stringify(out.reason)}`)
  const store = out.store as GraphStoreLike
  for (let i = 0; i < fill; i++) {
    const w = readWrite(store, 'commit', [`${spec.tier}.${root}${i}.holder`, `v${i}`], label)
    eq(w.status, 'committed', label, `the fill commits row ${String(i + 1)} of ${String(fill)}`)
  }
  const before = JSON.stringify(registerRows(store))
  const w = readWrite(store, 'commit', [`${spec.tier}.${root}${fill}.holder`, 'v'], label)
  if (half === 'at the cap') {
    eq(w.status, 'refused', label, `AT THE CAP (\`${String(fill)}\` ${spec.tier}-flagged root rows) the operation is REFUSED (\u00a72.4 item 6)`)
    eq(w.reason, 'cap-exceeded', label, 'the cap\u2019s own declared token')
    eq(JSON.stringify(w.receipt['cleared']), '[]', label, 'the refusal clears NOTHING')
    eq(JSON.stringify(w.receipt['rows']), '[]', label, 'the refusal carries no affected row')
    eq(w.receipt['crossings'], 0, label, 'the refusal crosses NOTHING')
    eq(w.receipt['events'], 0, label, 'the refusal emits NOTHING')
    eq(JSON.stringify(registerRows(store)), before, label, 'the register is BYTE-IDENTICAL to its pre-call state: NO EVICTION, NO FIFO, NO LRU, NO SILENT DROP')
    return
  }
  eq(w.status, 'committed', label, `ONE ELEMENT BELOW the cap (\`${String(fill)}\` rows) the same operation COMMITS (the positive control)`)
  eq(w.receipt['events'], 1, label, 'the acceptance pings its own path exactly once and evicts nothing')
}
function exportDrive(store: GraphStoreLike, shape: string): void {
  const label = `TP-4 (${shape})`
  buildBaselineTree(store, label)
  let name = 'mem.window.tabs'
  if (shape.startsWith('a leaf export')) name = 'mem.window.tabs.landingPage'
  if (shape.startsWith('a subtree export')) name = 'mem.window.tabs'
  if (shape.startsWith('an export of a path with a resident descendant')) name = 'mem.window'
  if (shape.startsWith('a cold item')) name = 'mem.entity.order'
  if (shape.startsWith('a severed path')) {
    readWrite(store, 'commit', ['file.window.other', 'o'], label)
    readWrite(store, 'sever', ['file.window', 'other'], label)
    name = 'file.window.other'
  }
  const first = callStore(store, 'export', [name])
  need(first.error === null, label, '`export` is TOTAL over its declared domain (\u00a72.2 P-5)')
  const firstRecord = record(first.value)
  const second = callStore(store, 'export', [name])
  need(second.error === null, label, 'a second export call answers')
  if (shape.startsWith('a cold item')) {
    need(firstRecord === null || typeof first.value === 'string', label, 'a cold item\u2019s export answers a refusal reason or a record, never a throw (\u00a72.9 item 1)')
    return
  }
  if (firstRecord === null) fail(label, `the export of \`${name}\` answers a FRESH object (\u00a72.9 item 1), read ${JSON.stringify(first.value)}`)
  need(firstRecord !== second.value, label, 'the two exports are DIFFERENT objects: the export is a SNAPSHOT, fresh per call')
  eq(Object.prototype.hasOwnProperty.call(firstRecord, 'cache'), false, label, 'the export carries NO live `cache` handle beyond the caller\u2019s frame (\u00a72.9 item 3)')
  const before = snapshot(store, [name])
  firstRecord['value'] = 'mutated-by-the-caller'
  firstRecord['found'] = 'mutated'
  const after = snapshot(store, [name])
  eq(after[name], before[name], label, 'mutating the export changes NOTHING in the store (\u00a72.9 item 1)')
  const secondRecord = record(second.value) as Record<string, unknown>
  need(secondRecord['value'] !== 'mutated-by-the-caller', label, 'and nothing in the OTHER export either (no aliasing between an export and a store value)')
  if (shape.startsWith('an export on which the caller then writes back')) {
    const writeBack = readWrite(store, 'set', [name, firstRecord], label)
    need(writeBack.status === 'committed' || writeBack.status === 'refused', label, 'writing an export back is NOT a granted authority: it is answered as one of the two declared statuses (\u00a73.2 F-22)')
    eq(readWalk(store, name, label).answer['value'] === firstRecord, false, label, 'the write-back did not make the export authoritative')
  }
}
function severanceDrive(store: GraphStoreLike, cls: string): void {
  const label = `TP-5 (${cls})`
  buildBaselineTree(store, label)
  readWrite(store, 'commit', ['file.window.other', 'o'], label)
  const released: string[] = []
  const events: Record<string, unknown>[] = []
  const recordEvent = (e: unknown): void => {
    const r = record(e)
    if (r !== null) events.push(r)
  }
  const sub = store.subscribe?.('file.window.other', recordEvent)
  need(sub !== undefined, label, 'the subscription member answers a `GraphSubscription` (\u00a72.1\u2019s block, \u00a72.10 item 4)')
  const subRecord = record(sub)
  if (subRecord === null) fail(label, 'the subscription answers a record')
  if (cls.includes('several')) {
    store.subscribe?.('file.window.other', recordEvent)
    store.subscribe?.('file.window.other', recordEvent)
  }
  if (cls.includes('subtree-opted ancestor')) {
    store.subscribe?.('file.window', recordEvent, { subtree: true })
  }
  if (cls.includes('idempotence')) {
    const once = readWrite(store, 'sever', ['file.window', 'other'], label)
    eq(once.status, 'committed', label, 'the first severance commits')
    const twice = readWrite(store, 'sever', ['file.window', 'other'], label)
    eq(twice.status, 'committed', label, 'the idempotence positive control: a link whose target is already severed answers a receipt, never a throw')
    eq(twice.receipt['events'], 0, label, 'and it reports no further release: nothing was released a second time')
    return
  }
  const w = readWrite(store, 'sever', ['file.window', 'other'], label)
  eq(w.status, 'committed', label, 'the severance commits (\u00a72.10 item 3)')
  const cleared = asArray(w.receipt['cleared']).map((v) => String(v))
  const severedEvents = events.filter((e) => e['cause'] === 'severed')
  if (cls.startsWith('a mem/temp-flagged node')) {
    need(w.receipt['events'] === 0 || severedEvents.length === Number(w.receipt['events']), label, 'the receipt\u2019s own `events` count matches the severed events the listeners received (\u00a72.10 item 5)')
    return
  }
  eq(severedEvents.length, 1, label, 'EXACTLY ONE declared `cause:\'severed\'` event PER RELEASED reference (a silent disappearance or more than one event for one reference FAILS, F-11)')
  eq(severedEvents[0]?.['name'], 'file.window.other', label, 'the event names the RELEASED reference in its own `name`')
  need(cleared.includes('file.window.other'), label, 'the severing receipt\u2019s `cleared[]` NAMES the released reference (\u00a72.10 item 3)')
  const after = readWalk(store, 'file.window.other', label)
  need(after.refused && after.reason === 'severed-link', label, 'after the severance the released reference no longer answers a value')
}
function scanDrive(surface: Surface): void {
  const label = 'TP-5 — the scan drive'
  const corpora: [string, string | null][] = [
    ['store-core-graph.ts', bytesOf(STORE_SRC_PATH)],
    ['store-graph-references.ts', bytesOf(REFS_SRC_PATH)],
    ['this unit\u2019s test file', bytesOf(TEST_FILE_PATH)],
    ['the register module', bytesOf(REGISTER_MODULE_PATH)],
  ]
  need(surface.storeModule !== null || corpora[0][1] !== null, label, 'the store module\u2019s corpus exists (`\u00a73.4` R-1/R-7 scan scope)')
  for (const [name, bytes] of corpora) {
    need(bytes !== null, label, `the scan\u2019s corpus \`${name}\` is readable; the absent module is DATA here, and \u00a74.1\u2019s RED branch is the reason the absent corpus cannot be scanned yet`)
    eq(vocabularyScan(bytes as string), [], label, `\`${name}\` carries no consumer vocabulary as the store\u2019s own (\u00a73.4 R-1)`)
    eq(instrumentScan(bytes as string), [], label, `\`${name}\` carries no element/geometry/clock instrument (\u00a73.4 R-7/R-8)`)
  }
  need(vocabularyScan(SYNTHETIC_SCAN_CORPUS).length > 0, label, 'the synthetic corpus carrying a banned consumer token MUST FAIL the declared scan (positive control)')
  need(instrumentScan(SYNTHETIC_SCAN_CORPUS).length > 0, label, 'and the SAME corpus carries a geometry-shaped read, so the instrument\u2019s silence over the real corpora is a reading and not a dead scan')
  eq(vocabularyScan('a well-formed sentence about a caller and its value'), [], label, 'the NEGATIVE control: ordinary wording PASSES')
}
function censusDrive(fixture: string): void {
  const label = `TP-6 (${fixture})`
  const storeBytes = bytesOf(STORE_SRC_PATH)
  const refsBytes = bytesOf(REFS_SRC_PATH)
  if (fixture === 'the two real modules') {
    need(storeBytes !== null && refsBytes !== null, label, 'the two real modules are readable on disk (\u00a75.1 rows 1/2)')
    const store = moduleCensus(storeBytes as string)
    const refs = moduleCensus(refsBytes as string)
    eq(store.imports.filter((s) => !s.includes('store-graph' + '-references')), [], label, '`store-core-graph.ts` carries EXACTLY ONE non-type import and NO other (\u00a73.4 R-11)')
    eq(store.imports.filter((s) => s.includes('store-graph' + '-references')).length, 1, label, 'the one import is the input module')
    eq(refs.imports, [], label, '`store-graph-references.ts` imports NOTHING at all')
    for (const banned of ['provident-ssr', 'electron', 'src/main', 'src/shared', 'store-core.js', 'store-references.js']) {
      need(!(storeBytes as string).includes(`from '${banned}`) && !(refsBytes as string).includes(`from '${banned}`), label, `neither module imports \`${banned}\` (\u00a72.2 P-11)`)
    }
    eq(store.moduleBindings, [], label, 'the store carries no module-level binding holding a store, a graph, a register, a cache, a listener set or the seam flag (\u00a73.4 R-12)')
    eq(refs.moduleBindings, [], label, 'and the input module carries none')
    need(store.topLevelDeclarations > 0 && refs.topLevelDeclarations > 0, label, 'the census read NAMED declarations out of both modules, so its verdicts are not vacuous')
    return
  }
  const fixtureBytes = fixture.startsWith('a fixture adding a second import')
    ? "import x from '" + 'provident-ssr' + "'\nimport y from './store-graph" + "-references.js'\n"
    : fixture.startsWith('a fixture importing')
      ? "import x from '../main/" + "main.js'\n"
      : fixture.startsWith('a fixture with a module-scope store binding')
        ? 'const store = createGraphStore({})\n'
        : 'const someListeners: unknown[] = []\n'
  const census = moduleCensus(fixtureBytes)
  if (fixture.startsWith('a fixture adding a second import')) {
    need(census.imports.length > 1, label, 'a second import statement FAILS this census (positive control)')
    return
  }
  if (fixture.startsWith('a fixture importing')) {
    need(census.imports.some((s) => s.includes('src/main') || s.includes('main.js')), label, 'a `src/main/**` import FAILS this census (positive control)')
    return
  }
  need(census.moduleBindings.length > 0, label, `the fixture\'s module-level binding FAILS this census (positive control): read ${JSON.stringify(census.moduleBindings)}`)
}
function mergeDrive(store: GraphStoreLike, shape: string, half: 'parts' | 'triple'): void {
  const label = `TP-7 (${shape} \u00b7 ${half})`
  const read = 'entity'
  if (shape.startsWith('a file-held child only')) {
    readWrite(store, 'commit', [`file.${read}.child`, 'f'], label)
  } else if (shape.startsWith('a file-held child plus a temp-held grandchild')) {
    readWrite(store, 'commit', [`file.${read}.child`, 'f'], label)
    readWrite(store, 'commit', [`temp.${read}.child.grand`, 't'], label)
  } else if (shape.startsWith('the same path held in file AND temp')) {
    readWrite(store, 'commit', [`file.${read}.child`, 'f'], label)
    readWrite(store, 'commit', [`temp.${read}.child`, 't'], label)
  } else if (shape.startsWith('the same path held at TWO tiers AND a descendant')) {
    readWrite(store, 'commit', [`file.${read}.child`, 'f'], label)
    readWrite(store, 'commit', [`temp.${read}.child`, 't'], label)
    readWrite(store, 'commit', [`file.${read}.child.grand`, 'g'], label)
  } else if (shape.startsWith('a node holding the read path with a held descendant')) {
    readWrite(store, 'commit', [`file.${read}.child`, 'f'], label)
    readWrite(store, 'commit', [`temp.${read}.child.grand`, 't'], label)
  }
  const readName = shape.startsWith('a node holding the read path') ? `file.${read}.child` : `file.${read}`
  const w = readWalk(store, readName, label)
  if (shape.startsWith('a cold item')) {
    need(w.refused || isMiss(w), label, 'a cold item with NO held descendant draws the DECLARED MISS, never a merge (\u00a72.5 item 4)')
    eq(isMerged(w), false, label, 'and never the merged arm')
    return
  }
  if (shape.startsWith('a node holding the read path')) {
    eq(isMerged(w), false, label, 'a node holding the read path means NO MERGE RUNS: the first-hit arm answers (\u00a73.2 F-8)')
    eq(w.answer['found'], true, label, 'and it is a HIT')
    eq(Object.prototype.hasOwnProperty.call(w.answer, 'parts'), false, label, '`parts` is ABSENT on the hit arm')
    return
  }
  need(isMerged(w), label, 'a path NO node holds whose DESCENDANTS are held answers the MERGED arm (\u00a72.5 item 4)')
  const parts = asArray(w.answer['parts'])
  if (half === 'parts') {
    need(parts.length > 0, label, '`parts` is NON-EMPTY on the merged arm')
    const order: string[] = []
    for (const part of parts) {
      const p = record(part)
      if (p === null) fail(label, 'every `parts` entry is a `GraphPart` record (\u00a72.1\u2019s block)')
      const tier = String(p['tier'])
      order.push(tier)
      need(tier !== 'secure', label, 'no `parts` entry names the secure tier: it carries no graph node')
      need(typeof p['path'] === 'string' && (p['path'] as string).length > 0, label, 'every entry names a PATH')
      eq(p['path'] === readName, false, label, 'every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path')
      const held = flagsOfName(store, String(p['path']), label)
      need(held.includes(tier), label, `the entry\u2019s own tier \`${tier}\` really HOLDS \`${String(p['path'])}\``)
    }
    const rank = order.map((t) => DURABILITY_RANK[t] ?? 0)
    for (let i = 1; i < rank.length; i++) {
      need((rank[i] as number) <= (rank[i - 1] as number), label, `\`parts\` is ORDERED by the overlay order (file \u2192 mem \u2192 temp), read ${JSON.stringify(order)}`)
    }
    return
  }
  eq(w.answer['tier'], null, label, 'the merged arm carries `tier: null`')
  eq(w.answer['merged'], true, label, 'and `merged: true`')
  eq(w.answer['cache'], null, label, 'and `cache: null`: no live handle on a composite no node holds')
  const before = snapshot(store, [readName])
  const value = record(w.answer['value'])
  if (value !== null) value['mutated'] = true
  const after = snapshot(store, [readName])
  eq(after[readName], before[readName], label, 'the merged value is NON-AUTHORITATIVE: a mutation of it changes NOTHING in the store (\u00a72.5 item 4)')
}

// ---- THE SCAN CONTROLS (`§5.5.1` `P-GR-TP-5`'s synthetic corpus) ------------------------
/** THE SYNTHETIC CORPUS the register's `P-GR-TP-5` scan drive uses as its POSITIVE
 *  control: it carries a banned consumer token AND a magnitude claim, and it MUST
 *  FAIL the declared scan. Held here — the register's own module — so the TEST
 *  FILE, which IS a scan corpus, stays clean of the very tokens its rules name
 *  (a rule list that reads as its own hit is the vacuity `§3.4` `R-2` refuses). */
export const SYNTHETIC_SCAN_CORPUS =
  'a pane whose element carries a magnitude of 40 and a ' + 'getBounding' + 'ClientRect read for its own row'

// ---- THE EXECUTION, WITH THE CAPS AND THE STOP RULE (`§5.5` items 3/5) ------------------
/** Runs the register: rows SEQUENTIALLY IN REGISTER ORDER, each drive counted as
 *  ONE attempt, with the two caps and the stop-after-5-consecutive-failures rule.
 *  A row that never ran is `un-run` and is reported as a FAILURE by the caller. */
export async function runRegister(): Promise<RegisterReport> {
  const surface = await resolveRegisterSurface()
  const rows: RowReport[] = []
  const registerReasons: string[] = []
  let consecutiveFailures = 0
  let stoppedAtRow: string | null = null
  let stopReason: string | null = null
  let attemptsExecuted = 0
  let rowsExecuted = 0
  let rowsHeld = 0
  let rowsBroken = 0

  for (const row of REGISTER_ROWS) {
    if (stoppedAtRow !== null) {
      rows.push({
        id: row.id, type: row.type, domain: row.domain, strategyId: row.strategyId,
        declaredTerm: row.term, attemptsRun: 0, abandoned: row.term, held: 0, broken: 0,
        state: 'un-run', bounded: row.bound === 'bounded', readings: [],
      })
      continue
    }
    let held = 0
    let broken = 0
    const readings: string[] = []
    let stoppedInsideRow = false
    for (const drive of row.drives) {
      if (consecutiveFailures >= STOP_AFTER_CONSECUTIVE) {
        stoppedInsideRow = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures reached; the running row's remaining attempts were abandoned and NO further row started (§5.5 item 3)`
        break
      }
      attemptsExecuted++
      const store = makeStore(surface)
      if (store === null) {
        broken++
        consecutiveFailures++
        readings.push(`BROKEN — ${drive.label}: ${surface.reason ?? 'the store could not be constructed'}`)
        continue
      }
      try {
        drive.run(store, surface)
        held++
        consecutiveFailures = 0
      } catch (e) {
        broken++
        consecutiveFailures++
        readings.push(`BROKEN — ${drive.label}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }
    rowsExecuted++
    if (broken === 0 && !stoppedInsideRow) rowsHeld++
    else rowsBroken++
    const state: RowReport['state'] = broken === 0 && !stoppedInsideRow ? 'held' : 'broken'
    if (state === 'broken') registerReasons.push(`${row.id} (${row.strategyId}) — ${broken} broken of ${held + broken} attempted`)
    rows.push({
      id: row.id, type: row.type, domain: row.domain, strategyId: row.strategyId,
      declaredTerm: row.term, attemptsRun: held + broken, abandoned: row.term - (held + broken), held, broken,
      state, bounded: row.bound === 'bounded', readings,
    })
  }

  const total = declaredTotalReport()
  const perRowMax = Math.max(...DECLARED_TERMS)
  const perRowMaxRow = REGISTER_ROWS[DECLARED_TERMS.indexOf(perRowMax)]?.id ?? ''
  return {
    rows,
    declaredTotal: total.sum,
    declaredTerms: total.terms,
    chain: total.chain,
    attemptsExecuted,
    rowsExecuted,
    rowsHeld,
    rowsBroken,
    unrunRows: rows.filter((r) => r.state === 'un-run').map((r) => r.id),
    unrunAreFailures: true,
    stoppedAtRow,
    stopReason,
    declaredTotalAgainstCap: '<= 400',
    declaredPerRowMax: perRowMax,
    declaredPerRowMaxRow: perRowMaxRow,
    declaredPerRowFigures: rows.map((r) => ({
      id: r.id, declaredTerm: r.declaredTerm, attemptsRun: r.attemptsRun, abandoned: r.abandoned,
    })),
    registerReasons,
  }
}
