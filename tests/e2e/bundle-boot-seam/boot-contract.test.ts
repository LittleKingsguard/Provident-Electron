// tests/e2e/bundle-boot-seam/boot-contract.test.ts — THE L1 BATTERY for `bundle-boot-seam`: the
// eight boot-contract scenarios of `docs/L1/bundle-boot-seam.md` §6, B-1..B-8.
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
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { main: string }
const mainEntry = join(repoRoot, pkg.main)
const electronBin = join(repoRoot, 'node_modules', 'electron', 'dist', 'electron')

/** The landed Electron vector the legs spawn (`scripts/electron-spawn.mjs:80`), plus the two flags
 *  that pin the profile: Chromium's own and the app's (`src/main/main.ts:83`). */
const BASE_ARGS = ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--in-process-gpu',
  '--ozone-platform=x11', '--disable-dev-shm-usage']

/** The bound every wait in this file is held to. It is the harness's, never the transport's. */
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

/** `StdioServerParameters.env` is a closed `Record<string, string>`; `process.env` is not. */
const stringEnv = (): Record<string, string> =>
  Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined))

const children: ChildProcess[] = []
const scratchDirs: string[] = []
let buildFailure: string | null = null

const tail = (text: string, lines = 14): string => text.split('\n').slice(-lines).join('\n')

/** The reason a process published, verbatim: the first `…Error: …` / `…Error [code]: …` line. A
 *  failure report that carries no reason is the shape this battery exists to retire (`F-2`). */
const reasonOf = (text: string): string => {
  const found = /^(?:[A-Za-z]*Error(?:\s*\[[^\]]+\])?):.*$/m.exec(text)
  return found === null ? '(the process published no reason)' : found[0].trim()
}

/** A bound on a promise, so no row can hang on a transport's own timeout (`F-2`). A process that
 *  publishes a load error rejects it AT ONCE with that error, so a red row names its reason rather
 *  than spending the bound. */
async function withBound<T>(work: Promise<T>, label: string, trace: () => string): Promise<T> {
  const started = Date.now()
  let timer: NodeJS.Timeout | undefined
  const watched = new Promise<never>((_resolve, reject) => {
    timer = setInterval(() => {
      const failed = LOAD_ERROR.exec(trace())
      if (failed !== null) {
        reject(new Error(`${label}: the process published a failure instead of answering — ${reasonOf(trace())}\n${tail(trace())}`))
      } else if (Date.now() - started > BOUND_MS) {
        reject(new Error(`${label}: no answer within the ${BOUND_MS} ms bound — the wait is bounded, and the trace stands:\n${tail(trace())}`))
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

/** Spawn the built bundle the way a client spawns it, on a fresh scratch profile. */
function bootApp(entry: string, extra: string[] = []): Boot {
  const profile = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-'))
  scratchDirs.push(profile)
  const args = [...extra, entry, ...BASE_ARGS, `--user-data-dir=${profile}`, `--provident-user-data=${profile}`]
  const child = spawn(electronBin, args, {
    cwd: repoRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...stringEnv(), DISPLAY: process.env.DISPLAY ?? ':0', ELECTRON_DISABLE_SANDBOX: '1' },
  })
  children.push(child)
  let trace = ''
  child.stderr?.on('data', (chunk) => { trace += String(chunk) })
  child.stdout?.on('data', (chunk) => { trace += String(chunk) })

  const stop = (): void => {
    try { child.kill('SIGKILL') } catch { /* already gone */ }
  }

  const waitFor = (pattern: RegExp, label: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const started = Date.now()
      const tick = (): void => {
        if (pattern.test(trace)) return resolve()
        const failed = LOAD_ERROR.exec(trace)
        if (failed !== null) {
          return reject(new Error(`${label}: the process published a failure instead of the expected boot observable — ${reasonOf(trace)}\n${tail(trace)}`))
        }
        if (Date.now() - started > BOUND_MS) {
          return reject(new Error(`${label}: no observable within the ${BOUND_MS} ms bound — the wait is bounded, and the trace stands:\n${tail(trace)}`))
        }
        setTimeout(tick, 50)
      }
      tick()
    })

  return { trace: () => trace, waitFor, profile, stop }
}

/** The MCP client the battery is: it drives the transport the bundle itself opened (`D-27`). */
async function handshake(entry: string, extra: string[] = ['--mcp-transport=stdio']): Promise<{ client: Client; trace: () => string }> {
  const profile = mkdtempSync(join(tmpdir(), 'bundle-boot-seam-'))
  scratchDirs.push(profile)
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
  await withBound(client.connect(transport), `initialize over the ${extra.join(' ') || 'default'} transport`, () => trace)
  return { client, trace: () => trace }
}

const toolNames = async (client: Client, label: string, trace: () => string): Promise<string[]> => {
  const listed = await withBound(client.listTools(), `${label}: tools/list`, trace)
  return listed.tools.map((tool) => tool.name)
}

beforeAll(() => {
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: 600_000 })
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  }
}, 600_000)

afterEach(() => {
  for (const child of children.splice(0)) {
    try { child.kill('SIGKILL') } catch { /* already gone */ }
  }
})

afterAll(() => {
  for (const dir of scratchDirs.splice(0)) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort */ }
  }
})

