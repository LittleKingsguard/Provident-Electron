/**
 * ============================================================================
 * S2 = U-TIER4-ARBITRARY-STORAGE — THE RED SET (RCA-1: tests FIRST, RUN and
 * REPORTED failing, before any implementation).  Author: TestWriter.
 * Layer: `[H]`/`[T]` per `§1.4`; the `[U]` battery is gate 6's and is NOT driven
 * here (`§5.2` item 6).
 *
 * Spec: `docs/specs/tier4-arbitrary-storage.md` (read in FULL — 466 lines at
 * red-authoring; every operative cell is cited by `§`/row id, never by line).
 * Register harness: `tests/tier4-arbitrary-storage-register.ts` (the `§5.5.1`
 * typed rows + their executor; a non-`.test.ts` module so it is never collected
 * as its own suite).
 *
 * WHAT THIS FILE IS: the store-local arbitrary-storage opening's and the four
 * gating clauses' red set — authored from THE SPEC ALONE against the CURRENT
 * tree.  Everything the contract declares (`readEntry`/`writeEntry` · the
 * `entries` member · the STATIC HOLDER `src/main/tier4-state.ts` (`A-1`'s `2026-10-11`
 * ruling, `§0A` item 1) · the `'tier4-closed'` channel token
 * and its message · the additive `read` carrier member · the pane's two
 * re-sourced cells and the ONE additive `· refused: tier4-closed` segment) is
 * asserted AS IF IT ALREADY EXISTED, so the absent symbols fail FIRST, in the
 * honest form `§4.1` demands ("the register's un-run rows are reported as
 * FAILURES").
 *
 * ── THE STATES THIS FILE ENUMERATES, BEFORE THE ROWS (`§3.1`/`§3.2`) ────────
 * VALID / HAPPY (`§3.1`): `M-1` boot OPEN, nothing ingested (record = the
 * first-run default; `entries` EMPTY and ABSENT from the file) · `M-2` the
 * boot-ingestion read inside the declared OPEN window (succeeds, no exception) ·
 * `M-3` a legacy file carrying foreign top-level keys (ingested VERBATIM into
 * `entries`, readable, and surviving the next successful write) · `M-4` CLOSED,
 * a tier read (PRE-CALL value, detached; a never-written name ⇒ `null`; no
 * throw) · `M-5` CLOSED, a tier write (the closed refusal VALUE; `set()` answers
 * the PRE-WRITE record; the receipt answers the refusal; no filesystem call, no
 * advance) · `M-6` OPEN, a tier write — THE NON-VACUITY TERM (commits and lands;
 * the file's bytes move) · `M-7` OPEN, `writeEntry` with an admitted value
 * (committed; live map AND file agree; `readEntry` answers a detached
 * `{name, value}`) · `M-8` OPEN, a name written twice (the LAST admitted value;
 * live == durable) · `M-9` the operator's carrier while OPEN and while CLOSED
 * (both members legible; neither blanked by the gated store) · `M-10` the return
 * transition then a write (REFUSED — the measured `SC-D-07` shape closes) ·
 * `M-11` a self-transition and an outside-value payload (no-op / refused as a
 * value; no epoch bump, no boolean move).
 * FAIL-STATES (`§3.2`), one row each: `FS-T4-01`…`FS-T4-13`.  `FS-T4-11`'s RACE
 * is explicitly NOT covered (`§0A` item 2, `SC-D-08` `MANUAL`): the row asserts
 * only that a read landing inside the window answers ONE side of the pair.
 *
 * ── THE CONTROLS ADDED (each absence-asserting arm carries one) ─────────────
 * `CTL-1` the store-accessor helpers `absent()` when the member is missing (so
 *   an absent member is reported as the DECLARED absent symbol, never a bare
 *   `TypeError`) — and the register's broken/un-run bounds are proven able to
 *   FAIL by the synthetic control runs.
 * `CTL-2` the `· refused: tier4-closed` detector is driven against a carrier
 *   whose `read` is `null` (it must NOT fire) and against a refusal carrier (it
 *   MUST fire) — a detector that cannot fail proves nothing.
 * `CTL-3` the token-census detector is driven against a mutated string (it must
 *   FIRE, so `'exclusion-closed'`'s absence is attributable).
 * `CTL-4` the filesystem-call detector is driven against a COMMITTED write (the
 *   log MUST move) — so "no filesystem call on a refusal" is not vacuous.
 * `CTL-5` the pane's `data-state` probe is driven against a pane whose carrier
 *   was NOT refreshed (the probe MUST be able to read a stale value).
 * `CTL-6` (**ADDED `2026-10-11` by the gate-6 `F-1` red row — the note sits BESIDE `CTL-5`,
 *   never over it**) the SAME probe is driven against a pane whose carrier SUPPLIED
 *   `exclusion:'mcp-disabled'`, and it MUST read that supplied word — which is the INVERSE of
 *   the AUTHORED envelope literal. So `F-1`'s four no-answer readings are SOURCE readings, and no
 *   repair may satisfy the row by blanking the prop forever.
 *
 * ── THE TYPE SHIM (the sibling red sets' `-mend`-style pattern) ─────────────
 * Leg 4 is `npm run typecheck:tests` (`tsc -p tsconfig.tests.json`), which
 * compiles the WHOLE `tests/**` tree under `--strict`.  The declared surfaces DO
 * NOT EXIST on the landed types, so a direct member access would be a TS2339
 * that makes this file fail leg 4 — and a test file that fails
 * `typecheck:tests` is NOT a valid red set.  Every not-yet-widened surface is
 * therefore read through a NARROW, LOCAL receiver type with an explicit
 * `as unknown as` at the call site.  The shim changes NO runtime value and
 * weakens NO assertion: every drive still asserts the declared shape, and an
 * absent member is reported by the drive itself.
 *
 * ── THE DECLARED LIMIT, STATED (never hidden) ──────────────────────────────
 * `§1.4` item 3: NO timing figure is claimed anywhere; every drive asserts ORDER
 * and OUTCOME.  The `[H]` rows that must read `main.ts`'s boot window and the
 * GET handler are **source probes with a declared limit**, exactly the form
 * `docs/specs/secure-store-discipline.md` `§9` item 5(c) permits for a clause
 * whose seam the contract forbids the unit to export; each such row names its
 * limit in-line.
 * ============================================================================
 */
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest'
import { mkdtemp, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
import { SecurityGate } from '../src/main/security.js'
import {
  BOUNDED_ROWS, DECLARED_CARRIER_MEMBERS, DECLARED_OPTION_CENSUS, DECLARED_SURFACE_MEMBERS,
  DECLARED_TERMS, EXCLUSION_CLOSED, LANDED_CARRIER_MEMBERS, LANDED_OPTION_CENSUS, LANDED_SURFACE_MEMBERS,
  MAIN_SRC, MCP_SERVER_SRC, MEASURED_FROZEN_PINS, PRELOAD_SRC, REGISTER_ROW_CAP, REGISTER_ROW_IDS,
  REGISTER_TOTAL_CAP, SECURE_PANELS_SRC, SECURITY_STORE_PIN, SECURITY_STORE_PIN_CHAIN, SECURITY_STORE_SRC,
  SHARED_TYPES_SRC, STATE_MCP_DISABLED, STATE_MCP_ENABLED, STOP_AFTER_CONSECUTIVE, STRATEGY_IDS,
  STORE_CHANNELS_SRC, STORE_CORE_SRC, TIER4_CLOSED, TIER4_CLOSED_MESSAGE, TIER4_STATE_SRC,
  brokenCountCheckOf, brokenCountGuardOldForm, declaredReasonTokens, declaredTotalReport, exists,
  executeRegister, loadStoreModule, preCarrierPaneDrives, registerReportLines, sha256Of, sourceOrEmpty,
  syntheticBrokenRegisterControlOnly, syntheticUnRunRegisterControlOnly,
  type Drive, type RegisterRow,
} from './tier4-arbitrary-storage-register.js'

/* ═══════════════════════════ THE INSTRUMENTED FS (§2.1 item 5, `A-1`'s declared
 * default).  The `A-1` reader and the write path's `fs` seam are BOTH handed to the
 * store at construction, so "a refusal makes NO filesystem call" is a MEASURED
 * reading rather than an inference from a code read — and the seam is a declared
 * option of THIS unit's own surface (`§0A` item 1), not an invented export
 * (`§2.1` item 1 forbids a new exported name).  An implementation that lands the
 * reader under a different option NAME fails these rows by VALUE, which is the
 * spec-amendment this red set must force (§4.3 item 1).                         */

interface FsLog {
  readonly calls: string[]
  writeFileAt: number | null
  fsyncAt: number | null
  renameFail: boolean
  /** ⟶ ADDED `2026-10-11` (the repair contract, **D-ix**): the READ-class members of the seam
   *  (`existsSync` / `readFileSync`) are logged too, so the DECLARED boot-ingestion turn is a
   *  MEASUREMENT. It defaults to `false`, so every pre-existing drive's readings are byte-for-byte
   *  what they were (the as-filed instrument could not see the ingestion read at all, which is
   *  exactly what D-ix names: the clause binds the REFUSAL path's WRITE-class calls). */
  logReads: boolean
}
function freshFsLog(): FsLog {
  return { calls: [], writeFileAt: null, fsyncAt: null, renameFail: false, logReads: false }
}
/** THE SEAM'S TYPE — exact-`typeof` compatibility (`leg 4`, `npm run typecheck:tests`):
 *  each member is declared with the REAL `node:fs` signature, so the seam is
 *  structurally assignable to whatever narrowed fs surface the store declares. */
const fsModule = await import('node:fs')
type FsSeam = {
  readFileSync: typeof fsModule.readFileSync
  existsSync: typeof fsModule.existsSync
  mkdirSync: typeof fsModule.mkdirSync
  writeFileSync: typeof fsModule.writeFileSync
  openSync: typeof fsModule.openSync
  closeSync: typeof fsModule.closeSync
  fsyncSync: typeof fsModule.fsyncSync
  renameSync: typeof fsModule.renameSync
  rmSync: typeof fsModule.rmSync
}

function makeFsSeam(log: FsLog): FsSeam {
  // The dynamic `import('node:fs')` inside a test does NOT pass through vitest's
  // module mock graph, so the seam is the store's OWN declared construction input
  // (`A-1`'s declared default + the write path's fs seam).
  let fsyncSeen = 0
  const seam: FsSeam = {
    // The store's own read shape: a UTF-8 string. Declared explicitly (and cast) so the
    // seam satisfies the real `node:fs` overload without widening the store's contract.
    readFileSync: ((path: Parameters<typeof fsModule.readFileSync>[0], options?: unknown) => {
      if (log.logReads) log.calls.push(`readFile:${String(path)}`)
      return fsModule.readFileSync(path as never, (options ?? 'utf8') as never) as never
    }) as FsSeam['readFileSync'],
    existsSync: (path) => {
      if (log.logReads) log.calls.push(`exists:${String(path)}`)
      return fsModule.existsSync(path)
    },
    mkdirSync: (dir, options) => {
      log.calls.push(`mkdir:${String(dir)}`)
      return fsModule.mkdirSync(dir, options)
    },
    writeFileSync: (file, data, options) => {
      log.calls.push(`writeFile:${String(file)}`)
      if (log.writeFileAt !== null && log.calls.filter((c) => c.startsWith('writeFile:')).length === log.writeFileAt) {
        throw new Error('injected: tmp-write failure')
      }
      return fsModule.writeFileSync(file, data as never, options as never)
    },
    openSync: (path, flags, mode) => {
      log.calls.push(`open:${String(path)}`)
      return fsModule.openSync(path, flags, mode)
    },
    closeSync: (fd) => {
      fsModule.closeSync(fd)
    },
    fsyncSync: (fd) => {
      log.calls.push('fsync')
      fsyncSeen += 1
      if (log.fsyncAt !== null && fsyncSeen === log.fsyncAt) throw new Error('injected: fsync failure')
      fsModule.fsyncSync(fd)
    },
    renameSync: (oldPath, newPath) => {
      log.calls.push(`rename:${String(oldPath)}→${String(newPath)}`)
      if (log.renameFail) throw new Error('injected: rename failure')
      fsModule.renameSync(oldPath, newPath)
    },
    rmSync: (path, options) => {
      log.calls.push(`rm:${String(path)}`)
      fsModule.rmSync(path, options)
    },
  }
  return seam
}

/* ═══════════════════════════ THE STORE FIXTURE ═════════════════════════════ */

type StoreLike = {
  get(): Record<string, unknown>
  set(patch: unknown): Record<string, unknown>
  lastWriteReceipt?: () => unknown
  readEntry?: (name: unknown) => unknown
  writeEntry?: (name: unknown, value: unknown) => unknown
}

let storeModule: Awaited<ReturnType<typeof loadStoreModule>> = { module: null, reason: 'not loaded' }
let baseDir = ''
let seq = 0
/** The TEST-SIDE mirror of the holder, kept ONLY so the legacy fallback can drive the landed
 *  option while `src/main/tier4-state.ts` is absent. The DECLARED value is the leaf's. */
let openState: boolean = true

/* ═══════════════════════════ THE STATIC HOLDER (`A-1`'s `2026-10-11` RULING) ═══════════════
 * `docs/specs/tier4-arbitrary-storage.md` `§0A` item 1's dated amendment REPLACED the injected
 * thunk with ONE main-side LEAF module: `src/main/tier4-state.ts`, whose STATIC module-level
 * holder IS the one boolean, whose declared INITIAL VALUE is STORE-OPEN, whose ONE reader is
 * `tier4OpenState()` and whose ONE writer is `setTier4OpenState()` (its only production caller
 * being the transition). `SecurityStoreOptions` is UNMOVED at `{ path }`, so these rows drive the
 * holder — never an option. The module is resolved by a FRAGMENT-ASSEMBLED specifier (the
 * `loadStoreModule` precedent), so its ABSENCE is DATA: while it is absent the fixture falls back
 * to the landed option so the OTHER rows keep their own subjects, and every row that ASSERTS the
 * holder reddens with the declared absent symbol. */
const TIER4_STATE_SPEC = ['..', 'src', 'main', 'tier4-state.js'].join('/')
interface Tier4StateModule {
  tier4OpenState?: () => boolean
  setTier4OpenState?: (open: boolean) => void
}
let tier4StateModule: Tier4StateModule | null = null
let tier4StateReason = 'not loaded'
async function loadTier4StateModule(): Promise<void> {
  try {
    const mod = (await import(/* @vite-ignore */ TIER4_STATE_SPEC)) as Tier4StateModule
    if (typeof mod.tier4OpenState !== 'function') {
      tier4StateModule = null
      tier4StateReason = 'ABSENT: the leaf exports no `tier4OpenState`'
      return
    }
    tier4StateModule = mod
    tier4StateReason = ''
  } catch (e) {
    tier4StateModule = null
    tier4StateReason = `ABSENT: ${e instanceof Error ? e.message : String(e)}`
  }
}
function tier4HolderAbsent(where: string): Error {
  return new Error(`S2-RED: the STATIC HOLDER is absent (${where}) — ${tier4StateReason}; \`src/main/tier4-state.ts\` must export \`tier4OpenState()\` (\`§0A\` item 1, the \`A-1\` ruling)`)
}
/** THE DECLARED READER (`§0A` item 1): `tier4OpenState()` — read ONCE PER CALL at the call's own
 *  turn. While the leaf is absent the fixture's LEGACY fallback keeps the mirror authoritative, so
 *  only the rows that assert the holder redden. */
const tier4Reader = (): boolean => (tier4StateModule === null ? openState : (tier4StateModule.tier4OpenState as () => boolean)())
/** THE DECLARED WRITER (`§0A` item 1): `setTier4OpenState(open)`. In PRODUCTION its only caller is
 *  the transition (`mcp-server.ts`'s `applyExclusion`); a test driving it directly is not a second
 *  production site, and the one-writer census is asserted over `src/main/**` by `P-T4-IM-2`. */
function setTier4Open(open: boolean): void {
  openState = open
  tier4StateModule?.setTier4OpenState?.(open)
}

interface StoreFixture {
  store: StoreLike
  path: string
  log: FsLog
  calls: () => readonly string[]
  bytes: () => Promise<string | null>
  mtime: () => Promise<number | null>
  seed: (record: Record<string, unknown>) => Promise<void>
  rawSeed: (text: string) => Promise<void>
  makeDirAtPath: () => Promise<void>
}

async function makeStoreFixture(opts?: { fsOpts?: boolean; readLog?: boolean; fsSurface?: unknown }): Promise<StoreFixture> {
  const dir = join(baseDir, String(seq++))
  const path = join(dir, 'provident-security.json')
  return makeStoreOnPath(path, { ...opts, dir })
}

/** ⟶ ADDED `2026-10-11` (the repair contract, **D-ii**'s *"still there after a RE-CONSTRUCTED store
 *  on the same path"*): the SAME construction, against a path that already exists — so the second
 *  instance's own boot INGESTION is what is being read, never a re-used closure. Also the ONE place
 *  a caller-supplied `fs` surface is handed (`D-iv`: an INCOMPLETE surface must NOT be adopted). */
async function makeStoreOnPath(path: string, opts?: { fsOpts?: boolean; readLog?: boolean; fsSurface?: unknown; dir?: string }): Promise<StoreFixture> {
  if (storeModule.module === null) {
    throw new Error(`S2-RED: the store module is ABSENT — ${storeModule.reason}`)
  }
  const dir = opts?.dir ?? join(baseDir, String(seq++))
  const log = freshFsLog()
  log.logReads = opts?.readLog === true
  // `SecurityStoreOptions` IS UNMOVED AT `{ path }` (`§0A` item 1, `A-1`'s ruling): the ONLY
  // construction input is the path. The `fs` seam is the module's SECOND declared construction
  // input (`D-iv`, the `§6` `PAR-14` row) — the declared interface PLUS the destructured extra.
  // WHILE THE LEAF IS ABSENT the fixture passes the landed `tier4Open` thunk as a LEGACY FALLBACK —
  // dead code the instant `src/main/tier4-state.ts` lands — so the rows that do NOT assert the
  // holder keep their own subjects.
  const construction: Record<string, unknown> = { path }
  if (tier4StateModule === null) construction.tier4Open = () => openState
  if (opts?.fsSurface !== undefined) construction.fs = opts.fsSurface
  else if (opts?.fsOpts !== false) construction.fs = makeFsSeam(log)
  const store = storeModule.module.createSecurityStore(construction) as StoreLike
  return {
    store, path, log,
    calls: () => log.calls,
    bytes: async () => { try { return await readFile(path, 'utf8') } catch { return null } },
    mtime: async () => { try { return (await stat(path)).mtimeMs } catch { return null } },
    seed: async (record) => {
      await mkdir(dir, { recursive: true })
      await writeFile(path, JSON.stringify(record))
    },
    rawSeed: async (text) => {
      await mkdir(dir, { recursive: true })
      await writeFile(path, text)
    },
    makeDirAtPath: async () => { await mkdir(path, { recursive: true }) },
  }
}

const FIRST_RUN_DEFAULT = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
const SEEDED = { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 }

/* ── the RED-honest accessors (`CTL-1`): an absent member reports the DECLARED
 *    absent symbol, never a bare TypeError.                                   */
function readEntryOf(store: StoreLike, name: unknown): unknown {
  const fn = store.readEntry
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `readEntry` does not exist on the store (§2.1 item 3) — the arbitrary-storage opening is ABSENT')
  }
  return fn.call(store, name)
}
function writeEntryOf(store: StoreLike, name: unknown, value: unknown): unknown {
  const fn = store.writeEntry
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `writeEntry` does not exist on the store (§2.1 item 3) — the arbitrary-storage opening is ABSENT')
  }
  return fn.call(store, name, value)
}
function receiptOf(store: StoreLike): unknown {
  const fn = store.lastWriteReceipt
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `lastWriteReceipt` does not exist (§2.1 item 3)')
  }
  return fn.call(store)
}
function assertClosedRefusal(answer: unknown, where: string): void {
  expect(answer, `${where} — the refusal is a VALUE from the closed vocabulary (§3.4): ${JSON.stringify(answer)}`).toEqual({
    status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE,
  })
}

/* ═══════════════════════════ THE PANE FIXTURE (`§2.6`) ═════════════════════ */
function carrierRecord(exclusion: string, read: unknown): Record<string, unknown> {
  return { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion, read }
}
async function mountPaneFor(carrier: Record<string, unknown>): Promise<{ panels: SecurePanels; mount: unknown; reads: () => number }> {
  let reads = 0
  const bridge = {
    get: async () => { reads += 1; return { ...carrier } },
  }
  ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: bridge } }
  const mount = mountEl()
  const panels = new SecurePanels(mount as never)
  await panels.refresh()
  return { panels, mount, reads: () => reads }
}
function paneTextOf(panels: SecurePanels, nodeId: string): string {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}" (the landed SecurePanels surface)`)
  return String((node as { content?: unknown }).content ?? '')
}
function panePropOf(panels: SecurePanels, nodeId: string, prop: string): unknown {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}"`)
  return (node as { props?: Record<string, unknown> }).props?.[prop]
}
const REFUSAL_SEGMENT = '· refused: tier4-closed'
function segmentDetector(text: string, read: unknown): boolean {
  const present = text.includes(REFUSAL_SEGMENT)
  return read === null ? !present : present
}
function fabricatedDisabledDetector(text: string, exclusion: string): boolean {
  if (exclusion === STATE_MCP_DISABLED) return /· MCP: disabled/.test(text)
  return /· MCP: enabled/.test(text)
}

/* ═══════════ THE REPAIR CONTRACT'S INSTRUMENTS (`2026-10-11`, gate 4's ruled repairs) ═══════
 * Every detector below is driven BOTH WAYS by the row that uses it (a control that MUST fire and
 * a control that MUST NOT), so no absence-asserting arm is vacuous (`RCA-8(d)`).
 * `D-i` `-0` · `D-ii` `__proto__` · `D-iii` the non-object boot record · `D-iv` the `fs` seam's
 * census and its call surface · `D-vi` the pane's fabrications · `D-vii` the boot order ·
 * `D-viii` the handler's ONE reading · `D-ix` the WRITE-class `fs` reading · `D-x` the full pins. */
const FS_MEMBER_NAMES = ['readFileSync', 'existsSync', 'mkdirSync', 'writeFileSync', 'openSync', 'closeSync', 'fsyncSync', 'renameSync', 'rmSync'] as const
/** `D-ix`: the WRITE-class members of the `fs` surface — the ones a refusal must never touch — and
 *  the READ-class pair, which is the DECLARED boot-ingestion turn (`exists:`/`readFile:`). */
const WRITE_CLASS_CALL = /^(?:mkdir|writeFile|open|fsync|rename|rm):/
const READ_CLASS_CALL = /^(?:exists|readFile):/
function writeClassCalls(calls: readonly string[]): string[] { return calls.filter((c) => WRITE_CLASS_CALL.test(c)) }
function readClassCalls(calls: readonly string[]): string[] { return calls.filter((c) => READ_CLASS_CALL.test(c)) }
/** Comments stripped, by a small SCANNER (never by a regex): the subject is CODE, never prose —
 *  `D-vi`/`D-viii` and the row-10 re-grain all require a detector a comment cannot satisfy. The
 *  scanner walks strings VERBATIM (a `//` inside a literal is not a comment), which also means a
 *  prose mention of a glob such as `src/**` inside a LINE comment can never open a block comment
 *  and swallow the code beneath it — the failure mode a regex stripper has, and one this file
 *  hit while being authored. */
function codeOnly(src: string): string {
  let out = ''
  let i = 0
  while (i < src.length) {
    const ch = src[i]
    const next = src[i + 1]
    if (ch === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2)
      i = end === -1 ? src.length : end + 2
      out += ' '
      continue
    }
    if (ch === '/' && next === '/') {
      const end = src.indexOf('\n', i)
      i = end === -1 ? src.length : end
      out += ' '
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      let j = i + 1
      while (j < src.length) {
        if (src[j] === '\\') { j += 2; continue }
        if (src[j] === quote) { j += 1; break }
        j += 1
      }
      out += src.slice(i, j)
      i = j
      continue
    }
    out += ch
    i += 1
  }
  return out
}
/** The GET answer's OWN object literal — the ONLY region a carrier-MEMBER detector may read, so a
 *  detector can never fire on a LOCAL (`const exclusion: ExclusionState = …` · `const read: …`),
 *  which is exactly the class the row-10 re-grain exists to close. */
function answerLiteralOf(handlerSrc: string): string {
  const braceAt = handlerSrc.indexOf('({')
  if (braceAt === -1) return ''
  let depth = 0
  for (let i = braceAt + 1; i < handlerSrc.length; i++) {
    const ch = handlerSrc[i]
    if (ch === '{') depth += 1
    else if (ch === '}') { depth -= 1; if (depth === 0) return handlerSrc.slice(braceAt + 1, i + 1) }
  }
  return ''
}
/** `D-iv`: the module's REAL construction inputs — the DECLARED interface's members PLUS the
 *  destructured extra. The non-destructured signature the bytes carry today answers `[]`. */
