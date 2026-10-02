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

import { existsSync } from 'node:fs'
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
 *  member reddens the row that drives it instead of failing the file. */
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
  reset?: () => void
  seed?: (rows: readonly unknown[]) => void
  parentLinkCountOf?: (nodeRef: string) => number
  cacheEntryFor?: (name: string) => unknown
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
 *  is not callable, and every caller must report that as its own reason. */
export function makeStore(surface: Surface, options?: unknown): GraphStoreLike | null {
  if (surface.createGraphStore === null) return null
  try {
    const store = surface.createGraphStore(options)
    return store === null || typeof store !== 'object' ? null : store
  } catch {
    return null
  }
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

export const REGISTER_ROWS: readonly RegisterRow[] = [
  {
    id: 'P-GR-IM-1', type: 'P-IM',
    domain: 'THE TREE INVARIANT — for every node the graph has ever minted, the parent-link count is EXACTLY 1, after a mint, a re-tier, a downward remove, a clear, a sweep and a severance',
    strategyId: 'S-GR-TREE-1', term: 6, bound: 'enumerated',
    assertions: ['the 4 node classes (top-level · intermediate · leaf · regenerated) are asserted over the same 6 drives'],
    compensating: ['M-10', 'F-23', 'I-2', 'R-2'],
    drives: ['mint', 're-tier', 'downward remove', 'clear', 'sweep', 'severance'].map((op) => ({
      label: `IM-1 (${op}) — the parent-link census over every minted node reads 1`,
      run: (store: GraphStoreLike) => {
        if (typeof store.parentLinkCountOf !== 'function') throw new Error('the seam member `parentLinkCountOf` is absent (§2.1\u2019s test-only seam)')
        const seen = (store as unknown as { __minted?: string[] }).__minted ?? []
        if (seen.length === 0) throw new Error('no node was ever minted, so the census has no subject')
        for (const ref of seen) {
          const count = store.parentLinkCountOf(ref)
          if (count > 1) throw new Error(`node ${ref} carries ${count} parent links; the tree invariant allows exactly 1`)
        }
      },
    })),
  },
  {
    id: 'P-GR-IM-2', type: 'P-IM',
    domain: 'ANCHOR IMMUTABILITY AND FLAG IMMUTABILITY — every anchor object\u2019s `key`/`link` are unchanged across an operation, and a node\u2019s `flag` changes only together with a NEW `ref`',
    strategyId: 'S-GR-IMMUT-1', term: 12, bound: 'enumerated',
    assertions: ['the 6 anchor/flag reads (written node\u2019s anchor · a sibling\u2019s anchor · an ancestor\u2019s anchor · the leaf\u2019s flag · the root\u2019s flag · a regenerated node\u2019s ref) are 6 ASSERTIONS per drive'],
    compensating: ['M-10', 'M-9', 'I-5', 'F-6'],
    drives: ['mint', 'set', 'commit', 'remove', 'severance', 'regeneration'].flatMap((op) => [
      { label: `IM-2 (${op}) — the anchor objects read before/after are UNCHANGED`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-2 (${op}) — the node flag changed only with a NEW ref`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-IM-3', type: 'P-IM',
    domain: 'THE PER-(LOGICAL PATH, TIER) UNIQUENESS — at most ONE node holds a pair; a repeat is an EDIT or a loud \u2018duplicate-path-tier\u2019, never a second node',
    strategyId: 'S-GR-UNIQ-1', term: 6, bound: 'enumerated',
    assertions: ['the EDIT/REFUSE/second-tier forms are ASSERTIONS over the same 6 drives'],
    compensating: ['M-6', 'F-12', 'I-3', '§2.7 item 4'],
    drives: ['file.entity.order', 'mem.entity.id.working', 'temp.entity.id.candidate', 'file.entity.pinned', 'mem.entity.order', 'temp.entity.order'].map((p) => ({
      label: `IM-3 (${p}) — one commit per pair, and the pair holds exactly one node`,
      run: () => { throw new Error('drive not evaluated: the module is absent') },
    })),
  },
  {
    id: 'P-GR-IM-4', type: 'P-IM',
    domain: 'THE REGISTER\u2019S PROJECTION IDENTITY — the count of register rows EQUALS the count of ROOT (parentless) nodes; EVERY row\u2019s `derived` is `true`; a COLD root name has NO ROW (the row\u2019s absence is the assertion)',
    strategyId: 'S-GR-PROJ-1', term: 6, bound: 'enumerated',
    assertions: ['the parentless-node count and the cold-item reading are ASSERTED BESIDE the row count (§5.5.1\u2019s ruling on this row)'],
    compensating: ['M-4', 'F-2', 'I-4', '§2.4 item 3'],
    drives: ['cold', 'one root', 'two roots', 'a root plus a descendant', 'a severed root', 'a re-projected root'].map((state) => ({
      label: `IM-4 (${state}) — rows = R (the root count), every row derived:true, and a cold root name has no row`,
      run: () => { throw new Error('drive not evaluated: the module is absent') },
    })),
  },
  {
    id: 'P-GR-IM-5', type: 'P-IM',
    domain: 'THE TWO-PART CACHE INVALIDATION, EXHAUSTIVELY — any register change OR any change to a link\u2019s anchor set invalidates every affected entry, and NO OTHER operation invalidates one',
    strategyId: 'S-GR-CACHE-1', term: 12, bound: 'enumerated',
    assertions: ['the UNTOUCHED entry is the POSITIVE CONTROL and must SURVIVE; the register change and the anchor-set change are read in ONE drive each, with the two untouched-entry controls as ASSERTIONS (§5.5.3\u2019s corrected column)'],
    compensating: ['M-11', 'F-6', 'I-14', 'R-5'],
    drives: ['commit (register change)', 'remove', 'clear (an invalidator by the rule\u2019s own words)', 'regeneration', 'severance', 'a read (which must invalidate NOTHING)'].flatMap((op) => [
      { label: `IM-5 (${op}) — the register entry reads invalid where the rule says so`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-5 (${op}) — the link entry reads invalid where the rule says so`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-IM-6', type: 'P-IM',
    domain: 'THE REGISTER\u2019S CONSTRUCTION-TIME REFUSAL SET IS CLOSED AT SIX ARMS, each with a NAMED POSITIVE CONTROL, and a refused input leaves NO store',
    strategyId: 'S-GR-REG-1', term: 12, bound: 'enumerated',
    assertions: ['the absence-of-store assertion and the re-order drive are ASSERTIONS over the same drives (§5.5.3\u2019s corrected column; §2.4 item 5\u2019s six arms with their subjects)'],
    compensating: ['F-18', 'F-2', 'R-4', '§2.4 item 5'],
    drives: [
      '(a) malformed-name — a top-level name carrying no name/non-string/empty',
      '(b) secure-refused — a declared row whose first segment is `secure`',
      '(c) undeclared-name — a DOUBLED top-level name (the held G-2 class)',
      '(d) reserved-namespace — a name colliding with a reserved namespace key',
      '(e) duplicate-path-tier — the WRITE side, the only half with a subject',
      '(f) malformed-pattern — a TOP-LEVEL pattern that is malformed or ambiguous',
    ].flatMap((arm) => [
      { label: `IM-6 ${arm} — the refusal drive answers the arm\u2019s OWN token (a GraphLoadError)`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-6 ${arm} — its NAMED POSITIVE CONTROL loads`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-IM-7', type: 'P-IM',
    domain: 'THE WALK\u2019S PRECEDENCE IS TOTAL AND ORDERED — secure → malformed → undeclared → the leaf miss → the filter miss → the answer; the reason reported is the FIRST that applies',
    strategyId: 'S-GR-PREC-1', term: 12, bound: 'enumerated',
    assertions: ['the unqualified/agreeing/disagreeing read forms and the tier-local get/has pair are ASSERTIONS over the read-side and write-side drives (§5.5.3)'],
    compensating: ['F-1', 'F-3', 'F-4', 'F-14', 'R-4'],
    drives: [
      'secure (a `secure.*` undeclared name answers secure-refused and NEVER undeclared-name)',
      'malformed',
      'undeclared',
      'the resolved leaf miss',
      'the filter miss (a chain that never reached a leaf answers no-such-anchor and NEVER tier-filter-miss)',
      'the answer',
    ].flatMap((cls) => [
      { label: `IM-7 (${cls}) — the READ-side drive reports the FIRST reason that applies`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-7 (${cls}) — the WRITE-side drive reports the same first-applying reason`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
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
      run: () => { throw new Error('drive not evaluated: the module is absent') },
    })),
  },
  {
    id: 'P-GR-IM-9', type: 'P-IM',
    domain: 'THE COMMIT REGENERATES THE WHOLE SUBTREE AND DELETES THE ORIGINAL ONLY ON A MATCH — the set is the node AND every descendant, each re-tiered; the census matches; the original is deleted LAST; a mismatch leaves the original ALIVE; the three-arm refusal set is asserted over the same drives',
    strategyId: 'S-GR-REGEN-1', term: 12, bound: 'enumerated',
    assertions: ['the corroborating segment-total reading is asserted BESIDE the comparison (M-12); the third token (\u2018validate-failed\u2019) is an ASSERTION beside the 2 outcomes, not a third outcome-drive'],
    compensating: ['M-11', 'M-12', 'F-9', '§5.5.1 P-GR-SM-1'],
    drives: ['a leaf-only subtree', 'a root plus one child', 'a root plus a grandchild', 'a three-level subtree', 'a subtree with two siblings', 'a re-tiered subtree'].flatMap((shape) => [
      { label: `IM-9 (${shape}) — the census MATCHED: the original is gone and the regenerated set is live`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-9 (${shape}) — the census MISMATCHED: the original is ALIVE and nothing was deleted`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-IM-10', type: 'P-IM',
    domain: 'THE TEST SEAM\u2019S SHAPE AND ITS PRODUCTION-NEGATIVE ROW — with {enableTestSeam:true} all four members are callable; WITHOUT it all four keys are ABSENT and the store\u2019s key set is exactly the interface\u2019s declared members; reset() clears the graph/register/both caches and releases every subscription emitting NO event; seed(rows) drives the ORDINARY write path; each seam call without the seam THROWS',
    strategyId: 'S-GR-SEAM-1', term: 4, bound: 'enumerated',
    assertions: ['the seam-ABSENT key-set assertion and the seam-less THROW are ASSERTIONS per member (§5.5.3\u2019s corrected column)'],
    compensating: ['F-24', '§3.4 R-12', '§5.5.1 P-GR-IM-12'],
    drives: ['reset', 'seed', 'parentLinkCountOf', 'cacheEntryFor'].map((member) => ({
      label: `IM-10 (${member}) — callable with the seam, ABSENT without it, and it THROWS when the seam was not enabled`,
      run: () => { throw new Error('drive not evaluated: the module is absent') },
    })),
  },
  {
    id: 'P-GR-IM-11', type: 'P-IM',
    domain: 'THE FLAG IS MINTED BY `commit` ALONE — `commit` MINTS a node whose flag equals the requested tier and RE-MINTS by regeneration; `set` never mints and never changes a flag; a `set` on a path with no node is REFUSED \u2018undeclared-name\u2019; the filter reads the node\u2019s OWN flag',
    strategyId: 'S-GR-FLAG-1', term: 4, bound: 'enumerated',
    assertions: ['the flag reading, the post-`set` reading and the filter\u2019s comparison are ASSERTIONS per drive (§5.5.3)'],
    compensating: ['M-9', 'F-4', 'I-5', '§0A note 4'],
    drives: ['commit mints', 'set on a path with no node', 'set on a resident pair', 'the filter\u2019s comparison'].map((op) => ({
      label: `IM-11 (${op}) — the minted flag equals the requested tier and no flag is ever rewritten in place`,
      run: () => { throw new Error('drive not evaluated: the module is absent') },
    })),
  },
  {
    id: 'P-GR-IM-12', type: 'P-IM',
    domain: 'THE LOAD-CYCLE ROW — resolve → LOAD (`loadEnvelope` or `loadDoc`) → resolve answers IDENTICALLY, with NO REBUILD and NO declared write in between',
    strategyId: 'S-GR-LOAD-1', term: 6, bound: 'bounded',
    assertions: ['(bounded): the property says ANY load while the drive performs the two NAMED loads; the universal is NOT proven by this row and no reader may read it as its proof. The 4 further steps (read the entry, resolve again, read the entry again, compare structurally) are ASSERTIONS per drive (§5.5.3). The [H] drive names src/renderer/runtime.ts:loadEnvelope and :loadDoc; this row is the ONE [H]-driven row (§3.5 R-13)'],
    compensating: ['M-1', 'M-3', 'F-6', '§2.6 item 6', '§3.5 R-13'],
    drives: ['the fixture path resolved', 'the fixture path resolved', 'the fixture path resolved'].flatMap((state, i) => [
      { label: `IM-12 (state ${i + 1}) — the load named loadEnvelope leaves the answer identical with no rebuild`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `IM-12 (state ${i + 1}) — the load named loadDoc leaves the answer identical with no rebuild`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-IM-13', type: 'P-IM',
    domain: 'THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL with the CANONICAL STRUCTURAL COMPARATOR — for every (store state, call) pair the answer is IDENTICAL across two runs whose ONLY difference is the store\u2019s tier state, and the read path mutates NO cache entry',
    strategyId: 'S-GR-DIFF-1', term: 40, bound: 'enumerated',
    assertions: ['the cache-entry reading taken BETWEEN the two runs; `parts` ABSENT compared as ABSENT; a `cache` compared BY IDENTITY against the same handle; found/tier/flag/merged/name by value (§2.6 item 6). THIS ROW IS THE PER-ROW MAXIMUM (40 \u2264 100)'],
    compensating: ['M-3', 'M-16', 'F-6', 'R-5', '§0A note 3'],
    drives: ['all cold', 'a `temp` shadow over a `mem` holder', 'a `mem` shadow over a `file` holder', 'a cold item (a declared root name with no row yet)', 'a severed path']
      .flatMap((state) => ['an unqualified resolve', 'a qualified resolve', 'the tier-local get', 'the tier-local has'].flatMap((call) => [
        { label: `IM-13 (${state} · ${call}) — run 1 of 2 (each run IS a drive)`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
        { label: `IM-13 (${state} · ${call}) — run 2 of 2, the answer identical and no entry mutated`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      ])),
  },
  {
    id: 'P-GR-IM-14', type: 'P-IM',
    domain: 'MONOTONIC PERSISTENCE — for EVERY parent link, durability(child) \u2264 durability(parent) under the ordering `file` > `mem` > `temp`; `secure` is a separate main-side collection OUTSIDE the ordering carrying no graph node; the invariant is VACUOUS AT A ROOT; a violation is REFUSED with a RETURNED RECORD `reason:\u2019durability-inversion\u2019` (cleared: [], repaired: [], rows: [], crossings: 0, events: 0) with the store LEFT COMPLETELY UNCHANGED',
    strategyId: 'S-GR-PERSIST-1', term: 16, bound: 'enumerated',
    assertions: ['driven as the STATE-MACHINE/TOTALITY PAIR over the four tokens in ONE drive per pair, both legs asserted together: the STATE-MACHINE LEG over the 9 ordered pairs of the ordered three (the transition attempted and its outcome read) and the TOTALITY LEG over the 7 `secure`-involving pairs (4 + 4 \u2212 1 = 7, each DECIDED as a refusal because `secure` carries no graph node); 9 + 7 = 16 = 4 \u00d7 4. The POSITIVE control is a DOWNWARD re-tier of a whole subtree (LEGAL); the NEGATIVE control is a child minted or regenerated ABOVE its parent\u2019s flag (REFUSED, store unchanged)'],
    compensating: ['M-10', 'M-11', 'M-12', 'F-9', 'I-2', 'I-5', '§2.4 item 7(h)', '§2.8 item 5'],
    drives: TOKENS.flatMap((parent) => TOKENS.map((child) => ({
      label: `IM-14 (parent ${parent} \u00b7 child ${child}) — the (parent, child) transition attempted and its outcome read`,
      run: (_store: GraphStoreLike, _surface: Surface) => { throw new Error('drive not evaluated: the module is absent') },
    }))),
  },
  {
    id: 'P-GR-SM-1', type: 'P-SM',
    domain: 'THE REGENERATION TRANSACTION IS A CLOSED FIVE-STEP MACHINE WITH ONE DECLARED FAILURE TERMINAL — BUILD → COMPARE → SERIALIZE → VALIDATE → ACCEPT (ACCEPT carrying the delete-on-match), with NO reachable state in which the original is deleted on a mismatch, no reachable state in which a partial subtree is live, and every terminal reachable',
    strategyId: 'S-GR-TXN-1', term: 15, bound: 'enumerated',
    assertions: ['the terminal set stays 3 (REGENERATED · REFUSED-ORIGINAL-ALIVE · ANSWERED-FROM-THE-ORIGINAL); the two added steps (SERIALIZE, VALIDATE) and the three refusal tokens (rebuild-failed · serialize-failed · validate-failed) are ASSERTED beside the same drives (§5.5.1\u2019s closing amendment block)'],
    compensating: ['M-11', 'F-9', 'F-10', '§2.8 items 5/6'],
    drives: ['the commit that regenerates', 'the comparison', 'the delete-on-match', 'the mismatch refusal', 'the concurrent `remove` inside the window']
      .flatMap((cls) => ['REGENERATED', 'REFUSED-ORIGINAL-ALIVE', 'ANSWERED-FROM-THE-ORIGINAL'].map((terminal) => ({
        label: `SM-1 (${cls} · ${terminal}) — the terminal reached and the machine\u2019s closed shape read`,
        run: () => { throw new Error('drive not evaluated: the module is absent') },
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
        run: () => { throw new Error('drive not evaluated: the module is absent') },
      })),
    ),
  },
  {
    id: 'P-GR-TP-2', type: 'P-TP',
    domain: 'HOSTILE SEGMENTS ARE DATA, and R-9\u2019s re-pointed control is NOT VACUOUS — \u2018__proto__\u2019 / \u2018constructor\u2019 / \u2018toString\u2019 (and a non-string, and \u2018\u2019) are compared as STRINGS and never used as a prototype key; the POSITIVE control is that a store whose name→target dictionary is a PLAIN OBJECT FAILS in the same drive; the NEGATIVE control is that the same drive on the declared structure PASSES',
    strategyId: 'S-GR-HOSTILE-1', term: 16, bound: 'enumerated',
    assertions: ['the dictionary\u2019s own membership reading is an ASSERTION per input (§5.5.3\u2019s corrected column); the plain-object control is the held §3a seed ADV-SC-1\u2019s exact shape'],
    compensating: ['M-8', 'F-25', 'I-2', 'I-12', 'R-2', '§3.4 R-9'],
    drives: HOSTILE_INPUTS.flatMap((input) => [
      { label: `TP-2 (${JSON.stringify(input)}) — a resolve treats the segment as DATA`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `TP-2 (${JSON.stringify(input)}) — a write through the segment treats it as DATA`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
  {
    id: 'P-GR-TP-3', type: 'P-TP',
    domain: 'THE CAP NON-DESTRUCTIVE POSTURE — at the cap the operation is REFUSED with reason \u2018cap-exceeded\u2019, cleared: [], rows: [], crossings: 0, events: 0 and the register BYTE-IDENTICAL to its pre-call state; ONE ELEMENT BELOW the cap the same operation COMMITS; and NO eviction, FIFO drop, LRU drop, lower-tier clear or event ever accompanies an overflow',
    strategyId: 'S-GR-CAP-1', term: 6, bound: 'enumerated',
    assertions: ['a DISTINCT figure is carried BESIDE this term: the 6 drives observe 3 distinct outcomes, because the refusal and the acceptance are the same two shapes for each cap'],
    compensating: ['F-13', 'M-4', 'I-14', '§2.4 item 6'],
    drives: ['RCAP-1 (mem-flagged root rows \u2264 1024)', 'RCAP-2 (temp-flagged root rows \u2264 4096)', 'RCAP-3 (amplifier-form subscriptions \u2264 64)']
      .flatMap((cap) => ['at the cap', 'one below the cap'].map((half) => ({
        label: `TP-3 (${cap} \u00b7 ${half}) — the declared outcome read and the register compared byte-identically`,
        run: () => { throw new Error('drive not evaluated: the module is absent') },
      }))),
  },
  {
    id: 'P-GR-TP-4', type: 'P-TP',
    domain: 'THE EXPORT\u2019S SNAPSHOT TOTALITY AND ITS LOCAL-ONLY CROSSING RULE — for EVERY export drive the answer is a fresh NON-AUTHORITATIVE object whose members are self-contained: no live `cache` beyond the caller\u2019s frame, no aliasing to a store value, no authority, and a mutation of the export changes NOTHING in the store',
    strategyId: 'S-GR-EXPORT-1', term: 6, bound: 'enumerated',
    assertions: ['the three claims (freshness/identity · non-authority/aliasing · no live handle beyond the frame) are ASSERTIONS per drive (§5.5.3\u2019s corrected column)'],
    compensating: ['M-15', 'F-8', 'F-22', 'I-17', '§2.9'],
    drives: ['a leaf export', 'a subtree export', 'an export of a path with a resident descendant (the boundary case)', 'a cold item\u2019s export', 'a severed path\u2019s export', 'an export on which the caller then writes back']
      .map((shape) => ({
        label: `TP-4 (${shape}) — a fresh non-authoritative object, members self-contained`,
        run: () => { throw new Error('drive not evaluated: the module is absent') },
      })),
  },
  {
    id: 'P-GR-TP-5', type: 'P-TP',
    domain: 'THE SEVERANCE\u2019S EVENT AND RELEASE, AND THE NO-VOCABULARY / NO-GEOMETRY SCAN WITH ITS CONTROLS — a severance emits EXACTLY ONE declared \u2018severed\u2019 event PER RELEASED reference, its subscription count goes to 0, the receipt names it; and the scan\u2019s verdict over the modules\u2019 and the test file\u2019s corpora is the declared one, with both positive controls FAILING as declared',
    strategyId: 'S-GR-SEVER-1', term: 10, bound: 'enumerated',
    assertions: ['two drives per class: the SEVERANCE drive and the SCAN drive; the receipt\u2019s cleared[] and the no-instrument-claims-geometry reading are ASSERTIONS per drive (§5.5.3). The 4 scan corpora are store-core-graph.ts · store-graph-references.ts · the test file · a synthetic corpus carrying a banned token and a ' + 'magni' + 'tude claim (which MUST FAIL)'],
    compensating: ['F-11', 'F-14', 'F-15', 'M-17', 'R-1', 'R-7', 'R-8'],
    drives: ['a file-flagged node with one subscriber', 'with several', 'with a subtree-opted ancestor subscriber', 'a mem/temp-flagged node', 'a link whose target is already severed (the idempotence positive control)']
      .flatMap((cls) => [
        { label: `TP-5 (${cls}) — the severance drive: one severed event per released reference, count to 0`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
        { label: `TP-5 (${cls}) — the scan drive: the declared verdict over the four corpora`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      ]),
  },
  {
    id: 'P-GR-TP-6', type: 'P-TP',
    domain: 'THE IMPORT / NO-MODULE-LEVEL-BINDING CENSUS — store-core-graph.ts carries EXACTLY ONE non-type import (`./store-graph-references.js`), store-graph-references.ts imports nothing, NEITHER imports the vendored package or src/main/** or the held modules, and NEITHER carries a module-level mutable binding holding a store, a graph, a register, a cache, a listener set or the seam flag',
    strategyId: 'S-GR-CENSUS-1', term: 5, bound: 'enumerated',
    assertions: ['one census per fixture: the import statements · the top-level declarations · the module-level bindings. The 5 fixtures are the two real modules · a fixture adding a second import statement · a fixture importing src/main/** · a fixture with a module-scope store binding'],
    compensating: ['§3.4 R-11', '§3.4 R-12', 'I-13', '§2.1 item 1'],
    drives: ['the two real modules', 'a fixture adding a second import statement', 'a fixture importing src/main/**', 'a fixture with a module-scope store binding', 'a fixture carrying a module-level listener set']
      .map((fixture) => ({
        label: `TP-6 (${fixture}) — the census read NAME-COMPLETE`,
        run: () => { throw new Error('drive not evaluated: the module is absent') },
      })),
  },
  {
    id: 'P-GR-TP-7', type: 'P-TP',
    domain: 'THE MERGED READ AND ITS `parts` SURVIVE AND ARE TOTAL — for EVERY merged drive, `parts` is NON-EMPTY and ORDERED by the overlay order (`file` → `mem` → `temp`); every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path; `tier` is null and `merged` is true; `cache` is null; the value is a composite no node holds; and a merge runs ONLY where NO node holds the read path',
    strategyId: 'S-GR-MERGE-1', term: 12, bound: 'enumerated',
    assertions: ['two drives per shape; the four claims (parts\u2019 ORDER · parts\u2019 PATH identity · the tier/merged/cache triple · the value\u2019s non-authoritative status) are ASSERTIONS per drive (§5.5.3)'],
    compensating: ['M-5', 'F-8', 'I-3', 'I-17', '§2.5 item 4'],
    drives: [
      'a file-held child only',
      'a file-held child plus a temp-held grandchild',
      'the same path held in file AND temp (the overlay wins by the durability order)',
      'the same path held at TWO tiers AND a descendant held (the first-hit boundary)',
      'a node holding the read path with a held descendant (NO merge runs)',
      'a cold item with NO held descendant (the miss)',
    ].flatMap((shape) => [
      { label: `TP-7 (${shape}) — the parts list read for order and path identity`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
      { label: `TP-7 (${shape}) — the tier/merged/cache triple and the value\u2019s non-authoritative status`, run: () => { throw new Error('drive not evaluated: the module is absent') } },
    ]),
  },
]

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
