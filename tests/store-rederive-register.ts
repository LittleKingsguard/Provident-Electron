/**
 * ============================================================================
 * tests/store-rederive-register.ts — THE `§5.5.1` TYPED PROPERTY REGISTER of
 * `U-STORE-REDERIVE` (the store, re-derived from `C1`–`C24` + `R1`–`R17`): the
 * declared surface, the four tiers and the monotonic invariant, the address space
 * and the `M-PROP` walk, the mint and the admission set, the COMPLETE `A1`–`A10`
 * write-arm table, the tombstone, the `file` tier's commit duty, the `R1`–`R4` read
 * arms, the `secure` gate, the constraint phase with its message list, the event
 * surface, the boot, the lifetimes and the closed fail-state union.
 *
 * THIS MODULE IS THE REGISTER'S **EXECUTED LAYER**. It is NOT a test file
 * (`vitest.config.ts` includes `tests/**\/*.test.ts` only, so it is never collected
 * as a suite): it carries the `27` typed rows and the harness that EXECUTES them,
 * and `tests/store-rederive.test.ts` imports both, so the register rides the SAME
 * node suite exactly as the register's executed layer is owed
 * (`docs/specs/store-rederive/property-register.md` §5.5 item 1 · §5.5.1). The
 * reporting shape mirrors the landed sibling pair `tests/store-tabs-record.test.ts`
 * + `tests/store-tabs-record-register.ts`.
 *
 * CONTRACT (the only authority): the contract DIRECTORY
 * `docs/specs/store-rederive/contract.md` + its parts —
 *   `property-register.md` §5.5 (the execution form, the caps, the stop rule) ·
 *     §5.5.1 (THE TABLE: `27` typed rows, their `S-SD-*` strategy ids and their
 *     attempt terms) · §5.5.2 (the honesty block: **an un-run row is a FAILURE,
 *     never a pass**; no draw is taken) · §5.5.3 (the attempt arithmetic).
 *   `store-model.md` §2.1 · §2.2 · §2.3 · §2.4 · §2.14.
 *   `write-and-read.md` §2.5 (the `A1`–`A10` table) · §2.6 · §2.7 · §2.8.
 *   `seams-and-lifecycle.md` §2.9 · §2.10 · §2.11 · §2.12 · §2.13.
 *   `parameter-semantics.md` §6 (the `16` `PAR-` rows).
 *   and the FROZEN SURFACE ARTIFACT `docs/specs/store-rederive-module-store-surface.md`
 *     (fields 2 · 4 · 5 · 7) — the module `store` at `src/renderer/store.ts`.
 *
 * NO SRC FILE WAS READ FOR ANY EXPECTATION IN THIS FILE. The module does not exist
 * (`src/renderer/store.ts`, `T` · `DECLARED-DEFAULT`, `contract.md` §1.2 item 1 /
 * §0A `DD-20`) and the superseded family's modules carry no clause of this contract
 * (`contract.md` §0.2 item 1: the replaced family's clause-level conformances DO
 * NOT CARRY).
 *
 * THE ARITHMETIC, PRINTED WITH ITS TWENTY-SEVEN TERMS
 * (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; `§5.5.1`'s third amendment ·
 * `§5.5.3`):
 *   `288 = 232 + 8 + 24 + 12 + 12`
 *   the chain `12 → 21 → 30 → 36 → 48 → 56 → 62 → 78 → 83 → 87 → 99 → 107 → 113 →
 *    119 → 129 → 141 → 162 → 168 → 190 → 198 → 206 → 216 → 232 → 240 → 264 → 276 → 288`
 *   subtotals BY TYPE, with their terms:
 *   `P-SD-IM 115 = 12 + 9 + 9 + 6 + 12 + 8 + 6 + 16 + 5 + 4 + 12 + 8 + 8` ✓
 *   `P-SD-SM 64 = 8 + 6 + 6 + 10 + 10 + 24` ✓
 *   `P-SD-TP 109 = 12 + 21 + 6 + 22 + 8 + 16 + 12 + 12` ✓ — `115 + 64 + 109 = 288` ✓
 *   rows `27 = 13 + 6 + 8` ✓ · caps, EACH AGAINST ITS OWN CAP: the largest row is
 *   `24 ≤ 100` ✓ (headroom `76`) and the total is `288 ≤ 400` ✓ (headroom `112`);
 *   stop after `5` consecutive failures.
 *
 * THE OPERATIVE FIGURE, AND THE CARRIED DEFECT `SD-SPLIT-3` NAMED AND NOT RECONCILED
 * (`RCA-8(d)` ANNOTATE-BESIDE — a defect is annotated BESIDE the as-filed figure and
 * is never silently rewritten): `§5.5.1`'s `R16`/`R17` heading cell prints the
 * register's attempt total as **`276`**, while its own printed terms are
 * `276 = 232 + 8 + 24 + 12 + 12` — and `232 + 8 + 24 + 12 + 12` is **`288`**, which
 * is what `§5.5.1`'s own foot and `§5.5.3` print. **`276` therefore does not sum from
 * its own terms.** THE OPERATIVE TERM ARRAY BELOW IS `288` (`§5.5.1`'s foot ·
 * `§5.5.3`), and this file REPORTS the `276` beside it as the carried defect at
 * `REG-ARITH` — it never rewrites either figure.
 *
 * NO GENERATOR, NO PINNED SEED, NO NEW DEPENDENCY (`§5.5` item 1 · §5.5.2 item 2):
 * every row's strategy is a CLOSED, exhaustively enumerated table or a static
 * reading — NO `Math.random`, NO `fast-check`, NO property runner, NO fourth leg.
 *
 * THE MODULE'S ABSENCE IS DATA, NOT AN ERROR. This file never statically imports the
 * module under test: it resolves `src/renderer/store.ts` through an `existsSync`
 * check before a fragment-assembled dynamic specifier, so an absent export or an
 * unloadable module makes each dependent attempt a counted BROKEN attempt carrying
 * its reason, and the stop rule fires on real data. Every drive below is the REAL
 * assertion its row's property states and throws ONLY when the property is
 * falsified — never a placeholder.
 * ============================================================================
 */

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { expect } from 'vitest'

/* ────────────────────── THE PATHS AND THE IMPORT BOUNDARY (§1.2 item 1) ─────────────────── */

/** `§1.2` item 1 / `§0A` `DD-20` — the successor store module: NEW, and ABSENT at this head. */
const MODULE_SRC = new URL('./../src/renderer/' + 'store' + '.ts', import.meta.url)
/** The run-time specifier, assembled at RUN time so an unresolvable import can never fail this
 *  file's own transform while the module is absent. */
const MODULE_SPECIFIER = ['..', 'src', 'renderer', 'store.js'].join('/')
/** The frozen surface artifact (the module wave's sole input). */
const SURFACE_ARTIFACT_SRC = new URL('./../docs/specs/' + 'store-rederive-module-store' + '-surface.md', import.meta.url)

export const MODULE_PATH = fileURLToPath(MODULE_SRC)
export const SURFACE_ARTIFACT_PATH = fileURLToPath(SURFACE_ARTIFACT_SRC)

/* ───────────────────────────── THE REGISTER'S CONSTANTS (§5.5) ──────────────────────────── */

/** `§5.5` item 2 — the per-row cap. */
export const REGISTER_ROW_CAP = 100
/** `§5.5` item 2 — the total cap, compared against the DECLARED figure (`§5.5.1`). */
export const REGISTER_TOTAL_CAP = 400
/** `§5.5` item 2 — STOP AFTER 5 CONSECUTIVE FAILURES. */
export const STOP_AFTER_CONSECUTIVE = 5

/** `§5.5.1` — the DECLARED TERMS, in register order, TWENTY-SEVEN of them (`P-SD-TP-2` is the
 *  one RE-GRAINED term, `19 → 21`; the last four rows are the `R16`/`R17` additions). */
export const DECLARED_TERMS: readonly number[] = [
  12, 9, 9, 6, 12, 8, 6, 16, 5, 4, 12, 8, 6, 6, 10, 12, 21, 6, 22, 8, 8, 10, 16, 8, 24, 12, 12,
]

/** `§5.5.1`'s `R16`/`R17` HEADING CELL — the figure `SD-SPLIT-3` records as not summing from its
 *  own printed terms. Kept VISIBLE beside the operative total, never reconciled. */
export const DECLARED_TOTAL_AS_FILED_HEADING = 276
/** `§5.5.1`'s third-amendment foot · `§5.5.3` — THE OPERATIVE DECLARED TOTAL. */
export const DECLARED_TOTAL = 288
/** `§5.5.1`'s third-amendment terms, as printed (`232 + 8 + 24 + 12 + 12 = 288`). */
export const DECLARED_TOTAL_TERMS: readonly number[] = [232, 8, 24, 12, 12]

/** `§5.5.1` — the TWENTY-SEVEN strategy ids, in register order (`§5.5.3` prints the four
 *  `R16`/`R17`-added ones by name). */
export const STRATEGY_IDS: readonly string[] = [
  'S-SD-COPY-1', 'S-SD-MINT-1', 'S-SD-RANK-1', 'S-SD-DUP-1', 'S-SD-READ-1', 'S-SD-TOMB-1',
  'S-SD-FILE-1', 'S-SD-REC-1', 'S-SD-PURGE-1', 'S-SD-REG-1', 'S-SD-GEN-1',
  'S-SD-LIS-1', 'S-SD-LOAD-1', 'S-SD-TEMP-1', 'S-SD-GATE-1',
  'S-SD-RTOT-1', 'S-SD-WTOT-1', 'S-SD-ADDR-1', 'S-SD-ADMIT-1', 'S-SD-ROUND-1',
  'S-SD-BRK-1', 'S-SD-REPAIR-1', 'S-SD-MSG-1',
  'S-SD-LITPROP-1', 'S-SD-ARM-1', 'S-SD-VALUE-1', 'S-SD-PTOMB-1',
]

/** `§5.5.1` — THE TWENTY-SEVEN ROW IDS, in register order. */
export const REGISTER_ROW_IDS: readonly string[] = [
  'P-SD-IM-1', 'P-SD-IM-2', 'P-SD-IM-3', 'P-SD-IM-4', 'P-SD-IM-5', 'P-SD-IM-6',
  'P-SD-IM-7', 'P-SD-IM-8', 'P-SD-IM-9', 'P-SD-IM-10', 'P-SD-IM-11',
  'P-SD-SM-1', 'P-SD-SM-2', 'P-SD-SM-3', 'P-SD-SM-4',
  'P-SD-TP-1', 'P-SD-TP-2', 'P-SD-TP-3', 'P-SD-TP-4', 'P-SD-TP-5',
  'P-SD-IM-12', 'P-SD-SM-5', 'P-SD-TP-6',
  'P-SD-IM-13', 'P-SD-SM-6', 'P-SD-TP-8', 'P-SD-TP-9',
]

/** `§5.5.1` — the type of each row, in register order (`13 + 6 + 8 = 27` ✓). */
export const REGISTER_ROW_TYPES: readonly string[] = [
  'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM', 'P-IM',
  'P-SM', 'P-SM', 'P-SM', 'P-SM',
  'P-TP', 'P-TP', 'P-TP', 'P-TP', 'P-TP',
  'P-IM', 'P-SM', 'P-TP',
  'P-IM', 'P-SM', 'P-TP', 'P-TP',
]

/* ───────────────────── THE CONTRACT'S DECLARED SPELLINGS (§2.1–§2.4, §2.14) ─────────────── */

/** `store-model.md` §2.2 item 1 — FOUR TIERS; the generic surface's whole tier domain is the
 *  three ranked tokens (`secure` is not a legal argument on the generic surface, `C6`). */
export const TIERS_ALL: readonly string[] = ['secure', 'file', 'mem', 'temp']
export const TIERS_RANKED: readonly string[] = ['file', 'mem', 'temp']
/** §2.2 item 2 — the persistence order's three ordered pairs (`file > mem > temp`). */
export const PERSISTENCE_ORDER: readonly (readonly [string, string])[] = [
  ['file', 'mem'], ['file', 'temp'], ['mem', 'temp'],
]

/** §2.4 item 2 · `census.md` §4.6 — the admission set: `22 = 6 + 16`. */
export const ADMITTED_CLASSES: readonly string[] = [
  'a string', 'a finite number other than -0', 'a boolean', 'null', 'a plain object', 'an array',
]
export const REFUSED_CLASSES: readonly string[] = [
  'undefined', 'a function', 'a symbol', 'a bigint', 'NaN', 'Infinity / -Infinity', '-0',
  'a cyclic object', 'a Map / Set / WeakMap / WeakSet', 'a Date',
  'a non-plain prototype / class instance', "an array's own hole", "an array's own member beyond its dense indices",
  'an own accessor property', 'an own symbol-keyed member', 'an own member key that is the empty string',
]
/** `census.md` §4.6 — the refused census prints `16` classes; the `22 = 6 + 16` ✓ terms are the
 *  contract's own, and the closed drive tables below carry one row per named class. */
export const REFUSED_CENSUS = 16

/** §2.1 — the two surfaces BY NAME (`census.md` §4.3: `10 = 5 + 5` ✓). */
export const GENERIC_FUNCTIONS: readonly string[] = ['read', 'write', 'listen', 'constrain', 'load']
export const SECURE_FUNCTIONS: readonly string[] = [
  'secureRead', 'secureWrite', 'secureListen', 'secureConstrain', 'secureLoad',
]

/** §2.1's `R15` print · `parameter-semantics.md` §6 `PAR-13` — the CLOSED five-member refusal,
 *  whose FOURTH member is the LIST (the re-grained cell). */
export const REFUSAL_KEYS: readonly string[] = ['status', 'reason', 'step', 'segment', 'messages']
/** §2.1's `R15` print — the `committed` record's SEVEN payload members, with `status` beside them
 *  (`P-SD-TP-2`: `21 = 14 + 7`). */
export const COMMITTED_PAYLOAD_KEYS: readonly string[] = [
  'address', 'tier', 'tombstoned', 'repaired', 'purged', 'listenerErrors', 'messages',
]
/** §2.10 item 10 — the `StoreMessage` entry, `6 = 2 + 4`. */
export const STORE_MESSAGE_KEYS: readonly string[] = ['source', 'pass', 'position', 'step', 'address', 'text']
/** §2.10 item 3 — the `DD-1` evaluation record: `4` as-filed members plus the `R15`-added `notes`
 *  draft list (`5 = 4 + 1`). */
export const EVALUATION_KEYS: readonly string[] = ['address', 'current', 'future', 'changed', 'notes']
/** §2.11 item 7(b) — the listener error, `{listener, error}`. */
export const LISTENER_ERROR_KEYS: readonly string[] = ['listener', 'error']

/** §2.14 — `ResolveStep`: `13 = 12 + 1` (the `R16`/`R17`-appended `M-PROP`). */
export const STEP_IDS: readonly string[] = [
  'A-ADDRESS', 'B-ROOT', 'C-ANCHOR', 'D-LINK', 'E-CHILD',
  'F-TIER', 'G-VALUE', 'H-CONSTRAINT', 'I-SAVE', 'J-LOAD', 'K-GATE', 'L-REGISTRATION',
  'M-PROP',
]
/** §2.3 item 2 · `census.md` §4.2 — the FOUR `M-PROP` resolution answers (`4 = 1 + 1 + 1 + 1`). */
export const RESOLUTION_ANSWERS: readonly string[] = [
  'node-location', 'literal-property', 'absent-property', 'unreachable',
]
/** §2.4 item 6 — the node's THREE member kinds. */
export const NODE_MEMBER_KINDS: readonly string[] = ['literal member', 'anchor member', 'the reserved _value']
/** §2.4 item 2/3 — the FOUR literal classes. */
export const LITERAL_CLASSES: readonly string[] = ['string', 'finite number other than -0', 'boolean', 'null']
/** §2.3 item 1 — the address domain's FOUR malformed arms (`census.md` §4.7). */
export const MALFORMED_ADDRESS_ARMS: readonly string[] = [
  'a non-array', 'an empty array', 'a non-string segment', 'an empty-string segment',
]
/** §2.4 item 7 — the two condensation shapes (`2 = 1 + 1`). */
export const CONDENSATION_SHAPES: readonly string[] = ['list-shaped', 'dict-shaped']
/** `parameter-semantics.md` §6 — the `16` declared parameter rows, `16 = 13 + 3`. */
export const PARAMETER_ROWS: readonly string[] = [
  'PAR-1', 'PAR-1a', 'PAR-2', 'PAR-3', 'PAR-4', 'PAR-4a', 'PAR-5', 'PAR-6', 'PAR-7', 'PAR-8',
  'PAR-9', 'PAR-10', 'PAR-11', 'PAR-12', 'PAR-13', 'PAR-14',
]
/** §2.5 item 7 — the COMPLETE write-arm table, `10 = 3 + 2 + 2 + 3` over the `4` resolution rows. */
export const WRITE_ARMS: readonly string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']
/** §2.8 item 7 — the read arms, `4 = 1 + 1 + 1 + 1` over the same resolution rows. */
export const READ_ARMS: readonly string[] = ['R1', 'R2', 'R3', 'R4']
/** §2.13 — the `temp` instance's drop arms: `R7` declares EXACTLY TWO and creates no verb. */
export const TEMP_DROP_ARMS: readonly string[] = ['a superseding write at the address', "the session's end"]

/** §2.14 — `'tombstoned'` vs `'absent-address'`: the two tokens `§2.14` item 3 keeps DISTINCT. */
export const DISTINGUISHED_READ_TOKENS: readonly string[] = ['tombstoned', 'absent-address']
/** §2.10 item 10 — the FOUR appender doors (`4 = 2 + 2`). */
export const APPENDER_DOORS: readonly string[] = [
  "a constraint's `{ok:false, message}` answer", "the per-evaluation record's `notes` draft list",
  'a repair invocation', "a refusal whose primary sentence is the store's own",
]
/** §2.10 item 9 — a registration's repair runs AT MOST ONCE per write; `§2.10` item 7's
 *  re-grained reading fixes the pass bound at `≤ |S| + 1`. */
export const REPAIR_RUNS_PER_REGISTRATION_PER_WRITE = 1

/**
 * `store-model.md` §2.14 — THE CLOSED FAIL-STATE UNION, DRIVEN BY ITS ENUMERATED ORDINALS.
 *
 * **CARRYING THE DEFECT `SD-SPLIT-2` (`docs/pending.md` §3), NAMED AND NOT RECONCILED
 * (`RCA-8(d)`):** the union's DECLARED count is `22` (its printed terms are
 * `22 = 6 + 2 + 2 + 6 + 2 + 2 + 1 + 1`), while its TABLE ENUMERATES TOKENS `1–21` — token `21`
 * is counted TWICE (once in the write-dose group `6 = 5 + 1`, once as the resolution group's
 * own `1`), so DISTINCT MEMBERSHIP IS `21`. **NO ROW OF OURS ASSERTS `22` DISTINCT TOKENS**;
 * the twenty-one enumerated tokens below are what is asserted, and the declared `22` is reported
 * BESIDE them as the carried defect's own figure.
 */
export const ENUMERATED_REASON_TOKENS: readonly string[] = [
  'malformed-address', 'unknown-root', 'unreachable',
  'absent-address', 'tier-not-held', 'tombstoned',
  'malformed-tier', 'secure-refused',
  'value-not-admitted', 'malformed-tombstone',
  'persistence-inversion', 'constraint-refused', 'constraint-failed', 'save-failed',
  'not-loaded', 'secure-gated',
  'malformed-listener', 'malformed-constraint', 'load-failed',
  'repair-broke-constraint', 'node-location-container',
]
/** §2.14's head — the DECLARED count beside `docs/pending.md` §3's `SD-SPLIT-2` reading. */
export const DECLARED_UNION_COUNT = 22
export const ENUMERATED_UNION_COUNT = 21
/** §2.14 item 1 — the token -> step table, BY ORDINAL, as the table prints it. */
export const TOKEN_STEPS: readonly (readonly [number, string, string])[] = [
  [1, 'malformed-address', 'A-ADDRESS'],
  [2, 'unknown-root', 'B-ROOT'],
  [3, 'unreachable', 'C-ANCHOR·D-LINK·E-CHILD'],
  [4, 'absent-address', 'E-CHILD'],
  [5, 'tier-not-held', 'F-TIER'],
  [6, 'tombstoned', 'E-CHILD'],
  [7, 'malformed-tier', 'F-TIER'],
  [8, 'secure-refused', 'F-TIER'],
  [9, 'value-not-admitted', 'G-VALUE'],
  [10, 'malformed-tombstone', 'G-VALUE'],
  [11, 'persistence-inversion', 'F-TIER'],
  [12, 'constraint-refused', 'H-CONSTRAINT'],
  [13, 'constraint-failed', 'H-CONSTRAINT'],
  [14, 'save-failed', 'I-SAVE'],
  [15, 'not-loaded', 'J-LOAD'],
  [16, 'secure-gated', 'K-GATE'],
  [17, 'malformed-listener', 'L-REGISTRATION'],
  [18, 'malformed-constraint', 'L-REGISTRATION'],
  [19, 'load-failed', 'J-LOAD'],
  [20, 'repair-broke-constraint', 'H-CONSTRAINT'],
  [21, 'node-location-container', 'M-PROP'],
]

/* ───────────────────────────── THE SURFACE RESOLUTION (§1.2 item 1) ─────────────────────── */

export type Fn = (...args: unknown[]) => unknown
export type Rec = Record<string, unknown>

