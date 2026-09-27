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
// ADDED (`U-DIVERGENCE-EXT`, the harness debt inherited from `docs/pending.md`
// §E) — THE ENTRY-POINT INTEGRITY PRE-FLIGHT: before any child is created,
// `spawnElectron` asserts the resolved Electron entry point (and the npm
// `.bin/electron` wrapper when it exists) is a Node script or the native
// binary, and THROWS with the file, the observation and the fix when it is a
// shell script (the corrupted-shim hazard: a self-re-exec loop at ~99 % CPU
// that is indistinguishable from a wedged host). The landed argument vector,
// env pair, stdio wiring, profile discipline and cleanup behaviour are
// unchanged; the check is a bounded header read on the healthy path.
import { spawn } from 'node:child_process'
import { closeSync, existsSync, mkdtempSync, openSync, readFileSync, readSync, realpathSync, rmSync } from 'node:fs'
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
/** THE ENTRY-POINT INTEGRITY PRE-FLIGHT (docs/pending.md §E, the harness debt
 *  `U-DIVERGENCE-EXT` INHERITS: *"recommended, NOT implemented"*).
 *
 *  THE HAZARD, verbatim from the record: `node_modules/electron/cli.js` — the
 *  file `node_modules/.bin/electron` symlinks to — was once **corrupted into a
 *  shell script that re-execs itself** (`#!/bin/sh` … `exec …/node_modules/.bin/electron "$@"`).
 *  Every boot then re-entered `exec` forever at **~99 % CPU printing nothing**,
 *  a hang **indistinguishable from a wedged host**, and it cost **multiple
 *  passes of misattribution** (`strace -f` showed an unbroken cycle of
 *  `openat(… .bin/electron)` and `/proc/<pid>/status` read `State: R` at 99 %
 *  CPU with no `EPERM`/`EACCES` at boot; the repaired path is an install
 *  artifact, not repo code — `docs/decisions.md` `NPM-SHIM-INTEGRITY`).
 *
 *  THE CHECK, and why it is CHEAP: before ANY child is created, read the first
 *  `ENTRY_HEADER_BYTES` bytes of (i) the entry point this helper is about to
 *  spawn and (ii) the npm `.bin/electron` wrapper when that path exists, and
 *  REFUSE to spawn when either is a shell script (or is unreadable / empty /
 *  unrecognizable). Two short reads and one `realpath` — no process, no
 *  network, no write.
 *
 *  NEVER A SILENT SKIP, NEVER A FALSE GREEN: a refusal THROWS with the file,
 *  what was observed and the fix, so the leg dies at once with an actionable
 *  message instead of hanging 30 s per retry and being reported as an app/host
 *  failure. The pass path is silent and adds no output (`spawnElectron`'s
 *  behaviour, vector, env, stdio wiring, profiles and cleanup are unchanged).
 *
 *  THE TWO ADMISSIBLE KINDS, stated so the assertion cannot be over-read: this
 *  helper deliberately spawns the Electron **BINARY** (never the wrapper — see
 *  `electronBin`), so a legitimate entry point is either the native binary
 *  (ELF / Mach-O / PE magic) or a Node script (`#!…node`, or a
 *  `.js`/`.cjs`/`.mjs` path). A shell interpreter in the shebang is the §E
 *  hazard, and anything this probe cannot recognize is treated as hostile to
 *  the leg rather than spawned on trust. */
const ENTRY_HEADER_BYTES = 128

/** The 4-byte magic numbers of the native executables a healthy Electron
 *  install ships: ELF (Linux), Mach-O thin 64-bit (both endiannesses), Mach-O
 *  universal/fat (both endiannesses). PE (`MZ`) is matched on its text prefix. */
const NATIVE_MAGICS = ['\x7fELF', '\xcf\xfa\xed\xfe', '\xfe\xed\xfa\xcf', '\xca\xfe\xba\xbe', '\xbe\xba\xfe\xca']

/** The shell interpreters a corrupted shim's shebang names. Matched as WHOLE
 *  words inside the first line, so `#!/usr/bin/env node` never matches and
 *  `#!/bin/bash` (and `/bin/sh`, `dash`, `zsh`, `ksh`, `busybox`) do. */
const SHELL_SHEBANG = /(^|[^A-Za-z0-9_])(sh|bash|dash|zsh|ksh|csh|fish|busybox)(\s|$)/

/** Read the first `ENTRY_HEADER_BYTES` bytes of `path` — bounded, so a 200 MB
 *  Electron binary is never loaded — or `null` when they cannot be read. */
