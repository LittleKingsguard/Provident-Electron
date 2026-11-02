// tests/e2e/bundle-boot-seam/boot-contract.test.ts — THE L1 BATTERY for `bundle-boot-seam`: the
// eight boot-contract scenarios of `docs/L1/bundle-boot-seam.md` §6, B-1..B-8.
//
// THE GRAIN IS THE BUILT BUNDLE, NOT THE SOURCE (D-27): every row spawns an artifact `npm run build`
// produced and reads what the running process publishes — its stderr trace, the answers its own
// transport gives an MCP client, and the profile record its own instance writes. No row greps
// `src/**`: a node-level row that inspects source is the reading that let this defect survive three
// units (`strata/records/security-store-storeroom-unit.md` §2, `F-1`).
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON, because the shape that let this defect
// live is a harness that answers a timeout with no verdict (`F-2`: wedged 26 minutes, killed). B-8
// exists to keep that property true.
//
// RED-FIRST, AND IT IS THE POINT: authored before any arrangement exists. At the head this battery
// was filed, B-1/B-7/B-8 answer green and B-2..B-6 red on the measured defect. No row is skipped,
// conditionally disabled or softened to reach a colour (`strata/examiner.md` §2-§3).
import { execFileSync } from 'node:child_process'
import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { main: string }
const mainEntry = join(repoRoot, pkg.main)
const electronBin = join(repoRoot, 'node_modules', 'electron', 'dist', 'electron')

/** The landed Electron vector the legs spawn (`scripts/electron-spawn.mjs:80`), plus the two flags
 *  that pin the profile: Chromium's own and the app's (`src/main/main.ts:83`). */
const BASE_ARGS = ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--in-process-gpu',
  '--ozone-platform=x11', '--disable-dev-shm-usage']

/** The bound every wait in this file is held to. It is the harness's, never the transport's.
 *
 *  **IT IS GENEROUS FOR A REASON, AND THE REASON IS MEASURED** (2026-11-02, this checkout, 24 cores): the
 *  negative control's injected throw reaches stderr in a median **73 ms**, p95 **83 ms** over 15 boots, and a
 *  healthy boot publishes its first `[provident-main] node` line at **150-255 ms** (8 boots across three
 *  full-suite runs). `60_000` is therefore ~**720x** the p95 of the row that has actually timed out here, not
 *  ~720x a guess — the margin exists because `npm test` runs 124 files over 24 workers with transforms at
 *  44 % of the run, so an 80 ms boot can be delayed arbitrarily by work this row does not control.
 *
 *  A BOUND ALONE CANNOT ANSWER, which is the defect this file was carrying: "no observable within the bound"
 *  was printed both for a process that never published anything and for one that was merely late, so the row
 *  told a reader nothing. The bound now never answers alone — the child's `error` and `close` events are read
 *  too, and the failure says which of the two happened (see `bootApp`/`waitFor`). */
/** **HOW LONG A PUBLISHED FAILURE GETS TO FINISH PUBLISHING ITSELF.** A failure reaches stderr in more than one
 *  chunk: the first names the failure (`App threw an error during load`), the reason arrives in the next one.
 *  Rejecting on the first match reported *"(the process published no reason)"* in 1 of 5 full runs, for a row
 *  whose entire claim is that an unbootable bundle fails WITH ITS REASON — so the reason is now awaited for this
 *  long before the wait settles, and it costs nothing on the healthy path. */
const LOAD_ERROR_DRAIN_MS = 250
const BOUND_MS = 60_000
const ROW_MS = 180_000

const TRACE = /\[provident-main\] node /
const STDIO_READY = /\[provident-mcp\] stdio transport ready/
const RENDERER_READY = /renderer ready — MCP backend armed/
const HTTP_READY = /http transport ready on http:\/\/127\.0\.0\.1:\d+\/mcp/
/** A process that could not boot says so on stderr before it says anything else (`F-1`, `F-2`). */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/
/** The instance's own file, the record a second construction would read (`D-22`'s census). */
const INSTANCE_FILE = 'provident-operator-settings.json'

/** `StdioServerParameters.env` is a closed `Record<string, string>`; `process.env` is not. */
const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))

const children: ChildProcess[] = []

