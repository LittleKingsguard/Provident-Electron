// tests/e2e/harness/live-boot.ts — THE SPAWNING BATTERY'S HARNESS, EXTRACTED FROM `module-executor.test.ts` (`AN-20`).
//
// WHAT IT IS AND WHY IT EXISTS. Every e2e battery that boots the built bundle needs the same five instruments: the
// host-wide live-boot LOCK (`D-94`), the REAP with a zero proof (`D-74`), the artifact set's ENSURE, the bounded WAITS,
// and the scratch PROFILE + the stdio transport the stdio handshake rides. `tests/e2e/modularity/module-executor.test.ts`
// carried all of them inline; `tests/e2e/module-channel/channel-live.test.ts` then carried a second copy, and a third
// battery would have carried a third (`AN-20`). This module is that harness, MOVED BYTE-FOR-BYTE AND NOT REWRITTEN: a
// battery imports it and keeps only its own profile seed, its own module sources and its own rows.
//
// WHAT IT IS NOT. It asserts nothing, it names no row and it knows no module: `boot(profile)` spawns and handshakes,
// `call(client, name, args)` reads one tool answer, `reap`/`acquireLiveBoot` are the teardown's two instruments, and the
// `process.on('exit')` net is registered HERE so a battery that dies mid-run still leaks nothing (`D-74`).
//
// THE CONTRACT A CALLER MUST KEEP: take the lock (`acquireLiveBoot`) BEFORE `ensureArtifacts`; `boot()` does both; prove
// the tree gone (`reap`) before releasing the lock; and never skip a boot for a missing `DISPLAY` — the harness throws
// with the prerequisite named, and a red is the honest reading (D-30, D-40).

import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import type { Transport, TransportSendOptions } from '@modelcontextprotocol/sdk/shared/transport.js'
import type { JSONRPCMessage, MessageExtraInfo } from '@modelcontextprotocol/sdk/types.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
export const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { main: string; version: string }
/** The built main-process bundle every boot runs — the artifact `npm run build` produces (`strata/brief.md` §6). */
export const mainEntry = join(repoRoot, pkg.main)
/** The Electron BINARY, never the `.bin` wrapper: the wrapper is a `cli.js` Node process whose child survives a kill
 *  and re-materialises a scratch profile (`scripts/electron-spawn.mjs`'s `F-1`). Resolution order: the canonical
 *  unpacked binary, then the package's own `path.txt` contract. */
export const electronBin = ((): string => {
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
export const BASE_ARGS = ['--mcp-transport=stdio', '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer',
  '--in-process-gpu', '--ozone-platform=x11', '--disable-dev-shm-usage']
/** The bound every wait is held to. Generous for the reason the boot battery states: a full `npm test` runs many
 *  workers, and a boot delayed by work this row does not control is not a defect (`boot-contract.test.ts`). */
export const BOUND_MS = 60_000
/** The rows' own bound: five rows share one boot, and the resolver's rows each install several modules. */
export const ROW_MS = 240_000
/** A process that could not boot says so on stderr before it says anything else. */
export const LOAD_ERROR = /App threw an error during load|\[provident-main\] fatal:|Uncaught Exception/
/** **THE PROFILE'S OWN FILE NAME, SPELLED HERE ON PURPOSE**: the store's one written name stands at
 *  `<profile>/provident-profile.json`, and this battery's grain is the built artifact, so the name is a literal
 *  and never an import (D-27). */
export const PROFILE_FILE = 'provident-profile.json'
/** The retired security carrier, read ONCE at the boot by the record address's own repair — the driver's only lawful
 *  way to supply this run's grant, since no bridge route can widen it (`D-85`, `D-94`'s seeded profile). **`module`
 *  AND `code` ARE BOTH REQUIRED AND FOR DIFFERENT REASONS**: `module` is `module.install`'/`module.update`'s group
 *  and the dynamic `module:<n>.<t>` tools' registration group, and `code` is the invocation two-gate a module tool
 *  must ALSO pass (`src/main/security.ts:52-64`, `module-import-proposal.md` §5). */
export const SECURITY_SEED = 'provident-security.json'
export const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
/** The five module names this battery installs, spelled once: a name carries no `.` and no `:` (`registerModule`'s
 *  own injectivity rule), so a hyphen is the only separator used below. `matrix-publish` is `M-5`'s own: the row that
 *  compares the number the resolver JUDGES with the number the transport PUBLISHES must take that judgement itself
 *  rather than inherit it from `M-4`, or its red would name a prerequisite instead of its own absence. */

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
/** `StdioClientTransport`'s `env` is a closed `Record<string, string>`; `process.env` is not. */
export const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))
export const tail = (text: string, lines = 12): string => text.split('\n').slice(-lines).join('\n')

// ---- reading JSON without trusting it ---------------------------------------
export type Json = Record<string, unknown>
export const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
export const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
export const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}

// ---- the process table and the teardown (D-74) ------------------------------
export interface Proc { pid: number; ppid: number; args: string }
/** How many kill-and-recheck sweeps a teardown gets: a swept tree can be replaced mid-sweep (a zygote forks a
 *  renderer), so one pass is a snapshot. Bounded, because an unbounded loop on a teardown path is a wedged harness. */
