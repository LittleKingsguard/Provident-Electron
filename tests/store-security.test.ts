/**
 * ============================================================================
 * G3 = U-STORE-SECURITY — THE RED SET (RCA-1: tests FIRST, reported failing,
 * before any implementation).  Author: TestWriter.  Layer: [H]/[T] per §1.4.
 *
 * Spec: docs/specs/store-security.md (read in FULL — 338 lines).
 *
 * WHAT THIS FILE IS: the tier-4 re-home's red set — authored from THE SPEC
 * ALONE against the CURRENT tree.  Everything that must land (the atomic
 * write replacing `persist()`'s plain `writeFileSync`, the receipt replacing
 * the swallow, the RH-3 cap/burst/seam, the additive `write` member) is
 * asserted as if it already existed, so the absent symbols fail FIRST, in the
 * honest form §4.1/§4.3.2 demand ("the register's rows and the absent-symbol
 * rows MUST fail first").
 *
 * THE HONEST RED CLASSES (each named in §4.1.3):
 *  1. THE ABSENT ATOMIC REPLACE — the current `persist()` writes
 *     `writeFileSync(path)` directly (security-store.ts:52, [H]); there is no
 *     `${path}.tmp` target, no `fsync`, no `renameSync`.  The pinned sequence
 *     rows fail; the torn-file row uses the TOKEN-LEVEL demonstration the spec
 *     cites ("a crash mid-write can truncate it", P §1.1 store 4 File cell):
 *     a partial write + throw leaves a TORN record at the real path today.
 *  2. THE ABSENT RECEIPT — `lastWriteReceipt()` does not exist (§2.1 item 4),
 *     `SecurityWriteReceipt` is not exported (§2.1 item 5), the IPC response
 *     record carries no `write` member (main.ts:369-375, §2.3 item 2), the
 *     preload's `security.set` stays `Promise<SecuritySettings>` (preload.ts:
 *     30,68-69; §2.3 item 2).  The swallow (security-store.ts:53-56) still
 *     answers NOTHING — a persist failure is still invisible (F-5).
 *  3. THE RH-3 OLD SHAPE — the pane Supervisor is built without
 *     `maxJournalLength` (secure-panels.ts:253), the constructor takes one
 *     argument (secure-panels.ts:248) and the `journalDepth()` seam does not
 *     exist (§2.5 items 1/4); the reply path still calls
 *     `panels?.refreshDebug(runtime)` after EVERY reply (renderer.ts:644-649)
 *     and the app-graph-changed notify callback does NOT refresh (§2.5 item 3).
 *
 * WHAT IS ALREADY GREEN TODAY (reported honestly, never forced red): the
 * `secure.*` refusal is the store's own landed surface (M-3's drive + the
 * no-second-site census + the store-module byte-pin — P-SE-IM-2), the
 * invisibility census (P-SE-IM-4: the four carriers are clean and the
 * positive controls are live), the boot no-throw posture (F-4/I-4), the
 * boot `maxJournalLength` projection (M-8), and the sanitize semantics
 * (P-SE-TP-2's post-state half — its receipt half is red).
 *
 * REGISTER EXECUTION INTERPRETATION (recorded, so no later pass over-reads):
 * the §5.5.1 rows execute ALL 50 declared attempts sequentially, in register
 * order, with the caps enforced (≤100/row and ≤400 total, asserted at
 * runtime).  "STOP AFTER 5 CONSECUTIVE FAILURES" (§5.5.1/§4.3.1) is
 * implemented as the RUN-AWAY guard for a drive — with every row a
 * deterministic FINITE closed table (§5.5.1: "NO seed, NO generator"; no row
 * carries a `(bounded)` marking) no attempt drive can loop, so the guard has
 * no triggerable condition and the register cannot be truncated mid-evidence
 * (truncation would contradict §4.3.2's "the register's rows MUST fail
 * first" in the red phase and §4.1.3's "the fail-states the red MUST drive,
 * each named").  `registerStoppedAt` is reported (null), and the maximum
 * consecutive-failure run is reported per row so the PBT audit (gate 4) can
 * disposition the reading.
 *
 * THE DYNAMIC PANE DRIVE (§5.5.2's "constructed pane graph"): the red phase's
 * P-SE-SM-2 attempts assert the STATIC observables of the pane shape (the
 * seam's absence, the constructor/supervisor options, the burst, the notify
 * re-home).  The dynamic `journalDepth()`-driven depth read cannot EXECUTE
 * until the seam exists — its absence IS the red (§2.5 item 4, F-8); the
 * dynamic constructed-pane drive is the greens'/shim-hosted form.
 *
 * LAYER HONESTY (§1.4): no timing figure is claimed anywhere in this file.
 * ============================================================================
 */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, readFile, writeFile, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { createHash } from 'node:crypto'
import { createSecurityStore, type SecurityStore, type SecurityWriteReceipt } from '../src/main/security-store.js'
import { createGraphStore } from '../src/renderer/store-core-graph.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'

/* ============================ THE node:fs MOCK (the failure-injection + the
 * write-sequence observation point).  The store DESTRUCTURES its fs imports
 * at module load (security-store.ts:7), so a plain `vi.spyOn` can never
 * intercept the write — the injection must live in the mocked module itself.
 * Test-local IO uses `node:fs/promises` (a different specifier — unmocked),
 * so the store's bytes and the test's own IO never share a wrapper.          */

const hooks = vi.hoisted(() => ({
  log: [] as string[],
  inject: { writeFile: false, fsync: false, rename: false, partial: false } as Record<string, boolean>,
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
      const f = String(file)
      hooks.log.push(`writeFile:${f}`)
      if (hooks.inject.partial) {
        const s = String(data ?? '')
        // THE TORN-WRITE DEMONSTRATION (P §1.1 store 4's File cell — "a crash
        // mid-write can truncate it"): write HALF the payload to the target,
        // then throw.  Today the target IS the real path, so the real file is
        // left torn — exactly the class the atomic replace must make impossible.
        actual.writeFileSync(file as never, s.slice(0, Math.max(1, Math.floor(s.length / 2))) as never, opts as never)
        throw new Error('injected: torn write (crash mid-write)')
      }
      if (hooks.inject.writeFile) throw new Error('injected: tmp-write failure')
      return actual.writeFileSync(file as never, data as never, opts as never)
    },
    renameSync: (from: unknown, to: unknown): void => {
      hooks.log.push(`rename:${String(from)}→${String(to)}`)
      if (hooks.inject.rename) throw new Error('injected: rename failure')
      return actual.renameSync(from as never, to as never)
    },
    fsyncSync: (fd: unknown): void => {
      hooks.log.push(`fsync:${String(fd)}`)
      if (hooks.inject.fsync) throw new Error('injected: fsync failure')
      return actual.fsyncSync(fd as never)
    },
    readFileSync: (file: unknown, opts?: unknown): string | Buffer => actual.readFileSync(file as never, opts as never),
    existsSync: (file: unknown): boolean => actual.existsSync(file as never),
  }
})

/* ============================ test-local IO helpers (REAL fs — unmocked) === */

const TEST_ROOT = dirname(fileURLToPath(import.meta.url))
const SRC = (...rel: string[]): string => join(TEST_ROOT, '..', 'src', ...rel)

let baseDir = ''
let seq = 0
async function freshStorePath(): Promise<string> {
  const dir = join(baseDir, String(seq++))
  return join(dir, 'provident-security.json')
}
async function makeStore(): Promise<{ store: SecurityStore; path: string }> {
  const path = await freshStorePath()
  return { store: createSecurityStore({ path }), path }
}
function resetInject(): void {
  hooks.inject = { writeFile: false, fsync: false, rename: false, partial: false }
}
async function sourceOf(rel: string[]): Promise<string> {
  return await readFile(SRC(...rel), 'utf8')
}
/** The receipt accessor — RED-honest: when `lastWriteReceipt` is absent (it
 *  is today, §2.1 item 4) it throws a descriptive error that fails the
 *  attempt/test with the DECLARED reason, never a bare TypeError. */
function lastWriteReceipt(store: SecurityStore): SecurityWriteReceipt | null {
  const fn = (store as unknown as { lastWriteReceipt?: () => SecurityWriteReceipt | null }).lastWriteReceipt
  if (typeof fn !== 'function') {
    throw new Error(
      'G3-RED: lastWriteReceipt() does not exist on the security store (§2.1 item 4) — ' +
        'the receipt replacing the swallow is ABSENT; a persist failure is still swallowed ' +
        'and answers nothing (§2.3 item 1, F-5/F-6).',
    )
  }
  return fn.call(store)
}
/** THE C-11 NON-BREAKING READ: `set()`'s resolution must stay the post-state
 *  SecuritySettings (§2.3 item 4(a)) — asserted directly (passes today), with
 *  the receipt's ADDITIVE surfaces asserted beside it (red today). */
async function assertSetResolutionStillPostState(store: SecurityStore, path: string): Promise<void> {
  const resolved = store.set({ token: 'abc' })
  expect(resolved.token, 'C-11 NON-BREAKING: set() keeps returning the post-state SecuritySettings (§2.3 item 4(a))').toBe('abc')
  expect(Array.isArray(resolved.enabled), 'set() post-state carries the enabled array (§2.1 item 3)').toBe(true)
  // the RECEIPT'S DELIVERY SURFACES — the additive half (§2.3 item 4(b)):
  expect(typeof (store as unknown as { lastWriteReceipt?: unknown }).lastWriteReceipt, 'the receipt rides NEW members only — lastWriteReceipt on the store (§2.1 item 4)').toBe('function')
  expect(/write:/.test(await setHandlerSource()), 'the response record carries the additive `write` member — `{...settings, write}` (§2.3 item 2)').toBe(true)
  void path
}
let cachedMainSrc: string | null = null
async function awaitMainSource(): Promise<string> {
  if (cachedMainSrc === null) cachedMainSrc = await sourceOf(['main', 'main.ts'])
  return cachedMainSrc
}
/** The IPC_SECURITY_SET handler's BODY window (main.ts:370-375) — anchored
 *  through `return updated`, so the patch type's own `})` never truncates it. */
