// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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
//
// ─────────────────────── THE E-5 CENSUS RE-GRAIN — THIS FILE'S OWN LEDGER (`2026-10-29`) ───────────────────────
//
// THE LICENCE: `docs/L1/settings-carrier-retirement.md` §6 and §9 `E-5`, and the rule §6 states in its
// own words: **re-grain where the row's subject is a CHANNEL'S ANSWER; retire WITH THE REFERENT where
// the subject is the hand-written MACHINERY (the tmp sequence, the stamp).** The machinery retired in
// this unit: `provident-settings.json`'s boot read, its guarded second read, `const settingsPath`, the
// whole tmp+rename+fsync writer, the `schemaVersion` stamp and the `bootRecord` third holder (L1 §3,
// licensed by E-1; D-22). Nothing here is a weakening and nothing is deleted silently: every retired
// row stands in the file where it stood, as a comment block naming its subject, its referent and the
// surviving home of its claim, and the four retired REGISTER rows are additionally carried as data in
// `RETIRED_REGISTER_ROWS` and printed by the register report.
//
//   RE-GRAINED (the subject is a channel's answer — the machinery probe is replaced by a probe of the
//   ANSWER, DRIVEN through `createSettingsSurface`, which is importable where `main.ts`'s bodies are
//   not; L2 `behaviour.md` §1/§2/§3):
//     · `M-1`  the atomic sequence at the landing site → ONE whole-map commit, one receipt, no file verb
//     · `M-2`  `existsSync` in the Y-1 body → the cold ANSWER driven (`[]`, `legacy:'absent'`, no throw)
//     · `M-3`  the holder + a read-time `schemaVersion` → the SERVED imported rows, driven, order unmoved
//     · `M-4`  the atomic sequence again → the per-arriving-crossing duty: no comparison read-back
//     · `M-5`  the carrier's path in `main.ts` → the migration's ONE `settingsSurface.commit(...)`
//     · `M-6`  `catch` in the Y-1 body → the corrupt IMPORT answer driven (`legacy:'corrupt'`, rows `[]`)
//     · `M-7`  the holder BOUNDED → the holder ABSENT (`bootRecord`/`settingsCorrupt` stand nowhere)
//     · `F-2`  `'write-failed'` + refusal-before-rename → the refusal RECEIPT, the store's own status
//              verbatim, and the retired word asserted ABSENT (the stronger polarity)
//     · `F-4`  the `schemaVersion` stamp limb → retired; the `file.*` projection kept and driven
//     · `F-6`  "the settings file wins from then on" → the app-state record, one commit site
//     · `F-7`  the carrier's literal as the write site → `y2CommitSiteProbe()` (one commit, no file verb)
//     · `F-9`  `catch`/`existsSync` in the Y-1 body → every import arm's ANSWER driven, none throws
//     · `S-3`  the carrier in the census → the TWO WRITTEN names + the two retired names as seeds
//     · `S-4`  the token's one home in `main.ts` → the token's one home, the IMPORT arm, and no stamp
//     · `MIG-1` "the file" as a second written carrier → both writer classes share ONE commit verb
//     · `BO-3` `existsSync` in the cold arm → the cold ANSWER driven
//     · `SC-1` the carrier's `<userData>` path → the two written names under `<userData>`, and a
//              tier-1 commit moves the app-state record at `['operator-app-state']`
//     · `SC-3` a `file.settings` substring (which survived only in a COMMENT) → the namespace DRIVEN
//     · register `P-PS-IM-2` A2/A3/A4, `P-PS-SM-2`'s three checkpoint-2s, `P-PS-TP-1` whole
//   RETIRED WITH THE REFERENT (the subject dissolved; the claim is named and its surviving home is
//   given, never re-pointed — `tests/store-security.test.ts`'s header rule):
//     · `F-1`  a torn file is impossible — the staging sequence; survives as the PACKAGE's durability
//              (cited), L1 e2e `S-8`/`S-9`, `y2CommitSiteProbe` and `retiredWriteFailedAbsent`
//     · `SC-4` VERSION-FROM-FIRST-WRITE — the stamp; survives as the import's answer (`SM-2`, `M-6`,
//              `S-4`, and the L2 import battery)
//     · register `P-PS-IM-3`, `P-PS-SM-1`, `P-PS-TP-2`, `P-PS-SM-3` — see `RETIRED_REGISTER_ROWS`
//   UNTOUCHED: `M-8`, `F-3`, `F-5`, `F-8`, `F-10`, `S-1`, `S-2`, `S-5`, `BO-1`, `BO-2`, `BO-4`, `BO-5`,
//   `SE-1`, `SE-2`, `R-1`, `SC-2`, register `P-PS-IM-1` — every figure each cites is a channel-name,
//   renderer, shared or module-store fact this unit did not move (checked, not assumed).
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { createGraphStore } from '../src/renderer/store-core-graph'
import { storeGraphReferences } from '../src/renderer/store-graph-references'
// **THE MODULE-STORE IMPORT IS GONE (2026-11-02, D-78's second clause / `D-81`).** The rows that
// used to drive it now read its subject where the product keeps it: `DECLARED_LEGACY_FILE` is a name
// this boot must NOT carry, and the module registry's status is the CROSSING's answer
// (`src/main/main.ts` composes `corrupt` from `settingsSurface`'s own `legacy`/`storage`). Nothing here
// constructs a registry any more; `main.ts` spells no literal for a module file, and the fixture the
// module tools' own files use is `tests/module-registry-fixture.ts`, not this battery's business.
// ⟶ `E-5` — THE SURFACE THE TWO CHANNELS DELEGATE TO, imported so a row can DRIVE the answer
// rather than scan a body no node test can construct (`main.ts` imports `electron` at module
// scope; L2 `behaviour.md` §2/§3's stated limit; `examiner.md` §2).
import { createSettingsSurface } from '../src/main/settings-surface'
// NOTE for `tsc -p tsconfig.tests.json`: the literal specifier below is INTENTIONAL — the
// honest diagnostic for this red set is that `src/main/store-channels.ts` does not exist
// (TS2307 "Cannot find module" + the row-level break inside `channelModule()`). When the
// Implementer lands the channel module, the import resolves and the diagnostic clears.

/* ───────────────────────────── THE DECLARED CONSTANTS (§2.2 / §2.7 / §7a) ───────────────────────────── */

const DECLARED_STORE_FILE_GET = 'provident:store:file:get'
const DECLARED_STORE_FILE_PUT = 'provident:store:file:put'
const DECLARED_EXPORT_NAMES: readonly string[] = ['STORE_FILE_GET', 'STORE_FILE_PUT', 'IPC_SECURITY_EXCLUSION']
/* ── THE CROSS-UNIT SIBLING-REGISTRY AMENDMENT (`2026-10-05`) — THE DECLARED CENSUS MOVES `2 → 3`. ──
 *
 * WHAT MOVED: `src/main/store-channels.ts` now carries THREE `export` tokens and the export-NAME set
 * {`STORE_FILE_GET`, `STORE_FILE_PUT`, `IPC_SECURITY_EXCLUSION`}, where the as-filed `S-1`/`M-8` census
 * declared exactly TWO.
 *
 * WHO OWNS THE CHANGE: the `U-SECURE-EXCLUSION` unit (ledger row `S1`) — its manual-UI channel adds the ONE
 * constant (`src/main/store-channels.ts`'s own dated `RCA-8(d)` annotate-beside names it at `:24-27`).
 *
 * THE CLAUSE THAT DECLARES IT: `docs/specs/secure-exclusion.md` `§1.3` item 9 · `§2.4` item 4 · `§2.6` item 3 —
 * *"The `store-channels.ts` census moves **`2 → 3`** constants"* (`§1.5` item 4 names the surface). The as-filed
 * `store-persist` sentence *"the census stays EXACTLY TWO"* is KEPT VISIBLE in the module and is SUPERSEDED there
 * by the same dated annotation — so this is a DECLARED cross-unit growth (`docs/specs/gutter.md` `§3.4 R-4`:
 * *"a later unit that legitimately imports THIS module is not a violation of it"*), not a regression, and the
 * census is the file's OWN single-source census (`§2.2` item 3) moving `2 + 1 = 3`.
 *
 * WHAT THIS AMENDMENT DOES **NOT** WEAKEN (the two halves of `S-1`/`M-8`, both still genuinely binding):
 *  (a) THE CONSTANTS-ONLY CLASS — "constants and NOTHING else": no callable, no state, no type, no logic, no
 *      runtime import. Now enforced STRUCTURALLY, per `export` declaration, instead of by a raw `export`-token
 *      count (the count was only ever a PROXY for this claim);
 *  (b) SINGLE-SOURCE + IMPORT-EQUALITY — every declared name is read from THIS ONE file and imported (never
 *      re-spelled) by `main.ts`/`preload.ts` (`f8ImportProbe`, `P-PS-IM-1` A3 — untouched);
 *  and the census stays FALSIFIABLE IN BOTH DIRECTIONS: a FOURTH constant, or ANY non-constant export, still
 *  FAILS (the two positive controls driven at the `M-8` row below). The register row `P-PS-IM-1`'s own A1/A2
 *  attempts read this SAME authority, so the file and the register cannot drift apart. */
/** §7a item (2) — the declared current schema version, IN FORCE. */
const DECLARED_SCHEMA_VERSION = '1'
const DECLARED_RESERVED_NAMESPACES: readonly string[] = ['window', 'tabs', 'layout', 'settings', 'tracked', 'modules']
const DECLARED_SETTINGS_FILE = 'provident-settings.json'
const DECLARED_SECURITY_FILE = 'provident-security.json'
/* **`DECLARED_LEGACY_FILE` IS NOW A NAME THIS BOOT MUST NOT CARRY, NOT ONE IT MUST REMOVE (D-81).**
 *  Until 2026-11-02 the Q-5 arm read `<userData>/provident-modules.json` once, projected its records
 *  into `file.modules.<id>` rows and `rmSync`-ed it. The user's ruling gave the module registry the
 *  disposition D-75 gave the tabs rows — *"There is no migration … Do not build a boot migration"* —
 *  so the arm, `src/main/module-store.ts` and this battery's drives of it are deleted, and an
 *  existing file is LEFT ON DISK, UNREAD. The constant survives because its ABSENCE from `main.ts` is
 *  now the claim (P-PS-IM-2 A1, F-6); it is cited, never written. */
const DECLARED_LEGACY_FILE = 'provident-modules.json'
/* ── ⟶ THE `E-5` RE-GRAIN'S FIGURES (`2026-10-29`; `docs/L1/settings-carrier-retirement.md` §3/§4/§6,
 *  §9 E-5; `docs/L2/settings-carrier-retirement/behaviour.md` §1–§3; `persistence.md` §2). ──
 *
 * `DECLARED_SETTINGS_FILE` IS NOW CITED AS RETIRED, exactly as `DECLARED_SECURITY_FILE` is. The
 * hand-written tier-1 CARRIER `provident-settings.json` — its boot read, its guarded second read,
 * its `settingsPath` constant and its whole tmp+rename+fsync writer — is GONE from
 * `src/main/main.ts` (L1 §3's CLOSED removal list, licensed by E-1), so neither it nor the
 * security record is a WRITTEN name any more. The TWO WRITTEN NAMES are:
 *   · `provident-operator-settings.json` — the instance's own record (`FILE_NAME`), and
 *   · `provident-profile.json` — the profile store's, bound as `PROFILE_FILE_NAME`.
 * The retired names may stand in a profile as SEEDS: read at most once, never written (L1 §6,
 * D-13). The persisted set therefore stays exactly TWO while the CENSUS that names it moves —
 * the row's claim is unmoved, its figure is re-grained, and nothing is deleted (D-13). */
const DECLARED_PROFILE_FILE = 'provident-profile.json'
const PROFILE_FILE_MODULE = 'main/data/store.ts'
/** THE APP-STATE ADDRESS the rows live at, on the `file` tier, beside the security record
 *  (`ASM-1`; L1 §3). Every re-grained drive below names it, because what a tier-1 commit now
 *  moves is THAT record and not a hand-written file (L1 §6). */
const DECLARED_APP_STATE_ADDRESS = 'operator-app-state'
/* ── ⟶ THE `C-4` RE-GRAIN'S TWO FIGURES (`2026-10-11`; `docs/L1/security-store-storeroom-exception.md`
 *  §2 E-2/E-3, `docs/L3/security-store-storeroom/signatures.md` §2). `src/main/security-store.ts` is
 *  DELETED (`E-1`): the operator's security record now lives in ONE `provident-storeroom` instance inside
 *  `src/main/operator-settings/index.ts`, which owns BOTH file names as constants and makes exactly ONE
 *  `fs` call — a `readFileSync` of the RETIRED name, read at most once and NEVER written, renamed,
 *  repaired or deleted, because the bytes are the package's. `main.ts` spells neither name (`C-4`), so the
 *  figure the rows below read for them is that module, and the retired name stays visible AS RETIRED. ── */
const OPERATOR_SETTINGS_MODULE = 'main/operator-settings/index.ts'
const DECLARED_OPERATOR_SETTINGS_FILE = 'provident-operator-settings.json'
/** §2.11 item 4 — the preload bridge's declared TOP-LEVEL member set, and the `store` sub-namespace's. */
const DECLARED_TOP_LEVEL_BRIDGE_MEMBERS: readonly string[] = ['ready', 'onRequest', 'sendReply', 'notify', 'security', 'module', 'store', 'tabs'] // ⟶ D-63
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
 *  marker in `renderer.ts`. The marker is the REAL bracket-form call `bridge.store['get']()`
 *  (renderer.ts:570) — G4-P2 (MED): the probes previously matched the DOC-COMMENT's
 *  `store.get()` prose (renderer.ts:556), so the suite stayed green with the call deleted
 *  and would redden if the comment were removed — the honest observable is the CALL, not the
 *  comment. A code-only control (every comment line elided) must still fire the marker — a
 *  comment-only match breaks. ORDER only — no timing figure is claimed or measured. */
