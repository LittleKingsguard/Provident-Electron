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
// so the `cmd`+`exit` obligation is met by the run itself, and each row's `instrument` names the
// surface IN ADDITION to that command (the `§6.1` `instrument` field's own set is the surface;
// the `cmd` field is the command line). **THE `[CDP]`-AS-INSTRUMENT LICENCE IS NOT SETTLED AND
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
 *  returns whether the directory is REALLY gone; it is idempotent and never throws. */
function removeWithVerify(dir) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* already gone */ }
    if (!exists(dir)) return true
    settleSync(250)
  }
  return !exists(dir)
}

// ── the scratch profile + the boot ─────────────────────────────────────────────────────
/** A fresh scratch profile under the OS temp dir, seeded with a REAL tier-4 record BEFORE
 *  the boot (so the boot read — not a write — is what ingests it; that ordering is what
 *  makes the seeded-third-party-key row measurable). `extra` adds foreign keys to the
 *  seeded file. */
function seedProfile(tag, extra = null) {
  const profile = mkdtempSync(join(tmpdir(), `sc-live-${tag}-`))
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

// ── the named predicates ───────────────────────────────────────────────────────────────
/** THE PERSISTED-FILE CENSUS — NAMED TERMS: `jsonNames` (every `*.json` entry in the
 *  profile), `undeclaredJsonNames` (the ones OUTSIDE the EXACTLY-TWO pin), `securityPresent`,
 *  `settingsPresent`. The predicate is `undeclaredJsonNames.length === 0` AND the security
 *  file present. `settingsPresent` is REPORTED but not asserted: the tier-1 file is created
 *  lazily at the first `file.*` crossing (MEASURED: absent on a settled cold boot), so
 *  asserting its presence would be a predicate about the demo's traffic, not about the
 *  store's shape — a THIRD name is the finding the pin exists to catch. */
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
check('SC-CH-02 (live channel 2)', 'the app\'s own renderer module answers THE ONE boot-constructed store of this live realm, with the generic name-addressed surface present and `secure` NOT among the tier handles', storeIsLive ? 'PASS' : 'FAIL',
  `import(new URL('./renderer.js', document.baseURI).href).getWiredGraphStore(): sameIdentity=${storeProbe?.sameIdentity}, tierHandles=${JSON.stringify(storeProbe?.tierHandles)}, members present ${JSON.stringify(storeProbe?.members)}`,
  'the live renderer graph, not a reconstruction: the ESM module map returns the already-evaluated instance. `tiers` is the landed 3-member `Object.freeze({temp,mem,file})` (the dossier\'s A-2 OUT row), so `store.tiers.secure` cannot exist')

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
  for (const ns of ['security', 'store', 'module']) {
    const o = p[ns];
    out.namespaces[ns] = o
      ? { present: true, members: Object.keys(o).sort(),
          arities: Object.fromEntries(Object.keys(o).map(function(k){ return [k, typeof o[k] === 'function' ? o[k].length : null] })) }
      : { present: false };
  }
  return out;
})()`)
const bridgeNamespaces = Array.isArray(Object.keys(bridgeCensus?.namespaces ?? {}))
  ? Object.entries(bridgeCensus.namespaces).filter(([, v]) => v.present !== false).map(([k]) => k).sort()
  : []
const bridgeNamespaceCensusOk = bridgeCensus?.present === true
  && JSON.stringify(bridgeNamespaces) === JSON.stringify(['module', 'security', 'store'])
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
check('SC-A-01 (Family A, arm a-i) — THE MAIN-SIDE RENDERER BRIDGE', 'REQUIREMENT ARM (a-i): an ARBITRARY caller-named datum can be written to and read back from tier 4 through the main-side renderer bridge — MEASURED: it cannot; the bridge is not name-addressed and the write is dropped', (arbitraryRoundTripped ? 'PASS' : 'FAIL'),
  `NAMED TERMS: the ARM is MET iff the live read-back carries the caller's own key. bridge top-level keys=${JSON.stringify(bridgeCensus?.topKeys)}, the THREE object-valued namespaces=${JSON.stringify(bridgeNamespaces)} (censusOk=${bridgeNamespaceCensusOk}), their members and Function.length arities=${JSON.stringify(bridgeCensus?.namespaces)}; a live set({myNewField:'COMPLIANCE-ARBITRARY-DATUM'}) answered ${JSON.stringify(arbitraryNameWritten?.setAnswer)}; the live get() AFTER it answered ${JSON.stringify(arbitraryNameReadBack)}; arbitraryKeyRoundTripped=${arbitraryRoundTripped}. THE CHANNEL CENSUS, so "ANY live channel" is answered and not assumed — and RESTATED by the §6.2 audit's A-F1 over the THREE BRIDGE NAMESPACES rather than the security namespace alone: (i) security={${(bridgeCensus?.namespaces?.security?.members ?? []).join(',')}} with no name-addressed member; (ii) store={${(bridgeCensus?.namespaces?.store?.members ?? []).join(',')}} — the tier-1 FILE bridge, DRIVEN at SC-A-06 with a secure.-keyed payload and a secure.-looking name, because a name-parameterised put() exists there and was NEVER probed by this battery's first draft; (iii) module={${(bridgeCensus?.namespaces?.module?.members ?? []).join(',')}} (operator-only, main->renderer->main); (iv) the generic surface's six name-addressed members, driven at SC-A-02; (v) the live MCP tool set, censused against the landed ALL_TOOLS at SC-C-02. Every bridged member reports Function.length=0, so no census here rests on arity. NO live channel accepts an arbitrary tier-4 name`,
  'the authority is the architect\'s clause (1) in docs/decisions.md `SECURE-TIER-IS-A-FILESTORE-PEER`: tier 4\'s ONLY distinctions from the `file` tier are "its FILE, its NO-LOWER-TIER-ALIAS rule and its ACCESS-CONTROL POLICY", with the shape "OPENED to arbitrary data keyed by the app\'s own subsystems". The landed three-member patch surface is the FOURTH distinction the same row says a pass must "surface rather than enforce". THIS ROW IS DELIBERATELY WRITTEN AS THE REQUIREMENT ARM: a PASS would mean an arbitrary datum round-tripped through the tier\'s own store API, which is the only admissible form of a Family A pass. ITS CENSUS CLAUSE IS NOW SUPPORTED BY A DRIVEN PROBE OF EVERY NAMESPACE, not by a member list — the `§6.2` audit\'s `A-F1` found the `store` namespace unprobed and every row still green, which is why SC-A-06 exists')

const genericSecure = await driveGenericSurface(cdp, 'secure.operator.token')
const genericRefusals = ['resolve', 'set', 'commit', 'clear', 'remove', 'subscribe']
const genericRefused = genericRefusals.map((k) => isSecureRefusal(genericSecure?.[k]))
const anyGenericAccepted = genericRefused.some((v) => v !== true)
check('SC-A-02 (Family A, arm a-ii) — THE GENERIC NAME-ADDRESSED SURFACE, DRIVEN LIVE', 'REQUIREMENT ARM (a-ii): an arbitrary `secure.*` name can be written/read/committed/subscribed on the generic name-addressed surface of the live renderer graph — MEASURED: all SIX members answer the typed refusal `secure-refused`', (anyGenericAccepted ? 'PASS' : 'FAIL'),
  `NAMED TERMS: the ARM is MET iff at least one name-addressed member ACCEPTS the name. per-member accepted=${JSON.stringify(Object.fromEntries(genericRefusals.map((k, i) => [k, !genericRefused[i]])))}; the VERBATIM answers — resolve=${JSON.stringify(genericSecure?.resolve)}, set=${JSON.stringify(genericSecure?.set)}, commit=${JSON.stringify(genericSecure?.commit)}, clear=${JSON.stringify(genericSecure?.clear)}, remove=${JSON.stringify(genericSecure?.remove)}, subscribe=${JSON.stringify(genericSecure?.subscribe)}; tierHandles=${JSON.stringify(genericSecure?.tierHandles)} (the landed 3-member '{temp,mem,file}' — the tier handle 'secure' cannot exist)`,
  'store-core-graph.md §2.5 items 1/2 (the refusal and its fixed precedence `secure → malformed → undeclared → …`, decided BEFORE the register and BEFORE traversal), §2.4 item 7(b) (the write-side decision site) and §3.2 F-14. This is the landed WALL the gate-1 record calls "not a doorway" (`secure-tier-generalization-review.md` §1), and it is exactly what a Family A pass must NOT be manufactured out of: the refusal is correct AS THE ACCESS CONTROL and simultaneously the evidence that arm (a-ii) is unmet')

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
  'the EXACTLY-TWO pin (docs/specs/store-persist.md; docs/FORKER.md §4 (ii)/(iv); the `G2` DONE row) and `store-security.md` §1.2 item 2 ("a third persisted filename is a finding"). `settingsPresent` is REPORTED, not asserted: the tier-1 file is created lazily at the first `file.*` crossing (MEASURED here as absent on a settled cold boot), so the assertable property is the ABSENCE of a third name')
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
check('SC-B-04 (Family B, arm c) — THE TIER-SHAPE HALF', 'the SECURITY file\'s exact top-level key set after a live write is the tier\'s DECLARED members only — NO `exclusion`/gate key, NO `write` receipt member and NO tier-1 `schemaVersion`', (undeclaredSecKeys.length === 0 && forbiddenSecKeys.length === 0 && enabledIsGroupSet) ? 'PASS' : 'FAIL',
  `NAMED TERMS: topLevelKeys=${JSON.stringify(secKeySet)}, declaredMembers=${JSON.stringify(DECLARED_SECURITY_KEYS)}, undeclaredKeys=${JSON.stringify(undeclaredSecKeys)}, forbiddenChannelOrSchemaKeys=${JSON.stringify(forbiddenSecKeys)}, enabled is a group set over VALID_GROUPS=${enabledIsGroupSet} (${JSON.stringify(secParsed.enabled)}), the file's own bytes=${JSON.stringify(secBytesAfterWrite)}`,
  'THIS ROW MEASURES THE TIER-SHAPE HALF, NOT THE S1 `U-6`/`D-19` ROW: S1 measures that one security write creates no third file and no gate key on its own profile; this measures the tier\'s DECLARED MEMBER SET against the file\'s exact key set, with `exclusion` (the widened GET record\'s additive member, §2.3 item 2 / PAR-13), `write` (the SET receipt\'s additive member) and tier 1\'s reserved `schemaVersion` all named as FORBIDDEN HERE — each is a channel/schema token that belongs on the wire or in `provident-settings.json`, never in tier 4\'s file')

