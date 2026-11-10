// tests/e2e/focus-retirement/focus-retirement.test.ts — THE L1 BATTERY for `focus-retirement`: the five e2e
// rows of `docs/L1/focus-retirement.md` §4 (`F-1`..`F-5`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR (`strata/next-steps.md` row `2`, which LEFT on 2026-11-07 with its work landed — `D-61`;
// `D-141`, `D-142`). The `provident.focus` MCP
// tool is a PRODUCT NEED — an agent moves the UI and loads tab-dependent data through it — and its act moves
// OFF the `['focus']` mirror, which is `mem` (the one tier that persists nothing) and a proxy for a fact the
// tab record already enforces (`exactly-one-active`) and derives (`landingOf`). The act becomes a write of
// the tab record at `['tabs']` at `file`; the family goes whole. **`D-143` LANDED THAT ACT**, so every row below
// is GREEN at this head on the built bundle — and the three rows that read the profile THROUGH `data.read`
// (`F-1`, `F-2`, `F-5`) reach the record through ONE projection, `plainOf` beside `recordOf`, which unwraps the
// node WHEN ONE ARRIVES and hands the store's plain value back untouched (`D-134`: an OBJECT node answers
// `{_tier, …members}` with its members INLINE, an ARRAY `{_tier, value:[…]}`, a LEAF `{_tier, value:<literal>}`).
// **SO THESE THREE ROWS ARE GRAIN-AGNOSTIC ON PURPOSE**, and that is stated rather than implied: they measure the
// RECORD (durability, normalisation, totality), while the answer's SHAPE is pinned where it belongs, by
// `tests/e2e/tier-readout/`'s `T-1`…`T-3` and `tests/e2e/central-data/`'s `S-3`/`S-5`/`S-6`/`S-12`. Each row keeps
// its subject, its id and its gating status: `F-1` durability across a restart, `F-2` the two-active
// normalisation, `F-5` totality (`strata/examiner.md` §2-§3, D-27, D-40).
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): every row spawns the bundle
// `npm run build` produces, on a scratch profile, opens its stdio MCP transport and drives:
//   · the agent's own acts — `provident.focus`, `provident.data.read`/`.write`, `provident.load`,
//     `provident.dispatch`, `provident.get_node_state`, `provident.get_rendered_html`;
//   · the app's OWN profile file `<profile>/provident-profile.json`, read by THIS process, because the tab
//     record is `file` and a `mem` value can never come from a file (`D-84`'s measured reading);
//   · a SECOND PROCESS on the same profile, which is what tells a durable value from a re-minted one.
// NO ROW IMPORTS `src/**`. The internals these rows would name exist at this head, and the grain is still the
// ARTIFACT — the built bundle, its preload and the app's own profile file — never an import, and
// `npm run typecheck:tests` must stay clean (`tsconfig.tests.json`).
//
// THREE ROWS NEED A LIVE RENDERER AND SAY SO RATHER THAN SKIPPING: `F-3` and `F-4`'s third arm drive a
// handler body the driver authors and `provident.load`s — the measurement channel `tests/e2e/store-crossings/
// crossings-live.mjs` established (`D-94`) — and `F-1`'s act reaches the renderer through the app's own
// invoke seam, so a boot with no window would answer `renderer not ready` instead of measuring anything.
// A `DISPLAY` is a PREREQUISITE, never a skip: a row that cannot boot REDS with the prerequisite named
// (`tests/e2e/secure-panels/panes-live.mjs:46`'s rule).
//
// THE DECLARED ABSENCE OF ONE ARM, STATED BECAUSE A MISSING ROW IS OTHERWISE INDISTINGUISHABLE FROM A
// FORGOTTEN ONE: the app's OWN subscriber driving `#tabs-landing-page`/`#tabs-error-page` from the post-act
// delivery is NOT asserted here. A pure active-tab change leaves BOTH witnesses invariant — `landing` is
// DERIVED from the active row (`D-76`) and the error witness reads rows' `error` tokens, which the act does
// not touch — so no authored node's value moves and an e2e row could only restate an internal call. That arm
// is `renderer-wiring`'s, at §4's table of what the lower layers owe (`docs/L1/focus-retirement.md` §4).
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON. A boot that publishes a load error is reported
// AT ONCE with that error, never as a timeout (`tests/e2e/bundle-boot-seam/boot-contract.test.ts`'s `F-2`
// lesson); a file read that never settles prints the poll it reached and lets its own assertion answer; and
// a teardown SIGKILLs the whole process TREE a boot left and PROVES zero survivors (`D-74`).
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
/** The Electron BINARY, never the `.bin` wrapper: the wrapper is a `cli.js` Node process whose child survives a
 *  kill and re-materialises a scratch profile (`scripts/electron-spawn.mjs`'s `F-1`). Resolution order: the
 *  canonical unpacked binary, then the package's own `path.txt` contract. */
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
/** The bound every wait is held to, and the row's own bound above it. Generous for the reason the boot battery
 *  states: a full `npm test` runs many workers, and a boot delayed by work this row does not control is not a
 *  defect (`boot-contract.test.ts`'s measured margin). */
const BOUND_MS = 60_000
const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/

/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the tab record stands at `<profile>/provident-profile.json`
 *  (`src/main/data/store.ts`'s `PROFILE_FILE_NAME`, reached through the boot's one store), and this battery's grain
 *  is the built artifact, so the name is a literal and never an import (D-27). */
