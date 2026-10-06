/* ============================================================================
 * U-SECURE-STORE-DISCIPLINE (`S3`, wave `S`) — THE RED SET (RCA-1: tests FIRST,
 * written from the contract, RUN, and REPORTED as failing BEFORE any
 * implementation).  Author: TestWriter.  Layer: `[H]`/`[T]` per the contract's
 * §1.4 (main-process module evidence — NOT an APP-green, NOT a live-battery
 * pass, NOT a UI claim, NOT a gate-semantics change).
 *
 * CONTRACT — THE ONLY AUTHORITY: `docs/specs/secure-store-discipline.md`
 * (362 lines, read IN FULL at red-authoring; every operative cell is cited below
 * by §/row id, never by line).  The three obligations:
 *   O-1  §2.3 + §2.1 item 3   a refused persist ROLLS THE RECORD BACK — the
 *                             advance happens at the COMMIT POINT (the
 *                             successful renameSync) and nowhere else, and a
 *                             refusal RETURNS THE PRE-WRITE RECORD.
 *   O-2  §2.2 + §2.4 R-1      the JSON-SAFETY ADMISSION — an unrepresentable
 *                             member value REFUSES THE WHOLE PATCH (the landed
 *                             documented coercions stay inside its boundary).
 *   O-3  §2.5 + §0A item 4    a DEEP, cycle-safe, prototype-safe copy over the
 *                             FULL read surface (`Object.create(null)` + a
 *                             `seen` map) — `lastWriteReceipt()` included, whose
 *                             copy is a PLAIN object literal.
 * TEST HOME: §4.1 item 1 names `tests/secure-store-discipline.test.ts` and says a
 * diff that edits `tests/store-security.test.ts` (the landed `G3` suite) is a
 * scope finding — this file does NOT touch it.
 *
 * ----------------------------------------------------------------------------
 * THE STATE MACHINE, ENUMERATED BEFORE THE ROWS (TestWriter discipline)
 * ----------------------------------------------------------------------------
 * §3.1 VALID / HAPPY STATES
 *   M-1  a representable write-through lands; the record advances AT the commit
 *        point; the file's bytes are the candidate; no `${path}.tmp` remains.
 *   M-2  the ordered advance across the four failure-free steps (the candidate is
 *        floored/coerced, the advance sits after the rename and before the
 *        directory fsync).
 *   M-3  `lastWriteReceipt()` hands out a DETACHED copy — twice.
 *   M-4  `get()` hands out a DEEP detached record (no alias at any depth).
 *   M-5  the documented coercions still apply INSIDE the admission's boundary.
 *   M-6  the read-only patch shape (`{token: undefined}` = the ABSENT marker).
 *   M-7  the first-run default's boot chain (missing file · corrupt file · the
 *        path a DIRECTORY) — never a throw, and the constructor writes no file.
 * §3.2 DOCUMENTED FAIL-STATES
 *   F-1  a refused persist rolls the record back (the headline).
 *   F-2  an unrepresentable value is NOT accepted (whole-patch refusal).
 *   F-3  the `Infinity` divergence is CLOSED (neither memory nor file ever
 *        carries a non-finite cap).
 *   F-4  a prototype-poisoned patch value does not enter and cannot pollute.
 *   F-5  a non-object patch is REFUSED, never thrown (`set(null)`'s landed
 *        `TypeError` is CLOSED).
 *   F-6  the receipt is never a third token and never `undefined`.
 *   F-7  a throw from any declared member FAILS the totality rows.
 *   F-8  a live record advanced past a refusal FAILS the rollback invariant.
 *   F-9  an ADMISSION refusal that touches the filesystem FAILS.
 *   F-10 a shared receipt, or a `get()` alias, FAILS the clone property.
 *   F-11 a fourth value-returning member, or a renamed one, FAILS the census.
 *   F-12 an edit to a frozen or out-of-scope file FAILS (a COLLISION finding).
 * §2.4 THE REFUSAL SEMANTICS (each a drive class below)
 *   R-1 admission refusal · R-2 tmp-write refusal · R-3 tmp-fsync refusal ·
 *   R-4 rename refusal · R-5 post-commit directory-fsync failure (COMMITTED,
 *   never a rollback — §0A item 2) · R-6 committed.
 * §5.6.1 THE REGISTER — 9 typed rows (`5` P-IM + `2` P-SM + `2` P-TP), each
 *   executed as a plain deterministic vitest table (no seed, no generator, no
 *   `Math.random`, no new dependency — §4.3 item 4 / §5.5 item 1), reporting
 *   `id · type · strategy · attempts-run · held · broken`, with the declared
 *   total `118 = 51+12+6+7+16+2+8+8+8` and the caps `51 ≤ 100` / `118 ≤ 400`,
 *   STOP AFTER 5 CONSECUTIVE FAILURES.  AN UN-RUN ROW IS A FAILURE.
 *
 * ----------------------------------------------------------------------------
 * THE MUTATION / DELETION THAT WOULD REDDEN EACH LOAD-BEARING ASSERTION
 * ----------------------------------------------------------------------------
 *  REG-1 `P-O2-IM-1` (51)  delete the admission check and this row reddens at once:
 *                          `Infinity`/`BigInt(7)`/`Map` on any member are today
 *                          ACCEPTED (`{"status":"committed"}` on a discarded or
 *                          coerced value — the measured SC-E-01/SC-E-02 class).
 *  REG-2 `P-O1-TP-1` (12)  the `current = candidate` assignment at the landed
 *                          `:138` (BEFORE `persist()` at `:139`) IS the mutation:
 *                          classes 1–4 answer a live record the file does not
 *                          carry.  Delete the rollback and this row is the one
 *                          that says so.
 *  REG-3 `P-M-SM-1` (6)    the STAGED attempt observes `${path}.tmp` holding the
 *                          candidate while the real path is untouched; the
 *                          ordered form's persist-boundary probe reads the
 *                          STAGED bytes at the PRE-rename tmp fsync — the probe
 *                          plus the module's own `set()` body IS the ordered
 *                          reading (the landed module exports no seam, §2.1
 *                          item 1; the reading's declared limit is stated).
 *  REG-4 `P-O2-IM-2` (7)   the best-effort tmp cleanup: re-throw from the `catch`
 *                          (delete the swallow, the `G3` F-11 host fix) and the
 *                          directory-shaped stale-tmp control throws.
 *  REG-5 `P-TP-2` (16)     `set(null)` throws today — delete the whole-patch
 *                          refusal for a non-object patch and the totality row
 *                          reddens; add a `reason` to a commit and the closed
 *                          vocabulary reddens.
 *  REG-6 `P-M-SM-2` (2)    the ordered form reddens on the DELETE of the commit-
 *                          point ordering (the observable form alone is declared
 *                          the WEAKER reading, §2.3 item 2 — it is attempt (2)
 *                          and does NOT substitute for attempt (1)).
 *  REG-7 `P-O3-IM-2` (8)   `lastWriteReceipt()` returns the tier's OWN object at
 *                          the landed `:142-144`: delete the copy and the
 *                          identity reading (`a === b`) reddens; make `get()`
 *                          hand out `current` and the deep reading reddens.
 *  REG-8 `P-O2-TP-1` (8)   the documented coercions: delete one and its class's
 *                          exact post-state/bytes reading reddens (e.g. stop
 *                          flooring 50.7 and class 6 reddens).
 *  REG-9 `P-O3-TP-1` (8)   add a fourth member to the returned object, rename an
 *                          export, move a frozen byte, or add a token to the
 *                          store's 16-member union and the census part reddens.
 *
 * CONTROLS (a wrong state that the detector must REFUSE — §2.5 item 5's
 * "a detector that cannot fail proves nothing"):
 *  C-1 the copy/shared-object detector is driven against (a) a subject that hands
 *      out ONE shared object (it must FIRE) and (b) the real store (it must NOT).
 *  C-2 the alias detector is driven against a subject whose `get()` aliases the
 *      caller's own record object (it must FIRE).
 *  C-3 the member-census detector is driven against a 4-key shape, a 2-key shape
 *      and a renamed-key shape (it must reject all three).
 *  C-4 the union-membership extractor is driven against the real module's type
 *      bytes AND against a mutated copy carrying `'write-failed'` (it must
 *      FIRE on the mutant — so `16` and the token's absence are attributable).
 *  C-5 the sha256 file-pin is driven against a DIFFERENT file (it must not
 *      match a frozen pin — so a matching digest is evidence, not a tautology).
 *  C-6 `REPRESENTABLE` (this file's own driver-side check) is driven against
 *      `Object.prototype` (a WRONG state) and must answer false.
 * ========================================================================== */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, readFile, writeFile, mkdir, readdir, chmod } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { createHash } from 'node:crypto'
import { createSecurityStore, type SecurityStore, type SecurityWriteReceipt } from '../src/main/security-store.js'

/* ==========================================================================
 * THE `node:fs` FAILURE INJECTION (the seam §5.6.1 REG-2's "each refusal
 * class's injected failure is DRIVEN (a seam/mock named in the red set), never
 * described" demands).  `security-store.ts` DESTRUCTURES its fs imports at
 * module load, so the injection must live in the mocked module itself (the
 * landed `tests/store-security.test.ts` precedent).  Test-local IO uses
 * `node:fs/promises` — a DIFFERENT specifier, unmocked — so the store's bytes
 * and this file's own IO never share a wrapper.
 * ======================================================================== */

const hooks = vi.hoisted(() => ({
  log: [] as string[],
  /** The tmp bytes AS THEY ARE AT EACH FSYNC — the persist-boundary probe: the
   *  PRE-rename fsync (call 1) must already see the CANDIDATE staged (§2.1 item 3
   *  step 3), and the post-rename fsync (call 2) sees the same bytes, because the
   *  commit point is the rename that puts them at the real path (§0A item 2). */
  fsyncTmpBytes: [] as string[],
  /** The staging path of the write in flight (set by `writeFileSync`). */
  currentTmp: '',
  inject: { writeFile: false, fsync: false, rename: false, fsyncAt: null as number | null },
  fsyncCalls: 0,
}))

vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs')>()
  return {
    ...actual,
    mkdirSync: (dir: unknown, opts?: unknown): void => {
      hooks.log.push(`mkdir:${String(dir)}`)
      actual.mkdirSync(dir as never, opts as never)
    },
    writeFileSync: (file: unknown, data?: unknown, opts?: unknown): void => {
      hooks.log.push(`writeFile:${String(file)}`)
      hooks.currentTmp = String(file)
      if (hooks.inject.writeFile) throw new Error('injected: tmp-write failure')
      actual.writeFileSync(file as never, data as never, opts as never)
    },
    renameSync: (from: unknown, to: unknown): void => {
      hooks.log.push(`rename:${String(from)}`)
      if (hooks.inject.rename) throw new Error('injected: rename failure')
      actual.renameSync(from as never, to as never)
    },
    fsyncSync: (fd: unknown): void => {
      hooks.fsyncCalls += 1
      hooks.log.push(`fsync:${hooks.fsyncCalls}`)
      try {
        hooks.fsyncTmpBytes.push(actual.readFileSync(hooks.currentTmp as never, 'utf8') as string)
      } catch {
        hooks.fsyncTmpBytes.push('')
      }
      if (hooks.inject.fsync) throw new Error('injected: tmp-fsync failure')
      if (hooks.inject.fsyncAt !== null && hooks.fsyncCalls === hooks.inject.fsyncAt) {
        throw new Error('injected: dir-fsync failure (the POST-RENAME directory fsync)')
      }
      actual.fsyncSync(fd as never)
    },
    readFileSync: (file: unknown, opts?: unknown): string | Buffer => actual.readFileSync(file as never, opts as never),
    existsSync: (file: unknown): boolean => actual.existsSync(file as never),
  }
})

/* ========================= test-local IO (REAL fs — unmocked) ============ */

const TEST_ROOT = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(TEST_ROOT, '..')
const SRC = (...rel: string[]): string => join(REPO_ROOT, 'src', ...rel)

function resetInject(): void {
  hooks.inject = { writeFile: false, fsync: false, rename: false, fsyncAt: null }
  hooks.fsyncCalls = 0
}
/** The tmp-`fsync` refusal class (R-3): the FIRST fsync of the persist — the
 *  staging file, PRE-rename. */
function armTmpFsyncFailure(): void {
  resetInject()
  hooks.inject.fsync = true
}
/** The POST-COMMIT DIRECTORY-`fsync` failure class (R-5, §0A item 2): the SECOND
 *  fsync of the persist — the parent directory, AFTER the rename. */
function armDirFsyncFailure(): void {
  resetInject()
  hooks.inject.fsyncAt = 2
}
function armTmpWriteFailure(): void {
  resetInject()
  hooks.inject.writeFile = true
}
function armRenameFailure(): void {
  resetInject()
  hooks.inject.rename = true
}
/** The store's own filesystem activity, since the last `resetFsLog()`. */
function resetFsLog(): void {
  hooks.log = []
  hooks.fsyncTmpBytes = []
  hooks.currentTmp = ''
}
/** EVERY filesystem call the store made (the full activity log). */
function fsActivity(): string[] {
  return hooks.log.filter((l) => l.startsWith('writeFile:') || l.startsWith('rename:'))
}
/** THE STORE'S OWN WRITES to the record — the same filter, minus any tmp staging
 *  that names something other than the record's own staging path. */
function fsWrites(): string[] {
  return fsActivity()
}

let baseDir = ''
let seq = 0
async function freshPath(name = 'provident-security.json'): Promise<string> {
  return join(baseDir, String(seq++), name)
}
async function makeStore(name = 'provident-security.json'): Promise<{ store: SecurityStore; path: string }> {
  const path = await freshPath(name)
  return { store: createSecurityStore({ path }), path }
}
async function rawBytes(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8')
  } catch {
    return null
  }
}
async function exists(p: string): Promise<boolean> {
  try {
    await readFile(p)
    return true
  } catch {
    try {
      await readdir(p)
      return true
    } catch {
      return false
    }
  }
}
function parseOrNull(bytes: string | null): Record<string, unknown> | null {
  if (bytes === null) return null
  try {
    return JSON.parse(bytes) as Record<string, unknown>
  } catch {
    return null
  }
}
/** `undefined` and an absent member are the same observable (§2.1 item 5). */
function sameVal(a: unknown, b: unknown): boolean {
  if (a === undefined || b === undefined) return a === undefined && b === undefined
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((v, i) => v === b[i])
  return a === b
}
function normRecord(r: Record<string, unknown> | null): string {
  if (r === null) return 'null'
  return JSON.stringify({ token: r.token ?? null, enabled: r.enabled, maxJournalLength: r.maxJournalLength ?? null })
}
/** The declared record shape, read as a plain member bag. */
const asRecord = (r: unknown): Record<string, unknown> => r as Record<string, unknown>
const snapshot = (r: Record<string, unknown>): string => normRecord(r)
const bytesSnapshot = (b: string | null): string => normRecord(parseOrNull(b))

/* ==========================================================================
 * THE DRIVER-SIDE REPRESENTABILITY PREDICATE (§2.2 item 1) — the EXPECTED
 * answer the module's own admission must match.  It is a VALUE-PRESERVING walk
 * with a `seen` guard, never a JSON round-trip (§2.2 item 2 forbids the
 * round-trip as the IMPLEMENTATION; §2.2 item 2 permits it here only as a
 * CONTROL, and §2.2 item 1's `__proto__` clause makes even that control
 * inexact — so this file walks).
 * ======================================================================== */

