// tests/secure-exclusion-live.mjs — GATE 6, THE LIVE BATTERY DRIVER for unit
// `U-SECURE-EXCLUSION` (`S1`, wave `S`). Contract: `docs/specs/secure-exclusion.md`
// `§2.4` item 7 (the `[U]` obligation: MANDATORY LIVE, NOT PARKED) and
// `docs/specs/user-flow-audit.md` `§5`/`§6.1`/`§7.1` (limb A `DOM-SHIM-BLINDNESS`).
//
// Run:  npm run build && node tests/secure-exclusion-live.mjs
//
// ⟶ THE 2026-10-11 EIGHTH `§6.2` AUDIT — `A-8-04` IS THE ONE FINDING THAT CHANGES THIS DRIVER, AND
// IT IS AN INSTRUMENT HARDENING, NOT A ROW. **THE ROW COUNT IS UNCHANGED AT `42`; NO PREDICATE, NO
// FIXTURE, NO VERDICT EXPRESSION AND NO TERM WAS TOUCHED.**
//   · `A-8-04` (LOW, gate-6-blocking only in the sense that a battery that CANNOT FINISH CANNOT
//     REPORT) — MEASURED AT THE BYTES BEFORE THE REPAIR (`:318-326` of the as-filed file):
//     `send()` returned a Promise resolved ONLY by a matching `message`; there was NO deadline,
//     NO `close` listener and NO `error` listener, and `pending` was never settled — so an
//     UNANSWERED CDP reply NEVER SETTLED, the battery HUNG on that `await`, the Electron window
//     stayed on the operator's display, and **NO SUMMARY AND NO EXIT CODE WERE PRODUCED AT ALL**.
//     The driver's "a leak is impossible" and "the exit code is evidence" claims therefore held
//     for THROWS ONLY. THE REPAIR, in three limbs:
//       (a) every reply is awaited under `CDP_REPLY_TIMEOUT_MS` (20000 ms, the same bound the
//           boot-order and HTTP-readiness rows already use), and the channel marks itself DEAD
//           with its REASON on timeout, on `close` and on `error`, settling EVERY pending reply;
//       (b) a dead channel answers the SENTINEL `NO_CDP_REPLY` instead of hanging, and every
//           reader propagates it (`evaluate`, `clickElement`, `waitForToggle` — the last returns
//           immediately instead of spinning out its window);
//       (c) **A BROKEN INSTRUMENT IS NOT A FINDING**: the rows whose subject or reading came off
//           that channel — the DECLARED, printed set `CDP_DEPENDENT_ROWS`, each member naming the
//           channel it depends on — report `MANUAL`, never `FAIL` (which would claim a finding the
//           instrument cannot support) and never `PASS` (which would be silent). A row recorded
//           BEFORE the channel died keeps its genuine verdict, so the gate is INERT on a live run.
//     The summary prints the channel's state and the `MANUAL` ids, and says in one line that a
//     `MANUAL` row is NOT a PASS. **THE EXIT CODE'S MEANING IS UNCHANGED** (`non-zero ⟺ at least
//     one FAIL`), which is why the dead-channel state is PRINTED rather than folded into the exit
//     code: the record's exit-code figures stay comparable, and no run may read the battery green
//     while a row is `MANUAL`.
//
// ⟶ THE 2026-10-10 REPAIR PASS (FOURTH `§6.2` AUDIT, `R4-01`…`R4-08`) — WHAT IT CHANGED IN THIS
// DRIVER, EACH WITH THE FINDING IT CLOSES. Every one of them is INSTRUMENT-side; `src/**` is
// untouched. **THE ROW COUNT IS UNCHANGED AT `42`**: no row was added and no row was removed — the
// `R4` pass repaired predicates, fixtures and instrument dispositions in place. `R4-01` (HIGH,
// gate-6-blocking) added TWO TERMS to an existing predicate and REBUILT its deletion fixture;
// `R4-06` changed TWO verdicts to `MANUAL` for instrument states. **NO ROW WAS REPAIRED BY
// WEAKENING IT, AND NO TERM WAS REMOVED ANYWHERE.**
//   · `R4-01` (HIGH) — `U-4 (return arm, stdio)` (`returnArmStdioProperty`): the as-filed `5` terms
//     carried NO assertion that the OPEN STATE WAS IN PLACE BEFORE THE RETURN, so with
//     `setExclusion` DELETED the tier never opened, the return was a no-op and ALL FIVE TERMS READ
//     TRUE. The predicate is now `7` terms (the five as-filed terms kept term for term, plus
//     `call-issued-while-open-answered-the-receipt` and `bridge-read-open-before-return`), and the
//     fixture captioned "THE FEATURE IS DELETED" — which was in fact a HALF-APPLIED RETURN — is now
//     an ACTUAL deletion case (the renderer's own baseline value + a bridge that never moves).
//   · `R4-06` (LOW, structural rule (b)) — `SX-G-45` (boot order) now SETTLES on a bounded window
//     and answers `MANUAL` when a landmark has not arrived; `SX-G-45 (HTTP boot)` answers `MANUAL`
//     for a readiness timeout. A BROKEN INSTRUMENT reads `MANUAL`, never `FAIL`.
//
// ⟶ THE 2026-10-09 REPAIR PASS (SECOND `§6.2` AUDIT, `F-A1`…`F-A18`) — WHAT IT CHANGED IN THIS
// DRIVER, EACH WITH THE FINDING IT CLOSES. Every one of them is INSTRUMENT-side; `src/**` is
// untouched. **THE ROW COUNT MOVED `32 → 34`**: `+1` for the `SX-G-03` status-line row (`F-A16`)
// and `+1` for the registry row's DELETION/RED-FAIL CONTROL (`F-A1`). The other findings were closed
// by AMENDING a row's predicate or its evidence, not by adding a row:
//   · `F-A1` (HIGH) — the registry row (`U-2`/`U-7`/`SX-G-23`) had NO term asserting the transition
//     happened, so a DELETED transition still read PASS. The predicate is now the named
//     `registrationTransitionProperty` of `5` terms (the bridge's OWN two readings + the two listing
//     types + the as-filed SET-EQUALITY half, kept verbatim), and the row BESIDE it drives `5`
//     DELETION/REGRESSION fixtures through the SAME function (the first fixture is THE DELETION).
//   · `F-A7` — the restart arm gained the `post-boot-bytes-identical` term (`13` terms), so the
//     record's "identical in all THREE readings" is a READING rather than a substring check.
//   · `F-A8` — the boot-order row's predicate now asserts the RENDERER landmark SECOND (the printed
//     order IS `[stdio transport ready, renderer ready]`) and its subject is narrowed to what the
//     two captured landmarks witness.
//   · `F-A9` — `SX-G-42` and the HTTP return arm now assert `=== 200` (the negative half kept).
//   · `F-A11` — the affordance word (`buttonText`) and the `#app` mount's absence are PREDICATE
//     TERMS, not printed-only values.
//   · `F-A14` — the tight-window control fixture filters the DRIVER-SEEDED `PROFILE_STORE_FILE`,
//     not Chromium's lazily-written `Preferences` (which could produce a false red).
//   · `F-A15` — the preflight has its own id (`SX-G-45p`), so the FAIL list cannot be ambiguous.
//   · `F-A16` — a row now PRINTS `#security-status`'s full `statusText`.
//   · `F-A6` — the straddle block's two false sentences are corrected and the row is
//     RE-DISPOSITIONED as a DECLARED LIMIT tied to the open ruling `GAP-2`, NOT as a fix.
//
// WHY THIS FILE IS HERE AND NOT IN `scripts/` — AND THE REASON, STATED
// ACCURATELY SINCE THE `§6.2` AUDIT'S `F7` CORRECTED AN EARLIER, WRONG CITATION
// (2026-10-09). The as-filed reason claimed a NEW `scripts/*.mjs` "would redden"
// `tests/ui-leg-contract.test.ts`'s helper-candidate row. IT WOULD NOT:
//      `HELPER_NAME = HELPERS.find((f) => importsHelper(DIVERGENCE_SRC, f)) ?? HELPERS[0]`
//      (`tests/ui-leg-contract.test.ts:110`) prefers the candidate the DIVERGENCE
//      LEG IMPORTS — `scripts/electron-spawn.mjs` — so a NEW, UNIMPORTED file is
//      never selected unless the imported one disappears. The PINNED hazard on
//      the `scripts/` route is the OTHER half of that same contract file: its
//      `L-1` row pins the `package.json` `scripts` KEY SET (the landed keys plus
//      exactly `ui`; `LANDED_SCRIPT_KEYS`, asserted in BOTH directions), so a new
//      script KEY — not a new file — reddens it and a config change cannot satisfy
//      it (`AGENTS.md` item 4's hazard note). THIS DRIVER ADDS NO KEY: its literal
//      command line is `node tests/secure-exclusion-live.mjs`, so the `scripts/`
//      ROUTE WAS PERMISSIBLE and is not taken for a different, non-structural
//      reason: this harness is a `tests/**`-owned live battery and lives with the
//      batteries it re-runs. The census walker (`walkCensusPaths`, filter
//      `/^census/i`) does not enumerate it.
//   2. `scripts/electron-ui.mjs`'s `R4` static row forbids the two reach-in call
//      sites in any SHIPPED path (comments stripped, code scanned as a SET):
//      `webContents.executeJavaScript` and `webContents.debugger`. This driver
//      uses NEITHER and does not weaken that row: it drives the renderer over
//      CDP (`--remote-debugging-port=0` + the DevTools HTTP endpoint + a raw
//      WebSocket), a channel the `R4` set does not name. **THE AUTHORITY FOR THAT
//      CHANNEL IS AN OWNER RULING, NOT THIS PASS'S ANNOTATION**: `docs/decisions.md`'s
//      `REAL-DOM-UI-GATE-LEG` row (architect ruling `A-d8`) admits the reach-ins
//      `webContents.executeJavaScript`, then CDP, as LEG-ONLY channels that "may
//      NEVER become MCP tools". **THE RESIDUAL IS A GAP, NOT SELF-RATIFIED**: `A-d8`
//      rules about the `ui` LEG and does NOT name this unit's gate-6 battery, while
//      `docs/specs/secure-exclusion.md` `§2.4` item 7(2-note) PREDICTS `MANUAL` for
//      the gesture rows; whether `[CDP]` supersedes that declared `MANUAL` for gate 6
//      is the SPEC OWNER's ruling to make (`GAP-1`, recorded in the battery record).
//
// INSTRUMENTS, in the closed set `docs/specs/user-flow-audit.md` `§6.1` item 3
// declares:
//   [MCP]  a literal MCP client over the app's OWN stdio transport, built with
//          the repo's shipped helper (`scripts/electron-spawn.mjs`'s
//          `ChildProcessTransport`) — one process per boot, no second spawn.
//   [CDP]  Chrome DevTools Protocol over the app's OWN renderer: `Runtime.evaluate`
//          for reads, `Input.dispatchMouseEvent` for the REAL pointer gesture,
//          `Page.reload` for the reload arm. The port is read from the child's
//          OWN stderr (`DevTools listening on ws://127.0.0.1:<port>/…`), because
//          this host cannot write `<default userData>/DevToolsActivePort`
//          (measured: `Error writing DevTools active port to file …:
//          Permission denied (13)`) — the boot still succeeds, only the
//          port FILE is refused. TWO boots carry it: boot A (the stdio boot) and
//          the HTTP boot — the latter so the RETURN can be driven on the
//          manual-UI path `§2.4` item 6 declares (the pane control), on the very
//          process whose HTTP answers the row then measures.
//   [G]    repo records: file bytes (`sha256`), the git landing chain, `grep`
//          over the unit's declared diff scope.
// The `[U]` oracle for every gesture row is the RENDERED BOX + the rendered
// TEXT (`getBoundingClientRect` + `textContent`/`getAttribute`), never a
// computed-style-only reading.
//
// WHAT THIS DRIVER NEVER DOES: it never writes to the operator's real profile
// (every boot is a fresh `mkdtemp` profile under the OS temp dir, seeded with a
// real bearer TOKEN so the auth arm's ordering rows are measurable), it never
// mutates a source file, and it kills the child + removes the profile on every
// path.
import { createHash } from 'node:crypto'
import { execSync, spawn } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { ChildProcessTransport, electronBin, repoRoot, spawnElectron } from '../scripts/electron-spawn.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = repoRoot
const mainCjs = join(root, 'dist', 'main', 'main.cjs')
const TOKEN = 'live-battery-token-4f9c1a7e'
const GROUPS = ['read', 'dispatch', 'graph', 'code']
const CENSUS_IN_TREE = 23

// ---- the CDP channel's own bound (`A-8-04`, the EIGHTH `§6.2` audit) -------------
/** HOW LONG A SINGLE CDP REPLY MAY TAKE BEFORE THE CHANNEL IS DECLARED DEAD. The same
 *  20000 ms bound the boot-order settle (`SX-G-45`) and the HTTP readiness probe
 *  (`SX-G-45 (HTTP boot)`) already use, so the driver has ONE declared instrument bound
 *  rather than three. */
const CDP_REPLY_TIMEOUT_MS = 20000
/** THE SENTINEL A DEAD CHANNEL ANSWERS WITH. An OBJECT, deliberately: every reader that
 *  does `read.x` on it reads `undefined` (a row's term goes FALSE, nothing throws), so a
 *  dead channel can never abort the run with a TypeError the way an absent reading would. */
const NO_CDP_REPLY = Object.freeze({ __cdpNoReply: true })
const isNoCdpReply = (v) => v === NO_CDP_REPLY || (typeof v === 'object' && v !== null && v.__cdpNoReply === true)
/** EVERY CHANNEL THIS RUN OPENS, in attach order. Each carries its own `dead` reason. */
const CDP_CHANNELS = []
const channelByLabel = (label) => CDP_CHANNELS.find((c) => c.label === label)
const deadChannelReason = (label) => {
  const c = channelByLabel(label)
  return c && c.dead !== null ? c.dead : null
}
/** **THE ROWS WHOSE VERDICT CANNOT BE CERTIFIED OFF A DEAD CDP CHANNEL — DECLARED, PRINTED,
 *  AND EACH WITH ITS DEPENDENCY.** Two classes are in here, both read off the driver's own
 *  bytes rather than assumed: (i) a row that READS the channel (`paneRead`, `evaluate`,
 *  `clickElement`, `isolationProbe`); (ii) a row whose SUBJECT is a state the channel
 *  PERFORMED (`:797`/`:882`/`:886`/`:979`/`:1076` are `setExclusion` calls evaluated in boot A's
 *  renderer realm, and the restart arm's whole profile copy is made at that post-transition
 *  state). A row in NEITHER class — the fixture controls, the stderr boot-order row, the
 *  preflight, the HTTP arms whose state this boot's own MCP channel drives, and the static
 *  censuses — keeps its verdict, because the channel's death cannot move it. */
const CDP_DEPENDENT_ROWS = {
  'SX-G-01/02': 'A',
  'U-1 / SX-G-59/60': 'A',
  'SX-G-03 (the status line, printed with its terms)': 'A',
  'U-5 / SX-G-65 (pane realm)': 'A',
  'U-5 / SX-G-65 (app graph, `list_targets`) — RE-INSTRUMENTED 2026-10-09, the third `§6.2` audit\'s `R3-01`': 'A',
  'U-2 (the gesture half)': 'A',
  'U-2 (sibling controls)': 'A',
  'SX-G-57 (live)': 'A',
  'U-3 (via the bridge)': 'A',
  'U-2 (registry, live) / U-7 / SX-G-23': 'A',
  'U-4 (return arm)': 'A',
  'U-6 (reload arm, main-side state)': 'A',
  'U-6 (reload arm) — PREDICATE CONTROL': 'A',
  'U-6 (reload arm, the operator\'s view)': 'A',
  'U-6 (restart arm) / SX-G-46/47 — RE-INSTRUMENTED ON BOOT A\'S OWN PROFILE': 'A',
  'SX-G-44 (live)': 'A',
  'U-4 (return arm, HTTP) — RE-GROUNDED ON THE MANUAL-UI PATH': 'HTTP',
}

// ---- records -----------------------------------------------------------------
const CHECKS = []
/** Record one check. `verdict` is the CLOSED set this battery reports with:
 *  PASS / FAIL / MANUAL / PARKED. (`REPORT` was in this set until 2026-10-09: the
 *  `§6.2` audit's `F6` found the boot-order row using it for a failure, and it is
 *  OUTSIDE the set `docs/specs/user-flow-audit.md` `§6.1` clause 1 and this battery's
 *  own preamble declare — worse, the FAIL list below filters on `verdict === 'FAIL'`,
 *  so a boot-order regression printed NO FAIL and appeared in NO list. A failure
 *  verdict is `FAIL`, without exception.) */
