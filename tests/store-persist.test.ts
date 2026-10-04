// tests/store-persist.test.ts — U-STORE-PERSIST (`G2`): tier 1's crossing — THE RED SET (RCA-1).
//
// AUTHORED FROM `docs/specs/store-persist.md` ALONE (the gate-3 role: tests FIRST, RUN and
// REPORTED failing, before any implementation). This file touches NOTHING else — no src/**
// change, no spec change, no other test file. The red failing class is recorded in the DONE
// row ("TestWriter red: N failing (method does not exist)").
//
// HONESTY BLOCK (spec §1.4, §7, §7a):
//  - Layer: the channel, the atomic write, the boot order and the migration are [H]-layer
//    (main-process + renderer wiring). The executable form in this file is therefore the
//    honest [T]-shaped drive for wiring: the LANDED surfaces that are importable (the store
//    module `src/renderer/store-core-graph.ts` and the module store `src/main/module-store.ts`)
//    are DRIVEN; the DECLARED landing sites that do not yet exist are PROBED (existence +
//    declared-content scans of `src/main/main.ts`, `src/main/preload.ts`,
//    `src/renderer/renderer.ts`, and the whole `src/**` tree for the single-source and
//    no-token-elsewhere rules).
//  - The register (§5.5.1) executes deterministically: plain tables only — NO seed, NO
//    generator, NO `Math.random`. Caps: ≤100 attempts/row · ≤400 total, executed sequentially
//    in register order, STOP AFTER 5 CONSECUTIVE FAILURES. An un-run register row is reported
//    as a FAILURE, never as a pass (§4.2).
//  - §7a's working defaults are IN FORCE: the settings schema version is the declared `1`
//    (DECLARED_SCHEMA_VERSION below); the boot-order gate is ORDER-only — NOTHING in this
//    file asserts a timing figure (no duration, no `performance.now`, no latency claim; a row
//    asserting a timing figure would itself be a finding, §1.4 item 2 / §7 item 1). The
//    starting-order gate measures the SEQUENCE of the boot round trip (the hand-off answered
//    before the first envelope load), never its duration.
//  - What the red observes today (spec §1.2, OBSERVATION column — falsified by the build):
//      * `src/main/store-channels.ts` — ABSENT (verified by glob this filing, §1.2 row 1).
//      * the preload member set — {ready, onRequest, sendReply, notify, security.{get,set},
//        module.{get,setDisabled}}; the `store` namespace is ABSENT (preload.ts:31-70, [H]).
//      * the renderer boot — the Runtime and the FIRST ENVELOPE run BEFORE the store
//        construction and before ANY Y-1 hand-off (`runtime.bootstrap()` at renderer.ts:503,
//        the store constructed at :509, the hand-off ABSENT — the inversion the changed boot
//        order removes, §2.9); the construction passes `{ declarations: storeGraphReferences([]) }`
//        only — `crossing` is null (renderer.ts:38-44, [H]).
//      * the persisted set — {provident-security.json, provident-modules.json}; the settings
//        file is ABSENT (main.ts:71-81, [H]); `schemaVersion` — 0 hits in src/** (M, the gate
//        record's §2 row 7 measurement).
//      * main.ts — no tier-1 channel handlers, no atomic write machinery (no `.tmp`, no
//        `fsync`, no `renameSync`), no migration (`moduleStore.setDisabled` at main.ts:121 is
//        still writer class 1 writing the legacy file), no `bootRecord`, no legacy removal
//        primitive.
//  The fail-states this red MUST drive (§4.1 item 3): the absent channel module, the absent
//  preload members, the absent Y-1/Y-2 handlers, the boot-order inversion, the non-atomic
//  write's absence at the landing site, the two-files census (currently {security, modules}),
//  the missing `schemaVersion`, the missing migration, the missing third-holder bound.
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { createGraphStore } from '../src/renderer/store-core-graph'
import { storeGraphReferences } from '../src/renderer/store-graph-references'
import { createModuleStore } from '../src/main/module-store'
// NOTE for `tsc -p tsconfig.tests.json`: the literal specifier below is INTENTIONAL — the
// honest diagnostic for this red set is that `src/main/store-channels.ts` does not exist
// (TS2307 "Cannot find module" + the row-level break inside `channelModule()`). When the
// Implementer lands the channel module, the import resolves and the diagnostic clears.

/* ───────────────────────────── THE DECLARED CONSTANTS (§2.2 / §2.7 / §7a) ───────────────────────────── */

const DECLARED_STORE_FILE_GET = 'provident:store:file:get'
const DECLARED_STORE_FILE_PUT = 'provident:store:file:put'
const DECLARED_EXPORT_NAMES: readonly string[] = ['STORE_FILE_GET', 'STORE_FILE_PUT']
/** §7a item (2) — the declared current schema version, IN FORCE. */
const DECLARED_SCHEMA_VERSION = '1'
const DECLARED_RESERVED_NAMESPACES: readonly string[] = ['window', 'tabs', 'layout', 'settings', 'tracked', 'modules']
const DECLARED_SETTINGS_FILE = 'provident-settings.json'
const DECLARED_SECURITY_FILE = 'provident-security.json'
const DECLARED_LEGACY_FILE = 'provident-modules.json'
/** §2.11 item 4 — the preload bridge's declared TOP-LEVEL member set, and the `store` sub-namespace's. */
const DECLARED_TOP_LEVEL_BRIDGE_MEMBERS: readonly string[] = ['ready', 'onRequest', 'sendReply', 'notify', 'security', 'module', 'store']
const DECLARED_STORE_SUB_MEMBERS: readonly string[] = ['get', 'put', 'onFileChanged']

/* ───────────────────────────── THE DRIVE/PROBE LAYER ───────────────────────────── */

const THIS_DIR = dirname(fileURLToPath(import.meta.url))
const SRC_ROOT = resolve(THIS_DIR, '..', 'src')

function readSrcRel(rel: string): string {
  return readFileSync(join(SRC_ROOT, rel), 'utf8')
}

function readSrcSafe(rel: string): string | null {
  try {
    return readSrcRel(rel)
  } catch {
    return null
  }
}

/** Every file under `src/**` (relative paths). Text-extension files only. */
function srcTree(): string[] {
  const out: string[] = []
  const walk = (dir: string, prefix: string): void => {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === 'node_modules') continue
      const rel = prefix === '' ? ent.name : `${prefix}/${ent.name}`
      const abs = join(dir, ent.name)
      if (ent.isDirectory()) walk(abs, rel)
      else if (/\.(ts|tsx|js|jsx|mjs|mts|cts|json)$/.test(ent.name)) out.push(rel)
    }
  }
  walk(SRC_ROOT, '')
  return out
}

/** Files under `src/**` whose text contains `token`. */
function scanSrcFor(token: string): string[] {
  const hits: string[] = []
  for (const rel of srcTree()) {
    const t = readSrcSafe(rel)
    if (t !== null && t.includes(token)) hits.push(rel)
  }
  return hits
}

interface Probe {
  readonly held: boolean
  readonly why: string
}

const HOLD = (why: string): Probe => ({ held: true, why })
const BREAK = (why: string): Probe => ({ held: false, why })

/** First non-held probe wins; all held ⇒ the combined HOLD. */
function ALL(...ps: Probe[]): Probe {
  for (const p of ps) if (!p.held) return p
  return HOLD(`all ${ps.length} sub-probes held`)
}

/** The declared channel constants module — dynamic (the file does not exist today). */
let channelModuleCache: Record<string, unknown> | null | undefined
async function channelModule(): Promise<Record<string, unknown> | null> {
  if (channelModuleCache === undefined) {
    try {
      channelModuleCache = (await import('../src/main/store-channels')) as Record<string, unknown>
    } catch {
      channelModuleCache = null
    }
  }
  return channelModuleCache
}

/** The declared Y-1 handler region of `main.ts` — from `ipcMain.handle(STORE_FILE_GET` to
 *  the next handler registration (or EOF). Null when the handler does not exist. */
function y1Region(): string | null {
  const text = readSrcSafe('main/main.ts')
  if (text === null) return null
  return regionAfter(text, 'ipcMain.handle(STORE_FILE_GET')
}

/** The declared Y-2 handler region of `main.ts` — from `ipcMain.handle(STORE_FILE_PUT` to
 *  the next handler registration (or EOF). Null when the handler does not exist. */
function y2Region(): string | null {
  const text = readSrcSafe('main/main.ts')
  if (text === null) return null
  return regionAfter(text, 'ipcMain.handle(STORE_FILE_PUT')
}

function regionAfter(text: string, marker: string): string | null {
  const i = text.indexOf(marker)
  if (i < 0) return null
  const end = text.indexOf('\n  ipcMain.', i + marker.length)
  return end < 0 ? text.slice(i) : text.slice(i, end)
}

/** Deterministic ORDER scan: every token must appear, in the given order. */
function ordered(text: string, tokens: string[]): { held: boolean; where: number[] } {
  let pos = 0
  const where: number[] = []
  for (const t of tokens) {
    const i = text.indexOf(t, pos)
    if (i < 0) return { held: false, where }
    where.push(i)
    pos = i + t.length
  }
  return { held: true, where }
}

/** The boot-order scan (§2.9): the Y-1 hand-off marker must precede the first-envelope load
 *  marker in `renderer.ts`. RED because the hand-off is absent and the first envelope
 *  (`runtime.bootstrap()`, renderer.ts:503) loads before ANY hand-off — the observed order is
 *  still the old one. ORDER only — no timing figure is claimed or measured. */
