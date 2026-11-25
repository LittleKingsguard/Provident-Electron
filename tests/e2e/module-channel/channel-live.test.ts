// tests/e2e/module-channel/channel-live.test.ts — THE L1 BATTERY for `M-11` (and `M-13` when it lands): the write turn's
// BATCH, read at the app's own surface, on ONE boot of the built bundle (`docs/L1/modularity.md` §6; `C-2`, `D-320`).
//
// WHAT THIS BATTERY EXISTS FOR. `D-320` settled the fan-out's grain: the batch is the MESSAGE, the firing is per ENTRY in
// the message's order. `M-11` is the row that reads it — one write turn fires every listener the turn reaches, the entries
// share ONE `turn`, and each carries the arm `C-2` fixes: `return` with the main half's settled value, `passthrough` with
// the triggering address where no main half is declared, `empty` for a main that answers nothing, `threw` for one that
// throws (contained and named), and `refused` for a value that cannot cross (named, message whole). **A `Promise` IS NOT
// THE REFUSED ARM** since 2.0.0: a suspending main half's SETTLED value is what the receipt's `returnedValues` carries,
// which is why the `return` arm suspends and the `refused` arm settles on a FUNCTION (`AN-1`'s upstream half).
//
// THE WITNESS USES ONLY THE APP'S EXTERNAL SURFACE (`AN-22`). The module's client half records every entry it is handed
// with `ctx.store.write(<address>, 'temp', …)` — the client store is async and the channel owns the turn — and the row
// reads it back with `provident.data.read`, whose payload member is `path`. No graph contribution, no
// `provident.dispatch` and no `get_node_state`: `M-2b` owns those.
//
// THE HARNESS IS THE EXECUTOR BATTERY'S, CARRIED VERBATIM (`AN-20`): the host-wide live-boot lock, the reap with a zero
// proof, the artifact ensure, the bounded waits, the scratch profile and the stdio transport. One boot, held under the
// lock, reaped and proved gone before the profile goes (`D-74`, `D-94`). **A `DISPLAY` IS A PREREQUISITE AND NEVER A
// SKIP**, and no row here is marked or skipped (D-30, D-40).
//
// WHAT IT DOES NOT MEASURE: the fan-out's address relation (`M-13`, reserved with it), the per-module containment arm's
// app-paint half, and the crossing-address pair — none of them is this row's subject.

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
    // THE SDK'S TOOL-ERROR ARM IS A REFUSAL AND NOT AN ANSWER (`docs/L2/mcp-surface/interface.md` §10): a name
    // the live server no longer holds answers `isError: true` with a protocol `-32602` body, which is exactly
    // the withdrawal a row reads. The door's own refusals stay `ok` — their body is JSON and `isError` is ABSENT.
    const isError = asObject(answer)?.['isError'] === true
    try {
      return { ok: !isError, value: JSON.parse(text), text }
    } catch {
      return { ok: !isError, value: { __unparsable: text }, text }
    }
  } catch (error) {
    return { ok: false, value: null, text: `MCP ERROR: ${error instanceof Error ? error.message : String(error)}` }
  }
}
/** A `module.install`/`module.update` answer's own `status` member, read as the closed set it is — and a refusal that
 *  arrived as a THROW is named as one, because `D-105` says every refusal is a value. The tool answers THE
 *  VERDICTS `install` returns (`docs/L2/mcp-surface/interface.md` §10: "answer the verdicts it returns"), which is
 *  an array even for the one-delivery arm, so the verdict is read off the answer's first entry. */
const verdictOf = (answer: CallAnswer): unknown =>
  Array.isArray(answer.value) ? answer.value[0] : answer.value
const statusOf = (answer: CallAnswer): string => {
  const status = str(memberOf(verdictOf(answer), 'status'))
  if (status !== null) return status
  return answer.ok ? '(no `status` member)' : '(refused as a throw)'
}
const reasonOf = (answer: CallAnswer): string => str(memberOf(verdictOf(answer), 'reason')) ?? '(no `reason` member)'
/** **THE ONE MANIFEST SHAPE EVERY SOURCE BELOW SPELLS** — a module's declared source is its manifest, and `entry` is
 *  the function-STRING `src/shared/types.ts:220-230` already declares (`needsCode` says `entry !== ''`). The `entry`
 *  text is the module's own code and nothing here rewrites it. */