function REPRESENTABLE(v: unknown, seen: Set<object> = new Set()): boolean {
  if (v === null) return true
  const t = typeof v
  if (t === 'boolean' || t === 'string') return true
  if (t === 'number') return Number.isFinite(v as number)
  if (t !== 'object') return false // function · symbol · bigint · undefined
  if ((v as object) === Object.prototype) return false // hostile input (C-6)
  if (seen.has(v as object)) return false // the cycle guard
  seen.add(v as object)
  const o = v as Record<string, unknown>
  if (Array.isArray(o)) return o.every((el) => REPRESENTABLE(el, seen))
  if (Object.getPrototypeOf(o) !== Object.prototype && Object.getPrototypeOf(o) !== null) return false
  return Object.keys(o).every((k) => REPRESENTABLE(o[k], seen))
}

/* ==========================================================================
 * THE STORE'S CLOSED VOCABULARY — read from the MODULE'S OWN BYTES (§5.6.1
 * `P-O3-TP-1` part (d) names the store's 16-member refusal union and the
 * "`'write-failed'` is absent from it" reading; `docs/specs/store-core-graph.md`
 * §2.1's block annotation prints `16 = 8 held + 5 + 3` with its terms).
 * ======================================================================== */

function unionTokensOf(src: string): string[] {
  const block = /GraphRefusalReason\s*=([\s\S]*?)\n\n/.exec(src)
  if (block === null) return []
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
}
const UNION_ARITY = 16
const RECEIPT_TOKENS: readonly string[] = ['committed', 'refused']
const RECEIPT_REASONS: readonly string[] = ['write-failed']
const MODULE_EXPORTS: readonly string[] = ['createSecurityStore', 'SecurityStoreOptions', 'SecurityStore', 'SecurityWriteReceipt']
const MEMBER_CENSUS: readonly string[] = ['get', 'lastWriteReceipt', 'set']

/* ==========================================================================
 * THE RECEIPT / RECORD DETECTORS
 * ======================================================================== */

function assertReceiptShape(r: SecurityWriteReceipt | null | undefined, ctx: string): void {
  if (r === null || r === undefined) throw new Error(`${ctx}: the receipt is ${String(r)} (never after an attempt — §2.1 item 6/PAR-10)`)
  const keys = Object.keys(r).sort()
  if (r.status === 'committed') {
    if (keys.length !== 1 || keys[0] !== 'status') throw new Error(`${ctx}: a commit carries a member besides \`status\` (${JSON.stringify(keys)}) — §2.3 item 6`)
    return
  }
  const status: unknown = r.status
  if (status !== 'refused') throw new Error(`${ctx}: status ${JSON.stringify(status)} is not one of the two closed tokens (§2.1 item 7)`)
  const reason: unknown = r.reason
  if (keys.length !== 2 || keys[0] !== 'reason' || keys[1] !== 'status') throw new Error(`${ctx}: a refusal's members are ${JSON.stringify(keys)}, not exactly status+reason (§2.3 item 6)`)
  if (reason !== 'write-failed') throw new Error(`${ctx}: reason ${JSON.stringify(reason)} is not the ONE closed token (§2.3 item 6/PAR-9)`)
}

function assertNoThrow(fn: () => unknown, ctx: string): unknown {
  try {
    return fn()
  } catch (e) {
    throw new Error(`${ctx}: a declared member THREW (${(e as Error).message}) — I-4/§2.3 item 1`)
  }
}

/** The member census (§2.5 item 3): exactly the three members, in the landed order. */
function memberCensusOf(subject: object): string[] {
  const names = Object.keys(subject)
  if (names.length !== MEMBER_CENSUS.length || names.some((n, i) => n !== MEMBER_CENSUS[i])) {
    throw new Error(`the returned object's own enumerable members are ${JSON.stringify(names)}; the census is EXACTLY ${JSON.stringify(MEMBER_CENSUS)} (§2.5 item 3)`)
  }
  return names
}

/** The node walk: every object/array node reachable from a returned value. */
function nodesOf(v: unknown): object[] {
  const out: object[] = []
  const walk = (x: unknown): void => {
    if (x === null || typeof x !== 'object') return
    const o = x as object
    if (out.includes(o)) return
    out.push(o)
    for (const k of Object.keys(o as Record<string, unknown>)) walk((o as Record<string, unknown>)[k])
  }
  walk(v)
  return out
}

/** The clone detector: two readings aliasing each other FAIL (§2.5 item 1). */
function assertNoAliasing(a: unknown, b: unknown, ctx: string): void {
  const na = new Set(nodesOf(a))
  const shared = nodesOf(b).filter((n) => na.has(n))
  if (shared.length > 0) throw new Error(`${ctx}: ${shared.length} node(s) of the second reading ALIAS the first — no aliasing at any depth (§2.5 item 1)`)
}

/* ==========================================================================
 * THE PRE-WRITE STATE + THE EXPECTED POST-STATE (the §2.2 item 3 boundary)
 * ======================================================================== */

const PRE_SNAPSHOT: Record<string, unknown> = { token: 'PRE', enabled: ['read'], maxJournalLength: 100 }
/** Establish a durable, known pre-write record through the landed write path. */
function probe(store: SecurityStore): Record<string, unknown> {
  assertNoThrow(() => store.set({ token: 'PRE', groups: ['read'], maxJournalLength: 100 }), 'probe write')
  return asRecord(store.get())
}
/** The five landed VALID_GROUPS, from §2.2 item 3. */
const VALID_GROUPS: readonly string[] = ['read', 'dispatch', 'graph', 'code', 'module']

/** The store's own add/remove + coercion rules, applied to the PRE-write record
 *  — the "expected post-state" for an ADMITTED patch (§2.2 item 3). */
function expectedPost(pre: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const add = Array.isArray(patch.groups) ? [...new Set((patch.groups as unknown[]).filter((g): g is string => typeof g === 'string' && VALID_GROUPS.includes(g)))] : []
  const del = Array.isArray(patch.disable) ? [...new Set((patch.disable as unknown[]).filter((g): g is string => typeof g === 'string' && VALID_GROUPS.includes(g)))] : []
  const enabled = [...(pre.enabled as string[])]
  for (const g of add) if (!enabled.includes(g)) enabled.push(g)
  for (const g of del) {
    const i = enabled.indexOf(g)
    if (i !== -1) enabled.splice(i, 1)
  }
  const token = patch.token !== undefined ? (typeof patch.token === 'string' && patch.token !== '' ? patch.token : null) : pre.token
  const maxJournalLength = patch.maxJournalLength !== undefined
    ? (typeof patch.maxJournalLength === 'number' && patch.maxJournalLength > 0 ? Math.floor(patch.maxJournalLength) : undefined)
    : pre.maxJournalLength
  return { token, enabled, maxJournalLength }
}

/* ==========================================================================
 * §5.6.1 THE REGISTER — the closed 16-value table, its member positions, its
 * declared answers, and the DECLARED-CLEAR arm (§2.2 item 3's derived rule).
 * ======================================================================== */

type MemberKey = 'token' | 'groups' | 'maxJournalLength'

const CYCLIC: Record<string, unknown> = {}
CYCLIC.self = CYCLIC
const POISONED: Record<string, unknown> = JSON.parse('{"__proto__":{"polluted":true}}')

interface ValueSpec {
  /** The pinned literal (§5.6.1 row 1's closed table). */
  v: unknown
  label: string
  /** The two members whose DECLARED CLEAR is `null` (§2.2 item 3). */
  nullClear: boolean
}

const TABLE_16: readonly ValueSpec[] = [
  { v: BigInt(7), label: 'BigInt(7)', nullClear: false },
  { v: CYCLIC, label: 'a cyclic object (a.self = a)', nullClear: false },
  { v: () => 0, label: 'a function', nullClear: false },
  { v: Symbol('s'), label: 'a Symbol', nullClear: false },
  { v: new Map(), label: 'a Map', nullClear: false },
  { v: new Set(), label: 'a Set', nullClear: false },
  { v: new Date(0), label: 'a Date', nullClear: false },
  { v: undefined, label: 'undefined', nullClear: false },
  { v: NaN, label: 'NaN', nullClear: false },
  { v: Infinity, label: 'Infinity', nullClear: false },
  { v: -Infinity, label: '-Infinity', nullClear: false },
  { v: POISONED, label: 'a prototype-poisoned object', nullClear: false },
  { v: { hello: 'world' }, label: 'plainObject', nullClear: false },
  { v: 'safeString', label: 'safeString', nullClear: false },
  { v: 50.7, label: 'safeNumber', nullClear: false },
  { v: ['code'], label: 'safeArray', nullClear: false },
]

/** A member's admissible VALUE for an admitted plain reading: safeString `'tok'`
 *  on `token` (kept verbatim), 50.7 on `maxJournalLength` (floored by the driver
 *  via `expectedPost`), `['code']` on `groups` (the declared filter). */
function valueForMember(spec: ValueSpec, key: MemberKey): unknown {
  if (key === 'token') return spec.label === 'safeString' ? 'tok' : spec.v
  if (key === 'maxJournalLength') return spec.label === 'safeNumber' ? 50.7 : spec.v
  return spec.label === 'safeArray' ? spec.v : spec.v
}

type Admit = { admitted: true; patch: Record<string, unknown> } | { admitted: false; reason: string }

/** §2.2 item 3's RULE: an unrepresentable value is admissible ONLY as a DECLARED
 *  CLEAR of its own member (null on `token`/`maxJournalLength`), `undefined` is
 *  the ABSENT marker, and everything else unrepresentable REFUSES THE PATCH. */
function admissionOf(spec: ValueSpec, key: MemberKey): Admit {
  if (spec.v === undefined) return { admitted: true, patch: {} } // the absent marker (§2.2 item 3)
  // (c) THE DOCUMENTED "ELSE CLEARED" ARM — §6 PAR-3 declares `0` · `-0` · a
  // negative number · `NaN` as the CLEAR, and §2.2 item 3 says so explicitly
  // ("`NaN` is unrepresentable but sits in the documented clear arm, which is
  // exactly why it needs this rule rather than the predicate alone").  These are
  // ADMITTED and they clear; they are NOT the `null` clear.
  if (key === 'maxJournalLength' && typeof spec.v === 'number' && !(spec.v > 0)) {
    return { admitted: true, patch: { maxJournalLength: spec.v } }
  }
  if (spec.v === null && spec.nullClear) return { admitted: true, patch: { [key]: null } } // the declared clear
  if (REPRESENTABLE(spec.v)) return { admitted: true, patch: { [key]: valueForMember(spec, key) } }
  return { admitted: false, reason: `unrepresentable at the ${key} member: ${spec.label} (§2.2 item 3 — the clear arm is null-on-token/maxJournalLength, nothing else)` }
}

/* ==========================================================================
 * THE REGISTER HARNESS (§5.6.1: 9 rows, 118 declared attempts, ≤100 per row,
 * ≤400 total, sequential in register order, STOP AFTER 5 CONSECUTIVE FAILURES,
 * an un-run row reported as a FAILURE, the total printed WITH ITS TERMS).
 * ======================================================================== */

type RowType = 'P-IM' | 'P-SM' | 'P-TP'
interface RowResult {
  id: string
  type: RowType
  strategy: string
  declared: number
  attempts: number
  held: number
  broken: number
  failure: string | null
  ran: boolean
}
const results: RowResult[] = []

function drive(id: string, attempt: string, fn: () => void): void {
  const r = results.find((x) => x.id === id)
  if (r === undefined) throw new Error(`drive() for an undeclared row: ${id}`)
  r.attempts += 1
  try {
    fn()
    r.held += 1
  } catch (e) {
    r.broken += 1
    if (r.failure === null) r.failure = `attempt ${attempt}: ${(e as Error).message}`
  }
}

/** The register row a repair belongs to, by id (never `results[last]` — a repair
 *  taken OUTSIDE a `drive()` must be attributed to its OWN row). */
function rowById(id: string): RowResult {
  const r = results.find((x) => x.id === id)
  if (r === undefined) throw new Error(`no such register row: ${id}`)
  return r
}

function brokenStreak(): number {
  let streak = 0
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i].broken > 0) streak += 1
    else break
  }
  return streak
}

function runRow(id: string, type: RowType, strategy: string, declared: number, body: () => void): void {
  results.push({ id, type, strategy, declared, attempts: 0, held: 0, broken: 0, failure: null, ran: false })
  const row = results[results.length - 1]
  // STOP AFTER 5 CONSECUTIVE FAILURES (§5.6.1): a row beyond the streak is
  // reported UN-RUN, and an un-run row is a FAILURE, never a pass.
  if (brokenStreak() >= 5) {
    row.ran = false
    row.broken = row.declared
    row.attempts = 0
    row.failure = 'UN-RUN: the stop rule (5 consecutive broken rows) fired before this row'
    return
  }
  row.ran = true
  body()
}

function printRegister(): void {
  const lines = results.map(
    (r) =>
      `REGISTER §5.6.1 · ${r.id} · ${r.type} · ${r.strategy} · attempts-run ${r.attempts}/${r.declared} · held ${r.held} · broken ${r.broken}` +
      `${r.ran ? '' : ' · NOT-RUN (reported as a FAILURE)'}${r.failure === null ? '' : ` · first: ${r.failure}`}`,
  )
  const terms = results.map((r) => r.declared)
  const total = terms.reduce((a, b) => a + b, 0)
  const sum = (...ids: string[]): number => results.filter((r) => ids.includes(r.id)).reduce((a, r) => a + r.declared, 0)
  const im = sum('P-O2-IM-1', 'P-O2-IM-2', 'P-O3-IM-2')
  const sm = sum('P-M-SM-1', 'P-M-SM-2')
  const tp = sum('P-O1-TP-1', 'P-TP-2', 'P-O2-TP-1', 'P-O3-TP-1')
  const maxRow = Math.max(...terms)
  // eslint-disable-next-line no-console
  console.log(
    [
      '',
      '================ THE §5.6.1 REGISTER — EXECUTED ================',
      ...lines,
      `TOTAL (with its terms): 118 = ${terms.join(' + ')} — executed ${results.reduce((a, r) => a + r.attempts, 0)}`,
      `SUBTOTALS BY TYPE: P-IM ${im} · P-SM ${sm} · P-TP ${tp} — ${im} + ${sm} + ${tp} = ${im + sm + tp}`,
      `CAPS: per-row max ${maxRow} ≤ 100 (headroom ${100 - maxRow}) · total ${total} ≤ 400 (headroom ${400 - total})`,
      `ROWS: ${results.length} (${results.filter((r) => r.type === 'P-IM').length} P-IM + ${results.filter((r) => r.type === 'P-SM').length} P-SM + ${results.filter((r) => r.type === 'P-TP').length} P-TP); executed = declared? ${results.every((r) => r.attempts === r.declared)}`,
      `STOP AFTER 5 CONSECUTIVE FAILURES: ${brokenStreak() >= 5 ? `TRIGGERED (${results.filter((r) => !r.ran).map((r) => r.id).join(', ')})` : 'not triggered'}`,
      '==============================================================',
      '',
    ].join('\n'),
  )
}

