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
 * THE DYNAMIC PANE DRIVE (§5.5.2's "constructed pane graph") — AMENDED
 * 2026-10-03 by the gate-4 PBT audit (finding 2, RED-SET-FIX): the as-filed
 * P-SE-SM-2 attempts asserted the STATIC observables of the pane shape (the
 * seam's absence, the constructor/supervisor options, the burst, the notify
 * re-home) and reading-1 of every strength asserted EXISTENCE ONLY
 * (`typeof journalDepth === 'function'`) — no pane was constructed, no
 * refresh cycle ran, the seam was never read, the cap was never crossed
 * (P-SE-SM-2's declared-under-assertion class).  The gate-4 amendment
 * RE-AUTHORS reading 1 (the drive bodies, terms stay 6): the REAL constructed
 * pane — `new SecurePanels(mountEl(), { maxJournalLength: M })` with a SMALL
 * M — is driven with N refreshDebug cycles (N > M — the cap IS crossed; one
 * cycle journals 11 state-slice entries, one per mutated pane node, the
 * falsifier's own load), the seam is READ and asserted `≤ M`, with an
 * UNCAPPED positive control proving the drive journals.  MEASURED RED against
 * the current tree (2026-10-03, this run): the pane supervisor's deferred
 * condense ABORTS on the pane graph (`condense-aborted: serialization-error:
 * non-JSON value; journal untouched` — supervisor.js D5's failure
 * containment), so `journalDepth()` grows UNBOUNDED (N=25 → 275 ≥ M; the
 * uncapped control grows identically) — the pane journal is EFFECTIVELY
 * UNCAPPED today and F-8's unbounded-growth class is OPEN (§2.5 items 1/2/4).
 * The dynamic constructed-pane drive is therefore a RED row of THIS red set,
 * no longer a greens'/shim-hosted form only.
 *
 * ⟶⟶ THE GATE-4 RE-AUDIT CLOSE-OUT (2026-10-03, TestWriter — NEW-1 + NEW-2):
 *  NEW-1 (MEDIUM, RED-SET-FIX): the as-filed burst-absence probe was STRUCTURALLY
 *  VACUOUS — the re-home refactor moved `bridge.sendReply(reply)` INSIDE the
 *  `replyRoute` const (renderer.ts:657-665), so the anchor
 *  `bridge\.onRequest[\s\S]*?bridge\.sendReply\(reply\)` matched NOTHING and
 *  `expect(/refreshDebug/.test('')).toBe(false)` passed under ANY code state (a
 *  re-added reply-path `panels?.refreshDebug` — before/after sendReply, inside/beside
 *  replyRoute — still yields no onRequest-then-sendReply span).  RE-AIMED at ALL FIVE
 *  probe sites (the M-5/F-8 row + the three P-SE-SM-2 reading-2 attempts) to the
 *  CLOSED-OCCURRENCE form: EXACTLY TWO code-level refreshDebug invocation sites in
 *  renderer.ts — the boot line (:645) + the app-graph-changed notify-callback line
 *  (:660) — a THIRD site anywhere (a re-added reply-path burst) FAILS.  The span-form
 *  alternative WAS VERIFIED AND REJECTED on this tree: the notify-callback site at
 *  :660 lies INSIDE a `const replyRoute … bridge.sendReply(reply)` span (657-662),
 *  so that span form would redden the LEGIT re-home.  MUTATION-PROVEN non-vacuous:
 *  a scratch copy of renderer.ts with a re-added reply-path refreshDebug FAILS the
 *  count (the probe ran under vitest against the mutated file and is deleted after).
 *  NEW-2 (LOW, TEST-SIDE RE-GRAIN): the fsync mock threw on the FIRST fsyncSync (the
 *  tmp, pre-rename) only, so the POST-RENAME DIR-FSYNC failure class was UNREACHABLE —
 *  persist runs the dir-fsync AFTER renameSync (security-store.ts:92-95), so a dir-fsync
 *  failure answers the refused receipt with the NEW record live at the real path and the
 *  pre-write bytes GONE (never torn/file-loss, but "the previous file intact at EVERY
 *  failure point" over-claims).  RE-GRAINED: the mock carries a per-call fsync counter
 *  and an `fsyncAt` arm for call N (the dir-fsync = call 2 of the injected persist);
 *  P-SE-SM-1's FSYNCED·refused terminal is RE-AIMED to the commit-side refusal — the
 *  refused receipt + the NEW record live — and the pre-rename failure rows' wording is
 *  TIGHTENED to name their class (never asserting the pre-write bytes survive a
 *  POST-rename failure).  Register totals UNCHANGED: 50 = 6+4+4+8+6+8+8+6.
 *
 * LAYER HONESTY (§1.4): no timing figure is claimed anywhere in this file.
 * ============================================================================
 */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { createHash } from 'node:crypto'
import { createSecurityStore, type SecurityStore, type SecurityWriteReceipt } from '../src/main/security-store.js'
import { createGraphStore } from '../src/renderer/store-core-graph.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
// G3 gate-4 finding 2 (RED-SET-FIX): the re-authored P-SE-SM-2 reading-1 drives the REAL
// CONSTRUCTED pane — `new SecurePanels(mountEl(), { maxJournalLength: M })` needs the shimmed
// DOM the secure-panels.test.ts precedent installs (installShim() + mountEl()):
import { installShim, mountEl } from '../src/shared/dom-shim.js'

/* ============================ THE node:fs MOCK (the failure-injection + the
 * write-sequence observation point).  The store DESTRUCTURES its fs imports
 * at module load (security-store.ts:7), so a plain `vi.spyOn` can never
 * intercept the write — the injection must live in the mocked module itself.
 * Test-local IO uses `node:fs/promises` (a different specifier — unmocked),
 * so the store's bytes and the test's own IO never share a wrapper.          */

const hooks = vi.hoisted(() => ({
  log: [] as string[],
  /** NEW-2 re-grain (2026-10-03, gate-4 RE-audit, TestWriter): the per-call fsync
   *  counter, zeroed by resetInject().  The as-filed mock threw on the FIRST
   *  fsyncSync only — the tmp, pre-rename — so the POST-RENAME DIR-FSYNC failure
   *  class (the parent-directory fsync AFTER renameSync, §2.2 item 2(b)) was
   *  UNREACHABLE and no drive could assert its honest state.  With the counter,
   *  `inject.fsyncAt` targets call N of the NEXT persist (the dir-fsync = call 2). */
  fsyncCalls: 0,
  inject: {
    writeFile: false,
    fsync: false,
    rename: false,
    partial: false,
    fsyncAt: null,
  } as { writeFile: boolean; fsync: boolean; rename: boolean; partial: boolean; fsyncAt: number | null },
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
      // NEW-2 re-grain: the per-call counter makes the POST-RENAME DIR-FSYNC injectable
      // (call 2 of a persist = the parent-directory fsync AFTER renameSync). `inject.fsync`
      // keeps the as-filed FIRST-fsync (the tmp, pre-rename) class; `inject.fsyncAt` targets
      // an exact later call — the dir-fsync — which runs AFTER the rename has already
      // committed the NEW record at the real path (security-store.ts:92-95).
      hooks.fsyncCalls += 1
      if (hooks.inject.fsync) throw new Error('injected: fsync failure')
      if (hooks.inject.fsyncAt !== null && hooks.fsyncCalls === hooks.inject.fsyncAt) {
        throw new Error('injected: dir-fsync failure (the POST-RENAME directory fsync)')
      }
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
  hooks.inject = { writeFile: false, fsync: false, rename: false, partial: false, fsyncAt: null }
  hooks.fsyncCalls = 0
}
/** NEW-2 re-grain (2026-10-03, gate-4 RE-audit, TestWriter): arm the POST-RENAME
 *  DIR-FSYNC failure class — the 2nd fsyncSync of the NEXT persist (the parent
 *  DIRECTORY fsync AFTER renameSync, §2.2 item 2(b); security-store.ts:93-95).  The
 *  as-filed mock could only throw at the FIRST fsync (the tmp, pre-rename) — the
 *  dir-fsync class was UNREACHABLE, so no drive asserted its HONEST state: the refused
 *  receipt with the NEW record LIVE at the real path (the rename already committed it;
 *  the pre-write bytes are gone — no torn-file, no data-loss, but the previous-file-
 *  intact claim is scoped to the PRE-RENAME failure points, never a POST-rename one). */
function armDirFsyncFailure(): void {
  resetInject()
  hooks.inject.fsyncAt = 2
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
/** The refreshDebug drive's fake runtime — the app Runtime's rendered-html surface the pane
 *  reads (`renderedHtmlResult(): { census, ssrHtml }`, secure-panels.ts:364-367).  G3 gate-4
 *  finding 2's P-SE-SM-2 drive input (§2.5 item 4's falsifier: "drive `SecurePanels.refreshDebug`
 *  N times"); the census/ssrHtml CONTENT is irrelevant to the depth observable — a fresh object
 *  per call, never shared state across drives. */
function fakePaneRuntime(): { renderedHtmlResult(): { census: Record<string, unknown>; ssrHtml: string } } {
  return {
    renderedHtmlResult: () => ({
      census: { inTree: 1, registered: 1, unplaced: 0, destroyed: 0, prototypes: 0 },
      ssrHtml: '<div class="app" id="root">security panes</div>',
    }),
  }
}
/** G3 gate-4 finding 2's P-SE-SM-2 drive (the falsifier's form, §2.5 items 1/2/4): construct
 *  the REAL pane with a SMALL cap M, drive N refreshDebug cycles — one cycle journals one
 *  state-slice per mutated pane node (MEASURED 11 entries/cycle at the current tree), so even
 *  N=1 CROSSES the cap — let the engine's DEFERRED condense (a timer-tick microtask-free
 *  macro task, supervisor.js D5) settle, then READ the seam journalDepth().  Returns the
 *  settled capped depth + the UNCAPPED control's depth (the same N on a pane with NO
 *  maxJournalLength — the engine never condenses, so the control grows past M, proving the
 *  capped ≤ M is the CAP's observable, never a vacuous zero). */
async function drivePaneCap(M: number, N: number): Promise<{ capped: number; uncapped: number }> {
  const mount = mountEl() as never
  const panels = new SecurePanels(mount as never, { maxJournalLength: M })
  for (let i = 0; i < N; i++) panels.refreshDebug(fakePaneRuntime() as never)
  await new Promise((r) => setTimeout(r, 0)) // the deferred condense's timer tick
  const capped = panels.journalDepth()
  const rawMount = mountEl() as never
  const uncapped = new SecurePanels(rawMount as never)
  for (let i = 0; i < N; i++) uncapped.refreshDebug(fakePaneRuntime() as never)
  await new Promise((r) => setTimeout(r, 0))
  const uncappedDepth = uncapped.journalDepth()
  return { capped, uncapped: uncappedDepth }
}
/** NEW-1 re-aim (2026-10-03, gate-4 RE-audit, TestWriter) — THE BURST-ABSENCE PROBE'S
 *  CLOSED-OCCURRENCE FORM, used at ALL FIVE probe sites (the M-5/F-8 row + the three
 *  P-SE-SM-2 reading-2 attempts).  WHY: the as-filed anchor
 *  `bridge\.onRequest[\s\S]*?bridge\.sendReply\(reply\)` was STRUCTURALLY VACUOUS — the
 *  re-home refactor moved `sendReply` INSIDE the `replyRoute` const (renderer.ts:657-665,
 *  text order sendReply 662 < onRequest 665), so the span came up EMPTY and the
 *  `expect(/refreshDebug/.test('')).toBe(false)` passed under ANY code state.  The count
 *  pins the CODE-LEVEL invocation spelling `panels.{?}.refreshDebug(runtime)` — EXACTLY
 *  TWO sites allowed: the boot line (:645) + the app-graph-changed notify-callback line
 *  (:660) — a THIRD site anywhere (a re-added reply-path burst) FAILS.  Raw `/refreshDebug/`
 *  is NOT counted: it also matches the two COMMENT mentions (renderer.ts:649/653).  The
 *  span-form alternative (`const replyRoute … bridge.sendReply(reply)`) was verified and
 *  REJECTED: the notify-callback site at :660 lies INSIDE that span (657-662), so the
 *  span form would redden the LEGIT re-home. */
function refreshDebugCodeSites(rendererSrc: string): string[] {
  // the invocation spelling `panels.refreshDebug(...)` / `panels?.refreshDebug(...)` — the
  // optional-chaining `?` sits BETWEEN the name and the dot in the code spelling.  The
  // renderer's own COMMENTS also spell the invocation text (renderer.ts:649 quotes the
  // REMOVED burst verbatim) — a site is counted only when its line carries no `//` before
  // it (code-level = a real invocation; comment-level = a description of the re-home):
  const out: string[] = []
  for (const m of rendererSrc.matchAll(/panels\??\.refreshDebug\(runtime\)/g)) {
    const lineHead = m.index !== undefined ? rendererSrc.slice(rendererSrc.lastIndexOf('\n', m.index - 1) + 1, m.index) : ''
    if (!lineHead.includes('//')) out.push(m[0])
  }
  return out
}
/** The closed-occurrence assertion block — the row's intent, all three legs: (i) the
 *  EXACTLY-TWO count (a re-added reply-path refreshDebug is a THIRD code site anywhere
 *  in renderer.ts and FAILS), (ii) the boot refresh's presence, (iii) the notify
 *  callback's presence. */
function assertBurstAbsentForm2(rendererSrc: string): void {
  const sites = refreshDebugCodeSites(rendererSrc)
  expect(sites.length,
    '§2.5 item 3 — the debug refresh re-homes onto EXACTLY TWO invocation sites: the BOOT refresh (renderer.ts:645) + the app-graph-changed notify callback (renderer.ts:660). NEW-1 re-aim: a re-added reply-path refreshDebug is a THIRD code-level site ANYWHERE in renderer.ts and FAILS (the as-filed onRequest…sendReply span matched NOTHING — the probe passed vacuously under any code state). Measured sites: ' + sites.length + ' (' + sites.join(' | ') + ')').toBe(2)
  const bootBlock = /if \(panels\) \{[\s\S]*?\n  \}/.exec(rendererSrc)?.[0] ?? ''
  expect(/panels\.refreshDebug\(runtime\)/.test(bootBlock),
    '§2.5 item 3(i) — the BOOT refresh (panels.refresh() + panels.refreshDebug(runtime), renderer.ts:639-643) stays').toBe(true)
  const notifyCallback = /handleRequest\(runtime, req, \(p\) => [\s\S]*?bridge!?\.notify\(p\)[\s\S]*?\)/.exec(rendererSrc)?.[0] ?? ''
  expect(/refreshDebug/.test(notifyCallback),
    '§2.5 item 3(ii) — the notify callback becomes `(p) => { bridge.notify(p); panels?.refreshDebug(runtime) }` — ONE refresh per MUTATING reply, coalesced with the ONE notify (N4).').toBe(true)
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
  // G3 gate-4 finding 2: the re-authored P-SE-SM-2 reading-1 constructs the REAL SecurePanels
  // (mountEl() + DomAdapter) — the shimmed DOM must be installed first (the secure-panels.test.ts
  // precedent, installShim() + mountEl()):
  installShim()
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
      expect(await readFile(path, 'utf8'), `F-2 — ${point} failure (the PRE-RENAME injection point — the NO-${point} arm: the real path never received the new bytes): the previous file is intact at the real path (§2.2 item 6; NEW-2 scopes the intact claim to the PRE-RENAME failure points — the POST-RENAME dir-fsync class answers the refused receipt with the NEW record live, driven at P-SE-SM-1's COMMITTED/RENAMED refused terminal)`).toBe(pre)
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
    // the boot read-back reads the REAL path only, never a `${path}.tmp` (§2.2 item 3(c)) — and never throws (I-4).
    // THE END STATE IS THE SURVIVAL READING (2026-10-03, G3 red-set fix): atomic or not, the real path
    // holds the PRE-WRITE record after any failed write, so the boot read MUST answer `'before'` — never
    // the first-run default, never a torn fragment (§2.2 items 1/6, P-SE-IM-1(1); §3.3 I-1):
    const reborn = createSecurityStore({ path })
    expect(reborn.get().token, "F-3 — the boot read-back answers the PRE-WRITE record (`'before'`) — the previous record survives the failed write byte-identically; the first-run default is never the answer once a record exists (§2.2 items 1/6, P-SE-IM-1(1))").toBe('before')
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
    store.set({ token: 'x' }) // the write whose receipt I-7 totals — a COLD, never-written store answers null (§2.1 item 4; P-SE-SM-1's IDLE terms)
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
    store.set({ token: 'x' }) // the write whose outcome the receipt surfaces — a COLD store answers null (§2.1 item 4)
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

  it('P-SE-IM-2(4): the E-2-form byte-pin — the STORE MODULE FILE bytes (sha256 0664c52f… / 5c0c1a97…, the G2 re-cycle\'s re-frozen tree)', async () => {
    // 2026-10-03 (G3 red-set fix, TestWriter): the pin's figure is CORRECTED.  The stale
    // `29772ac7…` was the ARTIFACT's span digest (the HYDRATE-1 re-freeze over fields 1–7),
    // NOT the FILE's sha256 — the E-2 class pins the raw module bytes' hash, and the
    // store-owner's E-2 convention is the FILE's bytes.  G2's re-cycle measured + re-pinned
    // them: 0664c52f… (store-core-graph.ts) / 5c0c1a97… (store-graph-references.ts) — FULL
    // digests re-verified with `sha256sum` in THIS pass (pinned below).  The store module is
    // UN-TOUCHED by G3 (tests-first diff) and its file hash is stable.
    const filePins: Record<string, string> = {
      'renderer/store-core-graph.ts': '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450',
      'renderer/store-graph-references.ts': '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
    }
    for (const rel of [['renderer', 'store-core-graph.ts'], ['renderer', 'store-graph-references.ts']]) {
      const digest = createHash('sha256').update(await sourceOf(rel)).digest('hex')
      const pinned = filePins[rel.join('/')]
      expect(digest,
        `P-SE-IM-2(4) — ${rel.join('/')} byte-identical to the G2 re-cycle's measured FILE sha256 (pinned ${pinned.slice(0, 8)}…; got ${digest.slice(0, 8)}…)`).toBe(pinned)
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
    // NEW-1 re-aim (2026-10-03, gate-4 RE-audit): the as-filed anchor
    // `bridge\.onRequest[^]*?bridge\.sendReply\(reply\)` matched NOTHING after the
    // re-home (sendReply :662 sits INSIDE replyRoute, defined :657, registered :665), so
    // `expect(/refreshDebug/.test(''))` passed under ANY code state — the probe was
    // structurally vacuous.  THE CLOSED-OCCURRENCE FORM (assertBurstAbsentForm2) counts
    // the code-level refreshDebug invocation sites: exactly TWO (boot :645 + notify
    // callback :660); a third site anywhere (a re-added reply-path burst) FAILS — the
    // mutation probe (a scratch copy of renderer.ts with the burst re-added) reddens this
    // row, so the absence is now checkable, not assumed:
    assertBurstAbsentForm2(rendererSrc)
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

  it('F-11 (gate-4 finding 1, HOST-FIX): a stale `${path}.tmp` that names a DIRECTORY answers the refused receipt — set() must NEVER throw (§2.3 item 5, §3.3 I-4/I-7). TODAY the catch-block\'s own cleanup throw escapes persist()', async () => {
    // G3 gate-4 finding 1 (MEDIUM, HOST-FIX) — verified against the tree: security-store.ts's
    // catch-block cleanup `rmSync(tmp, {force:true})` (security-store.ts:98) suppresses ONLY
    // ENOENT; a stale `${path}.tmp` that names a DIRECTORY (or a protected path) makes the
    // earlier `writeFileSync` throw EISDIR, then the cleanup's OWN EISDIR ESCAPES persist() ->
    // set() throws -> lastReceipt never updates -> NO receipt answered — totality (§2.3 item 5)
    // + never-throw (§3.3 I-4/I-7) violated.  The audit's fix shape: contain/ignore the cleanup
    // error, or `rmSync(tmp, {recursive:true, force:true})`.  This row RED-FIRSTS that class.
    // THE POSITIVE CONTROL — a stale FILE tmp + a forced write failure: the cleanup runs on a
    // FILE, rmSync(tmp, {force:true}) succeeds (force masks only ENOENT — a file is removable
    // without recursive), and the refused receipt is answered WITHOUT a throw (this arm PASSES
    // today — the audit's point is the DIRECTORY class):
    const { store: controlStore, path: controlPath } = await makeStore()
    controlStore.set({ token: 'before' })
    const preControl = await readFile(controlPath, 'utf8')
    await writeFile(`${controlPath}.tmp`, '{\n  "stale": true\n}', 'utf8') // a stale FILE tmp
    hooks.inject.writeFile = true // the write fails -> the catch-block's cleanup runs on the stale FILE
    let controlThrew: unknown = null
    try {
      controlStore.set({ token: 'after' })
    } catch (e) {
      controlThrew = e
    }
    expect(controlThrew, 'positive control — a stale FILE tmp: set() does NOT throw (the cleanup rm on a file succeeds)').toBeNull()
    expect(await readFile(controlPath, 'utf8'), 'positive control — the previous file is intact at the real path (§2.2 item 6)').toBe(preControl)
    expect(lastWriteReceipt(controlStore), 'positive control — the persist answers {status:\'refused\', reason:\'write-failed\'} (§2.3 item 5)').toEqual({ status: 'refused', reason: 'write-failed' })
    resetInject()
    // THE DIRECTORY CASE — the audit's finding: the stale `${path}.tmp` names a DIRECTORY, so
    // the writeFileSync throws EISDIR NATURALLY (no injection — the hostile pre-existence class
    // §3a seeds), and the catch-block's own rmSync(tmp, {force:true}) WITHOUT recursive throws
    // EISDIR on the directory, ESCAPING persist().  RED measured today: set() throws the
    // cleanup error, the receipt never updates (the stale `committed` from the first write is
    // still the answer), and the refusal is never delivered:
    const { store, path } = await makeStore()
    store.set({ token: 'before' })
    const pre = await readFile(path, 'utf8')
    await mkdir(`${path}.tmp`) // a stale tmp that names a DIRECTORY (mkdir BEFORE the persist)
    let threw: unknown = null
    try {
      store.set({ token: 'after' })
    } catch (e) {
      threw = e
    }
    expect(threw,
      'F-11 — set() must NOT throw when a stale `${path}.tmp` names a directory (§2.3 item 5: a refusal NEVER throws; §3.3 I-4). RED today: the catch-block\'s rmSync(tmp, {force:true}) throws EISDIR on the directory and ESCAPES persist() — set() throws the cleanup error: ' +
        (threw instanceof Error ? String(threw) : String(threw))).toBeNull()
    expect(await readFile(path, 'utf8'),
      'F-11 — the previous file is intact at the real path (§2.2 item 6 — the failure never touches the real record)').toBe(pre)
    expect(lastWriteReceipt(store),
      'F-11 — the persist answers {status:\'refused\', reason:\'write-failed\'} — never a silent no-op, never a throw (§2.1 item 5, §2.3 item 5, P-SE-TP-1). RED today: lastReceipt never updates (the escaping cleanup error leaves the FIRST write\'s stale `committed` as the answer)').toEqual({ status: 'refused', reason: 'write-failed' })
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
    property: 'THE SECURITY FILE IS NEVER TORN AND THE PREVIOUS RECORD SURVIVES EVERY PRE-RENAME FAILURE (§2.2: tmp-write · tmp-fsync · rename); A POST-RENAME DIR-FSYNC FAILURE ANSWERS THE REFUSED RECEIPT WITH THE NEW RECORD LIVE (never torn, never silent — but the pre-write bytes are gone; §3.3 I-1, NEW-2 re-grain)',
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
        term: 'fsync failure (the PRE-RENAME tmp-fsync class) · reading (a): the fsync point EXISTS in the write sequence, and the real path\'s record is byte-identical — the POST-RENAME dir-fsync class (the refused receipt with the NEW record live) is driven at P-SE-SM-1\'s COMMITTED/RENAMED refused terminal (NEW-2 re-grain)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.fsync = true // throws at the FIRST fsync of the next persist — the tmp, PRE-RENAME (the dir-fsync is call 2; its class is the COMMITTED/RENAMED terminal's)
          fresh.store.set({ token: 'after' })
          expect(hooks.log.some((e) => e.startsWith('fsync:')), 'P-SE-IM-1 — the fsync point exists (§2.2 item 2(a)); today NO fsync exists (the plain write has no such point) — RED').toBe(true)
          expect(await readFile(fresh.path, 'utf8'), 'P-SE-IM-1 — the PRE-RENAME tmp-fsync failure leaves the previous file byte-identical at the real path (§2.2 item 6; NEW-2: this intact claim is the PRE-RENAME point\'s — never a POST-rename one)').toBe(pre)
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
        term: '(4) the store-module FILE byte-pin: store-core-graph.ts / store-graph-references.ts byte-identical to the G2 re-cycle\'s measured FILE sha256 (0664c52f… / 5c0c1a97…)',
        run: async () => {
          // 2026-10-03 (G3 red-set fix): the figure is CORRECTED — the stale `29772ac7…` was the
          // ARTIFACT's span digest (the HYDRATE-1 re-freeze over fields 1–7), NOT the FILE's sha256;
          // the E-2 class pins the raw module bytes' hash (the store-owner's E-2 convention), and
          // G2's re-cycle measured + re-pinned them: 0664c52f… / 5c0c1a97… — re-verified with
          // `sha256sum` in this pass (full digests pinned below).  The store module is un-touched
          // and its file hash is stable.
          const filePins: Record<string, string> = {
            'renderer/store-core-graph.ts': '0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450',
            'renderer/store-graph-references.ts': '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
          }
          for (const rel of [['renderer', 'store-core-graph.ts'], ['renderer', 'store-graph-references.ts']]) {
            const digest = createHash('sha256').update(await sourceOf(rel)).digest('hex')
            const pinned = filePins[rel.join('/')]
            expect(digest,
              `${rel.join('/')} byte-pin (pinned ${pinned.slice(0, 8)}…; got ${digest.slice(0, 8)}…)`).toBe(pinned)
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
    property: 'THE ATOMIC-WRITE STATE MACHINE (CLOSED): IDLE → TMP-WRITTEN → FSYNCED → COMMITTED/RENAMED, every failure → REFUSED — FILE-STATE HONESTY (NEW-2 re-grain): a PRE-RENAME failure keeps the previous file intact; a POST-RENAME dir-fsync failure answers refused with the NEW record LIVE at the real path (§2.2; §3.3 I-1)',
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
        term: 'COMMITTED/RENAMED · refused at the POST-RENAME DIR-FSYNC (NEW-2 re-grain, 2026-10-03) — the honest state: the refused receipt with the NEW record LIVE at the real path (the rename already committed it; the pre-write bytes are GONE — no torn-file, no data-loss, never silent). The PRE-RENAME tmp-fsync refused terminal is driven at P-SE-IM-1 reading (a) + P-SE-TP-1\'s fsync rows + F-2',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'before' })
          armDirFsyncFailure() // the 2nd fsyncSync of the NEXT persist — the parent-DIRECTORY fsync AFTER renameSync (security-store.ts:93-95)
          fresh.store.set({ token: 'after' })
          // the refused receipt — the dir-fsync failure still answers the closed refusal form:
          expect(lastWriteReceipt(fresh.store), 'COMMITTED/RENAMED · dir-fsync refused — the receipt answers {status:\'refused\', reason:\'write-failed\'} (§2.3 item 5)').toEqual({ status: 'refused', reason: 'write-failed' })
          // the HONEST file state: the rename already replaced the real path, so the NEW
          // record is LIVE — a VALID (parseable, untorn) record; the pre-write bytes are gone:
          const onDisk = JSON.parse(await readFile(fresh.path, 'utf8')) as { token: unknown }
          expect(onDisk.token,
            'COMMITTED/RENAMED · dir-fsync refused — the real path holds the NEW record (the rename already committed it); a valid, never-torn record; the pre-write bytes are GONE — NEW-2: the previous-file-intact claim is scoped to the PRE-RENAME failure points').toBe('after')
          // the in-memory post-state still answers (the process-lifetime authority, §2.1 item 2):
          expect(fresh.store.get().token).toBe('after')
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
        term: 'N=1 · reading 1: the REAL constructed pane with a SMALL cap M=2 — 1 refreshDebug drive already CROSSES the cap (11 state-slice entries > M); journalDepth() ≤ M after the deferred condense settles; the UNCAPPED control grows > M (the drive journals — never an existence-check)',
        run: async () => {
          // gate-4 finding 2's drive (RED-SET-FIX, 2026-10-03): the as-filed reading-1 asserted
          // ONLY `typeof journalDepth === 'function'` — no pane constructed, no refresh cycle,
          // the cap never crossed.  THIS drive constructs the pane and CROSSES the cap with the
          // REAL surface; RED measured today: the pane supervisor's condense ABORTS
          // (serialization-error: non-JSON value; journal untouched) and the depth grows past M
          // (measured N=25 → 275 at the probe pass) — the pane journal is effectively UNCAPPED.
          const { capped, uncapped } = await drivePaneCap(2, 1)
          expect(capped,
            'P-SE-SM-2 (N=1) — journalDepth() stays ≤ M (§2.5 items 1/2/4). RED measured today: the pane condense aborts and the depth grows past M — measured ' + capped + ' > 2').toBeLessThanOrEqual(2)
          expect(uncapped,
            'P-SE-SM-2 (N=1) — the UNCAPPED control grows past M (the drive journals per mutated pane node; the capped ≤ M is the cap\'s observable — the false-green premise is closed): measured ' + uncapped).toBeGreaterThan(2)
        },
      },
      {
        term: 'N=1 · reading 2: the burst probe (NEW-1 re-aim — the CLOSED-OCCURRENCE count): EXACTLY TWO refreshDebug invocation sites in renderer.ts (the boot line + the notify-callback line); a THIRD code site ANYWHERE (a re-added reply-path burst) FAILS; the boot/notify refresh presence holds',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          assertBurstAbsentForm2(rendererSrc)
        },
      },
      {
        term: 'N=5 · reading 1: 5 refreshDebug drives on the constructed pane (M=2, the cap crossed 5× — 55 entries without a firing condense); journalDepth() ≤ M after settle; the UNCAPPED control grows > M',
        run: async () => {
          const { capped, uncapped } = await drivePaneCap(2, 5)
          expect(capped,
            'P-SE-SM-2 (N=5) — journalDepth() ≤ M (§2.5 items 1/2/4). RED measured today: the pane condense aborts and the depth grows past M — measured ' + capped + ' > 2').toBeLessThanOrEqual(2)
          expect(uncapped,
            'P-SE-SM-2 (N=5) — the UNCAPPED control grows past M: measured ' + uncapped).toBeGreaterThan(2)
        },
      },
      {
        term: 'N=5 · reading 2: the burst probe (the SAME closed-occurrence count as N=1\'s reading 2) holds across drives',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          assertBurstAbsentForm2(rendererSrc)
        },
      },
      {
        term: 'N=20 · reading 1: 20 refreshDebug drives on the constructed pane (M=2, the cap crossed 20× — 220 entries without a firing condense); journalDepth() ≤ M after settle (the condense FIRES and the depth drops — the unbounded-growth class is closed); the UNCAPPED control grows > M',
        run: async () => {
          const { capped, uncapped } = await drivePaneCap(2, 20)
          expect(capped,
            'P-SE-SM-2 (N=20) — journalDepth() ≤ M (§2.5 items 1/2/4: the cap crossed, the condense fires, the depth stays bounded). RED measured today: the pane condense aborts and the depth grows past M — measured ' + capped + ' > 2').toBeLessThanOrEqual(2)
          expect(uncapped,
            'P-SE-SM-2 (N=20) — the UNCAPPED control grows past M (F-8\'s unbounded-growth class is live without the cap): measured ' + uncapped).toBeGreaterThan(2)
        },
      },
      {
        term: 'N=20 · reading 2: the burst probe (the closed-occurrence count) holds; the seam\'s production-absence probe (the STATIC control) holds',
        run: async () => {
          const rendererSrc = await sourceOf(['renderer', 'renderer.ts'])
          assertBurstAbsentForm2(rendererSrc)
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
    property: 'RECEIPT TOTALITY — every write answers EXACTLY ONE of the two closed forms on BOTH surfaces; a refusal never throws (§2.3; §3.3 I-7). FILE-STATE per class (NEW-2 re-grain): a PRE-RENAME failure leaves the previous file intact; the POST-RENAME dir-fsync failure leaves the NEW record live — never torn, never silent',
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
        term: 'fsync failure (the PRE-RENAME tmp-fsync class — the FIRST fsync) · assertion 2: the file\'s post-state is the pre-write record and the in-memory post-state still answers — the POST-RENAME dir-fsync class (the refused receipt with the NEW record live) is driven at P-SE-SM-1\'s COMMITTED/RENAMED refused terminal (NEW-2 re-grain)',
        run: async () => {
          const fresh = await rowStore()
          fresh.store.set({ token: 'v1' })
          const pre = await readFile(fresh.path, 'utf8')
          hooks.inject.fsync = true // the FIRST fsync of the next persist — the tmp, PRE-RENAME (the dir-fsync is call 2 and never runs — the rename is not reached; the class's file state is scoped accordingly)
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
  lines.push('REGISTER-ROW-OUTCOMES (executed run):')
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
    // the register's failing set — GREEN-phase reading (2026-10-03, G3 red-set fix): the RED
    // run's failing set (17 broken attempts, commit b8abcea) was RUN and REPORTED — the register
    // DID fail first (§4.3.2, RCA-1).  At GREEN the register must hold ALL 50 terms; a broken
    // term at green is a FAILURE, never a pass (§5.5.1).  The byte-pin terms (P-SE-IM-2(4)) were
    // the register's last permanently-red class — corrected to the measured FILE sha256s, so the
    // gate now pins the green shape (broken MUST be 0):
    const broken = outcomes.reduce((s, o) => s + o.failed, 0)
    expect(broken, 'G3-green — the register holds ALL 50 terms (the red class is recorded in the red run, commit b8abcea): BROKEN ' + broken + ' attempt(s) at green').toBe(0)
    // the remaining rows, if any, also execute (never skipped):
    expect(outcomes.every((o) => o.attempts.length === o.declared)).toBe(true)
  })

  it('prints the register\'s arithmetic and per-row evidence (the totals WITH their terms)', async () => {
    process.stdout.write('\n' + (await registerReport()) + '\n')
    expect(true).toBe(true)
  })
})