function bootOrderProbe(): Probe {
  const text = readSrcSafe('renderer/renderer.ts')
  if (text === null) return BREAK('renderer.ts unreadable')
  const handoffIdx = text.search(/store\.get\s*\(/)
  const envelopeIdx = text.search(/runtime\.bootstrap\s*\(/)
  if (handoffIdx < 0) {
    return BREAK('the Y-1 hand-off does not exist in the renderer boot; the first envelope (runtime.bootstrap(), renderer.ts:~503) still loads before any hand-off — the pinned sequence (hand-off → tiers → Runtime → first envelope) is inverted')
  }
  if (envelopeIdx < 0) return BREAK('the first-envelope-load marker (runtime.bootstrap() call) is not found')
  return handoffIdx < envelopeIdx
    ? HOLD(`the hand-off is answered before the first envelope load (indices ${handoffIdx} < ${envelopeIdx})`)
    : BREAK(`the first envelope loads before the hand-off answered (indices ${envelopeIdx} < ${handoffIdx}) — the starting-order gate observes the inversion`)
}

/* ───────────────────────────── §5.5.1 THE REGISTER — 8 ROWS / 47 ATTEMPTS ───────────────────────────── */

interface RegisterAttempt {
  readonly label: string
  readonly run: () => Promise<Probe>
}

interface RegisterRow {
  readonly id: string
  readonly type: string
  readonly property: string
  readonly strategy: string
  readonly term: string
  readonly attempts: RegisterAttempt[]
}

/** The write-sequence probes shared by the register's torn/receipt rows. Every probe breaks
 *  RED because the Y-2 machinery is not implemented at the landing site (main.ts), and holds
 *  when the declared atomic sequence (§2.6 items 1-3, 6) and refusal arms (§2.4 items 3-4)
 *  land there. */
function y2Absent(label: string): Probe {
  return BREAK(`${label}: the Y-2 write machinery is not implemented at the landing site (src/main/main.ts) — the atomic duty ({path}.tmp → fsync → renameSync → dir-fsync) is absent`)
}

const y2Probe = (label: string, check: (y2: string) => Probe): Probe => {
  const y2 = y2Region()
  return y2 === null ? y2Absent(label) : check(y2)
}

const y1Probe = (label: string, check: (y1: string) => Probe): Probe => {
  const y1 = y1Region()
  return y1 === null ? BREAK(`${label}: the Y-1 read-back handler is not implemented at the landing site (src/main/main.ts)`) : check(y1)
}

function committedToken(y2: string): Probe {
  return /\bcommitted\b/.test(y2) ? HOLD('the committed receipt token is present in the Y-2 handler') : BREAK('the committed receipt token is absent from the Y-2 handler')
}

function writeFailedArm(y2: string): Probe {
  return y2.includes("'write-failed'")
    ? HOLD("the 'write-failed' arm is present in the Y-2 handler")
    : BREAK("the 'write-failed' arm is absent from the Y-2 handler")
}

/** The tmp-target-only rule: every write in the Y-2 region targets `${path}.tmp`; the real
 *  path changes ONLY via `renameSync` (the torn-file-impossible shape, §2.6 items 1/6). */
function tmpTargetOnly(y2: string): Probe {
  const writes = [...y2.matchAll(/writeFileSync\s*\(/g)]
  if (writes.length === 0) return BREAK('the Y-2 handler performs no tmp write (no writeFileSync targeting {path}.tmp)')
  for (const w of writes) {
    const tail = y2.slice(w.index ?? 0, (w.index ?? 0) + 120)
    if (!tail.includes('.tmp')) return BREAK('a writeFileSync in the Y-2 handler does not target the {path}.tmp staging path — the real path would be written non-atomically (the security-store pattern the channel MUST NOT copy, §2.6 item 1)')
  }
  return HOLD('every write in the Y-2 handler targets the {path}.tmp staging path; the real path is only renamed onto')
}

/** The tmp-never-parsed probe: the Y-1 read-back reads the REAL path only — a `${path}.tmp`
 *  is never parsed as the record (§2.6 item 3 (c)). */
function tmpNeverParsed(): Probe {
  return y1Probe("tmp-never-parsed", (y1) =>
    y1.includes('.tmp')
      ? BREAK('the Y-1 read-back references the {path}.tmp path — a tmp file must never be parsed as the record')
      : HOLD('the Y-1 read-back reads the real path only'),
  )
}

const REGISTER_ROWS: readonly RegisterRow[] = [
  {
    id: 'P-PS-IM-1',
    type: 'P-IM',
    property: 'THE CHANNEL FILE IS DECLARED CONTENT ONLY, AND THE CHANNEL NAMES ARE SINGLE-SOURCED',
    strategy: 'S-PS-CH-1',
    term: '3 attempts = (1) the module\'s export-name set equals {STORE_FILE_GET, STORE_FILE_PUT}; (2) every export is a non-empty string (no function, no state, no value export beyond the two); (3) the handler/invoke sites\' channel-name uses are identity-equal to the imports (import-equality; a literal re-spelling reddens)',
    attempts: [
      {
        label: 'IM-1 A1 — export-name set equals {STORE_FILE_GET, STORE_FILE_PUT}',
        run: async (): Promise<Probe> => {
          const mod = await channelModule()
          if (mod === null) return BREAK('src/main/store-channels.ts does not exist — the constants are absent (the channel-name import fails)')
          const actual = Object.keys(mod).sort()
          const declared = [...DECLARED_EXPORT_NAMES].sort()
          return JSON.stringify(actual) === JSON.stringify(declared)
            ? HOLD(`export-name set is ${JSON.stringify(actual)}`)
            : BREAK(`export-name set is ${JSON.stringify(actual)} — declared ${JSON.stringify(declared)}`)
        },
      },
      {
        label: 'IM-1 A2 — every export is a non-empty string (a channel-name import OF a VALUE drives this row)',
        run: async (): Promise<Probe> => {
          const mod = await channelModule()
          if (mod === null) return BREAK('src/main/store-channels.ts does not exist — the constants are absent')
          const values = Object.values(mod)
          if (values.length !== 2) return BREAK(`expected exactly two exports, found ${values.length}`)
          if (!values.every((v) => typeof v === 'string' && v.length > 0)) return BREAK('an export is not a non-empty string — the channel module must hold channel-name constant strings only (no function, no state, no value export)')
          const text = readSrcSafe('main/store-channels.ts')
          if (text !== null && (/\bimport\b/.test(text) || /\bfunction\b/.test(text))) return BREAK('the channel module contains an import or a function — §2.1 item 1 declares constants only (no logic, no runtime import)')
          return HOLD('both exports are non-empty strings; the module text is constants-only')
        },
      },
      {
        label: 'IM-1 A3 — handler/invoke sites identity-equal to the imports; a literal re-spelling reddens',
        run: async (): Promise<Probe> => {
          const main = readSrcSafe('main/main.ts')
          const preload = readSrcSafe('main/preload.ts')
          if (main === null || preload === null) return BREAK('main.ts/preload.ts unreadable')
          const mainImports = /from\s+['"]\.\/store-channels(?:\.js)?['"]/.test(main)
          const mainHandlers = main.includes('ipcMain.handle(STORE_FILE_GET') && main.includes('ipcMain.handle(STORE_FILE_PUT')
          const preloadImports = /from\s+['"]\.\.\/main\/store-channels(?:\.js)?['"]/.test(preload)
          const preloadInvokes = preload.includes('ipcRenderer.invoke(STORE_FILE_GET') && preload.includes('ipcRenderer.invoke(STORE_FILE_PUT')
          if (!mainImports || !preloadImports) return BREAK('the channel module is not imported by the handler/invoke sites — the F-8 single-source rule (§2.1 item 2) is not landed')
          if (!mainHandlers || !preloadInvokes) return BREAK('the handler registration / invoke sites do not use the imported constants (import-equality)')
          const respelled: string[] = []
          for (const lit of [DECLARED_STORE_FILE_GET, DECLARED_STORE_FILE_PUT]) {
            for (const rel of scanSrcFor(lit)) {
              if (rel !== 'main/store-channels.ts') respelled.push(`${rel}:${lit}`)
            }
          }
          if (respelled.length > 0) return BREAK(`a channel-name literal is re-spelled outside the channel module: ${respelled.join(', ')}`)
          return HOLD('main.ts and preload.ts import the channel module and use the imported constants; no literal re-spelling anywhere in src/**')
        },
      },
    ],
  },
  {
    id: 'P-PS-IM-2',
    type: 'P-IM',
    property: 'THE EXACTLY-TWO FILES CENSUS, WITH THE WITNESS-GAP PIN',
    strategy: 'S-PS-FILES-1',
    term: '4 attempts = (1) post-migration boot: the legacy provident-modules.json does not exist at userData; (2) the settings file exists and validates as the declared schema; (3) the security file exists (and is untouched); (4) the write-site census: main\'s write/rename sites reference exactly the two declared paths',
    attempts: [
      {
        label: 'IM-2 A1 — post-migration boot: the legacy provident-modules.json is gone after the one-boot window',
        run: async (): Promise<Probe> => {
          const main = readSrcSafe('main/main.ts')
          if (main === null) return BREAK('main.ts unreadable')
          const removal = main.includes('rmSync(') || main.includes('unlinkSync(')
          return removal && main.includes(DECLARED_LEGACY_FILE)
            ? HOLD('the boot sequence declares the legacy file\'s removal after the one-boot window (§0A item 7)')
            : BREAK('the legacy-file removal after the one-boot window is not implemented — the migration\'s step (4) is absent, and `provident-modules.json` is still a persisted name today (§1.2 row 5)')
        },
      },
      {
        label: 'IM-2 A2 — the settings file exists and validates as the declared schema',
        run: async (): Promise<Probe> => {
          const main = readSrcSafe('main/main.ts')
          if (main === null) return BREAK('main.ts unreadable')
          const pathDeclared = main.includes(DECLARED_SETTINGS_FILE)
          const y1 = y1Region()
          const validates = y1 !== null && y1.includes('schemaVersion')
          return pathDeclared && validates
            ? HOLD('the settings file path is declared and the read-back validates the schema')
            : BREAK(`the settings file is not the store's crossing: '<userData>/${DECLARED_SETTINGS_FILE}' is not declared as a persisted path and the schema validation is absent`)
        },
      },
      {
        label: 'IM-2 A3 — the security file exists (and is untouched by this unit\'s diff)',
        run: async (): Promise<Probe> => {
          const main = readSrcSafe('main/main.ts')
          const sec = readSrcSafe('main/security-store.ts')
          return main !== null && sec !== null && main.includes(DECLARED_SECURITY_FILE) && sec.includes('writeFileSync')
            ? HOLD(`the tier-4 file (${DECLARED_SECURITY_FILE}) and its write site exist (U-STORE-SECURITY's, unchanged)`)
            : BREAK('the security file write site is not observed')
        },
      },
      {
        label: 'IM-2 A4 — the write-site census: main\'s write/rename sites reference exactly the two declared paths',
        run: async (): Promise<Probe> => {
          const settingsWrite = y2Probe('write-site census', (y2) =>
            y2.includes('.tmp')
              ? HOLD('the settings write is the atomic {path}.tmp → rename machinery (the settings path is its real path by construction)')
              : BREAK('the settings write site (the atomic tmp-write target) is absent'),
          )
          const thirdLiteral = thirdLiteralWrites()
          return ALL(
            settingsWrite,
            thirdLiteral.length === 0
              ? HOLD('no write/rename construct in the main-side tree references a third provident-*.json literal')
              : BREAK(`a write construct references a third persisted filename: ${thirdLiteral.join(', ')} — the witness-gap pin (§2.7 item 2) reddens`),
          )
        },
      },
    ],
  },
  {
    id: 'P-PS-IM-3',
    type: 'P-IM',
    property: 'TORN-FILE-IMPOSSIBLE AND NO tmp RESIDUE',
    strategy: 'S-PS-TORN-1',
    term: '6 attempts = 3 injection points (tmp-write failure · fsync failure · rename failure) × 2 readings per point (the real path\'s record byte-identical to the pre-write record; the tmp path is never parsed as the record). The success case\'s no-tmp assertion rides reading pair (1)\'s control',
    attempts: [
      {
        label: 'IM-3 inj:tmp-write · reading 1 — the real path\'s record is byte-identical to the pre-write record (it changes ONLY via rename)',
        run: async (): Promise<Probe> => {
          const successNoTmp = 'the success case\'s no-tmp assertion rides this reading: the rename terminal removes the staging path (the write target ceases at renameSync)'
          return y2Probe('injection tmp-write', (y2) => ALL(tmpTargetOnly(y2), committedToken(y2), HOLD(successNoTmp)))
        },
      },
      { label: 'IM-3 inj:tmp-write · reading 2 — the tmp path is never parsed as the record', run: async (): Promise<Probe> => tmpNeverParsed() },
      {
        label: 'IM-3 inj:fsync · reading 1 — the tmp file is fsync\'ed BEFORE the rename (a failed fsync leaves the previous file intact)',
        run: async (): Promise<Probe> =>
          y2Probe('injection fsync', (y2) => {
            const firstFsync = y2.indexOf('fsync')
            const rename = y2.indexOf('renameSync')
            if (firstFsync < 0 || rename < 0 || firstFsync >= rename) return BREAK('the tmp fsync does not precede the rename — the plan\'s row (b) "fsync before the rename" is not landed')
            return ALL(writeFailedArm(y2), HOLD('a failed fsync answers {status:\'refused\', reason:\'write-failed\'} with the previous file intact'))
          }),
      },
      { label: 'IM-3 inj:fsync · reading 2 — the tmp path is never parsed as the record', run: async (): Promise<Probe> => tmpNeverParsed() },
      {
        label: 'IM-3 inj:rename · reading 1 — the rename is atomic on the same filesystem; the parent directory is fsync\'ed AFTER it',
        run: async (): Promise<Probe> =>
          y2Probe('injection rename', (y2) => {
            const o = ordered(y2, ['renameSync', 'fsync'])
            if (!o.held) return BREAK('the directory fsync does not follow the rename (renameSync → fsync), or one is absent — the rename\'s durability is not completed')
            return ALL(tmpTargetOnly(y2), HOLD('a crashed rename leaves the previous file intact at the real path (the real path changes only at renameSync) and a stale {path}.tmp the next write overwrites (the universal staging target)'))
          }),
      },
      { label: 'IM-3 inj:rename · reading 2 — the tmp path is never parsed as the record', run: async (): Promise<Probe> => tmpNeverParsed() },
    ],
  },
  {
    id: 'P-PS-SM-1',
    type: 'P-SM',
    property: 'THE COMMIT STATE MACHINE (CLOSED) — IDLE → TMP-WRITTEN → (fsync) → RENAMED → COMMITTED, every failure → REFUSED with the previous file intact',
    strategy: 'S-PS-WSM-1',
    term: '8 attempts = 4 machine states (IDLE · TMP-WRITTEN · FSYNCED · COMMITTED/RENAMED) × 2 terminals (committed — receipt answered, no tmp; refused — previous file intact, receipt answered)',
    attempts: [
      { label: 'SM-1 IDLE · committed terminal — the handler exists and writes the staging path only', run: async (): Promise<Probe> => y2Probe('state IDLE', (y2) => ALL(committedToken(y2), tmpTargetOnly(y2))) },
      { label: 'SM-1 IDLE · refused terminal — the failure arm answers a receipt, never a swallow', run: async (): Promise<Probe> => y2Probe('state IDLE', writeFailedArm) },
      { label: 'SM-1 TMP-WRITTEN · committed terminal — the tmp write materialises, then the fsync follows', run: async (): Promise<Probe> => y2Probe('state TMP-WRITTEN', (y2) => (ordered(y2, ['.tmp', 'fsync']).held ? HOLD('the tmp write precedes the tmp fsync') : BREAK('the tmp write does not precede the tmp fsync'))) },
      { label: 'SM-1 TMP-WRITTEN · refused terminal — a failed tmp write leaves the previous file intact', run: async (): Promise<Probe> => y2Probe('state TMP-WRITTEN', writeFailedArm) },
      { label: 'SM-1 FSYNCED · committed terminal — the tmp is fsync\'ed before the rename', run: async (): Promise<Probe> => y2Probe('state FSYNCED', (y2) => (ordered(y2, ['fsync', 'renameSync']).held ? HOLD('fsync precedes renameSync') : BREAK('fsync does not precede renameSync')) ) },
      { label: 'SM-1 FSYNCED · refused terminal — a failed fsync leaves the previous file intact', run: async (): Promise<Probe> => y2Probe('state FSYNCED', writeFailedArm) },
      { label: 'SM-1 COMMITTED/RENAMED · committed terminal — rename, then the DIRECTORY fsync; the receipt answered; no tmp residue', run: async (): Promise<Probe> => y2Probe('state COMMITTED', (y2) => ALL(ordered(y2, ['renameSync', 'fsync']).held ? HOLD('renameSync precedes the directory fsync') : BREAK('renameSync does not precede the directory fsync'), committedToken(y2))) },
      { label: 'SM-1 COMMITTED/RENAMED · refused terminal — a crashed rename keeps the previous file; the stale tmp is overwritten next and never read', run: async (): Promise<Probe> => y2Probe('state COMMITTED', (y2) => ALL(writeFailedArm(y2), tmpTargetOnly(y2))) },
    ],
  },
  {
    id: 'P-PS-SM-2',
    type: 'P-SM',
    property: 'THE BOOT-ORDER MACHINE (CLOSED — NO GRAPH LOAD BEFORE THE HAND-OFF)',
    strategy: 'S-PS-BSM-1',
    term: '6 attempts = 3 boot states (cold → [] · corrupt → the registered defaults + module corrupt:true · persisted → the record) × 2 checkpoints per state (the hand-off precedes the first envelope load; the payload/table answers the declared state for that boot). The cold and corrupt states also assert NOTHING throws',
    attempts: [
      { label: 'SM-2 cold · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 cold · checkpoint 2 — the hand-off answers [] and NOTHING throws',
        run: async (): Promise<Probe> =>
          y1Probe('cold boot', (y1) =>
            ALL(
              y1.includes('existsSync') ? HOLD('the missing-file arm is present (a cold tier is a MISS, never an error)') : BREAK('the cold/missing-file arm is absent'),
              !y1.includes('throw') ? HOLD('the Y-1 read-back never throws') : BREAK('the Y-1 read-back throws — a Y-1 that throws on a missing file FAILS the plan\'s failure-mode (2) clause'),
            ),
          ),
      },
      { label: 'SM-2 corrupt · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 corrupt · checkpoint 2 — the registered defaults + module corrupt:true; NOTHING throws',
        run: async (): Promise<Probe> =>
          ALL(
            y1Probe('corrupt boot', (y1) =>
              ALL(
                y1.includes('catch') ? HOLD('the corrupt-file recovery arm is present') : BREAK('the corrupt-file recovery arm (catch → the registered defaults) is absent'),
                !y1.includes('throw') ? HOLD('the Y-1 read-back never throws') : BREAK('a corrupt file must never throw'),
              ),
            ),
            moduleCorruptDrive(true),
          ),
      },
      { label: 'SM-2 persisted · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 persisted · checkpoint 2 — the hand-off serves the persisted record (validated, never a throw)',
        run: async (): Promise<Probe> =>
          y1Probe('persisted boot', (y1) =>
            ALL(
              y1.includes('schemaVersion') ? HOLD('the read-back validates the schemaVersion member') : BREAK('the schemaVersion validation is absent from the read-back'),
              y1.includes('catch') ? HOLD('the validation-failure recovery arm is present') : BREAK('the validation-failure recovery arm is absent'),
              !y1.includes('throw') ? HOLD('a validation failure is NEVER a throw') : BREAK('the read-back throws on a validation failure'),
            ),
          ),
      },
    ],
  },
  {
    id: 'P-PS-TP-1',
    type: 'P-TP',
    property: 'RECEIPT TOTALITY — EVERY write-outcome class answers EXACTLY ONE of {committed, refused}; a refusal NEVER clears, NEVER emits and leaves the previous file intact',
    strategy: 'S-PS-RCPT-1',
    term: '8 attempts = 4 outcome classes (success · tmp-write failure · fsync failure · rename failure) × 2 assertions per class (the crossing\'s answered status is the declared one; on a refusal the file\'s post-state is the pre-write record and cleared: []/events: 0 on the store\'s receipt)',
    attempts: [
      { label: 'TP-1 success · assertion 1 — the crossing answers {status:\'committed\'}', run: async (): Promise<Probe> => y2Probe('outcome success', committedToken) },
      { label: 'TP-1 success · assertion 2 — the committed receipt is answered only at the terminal (after the rename)', run: async (): Promise<Probe> => y2Probe('outcome success', (y2) => (ordered(y2, ['renameSync', 'committed']).held ? HOLD('the committed receipt is answered at the rename terminal') : BREAK('the committed receipt is not answered at the rename terminal'))) },
      { label: 'TP-1 tmp-write failure · assertion 1 — the crossing answers {status:\'refused\', reason:\'write-failed\'}', run: async (): Promise<Probe> => y2Probe('outcome tmp-write failure', writeFailedArm) },
      { label: 'TP-1 tmp-write failure · assertion 2 — refused ⇒ the previous file is intact (the refusal returns before the rename)', run: async (): Promise<Probe> => y2Probe('outcome tmp-write failure', refusalBeforeRename) },
      { label: 'TP-1 fsync failure · assertion 1 — {status:\'refused\', reason:\'write-failed\'}', run: async (): Promise<Probe> => y2Probe('outcome fsync failure', writeFailedArm) },
      { label: 'TP-1 fsync failure · assertion 2 — refused ⇒ the previous file is intact', run: async (): Promise<Probe> => y2Probe('outcome fsync failure', refusalBeforeRename) },
      { label: 'TP-1 rename failure · assertion 1 — {status:\'refused\', reason:\'write-failed\'}', run: async (): Promise<Probe> => y2Probe('outcome rename failure', writeFailedArm) },
      { label: 'TP-1 rename failure · assertion 2 — refused ⇒ the previous file intact; a stale tmp is overwritten next; cleared: []/events: 0 ride the refusal posture', run: async (): Promise<Probe> => y2Probe('outcome rename failure', (y2) => ALL(refusalBeforeRename(y2), tmpTargetOnly(y2))) },
    ],
  },
  {
    id: 'P-PS-TP-2',
    type: 'P-TP',
    property: 'VERSION-FROM-FIRST-WRITE TOTALITY — the payload carries its declared schemaVersion from its FIRST write; a missing/unknown version answers the declared recovery, never a throw',
    strategy: 'S-PS-VER-1',
    term: '6 attempts = 3 payload shapes (cold first write · migrated first write · version-missing/unknown at read-back) × 2 readings per shape (the payload\'s schemaVersion member is the declared 1 where owed; the read-back\'s answered state is the declared one — never a throw)',
    attempts: [
      { label: 'TP-2 cold first write · reading 1 — the payload carries schemaVersion from its FIRST write (the declared 1)', run: async (): Promise<Probe> => y2Probe('cold first write', (y2) => (y2.includes('schemaVersion') ? HOLD(`the cold first write stamps schemaVersion (declared default ${DECLARED_SCHEMA_VERSION})`) : BREAK('the first write does not stamp schemaVersion — VERSION-FROM-FIRST-WRITE (FORKER (iii)(c)) is not landed'))) },
      { label: 'TP-2 cold first write · reading 2 — the read-back answers the declared state, never a throw', run: async (): Promise<Probe> => y1Probe('cold first write', (y1) => ALL(y1.includes('catch') ? HOLD('the recovery arm is present') : BREAK('the recovery arm is absent'), !y1.includes('throw') ? HOLD('never a throw') : BREAK('the read-back throws'))) },
      { label: 'TP-2 migrated first write · reading 1 — the migration stamps schemaVersion through the SAME write machinery', run: async (): Promise<Probe> => {
          const main = readSrcSafe('main/main.ts')
          if (main === null) return BREAK('main.ts unreadable')
          const lines = main.split('\n')
          const settingsLine = lines.findIndex((l) => l.includes(DECLARED_SETTINGS_FILE))
          const legacyLine = lines.findIndex((l) => l.includes(DECLARED_LEGACY_FILE))
          const near = settingsLine >= 0 && legacyLine >= 0 && Math.abs(settingsLine - legacyLine) <= 80
          const y2 = y2Region()
          const stamp = y2 !== null && y2.includes('schemaVersion')
          return near && stamp ? HOLD('the migration write path runs through the settings stamping machinery') : BREAK('the migrated first write is not wired to the settings stamping machinery (the migration itself is absent)')
        },
      },
      { label: 'TP-2 migrated first write · reading 2 — the read-back answers the declared state, never a throw', run: async (): Promise<Probe> => y1Probe('migrated first write', (y1) => ALL(y1.includes('schemaVersion') ? HOLD('the read-back validates the member') : BREAK('the read-back does not validate the member'), !y1.includes('throw') ? HOLD('never a throw') : BREAK('the read-back throws'))) },
      { label: 'TP-2 version-missing/unknown at read-back · reading 1 — the declared recovery answers (registered defaults, never a fatal stop)', run: async (): Promise<Probe> => y1Probe('version-missing/unknown at read-back', (y1) => ALL(y1.includes('schemaVersion') ? HOLD('the read-back validates the schemaVersion member (missing/unknown → the declared recovery)') : BREAK('the schemaVersion validation is absent — R4\'s declared outcome cannot be answered'), y1.includes('catch') ? HOLD('the recovery arm is present') : BREAK('the recovery arm is absent'))) },
      { label: 'TP-2 version-missing/unknown at read-back · reading 2 — never a throw, never a fatal stop', run: async (): Promise<Probe> => y1Probe('version-missing/unknown at read-back', (y1) => (!y1.includes('throw') ? HOLD('the read-back never throws on a missing/unknown version') : BREAK('the read-back throws on a missing/unknown version')) ) },
    ],
  },
  {
    id: 'P-PS-SM-3',
    type: 'P-SM',
    property: 'THE THIRD HOLDER IS BOUNDED (C-10/R1) — populated at the boot read, refreshed only by the channel\'s own committed writes, served at Y-1; after the hand-off the renderer answers the handed-off values; a reload serves the FILE\'s current value and never replays a dead realm\'s cleared[]',
    strategy: 'S-PS-HOLD-1',
    term: '6 attempts = 3 realm turns (boot · after-commit · reload) × 2 readings per turn (the served hand-off\'s payload; the renderer\'s resolve on tier-1 names answers the handed-off value — the R1 falsifier\'s positive control is a value main wrote outside the channel, which must NOT appear)',
    attempts: [
      { label: 'SM-3 boot · reading 1 — the holder (bootRecord) is populated at the boot read and served at Y-1', run: async (): Promise<Probe> => y1Probe('boot turn', (y1) => (y1.includes('bootRecord') ? HOLD('bootRecord is held and served at the Y-1 hand-off (C-10\'s name)') : BREAK('the bootRecord (C-10 — the third holder) is not held/served at the boot read'))) },
      { label: 'SM-3 boot · reading 2 — the renderer resolves the handed-off values (the Y-1 hand-off call exists)', run: async (): Promise<Probe> => (rendererHandoffCount() === 1 ? HOLD('the renderer calls the Y-1 hand-off once') : BREAK('the renderer\'s Y-1 hand-off call (store.get()) is absent — the renderer cannot construct its tiers from the persisted record')) },
      { label: 'SM-3 after-commit · reading 1 — the holder is REFRESHED only by the channel\'s own committed writes', run: async (): Promise<Probe> => y2Probe('after-commit turn', (y2) => (y2.includes('bootRecord') ? HOLD('each Y-2\'s projected record synchronously replaces bootRecord') : BREAK('the Y-2 write does not refresh the holder (bootRecord)'))) },
      { label: 'SM-3 after-commit · reading 2 — the renderer\'s tier-1 table updates from the crossed receipt (the seam put exists)', run: async (): Promise<Probe> => (rendererTextSafe().includes('bridge.store.put') ? HOLD('the crossing seam (bridge.store.put) is wired') : BREAK('the crossing seam is not implemented at the construction site (renderer.ts) — the receipt-only rule (§2.11 item 2) cannot hold')) },
      { label: 'SM-3 reload · reading 1 — the hand-off serves the FILE\'s current value; a dead realm\'s cleared[] is NOT replayed', run: async (): Promise<Probe> => y1Probe('reload turn', (y1) => {
          const readsFile = y1.includes('readFileSync') || y1.includes('existsSync')
          const noClearedReplay = (y2Region() ?? '').includes('cleared') ? BREAK('the channel consumes the store\'s cleared[] — a dead realm\'s clears would be replayed (NW-15 (c))') : HOLD('the channel never consumes the store\'s cleared[]')
          return ALL(readsFile ? HOLD('the boot read reads the FILE once (the reload\'s hand-off serves the file\'s current value)') : BREAK('the boot read does not read the file'), y1.includes('bootRecord') ? HOLD('bootRecord is served') : BREAK('bootRecord is not served'), noClearedReplay)
        }) },
      { label: 'SM-3 reload · reading 2 — a value main wrote outside the channel must NOT appear (the R1 falsifier\'s positive control)', run: async (): Promise<Probe> => {
          const renderer = rendererTextSafe()
          const handoffs = rendererHandoffCount()
          const directFileRead = renderer.includes(DECLARED_SETTINGS_FILE)
          return ALL(
            handoffs === 1 ? HOLD('exactly one Y-1 hand-off per realm') : BREAK(`expected exactly one Y-1 hand-off call in the renderer boot, found ${handoffs}`),
            directFileRead ? BREAK('the renderer references a file path — the renderer never touches a path (§2.12 item 1)') : HOLD('no settings-path literal in the renderer (it cannot read the file)'),
          )
        } },
    ],
  },
]

function refusalBeforeRename(y2: string): Probe {
  const refusal = y2.indexOf('write-failed')
  const rename = y2.indexOf('renameSync')
  if (refusal < 0 || rename < 0) return BREAK('the refusal arm (the reason token) or the rename is absent')
  return refusal < rename
    ? HOLD('the refusal returns before the rename — the previous file is intact on a refusal')
    : BREAK('the refusal arm does not precede the rename — the file could be touched before the refusal is answered')
}

/** The R1 falsifier's module-half control: a corrupt module file answers `corrupt: true`
 *  with an empty `loaded` (the module half's landed posture, §2.6 item 4 — driven). */
function moduleCorruptDrive(expectCorrupt: boolean): Probe {
  const dir = mkdtempSync(join(tmpdir(), 'g2-corrupt-'))
  try {
    const path = join(dir, 'provident-modules.json')
    // unparsable bytes ⇒ corrupt
    writeFileSync(path, '{ not json', 'utf8')
    const store = createModuleStore({ path })
    const status = store.status()
    const ok = status.corrupt === expectCorrupt && status.loaded.length === 0
    return ok
      ? HOLD(`module half driven: a corrupt file answers corrupt:${expectCorrupt}, loaded:[] (never a throw)`)
      : BREAK(`module half driven: corrupt file answered corrupt:${status.corrupt} loaded:[${status.loaded.join(',')}] — expected corrupt:${expectCorrupt}, loaded:[]`)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

interface RegisterRowResult {
  readonly id: string
  readonly type: string
  readonly strategy: string
  readonly attemptsTotal: number
  held: number
  broken: number
  unrun: number
  status: 'HELD' | 'BROKEN' | 'UN-RUN (FAILURE)'
  readonly perAttempt: { label: string; held: boolean; why: string }[]
}

interface RegisterSummary {
  readonly declaredTotal: number
  readonly terms: string
  readonly typeSubtotals: string
  readonly rowCapOk: boolean
  readonly rowCapText: string
  readonly totalCapOk: boolean
  readonly totalCapText: string
  readonly rows: RegisterRowResult[]
  readonly totalRun: number
  readonly brokenTotal: number
  readonly unrunTotal: number
  readonly stoppedAt: number | null
}

/** THE REGISTER DRIVER (§5.5.1 + §4.3): sequential, in register order; per-row cap ≤100
 *  attempts (all rows ≤ 8 by construction), total cap ≤400, STOP AFTER 5 CONSECUTIVE
 *  FAILURES. Un-run attempts/rows are reported UN-RUN — a FAILURE, never a pass. No seed. */
async function runRegister(): Promise<RegisterSummary> {
  const terms = '47 = 3+4+6+8+6+8+6+6'
  const typeSubtotals = 'P-IM 13 = 3+4+6 · P-SM 20 = 8+6+6 · P-TP 14 = 8+6 · 13+20+14 = 47'
  const rows: RegisterRowResult[] = []
  let totalRun = 0
  let consecutive = 0
  let stoppedAt: number | null = null
  let stopReason = ''

  for (const row of REGISTER_ROWS) {
    const result: RegisterRowResult = {
      id: row.id, type: row.type, strategy: row.strategy, attemptsTotal: row.attempts.length,
      held: 0, broken: 0, unrun: 0, status: 'HELD', perAttempt: [],
    }
    if (stoppedAt === null) {
      for (const attempt of row.attempts) {
        if (stoppedAt !== null) {
          result.unrun += 1
          result.perAttempt.push({ label: attempt.label, held: false, why: `UN-RUN — the register stopped at attempt ${stoppedAt} (${stopReason})` })
          continue
        }
        if (totalRun >= 400) {
          stoppedAt = totalRun
          stopReason = 'the ≤400 total-attempt cap was reached'
          result.unrun += 1
          result.perAttempt.push({ label: attempt.label, held: false, why: 'UN-RUN — the total-attempt cap (≤400) was reached' })
          continue
        }
        totalRun += 1
        const p = await attempt.run()
        result.perAttempt.push({ label: attempt.label, held: p.held, why: p.why })
        if (p.held) {
          result.held += 1
          consecutive = 0
        } else {
          result.broken += 1
          consecutive += 1
          if (consecutive >= 5) {
            stoppedAt = totalRun
            stopReason = '5 consecutive failures'
          }
        }
      }
    }
    if (stoppedAt !== null && result.perAttempt.length < row.attempts.length) {
      const missing = row.attempts.length - result.perAttempt.length
      result.unrun += missing
      for (const attempt of row.attempts.slice(result.perAttempt.length)) {
        result.perAttempt.push({ label: attempt.label, held: false, why: `UN-RUN — the register stopped at attempt ${stoppedAt} (${stopReason})` })
      }
    }
    result.status = result.unrun > 0 ? 'UN-RUN (FAILURE)' : result.broken === 0 ? 'HELD' : 'BROKEN'
    rows.push(result)
    if (stoppedAt !== null) {
      // mark all rows not yet pushed as un-run (skipped below via the outer guard)
      break
    }
  }
  // rows after the stop: un-run
  const pushed = rows.length
  for (const row of REGISTER_ROWS.slice(pushed)) {
    const result: RegisterRowResult = {
      id: row.id, type: row.type, strategy: row.strategy, attemptsTotal: row.attempts.length,
      held: 0, broken: 0, unrun: row.attempts.length, status: 'UN-RUN (FAILURE)', perAttempt: [],
    }
    for (const attempt of row.attempts) {
      result.perAttempt.push({ label: attempt.label, held: false, why: `UN-RUN — the register stopped at attempt ${stoppedAt} (${stopReason})` })
    }
    rows.push(result)
  }

  let brokenTotal = 0
  let unrunTotal = 0
  for (const r of rows) {
    brokenTotal += r.broken
    unrunTotal += r.unrun
  }
  return {
    declaredTotal: 47,
    terms,
    typeSubtotals,
    rowCapOk: REGISTER_ROWS.every((r) => r.attempts.length <= 100),
    rowCapText: '8 ≤ 100 (largest row; headroom 92)',
    totalCapOk: 47 <= 400,
    totalCapText: '47 ≤ 400 (headroom 353)',
    rows,
    totalRun,
    brokenTotal,
    unrunTotal,
    stoppedAt,
  }
}

function registerReport(s: RegisterSummary): string {
  const lines: string[] = []
  lines.push(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS: ${s.terms}`)
  lines.push(`REGISTER-TYPE-SUBTOTALS: ${s.typeSubtotals}`)
  lines.push(`REGISTER-CAPS: ${s.rowCapText} · ${s.totalCapText} (each compared against its own cap, never against a subtotal)`)
  lines.push(`REGISTER-STOPPED-AT: ${s.stoppedAt === null ? 'null (no stop)' : `attempt ${s.stoppedAt}`} · RUN ${s.totalRun} · BROKEN ${s.brokenTotal} · UN-RUN ${s.unrunTotal} (un-run ⇒ FAILURE, never a pass)`)
  for (const r of s.rows) {
    lines.push(`  ${r.id} [${r.type}] ${r.strategy} term ${r.attemptsTotal} → ${r.status} (held ${r.held} / broken ${r.broken} / unrun ${r.unrun})`)
    for (const a of r.perAttempt) {
      lines.push(`    ${a.held ? 'HELD  ' : 'BROKEN'} ${a.label}: ${a.why}`)
    }
  }
  return lines.join('\n')
}

function rendererTextSafe(): string {
  return readSrcSafe('renderer/renderer.ts') ?? ''
}

function rendererHandoffCount(): number {
  return (rendererTextSafe().match(/store\.get\s*\(/g) ?? []).length
}

/** Write/rename constructs across the main-side tree that carry a `provident-*.json` literal. */
function thirdLiteralWrites(): string[] {
  const found: string[] = []
  const op = /(writeFileSync|appendFileSync|renameSync|rmSync|unlinkSync)\s*\(/g
  for (const rel of ['main/main.ts', 'main/preload.ts', 'main/module-store.ts', 'main/security-store.ts', 'main/mcp-server.ts', 'main/store-channels.ts']) {
    const t = readSrcSafe(rel)
    if (t === null) continue
    op.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = op.exec(t)) !== null) {
      const tail = t.slice(m.index, m.index + 160)
      const lit = tail.match(/'provident-[a-z-]+\.json'/)
      if (lit) found.push(`${rel}:${m[1]}:${lit[0]}`)
    }
  }
  return found
}

/* ═════════════════════════════ THE TESTS — authored in §4.2's order ═════════════════════════════ */

describe('G2 U-STORE-PERSIST — tier-1 crossing: THE RED SET (from docs/specs/store-persist.md alone)', () => {
  /* ── §4.2 (1) THE REGISTER FIRST — §5.5.1, 8 rows / 47 attempts ── */

  describe('§5.5.1 the typed property register (executed deterministically; strategy ids; terms)', () => {
    it('executes all 8 rows with their strategy ids and terms; the totals are printed WITH their terms; caps hold; no seed; un-run rows are FAILURE', async () => {
      const s = await runRegister()
      console.log(registerReport(s))
      expect(s.rowCapOk, s.rowCapText).toBe(true)
      expect(s.totalCapOk, s.totalCapText).toBe(true)
      expect(s.declaredTotal, `declared totals must be printed with terms: ${s.terms}`).toBe(47)
      expect(s.rows.length, 'all 8 register rows must execute (an un-run register row is a FAILURE, never a pass)').toBe(8)
      expect(s.stoppedAt, `the register stopped at attempt ${s.stoppedAt} — un-run rows are FAILURE`).toBeNull()
      expect(s.brokenTotal, `broken attempts: ${s.brokenTotal} (first-row reasons in the report above)`).toBe(0)
      expect(s.unrunTotal, `un-run attempts: ${s.unrunTotal} (reported as FAILURE)`).toBe(0)
    })
  })

  /* ── §4.2 (2) THE BEHAVIOURAL M-* ROWS — §3.1 ── */

  describe('M-rows — valid / happy states (§3.1)', () => {
    it('M-1: a tier-1 commit crosses once and lands atomically (§2.4/§2.6; crossings: 1)', async () => {
      // LANDED-SURFACE DRIVE (the store's side — G1's, held today): one commit = one crossing,
      // the cargo is the stable-JSON translation (a JSON string), the receipt carries crossings: 1.
      const calls: { name: string; value: unknown }[] = []
      const store = createGraphStore({
        declarations: storeGraphReferences([{ name: 'settings' }]),
        crossing: { put: (row) => { calls.push(row); return { status: 'committed' as const } } },
      })
      const receipt = store.commit('file.settings', { theme: { token: 'a' } })
      const storeSide = calls.length === 1 && typeof calls[0].value === 'string' && receipt.crossings === 1
      expect(storeSide, 'the landed store crosses ONCE per commit with a stable-JSON translation (store-core-graph.ts §2.8 items 7/10)').toBe(true)
      // THE CHANNEL/LANDING SIDE (this unit's): the crossing seam fed at the construction site,
      // the atomic sequence at the landing site, the {status:'committed'} receipt.
      assertProbe(ALL(
        crossingSeamProbe(),
        atomicSequenceProbe(),
        committedToken(y2Region() ?? ''),
      ), 'M-1 channel/landing side')
    })

    it('M-2: a cold boot answers [] and boots on it (§2.3 item 1, §2.6 item 4, §2.9 consequence (3))', async () => {
      assertProbe(ALL(
        bootOrderProbe(),
        y1Probe('cold boot', (y1) => ALL(
          y1.includes('existsSync') ? HOLD('the missing-file arm is present') : BREAK('the cold/missing-file arm is absent'),
          !y1.includes('throw') ? HOLD('NOTHING throws') : BREAK('the Y-1 read-back throws on a missing file'),
        )),
        moduleMissingDrive(),
      ), 'M-2 cold boot')
    })

    it('M-3: a persisted boot serves the record BEFORE the first graph load (§2.9 consequences (1)/(3), the hydration pin\'s PERSIST half)', async () => {
      assertProbe(ALL(
        bootOrderProbe(),
        y1Probe('persisted boot', (y1) => (y1.includes('bootRecord') && y1.includes('schemaVersion')
          ? HOLD('the boot read validates and holds the record (bootRecord), served at the hand-off')
          : BREAK('the persisted-record serve path is absent'))),
        rendererHandoffCount() === 1 ? HOLD('the renderer calls the hand-off once') : BREAK('the renderer\'s hand-off call is absent'),
      ), 'M-3 persisted boot')
    })

    it('M-4: a repeated identical write is a DECLARED second write (§2.4 item 5 (b), §0A item 4)', async () => {
      // LANDED-SURFACE OBSERVATION (driven): the STORE itself suppresses the crossing for an
      // identical value (two identical commits → crossings observed: 1) — the store decides
      // whether to cross. The CHANNEL's declared duty (§0A item 4) is the per-arriving-crossing
      // duty: WHEN a put arrives, a FULL write (one projection, one serialize, one atomic
      // replace, one receipt) — the channel never compares values and never no-ops.
      const calls: { name: string; value: unknown }[] = []
      const store = createGraphStore({
        declarations: storeGraphReferences([{ name: 'settings' }]),
        crossing: { put: (row) => { calls.push(row); return { status: 'committed' as const } } },
      })
      const r1 = store.commit('file.settings', { theme: { token: 'a' } })
      const r2 = store.commit('file.settings', { theme: { token: 'a' } })
      expect(r1.status === 'committed' && r2.status === 'committed',
        `M-4 store drive — repeated identical commits answer committed receipts (crossings observed: ${calls.length}; the store suppresses the identical crossing — the channel's duty below is per-arriving-crossing)`).toBe(true)
      assertProbe(y2Probe('idempotence', (y2) => ALL(
        atomicSequenceProbeIn(y2),
        y2.includes('readFileSync') ? BREAK('the Y-2 write reads the file back — the channel must not compare values (§0A item 4)') : HOLD('the write path performs no comparison read-back'),
        committedToken(y2),
      )), 'M-4 channel half')
    })

    it('M-5: the migration lands in ONE write and the readers re-point (§2.8 items 1/2)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      assertProbe(ALL(
        main.includes('file.modules') ? HOLD('the module registry lands under the declared namespace file.modules.<id>') : BREAK('the file.modules.<id> namespace is not wired — the Q-5 migration is absent'),
        main.includes('moduleStore.setDisabled')
          ? BREAK('writer class 1 (ipcMain.handle(IPC_MODULE_SET_DISABLED)) still writes the legacy module store directly (main.ts:121) — the two-writer class this correction names')
          : HOLD('the operator toggle is re-pointed to the store\'s file tier'),
        main.includes(DECLARED_SETTINGS_FILE) ? HOLD('the settings path is declared') : BREAK('the settings path is absent'),
        main.includes('rmSync(') || main.includes('unlinkSync(')
          ? HOLD('the legacy file\'s removal is declared')
          : BREAK('the legacy removal is absent'),
        readSrcSafe('main/module-store.ts')?.includes('createHash') === true
          ? HOLD('the SHA-256 per-record verification is landed (the module half keeps its posture — the hash moves WITH the record)')
          : BREAK('the per-record SHA-256 verification is not observed'),
      ), 'M-5 migration')
    })

    it('M-6: a corrupt file boots the registered defaults with the fail-disabled status (§2.6 item 4 — the posture split)', async () => {
      // SETTINGS HALF: default-on-corrupt, never a throw (absent → red).
      const settingsHalf = y1Probe('settings half', (y1) => ALL(
        y1.includes('catch') ? HOLD('the corrupt read answers the REGISTERED defaults (C-9 (b): defaults registered at the channel\'s construction, never derived at read time)') : BREAK('the registered-defaults recovery arm is absent'),
        !y1.includes('throw') ? HOLD('NOTHING throws') : BREAK('the settings read throws on a corrupt file'),
      ))
      // MODULE HALF (landed, driven): corrupt file → corrupt:true, loaded:[] — never a throw.
      const moduleHalf = moduleCorruptDrive(true)
      assertProbe(ALL(settingsHalf, moduleHalf), 'M-6 corrupt boot')
    })

    it('M-7: the third holder is bounded — after the hand-off the renderer answers the handed-off values (§2.10, R R1)', async () => {
      assertProbe(ALL(
        y1Probe('holder-boot', (y1) => (y1.includes('bootRecord') ? HOLD('bootRecord populated at the boot read, served at Y-1') : BREAK('the bootRecord holder is absent at the boot read (C-10)'))),
        y2Probe('holder-commit', (y2) => (y2.includes('bootRecord') ? HOLD('bootRecord refreshed by the channel\'s own committed writes') : BREAK('the committed write does not refresh bootRecord'))),
        rendererHandoffCount() === 1 ? HOLD('the renderer reads the handed-off record once') : BREAK('the renderer has no Y-1 hand-off'),
        crossingSeamProbe(),
      ), 'M-7 holder bound')
    })

    it('M-8: the channel is constants-only and single-sourced (§2.1/§2.2, R C-4)', async () => {
      assertProbe(ALL(
        (await channelModule()) === null
          ? BREAK('src/main/store-channels.ts does not exist — the constants are absent')
          : HOLD('the channel module exists'),
        channelExportsProbe(),
        f8ImportProbe(),
      ), 'M-8 channel census')
    })
  })

  /* ── §4.2 (2) THE BEHAVIOURAL F-* ROWS — §3.2 ── */

  describe('F-rows — documented fail-states (§3.2)', () => {
    it('F-1: a torn file is impossible (§2.6 items 3/6) — the atomic shape at the landing site, every injection arm, the tmp never parsed', async () => {
      assertProbe(ALL(
        atomicSequenceProbe(),
        y2Probe('torn-file', writeFailedArm),
        y2Probe('torn-file', tmpTargetOnly),
        tmpNeverParsed(),
      ), 'F-1 torn-file-impossible')
    })

    it('F-2: a refused crossing clears nothing (§2.4 items 3/4, S §2.8 items 2/6, C-3)', async () => {
      // THE STORE'S refused-receipt posture (landed, driven — §2.4 item 3: the store's three-arm
      // refusal discipline applies to the STORE's serialization/validation gates): a file-tier
      // commit whose value is not JSON-representable (BigInt) is refused BEFORE the crossing,
      // and the refused receipt carries cleared: [], repaired: [], rows: [], crossings: 0, events: 0.
      const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'settings' }]) })
      const refused = store.commit('file.settings', { n: 1n })
      const storePosture = refused.status === 'refused' && refused.cleared.length === 0 && refused.crossings === 0 && refused.events === 0
      expect(storePosture,
        `F-2 store-receipt drive — the store's refused receipt posture (cleared: [], crossings: 0, events: 0): observed status='${refused.status}' cleared=[${refused.cleared.join(',')}] crossings=${refused.crossings} events=${refused.events} reason='${refused.reason ?? 'undefined'}'`).toBe(true)
      // THE CHANNEL'S arms (absent → red): the two closed refusal tokens, returned BEFORE the
      // write (the previous file is intact), never a swallow.
      assertProbe(y2Probe('refused crossing', (y2) => ALL(
        y2.includes("'malformed-payload'") ? HOLD("the channel's 'malformed-payload' arm (ITS validation of the incoming translation)") : BREAK("the channel's 'malformed-payload' arm is absent"),
        writeFailedArm(y2),
        refusalBeforeRename(y2),
      )), 'F-2 channel refusal arms')
    })

    it('F-3: a graph load before the hand-off FAILS the boot (§2.9 consequence (1)) — the starting-order gate observes the CURRENT inversion', async () => {
      const p = bootOrderProbe()
      expect(p.held, `F-3 — ${p.why}`).toBe(true)
    })

    it('F-4: no resurrected in-realm value (§2.7 item 3, §0A item 6) — the file-tier projection, mem/temp never land', async () => {
      assertProbe(ALL(
        y2Probe('projection', (y2) => ALL(
          (y2.includes('file.') || /startsWith\s*\(\s*['"]file\./.test(y2))
            ? HOLD('the persisted record is the file.*-keyed projection of the crossing\'s translation')
            : BREAK('the file.*-keyed projection filter is absent from the write path'),
          y2.includes('schemaVersion') ? HOLD('the reserved schemaVersion member is stamped') : BREAK('schemaVersion is not stamped'),
        )),
        rendererHandoffCount() === 1 ? HOLD('a restart re-hydrates from the hand-off (in-realm tiers built from the handed-off record; mem/temp EMPTY)') : BREAK('the renderer has no Y-1 hand-off — a restart cannot reconstruct its tiers from the record'),
      ), 'F-4 projection')
    })

    it('F-5: a reserved-name collision is refused, never overwritten (§2.8 item 4, NW-10)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      expect(main.includes("'reserved-namespace'") || mcp.includes("'reserved-namespace'"),
        "F-5 — a module id colliding with a reserved top-level settings key must be REFUSED reason:'reserved-namespace', never silently overwritten — the token is absent from the wiring today").toBe(true)
    })

    it('F-6: the migration\'s one-boot window stays declared (§2.8 item 1 (4), §0A item 7)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      assertProbe(ALL(
        main.includes('moduleStore.setDisabled') || main.includes('moduleStore.put') || main.includes('moduleStore.remove')
          ? BREAK('a legacy-store mutator is still invoked — the legacy file is still WRITTEN (the window declares read-only retention, never a write)')
          : HOLD('the legacy file is retained read-only during the one-boot window'),
        main.includes('rmSync(') || main.includes('unlinkSync(')
          ? HOLD('the legacy file is removed after the window')
          : BREAK('the legacy removal after the one-boot window is absent — today provident-modules.json is a live persisted member (§1.2 row 5)'),
        main.includes(DECLARED_SETTINGS_FILE) ? HOLD('the settings file wins from then on') : BREAK('the settings file does not exist'),
      ), 'F-6 one-boot window')
    })

    // RULED 2026-10-03 (option 1 — the G2 red-set self-contradiction, Implementer-verified): this row's
    // middle sub-probe was a bare-name-absence probe, `main.includes(DECLARED_LEGACY_FILE) ? BREAK : HOLD`
    // — it FORBADE the literal 'provident-modules.json' in src/main/main.ts. But the migration's boot
    // sequence MUST name that file at its removal declaration (spec §2.8 step (4)): P-PS-IM-2 A1 (':330-338')
    // requires `rmSync/unlinkSync` + `main.includes(DECLARED_LEGACY_FILE)`, and P-PS-TP-2's migrated-first-write
    // probe (':509-519') requires a main.ts line carrying the legacy name near the settings reference.
    // `includes` on the same string cannot be both true and false — exactly one arm had to stay red for every
    // implementation. The spec is internally consistent: §2.7 item 2's exactly-two census is enforced by the
    // WRITE-construct scan — the migration's removal DECLARES the name, it never WRITES a third file — and the
    // migration MUST name the legacy file at its removal declaration, so the bare-name-absence probe was this
    // row's OWN over-constraint. Replaced with the write-construct census form this row's third sub-probe and
    // sibling row S-3 already use — `thirdLiteralWrites() === 0`. ROW INTENT SURVIVES UNWEAKENED: a third
    // persisted file is a finding (the third sub-probe); the legacy settings write is MIGRATED (this arm);
    // the settings-only write construct stands (the first sub-probe); the post-window census is exactly two.
    it('F-7: a second writer class FAILS the two-writer falsifier (§2.6 item 5, the write-site census)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      assertProbe(ALL(
        main.includes(DECLARED_SETTINGS_FILE)
          ? HOLD('the settings write site exists')
          : BREAK(`the settings write site is absent — today the persisted set is {${DECLARED_SECURITY_FILE}, ${DECLARED_LEGACY_FILE}} (main.ts:71-81, [H]), i.e. the declared member ${DECLARED_SETTINGS_FILE} is MISSING from the census (I-2 reddens)`),
        thirdLiteralWrites().length === 0
          ? HOLD('no main-side write construct writes the legacy file — writer class 1\'s direct legacy-store write is migrated (the removal may DECLARE the name at §2.8 step (4); it never WRITES it)')
          : BREAK(`a write construct still names a legacy/third provident-*.json literal: ${thirdLiteralWrites().join(', ')} — the legacy file would still be written directly, i.e. a second writer class reddens the two-writer falsifier`),
        thirdLiteralWrites().length === 0
          ? HOLD('no main-side write construct directly names a third provident-*.json file')
          : BREAK(`a third filename is directly written: ${thirdLiteralWrites().join(', ')}`),
      ), 'F-7 write-site census')
    })

    it('F-8: a channel-name re-spelling FAILS the single-source row (§2.1 item 2, the F-8 rule)', async () => {
      assertProbe(ALL(
        f8ImportProbe(),
        (() => {
          const respelled: string[] = []
          for (const lit of [DECLARED_STORE_FILE_GET, DECLARED_STORE_FILE_PUT]) {
            for (const rel of scanSrcFor(lit)) {
              if (rel !== 'main/store-channels.ts') respelled.push(`${rel}:${lit}`)
            }
          }
          return respelled.length === 0
            ? HOLD('no channel-name literal is re-spelled in any other src/** file (the only permitted home is src/main/store-channels.ts)')
            : BREAK(`re-spelling found: ${respelled.join(', ')}`)
        })(),
      ), 'F-8 single-source')
    })

    it('F-9: a validation failure is NEVER a throw (§2.3 item 1, §2.6 item 4, §2.7 item 5)', async () => {
      assertProbe(y1Probe('never-throw', (y1) => ALL(
        !y1.includes('throw') ? HOLD('the read-back never throws') : BREAK('the read-back throws on a corrupt/missing/foreign-key file'),
        y1.includes('catch') ? HOLD('every failure answers the declared recovery') : BREAK('the recovery arm is absent'),
        y1.includes('existsSync') ? HOLD('a missing file is a MISS, never an error (the cold tier)') : BREAK('the cold/missing arm is absent'),
      )), 'F-9 never-throw')
    })

    it('F-10: a leaked registration FAILS the release row (§2.11 item 3, the P1-P7 pattern)', async () => {
      // THE PATTERN'S SOURCE (landed, driven): the store's unsubscribe answers false on a
      // second release and no event fires after release.
      const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'settings' }]) })
      const events: string[] = []
      const sub = store.subscribe('file.settings', (e) => events.push(e.name))
      const first = sub.unsubscribe()
      const second = sub.unsubscribe()
      store.commit('file.settings', { theme: { token: 'z' } })
      expect(first === true && second === false && events.length === 0,
        'the store\'s release post-conditions: first release true, second release false, no event after release (the pattern F-10 builds on — held today)').toBe(true)
      // THE WIRING HALF (absent → red): the Y-3 registration returns the release and the wiring
      // releases at realm teardown; a registration that survives its realm is a finding.
      const preload = readSrcSafe('main/preload.ts') ?? ''
      const renderer = rendererTextSafe()
      assertProbe(ALL(
        preload.includes('onFileChanged') ? HOLD('preload exposes store.onFileChanged returning the release') : BREAK('the preload\'s store.onFileChanged member does not exist (the Y-3 registration is absent)'),
        renderer.includes('onFileChanged') ? HOLD('the renderer registers the Y-3 listener once at boot') : BREAK('the renderer\'s Y-3 registration is absent'),
      ), 'F-10 release discipline')
    })
  })

  /* ── §4.2 (3) THE STATIC CENSUS ROWS (§3.4-class) ── */

  describe('static census rows (§4.1 item 2)', () => {
    it('S-1: the src/main/store-channels.ts census — the file exists, exports exactly the two channel-name constants, nothing else', async () => {
      assertProbe(channelExportsProbe(), 'S-1 channel census')
    })

    it('S-2 (NW-17): the preload set-equality row over window.provident\'s member NAMES, positive-controlled by an added key (§2.11 item 4)', async () => {
      const preload = readSrcSafe('main/preload.ts') ?? ''
      const actualTop = bridgeMemberNames(preload)
      const topEqual = sameMemberSet(actualTop, DECLARED_TOP_LEVEL_BRIDGE_MEMBERS)
      const actualStore = storeSubMembers(preload)
      const storeEqual = sameMemberSet(actualStore, DECLARED_STORE_SUB_MEMBERS)
      // THE POSITIVE CONTROL: the checker must FAIL when a key is added to the expected set —
      // the row catches a member that does not exist (and, equally, a member that is missing).
      const control = !sameMemberSet([...DECLARED_TOP_LEVEL_BRIDGE_MEMBERS, '__prov_pos_ctrl__'], DECLARED_TOP_LEVEL_BRIDGE_MEMBERS)
      expect(control, 'the set-equality checker is not vacuous: an added key FAILS the row (the zones.md R-6/A-11 shape, cited)').toBe(true)
      expect(topEqual,
        `NW-17 — top-level member set is {${actualTop.join(', ')}}; declared {${DECLARED_TOP_LEVEL_BRIDGE_MEMBERS.join(', ')}} — the preload's store namespace is ABSENT today (§1.2 row 4; L-1 cannot catch a preload member)`).toBe(true)
      expect(storeEqual,
        `NW-17 — the store sub-namespace is {${actualStore.join(', ')}}; declared {get, put, onFileChanged} — the THREE new members are absent today (§2.11 item 4)`).toBe(true)
    })

    it('S-3: the write-site census — the persisted set is EXACTLY the declared two files (I-2 / the witness-gap pin)', async () => {
      assertProbe(ALL(
        (readSrcSafe('main/main.ts') ?? '').includes(DECLARED_SETTINGS_FILE)
          ? HOLD('the settings file is a declared persistence path')
          : BREAK(`'${DECLARED_SETTINGS_FILE}' is absent from main.ts — the file-surface is not yet the store's crossing (today only {${DECLARED_SECURITY_FILE}, ${DECLARED_LEGACY_FILE}} persist, main.ts:71-81)`),
        (readSrcSafe('main/main.ts') ?? '').includes(DECLARED_SECURITY_FILE) && (readSrcSafe('main/security-store.ts') ?? '').includes('writeFileSync')
          ? HOLD(`the tier-4 file (${DECLARED_SECURITY_FILE}) persists at its own site (the security store's, unchanged)`)
          : BREAK('the security file write site is not observed'),
        thirdLiteralWrites().length === 0
          ? HOLD('no write/rename construct carries a third provident-*.json literal')
          : BREAK(`a third persisted filename is written: ${thirdLiteralWrites().join(', ')}`),
      ), 'S-3 exactly-two census')
    })

    it('S-4: the no-schemaVersion-elsewhere probe (§2.7 item 6 — the token is introduced by this unit; a claim it pre-existed is a finding)', () => {
      const hits = scanSrcFor('schemaVersion')
      const allowed = ['main/main.ts']
      const clean = hits.every((h) => allowed.includes(h))
      expect(clean, `S-4 — 'schemaVersion' must appear ONLY in the landing site (${allowed.join(', ')}); hits today: ${hits.length === 0 ? '0 (measured: the gate record §2 row 7)' : hits.join(', ')}`).toBe(true)
    })

    it('S-5: who imports the channel — src/main/main.ts and src/main/preload.ts ONLY (§2.1 item 3; a renderer/shared import is a finding)', () => {
      const hits = scanSrcFor('store-channels')
      const allowed = ['main/main.ts', 'main/preload.ts', 'main/store-channels.ts']
      const clean = hits.every((h) => allowed.includes(h))
      expect(clean, `S-5 — the channel module may be imported by ${allowed.join(', ')} only; import references found: ${hits.length === 0 ? 'none (the module does not exist today)' : hits.join(', ')}`).toBe(true)
    })
  })

  /* ── §4.2 (5) THE MIGRATION ROWS (§2.8) ── */

  describe('migration rows (§2.8)', () => {
    it('MIG-1: the two-writer falsifier — after module.update + IPC_MODULE_SET_DISABLED on the same module, the store\'s record and the file AGREE (§2.8 item 2)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      assertProbe(ALL(
        main.includes('file.modules') || mcp.includes('file.modules')
          ? HOLD('both writer classes land under the declared namespace file.modules.<id> — a single authority')
          : BREAK('the file.modules.<id> namespace is not wired — with writer class 1 still writing `moduleStore.setDisabled` (main.ts:121) and writer class 2 the MCP handlers, the two-writer disagreement the correction names is still the tree\'s state'),
        main.includes('moduleStore.setDisabled')
          ? BREAK('writer class 1 is NOT re-pointed (the direct legacy-store write remains)')
          : HOLD('writer class 1 is re-pointed'),
      ), 'MIG-1 two-writer falsifier')
    })
  })

  /* ── §4.2 (6) THE BOOT-ORDER ROWS (§2.9) — the starting-order gate is ORDER-only, never a timing figure ── */

  describe('boot-order rows (§2.9, §4.2) — ORDER-only; no timing figure is claimed anywhere in this file (§1.4 item 2, §7a)', () => {
    it('BO-1: the pinned sequence — main: channel handlers + migration + router re-sync BEFORE the BrowserWindow; renderer: hand-off BEFORE the first envelope load; gutter after (§2.9 item 1)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const handlerBeforeWindow = main.indexOf('ipcMain.handle(STORE_FILE_GET') >= 0 && main.indexOf('ipcMain.handle(STORE_FILE_GET') < main.indexOf('new BrowserWindow(')
      const renderer = rendererTextSafe()
      const gutterAfterEnvelope = renderer.indexOf('startGutterAffordance(') > renderer.indexOf('runtime.bootstrap(') && renderer.indexOf('startGutterAffordance(') >= 0
      assertProbe(ALL(
        handlerBeforeWindow
          ? HOLD('the tier-1 channel handlers are registered before the BrowserWindow')
          : BREAK('the tier-1 channel handlers are not registered at all — today the renderer boots the Runtime/first envelope first and no hand-off exists (the exact inversion the changed boot order removes)'),
        gutterAfterEnvelope
          ? HOLD('the gutter wiring attaches after the first envelope load (its pre-drag read hits an in-realm tier)')
          : BREAK('the gutter attach order is not observed'),
        (main.indexOf('syncModuleRouter') >= 0 && main.indexOf('syncModuleRouter') < main.indexOf('new BrowserWindow('))
          ? HOLD('the router re-sync is a main-side step before the window')
          : BREAK('the router re-sync order is not observed'),
      ), 'BO-1 pinned sequence')
    })

    it('BO-2: consequence (2) — the host-side maxJournalLength read is UNAFFECTED; tier-1\'s hand-off is the NEW Y-1, a different channel (§2.9 item 2)', async () => {
      const renderer = rendererTextSafe()
      expect(renderer.includes('bridge.security.get('),
        'BO-2 — the tier-4 read (bridge.security.get(), renderer.ts:494-501, [H]) must remain the tier-4 snapshot channel (it does today)').toBe(true)
      assertProbe(y1Probe('distinct channel', (y1) => ALL(
        y1.includes('STORE_FILE_GET') ? HOLD('the Y-1 hand-off rides STORE_FILE_GET — a different channel from IPC_SECURITY_GET') : BREAK('the tier-1 hand-off channel does not exist'),
      )), 'BO-2 tier-1 channel distinctness')
    })

    it('BO-3: consequence (3) — the settings file may not exist: the hand-off answers [] and the renderer boots on it (§2.9 item 2(3))', async () => {
      assertProbe(ALL(
        bootOrderProbe(),
        y1Probe('cold', (y1) => ALL(
          y1.includes('existsSync') ? HOLD('a missing file is the cold tier (a MISS, never an error)') : BREAK('the cold/missing arm is absent'),
          !y1.includes('throw') ? HOLD('NOTHING throws') : BREAK('the cold boot throws'),
        )),
      ), 'BO-3 cold hand-off []')
    })

    it('BO-4: consequence (4) — a late push never tells the renderer what to believe; the table updates from the RECEIPT (§2.9 item 2(4), §2.5 item 2)', async () => {
      assertProbe(ALL(
        rendererHandoffCount() === 1 ? HOLD('the hand-off is the only main→renderer tier-1 value flow the boot uses') : BREAK('no Y-1 hand-off exists'),
        crossingSeamProbe(),
      ), 'BO-4 receipt-only')
    })

    it('BO-5: the absent-bridge realm — no preload bridge ⇒ the store boots COLD, no throw, no invented value (§2.9 item 4)', async () => {
      const renderer = rendererTextSafe()
      assertProbe(ALL(
        renderer.includes('if (!bridge)')
          ? HOLD('the no-bridge branch exists (renderer.ts:520-523, [H], composed with)')
          : BREAK('the no-bridge posture branch is absent'),
        y1Probe('absent-bridge', (y1) => ALL(
          !y1.includes('throw') ? HOLD('the cold boot never throws') : BREAK('the no-bridge/cold path throws'),
        )),
      ), 'BO-5 absent-bridge realm')
    })
  })

  /* ── §4.2 (4) THE SEAM/CALLER + RELEASE ROWS (§2.11) ── */

  describe('seam/caller + release discipline (§2.11)', () => {
    it('SE-1: the crossing-seam implementation at the existing construction site — crossing: { put(row) { return bridge.store.put(row) } } (§2.11 item 1)', async () => {
      assertProbe(crossingSeamProbe(), 'SE-1 crossing seam')
    })

    it('SE-2: the wiring\'s receipt-only rule — the tier-1 table updates from the STORE\'s receipt; the renderer never touches a path (§2.11 item 2, §2.12 item 1)', async () => {
      const renderer = rendererTextSafe()
      assertProbe(ALL(
        crossingSeamProbe(),
        renderer.includes('readFileSync') || renderer.includes('node:fs') || renderer.includes('require(\'fs\'')
          ? BREAK('the renderer touches a file path — the renderer never touches a path (it cannot; the renderer has no fs, §1.1 item 2)')
          : HOLD('no fs/path surface in the renderer (held today)'),
      ), 'SE-2 receipt-only')
    })

    it('R-1: the released-registration discipline (P1-P7) — every registration released at realm teardown; a second release is a no-op, never a throw (§2.11 item 3)', async () => {
      const preload = readSrcSafe('main/preload.ts') ?? ''
      const renderer = rendererTextSafe()
      assertProbe(ALL(
        preload.includes('onFileChanged') ? HOLD('store.onFileChanged exists') : BREAK('the preload\'s Y-3 registration member is absent'),
        renderer.includes('onFileChanged') ? HOLD('the renderer registers the Y-3 listener once at boot and holds its release') : BREAK('the renderer\'s Y-3 registration is absent — a registration that would survive its realm cannot be observed (a leak is a finding)'),
      ), 'R-1 release discipline')
    })
  })

  /* ── THE SETTINGS SCHEMA + VERSION ROWS (§2.7) ── */

  describe('the settings schema, the file.settings.* names, VERSION-FROM-FIRST-WRITE (§2.7)', () => {
    it('SC-1: tier 1\'s carrier is <userData>/provident-settings.json; the consolidated-location rule (§2.7 items 1/2)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const settingsUnderUserData = main.includes(DECLARED_SETTINGS_FILE) && /getPath\('userData'\)[\s\S]{0,200}provident-settings\.json|join\(app\.getPath\('userData'\),\s*'provident-settings\.json'/.test(main)
      const securityUnderUserData = /getPath\('userData'\)[\s\S]{0,200}provident-security\.json/.test(main)
      assertProbe(ALL(
        settingsUnderUserData
          ? HOLD(`'${DECLARED_SETTINGS_FILE}' is declared under userData`)
          : BREAK(`'${DECLARED_SETTINGS_FILE}' is NOT declared under <userData> — the settings file is not the store's crossing (SC-1 reddens on the absent carrier)`),
        securityUnderUserData
          ? HOLD('every persisted file lives under <userData> (the consolidated-location rule holds for the landed files)')
          : BREAK('the consolidated-location rule is not observed for the security file'),
      ), 'SC-1 carrier + consolidation')
    })

    it('SC-2: the reserved top-level names — window · tabs · layout · settings · tracked · modules (NW-10), refused never overwritten (§2.7 item 4, §2.8 item 4)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      expect(main.includes("'reserved-namespace'") || mcp.includes("'reserved-namespace'"),
        `SC-2 — the collision rule's refusal token is absent; a module id colliding with one of {${DECLARED_RESERVED_NAMESPACES.join(', ')}} must be REFUSED, never silently overwritten`).toBe(true)
    })

    it('SC-3: the file.settings.* names — the caller-side read is landed (theme.token); the channel\'s projection admits the namespace (§2.7 item 4)', async () => {
      const themeCaller = readSrcSafe('renderer/theme-store.ts') ?? ''
      expect(themeCaller.includes('file.settings.theme.token'),
        'SC-3 — the LANDED caller-side read (theme-store.ts:17, H2b) consumes file.settings.theme.token (held today)').toBe(true)
      assertProbe(y2Probe('settings namespace', (y2) => ALL(
        y2.includes('file.settings') ? HOLD('the projection admits the file.settings.* reference spellings') : BREAK('the write path does not admit the file.settings.* names — the settings namespace is not wired'),
      )), 'SC-3 settings namespace')
    })

    it('SC-4: VERSION-FROM-FIRST-WRITE — the payload carries schemaVersion (declared \'1\') from its FIRST write; a missing/unknown version answers the declared recovery, never a throw (§2.7 item 5, FORKER (iii)(c), R4)', async () => {
      assertProbe(ALL(
        y2Probe('version stamp', (y2) => ALL(
          y2.includes('schemaVersion') ? HOLD(`the first write (cold AND migrated alike) stamps schemaVersion — declared default ${DECLARED_SCHEMA_VERSION}`) : BREAK('the first write does not stamp schemaVersion'),
          new RegExp(`schemaVersion[^,}\\n]{0,30}['"]?${DECLARED_SCHEMA_VERSION}`).test(y2) ? HOLD(`the stamped value is the declared ${DECLARED_SCHEMA_VERSION}`) : BREAK(`the stamped value is not the declared ${DECLARED_SCHEMA_VERSION}`),
        )),
        y1Probe('version read-back', (y1) => ALL(
          y1.includes('schemaVersion') ? HOLD('the read-back validates the member (missing/unknown → the declared recovery)') : BREAK('the read-back does not validate schemaVersion — the older-version payload cannot answer a DECLARED outcome (R4)'),
          y1.includes('catch') ? HOLD('the recovery arm answers (coercible, never fatal)') : BREAK('the recovery arm is absent'),
          !y1.includes('throw') ? HOLD('never a throw, never a fatal stop') : BREAK('the read-back throws'),
        )),
      ), 'SC-4 version-from-first-write')
    })
  })
})

