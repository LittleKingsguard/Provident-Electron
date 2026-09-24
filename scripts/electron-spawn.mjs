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
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const hereDir = dirname(fileURLToPath(import.meta.url))

/** The repo root (the `cwd` every Electron spawn uses, §2.1 item 1). */
export const repoRoot = join(hereDir, '..')
/** The Electron launcher both legs spawn. */
export const electronBin = join(repoRoot, 'node_modules', '.bin', 'electron')
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

/** Remove every scratch profile this helper created. Registered on
 *  `process.on('exit')` below; safe to call again. */
export function cleanupProfiles() {
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best-effort: a scratch profile left behind is not a failure */
    }
  }
}

process.on('exit', cleanupProfiles)

// ---- spawn -----------------------------------------------------------------
/** Spawn Electron with the landed base vector + a fresh scratch profile.
 *
 *  Returns `{ child, args, env, profile }`. The child's stderr is exposed as
 *  `child.stderr` (wire it yourself); `child.stdout` is NOT consumed here (the
 *  stdio MCP client owns it).
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
    child = spawn(electronBin, args, { cwd: repoRoot, stdio: stdioWiring, env })
  } catch (e) {
    throw new Error(`electron spawn failed (${electronBin}): ${e instanceof Error ? e.message : String(e)}`)
  }
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
    this.child.stdout.setEncoding('utf8')
    this.child.stdout.on('data', (chunk) => this.#onData(chunk))
    this.child.stdout.on('end', () => this.#close())
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