/* ==========================================================================
 * THE ORDERED-FORM INSTRUMENT (§5.6.1 `P-M-SM-2` attempt (1)) — read from the
 * MODULE'S OWN BYTES.  The contract's attempt (1) names "a probe over the
 * persist boundary"; the landed module exports no such seam (§2.1 item 1: the
 * module's four exports are unmoved), so the ordered form is read STATICALLY
 * from the `set()` body — a reading with a declared limit, exactly as §4.4 item
 * 1 requires of a row whose subject the module does not expose.  The reading is
 * falsifiable in both directions: today's `:138-139` shape (assign BEFORE
 * persist) FAILS it, and an assign-after-persist shape passes it.
 * ======================================================================== */

function setBodyOf(src: string): string {
  const at = src.indexOf('set(patch:')
  if (at === -1) return ''
  const end = src.indexOf('lastWriteReceipt(): SecurityWriteReceipt | null', at)
  return src.slice(at, end === -1 ? undefined : end)
}

function orderedAdvanceOf(src: string): { persistsBeforeAssign: boolean; outcomeGated: boolean } {
  const body = setBodyOf(src)
  const assignIdx = body.indexOf('current =')
  const persistIdx = body.indexOf('persist(')
  const persistsBeforeAssign = assignIdx !== -1 && persistIdx !== -1 && assignIdx > persistIdx
  if (assignIdx === -1 || persistIdx === -1) return { persistsBeforeAssign: false, outcomeGated: false }
  // the assignment must be gated on the save's OUTCOME: the receipt's two forms
  // or an `if` between the persist call and the assignment.
  const between = body.slice(persistIdx, assignIdx)
  const outcomeGated = /status\s*===\s*'committed'|receipt\.status|===\s*'committed'|if\s*\(/.test(between)
  return { persistsBeforeAssign, outcomeGated }
}

/* ==========================================================================
 * THE SUITE
 * ======================================================================== */

beforeAll(async () => {
  baseDir = await mkdtemp(join(tmpdir(), 'ssd-'))
})
beforeEach(() => {
  resetInject()
  resetFsLog()
})
afterAll(async () => {
  await chmod(baseDir, 0o700).catch(() => undefined)
  await rm(baseDir, { recursive: true, force: true }).catch(() => undefined)
  printRegister()
})

/* ------------------------------------------------------------------ *
 * REG-1 · `P-O2-IM-1` — THE REPRESENTABILITY ADMISSION (51 attempts)  *
 * ------------------------------------------------------------------ */

runRow('P-O2-IM-1', 'P-IM', 'S-SS-ADMIT-1', 51, () => {
  it('§5.6.1 P-O2-IM-1 (S-SS-ADMIT-1) · the closed 16-value table × the three declared members × the three-way reading, + the three boundary attempts — 51 attempts, NO filesystem call on a refusal', async () => {
    for (const key of ['token', 'maxJournalLength', 'groups'] as MemberKey[]) {
      for (const spec of TABLE_16) {
        const id = `${spec.label} on ${key}`
        const expect0 = admissionOf(spec, key)
        const { store, path } = await makeStore()
        const pre = probe(store)
        const preBytes = await rawBytes(path)
        resetFsLog()
        const patch: Record<string, unknown> = expect0.admitted ? expect0.patch : { [key]: spec.v }
        const out = assertNoThrow(() => store.set(patch), `${id}: set()`)
        const receipt = store.lastWriteReceipt()
        const post = store.get()
        const postBytes = await rawBytes(path)
        const activity = fsActivity()
        const writes = fsWrites()
        const tmpResidue = await exists(`${path}.tmp`)
        // ONE attempt per (value, member position) — its THREE-WAY READING
        // (§5.6.1 row 1: "each read THREE ways (the receipt; the record
        // afterwards; the file's bytes / the absence of any filesystem call)").
        drive('P-O2-IM-1', `${id} · receipt + record + file`, () => {
          assertReceiptShape(receipt, id)
          if (expect0.admitted && receipt?.status !== 'committed') {
            throw new Error(`${id}: an ADMITTED member answered ${JSON.stringify(receipt)} — no \`committed\` receipt may answer a discarded value (§2.2 item 4)`)
          }
          if (!expect0.admitted && receipt?.status !== 'refused') {
            throw new Error(`${id}: expected a WHOLE-PATCH refusal (${expect0.reason}) but the receipt answered ${JSON.stringify(receipt)}`)
          }
          const expected = expect0.admitted ? expectedPost(pre, expect0.patch) : pre
          if (snapshot(asRecord(post)) !== snapshot(expected)) {
            throw new Error(`${id} · the record afterwards is ${snapshot(asRecord(post))}; expected ${snapshot(expected)} — ${expect0.admitted ? 'the admitted candidate' : 'the PRE-WRITE record, member for member (§2.3 item 5)'}`)
          }
          if (!expect0.admitted && out !== undefined && snapshot(out as Record<string, unknown>) !== snapshot(pre)) {
            throw new Error(`${id} · set()'s RETURN is not the pre-write record on a refusal (PAR-11/§2.1 item 3 step 6)`)
          }
          if (!expect0.admitted) {
            if (activity.length !== 0) throw new Error(`${id} · an ADMISSION refusal touched the filesystem — the activity log reads ${JSON.stringify(activity)} (§2.2 item 5(c)/F-9)`)
            if (tmpResidue) throw new Error(`${id} · an admission refusal left a ${path}.tmp — none may be created (§2.2 item 5(c))`)
            if (normRecord(parseOrNull(postBytes)) !== normRecord(parseOrNull(preBytes))) {
              throw new Error(`${id} · the real path's bytes MOVED on a refusal (${bytesSnapshot(preBytes)} → ${bytesSnapshot(postBytes)}) — §2.3 item 3`)
            }
          } else {
            if (normRecord(parseOrNull(postBytes)) !== normRecord(asRecord(post))) {
              throw new Error(`${id} · on an admitted write the file's bytes (${bytesSnapshot(postBytes)}) must carry the candidate the record holds (${snapshot(asRecord(post))}) — I-1`)
            }
            if (writes.length === 0) throw new Error(`${id} · an admitted write made NO filesystem call at all — the write path did not run`)
          }
        })
      }
    }
    // THE THREE BOUNDARY ATTEMPTS (§5.6.1 row 1's tail).
    {
      const { store, path } = await makeStore()
      probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ maxJournalLength: 50.7 }), 'boundary 49')
      drive('P-O2-IM-1', '49 · maxJournalLength 50.7 ⇒ admitted, floored to 50', () => {
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error('boundary 49: 50.7 was not ADMITTED (PAR-3: a finite positive number is floored)')
        if (store.get().maxJournalLength !== 50) throw new Error(`boundary 49: the cap is ${String(store.get().maxJournalLength)}, not the floored 50 (PAR-3)`)
      })
      void path
    }
    {
      const { store } = await makeStore()
      probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ groups: ['code', 'code', 'nope'] }), 'boundary 50')
      drive('P-O2-IM-1', "50 · groups ['code','code','nope'] ⇒ admitted, deduped+filtered to ['code']", () => {
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error('boundary 50: the patch was not ADMITTED')
        const enabled = store.get().enabled
        if (enabled.length !== 2 || enabled[0] !== 'read' || enabled[1] !== 'code') {
          throw new Error(`boundary 50: the enabled sequence is ${JSON.stringify(enabled)}, not ['read','code'] — the documented dedup+filter (PAR-4)`)
        }
      })
    }
    {
      const { store } = await makeStore()
      probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: '' }), 'boundary 51')
      drive('P-O2-IM-1', "51 · token '' ⇒ admitted, CLEARED to null", () => {
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error("boundary 51: token '' was not ADMITTED (the non-empty-string-or-null rule admits the empty string as a CLEAR)")
        if (store.get().token !== null) throw new Error(`boundary 51: the token is ${JSON.stringify(store.get().token)}, not the declared clear null (PAR-2)`)
      })
    }
    expect(results.find((r) => r.id === 'P-O2-IM-1')?.attempts, 'P-O2-IM-1 executes EXACTLY its declared 51 attempts (§5.6.1: 16 × 3 + 3)').toBe(51)
  })
})

/* ------------------------------------------------------------------ *
 * REG-2 · `P-O1-TP-1` — THE ROLLBACK'S CONSEQUENCES (12 attempts)     *
 * ------------------------------------------------------------------ */

runRow('P-O1-TP-1', 'P-TP', 'S-SS-ROLL-1', 12, () => {
  it('§5.6.1 P-O1-TP-1 (S-SS-ROLL-1) · the five failure classes × the record+file reading and the receipt reading, + the declared divergence reading and the writable control — 12 attempts', async () => {
    const classes: { name: string; arm: () => void; expectCommitted: boolean; refusalClass: boolean }[] = [
      { name: 'class 1 ADMISSION (no filesystem call at all)', arm: () => resetInject(), expectCommitted: false, refusalClass: true },
      { name: 'class 2 TMP-WRITE', arm: armTmpWriteFailure, expectCommitted: false, refusalClass: true },
      { name: 'class 3 TMP-FSYNC', arm: armTmpFsyncFailure, expectCommitted: false, refusalClass: true },
      { name: 'class 4 RENAME', arm: armRenameFailure, expectCommitted: false, refusalClass: true },
      { name: 'class 5 POST-COMMIT DIR-FSYNC', arm: armDirFsyncFailure, expectCommitted: true, refusalClass: false },
    ]
    for (const c of classes) {
      const { store, path } = await makeStore(c.refusalClass ? 'provident-security.json' : 'provident-security.json')
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      c.arm()
      resetFsLog()
      if (c.refusalClass && c.name.startsWith('class 1')) {
        c.arm()
      }
      const receipt = assertNoThrow(
        () => (c.name.startsWith('class 1') ? store.set({ token: 'x', maxJournalLength: Infinity }) : store.set({ token: 'x', maxJournalLength: 55 })),
        `${c.name}: set()`,
      ) as Record<string, unknown>
      const postBytes = await rawBytes(path)
      const activity = fsActivity()
      drive('P-O1-TP-1', `${c.name} · record + file`, () => {
        if (c.expectCommitted) {
          if (snapshot(asRecord(store.get())) !== snapshot(expectedPost(pre, { token: 'x', maxJournalLength: 55 }))) {
            throw new Error(`${c.name}: the record did not advance to the candidate (${snapshot(asRecord(store.get()))}) — §2.4 R-5`)
          }
          if (bytesSnapshot(postBytes) !== snapshot(asRecord(store.get()))) {
            throw new Error(`${c.name}: R-5 is COMMITTED — the file's bytes must be the candidate (${bytesSnapshot(postBytes)}) and live must equal durable (§0A item 2)`)
          }
          return
        }
        if (snapshot(asRecord(store.get())) !== snapshot(pre)) {
          throw new Error(`${c.name}: the LIVE record advanced past a refusal — ${snapshot(pre)} → ${snapshot(asRecord(store.get()))} (§2.3 item 2, I-1)`)
        }
        if (bytesSnapshot(postBytes) !== snapshot(pre)) {
          throw new Error(`${c.name}: the real path's bytes moved on a refusal — ${bytesSnapshot(preBytes)} → ${bytesSnapshot(postBytes)} (§2.3 item 3)`)
        }
        if (c.name.startsWith('class 1') && activity.length !== 0) {
          throw new Error(`${c.name}: an admission refusal touched the filesystem (${JSON.stringify(activity)}) — F-9`)
        }
      })
      drive('P-O1-TP-1', `${c.name} · receipt`, () => {
        assertReceiptShape(store.lastWriteReceipt(), c.name)
        const want = c.expectCommitted ? 'committed' : 'refused'
        if (store.lastWriteReceipt()?.status !== want) throw new Error(`${c.name}: the receipt answered ${JSON.stringify(store.lastWriteReceipt())}, expected ${want}`)
        if (c.refusalClass && snapshot(receipt) !== snapshot(pre)) throw new Error(`${c.name}: set()'s return is not the PRE-WRITE record`)
      })
    }
    // (11) THE DECLARED DIVERGENCE READING (§5.1 item 4 / §7c Q-2) — RECORDED,
    // never a pass/fail claim about the gate (§4.2's own limit).
    {
      const mainSrc = await readFile(SRC('main', 'main.ts'), 'utf8')
      const handler = /ipcMain\.handle\(IPC_SECURITY_SET[\s\S]*?\n  \}\)/.exec(mainSrc)?.[0] ?? ''
      drive('P-O1-TP-1', '11 · the declared divergence reading (§5.1 item 4)', () => {
        if (handler.length === 0) throw new Error('the IPC_SECURITY_SET handler is absent from main.ts — the divergence reading has no subject')
        const receivesPatch = /securityStore\.set\(patch\)/.test(handler)
        const reGatesUnconditionally = /mcp\.applyGatePatch\(/.test(handler) && !/lastWriteReceipt\(\)\?\.status|status === 'committed'/.test(handler)
        if (!receivesPatch) throw new Error('the handler no longer calls `securityStore.set(patch)` — §5.1 item 4 records the handler as UNMOVED')
        if (!reGatesUnconditionally) throw new Error('the handler now GATES the re-gate on the receipt — that is §7c Q-2 option (b), which is out of this unit’s declared default and needs its own red row')
      })
    }
    // (12) THE WRITABLE POSITIVE CONTROL.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'ctl' }), 'writable control')
      drive('P-O1-TP-1', '12 · the writable positive control — committed, no tmp remains', () => {
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error('the writable control did not commit')
        if (!sameVal(store.get().token, 'ctl')) throw new Error(`the writable control's token is ${JSON.stringify(store.get().token)}, not 'ctl'`)
        void pre
      })
      if (await exists(`${path}.tmp`)) {
        // A successful persist leaves NO tmp (§2.3 item 4(a)).
        const row = rowById('P-O1-TP-1')
        row.held -= 1
        row.broken += 1
        row.failure = 'attempt 12: a successful persist left a `${path}.tmp` — §2.3 item 4(a)'
      }
    }
    expect(results.find((r) => r.id === 'P-O1-TP-1')?.attempts, 'P-O1-TP-1 executes EXACTLY its declared 12 attempts (§5.6.1: 5 × 2 + 2)').toBe(12)
  })
})

/* ------------------------------------------------------------------ *
 * REG-3 · `P-M-SM-1` — THE WRITE PATH'S STATE MACHINE (6 attempts)    *
 * ------------------------------------------------------------------ */