// ── FAMILY B, arm (d) — the atomic shape, with CONTROL-TMP and CONTROL-TORN ─────────────
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
check('SC-B-05 (Family B, arm d)', 'the write leaves NO residual `${path}.tmp` at the real path and the real path always PARSES — the atomic replace\'s shape, read on the live profile after a real write', residueA.ok ? 'PASS' : 'FAIL',
  `NAMED TERMS: residuals=${JSON.stringify(residueA.residuals)}, realPathParses=${residueA.realPathParses}, realPathKeys=${JSON.stringify(residueA.realPathKeys)}, tornOrUnparsable=${residueA.tornOrUnparsable}`,
  'store-security.md §2.2 items 1/3/6: `mkdirSync` → write `${path}.tmp` → fsync → `renameSync` → dir-fsync, and "a successful persist leaves NO `${path}.tmp`"; "a torn file at the real path is IMPOSSIBLE by construction". A torn file does not parse, so `realPathParses` is the torn-file term and it is read from the real path\'s OWN bytes — and since the §6.2 audit\'s A-F10, BOTH halves of this predicate are driven toward failure by a live control, not just the residue half')
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
check('SC-C-01 (Family C, arm b) — THE RENDERER-SIDE REFUSALS', 'a renderer `read(\'secure.*\')`, a `subscribe(\'secure.*\')` and a `commit(\'secure.*\')` each answer the declared typed refusal — the FIRST forbidden read of `data-ownership-model-plan.md` §3.8, measured live', (readRefused && subscribeRefused && undeclaredRefused && commitRefused) ? 'PASS' : 'FAIL',
  `NAMED TERMS: resolve('secure.operator.token')=${JSON.stringify(rendererRefusals?.read)}, subscribe('secure.*')=${JSON.stringify(rendererRefusals?.subscribe)}, resolve('secure.undeclared')=${JSON.stringify(rendererRefusals?.undeclaredSecure)}, commit('secure.x',1)=${JSON.stringify(rendererRefusals?.commit)}; the FOUR refusal terms — readRefused=${readRefused}, subscribeRefused=${subscribeRefused}, undeclaredSecureRefused=${undeclaredRefused}, commitRefused=${commitRefused} (the commit term is IN the predicate since the §6.2 audit's A-F2: it was computed and printed but omitted from the verdict, so a write-side regression could not move the row); CONTROL of the precedence — resolve('mem.undeclaredroot.x')=${JSON.stringify(precedenceControl?.undeclaredPlain)}, resolve('file.undeclaredroot.x')=${JSON.stringify(precedenceControl?.undeclaredFile)} (both expected 'undeclared-name' — the SAME names without the secure segment), resolve('operator.token')=${JSON.stringify(precedenceControl?.tierFreeMalformed)} (a tier-free dotted name is malformed at A-PARSE, which is why it is NOT the control), resolve('secure') alone=${JSON.stringify(precedenceControl?.malformed)}`,
  'the dossier\'s A-4 ("a read/subscribe/remove/clear/set/commit on a `secure.*` name answering a TYPED REFUSAL with reason:\'secure-refused\', while the tier\'s OWN get on the same name answers") and §3.8\'s forbidden read (1)/(2). The precedence control makes the refusal FALSIFIABLE as a first-step decision: a store that reached the traversal and answered `undeclared-name`/`no-such-anchor` for these names would be refusing for the wrong reason and would fail this row')

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
const notificationMethods = bootA.notifications.map((n) => n.method)
const notificationCensus = [...new Set(notificationMethods)].sort()
  .map((m) => `${m}×${notificationMethods.filter((x) => x === m).length}`)
