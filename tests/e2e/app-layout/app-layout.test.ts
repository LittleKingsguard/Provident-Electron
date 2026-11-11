// tests/e2e/app-layout/app-layout.test.ts — THE L1 BATTERY for `app-layout`: the ELEVEN e2e rows of
// `docs/L1/app-layout.md` rev 5 §5 (`AL-1`..`AL-11`), one row each, UNMARKED AND GATING (`tests/e2e/**` is never
// marked, `D-30`; authored after the rework sweep, `D-40`).
//
// WHAT THIS BATTERY EXISTS FOR. The unit's subject is the application's interface — a top-bar with the name at its
// left and the tabs row in the strip, four fixed zones, a stage derived from the remainder, a tabs row that RENDERS
// the record and SWITCHES it, and a menus pane of eighteen authored items whose route admits eleven (`D-176`,
// `D-180`, `D-181`, `D-185`, `D-187`, `D-189`, `D-191`, `D-192`). The tree at this head authors all of it
// (`src/shared/demo-envelope.ts`) and paints it (`src/renderer/renderer.ts`'s three subjects), so these rows are
// written against the DESIGN and not against what the app happens to do: a row that reds names the design claim it
// could not read, and its expected red is a finding for L2 rather than a licence to soften the assertion.
//
// EVERY ROW IS AN EXCHANGE AT A PROCESS BOUNDARY, and there are exactly three kinds here (`docs/L1/app-layout.md` §5):
//   · an AGENT's read or write over the built bundle's own stdio transport — `provident.get_rendered_html`,
//     `provident.list_targets`, `provident.dispatch`, `provident.data.read` / `.write`;
//   · a DRIVE of the realm's own members INSIDE its renderer realm — `navigator.windowControlsOverlay` (`AL-9`) and
//     `window.provident.menu` (`AL-11`), framed into one authored carrier node and read back through the EXISTING
//     `provident.get_rendered_html` measurement channel `tests/e2e/focus-retirement/` and
//     `tests/e2e/pane-drag-temp/` established (`D-94`), framed as `AL!…!END_AL`;
//   · the app's OWN profile file `<profile>/provident-profile.json`, read BY THIS PROCESS because a `mem` family is
//     measured by the ABSENCE of its key from those bytes and by nothing else (`D-84`, `AL-8`).
// NO ROW IMPORTS `src/**` OR `scripts/**`: the internals these rows would name are exactly the ones the unit moves,
// and `npm run typecheck:tests` types the `tests/**` tree alone (`tsconfig.tests.json`). NO ROW IS SKIPPED OR
// SOFTENED and this file carries no marker of any kind.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// **FIVE BOOTS FOR ELEVEN ROWS, AND THE GROUPING IS THE WHOLE ECONOMY OF THIS FILE** (`D-165`, `D-173`: at this file
// count roughly one run in two carries a spawn casualty, so a boot is the scarcest thing a battery spends). The L1
// table's own instrument column is what decides the grouping — the rows that need a driver envelope are `AL-9` and
// `AL-11`, and every other row is a plain `provident.get_rendered_html` (plus, where it names one, a `data` call):
//
//   · group `skeleton` — `AL-1`, `AL-2`, `AL-6`: three READ-ONLY rows over one boot's own page. They cannot disturb
//     each other (no write between them), and `AL-2` must read the record BEFORE the `tabs` group writes it.
//   · group `tabs`    — `AL-3`, `AL-4`, `AL-5`: one boot, three acts on ONE record, in the order the rows stand
//     (`AL-3` establishes the second tab the switch needs, `AL-4` moves the record's MARKER across a re-mint and reads
//     two deliveries' fresh rows for it — `D-205`'s measurement as a gating row, with the id churn asserted as the price
//     the app paid — and `AL-5` drives the stage from that record). Each row re-asserts its own premise, so a red row
//     leaves a state the next row still states.
//   · group `menus`   — `AL-7` alone: eighteen dispatches plus a rendered read and a transport ask between each, and
//     its DECLARED failure mode is that the app DIES (`quit`/`close`/`reload` reaching the window). A row that reds by
//     killing its boot must not take four sibling rows with it.
//   · group `view`    — `AL-8`, `AL-10`: both write `['zones']` and neither needs the driver channel; `AL-8`'s profile
//     read and `AL-10`'s two markup reads are independent, and `AL-8` stands first because its file reading is a
//     question about the SAME bytes `AL-10`'s pane write would move.
//   · group `driver`  — `AL-9`, `AL-11`: the two rows that need a body INSIDE the realm. ONE envelope, two acts.
//
// Five distinct boots, then (`skeleton`, `tabs`, `menus`, `view`, `driver`) — `5 < 11`, and the count is asserted at
// teardown. A group's boot is created by the first row of that group that needs it, kept alive only for its own group,
// and withdrawn before the next group asks; the groups are therefore strictly SEQUENTIAL, which is also what the
// host-wide live-boot lock requires (`D-94`: one live boot at a time, host-wide, so no two spawning batteries' Electron
// trees contend).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE ONE THING A DRIVER ENVELOPE CANNOT DO, AND WHY BOTH CONTROL ROWS ARE DRIVEN AT THE AGENT'S OWN DISPATCH**
// (`D-201`, `D-209`; measured here): `provident.load({kind:'envelope'})` reaches `Runtime.loadEnvelope`, whose FIRST
// statement is `tearDownGraph()` — the app's own graph, its minted tab rows and their DOM listeners are DISCARDED before
// any body of the loaded envelope can run. So the L1 table's `AL-3` instrument ("a driver-envelope body issues a
// `.click()` at a minted row's element") has no expressible form at this head: the row the body would click no longer
// exists by the time the body exists. **BOTH ROWS ARE THEREFORE DRIVEN AT THE BOUNDARY THAT DOES EXIST** — an agent's
// `provident.dispatch` at the control's own node id — **and since `D-209` THAT BOUNDARY REACHES THE ACT**: the minted tab
// row carries a live-function `handlers: [{name:'tab-row-act', event:'click', body}]` closure over this realm's own
// `focusActRoute`, and every menus item carries a wiring-installed `menu-item`/`click` body calling the same `menuRoleAct`
// the item's DOM listener calls — so a human clicks and an agent dispatches, one act with two causes and no new preload
// surface. **THE ANSWER ARRIVES ONE TURN LATE AND EACH ROW STATES HOW IT FORCES THAT TURN**: a menu body's route answer is
// written into the receipt carrier in the ROUTE PROMISE's continuation, and a re-read of the rendered page 0…2 000 ms
// after the act (measured: eight stamps) still read the previous answer, while the next dispatch's render turn made it
// readable at once — so `AL-7` issues a DUMP ACT at the carrier (a node with no handler, performing nothing) and spends
// its bound on the carrier's own text, and `AL-3` reads the RECORD, which is the store's answer and knows no render turn.
//
// **AND THE COMPUTED-STYLE INSTRUMENT `D-204` NAMES AS THE PROJECT'S MISSING ONE IS STILL MISSING FROM THIS BATTERY**,
// measured rather than assumed: `AL-10` stands on RENDERED MARKUP, because neither route to a computed style exists
// on a gating leg at this head — (i) the app boots through `Runtime.bootstrap()`, so `provident.code.get({path:''})`
// answers `{path:'', value:null}` and `code.set` refuses with "no envelope loaded": there is no envelope a probe body
// could be injected into; (ii) every driver envelope replaces the graph (the paragraph above), so a body reading
// `getComputedStyle` would compute the styles of the DRIVER's nodes and not the app's. What `AL-10` can honestly do is
// what `D-203` left measurable: after the CSS-text fix, the paint's figure is IN the `style` attribute, while the
// broken object spelling left it EMPTY — so the markup read now catches that whole class of silent no-op, and the row
// says in its own words that it reads markup and never computed style.
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON, in `tests/e2e/pane-drag-temp/`'s grain: a boot that
// publishes a load error is reported AT ONCE with that error and never as a timeout; a delivery is not the caller's
// turn, so a render that has not yet happened is polled inside a stated bound rather than assumed; and `afterAll`
// SIGKILLs every process tree this file spawned, PROVES zero survivors and only then removes the profiles (`D-74`).
import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import type { Transport, TransportSendOptions } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { JSONRPCMessage, MessageExtraInfo } from '@modelcontextprotocol/sdk/types.js'
import { afterAll, describe, expect, it } from 'vitest'

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
/** The landed argument vector minus its profile members (`scripts/electron-spawn.mjs`'s `baseArgs`, `D-94`). */
const BASE_ARGS = ['--mcp-transport=stdio', '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer',
  '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage']
/** The bound every wait is held to: a boot delayed by work this row does not control is not a defect. */
const BOUND_MS = 60_000
/** The row's own bound above the waits it contains. */
const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/

/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the store's one written name stands at
 *  `<profile>/provident-profile.json` (`src/main/data/store.ts`'s `PROFILE_FILE_NAME`), and this battery's grain is the
 *  built artifact, so the name is a literal and never an import (D-27, `AL-8`). */
const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful
 *  way to supply this run's grant (`D-85`, `D-94`'s seeded profile). `data` is among the groups because `AL-3`…`AL-10`
 *  reach `['tabs']`, `['panes']` and `['zones']` through `provident.data.*`. **`code` IS DELIBERATELY ABSENT**: no row
 *  of this battery drives a `code.*` route, and the measurement below says why one cannot be driven at all — the app
 *  boots through `Runtime.bootstrap()`, so the code surface carries no envelope to edit (`provident.code.get('')`
 *  answers `value: null` and `code.set` refuses "no envelope loaded"). A group that cannot be used is not granted. */
const SECURITY_SEED = 'provident-security.json'
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'data']

/** **THE FOUR ZONE IDS AND THE TWO PANE IDS, SPELLED AS LITERALS BECAUSE NO ROW MAY IMPORT THE CONSTANTS** (`D-27`).
 *  These are `DECLARED_ZONE_IDS` / `DECLARED_PANE_IDS`' membership as `src/shared/view-shape.ts` declares them, and
 *  the ENVELOPE spells the same four zone literals at its own site (`AL-10`'s `D-188` debt 2: the equality is measured
 *  and nothing derives it). */
const ZONE_IDS = ['top', 'bottom', 'left', 'right'] as const
const PANE_SIDEBARLESS = 'pane-a'
const PANE_MENUS = 'pane-menus'
/** **THE TWO HANDLE NODES' PUBLISHED IDS** (`D-192`, `D-193`): the gutter card's affordance and the menus pane's own
 *  left-edge strip — the nineteenth published name, the one `app-envelope`'s `endpoints` `19` counts. `AL-1` measures
 *  their PRESENCE and never their edge (§6 (vi): which edge a handle sits on is authored `css`, so no gating row of
 *  this battery reads it). */
const GUTTER_HANDLE_ID = 'gutter-horizontal'
const MENUS_HANDLE_ID = 'menus-vertical'
/** The authored app root, the overlay layer's first node (the root's FOLLOWING sibling, `C-5`), the root's LAST
 *  authored control, and the two authored terminal pages the stage holds. */
const APP_ROOT_ID = 'app-surface'
const OVERLAY_SCRIM_ID = 'overlay-scrim'
const OVERLAY_OPEN_ID = 'overlay-open'
const TABS_ROWS_ID = 'tab-rows'
const LANDING_PAGE_ID = 'tabs-landing-page'
const ERROR_PAGE_ID = 'tabs-error-page'
/** The ONE carrier a menus answer is written into — `AL-7`'s rendered read. */
const MENUS_RECEIPT_ID = 'menus-receipt'
/** The two record families' roots this battery writes at, and the tiers each is DECLARED at (`D-101`, `D-145`): a write
 *  at another tier is refused `declared-tier` before any store verb, which is `AL-8`'s own contrast. */
const PANES = 'panes'
const ZONES = 'zones'
const TABS = 'tabs'
const TIERS = { [ZONES]: 'mem', [PANES]: 'file', [TABS]: 'file' } as const
/** **THE SEVEN REFUSED ROLES, AS THE ROUTE REFUSES THEM** (`D-181`, `D-196`): the ruling's own list, and the list the
 *  envelope marks `disabled` with no handler. `AL-6` reads their rendering and `AL-7` the route's answer — the two
 *  halves of one decision, one row each. */
const REFUSED_ROLES = ['quit', 'reload', 'forcereload', 'toggledevtools', 'minimize', 'zoom', 'close'] as const
/** How many boundedly-re-read polls a render gets before its absence is a reading: a DELIVERY is not the caller's
 *  turn, so a write that returned has not necessarily repainted yet (`npm run crossings` polls for exactly this). */
const POLL_MAX = 14
const POLL_MS = 250

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
/** `StdioClientTransport`'s `env` is a closed `Record<string, string>`; `process.env` is not. */
const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))
const tail = (text: string, lines = 12): string => text.split('\n').slice(-lines).join('\n')

// ---- the casualty's instrument (`D-173`) -------------------------------------
/** A failed connect reports what the CHILD did — its exit code, its signal and the tail of its stderr — because
 *  `McpError -32000: Connection closed` cannot separate an OOM from an `exit 1` on a missing bundle. `onerror` is set
 *  BEFORE `client.connect`, because the SDK captures whatever handler stands there and wraps it. */
interface ChildEnd { code: number | null; signal: NodeJS.Signals | null }
interface Observed { ended: ChildEnd | null; error: string | null }
const observed = (): Observed => ({ ended: null, error: null })
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
const trunc = (text: string, max = 480): string => (text.length > max ? `${text.slice(0, max)}…` : text)
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
const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}
const owns = (value: unknown, key: string): boolean => {
  const held = asObject(value)
  return held !== null && Object.prototype.hasOwnProperty.call(held, key)
}
/** ONE NODE OF A `data.read` ANSWER PROJECTED BACK TO THE STORE'S OWN VALUE (`D-134`): an OBJECT node is
 *  `{_tier, …members}`, an ARRAY node is `{_tier, value:[<node>, …]}` and a LEAF is `{_tier, value:<literal>}`. The
 *  rows below ask the record's SHAPE, not the readout's, so the node is projected ONCE here; the readout's own shape
 *  is pinned by `tests/e2e/tier-readout/`. */
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
/** The WHOLE value a `data.read` answered, projected: `memberOf(answer,'value')` is the TieredNode, and `plainOf` is
 *  what the record's shape reads as. An `absent` answer projects to `null`. */