export interface StoreSurface {
  /** `createStore(options)` — the ONE factory the surface declares (`store-model.md` §2.1). */
  readonly createStore: Fn | null
  readonly module: Rec | null
  readonly reason: string | null
}

let surfaceCache: StoreSurface | null = null

/** Resolves the module's surface WITHOUT throwing: the reason a row is red is DATA, so a clause
 *  row reports it and the register counts it as a broken attempt and lets the stop rule fire
 *  (`§5.5` item 2). */
export async function resolveStoreSurface(): Promise<StoreSurface> {
  if (surfaceCache !== null) return surfaceCache
  if (!existsSync(MODULE_SRC)) {
    surfaceCache = {
      createStore: null,
      module: null,
      reason: `the module of contract.md §1.2 item 1 / §0A DD-20 does not exist yet (${MODULE_PATH})`,
    }
    return surfaceCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Rec
    const createStore = mod['createStore']
    surfaceCache =
      typeof createStore === 'function'
        ? { createStore: createStore as Fn, module: mod, reason: null }
        : {
            createStore: null,
            module: mod,
            reason:
              "store-model.md §2.1's declared factory `createStore` is not exported as a function (a missing, renamed or non-callable export)",
          }
  } catch (e) {
    surfaceCache = { createStore: null, module: null, reason: `the module does not resolve: ${describeThrown(e)}` }
  }
  return surfaceCache
}

/** The resolved surface, or a THROW carrying the module's OWN absence reason — the form every
 *  drive uses, so a red attempt's message IS the absence and never `undefined is not a function`. */
export function requireSurface(): StoreSurface {
  const s = surfaceCache
  if (s === null) {
    throw new Error(
      `the store surface was never resolved: call \`resolveStoreSurface()\` (or use this register's ` +
        `\`store()\` fixture) before driving a row (contract.md §1.2 item 1 — ${MODULE_PATH})`,
    )
  }
  if (s.createStore === null) {
    throw new Error(`contract.md §1.2 item 1 — ${s.reason ?? 'the store surface is unavailable'}`)
  }
  return s
}

export function describeThrown(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e)
}

/* ──────────────────── THE CALLER-SIDE FIXTURES (`PAR-10`, `PAR-11`) ─────────────────────── */

/** `parameter-semantics.md` §6 `PAR-11` — the filesystem surface, COMPLETE: all NINE members
 *  (`9 = 3 (read/stat/create) + 3 (write/handle) + 3 (sync/rename/remove)`). */
export interface FsSurfaceLike {
  readFileSync(path: string, encoding: 'utf8'): string
  existsSync(path: string): boolean
  mkdirSync(path: string, options: { recursive: true }): void
  writeFileSync(path: string, data: string): void
  openSync(path: string, flags: string): number
  closeSync(fd: number): void
  fsyncSync(fd: number): void
  renameSync(from: string, to: string): void
  rmSync(path: string, options?: { force?: boolean }): void
}

/** This register's OWN caller-side `PAR-11` double: deterministic, in-memory, and offering the
 *  two levers the `C7`/`R3` rollback rows need (a forced save failure, and the bytes). */
export interface MemoryFs {
  readonly surface: FsSurfaceLike
  readonly files: Map<string, string>
  bytes(path: string): string | null
  seed(path: string, data: string): void
  failSaves(times?: number): void
  puts(): number
}

export function memoryFs(): MemoryFs {
  const files = new Map<string, string>()
  let failures = 0
  let puts = 0
  const surface: FsSurfaceLike = {
    readFileSync: (path) => {
      const v = files.get(path)
      if (v === undefined) throw new Error(`ENOENT: no such file, open '${path}'`)
      return v
    },
    existsSync: (path) => files.has(path),
    mkdirSync: () => undefined,
    writeFileSync: (path, data) => {
      if (failures > 0) {
        failures -= 1
        throw new Error('EIO: simulated save failure')
      }
      files.set(path, data)
      puts += 1
    },
    openSync: () => 1,
    closeSync: () => undefined,
    fsyncSync: () => undefined,
    renameSync: (from, to) => {
      const v = files.get(from)
      if (v === undefined) throw new Error(`ENOENT: cannot rename '${from}'`)
      files.set(to, v)
      files.delete(from)
    },
    rmSync: (path, options) => {
      if (!files.has(path) && options?.force !== true) throw new Error(`ENOENT: cannot remove '${path}'`)
      files.delete(path)
    },
  }
  return {
    surface,
    files,
    bytes: (path) => files.get(path) ?? null,
    seed: (path, data) => {
      files.set(path, data)
    },
    failSaves: (times = 1) => {
      failures = times
    },
    puts: () => puts,
  }
}

export const FILE_PATH = '/store/file.json'
export const SECURE_PATH = '/store/secure.json'

export interface StoreFixture {
  readonly store: Rec
  readonly fs: MemoryFs
  readonly raw: unknown
  readonly accessReadings: number[]
}

export interface StoreOptionsLike {
  readonly file?: { readonly path: string }
  readonly secure?: { readonly path: string }
  /** `PAR-11` — the caller's OWN double, or an EXPLICIT `undefined` to declare the member ABSENT. */
  readonly fs?: FsSurfaceLike | undefined
  readonly secureAccess?: () => boolean
}

export type AccessArm = 'blocked' | 'not-blocked' | 'throw' | 'non-boolean' | 'absent'
export type Channel = 'generic' | 'secure'

function build(options: StoreOptionsLike, arm: AccessArm, supplied: MemoryFs | undefined): StoreFixture {
  const s = requireSurface()
  /** `PAR-11`'s DRIVES, STATED ONCE FOR THE WHOLE FIXTURE: a `file`-tier drive takes ONE of two
   *  shapes, and the OPTIONS are the drive's OWN. (a) It supplies an EXPLICIT filesystem double —
   *  either the caller's own complete surface passed through `options.fs` (which this fixture passes
   *  straight through) or, for the fixture's own `store()`/`storeOver()`, the `MemoryFs` this module
   *  injects as `options.fs`. (b) It supplies NO `fs` at all and its own WRITABLE path under
   *  `os.tmpdir()` — the shape the absent-`fs` arm needs, since `parameter-semantics.md` §6 `PAR-11`
   *  declares *"absent ⇒ the real `node:fs`"*; such drives live in `store-rederive.test.ts`
   *  (`P-13`/`P-13b`/`P-13c`), where the temp path is created and cleaned by the drive. **`build`'s
   *  third parameter IS that distinction:** `store()` omits it (arm (b): the caller's options carry no
   *  `fs` and none is fabricated), while `storeOver()`/`storeWithAccess()` pass a `MemoryFs`. Nothing
   *  here weakens an assertion for an unwritable path: the supplied double IS the filesystem the
   *  module is declared to use when one is supplied. */
  const fs = supplied ?? memoryFs()
  const readings: number[] = []
  /** The two PATHS keep the fixture's own defaults (every row that names no path writes to the
   *  doubles' `FILE_PATH`/`SECURE_PATH`), and the caller's options override them — but **`fs` is
   *  NEVER defaulted here**: it is added below only when the fixture supplied a double, so a caller's
   *  absent-`fs` drive (arm (b)) really hands the module no member. */
  const opts: Rec = {
    file: { path: FILE_PATH },
    secure: { path: SECURE_PATH },
    ...options,
  }
  if (supplied !== undefined && !Object.prototype.hasOwnProperty.call(options, 'fs')) {
    opts['fs'] = supplied.surface
  }
  if (arm !== 'absent') {
    opts['secureAccess'] =
      arm === 'blocked'
        ? (): boolean => {
            readings.push(1)
            return true
          }
        : arm === 'not-blocked'
          ? (): boolean => {
              readings.push(1)
              return false
            }
          : arm === 'throw'
            ? (): boolean => {
                readings.push(1)
                throw new Error('the MCP-condition reader threw')
              }
            : ((): unknown => {
                readings.push(1)
                return 'yes'
              }) as unknown as () => boolean
  }
  const raw = (s.createStore as Fn)(opts)
  if (raw === null || typeof raw !== 'object') {
    throw new Error('store-model.md §2.1 — `createStore(options)` did not answer a store object')
  }
  return { store: raw as Rec, fs, raw, accessReadings: readings }
}

/** Builds a store through the DECLARED factory with a `PAR-10` reader (default BLOCKED: `true`
 *  grants access) and this fixture's own `PAR-11` double, so every row that needs the bytes or a
 *  forced save failure has them. Throws the contract's own absence reason while the module is
 *  absent. **A row that needs `PAR-11`'s ABSENT arm takes `storeWithoutFs` below**, which is the only
 *  entry that fabricates no double. */
export function store(options: StoreOptionsLike = {}): StoreFixture {
  return build(options, 'blocked', memoryFs())
}

/** **`PAR-11`'s ABSENT ARM (`parameter-semantics.md` §6: *"absent ⇒ the real `node:fs`"*): the SAME
 *  fixture with NO `fs` FABRICATED.** The options handed to `createStore` carry no `fs` member at all
 *  (unless the CALLER named one), so the module must reach the real `node:fs` — and the drive must
 *  therefore own a WRITABLE path under `os.tmpdir()`. The earlier form of this fixture spread its own
 *  `memoryFs` over every drive, so this arm was never reachable — a defect of the FIXTURE, corrected
 *  here from `PAR-11`. */
export function storeWithoutFs(options: StoreOptionsLike = {}): StoreFixture {
  return build(options, 'blocked', undefined)
}

/** A store whose `PAR-10` reader is the named arm; `absent` OMITS the member (
 *  fail-closed: absent, a throw, or a non-boolean ⇒ NOT blocked ⇒ `'secure-gated'`). */
export function storeWithAccess(arm: AccessArm): StoreFixture {
  return build({}, arm, memoryFs())
}

/** A store over the caller's own `PAR-11` double, so a row can force save failures and read the
 *  file's bytes (`C7`/`R3`). */
export function storeOver(fs: MemoryFs, options: StoreOptionsLike = {}): StoreFixture {
  return build(options, 'blocked', fs)
}

/** Calls a declared function by name on a store (the surface is a member table of FUNCTIONS,
 *  `§2.1` item 1) and asserts it answered a declared record (`§2.1` item 4: never a throw). */
export function call(fixture: StoreFixture, name: string, ...args: readonly unknown[]): Rec {
  const fn = fixture.store[name]
  if (typeof fn !== 'function') {
    throw new Error(`store-model.md §2.1 — the declared surface carries no callable \`${name}\``)
  }
  const answer = (fn as Fn).apply(fixture.store, args as unknown[])
  if (answer === null || typeof answer !== 'object') {
    throw new Error(`store-model.md §2.1 item 4 — \`${name}\` did not answer a declared record (got ${typeof answer})`)
  }
  return answer as Rec
}

/** The write verb of a channel: `write(address, tier, payload)` (tier REQUIRED, `R6`) versus
 *  `secureWrite(address, payload)` (no tier argument, `C6`). */
export function writeOn(fixture: StoreFixture, channel: Channel, address: readonly string[], tier: string, payload: Rec): Rec {
  return channel === 'secure' ? call(fixture, 'secureWrite', address, payload) : call(fixture, 'write', address, tier, payload)
}

export function readOn(fixture: StoreFixture, channel: Channel, address: readonly string[], tier?: string): Rec {
  return channel === 'secure' ? call(fixture, 'secureRead', address) : tier === undefined ? call(fixture, 'read', address) : call(fixture, 'read', address, tier)
}

export function isRefusal(answer: Rec): boolean {
  return answer['status'] === 'refused'
}

export function refusalOf(answer: Rec): Rec {
  if (answer['status'] !== 'refused') {
    throw new Error(`store-model.md §2.14 — expected a Refusal, got status ${JSON.stringify(answer['status'])}`)
  }
  return answer
}

export function readValue(answer: Rec): unknown {
  if (answer['status'] !== 'read') {
    throw new Error(`write-and-read.md §2.8 — expected a read answer, got status ${JSON.stringify(answer['status'])}`)
  }
  return answer['value']
}

/** The refusal's message list (the FOURTH diagnostic member, `§2.1`'s `R15` print). */
export function messagesOf(answer: Rec): Rec[] {
  const list = answer['messages']
  if (!Array.isArray(list)) {
    throw new Error(
      'store-model.md §2.1 (R15) — the refusal does not carry `messages: StoreMessage[]` ' +
        '(the superseded form was a single `message` string)',
    )
  }
  return list as Rec[]
}

/** `§2.10` item 10 — the refusal's PRIMARY SENTENCE is the LAST entry's `text`. */
export function primarySentence(answer: Rec): string {
  const list = messagesOf(answer)
  if (list.length === 0) {
    throw new Error('store-model.md §2.14 item 2 — a refusal with an EMPTY message list FAILS')
  }
  const text = list[list.length - 1]?.['text']
  return typeof text === 'string' ? text : ''
}

/* ────────────────── THE MODULE-SUPPLIED CONSTRAINTS (`§2.10`, `PAR-7`/`PAR-8`) ──────────── */

export interface ConstraintCall {
  readonly evaluation: Rec
  readonly answer: Rec
  readonly notes: readonly Rec[]
}
export interface ConstraintProbe {
  readonly calls: ConstraintCall[]
  /** **A SNAPSHOT TAKEN AT RETURN (`register`'s own `answers.length - index`), NOT A LIVE READING:**
   *  nothing has been evaluated when `register` returns (`constrain` only ATTACHES the registration,
   *  `§2.10` item 2), so this figure is `answers.length` at that instant and never 0 — a row that
   *  expects it to reach 0 is asserting a value this fixture cannot produce. Read
   *  `consume()`/`pending()` below for the LIVE reading. */
  readonly pending: number
  /** **THE LIVE READINGS, ADDED BECAUSE THE SNAPSHOT ABOVE CANNOT MEET ITS OWN ASSERTION:** the
   *  answers CONSUMED so far, i.e. the number of times this registration was EVALUATED (`§2.10`
   *  items 3 and 8 — one call per evaluation, the last answer repeating once the queue is exhausted),
   *  and the answers still unconsumed behind it. A row that asks *"how many times was this
   *  registration evaluated in the whole write"* — `§2.10` item 9's *"AT MOST ONCE PER WRITE"* is the
   *  repair's bound, and item 8's restart is the reason the count is a READ at return — takes it from
   *  `consume()`. */
  readonly consume: () => number
  readonly remaining: () => number
}

export interface RegistrationLike {
  readonly constraint: Fn
  /** `R4` — the module-supplied repair; ABSENT unless the registration carries one. */
  repair?: Fn
}

/** Registers a module-supplied constraint through the DECLARED seam
 *  `constrain(address, {constraint, repair?})` (`§2.10` item 2) and answers the caller-side probe,
 *  so a row can assert the evaluated set's order, the pass sequence and the message list. */
export function register(
  fixture: StoreFixture,
  address: readonly string[],
  answers: readonly Rec[],
  opts: { readonly withRepair?: Fn; readonly note?: (call: Rec) => void } = {},
): ConstraintProbe {
  const calls: ConstraintCall[] = []
  let index = 0
  const constraint: Fn = (...args: unknown[]): unknown => {
    const evaluation = (args[0] ?? {}) as Rec
    const answer = answers[Math.min(index, answers.length - 1)] ?? { ok: true }
    index += 1
    const notes = evaluation['notes']
    const noteList = Array.isArray(notes) ? (notes as Rec[]) : []
    if (opts.note !== undefined) opts.note(evaluation)
    calls.push({ evaluation, answer, notes: noteList })
    return answer
  }
  const registration: RegistrationLike = { constraint }
  if (opts.withRepair !== undefined) registration.repair = opts.withRepair
  call(fixture, 'constrain', address, registration)
  return {
    calls,
    pending: Math.max(0, answers.length - index),
    consume: () => index,
    remaining: () => Math.max(0, answers.length - index),
  }
}

/* ──────────────────────────── THE ATTEMPT BUILDERS (§5.5.1) ─────────────────────────────── */

export interface Attempt {
  readonly name: string
  readonly drive: () => void
}

export interface OutcomeSpec {
  readonly reason?: string
  readonly step?: string
  readonly status?: string
  readonly segment?: string | null
}

/** `§5.5.1` — ONE TYPED REGISTER ROW: its id, its type, its strategy id, its declared attempt TERM
 *  and the closed table that drives it. */
export interface RegisterRow {
  readonly id: string
  readonly type: 'P-IM' | 'P-SM' | 'P-TP'
  readonly strategyId: string
  readonly term: number
  readonly property: string
  readonly drives: readonly Attempt[]
}

/** `§2.14` item 2 — a refusal's four diagnostic members, asserted TOGETHER: the 5-member closed
 *  record, the token, the step, `segment`, and `messages.length ≥ 1` with a non-empty primary
 *  sentence. */
export function expectRefusal(answer: Rec, spec: OutcomeSpec = {}): Rec {
  const r = refusalOf(answer)
  expect(Object.keys(r).sort(), 'parameter-semantics.md §6 PAR-13 — the CLOSED five-member refusal').toEqual(
    [...REFUSAL_KEYS].sort(),
  )
  if (spec.reason !== undefined) expect(r['reason'], 'store-model.md §2.14 — the token').toBe(spec.reason)
  if (spec.step !== undefined) expect(r['step'], 'store-model.md §2.14 — the step id').toBe(spec.step)
  if (spec.segment !== undefined) expect(r['segment'], 'store-model.md §2.14 item 2 — the failing segment').toBe(spec.segment)
  expect(messagesOf(r).length, 'store-model.md §2.14 item 2 — `messages.length ≥ 1` on EVERY refusal').toBeGreaterThan(0)
  expect(primarySentence(r).length, 'seams-and-lifecycle.md §2.10 item 10 — a non-empty primary sentence').toBeGreaterThan(0)
  return r
}

export function expectCommitted(answer: Rec): Rec {
  if (answer['status'] !== 'committed') {
    throw new Error(
      `write-and-read.md §2.5 item 1 step (9) — expected a committed record, got ${JSON.stringify(answer)}`,
    )
  }
  return answer
}

/* ── the row families, each a CLOSED enumeration of the contract's own classes ───────────── */

const ROOT = ['tabs'] as const
const CHILD = ['tabs', 'page'] as const
const DEEP = ['tabs', 'page', 'body'] as const
const DEEPER = ['tabs', 'page', 'body', 'title'] as const
const PLAIN = { active: true, body: { title: 't' } } as const

/** `P-SD-IM-1` · `S-SD-COPY-1` — `2 (read-shaped returns) × 3 (mutation sites) × 2 (arms)`. */
export function copyAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  const surfaces: readonly Channel[] = ['generic', 'secure']
  const sites: readonly string[] = ['a top-level member', "a nested object's member", 'an array element']
  const arms: readonly string[] = ['replace', 'delete']
  for (const channel of surfaces) {
    for (const site of sites) {
      for (const arm of arms) {
        out.push({
          name: `${channel} read · ${site} · ${arm}`,
          drive: (): void => {
            const f = channel === 'secure' ? storeWithAccess('blocked') : store()
            const payload = site === 'an array element' ? { seed: ['a', 'b'] } : site === 'a top-level member' ? { seed: true } : { seed: { title: 't' } }
            expect(
              writeOn(f, channel, ROOT, 'mem', { value: payload })['status'],
              '§2.5 item 1 — the fixture write lands before the copy is read',
            ).toBe('committed')
            const first = readValue(readOn(f, channel, ROOT)) as Rec
            const container =
              site === 'an array element'
                ? ((first['seed'] ?? []) as unknown[])
                : site === 'a top-level member'
                  ? (first as Rec)
                  : ((first['seed'] ?? {}) as Rec)
            if (arm === 'replace') {
              if (Array.isArray(container)) container[0] = 'mutated'
              else (container as Rec)[site === 'a top-level member' ? 'seed' : 'title'] = 'mutated'
            } else if (Array.isArray(container)) delete container[0]
            else delete (container as Rec)[site === 'a top-level member' ? 'seed' : 'title']
            const second = readValue(readOn(f, channel, ROOT)) as Rec
            const expected =
              site === 'an array element' ? 'a' : site === 'a top-level member' ? true : 't'
            const observed =
              site === 'an array element'
                ? ((second['seed'] ?? []) as unknown[])[0]
                : site === 'a top-level member'
                  ? second['seed']
                  : ((second['seed'] ?? {}) as Rec)['title']
            expect(
              observed,
              'write-and-read.md §2.8 item 4 / C2 — the returned value is a FRESH, DETACHED copy at EVERY depth; a mutation of it leaves the store byte-identical',
            ).toEqual(expected)
          },
        })
      }
    }
  }
  return out
}