const postPhaseNotificationCensus = (() => {
  const m = bootA.notifications.slice(firstNotificationSnapshotCount).map((n) => n.method)
  return [...new Set(m)].sort().map((x) => `${x}×${m.filter((y) => y === x).length}`)
})()
check('SC-C-03 (Family C, arm a-ii) — THE FOUR CARRIERS', 'NO carrier available on the live MCP surface carries ANY tier-4 material (the token value, the `maxJournalLength` value, the enabled group set, a `secure.` name spelling, or the `exclusion` member)', carrierHits.length === 0 ? 'PASS' : 'FAIL',
  `NAMED TERMS: scannedCarriers=${CARRIERS.length} (including ${postPhaseNotificationCount} POST-PHASE notification payload(s) — the §6.2 audit's A-F8 widening); needles=${JSON.stringify(NEEDLES.map((n) => n.id))}; carriersWithUnexplainedHits=${JSON.stringify(carrierHits.map((c) => ({ carrier: c.carrierId, hits: c.hits, spans: c.firstHitSpans })))}; carriers whose only needle spans lie INSIDE an argument THIS BATTERY supplied=${JSON.stringify(echoCarriers.map((c) => ({ carrier: c.carrierId, echoHits: c.echoHits })))}; notification carrier received ${bootA.notifications.length} payload(s) over the WHOLE run = ${JSON.stringify(notificationCensus)} (first snapshot at the 8 tools/call + 2 resource reads: ${firstNotificationSnapshotCount} payload(s); post-phase snapshot at the two setExclusion transitions + the post-return call: ${postPhaseNotificationCount} payload(s) = ${JSON.stringify(postPhaseNotificationCensus)}); carrier ids = ${JSON.stringify(CARRIERS.map((c) => c.carrierId))}`,
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
check('SC-C-04 (CONTROL-CARRIER)', 'CONTROL: the SAME scanner HITS all FIVE needles on a synthetic payload carrying tier-4 material, AND the own-argument echo exclusion does NOT swallow the token value or a `secure.` name this battery never supplied — so SC-C-03 cannot be a scanner that never fires or one that excuses every hit', (carrierControl.hits.length === NEEDLES.length && carrierEchoControl.hits.length === 2 && carrierEchoControl.echoHits.length === 0) ? 'PASS' : 'FAIL',
  `NAMED TERMS: controlHits=${JSON.stringify(carrierControl.hits)} of ${NEEDLES.length} needles (controlBytes=${carrierControl.bytes}); ECHO-SCOPE control — ownArgs=${JSON.stringify([PROBE_SECURE_PATH])}, payload=${JSON.stringify(carrierEchoControlPayload)}, unexplainedHits=${JSON.stringify(carrierEchoControl.hits)}, echoHits=${JSON.stringify(carrierEchoControl.echoHits)} (both expected UNEXPLAINED: the token was never an argument, and 'secure.operator.OTHER' is not the name this battery passed)`,
  'the scan\'s own falsifiability, in two directions: a deleted needle or a needle spelled against the wrong seed reddens the first half, and an exclusion that excused hits by CARRIER rather than by SPAN reddens the second. A scan that could not fail — or one that could not fail on a real leak — is not a row, which is why both controls are asserted rather than described')

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
  `NAMED TERMS: baseline (mcp-enabled) get_markdown ok=${baselineOk}; setExclusion('mcp-disabled') → ${JSON.stringify(enterDisable)}; IN FORCE — the MCP arm answered ${JSON.stringify(scannable(inForceMcp.text).slice(0, 220))}, isDeclaredReceipt=${inForceIsDeclaredReceipt} (status/reason/message all named), and the tier-4 bridge answered ${JSON.stringify(inForceTier4)}; carrier scan of the in-force answer=${JSON.stringify(inForceCarrier)}, inForceCarrierClean=${inForceCarrierClean} (the TERM added by the §6.2 audit's A-F8 — it was printed but not asserted); the renderer's read of a secure.* name while in force=${JSON.stringify(inForceReadsRefused?.read)}; setExclusion('mcp-enabled') → ${JSON.stringify(returnGate)}; AFTER RETURN — get_markdown ok=${afterReturnOk}, tier-4 bridge ${JSON.stringify(afterReturnTier4)}`,
  'docs/decisions.md `THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` clauses (1)-(3): the legal pairs are `{MCP-ENABLED, TIER-4-CLOSED}` / `{MCP-DISABLED, TIER-4-OPEN}`, enforcement is at the INVOCATION TURN across BOTH transports, and the gate supplies STATE while the store keeps the `secure.*` DECISION. BOTH arms are asserted on the SAME boot, and the return arm is MEASURED (a real call after the transition) rather than inferred — an unre-measured return would leave the second legal pair unverified')