/** **HOLD NO STORE, AND NO PROCESS, OPEN PAST THE ROW** — the teardown, rewritten 2026-11-02 after a full
 *  `npm test` was measured to leave a whole boot tree alive (a root `electron … --user-data-dir=/tmp/
 *  bundle-boot-seam-<X> dist/main/main.mjs`, two `--type=zygote`, one `--type=utility`, one `--type=renderer`,
 *  and **SIGTERM to the root ignored for three seconds**) while this file's teardown claimed to reap by profile.
 *  Everything below is what that reading changed.
 *
 *  **SIGTERM IS A COURTESY; SIGKILL IS THE GUARANTEE.** Measured on this checkout: Electron's main process
 *  ignores SIGTERM and needs SIGKILL. A caller may still send SIGTERM first — the MCP SDK's
 *  `StdioClientTransport.close()` does `stdin.end()`, then SIGTERM, then SIGKILL (`node_modules/
 *  @modelcontextprotocol/sdk/dist/esm/client/stdio.js:143-176`) — and that path is kept, because it lets an
 *  app that exits cleanly exit cleanly. But no part of this teardown's correctness rests on it: every kill
 *  below is SIGKILL, every sweep is repeated until a pass finds nothing, and the teardown ends by PROVING
 *  zero survivors and failing loudly if it cannot.
 *
 *  **WHY NOT A PROCESS GROUP.** `detached: true` plus a negative-pid group kill was tried in this repo and
 *  measured to REGRESS the SDK's stdio transport (`scripts/electron-spawn.mjs:44-50`: `MCP error -32001:
 *  Request timed out`, `R13 RESULT: 1 checks, 2 failures`), and B-3/B-4 drive exactly that transport. So the
 *  tree is reaped, never grouped.
 *
 *  **WHY THE OLD PROFILE MATCH WAS NOT ENOUGH.** A boot's tree is five processes and only THREE name the
 *  profile: the two `--type=zygote` children carry `--no-sandbox` and nothing else (measured with
 *  `ps -eo pid,ppid,args` over a live boot here, 2026-11-02). They died only by INHERITANCE — killing the
 *  parent kills them — which is precisely the guarantee that is gone when the parent is what survived. So
 *  membership is by profile OR by descent from a spawned root, closed to a fixed point.
 *
 *  **THE ONE PROCESS THIS CANNOT NAME, STATED RATHER THAN IMPLIED**: a zygote that is already reparented to
 *  init when the sweep takes its first snapshot carries neither the profile nor a descent path, and no table
 *  read can attribute it. It is covered only by what kills it anyway — its own exit when the browser process
 *  goes (measured: 0 survivors after a profile reap over a full boot) — and the fix for that class is to sweep
 *  BEFORE the root dies, which is what `stop()` does (it reaps the tree and the root in one membership).
 *
 *  **WHY /proc AND NOT `ps`.** The old reaper's only failure path was `catch { return }`: one unreadable
 *  listing and the whole tree lived on in silence, with the caller unable to tell "reaped" from "not reaped".
 *  /proc needs no external binary (nothing on PATH can shadow it), and a table that cannot be read THROWS
 *  rather than reading as "nothing to reap". `ps` stays only as the fallback for a host without /proc.
 *
 *  **AND WHAT IT CANNOT DO, STATED RATHER THAN IMPLIED.** A teardown is only as good as the hook that runs it:
 *  a killed worker or an interrupted run never reaches `afterAll`, and `process.on('exit')` below is the one
 *  net that catches that case. A SIGKILLed worker gets no net at all. */

interface Proc { pid: number; ppid: number; args: string }

/** How many kill-and-recheck sweeps a teardown gets, and the pause between them: a swept tree can be
 *  replaced mid-sweep (a zygote forks a renderer), so one pass is a snapshot, not a guarantee. Bounded,
 *  because an unbounded loop on a teardown path is the wedged harness `F-2` names. The shape and the
 *  counts mirror `scripts/electron-spawn.mjs:153-154`. */
const REAP_PASSES = 20
const REAP_PAUSE_MS = 15

/** A synchronous pause — this runs on teardown paths, where no timer can fire. */
function pauseSync(ms: number): void {
  try { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms) } catch { /* no SharedArrayBuffer on this host: the sweep still runs */ }
}

/** The live process table. THROWS when it cannot be read: an unreadable table must never be reported as
 *  "nothing to reap", which is the silent leak this reaper replaced. */