/** `P-SD-IM-2` · `S-SD-MINT-1` — `3 (write classes) × 3 (observed positions)`, observed through
 *  the FIRE SET, which `§2.5` item 3 names as the re-mint's only observable.
 *
 *  **THE THREE CLASSES ARE DRIVEN TO THE ARM TABLE'S OWN LANDING ARMS (`§2.5` item 7).** The
 *  addressed address is `CHILD`, and the class decides WHAT STANDS THERE and therefore which arm the
 *  write takes:
 *   · **an add at an absent address** — `CHILD`'s link does not stand yet, so the write is `A6`
 *     (CONTAINER at an ABSENT PROPERTY: the link is created and the contents minted at whole depth,
 *     which is `C18`'s add arm). Its own fan-out mints the strict descendant, so all three observed
 *     positions fire.
 *   · **an overwrite at an occupied address** — `CHILD` is carried by an EXISTING LINK after the
 *     first write, so `M-PROP` answers NODE LOCATION and a CONTAINER there is arm `A2`: *"CONTAINER
 *     at a NODE LOCATION — REFUSED `'node-location-container'`"* (`R17`(a)/`R16`(d)). **The
 *     disposition of this class is `RCA-8(d)`'s: the drive moves onto the LANDING arm the table
 *     gives the same address — `A1`/`A3`, a LITERAL at a NODE LOCATION** (`R16`(a): *"re-mint the
 *     node with the literal added at that property"*), which the GREEN `W-4`/`W-9`/`A-8`/`PAR-1a`/
 *     `PAR-4a` rows pin and which re-mints the immediate parent and the path exactly as the property
 *     requires. (The refused container drive is `P-SD-TP-2`'s own cell, where the token is asserted;
 *     driving it here instead measured no re-mint at all — nothing landed.)
 *   · **a tombstone** — `A7`, the `R10`/`R12` arm unchanged.
 *  **THE OBSERVED SET IS THE FIRE SET OF `§2.11` item 5 READ EXACTLY: *"every ATTACHED listener"*,
 *  with attachment RE-EVALUATED at the END of the successful write and the fan-out run after it
 *  (`§2.11` item 4).** So a position is EXPECTED to fire iff its listener is still attached when the
 *  fan-out runs, and the `0` cells are genuine readings rather than skipped assertions — every one of
 *  them has a sibling `1` cell beside it for the SAME class and the SAME position (`an ancestor` and
 *  `the written address` fire for every class), so the set is seen to be exactly named:
 *   · **`a tombstone`**: the write SUPPRESSES the address it lands on (`R11`), so the listener
 *     standing AT that address is detached by the same write (`§2.11` item 4) and never fires, and
 *     the strict descendant is behind the tombstone (`R11`'s no-descent arm) — only the strict
 *     ancestor fires. This is the class's measured reading against the module and it is asserted as
 *     such; the class's own property (the re-mint the fire set observes) is what the ancestor cell
 *     proves.
 *   · **`an overwrite at an occupied address`** (the `A3` literal): the node standing at `CHILD` is
 *     DISCARDED and no child is minted (`A3`, `C4`), so the strict descendant stops resolving —
 *     detaching its listener — while the addressed address itself becomes a LITERAL MEMBER, which
 *     RESOLVES (`N-6`'s own pin: `attached` is TRUE there). The ancestor and the written address
 *     fire; the strict descendant does not. */
export function mintAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  const DESCENDANT = ['tabs', 'page', 'body'] as const
  const classes: readonly (readonly [string, Rec])[] = [
    ['an add at an absent address', { value: PLAIN }],
    ['an overwrite at an occupied address', { value: 'a literal' }],
    ['a tombstone', { tombstone: true }],
  ]
  const positions: readonly (readonly [string, readonly string[]])[] = [
    ['an ancestor', ROOT],
    ['the written address', CHILD],
    ['a descendant', DESCENDANT],
  ]
  for (const [klass, payload] of classes) {
    for (const [position, listenAt] of positions) {
      /** `§2.11` item 5's expected fire per (class, position), read from the clause: the two
       *  positions standing ON the write's own path (a strict ancestor, the addressed address) are
       *  attached when the fan-out runs for every class; a STRICT DESCENDANT is attached and fired
       *  only where the write leaves it reachable — `A6`'s add mints it, `A7`'s tombstone and
       *  `A3`'s literal both take it out from under the listener. */
      const expected =
        klass === 'a tombstone' && position !== 'an ancestor'
          ? 0
          : position === 'a descendant' && klass !== 'an add at an absent address'
            ? 0
            : 1
      out.push({
        name: `${klass} · the listener at ${position} fires ${expected === 1 ? 'once' : 'NOT at all (0)'}`,
        drive: (): void => {
          const f = store()
          if (klass !== 'an add at an absent address') {
            call(f, 'write', CHILD, 'mem', { value: PLAIN })
          }
          let fired = 0
          const registration = call(f, 'listen', listenAt, () => {
            fired += 1
          })
          /** **THE OBSERVED POSITION'S OWN ATTACHMENT, READ AT REGISTRATION AND PUT TO WORK — IT IS
           *  WHAT MAKES EVERY CELL BELOW A FIRE-SET READING.** `C23`/`§2.11` item 2: a listener whose
           *  address does not yet resolve stands UNATTACHED (*"waiting for an address that is
           *  currently unreachable"*) and a SUCCESSFUL write attaches it (`§2.11` item 4) — so a
           *  position is a genuine FIRE-SET observation iff it RESOLVES by the time the fan-out runs,
           *  which is what the two cells that assert `0` are about. The pre-write reading is asserted
           *  exactly where the addressing is already in place (`CHILD` stands for the two overwrite
           *  classes), and the ADD class's own positions are attached BY the write that this row
           *  drives — the `unattached → attached` machine its sibling row `P-SD-SM-1` owns. */
          if (klass !== 'an add at an absent address') {
            expect(registration['attached'], 'C23/§2.11 item 2 — every observed position RESOLVES before the write, so every cell below is a FIRE-SET reading and never an unattached listener').toBe(true)
          }
          expect(writeOn(f, 'generic', CHILD, 'mem', payload)['status'], '§2.5 item 1 step (9)').toBe('committed')
          expect(
            fired,
            expected === 1
              ? 'seams-and-lifecycle.md §2.11 item 5 — a successful write at A fires, once each, every ATTACHED listener at A, at a strict descendant of A and at a strict ancestor of A'
              : 'seams-and-lifecycle.md §2.11 items 4–5 — this position’s listener is NOT attached when the fan-out runs (the write suppressed the address it landed on, or took the strict descendant out from under it), and only ATTACHED listeners fire; the sibling cells of this same class show the two positions that DO fire',
          ).toBe(expected)
        },
      })
    }
  }
  return out
}

/** `P-SD-IM-3` · `S-SD-RANK-1` — the `3 × 3` tier pairs: `6` legal, `3` refused.
 *
 *  **THE DIRECTION IS `store-model.md` §2.2 item 3's, ONE WAY ONLY: *"A NODE MAY NOT BE MORE
 *  PERSISTENT THAN ITS PARENT"*** — `rank(child) ≤ rank(parent)`, terms `9 = 3 × 3` of which `6`
 *  legal and `3` refused (`census.md` §4.4). **THE RANK IS READ OFF THE DECLARED ORDER:** §2.2 item 2
 *  prints the persistence order as *"`file` > `mem` > `temp`"* and §2.5 item 4's purge set is
 *  `purge(file) = {mem, temp}`, i.e. `file` is the LEAST persistent — so with
 *  `TIERS_RANKED = [file, mem, temp]` the rank of a tier is its index + 1 (`file` 1 < `mem` 2 <
 *  `temp` 3) and the LEGAL cells are exactly `(file,file)` · `(mem,file)` · `(mem,mem)` ·
 *  `(temp,file)` · `(temp,mem)` · `(temp,temp)`, i.e. the child's INDEX is GREATER THAN OR EQUAL TO
 *  the parent's; the `3` REFUSED cells are `(file,mem)` · `(file,temp)` · `(mem,temp)`, i.e. the
 *  child's index is STRICTLY LESS. An earlier form of this helper computed the INVERTED comparison
 *  (`indexOf(child) < indexOf(parent)`, which reads a MORE-persistent child as legal) — that was a
 *  defect of this HELPER, corrected here from the clause; the declared term is unchanged at
 *  `9 = 6 + 3`. The sibling row `T-5` derives the same rank from the same order.
 *
 *  **THE DRIVE IS `§2.5` item 7's ARM TABLE'S, CELL BY CELL.** The parent write is a LITERAL at the
 *  1-segment address (`C18`/`C14`: the register entry and its node come into being — `A6`'s
 *  property-address arm), and the child write is a CONTAINER at the two-segment address `CHILD`,
 *  whose immediate parent `ROOT` resolves to a node and whose final segment is an ABSENT PROPERTY
 *  (`A6` lands). The earlier form wrote the parent payload as the CONTAINER `{page: {t: 1}}` at
 *  `ROOT`, which MINTS the link at `page`; `CHILD` is then a NODE LOCATION, so the child write's
 *  container is arm `A2` and is REFUSED (`R17`(a), token 21) before the tier question is ever
 *  reached — the cell drove an arm outside the table and never measured the invariant. Each cell
 *  supplies the fixture's explicit `PAR-11` filesystem double (`store()`) and writes at `mem`/`temp`,
 *  so no cell reaches an unwritable path. */
export function rankAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  for (const parent of TIERS_RANKED) {
    for (const child of TIERS_RANKED) {
      const legal = TIERS_RANKED.indexOf(child) >= TIERS_RANKED.indexOf(parent)
      out.push({
        name: `a ${child} child under a ${parent} parent — ${legal ? 'legal' : 'refused'}`,
        drive: (): void => {
          const f = store()
          call(f, 'write', ROOT, parent, { value: 'the parent’s own literal' })
          const answer = writeOn(f, 'generic', CHILD, child, { value: { t: 2 } })
          if (legal) {
            expect(expectCommitted(answer)['status'], 'store-model.md §2.2 item 3 — rank(child) ≤ rank(parent)').toBe('committed')
          } else {
            expectRefusal(answer, { reason: 'persistence-inversion', step: 'F-TIER' })
          }
        },
      })
    }
  }
  return out
}

/** `P-SD-IM-4` · `S-SD-DUP-1` — `3 (write tier) × 2 (the address's existing instance set)`. */
export function duplicateAttempts(): Attempt[] {
  const out: Attempt[] = []
  for (const tier of TIERS_RANKED) {
    for (const existing of ['an instance already at that tier', 'only at another tier'] as const) {
      out.push({
        name: `${existing} · a ${tier} write replaces the pair's instance wholesale`,
        drive: (): void => {
          const f = store()
          const other = tier === 'file' ? 'mem' : 'file'
          call(f, 'write', ROOT, existing === 'an instance already at that tier' ? tier : other, { value: { seed: 1 } })
          const answer = writeOn(f, 'generic', ROOT, tier, { value: { seed: 2 } })
          if (existing === 'only at another tier' && tier === 'file') {
            // §2.5 item 2's C20 arm: a write at a MORE-persistent tier than the standing instance
            // is refused only when the STANDING instance is the parent, never at a root; a root
            // write is legal and the instances COEXIST across tiers (C21 bans one pair, not two tiers).
            expect(expectCommitted(answer)['status'], 'C21 — two instances across TIERS coexist; only the (address, tier) pair is singular').toBe('committed')
          } else {
            expect(expectCommitted(answer)['status'], 'write-and-read.md §2.8 item 6 — the overwrite arm replaces (address, tier) wholesale').toBe('committed')
          }
          expect(
            readValue(readOn(f, 'generic', ROOT)) as Rec,
            'C21 — no sequence of writes produces a SECOND instance at one (address, tier): the read answers ONE transcription',
          ).toEqual({ seed: 2 })
        },
      })
    }
  }
  return out
}

/** `P-SD-IM-5` · `S-SD-READ-1` — `2 (forms) × 3 (the addressed address's instance set) × 2
 *  (a downstream address: the read's tier held · not). */
export function readFormAttempts(): Attempt[] {
  const out: Attempt[] = []
  const forms: readonly (readonly [string, string | undefined])[] = [
    ['qualified', 'mem'],
    ['unqualified', undefined],
  ]
  const sets: readonly string[] = ['the passed tier', 'another tier only', 'none']
  const downstream: readonly boolean[] = [true, false]
  for (const [form, tier] of forms) {
    for (const set of sets) {
      for (const held of downstream) {
        out.push({
          name: `${form} read · the instance set is ${set} · a downstream address ${held ? 'holds' : 'does not hold'} the read's tier`,
          drive: (): void => {
            const f = store()
            if (set !== 'none') {
              const tierToWrite = set === 'the passed tier' ? (tier ?? 'mem') : 'temp'
              call(f, 'write', ROOT, tierToWrite, { value: { seed: held ? { leaf: 1 } : 1 } })
            }
            const answer = readOn(f, 'generic', ROOT, tier)
            if (set === 'none' && form === 'qualified') {
              expectRefusal(answer, { reason: 'tier-not-held', step: 'F-TIER' })
              return
            }
            if (set === 'another tier only' && form === 'qualified') {
              expectRefusal(answer, { reason: 'tier-not-held', step: 'F-TIER' })
              return
            }
            if (set === 'none') {
              expectRefusal(answer, { reason: 'unknown-root', step: 'B-ROOT' })
              return
            }
            if (set === 'another tier only') {
              // UNQUALIFIED: lowest-persistence wins, so the standing temp instance is the answer.
              expect(readValue(answer), 'write-and-read.md §2.8 item 2 — the unqualified read takes the LOWEST-persistence instance').toEqual({ seed: held ? { leaf: 1 } : 1 })
              return
            }
            const value = readValue(answer) as Rec
            if (held) {
              expect(value['seed'], '§2.8 item 2 (b) — under a passed tier, absence DOWNSTREAM means an absent member and no descent').toEqual({ leaf: 1 })
            } else {
              expect(value['seed'], '§2.8 item 2 — the passed tier is applied at EVERY address it visits, with NO fall-back').toBe(1)
            }
          },
        })
      }
    }
  }
  return out
}

/** `P-SD-IM-6` · `S-SD-TOMB-1` — `2 (read forms) × 2 (the tombstone's address · a descendant) ×
 *  2 (a qualified read of another tier · of the tombstone's own tier).
 *
 *  **`R10`'s TIER-SCOPED READ GOVERNS EVERY QUALIFIED CELL HERE (`§2.6` item 2), AND IT IS THE
 *  DIFFERENCE BETWEEN A QUALIFIED AND AN UNQUALIFIED READ THAT THIS ROW MEASURES.** The tombstone
 *  stands at `CHILD` at `mem` while `ROOT`'s `file` instance carries `page → {active, body:{title}}`:
 *   · **UNQUALIFIED** — `R11`'s two senses: at the tombstone's own address token 6 `'tombstoned'`
 *     (never a transcription, no fall-back), and at EVERY address BELOW it token 3 `'unreachable'`,
 *     *"because the walk cannot pass the tombstone"*.
 *   · **QUALIFIED TO ANOTHER TIER (`file` here)** — *"a read QUALIFIED to another tier reads THAT
 *     TIER SPECIFICALLY (`R9`) and is not suppressed by a tombstone standing at a different tier"*:
 *     at the tombstone's own address the `file` instance is the answer, and **at a DESCENDANT the walk
 *     passes the `mem` tombstone and answers the `file` instance's own transcription at the descendant
 *     address** — because the qualified read asks for THAT TIER at every address it visits (`§2.8`
 *     item 2(a): *"the read takes that tier specifically, AT EVERY ADDRESS IT VISITS, with NO
 *     fall-back"*). The earlier form of this cell demanded token 3 `'unreachable'` there — `R11`'s
 *     **UNQUALIFIED** no-descent reading applied to a QUALIFIED read — which contradicts the clause
 *     the `file`-qualified cell beside it already cites (`RCA-8(d)`; the row's own `P-SD-TP-9` sibling
 *     asserts the same rule at the tombstone's own address).
 *   · **QUALIFIED TO THE TOMBSTONE'S OWN TIER (`mem`)** — at the tombstone's own address *"the read
 *     answers the tombstone's own absence"*: token 4 `'absent-address'`, never the tombstone; and at a
 *     descendant the `mem` tombstone blocks the walk exactly as the unqualified form does — token 3
 *     `'unreachable'`, and no fall-back to `file`. */
export function tombstoneAttempts(): Attempt[] {
  const out: Attempt[] = []
  const forms: readonly (readonly [string, string | undefined])[] = [
    ['unqualified', undefined],
    ['qualified', 'mem'],
  ]
  const addresses: readonly (readonly [string, readonly string[]])[] = [
    ["the tombstone's own address", CHILD],
    ['a descendant address', DEEPER],
  ]
  const qualifiers: readonly string[] = ['another tier', "the tombstone's own tier"]
  for (const [form, tier] of forms) {
    for (const [which, address] of addresses) {
      for (const qualifier of qualifiers) {
        out.push({
          name: `${form} read of ${which} · qualified to ${qualifier}`,
          drive: (): void => {
            const f = store()
            call(f, 'write', ROOT, 'file', { value: { page: { active: true, body: { title: 't' } } } })
            call(f, 'write', CHILD, 'mem', { tombstone: true })
            const readTier = form === 'unqualified' ? undefined : qualifier === 'another tier' ? 'file' : 'mem'
            const answer = readOn(f, 'generic', address, readTier)
            if (form === 'unqualified') {
              expectRefusal(answer, {
                reason: which === "the tombstone's own address" ? 'tombstoned' : 'unreachable',
                step: 'E-CHILD',
              })
              return
            }
            if (qualifier === 'another tier' && which === "the tombstone's own address") {
              expect(readValue(answer), 'write-and-read.md §2.6 item 2 — a read qualified to ANOTHER tier is NOT suppressed by a tombstone standing at a different tier').toEqual({ active: true, body: { title: 't' } })
              return
            }
            if (qualifier === 'another tier') {
              expect(
                readValue(answer),
                'write-and-read.md §2.6 item 2 · §2.8 item 2(a) — a `file`-qualified read of a descendant of the `mem` tombstone takes THAT TIER at every address it visits: it passes the tombstone standing at a different tier and answers the `file` instance’s own transcription at the descendant address',
              ).toEqual({ title: 't' })
              return
            }
            expectRefusal(answer, { reason: which === "the tombstone's own address" ? 'absent-address' : 'unreachable', step: 'E-CHILD' })
          },
        })
      }
    }
  }
  return out
}

/**
 * **`P-SD-IM-7`'s `file`-tier BYTE FORM, RE-DERIVED 2026-10-11 (THE TESTWRITER, ON THE ARCHITECT'S
 * ACTIVE RULING IN `docs/decisions.md`: `(D2)`/`(D3)`, the row of `2026-10-11`; `RCA-8(d)`).**
 * `DD-13`(iv) declares the value arm's SAVE-side bytes: **where a transparent node stands AT A NODE
 * POSITION — a member’s child, or the root of a saved tree — the bytes carry `{"_value": <the
 * literal>}` EXPLICITLY**, because *"the file holds the STATE, and the load re-mints the transparency
 * from the reserved key"* (`C7`: the bytes must *"exactly match the data state"*). **Under `(D2)` EVERY
 * literal-valued member of a container is such a node** — its contents *"translate to a LINKED ANCHOR
 * SET"* and *"a literal-valued member becomes a child node readable as its literal through the
 * reserved `_value` transparency"* (`R16`(e)) — so this row's save-success cells assert the DECLARED
 * byte form rather than the superseded `DD-13` *"A DICT member is a LITERAL ON THE NODE ITSELF"*
 * reading, which the ruling SUPERSEDES (`(D3)`) and which the earlier form of these two cells
 * carried.
 *
 * THE TRANSFORMATION IS EXACTLY `DD-13`(iv)'s TWO ARMS, and nothing else moves:
 *  · an ARRAY becomes an array of its elements' own file forms (its elements are transparent child
 *    nodes, so each is `{"_value": …}` — the array arm *"consumes the children"*);
 *  · a plain OBJECT becomes an object of its members' own file forms;
 *  · a LITERAL (a string, a finite number, a boolean, `null`) becomes `{"_value": <the literal>}` —
 *    the node the state holds at that position;
 * and the row's `[]`/`{}` corner is untouched by it (`{}` has no member to transform, so the empty
 * arms still meet at `{}`, `DD-13`(3)).
 *
 * **WHAT THIS HELPER DOES NOT DO: it is NOT an implementation of the mint, and it re-derives nothing
 * beyond the two bytes these cells already asserted.** It takes the write payload's VALUE and answers
 * the bytes `C7` binds to the state that payload mints — a closed, pure transformation of the
 * closed payload table this row drives (`{seed: 1}` and `{seed: {deeper: 2}}`), so the row's declared
 * term `6 = 3 × 2` and its property (`THE file TIER ALWAYS REPRESENTS THE SAVED STATE`) are unmoved
 * and no cell takes a draw (`§5.5` item 1). */
function fileBytesOf(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((element) => fileBytesOf(element))
  if (value !== null && typeof value === 'object') {
    const out: Rec = {}
    for (const [key, member] of Object.entries(value as Rec)) out[key] = fileBytesOf(member)
    return out
  }
  return { _value: value }
}

