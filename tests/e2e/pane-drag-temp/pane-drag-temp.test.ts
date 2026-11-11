// tests/e2e/pane-drag-temp/pane-drag-temp.test.ts — THE L1 BATTERY for `pane-drag-temp`: the six e2e rows of
// `docs/L1/pane-drag-temp.md` §4 (`P-1`..`P-6`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR (`strata/next-steps.md` row `5`, the last actionable row in the queue, D-144). The pane
// drag's in-process reading becomes an ADDRESSABLE FACT AT A TIER THAT PERSISTS NOWHERE: one family at `['drag']` at
// `temp`, keyed by pane id, `{ [paneId]: { height } }` — the ADJUSTABLE axis's own member, `height` for the stage-resident
// `pane-a`, which carries no `zone` (D-186, D-189) (ASM-1); two new routes on the app's `view` bridge member —
// `commitDrag(paneId, { height })` and `clearDrag()` (ASM-4); `clearDrag()` ENDS the reading with a tier-scoped delete, so a
// later read at the address is `absent` (ASM-2); the declared-root guard refuses a `file` or `mem` shadow of the family
// with reason `declared-tier` (D-101, D-132); `createViewRecord.subscribe`'s address array gains `['drag']`, so a `temp`
// write ANYONE makes fires `window.provident.view.onChanged` (R-2, D-137); and the renderer paints a declared transient
// declaration — the ghost, spelled `data-ghost="temp"` — on the pane element while the reading names the pane at that tier
// (ASM-3, D-117, D-144).
//
// **ALL SIX ROWS ARE RED AT THIS HEAD UNTIL L4 LANDS**, and each red is the ABSENCE IT NAMES and never a harness failure:
// `P-1`, `P-2` and `P-6` red because the bridge carries no such route — `P-6` because its `temp` reading is seeded through
// that same route and never by an agent's write — `P-3` because the subscription array lacks the address,
// `P-4` because the delivery never reached the ghost turn, `P-5` because the declared-root entry is missing and a `file`
// write at the `temp` root COMMITS. The `P-x`'s own bodies census the bridge member they need BEFORE calling it, so an
// absent route is a framed reading and not a thrown TypeError — that is what keeps a row's red its subject (D-27, D-40).
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): every row spawns the bundle `npm run build`
// produces, on ITS OWN scratch profile, handshakes the MCP client over its stdio transport, and drives
//   · the agent's own acts — `provident.data.read` / `.write` / `.delete` over stdio;
//   · **the app's own bridge members driven INSIDE its renderer realm** — `window.provident.view.commitDrag`,
//     `clearDrag`, `commitPane` and `onChanged` — and read back through the EXISTING `provident.dispatch` +
//     `provident.get_rendered_html` measurement channel `tests/e2e/focus-retirement/` and
//     `tests/e2e/store-crossings/crossings-live.mjs` established (`D-94`), framed as `PD!…!END_PD`;
//   · **the app's OWN profile file** `<profile>/provident-profile.json`, read BY THIS PROCESS, because a tier that
//     persists nowhere is measured by the ABSENCE of its key from those bytes and by nothing else (`D-84`);
//   · **a SECOND PROCESS on the same profile**, which is what tells `temp` from `file` after a restart (`P-6`).
// NO ROW IMPORTS `src/**` OR `scripts/**`: the internals these rows would name are exactly the ones this design moves,
// and `npm run typecheck:tests` types the `tests/**` tree alone (`tsconfig.tests.json`). NO ROW IS SKIPPED OR SOFTENED,
// and this file carries no marker of any kind: a `tests/e2e/**` file always gates (D-30, D-40).
//
// **A REAL POINTER GESTURE IS NOT THIS BATTERY'S** (§4's own clause, D-37): a vitest row cannot synthesise one on the
// app's own page, so every row drives the TURNS the gesture makes — `commitDrag` once per observed move, `commitPane` at
// the release, `clearDrag` at the end — and the real gesture stays the `npm run panes` Electron leg's.
//
// WHAT THE ROWS DO NOT MEASURE, STATED BECAUSE AN ABSENT ROW IS OTHERWISE INDISTINGUISHABLE FROM A FORGOTTEN ONE:
//   · the sink's single-write discipline and the at-most-one-erase rule are `pane-drag-compliance`'s (`SINK-1`, `R-4`,
//     `M-5`, `M-6`, `F-4`, `M-10`), which §4 excludes from this battery by name;
//   · the record's two routes' own rows, the surface's arms, the client's two methods, the lockstep pair and
//     `central-data`'s roots census are those modules' L2/L3 passes (§7 `E-5`, `E-6`);
//   · `P-1`, `P-2`, `P-3` and `P-6`'s first boot load a driver envelope, which REPLACES the app's own graph for that boot:
//     those rows are the preload's own members driven in their realm and claim nothing about a rendered node of the app's
//     page. The ghost is `P-4`'s and `P-4` boots the app's OWN page and loads no driver, because the ghost is the app's
//     rendering.
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON. A boot that publishes a load error is reported AT ONCE with
// that error, never as a timeout; a file read that never settles prints the poll it reached and lets its own assertion
// answer; a render that has not yet happened is polled inside a stated bound rather than assumed (a delivery is not the
// caller's turn); and `afterAll` SIGKILLs every process tree this file spawned, PROVES zero survivors and only then
// removes the profiles (`D-74`).
//
// **THE LIVE BOOTS ARE SERIALISED HOST-WIDE**: two spawning batteries already stand (`tests/e2e/tier-readout/` and
// `tests/e2e/focus-retirement/`), and this is the third, so every boot here holds the SAME lock from spawn to
// proved-zero teardown — a third must not contend with them (`D-94`, `D-74`, `D-43`). **AND THE TREE IS PREPARED UNDER
// THAT SAME LOCK**: the whole artifact set `npm run build` produces is ENSURED, not waited for — absent, this process
// builds it once, itself, as the one claimant, because a booter that waited for a builder queued behind its own lock
// livelocks (`D-227`).
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
/** The landed argument vector minus its profile members (`scripts/electron-spawn.mjs`'s `baseArgs`, `D-94`): the built
 *  bundle, the stdio transport, and the six flags a headless host needs. */
const BASE_ARGS = ['--mcp-transport=stdio', '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer',
  '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage']
/** The bound every wait is held to. Generous for the reason the sibling spawning batteries state: a full `npm test` runs
 *  many workers, and a boot delayed by work this row does not control is not a defect. */
const BOUND_MS = 60_000
/** The row's own bound above the waits it contains: `P-6` boots TWO processes on one profile. */
const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/

/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the store's one written name stands at
 *  `<profile>/provident-profile.json` (`src/main/data/store.ts`'s `PROFILE_FILE_NAME`, reached through the boot's one
 *  store), and this battery's grain is the built artifact, so the name is a literal and never an import (D-27). */
const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful way
 *  to supply this run's grant, since no bridge route can widen it (`D-85`, `D-94`'s seeded profile). `data` is among the
 *  groups because every row reaches `['drag']` through `provident.data.*`, and `read`/`dispatch`/`graph`/`code` carry the
 *  measurement channel's own tools (`provident.load`, `provident.dispatch`, `provident.get_node_state`,
 *  `provident.list_targets`, `provident.get_rendered_html`). */
const SECURITY_SEED = 'provident-security.json'
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'data']

/** **THE ADDRESS THIS UNIT ADDS, SPELLED AS A LITERAL BECAUSE NO ROW MAY IMPORT THE CONSTANT** (`D-27`, `D-132`): the
 *  drag's in-process family, keyed by pane id, at the tier that persists nowhere. */
const DRAG = 'drag'
/** The app's own committed pane family — the `file` half every `P-1`..`P-6` arm compares against, and the family `P-4`
 *  asks for the pane id the ghost's question is about (`D-87`, `D-132`). */
const PANES = 'panes'
/** The tier the ghost is spelled for, as the design's ASM-3 fixes it: `data-ghost="temp"`. */
const GHOST_TOKEN = 'temp'
/** A pane id the boot's `['panes']` record does NOT name: `P-4`'s third arm writes a `temp` reading naming this one and
 *  requires the ghost NOT to appear, because the design's own failure-mode column says a declaration that appears "from
 *  a write naming another pane" is a defect (§4 `P-4`). */