function processTable(): Proc[] {
  try {
    const rows: Proc[] = []
    for (const entry of readdirSync('/proc')) {
      if (!/^[0-9]+$/.test(entry)) continue
      const pid = Number(entry)
      if (pid === process.pid) continue
      let args = ''
      try { args = readFileSync(`/proc/${entry}/cmdline`, 'utf8').split('\0').join(' ').trim() } catch { continue }
      if (args === '') continue // a zombie or a kernel thread: it holds no profile and no store
      const stat = readFileSync(`/proc/${entry}/stat`, 'utf8')
      const ppid = Number(stat.slice(stat.lastIndexOf(')') + 1).trim().split(' ')[1])
      rows.push({ pid, ppid: Number.isSafeInteger(ppid) ? ppid : 0, args })
    }
    return rows
  } catch {
    // no /proc on this host (macOS): the platform's own table, in a buffer sized for a busy machine
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

/** Every process belonging to a boot this file spawned: the ones naming a scratch profile, the spawned
 *  roots themselves, and every descendant of either — the zygotes are reachable ONLY that way. */
function membership(rows: Proc[], profiles: string[], roots: number[]): Set<number> {
  const matched = new Set<number>(roots.filter((pid) => Number.isSafeInteger(pid) && pid > 0))
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

/** Kill what a boot left behind, then PROVE it. A non-empty `survivors` is never swallowed here: the
 *  teardown turns it into a failure, because a silent leak is what this reaper exists to make impossible.
 *
 *  `seeds` carries the pids known to belong to the boot ACROSS passes: a zygote matched while its parent was
 *  alive stays a seed after the parent dies, so a renderer it forked is still reachable once reparented. **A
 *  seed is a MEMBER only while it is in the table** — seeding with a pid that has already gone makes the
 *  termination test unsatisfiable and burns every pass (measured: all 20 passes at 15 ms each, ~360 ms per
 *  `stop()`, on `B-2`/`B-5`/`B-6`/`B-8` — a teardown that is "safe" by never finishing is not safe). */
function reap(profiles: string[], roots: number[]): ReapReport {
  const killed: number[] = []
  let seeds = roots.filter((pid) => Number.isSafeInteger(pid) && pid > 0)
  for (let pass = 1; pass <= REAP_PASSES; pass += 1) {
    const rows = processTable()
    const alive = new Set(rows.map((row) => row.pid))
    const targets = membership(rows, profiles, seeds.filter((pid) => alive.has(pid)))
    if (targets.size === 0) return { killed, passes: pass, survivors: [] }
    for (const pid of targets) {
      try {
        process.kill(pid, 'SIGKILL')
        if (!killed.includes(pid)) killed.push(pid)
      } catch { /* ESRCH: gone between the snapshot and the kill, which is the outcome wanted */ }
    }
    seeds = [...new Set([...seeds, ...targets])]
    pauseSync(REAP_PAUSE_MS)
  }
  const rows = processTable()
  const alive = new Set(rows.map((row) => row.pid))
  const still = membership(rows, profiles, seeds.filter((pid) => alive.has(pid)))
  return { killed, passes: REAP_PASSES, survivors: rows.filter((row) => still.has(row.pid)) }
}

/** **A BUILT ARTIFACT, WAITED FOR INSIDE THE BOUND — because a snapshot of it is not a reading.** The build is
 *  CO-OWNED: `arrangement.test.ts`'s own `beforeAll` runs the same `npm run build` when it finds the artifact
 *  absent, and that build's first arm is `npm run clean`. MEASURED: `B-1` red with `existsSync(mainEntry)` false
 *  in 1 of 5 full runs, with its own `beforeAll` build having succeeded — the sibling worker's clean landed
 *  between them. The row waits for the artifact now, and a build that never produced one still reds, after the
 *  bound, naming what it last saw. */
async function artifactWithin(file: string, label: string): Promise<string> {
  const started = Date.now()
  while (Date.now() - started < BOUND_MS) {
    if (existsSync(file) && statSync(file).size > 0) return file
    await new Promise((resolve) => setTimeout(resolve, 20))
  }
  throw new Error(`${label}: no artifact at ${file} within the ${BOUND_MS} ms bound (waited ${Date.now() - started} ms) — ${existsSync(file) ? 'it exists and is empty' : 'it does not exist'}`)
}

const scratchDirs: string[] = []
/** Everything this file has to answer for: every scratch profile it minted and every root it spawned. */
const trackedProfiles: string[] = []
const trackedRoots: number[] = []

let buildFailure: string | null = null

const tail = (text: string, lines = 14): string => text.split('\n').slice(-lines).join('\n')

/** The reason a process published, verbatim: the first `…Error: …` / `…Error [code]: …` line. A
 *  failure report that carries no reason is the shape this battery exists to retire (`F-2`). */
const reasonOf = (text: string): string => {
  const found = /^(?:[A-Za-z]*Error(?:\s*\[[^\]]+\])?):.*$/m.exec(text)
  return found === null ? '(the process published no reason)' : found[0].trim()
}

/** A bound on a promise, so no row can hang on a transport's own timeout (`F-2`). A process that
 *  publishes a load error rejects it AT ONCE with that error, so a red row names its reason rather
 *  than spending the bound.
 *
 *  **AND IT SAYS WHICH KIND OF MISS IT WAS**: a process that published NOTHING on stderr is "never", a
 *  process that published lines but not the answer is "too slow" (or the wrong observable). Before this,
 *  both read as one bare timeout. */
async function withBound<T>(work: Promise<T>, label: string, trace: () => string): Promise<T> {
  const started = Date.now()
  let timer: NodeJS.Timeout | undefined
  const watched = new Promise<never>((_resolve, reject) => {
    let failingSince = 0
    timer = setInterval(() => {
      const seen = trace()
      const failed = LOAD_ERROR.exec(seen)
      if (failed !== null) {
        if (failingSince === 0) failingSince = Date.now()
        const complete = reasonOf(seen) !== '(the process published no reason)' || Date.now() - failingSince > LOAD_ERROR_DRAIN_MS
        if (complete) reject(new Error(`${label}: the process published a failure instead of answering — ${reasonOf(seen)}\n${tail(seen)}`))
      } else if (Date.now() - started > BOUND_MS) {
        const lines = seen.trim() === '' ? 0 : seen.trim().split('\n').length
        const kind = lines === 0
          ? 'the process published NOTHING on stderr, so the answer never happened — this is "never", not "too slow"'
          : `the process published ${lines} stderr line(s), none of them the answer after ${Date.now() - started} ms — this is "too slow" (or the wrong observable), not "never"`
        reject(new Error(`${label}: no answer within the ${BOUND_MS} ms bound — ${kind}; the trace stands:\n${tail(seen)}`))
      }
    }, 50)
  })
  try {
    return await Promise.race([work, watched])
  } finally {
    if (timer !== undefined) clearInterval(timer)
  }
}

interface Boot {
  trace: () => string
  waitFor: (pattern: RegExp, label: string) => Promise<void>
  profile: string
  stop: () => void
}

/** Spawn the built bundle the way a client spawns it, on a fresh scratch profile. */
function bootApp(entry: string, extra: string[] = []): Boot {
  const profile = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-'))
  scratchDirs.push(profile)
  trackedProfiles.push(profile)
  const args = [...extra, entry, ...BASE_ARGS, `--user-data-dir=${profile}`, `--provident-user-data=${profile}`]
  const child = spawn(electronBin, args, {
    cwd: repoRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...stringEnv(), DISPLAY: process.env.DISPLAY ?? ':0', ELECTRON_DISABLE_SANDBOX: '1' },
  })
  children.push(child)
  if (child.pid !== undefined) trackedRoots.push(child.pid)
  let trace = ''
  child.stderr?.on('data', (chunk) => { trace += String(chunk) })
  child.stdout?.on('data', (chunk) => { trace += String(chunk) })

  /** The two facts a bound cannot supply on its own: did the SPAWN itself fail, and has the process
   *  ENDED? Without them a row cannot tell an empty stderr read from a process that never existed. */
  let spawnFailure: string | null = null
  let ended: { code: number | null; signal: NodeJS.Signals | null } | null = null
  child.on('error', (error: Error) => { spawnFailure = `${error.name}: ${error.message}` })
  child.on('close', (code, signal) => { ended = { code, signal } })

  /** What the row can say about the process at the moment it gives up. */
  const state = (): string => {
    const published = trace.trim() === '' ? 'nothing' : `${trace.trim().split('\n').length} stderr line(s)`
    if (spawnFailure !== null) return `the spawn failed (${spawnFailure}), so the observable never had a process to come from — "never", not "too slow"`
    if (ended !== null) return `the process EXITED (code ${String(ended.code)}, signal ${String(ended.signal)}) after publishing ${published} — "never", not "too slow"`
    return `the process was still ALIVE (pid ${String(child.pid)}) and had published ${published} — "too slow", not "never"`
  }

  const stop = (): void => {
    // the root first, so it cannot fork a child while the sweep runs; then the tree, SIGKILL only
    try { child.kill('SIGKILL') } catch { /* already gone */ }
    reap([profile], [child.pid ?? 0])
  }

  const waitFor = (pattern: RegExp, label: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const started = Date.now()
      let settled = false
      const settle = (error?: Error): void => {
        if (settled) return
        settled = true
        clearInterval(poll)
        clearTimeout(bound)
        if (error === undefined) resolve()
        else reject(error)
      }
      let failingSince = 0
      const publishedFailure = (): void => settle(new Error(`${label}: the process published a failure instead of the expected boot observable — ${reasonOf(trace)}\n${tail(trace)}`))
      const poll = setInterval(() => {
        if (pattern.test(trace)) return settle()
        if (!LOAD_ERROR.test(trace)) { failingSince = 0; return }
        if (failingSince === 0) failingSince = Date.now()
        if (reasonOf(trace) !== '(the process published no reason)' || Date.now() - failingSince > LOAD_ERROR_DRAIN_MS) return publishedFailure()
      }, 20)
      /** The bound is decided by its OWN timer, never by a poll that compares `Date.now()`: such a poll can
       *  fire before the stderr chunk that would have satisfied it and then report a miss that had already
       *  stopped being one. */
      const bound = setTimeout(() => {
        settle(new Error(`${label}: no observable within the ${BOUND_MS} ms bound (waited ${Date.now() - started} ms) — ${state()}; the trace stands:\n${tail(trace)}`))
      }, BOUND_MS)
      /** A process that has gone cannot publish anything more, so its `close` is an ANSWER, not a wait: this
       *  is what stops a dead child from spending the whole bound and being reported as merely slow. A failure
       *  it DID publish before ending is reported verbatim, so B-8's reason survives this path too. */
      child.once('close', () => {
        if (pattern.test(trace)) return settle()
        if (LOAD_ERROR.test(trace)) {
          return settle(new Error(`${label}: the process published a failure instead of the expected boot observable — ${reasonOf(trace)}\n${tail(trace)}`))
        }
        settle(new Error(`${label}: the process ended before it published the expected boot observable — ${state()}; the trace stands:\n${tail(trace)}`))
      })
    })

  return { trace: () => trace, waitFor, profile, stop }
}

