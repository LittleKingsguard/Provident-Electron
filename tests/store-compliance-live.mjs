// tests/store-compliance-live.mjs — THE LIVE COMPLIANCE BATTERY over the RUNNING
// Electron app's FOUR-TIER DATA STORE, covering THREE compliance families:
//
//   FAMILY A — THE ARBITRARY-STORAGE REQUIREMENT (tier 4 / `secure` holds arbitrary
//              runtime data).
//   FAMILY B — THE CONSTRAINTS ON THE STORAGE METHOD (a separate persistent file from
//              the main file store; exactly two persisted files; the write's atomic
//              shape; no lower-tier alias).
//   FAMILY C — THE ACCESS CONTROLS (no MCP or nonsecure path mirrors tier-4 data).
//
// Run:  npm run build && node tests/store-compliance-live.mjs
//
// AUTHORITIES, CITED BY SECTION / ROW NAME (ledger line anchors drift; this driver
// cites names, and the run record `docs/specs/store-compliance-live-battery.md` `§1`
// carries the clause each citation resolves to):
//   A: docs/specs/secure-tier-generalization-review.md (§1 the capability answer; §2 the
//      dossier snapshot; §3 the provenance RCA; §5.4 the arbitrary-storage questions;
//      §6 the decomposition row) · docs/specs/secure-tier-generalization-adoption-dossier.md
//      (A-1, A-2, A-4, A-5, A-6, A-8 and the §5 rulings table) · the ACTIVE
//      docs/decisions.md rows `SECURE-TIER-IS-A-FILESTORE-PEER`,
//      `THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…`,
//      `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT` (cited BY ROW NAME) ·
//      docs/specs/data-ownership-model-plan.md §1.1 store 4 ·
//      docs/pending.md §R `P-R3` (the un-admitted S2 scope ruling).
//   B: docs/specs/store-security.md (CURRENT STATE item 3, §2.1 item 1, §2.2 items 2/5,
//      §2.3 item 1, §3.x fail rows, §2.6) · docs/specs/store-persist.md (the
//      EXACTLY-TWO persisted-files pin, the atomic write `${path}.tmp` + fsync +
//      renameSync + dir-fsync, the boot order, VERSION-FROM-FIRST-WRITE) ·
//      docs/specs/store-core-graph.md (§2.5 items 1/2) · the frozen artifact
//      docs/specs/store-core-module-store-core-graph-surface.md (operative digest
//      29772ac7…; the seam is hydrate(rows)) · docs/FORKER.md §4 (ii)/(iv) ·
//      the G2/G3 DONE rows in docs/next-steps.md.
//   C: docs/specs/secure-exclusion.md (the mutual-exclusion gate, the legal state pairs,
//      the invocation-turn enforcement across BOTH transports, the receipt vocabulary) ·
//      docs/decisions.md's exclusion decision row (`THE MCP SERVER AND THE SECURE TIER ARE
//      MUTUALLY EXCLUSIVE…`) · docs/specs/user-flow-audit.md §5.U/§6.1 ·
//      docs/specs/data-ownership-model-plan.md §3.8 (THE THREE FORBIDDEN READS) ·
//      docs/specs/mcp-endpoint.md §6.4 · docs/specs/store-security.md CURRENT STATE
//      item 6 + §2.6 (the four carriers census).
//
// WHICH S1 ROWS THIS BATTERY DOES NOT DUPLICATE, AND WHY (stated plainly, as the pass
// instructions require): `tests/secure-exclusion-live.mjs` + its record
// `docs/specs/secure-exclusion-live-battery.md` already hold `U-SECURE-EXCLUSION`'s own
// rows — the pane control's real CDP pointer gesture, the rendered-box oracle, the
// boot order, the HTTP/stdio straddle, the 401 oracle, the notification-count arms, the
// static boundary censuses and the diff-scope pins. **That set is `34` rows as of S1's own
// repair commit `6c602a5` (this driver's first draft said `32`, its reading at the S1 HEAD
// it ran against — the sibling's set GREW in its own pass, and the count is restated rather
// than left stale).** THIS battery re-runs no sibling row AS ITS OWN SUBJECT: it re-scores
// nothing S1 scored and it edits nothing S1 owns. **ONE PARTIAL OVERLAP IS DECLARED RATHER
// THAN HIDDEN (the `§6.2` audit's `A-F14`, disposed `FIXED` here): `SC-B-04`'s
// `forbiddenSecKeys` term is an `exclusion`-KEY ABSENCE check on the security file's own
// top-level key set, i.e. the same `exclusion`-key half S1's `U-6`/`D-19` restart arm
// drives on its own profile. The two are not the same row — S1 drives an
// `exclusion`-CARRYING store file through a restart; this battery reads the file's key set
// after a live write on the four-tier profile it seeded — and neither is weakened, but the
// overlap is real and is stated here so no reader infers total disjointness.**
// Its Family C rows measure what THAT battery does not: (i) tier-4 material leaking into
// the FOUR CARRIERS (graph node / tool result / resource / notification payload) —
// S1's §2.6 census is a static/invisibility reading of the unit's own diff scope, not a
// live scan of the running MCP surface's payload bodies; (ii) the RENDERER-side generic
// `secure.*` refusals read off the LIVE boot-constructed store instance (resolve/set/
// commit/clear/remove/subscribe) — S1 measures one construction-time LOAD refusal at the
// node layer, never the live store over the app's own renderer; (iii) the TIER-SHAPE half
// (the persisted-file census, the byte/sha independence of the two files, the tier's own
// top-level key set, the arbitrary-storage arms) — S1's `U-6`/`D-19` measures that a
// security write does not create a THIRD file or gate key on its OWN profile; this battery
// measures the tier's shape as such, with a seeded third file and a seeded `.tmp` as
// CONTROLS.
//
// INSTRUMENTS — **THIS DRIVER'S OWN TAXONOMY, NOT `§6.1` CLAUSE 3'S SET** (`A-F9`, disposed
// `FIXED`): the tags `[MCP]`/`[CDP]`/`[G]` below are this driver's shorthand for WHICH LIVE
// SURFACE a row read, and they are defined by this header and by nothing else. **`§6.1` clause
// 3's own closed set is a DIFFERENT set, and it is stated here correctly so the citation cannot
// be read as borrowing its authority: "a shipped tool, a literal command line, `MANUAL`, or the
// `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` label" — and clause 4 requires every `cmd` to be a
// literal command line or the literal token `MANUAL`, with its own exit code.** Every row of
// this battery runs under the ONE literal command line `node tests/store-compliance-live.mjs`,
// so the `cmd`+`exit` obligation is met by the run itself: **THE CLAUSE-3 MEMBER THIS BATTERY'S
// `instrument` FIELD RESOLVES TO IS THE LITERAL COMMAND LINE, and nothing else is borrowed from
// clause 3's set** (the `[MCP]`/`[CDP]`/`[G]` tags are this driver's own shorthand for WHICH LIVE
// SURFACE a row read — see the header's taxonomy note above — and `MANUAL` and the
// `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` label are NOT claimed by any row of this battery.
// The earlier draft's parenthetical — "the `§6.1` `instrument` field's own set is the surface" —
// named NO clause-3 member and was the `§6.2` audit's `B-F13`, disposed `FIXED` here: it is
// DELETED and the literal command line is named instead). **THE `[CDP]`-AS-INSTRUMENT LICENCE IS NOT SETTLED AND
// IS NOT CLAIMED HERE:** `docs/decisions.md`'s `REAL-DOM-UI-GATE-LEG` row admits a CDP leg as
// **LEG-ONLY** and never as an MCP tool, and the sibling unit `S1` carries the OPEN ruling
// `GAP-1` on whether `[CDP]` is admissible in place of the `MANUAL` its contract predicts. This
// battery therefore uses `[CDP]` as a MEASUREMENT SURFACE while the ruling is open, records
// that plainly, and does NOT claim a settled licence — see the record's `§5`.
//   [MCP]  a literal MCP client over the app's OWN stdio transport, built with the repo's
//          shipped helper (`scripts/electron-spawn.mjs`'s `ChildProcessTransport`) — one
//          process per boot, no second spawn. `tools/list`, `resources/list`,
//          `resources/read`, `tools/call`, and the notification stream.
//   [CDP]  Chrome DevTools Protocol over the app's OWN renderer: `Runtime.evaluate`
//          against the LIVE page realm. The port is read from the child's OWN stderr
//          (`DevTools listening on ws://127.0.0.1:<port>/…`) — this host cannot write
//          `<default userData>/DevToolsActivePort` (the S1 driver's measured note). THREE
//          live renderer channels are read this way — the THIRD added by the `§6.2` audit's
//          `A-F1` (`FIXED`), because the tier-1 file store is page-reachable and a census
//          that stopped at channel (1) could not support SC-A-01's "NO live channel" clause:
//            (1) `window.provident.security.*` — the main-side renderer bridge (preload's
//                `contextBridge` surface): the tier-4 GET/SET/exclusion channel;
//            (2) `window.provident.store.*` — the TIER-1 file-store bridge (`get()` /
//                `put(row)` / `onFileChanged`), wired through `STORE_FILE_PUT` into main's
//                own handler, which projects the crossing's translation by the VALUE's own
//                keys and drops every `mem.`/`temp.`/`secure.`-keyed spelling. Probed with a
//                `secure.`-keyed payload AND a `secure.`-looking `name` (SC-A-06);
//            (3) the APP'S OWN RENDERER MODULE, re-imported at its own page URL
//                (`new URL('./renderer.js', document.baseURI).href`) — the ESM module map
//                returns the SAME, already-evaluated instance, so `getWiredGraphStore()`
//                answers THE ONE BOOT-CONSTRUCTED STORE of this live realm, and its
//                name-addressed generic surface (`resolve`/`set`/`commit`/`clear`/
//                `remove`/`subscribe`) is driven directly. This is the live renderer
//                graph, not a reconstruction.
//          THE BRIDGE NAMESPACE CENSUS (read at SC-A-01/SC-A-06): the bridge exposes exactly
//          THREE object-valued namespaces — `security`, `store`, `module` (the other four
//          top-level members are the `ready`/`onRequest`/`sendReply`/`notify` plumbing).
//          **`Function.length` is `0` for EVERY bridged member** (the `contextBridge` proxy
//          does not expose arity — MEASURED), so no census here rests on arity: the
//          name-addressability of a channel is decided by DRIVING it, which is exactly why
//          the `store` namespace is now driven rather than assumed away.
//   [G]    repo records: file BYTES and sha256 over the scratch profile, the git landing
//          chain, `grep` over declared scopes.
// The `R4` static row of `scripts/electron-ui.mjs` forbids `webContents.executeJavaScript`
// and `webContents.debugger` in SHIPPED paths; this driver uses NEITHER — it drives the
// app over the CDP channel the `REAL-DOM-UI-GATE-LEG` owner ruling admits as LEG-ONLY
// (`docs/decisions.md`). It never writes to the operator's real profile: every boot passes
// `--provident-user-data=<fresh mkdtemp>` and the profile is removed on every exit path.
//
// VERDICT VOCABULARY — CLOSED (docs/specs/user-flow-audit.md §6.1): PASS / FAIL / MANUAL /
// PARKED. The driver exits `1` iff any row is `FAIL`; `0` only when there is no `FAIL`
// (`MANUAL`/`PARKED` rows are counted and named but are not `FAIL`s for exit purposes).
//
// FALSIFIABILITY — EVERY load-bearing row's predicate is stated in NAMED TERMS (listed in
// the row's own evidence) rather than as one opaque boolean, and every load-bearing
// predicate carries a CONTROL that drives it against a deliberately WRONG live state. **THE
// CONTROL INVENTORY, COUNTED SO THE RECORD AND THE DRIVER CANNOT DISAGREE (`A-F15`, disposed
// `FIXED`): FIVE id-labelled CONTROL rows — `SC-A-03` (CONTROL-ARBITRARY + its
// CONTROL-BRIDGE-PATCH half), `SC-B-02` (CONTROL-CENSUS), `SC-B-06` (CONTROL-TMP + its
// CONTROL-TORN fixture), `SC-B-08` (CONTROL-FILE-TIER) and `SC-C-04` (CONTROL-CARRIER + its
// ECHO-SCOPE half) — PLUS ONE further control asserted INSIDE a non-control row: the
// PRECEDENCE control inside `SC-C-01`. Six controls in total, five of them id-labelled:**
//   CONTROL-CENSUS     a THIRD `.json` file is seeded into the live scratch profile → the
//                      persisted-file census row's predicate must REFUSE it.
//   CONTROL-TMP        a residual `provident-security.json.tmp` is seeded at the real path
//                      → the no-`.tmp`-residue row's predicate must REFUSE it.
//   CONTROL-TORN       a TORN security file (the literal bytes `'{"token:'` — no closing
//                      brace) is written at the real path → the SAME predicate must REFUSE
//                      it on its `realPathParses` term, and the seeded bytes are RESTORED
//                      afterwards (asserted byte-identical). Added by the `§6.2` audit's
//                      `A-F10` (`FIXED`): without it the torn-file half was asserted but
//                      never falsified.
//   CONTROL-CARRIER    the tier-4 carrier scanner is driven against a synthetic payload
//                      that DOES carry all five needles → it must HIT all five.
//   CONTROL-ARBITRARY  the arbitrary-name write instrument is driven against a tier where
//                      an arbitrary name IS admissible — **the subject is
//                      `file.settings.complianceprobe.value`, an arbitrary caller-named key
//                      inside a DECLARED root, SEEDED into tier 1's file so the boot hand-off
//                      declares/mints it (the store's declaration input is CONSTRUCTION-ONLY,
//                      dossier `O-5`) — NOT a `mem.…` name; this header line read `mem.…`
//                      until the `§6.2` audit's `A-F13` (`FIXED`) corrected it.** PLUS the
//                      CONTROL-BRIDGE-PATCH half added by `A-F3` (`FIXED`): the SAME bridge
//                      patch channel the failing arm (a-i) drives is driven here on a
//                      tier-4-ADMISSIBLE declared member (`maxJournalLength`), round-tripped
//                      through `set()`/`get()`, with a distinct unknown member DROPPED as the
//                      deliberate contrast — so "the same instrument" is now literally true of
//                      arm (a-i), not merely the same SHAPE on another tier.
//   CONTROL-FILE-TIER  the `file` tier's own value at the logical path is WRITTEN live
//                      between the two readings → the "unchanged after the `secure.*`
//                      attempt" term must be shown to be able to MOVE.
//
// THE THIRD `§6.2` READ-ONLY AUDIT'S `A3-02`…`A3-09` — THE TERMS THIS PASS ADDED, NAMED HERE SO A
// LATER AUDITOR CHECKS THE CLAIM INSTEAD OF RE-DERIVING IT (the third round returned
// `VALID-WITH-FINDINGS` with `A3-01`/`A3-02` HIGH; `A3-01` was a RECORD-side defect — a malformed
// `§6.1` JSON block — and the eight below are the DRIVER-side ones):
//   `SC-A-01`  (`A3-02`, HIGH) THE CENSUS IS SPLIT INTO TWO NAMED TERMS READ BEFORE THE ROUND-TRIP:
//              `bridgeNamespaceCensusUnreadable` → `MANUAL`; `bridgeNamespaceCensusDirty` (readable
//              and `unknown`/`missing` non-empty) → **`FAIL`**. The as-filed single boolean was read
//              only in the round-trip's FALSE arm, so a FOURTH page-reachable namespace read `PASS`
//              whenever an arbitrary datum round-tripped, and a readable-but-dirty census read
//              `MANUAL` while the prose claimed it "FAILS the row" (`MANUAL` moves neither the exit
//              code nor an arm count).
//   `SC-A-06`  (`A3-04`, MED) THE PUT-RECEIPT PRECONDITION: `putReceiptsOk` requires each of the
//              three probes to answer a `committed` receipt, so a DEAD/refusing write instrument
//              reads `MANUAL` instead of being charged as a LEAK (the `B-F2` non-vacuity term had
//              mapped its own failure to `FAIL`, against `§4d` rule 2). A RECEIPTED write that lands
//              nothing is still the leak-predicate reading.
//   `SC-B-09`  (`A3-06`, LOW) THE TIER-SHAPE RE-MEASUREMENT: `SC-B-04`'s `setEquality` key-set
//              predicate is re-run on the END-of-run profile as a term of this row, because the key
//              set was read ONCE before both `setExclusion` transitions — an `exclusion` key landing
//              during them reddened nothing.
//   `SC-CH-02` (`A3-07`, LOW) THE SIX-MEMBER TERM: `STORE_SURFACE_MEMBERS_REQUIRED` is required in
//              the predicate, because `storeProbe.members` was PRINTED while the subject claimed the
//              generic name-addressed surface was PRESENT — a DELETED member left the row green.
//   THE FAMILY TALLY (`A3-05`, MED) now prints each family's `PASS`/`FAIL`/`MANUAL`/`PARKED` split
//              with its terms and NAMES every `MANUAL` arm, because the as-filed lines counted only
//              `FAIL` and a `MANUAL` arm (reachable at `SC-A-01/02/05/06`, `SC-C-01`) vanished from
//              both the family verdict and every count.
//   `A3-03` (MED) was the record's `get()`-reading count (`GET_READINGS` is THREE, not four) and
//              `A3-08`/`A3-09` are RECORD-side (`2c53a76` named in no `.md`; each `§3` `instrument`
//              cell now LEADS with its literal command line) — none of the three moved this file.
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { ChildProcessTransport, repoRoot, spawnElectron } from '../scripts/electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const mainCjs = join(root, 'dist', 'main', 'main.cjs')

// ── the seeded tier-4 record ────────────────────────────────────────────────────────────
// A REAL token (the settings channel must carry a value the carrier scanner can look for),
// the FIVE landed `VALID_GROUPS` members (so the enabled-group needle is non-vacuous) and a
// `maxJournalLength` value that is distinctive enough to be a needle.
const TOKEN = 'compliance-live-token-9b1f7c33'
const GROUPS = ['read', 'dispatch', 'graph', 'code', 'module']
const JOURNAL = 41
/** The tier's DECLARED members (`SecuritySettings`, src/shared/types.ts) — the top-level
 *  key set the security file may carry. `schemaVersion` is tier 1's single reserved member
 *  and belongs to `provident-settings.json`, never here (store-security.md §2.2 item 4 /
 *  §0A item 7); `exclusion` and `write` are the two ADDITIVE channel members and are
 *  channel-only (store-security.md §2.3 item 2) — their presence in the FILE is a finding. */
const DECLARED_SECURITY_KEYS = ['token', 'enabled', 'maxJournalLength']
const FORBIDDEN_SECURITY_KEYS = ['exclusion', 'write', 'schemaVersion']
/** The EXACTLY-TWO persisted-file pin (docs/specs/store-persist.md; docs/FORKER.md §4
 *  (ii)/(iv); the `G2` DONE row). The census reads `*.json` entries only: Chromium writes
 *  its own bookkeeping into `userData` lazily (`Cache/`, `Code Cache/`, `GPUCache/`,
 *  `DIPS`, `Trust Tokens`, `blob_storage/`, `declarative_performance_observer.db`,
 *  `Local Storage`, `Shared Dictionary`, `Dictionaries`, `Dawn*Cache`) — the S1 driver's
 *  own comment names this class, and those are the RUNTIME's, not the store's. */
const DECLARED_PERSISTED_JSON = ['provident-security.json', 'provident-settings.json']
const SECURITY_FILE = 'provident-security.json'
const SETTINGS_FILE = 'provident-settings.json'
const THIRD_FILE = 'third-party-store.json'
const TMP_RESIDUAL = `${SECURITY_FILE}.tmp`
/** The `file` tier's own logical path at the SAME tail as the `secure.*` attempt — the name
 *  the architect's `D-CLAUSE-2` cites verbatim ("`commit('secure.settings.theme.token', v)`
 *  must never clear `file.settings.theme.token`"). */
const FILE_LOGICAL = 'file.settings.theme.token'
/** An ARBITRARY caller-named key inside a DECLARED root, seeded in tier 1's file so the boot
 *  hand-off declares/mints it — the positive control's subject. */
const ARBITRARY_FILE_NAME = 'file.settings.complianceprobe.value'
/** The THREE object-valued namespaces `window.provident` is DECLARED to expose (the preload's
 *  `contextBridge` surface: the tier-4 `security` bridge, the tier-1 `store` bridge and the
 *  operator-only `module` surface). Asserted by SET EQUALITY against the live object's own
 *  object-valued members (`B-F15`), so a FOURTH such member is an un-censused channel and FAILS
 *  the census rather than being filtered away. */
const BRIDGE_NAMESPACES_DECLARED = ['module', 'security', 'store']
/** The SIX generic name-addressed members `SC-CH-02`'s subject claims are PRESENT on the live
 *  boot-constructed store (`resolve`/`set`/`commit`/`clear`/`remove`/`subscribe`). Required in the
 *  predicate since the THIRD `§6.2` audit's `A3-07` (disposed `FIXED`, `§4d` rule 1): the as-filed
 *  row PRINTED `storeProbe.members` while the predicate read only `sameIdentity`/`tierHandles`, so
 *  **a DELETED member left the row green while its own subject claimed the surface was present**.
 *  `hydrate`/`tiers`/`register` remain REPORTED rather than REQUIRED — they are reported-not-required
 *  in the row's printed list and in the record, so nothing the row does not claim is asserted. */
const STORE_SURFACE_MEMBERS_REQUIRED = ['resolve', 'set', 'commit', 'clear', 'remove', 'subscribe']

