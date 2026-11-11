// tests/e2e/tier-readout/tier-readout.test.ts — THE L1 BATTERY for `tier-readout`: the eight e2e rows of
// `docs/L1/tier-readout.md` §4 (`T-1`..`T-8`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR. `provident.data.read`'s passing answer stops carrying a BARE value and carries the
// storeroom `1.10.0` `TieredNode`: an OBJECT node is `{_tier, …members}` (members INLINE, no `value` wrapper), an
// ARRAY node is `{_tier, value: [ <node>, … ]}` and a LEAF node is `{_tier, value: <literal>}`, and every `_tier` is
// THAT node's OWN tier — one of `mem`/`file`/`temp`, never a set (D-133, D-134, `index.d.ts`'s `TieredNode`).
// **So every row below WAS RED at this head until the shape landed, and each red was the absence it NAMED**: the answer
// then was `{status, kind, path, value}` with `value` plain and no `_tier` anywhere. The shape has LANDED (`E-1`/`E-2`), so
// the eight are GREEN at this head and the paragraph is kept as the red-first record — the thing that makes them evidence
// (`strata/examiner.md` §2-§3, D-27, D-40).
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): every row spawns the bundle `npm run build`
// produces, on ITS OWN scratch profile, handshakes the MCP client over its stdio transport, and drives
//   · the agent's own acts — `provident.data.write` / `provident.data.read` over stdio;
//   · **the app's OWN profile file** `<profile>/provident-profile.json`, read BY THIS PROCESS, because the `file`
//     tier's truth is its bytes and a `mem`/`temp` value can never come from a file (`D-84`, `T-5`, `T-7`);
//   · **a SECOND PROCESS on the same profile**, which is what tells a durable value from a re-minted one (`T-5`);
//   · the app's own `window.provident.data` member driven INSIDE its renderer realm and read back through the
//     EXISTING `provident.get_rendered_html` — the measurement channel `tests/e2e/focus-retirement/` and
//     `tests/e2e/store-crossings/crossings-live.mjs` established (`D-94`) — once, at `T-6`.
// NO ROW IMPORTS `src/**` OR `scripts/**`: the internals these rows would name are the ones this design moves, and
// `npm run typecheck:tests` types the `tests/**` tree alone (`tsconfig.tests.json`). NO ROW IS SKIPPED OR SOFTENED,
// and this file carries no `strata:marked` marker: a `tests/e2e/**` file always gates (D-30, D-40).
//
// WHAT THE ROWS DO NOT MEASURE, STATED BECAUSE AN ABSENT ROW IS OTHERWISE INDISTINGUISHABLE FROM A FORGOTTEN ONE:
//   · No row drives a `temp` app family. No `temp` tier is written anywhere under `src/` at this head, so the pane
//     drag's ghost does not exist yet; `T-4` measures the ANSWER at that tier through the agent's own route, which
//     is the half this unit owns, and the ASKER is row `5`'s (§5 of the design).
//   · `T-6` loads a driver envelope, which REPLACES the app's own graph for that boot: the row is the preload's own
//     member driven in its realm, and it claims nothing about a rendered node of the app's page.
//   · No row writes at `['tabs']` or `['zones']`: `T-8` is the app's own families answering the tiers their
//     declarations put them at, so the row writes NOTHING and reads the boot's own store.
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON. A boot that publishes a load error is reported AT ONCE
// with that error, never as a timeout; a file read that never settles prints the poll it reached and lets its own
// assertion answer; and `afterAll` SIGKILLs every process tree this file spawned, PROVES zero survivors and only then
// removes the profiles (`D-74`).
import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import type { Transport, TransportSendOptions } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { JSONRPCMessage, MessageExtraInfo } from '@modelcontextprotocol/sdk/types.js'
import { afterAll, afterEach, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { main: string }
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
/** The row's own bound above the waits it contains: `T-5` boots TWO processes on one profile. */
const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/

/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the store's one written name stands at
 *  `<profile>/provident-profile.json` (`src/main/data/store.ts`'s `PROFILE_FILE_NAME`, reached through the boot's one
 *  store), and this battery's grain is the built artifact, so the name is a literal and never an import (D-27). */
const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful
 *  way to supply this run's grant, since no bridge route can widen it (`D-85`, `D-94`'s seeded profile). `data` is
 *  among the groups because every row reaches the `data` surface through `provident.data.*`. */
const SECURITY_SEED = 'provident-security.json'
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'data']

/** **THE FIVE UNDECLARED ROOTS THIS BATTERY WRITES AT** — no crossing declares them, so every write below is the
 *  caller's own address and a `declared-tier` refusal here would be a harness fault, not a reading (`D-101`). */
const SHAPE = 'tier-shape'
const FILE_ROOT = 'tier-file'
const MEM_ROOT = 'tier-mem'
const TEMP_ROOT = 'tier-temp'
const LOSSY = 'tier-lossy'
/** **THE APP'S OWN TWO FAMILIES `T-8` READS** — `['tabs']` is the tab record's (`file`) and `['zones']` the view
 *  record's zone family (`mem`); `T-8` writes at neither (D-63, D-87, D-91). */
const TABS = 'tabs'
const ZONES = 'zones'
/** The store's three persistence tokens, as the answer's `_tier` domain — the ANSWER's set, one token per node; the
 *  read's `tier` ARGUMENT is the only place a set could appear (`TierSet`), and no row below asserts one (`D-134`). */
const TIER_TOKENS = ['file', 'mem', 'temp'] as const
type Tier = (typeof TIER_TOKENS)[number]

/** `T-1`'s value, spelled once: a scalar, a number, a boolean, a dense array and a nested object — one node form per
 *  member, so the answer's totality is measured rather than its happy path (§4 `T-1`). */
const SHAPE_VALUE = { label: 'shape', count: 3, flag: true, list: ['a', 'b'], inner: { deep: 'v' } }
/** `T-7`'s value: a caller storing the MINTED field's own name. `not-a-tier` is outside the store's three tokens, so a
 *  naive readout would have to repeat it — the lossy name's first half (§1, `D-134`). */
const LOSSY_VALUE = { _tier: 'not-a-tier', label: 'kept' }
const LOSSY_STORED_TOKEN = 'not-a-tier'

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
/** `StdioClientTransport`'s `env` is a closed `Record<string, string>`; `process.env` is not. */
const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))
const tail = (text: string, lines = 12): string => text.split('\n').slice(-lines).join('\n')