// ── FAMILY B, arm (a) — RE-MEASURED AFTER THE WHOLE PHASE (`A-F12`, disposed `FIXED`) ───
/** `SC-B-01`'s exactly-two-file reading is taken BEFORE the operator write, the TMP control, the
 *  TORN control, the file-tier control and the Family C phase, so on its own it is a PRE-WRITE
 *  reading. This row re-runs the SAME settled listing and the SAME persisted-census predicate
 *  AFTER `SC-C-05` and asserts it a SECOND time, so the exactly-two claim describes the profile
 *  the run actually left behind and not only the cold boot's. */
const settledPost = await settledListing(bootA.profile, { spawnedAt: 0, minAgeMs: 0, stableReads: 2 })
const censusPost = persistedCensus(settledPost.list)
const residuePost = tmpResidueCensus(bootA.profile)
const censusPostHolds = censusPost.ok === true && residuePost.residuals.length === 0
check('SC-B-09 (Family B, arm a) — THE CENSUS RE-MEASURED AFTER THE FAMILY C PHASE', 'the SAME exactly-two-`.json` predicate (no third name, the security file present) and the SAME no-`.tmp` term STILL hold after the operator write, both live controls and both exclusion transitions — the pre-write reading is not the only reading', censusPostHolds ? 'PASS' : 'FAIL',
  `NAMED TERMS: post-phase settled listing=${JSON.stringify(settledPost.list.filter((n) => n.endsWith('.json') || n.endsWith('.tmp')))}, settled=${settledPost.settled} after ${settledPost.polls} poll(s); jsonNames=${JSON.stringify(censusPost.jsonNames)}, undeclaredJsonNames=${JSON.stringify(censusPost.undeclaredJsonNames)}, securityPresent=${censusPost.securityPresent}, settingsPresent=${censusPost.settingsPresent}, predicate=${censusPost.ok}; residual .tmp entries after the whole phase=${JSON.stringify(residuePost.residuals)}; the PRE-WRITE reading this re-asserts is SC-B-01's (jsonNames=${JSON.stringify(censusA.jsonNames)}, predicate=${censusA.ok})`,
  'the EXACTLY-TWO pin re-read at the END of the run rather than only at its start (docs/specs/store-persist.md; `store-security.md` §1.2 item 2; `docs/FORKER.md` §4 (ii)/(iv)). This row adds no new property: it makes `SC-B-01`\'s claim non-vacuous AFTER every live write and transition this battery itself performed, which is the §6.2 audit\'s A-F12 remedy — a phase that ends with a third file or a leftover `.tmp` would otherwise have been unmeasured')

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
check('SC-A-05 (Family A, arm c)', 'REQUIREMENT ARM (c): a profile whose security file carries THIRD-PARTY arbitrary keys survives a real boot INTO THE LIVE STORE — MEASURED: the live store NEVER reports them and the FIRST live write DISCARDS them from the file', (bootBInstrumentOk && !keyInLiveGetAfterBoot && keyInFileAfterWrite === false) ? 'FAIL' : 'PASS',
  `NAMED TERMS: the ARM is MET iff the seeded keys are readable through the live store after the boot. POSITIVE PRECONDITION (added by the §6.2 audit's A-F7): the live get() answers the seeded token (liveGetIdentityOk=${liveGetIdentityOk}, token=${JSON.stringify(liveGetB?.token)}) and the boot's MCP surface answered (bootBFirst.ok=${bootBFirst.ok}, isError=${bootBFirst.isError === true}) → bootBInstrumentOk=${bootBInstrumentOk}${bootBInstrumentOk ? '' : ' — THE INSTRUMENT IS BROKEN: the absence terms below carry NO weight and this FAIL is a statement about the probe, not about the store'}; seeded keys=${JSON.stringify(Object.keys(SEEDED_FOREIGN))}; keyInFileAfterBoot=${keyInFileAfterBoot} (a boot read does not rewrite the file, so the BYTES still carry them — keys after boot=${JSON.stringify(Object.keys(afterBootParsed).sort())}), keyInLiveGetAfterBoot=${keyInLiveGetAfterBoot} (live get()=${JSON.stringify(liveGetB)}), firstWriteReceipt=${JSON.stringify(writeB?.write)}, keyInFileAfterWrite=${keyInFileAfterWrite} (keys after write=${JSON.stringify(Object.keys(afterWriteParsed).sort())})`,
  'the gate-1 record\'s §1 row: "`sanitize()` reconstructs the same closed shape on load, so an unknown key already in the file is DISCARDED and gone at the next write" — and the landed boot read does not itself rewrite the file, so the seed SURVIVES in the BYTES until the first write. Both halves are measured, which is why the file is read BEFORE the boot: the seed must exist before the boot ingestion, or the row would measure a write rather than an ingestion. Written in the requirement direction, so "the silent discard works as designed" cannot be read as a Family A pass. ITS PRECONDITION IS NOW ASSERTED (A-F7): the identity read must answer the seeded token before the absence terms are given weight, so a THROWN read can no longer masquerade as "the store dropped it"')

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
 *  THREE probes, in ONE boot, each with its OWN before/after byte reading:
 *    (i)   `put({name:'secure.complianceprobe', value: JSON.stringify({'secure.complianceprobe':…})})`
 *          — a `secure.`-keyed NAME and a `secure.`-keyed VALUE member;
 *    (ii)  `put({name:'file.settings.complianceprobe', value: JSON.stringify({'file.settings.complianceprobe':'T1-ROW','secure.settings.theme.token':…})})`
 *          — a `file.`-looking NAME carrying a `secure.`-keyed VALUE member (the strict alias probe);
 *    (iii) `put({name:'file.settings.namedprobe', value: JSON.stringify({'file.settings.theme.token':'NAMED-PROBE-VALUE'})})`
 *          — the NAME-HONOURED discriminator: if the row lands under the NAME's spelling the
 *          `name` parameter is honoured; if the landed row is keyed by the VALUE's own spelling,
 *          the name is INERT and the projection is by value key.
 *  The `security` file's sha256 is read before and after the whole group, so the tier-4 file is
 *  asserted NOT to be reachable from this channel either. */