// ── records ────────────────────────────────────────────────────────────────────────────
const CHECKS = []
function check(id, subject, verdict, observation, evidence = '') {
  CHECKS.push({ id, subject, verdict, observation, evidence })
  const mark = verdict === 'PASS' ? '✓' : verdict === 'FAIL' ? '✗' : verdict === 'MANUAL' ? '»' : '□'
  const line = `  ${mark} [${verdict}] ${id} ${subject}`
  if (verdict === 'FAIL') console.error(`${line}\n      observed: ${observation}`)
  else console.log(`${line}\n      observed: ${observation}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')
const sha256Text = (text) => createHash('sha256').update(text).digest('hex')
const readOrNull = (path) => {
  try { return readFileSync(path, 'utf8') } catch { return null }
}
const exists = (path) => {
  try { statSync(path); return true } catch { return false }
}

/** THE CLEANUP REGISTRY — every boot registers its OWN teardown here the moment it exists,
 *  and one top-level `exit` hook drains it. A throw in ANY phase still kills every child and
 *  removes every scratch profile; nothing is left open on the operator's display. */
const CLEANUPS = []
function registerCleanup(fn) { CLEANUPS.push(fn) }
/** THE PROFILES THIS RUN CREATED — pushed by `seedProfile` the moment a directory exists, so the
 *  end-of-run cleanup row (`SC-CLEAN-01`) has the run's OWN term rather than an out-of-band host
 *  count (the `§6.2` audit's `B-F10`). */
const PROFILES = []
/** Every `removeWithVerify` outcome this run took — `false` means the sweep gave up while the
 *  directory still existed. Reported by the cleanup row. */
const REMOVALS = []
let cleanupsDrained = false
/** THE ONE DRAIN. Every boot's teardown runs here, ONCE, on the first `beforeExit` — which lets
 *  the run ASK whether the scratch profiles are really gone AFTER the drain (an `exit` hook
 *  cannot: nothing may be awaited and the process is already leaving). */
function drainCleanups() {
  if (cleanupsDrained) return
  cleanupsDrained = true
  for (const fn of CLEANUPS.splice(0)) { try { fn() } catch { /* best effort */ } }
}
process.on('exit', () => { for (const fn of CLEANUPS.splice(0)) { try { fn() } catch { /* best effort */ } } })

/** A SYNCHRONOUS settle — usable inside the `exit` hook, where nothing can be awaited.
 *  `Atomics.wait` on a private buffer is the portable sleep (Node ≥ 12); the bounded busy
 *  wait is the fallback and can NEVER spin forever. */
function settleSync(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  } catch {
    const started = Date.now()
    while (Date.now() - started < ms) { /* bounded spin */ }
  }
}
/** THE DELETE-AND-VERIFY SWEEP — MEASURED AT THIS HEAD (see the record's `§4b` self-found row):
 *  killing the child and removing the profile IMMEDIATELY let the child's own Chromium helpers
 *  write again into the directory AFTER the removal, RE-CREATING it — one leftover
 *  `/tmp/sc-live-B-*` per run, holding `Cache` and `Network Persistent State` and **no
 *  `provident-security.json`** (the `S1` `F-1` symptom: a cleanup that verifies a delete it
 *  performed is not a clean END STATE). The sweep re-removes a bounded number of times and
 *  returns whether the directory is REALLY gone; it is idempotent and never throws. **ITS RETURN
 *  VALUE IS RECORDED (`REMOVALS`) AND ASSERTED at the run's end (`SC-CLEAN-01`, the `§6.2` audit's
 *  `B-F10`): before that repair the boolean was DISCARDED and no row asserted the cleanup, so
 *  "0 new leftover profiles per run" rested on an out-of-band host count.**
 */
function removeWithVerify(dir) {
  let gone = false
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* already gone */ }
    if (!exists(dir)) { gone = true; break }
    settleSync(250)
  }
  if (!gone) gone = !exists(dir)
  REMOVALS.push({ dir, gone })
  return gone
}

// ── the scratch profile + the boot ─────────────────────────────────────────────────────
/** A fresh scratch profile under the OS temp dir, seeded with a REAL tier-4 record BEFORE
 *  the boot (so the boot read — not a write — is what ingests it; that ordering is what
 *  makes the seeded-third-party-key row measurable). `extra` adds foreign keys to the
 *  seeded file. */
function seedProfile(tag, extra = null) {
  const profile = mkdtempSync(join(tmpdir(), `sc-live-${tag}-`))
  PROFILES.push(profile)
  const record = { token: TOKEN, enabled: GROUPS, maxJournalLength: JOURNAL }
  if (extra !== null) Object.assign(record, extra)
  writeFileSync(join(profile, SECURITY_FILE), JSON.stringify(record, null, 2))
  // THE TIER-1 FILE IS SEEDED TOO, and for two measured reasons (MEASURED at this HEAD, both
  // recorded in the record's §5): (1) `file.settings.theme.token` — the VERY NAME the
  // architect's `D-CLAUSE-2` cites as the one a tier-4 write must never clear — is only
  // ADDRESSABLE once the boot hand-off has declared/minted it, because the store's
  // declaration input is construction-only (dossier `O-5`); on a cold profile that name is a
  // MISS and the non-destruction row would be measuring an absent value. (2) An ARBITRARY
  // caller-named key inside a DECLARED root (`file.settings.complianceprobe.value`) is what
  // makes CONTROL-ARBITRARY a POSITIVE control: it proves the arbitrary-name write/read
  // instrument really fires, on a tier where such names are admissible.
  writeFileSync(join(profile, SETTINGS_FILE), JSON.stringify({
    schemaVersion: '1',
    'file.settings.theme.token': 'dark-seeded',
    [ARBITRARY_FILE_NAME]: 'ARBITRARY-SEEDED-DATUM',
  }, null, 2))
  return profile
}

async function bootApp(tag, { seedExtra = null, extraArgs = [] } = {}) {
  const profile = seedProfile(tag, seedExtra)
  const spawned = spawnElectron([...extraArgs, `--provident-user-data=${profile}`])
  const child = spawned.child
  let stderr = ''
  child.stderr.on('data', (d) => { stderr += String(d) })
  child.stdout.on('data', () => {})
  const transport = new ChildProcessTransport(child)
  const client = new Client({ name: 'store-compliance-live', version: '0.1.0' })
  const boot = { child, transport, client, profile, stderrText: () => stderr, closed: false, notifications: [], spawnedAt: Date.now() }
  // THE NOTIFICATION CARRIER (one of the four): every JSON-RPC notification the app's own
  // stdio server pushes is captured, whatever its method, so the carrier scan is not
  // restricted to a method list this pass guessed.
  client.fallbackNotificationHandler = async (n) => { boot.notifications.push(n) }
  await client.connect(transport)
  registerCleanup(() => {
    if (boot.closed) return
    boot.closed = true
    try { client.close() } catch { /* gone */ }
    try { transport.close() } catch { /* gone */ }
    try { child.kill('SIGKILL') } catch { /* gone */ }
    // THE SETTLE IS SYNCHRONOUS HERE because an `exit` hook cannot await: the child's Chromium
    // helpers need a moment to die, and removing the profile before they do lets them
    // RE-CREATE it (the measured leftover, `§4b`). Then the delete-and-verify sweep.
    settleSync(500)
    removeWithVerify(profile)
  })
  return boot
}

async function teardown(boot) {
  if (boot.closed) return
  boot.closed = true
  try { await boot.client.close() } catch { /* gone */ }
  try { boot.transport.close() } catch { /* gone */ }
  try { boot.child.kill('SIGKILL') } catch { /* gone */ }
  await sleep(300)
  removeWithVerify(boot.profile)
}

async function rawCall(client, name, args = {}) {
  try {
    const r = await client.callTool({ name, arguments: args })
    return { ok: true, text: r.content?.[0]?.text ?? '', isError: r.isError === true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
/** BOUNDED first-read retry: the stdio handshake can resolve in the window between
 *  `mcp.start()` and the renderer's `markReady()`, during which the backend queues. A
 *  failed first read is an INSTRUMENT state, not a finding — retried a bounded 20 times
 *  and the attempt count is part of the record. */
async function firstRead(client, name, args = {}, attempts = 20) {
  let last = null
  for (let i = 0; i < attempts; i += 1) {
    last = await rawCall(client, name, args)
    if (last.ok && !/^\s*MCP error/i.test(last.text)) return { ...last, attempts: i + 1 }
    await sleep(500)
  }
  return { ...last, attempts }
}
const parsedOf = (r) => (r.ok ? JSON.parse(r.text) : { __error: r.error })

// ── the CDP channel ────────────────────────────────────────────────────────────────────
async function devtoolsPort(boot, timeoutMs = 20000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const m = /DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//.exec(boot.stderrText())
    if (m) return Number(m[1])
    await sleep(100)
  }
  throw new Error('the child never announced its DevTools endpoint on stderr')
}

class Cdp {
  static async attach(port) {
    const listing = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const page = listing.find((t) => t.type === 'page')
    if (!page) throw new Error("no CDP page target in the app's renderer")
    const cdp = new Cdp(page.webSocketDebuggerUrl)
    await cdp.open()
    return cdp
  }
  constructor(url) { this.url = url; this.id = 0; this.pending = new Map() }
  open() {
    this.ws = new WebSocket(this.url)
    this.ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data)
      if (m.id !== undefined && this.pending.has(m.id)) { this.pending.get(m.id)(m); this.pending.delete(m.id) }
    })
    return new Promise((res, rej) => { this.ws.addEventListener('open', res); this.ws.addEventListener('error', rej) })
  }
  send(method, params = {}) {
    const i = ++this.id
    return new Promise((r) => { this.pending.set(i, r); this.ws.send(JSON.stringify({ id: i, method, params })) })
  }
  async evaluate(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, includeCommandLineAPI: true })
    if (r.result?.exceptionDetails) {
      return { __cdpError: r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text }
    }
    return r.result?.result?.value
  }
  close() { try { this.ws.close() } catch { /* already closed */ } }
}

/** THE LIVE STORE HANDLE — one expression, used by every generic-surface row. It
 *  RE-IMPORTS the app's own renderer module at its own page URL; the ESM module map
 *  answers the SAME already-evaluated instance the page's own `<script type="module">`
 *  loaded, so `getWiredGraphStore()` is THE ONE boot-constructed store of this live realm
 *  (renderer.ts's own declaration: "the ONE boot-constructed store — same identity on
 *  every call"). The handle is re-derived per call; no state is held across readings. */
const STORE_HANDLE = `(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  return mod.getWiredGraphStore();
})()`

/** Drive N named members of the live generic surface against one name, in ONE reading. */
async function driveGenericSurface(cdp, name, value = 'compliance-probe-value') {
  return cdp.evaluate(`(async function(){
    const mod = await import(new URL('./renderer.js', document.baseURI).href);
    const s = mod.getWiredGraphStore();
    const out = {};
    let sub = null;
    try { sub = s.resolve(${JSON.stringify(name)}); } catch (e) { sub = { threw: String(e) }; }
    out.resolve = sub;
    try { out.set = s.set(${JSON.stringify(name)}, ${JSON.stringify(value)}); } catch (e) { out.set = { threw: String(e) }; }
    try { out.commit = s.commit(${JSON.stringify(name)}, ${JSON.stringify(value)}); } catch (e) { out.commit = { threw: String(e) }; }
    try { out.clear = s.clear(${JSON.stringify(name)}); } catch (e) { out.clear = { threw: String(e) }; }
    try { out.remove = s.remove(${JSON.stringify(name)}); } catch (e) { out.remove = { threw: String(e) }; }
    try { out.subscribe = s.subscribe(${JSON.stringify(name)}, function(){}); } catch (e) { out.subscribe = { threw: String(e) }; }
    out.tierHandles = Object.keys(s.tiers);
    return out;
  })()`)
}
/** The DECLARED SHAPE of the refusal record, read from a live answer. The store answers the
 *  `secure-refused` decision in TWO declared record forms, MEASURED at this HEAD:
 *    the READ-side form  `{status:'refused', reason:'secure-refused', step:'B-SECURE-GATE', …}`
 *    the WRITE-side receipt `{status:'refused', name, reason:'secure-refused',
 *                             diagnostic:{reason:'secure-refused', step:'B-SECURE-GATE', …}, …}`
 *  (the write receipt carries the refusal's REASON top-level and its walk DIAGNOSTIC nested —
 *  `cleared`/`repaired`/`rows`/`crossings`/`events` are the write's own accounting). A row
 *  that asserted only ONE of the two forms would read a PASSING refusal as a FAIL — the exact
 *  instrument defect a first draft of this battery hit, recorded in the record's §5. So the
 *  predicate is: `status === 'refused'` AND `reason === 'secure-refused'` AND the
 *  `B-SECURE-GATE` step present at EITHER depth. An answer that is a HIT, a throw, a silent
 *  miss or a DIFFERENT reason token is OUTSIDE the declared refusal and fails the row. */
const isSecureRefusal = (answer) => {
  if (answer === null || typeof answer !== 'object' || answer.status !== 'refused') return false
  if (answer.reason !== 'secure-refused') return false
  return answer.step === 'B-SECURE-GATE' || answer.diagnostic?.step === 'B-SECURE-GATE'
}

/** A COUNT OF A TOKEN **FROM CODE ONLY** — the `§6.2` audit's `B-F18`: raw
 *  `matchAll(/secure-refused/g)` over the whole file counted the token inside the module's OWN
 *  comments, so a comment-only census PASSed. **THE COMMENT SPANS ARE EXCLUDED BY POSITION, NOT
 *  BY RE-LEXING THE FILE:** a first attempt at this stripped strings and comments with a
 *  character walker and read `0` code occurrences of a token the file plainly carries five times —
 *  a prose apostrophe inside a `/* … *​/` block put the walker out of phase and it ate the code.
 *  A census that can silently read `0` is worse than no census, so the mechanism here is the
 *  conservative one: the spans that MATCH a line- or block-comment shape are enumerated, and an
 *  occurrence counts only when its index lies OUTSIDE every such span. The raw count is printed
 *  beside the code count, so the two can be compared and the difference is the prose. */
const COMMENT_SPAN_RE = /\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g
function countInCode(src, token) {
  const spans = []
  let m
  const finder = new RegExp(COMMENT_SPAN_RE.source, 'g')
  while ((m = finder.exec(src)) !== null) spans.push([m.index, m.index + m[0].length])
  const tokenRe = new RegExp(token, 'g')
  let code = 0
  let raw = 0
  while ((m = tokenRe.exec(src)) !== null) {
    raw += 1
    if (!spans.some(([a, b]) => m.index >= a && m.index < b)) code += 1
  }
  return { code, raw }
}

// ── the named predicates ───────────────────────────────────────────────────────────────
/** THE PERSISTED-FILE CENSUS — NAMED TERMS: `jsonNames` (every `*.json` entry in the
 *  profile), `undeclaredJsonNames` (the ones OUTSIDE the EXACTLY-TWO pin), `securityPresent`,
 *  `settingsPresent`. The predicate is `undeclaredJsonNames.length === 0` AND the security
 *  file present. `settingsPresent` is REPORTED but not asserted — **and the reason is NOT
 *  "absent on a settled cold boot": this driver's `seedProfile` WRITES the tier-1 file before
 *  every boot, and the run's own reading is `settingsPresent=true` (the `§6.2` audit's `B-F17`,
 *  disposed `FIXED`; the earlier comment said "MEASURED: absent on a settled cold boot", which
 *  the driver's own printed bytes contradict and which was quotable as a measurement).** The
 *  tier-1 file IS created lazily at the first `file.*` crossing on a profile this battery did
 *  not seed; on the profiles it DOES seed the assertable property is still the ABSENCE of a
 *  third name, which is what the pin exists to catch (`settingsPresent=false` would be a fact
 *  about THIS seed, not about the store's shape). */
function persistedCensus(listing) {
  const jsonNames = listing.filter((n) => n.endsWith('.json')).sort()
  const undeclaredJsonNames = jsonNames.filter((n) => !DECLARED_PERSISTED_JSON.includes(n))
  return {
    jsonNames,
    undeclaredJsonNames,
    securityPresent: listing.includes(SECURITY_FILE),
    settingsPresent: listing.includes(SETTINGS_FILE),
    ok: undeclaredJsonNames.length === 0 && listing.includes(SECURITY_FILE),
  }
}
/** THE NO-`.tmp`-RESIDUE / ATOMIC-SHAPE PREDICATE — NAMED TERMS: `residuals` (any
 *  `${persisted}.tmp` entry at the real path), `realPathParses` (the real path's bytes are
 *  valid JSON — a TORN file does not parse), `realPathKeys` (the parsed top-level key set),
 *  `tornOrUnparsable`. The predicate is `residuals.length === 0` AND `realPathParses`. */
function tmpResidueCensus(profile) {
  const listing = readdirSync(profile)
  const residuals = listing.filter((n) => n.endsWith('.tmp'))
  const raw = readOrNull(join(profile, SECURITY_FILE))
  let realPathParses = false
  let realPathKeys = null
  try {
    const p = JSON.parse(raw)
    realPathParses = p !== null && typeof p === 'object' && !Array.isArray(p)
    realPathKeys = realPathParses ? Object.keys(p).sort() : null
  } catch { realPathParses = false }
  return { residuals, realPathParses, realPathKeys, tornOrUnparsable: !realPathParses, ok: residuals.length === 0 && realPathParses }
}
/** SET-EQUALITY, AS A NAMED TERM — the `§6.2` audit's `B-F6` remedy. `SC-B-04` reads *"the file's
 *  EXACT top-level key set is the tier's DECLARED members"*, and a `⊆`-only predicate does not
 *  support an "exact" claim: **delete `token` from the persisted file and a subset test still
 *  PASSes** (nothing then asserts the file carries its declared members at all). So the term is
 *  `[...actual].sort()` vs `[...declared].sort()` — same length, same members — and the MISSING
 *  members are reported by name. */
function setEquality(actual, declared) {
  const a = [...actual].sort()
  const d = [...declared].sort()
  return {
    equal: a.length === d.length && a.every((m, i) => m === d[i]),
    missing: d.filter((m) => !a.includes(m)),
    extra: a.filter((m) => !d.includes(m)),
  }
}

/** THE TIER-4 CARRIER SCANNER — five NAMED NEEDLES, each a falsifiable byte-shape:
 *   N1 `tier4-token-value`            the seeded token literal
 *   N2 `tier4-maxjournallength-value` the seeded cap as that member's own value
 *   N3 `tier4-enabled-group-set`      the `enabled` group-set member
 *   N4 `tier4-secure-name-spelling`   a tier-qualified `secure.` name in a payload position
 *   N5 `tier4-exclusion-member`       the widened GET record's additive `exclusion` member
 *  A needle that cannot appear because the seed is wrong would make the scan vacuous, so
 *  the CONTROL below drives the SAME scanner against a synthetic payload carrying all five. */
const NEEDLES = [
  { id: 'tier4-token-value', re: new RegExp(TOKEN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) },
  { id: 'tier4-maxjournallength-value', re: new RegExp(`"maxJournalLength"\\s*:\\s*${JOURNAL}\\b`) },
  { id: 'tier4-enabled-group-set', re: /"enabled"\s*:\s*\[/ },
  { id: 'tier4-secure-name-spelling', re: /secure\.[A-Za-z]/ },
  { id: 'tier4-exclusion-member', re: /"exclusion"\s*:\s*"(mcp-enabled|mcp-disabled)"/ },
]
const scannable = (v) => (typeof v === 'string' ? v : JSON.stringify(v) ?? '')
/** Every `[start,end)` span in `text` the regex matches. */
function matchRanges(re, text) {
  const out = []
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`)
  let m
  while ((m = g.exec(text)) !== null) {
    out.push([m.index, m.index + m[0].length])
    if (m[0].length === 0) g.lastIndex += 1
  }
  return out
}
/** Every `[start,end)` span where one of the CALLER'S OWN argument strings occurs. */
function ownArgRanges(text, ownArgs) {
  const out = []
  for (const a of ownArgs) {
    if (typeof a !== 'string' || a === '') continue
    let i = text.indexOf(a)
    while (i !== -1) { out.push([i, i + a.length]); i = text.indexOf(a, i + 1) }
  }
  return out
}
const spanInside = (outer, inner) => inner[0] >= outer[0] && inner[1] <= outer[1]
/** THE CARRIER SCAN. A needle hit is ECHOED when its matched span lies INSIDE an occurrence
 *  of a string THIS BATTERY ITSELF supplied as a tool argument — the only case MEASURED at
 *  this HEAD is `provident.code.get {path:'secure.operator.token'}`, whose error text quotes
 *  the caller's own path back. The exclusion is MATCH-SCOPED, not a blanket amnesty: it can
 *  only excuse a span the caller literally supplied, so a tier-4 VALUE (the seeded token, the
 *  cap, the group set) can never be excused, and a `secure.` name the caller did NOT supply
 *  stays UNEXPLAINED. SC-C-04's second control drives exactly that and would redden if the
 *  exclusion ever swallowed a span outside an own-argument occurrence. */
function scanCarrier(carrierId, body, ownArgs = []) {
  const text = scannable(body)
  const ownRanges = ownArgRanges(text, ownArgs)
  const hits = []
  const echoHits = []
  for (const n of NEEDLES) {
    for (const r of matchRanges(n.re, text)) {
      if (ownRanges.some((o) => spanInside(o, r))) echoHits.push({ needle: n.id, span: r })
      else hits.push({ needle: n.id, span: r })
    }
  }
  return {
    carrierId,
    bytes: text.length,
    hits: [...new Set(hits.map((h) => h.needle))],
    echoHits: [...new Set(echoHits.map((h) => h.needle))],
    firstHitSpans: hits.slice(0, 6),
  }
}

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 0 — the preflight
// ══════════════════════════════════════════════════════════════════════════════════════
console.log('\nSTORE-COMPLIANCE LIVE BATTERY — the four-tier data store, three compliance families')
console.log('='.repeat(88))
console.log(`  driver: node tests/store-compliance-live.mjs`)
console.log(`  HEAD:   ${execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()}`)
console.log(`  seed:   a fresh mkdtemp profile carrying token=${TOKEN}, enabled=[${GROUPS.join(',')}], maxJournalLength=${JOURNAL}`)

/** THE STALE-WINDOW PREFLIGHT, taken INSIDE the driver (the S1 battery's `F10` lesson):
 *  a stale window from an earlier run makes both the CDP attach and any rendered reading
 *  ambiguous, so the run REFUSES TO MEASURE through one. `ps`, not `pgrep`, so the probe
 *  does not depend on `procps` and cannot match itself. */
function appProcesses() {
  try {
    const out = execSync('ps -eo pid=,args=', { cwd: root, maxBuffer: 8 * 1024 * 1024 }).toString()
    return out.split('\n').map((l) => l.trim()).filter((l) => l !== '' && l.includes('dist/main/main.cjs'))
  } catch { return null }
}
const stale = appProcesses()
check('SC-PRE-01 (preflight)', 'no pre-existing app process is on the display before the first boot', stale !== null && stale.length === 0 ? 'PASS' : 'FAIL',
  stale === null ? 'the preflight probe itself could not be run' : `ps -eo pid=,args= → ${JSON.stringify(stale)}`,
  'a stale window would make the CDP attach and every scratch-profile reading ambiguous')
if (stale === null || stale.length !== 0) {
  console.error('\nPREFLIGHT STOP — a stale app process is on the display (or the probe could not be run). Nothing is measured through it.')
  console.error('Kill it (e.g. `pkill -f dist/main/main.cjs`) and re-run.')
  process.exit(1)
}

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 1 — BOOT A: the live channels, the Family A arms, the Family B arms
// ══════════════════════════════════════════════════════════════════════════════════════
const bootA = await bootApp('A', { extraArgs: ['--mcp-transport=stdio', '--remote-debugging-port=0'] })
const portA = await devtoolsPort(bootA)
const cdp = await Cdp.attach(portA)
registerCleanup(() => cdp.close())

// The first MCP read also arms the renderer backend (IPC_READY → markReady).
const firstRaw = await firstRead(bootA.client, 'provident.get_markdown', {})
const firstOk = firstRaw.ok && !firstRaw.isError
check('SC-PRE-02 (preflight)', 'the live MCP stdio surface answers on this boot', firstOk ? 'PASS' : 'FAIL',
  `provident.get_markdown answered after ${firstRaw.attempts} attempt(s): ok=${firstRaw.ok}, isError=${firstRaw.isError === true}, ${String(firstRaw.text ?? firstRaw.error).length} chars`,
  'a boot that cannot answer its own MCP surface measures nothing about the store, so this is asserted before any store row')

// The seeded record must be what the LIVE store reports, or every downstream reading is
// about a different object than the one the profile seeded.
const bridgeGet = await cdp.evaluate('window.provident.security.get()')
const bridgeIsSeeded = bridgeGet !== null && typeof bridgeGet === 'object' && bridgeGet.token === TOKEN
  && Array.isArray(bridgeGet.enabled) && bridgeGet.enabled.slice().sort().join(',') === GROUPS.slice().sort().join(',')
  && bridgeGet.maxJournalLength === JOURNAL
check('SC-CH-01 (live channel 1)', 'the main-side renderer bridge answers the tier-4 record the profile seeded (the boot read ingested it)', bridgeIsSeeded ? 'PASS' : 'FAIL',
  `window.provident.security.get() over CDP → ${JSON.stringify(bridgeGet)}`,
  'channel 1 of the tier-4 read path, read as a VALUE over the app\'s own renderer. A bridge that answered defaults here would make the seeded-key rows vacuous')

// The generic-surface handle must be THE boot-constructed store of THIS realm.
const storeProbe = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  const again = mod.getWiredGraphStore();
  return { sameIdentity: s === again, tierHandles: Object.keys(s.tiers), members: ['resolve','set','commit','clear','remove','subscribe','hydrate','tiers','register'].filter(function(k){ return typeof s[k] !== 'undefined' }) };
})()`)
const storeIsLive = storeProbe !== null && typeof storeProbe === 'object' && storeProbe.sameIdentity === true
  && Array.isArray(storeProbe.tierHandles) && storeProbe.tierHandles.join(',') === 'temp,mem,file'
  && Array.isArray(storeProbe.members)
  && STORE_SURFACE_MEMBERS_REQUIRED.every((k) => storeProbe.members.includes(k))
const storeSurfaceMissing = Array.isArray(storeProbe?.members)
  ? STORE_SURFACE_MEMBERS_REQUIRED.filter((k) => !storeProbe.members.includes(k))
  : STORE_SURFACE_MEMBERS_REQUIRED.slice()
check('SC-CH-02 (live channel 2)', 'the app\'s own renderer module answers THE ONE boot-constructed store of this live realm, with the generic name-addressed surface present — ALL SIX members its subject names — and `secure` NOT among the tier handles', storeIsLive ? 'PASS' : 'FAIL',
  `import(new URL('./renderer.js', document.baseURI).href).getWiredGraphStore(): sameIdentity=${storeProbe?.sameIdentity}, tierHandles=${JSON.stringify(storeProbe?.tierHandles)}, members present ${JSON.stringify(storeProbe?.members)}, the SIX members this row REQUIRES=${JSON.stringify(STORE_SURFACE_MEMBERS_REQUIRED)} (missing=${JSON.stringify(storeSurfaceMissing)} — the A3-07 term: the subject claims the generic name-addressed surface is PRESENT, so a DELETED member reddens this row instead of leaving it green while the row printed the surviving list)`,
  'the live renderer graph, not a reconstruction: the ESM module map returns the already-evaluated instance. `tiers` is the landed 3-member `Object.freeze({temp,mem,file})` (the dossier\'s A-2 OUT row), so `store.tiers.secure` cannot exist. **THE SIX-MEMBER SET IS A PREDICATE TERM SINCE THE THIRD AUDIT\'S `A3-07` (rule 1: `storeProbe.members` was PRINTED but never read, so a deleted member left this row PASS); `hydrate`/`tiers`/`register` stay reported-not-required, and the required six are exactly the members the row\'s own subject names as the generic name-addressed surface**')

// ── FAMILY A, arm (a) — an arbitrary name through ANY live channel ─────────────────────
/** The bridge's declared member set and its patch surface, read off the LIVE object. A
 *  name-addressed API would show as a `set` whose first parameter is a NAME or a member
 *  like `set(name, value)` / `get(name)` / `commit` / `subscribe`; the landed bridge's is
 *  `get()` / `set(patch)` / `setExclusion(state)` with no name parameter at all. */
/** THE BRIDGE SURFACE AND ITS THREE OBJECT-VALUED NAMESPACES — the census that supports the
 *  "NO live channel" clause, restated by the `§6.2` audit's `A-F1` (`FIXED`). The `security`
 *  namespace alone is NOT the bridge: `store` (the tier-1 file-store bridge, wired through
 *  `STORE_FILE_PUT` into main's own handler) and `module` are page-reachable too, and a census
 *  that stopped at `security` could not support the clause. `Function.length` is read as well
 *  and is expected to be `0` for EVERY member — the `contextBridge` proxy does not expose arity,
 *  so the census records that fact rather than resting on it. */
const bridgeCensus = await cdp.evaluate(`(function(){
  const p = window.provident;
  if (!p) return { present: false };
  const out = { present: true, topKeys: Object.keys(p).sort(), namespaces: {} };
  for (const k of Object.keys(p)) {
    if (p[k] !== null && typeof p[k] === 'object') out.namespaces[k] = { present: true, members: Object.keys(p[k]).sort(),
      arities: Object.fromEntries(Object.keys(p[k]).map(function(m){ return [m, typeof p[k][m] === 'function' ? p[k][m].length : null] })) };
  }
  return out;
})()`)
/** THE NAMESPACE SET, ASSERTED — the `§6.2` audit's `B-F15`, disposed `FIXED`. The as-filed census
 *  read the THREE declared names (`security`/`store`/`module`) with a `present !== false` filter,
 *  so **a FOURTH object-valued member on `window.provident` was invisible to it**: the clause the
 *  census supports is *"NO live channel accepts an arbitrary tier-4 NAME"*, and an un-enumerated
 *  page-reachable namespace is exactly the class of channel `A-F1` found once already by this
 *  route. The live object is now walked WHOLE (`Object.keys(p)` with an object-valued filter) and
 *  the declared set is compared by SET EQUALITY, so an unknown object-valued member FAILS the row
 *  (it is an un-censused channel until a pass declares and drives it) rather than reddening
 *  nothing. MEASURED at this HEAD: the four string/function plumbing members
 *  (`ready`/`onRequest`/`sendReply`/`notify`) are filtered out and exactly three object-valued
 *  namespaces remain. */
const bridgeNamespaces = Object.entries(bridgeCensus?.namespaces ?? {}).map(([k, v]) => (v.present !== false ? k : null)).filter((k) => k !== null).sort()
const bridgeNamespaceUnknowns = bridgeNamespaces.filter((k) => !BRIDGE_NAMESPACES_DECLARED.includes(k))
const bridgeNamespaceMisses = BRIDGE_NAMESPACES_DECLARED.filter((k) => !bridgeNamespaces.includes(k))
/** **THE CENSUS IS SPLIT INTO ITS TWO STATES — the THIRD `§6.2` audit's `A3-02`, disposed `FIXED`
 *  (HIGH, gate-6-blocking), and THE TERM NOW BITES INDEPENDENTLY OF THE ROUND-TRIP TERM.** The
 *  as-filed form was ONE boolean (`present && unknown === 0 && missing === 0`) read ONLY inside the
 *  FALSE arm of the round-trip term (`arbitraryRoundTripped ? 'PASS' : (censusOk ? 'FAIL' :
 *  'MANUAL')`), which had two measured consequences: **(a) with an arbitrary datum round-tripping —
 *  the post-`S2` state this record expects — a FOURTH page-reachable namespace reads `PASS`
 *  outright, i.e. a regression HIDES BEHIND THE ROUND-TRIP READING one line above the term the
 *  `B-F15` repair added; and (b) a READABLE census carrying an unknown/missing namespace reads
 *  `MANUAL`, while the code comment and `§4d` rules 1/2 both claim it *"FAILS the row"* — and
 *  `MANUAL` moves neither the exit code nor either family arm count.** MEASURED against the
 *  as-filed bytes at `bae67ebc…`: `arbitraryRoundTripped=true` + `unknown=['fourthChannel']` →
 *  `PASS` (the regression invisible), and `arbitraryRoundTripped=false` + `unknown=['fourthChannel']`
 *  → `MANUAL` (the claim false). The two named terms below are read by the verdict SEQUENTIALLY and
 *  the round-trip term can no longer bypass either:
 *    `bridgeNamespaceCensusUnreadable` — the census could NOT BE TAKEN (`window.provident` absent,
 *      or the whole walk enumerated ZERO object-valued namespaces, which cannot be a reading about
 *      the declared three) → the row reads `MANUAL` (rule 2: a broken instrument manufactures
 *      neither direction).
 *    `bridgeNamespaceCensusDirty` — the census WAS readable and its namespace set is NOT equal to
 *      the declared three (`unknown`/`missing` non-empty) → the row reads **`FAIL`**, whatever the
 *      round-trip term says (rule 1: every computed term the evidence claims is IN the predicate).
 *  The two are mutually exclusive by construction, and `bridgeNamespaceCensusOk` is retained as the
 *  conjunction so the printed term keeps its `B-F15` meaning. */
const bridgeNamespaceCensusUnreadable = bridgeCensus?.present !== true || bridgeNamespaces.length === 0
const bridgeNamespaceCensusDirty = !bridgeNamespaceCensusUnreadable
  && (bridgeNamespaceUnknowns.length !== 0 || bridgeNamespaceMisses.length !== 0)
const bridgeNamespaceCensusOk = !bridgeNamespaceCensusUnreadable && !bridgeNamespaceCensusDirty
const arbitraryNameWritten = await cdp.evaluate(`(async function(){
  var r = null;
  try { r = await window.provident.security.set({ myNewField: 'COMPLIANCE-ARBITRARY-DATUM' }); } catch (e) { r = { threw: String(e) }; }
  var got = null;
  try { got = await window.provident.security.get(); } catch (e) { got = { threw: String(e) }; }
  return { setAnswer: r, getAnswer: got };
})()`)
const arbitraryNameReadBack = arbitraryNameWritten?.getAnswer ?? null
const arbitraryRoundTripped = arbitraryNameReadBack !== null && typeof arbitraryNameReadBack === 'object'
  && Object.prototype.hasOwnProperty.call(arbitraryNameReadBack, 'myNewField')
/** THE ARM'S VERDICT — **THE CENSUS IS READ FIRST AND THE ROUND-TRIP TERM CANNOT BYPASS IT**
 *  (the `B-F3` rule-2 mapping, applied here too, and the `A3-02` repair). Three states, in this
 *  order: an UNREADABLE census → `MANUAL` (a broken instrument never manufactures a verdict in
 *  either direction); a READABLE but DIRTY census → `FAIL` (an un-censused or missing page-reachable
 *  namespace is a channel defect this row exists to redden, and it no longer hides behind a
 *  successful round trip); otherwise the requirement arm decides on `arbitraryRoundTripped`.
 *  `bridgeNamespaceCensusOk` therefore holds only in the live state, and both of its halves are
 *  NAMED TERMS in the predicate rather than one opaque boolean. */
const scA01Verdict = bridgeNamespaceCensusUnreadable ? 'MANUAL'
  : bridgeNamespaceCensusDirty ? 'FAIL'
    : (arbitraryRoundTripped ? 'PASS' : 'FAIL')
check('SC-A-01 (Family A, arm a-i) — THE MAIN-SIDE RENDERER BRIDGE', 'REQUIREMENT ARM (a-i): an ARBITRARY caller-named datum can be written to and read back from tier 4 through the main-side renderer bridge — MEASURED: it cannot; the bridge is not name-addressed and the write is dropped', scA01Verdict,
  `NAMED TERMS: the ARM is MET iff the live read-back carries the caller's own key; the row's census clause CARRIES BOTH of its states as terms, each read BEFORE the round-trip term: an UNREADABLE census (window.provident absent, or ZERO object-valued namespaces enumerated) reads MANUAL, and a READABLE but DIRTY census (unknown/missing non-empty) reads FAIL whatever the round-trip says (the A3-02 split — before it, a fourth namespace read PASS whenever the round-trip succeeded). bridge top-level keys=${JSON.stringify(bridgeCensus?.topKeys)}, the object-valued namespaces READ OFF THE LIVE OBJECT=${JSON.stringify(bridgeNamespaces)} vs DECLARED=${JSON.stringify(BRIDGE_NAMESPACES_DECLARED)} (unknown=${JSON.stringify(bridgeNamespaceUnknowns)}, missing=${JSON.stringify(bridgeNamespaceMisses)}, censusUnreadable=${bridgeNamespaceCensusUnreadable}, censusDirty=${bridgeNamespaceCensusDirty}, censusOk=${bridgeNamespaceCensusOk} — the B-F15 SET-EQUALITY term, now in the predicate as TWO terms so a FOURTH page-reachable namespace reddens the row in EITHER live state), their members and Function.length arities=${JSON.stringify(bridgeCensus?.namespaces)}; a live set({myNewField:'COMPLIANCE-ARBITRARY-DATUM'}) answered ${JSON.stringify(arbitraryNameWritten?.setAnswer)}; the live get() AFTER it answered ${JSON.stringify(arbitraryNameReadBack)}; arbitraryKeyRoundTripped=${arbitraryRoundTripped}; rowVerdict=${scA01Verdict}. THE CHANNEL CENSUS, so "ANY live channel" is answered and not assumed — and RESTATED by the §6.2 audit's A-F1 over the THREE BRIDGE NAMESPACES rather than the security namespace alone: (i) security={${(bridgeCensus?.namespaces?.security?.members ?? []).join(',')}} with no name-addressed member; (ii) store={${(bridgeCensus?.namespaces?.store?.members ?? []).join(',')}} — the tier-1 FILE bridge, DRIVEN at SC-A-06 with a secure.-keyed payload and a secure.-looking name, because a name-parameterised put() exists there and was NEVER probed by this battery's first draft; (iii) module={${(bridgeCensus?.namespaces?.module?.members ?? []).join(',')}} (operator-only, main->renderer->main); (iv) the generic surface's six name-addressed members, driven at SC-A-02; (v) the live MCP tool set, censused against the landed ALL_TOOLS at SC-C-02. Every bridged member reports Function.length=0, so no census here rests on arity. NO live channel accepts an arbitrary tier-4 name`,
  'the authority is the architect\'s clause (1) in docs/decisions.md `SECURE-TIER-IS-A-FILESTORE-PEER`: tier 4\'s ONLY distinctions from the `file` tier are "its FILE, its NO-LOWER-TIER-ALIAS rule and its ACCESS-CONTROL POLICY", with the shape "OPENED to arbitrary data keyed by the app\'s own subsystems". The landed three-member patch surface is the FOURTH distinction the same row says a pass must "surface rather than enforce". THIS ROW IS DELIBERATELY WRITTEN AS THE REQUIREMENT ARM: a PASS would mean an arbitrary datum round-tripped through the tier\'s own store API, which is the only admissible form of a Family A pass. ITS CENSUS CLAUSE IS NOW SUPPORTED BY A DRIVEN PROBE OF EVERY NAMESPACE, not by a member list — the `§6.2` audit\'s `A-F1` found the `store` namespace unprobed and every row still green, which is why SC-A-06 exists; and the NAMESPACE SET is itself a predicate term since the second audit\'s `B-F15` — **AND SINCE THE THIRD AUDIT\'S `A3-02` THAT TERM IS TWO TERMS READ BEFORE THE ROUND-TRIP: a fourth object-valued member used to redden nothing when the round-trip succeeded, and a readable-but-dirty census used to read `MANUAL` (which moves neither the exit code nor an arm count) while the prose claimed it FAILS the row. BOTH ARE CLOSED HERE, and the code comment, `§4d` rules 1/2 and this cell now say the same thing.**')

const genericSecure = await driveGenericSurface(cdp, 'secure.operator.token')
const genericRefusals = ['resolve', 'set', 'commit', 'clear', 'remove', 'subscribe']
const genericRefused = genericRefusals.map((k) => isSecureRefusal(genericSecure?.[k]))
/** THE POSITIVE HIT, AS A NAMED TERM (the `§6.2` audit's `B-F3`, disposed `FIXED`). The as-filed
 *  predicate was `anyGenericAccepted = genericRefused.some(v => v !== true)` — i.e. **"the ARM is
 *  MET" was answered by ANY answer that was not the declared refusal**: a THROWN member
 *  (`{threw}`, the shape `driveGenericSurface` returns from its own `try/catch`), a CDP failure
 *  (`{__cdpError}`) or any non-`secure-refused` token manufactured a PASS in the REQUIREMENT
 *  direction — a dead probe reading as a COMPLIANCE CLAIM. An acceptance must now be a POSITIVE
 *  HIT: **a non-refusing answer carrying the CALLER'S OWN NAME (or the caller's rows)**.
 *  **MEASURED, AND THE REASON THE HIT IS SPELLED THIS WAY:** every ONE of the six REFUSAL records
 *  at this HEAD carries the caller's name too (`{status:'refused', name:'secure.operator.token',
 *  reason:'secure-refused', …}`), so "carries the name" alone would have been satisfied by a
 *  refusal — the first form of this term read all six REFUSALS as acceptances and flipped the row
 *  to PASS. The refusal is therefore excluded FIRST (`status !== 'refused'` and no refusal reason
 *  at the top level or in the diagnostic), and only then is the name/rows hit required. */
const genericAcceptedByName = genericRefusals.filter((k) => {
  const a = genericSecure?.[k]
  if (a === null || typeof a !== 'object' || Array.isArray(a)) return false
  if (a.status === 'refused') return false
  if (typeof a.reason === 'string' && /refus/.test(a.reason)) return false
  if (typeof a.diagnostic?.reason === 'string' && /refus/.test(a.diagnostic.reason)) return false
  return a.name === 'secure.operator.token' || (Array.isArray(a.rows) && a.rows.length > 0)
})
const anyGenericAccepted = genericAcceptedByName.length > 0
/** THE INSTRUMENT-BROKEN READING — the second half of the same remedy: an answer that is a THROW
 *  or a CDP failure is neither an acceptance nor a refusal, so the four-state mapping below sends
 *  the row to `MANUAL` rather than letting a dead probe read as a refusal (which would manufacture
 *  a compliance claim in the OTHER direction) or as an acceptance. */
const genericAnswers = genericRefusals.map((k) => genericSecure?.[k])
const genericThrewMembers = genericRefusals.filter((k, i) => genericAnswers[i] === undefined || genericAnswers[i] === null
  || (typeof genericAnswers[i] === 'object' && (Object.prototype.hasOwnProperty.call(genericAnswers[i], 'threw') || Object.prototype.hasOwnProperty.call(genericAnswers[i], '__cdpError'))))
const genericInstrumentOk = genericSecure !== null && typeof genericSecure === 'object' && genericThrewMembers.length === 0
const genericVerdict = anyGenericAccepted ? 'PASS' : !genericInstrumentOk ? 'MANUAL' : 'FAIL'
check('SC-A-02 (Family A, arm a-ii) — THE GENERIC NAME-ADDRESSED SURFACE, DRIVEN LIVE', 'REQUIREMENT ARM (a-ii): an arbitrary `secure.*` name can be written/read/committed/subscribed on the generic name-addressed surface of the live renderer graph — MEASURED: all SIX members answer the typed refusal `secure-refused`', genericVerdict,
  `NAMED TERMS: the ARM is MET iff at least one name-addressed member ACCEPTS the name with a POSITIVE HIT — a NON-REFUSING answer carrying the CALLER'S OWN NAME (${JSON.stringify('secure.operator.token')}) or the caller's rows (the §6.2 audit's B-F3: a throw or any non-refusal token may NOT count as acceptance, AND — MEASURED when this term was first written — the refusal records THEMSELVES carry the caller's name, so the refusal is excluded before the name/rows hit is required). acceptedByName=${JSON.stringify(genericAcceptedByName)}, anyGenericAccepted=${anyGenericAccepted}, per-member refused=${JSON.stringify(Object.fromEntries(genericRefusals.map((k, i) => [k, genericRefused[i]])))}; INSTRUMENT TERMS: membersAnswered=${genericRefusals.length - genericThrewMembers.length} of ${genericRefusals.length}, threw-or-cdp-failed=${JSON.stringify(genericThrewMembers)}, genericInstrumentOk=${genericInstrumentOk}${genericInstrumentOk ? '' : ' — THE INSTRUMENT IS BROKEN: a thrown/error member is neither a refusal nor an acceptance, so this row reads MANUAL rather than a compliance claim in either direction'}; the VERBATIM answers — resolve=${JSON.stringify(genericSecure?.resolve)}, set=${JSON.stringify(genericSecure?.set)}, commit=${JSON.stringify(genericSecure?.commit)}, clear=${JSON.stringify(genericSecure?.clear)}, remove=${JSON.stringify(genericSecure?.remove)}, subscribe=${JSON.stringify(genericSecure?.subscribe)}; tierHandles=${JSON.stringify(genericSecure?.tierHandles)} (the landed 3-member '{temp,mem,file}' — the tier handle 'secure' cannot exist)`,
  'store-core-graph.md §2.5 items 1/2 (the refusal and its fixed precedence `secure → malformed → undeclared → …`, decided BEFORE the register and BEFORE traversal), §2.4 item 7(b) (the write-side decision site) and §3.2 F-14. This is the landed WALL the gate-1 record calls "not a doorway" (`secure-tier-generalization-review.md` §1), and it is exactly what a Family A pass must NOT be manufactured out of: the refusal is correct AS THE ACCESS CONTROL and simultaneously the evidence that arm (a-ii) is unmet. **THE ACCEPTANCE TERM IS A POSITIVE HIT AND A BROKEN PROBE READS `MANUAL` (`B-F3`)** — the as-filed `some(v => v !== true)` counted a THROW as "the ARM is MET"')

/** CONTROL-ARBITRARY — TWO halves, so the control really is the SAME instrument for BOTH
 *  Family A arms (`A-F3`, disposed `FIXED`). Without a control, a Family A refusal could be an
 *  instrument that never fires.
 *   (a) CONTROL-BRIDGE-PATCH — THE SAME BRIDGE PATCH CHANNEL arm (a-i) drives: a
 *       tier-4-ADMISSIBLE DECLARED member (`maxJournalLength`) round-trips through
 *       `window.provident.security.set()`/`get()`, and a DISTINCT unknown member is DROPPED in
 *       the same reading. This is the half the `§6.2` audit's `A-F3` required: before it, arm
 *       (a-i) drove the bridge patch path while the only control drove the GENERIC surface on
 *       the `file` tier, so "the SAME instrument" was false for (a-i).
 *   (b) the GENERIC SURFACE on an ADMISSIBLE TIER — an ARBITRARY caller-chosen key
 *       (`complianceprobe.value`) inside a DECLARED root, seeded in tier 1's file so the boot
 *       hand-off declares/mints it (the store's declaration input is CONSTRUCTION-ONLY, dossier
 *       `O-5`; MEASURED at this HEAD: an undeclared top, `mem.probe.thing`, is refused
 *       `undeclared-name` on BOTH the write and the read, which is itself recorded in the
 *       record's §5). Its claim is now stated as "the same SHAPE of instrument on an admissible
 *       tier" and it cites SC-B-03 as the bridge-path witness for the bridge write. */
const bridgePatchControl = await cdp.evaluate(`(async function(){
  var s = window.provident.security;
  var out = {};
  try { out.before = await s.get(); } catch (e) { out.before = { threw: String(e) }; }
  try { out.writeAdmissible = await s.set({ maxJournalLength: ${JOURNAL + 1} }); } catch (e) { out.writeAdmissible = { threw: String(e) }; }
  try { out.mid = await s.get(); } catch (e) { out.mid = { threw: String(e) }; }
  try { out.restore = await s.set({ maxJournalLength: ${JOURNAL} }); } catch (e) { out.restore = { threw: String(e) }; }
  try { out.after = await s.get(); } catch (e) { out.after = { threw: String(e) }; }
  try { out.writeUnknown = await s.set({ myNewField: 'CONTROL-BRIDGE-UNKNOWN' }); } catch (e) { out.writeUnknown = { threw: String(e) }; }
  try { out.afterUnknown = await s.get(); } catch (e) { out.afterUnknown = { threw: String(e) }; }
  out.roundTripped = out.mid && out.mid.maxJournalLength === ${JOURNAL + 1} && out.after && out.after.maxJournalLength === ${JOURNAL};
  out.unknownDropped = out.afterUnknown !== null && typeof out.afterUnknown === 'object'
    && !Object.prototype.hasOwnProperty.call(out.afterUnknown, 'myNewField');
  return out;
})()`)
const controlArbitrary = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  const name = ${JSON.stringify(ARBITRARY_FILE_NAME)};
  const before = s.resolve(name);
  const w = s.set(name, 'CONTROL-ARBITRARY-DATUM');
  const r = s.resolve(name);
  return { name: name, before: before, write: w, read: r, roundTripped: r && r.found === true && r.value === 'CONTROL-ARBITRARY-DATUM' };
})()`)
const controlArbitraryHolds = controlArbitrary?.roundTripped === true
  && bridgePatchControl?.roundTripped === true && bridgePatchControl?.unknownDropped === true
check('SC-A-03 (CONTROL-ARBITRARY + CONTROL-BRIDGE-PATCH)', 'CONTROL: the SAME bridge patch channel arm (a-i) drives ACCEPTS a tier-4-ADMISSIBLE declared member (`maxJournalLength`) and round-trips it through set()/get() while DROPPING an unknown member; and the same SHAPE of instrument on an admissible tier ROUND-TRIPS an arbitrary caller-named datum — so SC-A-01/02 cannot be an instrument that never fires', controlArbitraryHolds ? 'PASS' : 'FAIL',
  `NAMED TERMS: BRIDGE-PATCH half (the SAME channel as arm (a-i)) — before=${JSON.stringify(bridgePatchControl?.before)}, set({maxJournalLength:${JOURNAL + 1}}) receipt=${JSON.stringify(bridgePatchControl?.writeAdmissible?.write)}, mid-get maxJournalLength=${JSON.stringify(bridgePatchControl?.mid?.maxJournalLength)}, restored via set({maxJournalLength:${JOURNAL}}) receipt=${JSON.stringify(bridgePatchControl?.restore?.write)}, after-get maxJournalLength=${JSON.stringify(bridgePatchControl?.after?.maxJournalLength)}, roundTripped=${JSON.stringify(bridgePatchControl?.roundTripped)}; the CONTRAST in the same reading — set({myNewField:'CONTROL-BRIDGE-UNKNOWN'}) receipt=${JSON.stringify(bridgePatchControl?.writeUnknown?.write)}, the get() after it carries myNewField=${JSON.stringify(bridgePatchControl?.afterUnknown !== null && typeof bridgePatchControl?.afterUnknown === 'object' && Object.prototype.hasOwnProperty.call(bridgePatchControl?.afterUnknown, 'myNewField'))}, unknownDropped=${JSON.stringify(bridgePatchControl?.unknownDropped)}. NAME-ADDRESSED half (the same SHAPE on an admissible tier) — controlName=${JSON.stringify(controlArbitrary?.name)}, before=${JSON.stringify(controlArbitrary?.before)}, writeStatus=${JSON.stringify(controlArbitrary?.write?.status)}, readFound=${JSON.stringify(controlArbitrary?.read?.found)}, readTier=${JSON.stringify(controlArbitrary?.read?.tier)}, readValue=${JSON.stringify(controlArbitrary?.read?.value)}, roundTripped=${JSON.stringify(controlArbitrary?.roundTripped)}`,
  'the positive control for Family A, in TWO halves: the bridge half proves arm (a-i)\'s OWN channel carries a declared tier-4 member end-to-end and distinguishes a KNOWN from an UNKNOWN member, so the unknown-member drop is the patch filter\'s policy and not a channel that never fires; the name-addressed half proves the write-and-read instrument addresses a caller-named datum at all. `file`/`mem` are the landed arbitrary-storage tiers (docs/decisions.md `SECURE-TIER-IS-A-FILESTORE-PEER` clause (4): "Agent data goes in the mem/file tiers"), so the `secure.*` refusal is the TIER\'s policy. THE BRIDGE WRITE THAT REALLY MOVES THE SECURITY FILE IS SC-B-03 (its measured sha256 transition) — cited here as the bridge-path witness the `§6.2` audit\'s `A-F3` required')

// ── FAMILY A, arm (b) — what a live write carrying an UNKNOWN key does ─────────────────
const secPathA = join(bootA.profile, SECURITY_FILE)
const secBeforeRaw = readOrNull(secPathA)
const secBeforeSha = sha256(secPathA)
const unknownWrite = await cdp.evaluate(`window.provident.security.set({ myNewField: 'COMPLIANCE-ARBITRARY-DATUM' })`)
await sleep(400)
const secAfterUnknownRaw = readOrNull(secPathA)
const secAfterUnknownSha = sha256(secPathA)
const unknownKeyInFile = secAfterUnknownRaw !== null && /myNewField/.test(secAfterUnknownRaw)
const unknownKeyInGet = unknownWrite !== null && typeof unknownWrite === 'object' && Object.prototype.hasOwnProperty.call(unknownWrite, 'myNewField')
check('SC-A-04 (Family A, arm b)', 'REQUIREMENT ARM (b): a live tier-4 write carrying a caller-named key is STORED and readable back — MEASURED: it is SILENTLY DROPPED (the receipt says `committed`, no diagnostic is answered, and the key is absent from BOTH the file BYTES and the live get())', ((!unknownKeyInFile && !unknownKeyInGet) ? 'FAIL' : 'PASS'),
  `NAMED TERMS: the ARM is MET iff the caller's key persists. unknownKeyInFile=${unknownKeyInFile}, unknownKeyInGet=${unknownKeyInGet}, receiptOfTheDroppingWrite=${JSON.stringify(unknownWrite?.write)} (a 'committed' receipt on a write that persisted NOTHING), fileBytesComparedToTheWriteBeforeIt=${secBeforeRaw === secAfterUnknownRaw ? 'BYTE-IDENTICAL' : 'DIFFER'}, fileKeysAfter=${JSON.stringify(readOrNull(secPathA) === null ? null : Object.keys(JSON.parse(readOrNull(secPathA))).sort())}, sha256 ${secBeforeSha.slice(0, 16)}… → ${secAfterUnknownSha.slice(0, 16)}…`,
  'the gate-1 record\'s §1 row: "An unknown key is a SILENT DROP — committed receipt, nothing persisted, no diagnostic" (its finding `G-2`: "The unknown-key contract is an UNDOCUMENTED silent drop"). The two named terms are read from the FILE BYTES (the persisted truth) and from the LIVE `get()` — EITHER carrying the key would be the requirement MET. Both are measured absent, so the arm is unmet; the row is written in the requirement direction so a Family A pass cannot be manufactured from a correctly-silent drop')

