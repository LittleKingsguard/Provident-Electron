// scripts/electron-spawn.mjs — the SHARED Electron-spawn helper (spec
// docs/specs/ci-ui-leg.md §2 item 2 / §2.1, H-r18). It is the ONE module both
// legs import: `scripts/electron-divergence.mjs` (whose two spawn sites become
// helper calls, unchanged in behaviour) and `scripts/electron-ui.mjs` (the
// real-DOM measurement leg).
//
// §2.1 item 1 — the landed spawn contract, kept BYTE-IDENTICAL for the
// divergence leg: the base argument vector, the env pair, the stdio wiring,
// the cwd, and a FRESH scratch `--user-data-dir` per spawn.
// §2.1 item 3 — the two flags are ONE decision (docs/decisions.md
// `DIVERGENCE-SPAWN-FIX`): `--disable-dev-shm-usage` AND the fresh scratch
// `--user-data-dir` are both REQUIRED (each alone still dies SIGTRAP on a host
// where /dev/shm is unavailable, measured — docs/specs/engine-pin-live-status.md
// §1.3). Neither may be dropped by either leg.
// §2.1 item 4 — a spawn failure is NEVER swallowed: `spawnElectron` throws on a
// synchronous failure and surfaces the child's `error` event; a leg that cannot
// spawn reports its own prerequisite/fail state and never a `0`.
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const hereDir = dirname(fileURLToPath(import.meta.url))

/** The repo root (the `cwd` every Electron spawn uses, §2.1 item 1). */
export const repoRoot = join(hereDir, '..')
/** The Electron BINARY both legs spawn (the binary itself — never the wrapper).
 *
 *  §RCA F-1 (the leftover-profile root cause): this used to be
 *  `node_modules/.bin/electron`, a **symlink to `electron/cli.js`** — a Node
 *  WRAPPER that `spawn`s the real binary as its own child. Holding the wrapper
 *  as `child` meant killing it did not kill the app: the real Electron main
 *  process and its Chromium helpers were orphaned, kept writing into the scratch
 *  profile (`Cache`, `Session Storage`, …) and RE-CREATED the directory after
 *  `cleanupProfiles` had unlinked and verified it — so the leg reported
 *  `leftover profiles: NONE` while the directory survived (31 roots in one
 *  session). The fix is to spawn the BINARY DIRECTLY: one process, one handle,
 *  no orphaned grandchild, and the stdio chain stays single-hop. (The
 *  `detached: true` + process-group alternative was tried and BACKED OUT — it
 *  regressed the SDK stdio transport: `R13 RESULT: 1 checks, 2 failures`.)
 *
 *  Resolution order: the canonical unpacked binary, then the package's own
 *  `path.txt` contract, then the bare package entry. There is deliberately NO
 *  fallback to the wrapper — the wrapper is the defect. */
export const electronBin = (() => {
  const dir = join(repoRoot, 'node_modules', 'electron')
  const candidates = [join(dir, 'dist', 'electron')]
  try {
    const rel = readFileSync(join(dir, 'path.txt'), 'utf8').trim()
    if (rel) candidates.push(join(dir, rel))
  } catch {
    /* no readable path.txt — the canonical candidate stands on its own */
  }
  candidates.push(join(dir, 'electron'))
  for (const c of candidates) {
    if (existsSync(c)) return c
  }
  throw new Error(
    `electron binary not found (tried: ${candidates.join(', ')}). ` +
      'Spawning node_modules/.bin/electron is NOT an acceptable fallback: that is the CLI wrapper whose ' +
      'orphaned child caused the leftover-profile defect (F-1) — resolve the binary instead.',
  )
})()
/** The built main-process bundle the app boots (`PRE-2`'s digest target). */
export const mainCjs = join(repoRoot, 'dist', 'main', 'main.cjs')

/** The landed base argument vector (§2.1 item 1, byte-identical). The
 *  `--user-data-dir=<fresh scratch>` member is appended per spawn — the pair is
 *  ONE decision (§2.1 item 3). */
export const baseArgs = [
  mainCjs,
  '--mcp-transport=stdio',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--in-process-gpu',
  '--ozone-platform=x11',
  '--disable-dev-shm-usage',
]

/** The landed stdio wiring (§2.1 item 1). */
export const stdioWiring = ['pipe', 'pipe', 'pipe']
/** The same stdio wiring as a JSON string — for a spawn that receives its stdio
 *  config as JSON rather than a literal (byte-identical in effect). */
export const stdioWiringJson = JSON.stringify(stdioWiring)