export const REAP_PASSES = 20
export const REAP_PAUSE_MS = 15
export function pauseSync(ms: number): void {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  } catch {
    /* no SharedArrayBuffer: the sweep still runs */
  }
}
/** The live process table. THROWS when it cannot be read: an unreadable table must never be reported as "nothing to
 *  reap", which turns a leak into a green (`D-74`). */
export function processTable(): Proc[] {
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
export function membership(rows: Proc[], profiles: string[], seeds: number[]): Set<number> {
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
export interface ReapReport { killed: number[]; passes: number; survivors: Proc[] }
export function reap(profiles: string[], seeds: number[]): ReapReport {
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
export const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
export const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
export const BOOT_LOCK_POLL_MS = 100
export const BOOT_LOCK_SETTLE_MS = 2_000
export const BOOT_LOCK_BOUND_MS = 120_000
export function pidAlive(pid: number): boolean {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM'
  }
}
export interface LockHolder { pid: number; since: number; why: string }
export function lockHolder(): LockHolder | null {
  try {
    const [pid, since, ...why] = readFileSync(BOOT_LOCK_OWNER, 'utf8').trim().split(' ')
    const held = Number(pid)
    return Number.isSafeInteger(held) && held > 0 ? { pid: held, since: Number(since), why: why.join(' ') } : null
  } catch {
    return null
  }
}
export function lockAgeMs(): number {
  try {
    return Date.now() - statSync(BOOT_LOCK).mtimeMs
  } catch {
    return Number.POSITIVE_INFINITY
  }
}
export const liveBootReleases: Array<() => void> = []
export async function acquireLiveBoot(why: string): Promise<() => void> {
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
export const scratchProfiles: string[] = []
export const livePids: number[] = []
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
export interface Observed { ended: { code: number | null; signal: NodeJS.Signals | null } | null; error: string | null }
export const observed = (): Observed => ({ ended: null, error: null })
export function diagnose(label: string, caught: unknown, seen: Observed, trace: string): Error {
  const how = seen.ended === null ? 'still running' : `exit code ${String(seen.ended.code)}, signal ${String(seen.ended.signal)}`
  return new Error(
    `${label}: ${caught instanceof Error ? caught.message : String(caught)}. The child was ${how}` +
      `${seen.error === null ? '' : `, transport error "${seen.error}"`}; its stderr tail stands:\n${tail(trace)}`,
  )
}
export async function withBound<T>(work: Promise<T>, label: string, trace: () => string): Promise<T> {
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
export const BOOT_ARTIFACTS = [
  join(repoRoot, 'dist', 'main', 'main.mjs'),
  join(repoRoot, 'dist', 'main', 'preload.cjs'),
  join(repoRoot, 'dist', 'renderer', 'index.html'),
  join(repoRoot, 'dist', 'renderer', 'renderer.js'),
]
export function artifactReady(file: string): boolean {
  try {
    return existsSync(file) && statSync(file).size > 0
  } catch {
    return false
  }
}
/** The build's own bound, deliberately smaller than `ROW_MS`: a build that spends past it reds as a NAMED build
 *  failure inside the row that asked for it, never as a row timeout that leaves the live-boot lock held (`F-2`). */
export const BUILD_MS = 120_000
/** **THE ARTIFACT SET IS ENSURED, NOT WAITED FOR, BY THE ONE CLAIMANT THAT HOLDS THE LOCK** (`D-227`'s cure shape):
 *  present ⇒ a `stat` and no build at all; absent ⇒ THIS process builds it once, under the lock it already holds, so
 *  no builder can be queued for that same lock while this boot waits for its output. */
export async function ensureArtifacts(): Promise<void> {
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
export function makeProfile(name: string): string {
  const profile = mkdtempSync(join(tmpdir(), `${name}-`))
  scratchProfiles.push(profile)
  writeFileSync(join(profile, SECURITY_SEED), JSON.stringify({ token: null, enabled: SEEDED_GROUPS }, null, 2))
  return profile
}

// ---- the MCP plumbing -------------------------------------------------------
export interface CallAnswer { ok: boolean; value: unknown; text: string }
export async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<CallAnswer> {
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
export const verdictOf = (answer: CallAnswer): unknown =>
  Array.isArray(answer.value) ? answer.value[0] : answer.value
export const statusOf = (answer: CallAnswer): string => {
  const status = str(memberOf(verdictOf(answer), 'status'))
  if (status !== null) return status
  return answer.ok ? '(no `status` member)' : '(refused as a throw)'
}
export const reasonOf = (answer: CallAnswer): string => str(memberOf(verdictOf(answer), 'reason')) ?? '(no `reason` member)'
/** **THE ONE MANIFEST SHAPE EVERY SOURCE BELOW SPELLS** — a module's declared source is its manifest, and `entry` is
 *  the function-STRING `src/shared/types.ts:220-230` already declares (`needsCode` says `entry !== ''`). The `entry`
 *  text is the module's own code and nothing here rewrites it. */
export const sourceOf = (name: string, version: string, entry: string, extra: Record<string, unknown> = {}): string =>
  JSON.stringify({ name, version, entry, ...extra })


// ---- one boot ---------------------------------------------------------------
/** A transport over an ALREADY-SPAWNED child's stdio (newline-delimited JSON-RPC, the SDK's own framing). A child that
 *  dies is reported through `onclose`/`onerror`, never swallowed. */
export class ChildStdioTransport implements Transport {
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

export interface Boot {
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
export async function boot(profile: string): Promise<Boot> {
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