/** The MCP client the battery is: it drives the transport the bundle itself opened (`D-27`).
 *
 *  `stop()` closes the transport — which is the SDK's own courtesy path, `stdin.end()` then SIGTERM then
 *  SIGKILL, and it reaches the MAIN process only — and then reaps the tree and PROVES it, because the three
 *  children holding the profile are not the SDK's to kill. */
async function handshake(entry: string, extra: string[] = ['--mcp-transport=stdio']): Promise<{ client: Client; trace: () => string; stop: () => Promise<void> }> {
  const profile = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-'))
  scratchDirs.push(profile)
  trackedProfiles.push(profile)
  const transport = new StdioClientTransport({
    command: electronBin,
    args: [...extra, entry, ...BASE_ARGS, `--user-data-dir=${profile}`, `--provident-user-data=${profile}`],
    cwd: repoRoot,
    stderr: 'pipe',
    env: { ...stringEnv(), DISPLAY: process.env.DISPLAY ?? ':0', ELECTRON_DISABLE_SANDBOX: '1' },
  })
  let trace = ''
  transport.stderr?.on('data', (chunk) => { trace += String(chunk) })
  const client = new Client({ name: 'bundle-boot-seam-e2e', version: '0.1.0' })
  await withBound(client.connect(transport), `initialize over the ${extra.join(' ') || 'default'} transport`, () => trace)
  const stop = async (): Promise<void> => {
    await client.close().catch(() => undefined)
    reap([profile], [])
  }
  return { client, trace: () => trace, stop }
}

