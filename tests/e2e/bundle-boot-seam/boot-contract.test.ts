// tests/e2e/bundle-boot-seam/boot-contract.test.ts — THE L1 BATTERY for `bundle-boot-seam`: the
// eight boot-contract scenarios of `docs/L1/bundle-boot-seam.md` §6, B-1..B-8 — **and ONE row this
// battery carries of its own, B-9 (added 2026-11-02, D-80), which §6 does not declare and L1 owes:
// a profile whose name cannot be OCCUPIED fails the boot with a stated message. It is named in the
// B-family because it states the same kind of observable — what a failing boot publishes — and it is
// called out here because a reader counting this file against its design would otherwise find nine.**
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
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
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
/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE** (B-9): the boot's one store is constructed over
 *  `<userData>/provident-profile.json` (`src/main/main.ts`'s `createProfileStore`), and this battery's grain is
 *  the BUILT BUNDLE, never the source (D-27) — so the name is a literal here and not an import of
 *  `PROFILE_FILE_NAME`. A bundle that moved the name would leave B-9 measuring a directory that no longer
 *  collides with anything, which is why the row also asserts the PATH it read back off the bundle's own message. */
const PROFILE_FILE = 'provident-profile.json'
/** **THE STATED REFUSAL** (D-80): the one sentence the boot must publish when the profile's name cannot be
 *  occupied — the store's construction failed, so the profile cannot be opened. A row that only asserted "the
 *  process exited" would be green against an unhandled throw, which is the shape this row exists to refuse. */
const STATED_REFUSAL = /the profile store could not be CONSTRUCTED at boot/

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

// ---- the casualty's instrument ----------------------------------------------
/** **WHAT A FAILED CONNECT NOW REPORTS, WHICH `D-173` MEASURED THAT THIS FILE COULD NOT.** stderr IS piped into `trace`
 *  and the child's exit code and signal ARE computed — the SDK's `StdioClientTransport` hands them to
 *  `transport.onerror` — and both facts were then DROPPED on the connect path, so a casualty could only ever read
 *  `McpError -32000: Connection closed`, which cannot separate an OOM `SIGKILL` from an `exit 1` on a missing bundle.
 *  The two facts are recorded beside the trace and attached to the connect-path throw, so a red row names the child's
 *  exit code, its signal and the tail of what it published. `bootApp`'s own spawn path records the same two facts.
 *
 *  **`transport.onerror` IS SET BEFORE `client.connect`, AND THAT ORDER IS THE WHOLE MECHANISM**: `Protocol.connect`
 *  captures whatever handler stands on the transport and wraps it as `_onerror?.(error); this._onerror(error)`
 *  (`node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js`), so a handler set BEFORE the connect survives
 *  the re-wrap; one set after it is replaced by that wrapper and reaches nobody. And `new Client({name, version})` passes
 *  no `onerror`, so before this the transport's `child exited (code X, signal Y)` was a no-op. */
interface ChildEnd { code: number | null; signal: NodeJS.Signals | null }
interface Observed { ended: ChildEnd | null; error: string | null }
const observed = (): Observed => ({ ended: null, error: null })
/** The connect-path throw, carrying what the child did; the SDK's own error stays the `cause`, never swallowed. */
function diagnose(label: string, caught: unknown, seen: Observed, trace: string): Error {
  const ended = seen.ended === null
    ? "the child's `close` was NOT observed, so it was still running when this was thrown"
    : `the child closed: code ${String(seen.ended.code)}, signal ${String(seen.ended.signal)}`
  return new Error(
    `${label}: ${caught instanceof Error ? caught.message : String(caught)}\n${ended}` +
      `${seen.error === null ? '' : `\n\`transport.onerror\` recorded: ${seen.error}`}` +
      `\nstderr tail:\n${tail(trace)}`,
    { cause: caught },
  )
}

/** **ONE CONNECT PATH, INSTRUMENTED, FOR EVERY TRANSPORT THIS FILE CONNECTS** (`D-173`). The handler is set BEFORE
 *  `client.connect` because the SDK's wrapper preserves the one standing there and nothing else; and the child is
 *  caught on the SAME TICK, because `connect()` calls `start()`, which assigns the spawned process synchronously, while
 *  the transport clears that handle BEFORE it calls `onclose` — so the exit code and the signal are readable only from
 *  the handle itself. A private field read through a stated shape: an SDK that moves it costs this file the exit facts,
 *  never the row. The bound, the label and the trace are `withBound`'s, unchanged. */
async function connectWatched(client: Client, transport: Transport, label: string, seen: Observed, trace: () => string): Promise<void> {
  transport.onerror = (error: Error) => { seen.error = error.message }
  const connecting = client.connect(transport)
  const spawned = (transport as unknown as { _process?: ChildProcess })._process
  spawned?.on('close', (code, signal) => { seen.ended = { code, signal } })
  try {
    await withBound(connecting, label, trace)
  } catch (error) {
    throw diagnose(label, error, seen, trace())
  }
}

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

/** Spawn the built bundle the way a client spawns it, on a fresh scratch profile.
 *
 *  **`prepare` IS WHAT MAKES A PROFILE UNOCCUPIABLE, AND IT RUNS ON THE VERY PROFILE THE SPAWN WILL USE**
 *  (B-9, added 2026-11-02): the scratch directory is created, the hook is handed it, and only then is the
 *  process spawned — because the state B-9 needs, a DIRECTORY standing where `provident-profile.json` goes,
 *  must stand BEFORE the store's own construction, and there is no later instant at which a row could put it
 *  there. The profile is registered for reaping before the hook runs, so a hook that throws still leaves
 *  nothing for the teardown to miss. */
function bootApp(entry: string, extra: string[] = [], prepare?: (profile: string) => void): Boot {
  const profile = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-'))
  scratchDirs.push(profile)
  trackedProfiles.push(profile)
  prepare?.(profile)
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
  const seen = observed()
  child.on('error', (error: Error) => { spawnFailure = `${error.name}: ${error.message}` })
  child.on('close', (code, signal) => { seen.ended = { code, signal } })

  /** What the row can say about the process at the moment it gives up. */
  const state = (): string => {
    const published = trace.trim() === '' ? 'nothing' : `${trace.trim().split('\n').length} stderr line(s)`
    if (spawnFailure !== null) return `the spawn failed (${spawnFailure}), so the observable never had a process to come from — "never", not "too slow"`
    if (seen.ended !== null) return `the process EXITED (code ${String(seen.ended.code)}, signal ${String(seen.ended.signal)}) after publishing ${published} — "never", not "too slow"`
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
  // The child's own end and the transport's own error are recorded beside the trace, and the throw carries them: this
  // is the path a casualty took to report a bare `-32000: Connection closed` (`D-173`).
  await connectWatched(client, transport, `initialize over the ${extra.join(' ') || 'default'} transport`, observed(), () => trace)
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

/** **THE ARTIFACT SET EVERY BOOT IN THIS FILE LOADS**, and `npm run build`'s arms produce it: the two bundles `B-7`
 *  boots, this app's entry, its preload, and the renderer's bundle and page. */
const BUILT_ARTIFACTS = [
  mainEntry,
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'main', 'standalone.mjs'),
  join(repoRoot, 'dist', 'main', 'battery-host.mjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
/** A `stat` that threw is a file still being written, which is not a reading: `false`, never an exception. */
const artifactReady = (file: string): boolean => {
  try {
    return existsSync(file) && statSync(file).size > 0
  } catch {
    return false
  }
}
/** **THE BUILD'S OWN BOUND** — the bound the two sibling builders hold (`arrangement.test.ts`, `emission.test.ts`), so the
 *  one command is bounded identically wherever it runs. Measured: `npm run build` takes `240-500 ms`. */
const BUILD_MS = 600_000

// ---- ONE CLAIMANT FOR THE TREE: THE BUILD RUNS UNDER THE LIVE-BOOT LOCK -------------
/** **THE BUILD IS THE SUITE'S ONLY WRITER OF `dist/`, SO IT TAKES THE SAME HOST-WIDE LOCK THE BOOTING BATTERIES HOLD**
 *  (`D-227`'s cure shape (2)). `npm run build`'s FIRST arm is `npm run clean` (`rmSync('dist')`), which is the `~54 ms`
 *  window `D-173` measured and `D-175` closed on the reading side — and `D-173`'s own second half, *"give the three
 *  builders one shared build lock"*, could not be landed while the booters only WAITED for artifacts: the booter held the
 *  lock and waited for `dist/`, the builder waited for the lock to make `dist/`, and **ten holds × `60 000 ms` produced
 *  ZERO builds in `600 s`** (`D-227`, measured, reverted clean). It lands here because the booters now build their own
 *  tree under this lock: **there is never a second claimant, so the cycle cannot exist.**
 *
 *  **THE DERIVATION IS THE SIBLING SPAWNING BATTERIES', CHARACTER FOR CHARACTER** — the same `tmpdir()` name, the same
 *  owner file, the same 120 s bound and the same dead-holder sweep — because they must contend on ONE path. It is
 *  DUPLICATED rather than shared: the corpus's booting files each carry their own copy of exactly this helper (the four
 *  booters state that they keep one derivation, not one module), and a shared module authored by a harness pass would be a
 *  second place for a lock path to drift. */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
/** How long an UNOWNED lock directory is left alone before it is read as a holder that died between its `mkdir` and its
 *  own owner write: that window is microseconds wide, and sweeping it early would seat two claimants at once. */
const BOOT_LOCK_SETTLE_MS = 2_000
/** **The wait is BOUNDED, because a harness that waits forever measures nothing.** One peer's boot is the whole of a wait,
 *  and a boot's own worst case is its row's bound plus its teardown. */
const BOOT_LOCK_BOUND_MS = 120_000
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
/** A pid that answers signal `0` is alive; `EPERM` is a live process this seat may not signal, which is still alive. */
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
/** Who is holding the lock, read off the owner file — `null` where the directory carries no readable owner. */
function lockHolder(): LockHolder | null {
  try {
    const [pid, since, ...why] = readFileSync(BOOT_LOCK_OWNER, 'utf8').trim().split(' ')
    const held = Number(pid)
    return Number.isSafeInteger(held) && held > 0 ? { pid: held, since: Number(since), why: why.join(' ') } : null
  } catch {
    return null
  }
}
/** The lock directory's own age, and `Infinity` where it is gone: a stat that threw is not an age of zero. */
function lockAgeMs(): number {
  try {
    return Date.now() - statSync(BOOT_LOCK).mtimeMs
  } catch {
    return Number.POSITIVE_INFINITY
  }
}
const liveBootReleases: Array<() => void> = []
/** **TAKE THE HOST-WIDE LIVE-BOOT LOCK, OR RED WITH THE HOLDER NAMED.** A holder that was SIGKILLed ran no release, so it
 *  is read off its own pid (and off the lock's age, because a pid is reused) rather than waited out to the bound. */
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
          /* the exit net sweeps again */
        }
      }
      liveBootReleases.push(release)
      return release
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw new Error(
          `the live-boot lock could not be taken at \`${BOOT_LOCK}\`: ${error instanceof Error ? error.message : String(error)}. ` +
            `The spawning batteries and the three builders are serialised so their writes to \`dist/\` cannot overlap, so a ` +
            `lock path that cannot be created is a harness fault and never a row's reading.`,
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
          `"${holder.why}", since ${new Date(holder.since).toISOString()}. The spawning batteries and the builders are ` +
          `SERIALISED (one claimant at a time, host-wide) so no boot can meet a \`dist/\` rebuild, and this wait is bounded ` +
          `and stated, never silent. Fix: a holder that outlives the bound is a boot or a build that wedged — ` +
          `\`${BOOT_LOCK}\` names it, and SIGKILLing it releases the lock at once.`,
      )
    }
    await sleep(BOOT_LOCK_POLL_MS)
  }
}

