// tests/e2e/modularity/module-executor.test.ts — THE L1 BATTERY for `modularity`'s `U1`: the five rows
// `docs/L1/modularity.md` §3 files at this head (`M-1`..`M-5`, proving `S-1`..`S-5`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR. The module system today registers NAMES and executes nothing: `syncModuleRouter`
// hands each DECLARED capability an echoing handler and says in its own words that `entry` is never evaluated
// (`src/main/mcp-server.ts:317-347`), `ModuleDependency.versionRange` is "declared, no resolver this pass"
// (`src/shared/types.ts:213-230`), and the application version is the hard-coded `'0.1.0'` literal
// (`src/main/mcp-server.ts:864`) — the intake's A1/A2/A5 and findings 6/7/8/12. **SO EVERY ROW BELOW IS RED AT
// THIS HEAD UNTIL `S-1`..`S-5` LAND, AND EACH RED IS THE ABSENCE IT NAMES**: an installed module's entry is never
// evaluated, so its tool answers nothing at all; nothing withdraws a superseded registration; nothing admits or
// refuses a source; nothing resolves a range; and `tools/list` carries the foundation's set alone. **AND THE ECHO
// HANDLER IS UNREACHABLE THROUGH THIS SURFACE, WHICH IS READ OFF THE TREE RATHER THAN ASSUMED**: `syncModuleRouter`
// IS re-synced after an install (`src/main/mcp-server.ts:1043-1049`), but the live stdio server's registry is built
// ONCE, at `createServer` (`:1062-1075`), out of whatever the router held at that instant — and the boot's router is
// empty — so a name nobody declared AND a name the manifest declared BOTH give this client no tool at all: not even
// the `{tool, args}` echo a declared name would have answered had it ever been published.
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): one boot of the bundle `npm run build`
// produces, on its own scratch profile, handshaking the real MCP transport over stdio, driven ONLY through the
// tools an agent has — `module.install`, `module.update`, a dynamic `module:<name>.<tool>` call, `tools/list` and
// the initialized `serverInfo.version`. **THIS FILE IMPORTS NO `src/**` AND NO `scripts/**`**: the internals these
// rows name are the ones the design moves, and `npm run typecheck:tests` types the `tests/**` tree alone (the
// rule `tests/e2e/tier-readout/` states in its own header). **NO ROW IS SKIPPED OR SOFTENED, and this file
// carries no `strata:marked` marker**: a `tests/e2e/**` file always gates (D-30, D-40).
//
// THE FIVE ROWS SEQUENCE OVER ONE BOOT, AND THAT IS A DECISION RATHER THAN AN ECONOMY: each installs a module into
// the ONE registry a boot constructs (`src/main/main.ts:630-631`), so a second boot would measure a second
// registry and buy nothing — and the live-boot lock (`D-94`) is then held once instead of five times. The rows'
// order is the contract's own order: install and execute (`M-1`), withdraw and re-register (`M-2`), admit
// (`M-3`), resolve (`M-4`), publish (`M-5`).
//
// **A REFUSAL IS A VALUE AND THE EXISTING ARM IS THE ONE IT USES**: `{status:'rejected', reason}` is the
// `ModuleInstallResult` this tree already declares (`src/shared/types.ts:241-246`), so no new tool, no new member
// and no new surface is added to prove a step — `D-18`'s rule applied to a battery.
//
// WHAT THE ROWS DO NOT MEASURE, STATED BECAUSE AN ABSENT ROW IS OTHERWISE INDISTINGUISHABLE FROM A FORGOTTEN ONE:
//   · nothing here is batched or delivered — the passthrough's batch is `U3`'s (`M-11`/`M-13`), and a gating row
//     filed before its step is implementable cannot pass (design §6: the ruling is that page's own, with D-40 and
//     D-30 owning why a row that cannot green is evidence of nothing). **AND `D-307` RE-GRAINS WHAT THOSE TWO ROWS
//     WILL MEASURE, AND WHEN THEY FILE**: a module's listener has TWO OPTIONAL HALVES — a main/server handler
//     invoked when the store fires it, whose return is the channel's DATA FOR THAT LISTENER, and a client/renderer
//     listener the channel fires on delivery — and a listen declaring no main half is wrapped as a STRAIGHT
//     PASSTHROUGH; because the witness for both halves is REALM-side, the two rows are filed with the first
//     realm-side driver (`S-20`'s) and not at `U3`'s own landing, and they file in their OWN battery
//     (`tests/e2e/module-channel/`), not here. So `M-11` is the batch (one delivery carrying every entry one
//     write turn fired, the entries sharing one `turn`: a main half's return, an empty return, the triggering
//     address on the passthrough arm, a main half that THREW contained and named, and a return that is not
//     transport-safe refused BY NAME) and `M-13` is the fan-out (each entry's client half fired on delivery,
//     contained per module, and the crossing path's two halves under an address-keyed fan-out);
//   · nothing here adds, moves or paints a node — the registries, the pane point, the template point and the
//     overlay placeholders are `U2`/`U4`/`U5`'s;
//   · a module's RENDERER half is not driven: `M-1`..`M-5` are the main-side contract, and the client half needs
//     a driver envelope the pane rows will carry — **nor is a listener's CLIENT half, which is `M-13`'s and is
//     reserved with it** (`D-307`);
//   · `S-1`'s SECOND DELIVERY is not driven: no bundled module exists at this head (there is no `src/modules/`, and
//     whether the bundler emits a module's source string or its exports is `OWED-3`'s and L2's), so `M-1` measures the
//     installed-source-STRING delivery, and "the same shape to the executor" only on its MAIN half;
//   · the two-gate's NEGATIVE half is not measured: `S-5` says the `module:` invocation two-gate STANDS, and the only
//     grant this file can carry is the profile seed (`provident-security.json`'s `enabled`, `D-85`) — nothing on this
//     surface narrows `code` — so `M-5` shows the gate ADMITS under `module`+`code`, which is one arm of two. The other
//     arm would need a second boot on a seed without `code`, and that breaks §6's one-boot grain;
//   · no row boots a second host: the browser/Node build is upstream-blocked (the `provident-storeroom` WASM build
//     is pending, `D-298`/`D-299`), so cross-compatibility is read as the contract's absence of host APIs and not
//     as a second boot (design §6 (ii)).
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON. A boot that publishes a load error is reported AT
// ONCE with that error, never as a timeout; a handshake that never settles is reaped and PROVED gone before the
// lock is released; `afterAll` SIGKILLs every process of this boot's tree, reaps and PROVES zero survivors over the
// whole file before the profiles go and before a survivor could ever be a warning (D-74); and `process.on('exit')`
// is the net for the teardown that never runs at all — the same net `tests/e2e/tier-readout/` carries, which this
// file lacked.
// A `DISPLAY` IS A PREREQUISITE OF THE BOOT AND NEVER A SKIP — `main` creates its one `BrowserWindow`
// unconditionally (`src/main/main.ts:1070`) — and no row here measures a renderer, which is a fact about the rows.
import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import type { Transport, TransportSendOptions } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { JSONRPCMessage, MessageExtraInfo } from '@modelcontextprotocol/sdk/types.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { main: string; version: string }
/** The built main-process bundle every boot runs — the artifact `npm run build` produces (`strata/brief.md` §6). */
const mainEntry = join(repoRoot, pkg.main)
/** The Electron BINARY, never the `.bin` wrapper: the wrapper is a `cli.js` Node process whose child survives a kill
 *  and re-materialises a scratch profile (`scripts/electron-spawn.mjs`'s `F-1`). Resolution order: the canonical
 *  unpacked binary, then the package's own `path.txt` contract. */