// ── FAMILY B, arm (a) — the persisted-file census, with CONTROL-CENSUS ────────────────
/** Bounded settle: the profile listing must be IDENTICAL on N consecutive reads no earlier
 *  than `minAgeMs` after the spawn, because Chromium writes its own bookkeeping lazily in
 *  the first seconds of a boot (the S1 driver's measured note: `Cache/` … within ~6 s,
 *  `Network Persistent State`/`Preferences` at ~8–14 s). */
async function settledListing(dir, { spawnedAt = 0, minAgeMs = 0, stableReads = 3, timeoutMs = 60000 } = {}) {
  const started = Date.now()
  let last = null
  let stable = 0
  let polls = 0
  const added = []
  while (Date.now() - started < timeoutMs) {
    polls += 1
    const now = readdirSync(dir).sort()
    if (last !== null) for (const e of now) if (!last.includes(e)) added.push(e)
    const ageMs = spawnedAt === 0 ? Infinity : Date.now() - spawnedAt
    stable = last !== null && JSON.stringify(now) === JSON.stringify(last) ? stable + 1 : 0
    last = now
    if (stable >= stableReads && ageMs >= minAgeMs) return { list: now, polls, added: [...new Set(added)], settled: true, ageMs }
    await sleep(1000)
  }
  return { list: last ?? [], polls, added: [...new Set(added)], settled: false, ageMs: spawnedAt === 0 ? null : Date.now() - spawnedAt }
}
const settledA = await settledListing(bootA.profile, { spawnedAt: bootA.spawnedAt, minAgeMs: 12000 })
const censusA = persistedCensus(settledA.list)