// ---- the casualty's instrument ----------------------------------------------
/** **WHAT A FAILED CONNECT NOW REPORTS, WHICH `D-173` MEASURED THAT THIS FILE COULD NOT.** stderr IS piped into `trace`
 *  and the child's exit code and signal ARE computed — the transport hands them to `transport.onerror` — and both facts
 *  were then DROPPED on the connect path (`reap(); releaseBootLock(); throw error`), so a casualty could only ever read
 *  `McpError -32000: Connection closed`, which cannot separate an OOM from an `exit 1` on a missing bundle. The two
 *  facts are recorded beside the trace and attached to the connect-path throw, so a red row names the child's exit
 *  code, its signal and the tail of what it published.
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

/** The observed answer as a bounded string: every assertion message carries one, so a reader can tell a missing
 *  `_tier` from a wrong `_tier` from a prerequisite failure without re-running the row. */
const trunc = (text: string, max = 420): string => (text.length > max ? `${text.slice(0, max)}…` : text)
const textOf = (value: unknown): string => {
  try {
    return trunc(JSON.stringify(value) ?? String(value))
  } catch {
    return trunc(String(value))
  }
}

// ---- reading JSON without trusting it ---------------------------------------
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const arr = (value: unknown): unknown[] => (Array.isArray(value) ? (value as unknown[]) : [])
const objectList = (value: unknown): Json[] => arr(value).map(asObject).filter((entry): entry is Json => entry !== null)
/** ONE MEMBER of a plain object, `undefined` where the value is no object or carries none — so a missing member is a
 *  failed EQUALITY against the expected node and never a throw. */
const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}
/** An answer's own enumerable key set, sorted. `{}` where the answer is no object, so the key-set assertion reds with
 *  the whole set it saw rather than crashing. */
const keysOf = (value: unknown): string[] => {
  const held = asObject(value)
  return held === null ? [] : Object.keys(held).sort()
}
const owns = (value: unknown, key: string): boolean => {
  const held = asObject(value)
  return held !== null && Object.prototype.hasOwnProperty.call(held, key)
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

// ---- ONE LIVE BOOT AT A TIME, HOST-WIDE --------------------------------------
/** **THE LIVE BOOTS ARE SERIALISED, AND THIS MATRIX SAYS SO** (`D-1`, `D-43`; §4 of `docs/L1/tier-readout.md`). Two
 *  batteries of this kind may not stand in two FILES at once: `npm test` runs the suite's files in parallel workers, and
 *  this battery and `tests/e2e/focus-retirement/` each SPAWN the built bundle, so two Electron trees on one host red each
 *  other's rows. The contention is the MACHINE's — never a port and never a profile, because every boot here already
 *  carries its own `mkdtemp` profile and its own stdio pipe. The corpus's own live boots never overlap BY CONSTRUCTION:
 *  `npm run crossings` drives FIVE boots on THREE scratch profiles IN ONE PROCESS and awaits each (`D-94`), and each of
 *  the four Electron legs holds one boot at a time — so that rule is kept here as a LOCK around the boot window rather
 *  than as a runner knob, because the knob would serialise every file the suite carries while a lock serialises the live
 *  boots and nothing else. **No row is skipped, softened or re-bounded for it**: a row that waits for the lock measures
 *  exactly what it measured with the machine to itself (`D-30`, `D-40`). */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
/** How long an UNOWNED lock directory is left alone before it is read as a holder that died between its `mkdir` and its
 *  own owner write: that window is microseconds wide, and sweeping it early would seat two boots at once. */
const BOOT_LOCK_SETTLE_MS = 2_000
/** **The wait is BOUNDED, because a harness that waits forever measures nothing.** One peer's boot is the whole of a
 *  wait — only two files in the suite spawn — and a boot's own worst case is its row's bound plus its teardown. */
const BOOT_LOCK_BOUND_MS = 120_000
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
          `at a time, host-wide) so their trees cannot contend, and this wait is bounded and stated, never silent. Fix: a holder ` +
          `that outlives the bound is a boot that wedged — \`${BOOT_LOCK}\` names it, and SIGKILLing it releases the lock at once.`,
      )
    }
    await sleep(BOOT_LOCK_POLL_MS)
  }
}

const scratchProfiles: string[] = []
const livePids: number[] = []
/** The net for a teardown that never runs: a rejected hook, a killed worker or an interrupted run leaves the tree
 *  alive otherwise. A SIGKILLed worker gets no net at all, and that limit is stated rather than hidden (`D-74`). */