function destructuredConstructionInputs(src: string): string[] {
  const sig = /export function createSecurityStore\s*\(([\s\S]*?)\)\s*:/.exec(codeOnly(src))?.[1] ?? ''
  if (!/\{/.test(sig)) return []
  const brace = sig.slice(sig.indexOf('{') + 1, sig.lastIndexOf('}'))
  return brace.split(',').map((p) => p.split(/[:=]/)[0].trim()).filter((n) => /^\w+$/.test(n)).sort()
}
/** `D-iv`: a call to a `node:fs` member by its BARE imported name (not through the surface
 *  variable, whose receiver is `.`-qualified) — i.e. a call that BYPASSES the declared seam. */
function bareFsCallNames(src: string): string[] {
  const re = new RegExp(`(?<![.\\w$])(?:${FS_MEMBER_NAMES.join('|')})\\s*\\(`, 'g')
  return [...src.matchAll(re)].map((m) => m[0].replace(/\s*\($/, ''))
}
/** `D-iv`: the `nodeFs` literal's own byte range — the ONE place the real `node:fs` may be read. */
function nodeFsLiteralRange(src: string): [number, number] {
  const at = src.indexOf('const nodeFs')
  if (at === -1) return [-1, -1]
  const open = src.indexOf('{', at)
  if (open === -1) return [-1, -1]
  let depth = 0
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth += 1
    else if (src[i] === '}') { depth -= 1; if (depth === 0) return [at, i + 1] }
  }
  return [-1, -1]
}
function bareFsCallsOutsideNodeFs(src: string): string[] {
  const [from, to] = nodeFsLiteralRange(src)
  const outside = from === -1 ? src : src.slice(0, from) + src.slice(to)
  return bareFsCallNames(outside)
}
/** `D-iv` (`(c)`): the module's own INCOMPLETE surface fixture — the four members a boot read needs
 *  and NOT the write-critical ones, so an implementation that ADOPTS it refuses every write while
 *  one that falls back to the real `node:fs` commits. */
function incompleteFsSurface(): Record<string, unknown> {
  return { existsSync: fsModule.existsSync, readFileSync: fsModule.readFileSync }
}
/** The expression bound to an object literal's MEMBER (`exclusion:` · `read:`), comment-stripped,
 *  terminated at the member's own top-level `,` or `}` — never evaluated here. */
function memberExpression(src: string, member: string): string {
  const at = src.search(new RegExp(`\\b${member}\\s*:`))
  if (at === -1) return ''
  const start = src.indexOf(':', at) + 1
  let depth = 0
  for (let i = start; i < src.length; i++) {
    const ch = src[i]
    if ('([{'.includes(ch)) depth += 1
    else if (')]}'.includes(ch)) { if (depth === 0) return src.slice(start, i).trim(); depth -= 1 }
    else if (ch === ',' && depth === 0) return src.slice(start, i).trim()
  }
  return src.slice(start).trim()
}
/** `D-v`: the carrier's DERIVED `exclusion` member, EVALUATED with the ONE holder reading bound to
 *  `open` — the `secure-exclusion.md` `§9` G6-row precedent (the expression is read off the
 *  handler's own bytes and evaluated in a scope built from its own free identifiers).
 *  DECLARED LIMIT, stated: a free identifier other than the holder reader (or a declared constant)
 *  is bound to the boolean `open` — the shape both the landed and the repaired carrier have, since
 *  the value it holds IS the one reading. An expression that reaches anything else (a store read,
 *  a captured gate) throws here, which is exactly the FAILING direction. */
function carrierExclusionAtBoot(handlerSrc: string, open: boolean): unknown {
  const expr = memberExpression(answerLiteralOf(codeOnly(handlerSrc)), 'exclusion')
  const names = [...new Set([...expr.matchAll(/[A-Za-z_$][\w$]*/g)].map((m) => m[0]))]
    .filter((n) => !['true', 'false', 'null', 'undefined'].includes(n))
  const values = names.map((n) => {
    if (n === 'tier4OpenState') return () => open
    if (n === STATE_MCP_DISABLED) return STATE_MCP_DISABLED
    if (n === STATE_MCP_ENABLED) return STATE_MCP_ENABLED
    if (n === 'TIER4_CLOSED') return TIER4_CLOSED
    if (n === 'TIER4_CLOSED_MESSAGE') return TIER4_CLOSED_MESSAGE
    if (n === 'EXCLUSION_CLOSED') return EXCLUSION_CLOSED
    return open
  })
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(...names, `return (${expr})`)(...values) as unknown
}
/** `D-ii`/`D-iv`: every TypeScript module under `src/` (recursively), so a home or a direct `node:fs` call in a module the
 *  as-filed three-file detectors did not read is still FOUND. */
function listSourceFiles(root: string, out: string[] = []): string[] {
  for (const entry of fsModule.readdirSync(root, { withFileTypes: true })) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) listSourceFiles(full, out)
    else if (entry.name.endsWith('.ts')) out.push(full)
  }
  return out
}