// CONTROL-CENSUS: seed a THIRD `.json` into the LIVE profile and re-run the predicate.
writeFileSync(join(bootA.profile, THIRD_FILE), '{"seeded":"third persisted file"}')
const settledControl = await settledListing(bootA.profile, { spawnedAt: 0, minAgeMs: 0, stableReads: 2 })
const censusControl = persistedCensus(settledControl.list)
unlinkSync(join(bootA.profile, THIRD_FILE))
const settledRestored = await settledListing(bootA.profile, { spawnedAt: 0, minAgeMs: 0, stableReads: 2 })
const censusRestored = persistedCensus(settledRestored.list)

check('SC-B-01 (Family B, arm a)', 'the settled scratch profile carries NO THIRD `.json` — the persisted set is exactly `{provident-security.json, provident-settings.json}`', censusA.ok ? 'PASS' : 'FAIL',
  `NAMED TERMS: jsonNames=${JSON.stringify(censusA.jsonNames)}, undeclaredJsonNames=${JSON.stringify(censusA.undeclaredJsonNames)}, securityPresent=${censusA.securityPresent}, settingsPresent=${censusA.settingsPresent}, settled=${settledA.settled} after ${settledA.polls} poll(s) at age ${settledA.ageMs} ms (3 identical reads, ≥12 s floor); the RUNTIME's own lazily-written entries reported: ${JSON.stringify(settledA.added)}`,
  'the EXACTLY-TWO pin (docs/specs/store-persist.md; docs/FORKER.md §4 (ii)/(iv); the `G2` DONE row) and `store-security.md` §1.2 item 2 ("a third persisted filename is a finding"). `settingsPresent` is REPORTED, not asserted — **on a profile THIS battery seeds the tier-1 file is written BEFORE the boot by `seedProfile`, so the run reads `settingsPresent=true` (`B-F17`: the as-filed reason "absent on a settled cold boot" was FALSE of these profiles and was quotable as a measurement).** On an unseeded profile the tier-1 file is created lazily at the first `file.*` crossing; either way the assertable property is the ABSENCE of a third name')
check('SC-B-02 (CONTROL-CENSUS)', 'CONTROL: with a THIRD `.json` seeded into the LIVE profile the SAME predicate REFUSES it, and after the seed is removed it passes again — so SC-B-01 is not a predicate that cannot fail', (censusControl.ok === false && censusControl.undeclaredJsonNames.length === 1 && censusRestored.ok === true) ? 'PASS' : 'FAIL',
  `NAMED TERMS: with ${THIRD_FILE} seeded — jsonNames=${JSON.stringify(censusControl.jsonNames)}, undeclaredJsonNames=${JSON.stringify(censusControl.undeclaredJsonNames)}, predicate=${censusControl.ok}; after removal — undeclaredJsonNames=${JSON.stringify(censusRestored.undeclaredJsonNames)}, predicate=${censusRestored.ok}`,
  'a live control, not a synthetic list: the wrong state is created in the very directory the row reads. A deletion of the census term reddens SC-B-01; a census that could not see a third file reddens SC-B-02')

// ── FAMILY B, arm (b) — the two files are INDEPENDENT ─────────────────────────────────
/** One real operator write through the bridge (the manual-UI channel, §2.4 item 6). */
const settingsPathA = join(bootA.profile, SETTINGS_FILE)
const settingsPresentBefore = exists(settingsPathA)
const settingsShaBefore = settingsPresentBefore ? sha256(settingsPathA) : null
const secShaBeforeWrite = sha256(secPathA)
const secBytesBeforeWrite = readOrNull(secPathA)
const operatorWrite = await cdp.evaluate(`window.provident.security.set({ token: ${JSON.stringify(TOKEN)}, maxJournalLength: ${JOURNAL + 3} })`)
await sleep(500)
const secShaAfterWrite = sha256(secPathA)
const secBytesAfterWrite = readOrNull(secPathA)
const settingsPresentAfter = exists(settingsPathA)
const settingsShaAfter = settingsPresentAfter ? sha256(settingsPathA) : null
const settingsUnchanged = settingsShaBefore === settingsShaAfter
/** `A-F4` (`FIXED`): `settingsUnchanged` would hold VACUOUSLY as `null === null` if the
 *  tier-1 file had never been created. The PRESENCE terms are therefore asserted BESIDE it, so
 *  the row cannot read PASS by measuring an absent file. MEASURED: the seed creates the tier-1
 *  file before the boot, so both terms are `true` on this profile — and if they were not, the
 *  row FAILS rather than passing vacuously. */
const settingsFileObserved = settingsPresentBefore === true && settingsPresentAfter === true
  && settingsShaBefore !== null && settingsShaAfter !== null
const securityChanged = secShaBeforeWrite !== secShaAfterWrite
check('SC-B-03 (Family B, arm b)', 'the security file REALLY moves on a live operator write, and the settings file does NOT move across the same window — the two persisted files are independent', (securityChanged && settingsFileObserved && settingsUnchanged) ? 'PASS' : 'FAIL',
  `NAMED TERMS: securitySha ${secShaBeforeWrite.slice(0, 16)}… → ${secShaAfterWrite.slice(0, 16)}… (changed=${securityChanged}), securityBytes ${secBytesBeforeWrite?.length} → ${secBytesAfterWrite?.length}, settings PRESENCE before=${settingsPresentBefore} after=${settingsPresentAfter} (settingsFileObserved=${settingsFileObserved} — the NON-VACUITY term added by A-F4), settingsSha ${settingsShaBefore === null ? 'ABSENT' : settingsShaBefore.slice(0, 16) + '…'} → ${settingsShaAfter === null ? 'ABSENT' : settingsShaAfter.slice(0, 16) + '…'} (unchanged=${settingsUnchanged}), the write's own receipt=${JSON.stringify(operatorWrite?.write)}`,
  'store-security.md §2.2 item 5 (THE SINGLE-WRITER DISCIPLINE: the security store\'s persist is the ONLY writer of `provident-security.json`; the tier-1 channel is the only writer of `provident-settings.json`) and §1.2 item 2 (ONE of the exactly-two). Both halves are asserted: a security write that moved NOTHING would mean the atomic writer never ran, and a security write that ALSO rewrote the settings file would mean the two files are not independent')

// ── FAMILY B, arm (c) — the SECURITY file's top-level key set is the tier's own ────────
const secParsed = JSON.parse(readOrNull(secPathA))
const secKeySet = Object.keys(secParsed).sort()
const undeclaredSecKeys = secKeySet.filter((k) => !DECLARED_SECURITY_KEYS.includes(k))
const forbiddenSecKeys = secKeySet.filter((k) => FORBIDDEN_SECURITY_KEYS.includes(k))
const enabledIsGroupSet = Array.isArray(secParsed.enabled) && secParsed.enabled.every((g) => GROUPS.includes(g))
/** THE SET-EQUALITY TERM (the `§6.2` audit's `B-F6`, disposed `FIXED`). The row claims *"the file's
 *  EXACT top-level key set is the tier's DECLARED members"*, and the as-filed predicate was
 *  `undeclaredSecKeys.length === 0 && forbiddenSecKeys.length === 0 && enabledIsGroupSet` — a `⊆`
 *  test: **delete `token` from the persisted file and NOTHING reddened** (no row asserted the file
 *  carries its declared members at all). The term is now equality, with the MISSING members named. */