const toolNames = async (client: Client, label: string, trace: () => string): Promise<string[]> => {
  const listed = await withBound(client.listTools(), `${label}: tools/list`, trace)
  return listed.tools.map((tool) => tool.name)
}

beforeAll(() => {
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: 600_000 })
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  }
}, 600_000)

afterEach(() => {
  for (const child of children.splice(0)) {
    try { child.kill('SIGKILL') } catch { /* already gone */ }
  }
})

afterAll(() => {
  // THE INVARIANT, in this order and with nothing silent in it: reap every tree this file spawned, PROVE
  // zero, and only then remove the profiles — a directory removed under a live process leaves the survivor
  // holding a file nobody can find, which is how two runs' trees held store handles for a day and seventeen
  // hours against profiles whose directories were already gone.
  const report = reap([...trackedProfiles], [...trackedRoots])
  for (const dir of scratchDirs.splice(0)) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort; the assert below is the guarantee */ }
  }
  if (report.survivors.length > 0) {
    throw new Error(
      `bundle-boot-seam teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s) over ` +
      `${trackedProfiles.length} scratch profile(s). A survivor here means this run leaks a process tree, which is the defect ` +
      `the teardown exists to make impossible — and SIGTERM is not the fix, because Electron's main process ignores it:\n` +
      report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

/** **THE SAFETY NET, for the teardown that never runs.** Every hook above only runs if vitest reaches it: a
 *  rejected `beforeAll`, a killed worker or an interrupted run leaves the whole tree alive, and that is the one
 *  shape no in-hook teardown can cover. `scripts/electron-spawn.mjs:212` already registers exactly this for the
 *  legs; the battery had no equivalent, so an abnormal end leaked everything it had spawned. */
process.on('exit', () => {
  try {
    reap([...trackedProfiles], [...trackedRoots])
  } catch { /* an exit path cannot report: the hooks above are where a leak becomes a verdict */ }
})

describe('bundle-boot-seam — the boot contract of the built bundle', () => {
  it('B-1 the build produces the entry the app boots', async () => {
    expect(buildFailure).toBeNull()
    const entry = await artifactWithin(mainEntry, 'B-1')
    expect(readFileSync(entry).byteLength).toBeGreaterThan(0)
  }, ROW_MS)

  it('B-2 the built main bundle survives module evaluation', async () => {
    const boot = bootApp(mainEntry, ['--mcp-transport=stdio'])
    try {
      await boot.waitFor(TRACE, 'B-2 module evaluation')
      expect(boot.trace()).not.toMatch(LOAD_ERROR)
    } finally {
      boot.stop()
    }
  }, ROW_MS)

  it('B-3 the bundle completes a stdio handshake', async () => {
    const { client, trace, stop } = await handshake(mainEntry)
    try {
      const names = await toolNames(client, 'B-3', trace)
      expect(names).toContain('provident.get_rendered_html')
    } finally {
      await stop()
    }
  }, ROW_MS)

  it('B-4 it answers a real tool call through that handshake', async () => {
    const { client, trace, stop } = await handshake(mainEntry)
    try {
      expect(trace()).toMatch(STDIO_READY)
      const answered = await withBound(
        client.callTool({ name: 'provident.get_rendered_html', arguments: {} }),
        'B-4 provident.get_rendered_html',
        trace,
      )
      const content = answered.content as unknown as { type: string; text?: string }[]
      const first = content[0]
      expect(first?.type).toBe('text')
      const parsed = JSON.parse(first.text ?? '{}') as { renderedHtml?: unknown }
      expect(typeof parsed.renderedHtml).toBe('string')
      expect((parsed.renderedHtml as string).length).toBeGreaterThan(0)
    } finally {
      await stop()
    }
  }, ROW_MS)

  it('B-5 the boot order holds and the storeroom instance constructs', async () => {
    const boot = bootApp(mainEntry, ['--mcp-transport=stdio'])
    try {
      await boot.waitFor(TRACE, 'B-5 boot trace')
      await boot.waitFor(STDIO_READY, 'B-5 transport ready')
      await boot.waitFor(RENDERER_READY, 'B-5 renderer ready')
      const trace = boot.trace()
      expect(trace.search(TRACE)).toBeLessThan(trace.search(STDIO_READY))
      expect(trace.search(TRACE)).toBeLessThan(trace.search(RENDERER_READY))
      expect(trace).not.toMatch(LOAD_ERROR)
      expect(readdirSync(boot.profile)).toContain(INSTANCE_FILE)
    } finally {
      boot.stop()
    }
  }, ROW_MS)

  it('B-6 the HTTP transport binds and answers on the configured port', async () => {
    const port = 38300 + (process.pid % 500)
    const boot = bootApp(mainEntry, ['--mcp-transport=http', `--mcp-port=${port}`])
    try {
      await boot.waitFor(HTTP_READY, 'B-6 http transport ready')
      expect(boot.trace()).toContain(`http transport ready on http://127.0.0.1:${port}/mcp`)
      const client = new Client({ name: 'bundle-boot-seam-e2e', version: '0.1.0' })
      const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`))
      try {
        await withBound(client.connect(transport), 'B-6 initialize over Streamable HTTP', boot.trace)
        const names = await toolNames(client, 'B-6', boot.trace)
        expect(names).toContain('provident.get_rendered_html')
        const offRoute = await fetch(`http://127.0.0.1:${port}/mcp`)
        expect(offRoute.status).toBe(405)
      } finally {
        await client.close().catch(() => undefined)
      }
    } finally {
      boot.stop()
    }
  }, ROW_MS)

  it('B-7 the other two bundles still boot', async () => {
    for (const file of ['standalone.mjs', 'battery-host.mjs']) {
      const entry = join(repoRoot, 'dist', 'main', file)
      expect(existsSync(entry)).toBe(true)
      const transport = new StdioClientTransport({
        command: process.execPath,
        args: [entry, '--mcp-transport=stdio'],
        cwd: repoRoot,
        stderr: 'pipe',
        env: stringEnv(),
      })
      let trace = ''
      transport.stderr?.on('data', (chunk) => { trace += String(chunk) })
      const client = new Client({ name: 'bundle-boot-seam-e2e', version: '0.1.0' })
      try {
        await withBound(client.connect(transport), `B-7 ${file}: initialize`, () => trace)
        const names = await toolNames(client, `B-7 ${file}`, () => trace)
        expect(names.length).toBeGreaterThan(0)
      } finally {
        await client.close().catch(() => undefined)
      }
    }
  }, ROW_MS)

  it('B-8 an unbootable bundle is a failure with its reason, never a bare timeout', async () => {
    const reason = 'bundle-boot-seam negative control: injected boot failure'
    const dir = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-corrupt-'))
    scratchDirs.push(dir)
    /** The copy carries the basename the `main` field names, so it is the artifact's own module
     *  system: a `.cjs`-named copy of ESM bytes fails at PARSE with `SyntaxError: Cannot use import
     *  statement outside a module` and never reaches the injected reason this row asserts. */
    const corrupt = join(dir, basename(mainEntry))
    // **THE COPY MUST BE ABLE TO LINK BEFORE IT CAN THROW** (`B-8`'s premise, corrected 2026-10-30): the artifact
    // imports `provident-storeroom` as an EXTERNAL (`package.json`'s build line), and ESM resolves a module's static
    // imports before its body runs — so a copy in a bare temp directory fails with `ERR_MODULE_NOT_FOUND` at link
    // time and the injected `throw` never executes. The row's claim is "an unbootable bundle fails WITH ITS REASON",
    // which needs the copy resolvable to the point of running, so the external is linked beside it. The bundle is
    // still corrupt: the injected throw is the failure under test.
    mkdirSync(join(dir, 'node_modules'), { recursive: true })
    symlinkSync(
      realpathSync(join(repoRoot, 'node_modules', 'provident-storeroom')),
      join(dir, 'node_modules', 'provident-storeroom'),
      'dir',
    )
    writeFileSync(corrupt, `throw new Error(${JSON.stringify(reason)})\n${readFileSync(mainEntry, 'utf8')}`)
    const boot = bootApp(corrupt)
    let report = ''
    try {
      await boot.waitFor(TRACE, 'B-8 negative control')
      throw new Error('B-8: the corrupted bundle booted, so the negative control asserted nothing')
    } catch (error) {
      report = error instanceof Error ? error.message : String(error)
    } finally {
      boot.stop()
    }
    expect(report).toContain(reason)
    expect(report).not.toMatch(/no observable within/)
  }, ROW_MS)
})