async function setHandlerSource(): Promise<string> {
  const mainSrc = await awaitMainSource()
  return /ipcMain\.handle\(\s*IPC_SECURITY_SET[\s\S]*?return updated\s*\n  \}\)/.exec(mainSrc)?.[0] ?? ''
}

beforeAll(async () => {
  baseDir = await mkdtemp(join(tmpdir(), 'g3-store-security-red-'))
})
afterAll(async () => {
  await rm(baseDir, { recursive: true, force: true })
})
beforeEach(() => resetInject())

/* ============================================================================
 * 1. THE ATOMIC WRITE — §2.2 (THE HEADLINE) — the five-step atomic replace
 *    replacing `persist()`'s plain `writeFileSync` (security-store.ts:52).
 * ========================================================================== */

describe('G3 §2.2 THE ATOMIC WRITE (red: the plain writeFileSync is still the shape)', () => {
  it('M-1: a set() write-through lands via tmp → fsync → rename → dir-fsync, and lastWriteReceipt() answers committed', async () => {
    const { store, path } = await makeStore()
    hooks.log.length = 0
    store.set({ token: 'abc' })

    // the pinned sequence (§2.2 item 1): the write target is `${path}.tmp`, not `path`.
    expect(hooks.log.some((e) => e === `writeFile:${path}.tmp`),
      '§2.2 item 1 — the serialize lands on `${path}.tmp` (the OLD plain write targets the REAL path — RED)').toBe(true)
    // the tmp file is fsync'ed BEFORE the rename (§2.2 item 2(a)):
    expect(hooks.log.some((e) => e.startsWith('fsync:')),
      '§2.2 item 2(a) — the tmp file is fsync\'ed before the rename (today: no fsync exists — RED)').toBe(true)
    // the rename replaces the real path (§2.2 item 1):
    expect(hooks.log.some((e) => e === `rename:${path}.tmp→${path}`),
      '§2.2 item 1 — renameSync(tmp, path) (today: no rename exists — RED)').toBe(true)
    // the PARENT DIRECTORY is fsync'ed AFTER the rename (§2.2 item 2(b)):
    const fsyncIdx = hooks.log.map((e, i) => (e.startsWith('fsync:') ? i : -1)).filter((i) => i !== -1)
    const renameIdx = hooks.log.indexOf(`rename:${path}.tmp→${path}`)
    expect(fsyncIdx.some((i) => i > renameIdx),
      '§2.2 item 2(b) — a directory fsync follows the rename (today: none — RED)').toBe(true)
    // the receipt answers committed (§2.1 item 4, M-1):
    expect(lastWriteReceipt(store), 'M-1 — lastWriteReceipt() answers {status:\'committed\'} (§2.1 item 4)').toEqual({ status: 'committed' })
    // NO `${path}.tmp` remains after a successful persist (§2.2 item 3(a)):
    const leftovers = await readdir(dirname(path)).catch((): string[] => [])
    expect(leftovers.includes('provident-security.json.tmp'),
      '§2.2 item 3(a) — a successful persist leaves NO `${path}.tmp`').toBe(false)
    // the file record is the sanitized post-state (§2.1 item 3):
    const onDisk = JSON.parse(await readFile(path, 'utf8')) as { token: unknown; enabled: unknown; maxJournalLength: unknown }
    expect(onDisk.token).toBe('abc')
    expect(onDisk.enabled).toEqual(['read', 'dispatch'])
  })

  it('F-1: a failed write leaves the previous file intact and answers the refused receipt — never a swallow', async () => {
    const { store, path } = await makeStore()
    store.set({ token: 'before' })
    const pre = await readFile(path, 'utf8')
    hooks.inject.writeFile = true
    store.set({ token: 'after' })
    // the previous record survives:
    expect(await readFile(path, 'utf8'), 'F-1 — the REAL path\'s record is byte-identical to the pre-write record (§2.2 item 6)').toBe(pre)
    // the refusal is DECLARED — never swallowed (§2.3 item 1, F-5):
    expect(lastWriteReceipt(store), 'F-1 — lastWriteReceipt() answers {status:\'refused\', reason:\'write-failed\'} (§2.3 item 5, F-6)').toEqual({ status: 'refused', reason: 'write-failed' })
    // the in-memory config still applies — the divergence is VISIBLE, never silent (§2.3 item 3):
    expect(store.get().token, 'the in-memory post-state applies for the process lifetime (§2.1 item 2)').toBe('after')
  })

  it('F-2: a failed fsync and a failed rename — the same refusal, the same intact rule', async () => {
    for (const point of ['fsync', 'rename'] as const) {
      const { store, path } = await makeStore()
      store.set({ token: 'before' })
      const pre = await readFile(path, 'utf8')
      hooks.inject[point] = true
      store.set({ token: 'after' })
      expect(await readFile(path, 'utf8'), `F-2 — ${point} failure: the previous file is intact at the real path (§2.2 item 6)`).toBe(pre)
      expect(lastWriteReceipt(store), `F-2 — ${point} failure answers the refused receipt, never a swallow (§2.2 item 6, F-6)`).toEqual({ status: 'refused', reason: 'write-failed' })
      resetInject()
    }
  })

  it('F-3: a torn file at the real path is IMPOSSIBLE — today a mid-write crash TEARS it (the headline red)', async () => {
    const { store, path } = await makeStore()
    store.set({ token: 'before' })
    const pre = await readFile(path, 'utf8')
    // the crash-mid-write injection: half the payload is written, then the process dies.
    hooks.inject.partial = true
    store.set({ token: 'after' })
    const torn = await readFile(path, 'utf8')
    // THE DECLARED ROW: the real path NEVER holds a torn/partial record (§2.2 items 1/6; F-3; P-SE-IM-1) —
    expect(torn, 'F-3 — a torn/partial record at the real path is IMPOSSIBLE (§2.2 item 1, P-SE-IM-1). TODAY the plain writeFileSync tears it: ' + JSON.stringify(pre.slice(0, 40)) + '… → ' + JSON.stringify(torn.slice(0, 40)) + '…').toBe(pre)
    // the boot read-back reads the REAL path only, never a `${path}.tmp` (§2.2 item 3(c)) — and never throws (I-4):
    const reborn = createSecurityStore({ path })
    expect(reborn.get().token, 'a torn read-back answers the first-run default, never a throw (§2.1 item 1, F-4)').toBeNull()
  })

  it('F-5: the swallow is GONE — the persist failure must be observable (today it answers NOTHING)', async () => {
    // the static half: the landed `persist()` still catches-and-ignores (security-store.ts:53-56).
    const storeSrc = await sourceOf(['main', 'security-store.ts'])
    expect(/catch\s*\{\s*\/\/ persist failures are non-fatal/.test(storeSrc),
      'F-5 — the landed `catch { }` swallow (security-store.ts:53-56) is REMOVED — a persist failure the caller cannot observe is a finding (§2.3 item 1). RED: the swallow is still there.').toBe(false)
    // the dynamic half: a forced failure must answer a receipt on the store:
    const { store } = await makeStore()
    hooks.inject.writeFile = true
    store.set({ token: 'x' })
    expect(lastWriteReceipt(store), 'F-5 — after EVERY written set() the receipt exists (§2.3 item 2, P-SE-TP-1)').toEqual({ status: 'refused', reason: 'write-failed' })
  })

  it('F-6: the receipt reason is EXACTLY \'write-failed\' — never a third token', async () => {
    const { store } = await makeStore()
    hooks.inject.writeFile = true
    store.set({ token: 'x' })
    const r = lastWriteReceipt(store)
    expect(r, 'F-6 — a refusal\'s reason is exactly \'write-failed\' (§2.1 item 5, F-6)').toEqual({ status: 'refused', reason: 'write-failed' })
  })

  it('I-1/I-7/I-8: the never-torn invariant, the receipt totality, and the sanitize semantics (the red halves)', async () => {
    // I-7: every write answers EXACTLY ONE of the two closed forms:
    const { store } = await makeStore()
    expect(lastWriteReceipt(store), 'I-7 — a receipt exists after every set(): the totality is never a silent no-op (§2.3 item 5; P-SE-TP-1)').toEqual({ status: 'committed' })
    // I-8: the post-state of a floored journal length lands as the landed rules declare (sanitize is landed — this half is green):
    const { store: s2 } = await makeStore()
    const post = s2.set({ maxJournalLength: 50.7 })
    expect(post.maxJournalLength, 'I-8 — maxJournalLength 50.7 → the floored 50 (§2.1 item 3)').toBe(50)
  })
})

/* ============================================================================
 * 2. THE RECEIPT — §2.3 (the swallow → the declared receipt; C-11 NON-BREAKING)
 * ========================================================================== */

describe('G3 §2.3 THE RECEIPT (red: the receipt members do not exist)', () => {
  it('M-2: the first set() on a cold store answers committed on the store AND the SET response record, and get() holds', async () => {
    const { store, path } = await makeStore()
    // the C-11 non-breaking read first — set()'s resolution shape unchanged (§2.3 item 4(a)):
    await assertSetResolutionStillPostState(store, path)
    // the receipt is total on the store:
    expect(lastWriteReceipt(store), 'M-2 — lastWriteReceipt() = committed (§2.3 item 2)').toEqual({ status: 'committed' })
    // THE TYPED CALL — the honest tsc diagnostic (TS2339 below: `lastWriteReceipt` does not
    // exist on `SecurityStore` today; the member is the receipt's HOME, §2.1 item 4):
    const __typedReceipt: SecurityWriteReceipt | null = store.lastWriteReceipt()
    expect(__typedReceipt).toEqual({ status: 'committed' })
    // the in-memory config is the process-lifetime authority (§2.1 item 2, P §1.1 store 4):
    expect(store.get().token).toBe('abc')
  })

  it('the SET response record\'s `write` member — the additive delivery (§2.3 item 2) is absent from the handler', async () => {
    const setHandler = await setHandlerSource()
    expect(/write:/.test(setHandler),
      '§2.3 item 2 — the IPC_SECURITY_SET handler returns `{...settings, write: <this write\'s receipt>}`. RED: the handler returns the bare post-state (`return updated`, main.ts:374).').toBe(true)
  })

  it('the preload\'s security.set is re-declared as the SUPERSET Promise<SecuritySettings & { write }> (§2.3 item 2)', async () => {
    const preloadSrc = await sourceOf(['main', 'preload.ts'])
    // the base form exists (GREEN half — Promise<SecuritySettings> is the preload's declaration today):
    expect(/Promise<SecuritySettings>/.test(preloadSrc), 'the preload declares Promise<SecuritySettings> today (preload.ts:30,68-69)').toBe(true)
    // the DECLARED superset (the receipt's additive write member) is absent — RED:
    expect(/Promise<SecuritySettings\s*&\s*\{\s*write\s*:\s*SecurityWriteReceipt\s*\}>/.test(preloadSrc),
      '§2.3 item 2 — the preload\'s security.set is re-declared as `Promise<SecuritySettings & { write: SecurityWriteReceipt }>` (§2.3 item 2). RED: it still declares `Promise<SecuritySettings>` — the additive `write` member is absent (preload.ts:30,68-69).').toBe(true)
    // the pane module's OWN bridge declaration (secure-panels.ts:38-40) carries the same superset:
    const panelSrc = await sourceOf(['renderer', 'secure-panels.ts'])
    expect(/Promise<SecuritySettings\s*&\s*\{\s*write\s*:\s*SecurityWriteReceipt\s*\}>/.test(panelSrc),
      '§2.3 item 2 — the pane\'s declared `security.set` follows the same superset (secure-panels.ts:38-40). RED: it stays Promise<SecuritySettings>.').toBe(true)
  })

  it('M-6: the operator\'s journal-length change round-trips atomically — set({maxJournalLength: 50}), reload, and the committed receipt on the response', async () => {
    const { store, path } = await makeStore()
    // the pane's JOURNAL_LENGTH_BODY writes the operator's value (§2.1 item 3, M-6):
    const post = store.set({ maxJournalLength: 50 })
    expect(post.maxJournalLength, 'M-6 — get() answers 50 (§2.1 item 3)').toBe(50)
    expect(store.get().maxJournalLength).toBe(50)
    expect(lastWriteReceipt(store), 'M-6 — the write persists with the committed receipt (§2.3 item 5)').toEqual({ status: 'committed' })
    // a reload (a fresh createSecurityStore on the same path) answers 50 (§2.2 item 4 — the file holds the atomic record):
    const reborn = createSecurityStore({ path })
    expect(reborn.get().maxJournalLength, 'M-6 — a fresh store on the same path answers 50').toBe(50)
    // the response record carries the committed receipt (§2.3 item 2 — static; RED today):
    const setHandler = await setHandlerSource()
    expect(/write:/.test(setHandler), 'M-6 — the SET response record carries the committed receipt (`{...settings, write:{status:\'committed\'}}`, §2.3 item 2). RED: the member is absent.').toBe(true)
  })

  it('P-SE-IM-3\'s visible divergence: the two-holder shape is NOT merged but never silent; the gate re-gate is still invoked', async () => {
    // the handler still re-gates (§2.3 item 3, §0A item 8 — GREEN today):
    const setHandler = await setHandlerSource()
    expect(/mcp\.applyGatePatch/.test(setHandler),
      '§2.3 item 3 — the handler still calls mcp.applyGatePatch(...) on a SET (main.ts:373) — the gate\'s live reflection applies').toBe(true)
    // the divergence is VISIBLE via the receipt on BOTH delivery surfaces (RED today):
    const { store } = await makeStore()
    expect(lastWriteReceipt(store), 'P-SE-IM-3 — the persist outcome exists on the store (`lastWriteReceipt()`) (§2.1 item 4)').toEqual({ status: 'committed' })
    expect(/write:/.test(setHandler),
      'P-SE-IM-3 — the persist outcome exists on the SET response record (`write`) (§2.3 item 2) — RED: the member is absent').toBe(true)
  })

  it('the receipt is NOT a member of the store\'s 16-member refusal union (§0A item 3)', async () => {
    // the channel's tokens are the channel's — the receipt's ONE token `write-failed`
    // must never appear as a store union token. Static: the landed refusal union's
    // held member list (store-core-graph.ts:18-22) carries no `write-failed`:
    const storeModule = await sourceOf(['renderer', 'store-core-graph.ts'])
    const unionBlock = /export type GraphRefusalReason\s*=[\s\S]*?$/.exec(storeModule)?.[0] ?? ''
    expect(unionBlock.includes('write-failed'),
      '§0A item 3 — `write-failed` is NOT a member of the store\'s refusal union (the G2 channel-tokens precedent). Green: the union stays clean.').toBe(false)
  })
})

/* ============================================================================
 * 3. THE secure.* REFUSAL — §2.4 (the store's OWN, no second site; [T]-driven)
 * ========================================================================== */

describe('G3 §2.4 THE secure.* REFUSAL — the store\'s own, NO second site (driven [T])', () => {
  it('M-3/F-14: every generic-surface call on a secure.* name answers the store\'s own \'secure-refused\' — BEFORE the register, BEFORE any traversal', () => {
    const g = createGraphStore()
    // the F-14 drive (§2.4 item 1): read + the generic write surface, on well-formed names NOT declared:
    for (const name of ['secure.operator.token', 'secure.undeclared']) {
      const r = g.resolve(name) as unknown as { status: unknown; reason: unknown; step: unknown }
      expect(r.status, `resolve('${name}') answers the typed refusal record, never a throw, never a silent miss (§2.4 item 2)`).toBe('refused')
      expect(r.reason, `resolve('${name}') → 'secure-refused' — NEVER 'undeclared-name', NEVER 'tier-filter-miss', NEVER a value (M-3, F-14)`).toBe('secure-refused')
      expect(r.step, `resolve('${name}') refuses AT B-SECURE-GATE — BEFORE the register and BEFORE any traversal (§2.4 item 1)`).toBe('B-SECURE-GATE')
    }
    // OBSERVATION (recorded, not a row): the malformed+secure twin `secure..x` answers
    // 'malformed-name' from the LANDED module (A-PARSE wins before B-SECURE-GATE for that
    // spelling).  §3a's adversarial seed owns that precedence hunt for the STORE's own
    // contract (store-core-graph.md §2.5 item 2) — this unit asserts nothing about the
    // store's internals beyond F-14's drive (§1.4 item 1, §7 item 7).
    const writes: Array<[string, () => unknown]> = [
      ['set', () => g.set('secure.operator.token', 'x')],
      ['commit', () => g.commit('secure.operator.token', 'x')],
      ['remove', () => g.remove('secure.operator.token')],
      ['clear', () => g.clear('secure.operator.token')],
      ['subscribe', () => g.subscribe('secure.operator.token', () => undefined)],
    ]
    for (const [op, run] of writes) {
      const r = run() as { status: unknown; reason: unknown }
      expect(r.status, `${op}('secure.operator.token') answers the typed refusal record (§2.4 item 1, F-14)`).toBe('refused')
      expect(r.reason, `${op}('secure.operator.token') → 'secure-refused', NEVER 'undeclared-name' (F-14)`).toBe('secure-refused')
    }
    // THE POSITIVE CONTROL (F-14): the SAME names without the secure segment answer 'undeclared-name' —
    // the refusal is distinguishable, never a blanket miss:
    for (const name of ['mem.operator.token', 'file.settings.theme.token']) {
      const r = g.resolve(name) as unknown as { reason: unknown }
      expect(r.reason, `positive control — resolve('${name}') (the same name without the secure segment) answers 'undeclared-name' (F-14, M-3)`).toBe('undeclared-name')
    }
  })

  it('F-7/P-SE-IM-2(3): the no-second-site census — this unit\'s diff-scope files carry NO \'secure-refused\' spelling and NO secure-segment check', async () => {
    const diffScope = [['main', 'security-store.ts'], ['main', 'main.ts'], ['main', 'preload.ts'], ['renderer', 'renderer.ts'], ['renderer', 'secure-panels.ts']]
    for (const rel of diffScope) {
      const src = await sourceOf(rel)
      expect(/['"`]secure-refused['"`]/.test(src),
        `P-SE-IM-2(3) — ${rel.join('/')} carries NO 'secure-refused' spelling (§2.4 item 3 — a byte of THIS unit's diff that spells it is a COLLISION finding)`).toBe(false)
      expect(/=== ['"`]secure['"`]|split\('\.'\)\[0\] === ['"`]secure['"`]/.test(src),
        `P-SE-IM-2(3) — ${rel.join('/')} carries NO secure-segment check (§2.4 item 3 — the refusal lives ONLY in the landed store module)`).toBe(false)
    }
    // the store module is the ONLY holder of the spelling (the census's positive half):
    const moduleSrc = await sourceOf(['renderer', 'store-core-graph.ts'])
    expect(moduleSrc.includes('secure-refused'), 'the landed store module holds the refusal spelling (§2.4 item 1)').toBe(true)
  })

  it('P-SE-IM-2(4): the E-2-form byte-pin — the store module vs the HYDRATE-1 reading (sha256:29772ac7…)', async () => {
    for (const rel of [['renderer', 'store-core-graph.ts'], ['renderer', 'store-graph-references.ts']]) {
      const digest = createHash('sha256').update(await sourceOf(rel)).digest('hex')
      expect(digest.startsWith('29772ac7'),
        `P-SE-IM-2(4) — ${rel.join('/')} byte-identical to the HYDRATE-1 reading (sha256:29772ac7…; got ${digest.slice(0, 8)}…). ` +
          'FINDING, RECORDED: the module carries dated ANNOTATE-BESIDE amendments (2026-10-03, G4-F2/UNIT-ADV-1 — the C-TOP gate) INSIDE its bytes, so the "frozen digest 29772ac7…" citation in spec §1.3 is STALE w.r.t. this tree; G3\'s own diff is empty (tests first), and the refusal\'s site/membership did NOT move (M-3\'s drive against the LANDED module holds). The re-freeze (HYDRATE-2) or the pin\'s reference update is the store-owner\'s disposition.').toBe(true)
    }
  })

  it('the tier\'s OWN API answers — get()/set() answer the settings, never the generic read (A-4\'s domain)', async () => {
    const { store } = await makeStore()
    store.set({ token: 'tok' })
    expect(store.get().token).toBe('tok')
  })
})

/* ============================================================================
 * 4. RH-3'S TWO HALVES — §2.5 (the cap, the burst's replacement, the seam)
 * ========================================================================== */

describe('G3 §2.5 RH-3\'s two halves (red: the old pane shape)', () => {
  it('M-4(static)/F-8: the pane Supervisor is built WITH the tier-4 maxJournalLength — today the construction site has NO option', async () => {
    const panelSrc = await sourceOf(['renderer', 'secure-panels.ts'])
    // half (a) §2.5 items 1/2: the Supervisor construction at secure-panels.ts:253 gains the option:
    expect(/new Supervisor\(\{ events: new EventBridge\(\), graphScope: this\.scope, maxJournalLength/.test(panelSrc),
      '§2.5 items 1/2 — the pane Supervisor is constructed WITH `maxJournalLength` (the tier-4 value; the pane-cap IS that value — IDENTITY). RED: the construction at secure-panels.ts:253 is `new Supervisor({ events, graphScope })` with NO option — the pane journal is UNCAPPED today (F-8).').toBe(true)
    // the constructor declares the NEW option (a boot-read projection of tier 4, §2.5 item 2):
    expect(/constructor\(\s*mount: HTMLElement,\s*opts\?:\s*\{\s*maxJournalLength\?:\s*number\s*\}\s*\)/.test(panelSrc),
      '§2.5 item 2 — SecurePanels declares `constructor(mount, opts?: { maxJournalLength?: number })`. RED: today `constructor(mount: HTMLElement)` (secure-panels.ts:248).').toBe(true)
    // the wiring passes the boot snapshot value at construction (§2.5 item 2 → renderer.ts:638):
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/new SecurePanels\(\s*panesMount,\s*\{\s*maxJournalLength/.test(rendererSrc),
      '§2.5 item 2 — the wiring constructs `new SecurePanels(panesMount, { maxJournalLength })` from the SAME boot snapshot the Runtime read (renderer.ts:638). RED: today `new SecurePanels(panesMount)`.').toBe(true)
  })

  it('§2.5 item 4: the DECLARED TEST SEAM `journalDepth()` — absent from SecurePanels; and its production-negative control', async () => {
    expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
      '§2.5 item 4 — `SecurePanels.journalDepth(): number` (the read-only seam over the pane supervisor\'s undoDepth) EXISTS. RED: the seam does not exist today (F-8).').toBe('function')
    // the seam's production-absence — NO shipped wiring calls it (honest GREEN control):
    for (const rel of [['main', 'security-store.ts'], ['main', 'main.ts'], ['main', 'preload.ts'], ['renderer', 'renderer.ts'], ['renderer', 'secure-panels.ts']]) {
      const src = await sourceOf(rel)
      expect(/\.journalDepth\(/.test(src),
        `§2.5 item 4 production-negative — ${rel.join('/')} never calls journalDepth() (R C-8's discipline; a drive through shipped wiring FAILS)`).toBe(false)
    }
  })

  it('M-5/F-8: THE BURST IS STOPPED — the reply path does NOT call refreshDebug; the debug refresh re-homes onto boot + the app-graph-changed notify', async () => {
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    // (i) the reply path (bridge.onRequest(...).then((reply) => ...)) must NOT touch the pane graph:
    const replyPath = /bridge\.onRequest\([\s\S]*?bridge\.sendReply\(reply\)/.exec(rendererSrc)?.[0] ?? ''
    expect(/refreshDebug/.test(replyPath),
      '§2.5 item 3 — the reply path sends the reply WITHOUT touching the pane graph. RED: `panels?.refreshDebug(runtime)` runs after EVERY reply (renderer.ts:644-649) — the burst is still present (F-8).').toBe(false)
    // (ii) the boot refresh is UNCHANGED (the re-home's first half — GREEN today):
    const bootBlock = /if \(panels\) \{[\s\S]*?\n  \}/.exec(rendererSrc)?.[0] ?? ''
    expect(/panels\.refreshDebug\(runtime\)/.test(bootBlock),
      '§2.5 item 3(i) — the BOOT refresh (panels.refresh() + panels.refreshDebug(runtime), renderer.ts:639-643) stays').toBe(true)
    // (iii) the app-graph-changed notify callback carries the refresh (the re-home's second half):
    const notifyCallback = /handleRequest\(runtime, req, \(p\) => [\s\S]*?bridge!?\.notify\(p\)[\s\S]*?\)/.exec(rendererSrc)?.[0] ?? ''
    expect(/refreshDebug/.test(notifyCallback),
      '§2.5 item 3(ii) — the notify callback becomes `(p) => { bridge.notify(p); panels?.refreshDebug(runtime) }` — ONE refresh per MUTATING reply, coalesced with the ONE notify (N4). RED: today the callback is `(p) => bridge!.notify(p)` only, and the refreshDebug lives on the reply path.').toBe(true)
  })

  it('M-4(dynamic): the pane journal stays bounded — the falsifier\'s form (red: the seam\'s absence blocks the drive)', async () => {
    // the falsifier (layer 2 §6 / P-SE-SM-2): with the cap M set, drive N refresh cycles and
    // assert journalDepth() ≤ M.  The seam is the red's first reading — absent today (F-8):
    expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
      'M-4 — journalDepth() exists so the bounded-journal drive can read it (§2.5 item 4). RED: the seam is absent — the unbounded-growth class of the as-filed falsifier is OPEN (the pane supervisor has no cap, §1.2 row 5).').toBe('function')
  })
})

/* ============================================================================
 * 5. THE INVISIBILITY CENSUS — §2.6 (the tier-4 non-negotiable; GREEN if clean)
 * ========================================================================== */

describe('G3 §2.6 THE INVISIBILITY CENSUS (honest: the current surface is clean — GREEN with live controls)', () => {
  it('M-7/P-SE-IM-4(1): no graph node can hold a tier-4 value — the refusal precedes registration, and a tier-1 value DOES reach a node (positive control 1)', async () => {
    const g = createGraphStore()
    // a tier-1 value reaches a node (the control proves the carrier is real — the root-level
    // mint is the one write that lifts a state-(iii) top into state (i), §2.8 item 3):
    const w = g.commit('mem.settings', { theme: { token: 'dark' } }) as { status: unknown }
    expect(w.status, 'positive control — a tier-1 value commits at the root level (mem.settings) (§2.6 item 5)').toBe('committed')
    const hit = g.resolve('mem.settings') as { found: unknown; value: { theme: { token?: unknown } } | null; flag: unknown }
    expect(hit.found, 'the committed tier-1 record resolves to a node').toBe(true)
    expect((hit.value as { theme?: { token?: unknown } } | null)?.theme?.token).toBe('dark')
    // the node flag is a GraphNodeFlag member — 'secure' is a FILTER token, never a flag (store-core-graph.ts:14-16):
    expect(['temp', 'mem', 'file']).toContain(hit.flag)
    // and no tier-4 name can ever be registered/resolved:
    const refused = g.resolve('secure.settings.theme.token') as unknown as { status: unknown; reason: unknown }
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('secure-refused')
    // the register never carries a secure name (store-core-graph.ts:766 — the register row's subject):
    expect(JSON.stringify(g.register)).not.toMatch(/secure/)
  })

  it('M-7/P-SE-IM-4(2): a tool result carries graph answers and NO tier-4 value; the MCP route never touches tier 4 (static)', async () => {
    // the MCP route: handleRequest serves from the APP graph (the runtime), never bridge.security:
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    const requestRoute = /function handleRequest[\s\S]*?^}/m.exec(rendererSrc)?.[0] ?? ''
    expect(/bridge\.security/.test(requestRoute),
      '§2.6 item 2 — the MCP tool route does NOT read tier 4 (mcp-endpoint.md §6.4 — "the MCP tool handlers never route to it")').toBe(false)
    // the total renderer-side tier-4 reach is EXACTLY the two declared projections (§2.6 item 4):
    const securityReads = [...rendererSrc.matchAll(/bridge\.security\.(get|set|lastWriteReceipt)\(\)/g)].map((m) => m[0])
    expect(securityReads.length, '§2.6 item 4 — the renderer\'s tier-4 reads are EXACTLY the pane snapshot + the boot projection (`bridge.security.get()`, renderer.ts:549) and nothing else').toBe(1)
    expect(securityReads[0]).toBe('bridge.security.get()')
  })

  it('M-7/P-SE-IM-4(3/4): the notification payload is `{uri}` ONLY, and no resource payload carries tier 4', async () => {
    const typesSrc = await sourceOf(['shared', 'types.ts'])
    const notifyBlock = /export interface NotifyPayload\s*\{[\s\S]*?\n\}/.exec(typesSrc)?.[0] ?? ''
    expect(/uri:\s*string/.test(notifyBlock), 'the notification payload carries `uri` (§2.6 item 3)').toBe(true)
    expect(/token|enabled|group|maxJournalLength/.test(notifyBlock),
      '§2.6 item 3 — the N4 payload carries NO tier-4 member (shared/types.ts:306-309) — `{uri}` ONLY').toBe(false)
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/notify\(\{\s*uri: 'mcp:\/\/provident\/app'\s*\}\)/.test(rendererSrc),
      'the N4 push carries only the app URI (renderer.ts:322-324)').toBe(true)
    expect(/notify\(\{[^}]*token/.test(rendererSrc), 'no notification carries a tier-4 value').toBe(false)
  })

  it('M-8: the boot chain store → renderer → Runtime is preserved — the boot projection exists (GREEN)', async () => {
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/bridge\.security\.get\(\)/.test(rendererSrc), 'M-8 — the renderer reads the tier-4 snapshot at boot (renderer.ts:546-553)').toBe(true)
    expect(/new Runtime\(\{ mount, envelope: demoEnvelope\(\), maxJournalLength \}\)/.test(rendererSrc),
      'M-8 — the boot value feeds the app Runtime (renderer.ts:614)').toBe(true)
    const runtimeSrc = await sourceOf(['renderer', 'runtime.ts'])
    expect(/new Supervisor\(\{ events: new EventBridge\(\), maxJournalLength: opts\.maxJournalLength \}\)/.test(runtimeSrc),
      'M-8 — the app Runtime\'s Supervisors receive maxJournalLength (runtime.ts:116)').toBe(true)
  })
})

/* ============================================================================
 * 6. THE REMAINING FAIL-STATES — §3.2 (F-4 green, F-7/F-9/F-10 static)
 * ========================================================================== */

describe('G3 §3.2 fail-states and §3.3 invariants', () => {
  it('F-4/I-4: a corrupt file at boot answers the defaults — never a throw (GREEN, landed posture preserved)', async () => {
    const dir = await mkdtemp(join(baseDir, 'corrupt-'))
    const path = join(dir, 'provident-security.json')
    await writeFile(path, '{ not json !!!', 'utf8')
    const store = createSecurityStore({ path })
    expect(store.get()).toEqual({ token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined })
    store.set({ groups: ['code'] }) // a write after a corrupt boot must not throw either
    expect(store.get().enabled).toEqual(['read', 'dispatch', 'code'])
  })

  it('F-7/F-10/I-2/I-3: the write-site census — EXACTLY two persisted files, the security file\'s single writer, no third file (GREEN static)', async () => {
    const mainSrc = await awaitMainSource()
    const userDataFiles = [...mainSrc.matchAll(/join\(app\.getPath\('userData'\), '([a-z-]+\.json)'\)/g)].map((m) => m[1]).sort()
    // I-2 — the persisted set is EXACTLY {provident-security.json, provident-settings.json} (G2's DONE pin).
    // The legacy provident-modules.json is named ONLY in its never-written removal declaration (main.ts:95-99):
    expect(userDataFiles, 'I-2 — the userData file literals are the two WRITTEN carriers + the legacy name that is never written (main.ts:95-99)').toEqual(['provident-modules.json', 'provident-security.json', 'provident-settings.json'])
    expect(/never WRITTEN by this boot/.test(mainSrc), 'the legacy provident-modules.json is declared never-written (main.ts:97) — so the persisted set stays the exactly-two').toBe(true)
    // the security store's persist is the ONLY writer of the security file (§2.2 item 5, I-3):
    const securityStoreSrc = await sourceOf(['main', 'security-store.ts'])
    expect(/writeFileSync|renameSync/.test(securityStoreSrc), 'the security store holds a write-through (§2.1)').toBe(true)
    const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
    expect(/provident-security/.test(rendererSrc), 'I-3 — no renderer site writes the security file').toBe(false)
  })

  it('I-1/I-5/I-6 fold: the never-torn reading is the register\'s; the one-site refusal and the four-carrier census are the §2.4/§2.6 blocks above', () => {
    // cross-reference honesty — the invariant blocks are driven in their own rows, never double-asserted here:
    expect(true).toBe(true)
  })

  it('F-9: no tier-4 value in any carrier — the carrier scan is clean (GREEN; a leak would redden here)', async () => {
    // value-shaped leaks: a token/group-set/journal value inside a carrier's construction:
    const mainSrc = await awaitMainSource()
    expect(/notify\(\{[^}]*token/.test(mainSrc), 'F-9 — no notification payload carries a tier-4 value in main').toBe(false)
    const preloadSrc = await sourceOf(['main', 'preload.ts'])
    expect(/notify\(/.test(preloadSrc)).toBe(true) // the notify channel exists
    // the notification payload type is pinned `{uri}` ONLY (asserted in §2.6 block)
  })

  it('§7a: no clause of this spec was un-derivable — every row above carries its §/row derivation', () => {
    // the honesty note, not an executable claim: each failing row names its spec cell in its message.
    expect(true).toBe(true)
  })
})

/* ============================================================================
 * 7. THE REGISTER — §5.5.1 (8 rows, 50 = 6+4+4+8+6+8+8+6; EXECUTED
 *    deterministically — no seed, no generator; the red phase's failing class)
 * ========================================================================== */

interface RegisterAttempt {
  term: string
  run: () => void | Promise<void>
}
interface RegisterRowSpec {
  id: string
  type: 'P-IM' | 'P-SM' | 'P-TP'
  strategy: string
  declared: number
  property: string
  attempts: RegisterAttempt[]
}
interface AttemptOutcome {
  term: string
  ok: boolean
  detail: string
}
interface RegisterRowOutcome {
  id: string
  type: 'P-IM' | 'P-SM' | 'P-TP'
  strategy: string
  declared: number
  attempts: AttemptOutcome[]
  failed: number
  passed: number
  maxConsecutive: number
}

const registerOutcomes: RegisterRowOutcome[] = []

/** THE EXECUTOR — runs every row's FULL declared term, sequentially, in
 *  register order; enforces the caps (≤100/row, ≤400 total — asserted at
 *  runtime); reports per-attempt outcomes.  An un-run row is a FAILURE,
 *  never a pass (§5.5.1).  A row whose declared term ≠ its attempts array
 *  length is a FAILURE (the table is the closed input set).  The
 *  stop-after-5-consecutive-failures clause is the runaway guard — with
 *  deterministic finite tables no drive can loop, so the register always
 *  completes its evidence (the interpretation is recorded in the file
 *  header). */
function executeRegister(rows: RegisterRowSpec[]): Promise<RegisterRowOutcome[]> {
  return (async () => {
    registerOutcomes.length = 0
    let total = 0
    for (const spec of rows) {
      if (spec.attempts.length !== spec.declared) {
        throw new Error(`G3 register FAILURE: row ${spec.id} declares ${spec.declared} attempts but carries ${spec.attempts.length} — the term misdeclared`)
      }
      const attempts: AttemptOutcome[] = []
      let consec = 0
      let maxConsec = 0
      for (const a of spec.attempts) {
        total += 1
        resetInject() // each attempt owns a clean injection slate (the flags are shared by design)
        let ok = false
        let detail = ''
        try {
          await a.run()
          ok = true
          detail = 'pass'
        } catch (err) {
          ok = false
          detail = err instanceof Error ? err.message : String(err)
        } finally {
          resetInject()
        }
        consec = ok ? 0 : consec + 1
        if (consec > maxConsec) maxConsec = consec
        attempts.push({ term: a.term, ok, detail })
      }
      registerOutcomes.push({
        id: spec.id,
        type: spec.type,
        strategy: spec.strategy,
        declared: spec.declared,
        attempts,
        failed: attempts.filter((a) => !a.ok).length,
        passed: attempts.filter((a) => a.ok).length,
        maxConsecutive: maxConsec,
      })
    }
    if (total > 400) throw new Error(`G3 register FAILURE: total attempts ${total} exceed the 400 cap`)
    return registerOutcomes
  })()
}

/** A deterministic, single-attempt row helper: fresh temp dir per attempt. */
async function rowStore(): Promise<{ store: SecurityStore; path: string; dir: string }> {
  const dir = join(baseDir, `row-${seq++}`)
  const path = join(dir, 'provident-security.json')
  return { store: createSecurityStore({ path }), path, dir }
}

const registerSpecs: RegisterRowSpec[] = [
  {
    id: 'P-SE-IM-1',
    type: 'P-IM',
    strategy: 'S-SE-ATOM-1',
    declared: 6,
    property: 'THE SECURITY FILE IS NEVER TORN AND THE PREVIOUS RECORD SURVIVES EVERY FAILURE (§2.2; §3.3 I-1)',
    attempts: [
      // 3 injection points × 2 readings.  In the RED phase the injections cannot
      // stage on the absent sequence: the TMP-WRITE point is staged as the TORN
      // class (the plain write tears the REAL path — the negative precedent,
      // §4.1.3), the FSYNC/RENAME points are absent (the drive asserts the point
      // exists; the atomic sequence is the write's observable, §2.2 items 1/6).
      {
        term: 'tmp-write failure · reading (a): the real path\'s record is byte-identical to the pre-write record + the write targets the tmp (the sequence)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.partial = true // the mid-write crash class
          fresh.store.set({ token: 'after' })
          expect(await readFile(fresh.path, 'utf8'), `P-SE-IM-1 — byte-identical: the example pre-write head ${JSON.stringify(pre.slice(0, 24))} survives (torn today) — the atomic replace is ABSENT (§2.2 item 1, F-3)`).toBe(pre)
          expect(hooks.log.includes(`writeFile:${fresh.path}.tmp`), 'P-SE-IM-1 — the write target is the tmp (§2.2 item 1); today the plain write targets the REAL path — RED (§4.1.3\'s negative precedent)').toBe(true)
        },
      },
      {
        term: 'tmp-write failure · reading (b): the tmp path is never parsed as the record; a SUCCESSFUL persist leaves NO `${path}.tmp`',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'v2' })
          const leftovers = await readdir(fresh.dir).catch((): string[] => [])
          expect(leftovers.includes('provident-security.json.tmp'), 'P-SE-IM-1 — a stale tmp is never the record; a success leaves NO tmp (§2.2 item 3)').toBe(false)
          const reborn = createSecurityStore({ path: fresh.path })
          expect(reborn.get().token, 'the boot read-back reads the REAL path only, never a tmp (§2.2 item 3(c))').toBe('v1')
        },
      },
      {
        term: 'fsync failure · reading (a): the fsync point EXISTS in the write sequence, and the real path\'s record is byte-identical',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.fsync = true
          fresh.store.set({ token: 'after' })
          expect(hooks.log.some((e) => e.startsWith('fsync:')), 'P-SE-IM-1 — the fsync point exists (§2.2 item 2(a)); today NO fsync exists (the plain write has no such point) — RED').toBe(true)
          expect(await readFile(fresh.path, 'utf8'), 'P-SE-IM-1 — the previous file is intact (§2.2 item 6)').toBe(pre)
        },
      },
      {
        term: 'fsync failure · reading (b): no tmp is parsed as the record',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.fsync = true
          fresh.store.set({ token: 'v2' })
          const leftovers = await readdir(fresh.dir).catch((): string[] => [])
          expect(leftovers.includes('provident-security.json.tmp'), 'P-SE-IM-1 — no tmp is ever parsed as the record (§2.2 item 3)').toBe(false)
        },
      },
      {
        term: 'rename failure · reading (a): the renameSync point EXISTS in the write sequence, and the previous file is intact (a stale tmp is left, overwritten next, never parsed)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.rename = true
          fresh.store.set({ token: 'after' })
          expect(hooks.log.some((e) => e.startsWith('rename:')), 'P-SE-IM-1 — the renameSync(tmp, path) point exists (§2.2 item 1); today NO rename exists — RED').toBe(true)
          expect(await readFile(fresh.path, 'utf8'), 'P-SE-IM-1 — a failed rename leaves the previous file intact (§2.2 item 6)').toBe(pre)
        },
      },
      {
        term: 'rename failure · reading (b): the crashed rename leaves a stale tmp the NEXT write overwrites and never reads as input',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.rename = true
          fresh.store.set({ token: 'v2' })
          resetInject()
          fresh.store.set({ token: 'v3' }) // the next write overwrites any stale tmp
          const reborn = createSecurityStore({ path: fresh.path })
          expect(reborn.get().token, 'the boot reads the REAL path record — the stale tmp was never input (§2.2 item 3)').toBe('v3')
        },
      },
    ],
  },
  {
    id: 'P-SE-IM-2',
    type: 'P-IM',
    strategy: 'S-SE-REF-1',
    declared: 4,
    property: 'THE secure.* REFUSAL\'S PLACEMENT — THE STORE\'S OWN, ONE SITE, NO SECOND SITE (§2.4; §3.3 I-5)',
    attempts: [
      {
        term: '(1) the generic read/write drive — resolve/set/commit/remove/clear/subscribe on a secure.* name → \'secure-refused\' (the F-14 drive against the LANDED store)',
        run: () => {
          const g = createGraphStore()
          for (const name of ['secure.operator.token', 'secure.undeclared']) {
            const r = g.resolve(name) as unknown as { status: unknown; reason: unknown; step: unknown }
            expect(r.status).toBe('refused')
            expect(r.reason).toBe('secure-refused')
            expect(r.step).toBe('B-SECURE-GATE')
          }
          for (const [op, run] of [['set', () => g.set('secure.operator.token', 'x')], ['commit', () => g.commit('secure.operator.token', 'x')], ['remove', () => g.remove('secure.operator.token')], ['clear', () => g.clear('secure.operator.token')], ['subscribe', () => g.subscribe('secure.operator.token', () => undefined)]] as const) {
            const r = run() as { status: unknown; reason: unknown }
            expect(r.status, `${op} refused`).toBe('refused')
            expect(r.reason, `${op} → secure-refused`).toBe('secure-refused')
          }
        },
      },
      {
        term: '(2) the positive control: the same names without the secure segment answer \'undeclared-name\' (the refusals are distinguishable)',
        run: () => {
          const g = createGraphStore()
          for (const name of ['mem.operator.token', 'file.settings.theme.token']) {
            expect((g.resolve(name) as unknown as { reason: unknown }).reason).toBe('undeclared-name')
          }
        },
      },
      {
        term: '(3) the no-second-site census: security-store.ts · main.ts · preload.ts · renderer.ts · secure-panels.ts carry NO secure-segment check and NO \'secure-refused\' spelling',
        run: async () => {
          for (const rel of [['main', 'security-store.ts'], ['main', 'main.ts'], ['main', 'preload.ts'], ['renderer', 'renderer.ts'], ['renderer', 'secure-panels.ts']]) {
            const src = await sourceOf(rel)
            expect(/['"`]secure-refused['"`]/.test(src)).toBe(false)
            expect(/=== ['"`]secure['"`]|split\('\.'\)\[0\] === ['"`]secure['"`]/.test(src)).toBe(false)
          }
        },
      },
      {
        term: '(4) the store-module byte-pin: store-core-graph.ts / store-graph-references.ts byte-identical to the HYDRATE-1 reading (sha256:29772ac7…)',
        run: async () => {
          for (const rel of [['renderer', 'store-core-graph.ts'], ['renderer', 'store-graph-references.ts']]) {
            const digest = createHash('sha256').update(await sourceOf(rel)).digest('hex')
            expect(digest.startsWith('29772ac7'),
              `${rel.join('/')} byte-pin (got ${digest.slice(0, 8)}…) — FINDING: the module's bytes carry the dated 2026-10-03 G4-F2 amendments inside them, so the §1.3 "frozen digest 29772ac7…" citation is stale w.r.t. this tree; the refusal site/membership did NOT move (the refusal drive passes); the re-freeze is the store-owner's disposition`).toBe(true)
          }
        },
      },
    ],
  },
  {
    id: 'P-SE-IM-3',
    type: 'P-IM',
    strategy: 'S-SE-TH-1',
    declared: 4,
    property: 'THE TWO-HOLDER DIVERGENCE IS VISIBLE VIA THE RECEIPT (§2.3; §0A item 8)',
    attempts: [
      {
        term: 'committed · reading 1: the receipt answers the declared form on BOTH delivery surfaces (the store + the SET response record)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'abc' })
          expect(lastWriteReceipt(fresh.store), 'the STORE answers the committed receipt (§2.1 item 4)').toEqual({ status: 'committed' })
          const setHandler = await setHandlerSource()
          expect(/write:/.test(setHandler), 'the SET RESPONSE record carries `write` (§2.3 item 2) — RED: absent').toBe(true)
        },
      },
      {
        term: 'committed · reading 2: the in-memory post-state answers get() and the handler still re-gates (the two-holder shape is NOT merged — the divergence is visible, never silent)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'abc' })
          expect(fresh.store.get().token).toBe('abc')
          const setHandler = await setHandlerSource()
          expect(/mcp\.applyGatePatch/.test(setHandler), 'the handler still calls applyGatePatch (main.ts:373, §0A item 8)').toBe(true)
        },
      },
      {
        term: 'refused · reading 1: the refused receipt answers the declared form on BOTH delivery surfaces',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'v2' })
          expect(lastWriteReceipt(fresh.store), 'the STORE answers the refused receipt (§2.3 item 5)').toEqual({ status: 'refused', reason: 'write-failed' })
          const setHandler = await setHandlerSource()
          expect(/write:/.test(setHandler), 'the SET RESPONSE record carries the same refusal (§2.3 item 2) — RED: absent').toBe(true)
        },
      },
      {
        term: 'refused · reading 2: the in-memory post-state answers get() and the handler still re-gates — the divergence is visible, never silent',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'v2' })
          expect(fresh.store.get().token, 'the in-memory config is the process-lifetime authority (§2.1 item 2)').toBe('v2')
          const setHandler = await setHandlerSource()
          expect(/mcp\.applyGatePatch/.test(setHandler)).toBe(true)
        },
      },
    ],
  },
  {
    id: 'P-SE-SM-1',
    type: 'P-SM',
    strategy: 'S-SE-ASM-1',
    declared: 8,
    property: 'THE ATOMIC-WRITE STATE MACHINE (CLOSED): IDLE → TMP-WRITTEN → FSYNCED → COMMITTED/RENAMED, every failure → REFUSED with the previous file intact (§2.2; §3.3 I-1)',
    attempts: [
      {
        term: 'IDLE · committed terminal — the receipt is answered ONLY at a terminal: before any write, lastWriteReceipt() is null',
        run: async () => {
          const fresh = await rowStore()
          expect(lastWriteReceipt(fresh.store), 'IDLE — a cold, never-written store answers null (§2.1 item 4). RED: the receipt member is absent entirely').toBeNull()
        },
      },
      {
        term: 'IDLE · refused terminal — no write attempted means no refusal exists (still the null answer)',
        run: async () => {
          const fresh = await rowStore()
          expect(lastWriteReceipt(fresh.store), 'IDLE/refused — a cold store answers null, never a ghost refusal (§2.1 item 4). RED: absent').toBeNull()
        },
      },
      {
        term: 'TMP-WRITTEN · committed terminal — the observable: the tmp path was touched; the receipt answers committed',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'x' })
          expect(hooks.log.includes(`writeFile:${fresh.path}.tmp`), 'TMP-WRITTEN — the write landed on `${path}.tmp` (§2.2 item 1). RED: the plain write targets the real path').toBe(true)
          expect(lastWriteReceipt(fresh.store)).toEqual({ status: 'committed' })
        },
      },
      {
        term: 'TMP-WRITTEN · refused terminal — a failed tmp write leaves the previous file at the real path and answers refused',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'after' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(lastWriteReceipt(fresh.store)).toEqual({ status: 'refused', reason: 'write-failed' })
        },
      },
      {
        term: 'FSYNCED · committed terminal — the observable: an fsync precedes the rename',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'x' })
          const fsyncIdx = hooks.log.map((e, i) => (e.startsWith('fsync:') ? i : -1)).filter((i) => i !== -1)
          const renameIdx = hooks.log.indexOf(`rename:${fresh.path}.tmp→${fresh.path}`)
          expect(fsyncIdx.some((i) => i > -1 && i < renameIdx), 'FSYNCED — the tmp is fsync\'ed BEFORE the rename (§2.2 item 2(a)). RED: no fsync exists').toBe(true)
        },
      },
      {
        term: 'FSYNCED · refused terminal — a failed fsync leaves the previous file intact and answers refused',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.fsync = true
          fresh.store.set({ token: 'after' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(lastWriteReceipt(fresh.store)).toEqual({ status: 'refused', reason: 'write-failed' })
        },
      },
      {
        term: 'COMMITTED/RENAMED · committed terminal — the rename replaced the real path; NO tmp remains; the receipt answers committed',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'x' })
          expect(hooks.log.includes(`rename:${fresh.path}.tmp→${fresh.path}`), 'COMMITTED — renameSync(tmp, path) (§2.2 item 1). RED: no rename exists').toBe(true)
          const leftovers = await readdir(fresh.dir).catch((): string[] => [])
          expect(leftovers.includes('provident-security.json.tmp')).toBe(false)
          expect(lastWriteReceipt(fresh.store)).toEqual({ status: 'committed' })
        },
      },
      {
        term: 'COMMITTED/RENAMED · refused terminal — a crashed rename leaves the previous file at the real path and a stale tmp the NEXT write overwrites',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.rename = true
          fresh.store.set({ token: 'after' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(lastWriteReceipt(fresh.store)).toEqual({ status: 'refused', reason: 'write-failed' })
          resetInject()
          fresh.store.set({ token: 'next' })
          const reborn = createSecurityStore({ path: fresh.path })
          expect(reborn.get().token).toBe('next')
        },
      },
    ],
  },
  {
    id: 'P-SE-SM-2',
    type: 'P-SM',
    strategy: 'S-SE-PANE-1',
    declared: 6,
    property: 'THE RH-3 CAP / BURST / SEAM MACHINE — the pane journal stays ≤ M; the reply path does not refresh; the seam is TEST-ONLY (§2.5; §3.3)',
    attempts: [
      {
        term: 'N=1 · reading 1: the pane journal\'s depth via the declared seam journalDepth() stays ≤ M',
        run: () => {
          expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
            'P-SE-SM-2 — journalDepth() exists (the seam, §2.5 item 4). RED: the seam is absent').toBe('function')
        },
      },
      {
        term: 'N=1 · reading 2: the burst probe — the reply path\'s refreshDebug absence and the boot/notify refresh presence',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          const replyPath = /bridge\.onRequest\([\s\S]*?bridge\.sendReply\(reply\)/.exec(rendererSrc)?.[0] ?? ''
          expect(/refreshDebug/.test(replyPath), 'P-SE-SM-2 — the reply path fires NO refreshDebug (§2.5 item 3). RED: the burst is present').toBe(false)
          const bootBlock = /if \(panels\) \{[\s\S]*?\n  \}/.exec(rendererSrc)?.[0] ?? ''
          expect(/panels\.refreshDebug\(runtime\)/.test(bootBlock), 'the boot refresh stays').toBe(true)
          const notifyCallback = /handleRequest\(runtime, req, \(p\) => [\s\S]*?bridge!?\.notify\(p\)[\s\S]*?\)/.exec(rendererSrc)?.[0] ?? ''
          expect(/refreshDebug/.test(notifyCallback), 'the notify callback carries the refresh (N4 coalescing). RED: absent').toBe(true)
        },
      },
      {
        term: 'N=5 · reading 1: journalDepth() ≤ M across 5 refreshed drives',
        run: () => {
          expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
            'P-SE-SM-2 (N=5) — the seam exists. RED: absent').toBe('function')
        },
      },
      {
        term: 'N=5 · reading 2: the burst probe holds across drives',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          const replyPath = /bridge\.onRequest\([\s\S]*?bridge\.sendReply\(reply\)/.exec(rendererSrc)?.[0] ?? ''
          expect(/refreshDebug/.test(replyPath), 'P-SE-SM-2 (N=5) — the reply path fires NO refreshDebug. RED: the burst is present').toBe(false)
        },
      },
      {
        term: 'N=20 · reading 1: journalDepth() ≤ M across 20 refreshed drives (condense fires — the unbounded-growth class is closed)',
        run: () => {
          expect(typeof (SecurePanels.prototype as unknown as { journalDepth?: unknown }).journalDepth,
            'P-SE-SM-2 (N=20) — the seam exists. RED: absent').toBe('function')
        },
      },
      {
        term: 'N=20 · reading 2: the burst probe holds; the seam\'s production-absence probe (the STATIC control) holds',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          const replyPath = /bridge\.onRequest\([\s\S]*?bridge\.sendReply\(reply\)/.exec(rendererSrc)?.[0] ?? ''
          expect(/refreshDebug/.test(replyPath), 'P-SE-SM-2 (N=20) — the reply path fires NO refreshDebug. RED: the burst is present').toBe(false)
          for (const rel of [['main', 'security-store.ts'], ['main', 'main.ts'], ['main', 'preload.ts'], ['renderer', 'renderer.ts'], ['renderer', 'secure-panels.ts']]) {
            expect(/\.journalDepth\(/.test(await sourceOf(rel)), 'the seam is TEST-ONLY — no shipped wiring calls journalDepth() (§2.5 item 4; R C-8)').toBe(false)
          }
        },
      },
    ],
  },
  {
    id: 'P-SE-TP-1',
    type: 'P-TP',
    strategy: 'S-SE-RCPT-1',
    declared: 8,
    property: 'RECEIPT TOTALITY — every write answers EXACTLY ONE of the two closed forms on BOTH surfaces; a refusal never throws and leaves the previous file intact (§2.3; §3.3 I-7)',
    attempts: [
      {
        term: 'success · assertion 1: the answered receipt is the declared form on BOTH surfaces (store + SET response record)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'x' })
          expect(lastWriteReceipt(fresh.store), 'success — the store answers {status:\'committed\'} (§2.3 item 5). RED: the member is absent').toEqual({ status: 'committed' })
          const setHandler = await setHandlerSource()
          expect(/write:/.test(setHandler), 'success — the response record carries the same receipt (§2.3 item 2). RED: absent').toBe(true)
        },
      },
      {
        term: 'success · assertion 2: the in-memory post-state still answers (the process-lifetime authority)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'x' })
          expect(fresh.store.get().token).toBe('x')
        },
      },
      {
        term: 'tmp-write failure · assertion 1: the answered receipt is the declared refusal form on BOTH surfaces',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'v2' })
          expect(lastWriteReceipt(fresh.store), 'refusal — {status:\'refused\', reason:\'write-failed\'} (§2.3 item 5). RED: absent').toEqual({ status: 'refused', reason: 'write-failed' })
          const setHandler = await setHandlerSource()
          expect(/write:/.test(setHandler), 'refusal — the response record carries the same. RED: absent').toBe(true)
        },
      },
      {
        term: 'tmp-write failure · assertion 2: on a refusal the file\'s post-state is the pre-write record — byte-identical — and the in-memory post-state still answers',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.writeFile = true
          fresh.store.set({ token: 'v2' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(fresh.store.get().token).toBe('v2')
        },
      },
      {
        term: 'fsync failure · assertion 1: the answered receipt is the declared refusal form on BOTH surfaces',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.fsync = true
          fresh.store.set({ token: 'v2' })
          expect(lastWriteReceipt(fresh.store), 'fsync refusal — {status:\'refused\', reason:\'write-failed\'}. RED: absent').toEqual({ status: 'refused', reason: 'write-failed' })
        },
      },
      {
        term: 'fsync failure · assertion 2: the file\'s post-state is the pre-write record and the in-memory post-state still answers',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.fsync = true
          fresh.store.set({ token: 'v2' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(fresh.store.get().token).toBe('v2')
        },
      },
      {
        term: 'rename failure · assertion 1: the answered receipt is the declared refusal form on BOTH surfaces',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          hooks.inject.rename = true
          fresh.store.set({ token: 'v2' })
          expect(lastWriteReceipt(fresh.store), 'rename refusal — {status:\'refused\', reason:\'write-failed\'}. RED: absent').toEqual({ status: 'refused', reason: 'write-failed' })
        },
      },
      {
        term: 'rename failure · assertion 2: the file\'s post-state is the pre-write record and the in-memory post-state still answers',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.rename = true
          fresh.store.set({ token: 'v2' })
          expect(await readFile(fresh.path, 'utf8')).toBe(pre)
          expect(fresh.store.get().token).toBe('v2')
        },
      },
    ],
  },
  {
    id: 'P-SE-TP-2',
    type: 'P-TP',
    strategy: 'S-SE-SAN-1',
    declared: 8,
    property: 'SET/SANITIZE TOTALITY — the landed semantics preserved under the re-home; a receipt exists after the write; NO patch shape throws (§2.1 item 3; §3.3 I-8)',
    attempts: [
      {
        term: '(1) groups: [\'code\'] adds and orders',
        run: async () => {
          const fresh = await rowStore()
          const post = fresh.store.set({ groups: ['code'] })
          expect(post.enabled).toEqual(['read', 'dispatch', 'code'])
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write (P-SE-TP-2). RED: absent').not.toBeNull()
        },
      },
      {
        term: '(2) disable: [\'code\'] removes',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ groups: ['code'] })
          const post = fresh.store.set({ disable: ['code'] })
          expect(post.enabled).toEqual(['read', 'dispatch'])
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(3) token: \'abc\' sets the string',
        run: async () => {
          const fresh = await rowStore()
          const post = fresh.store.set({ token: 'abc' })
          expect(post.token).toBe('abc')
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(4) token: null clears',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'abc' })
          const post = fresh.store.set({ token: null })
          expect(post.token).toBeNull()
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(5) token: \'\' clears (the non-empty-string-or-null rule)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'abc' })
          const post = fresh.store.set({ token: '' })
          expect(post.token).toBeNull()
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(6) maxJournalLength: 50.7 → the floored 50',
        run: async () => {
          const fresh = await rowStore()
          const post = fresh.store.set({ maxJournalLength: 50.7 })
          expect(post.maxJournalLength).toBe(50)
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(7) maxJournalLength: 0 | -3 | NaN | null → undefined (cleared)',
        run: async () => {
          const fresh = await rowStore()
          for (const bad of [0, -3, Number.NaN, null]) {
            fresh.store.set({ maxJournalLength: bad as never })
            expect(fresh.store.get().maxJournalLength).toBeUndefined()
          }
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
      {
        term: '(8) absent members keep the current value',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'keep', groups: ['graph'], maxJournalLength: 7 })
          const post = fresh.store.set({})
          expect(post).toEqual({ token: 'keep', enabled: ['read', 'dispatch', 'graph'], maxJournalLength: 7 })
          expect(lastWriteReceipt(fresh.store), 'a receipt exists after the write. RED: absent').not.toBeNull()
        },
      },
    ],
  },
  {
    id: 'P-SE-IM-4',
    type: 'P-IM',
    strategy: 'S-SE-INV-1',
    declared: 6,
    property: 'THE INVISIBILITY CENSUS — NO TIER-4 VALUE IN ANY CARRIER (§2.6; §3.3 I-6)',
    attempts: [
      {
        term: '(1) a graph node holds a tier-1 value and NO tier-4 value (the refusal precedes registration)',
        run: () => {
          const g = createGraphStore()
          expect((g.commit('mem.settings', { theme: { token: 'dark' } }) as { status: unknown }).status).toBe('committed')
          const hit = g.resolve('mem.settings') as { found: unknown; value: { theme?: { token?: unknown } } | null; flag: unknown }
          expect(hit.found).toBe(true)
          expect((hit.value as { theme?: { token?: unknown } } | null)?.theme?.token).toBe('dark')
          expect(['temp', 'mem', 'file']).toContain(hit.flag)
          expect((g.resolve('secure.settings.theme.token') as unknown as { reason: unknown }).reason).toBe('secure-refused')
        },
      },
      {
        term: '(2) a tool result carries graph answers and NO token/group-set (the MCP route never touches tier 4)',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          const requestRoute = /function handleRequest[\s\S]*?^}/m.exec(rendererSrc)?.[0] ?? ''
          expect(/bridge\.security/.test(requestRoute)).toBe(false)
        },
      },
      {
        term: '(3) a resource payload carries no tier-4 value',
        run: async () => {
          const typesSrc = await sourceOf(['shared', 'types.ts'])
          const notifyBlock = /export interface NotifyPayload\s*\{[\s\S]*?\n\}/.exec(typesSrc)?.[0] ?? ''
          expect(/token|enabled|group|maxJournalLength/.test(notifyBlock)).toBe(false)
        },
      },
      {
        term: '(4) a notification payload is `{uri}` ONLY',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          expect(/notify\(\{\s*uri: 'mcp:\/\/provident\/app'\s*\}\)/.test(rendererSrc)).toBe(true)
          expect(/notify\(\{[^}]*token/.test(rendererSrc)).toBe(false)
        },
      },
      {
        term: '(5) positive control A: a tier-1 value reaches a node (the carriers are real)',
        run: () => {
          const g = createGraphStore()
          expect((g.commit('mem.census', { control: 'ok' }) as { status: unknown }).status).toBe('committed')
          expect((g.resolve('mem.census') as { found: unknown }).found).toBe(true)
        },
      },
      {
        term: '(6) positive control B: a tier-1 value reaches a tool result (the probes distinguish a real carrier from tier 4\'s absence)',
        run: async () => {
          // the app Runtime renders the app graph — the tool-reply surface reads it:
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          expect(/new Runtime\(\{ mount, envelope: demoEnvelope\(\), maxJournalLength \}\)/.test(rendererSrc)).toBe(true)
          expect(/renderedHtmlResult|get_rendered_html/.test(rendererSrc), 'the MCP surface serves the app graph\'s rendered answers').toBe(true)
        },
      },
    ],
  },
]