const electronBin = ((): string => {
  const dir = join(repoRoot, 'node_modules', 'electron')
  const candidates = [join(dir, 'dist', 'electron')]
  try {
    const rel = readFileSync(join(dir, 'path.txt'), 'utf8').trim()
    if (rel !== '') candidates.push(join(dir, rel))
  } catch {
    /* no readable path.txt — the canonical candidate stands on its own */
  }
  const found = candidates.find((candidate) => existsSync(candidate))
  if (found === undefined) throw new Error(`electron binary not found (tried: ${candidates.join(', ')})`)
  return found
})()
/** The landed argument vector minus its profile members (`scripts/electron-spawn.mjs`'s `baseArgs`, `D-94`): the
 *  built bundle, the stdio transport, and the six flags a headless host needs. */
const BASE_ARGS = ['--mcp-transport=stdio', '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer',
  '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage']
/** The bound every wait is held to. Generous for the reason the boot battery states: a full `npm test` runs many
 *  workers, and a boot delayed by work this row does not control is not a defect (`boot-contract.test.ts`). */
const BOUND_MS = 60_000
/** The rows' own bound: five rows share one boot, and the resolver's rows each install several modules. */
const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/
/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the store's one written name stands at
 *  `<profile>/provident-profile.json`, and this battery's grain is the built artifact, so the name is a literal
 *  and never an import (D-27). */
const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful
 *  way to supply this run's grant, since no bridge route can widen it (`D-85`, `D-94`'s seeded profile). **`module`
 *  AND `code` ARE BOTH REQUIRED AND FOR DIFFERENT REASONS**: `module` is `module.install`'/`module.update`'s group
 *  and the dynamic `module:<n>.<t>` tools' registration group, and `code` is the invocation two-gate a module tool
 *  must ALSO pass (`src/main/security.ts:52-64`, `module-import-proposal.md` §5). */
const SECURITY_SEED = 'provident-security.json'
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
/** The five module names this battery installs, spelled once: a name carries no `.` and no `:` (`registerModule`'s
 *  own injectivity rule), so a hyphen is the only separator used below. `matrix-publish` is `M-5`'s own: the row that
 *  compares the number the resolver JUDGES with the number the transport PUBLISHES must take that judgement itself
 *  rather than inherit it from `M-4`, or its red would name a prerequisite instead of its own absence. */
const ALPHA = 'matrix-alpha'
const BASE = 'matrix-base'
const DEP = 'matrix-dep'
const NOW = 'matrix-now'
const PUBLISH = 'matrix-publish'

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
/** `StdioClientTransport`'s `env` is a closed `Record<string, string>`; `process.env` is not. */
const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))
const tail = (text: string, lines = 12): string => text.split('\n').slice(-lines).join('\n')

// ---- reading JSON without trusting it ---------------------------------------
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}

// ---- the process table and the teardown (D-74) ------------------------------
interface Proc { pid: number; ppid: number; args: string }
/** How many kill-and-recheck sweeps a teardown gets: a swept tree can be replaced mid-sweep (a zygote forks a
 *  renderer), so one pass is a snapshot. Bounded, because an unbounded loop on a teardown path is a wedged harness. */
const REAP_PASSES = 20
const REAP_PAUSE_MS = 15
function pauseSync(ms: number): void {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  } catch {
    /* no SharedArrayBuffer: the sweep still runs */
  }
}
/** The live process table. THROWS when it cannot be read: an unreadable table must never be reported as "nothing to
 *  reap", which turns a leak into a green (`D-74`). */