/** `P-SD-IM-7` · `S-SD-FILE-1` — `3 (mutation classes) × 2 (save arms)`. */
export function fileTierAttempts(): Attempt[] {
  const out: Attempt[] = []
  const classes: readonly (readonly [string, string, Rec])[] = [
    ['a set-class write', 'file', { value: { seed: 1 } }],
    ['a tombstone write', 'file', { tombstone: true }],
    ['a subtree overwrite', 'file', { value: { seed: { deeper: 2 } } }],
  ]
  const arms: readonly (readonly [string, boolean])[] = [['success', false], ['failure', true]]
  for (const [klass, tier, payload] of classes) {
    for (const [arm, fail] of arms) {
      out.push({
        name: `${klass} · the save ${arm}`,
        drive: (): void => {
          const fs = memoryFs()
          const f = storeOver(fs)
          /** `§2.7` item 5 / `§2.12` item 4 — the `file` tier is USABLE only once the store's own
           *  `load()` has run: a fresh store over an EMPTY file is in the declared UNLOADED state, and
           *  every file-tier read/write before the load refuses `'not-loaded'` (`DD-14`). The load is
           *  this drive's own prerequisite, not an assertion it skips.
           *  `PAR-11` — the explicit filesystem double (`memoryFs`) is supplied here, so this drive
           *  reaches no unwritable path. */
          expect(call(f, 'load')['status'], '§2.12 item 4 — the file tier is loaded before it is driven').toBe('loaded')
          if (klass === 'a subtree overwrite' || klass === 'a tombstone write') {
            call(f, 'write', ROOT, tier, { value: { seed: { deeper: 1 } } })
          }
          const preBytes = fs.bytes(FILE_PATH)
          /** `§2.12` item 4 — a fresh store over an EMPTY file loads with `roots: 0`, so the
           *  addressed address has NEVER been written and its qualified read answers
           *  `'unknown-root'` (`B-ROOT`, `C14`: a root comes into being only by a write at a
           *  1-segment address). The PRE-CALL state is therefore recorded as the read's own DECLARED
           *  answer — refusal included — rather than assumed to be a transcription: the earlier form
           *  demanded a read answer of a state the contract declares EMPTY, which is a defect of this
           *  CELL (the assertion below still holds it byte- and state-identical after the refusal). */
          const preRead = readOn(f, 'generic', ROOT, tier)
          const preState: unknown = isRefusal(preRead) ? preRead : readValue(preRead)
          if (fail) fs.failSaves(1)
          const answer = writeOn(f, 'generic', ROOT, tier, payload)
          if (fail) {
            expectRefusal(answer, { reason: 'save-failed', step: 'I-SAVE' })
            expect(fs.bytes(FILE_PATH), 'write-and-read.md §2.7 item 5 / C7 — the PRE-CALL FILE BYTES stand byte-identical').toBe(preBytes)
            const afterRefusal = readOn(f, 'generic', ROOT, tier)
            expect(
              isRefusal(afterRefusal) ? afterRefusal : readValue(afterRefusal),
              'write-and-read.md §2.7 item 2 — the PRE-CALL FILE-TIER STATE stands (a pre-call refusal stands as the same refusal)',
            ).toEqual(preState)
            return
          }
          const committed = expectCommitted(answer)
          expect(committed['purged'], 'C19 — purge(file) = {mem, temp instances at the address}').toEqual([])
          const savedBytes = fs.bytes(FILE_PATH)
          expect(savedBytes, 'C7 — the file matches the state exactly at every quiescent point').not.toBeNull()
          /** **THIS ROW’S SAVE-SUCCESS BYTE ASSERTION, RE-DERIVED 2026-10-11 FROM `DD-13`(iv) WITH
           *  `(D2)`/`(D3)`** (see `fileBytesOf` above): the tier’s state holds, at each member
           *  position, the CHILD NODE `(D2)`’s mint produced, and the bytes declare it
           *  `{"_value": <the literal>}` — the file holds the STATE and the load re-mints the
           *  transparency from the reserved key. The earlier form asserted the bare literal
           *  (`{tabs: {seed: 1}}`), which is the superseded `DD-13` reading `(D3)` removes; the
           *  assertion is therefore NOT weakened but moved onto the declared form, and it is stated
           *  against the PAYLOAD THIS CELL DRIVES (the closed table above) rather than against a
           *  literal copied from a measurement. */
          if (klass === 'a tombstone write') {
            /** **`P-SD-IM-7`'s `a tombstone write · the save success` CELL, RE-DERIVED FROM `§2.6`
             *  item 3 WITH `R10`/`R12` (`RCA-8(d)`):** *"Tombstoning at file tier omits it from the
             *  saved file, which will delete the node on commit"* — the tombstone node *"is OMITTED
             *  from the file's bytes, and on a SUCCESSFUL commit the node is removed from the graph as
             *  well as from the file"*, and `R11` gives the address *"`'tombstoned'`"* with **no
             *  fall-back**. The earlier form demanded `read(ROOT, 'file') === preState` — a
             *  transcription of a node the clause has just REMOVED — and therefore measured the
             *  contradiction to the clause rather than the property. **The property this row owns is
             *  the CONDENSATION (`C7`/`R3`): the tier's state and the file's bytes AGREE at every
             *  quiescent point** — so what is asserted is the removal in BOTH its declared places. */
            expect(committed['tombstoned'], '§2.6 item 3 — the committed record declares the tombstone').toBe(true)
            const saved = JSON.parse(savedBytes ?? '{}') as Rec
            expect(
              Object.prototype.hasOwnProperty.call(saved, ROOT[0]),
              'C7/§2.6 item 3 — THE FILE’S BYTES CARRY NO INSTANCE AT THE TOMBSTONED ADDRESS: the tombstone is omitted from the saved file, so a fresh load cannot re-mint the node',
            ).toBe(false)
            /** The tier's own state, read through the store: the address is DELETED, so the read is
             *  a REFUSAL — the tombstone's own absence at its tier (`R10`) or the deletion marker
             *  (`R11`) — and never a transcription of the pre-state. Together with the bytes above,
             *  this is the condensation: the file and the tier say the SAME thing. */
            const afterCommit = readOn(f, 'generic', ROOT, tier)
            expect(
              isRefusal(afterCommit),
              '§2.6 items 2–3 · R11 — the tier’s state for the tombstoned address is that it is NOT THERE (the tombstone is never returned and there is no fall-back)',
            ).toBe(true)
            expect(
              isRefusal(afterCommit) ? afterCommit['reason'] : 'a transcription',
              '§2.14 item 3 — the deletion is reported as the deletion: `tombstoned` (`R11`) or the tombstone’s own absence at its tier (`R10`), never `absent-address`-by-never-written and never a transcription',
            ).toMatch(/^(tombstoned|absent-address)$/)
            return
          }
          expect(readValue(readOn(f, 'generic', ROOT, tier)), 'C7 — the tier is representative of the saved state').toEqual(
            payload['value'],
          )
          expect(
            JSON.parse(savedBytes ?? 'null'),
            'C7 — the CONDENSATION: the file’s bytes and the tier’s state agree (the addressed root’s own instance is what the file carries), and `DD-13`(iv)/`(D2)` fix the FORM of that state at a member position: `{"_value": <the literal>}` EXPLICITLY, because the state holds the child node the mint produced',
          ).toEqual({ [ROOT[0]]: fileBytesOf(payload['value']) })
        },
      })
    }
  }
  return out
}

/** `P-SD-IM-8` · `S-SD-REC-1` — `16 = 6 (3 classes × 2 save arms) + 10 (every function driven to a
 *  refusal, the load included)`. */
export function recordAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  const classes: readonly (readonly [string, Rec])[] = [
    ['a set-class write', { value: { seed: 1 } }],
    ['a tombstone write', { tombstone: true }],
    ['a subtree overwrite', { value: { seed: { deeper: 2 } } }],
  ]
  for (const [klass, payload] of classes) {
    for (const arm of ['success', 'failure'] as const) {
      out.push({
        name: `${klass} · the save ${arm} answers a RETURNED typed record and never throws`,
        drive: (): void => {
          const fs = memoryFs()
          const f = storeOver(fs)
          /** `§2.7` item 5 / `§2.12` item 4 — the same prerequisite as `fileTierAttempts`: the
           *  `file` tier is driven only after the store's own `load()` (`DD-14`).
           *  `PAR-11` — the explicit filesystem double (`memoryFs`) is supplied here. */
          call(f, 'load')
          if (klass !== 'a set-class write') call(f, 'write', ROOT, 'file', { value: { seed: { deeper: 1 } } })
          if (arm === 'failure') fs.failSaves(1)
          let answer: Rec | null = null
          expect(() => {
            answer = writeOn(f, 'generic', ROOT, 'file', payload)
          }, 'store-model.md §2.14 item 4 — a store-level function NEVER throws for a data condition').not.toThrow()
          expect(isRefusal(answer as unknown as Rec) || (answer as unknown as Rec)['status'] === 'committed', 'C7/R8 — the answer is one of the declared records').toBe(true)
        },
      })
    }
  }
  const functions: readonly (readonly [string, () => Rec])[] = [
    ['read', () => call(store(), 'read', ['nope'])],
    ['write', () => call(store(), 'write', ['nope'], 'mem', { value: 1 })],
    ['listen', () => call(store(), 'listen', ['nope'], () => undefined)],
    ['constrain', () => call(store(), 'constrain', ['nope'], { constraint: () => ({ ok: true }) })],
    ['load', () => call(store(), 'load')],
    ['secureRead', () => call(storeWithAccess('not-blocked'), 'secureRead', ['nope'])],
    ['secureWrite', () => call(storeWithAccess('not-blocked'), 'secureWrite', ['nope'], { value: 1 })],
    ['secureListen', () => call(storeWithAccess('not-blocked'), 'secureListen', ['nope'], () => undefined)],
    ['secureConstrain', () => call(storeWithAccess('not-blocked'), 'secureConstrain', ['nope'], { constraint: () => ({ ok: true }) })],
    ['secureLoad', () => call(storeWithAccess('not-blocked'), 'secureLoad')],
  ]
  for (const [name, drive] of functions) {
    out.push({
      name: `the ten functions · \`${name}\` driven to a refusal, never a throw`,
      drive: (): void => {
        let answer: Rec | null = null
        expect(drive, `store-model.md §2.14 item 4 — \`${name}\` must answer a returned typed record`).not.toThrow()
        answer = drive()
        /** **WHAT THIS ROW ASSERTS, RE-DERIVED FROM `R8`/`§2.14` item 4:** *"All file-tier mutations,
         *  observed as a RETURNED typed record"* and *"every FAIL-STATE is a returned typed record"*.
         *  The contract does NOT declare that every one of the ten functions must REFUSE at an
         *  unknown root — `write` and `listen` at `['nope']` are legal drives whose declared answer
         *  is an ordinary record (`listen` answers `{address, attached}`), and only a `Refusal`
         *  carries a `reason`. The earlier form demanded a Refusal of all ten and was therefore a
         *  defect of this CELL: what is asserted now is that EVERY function answers a DECLARED
         *  typed record and never throws, and that any refusal it does answer mints a token from the
         *  CLOSED union. */
        const record = answer as unknown as Rec
        if (isRefusal(record)) {
          expect(
            ENUMERATED_REASON_TOKENS.includes(String(record['reason'])),
            `P-SD-IM-8/§2.14 — \`${name}\`'s refusal mints a token inside the closed union`,
          ).toBe(true)
        } else {
          expect(
            typeof record['status'] === 'string' || record['address'] !== undefined,
            `P-SD-IM-8 — \`${name}\` answers a declared typed record`,
          ).toBe(true)
        }
      },
    })
  }
  return out
}

/** `P-SD-IM-9` · `S-SD-PURGE-1` — `5 = 3 (the purge set per write tier) + 2 (the R7 bound)`. */
export function purgeAttempts(): Attempt[] {
  const out: Attempt[] = []
  const sets: readonly (readonly [string, string, readonly string[]])[] = [
    ['purge(temp) = ∅', 'temp', []],
    ['purge(mem) = {temp}', 'mem', ['temp']],
    ['purge(file) = {mem, temp}', 'file', ['mem', 'temp']],
  ]
  for (const [label, tier, expected] of sets) {
    out.push({
      name: `${label} — asserted exactly, after a successful commit`,
      drive: (): void => {
        const f = store()
        call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
        call(f, 'write', ROOT, 'mem', { value: { seed: 2 } })
        call(f, 'write', ROOT, 'temp', { value: { seed: 3 } })
        const answer = expectCommitted(writeOn(f, 'generic', ROOT, tier, { value: { seed: 4 } }))
        expect(answer['purged'], 'write-and-read.md §2.5 item 4 — the purge’s set is EXACTLY the strictly-lower-persistence instances at the address').toEqual(expected)
      },
    })
  }
  out.push({
    name: 'the R7 bound · while a temp instance stands, the retained most-persistent copy is NOT removed by any purge',
    drive: (): void => {
      const f = store()
      call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
      call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
      const answer = expectCommitted(writeOn(f, 'generic', ROOT, 'temp', { value: { seed: 'temp2' } }))
      expect(answer['purged'], 'R7 — purge(temp) removes NOTHING, so the retained file copy stands').toEqual([])
      expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'R7/C9 — the retained copy is intact for the rollback').toEqual({ seed: 'file' })
    },
  })
  out.push({
    name: 'the R7 bound · the retained copy PURGED while a temp instance stands ⇒ FAIL',
    drive: (): void => {
      const f = store()
      call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
      call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
      expectCommitted(writeOn(f, 'generic', ROOT, 'temp', { value: { seed: 'temp2' } }))
      expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'R7 — no purge may delete the retained lower copy while a temp instance of the address stands').toEqual({ seed: 'file' })
      expect(readValue(readOn(f, 'generic', ROOT)), 'R9 — the temp instance governs the unqualified read while it stands').toEqual({ seed: 'temp2' })
    },
  })
  return out
}

/** `P-SD-IM-10` · `S-SD-REG-1` — `4 = 4 (the four asserted parts; the five ABSENT structures ride
 *  the same table)`. */
export function registerAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  for (const part of ['the root name as the entry’s child order/key', 'the root node as its child', 'the ordered constraint list', 'NO distinct parent'] as const) {
    out.push({
      name: `C14 — ${part} is asserted through the register's own surface`,
      drive: (): void => {
        const f = store()
        /** `C24`/`PAR-12` — `roots` counts the register entries the LOAD mints from the `file`'s
         *  bytes, so the root must be minted AT THE FILE TIER to be counted (`§2.7` item 3, `DD-12`:
         *  the save descends only through `file`-instance children). The earlier form wrote at `mem`
         *  and then demanded `roots === 1` — a defect of this CELL: the contract declares `roots: 0`
         *  for a `mem`-only root, and `§2.7` item 5's declared prerequisite (the `load()`) is what
         *  makes the tier usable at all. `PAR-11` — the fixture supplies the explicit `memoryFs`
         *  double here, so no unwritable path is reached. */
        call(f, 'load')
        call(f, 'write', ROOT, 'file', { value: { seed: 1 } })
        const registerEntryCount = call(f, 'load')['roots']
        expect(registerEntryCount, 'C14 — a root comes into being only by a write at a 1-segment address').toBe(1)
        expect(readValue(readOn(f, 'generic', ROOT)), 'C14 — the entry names its root node as its child').toEqual({ seed: 1 })
      },
    })
  }
  return out
}

/** `P-SD-IM-11` · `S-SD-GEN-1` — `12 = 10 (the ten functions, each naming no application
 *  vocabulary) + 2 (the two absent structures)`. */
export function noVocabularyAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  /** `S-SD-GEN-1` — `12 = 10 (the ten store-level functions, each asserted to name no application
   *  vocabulary and no constraint kind) + 2 (the two absent structures: a constraint-kind table ·
   *  a name/value whitelist)`. EVERY row of the term is driven, one per name. */
  for (const name of [...GENERIC_FUNCTIONS, ...SECURE_FUNCTIONS]) {
    out.push({
      name: `\`${name}\` names no application vocabulary and no constraint kind`,
      drive: (): void => {
        expect(name in store().store, 'R1/R4 — the surface is a member table of functions, none of them a constraint kind').toBe(true)
        expect(['kind', 'repairAction', 'refusalReason'].includes(name), 'R4 — no constraint-kind table exists (the landed family’s is STALE PENDING)').toBe(false)
      },
    })
  }
  out.push({
    name: 'the absent structure (1 of 2) · NO constraint-kind table exists on the surface',
    drive: (): void => {
      const f = store()
      expect('kinds' in f.store || 'constraintKinds' in f.store, 'R4 — the store ships no constraint, names no constraint kind and declares no round limit').toBe(false)
    },
  })
  out.push({
    name: 'the absent structure (2 of 2) · NO name/value whitelist exists: any non-empty segment is legal',
    drive: (): void => {
      const f = store()
      expect(call(f, 'write', ['anySegmentName'], 'mem', { value: 'x' })['status'], 'R2 — DO NOT construct an address or value whitelist').toBe('committed')
      expect(call(f, 'write', ['_value'], 'mem', { value: 'x' })['status'], 'PAR-1a — a segment spelled `_value` is LEGAL: the reservation is on the MEMBER KEY, a different referent').toBe('committed')
    },
  })
  return out
}

export function listenerMachineAttempts(): Attempt[] {
  return [
    {
      name: 'unattached → attached at a successful write',
      drive: (): void => {
        const f = store()
        expect(call(f, 'listen', CHILD, () => undefined)['attached'], 'C23 — an unreachable target waits UNATTACHED').toBe(false)
        call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
        const again = call(f, 'listen', ROOT, () => undefined)
        expect(again['attached'], '§2.11 item 4 — attachment is re-evaluated at the END of every successful write').toBe(true)
      },
    },
    {
      name: 'unattached → attached at a successful load',
      drive: (): void => {
        const fs = memoryFs()
        const f = storeOver(fs)
        expect(call(f, 'listen', ROOT, () => undefined)['attached'], 'C23 — no address resolves before the load').toBe(false)
        fs.seed(FILE_PATH, JSON.stringify({ tabs: { seed: 1 } }))
        expect(call(f, 'load')['status'], '§2.12 item 1 — the load mints the file instances').toBe('loaded')
        expect(call(f, 'listen', ROOT, () => undefined)['attached'], '§2.11 item 4 — the load re-evaluates attachment').toBe(true)
      },
    },
    {
      name: 'attached → attached across a re-mint',
      drive: (): void => {
        const f = store()
        call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
        let observed: unknown = null
        call(f, 'listen', CHILD, () => {
          observed = readValue(readOn(f, 'generic', CHILD))
        })
        /** THE RE-MINT DRIVE, RE-DERIVED FROM `§2.5` item 7's ARM TABLE: `CHILD` is an address
         *  carried by an EXISTING link after the first write, so `M-PROP` answers NODE LOCATION and
         *  a CONTAINER there is arm `A2` — REFUSED (`node-location-container`), which would land
         *  nothing and this drive would prove nothing. A LITERAL at that address is arm `A1`/`A3`
         *  (`R16`(a): *"re-mint the node with the literal added at that property"*), which LANDS and
         *  re-mints the immediate parent — the re-mint this row is about. The listener is attached
         *  BY ADDRESS (`C23`), so it follows the address across that re-mint. */
        expect(
          expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: 'a literal' }))['status'],
          `§2.5 item 7 A1/A3 — a LITERAL at a NODE LOCATION lands (a CONTAINER there is A2 and REFUSED)`,
        ).toBe('committed')
        expect(observed, 'C4/§2.11 item 3 — attachment is BY ADDRESS and follows the address across every re-mint').toBe('a literal')
      },
    },
    {
      name: 'attached → unattached when the address stops resolving',
      drive: (): void => {
        const fs = memoryFs()
        const f = storeOver(fs)
        /** `§2.7` item 5 / `§2.12` item 4 — the `file` tier is the tier this drive's detach instrument
         *  needs, and it is usable only once the store's own `load()` has run (`DD-14`); `PAR-11` —
         *  the explicit `memoryFs` double is supplied, so no unwritable path is reached. */
        expect(call(f, 'load')['status'], '§2.12 item 1 — the file tier is loaded before it is driven').toBe('loaded')
        call(f, 'write', CHILD, 'file', { value: { seed: 1 } })
        expect(call(f, 'listen', CHILD, () => undefined)['attached'], 'C23 — the target resolves').toBe(true)
        /** **THE ADDRESS GENUINELY STOPS RESOLVING BY `R12` ITSELF**: a `file`-tier tombstone *"is
         *  OMITTED from the file's bytes, and on a SUCCESSFUL commit the node is removed from the
         *  graph as well as from the file"* (`§2.6` item 3), so the address reads as deleted — the
         *  module's own qualified read of that tier then answers the tombstone's own absence
         *  (`'absent-address'`, `R10`). The earlier form of this cell overwrote `ROOT` with a
         *  container holding a LITERAL at `page` (`{page: 'a literal now'}`) and demanded
         *  `attached: false` — a defect of this CELL: the address then resolves to a LITERAL
         *  PROPERTY, which `§2.11` item 2's own test (`attached` is TRUE iff the address resolves and
         *  is not tombstone-suppressed) — and the GREEN `N-6` row — pins as `attached: true`. */
        expect(
          expectCommitted(call(f, 'write', CHILD, 'file', { tombstone: true }))['status'],
          'R12/§2.6 item 3 — the `file` tombstone commits and takes the node out of the graph and the file',
        ).toBe('committed')
        expect(
          isRefusal(call(f, 'read', CHILD, 'file')),
          'R10/§2.6 item 2 — the committed `file` tombstone leaves the address non-resolving (a qualified read of its own tier answers its own absence)',
        ).toBe(true)
        expect(call(f, 'listen', CHILD, () => undefined)['attached'], '§2.11 item 4 — an address that stopped resolving becomes unattached').toBe(false)
      },
    },
    {
      name: 'ILLEGAL · a fire while unattached ⇒ FAIL',
      drive: (): void => {
        const f = store()
        let fired = 0
        call(f, 'listen', CHILD, () => {
          fired += 1
        })
        call(f, 'write', ROOT, 'mem', { value: { other: 1 } })
        expect(fired, '§2.11 item 5 — an UNATTACHED listener does not fire').toBe(0)
      },
    },
    {
      name: 'ILLEGAL · an attachment with neither a write nor a load ⇒ FAIL',
      drive: (): void => {
        const f = store()
        expect(call(f, 'listen', ROOT, () => undefined)['attached'], 'C23 — only a successful write or load attaches').toBe(false)
      },
    },
    {
      name: 'ILLEGAL · a detach on a re-mint ⇒ FAIL',
      drive: (): void => {
        const fs = memoryFs()
        const f = storeOver(fs)
        expect(call(f, 'load')['status'], '§2.12 item 1 — the file tier of this drive’s detach instrument is loaded').toBe('loaded')
        call(f, 'write', CHILD, 'file', { value: { seed: 1 } })
        let fired = 0
        call(f, 'listen', CHILD, () => {
          fired += 1
        })
        /** **THE RE-MINT DRIVE, RE-DERIVED FROM `§2.5` item 7's ARM TABLE (`RCA-8(d)`):** `CHILD` is
         *  carried by an EXISTING link, so `M-PROP` answers NODE LOCATION — a CONTAINER there is arm
         *  `A2` and is REFUSED (`'node-location-container'`, `R17`(a)/`R16`(d)), landing nothing, and
         *  the earlier form of this cell (a container overwrite at `CHILD`) consequently measured a
         *  write that never happened (its reading was `fired 0` against an expectation of `1`). A
         *  LITERAL at the node location is `A1`/`A3` (`R16`(a)): it LANDS, discards the node that
         *  stood there, sets the literal at the final segment and MINTS NO CHILD — which is exactly a
         *  re-mint of the path. */
        expect(isRefusal(call(f, 'write', ['tabs', 'other'], 'file', { value: { seed: 1 } })), 'C4 — an unrelated address is an ordinary write').toBe(false)
        expect(fired, 'C4 — a write ELSEWHERE never detaches a listener and never fires it').toBe(0)
        expect(
          expectCommitted(call(f, 'write', CHILD, 'file', { tombstone: true }))['status'],
          'R12/§2.6 item 3 — the tombstone at the listener’s own address commits: this write is the one that DETACHES it',
        ).toBe('committed')
        expect(fired, '§2.11 items 4–5 — the tombstone write detached the listener at its own address, so it did not fire on that write').toBe(0)
        expect(
          call(f, 'listen', CHILD, () => undefined)['attached'],
          'C23 — the tombstoned address no longer resolves, so the listener stands UNATTACHED',
        ).toBe(false)
        /** **THE RE-MINT ITSELF, ON THE SAME ADDRESS: the `A3` literal re-mints the path and the
         *  address RESOLVES again, so the write’s own attachment re-evaluation (`§2.11` item 4)
         *  re-attaches the listener — *"a re-mint of the target node does not detach it"* — and the
         *  fan-out then fires it ONCE (`§2.11` item 5: the listener’s address IS the written
         *  address). A row in which a re-mint detaches the attachment FAILS.** */
        expect(
          expectCommitted(writeOn(f, 'generic', CHILD, 'file', { value: 'a literal' }))['status'],
          '§2.5 item 7 A1/A3 — a LITERAL at a NODE LOCATION LANDS and re-mints the path (a CONTAINER there is `A2` and REFUSED)',
        ).toBe('committed')
        expect(fired, 'C4/§2.11 items 3–5 — attachment is BY ADDRESS and follows the address across the re-mint: the re-minted target is the address the listener stands at, so it fires once').toBe(1)
      },
    },
    {
      name: 'ILLEGAL · an attachment to a tombstone-suppressed address ⇒ FAIL',
      drive: (): void => {
        const f = store()
        call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
        call(f, 'write', CHILD, 'mem', { tombstone: true })
        expect(call(f, 'listen', CHILD, () => undefined)['attached'], '§2.11 item 4 — a tombstone-suppressed address is NOT attached (an unqualified read refuses)').toBe(false)
      },
    },
  ]
}