/** **THE ARTIFACT SET IS ENSURED, NOT WAITED FOR, UNDER THE LOCK THE BUILDER HOLDS — ONE CLAIMANT** (`D-227`'s cure
 *  shape (2)). The livelock this removes is measured in the lock note above: a booter waiting for `dist/` while its builder
 *  waited for the same lock produced **zero builds in `600 s`**.
 *
 *  (i) Every member present and non-empty ⇒ return; no build, which is the whole of a warm run. (ii) A member absent or
 *  empty ⇒ `npm run build` runs ONCE, here, in this process, and the set is RE-MEASURED. (iii) The build THREW, or it
 *  exited zero without producing the set ⇒ a `new Error` naming the command, the bound and the child's own reason. The
 *  caller records it in `buildFailure` and its rows red on it, which is this battery's existing idiom (`B-1` asserts
 *  `buildFailure` is null); nothing is swallowed, and the row that would have read the artifact reports its own absence. */
async function ensureArtifacts(): Promise<void> {
  if (BUILT_ARTIFACTS.every(artifactReady)) return
  const before = BUILT_ARTIFACTS.filter((file) => !artifactReady(file))
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    throw new Error(
      `the built artifact set is absent at [${before.join(', ')}] and \`npm run build\` — run by this battery ITSELF, under ` +
        `the host-wide live-boot lock it already holds (\`D-227\`) — failed inside its ${BUILD_MS} ms bound: ` +
        `${error instanceof Error ? error.message : String(error)}. These rows boot the ARTIFACT \`npm run build\` produces, ` +
        `so a build that cannot produce it is a harness prerequisite failure and never a row's reading (D-27).`,
    )
  }
  const after = BUILT_ARTIFACTS.filter((file) => !artifactReady(file))
  if (after.length > 0) {
    throw new Error(
      `\`npm run build\` exited without an error and the artifact set is STILL absent at [${after.join(', ')}] (absent ` +
        `before it ran: [${before.join(', ')}]). These rows boot a COMPLETE artifact set or not at all (D-27).`,
    )
  }
}