/* ═══════════════════════════ THE `main.ts` SOURCE PROBES (`[H]`, declared limit) ═════ */
function getHandlerBody(mainSrc: string): string {
  const match = /ipcMain\.handle\(\s*IPC_SECURITY_GET\s*,[\s\S]*?\n\}\)/.exec(mainSrc)
  return match?.[0] ?? ''
}
function setHandlerBody(mainSrc: string): string {
  const match = /ipcMain\.handle\(\s*IPC_SECURITY_SET\s*,[\s\S]*?\n\}\)/.exec(mainSrc)
  return match?.[0] ?? ''
}
function bootWindowIndexes(mainSrc: string): {
  store: number
  bootRead: number
  gate: number
  readerConstructed: boolean
  storeIndex: number
} {
  const storeIndex = mainSrc.search(/createSecurityStore\(/)
  const bootRead = mainSrc.search(/securityStore\.get\(\)/)
  const gate = mainSrc.search(/new SecurityGate\(/)
  // `§0A` item 1 (AMENDED `2026-10-11`, the `A-1` ruling): NO READER IS CONSTRUCTED AT ALL — the
  // holder is a module-level static needing no construction site, and the as-filed "reader before
  // the store" price is WITHDRAWN. A `tier4Open:` option handed at construction is the WITHDRAWN
  // shape and is what this probe detects.
  const readerConstructed = /tier4Open\s*:/.test(mainSrc)
  return { store: storeIndex, bootRead, gate, readerConstructed, storeIndex }
}
/** THE CARRIER'S COMPOSITION, read off the live handler's own bytes (`§2.4` item 7).
 *  The handler closure is `() => ({ … })`, so the answer record's member set is the
 *  object literal's OWN top-level keys — read WITHOUT evaluating anything. */
function carrierMemberCensus(mainSrc: string): string[] {
  const body = getHandlerBody(mainSrc)
  const braceAt = body.indexOf('({')
  if (braceAt === -1) return []
  let depth = 0
  let end = -1
  for (let i = braceAt + 1; i < body.length; i++) {
    const ch = body[i]
    if (ch === '{') depth += 1
    else if (ch === '}') { depth -= 1; if (depth === 0) { end = i; break } }
  }
  if (end === -1) return []
  const literal = body.slice(braceAt + 1, end + 1)
  const keys: string[] = []
  for (const m of literal.matchAll(/(?:^|[,{]\s*)([A-Za-z_$][\w$]*)\s*:/g)) keys.push(m[1])
  if (/\.\.\./.test(literal)) keys.push('...spread')
  return [...new Set(keys)]
}

/* ═══════════════════════════ THE REGISTER (`§5.5.1`) ═══════════════════════ */

/** Build the ten rows. Every drive is the REAL assertion its row's property states. */
function buildRegister(): RegisterRow[] {
  /** A refusal's three readings, shared so the terms stay exactly what `§5.5.1` declares. */
  async function assertRefusedWrite(fx: StoreFixture, drive: Drive['run'], where: string): Promise<void> {
    const before = await fx.bytes()
    const beforeMtime = await fx.mtime()
    const preRecord = JSON.stringify(fx.store.get())
    const callsBefore = fx.calls().length
    await drive()
    assertClosedRefusal(receiptOf(fx.store), `${where} — the receipt`)
    expect(JSON.stringify(fx.store.get()), `${where} — the record did NOT advance (the PRE-WRITE record is answered, §2.1 item 5 step 1)`).toBe(preRecord)
    expect(fx.calls().length, `${where} — NO filesystem call on a refusal (§3.3 item 4): ${fx.calls().slice(callsBefore).join(', ')}`).toBe(callsBefore)
    expect(await fx.bytes(), `${where} — the file's bytes did NOT move`).toBe(before)
    expect(await fx.mtime(), `${where} — the file was not replaced (mtime unmoved)`).toBe(beforeMtime)
  }

  const rows: RegisterRow[] = [
    /* ── ROW 1 · P-T4-TP-1 · S-T4-WGATE-1 · 12 = 4 × 3 ─────────────────── */
    {
      id: 'P-T4-TP-1', type: 'P-TP', strategyId: 'S-T4-WGATE-1', term: 12,
      property: 'THE GATED WRITE IS REFUSED WHOLESALE — while CLOSED a tier-4 write does not commit, does not persist, does not advance the record, and answers the declared refusal as a VALUE; NON-VACUITY: the SAME write while OPEN commits and lands',
      drives: [
        {
          label: 'set({token}) · CLOSED ⇒ refused, no fs, no advance',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); await assertRefusedWrite(fx, () => { fx.store.set({ token: 'NOPE' }) }, 'set({token}) CLOSED') },
        },
        {
          label: 'set({token}) · OPEN ⇒ committed and landed (the non-vacuity term)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const before = await fx.bytes()
            fx.store.set({ token: 'YES' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            expect(fx.store.get().token).toBe('YES')
            expect(await fx.bytes()).not.toBe(before)
            expect(await fx.bytes()).toContain('YES')
          },
        },
        {
          label: 'set({token}) · the TRANSIENT BOOT WINDOW (OPEN at the call, CLOSED after the flip) ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ token: 'WINDOW' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'any'), 'the flip closes the store (§2.5 item 4)').toBeNull()
            const callsBefore = fx.calls().length
            fx.store.set({ token: 'AFTER' })
            assertClosedRefusal(receiptOf(fx.store), 'post-flip write')
            expect(fx.calls().length).toBe(callsBefore)
          },
        },
        {
          label: 'set(four-member patch) · CLOSED ⇒ refused, no fs, no advance',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); await assertRefusedWrite(fx, () => { fx.store.set({ token: 'T', groups: ['code'], disable: ['read'], maxJournalLength: 7 }) }, 'set(four-member) CLOSED') },
        },
        {
          label: 'set(four-member patch) · OPEN ⇒ committed and landed',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            fx.store.set({ token: 'T', groups: ['code'], disable: ['read'], maxJournalLength: 7 })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            const live = fx.store.get()
            expect(live.token).toBe('T')
            expect(live.maxJournalLength).toBe(7)
            expect(String(await fx.bytes())).toContain('"maxJournalLength": 7')
          },
        },
        {
          label: 'set(four-member patch) · the TRANSIENT BOOT WINDOW ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ groups: ['code'] })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            setTier4Open(false)
            fx.store.set({ groups: ['graph'] })
            assertClosedRefusal(receiptOf(fx.store), 'window patch · post-flip')
          },
        },
        {
          label: 'writeEntry(name, value) · CLOSED ⇒ refused, no fs, nothing written',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const before = await fx.bytes()
            const callsBefore = fx.calls().length
            const answer = writeEntryOf(fx.store, 'alpha', { n: 1 })
            assertClosedRefusal(answer, 'writeEntry CLOSED')
            expect(readEntryOf(fx.store, 'alpha'), 'nothing was written (§2.1 item 5 step 1)').toBeNull()
            expect(fx.calls().length).toBe(callsBefore)
            expect(await fx.bytes()).toBe(before)
          },
        },
        {
          label: 'writeEntry(name, value) · OPEN ⇒ committed; the entry is live AND in the file',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const answer = writeEntryOf(fx.store, 'alpha', { n: 1 })
            expect(answer).toEqual({ status: 'committed' })
            expect(readEntryOf(fx.store, 'alpha')).toEqual({ name: 'alpha', value: { n: 1 } })
            expect(String(await fx.bytes()), 'the file carries the entry (§2.2 item 2)').toContain('alpha')
          },
        },
        {
          label: 'writeEntry(name, value) · the TRANSIENT BOOT WINDOW ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'boot', 9)).toEqual({ status: 'committed' })
            setTier4Open(false)
            const callsBefore = fx.calls().length
            assertClosedRefusal(writeEntryOf(fx.store, 'boot', 10), 'window writeEntry · post-flip')
            expect(readEntryOf(fx.store, 'boot'), 'the PRE-CALL value of that name is answered (2), not the refused write').toEqual({ name: 'boot', value: 9 })
            expect(fx.calls().length).toBe(callsBefore)
          },
        },
        {
          label: 'the whole-record patch path (a patch the landed admission refuses) · CLOSED ⇒ the GATE refusal precedes the admission',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            await assertRefusedWrite(fx, () => { fx.store.set({ token: 12 as never }) }, 'whole-record patch CLOSED')
          },
        },
        {
          label: 'the whole-record patch path · OPEN ⇒ the LANDED admission refusal (`write-failed`) is what answers',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const answer = fx.store.set({ token: 12 as never })
            expect(receiptOf(fx.store), 'the landed admission refusal, NOT the gate refusal (§2.1 item 5 step 3)').toEqual({ status: 'refused', reason: 'write-failed' })
            expect(answer).toBeTruthy()
          },
        },
        {
          label: 'the gate consult is AHEAD of the admission and BESIDE `persist()` — a CLOSED refusal of a patch the admission would ALSO refuse answers `tier4-closed`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            fx.store.set({ token: 12 as never })
            expect(receiptOf(fx.store), 'the gate consult runs FIRST (§2.1 item 5 step 1 — a consult after the admission FAILS)').toEqual({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
          },
        },
      ],
    },

    /* ── ROW 2 · P-T4-TP-2 · S-T4-RGATE-1 · 10 = 6 + 1 + 3 ─────────────── */
    {
      id: 'P-T4-TP-2', type: 'P-TP', strategyId: 'S-T4-RGATE-1', term: 10,
      property: 'THE GATED READ IS REFUSED AS A VALUE — while CLOSED every tier read (get · lastWriteReceipt · readEntry, and the boot-ingestion read) answers the tier PRE-CALL value, detached and cycle-safe, and NEVER throws; the refusal is legible on the CHANNEL, never in the returned value. NON-VACUITY: the same read while OPEN answers the live value',
      drives: [
        {
          label: 'get() · CLOSED ⇒ PRE-CALL record, detached, no throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const pre = JSON.stringify(SEEDED)
            const read = fx.store.get()
            expect(JSON.stringify(read)).toBe(pre)
            expect(JSON.stringify(read), 'the refusal is NOT in the value (§2.4 item 6)').not.toContain(TIER4_CLOSED)
            read.token = 'MUTATED'
            expect(fx.store.get().token, 'the copy is DETACHED (§3.3 item 6)').toBe('SEED')
          },
        },
        {
          label: 'get() · OPEN ⇒ the live value',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(fx.store.get().token).toBe('SEED')
          },
        },
        {
          label: 'get() · the TRANSIENT BOOT WINDOW ⇒ the live value inside the window',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            expect(fx.store.get().token).toBe('SEED')
            setTier4Open(false)
            expect(fx.store.get().token, 'no carve-out: the value is the tier PRE-CALL record').toBe('SEED')
          },
        },
        {
          label: 'lastWriteReceipt() · CLOSED ⇒ the PRE-CALL receipt, detached (no carve-out, §2.3 G-2)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'k', 1)).toEqual({ status: 'committed' })
            setTier4Open(false)
            const pre = receiptOf(fx.store)
            expect(pre, 'the PRE-CALL receipt is answered, not the gate refusal (§2.4 item 6)').toEqual({ status: 'committed' })
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'k2', 2)).toEqual({ status: 'committed' })
            setTier4Open(false)
            expect(receiptOf(fx.store), 'the receipt did not advance while CLOSED').toEqual({ status: 'committed' })
          },
        },
        {
          label: 'lastWriteReceipt() · OPEN ⇒ the live receipt',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(receiptOf(fx.store)).toBeNull()
            fx.store.set({ token: 'A' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
          },
        },
        {
          label: 'lastWriteReceipt() · the TRANSIENT BOOT WINDOW ⇒ one side of the pair, never a mixture',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ token: 'A' })
            const open = receiptOf(fx.store)
            setTier4Open(false)
            const closed = receiptOf(fx.store)
            expect([JSON.stringify(open), JSON.stringify(closed)].includes(JSON.stringify({ status: 'committed' }))).toBe(true)
            expect(JSON.stringify(closed), 'NO half-moved pair is legible (§2.5 item 6)').not.toContain('mcp-')
          },
        },
        {
          label: 'THE BOOT-INGESTION READ — the read at the declared boot turn answers the ingested record (a CLOSED boot read is the FAILING arm `§5.5.1` names)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            const bootSrc = sourceOrEmpty(MAIN_SRC)
            const bootReadIndex = bootSrc.search(/securityStore\.get\(\)/)
            expect(bootReadIndex, 'the boot read exists at `main.ts` (§2.5 item 5 `F-3`)').toBeGreaterThan(-1)
            const beforeBoot = bootSrc.slice(0, bootReadIndex)
            expect(/new SecurityGate\(/.test(beforeBoot), 'THE BOOT ORDER: the store is constructed (and its OPEN boot value declared) BEFORE the gate exists (`§0A` item 4 / `D-19`)').toBe(false)
            expect(/const\s+persisted\s*=\s*securityStore\.get\(\)/.test(bootSrc), 'the boot-ingestion read is a PLAIN read — no try/catch exception (`§2.5` item 5 `F-3`)').toBe(true)
            setTier4Open(true)
            expect(fx.store.get().token, 'the boot read is INSIDE the declared OPEN window and succeeds without exception').toBe('SEED')
          },
        },
        {
          label: 'the carrier cell: `read` is PRESENT and is the closed refusal on a CLOSED read (§2.4 item 7)',
          run: () => {
            const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(census, `the GET response record carries the additive read member beside exclusion (§5.1 item 4) — measured members: [${census.join(', ')}]`).toContain('read')
            expect(census).toContain('exclusion')
          },
        },
        {
          label: 'the carrier cell: `read` ABSENT ⇒ FAILS (`PAR-8` — absence is the OUTSIDE value)',
          run: () => {
            const census = carrierMemberCensus('() => ({ ...securityStore.get(), exclusion: mcp.gate.exclusionState() })')
            expect(census.includes('read'), 'CONTROL: the census detector FIRES on the pre-repair member set').toBe(false)
            const live = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(live.includes('read'), `the live handler member set must carry read: [${live.join(', ')}]`).toBe(true)
          },
        },
        {
          label: 'the carrier cell: the MESSAGE substituted for the STATE ⇒ FAILS (`PAR-9` — a message is not a state)',
          run: () => {
            const bad = /exclusion:\s*(TIER4_CLOSED_MESSAGE|EXCLUSION_CLOSED_MESSAGE)/
            expect(bad.test('exclusion: TIER4_CLOSED_MESSAGE'), 'CONTROL: the substitution detector FIRES on a substituted state').toBe(true)
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(bad.test(handler), 'the live handler never substitutes a MESSAGE for the `exclusion` state').toBe(false)
          },
        },
      ],
    },

    /* ── ROW 3 · P-T4-IM-1 · S-T4-PAIR-1 · 12 = 2 × 2 × 3 ──────────────── */
    {
      id: 'P-T4-IM-1', type: 'P-IM', strategyId: 'S-T4-PAIR-1', term: 12,
      property: 'THE TWO SIDES NEVER DISAGREE — at every instant the store\'s functions and the MCP enforcement path read the SAME ONE value: CLOSED ⇒ a tier-4 write is refused AND the MCP endpoints answer the declared receipt; OPEN ⇒ the store commits AND the MCP endpoints answer normally; no half-moved pair is ever legible',
      drives: [
        {
          label: 'the store side · the CLOSED half (a write is refused)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'p', 1), 'pair · closed') },
        },
        {
          label: 'the store side · the OPEN half (a write commits)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'p', 1)).toEqual({ status: 'committed' }) },
        },
        {
          label: 'the store side · the TRANSIENT WINDOW (the store reads ONE side, never a mixture)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const a = writeEntryOf(fx.store, 'p', 1)
            setTier4Open(false)
            const b = writeEntryOf(fx.store, 'p', 2)
            expect([JSON.stringify(a), JSON.stringify(b)]).toEqual([JSON.stringify({ status: 'committed' }), JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })])
          },
        },
        {
          label: 'the MCP side · the CLOSED half (the endpoints answer the declared receipt — `G-3`, landed)',
          run: () => {
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(mcp).toContain(`export const EXCLUSION_CLOSED = '${EXCLUSION_CLOSED}'`)
            expect(/exclusionAllowsWork\(gate\(\)\.exclusionState\(\)\)/.test(mcp), 'the invocation turn reads the LIVE reader, not a snapshot (`§2.2` item 2(a), S1)').toBe(true)
          },
        },
        {
          label: 'the MCP side · the OPEN half (the same predicate answers normally)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            expect(gate.exclusionState(), 'the ONE value, read off the one record (`security.ts:202`)').toBe(STATE_MCP_ENABLED)
            const open = gate.withExclusion(STATE_MCP_DISABLED)
            expect(open.exclusionState()).toBe(STATE_MCP_DISABLED)
          },
        },
        {
          label: 'the MCP side · the TRANSIENT WINDOW (the transition moves BOTH axes together)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const moved = gate.withExclusion(STATE_MCP_DISABLED)
            expect(moved.exclusion, 'the derived pair moves as ONE (`§2.1` item 2, S1)').toEqual({ mcpEnabled: false, tier4Open: true })
            expect(gate.exclusion, 'the receiver is unchanged (the pure-constructor form)').toEqual({ mcpEnabled: true, tier4Open: false })
          },
        },
        {
          label: 'ONE live value · the store and the MCP side read the SAME boolean, closed',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(false)
            const storeRefused = (writeEntryOf(fx.store, 'x', 1) as { reason?: string }).reason === TIER4_CLOSED
            const mcpRefuses = fx.store.get() !== undefined && !tier4Reader()
            expect(storeRefused && mcpRefuses, 'the two sides read the SAME one value — never two homes').toBe(true)
          },
        },
        {
          label: 'ONE live value · the same reading, open',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            const storeCommitted = JSON.stringify(writeEntryOf(fx.store, 'x', 1)) === JSON.stringify({ status: 'committed' })
            expect(storeCommitted && tier4Reader()).toBe(true)
          },
        },
        {
          label: 'ONE live value · a flipped pair is never legible in halves (the reader is re-read per call)',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            const first = JSON.stringify(writeEntryOf(fx.store, 'x', 1))
            setTier4Open(false)
            const second = JSON.stringify(writeEntryOf(fx.store, 'x', 2))
            expect(first).toBe(JSON.stringify({ status: 'committed' }))
            expect(second).toBe(JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
          },
        },
        {
          label: 'the PAIR TABLE · `{MCP-ENABLED, TIER-4-CLOSED}` is the CLOSED half (`exclusionAllowsWork` refuses work)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            expect(gate.exclusion).toEqual({ mcpEnabled: true, tier4Open: false })
          },
        },
        {
          label: 'the PAIR TABLE · `{MCP-DISABLED, TIER-4-OPEN}` is the OPEN half',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const flipped = gate.withExclusion(STATE_MCP_DISABLED)
            expect(flipped.exclusion).toEqual({ mcpEnabled: false, tier4Open: true })
          },
        },
        {
          label: 'the PAIR TABLE · the ILLEGAL pair is unreachable through the ONE writer (`withExclusion` is the only move)',
          run: () => {
            const src = sourceOrEmpty(SECURITY_STORE_SRC)
            void src
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const illegal = gate.withExclusion('bogus' as never)
            expect(illegal.exclusionState(), 'a `T-4` outside value answers the UNCHANGED gate — no illegal pair is minted').toBe(STATE_MCP_ENABLED)
          },
        },
      ],
    },

    /* ── ROW 4 · P-T4-IM-2 · S-T4-STATE-1 · 8 = 4 + 2 + 2 ──────────────── */
    {
      id: 'P-T4-IM-2', type: 'P-IM', strategyId: 'S-T4-STATE-1', term: 8,
      property: 'THE BOOLEAN IS ONE VALUE WITH ONE WRITER, READABLE REGARDLESS OF GATING — one home, one writer, no reader routes through a store read, so a gated store cannot blank the operator\'s reader',
      drives: [
        {
          label: 'reader 1 · the store\'s functions read the ONE value at their own turn (off the STATIC HOLDER, read once per call)',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'never'), 'the holder is consulted and the tier answers CLOSED').toBeNull()
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'never', 1)).toEqual({ status: 'committed' })
          },
        },
        {
          label: 'reader 2 · the MCP invocation turn reads the LIVE gate (never a captured snapshot)',
          run: () => {
            expect(/exclusionTurn\(\(\) => this\._gate\)/.test(sourceOrEmpty(MCP_SERVER_SRC)), 'the turn takes the gate\'s READER, not a gate (`§2.2` item 2(a))').toBe(true)
          },
        },
        {
          label: 'reader 3 · the operator\'s carrier reads the boolean INDEPENDENTLY of any store read (off the STATIC HOLDER)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(handler.length, 'the GET handler exists').toBeGreaterThan(0)
            expect(/securityStore\.get\(\)/.test(handler), 'the boolean is NOT routed through a store read (`§2.4` item 7 — the deadlock\'s dissolution)').toBe(false)
            expect(/tier4OpenState\(\)/.test(handler), 'the carrier reads the ONE boolean off the STATIC HOLDER (`§0A` item 1, the `A-1` ruling — the `F-1` captured-instance class is closed structurally)').toBe(true)
          },
        },
        {
          label: 'reader 4 · the boot\'s ingestion does not read the gate at all (the boot is inside the declared OPEN state)',
          run: () => {
            const boot = sourceOrEmpty(MAIN_SRC)
            const bootRead = boot.search(/securityStore\.get\(\)/)
            expect(bootRead, 'the boot read exists').toBeGreaterThan(-1)
            expect(/gate\.exclusionState\(\)|SecurityGate\s*\(/.test(boot.slice(0, bootRead)), 'no gate is consulted BEFORE the boot-ingestion read (`§0A` item 4)').toBe(false)
          },
        },
        {
          label: 'a second WRITER · the ONE home is the DECLARED leaf module and the ONE writer is the transition (drive RE-GRAINED at `KB-1`)',
          run: () => {
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted the SUPERSEDED clause) — the as-filed second half required ZERO
             * `withExclusion(` occurrences in `mcp-server.ts` + `main.ts` while `FS-T4-12` required
             * EXACTLY `1` in `mcp-server.ts` (the LANDED transition site `applyExclusion`, `§2.5`
             * item 2's ONE production call, which `§2.3` `G-3` cites as landed): the two rows were
             * mutually unsatisfiable. THE AMENDED CLAUSE (`§0A` item 1, the `A-1` ruling): the
             * boolean's home is the STATIC HOLDER of the ONE main-side leaf `src/main/tier4-state.ts`,
             * and its ONE writer is the TRANSITION, whose only production site is that same
             * `applyExclusion`. So the drive now counts SITES, on the amended terms. */
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, item (b): the detector is
             * MODULE-SCOPE ANCHORED). The as-filed form was
             * `/^\s*(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m` — its leading `\s*`
             * let it fire on ANY INDENTED line, i.e. on four UNRELATED FUNCTION LOCALS that
             * happen to bind a boolean (`main.ts`'s `let settingsCorrupt = false` · `let corrupt
             * = false` · `let admissible = true`, and `security-store.ts`'s `let loaded = false`),
             * so `main.ts`/`security-store.ts` were reported as holding a SECOND HOME for the one
             * boolean while holding none. The term's subject is a **MODULE-LEVEL** mutable
             * boolean, so the detector is now anchored to MODULE SCOPE — a column-0 declaration —
             * and the indented class is driven as a NEGATIVE control beside it. */
            const moduleLevelAssignment = /^(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m
            expect(moduleLevelAssignment.test('let storeOpen = true;'), 'CONTROL: the holder detector FIRES on a MODULE-LEVEL mutable boolean (column 0)').toBe(true)
            expect(moduleLevelAssignment.test('  let settingsCorrupt = false'), 'CONTROL (negative): and it does NOT fire on a FUNCTION LOCAL (`main.ts`:127/136/142, `security-store.ts`:169 — the four unrelated `let … = true|false` bindings the as-filed form misfired on)').toBe(false)
            /* ── RE-GRAINED `2026-10-11` (GATE 4's REPAIR CONTRACT, the row-4 re-grain — the four
             * evasions gate 4 PROVED at the bytes must now FAIL, and the AS-FILED form above stays
             * VISIBLE beside them, `RCA-8(d)`):
             *   (a) a TYPED module-level declaration — `let tier4Open: boolean = true`: the as-filed
             *       regex demands `= true|false` IMMEDIATELY after the name, so a type annotation
             *       walked straight through it;
             *   (b) a module-level RECORD home — `const tier4State = { open: true }`;
             *   (c) a second home in a module the detector DOES NOT READ — the as-filed form tested
             *       exactly three hard-coded files, so every other `src/**` module was unread;
             *   (d) an ALIASED writer call — `import { setTier4OpenState as setOpen }` · `setOpen(true)`
             *       · `const w = setTier4OpenState; w(true)`.
             *  THE FOUR FUNCTION-LOCAL DECLARATIONS the predecessor already controlled for must STILL
             *  NOT fire, and the leaf ALONE must fire. */
            const moduleLevelTypedBoolean = /^(?:let|var)\s+[\w$]+\s*(?::\s*boolean)?\s*=\s*(?:true|false)\s*;?\s*$/m
            const moduleLevelRecordHome = /^(?:const|let|var)\s+[\w$]+\s*(?::[^=]+)?=\s*\{[^}]*\b(?:open|closed|openState|tier4[\w$]*)\s*:\s*(?:true|false)\b/m
            const homeDetector = (src: string): boolean => moduleLevelTypedBoolean.test(src) || moduleLevelRecordHome.test(src)
            expect(moduleLevelTypedBoolean.test('let tier4Open: boolean = true'), 'CONTROL (a): a TYPED module-level declaration FIRES').toBe(true)
            expect(moduleLevelAssignment.test('let tier4Open: boolean = true'), 'CONTROL (a): and the AS-FILED form did NOT — this is the evasion the re-grain closes').toBe(false)
            expect(moduleLevelRecordHome.test('const tier4State = { open: true }'), 'CONTROL (b): a module-level RECORD home FIRES').toBe(true)
            expect(moduleLevelRecordHome.test('const nodeFs: FsSurface = { readFileSync, existsSync }'), 'CONTROL (b, negative): a module-level record that carries NO boolean member does NOT fire').toBe(false)
            /* (c) THE SCAN SCOPE — the detector must read the WHOLE `src/**` tree: */
            const sourceFiles = listSourceFiles(join(REPO_ROOT, 'src'))
            expect(sourceFiles.length, 'CONTROL (c): the declared scope is the WHOLE TypeScript tree under `src/`, not three hard-coded modules').toBeGreaterThan(20)
            expect(sourceFiles.some((p) => p.endsWith(join('renderer', 'secure-panels.ts'))), 'CONTROL (c): a module the as-filed three-file list did NOT read is INSIDE the read set').toBe(true)
            expect(homeDetector(codeOnly('let tier4Open: boolean = true')), 'CONTROL (c): a second home in a module the as-filed detector never read (e.g. `src/renderer/some-other-home.ts`) FIRES').toBe(true)
            const homes = sourceFiles.filter((p) => homeDetector(codeOnly(sourceOrEmpty(p))))
            expect(homes, `NO second home ANYWHERE in \`src/**\` — measured [${homes.map((p) => p.replace(REPO_ROOT, '')).join(', ')}]`).toEqual([TIER4_STATE_SRC])
            for (const local of ['  let settingsCorrupt = false', '  let corrupt = false', '  let admissible: boolean = true', '  let loaded = false']) {
              expect(homeDetector(local), `NEGATIVE CONTROL: the function local \`${local.trim()}\` is NOT a module-level home`).toBe(false)
            }
            /* (d) THE ALIASED WRITER — the census counts the DIRECT call sites, the import ALIASES
             * and the VALUE ALIASES, so an aliased write cannot leave the subject: */
            const writerSitesTotal = (src: string): number => {
              const code = codeOnly(src)
              const direct = (code.match(/setTier4OpenState\s*\(/g) ?? []).length
              const importAliases = [...code.matchAll(/setTier4OpenState\s+as\s+([\w$]+)/g)].map((m) => m[1])
              const valueAliases = [...code.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*setTier4OpenState\b/g)].map((m) => m[1])
              let total = direct + importAliases.length + valueAliases.length
              for (const alias of [...importAliases, ...valueAliases]) {
                total += (code.match(new RegExp(`(?<![.\\w$])${alias}\\s*\\(`, 'g')) ?? []).length
              }
              return total
            }
            expect(writerSitesTotal("import { setTier4OpenState as setOpen } from './tier4-state.js'\nsetOpen(true)\n"), 'CONTROL (d): an ALIASED IMPORT call site FIRES').toBeGreaterThan(1)
            expect(writerSitesTotal('const w = setTier4OpenState\nw(true)\n'), 'CONTROL (d): an ALIASED VALUE call site FIRES').toBeGreaterThan(1)
            const leaf = sourceOrEmpty(TIER4_STATE_SRC)
            expect(homeDetector(leaf), 'the ONE declared home — `src/main/tier4-state.ts` — DOES hold the module-level mutable boolean (`§0A` item 1)').toBe(true)
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            for (const [label, src] of [['mcp-server.ts', mcp], ['main.ts', sourceOrEmpty(MAIN_SRC)], ['security-store.ts', sourceOrEmpty(SECURITY_STORE_SRC)]] as Array<[string, string]>) {
              expect(homeDetector(codeOnly(src)), `${label} holds NO module-level mutable home for the boolean — the home is the ONE leaf, never a second holder`).toBe(false)
            }
            /* THE SITE DETECTOR READS CODE, NEVER PROSE (`2026-10-11`, the same class as item
             * (b)'s scope anchoring): the as-filed counter matched raw source, so the store's
             * own DOC COMMENT naming the leaf's two names (`§2.5` item 1's *"the store CONSULTS
             * the holder; it never writes it"*) counted as a WRITE SITE. The subject is a call,
             * so comments are stripped before counting, and a commented mention is driven as a
             * NEGATIVE control. */
            /* ⟶ RE-POINTED `2026-10-11` to the SCANNER (`codeOnly`): the as-filed local stripper was
             * a REGEX whose `/*` opener could be found inside a PROSE glob (`src/**`) in a line
             * comment, which then swallowed the code beneath it — a stripper that eats code makes a
             * `0` reading meaningless. The subject and the bite are unchanged; the instrument is
             * now sound. */
            const withoutComments = codeOnly
            const writer = /setTier4OpenState\s*\(/g
            const sitesIn = (src: string): number => (withoutComments(src).match(writer) ?? []).length
            expect(sitesIn('setTier4OpenState(true)'), 'CONTROL: the writer-sites detector FIRES on a call').toBe(1)
            expect(sitesIn('// the transition calls setTier4OpenState(...) here\n'), 'CONTROL (negative): and a COMMENTED mention is not a write site — the detector reads code, never prose').toBe(0)
            expect(writerSitesTotal(mcp), '`mcp-server.ts` holds the transition\'s ONE write of the holder — the DIRECT call site, with NO import alias and NO value alias (`D`\'s aliased-writer evasion is what the widened census closes)').toBe(1)
            expect(sitesIn(mcp), 'and the as-filed direct-call reading agrees: one call site').toBe(1)
            expect(writerSitesTotal(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own, aliased or direct (`F-11`: main supplies STATE, never takes the DECISION)').toBe(0)
            expect(writerSitesTotal(sourceOrEmpty(SECURITY_STORE_SRC)), 'the store CONSULTS the holder; it never writes it (`§2.5` item 1)').toBe(0)
            /* ── `2026-10-11` (the gate-4 repair contract, the audit's `I-4`'s second half — "the site
             * counter is ARGUMENT-BLIND"): the ONE site's ARGUMENT must be the TRANSITION'S OWN
             * INPUT (`state === 'mcp-disabled'`), never a constant — a counter that cannot see what
             * the site writes cannot tell the transition's write from a bare `setTier4OpenState(true)`.
             * The detector is driven both ways. */
            const writerArgument = /setTier4OpenState\s*\(\s*([^)]*)\)/.exec(codeOnly(mcp))?.[1] ?? ''
            expect(writerArgument, 'the ONE writer site passes an argument').not.toBe('')
            expect(/^state\s*===\s*'mcp-disabled'$/.test(writerArgument), `the site writes the TRANSITION'S OWN INPUT — measured argument: \`${writerArgument}\``).toBe(true)
            expect(/^(?:true|false)$/.test('true'), 'CONTROL: the constant-argument detector FIRES on a bare \`true\`').toBe(true)
            expect(/^(?:true|false)$/.test(writerArgument), 'and the live site is NOT a bare constant').toBe(false)
            const withExclusionSites = (source: string): number => (withoutComments(source).match(/withExclusion\s*\(/g) ?? []).length
            expect(withExclusionSites('const gate = other.withExclusion(next)'), 'CONTROL: the detector FIRES on a foreign site').toBe(1)
            expect(withExclusionSites(mcp), '`mcp-server.ts` holds the ONE landed transition site (`applyExclusion`) — the row `FS-T4-12` also counts, so the two rows now AGREE (`KB-1`)').toBe(1)
            expect(withExclusionSites(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own').toBe(0)
          },
        },
        {
          label: 'a second writer · a second gate\'s `withExclusion` must NOT observe the first (one live home)',
          run: () => {
            const first = new SecurityGate({ token: null, enabled: [] })
            const second = new SecurityGate({ token: null, enabled: [] })
            const moved = first.withExclusion(STATE_MCP_DISABLED)
            expect(moved.exclusionState()).toBe(STATE_MCP_DISABLED)
            expect(second.exclusionState(), 'a gate constructed independently never observes another\'s transition').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'readable-regardless-of-gating · a CLOSED-state OPERATOR read still succeeds (`§2.6` item 2)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(/tier4OpenState\(\)/.test(handler), 'the operator\'s read is off the STATIC HOLDER, so a gated store cannot blank it (`§0A` item 1)').toBe(true)
            expect(/securityStore\.get\(\)/.test(handler)).toBe(false)
          },
        },
        {
          label: 'readable-regardless-of-gating · CLOSED: the STORE read is refused while the OPERATOR read is not',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            assertClosedRefusal(writeEntryOf(fx.store, 'z', 1), 'store side, closed')
            const carried = carrierRecord(STATE_MCP_DISABLED, null)
            expect(carried.exclusion, 'the operator still reads the STATE').toBe(STATE_MCP_DISABLED)
            expect(carried.read, 'and the refusal is legible BESIDE it').toBeNull()
          },
        },
      ],
    },

    /* ── ROW 5 · P-T4-TP-3 · S-T4-VOCAB-1 · 14 = 8 + 6 ─────────────────── */
    {
      id: 'P-T4-TP-3', type: 'P-TP', strategyId: 'S-T4-VOCAB-1', term: 14,
      property: 'EVERY REFUSAL IS A VALUE FROM THE CLOSED VOCABULARY — exactly two reason tokens and no third; the two FORMS are closed at status/reason with `message` additive and present only on `tier4-closed`; the message names the CAUSE (the MCP is open) and the REMEDY (disable MCP) and is server-authored; `exclusion-closed`\'s own domain is untouched; neither token is a store-union member; nothing throws',
      drives: [
        {
          label: '(1) a CLOSED-state write · CLOSED ⇒ the closed value, never a throw',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'v', 1), 'vocab (1) closed') },
        },
        {
          label: '(1) a CLOSED-state write · OPEN ⇒ no gate refusal at all',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1)).toEqual({ status: 'committed' }) },
        },
        {
          label: '(2) a non-representable value · CLOSED ⇒ the gate token (the consult precedes the admission)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'v', 1n), 'vocab (2) closed') },
        },
        {
          label: '(2) a non-representable value · OPEN ⇒ the LANDED `write-failed` form (two tokens, no third)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1n)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: '(3) a hostile patch · CLOSED ⇒ the PRE-WRITE record as a VALUE, never a throw (drive RE-GRAINED at `KB-2`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const hostile = new Proxy({}, { get: () => { throw new Error('hostile get') }, ownKeys: () => { throw new Error('hostile keys') } })
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted the SUPERSEDED clause). The as-filed assertion called
             * `assertClosedRefusal(fx.store.set(hostile))`, requiring `set()` to ANSWER the closed
             * refusal while CLOSED — contradicting its OWN label, `M-5` and `§2.1` item 5 step 1
             * ("the answer is the PRE-WRITE record (for `set`) or the closed refusal VALUE (for
             * `writeEntry`)"). THE AMENDED CLAUSE, quoted: "the answer is the **PRE-WRITE** record
             * (for `set`) or the closed refusal VALUE (for `writeEntry`)" — and `§2.1` item 3's
             * table: "the record now live (... the **PRE-WRITE** record on any refusal)". So the
             * drive asserts the AMENDED answer, and keeps the refusal's legibility on the RECEIPT
             * — which is where `§2.1` item 5 step 1 puts it: `lastReceipt = { status:'refused',
             * reason:'tier4-closed', message: TIER4_CLOSED_MESSAGE }`. */
            const returned = fx.store.set(hostile)
            expect(returned, '`set()` answers the PRE-WRITE record as a VALUE — the hostile patch changes nothing about that answer').toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
            assertClosedRefusal(receiptOf(fx.store), 'vocab (3) closed · the receipt carries the closed refusal')
          },
        },
        {
          label: '(3) a hostile patch · OPEN ⇒ the LANDED refused form, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(() => fx.store.set(new Proxy({}, { get: () => { throw new Error('hostile get') } }) as never)).not.toThrow()
            expect(receiptOf(fx.store)).toEqual({ status: 'refused', reason: 'write-failed' })
          },
        },
        {
          label: '(4) an out-of-domain patch · CLOSED ⇒ the gate token',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); fx.store.set(null as never); assertClosedRefusal(receiptOf(fx.store), 'vocab (4) closed') },
        },
        {
          label: '(4) an out-of-domain patch · OPEN ⇒ the LANDED refused form',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(() => fx.store.set(null as never)).not.toThrow(); expect(receiptOf(fx.store)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'vocabulary cell: NOT A THROW — no declared member throws in any state',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            const arms: Array<() => unknown> = [
              () => fx.store.get(), () => fx.store.set({}), () => receiptOf(fx.store),
              () => readEntryOf(fx.store, 'x'), () => writeEntryOf(fx.store, 'x', 1),
            ]
            for (const state of [true, false]) {
              setTier4Open(state)
              for (const arm of arms) expect(arm, `no member throws (state open=${String(state)})`).not.toThrow()
            }
          },
        },
        {
          label: 'vocabulary cell: the token is spelled VERBATIM `tier4-closed` (one token, lowercase, hyphenated)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { reason?: unknown }
            expect(answer.reason).toBe('tier4-closed')
            expect(TIER4_CLOSED).toBe('tier4-closed')
            expect(sourceOrEmpty(MCP_SERVER_SRC), 'its HOME is beside `EXCLUSION_CLOSED` (`§2.4` item 1)').toContain("'tier4-closed'")
          },
        },
        {
          label: 'vocabulary cell: NO case variant and NO whitespace variant',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { reason?: unknown }
            expect(['tier4-closed']).toContain(answer.reason)
            expect(String(answer.reason)).not.toMatch(/[A-Z\s]/)
          },
        },
        {
          label: 'vocabulary cell: the message is PRESENT, server-authored, and names CAUSE + REMEDY (`PAR-7`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { message?: unknown }
            expect(typeof answer.message).toBe('string')
            expect(String(answer.message).length).toBeGreaterThan(0)
            expect(String(answer.message).trim().length).toBeGreaterThan(0)
            expect(/MCP endpoint is open/i.test(String(answer.message)), 'the message names the CAUSE (the MCP is open)').toBe(true)
            expect(/disable MCP/i.test(String(answer.message)), 'the message names the REMEDY (disable MCP)').toBe(true)
            expect(sourceOrEmpty(MCP_SERVER_SRC), 'built in THIS module, never derived from caller input (`PAR-7`)').toContain('TIER4_CLOSED_MESSAGE')
            /* ── `2026-10-11` (the gate-4 repair contract, the audit's `I-5` — `PAR-7`'s declared
             * OUTSIDE set): a message CONSTANT that INTERPOLATES a stored value, an entry name or a
             * group set holds under the as-filed arm. The re-grained arm reads the DECLARATION SITE
             * of the module's own constant (comments stripped) and drives the interpolation detector
             * on fixture strings, so the OUTSIDE cell is measured rather than inferred. */
            const mcpCode = codeOnly(sourceOrEmpty(MCP_SERVER_SRC))
            const site = mcpCode.indexOf('TIER4_CLOSED_MESSAGE')
            const declSite = site === -1 ? '' : mcpCode.slice(site, site + 240)
            expect(declSite.length, 'the constant\'s declaration site is read').toBeGreaterThan(0)
            const interpolates = /\$\{|`[^`]*\$\{/
            expect(interpolates.test('Tier-4 blocked for ${value}'), 'CONTROL: the interpolation detector FIRES on an interpolated message').toBe(true)
            expect(interpolates.test(declSite), 'PAR-7 OUTSIDE: the constant interpolates NO stored value, NO entry name and NO group set').toBe(false)
            expect(/entries|read,\s*dispatch|patch\.|req\./.test(declSite), 'PAR-7 OUTSIDE: nor does it carry a tier-4 name, a group set or caller input').toBe(false)
            expect(answer.message, 'and the message the store MINTS is the declared constant VERBATIM, never a composed string').toBe(TIER4_CLOSED_MESSAGE)
          },
        },
        {
          label: 'vocabulary cell: `reason` is NEVER `null` and NEVER a third token (the module\'s own receipt bytes)',
          run: () => {
            const tokens = declaredReasonTokens()
            expect(tokens, `the closed token set read off the module's own receipt type: [${tokens.join(', ')}]`).toEqual(['write-failed'])
            expect(tokens).not.toContain('tier4-closed')
            expect(tokens, 'CONTROL: the token extractor FIRES on a mutated copy').not.toContain('nonexistent-token')
          },
        },
        {
          label: 'vocabulary cell: `exclusion-closed` STAYS an MCP-side channel token and neither token enters the store union',
          run: () => {
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(mcp).toContain(`'${EXCLUSION_CLOSED}'`)
            expect(sourceOrEmpty(STORE_CORE_SRC), '`tier4-closed` is NOT a member of the store\'s closed union (`D-GATE` clause (2))').not.toContain(`'${TIER4_CLOSED}'`)
            expect(sourceOrEmpty(STORE_CHANNELS_SRC), 'nor a `store-channels.ts` constant (`§2.4` item 2)').not.toContain(TIER4_CLOSED)
          },
        },
      ],
    },

    /* ── ROW 6 · P-T4-IM-3 · S-T4-PANE-1 · `10 = 4 + 6` (AS FILED) · `11 = 10 + 1` (OPERATIVE,
     * `2026-10-11`, the gate-6 `F-1` re-grain) ─────────────────────────────────────────────
     * `RCA-8(d)` — ANNOTATE BESIDE, NEVER OVER: the AS-FILED term `10 = 2 (the `MCP:` segment ·
     * the toggle's `data-state`) × 2 (states) = 4 + 6 (the six fabrications)` STANDS, its six
     * FABRICATION drives below are UNMOVED, and the operative `11` is the as-filed `10` PLUS the
     * ELEVENTH drive, which is the LAST entry of THIS row's own `drives` array (below the six
     * FABRICATION drives). **CAUSE, DATED: `F-1`, THE GATE-6 LIVE FINDING** (`docs/specs/
     * tier4-arbitrary-storage-live-battery.md` `§5` `F-1` / its `§3` `U-1`, verdict `FAIL`) — the
     * toggle node carried the AUTHORED envelope literal `props['data-state'] = 'mcp-enabled'`
     * before any carrier answer, so the register held `112/112` while the live first paint
     * falsified the property. **THE RELOCATION THE HARNESS'S OWN NOTE NAMED AS OWED IS HERE:** the
     * term is no longer composed into this row by `REGISTER_OWNED_TERMS` (that table now stands
     * EMPTY); it is an entry of this table, and declared here as `term: 11`. ——————————————— */
    {
      id: 'P-T4-IM-3', type: 'P-IM', strategyId: 'S-T4-PANE-1', term: 11,
      property: 'THE PANE FABRICATES NO OBSERVABLE — the `MCP:` segment and the toggle\'s `data-state`/affordance are fed by the BOOLEAN-sourced carrier member, never by a store-derived value, never by the pane\'s own prior state; the refusal segment is present IFF the carrier\'s `read` is non-null; no tier-4 value or name ever appears in a rendered surface',
      drives: [
        {
          label: 'the `MCP:` segment · OPEN (`exclusion: mcp-disabled`) ⇒ the boolean-sourced word',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(paneTextOf(panels, 'security-status')).toContain('· MCP: disabled')
          },
        },
        {
          label: 'the `MCP:` segment · CLOSED (`exclusion: mcp-enabled`) ⇒ the word, never blanked',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            expect(paneTextOf(panels, 'security-status')).toContain('· MCP: enabled')
          },
        },
        {
          label: 'the toggle\'s `data-state` · OPEN ⇒ `mcp-disabled`',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_DISABLED)
          },
        },
        {
          label: 'the toggle\'s `data-state` · CLOSED ⇒ `mcp-enabled`',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 1: fed by a store-derived value ⇒ FAILS (the refusal must ride `read`)',
          run: async () => {
            const bad = carrierRecord(STATE_MCP_ENABLED, STATE_MCP_ENABLED)
            expect(segmentDetector('· MCP: enabled', STATE_MCP_ENABLED), 'CONTROL: a non-null `read` with no refusal segment FAILS the detector').toBe(false)
            expect(bad.read).not.toBeNull()
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            expect(paneTextOf(panels, 'security-status'), 'a non-null `read` ⇒ the segment is PRESENT').toContain(REFUSAL_SEGMENT)
          },
        },
        {
          label: 'FABRICATION 2: fed by the pane\'s own PRIOR state ⇒ FAILS (a refresh must re-source, not re-use)',
          run: async () => {
            const first = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(panePropOf(first.panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_DISABLED)
            // the SAME pane instance, refreshed with the OTHER carrier value:
            const secondCarrier = carrierRecord(STATE_MCP_ENABLED, null)
            ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...secondCarrier }) } } }
            await first.panels.refresh()
            expect(panePropOf(first.panels, 'exclusion-toggle', 'data-state'), 'the pane re-sources from the CARRIER, never from its own prior value').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 3: stale after a gated store read ⇒ FAILS (`M-9` — the state word stays legible)',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            const text = paneTextOf(panels, 'security-status')
            expect(text).toContain('· MCP: enabled')
            expect(text).toContain(REFUSAL_SEGMENT)
          },
        },
        {
          label: 'FABRICATION 4: the AFFORDANCE WORD substituted for the state ⇒ FAILS (`PAR-11`)',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            const affordance = paneTextOf(panels, 'exclusion-toggle')
            expect(affordance, 'the affordance word is a CONTROL label (`§2.4` item 2, S1)').toMatch(/Disable MCP|Enable MCP/)
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state'), 'the state member carries the STATE token').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 5: a fabricated `disabled` while the state is OPEN ⇒ FAILS',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            const text = paneTextOf(panels, 'security-status')
            expect(fabricatedDisabledDetector(text, STATE_MCP_DISABLED), 'CONTROL: the detector FIRES on the declared rendering').toBe(true)
            expect(fabricatedDisabledDetector('· MCP: enabled', STATE_MCP_DISABLED), 'CONTROL: it does NOT fire on the fabricated rendering').toBe(false)
          },
        },
        {
          label: 'FABRICATION 6: the segment ABSENT while `read` is non-null ⇒ FAILS; and PRESENT while `read` is null ⇒ FAILS',
          run: async () => {
            const closed = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            expect(segmentDetector(paneTextOf(closed.panels, 'security-status'), { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })).toBe(true)
            const open = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(paneTextOf(open.panels, 'security-status'), '`read: null` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
          },
        },
        /* ── THE ELEVENTH DRIVE · `11 = 10 (as filed) + 1` · THE PRE-CARRIER FAMILY ────────────
         * ADDED `2026-10-11` (THE GATE-6 `F-1` EVASION RULING; `§5.5.1` row 6, re-grained
         * `10 → 11`). `RCA-8(d)`: the as-filed ten drives above STAND UNMOVED and this one is
         * added BESIDE them — no term is dropped, merged or re-worded.
         *
         * WHY THE ROW NEEDED IT, AT THE MEASUREMENT: NOT ONE of the six FABRICATION drives above
         * reads the PRE-CARRIER shape — `FABRICATION 2` drives the pane's own PRIOR state,
         * `FABRICATION 4` the affordance substitution — so this row's `broken === 0` stood while
         * the gate-6 live battery's `F-1` read, at first paint, `data-state: 'mcp-enabled'`: a word
         * the carrier had NEVER supplied, and the INVERSE of the carried state in the
         * MCP-DISABLED document. **THE PROPERTY WAS FALSIFIABLE AND WAS NOT DRIVEN — that is the
         * evaded term this drive closes.**
         *
         * THE DRIVE ITSELF (its body, its four states `S1`/`S2`/`S3`/`S4` and its four in-row
         * controls `CTL-0` · `CTL-P` · `CTL-N` · `NV`) is `preCarrierPaneDrives()` in
         * `tests/tier4-arbitrary-storage-register.ts`, where it was first carried as a
         * register-owned term; `REGISTER_OWNED_TERMS` there is now EMPTY, so the drive is THIS
         * row's own attempt — one more attempt of `P-T4-IM-3`, never a new row and never another
         * row's control — and the executor binds `drives.length (11)` directly to this row's
         * declared cell. ITS ASSERTIONS, NAMED SO THE TERM CANNOT BE READ AS A COUNT ONLY: at
         * EVERY one of the four PRE-CARRIER states (no carrier at all · a rejecting `get()` · the
         * synchronous first-paint shape · an answer omitting the `exclusion` member) the toggle
         * node's `props['data-state']` carries NEITHER `'mcp-enabled'` NOR `'mcp-disabled'` — the
         * prop is ABSENT — and NO affordance word (`Disable MCP|Enable MCP`) is painted; and its
         * controls prove the drive can FAIL (`CTL-0` fires on the as-filed authored literal, so
         * the term may not be satisfied by blanking the toggle forever). */
        ...preCarrierPaneDrives(),
      ],
    },

    /* ── ROW 7 · P-T4-SM-1 · S-T4-BOOT-1 · 10 = 4 + 3 + 3 ──────────────── */
    {
      id: 'P-T4-SM-1', type: 'P-SM', strategyId: 'S-T4-BOOT-1', term: 10,
      property: 'THE BOOT WINDOW IS THE DECLARED DEFAULT, NOT AN ILLEGAL PAIR — at boot the boolean is STORE-OPEN; the boot-ingestion read therefore succeeds without exception; the flip to store-closed lands BEFORE the MCP is enabled; `{MCP-DISABLED, TIER-4-CLOSED}` is reachable ONLY inside the window and is not a legal steady pair',
      drives: [
        {
          label: 'D-19 step 1 OPEN · the store is constructed with NO READER AT ALL, and the holder\'s declared initial value is STORE-OPEN (drive RE-GRAINED at the `A-1` ruling)',
          run: () => {
            /* The as-filed drive asserted the WITHDRAWN `§0A` item 1 price (`readerBeforeStore`). The
             * amended clause: the one boolean lives in a STATIC module-level holder with no
             * construction site, so there is no reader to construct and no boot re-ordering — the
             * LANDED window `store → boot read → gate → flip → mcp.start()` stands, and the store's
             * OPEN reading at the boot read comes from the holder's declared initial. */
            const idx = bootWindowIndexes(sourceOrEmpty(MAIN_SRC))
            expect(idx.storeIndex, 'the store construction exists at `main.ts`').toBeGreaterThan(-1)
            expect(idx.readerConstructed, 'NO reader is constructed and no `tier4Open` option is handed (`§0A` item 1, amended)').toBe(false)
            const leaf = sourceOrEmpty(TIER4_STATE_SRC)
            expect(leaf, 'the STATIC HOLDER is a main-side leaf (`src/main/tier4-state.ts`)').not.toBe('')
            expect(/export function tier4OpenState\s*\(/.test(leaf), 'its ONE reader is `tier4OpenState()`').toBe(true)
            expect(/export function setTier4OpenState\s*\(/.test(leaf), 'its ONE writer is `setTier4OpenState()` — the transition\'s').toBe(true)
            expect(/^\s*(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m.test(leaf), 'the holder is a STATIC module-level boolean reference').toBe(true)
            expect(/from\s+['"][^'"]*shared\//.test(leaf), 'the leaf imports NOTHING from `src/shared/**` (which would pull the renderer in)').toBe(false)
            const declaredInitial = /^\s*(?:let|var)\s+(\w+)\s*=\s*(true|false)\s*;?\s*$/m.exec(leaf)
            expect(declaredInitial?.[2], `the holder's DECLARED INITIAL VALUE is \`STORE-OPEN\` (\`true\`) — D-19's window; measured initializer: ${String(declaredInitial?.[2])}`).toBe('true')
          },
        },
        {
          label: 'D-19 step 2 INGEST · the boot read is a plain read inside the declared OPEN window',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const idx = bootWindowIndexes(src)
            expect(idx.bootRead).toBeGreaterThan(idx.storeIndex === -1 ? Number.MAX_SAFE_INTEGER : idx.storeIndex)
            expect(/const\s+persisted\s*=\s*securityStore\.get\(\)/.test(src), 'no try/catch exception wraps the boot read (`§2.5` item 5 `F-3`)').toBe(true)
          },
        },
        {
          label: 'D-19 step 3 CLOSE · the flip lands BEFORE the MCP is enabled',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const enable = src.search(/await\s+mcp\.start\(/)
            const flip = src.search(/mcp\.applyExclusion\(/)
            expect(enable, 'the enable site exists').toBeGreaterThan(-1)
            expect(flip, 'the flip site exists — a design in which the MCP enables while the state still says store-open FAILS').toBeGreaterThan(-1)
            expect(flip).toBeLessThan(enable)
          },
        },
        {
          label: 'D-19 step 4 ENABLE · the enable site exists after the flip (the four steps, in order)',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const store = src.search(/createSecurityStore\(/)
            const bootRead = src.search(/securityStore\.get\(\)/)
            const gate = src.search(/new SecurityGate\(/)
            expect(store).toBeGreaterThan(-1)
            expect(bootRead).toBeGreaterThan(store)
            expect(gate === -1 || gate > bootRead, 'store → boot read → gate (`main.ts:86-95`)').toBe(true)
          },
        },
        {
          label: 'PAIR 1 · `{MCP-ENABLED, TIER-4-CLOSED}` is legal (the steady closed pair)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: [] })
            expect(gate.exclusionState()).toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'PAIR 2 · `{MCP-DISABLED, TIER-4-OPEN}` is legal (the steady open pair)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: [] }).withExclusion(STATE_MCP_DISABLED)
            expect(gate.exclusion).toEqual({ mcpEnabled: false, tier4Open: true })
          },
        },
        {
          label: 'PAIR 3 RE-GRAINED (`2026-10-11`, the repair contract\'s D-v): THE TRANSIENT BOOT WINDOW, RE-READ AT THE LANDED READINGS — the holder says STORE-OPEN, the GATE sits at its `S1` boot terminal `mcp-enabled` with `await mcp.start()` still AHEAD, and the carrier\'s DERIVED `exclusion` reads `mcp-disabled`, consistent with the holder it consults — NEVER the as-filed `{MCP-DISABLED, TIER-4-CLOSED}` pair',
          run: () => {
            /* ── RE-GRAINED `2026-10-11` (`RCA-8(d)`: the AS-FILED terms below stay VISIBLE and
             * asserted; the re-grain ADDS the landed window's readings, with EACH SIDE'S READER
             * NAMED — which is what D-v requires and what the as-filed summary label
             * (`{MCP-DISABLED, TIER-4-CLOSED}`) got wrong: it is the HOLDER's window, and the
             * carrier paints the HOLDER, so the painted word is `mcp-disabled` while the
             * enforcement record — which does NOT paint the operator's line — sits at the gate's
             * `S1` boot terminal `mcp-enabled` and the MCP is NOT serving yet. */
            const src = sourceOrEmpty(MAIN_SRC)
            // THE AS-FILED TERMS, KEPT AWAKE:
            expect(src, 'the boot value is DECLARED STORE-OPEN (`§0A` item 4, now the HOLDER\'s declared initial: `§0A` item 1, amended)').toMatch(/createSecurityStore\(/)
            const gateAfterStore = (() => { const i = bootWindowIndexes(src); return i.gate === -1 || i.gate > i.storeIndex })()
            expect(gateAfterStore).toBe(true)
            expect(/^\s*(?:let|var)\s+\w+\s*=\s*true\s*;?\s*$/m.test(sourceOrEmpty(TIER4_STATE_SRC)), 'and the HOLDER\'s declared initial value is STORE-OPEN (`§0A` item 1, amended) — which is what makes the boot read legal without any exception').toBe(true)
            // THE RE-GRAINED WINDOW, READER BY READER:
            const holderAtBoot = /^\s*(?:let|var)\s+\w+\s*=\s*(true|false)\s*;?\s*$/m.exec(sourceOrEmpty(TIER4_STATE_SRC))?.[1] === 'true'
            expect(holderAtBoot, 'READER 1 (the store\'s functions — and, through the SAME holder, the operator\'s carrier): the HOLDER\'s declared initial is STORE-OPEN').toBe(true)
            const gateTerminal = new SecurityGate({ token: null, enabled: [] }).exclusionState()
            expect(gateTerminal, 'READER 2 (the MCP ENFORCEMENT path): the gate sits at its `S1` boot terminal `mcp-enabled` — the enforcement record is NOT the operator\'s line').toBe(STATE_MCP_ENABLED)
            const handler = getHandlerBody(src)
            expect(handler.length, 'the carrier handler exists').toBeGreaterThan(0)
            const carrierWordAtBoot = carrierExclusionAtBoot(handler, holderAtBoot)
            expect(carrierWordAtBoot, 'READER 3 (the operator\'s carrier): its DERIVED `exclusion` member reads `mcp-disabled` — CONSISTENT WITH THE HOLDER IT CONSULTS, and NOT with the gate\'s boot terminal').toBe(STATE_MCP_DISABLED)
            expect(carrierExclusionAtBoot(handler, false), 'CONTROL (the reading is LIVE, never a constant): the SAME expression answers `mcp-enabled` once the holder says CLOSED').toBe(STATE_MCP_ENABLED)
            const enable = src.search(/await\s+mcp\.start\(/)
            const flip = src.search(/mcp\.applyExclusion\(\s*'mcp-enabled'\s*\)/)
            expect(flip, 'the CLOSE site exists as the literal flip (`D-vii`\'s named site)').toBeGreaterThan(-1)
            expect(enable, 'the enable site exists').toBeGreaterThan(-1)
            expect(flip, 'and `await mcp.start()` is STILL AHEAD of the flip — inside the window the MCP is NOT serving').toBeLessThan(enable)
            expect(
              { holder: holderAtBoot ? STATE_MCP_DISABLED : STATE_MCP_ENABLED, enforcement: gateTerminal, carrier: carrierWordAtBoot },
              'THE LANDED WINDOW, stated as its own reading: holder STORE-OPEN ⇒ the carrier paints `mcp-disabled` while the enforcement record reads `mcp-enabled` and the MCP is not serving — this is the pair the window really shows, NOT the as-filed `{MCP-DISABLED, TIER-4-CLOSED}`',
            ).toEqual({ holder: STATE_MCP_DISABLED, enforcement: STATE_MCP_ENABLED, carrier: STATE_MCP_DISABLED })
            expect({ enforcement: gateTerminal, carrier: carrierWordAtBoot }, 'and the two sides are NEVER the same word inside the window — the transient pair is exactly this asymmetry').not.toEqual({ enforcement: STATE_MCP_ENABLED, carrier: STATE_MCP_ENABLED })
          },
        },
        {
          label: 'BOOT FAIL-STATE 1 · a MISSING file, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
            expect(fx.store.get().enabled).toEqual(FIRST_RUN_DEFAULT.enabled)
          },
        },
        {
          label: 'BOOT FAIL-STATE 2 · a CORRUPT file, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.rawSeed('{ not json at all')
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
          },
        },
        {
          label: 'BOOT FAIL-STATE 3 · a path that IS A DIRECTORY, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.makeDirAtPath()
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
          },
        },
      ],
    },

    /* ── ROW 8 · P-T4-TP-4 · S-T4-OPEN-1 · 16 = 4 × 2 + 8 ──────────────── */
    {
      /* ── THE TERM'S DATED MOVE (`2026-10-11`, GATE 4's REPAIR CONTRACT; `RCA-8(d)`: annotate
       * BESIDE the as-filed form). AS FILED: `16 = 4 (the four surface arms: the name-addressed
       * read · the name-addressed write · the boot treatment of unknown keys · the persisted
       * format's evolution) × 2 (states) = 8 + 8 (the eight value classes the write admission
       * REFUSES)`. OPERATIVE: `20 = 16 (the as-filed arithmetic, UNMOVED) + 4 (the four terms this
       * re-grain ADDS: the namespace seam · the `__proto__` key (D-ii) · the `-0` value (D-i) · an
       * out-of-ingestion-domain name surviving every write)`. The two CLOSED-state arms are
       * re-grained IN PLACE for D-ix (the reading becomes "no WRITE-class `fs` call"), so they move
       * no term. */
      id: 'P-T4-TP-4', type: 'P-TP', strategyId: 'S-T4-OPEN-1', term: 20,
      property: 'THE OPENED SHAPE IS TOTAL AND LOSSLESS AT BOOT, AND ADMISSION-CONTROLLED ON WRITE — the name-addressed surface answers for every name in its domain and refuses out-of-domain names as values; a top-level member outside the four declared names is INGESTED VERBATIM (never dropped) and survives every subsequent write; NO per-entry admission runs at boot; every WRITE runs the landed value-preservation admission, refusing the whole request with no filesystem call',
      drives: [
        {
          label: 'SURFACE ARM 1 · the name-addressed READ · CLOSED ⇒ the PRE-CALL value',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, entries: { a: 1 } }); setTier4Open(false)
            expect(readEntryOf(fx.store, 'a')).toEqual({ name: 'a', value: 1 })
          },
        },
        {
          label: 'SURFACE ARM 1 · the name-addressed READ · OPEN ⇒ the live value, detached',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            writeEntryOf(fx.store, 'a', { deep: { n: [1, 2] } })
            const read = readEntryOf(fx.store, 'a') as { name: string; value: { deep: { n: number[] } } }
            expect(read).toEqual({ name: 'a', value: { deep: { n: [1, 2] } } })
            read.value.deep.n.push(3)
            expect((readEntryOf(fx.store, 'a') as { value: { deep: { n: number[] } } }).value.deep.n, 'detached at EVERY depth (§2.2 item 6)').toEqual([1, 2])
          },
        },
        {
          label: 'SURFACE ARM 2 · the name-addressed WRITE · CLOSED ⇒ the gate refusal, with NO WRITE-class `fs` call (RE-GRAINED `2026-10-11`, the repair contract\'s D-ix: the one lazy boot-ingestion READ is the DECLARED turn)',
          run: async () => {
            const fx = await makeStoreFixture({ readLog: true }); await fx.seed(SEEDED); setTier4Open(false)
            const callsBefore = fx.calls().length
            assertClosedRefusal(writeEntryOf(fx.store, 'a', 1), 'arm 2 closed')
            const window = fx.calls().slice(callsBefore)
            expect(writeClassCalls(window), `NO WRITE-class \`fs\` call on a refusal (§3.3 item 4) — measured [${window.join(', ')}]`).toEqual([])
            expect(readClassCalls(window).length, 'and the refusal\'s window carries ONLY the DECLARED boot-ingestion read (the laziness D-ix names, never a defect)').toBeGreaterThan(0)
            expect(window.every((c) => READ_CLASS_CALL.test(c)), 'every call in a refusal\'s window is READ-class').toBe(true)
            // THE PRIMED CONTROL (D-ix): the SAME refusal on the SAME instance shows NO further call.
            const primedBefore = fx.calls().length
            assertClosedRefusal(writeEntryOf(fx.store, 'a', 2), 'arm 2 closed · primed')
            expect(fx.calls().slice(primedBefore), 'CONTROL: with the tier PRIMED (its ingestion turn already spent) a refusal makes NO further \`fs\` call at all').toEqual([])
          },
        },
        {
          label: 'SURFACE ARM 2 · the name-addressed WRITE · OPEN ⇒ committed and durable',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'a', 1)).toEqual({ status: 'committed' })
            expect(JSON.parse(String(await fx.bytes())).entries.a, 'the file carries the entry (reading (b))').toBe(1)
          },
        },
        {
          label: 'SURFACE ARM 3 · the boot treatment of unknown keys · CLOSED ⇒ a CLOSED store still cannot read them',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, thirdPartyBlob: { x: 1 } })
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'thirdPartyBlob'), 'the refused read answers the PRE-CALL value — which here EXISTS').toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
          },
        },
        {
          label: 'SURFACE ARM 3 · the boot treatment of unknown keys · OPEN ⇒ INGESTED VERBATIM, never dropped (`M-3`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, thirdPartyBlob: { x: 1 }, extra: 'keep' })
            setTier4Open(true)
            expect(readEntryOf(fx.store, 'thirdPartyBlob')).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
            expect(readEntryOf(fx.store, 'extra')).toEqual({ name: 'extra', value: 'keep' })
          },
        },
        {
          label: 'SURFACE ARM 4 · the persisted format\'s evolution · CLOSED ⇒ the file is untouched by a refused write, and the refusal\'s only `fs` reading is the DECLARED ingestion turn (RE-GRAINED `2026-10-11`, D-ix)',
          run: async () => {
            const fx = await makeStoreFixture({ readLog: true }); await fx.seed(SEEDED)
            const before = await fx.bytes()
            const callsBefore = fx.calls().length
            setTier4Open(false)
            writeEntryOf(fx.store, 'a', 1)
            expect(await fx.bytes()).toBe(before)
            expect(JSON.parse(String(before)).entries, '`entries` is ABSENT until the first successful write (§2.2 item 2(i))').toBeUndefined()
            const window = fx.calls().slice(callsBefore)
            expect(writeClassCalls(window), `NO WRITE-class \`fs\` call on a refusal: the refusal precedes the staging write (measured [${window.join(', ')}])`).toEqual([])
            expect(readClassCalls(window).length, 'the DECLARED boot-ingestion read (existsSync/readFileSync) is the ONE admitted call — named, not smuggled').toBeGreaterThan(0)
            const primedBefore = fx.calls().length
            fx.store.get()
            expect(fx.calls().slice(primedBefore), 'CONTROL: the primed instance reads nothing further (the ingestion turn is spent)').toEqual([])
          },
        },
        {
          label: 'SURFACE ARM 4 · the persisted format\'s evolution · OPEN ⇒ `{token, enabled, maxJournalLength, entries}` and NO `schemaVersion`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            writeEntryOf(fx.store, 'a', 1)
            const persisted = JSON.parse(String(await fx.bytes())) as Record<string, unknown>
            expect(Object.keys(persisted).sort()).toEqual(['enabled', 'entries', 'maxJournalLength', 'token'])
            expect(persisted.schemaVersion, 'NO `schemaVersion` member (§2.2 item 2(iv))').toBeUndefined()
          },
        },
        {
          label: 'VALUE CLASS 1 refused: `BigInt`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1n)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 2 refused: `Symbol`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', Symbol('s'))).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 3 refused: a function',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', () => 1)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 4 refused: `Map`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Map())).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 5 refused: `Set`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Set([1]))).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 6 refused: `Date`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Date())).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 7 refused: a CYCLIC value (and a JSON round trip is NOT the check)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const cyclic: Record<string, unknown> = {}
            cyclic.self = cyclic
            expect(writeEntryOf(fx.store, 'v', cyclic)).toEqual({ status: 'refused', reason: 'write-failed' })
            expect(() => JSON.stringify(cyclic), 'CONTROL: the round trip THROWS on this fixture (`A1` answer (2) — it must not be the implementation)').toThrow()
          },
        },
        {
          label: 'VALUE CLASS 8 refused: `Infinity` / `NaN`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'v', Number.POSITIVE_INFINITY)).toEqual({ status: 'refused', reason: 'write-failed' })
            expect(writeEntryOf(fx.store, 'v', Number.NaN)).toEqual({ status: 'refused', reason: 'write-failed' })
          },
        },
        /* ── THE FOUR TERMS THIS ROW GAINS `2026-10-11` (GATE 4's REPAIR CONTRACT, the row-8
         * re-grain — `RCA-8(d)`: the as-filed term cell `16 = 4 × 2 + 8` stays VISIBLE and its
         * arithmetic UNMOVED; the operative term is `20 = 16 + 4 (the four terms below)`, so the
         * declared total moves `108 → 112` with its terms printed in the register report). */
        /* ⟶ ANNOTATED BESIDE `2026-10-11` (THE GATE-6 `F-1` RE-GRAIN — `RCA-8(d)`: the note above
         * STANDS and this one is added BESIDE it): the register's total moves ONCE MORE, at ROW 6
         * and not here — `112 → 113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8` — because row 6
         * (`P-T4-IM-3`) gained the PRE-CARRIER family its own eleventh drive counts, forced by the
         * gate-6 live finding `F-1`. THIS ROW-8 CELL IS UNMOVED BY THAT MOVE: its declared term
         * stays `20 = 16 (as filed: 4 arms × 2 states, + the eight refused value classes) + 4 (the
         * four terms below)`, and this row's four drives below are the ones that carry them. */
        {
          label: 'TERM ADDED (the row-8 re-grain, term 16 → 20): THE NAMESPACE SEAM — `writeEntry(\'token\', …)` and `writeEntry(\'entries\', …)` leave the file\'s top-level `token`/`enabled`/`maxJournalLength` UNMOVED and round-trip under their OWN names',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'token', 'NOT-A-TOKEN')).toEqual({ status: 'committed' })
            expect(writeEntryOf(fx.store, 'entries', 'NOT-A-MAP')).toEqual({ status: 'committed' })
            expect(readEntryOf(fx.store, 'token'), 'the arbitrary namespace answers under its OWN name').toEqual({ name: 'token', value: 'NOT-A-TOKEN' })
            expect(readEntryOf(fx.store, 'entries')).toEqual({ name: 'entries', value: 'NOT-A-MAP' })
            const persisted = JSON.parse(String(await fx.bytes())) as Record<string, unknown>
            expect(persisted.token, 'the TOP-LEVEL `token` is UNMOVED by the same-named arbitrary write (`§2.2` item 1: a SEPARATE namespace)').toBe('SEED')
            expect(persisted.enabled).toEqual(['read', 'dispatch'])
            expect(persisted.maxJournalLength).toBe(120)
            const map = persisted.entries as Record<string, unknown>
            expect(map.token, 'and the arbitrary value round-trips under its own name, never into a landed member').toBe('NOT-A-TOKEN')
            expect(map.entries).toBe('NOT-A-MAP')
            expect(Object.keys(map).sort(), 'the map carries exactly the two arbitrary names — no landed member was routed into it').toEqual(['entries', 'token'])
          },
        },
        {
          label: 'TERM ADDED (D-ii): a `__proto__` KEY is preserved VERBATIM — at boot (top level AND inside `entries`), on `writeEntry`, in the persisted bytes, and after a RE-CONSTRUCTED store on the same path (a plain foreign name is the non-vacuity control)',
          run: async () => {
            const fx = await makeStoreFixture()
            await fx.seed({ ...SEEDED, ['__proto__']: { x: 1 }, ordinaryName: 'keep' })
            const seededBytes = String(await fx.bytes())
            expect(seededBytes, 'CONTROL: the fixture really carries an OWN `__proto__` key at top level').toContain('"__proto__"')
            setTier4Open(true)
            expect(Object.prototype.hasOwnProperty.call(JSON.parse(seededBytes), '__proto__'), 'CONTROL: `JSON.parse` mints it as an OWN data property — so the INGESTION is what loses it').toBe(true)
            expect(readEntryOf(fx.store, 'ordinaryName'), 'CONTROL (non-vacuity): a PLAIN foreign name ingests and reads').toEqual({ name: 'ordinaryName', value: 'keep' })
            expect(readEntryOf(fx.store, '__proto__'), 'the boot\'s top-level `__proto__` is INGESTED VERBATIM under its own name (`§2.2` item 4 arms 3/4)').toEqual({ name: '__proto__', value: { x: 1 } })
            expect(writeEntryOf(fx.store, '__proto__', { y: 2 }), 'and the WRITE is admitted').toEqual({ status: 'committed' })
            expect(readEntryOf(fx.store, '__proto__'), 'readable in-process, under its own name').toEqual({ name: '__proto__', value: { y: 2 } })
            const persisted = JSON.parse(String(await fx.bytes())) as { entries: Record<string, unknown> }
            expect(Object.prototype.hasOwnProperty.call(persisted.entries, '__proto__'), 'present in the persisted BYTES as an OWN key of `entries`').toBe(true)
            expect(Object.getOwnPropertyDescriptor(persisted.entries, '__proto__')?.value, 'and carrying the admitted value').toEqual({ y: 2 })
            const second = await makeStoreOnPath(fx.path)
            expect(readEntryOf(second.store, '__proto__'), 'and STILL THERE after a RE-CONSTRUCTED store on the same path — never lost to the `Object.prototype` setter').toEqual({ name: '__proto__', value: { y: 2 } })
            expect(readEntryOf(second.store, 'ordinaryName'), 'CONTROL (non-vacuity): the plain foreign name survives the same re-construction').toEqual({ name: 'ordinaryName', value: 'keep' })
            const fx2 = await makeStoreFixture()
            await fx2.seed({ ...SEEDED, entries: { ['__proto__']: 5 } })
            expect(readEntryOf(fx2.store, '__proto__'), 'an `entries.__proto__` member at boot is ingested member by member VERBATIM (`§2.2` item 4 arm 4)').toEqual({ name: '__proto__', value: 5 })
          },
        },
        {
          label: 'TERM ADDED (D-i): `-0` — a number that is NOT JSON-round-trip-identical — is REFUSED whole-request in the landed form with NO filesystem call, while `0` still commits (control)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(Number.isFinite(-0), 'CONTROL: `-0` IS a finite number, so the landed finiteness arm admits it — which is why the clause needs its own identity ground').toBe(true)
            expect(Object.is(JSON.parse(JSON.stringify(-0)), -0), 'CONTROL: the JSON round trip is NOT identity for `-0` (it answers `0`) — the clause\'s own ground').toBe(false)
            expect(Object.is(JSON.parse(JSON.stringify(0)), 0), 'CONTROL: and it IS identity for `0`').toBe(true)
            const before = await fx.bytes()
            const callsBefore = fx.calls().length
            expect(writeEntryOf(fx.store, 'negzero', -0), '`-0` REFUSES the whole request in the LANDED refused form (`§2.2` item 5; `PAR-4`\'s OUTSIDE list gains `-0`)').toEqual({ status: 'refused', reason: 'write-failed' })
            expect(fx.calls().length, 'no filesystem call').toBe(callsBefore)
            expect(await fx.bytes(), 'the file did not move').toBe(before)
            expect(readEntryOf(fx.store, 'negzero'), 'nothing was written — a refusal is NEVER a delete').toBeNull()
            expect(writeEntryOf(fx.store, 'nested', { a: [-0] }), 'and the identity binds at EVERY DEPTH the predicate walks').toEqual({ status: 'refused', reason: 'write-failed' })
            const zeroCalls = fx.calls().length
            expect(writeEntryOf(fx.store, 'zero', 0), 'CONTROL: `0` STILL COMMITS').toEqual({ status: 'committed' })
            expect(fx.calls().length, 'CONTROL: and the committed write really LANDS').toBeGreaterThan(zeroCalls)
            expect(Object.is((readEntryOf(fx.store, 'zero') as { value: number }).value, 0)).toBe(true)
            expect(JSON.parse(String(await fx.bytes())).entries.zero, 'CONTROL: `0` is in the file').toBe(0)
            expect(writeEntryOf(fx.store, 'finite', -1.5), 'CONTROL: an ordinary negative finite number stays IN the domain').toEqual({ status: 'committed' })
          },
        },
        {
          label: 'TERM ADDED (the row-8 re-grain): an out-of-INGESTION-domain name is INGESTED VERBATIM at boot, stays UNREACHABLE by `readEntry`, and SURVIVES every subsequent write',
          run: async () => {
            const fx = await makeStoreFixture()
            const oddName = 'odd\u0000name'
            await fx.seed({ ...SEEDED, [oddName]: { kept: true } })
            const seededBytes = String(await fx.bytes())
            expect(seededBytes, 'CONTROL: the fixture carries the odd name verbatim (JSON escapes its control character)').toContain('\\u0000')
            setTier4Open(true)
            expect(readEntryOf(fx.store, oddName), 'the boot does not adjudicate a name it merely read — while the READ surface REFUSES it (`PAR-3`, `§2.2` item 4 arm 3)').toBeNull()
            expect(writeEntryOf(fx.store, 'mine', 1), 'a first successful arbitrary write').toEqual({ status: 'committed' })
            const persisted = JSON.parse(String(await fx.bytes())) as { entries: Record<string, unknown> }
            expect(Object.prototype.hasOwnProperty.call(persisted.entries, oddName), 'and the odd name SURVIVES that write, still under its own name').toBe(true)
            expect(persisted.entries[oddName]).toEqual({ kept: true })
            expect(Object.keys(persisted.entries).sort(), 'the survivors are exactly the odd name and the new one').toEqual([oddName, 'mine'].sort())
            expect(writeEntryOf(fx.store, oddName, 1), 'a WRITE under that name answers the landed refused form and writes nothing').toEqual({ status: 'refused', reason: 'write-failed' })
            expect((JSON.parse(String(await fx.bytes())) as { entries: Record<string, unknown> }).entries[oddName], 'nothing under that name moved').toEqual({ kept: true })
          },
        },
      ],
    },

    /* ── ROW 9 · P-T4-IM-4 · S-T4-HOME-1 · 8 ───────────────────────────── */
    {
      id: 'P-T4-IM-4', type: 'P-IM', strategyId: 'S-T4-HOME-1', term: 8,
      property: 'THE TOKEN\'S HOME AND EVERY UNMOVED SET ARE HELD — `tier4-closed` is a CHANNEL token declared beside `EXCLUSION_CLOSED`; it is NOT a constant in `store-channels.ts`, NOT in `src/shared/**`, NOT a member of the store\'s closed 16-member union; no `GraphNodeFlag` widening, no frozen-byte move, no fourth tier-4/file distinction',
      drives: [
        {
          label: 'the token\'s home ✓ `src/main/mcp-server.ts` — DECLARED AND EXPORTED (RE-GRAINED `2026-10-11`, the repair contract\'s row-9 re-grain: a COMMENT-ONLY mention must NOT satisfy the row, so this instrument now AGREES with the non-register `P-T4-TOKEN-HOME` row)',
          run: () => {
            /* ── AS FILED (kept visible, `RCA-8(d)`): `expect(mcp).toContain("'tier4-closed'")` — a
             * plain substring search over the whole file, which a COMMENT satisfies. The
             * re-grained form requires the token to be DECLARED AND EXPORTED, reads its own
             * initializer off the comment-stripped CODE, and proves the difference on a FIXTURE
             * string. */
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(mcp, 'AS FILED: the constant lands beside the landed pair (`§2.4` item 1)').toContain("'tier4-closed'")
            const declaredExport = /export\s+const\s+TIER4_CLOSED\s*(?::[^=]+)?=\s*'([^']*)'/
            expect(codeOnly(mcp), 'THE RE-GRAINED FORM: the token is DECLARED AND EXPORTED in `mcp-server.ts`').toMatch(declaredExport)
            expect(declaredExport.exec(codeOnly(mcp))?.[1], 'and its own initializer reads the verbatim token').toBe(TIER4_CLOSED)
            const commentOnly = "// `§2.4`: the token is 'tier4-closed', homed beside EXCLUSION_CLOSED\nexport const TIER4_CLOSED = 'exclusion-closed'\n"
            expect(commentOnly.includes("'tier4-closed'"), 'CONTROL: the AS-FILED `toContain` instrument PASSES a COMMENT-ONLY mention — the evasion this re-grain closes').toBe(true)
            expect(declaredExport.exec(codeOnly(commentOnly))?.[1], 'CONTROL: and the re-grained instrument reads the COMMENT-ONLY fixture\'s DECLARED VALUE — which is NOT the token, so the row FAILS where the as-filed form passed').toBe('exclusion-closed')
            expect(declaredExport.exec(codeOnly(commentOnly))?.[1], 'CONTROL: the declared-and-exported instrument therefore does NOT satisfy the row on a comment-only mention').not.toBe(TIER4_CLOSED)
            expect(/export\s+const\s+TIER4_CLOSED_MESSAGE\s*=/.test(codeOnly(mcp)), 'and the message constant is exported beside it (`§2.4` item 1)').toBe(true)
          },
        },
        {
          label: 'the token\'s home ✗ `store-channels.ts` (its constant census stays 3)',
          run: () => {
            const src = sourceOrEmpty(STORE_CHANNELS_SRC)
            expect(src).not.toContain(TIER4_CLOSED)
            const constants = [...src.matchAll(/^export const [A-Z_0-9]+/gm)].length
            expect(constants, `the constants census is 3: [${[...src.matchAll(/^export const ([A-Z_0-9]+)/gm)].map((m) => m[1]).join(', ')}]`).toBe(3)
          },
        },
        {
          label: 'the token\'s home ✗ `src/shared/**` (`src/shared/types.ts` stays byte-identical)',
          run: () => {
            expect(sourceOrEmpty(SHARED_TYPES_SRC)).not.toContain(TIER4_CLOSED)
            expect(sha256Of(SHARED_TYPES_SRC), 'the shared type is UNMOVED (`§1.3` item 5)').toBe('29af4efaf16a5cadf1ac22b63afda063495ce63ec95b56f1f6e397da1d8189c6')
          },
        },
        {
          label: 'the store\'s refusal union reads 16 members (no security token added)',
          run: () => {
            const src = sourceOrEmpty(STORE_CORE_SRC)
            const union = /export type GraphRefusalReason\s*=([\s\S]*?)\n\n/.exec(src)?.[1] ?? ''
            const members = [...union.matchAll(/'([^']+)'/g)].map((m) => m[1])
            expect(members.length, `the union is 16: [${members.join(', ')}]`).toBe(16)
            expect(members).not.toContain(TIER4_CLOSED)
            expect(members).not.toContain(EXCLUSION_CLOSED)
          },
        },
        {
          label: 'the two frozen field-7 pins are UNMOVED at FULL 64-HEX DIGEST (`0664c52f…` / `5c0c1a97…`) — RE-GRAINED `2026-10-11` (D-x; the audit\'s instrument defect `I-6`), with the as-filed `slice(0, 8)` proxy kept awake as the CONTROL it is',
          run: () => {
            /* ── AS FILED (kept visible, `RCA-8(d)`): `expect(sha256Of(path)).toContain(pin.slice(0, 8))`.
             * `§2.7` item 1 pins a FILE HASH, so the comparison is the WHOLE 64-hex digest: a row
             * answering with an 8-hex prefix cannot distinguish a moved file from a moved file with
             * the same head (`I-6`). The re-grained form asserts the FULL digest and drives the PROXY
             * form as a control that must pass a digest it must not. */
            for (const [rel, pin] of Object.entries(MEASURED_FROZEN_PINS)) {
              const actual = sha256Of(join(REPO_ROOT, rel))
              expect(actual, `the as-filed PROXY (8 hex) still agrees — ${rel}`).toContain(pin.slice(0, 8))
              expect(`${pin.slice(0, 8)}${'0'.repeat(56)}`.includes(pin.slice(0, 8)), `CONTROL: the PROXY form PASSES a digest it must not (\`${pin.slice(0, 8)}…0000\`)`).toBe(true)
              expect(pin.length, `the pin of ${rel} is the FULL 64-hex digest`).toBe(64)
              expect(actual, `the frozen pin of ${rel} is UNMOVED, compared at FULL digest (§2.7 item 1; D-x)`).toBe(pin)
            }
          },
        },
        {
          label: '`GraphNodeFlag`\'s three-member domain is UNMOVED (no widening)',
          run: () => {
            const src = sourceOrEmpty(STORE_CORE_SRC)
            const domain = /export type GraphNodeFlag\s*=\s*([^\n]+)/.exec(src)?.[1] ?? ''
            expect(domain.replace(/\s/g, '')).toBe("'temp'|'mem'|'file'")
          },
        },
        {
          label: 'the constants census (3) and the measured `store-channels.ts` bytes are UNMOVED',
          run: () => {
            expect(sha256Of(STORE_CHANNELS_SRC), 'no new channel constant (`§2.4` item 2)').toBe('1444834a9c55589f57dab719a44bc01836329c7c94c2c5ed7ffd798ba5724f8d')
          },
        },
        {
          label: 'the preload\'s `security` member set is unchanged in COUNT (3) — the widening is a TYPE intersection, not a member add',
          run: () => {
            const src = sourceOrEmpty(PRELOAD_SRC)
            const interfaceBlock = /export interface ProvidentBridge[\s\S]*?\n\}\n/.exec(src)?.[0] ?? ''
            const block = /\n  security:\s*\{([\s\S]*?)\n  \}/.exec(interfaceBlock)?.[1] ?? ''
            const members = [...block.matchAll(/^\s{4}(\w+)\(/gm)].map((m) => m[1])
            expect(members, `the preload security members: [${members.join(', ')}]`).toEqual(['get', 'set', 'setExclusion'])
          },
        },
      ],
    },

    /* ── ROW 10 · P-T4-IM-5 · S-T4-CARRIER-1 · 8 = 4 + 4 ───────────────── */
    {
      id: 'P-T4-IM-5', type: 'P-IM', strategyId: 'S-T4-CARRIER-1', term: 8,
      property: 'THE CARRIER\'S HONESTY — on EVERY read, `read` is present (`null` iff the read was performed, the closed refusal otherwise) and `exclusion` carries the STATE token, never the message, never a tier-4 value; the widening is an INTERSECTION at the two declaration sites in lockstep, and `SecuritySettings` itself is unmoved',
      drives: [
        {
          label: 'the carrier\'s two members · OPEN ⇒ `exclusion` = the state token, `read` = `null`',
          run: () => {
            const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(census).toContain('exclusion')
            expect(census).toContain('read')
            const carrier = carrierRecord(STATE_MCP_DISABLED, null)
            expect(carrier.exclusion).toBe(STATE_MCP_DISABLED)
            expect(carrier.read).toBeNull()
          },
        },
        {
          label: 'the carrier\'s two members · CLOSED ⇒ `read` = the closed refusal (drive RE-GRAINED at `KB-3`)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted an UNSATISFIABLE instrument). The as-filed form read
             * `expect(handler, …).toBeGreaterThan(0)` where `handler = getHandlerBody(MAIN_SRC)` is a
             * `string`, so vitest answered "actual value must be number or bigint, received string"
             * for EVERY possible implementation — unconditionally unsatisfiable. THE AMENDED DRIVE
             * keeps the SAME bite on the handler's own bytes (`handler.length`) and adds the amended
             * clause's own term: the `read` member derives from the SAME ONE READING of the STATIC
             * HOLDER as `exclusion`. */
            expect(handler.length, 'the refusal rides the CHANNEL (`§2.4` item 7)').toBeGreaterThan(0)
            expect(/read\s*:/.test(handler), 'the `read` member is composed in the handler').toBe(true)
            /* ── `2026-10-11` (the gate-4 repair contract, `D-viii` — `§2.4` item 7's dated note
             * assigns THIS row the TWO-LEGGED witness; the audit's `S2-ADV-06`/`I-2`): LEG 1 is the
             * SITE CENSUS — `tier4OpenState(` appears EXACTLY ONCE in the handler body, comments
             * stripped, so the two additive members cannot carry two different states in one
             * response. The as-filed drive asserted only that the reader APPEARS (measured: twice,
             * at the local and again in the response record). */
            const handlerCode = codeOnly(handler)
            const holderConsults = handlerCode.match(/tier4OpenState\s*\(\s*\)/g) ?? []
            expect(holderConsults.length, `LEG 1 (the site census): EXACTLY ONE \`tier4OpenState()\` in the handler — measured ${holderConsults.length}`).toBe(1)
            expect((codeOnly('() => { /* tier4OpenState() */ return ({}) }').match(/tier4OpenState\s*\(\s*\)/g) ?? []).length, 'CONTROL (negative): a COMMENT-ONLY mention is not a consult').toBe(0)
            expect((codeOnly('() => { const a = tier4OpenState(); const b = tier4OpenState(); return ({}) }').match(/tier4OpenState\s*\(\s*\)/g) ?? []).length, 'CONTROL: the census FIRES on a two-consult body').toBe(2)
            expect(/tier4OpenState\(\)/.test(handler), 'and BOTH members derive from ONE reading of the STATIC HOLDER (`§0A` item 1, amended)').toBe(true)
          },
        },
        {
          label: 'the carrier\'s two members · the STATE member is never absent (`PAR-9`)',
          run: () => { expect(/exclusion\s*:\s*tier4OpenState\(\)\s*\?/.test(getHandlerBody(sourceOrEmpty(MAIN_SRC))), 'the state member is fed by the ONE STATIC HOLDER reading and never routes through the store read (`§0A` item 1, amended)').toBe(true) },
        },
        {
          label: 'the carrier\'s two members · neither is substituted for the other — RE-GRAINED `2026-10-11` (the repair contract\'s row-10 re-grain): the substitution control is driven against a FIXTURE STRING, and the row now FAILS on an unconditionally-`null` `read` and on a COMMENT-ONLY `tier4OpenState()` mention',
          run: () => {
            /* ── AS FILED (kept visible, `RCA-8(d)`): `stateFedByRefusal` — a substitution detector
             * — was applied to the LIVE HANDLER, where it could never leave its subject; it
             * asserted a property of the live bytes under the name of a control. THE RE-GRAINED
             * FORM drives the same detector against the FIXTURE STRING `'exclusion: read'`, and the
             * handler-side detectors read CODE (comments stripped), because gate 4 PROVED both
             * evasions at the bytes: a handler whose `read` is unconditionally `null`, and a
             * handler that only MENTIONS `tier4OpenState()` in a comment. */
            const liveHandler = codeOnly(getHandlerBody(sourceOrEmpty(MAIN_SRC)))
            /* THE MEMBER DETECTORS READ THE ANSWER LITERAL ONLY — the as-filed form read the whole
             * handler, where the LOCALS `const exclusion: ExclusionState = …` / `const read: …`
             * made the substitution detector fire on the handler unconditionally (so the "control"
             * could never leave its subject). Scoping it to the answer's own object literal is what
             * lets the SAME detector be driven both ways. */
            const liveAnswer = answerLiteralOf(liveHandler)
            expect(liveAnswer.length, 'the handler\'s answer literal exists').toBeGreaterThan(0)
            const stateFedByRefusal = /exclusion\s*:\s*(?:[^,{}]*\W)?read\b/
            expect(stateFedByRefusal.test('exclusion: read'), 'CONTROL: the substitution detector FIRES on the FIXTURE STRING `exclusion: read` — the subject it can actually leave').toBe(true)
            expect(stateFedByRefusal.test(liveAnswer), 'THE LIVE SUBJECT: the handler substitutes neither member for the other').toBe(false)
            const refusalFedByState = /read\s*:\s*exclusion\b/
            expect(refusalFedByState.test('read: exclusion'), 'CONTROL: the mirror detector FIRES on the fixture string').toBe(true)
            expect(refusalFedByState.test(liveAnswer), 'and the live handler never feeds `read` from the state').toBe(false)
            const unconditionalNull = /read\s*:\s*null\b/
            expect(unconditionalNull.test('() => ({ exclusion: x, read: null })'), 'CONTROL: the detector FIRES on an unconditionally-`null` `read`').toBe(true)
            expect(unconditionalNull.test(liveHandler), 'THE UNCONDITIONAL-`null` ARM: the live handler\'s `read` is CONDITIONAL — it is fed by the ONE holder reading (`§2.4` item 7)').toBe(false)
            const holderRead = /tier4OpenState\s*\(\s*\)/g
            const commentOnlyFixture = '() => { /* tier4OpenState() is read here, once per turn */ return ({}) }'
            expect((commentOnlyFixture.match(holderRead) ?? []).length, 'CONTROL: the un-stripped form counts a COMMENT-ONLY mention (which is exactly why the detectors strip)').toBe(1)
            expect((codeOnly(commentOnlyFixture).match(holderRead) ?? []).length, 'CONTROL (negative): the COMMENT-ONLY `tier4OpenState()` mention is NOT a reading').toBe(0)
            expect((liveHandler.match(holderRead) ?? []).length, 'THE COMMENT-ONLY ARM: the live handler carries the holder reading in CODE, not in prose').toBeGreaterThan(0)
          },
        },
        {
          label: 'OUTSIDE cell: the MESSAGE substituted for `exclusion` ⇒ FAILS (`PAR-9`)',
          run: () => { expect(/exclusion\s*:\s*TIER4_CLOSED_MESSAGE/.test('exclusion: TIER4_CLOSED_MESSAGE'), 'CONTROL: the detector FIRES').toBe(true) },
        },
        {
          label: 'OUTSIDE cell: `read` ABSENT on a read ⇒ FAILS (`PAR-8`)',
          run: () => {
            const members = carrierMemberCensus('() => ({ ...securityStore.get(), exclusion: mcp.gate.exclusionState() })')
            expect(members.includes('read'), 'CONTROL: the census detector FIRES on the absent member').toBe(false)
          },
        },
        {
          label: 'OUTSIDE cell: a HALF-WIDENED declaration site ⇒ FAILS (`PAR-10` — the two sites move together)',
          run: () => {
            const preload = sourceOrEmpty(PRELOAD_SRC)
            const panels = sourceOrEmpty(SECURE_PANELS_SRC)
            expect(/read\s*:\s*Tier4ClosedRefusal\s*\|\s*null/.test(preload), 'site 1 (`preload.ts`) carries the widened `read` member').toBe(true)
            expect(/read\s*:\s*Tier4ClosedRefusal\s*\|\s*null/.test(panels), 'site 2 (`secure-panels.ts`\'s `declare global`) carries it in LOCKSTEP').toBe(true)
            const halfWidened = 'get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE }>'
            expect(/read\s*:/.test(halfWidened), 'CONTROL: the half-widening detector FIRES on the unwidened site').toBe(false)
          },
        },
        {
          label: 'OUTSIDE cell: `SecuritySettings` ITSELF widened ⇒ DENIED (a COLLISION finding)',
          run: () => {
            const shared = sourceOrEmpty(SHARED_TYPES_SRC)
            const iface = /export interface SecuritySettings\s*\{[\s\S]*?\n\}/.exec(shared)?.[0] ?? ''
            expect(iface.length).toBeGreaterThan(0)
            expect(/read\s*:|entries\s*:|write\s*:/.test(iface), 'the shared type gains NO carrier member (§1.3 item 5)').toBe(false)
          },
        },
      ],
    },
  ]
  return rows
}