function processTable(): Proc[] {
  try {
    const rows: Proc[] = []
    for (const entry of readdirSync('/proc')) {
      if (!/^[0-9]+$/.test(entry)) continue
      const pid = Number(entry)
      if (pid === process.pid) continue
      let args = ''
      try {
        args = readFileSync(`/proc/${entry}/cmdline`, 'utf8').split('\0').join(' ').trim()
      } catch {
        continue
      }
      if (args === '') continue
      const stat = readFileSync(`/proc/${entry}/stat`, 'utf8')
      const ppid = Number(stat.slice(stat.lastIndexOf(')') + 1).trim().split(' ')[1])
      rows.push({ pid, ppid: Number.isSafeInteger(ppid) ? ppid : 0, args })
    }
    return rows
  } catch {
    const listing = execFileSync('ps', ['-eo', 'pid=,ppid=,args='], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
    return listing.split('\n').flatMap((line): Proc[] => {
      const parts = line.trim().split(/\s+/)
      const pid = Number(parts[0])
      const ppid = Number(parts[1])
      if (!Number.isSafeInteger(pid) || pid <= 0 || pid === process.pid) return []
      return [{ pid, ppid: Number.isSafeInteger(ppid) ? ppid : 0, args: parts.slice(2).join(' ') }]
    })
  }
}
/** Every process belonging to a boot on one of these profiles: the ones naming a scratch profile and every DESCENDANT
 *  of those — the zygotes carry `--no-sandbox` and nothing else and are reachable only that way (`D-74`). */
function membership(rows: Proc[], profiles: string[], seeds: number[]): Set<number> {
  const matched = new Set<number>(seeds.filter((pid) => Number.isSafeInteger(pid) && pid > 0))
  for (const row of rows) if (profiles.some((profile) => row.args.includes(profile))) matched.add(row.pid)
  for (let grew = true; grew;) {
    grew = false
    for (const row of rows) {
      if (matched.has(row.pid) || !matched.has(row.ppid)) continue
      matched.add(row.pid)
      grew = true
    }
  }
  return matched
}
interface ReapReport { killed: number[]; passes: number; survivors: Proc[] }
function reap(profiles: string[], seeds: number[]): ReapReport {
  const killed: number[] = []
  let held = seeds.filter((pid) => Number.isSafeInteger(pid) && pid > 0)
  for (let pass = 1; pass <= REAP_PASSES; pass += 1) {
    const rows = processTable()
    const alive = new Set(rows.map((row) => row.pid))
    const targets = membership(rows, profiles, held.filter((pid) => alive.has(pid)))
    if (targets.size === 0) return { killed, passes: pass, survivors: [] }
    for (const pid of targets) {
      try {
        process.kill(pid, 'SIGKILL')
        if (!killed.includes(pid)) killed.push(pid)
      } catch {
        /* ESRCH: gone between the snapshot and the kill, which is the outcome wanted */
      }
    }
    held = [...new Set([...held, ...targets])]
    pauseSync(REAP_PAUSE_MS)
  }
  const rows = processTable()
  const alive = new Set(rows.map((row) => row.pid))
  const still = membership(rows, profiles, held.filter((pid) => alive.has(pid)))
  return { killed, passes: REAP_PASSES, survivors: rows.filter((row) => still.has(row.pid)) }
}

// ---- ONE LIVE BOOT AT A TIME, HOST-WIDE (`D-94`, `D-74`) --------------------
/** A second spawning battery in another worker holds the same lock: two Electron trees on one host red each other's
 *  rows, and the contention is the MACHINE's — never a port and never a profile, because every boot here carries its
 *  own `mkdtemp` profile and its own stdio pipe. A lock serialises the live boots and nothing else, while a runner
 *  knob would serialise every file the suite carries. **No row is skipped or softened for it** (D-30, D-40). */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
const BOOT_LOCK_SETTLE_MS = 2_000
const BOOT_LOCK_BOUND_MS = 120_000
function pidAlive(pid: number): boolean {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM'
  }
}
interface LockHolder { pid: number; since: number; why: string }
function lockHolder(): LockHolder | null {
  try {
    const [pid, since, ...why] = readFileSync(BOOT_LOCK_OWNER, 'utf8').trim().split(' ')
    const held = Number(pid)
    return Number.isSafeInteger(held) && held > 0 ? { pid: held, since: Number(since), why: why.join(' ') } : null
  } catch {
    return null
  }
}
function lockAgeMs(): number {
  try {
    return Date.now() - statSync(BOOT_LOCK).mtimeMs
  } catch {
    return Number.POSITIVE_INFINITY
  }
}
const liveBootReleases: Array<() => void> = []
async function acquireLiveBoot(why: string): Promise<() => void> {
  const started = Date.now()
  for (;;) {
    try {
      mkdirSync(BOOT_LOCK)
      writeFileSync(BOOT_LOCK_OWNER, `${process.pid} ${started} ${why}`)
      let released = false
      const release = (): void => {
        if (released) return
        released = true
        // A lock naming ANOTHER pid is that holder's: this release has been overtaken and must not remove it.
        const holder = lockHolder()
        if (holder !== null && holder.pid !== process.pid) return
        try {
          rmSync(BOOT_LOCK, { recursive: true, force: true })
        } catch {
          /* best effort on a release path */
        }
      }
      liveBootReleases.push(release)
      return release
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw new Error(
          `the live-boot lock could not be taken at \`${BOOT_LOCK}\`: ${error instanceof Error ? error.message : String(error)}. ` +
            `The spawning batteries are serialised so their boots cannot overlap, so a lock path that cannot be created is a ` +
            `harness fault and never a row's reading.`,
        )
      }
    }
    const holder = lockHolder()
    if (holder === null) {
      if (lockAgeMs() < BOOT_LOCK_SETTLE_MS) {
        await sleep(BOOT_LOCK_POLL_MS)
        continue
      }
      try {
        rmSync(BOOT_LOCK, { recursive: true, force: true })
      } catch {
        /* somebody else swept it first */
      }
      continue
    }
    if (!pidAlive(holder.pid) || Date.now() - holder.since > BOOT_LOCK_BOUND_MS * 2) {
      try {
        rmSync(BOOT_LOCK, { recursive: true, force: true })
      } catch {
        /* somebody else swept it first */
      }
      continue
    }
    if (Date.now() - started > BOOT_LOCK_BOUND_MS) {
      throw new Error(
        `the live-boot lock at \`${BOOT_LOCK}\` is still held by pid ${holder.pid} after ${BOOT_LOCK_BOUND_MS} ms — holder ` +
          `"${holder.why}", since ${new Date(holder.since).toISOString()}. The spawning batteries are SERIALISED (one live boot ` +
          `at a time, host-wide) so their trees cannot contend, and this wait is bounded and stated, never silent.`,
      )
    }
    await sleep(BOOT_LOCK_POLL_MS)
  }
}
const scratchProfiles: string[] = []
const livePids: number[] = []
/** **THE NET FOR A TEARDOWN THAT NEVER RUNS** (`D-74`): a rejected `beforeAll`, a killed worker or an interrupted run
 *  leaves this boot's tree alive and the live-boot lock held otherwise. `tests/e2e/tier-readout/` carries the same net
 *  for the same reason, and this file had none — which is a leaked Electron tree whenever `afterAll` does not run. The
 *  order is `D-74`'s on every path: reap the tree, then RELEASE (a lock held past a dead teardown wedges the sibling
 *  spawning battery for its whole bound), then remove the profiles. A SIGKILLed worker gets no net at all, and that
 *  limit is stated rather than hidden. */