beforeAll(async () => {
  /** **THIS HOOK BUILDS ONLY WHAT THE TREE DOES NOT CARRY — AND IT BUILDS IT UNDER THE LIVE-BOOT LOCK** (`D-227`). Two
   *  sentences used to stand here and both are now false rather than merely stale: *"run on EVERY `npm test`"* (gone since
   *  `D-175`, this hook is conditional) and *"a sibling worker's build is IN FLIGHT exactly when the artifact is at its most
   *  absent"* (gone here: no file in the suite runs `npm run build` outside this lock any more, so an absence under the
   *  lock is an absence and the 2 s grace that papered over the race has no race left to paper over).
   *
   *  Nothing this battery MEASURES moves: `B-1` still asserts the built entry and `buildFailure`, and a build that fails
   *  still reds it with the reason. The lock is released in a `finally` and again by the exit net below, so a build that
   *  throws can never leave the sibling batteries queued behind a dead claimant. */
  const releaseBootLock = await acquireLiveBoot('bundle-boot-seam boot-contract build (L1)')
  try {
    await ensureArtifacts()
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  } finally {
    releaseBootLock()
  }
}, BUILD_MS + BOOT_LOCK_BOUND_MS)

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
 *  legs; the battery had no equivalent, so an abnormal end leaked everything it had spawned. **AND IT RELEASES THE
 *  LIVE-BOOT LOCK**: a build that throws is released in `beforeAll`'s own `finally`, and this net covers the one path
 *  that has no `finally` — an interrupted run — so a dead builder can never queue the booting batteries for their
 *  bound (`D-227`, `D-74`). */