/** The landed env pair (§2.1 item 1, byte-identical). */
export function electronEnv() {
  return { ...process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1' }
}

// ---- scratch profiles ------------------------------------------------------
// §2.1 item 2 — a fresh-scratch-profile creator under the OS temp dir (§6
// DIS-5), plus a cleanup hook registered on `process.on('exit')`. Cleanup is
// BEST-EFFORT: a scratch profile left behind is not a failure (the divergence
// leg's own precedent), but an un-cleaned profile must never be the norm.
const scratchProfiles = []

/** Every Electron child this helper spawned and that has NOT been observed to
 *  exit.
 *
 *  MEASURED ROOT CAUSE of the leftover profiles (blind-run finding,
 *  2026-09-27): `child.kill('SIGKILL')` reaches only the Electron MAIN process,
 *  so the Chromium helpers it forked (zygote/crashpad, which hold the
 *  user-data dir) outlive their parent and RE-CREATE the profile directory
 *  ~50-700 ms after it was unlinked — `Cache/`, `Network Persistent State`,
 *  `Preferences`, `Session Storage`. That is why a single `rmSync` looked like
 *  cleanup had never run: the deletion succeeded and was then undone.
 *
 *  The adopted fix is the delete-AND-VERIFY sweep in `cleanupProfiles`, which
 *  keeps re-deleting until the paths stay gone. A spawn-level fix (spawning
 *  `detached: true` and signalling the whole process group) was implemented and
 *  MEASURED TO REGRESS the SDK-driven stdio transport the divergence leg uses
 *  (`MCP error -32001: Request timed out`, `R13 RESULT: 1 checks, 2 failures`
 *  — the off-green signature §5.4 names), so the spawn options stay exactly as
 *  landed and the cleanup absorbs the race instead. */
const liveChildren = new Set()

/** Kill one spawned Electron child (synchronous, never throws: a child that
 *  already exited yields ESRCH). */
function killChild(child) {
  try {
    child.kill('SIGKILL')
  } catch {
    /* already gone */
  }
}

/** Bounded synchronous pause — a sleep that works on an exit path, where no
 *  timer can fire (the process is already tearing down). */
function sleepSync(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  } catch {
    /* a platform without SharedArrayBuffer: the sweep loop still runs */
  }
}

/** How many delete-verify sweeps a scratch profile gets (see `cleanupProfiles`).
 *  A surviving Chromium helper re-materialises the directory within ~50-700 ms
 *  of the kill, so one `rmSync` is not enough; these passes are what make the
 *  deletion stick. */
const PROFILE_REMOVE_PASSES = 20
const PROFILE_REMOVE_PAUSE_MS = 15

/** The scratch root every profile is created under (§2.1 item 2 / §6 DIS-5):
 *  the OS temp dir, never a repo path and never the operator's real profile. */
export function scratchRoot() {
  return tmpdir()
}

/** Create a fresh scratch profile directory under the OS temp dir. The caller
 *  passes it to `spawnElectron`/`spawnProfile` as `--user-data-dir`. */
export function makeFreshProfile(name = 'provident-leg') {
  const dir = mkdtempSync(join(scratchRoot(), `${name}-`))
  scratchProfiles.push(dir)
  return dir
}

/** Remove every scratch profile this helper created — and, for EVERY exit path
 *  (success, failure, exhaustion, SIGINT/SIGTERM, a thrown error), leave no
 *  profile or store behind.
 *
 *  Registered on `process.on('exit')` below; safe to call again (idempotent).
 *
 *  THE FIX, and why one `rmSync` was not enough: delete, then VERIFY the path
 *  is still gone after a short pause, and keep deleting while anything survives
 *  (see `liveChildren` for the measured re-creation this absorbs). Each profile
 *  gets `PROFILE_REMOVE_PASSES` sweeps; anything that survives every sweep is
 *  reported as a leftover by name, so a leftover is visible rather than silent.
 *
 *  Returns a report of what was removed and what (if anything) remains, so the
 *  caller can RECORD the cleanup instead of leaving a reader unable to tell
 *  whether it was attempted at all. */
export function cleanupProfiles() {
  const removed = []
  const leftover = []
  let passes = 0
  for (const child of [...liveChildren]) killChild(child)
  for (const dir of scratchProfiles.splice(0)) {
    let gone = false
    for (let i = 0; i < PROFILE_REMOVE_PASSES; i += 1) {
      passes += 1
      try {
        rmSync(dir, { recursive: true, force: true })
      } catch {
        /* best-effort: a scratch profile left behind is not a failure */
      }
      // The verification window is what makes the deletion stick: an outliving
      // Chromium helper re-materialises the directory a moment AFTER the
      // unlink, so the path must still be absent on the far side of the pause.
      sleepSync(PROFILE_REMOVE_PAUSE_MS)
      gone = !existsSync(dir)
      if (gone) break
    }
    if (gone) removed.push(dir)
    else leftover.push(dir)
  }
  return { removed, leftover, passes }
}

process.on('exit', () => {
  cleanupProfiles()
})