const secKeySetEquality = setEquality(secKeySet, DECLARED_SECURITY_KEYS)
check('SC-B-04 (Family B, arm c) — THE TIER-SHAPE HALF', 'the SECURITY file\'s exact top-level key set after a live write EQUALS the tier\'s DECLARED members — every declared member PRESENT, nothing outside the set, NO `exclusion`/gate key, NO `write` receipt member and NO tier-1 `schemaVersion`', (secKeySetEquality.equal && undeclaredSecKeys.length === 0 && forbiddenSecKeys.length === 0 && enabledIsGroupSet) ? 'PASS' : 'FAIL',
  `NAMED TERMS: topLevelKeys=${JSON.stringify(secKeySet)}, declaredMembers=${JSON.stringify(DECLARED_SECURITY_KEYS)}, SET-EQUALITY missing=${JSON.stringify(secKeySetEquality.missing)} extra=${JSON.stringify(secKeySetEquality.extra)} equal=${secKeySetEquality.equal} (the §6.2 audit's B-F6 term: a DELETED declared member reddens this row, which a ⊆ test did not), undeclaredKeys=${JSON.stringify(undeclaredSecKeys)}, forbiddenChannelOrSchemaKeys=${JSON.stringify(forbiddenSecKeys)}, enabled is a group set over VALID_GROUPS=${enabledIsGroupSet} (${JSON.stringify(secParsed.enabled)}), the file's own bytes=${JSON.stringify(secBytesAfterWrite)}`,
  'THIS ROW MEASURES THE TIER-SHAPE HALF, NOT THE S1 `U-6`/`D-19` ROW: S1 measures that one security write creates no third file and no gate key on its own profile; this measures the tier\'s DECLARED MEMBER SET against the file\'s exact key set, with `exclusion` (the widened GET record\'s additive member, §2.3 item 2 / PAR-13), `write` (the SET receipt\'s additive member) and tier 1\'s reserved `schemaVersion` all named as FORBIDDEN HERE — each is a channel/schema token that belongs on the wire or in `provident-settings.json`, never in tier 4\'s file. **THE CLAIM IS "EXACT", SO THE PREDICATE IS SET-EQUALITY (§4d rule 3) — the `B-F6` repair — and this row\'s DECLARED LIMIT is stated WITH ITS OWNER: the file\'s reserved `schemaVersion` stamp (`store-persist.md`\'s `VERSION-FROM-FIRST-WRITE`) is cited by the contract read and is NOT MEASURED by any row of this battery, because every profile this battery boots is seeded with a tier-1 file already carrying `schemaVersion`. OWNER: the `G2` `U-STORE-PERSIST` contract owner**')

// ── FAMILY B, arm (d) — the atomic shape, with CONTROL-TMP and CONTROL-TORN ─────────────
/** The landed writer's SOURCE, read once here and reused at `SC-G-01`/`SC-G-02` below: `SC-B-05`
 *  reports the DECLARED atomic mechanism statically (the `§6.2` audit's `B-F9`), and the same
 *  bytes are the `[G]` census Phase 4 asserts. */
const securityStorePath = join(root, 'src', 'main', 'security-store.ts')
const securityStoreShaA = sha256(securityStorePath)
const securityStoreSrcA = readFileSync(securityStorePath, 'utf8')
const residueA = tmpResidueCensus(bootA.profile)
// CONTROL-TMP: seed a residual at the REAL path and re-run the SAME predicate.
writeFileSync(join(bootA.profile, TMP_RESIDUAL), JSON.stringify({ token: 'TORN-OR-RESIDUAL' }))
const residueControl = tmpResidueCensus(bootA.profile)
unlinkSync(join(bootA.profile, TMP_RESIDUAL))
const residueRestored = tmpResidueCensus(bootA.profile)
/** CONTROL-TORN (`A-F10`, disposed `FIXED`): the predicate's OTHER half is `realPathParses`,
 *  and before this fixture NOTHING drove it toward failure — the residual control only ever
 *  moved the `residuals` term, so "a torn file does not parse" was asserted and never
 *  falsified. The REAL path is overwritten with deliberately torn bytes (the literal
 *  `'{"token:'`), the SAME predicate is re-run, and the exact prior bytes are RESTORED and
 *  asserted byte-identical so no later row reads a file this fixture wrote. */
const secBytesBeforeTorn = readOrNull(join(bootA.profile, SECURITY_FILE))
const secShaBeforeTorn = sha256(join(bootA.profile, SECURITY_FILE))
writeFileSync(join(bootA.profile, SECURITY_FILE), '{"token:')
const residueTornControl = tmpResidueCensus(bootA.profile)
writeFileSync(join(bootA.profile, SECURITY_FILE), secBytesBeforeTorn)
const secShaAfterTornRestore = sha256(join(bootA.profile, SECURITY_FILE))
const residueTornRestored = tmpResidueCensus(bootA.profile)
const tornRestoreByteIdentical = secShaBeforeTorn === secShaAfterTornRestore
check('SC-B-05 (Family B, arm d)', 'the write leaves NO residual `${path}.tmp` at the real path and the real path always PARSES after a real write — the OBSERVABLE shape of the atomic replace on the live profile (the MECHANISM itself is witnessed statically, not by this row)', residueA.ok ? 'PASS' : 'FAIL',
  `NAMED TERMS: residuals=${JSON.stringify(residueA.residuals)}, realPathParses=${residueA.realPathParses}, realPathKeys=${JSON.stringify(residueA.realPathKeys)}, tornOrUnparsable=${residueA.tornOrUnparsable}; STATIC MECHANISM WITNESS (the §6.2 audit's B-F9 — the claim is about the DECLARED ATOMIC mechanism, and a plain non-atomic \`writeFileSync\` would satisfy BOTH live terms): security-store.ts declares mkdirSync=${/mkdirSync\(/.test(securityStoreSrcA)}, the \`\${path}.tmp\` stage=${/\$\{path\}\.tmp|\.tmp'/.test(securityStoreSrcA)}, fsync=${/fsyncSync|fsync\(/.test(securityStoreSrcA)}, renameSync=${/renameSync\(/.test(securityStoreSrcA)} (sha256 ${securityStoreShaA.slice(0, 16)}…)`,
  'store-security.md §2.2 items 1/3/6: `mkdirSync` → write `${path}.tmp` → fsync → `renameSync` → dir-fsync, and "a successful persist leaves NO `${path}.tmp`"; "a torn file at the real path is IMPOSSIBLE by construction". A torn file does not parse, so `realPathParses` is the torn-file term and it is read from the real path\'s OWN bytes — and since the §6.2 audit\'s A-F10, BOTH halves of this predicate are driven toward failure by a live control. **WHAT THIS ROW DOES NOT PROVE, STATED AT THE ROW (the second audit\'s `B-F9`): residue + parseability are CONSISTENT WITH a non-atomic overwrite, so the DECLARED five-step mechanism is witnessed by the STATIC terms beside them (the landed source\'s `mkdirSync`/`.tmp`/fsync/`renameSync`) and by the `[T]`-layer suite — NOT by any live term here. OWNER of a live mechanism witness: the `G2` `U-STORE-PERSIST` contract owner**')
check('SC-B-06 (CONTROL-TMP + CONTROL-TORN)', 'CONTROL: with a residual `.tmp` seeded at the real path the SAME predicate REFUSES it, and with deliberately TORN bytes at the real path the SAME predicate REFUSES that too — and after each is removed/restored it passes again, so neither half of SC-B-05 is a predicate that cannot fail', (residueControl.ok === false && residueControl.residuals.length === 1 && residueRestored.ok === true && residueTornControl.ok === false && residueTornControl.realPathParses === false && residueTornControl.tornOrUnparsable === true && tornRestoreByteIdentical === true && residueTornRestored.ok === true) ? 'PASS' : 'FAIL',
  `NAMED TERMS: with ${TMP_RESIDUAL} seeded — residuals=${JSON.stringify(residueControl.residuals)}, predicate=${residueControl.ok}; after removal — residuals=${JSON.stringify(residueRestored.residuals)}, predicate=${residueRestored.ok}; with TORN bytes ('{"token:') at the real path — realPathParses=${JSON.stringify(residueTornControl.realPathParses)}, tornOrUnparsable=${JSON.stringify(residueTornControl.tornOrUnparsable)}, realPathKeys=${JSON.stringify(residueTornControl.realPathKeys)}, predicate=${JSON.stringify(residueTornControl.ok)}; after the exact prior bytes were restored — sha256 byte-identical=${tornRestoreByteIdentical} (${secShaBeforeTorn.slice(0, 16)}… → ${secShaAfterTornRestore.slice(0, 16)}…), predicate=${JSON.stringify(residueTornRestored.ok)}`,
  'the wrong states are created at the very path the row reads; a `.tmp`-residue regression reddens SC-B-05\'s residue term, a torn-write regression reddens its parse term, and this control proves the reader can SEE both. The TORN fixture is the `§6.2` audit\'s A-F10 fix: a term no control drives is a term no reader can trust')

// ── FAMILY B, arm (e) — NO LOWER-TIER ALIAS ────────────────────────────────────────────
/** The `file` tier's own value at the SAME LOGICAL PATH as the refused `secure.*` attempt —
 *  the name the architect's `D-CLAUSE-2` cites verbatim. BOTH SIDES are read live: the
 *  resolved VALUE off the store AND the persisted BYTES of tier 1's file. */
const fileBefore = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  return mod.getWiredGraphStore().resolve(${JSON.stringify(FILE_LOGICAL)});
})()`)
const settingsBytesBeforeAlias = readOrNull(join(bootA.profile, SETTINGS_FILE))
const aliasAttempt = await driveGenericSurface(cdp, 'secure.settings.theme.token', 'ALIAS-ATTEMPT-VALUE')
await sleep(500)
const fileAfter = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  return mod.getWiredGraphStore().resolve(${JSON.stringify(FILE_LOGICAL)});
})()`)
const settingsBytesAfterAlias = readOrNull(join(bootA.profile, SETTINGS_FILE))
const aliasRefused = ['resolve', 'set', 'commit', 'clear', 'remove', 'subscribe'].every((k) => isSecureRefusal(aliasAttempt?.[k]))
const fileLogicalUnmoved = JSON.stringify(fileBefore) === JSON.stringify(fileAfter)
const fileBytesUnmoved = settingsBytesBeforeAlias === settingsBytesAfterAlias
check('SC-B-07 (Family B, arm e) — NO LOWER-TIER ALIAS', 'a live `secure.*` attempt at the SAME LOGICAL PATH as a `file` value answers the typed refusal on all six members, and the `file` tier\'s own value at that path is unmoved on BOTH sides (the resolved value AND tier 1\'s persisted bytes)', (aliasRefused && fileLogicalUnmoved && fileBytesUnmoved) ? 'PASS' : 'FAIL',
  `NAMED TERMS: attempts on 'secure.settings.theme.token' — allSixRefused=${aliasRefused} (resolve=${JSON.stringify(aliasAttempt?.resolve)}, set=${JSON.stringify(aliasAttempt?.set)}, commit=${JSON.stringify(aliasAttempt?.commit)}, clear=${JSON.stringify(aliasAttempt?.clear)}, remove=${JSON.stringify(aliasAttempt?.remove)}, subscribe=${JSON.stringify(aliasAttempt?.subscribe)}); the file tier's own value at ${FILE_LOGICAL}: before=${JSON.stringify(fileBefore)}, after=${JSON.stringify(fileAfter)}, valueUnmoved=${fileLogicalUnmoved}; tier 1's persisted bytes unmoved=${fileBytesUnmoved} (${settingsBytesBeforeAlias?.length} chars, ${settingsBytesBeforeAlias === null ? 'ABSENT' : sha256Text(settingsBytesBeforeAlias).slice(0, 16) + '…'})`,
  'the architect\'s `D-CLAUSE-2` (docs/decisions.md `SECURE-TIER-IS-A-FILESTORE-PEER` clause (2)): "the destructive reading is EXPLICITLY REFUSED … `commit(\'secure.settings.theme.token\', v)` must never clear `file.settings.theme.token`". Three named terms are asserted TOGETHER: the typed refusal on every member, the non-movement of the resolved file value, and the non-movement of the file\'s BYTES — a pass that saw the refusal but a moved value or moved bytes would have exactly the defect the ruling forbids')

/** CONTROL-FILE-TIER — the `file` tier IS writable live, so SC-B-07's "unmoved" terms are
 *  not vacuous. The write goes through the SAME live name-addressed surface at the file
 *  tier's own logical path, and the seeded value is RESTORED afterwards so no later row
 *  reads a value this control wrote. */
const fileTierControl = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  const before = s.resolve(${JSON.stringify(FILE_LOGICAL)});
  const w = s.set(${JSON.stringify(FILE_LOGICAL)}, 'CONTROL-FILE-TIER-VALUE');
  const after = s.resolve(${JSON.stringify(FILE_LOGICAL)});
  const restoreTo = before && before.found === true ? before.value : 'dark-seeded';
  const restore = s.set(${JSON.stringify(FILE_LOGICAL)}, restoreTo);
  return { before: before, write: w, after: after, restoreWrite: restore, restored: s.resolve(${JSON.stringify(FILE_LOGICAL)}), moved: JSON.stringify(before) !== JSON.stringify(after) };
})()`)
check('SC-B-08 (CONTROL-FILE-TIER)', 'CONTROL: the `file` tier\'s own value at that same logical path DOES move when written live through the same surface — so SC-B-07\'s "unmoved" terms can register a change and are not vacuous', fileTierControl?.moved === true ? 'PASS' : 'FAIL',
  `NAMED TERMS: before=${JSON.stringify(fileTierControl?.before)}, writeStatus=${JSON.stringify(fileTierControl?.write?.status)}, after=${JSON.stringify(fileTierControl?.after)}, moved=${fileTierControl?.moved}, restoreReceipt=${JSON.stringify(fileTierControl?.restoreWrite?.status)}, restoredValue=${JSON.stringify(fileTierControl?.restored?.value)}`,
  'the positive control for the non-destruction half: if the live surface could not move this value at all, "unchanged after the `secure.*` attempt" would be unfalsifiable. The control RESTORES the seeded value so no later row reads a value this control wrote')

// ── FAMILY C, arm (b) — the RENDERER-side `secure.*` refusals ──────────────────────────
const rendererRefusals = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  const out = {};
  out.read = s.resolve('secure.operator.token');
  out.subscribe = s.subscribe('secure.*', function(){});
  out.undeclaredSecure = s.resolve('secure.undeclared');
  out.commit = s.commit('secure.x', 1);
  return out;
})()`)
const readRefused = isSecureRefusal(rendererRefusals?.read)
const subscribeRefused = isSecureRefusal(rendererRefusals?.subscribe)
const undeclaredRefused = isSecureRefusal(rendererRefusals?.undeclaredSecure)
/** `A-F2` (disposed `FIXED`): the driver COMPUTED this term, PRINTED it, and left it OUT of the
 *  verdict — so a write-side refusal-site regression returned a HIT (or any non-refusal) and the
 *  row still read PASS. It is now a term of the predicate, because the matrix's `U-5` falsifier
 *  and the report's assertion both name the `commit` path explicitly. */
const commitRefused = isSecureRefusal(rendererRefusals?.commit)
/** THE POSITIVE CONTROL for the refusal PRECEDENCE (store-core-graph.md §3.2 F-14: "the
 *  positive control is that the SAME names without the `secure` segment answer
 *  `'undeclared-name'`"). MEASURED at this HEAD and recorded because a first draft of this
 *  battery had it WRONG: a TIER-FREE dotted name (`operator.token`) is `malformed-name` at
 *  `A-PARSE` — the grammar needs a TIER token first — so the control must keep the tier and
 *  swap only the TIER-4 first segment, which is what the F-14 clause means by "the same names
 *  without the `secure` segment". */
const precedenceControl = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  return {
    undeclaredPlain: s.resolve('mem.undeclaredroot.x'),
    undeclaredFile: s.resolve('file.undeclaredroot.x'),
    tierFreeMalformed: s.resolve('operator.token'),
    malformed: s.resolve('secure')
  };
})()`)
const plainIsUndeclared = precedenceControl?.undeclaredPlain?.status === 'refused' && precedenceControl?.undeclaredPlain?.reason === 'undeclared-name'
  && precedenceControl?.undeclaredFile?.reason === 'undeclared-name'
/** THE PRECEDENCE CONTROL IS NOW A TERM (the `§6.2` audit's `B-F5`, disposed `FIXED`). The
 *  as-filed predicate was `readRefused && subscribeRefused && undeclaredRefused && commitRefused`,
 *  while `plainIsUndeclared` was computed, printed and **never used** — and the row's `§2`/`§3`
 *  cells, `§4b`'s `A-F15`, `§6` and `docs/next-steps.md` all counted it as the SIXTH asserted
 *  control (*"a store that … answered `undeclared-name` … would fail this row"* was FALSE). It is
 *  a term in BOTH directions: the control must HOLD for the row to PASS, and — rule 4/5 of the
 *  record's `§4d` table — the row FAILS if the control itself cannot refuse. A control that could
 *  not be READ (a throw / a CDP failure) reads `MANUAL`. */
const precedenceControlThrew = precedenceControl?.undeclaredPlain === undefined || precedenceControl?.undeclaredFile === undefined
  || (typeof precedenceControl?.undeclaredPlain === 'object' && precedenceControl.undeclaredPlain !== null
    && (Object.prototype.hasOwnProperty.call(precedenceControl.undeclaredPlain, 'threw') || Object.prototype.hasOwnProperty.call(precedenceControl.undeclaredPlain, '__cdpError')))
const precedenceControlHolds = plainIsUndeclared === true
const refusalTermsHold = readRefused && subscribeRefused && undeclaredRefused && commitRefused
const scC01Verdict = precedenceControlThrew ? 'MANUAL' : !precedenceControlHolds ? 'FAIL' : (refusalTermsHold ? 'PASS' : 'FAIL')
check('SC-C-01 (Family C, arm b) — THE RENDERER-SIDE REFUSALS', 'a renderer `read(\'secure.*\')`, a `subscribe(\'secure.*\')` and a `commit(\'secure.*\')` each answer the declared typed refusal — the FIRST forbidden read of `data-ownership-model-plan.md` §3.8, measured live', scC01Verdict,
  `NAMED TERMS (each one a predicate term): ${JSON.stringify({ readRefused, subscribeRefused, undeclaredSecureRefused: undeclaredRefused, commitRefused, plainIsUndeclared })} — the FIFTH term \`plainIsUndeclared\` is the PRECEDENCE CONTROL, IN the predicate since the §6.2 audit's B-F5 (it was computed, printed and unused, while five record cells counted it as the sixth asserted control); the control MUST hold: precedenceControlHolds=${precedenceControlHolds}, precedenceControlThrew=${precedenceControlThrew}${precedenceControlThrew ? ' — THE CONTROL COULD NOT BE READ, so this row is MANUAL rather than a PASS on an unproven falsifier' : ''}. resolve('secure.operator.token')=${JSON.stringify(rendererRefusals?.read)}, subscribe('secure.*')=${JSON.stringify(rendererRefusals?.subscribe)}, resolve('secure.undeclared')=${JSON.stringify(rendererRefusals?.undeclaredSecure)}, commit('secure.x',1)=${JSON.stringify(rendererRefusals?.commit)}; CONTROL of the precedence — resolve('mem.undeclaredroot.x')=${JSON.stringify(precedenceControl?.undeclaredPlain)}, resolve('file.undeclaredroot.x')=${JSON.stringify(precedenceControl?.undeclaredFile)} (both expected 'undeclared-name' — the SAME names without the secure segment), resolve('operator.token')=${JSON.stringify(precedenceControl?.tierFreeMalformed)} (a tier-free dotted name is malformed at A-PARSE, which is why it is NOT the control), resolve('secure') alone=${JSON.stringify(precedenceControl?.malformed)}`,
  'the dossier\'s A-4 ("a read/subscribe/remove/clear/set/commit on a `secure.*` name answering a TYPED REFUSAL with reason:\'secure-refused\', while the tier\'s OWN get on the same name answers") and §3.8\'s forbidden read (1)/(2). The precedence control makes the refusal FALSIFIABLE as a first-step decision: **a store that reached the traversal and answered `undeclared-name`/`no-such-anchor` for these names would fail this row — and since the second audit\'s `B-F5` that sentence describes the PREDICATE and not only the prose, because the control is a term; the sixth-control inventory is therefore TRUE as written**')

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 2 — FAMILY C, arm (a): the MCP surface's census and THE FOUR-CARRIER SCAN
// ══════════════════════════════════════════════════════════════════════════════════════
const toolListRaw = await bootA.client.listTools()
const toolNames = toolListRaw.tools.map((t) => String(t.name)).sort()
const toolDescriptors = toolListRaw.tools.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))
const resourceListRaw = await bootA.client.listResources()
const resourceDescriptors = resourceListRaw.resources
const resourceUris = resourceDescriptors.map((r) => String(r.uri)).sort()
const toolNamesAdvertised = toolNames
/** `A-F11` (disposed `FIXED`): the row printed the 22 names but pinned no SET, so a swap of a
 *  landed tool for a tier-4-exposing one would have passed. The landed names are read FROM
 *  SOURCE in the SAME run (`ProvidentMcpServer.ALL_TOOLS`, the ONE place registration and the
 *  gate agree — `mcp-server.ts`'s own comment) and compared set-wise with the live listing. The
 *  live listing is group-gated, so the comparison is only a set-equality when the boot's enabled
 *  group set is the full five — which this driver's seed guarantees, and which is printed with
 *  the terms so a reader can see the precondition rather than assume it. */