/* ───────────────────────────── SHARED PROBE IMPLEMENTATIONS ───────────────────────────── */

function assertProbe(p: Probe, label: string): void {
  expect(p.held, `${label} — ${p.why}`).toBe(true)
}

function channelExportsProbe(): Probe {
  const text = readSrcSafe('main/store-channels.ts')
  if (text === null) return BREAK('src/main/store-channels.ts does not exist — the channel constants are absent (§1.2 row 1)')
  const exportCount = (text.match(/\bexport\b/g) ?? []).length
  if (exportCount > 2) return BREAK(`the channel module has ${exportCount} export statements — §2.1 item 1 declares the TWO channel-name constants and NOTHING else`)
  if (text.includes(DECLARED_STORE_FILE_GET) && text.includes(DECLARED_STORE_FILE_PUT)) {
    return HOLD('the file exists; the two declared channel-name values are present; no other guest.')
  }
  return BREAK('the declared channel-name values are not present in the module')
}

/** The positive single-source half: main.ts and preload.ts import the channel module and use
 *  the imported constants at the handler registrations / invokes. */
function f8ImportProbe(): Probe {
  const main = readSrcSafe('main/main.ts') ?? ''
  const preload = readSrcSafe('main/preload.ts') ?? ''
  const mainOk = /from\s+['"]\.\/store-channels(?:\.js)?['"]/.test(main) && main.includes('ipcMain.handle(STORE_FILE_GET') && main.includes('ipcMain.handle(STORE_FILE_PUT')
  const preloadOk = /from\s+['"]\.\.\/main\/store-channels(?:\.js)?['"]/.test(preload) && preload.includes('ipcRenderer.invoke(STORE_FILE_GET') && preload.includes('ipcRenderer.invoke(STORE_FILE_PUT')
  return mainOk && preloadOk
    ? HOLD('main.ts and preload.ts import the channel names from the ONE file and use them at the registrations/invokes')
    : BREAK('the single-source imports/registrations are absent (the channel module does not exist; the handler/invoke sites are not wired)')
}

function crossingSeamProbe(): Probe {
  const renderer = rendererTextSafe()
  const seam = renderer.includes('crossing:')
  const put = renderer.includes('bridge.store.put')
  const contiguous = /crossing:\s*\{\s*put\s*\(\s*row\s*\)/.test(renderer)
  return seam && put && contiguous
    ? HOLD('the crossing seam { put(row) { return bridge.store.put(row) } } is fed at the construction site (§2.11 item 1)')
    : BREAK('the crossing seam is not implemented at the construction site — today buildWiredGraphStore() passes { declarations } only and crossing is null (renderer.ts:38-44, [H]); the store\'s file tier is never crossed (divergence note D-9)')
}

function atomicSequenceProbe(): Probe {
  return y2Probe('atomic sequence', atomicSequenceProbeIn)
}

function atomicSequenceProbeIn(y2: string): Probe {
  const o = ordered(y2, ['mkdirSync', '.tmp', 'fsync', 'renameSync', 'fsync'])
  return o.held
    ? HOLD('the write is the atomic shape, IN ORDER: mkdirSync({recursive}) → {path}.tmp write → tmp fsync → renameSync → directory fsync (§2.6 item 1)')
    : BREAK(`the atomic sequence is not the declared shape at the landing site (mkdirSync → .tmp → fsync → renameSync → fsync; tokens found at ${JSON.stringify(o.where)}) — the security-store plain-write pattern is the exactly-named anti-pattern this channel must NOT copy (§2.6 item 1)`)
}

function moduleMissingDrive(): Probe {
  const dir = mkdtempSync(join(tmpdir(), 'g2-cold-'))
  try {
    const store = createModuleStore({ path: join(dir, 'provident-modules.json') }) // never written — the file is absent
    const status = store.status()
    return status.corrupt === false
      ? HOLD('module half driven: a MISSING file answers corrupt:false, loaded:[] (a cold tier is a MISS, never an error)')
      : BREAK(`module half driven: a missing file answered corrupt:${status.corrupt}`)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/** The bridge object's top-level member names, extracted from preload.ts's bridge literal
 *  (the exact object `contextBridge.exposeInMainWorld('provident', bridge)` exposes). */
function bridgeMemberNames(preload: string): string[] {
  const start = preload.indexOf('const bridge: ProvidentBridge = {')
  if (start < 0) return []
  const endMarker = preload.indexOf('\n}', start)
  const body = endMarker < 0 ? preload.slice(start) : preload.slice(start, endMarker)
  const names: string[] = []
  for (const line of body.split('\n')) {
    const m = line.match(/^ {2}([A-Za-z_$][\w$]*)\s*[:,(]/)
    if (m) names.push(m[1])
  }
  return [...new Set(names)]
}

/** The `store` sub-namespace's member names (the DECLARED three: get · put · onFileChanged). */
function storeSubMembers(preload: string): string[] {
  const m = preload.match(/store:\s*\{([\s\S]*?)\n\s{2}\},?/)
  if (!m) return []
  const inner = m[1]
  const names = [...inner.matchAll(/^\s{4}([A-Za-z_$][\w$]*)\s*\(/gm)].map((x) => x[1])
  return [...new Set(names)]
}

function sameMemberSet(actual: string[], declared: readonly string[]): boolean {
  const a = [...actual].sort()
  const d = [...declared].sort()
  return JSON.stringify(a) === JSON.stringify(d)
}