const settingsPathB = join(bootB.profile, SETTINGS_FILE)
const settingsBytesB0 = readOrNull(settingsPathB)
const secShaBBefore = sha256(secBPath)
const putSecureName = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'secure.complianceprobe', value: JSON.stringify({ 'secure.complianceprobe': 'TIER4-LEAK-PROBE-DATUM' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB1 = readOrNull(settingsPathB)
const putFileLookingName = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'file.settings.complianceprobe', value: JSON.stringify({ 'file.settings.complianceprobe': 'T1-ROW', 'secure.settings.theme.token': 'TIER4-ALIAS-PROBE' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB2 = readOrNull(settingsPathB)
const putNameHonour = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.put({ name: 'file.settings.namedprobe', value: JSON.stringify({ 'file.settings.theme.token': 'NAMED-PROBE-VALUE' }) }); }
  catch (e) { return { threw: String(e) }; }
})()`)
await sleep(500)
const settingsBytesB3 = readOrNull(settingsPathB)
const liveRowsB = await cdpB.evaluate(`(async function(){
  try { return await window.provident.store.get(); } catch (e) { return { threw: String(e) }; }
})()`)
const secShaBAfter = sha256(secBPath)
const storeBridgeRows = Array.isArray(liveRowsB) ? liveRowsB : []
const storeBridgeReadable = Array.isArray(liveRowsB)
const secureKeyInSettingsBytes = settingsBytesB3 !== null && /"secure\./.test(settingsBytesB3)
const secureNameInStoreGet = storeBridgeRows.some((r) => typeof r?.name === 'string' && r.name.startsWith('secure.'))
const nameHonoured = storeBridgeRows.some((r) => r?.name === 'file.settings.namedprobe')
const valueKeyLanded = (() => {
  const row = storeBridgeRows.find((r) => r?.name === 'file.settings.theme.token')
  return row !== undefined && row?.value === 'NAMED-PROBE-VALUE'
})()
const securityFileUnmovedByStoreBridge = secShaBBefore === secShaBAfter
const storeBridgeNoLeak = storeBridgeReadable && !secureKeyInSettingsBytes && !secureNameInStoreGet && securityFileUnmovedByStoreBridge
check('SC-A-06 (Family A, arm a-iii — CHANNEL CENSUS) — THE TIER-1 FILE-STORE BRIDGE NAMESPACE', 'CHANNEL-CENSUS ARM: the third page-reachable bridge namespace (`provident.store.put/get`) accepts NO arbitrary tier-4 NAME — a `secure.`-keyed name and a `secure.`-keyed value member both fail to land in `provident-settings.json`\'s bytes or in the live `get()`, and the tier-4 file is untouched by this channel', storeBridgeNoLeak ? 'PASS' : 'FAIL',
  `NAMED TERMS: live store.get() answered rows=${storeBridgeReadable ? storeBridgeRows.length : JSON.stringify(liveRowsB)} = ${JSON.stringify(storeBridgeRows)}; settings bytes BEFORE the probe=${JSON.stringify(settingsBytesB0)}; after (i) put with a secure.-keyed NAME and a secure.-keyed VALUE member: receipt=${JSON.stringify(putSecureName)} => ${JSON.stringify(settingsBytesB1)}; after (ii) put with a file.-looking NAME carrying a secure.-keyed VALUE member: receipt=${JSON.stringify(putFileLookingName)} => ${JSON.stringify(settingsBytesB2)}; after (iii) put with the NAME file.settings.namedprobe and the VALUE key file.settings.theme.token: receipt=${JSON.stringify(putNameHonour)} => ${JSON.stringify(settingsBytesB3)}. LEAK TERMS: secureKeyInSettingsBytes=${secureKeyInSettingsBytes} (no secure.-keyed member appears in tier 1's bytes at ANY of the four readings), secureNameInStoreGet=${secureNameInStoreGet} (no row the live get() reports is secure.-named), securityFileUnmovedByStoreBridge=${securityFileUnmovedByStoreBridge} (the tier-4 file's sha256 ${secShaBBefore.slice(0, 16)} ... ${secShaBAfter.slice(0, 16)}: this channel cannot reach tier 4's file), storeBridgeReadable=${storeBridgeReadable} => storeBridgeNoLeak=${storeBridgeNoLeak}. THE NAME-PARAMETER DISCRIMINATOR (iii): nameHonoured=${nameHonoured}, valueKeyLanded=${valueKeyLanded} - MEASURED, the name parameter is INERT: the landed row is keyed by the VALUE's own spelling (file.settings.theme.token), i.e. the main-side handler projects the crossing's translation by the value's keys and never reads row.name`,
  'the §6.2 audit\'s `A-F1` (HIGH, gate-6-blocking): the driver censused `window.provident.security` and the generic store surface, then asserted "NO live channel accepts an arbitrary tier-4 name" — while `src/main/preload.ts:61-65,123-129` exposes `provident.store.put(row)`/`get()`, wired through `STORE_FILE_PUT` to `src/main/main.ts:315-336`, whose own comment declares "the `mem.*`/`temp.*`/`secure.*` keys NEVER land in the file". THIS ROW IS THAT CLAIM, DRIVEN. `docs/decisions.md` `SECURE-TIER-IS-A-FILESTORE-PEER` clause (2) (`D-CLAUSE-2`) forbids a lower-tier alias, and `data-ownership-model-plan.md` §3.8 forbids a tier-4 value reaching a nonsecure reader — a `secure.`-keyed member landing in tier 1\'s file would violate BOTH and would be a Family C leak. MEASURED at this HEAD: it does not land, and the channel cannot move the tier-4 file. A FAIL here is a NEW HIGH live defect and must be filed, not explained')

// ══════════════════════════════════════════════════════════════════════════════════════
// PHASE 4 — [G] the static readings this battery's rows lean on
// ══════════════════════════════════════════════════════════════════════════════════════
const storeModulePath = join(root, 'src', 'renderer', 'store-core-graph.ts')
const storeModuleSha = sha256(storeModulePath)
const securityStorePath = join(root, 'src', 'main', 'security-store.ts')
const securityStoreSha = sha256(securityStorePath)
const securityStoreSrc = readFileSync(securityStorePath, 'utf8')
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
check('SC-G-02 (static census)', 'the store module\'s `secure.*` refusal sites are present in the landed bytes (the five sites the dossier\'s A-1 OUT row names)', secureGateSites.length >= 5 ? 'PASS' : 'FAIL',
  `NAMED TERMS: secure-refused occurrences in src/renderer/store-core-graph.ts = ${secureGateSites.length} (${JSON.stringify(secureGateSites)}); file sha256=${storeModuleSha.slice(0, 16)}…`,
  'the dossier\'s A-1 OUT row names five sites (:478-479 construction, :922-923 read walk, :1417 write parse, :2277 subscribe, :766 rootParts) — this census reads the TOKEN, not the line numbers (ledger line anchors drift)')

// ══════════════════════════════════════════════════════════════════════════════════════
// THE VERDICT SUMMARY (printed WITH its terms)
// ══════════════════════════════════════════════════════════════════════════════════════
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
  console.log(`    FAMILY ${fam}: ${rows.length} row(s) = ${Object.entries(t).map(([k, v]) => `${v} ${k}`).join(' / ')}`)
}
/** THE FAMILY-VERDICT TERMS, PRINTED SO THE RECORD'S THREE VERDICTS ARE RE-DERIVED FROM THE
 *  RUN RATHER THAN RE-ASSERTED. Family A's verdict rests on its FOUR REQUIREMENT ARMS only —
 *  `SC-A-06` is a CHANNEL-CENSUS row (a `secure.`-keyed name that landed in tier 1's bytes would
 *  be a LEAK, not a requirement arm) and `SC-A-03` is a CONTROL, so neither may carry the family
 *  verdict in either direction. Families B and C are read as their arms' verdicts, and if a
 *  repaired predicate FAILS the family verdict moves with it. `A-F15`'s counting rule is printed
 *  BESIDE the row count so the record and the driver cannot disagree about how many controls
 *  exist. */
const familyARows = CHECKS.filter((c) => /SC-A-/.test(c.id))
const familyAChannelCensus = familyARows.filter((c) => /CHANNEL.CENSUS/i.test(`${c.id} ${c.subject}`))
const familyAControls = familyARows.filter((c) => c.id.includes('CONTROL'))
const familyARequirementArms = familyARows.filter((c) => !familyAChannelCensus.includes(c) && !familyAControls.includes(c))
console.log('  FAMILY-VERDICT TERMS (from this run, not re-asserted):')
console.log(`    FAMILY A = NON-COMPLIANT iff every REQUIREMENT arm FAILs: ${familyARequirementArms.length} requirement arm(s) = ` +
  `${familyARequirementArms.filter((c) => c.verdict === 'FAIL').length} FAIL / ${familyARequirementArms.filter((c) => c.verdict === 'PASS').length} PASS ` +
  `(${familyARequirementArms.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')}) — BESIDE them: ${familyAControls.length} CONTROL row(s) ` +
  `(${familyAControls.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')}) and ${familyAChannelCensus.length} CHANNEL-CENSUS row(s) ` +
  `(${familyAChannelCensus.map((c) => `${c.id.split(' ')[0]}:${c.verdict}`).join(', ')}) — NEITHER carries the family verdict`)
console.log(`    FAMILY B = COMPLIANT iff every family-B row PASSes: ${CHECKS.filter((c) => /SC-B-/.test(c.id)).filter((c) => c.verdict === 'FAIL').length} FAIL row(s)`)
console.log(`    FAMILY C = COMPLIANT iff every family-C row PASSes: ${CHECKS.filter((c) => /SC-C-/.test(c.id)).filter((c) => c.verdict === 'FAIL').length} FAIL row(s)`)
console.log(`    CONTROL INVENTORY (A-F15): ${CHECKS.filter((c) => c.id.includes('CONTROL')).length} id-labelled CONTROL row(s) + the PRECEDENCE control asserted inside SC-C-01 = 6 controls total`)
// THE EXIT CODE IS EVIDENCE: exit 1 iff at least one row is FAIL, 0 only when there is none.
// A MANUAL/PARKED row is counted and named but is NOT a FAIL for exit-code purposes.
process.exit(TALLY.FAIL ? 1 : 0)