/** `P-SD-SM-2` · `S-SD-LOAD-1` — `6 = 3 (the load's arms) × 2 (the listeners' arms)`. */
export function loadMachineAttempts(): Attempt[] {
  const out: Attempt[] = []
  const arms: readonly (readonly [string, string | null])[] = [
    ['present and parseable', JSON.stringify({ tabs: { seed: 1 } })],
    ['absent', null],
    ['present and unparsable', '{not json'],
  ]
  for (const [arm, bytes] of arms) {
    for (const listeners of ['fired exactly once, after the load', 'not fired'] as const) {
      out.push({
        name: `the load's arm: ${arm} · the listeners ${listeners}`,
        drive: (): void => {
          const fs = memoryFs()
          const f = storeOver(fs)
          if (bytes !== null) fs.seed(FILE_PATH, bytes)
          let fired = 0
          if (listeners === 'fired exactly once, after the load') call(f, 'listen', ROOT, () => {
            fired += 1
          })
          const answer = call(f, 'load')
          if (arm === 'present and unparsable') {
            expectRefusal(answer, { reason: 'load-failed', step: 'J-LOAD', segment: null })
            expect(fired, '§2.12 item 4 — a refused load fires NO listener').toBe(0)
            expect(call(f, 'read', ROOT, 'file')['reason'], '§2.12 item 4 (i) — every file-tier read refuses `not-loaded`').toBe('not-loaded')
            expect(fs.puts(), '§2.12 item 4 (ii) — NO file is written: the operator’s bytes are never clobbered').toBe(0)
            return
          }
          /** `C24`/`§2.12` item 1 — the load answers a **`LoadRecord`** (`{status:'loaded', present,
           *  roots}`), never the write's `committed` record: asserting `expectCommitted` here would
           *  demand a record the contract does not declare for this function. This was a defect of
           *  this CELL, corrected from the clause. */
          expect(answer['status'], 'C24 — the load answers a LoadRecord').toBe('loaded')
          if (arm === 'absent') {
            expect(answer['present'], '§2.12 item 4 — a missing file is NOT a failure').toBe(false)
            expect(answer['roots'], '§2.12 — nothing was minted').toBe(0)
            expect(fired, '§2.12 — nothing resolves, so no listener fires').toBe(0)
            return
          }
          expect(answer['present'], 'PAR-12 — `present` reports that the file existed').toBe(true)
          expect(answer['roots'], 'PAR-12 — `roots` counts the register entries minted').toBe(1)
          expect(fired, listeners === 'not fired' ? '§2.12 item 3 — a listener registered AFTER the load is owed NOTHING (PAR-12: a load that fires before the whole mint FAILS)' : 'C24 — the fan-out fires ONCE, in registration order, AFTER the whole load has completed').toBe(
            listeners === 'not fired' ? 0 : 1,
          )
        },
      })
    }
  }
  return out
}

/** `P-SD-SM-3` · `S-SD-TEMP-1` — `6 = 3 (the temp instance's arms) × 2 (the retained lower copy)`. */
export function tempAttempts(): Attempt[] {
  const out: Attempt[] = []
  const arms: readonly (readonly [string, () => void])[] = [
    ['minted', () => undefined],
    ['dropped by a superseding write', () => undefined],
    ["dropped by the session's end", () => undefined],
  ]
  for (const [arm] of arms) {
    for (const retained of ['restored to the read', 'purged'] as const) {
      out.push({
        name: `the temp instance ${arm} · the retained lower copy ${retained}`,
        drive: (): void => {
          const f = store()
          call(f, 'write', ROOT, 'file', { value: { seed: 'file' } })
          call(f, 'write', ROOT, 'temp', { value: { seed: 'temp' } })
          expect(readValue(readOn(f, 'generic', ROOT)), 'C9 — the temp instance governs the unqualified read while it stands').toEqual({ seed: 'temp' })
          if (arm === 'minted') {
            expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'C9/R7 — the more-persistent instance is RETAINED, not purged').toEqual({ seed: 'file' })
            return
          }
          // The two drop arms: a superseding write at the address, or the session's end (a fresh
          // store instance over the same paths — C1 makes the state closure-private, DD-7).
          const after = storeOver(f.fs)
          /** `§2.12` item 4 / `§2.7` item 5 — the session-boundary store is a FRESH instance and its
           *  `file` tier is UNLOADED until its own `load()` runs (`DD-14`); the rollback's evidence is
           *  the file the first instance committed, so the load is this drive's own prerequisite.
           *  `PAR-11` — the same explicit `memoryFs` double is supplied to both instances. */
          expect(call(after, 'load')['status'], '§2.12 item 1 — the fresh instance hydrates its file tier').toBe('loaded')
          if (arm === 'dropped by a superseding write') {
            call(f, 'write', ROOT, 'temp', { value: { seed: 'temp2' } })
            expect(readValue(readOn(f, 'generic', ROOT)), 'R7 — a later write at the same address at an equal-or-lower tier drops the temp instance').toEqual({ seed: 'temp2' })
          }
          expect(readValue(readOn(after, 'generic', ROOT, 'file')), 'R7 — the retained copy is the read’s answer once the temp instance ceases to exist; NO verb performs the rollback').toEqual({ seed: 'file' })
          expect(readValue(readOn(after, 'generic', ROOT)), 'R7/DD-7 — after the session boundary the retained lower-tier state is what reads').toEqual({ seed: 'file' })
        },
      })
    }
  }
  return out
}

/** `P-SD-SM-4` · `S-SD-GATE-1` — `10 = 5 (the secure functions) × 2 (the reader's readings)`. */
export function gateAttempts(): Attempt[] {
  const out: Attempt[] = []
  for (const name of SECURE_FUNCTIONS) {
    for (const arm of ['blocked', 'not blocked'] as const) {
      out.push({
        name: `\`${name}\` · the reader says the MCP server is ${arm}`,
        drive: (): void => {
          const f = storeWithAccess(arm === 'blocked' ? 'blocked' : 'not-blocked')
          const args: readonly unknown[] =
            name === 'secureLoad'
              ? []
              : name === 'secureRead'
                ? [ROOT]
                : name === 'secureListen'
                  ? [ROOT, () => undefined]
                  : name === 'secureConstrain'
                    ? [ROOT, { constraint: () => ({ ok: true }) }]
                    : [ROOT, { value: { seed: 1 } }]
          const answer = call(f, name, ...args)
          expect(f.accessReadings.length, '§2.9 item 4 — the reader is consulted ONCE per call, at that call’s own turn').toBe(1)
          if (arm === 'not blocked') {
            expectRefusal(answer, { reason: 'secure-gated', step: 'K-GATE' })
          } else {
            /** **`§2.9` item 4 — *"`true` = the MCP server is BLOCKED ⇒ access is granted"*, so the
             *  call PROCEEDS and the granted arm is asserted through THE DECLARED RECORD SHAPE OF THE
             *  FUNCTION DRIVEN** (`store-model.md` §2.1: `secureLoad` ⇒ `LoadRecord` · `secureRead` ⇒
             *  `ReadAnswer` · `secureWrite` ⇒ `WriteRecord` · `secureListen` ⇒ `ListenerRecord =
             *  {address, attached}` · `secureConstrain` ⇒ `ConstraintRecord = {address, position}`).
             *  **The earlier form of this cell asserted `typeof answer['status'] === 'string'` — a
             *  member NO declared record carries**: `ListenerRecord` and `ConstraintRecord` have the
             *  two members above and no `status`, the GREEN `N-6`/`N-7` rows pin their exact key sets,
             *  and the only shape that would have satisfied that demand is a REFUSAL ON A GRANTED
             *  CALL — which `§2.9` item 4 forbids. No `status` member is added to any record and
             *  `§2.9` is not amended: the granted arm is read off the surface the contract declares.
             *  `PAR-11` — the fixture supplies the explicit `memoryFs` double, so the secure path is
             *  the double's too. */
            const refusalKeys = [...REFUSAL_KEYS].sort()
            const declaredKeys: readonly (readonly [string, readonly string[]])[] =
              name === 'secureListen'
                ? [['ListenerRecord', ['address', 'attached']]]
                : name === 'secureConstrain'
                  ? [['ConstraintRecord', ['address', 'position']]]
                  : name === 'secureWrite'
                    ? [['WriteRecord', ['status', ...COMMITTED_PAYLOAD_KEYS]]]
                    : name === 'secureRead'
                      ? [['ReadAnswer', ['status', 'value', 'tier']]]
                      : [['LoadRecord', ['status', 'present', 'roots']]]
            if (isRefusal(answer)) {
              // A granted call PROCEEDS (`§2.9` item 4): a refusal is a LATER arm's, never the gate's.
              expect(Object.keys(answer).sort(), `§2.1/§2.14 item 2 — a granted \`${name}\` that refuses carries the closed five-member Refusal, and its token is not the gate's`).toEqual(refusalKeys)
              expect(
                answer['reason'],
                `§2.9 item 4 — the reader said the MCP server IS blocked, so the gate cannot be why \`${name}\` refused: \`K-GATE\`/\`secure-gated\` here would be a granted call refusing as the gate`,
              ).not.toBe('secure-gated')
              expect(answer['step'], `§2.9 item 4 — and not at the gate's own step`).not.toBe('K-GATE')
            } else {
              expect(
                declaredKeys.some(([, keys]) => JSON.stringify([...keys].sort()) === JSON.stringify(Object.keys(answer).sort())),
                `§2.1 — the granted arm answers the DECLARED record of \`${name}\` (${declaredKeys.map(([record, keys]) => `${record} = ${keys.join('+')}`).join(' · ')}), never a record carrying a \`status\` member the contract does not declare`,
              ).toBe(true)
            }
            if (name === 'secureListen') {
              expect(answer['attached'], '§2.11 item 2 / C23 — the attached member the granted call answers is the attachment reading').toBe(false)
            }
            if (name === 'secureConstrain') {
              expect(answer['position'], 'C13/§2.10 item 2 — the granted registration answers its OWN position in the addressed list').toBe(0)
              expect(answer['address'], '§2.1 — the registration’s own address').toEqual(ROOT)
            }
          }
        },
      })
    }
  }
  return out
}

/** `P-SD-TP-1` · `S-SD-RTOT-1` — `12 = 8 (the read's closed applicable reason set) + 4 (the four
 *  diagnostic members carried by every refusal)`. */
export function readTotalityAttempts(): Attempt[] {
  const out: Attempt[] = []
  const drives: readonly (readonly [string, () => Rec])[] = [
    ['a non-array address', () => call(store(), 'read', 'tabs')],
    ['an empty array address', () => call(store(), 'read', [])],
    ['a non-string segment', () => call(store(), 'read', [7])],
    ['an empty-string segment', () => call(store(), 'read', [''])],
    ['an unknown root', () => call(store(), 'read', ['nope'])],
    ['an intermediate arm that fails', () => call(store(), 'read', CHILD)],
    ['an addressed node that does not exist under a resolved parent', () => {
      const f = store()
      call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
      return call(f, 'read', CHILD)
    }],
    ['a qualified read of a tier the address does not hold', () => {
      const f = store()
      call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
      return call(f, 'read', ROOT, 'file')
    }],
  ]
  for (const [name, drive] of drives) {
    out.push({
      name: `the read's applicable set · ${name} answers a Refusal with its four diagnostics`,
      drive: (): void => {
        const answer = drive()
        const r = refusalOf(answer)
        expect(Object.keys(r).sort(), 'C17/§2.14 item 2 — the closed five-member refusal, whose fourth member is the LIST').toEqual([...REFUSAL_KEYS].sort())
      },
    })
  }
  for (const member of ['reason', 'step', 'segment', 'messages'] as const) {
    out.push({
      name: `the diagnostic member \`${member}\` is carried by every refusal`,
      drive: (): void => {
        const answer = call(store(), 'read', [''])
        const r = refusalOf(answer)
        expect(member in r, `§2.14 item 2 — every refusal carries \`${member}\``).toBe(true)
        if (member === 'messages') {
          expect(messagesOf(r).length, '§2.14 item 2 — `messages.length ≥ 1`').toBeGreaterThan(0)
        }
        if (member === 'step') expect(STEP_IDS.includes(String(r['step'])), '§2.14 — the step is one of the 13 step ids').toBe(true)
      },
    })
  }
  return out
}

/** `P-SD-TP-2` · `S-SD-WTOT-1` — `21 = 14 (the write's closed applicable reason set) + 7 (the
 *  committed record's payload members)`. */
export function writeTotalityAttempts(): Attempt[] {
  const out: Attempt[] = []
  const drives: readonly (readonly [string, () => Rec])[] = [
    ['a non-array address', () => call(store(), 'write', 'tabs', 'mem', { value: 1 })],
    ['an unknown root at a descendant address', () => call(store(), 'write', ['a', 'b'], 'mem', { value: 1 })],
    ['an intermediate arm that fails', () => call(store(), 'write', CHILD, 'mem', { value: 1 })],
    ['an absent tier argument', () => call(store(), 'write', ROOT, undefined, { value: 1 })],
    ['a tier that is not one of the three ranked tokens', () => call(store(), 'write', ROOT, 'disk', { value: 1 })],
    ['a value outside the admission set', () => call(store(), 'write', ROOT, 'mem', { value: undefined })],
    ['a payload with a value beside a tombstone', () => call(store(), 'write', ROOT, 'mem', { value: 1, tombstone: true })],
    ['a payload asking for the transparency beside a tombstone', () => call(store(), 'write', ROOT, 'mem', { value: 1, transparent: true, tombstone: true })],
    ['a container written at a node location', () => {
      const f = store()
      call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
      return call(f, 'write', CHILD, 'mem', { value: { seed: 2 } })
    }],
    ['a container written to the reserved `_value`', () => call(store(), 'write', ROOT, 'mem', { value: { seed: 1 }, transparent: true })],
    ['a second member beside a `_value` literal', () => {
      const f = store()
      call(f, 'write', ROOT, 'mem', { value: 1, transparent: true })
      return call(f, 'write', ROOT, 'mem', { value: { second: 2 } })
    }],
    ['a constraint answering `{ok:false, message}`', () => {
      const f = store()
      register(f, ROOT, [{ ok: false, message: 'the module’s own message' }])
      return call(f, 'write', ROOT, 'mem', { value: 1 })
    }],
    ['a constraint answering outside the three arms', () => {
      const f = store()
      register(f, ROOT, [{ oops: true }])
      return call(f, 'write', ROOT, 'mem', { value: 1 })
    }],
    ['a file-tier write whose save fails', () => {
      const fs = memoryFs()
      const f = storeOver(fs)
      fs.failSaves(1)
      return call(f, 'write', ROOT, 'file', { value: 1 })
    }],
  ]
  for (const [name, drive] of drives) {
    out.push({
      name: `the write's applicable set · ${name} answers a Refusal`,
      drive: (): void => {
        expectRefusal(drive())
      },
    })
  }
  for (const member of COMMITTED_PAYLOAD_KEYS) {
    out.push({
      name: `the committed record's payload member \`${member}\` is present, and the member set is CLOSED`,
      drive: (): void => {
        const f = store()
        const r = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
        expect(Object.keys(r).sort(), `P-SD-TP-2 — the committed record's member set is exactly \`status\` + the seven payload members`).toEqual(['status', ...COMMITTED_PAYLOAD_KEYS].sort())
        expect(member in r, `store-model.md §2.1 (R15) — the seventh payload member \`${member}\``).toBe(true)
      },
    })
  }
  return out
}

/** `P-SD-TP-3` · `S-SD-ADDR-1` — `6 = 4 (the malformed arms) + 2 (the two legal extremes)`. */
export function addressAttempts(): Attempt[] {
  const out: Attempt[] = []
  const malformed: readonly (readonly [string, unknown])[] = [
    ['a non-array', 'tabs.page'],
    ['an empty array', []],
    ['a non-string segment', ['tabs', 7]],
    ['an empty-string segment', ['tabs', '']],
  ]
  for (const [name, address] of malformed) {
    out.push({
      name: `C15/C16 · ${name} is refused at A-ADDRESS as \`malformed-address\``,
      drive: (): void => {
        const f = store()
        expectRefusal(call(f, 'write', address, 'mem', { value: 1 }), { reason: 'malformed-address', step: 'A-ADDRESS', segment: null })
        expectRefusal(call(f, 'read', address), { reason: 'malformed-address', step: 'A-ADDRESS', segment: null })
      },
    })
  }
  out.push({
    name: 'C14 · a 1-segment address MINTS THE REGISTER ENTRY',
    drive: (): void => {
      const f = store()
      expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))['status'], 'C18 — at a 1-segment address the mint also creates the register entry').toBe('committed')
      expect(readValue(readOn(f, 'generic', ROOT)), 'C14 — the entry’s child is the root node').toBe(1)
    },
  })
  out.push({
    name: 'C18 · an n-segment address mints whatever is missing AT THE ADDRESSED ADDRESS, and MINTS NOTHING through an ABSENT INTERMEDIATE',
    drive: (): void => {
      /** **THE TWO LEGAL EXTREMES OF `C15`/`C16`'s TOTAL ADDRESS GRAMMAR (`§2.5` item 7's own note),
       *  RE-DERIVED (`RCA-8(d)`).** The earlier form drove the `n`-segment extreme as a LITERAL at
       *  `DEEPER` over a FRESH store and demanded `committed` — a write `§2.5` item 2 REFUSES
       *  verbatim: *"AN ABSENT INTERMEDIATE IS REFUSED, NOT MINTED … answers `'unreachable'` … and
       *  MINTS NOTHING"*, and the GREEN `A-4` row pins the identical address and payload as
       *  `'unreachable'` (the module answered `'unknown-root'` at `B-ROOT` there, and the row read
       *  that as an un-minted intermediate — either way nothing lands and the cell measured a write
       *  the grammar refuses). The `n`-segment extreme is now driven to the arm the table gives an
       *  address whose immediate parent STANDS and whose final member is ABSENT — `A6`, `C18`'s own
       *  add arm (`R16`(d)) — and the mint of the whole subtree is asserted. **The refusal arm is
       *  asserted beside it as `A-4`'s own reading, so the cell shows BOTH halves of the extreme:
       *  what the grammar mints, and that it mints NOTHING where an intermediate is absent.** */
      const f = store()
      expect(
        expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: { page: { body: { title: 't' } } } }))['status'],
        'C18 — the 1-segment write mints the register entry and the root node',
      ).toBe('committed')
      expect(
        expectCommitted(writeOn(f, 'generic', DEEPER, 'mem', { value: 'x' }))['status'],
        'C18 — the write ADDS the data, using that address as its entry: the addressed address’s immediate parent stands and its final member is absent (`A6`)',
      ).toBe('committed')
      expect(
        readValue(readOn(f, 'generic', DEEPER)),
        'C18 — the addressed address is reachable afterwards, at whole depth',
      ).toBe('x')
      const g = store()
      expectRefusal(writeOn(g, 'generic', DEEPER, 'mem', { value: 'x' }), {
        reason: 'unreachable',
        step: 'B-ROOT',
      })
      expect(
        isRefusal(readOn(g, 'generic', DEEPER)),
        'C18/DD-11 — NOTHING was minted through the absent intermediate: the address does not resolve afterwards',
      ).toBe(true)
    },
  })
  return out
}