const mcpServerPath = join(root, 'src', 'main', 'mcp-server.ts')
const mcpServerSha = sha256(mcpServerPath)
const mcpServerSrc = readFileSync(mcpServerPath, 'utf8')
const allToolsBlock = (mcpServerSrc.match(/ALL_TOOLS: string\[\] = \[([\s\S]*?)\]/) ?? [, ''])[1]
const landedToolNames = [...allToolsBlock.matchAll(/'([^']+)'/g)].map((m) => m[1]).sort()
const toolSetIsLanded = landedToolNames.length > 0 && JSON.stringify(toolNames) === JSON.stringify(landedToolNames)
check('SC-C-02 (Family C, arm a-i)', 'the live stdio surface\'s `tools/list` and `resources/list` censuses carry NO tier-4 material in their descriptors, and the live tool SET is EXACTLY the landed `ALL_TOOLS` (not an agent-reachable tier-4 API)', (scanCarrier('tools/list', toolDescriptors).hits.length === 0 && scanCarrier('resources/list', resourceDescriptors).hits.length === 0 && toolSetIsLanded) ? 'PASS' : 'FAIL',
  `NAMED TERMS: enabled groups seeded=${JSON.stringify(GROUPS)} (the live listing is group-gated, so set-equality is asserted under the full five); ${toolNames.length} live tool(s)=${JSON.stringify(toolNames)}; ${landedToolNames.length} landed ALL_TOOLS name(s) read from src/main/mcp-server.ts in THIS run=${JSON.stringify(landedToolNames)} (sha256 ${mcpServerSha.slice(0, 16)}…); toolSetIsLanded=${toolSetIsLanded} (the SET-EQUALITY term added by the §6.2 audit's A-F11 — a swap of a landed tool for a tier-4-exposing one reddens this row); ${resourceDescriptors.length} resource(s)=${JSON.stringify(resourceUris)}; scan(tools/list descriptors)=${JSON.stringify(scanCarrier('tools/list', toolDescriptors))}; scan(resources/list descriptors)=${JSON.stringify(scanCarrier('resources/list', resourceDescriptors))}`,
  'mcp-endpoint.md §6.4 ("the settings surface is manual-UI-only by construction: the IPC channel is main→renderer→main, the MCP tool handlers never route to it") and store-security.md §2.6 (the four carriers census). The descriptor bodies are serialized WHOLE — name, description and inputSchema — so a tier-4 token smuggled into a schema description would be caught. THE SET-EQUALITY HALF is the §6.2 audit\'s A-F11 fix: the landed `ALL_TOOLS` is the registry the gate registers from, so a live set that differs from it is either an unregistered tool (a registration regression) or an agent-reachable tool the gate never declared')

/** THE CARRIERS, AS ACTUALLY AVAILABLE on this live surface. Everything a reader can get is
 *  fetched and scanned; the notification carrier is captured by the handler registered at
 *  connect time. Each carrier carries its OWN `ownArgs` list — the strings THIS battery
 *  supplied as tool arguments — so a needle span that lies inside one of them is classified
 *  as an ECHO of our own input rather than as a leak (see `scanCarrier`). */
const CARRIERS = []
const record = (id, body, ownArgs = []) => CARRIERS.push(scanCarrier(id, body, ownArgs))
record('tools/list:descriptors', toolDescriptors)
record('resources/list:descriptors', resourceDescriptors)
const PROBE_SECURE_PATH = 'secure.operator.token'
const calls = [
  ['provident.get_rendered_html', {}],
  ['provident.get_markdown', {}],
  ['provident.list_targets', {}],
  ['provident.get_node_state', { target: 'inc' }],
  ['provident.code.get', { path: PROBE_SECURE_PATH }],
  ['provident.code.validate', {}],
  ['provident.focus', {}],
  ['provident.dispatch', { target: 'inc', event: 'click' }],
]
for (const [name, args] of calls) {
  const r = await rawCall(bootA.client, name, args)
  const ownArgs = Object.values(args).filter((v) => typeof v === 'string')
  record(`tool-result:${name}`, { ok: r.ok, isError: r.isError === true, text: scannable(r.text ?? r.error) }, ownArgs)
}
for (const uri of resourceUris) {
  try {
    const rr = await bootA.client.readResource({ uri })
    record(`resource-body:${uri}`, rr)
  } catch (e) {
    record(`resource-body:${uri}`, { error: String(e) })
  }
}
await sleep(2000)
/** THE FIRST NOTIFICATION SNAPSHOT — everything the app's stdio server pushed while the eight
 *  `tools/call`s and the two resource reads ran. `A-F8` (disposed `FIXED`) is the reason this
 *  is a SNAPSHOT and not the whole carrier: the snapshot is taken BEFORE the Family C phase's
 *  two `setExclusion` transitions and the post-return reads, so the payloads those turns push
 *  were never scanned while the matrix and the record claimed "every … notification payload the
 *  running MCP surface offers". The SECOND snapshot below closes that window. */
const firstNotificationSnapshotCount = bootA.notifications.length
for (const [i, n] of bootA.notifications.entries()) record(`notification:${i}:${n.method}`, n)

// ── FAMILY C, arm (c) — the exclusion gate's TWO ARMS, re-measured on BOTH transports ─
/** The channel-driven transition (`secure-exclusion.md` §2.4 item 6: "the pane control …
 *  or the channel directly"). S1 OWNS the pane-control GESTURE row; this row measures the
 *  gate's ARMS and the tier-4 readings BESIDE them, which S1 does not. **THIS PHASE RUNS
 *  BEFORE THE CARRIER VERDICTS** (`A-F8`): the transitions it drives push notifications of
 *  their own, and a carrier scan that closed before them would be narrower than its wording. */
const baselineMcp = await rawCall(bootA.client, 'provident.get_markdown', {})
const enterDisable = await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)
await sleep(700)
const inForceMcp = await rawCall(bootA.client, 'provident.get_markdown', {})
const inForceTier4 = await cdp.evaluate('window.provident.security.get()')
const inForceCarrier = scanCarrier('in-force:tool-result', scannable(inForceMcp.text ?? inForceMcp.error))
const inForceReadsRefused = await cdp.evaluate(`(async function(){
  const mod = await import(new URL('./renderer.js', document.baseURI).href);
  const s = mod.getWiredGraphStore();
  return { read: s.resolve('secure.operator.token') };
})()`)
const returnGate = await cdp.evaluate(`window.provident.security.setExclusion('mcp-enabled')`)
await sleep(700)
const afterReturnMcp = await rawCall(bootA.client, 'provident.get_markdown', {})
const afterReturnTier4 = await cdp.evaluate('window.provident.security.get()')

/** THE SECOND NOTIFICATION SNAPSHOT (`A-F8`) — every payload pushed during and after the two
 *  exclusion transitions and the post-return call. These are folded into the SAME `carrierHits`
 *  predicate as every other carrier, so the "every notification payload the running MCP surface
 *  offers" claim is measured over the WHOLE run's notification stream rather than its first 2 s. */
await sleep(2000)
const postPhaseNotificationCount = bootA.notifications.length - firstNotificationSnapshotCount
for (const [i, n] of bootA.notifications.entries()) {
  if (i < firstNotificationSnapshotCount) continue
  record(`notification-post-phase:${i}:${n.method}`, n)
}
const carrierHits = CARRIERS.filter((c) => c.hits.length > 0)
const echoCarriers = CARRIERS.filter((c) => c.echoHits.length > 0)
/** THE CARRIER NON-VACUITY TERMS (the `§6.2` audit's `B-F7`, disposed `FIXED`). The as-filed
 *  predicate was `carrierHits.length === 0` alone: **an EMPTY live graph — empty tool results,
 *  empty resource bodies — leaves `carrierHits = []` and PASSED**, so a surface that offered
 *  nothing to scan read as a clean surface. Two terms are added BESIDE the zero-hits term: the
 *  carriers exist at all (`CARRIERS.length`), and the carriers CARRY CONTENT (`totalCarrierBytes`
 *  > 0, with the per-class byte totals PRINTED). `CONTROL-CARRIER` proves the SCANNER fires; these
 *  prove the LIVE CARRIERS carry something for it to fire on. */
const carrierClassBytes = {}
for (const c of CARRIERS) {
  const cls = c.carrierId.startsWith('notification') ? 'notification' : c.carrierId.startsWith('tool-result') ? 'tool-result'
    : c.carrierId.startsWith('resource-body') ? 'resource-body' : `descriptor:${c.carrierId.split(':')[0]}`
  carrierClassBytes[cls] = (carrierClassBytes[cls] ?? 0) + c.bytes
}
const totalCarrierBytes = Object.values(carrierClassBytes).reduce((a, b) => a + b, 0)
const carrierClassesPresent = Object.keys(carrierClassBytes).length
const carrierVacuity = CARRIERS.length === 0 || totalCarrierBytes === 0
const scC03Verdict = (carrierHits.length === 0 && !carrierVacuity) ? 'PASS' : 'FAIL'
const notificationMethods = bootA.notifications.map((n) => n.method)
const notificationCensus = [...new Set(notificationMethods)].sort()
  .map((m) => `${m}×${notificationMethods.filter((x) => x === m).length}`)
const postPhaseNotificationCensus = (() => {
  const m = bootA.notifications.slice(firstNotificationSnapshotCount).map((n) => n.method)
  return [...new Set(m)].sort().map((x) => `${x}×${m.filter((y) => y === x).length}`)
})()
check('SC-C-03 (Family C, arm a-ii) — THE FOUR CARRIERS', 'NO carrier available on the live MCP surface carries ANY tier-4 material (the token value, the `maxJournalLength` value, the enabled group set, a `secure.` name spelling, or the `exclusion` member) — AND the carriers observed CARRY CONTENT', scC03Verdict,
  `NAMED TERMS (each a predicate term): scannedCarriers=${CARRIERS.length} (INCLUDING ${postPhaseNotificationCount} POST-PHASE notification payload(s) — the §6.2 audit's A-F8 widening), totalCarrierBytes=${totalCarrierBytes} over ${carrierClassesPresent} carrier class(es) = ${JSON.stringify(carrierClassBytes)} — **the NON-VACUITY terms of the second audit's B-F7: an EMPTY live graph (empty tool results / resource bodies) would otherwise leave carrierHits=[] and PASS**; carrierVacuity=${carrierVacuity} (true iff no carrier carried any byte, which FAILS the row); needles=${JSON.stringify(NEEDLES.map((n) => n.id))}; carriersWithUnexplainedHits=${JSON.stringify(carrierHits.map((c) => ({ carrier: c.carrierId, hits: c.hits, spans: c.firstHitSpans })))}; carriers whose only needle spans lie INSIDE an argument THIS BATTERY supplied=${JSON.stringify(echoCarriers.map((c) => ({ carrier: c.carrierId, echoHits: c.echoHits })))}; notification carrier received ${bootA.notifications.length} payload(s) over the WHOLE run = ${JSON.stringify(notificationCensus)} (first snapshot at the 8 tools/call + 2 resource reads: ${firstNotificationSnapshotCount} payload(s); post-phase snapshot at the two setExclusion transitions + the post-return call: ${postPhaseNotificationCount} payload(s) = ${JSON.stringify(postPhaseNotificationCensus)}); carrier ids = ${JSON.stringify(CARRIERS.map((c) => c.carrierId))}`,
  'data-ownership-model-plan.md §3.8\'s THIRD forbidden read and its own instruction ("Each is a row, and each is a finding if present"): a tier-4 value inside a graph node, a tool result, a resource, or a notification payload. The scan is over the ACTUAL payload bodies — the graph node carrier is reached through `get_rendered_html`/`get_markdown`/`list_targets`/`get_node_state` and the `mcp://provident/app` + `mcp://provident/targets` resource bodies, which ARE the app graph\'s rendered and addressable content. THE NOTIFICATION CARRIER IS NOW THE WHOLE RUN\'S STREAM, taken in TWO snapshots straddling the Family C phase (`A-F8`); before that fix the wording said "every … notification payload the running MCP surface offers" while the measurement stopped at the first snapshot. The ONE echo at this HEAD is `provident.code.get` quoting back the path THIS BATTERY passed as its argument; it is classified SEPARATELY and the classification is match-scoped, so it can only excuse a span this battery literally supplied. CONTROL-CARRIER below asserts the scanner fires, and its SECOND control asserts the echo exclusion cannot swallow a span outside an own-argument')
const carrierControlPayload = {
  token: TOKEN,
  enabled: GROUPS,
  maxJournalLength: JOURNAL,
  name: 'secure.operator.token',
  exclusion: 'mcp-disabled',
}
const carrierControl = scanCarrier('control:synthetic-tier4-payload', carrierControlPayload)
/** The SECOND control: the SAME own-argument exclusion, against a payload carrying the token
 *  (never supplied as an argument) and a DIFFERENT `secure.*` name than the one this battery
 *  passed. Both must remain UNEXPLAINED — if the exclusion were a blanket amnesty keyed on
 *  the carrier rather than on the SPAN, they would be swallowed and this control reddens. */
const carrierEchoControlPayload = { token: TOKEN, name: 'secure.operator.OTHER' }
const carrierEchoControl = scanCarrier('control:echo-scope', carrierEchoControlPayload, [PROBE_SECURE_PATH])
/** THE NEEDLE COUNT IS A PINNED LITERAL (the `§6.2` audit's `B-F8`, disposed `FIXED`). The
 *  as-filed first half was `carrierControl.hits.length === NEEDLES.length` — **SELF-REFERENTIAL**:
 *  `NEEDLES` is the very array the scanner loops over, so **deleting 3 of the 5 needles left the
 *  comparison satisfied** (only N1/N4 were caught anyway, through the echo control's own literal
 *  `2`), and the claim *"a deleted needle reddens the first half"* was false for them. The literal
 *  `5` is now the expectation, asserted beside `NEEDLES.length` so the two can disagree visibly. */
const CARRIER_CONTROL_NEEDLE_COUNT = 5
const scC04Verdict = (carrierControl.hits.length === CARRIER_CONTROL_NEEDLE_COUNT && NEEDLES.length === CARRIER_CONTROL_NEEDLE_COUNT
  && carrierEchoControl.hits.length === 2 && carrierEchoControl.echoHits.length === 0) ? 'PASS' : 'FAIL'
check('SC-C-04 (CONTROL-CARRIER)', 'CONTROL: the SAME scanner HITS all FIVE needles on a synthetic payload carrying tier-4 material, AND the own-argument echo exclusion does NOT swallow the token value or a `secure.` name this battery never supplied — so SC-C-03 cannot be a scanner that never fires or one that excuses every hit', scC04Verdict,
  `NAMED TERMS: controlHits=${JSON.stringify(carrierControl.hits)} of ${CARRIER_CONTROL_NEEDLE_COUNT} needles PINNED AS A LITERAL (NEEDLES.length=${NEEDLES.length} — the B-F8 term: the as-filed comparison was against NEEDLES.length itself, so deleting 3 of the 5 needles survived; a deleted needle now reddens the first half because the literal does not move) (controlBytes=${carrierControl.bytes}); ECHO-SCOPE control — ownArgs=${JSON.stringify([PROBE_SECURE_PATH])}, payload=${JSON.stringify(carrierEchoControlPayload)}, unexplainedHits=${JSON.stringify(carrierEchoControl.hits)}, echoHits=${JSON.stringify(carrierEchoControl.echoHits)} (both expected UNEXPLAINED: the token was never an argument, and 'secure.operator.OTHER' is not the name this battery passed)`,
  'the scan\'s own falsifiability, in two directions: a deleted needle or a needle spelled against the wrong seed reddens the first half — **and it does so through a PINNED literal, not through the scanner\'s own array length (`B-F8`)** — and an exclusion that excused hits by CARRIER rather than by SPAN reddens the second. A scan that could not fail — or one that could not fail on a real leak — is not a row, which is why both controls are asserted rather than described')

// ── FAMILY C, arm (c) — THE VERDICT (its measurements were taken ABOVE, before the carrier
//    scan, so the post-phase notification payloads are inside the carrier predicate) ────────
const refusalReceipt = (() => {
  try { return JSON.parse(inForceMcp.text) } catch { return null }
})()
const inForceIsDeclaredReceipt = refusalReceipt !== null && refusalReceipt.status === 'refused' && refusalReceipt.reason === 'exclusion-closed' && typeof refusalReceipt.message === 'string' && refusalReceipt.message.trim() !== ''
const baselineOk = baselineMcp.ok && !baselineMcp.isError
const afterReturnOk = afterReturnMcp.ok && !afterReturnMcp.isError
const tier4ReadableInBothStates = inForceTier4?.token === TOKEN && afterReturnTier4?.token === TOKEN
  && inForceTier4?.exclusion === 'mcp-disabled' && afterReturnTier4?.exclusion === 'mcp-enabled'
/** `A-F8` (disposed `FIXED`), second half: `inForceCarrier` was computed and PRINTED but was not
 *  a TERM of this row's verdict, so an in-force answer that leaked a needle would have left the
 *  row green. It is now in the predicate. */
const inForceCarrierClean = inForceCarrier.hits.length === 0
check('SC-C-05 (Family C, arm c) — THE EXCLUSION GATE, BOTH ARMS', 'with the gate IN FORCE the MCP arm answers the declared refusal receipt while the tier-4 bridge still answers the operator\'s own record, and AFTER the return THE MCP ARM IS RE-MEASURED rather than assumed', (inForceIsDeclaredReceipt && inForceCarrierClean && baselineOk && afterReturnOk && tier4ReadableInBothStates) ? 'PASS' : 'FAIL',
  `NAMED TERMS: baseline (mcp-enabled) get_markdown ok=${baselineOk}; setExclusion('mcp-disabled') → ${JSON.stringify(enterDisable)}; IN FORCE — the MCP arm answered ${JSON.stringify(scannable(inForceMcp.text).slice(0, 220))}, isDeclaredReceipt=${inForceIsDeclaredReceipt} (status/reason/message all named), and the tier-4 bridge answered ${JSON.stringify(inForceTier4)}; carrier scan of the in-force answer=${JSON.stringify(inForceCarrier)}, inForceCarrierClean=${inForceCarrierClean} (the TERM added by the §6.2 audit's A-F8 — it was printed but not asserted); the renderer's read of a secure.* name while in force=${JSON.stringify(inForceReadsRefused?.read)}; setExclusion('mcp-enabled') → ${JSON.stringify(returnGate)}; AFTER RETURN — get_markdown ok=${afterReturnOk}, tier-4 bridge ${JSON.stringify(afterReturnTier4)}. **TWO DECLARED LIMITS, STATED AT THE ROW (the §6.2 audit's B-F16; they stood only in §5 before): (1) THE "LEGAL PAIRS" HERE ARE READ AS THE STATE TOKEN (exclusion = mcp-disabled / mcp-enabled) PLUS THE MCP ARM — the PAIR OBJECT {mcpEnabled, tier4Open} the contract declares (docs/specs/secure-exclusion.md §2.1 item 2 / PAR-1) is read by NO LIVE ROW OF EITHER BATTERY, at any layer; (2) U-6's real_input.flag:true rests on a CHANNEL transition (window.provident.security.setExclusion), NOT on the operator's pane gesture, which is S1's row — the [U]-layer content this row DOES carry is the in-force receipt, the tier-4 read beside it and the RE-MEASURED return**`,
  'docs/decisions.md `THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` clauses (1)-(3): the legal pairs are `{MCP-ENABLED, TIER-4-CLOSED}` / `{MCP-DISABLED, TIER-4-OPEN}`, enforcement is at the INVOCATION TURN across BOTH transports, and the gate supplies STATE while the store keeps the `secure.*` DECISION. BOTH arms are asserted on the SAME boot, and the return arm is MEASURED (a real call after the transition) rather than inferred — an unre-measured return would leave the second legal pair unverified. **THE TWO LIMITS ABOVE ARE AT THE ROW, NOT ONLY IN `§5` (the second audit\'s `B-F16`): the pair OBJECT is unread by any live row of either battery, and the transition here is the CHANNEL\'s rather than the operator\'s gesture (a `[U]`-shaped claim the row does NOT make). THE HTTP TRANSPORT IS `S1`\'s row and is not measured here either**')

// ── FAMILY B, arm (a) — RE-MEASURED AFTER THE WHOLE PHASE (`A-F12`, disposed `FIXED`) ───
/** `SC-B-01`'s exactly-two-file reading is taken BEFORE the operator write, the TMP control, the
 *  TORN control, the file-tier control and the Family C phase, so on its own it is a PRE-WRITE
 *  reading. This row re-runs the SAME settled listing and the SAME persisted-census predicate
 *  AFTER `SC-C-05` and asserts it a SECOND time, so the exactly-two claim describes the profile
 *  the run actually left behind and not only the cold boot's. */
const settledPost = await settledListing(bootA.profile, { spawnedAt: 0, minAgeMs: 0, stableReads: 2 })
const censusPost = persistedCensus(settledPost.list)
const residuePost = tmpResidueCensus(bootA.profile)
/** **THE SECURITY FILE'S KEY SET IS RE-MEASURED HERE TOO — the THIRD `§6.2` audit's `A3-06`,
 *  disposed `FIXED` (LOW).** `SC-B-04`'s *"no `exclusion`/`write` key in the file"* term was read
 *  **ONCE**, before both `setExclusion` transitions and before the store-bridge probes, so **an
 *  `exclusion` key landing in the file during the gate transitions reddened NOTHING** — the very
 *  class (`exclusion` riding the GET RESPONSE rather than the file) the row exists for. The SAME
 *  `setEquality` predicate is therefore re-run here, on the profile the run actually left behind,
 *  and it is a TERM of this row's verdict beside the census and residue terms. */