const OTHER_PANE = 'pane-ghost-probe'

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

/** The observed answer as a bounded string: every assertion message carries one, so a reader can tell a missing route
 *  from a missing `_tier` from a prerequisite failure without re-running the row. */
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
const num = (value: unknown): number | null => (typeof value === 'number' && Number.isFinite(value) ? value : null)
const arr = (value: unknown): unknown[] => (Array.isArray(value) ? (value as unknown[]) : [])
const objectList = (value: unknown): Json[] => arr(value).map(asObject).filter((entry): entry is Json => entry !== null)
/** ONE MEMBER of a plain object, `undefined` where the value is no object or carries none — so a missing member is a
 *  failed EQUALITY against the expected node and never a throw. */
const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}
const owns = (value: unknown, key: string): boolean => {
  const held = asObject(value)
  return held !== null && Object.prototype.hasOwnProperty.call(held, key)
}

/** **ONE NODE OF A `data.read` ANSWER PROJECTED BACK TO THE STORE'S OWN VALUE** (`D-134`): a passing answer carries
 *  `{status, kind, path, value}` whose `value` is the release's `TieredNode` — an OBJECT node is `{_tier, …members}` with
 *  its members INLINE and no `value` wrapper, an ARRAY node is `{_tier, value:[<node>, …]}` and a LEAF is
 *  `{_tier, value:<literal>}`. `P-1` and `P-2` assert the `_tier` ON THE NODE (that is their subject); every other reader
 *  below wants the family's SHAPE — the members the record holds — so the node is projected ONCE here and the rows keep
 *  reading the value itself. The readout's own shape is pinned where it belongs, by `tests/e2e/tier-readout/`'s rows.
 *  A value that is no node at all — the profile file's own bytes — is handed back exactly as it stands. */
function plainOf(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(plainOf)
  const object = asObject(node)
  if (object === null || typeof object['_tier'] !== 'string') return node
  const keys = Object.keys(object)
  if (keys.length === 2 && keys.includes('value')) {
    const held = object['value']
    return Array.isArray(held) ? held.map(plainOf) : plainOf(held)
  }
  const plain: Json = {}
  for (const [key, member] of Object.entries(object)) if (key !== '_tier') plain[key] = plainOf(member)
  return plain
}
/** **THE ADJUSTABLE MEMBER ONE PANE CARRIES — THE MEMBER'S OWN NAME IS THE AXIS** (`D-189`, `D-191`): the record is
 *  `{ id, width, height, bounds?, zone? }` with **BOTH figures required**, and `zone` — which `pane-a` does NOT carry, the
 *  absence `D-186` reads as the STAGE — selects WHICH of the two a gesture may move. A stage pane is sidebar-equivalent
 *  (`C-12`), so **the adjustable member is `height`**, and **on BOTH tiers** — `['panes']` at `file` and `['drag']` at
 *  `temp` — each family's member now carries the axis-named member, so this is the one figure the two tiers are compared
 *  on. It is NEVER the `size` the split retired, and no reader here re-interprets one standing number. */
const paneHeight = (node: unknown, id: string): number | null =>
  num(memberOf(asObject(memberOf(plainOf(node), id)), 'height'))

// ---- the process table and the teardown (D-74) ------------------------------
interface Proc { pid: number; ppid: number; args: string }
/** How many kill-and-recheck sweeps a teardown gets: a swept tree can be replaced mid-sweep (a zygote forks a renderer),
 *  so one pass is a snapshot. Bounded, because an unbounded loop on a teardown path is a wedged harness. */
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
/** Every process belonging to a boot on one of these profiles: the ones naming a scratch profile and every DESCENDANT of
 *  those — the zygotes carry `--no-sandbox` and nothing else and are reachable only that way (`D-74`). */
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
/** **THE LIVE BOOTS ARE SERIALISED, AND THIS MATRIX SAYS SO** (`D-1`, `D-43`; §4 of `docs/L1/pane-drag-temp.md`). THREE
 *  batteries of this kind now stand — `tests/e2e/tier-readout/`, `tests/e2e/focus-retirement/` and this one — and
 *  `npm test` runs the suite's files in parallel workers, so three Electron trees on one host would red each other's
 *  rows. The contention is the MACHINE's — never a port and never a profile, because every boot here already carries its
 *  own `mkdtemp` profile and its own stdio pipe — so the rule is kept as ONE LOCK around the boot window, with the SAME
 *  derivation the two sibling files use (so all three contend on one path and not on three). **No row is skipped,
 *  softened or re-bounded for it**: a row that waits for the lock measures exactly what it measured with the machine to
 *  itself (`D-30`, `D-40`). */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
/** How long an UNOWNED lock directory is left alone before it is read as a holder that died between its `mkdir` and its
 *  own owner write: that window is microseconds wide, and sweeping it early would seat two boots at once. */
const BOOT_LOCK_SETTLE_MS = 2_000
/** **The wait is BOUNDED, because a harness that waits forever measures nothing.** One peer's boot is the whole of a
 *  wait — three files in the suite spawn — and a boot's own worst case is its row's bound plus its teardown. */
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
/** The net for a teardown that never runs: a rejected hook, a killed worker or an interrupted run leaves the tree alive
 *  otherwise. A SIGKILLed worker gets no net at all, and that limit is stated rather than hidden (`D-74`). */