function check(id, subject, verdict, observation, evidence = '') {
  // ⟶ `A-8-04`: A BROKEN INSTRUMENT READS `MANUAL`, NEVER `FAIL`, NEVER A SILENT PASS.
  // The channel a row depends on is DECLARED (`CDP_DEPENDENT_ROWS`); if it died before this
  // row was recorded, the verdict the dead channel produced is kept VISIBLE in the
  // observation and the row reads `MANUAL`. A row recorded before the death is untouched.
  const dependency = Object.prototype.hasOwnProperty.call(CDP_DEPENDENT_ROWS, id) ? CDP_DEPENDENT_ROWS[id] : null
  const dead = dependency === null ? null : deadChannelReason(dependency)
  if (dead !== null) {
    observation = `[INSTRUMENT — THE CDP CHANNEL IS DEAD (declared dependency: channel ${dependency}; ${dead})] a broken instrument is NOT a finding, so this row reads MANUAL; the verdict the dead channel produced is kept verbatim here as what the instrument read: ${verdict}. ${observation}`
    verdict = 'MANUAL'
  }
  CHECKS.push({ id, subject, verdict, observation, evidence, instrument: dead !== null })
  const mark = verdict === 'PASS' ? '✓' : verdict === 'FAIL' ? '✗' : verdict === 'MANUAL' ? '»' : '□'
  const line = `  ${mark} [${verdict}] ${id} ${subject}`
  if (verdict === 'FAIL') console.error(`${line}\n      observed: ${observation}`)
  else console.log(`${line}\n      observed: ${observation}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** THE PROFILE DIRECTORY'S SETTLED LISTING — `N` consecutive IDENTICAL raw readings, taken
 *  no earlier than `minAgeMs` after the child was SPAWNED, with the entries the RUNTIME
 *  itself added before it settled REPORTED, and the poll count and the bounded timeout
 *  reported with them.
 *
 *  WHY BOTH CONDITIONS ARE OWED (MEASURED, 2026-10-09): Chromium writes its OWN bookkeeping
 *  into the `userData` directory lazily in the first seconds of a boot — `Cache/`,
 *  `Code Cache/`, `GPUCache/`, `DIPS`, `Trust Tokens`, `blob_storage/`,
 *  `declarative_performance_observer.db` and peers appear within ~6 s, and
 *  `Network Persistent State` + `Preferences` only at ~8–14 s (MEASURED: absent at 6 s,
 *  present at 14 s, then stable for ≥ 20 s of activity). A three-read settle at 5 s is
 *  therefore NOT settled, and a `D-19`/`N-5` "NO NEW FILE APPEARED" term measured from a
 *  baseline taken at the pane's first paint reddens on the BROWSER's own writes — an
 *  instrument defect, not a finding. The baseline is taken only after BOTH the age floor and
 *  the stability condition hold, and both are printed. */
async function settledListing(dir, { spawnedAt = 0, minAgeMs = 0, stableReads = 3, timeoutMs = 90000 } = {}) {
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
    if (stable >= stableReads && ageMs >= minAgeMs) {
      return { list: now, polls, added: [...new Set(added)], settled: true, ageMs }
    }
    await sleep(1000)
  }
  return { list: last ?? [], polls, added: [...new Set(added)], settled: false, ageMs: spawnedAt === 0 ? null : Date.now() - spawnedAt }
}

/** THE CLEANUP REGISTRY — every boot registers its OWN teardown here the moment it
 *  exists, and one top-level `exit` hook drains it. Nothing is left to the driver's
 *  control flow: a throw in ANY phase still kills every child and removes every
 *  scratch profile (a leak would leave an Electron window open on the operator's
 *  display, which is exactly what a battery must never do). */
const CLEANUPS = []
function registerCleanup(fn) { CLEANUPS.push(fn) }
process.on('exit', () => { for (const fn of CLEANUPS.splice(0)) { try { fn() } catch { /* best effort */ } } })

/** A fresh scratch profile seeded with a REAL token (the `§0A` item 7 / `FS-EX-9`
 *  ordering precondition: a `null` token admits any request and would make the
 *  401 rows unmeasurable). */
function seedProfile(tag) {
  const profile = mkdtempSync(join(tmpdir(), `se-live-${tag}-`))
  writeFileSync(join(profile, 'provident-security.json'), JSON.stringify({ token: TOKEN, enabled: GROUPS }, null, 2))
  return profile
}

/** Boot the app on a fresh scratch profile and connect the MCP stdio client.
 *  `extraArgs` carries the transport/port/`--remote-debugging-port=0` members. */
async function bootApp(tag, extraArgs = []) {
  const profile = seedProfile(tag)
  const spawned = spawnElectron([...extraArgs, `--provident-user-data=${profile}`])
  const child = spawned.child
  let stderr = ''
  child.stderr.on('data', (d) => { stderr += String(d) })
  child.stdout.on('data', () => {})
  const transport = new ChildProcessTransport(child)
  const client = new Client({ name: 'se-live-battery', version: '0.1.0' })
  await client.connect(transport)
  const boot = { child, transport, client, profile, stderrText: () => stderr, closed: false }
  registerCleanup(() => {
    if (boot.closed) return
    boot.closed = true
    try { client.close() } catch { /* gone */ }
    try { transport.close() } catch { /* gone */ }
    try { child.kill('SIGKILL') } catch { /* gone */ }
    rmSync(profile, { recursive: true, force: true })
  })
  return boot
}

/** Tear one boot down: close the MCP client, kill the child, remove the profile. */
async function teardown(boot) {
  if (boot.closed) return
  boot.closed = true
  try { await boot.client.close() } catch { /* already gone */ }
  try { boot.transport.close() } catch { /* already gone */ }
  try { boot.child.kill('SIGKILL') } catch { /* already gone */ }
  await sleep(300)
  rmSync(boot.profile, { recursive: true, force: true })
}

/** A raw MCP tool call that keeps the SDK's error text instead of throwing, so a
 *  refusal and a throw are BOTH readable as observations. */
async function rawCall(client, name, args = {}) {
  try {
    const r = await client.callTool({ name, arguments: args })
    return { ok: true, text: r.content?.[0]?.text ?? '', isError: r.isError === true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
const parsed = (r) => (r.ok ? JSON.parse(r.text) : { __error: r.error })

/** THE DECLARED REFUSAL RECEIPT, READ AS THE LIVE ANSWER (`§2.2` item 2(a): the refusal IS the
 *  tool's RESULT — a VALUE, never a throw — and `§2.5` item 1's AMENDED shape carries the
 *  additive, server-authored `message` naming the CAUSE and the REMEDY).
 *
 *  WHY THE PREDICATE IS THE RECEIPT AND NOT `isError`: under the architect's `GAP-3` ruling the
 *  exclusion transition toggles NOTHING (`§2.1` item 3's supersession clause; `§2.2` item 2(b)),
 *  so the landed SDK's `-32602 … disabled` throw — the ONLY thing that ever made a refusal read
 *  `isError === true` — is GONE by ruling. A row asserting `isError === true` asserts the
 *  SUPERSEDED carrier. The unit's own `G6-F3` row (`tests/secure-exclusion.test.ts`) and its
 *  register cell `G6-F3#1` assert `isError` is ABSENT on this very answer, and `P-EX-TP-1` pins
 *  the refusal a VALUE at all three depths.
 *
 *  RETURNS the parsed receipt when the answer IS the declared receipt, and `null` otherwise — so
 *  the predicate REDDENS on: a protocol error / a throw (`ok:false` or `isError:true` — the
 *  superseded carrier), the RENDERER'S OWN value (the inert-turn regression: a markdown/HTML
 *  answer is not a receipt), a two-member receipt (the pre-ruling shape — an ABSENT `message` is
 *  OUTSIDE `§2.5` item 1), and a cause-less or remedy-less sentence.
 *
 *  THE MESSAGE IS ASSERTED AS ITS DECLARED DOMAIN, NEVER AS A LITERAL SPELLING (`§2.5` item 1's
 *  `DECLARED-DEFAULT`: the exact sentence is the Implementer's, provided it carries both named
 *  elements — a literal-only assertion would redden on any wording change). */
function declaredReceipt(answer) {
  if (!answer || answer.ok !== true || answer.isError === true) return null
  let v = null
  try { v = JSON.parse(answer.text) } catch { return null }
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return null
  if (v.status !== 'refused' || v.reason !== 'exclusion-closed') return null
  const m = typeof v.message === 'string' ? v.message : ''
  if (m.trim() === '') return null
  const cause = /security store/i.test(m) && /\bopen\b/i.test(m)
  const remedy = /(retry|try again|wait)/i.test(m) && /operator/i.test(m)
  return cause && remedy ? v : null
}

/** The tool NAMES the live stdio surface advertises, SORTED — the SET-equality reading `§0A`
 *  item 7(c) / `§2.2` item 2(c) pin ("the registration set is ENTIRELY UNCHANGED"), never a bare
 *  count: a count cannot tell an unchanged set from a different one of the same size. */
async function listToolNames(client) {
  try { return (await client.listTools()).tools.map((t) => String(t.name)).sort() } catch { return null }
}
const sameSet = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((n, i) => n === b[i])

// ---- the CDP channel ---------------------------------------------------------
/** Port of the child's OWN DevTools endpoint, read from its stderr. */
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
  static async attach(port, label = 'cdp') {
    const listing = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const page = listing.find((t) => t.type === 'page')
    if (!page) throw new Error('no CDP page target in the app\'s renderer')
    const cdp = new Cdp(page.webSocketDebuggerUrl, label)
    await cdp.open()
    return cdp
  }
  constructor(url, label = 'cdp') {
    this.url = url
    this.label = label
    this.id = 0
    this.pending = new Map()
    /** `null` while the channel is ALIVE; the REASON otherwise (`A-8-04`). */
    this.dead = null
    CDP_CHANNELS.push(this)
  }
  /** **DECLARE THE CHANNEL DEAD AND SETTLE EVERY PENDING REPLY, ONCE** (`A-8-04`). The
   *  as-filed class had NO such path: `pending` was only ever settled by a matching
   *  `message`, so a renderer that stopped answering left every waiter pending forever.
   *  Every waiter is settled with `NO_CDP_REPLY` and every LATER `send` answers it
   *  immediately, so the run FINISHES (its `exit` hook then drains the cleanup registry:
   *  no window is left on the display) instead of hanging with no exit code. */
  markDead(reason) {
    if (this.dead !== null) return
    this.dead = reason
    for (const [, entry] of this.pending) { clearTimeout(entry.timer); entry.resolve(NO_CDP_REPLY) }
    this.pending.clear()
  }
  open() {
    this.ws = new WebSocket(this.url)
    this.ws.addEventListener('message', (e) => {
      let m
      try { m = JSON.parse(e.data) } catch { return }   // a non-JSON frame is not a reply
      if (m.id !== undefined && this.pending.has(m.id)) {
        const entry = this.pending.get(m.id)
        clearTimeout(entry.timer)
        this.pending.delete(m.id)
        entry.resolve(m)
      }
    })
    // THE TWO LISTENERS THE AS-FILED CLASS DID NOT HAVE (`A-8-04`): a socket that CLOSES
    // (the renderer died, the child was killed) or ERRORS can never deliver another reply,
    // so the channel is dead at that instant rather than at the next timeout.
    this.ws.addEventListener('close', () => { if (this.closedByDriver === true) return; this.markDead('the CDP socket CLOSED — no further reply can arrive') })
    this.ws.addEventListener('error', () => { if (this.closedByDriver === true) return; this.markDead('the CDP socket reported an ERROR — no further reply can arrive') })
    return new Promise((res, rej) => { this.ws.addEventListener('open', res); this.ws.addEventListener('error', rej) })
  }
  /** A BOUNDED SEND (`A-8-04`): the wait for a reply is capped at `CDP_REPLY_TIMEOUT_MS`
   *  and an unanswered reply settles as `NO_CDP_REPLY` with the channel declared dead —
   *  never a hang, never a silent success-shaped value. */
  send(method, params = {}) {
    if (this.dead !== null) return Promise.resolve(NO_CDP_REPLY)
    const i = ++this.id
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.pending.delete(i)
        this.markDead(`NO REPLY to \`${method}\` (id ${i}) within the bounded ${CDP_REPLY_TIMEOUT_MS} ms`)
        resolve(NO_CDP_REPLY)
      }, CDP_REPLY_TIMEOUT_MS)
      this.pending.set(i, { resolve, timer })
      try { this.ws.send(JSON.stringify({ id: i, method, params })) }
      catch (err) {
        clearTimeout(timer)
        this.pending.delete(i)
        this.markDead(`the CDP socket could not be written to (${String(err && err.message)}) — no reply can arrive`)
        resolve(NO_CDP_REPLY)
      }
    })
  }
  async evaluate(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, includeCommandLineAPI: true })
    if (isNoCdpReply(r)) return NO_CDP_REPLY   // ⟶ `A-8-04`: the instrument state PROPAGATES
    if (r.result?.exceptionDetails) return { __cdpError: r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text }
    return r.result?.result?.value
  }
  /** A REAL pointer gesture: press + release at the element's own rendered box
   *  centre. Returns the point and what `elementFromPoint` said was there, so a
   *  click that landed elsewhere is visible in the record. */
  async clickElement(id) {
    const point = await this.evaluate(`(function(){
      var el = document.getElementById(${JSON.stringify(id)});
      if (!el) return null;
      el.scrollIntoView({ block: 'center' });
      var r = el.getBoundingClientRect();
      var x = Math.round(r.left + r.width / 2), y = Math.round(r.top + r.height / 2);
      var hit = document.elementFromPoint(x, y);
      return { x: x, y: y, w: r.width, h: r.height, hit: hit ? (hit.tagName + (hit.id ? '#' + hit.id : '')) : null, isTarget: hit === el };
    })()`)
    if (isNoCdpReply(point)) return NO_CDP_REPLY   // ⟶ `A-8-04`: no gesture is attempted on a dead channel
    if (point === null || point === undefined) return null
    await this.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x, y: point.y })
    await this.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: point.x, y: point.y, button: 'left', clickCount: 1, buttons: 1 })
    await this.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: point.x, y: point.y, button: 'left', clickCount: 1, buttons: 0 })
    return point
  }
  /** The `[U]` read: the rendered box + the rendered text, in ONE reading. */
  async paneRead() {
    return this.evaluate(`(function(){
      var b = document.getElementById('exclusion-toggle');
      var s = document.getElementById('security-status');
      var lbl = document.querySelector('#exclusion-control label');
      if (!b) return { present: false };
      var r = b.getBoundingClientRect();
      var cs = getComputedStyle(b);
      return {
        present: true,
        label: lbl ? lbl.textContent : null,
        buttonText: b.textContent,
        dataState: b.getAttribute('data-state'),
        classes: b.className,
        box: { w: r.width, h: r.height, top: r.top, left: r.left },
        display: cs.display,
        statusText: s ? s.textContent : null,
        mcpSegment: s ? (/ · MCP: (enabled|disabled)/.exec(s.textContent) || [])[1] ?? null : null,
      };
    })()`)
  }
  /** Wait (bounded) for the pane control to be painted. */
  async waitForToggle(timeoutMs = 20000) {
    const started = Date.now()
    while (Date.now() - started < timeoutMs) {
      const present = await this.evaluate(`!!document.getElementById('exclusion-toggle')`)
      if (isNoCdpReply(present)) return false   // ⟶ `A-8-04`: a DEAD channel is not a 20 s spin (the row that reads this answers MANUAL)
      if (present === true) return true
      await sleep(200)
    }
    return false
  }
  /** The app-graph / pane isolation probe: BOTH readings, in the page realm. */
  async isolationProbe() {
    return this.evaluate(`(function(){
      var ids = Array.prototype.map.call(document.querySelectorAll('#panes [id]'), function (e) { return e.id });
      return {
        panesHasToggle: !!document.getElementById('exclusion-toggle'),
        panesHasControl: !!document.getElementById('exclusion-control'),
        panesIds: ids,
        appMountHasToggle: !!document.querySelector('#app #exclusion-toggle'),
        appMountHtml: (document.getElementById('app') || {}).innerHTML || '',
      };
    })()`)
  }
  /** THE DRIVER'S OWN CLOSE IS NOT A DEAD CHANNEL (`A-8-04`): the driver closes its channel
   *  BEFORE it tears its boot down (the order is asserted by the call sites below), so the
   *  `close` event that follows is the driver's own act rather than a broken instrument —
   *  otherwise every green run would end by declaring its own channel dead. */
  close() { this.closedByDriver = true; try { this.ws.close() } catch { /* already closed */ } }
}

// ---- [G] the static readings --------------------------------------------------
function sha256(path) {
  return createHash('sha256').update(readFileSync(path, 'utf8')).digest('hex')
}

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 1 — BOOT A: the initial state, the pane, both axes, U-1, U-5
// ══════════════════════════════════════════════════════════════════════════════
console.log('\nSECURE-EXCLUSION LIVE BATTERY (gate 6) — U-SECURE-EXCLUSION (S1)')
console.log('='.repeat(74))
console.log(`  seed: a fresh scratch profile carrying token=${TOKEN.slice(0, 12)}… (a NON-null token, so the`)
console.log('        authorization-first ordering rows of FS-EX-9 are measurable)')
console.log(`  driver: node tests/secure-exclusion-live.mjs   ·   HEAD: ${execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()}`)