runRow('P-M-SM-1', 'P-SM', 'S-SS-WSM-1', 6, () => {
  it('§5.6.1 P-M-SM-1 (S-SS-WSM-1) · (a) IDLE · (b) ADMITTED · (c) STAGED · (d) RENAMED · (e) REFUSED-ADMISSION · (f) POST-COMMIT-DIR-FSYNC-FAILURE — each with its own id — 6 attempts', async () => {
    // (a) IDLE — the pre-attempt observable.
    {
      const { store, path } = await makeStore()
      resetFsLog()
      drive('P-M-SM-1', '(a) IDLE', () => {
        if (store.lastWriteReceipt() !== null) throw new Error(`IDLE: lastWriteReceipt() answered ${JSON.stringify(store.lastWriteReceipt())}, not null before the first attempt (§2.1 item 6/PAR-10)`)
        if (snapshot(asRecord(store.get())) !== snapshot({ token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined })) {
          throw new Error(`IDLE: the cold store's record is ${snapshot(asRecord(store.get()))}, not the first-run default (§2.1 item 2)`)
        }
        if (fsActivity().length !== 0) throw new Error('IDLE: the constructor wrote a file (§2.1 item 2 — the boot read is a read)')
      })
      void path
    }
    // (b) ADMITTED — the candidate exists as a LOCAL; the record is still the
    // pre-attempt value.
    {
      const { store } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'NEXT' }), '(b) ADMITTED: set()')
      drive('P-M-SM-1', '(b) ADMITTED (read together with (a))', () => {
        if (snapshot(asRecord(store.get())) !== snapshot(expectedPost(pre, { token: 'NEXT' }))) {
          throw new Error(`ADMITTED: the record is ${snapshot(asRecord(store.get()))} — the candidate must be the answer once the write committed (§2.1 item 3 step 6)`)
        }
      })
    }
    // (c) STAGED — `${path}.tmp` exists while the real path is untouched.  The
    // observable is frozen by a RENAME-INJECTED failure (§5.6.1's "the injected
    // failure is DRIVEN, never described"), and the staged candidate's identity
    // is read from the mock's own observation of the rename's SOURCE.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      armRenameFailure()
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'STAGED' }), '(c) STAGED: set()')
      const tmpBytes = await rawBytes(`${path}.tmp`)
      const realBytes = await rawBytes(path)
      const renameLog = hooks.log.find((l) => l.startsWith('rename:')) ?? ''
      drive('P-M-SM-1', '(c) STAGED (read together with (d))', () => {
        if (tmpBytes === null) throw new Error('STAGED: the staging path `${path}.tmp` does not exist — the candidate must be staged before the rename (§2.1 item 3 step 3)')
        if (normRecord(parseOrNull(tmpBytes)) !== snapshot(expectedPost(pre, { token: 'STAGED' }))) {
          throw new Error(`STAGED: the staged bytes are ${bytesSnapshot(tmpBytes)}, not the candidate ${snapshot(expectedPost(pre, { token: 'STAGED' }))}`)
        }
        if (normRecord(parseOrNull(realBytes)) !== snapshot(pre)) {
          throw new Error(`STAGED: the real path's bytes are ${bytesSnapshot(realBytes)}, not the PRE-write record — the real path is untouched until the rename (§2.1 item 3 step 4)`)
        }
        if (!renameLog.endsWith(`${path}.tmp`)) throw new Error(`STAGED: the rename's SOURCE was ${JSON.stringify(renameLog)}, not the staging path`)
        void preBytes
      })
    }
    // (d) RENAMED — the bytes at the real path ARE the candidate and the record
    // has advanced.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'RENAMED' }), '(d) RENAMED: set()')
      const realBytes = await rawBytes(path)
      drive('P-M-SM-1', '(d) RENAMED', () => {
        const candidate = expectedPost(pre, { token: 'RENAMED' })
        if (bytesSnapshot(realBytes) !== snapshot(candidate)) throw new Error(`RENAMED: the real path's bytes are ${bytesSnapshot(realBytes)}, not the candidate`)
        if (snapshot(asRecord(store.get())) !== snapshot(candidate)) throw new Error('RENAMED: the record did not advance at the commit point (§2.1 item 3 step 4)')
      })
    }
    // (e) REFUSED-ADMISSION — the filesystem was untouched (§2.2 item 5(c)).
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: BigInt(7) as never }), '(e) REFUSED-ADMISSION: set()')
      drive('P-M-SM-1', '(e) REFUSED-ADMISSION', () => {
        if (fsActivity().length !== 0) throw new Error(`REFUSED-ADMISSION: the filesystem was touched (${JSON.stringify(fsActivity())}) — §2.2 item 5(c)/F-9`)
        if (store.lastWriteReceipt()?.status !== 'refused') throw new Error('REFUSED-ADMISSION: the receipt is not the refused form')
        if (snapshot(asRecord(store.get())) !== snapshot(pre)) throw new Error('REFUSED-ADMISSION: the record moved')
        void path
      })
    }
    // (f) POST-COMMIT-DIR-FSYNC-FAILURE — committed, advanced, NO rollback.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      armDirFsyncFailure()
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'POST' }), '(f) POST-COMMIT-DIR-FSYNC: set()')
      const realBytes = await rawBytes(path)
      drive('P-M-SM-1', '(f) POST-COMMIT-DIR-FSYNC-FAILURE', () => {
        const candidate = expectedPost(pre, { token: 'POST' })
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error(`POST-COMMIT-DIR-FSYNC: the receipt answered ${JSON.stringify(store.lastWriteReceipt())}; §0A item 2 declares COMMITTED at the post-rename point`)
        if (snapshot(asRecord(store.get())) !== snapshot(candidate)) throw new Error('POST-COMMIT-DIR-FSYNC: the record must stay ADVANCED — no rollback after the commit point')
        if (bytesSnapshot(realBytes) !== snapshot(candidate)) throw new Error('POST-COMMIT-DIR-FSYNC: live must equal durable at the post-rename point')
      })
    }
    expect(results.find((r) => r.id === 'P-M-SM-1')?.attempts, 'P-M-SM-1 executes EXACTLY its declared 6 attempts (§5.6.1: 2 × 2 + 1 + 1)').toBe(6)
  })
})

/* ------------------------------------------------------------------ *
 * REG-4 · `P-O2-IM-2` — THE REFUSAL'S FILESYSTEM CONSEQUENCES (7)     *
 * ------------------------------------------------------------------ */

runRow('P-O2-IM-2', 'P-IM', 'S-SS-TMP-1', 7, () => {
  it('§5.6.1 P-O2-IM-2 (S-SS-TMP-1) · four refusal classes × the not-torn / not-the-record reading, + the no-tmp control, the directory-shaped stale tmp, the writable control — 7 attempts', async () => {
    const classes: { name: string; realPathIsDirectory: boolean; arm: () => void }[] = [
      { name: 'class 1 admission', realPathIsDirectory: false, arm: () => resetInject() },
      { name: 'class 2 tmp-write (the parent is a regular FILE)', realPathIsDirectory: false, arm: armTmpWriteFailure },
      { name: 'class 3 tmp-fsync', realPathIsDirectory: false, arm: armTmpFsyncFailure },
      { name: 'class 4 rename (the target path IS A DIRECTORY)', realPathIsDirectory: true, arm: () => resetInject() },
    ]
    for (const c of classes) {
      const dir = join(baseDir, String(seq++))
      const path = join(dir, 'provident-security.json')
      await mkdir(dir, { recursive: true })
      let pre: Record<string, unknown> = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
      let preBytes: string | null = null
      if (!c.realPathIsDirectory) {
        const store0 = createSecurityStore({ path })
        pre = probe(store0)
        preBytes = await rawBytes(path)
      } else {
        // A pre-write record EXISTS and the real path is a DIRECTORY: the record
        // is durable-absent (the boot fallback, §2.3 item 7(ii)) while the
        // refusal class is the REAL one the spec names (§2.4 R-4).
        await mkdir(path, { recursive: true })
      }
      const store = createSecurityStore({ path })
      const preRead = store.get()
      c.arm()
      resetFsLog()
      assertNoThrow(
        () => (c.name.startsWith('class 1') ? store.set({ token: BigInt(7) as never }) : store.set({ token: 'x' })),
        `${c.name}: set()`,
      )
      const realBytes = await rawBytes(path)
      const tmpBytes = await rawBytes(`${path}.tmp`)
      const realPathStillExists = await exists(path)
      drive('P-O2-IM-2', `${c.name} · the real path is not torn and the tmp is never the record`, () => {
        if (store.lastWriteReceipt()?.status !== 'refused') {
          throw new Error(`${c.name}: the receipt answered ${JSON.stringify(store.lastWriteReceipt())}, not the refused form — every class must refuse (R-2..R-4)`)
        }
        if (c.realPathIsDirectory) {
          if (realBytes !== null) throw new Error(`${c.name}: the directory-shaped real path was replaced by file bytes — impossible for a rename onto a directory`)
          if (realPathStillExists === false) throw new Error(`${c.name}: the directory-shaped real path vanished — the rename must have refused, not removed it`)
          if (tmpBytes !== null && normRecord(parseOrNull(tmpBytes)) === normRecord(parseOrNull(preBytes))) {
            throw new Error(`${c.name}: the staging tmp must never be parsed as the record (§2.3 item 4(c))`)
          }
        } else {
          if (normRecord(parseOrNull(realBytes)) !== normRecord(parseOrNull(preBytes))) {
            throw new Error(`${c.name}: the real path's record is not byte-identical to the pre-write record (${bytesSnapshot(preBytes)} → ${bytesSnapshot(realBytes)}) — I-7`)
          }
        }
        if (tmpBytes !== null && normRecord(parseOrNull(tmpBytes)) === normRecord(parseOrNull(realBytes))) {
          throw new Error(`${c.name}: the tmp path's bytes are being read as the record — a stale tmp is never parsed as the record (§2.3 item 4(c))`)
        }
      })
      void preRead
      void pre
    }
    // (5) THE NO-TMP-AFTER CONTROL.
    {
      const { store, path } = await makeStore()
      probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'ok' }), 'no-tmp control')
      drive('P-O2-IM-2', '5 · a successful persist leaves NO tmp', () => {
        if (store.lastWriteReceipt()?.status !== 'committed') throw new Error('the no-tmp control did not commit')
        if (hooks.log.some((l) => l.startsWith('rename:'))) {
          /* the rename DID run; the residue check is the filesystem below */
        }
      })
      if (await exists(`${path}.tmp`)) {
        const r = rowById('P-O2-IM-2')
        r.held -= 1
        r.broken += 1
        r.failure = 'attempt 5: a successful persist left a `${path}.tmp` (§2.3 item 4(a))'
      }
    }
    // (6) THE STALE TMP THAT NAMES A DIRECTORY — `set()` refuses, never throws.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      await mkdir(`${path}.tmp`, { recursive: true })
      resetFsLog()
      const receipt = assertNoThrow(() => store.set({ token: 'x' }), '6 · the directory-shaped stale tmp: set()')
      drive('P-O2-IM-2', '6 · the stale tmp that names a DIRECTORY — refused, never a throw', () => {
        if ((receipt as SecurityWriteReceipt).status !== 'refused') throw new Error('the directory-shaped stale tmp did not refuse (§2.3 item 4(b))')
        if (store.lastWriteReceipt()?.status !== 'refused') throw new Error('the receipt is not the refused form')
        if (snapshot(asRecord(store.get())) !== snapshot(pre)) throw new Error('the record moved on the tmp-shape refusal')
      })
      if (normRecord(parseOrNull(await rawBytes(path))) !== normRecord(parseOrNull(preBytes))) {
        const r = rowById('P-O2-IM-2')
        r.held -= 1
        r.broken += 1
        r.failure = 'attempt 6: the real path’s bytes moved on the stale-tmp refusal'
      }
    }
    // (7) THE WRITABLE-PATH CONTROL THAT LANDS THE CANDIDATE.
    {
      const { store, path } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'lands' }), '7 · the writable control')
      const realBytes = await rawBytes(path)
      drive('P-O2-IM-2', '7 · the writable-path control lands the candidate', () => {
        if (snapshot(asRecord(store.get())) !== snapshot(expectedPost(pre, { token: 'lands' }))) throw new Error('the writable control did not land the candidate')
        if (bytesSnapshot(realBytes) !== snapshot(expectedPost(pre, { token: 'lands' }))) throw new Error('the writable control’s bytes are not the candidate')
      })
    }
    expect(results.find((r) => r.id === 'P-O2-IM-2')?.attempts, 'P-O2-IM-2 executes EXACTLY its declared 7 attempts (§5.6.1: 4 × 1 + 3)').toBe(7)
  })
})

/* ------------------------------------------------------------------ *
 * REG-5 · `P-TP-2` — RECEIPT AND NEVER-THROWS TOTALITY (16)           *
 * ------------------------------------------------------------------ */

runRow('P-TP-2', 'P-TP', 'S-SS-RCPT-1', 16, () => {
  it('§5.6.1 P-TP-2 (S-SS-RCPT-1) · 4 attempt classes × 2 surfaces × 2 assertions — the store’s `lastWriteReceipt()` and the SET response’s recorded `write` carrier', async () => {
    const mainSrc = await readFile(SRC('main', 'main.ts'), 'utf8')
    const setHandler = /ipcMain\.handle\(IPC_SECURITY_SET[\s\S]*?\n  \}\)/.exec(mainSrc)?.[0] ?? ''
    const carrierHasWrite = /\{\s*\.\.\.securityStore\.set\(patch\),\s*write:\s*securityStore\.lastWriteReceipt\(\)\s*\}/.test(setHandler)
    const classes: { name: string; run: (s: SecurityStore) => void; want: 'committed' | 'refused' }[] = [
      { name: 'class A commit', run: (s) => { s.set({ token: 'ok' }) }, want: 'committed' },
      { name: 'class B admission refusal', run: (s) => { s.set({ token: BigInt(7) as never }) }, want: 'refused' },
      { name: 'class C pre-rename refusal (tmp-write)', run: (s) => { armTmpWriteFailure(); s.set({ token: 'x' }) }, want: 'refused' },
      { name: 'class D non-object patch', run: (s) => { s.set(null as never) }, want: 'refused' },
    ]
    for (const c of classes) {
      const { store } = await makeStore()
      const coldReceipt = store.lastWriteReceipt() // the ordered PRE-reading: null IFF no attempt has occurred (PAR-10)
      probe(store)
      for (const surface of ['1 · the store’s lastWriteReceipt()', '2 · the SET response’s `write` member'] as const) {
        for (const assertion of ['a · the receipt is a declared closed form', 'b · no declared member threw'] as const) {
          drive('P-TP-2', `${c.name} × surface ${surface} × ${assertion}`, () => {
            let threw: string | null = null
            try {
              c.run(store)
            } catch (e) {
              threw = (e as Error).message
            }
            // the ordered pre-reading of `null` rides INSIDE the commit class's
            // surface-1 attempt ("stays inside that attempt's term", §5.6.1 row 5).
            if (c.name.startsWith('class A') && surface.startsWith('1') && assertion.startsWith('a')) {
              if (coldReceipt !== null) throw new Error(`a COLD store answered ${JSON.stringify(coldReceipt)} before the first attempt — null IFF no attempt has occurred (PAR-10)`)
            }
            if (assertion.startsWith('b')) {
              if (threw !== null) throw new Error(`${c.name}: a declared member THREW (${threw}) — I-4/P-TP-2`)
              return
            }
            if (threw !== null) throw new Error(`${c.name}: a declared member THREW (${threw}) — the receipt could not be read`)
            if (surface.startsWith('1')) {
              assertReceiptShape(store.lastWriteReceipt(), c.name)
              if (store.lastWriteReceipt()?.status !== c.want) throw new Error(`${c.name}: the store answered ${JSON.stringify(store.lastWriteReceipt())}, expected ${c.want}`)
              return
            }
            // surface 2 — the CHANNEL CARRIER, recorded and NOT changed (§4.4 item 1:
            // a read-only static census with a declared limit, never a claim that this
            // unit changed the carrier).
            if (!carrierHasWrite) throw new Error('the SET response record no longer carries the additive `write` member from `lastWriteReceipt()` (§0A item 5: a change to a carrier IS a forbidden diff)')
            if (!/const updated = \{\s*\.\.\.securityStore\.set\(patch\),\s*write:/.test(setHandler)) throw new Error('the SET handler’s `write` member is not the receipt of THAT attempt')
          })
        }
      }
      resetInject()
    }
    expect(results.find((r) => r.id === 'P-TP-2')?.attempts, 'P-TP-2 executes EXACTLY its declared 16 attempts (§5.6.1: 4 × 2 × 2).  The `null`-before-first-attempt pre-reading rides INSIDE the class-A surface-1 reading (row 5’s own words), so the row is 16 and not 17.  INSTRUMENT NOTE: surface 2 is read as a STATIC CENSUS of the SET response’s carrier (§4.4 item 1: the carriers are recorded, never changed), not driven through IPC — the spec’s "driven at the channel" cannot be reached in-process without booting main.ts, and the row declares that limit rather than projecting a value.').toBe(16)
  })
})