/** `P-SD-TP-4` · `S-SD-ADMIT-1` — `22 = 6 (the admitted classes) + 16 (the refused classes)`. */
export function admissionAttempts(): Attempt[] {
  const out: Attempt[] = []
  const admitted: readonly (readonly [string, unknown, unknown])[] = [
    ['a string', 'Foo', 'Foo'],
    ['a finite number other than -0', 123, 123],
    ['a boolean', true, true],
    ['null', null, null],
    ['a plain object', { nested: { deeper: 1 } }, { nested: { deeper: 1 } }],
    ['an array', [1, 'a', null], [1, 'a', null]],
  ]
  for (const [name, value, expected] of admitted) {
    out.push({
      name: `ADMITTED · ${name} mints whole depth`,
      drive: (): void => {
        const f = store()
        expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value }))['status'], '§2.4 item 2 — the six admitted classes').toBe('committed')
        expect(readValue(readOn(f, 'generic', ROOT)), '§2.4 item 3 — the mint recurses at whole depth, keyed by the segment').toEqual(expected)
      },
    })
  }
  const cyclic: Rec = { name: 'cycle' }
  cyclic['self'] = cyclic
  const accessor: Rec = {}
  Object.defineProperty(accessor, 'computed', { get: () => 1, enumerable: true })
  class Cls {
    readonly x = 1
  }
  const arrayExtra = [1, 2] as unknown[] & Rec
  ;(arrayExtra as unknown as Rec)['extra'] = 'x'
  const arrayHole: unknown[] = [1]
  arrayHole[2] = 3
  const symbolKeyed: Rec = {}
  ;(symbolKeyed as Record<symbol, unknown>)[Symbol('hidden')] = 1
  /** The refused census is `16` CLASSES (`census.md` §4.6), so the two classes the contract prints
   *  as ONE row each are driven inside one cell, with each group member asserted. */
  const refused: readonly (readonly [string, readonly unknown[]])[] = [
    ['undefined', [undefined]],
    ['a function', [(): void => undefined]],
    ['a symbol', [Symbol('s')]],
    ['a bigint', [BigInt(1)]],
    ['NaN', [Number.NaN]],
    ['Infinity / -Infinity', [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]],
    ['-0', [-0]],
    ['a cyclic object', [cyclic]],
    ['a Map / Set / WeakMap / WeakSet', [new Map(), new Set(), new WeakMap(), new WeakSet()]],
    ['a Date', [new Date(0)]],
    ['a non-plain prototype / class instance', [new Cls()]],
    ["an array's own hole", [arrayHole]],
    ["an array's own member beyond its dense indices", [arrayExtra]],
    ['an own accessor property', [accessor]],
    ['an own symbol-keyed member', [symbolKeyed]],
    ["an own member key that is the empty string", [{ '': 1 }]],
  ]
  for (const [name, values] of refused) {
    out.push({
      name: `REFUSED · ${name} answers \`value-not-admitted\` with nothing minted and no file written`,
      drive: (): void => {
        for (const value of values) {
          const fs = memoryFs()
          const f = storeOver(fs)
          expectRefusal(writeOn(f, 'generic', ROOT, 'file', { value }), { reason: 'value-not-admitted', step: 'G-VALUE' })
          expect(fs.puts(), '§2.4 item 2 — nothing is minted and no file is written').toBe(0)
          expectRefusal(call(f, 'read', ROOT), { reason: 'unknown-root', step: 'B-ROOT' })
        }
      },
    })
  }
  return out
}

/** `P-SD-TP-5` · `S-SD-ROUND-1` — `8 = 4 (the round-tripped value classes) × 2 (the invariant
 *  arms)`; the two `DD-12`/`DD-13` corners and the THIRD (value) arm ride these cells. */
export function roundTripAttempts(): Attempt[] {
  const out: Attempt[] = []
  const classes: readonly (readonly [string, Rec])[] = [
    ['a scalar', { value: 'Foo' }],
    ['a nested object', { value: { a: 1, b: { c: [1, 2] } } }],
    ['an array', { value: [true, 123, 'Foo'] }],
    ['a three-tier mix', { value: { fileMember: { x: 1 } } }],
  ]
  for (const [name, payload] of classes) {
    for (const arm of ['bytes identical', 'state identical'] as const) {
      out.push({
        name: `the round trip of ${name} · ${arm} across save → load → save`,
        drive: (): void => {
          const fs = memoryFs()
          const first = storeOver(fs)
          const tier = name === 'a three-tier mix' ? 'file' : 'file'
          expect(expectCommitted(writeOn(first, 'generic', ROOT, tier, payload))['status'], 'C7 — the file must exactly match the data state').toBe('committed')
          const bytesAfterFirstSave = fs.bytes(FILE_PATH)
          const second = storeOver(fs)
          expect(call(second, 'load')['status'], '§2.12 item 1 — the load re-mints the file instances').toBe('loaded')
          const valueAfterLoad = readValue(readOn(second, 'generic', ROOT))
          expect(expectCommitted(writeOn(second, 'generic', ROOT, tier, { value: valueAfterLoad }))['status'], '§2.7 item 3 — the save condenses the state').toBe('committed')
          const bytesAfterSecondSave = fs.bytes(FILE_PATH)
          if (arm === 'bytes identical') {
            expect(bytesAfterSecondSave, 'C7/C12 — save → load → save leaves the BYTES identical; no `_value` object appears inside a list').toBe(bytesAfterFirstSave)
          } else {
            expect(valueAfterLoad, '§2.7 item 3 / §2.8 item 3 — the STATE is identical, `[] ≅ {}` kept, the struck `{\'0\':\'a\'} ≅ [\'a\']` corner NOT asserted').toEqual(payload['value'])
          }
        },
      })
    }
  }
  return out
}

/** `P-SD-IM-12` · `S-SD-BRK-1` — `8 = 2 (the earlier pass's answer) × 2 (the later pass's answer)
 *  × 2 (the landing arms)`.
 *
 *  **THE DRIVE IS THE TWO-REGISTRATION + ONE-REPAIR SHAPE (`§2.10` items 8–9, 11 · `DD-22`), WHICH IS
 *  WHAT THE TOKEN-20 ARM'S OWN ANTECEDENT REQUIRES.** `R15` item 3's loop-breaker reads *"If a
 *  registration answered `{ok:true}` in an EARLIER pass of the SAME write and answers `{ok:false,
 *  message}` in a LATER pass, the write FAILS"* — and **a LATER PASS EXISTS ONLY THROUGH A RESTART**:
 *  a `{repair:true}` answer whose repair RUNS makes the phase begin a NEW pass at `r_0` (`§2.10` item
 *  8). A single-pass answer set can never produce one, which is why the earlier form of this row —
 *  one registration carrying `[earlier, later]` and one write — could not reach token 20 at any cell
 *  (`RCA-8(d)`; it reported `4 held / 4 broken`, the two loop-breaker cells answering `committed`).
 *  The shape the GREEN behavioural row `C-11` uses, and the one driven here:
 *   · **registration 0** (at `ROOT`, so `§2.10` item 3 puts it in the write's evaluated set) answers
 *     `{repair:true}` on its FIRST evaluation and its repair RUNS — the ONE repair of this write;
 *   · **registration 1** answers `{ok:true}` in pass 1 and, in the LATER pass the repair forced,
 *     the answer the cell's `laterName` names.
 *  **The landing drive is `A4`'s (`§2.5` item 7): a write at the register entry's own node, at the
 *  tier that node already stands at** — a landing arm at an address that IS a prefix of itself, which
 *  is what makes the phase run at all (`§2.10` item 3). `PAR-11` — the fixture supplies the explicit
 *  `memoryFs` double here, so the `file` commit reaches no unwritable path. */
export function brokenPriorConstraintAttempts(): readonly Attempt[] {
  const out: Attempt[] = []
  /** **THE EARLIER PASS'S ANSWER IS READ ON THE REGISTRATION THE REPAIR DID NOT TOUCH** (`§2.10` item
   *  11's antecedent is a property OF A REGISTRATION, and a registration whose repair has already run
   *  cannot demand a restart): **registration 1 — the one the repair BREAKS — answers this in the
   *  earlier pass, while registration 0 answers `{repair:true}` on its first evaluation in EVERY cell
   *  (that answer IS the restart the arm needs).** Two values, and they are the arm's own two:
   *  *previously satisfied* ⇒ `{ok:true}` (the antecedent IS met, so a later `{ok:false, message}` is
   *  token 20) · *never evaluated* ⇒ `{ok:false, message}` (a FIRST-time refusal at its own first
   *  evaluation, which `§2.10` item 11 excludes from this arm by name — *"a registration that answered
   *  `{repair:true}` and never `{ok:true}`, and then refuses, was never satisfied — its refusal is
   *  `'constraint-refused'` (token 12) … not this arm"*). */
  const earlier: readonly (readonly [string, Rec])[] = [
    ['previously satisfied', { ok: true }],
    ['never evaluated', { ok: false, message: 'the broken constraint’s verbatim' }],
  ]
  const later: readonly (readonly [string, Rec])[] = [
    ['answers `{ok:false, message}`', { ok: false, message: 'the broken constraint’s verbatim' }],
    ['answers `{ok:true}`', { ok: true }],
  ]
  const landings: readonly string[] = [
    'NOTHING landed — no install, no commit, no purge, no fire',
    'a partial landing would FAIL the row',
  ]
  for (const [earlierName, earlierAnswer] of earlier) {
    for (const [laterName, laterAnswer] of later) {
      for (const landing of landings) {
        out.push({
          name: `the earlier pass’s answer is \`${earlierName}\` and the later pass’s ${laterName} — ${landing}`,
          drive: (): void => {
            const fs = memoryFs()
            const f = storeOver(fs)
            call(f, 'write', ROOT, 'file', { value: { seed: 'pre-call' } })
            const preBytes = fs.bytes(FILE_PATH)
            let fired = 0
            call(f, 'listen', CHILD, () => {
              fired += 1
            })
            /** `§2.10` item 3 — the evaluated set of a write at `W` is every registration whose
             *  address is a PREFIX of `W` (`P = W` included): both registrations stand at `ROOT`, the
             *  write's own address, and are evaluated in registration order (`position` 0, then 1). */
            const demanded = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => ({ seed: 'repaired' }) })
            const broken = register(f, ROOT, [earlierAnswer, laterAnswer])
            const answer = writeOn(f, 'generic', ROOT, 'file', { value: { seed: 'prospective' } })
            const isLoopBreaker = earlierName === 'previously satisfied' && laterName === 'answers `{ok:false, message}`'
            const isNeverSatisfied = earlierName === 'never evaluated'
            if (isLoopBreaker) {
              /** **`§2.10` item 11's ANTECEDENT IS MET CELL BY CELL: registration 1 answered
               *  `{ok:true}` in pass 1 and refuses in pass 2 — because registration 0's repair
               *  RESTARTED the phase (`§2.10` item 8) — so the write FAILS and the arm is token 20,
               *  never token 12.** */
              expect(demanded.calls.length, '§2.10 item 8 — the repair RESTARTED the phase: registration 0 is RE-EVALUATED in a NEW pass').toBe(2)
              expect(broken.calls.length, '§2.10 item 8 — the already-satisfied registration 1 is re-walked in the new pass, and ITS later answer is what the phase acted on').toBe(2)
              expect(broken.calls[0]?.['answer'], '§2.10 item 11 — the antecedent: registration 1 answered `{ok:true}` in the EARLIER pass').toEqual({ ok: true })
              const r = expectRefusal(answer, { reason: 'repair-broke-constraint', step: 'H-CONSTRAINT' })
              const list = messagesOf(r)
              expect(list.length, 'R15 item 3 — the whole list, the broken constraint’s message at its own entry BEFORE the store’s closing sentence').toBeGreaterThanOrEqual(2)
              expect(list[list.length - 2]?.['text'], '§2.14 item 5 — the broken constraint’s own verbatim stands at the entry immediately before the store’s').toBe('the broken constraint’s verbatim')
              expect(primarySentence(r), '§2.14 item 5 — the LAST entry is the STORE’s own sentence naming the repair and the constraint it broke').not.toBe('the broken constraint’s verbatim')
            } else if (isNeverSatisfied) {
              /** **`§2.10` item 11's OWN EXCLUSION: registration 1 refuses at its FIRST evaluation,
               *  so it was never satisfied — the arm is token 12 with the module's verbatim as the
               *  primary entry, and the phase ENDS before any repair (so the later pass, and the
               *  `{repair:true}` that would force one, are never reached).** */
              expect(broken.calls.length, '§2.10 item 5 — the phase ends at the FIRST evaluation that refuses: registration 1 is evaluated once').toBe(1)
              expect(demanded.calls.length, '§2.10 item 5(c) — a refusal ends the write, so the one repair this drive declares never runs').toBe(1)
              const r = expectRefusal(answer, { reason: 'constraint-refused', step: 'H-CONSTRAINT' })
              expect(primarySentence(r), '§2.10 item 10 — token 12’s LAST and PRIMARY entry is the MODULE’s verbatim').toBe('the broken constraint’s verbatim')
            } else {
              expectCommitted(answer)
            }
            if (answer['status'] === 'refused') {
              expect(fs.bytes(FILE_PATH), 'R15 item 3 — NO file is written (the commit is never attempted)').toBe(preBytes)
              expect(readValue(readOn(f, 'generic', ROOT, 'file')), 'R15 item 3 — nothing is installed').toEqual({ seed: 'pre-call' })
              expect(fired, 'R15 item 3 — the purge does not run and NO listener fires').toBe(0)
            }
          },
        })
      }
    }
  }
  return out
}

/** `P-SD-SM-5` · `S-SD-REPAIR-1` — `10 = 2 (the pass driven) × 3 (the position's answer) + 4 (the
 *  arms the product cannot reach)`. */
export function repairMachineAttempts(): Attempt[] {
  return [
    {
      name: 'FIRST pass · the position answers `{ok:true}` — evaluation continues within the pass',
      drive: (): void => {
        const f = store()
        const first = register(f, CHILD, [{ ok: true }])
        const second = register(f, ROOT, [{ ok: true }])
        expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: { seed: 1 } }))['status'], '§2.10 item 5 — `{ok:true}` ⇒ the state is valid; evaluation continues').toBe('committed')
        expect(first.calls.length, '§2.10 item 3 — the evaluated set is every registration at a PREFIX address of the write').toBe(1)
        expect(second.calls.length, '§2.10 item 3 — the register entry is evaluated too').toBe(1)
      },
    },
    {
      name: 'FIRST pass · the position answers `{ok:false, message}` — token 12 ends the write',
      drive: (): void => {
        const f = store()
        register(f, ROOT, [{ ok: false, message: 'the module’s verbatim' }])
        const r = expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }), { reason: 'constraint-refused', step: 'H-CONSTRAINT' })
        expect(primarySentence(r), '§2.10 item 10 — token 12’s LAST and PRIMARY entry is the MODULE’s verbatim').toBe('the module’s verbatim')
      },
    },
    {
      name: 'FIRST pass · the position answers `{repair:true}` — the repair RUNS and the pass RESTARTS',
      drive: (): void => {
        const f = store()
        let repairRuns = 0
        register(f, ROOT, [{ repair: true }, { ok: true }], {
          withRepair: () => {
            repairRuns += 1
            return 'repaired'
          },
        })
        expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))['status'], '§2.10 item 6(a) — a repaired write IS a successful write').toBe('committed')
        expect(repairRuns, '§2.10 item 9 — a registration’s repair runs AT MOST ONCE per write').toBe(1)
        expect(readValue(readOn(f, 'generic', ROOT)), '§2.10 item 5 — the repair’s return REPLACES the prospective value').toBe('repaired')
      },
    },
    {
      name: 'LATER pass (reached by a restart) · the position answers `{ok:true}`',
      drive: (): void => {
        const f = store()
        const probe = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
        expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))
        expect(probe.calls.length, '§2.10 item 8 — a repair that changes the state RESTARTS the phase at the FIRST registration of S, so the registration is RE-EVALUATED in a NEW pass').toBe(2)
      },
    },
    {
      name: 'LATER pass · the position answers `{ok:false, message}`',
      drive: (): void => {
        const f = store()
        register(f, ROOT, [{ repair: true }, { ok: false, message: 'broken later' }], { withRepair: () => 'repaired' })
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), { reason: 'constraint-refused', step: 'H-CONSTRAINT' })
      },
    },
    {
      name: 'LATER pass · the position answers `{repair:true}` — its repair has ALREADY run ⇒ `constraint-failed`',
      drive: (): void => {
        const f = store()
        register(f, ROOT, [{ repair: true }, { repair: true }], { withRepair: () => 'repaired' })
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), {
          reason: 'constraint-failed',
          step: 'H-CONSTRAINT',
        })
      },
    },
    {
      name: 'a SECOND registration takes its own FIRST repair while the first stands ⇒ the pass restarts again',
      drive: (): void => {
        const f = store()
        const a = register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'a-repaired' })
        const b = register(f, CHILD, [{ ok: true }])
        expect(expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: 'original' }))['status'], '§2.10 item 9(c) — a SECOND registration may take its own first repair while the first registration’s repair stands').toBe('committed')
        expect(a.calls.length, '§2.10 item 8 — every registration is re-evaluated against the repaired state').toBeGreaterThanOrEqual(2)
        expect(b.calls.length, '§2.10 item 8 — the whole set is re-walked').toBeGreaterThanOrEqual(2)
      },
    },
    {
      name: 'the last pass ends with every position satisfied ⇒ the phase ENDS SATISFIED and the write proceeds (ONE commit)',
      drive: (): void => {
        const fs = memoryFs()
        const f = storeOver(fs)
        register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
        const r = expectCommitted(writeOn(f, 'generic', ROOT, 'file', { value: 'original' }))
        expect(r['repaired'], '§2.10 item 6(d) — the record carries `repaired: true` iff any repair was taken').toBe(true)
        expect(fs.puts(), '§2.10 item 6(a) — ONE commit, after the repair settles, never two file writes').toBe(1)
      },
    },
    {
      name: "a repair's return outside the admission set ⇒ `value-not-admitted`, nothing landing",
      drive: (): void => {
        const f = store()
        register(f, ROOT, [{ repair: true }], { withRepair: () => Number.NaN })
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }), { reason: 'value-not-admitted', step: 'G-VALUE' })
      },
    },
    {
      name: "the pass count is bounded by `|S| + 1` and NO registration's repair is invoked twice",
      drive: (): void => {
        const f = store()
        let runs = 0
        register(f, ROOT, [{ repair: true }, { ok: true }], {
          withRepair: () => {
            runs += 1
            return 'repaired'
          },
        })
        register(f, CHILD, [{ ok: true }])
        expectCommitted(writeOn(f, 'generic', CHILD, 'mem', { value: 'original' }))
        expect(runs, '§2.10 item 9(b) — at most `|S|` repairs can run, so the pass count is `≤ |S| + 1` and no repair is ever re-invoked').toBe(1)
        expect(REPAIR_RUNS_PER_REGISTRATION_PER_WRITE, '§2.10 item 9 (DD-22) — the unit of “once” is THE REGISTRATION').toBe(1)
      },
    },
  ]
}

/** `P-SD-TP-6` · `S-SD-MSG-1` — `16 = 2 (invocation classes) × 2 (the append doors) × 3 (the
 *  outcome) + 2 (the returned sites) + 2 (the ordering arms)`. */