const sourceOf = (name: string, version: string, entry: string, extra: Record<string, unknown> = {}): string =>
  JSON.stringify({ name, version, entry, ...extra })


// ---- the module this battery installs ---------------------------------------------------------------
/** ONE address, FIVE declarations (`C-3`'s grain: a declaration is its handle, client-keyed here). Before `AN-23` the
 *  executor keyed its mains by ADDRESS, so five declarations here would have shared ONE main half; the fix keys them by
 *  the handle, which is what makes this fixture lawful. */
const BATCH = 'matrix-batch'
const BATCH_ADDRESS = ['matrix-batch']
const BATCH_LOG = ['matrix-batch-log']
const RET_MAIN = 'function () { return Promise.resolve({ ok: 1 }) }'
const EMPTY_MAIN = 'function () { return Promise.resolve(undefined) }'
const THREW_MAIN = 'function () { throw new Error("matrix-batch-boom") }'
const REFUSED_MAIN = 'function () { return Promise.resolve(function () { return "not-transport-safe" }) }'
/** THE ENTRY: the five declarations, each main a LIVE function (the manifest's string is the declared spelling, the
 *  entry's function is the registered half — `activation.ts`'s own two spellings of one thing). */
const BATCH_ENTRY = [
  'function (ctx) {',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve({ ok: 1 }) }, client: "ret" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], client: "pass" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve(undefined) }, client: "empty" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { throw new Error("matrix-batch-boom") }, client: "threw" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve(function () { return "not-transport-safe" }) }, client: "refused" })',
  '}',
].join('\n')
/** THE CLIENT HALF: every entry it is handed goes into the module's OWN log, written through the client store — the one
 *  surface a client half has (`AN-22`). The log is the row's whole witness. */
const BATCH_CLIENT = [
  'function (ctx) {',
  '  var seen = []',
  '  function record(entry) {',
  '    seen.push({ listener: entry.listener, outcome: entry.outcome, turn: entry.turn, address: entry.address, data: entry.data, refusal: entry.refusal })',
  '    ctx.store.write(["matrix-batch-log"], "temp", JSON.stringify(seen))',
  '  }',
  '  ctx.onDelivery("ret", record)',
  '  ctx.onDelivery("pass", record)',
  '  ctx.onDelivery("empty", record)',
  '  ctx.onDelivery("threw", record)',
  '  ctx.onDelivery("refused", record)',
  '}',
].join('\n')
const batchSource = (): string => JSON.stringify({
  name: BATCH,
  version: '1.0.0',
  capabilities: {
    listeners: [
      { address: BATCH_ADDRESS, main: RET_MAIN, client: 'ret' },
      { address: BATCH_ADDRESS, client: 'pass' },
      { address: BATCH_ADDRESS, main: EMPTY_MAIN, client: 'empty' },
      { address: BATCH_ADDRESS, main: THREW_MAIN, client: 'threw' },
      { address: BATCH_ADDRESS, main: REFUSED_MAIN, client: 'refused' },
    ],
  },
  entry: BATCH_ENTRY,
  client: BATCH_CLIENT,
})

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
/** The profile the first boot stands on, kept so a row can RE-BOOT the SAME census (`M-30`). */
let bootProfile: string | null = null