/** The repo root as a PLAIN PATH (`REPO` from the register module is a URL; `join`
 *  needs a path). */
const REPO_ROOT = fileURLToPath(new URL('./../', import.meta.url))

/* ═══════════════════════════ THE SUITE ═════════════════════════════════════ */
let registerRows: RegisterRow[] = []
let execReport: Awaited<ReturnType<typeof executeRegister>> | null = null

beforeAll(async () => {
  installShim()
  baseDir = await mkdtemp(join(tmpdir(), 's2-tier4-red-'))
  storeModule = await loadStoreModule()
  await loadTier4StateModule()
  registerRows = buildRegister()
})
afterAll(async () => {
  if (baseDir !== '') await rm(baseDir, { recursive: true, force: true })
})
beforeEach(() => { setTier4Open(true) })

describe('S2 §2.1 THE STORE\'S DECLARED SURFACE (census, options, member order)', () => {
  it('P-T4-CENSUS: `Object.keys(store)` is EXACTLY the declared FIVE, in the declared order', async () => {
    const fx = await makeStoreFixture()
    const keys = Object.keys(fx.store)
    expect(keys, `5 = 3 (landed: get · lastWriteReceipt · set) + 2 (new: readEntry · writeEntry) — measured [${keys.join(', ')}]`).toEqual([...DECLARED_SURFACE_MEMBERS])
    expect(keys.length).toBe(LANDED_SURFACE_MEMBERS.length + 2)
  })

  it('P-T4-OPTIONS RE-GRAINED (`kick-back resolution`, outcome (a)): the option census is UNMOVED at `1 = 1 (path)` — the `1 → 2` movement is WITHDRAWN', async () => {
    /* ── RE-GRAINED `2026-10-11`. The as-filed row asserted the SUPERSEDED `1 → 2` clause
     * (`§2.1` item 2 / `§1.2` item 9 / `§5.1` item 4 / `§7b` row 3). THE AMENDED CLAUSE (`§0A`
     * item 1, the `A-1` ruling), quoted VERBATIM: "**`SecurityStoreOptions` IS UNMOVED AT
     * `{ path: string }`, AND THE TWO CLAUSES THAT MOVED IT ARE WITHDRAWN.** The as-filed
     * **`1 → 2` option-census clause** … and the **injected-thunk shape** … are **SUPERSEDED IN
     * EFFECT**: the operative census is **`1 = 1 (path)`**, UNMOVED and owed by no amendment." */
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    const iface = /export interface SecurityStoreOptions\s*\{[\s\S]*?\n\}/.exec(src)?.[0] ?? ''
    expect(iface, 'the options interface exists').not.toBe('')
    const declared = [...iface.matchAll(/^\s*(\w+)\??\s*:/gm)].map((m) => m[1])
    expect(declared, `the option census is UNMOVED at 1 = 1 (path) — measured [${declared.join(', ')}]`).toHaveLength(DECLARED_OPTION_CENSUS)
    expect(declared.length, 'the census is UNMOVED (`1 = 1 (path)`)').toBe(LANDED_OPTION_CENSUS)
    expect(declared).toEqual(['path'])
    expect(declared, 'the `A-1` reader is NOT an option — it is the STATIC HOLDER (`§0A` item 1, amended)').not.toContain('tier4Open')
    /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a)): the AS-FILED term
     * here was `/tier4Open/.test(src) === false` — *"and the withdrawn option leaves no
     * trace in the module's own bytes"* — and it CONTRADICTED the clause it rode with.
     * `§0A` item 1 / `§2.1` item 2's amendment REQUIRE `security-store.ts` to consult the
     * holder THROUGH the leaf's declared reader **`tier4OpenState()`**, whose identifier
     * CONTAINS the withdrawn option's token as a substring: no module that names the
     * reader can be token-free, so the two clauses could not both hold and the only
     * token-free bytes would need an UNDECLARED seam (a fragment-assembled key lookup, or
     * an alias invented in `mcp-server.ts` — both outside `§5.1` item 1's edit set).
     * THE RE-GRAINED TERM PINS WHAT THE CLAUSE ACTUALLY PINS — the OPTION CENSUS
     * (`1 = 1 (path)`: no injected option member) — and REQUIRES the reader's name
     * beneath it, so the bite survives: re-adding `tier4Open?: () => boolean` to the
     * interface reddens BOTH the census terms above and the member term here. */
    const optionMemberShaped = /(?:^|[\s{,(])tier4Open\s*\??\s*:/m
    expect(optionMemberShaped.test('  tier4Open?: () => boolean'), 'CONTROL — the option-member detector FIRES on the withdrawn declaration').toBe(true)
    expect(optionMemberShaped.test('  tier4OpenState(): boolean'), 'CONTROL (negative) — and it does NOT fire on the REQUIRED reader\'s own name, which is the substring that made the as-filed term unsatisfiable').toBe(false)
    expect(optionMemberShaped.test(src), 'the withdrawn OPTION MEMBER (`tier4Open: …`) is declared NOWHERE in the module — the census is `1 = 1 (path)`').toBe(false)
    expect(/tier4OpenState\(\)/.test(src), 'AND the store reads the ONE boolean through the leaf\'s DECLARED READER (`tier4OpenState()`, `§0A` item 1) — the token the withdrawn option shares is REQUIRED here, never banished').toBe(true)
  })

  it('P-T4-EXPORTS: the module\'s export census moves by NOTHING (the four landed names survive)', async () => {
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    for (const name of ['createSecurityStore', 'SecurityStoreOptions', 'SecurityStore', 'SecurityWriteReceipt']) {
      expect(src, `the landed export ${name} is not renamed or removed (§2.1 item 1)`).toMatch(new RegExp(`export (function|interface|type) ${name}\\b`))
    }
  })

  it('P-T4-TYPES: the two NEW declared types land and `SecurityWriteReceipt` stays byte-identical in shape', async () => {
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    expect(/export type Tier4Entry\s*=/.test(src), '`Tier4Entry = { name: string; value: unknown }` (§2.1 item 3)').toBe(true)
    expect(/export type Tier4WriteAnswer\s*=/.test(src), '`Tier4WriteAnswer` is the declared SUPERSET (§2.1 item 3)').toBe(true)
    expect(/export type SecurityWriteReceipt\s*=\s*\{\s*status:\s*'committed'\s*\}\s*\|\s*\{\s*status:\s*'refused';\s*reason:\s*'write-failed'\s*\}/.test(src.replace(/\s+/g, ' ')), '`SecurityWriteReceipt` ITSELF is NOT widened (§2.4 item 3)').toBe(true)
  })

  it('P-T4-TOKEN-HOME: `TIER4_CLOSED` and its message are declared in `mcp-server.ts`, exported', async () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    expect(/export const TIER4_CLOSED\s*=\s*'tier4-closed'/.test(src), 'the token, beside `EXCLUSION_CLOSED` (§2.4 item 1)').toBe(true)
    expect(/export const TIER4_CLOSED_MESSAGE\s*=/.test(src), 'its server-authored message, beside `EXCLUSION_CLOSED_MESSAGE`').toBe(true)
  })
})