describe('bundle-boot-seam — the boot contract of the built bundle', () => {
  it('B-1 the build produces the entry the app boots', () => {
    expect(buildFailure).toBeNull()
    expect(existsSync(mainEntry)).toBe(true)
    expect(readFileSync(mainEntry).byteLength).toBeGreaterThan(0)
  }, ROW_MS)

  it('B-2 the built main bundle survives module evaluation', async () => {
    const boot = bootApp(mainEntry, ['--mcp-transport=stdio'])
    await boot.waitFor(TRACE, 'B-2 module evaluation')
    expect(boot.trace()).not.toMatch(LOAD_ERROR)
    boot.stop()
  }, ROW_MS)

  it('B-3 the bundle completes a stdio handshake', async () => {
    const { client, trace } = await handshake(mainEntry)
    const names = await toolNames(client, 'B-3', trace)
    expect(names).toContain('provident.get_rendered_html')
    await client.close()
  }, ROW_MS)

  it('B-4 it answers a real tool call through that handshake', async () => {
    const { client, trace } = await handshake(mainEntry)
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
    await client.close()
  }, ROW_MS)

  it('B-5 the boot order holds and the storeroom instance constructs', async () => {
    const boot = bootApp(mainEntry, ['--mcp-transport=stdio'])
    await boot.waitFor(TRACE, 'B-5 boot trace')
    await boot.waitFor(STDIO_READY, 'B-5 transport ready')
    await boot.waitFor(RENDERER_READY, 'B-5 renderer ready')
    const trace = boot.trace()
    expect(trace.search(TRACE)).toBeLessThan(trace.search(STDIO_READY))
    expect(trace.search(TRACE)).toBeLessThan(trace.search(RENDERER_READY))
    expect(trace).not.toMatch(LOAD_ERROR)
    expect(readdirSync(boot.profile)).toContain(INSTANCE_FILE)
    boot.stop()
  }, ROW_MS)

  it('B-6 the HTTP transport binds and answers on the configured port', async () => {
    const port = 38300 + (process.pid % 500)
    const boot = bootApp(mainEntry, ['--mcp-transport=http', `--mcp-port=${port}`])
    await boot.waitFor(HTTP_READY, 'B-6 http transport ready')
    expect(boot.trace()).toContain(`http transport ready on http://127.0.0.1:${port}/mcp`)
    const client = new Client({ name: 'bundle-boot-seam-e2e', version: '0.1.0' })
    const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`))
    try {
      await withBound(client.connect(transport), 'B-6 initialize over Streamable HTTP', boot.trace)
      const names = await toolNames(client, 'B-6', boot.trace)
      expect(names).toContain('provident.get_rendered_html')
      const offRoute = await fetch(`http://127.0.0.1:${port}/mcp`)
      expect(offRoute.status).toBe(405)
    } finally {
      await client.close().catch(() => undefined)
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
        await withBound(client.connect(transport), `B-7 ${file}: initialize`, () => trace)
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
    const corrupt = join(dir, 'main.cjs')
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
})