const secParsedPost = JSON.parse(readOrNull(secPathA))
const secKeySetPost = Object.keys(secParsedPost).sort()
const secKeySetEqualityPost = setEquality(secKeySetPost, DECLARED_SECURITY_KEYS)
const forbiddenSecKeysPost = secKeySetPost.filter((k) => FORBIDDEN_SECURITY_KEYS.includes(k))
const secShapePostHolds = secKeySetEqualityPost.equal && forbiddenSecKeysPost.length === 0
const censusPostHolds = censusPost.ok === true && residuePost.residuals.length === 0 && secShapePostHolds
check('SC-B-09 (Family B, arm a) — THE CENSUS AND THE TIER KEY SET RE-MEASURED AFTER THE FAMILY C PHASE', 'the SAME exactly-two-`.json` predicate (no third name, the security file present), the SAME no-`.tmp` term AND the SAME tier-shape key set (`SC-B-04`\'s set-equality, no `exclusion`/`write`/`schemaVersion` key) STILL hold after the operator write, both live controls and both exclusion transitions — the pre-write readings are not the only readings', censusPostHolds ? 'PASS' : 'FAIL',
  `NAMED TERMS: post-phase settled listing=${JSON.stringify(settledPost.list.filter((n) => n.endsWith('.json') || n.endsWith('.tmp')))}, settled=${settledPost.settled} after ${settledPost.polls} poll(s); jsonNames=${JSON.stringify(censusPost.jsonNames)}, undeclaredJsonNames=${JSON.stringify(censusPost.undeclaredJsonNames)}, securityPresent=${censusPost.securityPresent}, settingsPresent=${censusPost.settingsPresent}, predicate=${censusPost.ok}; residual .tmp entries after the whole phase=${JSON.stringify(residuePost.residuals)}; **THE TIER-SHAPE RE-MEASUREMENT (the A3-06 term): topLevelKeys AFTER the whole phase=${JSON.stringify(secKeySetPost)} vs declaredMembers=${JSON.stringify(DECLARED_SECURITY_KEYS)} (SET-EQUALITY missing=${JSON.stringify(secKeySetEqualityPost.missing)} extra=${JSON.stringify(secKeySetEqualityPost.extra)} equal=${secKeySetEqualityPost.equal}), forbiddenChannelOrSchemaKeys=${JSON.stringify(forbiddenSecKeysPost)}, secShapePostHolds=${secShapePostHolds} — an 'exclusion' key landing during either setExclusion transition reddens THIS row, which the as-filed bytes could not do (the key set was read once, before both transitions)**; the PRE-WRITE readings this re-asserts are SC-B-01's (jsonNames=${JSON.stringify(censusA.jsonNames)}, predicate=${censusA.ok}) and SC-B-04's (topLevelKeys=${JSON.stringify(secKeySet)}, equal=${secKeySetEquality.equal}, forbidden=${JSON.stringify(forbiddenSecKeys)}); the PRE-phase file's OWN bytes=${JSON.stringify(secBytesAfterWrite)}`,
  'the EXACTLY-TWO pin re-read at the END of the run rather than only at its start (docs/specs/store-persist.md; `store-security.md` §1.2 item 2; `docs/FORKER.md` §4 (ii)/(iv)). This row adds no new property: it makes `SC-B-01`\'s claim non-vacuous AFTER every live write and transition this battery itself performed, which is the §6.2 audit\'s A-F12 remedy — a phase that ends with a third file or a leftover `.tmp` would otherwise have been unmeasured. **AND SINCE THE THIRD AUDIT\'S `A3-06` THE SAME RE-MEASUREMENT COVERS `SC-B-04`\'s TIER-SHAPE CLAIM: the key set was read ONCE before both `setExclusion` transitions, so an `exclusion` key landing there reddened nothing; the set-equality predicate is now re-run on the END-of-run profile and is a term of this row.**')

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 3 — BOOT B: the seeded third-party arbitrary key, BEFORE the boot
// ══════════════════════════════════════════════════════════════════════════════════════
await teardown(bootA)
cdp.close()

const SEEDED_FOREIGN = { thirdPartyBlob: { arbitrary: 'SEEDED-THIRD-PARTY-DATUM' }, extra: 'SEEDED-EXTRA' }
const bootB = await bootApp('B', { seedExtra: SEEDED_FOREIGN, extraArgs: ['--mcp-transport=stdio', '--remote-debugging-port=0'] })
const portB = await devtoolsPort(bootB)
const cdpB = await Cdp.attach(portB)
registerCleanup(() => cdpB.close())
const bootBFirst = await firstRead(bootB.client, 'provident.get_markdown', {})
await sleep(500)
const secBPath = join(bootB.profile, SECURITY_FILE)
const afterBootBytes = readOrNull(secBPath)
const afterBootParsed = JSON.parse(afterBootBytes)
const keyInFileAfterBoot = Object.prototype.hasOwnProperty.call(afterBootParsed, 'thirdPartyBlob')
const liveGetB = await cdpB.evaluate('window.provident.security.get()')
const keyInLiveGetAfterBoot = liveGetB !== null && typeof liveGetB === 'object'
  && (Object.prototype.hasOwnProperty.call(liveGetB, 'thirdPartyBlob') || Object.prototype.hasOwnProperty.call(liveGetB, 'extra'))
const writeB = await cdpB.evaluate(`window.provident.security.set({ maxJournalLength: ${JOURNAL} })`)
await sleep(400)
const afterWriteParsed = JSON.parse(readOrNull(secBPath))
const keyInFileAfterWrite = Object.prototype.hasOwnProperty.call(afterWriteParsed, 'thirdPartyBlob')
/** `A-F7` (disposed `FIXED`): without a POSITIVE precondition, a THROWN `get()` (the CDP error
 *  shape `{__cdpError}` or `undefined`) makes `keyInLiveGetAfterBoot` false and the row read FAIL
 *  for a broken instrument — i.e. the row could not separate "the store dropped the seed" from "I
 *  never read". The identity check `SC-CH-01` uses on boot A is therefore applied HERE, and if it
 *  does not hold, the absence terms below are given NO weight and the row is reported as an
 *  INSTRUMENT-BROKEN reading (its FAIL is then a statement about the probe, not about the store). */
const liveGetIdentityOk = liveGetB !== null && typeof liveGetB === 'object' && liveGetB.token === TOKEN
const bootBInstrumentOk = bootBFirst.ok && !bootBFirst.isError && liveGetIdentityOk
/** `B-F4` (disposed `FIXED`) — **A FAILED PRECONDITION NOW READS `MANUAL`, NOT `PASS`.** The
 *  as-filed verdict was `(bootBInstrumentOk && !keyInLiveGetAfterBoot && keyInFileAfterWrite ===
 *  false) ? 'FAIL' : 'PASS'`, i.e. a FAIL **iff** the instrument was healthy: **a thrown live
 *  `get()` or an unanswered boot produced `PASS`** — and the code comment above, `§4b`'s `A-F7`
 *  disposition and the record's `§4` all claimed the row reports "an INSTRUMENT-BROKEN reading".
 *  It did not. The four-state mapping is explicit here: a broken instrument is `MANUAL` **with its
 *  reason** (never `PASS`, and never a silent `FAIL` — a FAIL would charge the store for the
 *  probe's own death), and the requirement reading is taken only when the precondition holds. */
const absenceTermsHold = !keyInLiveGetAfterBoot && keyInFileAfterWrite === false
const scA05Verdict = !bootBInstrumentOk ? 'MANUAL' : (absenceTermsHold ? 'FAIL' : 'PASS')
check('SC-A-05 (Family A, arm c)', 'REQUIREMENT ARM (c): a profile whose security file carries THIRD-PARTY arbitrary keys survives a real boot INTO THE LIVE STORE — MEASURED: the live store NEVER reports them and the FIRST live write DISCARDS them from the file', scA05Verdict,
  `NAMED TERMS: the ARM is MET iff the seeded keys are readable through the live store after the boot. POSITIVE PRECONDITION (added by the §6.2 audit's A-F7): the live get() answers the seeded token (liveGetIdentityOk=${liveGetIdentityOk}, token=${JSON.stringify(liveGetB?.token)}) and the boot's MCP surface answered (bootBFirst.ok=${bootBFirst.ok}, isError=${bootBFirst.isError === true}) → bootBInstrumentOk=${bootBInstrumentOk}${bootBInstrumentOk ? '' : ' — THE INSTRUMENT IS BROKEN: the absence terms below carry NO weight and this row is reported as MANUAL, NOT as a PASS and NOT as a FAIL (the §6.2 audit\'s B-F4: the as-filed predicate read PASS on a failed precondition)'}; seeded keys=${JSON.stringify(Object.keys(SEEDED_FOREIGN))}; keyInFileAfterBoot=${keyInFileAfterBoot} (a boot read does not rewrite the file, so the BYTES still carry them — keys after boot=${JSON.stringify(Object.keys(afterBootParsed).sort())}), keyInLiveGetAfterBoot=${keyInLiveGetAfterBoot} (live get()=${JSON.stringify(liveGetB)}), firstWriteReceipt=${JSON.stringify(writeB?.write)}, keyInFileAfterWrite=${keyInFileAfterWrite} (keys after write=${JSON.stringify(Object.keys(afterWriteParsed).sort())})`,
  'the gate-1 record\'s §1 row: "`sanitize()` reconstructs the same closed shape on load, so an unknown key already in the file is DISCARDED and gone at the next write" — and the landed boot read does not itself rewrite the file, so the seed SURVIVES in the BYTES until the first write. Both halves are measured, which is why the file is read BEFORE the boot: the seed must exist before the boot ingestion, or the row would measure a write rather than an ingestion. Written in the requirement direction, so "the silent discard works as designed" cannot be read as a Family A pass. ITS PRECONDITION IS NOW ASSERTED (A-F7): the identity read must answer the seeded token before the absence terms are given weight, so a THROWN read can no longer masquerade as "the store dropped it" — **and a failed precondition reports `MANUAL` with its reason (`B-F4`), so the row can no longer read `PASS` on a broken instrument**')

// ── FAMILY A, arm (a-iii) — THE TIER-1 FILE-STORE BRIDGE NAMESPACE (`A-F1`) ────────────
/** THE ARM THE §6.2 AUDIT'S `A-F1` FOUND MISSING, AND THE REASON IT BLOCKED A GREEN GATE 6.
 *  `src/main/preload.ts` exposes a THIRD page-reachable namespace — `provident.store.put(row)` /
 *  `provident.store.get()` — wired through `STORE_FILE_PUT` into `src/main/main.ts`'s own handler.
 *  That handler is a live, page-reachable, NAME-ADDRESSED WRITE PATH whose own comment declares
 *  that "the `mem.*`/`temp.*`/`secure.*` keys NEVER land in the file". A regression letting a
 *  `secure.*` key through it would land tier-4 material in `provident-settings.json` (the
 *  lower-tier alias `D-CLAUSE-2` forbids, and a Family C leak) and EVERY ROW OF THIS BATTERY
 *  WOULD STILL HAVE READ PASS, because the first draft never probed it.
 *
 *  THIS ROW IS A **CHANNEL-CENSUS** ROW, NOT ONE OF FAMILY A'S FOUR REQUIREMENT ARMS — its
 *  verdict is PASS iff the census's claim ("no live channel accepts an arbitrary tier-4 NAME")
 *  holds, and a FAIL here would be a REAL LEAK (a live defect, filed in `docs/defects.md`), never
 *  a requirement-direction reading. Family A's verdict is derived from its four REQUIREMENT arms
 *  (`SC-A-01/02/04/05`) and never from this row.
 *
 *  THREE probes, in ONE boot, each with its OWN before/after byte reading **AND ITS OWN `get()`
 *  reading**, PLUS a PRE-PROBE `get()` baseline — the `§6.2` audit's `B-F1` (`FIXED`), whose count
 *  the THIRD audit's `A3-03` (`FIXED`) reconciled: the as-filed row asserted the leak term over
 *  `settingsBytesB3` ALONE while its evidence claimed *"no `secure.`-keyed member appears in tier
 *  1's bytes at ANY of the four readings"*, and probe (iii) **REPLACES THE WHOLE FILE** (the very
 *  behaviour filed as `STORE-BRIDGE-EMPTY-PROJECTION-COMMITS`), so **a leak landing at (i) or at
 *  the strict alias probe (ii) was ERASED before B3 and before the single live `get()` — a
 *  regression re-introducing the `secure.*` lower-tier alias still read PASS.** ALL FOUR byte
 *  readings and ALL FOUR live `get()` readings — the pre-probe baseline `B0` plus one after each
 *  probe — are now terms of the predicate; **the `A3-03` remedy taken here is the second of the two
 *  the audit offered: the count is made true by ADDING the pre-probe reading, because a pre-probe
 *  `get()` is a reading the row did not previously take and it strengthens the window rather than
 *  correcting five cells downward.** */
const settingsPathB = join(bootB.profile, SETTINGS_FILE)
const settingsBytesB0 = readOrNull(settingsPathB)
const secShaBBefore = sha256(secBPath)
const storeGet = async (label) => {
  const raw = await cdpB.evaluate(`(async function(){
    try { return await window.provident.store.get(); } catch (e) { return { threw: String(e) }; }
  })()`)
  return { label, raw, rows: Array.isArray(raw) ? raw : [] }
}
/** THE PRE-PROBE READING (`A3-03`): the live store bridge's OWN rows BEFORE any put this row issues
 *  — so "no `secure.`-named row at ANY reading" covers a state the probes did not create. */