describe('S2 §3.1 THE HAPPY STATES (M-1…M-11)', () => {
  it('M-1 the boot: the first-run default, `entries` empty and ABSENT from the file', async () => {
    const fx = await makeStoreFixture()
    expect(fx.store.get().token).toBeNull()
    expect(fx.store.get().enabled).toEqual(['read', 'dispatch'])
    expect(fx.store.get().maxJournalLength).toBeUndefined()
    expect(await fx.bytes(), 'the constructor writes NO file (`S3` §2.1 item 2)').toBeNull()
    expect(readEntryOf(fx.store, 'anything'), '`entries` is EMPTY').toBeNull()
  })

  it('M-2 the boot-ingestion read at the declared OPEN window succeeds without exception', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    let threw = false
    try { fx.store.get() } catch { threw = true }
    expect(threw, '`G-2` binds and PASSES at boot (`§2.5 item 5 F-3`) — no carve-out is needed').toBe(false)
    expect(fx.store.get().token).toBe('SEED')
  })

  it('M-3 a legacy file\'s foreign top-level keys are INGESTED VERBATIM and survive the next successful write', async () => {
    const fx = await makeStoreFixture()
    await fx.seed({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, thirdPartyBlob: { x: 1 }, extra: 'keep' })
    setTier4Open(true)
    expect(readEntryOf(fx.store, 'thirdPartyBlob')).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
    expect(readEntryOf(fx.store, 'extra')).toEqual({ name: 'extra', value: 'keep' })
    expect(writeEntryOf(fx.store, 'mine', 1)).toEqual({ status: 'committed' })
    const persisted = JSON.parse(String(await fx.bytes())) as Record<string, unknown>
    const flat = JSON.stringify(persisted)
    expect(flat, 'the foreign key survives the re-serialization (`§2.2` item 4 arms 3/6)').toContain('thirdPartyBlob')
    expect(flat).toContain('keep')
  })

  it('M-4 the CLOSED state: a tier read answers the PRE-CALL value, detached; a never-written name answers null', async () => {
    const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, entries: { a: { deep: 1 } } })
    setTier4Open(false)
    const read = readEntryOf(fx.store, 'a') as { name: string; value: { deep: number } }
    expect(read).toEqual({ name: 'a', value: { deep: 1 } })
    read.value.deep = 99
    expect((readEntryOf(fx.store, 'a') as { value: { deep: number } }).value.deep, 'the PRE-CALL value is DETACHED').toBe(1)
    expect(readEntryOf(fx.store, 'never-written')).toBeNull()
    expect(readEntryOf(fx.store, 'never-written'), '`null` never means "refused" (`PAR-5`)').not.toEqual({ status: 'refused' })
  })

  it('M-5 the CLOSED state: a write answers the VALUE, `set()` the PRE-WRITE record, the receipt the refusal', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const returned = fx.store.set({ token: 'NOPE' })
    expect(returned, '`set()` answers the PRE-WRITE record (§2.1 item 3)').toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
    assertClosedRefusal(receiptOf(fx.store), 'M-5 receipt')
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 1), 'M-5 writeEntry')
    expect(await fx.bytes(), 'no filesystem call, no record advance').toContain('SEED')
  })

  it('M-6 THE NON-VACUITY TERM: the OPEN state\'s write commits and lands', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const before = await fx.bytes()
    fx.store.set({ token: 'LANDED' })
    expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
    const after = await fx.bytes()
    expect(after).not.toBe(before)
    expect(after).toContain('LANDED')
  })

  it('M-7 the OPEN state: an admitted `writeEntry` commits; the entry is live AND durable; the read is detached', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'alpha', { n: 1 })).toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'alpha')).toEqual({ name: 'alpha', value: { n: 1 } })
    expect(JSON.parse(String(await fx.bytes())).entries.alpha).toEqual({ n: 1 })
  })

  it('M-8 the OPEN state: a name written twice answers the LAST admitted value, live == durable', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    writeEntryOf(fx.store, 'k', 1)
    writeEntryOf(fx.store, 'k', 2)
    expect(readEntryOf(fx.store, 'k')).toEqual({ name: 'k', value: 2 })
    expect(JSON.parse(String(await fx.bytes())).entries.k).toBe(2)
  })

  it('M-9 the operator\'s carrier: OPEN ⇒ `read: null`; CLOSED ⇒ the refusal BESIDE the state word', () => {
    expect(carrierRecord(STATE_MCP_DISABLED, null)).toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion: STATE_MCP_DISABLED, read: null })
    expect(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }).exclusion).toBe(STATE_MCP_ENABLED)
    const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
    expect(census, `the GET record gains ONE additive member (2 = 1 exclusion + 1 read) — measured [${census.join(', ')}]`).toContain('read')
    expect(DECLARED_CARRIER_MEMBERS.length).toBe(LANDED_CARRIER_MEMBERS.length + 1)
  })

  it('M-10 the RETURN transition then a write: REFUSED (the measured SC-D-07 shape closes)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    let gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
    setTier4Open(false) // the MCP is enabled ⇒ the store is closed
    const closedWrite = writeEntryOf(fx.store, 'ret', 1)
    assertClosedRefusal(closedWrite, 'M-10 · closed')
    gate = gate.withExclusion(STATE_MCP_DISABLED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'ret', 1), 'the operator returns ⇒ the write commits').toEqual({ status: 'committed' })
    setTier4Open(false)
    expect(writeEntryOf(fx.store, 'ret', 2), 'and the return to MCP-enabled closes it again').toEqual({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
    expect(gate.exclusionState()).toBe(STATE_MCP_DISABLED)
  })

  it('M-11 a self-transition and an outside-value payload are a no-op / refused as a value', () => {
    const gate = new SecurityGate({ token: null, enabled: [] })
    const self = gate.withExclusion(STATE_MCP_ENABLED)
    expect(self.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect((self as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.(), 'T-3: the epoch does not bump').toBe((gate as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.())
    const outside = gate.withExclusion('mcp-ENABLED' as never)
    expect(outside.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect(JSON.stringify(outside.exclusion), 'the boolean does not move').toBe(JSON.stringify({ mcpEnabled: true, tier4Open: false }))
  })
})

describe('S2 §3.2 THE FAIL-STATES (FS-T4-01…FS-T4-13)', () => {
  it('FS-T4-01 a write while CLOSED: the refusal VALUE; no commit, no persist, no advance, NO filesystem call', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const before = await fx.bytes()
    const mtimeBefore = await fx.mtime()
    const callsBefore = fx.calls().length
    assertClosedRefusal(receiptOf(fx.store) === null ? writeEntryOf(fx.store, 'a', 1) : writeEntryOf(fx.store, 'a', 1), 'FS-T4-01')
    expect(fx.calls().length, `the refusal touched NO file: [${fx.calls().slice(callsBefore).join(', ')}]`).toBe(callsBefore)
    expect(await fx.bytes()).toBe(before)
    expect(await fx.mtime()).toBe(mtimeBefore)
    // CTL-4 — the same detector MUST move on a COMMITTED write (non-vacuity):
    setTier4Open(true)
    const callsBeforeCommit = fx.calls().length
    fx.store.set({ token: 'MOVED' })
    expect(fx.calls().length, 'CONTROL: the filesystem-call detector FIRES on a committed write').toBeGreaterThan(callsBeforeCommit)
  })

  it('FS-T4-02 a read while CLOSED: the PRE-CALL value, detached; the refusal is NOT in the value', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const read = fx.store.get()
    expect(read).toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
    expect(JSON.stringify(read)).not.toContain('refused')
    expect(JSON.stringify(read)).not.toContain(TIER4_CLOSED)
  })

  it('FS-T4-03 `writeEntry` with a non-representable value: the landed refused form, no filesystem call', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    for (const [label, bad] of [['BigInt', 1n], ['Symbol', Symbol('s')], ['function', () => 1], ['Map', new Map()], ['Set', new Set()], ['Date', new Date()], ['Infinity', Infinity], ['NaN', NaN], ['undefined', undefined]] as Array<[string, unknown]>) {
      const callsBefore = fx.calls().length
      expect(writeEntryOf(fx.store, 'bad', bad), `${label} REFUSES the whole request (§2.2 item 5)`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(fx.calls().length, `${label}: no filesystem call`).toBe(callsBefore)
      expect(readEntryOf(fx.store, 'bad'), `${label}: NOTHING moves, and undefined is NEVER a delete (§2.2 item 5)`).toBeNull()
    }
  })

  it('FS-T4-04 a name OUTSIDE `PAR-3`\'s domain: a write refuses in the landed form, a read answers null, neither throws', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const names: Array<[string, unknown]> = [['non-string', 12], ['empty string', ''], ['over-long', 'x'.repeat(513)], ['control char', 'a\u0000b'], ['DEL', 'a\u007fb']]
    for (const [label, name] of names) {
      expect(readEntryOf(fx.store, name), `${label}: a READ answers null (§6 PAR-3)`).toBeNull()
      expect(writeEntryOf(fx.store, name, 1), `${label}: a WRITE answers the landed refused form`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(readEntryOf(fx.store, name), `${label}: nothing was written`).toBeNull()
    }
    expect(() => writeEntryOf(fx.store, Symbol('s'), 1), 'neither throws').not.toThrow()
    expect(readEntryOf(fx.store, 'x'.repeat(512)), 'the boundary itself is IN the domain').toBeNull()
  })

  it('FS-T4-05 a patch OUTSIDE `set()`\'s declared domain: the landed refused form, never a throw', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const patches: Array<[string, unknown]> = [['null', null], ['array', [1, 2]], ['number', 7], ['Date (non-plain)', new Date()], ['hostile proxy', new Proxy({}, { get: () => { throw new Error('hostile') } })]]
    for (const [label, patch] of patches) {
      expect(() => fx.store.set(patch), `${label}: never a throw (§2.3 item 1)`).not.toThrow()
      expect(receiptOf(fx.store), `${label}: the landed refused form`).toEqual({ status: 'refused', reason: 'write-failed' })
    }
  })

  it('FS-T4-06 a `persist()` failure: refused; the record stays PRE-WRITE; the live map advances nothing', async () => {
    for (const [label, arm] of [['tmp write', (l: FsLog) => { l.writeFileAt = 1 }], ['tmp fsync', (l: FsLog) => { l.fsyncAt = 1 }], ['rename', (l: FsLog) => { l.renameFail = true }]] as Array<[string, (l: FsLog) => void]>) {
      const fx = await makeStoreFixture(); await fx.seed(SEEDED)
      setTier4Open(true)
      arm(fx.log)
      const before = await fx.bytes()
      expect(writeEntryOf(fx.store, 'k', 1), `${label} failure ⇒ the landed refusal`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(fx.store.get().token, `${label}: the record stayed PRE-WRITE`).toBe('SEED')
      expect(readEntryOf(fx.store, 'k'), `${label}: the live map advanced NOTHING`).toBeNull()
      expect(await fx.bytes(), `${label}: the previous file's bytes stand at the real path`).toBe(before)
    }
  })

  it('FS-T4-07 a post-rename directory-`fsync` failure is NOT a refusal (the write stays committed)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    fx.log.fsyncAt = 2 // call 2 = the parent-directory fsync AFTER the rename (the commit point has passed)
    expect(writeEntryOf(fx.store, 'k', 1), 'the successful rename answers `committed` regardless of the directory fsync (§2.1 item 6)').toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'k'), 'nothing rolls back').toEqual({ name: 'k', value: 1 })
    expect(String(await fx.bytes())).toContain('"k"')
  })

  it('FS-T4-08 a malformed `entries` member at boot is treated as ABSENT (the ONE declared non-verbatim arm)', async () => {
    for (const [label, malformed] of [['array', [1, 2]], ['string', 'nope'], ['number', 7], ['null', null], ['boolean', true]] as Array<[string, unknown]>) {
      const fx = await makeStoreFixture()
      await fx.seed({ ...SEEDED, entries: malformed, thirdPartyBlob: { x: 1 } })
      setTier4Open(true)
      expect(readEntryOf(fx.store, 'anything'), `${label}: the map reads EMPTY (§2.2 item 4 arm 5)`).toBeNull()
      expect(readEntryOf(fx.store, 'thirdPartyBlob'), `${label}: the top-level arm still ingests VERBATIM (the residue is BOUNDED)`).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
    }
  })

  it('FS-T4-09 WITHDRAWN / RE-GRAINED (`kick-back resolution`, outcome (a)): the store reads the STATIC HOLDER, its declared initial value is STORE-OPEN, and NO absent arm, fail-safe default or sibling-site wave exists', async () => {
    /* ── RE-GRAINED `2026-10-11`. The as-filed row asserted the now-SUPERSEDED `§3.2` `FS-T4-09`
     * (`"tier4Open absent from the options ⇒ FAIL-SAFE: the tier answers CLOSED"`), which drove the
     * fixture with `{ absentReader: true }`. THE AMENDED CLAUSE (`§0A` item 1, the `A-1` ruling;
     * `§2.1` item 2's amendment), quoted: "**THERE IS NO `READER OMITTED` STATE AND NO FAIL-SAFE
     * DEFAULT**: the holder always exists and its **declared initial value is `STORE-OPEN`**, so a
     * bare `createSecurityStore({ path })` reads it and behaves exactly as before". So the row now
     * asserts (i) the option census is `{ path }` — hence no absent arm can exist; (ii) the store
     * reads THE HOLDER: a bare store admits a write while the holder says OPEN and refuses it with
     * the closed token once the holder says CLOSED — same instance, no re-construction; (iii) the
     * holder's declared initial is STORE-OPEN, so the bare construction behaves exactly as before. */
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    const iface = /export interface SecurityStoreOptions\s*\{[\s\S]*?\n\}/.exec(src)?.[0] ?? ''
    const declared = [...iface.matchAll(/^\s*(\w+)\??\s*:/gm)].map((m) => m[1])
    expect(declared, `there is NO reader option to omit — measured [${declared.join(', ')}]`).toEqual(['path'])
    expect(/tier4Open/.test(iface), 'the withdrawn option is NOT declared (no absent arm exists)').toBe(false)
    expect(tier4StateModule, `the STATIC HOLDER must exist — ${tier4StateReason}`).not.toBeNull()
    const fx = await makeStoreFixture()
    await fx.seed(SEEDED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'a', 1), 'a BARE `createSecurityStore({ path })` reads the holder: OPEN ⇒ the write commits and lands').toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'a'), 'and the read answers the live value').toEqual({ name: 'a', value: 1 })
    setTier4Open(false)
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 2), 'the SAME instance, the holder now CLOSED ⇒ the closed refusal VALUE (`G-1`)')
    expect(readEntryOf(fx.store, 'a'), 'the refused read answers the PRE-CALL value, detached — no throw').toEqual({ name: 'a', value: 1 })
    expect(() => fx.store.get()).not.toThrow()
    expect(() => receiptOf(fx.store)).not.toThrow()
    expect(/^\s*(?:let|var)\s+\w+\s*=\s*true\s*;?\s*$/m.test(sourceOrEmpty(TIER4_STATE_SRC)), 'the holder\'s DECLARED INITIAL VALUE is STORE-OPEN (`true`), which is `D-19`\'s window — a bare store therefore behaves exactly as before').toBe(true)
  })

  it('FS-T4-10 a missing / corrupt / directory-shaped file at boot: the first-run default, never a throw', async () => {
    const missing = await makeStoreFixture()
    expect(missing.store.get().token).toBeNull()
    const corrupt = await makeStoreFixture(); await corrupt.rawSeed('{ broken json')
    expect(corrupt.store.get().token).toBeNull()
    const dirShaped = await makeStoreFixture(); await dirShaped.makeDirAtPath()
    expect(dirShaped.store.get().token).toBeNull()
  })

  it('FS-T4-11 a read landing inside the transition window answers ONE side of the pair, never a mixture (the RACE is NOT covered)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    const flips = [true, false, true, false]
    for (const state of flips) {
      setTier4Open(state)
      const answer = JSON.stringify(writeEntryOf(fx.store, 'w', 1))
      const expected = state
        ? JSON.stringify({ status: 'committed' })
        : JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
      expect(answer, 'one side of the pair, never a mixture (§3.3 item 3)').toBe(expected)
    }
    expect(sourceOrEmpty(SECURITY_STORE_SRC), 'the race itself is declared OUT (§7 item 5, `SC-D-08` MANUAL): no row here covers it').not.toContain('SC-D-08')
  })

  it('FS-T4-12 a second home or a second writer for the boolean is a FAILING row', () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    const assignments = [...src.matchAll(/^\s*(?!\/\/|\*)(?:let|var)\s+(\w*(?:exclusion|storeOpen|tier4Open)\w*)\s*=/gm)].map((m) => m[1])
    expect(assignments, `NO module-level mutable home for the boolean — measured [${assignments.join(', ')}]`).toEqual([])
    // THE ONE WRITER (`§2.5` item 2): `withExclusion` lives in `security.ts` and is called
    // from exactly ONE production site. The detector is COUNTABLE (a second writer means a
    // `withExclusion(` occurrence appearing in a module that today holds none), and it is
    // driven both ways so it cannot be vacuous.
    const writerSites = (source: string): number => (source.match(/withExclusion\s*\(/g) ?? []).length
    expect(writerSites('const gate = other.withExclusion(next)'), 'CONTROL: the detector FIRES on a foreign site').toBe(1)
    expect(writerSites(src), '`mcp-server.ts` holds ONE landed site — the transition the spec CITES as landed (`applyExclusion`)').toBe(1)
    expect(writerSites(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own (`F-11`: main supplies STATE, never takes the DECISION)').toBe(0)
    const securitySrc = sourceOrEmpty(join(REPO_ROOT, 'src/main/security.ts'))
    expect(writerSites(securitySrc), 'the ONE writer — the pure-constructor transition — lives in `security.ts`').toBe(1)
    // the STATE's one home (`§2.5` item 1): a direct `_exclusion` assignment anywhere outside
    // its own module is a SECOND writer, and the detector is driven both ways:
    const directAssignment = (source: string): boolean => /_exclusion\s*=[^=]/.test(source)
    expect(directAssignment('this._exclusion = next'), 'CONTROL: the detector FIRES on a direct assignment').toBe(true)
    expect(directAssignment(sourceOrEmpty(MCP_SERVER_SRC)), '`mcp-server.ts` never assigns the record directly (it replaces the GATE)').toBe(false)
  })

  it('FS-T4-13 the pane rendering a state the carrier did not supply is a FAILING row', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
    const text = paneTextOf(panels, 'security-status')
    expect(text, 'the state word comes from the carrier, never from the pane\'s own prior value').toContain('· MCP: enabled')
    expect(text, 'CONTROL: the fabrication detector FIRES on the opposite rendering').not.toContain('· MCP: disabled')
    expect(text, '`read: null` ⇒ no fabricated refusal segment (§2.6 item 4)').not.toContain(REFUSAL_SEGMENT)
  })
})