process.on('exit', () => {
  reap([...scratchProfiles], [...livePids])
  for (const release of [...liveBootReleases]) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  for (const dir of scratchProfiles) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort on an exit path */
    }
  }
})
// ---- bounded waits ----------------------------------------------------------
interface Observed { ended: { code: number | null; signal: NodeJS.Signals | null } | null; error: string | null }
const observed = (): Observed => ({ ended: null, error: null })
function diagnose(label: string, caught: unknown, seen: Observed, trace: string): Error {
  const how = seen.ended === null ? 'still running' : `exit code ${String(seen.ended.code)}, signal ${String(seen.ended.signal)}`
  return new Error(
    `${label}: ${caught instanceof Error ? caught.message : String(caught)}. The child was ${how}` +
      `${seen.error === null ? '' : `, transport error "${seen.error}"`}; its stderr tail stands:\n${tail(trace)}`,
  )
}
async function withBound<T>(work: Promise<T>, label: string, trace: () => string): Promise<T> {
  const started = Date.now()
  let timer: ReturnType<typeof setInterval> | undefined
  const watched = new Promise<never>((_resolve, reject) => {
    timer = setInterval(() => {
      const seen = trace()
      if (LOAD_ERROR.test(seen)) reject(new Error(`${label}: the process published a failure instead of answering —\n${tail(seen)}`))
      else if (Date.now() - started > BOUND_MS) {
        reject(new Error(`${label}: no answer within the ${BOUND_MS} ms bound — the trace stands:\n${tail(seen)}`))
      }
    }, 50)
  })
  try {
    return await Promise.race([work, watched])
  } finally {
    if (timer !== undefined) clearInterval(timer)
  }
}
/** **THE WHOLE ARTIFACT SET A BOOT LOADS, AND NOT ONLY ITS ENTRY POINT**: waiting on `main.mjs` alone let a boot start
 *  in the window where the main bundle was back and the renderer was not, and a boot answered `ERR_FILE_NOT_FOUND`
 *  instead of measuring its row. An absent member is a named prerequisite failure and never a silent one (D-27). */
const BOOT_ARTIFACTS = [
  join(repoRoot, 'dist', 'main', 'main.mjs'),
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
function artifactReady(file: string): boolean {
  try {
    return existsSync(file) && statSync(file).size > 0
  } catch {
    return false
  }
}
/** The build's own bound, deliberately smaller than `ROW_MS`: a build that spends past it reds as a NAMED build
 *  failure inside the row that asked for it, never as a row timeout that leaves the live-boot lock held (`F-2`). */
const BUILD_MS = 120_000
/** **THE ARTIFACT SET IS ENSURED, NOT WAITED FOR, BY THE ONE CLAIMANT THAT HOLDS THE LOCK** (`D-227`'s cure shape):
 *  present ⇒ a `stat` and no build at all; absent ⇒ THIS process builds it once, under the lock it already holds, so
 *  no builder can be queued for that same lock while this boot waits for its output. */
async function ensureArtifacts(): Promise<void> {
  if (BOOT_ARTIFACTS.every(artifactReady)) return
  const before = BOOT_ARTIFACTS.filter((file) => !artifactReady(file))
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    throw new Error(
      `the built artifact set is absent at [${before.join(', ')}] and \`npm run build\` — run by this battery ITSELF, under ` +
        `the host-wide live-boot lock it already holds — failed inside its ${BUILD_MS} ms bound: ` +
        `${error instanceof Error ? error.message : String(error)}. This battery boots the ARTIFACT \`npm run build\` ` +
        `produces, so a build that cannot produce it is a harness prerequisite failure and never a row's reading (D-27).`,
    )
  }
  const after = BOOT_ARTIFACTS.filter((file) => !artifactReady(file))
  if (after.length > 0) {
    throw new Error(
      `\`npm run build\` exited without an error and the artifact set is STILL absent at [${after.join(', ')}] (absent ` +
        `before it ran: [${before.join(', ')}]). This battery spawns into a COMPLETE artifact set or not at all (D-27).`,
    )
  }
}
/** A FRESH scratch profile carrying this run's supplied grant through the retired carrier's import-once path — never a
 *  hand-written instance file, whose bytes are the store's own (`D-85`, `D-94`). */
function makeProfile(name: string): string {
  const profile = mkdtempSync(join(tmpdir(), `${name}-`))
  scratchProfiles.push(profile)
  writeFileSync(join(profile, SECURITY_SEED), JSON.stringify({ token: null, enabled: SEEDED_GROUPS }, null, 2))
  return profile
}

// ---- the MCP plumbing -------------------------------------------------------
interface CallAnswer { ok: boolean; value: unknown; text: string }
async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<CallAnswer> {
  try {
    const answer = await client.callTool({ name, arguments: args })
    const first: unknown = Array.isArray(answer.content) ? answer.content[0] : undefined
    const text = asObject(first) !== null && typeof asObject(first)?.['text'] === 'string' ? (asObject(first)?.['text'] as string) : ''
    try {
      return { ok: true, value: JSON.parse(text), text }
    } catch {
      return { ok: true, value: { __unparsable: text }, text }
    }
  } catch (error) {
    return { ok: false, value: null, text: `MCP ERROR: ${error instanceof Error ? error.message : String(error)}` }
  }
}
/** A `module.install`/`module.update` answer's own `status` member, read as the closed set it is — and a refusal that
 *  arrived as a THROW is named as one, because `D-105` says every refusal is a value. */
const statusOf = (answer: CallAnswer): string => {
  const status = str(memberOf(answer.value, 'status'))
  if (status !== null) return status
  return answer.ok ? '(no `status` member)' : '(refused as a throw)'
}
const reasonOf = (answer: CallAnswer): string => str(memberOf(answer.value, 'reason')) ?? '(no `reason` member)'
/** **THE ONE MANIFEST SHAPE EVERY SOURCE BELOW SPELLS** — a module's declared source is its manifest, and `entry` is
 *  the function-STRING `src/shared/types.ts:220-230` already declares (`needsCode` says `entry !== ''`). The `entry`
 *  text is the module's own code and nothing here rewrites it. */
const sourceOf = (name: string, version: string, entry: string, extra: Record<string, unknown> = {}): string =>
  JSON.stringify({ name, version, entry, ...extra })

// ---- the modules this battery installs --------------------------------------
/** **EVERY SOURCE DECLARES EXACTLY THE TOOLS ITS ENTRY REGISTERS — AND WHERE THE TWO DISAGREE, THE DISAGREEMENT IS THE
 *  ROW'S SUBJECT.** `C-12`'s rule is that a manifest's declaration and its entry's registrations are the SAME set in
 *  BOTH directions (an overstated declaration is refused at install, an undeclared registration at activation), so a
 *  source that declared nothing while its entry registers would be refused for a reason `M-1`/`M-2` do not measure and
 *  those rows could never green. The carrier is `ModuleCapabilities`' `capabilities.tools`
 *  (`src/shared/types.ts:207-211`), the ONE declaration member this tree already has (`handleModuleTool`'s
 *  `parseCapabilities`, `src/main/mcp-server.ts:266-293`); the declaration is what makes `M-3`'s overstatement (②) and
 *  its foundation tool name (③) measurable AT ALL. **AND IT CHANGES NO RED OF `M-1`/`M-2`**: no code evaluates an `entry`, and
 *  a declared name reaches no client through the live transport (the header's own reading), so the row's claim — the
 *  tool answers because the ENTRY registered it, with the module's OWN value — is untouched by the declaration. */