process.on('exit', () => {
  reap(scratchProfiles, livePids)
  // The lock is released only AFTER the tree is proven gone, and a net that never releases it would wedge the sibling
  // spawning battery for the bound (`D-94`'s teardown order, `D-74`).
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
/** A FRESH scratch profile carrying this run's supplied state through the retired carrier's import-once path — never a
 *  hand-written instance file, whose bytes are the store's own (`D-85`, `D-94`). */
function makeProfile(name: string): string {
  const profile = mkdtempSync(join(tmpdir(), `${name}-`))
  scratchProfiles.push(profile)
  writeFileSync(join(profile, SECURITY_SEED), JSON.stringify({ token: null, enabled: SEEDED_GROUPS }, null, 2))
  return profile
}

// ---- bounded waits ----------------------------------------------------------
/** A bound on a promise, so no row can hang on a transport's own timeout. A process that publishes a load error
 *  rejects it AT ONCE with that error, so a red row names its reason instead of spending the bound. */
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
/** **THE WHOLE ARTIFACT SET A BOOT LOADS, AND NOT ONLY ITS ENTRY POINT** — because a boot is not a reading of one file and
 *  a snapshot of one file is not a snapshot of the build: waiting on `main.mjs` alone let a boot start in the window where
 *  the main bundle was back and the renderer was not — MEASURED: a `T-2` boot answered `ERR_FILE_NOT_FOUND` on
 *  `dist/renderer/index.html` instead of measuring its row. Every member below is a file this boot's ELECTRON LOAD reads
 *  (`npm run build`'s `outfile`/`outdir`/`cp` arms) — the main bundle, its preload, and the renderer's bundle and page —
 *  and an absent member is a named prerequisite failure and never a silent one (D-27, `strata/brief.md` §6). */
const BOOT_ARTIFACTS = [
  join(repoRoot, 'dist', 'main', 'main.mjs'),
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
/** A `statSync` that threw is not a reading — it is a file still being written — so it is `false` here, never an exception. */
function artifactReady(file: string): boolean {
  try {
    return existsSync(file) && statSync(file).size > 0
  } catch {
    return false
  }
}
/** **THE BUILD'S OWN BOUND, AND IT IS DELIBERATELY SMALLER THAN `ROW_MS`**: a build that spends past it reds as a NAMED
 *  build failure inside the row that asked for it, never as a row timeout that leaves the live-boot lock held with no
 *  verdict (`F-2`'s lesson). Measured: `npm run build` takes `240-500 ms`; this is ~240× that. */
const BUILD_MS = 120_000

/** **THE ARTIFACT SET IS ENSURED, NOT WAITED FOR, BY THE ONE CLAIMANT THAT HOLDS THE LOCK** — `D-227`'s cure shape (2).
 *
 *  THE LIVELOCK THIS REPLACES, MEASURED. `D-173` asked for two halves: this check moved INSIDE the live-boot lock (landed,
 *  `D-175`) and the three in-suite builders given the SAME lock (`boot-contract.test.ts`, `arrangement.test.ts`,
 *  `emission.test.ts`). Together they deadlock: this battery held the lock and waited (`BOUND_MS`, `60 000 ms`) for a
 *  `dist/` that only `npm run build` produces, while the builders waited for that same lock to run it — and `npm run build`'s
 *  FIRST arm is `npm run clean`, the only thing that ever removes `dist/`. Neither side can yield to the other:
 *  **ten holds × `60 000 ms`, ZERO builds in `600 s`, the run killed.** So the wait is gone. The booter BUILDS THE TREE
 *  ITSELF, in this process, under the lock it already holds — **one claimant, no cycle**.
 *
 *  THE THREE STATES, EACH STATED RATHER THAN IMPLIED. (i) Every member present and non-empty ⇒ return; no build, which is
 *  the whole of a warm run. (ii) A member absent or empty ⇒ `npm run build` runs ONCE, here, and the set is RE-MEASURED: a
 *  build that exits zero and leaves a member absent is a named red, never a spawn into a half-written `dist/`. (iii) The
 *  build THREW ⇒ the reason is re-thrown naming the command, the bound and the child's own error: this battery spawns
 *  nothing, the lock is released on the way out, and the failure is never swallowed.
 *
 *  **ABSENCE UNDER THE LOCK IS ABSENCE, WHICH IS WHY THIS IS ONE SNAPSHOT AND NOT A POLL**: after this change no file in the
 *  suite runs `npm run build` outside this lock, so the `~54 ms` `dist/` hole that made a booter's artifact check stale
 *  cannot be opened under a boot at all (`D-173`, `D-175`, `D-227`). */
async function ensureArtifacts(): Promise<void> {
  if (BOOT_ARTIFACTS.every(artifactReady)) return
  const before = BOOT_ARTIFACTS.filter((file) => !artifactReady(file))
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    throw new Error(
      `the built artifact set is absent at [${before.join(', ')}] and \`npm run build\` — run by this battery ITSELF, under ` +
        `the host-wide live-boot lock it already holds (\`D-227\`) — failed inside its ${BUILD_MS} ms bound: ` +
        `${error instanceof Error ? error.message : String(error)}. This battery boots the ARTIFACT \`npm run build\` ` +
        `produces and builds one only when the tree does not already carry it, so a build that cannot produce it is a ` +
        `harness prerequisite failure and never a row's reading (D-27, strata/brief.md §6).`,
    )
  }
  const after = BOOT_ARTIFACTS.filter((file) => !artifactReady(file))
  if (after.length > 0) {
    throw new Error(
      `\`npm run build\` exited without an error and the artifact set is STILL absent at [${after.join(', ')}] (absent ` +
        `before it ran: [${before.join(', ')}]). This battery spawns into a COMPLETE artifact set or not at all ` +
        `(D-27, strata/brief.md §6).`,
    )
  }
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
/** ONE `provident.data.read`, at one address and (where the row names one) one tier: the WHOLE surface answer is
 *  returned — `{status, kind, path, value}`, an `absent` arm or the closed ledger — because these rows assert the
 *  answer's own member set and not a member of it (`T-3`). `text` is the transport's bytes, carried into every
 *  message so a red names what was observed. */
async function readAt(client: Client, path: Array<string | number>, tier?: Tier): Promise<CallAnswer> {
  const args: Record<string, unknown> = { path: [...path] }
  if (tier !== undefined) args['tier'] = tier
  return call(client, 'provident.data.read', args)
}
/** ONE `provident.data.write` at a caller-chosen tier. */
async function writeAt(client: Client, path: Array<string | number>, tier: Tier, value: unknown): Promise<CallAnswer> {
  return call(client, 'provident.data.write', { path: [...path], tier, value })
}

// ---- the profile file, as the store wrote it --------------------------------
/** **THE PROFILE FILE AS THE STORE WROTE IT** — read BY THIS PROCESS and never through the surface, because the
 *  `file` tier's truth is its bytes and a `mem`/`temp` address has no key here by construction (`D-84`). An `absent`
 *  or unparsable file is a stated reading, not a throw. */
interface ProfileRead { present: boolean; keys: string[]; top: Json | null; raw: string; reason: string }
function readProfile(profile: string): ProfileRead {
  const file = join(profile, PROFILE_FILE)
  if (!existsSync(file)) return { present: false, keys: [], top: null, raw: '', reason: 'the profile file is absent' }
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') {
    return { present: true, keys: [], top: null, raw, reason: 'zero-length: the construction created it and no address has landed' }
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    return { present: true, keys: [], top: null, raw, reason: `unparsable: ${error instanceof Error ? error.message : String(error)}` }
  }
  const object = asObject(parsed)
  if (object === null) return { present: true, keys: [], top: null, raw, reason: 'the file carries no object' }
  return { present: true, keys: Object.keys(object).sort(), top: object, raw, reason: '' }
}
/** **A BOUNDED SETTLE FOR THE FILE** — the same poll `npm run crossings` takes (`D-94`): a `file` write reaches its
 *  bytes at the instance's own flush, not at the caller's turn, so the wait IS the measurement. A poll that times out
 *  is PRINTED and then answered by the row's own assertion. */
const FILE_POLL_MAX = 24
const FILE_POLL_DELAY_MS = 125
async function settleProfile(profile: string, until: (read: ProfileRead) => boolean): Promise<{ read: ProfileRead; polls: number }> {
  let read = readProfile(profile)
  for (let polls = 1; polls <= FILE_POLL_MAX; polls += 1) {
    if (until(read)) return { read, polls }
    await sleep(FILE_POLL_DELAY_MS)
    read = readProfile(profile)
  }
  return { read, polls: FILE_POLL_MAX }
}

// ---- one boot ---------------------------------------------------------------
/** A transport over an ALREADY-SPAWNED child's stdio (newline-delimited JSON-RPC, the SDK's own framing) — the
 *  `scripts/electron-spawn.mjs` helper's shape, inlined because this battery imports no `scripts/` module. A child
 *  that dies is reported through `onclose`/`onerror`, never swallowed. */
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
 *  `--provident-user-data` is the app's own, and the store lands under the latter.
 *
 *  **A RENDERER WAIT IS `T-6`'s ALONE**: the seven other rows' subject is the surface main answers over stdio, which
 *  stands before the window does (the store is the boot's second act, the window its eleventh, `D-19`), so a wait for
 *  a rendered node would bind a fact those rows do not claim. `T-6` drives the preload's member INSIDE the renderer
 *  realm, so its boot asks for one and a `DISPLAY` is that row's prerequisite.
 *
 *  **THE BOOT WINDOW IS HELD UNDER THE HOST-WIDE LIVE-BOOT LOCK**: taken BEFORE the artifact set is ensured, and the build
 *  that ensures it runs in THIS process under that same lock — one claimant, so no builder can hold this boot behind a
 *  lock that same builder is queued for (`D-227`) — and released only once this boot's tree is proven gone, so no two
 *  spawning batteries' Electron trees contend (`D-94`, `D-74`). */
async function boot(profile: string, options: { renderer?: boolean } = {}): Promise<Boot> {
  const display = process.env['DISPLAY']
  if (typeof display !== 'string' || display === '') {
    throw new Error(
      'PREREQUISITE ERROR — no display server: DISPLAY is unset. This battery boots the REAL Electron bundle, so the ' +
        'renderer realm `T-6` drives cannot exist without one. Fix: `DISPLAY=:0 npx vitest run tests/e2e/tier-readout/`, ' +
        'or wrap the run in xvfb-run. This is a RED and never a skip (tests/e2e/secure-panels/panes-live.mjs:46).',
    )
  }
  const releaseBootLock = await acquireLiveBoot(`tier-readout boot on ${profile}`)
  /** **THE ARTIFACT SET IS ENSURED UNDER THE LOCK THIS BOOT ALREADY HOLDS** (`D-227`'s cure shape (2), with the measured
   *  livelock it removes stated in `ensureArtifacts`'s own note): present ⇒ a `stat` and no build at all; absent ⇒ THIS
   *  process builds it once, here — so no builder can be queued for this lock while this boot waits for that builder's
   *  output, because there is no second claimant. A build that fails throws with its reason and spawns nothing. */
  try {
    await ensureArtifacts()
  } catch (error) {
    // A tree that could not be prepared spawns nothing: the lock is released here, never left for the bound.
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
    // A spawn that threw created no child: the lock is released at once and never left to the bound.
    releaseBootLock()
    throw new Error(
      `this boot could not spawn ${electronBin}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
  if (child.pid !== undefined) livePids.push(child.pid)
  let trace = ''
  child.stderr?.on('data', (chunk: unknown) => {
    trace += String(chunk)
  })
  // What the child did when it died, kept beside the trace (`D-173`): `close` is the event that carries both facts.
  const seen = observed()
  child.on('close', (code, signal) => { seen.ended = { code, signal } })
  const transport = new ChildStdioTransport(child)
  const client = new Client({ name: 'tier-readout-e2e', version: '0.1.0' })
  // SET BEFORE `client.connect`, because the SDK's wrapper preserves the handler standing there and nothing else.
  transport.onerror = (error: Error) => { seen.error = error.message }
  try {
    await withBound(client.connect(transport), `initialize over stdio on ${profile}`, () => trace)
  } catch (error) {
    // A handshake that never settled still left a tree behind: it is reaped, PROVED gone, and only then is the lock
    // released — the order `D-74` fixes, kept on the failure path too. **AND THE THROW CARRIES WHAT THE CHILD DID**
    // (`D-173`): the exit code, the signal and the stderr tail, with the SDK's own error kept as the `cause`.
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
    reap([profile], [child.pid ?? 0])
    await sleep(300)
    releaseBootLock()
  }
  const booted: Boot = { client, profile, trace: () => trace, stop }
  if (options.renderer === true) {
    // A row whose renderer never answers has still spawned a tree: it is withdrawn here rather than left for a teardown
    // that will not run, because this boot is not yet in `boots` (`D-74`).
    try {
      await waitForRenderer(booted)
    } catch (error) {
      await stop()
      throw error
    }
  }
  return booted
}
/** **THE RENDERER READY, MEASURED AND NOT ASSUMED**: `T-6` drives a handler body in the page, and a dispatch before
 *  the renderer answers measures nothing. The app's own graph is asked for an authored node until it answers — a
 *  failed read is not a state, so this is a bounded wait (`D-127`). */
async function waitForRenderer(booted: Boot): Promise<void> {
  const started = Date.now()
  let last = '(no answer)'
  while (Date.now() - started < BOUND_MS) {
    const answer = await call(booted.client, 'provident.get_node_state', { target: { kind: 'cssId', cssId: 'tabs-landing-page' } })
    last = answer.text.slice(0, 320)
    if (answer.ok && asObject(answer.value) !== null) return
    if (LOAD_ERROR.test(booted.trace())) throw new Error(`the process published a failure instead of a renderer:\n${tail(booted.trace())}`)
    await sleep(200)
  }
  throw new Error(
    `the renderer never became addressable within the ${BOUND_MS} ms bound: provident.get_node_state answered ${last}; ` +
      `the trace stands:\n${tail(booted.trace())}`,
  )
}

// ---- the driver envelope (the measurement channel, D-94) --------------------
const OUT_ID = 'tr-out'
const DUMP_ID = 'tr-dump'
const SETTLE_READS_MAX = 20
const SETTLE_DELAY_MS = 250
/** ONE body per driven act. Every body frames its answer into ONE authored node (`TR!…!END_TR`, percent-encoded) so
 *  the observation comes back over the EXISTING `provident.get_rendered_html` and never as a new tool (D-18). The frame
 *  is STASHED, not written: a bridge call settles after this dispatch's render turn, so the write happens in
 *  `tr-dump`'s own synchronous turn — the crossing leg measured the alternative as an observation that never
 *  rendered. */
function actBody(label: string, act: string): string {
  return `function (ctx) {
  var frame = function (text) { window.__TR_FRAME = text }
  var ok = function (answer) { frame('act=${label};status=ok;answer=' + encodeURIComponent(JSON.stringify(answer === undefined ? null : answer))) }
  var no = function (e) { frame('act=${label};status=error;answer=' + encodeURIComponent(String(e && e.message ? e.message : e))) }
  var bridge = (typeof window !== 'undefined' && window.provident) ? window.provident : null
  var need = function (member) {
    if (bridge === null) throw new Error('no window.provident bridge in this realm')
    if (!bridge[member]) throw new Error('the bridge carries no ' + member + ' member')
    return bridge[member]
  }
  void ctx
  try {
    ${act}
  } catch (e) { no(e) }
}`
}
const DUMP_BODY = `function (ctx) {
  var out = null
  var all = ctx.tree.allNodes()
  for (var i = 0; i < all.length; i += 1) { var n = all[i]; if (n && n.props && n.props.id === '${OUT_ID}') out = n }
  if (!out) return
  var held = (typeof window !== 'undefined' && typeof window.__TR_FRAME === 'string') ? window.__TR_FRAME : 'act=none;status=none;answer=null'
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'TR!' + held + '!END_TR' }])
}`
/** `T-6`'s ONE act: the app's OWN `data.read` route inside the renderer realm, framing the surface's answer beside the
 *  route's own member set — so "the readout crossed the app's route" and "no sixth member was minted for the tier" are
 *  ONE observation (§4 `T-6`). */
const READ_ACT_ID = 'tr-read-tiers'
const READ_ACT_LABEL = 'read-tiers'
const READ_ACT = `var data = need('data')
    data.read({ path: ['${FILE_ROOT}'] }).then(function (answer) { ok({ answer: answer, members: Object.keys(data) }) }, no)`
function driverEnvelope(): unknown {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'tr-driver' },
        children: [
          {
            type: 'button',
            css: { id: READ_ACT_ID },
            props: { id: READ_ACT_ID },
            content: READ_ACT_LABEL,
            handlers: [{ name: READ_ACT_ID, event: 'click', body: actBody(READ_ACT_LABEL, READ_ACT) }],
          },
          {
            type: 'button',
            css: { id: DUMP_ID },
            props: { id: DUMP_ID },
            content: 'dump the stashed frame',
            handlers: [{ name: DUMP_ID, event: 'click', body: DUMP_BODY }],
          },
          { type: 'div', props: { id: OUT_ID }, content: '(no observation yet)' },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}
/** Issue ONE driven act and read its framed answer back, bounded: the act's bridge call settles later, so the frame is
 *  collected by a SECOND dispatch and the pair repeated while the frame is not this act's own. */
async function drive(client: Client, actId: string, label: string): Promise<{ polls: number; status: string; answer: unknown }> {
  await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: actId }, event: 'click' })
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    await sleep(SETTLE_DELAY_MS)
    await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: DUMP_ID }, event: 'click' })
    const rendered = await call(client, 'provident.get_rendered_html', {})
    const frame = /TR!([\s\S]*?)!END_TR/.exec(String(asObject(rendered.value)?.['renderedHtml'] ?? ''))
    if (frame === null) continue
    const fields: Record<string, string> = { act: '', status: '', answer: '' }
    for (const part of frame[1].split(';')) {
      const eq = part.indexOf('=')
      if (eq < 0) continue
      const key = part.slice(0, eq)
      if (Object.prototype.hasOwnProperty.call(fields, key)) fields[key] = decodeSafe(part.slice(eq + 1))
    }
    if (fields['act'] !== label) continue
    let parsed: unknown = fields['answer']
    try {
      parsed = JSON.parse(fields['answer'])
    } catch {
      /* a non-JSON answer stays a string */
    }
    return { polls, status: fields['status'], answer: parsed }
  }
  return { polls: SETTLE_READS_MAX, status: 'timeout', answer: null }
}
function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
/** Load the driver's envelope — the measurement channel — and settle it: a body is dispatched only once the envelope's
 *  own nodes resolve. */
async function loadDriver(booted: Boot): Promise<void> {
  await call(booted.client, 'provident.load', { kind: 'envelope', envelope: driverEnvelope() })
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    const targets = await call(booted.client, 'provident.list_targets', {})
    const ids = objectList(asObject(targets.value)?.['nodes']).flatMap((node) => [node['cssId'], node['propsId']]).filter((value) => typeof value === 'string')
    if (ids.includes(OUT_ID)) return
    await sleep(SETTLE_DELAY_MS)
  }
  throw new Error(`the driver's envelope did not settle: \`${OUT_ID}\` is not addressable within ${SETTLE_READS_MAX} reads`)
}

// ---- teardown ---------------------------------------------------------------
const boots: Boot[] = []
afterEach(async () => {
  for (const booted of boots.splice(0)) {
    try {
      await booted.stop()
    } catch {
      /* a stop that threw has still withdrawn this boot */
    }
  }
})
afterAll(() => {
  // THE INVARIANT, in this order and with nothing silent in it: reap every tree this file spawned, PROVE zero, and
  // only then remove the profiles — a directory removed under a live process leaves the survivor holding a file
  // nobody can find (`D-74`).
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort; the assert below is the guarantee */
    }
  }
  // The host-wide live-boot lock is released here whatever this file measured — before the survivors assert, because a
  // lock held past a throwing teardown would wedge the sibling spawning battery for its whole bound (`D-74`).
  for (const release of liveBootReleases.splice(0)) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  if (report.survivors.length > 0) {
    throw new Error(
      `tier-readout teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor means this ` +
        `run leaks a process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

// ---- the shared boot helper -------------------------------------------------
/** Every row gets its OWN scratch profile and its own boot(s) (§4's "one boot" / "two boots" column): a register
 *  shared between rows would let one row's write answer another's absence. */
async function withBoot(
  name: string,
  body: (booted: Boot, profile: string) => Promise<void>,
  options: { driver?: boolean } = {},
): Promise<void> {
  const profile = makeProfile(name)
  const booted = await boot(profile, { renderer: options.driver === true })
  boots.push(booted)
  if (options.driver === true) await loadDriver(booted)
  await body(booted, profile)
}

// ══════════════════════════════════════════════════════════════════════════════
// THE ROWS — one per matrix entry of `docs/L1/tier-readout.md` §4
// ══════════════════════════════════════════════════════════════════════════════
describe('tier-readout — `data.read` answers each node\'s own `_tier` (D-133, D-134)', () => {
  it('T-1 — the readout is a total function of node kind', async () => {
    await withBoot('tier-readout-t1', async (booted) => {
      const seeded = await writeAt(booted.client, [SHAPE], 'file', SHAPE_VALUE)
      expect(
        str(asObject(seeded.value)?.['status']),
        `T-1 PREREQUISITE — the driver seeds ['${SHAPE}'] at tier 'file' through the agent's own route, and the write must be ` +
          `COMMITTED (no crossing declares that root, so a refusal here is a harness fault). data.write answered: ${trunc(seeded.text, 300)}`,
      ).toBe('committed')

      // ── the object address: ONE node per member, INLINE, no `value` wrapper ─
      const whole = await readAt(booted.client, [SHAPE])
      expect(
        whole.value,
        `T-1 — the OBJECT address must answer kind:'branch' with the release's TieredNode: {_tier, …members} with every member ` +
          `INLINE and each itself a node — a leaf as {_tier, value:<literal>}, the dense array as {_tier, value:[<node>, …]} with ` +
          `each element its own node, the nested object as {_tier, …members}. A bare value, a 'value' wrapper on the object node, a ` +
          `double-wrapped leaf or a missing _tier reds here BY EQUALITY. Observed answer: ${trunc(whole.text)}`,
      ).toEqual({
        status: 'read',
        kind: 'branch',
        path: [SHAPE],
        value: {
          _tier: 'file',
          label: { _tier: 'file', value: 'shape' },
          count: { _tier: 'file', value: 3 },
          flag: { _tier: 'file', value: true },
          list: { _tier: 'file', value: [{ _tier: 'file', value: 'a' }, { _tier: 'file', value: 'b' }] },
          inner: { _tier: 'file', deep: { _tier: 'file', value: 'v' } },
        },
      })

      // ── the leaf address: `kind:'row'` and the literal, wrapped exactly once ──
      const leaf = await readAt(booted.client, [SHAPE, 'label'])
      expect(
        leaf.value,
        `T-1 — the LEAF address must answer kind:'row' with {_tier:'file', value:<the literal>} — the literal wrapped exactly ` +
          `once, and \`kind\` agreeing with the node the answer carries. Observed answer: ${trunc(leaf.text)}`,
      ).toEqual({ status: 'read', kind: 'row', path: [SHAPE, 'label'], value: { _tier: 'file', value: 'shape' } })
    })
  }, ROW_MS)

  it('T-2 — one call, nodes standing at different tiers', async () => {
    await withBoot('tier-readout-t2', async (booted) => {
      const fileWrite = await writeAt(booted.client, [FILE_ROOT], 'file', 'f')
      expect(
        str(asObject(fileWrite.value)?.['status']),
        `T-2 PREREQUISITE — data.write(['${FILE_ROOT}'], tier:'file') must answer committed; observed: ${trunc(fileWrite.text, 300)}`,
      ).toBe('committed')
      const memWrite = await writeAt(booted.client, [MEM_ROOT], 'mem', 'm')
      expect(
        str(asObject(memWrite.value)?.['status']),
        `T-2 PREREQUISITE — data.write(['${MEM_ROOT}'], tier:'mem') must answer committed; observed: ${trunc(memWrite.text, 300)}`,
      ).toBe('committed')

      // ── ONE read, NO tier member: the store's unqualified walk across every tier ─
      const whole = await readAt(booted.client, [])
      const answer = asObject(whole.value)
      expect(str(answer?.['status']), `T-2 — the register read must answer status:'read'; observed: ${trunc(whole.text)}`).toBe('read')
      expect(
        str(answer?.['kind']),
        `T-2 — the register at [] is a BRANCH, so kind must answer 'branch'; observed: ${trunc(whole.text)}`,
      ).toBe('branch')
      expect(answer?.['path'], `T-2 — the answer names the address it was asked for, the empty register []; observed: ${trunc(whole.text)}`).toEqual([])
      const register = answer?.['value']
      expect(
        asObject(register) !== null,
        `T-2 — the register node must be an OBJECT NODE, never a primitive and never a bare array; observed: ${trunc(whole.text)}`,
      ).toBe(true)

      // ── two members, two tiers, in the SAME answer ─────────────────────────────
      expect(
        memberOf(register, FILE_ROOT),
        `T-2 — the register's '${FILE_ROOT}' member must answer the LEAF NODE {_tier:'file', value:'f'} — the tier the write ` +
          `named. Observed answer: ${trunc(whole.text)}`,
      ).toEqual({ _tier: 'file', value: 'f' })
      expect(
        memberOf(register, MEM_ROOT),
        `T-2 — the register's '${MEM_ROOT}' member must answer {_tier:'mem', value:'m'} IN THE SAME ANSWER: one read can return ` +
          `nodes standing at different tiers, which is why the readout is per node and not per call. Observed answer: ${trunc(whole.text)}`,
      ).toEqual({ _tier: 'mem', value: 'm' })

      // ── the register's OWN tier: one token of the domain, and NOT pinned ───────
      const registerTier = str(memberOf(register, '_tier'))
      expect(
        registerTier ?? '(no _tier member)',
        `T-2 — the register node itself must carry ONE _tier in the three-token domain ('file'|'mem'|'temp') — never an array, ` +
          `never a set, and never absent. It is a member of the SET that is asserted and not a pinned token, because which ` +
          `persistence the register's own node names is the store's reading and not this row's claim. Observed answer: ${trunc(whole.text)}`,
      ).toMatch(/^(file|mem|temp)$/)
    })
  }, ROW_MS)

  it('T-3 — what the arms that gain nothing gain nothing', async () => {
    await withBoot('tier-readout-t3', async (booted) => {
      const seeded = await writeAt(booted.client, [FILE_ROOT], 'file', 'x')
      expect(
        str(asObject(seeded.value)?.['status']),
        `T-3 PREREQUISITE — data.write(['${FILE_ROOT}'], tier:'file', 'x') must answer committed; observed: ${trunc(seeded.text, 300)}`,
      ).toBe('committed')

      // ── (a) the narrowed PASSING arm: the readout lives IN THE NODE ──────────
      const narrowed = await readAt(booted.client, [FILE_ROOT], 'file')
      expect(
        keysOf(narrowed.value),
        `T-3(a) — a narrowed read's answer carries EXACTLY ['kind','path','status','value']: the readout is the node's, so no ` +
          `'tier' member (the superseded per-call echo) and no '_tier' on the ARM may appear. Observed answer: ${trunc(narrowed.text)}`,
      ).toEqual(['kind', 'path', 'status', 'value'])
      expect(
        memberOf(narrowed.value, 'value'),
        `T-3(a) — the narrowed read's node must answer {_tier:'file', value:'x'}: the tier the caller named is the tier the ` +
          `store answered. Observed answer: ${trunc(narrowed.text)}`,
      ).toEqual({ _tier: 'file', value: 'x' })

      // ── (b) the same address at another tier: an ABSENCE, and nothing more ───
      const other = await readAt(booted.client, [FILE_ROOT], 'mem')
      expect(
        other.value,
        `T-3(b) — the same address read at tier:'mem' holds nothing, so the answer is the ABSENT arm and nothing else: ` +
          `{status:'absent', path:['${FILE_ROOT}']} — no node, no 'tier' echo. Observed answer: ${trunc(other.text)}`,
      ).toEqual({ status: 'absent', path: [FILE_ROOT] })
      expect(
        keysOf(other.value),
        `T-3(b) — the absent arm's member set is exactly ['path','status']: an absence states a fact about the caller's own ` +
          `argument and names no node, so a 'tier' there would be the superseded echo. Observed answer: ${trunc(other.text)}`,
      ).toEqual(['path', 'status'])

      // ── (c) a refusal that never reached a store names no node either ────────
      const volatile = await readAt(booted.client, ['mem.probe'])
      const ledger = volatile.value
      expect(
        str(asObject(ledger)?.['status']),
        `T-3(c) — ['mem.probe'] is a volatile SPELLING, refused before any store; the answer must be the closed ledger ` +
          `{status:'refused', …}. Observed answer: ${trunc(volatile.text)}`,
      ).toBe('refused')
      expect(
        str(asObject(ledger)?.['reason']),
        `T-3(c) — the refusal's reason is the spelling's own word, 'volatile-path'. Observed answer: ${trunc(volatile.text)}`,
      ).toBe('volatile-path')
      expect(
        owns(ledger, 'tier') || owns(ledger, '_tier'),
        `T-3(c) — the refusal ledger carries NEITHER 'tier' NOR '_tier' as an own member: a refusal that never reached a ` +
          `store has no node to name and no tier to claim. Observed answer: ${trunc(volatile.text)}`,
      ).toBe(false)
    })
  }, ROW_MS)

  it('T-4 — `temp` is reachable through the agent\'s route and the readout follows the winning version', async () => {
    await withBoot('tier-readout-t4', async (booted) => {
      // ── the first version: at `temp`, the tier row 5's pane drag will write ────
      const tempWrite = await writeAt(booted.client, [TEMP_ROOT], 'temp', 't')
      expect(
        str(asObject(tempWrite.value)?.['status']),
        `T-4 PREREQUISITE — data.write(['${TEMP_ROOT}'], tier:'temp', 't') must answer committed: a \`temp\` write is reachable ` +
          `through the agent's own route, and this is the tier row 5's pane drag will write. Observed: ${trunc(tempWrite.text, 300)}`,
      ).toBe('committed')
      const first = await readAt(booted.client, [TEMP_ROOT])
      expect(
        memberOf(first.value, 'value'),
        `T-4 — the FIRST read answers the node the \`temp\` write landed: {_tier:'temp', value:'t'} — this is the question row ` +
          `5's ghost will ask the DELIVERY ("is this pane's reading at temp?"), reached here through the agent's own route. ` +
          `Observed answer: ${trunc(first.text)}`,
      ).toEqual({ _tier: 'temp', value: 't' })

      // ── the shadowing write: a `mem` version at the SAME address ──────────────
      const memWrite = await writeAt(booted.client, [TEMP_ROOT], 'mem', 'm2')
      expect(
        str(asObject(memWrite.value)?.['status']),
        `T-4 PREREQUISITE — the second write at the SAME address ['${TEMP_ROOT}'] at tier:'mem' must answer committed; ` +
          `observed: ${trunc(memWrite.text, 300)}`,
      ).toBe('committed')
      const second = await readAt(booted.client, [TEMP_ROOT])
      expect(
        memberOf(second.value, 'value'),
        `T-4 — the SECOND read must follow the version that WON: a \`mem\` write shadows the \`temp\` one at the same address, so ` +
          `the readout answers {_tier:'mem', value:'m2'} and names which tier won. That is the readout the pane drag will read ` +
          `(strata/next-steps.md row 5) — it is reached here through the agent's own route, which is row 6's half of the answer. ` +
          `Observed answer: ${trunc(second.text)}`,
      ).toEqual({ _tier: 'mem', value: 'm2' })
    })
  }, ROW_MS)

  it('T-5 — the readout is true about durability', async () => {
    const profile = makeProfile('tier-readout-t5')
    const first = await boot(profile)
    boots.push(first)

    // ── boot one: one address per tier, and each read names its own ────────────
    const seeded: Array<{ root: string; tier: Tier; literal: string }> = [
      { root: FILE_ROOT, tier: 'file', literal: 'f' },
      { root: MEM_ROOT, tier: 'mem', literal: 'm' },
      { root: TEMP_ROOT, tier: 'temp', literal: 't' },
    ]
    for (const entry of seeded) {
      const wrote = await writeAt(first.client, [entry.root], entry.tier, entry.literal)
      expect(
        str(asObject(wrote.value)?.['status']),
        `T-5 PREREQUISITE — data.write(['${entry.root}'], tier:'${entry.tier}') must answer committed; observed: ${trunc(wrote.text, 300)}`,
      ).toBe('committed')
      const read = await readAt(first.client, [entry.root])
      expect(
        memberOf(read.value, 'value'),
        `T-5 — boot one's read at ['${entry.root}'] must answer the node the '${entry.tier}' write landed: ` +
          `{_tier:'${entry.tier}', value:'${entry.literal}'}. Observed answer: ${trunc(read.text)}`,
      ).toEqual({ _tier: entry.tier, value: entry.literal })
    }

    // ── the stop, then the BYTES: this process reads the app's own profile file ─
    await first.stop()
    const settled = await settleProfile(profile, (read) => read.keys.includes(FILE_ROOT))
    expect(
      settled.read.keys,
      `T-5 — the file \`${PROFILE_FILE}\` carries the \`file\` tier's address: ['${FILE_ROOT}'] is declared at \`file\`, so the same ` +
        `bytes reach the disk (read after ${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}").`,
    ).toContain(FILE_ROOT)
    expect(
      settled.read.keys.includes(MEM_ROOT),
      `T-5 — and the file carries NO key for the volatile '${MEM_ROOT}' address: a \`mem\` value can never come from a file ` +
        `(D-84). keys=[${settled.read.keys.join(', ')}]; raw=${trunc(settled.read.raw, 500)}`,
    ).toBe(false)
    expect(
      settled.read.keys.includes(TEMP_ROOT),
      `T-5 — nor for the volatile '${TEMP_ROOT}' address. keys=[${settled.read.keys.join(', ')}]; raw=${trunc(settled.read.raw, 500)}`,
    ).toBe(false)
    expect(
      settled.read.raw.includes('_tier'),
      `T-5 — AND NO '_tier' APPEARS IN THE FILE'S BYTES: the readout is the READ's compilation and must not round-trip into ` +
        `the store. A '_tier' here means the minted field was written back. raw=${trunc(settled.read.raw, 600)}`,
    ).toBe(false)

    // ── boot two: a SECOND PROCESS on the same profile ────────────────────────
    const second = await boot(profile)
    boots.push(second)
    const survived = await readAt(second.client, [FILE_ROOT])
    expect(
      memberOf(survived.value, 'value'),
      `T-5 — A SECOND PROCESS on the same profile answers the \`file\` address at {_tier:'file', value:'f'} with the value ` +
        `INTACT: that is what the readout being true about durability means. Observed answer: ${trunc(survived.text)}`,
    ).toEqual({ _tier: 'file', value: 'f' })
    for (const gone of [MEM_ROOT, TEMP_ROOT]) {
      const absent = await readAt(second.client, [gone])
      expect(
        absent.value,
        `T-5 — boot two answers ABSENT at the volatile address ['${gone}'] — a readout that named 'mem' or 'temp' here would ` +
          `be the readout LYING about durability. Observed answer: ${trunc(absent.text)}`,
      ).toEqual({ status: 'absent', path: [gone] })
    }
  }, ROW_MS)

  it('T-6 — the readout crosses the app\'s own route and mints no member', async () => {
    await withBoot('tier-readout-t6', async (booted) => {
      const seeded = await writeAt(booted.client, [FILE_ROOT], 'file', 'x')
      expect(
        str(asObject(seeded.value)?.['status']),
        `T-6 PREREQUISITE — the driver seeds ['${FILE_ROOT}'] at tier:'file' through the agent's own route before the act; ` +
          `data.write answered: ${trunc(seeded.text, 300)}`,
      ).toBe('committed')

      const driven = await drive(booted.client, READ_ACT_ID, READ_ACT_LABEL)
      expect(
        driven.status,
        `T-6 PREREQUISITE — the driven act must FRAME an answer: a status of '${driven.status}' after ${driven.polls} poll(s) means ` +
          `the handler body never reported, so this row measured nothing. Framed answer: ${textOf(driven.answer)}; trace:\n${tail(booted.trace())}`,
      ).toBe('ok')
      const framed = asObject(driven.answer)
      const routed = memberOf(framed, 'answer')
      expect(
        memberOf(routed, 'value'),
        `T-6 — the answer the app's OWN route (\`window.provident.data.read\`) returned inside the renderer realm must carry the ` +
          `tiered node {_tier:'file', value:'x'}: the composition is main's, but the readout must cross the preload and the IPC ` +
          `hop unwrapped. Framed answer: ${textOf(driven.answer)}`,
      ).toEqual({ _tier: 'file', value: 'x' })
      expect(
        arr(memberOf(framed, 'members')).map(String).sort(),
        `T-6 — and the route's own member set is the five D-112 landed — ['delete','journal','list','read','write'] — with NO ` +
          `sixth member minted for the tier: the tier is the DELIVERY's, so no client member is invented for it. ` +
          `Framed answer: ${textOf(driven.answer)}`,
      ).toEqual(['delete', 'journal', 'list', 'read', 'write'])
    }, { driver: true })
  }, ROW_MS)

  it('T-7 — the lossy name, both halves', async () => {
    await withBoot('tier-readout-t7', async (booted, profile) => {
      // ── the write: a caller storing the minted field's own name ──────────────
      const stored = await writeAt(booted.client, [LOSSY], 'file', LOSSY_VALUE)
      expect(
        str(asObject(stored.value)?.['status']),
        `T-7 PREREQUISITE — data.write(['${LOSSY}'], tier:'file', {_tier:'${LOSSY_STORED_TOKEN}', label:'kept'}) must answer ` +
          `committed: the declared consequence is a SHADOWED name and never a refused write. Observed: ${trunc(stored.text, 300)}`,
      ).toBe('committed')

      // ── half one: the minted field WINS, the sibling is delivered untouched ──
      const read = await readAt(booted.client, [LOSSY])
      const node = memberOf(read.value, 'value')
      expect(
        memberOf(node, '_tier'),
        `T-7 — the answer's node must read _tier:'file' — the MINTED field wins over the stored one. A readout answering ` +
          `'${LOSSY_STORED_TOKEN}' here is the minted field LOSING. Observed answer: ${trunc(read.text)}`,
      ).toBe('file')
      expect(
        memberOf(node, '_tier') === LOSSY_STORED_TOKEN,
        `T-7 — and the answer never repeats the caller's stored token: '${LOSSY_STORED_TOKEN}' !== value._tier. Observed ` +
          `answer: ${trunc(read.text)}`,
      ).toBe(false)
      expect(
        memberOf(node, 'label'),
        `T-7 — the SIBLING member is delivered untouched: \`label\` answers its own leaf node {_tier:'file', value:'kept'}. ` +
          `Observed answer: ${trunc(read.text)}`,
      ).toEqual({ _tier: 'file', value: 'kept' })
      expect(
        keysOf(node),
        `T-7 — the node's member set is exactly ['_tier','label']: the stored '_tier' is NOT delivered — it is shadowed by ` +
          `the minted field and not carried twice. Observed answer: ${trunc(read.text)}`,
      ).toEqual(['_tier', 'label'])

      // ── half two: nothing was destroyed — the truth stands in the store ──────
      const settled = await settleProfile(profile, (held) => held.raw.includes(LOSSY_STORED_TOKEN))
      expect(
        settled.read.raw.includes(LOSSY_STORED_TOKEN),
        `T-7 — AND THE STORE STILL CARRIES IT: the profile file's bytes must contain '${LOSSY_STORED_TOKEN}' (read after ` +
          `${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}"). Nothing was ` +
          `destroyed — the truth stands in the store and only this verb shadows it. raw=${trunc(settled.read.raw, 500)}`,
      ).toBe(true)
    })
  }, ROW_MS)

  it('T-8 — the app\'s own families answer the tiers they are declared at', async () => {
    await withBoot('tier-readout-t8', async (booted) => {
      // **THE ROW WRITES NOTHING**: both families stand because the boot's own declarations mint them at their own tiers
      // (`tabs-must-stand` at `file`, `zones-must-stand` at `mem`), so a write here would be this row standing its own
      // subject — and the claim is that ONE PROCESS answers two different tiers from two reads (D-63, D-87, D-91).
      const tabs = await readAt(booted.client, [TABS])
      expect(
        str(asObject(tabs.value)?.['status']),
        `T-8 — ['${TABS}'] must answer status:'read' from the boot's own store with no write by this row; a 'refused' or ` +
          `'absent' arm here is a PREREQUISITE failure (the tab record's creation repair did not fire), not the readout's ` +
          `absence. Observed answer: ${trunc(tabs.text)}`,
      ).toBe('read')
      const tabsTier = str(memberOf(memberOf(tabs.value, 'value'), '_tier'))
      expect(
        tabsTier ?? '(no _tier member)',
        `T-8 — ['${TABS}'] must answer the tier its OWN DECLARATION writes at, 'file': the tab record is a durable family. A ` +
          `missing _tier is the absence this row names — the node T-1 pins, gone. Observed answer: ${trunc(tabs.text)}`,
      ).toBe('file')

      const zones = await readAt(booted.client, [ZONES])
      expect(
        str(asObject(zones.value)?.['status']),
        `T-8 — ['${ZONES}'] must answer status:'read' from the boot's own store with no write by this row; 'refused' or ` +
          `'absent' here is a PREREQUISITE failure (the zone family's creation repair did not fire). Observed answer: ${trunc(zones.text)}`,
      ).toBe('read')
      const zonesTier = str(memberOf(memberOf(zones.value, 'value'), '_tier'))
      expect(
        zonesTier ?? '(no _tier member)',
        `T-8 — ['${ZONES}'] must answer the tier its OWN DECLARATION writes at, 'mem': the zone family is re-minted at every ` +
          `boot and the profile's bytes never carry it. Observed answer: ${trunc(zones.text)}`,
      ).toBe('mem')

      // ── the two, in ONE process, from TWO reads ───────────────────────────────
      expect(
        tabsTier === zonesTier,
        `T-8 — THE TWO FAMILIES' TIERS DIFFER: one process answered two different tiers from two reads — ['${TABS}'] at ` +
          `'${String(tabsTier)}' and ['${ZONES}'] at '${String(zonesTier)}' — so the readout is not one tier repeated and a ` +
          `caller needs no second read to learn a family's tier. tabs: ${trunc(tabs.text, 260)}; zones: ${trunc(zones.text, 260)}`,
      ).toBe(false)
    })
  }, ROW_MS)
})