describe('S2 §2.6 THE PANE\'S TWO RE-SOURCED CELLS + THE ONE ADDITIVE SEGMENT', () => {
  it('the carrier is READ (the pane drives its cells from the response record, not from a store read)', async () => {
    const pane = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(pane.reads(), 'the pane read the carrier').toBeGreaterThan(0)
  })

  it('the `MCP:` segment and the toggle follow the carrier across a refresh (CTL-5: the probe can read a stale value)', async () => {
    const first = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(paneTextOf(first.panels, 'security-status')).toContain('· MCP: disabled')
    expect(paneTextOf(first.panels, 'security-status'), 'CONTROL: the probe can distinguish the two renderings').not.toContain('· MCP: enabled')
    const next = carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...next }) } } }
    await first.panels.refresh()
    const text = paneTextOf(first.panels, 'security-status')
    expect(text).toContain('· MCP: enabled')
    expect(text, 'the additive trailing segment is present iff `read` is non-null (`PAR-11`)').toContain(REFUSAL_SEGMENT)
  })

  it('the segment carries a TOKEN, never a message body, never a tier-4 value or name (`§2.6` item 4)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const text = paneTextOf(panels, 'security-status')
    expect(text).toContain(REFUSAL_SEGMENT)
    expect(text, 'the message body is NOT rendered in place of the token').not.toContain(TIER4_CLOSED_MESSAGE)
    expect(text, 'no group set leaks into the segment').not.toContain('read, dispatch,')
  })

  it('no new node, class or geometry: the segment rides the landed line (`§2.6` item 5)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
    const ids = nodes.map((n) => ((n as { props?: { id?: string } }).props?.id) ?? '')
    expect(ids, 'the authored node census is UNMOVED (D1–D8 stand)').toContain('security-status')
    expect(ids.filter((id) => id === 'security-status')).toHaveLength(1)
  })
})

describe('S2 §4.2 THE AUTHORING ORDER (the static/census rows REDDENED FIRST on the tree as it stood; this row is RE-GRAINED to the GREEN direction)', () => {
  it('the census row RE-GRAINED (`kick-back resolution`, outcome (a)): `Object.keys(store)` is the DECLARED FIVE and BOTH new members exist', async () => {
    /* ── RE-GRAINED `2026-10-11` (the Implementer's `§10` item 6 kick-back): the as-filed row was a
     * RED-STATE assertion (`"the landed census is 3 and the landed tree carries NO
     * \`readEntry\`/\`writeEntry\`"`) that contradicted `P-T4-CENSUS` (the declared FIVE) inside the
     * SAME file. The green-side form keeps the row's own bite — the census TERMS are printed, and
     * both members are asserted to be FUNCTIONS, not merely present keys. */
    const fx = await makeStoreFixture()
    const keys = Object.keys(fx.store)
    expect(keys, `5 = 3 (landed: get · lastWriteReceipt · set) + 2 (new: readEntry · writeEntry) — measured [${keys.join(', ')}]`).toEqual([...DECLARED_SURFACE_MEMBERS])
    expect(keys.length, 'the movement is exactly 3 → 5').toBe(LANDED_SURFACE_MEMBERS.length + 2)
    expect(typeof fx.store.readEntry, 'the name-addressed READ landed').toBe('function')
    expect(typeof fx.store.writeEntry, 'the name-addressed WRITE landed').toBe('function')
  })
})