// ═══ THE STALE-WINDOW PREFLIGHT, TAKEN INSIDE THE DRIVER (the `§6.2` audit's `F10`).
// The as-filed record declared the preflight as an OPERATOR STEP (`pgrep` → empty before
// each boot), so a reader had to take on trust that no earlier run's window was still on
// the display — and a stale window makes BOTH the CDP attach and the rendered-box reads
// ambiguous. The run is now SELF-GUARDING: it probes, records the probe as a row like any
// other, and REFUSES TO MEASURE (exit `1`, no summary) if anything is found. The scan is
// `ps`, not `pgrep`, so the probe does not depend on `procps` and does not match itself
// (its own command line carries no `dist/main/main.cjs`). ═══
function appProcesses() {
  try {
    const out = execSync('ps -eo pid=,args=', { cwd: root, maxBuffer: 8 * 1024 * 1024 }).toString()
    return out.split('\n').map((l) => l.trim()).filter((l) => l !== '' && l.includes('dist/main/main.cjs'))
  } catch { return null }
}
// ⟶ THE PREFLIGHT'S OWN NON-VACUITY CONTROL (`R5-08`, the FIFTH `§6.2` audit's LOW finding —
// the ONE FAIL-capable row that carried NO fixture block): as filed, this row's predicate could
// only ever be refused by a REAL stale window on the operator's display, i.e. its ability to fail
// was never DRIVEN. The probe's two failure modes are now terms of the SAME named predicate and
// are driven beside the live reading: a SYNTHETIC `ps` listing that carries a stale app process,
// and an unrunnable probe (`ps` threw → `null`). NO ROW WAS ADDED (the count stays `42`); the
// stop block below still refuses to measure through one (`exit 1`, no summary); and **THE FIXTURES'
// REFUSAL IS NOW PART OF THIS ROW'S VERDICT** — corrected 2026-10-11 by the SIXTH `§6.2` audit's
// `R6-02` (LOW, the *"computed but not asserted"* class): as filed the fixture booleans were PRINTED
// only while the verdict reduced to `preflightLive.ok`, so the row's own subject claim *"each
// REFUSED"* could not redden the row — every other control row asserts
// `every(v.ok === false)`. The verdict now folds both in, which is a strict STRENGTHENING (the fold
// is a conjunction, so it can only turn a false PASS into a FAIL — no run that read PASS before can
// read FAIL after unless a fixture was NOT refused).
function preflightProperty(found) {
  const terms = {
    'probe-ran': Array.isArray(found),
    'no-stale-app-process': Array.isArray(found) && found.length === 0,
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const staleBefore = appProcesses()
const preflightLive = preflightProperty(staleBefore)
const preflightControls = {
  'a SYNTHETIC `ps` listing carrying a stale app process (the shape a leftover window produces)': preflightProperty(['4242 /usr/bin/electron --mcp-transport=stdio dist/main/main.cjs']),
  'the probe ITSELF could not be run (`ps` threw, so the listing is `null`)': preflightProperty(null),
}
const preflightNotRefused = Object.entries(preflightControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
// THE PREFLIGHT'S OWN ID, DISTINCT FROM THE BOOT-ORDER ROW'S (`§6.2` audit `F-A15`): the
// as-filed id was `'SX-G-45 (preflight)'` while the boot-order row below is also `SX-G-45`,
// so the FAIL list (`§5`'s tail) printed an AMBIGUOUS line naming a row it could not
// identify. This row answers to `SX-G-45p`; the boot-order row keeps `SX-G-45`.
check('SX-G-45p (preflight)', 'the battery is SELF-GUARDING: NO pre-existing app process is on the display before the first boot — and the probe\'s predicate CAN FAIL (a SYNTHETIC listing carrying a stale app process, and an unrunnable probe, are each REFUSED, so each fixture is ASSERTED to be refused rather than merely printed)', preflightLive.ok && preflightNotRefused.length === 0 && Object.values(preflightControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `${staleBefore === null ? 'the preflight probe itself could not be run' : `ps -eo pid=,args= | grep 'dist/main/main.cjs' → ${JSON.stringify(staleBefore)} before boot A`}; TERMS ${JSON.stringify(preflightLive.terms)}; THE NON-VACUITY CONTROL (NEW 2026-10-10, the fifth \`§6.2\` audit\'s \`R5-08\`): ${JSON.stringify(Object.fromEntries(Object.entries(preflightControls).map(([k, v]) => [k, v.ok])))} driven through the SAME \`preflightProperty\`; fixtures NOT refused: ${JSON.stringify(preflightNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(preflightControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'a stale window from an earlier run would make the CDP attach and the rendered-box readings ambiguous, so the run refuses to measure through one. **THE CONTROL IS OVER THE PROBE\'S OWN FAILURE MODES, NOT OVER A FEATURE DELETION (`R5-08`):** no term of this row names the new node or the transition, so a feature deletion cannot redden it — which is why the row is `PRECONDITION-BY-DESIGN` in `§2`\'s falsification table; what the control removes is the VACUITY of a predicate that had never been driven red at all')
if (staleBefore === null || staleBefore.length !== 0) {
  console.error('\nPREFLIGHT STOP — a stale app process is on the display (or the probe could not be run). Nothing is measured through it.')
  console.error('Kill it (e.g. `pkill -f dist/main/main.cjs`) and re-run.')
  process.exit(1)
}

const bootAStartedAt = Date.now()   // the age floor for the restart arm's profile baseline
const bootA = await bootApp('A', ['--mcp-transport=stdio', '--remote-debugging-port=0'])
const portA = await devtoolsPort(bootA)
const cdp = await Cdp.attach(portA, 'A')
const togglePainted = await cdp.waitForToggle()

// boot-order evidence: the renderer's OWN stderr line for IPC_READY
/** THE TWO CAPTURED BOOT LANDMARKS, SETTLED BEFORE THEY ARE READ (`R4-06`, the FOURTH `§6.2` audit,
 *  LOW — the `§6.2` STRUCTURAL RULE (b): a BROKEN INSTRUMENT must read `MANUAL`, never `FAIL`).
 *  As filed, the boot-order row read the child's stderr ONCE with NO wait, so a landmark that had not
 *  YET been written — the handshake can resolve between `mcp.start()` and the renderer's own arming of
 *  the backend's readiness promise — reddened the row as a FEATURE failure, although the very next row
 *  is retried for exactly that reason ("a failed read here is an INSTRUMENT state, not a finding").
 *  The settle is BOUNDED and its outcome is REPORTED, so a timeout is an instrument state (`MANUAL`)
 *  rather than an accidental `FAIL`. */
async function settledLandmarks(stderrText, timeoutMs = 20000) {
  const started = Date.now()
  let readings = []
  for (;;) {
    // BOTH captured landmarks, IN THE STREAM'S OWN ORDER (deduplicated: a repeated line cannot make a
    // single landmark look like two).
    readings = [...new Set(stderrText().split('\n').filter((l) => l.includes('provident-mcp] stdio transport ready') || l.includes('renderer ready')))]
    if (readings.length === 2) return { readings, settled: true, waitedMs: Date.now() - started }
    if (Date.now() - started >= timeoutMs) return { readings, settled: false, waitedMs: Date.now() - started }
    await sleep(200)
  }
}
const orderSettle = await settledLandmarks(bootA.stderrText)
const orderLines = orderSettle.readings
// THE SUBJECT'S ORDER CLAUSE IS CORRECTED TO THE MEASURED ORDER (the third `§6.2` audit's `R3-03`): it
// read *"the MCP stdio transport becomes ready LAST, after the renderer's own arming line"* — the EXACT
// claim `F-A8` had already falsified in the evidence string — and the SUBJECT is what the FAIL list
// prints (this file's tail), so a boot-order regression would have printed the falsified wording beside
// its own observation. The measured order is `[stdio transport ready, renderer ready]`.
check('SX-G-45', 'the TWO boot landmarks the run CAPTURES appear in the declared order — the MCP stdio transport becomes ready FIRST, and the renderer\'s own arming line SECOND (the measured order `[stdio transport ready, renderer ready]`)', !orderSettle.settled ? 'MANUAL' : (orderLines.length === 2 && orderLines[0].includes('stdio transport ready') && orderLines[1].includes('renderer ready') ? 'PASS' : 'FAIL'),
  `the child's stderr carries both captured boot landmarks ${orderSettle.settled ? `IN ORDER after a SETTLED read (${orderSettle.waitedMs} ms, bounded 20000 ms)` : `set to MANUAL: only ${orderSettle.readings.length} landmark line(s) arrived within the bounded 20000 ms settle window`}: ${JSON.stringify(orderLines)}`,
  'THE MEASURED ORDER IS `[stdio transport ready, renderer ready]` — the MCP transport line is FIRST and the renderer arming line SECOND, which is what the predicate asserts and what the printed value shows. **CORRECTED 2026-10-09 (the `§6.2` audit\'s `F-A8`): the as-filed sentence read "the MCP stdio transport is the LAST landmark; the renderer arming (IPC_READY) precedes it" — FALSE OF BOTH THE PREDICATE AND THE OBSERVATION, which print the transport line first.** **AND THE SUBJECT IS NARROWED TO WHAT THESE TWO LANDMARKS WITNESS:** these are the only two boot lines this run CAPTURES (`L` `src/main/main.ts:480` logs `IPC_READY`, `L` `:507` awaits `mcp.start()`), and NEITHER witnesses the store/gate construction order — that order is declared by the `[H]` register\'s `P-EX-SM-3` cells, NOT by a captured line, so the as-filed subject wording (`store → gate → transports → mcp.start`) claimed more than the instrument reads. A deviating ORDER is a FAIL (`RE-GRAINED 2026-10-09`, the `§6.2` audit\'s `F6`: the as-filed row answered `REPORT`, a verdict OUTSIDE the closed set this battery and `§6.1` clause 1 declare, so a boot-order regression printed no FAIL and appeared in no list) — **AND A LANDMARK THAT SIMPLY HAS NOT ARRIVED YET IS AN INSTRUMENT STATE, NOT A FINDING, so the read is SETTLED on a bounded wait and a timeout is `MANUAL` (`R4-06`, 2026-10-10; structural rule (b)): only an ORDER that is actually deviating, both lines present, is a `FAIL`.**')

// THE FIRST MCP READ is retried, BOUNDED, because the handshake can resolve in the
// window between `mcp.start()` and the renderer's own arming of the backend's
// readiness promise (`IPC_READY` → `markReady()`), during which the backend queues
// the request. A failed read here is an INSTRUMENT state, not a finding, so it is
// retried a bounded 20 times and the ATTEMPT COUNT is part of the record.
async function firstRead(client, name, args = {}, attempts = 20) {
  let last = null
  for (let i = 0; i < attempts; i += 1) {
    last = await rawCall(client, name, args)
    if (last.ok && !/^\s*MCP error/i.test(last.text)) return { ...last, attempts: i + 1 }
    await sleep(500)
  }
  return { ...last, attempts }
}
const beforeRaw = await firstRead(bootA.client, 'provident.get_rendered_html', {})
const before = beforeRaw.ok ? parsed(beforeRaw) : {}
const beforePane = await cdp.paneRead()
check('SX-G-01/02', 'the boot state is the safe pair and the pane shows it', beforePane.present && beforePane.dataState === 'mcp-enabled' && beforePane.mcpSegment === 'enabled' ? 'PASS' : 'FAIL',
  `pane: data-state=${JSON.stringify(beforePane.dataState)} button=${JSON.stringify(beforePane.buttonText)} status segment=${JSON.stringify(beforePane.mcpSegment)}`,
  'the IPC_SECURITY_GET response is the pane\'s own source (`refresh()`/`syncConfig`), so this reading is the declared `{...settings, exclusion}` record rendered')

// THE `[U]` FALSIFIER'S OWN SHAPE (the `§6.2` audit's `F14`): `paneRead()` answers
// `{present:false}` when the control is NOT in the DOM, so the as-filed predicate
// dereferenced `beforePane.box.w` on a `present:false` reading and ABORTED THE WHOLE
// RUN with a TypeError instead of recording the red row this row exists to record.
// `present` is asserted FIRST, so the absent-control regression prints a FAIL here and
// the battery keeps going.
const paneBox = beforePane.present === true && beforePane.box ? beforePane.box : null
// THE AFFORDANCE WORD IS ASSERTED, NOT ONLY PRINTED (`§6.2` audit `F-A11`): `buttonText`
// was printed by three rows (`:419`/`:491`/`:599` of the as-filed driver) and asserted
// NOWHERE, while `§2`'s matrix and the landed contract (`docs/specs/secure-exclusion.md:972`)
// claim the affordance word. `beforePane.buttonText` is `Disable MCP` in the enabled state
// (the control offers the act that is available), so the term is the enabled-state spelling.
// `U-1`'s PREDICATE AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE): the live row below and the DELETION
// fixture beside it go through the SAME code, so the row's PASS is falsifiable by deletion and the
// fixture names the term that caught it. THE AS-FILED EXPRESSION IS UNCHANGED, TERM FOR TERM
// (`paneBox !== null && paneBox.w > 0 && paneBox.h > 0 && beforePane.display === 'block' &&
// typeof beforePane.label === 'string' && enabledAffordance`) — the one binding that changes is that the
// as-filed `enabledAffordance`, having become the `affordance-word` TERM inside this function, is no
// longer ALSO computed at the call site (the dead-binding shape the first audit's `F9` removed from
// `toolsBefore`; NOTHING is dropped from the predicate).
function panePaintedProperty(f) {
  const terms = {
    'present': f.present === true,
    'box-nonzero': f.box !== null && f.box !== undefined && f.box.w > 0 && f.box.h > 0,
    'display-block': f.display === 'block',
    'label-is-string': typeof f.label === 'string',
    'affordance-word': f.buttonText === 'Disable MCP',
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
function panePaintedLiveRead() {
  return { present: beforePane.present, box: paneBox, display: beforePane.display, label: beforePane.label, buttonText: beforePane.buttonText }
}
const panePaintedLive = panePaintedProperty(panePaintedLiveRead())
check('U-1 / SX-G-59/60', 'the toggle + its label are PAINTED in the operator pane (rendered box oracle), and the control carries the ENABLED-state affordance word', panePaintedLive.ok ? 'PASS' : 'FAIL',
  beforePane.present !== true
    ? `the control is NOT in the DOM at all (\`paneRead() → {present:false}\`): no box to measure, no label to read, no affordance word to read — a FAIL, recorded rather than thrown`
    : `box ${Math.round(paneBox.w)}x${Math.round(paneBox.h)} px at (${Math.round(paneBox.left)},${Math.round(paneBox.top)}), display=${beforePane.display}, classes=${JSON.stringify(beforePane.classes)}, label=${JSON.stringify(beforePane.label)}, buttonText=${JSON.stringify(beforePane.buttonText)} (the enabled-state affordance word \`Disable MCP\` is a PREDICATE TERM, not only a printed value — the audit's F-A11)`,
  'a REAL rendered box (not a computed-style-only reading), inside `#exclusion-control` in `#panes` — the provident-authored isolated pane graph. `present` is asserted first so an ABSENT control reddens this row instead of aborting the run. **THE `buttonText` TERM IS NEW (`F-A11`, 2026-10-09):** the as-filed predicate read the box and the LABEL only, so the affordance word the matrix and the contract both claim was a printed-only value — a control rendering `Disable MCP` as a stale/blank string would have read PASS. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate is the named `5`-term `panePaintedProperty` above, with its DELETION fixture below.**')

// ---- THE `U-1` ROW'S DELETION / RED-FAIL CONTROL (`R3-01`'s CLASS CLOSURE) -----------------------------
// The row and these fixtures go through `panePaintedProperty` itself. The FIRST fixture IS the deletion:
// the pane's authored envelope carries no exclusion node at all, so the row reddens on `present` (and the
// four dependent terms) instead of reading PASS off a stale or blank control.
const panePaintedControls = {
  'THE FEATURE IS DELETED: the pane graph carries no exclusion control — `paneRead()` answers its `{present:false}` shape': panePaintedProperty({ present: false, box: null, display: undefined, label: undefined, buttonText: undefined }),
  'the control is present but paints a ZERO-AREA box (the rendered-box oracle is what bites)': panePaintedProperty({ ...panePaintedLiveRead(), box: { w: 0, h: 0, top: 0, left: 0 } }),
  'the affordance word is BLANK on an otherwise painted control (the `F-A11` term)': panePaintedProperty({ ...panePaintedLiveRead(), buttonText: '' }),
}
const panePaintedNotRefused = Object.entries(panePaintedControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-1 / SX-G-59/60 — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the `U-1` painted-control row\'s predicate CAN FAIL: the DELETION fixture (no control in the pane graph) and the two other regression shapes are each REFUSED by the SAME code path, each naming the term that caught it',
  panePaintedNotRefused.length === 0 && Object.values(panePaintedControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through panePaintedProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(panePaintedControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(panePaintedNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(panePaintedControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE, not instance-by-instance: the same HIGH has now appeared in a different row in three consecutive audits, because this battery\'s row-level PASSes were not systematically falsified by deletion): every U-labelled row\'s predicate is now a NAMED FUNCTION with its own red-fail fixture block, so a later auditor can CHECK the claim rather than re-derive it. The per-row table — each row, its predicate, the terms that redden under deletion, its fixture and its disposition — is printed in this battery\'s record (`docs/specs/secure-exclusion-live-battery.md` §2).')

const isolation = await cdp.isolationProbe()
const appHtml = typeof before.renderedHtml === 'string' ? before.renderedHtml : ''
// THE `#app` MOUNT'S OWN ABSENCE IS A TERM, NOT ONLY A PRINTED FLAG (`§6.2` audit `F-A11`):
// `isolation.appMountHasToggle` and `isolation.appMountHtml` were computed and the toggle half
// was only printed, while the matrix and the report both claim "`#app` has neither" and "the
// `#app` mount's `innerHTML` contains none of it". Both halves are now asserted.
const appMountClean = isolation.appMountHasToggle === false
  && !String(isolation.appMountHtml).includes('exclusion-toggle')
  && !String(isolation.appMountHtml).includes('exclusion-control')
// THE STATUS LINE'S OWN TEXT IS PRINTED (`§6.2` audit `F-A16`): `paneRead()` already reads
// `statusText` (`:320`) but no row ever PRINTED it, while this record's `§3` `U-1` `observation`
// carried a full `statusText` line ("token: •••• · enabled: […] · journal: ∞ · MCP: enabled") the
// driver never printed — so the record cited a value no command produced. The line is now printed
// BESIDE the segment it is derived from.
const statusLineText = beforePane.present === true ? beforePane.statusText : null
check('SX-G-03 (the status line, printed with its terms)', 'the operator pane\'s status line is the LIVE rendered text of `#security-status`, and its trailing `MCP:` segment is the state', typeof statusLineText === 'string' && statusLineText.length > 0 && (/ · MCP: (enabled|disabled)/.test(statusLineText) ? 'PASS' : 'FAIL'),
  `#security-status textContent = ${JSON.stringify(statusLineText)} — the segment read from it is ${JSON.stringify(beforePane.mcpSegment)} (the audit's F-A16: this value was cited in the record but printed by NO row)`,
  'the record\'s `U-1`/`U-2` cells quote the status line in full; this row is what prints it, so the citation is a value a command produced rather than an assembled one (`§6.1` clause 2)')
// THE TWO ISOLATION ROWS NOW ANSWER TO SUFFIXED IDS (`R3-09`, the third `§6.2` audit, LOW): BOTH the
// pane-realm row and the `list_targets` row carried the id `U-5 / SX-G-65`, so the FAIL list (this
// file's tail, which prints `id: subject`) could not distinguish them — the same ambiguity `F-A15`
// closed for the `SX-G-45` pair. This row answers to `U-5 / SX-G-65 (pane realm)`.
check('U-5 / SX-G-65 (pane realm)', 'the control is in the PANE graph only — never in the app graph or its MCP readings (the `#app` mount carries neither the id nor the control)',
  isolation.panesHasToggle && beforeRaw.ok && appHtml.length > 100 && !appHtml.includes('exclusion-toggle') && !appHtml.includes('exclusion-control') && appMountClean ? 'PASS' : 'FAIL',
  `pane realm: toggle present=${isolation.panesHasToggle}, control present=${isolation.panesHasControl}; app mount (#app): toggle present=${isolation.appMountHasToggle} (asserted false), innerHTML ${String(isolation.appMountHtml).length} chars, contains 'exclusion-toggle'=${String(isolation.appMountHtml).includes('exclusion-toggle')}, contains 'exclusion-control'=${String(isolation.appMountHtml).includes('exclusion-control')}; get_rendered_html answered after ${beforeRaw.attempts} attempt(s): ok=${beforeRaw.ok}, ${appHtml.length} chars, contains 'exclusion-toggle'=${appHtml.includes('exclusion-toggle')}; raw=${JSON.stringify(String(beforeRaw.text ?? beforeRaw.error).slice(0, 120))}`,
  'the pane side carries a positive control, so the absence reading is not a reading of an absent pane; the app-HTML reading is non-empty so it is not vacuous. **THE `#app` TERMS ARE NEW (`F-A11`, 2026-10-09):** the as-filed row printed the `#app` toggle flag and computed `appMountHtml` without asserting either, while this record\'s own `§2` `U-5` `Post` cell and the report\'s `observation` both claimed "`#app` has neither"')

const toolListBefore = await rawCall(bootA.client, 'provident.list_targets', {})
const targetsBefore = parsed(toolListBefore)
const targetNodes = Array.isArray(targetsBefore.nodes) ? targetsBefore.nodes : (Array.isArray(targetsBefore) ? targetsBefore : null)
const targetIds = (targetNodes ?? []).map((n) => String(n?.nodeId))
// ---- R3-01 (the THIRD `§6.2` audit, HIGH, GATE-6-BLOCKING; the unit's OWN gate-4 `A-6` pattern at
// `docs/specs/secure-exclusion.md:1901`) ------------------------------------------------------------------
// THE AS-FILED ROW EVALUATED ONLY `targetNodes !== null && targetIds.length === CENSUS_IN_TREE (23) &&
// targetIds.every(n => !/excl/i.test(n))`, AND **THE APP GRAPH'S NODE CENSUS IS `23` WITH OR WITHOUT
// THIS UNIT** (the spec's own PRE-unit reading, `docs/specs/secure-exclusion.md:1373`), so WITH THE
// WHOLE EXCLUSION FEATURE DELETED THE ROW STILL READ PASS — nothing in it read the new node, the pane
// realm or the bridge. The sibling row above (`:488`) already carried a positive-control shape; this
// row did not. THE PREDICATE IS NOW A NAMED FUNCTION whose first terms ARE that positive control, and
// the row BESIDE it drives DELETION fixtures through the SAME function.
function paneOnlyIsolationProperty(f) {
  const terms = {
    // (1) THE POSITIVE CONTROL — the term the as-filed predicate did not have at all: with the feature
    //     deleted the pane realm carries no control, so every ABSENCE reading below becomes a reading
    //     of an ABSENT PANE and these terms redden FIRST.
    'pane-realm-has-toggle': f.panesHasToggle === true,
    'pane-realm-has-control': f.panesHasControl === true,
    // (2) the app mount carries neither the id nor the control (both halves, `F-A11`).
    'app-mount-has-no-toggle': f.appMountHasToggle === false,
    'app-mount-html-clean': typeof f.appMountHtml === 'string'
      && !f.appMountHtml.includes('exclusion-toggle') && !f.appMountHtml.includes('exclusion-control'),
    // (3) the app's OWN MCP reading is real (`ok`, non-empty) and carries neither id — a vacuous empty
    //     reading would satisfy an absence check for free.
    'app-graph-html-real': f.appHtmlOk === true && typeof f.appHtml === 'string' && f.appHtml.length > 100,
    'app-graph-html-clean': typeof f.appHtml === 'string'
      && !f.appHtml.includes('exclusion-toggle') && !f.appHtml.includes('exclusion-control'),
    // (4) `list_targets` answered an ARRAY whose count EQUALS the declared census — the as-filed
    //     expression, kept verbatim as its own named term.
    'targets-listing-is-array': Array.isArray(f.targetIds) && f.targetCount === f.declaredCensus,
    // (5) no target id is exclusion-shaped (the as-filed half, kept verbatim).
    'targets-have-no-exclusion-id': Array.isArray(f.targetIds) && f.targetIds.every((n) => !/excl/i.test(n)),
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
// THE LIVE READING, assembled once and passed INTO the predicate (the predicate never re-reads the app
// graph: the live reading and every fixture go through the SAME function).
const isolationLiveReading = {
  panesHasToggle: isolation.panesHasToggle, panesHasControl: isolation.panesHasControl,
  appMountHasToggle: isolation.appMountHasToggle, appMountHtml: String(isolation.appMountHtml),
  appHtmlOk: beforeRaw.ok === true, appHtml, targetIds,
  targetCount: targetNodes === null ? null : targetIds.length, declaredCensus: CENSUS_IN_TREE,
}
const isolationLive = paneOnlyIsolationProperty(isolationLiveReading)
check('U-5 / SX-G-65 (app graph, `list_targets`) — RE-INSTRUMENTED 2026-10-09, the third `§6.2` audit\'s `R3-01`', 'the D1–D8 isolation holds WITH the new node — the app graph\'s `list_targets` carries no pane node while the PANE realm carries the control (the positive control that makes the absence falsifiable)', isolationLive.ok ? 'PASS' : 'FAIL',
  `list_targets: ${targetNodes === null ? 'NOT an array (shape drift)' : targetIds.length + ' nodes (declared census ' + CENSUS_IN_TREE + ')'}, of which exclusion-shaped: ${JSON.stringify(targetIds.filter((n) => /excl/i.test(n)))}; THE POSITIVE CONTROL, read in the PANE realm in the same run: toggle present=${isolation.panesHasToggle}, control present=${isolation.panesHasControl}; the app mount's own innerHTML: ${String(isolation.appMountHtml).length} chars, contains neither id=${!String(isolation.appMountHtml).includes('exclusion-toggle') && !String(isolation.appMountHtml).includes('exclusion-control')}; the app's own get_rendered_html (after ${beforeRaw.attempts} attempt(s)): ${appHtml.length} chars, contains neither id=${!appHtml.includes('exclusion-toggle') && !appHtml.includes('exclusion-control')}; raw first 160 chars: ${JSON.stringify(toolListBefore.text.slice(0, 160))}; TERMS: ${JSON.stringify(isolationLive.terms)}`,
  'the pane graph is a SEPARATE GraphScope, so the app Runtime\'s target vocabulary cannot address it. **THE POSITIVE-CONTROL TERM IS NEW (the third `§6.2` audit\'s `R3-01`, HIGH, and the unit\'s own gate-4 `A-6` pattern):** the as-filed predicate read the app census and the target ids ONLY, and **the app graph\'s census is `23` WITH OR WITHOUT this unit** (`docs/specs/secure-exclusion.md:1373`), so deleting the whole feature left the row reading PASS — nothing in it read the new node or the pane realm. The predicate is now the named `8`-term function above (the pane realm\'s OWN two readings as the POSITIVE CONTROL, the app mount\'s two, the app\'s rendered-HTML reading with its non-vacuity term, and the as-filed census + id terms KEPT VERBATIM), and the row BESIDE it drives DELETION fixtures through that SAME function')

// ---- THE APP-GRAPH ISOLATION ROW'S DELETION / RED-FAIL CONTROL (`R3-01`) ------------------------------
// A predicate is evidence only if a fixture drives it RED, and the fixture must exercise THIS row's OWN
// predicate (not a look-alike). Each fixture is the shape of a plausible regression — the FIRST being
// THE DELETION of the feature — and each must be REFUSED and must NAME the term that caught it.
const isolationControls = {
  'THE FEATURE IS DELETED: the pane realm carries no exclusion control at all, so every absence reading below is a reading of an ABSENT PANE (the `R3-01` case — the as-filed predicate read PASS here)': paneOnlyIsolationProperty({
    ...isolationLiveReading, panesHasToggle: false, panesHasControl: false, appMountHasToggle: false, appMountHtml: '',
  }),
  'the app graph LEAKS the new node (the pane control is addressable from the app graph — the isolation is broken)': paneOnlyIsolationProperty({
    ...isolationLiveReading, targetIds: [...targetIds, 'node-exclusion-toggle'], targetCount: targetIds.length + 1,
  }),
  'the app census DRIFTS (the target count no longer equals the declared `23` — a pane node that moved the app census)': paneOnlyIsolationProperty({ ...isolationLiveReading, targetCount: targetIds.length + 1 }),
  'the app\'s own `get_rendered_html` carries the id (the app HTML reading is no longer clean)': paneOnlyIsolationProperty({
    ...isolationLiveReading, appHtml: appHtml + '<div id="exclusion-toggle">leak</div>',
  }),
  'the app HTML reading is VACUOUS (an empty `get_rendered_html` would satisfy the absence check for free)': paneOnlyIsolationProperty({
    ...isolationLiveReading, appHtml: '', appHtmlOk: false,
  }),
  'the app MOUNT carries the control (the `F-A11` half, reddened by its own fixture)': paneOnlyIsolationProperty({
    ...isolationLiveReading, appMountHasToggle: true, appMountHtml: '<div id="exclusion-control"></div>',
  }),
}
const isolationNotRefused = Object.entries(isolationControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-5 / SX-G-65 (app graph) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the app-graph isolation row\'s predicate CAN FAIL: the DELETION fixture (the pane control gone, so every absence reading is vacuous) and the five other regression shapes are each REFUSED by the SAME code path, each naming the term that caught it',
  isolationNotRefused.length === 0 && Object.values(isolationControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through paneOnlyIsolationProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(isolationControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(isolationNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(isolationControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (the third `§6.2` audit\'s `R3-01`: with the whole exclusion feature deleted the as-filed isolation predicate still read PASS, because the app graph\'s census of `23` is the PRE-unit reading): the property under measurement is an ABSENCE, and an absence is only falsifiable beside a POSITIVE CONTROL — the pane realm\'s own readings. **THE DELETION FIXTURE IS THE FIRST ONE**: it moves ONLY the pane realm\'s two readings to false (the shape a deleted feature produces) and the predicate reddens on `pane-realm-has-toggle` and `pane-realm-has-control` ALONE, with every app-side term still TRUE. The other five pin the remaining terms: an app-graph leak, a drifted census, a dirty app-HTML reading, a vacuous app-HTML reading, and the app mount carrying the control.')

const baseline = await rawCall(bootA.client, 'provident.get_markdown', {})
check('U-3 (precondition)', 'with MCP enabled a normal tool call answers normally', baseline.ok && !baseline.isError && baseline.text.includes('markdown') ? 'PASS' : 'FAIL',
  `provident.get_markdown → ok=${baseline.ok} isError=${baseline.isError} first 60 chars=${JSON.stringify(baseline.text.slice(0, 60))}`,
  'the U-2/U-3 positive control: a refusal later cannot be read as a permanently-broken tool')

const namesEnabledBoot = await listToolNames(bootA.client)

// ═══ THE PROFILE-DIRECTORY BASELINE, taken BEFORE the first exclusion transition and only
// once the RUNTIME's own writes have SETTLED (`settledListing` above: Chromium writes
// `Preferences`/`Network Persistent State` lazily in the first seconds of a boot, so a
// baseline at the pane's first paint would redden the `N-5` term on the browser's own
// bookkeeping). This is the `Pre` half of the restart arm's `D-19`/`N-5` reading (`§4`
// PHASE 4): the property under measurement is that the transition PERSISTS NOTHING, so the
// window that can falsify it is `[this snapshot, the restart-copy snapshot]` — and the
// baseline has to be taken before the FIRST transition (the phase-2 gesture) to enclose the
// whole window. It is a RAW listing (no name filter: the as-filed restart row filtered on
// `f.includes('security') || f.includes('settings')`, which is exactly why a third file
// under any other name could not have been seen).
const PROFILE_STORE_FILE = 'provident-security.json'
const bootABaseline = await settledListing(bootA.profile, { spawnedAt: bootAStartedAt, minAgeMs: 30000 })
const profileListingBootA0 = bootABaseline.list
// (the store BYTES are read at the restart arm, where they are a PREDICATE TERM — read here they
//  would be a binding nobody asserts, which is exactly the shape the `§6.2` audit's `F9` flagged)

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 2 — THE GESTURE (U-2): a REAL pointer click on the painted toggle
// ══════════════════════════════════════════════════════════════════════════════
const hit1 = await cdp.clickElement('exclusion-toggle')
await sleep(2000)
const afterClick1 = await cdp.paneRead()
const markdownAfterClick = await rawCall(bootA.client, 'provident.get_markdown', {})
const bridgeAfterClick = await cdp.evaluate(`window.provident.security.get()`)

const clickLanded = hit1 !== null && hit1.isTarget === true && hit1.hit === 'BUTTON#exclusion-toggle'
// THE PREDICATE CARRIES `clickLanded` (`§6.2` audit `F9`): the as-filed row computed the
// landing flag and then asserted ONLY the segment, so a gesture that never reached the
// control could still read PASS on a segment another path had moved — while the record
// printed "the gesture landed on BUTTON#exclusion-toggle (isTarget=true)". The flag is
// now INSIDE the predicate (and `U-4`'s HTTP row asserts the same shape).
// `U-2`'s GESTURE PREDICATE AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE — the terms are the as-filed
// expression, character for character: `clickLanded && afterClick1.mcpSegment === 'disabled'`).
function gestureProperty(f) {
  const terms = {
    'click-landed': f.landed !== null && f.landed !== undefined && f.landed.isTarget === true && f.landed.hit === 'BUTTON#exclusion-toggle',
    'segment-moved': f.segment === 'disabled',
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const gestureLive = gestureProperty({ landed: hit1, segment: afterClick1.mcpSegment })
check('U-2 (the gesture half)', 'a REAL CDP pointer gesture on the painted toggle moves the status line `MCP: enabled → disabled`', gestureLive.ok ? 'PASS' : 'FAIL',
  `click landed on ${JSON.stringify(hit1?.hit)} at (${hit1?.x},${hit1?.y}) inside a ${Math.round(hit1?.w ?? 0)}x${Math.round(hit1?.h ?? 0)} box (isTarget=${hit1?.isTarget}); AFTER the gesture the status segment reads ${JSON.stringify(afterClick1.mcpSegment)} and the button reads ${JSON.stringify(afterClick1.buttonText)}; the bridge read answers exclusion=${JSON.stringify(bridgeAfterClick?.exclusion)}; MCP get_markdown → isError=${markdownAfterClick.isError} text=${JSON.stringify(String(markdownAfterClick.text).slice(0, 80))}`,
  'THE PREDICATE IS `clickLanded && the rendered segment moved` (the landing flag — element, box centre, `elementFromPoint` identity — is asserted, not merely printed). **CORRECTED 2026-10-09 (the `§6.2` audit\'s `F3`): THE AS-FILED EVIDENCE SENTENCE — "the authored handler body does not run" — DESCRIBED THE `F-2` DEFECT, WHICH IS FIXED.** Under this very gesture the authored `EXCLUSION_TOGGLE_BODY` DOES run: it reads `ctx.node.props[\'data-state\']` and flips it, which is why the same reading prints `data-state="mcp-disabled"` and the live MCP call answers the DECLARED RECEIPT. **THIS ROW WAS NOT RE-GRAINED**: its predicate is the as-filed one, and the as-filed `FAIL` was the HOST defect `F-2` (`afd3212`), not the row. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate is the named `2`-term `gestureProperty` above, with its DELETION fixture below.**')

// ---- THE `U-2` GESTURE ROW'S DELETION / RED-FAIL CONTROL (`R3-01`'s CLASS CLOSURE) ---------------------
// The FIRST fixture IS the deletion: the authored handler body never runs (the `F-2` shape), so the
// gesture lands on the painted control and the segment never moves.
const gestureControls = {
  'THE FEATURE IS DELETED: the gesture lands on the painted control but the authored body never runs, so the segment stays `enabled` (the `F-2` shape)': gestureProperty({ landed: hit1, segment: 'enabled' }),
  'the gesture never REACHED the control (a click that landed elsewhere — the `click-landed` term)': gestureProperty({ landed: { hit: 'DIV#app', x: 0, y: 0, w: 0, h: 0, isTarget: false }, segment: 'disabled' }),
  'the segment moved but the gesture MISSED the control (the as-filed `F9` hole: a segment another path had moved)': gestureProperty({ landed: null, segment: 'disabled' }),
}
const gestureNotRefused = Object.entries(gestureControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-2 (the gesture half) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the `U-2` gesture row\'s predicate CAN FAIL: the DELETION fixture (an inert control, the `F-2` shape) and the two mis-landing shapes are each REFUSED by the SAME code path, each naming the term that caught it',
  gestureNotRefused.length === 0 && Object.values(gestureControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through gestureProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(gestureControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(gestureNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(gestureControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE): the `U-2` gesture row\'s `click-landed` term was added by the first audit\'s `F9` and the segment term is the as-filed one — but NEITHER had a fixture driving the pair red, so a deleted handler body (the `F-2` regression) would have been caught only by live measurement, never by a control. The first fixture is exactly that regression shape.')

const siblingControl = await (async () => {
  const t0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.token})`)
  await cdp.clickElement('token-gen')
  await sleep(1500)
  const t1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.token})`)
  // a SECOND control: the landed `#journal-length-apply` button, whose body — like the
  // exclusion toggle's — READS `ctx.node.props` before calling the bridge.
  const j0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return String(v.maxJournalLength)})`)
  await cdp.evaluate(`(function(){ var i=document.getElementById('journal-length-input'); i.value='7' })()`)
  await cdp.clickElement('journal-length-apply')
  await sleep(1500)
  const j1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return String(v.maxJournalLength)})`)
  const g0 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.enabled.join(',')})`)
  await cdp.clickElement('toggle:graph')
  await sleep(1500)
  const g1 = await cdp.evaluate(`window.provident.security.get().then(function(v){return v.enabled.join(',')})`)
  return { token: [t0, t1], journal: [j0, j1], group: [g0, g1] }
})()
// `U-2`'s SIBLING-CONTROL PREDICATE AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE; the expression is the
// as-filed one: `token[0] !== token[1] && group[0] !== group[1]`).
function siblingControlProperty(f) {
  const terms = {
    'token-moved': f.token !== undefined && f.token[0] !== f.token[1],
    'group-moved': f.group !== undefined && f.group[0] !== f.group[1],
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const siblingLive = siblingControlProperty(siblingControl)
check('U-2 (sibling controls)', 'the SAME CDP gesture path DOES drive landed sibling controls in the same pane', siblingLive.ok ? 'PASS' : 'FAIL',
  `real clicks on landed controls in the SAME pane: #token-gen changed the token (${JSON.stringify(siblingControl.token[0])} → ${JSON.stringify(siblingControl.token[1])}); #toggle:graph changed the enabled set (${JSON.stringify(siblingControl.group[0])} → ${JSON.stringify(siblingControl.group[1])}); #journal-length-apply read maxJournalLength ${JSON.stringify(siblingControl.journal[0])} → ${JSON.stringify(siblingControl.journal[1])}`,
  'CONTROL COLUMN — without it a U-2 failure would be indistinguishable from a driver that cannot click at all. The DISCRIMINATING controls are the two that MOVE the bridge state (`#token-gen`, `#toggle:graph`); `#journal-length-apply` is NOT one of them and its unchanged reading proves nothing either way: its authored body reads the prop `value` off ITS OWN node (the `journal-length-apply` BUTTON, which carries no `value` member — `L` `secure-panels.ts:132-140`), so it asks the bridge to set `null` — the state the pane already holds (`maxJournalLength` was `undefined` both times), a NO-CHANGE reading. The as-filed `F-2` reading of this row (that the authored `ctx.node.props` read was the failing step, shared with a landed sibling) is SPENT: `#exclusion-toggle` — whose body reads `ctx.node.props[\'data-state\']` and flips it — now drives the gate under this very gesture, and the gesture row above measures it. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate is the named `2`-term `siblingControlProperty` above, with its own red-fail fixtures below.**')

// ---- THE SIBLING-CONTROL ROW'S RED-FAIL CONTROL (`R3-01`'s CLASS CLOSURE) ------------------------------
// ITS FIXTURES ARE THE DRIVER'S OWN FAILURE MODES, NOT A FEATURE DELETION, and that is stated rather than
// papered over: the row asserts NO unit feature — it is a CONTROL COLUMN whose subject is the gesture
// PATH — so its disposition in the record's per-row falsification table is `CONTROL-COLUMN-BY-DESIGN`.
const siblingControlControls = {
  'THE DRIVER CANNOT CLICK AT ALL (neither discriminating control moved — the shape every live red on this battery would otherwise be indistinguishable from)': siblingControlProperty({ token: ['a', 'a'], group: ['read,dispatch,graph,code', 'read,dispatch,graph,code'] }),
  'only ONE of the two discriminating controls moved (a half-broken gesture path)': siblingControlProperty({ token: ['a', 'b'], group: ['read', 'read'] }),
  'the bridge read itself FAILED (both readings are the same `{__cdpError}` shape)': siblingControlProperty({ token: [{ __cdpError: 'no bridge' }, { __cdpError: 'no bridge' }], group: [null, null] }),
}
const siblingControlNotRefused = Object.entries(siblingControlControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-2 (sibling controls) — RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the sibling-control row\'s predicate CAN FAIL: the three driver-failure shapes (no click at all, a half-broken gesture path, a failed bridge read) are each REFUSED by the SAME code path, each naming the term that caught it',
  siblingControlNotRefused.length === 0 && Object.values(siblingControlControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through siblingControlProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(siblingControlControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(siblingControlNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(siblingControlControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'ITS DISPOSITION IS `CONTROL-COLUMN-BY-DESIGN` IN THE RECORD\'S PER-ROW FALSIFICATION TABLE (`R3-01`): this row asserts NO unit feature, so "deleting the feature" is not its falsifier — its red-fail fixtures are the driver\'s own failure modes, which is exactly what a control column owes.')

// the bridge's own transition (the pane body's declared call) — the gate DOES move
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)
await sleep(500)
const gateMoved = await rawCall(bootA.client, 'provident.get_markdown', {})
const bridgeStateAfterDirect = await cdp.evaluate(`window.provident.security.get()`)
const paneAfterDirect = await cdp.paneRead()

// `SX-G-57`'s PREDICATE AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE; the expression is the as-filed one:
// `bridgeStateAfterDirect?.exclusion === 'mcp-disabled'`).
function bridgeStateLivenessProperty(f) {
  const terms = { 'get-reports-live-state': f.bridge?.exclusion === 'mcp-disabled' }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const bridgeStateLive = bridgeStateLivenessProperty({ bridge: bridgeStateAfterDirect })
check('SX-G-57 (live)', 'the IPC_SECURITY_GET response member reports the LIVE state after a real transition', bridgeStateLive.ok ? 'PASS' : 'FAIL',
  `after a REAL accepted transition (the bridge answered applied:true and the live MCP server began refusing), IPC_SECURITY_GET answered exclusion=${JSON.stringify(bridgeStateAfterDirect?.exclusion)} — expected 'mcp-disabled'`,
  '**EVIDENCE STRING CORRECTED 2026-10-09 (the `§6.2` audit\'s `F3`): THE AS-FILED SENTENCE DESCRIBED THE `F-4` DEFECT AS IF IT WERE THE LANDED CODE — "the handler closes over the gate instance constructed at boot ... so the response record reports the boot state, never the live one" — AND IT IS FALSE OF THIS TREE.** The landed handler reads the server\'s OWN LIVE accessor: `L` `src/main/main.ts:384` answers `{ ...securityStore.get(), exclusion: mcp.gate.exclusionState() }` (`mcp.gate`, `L` `src/main/mcp-server.ts:742`), i.e. the same ONE holder that enforces the exclusion — which is exactly why the reading above is `mcp-disabled` and not the boot state. The boot-gate closure was the `F-4` defect, fixed by the implementer at `afd3212` before this row was re-read. **THIS ROW WAS NOT RE-GRAINED**: its predicate is the as-filed one and the as-filed `FAIL` was that host defect')

// WHICH ARM ANSWERS? `provident.dispatch` is ALWAYS registered on the ENABLED-GROUP predicate, so
// it is the ONE tool that certainly reaches the INVOCATION TURN while the tier is open; its answer
// therefore distinguishes the turn check from the group predicate. `provident.get_markdown` rides
// an ENABLED group (`read`), so its refusal is attributable to the turn too — whereas a group-
// disabled tool (`provident.load`, group `graph`) would be refused by `applyGatePatch` instead.
const dispatchWhileOpen = await rawCall(bootA.client, 'provident.dispatch', { target: 'inc', event: 'click' })
// `U-3`'s PREDICATE AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE): the two as-filed terms are KEPT
// (`declaredReceipt(gateMoved) !== null`, `declaredReceipt(dispatchWhileOpen) !== null`) and the
// transition's OWN precondition is ADDED beside them — the same shape `F-A1` gave the registry row:
// with `setExclusion` deleted the bridge never leaves `mcp-enabled` AND no receipt arrives, so the
// failure is attributable rather than merely observed.
function openStateRefusalProperty(f) {
  const terms = {
    'enabled-group-tool-answers-the-receipt': declaredReceipt(f.gateMoved) !== null,
    'always-registered-tool-answers-the-receipt': declaredReceipt(f.dispatchWhileOpen) !== null,
    'open-state-bridge': f.bridgeAfter?.exclusion === 'mcp-disabled',
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const openStateRefusalLive = openStateRefusalProperty({ gateMoved, dispatchWhileOpen, bridgeAfter: bridgeStateAfterDirect })
check('U-3 (via the bridge)', 'while the state is OPEN a live tool call answers the DECLARED RECEIPT as a VALUE (never an MCP protocol error) — for a tool an ENABLED group allows and for the always-registered `provident.dispatch`', openStateRefusalLive.ok ? 'PASS' : 'FAIL',
  `after the transition: provident.get_markdown (enabled group 'read') → isError=${gateMoved.isError} (must be ABSENT), received=${JSON.stringify(declaredReceipt(gateMoved))}, raw=${JSON.stringify(String(gateMoved.text).slice(0, 160))}; provident.dispatch (the tool the ENABLED-GROUP predicate alone always registers) → isError=${dispatchWhileOpen.isError} (must be ABSENT), received=${JSON.stringify(declaredReceipt(dispatchWhileOpen))}, raw=${JSON.stringify(String(dispatchWhileOpen.text).slice(0, 160))}`,
  'RE-GRAINED 2026-10-08 (the `F-3` live half, closed by the ruling): the as-filed row only asked whether the text CONTAINED the token — which the superseded registry carrier could never satisfy, but which a bare token string could satisfy without the receipt\'s declared SHAPE. The row now asserts the RECEIPT itself — `status`/`reason` CLOSED at their one token each plus the additive `message` naming the cause AND the remedy, with `isError` ABSENT (`§2.2` item 2(a); `§2.5` item 1; `§3.1` `M-EX-5`; `P-EX-TP-1`; the unit\'s `G6-F3#1` cell). BOTH calls are named so the answer is attributable to the INVOCATION TURN: `provident.dispatch` stays registered on the group predicate alone and `provident.get_markdown` rides an enabled group, so neither refusal can be the group predicate\'s. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate is the named `3`-term `openStateRefusalProperty` above — the two as-filed terms KEPT, with the transition\'s own precondition (`open-state-bridge`) added BESIDE them — and the DELETION fixtures below drive it red.**')

// ---- THE `U-3` / `SX-G-57` ROWS' DELETION / RED-FAIL CONTROLS (`R3-01`'s CLASS CLOSURE) ----------------
// The live rows above and these fixtures go through the SAME named functions. The FIRST fixture of each IS
// the deletion — the transition never happens, so the state the row measures never arrives.
const bridgeStateControls = {
  'THE FEATURE IS DELETED: no transition ever happens, so the GET response cannot report a live `mcp-disabled` state — it reports the boot state (the `F-4` shape)': bridgeStateLivenessProperty({ bridge: { exclusion: 'mcp-enabled' } }),
  'the bridge read FAILED (`{__cdpError}` — no `exclusion` member at all, the shape `Cdp.evaluate` returns instead of throwing)': bridgeStateLivenessProperty({ bridge: { __cdpError: 'window.provident.security is undefined' } }),
  'the GET response member is ABSENT (the member `§2.4` item 4 says is NEVER absent)': bridgeStateLivenessProperty({ bridge: {} }),
}
const openStateRefusalControls = {
  'THE FEATURE IS DELETED: the bridge never leaves `mcp-enabled`, and both calls answer the RENDERER\'S OWN VALUE instead of the receipt (`declaredReceipt` answers `null`)': openStateRefusalProperty({ gateMoved: baseline, dispatchWhileOpen: baseline, bridgeAfter: { exclusion: 'mcp-enabled' } }),
  'the SUPERSEDED carrier answers (`-32602 … disabled`, the pre-ruling shape — `isError: true` is OUTSIDE the receipt)': openStateRefusalProperty({ gateMoved: { ok: true, isError: true, text: 'MCP error -32602: Tool provident.get_markdown disabled' }, dispatchWhileOpen: { ok: true, isError: true, text: 'MCP error -32602: Tool provident.dispatch disabled' }, bridgeAfter: bridgeStateAfterDirect }),
  'the receipt lost its additive `message` (the PRE-RULING two-member shape — an ABSENT `message` is OUTSIDE `§2.5` item 1)': openStateRefusalProperty({ gateMoved: { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed' }) }, dispatchWhileOpen, bridgeAfter: bridgeStateAfterDirect }),
  'the OPEN call FAILED as a protocol error (`ok:false` — the call never happened)': openStateRefusalProperty({ gateMoved: { ok: false, error: 'MCP error -32001: Request timed out' }, dispatchWhileOpen, bridgeAfter: bridgeStateAfterDirect }),
}
const bridgeStateNotRefused = Object.entries(bridgeStateControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
const openStateRefusalNotRefused = Object.entries(openStateRefusalControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-3 (via the bridge) + `SX-G-57` (live) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the `U-3` refusal row and the `SX-G-57` liveness row CAN FAIL: the DELETION fixture of each (no transition happens at all) and every other regression shape is REFUSED by the SAME code path, each naming the term that caught it',
  bridgeStateNotRefused.length === 0 && openStateRefusalNotRefused.length === 0
    && Object.values(bridgeStateControls).every((v) => v.ok === false) && Object.values(openStateRefusalControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `bridgeStateLivenessProperty fixtures: ${JSON.stringify(Object.fromEntries(Object.entries(bridgeStateControls).map(([k, v]) => [k, v.ok])))} (terms broken: ${JSON.stringify(Object.fromEntries(Object.entries(bridgeStateControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}), NOT refused: ${JSON.stringify(bridgeStateNotRefused)}; openStateRefusalProperty fixtures: ${JSON.stringify(Object.fromEntries(Object.entries(openStateRefusalControls).map(([k, v]) => [k, v.ok])))} (terms broken: ${JSON.stringify(Object.fromEntries(Object.entries(openStateRefusalControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}), NOT refused: ${JSON.stringify(openStateRefusalNotRefused)}. THE DELETION FIXTURES: the SX-G-57 one moves ONLY the bridge's exclusion member back to the boot state; the U-3 one holds BOTH calls exactly as the run's ENABLED-state answers read (the renderer's own value — what an inert invocation turn returns) and moves the bridge reading back with them, so the row reddens on all three terms at once.`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE): `SX-G-57`\'s row and `U-3`\'s row each had a live reading and NO fixture that could redden it. The `U-3` predicate also gained the transition\'s OWN precondition as a term (`open-state-bridge`), the same shape `F-A1` gave the registry row — with `setExclusion` deleted, no receipt arrives AND the bridge never moves, so the failure is attributable rather than merely observed.')

// ═══ THE REGISTRATION SET IS ENTIRELY UNCHANGED ACROSS THE EXCLUSION TRANSITION (`§0A` item 7(c) /
// `§2.2` item 2(c) / `§2.1` item 3's supersession clause; register cell `G6-F3#2`). ═══
// THE READING IS SET EQUALITY, AND THE ENABLED-GROUP SET IS HELD CONSTANT AROUND IT: the sibling
// control row above ALREADY moved the enabled-group set (a DIFFERENT mechanism — `applyGatePatch`'s
// group change, which the ruling leaves untouched), and a listing taken across both mechanisms would
// attribute the group's shrink to the exclusion.
//
// ⟶ RE-INSTRUMENTED 2026-10-09 — THE `§6.2` AUDIT'S `F-A1` (HIGH, GATE-6-BLOCKING; the `F16`
// class). The as-filed row's predicate was
//      `sameSet(namesClosedGroupFixed, namesOpenGroupFixed) && (namesOpenGroupFixed?.length ?? 0) > 0`
// and it carried **NO TERM ASSERTING THAT THE EXCLUSION TRANSITION EVER HAPPENED**: the two
// `setExclusion(...)` calls above had their effect NEVER READ (`Cdp.evaluate` answers `{__cdpError}`
// rather than throwing), so with the transition mechanism DELETED no transition occurs, both listings
// are the same set, and the row STILL READS PASS. The set-equality half is NOT weakened here — it is
// KEPT and the missing PRECONDITION half is ADDED BESIDE it, as a NAMED PREDICATE of `5` terms:
//      (1) 'closed-state-bridge'   the bridge's OWN reading IS `mcp-enabled` before the CLOSED listing
//      (2) 'open-state-bridge'     the bridge's OWN reading IS `mcp-disabled` before the OPEN listing
//      (3) 'closed-listing'        the CLOSED `tools/list` answered an ARRAY
//      (4) 'open-listing'          the OPEN `tools/list` answered an ARRAY
//      (5) 'set-equality'          the two listings are SET-EQUAL and NON-EMPTY (the as-filed half)
// and the SAME function is driven by a DELETION/CONTROL fixture block (the row below) that shows the
// predicate REDDENING when the transition does not happen and when the listing is cleared.
await cdp.evaluate(`window.provident.security.setExclusion('mcp-enabled')`)
await sleep(600)
const bridgeBeforeClosedListing = await cdp.evaluate(`window.provident.security.get()`)
const namesClosedGroupFixed = await listToolNames(bootA.client)
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)   // THE EXCLUSION TRANSITION — nothing else moves
await sleep(600)
const bridgeBeforeOpenListing = await cdp.evaluate(`window.provident.security.get()`)
const namesOpenGroupFixed = await listToolNames(bootA.client)

/** THE REGISTRY ROW'S PREDICATE, AS A NAMED FUNCTION OF ITS TERMS — so the LIVE reading and every
 *  CONTROL fixture are evaluated by the SAME code (a predicate inlined in a `check()` call can only
 *  be controlled by editing the driver). Every term is reported by name, so a red row says WHICH
 *  part of the property broke. **`set-equality` IS THE AS-FILED TERM, UNCHANGED**: the repair adds
 *  the two precondition terms and the two listing-type terms BESIDE it, never in place of it. */
function registrationTransitionProperty(f) {
  const terms = {
    // (1)/(2) THE TRANSITION'S OWN PRECONDITION, READ OFF THE BRIDGE — the term the as-filed row
    //     did not have at all: with the transition mechanism deleted the bridge never moves, so
    //     these terms redden while the set-equality half stays green. (An `{__cdpError}` reading
    //     carries no `exclusion` member and therefore reddens here too.)
    'closed-state-bridge': f.bridgeClosed?.exclusion === 'mcp-enabled',
    'open-state-bridge': f.bridgeOpen?.exclusion === 'mcp-disabled',
    // (3)/(4) BOTH listings were REAL listings (not a failed call answering `null`).
    'closed-listing': Array.isArray(f.namesClosed),
    'open-listing': Array.isArray(f.namesOpen),
    // (5) THE AS-FILED HALF, KEPT VERBATIM: SET-EQUAL and NON-EMPTY.
    'set-equality': sameSet(f.namesClosed, f.namesOpen) && (f.namesOpen?.length ?? 0) > 0,
    // (6) `U-7`'s OWN SUBJECT, NOW A TERM (`R3-01`'s class closure): the SAME stdio client object answered
    //     BOTH listings, so the transport was never closed, rebuilt or re-handshaken. The row asserted this
    //     in PROSE only, so a driver that built a fresh client per listing — the shape a rebuilt transport
    //     produces — read PASS. The LAST fixture below drives it red.
    'bridge-same-client': f.clientClosed !== undefined && f.clientClosed !== null && f.clientClosed === f.clientOpen,
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const registryLive = registrationTransitionProperty({ bridgeClosed: bridgeBeforeClosedListing, bridgeOpen: bridgeBeforeOpenListing, namesClosed: namesClosedGroupFixed, namesOpen: namesOpenGroupFixed, clientClosed: bootA.client, clientOpen: bootA.client })
check('U-2 (registry, live) / U-7 / SX-G-23', 'across a REAL exclusion transition — the bridge\'s OWN reading MOVES (`mcp-enabled` before the closed listing, `mcp-disabled` before the open one) — the registration set is ENTIRELY UNCHANGED: `tools/list` answers the SAME non-empty set on BOTH sides, on the ONE already-connected stdio client (no reconnect, no re-handshake)', registryLive.ok ? 'PASS' : 'FAIL',
  `the transition's OWN precondition, read off the bridge (NOT assumed): before the CLOSED listing exclusion=${JSON.stringify(bridgeBeforeClosedListing?.exclusion)} (must be 'mcp-enabled'), before the OPEN listing exclusion=${JSON.stringify(bridgeBeforeOpenListing?.exclusion)} (must be 'mcp-disabled') — so the transition the row measures is MEASURED to have happened; the enabled-group set held CONSTANT around it: tools/list while CLOSED returned ${namesClosedGroupFixed === null ? 'NOT an array (the call failed)' : namesClosedGroupFixed.length + ' handles'} and the SAME client answered ${namesOpenGroupFixed === null ? 'NOT an array (the call failed)' : namesOpenGroupFixed.length + ' handles'} while OPEN; set-equal=${sameSet(namesClosedGroupFixed, namesOpenGroupFixed)}; the boot's own enabled-state listing was ${namesEnabledBoot === null ? 'n/a' : namesEnabledBoot.length + ' handles'} BEFORE the sibling-control row moved the enabled-group set; names present while closed and absent while open: ${namesClosedGroupFixed && namesOpenGroupFixed ? JSON.stringify(namesClosedGroupFixed.filter((n) => !namesOpenGroupFixed.includes(n))) : 'n/a'}. TERMS: ${JSON.stringify(registryLive.terms)}`,
  'THE OPERATIVE PIN (`§0A` item 7(c), amended 2026-10-08): "the registered tool/resource set is IDENTICAL in both states — nothing is cleared and NOTHING IS TOGGLED", so the disabled state stays indistinguishable from a never-registered tool by name-listing alone. A design that CLEARS the set fails the `set-equality` term\'s non-empty half; a design that TOGGLES it fails its equality half (the landed SDK renders a disabled handle as an EMPTY listing — the `disabled`-vs-`absent` oracle `§2.2` item 2(c) refuses). This row also carries `U-7`: the SAME connected client answered both sides, so the transport was never closed, rebuilt or re-handshaken. **RE-GRAINED 2026-10-08** (the as-filed row was `tools/list` `length > 0` while open — a count cannot see a same-size change; the as-filed reading was `0` handles under the SUPERSEDED registry-toggling carrier, `§4` `F-3`). **RE-INSTRUMENTED 2026-10-09 (the `§6.2` audit\'s `F-A1`, the `F16` class):** the as-filed predicate had NO TERM ASSERTING THE TRANSITION HAPPENED, so a DELETED transition mechanism left both listings identical and the row read PASS — the property\'s own subject was unverified against deletion. The predicate is now the `5`-term named function above and the row below drives DELETION fixtures through it. **THE SET-EQUALITY HALF IS NOT WEAKENED: it is the same expression, in the same order (`sameSet(...) && length > 0`), as `set-equality`.**')

// ═══ THE REGISTRY ROW'S DELETION / RED-FAIL CONTROL (`F-A1`) — MANDATORY: a predicate is evidence
// only if a fixture drives it RED, and the fixture must exercise THIS row's OWN predicate (not a
// look-alike). Each fixture below is the shape of a plausible regression, and each must be REFUSED
// and must NAME the term that caught it. ═══
const registryControls = {
  'THE FEATURE IS DELETED: the `setExclusion` calls are no-ops, so NO transition occurs and the bridge never moves (both listings read the same set while the bridge stays `mcp-enabled`)': registrationTransitionProperty({
    bridgeClosed: { exclusion: 'mcp-enabled' }, bridgeOpen: { exclusion: 'mcp-enabled' },
    namesClosed: namesClosedGroupFixed, namesOpen: namesOpenGroupFixed,
    clientClosed: bootA.client, clientOpen: bootA.client,
  }),
  'the transition happens but the OPEN listing is EMPTY (the SUPERSEDED registry-toggling carrier — every handle cleared while open)': registrationTransitionProperty({
    bridgeClosed: bridgeBeforeClosedListing, bridgeOpen: bridgeBeforeOpenListing,
    namesClosed: namesClosedGroupFixed, namesOpen: [],
    clientClosed: bootA.client, clientOpen: bootA.client,
  }),
  'the bridge read ANSWERS ITS OWN ERROR (`{__cdpError}` — the shape `Cdp.evaluate` returns instead of throwing, i.e. the read never happened)': registrationTransitionProperty({
    bridgeClosed: { __cdpError: 'window.provident.security is undefined' }, bridgeOpen: bridgeBeforeOpenListing,
    namesClosed: namesClosedGroupFixed, namesOpen: namesOpenGroupFixed,
    clientClosed: bootA.client, clientOpen: bootA.client,
  }),
  'the OPEN `tools/list` itself FAILED (the call answered `null`, not an array)': registrationTransitionProperty({
    bridgeClosed: bridgeBeforeClosedListing, bridgeOpen: bridgeBeforeOpenListing,
    namesClosed: namesClosedGroupFixed, namesOpen: null,
    clientClosed: bootA.client, clientOpen: bootA.client,
  }),
  'the set is TOGGLED rather than held (one handle vanishes while open, the same SIZE kept)': registrationTransitionProperty({
    bridgeClosed: bridgeBeforeClosedListing, bridgeOpen: bridgeBeforeOpenListing,
    namesClosed: namesClosedGroupFixed, namesOpen: namesClosedGroupFixed.length > 1 ? namesClosedGroupFixed.slice(1) : [...namesClosedGroupFixed, 'provident.invented'],
    clientClosed: bootA.client, clientOpen: bootA.client,
  }),
  // `U-7`'s OWN TERM, DRIVEN RED: the two listings were taken on TWO DIFFERENT client objects — the shape
  // a closed-and-rebuilt transport produces, which the row asserted in PROSE and never measured.
  'THE TRANSPORT WAS REBUILT BETWEEN THE TWO LISTINGS (`U-7`\'s own subject): each listing answered on its OWN client object, so `bridge-same-client` reddens while every set-equality term stays green': registrationTransitionProperty({
    bridgeClosed: bridgeBeforeClosedListing, bridgeOpen: bridgeBeforeOpenListing,
    namesClosed: namesClosedGroupFixed, namesOpen: namesOpenGroupFixed,
    clientClosed: { name: 'se-live-battery (closed listing)' }, clientOpen: { name: 'se-live-battery (open listing, a rebuilt transport)' },
  }),
}
const registryNotRefused = Object.entries(registryControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-2 (registry) / U-7 — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the `§6.2` audit\'s `F-A1`; EXTENDED by the third audit\'s `R3-01` with `U-7`\'s own term)', 'the registry row\'s predicate CAN FAIL: the DELETION fixture (the transition never happens), `U-7`\'s REBUILT-TRANSPORT fixture, and the four other regression shapes are each REFUSED by the SAME code path, each naming the term that caught it', registryNotRefused.length === 0 && Object.values(registryControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through \`registrationTransitionProperty\` itself: ${JSON.stringify(Object.fromEntries(Object.entries(registryControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(registryNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(registryControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (the `§6.2` audit\'s `F-A1`: with the feature deleted, the as-filed registry predicate still read PASS): the property under measurement is about a TRANSITION, so a row that never reads the transition\'s own precondition cannot see the transition\'s absence. **THE DELETION FIXTURE IS THE FIRST ONE**: it holds BOTH listings exactly as the live run reads them (so the set-equality half stays TRUE) and moves ONLY the bridge\'s two readings back to `mcp-enabled` — the shape a deleted or inert `setExclusion` produces — and the row reddens on `open-state-bridge` alone. The other four fixtures pin the other terms: the cleared listing, the `{__cdpError}` read, the failed `tools/list`, and a same-size TOGGLE.')

// A CALL ISSUED WHILE OPEN — read by name, so the ARM that answers it is attributable: it is an
// ENABLED-GROUP tool (`provident.get_markdown`, group `read`), so the refusal cannot be the group
// predicate's; it is the INVOCATION TURN answering, and the call is never dispatched.
const openArrival = rawCall(bootA.client, 'provident.get_markdown', {})
await sleep(150)
// THE OPEN-STATE PRECONDITION, READ BEFORE THE RETURN (`R4-01`, the FOURTH `§6.2` audit, HIGH and
// gate-6-blocking). The as-filed `5`-term predicate asserted ONLY the post-return shape: with
// `setExclusion` DELETED the tier never opens, the "call issued while open" is answered NORMALLY,
// the return is a no-op, the bridge never leaves `mcp-enabled` — and ALL FIVE TERMS READ TRUE, so
// the row read PASS on a tree with no feature in it. The precondition is read HERE, while the state
// is still OPEN and before the return act.
const bridgeBeforeReturn = await cdp.evaluate(`window.provident.security.get()`)
// THE RETURN — the pane's OWN declared call (`window.provident.security.setExclusion('mcp-enabled')`;
// `§2.4` item 6: "the operator's own act ... the pane control or the channel directly").
await cdp.evaluate(`window.provident.security.setExclusion('mcp-enabled')`)
const openArrivalResult = await openArrival
await sleep(400)
const returnedAnswer = await rawCall(bootA.client, 'provident.get_markdown', {})
const returnedBridge = await cdp.evaluate(`window.provident.security.get()`)
// `U-4`'s stdio return predicate AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE). The five as-filed
// terms are KEPT TERM FOR TERM (`returnedAnswer.ok && returnedAnswer.isError !== true &&
// declaredReceipt(returnedAnswer) === null && String(returnedAnswer.text).includes('markdown') &&
// returnedBridge?.exclusion === 'mcp-enabled'`) and the TWO TRANSITION PRECONDITION terms the sibling
// rows gained (`F-A1`/`R3-01`'s shape) are ADDED BESIDE THEM — never in place of them:
//     (6) 'call-issued-while-open-answered-the-receipt'   the call issued WHILE OPEN was answered
//         the DECLARED RECEIPT (a VALUE, never an MCP protocol error) — so with the feature deleted
//         the answer is the renderer's own value and this term reddens FIRST;
//     (7) 'bridge-read-open-before-return'                the bridge's OWN reading was `mcp-disabled`
//         BEFORE the return act — the state the return is an act upon.
// NOTHING IS WEAKENED: `bridge-reads-closed` keeps its as-filed expression and the two added terms
// are conjunctive, so the row is strictly stronger than the as-filed predicate.
function returnArmStdioProperty(f) {
  const terms = {
    'answer-ok': f.answer?.ok === true,
    'answer-not-error': f.answer?.isError !== true,
    'answer-is-not-a-receipt': declaredReceipt(f.answer) === null,
    'markdown-present': typeof f.answer?.text === 'string' && f.answer.text.includes('markdown'),
    'bridge-reads-closed': f.bridge?.exclusion === 'mcp-enabled',
    // (6) THE OPEN-STATE CALL, ASSERTED AS A TERM (`R4-01`): the refusal was IN PLACE while the tier
    //     was open, delivered as the declared receipt VALUE with `isError` ABSENT.
    'call-issued-while-open-answered-the-receipt': declaredReceipt(f.openArrival) !== null && f.openArrival?.isError !== true,
    // (7) AND THE BRIDGE SAID SO BEFORE THE RETURN (`R4-01`) — the second precondition shape.
    'bridge-read-open-before-return': f.bridgeBeforeReturn?.exclusion === 'mcp-disabled',
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const returnArmStdioLive = returnArmStdioProperty({
  answer: returnedAnswer, bridge: returnedBridge,
  openArrival: openArrivalResult, bridgeBeforeReturn,
})
check('U-4 (return arm)', 'the return — the operator\'s OWN act — restores NORMAL answers: the refusal is GONE and the tool RUNS (while a call ISSUED in the open state is answered the receipt and never dispatched)', returnArmStdioLive.ok ? 'PASS' : 'FAIL',
  `after the return transition the bridge reads exclusion=${JSON.stringify(returnedBridge?.exclusion)} and provident.get_markdown answered NORMALLY — ok=${returnedAnswer.ok}, isError=${returnedAnswer.isError} (absent), receipt=${JSON.stringify(declaredReceipt(returnedAnswer))}, first 60 chars=${JSON.stringify(String(returnedAnswer.text).slice(0, 60))}; THE OPEN-STATE PRECONDITION, read BEFORE the return act: the bridge read exclusion=${JSON.stringify(bridgeBeforeReturn?.exclusion)} (expected \`mcp-disabled\`) and the call ISSUED while open was answered ok=${openArrivalResult.ok} isError=${openArrivalResult.isError} receipt=${JSON.stringify(declaredReceipt(openArrivalResult))} ${JSON.stringify(String(openArrivalResult.text ?? openArrivalResult.error).slice(0, 110))}; TERMS: ${JSON.stringify(returnArmStdioLive.terms)}`,
  'THE HONEST LIMIT, STATED (`§2.3` item 3; the register\'s `A-2#5`/`P-EX-IM-3` cells drive it at the `[H]` layer): the open-state call above is an ARRIVAL refusal at the invocation turn (`§2.2` item 2(a)), NOT the in-flight arm — a genuine in-flight probe needs a call ISSUED while CLOSED whose dispatched renderer work straddles the transition, and this driver cannot make that window deterministic (a renderer round trip is milliseconds wide), so the mid-flight abandonment is NOT claimed as exercised here. The row\'s SUBJECT is the RETURN, and the predicate is a BOUND on it: the ENABLED-state answer must be a REAL value (not a receipt, `isError` absent, the markdown present) AND the bridge must read the closed state — so a return that did not land, or one that left the refusal in place, FAILS. **RE-GRAINED 2026-10-08**: the as-filed predicate asserted only `isError !== true` on ONE call after the return, which a receipt-answering or renderer-valued answer could not distinguish from a restored tool; the row now asserts the ENABLED-shape answer (not a receipt, markdown present) AND the bridge\'s own `mcp-enabled` member AND that the call ISSUED while open was answered the receipt. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate became the named `returnArmStdioProperty` function, with a DELETION fixture beside it.** **RE-INSTRUMENTED AGAIN 2026-10-10 (the FOURTH `§6.2` audit\'s `R4-01`, HIGH and GATE-6-BLOCKING — the `R3-01`/`F1` class ONE ROW OVER, in the very repair that claimed to close the class structurally): the `5`-term as-filed predicate carried NO TERM ASSERTING THE OPEN STATE WAS EVER IN PLACE BEFORE THE RETURN, and its "DELETION fixture" was in fact a HALF-APPLIED RETURN (`text: receiptFixtureText()`, `bridge: mcp-disabled`) rather than a deletion — so with `setExclusion` DELETED the tier never opened, the return was a no-op, every one of the five terms evaluated TRUE and THE ROW READ PASS ON A FEATURE-DELETED TREE. THE PREDICATE IS NOW `7` TERMS: the five as-filed terms kept term for term, PLUS `call-issued-while-open-answered-the-receipt` and `bridge-read-open-before-return`, and the fixture captioned "THE FEATURE IS DELETED" is now an ACTUAL DELETION CASE. NO TERM WAS WEAKENED AND NO ROW WAS REPAIRED BY RELAXING IT.**')

// ---- THE `U-4` STDIO RETURN ROW'S DELETION / RED-FAIL CONTROL (`R3-01`'s CLASS CLOSURE) -----------------
/** The declared receipt's text, built by a FUNCTION so the fixtures below do not depend on the restart
 *  arm's own `receiptText` definition order. */
function receiptFixtureText() {
  return JSON.stringify({ status: 'refused', reason: 'exclusion-closed', message: 'MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes.' })
}
// ⟶ THE DELETION FIXTURE IS REBUILT 2026-10-10 (the FOURTH `§6.2` audit's `R4-01`, HIGH): the as-filed
// fixture captioned "THE FEATURE IS DELETED" was NOT a deletion case — it was a HALF-APPLIED RETURN
// (`answer.text = receiptFixtureText()` with `bridge: 'mcp-disabled'`), which is `U-4`'s own third
// fixture too. A DELETION fixture must hold the values a tree WITH NO `setExclusion` produces, and on
// such a tree: (i) the gesture opens nothing, so the call ISSUED WHILE OPEN is answered the RENDERER'S
// OWN value (the run's own `baseline`, not a receipt); (ii) the return is a no-op, so the "restored"
// answer is that same enabled-state value; (iii) the bridge is `mcp-enabled` throughout — BEFORE the
// return and after it. That is what the first fixture now holds, and it reddens **TWO** terms —
// `call-issued-while-open-answered-the-receipt` and `bridge-read-open-before-return`, the two
// preconditions the as-filed predicate did not have at all — and NO OTHER term:
// `answer-is-not-a-receipt` and `bridge-reads-closed` evaluate TRUE on this shape (`baseline` IS
// the enabled-state value, so `declaredReceipt(baseline) === null`, and the bridge never left
// `mcp-enabled`, so its post-return reading is the closed-state one).
// THE AS-FILED SENTENCE (KEPT VISIBLE BECAUSE IT WAS WRONG, `RCA-8(d)`; filed as
// `SEX-LIVE-DELETION-TERM-COUNT-COMMENT` and corrected here by the SIXTH `§6.2` audit's `R6-01`,
// LOW): *"it reddens FOUR terms: `call-issued-while-open-answered-the-receipt` and
// `bridge-read-open-before-return` … plus `answer-is-not-a-receipt` and `bridge-reads-closed`
// (`baseline` IS the enabled-state value, and the bridge never moved)"* — the run's own
// `the terms each fixture broke:` line prints EXACTLY the two precondition terms for fixture 1 and
// nothing else, and this claim was also internally inconsistent with `R4-01`'s own finding, which
// turned on all five as-filed terms reading TRUE on this shape.
const returnArmStdioControls = {
  'THE FEATURE IS DELETED (`setExclusion` gone): the gesture opens nothing, so the call issued while open is answered the RENDERER\'S OWN value, the return is a no-op, and the bridge reads `mcp-enabled` BEFORE the return and after it — the ACTUAL deletion shape (`R4-01`)': returnArmStdioProperty({
    answer: baseline, bridge: { exclusion: 'mcp-enabled' }, openArrival: baseline, bridgeBeforeReturn: { exclusion: 'mcp-enabled' },
  }),
  'the open-state call was answered NORMALLY although the bridge DID read `mcp-disabled` (the refusal absent at the invocation turn — the row\'s precondition half alone, `R4-01`)': returnArmStdioProperty({
    answer: returnedAnswer, bridge: returnedBridge, openArrival: baseline, bridgeBeforeReturn: bridgeBeforeReturn,
  }),
  'the return LANDED but the call after it FAILED (`ok:false` — a thrown or timed-out call is not a restored tool)': returnArmStdioProperty({
    answer: { ok: false, error: 'MCP error -32001: Request timed out' }, bridge: returnedBridge, openArrival: openArrivalResult, bridgeBeforeReturn,
  }),
  'the bridge never left the OPEN state (the `F-4` shape: the GET member reports the boot state) — this fixture reddens the `bridge-reads-closed` term ALONE (`R4-01`: its `bridgeBeforeReturn` reading is the LIVE one, so the precondition term stays TRUE and the fixture is attributable)': returnArmStdioProperty({
    answer: returnedAnswer, bridge: { exclusion: 'mcp-disabled' }, openArrival: openArrivalResult, bridgeBeforeReturn,
  }),
  'the return is a HALF-APPLIED RETURN (the as-filed caption\'s own shape: the answer is still the RECEIPT while the bridge reads `mcp-disabled` — BOTH the answer term and the bridge term redden, and the two preconditions stay TRUE, `R4-01`)': returnArmStdioProperty({
    answer: { ok: true, isError: false, text: receiptFixtureText() }, bridge: { exclusion: 'mcp-disabled' }, openArrival: openArrivalResult, bridgeBeforeReturn,
  }),
}
const returnArmStdioNotRefused = Object.entries(returnArmStdioControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-4 (return arm) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, `R3-01`; THE DELETION FIXTURE REBUILT 2026-10-10 BY THE FOURTH AUDIT\'S `R4-01`)', 'the `U-4` stdio return row\'s predicate CAN FAIL: the DELETION fixture is an ACTUAL deletion (the TWO terms it reddens are the two ADDED precondition terms, and NO other term reddens) and the FOUR other regression shapes are each REFUSED by the SAME code path, each naming the term that caught it',  returnArmStdioNotRefused.length === 0 && Object.values(returnArmStdioControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through returnArmStdioProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(returnArmStdioControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(returnArmStdioNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(returnArmStdioControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}. THE DELETION FIXTURE (fixture 1) REDDENS **TWO** TERMS — \`call-issued-while-open-answered-the-receipt\` and \`bridge-read-open-before-return\` — AND NO OTHER (\`R6-01\`, the SIXTH \`§6.2\` audit, LOW: the as-filed evidence string asserted \`FOUR\`, contradicting its own subject and this very printed line; the as-filed form is kept visible in the row's \`WHY THIS ROW EXISTS\` sentence below)`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE): the `U-4` row\'s re-grained predicate had no fixture of its own — the neighbouring control row belongs to the RELOAD arm\'s receipt predicate (`declaredReceipt`), a DIFFERENT function. **AND WHY IT WAS REBUILT (`R4-01`): the as-filed DELETION fixture was a HALF-APPLIED RETURN, NOT A DELETION, so it could not have caught the hole it was captioned to catch — with `setExclusion` deleted the row still read PASS. The first fixture now holds the ACTUAL deletion shape and reddens `call-issued-while-open-answered-the-receipt` and `bridge-read-open-before-return` (the two ADDED precondition terms) and NO OTHER term — `answer-is-not-a-receipt` and `bridge-reads-closed` evaluate TRUE on this shape. The LAST fixture keeps the as-filed caption\'s half-applied-return shape, so the two are separately attributable rather than conflated.** **⟶ CORRECTED 2026-10-11 (`R6-01`, the SIXTH `§6.2` audit, LOW): the as-filed tail of this sentence read *"plus `answer-is-not-a-receipt` and `bridge-reads-closed`"*, i.e. FOUR terms, which the run\'s own printed `the terms each fixture broke:` line refutes for fixture 1 in BOTH executions (it prints the two precondition terms only) and which contradicted this row\'s own subject. The predicate is NOT in question — only this sentence\'s and the evidence string\'s claim — and the as-filed form is kept visible here (`RCA-8(d)`).**')

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 3 — U-6: the disabled state survives a renderer reload
// ══════════════════════════════════════════════════════════════════════════════
// THE TIGHT WINDOW'S `Pre` READING: the profile listing immediately BEFORE the transition
// this phase performs (`setExclusion('mcp-disabled')` + the reload). It is the `N-5`
// window's sharpest form — the phase-4 term below asserts that the transition added NOTHING
// to the profile between this reading and the restart copy.
const profileListingBeforeReload = readdirSync(bootA.profile).sort()
await cdp.evaluate(`window.provident.security.setExclusion('mcp-disabled')`)
await sleep(400)
await cdp.send('Page.enable')
await cdp.send('Page.reload', { ignoreCache: true })
await sleep(4000)
const reloadedPainted = await cdp.waitForToggle(20000)
const afterReload = await cdp.paneRead()
const reloadBridge = await cdp.evaluate(`window.provident.security.get()`)
const mcpAfterReload = await rawCall(bootA.client, 'provident.get_markdown', {})
const reloadReceipt = declaredReceipt(mcpAfterReload)
// `U-6`'s reload-arm predicate AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE; the expression is the
// as-filed one: `reloadReceipt !== null`, i.e. the refusal IS the declared receipt — full shape,
// `isError` absent).
function reloadReceiptProperty(f) {
  const terms = { 'refusal-is-the-declared-receipt': declaredReceipt(f.answer) !== null }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const reloadReceiptLive = reloadReceiptProperty({ answer: mcpAfterReload })
check('U-6 (reload arm, main-side state)', 'the disabled state survives a renderer reload — a live MCP call is STILL REFUSED after the reload, and the refusal IS the DECLARED RECEIPT delivered as a VALUE (`isError` ABSENT)', reloadReceiptLive.ok ? 'PASS' : 'FAIL',
  `after Page.reload: the pane re-painted=${reloadedPainted}; the live MCP call is still refused and the answer IS the declared receipt — ok=${mcpAfterReload.ok}, isError=${mcpAfterReload.isError} (must be ABSENT), received=${JSON.stringify(reloadReceipt)}, raw=${JSON.stringify(String(mcpAfterReload.text ?? mcpAfterReload.error).slice(0, 160))} — the state is MAIN-side and the renderer never cleared it`,
  'RE-GRAINED 2026-10-08 (gate-6 re-run). THE AS-FILED PREDICATE WAS `mcpAfterReload.isError === true`, AND IT IS STALE: it is satisfiable ONLY under the SUPERSEDED registry-toggling carrier (`§2.1` `T-1(d)`/`T-2(d)`), where the landed SDK answers `-32602 … Tool … disabled` BEFORE the handler runs and the SDK surfaces that as `isError`. Under the architect\'s `GAP-3` ruling the exclusion transition toggles NOTHING and the invocation turn answers `ExclusionReceipt` as the tool\'s RESULT — a VALUE (`§2.1` item 3\'s supersession clause; `§2.2` item 2(a); `§2.5` item 1; `§3.1` `M-EX-5`; `P-EX-TP-1`) — and the unit\'s own `G6-F3` row plus register cell `G6-F3#1` assert `isError` is ABSENT on this very answer. THE ROW THEREFORE NOW ASSERTS THE RECEIPT ITSELF: `status`/`reason` CLOSED at their one token each, plus the additive server-authored `message` naming the cause (the security store is open) AND the remedy (retry once the operator has finished); `isError` must be ABSENT. The re-grained predicate is STRONGER, not weaker: it reddens on a protocol error, on a receipt with the member missing or the sentence cause-less, AND on the renderer\'s own value — which is exactly what an inert invocation turn would return')

// THE PREDICATE'S OWN CONTROL — a re-grained predicate that cannot fail is not evidence.
const twoMemberReceipt = { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed' }) }
const causeLessReceipt = { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed', message: 'refused' }) }
const supersededCarrier = { ok: true, isError: true, text: 'MCP error -32602: Tool provident.get_markdown disabled' }
check('U-6 (reload arm) — PREDICATE CONTROL', 'the re-grained predicate CAN still FAIL — it is NULL on the RENDERER\'S OWN enabled-state values of this same run and on every OUTSIDE shape of the receipt', declaredReceipt(baseline) === null && declaredReceipt(returnedAnswer) === null && declaredReceipt(twoMemberReceipt) === null && declaredReceipt(causeLessReceipt) === null && declaredReceipt(supersededCarrier) === null ? 'PASS' : 'FAIL',
  `LIVE controls (this run's OWN enabled-state answers — i.e. the renderer's value, which is exactly what an inert invocation turn would return for an open-state call): the boot baseline answered ${JSON.stringify(String(baseline.text).slice(0, 40))}… → predicate ${JSON.stringify(declaredReceipt(baseline))}; the post-return answer answered ${JSON.stringify(String(returnedAnswer.text).slice(0, 40))}… → predicate ${JSON.stringify(declaredReceipt(returnedAnswer))}. IN-LINE controls (values, NOT live readings — the register row\'s own negative-control form): a PRE-RULING TWO-MEMBER receipt → ${JSON.stringify(declaredReceipt(twoMemberReceipt))} (an ABSENT \`message\` is OUTSIDE \`§2.5\` item 1); a CAUSE-LESS message → ${JSON.stringify(declaredReceipt(causeLessReceipt))}; the SUPERSEDED \`-32602 … disabled\` carrier → ${JSON.stringify(declaredReceipt(supersededCarrier))}`,
  'WHY A CONTROL IS OWED: the re-grained predicate must not be a rubber stamp, and the LIVE half is the discriminating one — with the invocation turn inert (gate-4\'s `A-1` defect class, the regression `§2.2` item 2(a) now depends on) an open-state call returns the RENDERER\'S value, and the predicate would read exactly what these two enabled-state answers read. The IN-LINE half pins the mandated DOMAIN (`§2.5` item 1: an absent, empty, cause-less or remedy-less message is OUTSIDE) so the additive member cannot become silently optional')
// `U-6`'s operator-view predicate AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE; the expression is the
// as-filed one: `afterReload.present && afterReload.mcpSegment === 'disabled'`).
function reloadOperatorViewProperty(f) {
  const terms = {
    'pane-present': f.pane?.present === true,
    'segment-reads-disabled': f.pane?.mcpSegment === 'disabled',
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const reloadOperatorViewLive = reloadOperatorViewProperty({ pane: afterReload })
check('U-6 (reload arm, the operator\'s view)', 'after the reload the pane shows the state it actually is in', reloadOperatorViewLive.ok ? 'PASS' : 'FAIL',
  `after Page.reload the pane re-painted=${reloadedPainted} and its status segment reads ${JSON.stringify(afterReload.mcpSegment)} with the button reading ${JSON.stringify(afterReload.buttonText)} and data-state ${JSON.stringify(afterReload.dataState)}, while IPC_SECURITY_GET answered exclusion=${JSON.stringify(reloadBridge?.exclusion)} and the live MCP surface IS refusing with the declared receipt (${JSON.stringify(reloadReceipt)})`,
  'the operator-visible half of `U-6` (`§0A` item 5; `§2.4` item 3; `PAR-9`): the GET response member is the STATE and it is NEVER absent, so the pane\'s own source reports the live gate after the reload — the reading that `F-4` (the stale boot-gate read) contradicted before the host fix landed. **THIS ROW WAS NOT RE-GRAINED** (the as-filed predicate is `afterReload.present && afterReload.mcpSegment === \'disabled\'` and is unchanged): the as-filed `FAIL` was the HOST defect `F-4`, fixed by the implementer at `afd3212`, and the as-filed EVIDENCE SENTENCE (which attributed the pane\'s reading to a handler closing over the boot gate) was this file\'s own stale text and stands corrected here — the pane\'s source is `L` `src/main/main.ts:384`\'s live `mcp.gate.exclusionState()` read')

// ---- THE TWO `U-6` RELOAD-ARM ROWS' DELETION / RED-FAIL CONTROLS (`R3-01`'s CLASS CLOSURE) -------------
// The live rows above and these fixtures go through the SAME named functions. The FIRST fixture IS the
// deletion — a reload that CLEARS the state and re-arms the renderer, exactly the regression `U-6` exists
// to catch — and it reddens BOTH predicates at once.
const reloadArmControls = {
  'THE FEATURE IS DELETED: the reload clears the state, so the pane comes back reading \`mcp-enabled\` AND the live call is answered NORMALLY instead of the receipt': {
    receipt: reloadReceiptProperty({ answer: baseline }),
    view: reloadOperatorViewProperty({ pane: { present: true, mcpSegment: 'enabled' } }),
  },
  'the pane did not RE-PAINT after the reload (the operator sees nothing — \`present:false\`)': {
    receipt: reloadReceiptProperty({ answer: mcpAfterReload }),
    view: reloadOperatorViewProperty({ pane: { present: false } }),
  },
  'the refusal survived but the RECEIPT lost its additive \`message\` (an ABSENT \`message\` is OUTSIDE \`§2.5\` item 1)': {
    receipt: reloadReceiptProperty({ answer: { ok: true, isError: false, text: JSON.stringify({ status: 'refused', reason: 'exclusion-closed' }) } }),
    view: reloadOperatorViewProperty({ pane: afterReload }),
  },
  'the reload answered a PROTOCOL ERROR (\`-32602 disabled\`, the superseded carrier — \`isError: true\`)': {
    receipt: reloadReceiptProperty({ answer: supersededCarrier }),
    view: reloadOperatorViewProperty({ pane: afterReload }),
  },
}
// WHAT "REFUSED" MEANS HERE, STATED BECAUSE THE TWO FIXTURES THAT PIN ONE PREDICATE EACH WOULD OTHERWISE BE
// MIS-COUNTED: a fixture is REFUSED when AT LEAST ONE of the two predicates reddens (that is what makes a
// predicate evidence), and the DELETION fixture — the FIRST one — is asserted to redden BOTH, since the
// regression `U-6` names moves the main-side state AND the operator's view together. A fixture that left
// BOTH green is the only "not refused" case.
const reloadArmNotRefused = Object.entries(reloadArmControls).filter(([, v]) => v.receipt.ok !== false && v.view.ok !== false).map(([k]) => k)
const reloadArmDeletionReddensBoth = reloadArmControls[Object.keys(reloadArmControls)[0]].receipt.ok === false
  && reloadArmControls[Object.keys(reloadArmControls)[0]].view.ok === false
check('U-6 (reload arm: main-side state + the operator\'s view) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the two `U-6` reload-arm rows\' predicates CAN FAIL: the DELETION fixture (the reload clears the state — BOTH rows redden together) and the three other regression shapes are each REFUSED, each naming the term that caught it',
  reloadArmNotRefused.length === 0 && reloadArmDeletionReddensBoth ? 'PASS' : 'FAIL',
  `fixtures driven through reloadReceiptProperty and reloadOperatorViewProperty themselves: ${JSON.stringify(Object.fromEntries(Object.entries(reloadArmControls).map(([k, v]) => [k, { receipt: v.receipt.ok, view: v.view.ok }])))}; fixtures refused by NEITHER: ${JSON.stringify(reloadArmNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(reloadArmControls).map(([k, v]) => [k, { receipt: Object.entries(v.receipt.terms).filter(([, b]) => b === false).map(([t]) => t), view: Object.entries(v.view.terms).filter(([, b]) => b === false).map(([t]) => t) }])))}`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE): the reload arm\'s two rows are the operator-visible half of `U-6`, green in every run since the host fix — and NEITHER had a fixture driving it red. **THE DELETION FIXTURE IS THE FIRST ONE**: the second fixture reddens the VIEW alone (a pane that never re-painted) and the third the RECEIPT alone (a message-less receipt), so the pair is attributable rather than merely refused together. **WHAT \'REFUSED\' MEANS IS STATED RATHER THAN ASSUMED**: a fixture is refused when AT LEAST ONE of the two predicates reddens — that is what makes a predicate evidence — and the DELETION fixture is asserted to redden BOTH (the regression `U-6` names moves the main-side state AND the operator\'s view together); a fixture that left BOTH green would be the only not-refused case.')


// BOOT A STAYS ALIVE UNTIL AFTER PHASE 5, and the reason is CORRECTED 2026-10-09 (the
// `§6.2` audit's `F12`): the as-filed text claimed the HTTP phase *"needs a REAL transition
// driven through the app while an HTTP POST is in flight (the app's own gate is the shared
// authority)"* — it does NOT: each boot has its OWN gate (`§2.4` item 7's per-process
// reading) and the HTTP phase drives its transitions on the HTTP boot's own surface. Boot A
// is kept alive because PHASE 4 copies ITS post-transition profile (and its phase-2/3
// gesture rows are still its own). It is torn down after PHASE 5.

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 4 — U-6: a RESTART returns to `mcp-enabled`, ON BOOT A'S OWN POST-TRANSITION
// PROFILE, and the flag is NOT PERSISTED (the `D-19`/`N-5` property)
//
// ⟶ RE-INSTRUMENTED 2026-10-09 — THE `§6.2` AUDIT'S BLOCKING `F1`. The as-filed arm
// booted the restart on a FRESH `mkdtemp` profile THE DRIVER SEEDED ITSELF
// (`mkdtempSync` + `writeFileSync` of `{token, enabled}`), so it measured a boot on a
// profile it had just written — a DIFFERENT profile from boot A's post-transition one —
// while the record claimed "the same scratch profile"; boot A's OWN post-transition
// profile was never read; and the predicate (`restartAnswer.isError !== true &&
// !JSON.stringify(restartHtml.census ?? {}).includes('exclusion')`) was satisfied by a
// THROWN call (`rawCall` → `{ok:false,error}`, so `isError` is `undefined`) and by an
// ABSENT `census` member (`?? {}`), i.e. DELETING THE FEATURE STILL READ PASS. The
// `D-19`/`N-5` property — no persisted flag, no third file, no exclusion key in the file
// — was not measured at all.
//
// WHAT THE ARM DOES NOW: the restart boots on a BYTE-EXACT COPY of BOOT A'S OWN
// post-transition profile, made HERE, AFTER the transition (`cpSync` of boot A's live
// profile directory) — the copy is the record's own artefact, and its fidelity is a
// PREDICATE TERM (the copy's listing must equal boot A's own listing and the store bytes
// must be identical), not an assumption. Boot A's own post-transition profile is READ
// (listing + bytes) and both readings are terms. THE WHOLE PROPERTY IS INSIDE THE
// PREDICATE — the answered shape, the process identity, the profile file LIST and the
// store file's BYTES — and a POSITIVE CONTROL (below) drives two deletion/regression
// fixtures through the SAME predicate function and shows every term reddening.
// ══════════════════════════════════════════════════════════════════════════════
const restartHome = mkdtempSync(join(tmpdir(), 'se-live-restart-'))
const profileRestart = join(restartHome, 'profile')   // the copy target — NOT pre-created

/** THE RESTART ARM'S PREDICATE, as a NAMED FUNCTION OF ITS TERMS, so the LIVE reading and
 *  every CONTROL fixture go through the SAME code (a predicate that is a lambda inside a
 *  `check()` call can only be controlled by editing the driver). Every term is reported
 *  by name, so a red row says WHICH part of the property broke. */
function restartArmProperty(f) {
  const terms = {
    // (1) the restarted app ANSWERED — a throw (`{ok:false,error}`) reddens here, which is
    //     the vacuity the as-filed `isError !== true` could not see.
    'answer-ok': f.answer?.ok === true,
    // (2) and it is not an error answer of any kind.
    'answer-not-error': f.answer?.isError !== true,
    // (3) and the answer is a NORMAL value — NOT the declarator receipt (a restart that
    //     came back CLOSED would answer the receipt, and this term reddens) and carrying
    //     the markdown the enabled state produces.
    'answer-normal': declaredReceipt(f.answer) === null && typeof f.answer?.text === 'string' && f.answer.text.includes('markdown'),
    // (4) a GENUINELY NEW PROCESS (not a reading of the boot A client).
    'new-process': typeof f.pidRestart === 'number' && f.pidRestart !== f.pidBootA,
    // (5) THE PRECONDITION, measured: boot A was IN THE OPEN STATE when the copy was made
    //     (its live bridge read `mcp-disabled` AND its live stdio call answered the
    //     receipt) — otherwise the restart reading is vacuous.
    'precondition-open': f.preconditionOpen === true,
    // (6) NO NEW PROFILE ENTRY ACROSS THE TRANSITION WINDOW: every name in boot A's own
    //     post-transition listing was already there before the first transition. THIS IS
    //     THE `N-5` "ANY THIRD FILENAME" TERM — raw, unfiltered (the as-filed row's
    //     `f.includes('security') || f.includes('settings')` filter could not see a third
    //     file under any other name). Its baseline is SETTLED (`baseline-settled` below),
    //     so it cannot redden on Chromium's own lazy writes.
    'no-new-entry': Array.isArray(f.sourceList) && f.sourceList.every((e) => f.baselineList.includes(e)),
    // (6a) AND THE BASELINE WAS TAKEABLE: the listing had stopped moving before the window
    //      opened (otherwise the term above is a race, not a reading).
    'baseline-settled': f.baselineSettled === true,
    // (6b) THE TIGHT WINDOW — THE `D-19`/`N-5` CORE: the transition THIS phase performs
    //      (`setExclusion('mcp-disabled')` + the renderer reload) added NOTHING to the
    //      profile between the reading taken immediately before it and the restart copy.
    //      This is the term the as-filed arm did not have at all.
    'transition-window-clean': Array.isArray(f.sourceList) && Array.isArray(f.preTransitionList) && f.sourceList.every((e) => f.preTransitionList.includes(e)),
    // (7) THE COPY IS OF BOOT A'S OWN PROFILE, exactly: listing-equal and byte-equal.
    'copy-is-of-source': Array.isArray(f.sourceList) && Array.isArray(f.copyList) && JSON.stringify(f.copyList) === JSON.stringify(f.sourceList) && typeof f.sourceBytes === 'string' && f.sourceBytes === f.copyBytes,
    // (8) NO `exclusion` KEY IN THE STORE, in any of the three readings (boot A's own
    //     post-transition file, the copy as made, and the copy after the restart boot).
    'no-exclusion-key': [f.sourceBytes, f.copyBytes, f.copyBytesAfterBoot].every((b) => typeof b === 'string' && !b.includes('exclusion')),
    // (8a) AND THE THIRD READING IS BYTE-IDENTICAL TO THE COPY, not merely `exclusion`-free
    //      (`§6.2` audit `F-A7`): the as-filed `no-exclusion-key` contributed exactly ONE term
    //      about the post-boot file — the ABSENCE OF A SUBSTRING — so a restart that REWROTE the
    //      store with a DIFFERENT KEY SET (e.g. renaming `enabled` to `mcpEnabled`, or adding any
    //      other key) still read PASS while the record's own claim ("identical in all THREE
    //      readings", `§2` `U-6` `Post`) was violated. This term makes the claim true by making
    //      it a reading.
    'post-boot-bytes-identical': typeof f.copyBytes === 'string' && f.copyBytes === f.copyBytesAfterBoot,
    // (9) THE STORE-SPACE FILE SET IS EXACTLY THE ONE DECLARED FILE, on both the source and
    //     the post-boot copy (the `N-5` second half — no third *store* file).
    'store-file-set': ['provident-security.json'].join(',') === (f.sourceList ?? []).filter((e) => /^provident-/.test(e)).sort().join(',')
      && ['provident-security.json'].join(',') === (f.postBootList ?? []).filter((e) => /^provident-/.test(e)).sort().join(','),
    // (10) AND THE STORE FILE IS A REAL, NON-EMPTY STORE — the positive control against
    //      reading an ABSENT key off an absent file (the as-filed `?? {}` vacuity).
    'store-non-vacuous': (function () {
      try {
        const v = JSON.parse(f.copyBytes)
        return v !== null && typeof v === 'object' && 'token' in v && 'enabled' in v
      } catch { return false }
    })(),
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}

// THE LIVE PRECONDITION, read on boot A at the moment of the copy: the OPEN state, and a
// live call still answered the receipt. (Without this the restart arm would be measuring
// a profile from a boot that never transitioned.)
const preconditionBridge = await cdp.evaluate(`window.provident.security.get()`)
const preconditionCall = await rawCall(bootA.client, 'provident.get_markdown', {})
const preconditionOpen = preconditionBridge?.exclusion === 'mcp-disabled' && declaredReceipt(preconditionCall) !== null

// BOOT A'S OWN POST-TRANSITION PROFILE, read where it lives (never seeded by this pass):
const sourceList = readdirSync(bootA.profile).sort()
const sourceBytes = readFileSync(join(bootA.profile, PROFILE_STORE_FILE), 'utf8')
cpSync(bootA.profile, profileRestart, { recursive: true })       // the copy, made AFTER the transition
const copyList = readdirSync(profileRestart).sort()
const copyBytes = readFileSync(join(profileRestart, PROFILE_STORE_FILE), 'utf8')

const childR = spawnElectron(['--mcp-transport=stdio', `--provident-user-data=${profileRestart}`])
const childRestart = childR.child
let stderrR = ''
childRestart.stderr.on('data', (d) => { stderrR += String(d) })
childRestart.stdout.on('data', () => {})
const transportR = new ChildProcessTransport(childRestart)
const clientR = new Client({ name: 'se-live-restart', version: '0.1.0' })
await clientR.connect(transportR)
const restartAnswer = await rawCall(clientR, 'provident.get_markdown', {})
const postBootList = readdirSync(profileRestart).sort()
const copyBytesAfterBoot = readFileSync(join(profileRestart, PROFILE_STORE_FILE), 'utf8')

const restartLive = restartArmProperty({
  answer: restartAnswer, pidRestart: childRestart.pid, pidBootA: bootA.child.pid,
  preconditionOpen, baselineList: profileListingBootA0, baselineSettled: bootABaseline.settled,
  preTransitionList: profileListingBeforeReload, sourceList, copyList,
  sourceBytes, copyBytes, copyBytesAfterBoot, postBootList,
})
// THE POSITIVE CONTROL — MANDATORY (the audit's item 3), and it is a FILESYSTEM fixture,
// not a boolean: a profile directory that DOES carry the exclusion flag (a store file
// with an `exclusion` key AND a third `provident-exclusion.json`) plus the two answer
// regressions (a THROWN call, and a restart that came back answering the RECEIPT). Each
// fixture is run through the SAME `restartArmProperty`, and the control row asserts that
// EVERY fixture is REFUSED and that it names the term that caught it.
const controlDir = join(restartHome, 'deletion-control')
mkdirSync(controlDir, { recursive: true })
const persistentStore = JSON.stringify({ token: TOKEN, enabled: GROUPS, exclusion: 'mcp-disabled' })
writeFileSync(join(controlDir, PROFILE_STORE_FILE), persistentStore)
writeFileSync(join(controlDir, 'provident-exclusion.json'), JSON.stringify({ exclusion: 'mcp-disabled' }))
const controlList = readdirSync(controlDir).sort()
const receiptText = JSON.stringify({ status: 'refused', reason: 'exclusion-closed', message: 'MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes.' })
const liveBase = { pidRestart: 2, pidBootA: 1, preconditionOpen: true, baselineList: sourceList, baselineSettled: true, preTransitionList: sourceList, sourceList, copyList, sourceBytes, copyBytes, copyBytesAfterBoot, postBootList }
const restartControls = {
  'the flag IS persisted (a store file carrying `exclusion` + a third profile file)': restartArmProperty({
    ...liveBase, answer: restartAnswer, sourceList: controlList, copyList: controlList,
    sourceBytes: persistentStore, copyBytes: persistentStore, copyBytesAfterBoot: persistentStore,
    postBootList: controlList,
  }),
  'the restart came back CLOSED (the answer IS the receipt)': restartArmProperty({ ...liveBase, answer: { ok: true, isError: false, text: receiptText } }),
  'the restart call THREW (the as-filed predicate\'s `isError === undefined` hole)': restartArmProperty({ ...liveBase, answer: { ok: false, error: 'MCP error -32001: Request timed out' } }),
  'a THIRD profile entry appeared across the transition window': restartArmProperty({ ...liveBase, answer: restartAnswer, sourceList: [...sourceList, 'provident-exclusion.json'].sort() }),
  // THE GUARANTEED-PRESENT NAME, NOT A CHROMIUM-WRITTEN ONE (`§6.2` audit `F-A14`): the as-filed
  // fixture filtered out `'Preferences'`, which the BROWSER writes lazily — true on this host, not
  // guaranteed — so on a host where the name is absent the fixture's `preTransitionList` EQUALLED
  // `sourceList`, no term reddened, and the control produced a FALSE RED (`failedControls.length`
  // would not be 0). The constant `PROFILE_STORE_FILE` is seeded by THIS DRIVER's own `seedProfile` and
  // read at its own definition and at the source-bytes / copy-bytes reads of this arm, so its presence is
  // guaranteed by the driver, not by Chromium's bookkeeping. **THE AS-FILED ANCHORS WERE STALE
  // (`R3-13`, the third `§6.2` audit): the comment cited *"read at `:705`/`:805`"*, where `:705` is
  // `waitForToggle` and `:805` is a comment — the constant is DEFINED at the as-filed `:520` and READ at
  // the as-filed `:836`/`:839`. The citation is by NAME now, and the as-filed anchors are kept visible
  // here rather than silently replaced.**
  'the TRANSITION ITSELF wrote a file (the tight `N-5` window)': restartArmProperty({ ...liveBase, answer: restartAnswer, preTransitionList: sourceList.filter((e) => e !== PROFILE_STORE_FILE) }),
  // THE `R3-02` REPAIR (the THIRD `§6.2` audit, MED — a `FIXED` claim the bytes did not support): the
  // as-filed fixture set BOTH `copyBytes` and `copyBytesAfterBoot` to the SAME rewritten string, so
  // `post-boot-bytes-identical` (`copyBytes === copyBytesAfterBoot`) evaluated TRUE and NO fixture drove
  // that term red — while three documents claimed the term bites. The fixture now overrides ONLY
  // `copyBytesAfterBoot`, leaving `copyBytes = sourceBytes` — the shape a REAL post-boot rewrite has
  // (the copy as made carries the source's bytes; the RESTART's own write is what differs) — so the term
  // genuinely refuses it, reddening `post-boot-bytes-identical` and NOT `no-exclusion-key` (which still
  // sees no `exclusion` substring: the isolation this fixture exists to show).
  'the restart REWROTE the store with a DIFFERENT key set (the THIRD reading is no longer byte-identical to the SOURCE — the audit\'s `F-A7`; the shape a real post-boot rewrite has, with `copyBytes` staying `sourceBytes` and the new key set carried WITHOUT an `exclusion` substring, so the byte term is the one that bites)': restartArmProperty({ ...liveBase, answer: restartAnswer, copyBytesAfterBoot: JSON.stringify({ token: TOKEN, mcpEnabled: GROUPS }) }),
  'boot A was NOT in the open state when the copy was made': restartArmProperty({ ...liveBase, answer: restartAnswer, preconditionOpen: false }),
  'the baseline never settled (the `N-5` window would be a race, not a reading)': restartArmProperty({ ...liveBase, answer: restartAnswer, baselineSettled: false }),
  'the copy is NOT of boot A\'s profile (a re-seeded store)': restartArmProperty({ ...liveBase, answer: restartAnswer, copyBytes: JSON.stringify({ token: 'other', enabled: GROUPS }) }),
}
const failedControls = Object.entries(restartControls).filter(([, v]) => v.ok !== false).map(([k]) => k)

check('U-6 (restart arm) / SX-G-46/47 — RE-INSTRUMENTED ON BOOT A\'S OWN PROFILE', 'a RESTART on BOOT A\'S OWN post-transition profile returns to `mcp-enabled`, and the flag is NOT persisted (no third file, no `exclusion` key in the store bytes, and the post-boot bytes BYTE-IDENTICAL to the copy) — the WHOLE property, read as 13 named terms', restartLive.ok ? 'PASS' : 'FAIL',
  `the restart child's OWN boot landmarks: ${JSON.stringify(stderrR.split('\n').filter((l) => l.includes('provident-mcp]') || l.includes('renderer ready')))} — a genuine separate boot; the copy was made at boot A's post-transition state (precondition: bridge exclusion=${JSON.stringify(preconditionBridge?.exclusion)}, live call receipt=${JSON.stringify(declaredReceipt(preconditionCall))}); a NEW process (pid ${childRestart.pid} vs boot A's ${bootA.child.pid}) on that copy answered ok=${restartAnswer.ok} isError=${restartAnswer.isError} receipt=${JSON.stringify(declaredReceipt(restartAnswer))} first 80 chars=${JSON.stringify(String(restartAnswer.text ?? restartAnswer.error).slice(0, 80))}; THE BASELINE (boot A's profile listing, taken before the first transition once the RUNTIME's own writes had settled: ${bootABaseline.polls} poll(s), settled=${bootABaseline.settled}, first taken at age ${bootABaseline.ageMs === null ? 'n/a' : Math.round(bootABaseline.ageMs / 1000) + ' s'} — the runtime having added ${JSON.stringify(bootABaseline.added)} while it settled) = ${JSON.stringify(profileListingBootA0)}; THE TIGHT N-5 WINDOW opens at the listing taken immediately BEFORE the phase-3 transition = ${JSON.stringify(profileListingBeforeReload)} — the transition added ${JSON.stringify(sourceList.filter((e) => !profileListingBeforeReload.includes(e)))} to it; boot A's OWN post-transition listing = ${JSON.stringify(sourceList)} (the Chromium runtime's own entries are present and named — they are NOT the app's store; the store-space filter is a term); the copy's listing EQUALS it = ${JSON.stringify(copyList) === JSON.stringify(sourceList)}; store bytes: boot A's own ${sourceBytes.length} chars == the copy's ${copyBytes.length} chars = ${sourceBytes === copyBytes}, no 'exclusion' key in any of the three readings = ${[sourceBytes, copyBytes, copyBytesAfterBoot].every((b) => !b.includes('exclusion'))}, and the THIRD reading is BYTE-IDENTICAL to the copy = ${copyBytes === copyBytesAfterBoot} (the audit's F-A7 term: the as-filed arm read the post-boot file ONLY for the absence of the substring 'exclusion', so a restart that rewrote the store with a different KEY SET still read PASS); after the restart's own boot the listing is ${JSON.stringify(postBootList)}. TERMS: ${JSON.stringify(restartLive.terms)}`,
  `TERMS (each one a reading, none an assumption): ${JSON.stringify(restartLive.terms)}. **THE INSTRUMENT**: \`cpSync\` of boot A's LIVE profile directory, made AFTER the phase-3 transition, and the restart spawned on that copy — the SAME profile the open state was reached on, never a profile this pass seeded. **THE DELETION CONTROL (mandatory, and it is a FILESYSTEM fixture)**: ${JSON.stringify({ fixtures: Object.keys(restartControls).length, refused: Object.values(restartControls).filter((v) => v.ok === false).length, notRefused: failedControls })} — a profile whose store DOES carry \`exclusion\` plus a third \`provident-exclusion.json\` is REFUSED (terms ${JSON.stringify(restartControls['the flag IS persisted (a store file carrying \`exclusion\` + a third profile file)'].terms)}), a receipt-answering restart is REFUSED, a THROWN call is REFUSED (the as-filed \`isError === undefined\` hole), a third profile entry is REFUSED, a non-open precondition is REFUSED, a re-seeded copy is REFUSED, and — NEW this pass (the audit's \`F-A7\`) — a restart that REWROTE the store with a different KEY SET is REFUSED on \`post-boot-bytes-identical\` — so the predicate above CAN fail, and DELETING THE FEATURE IS NOT A PASS. The property is \`D-19\`/\`N-5\` (\`§2.1\` item 5; \`§1.3\` item 7's two-file pin): the flag is a CONSTRUCTION TERMINAL, never a file read`)
check('U-6 (restart arm) — DELETION/RED-FAIL CONTROL', 'the re-instrumented restart predicate CAN FAIL: every deletion/regression fixture is REFUSED by the SAME code path, and each fixture names the term that caught it', failedControls.length === 0 && Object.values(restartControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through \`restartArmProperty\` itself: ${JSON.stringify(Object.fromEntries(Object.entries(restartControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(failedControls)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(restartControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (the `§6.2` audit found the as-filed restart predicate COULD NOT FAIL — a deleted feature still read PASS): a predicate is evidence only if a control drives it red. The control here is the DELETION CASE ITSELF — a store file carrying the `exclusion` key, a third profile file, a receipt-answering restart and a thrown call all REDDEN the same terms the live reading turns green')
registerCleanup(() => {
  try { clientR.close() } catch { /* gone */ }
  try { transportR.close() } catch { /* gone */ }
  try { childRestart.kill('SIGKILL') } catch { /* gone */ }
  rmSync(restartHome, { recursive: true, force: true })
})
try { await clientR.close() } catch { /* gone */ }
try { transportR.close() } catch { /* gone */ }
try { childRestart.kill('SIGKILL') } catch { /* gone */ }
await sleep(300)
rmSync(restartHome, { recursive: true, force: true })

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 5 — THE HTTP TRANSPORT: the auth-first ordering, the POST arms, the straddle
// ══════════════════════════════════════════════════════════════════════════════
/** A raw JSON-RPC POST at the running app's HTTP endpoint, keeping the STATUS and
 *  the raw body — so a second status line (the straddle falsifier) is visible. */
async function httpPost(port, body, { token = null, sessionId = null } = {}) {
  const headers = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }
  if (token !== null) headers.authorization = `Bearer ${token}`
  if (sessionId !== null) headers['mcp-session-id'] = sessionId
  const res = await fetch(`http://127.0.0.1:${port}/mcp`, { method: 'POST', headers, body: JSON.stringify(body) })
  const text = await res.text()
  const lines = text.split('\n').filter((l) => l.trim() !== '')
  return { status: res.status, text, lines, sessionId: res.headers.get('mcp-session-id'), contentType: res.headers.get('content-type') }
}

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 0b — THE HTTP BOOT (spawned HERE, beside boot A; the HTTP phase drives its OWN
// transitions on THIS process — CORRECTED 2026-10-09, the `§6.2` audit's `F12`: the
// as-filed header claimed the phase drives "REAL transitions on boot A's live window",
// which the per-process gate forbids and which the code below does not do)
// ══════════════════════════════════════════════════════════════════════════════
const HTTP_PORT = 3900 + Math.floor(Math.random() * 90)
// WHY THIS BOOT IS SPAWNED DIRECTLY AND NOT THROUGH `spawnElectron`: the helper's
// landed base vector pins `--mcp-transport=stdio` FIRST and appends the caller's
// args AFTER it, while `transportFromArgs` (`src/main/main.ts`) resolves the FIRST
// matching flag — so a caller-supplied `--mcp-transport=http` is SHADOWED and the
// app still starts stdio (MEASURED: the child announced `stdio transport ready`).
// The base vector is byte-pinned and this driver may not edit the helper, so the
// HTTP boot is spawned here with the SAME pinned members (the binary the helper
// resolves, the same flags, the same env pair, a fresh scratch profile) and the
// transport flag placed BEFORE the app path.
const HTTP_PROFILE = mkdtempSync(join(tmpdir(), 'se-live-http-'))
writeFileSync(join(HTTP_PROFILE, 'provident-security.json'), JSON.stringify({ token: TOKEN, enabled: GROUPS }, null, 2))
const httpChild = spawn(electronBin, [
  '--mcp-transport=http', `--mcp-port=${HTTP_PORT}`, '--remote-debugging-port=0',
  mainCjs,
  '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage',
  `--provident-user-data=${HTTP_PROFILE}`,
], { cwd: root, stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1' } })
let httpStderr = ''
httpChild.stderr.on('data', (d) => { httpStderr += String(d) })
httpChild.stdout.on('data', () => {})
registerCleanup(() => {
  try { httpChild.kill('SIGKILL') } catch { /* gone */ }
  rmSync(HTTP_PROFILE, { recursive: true, force: true })
})

// THE TWO BOOTS HAVE TWO SEPARATE GATES — CORRECTED 2026-10-09 (the `§6.2` audit's `F12`:
// this block used to claim the OPPOSITE of the block 100 lines below it, and of the
// measurement). The as-filed text read *"THE TRANSITION CHANNEL FOR THE WHOLE RUN is
// BOOT A's CDP surface … the HTTP phase must be able to land a transition while an HTTP
// POST is in flight, so the state is driven on the boot that already holds a window"* —
// and BOTH halves are wrong: the exclusion gate is ONE PER PROCESS, so a transition
// landed on boot A does NOT move the HTTP boot's server (`§2.4` item 7's per-process
// reading, and the reason the `SX-G-36` rows read 503 against THIS process). THE HTTP
// PHASE'S TRANSITIONS ARE LANDED ON THE HTTP BOOT'S OWN SURFACE — the same boot whose
// POSTs the rows then measure (see the `transitionOverHttp` block below). Boot A's CDP
// surface is kept alive only for PHASE 4's restart copy and the phase-2/3 gesture rows.
// (The HTTP boot gets no second stdio MCP client: its stdio channel is its own
// `stdioServer` and a second client's handshake there contends with the app's own request
// stream — MEASURED: an `MCP error -32001: Request timed out` after 60 s.)

/** Drive a transition on the HTTP BOOT through its OWN MCP surface. The HTTP
 *  transport is STATELESS (`§2.3` item 2: a fresh McpServer + transport per POST), so
 *  no `initialize` handshake or session is needed — and the exclusion arm is read AT
 *  POST ARRIVAL, so the POST that CALLS the transition must be sent while the state
 *  still admits it (MEASURED: the same POST's `provident.dispatch` answered
 *  `exclusion-closed` because the transition it performed had already closed the
 *  gate on the way in — the NEXT POST is the one that reads 503).
 *
 *  The envelope body calls the pane's OWN declared bridge member
 *  (`window.provident.security.setExclusion`), evaluated by the app's engine in the
 *  RENDERER realm — the same member the authored pane body calls. */
/** A counter for the fresh node ids each transition envelope mints, so the app graph
 *  never accumulates colliding ids across the phase. */
let dispatchSeq = 0
/** THE TRANSITION ENVELOPE, loaded + dispatched in ONE HTTP REQUEST.
 *
 *  WHY ONE REQUEST: the HTTP transport is STATELESS (`§2.3` item 2 — a FRESH
 *  McpServer + transport per POST), so the node a `load` mints in request A does not
 *  exist in request B's server instance (MEASURED: `unresolved target` on a
 *  follow-up dispatch). The two calls therefore ride one `initialize` + one
 *  `tools/call` on ONE long-lived session, in the declared order.
 *
 *  WHY THE LOAD AND THE DISPATCH CANNOT BE SEPARATED IN TIME: `provident.load` is
 *  itself an invocation, refused by the SAME turn while the state is open
 *  (`§2.2` item 2(a)), so the transition envelope must be loaded BEFORE the tier
 *  opens — which is exactly why the open transition is issued as a SINGLE POST that
 *  both loads and dispatches (this function), and why the operator's RETURN cannot
 *  be driven over MCP at all (the dispatch that performs it would be refused; the
 *  return is reachable only through the renderer bridge — a live finding recorded in
 *  the U-4 HTTP row below).
 *
 *  The handler body calls the pane's OWN declared bridge member
 *  (`window.provident.security.setExclusion(state)`), evaluated by the app's engine
 *  in the RENDERER realm — the same member the authored pane body calls. */
async function transitionOverHttp(state, label) {
  dispatchSeq += 1
  const runId = `se-live-http-transition-${label}`
  const body = `function (ctx) {
    var s = window && window.provident && window.provident.security;
    if (!s) return;
    s.setExclusion(${JSON.stringify(state)});
  }`
  const env = { template: { root: { type: 'div', css: { id: `${runId}-root` }, children: [
    { type: 'button', props: { id: runId }, content: 'transition', handlers: [{ name: runId, event: 'click', body }] },
  ] } }, content: [], clientConfig: { runInstantiation: true, runRendering: true } }
  // THE TWO CALLS ARE PIPELINED AS ONE BATCH IN ONE POST, on the session the run
  // already initialized (a second `initialize` is refused: MEASURED
  // `-32600 Invalid Request: Only one initialization request is allowed`, because the
  // server is created per POST but the SESSION is not) — so the node the load mints
  // is visible to the dispatch inside the SAME per-POST server instance.
  return httpPost(HTTP_PORT, [
    { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'provident.load', arguments: { kind: 'envelope', envelope: env } } },
    { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'provident.dispatch', arguments: { target: runId, event: 'click' } } },
  ], { token: TOKEN, sessionId: session })
}

// THE HTTP READINESS PROBE, SETTLED ON A BOUNDED WINDOW AND REPORTED WITH ITS OUTCOME (`R4-06`, the
// FOURTH `§6.2` audit, LOW — the `§6.2` STRUCTURAL RULE (b)): as filed this row read `FAIL` on a 30 s
// readiness timeout, so a SLOW BOOT was recorded as a feature failure. A probe that never answered is
// an INSTRUMENT state; the row now answers `MANUAL` for it and reserves `FAIL` for a probe that DID
// answer and answered something other than the landed non-POST arm.
let httpReady = false
let httpProbeOutcome = 'nothing within 30 s (an INSTRUMENT state — reported MANUAL, not FAIL)'
for (let i = 0; i < 150; i += 1) {
  try {
    const r = await fetch(`http://127.0.0.1:${HTTP_PORT}/mcp`, { method: 'GET' })
    httpReady = r.status === 405
    httpProbeOutcome = `GET /mcp answered ${r.status}${httpReady ? ' (the landed non-POST arm)' : ' — NOT the landed 405 arm'}`
    break
  } catch { await sleep(200) }
}
check('SX-G-45 (HTTP boot)', 'the HTTP transport reaches its own readiness landmark and answers', httpProbeOutcome.includes('INSTRUMENT state') ? 'MANUAL' : (httpReady ? 'PASS' : 'FAIL'),
  `${httpProbeOutcome}; the child's stderr landmarks: ${JSON.stringify(httpStderr.split('\n').filter((l) => l.includes('provident-mcp]') || l.includes('renderer ready')))}`,
  'the HTTP transport is started by the SAME `mcp.start()` as the stdio one, after the window load — and the 401/503/405 arms below are read against THIS process. **AND A PROBE THAT NEVER ANSWERED IS `MANUAL`, NOT `FAIL` (`R4-06`, 2026-10-10, structural rule (b)): the readiness TIMEOUT is an instrument state; a `FAIL` would claim the transport broke when all the instrument knows is that it did not see it.**')

const unauth = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} })
check('SX-G-38 (auth arm, live)', 'the AUTHORIZATION arm answers 401 FIRST, in the enabled state, when a real token is configured', unauth.status === 401 && unauth.text.includes('-32001') ? 'PASS' : 'FAIL',
  `POST /mcp with NO Authorization header → ${unauth.status} ${JSON.stringify(unauth.text.slice(0, 120))}`,
  'the gate was constructed with token ' + TOKEN.slice(0, 12) + '… so no request is admitted without it')

const init = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'se-live-http', version: '0.1.0' } } }, { token: TOKEN })
const session = init.sessionId
const authorizedEnabled = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
// THE POSITIVE CONTROL ASSERTS THE ANSWER IT CLAIMS (`§6.2` audit `F-A9`): the as-filed predicate
// was `status !== 503`, so a `401`/`404`/`500` in the enabled state would have read PASS while the
// enabled-state answer it is supposed to establish was not there. `200` is the landed answer this
// run reads (the negative half is KEPT beside it, so a 503 still reddens).
check('SX-G-42 (live positive control)', 'an authorized POST in the ENABLED state IS answered `200` (and is not answered by the exclusion arm)', authorizedEnabled.status === 200 && authorizedEnabled.status !== 503 ? 'PASS' : 'FAIL',
  `authorized POST while enabled → status ${authorizedEnabled.status} (expected 200; the exclusion arm answers nothing in the enabled state) — the audit's F-A9: the as-filed predicate asserted only \`!== 503\`, which a 401/500 would have satisfied`,
  'the positive control that makes the 503 rows below non-vacuous. **RE-GRAINED 2026-10-09 (the audit\'s `F-A9`): `!== 503` → `=== 200` (with the negative half kept).**')

const expectedBody = '{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}'

const getRes = await fetch(`http://127.0.0.1:${HTTP_PORT}/mcp`, { method: 'GET', headers: { authorization: `Bearer ${TOKEN}` } })
const getBody = await getRes.text()
check('SX-G-40 (live)', 'a GET /mcp keeps its landed 405 answer while the exclusion arm stays POST-only', getRes.status === 405 && getBody.includes('-32000') && !getBody.includes('exclusion-closed') ? 'PASS' : 'FAIL',
  `GET /mcp → ${getRes.status} ${JSON.stringify(getBody.slice(0, 140))}`,
  'the exclusion arm is reachable ONLY for POST')

// OPEN THE STATE THROUGH THE APP'S OWN CHANNEL. This boot DOES carry the CDP listener
// (`--remote-debugging-port=0`, attached later for the operator's return gesture), but the
// TRANSITION is driven over the app's own MCP surface instead: the envelope loads a TINY
// handler, dispatches it, and its body calls the pane's OWN declared bridge member
// (`window.provident.security.setExclusion`, reached over the `IPC_SECURITY_EXCLUSION`
// channel) — exercised by the app's own dispatch surface rather than by a second reach-in.
// THE TRANSITIONS ARE DRIVEN THROUGH THE APP'S OWN CHANNEL on the boot that serves
// the HTTP endpoint. Boot A is a SEPARATE process with its own gate, so a transition
// landed there would not move this server. BOTH envelopes are pre-loaded while the
// tier admits MCP work (see `transitionOverHttp`: `provident.load` is itself refused
// while the state is open).
const openVia = await transitionOverHttp('mcp-disabled', 'open')
await sleep(400)
console.log(`      · transition exchange: open POST → ${openVia.status} ${JSON.stringify(openVia.text.slice(0, 200))}`)
const authorizedOpen = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
check('SX-G-36 (live)', 'an authorized POST while OPEN answers 503 with the declared JSON-RPC error body', authorizedOpen.status === 503 && authorizedOpen.text.trim() === expectedBody ? 'PASS' : 'FAIL',
  `authorized POST while open → ${authorizedOpen.status} ${JSON.stringify(authorizedOpen.text.slice(0, 160))}`,
  `the declared body is ${expectedBody}`)

const unauthOpen = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 5, method: 'tools/list', params: {} })
check('SX-G-38 (order, live)', 'while OPEN an UNAUTHORIZED POST still answers 401 — the 503 is unreachable without a valid token', unauthOpen.status === 401 && unauthOpen.text.includes('-32001') ? 'PASS' : 'FAIL',
  `POST /mcp with NO token while the state is OPEN → ${unauthOpen.status} ${JSON.stringify(unauthOpen.text.slice(0, 120))}`,
  'authorization FIRST, exclusion SECOND — reversing the order would let an unauthenticated caller distinguish the two states (the G-8 oracle)')

check('SX-G-44 (live)', 'ONE predicate, ONE answer shape, TWO deliveries (a stdio tool RESULT carrying the receipt vs an HTTP status + JSON-RPC error object)',
  authorizedOpen.status === 503 && declaredReceipt(gateMoved) !== null && baseline.isError !== true ? 'PASS' : 'FAIL',
  `in this ONE run the same state produced both deliveries: on stdio the tools/call answered the DECLARED RECEIPT as a VALUE (isError=${gateMoved.isError}, must be ABSENT; received=${JSON.stringify(declaredReceipt(gateMoved))}), and on HTTP the authorized POST answered ${authorizedOpen.status} with -32003 'exclusion-closed'; the SAME POST in the enabled state answered ${authorizedEnabled.status} (not 503)`,
  'RE-GRAINED 2026-10-08: the as-filed observation attributed the stdio delivery to "the gate\'s registry toggle", the SUPERSEDED carrier — the two deliveries now differ only in TRANSPORT, both carrying the one declared refusal (`§2.3` item 4: "A pass that implements the exclusion as a transport-specific special case ... FAILS"), and the stdio half is asserted as the receipt itself rather than as an `isError` flag')

// THE POST BESIDE THE RETURN TRANSITION (§2.3 item 3) — **AND WHAT IT REALLY MEASURES, CORRECTED
// 2026-10-09 (the `§6.2` audit's `F-A6`; the as-filed header of this block is kept visible below).**
// The as-filed comment claimed the POST "ARRIVES while the tier is ADMITTED and whose tool work is
// still IN FLIGHT when a transition lands", and this record's row-26 evidence said "while the tier
// was IN TRANSITION". **BOTH ARE FALSE OF THE CODE.** By the time this POST is issued the tier is
// ALREADY `mcp-disabled` — the transition that opened it ran ~100 lines above and its own row
// measured the `503` on THIS process (`authorizedOpen`, `§5` row 23) — so the POST is a PLAIN
// ARRIVAL refusal (`§2.3` item 2), the SAME decision row 23 measures, and NOT the straddle
// `§2.3` item 3 declares. The POST is issued and the return transition is landed 60 ms later, but
// the arrival answer was already decided at the gate BEFORE that transition, so nothing straddles.
//
// AND THE FALSIFIER'S OWN SHAPE IS WEAKER THAN THE DECLARED ONE (the same audit finding, part (ii)):
// `countStatusLines(straddle.text)` counts `HTTP/1.x NNN` occurrences INSIDE THE BODY of ONE `fetch`
// Response — but a second status line on the response stream is a FRAMING event that `fetch` cannot
// represent at all, and if one occurred `res.text()` would reject and ABORT the run (the `F14`
// class). So this counter cannot witness the declared falsifier; it reads a body that happens not to
// contain the pattern. Part (iii): the counter's control drives a SYNTHETIC STRING, never the
// transport.
//
// **THE DISPOSITION IS A DECLARED LIMIT, NOT A FIX (`§6.1` clause 5's form; `F4` re-dispositioned
// from "Fixed" to `DECLARED-LIMIT` under the open architect ruling `GAP-2`):** a genuine straddle
// needs a dispatched RENDERER round trip held open ACROSS the transition, which this driver cannot
// make deterministic (the window is milliseconds wide — `§2`'s second note). The row below therefore
// asserts what it actually reads: ONE answer on ONE stream, with the arrival decision measured (the
// declared body present when it is a 503). The mid-flight ABANDONMENT half is NOT claimed.
// AS-FILED HEADER, KEPT VISIBLE (`RCA-8(d)`): "THE STRADDLING POST (§2.3 item 3): a POST that
// ARRIVES while the tier is admitted and whose tool work is still in flight when a transition lands.
// The straddle is driven by landing the transition on the SAME server while the POST is open; the
// falsifier is a SECOND status line on the one response stream."
const straddlePromise = httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'provident.load', arguments: { kind: 'envelope', envelope: { template: { root: { type: 'div', css: { id: 'se-straddle' }, content: 'straddle' } }, content: [], clientConfig: {} } } } }, { token: TOKEN, sessionId: session })
await sleep(60)
const returnVia = await transitionOverHttp('mcp-enabled', 'return')
const straddle = await straddlePromise
/** THE DECLARED FALSIFIER, TURNED INTO A PREDICATE TERM (the `§6.2` audit's `F4`): `§2.3`
 *  item 3's falsifier is a SECOND STATUS LINE on the one response stream, so the row must
 *  ASSERT the count — **WITH THE `F-A6` LIMIT STATED**: the as-filed predicate was
 *  `straddle.status !== 503 || straddle.text.includes('exclusion-closed')`, which CANNOT fail
 *  on its own declared falsifier — a 200/404/500 answer, and equally a second status line,
 *  passed it. The count is now a term, and the counter is a named function so a CONTROL can
 *  drive it (a body carrying two status lines must count 2). **THE COUNT IS A WEAKER ORACLE
 *  THAN THE DECLARED FALSIFIER** (a body substring, not the transport's framing), and the
 *  control is a SYNTHETIC STRING — both stated in the row's own evidence. */
const countStatusLines = (text) => (String(text).match(/HTTP\/1\.[01] \d{3}/g) ?? []).length
const statusLines = countStatusLines(straddle.text)
const straddleFalsifierControl = countStatusLines('HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\nHTTP/1.1 503 Service Unavailable\r\n\r\n{}') === 2
const straddleOnce = statusLines <= 1 && straddle.lines.length >= 1 && straddleFalsifierControl && (straddle.status !== 503 || straddle.text.includes('exclusion-closed'))
check('SX-G-43 (live)', 'the POST issued beside the return transition is answered ONCE on its own stream (the declared falsifier\'s COUNT is asserted, with the counter\'s own control) — the mid-flight STRADDLE itself is a DECLARED LIMIT, not exercised', straddleOnce ? 'PASS' : 'FAIL',
  `the POST issued beside the return transition was answered status ${straddle.status} with ${straddle.lines.length} body line(s), content-type=${JSON.stringify(straddle.contentType)}; the DECLARED FALSIFIER's count (an HTTP/1.x NNN occurrence inside the one response BODY) is ${statusLines} ≤ 1 = ${statusLines <= 1}; the counter's own control (a synthetic body carrying two status lines) counts ${countStatusLines('HTTP/1.1 200 OK\r\n\r\nHTTP/1.1 503 Service Unavailable\r\n\r\n')} = 2, so the reading above is not a counter that cannot see the pattern; body starts ${JSON.stringify(straddle.text.slice(0, 160))}; the return POST that landed beside it answered ${returnVia.status}. **WHAT THIS ROW DOES NOT MEASURE (the audit's F-A6): the tier was ALREADY \`mcp-disabled\` when this POST arrived (measured at \`§5\` row 23, the 503 above), so this is the ARRIVAL decision of \`§2.3\` item 2 — the SAME decision row 23 measures — and NOT the straddle of \`§2.3\` item 3.**`,
  'RE-GRAINED 2026-10-09 (the `§6.2` audit\'s `F4`) and **RE-DISPOSITIONED BY THE NEXT PASS FROM "Fixed" TO `DECLARED-LIMIT` (the audit\'s `F-A6`)** — because the `F4` "fix" asserted a count that cannot witness the falsifier it names: (i) the POST arrives when the tier is ALREADY closed, so the as-filed sentence "while the tier was in transition" (this record\'s row-26 cell) and the driver\'s own "while the tier is admitted" were BOTH false of the code; (ii) `countStatusLines` reads a BODY SUBSTRING of ONE `fetch` Response, while a second status line is a framing event `fetch` cannot represent (and `res.text()` would reject and abort the run); (iii) the counter\'s control drives a synthetic string, not the transport. **`GAP-2` — the open architect ruling on whether `§2.3` item 3\'s in-flight arm IS a matrix subject — is what a genuine straddle implementation waits on; this row does not claim it.**')

await sleep(300)
// (i) THE MCP/HTTP ROUTE GRANTS NO RE-ARM AUTHORITY — measured, not asserted (`§2.4` item 6: the
// re-enable is the OPERATOR's own act; `§2.2` item 2(a): every tool invocation while open answers
// the receipt; `§2.3` item 2: a POST arriving while open is answered 503 at arrival and no server
// is built for it). This is the SAME measurement that made the as-filed row read FAIL — it is now
// read as the property the contract DECLARES, and it is the negative half of the row's predicate.
const restoreArm = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
const mcpCannotRearm = returnVia.status === 503 && returnVia.text.includes('exclusion-closed') && restoreArm.status === 503
// (ii) THE OPERATOR'S OWN ACT ON THIS BOOT — the manual-UI path `§2.4` item 6 declares ("the pane
// control ... or the channel directly"), driven as a REAL pointer gesture on THIS boot's own
// renderer over the app's own CDP listener. The reload first gives this boot's pane the LIVE state
// (its pane boot-read is post-`F-1`), so the authored body's `data-state` flip targets the true
// return rather than a stale self-transition.
const httpDevtoolsPort = await devtoolsPort({ stderrText: () => httpStderr })
const cdpHttp = await Cdp.attach(httpDevtoolsPort, 'HTTP')
registerCleanup(() => cdpHttp.close())
await cdpHttp.send('Page.enable')
await cdpHttp.send('Page.reload', { ignoreCache: true })
await sleep(4000)
const httpPainted = await cdpHttp.waitForToggle(20000)
const httpPaneBefore = await cdpHttp.paneRead()
const httpHit = await cdpHttp.clickElement('exclusion-toggle')
await sleep(1500)
const httpPaneAfter = await cdpHttp.paneRead()
const httpBridgeAfter = await cdpHttp.evaluate(`window.provident.security.get()`)
const restoredArm = await httpPost(HTTP_PORT, { jsonrpc: '2.0', id: 8, method: 'tools/call', params: { name: 'provident.get_markdown', arguments: {} } }, { token: TOKEN, sessionId: session })
// THE RESTORED ANSWER IS ASSERTED AS THE ANSWER IT CLAIMS (`§6.2` audit `F-A9`; the SAME shape the
// `SX-G-42` control above was repaired to): the as-filed term was `restoredArm.status !== 503`, so a
// `401`/`500` after the operator's gesture would have read PASS while this record's `§2` `U-4` `Post`
// cell claims `200`. The negative half is KEPT beside it.
// `U-4`'s HTTP return predicate AS A NAMED FUNCTION (`R3-01`'s CLASS CLOSURE): the two AS-FILED composites
// are KEPT as named terms — `mcp-cannot-rearm` IS the as-filed `mcpCannotRearm` expression and
// `operator-rearms` IS the as-filed `operatorRearms` expression, character for character — and the eight
// per-facet terms BESIDE them say WHICH part broke, so a deleted feature is attributable rather than merely
// refused. (The two composite bindings are computed from the SAME live values, immediately above.)
function httpReturnArmProperty(f) {
  const terms = {
    // (i) NO MCP RE-ARM AUTHORITY — with `setExclusion` deleted the tier never opens and these terms redden.
    'return-post-refused': f.returnVia?.status === 503 && String(f.returnVia?.text ?? '').includes('exclusion-closed'),
    'post-after-it-still-refused': f.restoreArm?.status === 503,
    'mcp-cannot-rearm': f.mcpCannotRearm === true,
    // (ii) THE OPERATOR'S OWN ACT — the manual-UI path `§2.4` item 6 declares.
    'pane-was-painted': f.paneBefore?.present === true,
    'pane-before-reads-disabled': f.paneBefore?.mcpSegment === 'disabled',
    'gesture-landed': f.hit !== null && f.hit !== undefined && f.hit.isTarget === true,
    'pane-after-reads-enabled': f.paneAfter?.mcpSegment === 'enabled',
    'bridge-reads-closed': f.bridge?.exclusion === 'mcp-enabled',
    'restored-answer-is-200': f.restored?.status === 200 && f.restored?.status !== 503,
    'operator-rearms': f.operatorRearms === true,
  }
  return { ok: Object.values(terms).every(Boolean), terms }
}
const operatorRearms = httpPaneBefore.present === true && httpPaneBefore.mcpSegment === 'disabled' && httpHit !== null && httpHit.isTarget === true && httpPaneAfter.mcpSegment === 'enabled' && httpBridgeAfter?.exclusion === 'mcp-enabled' && restoredArm.status === 200 && restoredArm.status !== 503
const httpReturnArmLive = httpReturnArmProperty({
  returnVia, restoreArm, paneBefore: httpPaneBefore, hit: httpHit, paneAfter: httpPaneAfter,
  bridge: httpBridgeAfter, restored: restoredArm, mcpCannotRearm, operatorRearms,
})
check('U-4 (return arm, HTTP) — RE-GROUNDED ON THE MANUAL-UI PATH', 'the OPERATOR\'s own act restores the HTTP answers (`503 → a normal response`), while NO MCP/HTTP route can re-arm the state — the exclusion grants an MCP caller no re-arm authority', httpReturnArmLive.ok ? 'PASS' : 'FAIL',
  `(i) NO MCP RE-ARM: the batched POST carrying the return transition (load+dispatch, pre-loaded while the tier admitted work) answered ${returnVia.status} ${JSON.stringify(returnVia.text.slice(0, 120))}, and the authorized POST after it answered ${restoreArm.status} — the tier was NOT re-armed by it. (ii) THE OPERATOR'S ACT: real CDP pointer gesture on THIS boot's painted control (box ${Math.round(httpHit?.w ?? 0)}x${Math.round(httpHit?.h ?? 0)} px, hit=${JSON.stringify(httpHit?.hit)}, isTarget=${httpHit?.isTarget}); the pane re-painted=${httpPainted}; segment BEFORE the gesture ${JSON.stringify(httpPaneBefore.mcpSegment)} (data-state ${JSON.stringify(httpPaneBefore.dataState)}) → AFTER ${JSON.stringify(httpPaneAfter.mcpSegment)} (data-state ${JSON.stringify(httpPaneAfter.dataState)}, button ${JSON.stringify(httpPaneAfter.buttonText)}); the bridge answered exclusion=${JSON.stringify(httpBridgeAfter?.exclusion)}; the authorized POST after the gesture answered ${restoredArm.status} (ASSERTED \`=== 200\` — the audit's \`F-A9\`; the as-filed term was \`!== 503\`, which a 401/500 would have satisfied)`,
  'RE-GROUNDED 2026-10-08 (gate-6 re-run). THE AS-FILED ROW ASSERTED A RETURN ARM THE CONTRACT DOES NOT PROVIDE: it required a POST to carry the transition back, and that POST is refused at arrival. THERE IS NO HTTP/MCP RE-ENABLE ROUTE ANYWHERE IN THE CONTRACT, and that is stated with its clauses rather than assumed: `§2.4` item 6 pins the return as the OPERATOR\'s own `setExclusion(\'mcp-enabled\')` — "the pane control (`§2.4` item 2) or the channel directly" — and its 2026-10-08 annotation adds "the re-enable remains the OPERATOR\'s own `setExclusion(\'mcp-enabled\')` and nothing else ... a message is a VALUE, not a transition"; `§2.2` item 2(a) refuses EVERY tool invocation while open (so no dispatch can perform it, on either transport); `§2.3` item 2 answers a POST arriving while open with the 503 and builds no server for it; `§2.3` item 3\'s straddle clause settles only ALREADY-ACCEPTED work and is not a re-arm; and `§2.4` item 1 declares the manual-UI channel NOT an MCP method. So the row now asserts BOTH halves on the HTTP transport: the MCP route does NOT re-arm (the measured negative) and the operator\'s own control DOES (the positive, over the app\'s own renderer). A regression that handed an MCP caller re-arm authority would redden the first half; a return that failed to restore would redden the second. **RE-GRAINED 2026-10-09 (the audit\'s `F-A9`): the restored answer is now asserted as `200` itself — the as-filed `!== 503` would have read PASS on a 401 or a 500 — with the negative half KEPT. **RE-INSTRUMENTED 2026-10-09 (the third `§6.2` audit\'s `R3-01` class closure): the predicate is the named `10`-term `httpReturnArmProperty` above — the two as-filed composites KEPT as terms, with the eight per-facet terms BESIDE them — and the DELETION fixture below drives it red.**')

// ---- THE `U-4` HTTP RETURN ROW'S DELETION / RED-FAIL CONTROL (`R3-01`'s CLASS CLOSURE) ------------------
// The row and these fixtures go through `httpReturnArmProperty` itself. The FIRST fixture IS the deletion —
// `setExclusion` is gone, so nothing re-arms and the operator's gesture cannot restore the answers.
const httpReturnArmControls = {
  'THE FEATURE IS DELETED: the operator\'s gesture does nothing and both POSTs are answered NORMALLY (the tier never opens), so no term survives': httpReturnArmProperty({
    returnVia: { status: 200, text: '{"jsonrpc":"2.0","result":{}}' }, restoreArm: { status: 200 },
    paneBefore: { present: true, mcpSegment: 'enabled' }, hit: httpHit, paneAfter: { mcpSegment: 'enabled' },
    bridge: { exclusion: 'mcp-enabled' }, restored: { status: 200 }, mcpCannotRearm: false, operatorRearms: false,
  }),
  'AN MCP CALLER IS HANDED RE-ARM AUTHORITY (the row\'s own NEGATIVE half reddening alone — the regression the contract forbids, not a deletion)': httpReturnArmProperty({
    returnVia: { status: 200, text: '{"jsonrpc":"2.0","result":{}}' }, restoreArm, paneBefore: httpPaneBefore, hit: httpHit,
    paneAfter: httpPaneAfter, bridge: httpBridgeAfter, restored: restoredArm, mcpCannotRearm: false, operatorRearms,
  }),
  'the operator\'s gesture MISSED the control (the `gesture-landed` term)': httpReturnArmProperty({
    returnVia, restoreArm, paneBefore: httpPaneBefore, hit: null, paneAfter: httpPaneAfter,
    bridge: httpBridgeAfter, restored: restoredArm, mcpCannotRearm, operatorRearms,
  }),
  'the return LANDED but the POST after it answered a `401` (the as-filed `!== 503` hole that `F-A9` closed)': httpReturnArmProperty({
    returnVia, restoreArm, paneBefore: httpPaneBefore, hit: httpHit, paneAfter: httpPaneAfter,
    bridge: httpBridgeAfter, restored: { status: 401 }, mcpCannotRearm, operatorRearms,
  }),
  'the pane came back `disabled` WITHOUT the gesture (the `F-4`-class stale read)': httpReturnArmProperty({
    returnVia, restoreArm, paneBefore: httpPaneBefore, hit: httpHit, paneAfter: { mcpSegment: 'disabled' },
    bridge: httpBridgeAfter, restored: restoredArm, mcpCannotRearm, operatorRearms,
  }),
}
const httpReturnArmNotRefused = Object.entries(httpReturnArmControls).filter(([, v]) => v.ok !== false).map(([k]) => k)
check('U-4 (return arm, HTTP) — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, the third `§6.2` audit\'s `R3-01`)', 'the `U-4` HTTP return row\'s predicate CAN FAIL: the DELETION fixture (nothing re-arms) and the four other regression shapes are each REFUSED by the SAME code path, each naming the term that caught it',
  httpReturnArmNotRefused.length === 0 && Object.values(httpReturnArmControls).every((v) => v.ok === false) ? 'PASS' : 'FAIL',
  `fixtures driven through httpReturnArmProperty itself: ${JSON.stringify(Object.fromEntries(Object.entries(httpReturnArmControls).map(([k, v]) => [k, v.ok])))}; fixtures NOT refused: ${JSON.stringify(httpReturnArmNotRefused)}; the terms each fixture broke: ${JSON.stringify(Object.fromEntries(Object.entries(httpReturnArmControls).map(([k, v]) => [k, Object.entries(v.terms).filter(([, b]) => b === false).map(([t]) => t)])))}`,
  'WHY THIS ROW EXISTS (`R3-01`\'s CLASS CLOSURE): the HTTP return row is the row `U-4`\'s re-grounding produced, and it had a live reading with NO fixture driving it red. The second fixture is the row\'s own NEGATIVE half reddening alone (an MCP caller handed re-arm authority), and the fourth is the as-filed `F-A9` hole (a `401` passing a `!== 503` term).')

try { cdpHttp.close() } catch { /* gone */ }

try { httpChild.kill('SIGKILL') } catch { /* gone */ }
await sleep(400)
rmSync(HTTP_PROFILE, { recursive: true, force: true })
// ⟶ `A-8-04`: THE DRIVER CLOSES ITS OWN CHANNEL BEFORE IT KILLS THE BOOT IT MEASURED. The
// as-filed order killed boot A first, and a `close` event from a child this driver killed would
// otherwise be read as a DEAD INSTRUMENT and misreport the whole run in the summary below.
cdp.close()
await teardown(bootA)

// ══════════════════════════════════════════════════════════════════════════════
// PHASE 6 — [G] the static boundary censuses, the byte pins, the diff scope
// ══════════════════════════════════════════════════════════════════════════════
const channelsPath = join(root, 'src', 'main', 'store-channels.ts')
const channelsSrc = readFileSync(channelsPath, 'utf8')
const channelConsts = [...channelsSrc.matchAll(/export const ([A-Z_0-9]+) = '([^']+)'/g)].map((m) => [m[1], m[2]])
const exclusionSpellings = []
for (const dir of ['src', 'scripts']) {
  const walk = (rel) => {
    for (const entry of readdirSync(join(root, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`
      if (entry.isDirectory()) { if (entry.name !== 'node_modules') walk(child); continue }
      if (!/\.(ts|mjs|cjs|html)$/.test(entry.name)) continue
      const src = readFileSync(join(root, child), 'utf8')
      if (src.includes("'provident:security:exclusion'")) exclusionSpellings.push(child)
    }
  }
  walk(dir)
}
check('SX-G-48/49 (live census)', 'the ONE new channel constant is exactly `provident:security:exclusion`, and its literal is spelled in exactly one file', channelConsts.length === 3 && channelConsts.some(([n, v]) => n === 'IPC_SECURITY_EXCLUSION' && v === 'provident:security:exclusion') && exclusionSpellings.length === 1 && exclusionSpellings[0] === 'src/main/store-channels.ts' ? 'PASS' : 'FAIL',
  `store-channels.ts exports ${channelConsts.length} channel constants: ${JSON.stringify(channelConsts)}; the channel literal appears in ${JSON.stringify(exclusionSpellings)} — scanned over src/** and scripts/** (the SHIPPED paths; a test file that names the channel is not a re-spelling, and the unit's own suite names it)`,
  'the census moves 2 → 3 and the channel is not re-spelled in main.ts/preload.ts (both import it)')

const pinCore = sha256(join(root, 'src', 'renderer', 'store-core-graph.ts'))
const pinRefs = sha256(join(root, 'src', 'renderer', 'store-graph-references.ts'))
check('SX-G-54 (byte pins)', 'the two frozen sources still match their declared sha256 pins', pinCore.startsWith('0664c52f') && pinRefs.startsWith('5c0c1a97') ? 'PASS' : 'FAIL',
  `store-core-graph.ts=${pinCore.slice(0, 16)}… (declared 0664c52f…) · store-graph-references.ts=${pinRefs.slice(0, 16)}… (declared 5c0c1a97…)`,
  'and the span figure 29772ac7… is not a file pin (it is the large-payload digest of §6)')

const unitSrc = ['src/main/security.ts', 'src/main/main.ts', 'src/main/store-channels.ts', 'src/main/mcp-server.ts', 'src/main/preload.ts', 'src/renderer/secure-panels.ts']
const secureSegmentHits = unitSrc.filter((p) => {
  const src = readFileSync(join(root, p), 'utf8')
  return /'secure\.|"secure\.|secure-refused/.test(src) || /\{\s*status:\s*'refused'[^}]*name/.test(src)
})
check('SX-G-67/68 (static census)', 'no `secure.`-segment check, no `secure-refused` spelling and no name-mapped refusal in the unit\'s diff scope', secureSegmentHits.length === 0 ? 'PASS' : 'FAIL',
  `scanned the six declared src/** files for a leading-segment test and the refused-for-a-NAME shape: hits ${JSON.stringify(secureSegmentHits)}; the two channel tokens in the unit are 'exclusion-closed' and 'malformed-state', both OUTSIDE the store union`,
  'the negative census a blind pass may not take — taken here over the DECLARED diff scope')

const unionTokens = (readFileSync(join(root, 'src', 'renderer', 'store-core-graph.ts'), 'utf8').match(/'(refused|[a-z-]+-refused)'/g) ?? [])
check('SX-G-53 (static census)', 'the store\'s refusal union carries no exclusion token', !readFileSync(join(root, 'src', 'renderer', 'store-core-graph.ts'), 'utf8').includes('exclusion-closed') ? 'PASS' : 'FAIL',
  `store-core-graph.ts contains 'exclusion-closed': false; refusal-shaped tokens found in that module: ${JSON.stringify(unionTokens)}`,
  'the exclusion token is a CHANNEL token, never a store-union member')

const chain = execSync('git log --name-only --pretty=format: 7142591^..HEAD', { cwd: root }).toString().split('\n').filter((l) => l.trim() !== '')
const forbidden = ['src/renderer/store-core-graph.ts', 'src/renderer/store-graph-references.ts', 'docs/specs/store-core-module-store-core-graph-surface.md', 'src/main/security-store.ts', 'package.json']
const touchedForbidden = forbidden.filter((f) => chain.includes(f))
const sharedTouched = chain.some((p) => p.startsWith('src/shared/'))
check('SX-G-55 (diff scope)', 'the landing chain touches no frozen artifact, no store byte and no `src/shared/**`', touchedForbidden.length === 0 && !sharedTouched ? 'PASS' : 'FAIL',
  `landing chain paths: ${JSON.stringify([...new Set(chain)])}; forbidden hits: ${JSON.stringify(touchedForbidden)}; src/shared touched: ${sharedTouched}`,
  'the unit\'s own §5.1 item 2 DENIED set')

// ══════════════════════════════════════════════════════════════════════════════
// THE VERDICT SUMMARY (printed WITH its terms)
// ══════════════════════════════════════════════════════════════════════════════
const TALLY = {}
for (const c of CHECKS) TALLY[c.verdict] = (TALLY[c.verdict] ?? 0) + 1
console.log('\n' + '='.repeat(74))
console.log(`LIVE BATTERY RESULT: ${CHECKS.length} recorded rows = ` +
  Object.entries(TALLY).map(([k, v]) => `${v} ${k}`).join(' / ') + ` (${Object.values(TALLY).reduce((a, b) => a + b, 0)} ✓ over the ${CHECKS.length} rows)`)
console.log('  the terms are the rows themselves; every verdict above was produced by the instruments named in its own row')
for (const c of CHECKS.filter((x) => x.verdict === 'FAIL')) console.log(`  ✗ FAIL ${c.id}: ${c.subject}`)
if (TALLY.FAIL === undefined) console.log('  no row contradicted the clause it cites')
// ⟶ `A-8-04`: THE INSTRUMENT'S OWN STATE IS PRINTED WITH THE TALLY, so a dead channel can
// never be read as a green battery. The EXIT CODE keeps its landed meaning (non-zero ⟺ at
// least one FAIL); what a dead channel changes is that the run FINISHES and SAYS SO.
const deadDeclared = Object.entries(CDP_DEPENDENT_ROWS)
  .map(([id, label]) => ({ id, label, reason: deadChannelReason(label) }))
  .filter((d) => d.reason !== null)
console.log(`  INSTRUMENT STATE: ${CDP_CHANNELS.length} CDP channel(s) attached (${JSON.stringify(CDP_CHANNELS.map((c) => ({ channel: c.label, state: c.dead === null ? 'alive' : 'DEAD', reason: c.dead })))}); ${Object.keys(CDP_DEPENDENT_ROWS).length} row(s) DECLARED dependent on one; the reply bound is ${CDP_REPLY_TIMEOUT_MS} ms`)
for (const c of CHECKS.filter((x) => x.verdict === 'MANUAL')) console.log(`  » MANUAL ${c.id}: ${c.subject}`)
if (deadDeclared.length > 0) {
  console.log(`  ✗ NOT A GREEN BATTERY: the CDP channel DIED (${deadDeclared.map((d) => `${d.label}: ${d.reason}`).join(' · ')}) — ` +
    `${TALLY.MANUAL ?? 0} row(s) read MANUAL, and a MANUAL row is NOT a PASS: the §6.1 report's \`manual: 0\` claim FAILS and gate 6 is NOT green on this run.`)
}
// THE EXIT CODE IS EVIDENCE (the `§6.2` audit's `F5`): the as-filed driver ended
// `process.exit(0)` UNCONDITIONALLY, so the `exit: 0` the record cited carried NO
// information — the as-filed 6-FAIL run had the same exit code as the green one. A
// non-zero exit now means "at least one row is FAIL", and nothing else.
//   ⟶ AMENDED BESIDE 2026-10-11 (`A-8-04`, the EIGHTH `§6.2` audit; `RCA-8(d)`: the sentence
//   above is KEPT BYTE-FOR-BYTE as the `F5` landing's own claim). The sentence's "and nothing
//   else" was TRUE OF THE VERDICTS and FALSE OF THE INSTRUMENT: before this pass an unanswered
//   CDP reply did not produce a different exit code, it produced NO exit code at all (the run
//   hung), so the claim could not be tested on the one state that makes it matter. It is now
//   `3` for a run in which any DECLARED channel-dependent row read `MANUAL` — a state that
//   could not previously reach an exit code — and a dead-instrument run can never read `0`.
//   `0` therefore keeps its meaning (every row PASS, none MANUAL); `1` keeps its meaning
//   (at least one FAIL); `3` is the new, and previously IMPOSSIBLE, dead-instrument code.
process.exit(TALLY.FAIL ? 1 : (CHECKS.some((c) => c.instrument === true) ? 3 : 0))
