// tests/e2e/focus-retirement/focus-retirement.test.ts — THE L1 BATTERY for `focus-retirement`: the five e2e
// rows of `docs/L1/focus-retirement.md` §4 (`F-1`..`F-5`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR (`strata/next-steps.md` row `2`, `D-141`, `D-142`). The `provident.focus` MCP
// tool is a PRODUCT NEED — an agent moves the UI and loads tab-dependent data through it — and its act moves
// OFF the `['focus']` mirror, which is `mem` (the one tier that persists nothing) and a proxy for a fact the
// tab record already enforces (`exactly-one-active`) and derives (`landingOf`). The act becomes a write of
// the tab record at `['tabs']` at `file`; the family goes whole. **So every row below is red at this head,
// and red for the absence it NAMES** — the tool that writes a mirror instead of a record, the address that
// still answers, the bridge member that still exists. That is the correct reading before L4 lands; it is
// also the only thing that makes these rows evidence (`strata/examiner.md` §2-§3, D-27).
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): every row spawns the bundle
// `npm run build` produces, on a scratch profile, opens its stdio MCP transport and drives:
//   · the agent's own acts — `provident.focus`, `provident.data.read`/`.write`, `provident.load`,
//     `provident.dispatch`, `provident.get_node_state`, `provident.get_rendered_html`;
//   · the app's OWN profile file `<profile>/provident-profile.json`, read by THIS process, because the tab
//     record is `file` and a `mem` value can never come from a file (`D-84`'s measured reading);
//   · a SECOND PROCESS on the same profile, which is what tells a durable value from a re-minted one.
// NO ROW IMPORTS `src/**`. The internals these rows would name do not exist yet at this head, and
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
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
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
 *  written referent (then the removed entry's pre-position, then `order`'s first active — `src/main/tabs-record/
 *  index.ts`'s healing body, stated in the reverse order at `docs/L3/store-tabs-record/design.md` §4, which `E-11`
 *  re-grains), so a row the act moves is the one it keeps. The two `lastActiveAt` members are the field pair's own
 *  (`tab-has-lastActiveAt`) and are NOT a referent: no stamp is compared anywhere in the repair. */
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

// ---- reading JSON without trusting it ---------------------------------------
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const num = (value: unknown): number | null => (typeof value === 'number' && Number.isFinite(value) ? value : null)
const arr = (value: unknown): unknown[] => (Array.isArray(value) ? (value as unknown[]) : [])
const objectList = (value: unknown): Json[] => arr(value).map(asObject).filter((entry): entry is Json => entry !== null)

/** **THE RECORD AS THE SURFACE ANSWERS IT, OR AS THE STORE'S BYTES CARRY IT** — one reader for both, so no row
 *  compares oranges (`D-94`'s `recordView` precedent). A `data.read` answer carries `{status, kind, path, value}`;
 *  the profile file carries the value alone; a refusal carries neither, and answers `null`. */
function recordOf(answer: unknown): Json | null {
  const object = asObject(answer)
  if (object === null) return null
  const held = object['value']
  if (asObject(held) !== null) return asObject(held)
  if (Array.isArray(object['order'])) return object
  return null
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

const scratchProfiles: string[] = []
const livePids: number[] = []
/** The net for a teardown that never runs: a rejected hook, a killed worker or an interrupted run leaves the tree
 *  alive otherwise. A SIGKILLed worker gets no net at all, and that limit is stated rather than hidden (`D-74`). */
process.on('exit', () => {
  reap(scratchProfiles, livePids)
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
/** **A BUILT ARTIFACT, WAITED FOR INSIDE THE BOUND — because a snapshot of it is not a reading**: a sibling worker's
 *  `npm run clean` can land between a `build` and this file's `existsSync` (`boot-contract.test.ts` measured it). */
async function artifactWithin(file: string): Promise<void> {
  const started = Date.now()
  while (Date.now() - started < BOUND_MS) {
    if (existsSync(file) && statSync(file).size > 0) return
    await sleep(20)
  }
  throw new Error(
    `the built bundle is absent at ${file} within the ${BOUND_MS} ms bound. This battery boots the ARTIFACT \`npm run build\` ` +
      `produces and never builds one (D-27, strata/brief.md §6): run \`npm run build\` first.`,
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
 *  `--provident-user-data` is the app's own, and the store lands under the latter. */
async function boot(profile: string, options: { renderer?: boolean } = {}): Promise<Boot> {
  const display = process.env['DISPLAY']
  if (typeof display !== 'string' || display === '') {
    throw new Error(
      'PREREQUISITE ERROR — no display server: DISPLAY is unset. This battery boots a REAL Electron BrowserWindow, so ' +
        'the renderer realm it drives cannot exist without one. Fix: `DISPLAY=:0 npm test`, or wrap the run in xvfb-run. ' +
        'This is a RED and never a skip (tests/e2e/secure-panels/panes-live.mjs:46).',
    )
  }
  await artifactWithin(mainEntry)
  const child = spawn(electronBin, [mainEntry, ...BASE_ARGS, `--user-data-dir=${profile}`, `--provident-user-data=${profile}`], {
    cwd: repoRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...stringEnv(), DISPLAY: display, ELECTRON_DISABLE_SANDBOX: '1' },
  })
  if (child.pid !== undefined) livePids.push(child.pid)
  let trace = ''
  child.stderr?.on('data', (chunk: unknown) => { trace += String(chunk) })
  const transport = new ChildStdioTransport(child)
  const client = new Client({ name: 'focus-retirement-e2e', version: '0.1.0' })
  await withBound(client.connect(transport), `initialize over stdio on ${profile}`, () => trace)
  const stop = async (): Promise<void> => {
    try { await client.close() } catch { /* already gone */ }
    try { transport.close() } catch { /* already gone */ }
    reap([profile], [child.pid ?? 0])
    await sleep(300)
  }
  const booted: Boot = { client, profile, trace: () => trace, stop }
  if (options.renderer !== false) await waitForRenderer(booted)
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
      // MOVED as its written referent (then the removed entry's pre-position, then `order`'s first active — the healing
      // body in `src/main/tabs-record/index.ts`, stated in the reverse order at `docs/L3/store-tabs-record/design.md` §4,
      // which `E-11` re-grains), so a row opened over a record whose standing active is untouched is the one it keeps.
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