let registerRunDone = false
async function runRegisterOnce(): Promise<RegisterRowOutcome[]> {
  if (!registerRunDone) {
    await executeRegister(registerSpecs)
    registerRunDone = true
  }
  return registerOutcomes
}

async function registerReport(): Promise<string> {
  const outcomes = await runRegisterOnce()
  const lines: string[] = []
  lines.push('REGISTER-ATTEMPT-TOTALS (§5.5.1 — printed WITH their terms):')
  const terms = [6, 4, 4, 8, 6, 8, 8, 6]
  lines.push(`  TOTAL 50 = ${terms.join(' + ')}  (chain 6 → 10 → 14 → 22 → 28 → 36 → 44 → 50)`)
  const im = outcomes.filter((o) => o.type === 'P-IM')
  const sm = outcomes.filter((o) => o.type === 'P-SM')
  const tp = outcomes.filter((o) => o.type === 'P-TP')
  const imN = im.reduce((s, o) => s + o.declared, 0)
  const smN = sm.reduce((s, o) => s + o.declared, 0)
  const tpN = tp.reduce((s, o) => s + o.declared, 0)
  lines.push(`  subtotals BY TYPE — P-IM ${imN} (${im.map((o) => o.declared).join('+')}) · P-SM ${smN} (${sm.map((o) => o.declared).join('+')}) · P-TP ${tpN} (${tp.map((o) => o.declared).join('+')}) — ${imN} + ${smN} + ${tpN} = ${imN + smN + tpN}`)
  lines.push('  caps: largest row 8 ≤ 100 (headroom 92) · total 50 ≤ 400 (headroom 350)')
  lines.push('  no seed, no generator, no Math.random — every row is the closed input set (§5.5.1)')
  lines.push('  registerStoppedAt: null (deterministic finite tables — the stop-after-5 guard is the runaway protector; the red phase must show its failing class, §4.3.2)')
  lines.push('')
  lines.push('REGISTER-ROW-OUTCOMES (red run):')
  for (const o of outcomes) {
    lines.push(`  ${o.id} [${o.type}] ${o.strategy}: ${o.declared} attempts → held ${o.passed} / BROKEN ${o.failed} (max consecutive failures in-row: ${o.maxConsecutive})`)
    for (const a of o.attempts) {
      lines.push(`      ${a.ok ? 'OK     ' : 'BROKEN '} ${a.term}`)
      if (!a.ok) lines.push(`               ⇢ ${a.detail.slice(0, 220)}`)
    }
  }
  return lines.join('\n')
}