process.on('exit', () => {
  try {
    reap([...trackedProfiles], [...trackedRoots])
  } catch { /* an exit path cannot report: the hooks above are where a leak becomes a verdict */ }
  for (const release of [...liveBootReleases]) {
    try { release() } catch { /* a release that threw has still run its own removal */ }
  }
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
        await connectWatched(client, transport, 'B-6 initialize over Streamable HTTP', observed(), boot.trace)
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
        await connectWatched(client, transport, `B-7 ${file}: initialize`, observed(), () => trace)
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

  /** **B-9 — A PROFILE THAT CANNOT BE OCCUPIED FAILS THE BOOT WITH A STATED MESSAGE, NEVER AS AN UNHANDLED
   *  THROW** (D-80; added 2026-11-02, and **the ninth row of this battery, which L1 §6 does not yet declare** —
   *  `docs/L1/bundle-boot-seam.md` owes it). `createProfileStore` refuses an unoccupiable `filePath` with the
   *  store's own `FilePathUnreachable` and returns no instance; D-79/D-80 deleted the `data` surface's
   *  construction, so the arm that used to answer that refusal as `store-unreachable` no longer exists and the
   *  boot is the only place left that can say anything about it.
   *
   *  **THE STATE IS A DIRECTORY STANDING WHERE THE FILE GOES**, planted before the spawn (`bootApp`'s
   *  `prepare`) because the store's construction creates the name exclusively at `main.ts`'s second act.
   *
   *  **IT CAN FAIL, AND IT FAILS ON REVERT — MEASURED 2026-11-02, BOTH WAYS.** With the catch in place the boot
   *  publishes `the profile store could not be CONSTRUCTED at boot … status 'FilePathUnreachable' at
   *  '<profile>/provident-profile.json' … the profile cannot be opened` and exits `1` in ~130 ms; with the catch
   *  removed it publishes the raw refusal OBJECT instead — `{ status: 'FilePathUnreachable', message: … }` — so
   *  `STATED_REFUSAL` never matches and the row reports the object it found. The consequence sentence and the
   *  `status '…'` spelling are what make this row red on revert rather than merely present. */
  it('B-9 a profile that cannot be OCCUPIED fails the boot with a stated message, not an unhandled throw', async () => {
    const boot = bootApp(mainEntry, [], (profile) => {
      mkdirSync(join(profile, PROFILE_FILE))
    })
    try {
      await boot.waitFor(STATED_REFUSAL, 'B-9 the stated boot refusal')
      const trace = boot.trace()
      expect(trace, 'B-9 — the store\'s OWN status is named as a status, not left inside a dumped object').toMatch(/status 'FilePathUnreachable'/)
      expect(trace, 'B-9 — the path involved is named, and it is this row\'s own profile').toContain(join(boot.profile, PROFILE_FILE))
      expect(trace, 'B-9 — and the consequence is stated: the profile cannot be opened').toContain('the profile cannot be opened')
      expect(trace, 'B-9 — the failure is STATED: never the unhandled-throw shape, which has no sentence a reader can act on')
        .not.toMatch(/Uncaught Exception|UnhandledPromiseRejection|unhandledRejection/)
    } finally {
      boot.stop()
    }
  }, ROW_MS)
})