const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful
 *  way to supply this run's grant, since no bridge route can widen it (`D-85`, `D-94`'s seeded profile). `data` is
 *  among the groups because every row reaches `['tabs']` through `provident.data.*`; `dispatch` carries
 *  `provident.focus` (`src/main/security.ts`'s `TOOL_GROUPS` row). */
const SECURITY_SEED = 'provident-security.json'
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'data']
/** The tab record's ONE address (`D-63`, `D-64`). */
const TABS = 'tabs'
/** The view record's three SURVIVING families — the ones a focus act must leave untouched (`D-142`'s four-become-three). */
const SURVIVING_FAMILIES = ['panes', 'zones', 'theme'] as const
/** The address the unit DELETES. Spelled as a literal because the row asserts its ABSENCE (`D-142`). */
const FOCUS = 'focus'

/** **THE SEEDED RECORD, SPELLED IN THE RECORD'S OWN TERMS**: one stored seat (`order`) and one member per tab — the
 *  shape `npm run crossings` writes at the raw address (`D-94`'s `X-3`). `landing` stands active and `alpha` cold, so
 *  every act below has a STANDING record to seat against: the record's repair keeps the entry whose bytes MOVED as its
 *  written referent (then the removed entry's pre-position, then `order`'s row reading active — `src/main/tabs-record/
 *  index.ts`'s healing body, whose precedence `docs/L3/store-tabs-record/design.md` §7 states in THIS order AS THE
 *  CODE'S, `E-11` having landed), so a row the act moves is the one it keeps. The two `lastActiveAt` members are the
 *  field pair's own (`tab-has-lastActiveAt`) and are NOT a referent: no stamp is compared anywhere in the repair. */
const ISO_OLDEST = '2020-01-01T00:00:00.000Z'
const ISO_OLDER = '2020-01-01T00:00:01.000Z'
const LANDING = 'landing'
const ALPHA = 'alpha'
const ALPHA_TARGET = '/alpha'
const BETA = 'beta'
const BETA_TARGET = '/beta'
const DELTA_TARGET = '/delta'
const EPSILON_TARGET = '/epsilon'
type Row = Record<string, unknown>
const rowOf = (id: string, target: string, active: boolean, lastActiveAt: string): Row =>
  ({ target, active, label: id, lastActiveAt })
/** `landing` active and `alpha` cold: the state every act below starts from. */
const TWO_ROWS: Row = {
  order: [LANDING, ALPHA],
  [LANDING]: rowOf(LANDING, '/landing', true, ISO_OLDEST),
  [ALPHA]: rowOf(ALPHA, ALPHA_TARGET, false, ISO_OLDER),
}
/** `F-3`'s record: the same, with the row its act will seat. */
const THREE_ROWS: Row = {
  ...TWO_ROWS,
  order: [LANDING, ALPHA, BETA],
  [BETA]: rowOf(BETA, BETA_TARGET, false, ISO_OLDER),
}
/** `F-2`'s second arm: a value that seats TWO actives on purpose — the value the act itself composes — so the only
 *  lawful answer is the record's own normalisation (`D-140`, `D-142`). */
const TWO_ACTIVE: Row = {
  order: [LANDING, ALPHA],
  [LANDING]: rowOf(LANDING, '/landing', true, ISO_OLDEST),
  [ALPHA]: rowOf(ALPHA, ALPHA_TARGET, true, ISO_OLDER),
}

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

// ---- reading JSON without trusting it ---------------------------------------
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const num = (value: unknown): number | null => (typeof value === 'number' && Number.isFinite(value) ? value : null)
const arr = (value: unknown): unknown[] => (Array.isArray(value) ? (value as unknown[]) : [])
const objectList = (value: unknown): Json[] => arr(value).map(asObject).filter((entry): entry is Json => entry !== null)

/** **ONE NODE OF THE ANSWER PROJECTED BACK TO THE STORE'S OWN VALUE** (`D-134`, `D-143`): a passing `data.read`
 *  answers `{status, kind, path, value}` with `value` the release's `TieredNode` — an OBJECT node held as
 *  `{_tier, …members}` with its members INLINE and no `value` wrapper, an ARRAY node as
 *  `{_tier, value:[<node>, …]}` and a LEAF as `{_tier, value:<literal>}`. This battery's claim is the RECORD's
 *  content — its `order`, each row's `active` and `target` — and never the readout, so the node is projected
 *  ONCE here and every reader below keeps reading the record itself. **THE RULE IS THE SHAPE'S OWN AND NOT A
 *  GUESS**: a node is recognised by a STRING `_tier`, and the two-member own set `['_tier','value']` is the
 *  WRAPPER arm (a leaf and an array alike) while every other node carries its members inline. No member of the
 *  tab record this file reads is named `value`, so no object node here can be taken for the wrapper; a value
 *  that is no node at all — the profile file's own bytes — is handed back exactly as it stands. */
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

/** **THE RECORD AS THE SURFACE ANSWERS IT, OR AS THE STORE'S BYTES CARRY IT** — one reader for both, so no row
 *  compares oranges (`D-94`'s `recordView` precedent). A `data.read` answer carries `{status, kind, path, value}`
 *  whose `value` is the node `plainOf` above projects, so THE ANSWER'S SHAPE ENTERS HERE AND NOWHERE ELSE; the
 *  profile file carries the record alone and passes through untouched; a refusal carries neither, and answers
 *  `null`. */