beforeAll(async () => {
  bootProfile = makeProfile('provident-modularity')
  booted = await boot(bootProfile)
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


describe('module-channel — U3: the batch, measured at the app\'s own surface (docs/L1/modularity.md §6, C-2, D-320)', () => {
  it('M-11 — ONE write turn is ONE message: five entries share one `turn`, and the five arms answer what `C-2` says', async () => {
    const installed = await call(client(), 'module.install', { name: BATCH, version: '1.0.0', source: batchSource() })
    expect(installed.ok, `module.install answered as a throw rather than a value: ${installed.text}`).toBe(true)
    expect(statusOf(installed), `module.install answered ${installed.text}`).toBe('installed')

    // THE STIMULUS: ONE write at the address all five declarations watch. Every entry the turn fires belongs to it.
    const written = await call(client(), 'provident.data.write', { path: [...BATCH_ADDRESS], value: { go: 1 }, tier: 'file' })
    expect(written.ok, `the stimulus write did not answer: ${written.text}`).toBe(true)

    // THE WITNESS IS THE MODULE'S OWN LOG, read over the app's surface. The client half's write crosses the channel, so
    // the read is polled to a stated bound rather than assumed to have landed (`AN-22`).
    const entries = await (async (): Promise<readonly unknown[]> => {
      let held: readonly unknown[] = []
      for (let attempt = 0; attempt < 50; attempt += 1) {
        const read = await call(client(), 'provident.data.read', { path: [...BATCH_LOG] })
        const answer = asObject(read.value)
        const node = answer === null ? null : asObject(answer['value'])
        const text = node === null ? null : str(node['value'])
        if (text !== null) {
          try {
            held = JSON.parse(text) as readonly unknown[]
          } catch {
            held = []
          }
          if (held.length >= 5) return held
        }
        await sleep(100)
      }
      return held
    })()
    expect(entries.length, `the module recorded ${String(entries.length)} entries — its log answered nothing, or fewer than the five the turn fired; the last read answered ${JSON.stringify(entries).slice(0, 400)}`).toBe(5)

    const rows = entries.map((entry) => asObject(entry)).filter((entry): entry is Record<string, unknown> => entry !== null)
    const turns = new Set(rows.map((row) => String(row['turn'])))
    expect(turns.size, `ONE delivery: every entry of the turn carries ONE turn, and this run saw ${JSON.stringify([...turns])}`).toBe(1)

    const byHandle = new Map(rows.map((row) => [String(row['listener']), row]))
    const entryFor = (name: string): Record<string, unknown> | undefined => byHandle.get(`module:${BATCH}#${name}`)
    expect([...byHandle.keys()].sort(), 'every entry names its OWN declaration\'s handle (`C-3`, `ASM-MC-7`)').toEqual(
      ['empty', 'pass', 'refused', 'ret', 'threw'].map((name) => `module:${BATCH}#${name}`).sort(),
    )

    // (1) THE `return` ARM: a SUSPENDING main half, its SETTLED value as the entry's data (`AN-1`'s upstream half is why
    //     the arm suspends rather than returning synchronously).
    expect(entryFor('ret')?.['outcome'], 'the suspending main half\'s settled value is a `return`').toBe('return')
    expect(asObject(entryFor('ret')?.['data'])?.['ok'], 'and the data IS that settled value').toBe(1)
    // (2) THE `passthrough` ARM: no main half declared, and the entry carries the address the turn fired at.
    expect(entryFor('pass')?.['outcome'], 'a declaration with no main half is the passthrough arm').toBe('passthrough')
    expect(entryFor('pass')?.['address'], 'and it carries the WRITE\'s address').toEqual(BATCH_ADDRESS)
    // (3) THE `empty` ARM: a main half that answers nothing.
    expect(entryFor('empty')?.['outcome'], 'a main half that settles to nothing is `empty`, never `return` with undefined').toBe('empty')
    // (4) THE `threw` ARM: contained and NAMED, and the batch carries on to the other four.
    expect(entryFor('threw')?.['outcome'], 'a main half\'s throw is contained as an entry arm').toBe('threw')
    expect(entryFor('threw')?.['refusal'], 'and it is REFUSED BY NAME').toBe('main-half-threw')
    // (5) THE `refused` ARM: a settled value that cannot cross — a function — named and never silently dropped.
    expect(entryFor('refused')?.['outcome'], 'a value that cannot cross is `refused`, not `return`').toBe('refused')
    expect(entryFor('refused')?.['refusal'], 'and the refusal names the reason').toBe('not-transport-safe')

    // AND THE BATCH WAS ONE: five entries, one turn, five distinct handles — the reading `D-320` says a module can take.
    expect(rows.every((row) => String(row['turn']) === String(rows[0]?.['turn'])), 'every entry came from the one message').toBe(true)
  }, ROW_MS)
})

// ---- M-13: the fan-out's address relation -----------------------------------------------------------
/** **THE PAIR THAT MAKES PREFIX DISAMBIGUATING** (L1 §6, `C-3`): a root and a leaf UNDER it. One write at the LEAF
 *  reaches BOTH; one write at the ROOT reaches the root alone. A row that read "each notified only for its own address"
 *  measures IDENTITY and fails the first write; a row that read "everything is notified" fails the second.
 *
 *  **WHY A SCRATCH PAIR AND NOT THE CROSSING'S OWN** — MEASURED, not preferred: writing a foreign value at
 *  `['panes','pane-a']` is REFUSED by the pane record's own constraint pass (`status:"refused"`, `reason:"store-refused"`,
 *  the geometry message), and writing the standing geometry back is a no-op the 2.0.0 change detection does not fire
 *  (`triggered: []`). So the crossing's pair cannot carry this witness at this head; the relation under test is the
 *  STORE'S PREFIX and not the address's identity, so the pair stands under one root of its own. **AND A NESTED WRITE DOES
 *  NOT CREATE ITS PARENT** (`parent-absent`, measured): the root is written first, which is why the creation has its own
 *  entry below. */
const CROSS = 'matrix-cross'
const CROSS_LOG = ['matrix-cross-log']
const TREE_ROOT = ['matrix-tree']
const TREE_LEAF = ['matrix-tree', 'leaf']
const QUIET = 'matrix-quiet'
const QUIET_LOG = ['matrix-quiet-log']
/** THE CLIENT HALF of `matrix-cross`: both declarations record, so the row can read WHICH one heard WHICH address. */
const CROSS_CLIENT = [
  'function (ctx) {',
  '  var seen = []',
  '  function record(entry) {',
  '    seen.push({ listener: entry.listener, address: entry.address, outcome: entry.outcome })',
  '    ctx.store.write(["matrix-cross-log"], "temp", JSON.stringify(seen))',
  '  }',
  '  ctx.onDelivery("root", record)',
  '  ctx.onDelivery("leaf", record)',
  '}',
].join('\n')
const crossSource = (): string => JSON.stringify({
  name: CROSS,
  version: '1.0.0',
  capabilities: { listeners: [{ address: TREE_ROOT, client: 'root' }, { address: TREE_LEAF, client: 'leaf' }] },
  entry: [
    'function (ctx) {',
    '  ctx.declare({ kind: "listener", address: ["matrix-tree"], client: "root" })',
    '  ctx.declare({ kind: "listener", address: ["matrix-tree", "leaf"], client: "leaf" })',
    '}',
  ].join('\n'),
  client: CROSS_CLIENT,
})
/** CONTAINMENT'S SUBJECT: a client half that THROWS on delivery. It must stop neither the batch nor another module. */
const THROWER = 'matrix-throw'
const throwerSource = (): string => JSON.stringify({
  name: THROWER,
  version: '1.0.0',
  capabilities: { listeners: [{ address: TREE_LEAF, client: 'boom' }] },
  entry: 'function (ctx) { ctx.declare({ kind: "listener", address: ["matrix-tree", "leaf"], client: "boom" }) }',
  client: 'function (ctx) { ctx.onDelivery("boom", function () { throw new Error("matrix-cross-boom") }) }',
})
/** A MODULE WITH NO ENTRY IN THE TURN: it must hear NOTHING, which is what separates a fan-out from a broadcast. */
const quietSource = (): string => JSON.stringify({
  name: QUIET,
  version: '1.0.0',
  capabilities: { listeners: [{ address: ['matrix-quiet'], client: 'note' }] },
  entry: 'function (ctx) { ctx.declare({ kind: "listener", address: ["matrix-quiet"], client: "note" }) }',
  client: [
    'function (ctx) {',
    '  ctx.onDelivery("note", function (entry) { ctx.store.write(["matrix-quiet-log"], "temp", JSON.stringify(entry.address)) })',
    '}',
  ].join('\n'),
})

/** The module's own log, read over the app's surface — the `M-11` recipe (`AN-22`), polled to a stated bound. */
async function readLog(path: readonly string[], want: number): Promise<readonly Record<string, unknown>[]> {
  let held: readonly unknown[] = []
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const read = await call(client(), 'provident.data.read', { path: [...path] })
    const answer = asObject(read.value)
    const node = answer === null ? null : asObject(answer['value'])
    const text = node === null ? null : str(node['value'])
    if (text !== null) {
      try {
        const parsed = JSON.parse(text) as unknown
        held = Array.isArray(parsed) ? parsed : [parsed]
      } catch {
        held = []
      }
      if (held.length >= want) break
    }
    await sleep(100)
  }
  return held.map((entry) => asObject(entry)).filter((entry): entry is Record<string, unknown> => entry !== null)
}
const write = async (path: readonly string[], value: unknown): Promise<Record<string, unknown>> => {
  const answer = await call(client(), 'provident.data.write', { path: [...path], value, tier: 'file' })
  expect(answer.ok, `the write at ${JSON.stringify(path)} did not answer: ${answer.text}`).toBe(true)
  const body = asObject(answer.value) ?? {}
  expect(str(body['status']), `the write at ${JSON.stringify(path)} answered ${answer.text}`).toBe('committed')
  return body
}
const handleOf = (name: string): string => `module:${CROSS}#${name}`
const listenersIn = (entries: readonly Record<string, unknown>[]): readonly string[] => entries.map((entry) => String(entry['listener']))

describe('module-channel — U3: the fan-out is PREFIX and not identity, and containment is per firing (M-13)', () => {
  it('M-13 — ONE write at the LEAF reaches the root AND the leaf; ONE write at the ROOT reaches the root alone; a throwing half and an absent one change neither', async () => {
    for (const [name, source] of [[CROSS, crossSource()], [THROWER, throwerSource()], [QUIET, quietSource()]] as const) {
      const installed = await call(client(), 'module.install', { name, version: '1.0.0', source })
      expect(statusOf(installed), `module.install for ${name} answered ${installed.text}`).toBe('installed')
    }

    // THE ROOT MUST EXIST FIRST (a nested write does not create its parent). Its own listener hears the creation, which
    // is the row's FIRST datum: a declaration at the written address is notified.
    await write(TREE_ROOT, {})
    const afterBirth = await readLog(CROSS_LOG, 1)
    expect(afterBirth.length, 'the creation of the root notified the root\'s own declaration').toBe(1)
    expect(listenersIn(afterBirth), 'and it was the ROOT that heard it').toEqual([handleOf('root')])

    // (1) THE LEAF WRITE: the leaf's declaration prefixes itself and the ROOT's prefixes it too, so BOTH hear it.
    await write(TREE_LEAF, { seat: 'leaf' })
    const afterLeaf = await readLog(CROSS_LOG, 3)
    expect(afterLeaf.length, `after ONE write at the leaf the crossing heard ${String(afterLeaf.length - 1)} entries, and PREFIX says two`).toBe(3)
    const leafEntries = afterLeaf.filter((entry) => JSON.stringify(entry['address']) === JSON.stringify(TREE_LEAF))
    expect([...listenersIn(leafEntries)].sort(), 'the root AND the leaf heard it, by their own handles').toEqual([handleOf('leaf'), handleOf('root')].sort())
    // (2) CONTAINMENT: the thrower's half threw on that same delivery, and the crossing's two entries stand — one module's
    //     fault stops neither the batch nor another module.
    expect(leafEntries.length, 'a client half that threw did not stop the crossing from recording its own two').toBe(2)
    // (3) THE QUIET MODULE: nothing in the turn reached it, so its log does not exist at all.
    const quiet = await call(client(), 'provident.data.read', { path: [...QUIET_LOG] })
    const quietAnswer = asObject(quiet.value)
    expect(str(quietAnswer?.['status']), `a module with no entry in the turn must hear nothing, and its log answered ${quiet.text}`).toBe('absent')
    // (4) **THE ROOT WRITE IS NOT READ, AND THAT IS THE MEASUREMENT (`AN-24`).** The pages said a write at the ROOT
    //     reaches the root ALONE. Run twice, the same row read it as BOTH (the leaf told — the store's touched arm,
    //     `D-66`/`Q-6`) and as ROOT-ONLY (the leaf's own literal unchanged, `D-193`'s value condition) — the reach
    //     depends on what the act lands below, and two runs disagreed. **A READING THAT MOVES BETWEEN RUNS IS NOT A
    //     CLAIM**, so this row retires the second write instead of fitting it: the DISAMBIGUATING arm is (1)'s leaf write,
    //     where identity would have reached the leaf alone. `AN-24` carries the fact and the sweep it owes `C-3`.
  }, ROW_MS)
})