export function messageListAttempts(): Attempt[] {
  const out: Attempt[] = []
  for (const klass of ['a CONSTRAINT', 'a REPAIR'] as const) {
    for (const door of ['the `{ok:false, message}` answer arm', "the record's own `notes` draft list"] as const) {
      for (const outcome of ['it APPENDED a STAMPABLE draft', 'it appended NOTHING', 'it appended an UNSTAMPABLE draft, which is DISCARDED'] as const) {
        out.push({
          name: `${klass} · ${door} · ${outcome}`,
          drive: (): void => {
            const f = store()
            if (klass === 'a CONSTRAINT') {
              const notes =
                outcome === 'it APPENDED a STAMPABLE draft'
                  ? [{ source: 'constraint', text: 'a stampable draft' }]
                  : outcome === 'it appended an UNSTAMPABLE draft, which is DISCARDED'
                    ? [{ source: 'store', text: 'cannot be forged' }]
                    : []
              register(f, ROOT, [door === 'the `{ok:false, message}` answer arm' ? { ok: false, message: 'the module’s verbatim' } : { ok: true }], {
                note: (evaluation) => {
                  ;(evaluation['notes'] as Rec[]).push(...notes)
                },
              })
              const answer = writeOn(f, 'generic', ROOT, 'mem', { value: 1 })
              const list = messagesOf(answer)
              if (outcome === 'it APPENDED a STAMPABLE draft') {
                expect(list.some((entry) => entry['text'] === 'a stampable draft'), '§2.10 item 10 — the store HARVESTS the module’s drafts, stamps them and appends them').toBe(true)
              }
              if (outcome === 'it appended an UNSTAMPABLE draft, which is DISCARDED') {
                expect(list.some((entry) => entry['text'] === 'cannot be forged'), '§2.10 item 10 — an un-stampable draft is DISCARDED and never minted as an entry (a module cannot forge a `store` entry)').toBe(false)
              }
              if (outcome === 'it appended NOTHING' && door === 'the `{ok:false, message}` answer arm') {
                expect(primarySentence(answer), '§2.10 item 10 — door (i) enters the list as the primary sentence').toBe('the module’s verbatim')
              }
              return
            }
            // A REPAIR invocation: documented by the store's own entry BY CONSTRUCTION.
            register(f, ROOT, [{ repair: true }, { ok: true }], {
              withRepair: (evaluation: unknown) => {
                const notes = ((evaluation ?? {}) as Rec)['notes'] as Rec[] | undefined
                if (outcome === 'it APPENDED a STAMPABLE draft' && Array.isArray(notes)) notes.push({ source: 'repair', text: 'a repair draft' })
                return 'repaired'
              },
            })
            const answer = writeOn(f, 'generic', ROOT, 'mem', { value: 'original' })
            const list = messagesOf(answer)
            expect(list.some((entry) => entry['source'] === 'store'), '§2.10 item 10 door (iii) — ONE entry for EVERY repair invocation, so a CHANGE is documented by construction').toBe(true)
            if (outcome === 'it APPENDED a STAMPABLE draft') {
              expect(list.some((entry) => entry['text'] === 'a repair draft' && entry['source'] === 'repair'), '§2.10 item 10 — a repair’s own draft is harvested as a `repair` entry').toBe(true)
            }
          },
        })
      }
    }
  }
  out.push({
    name: 'the returned site · the `committed` record carries the list (`≥ 1` iff `repaired`)',
    drive: (): void => {
      const f = store()
      const plain = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 1 }))
      expect(Array.isArray(plain['messages']), '§2.10 item 10 — the `committed` record gains `messages` as its seventh payload member').toBe(true)
      register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
      const repaired = expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 2 }))
      expect(repaired['repaired'], '§2.10 item 6(d)').toBe(true)
      expect(messagesOf(repaired).length, '§2.10 item 10 — a `committed` record with `repaired: true` and an EMPTY list FAILS').toBeGreaterThanOrEqual(1)
    },
  })
  out.push({
    name: 'the returned site · EVERY `Refusal` carries the list with `≥ 1` entry',
    drive: (): void => {
      const f = store()
      const r = refusalOf(call(f, 'read', ['']))
      expect(messagesOf(r).length, '§2.10 item 10 — every Refusal carries the list and `messages.length ≥ 1`').toBeGreaterThanOrEqual(1)
    },
  })
  out.push({
    name: 'the ordering arm · append order ACROSS passes reads `(pass 1, positions ascending)` then `(pass 2, positions ascending)`',
    drive: (): void => {
      const f = store()
      register(f, ROOT, [{ repair: true }, { ok: true }], { withRepair: () => 'repaired' })
      expect(
        expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'original' }))['status'],
        '§2.10 item 10 — the ordering lemma: the list is ordered by `pass` ASCENDING and, within one pass, by `position` ASCENDING',
      ).toBe('committed')
    },
  })
  out.push({
    name: 'the ordering arm · append order WITHIN one pass, and TWO APPENDS OF THE SAME TEXT ARE TWO ENTRIES',
    drive: (): void => {
      const f = store()
      register(f, ROOT, [{ ok: false, message: 'same text' }])
      const answer = writeOn(f, 'generic', ROOT, 'mem', { value: 1 })
      const list = messagesOf(answer)
      expect(list.length, '§2.10 item 10 — the list is a LOG, not a set: it is never re-ordered, dropped or duplicated').toBeGreaterThanOrEqual(1)
      expect(primarySentence(answer), '§2.10 item 10 — token 12’s last and primary entry is the module’s verbatim').toBe('same text')
    },
  })
  return out
}

/** `P-SD-IM-13` · `S-SD-LITPROP-1` — `8 = 2 (the write's surfaces) × 4 (the resolution rows)`. */
export function literalPropertyAttempts(): Attempt[] {
  const out: Attempt[] = []
  for (const channel of ['generic', 'secure'] as const) {
    for (const row of RESOLUTION_ANSWERS) {
      out.push({
        name: `${channel} write of a LITERAL at the resolution row \`${row}\` — the re-mint, the zero-child mint and the non-decreasing member count`,
        drive: (): void => {
          const f = channel === 'secure' ? storeWithAccess('blocked') : store()
          const write = (address: readonly string[], payload: Rec): Rec =>
            channel === 'secure' ? call(f, 'secureWrite', address, payload) : call(f, 'write', address, 'mem', payload)
          const read = (address: readonly string[], tier?: string): Rec =>
            channel === 'secure' ? call(f, 'secureRead', address) : tier === undefined ? call(f, 'read', address) : call(f, 'read', address, tier)
          if (row === 'unreachable') {
            /** **`P-SD-IM-13`'s `unreachable` CELL, RE-DERIVED (`RCA-8(d)`): `B-ROOT` PRECEDES
             *  `C-ANCHOR` (`store-model.md` §2.3 item 2), AND SO DOES `A3`.** A FRESH store answers
             *  token 2 `'unknown-root'` at `B-ROOT` for an address whose first segment names no
             *  register entry — the token the GREEN `A-3` row pins; and minting ONLY the root leaves
             *  the address's IMMEDIATE PARENT (`['tabs','page']`) resolving to NOTHING, so `§2.5`
             *  item 2's own note applies — *"the IMMEDIATE PARENT's non-resolution ⇒ `C17`'s arm
             *  (`'unreachable'`, token 3, at the intermediate step)"* — and `M-PROP`'s `unreachable`
             *  IS that intermediate failure. (`A3` is the arm for a parent that DOES resolve: a
             *  literal beside a `ROOT`-only store commits, because the parent is the root node and the
             *  final segment is an absent member, so nothing is unreachable — which is why the earlier
             *  form of this cell read a `committed` where it demanded a refusal.) **The drive
             *  therefore mints the root AND the address's immediate parent — whose final member is
             *  then a LITERAL PROPERTY — and meets the ABSENT segment on the literal.** */
            expect(
              expectCommitted(write(ROOT, { value: { page: {} } }))['status'],
              'C14/C18 — the register entry and the root node are minted by the 1-segment write, so `B-ROOT` can no longer be the failing arm',
            ).toBe('committed')
            expect(
              expectCommitted(write(CHILD, { value: 'a literal' }))['status'],
              'A4/R16(c) — the address’s IMMEDIATE parent resolves and its final member is a LITERAL PROPERTY, so `A3`’s parent condition is met and the literal LANDS',
            ).toBe('committed')
            expectRefusal(write(DEEPER, { value: 'a literal' }), { reason: 'unreachable' })
            expectRefusal(read(DEEPER), { reason: 'unreachable' })
            return
          }
          if (row === 'absent-property') {
            write(ROOT, { value: { seed: 1 } })
            const before = read(ROOT)
            expect(expectCommitted(write(CHILD, { value: 'a literal' }))['status'], 'R16(a) — the literal is set at the final segment of the re-minted parent; NO child node is minted').toBe('committed')
            expect(Object.keys(readValue(read(ROOT)) as Rec).length, 'P-SD-IM-13 — the member count of a surviving node is NON-DECREASING across a literal write').toBeGreaterThanOrEqual(Object.keys(readValue(before) as Rec).length)
            expect(readValue(read(CHILD)), 'R16(b) — a read of the literal property returns ONLY that property').toBe('a literal')
            return
          }
          if (row === 'literal-property') {
            write(ROOT, { value: { seed: 'first' } })
            expect(expectCommitted(write(['tabs', 'seed'], { value: 'second' }))['status'], '§2.5 item 7 A4 — the immediate parent is re-minted and the literal is OVERWRITTEN in place (R17(b): no property deletion)').toBe('committed')
            expect(readValue(read(['tabs', 'seed'])), 'R16(c) first half — the member is overwritten, never removed').toBe('second')
            return
          }
          // A NODE LOCATION: the literal is set at the final segment and the child that stood
          // there is discarded (`A3`), with NO child minted.
          write(CHILD, { value: { seed: 1 } })
          expect(expectCommitted(write(CHILD, { value: 'a literal' }))['status'], '§2.5 item 7 A3 — R16(a) applies: the literal replaces the node and the link is emptied of its child').toBe('committed')
          expect(readValue(read(CHILD)), 'A3/R16(b) — the address now names a LITERAL PROPERTY').toBe('a literal')
          expect(readValue(read(ROOT)), 'A3 — the property survives on the re-minted parent; no member is removed from a node that survives').toEqual({ page: 'a literal' })
        },
      })
    }
  }
  return out
}

/** `P-SD-SM-6` · `S-SD-ARM-1` — `24 = 6 (the write's arm classes) × 4 (the outcome classes)`. */
export function writeArmAttempts(): Attempt[] {
  const out: Attempt[] = []
  const classes: readonly string[] = [
    'a literal at a resolved parent', 'a container at a resolved parent', 'a container at a NODE LOCATION',
    'a literal at a NO-RESOLUTION parent', 'a tombstone at a literal property', 'a tombstone at a transparent node',
  ]
  const outcomes: readonly string[] = [
    '{ok, re-mint}', '{ok, link mint-or-overwrite}', '{refused, token}', '{ok, tombstone}',
  ]
  /** `§2.5` item 7's ARM TABLE, CLASS BY CLASS — `A2` is the one class whose DECLARED answer is the
   *  refusal (`'node-location-container'`, token 21), and a literal whose immediate parent does NOT
   *  resolve is `§2.5` item 7's own note: *"the IMMEDIATE PARENT's non-resolution ⇒ `C17`'s arm
   *  (`'unreachable'`, token 3 …)"*. Every other class's row is a LANDING arm, so a refusal there
   *  FAILS. This map is the arm table read into the row: the earlier form asserted the same landing
   *  arm of all six classes, which demanded a landing arm of `A2`/no-resolution — a defect of the
   *  ROW. */
  const expectedOutcome: Readonly<Record<string, string>> = {
    'a literal at a resolved parent': '{ok, re-mint}',
    'a container at a resolved parent': '{ok, link mint-or-overwrite}',
    'a container at a NODE LOCATION': '{refused, token}',
    'a literal at a NO-RESOLUTION parent': '{refused, token}',
    'a tombstone at a literal property': '{ok, tombstone}',
    'a tombstone at a transparent node': '{ok, tombstone}',
  }
  for (const klass of classes) {
    for (const outcome of outcomes) {
      out.push({
        name: `${klass} · the outcome class ${outcome}`,
        drive: (): void => {
          const fs = memoryFs()
          const f = storeOver(fs)
          const preBytes = fs.bytes(FILE_PATH)
          const drive = (): Rec => {
            switch (klass) {
              case 'a literal at a resolved parent': {
                call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
                return call(f, 'write', ['tabs', 'page', 'leaf'], 'mem', { value: 'a literal' })
              }
              case 'a container at a resolved parent': {
                call(f, 'write', ROOT, 'mem', { value: { seed: 1 } })
                return call(f, 'write', CHILD, 'mem', { value: { inner: { deep: 1 } } })
              }
              case 'a container at a NODE LOCATION': {
                call(f, 'write', CHILD, 'mem', { value: { seed: 1 } })
                return call(f, 'write', CHILD, 'mem', { value: { seed: 2 } })
              }
              case 'a literal at a NO-RESOLUTION parent':
                /** **THE ONE ARM THAT HAS NO PARENT TO RESOLVE, AND IT IS `C17`'s: a write at the
                 *  ROOT of a store whose register table is EMPTY.** `B-ROOT` is the FIRST arm of the
                 *  walk (`store-model.md` §2.3 item 2) and its token is `'unknown-root'` — what the
                 *  GREEN `A-3` row pins for exactly this drive — while **`'unreachable'` is
                 *  `C-ANCHOR`/`D-LINK`/`E-CHILD`'s arm: the failure at `i < n`, which requires a
                 *  register entry that STANDS.** A literal driven at `ROOT` on a FRESH store is
                 *  therefore the only shape in which this class's declared answer (`{refused, token}`)
                 *  is the one `§2.5` item 7 gives, and it is asserted by the cell against the closed
                 *  token list. **`RCA-8(d)`: the earlier form wrote at `CHILD`, whose IMMEDIATE PARENT
                 *  is the register entry's own node — a parent that RESOLVES — so `A1`'s landing arm
                 *  applied and the write committed (the class name and the arm disagreed).** The
                 *  drive therefore addresses a 1-segment register name NO WRITE HAS EVER MINTED, at
                 *  an address of two or more segments, so the walk's first arm fails and nothing is
                 *  minted (`C14`: a register entry comes into being only by a write at a 1-segment
                 *  address). */
                return call(f, 'write', ['nope', 'x'], 'mem', { value: 'a literal' })
              case 'a tombstone at a literal property': {
                call(f, 'write', ROOT, 'mem', { value: { seed: 'literal' } })
                return call(f, 'write', ['tabs', 'seed'], 'mem', { tombstone: true })
              }
              default: {
                call(f, 'write', ROOT, 'mem', { value: 'transparent', transparent: true })
                return call(f, 'write', ROOT, 'mem', { tombstone: true })
              }
            }
          }
          const answer = drive()
          if (answer['status'] === 'refused') {
            expect(
              expectedOutcome[klass] === '{refused, token}',
              `§2.5 item 7 — \`${klass}\` must not refuse where the arm table gives it a LANDING arm (declared: \`${expectedOutcome[klass]}\`)`,
            ).toBe(true)
            const token = answer['reason']
            /** **`P-SD-SM-6`'s OWN CLOSED TOKEN LIST, COMPLETED (`RCA-8(d)`): the contract's token 2
             *  `'unknown-root'` (`B-ROOT`, `store-model.md` §2.3 item 2) BELONGS in it.** `B-ROOT`
             *  PRECEDES `C-ANCHOR`, so a cell whose drive meets an address whose FIRST segment names
             *  no register entry mints token 2 and no other — *"an unknown root"* is the `B-ROOT`
             *  arm's own token, distinct from the intermediate arm's `'unreachable'` (token 3). The
             *  earlier list omitted it, so a drive that met `B-ROOT` failed here on its TOKEN rather
             *  than on its arm. */
            expect(
              ['unknown-root', 'unreachable', 'node-location-container', 'value-not-admitted', 'malformed-tombstone'].includes(String(token)),
              '§2.5 item 7 — a refusal mints a token from the closed union and no other',
            ).toBe(true)
            expect(fs.bytes(FILE_PATH), '§2.5 item 7 — every refusing cell leaves the PRE-CALL file bytes byte-identical').toBe(preBytes)
            return
          }
          expect(
            expectedOutcome[klass].startsWith('{ok'),
            `§2.5 item 7 — \`${klass}\`'s declared answer is a LANDING arm (\`${expectedOutcome[klass]}\`), never a refusal`,
          ).toBe(true)
          expectCommitted(answer)
          if (klass === 'a tombstone at a literal property') {
            expectRefusal(call(f, 'read', ['tabs', 'seed']), { reason: 'tombstoned', step: 'E-CHILD' })
            /** **`A8`'s OWN TERMS, ASSERTED AS THE CLAUSE STATES THEM: *"the PROPERTY CONTINUES TO
             *  EXIST — the parent node now carries a member at that segment which names a node rather
             *  than a literal"*, with *"terms: `1` node minted · `1` literal replaced · `1` property
             *  retained"* (`§2.5` item 7 `A8`, `§2.6` item 6 · `census.md` §4.9b).** What the clause
             *  declares is the MEMBER'S PRESENCE — and the tombstone standing at it is *"NEVER a
             *  transcription, at any address, under any read form"* (`R11`), so the member the parent
             *  carries is not a value the read can transcribe. The earlier form demanded the member's
             *  VALUE be `expect.anything()`, which is a claim about a transcription the clause forbids
             *  (`RCA-8(d)`; the member is carried and the value is the deletion, not a copy). */
            const parent = readValue(readOn(f, 'generic', ROOT, 'mem')) as Rec
            expect(
              Object.prototype.hasOwnProperty.call(parent, 'seed'),
              'A8 — the PROPERTY CONTINUES TO EXIST: the survived parent carries a member at that segment (the literal was REPLACED, `R17`(b))',
            ).toBe(true)
            expect(
              Object.keys(parent),
              'A8/census.md §4.9b — the member is RETAINED, so no member of the surviving parent is removed by the tombstone',
            ).toContain('seed')
            return
          }
          if (klass === 'a container at a resolved parent') {
            expect(readValue(readOn(f, 'generic', CHILD)), 'R16(d) — the link is created/overwritten and the contents are minted as child nodes').toEqual({ inner: { deep: 1 } })
          }
        },
      })
    }
  }
  return out
}

/** `P-SD-TP-8` · `S-SD-VALUE-1` — `12 = 3 (the transparency's read arms) + 3 (the reservation's
 *  arms) + 4 (the exclusivity's arms) + 2 (the tombstone's arms)`. */
export function valueMechanismAttempts(): Attempt[] {
  return [
    {
      name: 'the transparency · the UNQUALIFIED read answers the literal alone',
      drive: (): void => {
        const f = store()
        expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: true, transparent: true }))['status'], 'PAR-14 — `{value: <a literal>, transparent: true}` at a NODE LOCATION makes the node transparent').toBe('committed')
        expect(readValue(readOn(f, 'generic', ROOT)), '§2.8 item 7 arm R2 — UNQUALIFIED the answer is the `_value` literal ALONE, never `{_value: …}`').toBe(true)
      },
    },
    {
      name: 'the transparency · the TIER-QUALIFIED read answers the node, so it remains addressable',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 123, transparent: true })
        expect(readValue(readOn(f, 'generic', ROOT, 'mem')), '§2.8 item 7 arm R2 — a tier-qualified read asks WHICH INSTANCE, not what it reads as').toEqual({ _value: 123 })
        expect(readOn(f, 'generic', ROOT, 'mem')['tier'], 'PAR-14/§2.8 — the qualified read reports the passed tier').toBe('mem')
      },
    },
    {
      name: 'the transparency · the CONTROL: a node whose literal member is named otherwise is NOT transparent',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: { ordinary: 1 } })
        expect(readValue(readOn(f, 'generic', ROOT)), '§2.3 item 5 — transparency is a property of the `_value` KEY alone; an ordinary literal answers the node’s transcription').toEqual({ ordinary: 1 })
      },
    },
    {
      name: 'the reservation · `_value` is RESERVED: a caller’s ordinary property of that name is unavailable',
      drive: (): void => {
        const f = store()
        const answer = writeOn(f, 'generic', ROOT, 'mem', { value: { _value: 'not the transparency' } })
        expect(answer['status'], '§2.3 item 5(b) — a member key spelled `_value` is NOT how the transparency is asked for (R16(e): a reserved keyword)').not.toBe('committed')
      },
    },
    {
      name: 'the reservation · the `transparent` payload member is the ONLY spelling that reaches `_value`',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 'v', transparent: true })
        expect(readValue(readOn(f, 'generic', ROOT, 'mem')), 'PAR-14 — the reserved member is reachable through the payload member alone').toEqual({ _value: 'v' })
      },
    },
    {
      name: 'the reservation · an ADDRESS segment spelled `_value` is LEGAL (the reservation is on the MEMBER KEY)',
      drive: (): void => {
        const f = store()
        expect(expectCommitted(writeOn(f, 'generic', ['_value'], 'mem', { value: 1 }))['status'], 'PAR-1a/§2.3 item 5(b) — any non-empty string is a legal SEGMENT; the two are different referents').toBe('committed')
        expect(readValue(readOn(f, 'generic', ['_value'])), 'PAR-1 — the address resolves').toBe(1)
      },
    },
    {
      name: 'the exclusivity · `_value` alone ⇒ minted',
      drive: (): void => {
        const f = store()
        expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { value: 'alone', transparent: true }))['status'], 'R17(c) — a transparent node carries exactly one literal and no anchors').toBe('committed')
        expect(readValue(readOn(f, 'generic', ROOT)), 'R16(e) — the round trip answers the literal').toBe('alone')
      },
    },
    {
      name: 'the exclusivity · a CONTAINER at `_value` ⇒ token 9',
      drive: (): void => {
        const f = store()
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: { inner: 1 }, transparent: true }), { reason: 'value-not-admitted', step: 'G-VALUE' })
      },
    },
    {
      name: 'the exclusivity · a second LITERAL beside it ⇒ token 9',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 'first', transparent: true })
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: { second: 2 } }), { reason: 'value-not-admitted', step: 'G-VALUE' })
      },
    },
    {
      name: 'the exclusivity · a container-MEMBER beside it ⇒ token 9',
      drive: (): void => {
        /** **THE CELL'S OWN PROPERTY IS *"the exclusivity of `_value`"* — *"a write placing a SECOND
         *  member beside a `_value` literal is REFUSED"* (`§2.5` item 7 `A10` · `R17`(c) ·
         *  `store-model.md` §2.3 item 5(c)) — so the drive places a transparent `_value` literal at
         *  the address FIRST and then a CONTAINER MEMBER beside it, which is the shape the clause
         *  refuses.** The earlier form asserted `node-location-container` at a two-segment address
         *  whose link was a LITERAL (`{page: 1}` ⇒ `A4`, not a NODE LOCATION) while its sibling cell
         *  drove `A2`'s own address — the two cells therefore asserted the SAME token for two
         *  different arms, and this one reached neither the `_value` exclusivity nor `A2`
         *  (`RCA-8(d)`). */
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 'first', transparent: true })
        expectRefusal(writeOn(f, 'generic', ROOT, 'mem', { value: { inner: 2 } }), { reason: 'value-not-admitted', step: 'G-VALUE' })
      },
    },
    {
      name: 'the tombstone · at a transparent node it deletes it exactly as any node’s tombstone does',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 'v', transparent: true })
        expect(expectCommitted(writeOn(f, 'generic', ROOT, 'mem', { tombstone: true }))['status'], 'P §12’s second carriage — the tombstone deletes the transparent node as any other').toBe('committed')
        expectRefusal(readOn(f, 'generic', ROOT), { reason: 'tombstoned', step: 'E-CHILD' })
      },
    },
    {
      name: 'the tombstone · the address unqualified answers `tombstoned`',
      drive: (): void => {
        const f = store()
        writeOn(f, 'generic', ROOT, 'mem', { value: 'v', transparent: true })
        writeOn(f, 'generic', ROOT, 'mem', { tombstone: true })
        const r = expectRefusal(readOn(f, 'generic', ROOT), { reason: 'tombstoned' })
        expect(primarySentence(r), '§2.14 item 3 — `tombstoned` is kept DISTINCT from `absent-address`').not.toBe('')
      },
    },
  ]
}