function recordOf(answer: unknown): Json | null {
  const object = asObject(answer)
  if (object === null) return null
  const node = Object.prototype.hasOwnProperty.call(object, 'status') ? object['value'] : object
  return asObject(plainOf(node))
}
/** The record's rows, as the store's value carries them: every member that is not the `order` seat. */
const rowsOf = (value: Json | null): Array<{ id: string; row: Json }> =>
  value === null
    ? []
    : Object.entries(value).flatMap(([id, member]) => {
        const row = asObject(member)
        return id !== 'order' && row !== null ? [{ id, row }] : []
      })
const orderOf = (value: Json | null): string[] => (value === null ? [] : arr(value['order']).map(String))
const activeIds = (value: Json | null): string[] =>
  rowsOf(value).filter((entry) => entry.row['active'] === true).map((entry) => entry.id)
const rowValue = (value: Json | null, id: string): Json | null => {
  const found = rowsOf(value).find((entry) => entry.id === id)
  return found === undefined ? null : found.row
}
/** **THE BRIDGE'S READ ANSWER, WHICH SPELLS ITS ROWS DIFFERENTLY**: `tabs.read()` answers `{status, order, landing,
 *  rows: [{id, active, …}]}` — the crossing's row objects carry their own `id` (`docs/L2/store-tabs-record/
 *  interface.md` §2), so a driver body's observation is read on its own terms and never re-keyed. */
const bridgeActiveIds = (answer: unknown): string[] =>
  objectList(asObject(answer)?.['rows']).filter((row) => row['active'] === true).map((row) => String(row['id'])).sort()

// ---- the process table and the teardown (D-74) ------------------------------
interface Proc { pid: number; ppid: number; args: string }
/** How many kill-and-recheck sweeps a teardown gets: a swept tree can be replaced mid-sweep (a zygote forks a
 *  renderer), so one pass is a snapshot. Bounded, because an unbounded loop on a teardown path is the wedged
 *  harness the boot battery's `F-2` names. */
const REAP_PASSES = 20
const REAP_PAUSE_MS = 15
function pauseSync(ms: number): void {
  try { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms) } catch { /* no SharedArrayBuffer: the sweep still runs */ }
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
      try { args = readFileSync(`/proc/${entry}/cmdline`, 'utf8').split('\0').join(' ').trim() } catch { continue }
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
 *  of those — the two zygotes carry `--no-sandbox` and nothing else and are reachable only that way (`D-74`). */
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
      } catch { /* ESRCH: gone between the snapshot and the kill, which is the outcome wanted */ }
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
/** **THE LIVE BOOTS ARE SERIALISED, AND THIS MATRIX SAYS SO** (`D-1`, `D-43`; §4 of `docs/L1/focus-retirement.md`). Two
 *  batteries of this kind may not stand in two FILES at once: `npm test` runs the suite's files in parallel workers, and
 *  this battery and `tests/e2e/tier-readout/` each SPAWN the built bundle, so two Electron trees on one host red each
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
        try { rmSync(BOOT_LOCK, { recursive: true, force: true }) } catch { /* the exit net sweeps again */ }
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
      if (lockAgeMs() < BOOT_LOCK_SETTLE_MS) { await sleep(BOOT_LOCK_POLL_MS); continue }
      try { rmSync(BOOT_LOCK, { recursive: true, force: true }) } catch { /* somebody else swept it first */ }
      continue
    }
    if (!pidAlive(holder.pid) || Date.now() - holder.since > BOOT_LOCK_BOUND_MS * 2) {
      try { rmSync(BOOT_LOCK, { recursive: true, force: true }) } catch { /* somebody else swept it first */ }
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
    try { release() } catch { /* a release that threw has still run its own removal */ }
  }
  for (const dir of scratchProfiles) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort on an exit path */ }
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
 *  a snapshot of one file is not a snapshot of the build. `npm run build`'s FIRST arm is `npm run clean`, which deletes
 *  `dist/`, and three files of this suite run that build from other workers (`tests/e2e/bundle-boot-seam/`,
 *  `tests/integration/bundle-boot-seam/`, `tests/unit/bundle-boot-seam/`), so waiting on `main.mjs` alone let a boot start
 *  in the window where the main bundle was back and the renderer was not — MEASURED on the sibling spawning battery: a
 *  boot answered `ERR_FILE_NOT_FOUND` on `dist/renderer/index.html` instead of measuring its row. Every member below is a
 *  file this boot's ELECTRON LOAD reads (`npm run build`'s `outfile`/`outdir`/`cp` arms), and the wait is inside `BOUND_MS`,
 *  so an absent member is a named prerequisite failure and never a silent one (D-27, `strata/brief.md` §6). */