describe('S2 §5.5.1 THE REGISTER (executed deterministically — 10 rows / 113 attempts: the OPERATIVE total, printed WITH its terms, is `113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8` — `P-IM 47` · `P-SM 10` · `P-TP 56`, `47 + 10 + 56 = 113`, chain `12 → 22 → 34 → 42 → 56 → 67 → 77 → 97 → 105 → 113`; BOTH earlier forms stand BESIDE it, never over it — the FILING\'s `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8` (`2026-10-11`, the spec gate) and the GATE-4 row-8 re-grain\'s `112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8` (`2026-10-11`, the four `D-i`…`D-iv` terms at row 8); the operative one is the gate-6 `F-1` re-grain of `2026-10-11`, row 6\'s PRE-CARRIER `+ 1`, caused by the live finding `F-1`)', () => {
  it('REGISTER-EXEC: every row executes its FULL declared term, in register order, and no row is un-run', async () => {
    execReport = await executeRegister(registerRows)
    expect(execReport.rows.length, '10 rows executed — an un-run row is a FAILURE, never a pass').toBe(10)
    expect(execReport.rows.map((r) => r.id)).toEqual([...REGISTER_ROW_IDS])
    expect(execReport.rows.map((r) => r.strategyId)).toEqual([...STRATEGY_IDS])
    expect(execReport.rows.every((r) => r.attemptsRun === r.declaredTerm), 'every row executed its full term').toBe(true)
    expect(execReport.unrunRows, `un-run rows: [${execReport.unrunRows.join(', ')}]`).toEqual([])
    /* ── `RCA-8(d)` — THE OPERATIVE TOTAL PRINTED WITH ITS TERMS, EVERY DATED FORM KEPT
     * BESIDE IT, NEVER OVER IT (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) ————————————
     * AS FILED (the spec gate's filing, `2026-10-11`): `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10
     *   + 16 + 8 + 8`, subtotals `P-IM 46` · `P-SM 10` · `P-TP 52`, `46 + 10 + 52 = 108`.
     *   CAUSE, DATED: row 8 (`P-T4-TP-4`) then declared `16 = 4 × 2 + 8`.
     * GATE-4 RE-GRAIN (`2026-10-11`, the ruled repair contract): `108 + 4 = 112 = 12 + 10 + 12
     *   + 8 + 14 + 10 + 10 + 20 + 8 + 8`, subtotals `P-IM 46` · `P-SM 10` · `P-TP 56`,
     *   `46 + 10 + 56 = 112`. CAUSE, DATED: row 8 gained the four `D-i`…`D-iv` terms (`+ 1` × 4).
     * OPERATIVE (the gate-6 `F-1` evasion ruling, `2026-10-11`): `112 + 1 = 113 = 12 + 10 + 12
     *   + 8 + 14 + 11 + 10 + 20 + 8 + 8`, subtotals `P-IM 47` · `P-SM 10` · `P-TP 56`,
     *   `47 + 10 + 56 = 113`. CAUSE, DATED: row 6 (`P-T4-IM-3`, `S-T4-PANE-1`) gained the
     *   PRE-CARRIER family — the `+ 1` term the gate-6 LIVE finding `F-1` forced (the AUTHORED
     *   envelope literal `data-state: 'mcp-enabled'` standing before any carrier answer), now an
     *   entry of row 6's OWN drives array (`11 = 10` as filed `+ 1`), not a composed term.
     * THE FIGURE BELOW IS THE ONE THE RUN PRINTS — no form is silently rewritten by this edit. */
    expect(execReport.attemptsExecuted, `the operative total, WITH its terms: 113 = ${DECLARED_TERMS.join(' + ')}`).toBe(113)
  })

  it('REGISTER-TERMS: the total is the SUM OF ITS OWN PRINTED TERMS, with the subtotals and the caps', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    const declared = declaredTotalReport()
    expect(declared.sum, `113 = ${DECLARED_TERMS.join(' + ')}`).toBe(113)
    expect(declared.sum).toBe(DECLARED_TERMS.reduce((a, b) => a + b, 0))
    expect(execReport.rows.map((r) => r.declaredTerm)).toEqual([...DECLARED_TERMS])
    /* ── THE SUBTOTALS BY TYPE, PRINTED WITH THEIR TERMS, EVERY DATED FORM BESIDE THE OPERATIVE
     * ONE (`RCA-8(d)`) ———
     * AS FILED (the spec gate, `2026-10-11`): `P-IM 46 = 12 + 8 + 10 + 8 + 8` · `P-SM 10` ·
     *   `P-TP 52 = 12 + 10 + 14 + 16` — `46 + 10 + 52 = 108`.
     * GATE-4 RE-GRAIN (`2026-10-11`, row 8's four `D-i`…`D-iv` terms): `P-TP 52 → 56 = 12 + 10 +
     *   14 + 20` while `P-IM 46` and `P-SM 10` are UNMOVED — `46 + 10 + 56 = 112`.
     * OPERATIVE (gate 6's `F-1` evasion ruling, `2026-10-11`, row 6's PRE-CARRIER `+ 1`):
     *   `P-IM 46 → 47 = 12 + 8 + 11 + 8 + 8` while `P-SM 10` and `P-TP 56` are UNMOVED —
     *   `47 + 10 + 56 = 113`. */
    expect(execReport.subtotals).toEqual({ im: 47, sm: 10, tp: 56 })
    expect(execReport.subtotals.im + execReport.subtotals.sm + execReport.subtotals.tp, '47 + 10 + 56 = 113').toBe(113)
    expect(Math.max(...DECLARED_TERMS), `per row ≤ ${REGISTER_ROW_CAP}`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(execReport.declaredTotal).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(BOUNDED_ROWS, 'no row takes a draw (`§5.5.2` item 3)').toEqual([])
    expect(STOP_AFTER_CONSECUTIVE).toBe(5)
  })

  it('REGISTER-REPORT: prints each row\'s strategy id + attempts + held/broken and the total WITH its terms', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    process.stdout.write('\n' + registerReportLines(execReport).join('\n') + '\n')
    const literal = await executeRegister(registerRows, { honourStopRule: true })
    process.stdout.write(`\nREGISTER-STOP-RULE (literal stop-after-5 reading): stoppedAtRow=${String(literal.stoppedAtRow)} · attemptsExecuted=${literal.attemptsExecuted} · un-run rows=[${literal.unrunRows.join(', ')}]\n`)
    expect(execReport.rows.every((r) => r.strategyId.length > 0 && r.declaredTerm > 0)).toBe(true)
  })

  it('REGISTER-CONTROL: the broken/un-run bounds are able to FAIL (CTL-1)', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    const brokenRun = await syntheticBrokenRegisterControlOnly()
    expect(brokenCountGuardOldForm(brokenRun), 'CONTROL: the pre-repair (vacuous) form PASSES a broken run').toBe(true)
    expect(brokenCountCheckOf(brokenRun).brokenOk, 'CONTROL: the new bound FAILS it').toBe(false)
    const unRun = syntheticUnRunRegisterControlOnly()
    expect(brokenCountCheckOf(unRun).unrunOk, 'CONTROL: the un-run bound FAILS an abandoned register').toBe(false)
    expect(brokenCountCheckOf(unRun).unrun).toBe(9)
    expect(brokenCountCheckOf(execReport).unrunOk, 'the register really ran every row').toBe(true)
  })

  it('REGISTER-GREEN (RE-GRAINED from `REGISTER-RED`; `kick-back resolution`, outcome (a)): the register\'s rows hold — `broken === 0` for every row, executed = declared, total printed WITH its terms', async () => {
    /* ── RE-GRAINED `2026-10-11` (the Implementer's `§10` item 6 kick-back): the as-filed row was a
     * RED-STATE assertion (`broken > 0` / `rowsWithoutBreak === []`), which `§9` item 3 itself had
     * already assigned to the green's inversion. The green-side form keeps the SAME instrument and
     * the SAME terms, and only flips the direction (`§4.3` item 3: re-grained BESIDE its as-filed
     * form, never silently rewritten). */
    if (execReport === null) execReport = await executeRegister(registerRows)
    const broken = execReport.rows.reduce((a, r) => a + r.broken, 0)
    const held = execReport.rows.reduce((a, r) => a + r.held, 0)
    const summary = execReport.rows.map((r) => `${r.id} ${r.held}/${r.attemptsRun}`).join(' · ')
    const rowsWithoutBreak = execReport.rows.filter((r) => r.broken === 0).map((r) => r.id)
    expect(held + broken, 'held + broken = the executed total').toBe(execReport.attemptsExecuted)
    expect(broken, `EVERY row holds at green (executed = declared) — per row: ${summary}`).toBe(0)
    expect(rowsWithoutBreak, `rows carrying NO broken attempt: [${rowsWithoutBreak.join(', ')}]`).toEqual([...REGISTER_ROW_IDS])
    expect(held, `the held attempts are the DECLARED total, WITH its terms — OPERATIVE 113 = ${DECLARED_TERMS.join(' + ')}, row 6's PRE-CARRIER + 1 forced by the gate-6 live finding F-1; BOTH earlier forms stay printed beside it — AS FILED 108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8 (the spec gate) and the GATE-4 RE-GRAIN 112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8 (row 8's four terms)`).toBe(113)
    expect(execReport.attemptsExecuted, `executed = declared = ${DECLARED_TERMS.join(' + ')}`).toBe(declaredTotalReport().sum)
    expect(execReport.unrunRows, 'and no row is un-run — an un-run row is a FAILURE, never a pass').toEqual([])
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * S2 REPAIR — GATE 4's RULED REPAIR CONTRACT (`2026-10-11`). THE RED SET OF THE REPAIR.
 *
 * Authored FROM THE CONTRACT (`docs/specs/tier4-arbitrary-storage.md` `§0`–`§8`, each row citing
 * the clause it reads) and from GATE 4's RULING, as run and reported BEFORE any `src/**` byte of
 * the repair. Every row enumerates its states FIRST, then drives one assertion per state; every
 * absence-asserting arm carries a control that MUST fire, so no arm is vacuous.
 *
 * THE STATES ENUMERATED UP FRONT (one line each):
 *  · `D-i`   `-0` (a number that is NOT JSON-round-trip-identical) · `0` (identity) · a NESTED `-0`
 *            · an ordinary negative finite number.
 *  · `D-ii`  `__proto__` as a boot TOP-LEVEL key · as an `entries` member · through `writeEntry`
 *            · in the persisted bytes · across a RE-CONSTRUCTED store · a plain foreign name.
 *  · `D-iii` a top-level ARRAY · a top-level STRING · a top-level NUMBER · a top-level BOOLEAN,
 *            each at the boot read, at the first write, and at the file's own bytes.
 *  · `D-iv`  the declared interface · the destructured extra · a call THROUGH the surface · a call
 *            BYPASSING it · an INCOMPLETE surface hand-in.
 *  · `D-vi`  a never-supplied reading (a rejected bridge) · `read: undefined` · an ABSENT `read`
 *            member · the pane's own field default.
 *  · `D-vii` the four `D-19` sites + the window creation.
 *  · `D-viii` the handler's reading count · a TWO-call synthetic body.
 *  · `D-ix`  a refusal on an UNPRIMED instance · the same refusal PRIMED.
 *  · `D-x`   the two frozen pins · the store pin · the chain's five terms.
 * ═══════════════════════════════════════════════════════════════════════════════════════════ */
describe('S2 REPAIR (gate 4\'s ruled repair contract) — THE RED ROWS', () => {
  it('D-I · `-0` is REFUSED: a number that is NOT JSON-round-trip-identical refuses the whole request in the LANDED form with NO filesystem call — and `0` still commits (the control)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
    expect(Number.isFinite(-0), 'CONTROL: `-0` IS a finite number, so the landed finiteness arm admits it — which is exactly why the clause needs its own identity ground').toBe(true)
    expect(Object.is(JSON.parse(JSON.stringify(-0)), -0), 'CONTROL: the JSON round trip is NOT identity for `-0` (it answers `0`) — the clause\'s own ground for refusing it').toBe(false)
    expect(Object.is(JSON.parse(JSON.stringify(0)), 0), 'CONTROL: and it IS identity for `0`').toBe(true)
    const before = await fx.bytes()
    const callsBefore = fx.calls().length
    expect(writeEntryOf(fx.store, 'negzero', -0), '`-0` REFUSES the whole request in the LANDED refused form (`§2.2` item 5; `PAR-4`\'s OUTSIDE list gains `-0`)').toEqual({ status: 'refused', reason: 'write-failed' })
    expect(fx.calls().length, 'no filesystem call').toBe(callsBefore)
    expect(await fx.bytes(), 'the file did not move').toBe(before)
    expect(readEntryOf(fx.store, 'negzero'), 'nothing was written — a refusal is NEVER a delete').toBeNull()
    expect(writeEntryOf(fx.store, 'nested', { a: [-0] }), 'and the identity binds at EVERY DEPTH the predicate walks').toEqual({ status: 'refused', reason: 'write-failed' })
    const zeroCalls = fx.calls().length
    expect(writeEntryOf(fx.store, 'zero', 0), 'CONTROL: `0` STILL COMMITS').toEqual({ status: 'committed' })
    expect(fx.calls().length, 'CONTROL: and the committed write really LANDS').toBeGreaterThan(zeroCalls)
    expect(Object.is((readEntryOf(fx.store, 'zero') as { value: number }).value, 0)).toBe(true)
    expect(writeEntryOf(fx.store, 'finite', -1.5), 'CONTROL: an ordinary negative finite number stays IN the domain').toEqual({ status: 'committed' })
  })

  it('D-II · `__proto__` is PRESERVED: a boot top-level key, an `entries` member and a `writeEntry(\'__proto__\', v)` are VERBATIM — readable in-process, present in the persisted bytes, and still there after a RE-CONSTRUCTED store on the same path (a plain foreign name is the non-vacuity control)', async () => {
    const fx = await makeStoreFixture()
    await fx.seed({ ...SEEDED, ['__proto__']: { x: 1 }, ordinaryName: 'keep' })
    const seededBytes = String(await fx.bytes())
    expect(seededBytes, 'CONTROL: the fixture really carries an OWN `__proto__` key at top level').toContain('"__proto__"')
    setTier4Open(true)
    expect(Object.prototype.hasOwnProperty.call(JSON.parse(seededBytes), '__proto__'), 'CONTROL: `JSON.parse` mints it as an OWN data property — so the INGESTION is what loses it').toBe(true)
    expect(readEntryOf(fx.store, 'ordinaryName'), 'CONTROL (non-vacuity): a PLAIN foreign name ingests and reads').toEqual({ name: 'ordinaryName', value: 'keep' })
    expect(readEntryOf(fx.store, '__proto__'), 'the boot\'s top-level `__proto__` is INGESTED VERBATIM under its own name (`§2.2` item 4 arms 3/4)').toEqual({ name: '__proto__', value: { x: 1 } })
    expect(writeEntryOf(fx.store, '__proto__', { y: 2 }), 'and the WRITE is admitted').toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, '__proto__'), 'readable in-process, under its own name').toEqual({ name: '__proto__', value: { y: 2 } })
    const persisted = JSON.parse(String(await fx.bytes())) as { entries: Record<string, unknown> }
    expect(Object.prototype.hasOwnProperty.call(persisted.entries, '__proto__'), 'present in the persisted BYTES as an OWN key of `entries`').toBe(true)
    expect(Object.getOwnPropertyDescriptor(persisted.entries, '__proto__')?.value, 'carrying the admitted value VERBATIM').toEqual({ y: 2 })
    const second = await makeStoreOnPath(fx.path)
    expect(readEntryOf(second.store, '__proto__'), 'and STILL THERE after a RE-CONSTRUCTED store on the same path — never lost to the `Object.prototype` setter').toEqual({ name: '__proto__', value: { y: 2 } })
    expect(readEntryOf(second.store, 'ordinaryName'), 'CONTROL (non-vacuity): the plain foreign name survives the same re-construction').toEqual({ name: 'ordinaryName', value: 'keep' })
    const fx2 = await makeStoreFixture()
    await fx2.seed({ ...SEEDED, entries: { ['__proto__']: 5 } })
    expect(readEntryOf(fx2.store, '__proto__'), 'an `entries.__proto__` member at boot is ingested member by member VERBATIM (`§2.2` item 4 arm 4)').toEqual({ name: '__proto__', value: 5 })
  })

  it('D-III · a top-level NON-OBJECT record is the CORRUPT arm: the first-run default with `entries` ABSENT (`null`), the file\'s bytes UNTOUCHED, never a throw, and NO entries minted from index keys at the first write', async () => {
    for (const [label, text] of [['an ARRAY', '[1,2,3]'], ['a STRING', '"hello"'], ['a NUMBER', '7'], ['a BOOLEAN', 'true']] as Array<[string, string]>) {
      const fx = await makeStoreFixture(); await fx.rawSeed(text)
      expect(await fx.bytes(), `${label}: the fixture carries the raw bytes`).toBe(text)
      setTier4Open(true)
      let threw = false
      try { fx.store.get() } catch { threw = true }
      expect(threw, `${label}: NEVER a throw — the landed boot fail-state (\`FS-T4-10\`)`).toBe(false)
      expect(fx.store.get().token, `${label}: the first-run default`).toBeNull()
      expect(fx.store.get().enabled, `${label}: the first-run default`).toEqual(['read', 'dispatch'])
      expect(fx.store.get().maxJournalLength, `${label}: the first-run default`).toBeUndefined()
      expect(readEntryOf(fx.store, '0'), `${label}: NO entry is minted from an INDEX key — \`entries\` reads ABSENT (\`null\`)`).toBeNull()
      expect(readEntryOf(fx.store, '1'), `${label}: nor from any other index key`).toBeNull()
      expect(await fx.bytes(), `${label}: and the boot NEVER rewrites the file (the record's re-serialization is the first successful write's, \`§2.2\` item 4 arm 6)`).toBe(text)
      expect(writeEntryOf(fx.store, 'k', 1), `${label}: the first write commits`).toEqual({ status: 'committed' })
      const persisted = JSON.parse(String(await fx.bytes())) as { entries: Record<string, unknown> }
      expect(Object.keys(persisted.entries), `${label}: and MINTS NO index-key entries into the record — the map carries exactly the written name`).toEqual(['k'])
    }
  })

  it('D-IV · the `fs` seam is DECLARED: the module\'s REAL construction inputs are the declared interface PLUS the destructured extra (`2 = 1 (path) + 1 (fs)`), EVERY filesystem call is taken from that surface, and an INCOMPLETE surface is NOT adopted — never a throw', async () => {
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    const code = codeOnly(src)
    // (a) THE CONSTRUCTION-INPUT CENSUS — the declared interface PLUS the destructured extra:
    const iface = /export interface SecurityStoreOptions\s*\{[\s\S]*?\n\}/.exec(code)?.[0] ?? ''
    expect([...iface.matchAll(/^\s*(\w+)\??\s*:/gm)].map((m) => m[1]), 'the DECLARED interface itself stays UNMOVED: its census `1 = 1 (path)` STANDS (`§0A` item 1)').toEqual(['path'])
    const destructured = destructuredConstructionInputs(src)
    expect(destructured, `the module's REAL construction inputs: \`2 = 1 (the declared interface: path) + 1 (the destructured extra: fs)\` — measured [${destructured.join(', ')}]`).toEqual(['fs', 'path'])
    expect(destructuredConstructionInputs('export function createSecurityStore(opts: SecurityStoreOptions): SecurityStore {'), 'CONTROL: the AS-FILED non-destructured signature answers NO construction input — which is what the bytes carry today').toEqual([])
    expect(destructuredConstructionInputs('export function createSecurityStore({ path, fs = nodeFs }: SecurityStoreOptions & { fs?: FsSurface }): SecurityStore {'), 'CONTROL: the DECLARED shape answers both inputs').toEqual(['fs', 'path'])
    // (b) EVERY FILESYSTEM CALL IS TAKEN FROM THAT SURFACE:
    const [from, to] = nodeFsLiteralRange(code)
    expect(from, 'the `nodeFs` literal exists — the ONE place the real `node:fs` is touched').toBeGreaterThan(-1)
    expect(to).toBeGreaterThan(from)
    expect(to - from, 'and the literal is a literal, not an empty shell').toBeGreaterThan(20)
    const bypasses = bareFsCallsOutsideNodeFs(code)
    expect(bypasses, `NO direct \`node:fs\` call outside the \`nodeFs\` literal (D-iv) — measured bypasses: [${bypasses.join(', ')}]`).toEqual([])
    expect(bareFsCallsOutsideNodeFs('const nodeFs: FsSurface = { rmSync }\nfunction f(tmp: string) { rmSync(tmp, { recursive: true, force: true }) }\n'), 'CONTROL: the detector FIRES on a call that BYPASSES the surface').toEqual(['rmSync'])
    expect(bareFsCallsOutsideNodeFs('const nodeFs: FsSurface = { readFileSync, existsSync }\nfunction f(p: string) { return nodeFs.readFileSync(p) }\n'), 'CONTROL (negative): a call THROUGH the surface does NOT fire').toEqual([])
    // (c) AN INCOMPLETE SURFACE IS NOT ADOPTED — the real `node:fs` is used, never a throw:
    const partial = await makeStoreFixture({ fsSurface: incompleteFsSurface() })
    await partial.seed(SEEDED)
    setTier4Open(true)
    let threw = false
    try { partial.store.set({ token: 'FULL' }) } catch { threw = true }
    expect(threw, 'an INCOMPLETE surface is NOT adopted — never a throw').toBe(false)
    expect(receiptOf(partial.store), 'the REAL `node:fs` is used, so the write COMMITS and lands').toEqual({ status: 'committed' })
    expect(partial.store.get().token).toBe('FULL')
    expect(String(await partial.bytes()), 'and the bytes really moved').toContain('FULL')
  })

  it('D-VI · THE PANE FABRICATES NOTHING: a reading the carrier never supplied paints NO `· MCP:` word, no affordance word and no refusal segment — and the refusal segment appears IFF the carrier\'s `read` is non-null, with `undefined` counting as null', async () => {
    // state 1 — a BRIDGE-REJECTED refresh on a never-supplied pane (the ruling's own named case):
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    const mount = mountEl()
    const panels = new SecurePanels(mount as never)
    await panels.refresh()
    const text = paneTextOf(panels, 'security-status')
    expect(text, `the pane's own FIELD DEFAULT must paint NO \`· MCP:\` word when no carrier supplied a reading — measured text: "${text}"`).not.toMatch(/· MCP:/)
    expect(text, 'nor a refusal segment').not.toContain(REFUSAL_SEGMENT)
    expect(paneTextOf(panels, 'exclusion-toggle'), 'and the AFFORDANCE word is not painted from the field default either — no carrier supplied a reading to word it from').not.toMatch(/Disable MCP|Enable MCP/)
    // state 2 — `read: undefined` (the ruling: `undefined` COUNTS AS null):
    const undef = await mountPaneFor({ ...carrierRecord(STATE_MCP_ENABLED, null), read: undefined })
    expect(paneTextOf(undef.panels, 'security-status'), '`read: undefined` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
    // state 3 — an ABSENT `read` member (the same reading, via `PAR-8`'s OUTSIDE cell):
    const absentMember: Record<string, unknown> = { ...carrierRecord(STATE_MCP_ENABLED, null) }
    delete absentMember.read
    const absent = await mountPaneFor(absentMember)
    expect(paneTextOf(absent.panels, 'security-status'), 'an ABSENT `read` member ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
    // state 4 — the pane's own FIELD DEFAULT carries no state member (the source instrument for the
    // `data-state` half, whose VALUE is byte-identical to the authored envelope and is therefore not
    // separately observable — a DECLARED LIMIT, named rather than hidden):
    const panelsSrc = codeOnly(sourceOrEmpty(SECURE_PANELS_SRC))
    const fieldInit = /private\s+cfg\b[^=]*=\s*\{([\s\S]*?)\}/.exec(panelsSrc)?.[1] ?? ''
    expect(fieldInit, 'CONTROL: the pane\'s `cfg` field initializer is found').not.toBe('')
    expect(/exclusion\s*:/.test(fieldInit), `the pane's own FIELD DEFAULT carries NO state member — a never-supplied pane has nothing to fabricate from. MEASURED INITIALIZER: ${fieldInit.trim().slice(0, 160)}`).toBe(false)
    /* ── ANNOTATED BESIDE `2026-10-11` (`RCA-8(d)`: every byte above STANDS — this note is added
     * BESIDE the as-filed cell, never over it). **THE `data-state` HALF IS NO LONGER A DECLARED
     * LIMIT.** The as-filed state 4 above declared the `data-state` half *"not separately
     * observable"* because its VALUE (with no reading yet) is byte-identical to the authored
     * envelope's own literal. The gate-6 live battery's finding `F-1` REFUTED that instrument
     * limit: the prop's PRESENCE before a carrier answer IS observable at the node layer and it IS
     * the fabrication (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§5` `F-1`), and the
     * `[T]` row `F-1` below now reads it in four no-answer states. THE AS-FILED FIELD-DEFAULT
     * TERM ABOVE IS UNAFFECTED AND STILL HOLDS: the pane's own FIELD carries no state member, so
     * the literal the operator saw is not the field's — it is the AUTHORED NODE's. */
  })

  it('D-VII · the boot order: `createSecurityStore(` < the boot read < the flip < `await mcp.start()`, AND the flip < `new BrowserWindow(` (the CLOSE lands before the window is created/loaded)', () => {
    const src = sourceOrEmpty(MAIN_SRC)
    const store = src.search(/createSecurityStore\(/)
    const bootRead = src.search(/securityStore\.get\(\)/)
    const gate = src.search(/new SecurityGate\(/)
    const flip = src.search(/mcp\.applyExclusion\(\s*'mcp-enabled'\s*\)/)
    const enable = src.search(/await\s+mcp\.start\(/)
    const window = src.search(/new BrowserWindow\(/)
    for (const [label, at] of [['createSecurityStore(', store], ['the boot read', bootRead], ['the flip', flip], ['await mcp.start()', enable], ['new BrowserWindow(', window]] as Array<[string, number]>) {
      expect(at, `the site \`${label}\` exists in \`main.ts\``).toBeGreaterThan(-1)
    }
    expect(store, 'D-19 step 1: the store is constructed FIRST').toBeLessThan(bootRead)
    expect(bootRead, 'D-19 step 2: the boot-ingestion read follows it').toBeLessThan(flip)
    expect(gate === -1 || (gate > bootRead && gate < flip), 'D-19: the gate construction sits between the boot read and the flip (`store → boot read → gate → flip → mcp.start()` is PRESERVED)').toBe(true)
    expect(flip, 'D-19 step 3: the CLOSE precedes the enable').toBeLessThan(enable)
    expect(flip, `THE REPAIR'S OWN CLAUSE (D-vii): the CLOSE (\`mcp.applyExclusion('mcp-enabled')\`) lands BEFORE the window is created/loaded — measured flip@${flip} vs \`new BrowserWindow(\`@${window}`).toBeLessThan(window)
  })

  it('D-VIII · the GET handler reads the holder EXACTLY ONCE per turn — the returned `exclusion` member comes from the SAME single reading as `read`', () => {
    const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
    expect(handler.length, 'the GET handler exists').toBeGreaterThan(0)
    const code = codeOnly(handler)
    const reads = code.match(/tier4OpenState\s*\(\s*\)/g) ?? []
    expect(reads.length, `EXACTLY ONE \`tier4OpenState()\` occurrence in the handler body — measured ${reads.length} (a second consult is a SECOND reading, and the two members could then disagree)`).toBe(1)
    const twoCallBody = "ipcMain.handle(IPC_SECURITY_GET, () => { const open = tier4OpenState(); return ({ read: open ? null : R, exclusion: tier4OpenState() ? 'mcp-disabled' : 'mcp-enabled' }) })"
    expect((codeOnly(twoCallBody).match(/tier4OpenState\s*\(\s*\)/g) ?? []).length, 'CONTROL: the detector FIRES on a synthetic TWO-call body').toBe(2)
    expect(/read\s*:/.test(code), 'and the ONE reading feeds BOTH members (the `read` member is composed in the handler)').toBe(true)
    expect(/securityStore\.get\(\)/.test(code), 'while the boolean is NEVER routed through a store read (`§2.4` item 7)').toBe(false)
  })

  it('D-IX · `§3.3` item 4, RE-READ AT ITS DECLARED SCOPE: a refusal makes NO WRITE-class `fs` call — the ONE lazy boot-ingestion READ is the DECLARED turn — and the primed control shows no further call', async () => {
    const fx = await makeStoreFixture({ readLog: true }); await fx.seed(SEEDED); setTier4Open(false)
    const unprimed = fx.calls().length
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 1), 'D-IX · unprimed')
    const window = fx.calls().slice(unprimed)
    expect(writeClassCalls(window), `a refusal's window is EMPTY of WRITE-class calls — measured [${window.join(', ')}]`).toEqual([])
    expect(window.every((c) => READ_CLASS_CALL.test(c)), 'every call in it is READ-class').toBe(true)
    expect(window.some((c) => c.startsWith('readFile:')), 'and it carries the DECLARED boot-ingestion read (`§2.2` item 4: "Ingestion is a READ") — named, never smuggled').toBe(true)
    const primed = fx.calls().length
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 2), 'D-IX · primed')
    expect(fx.calls().slice(primed), 'CONTROL: on the PRIMED instance the same refusal makes NO further call at all (the laziness is one-shot by declaration)').toEqual([])
    const blind = await makeStoreFixture(); await blind.seed(SEEDED); setTier4Open(false)
    assertClosedRefusal(writeEntryOf(blind.store, 'a', 1), 'D-IX · the as-filed instrument')
    expect(blind.calls(), 'CONTROL: the AS-FILED instrument (write-class-blind) is BLIND to the ingestion read — which is why the reading is re-grained to "no WRITE-class call"').toEqual([])
  })

  it('D-X · the frozen pins are compared at FULL digest (64 hex), and the register\'s `SECURITY_STORE_PIN` is ASSERTED — a dead stale pin may not stand', () => {
    for (const [rel, pin] of Object.entries(MEASURED_FROZEN_PINS)) {
      expect(pin.length, `the pin of ${rel} is the FULL 64-hex digest, not an 8-char proxy`).toBe(64)
      expect(pin.slice(0, 8), 'CONTROL: the AS-FILED 8-char proxy is the FIRST EIGHT of the same digest — so the proxy alone cannot tell them apart').toBe(sha256Of(join(REPO_ROOT, rel)).slice(0, 8))
      expect(`${pin.slice(0, 8)}${'0'.repeat(56)}`.includes(pin.slice(0, 8)), 'CONTROL: the PROXY form PASSES a digest it must not (`0664c52f…0000`) — the bite the full comparison adds').toBe(true)
      expect(sha256Of(join(REPO_ROOT, rel)), `the frozen pin of ${rel} is UNMOVED, at FULL digest (\`§2.7\` item 1)`).toBe(pin)
    }
    expect(SECURITY_STORE_PIN.length, 'the store pin is a FULL 64-hex digest too').toBe(64)
    expect(SECURITY_STORE_PIN, 'and it is LIVE: it equals the module\'s actual bytes digest — the as-filed `8ed09c97…` was STALE and read by NO row').toBe(sha256Of(SECURITY_STORE_SRC))
    expect(SECURITY_STORE_PIN_CHAIN.length, 'the chain keeps its terms awake, including the fifth (`§7b` row 1)').toBe(5)
    expect(new Set(SECURITY_STORE_PIN_CHAIN).size, `the chain's terms are DISTINCT: [${SECURITY_STORE_PIN_CHAIN.join(', ')}]`).toBe(5)
    expect(SECURITY_STORE_PIN.startsWith(SECURITY_STORE_PIN_CHAIN[4]), 'and the operative term IS the chain\'s fifth').toBe(true)
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════
 * S2 = `U-TIER4-ARBITRARY-STORAGE` — GATE 6's `F-1` (`HIGH`): THE RED ROW (`RCA-1`).
 *
 * Authored from the CONTRACT and from the gate-6 RECORD, against the tree as it stands, and RUN
 * and REPORTED failing BEFORE any `src/**` byte of the repair. Nothing in `src/**` was read as a
 * SOURCE OF EXPECTATIONS; the two sites cited below are cited so the repair has a site.
 *
 * ── THE FINDING, AS MEASURED ON THE ASSEMBLED APP (cited, never re-derived) ─────────────────
 * Record: `docs/specs/tier4-arbitrary-storage-live-battery.md` `§5` `F-1`, whose matrix row is its
 * `§3` `U-1` — verdict **`FAIL`**, falsifier *"a state that paints a `· MCP:` word OR a `data-state`
 * PROP the carrier did not supply — i.e. a pre-carrier paint that carries state at all"*. A
 * document-start `MutationObserver` on the real app read, at FIRST PAINT,
 * `statusText: "token: (none) · enabled: [read, dispatch] · journal: ∞"` — NO `· MCP:` word, i.e.
 * the pane's own reading is `null` and the `D-vi` FIELD-default fix DID land — while the toggle
 * still carried `data-state: "mcp-enabled"` and its affordance had been cleared to `""`. In the
 * MCP-DISABLED document that literal is the INVERSE of the carried state. Window measured: `2.4`
 * ms (boot) / `2.6` ms (MCP-disabled), `68.3` ms instrument-widened, with a compositor frame
 * delivered inside it.
 *
 * ── THE CLAUSES THIS ROW READS (each named, each a term of the assertion below) ─────────────
 *  (1) `§2.6` item 3's dated `D-vi` note (`§3c`'s `S2-ADV-01`, `HIGH`, `HOST-FIX` + `RED-SET-FIX`):
 *      *"BEFORE ANY CARRIER ANSWER — and ON A BRIDGE REJECTION — the pane paints NO `· MCP:` word
 *      and writes NO `data-state` PROP."* — `D-vi` names THE PROP, not only the field, and
 *      `§2.6` item 3's own words declare `cfg.exclusion` NULLABLE with `null` as the *"no reading
 *      yet"* state.
 *  (2) `§2.6` item 1(b): the toggle's `data-state` prop and its affordance word *"must come from
 *      the boolean-fed carrier member"*.
 *  (3) `§3.2` `FS-T4-13` + the dated note BESIDE it: a `data-state` PROP written before the
 *      carrier has answered is a **FAILING** row.
 *
 * ── THE MECHANISM, AT THE BYTES (a cited reading, not an expectation) ───────────────────────
 * The `null` arm of `syncConfig` pushes only `content: ''` for the toggle — it clears the
 * AFFORDANCE WORD and writes NO prop — while the AUTHORED ENVELOPE NODE still declares
 * `props: { id: 'exclusion-toggle', 'data-state': 'mcp-enabled' }`
 * (`src/renderer/secure-panels.ts:227`), and nothing clears or removes that PROP. So the pane
 * paints no state of its OWN and the surface it mounts still does. `D-vi`'s own words name the
 * PROP, not only the field.
 *
 * ── THE STATES THIS ROW ENUMERATES, BEFORE THE DRIVES (`§3.1`/`§3.2` vocabulary) ─────────────
 *  `F1-S1` **NO CARRIER AT ALL** — `window.provident.security` ABSENT: the pane's declared
 *          `refresh()` skips the read entirely and `cfg.exclusion` stays at its declared `null`.
 *  `F1-S2` **A BRIDGE THAT REJECTS** — `get()` throws (`S2-ADV-01` limb (c); the swallow at
 *          `secure-panels.ts:462-464`), so no reading was taken this turn.
 *  `F1-S3` **THE FIRST PAINT, DRIVEN SYNCHRONOUSLY** — see the layer note below.
 *  `F1-S4` **A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER** — the pane's own declared
 *          `undefined`-counts-as-`null` arm.
 *  `F1-CTL` **THE INVERSE, CARRIER-SUPPLIED** (`CTL-6`) — `exclusion: 'mcp-disabled'` paints
 *          `data-state='mcp-disabled'`, through the SAME probe. Driven FIRST, so the four
 *          no-answer readings above are readings by a probe SEEN to read a SUPPLIED state word —
 *          and that word is the INVERSE of the authored literal, which is the whole of `F-1`.
 *  The settled states (`F1-CTL-1`..`F1-CTL-4`) are enumerated in the second row below.
 * FAIL-STATE COVERED: **`FS-T4-13`** (extended by its dated note) — the pane rendering a state the
 * carrier did not supply. `FS-T4-14`/`FS-T4-15` are NOT this row's subject.
 *
 * ── THE LAYER, AND WHAT THIS ROW DOES *NOT* INSTRUMENT (stated, never hidden) ───────────────
 * This is a `[T]` row. **THE CLOSEST `[T]` SHAPE OF THE LIVE FIRST PAINT IS DRIVEN HERE, AND IT
 * IS `F1-S3`:** `src/renderer/renderer.ts:643` calls `void panels.refresh()` **UN-AWAITED** while
 * `:645` calls `refreshDebug(runtime)` **synchronously in the same turn**, so `syncConfig()` — and
 * therefore the null arm — runs with NO reading taken. `F1-S3` drives exactly that: the pane is
 * constructed, `refreshDebug(runtimeStub)` is called SYNCHRONOUSLY (no carrier, no await), and the
 * node is read. `F1-S1`/`F1-S2` drive the same arm through `refresh()`'s two no-answer paths.
 * **WHAT IS NOT REPRODUCIBLE AT `[T]`, AND WHERE IT IS CARRIED:** the DOCUMENT-START/TIMING half —
 * the `2.4`/`2.6` ms window and the compositor frame delivered inside it — needs a real document,
 * a real first paint and an injection-time observer. **THE LIVE ROW THAT CARRIES THAT HALF IS THE
 * GATE-6 RECORD'S `U-1` (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§3`), currently
 * `FAIL`**, and its falsifier is quoted above. No `[U]` claim is made or moved by this file
 * (`§1.4` item 3: no timing figure is claimed; every drive asserts SOURCE, ORDER and OUTCOME).
 *
 * ── THE REGISTER, AND WHY NO TERM MOVES IN THIS PASS ─────────────────────────────────────────
 * `§5.5.1` row 6 (`P-T4-IM-3`, `S-T4-PANE-1`, term `10 = 4 + 6`) IS the pane's fabrication row, and
 * NOT ONE of its six FABRICATION drives reads the PRE-CARRIER shape: FABRICATION 2 drives the
 * pane's own PRIOR state, FABRICATION 4 the affordance substitution. **THAT GAP IS WHY THE
 * REGISTER READ `112/112 held` WHILE THE LIVE BATTERY CAUGHT THIS.** A row-6 term `10 → 11` would
 * move the file's DECLARED total `112 → 113`, i.e. a SPEC-OWNED cell (`§5.5.1`'s declared
 * arithmetic, `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`), so **THIS PASS MOVES NO DECLARED TERM
 * AND TOUCHES NO REGISTER BYTE**; the re-grain is recorded here as OWED, WITH ITS ARITHMETIC
 * (`P-T4-IM-3 10 → 11 ⇒ 112 → 113`), to the supervisor's ruling — the same authority that owns
 * every other register re-grain of this unit.
 *
 * ⟶ ANNOTATED BESIDE `2026-10-11` (THE OWED RE-GRAIN HAS LANDED — `RCA-8(d)`: the paragraph
 * ABOVE STANDS, all of it, and this note is inserted BESIDE it, never over it). **THE RULING THE
 * PASS ABOVE DEFERRED HAS BEEN GIVEN AND EXECUTED IN THE SAME `2026-10-11` WAVE**, so the
 * paragraph's closing clause (*"THIS PASS MOVES NO DECLARED TERM AND TOUCHES NO REGISTER BYTE"*)
 * is a record of THAT pass and MUST NOT BE READ AS THE CURRENT STATE: `§5.5.1` row 6
 * (`P-T4-IM-3`, `S-T4-PANE-1`) now DECLARES **`11 = 10 (as filed) + 1`**, the register's declared
 * total is **`113 = 12 + 10 + 12 + 8 + 14 + 11 + 10 + 20 + 8 + 8`** (`P-IM 47` · `P-SM 10` ·
 * `P-TP 56`, `47 + 10 + 56 = 113`), and the eleventh drive it counts is an entry of that row's OWN
 * `drives` array in this file (the PRE-CARRIER family, `...preCarrierPaneDrives()`), with
 * `REGISTER_OWNED_TERMS` in the register harness standing EMPTY. **BOTH EARLIER FORMS STAY WAKE
 * AND PRINTED:** the filing's `108 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 16 + 8 + 8` (the spec gate)
 * and the gate-4 re-grain's `112 = 12 + 10 + 12 + 8 + 14 + 10 + 10 + 20 + 8 + 8` (row 8's four
 * `D-i`…`D-iv` terms) — the `112 → 113` movement is row 6's `+ 1`, caused by `F-1`, the gate-6
 * live finding this whole block is authored from. NO term, row, strategy id or cap is dropped,
 * merged or re-worded by the relocation.
 * ========================================================================================= */
describe('S2 GATE-6 `F-1` — THE PANE\'S RE-SOURCE TO THE HOLDER IS TOTAL: no AUTHORED state literal may stand in for a reading the carrier never supplied', () => {
  const STATE_WORDS: readonly string[] = [STATE_MCP_ENABLED, STATE_MCP_DISABLED]
  const MCP_WORD = /· MCP:\s*(?:enabled|disabled)/
  const AFFORDANCE_WORD = /Disable MCP|Enable MCP/
  /** `refreshDebug`'s own runtime stub — the synchronous first-paint driver. The pane reads ONLY
   *  `renderedHtmlResult()` from its runtime, so the stub carries exactly that one member. */
  const runtimeStub = {
    renderedHtmlResult: () => ({
      census: { inTree: 0, registered: 0, unplaced: 0, destroyed: 0, prototypes: 0 },
      ssrHtml: '',
    }),
  }

  it('F-1 · NO `data-state` PROP BEFORE A CARRIER ANSWER (`§2.6` item 3\'s `D-vi` · item 1(b) · `§3.2` `FS-T4-13`): the AUTHORED ENVELOPE LITERAL may not stand in for a reading that does not exist — in four no-answer states, DRIVEN', async () => {
    /* ── THE IN-ROW CONTROL (`CTL-6`), DRIVEN FIRST: the SAME probe reads a CARRIER-SUPPLIED word,
     * and that supplied word is the INVERSE of the authored literal — so the readings below are
     * SOURCE readings, and no repair may satisfy this row by blanking the prop forever. */
    expect(STATE_WORDS, 'CONTROL: the clause\'s closed STATE-WORD pair — the only two words a `data-state` may ever carry — and the AUTHORED literal is one of them').toEqual([STATE_MCP_ENABLED, STATE_MCP_DISABLED])
    const supplied = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(panePropOf(supplied.panels, 'exclusion-toggle', 'data-state'), 'CONTROL (`CTL-6`): a CARRIER-SUPPLIED `exclusion: mcp-disabled` paints the SUPPLIED word, through the same probe — the INVERSE of the authored literal').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(supplied.panels, 'exclusion-toggle'), 'CONTROL: and the carrier-supplied affordance word is painted').toMatch(AFFORDANCE_WORD)

    const readings: Array<{ state: string; prop: unknown; status: string; affordance: string }> = []
    const readOf = (state: string, panels: SecurePanels): void => {
      readings.push({
        state,
        prop: panePropOf(panels, 'exclusion-toggle', 'data-state'),
        status: paneTextOf(panels, 'security-status'),
        affordance: paneTextOf(panels, 'exclusion-toggle'),
      })
    }

    /* `F1-S1` — NO CARRIER AT ALL: `window.provident.security` is ABSENT, so the pane's declared
     * read is skipped entirely and `cfg.exclusion` stays at its declared `null` ("no reading
     * yet"). */
    ;(globalThis as unknown as { window?: unknown }).window = {}
    const s1 = new SecurePanels(mountEl() as never)
    await s1.refresh()
    readOf('F1-S1', s1)

    /* `F1-S2` — A BRIDGE THAT REJECTS (`S2-ADV-01` limb (c)): no reading was TAKEN this turn. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    const s2 = new SecurePanels(mountEl() as never)
    await s2.refresh()
    readOf('F1-S2', s2)

    /* `F1-S3` — THE FIRST PAINT, DRIVEN SYNCHRONOUSLY: the `[T]` shape of the live sequence
     * (`renderer.ts:643`'s UN-AWAITED `void panels.refresh()` beside `:645`'s synchronous
     * `refreshDebug(runtime)` in the SAME TURN) — `syncConfig()` runs with NO reading taken. */
    const s3 = new SecurePanels(mountEl() as never)
    s3.refreshDebug(runtimeStub)
    readOf('F1-S3', s3)

    /* `F1-S4` — A CARRIER ANSWER THAT OMITS THE `exclusion` MEMBER (the declared
     * `undefined`-counts-as-`null` arm). */
    const omittingExclusion: Record<string, unknown> = { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, read: null }
    const s4 = await mountPaneFor(omittingExclusion)
    readOf('F1-S4', s4.panels)

    /* ── THE LANDED HALF OF `D-vi`, ASSERTED PER STATE, AND IT HOLDS ON TODAY'S BYTES: the
     * `· MCP:` word and the affordance word are NOT painted before a carrier answer. That is what
     * makes the red below ATTRIBUTABLE TO THE PROP ALONE — the FIELD-default repair landed; the
     * AUTHORED NODE's literal did not move with it. */
    for (const r of readings) {
      expect(r.status, `${r.state} — the \`· MCP:\` WORD is not painted before a carrier answer (measured line: "${r.status}")`).not.toMatch(MCP_WORD)
      expect(r.affordance, `${r.state} — nor is the AFFORDANCE WORD (measured: "${r.affordance}")`).not.toMatch(AFFORDANCE_WORD)
    }
    /* THE FIDELITY ANCHOR — the `[T]` shape of `F1-S1` reproduces the LIVE record's own pre-carrier
     * `statusText` VERBATIM (`docs/specs/tier4-arbitrary-storage-live-battery.md` `§3` `U-1`), so
     * the four readings below are the same paint the live observer caught, measured one layer
     * down. */
    expect(readings[0].status, 'THE FIDELITY ANCHOR: `F1-S1` reproduces the live record\'s pre-carrier `statusText` VERBATIM — the same paint, read at the node layer').toBe('token: (none) · enabled: [read, dispatch] · journal: ∞')

    /* ── THE RED (all FOUR no-answer states measured in ONE reading, so a first failure hides
     * none of them): NO `data-state` PROP BEFORE A CARRIER ANSWER. The expected reading is the
     * clause's own — `D-vi`: *"writes NO `data-state` PROP"* — so an absent prop is the term, and
     * NEITHER state word is admitted (an authored `mcp-enabled` is the INVERSE of the carried
     * state in the MCP-DISABLED case: the live record's own figure). */
    expect(
      readings.map((r) => `${r.state}: ${JSON.stringify(r.prop)}`),
      'NO AUTHORED STATE LITERAL BEFORE A CARRIER ANSWER — `§2.6` item 3\'s `D-vi` ("BEFORE ANY CARRIER ANSWER … writes NO `data-state` PROP"), `§2.6` item 1(b) (the prop "must come from the boolean-fed carrier member"), `§3.2` `FS-T4-13`. Expected every no-answer state to write NO prop at all (`undefined`); what stands there instead is the AUTHORED ENVELOPE LITERAL `\'mcp-enabled\'` (`src/renderer/secure-panels.ts:227`), the one thing the `null` arm never clears — it clears the affordance WORD and writes no prop. The clause admits NEITHER state word, and the value is measured, never inferred.',
    ).toEqual(['F1-S1: undefined', 'F1-S2: undefined', 'F1-S3: undefined', 'F1-S4: undefined'])
  })

  it('F-1-CTL · THE SETTLED PATH IS UNCHANGED (the non-vacuity control for `F-1`): a successful carrier answer paints the CARRIER\'s value at BOTH cells — so the repair may NOT be "stop painting the toggle" — and the refusal segment is present IFF `read` is non-null', async () => {
    /* `F1-CTL-1` — OPEN, `read: null` (the steady open pair): BOTH cells carry the carrier. */
    const open = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(panePropOf(open.panels, 'exclusion-toggle', 'data-state'), 'CELL 1 (`§2.6` item 1(b)): the toggle\'s `data-state` carries the CARRIER\'s value').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(open.panels, 'security-status'), 'CELL 2: the `MCP:` segment carries the SAME reading').toContain('· MCP: disabled')
    expect(paneTextOf(open.panels, 'exclusion-toggle'), 'and the affordance word follows it').toContain('Enable MCP')
    expect(paneTextOf(open.panels, 'security-status'), '`read: null` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-2` — CLOSED with the refusal (the SAME two cells, the INVERSE value — DRIVEN, never
     * inferred: this is the value pair the `F-1` finding turns on). */
    const closed = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    expect(panePropOf(closed.panels, 'exclusion-toggle', 'data-state'), 'the INVERSE value, driven from the carrier').toBe(STATE_MCP_ENABLED)
    expect(paneTextOf(closed.panels, 'security-status')).toContain('· MCP: enabled')
    expect(paneTextOf(closed.panels, 'exclusion-toggle')).toContain('Disable MCP')
    expect(paneTextOf(closed.panels, 'security-status'), 'the segment is PRESENT iff `read` is non-null').toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-3` — the SAME pane, re-refreshed with the OTHER carrier value (the re-source
     * driven, `CTL-5`'s own subject): the two cells move TOGETHER, and the segment leaves with the
     * refusal. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...carrierRecord(STATE_MCP_DISABLED, null) }) } } }
    await closed.panels.refresh()
    expect(panePropOf(closed.panels, 'exclusion-toggle', 'data-state'), 'the pane re-sources from the CARRIER — never from its own prior value, never from a literal').toBe(STATE_MCP_DISABLED)
    expect(paneTextOf(closed.panels, 'security-status'), 'and BOTH cells moved together').toContain('· MCP: disabled')
    expect(paneTextOf(closed.panels, 'security-status'), '`read` is null again ⇒ the segment is gone').not.toContain(REFUSAL_SEGMENT)

    /* `F1-CTL-4` — THE DECLARED RETENTION ACROSS A BRIDGE ERROR (`§2.6` item 3's own reading of the
     * as-filed *"absent means the last observed read was performed"*: *"the last value it WAS TOLD
     * stays on screen"*), which `§3.2` `FS-T4-13`'s dated note declares NOT A FAILURE. **THE LIMIT
     * OF THIS ARM, NAMED:** the note makes RETENTION of a CARRIER-SUPPLIED value not-a-failure, so
     * this row does NOT require the prop to be retained; what it requires is that the AUTHORED
     * LITERAL is not what stands there — the two admitted readings are the last CARRIER-SUPPLIED
     * value or an absent prop. */
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => { throw new Error('bridge down') } } } }
    await closed.panels.refresh()
    expect(paneTextOf(closed.panels, 'security-status'), 'the last CARRIER-SUPPLIED reading stays on the line — and it is `mcp-disabled`, NOT the authored literal').toContain('· MCP: disabled')
    const retained = panePropOf(closed.panels, 'exclusion-toggle', 'data-state')
    expect([STATE_MCP_DISABLED, undefined], `the prop carries the last CARRIER-SUPPLIED value or is ABSENT — never the AUTHORED literal (measured: ${JSON.stringify(retained)}; the authored literal is ${STATE_MCP_ENABLED}, which is the value \`F-1\` measures in the no-answer states)`).toContain(retained)
    expect([STATE_MCP_DISABLED, undefined], `CONTROL: NEITHER admitted reading is the AUTHORED literal — \`${STATE_MCP_DISABLED}\` and an absent prop are BOTH distinct from \`${STATE_MCP_ENABLED}\`, which is the value \`F-1\` measures in its four no-answer states`).not.toContain(STATE_MCP_ENABLED)
  })
})