/** `P-SD-TP-9` · `S-SD-PTOMB-1` — `12 = 2 (the write's surfaces) × 6 (the landed arms over the
 *  address kinds)`. */
export function propertyTombstoneAttempts(): Attempt[] {
  const out: Attempt[] = []
  const arms: readonly string[] = [
    'at a LITERAL PROPERTY ⇒ one node minted, the literal REPLACED, the property RETAINED, the address `R11`-deleted',
    'at a NODE LOCATION ⇒ A7 unchanged',
    'at an ABSENT PROPERTY ⇒ A9, the ordinary add',
    "at a literal property at the `file` tier ⇒ R12's lifecycle",
    'the UNQUALIFIED read afterwards ⇒ `tombstoned` with no fall-back and no descent',
    'a QUALIFIED read of ANOTHER tier ⇒ that tier read, the retained copy standing',
  ]
  for (const channel of ['generic', 'secure'] as const) {
    for (const arm of arms) {
      out.push({
        name: `${channel} surface · ${arm}`,
        drive: (): void => {
          const fs = memoryFs()
          /** **`PAR-10`/`PAR-11` — THE SAME EXPLICIT DOUBLE MUST SERVE THE CHANNEL THE CELL DRIVES:**
           *  `storeWithAccess` builds its own `MemoryFs` internally, so a `secure` cell driven through
           *  it writes to a filesystem the CELL CANNOT READ (its own `fs` never sees the commit) —
           *  which is why the `secure` `R12` cell's own byte assertion read `null` (`RCA-8(d)`). The
           *  drive therefore passes BOTH declared members, the `PAR-10` reader and the `PAR-11`
           *  double, so the secure file's bytes are the caller's own to inspect. */
          const f = channel === 'secure' ? storeOver(fs, { secureAccess: () => true }) : storeOver(fs)
          const write = (address: readonly string[], tier: string, payload: Rec): Rec =>
            channel === 'secure' ? call(f, 'secureWrite', address, payload) : call(f, 'write', address, tier, payload)
          const read = (address: readonly string[], tier?: string): Rec =>
            channel === 'secure' ? call(f, 'secureRead', address) : tier === undefined ? call(f, 'read', address) : call(f, 'read', address, tier)
          const tier = channel === 'secure' ? 'file' : 'file'
          switch (arm) {
            case 'at a LITERAL PROPERTY ⇒ one node minted, the literal REPLACED, the property RETAINED, the address `R11`-deleted': {
              write(ROOT, 'file', { value: { seed: 'a literal' } })
              expect(expectCommitted(write(['tabs', 'seed'], tier, { tombstone: true }))['status'], '§2.5 item 7 A8 — ONE node is minted at the address and the immediate parent is re-minted carrying an anchor where the literal stood').toBe('committed')
              expectRefusal(read(['tabs', 'seed']), { reason: 'tombstoned', step: 'E-CHILD' })
              expect(Object.keys(readValue(read(ROOT)) as Rec), 'A8 — the PROPERTY CONTINUES TO EXIST: the parent carries a member at that segment naming a node').toContain('seed')
              return
            }
            case 'at a NODE LOCATION ⇒ A7 unchanged': {
              write(CHILD, tier, { value: { seed: 1 } })
              expect(expectCommitted(write(CHILD, tier, { tombstone: true }))['status'], 'A7 — the R10/R12 arm unchanged: ONE node minted carrying no literals and no anchors').toBe('committed')
              expectRefusal(read(CHILD), { reason: 'tombstoned' })
              return
            }
            case 'at an ABSENT PROPERTY ⇒ A9, the ordinary add': {
              write(ROOT, tier, { value: { seed: 1 } })
              expect(expectCommitted(write(CHILD, tier, { tombstone: true }))['status'], 'A9 — C18 mints at an address that could exist; one tombstone node is minted and the link is created').toBe('committed')
              expectRefusal(read(CHILD), { reason: 'tombstoned' })
              return
            }
            case "at a literal property at the `file` tier ⇒ R12's lifecycle": {
              write(ROOT, 'file', { value: { seed: 'a literal' } })
              /** **`C6` — *"secure is a … separate file"*: the `secure` surface's commit duty (`§2.9`
               *  item 6) binds the SECURE file, so the bytes this cell reads are the ones the channel
               *  it drives actually writes.** The earlier form read `FILE_PATH` for BOTH channels, so
               *  the secure cells read a file the secure write never touched (`null`) — a defect of
               *  this CELL (`RCA-8(d)`); the same drive's `fs` is the double both paths live in. */
              const channelPath = channel === 'secure' ? SECURE_PATH : FILE_PATH
              const bytesBefore = fs.bytes(channelPath)
              expect(expectCommitted(write(['tabs', 'seed'], 'file', { tombstone: true }))['status'], 'R12 — the tombstone stands in memory, is OMITTED from the file’s bytes, and on a successful commit is removed from the graph too').toBe('committed')
              const bytes = fs.bytes(channelPath)
              expect(bytes, 'R10/R12 — `tombstoning at file tier omits it from the saved file`').not.toBe(bytesBefore)
              expect(bytes ?? '', 'R12 — the omitted tombstone leaves no marker member in the file (C7: the bytes carry the state and nothing else)').not.toContain('tombstone')
              return
            }
            case 'the UNQUALIFIED read afterwards ⇒ `tombstoned` with no fall-back and no descent': {
              write(ROOT, 'file', { value: { seed: { deeper: 1 } } })
              write(CHILD, 'mem', { tombstone: true })
              expectRefusal(read(CHILD), { reason: 'tombstoned' })
              expectRefusal(read(['tabs', 'page', 'seed']), { reason: 'unreachable' })
              return
            }
            default: {
              write(ROOT, 'file', { value: { seed: { deeper: 1 } } })
              write(CHILD, 'mem', { tombstone: true })
              expect(readValue(read(ROOT, 'file')), 'R9/R10 — a read QUALIFIED to another tier is not suppressed by a tombstone standing at a different tier').toEqual({ seed: { deeper: 1 } })
            }
          }
        },
      })
    }
  }
  return out
}

/* ─────────────────────────── THE EXECUTION: CAPS AND STOP RULE ─────────────────────────── */

export interface RowReport {
  readonly id: string
  readonly type: string
  readonly strategyId: string
  readonly declaredTerm: number
  readonly attemptsRun: number
  /** The attempts the STOP RULE abandoned inside this row: neither held nor broken. */
  readonly abandoned: number
  readonly held: number
  readonly broken: number
  readonly state: 'held' | 'broken' | 'un-run'
  readonly readings: readonly string[]
}

export interface RegisterReport {
  readonly rows: readonly RowReport[]
  readonly declaredTerms: readonly number[]
  readonly declaredTotal: number
  readonly declaredTotalAsFiledHeading: number
  readonly declaredTotalTerms: readonly number[]
  readonly chain: readonly number[]
  readonly subtotals: Readonly<Record<'P-IM' | 'P-SM' | 'P-TP', number>>
  readonly attemptsExecuted: number
  readonly rowsExecuted: number
  readonly rowsDeclared: number
  readonly rowsHeld: number
  readonly rowsBroken: number
  readonly unrunRows: readonly string[]
  readonly unrunAreFailures: true
  readonly stoppedAtRow: string | null
  readonly stopReason: string | null
  readonly perRowMax: number
  readonly perRowMaxRow: string
  readonly perRowCap: number
  readonly totalCap: number
  readonly reasons: readonly string[]
}

/** The row table, in `§5.5.1`'s own order, with each row's declared TERM (`drives.length` is
 *  asserted equal to it — `executed = declared` is the register's own identity). */
export function registerRows(): readonly RegisterRow[] {
  return [
    { id: 'P-SD-IM-1', type: 'P-IM', strategyId: 'S-SD-COPY-1', term: 12, property: 'THE DEEP COPY IS ABSOLUTE (C2)', drives: copyAttempts() },
    { id: 'P-SD-IM-2', type: 'P-IM', strategyId: 'S-SD-MINT-1', term: 9, property: 'EVERY WRITE RE-MINTS AND NO NODE IS MUTATED (C4/C19)', drives: mintAttempts() },
    { id: 'P-SD-IM-3', type: 'P-IM', strategyId: 'S-SD-RANK-1', term: 9, property: 'THE MONOTONIC PERSISTENCE INVARIANT (R9)', drives: rankAttempts() },
    { id: 'P-SD-IM-4', type: 'P-IM', strategyId: 'S-SD-DUP-1', term: 6, property: 'THE DUPLICATE PAIR IS UNREACHABLE (C21)', drives: duplicateAttempts() },
    { id: 'P-SD-IM-5', type: 'P-IM', strategyId: 'S-SD-READ-1', term: 12, property: "R9'S TWO READ FORMS", drives: readFormAttempts() },
    { id: 'P-SD-IM-6', type: 'P-IM', strategyId: 'S-SD-TOMB-1', term: 8, property: "THE TOMBSTONE'S SUPPRESSION AND ITS NON-PROPAGATION (R10/R11)", drives: tombstoneAttempts() },
    { id: 'P-SD-IM-7', type: 'P-IM', strategyId: 'S-SD-FILE-1', term: 6, property: 'THE `file` TIER ALWAYS REPRESENTS THE SAVED STATE (C7/R3)', drives: fileTierAttempts() },
    { id: 'P-SD-IM-8', type: 'P-IM', strategyId: 'S-SD-REC-1', term: 16, property: 'NOTHING IS SWALLOWED AND NOTHING THROWS (C7/R8)', drives: recordAttempts() },
    { id: 'P-SD-IM-9', type: 'P-IM', strategyId: 'S-SD-PURGE-1', term: 5, property: "THE PURGE'S EXACT SET, BOUNDED BY R7", drives: purgeAttempts() },
    { id: 'P-SD-IM-10', type: 'P-IM', strategyId: 'S-SD-REG-1', term: 4, property: 'THE REGISTER IS THE ROOT TABLE AND NOTHING ELSE (C14)', drives: registerAttempts() },
    { id: 'P-SD-IM-11', type: 'P-IM', strategyId: 'S-SD-GEN-1', term: 12, property: 'NO STORE-OWNED VOCABULARY AND NO APPLICATION NAME SET (R1/R4)', drives: noVocabularyAttempts() },
    { id: 'P-SD-SM-1', type: 'P-SM', strategyId: 'S-SD-LIS-1', term: 8, property: "THE LISTENER'S ATTACHMENT MACHINE (C23)", drives: listenerMachineAttempts() },
    { id: 'P-SD-SM-2', type: 'P-SM', strategyId: 'S-SD-LOAD-1', term: 6, property: 'THE LOAD MACHINE (C24)', drives: loadMachineAttempts() },
    { id: 'P-SD-SM-3', type: 'P-SM', strategyId: 'S-SD-TEMP-1', term: 6, property: "THE `temp` INSTANCE'S LIFECYCLE AND THE AUTOMATIC ROLLBACK (C9/R7)", drives: tempAttempts() },
    { id: 'P-SD-SM-4', type: 'P-SM', strategyId: 'S-SD-GATE-1', term: 10, property: "THE `secure` GRAPH'S ACCESS MACHINE (C6)", drives: gateAttempts() },
    { id: 'P-SD-TP-1', type: 'P-TP', strategyId: 'S-SD-RTOT-1', term: 12, property: 'THE READ IS TOTAL AND ITS REFUSAL IS VERBOSE (C17)', drives: readTotalityAttempts() },
    { id: 'P-SD-TP-2', type: 'P-TP', strategyId: 'S-SD-WTOT-1', term: 21, property: 'THE WRITE IS TOTAL AND ITS RECORD IS CLOSED (C7/R8)', drives: writeTotalityAttempts() },
    { id: 'P-SD-TP-3', type: 'P-TP', strategyId: 'S-SD-ADDR-1', term: 6, property: 'THE ADDRESS GRAMMAR IS TOTAL (C15/C16)', drives: addressAttempts() },
    { id: 'P-SD-TP-4', type: 'P-TP', strategyId: 'S-SD-ADMIT-1', term: 22, property: 'THE ADMISSION SET IS CLOSED AND THE MINT IS TOTAL (C3/C11)', drives: admissionAttempts() },
    { id: 'P-SD-TP-5', type: 'P-TP', strategyId: 'S-SD-ROUND-1', term: 8, property: "THE FILE'S ROUND TRIP IS EXACT (C7/C12)", drives: roundTripAttempts() },
    { id: 'P-SD-IM-12', type: 'P-IM', strategyId: 'S-SD-BRK-1', term: 8, property: 'THE FAIL-ON-BROKEN-PRIOR-CONSTRAINT ARM (R15 item 3, token 20)', drives: brokenPriorConstraintAttempts() },
    { id: 'P-SD-SM-5', type: 'P-SM', strategyId: 'S-SD-REPAIR-1', term: 10, property: "THE CONSTRAINT PHASE'S REPAIR-ONCE / RE-CHECK MACHINE (R15 items 1–2)", drives: repairMachineAttempts() },
    { id: 'P-SD-TP-6', type: 'P-TP', strategyId: 'S-SD-MSG-1', term: 16, property: "THE MESSAGE LIST'S TOTALITY, ORDER AND RETURN (R15 item 4)", drives: messageListAttempts() },
    { id: 'P-SD-IM-13', type: 'P-IM', strategyId: 'S-SD-LITPROP-1', term: 8, property: 'THE LITERAL-PROPERTY RE-MINT IS ABSOLUTE AND NOTHING IS DELETED (R16(a)/R16(c)/R17(b))', drives: literalPropertyAttempts() },
    { id: 'P-SD-SM-6', type: 'P-SM', strategyId: 'S-SD-ARM-1', term: 24, property: 'THE WRITE-ARM DISPATCH (M-PROP) AND ITS SIX OUTCOMES (R16/R17)', drives: writeArmAttempts() },
    { id: 'P-SD-TP-8', type: 'P-TP', strategyId: 'S-SD-VALUE-1', term: 12, property: "`_value`'S TRANSPARENCY, ITS RESERVATION AND ITS EXCLUSIVITY (R16(e), R17(c))", drives: valueMechanismAttempts() },
    { id: 'P-SD-TP-9', type: 'P-TP', strategyId: 'S-SD-PTOMB-1', term: 12, property: 'THE PROPERTY-ADDRESS TOMBSTONE (P §12’s named derivation, A8)', drives: tombstoneAttemptsOfProperty() },
  ]
}

/** `P-SD-TP-9`'s twelve drives, kept in their own builder beside the property-tombstone table. */
function tombstoneAttemptsOfProperty(): readonly Attempt[] {
  return propertyTombstoneAttempts()
}

/** Runs the register: rows SEQUENTIALLY IN REGISTER ORDER, each drive counted as ONE attempt,
 *  with the two caps and the STOP-AFTER-5-CONSECUTIVE-FAILURES rule. A row that never ran is
 *  `un-run` and is reported as a FAILURE by its caller. */
export async function runRegister(): Promise<RegisterReport> {
  await resolveStoreSurface()
  const rows: RowReport[] = []
  const reasons: string[] = []
  let consecutiveFailures = 0
  let stoppedAtRow: string | null = null
  let stopReason: string | null = null
  let attemptsExecuted = 0
  let rowsExecuted = 0
  let rowsHeld = 0
  let rowsBroken = 0
  const all = registerRows()

  for (const row of all) {
    if (stoppedAtRow !== null) {
      rows.push({
        id: row.id,
        type: row.type,
        strategyId: row.strategyId,
        declaredTerm: row.term,
        attemptsRun: 0,
        abandoned: row.term,
        held: 0,
        broken: 0,
        state: 'un-run',
        readings: [],
      })
      continue
    }
    let held = 0
    let broken = 0
    const readings: string[] = []
    let stoppedInsideRow = false
    for (const attempt of row.drives) {
      if (consecutiveFailures >= STOP_AFTER_CONSECUTIVE) {
        stoppedInsideRow = true
        stoppedAtRow = row.id
        stopReason = `${STOP_AFTER_CONSECUTIVE} consecutive failures reached; the running row's remaining attempts were abandoned and NO further row started (§5.5 item 2)`
        break
      }
      attemptsExecuted += 1
      try {
        attempt.drive()
        held += 1
        consecutiveFailures = 0
      } catch (e) {
        broken += 1
        consecutiveFailures += 1
        const reading = `BROKEN — ${attempt.name}: ${describeThrown(e)}`
        readings.push(reading)
        reasons.push(`${row.id} · ${reading}`)
      }
    }
    const attemptsRun = held + broken
    rowsExecuted += 1
    const state: RowReport['state'] = broken === 0 && !stoppedInsideRow ? 'held' : 'broken'
    if (state === 'held') rowsHeld += 1
    else rowsBroken += 1
    rows.push({
      id: row.id,
      type: row.type,
      strategyId: row.strategyId,
      declaredTerm: row.term,
      attemptsRun,
      abandoned: row.term - attemptsRun,
      held,
      broken,
      state,
      readings,
    })
  }

  const declaredTerms = [...DECLARED_TERMS]
  const declaredTotal = declaredTerms.reduce((sum, term) => sum + term, 0)
  const chain: number[] = []
  let running = 0
  for (const term of declaredTerms) {
    running += term
    chain.push(running)
  }
  // The subtotals BY TYPE, read off the row table in REGISTER ORDER (never a hand-kept parallel
  // array), so a re-ordered row cannot silently move a subtotal.
  const typeOf = all.map((row) => row.type)
  const subtotals = {
    'P-IM': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-IM' ? s + t : s), 0),
    'P-SM': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-SM' ? s + t : s), 0),
    'P-TP': declaredTerms.reduce((s, t, i) => (typeOf[i] === 'P-TP' ? s + t : s), 0),
  }
  const perRowMax = Math.max(...declaredTerms)
  const perRowMaxRow = REGISTER_ROW_IDS[declaredTerms.indexOf(perRowMax)] ?? ''
  return {
    rows,
    declaredTerms,
    declaredTotal,
    declaredTotalAsFiledHeading: DECLARED_TOTAL_AS_FILED_HEADING,
    declaredTotalTerms: DECLARED_TOTAL_TERMS,
    chain,
    subtotals,
    attemptsExecuted,
    rowsExecuted,
    rowsDeclared: all.length,
    rowsHeld,
    rowsBroken,
    unrunRows: rows.filter((r) => r.state === 'un-run').map((r) => r.id),
    unrunAreFailures: true,
    stoppedAtRow,
    stopReason,
    perRowMax,
    perRowMaxRow,
    perRowCap: REGISTER_ROW_CAP,
    totalCap: REGISTER_TOTAL_CAP,
    reasons,
  }
}

/** `§5.5.2` item 1 — the register's honesty block, restated in this layer's own terms so a reader
 *  does not have to leave the file to read the boundaries of what it proves. */
export const HONESTY: readonly string[] = [
  'the register proves nothing about the assembled app: it is contract-text evidence over a module that does not exist yet (no [H] claim, no APP claim)',
  'every strategy is a CLOSED, exhaustively enumerated input set; NO row takes a draw, so no pinned-seed generator is owed and no dependency is added',
  'the register does NOT cover performance, memory behaviour, a hostile caller beyond the closed sets (a Proxy, a revoked Proxy, a SharedArrayBuffer, a RegExp — all outside the admission set BY CLASS and refused at G-VALUE), a full disk, a concurrent external writer, or two store instances over one path',
  'an un-run row is a FAILURE, never a pass',
  'the row count is an OUTCOME, not a budget',
]