const BOOT_ARTIFACTS = [
  join(repoRoot, 'dist', 'main', 'main.mjs'),
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
/** Wait for the whole set above, inside the bound: a `statSync` that threw is not a reading, it is a file still being
 *  written, so every member is polled again on the same tick. */
async function artifactsWithin(): Promise<void> {
  const started = Date.now()
  while (Date.now() - started < BOUND_MS) {
    const seen = BOOT_ARTIFACTS.map((file) => {
      try {
        return existsSync(file) && statSync(file).size > 0
      } catch {
        return false
      }
    })
    if (seen.every(Boolean)) return
    await sleep(20)
  }
  const absent = BOOT_ARTIFACTS.filter((file) => {
    try {
      return !(existsSync(file) && statSync(file).size > 0)
    } catch {
      return true
    }
  })
  throw new Error(
    `the built artifacts are absent at [${absent.join(', ')}] within the ${BOUND_MS} ms bound. This battery boots the ` +
      `ARTIFACT \`npm run build\` produces — the main bundle, its preload, and the renderer's bundle and page — and never ` +
      `builds one (D-27, strata/brief.md §6): run \`npm run build\` first, and note that a sibling worker's ` +
      `\`npm run clean\` deletes \`dist/\` while it runs.`,
  )
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
/** One `data.read` at one address, answered as the store's value or `null`. The `CallAnswer`'s own `value` is the
 *  surface's answer (`{status, kind, path, value}`), so the record is the answer's `value` member and never the
 *  transport's envelope: one unwrap here, so no row compares an envelope with a record. */
async function readAddress(client: Client, path: string[]): Promise<Json | null> {
  return recordOf((await call(client, 'provident.data.read', { path })).value)
}
/** **THE PROFILE FILE AS THE STORE WROTE IT** — read BY THIS PROCESS and never through the crossing, because the tab
 *  record is `file` and a `mem` address has no key here by construction (D-84). An `absent` or unparsable file is a
 *  stated reading, not a throw. */
interface ProfileRead { present: boolean; keys: string[]; tabs: unknown; raw: string; reason: string }
function readProfile(profile: string): ProfileRead {
  const file = join(profile, PROFILE_FILE)
  if (!existsSync(file)) return { present: false, keys: [], tabs: null, raw: '', reason: 'the profile file is absent' }
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') return { present: true, keys: [], tabs: null, raw, reason: 'zero-length: the construction created it and no address has landed' }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    return { present: true, keys: [], tabs: null, raw, reason: `unparsable: ${error instanceof Error ? error.message : String(error)}` }
  }
  const object = asObject(parsed)
  if (object === null) return { present: true, keys: [], tabs: null, raw, reason: 'the file carries no object' }
  return { present: true, keys: Object.keys(object).sort(), tabs: object[TABS] ?? null, raw, reason: '' }
}
/** **A BOUNDED SETTLE FOR THE FILE** — the same poll `npm run crossings` takes (`D-94`): a `file` write reaches its
 *  bytes at the instance's own flush, not at the caller's turn, so the wait is the measurement. A poll that times out
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
 *  `scripts/electron-spawn.mjs` helper's shape, inlined here because this file's grain is the SDK and this battery
 *  imports no `scripts/` module (`tsconfig.tests.json` types the `tests/**` tree alone). A child that dies is
 *  reported through `onclose`/`onerror`, never swallowed. */
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
  async start(): Promise<void> { /* the child is already running */ }
  async send(message: JSONRPCMessage, _options?: TransportSendOptions): Promise<void> {
    if (this.closed) throw new Error('transport is closed')
    this.child.stdin?.write(`${JSON.stringify(message)}\n`)
  }
  async close(): Promise<void> {
    if (this.closed) return
    this.closed = true
    try { this.child.stdin?.end() } catch { /* already gone */ }
    try { this.child.kill('SIGKILL') } catch { /* already gone */ }
    this.onclose?.()
  }
  private onData(chunk: string): void {
    this.buffer += chunk
    let index = this.buffer.indexOf('\n')
    while (index !== -1) {
      const line = this.buffer.slice(0, index).trim()
      this.buffer = this.buffer.slice(index + 1)
      if (line !== '') {
        try { this.onmessage?.(JSON.parse(line) as JSONRPCMessage) } catch { /* a non-JSON line on stdout is not a protocol message */ }
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
 *  **THE BOOT WINDOW IS HELD UNDER THE HOST-WIDE LIVE-BOOT LOCK**: taken after the artifact is seen and released only
 *  once this boot's tree is proven gone, so no two spawning batteries' Electron trees contend (`D-94`, `D-74`). */
async function boot(profile: string, options: { renderer?: boolean } = {}): Promise<Boot> {
  const display = process.env['DISPLAY']
  if (typeof display !== 'string' || display === '') {
    throw new Error(
      'PREREQUISITE ERROR — no display server: DISPLAY is unset. This battery boots a REAL Electron BrowserWindow, so ' +
        'the renderer realm it drives cannot exist without one. Fix: `DISPLAY=:0 npm test`, or wrap the run in xvfb-run. ' +
        'This is a RED and never a skip (tests/e2e/secure-panels/panes-live.mjs:46).',
    )
  }
  const releaseBootLock = await acquireLiveBoot(`focus-retirement boot on ${profile}`)
  /** **THE ARTIFACT CHECK IS INSIDE THE LOCK, WHICH IS THE ONLY PLACE IT MEASURES ANYTHING** (`D-173`): taken BEFORE the
   *  lock, the "artifacts are here" reading is stale by the whole lock-queue wait (bounded `120 s`), and `npm run build`'s
   *  first arm is `npm run clean` — so a boot could spawn into the ~`54 ms` window in which `dist/` is absent. */
  try {
    await artifactsWithin()
  } catch (error) {
    // An artifact set that never arrived spawns nothing: the lock is released here, never left for the bound.
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
  child.stderr?.on('data', (chunk: unknown) => { trace += String(chunk) })
  // What the child did when it died, kept beside the trace (`D-173`): `close` is the event that carries both facts.
  const seen = observed()
  child.on('close', (code, signal) => { seen.ended = { code, signal } })
  const transport = new ChildStdioTransport(child)
  const client = new Client({ name: 'focus-retirement-e2e', version: '0.1.0' })
  // SET BEFORE `client.connect`, because the SDK's wrapper preserves the handler standing there and nothing else.
  transport.onerror = (error: Error) => { seen.error = error.message }
  try {
    await withBound(client.connect(transport), `initialize over stdio on ${profile}`, () => trace)
  } catch (error) {
    // A handshake that never settled still left a tree behind: it is reaped, PROVED gone, and only then is the lock
    // released — the order `D-74` fixes, kept on the failure path too. **AND THE THROW CARRIES WHAT THE CHILD DID**
    // (`D-173`): the exit code, the signal and the stderr tail, with the SDK's own error kept as the `cause`.
    try { transport.close() } catch { /* already gone */ }
    reap([profile], [child.pid ?? 0])
    releaseBootLock()
    throw diagnose(`initialize over stdio on ${profile}`, error, seen, trace)
  }
  const stop = async (): Promise<void> => {
    try { await client.close() } catch { /* already gone */ }
    try { transport.close() } catch { /* already gone */ }
    reap([profile], [child.pid ?? 0])
    await sleep(300)
    releaseBootLock()
  }
  const booted: Boot = { client, profile, trace: () => trace, stop }
  if (options.renderer !== false) {
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
/** **THE RENDERER READY, MEASURED AND NOT ASSUMED**: `provident.focus` crosses the app's own invoke seam, so a call
 *  before the renderer answers is answered `renderer not ready` and measures nothing. The app's own graph is asked
 *  for an authored node until it answers (`D-127`: a failed read is not a state, so this is a bounded wait). */
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
const OUT_ID = 'fr-out'
const DUMP_ID = 'fr-dump'
const SETTLE_READS_MAX = 20
const SETTLE_DELAY_MS = 250
/** ONE body per driven act. Every body frames its answer into ONE authored node (`FR!…!END_FR`, percent-encoded) so the
 *  observation comes back over the EXISTING `provident.get_rendered_html` and never as a new tool (D-18). The frame is
 *  STASHED, not written: a bridge call settles after this dispatch's render turn, so the write happens in `fr-dump`'s
 *  own synchronous turn — the crossing leg measured the alternative as an observation that never rendered. */
function actBody(label: string, act: string): string {
  return `function (ctx) {
  var frame = function (text) { window.__FR_FRAME = text }
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
  var held = (typeof window !== 'undefined' && typeof window.__FR_FRAME === 'string') ? window.__FR_FRAME : 'act=none;status=none;answer=null'
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'FR!' + held + '!END_FR' }])
}`
/** The driver's acts: `F-3`'s subscriber and its report, `F-4`'s bridge census. */
const ACTS: Array<{ id: string; label: string; act: string }> = [
  {
    id: 'fr-subscribe-tabs',
    label: 'subscribe-tabs',
    act: `var tabs = need('tabs')
    window.__FR_HITS = 0
    window.__FR_READING = null
    window.__FR_OFF = tabs.onChanged(function () {
      window.__FR_HITS = (window.__FR_HITS || 0) + 1
      tabs.read().then(function (reading) { window.__FR_READING = reading }, function () {})
    })
    ok({ subscribed: true, withdrawal: typeof window.__FR_OFF })`,
  },
  {
    id: 'fr-report-tabs',
    label: 'report-tabs',
    act: `var tabs = need('tabs')
    tabs.read().then(function (now) { ok({ hits: window.__FR_HITS || 0, reading: window.__FR_READING, now: now }) }, no)`,
  },
  {
    id: 'fr-report-view',
    label: 'report-view',
    act: `var view = need('view')
    ok({ commitFocus: typeof view.commitFocus, read: typeof view.read, members: Object.keys(view) })`,
  },
]
function driverEnvelope(): unknown {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'fr-driver' },
        children: [
          ...ACTS.map(({ id, label, act }) => ({
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
    const frame = /FR!([\s\S]*?)!END_FR/.exec(String(asObject(rendered.value)?.['renderedHtml'] ?? ''))
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
    try { parsed = JSON.parse(fields['answer']) } catch { /* a non-JSON answer stays a string */ }
    return { polls, status: fields['status'], answer: parsed }
  }
  return { polls: SETTLE_READS_MAX, status: 'timeout', answer: null }
}
function decodeSafe(value: string): string {
  try { return decodeURIComponent(value) } catch { return value }
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
    try { await booted.stop() } catch { /* a stop that threw has still withdrawn this boot */ }
  }
})
afterAll(() => {
  // THE INVARIANT, in this order and with nothing silent in it: reap every tree this file spawned, PROVE zero, and
  // only then remove the profiles — a directory removed under a live process leaves the survivor holding a file
  // nobody can find (`D-74`).
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort; the assert below is the guarantee */ }
  }
  // The host-wide live-boot lock is released here whatever this file measured — before the survivors assert, because a
  // lock held past a throwing teardown would wedge the sibling spawning battery for its whole bound (`D-74`).
  for (const release of liveBootReleases.splice(0)) {
    try { release() } catch { /* a release that threw has still run its own removal */ }
  }
  if (report.survivors.length > 0) {
    throw new Error(
      `focus-retirement teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor means this ` +
        `run leaks a process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

// ---- a shared boot helper used by two rows ----------------------------------
async function withBoot(name: string, body: (booted: Boot, profile: string) => Promise<void>, options: { driver?: boolean } = {}): Promise<void> {
  const profile = makeProfile(name)
  const booted = await boot(profile)
  boots.push(booted)
  if (options.driver === true) await loadDriver(booted)
  await body(booted, profile)
}

// ══════════════════════════════════════════════════════════════════════════════
// THE ROWS — one per matrix entry of `docs/L1/focus-retirement.md` §4
// ══════════════════════════════════════════════════════════════════════════════
describe('focus-retirement — the `focus` act lands on the tab record and the mirror family goes (D-141, D-142)', () => {
  it('F-1 — the `focus` act changes the active tab durably, and a restart preserves it', async () => {
    const profile = makeProfile('focus-retirement-f1')
    const first = await boot(profile)
    boots.push(first)
    let openedId = ''
    const seeded = await call(first.client, 'provident.data.write', { path: [TABS], tier: 'file', value: TWO_ROWS })
    expect(str(asObject(seeded.value)?.['status']), `the driver seeds the record through the agent's own route: data.write(['tabs'], file) → ${seeded.text.slice(0, 240)}`).toBe('committed')
    const before = await readAddress(first.client, [TABS])
    expect(activeIds(before), `the seeded record stands ONE active row, the landing entry: ${JSON.stringify(before)}`).toEqual([LANDING])

    // ── the seat: the act the tool exists for ────────────────────────────────
    const seat = await call(first.client, 'provident.focus', { target: ALPHA_TARGET })
    const seated = await readAddress(first.client, [TABS])
    expect(
      activeIds(seated),
      `after provident.focus({target:'${ALPHA_TARGET}'}) exactly ONE row reads active and it is the target's row (${ALPHA}) — ` +
        `the act must seat the TAB RECORD at ['tabs'] (file), not the ['focus'] mirror at mem. Act answer: ${seat.text.slice(0, 320)}; ` +
        `standing record: ${JSON.stringify(seated)}`,
    ).toEqual([ALPHA])
    expect(orderOf(seated), 'a seat changes flags and never the order (D-76)').toEqual([LANDING, ALPHA])
    const settled = await settleProfile(profile, (read) => activeIds(recordOf(read.tabs)).join() === ALPHA)
    expect(
      activeIds(recordOf(settled.read.tabs)),
      `the file \`${PROFILE_FILE}\` carries the act's write: ['tabs'] is declared at \`file\`, so the same bytes reach the disk ` +
        `(read after ${settled.polls} poll(s); keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}"; value=${JSON.stringify(settled.read.tabs)})`,
    ).toEqual([ALPHA])

    // ── the open: the tool's second declared argument ────────────────────────
    const opened = await call(first.client, 'provident.focus', { target: DELTA_TARGET, newTab: true })
    const afterOpen = await readAddress(first.client, [TABS])
    const order = orderOf(afterOpen)
    expect(
      order.length,
      `provident.focus({target:'${DELTA_TARGET}', newTab:true}) opens exactly ONE new tab row — the declared argument keeps its meaning ` +
        `(D-18, D-141). Act answer: ${opened.text.slice(0, 320)}; order=${JSON.stringify(order)}`,
    ).toBe(orderOf(before).length + 1)
    const minted = order.filter((id) => !orderOf(before).includes(id))
    expect(minted.length, `exactly one id in the order is new: order=${JSON.stringify(order)}`).toBe(1)
    openedId = minted[0] ?? ''
    expect(str(rowValue(afterOpen, openedId)?.['target']), `the opened row carries the caller's target \`${DELTA_TARGET}\`: row=${JSON.stringify(rowValue(afterOpen, openedId))}`).toBe(DELTA_TARGET)
    expect(rowValue(afterOpen, openedId)?.['active'], 'and it reads active').toBe(true)
    expect(activeIds(afterOpen), `and exactly one row is active — the one just opened, not two: ${JSON.stringify(activeIds(afterOpen))}`).toEqual([openedId])

    // ── the restart: the whole point of the tier ─────────────────────────────
    await first.stop()
    const settledOpen = await settleProfile(profile, (read) => activeIds(recordOf(read.tabs)).join() === openedId)
    expect(
      activeIds(recordOf(settledOpen.read.tabs)),
      `the file carries the OPEN row before the restart: active=${JSON.stringify(activeIds(recordOf(settledOpen.read.tabs)))} expected=[${openedId}]`,
    ).toEqual([openedId])
    const second = await boot(profile)
    boots.push(second)
    const survived = await readAddress(second.client, [TABS])
    expect(
      activeIds(survived),
      `A SECOND PROCESS on the same profile reads the row the act last seated — a RESTART PRESERVES the agent's act, which is what the ` +
        `\`file\` tier buys and what \`mem\` could never give (D-141). Standing record: ${JSON.stringify(survived)}`,
    ).toEqual([openedId])
    expect(str(rowValue(survived, openedId)?.['target']), `and the surviving row is still the one carrying \`${DELTA_TARGET}\``).toBe(DELTA_TARGET)
  }, ROW_MS)

  it('F-2 — the write is judged by `exactly-one-active`, never refused by a guard', async () => {
    await withBoot('focus-retirement-f2', async (booted) => {
      const seeded = await call(booted.client, 'provident.data.write', { path: [TABS], tier: 'file', value: TWO_ROWS })
      expect(str(asObject(seeded.value)?.['status']), `the seeded record stands: ${seeded.text.slice(0, 240)}`).toBe('committed')

      // ── arm (a): the value THE ACT COMPOSES seats two actives on purpose ────
      const act = await call(booted.client, 'provident.focus', { target: ALPHA_TARGET })
      const afterAct = await readAddress(booted.client, [TABS])
      expect(
        activeIds(afterAct),
        `the act's own value seats TWO active rows — the target's and the one that stood — and the RECORD's normalisation drops the older ` +
          `one: a guard that REFUSED the write would leave \`${LANDING}\` active, which is the older row. Act answer: ` +
          `${act.text.slice(0, 320)}; standing record: ${JSON.stringify(afterAct)}`,
      ).toEqual([ALPHA])

      // ── arm (b): the same shape at the surface whose answer names the pass ──
      const wrote = await call(booted.client, 'provident.data.write', { path: [TABS], tier: 'file', value: TWO_ACTIVE })
      const answer = asObject(wrote.value)
      expect(
        str(answer?.['status']),
        `a TWO-ACTIVE write is COMMITTED, not refused: the constraint repairs rather than rejecting the caller's act (D-140, D-142). ` +
          `Answer: ${wrote.text.slice(0, 320)}`,
      ).toBe('committed')
      expect(
        answer?.['repaired'],
        `and the answer NAMES the pass that rewrote it — a passing write answers \`repaired\` + \`log\` (D-103); ` +
          `log=${JSON.stringify(answer?.['log'])}`,
      ).toBe(true)
      const afterTwo = await readAddress(booted.client, [TABS])
      expect(
        activeIds(afterTwo).length,
        `what STANDS is exactly ONE active row, never two: active=${JSON.stringify(activeIds(afterTwo))}; ` +
          `log=${JSON.stringify(answer?.['log'])}`,
      ).toBe(1)
      // **THE `log` NAMES THE PAIR, AND IT IS ASSERTED AND NOT MERELY PRINTED** (`D-103`): a `repair-run` entry carrying
      // the constraint's own id is the evidence that the RECORD's judgement rewrote the value inside the caller's commit
      // — the same shape `tests/integration/central-data/message-log.test.ts`'s `L-1` measures at the same address.
      const runs = objectList(answer?.['log']).filter((entry) => entry['kind'] === 'repair-run')
      expect(
        runs.map((entry) => String(entry['id'])),
        `and the \`log\` carries the \`repair-run\` entry whose id is the constraint's (\`exactly-one-active\`), so the pass that ` +
          `settled the pair is named and not inferred: log=${JSON.stringify(answer?.['log'])}`,
      ).toContain('exactly-one-active')
    })
  }, ROW_MS)

  it('F-3 — the renderer follows the tab record\'s own push after the act', async () => {
    await withBoot('focus-retirement-f3', async (booted) => {
      const seeded = await call(booted.client, 'provident.data.write', { path: [TABS], tier: 'file', value: THREE_ROWS })
      expect(str(asObject(seeded.value)?.['status']), `the driver seeds three rows: ${seeded.text.slice(0, 240)}`).toBe('committed')
      const subscribed = await drive(booted.client, 'fr-subscribe-tabs', 'subscribe-tabs')
      expect(subscribed.status, `the driver's subscriber installed on the app's OWN bridge member \`window.provident.tabs.onChanged\` — answer ${JSON.stringify(subscribed.answer)}`).toBe('ok')

      const act = await call(booted.client, 'provident.focus', { target: BETA_TARGET })
      let hits = 0
      let reading: unknown = null
      let polls = 0
      for (let attempt = 1; attempt <= SETTLE_READS_MAX; attempt += 1) {
        await sleep(SETTLE_DELAY_MS)
        polls = attempt
        const report = await drive(booted.client, 'fr-report-tabs', 'report-tabs')
        const held = asObject(report.answer)
        hits = num(held?.['hits']) ?? 0
        reading = held?.['reading'] ?? null
        if (hits >= 1) break
      }
      expect(
        hits >= 1,
        `THE TAB RECORD'S OWN PUSH REACHED THE RENDERER AFTER THE ACT: the driver's subscriber counted ${String(hits)} delivery(ies) over ` +
          `${polls} poll(s). Zero means the act caused no record change, because it wrote a family the tab record does not own. ` +
          `Act answer: ${act.text.slice(0, 320)}`,
      ).toBe(true)
      expect(
        bridgeActiveIds(reading),
        `and the reading that delivery CAUSED names the target row active — the renderer re-read after the push and learned the new active ` +
          `tab (D-137). Reading: ${JSON.stringify(reading)?.slice(0, 320)}`,
      ).toEqual([BETA])
    }, { driver: true })
  }, ROW_MS)

  it('F-4 — `[\'focus\']` is absent: no address, no declaration, no route', async () => {
    await withBoot('focus-retirement-f4', async (booted) => {
      const read = asObject((await call(booted.client, 'provident.data.read', { path: [FOCUS] })).value)
      expect(
        str(read?.['status']),
        `\`['${FOCUS}']\` has no address: an agent's read answers ABSENT, never a reading. A \`read\` arm here means the family (and its ` +
          `creation repair) still stand. Answer: ${JSON.stringify(read)}`,
      ).toBe('absent')

      // **A VALUE THE FAMILY'S OWN PAIR WOULD ADMIT** — a legal mirror (`entries` naming its active id), and carrying no
      // `null` anywhere: the store's walk refuses `null`/`undefined` in a value at its BOUNDARY, so a null-carrying probe
      // would answer `value-not-admitted` for a reason that is not the absence this arm is about (`D-105`, `D-142`).
      const wrote = asObject((await call(booted.client, 'provident.data.write', { path: [FOCUS], tier: 'file', value: { entries: [{ id: 'probe', target: '/probe' }], activeId: 'probe' } })).value)
      expect(
        str(wrote?.['status']),
        `NO ROOT DECLARES \`['${FOCUS}']\` any more, so a \`file\` write at it is ADMITTED — a \`declared-tier\` refusal here means the ` +
          `\`viewDeclaredRoots\` entry outlived the declaration that names it (D-101, D-142's same-edit rule). Answer: ${JSON.stringify(wrote)}`,
      ).toBe('committed')

      const census = await drive(booted.client, 'fr-report-view', 'report-view')
      const members = asObject(census.answer)
      expect(
        str(members?.['commitFocus']),
        `the app's bridge carries NO focus route: \`typeof window.provident.view.commitFocus\` answers ${JSON.stringify(members?.['commitFocus'])} ` +
          `(members: ${JSON.stringify(members?.['members'])})`,
      ).toBe('undefined')
    }, { driver: true })
  }, ROW_MS)

  it('F-5 — totality: the tool keeps its name, the act opens a row, and only `[\'tabs\']` moves', async () => {
    await withBoot('focus-retirement-f5', async (booted) => {
      // **THE RECORD IS SEEDED FIRST, AND IT IS NOT A CONVENIENCE**: the record's repair keeps the entry whose bytes
      // MOVED as its written referent (then the removed entry's pre-position, then `order`'s row reading active — the
      // healing body in `src/main/tabs-record/index.ts`, whose precedence `docs/L3/store-tabs-record/design.md` §7 states
      // in THIS order AS THE CODE'S, `E-11` having landed), so a row opened over a record whose active is untouched is the one it keeps.
      // Without the seed the FIRST write is the landing instant, where the referent falls to `order`'s first active and
      // the seat assertion below would be asserting a state the repair never produces.
      const seeded = await call(booted.client, 'provident.data.write', { path: [TABS], tier: 'file', value: TWO_ROWS })
      expect(str(asObject(seeded.value)?.['status']), `the driver seeds two rows first: ${seeded.text.slice(0, 240)}`).toBe('committed')
      const listed = await withBound(booted.client.listTools(), 'tools/list', booted.trace)
      const names = listed.tools.map((tool) => tool.name)
      expect(
        names.includes('provident.focus'),
        `\`provident.focus\` keeps its NAME and its registration — the tool is a product need and D-142 changes its act, never its ` +
          `surface (D-18, D-141). Listed: ${names.join(', ')}`,
      ).toBe(true)

      const before = new Map<string, unknown>()
      for (const family of SURVIVING_FAMILIES) before.set(family, (await call(booted.client, 'provident.data.read', { path: [family] })).value)
      const tabsBefore = orderOf(await readAddress(booted.client, [TABS]))
      const act = await call(booted.client, 'provident.focus', { target: EPSILON_TARGET, newTab: true })
      const tabsAfter = await readAddress(booted.client, [TABS])
      expect(
        orderOf(tabsAfter).length,
        `the act opens exactly ONE new tab row: order before=${JSON.stringify(tabsBefore)} after=${JSON.stringify(orderOf(tabsAfter))}; ` +
          `act answer: ${act.text.slice(0, 320)}`,
      ).toBe(tabsBefore.length + 1)
      expect(activeIds(tabsAfter).length, `and it leaves the record with exactly ONE active row: ${JSON.stringify(activeIds(tabsAfter))}`).toBe(1)
      // **AND THE ROW IT OPENED IS THE ROW IT SEATED** — the design's cell says "opens exactly one new row *and seats it*",
      // and a row that opened one while leaving `landing` active would satisfy the count above and none of the claim.
      const opened = orderOf(tabsAfter).filter((id) => !tabsBefore.includes(id))
      expect(
        activeIds(tabsAfter),
        `and the NEW row is the one that reads active — opened=${JSON.stringify(opened)}, active=${JSON.stringify(activeIds(tabsAfter))}`,
      ).toEqual(opened)
      for (const family of SURVIVING_FAMILIES) {
        const after: unknown = (await call(booted.client, 'provident.data.read', { path: [family] })).value
        expect(
          after,
          `ONLY \`['${TABS}']\` MOVED: \`['${family}']\` is byte-identical across a focus act — the act is the tab record's and no other ` +
            `family's (D-142's four-roots-become-three is about the crossing, not about this write)`,
        ).toEqual(before.get(family) ?? null)
      }
    })
  }, ROW_MS)
})
