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
/* ⟶ THE POST-DONE AMENDMENT'S RED SET, APPENDED `2026-10-11` (`§4.1` item 3;
 * `§2.6` THE WRITE LOCK — reads are locked out until the commit lands; the
 * witness is the gate-5 blind row `SSD-G-81`).  THE STATE MACHINE OF THE LOCK
 * WINDOW, ENUMERATED BEFORE THE ROWS (TestWriter discipline):
 *   the window OPENS at the attempt's FIRST FILESYSTEM EFFECT and CLOSES at its
 *   TERMINAL — the COMMIT LANDING (the successful `renameSync`) or the REFUSAL
 *   TERMINAL (the caught failure at one of the three pre-rename points).  An
 *   ADMISSION refusal touches no filesystem and NEVER OPENS A WINDOW.
 *   THE THREE PROBED IN-WINDOW INSTANTS × THE THREE READINGS (`get()` ·
 *   `lastWriteReceipt()` · the REAL PATH's bytes):
 *     (a) PRE-RENAME TMP `fsync` — get = PRE-WRITE · receipt = the last LANDED
 *         closed form (`null` on a first attempt: the in-flight attempt's own
 *         receipt is WITHHELD until its terminal) · bytes = PRE-WRITE.
 *     (b) POST-RENAME DIR `fsync` — get = CANDIDATE · receipt =
 *         `{status:'committed'}` (revealed AT the commit terminal) · bytes =
 *         CANDIDATE.                                        [RED on today's bytes]
 *     (c) REFUSAL TERMINAL (a failing `renameSync`, read at the attempt's own
 *         cleanup site — the `rmSync` §2.6 item 7(a) names) — get = PRE-WRITE ·
 *         receipt = `{status:'refused',reason:'write-failed'}` · bytes =
 *         PRE-WRITE.                                        [RED on today's bytes]
 *   + 2 DRIVEN MUTATION CONTROLS (an ASSIGN-EARLY subject must FIRE at (a); an
 *     ADVANCE-AFTER-RETURN subject — the as-landed shape — must FIRE at (b))
 *   + 1 WINDOW CONTROL (an ADMISSION refusal opens NO window: the in-window
 *     reading is reported NOT-APPLICABLE, never as a pass)
 *   = the register's NEW row `10`, `P-M-SM-3`, strategy `S-SS-LOCK-1`, `12`
 *   declared attempts (`§5.6.1`).
 * §3.2 FAIL-STATES THIS AMENDMENT'S ROWS COVER: `F-13`(a) an in-window read
 *   returning the PRE-WRITE record while the real path already carries the
 *   CANDIDATE (the measured `SSD-G-81` shape) · `F-13`(b) the CANDIDATE while the
 *   real path still carries the pre-write record · `F-13`(c) the in-flight
 *   attempt's receipt observed before its terminal has landed · plus `I-10`'s two
 *   invariants (`I-10-a`: the advance lands IFF the `renameSync` succeeded, at
 *   that first instant; `I-10-b`: the record's answer and the receipt's answer
 *   FLIP AT THE SAME TERMINAL) and `§2.6` item 6's totality — no reading blocks,
 *   waits, spins, queues, re-enters or throws.
 * THE REGISTER'S OPERATIVE TOTALS: `10` rows, declared
 *   `139 = 51+12+6+7+16+2+8+8+8+21` (subtotals `P-IM 66` · `P-SM 29` · `P-TP 44`),
 *   caps `51 ≤ 100` / `139 ≤ 400`, stop after 5 consecutive failures; the
 *   as-filed `9`-row / `118` arithmetic and the amendment's own `130 = those nine
 *   + 12` are kept visible beside every reading they moved (`RCA-8(d)`; the gate-4
 *   confirmation round's `LOCK-1`/`LOCK-2` dispositions moved row `10`'s OWN term
 *   `12 → 21` — the terminal row's `2 × 3` readings + `2` controls, and the
 *   whole-log window control's non-vacuity control — and no landed row's term).  NO new token, NO third receipt form, NO new
 *   `SecuritySettings` member, the `16`-member refusal union UNMOVED — the lock
 *   adds no member and no surface (`§2.6` items 3(d)/8).
 * THE READING POINTS, STATED SO NOTHING IS SILENT: the in-window reads are issued
 * from inside the attempt's OWN `node:fs` boundaries through this file's existing
 * recording/EIO-injection shim (the same instrument class the landed `P-M-SM-1`/
 * `P-M-SM-2` rows use; `§2.6` item 7 names exactly these sites).  A read that fails
 * to return is BOUNDED by a liveness check over its own elapsed time — a read that
 * does not return is not an answer (`§2.6` item 6).
 * ========================================================================== */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, readFile, writeFile, mkdir, readdir, chmod, stat } from 'node:fs/promises'
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
  /** THE REAL PATH'S BYTES AS THEY ARE AT EACH FSYNC (`PBT-6`, GATE-4 correction).
   *  The persist-boundary probe's SECOND half: at the PRE-rename fsync (call 1) the
   *  real path's bytes must still be the PRE-ATTEMPT record — the candidate exists
   *  only as a local until the rename (§2.1 item 3 steps 2/4) — and at the
   *  post-rename fsync (call 2) they ARE the candidate (§0A item 2).  Without this
   *  reading the `ADMITTED` instant has no observable and its row asserted only the
   *  post-commit state, which an assign-first shape passes. */
  fsyncRealBytes: [] as string[],
  /** The REAL path of the write in flight (set by `mkdirSync`/`writeFileSync`, whose
   *  second argument names the REAL path's directory — see the mock below). */
  realPath: '',
  /** The staging path of the write in flight (set by `writeFileSync`). */
  currentTmp: '',
  inject: { writeFile: false, fsync: false, rename: false, fsyncAt: null as number | null },
  fsyncCalls: 0,
  /** THE `§2.6` LOCK PROBE (APPENDED `2026-10-11`).  When armed, the shim calls it
   *  AT THE ATTEMPT'S OWN fs BOUNDARY — the in-window read site `§2.6` item 7(a)
   *  names — with the real path's bytes as they are AT THAT INSTANT, so a
   *  re-entrant `get()`/`lastWriteReceipt()` is answered from inside the write's
   *  own window.  Disarmed (`null`) for every landed row: no existing reading
   *  moves. */
  lockProbe: null as null | ((ev: { kind: 'fsync' | 'rename' | 'rm'; call: number; realBytes: string; tmpBytes: string }) => void),
  /** The store's own `rmSync` activity (the attempt's caught-failure tmp cleanup). */
  rmLinks: [] as string[],
}))

vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs')>()
  /** The real path of the write in flight, read as bytes — the "durable state" half
   *  of `§2.6` item 4's pair (never the module's own answer). */
  const readReal = (): string => {
    try {
      return hooks.realPath === '' ? '' : (actual.readFileSync(hooks.realPath as never, 'utf8') as string)
    } catch {
      return ''
    }
  }
  return {
    ...actual,
    mkdirSync: (dir: unknown, opts?: unknown): void => {
      hooks.log.push(`mkdir:${String(dir)}`)
      actual.mkdirSync(dir as never, opts as never)
    },
    writeFileSync: (file: unknown, data?: unknown, opts?: unknown): void => {
      hooks.log.push(`writeFile:${String(file)}`)
      hooks.currentTmp = String(file)
      // the real path is the staging path MINUS its `.tmp` suffix (§2.1 item 3's
      // staging step names `\`${path}.tmp\``), so the real path's bytes can be probed
      // at each fsync without any seam in the module.
      hooks.realPath = String(file).endsWith('.tmp') ? String(file).slice(0, -'.tmp'.length) : ''
      if (hooks.inject.writeFile) throw new Error('injected: tmp-write failure')
      actual.writeFileSync(file as never, data as never, opts as never)
    },
    renameSync: (from: unknown, to: unknown): void => {
      hooks.log.push(`rename:${String(from)}`)
      if (hooks.inject.rename) throw new Error('injected: rename failure')
      actual.renameSync(from as never, to as never)
      // APPENDED `2026-10-11` (`LOCK-1`, the gate-4 confirmation round).  `§2.6` item
      // 7(a) NAMES `renameSync` among the write path's own in-window read sites — and
      // as filed the shim DECLARED `kind:'rename'` and never fired it, so the site the
      // clause names had no instrument at all.  The probe is fired HERE, at the ONE
      // instant this instrument can reach: AFTER the syscall has landed the rename
      // (the real path's bytes ARE the candidate from now on) and BEFORE the shim
      // returns into the write path, which is where `§2.6` item 5's landing sink is
      // invoked — the TERMINAL the clause pins.  So this reading is the read
      // "immediately before the terminal", never the terminal's own instant: the
      // syscall's INTERIOR, and the gap between its return and the module's own next
      // statement, are UNREACHABLE by any module-controlled JS (the dated note beside
      // `§2.6` items 4/7(a) states it; no host fix exists for a gap no host JS runs in).
      // THE FAILING-RENAME ARM IS NOT PROBED HERE: its syscall landed nothing (the real
      // path's bytes are unmoved) and its own terminal is probed at `rm` (instant (c)),
      // so firing on the success arm alone moves no refusal attempt's instant list.
      hooks.lockProbe?.({ kind: 'rename', call: 1, realBytes: readReal(), tmpBytes: '' })
    },
    rmSync: (file: unknown, opts?: unknown): void => {
      // APPENDED `2026-10-11` (`§2.6` item 7(a) names `rmSync` among the write path's
      // own effects): the caught-failure tmp cleanup is the attempt's own REFUSAL
      // TERMINAL handling site, and the lock probe is called there BEFORE the
      // removal itself, delegating unchanged to the landed behaviour.
      hooks.log.push(`rm:${String(file)}`)
      hooks.rmLinks.push(String(file))
      hooks.lockProbe?.({ kind: 'rm', call: hooks.rmLinks.length, realBytes: readReal(), tmpBytes: '' })
      actual.rmSync(file as never, opts as never)
    },
    fsyncSync: (fd: unknown): void => {
      hooks.fsyncCalls += 1
      hooks.log.push(`fsync:${hooks.fsyncCalls}`)
      let tmpBytes = ''
      try {
        tmpBytes = actual.readFileSync(hooks.currentTmp as never, 'utf8') as string
      } catch {
        tmpBytes = ''
      }
      hooks.fsyncTmpBytes.push(tmpBytes)
      const realBytes = readReal()
      hooks.fsyncRealBytes.push(realBytes)
      hooks.lockProbe?.({ kind: 'fsync', call: hooks.fsyncCalls, realBytes, tmpBytes })
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
  hooks.fsyncRealBytes = []
  hooks.currentTmp = ''
  hooks.realPath = ''
  // APPENDED `2026-10-11` (`§2.6`): the lock probe is disarmed with the rest of the
  // per-row log, so no landed row can inherit an armed probe.
  hooks.rmLinks = []
  hooks.lockProbe = null
}
/** EVERY filesystem call the store made (the full activity log). */
function fsActivity(): string[] {
  return hooks.log.filter((l) => l.startsWith('writeFile:') || l.startsWith('rename:'))
}
/** THE WHOLE INSTRUMENTED LOG, EVERY EFFECT — `mkdirSync` INCLUDED (`LOCK-2`, the
 *  gate-4 confirmation round).  `§2.6` item 2 names the attempt's FIRST FILESYSTEM
 *  EFFECT — *"the first `mkdirSync`/`writeFileSync` the attempt performs"* — as the
 *  effect that OPENS the window, so a control whose job is to prove that an admission
 *  refusal opens NO window must count `mkdirSync` too.  As filed the window control
 *  counted only `writeFile`/`rename` (plus `fsync`/`rm` by their own counters), so an
 *  **mkdir-only** attempt — an admission refusal whose write path had already created
 *  the parent directory — read `none` and printed `NOT-APPLICABLE`: the control was
 *  VACUOUS over exactly the effect the clause names.  This reads the log WHOLE (every
 *  entry the shim pushes), so no future effect can slip under the same filter. */
function fsWholeLog(): string[] {
  return hooks.log.slice()
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
/* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (4)'s row, whose export half reddens for
 * the SAME landing): THE MODULE'S EXPORT NAMES ARE THE DECLARED SEVEN.** `S2`
 * `U-TIER4-ARBITRARY-STORAGE`'s `§2.1` item 3 DECLARES THREE new exported types in this very
 * module — `Tier4Entry`, `Tier4WriteAnswer` (the declared SUPERSET, so `SecurityWriteReceipt`
 * itself stays byte-identical) and `Tier4ClosedRefusal` (`§2.4` item 3's declared spelling) —
 * while the FOUR landed names survive UNMOVED (`S2`'s own `P-T4-EXPORTS`: *"the module's export
 * census moves by NOTHING (the four landed names survive)"*). THE BITE IS UNMOVED: the census
 * is read as SET-EQUALITY, so an ADDED, RENAMED or REMOVED name still reddens (an eighth name
 * is now the added case; the extractor's non-vacuity drive adds one and must see it). */
const MODULE_EXPORTS: readonly string[] = ['createSecurityStore', 'SecurityStoreOptions', 'SecurityStore', 'SecurityWriteReceipt', 'Tier4Entry', 'Tier4WriteAnswer', 'Tier4ClosedRefusal']
/* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (4)): THE READ SURFACE IS THE DECLARED
 * FIVE.** This unit's contract froze the census at the module's own three members
 * (`docs/specs/secure-store-discipline.md` `§2.5` item 3 / `§0A` item 5), and `S2`
 * `U-TIER4-ARBITRARY-STORAGE` MOVES it **BY DECLARATION, NOT BY ACCIDENT**: the tier gains
 * `readEntry(name)` and `writeEntry(name, value)`, so `Object.keys(store)` is EXACTLY
 * `["get","lastWriteReceipt","readEntry","set","writeEntry"]` — `5 = 3 (landed: get ·
 * lastWriteReceipt · set) + 2 (new)` (S2 `§2.1` item 3, `§5.1` item 4's census table row 2,
 * and `§7b` row 3's declaration to this unit). THE BITE IS UNMOVED: an ADDED, RENAMED or
 * REMOVED member still reddens — a SIXTH member is now the added case, and the part (a)
 * control below drives the added, the renamed and the removed shapes. */
const MEMBER_CENSUS: readonly string[] = ['get', 'lastWriteReceipt', 'readEntry', 'set', 'writeEntry']

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

/** The tmp-existence reading (`PBT-4`, GATE-4 correction).  The as-filed `exists()`
 *  above reads a path as a FILE (or a directory) and therefore answers `false` for
 *  a write-only / permission-shaped entry — so a TERM that asserts "no `${path}.tmp`
 *  residue" could pass while a residue existed.  `node:fs/promises`'s `stat` is a
 *  DIFFERENT specifier from the mocked `node:fs` (this file's own IO section), so
 *  this reading is unmocked and a real stat. */
async function entryExists(p: string): Promise<boolean> {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

/** THE DIVERGENCE READING (`ADV-1`, GATE-4's red-first row; I-1 / §2.3 item 7 /
 *  the decisions row's reading (b): *"Live state equals durable state"*).  The
 *  tier's LIVE record and the FILE at the real path are read TOGETHER, member for
 *  member, and any member the live record carries that the file's bytes do not
 *  carry — or vice versa — is the defect this unit exists to repair, in EITHER
 *  direction (`live → file` and `file → live`, so an in-memory-only value and a
 *  file-only value are both caught). */
const MEMBER_KEYS: readonly string[] = ['token', 'enabled', 'maxJournalLength']
function recordDivergence(live: unknown, fileBytes: string | null, ctx: string): string | null {
  const liveRec = live as Record<string, unknown>
  const fileRec = parseOrNull(fileBytes)
  if (fileRec === null) return `${ctx}: the real path carries no parsable record (${fileBytes === null ? 'no file' : '"' + fileBytes.slice(0, 40) + '"'}) while the live record reads ${snapshot(liveRec)} — §2.3 item 7`
  const parts: string[] = []
  for (const key of MEMBER_KEYS) {
    if (JSON.stringify(liveRec[key]) !== JSON.stringify(fileRec[key])) {
      parts.push(`${key}: live ${JSON.stringify(liveRec[key])} vs file ${JSON.stringify(fileRec[key])}`)
    }
  }
  return parts.length === 0 ? null : `${ctx}: the LIVE record carries value(s) the FILE does not hold — ${parts.join(' · ')} (§2.3 item 7 / I-1: "a live record that carries a value the file does not hold IS THE DEFECT THIS UNIT REPAIRS")`
}

/** The member census (§2.5 item 3) — read AS A SET, the clause's own OPERATIVE
 *  reading.  `PBT-2` (GATE-4 correction): the as-filed form compared the key list
 *  POSITIONALLY against `MEMBER_CENSUS`, i.e. it bound the SOURCE-ORDER reading —
 *  while `§9` item 5(b) had ALREADY DECLARED a source-order reading NOT DERIVABLE
 *  from this contract (`§2.5` item 3's halves cannot both hold: "EXACTLY
 *  `["get","lastWriteReceipt","set"]`" is a named SET, and the clause's own
 *  leading words plus `§3.2` `F-11`'s *"`Object.keys(store)` must be **set-equal**
 *  to …"* are the set reading).  The instrument now drives the SET reading the
 *  contract declares; a fourth member, a missing member and a renamed member all
 *  still FAIL it (the `P-O3-TP-1` part (a) control drives all three). */
function memberCensusOf(subject: object): string[] {
  const names = Object.keys(subject)
  const expected = [...MEMBER_CENSUS]
  const missing = expected.filter((n) => !names.includes(n))
  const extra = names.filter((n) => !expected.includes(n))
  if (missing.length > 0 || extra.length > 0) {
    throw new Error(`the returned object's own enumerable members are ${JSON.stringify(names)}; the census is SET-EQUAL to ${JSON.stringify(expected)} (§2.5 item 3 — a member ADDED, RENAMED or REMOVED fails: missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)})`)
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

/** A member's admissible VALUE for an admitted plain reading: `safeString` `'tok'`
 *  on `token` (kept verbatim), a finite number on `maxJournalLength` (floored by the
 *  driver via `expectedPost`), the array itself on `groups` (the declared filter).
 *  `PBT-9` (GATE-4 correction): the as-filed form was
 *  `key === 'token' ? (spec.label === 'safeString' ? 'tok' : spec.v) : spec.v` for
 *  `maxJournalLength`/`groups`/`token`, i.e. TWO INERT TERNARIES — arms that computed
 *  but asserted nothing (`spec.v` in both branches) — and this helper's whole return
 *  was unasserted wherever it agreed with `spec.v`.  The ternary is now REAL: it is
 *  the value the drive actually supplies, and the `P-O2-IM-1` terms read it back
 *  against the record and the file. */
function valueForMember(spec: ValueSpec, key: MemberKey): unknown {
  switch (key) {
    case 'token':
      return spec.label === 'safeString' ? 'tok' : spec.v
    case 'maxJournalLength':
      return spec.v
    case 'groups':
      return spec.v
  }
}

type Admit = { admitted: true; patch: Record<string, unknown> } | { admitted: false; reason: string }

/** §2.2 item 3's RULE **AS `§6`'s DECLARED DOMAINS PIN IT** (`KB-4`, corrected at
 *  the kick-back): the admission is over each member's DECLARED DOMAIN — a
 *  REPRESENTABLE value that lies OUTSIDE that domain is refused exactly as an
 *  unrepresentable one is, and an unrepresentable value is admissible ONLY as a
 *  DECLARED CLEAR of its own member.  The contract's own cells, quoted:
 *   · `§6` `PAR-2`'s OUTSIDE column: *"a non-string of any other kind — a number,
 *     a boolean, an object, an array, `BigInt`, a `Map`/`Set`/`Date`, a function,
 *     a `Symbol`, a cyclic object (**ADMISSION REFUSAL, whole patch, record
 *     unmoved**)"*;
 *   · `§3.2` `F-4`: *"the value is an ordinary object and is thus NOT a `string`
 *     ⇒ **declared-domain refusal, whole patch**"*;
 *   · `§6` `PAR-3`: a **non-number** on `maxJournalLength` (a string, a boolean, an
 *     object, `BigInt`, a function) is **refused**, `Infinity`/`-Infinity` are
 *     **refused** (the measured divergence's own fixture), and the CLEAR arm is
 *     `0` · `-0` · a negative number · `NaN` · `null`;
 *   · `§6` `PAR-4`/`PAR-5`: a **non-array** on `groups`/`disable` is *"refused,
 *     whole patch"*, an array carrying a non-representable element refuses, and an
 *     array element that is a non-group STRING is *"dropped by the documented
 *     filter, admitted"*;
 *   · `undefined` is the ABSENT marker on every member (admitted).
 *  The as-filed reading — representability ALONE — admitted `{token: <ordinary
 *  object>}` and contradicted this file's OWN `F-4` row (`:1741`): the row's bytes
 *  were malformed, not the contract. */
function admissionOf(spec: ValueSpec, key: MemberKey): Admit {
  if (spec.v === undefined) return { admitted: true, patch: {} } // the absent marker (§2.2 item 3 / PAR-2…PAR-5)
  if (key === 'token') {
    // PAR-2's declared domain: a non-empty string (kept verbatim) · `null` (the clear) · `undefined` (absent).
    if (typeof spec.v === 'string' && spec.v !== '') return { admitted: true, patch: { token: valueForMember(spec, key) } }
    if (spec.v === null) return { admitted: true, patch: { token: null } }
    return { admitted: false, reason: `outside PAR-2's declared domain (a non-string): ${spec.label} — ADMISSION REFUSAL, whole patch, record unmoved` }
  }
  if (key === 'maxJournalLength') {
    // PAR-3's declared domain: a FINITE number (floored, or cleared by the documented
    // `> 0` arm — `0` · `-0` · a negative number · `NaN`) · `null` (the clear) · `undefined` (absent).
    if (typeof spec.v === 'number') {
      if (spec.v === Infinity || spec.v === -Infinity) {
        return { admitted: false, reason: `PAR-3's OUTSIDE column: \`${spec.label}\` is ADMISSION-REFUSED — the measured divergence's own fixture` }
      }
      return { admitted: true, patch: { maxJournalLength: valueForMember(spec, key) } }
    }
    if (spec.v === null) return { admitted: true, patch: { maxJournalLength: null } }
    return { admitted: false, reason: `outside PAR-3's declared domain (a non-number): ${spec.label} — refused` }
  }
  // PAR-4 (`groups`) / PAR-5 (`disable`) — identical OUTSIDE columns.
  if (Array.isArray(spec.v)) {
    if (!(spec.v as unknown[]).every((el) => REPRESENTABLE(el))) {
      return { admitted: false, reason: `an array carrying a non-representable element: ${spec.label} — §2.2 item 4's derived consequence: ADMISSION REFUSAL, whole patch` }
    }
    return { admitted: true, patch: { [key]: valueForMember(spec, key) } }
  }
  return { admitted: false, reason: `outside PAR-4/PAR-5's declared domain (a non-array): ${spec.label} — refused, whole patch` }
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

/** THE ASYNC ARM OF THE DETECTOR (`F-2a`, measured at the gate-4 re-audit's own
 *  pass).  Three drive bodies are `async` (the tmp-fate class reads, the
 *  refusal-path receipt mutation read, and the diff-scope census read): passed to
 *  the SYNCHRONOUS `drive()`, a `throw` inside them never reached its `catch` — it
 *  became a REJECTED PROMISE, which vitest reports as an "unhandled rejection"
 *  while the row still counted `held` (MEASURED: a deliberately stale denied-file
 *  pin left `P-O3-TP-1` at `8 held / 0 broken` and the suite at "37 passed … 1
 *  error").  `driveAsync` AWAITS the body, so the row's reading is the row's own —
 *  the same attempt/held/broken arithmetic, attributed at the call site and awaited
 *  INLINE (so the register order is unchanged).  The control that this arm works
 *  rides `REGISTER-CONTROL` beside the synchronous one. */
async function driveAsync(id: string, attempt: string, fn: () => Promise<void>): Promise<void> {
  const r = results.find((x) => x.id === id)
  if (r === undefined) throw new Error(`driveAsync() for an undeclared row: ${id}`)
  r.attempts += 1
  try {
    await fn()
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

/** THE STOP RULE AS A PURE PREDICATE (`PBT-1`, GATE-4 correction).  As filed,
 *  `brokenStreak()` was read AFTER the new row had been pushed, so the freshly
 *  pushed row (`broken === 0`) always terminated the walk at index 0 and the
 *  predicate could NEVER exceed `0`: the "STOP AFTER 5 CONSECUTIVE FAILURES" guard
 *  and the un-run-as-FAILURE rule were dead code, and `REGISTER-EXEC`'s "no row
 *  skipped" was a tautology.  The rule is now a function of the register state
 *  AS IT IS (before the candidate row is added), so it is falsifiable: a synthetic
 *  five-broken-row streak makes it `true`.  `brokenStreak` stays the same shape —
 *  it is the CALL SITE (the `results.slice(0, -1)` in `runRow`, and this
 *  predicate's `excludeId`) that had to move. */
function shouldStopRegister(rows: readonly RowResult[]): boolean {
  return brokenStreak(rows) >= 5
}
function brokenStreak(rows: readonly RowResult[]): number {
  let streak = 0
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].broken > 0) streak += 1
    else break
  }
  return streak
}

/* ==========================================================================
 * THE STOP RULE'S DRIVE — BOTH DIRECTIONS (`F-3`, the gate-4 RE-AUDIT finding;
 * `§9d` item 2's claim that *"`REGISTER-EXEC` asserts both directions … a row
 * beyond it is reported UN-RUN"* was AHEAD OF THE BYTES: the predicate existed
 * and was correctly call-sited, but NO synthetic five-broken row streak was ever
 * constructed, so neither the guard nor the un-run-as-FAILURE rule was ever
 * DRIVEN — a five-row streak could not be produced by the register itself, whose
 * nine rows all HOLD).
 *
 * THE DRIVE, and what each half of it proves:
 *   DIRECTION 1 — the predicate.  `shouldStopRegister` is read on a FOUR-broken
 *   streak (it must NOT fire: the boundary that makes `5` mean `5`) and on a
 *   FIVE-broken streak (it MUST fire).  A predicate that answered `false` always
 *   (the as-filed dead-code shape) fails the second reading.
 *   DIRECTION 2 — the REAL call site.  With the five synthetic broken rows
 *   ALREADY in `results` — exactly the state `runRow` reads its streak over
 *   (`results.slice(0, -1)`) — `runRow` is called for a tenth row whose body
 *   THROWS.  The body must NOT run: the row must come back `ran === false`,
 *   `attempts === 0`, `broken === declared` and carry the `UN-RUN` failure
 *   message — i.e. reported as a FAILURE, never as a pass.
 *
 * THE SYNTHETIC ROWS ARE REMOVED IN A `finally` (the register's own figures are
 * untouched by this drive; `REGISTER-CONTROL` below uses the same push/pop
 * discipline).  The drive is MEMOIZED so every reader sees the SAME reading and
 * no second mutation is possible.
 * ======================================================================== */
interface StopRuleDrive {
  /** DIRECTION 1 — the predicate on a four-broken streak: it must NOT fire. */
  firedOnFour: boolean
  /** DIRECTION 1 — the predicate on a five-broken streak: it MUST fire. */
  firedOnFive: boolean
  /** DIRECTION 2 — the row the real call site reported UN-RUN. */
  unRunId: string | null
  unRunRan: boolean | null
  unRunAttempts: number | null
  unRunBroken: number | null
  unRunDeclared: number | null
  unRunFailure: string | null
  /** true iff the UN-RUN row's body was executed — it must NEVER be. */
  unRunBodyRan: boolean
  /** the synthetic ids this drive pushed, asserted gone from the register after it. */
  syntheticIds: string[]
}

let stopRuleDriveCache: StopRuleDrive | null = null

function driveStopRuleBothWays(): StopRuleDrive {
  if (stopRuleDriveCache !== null) return stopRuleDriveCache
  const syntheticIds: string[] = []
  const synth = (id: string): RowResult => ({
    id,
    type: 'P-TP',
    strategy: 'S-SS-CTL-9',
    declared: 1,
    attempts: 1,
    held: 0,
    broken: 1,
    failure: `attempt __SYN__: a deliberately broken synthetic row (${id}) — the stop-rule drive's own material`,
    ran: true,
  })
  const baseline = results.length
  let unRunBodyRan = false
  try {
    const four: RowResult[] = [synth('__SYN-1__'), synth('__SYN-2__'), synth('__SYN-3__'), synth('__SYN-4__')]
    const five: RowResult[] = [...four, synth('__SYN-5__')]
    const firedOnFour = shouldStopRegister(four)
    const firedOnFive = shouldStopRegister(five)
    for (const r of five) {
      syntheticIds.push(r.id)
      results.push(r)
    }
    // The body is the control: if the stop rule does NOT hold, this body runs and
    // the drive's own reading records it (`unRunBodyRan`).
    runRow('__UNRUN__', 'P-TP', 'S-SS-CTL-9', 3, () => {
      unRunBodyRan = true
      throw new Error('the body of an UN-RUN row was executed — the stop rule did not hold')
    })
    const row = results[results.length - 1]
    stopRuleDriveCache = {
      firedOnFour,
      firedOnFive,
      unRunId: row.id,
      unRunRan: row.ran,
      unRunAttempts: row.attempts,
      unRunBroken: row.broken,
      unRunDeclared: row.declared,
      unRunFailure: row.failure,
      unRunBodyRan,
      syntheticIds,
    }
    return stopRuleDriveCache
  } finally {
    while (results.length > baseline) results.pop()
  }
}

function runRow(id: string, type: RowType, strategy: string, declared: number, body: () => void): void {
  results.push({ id, type, strategy, declared, attempts: 0, held: 0, broken: 0, failure: null, ran: false })
  const row = results[results.length - 1]
  // STOP AFTER 5 CONSECUTIVE FAILURES (§5.6.1): THE STREAK IS READ OVER THE
  // REGISTER AS IT WAS BEFORE THIS ROW WAS PUSHED (`PBT-1`, GATE-4 correction —
  // the row's own `broken === 0` must not be able to answer the question).  A row
  // beyond the streak is reported UN-RUN, and an un-run row is a FAILURE, never a
  // pass.
  if (shouldStopRegister(results.slice(0, -1))) {
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
  const sm = sum('P-M-SM-1', 'P-M-SM-2', 'P-M-SM-3')
  const tp = sum('P-O1-TP-1', 'P-TP-2', 'P-O2-TP-1', 'P-O3-TP-1')
  const maxRow = Math.max(...terms)
  // eslint-disable-next-line no-console
  console.log(
    [
      '',
      '================ THE §5.6.1 REGISTER — EXECUTED ================',
      ...lines,
      `TOTAL (with its terms): ${total} = ${terms.join(' + ')} — executed ${results.reduce((a, r) => a + r.attempts, 0)}`,
      `THE AS-FILED TOTAL, KEPT BESIDE IT (APPENDED 2026-10-11; RCA-8(d)): 118 = 51+12+6+7+16+2+8+8+8 over the NINE landed rows, unmoved — the amendment's own 130 = those nine terms + 12, and the OPERATIVE total is ${total} = those nine terms + ${terms[terms.length - 1]} (row 10, P-M-SM-3, S-SS-LOCK-1, §2.6: the gate-4 confirmation round's LOCK-1/LOCK-2 dispositions moved its own term)`,
      `SUBTOTALS BY TYPE: P-IM ${im} · P-SM ${sm} · P-TP ${tp} — ${im} + ${sm} + ${tp} = ${im + sm + tp}`,
      `CAPS: per-row max ${maxRow} ≤ 100 (headroom ${100 - maxRow}) · total ${total} ≤ 400 (headroom ${400 - total})`,
      `ROWS: ${results.length} (${results.filter((r) => r.type === 'P-IM').length} P-IM + ${results.filter((r) => r.type === 'P-SM').length} P-SM + ${results.filter((r) => r.type === 'P-TP').length} P-TP); executed = declared? ${results.every((r) => r.attempts === r.declared)}`,
      `STOP AFTER 5 CONSECUTIVE FAILURES: ${shouldStopRegister(results) ? `TRIGGERED (${results.filter((r) => !r.ran).map((r) => r.id).join(', ')})` : `not triggered (the broken streak reads ${brokenStreak(results)} of 5)`}`,
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

/** THE WINDOW (`KB-5`, corrected at the kick-back).  The module declares a `set`
 *  member TWICE — once in the `SecurityStore` INTERFACE near the head
 *  (`set(patch: {…}): SecuritySettings`, `src/main/security-store.ts:27`) and once
 *  as the IMPLEMENTATION inside the returned object literal (`:254`).  The row's
 *  subject is the ORDERING DISCIPLINE of the WRITE PATH, so the window must open on
 *  the IMPLEMENTATION: the search is anchored AFTER the factory's own declaration
 *  (`export function createSecurityStore`), which precedes the returned literal,
 *  and it closes at the literal's own end (`} as SecurityStore`).  AS FILED the
 *  search matched the INTERFACE's declaration and closed on its neighbour's
 *  doc-commented member (`:32`) — a 426-byte slice with `indexOf('current =') ===
 *  -1`, i.e. a window that CANNOT CONTAIN the write path for ANY implementation:
 *  a structurally unsatisfiable instrument, never a red the Implementer could turn
 *  green.  MEASURED on the landed bytes after the correction: the window is 1447
 *  bytes, `persist(` sits at 856 and `current =` at 1194 — the assignment AFTER
 *  the save, gated on its outcome. */
function setBodyOf(src: string): string {
  const factoryAt = src.indexOf('export function createSecurityStore')
  const at = src.indexOf('set(patch:', factoryAt === -1 ? 0 : factoryAt)
  if (at === -1) return ''
  const end = src.indexOf('} as SecurityStore', at)
  return src.slice(at, end === -1 ? undefined : end)
}

function orderedAdvanceOf(src: string): { persistsBeforeAssign: boolean; outcomeGated: boolean; gateRegion: string } {
  const body = setBodyOf(src)
  const assignIdx = body.indexOf('current =')
  const persistIdx = body.indexOf('persist(')
  const persistsBeforeAssign = assignIdx !== -1 && persistIdx !== -1 && assignIdx > persistIdx
  if (assignIdx === -1 || persistIdx === -1) return { persistsBeforeAssign: false, outcomeGated: false, gateRegion: '' }
  // the assignment must be gated on the save's OUTCOME: the assignment's own
  // ENCLOSING CONDITION must TEST the receipt — the closed `'committed'` token or
  // a `.status` read (the receipt's `status` member, §2.1 item 7).  `PBT-11`
  // (GATE-4 correction): the as-filed detector accepted ANY `if (` between the call
  // and the assignment, so `persist(candidate); if (DEBUG) log('x'); current =
  // candidate` satisfied it — a PROXY, not a gate.  The region is returned so a
  // control can drive a real non-gated assignment through the SAME detector (see
  // the `P-M-SM-2` row's control reading).
  const between = body.slice(persistIdx, assignIdx)
  const outcomeGated = /('committed'|\.status)/.test(between)
  return { persistsBeforeAssign, outcomeGated, gateRegion: between }
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
        const tmpResidue = await entryExists(`${path}.tmp`)
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
            // `PBT-9` (GATE-4 correction): the drive's OWN supplied value is read
            // back — the term is real, not computed-but-unasserted.  `valueForMember`
            // is the value the drive actually handed `set()` for this member, and
            // §2.2 item 3's declared coercion is the only transformation allowed
            // between it and the record (§2.2 item 2: "the admitted-and-persisted
            // value equals the value the caller supplied, for the members whose
            // declared form IS the caller's value").
            const supplied = valueForMember(spec, key)
            const coerced = expectedPost(pre, { [key]: supplied })
            if (normRecord(asRecord(post)) !== snapshot(coerced)) {
              throw new Error(`${id} · the ADMITTED value the caller supplied (${JSON.stringify(supplied)} on \`${key}\`) did not land as the declared coercion ${snapshot(coerced)}; the record reads ${snapshot(asRecord(post))} — §2.2 item 2 (the admitted-and-persisted value equals the supplied value, the documented coercions aside)`)
            }
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
        // §2.2 item 3: the patch's group set dedups+filters to the ADDED `code`
        // "with current-state order preserved" — ADDITIVE over `probe()`'s
        // pre-state `['read','dispatch']` (§2.1 item 2's first-run default,
        // which M-1/M-7 assert; `groups:['read']` removes nothing).
        if (enabled.length !== 3 || enabled[0] !== 'read' || enabled[1] !== 'dispatch' || enabled[2] !== 'code') {
          throw new Error(`boundary 50: the enabled sequence is ${JSON.stringify(enabled)}, not ['read','dispatch','code'] — the documented dedup+filter over the ADDED set, current-state order preserved (PAR-4 / §2.2 item 3)`)
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
      // THE ISOLATION (`KB-6`, corrected at the kick-back): every arm is DISARMED
      // before this attempt's `probe()` runs.  As filed, class N's injection was
      // still live during class N+1's probe, so the probe's own write REFUSED and
      // the real path never received the pre-write record — the byte-identity term
      // below then compared `bytesSnapshot(postBytes)` with a RECORD snapshot
      // (`'null'` vs `'{"token":…}'`) and could NEVER hold.  One fresh store, one
      // ISOLATED probe, then the arm.
      resetInject()
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
      if (await entryExists(`${path}.tmp`)) {
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
    // pre-attempt value.  `PBT-6` (GATE-4 correction): as filed this attempt NAMED
    // an unobservable instant — the ADMITTED state, before the rename — but asserted
    // only the POST-COMMIT record (`store.get() === expectedPost`) and the post-state
    // bytes, which the assign-first shape (`current` set BEFORE `persist()`) passes
    // too: the instant itself was never read.  The instant is now DRIVEN through the
    // persist-boundary probe, whose reading IS the state's definition: at the
    // PRE-rename tmp fsync the staging file already carries the candidate (§2.1 item 3
    // step 3) while the real path's bytes are STILL the pre-write record — so a shape
    // that assigns (or writes) the record before the commit point reddens HERE.  The
    // contract's own words for the limit: §9 item 5(c) — the ordered form is read
    // statically from the `set()` body, because the landed module exports no seam
    // (§2.1 item 1).
    {
      const { store } = await makeStore()
      resetInject() // KB-6 isolation: the previous arm is disarmed before this probe
      const pre = probe(store)
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'NEXT' }), '(b) ADMITTED: set()')
      const stagedAtTmpFsync = hooks.fsyncTmpBytes[0] ?? ''
      const realBytesAtTmpFsync = hooks.fsyncRealBytes[0] ?? ''
      drive('P-M-SM-1', '(b) ADMITTED (read together with (a))', () => {
        // the ADMITTED instant, read where it is observable: the candidate is staged
        // and the real path has NOT moved yet.
        if (normRecord(parseOrNull(stagedAtTmpFsync)) !== snapshot(expectedPost(pre, { token: 'NEXT' }))) {
          throw new Error(`ADMITTED: at the pre-rename tmp fsync the staging file carries ${bytesSnapshot(stagedAtTmpFsync)}, not the candidate ${snapshot(expectedPost(pre, { token: 'NEXT' }))}`)
        }
        if (normRecord(parseOrNull(realBytesAtTmpFsync)) !== snapshot(pre)) {
          throw new Error(`ADMITTED: at the ADMITTED instant the real path's bytes read ${bytesSnapshot(realBytesAtTmpFsync)}, not the PRE-ATTEMPT record ${snapshot(pre)} — the record must still be the pre-attempt value while the candidate exists only as a local (§2.1 item 3 step 2; an assign-first/advance-early shape reddens HERE)`)
        }
        if (snapshot(asRecord(store.get())) !== snapshot(expectedPost(pre, { token: 'NEXT' }))) {
          throw new Error(`ADMITTED: the record is ${snapshot(asRecord(store.get()))} — the candidate must be the answer once the write committed (§2.1 item 3 step 6)`)
        }
      })
    }
    // (c) STAGED — the candidate is STAGED while the real path is untouched.  The
    // observable is read AT THE PRE-RENAME TMP FSYNC (the mock's own reading of the
    // staging file's bytes at that instant), because `§2.3` item 4(b) requires a
    // CAUGHT failure to remove its own tmp best-effort — the landed, contract-declared
    // discipline `§1.2` item 7 declares UNCHANGED — so a read taken AFTER `set()` has
    // returned observes a state the contract REMOVES (`KB-6b`, corrected at the
    // kick-back; `§2.4` `R-4`'s *"a residual tmp is possible"* is the only clause that
    // would let one survive a rename failure, and the rename's own source is read from
    // the mock's log).  The rename-injected failure drives the class, and the
    // return-time reading is now the cleanup's OWN positive term (§2.3 item 4(b)).
    {
      const { store, path } = await makeStore()
      resetInject() // KB-6 isolation
      const pre = probe(store)
      const preBytes = await rawBytes(path)
      armRenameFailure()
      resetFsLog()
      assertNoThrow(() => store.set({ token: 'STAGED' }), '(c) STAGED: set()')
      const stagedAtTmpFsync = hooks.fsyncTmpBytes[0] ?? ''
      const afterReturnBytes = await rawBytes(`${path}.tmp`)
      const realBytes = await rawBytes(path)
      const renameLog = hooks.log.find((l) => l.startsWith('rename:')) ?? ''
      drive('P-M-SM-1', '(c) STAGED (read together with (d))', () => {
        if (stagedAtTmpFsync === '') throw new Error('STAGED: the pre-rename tmp fsync read no staging bytes — the candidate must be staged before the rename (§2.1 item 3 step 3)')
        if (normRecord(parseOrNull(stagedAtTmpFsync)) !== snapshot(expectedPost(pre, { token: 'STAGED' }))) {
          throw new Error(`STAGED: the staged bytes at the pre-rename fsync are ${bytesSnapshot(stagedAtTmpFsync)}, not the candidate ${snapshot(expectedPost(pre, { token: 'STAGED' }))}`)
        }
        if (normRecord(parseOrNull(realBytes)) !== snapshot(pre)) {
          throw new Error(`STAGED: the real path's bytes are ${bytesSnapshot(realBytes)}, not the PRE-write record — the real path is untouched until the rename (§2.1 item 3 step 4)`)
        }
        if (!renameLog.endsWith(`${path}.tmp`)) throw new Error(`STAGED: the rename's SOURCE was ${JSON.stringify(renameLog)}, not the staging path`)
        // the CAUGHT failure's own discipline (§2.3 item 4(b)): removal is
        // best-effort, and its own failure is swallowed — so no throw AND no
        // residue PARSING AS THE RECORD after the return.
        //
        // `PBT-7` (GATE-4 disposition: `PAR-NOTE`; ONE note, no re-write).  The
        // clause set carries TWO readings and this term drives the OPERATIVE one,
        // named here so nothing is silent: `§2.3` item 4(b) — *"on a CAUGHT failure
        // the staging tmp is removed best-effort, with its own removal failure
        // SWALLOWED"* — is `§1.2` item 7's UNCHANGED landed discipline and is the
        // clause a term may assert; `§2.4` `R-4` — *"a residual tmp is POSSIBLE and
        // is overwritten next and never parsed"* — is a **TOLERANCE**: it says a
        // residue does not itself FAIL the class, never that a residue is OWED or
        // that a cleaned path fails.  Both readings are satisfied by removal, so the
        // as-filed "no residue after the return" term is RIGHT and is kept; it is
        // the R-4 tolerance that moved, and it is driven where it is load-bearing —
        // `P-O2-IM-2`'s class-4 reading, where a residue, if present, is read for
        // what `§2.3` item 4(c) declares of it (never parsed as the record).
        if (afterReturnBytes !== null) {
          const residueRec = parseOrNull(afterReturnBytes)
          if (residueRec !== null && normRecord(residueRec) === snapshot(expectedPost(pre, { token: 'STAGED' }))) {
            throw new Error('STAGED: the caught rename failure left a `${path}.tmp` that PARSES AS THE CANDIDATE — a stale tmp is never the record (§2.3 item 4(c)), and §2.3 item 4(b) removes its own tmp on a caught failure')
          }
        }
        if (normRecord(parseOrNull(preBytes)) !== snapshot(pre)) throw new Error('STAGED: the probe did not land the pre-write record — the fixture is not isolated (KB-6)')
      })
    }
    // (d) RENAMED — the bytes at the real path ARE the candidate and the record
    // has advanced.
    {
      const { store, path } = await makeStore()
      resetInject() // KB-6 isolation: (c) left the rename armed; this probe runs injection-free
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
      resetInject() // KB-6 isolation
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
      resetInject() // KB-6 isolation
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
        // KB-6 isolation: the PREVIOUS class's arm is disarmed before this class's probe.
        resetInject()
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
      await driveAsync('P-O2-IM-2', `${c.name} · the real path is not torn and the tmp is never the record`, async () => {
        if (store.lastWriteReceipt()?.status !== 'refused') {
          throw new Error(`${c.name}: the receipt answered ${JSON.stringify(store.lastWriteReceipt())}, not the refused form — every class must refuse (R-2..R-4)`)
        }
        if (c.realPathIsDirectory) {
          if (realBytes !== null) throw new Error(`${c.name}: the directory-shaped real path was replaced by file bytes — impossible for a rename onto a directory`)
          if (realPathStillExists === false) throw new Error(`${c.name}: the directory-shaped real path vanished — the rename must have refused, not removed it`)
          // `PBT-4` (GATE-4 correction): as filed this term compared the tmp
          // against the `null` literal (`!= null && normRecord(...) ===
          // normRecord(parseOrNull(preBytes))` with `preBytes === null` here) — a
          // COMPARISON AGAINST `null`, i.e. no real comparison.  The tmp is now read
          // for what `§2.3` item 4(c) declares of it — *"a stale tmp is NEVER PARSED
          // AS THE RECORD"* — with the refusal actually driven.
          const tmpEntry = await entryExists(`${path}.tmp`)
          const tmpBytesNow = await rawBytes(`${path}.tmp`)
          if (tmpEntry && tmpBytesNow !== null) {
            const tmpRec = parseOrNull(tmpBytesNow)
            if (tmpRec !== null && normRecord(tmpRec) === snapshot(expectedPost(pre, { token: 'x' }))) {
              throw new Error(`${c.name}: the staging tmp PARSES AS THE CANDIDATE RECORD (${bytesSnapshot(tmpBytesNow)}) — a stale tmp is never parsed as the record (§2.3 item 4(c))`)
            }
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
      if (await entryExists(`${path}.tmp`)) {
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
      const out = assertNoThrow(() => store.set({ token: 'x' }), '6 · the directory-shaped stale tmp: set()')
      drive('P-O2-IM-2', '6 · the stale tmp that names a DIRECTORY — refused, never a throw', () => {
        // `KB-7`: `set()`'s return is the RECORD (§2.1 item 3 step 6 / §2.5 item 3) —
        // the receipt is `lastWriteReceipt()`'s answer (§2.1 item 7).
        if (store.lastWriteReceipt()?.status !== 'refused') throw new Error('the directory-shaped stale tmp did not refuse (§2.3 item 4(b))')
        if (snapshot(asRecord(out)) !== snapshot(pre)) throw new Error('set()’s return is not the pre-write RECORD on the stale-tmp refusal (§2.1 item 3 step 6)')
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
      resetInject() // KB-6 isolation: the PREVIOUS class's arm is disarmed before this warm-up probe
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
        // `PBT-11` (GATE-4 correction): the gate detector is PROVEN non-proxy in
        // place.  A non-gated assignment driven through the SAME instrument must
        // answer `outcomeGated === false` — the as-filed detector, which accepted
        // ANY `if (` between the call and the assignment, answers `true` for this
        // mutant because of its `if (DEBUG)` proxy.  So the reading above is
        // attributable rather than satisfied by any `if`.
        const ungatedMutant = orderedAdvanceOf(
          moduleSrc.replace(
            /if\s*\(\s*staged\.status\s*===\s*'committed'\s*\)\s*current\s*=\s*candidate/,
            "if (DEBUG) log('x')\n      current = candidate",
          ),
        )
        if (ungatedMutant.outcomeGated !== false || ungatedMutant.persistsBeforeAssign !== true) {
          throw new Error(`the gate detector is a PROXY: an UNGATED assignment (a mere \`if (\` between the save and the advance) reads ${JSON.stringify(ungatedMutant)} — the reading must redden a non-gated assignment (PBT-11)`)
        }
        const gatedMutant = orderedAdvanceOf(moduleSrc)
        if (gatedMutant.outcomeGated !== true) {
          throw new Error('the gate detector did not recognise the LANDED receipt-gated assignment — the control is vacuous')
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
        resetInject() // KB-6 isolation: the PREVIOUS class's arm is disarmed before this probe
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
      await driveAsync('P-O3-IM-2', 'member lastWriteReceipt() · mutation-visibility (on the REFUSAL path — the strongest form)', async () => {
        // `PBT-5` (GATE-4 correction).  As filed this attempt was LABELLED "on the
        // REFUSAL path — the strongest form" while it drove a COMMITTED write
        // (`s2.set({token:'any'})` on an empty, writable path) and its status guard
        // was an EMPTY `if` block (`if (refusedPath?.status !== 'committed') { }`) —
        // a no-op.  The refusal path is now DRIVEN for real: the target path IS a
        // DIRECTORY, which is `§2.4` `R-4`'s own refusal class, so the receipt the
        // holder mutates carries BOTH closed members (`status` AND `reason`).
        const dir = join(baseDir, `${seq++}`)
        const path = join(dir, 'provident-security.json')
        await mkdir(dir, { recursive: true })
        await mkdir(path, { recursive: true }) // the real path IS a directory ⇒ every persist refuses (R-4)
        const s2 = createSecurityStore({ path })
        s2.set({ token: 'any' }) // the refusal this attempt reads
        const refusedPath = s2.lastWriteReceipt()
        assertReceiptShape(refusedPath, 'the refusal witness')
        if (refusedPath?.status !== 'refused') {
          throw new Error(`the refusal-path witness did not refuse (${JSON.stringify(refusedPath)}) — the mutation reading below has no refused copy to mutate (§2.4 R-4)`)
        }
        // TWO calls, then mutate the FIRST: they must not be the same object, and
        // the tier's own answer must be untouched by the mutation of a copy.
        const a = s2.lastWriteReceipt()
        const b = s2.lastWriteReceipt()
        if (a === b) throw new Error('two consecutive lastWriteReceipt() calls answered the SAME object on the REFUSAL path (§2.5 item 4(b))')
        const holder = a as unknown as { status: string; reason?: string }
        delete holder.reason
        holder.status = 'pwned'
        const next = s2.lastWriteReceipt()
        if (next === null) throw new Error('lastWriteReceipt() answered null after an attempt (PAR-10)')
        if ((next as Record<string, unknown>).status === 'pwned' || (next as Record<string, unknown>).reason !== 'write-failed') {
          throw new Error(`a holder’s mutation of the returned refusal REWROTE the tier’s own object (${JSON.stringify(next)}) — §2.5 item 4(b): the tier’s own receipt object is NEVER handed out`)
        }
        if ((next as Record<string, unknown>).reason === 'write-failed' && 'reason' in (a as object) === false) {
          // the mutation really did delete `reason` from the COPY (non-vacuity): the
          // tier's own answer still carries it.  Nothing further is owed here.
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
    // `PBT-8` (GATE-4 disposition: `PAR-NOTE`) — THE DECLARED LIMIT, stated rather
    // than claimed away: `O-3`'s COPY DISCIPLINE (§2.5 item 1) is "detached at every
    // depth, CYCLE-SAFE, prototype-safe", but `§6` `PAR-11` forbids a fourth/nested
    // record member ("a fourth member … FAILS"), so the CYCLE GUARD and the
    // at-every-depth half CANNOT be driven through this unit's declared surface: no
    // row here claims them.  What this reading covers is the closed three-member
    // shape — whose only non-primitive node is `enabled` — and `§2.5` item 2's own
    // structural claim ("depth-completeness is asserted STRUCTURALLY … so a later
    // record member that is itself an object is covered by construction") carries
    // the rest.  The `ADV-1` row drives an ACCESSOR PATCH — a write-path value, not
    // a record member — so it does not close this limit either.
    drive('P-O3-IM-2', '7 · the deep/prototype reading', () => {
      const rec = asRecord(store.get())
      const proto = Object.getPrototypeOf(rec)
      if (proto !== null) throw new Error(`get()'s copy's prototype is ${proto === Object.prototype ? 'Object.prototype' : String(proto)}, not null — §0A item 4 / §2.5 item 1`)
      const enabledProto = Object.getPrototypeOf(rec.enabled as object)
      // THE ARRAY HALF — CORRECTED AT THE KICK-BACK (`2026-10-11`, the supervisor's
      // ruling; spec `§9d` item 18, SPEC-FIX, outcome (a): THE TEST WAS MALFORMED).
      // `PBT-3` (gate 4) had over-read §0A item 4: it required
      // `Object.getPrototypeOf(rec.enabled) === null`, and the implementer MEASURED
      // that satisfying it breaks EIGHT rows of this same file (`TypeError:
      // enabled.push is not a function` / `pre.enabled is not iterable` at
      // `expectedPost()`).  THE PRECEDENT THE CONTRACT ITSELF CITES (§0 ruling 6,
      // `src/renderer/store-core-graph.ts:362-388` — the `G4-F5`/`G4-F6` amendment)
      // resolves it: `snapshotValue` builds OBJECTS with `Object.create(null)` and
      // returns `if (Array.isArray(candidate))` a REAL array `const out: unknown[] = []`.
      // So the discipline is: the RECORD and every nested OBJECT are null-prototype;
      // an ARRAY copy is a REAL array whose ELEMENTS are copied at depth.  A
      // null-prototype array has no `Array.prototype` — no iterator, no `.push`, no
      // `.includes` — so it is unusable by any consumer (§2.5 item 3's own
      // mutation-visibility control, which MUTATES the returned array, cannot hold
      // beside it).  THIS TERM NOW DRIVES THE OPERATIVE READING AND KEEPS ITS BITE:
      // a null-prototyped array copy FAILS it (no `Array.prototype`), while the
      // detachment it must keep is asserted by the mutation-visibility terms above
      // and by the `M-4` row below.
      if (enabledProto !== Array.prototype) {
        throw new Error(`get()'s \`enabled\` copy's prototype is ${enabledProto === null ? 'null' : String(enabledProto)}, not Array.prototype — §0A item 4's OPERATIVE reading (the snapshotValue precedent: arrays stay real arrays) with §2.5 item 1: the array copy is a REAL array whose elements are copied at depth`)
      }
      if (!Array.isArray(rec.enabled) || typeof (rec.enabled as string[]).push !== 'function' || typeof (rec.enabled as string[]).includes !== 'function') {
        throw new Error('get()\'s `enabled` copy is not a USABLE array (its iterator/push/includes are gone) — §0A item 4 (operative reading) forbids a null-prototype array')
      }
      // THE HOSTILE-`__proto__` FIXTURE — the copy discipline's own hazard, shown at
      // ONE node: a hostile key must ride as DATA, never as a prototype.  The
      // fixture is the module's own admitted hazard shape (§2.2 item 1 admits an
      // own `__proto__` data key as REPRESENTABLE; `F-4`'s `C-8` control drives it),
      // and its null-prototype copy is exactly the `snapshotValue`/
      // `Object.create(null)` build §0A item 4 declares.
      {
        const hostile: Record<string, unknown> = JSON.parse('{"__proto__":{"polluted":true}}')
        const hostileCopy: Record<string, unknown> = Object.create(null)
        hostileCopy.__proto__ = (hostile as Record<string, unknown>).__proto__
        if (Object.getPrototypeOf(hostileCopy) !== null || !Object.hasOwn(hostileCopy, '__proto__') || !Object.keys(hostileCopy).includes('__proto__')) {
          throw new Error('a hostile `__proto__` key did not ride as DATA on a null-prototype copy — the hazard §0A item 4 names')
        }
        if ((Object.prototype as unknown as Record<string, unknown>).polluted !== undefined) {
          throw new Error('the hostile fixture POLLUTED `Object.prototype` — the copy discipline failed')
        }
        // THE STORE'S OWN RECORD IS THE GUARDED NODE: the hostile fixture is driven at
        // `set()`'s declared domain, where it is REFUSED WHOLE-PATCH (§2.2 item 3 —
        // a non-array `groups`), and NOTHING of it enters; the record the store hands
        // out is then re-read and stays null-prototype and unpolluted.  (A drive of a
        // COMMITTED hostile patch is impossible by construction: `enabled`'s elements
        // are filtered to the five VALID_GROUPS strings, so no hostile object can
        // reach a record member — the fixture shows the mechanism, not a live path.)
        store.set({ groups: hostile as never })
        expect(store.lastWriteReceipt(), 'the hostile fixture driven at set() leaves the refused receipt (§0A item 1)').toEqual({ status: 'refused', reason: 'write-failed' })
        expect(Object.getPrototypeOf(store.get()), 'and the record the store hands out is STILL null-prototype').toBeNull()
        expect((Object.prototype as unknown as Record<string, unknown>).polluted, 'and `Object.prototype` is untouched by the drive').toBeUndefined()
      }
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
    // row counts ONE attempt for the class, so the sweep rides inside it).  The
    // FOUR declared arms (`0` · `-3` · `NaN` · `null`) are the DECLARED CLEAR
    // (`undefined`); PAR-3's own declared boundary value `0.5` is read as its
    // clause declares it — "a positive number below `1` … ADMITTED, floored to
    // `0`" (§2.2 item 3 / §6 PAR-3's OUTSIDE column), i.e. the coercion's own
    // landed `0`, which is NOT the clear.
    {
      const { store } = await makeStore()
      probe(store)
      for (const v of [0, -3, NaN, null] as const) {
        resetFsLog()
        assertNoThrow(() => store.set({ maxJournalLength: v }), `class 7 sweep: ${String(v)}`)
        const r = store.lastWriteReceipt()
        if (r?.status !== 'committed' || store.get().maxJournalLength !== undefined) {
          const row = rowById('P-O2-TP-1')
          row.held -= 1
          row.broken += 1
          row.failure = `class 7 sweep: maxJournalLength ${String(v)} did not land the declared CLEAR (receipt ${JSON.stringify(r)}, cap ${String(store.get().maxJournalLength)}; §2.2 item 3 / PAR-3: 0 · -0 · a negative number · NaN · null ALL clear)`
          break
        }
      }
      // PAR-3's declared boundary value, read AS THE CLAUSE DECLARES IT: `0.5` is
      // ADMITTED and FLOORS TO `0` — the coercion's own value, never the clear.
      resetFsLog()
      assertNoThrow(() => store.set({ maxJournalLength: 0.5 }), 'class 7 sweep: 0.5')
      if (store.lastWriteReceipt()?.status !== 'committed' || store.get().maxJournalLength !== 0) {
        const row = rowById('P-O2-TP-1')
        row.held -= 1
        row.broken += 1
        row.failure = `class 7 sweep: maxJournalLength 0.5 must be ADMITTED and FLOORED TO 0 (cap ${String(store.get().maxJournalLength)}, receipt ${JSON.stringify(store.lastWriteReceipt())}) — §6 PAR-3's OUTSIDE column and §2.2 item 3: "a positive number below 1 … ADMITTED, floored to 0"; the CLEAR arm is 0 · -0 · a negative number · NaN · null on the INPUT, and 0.5 is not one of them`
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

    // (a) the member census + the "a SIXTH value-returning member fails" control.
    /* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (4)): the declared census is the FIVE
     * the tier now carries — `get · lastWriteReceipt · readEntry · set · writeEntry`
     * (`5 = 3 + 2`, S2 `§2.1` item 3 / `§7b` row 3's declaration to this unit). The term
     * moved `3 → 5`; the BITE did not move (an added, renamed or removed member still
     * throws, and the added case is now the SIXTH member).** */
    drive('P-O3-TP-1', '(a) the key-list reading', () => {
      memberCensusOf(store)
      if (Object.keys(store).length !== MEMBER_CENSUS.length) throw new Error(`the returned object has ${Object.keys(store).length} members; the declared read-surface census is ${MEMBER_CENSUS.length} (\`5 = 3 (landed) + 2 (S2's readEntry · writeEntry)\`, S2 §2.1 item 3)`)
    })
    drive('P-O3-TP-1', '(a) the "a sixth value-returning member FAILS" control', () => {
      let fired = 0
      for (const wrong of [[...MEMBER_CENSUS, 'inspect'], MEMBER_CENSUS.slice(0, 2), ['get', 'setReceipt', 'set']]) {
        try {
          memberCensusOf(Object.fromEntries(wrong.map((k) => [k, () => undefined])))
        } catch {
          fired += 1
        }
      }
      if (fired !== 3) throw new Error(`the census detector fired on only ${fired}/3 wrong states (a 6-member shape, a 2-member shape, a renamed member) — a detector that cannot fail proves nothing (F-11)`)
    })
    // (b) the export census + the "no new name" reading.
    /* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (4)'s row): the census is the DECLARED
     * SEVEN — this unit's four landed names plus `S2` `§2.1` item 3's three declared types
     * (`Tier4Entry` · `Tier4WriteAnswer` · `Tier4ClosedRefusal`). SET-EQUALITY keeps the bite:
     * the non-vacuity drive below adds an EIGHTH name and the extractor must see it.** */
    drive('P-O3-TP-1', '(b) the export list', () => {
      const found = [...moduleSrc.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
      const uniq = [...new Set(found)].sort()
      if (uniq.join(',') !== [...MODULE_EXPORTS].sort().join(',')) {
        throw new Error(`the module's exports are ${JSON.stringify(uniq)}; the DECLARED census is ${JSON.stringify([...MODULE_EXPORTS].sort())} (\`§2.1\` item 1's four landed names + \`S2\` \`§2.1\` item 3's three declared types: no new export, no rename, no removal)`)
      }
    })
    drive('P-O3-TP-1', '(b) the "no new name" reading — the extractor is not vacuous', () => {
      const mutant = moduleSrc + '\nexport function inspectStore(): void {}\n'
      const found = [...mutant.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
      if (!found.includes('inspectStore')) throw new Error('the export extractor did not detect an ADDED export name — the "no new name" reading would be vacuous')
      if ([...new Set(found)].sort().join(',') === [...MODULE_EXPORTS].sort().join(',')) throw new Error('the census still matched after an EIGHTH export name was added — the set-equality reading cannot bite')
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
    await driveAsync('P-O3-TP-1', '(c) the diff-scope file set — the denied paths are read, not merely named', async () => {
      const digest = sha('a control subject that is not the frozen module')
      if (digest === '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450') {
        throw new Error('the sha256 pin matched a different subject — the pin comparison is vacuous')
      }
      // `PBT-4` (GATE-4 correction): as filed this part was a GREP for the two IPC
      // NAMES plus `toBeTruthy()`-shaped reads, so an edit INSIDE `main.ts`'s handler
      // bodies, inside `preload.ts`'s `security` member set, or anywhere in
      // `src/shared/**` did NOT redden it — a scope check that could not fail.
      // Every denied path is now read at its DECLARED CONTENT: the two handler
      // bodies' declared shapes (§0A item 5's carriers), the preload member set's
      // declared `2 → 3` signature shape, and `src/shared/types.ts`'s declared
      // `SecuritySettings` member census.  CORRECTED (the earlier note read
      // *"byte-identity is NOT claimable here — that file moves under other units —
      // so the declared SHAPE is pinned instead"*, which `F-2`'s pin REFUTES):
      // `types.ts` is one of the three DENIED paths below and IS byte-pinned at its
      // measured digest `29af4efa…`, so byte-identity IS claimed — the census read here
      // is the ADDITIONAL structural reading beside the pin, and the pin moves only by
      // the authorized-diff re-point discipline stated below (an authorized diff
      // re-points it in the same pass that names its authority; an unauthorized diff
      // finds this row red).
      /* **⟶ RE-GRAINED `2026-10-11` (`S2` `U-TIER4-ARBITRARY-STORAGE`'s AUTHORIZED carrier
       * movement, `§5.1` item 1's allowed-edit-set items (2) `src/main/main.ts` and (4)
       * `src/main/preload.ts` — the row's OWN stated discipline: *"an AUTHORIZED diff
       * re-points the pin in the same pass that moves the file and names the authority; an
       * unauthorized diff finds this row red"*).** What moved, and what each reading now
       * asserts: **(i)** `main.ts`'s GET carrier composes the SAME record with the SAME two
       * additive members, but the boolean is now read OFF THE STATIC HOLDER
       * (`tier4OpenState()`, `S2` `§2.4` item 7's amendment) instead of the live gate's
       * accessor — so the detector reads the DECLARED MEMBER SET (`read:` + `exclusion:`)
       * plus the declared SOURCE, never the superseded spelling; **(ii)** `preload.ts`'s SET
       * declaration reads `write: Tier4WriteAnswer` (the declared superset, `S2` `§2.1` item
       * 8 / `PAR-10`); **(iii)** the two MOVED denied-path pins are re-pointed to this
       * landing's bytes, each with its cause named, while `src/shared/types.ts` keeps its
       * UNMOVED pin. THE BITE IS UNMOVED: a carrier that dropped either additive member, a
       * SET handler that stopped passing the raw `patch`, a `write` member minted from
       * anything else, or a byte move in ANY of the three files still reddens.**
       * `F-2` (GATE-4 RE-AUDIT): everything above this line is STRUCTURAL — regexes
       * over the three denied files' DECLARED shapes — so an edit OUTSIDE the two
       * handler bodies, outside the preload `security` member set and outside the
       * `SecuritySettings` member census (one added line anywhere else in any of the
       * three files) reddened NOTHING: the diff-scope check had a hole exactly the
       * width of the files it denies.  The three denied files are now BYTE-PINNED at
       * their MEASURED digests BESIDE the regexes, so a real edit outside the allowed
       * set reddens this row (`§5.6.1` row 9 part (c): "the diff scope holds
       * (`src/main/security-store.ts` + this unit's own files, with
       * `src/main/main.ts`, `src/main/preload.ts` and `src/shared/**` unmoved)";
       * `§1.3` items 5/7; `§0A` item 5; `§3.2` `F-12`). */
      const typesSrc = await readFile(SRC('shared', 'types.ts'), 'utf8')
      const getHandler = /ipcMain\.handle\(IPC_SECURITY_GET,[\s\S]*?\n  \}\)/.exec(mainSrc)?.[0] ?? ''
      const setHandler = /ipcMain\.handle\(IPC_SECURITY_SET,[\s\S]*?\n  \}\)/.exec(mainSrc)?.[0] ?? ''
      if (getHandler === '') throw new Error('the IPC_SECURITY_GET handler is absent from main.ts — the recorded carrier has no subject (§0A item 5)')
      if (setHandler === '') throw new Error('the IPC_SECURITY_SET handler is absent from main.ts — the recorded carrier has no subject (§0A item 5)')
      // (i) the GET carrier: BOTH additive members, over the deep copy of `get()`, with the
      //     boolean read off the DECLARED holder source (`S2` `§2.4` item 7's amendment).
      if (!/return\s*\(\s*\{\s*\.\.\.liveSecurityRecord\(\)/.test(getHandler) && !/\{\s*\.\.\.securityStore\.get\(\)/.test(getHandler)) {
        throw new Error('the GET response no longer carries the record over a deep copy of the store read (`liveSecurityRecord()` / `...securityStore.get()`): `§0A` item 5 records the carrier as COMPOSED FROM THE STORE READ (a change to that class IS a forbidden diff — F-12)')
      }
      for (const member of ['read:', 'exclusion:']) {
        if (!getHandler.includes(member)) throw new Error(`the GET response no longer carries the declared additive \`${member}\` member (\`§0A\` item 5's recorded carrier, re-grained for \`S2\` \`§2.4\` item 7)`)
      }
      if (!/tier4OpenState\(\)/.test(getHandler)) {
        throw new Error('the GET carrier no longer reads the ONE boolean off the STATIC HOLDER (`tier4OpenState()`, `S2` `§2.4` item 7 / `§0A` item 1) — the boolean is NEVER routed through a store read')
      }
      if (!/const updated = \{\s*\.\.\.securityStore\.set\(patch\),\s*write:\s*securityStore\.lastWriteReceipt\(\)\s*\}/.test(setHandler)) {
        throw new Error('the SET response no longer carries the declared `write` member minted from `lastWriteReceipt()` on the SAME record (§0A item 5; F-12)')
      }
      if (!/return updated/.test(setHandler)) throw new Error('the SET handler no longer returns its `updated` record — the carrier’s declared resolution moved (§0A item 5)')
      if (!/ipcMain\.handle\(IPC_SECURITY_SET[\s\S]*?securityStore\.set\(patch\)/.test(setHandler)) {
        throw new Error('the SET handler no longer calls `securityStore.set(patch)` at its declared site — §5.1 item 4 records the handler as UNMOVED')
      }
      // the DECLARED carrier boundary: the handler may pass ONLY the patch it was
      // given to `set()` (the re-gate clause of §5.1 item 4) — a handler that
      // rewrote, merged or re-read the record before the call would be a boundary
      // move and is read here.
      if (/securityStore\.set\((?!patch\))/.test(setHandler)) {
        throw new Error('the SET handler hands `set()` something OTHER than the caller’s `patch` — the raw-patch passthrough of §5.1 item 4 moved (the re-gate class is `S2`’s, not this unit’s)')
      }
      // preload.ts's `security` member set at its DECLARED content.
      const securityBlock = /security:\s*\{[\s\S]*?\n    \},/.exec(preloadSrc)?.[0] ?? ''
      if (securityBlock === '') throw new Error('src/main/preload.ts’s `security` member set is not readable at its declared site (§0A item 5)')
      for (const member of ['get()', 'set(patch', 'setExclusion(']) {
        if (!securityBlock.includes(member)) throw new Error(`src/main/preload.ts’s \`security\` member set no longer declares \`${member}\` — the bridge’s declared shape moved (§0A item 5)`)
      }
      if (!/Promise<SecuritySettings & \{ write: Tier4WriteAnswer \}>/.test(securityBlock)) {
        throw new Error('the preload `security.set` resolution no longer declares the additive `write` superset in its LANDED spelling (`write: Tier4WriteAnswer` — the declared superset that CONTAINS `SecurityWriteReceipt`, `S2` `§2.1` item 8 / `PAR-10`) — the bridge’s declared shape moved (§0A item 5 / §2.3 item 2)')
      }
      // `src/shared/types.ts`'s `SecuritySettings` member census (the shape §1.3
      // item 7 pins as byte-identical for THIS unit; read as a census so the check
      // is real rather than a readability grep).
      const iface = /export interface SecuritySettings\s*\{([\s\S]*?)\n\}/.exec(typesSrc)?.[1] ?? ''
      if (iface === '') throw new Error('`SecuritySettings` is not readable in src/shared/types.ts at its declared site (§1.3 item 7)')
      const members = [...iface.matchAll(/^\s{2}([A-Za-z_$][\w$]*)\??:/gm)].map((m) => m[1]).sort()
      if (members.join(',') !== 'enabled,maxJournalLength,token') {
        throw new Error(`SecuritySettings' declared members read ${JSON.stringify(members)}; the closed three-member shape is §1.3 item 7's (token · enabled · maxJournalLength)`)
      }
      if (/unrepresentable-value|secure-refused/.test(moduleSrc)) {
        throw new Error('a second refusal token appeared in src/main/security-store.ts — §1.3 item 3 (a COLLISION finding)')
      }
      if (/export\s+function\s+representableValue/.test(moduleSrc)) {
        throw new Error('the admission predicate was EXPORTED (§2.2 item 1: module-internal, never exported)')
      }
      // `F-2` (GATE-4 RE-AUDIT): everything above this line is STRUCTURAL — regexes
      // over the three denied files' DECLARED shapes — so an edit OUTSIDE the two
      // handler bodies, outside the preload `security` member set and outside the
      // `SecuritySettings` member census (one added line anywhere else in any of the
      // three files) reddened NOTHING: the diff-scope check had a hole exactly the
      // width of the files it denies.  The three denied files are now BYTE-PINNED at
      // their MEASURED digests BESIDE the regexes, so a real edit outside the allowed
      // set reddens this row (`§5.6.1` row 9 part (c): "the diff scope holds
      // (`src/main/security-store.ts` + this unit's own files, with
      // `src/main/main.ts`, `src/main/preload.ts` and `src/shared/**` unmoved)";
      // `§1.3` items 5/7; `§0A` item 5; `§3.2` `F-12`).
      //
      // THE PIN'S DISCIPLINE, stated so a later authorized change is not confused
      // with a violation: these are the BYTES AT THIS PASS, and the precedent for
      // moving one is the sibling unit's re-point (`S1`'s `SECURITY_STORE_PIN`
      // annotation beside the as-filed digest) — an AUTHORIZED diff re-points the pin
      // in the same pass that moves the file and names the authority; an unauthorized
      // diff finds this row red.
      //
      // **⟶ RE-POINTED `2026-10-11`, each cause named in ONE LINE (`S2`
      // `U-TIER4-ARBITRARY-STORAGE`, `§5.1` item 1's allowed-edit-set items (2) and (4);
      // `RCA-8(d)`: the as-filed pins above STOOD from this unit's landing until then).**
      // `src/main/main.ts` `4be1af5a…` → `0c0c3c9f…`: the GET carrier's boolean is now read
      // OFF THE STATIC HOLDER (`tier4OpenState()`) and the record carries the additive `read`
      // member BESIDE `exclusion` (`S2` `§2.4` items 7/8). `src/main/preload.ts` `83bdbe81…`
      // → `fa4a142f…`: the two declaration sites' additive members are now typed
      // (`read: Tier4ClosedRefusal | null`, `write: Tier4WriteAnswer`, `S2` `§2.1` item 8).
      // `src/shared/types.ts` is **UNMOVED** and keeps its pin — the widening is an
      // INTERSECTION at the declaration sites, never an edit to the shared type.
      const deniedPaths: Array<{ label: string; rel: string[]; pin: string }> = [
        { label: 'src/main/main.ts', rel: ['main', 'main.ts'], pin: '0c0c3c9f28634d1f1c8342c658649b97c0b8959bc35c866a1cf77e40618e125e' },
        { label: 'src/main/preload.ts', rel: ['main', 'preload.ts'], pin: 'fa4a142f6362c55bf8a4b7a800574231e7212b4dc1b056eb1eda3168030545ac' },
        { label: 'src/shared/types.ts', rel: ['shared', 'types.ts'], pin: '29af4efaf16a5cadf1ac22b63afda063495ce63ec95b56f1f6e397da1d8189c6' },
      ]
      for (const entry of deniedPaths) {
        const bytes = await readFile(SRC(...entry.rel))
        const digest = sha(bytes)
        if (digest !== entry.pin) {
          throw new Error(
            `${entry.label} reads ${digest} (${bytes.length} bytes) — NOT the pinned ${entry.pin}.  A byte of a DENIED path moved: the diff scope of §5.6.1 row 9 part (c) is src/main/security-store.ts + this unit's own files, and a change to any CARRIER of the channel is a forbidden diff (§0A item 5 / §1.3 item 7 / F-12)`,
          )
        }
      }
      // CONTROL (a): the pins are three DISTINCT digests — a copied digest that
      // pinned two files at once (or an accidental self-comparison) cannot pass.
      if (new Set(deniedPaths.map((e) => e.pin)).size !== deniedPaths.length) {
        throw new Error('two denied-file pins carry the SAME digest — the pin comparison would be vacuous for one of them')
      }
      // CONTROL (b): the comparison CAN fail — a one-byte-moved copy of each denied
      // file's own bytes must NOT answer its pin (so a green here is evidence about
      // the file, not about the string).
      for (const entry of deniedPaths) {
        const moved = sha((await readFile(SRC(...entry.rel))).toString('utf8') + '\n')
        if (moved === entry.pin) {
          throw new Error(`a one-byte-moved copy of ${entry.label} answered its pin — the pin comparison cannot fail and proves nothing`)
        }
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
    expect(results.find((r) => r.id === 'P-O3-TP-1')?.attempts, "P-O3-TP-1 executes EXACTLY its declared 8 attempts (§5.6.1: 4 parts × 2 readings).  INSTRUMENT NOTE (`PBT-2`, GATE-4 correction): §2.5 item 3's census is read AS A SET — the clause's own leading words and §3.2 F-11's *\"`Object.keys(store)` must be **set-equal** to …\"* — because §9 item 5(b) has already DECLARED a source-order reading NOT DERIVABLE from this contract (the clause names `[\"get\",\"lastWriteReceipt\",\"set\"]` as a SET and calls it \"the landed order\", while the landed literal answered `[\"get\",\"set\",\"lastWriteReceipt\"]`).  The instrument note as filed asserted the pre-reorder order; it is corrected to the operative reading, and the SET reading still fails on a member ADDED, RENAMED or REMOVED (the part (a) control drives all three).").toBe(8)
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
    expect(await entryExists(`${path}.tmp`), 'M-1 — NO `${path}.tmp` remains (§2.3 item 4(a))').toBe(false)
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
    // §2.2 item 3: for `groups`/`disable` the array is "filtered through the five
    // VALID_GROUPS …, deduplicated, with current-state order preserved", and
    // PAR-4's domain is the set to ENABLE — so the patch is ADDITIVE over the
    // current set.  `probe()`'s own `groups:['read']` cannot remove anything, so
    // the pre-state is `['read','dispatch']` (§2.1 item 2's first-run default,
    // which M-1/M-7 assert), and the patch's deduped+filtered `['code']` is
    // APPENDED to it.
    expect(store.get().enabled, 'M-5 — §2.2 item 3: the patch dedups and filters to the added code group, appended in current-state order (additive over the pre-state first-run default)').toEqual(['read', 'dispatch', 'code'])
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
    expect(store.get().maxJournalLength, 'PAR-3 — ADMITTED and FLOORED TO 0: "a finite positive number is Math.floor-ed", so the landed post-state is the coercion’s own 0 (§2.2 item 3), never the clear').toBe(0)
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
      const out = assertNoThrow(() => store.set({ token: 'x', maxJournalLength: 55 }), 'F-1(ii)')
      const postBytes = await rawBytes(path)
      await chmod(dir, 0o700)
      // `KB-7` (corrected at the kick-back): `set()`'s RETURN is read as the RECORD —
      // `§2.1` item 3 step 6 declares it `this.get()` and `§2.5` item 3 declares it
      // "`set(patch)` → `this.get()`, i.e. the same deep detached record (the pre-write
      // one on a refusal)"; `§6` `PAR-11` forbids a fourth record member, so no return
      // value can be both a record and a receipt.  The RECEIPT is read from
      // `lastWriteReceipt()` (§2.1 item 7), which is the member that answers it.
      expect(store.lastWriteReceipt(), 'F-1(ii) — the RECEIPT is the refused form (`lastWriteReceipt()`, §2.1 item 7)').toEqual({ status: 'refused', reason: 'write-failed' })
      expect(snapshot(asRecord(store.get())), 'F-1(ii) — the pre-write record').toBe(snapshot(pre))
      expect(snapshot(asRecord(out)), 'F-1(ii) — set()’s RETURN is the pre-write RECORD (§2.1 item 3 step 6)').toBe(snapshot(pre))
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
      const out = assertNoThrow(() => store.set({ token: 'E2-LIVE-OPERATOR-WRITE', maxJournalLength: 55 }), 'F-1(iii)')
      // `KB-7` (the same malformed reading as (ii)): the receipt is read from
      // `lastWriteReceipt()` (§2.1 item 7); `set()`'s return is the RECORD
      // (§2.1 item 3 step 6), and on this refusal it is the PRE-WRITE record.
      expect(store.lastWriteReceipt(), 'F-1(iii) — the RECEIPT of this attempt is the refused form (§2.1 item 7)').toEqual({ status: 'refused', reason: 'write-failed' })
      expect(snapshot(asRecord(store.get())), 'F-1(iii) — the record is the pre-write record, NOT the measured E2 leak').toBe(snapshot(asRecord(pre)))
      expect(snapshot(asRecord(out)), 'F-1(iii) — set()’s RETURN is the pre-write RECORD (§2.1 item 3 step 6 / §2.5 item 3)').toBe(snapshot(asRecord(pre)))
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
      expect(await entryExists(`${path}.tmp`), `F-2 ${f.label} — no ${'{path}.tmp'} residue`).toBe(false)
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
    expect(await entryExists(`${path}.tmp`), 'F-9 — no `${path}.tmp` may be created').toBe(false)
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
    // ---- THE CENSUS IS READ AS A **SET**, NOT IN SOURCE ORDER (`§9` item 5(b) ·
    // `§9d` item 3 · `PBT-2`).  `§2.5` item 3 says `Object.keys(createSecurityStore(
    // {path}))` is *"EXACTLY `["get","lastWriteReceipt","set"]`"* and in the same breath
    // calls it *"in the landed order"* — **the two halves CANNOT BOTH HOLD**, and **"a
    // source-order reading is NOT DERIVABLE from this contract"** (`§9` item 5(b)'s
    // filed resolution; the landed literal answered `["get","set","lastWriteReceipt"]`
    // until the non-behavioural reorder `§9b` item 1 records, which this row neither
    // requires nor forbids).  The operative reading is the SET reading — exactly how the
    // falsifier `§3.2` `F-11` phrases it: *"`Object.keys(store)` must be **set-equal** to
    // `["get","lastWriteReceipt","set"]`"*.  NO clause of this contract pins an order, so
    // NO order is asserted here: a behaviour-preserving reorder must NOT redden this row.
    const census = memberCensusOf(store) // set-equality against MEMBER_CENSUS is enforced inside; an ADDED, RENAMED or REMOVED member throws there
    expect(new Set(census).size, 'F-11 — every member name appears EXACTLY ONCE').toBe(census.length)
    /* **⟶ RE-GRAINED `2026-10-11` (`S2` kick-back item (4), `RCA-8(d)` annotate-beside: the
     * as-filed three-member reading stands above as this row's own record).** The declared
     * read surface is the FIVE `S2` `U-TIER4-ARBITRARY-STORAGE` carries BY DECLARATION:
     * `get · lastWriteReceipt · readEntry · set · writeEntry` (`5 = 3 (landed) + 2 (new)`,
     * S2 `§2.1` item 3 / `§5.1` item 4's census table row 2 / `§7b` row 3's declaration to
     * this unit). Read AS A SET, as before — NO order is pinned, and the term's bite is
     * unmoved: an ADDED member (now the SIXTH), a RENAMED one or a REMOVED one all still
     * redden, driven by the controls below and by `P-O3-TP-1` part (a). */
    expect([...census].sort(), 'F-11 — SET-EQUAL to the FIVE declared members (`S2` §2.1 item 3 read as a SET, this unit\'s `§2.5` item 3 census moved `3 → 5` by declaration; `§9` item 5(b): the order half is not derivable)').toEqual([...MEMBER_CENSUS].sort())
    expect(Object.keys(store).length, 'F-11 — a SIXTH value-returning member FAILS').toBe(5)
    // CONTROLS — the SET terms are not vacuous, and the row keeps its bite on all three
    // failure states.  A DUPLICATE own key is unrepresentable in `Object.keys` output
    // (own keys are unique by definition), so the duplicate state is driven where it IS
    // reachable — a census/declaration carrying a repeated name; a MISSING member and a
    // RENAMED one throw inside `memberCensusOf()` (`P-O3-TP-1` part (a) drives all three).
    const duplicated = [...MEMBER_CENSUS, 'get']
    const fourth = [...MEMBER_CENSUS, 'inspect'] // RE-GRAINED `2026-10-11`: the ADDED case is now the SIXTH member
    const removed = MEMBER_CENSUS.slice(0, 2)
    const asSet = (names: readonly string[]): string => [...names].sort().join('|')
    expect(
      [
        new Set(duplicated).size !== duplicated.length, // the "exactly ONCE" term
        asSet(duplicated) !== asSet(MEMBER_CENSUS), // the SET term is not a silent DEDUP
        asSet(fourth) !== asSet(MEMBER_CENSUS), // an ADDED member (the SIXTH, over the declared five)
        asSet(removed) !== asSet(MEMBER_CENSUS), // a REMOVED member
      ],
      'F-11 CONTROL — the SET terms FIRE on a duplicate, an ADDED (sixth) member and a missing member (a detector that cannot fail proves nothing)',
    ).toEqual([true, true, true, true])
    const moduleSrc = await readFile(SRC('main', 'security-store.ts'), 'utf8')
    const found = [...moduleSrc.matchAll(/^export\s+(?:type\s+|interface\s+|function\s+|const\s+)?([A-Za-z_$][\w$]*)/gm)].map((m) => m[1])
    expect([...new Set(found)].sort(), 'F-11 (RE-GRAINED `2026-10-11`) — the export census is the DECLARED SEVEN: the four names this unit landed (`§2.1` item 1) plus `S2` `§2.1` item 3\'s three declared types (`Tier4Entry` · `Tier4WriteAnswer` · `Tier4ClosedRefusal`); SET-EQUALITY keeps the bite, so an ADDED, RENAMED or REMOVED name still reddens').toEqual([...MODULE_EXPORTS].sort())
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

  /* ==========================================================================
   * `ADV-1` (GATE 4, severity HIGH, disposition `HOST-FIX`) — THE ACCESSOR /
   * PROXY PATCH THAT DEFEATS THE ADMISSION BY A LATE READ.
   *
   * THE FINDING (gate 4's advisory pass): the host reads each DECLARED member of
   * the caller's patch object MANY TIMES — MEASURED at the landed bytes
   * (`460fb66`/`0d36c46`): `maxJournalLength` is read `7` times and `token` `5`
   * times through the `set()` call.  A patch whose member is an ACCESSOR (or a
   * Proxy) therefore presents DIFFERENT VALUES to different reads, and the
   * admission's guards inspect one read while the candidate is computed from
   * another: a LATE read returning `Infinity` passes `> 0` and reaches
   * `Math.floor` (`Math.floor(Infinity) === Infinity`), so the tier answers a
   * `{status:'committed'}` receipt with an `Infinity` cap LIVE while the file —
   * `JSON.stringify` turning a non-finite number into `null` — carries a `null`
   * cap.  That is the exact live-versus-durable divergence this unit exists to
   * close (`§1.2` item 1's measured `SC-E-01`/`SC-E-02` class), re-opened through
   * the caller's object rather than through the filesystem.  A `token` accessor
   * whose late read returns a `BigInt` walks the SAME hole from the other side:
   * the `typeof === 'string'` test sees a `Symbol`/`BigInt` on the late read and
   * clears the member, so a `committed` receipt answers while the file carries a
   * `null` the pre-write record does not carry.
   *
   * THE CONTRACT'S REQUIREMENT, WHICH THIS ROW ASSERTS (the operative clauses):
   *   · `§2.3` item 7 / `I-1` (`§3.3` item 1) — *"LIVE STATE EQUALS DURABLE
   *     STATE … a live record that carries a value the file does not hold IS THE
   *     DEFECT THIS UNIT REPAIRS"*, in EITHER direction;
   *   · `§2.2` item 1 — the predicate is TOTAL and answers NOT representable for
   *     every unrepresentable value, `Infinity` included; `§2.1` item 3 step 1 —
   *     *"A patch containing any unrepresentable value is REFUSED HERE,
   *     whole-patch … no filesystem call is made"*;
   *   · `§2.2` item 2 — *"the admitted-and-persisted value equals the value the
   *     caller supplied"*;
   *   · the decisions row's follow-up block, verbatim: *"Live state equals durable
   *     state"*.
   *
   * THE SHAPE OF THE ASSERTION IS IMPLEMENTATION-AGNOSTIC ON PURPOSE: the row
   * drives the accessor and requires that the tier's live record and the file
   * AGREE member for member (whatever value the host settles on), that the record
   * never carries a value the contract declares unrepresentable, and that a
   * refusal is a no-op on both.  The current bytes FAIL all three for BOTH
   * fixtures — this row is RED against the landed bytes (the implementer greens it
   * next, by reading each declared member ONCE and admitting that single reading).
   *
   * REGISTER NOTE: this row is a BEHAVIOURAL row and sits OUTSIDE the `§5.6.1`
   * register's `118` declared attempts — it adds no attempt to any register row and
   * changes no term, row id, cap or subtotal, because ADV-1 arrived AFTER the
   * register was authored and a register amendment is the architect's cell to move
   * (the amendment owed is stated in `§9d`).
   * ======================================================================== */

  it('ADV-1 (gate 4, HIGH, HOST-FIX) · a LATE accessor/proxy read must not defeat the admission — the tier’s live record may never carry a value the file does not hold', async () => {
    // TERM 1 — the `maxJournalLength` accessor: representable for the admission's
    // own reads, `Infinity` on a LATE read (the 6th, past the `> 0` guard).
    {
      const { store, path } = await makeStore()
      probe(store)
      const pre = asRecord(store.get())
      const preBytes = await rawBytes(path)
      resetFsLog()
      let reads = 0
      const patch: Record<string, unknown> = {
        get maxJournalLength(): number {
          reads += 1
          return reads >= 6 ? Infinity : 42
        },
      }
      let out: unknown
      let threw: string | null = null
      try {
        out = store.set(patch as never)
      } catch (e) {
        threw = (e as Error).message
      }
      const receipt = store.lastWriteReceipt()
      const live = store.get()
      const afterBytes = await rawBytes(path)
      expect(threw, 'ADV-1(1) — a declared member must never throw on a late-read accessor (I-4 / §2.3 item 1)').toBeNull()
      // (a) THE TIER'S OWN INVARIANT: the live record and the file agree.
      expect(
        recordDivergence(live, afterBytes, 'ADV-1(1) the maxJournalLength accessor'),
        'ADV-1(1) — LIVE MUST EQUAL DURABLE (I-1 / §2.3 item 7).  On the landed bytes the receipt answers committed with `<Infinity>` LIVE while the file (JSON.stringify’s non-finite → null) carries null — the exact divergence this unit exists to close, re-opened by the caller’s accessor',
      ).toBeNull()
      // (b) and the live record never carries a value the contract declares
      // unrepresentable (§2.2 item 1): `Infinity` is NOT representable, and §2.2
      // item 3's admissible arm for this member is the documented clear (`null`) or
      // the finite positive number.
      expect(
        REPRESENTABLE(live.maxJournalLength === undefined ? null : live.maxJournalLength),
        'ADV-1(1) — the live cap reads ' + String(live.maxJournalLength) + '; a value the tier cannot persist as JSON must not be ACCEPTED (§2.2 item 1 / I-2 — the Infinity divergence’s own fixture)',
      ).toBe(true)
      // (c) the write must be REFUSED (the contract's declared answer for an
      // unrepresentable value) OR — if the host legitimately commits — the committed
      // value must be the one the file carries, and no filesystem call may be made
      // for a refusal.
      if (receipt?.status === 'refused') {
        expect(assertReceiptShape(receipt, 'ADV-1(1)'), 'ADV-1(1) — a refusal is the closed two-form receipt').toBeUndefined()
        expect(snapshot(asRecord(store.get())), 'ADV-1(1) — a refusal is a no-op on the record (§2.2 item 5(d))').toBe(snapshot(pre))
        expect(bytesSnapshot(afterBytes), 'ADV-1(1) — a refusal is a no-op on the file (§2.2 item 5(c))').toBe(bytesSnapshot(preBytes))
        expect(fsActivity(), 'ADV-1(1) — an admission refusal touches NO file (§0A item 3 / F-9)').toEqual([])
      } else {
        expect(snapshot(asRecord(store.get())), 'ADV-1(1) — a committed write’s record is the supplied value’s declared coercion (§2.2 item 2)').toBe(snapshot(expectedPost(pre, { maxJournalLength: 42 })))
        expect(snapshot(asRecord(out)), 'ADV-1(1) — set() returns the record now live (§2.1 item 3 step 6)').toBe(snapshot(asRecord(store.get())))
      }
      // THE CONTROL (`PBT-`style non-vacuity): the fixture really does present
      // DIFFERENT values to different reads — so the exposure above is about reads,
      // not about a literal.
      expect(reads, 'ADV-1(1) — CONTROL (a): the host made this many reads of the member through the whole set() call (the post-`ADV-1` single-read discipline)').toBe(1)
      // CONTROL (b) — `F-6` (GATE-4 RE-AUDIT).  Control (a) alone does NOT self-verify
      // that the fixture WOULD have answered differently: a fixture answering `42` on
      // EVERY read also satisfies `reads === 1`, and then the row would prove nothing
      // about LATE reads (`REGISTER-CONTROL` is the model — its detector is driven
      // against a falsified property as well as a satisfied one).  The fixture's
      // late-read arm (`reads >= 6`) is therefore DRIVEN directly: the same accessor is
      // read until it crosses its own threshold, and it must answer `Infinity` — the
      // exact unrepresentable value the host's five-or-more-reads shape handed to
      // `Math.floor` and admitted under a `committed` receipt.
      const lateReads: unknown[] = []
      for (let i = 0; i < 5; i++) lateReads.push(patch.maxJournalLength)
      expect(lateReads.slice(0, 4), 'ADV-1(1) — CONTROL (b): the fixture’s EARLY reads answer the representable supplied value (the exposure is not a literal)').toEqual([42, 42, 42, 42])
      expect(lateReads[4], 'ADV-1(1) — CONTROL (b): the fixture’s LATE read (its 6th) answers `Infinity` — the value `§2.2` item 1 declares NOT representable, and the value a multiple-read host admitted').toBe(Infinity)
      expect(reads, 'ADV-1(1) — CONTROL (b): the host’s 1 read plus this control’s 5 = 6 total reads of the member').toBe(6)
    }
    // TERM 2 — the `token` accessor: a `BigInt` on the late read (the `typeof ===
    // 'string'` test's own read).  The same hole, entered from the other side: the
    // landed bytes answer a `committed` receipt while the member is CLEARED, so the
    // file carries a `null` the pre-write record does not carry.
    {
      const { store, path } = await makeStore()
      store.set({ token: 'PRE-KEEP' })
      const pre = asRecord(store.get())
      const preBytes = await rawBytes(path)
      resetFsLog()
      let tReads = 0
      const patch: Record<string, unknown> = {
        get token(): unknown {
          tReads += 1
          return tReads >= 3 ? (BigInt(9) as never) : 'NEW-TOKEN'
        },
      }
      let threw: string | null = null
      let out: unknown
      try {
        out = store.set(patch as never)
      } catch (e) {
        threw = (e as Error).message
      }
      const receipt = store.lastWriteReceipt()
      const live = store.get()
      const afterBytes = await rawBytes(path)
      expect(threw, 'ADV-1(2) — never a throw (I-4)').toBeNull()
      expect(
        recordDivergence(live, afterBytes, 'ADV-1(2) the token accessor'),
        'ADV-1(2) — LIVE MUST EQUAL DURABLE (I-1 / §2.3 item 7).  On the landed bytes the receipt answers committed while the token is cleared to null LIVE and the file carries null too, so the PRE-WRITE token the file no longer carries is the divergence’s other direction',
      ).toBeNull()
      expect(
        REPRESENTABLE(live.token),
        'ADV-1(2) — the live token reads ' + JSON.stringify(live.token) + '; a BigInt on a LATE read must not be admitted-and-dropped under a committed receipt (§2.2 items 3/4 — no committed receipt answers a discarded value)',
      ).toBe(true)
      if (receipt?.status === 'refused') {
        expect(snapshot(asRecord(store.get())), 'ADV-1(2) — a refusal is a no-op on the record (§2.2 item 5(d))').toBe(snapshot(pre))
        expect(bytesSnapshot(afterBytes), 'ADV-1(2) — a refusal is a no-op on the file (§2.2 item 5(c))').toBe(bytesSnapshot(preBytes))
        expect(fsActivity(), 'ADV-1(2) — an admission refusal touches NO file (F-9)').toEqual([])
      } else {
        // a COMMITTED answer must carry the value the caller supplied on the read
        // the host admitted — never a silent clear of a value the patch supplied.
        expect(snapshot(asRecord(store.get())), 'ADV-1(2) — a committed write’s record must carry the supplied token (never the silent clear the landed bytes answer) — §2.2 item 2 / §2.2 item 4').toBe(snapshot(expectedPost(pre, { token: 'NEW-TOKEN' })))
        expect(snapshot(asRecord(out)), 'ADV-1(2) — set() returns the record now live (§2.1 item 3 step 6)').toBe(snapshot(asRecord(store.get())))
      }
      expect(tReads, 'ADV-1(2) — CONTROL (a): the host made this many reads of the token member through the whole set() call (the post-`ADV-1` single-read discipline)').toBe(1)
      // CONTROL (b) — `F-6` (GATE-4 RE-AUDIT): the fixture's late-read arm
      // (`tReads >= 3`) is DRIVEN directly, so `tReads === 1` is evidence about the
      // host AND the control proves the fixture would have answered a `BigInt` — the
      // unrepresentable value the landed `typeof === 'string'` test cleared while the
      // receipt still answered `committed`.
      const lateTokens: unknown[] = []
      for (let i = 0; i < 2; i++) lateTokens.push(patch.token)
      expect(lateTokens[0], 'ADV-1(2) — CONTROL (b): the fixture’s earlier read still answers the representable supplied token (the exposure is not a literal)').toBe('NEW-TOKEN')
      expect(lateTokens[1], 'ADV-1(2) — CONTROL (b): the fixture’s LATE read answers a `BigInt` — the value `§2.2` item 1 declares NOT representable, and the value a multiple-read host silently cleared under a `committed` receipt').toBe(BigInt(9))
      expect(tReads, 'ADV-1(2) — CONTROL (b): the host’s 1 read plus this control’s 2 = 3 total reads of the member').toBe(3)
    }
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
 * §2.6 THE WRITE LOCK — THE IN-WINDOW PROBE AND ITS ROWS (`M-8` · `F-13` ·
 * `I-10`), APPENDED `2026-10-11` (`§4.1` item 3).
 *
 * THE INSTRUMENT.  A read is issued FROM INSIDE the attempt's own `node:fs`
 * boundary (the shim above, `hooks.lockProbe`) — the same instrument class the
 * landed `P-M-SM-1`/`P-M-SM-2` rows use, at the three sites `§2.6` item 7(a) names
 * (the tmp `fsync`, the directory `fsync`, the caught-failure `rmSync`).  At each
 * probed instant the probe records:
 *   · `get()`'s answer          (§2.6 item 3(a))
 *   · `lastWriteReceipt()`'s answer, or its `null`  (§2.6 item 3(b))
 *   · THE REAL PATH'S BYTES at that instant  (the durable half of item 4's pair)
 *   · whether either read THREW, and its own ELAPSED TIME — `§2.6` item 6: a read
 *     that does not return is not an answer, so the probe carries a liveness
 *     bound of its own (`LOCK_LIVENESS_BOUND_MS`; no timing CLAIM is made — the
 *     window is an ordered interval of the attempt's own steps, `§1.4` item 2).
 * THE TWO-INSTANCE SEEDING.  The probe runs on a FRESH instance over a path whose
 * FILE already carries a known pre-write record (the seeding write goes through
 * the landed write path in its OWN instance), so the declared answers are
 * distinguishable: `lastWriteReceipt()` reads the declared pre-first-landing
 * `null` (`§6` `PAR-10`'s dated in-window note) while the real path's bytes read
 * the PRE-WRITE record.
 * ======================================================================== */

interface LockPairReading {
  /** `get()`'s answer at the probed instant, normalized. */
  get: string
  /** `lastWriteReceipt()`'s answer at the probed instant ('null' for the member's `null`). */
  receipt: string
  /** THE REAL PATH'S BYTES at the probed instant, normalized. */
  bytes: string
}

interface LockPairExpectation extends LockPairReading {
  /** the instant's own name, carried into every failure message. */
  label: string
}

interface LockReadingVerdict {
  held: boolean
  why: string
}

interface LockPairVerdict {
  held: boolean
  why: string
  get: LockReadingVerdict
  receipt: LockReadingVerdict
  bytes: LockReadingVerdict
}

/** `§2.6` item 4 — THE PAIRING RULE, as one falsifiable predicate over the three
 *  readings of ONE probed instant.  Each reading is dispositioned on its own, so
 *  the register's three-per-instant terms are individually attributable. */
function lockPairVerdict(r: LockPairReading, e: LockPairExpectation): LockPairVerdict {
  const reading = (label: string, actual: string, expected: string): LockReadingVerdict =>
    actual === expected ? { held: true, why: '' } : { held: false, why: `${e.label}: ${label} answers ${actual}, the clause requires ${expected}` }
  const get = reading('`get()`', r.get, e.get)
  const receipt = reading('`lastWriteReceipt()`', r.receipt, e.receipt)
  const bytes = reading('the real path’s bytes', r.bytes, e.bytes)
  const first = !get.held ? get : !receipt.held ? receipt : bytes
  return { held: get.held && receipt.held && bytes.held, why: first.why, get, receipt, bytes }
}

interface LockInstantReadings {
  kind: 'fsync' | 'rename' | 'rm'
  call: number
  get: string
  getThrew: string | null
  receipt: string
  receiptThrew: string | null
  realBytes: string
  tmpBytes: string
  elapsedMs: number
  returned: boolean
}

/** `§2.6` item 6's liveness bound (a LIVENESS reading, never a timing claim). */
const LOCK_LIVENESS_BOUND_MS = 2000

/** ARM THE LOCK PROBE and run one write attempt.  The probe reads the declared
 *  surface from inside the attempt's own fs boundary; it is disarmed in a
 *  `finally`, so no landed row can inherit it. */
function withLockProbe<T>(store: SecurityStore, run: () => T): { out: T; instants: LockInstantReadings[] } {
  const instants: LockInstantReadings[] = []
  hooks.lockProbe = (ev): void => {
    const record: LockInstantReadings = {
      kind: ev.kind,
      call: ev.call,
      get: '',
      getThrew: null,
      receipt: '',
      receiptThrew: null,
      realBytes: bytesSnapshot(ev.realBytes === '' ? null : ev.realBytes),
      tmpBytes: bytesSnapshot(ev.tmpBytes === '' ? null : ev.tmpBytes),
      elapsedMs: 0,
      returned: false,
    }
    const t0 = Date.now()
    try {
      record.get = snapshot(asRecord(store.get()))
    } catch (e) {
      record.getThrew = (e as Error).message
    }
    try {
      const receipt = store.lastWriteReceipt()
      record.receipt = receipt === null ? 'null' : JSON.stringify(receipt)
    } catch (e) {
      record.receiptThrew = (e as Error).message
    }
    record.elapsedMs = Date.now() - t0
    record.returned = true
    instants.push(record)
  }
  try {
    const out = run()
    return { out, instants }
  } finally {
    hooks.lockProbe = null
  }
}

/** The probed instant, or a FAILURE that names the un-run reading (`§5.6.1`: an
 *  un-run row/reading is a FAILURE, never a pass).  `'rename'` joins the union
 *  (`2026-10-11`, `LOCK-1`): `§2.6` item 7(a) names the `renameSync` site, and the
 *  shim now fires it — the read IMMEDIATELY BEFORE the terminal the clause pins. */
function lockInstant(instants: readonly LockInstantReadings[], kind: 'fsync' | 'rename' | 'rm', call: number, label: string): LockInstantReadings {
  const hit = Array.from(instants).filter((i) => i.kind === kind && i.call === call)[0]
  if (hit === undefined) {
    throw new Error(`${label}: the attempt never reached the probed instant (${kind} call ${call}) — the in-window reading is NOT-OBSERVED, and an un-run reading is a FAILURE, never a pass (§2.6 item 2)`)
  }
  return hit
}

/** Every reading taken inside the window must RETURN, on time, without throwing
 *  (`§2.6` item 6) — this precondition rides every in-window term. */
function assertLockTotality(i: LockInstantReadings, label: string): void {
  if (i.getThrew !== null) throw new Error(`${label}: the re-entrant \`get()\` THREW — ${i.getThrew} (§2.6 item 6: the lock never throws)`)
  if (i.receiptThrew !== null) throw new Error(`${label}: the re-entrant \`lastWriteReceipt()\` THREW — ${i.receiptThrew} (§2.6 item 6)`)
  if (!i.returned) throw new Error(`${label}: the in-window read did not return inside its own call — a read that does not return is not an answer (§2.6 item 6)`)
  if (!(i.elapsedMs <= LOCK_LIVENESS_BOUND_MS)) {
    throw new Error(`${label}: the in-window reads took ${i.elapsedMs}ms, past the probe’s own liveness bound of ${LOCK_LIVENESS_BOUND_MS}ms — the instrument cannot bound the read's return (§2.6 item 6)`)
  }
}

/** One instant's three readings, with the totality precondition applied. */
function lockReadingsOf(i: LockInstantReadings, label: string): LockPairReading {
  assertLockTotality(i, label)
  return { get: i.get, receipt: i.receipt, bytes: i.realBytes }
}

/** ONE reading of ONE instant = ONE register attempt (`§5.6.1` row 10: `3` instants
 *  × `3` readings).  The totality precondition (§2.6 item 6) rides every term, and
 *  each term's own held/broken reading is PRINTED with its strategy id.  Hoisted out
 *  of row `10`'s first test body (`2026-10-11`, `LOCK-1`) so the terminal row the
 *  clause now pins drives its readings through the SAME detector. */
function lockTerm(attempt: string, raw: LockInstantReadings, expect: LockPairExpectation, which: 'get' | 'receipt' | 'bytes', name: string): void {
  let reading = ''
  drive('P-M-SM-3', attempt, () => {
    const verdict = lockPairVerdict(lockReadingsOf(raw, `${expect.label} · ${name}`), expect)
    reading = verdict[which].held ? `HELD (${verdict[which].why === '' ? name : verdict[which].why})` : `BROKEN — ${verdict[which].why}`
    if (!verdict[which].held) throw new Error(verdict[which].why)
  })
  lockEvidence.push(`S-SS-LOCK-1 · ${attempt} → ${reading}`)
}

/** THE COMMITTING-WRITE PROBE — instants (a) and (b) of ONE attempt. */
function probeCommitAttempt(store: SecurityStore, patch: Record<string, unknown>, label: string): { out: unknown; atA: LockInstantReadings; atB: LockInstantReadings } {
  resetInject()
  resetFsLog()
  const run = withLockProbe(store, () => store.set(patch))
  return { out: run.out, atA: lockInstant(run.instants, 'fsync', 1, `${label} · instant (a) the PRE-RENAME TMP fsync`), atB: lockInstant(run.instants, 'fsync', 2, `${label} · instant (b) the POST-RENAME DIR fsync`) }
}

/** THE REFUSAL-TERMINAL PROBE — instant (c): a failing `renameSync`, read at the
 *  attempt's own caught-failure cleanup (`rmSync`), the last site inside the
 *  attempt before `set()` returns (`§2.6` item 7(a)). */
function probeRefusalAttempt(store: SecurityStore, patch: Record<string, unknown>, label: string): { out: unknown; atC: LockInstantReadings } {
  resetInject()
  resetFsLog()
  armRenameFailure()
  const run = withLockProbe(store, () => store.set(patch))
  return { out: run.out, atC: lockInstant(run.instants, 'rm', 1, `${label} · instant (c) the REFUSAL TERMINAL`) }
}

/** THE TERMINAL PROBE (`LOCK-1`, the gate-4 confirmation round, `2026-10-11`).  `§2.6`
 *  item 4's pairing is asserted at the TERMINAL THE CLAUSE PINS — the landing sink's
 *  own invocation (`§2.6` items 4/5, mechanism `(h-i)`) — and at the ONE instant that
 *  sits IMMEDIATELY BEFORE it and that this instrument can reach: the `renameSync`
 *  shim's post-syscall boundary (item 7(a)'s `renameSync` site).
 *   · `atPreTerminal` — the syscall has landed (the real path's bytes ARE the
 *     candidate) and the module's own next JS statement (the sink) has NOT run yet.
 *     Only HARNESS code executes in that gap, so no module-controlled JS — and
 *     therefore no host fix — can move the surface there; the clause's TERMINAL is
 *     pinned at the sink's invocation, and this reading is the PRE-TERMINAL half.
 *   · `atTerminal` — the first SHIM-OBSERVABLE instant at and after the terminal: the
 *     post-rename directory `fsync` (call 2), which the landed sink's invocation
 *     precedes (`§9g`: the sink runs BEFORE the parent-directory `fsyncSync`). */
function probeTerminalAttempt(store: SecurityStore, patch: Record<string, unknown>, label: string): { out: unknown; atPreTerminal: LockInstantReadings; atTerminal: LockInstantReadings } {
  resetInject()
  resetFsLog()
  const run = withLockProbe(store, () => store.set(patch))
  return {
    out: run.out,
    atPreTerminal: lockInstant(run.instants, 'rename', 1, `${label} · the POST-SYSCALL PRE-TERMINAL boundary (the read immediately BEFORE the pinned terminal)`),
    atTerminal: lockInstant(run.instants, 'fsync', 2, `${label} · the POST-RENAME DIR fsync (the first shim-observable instant at/after the pinned terminal)`),
  }
}

/** A path whose FILE already carries a known pre-write record + a FRESH instance
 *  on it (so `lastWriteReceipt()` is the declared pre-first-landing `null`: no
 *  attempt has gone through THIS instance). */
async function seededStore(seedPatch: Record<string, unknown> = { token: 'PRE', groups: ['read'], maxJournalLength: 100 }): Promise<{ store: SecurityStore; path: string; pre: Record<string, unknown>; bytes: string | null }> {
  // THE SEEDING IS NEVER DRIVEN BY AN INJECTION left armed by an earlier probe
  // (MEASURED at the red run's first pass: the refusal probe arms the rename
  // injection, and a later seeding silently refused, leaving the fixture on the
  // first-run default — the fixture bug is now unmissable, see the assertions below).
  resetInject()
  const path = await freshPath()
  const seeder = createSecurityStore({ path })
  assertNoThrow(() => seeder.set(seedPatch), 'the lock probe’s seeding write')
  const seedingReceipt = seeder.lastWriteReceipt()
  const seededBytes = await rawBytes(path)
  if (seedingReceipt === null || seedingReceipt.status !== 'committed') {
    throw new Error(`the lock probe’s seeding write did not land (receipt ${JSON.stringify(seedingReceipt)}) — the fixture would silently run on the first-run default`)
  }
  const store = createSecurityStore({ path })
  const pre = asRecord(store.get())
  if (bytesSnapshot(seededBytes) !== snapshot(pre) || seededBytes === null) {
    throw new Error(`the lock probe’s fixture is not isolated: the file’s bytes read ${bytesSnapshot(seededBytes)} while the fresh instance read ${snapshot(pre)}`)
  }
  resetInject()
  resetFsLog()
  return { store, path, pre, bytes: seededBytes }
}

const LOCK_COMMITTED = JSON.stringify({ status: 'committed' })
const LOCK_REFUSED = JSON.stringify({ status: 'refused', reason: 'write-failed' })
/** THE LOCK'S MEASURED EVIDENCE, printed at the register's own head (`§4.3` item 5
 *  — the red set's failing set is RUN and REPORTED with its terms). */
const lockEvidence: string[] = []

describe('§2.6 THE WRITE LOCK — reads are locked out until the commit lands (`M-8` · `F-13` · `I-10`; APPENDED `2026-10-11`)', () => {
  it('M-8 · the write lock’s paired answers at the window’s two halves — driven with an instrumented node:fs over a COMMITTING write', async () => {
    const seeded = await seededStore()
    const pre = seeded.pre
    // THE FIRST, LANDED ATTEMPT IS A REFUSAL, so "the last LANDED attempt's closed
    // form" is DISTINGUISHABLE from the form the commit reveals (§2.6 item 3(b)):
    // at (a) the member must answer the refused form of the FIRST attempt, never
    // this attempt's `committed`.
    resetInject()
    resetFsLog()
    armRenameFailure()
    assertNoThrow(() => seeded.store.set({ token: 'FIRST' }), 'M-8: the landed refusal attempt')
    expect(seeded.store.lastWriteReceipt(), 'M-8 — the first attempt LANDED its refused closed form (the form the second attempt must withhold at (a))').toEqual({ status: 'refused', reason: 'write-failed' })
    expect(bytesSnapshot(await rawBytes(seeded.path)), 'M-8 — the landed refusal left the pre-write record at the real path').toBe(snapshot(pre))

    const candidate = expectedPost(pre, { token: 'LOCK' })
    const probed = probeCommitAttempt(seeded.store, { token: 'LOCK' }, 'M-8')

    // ---------------------------- INSTANT (a) ---------------------------------
    const atA = lockReadingsOf(probed.atA, 'M-8 · (a)')
    expect(atA.get, 'M-8 · (a) — before the commit lands `get()` answers the PRE-WRITE record, which is what the real path’s bytes carry at that instant (§2.6 items 3(a)/4)').toBe(snapshot(pre))
    expect(atA.receipt, 'M-8 · (a) — the IN-FLIGHT attempt’s own receipt is WITHHELD until its terminal: the member answers the last LANDED closed form (the first attempt’s refusal), never this attempt’s committed form (§2.6 item 3(b))').toBe(LOCK_REFUSED)
    expect(atA.bytes, 'M-8 · (a) — the staging file carries the candidate while the real path’s bytes are still the PRE-WRITE record (§2.1 item 3 steps 2/4)').toBe(snapshot(pre))
    // ---------------------------- INSTANT (b) ---------------------------------
    const atB = lockReadingsOf(probed.atB, 'M-8 · (b)')
    expect(atB.get, 'M-8 · (b) — AT AND AFTER the commit landing `get()` answers the CANDIDATE, which is what the real path’s bytes carry from that instant (§2.6 items 3(a)/4/5)').toBe(snapshot(candidate))
    expect(atB.receipt, 'M-8 · (b) — at the commit terminal the attempt’s own closed form is answerable: the member answers the committed form (I-10-b; §2.6 items 3(b)/5)').toBe(LOCK_COMMITTED)
    expect(atB.bytes, 'M-8 · (b) — the real path’s bytes ARE the candidate at the post-rename instant').toBe(snapshot(candidate))
    // ---------------------- TOTALITY AND THE CENSUS ---------------------------
    expect(probed.out, 'M-8 — nothing blocks, waits or throws: the attempt RETURNED its answer (§2.6 item 6)').toBeDefined()
    for (const instant of [probed.atA, probed.atB]) {
      expect(instant.returned, 'M-8 — every in-window reading returned inside its own call (§2.6 item 6)').toBe(true)
      expect(instant.getThrew, 'M-8 — no in-window `get()` threw (§2.6 item 6)').toBeNull()
      expect(instant.receiptThrew, 'M-8 — no in-window `lastWriteReceipt()` threw (§2.6 item 6)').toBeNull()
      expect(instant.elapsedMs <= LOCK_LIVENESS_BOUND_MS, `M-8 — the reading bounded its own return (${instant.elapsedMs}ms ≤ ${LOCK_LIVENESS_BOUND_MS}ms)`).toBe(true)
    }
    // §2.6 item 3(a)/§6 PAR-11: inside the window `get()` carries EXACTLY the three
    // declared members — the lock adds no member, renames none and makes none absent.
    const members = Object.keys(seeded.store.get()).sort()
    expect(members, 'M-8 — the in-window answer carries EXACTLY the three declared members, so the lock creates no fourth (§2.6 item 3(a)/3(d); §6 PAR-11)').toEqual(['enabled', 'maxJournalLength', 'token'])
    expect(seeded.store.lastWriteReceipt(), 'M-8 — outside the window (after the attempt’s terminal) the receipt is this attempt’s own committed form').toEqual({ status: 'committed' })
    expect(snapshot(asRecord(seeded.store.get())), 'M-8 — and the record is live and equal to the durable bytes').toBe(snapshot(candidate))
  })

  it('F-13 · a read that observes the PRE-WRITE record — or the CANDIDATE — from inside the window fails the pairing (the lock’s own fail-state)', async () => {
    const seeded = await seededStore()
    const pre = seeded.pre
    resetInject()
    resetFsLog()
    armRenameFailure()
    assertNoThrow(() => seeded.store.set({ token: 'FIRST' }), 'F-13: the landed refusal attempt')
    /* `KB-10` CORRECTION (`2026-10-11`, TestWriter — the implementer's kick-back upheld).
     * THE MIS-AIMED REFERENT, AS FILED: the `.tmp`-removal count was read at the END of
     * this row, i.e. AFTER `probeCommitAttempt` — and that probe OPENS with
     * `resetFsLog()`, which clears `rmLinks` (the line this very amendment appended). The
     * only later activity is ONE COMMITTING write, and a committing write runs no cleanup
     * at all (`§2.3` item 4(a): "the rename consumed it"), so the count there measured `0`
     * and could be greened ONLY by adding an effect to the SUCCESS arm that the contract
     * does NOT declare — green for the wrong reason, and a different referent than the
     * assertion's own words name.
     * THE REFERENT THE CLAUSE DECLARES: `§2.6` item 7(a) names `rmSync` among the write
     * path's own effects, and its site is the attempt's CAUGHT-FAILURE cleanup — the
     * REFUSAL TERMINAL. That terminal is THIS row's own refusal probe (the
     * `armRenameFailure()` + `set()` immediately above), so the count is read THERE, before
     * any later probe resets the per-row log. Nothing about the clause's bite is weakened:
     * the site must still be REACHED and must still remove the record's own staging path. */
    const refusalCleanup = hooks.rmLinks.filter((l) => l.endsWith('.tmp'))
    const candidate = expectedPost(pre, { token: 'LOCK' })
    const probed = probeCommitAttempt(seeded.store, { token: 'LOCK' }, 'F-13')
    const atA = lockReadingsOf(probed.atA, 'F-13 · (a)')
    const atB = lockReadingsOf(probed.atB, 'F-13 · (b)')

    // F-13 (a) — THE MEASURED `SSD-G-81` SHAPE, ON THE CURRENT BYTES.  The row is a
    // FAIL-STATE row: it asserts the falsifying shape is NOT observable.  On the
    // as-landed bytes it IS observable (the record advances only after `persist()`
    // returns, `src/main/security-store.ts:293` then `:297`), so this reading REDDENS
    // — and it is the red the host change `§2.6` item 5 must green.
    const preWriteReadWhileBytesAreCandidate = atB.get === snapshot(pre) && atB.bytes === snapshot(candidate)
    expect(
      preWriteReadWhileBytesAreCandidate,
      `F-13 (a) — §2.6 item 4: an in-window read answered ${atB.get} while the real path’s bytes already carry ${atB.bytes}. The gate-5 blind row SSD-G-81 MEASURED exactly this shape at the post-rename directory fsync; the clause forbids it`,
    ).toBe(false)
    // F-13 (b) — AN ASSIGN-EARLY SHAPE at the PRE-rename instant: `get()` answers the
    // CANDIDATE while the real path still carries the PRE-WRITE record.  DRIVEN through
    // the SAME detector, both ways (the detector must FIRE, and a conforming subject at
    // the same instant must NOT).
    const assignEarly = lockPairVerdict({ get: snapshot(candidate), receipt: atA.receipt, bytes: atA.bytes }, { label: 'F-13 (b) the ASSIGN-EARLY shape at instant (a)', get: snapshot(pre), receipt: atA.receipt, bytes: snapshot(pre) })
    expect(assignEarly.held, `F-13 (b) — the detector MUST fire on the CANDIDATE-before-the-commit shape: ${assignEarly.why}`).toBe(false)
    expect(assignEarly.get.held, 'F-13 (b) — the failing reading is named: the record, not the receipt or the bytes').toBe(false)
    const conforming = lockPairVerdict({ get: atA.get, receipt: atA.receipt, bytes: atA.bytes }, { label: 'F-13 (b) the CONFORMING shape at instant (a)', get: snapshot(pre), receipt: atA.receipt, bytes: snapshot(pre) })
    expect(conforming.held, `F-13 (b) — CONTROL: a conforming subject at the same instant HOLDS, so the detector is not one-sided (${conforming.why})`).toBe(true)
    // F-13 (c) — THE IN-FLIGHT ATTEMPT'S RECEIPT OBSERVED BEFORE ITS TERMINAL: an
    // eager-receipt shape must FIRE at instant (a), while the module at that instant
    // must still answer the LAST LANDED form (withheld).
    const eagerReceipt = lockPairVerdict({ get: atA.get, receipt: LOCK_COMMITTED, bytes: atA.bytes }, { label: 'F-13 (c) the EAGER-RECEIPT shape at instant (a)', get: snapshot(pre), receipt: LOCK_REFUSED, bytes: snapshot(pre) })
    expect(eagerReceipt.held, `F-13 (c) — the detector MUST fire when the in-flight attempt’s own form is answered before its terminal has landed: ${eagerReceipt.why}`).toBe(false)
    expect(eagerReceipt.receipt.held, 'F-13 (c) — the failing reading is named: the receipt').toBe(false)
    expect(atA.receipt, 'F-13 (c) — and on the current bytes the member WITHHOLDS the in-flight form at (a): it answers the last LANDED closed form, which is the first attempt’s refusal (§2.6 item 3(b))').toBe(LOCK_REFUSED)
    // §2.6 item 6 — THE LOCK NEVER BLOCKS, WAITS, SPINS, QUEUES, RE-ENTERS OR THROWS.
    for (const instant of [probed.atA, probed.atB]) assertLockTotality(instant, 'F-13 · §2.6 item 6')
    expect(refusalCleanup.length, 'F-13 — the refusal terminal’s own cleanup ran EXACTLY ONCE, read AT the row’s own refusal probe (the §2.6 item 7(a) rmSync site) and never after the committing probe’s resetFsLog, which would measure 0 and demand an undeclared effect on the success arm (`KB-10` correction)').toBe(1)
    expect(refusalCleanup, 'F-13 — and the removal names the RECORD’s own staging path (the pinned path + `.tmp`, §2.1 item 3), so the site is the record’s own cleanup and not a foreign file’s').toEqual([`${seeded.path}.tmp`])
  })

  it('I-10 · at every instant of a write’s window the read surface answers from the DURABLE state — I-10-a and I-10-b, with the lock’s totality', async () => {
    const seeded = await seededStore()
    const pre = seeded.pre
    resetInject()
    resetFsLog()
    armRenameFailure()
    assertNoThrow(() => seeded.store.set({ token: 'FIRST' }), 'I-10: the landed refusal attempt')
    const candidate = expectedPost(pre, { token: 'LOCK' })
    const probed = probeCommitAttempt(seeded.store, { token: 'LOCK' }, 'I-10')
    const atA = lockReadingsOf(probed.atA, 'I-10 · (a)')
    const atB = lockReadingsOf(probed.atB, 'I-10 · (b)')
    const refusal = await seededStore()
    const refusalProbe = probeRefusalAttempt(refusal.store, { token: 'REFUSED-ATTEMPT' }, 'I-10')
    const refusalTerminal = lockReadingsOf(refusalProbe.atC, 'I-10 · (c)')

    // I-10-a — THE ADVANCE LANDS IFF THE `renameSync` SUCCEEDED, AT THAT FIRST INSTANT.
    expect(atB.get, 'I-10-a — at the post-rename instant the record ALREADY equals the candidate (the advance lands AT the commit, inside the window, §2.6 item 5)').toBe(snapshot(candidate))
    expect(refusalTerminal.get, 'I-10-a — at the refusal terminal the record is UNMOVED: an advance on a failed rename is forbidden (§2.6 items 4/5)').toBe(snapshot(refusal.pre))
    // I-10-b — THE RECORD’S ANSWER AND THE RECEIPT’S ANSWER FLIP AT THE SAME TERMINAL.
    expect(
      { get: atA.get, receipt: atA.receipt },
      'I-10-b — at instant (a) BOTH answers are the pre-terminal pair: the PRE-WRITE record beside the last LANDED receipt (the in-flight form withheld)',
    ).toEqual({ get: snapshot(pre), receipt: LOCK_REFUSED })
    expect(
      { get: atB.get, receipt: atB.receipt },
      'I-10-b — at instant (b) BOTH answers are the post-terminal pair: the CANDIDATE beside the committed closed form. One answer flipping without the other fails the clause',
    ).toEqual({ get: snapshot(candidate), receipt: LOCK_COMMITTED })
    expect(
      { get: refusalTerminal.get, receipt: refusalTerminal.receipt },
      'I-10-b — at the refusal terminal the pair is the PRE-WRITE record beside the attempt’s own refused closed form',
    ).toEqual({ get: snapshot(refusal.pre), receipt: LOCK_REFUSED })
    // THE DURABLE HALF — the real path’s bytes at each probed instant.
    expect(atA.bytes, 'I-10 — before the commit the real path carries the PRE-WRITE record').toBe(snapshot(pre))
    expect(atB.bytes, 'I-10 — at and after the commit the real path carries the CANDIDATE').toBe(snapshot(candidate))
    expect(refusalTerminal.bytes, 'I-10 — at a refusal terminal the real path still carries the PRE-WRITE record').toBe(snapshot(refusal.pre))
    // THE VOCABULARY IS CLOSED AND THE LOCK ADDS NOTHING (§2.6 item 3(b)/3(d)).
    const instants: { reading: LockPairReading; raw: LockInstantReadings; label: string }[] = [
      { reading: atA, raw: probed.atA, label: 'I-10 · (a)' },
      { reading: atB, raw: probed.atB, label: 'I-10 · (b)' },
      { reading: refusalTerminal, raw: refusalProbe.atC, label: 'I-10 · (c)' },
    ]
    for (const instant of instants) {
      expect(
        instant.reading.receipt === 'null' || instant.reading.receipt === LOCK_COMMITTED || instant.reading.receipt === LOCK_REFUSED,
        `${instant.label} — every in-window receipt reading is one of the closed two forms or the declared \`null\`; it read ${instant.reading.receipt} (no third form, no new token — §2.6 items 3(b)/8)`,
      ).toBe(true)
      assertLockTotality(instant.raw, `${instant.label} — §2.6 item 6`)
      expect(instant.raw.returned, `${instant.label} — the in-window reads returned inside the attempt’s own fs call (§2.6 item 6)`).toBe(true)
    }
    expect(probed.out, 'I-10 — the write returned; the lock never blocks or waits (§2.6 item 6)').toBeDefined()
    expect(refusalProbe.out, 'I-10 — the refused attempt returned too; a refusal is an answer, never a throw (§2.6 item 6)').toBeDefined()
  })
})

/* ------------------------------------------------------------------ *
 * REG-10 · `P-M-SM-3` — THE WRITE LOCK (21 attempts: 12 as filed + the      *
 * gate-4 confirmation round's LOCK-1 terminal readings and LOCK-2 control;  *
 * APPENDED `2026-10-11`)                                                     *
 * ------------------------------------------------------------------ */

runRow('P-M-SM-3', 'P-SM', 'S-SS-LOCK-1', 21, () => {
  it('§5.6.1 P-M-SM-3 (S-SS-LOCK-1) · 3 probed in-window instants × 3 readings (get · lastWriteReceipt · the real path’s bytes) + 2 driven mutation controls + 1 no-window control + the `LOCK-1` terminal readings + the `LOCK-2` non-vacuity control — 21 attempts', async () => {
    // ONE committing attempt for instants (a)+(b), one refusing attempt for (c), each
    // on a FRESH instance over a seeded path (so the declared pre-first-landing `null`
    // is the pre-window form and the durable pre-write record is what the real path
    // carries — the two halves of item 4's pair are distinguishable from the start).
    const committing = await seededStore()
    const pre = committing.pre
    const candidate = expectedPost(pre, { token: 'LOCK' })
    const probed = probeCommitAttempt(committing.store, { token: 'LOCK' }, 'P-M-SM-3')
    const refusal = await seededStore()
    const refusalProbe = probeRefusalAttempt(refusal.store, { token: 'REFUSED-ATTEMPT' }, 'P-M-SM-3')
    const refPre = refusal.pre

    const expectA: LockPairExpectation = { label: 'instant (a) the PRE-RENAME TMP fsync (window OPEN, commit NOT landed)', get: snapshot(pre), receipt: 'null', bytes: snapshot(pre) }
    const expectB: LockPairExpectation = { label: 'instant (b) the POST-RENAME DIR fsync (the commit HAS landed)', get: snapshot(candidate), receipt: LOCK_COMMITTED, bytes: snapshot(candidate) }
    const expectC: LockPairExpectation = { label: 'instant (c) the REFUSAL TERMINAL (a failing renameSync; the window closes without a commit)', get: snapshot(refPre), receipt: LOCK_REFUSED, bytes: snapshot(refPre) }

    /** ONE reading of ONE instant = ONE register attempt (`§5.6.1` row 10: `3` instants
     *  × `3` readings).  The detector is `lockTerm` (hoisted, `2026-10-11`): the row's
     *  TERMINAL test drives its readings through the same one. */
    const term = lockTerm
    term('(a)·get() — the durable record at that instant', probed.atA, expectA, 'get', '`get()` answers the PRE-WRITE record')
    term('(a)·lastWriteReceipt() — the in-flight receipt WITHHELD', probed.atA, expectA, 'receipt', 'the last LANDED form (the declared `null`)')
    term('(a)·the real path’s bytes', probed.atA, expectA, 'bytes', 'the durable state before the commit')
    term('(b)·get() — the CANDIDATE at and after the landing', probed.atB, expectB, 'get', '`get()` answers the CANDIDATE')
    term('(b)·lastWriteReceipt() — revealed AT the terminal', probed.atB, expectB, 'receipt', 'the committed closed form')
    term('(b)·the real path’s bytes', probed.atB, expectB, 'bytes', 'the durable state at and after the landing')
    term('(c)·get() — the PRE-WRITE record at the refusal', refusalProbe.atC, expectC, 'get', '`get()` answers the PRE-WRITE record')
    term('(c)·lastWriteReceipt() — the attempt’s own refused form', refusalProbe.atC, expectC, 'receipt', 'the refused closed form')
    term('(c)·the real path’s bytes — untouched by the failed rename', refusalProbe.atC, expectC, 'bytes', 'the untouched real path')

    // ---- THE 2 DRIVEN MUTATION CONTROLS (§2.5 item 5: a detector that cannot fail
    // proves nothing).  EACH IS DRIVEN BOTH WAYS — the shape must FIRE, and a
    // conforming subject at the SAME instant must NOT.
    drive('P-M-SM-3', 'ctl (i) the ASSIGN-EARLY subject must FIRE at instant (a) — driven both ways', () => {
      const atA = lockReadingsOf(probed.atA, 'ctl (i)')
      const early = lockPairVerdict({ get: snapshot(candidate), receipt: atA.receipt, bytes: atA.bytes }, { ...expectA, label: 'ctl (i) the ASSIGN-EARLY subject at instant (a)' })
      lockEvidence.push(`S-SS-LOCK-1 · ctl (i) ASSIGN-EARLY at (a) → ${early.held ? 'BROKEN — the detector did NOT fire' : 'FIRED (the detector caught the shape); the conforming subject beside it must HOLD'}`)
      if (early.held) throw new Error('the ASSIGN-EARLY shape (`current = candidate` BEFORE the rename) was NOT caught at the pre-rename instant — the detector cannot fail (§2.6 item 4)')
      if (early.get.held) throw new Error(`the ASSIGN-EARLY subject’s failing reading is not its RECORD answer — ${early.why}`)
      const conforming = lockPairVerdict(atA, { ...expectA, label: 'ctl (i) the CONFORMING subject at instant (a)' })
      if (!conforming.held) throw new Error(`the control is one-sided: the CONFORMING subject at instant (a) does not hold — ${conforming.why}`)
    })
    drive('P-M-SM-3', 'ctl (ii) the ADVANCE-AFTER-RETURN subject (the as-landed shape) must FIRE at instant (b) — driven both ways', () => {
      const atB = lockReadingsOf(probed.atB, 'ctl (ii)')
      const asLanded = lockPairVerdict({ get: snapshot(pre), receipt: 'null', bytes: atB.bytes }, { ...expectB, label: 'ctl (ii) the ADVANCE-AFTER-RETURN subject (the as-landed shape) at instant (b)' })
      lockEvidence.push(`S-SS-LOCK-1 · ctl (ii) ADVANCE-AFTER-RETURN at (b) → ${asLanded.held ? 'BROKEN — the detector did NOT fire' : 'FIRED (the detector caught the shape); the advance-at-commit subject beside it must HOLD'}`)
      if (asLanded.held) throw new Error('the ADVANCE-AFTER-RETURN shape (the record advanced only AFTER `persist()` returned — `src/main/security-store.ts:293` then `:297`) was NOT caught at the post-rename instant — the detector cannot fail (§2.6 items 4/5)')
      if (asLanded.get.held || asLanded.receipt.held) throw new Error(`the as-landed shape’s failing readings are not its RECORD and its RECEIPT — ${asLanded.why}`)
      const atCommit = lockPairVerdict({ get: snapshot(candidate), receipt: LOCK_COMMITTED, bytes: atB.bytes }, { ...expectB, label: 'ctl (ii) the ADVANCE-AT-COMMIT subject at instant (b)' })
      if (!atCommit.held) throw new Error(`the control is one-sided: the ADVANCE-AT-COMMIT subject at instant (b) does not hold — ${atCommit.why}`)
      // THE OBSERVATION, PRINTED — never asserted as a requirement (the requirement
      // lives in `M-8`/`F-13`/`I-10`, which assert the CONFORMING pair; an assertion
      // here would demand the module STAY broken).
      lockEvidence.push(
        `(b) the module’s OWN readings: get ${atB.get} · receipt ${atB.receipt} · bytes ${atB.bytes} → the ADVANCE-AFTER-RETURN shape is ${atB.get === snapshot(pre) && atB.receipt !== LOCK_COMMITTED ? 'OBSERVED ON THE CURRENT BYTES (the pre-fix red)' : 'not observed'}`,
      )
    })
    // ---- THE 1 WINDOW CONTROL (§2.6 item 2): an ADMISSION refusal touches no
    // filesystem, so it opens NO window and its in-window reading is NOT-APPLICABLE
    // — reported as absent, NEVER as a pass.
    const admission = await seededStore()
    resetInject()
    resetFsLog()
    const windowProbe = withLockProbe(admission.store, () => admission.store.set({ token: BigInt(7) as never }))
    const ordinaryGet = snapshot(asRecord(admission.store.get()))
    const ordinaryReceipt = JSON.stringify(admission.store.lastWriteReceipt())
    const ordinaryBytes = bytesSnapshot(await rawBytes(admission.path))
    drive('P-M-SM-3', 'ctl (window) an ADMISSION refusal opens NO window — the in-window reading is NOT-APPLICABLE, never a pass (counted over the WHOLE instrumented log, `mkdirSync` INCLUDED)', () => {
      // `LOCK-2` (the gate-4 confirmation round, `2026-10-11`): as filed this control
      // counted `fsActivity()` (writeFile/rename) + `fsync` + `rm` only, so `mkdirSync`
      // — the effect `§2.6` item 2 NAMES as the window-OPENER — was logged and never
      // counted.  An mkdir-only admission refusal read `none` and printed
      // NOT-APPLICABLE: a control vacuous over exactly the effect the clause names.
      // It now reads the whole instrumented log.
      const whole = fsWholeLog()
      lockEvidence.push(`S-SS-LOCK-1 · ctl (window) ADMISSION refusal → in-window readings: ${windowProbe.instants.length === 0 ? 'NOT-APPLICABLE (no window opened)' : `${windowProbe.instants.length} — MALFORMED`}; fs effects (the WHOLE instrumented log, mkdir included): ${whole.length === 0 ? 'none' : JSON.stringify(whole)}; the read across it: get ${ordinaryGet} · receipt ${ordinaryReceipt} · bytes ${ordinaryBytes}`)
      if (windowProbe.instants.length !== 0) throw new Error(`the lock probe fired ${windowProbe.instants.length} in-window reading(s) across an ADMISSION refusal — such an attempt touches no filesystem and NEVER OPENS A WINDOW (§2.6 item 2)`)
      if (whole.length !== 0) throw new Error(`the ADMISSION refusal performed ${whole.length} filesystem effect(s) — ${JSON.stringify(whole)} — counted over the WHOLE instrumented log INCLUDING \`mkdirSync\`, which §2.6 item 2 names as the window-OPENING effect: an mkdir-only attempt OPENS the window and is not a refusal that touched nothing (§2.2 item 5(c)/F-9; the as-filed count read only writeFile/rename and was vacuous here)`)
      if (hooks.fsyncCalls !== 0 || hooks.rmLinks.length !== 0) throw new Error(`the ADMISSION refusal reached an fs boundary (fsync ${hooks.fsyncCalls}, rm ${hooks.rmLinks.length}) — there is no window to read inside (§2.6 item 2)`)
      if (windowProbe.out === undefined) throw new Error('the read taken across an ADMISSION refusal did not return (§2.6 item 6)')
      if (ordinaryGet !== snapshot(admission.pre)) throw new Error(`the read across the ADMISSION refusal answered ${ordinaryGet}, not the pre-write record ${snapshot(admission.pre)} — a read across such an attempt is an ORDINARY pre-window read (§2.6 item 2)`)
      if (ordinaryReceipt !== LOCK_REFUSED) throw new Error(`the read across the ADMISSION refusal answered the receipt ${ordinaryReceipt}, not the attempt’s own refused closed form`)
      if (ordinaryBytes !== snapshot(admission.pre)) throw new Error(`the ADMISSION refusal’s real-path bytes read ${ordinaryBytes}, not the pre-write record — no attempt wrote anything`)
    })
    // ---- ctl (window-ii) · `LOCK-2`'s NON-VACUITY CONTROL (§2.5 item 5: a detector
    // that cannot fail proves nothing).  It drives the WHOLE-LOG counter both ways
    // against the REAL module and against a synthetic log, so the strengthened
    // control above is attributable rather than merely re-worded.
    await driveAsync('P-M-SM-3', 'ctl (window-ii) the WHOLE-LOG window detector is non-vacuous — driven both ways (an mkdir-only attempt reddens it; the narrowed as-filed filter cannot see it; an empty log reads empty)', async () => {
      const real = await seededStore()
      resetFsLog()
      assertNoThrow(() => real.store.set({ token: 'MKD' }), 'ctl (window-ii): the admitted write whose effects the WHOLE log must carry')
      const realWhole = fsWholeLog()
      const realNarrowed = fsActivity()
      const realMkdir = realWhole.filter((l) => l.startsWith('mkdir:'))
      let mkdirOnlyWhole: string[] = []
      let mkdirOnlyNarrowed: string[] = []
      resetFsLog()
      hooks.log.push('mkdir:/synthetic/window-opener')
      try {
        mkdirOnlyWhole = fsWholeLog()
        mkdirOnlyNarrowed = fsActivity()
      } finally {
        resetFsLog()
      }
      const emptyWhole = fsWholeLog()
      const emptyNarrowed = fsActivity()
      lockEvidence.push(`S-SS-LOCK-1 · ctl (window-ii) whole-log vs narrowed: an admitted write logged ${realWhole.length} effect(s), ${realMkdir.length} of them \`mkdirSync\` (the narrowed filter sees ${realNarrowed.length} and none of the mkdir); an mkdir-only log reads ${mkdirOnlyWhole.length} on the whole log and ${mkdirOnlyNarrowed.length} on the narrowed one; an empty log reads ${emptyWhole.length}/${emptyNarrowed.length}`)
      if (realMkdir.length === 0) throw new Error(`the module’s own admitted write logged NO \`mkdirSync\` effect (${JSON.stringify(realWhole)}) — then the whole-log control above would still be vacuous over §2.6 item 2’s window-opener`)
      if (realNarrowed.some((l) => l.startsWith('mkdir:'))) throw new Error('the NARROWED filter sees `mkdirSync` — then this control cannot show that the as-filed count was vacuous')
      if (mkdirOnlyWhole.length !== 1) throw new Error(`the WHOLE-LOG detector did NOT fire on an mkdir-only attempt (it read ${JSON.stringify(mkdirOnlyWhole)}) — the window control above would still pass an attempt that opened its window with \`mkdirSync\` alone`)
      if (mkdirOnlyNarrowed.length !== 0) throw new Error(`the as-filed narrowed filter DID see the mkdir-only attempt (${JSON.stringify(mkdirOnlyNarrowed)}) — the LOCK-2 measurement is refuted at these bytes`)
      if (emptyWhole.length !== 0 || emptyNarrowed.length !== 0) throw new Error(`the counter is a CONSTANT: an empty log must read empty on BOTH readings (whole ${emptyWhole.length}, narrowed ${emptyNarrowed.length})`)
    })
  })

    /* ------------------------------------------------------------------ *
     * `LOCK-1` (the gate-4 confirmation round, `2026-10-11`) — THE ROW THAT  *
     * PROBES THE TERMINAL THE CLAUSE NOW PINS.  `§2.6` item 4's pairing is  *
     * asserted at the landing SINK'S OWN INVOCATION (mechanism `(h-i)`), a  *
     * terminal no instrument can sit inside, so it is read at its two       *
     * REACHABLE neighbours: the `renameSync` shim's post-syscall boundary   *
     * (the read IMMEDIATELY BEFORE it — item 7(a)'s `renameSync` site) and   *
     * the post-rename directory fsync (the first instant AT/AFTER it).      *
     * ------------------------------------------------------------------ */
    it('§2.6 item 4 — THE TERMINAL THE CLAUSE PINS (the landing sink’s own invocation): the pre-terminal `renameSync` boundary × 3 readings + the post-terminal dir-`fsync` × 3 readings + 2 driven mutation controls', async () => {
      // THE INSTANTS, NAMED AND PINNED.
      //  · PRE-TERMINAL — the `renameSync` shim's post-syscall boundary.  The syscall
      //    HAS landed (the real path's bytes ARE the candidate: §0A item 2) and the
      //    module's own next JS statement — the landing sink that advances the record
      //    and lands the receipt together — has NOT run.  ONLY HARNESS CODE executes in
      //    that gap: `renameSync` has already returned from the kernel when the shim's
      //    wrapper reads, and the module's next statement is the sink's call.  So the
      //    syscall's interior (and that gap) is UNREACHABLE by any module-controlled JS
      //    and NO HOST FIX EXISTS for it — the clause's TERMINAL is therefore pinned at
      //    the SINK'S INVOCATION, and this instant is the PRE-TERMINAL half: the
      //    PRE-WRITE record beside the WITHHELD form.  The DURABLE half at this instant
      //    is the CANDIDATE, and it is ASSERTED here rather than smoothed — that
      //    measurement is exactly what forced the narrowing (the dated note beside
      //    `§2.6` items 4/7(a) carries it).
      //  · AT/AFTER THE TERMINAL — the post-rename directory fsync (the landed sink is
      //    invoked BEFORE it, `§9g`): the CANDIDATE beside `{status:'committed'}`, both
      //    flipped TOGETHER (I-10-b).
      const committing = await seededStore()
      const pre = committing.pre
      const candidate = expectedPost(pre, { token: 'LOCK' })
      const probed = probeTerminalAttempt(committing.store, { token: 'LOCK' }, 'P-M-SM-3 · terminal')
      const atPreTerminal = lockReadingsOf(probed.atPreTerminal, 'the pre-terminal rename boundary')
      const atTerminal = lockReadingsOf(probed.atTerminal, 'the post-terminal dir fsync')
      const expectPreTerminal: LockPairExpectation = { label: 'the POST-SYSCALL PRE-TERMINAL boundary (the rename has landed; the landing sink has NOT run)', get: snapshot(pre), receipt: 'null', bytes: snapshot(candidate) }
      const expectTerminal: LockPairExpectation = { label: 'the first shim-observable instant AT/AFTER the pinned terminal (the post-rename directory fsync)', get: snapshot(candidate), receipt: LOCK_COMMITTED, bytes: snapshot(candidate) }

      lockTerm('(t-)·get() — the PRE-TERMINAL record, the sink not yet run', probed.atPreTerminal, expectPreTerminal, 'get', '`get()` answers the PRE-WRITE record (the terminal has not landed)')
      lockTerm('(t-)·lastWriteReceipt() — the in-flight form WITHHELD at the pre-terminal boundary', probed.atPreTerminal, expectPreTerminal, 'receipt', 'the last LANDED form (the declared `null`)')
      lockTerm('(t-)·the real path’s bytes — ALREADY the candidate (the syscall landed)', probed.atPreTerminal, expectPreTerminal, 'bytes', 'the durable state the syscall left: the CANDIDATE')
      lockTerm('(t+)·get() — the CANDIDATE at and after the pinned terminal', probed.atTerminal, expectTerminal, 'get', '`get()` answers the CANDIDATE')
      lockTerm('(t+)·lastWriteReceipt() — the committed form AT the terminal', probed.atTerminal, expectTerminal, 'receipt', 'the committed closed form')
      lockTerm('(t+)·the real path’s bytes — the candidate at and after the landing', probed.atTerminal, expectTerminal, 'bytes', 'the durable state at and after the landing')

      // THE TOTALS RIDE EVERY READING (§2.6 item 6) — and the pair is ASSERTED
      // TOGETHER at the terminal, so one answer flipping without the other fails.
      for (const instant of [probed.atPreTerminal, probed.atTerminal]) {
        assertLockTotality(instant, 'P-M-SM-3 · terminal · §2.6 item 6')
      }
      expect({ get: atTerminal.get, receipt: atTerminal.receipt }, 'I-10-b at the pinned terminal — the record’s answer and the receipt’s answer flip AT THE SAME TERMINAL, never one before the other').toEqual({ get: snapshot(candidate), receipt: LOCK_COMMITTED })
      expect(probed.out, 'the terminal probe’s write RETURNED its answer — the lock never blocks, waits or throws (§2.6 item 6)').toBeDefined()

      // ---- ctl (iii) · THE PRE-TERMINAL INSTANT, DRIVEN BOTH WAYS (§2.5 item 5).
      drive('P-M-SM-3', 'ctl (iii) an ADVANCE-BEFORE-THE-SYSCALL subject must FIRE at the pre-terminal boundary — driven both ways', () => {
        const eager = lockPairVerdict({ get: snapshot(candidate), receipt: LOCK_COMMITTED, bytes: atPreTerminal.bytes }, { ...expectPreTerminal, label: 'ctl (iii) the ADVANCE-BEFORE-THE-SYSCALL subject at the pre-terminal boundary' })
        lockEvidence.push(`S-SS-LOCK-1 · ctl (iii) ADVANCE-BEFORE-THE-SYSCALL at the pre-terminal boundary → ${eager.held ? 'BROKEN — the detector did NOT fire' : 'FIRED (the detector caught the shape); the conforming subject beside it must HOLD'}`)
        if (eager.held) throw new Error('the ADVANCE-BEFORE-THE-SYSCALL shape (the record advanced and the receipt landed BEFORE the rename landed — the assign-early family) was NOT caught at the pre-terminal boundary — the detector cannot fail (§2.6 items 4/5)')
        if (eager.get.held || eager.receipt.held) throw new Error(`the ADVANCE-BEFORE-THE-SYSCALL subject’s failing readings are not its RECORD and its RECEIPT — ${eager.why}`)
        const conforming = lockPairVerdict(atPreTerminal, { ...expectPreTerminal, label: 'ctl (iii) the CONFORMING subject at the pre-terminal boundary' })
        if (!conforming.held) throw new Error(`the control is one-sided: the CONFORMING pre-terminal subject does not hold — ${conforming.why}`)
      })
      // ---- ctl (iv) · THE POST-TERMINAL INSTANT, DRIVEN BOTH WAYS — the as-landed
      // (pre-`§9g`) ADVANCE-AFTER-RETURN shape, which is what the amendment greened.
      drive('P-M-SM-3', 'ctl (iv) an ADVANCE-AFTER-RETURN subject must FIRE at the pinned terminal — driven both ways', () => {
        const late = lockPairVerdict({ get: snapshot(pre), receipt: 'null', bytes: atTerminal.bytes }, { ...expectTerminal, label: 'ctl (iv) the ADVANCE-AFTER-RETURN subject at the pinned terminal' })
        lockEvidence.push(`S-SS-LOCK-1 · ctl (iv) ADVANCE-AFTER-RETURN at the pinned terminal → ${late.held ? 'BROKEN — the detector did NOT fire' : 'FIRED (the detector caught the shape); the conforming subject beside it must HOLD'}`)
        if (late.held) throw new Error('the ADVANCE-AFTER-RETURN shape (the record advanced only AFTER `persist()` returned) was NOT caught at the pinned terminal — the detector cannot fail (§2.6 items 4/5)')
        if (late.get.held || late.receipt.held) throw new Error(`the ADVANCE-AFTER-RETURN subject’s failing readings are not its RECORD and its RECEIPT — ${late.why}`)
        const conforming = lockPairVerdict(atTerminal, { ...expectTerminal, label: 'ctl (iv) the ADVANCE-AT-THE-TERMINAL subject at the pinned terminal' })
        if (!conforming.held) throw new Error(`the control is one-sided: the CONFORMING terminal subject does not hold — ${conforming.why}`)
      })
    })

    /* ---- THE ROW'S CENSUS, READ LAST so every attempt above is counted. ---- */
    it('§5.6.1 P-M-SM-3 (S-SS-LOCK-1) · the row’s census, printed WITH ITS TERMS — 21 = (3×3 + 2 + 1) + (2×3 + 2) + 1', () => {
      const row = rowById('P-M-SM-3')
      expect(row.attempts, 'P-M-SM-3 runs EXACTLY its 21 declared attempts (§5.6.1 row 10): the 12 as filed (`3` instants × `3` readings + `2` mutation controls + `1` window control) + `2 × 3` readings of the terminal row (`LOCK-1`: the pre-terminal boundary + the post-terminal dir fsync) + its `2` driven mutation controls + `1` whole-log non-vacuity control (`LOCK-2`)').toBe(21)
      expect(row.held + row.broken, 'P-M-SM-3: held + broken === attempts-run').toBe(row.attempts)
      // eslint-disable-next-line no-console
      console.log(
        [`REGISTER §5.6.1 · P-M-SM-3 · S-SS-LOCK-1 · attempts-run ${row.attempts}/${row.declared} · held ${row.held} · broken ${row.broken}`, ...lockEvidence.map((l) => `  LOCK EVIDENCE ${l}`)].join('\n'),
      )
    })
})

/* ==========================================================================
 * THE REGISTER’S OWN SUMMARY ROW — the totals printed WITH THEIR TERMS, the
 * caps, the stop rule, and the UN-RUN rule (§5.6.1: an un-run row is a
 * FAILURE, never a pass).
 * ======================================================================== */

describe('§5.6.1 THE REGISTER — the executed summary (118 = 51+12+6+7+16+2+8+8+8) ⟶ ANNOTATED BESIDE, APPENDED `2026-10-11` (`RCA-8(d)`: the as-filed heading STANDS; the OPERATIVE figures are `139 = 51+12+6+7+16+2+8+8+8+21` over `10` typed rows — row `10` is `P-M-SM-3`, `S-SS-LOCK-1`, `§2.6`, whose term the gate-4 confirmation round moved `12 → 21`)', () => {
  it('REGISTER-STOP · the stop-after-5 guard and the un-run-as-FAILURE rule are DRIVEN both ways (`F-3`, gate-4 re-audit; §9d item 2 / §4.3 item 1 / AGENTS.md item 11(b))', () => {
    // `F-3`: `§9d` item 2 claims "`REGISTER-EXEC` asserts both directions: the
    // register did NOT stop, AND the stop rule FIRES on a synthetic five-broken-row
    // streak, AND a row beyond it is reported UN-RUN with `ran === false`,
    // `broken === declared`, `attempts === 0` and its failure message".  As filed
    // nothing constructed that streak — the guard was a predicate no register state
    // could falsify (all nine rows HOLD, so `brokenStreak` reads `0` forever).  The
    // drive below makes the claim TRUE: it is the measurement item 2 named.
    const d = driveStopRuleBothWays()
    // DIRECTION 1 — the predicate, at its own boundary.
    expect(d.firedOnFour, 'F-3 (1) — the guard does NOT fire on a FOUR-broken streak (so its `5` means `5`, not "any streak")').toBe(false)
    expect(d.firedOnFive, 'F-3 (1) — the guard FIRES on a synthetic FIVE-broken streak (the as-filed dead-code predicate could never answer `true`)').toBe(true)
    // DIRECTION 2 — the REAL `runRow` call site, on the state that guard exists for.
    expect(d.unRunId, 'F-3 (2) — the row driven past the fired streak').toBe('__UNRUN__')
    expect(d.unRunRan, 'F-3 (2) — the row beyond the streak is reported NOT-RUN (`ran === false`)').toBe(false)
    expect(d.unRunAttempts, 'F-3 (2) — and it ran ZERO attempts (its body never executed)').toBe(0)
    expect(d.unRunBodyRan, 'F-3 (2) — CONTROL: the UN-RUN row’s body did NOT execute (the body throws, so an un-held guard is unmissable)').toBe(false)
    expect(d.unRunBroken, 'F-3 (2) — AN UN-RUN ROW IS A FAILURE, never a pass: `broken === declared`').toBe(d.unRunDeclared)
    expect(d.unRunBroken, 'F-3 (2) — the UN-RUN row carries its whole declared term as broken (3)').toBe(3)
    expect(d.unRunFailure, 'F-3 (2) — and its failure message names the stop rule rather than a silent skip').toContain('UN-RUN')
    // the drive is ISOLATED: its synthetic rows are not in the register (so every
    // count, term and reading `REGISTER-EXEC`/`REGISTER-TERMS`/`REGISTER-RED` below
    // reports is the register's own).
    expect(
      d.syntheticIds.filter((id) => results.some((r) => r.id === id)),
      'F-3 — the drive’s synthetic rows were removed again (`REGISTER-CONTROL`’s own push/pop discipline)',
    ).toEqual([])
  })

  it('REGISTER-EXEC · the ten typed rows execute deterministically and carry id · type · strategy · attempts-run · held · broken', () => {
    const ids = ['P-O2-IM-1', 'P-O1-TP-1', 'P-M-SM-1', 'P-O2-IM-2', 'P-TP-2', 'P-M-SM-2', 'P-O3-IM-2', 'P-O2-TP-1', 'P-O3-TP-1', 'P-M-SM-3']
    expect(results.map((r) => r.id), 'the register runs ALL TEN rows, in register order (an un-run row is a FAILURE; row 10 `P-M-SM-3` is APPENDED `2026-10-11`, `§2.6`)').toEqual(ids)
    // `F-4` (gate-4 re-audit): as filed this reading was `toBe(9)` — a CONSTANT.  With
    // every one of the nine rows holding, `ran === true` for all nine whatever the
    // guard did, so the count could not distinguish "no row was skipped" from "the
    // stop rule was never consulted".  It is now read AGAINST THE DRIVEN GUARD
    // (`F-3`'s `driveStopRuleBothWays()`): the same predicate that reports a
    // synthetic row UN-RUN here reports none of the register's own rows un-run, and
    // the count is stated as the register's length minus the rows it actually
    // skipped (the driven guard's un-run reading is asserted beside it).
    const stop = driveStopRuleBothWays()
    const skipped = results.filter((r) => !r.ran).map((r) => r.id)
    expect(stop.firedOnFive && stop.unRunRan === false, 'the guard that would skip a row is DRIVEN beside this reading (F-3): it fires on a five-broken streak and reports a row UN-RUN').toBe(true)
    expect(skipped, `no row of the register was skipped by the stop rule — read with the driven guard, whose own un-run row is \`${stop.unRunId ?? '?'}\``).toEqual([])
    expect(results.filter((r) => r.ran).length, `${results.length} rows less the ${skipped.length} the guard reports UN-RUN`).toBe(results.length - skipped.length)
    for (const r of results) {
      expect(r.attempts, `${r.id} executed its declared term (${r.declared})`).toBe(r.declared)
      expect(r.strategy, `${r.id} carries its strategy id`).toMatch(/^S-SS-[A-Z]+-\d+$/)
    }
  })

  it('REGISTER-TERMS · the declared total is 139 = its own ten terms, with the caps and the type subtotals', () => {
    const declared = results.map((r) => r.declared)
    // THE AS-FILED NINE TERMS, KEPT BESIDE (`RCA-8(d)`): 51, 12, 6, 7, 16, 2, 8, 8, 8
    // sum to 118 and every one of them is UNMOVED; the tenth term (`12` when the
    // `§2.6` lock row was APPENDED `2026-10-11`; `21` after the gate-4 confirmation
    // round's `LOCK-1`/`LOCK-2` dispositions added the terminal row's `2 × 3` readings
    // and `2` controls and the whole-log non-vacuity control) is row 10's own cell.
    expect(declared, 'the ten terms, in register order (the nine landed terms, then row 10’s 21)').toEqual([51, 12, 6, 7, 16, 2, 8, 8, 8, 21])
    const total = declared.reduce((a, b) => a + b, 0)
    expect(declared.slice(0, 9).reduce((a, b) => a + b, 0), 'the AS-FILED nine terms still sum to 118 — no landed term moved (§9e; RCA-8(d))').toBe(118)
    expect(total, '139 = 51 + 12 + 6 + 7 + 16 + 2 + 8 + 8 + 8 + 21 (a total quoted without its terms is a review finding)').toBe(139)
    expect(declared.every((t) => t <= 100), '≤100 attempts per row').toBe(true)
    expect(Math.max(...declared), 'the largest row is 51 ≤ 100 (headroom 49, UNMOVED)').toBe(51)
    expect(total <= 400, '139 ≤ 400 (headroom 261, was 270 at the amendment’s 130)').toBe(true)
    const subtotal = (type: string): number => results.filter((r) => r.type === type).reduce((a, r) => a + r.declared, 0)
    expect(subtotal('P-IM'), 'P-IM = 51 + 7 + 8 (UNMOVED)').toBe(66)
    expect(subtotal('P-SM'), 'P-SM = 6 + 2 + 21 — the lock row’s term joined the family (was 8 before the lock, 20 at the amendment’s 12)').toBe(29)
    expect(subtotal('P-TP'), 'P-TP = 12 + 16 + 8 + 8 (UNMOVED)').toBe(44)
    expect(subtotal('P-IM') + subtotal('P-SM') + subtotal('P-TP'), '66 + 29 + 44 = 139 ✓').toBe(139)
  })

  it('REGISTER-RED · the register’s rows HOLD at the contract’s declared END STATE (§9 item 3 / §9a item 5 — the inverted form; the pre-fix RED-direction reading is kept below as a note)', () => {
    // THE END STATE (`KB-3`, corrected at the kick-back).  §9 item 3 declares, of THIS
    // row: "The Implementer's green must invert THIS row (`broken === 0` per row)
    // together with the sixteen behavioural rows"; §9a item 5 restates the delegation
    // line as "the `REGISTER-RED` row (`broken === 0` for all nine rows — the inversion
    // §9 item 3 already declares)".  The AS-FILED row asserted the RED-STATE direction
    // instead (`broken > 0` over the eight moved rows, sums `54` broken / `64` held) —
    // impossible for ANY implementation to satisfy once `F-8` and `F-10` are greened,
    // because those two rows ARE the properties of `P-M-SM-2`'s attempt (1) and
    // `P-O3-IM-2`'s identity reading, so greening them lowers the sum by construction.
    // §4.3 item 2's "a red run whose failing set is EMPTY is itself a finding" governs
    // THE RED RUN against the unimplemented module and names the row CLASSES that must
    // redden THERE; it is not a green-state sum.  The row now asserts the declared END
    // STATE: every one of the nine rows holds, `P-O2-TP-1` likewise.
    //
    // THE PRE-FIX READINGS, KEPT VISIBLE AS A NOTE (annotate-beside, never rewritten —
    // RCA-8(d)); the as-filed bytes of §9 item 3 and §9a item 4/5 stand as the record:
    //  · THE RED RUN (`eacce3f`; corrected at `83f2dde`, §9a item 4) — 62 held /
    //    56 broken, whose per-row terms read 22+3+2+5+11+0+5+7+7 = 62 broken;
    //    the KB-1/KB-2 correction moved it to 64 held / 54 broken, per-row terms
    //    28+9+4+2+5+2+3+0+1 = 54.
    //  · `F-7` PROVENANCE (GATE-4 RE-AUDIT; annotate-beside — the as-filed note above
    //    STANDS, unrewritten, `RCA-8(d)`).  The two term vectors in that bullet are
    //    different quantities from two different trees, and the as-filed wording
    //    ("… = 62 broken") mislabels the first one.  MEASURED at the citing bytes:
    //      – `§9` item 3's table (the FIRST run's record) reads BROKEN
    //        `29+9+4+2+5+2+3+1+1 = 56` and HELD `22+3+2+5+11+0+5+7+7 = 62`
    //        (`62 + 56 = 118` ✓) — so `22+3+2+5+11+0+5+7+7 = 62` is the HELD vector,
    //        never a broken one.
    //      – `§9a` item 4's correction (the `KB-1`/`KB-2` tree, PRE-`ADV1`) reads
    //        BROKEN `28+9+4+2+5+2+3+0+1 = 54` beside HELD
    //        `23+3+2+5+11+0+5+7+8 = 64` (`64 + 54 = 118` ✓), its two per-row moves
    //        named there (`P-O2-IM-1` `22/29` → `23/28`; `P-O2-TP-1` `7/1` → `8/0`).
    //    NO LIVE EXPECTED VALUE MOVES with this note: the row's operative readings are
    //    the END STATE's below (`broken === 0` per row, `118` held), and the register's
    //    terms, row ids, caps and subtotals are unmoved.
    //  · THE POST-GREEN, PRE-CORRECTION READING (`460fb66`, the Implementer's own §9b
    //    item 3) — 98 held / 20 broken, per-row terms 13+2+2+1+0+2+0+0+0 = 20, EVERY
    //    ONE of them a red-set defect of an instrument, a fixture, the drive table or
    //    one row-internal return-shape contradiction (`KB-4`…`KB-7`, plus the `KB-6b`
    //    fixture note) — not one of them a behavioural red.
    //  · THE END STATE, MEASURED ON THE LANDED BYTES (`460fb66` + this pass's
    //    corrections) — 118 held / 0 broken, per-row terms
    //    51+12+6+7+16+2+8+8+8 = 118, i.e. every row `held === declared`.
    for (const r of results) {
      expect(r.held + r.broken, `${r.id}: held + broken === attempts-run`).toBe(r.attempts)
    }
    for (const r of results) {
      expect(
        r.broken,
        `${r.id} — the contract's END STATE (§9 item 3: "broken === 0 per row"; §9a item 5: "for all nine rows" — read over the TEN rows this amendment's register now carries): every term HOLDS on the landed bytes. Its row reads ${r.held} held / ${r.broken} broken (declared ${r.declared})`,
      ).toBe(0)
      expect(r.held, `${r.id} — at the end state each row's held readings are exactly its declared term`).toBe(r.declared)
    }
    expect(
      results.reduce((a, r) => a + r.broken, 0),
      'the register’s BROKEN readings, summed (END STATE: 0; the pre-fix reading was 20 against the landing before this pass’s corrections, 13+2+2+1+0+2+0+0+0, and 54 at the corrected red run, 28+9+4+2+5+2+3+0+1 — both kept as notes, neither rewritten; this amendment’s PRE-FIX reading adds row 10’s own broken terms, so this row is EXPECTED to redden until the host change `§2.6` item 5 lands)',
    ).toBe(0)
    expect(
      results.reduce((a, r) => a + r.held, 0),
      'the register’s HELD readings, summed WITH THEIR TERMS (END STATE: 139: 51+12+6+7+16+2+8+8+8+21 = 139; held + broken = 139. The as-filed nine-row reading 118 = 51+12+6+7+16+2+8+8+8 and the amendment’s own 130 = those nine + 12 stand beside it, unmoved — RCA-8(d); the gate-4 confirmation round moved row 10’s own term 12 → 21, LOCK-1/LOCK-2)',
    ).toBe(139)
    expect(results.length, 'the register is TEN rows, a signal and not a cap (AGENTS.md item 11(f): the as-filed nine-row count was a signal too, and the lock is enumerated rather than merged)').toBe(10)
  })

  it('REGISTER-CONTROL · the register’s own broken-detector is not vacuous — a wrong property is REPORTED broken, a right one is reported held', async () => {
    // The detector (`drive`) must FAIL for a falsified property and HOLD for a
    // satisfied one, or `REGISTER-RED`'s end-state reading (`broken === 0` per row)
    // above would prove nothing.
    // THE PROBE ROW'S TERMS, stated so its declaration and its drive agree:
    // `3` attempts = `1` HELD reading (`ctl·held`) + `2` BROKEN readings
    // (`ctl·broken`, `ctl·async-broken`), so `declared` — the register's
    // attempt-count term, read as `declared === attempts` at the end state
    // (`§5.6.1`; `printRegister`'s *"executed = declared?"*) — reads `3`.  The earlier
    // `2` named only the two BROKEN readings and under-counted the drive by one.
    const probeRow = { id: '__CONTROL__', type: 'P-TP' as const, strategy: 'S-SS-CTL-1', declared: 3, attempts: 0, held: 0, broken: 0, failure: null as string | null, ran: true }
    results.push(probeRow)
    drive('__CONTROL__', 'ctl·held', () => undefined)
    drive('__CONTROL__', 'ctl·broken', () => {
      throw new Error('a deliberately falsified property')
    })
    expect(probeRow.held, 'REGISTER-CONTROL — a satisfied property is HELD').toBe(1)
    expect(probeRow.broken, 'REGISTER-CONTROL — a falsified property is BROKEN (the detector can fail)').toBe(1)
    expect(probeRow.failure, 'REGISTER-CONTROL — and its first failure is reported, not swallowed').toContain('deliberately falsified')
    // THE ASYNC ARM (`F-2a`, measured this pass): a REJECTING async body must be
    // attributed to the row.  Passed to the synchronous `drive()`, such a body's
    // throw escaped as an unhandled rejection while the row counted HELD (MEASURED
    // on the three `async` call sites); `driveAsync` awaits it, so the row reads the
    // failure.  Without this control, `P-O2-IM-2`/`P-O3-IM-2`/`P-O3-TP-1`'s async
    // readings would be un-falsifiable.
    await driveAsync('__CONTROL__', 'ctl·async-broken', async () => {
      throw new Error('a deliberately falsified ASYNC property')
    })
    expect(probeRow.broken, 'REGISTER-CONTROL — a falsified ASYNC property is BROKEN too (the async arm attributes, never swallows)').toBe(2)
    expect(probeRow.held, 'REGISTER-CONTROL — and the satisfied reading is still exactly one').toBe(1)
    expect(probeRow.attempts, 'REGISTER-CONTROL — three attempts, each counted once').toBe(3)
    expect(probeRow.attempts, 'REGISTER-CONTROL — and the drive EQUALS the declaration (declared 3 = 1 held + 2 broken), so the probe row’s terms are aligned rather than merely labelled').toBe(probeRow.declared)
    results.pop()
  })
})