/* ------------------------------------------------------------------ *
 * REG-6 · `P-M-SM-2` — THE RECORD-ADVANCE ORDERING (2)                *
 * ------------------------------------------------------------------ */

runRow('P-M-SM-2', 'P-SM', 'S-SS-ORD-1', 2, () => {
  it('§5.6.1 P-M-SM-2 (S-SS-ORD-1) · attempt (1) the ORDERED form (the assignment lives at the commit point) — the STRONGER reading; attempt (2) the observable form (declared the WEAKER form and NO substitute for (1))', async () => {
    // (1) THE ORDERED FORM — the assignment lives AT the commit point and is
    // gated on the save's OUTCOME (§2.1 item 3 step 4; §2.3 item 2: the
    // assigned-then-rolled-back shape FAILS even where the observables coincide).
    {
      const moduleSrc = await readFile(SRC('main', 'security-store.ts'), 'utf8')
      const ordered = orderedAdvanceOf(moduleSrc)
      // the persist-boundary probe: at the PRE-rename tmp fsync the staging file
      // already carries the candidate (§2.1 item 3 step 3).
      const { store, path } = await makeStore()
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'ORDERED' }), '(1) ordered form: set()')
      const stagedAtTmpFsync = hooks.fsyncTmpBytes[0] ?? ''
      const candidate = expectedPost(pre, { token: 'ORDERED' })
      drive('P-M-SM-2', '(1) the ordered form — the assignment is gated on the save, and the candidate is staged before the rename', () => {
        if (setBodyOf(moduleSrc).length === 0) {
          throw new Error('the ordered-form reading has no subject: `set(patch: …)` was not found in the module’s bytes — an un-run reading is a FAILURE (§5.6.1)')
        }
        if (!ordered.persistsBeforeAssign) {
          throw new Error(`the write path assigns the record BEFORE it saves it — the measured defect’s exact shape (§2.3 item 2: assign-then-restore FAILS, F-8); the reading is ${JSON.stringify(ordered)}`)
        }
        if (!ordered.outcomeGated) {
          throw new Error(`the record’s advance is not gated on the save’s OUTCOME — a refusal must return the PRE-WRITE record, so the assignment must sit behind the receipt’s committed answer (§2.1 item 3 step 4); reading ${JSON.stringify(ordered)}`)
        }
        if (normRecord(parseOrNull(stagedAtTmpFsync)) !== snapshot(candidate)) {
          throw new Error(`at the PRE-rename tmp fsync the staging file carries ${bytesSnapshot(stagedAtTmpFsync)}, not the candidate ${snapshot(candidate)} — the candidate must be staged before the rename (§2.1 item 3 step 3)`)
        }
      })
      void path
    }
    // (2) THE OBSERVABLE FORM — the four refusal classes read TOGETHER (the
    // record and the bytes), explicitly the WEAKER reading.
    {
      const classes: { name: string; arm: () => void }[] = [
        { name: 'admission', arm: () => resetInject() },
        { name: 'tmp-write', arm: armTmpWriteFailure },
        { name: 'tmp-fsync', arm: armTmpFsyncFailure },
        { name: 'rename', arm: armRenameFailure },
      ]
      const witnesses: string[] = []
      for (const c of classes) {
        const { store, path } = await makeStore()
        const pre = probe(store)
        c.arm()
        resetFsLog()
        assertNoThrow(() => (c.name === 'admission' ? store.set({ token: BigInt(7) as never }) : store.set({ token: 'x' })), `(2) ${c.name}: set()`)
        witnesses.push(`${c.name}: record ${snapshot(asRecord(store.get())) === snapshot(pre) ? 'pre-write' : 'MOVED'} · bytes ${bytesSnapshot(await rawBytes(path)) === snapshot(pre) ? 'pre-write' : 'MOVED'}`)
      }
      drive('P-M-SM-2', '(2) the observable form over the four refusal classes (the WEAKER reading — no substitute for (1))', () => {
        const moved = witnesses.filter((w) => w.includes('MOVED'))
        if (moved.length > 0) throw new Error(`the observable form reddens: ${moved.join(' | ')} — the record and the bytes must agree at the pre-write value`)
      })
    }
    expect(results.find((r) => r.id === 'P-M-SM-2')?.attempts, 'P-M-SM-2 executes EXACTLY its declared 2 attempts (§5.6.1: 1 + 1)').toBe(2)
  })
})

/* ------------------------------------------------------------------ *
 * REG-7 · `P-O3-IM-2` — THE READ SURFACE'S DETACHMENT AT DEPTH (8)    *
 * ------------------------------------------------------------------ */

runRow('P-O3-IM-2', 'P-IM', 'S-SS-CLONE-1', 8, () => {
  it('§5.6.1 P-O3-IM-2 (S-SS-CLONE-1) · 3 members (get · lastWriteReceipt · set’s return) × 2 readings (identity · mutation-visibility), + the deep/prototype reading, + the detector’s POSITIVE CONTROL — 8 attempts', async () => {
    const { store } = await makeStore()
    const pre = probe(store)
    // member 1 — get() (commit path).
    {
      const a = store.get()
      const b = store.get()
      drive('P-O3-IM-2', 'member get() · identity', () => {
        if ((a as unknown) === (b as unknown)) throw new Error('get() answered the SAME top-level object twice (§2.5 items 1/3)')
        assertNoAliasing(a, b, 'get() × get()')
      })
      drive('P-O3-IM-2', 'member get() · mutation-visibility', () => {
        const copy = asRecord(store.get())
        const enabled = copy.enabled as string[]
        enabled.push('module')
        enabled[0] = 'pwned'
        ;(copy as Record<string, unknown>).token = 'pwned'
        const next = store.get()
        if (next.token === 'pwned' || (next.enabled as string[]).includes('pwned') || (next.enabled as string[]).includes('module')) {
          throw new Error(`a holder’s mutation of get()'s return is VISIBLE on the next read (${snapshot(asRecord(next))}) — §2.5 item 1`)
        }
      })
    }
    // member 2 — lastWriteReceipt() (the MEASURED defect: the same object twice).
    {
      const r1 = store.lastWriteReceipt()
      const r2 = store.lastWriteReceipt()
      drive('P-O3-IM-2', 'member lastWriteReceipt() · identity', () => {
        if (r1 === r2) throw new Error('two consecutive lastWriteReceipt() calls answered the SAME object (a === b) — the measured SC-E-07 defect, §2.5 item 4(b)')
        assertReceiptShape(r1, 'lastWriteReceipt() identity')
        assertReceiptShape(r2, 'lastWriteReceipt() identity')
        if (!sameVal((asRecord(r1)).status, (asRecord(r2)).status)) throw new Error('the two receipt copies are not deep-equal')
      })
      drive('P-O3-IM-2', 'member lastWriteReceipt() · mutation-visibility (on the REFUSAL path — the strongest form)', () => {
        const s2 = createSecurityStore({ path: join(baseDir, `${seq++}`, 'provident-security.json') })
        s2.set({ token: 'any' })
        const refusedPath = s2.lastWriteReceipt()
        assertReceiptShape(refusedPath, 'the refusal witness')
        if (refusedPath?.status !== 'committed') {
          /* a committed witness still exercises the mutation reading below */
        }
        const holder = s2.lastWriteReceipt() as unknown as { status: string; reason?: string }
        delete holder.reason
        holder.status = 'pwned'
        const next = s2.lastWriteReceipt()
        if (next === null) throw new Error('lastWriteReceipt() answered null after an attempt (PAR-10)')
        if ((next as Record<string, unknown>).status === 'pwned' || !('status' in next)) {
          throw new Error(`a holder’s mutation of the returned receipt REWROTE the tier’s own object (${JSON.stringify(next)}) — §2.5 item 4(b): the tier’s own receipt object is NEVER handed out`)
        }
      })
    }
    // member 3 — set()'s return.
    {
      const out1 = store.set({ token: 'SETRET' })
      const out2 = store.set({ token: 'SETRET2' })
      drive('P-O3-IM-2', 'member set()’s return · identity', () => {
        if ((out1 as unknown) === (out2 as unknown)) throw new Error('set() answered the SAME top-level object twice (§2.5 items 1/3)')
        assertNoAliasing(out1, out2, 'set() × set()')
        assertNoAliasing(out1, store.get(), 'set()’s return × get()')
      })
      drive('P-O3-IM-2', 'member set()’s return · mutation-visibility', () => {
        const copy = asRecord(store.get())
        ;(copy.enabled as string[]).push('module')
        copy.maxJournalLength = 999
        const next = store.get()
        if ((next.enabled as string[]).includes('module') || next.maxJournalLength === 999) {
          throw new Error('a holder’s mutation of a returned record is visible on the next read')
        }
      })
    }
    // (7) THE DEEP / PROTOTYPE READING.
    drive('P-O3-IM-2', '7 · the deep/prototype reading', () => {
      const rec = asRecord(store.get())
      const proto = Object.getPrototypeOf(rec)
      if (proto !== null) throw new Error(`get()'s copy's prototype is ${proto === Object.prototype ? 'Object.prototype' : String(proto)}, not null — §0A item 4 / §2.5 item 1`)
      const enabledProto = Object.getPrototypeOf(rec.enabled as object)
      if (enabledProto !== Array.prototype) throw new Error('get()’s `enabled` copy is not an ordinary array (§2.5 item 2)')
      const receipt = store.lastWriteReceipt() as Record<string, unknown>
      if (Object.getPrototypeOf(receipt) !== Object.prototype) {
        throw new Error('the receipt copy must be a PLAIN object literal (§0A item 4) — a null-prototype receipt is the declared-inadmissible form')
      }
      const keys = Object.keys(rec).sort()
      if (keys.length !== 3 || keys[0] !== 'enabled' || keys[1] !== 'maxJournalLength' || keys[2] !== 'token') {
        throw new Error(`get()'s copy carries ${JSON.stringify(keys)} — the members are EXACTLY token · enabled · maxJournalLength (PAR-11)`)
      }
      if (snapshot(rec) === snapshot(pre)) void 0
    })
    // (8) THE DETECTOR'S POSITIVE CONTROL (§2.5 item 5).
    drive('P-O3-IM-2', '8 · the detector’s POSITIVE CONTROL', () => {
      const shared = { status: 'committed' as const }
      const sharedSubject: { lastWriteReceipt: () => unknown } = { lastWriteReceipt: () => shared }
      if (sharedSubject.lastWriteReceipt() === sharedSubject.lastWriteReceipt()) {
        // the detector (identity) FIRES — this is the wrong state it must refuse.
      } else {
        throw new Error('the identity detector did NOT fire against a subject that hands out ONE shared object — a detector that cannot fail proves nothing (§2.5 item 5)')
      }
      const live: Record<string, unknown> = { token: 'live', enabled: ['read'] }
      const aliasingSubject: { get: () => unknown } = { get: () => live }
      let firedOnAlias = false
      try {
        assertNoAliasing(aliasingSubject.get(), aliasingSubject.get(), 'control')
      } catch {
        firedOnAlias = true
      }
      if (!firedOnAlias) throw new Error('the alias detector did NOT fire against a subject whose get() hands out the SAME record (§2.5 item 5)')
      let firedOnMutation = false
      const mutatingSubject: { get: () => Record<string, unknown> } = { get: () => live }
      const holder = mutatingSubject.get()
      holder.token = 'pwned'
      if (mutatingSubject.get().token === 'pwned') firedOnMutation = true
      if (!firedOnMutation) throw new Error('the mutation-visibility detector did NOT fire against a subject that hands out a live record')
    })
    expect(results.find((r) => r.id === 'P-O3-IM-2')?.attempts, 'P-O3-IM-2 executes EXACTLY its declared 8 attempts (§5.6.1: 3 × 2 + 2)').toBe(8)
  })
})

/* ------------------------------------------------------------------ *
 * REG-8 · `P-O2-TP-1` — SET/SANITIZE TOTALITY (8)                     *
 * ------------------------------------------------------------------ */