const recordOf = (answer: unknown): Json | null => asObject(plainOf(memberOf(answer, 'value')))

// ---- the process table and the teardown (`D-74`) ----------------------------
interface Proc { pid: number; ppid: number; args: string }
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
/** The same derivation the sibling spawning batteries use, so all of them contend on ONE path. */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
/** How long an UNOWNED lock directory is left alone before it is read as a holder that died between its `mkdir` and its
 *  own owner write: that window is microseconds wide, and sweeping it early would seat two boots at once. */
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
/** **TAKE THE HOST-WIDE LIVE-BOOT LOCK, OR RED WITH THE HOLDER NAMED.** A holder that was SIGKILLed ran no release, so
 *  it is read off its own pid (and off the lock's age, because a pid is reused) rather than waited out to the bound. */
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
          `at a time, host-wide) so their trees cannot contend, and this wait is bounded and stated, never silent.`,
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
/** **THE WHOLE ARTIFACT SET A BOOT LOADS, AND NOT ON ONLY ITS ENTRY POINT**: `npm run build`'s FIRST arm is
 *  `npm run clean`, and three files of this suite run that build from other workers, so waiting on `main.mjs` alone
 *  let a boot start in the window where the main bundle was back and the renderer was not (`D-173`'s ~`54 ms`). */
const BOOT_ARTIFACTS = [
  join(repoRoot, 'dist', 'main', 'main.mjs'),
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
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
const TIER_TOKENS = ['file', 'mem', 'temp'] as const
type Tier = (typeof TIER_TOKENS)[number]
/** ONE `provident.data.read` at one address: the WHOLE surface answer is returned — `{status, kind, path, value}`, an
 *  `absent` arm or the closed ledger — because the rows assert the answer's own members and never a member of it. */
async function readAt(client: Client, path: string[], tier?: Tier): Promise<CallAnswer> {
  const args: Record<string, unknown> = { path: [...path] }
  if (tier !== undefined) args['tier'] = tier
  return call(client, 'provident.data.read', args)
}
/** ONE `provident.data.write` at a caller-chosen tier. */
async function writeAt(client: Client, path: string[], tier: Tier, value: unknown): Promise<CallAnswer> {
  return call(client, 'provident.data.write', { path: [...path], tier, value })
}

// ---- the app's own rendered surface -----------------------------------------
interface HtmlReading { html: string; truncated: boolean }
/** **THE RENDERED HTML, AS THE APP'S OWN SURFACE ANSWERS IT** (`D-94`'s measurement channel, read-only half). A very
 *  large answer is answered as a census + digest + truncated preview by the server's own guard, so an answer with no
 *  `renderedHtml` member is REPORTED (`truncated`) rather than silently read as an empty page. */
async function renderedHtml(client: Client): Promise<HtmlReading> {
  const answer = await call(client, 'provident.get_rendered_html', {})
  const value = asObject(answer.value)
  const rendered = typeof value?.['renderedHtml'] === 'string' ? (value['renderedHtml'] as string) : ''
  const preview = typeof value?.['preview'] === 'string' ? (value['preview'] as string) : ''
  return { html: rendered !== '' ? rendered : preview, truncated: value?.['truncated'] === true }
}
/** **POLL THE APP'S OWN RENDERED SURFACE**, because a delivery is not the caller's turn: `until` reads the page, and a
 *  poll that spends its bound is RETURNED (with its poll count) and then answered by the row's own assertion. */
interface SurfaceReading extends HtmlReading { polls: number }
async function surfaceWithin(client: Client, until: (html: string) => boolean): Promise<SurfaceReading> {
  let read = await renderedHtml(client)
  for (let polls = 1; polls <= POLL_MAX; polls += 1) {
    if (until(read.html)) return { ...read, polls }
    await sleep(POLL_MS)
    read = await renderedHtml(client)
  }
  return { ...read, polls: POLL_MAX }
}

// ---- reading the rendered markup (the subject of nine of these rows) ------
/** ONE TAG, BY ITS `id` ATTRIBUTE — the engine emits `id="<the authored css/props id>"` on every node that carries one,
 *  and `data-node-id` on all of them, which is what makes the rendered markup an addressable reading (`D-194`). The
 *  match is on the WHOLE attribute value, so `id="top"` cannot be satisfied by `id="top-bar"`. */
const TAG = /<([a-z][a-z0-9]*)\b[^>]*>/g
function tagsOf(html: string): string[] {
  return [...html.matchAll(TAG)].map((match) => match[0])
}
function attrOf(tag: string, name: string): string | null {
  const match = new RegExp(`\\b${name}="([^"]*)"`).exec(tag)
  return match === null ? null : match[1]
}
function tagById(html: string, id: string): string | null {
  for (const tag of tagsOf(html)) if (attrOf(tag, 'id') === id) return tag
  return null
}
function tagHasClass(tag: string, token: string): boolean {
  const classes = attrOf(tag, 'class')
  return classes !== null && classes.split(/\s+/).includes(token)
}
/** **ONE NODE'S RENDERED `style` ATTRIBUTE**, as the paint's `css.style` write lands it: CSS TEXT, so the figure is IN
 *  the markup (`D-203`/`D-204` — the object spelling this row was written for left the attribute EMPTY, which is why a
 *  markup read now catches that whole class of silent no-op). `null` where the node carries no style at all. */
function styleOf(html: string, id: string): string | null {
  const tag = tagById(html, id)
  return tag === null ? null : attrOf(tag, 'style')
}
/** Whether a style text carries a declaration for `property` with `value` (`height: 40px`), whitespace tolerated. */
function styleDeclares(style: string | null, property: string, value: string): boolean {
  if (style === null) return false
  return new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*${value}\\s*(?:;|$)`).test(style)
}
/** Whether a style text names the property at all — what `AL-10` asks of the pane's UNPAINTED member. */
function styleNames(style: string | null, property: string): boolean {
  return style !== null && new RegExp(`(?:^|;)\\s*${property}\\s*:`).test(style)
}
/** **THE MINTED TAB ROWS, AND NOT THE PROTOTYPE**: a minted row carries the record's `target` as a bare attribute and its
 *  label as its text, while the def-root prototype carries neither (`D-199`). This is also how the row's own
 *  `data-node-id` is learned — read off the page and never remembered from a mint's answer (`D-182` m1). */
interface RenderedRow { nodeId: string; target: string; label: string; active: boolean }
function renderedRows(html: string): RenderedRow[] {
  return tagsOf(html).flatMap((tag): RenderedRow[] => {
    if (!tagHasClass(tag, 'tab-row')) return []
    const target = attrOf(tag, 'target')
    const nodeId = attrOf(tag, 'data-node-id')
    if (target === null || nodeId === null) return []
    const after = html.slice(html.indexOf(tag) + tag.length)
    const close = after.indexOf('<')
    const label = (close < 0 ? after : after.slice(0, close)).trim()
    return [{ nodeId, target, label, active: attrOf(tag, 'active') === 'true' }]
  })
}
/** THE MENUS' EIGHTEEN ITEMS, in DOM order, with the ROLE each node carries, its rendered label, whether it renders
 *  disabled, and — **THE ADDRESS AN AGENT'S DISPATCH NEEDS AND THE ONLY UNAMBIGUOUS ONE** (`D-209`) — the node's own
 *  `data-node-id`. **THE LABEL IS NOT AN ADDRESS**: `D-180`'s enumeration labels one item `Close` and the app authors a
 *  SECOND node with that very text (the overlay's own close control, `overlay-close`), so a label→node map built from
 *  `provident.list_targets` addresses the wrong node for `close` — measured: that dispatch ran the OVERLAY's body
 *  (`results:[null]`) and left the menus carrier untouched. The item's `menu-item` class is the criterion, and its own
 *  `data-node-id` is the address. */
interface RenderedItem { nodeId: string; role: string; label: string; disabled: boolean }
function renderedItems(html: string): RenderedItem[] {
  return tagsOf(html).flatMap((tag): RenderedItem[] => {
    if (!tagHasClass(tag, 'menu-item')) return []
    const role = attrOf(tag, 'role')
    const nodeId = attrOf(tag, 'data-node-id')
    if (role === null || nodeId === null) return []
    const after = html.slice(html.indexOf(tag) + tag.length)
    const close = after.indexOf('<')
    return [{ nodeId, role, label: (close < 0 ? after : after.slice(0, close)).trim(), disabled: attrOf(tag, 'disabled') === 'true' }]
  })
}
const menuCount = (html: string): number => tagsOf(html).filter((tag) => tagHasClass(tag, 'menus-menu')).length
/** **THE APP ROOT'S OWN SUBTREE AS THE MARKUP SPELLS IT**: from the authored root's tag to the overlay layer's FIRST
 *  node, which is its FOLLOWING SIBLING (`C-5`, `D-178` §3). What lies between them is the app's general surface, and
 *  its last `data-node-id` is what `AL-1` measures the opener against. */
function appSurfaceSlice(html: string): string | null {
  const root = html.indexOf(`id="${APP_ROOT_ID}"`)
  const layer = html.indexOf(`id="${OVERLAY_SCRIM_ID}"`)
  if (root < 0 || layer < 0 || layer < root) return null
  return html.slice(root, layer)
}

// ---- the profile file, as the store wrote it --------------------------------
interface ProfileRead { present: boolean; keys: string[]; raw: string; reason: string }
function readProfile(profile: string): ProfileRead {
  const file = join(profile, PROFILE_FILE)
  if (!existsSync(file)) return { present: false, keys: [], raw: '', reason: 'the profile file is absent' }
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') {
    return { present: true, keys: [], raw, reason: 'zero-length: the construction created it and no address has landed' }
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    return { present: true, keys: [], raw, reason: `unparsable: ${error instanceof Error ? error.message : String(error)}` }
  }
  const object = asObject(parsed)
  if (object === null) return { present: true, keys: [], raw, reason: 'the file carries no object' }
  return { present: true, keys: Object.keys(object).sort(), raw, reason: '' }
}
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
 *  `scripts/electron-spawn.mjs` helper's shape, inlined because this battery imports no `scripts/` module. */
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

interface Boot { client: Client; profile: string; trace: () => string; stop: () => Promise<void> }
/** Spawn the built bundle the way a client spawns it, on a scratch profile, and handshake over stdio. The two profile
 *  flags are ONE decision (`scripts/electron-spawn.mjs` §2.1 item 3): `--user-data-dir` is Chromium's and
 *  `--provident-user-data` is the app's own, and the store lands under the latter. Every row of this battery reads the
 *  RENDERER (a page, a realm, a painted style), so every boot asks for a renderer and a `DISPLAY` is its prerequisite —
 *  RED, never a skip. The boot window is held under the host-wide live-boot lock, and the artifact set is checked
 *  INSIDE that lock because `npm run build`'s first arm deletes `dist/` (`D-173`). */
async function boot(profile: string, why: string): Promise<Boot> {
  const display = process.env['DISPLAY']
  if (typeof display !== 'string' || display === '') {
    throw new Error(
      'PREREQUISITE ERROR — no display server: DISPLAY is unset. This battery boots the REAL Electron bundle, so the ' +
        'renderer realm these rows read cannot exist without one. Fix: `DISPLAY=:0 npx vitest run tests/e2e/app-layout/`, ' +
        'or wrap the run in xvfb-run. This is a RED and never a skip (tests/e2e/secure-panels/panes-live.mjs:46).',
    )
  }
  const releaseBootLock = await acquireLiveBoot(`app-layout ${why} boot on ${profile}`)
  try {
    await artifactsWithin()
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
  const client = new Client({ name: 'app-layout-e2e', version: '0.1.0' })
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
    reap([profile], [child.pid ?? 0])
    await sleep(300)
    releaseBootLock()
  }
  const booted: Boot = { client, profile, trace: () => trace, stop }
  try {
    await waitForRenderer(booted)
  } catch (error) {
    await stop()
    throw error
  }
  return booted
}
/** **THE RENDERER READY, MEASURED AND NOT ASSUMED**: every row reads the page's own rendering, so a read before the
 *  renderer answers measures nothing. The app's own graph is asked for an authored node until it answers. */
async function waitForRenderer(booted: Boot): Promise<void> {
  const started = Date.now()
  let last = '(no answer)'
  while (Date.now() - started < BOUND_MS) {
    const answer = await call(booted.client, 'provident.get_node_state', { target: { kind: 'cssId', cssId: LANDING_PAGE_ID } })
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

// ---- the driver envelope (the measurement channel, `D-94`) ------------------
const OUT_ID = 'al-out'
const DUMP_ID = 'al-dump'
const SETTLE_READS_MAX = 20
const SETTLE_DELAY_MS = 250
const FRAME = /AL!([\s\S]*?)!END_AL/
/** ONE body per driven act. Every body frames its answer into ONE authored node (`AL!…!END_AL`, percent-encoded) so the
 *  observation comes back over the EXISTING `provident.get_rendered_html` and never as a new tool (`D-18`). The frame is
 *  STASHED, not written: a bridge call settles after this dispatch's render turn, so the write happens in the dump
 *  body's own synchronous turn. **EVERY BODY CENSUSES THE MEMBER IT NEEDS BEFORE IT CALLS IT**, and reports the census
 *  in its own frame, so an absent member is a FRAMED READING and never a thrown TypeError that would red the row as a
 *  harness fault. */
function actBody(label: string, act: string): string {
  return `function (ctx) {
  var frame = function (text) { window.__AL_FRAME = text }
  var ok = function (answer) { frame('act=${label};status=ok;answer=' + encodeURIComponent(JSON.stringify(answer === undefined ? null : answer))) }
  var no = function (e) { frame('act=${label};status=error;answer=' + encodeURIComponent(String(e && e.message ? e.message : e))) }
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
  var held = (typeof window !== 'undefined' && typeof window.__AL_FRAME === 'string') ? window.__AL_FRAME : 'act=none;status=none;answer=null'
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'AL!' + held + '!END_AL' }])
}`
interface Act { id: string; label: string; act: string }
/** `AL-9`'s ONE act: the realm's own platform API, censused before it is read. **THIS IS THE ONE SUBJECT A DRIVER
 *  ENVELOPE IS THE RIGHT INSTRUMENT FOR** — the question is what the PLATFORM drew on the app's window, not what the
 *  app's own nodes render, so replacing the graph costs this row nothing (`D-179`'s contract, `D-178` §2). */
const WINDOW_CONTROLS_ACT: Act = {
  id: 'al-window-controls',
  label: 'window-controls',
  act: `var overlay = (typeof navigator !== 'undefined' && navigator.windowControlsOverlay) ? navigator.windowControlsOverlay : null
    if (overlay === null) { ok({ overlay: 'absent' }); return }
    var rect = (typeof overlay.getTitlebarAreaRect === 'function') ? overlay.getTitlebarAreaRect() : null
    ok({ overlay: 'present', visible: overlay.visible, rect: rect, keys: Object.keys(overlay) })`,
}
/** `AL-11`'s ONE act: the app's OWN `menu` bridge member, with a role that is NEITHER the eleven NOR the seven, and
 *  again with a malformed (non-string) one. Both arms are framed — a THROW reds the row as a throw, which is the
 *  subject — and the whole census of the bridge's top-level members rides along. */
const MENU_ARM_ACT: Act = {
  id: 'al-menu-arm',
  label: 'menu-arm',
  act: `var bridge = (typeof window !== 'undefined' && window.provident) ? window.provident : null
    if (bridge === null) { ok({ bridge: 'absent' }); return }
    var answer = { members: Object.keys(bridge), menu: typeof bridge.menu }
    if (typeof bridge.menu !== 'function') { answer.route = 'absent'; ok(answer); return }
    answer.route = 'present'
    var unknownRole = 'al-not-a-role-of-the-eighteen'
    var done = function (name, value) { answer[name] = value }
    bridge.menu(unknownRole).then(function (first) {
      done('unknown', first)
      return bridge.menu(42).then(function (second) { done('malformed', second); ok(answer) },
        function (e) { done('malformed', { threw: String(e && e.message ? e.message : e) }); ok(answer) })
    }, function (e) { done('unknown', { threw: String(e && e.message ? e.message : e) }); ok(answer) })`,
}
function driverEnvelope(acts: Act[]): unknown {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'al-driver' },
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
async function drive(client: Client, actId: string, label: string): Promise<{ polls: number; status: string; answer: unknown }> {
  await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: actId }, event: 'click' })
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    await sleep(SETTLE_DELAY_MS)
    await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: DUMP_ID }, event: 'click' })
    const rendered = await call(client, 'provident.get_rendered_html', {})
    const frame = FRAME.exec(String(asObject(rendered.value)?.['renderedHtml'] ?? ''))
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

// ---- the groups: five boots, eleven rows ------------------------------------
/** **THE GROUPS, AND WHY THE BOOT IS SHARED** (the file header's table): a boot is the scarcest thing a battery spends
 *  (`D-165`, `D-173`), so the rows that can read one process's own page share it. The groups are STRICTLY SEQUENTIAL —
 *  a new group's boot is only taken after the previous group's is PROVEN gone — because the live-boot lock is
 *  host-wide and a boot held open behind another would wedge its sibling batteries for their whole bound (`D-94`). */
type GroupName = 'skeleton' | 'tabs' | 'menus' | 'view' | 'driver'
interface Group { booted: Boot; profile: string }
const groups = new Map<GroupName, Group>()
let activeGroup: GroupName | null = null
let bootCount = 0
async function shared(name: GroupName): Promise<Group> {
  const held = groups.get(name)
  if (held !== undefined) return held
  if (activeGroup !== null) {
    const previous = groups.get(activeGroup)
    if (previous !== undefined) {
      try {
        await previous.booted.stop()
      } catch {
        /* a stop that threw has still withdrawn that boot */
      }
      groups.delete(activeGroup)
    }
  }
  bootCount += 1
  const profile = makeProfile(`app-layout-${name}`)
  const booted = await boot(profile, name)
  const group: Group = { booted, profile }
  groups.set(name, group)
  activeGroup = name
  return group
}
afterAll(async () => {
  // THE INVARIANT, in this order and with nothing silent in it: stop every boot, reap every tree this file spawned,
  // PROVE zero, and only then remove the profiles — a directory removed under a live process leaves the survivor
  // holding a file nobody can find (`D-74`).
  for (const [name, group] of [...groups.entries()]) {
    try {
      await group.booted.stop()
    } catch {
      /* a stop that threw has still withdrawn this boot */
    }
    groups.delete(name)
  }
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort; the assert below is the guarantee */
    }
  }
  for (const release of liveBootReleases.splice(0)) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  if (report.survivors.length > 0) {
    throw new Error(
      `app-layout teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor ` +
        `means this run leaks a process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
  // The count is a READING of this file's own economy, reported once: five boots for eleven rows.
  expect(bootCount, 'this battery makes FIVE boots for its eleven rows (the header’s grouping); a sixth boot is a row that did not share').toBeLessThanOrEqual(5)
})