const declares = (...tools: string[]): Record<string, unknown> => ({ capabilities: { tools } })
/** `M-1`/`M-2`'s subject: v1 registers `answer`, v2 registers `answerB` — so the update's inverse has something to
 *  withdraw and `M-2` cannot green on the vacuous reading "nothing was ever registered". */
const ALPHA_V1 = 'function (ctx) { ctx.tool("answer", function () { return { from: "matrix-alpha", value: 42 } }) }'
const ALPHA_V2 = 'function (ctx) { ctx.tool("answerB", function () { return { from: "matrix-alpha", value: "two" } }) }'
/** `M-3`'s three admissions, each declaring exactly what it registers so the ONLY fault on trial is the row's own.
 *  ① a reach for the preload bridge — the token `C-1` puts off limits; ② a declaration that OVERSTATES what the entry
 *  registers (`declared-only` is never registered); ③ a registration of a FOUNDATION tool name, declared as such so the
 *  refusal cannot be read as a declaration/registration mismatch instead. */
const LEAKY = 'function (ctx) { var raw = window.provident; ctx.tool("leak", function () { return raw === null }) }'
const LOUD = 'function (ctx) { }'
const SQUATTER = 'function (ctx) { ctx.tool("provident.dispatch", function () { return 1 }) }'
/** `M-4`'s modules. `matrix-base` answers a tool so its ACTIVATION is observable; `matrix-dep` requires it `>1.1.0`
 *  — the request's own example (*"module B requires module A vers. >1.1.0"*, D-304). **THE DEPENDENCY ELEMENT IS THE
 *  STANDING `ModuleDependency` (`{name, versionRange}`, `src/shared/types.ts:213-217`) AND NOT A NEW `range` MEMBER**:
 *  the design adds no shared type for this (`§2`'s "named and NOT claimed", `ipc-contract`) and cites
 *  `ModuleDependency.versionRange` as the member the resolver is missing (design `§1`, A5), so the container the design
 *  DOES spell — `requires{modules[],app}` (`S-4`, `C-11`) — carries that element unchanged. */
const BASE_ENTRY = 'function (ctx) { ctx.tool("ping", function () { return { from: "matrix-base" } }) }'
const DEP_ENTRY = 'function (ctx) { ctx.tool("tick", function () { return { from: "matrix-dep" } }) }'
const NOW_ENTRY = 'function (ctx) { ctx.tool("clock", function () { return { from: "matrix-now" } }) }'
/** One `requires` member of each kind: a module requirement in `ModuleDependency`'s own spelling, and the application
 *  requirement `C-11` names (`requires.app`) — the number the resolver judges against the ONE accessor's answer. */
const requiresModule = (name: string, versionRange: string): Record<string, unknown> =>
  ({ requires: { modules: [{ name, versionRange }] } })
const requiresApp = (app: string): Record<string, unknown> => ({ requires: { app } })

// ---- one boot ---------------------------------------------------------------
/** A transport over an ALREADY-SPAWNED child's stdio (newline-delimited JSON-RPC, the SDK's own framing). A child that
 *  dies is reported through `onclose`/`onerror`, never swallowed. */
class ChildStdioTransport implements Transport {
  onclose?: () => void
  onerror?: (error: Error) => void
  onmessage?: <T extends JSONRPCMessage>(message: T, extra?: MessageExtraInfo) => void
  private buffer = ''
  private closed = false
  private readonly child: ChildProcess
  constructor(child: ChildProcess) {
    this.child = child
    child.stdout?.setEncoding('utf8')
    child.stdout?.on('data', (chunk: string) => this.onData(chunk))
    child.stdout?.on('end', () => this.shut())
    child.stdin?.on('error', (error: Error) => this.onerror?.(error))
    child.on('exit', (code, signal) => {
      if (!this.closed && (code !== 0 || signal !== null)) this.onerror?.(new Error(`child exited (code ${String(code)}, signal ${String(signal)})`))
      this.shut()
    })
  }
  async start(): Promise<void> {
    /* the child is already running */
  }
  async send(message: JSONRPCMessage, _options?: TransportSendOptions): Promise<void> {
    if (this.closed) throw new Error('transport is closed')
    this.child.stdin?.write(`${JSON.stringify(message)}\n`)
  }
  async close(): Promise<void> {
    if (this.closed) return
    this.closed = true
    try {
      this.child.stdin?.end()
    } catch {
      /* already gone */
    }
    try {
      this.child.kill('SIGKILL')
    } catch {
      /* already gone */
    }
    this.onclose?.()
  }
  private onData(chunk: string): void {
    this.buffer += chunk
    let index = this.buffer.indexOf('\n')
    while (index !== -1) {
      const line = this.buffer.slice(0, index).trim()
      this.buffer = this.buffer.slice(index + 1)
      if (line !== '') {
        try {
          this.onmessage?.(JSON.parse(line) as JSONRPCMessage)
        } catch {
          /* a non-JSON line on stdout is not a protocol message */
        }
      }
      index = this.buffer.indexOf('\n')
    }
  }
  private shut(): void {
    if (this.closed) return
    this.closed = true
    this.onclose?.()
  }
}

interface Boot {
  client: Client
  profile: string
  trace: () => string
  stop: () => Promise<void>
}
/** Spawn the built bundle the way a client spawns it, on a scratch profile, and handshake over stdio. The two profile
 *  flags are ONE decision (`scripts/electron-spawn.mjs` §2.1 item 3): `--user-data-dir` is Chromium's and
 *  `--provident-user-data` is the app's own, and the store lands under the latter. **NO ROW HERE MEASURES A
 *  RENDERER, AND THAT IS A FACT ABOUT THE ROWS AND NOT ABOUT THE BOOT**: `main` creates its one `BrowserWindow`
 *  unconditionally (`src/main/main.ts:1070`, outside every transport arm) and then loads the page, so a display server
 *  is a PREREQUISITE OF THE BOOT — the fact every spawning battery in this suite states (`tests/e2e/tier-readout/`,
 *  `tests/e2e/focus-retirement/`, `tests/e2e/bundle-boot-seam/`) — and a run without one REDS here with the
 *  prerequisite named, never skipping (D-74, D-30). What the five rows read is the surface main answers over stdio,
 *  which stands before the window does (the store is the boot's second act, the window its eleventh, `D-19`).
 *
 *  **THE BOOT WINDOW IS HELD UNDER THE HOST-WIDE LIVE-BOOT LOCK**, taken BEFORE the artifact set is ensured and
 *  released only once this boot's tree is PROVEN gone, so no two spawning batteries' trees contend (`D-94`, `D-74`). */