// ---- spawn -----------------------------------------------------------------
/** Spawn Electron with the landed base vector + a fresh scratch profile.
 *
 *  Returns `{ child, args, env, profile }`. The child's stderr is exposed as
 *  `child.stderr` (wire it yourself); `child.stdout` is NOT consumed here (the
 *  stdio MCP client owns it).
 *
 *  F-1 WARNING (2026-09-27) — THIS CALL SPAWNS A CHILD and returns it: a caller
 *  that wants a PROFILE ONLY (a path to pass to its own spawn) must call
 *  `makeFreshProfile` instead. `scripts/electron-divergence.mjs` used this for
 *  its two profile creations, which left an undrained, unreferenced Electron
 *  process per site and booted FOUR processes instead of TWO. Nothing in this
 *  helper retries (§3.7 `RT-9`: the retry is leg-local to `scripts/electron-ui.mjs`).
 *
 *  A spawn failure is never swallowed (§2.1 item 4): a synchronous failure
 *  throws, and the child's `error` event is surfaced on `child.on('error')`. */
export function spawnProfile(name = 'provident-leg', extraArgs = []) {
  const profile = makeFreshProfile(name)
  return { ...spawnElectron([...extraArgs, `--user-data-dir=${profile}`]), profile }
}

/** Spawn Electron with `extraArgs` appended to the landed base vector. The
 *  caller supplies its own arguments (a profile, an override flag, …). */
export function spawnElectron(extraArgs = []) {
  const args = [...baseArgs, ...extraArgs]
  const env = electronEnv()
  let child
  try {
    // The spawn OPTIONS stay exactly as landed (§2.1 item 1): a `detached: true`
    // experiment (so the whole Electron process group could be signalled) was
    // measured to REGRESS the SDK-driven stdio transport the divergence leg
    // uses — `MCP error -32001: Request timed out` and the off-green
    // `R13 RESULT: 1 checks, 2 failures` signature — so the leftover-profile
    // race is absorbed by `cleanupProfiles`' delete-and-verify sweeps instead.
    child = spawn(electronBin, args, { cwd: repoRoot, stdio: stdioWiring, env })
  } catch (e) {
    throw new Error(`electron spawn failed (${electronBin}): ${e instanceof Error ? e.message : String(e)}`)
  }
  liveChildren.add(child)
  child.on('exit', () => liveChildren.delete(child))
  child.on('error', (e) => {
    console.error(`[electron-spawn] spawn error: ${e instanceof Error ? e.message : String(e)}`)
  })
  return { child, args, env, profile: null }
}

// ---- the stdio MCP transport over an already-spawned child -----------------
/** An MCP `Transport` over an ALREADY-SPAWNED child's stdio (newline-delimited
 *  JSON-RPC, the SDK's stdio framing). A leg that uses this owns ONE process per
 *  boot: the helper spawns it, this drives it. The alternative — handing the
 *  binary to `StdioClientTransport` — spawns a SECOND Electron process for the
 *  same boot, which is waste and flake pressure on a host with 128 inotify
 *  instances (`RK-14`'s flake class: the display/process cost `DIS-2` mitigates).
 *  A child that dies is reported through `onclose`/`onerror` — never swallowed. */
export class ChildProcessTransport {
  constructor(child) {
    this.child = child
    this.buffer = ''
    this.closed = false
    this.lostStdin = false
    this.child.stdout.setEncoding('utf8')
    this.child.stdout.on('data', (chunk) => this.#onData(chunk))
    this.child.stdout.on('end', () => this.#close())
    // A dying child closes its stdin BEFORE its `exit` event, so the client's
    // initialize write lands on a broken pipe and the socket emits EPIPE. An
    // `error` event with no listener is re-thrown by Node as an uncaught
    // exception, which killed the whole process mid-boot — before the leg's
    // retry loop could record the attempt or reach EXHAUSTION. Measured on a
    // stub boot that dies immediately. The failure still has to surface, so it
    // is kept and reported through `send`/`onerror` below — never swallowed.
    this.child.stdin.on('error', (e) => {
      this.lostStdin = e instanceof Error ? e : new Error(String(e))
    })
    this.child.on('exit', (code, signal) => {
      if (!this.closed && (code !== 0 || signal)) {
        this.onerror?.(new Error(`child exited (code ${code}, signal ${signal})`))
      }
      this.#close()
    })
  }

  async start() {
    /* the child is already running (spawnElectron started it) */
  }

  async send(message) {
    if (this.closed) throw new Error('transport is closed')
    if (this.lostStdin !== false) throw this.lostStdin
    this.child.stdin.write(`${JSON.stringify(message)}\n`)
  }

  async close() {
    if (this.closed) return
    this.closed = true
    try {
      this.child.stdin.end()
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

  #onData(chunk) {
    this.buffer += chunk
    let index = this.buffer.indexOf('\n')
    while (index !== -1) {
      const line = this.buffer.slice(0, index).trim()
      this.buffer = this.buffer.slice(index + 1)
      if (line !== '') {
        try {
          this.onmessage?.(JSON.parse(line))
        } catch {
          /* a non-JSON line on stdout is not a protocol message */
        }
      }
      index = this.buffer.indexOf('\n')
    }
  }

  #close() {
    if (this.closed) return
    this.closed = true
    this.onclose?.()
  }
}