const getB0 = await storeGet('B0 (before any probe)')
const putSecureName = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'secure.complianceprobe', value: JSON.stringify({ 'secure.complianceprobe': 'TIER4-LEAK-PROBE-DATUM' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB1 = readOrNull(settingsPathB)
const getB1 = await storeGet('after (i)')
const putFileLookingName = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'file.settings.complianceprobe', value: JSON.stringify({ 'file.settings.complianceprobe': 'T1-ROW', 'secure.settings.theme.token': 'TIER4-ALIAS-PROBE' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB2 = readOrNull(settingsPathB)
const getB2 = await storeGet('after (ii)')
const putNameHonour = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'file.settings.namedprobe', value: JSON.stringify({ 'file.settings.theme.token': 'NAMED-PROBE-VALUE' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB3 = readOrNull(settingsPathB)
const getB3 = await storeGet('after (iii)')
const liveRowsB = getB3.raw
const secShaBAfter = sha256(secBPath)
const storeBridgeRows = getB3.rows
const storeBridgeReadable = Array.isArray(liveRowsB)
/** THE LEAK TERMS, OVER **EVERY** READING (`B-F1`). Each of the four byte readings and each of
 *  the four `get()` readings is its own term; the composite is an `any`, so a leak at ANY probe
 *  reddens the row even if a later probe's whole-file replace erased it from the final bytes. */
const SETTINGS_READINGS = [
  { label: 'B0 (before any probe)', bytes: settingsBytesB0 },
  { label: 'B1 (after (i))', bytes: settingsBytesB1 },
  { label: 'B2 (after (ii))', bytes: settingsBytesB2 },
  { label: 'B3 (after (iii))', bytes: settingsBytesB3 },
]
const secureKeyInSettingsBytesPerReading = SETTINGS_READINGS.map((r) => ({ label: r.label, present: r.bytes !== null && /"secure\./.test(r.bytes) }))
const secureKeyInSettingsBytes = secureKeyInSettingsBytesPerReading.some((r) => r.present)
const GET_READINGS = [getB0, getB1, getB2, getB3]
const storeBridgeGetReadable = GET_READINGS.every((g) => Array.isArray(g.raw))
const secureNameInStoreGetPerReading = GET_READINGS.map((g) => ({ label: g.label, present: g.rows.some((r) => typeof r?.name === 'string' && r.name.startsWith('secure.')) }))
const secureNameInStoreGet = secureNameInStoreGetPerReading.some((r) => r.present)
/** THE NAME-PARAMETER DISCRIMINATOR — and, since `B-F2`, also the row's **NON-VACUITY TERM**:
 *  a dead or refusing `store.put` moves no bytes and lands no name, so without this term the leak
 *  predicate holds VACUOUSLY (nothing moved, therefore nothing leaked) and the row read PASS. One
 *  of these two must be TRUE: the landed row is keyed by the caller's `name`, OR by the VALUE's
 *  own spelling. */
const nameHonoured = storeBridgeRows.some((r) => r?.name === 'file.settings.namedprobe')
const valueKeyLanded = (() => {
  const row = storeBridgeRows.find((r) => r?.name === 'file.settings.theme.token')
  return row !== undefined && row?.value === 'NAMED-PROBE-VALUE'
})()
const settingsB0Present = settingsBytesB0 !== null && /"file\.settings\./.test(settingsBytesB0)
const securityFileUnmovedByStoreBridge = secShaBBefore === secShaBAfter
const storeBridgeNoLeak = storeBridgeReadable && storeBridgeGetReadable && !secureKeyInSettingsBytes && !secureNameInStoreGet
  && securityFileUnmovedByStoreBridge && (nameHonoured || valueKeyLanded)
/** **THE PUT-RECEIPT PRECONDITION — the THIRD `§6.2` audit's `A3-04`, disposed `FIXED` (MED).**
 *  The `B-F2` remedy made `(nameHonoured || valueKeyLanded)` a TERM of `storeBridgeNoLeak`, which
 *  closed the "a dead put moves nothing, so nothing leaked" vacuity — **but it mapped the outcome
 *  to `FAIL`**: with a dead or refusing `store.put` all three probes land nothing, the non-vacuity
 *  term is false, and the row read **`FAIL` — A BROKEN WRITE INSTRUMENT CHARGED AS A LEAK**, against
 *  `§4d` rule 2 (*"a broken instrument reads `MANUAL`, never `PASS`, never an accidental `FAIL`"*).
 *  The distinction the row needs is: a put that **ANSWERED A COMMITTED RECEIPT and still landed
 *  nothing** is a LEAK-PREDICATE reading (the filter dropped it — the row's FAIL direction); a put
 *  that **THREW, or answered no receipt at all** is a DEAD INSTRUMENT (the row has no reading at
 *  all). Both probes are now NAMED TERMS: `putReceiptsOk` requires each of the three probes to have
 *  answered an object carrying a string `status`, and the INSTRUMENT-BROKEN state (a failed receipt
 *  OR the `B-F1` read preconditions) reads `MANUAL` — so a dead write instrument can no longer be
 *  charged as a leak, and the leak reading is taken only over RECEIPTED writes. */
const putReceiptStatuses = [putSecureName, putFileLookingName, putNameHonour]
  .map((r, i) => ({ label: ['(i)', '(ii)', '(iii)'][i], status: r !== null && typeof r === 'object' && !Array.isArray(r) && typeof r.status === 'string' ? r.status : null, raw: r?.threw ?? r }))
const putReceiptStatusesNotCommitted = putReceiptStatuses.filter((r) => r.status !== 'committed')
const putReceiptsOk = putReceiptStatusesNotCommitted.length === 0
/** THE FOUR-STATE MAPPING (rules 1/2/5 of the record's `§4d` per-row table, applied): a real leak
 *  is a FAIL whatever the instrument's health; an instrument that could not READ (no settings file
 *  to census at B0, a `get()` that did not answer an array at every probe, **or a put probe that
 *  answered no `committed` receipt — the `A3-04` term**) reads `MANUAL`; otherwise the census's own
 *  claim decides. */
const storeBridgeLeakTermsBreached = secureKeyInSettingsBytes || secureNameInStoreGet
const scA06InstrumentOk = settingsB0Present && storeBridgeGetReadable && putReceiptsOk
const scA06Verdict = storeBridgeLeakTermsBreached ? 'FAIL' : (!scA06InstrumentOk ? 'MANUAL' : (storeBridgeNoLeak ? 'PASS' : 'FAIL'))
const scA06TermNames = [
  `storeBridgeReadable=${storeBridgeReadable}`, `storeBridgeGetReadable=${storeBridgeGetReadable}`,
  `noSecureKeyInAnySettingsReading=${!secureKeyInSettingsBytes}`, `noSecureNameInAnyStoreGetReading=${!secureNameInStoreGet}`,
  `securityFileUnmovedByStoreBridge=${securityFileUnmovedByStoreBridge}`, `nameHonoured||valueKeyLanded=${nameHonoured || valueKeyLanded}`,
  `settingsB0Present=${settingsB0Present}`, `putReceiptsOk=${putReceiptsOk}`,
].join(', ')
const scA06NameTerm = nameHonoured
  ? 'MEASURED, the name parameter IS honoured: the landed row is keyed by the NAME the caller passed'
  : 'MEASURED, the name parameter is INERT: the landed row is keyed by the VALUE\'s own spelling (file.settings.theme.token), i.e. the main-side handler projects the crossing\'s translation by the value\'s keys and never reads row.name'
check('SC-A-06 (Family A, arm a-iii — CHANNEL CENSUS) — THE TIER-1 FILE-STORE BRIDGE NAMESPACE', 'CHANNEL-CENSUS ARM: the third page-reachable bridge namespace (`provident.store.put/get`) accepts NO arbitrary tier-4 NAME — a `secure.`-keyed name and a `secure.`-keyed value member both fail to land in `provident-settings.json`\'s bytes or in the live `get()`, and the tier-4 file is untouched by this channel', scA06Verdict,
  `NAMED TERMS (the predicate in full — rules 1 and 3 of §4d): ${scA06TermNames} => storeBridgeNoLeak=${storeBridgeNoLeak}. live store.get() ANSWERED AT EVERY READING (the B-F1 widening, its count reconciled by A3-03): PRE-PROBE baseline (B0) rows=${JSON.stringify(getB0.rows)}; after (i) rows=${JSON.stringify(getB1.rows)}, after (ii) rows=${JSON.stringify(getB2.rows)}, after (iii) rows=${JSON.stringify(getB3.rows)} (the final reading, ${storeBridgeReadable ? storeBridgeRows.length : JSON.stringify(liveRowsB)} row(s)); settings bytes BEFORE the probe=${JSON.stringify(settingsBytesB0)}; after (i) put with a secure.-keyed NAME and a secure.-keyed VALUE member: receipt=${JSON.stringify(putSecureName)} => ${JSON.stringify(settingsBytesB1)}; after (ii) put with a file.-looking NAME carrying a secure.-keyed VALUE member: receipt=${JSON.stringify(putFileLookingName)} => ${JSON.stringify(settingsBytesB2)}; after (iii) put with the NAME file.settings.namedprobe and the VALUE key file.settings.theme.token: receipt=${JSON.stringify(putNameHonour)} => ${JSON.stringify(settingsBytesB3)}. THE PUT-RECEIPT PRECONDITION (the A3-04 term, so a DEAD write instrument reads MANUAL rather than being charged as a LEAK — §4d rule 2): putReceiptStatuses=${JSON.stringify(putReceiptStatuses.map((r) => ({ label: r.label, status: r.status })))}, putReceiptStatusesNotCommitted=${JSON.stringify(putReceiptStatusesNotCommitted.map((r) => r.label))}, putReceiptsOk=${putReceiptsOk}, scA06InstrumentOk=${scA06InstrumentOk}, putReceiptsWithAnEmptyProjectionButACommittedReceipt=${JSON.stringify(putReceiptStatuses.filter((r) => r.status === 'committed' && (nameHonoured || valueKeyLanded)).map((r) => r.label))} (a committed receipt on a probe that landed nothing IS the leak-predicate reading — the filter dropped it; a THROWN or receipt-less probe is the instrument state). LEAK TERMS, EACH READING ITS OWN TERM: secureKeyInSettingsBytesPerReading=${JSON.stringify(secureKeyInSettingsBytesPerReading)}, secureKeyInSettingsBytes=${secureKeyInSettingsBytes} (no secure.-keyed member appears in tier 1's bytes at ANY of the four readings — the as-filed claim, now true of its predicate instead of only of its prose); secureNameInStoreGetPerReading=${JSON.stringify(secureNameInStoreGetPerReading)}, secureNameInStoreGet=${secureNameInStoreGet} (no row ANY of the four live get() readings reports is secure.-named); securityFileUnmovedByStoreBridge=${securityFileUnmovedByStoreBridge} (the tier-4 file's sha256 ${secShaBBefore.slice(0, 16)} ... ${secShaBAfter.slice(0, 16)}: this channel cannot reach tier 4's file). THE NAME-PARAMETER DISCRIMINATOR (iii): nameHonoured=${nameHonoured}, valueKeyLanded=${valueKeyLanded} - ${scA06NameTerm}. **NOTHING LANDED IS ALSO A NON-VACUITY QUESTION (B-F2): this row's own positive evidence is that the channel MOVES bytes and lands a name at all, so \`nameHonoured || valueKeyLanded\` is a TERM — a dead or refusing put() moves nothing and no longer reads PASS**`,
  'the §6.2 audit\'s `A-F1` (HIGH, gate-6-blocking): the driver censused `window.provident.security` and the generic store surface, then asserted "NO live channel accepts an arbitrary tier-4 name" — while `src/main/preload.ts:61-65,123-129` exposes `provident.store.put(row)`/`get()`, wired through `STORE_FILE_PUT` to `src/main/main.ts:315-336`, whose own comment declares "the `mem.*`/`temp.*`/`secure.*` keys NEVER land in the file". THIS ROW IS THAT CLAIM, DRIVEN. `docs/decisions.md` `SECURE-TIER-IS-A-FILESTORE-PEER` clause (2) (`D-CLAUSE-2`) forbids a lower-tier alias, and `data-ownership-model-plan.md` §3.8 forbids a tier-4 value reaching a nonsecure reader — a `secure.`-keyed member landing in tier 1\'s file would violate BOTH and would be a Family C leak. MEASURED at this HEAD: it does not land, and the channel cannot move the tier-4 file. A FAIL here is a NEW HIGH live defect and must be filed, not explained. **ITS INSTRUMENT WINDOW IS NOW WHOLE (the SECOND audit\'s `B-F1`/`B-F2`): every byte reading AND every `get()` reading is a predicate term, and the name/value discriminator is the row\'s non-vacuity term. **AND ITS INSTRUMENT STATE IS NOW SEPARATED FROM ITS LEAK READING (the THIRD audit\'s `A3-04`): the non-vacuity term\'s failure used to read `FAIL`, i.e. a dead/refusing `store.put` was charged as a LEAK — against `§4d` rule 2 — so the three put receipts are now a NAMED PRECONDITION (`putReceiptsOk`) and a broken write instrument reads `MANUAL`. A receipted write that lands nothing is STILL the leak-predicate reading (`FAIL`), which is the direction this row exists for.**')

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 4 — [G] the static readings this battery's rows lean on
// ══════════════════════════════════════════════════════════════════════════════════════
const storeModulePath = join(root, 'src', 'renderer', 'store-core-graph.ts')
const storeModuleSha = sha256(storeModulePath)
const securityStoreSha = securityStoreShaA
const securityStoreSrc = securityStoreSrcA
/** The landed `set()`'s accepted patch member NAMES, read from the module's own type
 *  declaration — the census that makes SC-A-01's read-back claim auditable against the
 *  source rather than against the live answer alone. */
const patchMembers = [...(securityStoreSrc.match(/set\(patch: \{([^}]*)\}/) ?? [, ''])[1].matchAll(/(\w+)\??:/g)].map((m) => m[1]).sort()
const sanitizeKeys = [...(securityStoreSrc.match(/return \{ token:[^}]*\}/) ?? [''])[0].matchAll(/(\w+):/g)].map((m) => m[1]).sort()
check('SC-G-01 (static census)', 'the landed tier-4 store\'s own API carries NO name-parameterised member and its `set()` admits exactly four patch member names — the source-side reading of SC-A-01', (patchMembers.length === 4 && !/set\(name|resolve\(|commit\(|subscribe\(/.test(securityStoreSrc)) ? 'PASS' : 'FAIL',
  `NAMED TERMS: set() patch members=${JSON.stringify(patchMembers)}, the reconstructed shape's members=${JSON.stringify(sanitizeKeys)}, a name-addressed member (set(name…/resolve/commit/subscribe) present=${/set\(name|resolve\(|commit\(|subscribe\(/.test(securityStoreSrc)}; security-store.ts sha256=${securityStoreSha.slice(0, 16)}…`,
  'the gate-1 record\'s §1 evidence rows (`security-store.ts:25-33` the API; `:121-141` the four patch members) re-read at this HEAD. This is the SOURCE half of Family A\'s arm (a); the live half is SC-A-01/02, and the two must agree — a disagreement is a doc/spec drift')

const secureGateSites = ['src/renderer/store-core-graph.ts'].flatMap((p) => {
  const src = readFileSync(join(root, p), 'utf8')
  return [...src.matchAll(/secure-refused/g)].map((_, i) => `${p}:secure-refused#${i + 1}`)
})
const storeModuleSrc = readFileSync(storeModulePath, 'utf8')
/** `B-F18` (disposed `FIXED`): the as-filed census ran `matchAll(/secure-refused/g)` over the
 *  WHOLE FILE TEXT — **comments included** — so a comment-only census of ≥5 occurrences PASSed.
 *  The count is now taken over CODE ONLY (`codeOnly`), with the raw count printed beside it so the
 *  number of prose occurrences is visible rather than silently counted. */
const secureGateSitesInCode = countInCode(storeModuleSrc, 'secure-refused')
check('SC-G-02 (static census)', 'the store module\'s `secure.*` refusal sites are present IN CODE in the landed bytes (the five sites the dossier\'s A-1 OUT row names)', secureGateSitesInCode.code >= 5 ? 'PASS' : 'FAIL',
  `NAMED TERMS: secure-refused occurrences in src/renderer/store-core-graph.ts = ${secureGateSites.length} RAW (${JSON.stringify(secureGateSites)}) vs ${secureGateSitesInCode.code} IN CODE of ${secureGateSitesInCode.raw} enumerated (the B-F18 fix: the raw count includes occurrences inside COMMENTS, so a comment-only census could satisfy the ≥5 floor; the code-only count is what this row's predicate reads), sha256=${storeModuleSha.slice(0, 16)}…`,
  'the dossier\'s A-1 OUT row names five sites (:478-479 construction, :922-923 read walk, :1417 write parse, :2277 subscribe, :766 rootParts) — this census reads the TOKEN, not the line numbers (ledger line anchors drift), and since the §6.2 audit\'s `B-F18` it reads the token **in code**: comments and string bodies are stripped before the count, and the raw count is printed beside it so the two can be compared')

// ══════════════════════════════════════════════════════════════════════════════════════
// THE VERDICT SUMMARY (printed WITH its terms)
// ══════════════════════════════════════════════════════════════════════════════════════
/** **WHERE THIS CHECK RUNS, AND WHY IT IS NOT IN `beforeExit` (MEASURED, NOT ASSUMED):** the first
 *  form of this row was registered on `beforeExit` — the only event that fires after the main
 *  script and still allows a reading — and **the process never reached it**: this run keeps LIVE
 *  HANDLES open (the CDP `WebSocket`, the child's stderr stream), so the loop never drains and
 *  `beforeExit` never fires; the run HUNG and was killed at its timeout. (The as-filed driver
 *  ended with an unconditional `process.exit(...)`, which is why the hazard had never been met.)
 *  The check therefore runs SYNCHRONOUSLY at the end of the main script: the ONE drain, then the
 *  post-drain filesystem re-read, **recorded as part of the run's own rows and output** — which
 *  is what makes the cleanup a reading rather than an out-of-band host count (`B-F10`). */
drainCleanups()
{
  const leftovers = []
  for (let attempt = 0; attempt < 6; attempt += 1) {
    leftovers.length = 0
    for (const p of PROFILES) if (exists(p)) leftovers.push(p)
    if (leftovers.length === 0 || attempt === 5) break
    settleSync(500)
  }
  const removalsFailed = REMOVALS.filter((r) => r.gone !== true).map((r) => r.dir)
  const profilesSeen = [...new Set(PROFILES)].length
  const cleanFail = CHECKS.filter((c) => c.verdict === 'FAIL').length
  /** THE ROW'S OWN PRECONDITIONS ARE TERMS: `profilesSeen > 0` (the run really created profiles —
   *  a cleanup claim about nothing would be vacuous) and `REMOVALS.length > 0` (the sweep really
   *  ran, so a `0 leftovers` reading is not the absence of a cleanup). */
  const cleanOk = profilesSeen > 0 && REMOVALS.length > 0 && leftovers.length === 0 && removalsFailed.length === 0
  check('SC-CLEAN-01 (cleanup — end of run)', 'every scratch profile this run created is GONE from the filesystem after the cleanup drain — the cleanup is MEASURED per run rather than counted out of band', cleanOk ? 'PASS' : 'FAIL',
    `NAMED TERMS: profilesCreatedByThisRun=${profilesSeen} ${JSON.stringify([...new Set(PROFILES)])}, removeWithVerifySweeps=${REMOVALS.length}, leftoversAfterDrain=${leftovers.length} ${JSON.stringify(leftovers)}, removeWithVerifyFailures=${JSON.stringify(removalsFailed)}, FAIL rows carried from the battery=${cleanFail}`,
    'the §6.2 audit\'s B-F10: an unasserted cleanup claim is the SELF-FOUND-1-class residual. The row reads the FILESYSTEM (statSync per directory) AFTER the cleanup drain, so a leak is visible in THIS run\'s own output; a leak here is an INSTRUMENT/host-state finding and does not touch any store predicate')
  console.log(`  ✶ ${cleanOk ? 'PASS' : 'FAIL'} SC-CLEAN-01 cleanup (recorded AFTER the drain, so it is part of THIS run's row count): ${profilesSeen} profile(s) created, ${leftovers.length} leftover(s) after the drain, ${removalsFailed.length} sweep failure(s) of ${REMOVALS.length}`)
  process.exitCode = CHECKS.some((c) => c.verdict === 'FAIL') ? 1 : 0
  // THE EXIT IS FORCED HERE so the drain above is the ONLY one (the `exit` hook then finds an
  // empty registry) and the cleanup row is COUNTED in every run, FAIL rows included.
}

const TALLY = {}
for (const c of CHECKS) TALLY[c.verdict] = (TALLY[c.verdict] ?? 0) + 1
console.log('\n' + '='.repeat(88))
console.log(`LIVE COMPLIANCE BATTERY RESULT: ${CHECKS.length} recorded rows = ` +
  Object.entries(TALLY).map(([k, v]) => `${v} ${k}`).join(' / ') +
  ` (${Object.values(TALLY).reduce((a, b) => a + b, 0)} over the ${CHECKS.length} rows)`)
console.log(`  HEAD ${execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()} · the terms are the rows themselves; every verdict was produced by the instruments named in its own row`)
for (const c of CHECKS.filter((x) => x.verdict === 'FAIL')) console.log(`  ✗ FAIL ${c.id}: ${c.subject}`)
if (TALLY.FAIL === undefined) console.log('  no row contradicted the clause it cites')
console.log('\n  FAMILY TALLIES (the family each row belongs to is in its id):')
for (const fam of ['A', 'B', 'C']) {
  const rows = CHECKS.filter((c) => new RegExp(`SC-${fam}-`).test(c.id))
  if (rows.length === 0) continue
  const t = {}
  for (const r of rows) t[r.verdict] = (t[r.verdict] ?? 0) + 1
  /** `B-F14` (disposed `FIXED`): the as-filed line printed *"B = COMPLIANT (9/9)"* and
   *  *"C = COMPLIANT (5/5)"* WITHOUT their terms — those totals silently included 3 B-controls and
   *  1 C-control, while only Family A printed its arm/control/census split. Every family now prints
   *  its own breakdown, so a family verdict cannot be read off a number that hides a control. */
  const controls = rows.filter((c) => c.id.includes('CONTROL'))
  const censuses = rows.filter((c) => /CHANNEL.CENSUS|RE-MEASUREMENT|static census|preflight|live channel/i.test(`${c.id} ${c.subject}`))
  const arms = rows.filter((c) => !controls.includes(c) && !censuses.includes(c))
  const fmt = (set) => `${set.length} (${set.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')})`
  console.log(`    FAMILY ${fam}: ${rows.length} row(s) = ${Object.entries(t).map(([k, v]) => `${v} ${k}`).join(' / ')}` +
    ` — ARMS ${fmt(arms)} · CONTROLS ${fmt(controls)} · CENSUS/MEASUREMENT ${fmt(censuses)}`)
}
/** THE FAMILY-VERDICT TERMS, PRINTED SO THE RECORD'S THREE VERDICTS ARE RE-DERIVED FROM THE
 *  RUN RATHER THAN RE-ASSERTED. Family A's verdict rests on its FOUR REQUIREMENT ARMS only —
 *  `SC-A-06` is a CHANNEL-CENSUS row (a `secure.`-keyed name that landed in tier 1's bytes would
 *  be a LEAK, not a requirement arm) and `SC-A-03` is a CONTROL, so neither may carry the family
 *  verdict in either direction. Families B and C are read as their arms' verdicts, and if a
 *  repaired predicate FAILS the family verdict moves with it. `A-F15`'s counting rule is printed
 *  BESIDE the row count so the record and the driver cannot disagree about how many controls
 *  exist.
 *
 *  **THE `MANUAL` TERM — the THIRD `§6.2` audit's `A3-05`, disposed `FIXED` (MED, latent: `0
 *  MANUAL` this run).** Every family line counted ONLY `FAIL` (B/C printed *"the FAIL row count
 *  under COMPLIANT iff every … row PASSes"*, and Family A's arm line printed `FAIL / PASS`), so
 *  **a `MANUAL` arm — reachable at `SC-A-01/02/05/06` and `SC-C-01` through the very precondition
 *  terms the second audit required — vanished from the totals**: `1 PASS / 3 FAIL / 1 MANUAL` and
 *  `4 FAIL / 0 PASS` printed the SAME string. Each family's `PASS`/`FAIL`/`MANUAL`/`PARKED` split
 *  is now printed WITH ITS TERMS, and **a `MANUAL` arm is a WITHHELD claim**: it is named as such
 *  per family rather than being silently absorbed into a FAIL count. (Note the two directions
 *  honestly: a `MANUAL` arm cannot manufacture a `COMPLIANT` verdict, and it is not counted as a
 *  FAIL either — the family verdict is a claim about the arms that COULD be read.) */
const familyRows = (fam) => CHECKS.filter((c) => new RegExp(`^SC-${fam}-`).test(c.id))
const verdictSplit = (set) => ['PASS', 'FAIL', 'MANUAL', 'PARKED'].map((v) => `${set.filter((c) => c.verdict === v).length} ${v}`).join(' / ')
const familyARows = familyRows('A')
const familyAChannelCensus = familyARows.filter((c) => /CHANNEL.CENSUS/i.test(`${c.id} ${c.subject}`))
const familyAControls = familyARows.filter((c) => c.id.includes('CONTROL'))
const familyARequirementArms = familyARows.filter((c) => !familyAChannelCensus.includes(c) && !familyAControls.includes(c))
const familyAArmManual = familyARequirementArms.filter((c) => c.verdict === 'MANUAL')
const familyAArmFail = familyARequirementArms.filter((c) => c.verdict === 'FAIL')
const familyAArmPass = familyARequirementArms.filter((c) => c.verdict === 'PASS')
const familyBArms = familyRows('B')
const familyCArms = familyRows('C')
const familyBManual = familyBArms.filter((c) => c.verdict === 'MANUAL')
const familyCManual = familyCArms.filter((c) => c.verdict === 'MANUAL')
const manualRowIdsAnywhere = CHECKS.filter((c) => c.verdict === 'MANUAL').map((c) => c.id.split(' ')[0])
console.log('  FAMILY-VERDICT TERMS (from this run, not re-asserted):')
console.log(`    FAMILY A = NON-COMPLIANT iff every REQUIREMENT arm FAILs: ${familyARequirementArms.length} requirement arm(s) = ` +
  `${verdictSplit(familyARequirementArms)} ` +
  `(${familyARequirementArms.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')})` +
  `${familyAArmManual.length === 0 ? ` — NO arm is MANUAL, so the verdict is carried by ${familyAArmFail.length} FAIL / ${familyAArmPass.length} PASS` : ` — **${familyAArmManual.length} arm(s) MANUAL (${JSON.stringify(familyAArmManual.map((c) => c.id.split(' ')[0]))}): A WITHHELD claim. The family verdict is not COMPLIANT while any arm is MANUAL` +
    `${familyAArmFail.length !== 0 ? `, and it is NON-COMPLIANT only on the ${familyAArmFail.length} arm(s) that COULD be read` : ''}` +
    `${familyAArmFail.length === 0 && familyAArmPass.length === 0 ? ', and with NO arm readable at all the verdict is WITHHELD ENTIRELY — NOT COMPLIANT' : ''}**`}` +
  ` — BESIDE them: ${familyAControls.length} CONTROL row(s) ` +
  `(${familyAControls.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')}) and ${familyAChannelCensus.length} CHANNEL-CENSUS row(s) ` +
  `(${familyAChannelCensus.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')}) — NEITHER carries the family verdict`)
console.log(`    FAMILY B = COMPLIANT iff every family-B row PASSes: ${verdictSplit(familyBArms)} over ${familyBArms.length} row(s)` +
  `${familyBManual.length === 0 ? ' — no MANUAL row, so the COMPLIANT reading is complete' : ` — **${familyBManual.length} MANUAL row(s) (${JSON.stringify(familyBManual.map((c) => c.id.split(' ')[0]))}): those claims are WITHHELD, so the family is NOT reported COMPLIANT on a MANUAL arm**`}`)
console.log(`    FAMILY C = COMPLIANT iff every family-C row PASSes: ${verdictSplit(familyCArms)} over ${familyCArms.length} row(s)` +
  `${familyCManual.length === 0 ? ' — no MANUAL row, so the COMPLIANT reading is complete' : ` — **${familyCManual.length} MANUAL row(s) (${JSON.stringify(familyCManual.map((c) => c.id.split(' ')[0]))}): those claims are WITHHELD, so the family is NOT reported COMPLIANT on a MANUAL arm**`}`)
console.log(`    MANUAL ACROSS THE RUN (the A3-05 term, printed so a MANUAL row cannot vanish from any count): ${manualRowIdsAnywhere.length} row(s) ${JSON.stringify(manualRowIdsAnywhere)}`)
console.log(`    CONTROL INVENTORY (A-F15): ${CHECKS.filter((c) => c.id.includes('CONTROL')).length} id-labelled CONTROL row(s) + the PRECEDENCE control asserted inside SC-C-01 (a predicate TERM since B-F5) = 6 controls total`)
// THE EXIT CODE IS EVIDENCE: exit 1 iff at least one row is FAIL, 0 only when there is none.
// A MANUAL/PARKED row is counted and named but is NOT a FAIL for exit-code purposes.
// THE EXIT IS FORCED HERE so the drain above is the ONLY one (the `exit` hook then finds an
// empty registry) and the cleanup row is COUNTED in every run, FAIL rows included.
process.exit(CHECKS.some((c) => c.verdict === 'FAIL') ? 1 : 0)