process.on('exit', () => {
  reap(scratchProfiles, livePids)
  // The lock is released only AFTER the tree is proven gone, and a net that never releases it would wedge the sibling
  // spawning batteries for the bound (`D-94`'s teardown order, `D-74`).
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
/** A bound on a promise, so no row can hang on a transport's own timeout. A process that publishes a load error rejects
 *  it AT ONCE with that error, so a red row names its reason instead of spending the bound. */
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
 *  the main bundle was back and the renderer was not — MEASURED on a sibling spawning battery: a boot answered
 *  `ERR_FILE_NOT_FOUND` on `dist/renderer/index.html` instead of measuring its row. Every member below is a file this
 *  boot's ELECTRON LOAD reads (`npm run build`'s `outfile`/`outdir`/`cp` arms) — the main bundle, its preload, and the
 *  renderer's bundle and page — and an absent member is a named prerequisite failure and never a silent one
 *  (D-27, `strata/brief.md` §6). */
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
/** The store's three persistence tokens — the `tier` ARGUMENT's domain (`TierSet`), and the only place a SET could
 *  appear; no row below asserts one as a reading (`D-134`). */
const TIER_TOKENS = ['file', 'mem', 'temp'] as const
type Tier = (typeof TIER_TOKENS)[number]
/** ONE `provident.data.read` at one address and (where the row names one) one tier: the WHOLE surface answer is returned —
 *  `{status, kind, path, value}`, an `absent` arm or the closed ledger — because the rows assert the answer's own members
 *  and never a member of it. `text` is the transport's bytes, carried into every message so a red names what was seen. */
async function readAt(client: Client, path: string[], tier?: Tier): Promise<CallAnswer> {
  const args: Record<string, unknown> = { path: [...path] }
  if (tier !== undefined) args['tier'] = tier
  return call(client, 'provident.data.read', args)
}
/** ONE `provident.data.write` at a caller-chosen tier. */
async function writeAt(client: Client, path: string[], tier: Tier, value: unknown): Promise<CallAnswer> {
  return call(client, 'provident.data.write', { path: [...path], tier, value })
}
/** ONE `provident.data.delete` at a caller-chosen tier. **THE SURFACE'S `delete` NAMES ONE ROW AND NEVER A BRANCH** (`D-12`,
 *  `D-53`): it asks `readLiteral` at the address AT THAT TIER before it acts, so a BRANCH address — the family root
 *  `['drag']` and equally the member record `['drag', <pane>]` — is answered by the EMPTY RECEIPT
 *  `{status:'committed', removed:false, tiers:[]}`, which removes NOTHING and mints no cursor (`docs/L3/central-data/design.md`
 *  §3; `ASM-L2-6`). A caller that means to END a family's reading must therefore name the LEAF that stands — which is why
 *  `P-4` deletes `['drag', <pane>, 'height']` and never the root it was painted from. */
async function deleteAt(client: Client, path: string[], tier: Tier): Promise<CallAnswer> {
  return call(client, 'provident.data.delete', { path: [...path], tier })
}

// ---- the app's own rendered surface -----------------------------------------
/** **THE RENDERED HTML, AS THE APP'S OWN SURFACE ANSWERS IT** (`D-94`'s measurement channel, read-only half). A very large
 *  answer is answered as a census + digest + truncated preview by the server's own guard, so an answer with no
 *  `renderedHtml` member is REPORTED (`truncated`) rather than silently read as an empty page. */
interface HtmlReading { html: string; truncated: boolean }
async function renderedHtml(client: Client): Promise<HtmlReading> {
  const answer = await call(client, 'provident.get_rendered_html', {})
  const value = asObject(answer.value)
  const rendered = typeof value?.['renderedHtml'] === 'string' ? (value['renderedHtml'] as string) : ''
  const preview = typeof value?.['preview'] === 'string' ? (value['preview'] as string) : ''
  return { html: rendered !== '' ? rendered : preview, truncated: value?.['truncated'] === true }
}
/** **THE GHOST'S OWN SPELLING, AS ASM-3 FIXES IT** (`data-ghost="temp"`): the design spells the declaration with double
 *  quotes and this reader tolerates a serialiser's single quotes as well, because the subject is the ATTRIBUTE and its
 *  value and never the quoting style a DOM dump happens to use. */
const GHOST_DECLARATION = /data-ghost\s*=\s*(["'])temp\1/g
const ghostCount = (html: string): number => html.match(GHOST_DECLARATION)?.length ?? 0
/** How many bounded re-reads a render gets before its absence is a reading: a DELIVERY is not the caller's turn, so a
 *  write that returns has not necessarily repainted yet — `npm run crossings` polls for exactly this reason (`D-94`). */
const GHOST_POLLS = 10
const GHOST_POLL_MS = 250
interface GhostReading { count: number; polls: number; length: number; truncated: boolean }
/** Poll the app's rendered surface until `until` holds, or the bound is spent: a poll that times out is PRINTED and then
 *  answered by the row's own assertion, which is what keeps an absence a measurement rather than a race. */
async function ghostWithin(client: Client, until: (count: number) => boolean): Promise<GhostReading> {
  let read = await renderedHtml(client)
  for (let polls = 1; polls <= GHOST_POLLS; polls += 1) {
    const count = ghostCount(read.html)
    if (until(count)) return { count, polls, length: read.html.length, truncated: read.truncated }
    await sleep(GHOST_POLL_MS)
    read = await renderedHtml(client)
  }
  return { count: ghostCount(read.html), polls: GHOST_POLLS, length: read.html.length, truncated: read.truncated }
}

// ---- the profile file, as the store wrote it --------------------------------
/** **THE PROFILE FILE AS THE STORE WROTE IT** — read BY THIS PROCESS and never through the surface, because a tier that
 *  persists nowhere is measured by its key's ABSENCE from these bytes and by nothing else (`D-84`). An `absent` or
 *  unparsable file is a stated reading, not a throw. */
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
/** **A BOUNDED SETTLE FOR THE FILE** — the same poll `npm run crossings` takes (`D-94`): a `file` write reaches its bytes
 *  at the instance's own flush, not at the caller's turn, so the wait IS the measurement. A poll that times out is PRINTED
 *  and then answered by the row's own assertion. */
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
/** **THE FILE'S BYTES AT REST** — `P-5`'s one measurement of "nothing moved" needs a baseline that is not a snapshot of a
 *  file still being written: two reads with a poll between them, equal, are the file at rest. A file that never settles
 *  answers its LAST reading, which is printed by the assertion that reads it. */
async function stableProfile(profile: string): Promise<ProfileRead> {
  let read = readProfile(profile)
  for (let polls = 1; polls <= FILE_POLL_MAX; polls += 1) {
    await sleep(FILE_POLL_DELAY_MS)
    const next = readProfile(profile)
    if (next.raw === read.raw) return next
    read = next
  }
  return read
}

// ---- the app's own pane family ----------------------------------------------
/** **THE PANE ID IS LEARNED AND NEVER SPELLED**: `['panes']` is the family the record names its geometry by, so the id the
 *  drag's `temp` reading must name and the id the ghost's declaration must be measured against are the ones THIS read
 *  answers. An empty family is a harness fault (the boot's own creation repair mints the pane at `file`) and says so. */
async function paneFamily(client: Client): Promise<{ id: string; family: Json; answer: CallAnswer }> {
  const answer = await readAt(client, [PANES])
  const family = asObject(plainOf(memberOf(answer.value, 'value')))
  const id = family === null ? undefined : Object.keys(family)[0]
  if (family === null || id === undefined) {
    throw new Error(
      `PREREQUISITE — the app's own \`['${PANES}']\` family names no pane: an agent's read answered ${trunc(answer.text, 320)}. ` +
        `The boot's creation repair mints that family at \`file\`, so an empty family here is a harness fault and never this ` +
        `row's reading.`,
    )
  }
  return { id, family, answer }
}

// ---- one boot ---------------------------------------------------------------
/** A transport over an ALREADY-SPAWNED child's stdio (newline-delimited JSON-RPC, the SDK's own framing) — the
 *  `scripts/electron-spawn.mjs` helper's shape, inlined because this battery imports no `scripts/` module. A child that
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
 *  `--provident-user-data` is the app's own, and the store lands under the latter.
 *
 *  **A RENDERER WAIT IS ASKED FOR AND NEVER ASSUMED**: `P-1`, `P-2` and `P-3` drive a bridge member INSIDE the renderer
 *  realm, `P-4` reads the app's OWN rendered surface, and `P-6`'s FIRST boot seeds its reading through the same driven route
 *  `P-1` uses (§4 `P-6`), so those boots ask for one and a `DISPLAY` is their prerequisite — RED, never a skip. `P-5`
 *  measures the store and the profile's bytes over stdio, and `P-6`'s SECOND boot does the same on the same profile: those
 *  stand before the window does and ask for no renderer.
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
        'renderer realm `P-1`..`P-4` drive cannot exist without one. Fix: `DISPLAY=:0 npx vitest run ' +
        'tests/e2e/pane-drag-temp/`, or wrap the run in xvfb-run. This is a RED and never a skip ' +
        '(tests/e2e/secure-panels/panes-live.mjs:46).',
    )
  }
  const releaseBootLock = await acquireLiveBoot(`pane-drag-temp boot on ${profile}`)
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
  const client = new Client({ name: 'pane-drag-temp-e2e', version: '0.1.0' })
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
/** **THE RENDERER READY, MEASURED AND NOT ASSUMED**: the driver's bodies run in the page and `P-4` reads the page's own
 *  rendering, so a dispatch or a `get_rendered_html` read before the renderer answers measures nothing. The app's own graph
 *  is asked for an authored node until it answers — a failed read is not a state, so this is a bounded wait (`D-127`). */
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
const OUT_ID = 'pd-out'
const DUMP_ID = 'pd-dump'
const SETTLE_READS_MAX = 20
const SETTLE_DELAY_MS = 250
/** ONE body per driven act. Every body frames its answer into ONE authored node (`PD!…!END_PD`, percent-encoded) so the
 *  observation comes back over the EXISTING `provident.get_rendered_html` and never as a new tool (D-18). The frame is
 *  STASHED, not written: a bridge call settles after this dispatch's render turn, so the write happens in `pd-dump`'s own
 *  synchronous turn — the crossing leg measured the alternative as an observation that never rendered.
 *
 *  **EVERY BODY CENSUSES THE MEMBER IT NEEDS BEFORE IT CALLS IT**, and reports the census in its own frame: `typeof
 *  view.commitDrag` is the row's declared failure mode ("the bridge carries no such route"), so an absent route must be a
 *  FRAMED READING and never a thrown TypeError that would red the row as a harness fault. */
function actBody(label: string, act: string): string {
  return `function (ctx) {
  var frame = function (text) { window.__PD_FRAME = text }
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
  var held = (typeof window !== 'undefined' && typeof window.__PD_FRAME === 'string') ? window.__PD_FRAME : 'act=none;status=none;answer=null'
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'PD!' + held + '!END_PD' }])
}`
/** One driven act of a row: the css id it is addressed by, the label its frame is keyed to, and the body's own statements.
 *  The pane id is BAKED IN at envelope-build time, because the rows learn it from the agent's `['panes']` read first — so
 *  the body says `commitDrag('<pane>', …)` literally and never composes an address of its own. */
interface Act { id: string; label: string; act: string }
/** `P-1`'s ONE act: the app's OWN `view.commitDrag`, censused before it is called. */
function commitDragAct(paneId: string): Act {
  return {
    id: 'pd-commit-drag',
    label: 'commit-drag',
    act: `var view = need('view')
    var census = { members: Object.keys(view), commitDrag: typeof view.commitDrag, clearDrag: typeof view.clearDrag }
    if (typeof view.commitDrag !== 'function') { ok({ route: 'absent', census: census }); return }
    view.commitDrag('${paneId}', { height: 220 }).then(function (answer) { ok({ route: 'present', answer: answer, census: census }) }, no)`,
  }
}
/** `P-2`'s ONE act: the gesture's three turns IN ORDER — the mid-gesture `temp` write, the release's `file` commit, the
 *  end. One body and not three, because the row's subject is the ORDER the tiers are written and ended in. */
function dragTurnsAct(paneId: string): Act {
  return {
    id: 'pd-drag-turns',
    label: 'drag-turns',
    act: `var view = need('view')
    var census = { members: Object.keys(view), commitDrag: typeof view.commitDrag, commitPane: typeof view.commitPane, clearDrag: typeof view.clearDrag }
    if (typeof view.commitDrag !== 'function' || typeof view.clearDrag !== 'function') { ok({ turn: 'absent', census: census }); return }
    view.commitDrag('${paneId}', { height: 180 }).then(function (mid) {
      view.commitPane('${paneId}', { height: 180 }).then(function (release) {
        view.clearDrag().then(function (cleared) { ok({ turn: 'present', turns: [mid, release, cleared], census: census }) }, no)
      }, no)
    }, no)`,
  }
}
/** `P-3`'s two acts: the subscriber the app's OWN `view.onChanged` installs, and the report that reads its counter back
 *  through the frame. The counter lives on the realm (`window.__PD_HITS`) because a delivery is not the caller's turn. */
const subscribeViewAct: Act = {
  id: 'pd-subscribe-view',
  label: 'subscribe-view',
  act: `var view = need('view')
    if (typeof view.onChanged !== 'function') { ok({ subscribed: false, members: Object.keys(view) }); return }
    window.__PD_HITS = 0
    var off = view.onChanged(function () { window.__PD_HITS = (window.__PD_HITS || 0) + 1 })
    ok({ subscribed: true, withdrawal: typeof off, members: Object.keys(view) })`,
}
const reportViewAct: Act = {
  id: 'pd-report-view',
  label: 'report-view',
  act: `var view = need('view')
    ok({ hits: window.__PD_HITS || 0, members: Object.keys(view) })`,
}
/** The envelope the driver loads: one button per act, the dump button, and the node the frame is written into. */
function driverEnvelope(acts: Act[]): unknown {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'pd-driver' },
        children: [
          ...acts.map(({ id, label, act }) => ({
            type: 'button',
            css: { id },
            props: { id },
            content: label,
            handlers: [{ name: id, event: 'click', body: actBody(label, act) }],
          })),
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
    const frame = /PD!([\s\S]*?)!END_PD/.exec(String(asObject(rendered.value)?.['renderedHtml'] ?? ''))
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
/** Load the driver's envelope — the measurement channel — and settle it: a body is dispatched only once the envelope's own
 *  nodes resolve. */
async function loadDriver(booted: Boot, acts: Act[]): Promise<void> {
  await call(booted.client, 'provident.load', { kind: 'envelope', envelope: driverEnvelope(acts) })
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
  // THE INVARIANT, in this order and with nothing silent in it: reap every tree this file spawned, PROVE zero, and only
  // then remove the profiles — a directory removed under a live process leaves the survivor holding a file nobody can
  // find (`D-74`).
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort; the assert below is the guarantee */
    }
  }
  // The host-wide live-boot lock is released here whatever this file measured — before the survivors assert, because a
  // lock held past a throwing teardown would wedge the sibling spawning batteries for their whole bound (`D-74`).
  for (const release of liveBootReleases.splice(0)) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  if (report.survivors.length > 0) {
    throw new Error(
      `pane-drag-temp teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor means this ` +
        `run leaks a process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

// ---- the shared boot helper -------------------------------------------------
/** Every row gets its OWN scratch profile and its own boot(s) (§4's "one boot" / "two boots" column): a profile shared
 *  between rows would let one row's write answer another's absence. A row that drives the bridge loads its own envelope
 *  AFTER learning the pane id from the agent's read, so the helper loads nothing by itself. */
async function withBoot(
  name: string,
  body: (booted: Boot, profile: string) => Promise<void>,
  options: { renderer?: boolean } = {},
): Promise<void> {
  const profile = makeProfile(name)
  const booted = await boot(profile, { renderer: options.renderer === true })
  boots.push(booted)
  await body(booted, profile)
}

// ══════════════════════════════════════════════════════════════════════════════
// THE ROWS — one per matrix entry of `docs/L1/pane-drag-temp.md` §4
// ══════════════════════════════════════════════════════════════════════════════
describe('pane-drag-temp — the drag\'s in-process value at `temp`, its release at `file` (D-132, D-137)', () => {
  it('P-1 — the in-process value is readable at the `temp` address and persists nowhere', async () => {
    await withBoot('pane-drag-temp-p1', async (booted, profile) => {
      const { id: paneId } = await paneFamily(booted.client)
      await loadDriver(booted, [commitDragAct(paneId)])

      const driven = await drive(booted.client, 'pd-commit-drag', 'commit-drag')
      expect(
        driven.status,
        `P-1 PREREQUISITE — the driven act must FRAME an answer: a status of '${driven.status}' after ${driven.polls} poll(s) means ` +
          `the handler body never reported, so this row measured nothing. Framed answer: ${textOf(driven.answer)}; trace:\n${tail(booted.trace())}`,
      ).toBe('ok')
      const framed = asObject(driven.answer)
      expect(
        str(memberOf(framed, 'route')),
        `P-1 — the app's bridge carries no \`view.commitDrag\` route: the driven body censused the member as ` +
          `${textOf(memberOf(asObject(memberOf(framed, 'census')), 'commitDrag'))} (members: ` +
          `${textOf(memberOf(asObject(memberOf(framed, 'census')), 'members'))}), so no route wrote \`['${DRAG}']\` at tier ` +
          `'${GHOST_TOKEN}' and the in-process value this row's read asks for was never written (D-132, §4 P-1's first declared ` +
          `failure mode).`,
      ).toBe('present')
      const commit = asObject(memberOf(framed, 'answer'))
      expect(
        str(memberOf(commit, 'status')),
        `P-1 — \`commitDrag('${paneId}', { height: 220 })\` must answer status 'committed': the drag's mid-gesture turn is a WRITE at ` +
          `\`['${DRAG}']\` at tier '${GHOST_TOKEN}', and a refusal here says the route reached no store. Commit answer: ${textOf(commit)}`,
      ).toBe('committed')

      // ── the agent's read: the value at the address, and the tier it names ────
      const read = await readAt(booted.client, [DRAG])
      const answer = asObject(read.value)
      expect(
        str(answer?.['status']),
        `P-1 — the in-process value must be READABLE at \`['${DRAG}']\` through the agent's own route after the commit: the read ` +
          `must answer status:'read' and not the absent arm, because a tier that persists nowhere still stands IN the store for ` +
          `this process (ASM-1, D-132). Observed answer: ${trunc(read.text)}`,
      ).toBe('read')
      expect(
        str(answer?.['kind']),
        `P-1 — \`['${DRAG}']\` is a family keyed by pane id, so the answer's kind is 'branch'; observed: ${trunc(read.text)}`,
      ).toBe('branch')
      expect(
        answer?.['path'],
        `P-1 — the answer names the address it was asked for, \`['${DRAG}']\`; observed: ${trunc(read.text)}`,
      ).toEqual([DRAG])
      const node = answer?.['value']
      expect(
        owns(node, paneId),
        `P-1 — the branch's node must NAME the pane the drag committed (\`${paneId}\`): the family is \`{ [paneId]: { height } }\` ` +
          `(ASM-1), so the ghost's question is asked at the node that names the pane. Observed answer: ${trunc(read.text)}`,
      ).toBe(true)
      expect(
        str(memberOf(node, '_tier')) ?? '(no _tier member)',
        `P-1 — the node at \`['${DRAG}']\` must carry \`_tier: '${GHOST_TOKEN}'\`: a tier that persists nowhere is named by the ` +
          `node's OWN tier, and the ghost asks this node and no other (D-134, D-144). Observed answer: ${trunc(read.text)}`,
      ).toBe(GHOST_TOKEN)
      const member = memberOf(node, paneId)
      expect(
        str(memberOf(member, '_tier')) ?? '(no _tier member)',
        `P-1 — the pane's own member must carry \`_tier: '${GHOST_TOKEN}'\` too: the family's members stand at the family's tier, ` +
          `and a member naming another tier (or none) is the tier that would persist. Observed answer: ${trunc(read.text)}`,
      ).toBe(GHOST_TOKEN)
      expect(
        num(memberOf(plainOf(member), 'height')),
        `P-1 — the member must carry the \`height\` the commit wrote: \`commitDrag('${paneId}', { height: 220 })\` writes a placement at ` +
          `\`['${DRAG}']\`, so the reading's own member carries 220. Observed answer: ${trunc(read.text)}`,
      ).toBe(220)

      // ── the profile's bytes: a tier that persists NOWHERE ───────────────────
      // THE ABSENCE IS MEASURED ON A POSITIVE DATUM AND NEVER ON AN EMPTY FILE: the boot's own creation repair has ALREADY
      // written `['panes']` at `file` before this row's `temp` reading was made, so the same bytes carrying that key are the
      // proof this file is readable and populated — and only then does a missing `['drag']` key mean the `temp` tier persists
      // nowhere. A file carrying nothing would green the absence vacuously, which is why the settlement waits for the PANE
      // key itself and not for any key at all (the anchor `tests/e2e/tier-readout/tier-readout.test.ts`'s file arm takes).
      const settled = await settleProfile(profile, (held) => held.keys.includes(PANES))
      expect(
        settled.read.keys,
        `P-1 — the profile file \`${PROFILE_FILE}\` must carry the committed \`['${PANES}']\` family: it is the boot's OWN ` +
          `creation repair, written at 'file' before this row's '${GHOST_TOKEN}' reading was made, so its presence is the ` +
          `positive, durable datum that the file is readable and populated — the ground the absence below stands on (read ` +
          `after ${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}"). ` +
          `raw=${trunc(settled.read.raw, 500)}`,
      ).toContain(PANES)
      expect(
        settled.read.keys.includes(DRAG),
        `P-1 — the profile file \`${PROFILE_FILE}\` must carry NO \`${DRAG}\` key: '${GHOST_TOKEN}' is the tier that persists ` +
          `nowhere, so the same reading is in the store and in no file (read after ${settled.polls} poll(s); ` +
          `keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}"). raw=${trunc(settled.read.raw, 500)}`,
      ).toBe(false)
    }, { renderer: true })
  }, ROW_MS)

  it('P-2 — the release commits `file` and the `temp` reading is gone after the gesture', async () => {
    await withBoot('pane-drag-temp-p2', async (booted, profile) => {
      const { id: paneId } = await paneFamily(booted.client)
      await loadDriver(booted, [dragTurnsAct(paneId)])

      const driven = await drive(booted.client, 'pd-drag-turns', 'drag-turns')
      expect(
        driven.status,
        `P-2 PREREQUISITE — the driven body must FRAME an answer: a status of '${driven.status}' after ${driven.polls} poll(s) means ` +
          `the handler body never reported, so this row measured nothing. Framed answer: ${textOf(driven.answer)}; trace:\n${tail(booted.trace())}`,
      ).toBe('ok')
      const framed = asObject(driven.answer)
      expect(
        str(memberOf(framed, 'turn')),
        `P-2 — the app's bridge carries no \`view.commitDrag\`/\`view.clearDrag\` route: the driven body censused ` +
          `commitDrag=${textOf(memberOf(asObject(memberOf(framed, 'census')), 'commitDrag'))}, ` +
          `clearDrag=${textOf(memberOf(asObject(memberOf(framed, 'census')), 'clearDrag'))} over members ` +
          `${textOf(memberOf(asObject(memberOf(framed, 'census')), 'members'))}, so the three turns the gesture makes could not be ` +
          `driven at all (§4 P-2; D-132's lockstep surface).`,
      ).toBe('present')
      const turns = objectList(memberOf(framed, 'turns'))
      expect(
        turns.map((turn) => str(turn['status'])),
        `P-2 — the three turns must each answer 'committed', IN ORDER: the mid-gesture \`commitDrag('${paneId}', { height: 180 })\` ` +
          `writes \`['${DRAG}']\` at '${GHOST_TOKEN}', the release's \`commitPane('${paneId}', { height: 180 })\` writes \`['${PANES}']\` ` +
          `at 'file', and \`clearDrag()\` ends the reading. Framed answer: ${textOf(driven.answer)}`,
      ).toEqual(['committed', 'committed', 'committed'])

      // ── the two tiers, one datum, one time ──────────────────────────────────
      const drag = await readAt(booted.client, [DRAG])
      expect(
        drag.value,
        `P-2 — after \`clearDrag()\` the address must answer ABSENT — \`{status:'absent', path:['${DRAG}']}\` — because the clear ENDS ` +
          `the reading with a delete at its own tier (ASM-2, row 5's "gone after the gesture"). A read arm here means the clear ` +
          `wrote a placeholder rather than ending the family. Observed answer: ${trunc(drag.text)}`,
      ).toEqual({ status: 'absent', path: [DRAG] })

      const panes = await readAt(booted.client, [PANES])
      const panesNode = memberOf(panes.value, 'value')
      expect(
        str(memberOf(panesNode, '_tier')) ?? '(no _tier member)',
        `P-2 — the release's geometry must land at 'file': the node at \`['${PANES}']\` carries \`_tier: 'file'\`, because the sink's ` +
          `commit is the durable half of the gesture (D-132, D-138). Observed answer: ${trunc(panes.text)}`,
      ).toBe('file')
      expect(
        paneHeight(panesNode, paneId),
        `P-2 — and it must carry the \`height\` the release committed (180) for the pane the drag named (\`${paneId}\`): the two tiers ` +
          `hold ONE datum at one time, so the address that survives the gesture carries the \`height\` the drag was at. ` +
          `Observed answer: ${trunc(panes.text)}`,
      ).toBe(180)

      // ── the file's bytes: the pane, and no drag ────────────────────────────
      const settled = await settleProfile(profile, (held) => held.keys.includes(PANES))
      expect(
        settled.read.keys.includes(PANES),
        `P-2 — the profile file \`${PROFILE_FILE}\` carries \`['${PANES}']\`: the release's commit is a \`file\` write, so the same ` +
          `bytes reach the disk (read after ${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; ` +
          `reason="${settled.read.reason}"). raw=${trunc(settled.read.raw, 500)}`,
      ).toBe(true)
      expect(
        settled.read.raw.includes(paneId),
        `P-2 — and the file's bytes name the pane the release committed (\`${paneId}\`); raw=${trunc(settled.read.raw, 500)}`,
      ).toBe(true)
      expect(
        settled.read.keys.includes(DRAG),
        `P-2 — and the file carries NO \`${DRAG}\` key: the in-process reading outlives nothing, so the gesture leaves one datum ` +
          `in the bytes and none at the tier that persists nowhere. keys=[${settled.read.keys.join(', ')}]; ` +
          `raw=${trunc(settled.read.raw, 500)}`,
      ).toBe(false)
    }, { renderer: true })
  }, ROW_MS)

  it('P-3 — the subscription array covers the new root: an outside `temp` write is delivered', async () => {
    await withBoot('pane-drag-temp-p3', async (booted) => {
      const { id: paneId } = await paneFamily(booted.client)
      await loadDriver(booted, [subscribeViewAct, reportViewAct])

      const subscribed = await drive(booted.client, 'pd-subscribe-view', 'subscribe-view')
      expect(
        subscribed.status,
        `P-3 PREREQUISITE — the driven subscriber must FRAME an answer: a status of '${subscribed.status}' after ` +
          `${subscribed.polls} poll(s) means the body never reported. Framed answer: ${textOf(subscribed.answer)}; ` +
          `trace:\n${tail(booted.trace())}`,
      ).toBe('ok')
      const installed = asObject(subscribed.answer)
      expect(
        memberOf(installed, 'subscribed'),
        `P-3 PREREQUISITE — \`window.provident.view.onChanged\` must exist for this row to count deliveries from it: the body ` +
          `censused members ${textOf(memberOf(installed, 'members'))}. A row that cannot subscribe measures nothing and says so.`,
      ).toBe(true)

      const beforeWrite = asObject((await drive(booted.client, 'pd-report-view', 'report-view')).answer)
      expect(
        num(memberOf(beforeWrite, 'hits')),
        `P-3 — the counter must read ZERO before this row writes anything: a delivery before the write would be the harness ` +
          `counting its own subscription. Framed answer: ${textOf(beforeWrite)}`,
      ).toBe(0)

      // ── the write is an AGENT's: outside the drag, outside the composition ───
      const wrote = await writeAt(booted.client, [DRAG], 'temp', { [paneId]: { height: 210 } })
      expect(
        str(asObject(wrote.value)?.['status']),
        `P-3 PREREQUISITE — the agent's \`data.write(['${DRAG}'], tier:'${GHOST_TOKEN}')\` must answer committed: this row is ` +
          `the delivery of a write \`['${DRAG}']\` is DECLARED at '${GHOST_TOKEN}', so the declared-root guard admits it ` +
          `(D-101). Observed: ${trunc(wrote.text, 320)}`,
      ).toBe('committed')

      let hits = 0
      let polls = 0
      for (let attempt = 1; attempt <= SETTLE_READS_MAX; attempt += 1) {
        polls = attempt
        const report = asObject((await drive(booted.client, 'pd-report-view', 'report-view')).answer)
        hits = num(memberOf(report, 'hits')) ?? 0
        if (hits >= 1) break
        await sleep(SETTLE_DELAY_MS)
      }
      expect(
        hits >= 1,
        `P-3 — ZERO DELIVERIES: the driver's subscriber counted ${String(hits)} delivery(ies) over ${polls} poll(s) after an ` +
          `AGENT's \`data.write(['${DRAG}'], tier:'${GHOST_TOKEN}')\` — a write the drag did not make. The view record's ` +
          `subscription address array does not cover \`['${DRAG}']\`, so every '${GHOST_TOKEN}' write is a write the renderer ` +
          `never hears (R-2, D-137's precondition measured rather than asserted).`,
      ).toBe(true)
    }, { renderer: true })
  }, ROW_MS)

  it('P-4 — an outside write MOVES THE GHOST, and the reading\'s end takes it away', async () => {
    // **NO DRIVER ENVELOPE**: the ghost is the app's OWN rendering, so this boot loads nothing over it and reads the page's
    // own surface through `provident.get_rendered_html` (§4 P-4).
    await withBoot('pane-drag-temp-p4', async (booted) => {
      const { id: paneId, answer: panesAnswer } = await paneFamily(booted.client)
      const panesNode = memberOf(panesAnswer.value, 'value')
      expect(
        str(memberOf(panesNode, '_tier')) ?? '(no _tier member)',
        `P-4 PREREQUISITE — the committed \`['${PANES}']\` family must stand at 'file' before this row can name its pane; observed: ` +
          `${trunc(panesAnswer.text)}`,
      ).toBe('file')

      const wrote = await writeAt(booted.client, [DRAG], 'temp', { [paneId]: { height: 200 } })
      expect(
        str(asObject(wrote.value)?.['status']),
        `P-4 PREREQUISITE — the agent's \`data.write(['${DRAG}'], tier:'${GHOST_TOKEN}', {${paneId}: {height: 200}})\` must answer ` +
          `committed: the write is the row's own act and the ghost is its product, so a refusal here would measure the guard and ` +
          `not the rendering. Observed: ${trunc(wrote.text, 320)}`,
      ).toBe('committed')
      const standing = await readAt(booted.client, [DRAG])
      expect(
        str(asObject(standing.value)?.['status']),
        `P-4 PREREQUISITE — the write must be READABLE at \`['${DRAG}']\` before the ghost can be its product; observed: ` +
          `${trunc(standing.text)}`,
      ).toBe('read')

      // ── arm (a): the declaration appears while the reading names the pane ────
      const appeared = await ghostWithin(booted.client, (count) => count > 0)
      expect(
        appeared.count > 0,
        `P-4 — NO DECLARATION APPEARS: while \`['${DRAG}']\` names \`${paneId}\` at '${GHOST_TOKEN}' — written by an AGENT, so the ` +
          `reading is nobody's private state — the pane element must render the declared transient declaration ` +
          `\`data-ghost="${GHOST_TOKEN}"\` (ASM-3), and the app's own rendered surface carried ${String(appeared.count)} of them ` +
          `over ${appeared.polls} bounded re-read(s) (html length ${String(appeared.length)}${appeared.truncated ? ', answer TRUNCATED' : ''}). ` +
          `Zero means the delivery never reached the ghost turn (D-137, D-144).`,
      ).toBe(true)

      // ── arm (b): the reading ENDS and the declaration goes with it ──────────
      // **THIS ACT IS THE DATA SURFACE'S BECAUSE THE GESTURE'S OWN ENDING ROUTE CANNOT BE DRIVEN IN THIS REALM WITHOUT
      // DESTROYING THE SURFACE THIS ROW MEASURES** (§4 `P-4`'s own clause; D-27, ASM-2). The gesture ends through
      // `window.provident.view.clearDrag()` — `P-2`'s third turn — and that route is reachable here only from inside a driver
      // envelope body: the bridge member is the page's own, and the ONE lawful way to run a body in this realm is
      // `provident.load({kind:'envelope'})`, whose load REPLACES the app's own graph with the envelope's. That graph is the
      // very rendered surface this row reads (this boot loads NO driver, which is what makes the ghost the app's own
      // rendering), so driving the clear would empty the page — and a ghost count read off an emptied page is a zero this
      // row's act never produced: arm (b) would green on nothing. The reading is therefore ended through the DATA surface,
      // in the same grain as the write that painted it: that write was an agent's `provident.data.write` over stdio, so its
      // end is an agent's `provident.data.delete` over stdio, both of them outside the drag.
      //
      // **AND IT NAMES THE ROW THAT STANDS, NEVER A BRANCH** (D-12, D-53). The surface's `delete` addresses ONE ROW: it asks
      // `readLiteral` at the address at the named tier before it acts, so a BRANCH address — the family root `['drag']`, and
      // equally the member record `['drag', <pane>]` — is answered by the EMPTY RECEIPT
      // `{status:'committed', removed:false, tiers:[]}`, which removes nothing and mints no cursor. A delete of the root
      // would leave the reading standing and make the absence measured below the HARNESS's rather than the act's
      // (`docs/L3/central-data/design.md` §3; `ASM-L2-6`) — which is why the prerequisite below asserts BOTH members.
      // The address deleted is `['drag', <pane>, 'height']`: the LEAF the ghost's own condition reads (the pane's ADJUSTABLE
      // member at `temp`, which for the stage-resident `pane-a` is `height`, D-186/D-189), so the declaration goes with the
      // exact reading it was painted from and no tier of the family is merely overwritten (ASM-2, ASM-3).
      //
      // **AND SO IT ENDS THE ROW'S READING AND NOT THE FAMILY'S — MEASURED ON A LIVE BOOT OF THIS HEAD, NEVER INFERRED**:
      // `data.delete` names ONE ROW, so after this leaf delete `['drag']` still answers
      // `{status:'read', kind:'branch', value:{_tier:'temp', <pane>:{_tier:'temp'}}}` — the pane member STANDS at `temp` and
      // only its `height` is gone. The family's own end is the ROUTE's (`clearDrag()`'s store root delete at `['drag']`,
      // driven by `P-2`'s third turn; `src/main/view-record/index.ts`'s `clearDrag`) and the gesture's own turns are
      // `pane-drag-compliance`'s, so this battery pins the GHOST's product and says plainly that it does not measure the
      // family's absence.
      //
      // **THE PREDICATE THIS ARM THEREFORE RELIES ON IS THE RENDERER'S OWN, AND IT IS NARROWER THAN ASM-3's SENTENCE**: the
      // declaration is painted iff the branch stands at `temp` naming the pane WITH A FINITE NON-NEGATIVE FIGURE AT THAT
      // PANE'S ADJUSTABLE MEMBER — `height`, its own name stating its axis (`docs/L2/renderer-wiring/interface.md` §3's
      // "What it reads") — so what this row removes is exactly that datum and not the reading's existence — arm (b)'s zero
      // is caused by that predicate LOSING ITS DATUM. A predicate reading
      // ASM-3's sentence alone — present while the reading names the pane — would keep the declaration painted after this
      // delete, which is why the row pins the L2 predicate it cites rather than the one sentence it quotes.
      const ended = await deleteAt(booted.client, [DRAG, paneId, 'height'], 'temp')
      expect(
        str(asObject(ended.value)?.['status']),
        `P-4 PREREQUISITE — \`data.delete(['${DRAG}', '${paneId}', 'height'], tier:'${GHOST_TOKEN}')\` must answer committed: the ` +
          `end of the reading is the arm the ghost's disappearance is measured against, and a refusal here ends nothing. ` +
          `Observed: ${trunc(ended.text, 320)}`,
      ).toBe('committed')
      expect(
        memberOf(ended.value, 'removed'),
        `P-4 PREREQUISITE — and the answer must say it REMOVED the row it named: \`removed\` must be \`true\` and never the empty ` +
          `receipt's \`{removed:false, tiers:[]}\`. The surface's \`delete\` names ONE ROW and asks \`readLiteral\` at the address ` +
          `before it acts, so a BRANCH address — the family root \`['${DRAG}']\` and equally the member record ` +
          `\`['${DRAG}', '${paneId}']\` — is answered by that receipt and removes nothing (\`docs/L3/central-data/design.md\` §3, ` +
          `\`ASM-L2-6\`). A \`removed:false\` here would leave the reading standing, and the absence measured below would be the ` +
          `HARNESS's and not the act's. Observed: ${trunc(ended.text, 320)}`,
      ).toBe(true)
      const vanished = await ghostWithin(booted.client, (count) => count === 0)
      expect(
        vanished.count,
        `P-4 — the declaration must be GONE once the row that names the pane is removed: a \`data-ghost="${GHOST_TOKEN}"\` that ` +
          `survives \`data.delete(['${DRAG}', '${paneId}', 'height'], tier:'${GHOST_TOKEN}')\` is the ghost of a gesture that is ` +
          `over, and the design's own failure-mode column names it (${String(vanished.polls)} bounded re-read(s); html length ` +
          `${String(vanished.length)}${vanished.truncated ? ', answer TRUNCATED' : ''}). It is the ROW's reading that is removed ` +
          `and never the family's: the family's own end is the route's \`clearDrag()\` at \`['${DRAG}']\`, which \`P-2\` measures.`,
      ).toBe(0)
      expect(
        vanished.length,
        `P-4 PREREQUISITE — the absence above must be read off an ANSWERED page: an EMPTY answer is not a pane element ` +
          `WITHOUT a declaration, so a zero read off an answer carrying no bytes would green this arm on nothing. The absence ` +
          `is therefore measured on a POSITIVE datum, exactly as \`P-1\`'s profile arm measures its own absence on the ` +
          `committed \`['${PANES}']\` key and never on an empty file: this reading is html length ${String(vanished.length)} ` +
          `over ${String(vanished.polls)} bounded re-read(s)${vanished.truncated ? ', answer TRUNCATED' : ''}.`,
      ).toBeGreaterThan(0)

      // ── arm (c): a reading naming ANOTHER pane must not move this pane ──────
      const foreign = await writeAt(booted.client, [DRAG], 'temp', { [OTHER_PANE]: { height: 200 } })
      expect(
        str(asObject(foreign.value)?.['status']),
        `P-4 PREREQUISITE — the agent's write naming \`${OTHER_PANE}\` (an id the \`['${PANES}']\` family does not name) must answer ` +
          `committed; observed: ${trunc(foreign.text, 320)}`,
      ).toBe('committed')
      const elsewhere = await ghostWithin(booted.client, (count) => count === 0)
      expect(
        elsewhere.count,
        `P-4 — the declaration must appear from a write naming THIS PANE and from no other: a reading naming \`${OTHER_PANE}\` ` +
          `leaves the pane element without \`data-ghost="${GHOST_TOKEN}"\`, which is the design's declared failure mode "the ` +
          `declaration appears from a write naming another pane" (${String(elsewhere.polls)} bounded re-read(s); html length ` +
          `${String(elsewhere.length)}${elsewhere.truncated ? ', answer TRUNCATED' : ''}).`,
      ).toBe(0)
    }, { renderer: true })
  }, ROW_MS)

  it('P-5 — the `temp` root cannot be shadowed: a `file` or `mem` write is refused `declared-tier`', async () => {
    await withBoot('pane-drag-temp-p5', async (booted, profile) => {
      const { id: paneId } = await paneFamily(booted.client)

      // ── a standing temp reading, and the bytes at rest beside it ────────────
      const seeded = await writeAt(booted.client, [DRAG], 'temp', { [paneId]: { height: 160 } })
      expect(
        str(asObject(seeded.value)?.['status']),
        `P-5 PREREQUISITE — the standing \`temp\` reading must be written first: \`data.write(['${DRAG}'], tier:'${GHOST_TOKEN}')\` ` +
          `answered ${trunc(seeded.text, 320)}. The row's subject is that this reading SURVIVES a shadowing attempt, so it has to ` +
          `stand before one is made.`,
      ).toBe('committed')
      const standingRead = await readAt(booted.client, [DRAG])
      expect(
        str(asObject(standingRead.value)?.['status']),
        `P-5 PREREQUISITE — the standing reading must be readable before the refusals; observed: ${trunc(standingRead.text)}`,
      ).toBe('read')
      const atRest = await stableProfile(profile)

      // ── the shadow: `file` first, then `mem` ───────────────────────────────
      const fileShadow = await writeAt(booted.client, [DRAG], 'file', { [paneId]: { height: 240 } })
      const fileAnswer = asObject(fileShadow.value)
      expect(
        str(fileAnswer?.['status']),
        `P-5 — the '${GHOST_TOKEN}' root is SHADOWED: an agent's \`data.write(['${DRAG}'], tier:'file')\` answered ` +
          `\`status: '${String(str(fileAnswer?.['status']))}'\` where the declared root must REFUSE it. The \`viewDeclaredRoots\` ` +
          `entry for \`['${DRAG}']\` at '${GHOST_TOKEN}' is missing, so a \`file\` shadow now exists and the family's own read ` +
          `answers from a tier it is not declared at (R-1, D-101, D-132). Observed: ${trunc(fileShadow.text, 320)}`,
      ).toBe('refused')
      expect(
        str(fileAnswer?.['reason']),
        `P-5 — the \`file\` write's refusal must name the reason 'declared-tier' and the tier the family declares ` +
          `('${GHOST_TOKEN}'): the guard is the ONE judgement this family has, and it names the root and the tier it is declared ` +
          `at (D-101). Observed: ${trunc(fileShadow.text, 320)}`,
      ).toBe('declared-tier')

      const memShadow = await writeAt(booted.client, [DRAG], 'mem', { [paneId]: { height: 240 } })
      const memAnswer = asObject(memShadow.value)
      expect(
        str(memAnswer?.['status']),
        `P-5 — and the '${GHOST_TOKEN}' root cannot be shadowed at 'mem' either: \`data.write(['${DRAG}'], tier:'mem')\` must be ` +
          `REFUSED where it answered \`status: '${String(str(memAnswer?.['status']))}'\`. A \`mem\` version of the family is the ` +
          `same defect at the other undeclared tier (R-1, D-101). Observed: ${trunc(memShadow.text, 320)}`,
      ).toBe('refused')
      expect(
        str(memAnswer?.['reason']),
        `P-5 — the \`mem\` write's refusal must name 'declared-tier' too. Observed: ${trunc(memShadow.text, 320)}`,
      ).toBe('declared-tier')

      // ── the standing reading and the bytes: untouched ──────────────────────
      const after = await readAt(booted.client, [DRAG])
      expect(
        after.value,
        `P-5 — the standing '${GHOST_TOKEN}' reading must be UNTOUCHED by the two refusals: the record the row read before them ` +
          `must answer byte for byte, because a refused write leaves the previous value exactly as it stood (D-105). ` +
          `Before: ${trunc(standingRead.text)}; after: ${trunc(after.text)}`,
      ).toEqual(standingRead.value)

      const settledBytes = await settleProfile(profile, (held) => held.raw === atRest.raw)
      expect(
        settledBytes.read.raw === atRest.raw,
        `P-5 — the profile's bytes must be BYTE-IDENTICAL across the two refusals: a declared-root refusal answers before any ` +
          `store verb, so not one byte moves (settled after ${settledBytes.polls} poll(s); keys before=` +
          `[${atRest.keys.join(', ')}] after=[${settledBytes.read.keys.join(', ')}]; reason="${settledBytes.read.reason}"). ` +
          `before=${trunc(atRest.raw, 400)} after=${trunc(settledBytes.read.raw, 400)}`,
      ).toBe(true)
      expect(
        atRest.keys.includes(DRAG),
        `P-5 — and neither the baseline nor the file after the refusals carries a \`${DRAG}\` key: the family is '${GHOST_TOKEN}' ` +
          `and nowhere else. keys=[${atRest.keys.join(', ')}]; raw=${trunc(atRest.raw, 400)}`,
      ).toBe(false)
    })
  }, ROW_MS)

  it('P-6 — `temp` is the tier that persists nothing, and the sink\'s half survives the restart', async () => {
    // **THE READING IS SEEDED THROUGH THE APP'S OWN ROUTE, AND NEVER BY AN AGENT** (§4 P-6; `D-132`, `D-101`): boot one drives
    // `window.provident.view.commitDrag(<pane>, { height })` INSIDE its renderer realm — the same driver envelope `P-1` uses —
    // because an agent's `provident.data.write({path:['drag'], tier:'temp', …})` succeeds at ANY undeclared address at this
    // head. A reading seeded that way would make this row measure the durability of a write nothing owns: it would pass on a
    // tree that carries no `['drag']` family at all. Seeded through the route, the row's subject is the family's own tier —
    // and its red at this head is the absence of that route, exactly as `P-1`'s and `P-2`'s are. Boot two is a SECOND PROCESS
    // on the same profile and asks both addresses again.
    const profile = makeProfile('pane-drag-temp-p6')
    const first = await boot(profile, { renderer: true })
    boots.push(first)

    // ── boot one: the reading at `temp` through the bridge ────────────────────
    const { id: paneId, family } = await paneFamily(first.client)
    await loadDriver(first, [commitDragAct(paneId)])

    const driven = await drive(first.client, 'pd-commit-drag', 'commit-drag')
    expect(
      driven.status,
      `P-6 PREREQUISITE — the driven act must FRAME an answer: a status of '${driven.status}' after ${driven.polls} poll(s) means ` +
        `the handler body never reported, so this row measured nothing. Framed answer: ${textOf(driven.answer)}; ` +
        `trace:\n${tail(first.trace())}`,
    ).toBe('ok')
    const framed = asObject(driven.answer)
    expect(
      str(memberOf(framed, 'route')),
      `P-6 — the app's bridge carries no \`view.commitDrag\` route: the driven body censused the member as ` +
        `${textOf(memberOf(asObject(memberOf(framed, 'census')), 'commitDrag'))} (members: ` +
        `${textOf(memberOf(asObject(memberOf(framed, 'census')), 'members'))}), so the \`['${DRAG}']\` reading at ` +
        `'${GHOST_TOKEN}' whose durability this row measures was never written, and boot two's \`absent\` would be an absence ` +
        `no gesture made. §4 P-6 seeds that reading through the app's OWN route \`commitDrag(paneId, { height })\` — the \`view\` ` +
        `member's lockstep surface (\`R-4\`, \`D-132\`) — and not through an agent's \`data.write\`.`,
    ).toBe('present')
    const commit = asObject(memberOf(framed, 'answer'))
    expect(
      str(memberOf(commit, 'status')),
      `P-6 — \`commitDrag('${paneId}', { height: 220 })\` must answer status 'committed': the drag's mid-gesture turn is a WRITE at ` +
        `\`['${DRAG}']\` at tier '${GHOST_TOKEN}', and a refusal here says the route reached no store. Commit answer: ${textOf(commit)}`,
    ).toBe('committed')

    // ── boot one: the geometry at `file` ─────────────────────────────────────
    const heldPane = asObject(memberOf(family, paneId)) ?? {}
    const committed = { ...family, [paneId]: { ...heldPane, height: 150 } }
    const paneWrite = await writeAt(first.client, [PANES], 'file', committed)
    expect(
      str(asObject(paneWrite.value)?.['status']),
      `P-6 PREREQUISITE — boot one must commit the pane at \`['${PANES}']\` at 'file': the value is the family the boot's own read ` +
        `stands with ONE figure moved — its \`height\` (\`${paneId}\` at 150, which is what tells the durable half from the '${GHOST_TOKEN}' ` +
        `reading's own 220 after the restart), so a refusal here is a harness fault and not this row's reading. ` +
        `Observed: ${trunc(paneWrite.text, 320)}`,
    ).toBe('committed')
    const standing = await readAt(first.client, [DRAG])
    expect(
      str(memberOf(memberOf(standing.value, 'value'), '_tier')) ?? '(no _tier member)',
      `P-6 — boot one's reading must STAND at '${GHOST_TOKEN}' before the restart, or the absence boot two answers would be an ` +
        `absence this row never created. Observed answer: ${trunc(standing.text)}`,
    ).toBe(GHOST_TOKEN)

    // ── the stop, and the bytes ──────────────────────────────────────────────
    await first.stop()
    const settled = await settleProfile(profile, (read) => read.keys.includes(PANES))
    expect(
      settled.read.keys.includes(PANES),
      `P-6 — the profile file \`${PROFILE_FILE}\` carries the committed \`['${PANES}']\` family, because that half of the gesture ` +
        `is the sink's and it is \`file\` (read after ${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; ` +
        `reason="${settled.read.reason}"). raw=${trunc(settled.read.raw, 500)}`,
    ).toBe(true)
    expect(
      settled.read.keys.includes(DRAG),
      `P-6 — and the file carries NO \`${DRAG}\` key: the drag's reading is '${GHOST_TOKEN}', the tier that persists nothing, so a ` +
        `key here is the tier LYING about its durability (D-84, D-132). keys=[${settled.read.keys.join(', ')}]; ` +
        `raw=${trunc(settled.read.raw, 500)}`,
    ).toBe(false)

    // ── boot two: a SECOND PROCESS on the same profile ──────────────────────
    const second = await boot(profile)
    boots.push(second)
    const afterRestart = await readAt(second.client, [DRAG])
    expect(
      afterRestart.value,
      `P-6 — a restart cannot resurrect a gesture: boot two must answer ABSENT at \`['${DRAG}']\`, and a reading here is the ` +
        `'${GHOST_TOKEN}' tier claiming a durability it does not have. Observed answer: ${trunc(afterRestart.text)}`,
    ).toEqual({ status: 'absent', path: [DRAG] })

    const survived = await readAt(second.client, [PANES])
    const survivedNode = memberOf(survived.value, 'value')
    expect(
      str(memberOf(survivedNode, '_tier')) ?? '(no _tier member)',
      `P-6 — and the durable half is exactly the sink's: boot two serves \`['${PANES}']\` at 'file'. Observed answer: ` +
        `${trunc(survived.text)}`,
    ).toBe('file')
    expect(
      paneHeight(survivedNode, paneId),
      `P-6 — with the \`height\` boot one committed at \`file\` (150) intact for the pane it named (\`${paneId}\`), and not the ` +
        `'${GHOST_TOKEN}' reading's own 220: the durable half is exactly the sink's, so a missing pane — or a pane carrying the ` +
        `in-process reading — after the restart is the design's own declared failure mode. Observed answer: ${trunc(survived.text)}`,
    ).toBe(150)
  }, ROW_MS)
})