async function boot(profile: string): Promise<Boot> {
  const display = process.env['DISPLAY']
  if (typeof display !== 'string' || display === '') {
    throw new Error(
      'PREREQUISITE ERROR — no display server: DISPLAY is unset. This battery boots the REAL Electron bundle, whose ' +
        'main creates its one BrowserWindow unconditionally (src/main/main.ts:1070), so no boot — and therefore no row ' +
        'above it — can stand on this host. Fix: `DISPLAY=:0 npx vitest run tests/e2e/modularity/`, or wrap the run in ' +
        'xvfb-run. This is a RED and never a skip (tests/e2e/tier-readout/tier-readout.test.ts:662-668).',
    )
  }
  const releaseBootLock = await acquireLiveBoot(`modularity boot on ${profile}`)
  try {
    await ensureArtifacts()
  } catch (error) {
    releaseBootLock()
    throw error
  }
  let child: ChildProcess
  try {
    child = spawn(electronBin, [mainEntry, ...BASE_ARGS, `--user-data-dir=${profile}`, `--provident-user-data=${profile}`], {
      cwd: repoRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...stringEnv(), DISPLAY: display, ELECTRON_DISABLE_SANDBOX: '1' },
    })
  } catch (error) {
    releaseBootLock()
    throw new Error(`this boot could not spawn ${electronBin}: ${error instanceof Error ? error.message : String(error)}`)
  }
  if (child.pid !== undefined) livePids.push(child.pid)
  let trace = ''
  child.stderr?.on('data', (chunk: unknown) => {
    trace += String(chunk)
  })
  const seen = observed()
  child.on('close', (code, signal) => { seen.ended = { code, signal } })
  const transport = new ChildStdioTransport(child)
  const client = new Client({ name: 'modularity-e2e', version: '0.1.0' })
  transport.onerror = (error: Error) => { seen.error = error.message }
  try {
    await withBound(client.connect(transport), `initialize over stdio on ${profile}`, () => trace)
  } catch (error) {
    try {
      transport.close()
    } catch {
      /* already gone */
    }
    reap([profile], [child.pid ?? 0])
    releaseBootLock()
    throw diagnose(`initialize over stdio on ${profile}`, error, seen, trace)
  }
  const stop = async (): Promise<void> => {
    try {
      await client.close()
    } catch {
      /* already gone */
    }
    try {
      transport.close()
    } catch {
      /* already gone */
    }
    const report = reap([profile], [child.pid ?? 0])
    await sleep(300)
    releaseBootLock()
    if (report.survivors.length > 0) {
      throw new Error(
        `the teardown did not reap this boot's tree: survivors ${report.survivors.map((row) => `${row.pid} (${row.args.slice(0, 120)})`).join('; ')}. ` +
          `A leaked Electron tree reds the NEXT spawning battery's rows, so this is a red and never a warning (D-74).`,
      )
    }
  }
  return { client, profile, trace: () => trace, stop }
}

let booted: Boot | null = null

beforeAll(async () => {
  booted = await boot(makeProfile('provident-modularity'))
}, ROW_MS)