function bootOrderProbe(): Probe {
  const text = readSrcSafe('renderer/renderer.ts')
  if (text === null) return BREAK('renderer.ts unreadable')
  const handoffIdx = text.search(/store\[['"]get['"]\]\s*\(/)
  const envelopeIdx = text.search(/runtime\.bootstrap\s*\(/)
  if (handoffIdx < 0) {
    return BREAK('the Y-1 hand-off does not exist in the renderer boot (the REAL bracket-form call bridge.store[\'get\'](), renderer.ts:570); the first envelope (runtime.bootstrap(), renderer.ts:~615) still loads before any hand-off — the pinned sequence (hand-off → tiers → Runtime → first envelope) is inverted')
  }
  if (envelopeIdx < 0) return BREAK('the first-envelope-load marker (runtime.bootstrap() call) is not found')
  const codeOnly = rendererCommentElided()
  if (codeOnly === null) return BREAK('renderer.ts unreadable (code-only scan)')
  const codeHandoffIdx = codeOnly.search(/store\[['"]get['"]\]\s*\(/)
  if (codeHandoffIdx < 0) {
    return BREAK('the bracket-form hand-off call exists only inside a comment line — the honest observable is the CALL, not the comment (G4-P2)')
  }
  const codeEnvelopeIdx = codeOnly.search(/runtime\.bootstrap\s*\(/)
  if (codeEnvelopeIdx < 0) return BREAK('the first-envelope-load marker is absent from the code-only scan')
  return handoffIdx < envelopeIdx && codeHandoffIdx < codeEnvelopeIdx
    ? HOLD(`the hand-off is answered before the first envelope load (indices ${handoffIdx} < ${envelopeIdx}; code-only ${codeHandoffIdx} < ${codeEnvelopeIdx})`)
    : BREAK(`the first envelope loads before the hand-off answered (indices ${envelopeIdx} < ${handoffIdx}; code-only ${codeEnvelopeIdx} < ${codeHandoffIdx}) — the starting-order gate observes the inversion`)
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

/* ⟶ `E-5` — REMOVED WITH THEIR REFERENT: `writeFailedArm()`, `tmpTargetOnly()` and
 * `tmpNeverParsed()` scanned the Y-2/Y-1 bodies for the staging machinery and for the retired
 * `'write-failed'` vocabulary. The machinery is deleted from `main.ts` (L1 §3, E-1) and the
 * vocabulary was retired by ASM-2 (the refusal names the STORE's own status verbatim), so the
 * surviving claims are asserted with the opposite polarity and where they live: no file verb stands
 * at the landing site (`y2CommitSiteProbe`), `'write-failed'` stands NOWHERE (`retiredWriteFailedAbsent`),
 * and every refusal is a receipt the surface answers (`commitDrive`). */

const REGISTER_ROWS: readonly RegisterRow[] = [
  {
    id: 'P-PS-IM-1',
    type: 'P-IM',
    property: 'THE CHANNEL FILE IS DECLARED CONTENT ONLY, AND THE CHANNEL NAMES ARE SINGLE-SOURCED',
    strategy: 'S-PS-CH-1',
    term: '3 attempts = (1) the module\'s export-name set equals the THREE DECLARED constants {STORE_FILE_GET, STORE_FILE_PUT, IPC_SECURITY_EXCLUSION} (the census `2 → 3` is `U-SECURE-EXCLUSION`\'s, DECLARED at `docs/specs/secure-exclusion.md` §1.3 item 9 / §2.6 item 3 — a FOURTH name FAILS); (2) every export is the declared constant — no function, no state, no type, no logic (the constants-only class, enforced per declaration); (3) the handler/invoke sites\' channel-name uses are identity-equal to the imports (import-equality; a literal re-spelling reddens)',
    attempts: [
      {
        label: 'IM-1 A1 — export-name set equals the declared {STORE_FILE_GET, STORE_FILE_PUT, IPC_SECURITY_EXCLUSION}',
        run: async (): Promise<Probe> => {
          const mod = await channelModule()
          if (mod === null) return BREAK('src/main/store-channels.ts does not exist — the constants are absent (the channel-name import fails)')
          const actual = Object.keys(mod).sort()
          const declared = [...DECLARED_EXPORT_NAMES].sort()
          const setOk = JSON.stringify(actual) === JSON.stringify(declared)
          if (!setOk) return BREAK(`export-name set is ${JSON.stringify(actual)} — declared ${JSON.stringify(declared)}`)
          // THE FALSIFIER, DRIVEN IN BOTH DIRECTIONS (the read CAN fail on an added name): the SAME
          // instrument is driven over synthetic text carrying a FOURTH constant — the name parser must
          // SEE that name and the probe must REJECT it, so the move `2 → 3` did not make the census vacuous.
          const controlText = "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport const IPC_SECURITY_FOURTH_CONTROL = 'd'\n"
          const seen = exportNamesOf(controlText).sort()
          if (JSON.stringify(seen) !== JSON.stringify([...declared, 'IPC_SECURITY_FOURTH_CONTROL'].sort())) {
            return BREAK(`the export-name parser did not read the control's own names — measured ${JSON.stringify(seen)}; the census instrument is not reading declarations at all`)
          }
          if (constantsOnlyProbe(controlText, declared).held) {
            return BREAK('the census ACCEPTED a synthetic FOURTH constant — the declared name-set equality is vacuous')
          }
          return HOLD(`export-name set is ${JSON.stringify(actual)} (the declared census; a FOURTH name fails)`)
        },
      },
      {
        label: 'IM-1 A2 — every export is the declared constant (the constants-only class, read per export declaration)',
        run: async (): Promise<Probe> => {
          const mod = await channelModule()
          if (mod === null) return BREAK('src/main/store-channels.ts does not exist — the constants are absent')
          const text = readSrcSafe('main/store-channels.ts')
          return text === null
            ? BREAK('the channel module text is unreadable — the constants-only class cannot be read')
            : constantsOnlyProbe(text, DECLARED_EXPORT_NAMES)
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
    term: '4 attempts = (1) the legacy provident-modules.json is a name this boot carries NOWHERE: not read, not removed, left on disk unread (RE-GRAINED, D-81: the Q-5 arm is deleted under the user\'s ruling, so the file is DROPPED, not migrated); (2) the persisted record IS the instance\'s own file and the retired record\'s schema is validated by the IMPORT arm, which answers the diagnosis rather than throwing (RE-GRAINED, E-5: the carrier path and its read-time validation retired with the carrier); (3) the RETIRED names write nothing — each has ONE home, ONE reader and NO writer (RE-GRAINED, E-5: the tier-1 channel\'s tmp write site retired with the tmp writer, so the bite is now the ABSENCE of a file verb at the landing site); (4) the write-site census: the one write site is ONE whole-map commit and no write/rename construct references a third provident-*.json literal (RE-GRAINED, E-5)',
    attempts: [
      {
        label: 'IM-2 A1 — the legacy provident-modules.json is DROPPED, not migrated: the boot neither reads nor removes it, and an existing one is left on disk UNREAD',
        run: async (): Promise<Probe> => {
          // ⟶ RE-GRAINED 2026-11-02 (`D-81`; D-78's second clause, the user's ruling). AS FILED this
          // attempt required `rmSync(`/`unlinkSync(` AND the legacy name in `main.ts` — the one-boot
          // window's removal, which was the proof the migration had RUN. **The claim INVERTS with the
          // disposition, and it is not deleted**: the registry's legacy file is dropped rather than
          // migrated, exactly as D-75 ruled for the tabs rows (*"stop projecting, not delete"*), so
          // the boot must carry NEITHER a reader NOR a remover for the name, and the file that stands
          // in a profile is the operator's. The row reddens the moment either half comes back.
          const main = mainCommentElided()
          if (main === null) return BREAK('main.ts unreadable')
          const removal = main.includes('rmSync(') || main.includes('unlinkSync(')
          const reader = main.includes('createModuleStore(')
          if (reader) return BREAK('`createModuleStore(` stands in src/main/main.ts again — the Q-5 read is deleted (D-81) and a re-added arm reddens here, because the file it reads is dropped, not migrated')
          if (removal) return BREAK('a `rmSync(`/`unlinkSync(` stands in src/main/main.ts — the boot must LEAVE an existing `provident-modules.json` on disk; the removal went with the arm (D-81)')
          return main.includes(DECLARED_LEGACY_FILE)
            ? BREAK('`provident-modules.json` is spelled in src/main/main.ts again — the name is not read, not written and not removed, so this boot names it nowhere (D-81)')
            : HOLD('the legacy registry file is DROPPED, not migrated: no reader, no removal and no spelling of the name in src/main/main.ts — an existing file is left on disk UNREAD (D-75\'s rule for the tabs rows, applied by D-81)')
        },
      },
      {
        label: 'IM-2 A2 — the persisted record is the instance\'s own file and the retired record\'s schema is validated by the IMPORT arm, which ANSWERS the diagnosis rather than throwing',
        run: async (): Promise<Probe> =>
          // ⟶ RE-GRAIN (`E-5`). AS FILED this attempt read `main.ts` for
          // `'<userData>/provident-settings.json'` and the Y-1 body for a `schemaVersion`
          // validation. THE CARRIER'S PATH IS GONE (L1 §3) and the read-time validation went with
          // it; what stands is the IMPORT arm's validation, which IS the retired boot read's own
          // (L1 §4 `ASM-3`) — `schemaVersion === '1'` or the corrupt arm. THE CLAIM IS UNMOVED —
          // the persisted record exists and validates as the declared schema — and it is now
          // measured where the schema is declared and DRIVEN at the answer it produces.
          ALL(
            instanceFileNameProbe(),
            importSchemaValidationProbe(),
            (() => {
              const valid = stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_VALID })
              return valid.threw === null && valid.legacy !== 'corrupt'
                ? HOLD(`a seeded retired record whose schemaVersion is the declared '1' is IMPORTED, not refused: legacy='${valid.legacy}', ${valid.rows.length} rows served (L1 §4)`)
                : BREAK(`a well-formed seeded record did not import: threw=${String(valid.threw)} legacy=${valid.legacy} — the import's validation is not the retired boot read's own (L1 §4 ASM-3)`)
            })(),
          ),
      },
      {
        label: 'IM-2 A3 — the RETIRED names write nothing of their own — ONE home, ONE reader, NO writer each — and the landing site carries NO file verb',
        run: async (): Promise<Probe> =>
          // ⟶ RE-GRAIN (`E-5`). The as-filed second half measured the tier-1 channel's OWN write
          // site for the atomic `mkdirSync → .tmp → fsync → renameSync → dir-fsync` sequence, with a
          // plain `writeFileSync` as the exactly-named anti-pattern. THERE IS NO CHANNEL WRITE SITE
          // ANY MORE: the writer retired (L1 §3), so a channel cannot copy the pattern because it
          // cannot write a file at all. THE CLAIM SURVIVES IN ITS STRONGEST FORM — the landing site
          // carries NO file verb — and `retiredStoreModelProbe` extends to BOTH retired names.
          ALL(retiredStoreModelProbe(), y2CommitSiteProbe()),
      },
      {
        label: 'IM-2 A4 — the write-site census: ONE whole-map commit, and no write/rename construct references a third provident-*.json literal',
        run: async (): Promise<Probe> => {
          // ⟶ RE-GRAIN (`E-5`): the as-filed settings-write probe looked for `.tmp` in the Y-2
          // region. The commit site is where the write happens now, so the census reads IT.
          const thirdLiteral = thirdLiteralWrites()
          return ALL(
            y2CommitSiteProbe(),
            thirdLiteral.length === 0
              ? HOLD('no write/rename construct in the main-side tree references a third provident-*.json literal')
              : BREAK(`a write construct references a third persisted filename: ${thirdLiteral.join(', ')} — the witness-gap pin (§2.7 item 2) reddens`),
          )
        },
      },
    ],
  },
  /* ─────────────────────── TWO REGISTER ROWS RETIRED WITH THEIR REFERENT (`E-5`) ───────────────────────
   *
   * `P-PS-IM-3` and `P-PS-SM-1` stood HERE and are RETIRED, not re-pointed. Their subject is not a
   * channel's answer: it is the tmp→fsync→rename staging sequence itself, which this unit DELETED
   * (`L1 §3`'s closed removal list, E-1; D-22). A row about the order of five `fs` calls has no
   * subject left once the five calls are gone, and the durability claim it carried is the PACKAGE's
   * now (`provident-storeroom`, cited not re-pointed: `L1 §10`, D-5). `RETIRED_REGISTER_ROWS` below
   * names each id, its subject, its referent and the surviving home, and the register report prints
   * that ledger, so a retirement can be audited but never re-entered silently (D-1, D-13).
   */
  {
    id: 'P-PS-SM-2',
    type: 'P-SM',
    property: 'THE BOOT-ORDER MACHINE (CLOSED — NO GRAPH LOAD BEFORE THE HAND-OFF)',
    strategy: 'S-PS-BSM-1',
    term: '6 attempts = 3 boot states (cold → [] · corrupt → the diagnosis on state().legacy, rows [] · persisted → the seeded rows) × 2 checkpoints per state (the hand-off precedes the first envelope load; the ANSWER for that boot is the declared one, DRIVEN). The cold and corrupt states also assert NOTHING throws. RE-GRAINED, E-5: every checkpoint-2 attempt probes the ANSWER the surface answers rather than a substring of a body no node test can import (L2 behaviour.md §1/§2)',
    attempts: [
      { label: 'SM-2 cold · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 cold · checkpoint 2 — the hand-off answers [] and NOTHING throws',
        run: async (): Promise<Probe> => {
          // ⟶ RE-GRAIN (`E-5`). AS FILED this read the Y-1 body for `existsSync` (the missing-file
          // arm) and the absence of `throw`. There is no file to probe for any more: the cold answer
          // is the SURFACE's, so the row DRIVES it (`behaviour.md` §1's first row, §2's `[]` row).
          const cold = stateDrive()
          return ALL(
            cold.threw === null ? HOLD('a cold profile answers — nothing throws (the import arm ran and found no record)') : BREAK(`a cold boot THREW: ${String(cold.threw)} — a missing file is a MISS, never an error`),
            cold.rows.length === 0 ? HOLD('the cold answer is [] — no invented row, no registered default smuggled in') : BREAK(`the cold answer carries ${cold.rows.length} rows — a cold tier must answer []`),
            cold.legacy === 'absent' ? HOLD("the diagnosis is 'absent' — the cold arm is a declared answer, not a swallow") : BREAK(`the cold arm answered legacy='${cold.legacy}' — declared 'absent'`),
            cold.twice === 'stable' ? HOLD('a second state() in the same process answers the same rows') : BREAK(`the second state() ${cold.twice} — the answer must be stable within one process`),
          )
        },
      },
      { label: 'SM-2 corrupt · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 corrupt · checkpoint 2 — the registered defaults; the module half\'s corrupt flag is the CROSSING\'s answer (D-81); NOTHING throws',
        run: async (): Promise<Probe> => {
          // ⟶ RE-GRAIN (`E-5`). AS FILED this read the Y-1 body for `catch` and the absence of
          // `throw`. The corrupt arm is now the IMPORT's answer (`L1 §4`: `legacy:'corrupt'`,
          // bytes standing, nothing thrown), so the row DRIVES it against an unparsable seed.
          const corrupt = stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_CORRUPT })
          return ALL(
            corrupt.threw === null ? HOLD('an unparsable retired record does NOT throw — the diagnosis is an answer') : BREAK(`an unparsable retired record THREW: ${String(corrupt.threw)} — a corrupt file must never throw (L1 §4)`),
            corrupt.legacy === 'corrupt' ? HOLD("the corrupt arm is REPORTED as legacy:'corrupt' — the diagnosis survives where the bytes are not repaired (L1 §4; ASM-4)") : BREAK(`the corrupt seed answered legacy='${corrupt.legacy}' — declared 'corrupt'`),
            corrupt.rows.length === 0 ? HOLD('the corrupt arm loads no row — its own declared recovery, the same one the retired boot read had (L1 §4)') : BREAK(`the corrupt arm answered ${corrupt.rows.length} rows — it must load none`),
            moduleCorruptIsTheCrossing(),
          )
        },
      },
      { label: 'SM-2 persisted · checkpoint 1 — the hand-off precedes the first envelope load', run: async (): Promise<Probe> => bootOrderProbe() },
      {
        label: 'SM-2 persisted · checkpoint 2 — the hand-off serves the persisted record (validated, never a throw)',
        run: async (): Promise<Probe> => {
          // ⟶ RE-GRAIN (`E-5`). AS FILED this read the Y-1 body for `schemaVersion` and `catch`.
          // The persisted answer is the imported ROWS, so the row DRIVES what the channel serves.
          const persisted = stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_VALID })
          const names = persisted.rows.map((r) => r.name).sort()
          const declared = Object.keys(JSON.parse(CARRIER_SEED_VALID) as Record<string, unknown>)
            .filter((n) => n.startsWith('file.'))
            .sort()
          return ALL(
            persisted.threw === null ? HOLD('the persisted boot answers — never a throw') : BREAK(`the persisted boot THREW: ${String(persisted.threw)}`),
            JSON.stringify(names) === JSON.stringify(declared)
              ? HOLD(`the seeded record's file.* rows are served VERBATIM and whole: ${names.join(', ')} (L1 §4; behaviour.md §2)`)
              : BREAK(`the persisted answer serves ${JSON.stringify(names)} — the seeded rows are ${JSON.stringify(declared)} (names must stand verbatim: L1 §4)`),
            names.includes('schemaVersion') ? BREAK("a `schemaVersion` ROW was served — the retired record's format marker is NOT operator state and is not carried (L1 §4; D-13)") : HOLD('no schemaVersion row is served (the format marker is dropped on import)'),
          )
        },
      },
    ],
  },
  {
    id: 'P-PS-TP-1',
    type: 'P-TP',
    property: 'RECEIPT TOTALITY — EVERY write-outcome class answers EXACTLY ONE of {committed, refused}; a refusal NEVER clears and leaves the previous rows intact',
    strategy: 'S-PS-RCPT-1',
    term: '3 attempts = 3 outcome classes (a committed whole-map commit · a refusal minted by the STORE, carrying its own status verbatim · a refusal minted by the CHANNEL before any store call: malformed-payload) × 1 assertion per class (the answer is the declared one and the previous rows stand on a refusal). RE-GRAINED (E-5): the as-filed four classes (success · tmp-write failure · fsync failure · rename failure) dissolved with the tmp sequence; the totality claim — every outcome answers exactly one receipt, never a swallow — is a CHANNEL ANSWER and is re-grained onto the answer itself, DRIVEN (L2 behaviour.md §3; L1 §3 ASM-2)',
    attempts: [
      {
        label: "TP-1 committed · the crossing answers {status:'committed'} and the committed rows stand",
        run: async (): Promise<Probe> => {
          const drive = commitDrive([{ name: 'file.tabs.order', value: ['a', 'b'] }])
          return ALL(
            drive.threw === null ? HOLD('the commit answers — never a throw') : BREAK(`the commit THREW: ${String(drive.threw)}`),
            drive.status === 'committed' ? HOLD("the crossing's answer is {status:'committed'} — ONE receipt, no ordinal (ASM-L2-4)") : BREAK(`the commit answered status='${drive.status}'${drive.reason === null ? '' : ` reason='${drive.reason}'`} — declared 'committed'`),
            drive.after.length === 1 && drive.after[0].name === 'file.tabs.order'
              ? HOLD('the committed row stands, and it is the whole map that was sent (a commit is a whole-map replacement, A-6)')
              : BREAK(`the record after the commit holds ${JSON.stringify(drive.after.map((r) => r.name))} — expected exactly ['file.tabs.order']`),
          )
        },
      },
      {
        label: "TP-1 refused by the STORE · the answer carries the store's own status VERBATIM, and a refusal is one of the two receipt forms",
        run: async (): Promise<Probe> => {
          // A `null`-carrying value cannot be represented by the store's walk, so the commit is
          // refused as a VALUE (L1 §4's unrepresentable arm; guide §10.1/§10.2) — the one refusal
          // class a drive can reach from here, and the one whose SPELLING this re-grain is about:
          // the channel adds NO word of its own (L1 §3 ASM-2 retired 'write-failed').
          const drive = commitDrive([{ name: 'file.layout.dock', value: null }])
          return ALL(
            drive.threw === null ? HOLD('a refused commit still ANSWERS — never a swallow') : BREAK(`the refused commit THREW: ${String(drive.threw)}`),
            drive.status === 'refused' ? HOLD("the answer is {status:'refused', reason} — one of the two receipt forms and no third") : BREAK(`the answer was '${drive.status}' — a refusal must answer the refused form, never a throw and never a silent success`),
            drive.reason !== null && drive.reason !== 'write-failed'
              ? HOLD(`the reason is the STORE's own status verbatim ('${drive.reason}'), not the retired closed vocabulary — one refusal, one spelling (L1 §3 ASM-2)`)
              : BREAK(`the reason is '${String(drive.reason)}' — ASM-2 retired 'write-failed': the refusal names the store's own status verbatim`),
            drive.after.length === 0 ? HOLD('a refusal clears nothing and commits nothing: the record holds no row from the refused map') : BREAK(`after a refusal the record holds ${JSON.stringify(drive.after.map((r) => r.name))} — a refusal must leave the previous rows standing`),
          )
        },
      },
      {
        label: "TP-1 refused by the CHANNEL · malformed-payload is decided BEFORE any store call",
        run: async (): Promise<Probe> =>
          // The channel's own pre-write refusal survives the retirement UNMOVED (L1 §3: "the
          // channel's pre-write refusal `'malformed-payload'`"), so its region is read where it is
          // still written — and its position before the commit is what the row asserts.
          y2Probe('outcome malformed payload', (y2) => {
            const arm = y2.indexOf("'malformed-payload'")
            const site = y2.indexOf('settingsSurface.commit(')
            return ALL(
              arm >= 0 ? HOLD("the channel's own 'malformed-payload' arm is present — its validation of the incoming translation") : BREAK("the channel's 'malformed-payload' arm is absent"),
              site >= 0 ? HOLD('and the body issues its one settingsSurface.commit(...) after that validation') : BREAK('the Y-2 body issues no settingsSurface.commit(...) — the write site is absent'),
              arm >= 0 && site >= 0 && arm < site ? HOLD('the channel refuses BEFORE any store call — a malformed translation never reaches the record (L1 §3)') : BREAK('the malformed-payload arm does not precede the commit — the channel would call the store on a payload it has already refused'),
            )
          }),
      },
    ],
  },
  /* ─────────────────────── TWO MORE REGISTER ROWS RETIRED WITH THEIR REFERENT (`E-5`) ───────────────────────
   *
   * `P-PS-TP-2` (VERSION-FROM-FIRST-WRITE) and `P-PS-SM-3` (THE THIRD HOLDER IS BOUNDED) stood HERE and are
   * RETIRED, not re-pointed. TP-2's subject is the `schemaVersion` STAMP the writer wrote onto every
   * payload: the stamp retired with the writer, and the instance has its own record shape (D-13, D-22), so
   * there is no first write that stamps anything. SM-3's subject is the `bootRecord` THIRD HOLDER: removed
   * with the boot read, so no reader holds a copy and every reader asks the surface on the call it serves
   * ("`main.ts` holds no copy of the rows", L2 behaviour.md §1).
   * BOTH ROWS' SURVIVING CLAIMS ARE PINNED ELSEWHERE AND NAMED HERE, not dropped: the
   * missing/unknown-version recovery is `SM-2`'s corrupt arm above plus the L2 import battery
   * (`tests/integration/settings-carrier-retirement/import.test.ts`); "after the hand-off the renderer
   * answers the handed-off values" is `M-7`'s renderer limbs (`rendererHydrateSeam`, `hydratedStoreDrive`).
   * `RETIRED_REGISTER_ROWS` below records all four retired ids with their subjects, referents and homes.
   */
]

/* ═══════════════════ THE RETIREMENT LEDGER — THE REGISTER'S OWN RECORD OF WHAT IT REPLACED ═══════════════
 *
 * L1 §6's rule, applied: **re-grain where the row's subject is a channel's answer; retire WITH THE
 * REFERENT where the subject is the hand-written machinery** (the tmp sequence, the `schemaVersion`
 * stamp, the carrier path, the third holder). A retirement is NEVER a silent deletion (D-13): each
 * retired id is named here with its subject, the referent that dissolved, and the surviving home of
 * any claim that is still true. The register report prints this ledger, and `runRegister` FAILS the
 * register if a retired id reappears among the live rows or if a surviving home is unnamed.
 *
 * WHY A RETIRED ROW MAY NOT SIMPLY BE RE-POINTED: `tests/store-security.test.ts`'s header states the
 * rule this file inherits — "a retired row is NEVER re-pointed: no deleted file is re-hashed and no
 * digest is re-pinned". Re-pointing would make the row a claim about a different subject wearing the
 * old row's name; the honest move is to retire it and SAY SO. */
interface RetiredRegisterRow {
  readonly id: string
  readonly type: string
  readonly strategy: string
  /** What the row was about. */
  readonly subject: string
  /** The machinery that dissolved — the REASON the row has no subject left. */
  readonly referent: string
  /** Where the surviving claim lives, or '' when no claim survived the referent. */
  readonly survivingHome: string
}

const RETIRED_REGISTER_ROWS: readonly RetiredRegisterRow[] = [
  {
    id: 'P-PS-IM-3',
    type: 'P-IM',
    strategy: 'S-PS-TORN-1',
    subject: 'TORN-FILE-IMPOSSIBLE AND NO tmp RESIDUE — 6 attempts over three injection points (tmp-write · fsync · rename) × two readings each',
    referent: 'the tmp→fsync→rename staging sequence itself: `.tmp` writes, the tmp fsync, renameSync and the directory fsync, all DELETED from `src/main/main.ts` with the carrier writer (L1 §3\'s closed removal list, E-1; D-22)',
    survivingHome: 'L1 §8 S-8 (a commit is ONE store write: no `.tmp`, no lock, no second name, on a booted app) and `provident-storeroom`\'s own durability, cited as the package\'s and never re-pointed here (L1 §10, D-5)',
  },
  {
    id: 'P-PS-SM-1',
    type: 'P-SM',
    strategy: 'S-PS-WSM-1',
    subject: 'THE COMMIT STATE MACHINE (CLOSED) — IDLE → TMP-WRITTEN → FSYNCED → RENAMED → COMMITTED, 8 attempts over four machine states × two terminals',
    referent: 'the same staging sequence, read as a state machine: every one of its four states is a position inside the five deleted `fs` calls, so the machine has no states once the calls are gone',
    survivingHome: 'the receipt-totality claim ("every outcome answers exactly one receipt") is a CHANNEL ANSWER and survives as `P-PS-TP-1` below, re-grained and driven; the durability half is the package\'s (L1 §10)',
  },
  {
    id: 'P-PS-TP-2',
    type: 'P-TP',
    strategy: 'S-PS-VER-1',
    subject: 'VERSION-FROM-FIRST-WRITE TOTALITY — the payload carries `schemaVersion` from its FIRST write; a missing/unknown version answers the declared recovery, 6 attempts over three payload shapes',
    referent: 'the `schemaVersion` STAMP the deleted writer composed onto every projection (`L1 §3`\'s `:366`; the stamp is the retired record\'s FORMAT MARKER, not operator state — L1 §4, D-13). The instance has its own record shape, so no first write stamps a version',
    survivingHome: 'the missing/unknown-version recovery survives as the IMPORT arm\'s answer and is pinned by `P-PS-SM-2`\'s corrupt checkpoint-2 attempt above and by the L2 import battery (`tests/integration/settings-carrier-retirement/import.test.ts`)',
  },
  {
    id: 'P-PS-SM-3',
    type: 'P-SM',
    strategy: 'S-PS-HOLD-1',
    subject: 'THE THIRD HOLDER IS BOUNDED (C-10/R1) — `bootRecord` populated at the boot read, refreshed only by the channel\'s own commits, served at Y-1, 6 attempts over three realm turns',
    referent: 'the `bootRecord` THIRD HOLDER and its corrupt flag, both removed with the boot read (L1 §3: `bootRecord`, `settingsCorrupt` and `readSettingsRecord()`), so there is no copy of the rows for any row to bound',
    survivingHome: 'the renderer half ("after the hand-off the renderer answers the handed-off values") is `M-7`\'s renderer limbs — `rendererHydrateSeam()` and `hydratedStoreDrive()` — and the post-removal claim is `M-7`\'s new ABSENCE limb: `main.ts` holds no `bootRecord` at all (L2 behaviour.md §1)',
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

/** **THE MODULE HALF'S POSTURE IS THE CROSSING'S NOW, AND IT IS READ WHERE THE PRODUCT STATES IT
 *  (2026-11-02, `D-81`; D-78's second clause).** AS FILED this was a DRIVE: `createModuleStore({ path })`
 *  over unparsable `provident-modules.json` bytes, asserting `corrupt:true` with an empty `loaded`.
 *  That claim's REFERENT is deleted — nothing reads that file, so a corrupt one answers nothing at
 *  all, and no node row can construct `main.ts`'s registry literal (`electron` at module scope,
 *  `interface.md` §8). What is still a claim, and is driven at both halves here, is **where the
 *  module registry's `corrupt` flag COMES FROM**: `main.ts` composes it out of the settings surface's
 *  own diagnosis (`legacy === 'corrupt' || storage === 'unreachable'`), never out of a module file, so
 *  the module half can report corrupt only when the CROSSING does. The structural half reddens the
 *  moment a module-file reader returns; the live half evaluates the composition's own terms over a
 *  real surface answer, so a source that stopped answering `legacy`/`storage` reddens too.
 *  **THE ROW IS NOT WEAKENED AND NOT DELETED: it moved from "a corrupt module file says corrupt" to
 *  "a corrupt module file cannot say anything, and the crossing's answer is what does."** */
function moduleCorruptIsTheCrossing(): Probe {
  const main = mainCommentElided()
  if (main === null) return BREAK('main.ts unreadable')
  const composed = /corrupt:\s*answer\.legacy\s*===\s*'corrupt'\s*\|\|\s*answer\.storage\s*===\s*'unreachable'/.test(main)
  if (!composed) return BREAK("the module registry's `corrupt` flag is no longer composed from the settings surface's own answer (`legacy === 'corrupt' || storage === 'unreachable'`) — the module half would be deciding corruption itself")
  if (main.includes(DECLARED_LEGACY_FILE)) return BREAK(`\`${DECLARED_LEGACY_FILE}\` is spelled in src/main/main.ts — a module-file reader is back, and the file it would answer over is dropped (D-81)`)
  // THE LIVE HALF: the composition's own two terms, evaluated over a REAL surface answer. A cold
  // profile must not read as corrupt — the answer is 'absent'/'standing', never 'corrupt'.
  const cold = stateDrive()
  if (cold.threw !== null) return BREAK(`the cold crossing THREW: ${String(cold.threw)} — the module half's corrupt term has no answer to compose from`)
  const wouldReportCorrupt = cold.legacy === 'corrupt' || cold.storage === 'unreachable'
  return wouldReportCorrupt
    ? BREAK(`the cold crossing answered legacy='${cold.legacy}' storage='${cold.storage}' — the composition would report the module registry CORRUPT over a profile with no record at all`)
    : HOLD(`module half: \`corrupt\` is the CROSSING's answer (legacy='${cold.legacy}', storage='${cold.storage}' on a cold profile ⇒ false, never a throw) and no module file is read to decide it (D-81)`)
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
  /** ⟶ `E-5`: the retirement ledger travels WITH the summary, so the report prints what the register
   *  replaced and the `it` row can assert the ledger's own integrity (no retired id live, no
   *  retiring row without a named surviving home or an explicit '(none)'). */
  readonly retiredIds: string
  readonly retiredTotal: number
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
 *  FAILURES. Un-run attempts/rows are reported UN-RUN — a FAILURE, never a pass. No seed.
 *
 *  ⟶ `E-5` — THE TERMS ARE NOW DERIVED FROM THE TABLES, never restated as a literal. The as-filed
 *  driver hardcoded `47 = 3+4+6+8+6+8+6+6` beside a table it could not check; four register rows
 *  retired here, so a restated literal would have had to be hand-reconciled with the table — the
 *  one thing a register must not do. `terms` and `typeSubtotals` are composed FROM
 *  `REGISTER_ROWS`, and `RETIRED_REGISTER_ROWS` is printed beside them, so the total, the
 *  subtotals and the retirement ledger cannot drift apart (`§4.2`: the totals print WITH their
 *  terms, and an un-run row is a FAILURE). */
async function runRegister(): Promise<RegisterSummary> {
  const counts = REGISTER_ROWS.map((r) => r.attempts.length)
  const declaredTotal = counts.reduce((a, b) => a + b, 0)
  const terms = `${declaredTotal} = ${counts.join('+')}`
  const byType = new Map<string, number[]>()
  for (const r of REGISTER_ROWS) {
    const list = byType.get(r.type) ?? []
    list.push(r.attempts.length)
    byType.set(r.type, list)
  }
  const typeParts: string[] = []
  for (const [type, list] of byType) typeParts.push(`${type} ${list.reduce((a, b) => a + b, 0)} = ${list.join('+')}`)
  const typeSubtotals = `${typeParts.join(' · ')} · ${[...byType.keys()].length} type groups = ${declaredTotal}`
  const retiredIds = RETIRED_REGISTER_ROWS.map((r) => r.id).join(', ')
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
  const largestRow = counts.length === 0 ? 0 : Math.max(...counts)
  return {
    declaredTotal,
    terms,
    typeSubtotals,
    retiredIds,
    retiredTotal: RETIRED_REGISTER_ROWS.reduce((n, r) => n + 1, 0),
    rowCapOk: REGISTER_ROWS.every((r) => r.attempts.length <= 100),
    rowCapText: `${REGISTER_ROWS.length} rows, largest ${largestRow} attempts ≤ 100 (headroom ${100 - largestRow})`,
    totalCapOk: declaredTotal <= 400,
    totalCapText: `${declaredTotal} ≤ 400 (headroom ${400 - declaredTotal})`,
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
  lines.push(`REGISTER-RETIRED-WITH-THEIR-REFERENT (E-5): ${s.retiredTotal} rows — ${s.retiredIds}`)
  for (const r of s.rows) {
    lines.push(`  ${r.id} [${r.type}] ${r.strategy} term ${r.attemptsTotal} → ${r.status} (held ${r.held} / broken ${r.broken} / unrun ${r.unrun})`)
    for (const a of r.perAttempt) {
      lines.push(`    ${a.held ? 'HELD  ' : 'BROKEN'} ${a.label}: ${a.why}`)
    }
  }
  for (const r of RETIRED_REGISTER_ROWS) {
    lines.push(`  RETIRED ${r.id} [${r.type}] ${r.strategy}`)
    lines.push(`    SUBJECT:  ${r.subject}`)
    lines.push(`    REFERENT: ${r.referent}`)
    lines.push(`    SURVIVES: ${r.survivingHome === '' ? '(no claim survived the referent)' : r.survivingHome}`)
  }
  return lines.join('\n')
}

function rendererTextSafe(): string {
  return readSrcSafe('renderer/renderer.ts') ?? ''
}

/** The comment-ELIDED renderer text (G4-P2's control surface): a probe that fires in this
 *  text observes the CALL, never the doc-comment's prose — a match that dies with the
 *  comments elided is a comment-only match and breaks. */
/**
 * **`main.ts` WITH ITS `//` LINES ELIDED — THE HONEST OBSERVABLE FOR A NAME THAT MUST NOT BE THERE
 * (2026-11-02, `D-81`).** The three probes that assert the module registry's legacy name is ABSENT
 * from the composition (`P-PS-IM-2` A1, `F-6`, `M-6`'s module half) test a claim about the CODE, and
 * the code here carries a long comment that NAMES the file in order to explain why it is no longer
 * read — which a bare `includes` cannot tell from a reader. This is `rendererCommentElided`'s idiom
 * (the `G4-P2` control, `:935`) applied to a second file: the class the `G4-P2` finding named, one
 * file over, and the same fix. Nothing here is softened — a comment cannot open a file.
 */
function mainCommentElided(): string | null {
  const text = readSrcSafe('main/main.ts')
  if (text === null) return null
  return text
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('//'))
    .join('\n')
}

function rendererCommentElided(): string | null {
  const text = readSrcSafe('renderer/renderer.ts')
  if (text === null) return null
  return text
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('//'))
    .join('\n')
}

/** The §2.9 Y-1 hand-off count — the REAL bracket-form call `bridge.store['get']()`
 *  (renderer.ts:570), never the doc-comment's `store.get()` prose (renderer.ts:556): the
 *  probes previously matched the comment, so the suite stayed green with the call deleted
 *  and would redden if the comment were removed (G4-P2, MED) — the honest observable is the
 *  CALL. The bracket spelling is also the one the fork-store-reads scanner's receiver
 *  grammar (a direct `.get(` on a store-ish receiver) stays silent for. */
function rendererHandoffCount(): number {
  return (rendererTextSafe().match(/store\[['"]get['"]\]\s*\(/g) ?? []).length
}

/** G4-P2's control — the bracket-form hand-off must still fire with every comment line
 *  elided: `rendererHandoffCount()` observes the CALL, not the comment (a comment-only
 *  match would drop to 0 here and break). */
function rendererHandoffControl(): boolean {
  const codeOnly = rendererCommentElided()
  return codeOnly !== null && (codeOnly.match(/store\[['"]get['"]\]\s*\(/g) ?? []).length === 1
}

/** The §2.9 tier-1 HYDRATION seam — the renderer boot CONSUMES the hand-off through the
 *  store's `hydrate(rows)` seam (`wired.hydrate(bootHandoff)`, renderer.ts:605): the
 *  G4-P1 gap's closure — bootHandoff is fed to the store, never captured-and-held. */
function rendererHydrateSeam(): Probe {
  const codeOnly = rendererCommentElided()
  const wired = codeOnly !== null && /hydrate\s*\(\s*bootHandoff\s*\)/.test(codeOnly)
  return wired
    ? HOLD("the renderer feeds the handed-off record into the store's hydrate seam (wired.hydrate(bootHandoff), renderer.ts:605) — bootHandoff is CONSUMED, not captured-and-held")
    : BREAK("the renderer's boot does not call wired.hydrate(bootHandoff) — bootHandoff is captured-but-never-consumed (the G4-P1 gap reading)")
}

/** THE HYDRATED-STORE DRIVE (the G4-P1 closure's reading — tier-1 `resolve` answers the
 *  hydrated value AFTER boot): a fresh store resolves the declared tier-1 name COLD (a miss —
 *  the declaration is minted, no value), `hydrate` feeds the hand-off-shaped record (the
 *  shape the Y-1 hand-off answers), and the SAME name resolves a HIT carrying the hydrated
 *  value. A wiring-held-only reading — the call exists but the record is never consumed —
 *  breaks this drive. */
function hydratedStoreDrive(): Probe {
  const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'settings' }]) })
  const cold = store.resolve('file.settings')
  store.hydrate([{ name: 'file.settings', value: { theme: { token: 'a' } } }])
  const after = store.resolve('file.settings')
  const ok = !cold.found && after.found
  return ok
    ? HOLD('tier-1 resolve answers the hydrated value AFTER boot (cold resolve = a miss; post-hydrate resolve = a hit carrying the handed-off value)')
    : BREAK(`tier-1 resolve does not answer the hydrated value after hydrate (cold found=${cold.found}; post-hydrate found=${after.found}) — the handed-off record is NOT consumed by the store`)
}

/** Write/rename constructs across the main-side tree that carry a `provident-*.json` literal.
 *  ⟶ `C-4` — the scan list is EXTENDED by the module that now carries the operator store's own
 *  persisted literal (`main/operator-settings/index.ts`): a write/rename/rm/unlink construct spelled
 *  beside THAT name is a third persisted filename exactly as it is beside the tier-1 carrier's. */
function thirdLiteralWrites(): string[] {
  const found: string[] = []
  const op = /(writeFileSync|appendFileSync|renameSync|rmSync|unlinkSync)\s*\(/g
  // ⟶ `C-4` RE-GRAIN (`security-store-storeroom` `E-5`): `main/security-store.ts` LEFT this scan list
  // with the file it named — `E-1` deleted it, and an absent path contributed nothing but a vacuous
  // member to a census whose subject is "which files carry a `provident-*.json` literal". The module
  // that now carries the operator store's own persisted literal is `OPERATOR_SETTINGS_MODULE`
  // (`main/operator-settings/index.ts`, the retired file's successor), which sits in the list below.
  // ⟶ `D-81` (2026-11-02): `main/module-store.ts` LEFT this scan list with the file it named, on the
  // same rule the `C-4` re-grain above used for `main/security-store.ts` — an absent path contributes
  // nothing but a vacuous member to a census whose subject is "which files carry a
  // `provident-*.json` literal". It is the SECOND path this list has shed for that reason.
  for (const rel of ['main/main.ts', 'main/preload.ts', 'main/mcp-server.ts', 'main/store-channels.ts', OPERATOR_SETTINGS_MODULE]) {
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

/* ───────────────────── THE `C-4` CENSUS OF THE OPERATOR STORE'S MODULE (`E-1`/`C-4`) ───────────────────── */

const escapeLiteral = (literal: string): string => literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** `const <symbol> = '<literal>'` — the ONE binding a persisted name has in the module that owns it. */
function nameBinding(text: string, symbol: string, literal: string): boolean {
  return new RegExp(`const\\s+${symbol}\\s*=\\s*'${escapeLiteral(literal)}'`).test(text)
}

/** The name is JOINED onto the userData directory — the consolidated-location rule (§2.7 items 1/2)
 *  read where `C-4` moved it. A name joined onto any other directory, or unbound, FAILS. */
function joinedUnderUserData(text: string, symbol: string): boolean {
  return new RegExp(`join\\(\\s*(?:options\\.)?userDataDir\\s*,\\s*${symbol}\\s*\\)`).test(text)
}

/** THE RETIRED MODEL'S OWN WRITE CENSUS (`E-1`; persistence §2/§3/§5). `src/main/operator-settings/
 *  index.ts` is the RETIRED `security-store.ts`'s successor and it writes NOTHING: each retired name is
 *  bound to ONE constant and read by ONE `readFileSync` — the import-once path — and never written,
 *  renamed, repaired or deleted; the instance's own bytes belong to `provident-storeroom`. Each name
 *  must have ONE home in `src/**` — a re-pointer anywhere else (a second reader, a writer, a repair)
 *  FAILS.
 *
 *  ⟶ RE-GRAINED (`E-5`): the as-filed census demanded EXACTLY ONE `readFileSync` in this module,
 *  because one retired record existed. THIS UNIT ADDS THE SECOND IMPORT-ONCE ARM (`L1 §4`; D-19's
 *  precedent), so the declared census is TWO reads — the security record's and the carrier's — and
 *  still NO write, rename, repair or delete (`L2 behaviour.md` §8 `RET-3`; `persistence.md`:43). The
 *  claim the old figure carried — "the retired names are read once each and written never" — is
 *  UNMOVED and is now asserted per name rather than by a bare total. */
function retiredStoreModelProbe(): Probe {
  const model = readSrcSafe(OPERATOR_SETTINGS_MODULE)
  if (model === null) {
    return BREAK(`the operator store's module (${OPERATOR_SETTINGS_MODULE}) is unreadable — the RETIRED names have no observable model at all (the retired security-store.ts is DELETED, E-1)`)
  }
  const homes = scanSrcFor(DECLARED_SECURITY_FILE)
  if (homes.length !== 1 || homes[0] !== OPERATOR_SETTINGS_MODULE) {
    return BREAK(`the RETIRED name '${DECLARED_SECURITY_FILE}' must live in ONE module (${OPERATOR_SETTINGS_MODULE}) and nowhere else — measured ${JSON.stringify(homes)}; a second home is a re-pointer, and the retired file is RETIRED, never re-pointed`)
  }
  if (!nameBinding(model, 'RETIRED_NAME', DECLARED_SECURITY_FILE)) {
    return BREAK(`'${DECLARED_SECURITY_FILE}' is not bound to the constant RETIRED_NAME in ${OPERATOR_SETTINGS_MODULE} — the retired name is spelled ad hoc, not declared as the one retired name`)
  }
  if (!nameBinding(model, 'RETIRED_SETTINGS_NAME', DECLARED_SETTINGS_FILE)) {
    return BREAK(`'${DECLARED_SETTINGS_FILE}' is not bound to the constant RETIRED_SETTINGS_NAME in ${OPERATOR_SETTINGS_MODULE} — this unit's second import-once arm has no declared name (L1 §4; E-5)`)
  }
  const readers = (model.match(/readFileSync\s*\(/g) ?? []).length
  const writers = (model.match(/\b(?:writeFileSync|appendFileSync|renameSync|rmSync|unlinkSync)\s*\(/g) ?? []).length
  // EACH retired name has its OWN import read — asserted by name, not by the total alone, so a second
  // read of the SAME file cannot masquerade as the second arm.
  const securityRead = /readFileSync\(join\(userDataDir, RETIRED_NAME\), 'utf8'\)/.test(model)
  const carrierRead = /readFileSync\(join\(userDataDir, RETIRED_SETTINGS_NAME\), 'utf8'\)/.test(model)
  if (readers !== 2) return BREAK(`the operator store's module makes ${readers} readFileSync calls — the declared census is TWO import-once reads, one per retired name (L2 behaviour.md §8 RET-3; E-5)`)
  if (!securityRead || !carrierRead) {
    return BREAK(`the two reads are not one-per-retired-name: security record read ${securityRead}, carrier read ${carrierRead} — each retired name has its OWN import-once read and neither is read twice`)
  }
  if (writers !== 0) return BREAK(`the operator store's module makes ${writers} write/rename/rm/unlink calls — it writes NOTHING: neither retired file is written, renamed, repaired or deleted and the instance's bytes are provident-storeroom's`)
  return HOLD(`both RETIRED names have ONE home each, ONE reader each and NO writer: ${OPERATOR_SETTINGS_MODULE} binds RETIRED_NAME and RETIRED_SETTINGS_NAME, reads each exactly once through its import-once path, and its only fs calls are those two reads`)
}

/** THE INSTANCE'S OWN PERSISTED NAME, CREATED AT CONSTRUCTION (`C-4`): `FILE_NAME =
 *  'provident-operator-settings.json'` is bound in the same module and handed to the store as
 *  `filePath` joined onto the userData directory — one instance, one name, no second `filePath`. */
function instanceFileNameProbe(): Probe {
  const model = readSrcSafe(OPERATOR_SETTINGS_MODULE)
  if (model === null) return BREAK(`the operator store's module (${OPERATOR_SETTINGS_MODULE}) is unreadable — the instance's own persisted name cannot be observed`)
  if (!nameBinding(model, 'FILE_NAME', DECLARED_OPERATOR_SETTINGS_FILE)) {
    return BREAK(`'${DECLARED_OPERATOR_SETTINGS_FILE}' is not bound to the constant FILE_NAME in ${OPERATOR_SETTINGS_MODULE} — the instance's own name is not declared where C-4 puts it`)
  }
  if (!/filePath:\s*join\(\s*options\.userDataDir\s*,\s*FILE_NAME\s*\)/.test(model)) {
    return BREAK(`the instance's own name is not joined onto the userData directory at CONSTRUCTION (no \`filePath: join(options.userDataDir, FILE_NAME)\` in ${OPERATOR_SETTINGS_MODULE}) — the second persisted file has no declared creation site`)
  }
  return HOLD(`the instance's own '${DECLARED_OPERATOR_SETTINGS_FILE}' is created at construction under <userData> (filePath: join(options.userDataDir, FILE_NAME)) and no second filePath is supplied`)
}

/** THE RETIRED RECORD'S SCHEMA VALIDATION, READ WHERE THE IMPORT DECLARES IT (`E-5`; L1 §4 `ASM-3`:
 *  "the import's validation is the retired boot read's own"). After the carrier retired there is no
 *  read-time validation in `main.ts` — the ONLY place a `schemaVersion` is still understood is the
 *  import arm in the instance module, and it must understand it as the retired boot read did: the
 *  single reserved `schemaVersion === '1'`, everything else `corrupt`. */
function importSchemaValidationProbe(): Probe {
  const model = readSrcSafe(OPERATOR_SETTINGS_MODULE)
  if (model === null) return BREAK(`the operator store's module (${OPERATOR_SETTINGS_MODULE}) is unreadable — the import's schema validation cannot be observed`)
  if (!/schemaVersion\s*!==\s*'1'|schemaVersion\s*===\s*'1'/.test(model)) {
    return BREAK("the import arm does not validate `schemaVersion === '1'` — without it an unknown stamp would import as rows, which is the laxer import ASM-3 rejects (L1 §4)")
  }
  if (!/legacy:\s*'corrupt'/.test(model)) {
    return BREAK("the import arm does not answer the corrupt arm — a refused validation must be a DECLARED diagnosis, never a throw (L1 §4 ASM-4)")
  }
  return HOLD("the import arm validates the retired record's ONE reserved stamp (`schemaVersion === '1'`) and answers the corrupt arm rather than throwing — the retired boot read's own validation, carried (L1 §4 ASM-3)")
}

/* ⟶ `E-5`: `tier1WriteSiteProbe()` and the atomic-sequence helpers it composed
 * (`atomicSequenceProbe`, `atomicSequenceProbeIn`, `tmpTargetOnly`, `tmpNeverParsed`,
 * `refusalBeforeRename`, `writeFailedArm`) were removed from this file WITH THEIR REFERENT. Each of
 * them read the five-call staging sequence out of `main.ts`'s Y-2 body; the sequence is deleted
 * (L1 §3's closed removal list, E-1; D-22), the body issues ONE `settingsSurface.commit(...)` and no
 * file verb at all (`y2CommitSiteProbe` below), so a helper that scanned for `.tmp`, `fsync` or
 * `renameSync` would now be a scanner over nothing. Keeping them would let a reader believe the
 * machinery is still somewhere to be checked — the exact confusion L1 §3's "closed removal list"
 * exists to prevent. The anti-pattern claim they carried survives in its strongest available form:
 * the landing site carries NO file write verb at all (IM-2 A3, `y2CommitSiteProbe`), and the retired
 * `'write-failed'` vocabulary is asserted ABSENT rather than present (`F-2`). */

/* ═══════════════════════ THE `E-5` DRIVES — THE ANSWER, NEVER THE MACHINERY ═══════════════════════ *
 * WHY THESE EXIST, IN ONE SENTENCE: the tmp→fsync→rename sequence, the `schemaVersion` stamp, the
 * carrier path and the third holder are GONE (D-22, D-1), so every row whose subject was that
 * machinery is RETIRED WITH ITS REFERENT — while every row whose subject was A CHANNEL'S ANSWER is
 * RE-GRAINED onto the answer itself, which the surface below IS (`L1 §6`; `L2 behaviour.md` §2/§3;
 * `persistence.md`). The drives are honest for the same reason the scans they replace were: `main.ts`
 * imports `electron` at module scope, so its two handler BODIES are unimportable in a node test — but
 * `settingsSurface.state()` and `settingsSurface.commit(rows)` ARE the two calls those bodies make
 * (`src/main/main.ts:279`, `:318`), and they are importable, so the answer can be DRIVEN. */

/** THE RETIRED CARRIER AS A SEED — written by the ROW, never by a module. The import arm's own
 *  validation is the retired boot read's (`L1 §4` `ASM-3`), so one well-formed seed and one
 *  unparsable seed are the two arms a row can hand it. `schemaVersion:'1'` is the retired record's
 *  own reservation and is NOT carried as a row (`L1 §4`; D-13). */
const CARRIER_SEED_VALID = JSON.stringify({
  'file.tabs.order': ['a', 'b'],
  'file.settings.theme.token': 'themed',
  'file.modules.m': { name: 'm', version: '1' },
  schemaVersion: '1',
})
const CARRIER_SEED_CORRUPT = '{ this is not json'

/** One profile per drive, removed afterwards, so no row leaks a directory into the machine. */
function withProfile<T>(body: (dir: string) => T, seed?: { name: string; text: string }): T {
  const dir = mkdtempSync(join(tmpdir(), 'g2-surface-'))
  try {
    if (seed !== undefined) writeFileSync(join(dir, seed.name), seed.text, 'utf8')
    return body(dir)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

interface StateDrive {
  readonly rows: { name: string; value: unknown }[]
  readonly legacy: string
  readonly storage: string
  readonly threw: string | null
  readonly twice: 'stable' | 'drifted' | 'threw'
}

/** Y-1's ANSWER, driven: `settingsSurface.state()` is the ONE reading `main.ts`'s Y-1 body mints its
 *  `{name,value}[]` from, so this IS the channel's answer (`behaviour.md` §2: cold `[]`, never a
 *  throw; a corrupt import arm answers `[]` with the diagnosis on `state().legacy`, never in the
 *  answer; the second call reads no file and answers the same rows). */
function stateDrive(seed?: { name: string; text: string }): StateDrive {
  return withProfile((dir) => {
    try {
      const surface = createSettingsSurface({ userDataDir: dir })
      const first = surface.state()
      const second = surface.state()
      return {
        rows: first.rows.map((r) => ({ name: r.name, value: r.value })),
        legacy: first.legacy,
        storage: first.storage,
        threw: null,
        twice: JSON.stringify(second.rows) === JSON.stringify(first.rows) ? 'stable' : 'drifted',
      } as StateDrive
    } catch (caught) {
      return { rows: [], legacy: 'threw', storage: 'threw', threw: caught instanceof Error ? caught.message : String(caught), twice: 'threw' } as StateDrive
    }
  }, seed)
}

interface CommitDrive {
  readonly status: string
  readonly reason: string | null
  readonly after: { name: string; value: unknown }[]
  readonly threw: string | null
}

/** Y-2's ANSWER, driven at the verb `main.ts:318` delegates to: one `commit` of the projected rows,
 *  answering `{status:'committed'}` or a refusal whose reason is the STORE's own status verbatim
 *  (`ASM-2`; `behaviour.md` §3). */
function commitDrive(rows: { name: string; value: unknown }[]): CommitDrive {
  return withProfile((dir) => {
    try {
      const surface = createSettingsSurface({ userDataDir: dir })
      const answer = surface.commit(rows)
      const after = surface.state().rows.map((r) => ({ name: r.name, value: r.value }))
      return {
        status: answer.status,
        reason: answer.status === 'refused' ? answer.reason : null,
        after,
        threw: null,
      } as CommitDrive
    } catch (caught) {
      return { status: 'threw', reason: null, after: [], threw: caught instanceof Error ? caught.message : String(caught) } as CommitDrive
    }
  })
}

/** THE LANDING SITE'S OWN SHAPE, read where the write now happens: the Y-2 body issues ONE
 *  `settingsSurface.commit(` and calls NO `node:fs` write verb at all — the staging machinery
 *  retired with the carrier and the store owns durability (`L1 §3`; `behaviour.md` §3's last
 *  bullet: "no `.tmp`, no lock, no second name"). */
function y2CommitSiteProbe(): Probe {
  const y2 = y2Region()
  if (y2 === null) return BREAK('the Y-2 handler region is absent from src/main/main.ts')
  const sites = (y2.match(/settingsSurface\.commit\s*\(/g) ?? []).length
  if (sites !== 1) return BREAK(`the Y-2 body issues ${sites} settingsSurface.commit(...) calls — a whole-map commit is ONE store write, one op, one receipt (L1 §3; behaviour.md §3)`)
  const fsVerbs = ['writeFileSync', 'renameSync', 'fsyncSync', 'openSync', 'closeSync', 'mkdirSync', 'appendFileSync', 'unlinkSync'].filter((v) => new RegExp(`\\b${v}\\s*\\(`).test(y2))
  if (fsVerbs.length > 0) return BREAK(`the Y-2 body still calls ${fsVerbs.join(', ')} — the tmp+rename+fsync writer retired with the carrier (L1 §3; D-22)`)
  return HOLD('the Y-2 body issues ONE settingsSurface.commit(...) and no file verb at all: the commit is one store write and the staging machinery is gone (L1 §3; behaviour.md §3)')
}

/** THE `schemaVersion` CENSUS AFTER THE STAMP RETIRED: the token is the IMPORT ARM's validation and
 *  nothing else — one home, in the instance module, and NO write-time stamp anywhere in `src/**`
 *  (`L1 §4`; behaviour.md §5's last bullet: the migration's composition carries no `schemaVersion`). */
function schemaVersionHomes(): string[] {
  return scanSrcFor('schemaVersion')
}

/** THE RETIRED REFUSAL VOCABULARY, ASSERTED ABSENT (`E-5`; ASM-2). The as-filed channel answered
 *  `{status:'refused', reason:'write-failed'}`; the carrier's retirement replaced that closed word
 *  with **the store's own status verbatim** (L1 §3 ASM-2: keeping the old vocabulary "gives one
 *  refusal two spellings and hides the cause"). So the claim is now a NEGATIVE one, and it is
 *  stronger than the positive one it replaces: the retired word must stand NOWHERE in the Y-2 body. */
function retiredWriteFailedAbsent(): Probe {
  const y2 = y2Region()
  if (y2 === null) return BREAK('the Y-2 handler region is absent from src/main/main.ts')
  return y2.includes("'write-failed'") || y2.includes('"write-failed"')
    ? BREAK("the retired 'write-failed' vocabulary still stands in the Y-2 body — ASM-2 retired it: a refusal answers the STORE's own status verbatim, one refusal and one spelling (L1 §3)")
    : HOLD("the retired 'write-failed' vocabulary stands nowhere in the Y-2 body — the refusal is the store's own status verbatim (L1 §3 ASM-2)")
}

/* ═════════════════════════════ THE TESTS — authored in §4.2's order ═════════════════════════════ */

describe('G2 U-STORE-PERSIST — tier-1 crossing: THE RED SET (from docs/specs/store-persist.md alone)', () => {
  /* ── §4.2 (1) THE REGISTER FIRST — §5.5.1, 8 rows / 47 attempts ── */

  describe('§5.5.1 the typed property register (executed deterministically; strategy ids; terms)', () => {
    it('executes all four surviving rows with their strategy ids and terms; the totals are printed WITH their terms; the retirement ledger is printed and consistent; caps hold; no seed; un-run rows are FAILURE', async () => {
      // ⟶ RE-GRAINED (`E-5`): the register's as-filed census was 8 rows / 47 attempts. FOUR ROWS
      // RETIRED WITH THEIR REFERENTS (§5.5.1: IM-3 and SM-1 with the tmp sequence, TP-2 with the
      // `schemaVersion` stamp, SM-3 with the third holder) and their surviving claims moved to the
      // homes `RETIRED_REGISTER_ROWS` names. The surviving four are IM-1 (untouched), IM-2, SM-2 and
      // TP-1 (all re-grained onto the ANSWERS their subjects now answer). NOTHING IS WEAKENED: the
      // caps, the no-seed rule, the stop-after-five rule and "un-run ⇒ FAILURE" are unmoved, and the
      // ledger below is now itself an asserted row, so a retirement cannot go silently missing.
      const s = await runRegister()
      console.log(registerReport(s))
      expect(s.rowCapOk, s.rowCapText).toBe(true)
      expect(s.totalCapOk, s.totalCapText).toBe(true)
      expect(s.declaredTotal, `declared totals must be printed with terms: ${s.terms}`).toBe(REGISTER_ROWS.reduce((n, r) => n + r.attempts.length, 0))
      expect(s.rows.length, 'every surviving register row must execute (an un-run register row is a FAILURE, never a pass)').toBe(REGISTER_ROWS.length)
      expect(s.stoppedAt, `the register stopped at attempt ${s.stoppedAt} — un-run rows are FAILURE`).toBeNull()
      expect(s.brokenTotal, `broken attempts: ${s.brokenTotal} (first-row reasons in the report above)`).toBe(0)
      expect(s.unrunTotal, `un-run attempts: ${s.unrunTotal} (reported as FAILURE)`).toBe(0)
      // THE RETIREMENT LEDGER'S OWN INTEGRITY — three limbs, each falsifiable:
      //  (a) no retired id stands among the live rows (a retirement that came back reddens here);
      //  (b) every retired row NAMES its subject, its dissolved referent and the home of any surviving
      //      claim, so a retirement is never a silent deletion (D-13);
      //  (c) the ledger is non-empty and printed with the totals, so the report shows what it replaced.
      const liveIds = REGISTER_ROWS.map((r) => r.id)
      const retiredIds = RETIRED_REGISTER_ROWS.map((r) => r.id)
      expect(retiredIds.filter((id) => liveIds.includes(id)), 'a retired register row id reappeared among the live rows — a retirement must not be re-entered silently').toEqual([])
      expect(new Set([...liveIds, ...retiredIds]).size, 'the live and retired ids must be DISTINCT — an id cannot be both').toBe(liveIds.length + retiredIds.length)
      expect(retiredIds.length > 0 && s.retiredTotal === retiredIds.length, `the retirement ledger must be printed with the totals (measured ${s.retiredTotal})`).toBe(true)
      for (const r of RETIRED_REGISTER_ROWS) {
        expect(r.subject.length > 0, `retired ${r.id} must NAME its subject — a retirement that says only its id is a silent deletion`).toBe(true)
        expect(r.referent.length > 0, `retired ${r.id} must NAME the referent that dissolved — that is the whole reason it was retired rather than re-pointed`).toBe(true)
      }
      // THE INSTRUMENT IS NOT VACUOUS: driven over a synthetic table that re-enters a retired id, the
      // same distinctness instrument MUST fail — a ledger check that cannot go red is a rubber stamp.
      const controlLive = [...liveIds, retiredIds[0]]
      expect(controlLive.filter((id) => retiredIds.includes(id)).length > 0, 'CONTROL — re-entering a retired id MUST be detectable by the instrument used above').toBe(true)
    })
  })

  /* ── §4.2 (2) THE BEHAVIOURAL M-* ROWS — §3.1 ── */

  describe('M-rows — valid / happy states (§3.1)', () => {
    it('M-1: a tier-1 commit crosses once and lands as ONE store write (§2.4/§2.6; crossings: 1)  [RE-GRAINED, E-5: the atomic sequence at the landing site became ONE whole-map commit]', async () => {
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
      // THE CHANNEL/LANDING SIDE (this unit's) — RE-GRAINED. AS FILED it asserted the atomicity at the
      // landing site (mkdirSync → .tmp → fsync → renameSync → dir-fsync). THAT SEQUENCE IS DELETED
      // (L1 §3, E-1): the landing site is now ONE `settingsSurface.commit(...)` and the durability is
      // the PACKAGE's (D-22, cited not re-pointed). So the row pins what "lands atomically" came to
      // mean at this head — one crossing, one whole-map commit, one receipt, no file verb — and it
      // additionally DRIVES the answer the channel serves.
      const landed = commitDrive([{ name: 'file.tabs.order', value: ['a', 'b'] }])
      assertProbe(ALL(
        crossingSeamProbe(),
        y2CommitSiteProbe(),
        retiredWriteFailedAbsent(),
        committedToken(y2Region() ?? ''),
        landed.status === 'committed' ? HOLD("the commit that IS the landing answers {status:'committed'} — one op, one receipt") : BREAK(`the landing commit answered '${landed.status}' — declared 'committed'`),
      ), 'M-1 channel/landing side')
    })

    it('M-2: a cold boot answers [] and boots on it (§2.3 item 1, §2.6 item 4, §2.9 consequence (3))  [RE-GRAINED, E-5: the answer is driven]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the settings half read the Y-1 body for `existsSync`. There is no
      // file for the channel to probe any more: the cold answer is the SURFACE's (`behaviour.md` §2,
      // §1's first row), so the row DRIVES it. **THE MODULE HALF IS RE-DERIVED, NOT UNMOVED (D-81)**:
      // its store and its file are deleted, so the cold claim is driven over the crossing's own rows
      // (`moduleColdRegistryIsTheCrossing`, below).
      const cold = stateDrive()
      assertProbe(ALL(
        bootOrderProbe(),
        cold.threw === null ? HOLD('a cold profile answers — NOTHING throws') : BREAK(`the cold boot THREW: ${String(cold.threw)}`),
        cold.rows.length === 0 ? HOLD('the hand-off answers [] — the cold tier is a MISS, never an error and never an invented value') : BREAK(`the cold answer carries ${cold.rows.length} rows — declared []`),
        cold.legacy === 'absent' ? HOLD("and the diagnosis is the declared 'absent'") : BREAK(`the cold arm answered legacy='${cold.legacy}' — declared 'absent'`),
        moduleColdRegistryIsTheCrossing(),
      ), 'M-2 cold boot')
    })

    it('M-3: a persisted boot serves the record BEFORE the first graph load (§2.9 consequences (1)/(3), the hydration pin\'s PERSIST half)  [RE-GRAINED, E-5: the serve path is the imported rows]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the serve path was `bootRecord` + a `schemaVersion` validation in
      // the Y-1 body. The third holder is gone and the validation is the import's, so what the row now
      // drives is the ORDER (unmoved) and the SERVED RECORD (the imported rows) — the persist half of
      // the hydration pin, which is exactly what it was always about.
      const persisted = stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_VALID })
      assertProbe(ALL(
        bootOrderProbe(),
        persisted.threw === null ? HOLD('a persisted profile answers the boot read — never a throw') : BREAK(`the persisted boot THREW: ${String(persisted.threw)}`),
        persisted.rows.length > 0 ? HOLD(`the boot serves the persisted record BEFORE the first graph load: ${persisted.rows.length} rows stand in the instance (L1 §5: parity is the next process's answer)`) : BREAK('the persisted serve path is absent — a seeded record answered no row'),
        persisted.twice === 'stable' ? HOLD('and the same rows are served on a second reading within the process') : BREAK(`the second state() ${persisted.twice}`),
        rendererHandoffCount() === 1 && rendererHandoffControl() ? HOLD('the renderer calls the hand-off once — the REAL bracket-form bridge.store[\'get\']() (renderer.ts:570), comment-elided control held (G4-P2)') : BREAK('the renderer\'s hand-off call (bridge.store[\'get\'](), renderer.ts:570) is absent from the CODE'),
        rendererHydrateSeam(),
      ), 'M-3 persisted boot')
    })

    it('M-4: a repeated identical write is a DECLARED second write (§2.4 item 5 (b), §0A item 4)  [RE-GRAINED, E-5: the per-arriving-crossing duty, without the staging machinery]', async () => {
      // LANDED-SURFACE OBSERVATION (driven): the STORE itself suppresses the crossing for an
      // identical value (two identical commits → crossings observed: 1) — the store decides
      // whether to cross. The CHANNEL's declared duty (§0A item 4) is the per-arriving-crossing
      // duty: WHEN a put arrives, a FULL write (one projection, one commit, one receipt) — the
      // channel never compares values and never no-ops.
      const calls: { name: string; value: unknown }[] = []
      const store = createGraphStore({
        declarations: storeGraphReferences([{ name: 'settings' }]),
        crossing: { put: (row) => { calls.push(row); return { status: 'committed' as const } } },
      })
      const r1 = store.commit('file.settings', { theme: { token: 'a' } })
      const r2 = store.commit('file.settings', { theme: { token: 'a' } })
      expect(r1.status === 'committed' && r2.status === 'committed',
        `M-4 store drive — repeated identical commits answer committed receipts (crossings observed: ${calls.length}; the store suppresses the identical crossing — the channel's duty below is per-arriving-crossing)`).toBe(true)
      // ⟶ RE-GRAIN (`E-5`): the channel half loses the atomic-sequence limb (deleted with the writer)
      // and keeps the two claims that are still about the channel: it performs NO comparison read-back
      // and it answers the committed receipt. The "one projection" is asserted at the landing site.
      assertProbe(y2Probe('idempotence', (y2) => ALL(
        y2.includes('readFileSync') ? BREAK('the Y-2 write reads the file back — the channel must not compare values (§0A item 4)') : HOLD('the write path performs no comparison read-back — the channel never decides whether to write'),
        y2CommitSiteProbe(),
        committedToken(y2),
      )), 'M-4 channel half')
    })

    it('M-5: the migration lands in ONE write and the readers re-point (§2.8 items 1/2)  [RE-GRAINED, E-5: the one write is the app-state commit]', async () => {
      const main = mainCommentElided() ?? ''
      assertProbe(ALL(
        main.includes('file.modules') ? HOLD('the module registry lands under the declared namespace file.modules.<id>') : BREAK('the file.modules.<id> namespace is not wired — the Q-5 migration is absent'),
        main.includes('moduleStore.setDisabled')
          ? BREAK('writer class 1 (ipcMain.handle(IPC_MODULE_SET_DISABLED)) still writes the legacy module store directly — the two-writer class this correction names')
          : HOLD('the operator toggle is re-pointed to the store\'s file tier'),
        // ⟶ RE-GRAIN (`E-5`). AS FILED this limb asserted `main.ts` spells
        // `<userData>/provident-settings.json` — the carrier. The carrier retired, so the limb asserts
        // what the migration's ONE write actually is: a commit of the composed rows, which is the same
        // `settingsSurface.commit(...)` every other writer class issues (L2 behaviour.md §5).
        /settingsSurface\.commit\s*\(/.test(main) ? HOLD('the migration\'s ONE write is a settingsSurface.commit(...) of the composed rows — the same verb every writer class issues (behaviour.md §5)') : BREAK('the migration has no commit site — the one write is absent'),
        // ⟶ RE-DERIVED (`D-81`, 2026-11-02). AS RE-GRAINED under `E-5` this limb required
        // `rmSync(`/`unlinkSync(` — "the legacy file's removal is declared". **THE REMOVAL IS DELETED
        // WITH THE ARM**: the module registry's legacy file is DROPPED, not migrated (the user's
        // ruling, D-78's second clause), so the claim inverts and is not dropped — the boot declares
        // no removal and therefore cannot delete an operator's file.
        main.includes('rmSync(') || main.includes('unlinkSync(')
          ? BREAK('a removal verb stands in src/main/main.ts again — the boot must LEAVE an existing provident-modules.json on disk, UNREAD (D-81)')
          : HOLD('no removal is declared: an existing provident-modules.json is left on disk unread, which is D-75\'s disposition for the tabs rows applied to this registry (D-81)'),
        // AND THE HASH MOVED WITH THE RECORD, NOT WITH A FILE: `sha256` was `module-store.ts`'s and is
        // `main.ts`'s now (`:300`-class, `hash: sha256(record.source)` at the one `put`).
        readSrcSafe('main/main.ts')?.includes('createHash') === true && /hash:\s*sha256\(/.test(main)
          ? HOLD('the SHA-256 per-record verification is landed in the composition: the hash is derived from `source` at the one `put` and re-derived at boot (D-81)')
          : BREAK('the per-record SHA-256 verification is not observed in src/main/main.ts — the module half\'s posture went with the deleted store and did not land'),
      ), 'M-5 migration')
    })

    it('M-6: a corrupt file is DIAGNOSED, never thrown (§2.6 item 4 — the posture split)  [RE-GRAINED, E-5: the corrupt arm is the import\'s answer]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the settings half read the Y-1 body for a `catch`. The corrupt arm
      // is the IMPORT's now and it ANSWERS (`L1 §4`: rows [], bytes standing, `legacy:'corrupt'`), so
      // the row drives it instead of scanning for a keyword — and the module half is unmoved.
      const corrupt = stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_CORRUPT })
      const settingsHalf = ALL(
        corrupt.threw === null ? HOLD('a corrupt retired record is DIAGNOSED, never thrown') : BREAK(`a corrupt record THREW: ${String(corrupt.threw)}`),
        corrupt.legacy === 'corrupt' ? HOLD("the answer is legacy:'corrupt' — the diagnosis survives where the bytes are not repaired (L1 §4 ASM-4)") : BREAK(`the corrupt seed answered legacy='${corrupt.legacy}'`),
        corrupt.rows.length === 0 ? HOLD('and it loads no row — the retired boot read\'s own corrupt arm, which also loaded nothing (L1 §4)') : BREAK(`the corrupt arm answered ${corrupt.rows.length} rows`),
      )
      // MODULE HALF: the corrupt flag is the CROSSING's answer and no module file decides it (D-81).
      const moduleHalf = moduleCorruptIsTheCrossing()
      assertProbe(ALL(settingsHalf, moduleHalf), 'M-6 corrupt boot')
    })

    it('M-7: no third holder — main.ts holds NO copy of the rows, and after the hand-off the renderer answers the handed-off values (§2.10, R R1)  [RE-GRAINED, E-5: the holder is GONE, so its bound becomes an absence]', async () => {
      // ⟶ RE-GRAIN (`E-5`), AND IT IS THE SHARPEST ONE IN THIS FILE. AS FILED the row asserted the
      // holder EXISTED and was bounded: `bootRecord` populated at the boot read and refreshed by the
      // channel's own commits. THE HOLDER IS GONE (L1 §3: `bootRecord`/`settingsCorrupt`/
      // `settingsReadRecord()` removed, E-1), and L2 behaviour.md §1 states the replacement plainly:
      // "`main.ts` holds no copy of the rows... every reader asks the surface on the call it serves".
      // So the bound is now the ABSENCE of the holder — a claim that could not be made while the holder
      // stood, and one that reddens the moment a copy is reintroduced. What the row was really about
      // (the renderer answers the handed-off values, and the hand-off is the only flow) is kept whole.
      const main = readSrcSafe('main/main.ts') ?? ''
      assertProbe(ALL(
        main.includes('bootRecord') ? BREAK('`bootRecord` stands in src/main/main.ts again — the third holder was removed (L1 §3, E-1) and a reintroduced copy reddens here') : HOLD('`main.ts` holds NO `bootRecord`: the retired third holder is absent, so no reader can serve a stale copy (L2 behaviour.md §1)'),
        main.includes('settingsCorrupt') ? BREAK('`settingsCorrupt` stands in src/main/main.ts again — the holder\'s corrupt flag went with the holder (L1 §3)') : HOLD('and no `settingsCorrupt` flag stands — the diagnosis is the import answer, not a held boolean (L1 §4)'),
        y1Probe('holder-boot', (y1) => (/settingsSurface\.state\s*\(/.test(y1) ? HOLD('the Y-1 body asks the SURFACE on the call it serves (settingsSurface.state()) — the replacement for the holder') : BREAK('the Y-1 body does not ask the surface — with no holder, that body has no source of rows at all'))),
        rendererHandoffCount() === 1 && rendererHandoffControl() ? HOLD('the renderer reads the handed-off record once — the REAL bracket-form bridge.store[\'get\']() (renderer.ts:570), comment-elided control held (G4-P2)') : BREAK('the renderer has no Y-1 hand-off (bridge.store[\'get\'](), renderer.ts:570)'),
        // THE G4-P1 CLOSURE (the hydrated-store reading — this row no longer accepts the
        // wiring-held-only reading): bootHandoff is CONSUMED by the store's `hydrate(rows)`
        // seam (wired.hydrate(bootHandoff), renderer.ts:605) and tier-1 `resolve` answers the
        // handed-off value AFTER boot — M-7 is satisfiable, per the HYDRATE-1 re-ruling.
        rendererHydrateSeam(),
        hydratedStoreDrive(),
        crossingSeamProbe(),
      ), 'M-7 holder bound')
    })

    it('M-8: the channel is constants-only and single-sourced (§2.1/§2.2, R C-4; the census `2 → 3` is `U-SECURE-EXCLUSION`\'s — the amendment block beside `DECLARED_EXPORT_NAMES`)', async () => {
      assertProbe(ALL(
        (await channelModule()) === null
          ? BREAK('src/main/store-channels.ts does not exist — the constants are absent')
          : HOLD('the channel module exists'),
        channelExportsProbe(),
        f8ImportProbe(),
      ), 'M-8 channel census')
      // THE TWO POSITIVE CONTROLS, DRIVEN INLINE (`§5.5.2` item 3(a) shape; the sibling-registry rule
      // "every instrument change ships a control that can FAIL"). Each drives the AMENDED instrument over
      // SYNTHETIC module text, so neither direction of the census can become vacuous:
      //  (a) a FOURTH constant FAILS the declared name-set equality (the census is not a rubber stamp);
      //  (b) ANY non-constant export FAILS the constants-only class, whatever its kind — the claim the
      //      raw `export`-token count was only ever a proxy for.
      const controlFourthText = "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport const IPC_SECURITY_FOURTH_CONTROL = 'd'\n"
      // (a-0) THE PARSER ITSELF IS DRIVEN: the SAME `exportNamesOf` the real census reads must SEE all four
      // names in the control's text — a parser that quietly finds nothing would make every direction vacuous.
      expect([...exportNamesOf(controlFourthText)].sort(),
        `M-8 CONTROL (a-0) — the export-name parser MUST read the control's own four names (measured ${JSON.stringify(exportNamesOf(controlFourthText))}); a parser that reads nothing makes the census vacuous.`).toEqual(['IPC_SECURITY_EXCLUSION', 'IPC_SECURITY_FOURTH_CONTROL', 'STORE_FILE_GET', 'STORE_FILE_PUT'])
      const controlFourth = constantsOnlyProbe(controlFourthText, DECLARED_EXPORT_NAMES)
      expect(controlFourth.held,
        `M-8 CONTROL (a) — a FOURTH constant MUST FAIL the declared census (${DECLARED_EXPORT_NAMES.join(' · ')}). Measured: ${controlFourth.why}`).toBe(false)
      for (const [kind, body] of [
        ['a FUNCTION export', "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport function readChannel() { return 1 }\n"],
        ['a TYPE export', "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport type ChannelName = string\n"],
        ['an INTERFACE export', "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport interface Channel { readonly get: string }\n"],
        ['a STATE export (uninitialised let)', "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport let lastChannel: string\n"],
        ['a re-export', "export const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\nexport { readFileSync } from 'node:fs'\n"],
        ['a runtime IMPORT', "import { readFileSync } from 'node:fs'\nexport const STORE_FILE_GET = 'a'\nexport const STORE_FILE_PUT = 'b'\nexport const IPC_SECURITY_EXCLUSION = 'c'\n"],
      ] as const) {
        const controlKind = constantsOnlyProbe(body, DECLARED_EXPORT_NAMES)
        expect(controlKind.held, `M-8 CONTROL (b) — ${kind} MUST FAIL the constants-only class (${kind} is not a channel-name constant). Measured: ${controlKind.why}`).toBe(false)
      }
    })
  })

  /* ── §4.2 (2) THE BEHAVIOURAL F-* ROWS — §3.2 ── */

  describe('F-rows — documented fail-states (§3.2)', () => {
    /* ── `F-1` RETIRED WITH ITS REFERENT (`E-5`) ──
     *
     * `F-1: a torn file is impossible (§2.6 items 3/6) — the atomic shape at the landing site, every
     * injection arm, the tmp never parsed` stood HERE and is RETIRED, not re-pointed.
     *
     * ITS SUBJECT WAS THE STAGING SEQUENCE: four limbs — `atomicSequenceProbe()` (the
     * mkdirSync → .tmp → fsync → renameSync → fsync order), a `'write-failed'` arm, `tmpTargetOnly()`
     * (every write landing on `{path}.tmp`) and `tmpNeverParsed()`. This unit DELETED that sequence
     * from `src/main/main.ts` (L1 §3's closed removal list, E-1; D-22), so there is no staging path to
     * target, no tmp file to avoid parsing and no five-call order to measure. A row about the shape of
     * a write that no longer exists cannot be re-pointed at a different write without becoming a
     * different row wearing F-1's name — the rule `tests/store-security.test.ts`'s header states.
     *
     * THE CLAIM THAT SURVIVES, AND WHERE IT LIVES: "a torn record is impossible" is now the PACKAGE's
     * durability promise, measured by `provident-storeroom` and by L1's e2e `S-8`/`S-9` on a booted app
     * (a commit is ONE store write: no `.tmp`, no lock, no second name). Both are cited, never
     * re-pointed (L1 §10, D-5). Locally, the strongest adjacent claim is pinned twice: no file write
     * verb stands at the landing site at all (`y2CommitSiteProbe`, `IM-2 A3`) and the retired refusal
     * vocabulary stands nowhere (`retiredWriteFailedAbsent`).
     */
    it('F-2: a refused crossing clears nothing (§2.4 items 3/4, S §2.8 items 2/6, C-3)  [RE-GRAINED, E-5: the refusal is a RECEIPT the surface answers, and its spelling is the store\'s own]', async () => {
      // THE STORE'S refused-receipt posture (landed, driven — §2.4 item 3: the store's three-arm
      // refusal discipline applies to the STORE's serialization/validation gates): a file-tier
      // commit whose value is not JSON-representable (BigInt) is refused BEFORE the crossing,
      // and the refused receipt carries cleared: [], repaired: [], rows: [], crossings: 0, events: 0.
      const store = createGraphStore({ declarations: storeGraphReferences([{ name: 'settings' }]) })
      const refused = store.commit('file.settings', { n: 1n })
      const storePosture = refused.status === 'refused' && refused.cleared.length === 0 && refused.crossings === 0 && refused.events === 0
      expect(storePosture,
        `F-2 store-receipt drive — the store's refused receipt posture (cleared: [], crossings: 0, events: 0): observed status='${refused.status}' cleared=[${refused.cleared.join(',')}] crossings=${refused.crossings} events=${refused.events} reason='${refused.reason ?? 'undefined'}'`).toBe(true)
      // ⟶ RE-GRAIN (`E-5`). AS FILED the channel arms were `writeFailedArm` + `refusalBeforeRename`,
      // both read against the tmp writer: the refusal had to PRECEDE `renameSync`, and it answered
      // the retired `'write-failed'` word. The writer is deleted, so "clears nothing" is now a fact
      // about the RECORD, not about a file that was never touched — and it is DRIVEN, twice: the
      // channel's own pre-write refusal (malformed-payload) and the store's refusal both leave the
      // rows standing. The retired word is asserted ABSENT, which is the stronger polarity.
      const preWrite = commitDrive([{ name: 'file.tabs.order', value: null }])
      assertProbe(ALL(
        y2Probe('refused crossing', (y2) => ALL(
          y2.includes("'malformed-payload'") ? HOLD("the channel's 'malformed-payload' arm (ITS validation of the incoming translation)") : BREAK("the channel's 'malformed-payload' arm is absent"),
          retiredWriteFailedAbsent(),
          y2CommitSiteProbe(),
        )),
        preWrite.threw === null ? HOLD('a refused commit still ANSWERS — never a swallow') : BREAK(`a refused commit THREW: ${String(preWrite.threw)}`),
        preWrite.status === 'refused' ? HOLD("the refusal is a RECEIPT ({status:'refused', reason}), not a throw and not a silent success") : BREAK(`the refusal answered '${preWrite.status}'`),
        preWrite.after.length === 0 ? HOLD('a refusal CLEARS NOTHING and commits nothing: no row from the refused map stands') : BREAK(`after a refusal the record holds ${JSON.stringify(preWrite.after.map((r) => r.name))} — a refusal must leave the previous rows standing`),
      ), 'F-2 channel refusal arms')
    })

    it('F-3: a graph load before the hand-off FAILS the boot (§2.9 consequence (1)) — the starting-order gate observes the CURRENT inversion', async () => {
      const p = bootOrderProbe()
      expect(p.held, `F-3 — ${p.why}`).toBe(true)
    })

    it('F-4: no resurrected in-realm value (§2.7 item 3, §0A item 6) — the file-tier projection, mem/temp never land  [RE-GRAINED, E-5: the schemaVersion stamp limb retired with the stamp]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the projection limb also required `schemaVersion` to be STAMPED on
      // the write. That stamp retired with the writer (the instance has its own record shape — D-13,
      // D-22) and is retired WITH its referent, so the limb is gone; the projection claim is kept whole.
      //
      // WHERE THE FILTER LIVES, STATED SO NO READER OVER-READS THIS ROW: the `file.*`-only projection is
      // `src/main/main.ts`'s Y-2 BODY (`:309-312`, `key.startsWith('file.')`) — that body is unimportable
      // in a node test, and the SURFACE it delegates to is a general verb that commits whatever rows it
      // is handed. So this row pins the filter at the two places it can be honestly observed: READ off
      // the region (the filter stands, keyed on the `file.` prefix), and DRIVEN at the surface for the
      // arm the channel actually sends — the projected `file.*` rows — which must land verbatim. A drive
      // that handed the surface a `mem.`/`secure.` row would be measuring the CHANNEL against a verb
      // that never saw the channel, which is not a claim about anything (examiner.md §2).
      const y2 = y2Region() ?? ''
      const filterPresent = /startsWith\s*\(\s*['"]file\.['"]\s*\)/.test(y2) || y2.includes("'file.'")
      const landed = commitDrive([{ name: 'file.tabs.order', value: ['a'] }])
      assertProbe(ALL(
        filterPresent
          ? HOLD('the Y-2 body projects the crossing\'s translation through a `file.`-prefixed filter — the mem./temp./secure. spellings have no arm that lands them (§0A item 6)')
          : BREAK('the file.*-keyed projection filter is absent from the write path — nothing stops a mem./temp./secure. spelling from landing'),
        landed.threw === null ? HOLD('the commit answers — never a throw') : BREAK(`the commit THREW: ${String(landed.threw)}`),
        landed.status === 'committed' ? HOLD("the projected file.* row commits ({status:'committed'})") : BREAK(`the projected commit answered '${landed.status}'`),
        JSON.stringify(landed.after.map((r) => r.name)) === JSON.stringify(['file.tabs.order'])
          ? HOLD('and it stands under its own name in the app-state record — the projection the channel sends IS the record (A-6)')
          : BREAK(`the record holds ${JSON.stringify(landed.after.map((r) => r.name))} — expected exactly ['file.tabs.order']`),
        rendererHandoffCount() === 1 && rendererHandoffControl() ? HOLD('a restart re-hydrates from the hand-off — the REAL bracket-form bridge.store[\'get\']() (renderer.ts:570), comment-elided control held (G4-P2)') : BREAK('the renderer has no Y-1 hand-off (bridge.store[\'get\'](), renderer.ts:570) — a restart cannot reconstruct its tiers from the record'),
        rendererHydrateSeam(),
      ), 'F-4 projection')
    })

    it('F-5: a reserved-name collision is refused, never overwritten (§2.8 item 4, NW-10)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      expect(main.includes("'reserved-namespace'") || mcp.includes("'reserved-namespace'"),
        "F-5 — a module id colliding with a reserved top-level settings key must be REFUSED reason:'reserved-namespace', never silently overwritten — the token is absent from the wiring today").toBe(true)
    })

    // ⟶ **RETITLED AND RE-DERIVED 2026-11-02 (`D-81`; D-78's second clause, the user's ruling): THERE IS
    // NO ONE-BOOT WINDOW ANY MORE.** This row's subject was §2.8 item 1 step (4) — the legacy registry
    // "retained READ-ONLY for this boot (never written) and REMOVED after it". The user gave the module
    // registry the disposition `D-75` gave the tabs rows (*"There is no migration … Do not build a boot
    // migration"*), so the window, the read that opened it and the removal that closed it are DELETED
    // with `src/main/module-store.ts`, and **an existing `provident-modules.json` is left on disk,
    // UNREAD**. The row keeps its subject — what this boot does about that legacy file — and states the
    // new answer, which is nothing at all: no writer, no reader, no remover, no spelling of the name.
    it('F-6: there is NO one-boot window — the legacy registry file is left on disk UNREAD (was §2.8 item 1 (4); re-derived under D-81)', async () => {
      const main = mainCommentElided() ?? ''
      assertProbe(ALL(
        main.includes('moduleStore.setDisabled') || main.includes('moduleStore.put') || main.includes('moduleStore.remove')
          ? BREAK('a legacy-store mutator is still invoked — the legacy file would still be WRITTEN')
          : HOLD('no legacy-store mutator stands: the registry is written only through the crossing\'s one commit'),
        main.includes('rmSync(') || main.includes('unlinkSync(')
          ? BREAK('a removal verb stands in src/main/main.ts — the boot must LEAVE an existing provident-modules.json on disk, UNREAD (D-81); the removal went with the arm')
          : HOLD('and NO removal: an existing provident-modules.json is left on disk, unread and un-tidied — the profile is the operator\'s (D-75\'s disposition, applied by D-81)'),
        main.includes(DECLARED_LEGACY_FILE)
          ? BREAK(`\`${DECLARED_LEGACY_FILE}\` is spelled in src/main/main.ts — the name is read, written and removed nowhere, so this file names it nowhere (D-81)`)
          : HOLD('and no reader either: the name is not spelled in src/main/main.ts at all, so nothing can open it'),
        // ⟶ RE-GRAIN (`E-5`): AS FILED this limb asserted the CARRIER (`provident-settings.json`)
        // wins from then on. The carrier retired; what wins is the app-state record, written by the
        // one commit every writer class issues (L1 §6; behaviour.md §5).
        /settingsSurface\.commit\s*\(/.test(main) ? HOLD("the app-state record wins from then on — every writer class issues the one settingsSurface.commit(...) (L1 §6)") : BREAK('the app-state record has no write site — the migration lands nowhere'),
      ), 'F-6 no one-boot window — the file is left on disk unread')
    })

    // **⟶ AND THE OVER-CONSTRAINT THE BLOCK BELOW RECORDS IS NOW GONE, SO THE PROBE IT WITHDREW IS BACK
    // (2026-11-02, `D-81`).** The bare-name-absence probe was withdrawn because the migration's boot
    // sequence was REQUIRED to name `provident-modules.json` at its removal declaration, so
    // `main.includes(DECLARED_LEGACY_FILE)` could not be false. **The arm is deleted, the removal with it,
    // and the name is now a name `main.ts` must not carry at all** — which is what `P-PS-IM-2` A1's third
    // arm and this row's third limb assert. The 2026-10-03 ruling was right about the SPEC and right to
    // replace the probe; it was measuring an arm the user has since ruled away, and the absence is now
    // the claim rather than the contradiction.
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
        // ⟶ RE-GRAIN (`E-5`): AS FILED this limb demanded the CARRIER's literal in `main.ts`. The
        // carrier retired, so the write site is the app-state commit and the row pins THAT — one
        // write site, no file verb, which is the two-writer falsifier's live form (L1 §3/§6).
        y2CommitSiteProbe(),
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

    it('F-9: a validation failure is NEVER a throw (§2.3 item 1, §2.6 item 4, §2.7 item 5)  [RE-GRAINED, E-5: the recovery is the import arm\'s ANSWER, driven]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED this read the Y-1 body for `catch` and `existsSync`. Neither is
      // there any more: the body is three lines over the surface (`src/main/main.ts:277-281`). The
      // claim — "every validation failure answers the declared recovery and NOTHING throws" — is a
      // CHANNEL ANSWER, so it is driven across every arm the import can answer, including the one the
      // Y-1 body itself cannot produce: a profile whose store construction was refused.
      const arms = [
        { label: 'cold (no retired record)', drive: stateDrive() },
        { label: 'corrupt (unparsable bytes)', drive: stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_CORRUPT }) },
        { label: 'valid (the declared stamp)', drive: stateDrive({ name: DECLARED_SETTINGS_FILE, text: CARRIER_SEED_VALID }) },
      ]
      const thrown = arms.filter((a) => a.drive.threw !== null)
      assertProbe(ALL(
        y1Probe('never-throw', (y1) => (!y1.includes('throw') ? HOLD('the Y-1 body never throws') : BREAK('the Y-1 body throws — a validation failure must answer, never throw'))),
        thrown.length === 0
          ? HOLD(`every import arm ANSWERS: ${arms.map((a) => `${a.label}→${a.drive.legacy}`).join(', ')} — no arm throws, and each names a declared outcome (absent/imported/corrupt)`)
          : BREAK(`an import arm THREW where it must answer: ${thrown.map((a) => `${a.label} (${String(a.drive.threw)})`).join(', ')}`),
        arms.every((a) => a.drive.rows.length === 0 || a.drive.legacy !== 'corrupt')
          ? HOLD('and a corrupt arm never smuggles rows: the recovery is the DECLARED one, never a partial load behind a diagnosis')
          : BREAK('a corrupt arm answered rows — a diagnosis and a load cannot both stand'),
      ), 'F-9 never-throw')
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

    it('S-3: the write-site census — the persisted set is EXACTLY the declared two WRITTEN names (I-2 / the witness-gap pin)  [RE-GRAINED, E-5: the written names moved]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED limb 1 demanded the CARRIER's literal in `main.ts`. The carrier
      // retired (L1 §3), so the census is now over the TWO WRITTEN NAMES — `provident-operator-settings.json`
      // and `provident-profile.json` (L1 §6) — with the two RETIRED names cited BESIDE them as seeds:
      // read at most once, written never (D-13). THE CLAIM IS UNMOVED: the persisted set is EXACTLY
      // the declared names, each with ONE writer, and no third file exists.
      assertProbe(ALL(
        (readSrcSafe('main/main.ts') ?? '').includes(DECLARED_SETTINGS_FILE)
          ? BREAK(`'${DECLARED_SETTINGS_FILE}' still stands in main.ts — the carrier's literal retired with its writer (L1 §3), so the persisted set cannot still be counted through it`)
          : HOLD(`'${DECLARED_SETTINGS_FILE}' is ABSENT from main.ts — the carrier left the file census with its writer (L1 §3). The pre-landing census was {${DECLARED_SECURITY_FILE}, ${DECLARED_LEGACY_FILE}}; the retired security name is cited here AS RETIRED and never re-pointed`),
        // THE TWO WRITTEN NAMES, each declared ONCE where it is written (L1 §6).
        instanceFileNameProbe(),
        (() => {
          const profileModule = readSrcSafe(PROFILE_FILE_MODULE) ?? ''
          return nameBinding(profileModule, 'PROFILE_FILE_NAME', DECLARED_PROFILE_FILE)
            ? HOLD(`the second written name '${DECLARED_PROFILE_FILE}' is declared ONCE, in ${PROFILE_FILE_MODULE}, and joined onto the profile dir there`)
            : BREAK(`'${DECLARED_PROFILE_FILE}' is not bound to PROFILE_FILE_NAME in ${PROFILE_FILE_MODULE} — the second written name is undeclared`)
        })(),
        // THE RETIRED NAMES, cited as seeds: one home, one reader, no writer each.
        retiredStoreModelProbe(),
        (() => {
          const operatorModule = readSrcSafe(OPERATOR_SETTINGS_MODULE) ?? ''
          const homes = scanSrcFor(DECLARED_SETTINGS_FILE)
          const boundOnce = (operatorModule.match(/const RETIRED_SETTINGS_NAME = 'provident-settings\.json'/g) ?? []).length === 1
          return homes.length === 1 && homes[0] === OPERATOR_SETTINGS_MODULE && boundOnce
            ? HOLD(`the second RETIRED name '${DECLARED_SETTINGS_FILE}' lives in ONE module (${OPERATOR_SETTINGS_MODULE}), declared exactly ONCE as RETIRED_SETTINGS_NAME — a seed, never a written name (L1 §6)`)
            : BREAK(`the second RETIRED name '${DECLARED_SETTINGS_FILE}' must live in ONE module, declared exactly once — measured homes ${JSON.stringify(homes)}, single declaration ${boundOnce}`)
        })(),
        thirdLiteralWrites().length === 0
          ? HOLD('no write/rename construct carries a third provident-*.json literal')
          : BREAK(`a third persisted filename is written: ${thirdLiteralWrites().join(', ')}`),
      ), 'S-3 exactly-two census')
    })

    it('S-4: the schemaVersion census after the stamp retired — the token is the IMPORT arm\'s validation and NO write stamps it (§2.7 item 6)  [RE-GRAINED, E-5: the stamp\'s home moved to the import]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the token was allowed ONLY in `main.ts`'s landing site, because
      // that is where the writer stamped it. The stamp retired with the writer (L1 §3 `:366`), so the
      // token's ONE surviving home is the IMPORT arm, which validates the retired record's reserved
      // member before carrying any row (L1 §4 `ASM-3`). THE CLAIM IS UNMOVED — the token is not
      // loose in the tree, and it is not re-introduced as a write-time stamp — with the home re-grained.
      const hits = schemaVersionHomes()
      const unique = hits.length === 1 && hits[0] === OPERATOR_SETTINGS_MODULE
      const y2 = y2Region() ?? ''
      const y1 = y1Region() ?? ''
      assertProbe(ALL(
        unique
          ? HOLD(`'schemaVersion' has exactly ONE home in src/** — the import arm (${OPERATOR_SETTINGS_MODULE}) — and none elsewhere: ${JSON.stringify(hits)}`)
          : BREAK(`'schemaVersion' must live in exactly one module (${OPERATOR_SETTINGS_MODULE}); measured ${JSON.stringify(hits)} — a second home is a re-pointer or a re-introduced stamp`),
        y2.includes('schemaVersion') ? BREAK('the Y-2 body stamps `schemaVersion` again — the stamp retired with the carrier writer (L1 §3) and the instance has its own record shape (D-13)') : HOLD('the Y-2 body stamps no `schemaVersion`: the write is one store commit and stamps nothing (L1 §3; D-13)'),
        y1.includes('schemaVersion') ? BREAK('the Y-1 body re-introduces a `schemaVersion` validation — that validation is the import\'s now (L1 §4)') : HOLD('the Y-1 body carries no `schemaVersion` validation: it asks the surface, and the import validated at construction (L1 §4)'),
        importSchemaValidationProbe(),
      ), 'S-4 schemaVersion census')
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
    it('MIG-1: the two-writer falsifier — after module.update + IPC_MODULE_SET_DISABLED on the same module, the two writer classes issue the SAME ONE commit (§2.8 item 2)  [RE-GRAINED, E-5: "the file" is the app-state record]', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      // ⟶ RE-GRAIN (`E-5`). AS FILED the row said the store's record and "the file" must AGREE, where
      // "the file" was the carrier both writers wrote. There is no carrier: every writer class composes
      // its rows and issues the SAME `settingsSurface.commit(...)`, so agreement is structural rather
      // than a coincidence of two writers spelling the same path (L2 behaviour.md §4: "any member's
      // write → ONE commit of the whole composed map; no member writes a second time").
      const commitSites = (main.match(/settingsSurface\.commit\s*\(/g) ?? []).length
      assertProbe(ALL(
        main.includes('file.modules') || mcp.includes('file.modules')
          ? HOLD('both writer classes land under the declared namespace file.modules.<id> — a single authority')
          : BREAK('the file.modules.<id> namespace is not wired — the two-writer disagreement the correction names is still the tree\'s state'),
        main.includes('moduleStore.setDisabled')
          ? BREAK('writer class 1 is NOT re-pointed (the direct legacy-store write remains)')
          : HOLD('writer class 1 is re-pointed: IPC_MODULE_SET_DISABLED composes rows, it does not write the legacy store'),
        commitSites > 0
          ? HOLD(`every writer class reaches the record through the SAME verb — ${commitSites} settingsSurface.commit(...) sites and no second write path (one authority, so the two classes cannot disagree)`)
          : BREAK('no settingsSurface.commit(...) site stands in main.ts — the two writer classes have no shared write path'),
        main.includes('writeFileSync') || main.includes('renameSync')
          ? BREAK('a file write verb stands in main.ts — the two-writer falsifier is about ONE writer class, and a file writer would be a second')
          : HOLD('and no file write verb stands in main.ts: the record has exactly one writer, the store'),
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

    it('BO-3: consequence (3) — the retired record may not exist: the hand-off answers [] and the renderer boots on it (§2.9 item 2(3))  [RE-GRAINED, E-5: the cold answer is driven]', async () => {
      // ⟶ RE-GRAIN (`E-5`). AS FILED the cold half read the Y-1 body for `existsSync`. With no file
      // for the channel to probe, the answer IS the observable, so the row drives it (`behaviour.md`
      // §2: "Y-1 over a cold profile → `[]` — never a throw, never an invented row").
      const cold = stateDrive()
      assertProbe(ALL(
        bootOrderProbe(),
        cold.threw === null ? HOLD('a cold profile is NOT an error: the hand-off answers, nothing throws') : BREAK(`the cold boot THREW: ${String(cold.threw)}`),
        cold.rows.length === 0 ? HOLD('the hand-off answers [] — a MISS, never an invented row, and the renderer boots on it') : BREAK(`the cold answer carries ${cold.rows.length} rows — declared []`),
        cold.legacy === 'absent' ? HOLD("the diagnosis is 'absent', which is a declared answer") : BREAK(`the cold arm answered legacy='${cold.legacy}'`),
      ), 'BO-3 cold hand-off []')
    })

    it('BO-4: consequence (4) — a late push never tells the renderer what to believe; the table updates from the RECEIPT (§2.9 item 2(4), §2.5 item 2)', async () => {
      assertProbe(ALL(
        rendererHandoffCount() === 1 && rendererHandoffControl() ? HOLD('the hand-off is the only main→renderer tier-1 value flow the boot uses — the REAL bracket-form bridge.store[\'get\']() (renderer.ts:570), comment-elided control held (G4-P2)') : BREAK('no Y-1 hand-off exists (bridge.store[\'get\'](), renderer.ts:570)'),
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
    it('SC-1: the persisted names and the consolidated-location rule — the two WRITTEN names under <userData>, the retired names joined there for their one read (§2.7 items 1/2)  [RE-GRAINED, E-5: the carrier retired; what a commit moves is the app-state record]', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const operatorModule = readSrcSafe(OPERATOR_SETTINGS_MODULE) ?? ''
      const profileModule = readSrcSafe(PROFILE_FILE_MODULE) ?? ''
      // ⟶ RE-GRAIN (`E-5`). AS FILED limb 1 demanded that `main.ts` declare
      // `<userData>/provident-settings.json` and limb 2 that every operator name be joined onto
      // `<userData>`. THE CARRIER'S PATH IS DELETED (L1 §3: `const settingsPath` and the whole
      // writer), so limb 1 is now the ABSENCE that retirement makes true, and the consolidated
      // location is asserted over the TWO WRITTEN NAMES (`L1 §6`: "written at steady state:
      // `provident-settings.json`, `provident-operator-settings.json`, `provident-profile.json` → the
      // last two") plus the retired names' one-read joins. THE CLAIM IS UNMOVED — every persisted
      // file lives under one <userData> — and the census it is claimed over moved, which is D-13's
      // re-grain rather than a weakening.
      const retiredUnderUserData = nameBinding(operatorModule, 'RETIRED_NAME', DECLARED_SECURITY_FILE) && joinedUnderUserData(operatorModule, 'RETIRED_NAME')
      const instanceUnderUserData = nameBinding(operatorModule, 'FILE_NAME', DECLARED_OPERATOR_SETTINGS_FILE) && joinedUnderUserData(operatorModule, 'FILE_NAME')
      const carrierUnderUserData = nameBinding(operatorModule, 'RETIRED_SETTINGS_NAME', DECLARED_SETTINGS_FILE) && joinedUnderUserData(operatorModule, 'RETIRED_SETTINGS_NAME')
      const profileBound = nameBinding(profileModule, 'PROFILE_FILE_NAME', DECLARED_PROFILE_FILE)
      assertProbe(ALL(
        main.includes(DECLARED_SETTINGS_FILE)
          ? BREAK(`'${DECLARED_SETTINGS_FILE}' still stands in src/main/main.ts — the carrier's literal retired with its writer (L1 §3)`)
          : HOLD(`'${DECLARED_SETTINGS_FILE}' stands NOWHERE in src/main/main.ts: the carrier's path retired with its writer, so the file does not move because it does not exist (L1 §3/§6)`),
        profileBound
          ? HOLD(`the profile store's written name '${DECLARED_PROFILE_FILE}' is declared where it is written (${PROFILE_FILE_MODULE}: PROFILE_FILE_NAME) — the FIRST of the two written names`)
          : BREAK(`'${DECLARED_PROFILE_FILE}' is not bound to PROFILE_FILE_NAME in ${PROFILE_FILE_MODULE} — the profile store's written name is undeclared`),
        instanceUnderUserData
          ? HOLD(`and the instance's own '${DECLARED_OPERATOR_SETTINGS_FILE}' is joined onto <userData> at construction (FILE_NAME) — the SECOND of the two written names`)
          : BREAK(`the instance's own '${DECLARED_OPERATOR_SETTINGS_FILE}' is not bound-and-joined in ${OPERATOR_SETTINGS_MODULE}`),
        retiredUnderUserData && carrierUnderUserData
          ? HOLD(`both RETIRED names are joined onto <userData> for their one seed read — '${DECLARED_SECURITY_FILE}' (RETIRED_NAME) and '${DECLARED_SETTINGS_FILE}' (RETIRED_SETTINGS_NAME) — so a seed can only ever come from the consolidated location (L1 §6)`)
          : BREAK(`a retired name is not bound-and-joined in ${OPERATOR_SETTINGS_MODULE}: security ${retiredUnderUserData}, carrier ${carrierUnderUserData} (a seeded read from anywhere but <userData> would put a persisted file outside the consolidated location)`),
        // WHAT A TIER-1 COMMIT MOVES NOW (L1 §6: "a tier-1 commit moves the app-state record at
        // `['operator-app-state']`") — DRIVEN, because this is the answer the census is about.
        (() => {
          const drive = commitDrive([{ name: 'file.tabs.order', value: ['a'] }])
          return drive.status === 'committed' && drive.after.length === 1
            ? HOLD(`a tier-1 commit moves the app-state record at ['${DECLARED_APP_STATE_ADDRESS}'] and nothing else — the row stands and no third file appears (L1 §6)`)
            : BREAK(`a tier-1 commit moved ${JSON.stringify(drive.after.map((r) => r.name))} (status '${drive.status}') — the commit must move the app-state record alone`)
        })(),
      ), 'SC-1 consolidated location + the two written names')
    })

    it('SC-2: the reserved top-level names — window · tabs · layout · settings · tracked · modules (NW-10), refused never overwritten (§2.7 item 4, §2.8 item 4)', async () => {
      const main = readSrcSafe('main/main.ts') ?? ''
      const mcp = readSrcSafe('main/mcp-server.ts') ?? ''
      expect(main.includes("'reserved-namespace'") || mcp.includes("'reserved-namespace'"),
        `SC-2 — the collision rule's refusal token is absent; a module id colliding with one of {${DECLARED_RESERVED_NAMESPACES.join(', ')}} must be REFUSED, never silently overwritten`).toBe(true)
    })

    it('SC-3: the file.settings.* names — the caller-side read is landed (theme.token); and the projection is DRIVEN to carry the namespace (§2.7 item 4)  [RE-GRAINED, E-5: the projection is driven, not read off a comment]', async () => {
      const themeCaller = readSrcSafe('renderer/theme-store.ts') ?? ''
      expect(themeCaller.includes('file.settings.theme.token'),
        'SC-3 — the LANDED caller-side read (theme-store.ts:17, H2b) consumes file.settings.theme.token (held today)').toBe(true)
      // ⟶ RE-GRAIN (`E-5`). AS FILED the second limb read `y2.includes('file.settings')` — and at this
      // head that substring survives ONLY inside a comment line of the Y-2 body, so the row would have
      // been satisfied by prose. The projection claim is a CHANNEL ANSWER and is now DRIVEN: a
      // `file.settings.*` row put through the commit lands, and it lands under its own NAME.
      const drive = commitDrive([{ name: 'file.settings.theme.token', value: 'themed' }])
      assertProbe(ALL(
        drive.threw === null ? HOLD('the commit answers — never a throw') : BREAK(`the commit THREW: ${String(drive.threw)}`),
        drive.status === 'committed' ? HOLD("the projection admits the file.settings.* namespace — the commit answers {status:'committed'}") : BREAK(`a file.settings.* row was not admitted: status '${drive.status}' — the settings namespace is not wired`),
        JSON.stringify(drive.after.map((r) => r.name)) === JSON.stringify(['file.settings.theme.token'])
          ? HOLD('and the row stands under its OWN name — the caller (theme-store.ts) can read it back verbatim (§2.7 item 4)')
          : BREAK(`the record holds ${JSON.stringify(drive.after.map((r) => r.name))} — expected exactly ['file.settings.theme.token']`),
      ), 'SC-3 settings namespace')
    })

    /* ── `SC-4` RETIRED WITH ITS REFERENT (`E-5`) ──
     *
     * `SC-4: VERSION-FROM-FIRST-WRITE — the payload carries schemaVersion (declared '1') from its FIRST
     * write; a missing/unknown version answers the declared recovery, never a throw` stood HERE and is
     * RETIRED, not re-pointed.
     *
     * ITS SUBJECT WAS THE STAMP: both limbs read the `schemaVersion` member out of the Y-2 body (the
     * stamp the writer composed onto every projection) and out of the Y-1 body (the validation of that
     * member). The writer and its stamp are DELETED (L1 §3 `:366`; the retired record's format marker
     * is not operator state — L1 §4, D-13), and the read-time validation left with the read, so neither
     * limb has a site to stand on.
     *
     * THE CLAIM THAT SURVIVES, AND WHERE IT LIVES: "a missing/unknown version answers the declared
     * recovery, never a throw" is the IMPORT arm's answer, and it is pinned three times over — `SM-2`'s
     * corrupt checkpoint-2 attempt and `M-6` above DRIVE it through a seeded profile, `S-4` pins the
     * token's single home and its absence from both channel bodies, and the L2 import battery
     * (`tests/integration/settings-carrier-retirement/import.test.ts`) owns the package-side arm.
     */
  })
})

/* ───────────────────────────── SHARED PROBE IMPLEMENTATIONS ───────────────────────────── */

function assertProbe(p: Probe, label: string): void {
  expect(p.held, `${label} — ${p.why}`).toBe(true)
}

/** THE AMENDED CENSUS INSTRUMENT — the export-NAME SET plus the constants-only CLASS, read per `export`
 *  declaration over a module's TEXT. Shared by the `S-1` probe, the `M-8` row's positive controls and the
 *  register row `P-PS-IM-1`'s A2 attempt, so the file carries ONE authority.
 *
 *  **WHY THE RE-GRAIN (`2026-10-05`, the `U-SECURE-EXCLUSION` `S1` sibling-registry amendment):** the
 *  as-filed `S-1`/`M-8` instrument counted raw `export` TOKENS and BREAK on `> 2*`. `S1`'s DECLARED third
 *  constant (`docs/specs/secure-exclusion.md` `§1.3` item 9 / `§2.6` item 3: the census `2 → 3`) made that
 *  count read `3` and BROKE the row against an addition the contract requires — i.e. the instrument, not the
 *  claim. The count was only ever a PROXY for "constants and nothing else", so the instrument reads the
 *  DECLARED NAME SET (set-equality against the declared constants, `DECLARED_EXPORT_NAMES`) and the CLASS OF
 *  EACH DECLARATION instead (through `exportNamesOf` / `constantsOnlyProbe`, the ONE authority this file's
 *  `S-1` probe, `M-8` controls and `P-PS-IM-1` A2 attempt all read).
 *  **THE CLAIM IS NOT WEAKENED:** a FOURTH constant fails the set-equality; ANY non-constant export fails the
 *  class check whatever its kind (function · class · interface · type · enum · re-export · an uninitialised
 *  `let`/`var` state binding · a non-literal initialiser · an `import` of any form); and the single-source
 *  half stays with `f8ImportProbe` and `P-PS-IM-1` A3, untouched. */
function exportDeclarations(text: string): Array<{ name: string | null; initialiser: string | null }> {
  const out: Array<{ name: string | null; initialiser: string | null }> = []
  const re = /^export\s+([^\n]*)$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const decl = m[1].trim()
    const named = decl.match(/^(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/)
    if (named) {
      const eq = decl.indexOf('=')
      out.push({ name: named[1], initialiser: eq < 0 ? null : decl.slice(eq + 1).trim() })
      continue
    }
    if (/^\{[\s\S]*\}\s*from\b/.test(decl)) {
      for (const part of (decl.match(/^\{([\s\S]*?)\}/)?.[1] ?? '').split(',')) {
        const nm = part.trim().split(/\s+as\s+/).pop()?.trim() ?? ''
        if (/^[A-Za-z_$][\w$]*$/.test(nm)) out.push({ name: nm, initialiser: null })
      }
      continue
    }
    out.push({ name: null, initialiser: null })
  }
  return out
}

/** The names an `export` declaration contributes, in source order (the re-export's LOCAL name is used). */
function exportNamesOf(text: string): string[] {
  const names: string[] = []
  for (const d of exportDeclarations(text)) if (d.name !== null) names.push(d.name)
  return names
}

function constantsOnlyProbe(text: string, declared: readonly string[] = DECLARED_EXPORT_NAMES): Probe {
  const decls = exportDeclarations(text)
  const named = decls.filter((d) => d.name !== null).map((d) => d.name as string)
  if (decls.length !== named.length) {
    return BREAK(`the module has ${decls.length - named.length} export declaration(s) that are NOT a named constant — §2.1 item 1 declares the channel-name constants and NOTHING else`)
  }
  const declaredSet = [...declared].sort()
  const actual = [...named].sort()
  if (JSON.stringify(actual) !== JSON.stringify(declaredSet)) {
    return BREAK(`the module's export-NAME set is ${JSON.stringify(actual)} — declared ${JSON.stringify(declaredSet)} (a FOURTH name, a MISSING name or a renamed name FAILS: the census is set-equality, the count alone was only ever a PROXY — the as-filed 'export'-token count is what this amendment replaces)`)
  }
  for (const d of decls) {
    if (d.initialiser === null) return BREAK(`the export '${String(d.name)}' carries NO initialiser — a channel-name constant is a string literal; a type/state/logic declaration is not one (§2.1 item 1: constants only)`)
    if (!/^'[^']*'$/.test(d.initialiser) && !/^"[^"]*"$/.test(d.initialiser)) {
      return BREAK(`the export '${String(d.name)}' initialises to \`${d.initialiser}\` — NOT a string literal: the module holds channel-name constants only (no callable, no state, no type, no computed value)`)
    }
  }
  if (/(^|[;\n])\s*import\b/.test(text)) {
    return BREAK('the module IMPORTs at runtime — §2.1 item 1 declares the constants only (no runtime dependency; the names are the SINGLE SOURCE, imported BY main.ts/preload.ts)')
  }
  return HOLD(`the export set is exactly the declared ${declared.length} constants and every declaration is a channel-name string literal`)
}

/** THE `S-1` / `M-8` PROBE, RE-GRAINED (`2026-10-05`). Its two real claims — (a) "constants and NOTHING
 *  else" and (b) "the channel names are single-sourced HERE" — are carried by `constantsOnlyProbe` and
 *  `f8ImportProbe` respectively; the raw `export`-token count it used to gate on was a proxy for (a) and
 *  fired on `U-SECURE-EXCLUSION` `S1`'s DECLARED third constant (`docs/specs/secure-exclusion.md` `§1.3`
 *  item 9 / `§2.4` item 4 / `§2.6` item 3: `2 → 3`). */
function channelExportsProbe(): Probe {
  const text = readSrcSafe('main/store-channels.ts')
  if (text === null) return BREAK('src/main/store-channels.ts does not exist — the channel constants are absent (§1.2 row 1)')
  return constantsOnlyProbe(text)
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

/**
 * **THE COLD MODULE REGISTRY IS THE CROSSING'S (2026-11-02, `D-81`).** AS FILED this drive was
 * `moduleMissingDrive`: it constructed `createModuleStore({ path })` over a profile with no
 * `provident-modules.json` and asserted `corrupt:false, loaded:[]` — "a cold tier is a MISS, never an
 * error". The store, and with it the file that could be absent, is DELETED, so that exact drive has
 * no subject: a MISSING module file is now indistinguishable from a corrupt one, a full one or none
 * at all, because nothing opens the name. **THE CLAIM SURVIVES AT THE PLACE THE PRODUCT KEEPS IT**:
 * the module registry's cold answer is the crossing's — no `file.modules.<id>` row stands on a cold
 * profile, `loaded` is `[]`, and the `corrupt` term is the crossing's own diagnosis, which a cold
 * profile answers `'absent'`/`'standing'` and never `'corrupt'`. Driven off a real surface answer.
 */
function moduleColdRegistryIsTheCrossing(): Probe {
  const cold = stateDrive()
  if (cold.threw !== null) return BREAK(`the cold crossing THREW: ${String(cold.threw)} — a cold registry must be a MISS, never an error`)
  const moduleRows = cold.rows.filter((r) => r.name.startsWith('file.modules.'))
  if (moduleRows.length !== 0) return BREAK(`the cold registry answered ${moduleRows.length} file.modules.* row(s) — a cold tier is a MISS`)
  const corrupt = cold.legacy === 'corrupt' || cold.storage === 'unreachable'
  return corrupt
    ? BREAK(`the cold registry's corrupt term evaluated TRUE (legacy='${cold.legacy}', storage='${cold.storage}') — a cold profile is a MISS, never an error`)
    : HOLD(`module half driven: a cold profile answers NO file.modules.* row and its corrupt term (the crossing's own) is false — a MISS, never an error (D-81)`)
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