/** **THE RECORD'S OWN SHAPE, AS A WRITE THE `tabs` CROSSING ADMITS** (`D-63`, `D-181`): the two rows and the `order`
 *  that names them. `AL-3` needs a SECOND tab because a switch to the only tab is no switch at all, and `AL-5` needs a
 *  row carrying an `error` member because the error terminal's witness is derived from exactly that member. */
interface TabRowValue { id: string; label: string; target: string; active: boolean; lastActiveAt: string; error?: string }
function tabsRecord(second: { active: boolean; label?: string; error?: string }): Json {
  const at = new Date().toISOString()
  const landing: TabRowValue = { id: 'landing', label: 'landing', target: LANDING_PAGE_ID, active: !second.active, lastActiveAt: at }
  const other: TabRowValue = { id: 'second', label: second.label ?? 'second', target: ERROR_PAGE_ID, active: second.active, lastActiveAt: at }
  if (second.error !== undefined) other.error = second.error
  return { landing, second: other, order: ['landing', 'second'] }
}

// ══════════════════════════════════════════════════════════════════════════════
// THE ROWS — one per matrix entry of `docs/L1/app-layout.md` §5
// ══════════════════════════════════════════════════════════════════════════════
describe('app-layout — the skeleton, the tabs row, the zones, the stage and the menus pane (D-176…D-192)', () => {
  // ── group `skeleton`: AL-1, AL-2, AL-6 — three read-only rows, one boot ──────
  it('AL-1 — the skeleton is the design\'s: top-bar, tabs row, four zones and a stage, two handles, and the opener last', async () => {
    const { booted } = await shared('skeleton')
    const surface = await renderedHtml(booted.client)
    expect(
      surface.truncated,
      `AL-1 PREREQUISITE — the rendered answer must carry the PAGE: a truncated answer (html length ` +
        `${String(surface.html.length)}) would let an absence below be the server's guard rather than the app's.`,
    ).toBe(false)
    const html = surface.html

    // ── the top-bar, its logo text, and the tabs-row node inside it ──────────
    const topBar = tagsOf(html).find((tag) => tagHasClass(tag, 'top-bar'))
    expect(
      topBar === undefined ? '(absent)' : 'present',
      `AL-1 — the top-bar node must render: the charter's first piece is a bar with the application's logo/name at its ` +
        `left and the tabs row in the strip the platform's controls leave (\`D-176\`, \`C-1\`). An absent node here is the ` +
        `declared failure mode "a node absent".`,
    ).toBe('present')
    const topBarText = ((): string => {
      const at = html.indexOf(topBar ?? '')
      if (at < 0) return ''
      const after = html.slice(at + (topBar ?? '').length)
      const close = after.indexOf('<')
      return (close < 0 ? after : after.slice(0, close)).trim()
    })()
    expect(
      topBarText.length > 0,
      `AL-1 — the top-bar must carry the logo/name as a CONTENT STRING and never a child node (\`D-177\`'s cut list): ` +
        `the text between its tag and its first child was ${JSON.stringify(trunc(topBarText, 80))}.`,
    ).toBe(true)
    expect(
      tagById(html, TABS_ROWS_ID),
      `AL-1 — the tabs-row node (\`${TABS_ROWS_ID}\`) must render INSIDE the top-bar strip: it is the mint's \`target\` and ` +
        `the row paint's subject (\`D-179\`, \`D-182\`).`,
    ).not.toBe(null)
    expect(
      html.indexOf('class="top-bar"') < html.indexOf(`id="${TABS_ROWS_ID}"`),
      `AL-1 — and it must stand INSIDE the top-bar, after it in the markup: that is the only place its \`no-drag\` means ` +
        `anything, and the strip is what the tabs row occupies between the name and the platform's controls (` +
        `\`C-10\`, \`D-183\`).`,
    ).toBe(true)

    // ── the four zones, in the arrangement's own order, and the stage between them ──
    const positions = ZONE_IDS.map((id) => ({ id, at: html.indexOf(`id="${id}"`) }))
    expect(
      positions.filter((held) => held.at < 0).map((held) => held.id),
      `AL-1 — all four zone nodes (\`${ZONE_IDS.join('`, `')}\`) must render: the arrangement is the charter's own ` +
        `nesting, and a missing zone is the declared failure mode "a zone missing" (\`D-176\`, \`D-185\`).`,
    ).toEqual([])
    const ordered = [...positions].sort((left, right) => left.at - right.at).map((held) => held.id)
    expect(
      ordered,
      `AL-1 — the zones must stand in the arrangement's ORDER — \`top\` (full width), then the row of \`left\` + stage + ` +
        `\`right\`, then \`bottom\` (full width) — and the markup's own order was [${ordered.join(', ')}] (\`D-176\`, \`D-185\`).`,
    ).toEqual(['top', 'left', 'right', 'bottom'])
    for (const zone of ZONE_IDS) {
      const tag = tagById(html, zone)
      expect(
        tag === null ? null : attrOf(tag, 'data-node-id'),
        `AL-1 — the \`${zone}\` zone must carry its \`data-node-id\`: the paint addresses a zone BY ID and every emitted ` +
          `element carries that attribute (\`D-177\`, \`D-194\`).`,
      ).not.toBe(null)
    }
    const stage = tagsOf(html).find((tag) => tagHasClass(tag, 'stage'))
    expect(
      stage === undefined ? '(absent)' : attrOf(stage, 'data-node-id') === null ? '(no data-node-id)' : 'present',
      `AL-1 — the stage must render between the zones, as the derived remainder: it is the otherwise unoccupied area the ` +
        `charter names, and it stores nothing and is painted by nothing (\`D-185\`).`,
    ).toBe('present')
    expect(
      tagById(html, LANDING_PAGE_ID) !== null && tagById(html, ERROR_PAGE_ID) !== null,
      `AL-1 — and the stage must hold the record's TWO authored terminal pages: the landing page and the error page are ` +
        `the stage's own content (\`D-178\` §3, \`C-5\`).`,
    ).toBe(true)

    // ── the TWO HANDLES, under their OWN published ids ───────────────────────
    const gutterHandle = tagById(html, GUTTER_HANDLE_ID)
    expect(
      gutterHandle === null ? '(absent)' : 'present',
      `AL-1 — the gutter card's handle must render under its own id \`${GUTTER_HANDLE_ID}\`: a node that carries no ` +
        `published id is a node no row can name, and \`AL-1\` measures its PRESENCE and nothing about its edge ` +
        `(\`D-189\`, \`C-13\`, §6 (vi)).`,
    ).toBe('present')
    const menusHandle = tagById(html, MENUS_HANDLE_ID)
    expect(
      menusHandle === null ? '(absent)' : 'present',
      `AL-1 — the menus pane's own handle must render under the NINETEENTH published id, \`${MENUS_HANDLE_ID}\` — the name ` +
        `\`D-192\` adds and the figure \`app-envelope\`'s \`endpoints\` \`19\` counts. A handle with no id of its own is the ` +
        `declared failure mode "a handle missing" (\`D-193\`).`,
    ).toBe('present')
    expect(
      menusHandle === null ? null : attrOf(menusHandle, 'axis'),
      `AL-1 — and the menus handle must carry its OWN axis token as \`props.axis\`, the bare attribute the affordance's ` +
        `own seam reads: the shape \`${GUTTER_HANDLE_ID}\` already has (\`D-192\`, \`D-193\`).`,
    ).toBe(MENUS_HANDLE_ID)
    expect(
      html.indexOf(`id="${MENUS_HANDLE_ID}"`) > html.indexOf(`id="${PANE_MENUS}"`) &&
        html.indexOf(`id="${MENUS_HANDLE_ID}"`) < html.indexOf('class="menus-menu"'),
      `AL-1 — and it must stand INSIDE the menus pane, before its items: the pane is a COLUMN at its own stored width and ` +
        `this is the strip its adjustable axis moves (\`D-192\`, \`C-13\`).`,
    ).toBe(true)

    // ── the app root's LAST authored control, and the layer that follows it ──
    const slice = appSurfaceSlice(html)
    expect(
      slice === null ? '(no app-surface subtree)' : 'present',
      `AL-1 — the whole layout must stand INSIDE \`${APP_ROOT_ID}\`, with the overlay layer as the root's FOLLOWING ` +
        `SIBLING: that is what makes the modal's \`inert\` scoping survive the re-parent (\`C-5\`, \`D-178\` §3, \`D-113\`).`,
    ).toBe('present')
    const surfaceNodes = slice === null ? [] : tagsOf(slice ?? '').filter((tag) => attrOf(tag, 'data-node-id') !== null)
    const openerAt = slice === null ? -1 : (slice ?? '').indexOf(`id="${OVERLAY_OPEN_ID}"`)
    expect(
      slice !== null && openerAt >= 0,
      `AL-1 — the overlay's opener must render as the app root's LAST authored control; it was ` +
        `${slice === null ? 'in a root that did not render' : `at byte ${String(openerAt)} of the root's subtree`}.`,
    ).toBe(true)
    const lastNodeId = surfaceNodes.length === 0 ? null : attrOf(surfaceNodes[surfaceNodes.length - 1] ?? '', 'id')
    expect(
      lastNodeId,
      `AL-1 — nothing may follow the opener inside the root, so the LAST node of the root's subtree must BE the opener: ` +
        `it reads \`${String(lastNodeId)}\` where an opener displaced from last is the declared failure mode "the opener ` +
        `displaced (the modal's scoping lost)" (\`C-5\`, \`D-178\` §3). Subtree nodes: ${String(surfaceNodes.length)}.`,
    ).toBe(OVERLAY_OPEN_ID)
  }, ROW_MS)

  it('AL-2 — the row is N and reads the record: one row per `order` entry, each with its own label, one active marker', async () => {
    const { booted } = await shared('skeleton')
    const html = (await renderedHtml(booted.client)).html
    const read = await readAt(booted.client, [TABS])
    expect(
      str(asObject(read.value)?.['status']),
      `AL-2 PREREQUISITE — the agent's own \`data.read(['${TABS}'])\` must answer \`read\`: the row count this row compares ` +
        `the page against is the RECORD's, so a refusal here would measure the data surface and not the rows. Observed: ` +
        `${trunc(read.text)}`,
    ).toBe('read')
    const record = recordOf(read.value)
    const order = arr(memberOf(record, 'order')).filter((entry): entry is string => typeof entry === 'string')
    expect(
      order.length,
      `AL-2 PREREQUISITE — the record must name at least one tab in \`order\` for the mint to have anything to render; ` +
        `observed order=${textOf(order)}.`,
    ).toBeGreaterThan(0)
    const rows = renderedRows(html)
    expect(
      rows.length,
      `AL-2 — the minted row COUNT must equal \`['${TABS}'].order\`'s length: the record names ${String(order.length)} ` +
        `tab(s) (${order.join(', ')}) and the rendered surface carries ${String(rows.length)} row(s). Zero rows is the ` +
        `declared failure mode "the mint never ran"; a count that is not the order's is the second (\`D-182\`).`,
    ).toBe(order.length)
    // ── each row carries its OWN label and its own node id, read against the record ──
    for (const tabId of order) {
      const held = asObject(memberOf(record, tabId))
      const label = str(memberOf(held, 'label')) ?? tabId
      const target = str(memberOf(held, 'target')) ?? ''
      const row = rows.find((candidate) => candidate.target === target)
      expect(
        row === undefined ? '(no row for this target)' : `${row.nodeId}/${row.label}`,
        `AL-2 — the record's tab \`${tabId}\` (target \`${target}\`, label \`${label}\`) must render ONE row carrying that ` +
          `target as a bare attribute, its own \`data-node-id\` and its OWN label as its text (\`D-201\`: the label rides ` +
          `the datum). Rows seen: ${textOf(rows)}`,
      ).toBe(`${(row ?? { nodeId: '' }).nodeId}/${label}`)
      expect(
        row === undefined ? null : row.nodeId === '' ? null : row.nodeId,
        `AL-2 — and that row's \`data-node-id\` must be a real address: it is the only thing this battery can name a ` +
          `minted row by (\`D-182\` m1, \`D-194\`).`,
      ).not.toBe(null)
    }
    // ── the active marker: exactly one, on the row the record marks ──────────
    const activeIds = order.filter((tabId) => memberOf(memberOf(record, tabId), 'active') === true)
    const activeRows = rows.filter((row) => row.active)
    expect(
      activeRows.map((row) => row.target),
      `AL-2 — the active marker must stand on EXACTLY the row the record marks active: the record names ` +
        `${textOf(activeIds)} as active and the surface marks ${textOf(activeRows.map((row) => row.target))}. Two ` +
        `actives or none is the declared failure mode (\`props.active\` rides the datum, \`D-205\`).`,
    ).toEqual(activeIds.map((tabId) => str(memberOf(memberOf(record, tabId), 'target')) ?? ''))
  }, ROW_MS)

  it('AL-6 — the pane is the menu it claims: four menus, eighteen labelled items, the seven refused rendered disabled', async () => {
    const { booted } = await shared('skeleton')
    const html = (await renderedHtml(booted.client)).html
    const menus = tagsOf(html).filter((tag) => tagHasClass(tag, 'menus-menu'))
    expect(
      menus.length,
      `AL-6 — the pane must render \`D-180\`'s FOUR measured menus; the surface carried ${String(menus.length)}. A menu ` +
        `missing is the declared failure mode "a menu missing".`,
    ).toBe(4)
    const menuNames = menus.map((tag) => {
      const after = html.slice(html.indexOf(tag) + tag.length)
      const close = after.indexOf('<')
      return (close < 0 ? after : after.slice(0, close)).trim()
    })
    expect(
      menuNames.every((name) => name.length > 0),
      `AL-6 — every menu must carry its MEASURED name as its content string: the four names read ` +
        `${textOf(menuNames)}, and a nameless menu is a menu the operator cannot tell from its neighbour.`,
    ).toBe(true)
    const items = renderedItems(html)
    expect(
      items.length,
      `AL-6 — the pane must render EIGHTEEN items (the static enumeration \`1 + 7 + 7 + 3\`, \`D-180\`, \`D-188\`); the ` +
        `surface carried ${String(items.length)}: ${textOf(items.map((item) => item.role))}. A count that is not eighteen ` +
        `is the declared failure mode.`,
    ).toBe(18)
    expect(
      items.filter((item) => item.label.length === 0).map((item) => item.role),
      `AL-6 — every item must be LABELLED (the label is the authored content string, \`D-177\`); these carried none.`,
    ).toEqual([])
    // ── the seven refusals are DATA in the rendering, and the guard is `main`'s ──
    const disabled = items.filter((item) => item.disabled).map((item) => item.role).sort()
    expect(
      disabled,
      `AL-6 — the SEVEN the ruling refused must render \`disabled\` and the eleven admitted must not: \`D-181\`'s list is ` +
        `[${[...REFUSED_ROLES].sort().join(', ')}] and the surface marked [${disabled.join(', ')}]. A refused item that ` +
        `renders enabled is the declared failure mode "a refused item dispatchable" — and the refusal would then be ` +
        `\`main\`'s alone, which \`D-196\` measured as the guard that matters.`,
    ).toEqual([...REFUSED_ROLES].sort())
  }, ROW_MS)

  // ── group `tabs`: AL-3, AL-4, AL-5 — one boot, three acts on one record ──────
  it('AL-3 — the row is a CONTROL: a click at a minted row moves the record\'s active member', async () => {
    const { booted } = await shared('tabs')
    // ── the premise: a SECOND tab, because a switch to the only tab is no switch ──
    // **AND ITS TARGET IS THE ERROR TERMINAL CARRYING ITS WITNESS**: the error page's witness is DERIVED FROM THE ROW's
    // own `error` member (`tabs-client.ts`'s `deriveTabsWitness`; the rule `AL-5` states and uses), so a record whose
    // second row names the error page WITHOUT an `error` member asks the stage to show a page the record holds no
    // witness for — measured: that delivery leaves the landing page standing and the error page hidden, which is the
    // witness answered correctly rather than a repaint missing. The witness is this row's PREREQUISITE and not its
    // subject, exactly as the record itself is.
    const seeded = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: false, error: 'al-3-switch' }))
    expect(
      str(asObject(seeded.value)?.['status']),
      `AL-3 PREREQUISITE — the record must name two tabs before a switch can move anything: the agent's ` +
        `\`data.write(['${TABS}'], tier:'file')\` with \`landing\` + \`second\` answered ${trunc(seeded.text, 320)}. This ` +
        `write is this row's own act and not its subject.`,
    ).toBe('committed')
    const surface = await surfaceWithin(booted.client, (text) => renderedRows(text).length === 2)
    const rows = renderedRows(surface.html)
    expect(
      rows.length,
      `AL-3 PREREQUISITE — the two tabs must render as two rows before either can be clicked: the surface carried ` +
        `${String(rows.length)} row(s) over ${String(surface.polls)} bounded re-read(s): ${textOf(rows)}`,
    ).toBe(2)
    const other = rows.find((row) => !row.active)
    expect(
      other === undefined ? '(no non-active row)' : other.nodeId,
      `AL-3 PREREQUISITE — one row must be the non-active one this row clicks: ${textOf(rows)}`,
    ).not.toBe('(no non-active row)')
    const before = recordOf((await readAt(booted.client, [TABS])).value)
    const beforeActive = arr(memberOf(before, 'order')).filter((tabId) => typeof tabId === 'string' && memberOf(memberOf(before, tabId as string), 'active') === true)
    expect(
      beforeActive,
      `AL-3 PREREQUISITE — exactly one tab must be active before the click, or "moves" has no meaning: ${textOf(beforeActive)}`,
    ).toHaveLength(1)

    // ── the act: an agent's dispatch AT THE MINTED ROW'S OWN NODE ID ─────────
    // **THE ROW'S BODY IS THE AGENT-REACHABLE HALF, AND IT IS MEASURED HERE** (`D-209`): the mint's datum carries
    // `handlers: [{ name: 'tab-row-act', event: 'click', body }]` — a CLOSURE over the realm's own `focusActRoute` and
    // the seat's own `target` — so this dispatch RUNS the SAME act `attachRowAct`'s DOM listener calls, and neither path
    // retires the other. **THE L1 TABLE'S INSTRUMENT IS STILL INEXPRESSIBLE AND THAT IS WHY THE BOUNDARY IS THIS ONE**:
    // a driver-envelope body cannot `.click()` a minted row, because an envelope's load TEARS THE APP'S GRAPH DOWN
    // (`Runtime.loadEnvelope`'s first statement) and the row with it (`D-201`).
    const clicked = await call(booted.client, 'provident.dispatch', { target: { kind: 'nodeId', nodeId: other?.nodeId ?? '' }, event: 'click' })
    expect(
      clicked.ok,
      `AL-3 — the agent's own \`provident.dispatch\` at the minted row \`${String(other?.nodeId)}\` must be answered: ` +
        `\`${trunc(clicked.text, 320)}\``,
    ).toBe(true)
    // ── AND THE BODY'S OWN WORD, BEFORE THE RECORD IS READ: a body that ran with ANOTHER seat's value is caught here ──
    // `dispatch`'s `results` is where a handler body's return arrives (`D-209`'s measurement, re-measured here), so this
    // is the ONE place the row can read WHAT the click ran and WHICH target it closed over — the record below can only
    // say that something moved.
    expect(
      arr(memberOf(clicked.value, 'results')),
      `AL-3 — the minted row's DISPATCH BODY must RUN and answer the seat it closed over: \`provident.dispatch\` at ` +
        `\`${String(other?.nodeId)}\` answered results=${textOf(memberOf(clicked.value, 'results'))} where the row's own ` +
        `\`handlers\` body answers \`focus ${String(other?.target)}\` (the target its datum carries, \`D-209\`). An empty ` +
        `\`results\` is a node whose declared bodies did not run; a word naming another target is a body bound to the ` +
        `wrong seat.`,
    ).toEqual([`focus ${String(other?.target)}`])
    // ── the record's active member MOVES ────────────────────────────────────
    let after = before
    let polls = 0
    let afterActive: unknown[] = beforeActive
    let moved = false
    for (let attempt = 1; attempt <= POLL_MAX; attempt += 1) {
      polls = attempt
      after = recordOf((await readAt(booted.client, [TABS])).value) ?? before
      afterActive = arr(memberOf(after, 'order')).filter(
        (tabId) => typeof tabId === 'string' && memberOf(memberOf(after, tabId as string), 'active') === true,
      )
      if (afterActive.length === 1 && afterActive[0] !== beforeActive[0]) {
        moved = true
        break
      }
      await sleep(POLL_MS)
    }
    // **THE DIAGNOSIS, TAKEN ONLY WHERE THE READING FAILED AND NEVER AS ITS SUBSTITUTE** (`D-208`'s discipline: the row
    // is the instrument, the act is the subject). If the record did not move, the act is asked the SAME question the
    // body asked it — `provident.focus` routes to the very `focusActRoute` the closure calls (`backend.invoke('focus')`)
    // — so a red names whether the act REFUSED and with which word, instead of guessing at a lag.
    let actAnswer = '(not asked: the record moved, so the act performed)'
    if (!moved) {
      const asked = await call(booted.client, 'provident.focus', { target: other?.target ?? '' })
      actAnswer = trunc(asked.text, 700)
    }
    expect(
      { before: beforeActive, after: afterActive },
      `AL-3 — the record's active member must MOVE when the minted row is clicked: it read ${textOf(beforeActive)} before ` +
        `the act and ${textOf(afterActive)} after ${String(polls)} re-read(s). **THE MECHANISM THE ROW NOW READS**: the ` +
        `minted row carries a live-function \`handlers\` body (\`D-209\`), \`provident.dispatch\` runs it, and that body ` +
        `calls this realm's own \`focusActRoute({ target })\` — the SAME act the DOM \`click\` listener calls — which seats ` +
        `the row in the record's terms and writes \`['${TABS}', <row id>]\` at \`file\` through the \`data.write\` ` +
        `passthrough, so the record this row reads is the act's own product. The body's word arrived as ` +
        `\`${textOf(arr(memberOf(clicked.value, 'results')))}\`; the act, asked directly with the same target ` +
        `(\`provident.focus\`), answers ${actAnswer}.`,
    ).toEqual({ before: ['landing'], after: ['second'] })
    // ── and the stage repaints, one body deciding both pages (`C-4`) ─────────
    // **THE SUBJECT ABOVE PASSED; THIS ARM IS A SECOND CLAIM THE SAME CLICK OWES** (`C-4`, `D-129`): the row's switch is
    // the record's, and the stage is driven from the record by ONE body, so a switch must move both pages. The record
    // this row seeds gives the error terminal its witness (see the premise), so both writes are owed and both are read.
    const repaint = await surfaceWithin(booted.client, (text) => {
      const landing = styleOf(text, LANDING_PAGE_ID)
      const error = styleOf(text, ERROR_PAGE_ID)
      return styleDeclares(landing, 'display', 'none') && styleDeclares(error, 'display', 'block')
    })
    expect(
      repaint.polls < POLL_MAX || (styleDeclares(styleOf(repaint.html, LANDING_PAGE_ID), 'display', 'none') && styleDeclares(styleOf(repaint.html, ERROR_PAGE_ID), 'display', 'block')),
      `AL-3 — and the stage must REPAINT onto the newly active tab's target: after the act the surface read ` +
        `landing=${textOf(styleOf(repaint.html, LANDING_PAGE_ID))} error=${textOf(styleOf(repaint.html, ERROR_PAGE_ID))} over ` +
        `${String(repaint.polls)} bounded re-read(s), where the record's active member had moved to ` +
        `${textOf(afterActive)} — so the ERROR page follows the record and the LANDING page does NOT hide. **THE MEASURED ` +
        `CAUSE, AND IT IS \`AL-5\`'S OWN SUBJECT REACHED THROUGH THIS ROW'S CLICK**: the landing page's \`display\` write ` +
        `is issued by the SAME delivery that then mints the tab rows (\`driveLayoutRegions\` (c) then \`driveTabsRows\`), ` +
        `and the mint's render is what leaves the landing page's figure standing at the authored value — the upstream ` +
        `placement-routing defect this unit lives with (\`D-182\`, upstream-owned, \`D-5\`/\`D-52\`, recorded at \`AL-5\`). ` +
        `The declared failure mode "the stage not repainted" (\`C-4\`, \`D-129\`: one body decides both pages) is ` +
        `therefore read on ONE page and not on the other: this arm is red on the landing half ALONE, and no part of it ` +
        `says an agent's dispatch failed to reach the act — that is the arm above, and it passed.`,
    ).toBe(true)
  }, ROW_MS)

  it('AL-4 — the marker MOVES across a re-mint and the fresh rows are still CONTROLS: every id churns, and that churn is the price', async () => {
    const { booted } = await shared('tabs')
    // **THIS ROW'S SUBJECT IS WHAT THE APP CHOSE, AND IT IS THE OPPOSITE HALF OF WHAT `keyField` WOULD HAVE BOUGHT**
    // (`D-208`'s reading of this row, `D-201`, `D-202`, `D-205`). `keyField` was REMOVED, not lost: with it a re-mint answers
    // `minted: []` and REUSES each matched node, re-applying only the datum's source anchors, so a `props`-carried marker
    // FROZE at the value it was first composed with. Without it every delivery mints every row FRESH, `props.active` is
    // composed at each mint, and the attach turn re-attaches beside it. So this row asserts TWO properties where the old
    // one asserted one — **the marker MOVES**, and **every row is a NEW node that is STILL A CONTROL** — and it names the
    // PRICE of both rather than hiding it: DOM churn on every `['tabs']` delivery. **THE CONTROL IS CLAUSE 1**: restore
    // `keyField: 'id'` and the marker stops moving, which is the red this row was re-grained to be able to produce.
    const rowFor = (rows: RenderedRow[], target: string): RenderedRow | undefined => rows.find((row) => row.target === target)
    /** THE MARKER AS THE PAGE SPELLS IT, one entry per authored tab target (`D-205`: `props.active` reaches the attribute
     *  AT MINT, and a fresh mint is the whole of its mechanism). A target the page does not carry answers a SENTINEL, so
     *  an absent row is a reading of the comparison and never a silent absence from it. */
    const markerOf = (rows: RenderedRow[]): Json => {
      const held: Json = {}
      for (const target of [LANDING_PAGE_ID, ERROR_PAGE_ID]) held[target] = rowFor(rows, target)?.active ?? '(no row)'
      return held
    }
    /** EVERY RENDERED ROW'S OWN ADDRESS, by the target its datum carries — read OFF THE PAGE and never remembered from a
     *  mint's answer (`D-182` m1). */
    const idsOf = (rows: RenderedRow[]): Json => {
      const held: Json = {}
      for (const row of rows) held[row.target] = row.nodeId
      return held
    }
    /** THE RECORD'S OWN MARKER in the same per-target terms: the AUTHORITY the rendering is compared against, because a
     *  rendered value that disagrees with the record IS a stale one — the exact product of the removed key (`D-201`). */
    const recordMarkerOf = (record: Json | null): Json => {
      const held: Json = {}
      for (const tabId of arr(memberOf(record, 'order'))) {
        if (typeof tabId !== 'string') continue
        const row = memberOf(record, tabId)
        const target = str(memberOf(row, 'target'))
        if (target !== null) held[target] = memberOf(row, 'active') === true
      }
      return held
    }
    /** THE RECORD'S ACTIVE TARGETS — the ACT's own effect, read at the store (`focusActRoute` S8/S9): the marker as the
     *  repair left it, in `order`'s terms, so no tab id has to be spelled here. */
    const activeTargets = (record: Json | null): string[] =>
      arr(memberOf(record, 'order')).flatMap((tabId): string[] => {
        if (typeof tabId !== 'string') return []
        if (memberOf(memberOf(record, tabId), 'active') !== true) return []
        return [str(memberOf(memberOf(record, tabId), 'target')) ?? `(row ${tabId} carries no target)`]
      })
    /** THE RECORD'S STAMP FOR ONE ROW, by the target that row carries: the act's S8 product is ONE write of that row with
     *  a FRESH `lastActiveAt` (`rowForSeat`'s clock), so the stamp is where a body that reached no act can be told from one
     *  that performed — `dispatch`'s `results` cannot tell them apart (`D-209`'s cost (ii): the body answers its own word
     *  whether or not the act lands). */
    const stampOf = (record: Json | null, target: string): string | null => {
      for (const tabId of arr(memberOf(record, 'order'))) {
        if (typeof tabId !== 'string') continue
        const row = memberOf(record, tabId)
        if (str(memberOf(row, 'target')) === target) return str(memberOf(row, 'lastActiveAt'))
      }
      return null
    }
    // ── delivery 1: the marker stands on the LANDING row, and every row's address is read off it ──
    // **THE PREMISE IS THIS ROW'S OWN** (`tabsRecord`), because `AL-3` leaves the record with its SECOND tab active: this
    // row writes the record it must start from, and a red row still leaves that state standing for `AL-5`. **THE `error`
    // MEMBER IS NOT THIS ROW'S SUBJECT** (`AL-5`'s witness rule): it is carried so the record has the shape the battery's
    // other two rows write, and nothing below is a reading about the stage.
    const seeded = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: false, error: 'al-4-marker' }))
    expect(
      str(asObject(seeded.value)?.['status']),
      `AL-4 PREREQUISITE — the delivery the FIRST reading is taken from must commit: ` +
        `\`data.write(['${TABS}'], tier:'file')\` answered ${trunc(seeded.text, 320)}.`,
    ).toBe('committed')
    const first = await surfaceWithin(booted.client, (text) => {
      const rows = renderedRows(text)
      return rows.length === 2 && rowFor(rows, LANDING_PAGE_ID)?.active === true && rowFor(rows, ERROR_PAGE_ID)?.active === false
    })
    const before = renderedRows(first.html)
    const beforeIds = idsOf(before)
    const beforeMarker = markerOf(before)
    expect(
      beforeMarker,
      `AL-4 PREREQUISITE — two rows must stand, the LANDING one marked and the other NOT, before a MOVE has anything to ` +
        `move: ${textOf(beforeMarker)} over ${String(first.polls)} bounded re-read(s).`,
    ).toEqual({ [LANDING_PAGE_ID]: true, [ERROR_PAGE_ID]: false })
    // ── CLAUSE 2 (b) (i) — THE FRESH ROW FOR THE TAB ALREADY SHOWN: dispatched, and the ACT'S OWN WRITE is the reading ──
    // **EACH FRESH ROW MUST STILL BE A CONTROL, AND THAT IS ONE CLAIM PER ROW**: this is the row for the tab the record
    // already shows, so the act's product is the row's fresh stamp and the marker must NOT move — the two halves of one
    // `focusActRoute` call, read in the state where its own write is the whole change. The other row's arm follows, at the
    // address the shift write's delivery mints.
    const landingFresh = str(beforeIds[LANDING_PAGE_ID]) ?? ''
    const stampBefore = stampOf(recordOf((await readAt(booted.client, [TABS])).value), LANDING_PAGE_ID)
    const clicked = await call(booted.client, 'provident.dispatch', {
      target: { kind: 'nodeId', nodeId: landingFresh },
      event: 'click',
    })
    expect(
      clicked.ok,
      `AL-4 — the agent's own \`provident.dispatch\` at the FRESH row \`${landingFresh}\` must be answered: ` +
        `\`${trunc(clicked.text, 320)}\`. That id was minted by the delivery this row has just read, so an unanswered ` +
        `dispatch at it is a row that did not survive its own delivery.`,
    ).toBe(true)
    expect(
      arr(memberOf(clicked.value, 'results')),
      `AL-4 — the fresh row must RUN ITS OWN SEAT'S BODY and answer it: dispatch at \`${landingFresh}\` answered ` +
        `results=${textOf(memberOf(clicked.value, 'results'))} where that row's datum answers \`focus ${LANDING_PAGE_ID}\` ` +
        `(\`D-209\`). **WHAT THIS PROVES, AND WHAT IT DOES NOT**: the node is a NEW one — its id was not the previous ` +
        `delivery's — and it carries a live body closed over ITS OWN seat, so the re-mint re-made the row as a CONTROL and ` +
        `not as a picture of one. The \`click\` listener \`attachRowAct\` installs BESIDE that body is the HUMAN's arm of ` +
        `the SAME act and is not addressable from this boundary (\`D-209\`), so what gates here is the datum-side reach on ` +
        `a fresh address; the listener's per-mint re-attachment rests on the same premise (\`D-202\`) and is stated, not ` +
        `measured.`,
    ).toEqual([`focus ${LANDING_PAGE_ID}`])
    let stampAfter = stampBefore
    for (let attempt = 1; attempt <= POLL_MAX; attempt += 1) {
      stampAfter = stampOf(recordOf((await readAt(booted.client, [TABS])).value), LANDING_PAGE_ID)
      if (stampAfter !== stampBefore) break
      await sleep(POLL_MS)
    }
    expect(
      stampAfter,
      `AL-4 — and the fresh row must ACT, and not merely answer: its body calls this realm's own \`focusActRoute\`, whose ` +
        `S8 product is ONE write of the \`${LANDING_PAGE_ID}\` row with a fresh \`lastActiveAt\`, so the record's stamp for ` +
        `that row must advance — it read ${textOf(stampBefore)} and then ${textOf(stampAfter)}. **THIS IS THE ARM THAT ` +
        `SEPARATES THE CLOSURE FROM THE ACT**: \`D-209\`'s cost (ii) is that the body answers its own word whether or not ` +
        `the act lands, so \`results\` above proves the body RAN and this proves the act PERFORMED.`,
    ).not.toBe(stampBefore)
    // ── and the delivery THAT ACT caused: the ids churn once more, and the marker stays where the act left it ──
    const second = await surfaceWithin(booted.client, (text) => {
      const rows = renderedRows(text)
      return rows.length === 2 && rows.every((row) => {
        const was = str(beforeIds[row.target])
        return was !== null && was !== row.nodeId
      })
    })
    const secondRows = renderedRows(second.html)
    const secondIds = idsOf(secondRows)
    const secondMarker = markerOf(secondRows)
    expect(
      { before: beforeMarker, afterAct: secondMarker },
      `AL-4 — the act on the tab ALREADY SHOWN must leave the marker WHERE IT STANDS: the two deliveries read ` +
        `${textOf(beforeMarker)} and then ${textOf(secondMarker)} over ${String(second.polls)} bounded re-read(s), and the ` +
        `second is the delivery the act's own write caused (\`S8\` writes that one row and no other, \`D-136\`). A marker ` +
        `that MOVED here would be an act seating a row the caller did not name.`,
    ).toEqual({ before: { [LANDING_PAGE_ID]: true, [ERROR_PAGE_ID]: false }, afterAct: { [LANDING_PAGE_ID]: true, [ERROR_PAGE_ID]: false } })
    // ── CLAUSE 2 (a) — THE ROWS ARE FRESH: THE CHURN IS ASSERTED AS THE COST, NEVER LAMENTED AS A FAILURE ────
    const kept: string[] = []
    const churned: string[] = []
    for (const row of secondRows) {
      const was = str(beforeIds[row.target])
      if (was === null) continue
      if (was === row.nodeId) kept.push(`${row.target} = ${row.nodeId}`)
      else churned.push(`${row.target}: ${was} → ${row.nodeId}`)
    }
    expect(
      kept,
      `AL-4 — NOT ONE row may keep its previous \`data-node-id\`: ${textOf(kept)} stood across the delivery, where every ` +
        `\`['${TABS}']\` delivery mints every row FRESH because the mint declares NO \`keyField\` (\`D-202\`). **THIS IS THE ` +
        `PRICE THE APP ACCEPTED, AND THIS ROW ASSERTS IT RATHER THAN APOLOGISING FOR IT**: N tabs' DOM nodes are replaced ` +
        `on every delivery, which \`D-201\` records as "the cheaper of the two failures" and the only one that leaves a ` +
        `\`props\`-carried value correct. A GREEN here — an id that SURVIVED — would mean the price had gone un-paid, i.e. ` +
        `that \`keyField\` had come back; that is what reds the marker clauses above, and this clause is where the trade is ` +
        `stated. **So an id in this battery is never an address across a delivery**, which is why each dispatch re-reads ` +
        `its own node first.`,
    ).toEqual([])
    expect(
      churned.length,
      `AL-4 — and both surviving rows must have been RE-MINTED, so both ids must differ from the previous delivery's: ` +
        `${textOf({ before: beforeIds, after: secondIds })} over ${String(second.polls)} bounded re-read(s), where ` +
        `\`D-202\` measured \`node-76/77 → node-80/81\` and \`D-205\` \`node-125/126 → node-143/144\`.`,
    ).toBe(2)
    // ── the act's other direction: ONE write moving the record's own flag, so the next delivery re-mints on it ──
    const shifted = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: true, error: 'al-4-marker' }))
    expect(
      str(asObject(shifted.value)?.['status']),
      `AL-4 PREREQUISITE — the write that MOVES the marker must commit, or no delivery is owed for it: ` +
        `\`${trunc(shifted.text, 320)}\`.`,
    ).toBe('committed')
    const third = await surfaceWithin(booted.client, (text) => {
      const rows = renderedRows(text)
      return rows.length === 2 && rowFor(rows, ERROR_PAGE_ID)?.active === true && rowFor(rows, LANDING_PAGE_ID)?.active === false
    })
    const thirdRows = renderedRows(third.html)
    const thirdIds = idsOf(thirdRows)
    const afterMarker = markerOf(thirdRows)
    // ── CLAUSE 1 — THE MARKER MOVES, AND NO ROW KEEPS A STALE VALUE (`D-205`, four readings, now gating) ─────
    expect(
      { before: secondMarker, after: afterMarker },
      `AL-4 — the record's active marker must MOVE across a re-mint, and NO row may keep a stale value: the two deliveries ` +
        `read ${textOf(secondMarker)} and then ${textOf(afterMarker)} over ${String(third.polls)} bounded re-read(s), ` +
        `where \`D-205\`'s four-reading measurement requires the flag on the OTHER row. **AND THIS CLAUSE IS THE ROW'S ` +
        `CONTROL**: RESTORE \`keyField: 'id'\` AND IT IS WHAT REDS. \`D-201\` measured a keyed re-mint answering ` +
        `\`minted: []\`, REUSING each matched node and re-applying only the datum's source anchors, so a reused node keeps ` +
        `the \`props\` it was first composed with — \`${LANDING_PAGE_ID}\` would still read \`active="true"\` and ` +
        `\`${ERROR_PAGE_ID}\` \`active="false"\` while the record says the reverse. **A STABLE ID IS EXACTLY WHAT MAKES THIS ` +
        `CLAUSE RED**, which is the trade \`D-208\` recorded: the old subject (ids held stable) is REPLACED rather than ` +
        `restored, and the property it asked for is now the failure this row is built to report.`,
    ).toEqual({
      before: { [LANDING_PAGE_ID]: true, [ERROR_PAGE_ID]: false },
      after: { [LANDING_PAGE_ID]: false, [ERROR_PAGE_ID]: true },
    })
    // ── and the rendering must agree with the RECORD, row by row: the same control, read from the other side ──
    const standing = recordOf((await readAt(booted.client, [TABS])).value)
    const recordMarker = recordMarkerOf(standing)
    expect(
      { rendered: afterMarker, record: recordMarker },
      `AL-4 — every rendered marker must AGREE with the record's own flag for that row: the page read ` +
        `${textOf(afterMarker)} where \`data.read(['${TABS}'])\` holds ${textOf(recordMarker)}. **A ROW CARRYING THE VALUE ` +
        `IT WAS FIRST MINTED WITH IS THE \`keyField\` FREEZE ITSELF** (\`D-201\`: a reused node ignores the changed ` +
        `\`props\` under \`rows-reuse-shape-ignored\`), so this arm reds for the same restored key the clause above reds ` +
        `for — and it reds even for a reader willing to call one comparison a coincidence.`,
    ).toEqual({
      rendered: { [LANDING_PAGE_ID]: false, [ERROR_PAGE_ID]: true },
      record: { [LANDING_PAGE_ID]: false, [ERROR_PAGE_ID]: true },
    })
    // ── and the churn is PER DELIVERY, not once ever: the shift write owed a delivery of its own ──
    const keptAgain: string[] = []
    for (const target of [LANDING_PAGE_ID, ERROR_PAGE_ID]) {
      const was = str(secondIds[target])
      const now = str(thirdIds[target])
      if (was !== null && was === now) keptAgain.push(`${target} = ${String(now)}`)
    }
    expect(
      keptAgain,
      `AL-4 — and the delivery the shift write owed must have churned the ids AGAIN: ${textOf(keptAgain)} stood across it, ` +
        `where ${textOf({ before: secondIds, after: thirdIds })} is what the two deliveries read. **THE COST IS PER ` +
        `DELIVERY AND NOT "ONCE EVER"**, which is why \`D-194\`'s "one listener per row, ever" could not survive the ` +
        `per-mint attach \`D-201\` chose, and why nothing here remembers an id between two acts.`,
    ).toEqual([])
    // ── CLAUSE 2 (b) (ii) — THE OTHER FRESH ROW, dispatched at the address THIS delivery minted ──
    const errorFresh = str(thirdIds[ERROR_PAGE_ID]) ?? ''
    const clickedOther = await call(booted.client, 'provident.dispatch', {
      target: { kind: 'nodeId', nodeId: errorFresh },
      event: 'click',
    })
    expect(
      clickedOther.ok,
      `AL-4 — the SECOND fresh row must be dispatchable too: \`provident.dispatch\` at \`${errorFresh}\` answered ` +
        `\`${trunc(clickedOther.text, 320)}\`. "Each new row is still a control" is not a claim about one of the two.`,
    ).toBe(true)
    expect(
      arr(memberOf(clickedOther.value, 'results')),
      `AL-4 — and it must answer ITS OWN seat and not its sibling's: results=` +
        `${textOf(memberOf(clickedOther.value, 'results'))} where that row's datum answers \`focus ${ERROR_PAGE_ID}\`. A ` +
        `word naming \`${LANDING_PAGE_ID}\` here would be a body bound to the wrong row's seat, which is the one thing the ` +
        `per-mint datum exists to make impossible.`,
    ).toEqual([`focus ${ERROR_PAGE_ID}`])
    let movedTo: string[] = []
    for (let attempt = 1; attempt <= POLL_MAX; attempt += 1) {
      movedTo = activeTargets(recordOf((await readAt(booted.client, [TABS])).value))
      if (movedTo.length === 1 && movedTo[0] === ERROR_PAGE_ID) break
      await sleep(POLL_MS)
    }
    // **THE DIAGNOSIS, TAKEN ONLY WHERE THE READING FAILED AND NEVER AS ITS SUBSTITUTE** (`D-208`'s discipline, `AL-3`'s
    // own form): if the marker did not come to rest on the row just clicked, the act is asked the SAME question the body
    // asked it — `provident.focus` routes to the very `focusActRoute` the row's body calls (`backend.invoke('focus')`) — so
    // a red names whether the act REFUSED, and with which word, instead of guessing at a lag.
    let actAnswer = '(not asked: the marker moved onto the clicked row, so the act performed)'
    if (!(movedTo.length === 1 && movedTo[0] === ERROR_PAGE_ID)) {
      actAnswer = trunc((await call(booted.client, 'provident.focus', { target: ERROR_PAGE_ID })).text, 900)
    }
    expect(
      movedTo,
      `AL-4 — and the second fresh row must ACT as well, moving the record's marker ONTO ITS OWN target: the record reads ` +
        `${textOf(movedTo)} after that dispatch, where \`focusActRoute\` seats the row carrying \`${ERROR_PAGE_ID}\`. Both ` +
        `halves are therefore measured on FRESH nodes — one act whose product is its row's stamp, one whose product is the ` +
        `marker itself — so the marker is a live value and not a value painted once at a boot. The act, asked directly ` +
        `with the same target (\`provident.focus\`), answers ${actAnswer}.`,
    ).toEqual([ERROR_PAGE_ID])
    // ── and the marker moves BACK, so this row leaves the record where its own premise found it ──
    // **THE THIRD MOVE, AND ITS POINT IS TWO-FOLD** (`D-205`: the marker is a DATUM VALUE and not a mechanism): it is read
    // in the direction a record write carries it a SECOND time — the first was this row's own seed — and it leaves
    // `['tabs']` with the LANDING tab active, which is the state the app boots on and the one `AL-5`'s own premise expects.
    // **A MARKER THAT CAN MOVE ONE WAY AND NOT THE OTHER WOULD NOT BE A VALUE**: it would be a value painted once, which is
    // `D-201`'s freeze arriving by another road, so both directions are read on purpose.
    const restored = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: false, error: 'al-4-marker' }))
    expect(
      str(asObject(restored.value)?.['status']),
      `AL-4 PREREQUISITE — the write that returns the marker to the landing tab must commit: ` +
        `\`${trunc(restored.text, 320)}\`.`,
    ).toBe('committed')
    const back = await surfaceWithin(booted.client, (text) => {
      const rows = renderedRows(text)
      return rows.length === 2 && rowFor(rows, LANDING_PAGE_ID)?.active === true && rowFor(rows, ERROR_PAGE_ID)?.active === false
    })
    const backMarker = markerOf(renderedRows(back.html))
    expect(
      backMarker,
      `AL-4 — and the marker must move BACK where the record says so: the surface read ${textOf(backMarker)} over ` +
        `${String(back.polls)} bounded re-read(s) after the record named the landing tab again, where the two deliveries ` +
        `above had read ${textOf(afterMarker)}. Three deliveries, six readings of two rows, and the flag followed the ` +
        `RECORD every time — which is the whole of \`D-205\`'s finding and of this row's subject.`,
    ).toEqual({ [LANDING_PAGE_ID]: true, [ERROR_PAGE_ID]: false })
  }, ROW_MS)

  it('AL-5 — the stage obeys the ACTIVE tab: one page shown, the other hidden, one body deciding both', async () => {
    const { booted } = await shared('tabs')
    // ── arm (a): the landing tab active ─────────────────────────────────────
    const landingState = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: false, label: 'landing' }))
    expect(
      str(asObject(landingState.value)?.['status']),
      `AL-5 PREREQUISITE — the record must name the landing tab active before the first read: ` +
        `\`${trunc(landingState.text, 320)}\``,
    ).toBe('committed')
    const withLanding = await surfaceWithin(booted.client, (text) => styleDeclares(styleOf(text, LANDING_PAGE_ID), 'display', 'block'))
    const landingStyle = styleOf(withLanding.html, LANDING_PAGE_ID)
    const errorStyle = styleOf(withLanding.html, ERROR_PAGE_ID)
    expect(
      { landing: landingStyle, error: errorStyle },
      `AL-5 — with the landing tab active the landing page must be SHOWN and the error page HIDDEN: the surface read ` +
        `landing=${textOf(landingStyle)} error=${textOf(errorStyle)} over ${String(withLanding.polls)} bounded ` +
        `re-read(s). Both shown is the declared failure mode "both pages rendered" (\`C-4\`, \`D-129\`).`,
    ).toEqual({ landing: expect.stringContaining('display: block'), error: expect.stringContaining('display: none') })
    // ── arm (b): the error tab's target made active ──────────────────────────
    // **THE ERROR TERMINAL'S WITNESS IS DERIVED FROM A ROW'S `error` MEMBER** (`tabs-client.ts`'s `deriveTabsWitness`),
    // so the tab made active here must carry one — this is the record's own shape and not a harness convenience.
    const errorState = await writeAt(booted.client, [TABS], 'file', tabsRecord({ active: true, error: 'al-arm-b' }))
    expect(
      str(asObject(errorState.value)?.['status']),
      `AL-5 PREREQUISITE — the error tab must be made active through the record: ` +
        `\`${trunc(errorState.text, 320)}\``,
    ).toBe('committed')
    const withError = await surfaceWithin(booted.client, (text) => styleDeclares(styleOf(text, ERROR_PAGE_ID), 'display', 'block'))
    const landingAfter = styleOf(withError.html, LANDING_PAGE_ID)
    const errorAfter = styleOf(withError.html, ERROR_PAGE_ID)
    expect(
      { landing: landingAfter, error: errorAfter },
      `AL-5 — with the error tab active the ERROR page must be shown and the LANDING page hidden — one body deciding ` +
        `both (\`C-4\`, \`D-129\`). The surface read landing=${textOf(landingAfter)} error=${textOf(errorAfter)} over ` +
        `${String(withError.polls)} bounded re-read(s): the error page follows the record and the landing page does NOT ` +
        `hide, so BOTH pages render — the declared failure mode, measured. The landing page's \`display\` write is issued ` +
        `by the same delivery that then mints the rows (\`driveLayoutRegions\` (c) then \`driveTabsRows\`), and the mint's ` +
        `render is what leaves the landing page's figure standing at the authored value: the upstream placement-routing ` +
        `defect this unit lives with (\`D-182\`, upstream-owned, \`D-5\`/\`D-52\`).`,
    ).toEqual({ landing: expect.stringContaining('display: none'), error: expect.stringContaining('display: block') })
  }, ROW_MS)

  // ── group `menus`: AL-7 — eighteen dispatches, one boot that may die ────────
  it('AL-7 — eighteen render, eleven dispatch, seven refuse by name, and the agent\'s session survives', async () => {
    const { booted } = await shared('menus')
    const html = (await renderedHtml(booted.client)).html
    const items = renderedItems(html)
    expect(
      items.length,
      `AL-7 PREREQUISITE — the eighteen items must render before they can be dispatched: ${String(items.length)} did.`,
    ).toBe(18)
    // ── the address book: each RENDERED item's own `data-node-id`, and the graph must confirm it ──────────
    // **AND THE ITEM'S OWN `menu-item`/`click` HANDLER MUST BE VISIBLE ON THE AGENT'S OWN SURFACE** (`D-209`): the wiring
    // installs a live-function body per item as a `handlers` state-slice at boot, which is why `provident.list_targets`
    // shows one `click` handler named after the envelope's own item token on every one of the eighteen — INCLUDING the
    // seven, which author none (their refusal is `main`'s, never the rendering's).
    const targets = await call(booted.client, 'provident.list_targets', {})
    const nodes = objectList(asObject(targets.value)?.['nodes'])
    const byNodeId = new Map<string, Json>()
    for (const node of nodes) {
      const nodeId = str(node['nodeId'])
      if (nodeId !== null && nodeId !== '') byNodeId.set(nodeId, node)
    }
    const missing = items.filter((item) => !byNodeId.has(item.nodeId)).map((item) => item.role)
    expect(
      missing,
      `AL-7 PREREQUISITE — every rendered item must be an ADDRESSABLE node of the app's own graph (` +
        `\`provident.list_targets\`), or "dispatch at each of the eighteen" has no instrument: unaddressable ` +
        `[${missing.join(', ')}]. Addresses: ${textOf(items.map((item) => [item.role, item.nodeId]))}`,
    ).toEqual([])
    const unwired = items
      .filter((item) => {
        const handlers = objectList(memberOf(byNodeId.get(item.nodeId), 'handlers'))
        return !handlers.some((held) => str(held['name']) === 'menu-item' && str(held['event']) === 'click')
      })
      .map((item) => item.role)
    expect(
      unwired,
      `AL-7 — every one of the EIGHTEEN items must carry the wiring-installed \`menu-item\`/\`click\` body, the seven ` +
        `included: the agent's arm of the act is that body, and \`provident.list_targets\` is where an agent reads it ` +
        `(\`D-209\`). Items with no such handler: [${unwired.join(', ')}]. A node missing here is a node an agent's ` +
        `\`provident.dispatch\` can reach only as a node with nothing declared to run.`,
    ).toEqual([])
    const receiptAt = (text: string): string => {
      const tag = tagById(text, MENUS_RECEIPT_ID)
      if (tag === null) return '(no carrier)'
      const after = text.slice(text.indexOf(tag) + tag.length)
      const close = after.indexOf('<')
      return (close < 0 ? after : after.slice(0, close)).trim()
    }
    // ── the eighteen acts, one at a time: STASH the act, then FORCE THE TURN, then DUMP the carrier ─────────
    // **THE READ IS TWO ACTS BECAUSE THE WRITE AND THE PAINT ARE TWO TURNS, AND THAT IS MEASURED, NOT ASSUMED**
    // (`D-209`'s battery finding). A dispatch runs the item's body, the body asks the menus route, and the answer is
    // written into `MENUS_RECEIPT_ID` as a `content` state-slice in the ROUTE PROMISE's continuation — one turn AFTER the
    // click turn. **MEASURED in a real boot**: re-reading the rendered surface 0, 5, 20, 100, 250, 500, 1 000 and 2 000 ms
    // after the act still read the PREVIOUS item's text at every one of those eight stamps, while the very next dispatch
    // — at the carrier itself, which declares no handler and therefore performs nothing — made the answer readable at
    // once. **SO THE SETTLE IS FORCED AND NOT SLEPT ON**: the dump act is issued for every attempt and the bound is spent
    // on the CARRIER'S OWN TEXT naming THIS item's role. A sleep alone could not do this (two seconds of it sufficed for
    // nothing), and a poll alone could not either (no re-read of a page paints a write the graph has not been asked to
    // render). What the pacing below buys is only the turn the route's answer needs to cross the IPC seam; the reading
    // is the carrier's text, and it is re-asked after EVERY dump act.
    const SETTLE_TURNS_MAX = 14
    const SETTLE_TURN_MS = 60
    const receipts = new Map<string, string>()
    const bodyWords = new Map<string, unknown[]>()
    const turnsUsed = new Map<string, number>()
    const transportStopped: string[] = []
    for (const item of items) {
      const previous = receiptAt((await renderedHtml(booted.client)).html)
      const answered = await call(booted.client, 'provident.dispatch', { target: { kind: 'nodeId', nodeId: item.nodeId }, event: 'click' })
      // THE BODY'S OWN WORD — the item the dispatch reached, named by the body that ran (`D-209`), independent of the
      // carrier and therefore of the settle: a dispatch that reached the WRONG node is caught even if the receipt lagged.
      bodyWords.set(item.role, arr(memberOf(answered.value, 'results')))
      let settled = previous
      let turns = 0
      for (let attempt = 1; attempt <= SETTLE_TURNS_MAX; attempt += 1) {
        turns = attempt
        await sleep(SETTLE_TURN_MS)
        // THE DUMP ACT: a dispatch at the authored carrier, whose body list is empty — it performs nothing and exists
        // only to take a render turn, which is the turn that paints the answer already standing in the graph.
        await call(booted.client, 'provident.dispatch', { target: { kind: 'cssId', cssId: MENUS_RECEIPT_ID }, event: 'click' })
        settled = receiptAt((await renderedHtml(booted.client)).html)
        if (settled !== previous && settled.includes(item.role)) break
      }
      receipts.set(item.role, settled)
      turnsUsed.set(item.role, turns)
      const alive = await call(booted.client, 'provident.list_targets', {})
      if (!alive.ok || asObject(alive.value) === null) transportStopped.push(`${item.role} (${trunc(alive.text, 120)})`)
    }
    expect(
      transportStopped,
      `AL-7 — the app must still answer on its transport after EVERY one of the eighteen dispatches: a role that killed ` +
        `the window (the declared failure mode "quit/close/reload reaching the window — the row reds by dying") leaves ` +
        `its name here. Silent roles: [${transportStopped.join('; ')}]; trace:\n${tail(booted.trace())}`,
    ).toEqual([])
    // ── THE PAIRING, ITEM → ITS OWN ANSWER: the body's word AND the carrier's answer, both per role ──────────
    // **THE SEVEN REFUSALS ARE `main`'s ANSWER AND NOT THE RENDERING's COURTESY** (`D-181`, `D-196`): each refused item's
    // body runs exactly as an admitted one's does, the route tests the seven BEFORE any other arm, and the refusal names
    // its own role — so the two lists below are read per item and never as a tally.
    const admitted = items.filter((item) => !item.disabled).map((item) => item.role)
    const refused = items.filter((item) => item.disabled).map((item) => item.role)
    const badBody = items.filter((item) => textOf(bodyWords.get(item.role)) !== textOf([`menu-item ${item.role}`])).map((item) => [item.role, bodyWords.get(item.role)])
    const badAdmitted = admitted.filter((role) => receipts.get(role) !== `admitted ${role}`)
    const badRefused = refused.filter((role) => {
      const receipt = receipts.get(role) ?? ''
      return !(receipt.startsWith('refused ') && receipt.includes(role))
    })
    expect(
      badBody,
      `AL-7 — every dispatch must RUN ITS OWN ITEM'S BODY and the body must answer with that item's own role ` +
        `(\`D-209\`): the wiring installs one \`menu-item\`/\`click\` body per item and the body answers ` +
        `\`menu-item <role>\` for the node it stands on. These answered something else: ${textOf(badBody)}.`,
    ).toEqual([])
    expect(
      { admitted: badAdmitted.map((role) => [role, receipts.get(role)]), refused: badRefused.map((role) => [role, receipts.get(role)]) },
      `AL-7 — EIGHTEEN RENDER, ELEVEN DISPATCH, SEVEN REFUSE BY NAME, and the carrier is where the answer is reflected ` +
        `(\`D-181\`, \`D-196\`, \`D-209\`). The eleven admitted roles must each read \`admitted <role>\` in ` +
        `\`${MENUS_RECEIPT_ID}\` and the seven refused must each read a refusal NAMING their role; the carrier read ` +
        `${textOf([...receipts.entries()])} and the bodies answered ${textOf([...bodyWords.entries()])}. **THE PATH, IN ` +
        `THE ROW'S OWN WORDS**: \`provident.dispatch\` at an item's own \`data-node-id\` runs the wiring-installed ` +
        `\`handlers\` body, that body calls \`menuRoleAct\` — the SAME act the item's DOM \`click\` listens for, so a ` +
        `human's click and an agent's dispatch are two causes of one act — and the answer comes back over ` +
        `\`window.provident.menu\`, is written into this carrier as a \`content\` state-slice, and is READ here on the ` +
        `turn a dump act forces (settle turns used: ${textOf([...turnsUsed.entries()])}).`,
    ).toEqual({ admitted: [], refused: [] })
  }, ROW_MS)

  // ── group `view`: AL-8, AL-10 — both write `['zones']`, neither needs the realm ──
  it('AL-8 — both domains widened: two panes, four zones, the two placements told apart, and `zones` in no file', async () => {
    const { booted, profile } = await shared('view')
    // ── the pane family: TWO panes, two placements, BOTH members, and `bounds` lawful-absent ──
    const panesRead = await readAt(booted.client, [PANES])
    expect(
      str(asObject(panesRead.value)?.['status']),
      `AL-8 PREREQUISITE — the creation repair mints \`['${PANES}']\` at \`file\` before any row runs, so this read must ` +
        `answer \`read\`: ${trunc(panesRead.text)}`,
    ).toBe('read')
    const panes = recordOf(panesRead.value)
    expect(
      Object.keys(panes ?? {}).sort(),
      `AL-8 — the family must name EXACTLY TWO panes (\`DECLARED_PANE_IDS\` \`1 → 2\`, \`D-183\`, \`D-189\`): ` +
        `\`${PANE_SIDEBARLESS}\` (the stage) and \`${PANE_MENUS}\` (the menus pane). Observed: ${trunc(panesRead.text)}`,
    ).toEqual([PANE_MENUS, PANE_SIDEBARLESS].sort())
    const paneA = asObject(memberOf(panes, PANE_SIDEBARLESS))
    const paneMenus = asObject(memberOf(panes, PANE_MENUS))
    expect(
      owns(paneA, 'zone'),
      `AL-8 — \`${PANE_SIDEBARLESS}\`'s record must NOT state a \`zone\` at all: absence IS the stage (\`C-9\`), and a ` +
        `record stating a zone it is not in is a false statement in an enforced shape (\`D-129\`). Observed: ` +
        `${textOf(paneA)}`,
    ).toBe(false)
    expect(
      str(memberOf(paneMenus, 'zone')),
      `AL-8 — \`${PANE_MENUS}\`'s record must state \`zone: 'top'\` — its own default, because absence would place it in ` +
        `the stage and contradict \`D-180\`/\`D-181\`. Observed: ${textOf(paneMenus)}`,
    ).toBe('top')
    for (const [id, held] of [[PANE_SIDEBARLESS, paneA], [PANE_MENUS, paneMenus]] as const) {
      expect(
        { width: typeof memberOf(held, 'width'), height: typeof memberOf(held, 'height') },
        `AL-8 — \`${id}\` must carry BOTH axis members as finite numbers — "a pane stating ONE axis member and not the ` +
          `other" is the declared failure mode, and the unpainted member is the MEMORY the split exists for (\`D-189\`, ` +
          `\`C-11\`). Observed: ${textOf(held)}`,
      ).toEqual({ width: 'number', height: 'number' })
      expect(
        num(memberOf(held, 'height')),
        `AL-8 — and both must stand at the repair's \`DEFAULT_PANE_SIZE\` (\`100\`, \`D-192\`'s chosen consequence) on a ` +
          `fresh profile: ${textOf(held)}`,
      ).toBe(100)
    }
    expect(
      owns(paneMenus, 'bounds'),
      `AL-8 — \`${PANE_MENUS}\`'s \`bounds\` must be ABSENT AND LAWFUL: a zone-resident pane's clamp is the layout's, and ` +
        `a repair may not read \`['zones']\` to invent one (\`D-186\`, \`D-189\`). Observed: ${textOf(paneMenus)}`,
    ).toBe(false)
    // ── the zone family: FOUR records at `mem`, written by the creation repair ──
    const zonesRead = await readAt(booted.client, [ZONES])
    const zones = recordOf(zonesRead.value)
    expect(
      Object.keys(zones ?? {}).sort(),
      `AL-8 — the creation repair must have written all FOUR zone ids (\`D-181\`'s widened domain, \`Z-9\`'s re-opened ` +
        `tombstone): the family read ${trunc(zonesRead.text)}`,
    ).toEqual([...ZONE_IDS].sort())
    // ── a legal zone write, A FAMILY AND A LEAF ──────────────────────────────
    const familyWrite = await writeAt(booted.client, [ZONES, 'bottom'], 'mem', { size: 30, display: 'normal' })
    expect(
      str(asObject(familyWrite.value)?.['status']),
      `AL-8 — a write AT a declared zone must COMMIT (\`D-91\`'s family at \`mem\`): ` +
        `\`data.write(['${ZONES}','bottom'], tier:'mem')\` answered ${trunc(familyWrite.text, 320)}. "A legal zone write ` +
        `refused" is the declared failure mode.`,
    ).toBe('committed')
    const leafWrite = await writeAt(booted.client, [ZONES, 'bottom', 'size'], 'mem', 33)
    expect(
      str(asObject(leafWrite.value)?.['status']),
      `AL-8 — and a write at a declared zone's \`size\` LEAF must commit too: ` +
        `\`${trunc(leafWrite.text, 320)}\``,
    ).toBe('committed')
    const readBack = await readAt(booted.client, [ZONES])
    expect(
      num(memberOf(asObject(memberOf(recordOf(readBack.value), 'bottom')), 'size')),
      `AL-8 — the two writes must be READ BACK as the figure the second one stated (33): ${trunc(readBack.text)}`,
    ).toBe(33)
    // ── the refusals: an undeclared zone id, and a pane naming one ───────────
    const undeclaredZone = await writeAt(booted.client, [ZONES, 'al-not-a-zone'], 'mem', { size: 12 })
    const undeclaredAnswer = asObject(undeclaredZone.value)
    expect(
      str(undeclaredAnswer?.['status']),
      `AL-8 — an undeclared zone id must be REFUSED and never silently dropped by the read: ` +
        `\`data.write(['${ZONES}','al-not-a-zone'])\` answered ${trunc(undeclaredZone.text, 400)}.`,
    ).toBe('refused')
    // **THE ADDRESS THE DECLARED SET CAN BE READ FROM, AND THE L1 TABLE'S TOKEN SAID WHERE IT CANNOT** (`D-188` debt 2's
    // second half, `D-105`): the FAMILY write above is refused by the record's own constraint with a generic sentence —
    // the DATA surface's closed twelve-word ledger (`store-refused`) has no `undeclared-zone` in it, and
    // `UNDECLARED_ZONE_REASON` is the CROSSING's word. The LEAF write at the same undeclared id is refused as well, and
    // ITS answer names the four ids the record declares — which is the reading that proves the DOMAIN judged it and not
    // a store fault. Both arms are asserted; the token's absence from this boundary is a recorded finding, never a
    // reason to weaken the row.
    const undeclaredLeaf = await writeAt(booted.client, [ZONES, 'al-not-a-zone', 'size'], 'mem', 12)
    const leafAnswer2 = asObject(undeclaredLeaf.value)
    expect(
      str(leafAnswer2?.['status']),
      `AL-8 — and a write AT A LEAF of an undeclared zone must be refused too: ` +
        `\`data.write(['${ZONES}','al-not-a-zone','size'])\` answered ${trunc(undeclaredLeaf.text, 400)}.`,
    ).toBe('refused')
    const refusalText = `${str(leafAnswer2?.['message']) ?? ''} ${str(undeclaredAnswer?.['message']) ?? ''}`
    expect(
      ZONE_IDS.every((id) => refusalText.includes(`'${id}'`) || refusalText.includes(`, ${id}`) || refusalText.includes(id)),
      `AL-8 — and the refusal must NAME the declared set, so a reader can tell the domain's judgement from a store fault: ` +
        `leaf=${trunc(undeclaredLeaf.text, 400)} family=${trunc(undeclaredZone.text, 400)}. (The L1 table's token for this ` +
        `arm is \`undeclared-zone\`, which is the CROSSING's reason; \`provident.data.write\`'s answer is the data ` +
        `surface's closed ledger and cannot carry it.)`,
    ).toBe(true)
    const paneZoneFault = await writeAt(booted.client, [PANES, PANE_MENUS], 'file', { id: PANE_MENUS, width: 111, height: 100, zone: 'al-not-a-zone' })
    const paneAnswer = asObject(paneZoneFault.value)
    expect(
      str(paneAnswer?.['status']),
      `AL-8 — a pane record whose \`zone\` names an undeclared id must be REFUSED rather than dropped by the read (` +
        `\`paneNodeAdmits\`' second seat, \`ASM-14\`, \`D-105\`): ${trunc(paneZoneFault.text, 400)}`,
    ).toBe('refused')
    // ── the file: the `mem` family persists nowhere, measured on a POSITIVE datum ──
    const settled = await settleProfile(profile, (read) => read.keys.includes(PANES))
    expect(
      settled.read.keys,
      `AL-8 — the profile file \`${PROFILE_FILE}\` must carry the \`file\` families — \`${PANES}\` among them — so the ` +
        `absence below is read off a file that is READABLE AND POPULATED (read after ${String(settled.polls)} poll(s); ` +
        `keys=[${settled.read.keys.join(', ')}]; reason="${settled.read.reason}"). raw=${trunc(settled.read.raw, 400)}`,
    ).toContain(PANES)
    expect(
      settled.read.keys.includes(ZONES),
      `AL-8 — and it must carry NO \`${ZONES}\` key: the family is \`mem\`, so the same reading is in the store and in no ` +
        `file ("a zone family reaching the file" is the declared failure mode, \`D-145\`). keys=[${settled.read.keys.join(', ')}]; ` +
        `raw=${trunc(settled.read.raw, 400)}`,
    ).toBe(false)
  }, ROW_MS)

  it('AL-10 — each axis\'s figure comes from a named source, and it is checkable IN RENDERED MARKUP', async () => {
    const { booted } = await shared('view')
    // **THIS ROW READS MARKUP AND NEVER COMPUTED STYLE, SAID HERE BECAUSE THE DIFFERENCE IS THE WHOLE SUBJECT** (`D-203`,
    // `D-204`): `css.style` written as CSS TEXT lands in the `style` attribute, which is what a rendered read sees; the
    // object spelling that produced a silent no-op left the attribute EMPTY, so the markup read catches that class too.
    // A COMPUTED reading is not reachable on a gating leg at this head and the file's header states both measured
    // reasons; upgrading this row into a claim about computed style would be exactly the lie `D-203` was.
    const zonesRead = await readAt(booted.client, [ZONES])
    const declaredZones = Object.keys(recordOf(zonesRead.value) ?? {}).sort()
    const panesRead = await readAt(booted.client, [PANES])
    const declaredPanes = Object.keys(recordOf(panesRead.value) ?? {}).sort()
    const html = (await renderedHtml(booted.client)).html
    // ── the ids' EQUALITY: what the record declares is what the nodes carry (`D-188` debt 2) ──
    expect(
      declaredZones,
      `AL-10 PREREQUISITE — the zone family must declare the four ids, or the equality below measures nothing: ` +
        `${trunc(zonesRead.text)}`,
    ).toEqual([...ZONE_IDS].sort())
    const renderedZones = ZONE_IDS.filter((id) => tagById(html, id) !== null).sort()
    expect(
      renderedZones,
      `AL-10 — the four zone nodes' ids must EQUAL \`DECLARED_ZONE_IDS\`: the paint addresses a zone BY ID, so an id the ` +
        `record declares and the envelope does not author (or the reverse) writes into nothing — and nothing can derive ` +
        `one set from the other (\`D-188\` debt 2). Record: [${declaredZones.join(', ')}]; markup: ` +
        `[${renderedZones.join(', ')}].`,
    ).toEqual(declaredZones)
    expect(
      declaredPanes.includes(PANE_MENUS) && tagById(html, PANE_MENUS) !== null,
      `AL-10 — and \`${PANE_MENUS}\` must be BOTH a declared pane and a rendered node: the pane paint addresses it by the ` +
        `same id the record declares. Record: [${declaredPanes.join(', ')}]; markup: ` +
        `${tagById(html, PANE_MENUS) === null ? '(absent)' : 'present'}.`,
    ).toBe(true)
    // ── the baseline: a zone the record states no `size` for paints NO dimension ──
    const topStyle = styleOf(html, ZONE_IDS[0])
    expect(
      styleNames(topStyle, 'height'),
      `AL-10 — a zone whose record states NO \`size\` must be painted NO dimension: no fallback, no default, no authored ` +
        `height (\`D-191\`'s \`OWED-4\` answer, \`D-174\`). The \`${ZONE_IDS[0]}\` zone's style read ${textOf(topStyle)} ` +
        `before any writer spoke.`,
    ).toBe(false)
    // ── (a) the top zone's rendered height FOLLOWS `['zones','top','size']` ──
    const firstZoneWrite = await writeAt(booted.client, [ZONES, ZONE_IDS[0], 'size'], 'mem', 40)
    expect(
      str(asObject(firstZoneWrite.value)?.['status']),
      `AL-10 PREREQUISITE — the agent's zone write must commit: \`${trunc(firstZoneWrite.text, 320)}\``,
    ).toBe('committed')
    const painted40 = await surfaceWithin(booted.client, (text) => styleDeclares(styleOf(text, ZONE_IDS[0]), 'height', '40px'))
    expect(
      painted40.polls < POLL_MAX || styleDeclares(styleOf(painted40.html, ZONE_IDS[0]), 'height', '40px'),
      `AL-10 — the \`${ZONE_IDS[0]}\` zone's rendered height must FOLLOW \`['${ZONES}','${ZONE_IDS[0]}','size']\`: the record ` +
        `stated 40 and the node's style read ${textOf(styleOf(painted40.html, ZONE_IDS[0]))} over ` +
        `${String(painted40.polls)} bounded re-read(s) — "a dimension that does not follow its record (nothing is ` +
        `painted)" is the declared failure mode (\`D-185\`'s paint).`,
    ).toBe(true)
    const secondZoneWrite = await writeAt(booted.client, [ZONES, ZONE_IDS[0], 'size'], 'mem', 64)
    expect(
      str(asObject(secondZoneWrite.value)?.['status']),
      `AL-10 PREREQUISITE — the second zone write must commit: \`${trunc(secondZoneWrite.text, 320)}\``,
    ).toBe('committed')
    const painted64 = await surfaceWithin(booted.client, (text) => styleDeclares(styleOf(text, ZONE_IDS[0]), 'height', '64px'))
    const topAfter = styleOf(painted64.html, ZONE_IDS[0])
    expect(
      styleDeclares(topAfter, 'height', '64px'),
      `AL-10 — and it must FOLLOW the record's SECOND figure too (64), so the reading is a paint and not a coincidence of ` +
        `one value: the style read ${textOf(topAfter)} over ${String(painted64.polls)} bounded re-read(s).`,
    ).toBe(true)
    // ── (b) the menus pane's rendered width FOLLOWS `['panes','pane-menus','width']` ──
    const paneReadBefore = await readAt(booted.client, [PANES])
    const paneRecord = asObject(memberOf(recordOf(paneReadBefore.value), PANE_MENUS))
    expect(
      num(memberOf(paneRecord, 'height')),
      `AL-10 PREREQUISITE — \`${PANE_MENUS}\`'s STORED \`height\` must be read so that the absence below is a reading about ` +
        `a figure that stands: ${trunc(paneReadBefore.text)}`,
    ).not.toBe(null)
    const paneWrite = await writeAt(booted.client, [PANES, PANE_MENUS, 'width'], 'file', 140)
    expect(
      str(asObject(paneWrite.value)?.['status']),
      `AL-10 PREREQUISITE — the pane's adjustable member must be writable at its own leaf: ` +
        `\`data.write(['${PANES}','${PANE_MENUS}','width'], tier:'file')\` answered ${trunc(paneWrite.text, 320)}.`,
    ).toBe('committed')
    const paneWidth = await surfaceWithin(booted.client, (text) => styleDeclares(styleOf(text, PANE_MENUS), 'width', '140px'))
    const paneStyle = styleOf(paneWidth.html, PANE_MENUS)
    expect(
      styleDeclares(paneStyle, 'width', '140px'),
      `AL-10 — the \`${PANE_MENUS}\` pane's rendered width must FOLLOW \`['${PANES}','${PANE_MENUS}','width']\`: the record ` +
        `stated 140 and its style read ${textOf(paneStyle)} over ${String(paneWidth.polls)} bounded re-read(s).`,
    ).toBe(true)
    // ── and the pane's UNPAINTED member must not appear: exactly one figure per axis ──
    expect(
      styleNames(paneStyle, 'height'),
      `AL-10 — the pane's OTHER stored member must NOT be painted: \`${PANE_MENUS}\` sits in the \`top\` zone, so its HEIGHT ` +
        `is the ZONE's figure and its own \`height\` is retained MEMORY (\`C-11\`, \`D-189\`, \`D-191\`). Its style read ` +
        `${textOf(paneStyle)} where its record stores height=100: "the pane's unpainted member appearing in the markup" ` +
        `is the declared failure mode. AND the fixed axis's absence is read BESIDE the zone's own painted figure — ` +
        `\`${ZONE_IDS[0]}\` reads ${textOf(topAfter)} — so the axis is not simply unpainted everywhere.`,
    ).toBe(false)
  }, ROW_MS)

  // ── group `driver`: AL-9, AL-11 — the two rows that need a body inside the realm ──
  it('AL-9 — the platform draws the controls on the APP\'s window: `visible` is true and the titlebar rect non-empty', async () => {
    const { booted } = await shared('driver')
    await loadDriver(booted, [WINDOW_CONTROLS_ACT])
    const driven = await drive(booted.client, WINDOW_CONTROLS_ACT.id, WINDOW_CONTROLS_ACT.label)
    expect(
      driven.status,
      `AL-9 PREREQUISITE — the driven body must FRAME an answer: a status of '${driven.status}' after ` +
        `${String(driven.polls)} poll(s) means the body never reported, so this row measured nothing. Framed answer: ` +
        `${textOf(driven.answer)}; trace:\n${tail(booted.trace())}`,
    ).toBe('ok')
    const framed = asObject(driven.answer)
    expect(
      str(memberOf(framed, 'overlay')),
      `AL-9 — \`navigator.windowControlsOverlay\` must be PRESENT in the app's own renderer realm: the option has to have ` +
        `reached the ONE \`new BrowserWindow\` (\`titleBarStyle:'hidden'\` + \`titleBarOverlay\`, \`D-179\`, \`D-183\`). The body ` +
        `censused ${textOf(framed)}.`,
    ).toBe('present')
    expect(
      memberOf(framed, 'visible'),
      `AL-9 — and \`visible\` must be \`true\`: \`visible:false\` is the declared failure mode "the option never reached the ` +
        `window, which reopens the fork to the user rather than to a workaround" (\`D-178\` §2). Framed: ${textOf(framed)}`,
    ).toBe(true)
    const rect = asObject(memberOf(framed, 'rect'))
    expect(
      { width: num(memberOf(rect, 'width')), height: num(memberOf(rect, 'height')) },
      `AL-9 — and \`getTitlebarAreaRect()\` must be NON-EMPTY: the free area the page owns is the bar's own ground ` +
        `(\`D-179\` measured \`[0,0,607,36]\`, \`D-193\` read the same width through \`env(titlebar-area-width)\`). Framed ` +
        `rect: ${textOf(rect)}`,
    ).toEqual({
      width: expect.any(Number),
      height: expect.any(Number),
    })
    expect(
      (num(memberOf(rect, 'width')) ?? 0) > 0 && (num(memberOf(rect, 'height')) ?? 0) > 0,
      `AL-9 — and neither side of that rect may be zero: ${textOf(rect)}`,
    ).toBe(true)
    // ── the rendered surface, read back through the EXISTING channel (`D-18`: no new tool) ──
    const surface = (await renderedHtml(booted.client)).html
    expect(
      surface.includes('visible'),
      `AL-9 — the frame must be READABLE in the rendered surface, because that is where this battery's observation ` +
        `channel is: the answer was framed into \`${OUT_ID}\` and the page read ${String(surface.length)} bytes without it.`,
    ).toBe(true)
  }, ROW_MS)

  it('AL-11 — the route\'s unknown/malformed arm is total: a refusal by name, no throw, and the transport survives', async () => {
    const { booted } = await shared('driver')
    await loadDriver(booted, [MENU_ARM_ACT])
    const driven = await drive(booted.client, MENU_ARM_ACT.id, MENU_ARM_ACT.label)
    expect(
      driven.status,
      `AL-11 PREREQUISITE — the driven body must FRAME an answer: a status of '${driven.status}' after ` +
        `${String(driven.polls)} poll(s) means the body never reached the route, so this row measured nothing. Framed ` +
        `answer: ${textOf(driven.answer)}; trace:\n${tail(booted.trace())}`,
    ).toBe('ok')
    const framed = asObject(driven.answer)
    expect(
      str(memberOf(framed, 'route')),
      `AL-11 — the app's bridge must carry a \`menu\` member for this arm to exist at all (\`D-181\`'s ONE route, the tenth ` +
        `bridge member): the body censused \`menu\` as ${textOf(memberOf(framed, 'menu'))} over members ` +
        `${textOf(memberOf(framed, 'members'))}.`,
    ).toBe('present')
    const unknown = asObject(memberOf(framed, 'unknown'))
    expect(
      { threw: owns(unknown, 'threw'), status: str(memberOf(unknown, 'status')), reason: str(memberOf(unknown, 'reason')) },
      `AL-11 — a role that is NEITHER the eleven NOR the seven must answer a REFUSAL BY NAME and must not throw ` +
        `(\`D-188\` debt 4, \`D-181\`): the arm read ${textOf(unknown)}. "A throw instead of a refusal" and "a silent no-op" ` +
        `are the declared failure modes.`,
    ).toEqual({ threw: false, status: 'refused', reason: 'role-unknown' })
    const malformed = asObject(memberOf(framed, 'malformed'))
    expect(
      { threw: owns(malformed, 'threw'), status: str(memberOf(malformed, 'status')), reason: str(memberOf(malformed, 'reason')) },
      `AL-11 — and a MALFORMED (non-string) role must answer its own refusal by name and must not throw: the arm read ` +
        `${textOf(malformed)}. A route that throws here is a route an agent can crash with one argument.`,
    ).toEqual({ threw: false, status: 'refused', reason: 'role-malformed' })
    // ── and the app still answers on its transport ─────────────────────────
    const alive = await call(booted.client, 'provident.get_rendered_html', {})
    expect(
      alive.ok && asObject(alive.value) !== null,
      `AL-11 — the app must still answer on its TRANSPORT after both arms: \`${trunc(alive.text, 320)}\`. "A transport that ` +
        `stops answering" is the declared failure mode.`,
    ).toBe(true)
  }, ROW_MS)
})