afterAll(async () => {
  let failure: Error | null = null
  if (booted !== null) {
    try {
      await booted.stop()
    } catch (error) {
      failure = error instanceof Error ? error : new Error(String(error))
    }
    booted = null
  }
  // THE INVARIANT, in the order `D-74` fixes and with nothing silent in it: every tree this file spawned is reaped and
  // the report IS the zero proof (a reap whose only failure path is silence turns a leak into a green); the profiles go
  // only after it; the host-wide live-boot lock is released here WHATEVER this file measured, because a lock held past
  // a throwing teardown wedges the sibling spawning battery for its whole bound; and only then is a survivor a RED
  // naming every one of them (`D-74`, `D-94`).
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort; the report below is the guarantee */
    }
  }
  for (const release of liveBootReleases.splice(0)) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  if (failure !== null) throw failure
  if (report.survivors.length > 0) {
    throw new Error(
      `modularity teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor means this run leaks a ` +
        `process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

/** The one client every row drives, or a RED naming the boot that never stood — never a skip (D-74, D-30). */
function client(): Client {
  if (booted === null) {
    throw new Error(
      'PREREQUISITE ERROR — no boot stands: `beforeAll` did not reach a handshake, so no row below can measure anything. ' +
        'This is a RED and never a skip (D-74); the boot’s own throw, above this one, names the reason.',
    )
  }
  return booted.client
}

describe('modularity — U1: the executor, its admission, its resolver and the set it publishes (docs/L1/modularity.md §3)', () => {
  it('M-1 — the contract: an installed module’s `entry` is EVALUATED, so its own tool answers its own code (S-1)', async () => {
    const installed = await call(client(), 'module.install', {
      name: ALPHA,
      version: '1.0.0',
      source: sourceOf(ALPHA, '1.0.0', ALPHA_V1, declares('answer')),
    })
    expect(installed.ok, `module.install answered as a throw rather than a value: ${installed.text}`).toBe(true)
    expect(statusOf(installed), `module.install answered ${installed.text}`).toBe('installed')
    // THE ROW'S WHOLE CLAIM: the tool exists because the ENTRY registered it, and its answer is the module's own.
    const answer = await call(client(), `module:${ALPHA}.answer`, {})
    expect(answer.ok, `module:${ALPHA}.answer did not answer at all — the entry was not evaluated: ${answer.text}`).toBe(true)
    expect(answer.value, `module:${ALPHA}.answer answered ${answer.text}, which is not the module’s own value`).toEqual({ from: ALPHA, value: 42 })
  }, ROW_MS)

  it('M-2 — the executor: an update WITHDRAWS the old registration and the new entry answers (S-2)', async () => {
    // THE PRECONDITION IS ASSERTED, NOT ASSUMED: an inverse can only be measured over a registration that STOOD, so v1's
    // tool is read BEFORE the update — otherwise the withdrawal arm would green at this head on the vacuous reading
    // "nothing was ever registered", which measures nothing.
    const standing = await call(client(), `module:${ALPHA}.answer`, {})
    expect(standing.ok, `the v1 registration is not reachable BEFORE the update, so there is nothing for an inverse to withdraw: ${standing.text}`).toBe(true)
    const updated = await call(client(), 'module.update', {
      name: ALPHA,
      version: '1.1.0',
      source: sourceOf(ALPHA, '1.1.0', ALPHA_V2, declares('answerB')),
    })
    expect(updated.ok, `module.update answered as a throw: ${updated.text}`).toBe(true)
    expect(statusOf(updated), `module.update answered ${updated.text}`).toBe('updated')
    // THE INVERSE RAN: v1's tool is not reachable any more, and the refusal NAMES it rather than answering a value.
    const withdrawn = await call(client(), `module:${ALPHA}.answer`, {})
    expect(withdrawn.ok, `the withdrawn tool still answers after the update: ${withdrawn.text}`).toBe(false)
    expect(withdrawn.text, `the withdrawal answered ${withdrawn.text}, which does not name the tool it withdrew`).toContain('answer')
    const refreshed = await call(client(), `module:${ALPHA}.answerB`, {})
    expect(refreshed.ok, `the updated entry's tool did not answer: ${refreshed.text}`).toBe(true)
    expect(refreshed.value, `module:${ALPHA}.answerB answered ${refreshed.text}`).toEqual({ from: ALPHA, value: 'two' })
  }, ROW_MS)

  it('M-3 — admission: a host-API token, an overstatement and a foundation tool name are each refused BY NAME, as VALUES (S-3)', async () => {
    // ① THE IPC RULE, ENFORCED AT THE ONE DOOR THE FOUNDATION OWNS (`C-1`): a source reaching for the preload bridge.
    const leaky = await call(client(), 'module.install', {
      name: 'matrix-leaky',
      source: sourceOf('matrix-leaky', '1.0.0', LEAKY, declares('leak')),
    })
    expect(leaky.ok, `a source naming window.provident THREW instead of being refused: ${leaky.text}`).toBe(true)
    expect(statusOf(leaky), `a source naming window.provident was not refused: ${leaky.text}`).toBe('rejected')
    expect(reasonOf(leaky), `the refusal must name the token it refused: ${leaky.text}`).toContain('window.provident')

    // ② A DECLARATION THAT OVERSTATES ITS REGISTRATION (`C-12`): `declared-only` is declared and never registered.
    const loud = await call(client(), 'module.install', {
      name: 'matrix-loud',
      source: sourceOf('matrix-loud', '1.0.0', LOUD, declares('declared-only')),
    })
    expect(loud.ok, `an overstated declaration THREW: ${loud.text}`).toBe(true)
    expect(statusOf(loud), `an overstated declaration was not refused: ${loud.text}`).toBe('rejected')
    expect(reasonOf(loud), `the refusal must name the declaration it could not find: ${loud.text}`).toContain('declared-only')

    // ③ A FOUNDATION TOOL NAME IS NOT A MODULE'S TO TAKE: the namespace is `module:<name>.<tool>`, closed.
    const squatter = await call(client(), 'module.install', {
      name: 'matrix-squatter',
      source: sourceOf('matrix-squatter', '1.0.0', SQUATTER, declares('provident.dispatch')),
    })
    expect(squatter.ok, `a registration of provident.dispatch THREW instead of being refused: ${squatter.text}`).toBe(true)
    expect(statusOf(squatter), `a registration of a foundation tool name was not refused: ${squatter.text}`).toBe('rejected')
    expect(reasonOf(squatter), `the refusal must name the tool it refused: ${squatter.text}`).toContain('provident.dispatch')

    // AND NONE OF THE THREE REACHED THE REGISTRY: a refused install is not a stored module.
    const listed = await call(client(), 'module.list')
    const names = (Array.isArray(listed.value) ? listed.value : []).map((entry: unknown) => str(memberOf(entry, 'name')) ?? '')
    expect(names, `a refused install was stored anyway: ${listed.text}`).not.toContain('matrix-leaky')
    expect(names, `an overstated declaration was stored anyway: ${listed.text}`).not.toContain('matrix-loud')
    expect(names, `a foundation tool name was stored anyway: ${listed.text}`).not.toContain('matrix-squatter')
  }, ROW_MS)

  it('M-4 — the resolver: a cycle and an unsatisfied module range are refused by name, an unsatisfiable app range is too, and a satisfied pair ACTIVATES (S-4)', async () => {
    // ① A DEPENDENCY THAT IS ABSENT: refused, and the refusal names the module it needs.
    const premature = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(premature.ok, `an unresolved dependency THREW: ${premature.text}`).toBe(true)
    expect(statusOf(premature), `a module requiring an absent module was not refused: ${premature.text}`).toBe('rejected')
    expect(reasonOf(premature), `the refusal must name the dependency: ${premature.text}`).toContain(BASE)

    // ② THE DEPENDENCY EXISTS AND ITS RANGE DOES NOT SATISFY — the request's own example, `>1.1.0` against `1.0.0`.
    const baseOne = await call(client(), 'module.install', {
      name: BASE,
      version: '1.0.0',
      source: sourceOf(BASE, '1.0.0', BASE_ENTRY, declares('ping')),
    })
    expect(baseOne.ok, `matrix-base 1.0.0 answered as a throw: ${baseOne.text}`).toBe(true)
    expect(statusOf(baseOne), `matrix-base 1.0.0 was not installed: ${baseOne.text}`).toBe('installed')
    const unsatisfied = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(statusOf(unsatisfied), `>1.1.0 was satisfied by 1.0.0: ${unsatisfied.text}`).toBe('rejected')
    expect(reasonOf(unsatisfied), `the refusal must name the range: ${unsatisfied.text}`).toContain('>1.1.0')

    // ③ THE RANGE IS SATISFIED: the install lands AND the module is ACTIVE — its own tool answers.
    const baseTwo = await call(client(), 'module.update', {
      name: BASE,
      version: '1.5.0',
      source: sourceOf(BASE, '1.5.0', BASE_ENTRY, declares('ping')),
    })
    expect(statusOf(baseTwo), `matrix-base 1.5.0 was not updated: ${baseTwo.text}`).toBe('updated')
    const landed = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(statusOf(landed), `a satisfied dependency did not admit its dependent: ${landed.text}`).toBe('installed')
    const ticking = await call(client(), `module:${DEP}.tick`, {})
    expect(ticking.ok, `the dependent never activated: ${ticking.text}`).toBe(true)
    expect(ticking.value, `module:${DEP}.tick answered ${ticking.text}`).toEqual({ from: DEP })

    // ④ THE APPLICATION VERSION IS JUDGED AGAINST THE ONE NUMBER THE BUILD PUBLISHES (`C-11`), and the refusal says it.
    const future = await call(client(), 'module.install', {
      name: 'matrix-future',
      source: sourceOf('matrix-future', '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>99.0.0') }),
    })
    expect(future.ok, `an unsatisfiable app range THREW: ${future.text}`).toBe(true)
    expect(statusOf(future), `an app range >99.0.0 was admitted: ${future.text}`).toBe('rejected')
    expect(reasonOf(future), `the app refusal must name the range it could not satisfy: ${future.text}`).toContain('>99.0.0')

    const present = await call(client(), 'module.install', {
      name: NOW,
      source: sourceOf(NOW, '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>=0.0.1') }),
    })
    expect(statusOf(present), `an app range >=0.0.1 was not admitted: ${present.text}`).toBe('installed')
    const clock = await call(client(), `module:${NOW}.clock`, {})
    expect(clock.ok, `an admitted module's tool did not answer: ${clock.text}`).toBe(true)
    expect(clock.value, `module:${NOW}.clock answered ${clock.text}`).toEqual({ from: NOW })

    // ⑤ A CYCLE IS REFUSED BY NAME, and `S-4` names it BESIDE the unsatisfied range — so leaving it to `M-5`'s set or
    //    to nothing would have been a clause of the step no row measured. `matrix-dep` already requires `matrix-base`
    //    (③), so an update making `matrix-base` require `matrix-dep` closes the loop; the refused update lands nothing,
    //    and `M-5`'s set reads that back. **BOTH MEMBERS ARE ASSERTED, because a refusal naming no module of the cycle
    //    is not a refusal BY NAME** (`S-4`), and a refusal naming only the updated module would pass on the wrong one.
    const cycle = await call(client(), 'module.update', {
      name: BASE,
      version: '2.0.0',
      source: sourceOf(BASE, '2.0.0', BASE_ENTRY, { ...declares('ping'), ...requiresModule(DEP, '>=1.0.0') }),
    })
    expect(cycle.ok, `an update closing a dependency cycle THREW instead of being refused: ${cycle.text}`).toBe(true)
    expect(statusOf(cycle), `an update closing a dependency cycle was not refused: ${cycle.text}`).toBe('rejected')
    expect(
      reasonOf(cycle),
      `a cycle refusal must name BOTH modules in the cycle (${BASE}, ${DEP}) and it read '${reasonOf(cycle)}': ${cycle.text}`,
    ).toContain(BASE)
    expect(
      reasonOf(cycle),
      `a cycle refusal must name BOTH modules in the cycle (${BASE}, ${DEP}) and it read '${reasonOf(cycle)}': ${cycle.text}`,
    ).toContain(DEP)
  }, ROW_MS)

  it('M-5 — the published set is the registry’s composition and the published version is the one authority (S-5)', async () => {
    const listed = await client().listTools()
    const names = listed.tools.map((tool) => tool.name)
    // ① THE MODULE NAMESPACE CARRIES EXACTLY WHAT THE ENTRIES REGISTERED — no echo, no declaration, no orphan.
    const moduleTools = names.filter((name) => name.startsWith('module:')).sort()
    expect(moduleTools, `the dynamic module tools the transport publishes are ${JSON.stringify(moduleTools)}`).toEqual([
      `module:${ALPHA}.answerB`,
      `module:${BASE}.ping`,
      `module:${DEP}.tick`,
      `module:${NOW}.clock`,
    ].sort())
    // ② THE FOUNDATION'S OWN SET IS UNMOVED BY A MODULE: the static module management tools and the seeded groups' tools.
    expect(names, `the transport did not publish module.install: ${JSON.stringify(names)}`).toContain('module.install')
    expect(names, `the transport did not publish module.update: ${JSON.stringify(names)}`).toContain('module.update')
    expect(names, `the transport did not publish module.list: ${JSON.stringify(names)}`).toContain('module.list')
    expect(names, `the transport did not publish provident.data.read: ${JSON.stringify(names)}`).toContain('provident.data.read')
    expect(names, `the transport did not publish provident.get_rendered_html: ${JSON.stringify(names)}`).toContain('provident.get_rendered_html')
    // ③ ONE VERSION AUTHORITY (`C-11`), MEASURED AS ONE READING AND NOT AS TWO NUMBER-SHAPED STRINGS: what the transport
    //    publishes must be the manifest's own number, AND the number the RESOLVER judges to refuse `>99.0.0` must be the
    //    same number. **THE ROW TAKES THAT JUDGEMENT ITSELF** rather than carrying `M-4`'s sentence across: a value carried
    //    from another row's body would make this red name that row's failure as a prerequisite, not this row's absence.
    const published = client().getServerVersion()?.version ?? '(no serverInfo.version)'
    expect(published, `serverInfo.version is '${published}' and the manifest carries '${pkg.version}'`).toBe(pkg.version)
    const future = await call(client(), 'module.install', {
      name: PUBLISH,
      source: sourceOf(PUBLISH, '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>99.0.0') }),
    })
    expect(future.ok, `the app-range refusal arrived as a throw rather than a value: ${future.text}`).toBe(true)
    expect(statusOf(future), `an app range >99.0.0 was admitted, so nothing judged its number: ${future.text}`).toBe('rejected')
    const refused = reasonOf(future)
    expect(refused, `the resolver judged '${published}' yet its refusal reads '${refused}', so the refusal carries no number`).toMatch(/\d+\.\d+\.\d+/)
    expect(refused, `the resolver's refusal reads '${refused}' and the transport publishes '${published}' — two spellings, not one authority`).toContain(published)
  }, ROW_MS)
})

/** **THE TWO NAMES A LATER ROW WILL NEED, SPELLED HERE AND USED BY NO ROW ABOVE** — the profile file, and the row-key
 *  prefix the module registry's `file.modules.<id>` rows carry. No row of `M-1`..`M-5` reads either: every claim above
 *  is read through the app's external surface, and a row that later needs the BYTES (`U2`'s repair figures) finds the
 *  spellings here instead of inventing a second literal (D-27: this file imports no `src/**`, so a name it needs is
 *  spelled) — `void`ed so a reader sees they are deliberately unreached, not forgotten (`D-84`, `D-169`). */
const REGISTRY_ROWS_KEY = 'file.modules.'
void PROFILE_FILE
void REGISTRY_ROWS_KEY