runRow('P-O2-TP-1', 'P-TP', 'S-SS-SAN-1', 8, () => {
  it('§5.6.1 P-O2-TP-1 (S-SS-SAN-1) · the closed 8-class patch table — each asserting the post-state’s exact members, the file’s bytes, and `lastWriteReceipt()`’s declared form', async () => {
    const classes: { n: number; name: string; setup?: (s: SecurityStore) => void; patch: Record<string, unknown>; expect: (pre: Record<string, unknown>) => Record<string, unknown> }[] = [
      { n: 1, name: "groups:['code'] adds, order-preserving", patch: { groups: ['code'] }, expect: (pre) => expectedPost(pre, { groups: ['code'] }) },
      { n: 2, name: "disable:['code'] removes", setup: (s) => { s.set({ groups: ['code'] }) }, patch: { disable: ['code'] }, expect: (pre) => expectedPost(pre, { disable: ['code'] }) },
      { n: 3, name: "token:'abc' sets the string verbatim", patch: { token: 'abc' }, expect: (pre) => expectedPost(pre, { token: 'abc' }) },
      { n: 4, name: 'token:null clears', patch: { token: null }, expect: (pre) => expectedPost(pre, { token: null }) },
      { n: 5, name: "token:'' clears (the non-empty-string-or-null rule)", patch: { token: '' }, expect: (pre) => expectedPost(pre, { token: '' }) },
      { n: 6, name: 'maxJournalLength:50.7 ⇒ the floored 50', patch: { maxJournalLength: 50.7 }, expect: (pre) => expectedPost(pre, { maxJournalLength: 50 }) },
      { n: 7, name: 'maxJournalLength: 0 | -3 | NaN | null ⇒ the declared CLEAR (undefined)', patch: { maxJournalLength: NaN }, expect: (pre) => expectedPost(pre, { maxJournalLength: null }) },
      { n: 8, name: 'absent members keep the current value', patch: {}, expect: (pre) => expectedPost(pre, {}) },
    ]
    for (const c of classes) {
      const { store, path } = await makeStore()
      const pre0 = probe(store)
      c.setup?.(store)
      const pre = asRecord(store.get())
      resetFsLog()
      const out = assertNoThrow(() => store.set(c.patch), `class ${c.n}: set()`)
      const post = store.get()
      const bytes = await rawBytes(path)
      const expected = c.expect(pre)
      drive('P-O2-TP-1', `class ${c.n} · ${c.name}`, () => {
        if (snapshot(asRecord(post)) !== snapshot(expected)) {
          throw new Error(`class ${c.n}: the post-state is ${snapshot(asRecord(post))}; the landed sanitize declares ${snapshot(expected)} (§2.2 item 3)`)
        }
        if (bytesSnapshot(bytes) !== snapshot(expected)) {
          throw new Error(`class ${c.n}: the file's bytes are ${bytesSnapshot(bytes)}, not the declared post-state ${snapshot(expected)}`)
        }
        assertReceiptShape(store.lastWriteReceipt(), `class ${c.n}`)
        if (store.lastWriteReceipt()?.status !== 'committed') {
          throw new Error(`class ${c.n}: the declared-domain value was not ADMITTED (${JSON.stringify(store.lastWriteReceipt())})`)
        }
        if (c.n === 6 && post.maxJournalLength !== 50) {
          throw new Error(`class 6: a finite positive number must be Math.floor-ed (PAR-3); the cap reads ${String(post.maxJournalLength)}`)
        }
        if (c.n === 7 && post.maxJournalLength !== undefined) {
          throw new Error(`class 7: §2.2 item 3 names \`0\` a DECLARED CLEAR — the cap must be cleared (undefined), not ${JSON.stringify(post.maxJournalLength)} (the landed sanitize treats 0 as not-\`> 0\` and clears it; PAR-3: "0, -0, any negative number and null CLEAR it")`)
        }
        if (out !== undefined) void out
        void pre0
      })
    }
    // the class-7 sweep (§5.6.1 row 8's class 7 prints the four-arm arm set; the
    // row counts ONE attempt for the class, so the sweep rides inside it, and it
    // adds PAR-3's own declared boundary value `0.5` — "a positive number below
    // `1` … ADMITTED, floored to `0`, which is the declared clear").
    {
      const { store } = await makeStore()
      probe(store)
      for (const v of [0, -3, NaN, null, 0.5] as const) {
        resetFsLog()
        assertNoThrow(() => store.set({ maxJournalLength: v }), `class 7 sweep: ${String(v)}`)
        const r = store.lastWriteReceipt()
        if (r?.status !== 'committed' || store.get().maxJournalLength !== undefined) {
          const row = rowById('P-O2-TP-1')
          row.held -= 1
          row.broken += 1
          row.failure = `class 7 sweep: maxJournalLength ${String(v)} did not land the declared CLEAR (receipt ${JSON.stringify(r)}, cap ${String(store.get().maxJournalLength)}; §2.2 item 3 / PAR-3: 0 · -0 · a negative number · NaN · null · a positive number below 1 floored to 0 ALL clear)`
          break
        }
      }
      // and a positive number ≥ 1 must NOT clear (the boundary's other side).
      resetFsLog()
      assertNoThrow(() => store.set({ maxJournalLength: 3.9 }), 'class 7 sweep: 3.9')
      if (store.lastWriteReceipt()?.status !== 'committed' || store.get().maxJournalLength !== 3) {
        const row = rowById('P-O2-TP-1')
        row.held -= 1
        row.broken += 1
        row.failure = `class 7 sweep: maxJournalLength 3.9 must be ADMITTED and floored to 3, not cleared (cap ${String(store.get().maxJournalLength)}) — the boundary's other side`
      }
    }
    expect(results.find((r) => r.id === 'P-O2-TP-1')?.attempts, 'P-O2-TP-1 executes EXACTLY its declared 8 attempts (§5.6.1: 8 × 1)').toBe(8)
  })
})

/* ------------------------------------------------------------------ *
 * REG-9 · `P-O3-TP-1` — THE BOUNDARY'S STATIC CENSUS (8)              *
 * ------------------------------------------------------------------ */