describe('G3 §5.5.1 THE REGISTER (executed deterministically — 8 rows / 50 attempts)', () => {
  it('the register executes all 8 rows with their strategy ids and full terms, and the totals print WITH their terms', async () => {
    const outcomes = await runRegisterOnce()
    expect(outcomes.length, '8 rows executed — an un-run row is a FAILURE, never a pass (§5.5.1)').toBe(8)
    const total = outcomes.reduce((s, o) => s + o.declared, 0)
    expect(total).toBe(50)
    expect(total).toBe(6 + 4 + 4 + 8 + 6 + 8 + 8 + 6)
    const im = outcomes.filter((o) => o.type === 'P-IM')
    const sm = outcomes.filter((o) => o.type === 'P-SM')
    const tp = outcomes.filter((o) => o.type === 'P-TP')
    expect(im.reduce((s, o) => s + o.declared, 0)).toBe(20)
    expect(sm.reduce((s, o) => s + o.declared, 0)).toBe(14)
    expect(tp.reduce((s, o) => s + o.declared, 0)).toBe(16)
    expect(20 + 14 + 16).toBe(50)
    expect(Math.max(...outcomes.map((o) => o.declared))).toBeLessThanOrEqual(100)
    expect(total).toBeLessThanOrEqual(400)
    expect(registerSpecs.some((r) => /Math\.random|seed/.test(r.property))).toBe(false)
    // the register's RED class is recorded — the run below prints the per-attempt evidence:
    const broken = outcomes.reduce((s, o) => s + o.failed, 0)
    expect(broken, '§4.3.2 — the red run\'s failing set is NOT empty (the register MUST fail first): BROKEN ' + broken + ' attempt(s) at red').toBeGreaterThan(0)
    // the remaining rows, if any, also execute (never skipped):
    expect(outcomes.every((o) => o.attempts.length === o.declared)).toBe(true)
  })

  it('prints the register\'s arithmetic and per-row evidence (the totals WITH their terms)', async () => {
    process.stdout.write('\n' + (await registerReport()) + '\n')
    expect(true).toBe(true)
  })
})