function readEntryHeader(path) {
  let fd = null
  try {
    fd = openSync(path, 'r')
    const buffer = Buffer.alloc(ENTRY_HEADER_BYTES)
    const read = readSync(fd, buffer, 0, ENTRY_HEADER_BYTES, 0)
    return buffer.subarray(0, read)
  } catch {
    return null
  } finally {
    if (fd !== null) {
      try {
        closeSync(fd)
      } catch {
        /* already closed: nothing to report */
      }
    }
  }
}

/** Classify the file a leg is about to spawn. TOTAL: never throws, and answers
 *  one of `native-binary` / `node-script` / `shell-script` / `unrecognized` /
 *  `empty` / `unreadable`, with the observed header as evidence. */
function entryPointKind(path) {
  const header = readEntryHeader(path)
  if (header === null) return { kind: 'unreadable', evidence: 'the file could not be read' }
  if (header.length === 0) return { kind: 'empty', evidence: 'the file is empty (0 bytes)' }
  const text = header.toString('latin1')
  const firstLine = text.split('\n', 1)[0].trim()
  if (NATIVE_MAGICS.includes(text.slice(0, 4)) || text.startsWith('MZ')) {
    return { kind: 'native-binary', evidence: `binary magic ${JSON.stringify(text.slice(0, 4))}` }
  }
  if (text.startsWith('#!')) {
    if (/\bnode(js)?\b/.test(firstLine)) return { kind: 'node-script', evidence: `shebang ${JSON.stringify(firstLine)}` }
    if (SHELL_SHEBANG.test(firstLine)) return { kind: 'shell-script', evidence: `shebang ${JSON.stringify(firstLine)}` }
    return { kind: 'unrecognized', evidence: `shebang ${JSON.stringify(firstLine)}` }
  }
  if (/\.(js|cjs|mjs)$/.test(path)) return { kind: 'node-script', evidence: 'a shebang-less .js/.cjs/.mjs entry point' }
  // A shebang-less shell script whose self-re-exec is the §E loop itself.
  if (/\bexec\b/.test(text) && /\$0|\$\{0\}/.test(text)) {
    return { kind: 'shell-script', evidence: 'a shebang-less script that `exec`s `$0` (the §E self-re-exec loop)' }
  }
  return { kind: 'unrecognized', evidence: `header ${JSON.stringify(text.slice(0, 32))}` }
}

/** THE PRE-FLIGHT ITSELF: throw — loudly, actionably, and BEFORE any child is
 *  created — unless `path` is a Node script or the native Electron binary. */
function assertEntryPointSpawnable(what, path) {
  const probe = entryPointKind(path)
  if (probe.kind === 'node-script' || probe.kind === 'native-binary') return probe
  throw new Error(
    [
      `electron-spawn pre-flight: REFUSING TO SPAWN — ${what} is not a Node script or the native Electron binary (${probe.kind}).`,
      `  what:     ${what}`,
      `  path:     ${path}`,
      `  observed: ${probe.evidence}`,
      '  why:      this is the corrupted-npm-shim hazard recorded in docs/pending.md §E. A shell script here (or a wrapper that',
      '            re-execs itself) re-enters forever at ~99% CPU printing nothing, and that hang is INDISTINGUISHABLE from a',
      '            wedged host — it is exactly what cost multiple passes of misattribution. Spawning it cannot succeed, so this',
      '            leg stops here with a named cause instead of a 30s hang reported as an app/host failure.',
      '  fix:      restore the package entry point from a healthy install of the same version, then re-run this leg, e.g.',
      '              npm install electron@44.4.5 --force        (or: copy node_modules/electron/cli.js from a healthy tree)',
      '            Do NOT re-run the leg or the suite until this pre-flight passes: a re-run cannot fix a corrupted entry point.',
    ].join('\n'),
  )
}

/** The npm `.bin/electron` wrapper's REAL target, or `null` when that path does
 *  not exist. It is checked even though this helper never spawns it: §E's
 *  corrupted file WAS that wrapper, and a stale corruption left behind in
 *  `node_modules` is the misattribution trap a later revert would step into. */
function wrapperEntryPoint() {
  const bin = join(repoRoot, 'node_modules', '.bin', 'electron')
  if (!existsSync(bin)) return null
  try {
    return realpathSync(bin)
  } catch {
    return bin
  }
}

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
  // THE PRE-FLIGHT, BEFORE ANY CHILD EXISTS (see the §E block above). It throws
  // on a corrupted entry point — never a silent skip and never a false green —
  // and is a pure read on the healthy path, so the spawn below is untouched.
  assertEntryPointSpawnable('the Electron entry point', electronBin)
  const wrapper = wrapperEntryPoint()
  if (wrapper !== null) assertEntryPointSpawnable("the npm '.bin/electron' wrapper", wrapper)
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