runRow('P-O3-TP-1', 'P-TP', 'S-SS-CENSUS-1', 8, () => {
  it('§5.6.1 P-O3-TP-1 (S-SS-CENSUS-1) · (a) the member census · (b) the export census · (c) the two frozen file digests + the diff scope · (d) the receipt vocabulary and the store’s 16-member union', async () => {
    const { store } = await makeStore()
    const moduleSrc = await readFile(SRC('main', 'security-store.ts'), 'utf8')
    const graphSrc = await readFile(SRC('renderer', 'store-core-graph.ts'), 'utf8')
    const mainSrc = await readFile(SRC('main', 'main.ts'), 'utf8')
    const preloadSrc = await readFile(SRC('main', 'preload.ts'), 'utf8')
    const sha = (buf: string | Buffer): string => createHash('sha256').update(buf).digest('hex')

    // (a) the member census + the "a fourth value-returning member fails" control.
    drive('P-O3-TP-1', '(a) the key-list reading', () => {
      memberCensusOf(store)
      if (Object.keys(store).length !== 3) throw new Error(`the returned object has ${Object.keys(store).length} members (§2.5 item 3)`)
    })
    drive('P-O3-TP-1', '(a) the "a fourth value-returning member FAILS" control', () => {
      let fired = 0
      for (const wrong of [[...MEMBER_CENSUS, 'inspect'], MEMBER_CENSUS.slice(0, 2), ['get', 'setReceipt', 'set']]) {
        try {
          memberCensusOf(Object.fromEntries(wrong.map((k) => [k, () => undefined])))
        } catch {
          fired += 1
        }
      }
      if (fired !== 3) throw new Error(`the census detector fired on only ${fired}/3 wrong states (a 4-member shape, a 2-member shape, a renamed member) — a detector that cannot fail proves nothing (F-11)`)
    })
    // (b) the export census + the "no new name" reading.
    drive('P-O3-TP-1', '(b) the export list', () => {
      const found = [...moduleSrc.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
      const uniq = [...new Set(found)].sort()
      if (uniq.join(',') !== [...MODULE_EXPORTS].sort().join(',')) {
        throw new Error(`the module's exports are ${JSON.stringify(uniq)}; the census is EXACTLY ${JSON.stringify([...MODULE_EXPORTS].sort())} (§2.1 item 1: no new export, no rename, no removal)`)
      }
    })
    drive('P-O3-TP-1', '(b) the "no new name" reading — the extractor is not vacuous', () => {
      const mutant = moduleSrc + '\nexport function inspectStore(): void {}\n'
      const found = [...mutant.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
      if (!found.includes('inspectStore')) throw new Error('the export extractor did not detect an ADDED export name — the "no new name" reading would be vacuous')
    })
    // (c) the two file digests + the diff-scope file set.
    const refsDigest = sha(await readFile(SRC('renderer', 'store-graph-references.ts')))
    drive('P-O3-TP-1', '(c) the two frozen file digests', () => {
      const core = sha(graphSrc)
      const refs = refsDigest
      if (core !== '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450') {
        throw new Error(`src/renderer/store-core-graph.ts is ${core.slice(0, 8)}…, not the HYDRATE-1 pin 0664c52f… — §0A item 6 (a COLLISION finding)`)
      }
      if (refs !== '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657') {
        throw new Error(`src/renderer/store-graph-references.ts is ${refs.slice(0, 8)}…, not the pin 5c0c1a97… — §0A item 6`)
      }
    })
    drive('P-O3-TP-1', '(c) the diff-scope file set — the denied paths are read, not merely named', () => {
      const digest = sha('a control subject that is not the frozen module')
      if (digest === '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450') {
        throw new Error('the sha256 pin matched a different subject — the pin comparison is vacuous')
      }
      if (!/IPC_SECURITY_GET/.test(mainSrc) || !/IPC_SECURITY_SET/.test(mainSrc)) {
        throw new Error('the channel carriers (§0A item 5 — main.ts’s two IPC responses) are not readable at their declared sites')
      }
      if (!/security/.test(preloadSrc)) throw new Error('src/main/preload.ts’s `security` member set is not readable at its declared site')
      if (/unrepresentable-value|secure-refused/.test(moduleSrc)) {
        throw new Error('a second refusal token appeared in src/main/security-store.ts — §1.3 item 3 (a COLLISION finding)')
      }
      if (/export\s+function\s+representableValue/.test(moduleSrc)) {
        throw new Error('the admission predicate was EXPORTED (§2.2 item 1: module-internal, never exported)')
      }
    })
    // (d) the receipt vocabulary and the store's 16-member union.  The part's
    // TWO COUNTED READINGS are the declared pair (§5.6.1 row 9 part (d): "the
    // receipt-form list + the refusal-union membership reading"); the extractor's
    // non-vacuity sweep is a PRE-READING (this file's own control), exactly as
    // P-TP-2's `null`-before-first-attempt sweep rides inside its own term.
    const formsOf = (src: string): string[] => {
      const all = [...src.matchAll(/\{\s*status:\s*'([^']+)'(?:\s*;\s*reason:\s*'([^']+)')?\s*\}/g)].map((m) => (m[2] === undefined ? m[1] : `${m[1]}:${m[2]}`))
      return [...new Set(all)]
    }
    const realForms = formsOf(moduleSrc)
    const mutantForms = formsOf(/status:\s*'refused';\s*reason:\s*'write-failed'/.test(moduleSrc) ? moduleSrc.replace("reason: 'write-failed'", "reason: 'unrepresentable-value'") : moduleSrc)
    drive('P-O3-TP-1', '(d) the receipt-form list', () => {
      if (!realForms.includes('committed') || !realForms.includes('refused:write-failed')) {
        throw new Error(`the declared receipt forms read ${JSON.stringify(realForms)} — the closed two-form union with ONE reason token is required (§2.1 item 7)`)
      }
      for (const f of realForms) {
        const [status, reason] = f.split(':')
        if (!RECEIPT_TOKENS.includes(status)) throw new Error(`a third receipt status appeared: ${status}`)
        if (reason !== undefined && !RECEIPT_REASONS.includes(reason)) throw new Error(`a second reason token appeared: ${reason}`)
      }
      if (RECEIPT_TOKENS.length !== 2 || RECEIPT_REASONS.length !== 1) throw new Error('the receipt vocabulary is not the closed 2 × 1 form')
      // the control rides IN this reading: the extractor must FIRE on a mutated
      // copy carrying a second reason token, or the reading is vacuous.
      if (mutantForms.includes('unrepresentable-value') === false && !mutantForms.includes('refused:unrepresentable-value')) {
        throw new Error('the receipt-form extractor did not observe a SECOND reason token on a mutated copy — the closed-vocabulary reading would be vacuous')
      }
    })
    drive('P-O3-TP-1', '(d) the refusal-union membership reading', () => {
      const tokens = unionTokensOf(graphSrc)
      if (tokens.length !== UNION_ARITY) {
        throw new Error(`the store's refusal union carries ${tokens.length} tokens (${JSON.stringify(tokens)}); it is UNMOVED at ${UNION_ARITY} = 8 + 5 + 3 (§0A item 6 / docs/specs/store-core-graph.md §2.1's block annotation)`)
      }
      if (tokens.includes('write-failed')) {
        throw new Error("'write-failed' became a member of the store's 16-member refusal union — a COLLISION finding (§2.1 item 7 / the D-GATE row's clause (2))")
      }
      const mutant = graphSrc.replace("'durability-inversion'", "'durability-inversion' | 'write-failed'")
      const mutantTokens = unionTokensOf(mutant)
      if (!mutantTokens.includes('write-failed')) {
        throw new Error('the union-membership extractor did not detect an ADDED token — the reading would be vacuous')
      }
      if (mutantTokens.length === tokens.length) throw new Error('the union extractor produced the same arity for a mutated union — the arity reading would be vacuous')
    })
    expect(results.find((r) => r.id === 'P-O3-TP-1')?.attempts, "P-O3-TP-1 executes EXACTLY its declared 8 attempts (§5.6.1: 4 parts × 2 readings).  INSTRUMENT NOTE: the module's returned object answers its keys in the source-declaration order ['get','set','lastWriteReceipt'] while §2.5 item 3 declares ['get','lastWriteReceipt','set'] — this file reads the census as a SET (its own §2.5 item 3 words), because a source-ORDER reading is not derivable from that clause and 'the landed order' cannot be both.").toBe(8)
  })
})

/* ==========================================================================
 * THE BEHAVIOURAL ROWS (§3.1 M-1…M-7 · §3.2 F-1…F-12) — one valid/happy row
 * per reasonable data state, one fail-safe row per documented fail-state.
 * ======================================================================== */

describe('§3.1 the valid / happy states (M-1 … M-7)', () => {
  it('M-1 · a representable write-through lands and the record advances at the commit point', async () => {
    const { store, path } = await makeStore()
    resetFsLog()
    const out = store.set({ token: 'abc' })
    const bytes = await rawBytes(path)
    expect(store.lastWriteReceipt(), 'M-1 — the receipt').toEqual({ status: 'committed' })
    expect(out, 'M-1 — set() returns the record now live').toEqual({ token: 'abc', enabled: ['read', 'dispatch'], maxJournalLength: undefined })
    expect(snapshot(asRecord(store.get())), 'M-1 — get() answers the candidate').toBe(snapshot({ token: 'abc', enabled: ['read', 'dispatch'], maxJournalLength: undefined }))
    expect(bytesSnapshot(bytes), 'M-1 — the file’s bytes are the candidate').toBe(snapshot(asRecord(store.get())))
    expect(await exists(`${path}.tmp`), 'M-1 — NO `${path}.tmp` remains (§2.3 item 4(a))').toBe(false)
  })

  it('M-2 · the ordered advance across the four failure-free steps (the floored cap, the advance after the rename)', async () => {
    const { store } = await makeStore()
    probe(store)
    resetFsLog()
    store.set({ maxJournalLength: 50.7 })
    expect(store.lastWriteReceipt(), 'M-2 — committed').toEqual({ status: 'committed' })
    expect(store.get().maxJournalLength, 'M-2 — the floored cap').toBe(50)
    expect(hooks.log.filter((l) => l.startsWith('fsync:')).length, 'M-2 — the five-step body: mkdir → stage → tmp fsync → rename → dir fsync').toBe(2)
    expect(hooks.log.findIndex((l) => l.startsWith('rename:')), 'M-2 — the rename runs AFTER the staging write').toBeGreaterThan(hooks.log.findIndex((l) => l.startsWith('writeFile:')))
  })

  it('M-3 · lastWriteReceipt() hands out a detached copy — twice', async () => {
    const { store } = await makeStore()
    expect(store.lastWriteReceipt(), 'M-3 — null before the attempt').toBeNull()
    store.set({ token: 't' })
    const a = store.lastWriteReceipt()
    const b = store.lastWriteReceipt()
    expect(a === b, 'M-3 — two calls never answer the same object (§2.5 item 4(b))').toBe(false)
    expect(a, 'M-3 — the copies are deep-equal').toEqual(b)
    ;(a as unknown as { status: string }).status = 'pwned'
    expect(store.lastWriteReceipt()?.status, 'M-3 — the mutation did not move the tier').toBe('committed')
  })

  it('M-4 · get() hands out a deep detached record (no alias at any depth; the copy’s prototype is null)', async () => {
    const { store } = await makeStore()
    store.set({ token: 'deep', maxJournalLength: 7 })
    const a = asRecord(store.get())
    assertNoAliasing(a, store.get(), 'M-4 — get() × get()')
    expect(Object.getPrototypeOf(a), 'M-4 — the copy’s prototype is null (§0A item 4)').toBeNull()
    const enabled = a.enabled as string[]
    enabled.push('module')
    enabled[0] = 'pwned'
    const next = store.get()
    expect(next.enabled, 'M-4 — the mutation is invisible on the next read').toEqual(['read', 'dispatch'])
    expect(next.token, 'M-4 — and the scalar member is untouched').toBe('deep')
  })

  it('M-5 · the documented coercions still apply inside the admission’s boundary', async () => {
    const { store, path } = await makeStore()
    probe(store)
    store.set({ token: '  a  ' })
    expect(store.get().token, 'M-5 — a non-empty string is kept VERBATIM (no trim)').toBe('  a  ')
    store.set({ groups: ['code', 'code', 'nope'] })
    expect(store.get().enabled, 'M-5 — dedup + the documented five-group filter').toEqual(['read', 'code'])
    store.set({ maxJournalLength: 50.7 })
    expect(store.get().maxJournalLength, 'M-5 — floored').toBe(50)
    store.set({ token: '' })
    expect(store.get().token, 'M-5 — cleared').toBeNull()
    store.set({ maxJournalLength: 0 })
    expect(store.get().maxJournalLength, 'M-5 — the declared clear').toBeUndefined()
    store.set({ maxJournalLength: null })
    expect(store.get().maxJournalLength, 'M-5 — the declared clear').toBeUndefined()
    store.set({ token: 'kept' })
    store.set({})
    expect(store.get().token, 'M-5 — absent members keep the current value').toBe('kept')
    expect(bytesSnapshot(await rawBytes(path)), 'M-5 — every one of those landed in the file too').toBe(snapshot(asRecord(store.get())))
  })

  it('M-5b · §6 PAR-3’s one declared boundary value: a positive number below 1 floors to 0, which IS the declared clear', async () => {
    const { store } = await makeStore()
    store.set({ maxJournalLength: 0.5 })
    expect(store.lastWriteReceipt(), 'PAR-3 — ADMITTED (the alternative reading would refuse it; this spec DECLARES the landed clear)').toEqual({ status: 'committed' })
    expect(store.get().maxJournalLength, 'PAR-3 — floored to 0, which is the declared clear').toBeUndefined()
  })

  it('M-5c · §6 PAR-3: `NaN` on maxJournalLength sits in the documented clear arm and is ADMITTED (while it is unrepresentable)', async () => {
    const { store } = await makeStore()
    probe(store)
    store.set({ maxJournalLength: NaN })
    expect(store.lastWriteReceipt(), '§2.2 item 3 — the clear arm decides, not the predicate alone').toEqual({ status: 'committed' })
    expect(store.get().maxJournalLength, '§2.2 item 3 — the declared CLEAR').toBeUndefined()
  })

  it('M-6 · the read-only patch shape is admitted and keeps the record', async () => {
    const { store } = await makeStore()
    const pre = probe(store)
    const out = store.set({ token: undefined })
    expect(store.lastWriteReceipt(), 'M-6 — admitted').toEqual({ status: 'committed' })
    expect(out.token, 'M-6 — the absent marker keeps the current token').toBe(pre.token)
    expect(out.maxJournalLength, 'M-6 — and the cap is untouched').toBe(pre.maxJournalLength)
    expect(out.enabled, 'M-6 — and the enabled set is untouched').toEqual(pre.enabled)
  })

  it('M-7 · the first-run default’s boot chain — missing · corrupt · a path that IS a DIRECTORY (never a throw; the constructor writes no file)', async () => {
    const missing = await freshPath()
    const s1 = createSecurityStore({ path: missing })
    expect(s1.get(), 'M-7 — a missing file').toEqual({ token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined })
    expect(await exists(missing), 'M-7 — the constructor wrote no file (§2.1 item 2)').toBe(false)

    const corruptPath = await freshPath()
    await mkdir(dirname(corruptPath), { recursive: true })
    await writeFile(corruptPath, '{ this is not json', 'utf8')
    const s2 = createSecurityStore({ path: corruptPath })
    expect(s2.get(), 'M-7 — a corrupt file').toEqual({ token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined })

    const dirPath = await freshPath()
    await mkdir(dirPath, { recursive: true })
    const s3 = createSecurityStore({ path: dirPath })
    expect(s3.get(), 'M-7 — a path that IS a directory (EISDIR is caught)').toEqual({ token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined })
    expect((await rawBytes(JSON.stringify(dirPath))) === null, 'M-7 — the directory is still a directory').toBe(true)
  })
})

describe('§3.2 the documented fail-states (F-1 … F-12)', () => {
  it('F-1 · the headline — a refused persist rolls the record back, over the three REAL unwritable paths the spec names', async () => {
    // (i) the parent is a regular FILE.
    {
      const parent = await freshPath('a-regular-file')
      await mkdir(dirname(parent), { recursive: true })
      await writeFile(parent, 'not a directory', 'utf8')
      const path = join(parent, 'provident-security.json')
      const store = createSecurityStore({ path })
      const pre = store.get()
      const receipt = store.set({ token: 'x', maxJournalLength: 55 })
      expect(store.lastWriteReceipt(), 'F-1(i) — the receipt never claims committed').toEqual({ status: 'refused', reason: 'write-failed' })
      expect(snapshot(asRecord(store.get())), 'F-1(i) — get() answers the PRE-WRITE record member for member').toBe(snapshot(asRecord(pre)))
      expect(store.get().token, 'F-1(i) — NOT `x`').not.toBe('x')
      expect(store.get().maxJournalLength, 'F-1(i) — NOT `55`').not.toBe(55)
      expect(snapshot(asRecord(receipt)), 'F-1(i) — set()’s return is the pre-write record').toBe(snapshot(asRecord(pre)))
    }
    // (ii) the parent directory is 0500.
    {
      const dir = await freshPath('parent-0500')
      await mkdir(dir, { recursive: true })
      const path = join(dir, 'provident-security.json')
      const store = createSecurityStore({ path })
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      await chmod(dir, 0o500)
      const receipt = assertNoThrow(() => store.set({ token: 'x', maxJournalLength: 55 }), 'F-1(ii)')
      const postBytes = await rawBytes(path)
      await chmod(dir, 0o700)
      expect((receipt as SecurityWriteReceipt).status, 'F-1(ii) — refused').toBe('refused')
      expect(snapshot(asRecord(store.get())), 'F-1(ii) — the pre-write record').toBe(snapshot(pre))
      expect(bytesSnapshot(postBytes), 'F-1(ii) — the bytes unmoved').toBe(bytesSnapshot(preBytes))
    }
    // (iii) the target path IS a DIRECTORY (the LIVE class, SC-E-05's shape).
    {
      const dir = await freshPath('target-is-a-directory')
      await mkdir(dir, { recursive: true })
      const path = join(dir, 'provident-security.json')
      await mkdir(path, { recursive: true })
      const store = createSecurityStore({ path })
      const pre = store.get()
      const receipt = assertNoThrow(() => store.set({ token: 'E2-LIVE-OPERATOR-WRITE', maxJournalLength: 55 }), 'F-1(iii)')
      expect((receipt as SecurityWriteReceipt).status, 'F-1(iii) — refused (the rename onto a directory)').toBe('refused')
      expect(snapshot(asRecord(store.get())), 'F-1(iii) — the record is the pre-write record, NOT the measured E2 leak').toBe(snapshot(asRecord(pre)))
      expect(store.get().token, 'F-1(iii) — the measured defect’s exact value must not appear').not.toBe('E2-LIVE-OPERATOR-WRITE')
    }
  })

  it('F-2 · an unrepresentable value is NOT accepted (whole patch), on the exact fixtures the spec names', async () => {
    const fixtures: { label: string; patch: Record<string, unknown> }[] = [
      { label: 'maxJournalLength: Infinity', patch: { maxJournalLength: Infinity } },
      { label: 'token: BigInt(7)', patch: { token: BigInt(7) as never } },
      { label: 'token: new Map()', patch: { token: new Map() as never } },
      { label: 'token: new Date()', patch: { token: new Date(0) as never } },
      { label: 'groups: [BigInt(7)]', patch: { groups: [BigInt(7)] as never } },
      { label: 'token: (()=>{})', patch: { token: (() => 0) as never } },
      { label: 'a cyclic object on a member', patch: { maxJournalLength: CYCLIC as never } },
      { label: 'a nested cycle inside a groups array', patch: { groups: [CYCLIC] as never } },
    ]
    for (const f of fixtures) {
      const { store, path } = await makeStore()
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      resetFsLog()
      const out = assertNoThrow(() => store.set(f.patch), `F-2 ${f.label}`)
      expect(store.lastWriteReceipt(), `F-2 ${f.label} — refused, whole-patch`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(snapshot(asRecord(store.get())), `F-2 ${f.label} — the record does not move`).toBe(snapshot(pre))
      expect(snapshot(asRecord(out)), `F-2 ${f.label} — set() returns the pre-write record`).toBe(snapshot(pre))
      expect(bytesSnapshot(await rawBytes(path)), `F-2 ${f.label} — the file is untouched`).toBe(bytesSnapshot(preBytes))
      expect(fsActivity(), `F-2 ${f.label} — no tmp was created (no filesystem call at all)`).toEqual([])
      expect(await exists(`${path}.tmp`), `F-2 ${f.label} — no ${'{path}.tmp'} residue`).toBe(false)
    }
    // CONTROL: the round-trip equivalence §2.2 item 2 permits as a control — the
    // admitted/refused answer must agree with "survives a JSON round trip and
    // preserves every member" for every value that does not throw (§2.2 item 2).
    for (const spec of TABLE_16) {
      if (spec.v === undefined) continue
      let roundTrip = true
      try {
        const s = JSON.stringify(spec.v)
        roundTrip = JSON.parse(s) !== undefined
      } catch {
        roundTrip = false
      }
      if (spec.v === CYCLIC) {
        expect(roundTrip, 'CONTROL (C-7) — a JSON round trip THROWS on the cycle, which is exactly why §2.2 item 2 forbids it as the implementation').toBe(false)
        expect(REPRESENTABLE(spec.v), 'CONTROL (C-7) — and the walk answers NOT representable').toBe(false)
      }
      if (spec.label === 'safeString' || spec.label === 'safeNumber' || spec.label === 'safeArray') {
        expect(roundTrip, `CONTROL (C-7) — ${spec.label} survives the round trip`).toBe(true)
        expect(REPRESENTABLE(spec.v), `CONTROL (C-7) — ${spec.label} is representable`).toBe(true)
      }
    }
    // CONTROL (C-6): the driver-side predicate against a WRONG state.
    expect(REPRESENTABLE(Object.prototype), 'CONTROL (C-6) — a hostile input the predicate must refuse').toBe(false)
  })

  it('F-3 · the `Infinity` divergence is CLOSED — neither memory nor file ever carries a non-finite cap', async () => {
    const { store, path } = await makeStore()
    const pre = probe(store)
    store.set({ token: 'kept', maxJournalLength: 42 })
    const before = store.get()
    const bytesBefore = await rawBytes(path)
    store.set({ maxJournalLength: Infinity })
    expect(store.lastWriteReceipt(), 'F-3 — refused').toEqual({ status: 'refused', reason: 'write-failed' })
    expect(store.get().maxJournalLength, 'F-3 — the cap is whatever it was (never <Infinity>)').toBe(42)
    expect(Number.isFinite(store.get().maxJournalLength as number), 'F-3 — the record carries a finite cap').toBe(true)
    const bytesAfter = await rawBytes(path)
    expect(bytesAfter, 'F-3 — the file’s bytes are unmoved: no `null` cap was injected by the refusal').toBe(bytesBefore)
    expect(bytesAfter?.includes('"maxJournalLength": 42'), 'F-3 — the file still carries 42, not a null injected by the refusal').toBe(true)
    expect(snapshot(asRecord(store.get())), 'F-3 — live equals durable').toBe(snapshot(asRecord(before)))
    void pre
  })

  it('F-4 · a prototype-poisoned patch value does not enter, and cannot pollute', async () => {
    const { store, path } = await makeStore()
    const pre = probe(store)
    const preBytes = await rawBytes(path)
    const out = assertNoThrow(() => store.set({ token: POISONED as never }), 'F-4')
    expect(store.lastWriteReceipt(), 'F-4 — whole-patch refusal (an ordinary object is not a string ⇒ the declared-domain refusal)').toEqual({ status: 'refused', reason: 'write-failed' })
    expect((Object.prototype as unknown as Record<string, unknown>).polluted, 'F-4 — Object.prototype is UNPOLLUTED').toBeUndefined()
    expect(({} as Record<string, unknown>).polluted, 'F-4 — and no ordinary object inherited a `polluted` member').toBeUndefined()
    expect(snapshot(asRecord(store.get())), 'F-4 — the record untouched').toBe(snapshot(pre))
    expect(bytesSnapshot(await rawBytes(path)), 'F-4 — the file untouched').toBe(bytesSnapshot(preBytes))
    expect(snapshot(asRecord(out)), 'F-4 — set() returns the pre-write record').toBe(snapshot(pre))
    // CONTROL: the poisoned literal really DOES carry an own enumerable key (so
    // the drive above is about a live hazard, not a vacuous literal).
    expect(Object.keys(POISONED), 'CONTROL (C-8) — the fixture carries the own enumerable `__proto__` key §2.2 item 1 names').toEqual(['__proto__'])
    expect(REPRESENTABLE(POISONED), 'CONTROL (C-8) — and the value itself IS representable (an own data property, not a prototype assignment)').toBe(true)
  })

  it('F-5 · a non-object patch is REFUSED, never thrown (the landed `set(null)` TypeError is CLOSED)', async () => {
    const bad: { label: string; v: unknown }[] = [
      { label: 'null', v: null },
      { label: 'undefined', v: undefined },
      { label: '7', v: 7 },
      { label: "'x'", v: 'x' },
      { label: '()=>{}', v: () => 0 },
      { label: 'Symbol()', v: Symbol('p') },
      { label: 'an ARRAY (a non-plain object)', v: [] },
      { label: 'a BigInt', v: BigInt(7) },
    ]
    for (const b of bad) {
      const { store, path } = await makeStore()
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      resetFsLog()
      const out = assertNoThrow(() => store.set(b.v as never), `F-5 set(${b.label})`)
      expect(store.lastWriteReceipt(), `F-5 set(${b.label}) — the whole-patch refusal`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(snapshot(asRecord(store.get())), `F-5 set(${b.label}) — the record unmoved`).toBe(snapshot(pre))
      expect(bytesSnapshot(await rawBytes(path)), `F-5 set(${b.label}) — the bytes unmoved`).toBe(bytesSnapshot(preBytes))
      expect(fsActivity(), `F-5 set(${b.label}) — no filesystem call`).toEqual([])
      expect(snapshot(asRecord(out)), `F-5 set(${b.label}) — returns the pre-write record`).toBe(snapshot(pre))
    }
  })

  it('F-6 · the receipt is never a third token and never `undefined`', async () => {
    const { store } = await makeStore()
    store.set({ token: 'a' })
    const commit = store.lastWriteReceipt() as Record<string, unknown>
    expect(commit.status, 'F-6 — exactly one of the two closed tokens').toBe('committed')
    expect('reason' in commit, 'F-6 — NO `reason` on a commit').toBe(false)
    expect(Object.keys(commit), 'F-6 — no third member').toEqual(['status'])
    store.set({ token: BigInt(7) as never })
    const refusal = store.lastWriteReceipt() as Record<string, unknown>
    expect(refusal.status).toBe('refused')
    expect(refusal.reason, "F-6 — EXACTLY 'write-failed'").toBe('write-failed')
    expect(Object.keys(refusal).sort(), 'F-6 — exactly status+reason, no `dropped`, no `undefined` reason').toEqual(['reason', 'status'])
    expect(refusal, 'F-6 — never `null` after an attempt').not.toBeNull()
    // CONTROL (C-3): the shape detector refuses a third status and an extra member.
    expect(() => assertReceiptShape({ status: 'unrepresentable-value' } as never, 'control'), 'CONTROL (C-3) — a third status').toThrow()
    expect(() => assertReceiptShape({ status: 'committed', dropped: ['x'] } as never, 'control'), 'CONTROL (C-3) — an extra member').toThrow()
    expect(() => assertReceiptShape({ status: 'refused' } as never, 'control'), 'CONTROL (C-3) — a refusal with no reason').toThrow()
    expect(() => assertReceiptShape(null, 'control'), 'CONTROL (C-3) — a null receipt after an attempt').toThrow()
  })

  it('F-7 · a throw from any declared member FAILS the totality rows (the hostile filesystem and the hostile patch)', async () => {
    // the hostile filesystem: a tmp that names a DIRECTORY.
    {
      const { store, path } = await makeStore()
      probe(store)
      await mkdir(`${path}.tmp`, { recursive: true })
      expect(() => store.set({ token: 'x' }), 'F-7 — a directory-shaped stale tmp must not make set() throw (the G3 F-11 host fix)').not.toThrow()
      expect(store.lastWriteReceipt()?.status, 'F-7 — the refused receipt is the answer').toBe('refused')
    }
    // the hostile filesystem: a rename onto a directory.
    {
      const dir = await freshPath('rename-onto-dir')
      await mkdir(dir, { recursive: true })
      const path = join(dir, 'provident-security.json')
      await mkdir(path, { recursive: true })
      const store = createSecurityStore({ path })
      expect(() => store.set({ token: 'x' }), 'F-7 — a rename onto a directory must not throw').not.toThrow()
      expect(store.lastWriteReceipt()?.status, 'F-7 — refused').toBe('refused')
    }
    // the hostile filesystem: a directory at boot.
    {
      const dir = await freshPath('boot-dir')
      await mkdir(dir, { recursive: true })
      expect(() => createSecurityStore({ path: dir }), 'F-7 — the boot read onto a directory must not throw').not.toThrow()
    }
    // the hostile patch: a hostile proxy whose property reads throw.
    {
      const { store } = await makeStore()
      const hostile = new Proxy(
        {},
        {
          get(): never {
            throw new Error('hostile proxy: property read')
          },
          ownKeys(): never {
            throw new Error('hostile proxy: ownKeys')
          },
          getOwnPropertyDescriptor(): never {
            throw new Error('hostile proxy: descriptor')
          },
        },
      )
      expect(() => store.set({ token: hostile as never }), 'F-7 — a throwing proxy on a member must not throw out of set() (§2.2 item 1: "hostile proxies included")').not.toThrow()
      expect(store.lastWriteReceipt()?.status, 'F-7 — the refusal is the answer').toBe('refused')
      expect(() => store.set(hostile as never), 'F-7 — a throwing proxy AS the patch must not throw').not.toThrow()
    }
    // the hostile patch: a frozen patch object.
    {
      const { store } = await makeStore()
      const frozen = Object.freeze({ token: 'frozen' })
      expect(() => store.set(frozen), 'F-7 — a frozen patch must not throw').not.toThrow()
      expect(store.lastWriteReceipt()?.status, 'F-7 — admitted (a frozen plain object with a representable member)').toBe('committed')
    }
  })

  it('F-8 · a live record advanced past a refusal FAILS the rollback invariant (the ordered form, not the weaker observable)', async () => {
    const moduleSrc = await readFile(SRC('main', 'security-store.ts'), 'utf8')
    const ordered = orderedAdvanceOf(moduleSrc)
    expect(
      setBodyOf(moduleSrc).length,
      'F-8 — the ordered-form reading took its reading (an un-run reading is a FAILURE)',
    ).toBeGreaterThan(0)
    expect(
      ordered.persistsBeforeAssign,
      'F-8 — the landed :138-139 shape assigns the record BEFORE persist() runs; §2.3 item 2 makes that FAILING even where the observables coincide',
    ).toBe(true)
    expect(
      ordered.outcomeGated,
      'F-8 — the advance must be gated on the save’s outcome (a refusal returns the PRE-WRITE record)',
    ).toBe(true)
    // the observable half, read on the refusal path with a REAL unwritable target
    // (the target IS a directory — the class the spec names).
    const dir = await freshPath('f8-target-dir')
    await mkdir(dir, { recursive: true })
    const path = join(dir, 'provident-security.json')
    await mkdir(path, { recursive: true })
    const store = createSecurityStore({ path })
    const pre = store.get()
    store.set({ token: 'x', maxJournalLength: 55 })
    expect(store.lastWriteReceipt(), 'F-8 — refused').toEqual({ status: 'refused', reason: 'write-failed' })
    expect(snapshot(asRecord(store.get())), 'F-8 — the live record must equal the durable record at every instant').toBe(snapshot(asRecord(pre)))
  })

  it('F-9 · an admission refusal that touches the filesystem FAILS', async () => {
    const { store, path } = await makeStore()
    probe(store)
    resetFsLog()
    store.set({ token: new Map() as never })
    expect(fsActivity(), 'F-9 — no writeFileSync and no renameSync is called for a patch refused at admission').toEqual([])
    expect(await exists(`${path}.tmp`), 'F-9 — no `${path}.tmp` may be created').toBe(false)
    expect(store.lastWriteReceipt()?.status, 'F-9 — refused').toBe('refused')
  })

  it('F-10 · a shared receipt, or a get() alias, FAILS the clone property', async () => {
    const { store } = await makeStore()
    store.set({ token: 't' })
    expect(store.lastWriteReceipt() === store.lastWriteReceipt(), 'F-10 — a === b must be false across two calls (the measured SC-E-07 defect)').toBe(false)
    const mine = asRecord(store.get())
    ;(mine.enabled as string[]).push('module')
    expect(store.get().enabled, 'F-10 — a holder’s mutation must be invisible on the next read').not.toContain('module')
    assertNoAliasing(store.get(), store.lastWriteReceipt(), 'F-10 — no aliasing between the record and the receipt')
  })

  it('F-11 · a fourth value-returning member, or a renamed one, FAILS the census', async () => {
    const { store } = await makeStore()
    expect(memberCensusOf(store), 'F-11 — set-equal to the three declared members, in the landed order').toEqual(['get', 'lastWriteReceipt', 'set'])
    expect(Object.keys(store).length, 'F-11 — a fourth value-returning member FAILS').toBe(3)
    const moduleSrc = await readFile(SRC('main', 'security-store.ts'), 'utf8')
    const found = [...moduleSrc.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
    expect([...new Set(found)].sort(), 'F-11 — the export census is UNMOVED at four names (§2.1 item 1)').toEqual([...MODULE_EXPORTS].sort())
  })

  it('F-12 · an edit to a frozen or out-of-scope file FAILS (a COLLISION finding) — the frozen digests, read as EVIDENCE', async () => {
    const sha = (b: string | Buffer): string => createHash('sha256').update(b).digest('hex')
    expect(sha(await readFile(SRC('renderer', 'store-core-graph.ts'))), 'F-12 — store-core-graph.ts').toBe('0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450')
    expect(sha(await readFile(SRC('renderer', 'store-graph-references.ts'))), 'F-12 — store-graph-references.ts').toBe('5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657')
    const graphSrc = await readFile(SRC('renderer', 'store-core-graph.ts'), 'utf8')
    const tokens = unionTokensOf(graphSrc)
    expect(tokens.length, 'F-12 — the store’s 16-member refusal union is UNMOVED (8 held + 5 + 3, §2.1’s block annotation)').toBe(16)
    expect(tokens.includes('write-failed'), 'F-12 — and `write-failed` is NOT a member (§0A item 1)').toBe(false)
    expect(await readFile(SRC('shared', 'types.ts'), 'utf8'), 'F-12 — src/shared/types.ts is readable at its declared site').toBeTruthy()
    // CONTROL (C-5): the pin comparison is not a tautology.
    expect(sha('a control subject'), 'CONTROL (C-5) — a different subject does not match a frozen pin').not.toBe('0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450')
  })

  it('§2.4 R-5 · the post-commit directory-fsync failure is COMMITTED, never a rollback (its own row)', async () => {
    const { store, path } = await makeStore()
    const pre = probe(store)
    armDirFsyncFailure()
    resetFsLog()
    const out = assertNoThrow(() => store.set({ token: 'R5' }), 'R-5')
    const candidate = expectedPost(pre, { token: 'R5' })
    expect(store.lastWriteReceipt(), 'R-5 — committed (§0A item 2)').toEqual({ status: 'committed' })
    expect(snapshot(asRecord(store.get())), 'R-5 — the record advanced').toBe(snapshot(candidate))
    expect(bytesSnapshot(await rawBytes(path)), 'R-5 — live equals durable').toBe(snapshot(candidate))
    expect(snapshot(asRecord(out)), 'R-5 — set() returns the record now live').toBe(snapshot(candidate))
    expect(hooks.fsyncCalls, 'R-5 — the dir fsync was actually reached (both fsyncs ran)').toBe(2)
  })
})

/* ==========================================================================
 * THE REGISTER’S OWN SUMMARY ROW — the totals printed WITH THEIR TERMS, the
 * caps, the stop rule, and the UN-RUN rule (§5.6.1: an un-run row is a
 * FAILURE, never a pass).
 * ======================================================================== */

describe('§5.6.1 THE REGISTER — the executed summary (118 = 51+12+6+7+16+2+8+8+8)', () => {
  it('REGISTER-EXEC · the nine typed rows execute deterministically and carry id · type · strategy · attempts-run · held · broken', () => {
    const ids = ['P-O2-IM-1', 'P-O1-TP-1', 'P-M-SM-1', 'P-O2-IM-2', 'P-TP-2', 'P-M-SM-2', 'P-O3-IM-2', 'P-O2-TP-1', 'P-O3-TP-1']
    expect(results.map((r) => r.id), 'the register runs ALL nine rows, in register order (an un-run row is a FAILURE)').toEqual(ids)
    expect(results.filter((r) => r.ran).length, 'no row was skipped by the stop rule').toBe(9)
    for (const r of results) {
      expect(r.attempts, `${r.id} executed its declared term (${r.declared})`).toBe(r.declared)
      expect(r.strategy, `${r.id} carries its strategy id`).toMatch(/^S-SS-[A-Z]+-\d+$/)
    }
  })

  it('REGISTER-TERMS · the declared total is 118 = its own nine terms, with the caps and the type subtotals', () => {
    const declared = results.map((r) => r.declared)
    expect(declared, 'the nine terms, in register order').toEqual([51, 12, 6, 7, 16, 2, 8, 8, 8])
    const total = declared.reduce((a, b) => a + b, 0)
    expect(total, '118 = 51 + 12 + 6 + 7 + 16 + 2 + 8 + 8 + 8 (a total quoted without its terms is a review finding)').toBe(118)
    expect(declared.every((t) => t <= 100), '≤100 attempts per row').toBe(true)
    expect(Math.max(...declared), 'the largest row is 51 ≤ 100 (headroom 49)').toBe(51)
    expect(total <= 400, '118 ≤ 400 (headroom 282)').toBe(true)
    const subtotal = (type: string): number => results.filter((r) => r.type === type).reduce((a, r) => a + r.declared, 0)
    expect(subtotal('P-IM'), 'P-IM = 51 + 7 + 8').toBe(66)
    expect(subtotal('P-SM'), 'P-SM = 6 + 2').toBe(8)
    expect(subtotal('P-TP'), 'P-TP = 12 + 16 + 8 + 8').toBe(44)
    expect(subtotal('P-IM') + subtotal('P-SM') + subtotal('P-TP'), '66 + 8 + 44 = 118 ✓').toBe(118)
  })

  it('REGISTER-RED · the register’s rows redden against the landed bytes by construction (§4.3 item 2) and report their held/broken figures', () => {
    // §4.3 item 2, exact: "A red run whose failing set is EMPTY is itself a
    // finding — the register's rows MUST fail first against today's module (the
    // ordered-advance rows, the admission rows, and the receipt-detachment row
    // all redden on the landed bytes BY CONSTRUCTION)".  The sibling register's
    // summary asserts the MIRROR of this (`rowsHeld === 22`); this unit's red set
    // asserts the red direction: EVERY one of the nine rows must CARRY a broken
    // reading, and the nine rows' broken readings are named with their figures.
    for (const r of results) {
      expect(r.held + r.broken, `${r.id}: held + broken === attempts-run`).toBe(r.attempts)
      expect(r.broken, `${r.id} must carry at least one BROKEN reading against the landed bytes (§4.3 item 2) — its row reads ${r.held} held / ${r.broken} broken`).toBeGreaterThan(0)
    }
    expect(results.reduce((a, r) => a + r.broken, 0), 'the nine rows’ broken readings, summed (MEASURED against the landed bytes, in register order: 29 + 9 + 4 + 2 + 5 + 2 + 3 + 1 + 1 = 56)').toBe(56)
    expect(results.reduce((a, r) => a + r.held, 0), 'the nine rows’ held readings, summed (held + broken = 118: 62 + 56)').toBe(62)
    expect(results.length, 'the register is NINE rows, a signal and not a cap (AGENTS.md item 11(f))').toBe(9)
  })

  it('REGISTER-CONTROL · the register’s own broken-detector is not vacuous — a wrong property is REPORTED broken, a right one is reported held', () => {
    // The detector (`drive`) must FAIL for a falsified property and HOLD for a
    // satisfied one, or `broken > 0` above would prove nothing.
    const probeRow = { id: '__CONTROL__', type: 'P-TP' as const, strategy: 'S-SS-CTL-1', declared: 2, attempts: 0, held: 0, broken: 0, failure: null as string | null, ran: true }
    results.push(probeRow)
    drive('__CONTROL__', 'ctl·held', () => undefined)
    drive('__CONTROL__', 'ctl·broken', () => {
      throw new Error('a deliberately falsified property')
    })
    expect(probeRow.held, 'REGISTER-CONTROL — a satisfied property is HELD').toBe(1)
    expect(probeRow.broken, 'REGISTER-CONTROL — a falsified property is BROKEN (the detector can fail)').toBe(1)
    expect(probeRow.failure, 'REGISTER-CONTROL — and its first failure is reported, not swallowed').toContain('deliberately falsified')
    results.pop()
  })
})
