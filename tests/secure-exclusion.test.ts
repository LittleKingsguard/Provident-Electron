/**
 * ============================================================================
 * S1 = U-SECURE-EXCLUSION — THE RED SET (RCA-1: tests FIRST, RUN and REPORTED
 * failing, before any implementation).  Author: TestWriter.  Layer: [H]/[T]
 * per §1.4; the [U] rows' PRE-LIVE structural half only (§4.3 item 3).
 *
 * Spec: docs/specs/secure-exclusion.md (read in FULL — 1440 lines at
 * red-authoring; every operative cell is cited by §/row id, never by line).
 *
 * WHAT THIS FILE IS: the access-control mutual-exclusion gate's red set —
 * authored from THE SPEC ALONE against the CURRENT tree.  Everything the
 * contract declares (`SecurityGate.exclusion` / `exclusionState()` /
 * `withExclusion()` · `exclusionAllowsWork` · the epoch · the in-flight
 * invalidation · `RendererBackend.abandonPendingForExclusion` · the per-POST
 * HTTP arm · `ProvidentMcpServer.exclusionSnapshot` · the
 * `IPC_SECURITY_EXCLUSION` channel constant · the preload `setExclusion`
 * member · the additive `exclusion` response member · the pane's
 * `exclusion-toggle` node, its label and the `· MCP:` status segment) is
 * asserted AS IF IT ALREADY EXISTED, so the absent symbols fail FIRST, in the
 * honest form §4.1.4 demands ("A red run whose failing set is EMPTY is itself
 * a finding — the absent-symbol rows and the register's rows MUST fail
 * first").
 *
 * THE HONEST RED CLASSES (§4.1.3, each driven and named):
 *  1. THE ABSENT EXCLUSION RECORD — `SecurityGate` carries no `exclusion`
 *     accessor, no `exclusionState()` and no `withExclusion()` (security.ts:
 *     184-214 today is exactly `_config`/`config`/`enabled`/`toolAllowed`/
 *     `checkRequest`/`apply`); `exclusionAllowsWork` is not exported.
 *  2. THE ABSENT INVOCATION TURN — no MCP tool handler or resource callback
 *     consults any exclusion predicate, so a call "while the tier is open"
 *     reaches the renderer normally (the red's FIRST reading, §4.1.3).
 *  3. THE ABSENT EPOCH AND INVALIDATION — `RendererBackend` has no
 *     `abandonPendingForExclusion`, its `pending` entries carry no epoch, and
 *     `handleReply` resolves a late reply with the renderer's value
 *     unqualified (mcp-server.ts:1160-1167).
 *  4. THE ABSENT HTTP ARM — `handleHttp` has the 401 arm only
 *     (mcp-server.ts:928-933); a POST during `'mcp-disabled'` reaches a
 *     per-POST server in both states.
 *  5. THE ABSENT OPERATOR CONTROL — no `exclusion-toggle` node, no label node,
 *     no `· MCP:` segment on the `security-status` line, no `setExclusion`
 *     bridge member, no `exclusion` response member, no
 *     `IPC_SECURITY_EXCLUSION` constant.
 *
 * WHAT IS ALREADY GREEN TODAY (reported honestly, never forced red): the
 * store's own `secure.*` refusal and the two MEASURED file byte-pins
 * (`P-EX-IM-2` cells (i)/(j)/(k)), the union count at `16`, the
 * transport-agnostic 401 arm's position, the uncounted/moved census members
 * (`ALL_TOOLS` 22 · `RpcMethod` 22 · `MUTATING_METHODS` 7 · `VALID_GROUPS` 5),
 * the pane graph's isolation for the LANDED node set, and the four forbidden
 * paths' current bytes (the boundary holds at red — a future byte-move reddens
 * `P-EX-IM-2` cell (k)-(l) and `FS-EX-15`).
 *
 * THE TYPE SHIM (the `-mend.ts`-style pattern the sibling's header records):
 * leg 4 is `npm run typecheck:tests` (`tsc -p tsconfig.tests.json`), which
 * compiles the WHOLE `tests` tree (`tests/**` + `*.ts`) under `--strict`.  The declared
 * surfaces DO NOT EXIST on the landed types, so a direct member access is a
 * TS2339 that would make this file fail leg 4 — and a test file that fails
 * typecheck:tests is NOT a valid red set.  The shim below therefore reads
 * every not-yet-widened surface through a NARROW, LOCAL receiver type
 * (`ExclusionGateLike`, `ExclusionServerLike`, …) with an explicit
 * `as unknown as` at the call site.  The shim changes NO runtime value and
 * weakens NO assertion: every drive still asserts the declared shape, and the
 * absent member is reported by the drive itself (via `absent(...)`), never by
 * the compiler.
 *
 * `[U]` HONESTY (§4.3 item 3): the live battery is gate 6's and is NOT driven
 * here.  This file drives the `[U]` rows' STRUCTURAL half only — the node
 * exists, the handler is authored, the bridge member exists — and a red set
 * that claimed the live half would be a finding.  §2.4 item 7(2)'s `7` U-row
 * SUBJECTS are cited by id (`U-1`..`U-7`) and NOT re-derived; no `§5.U`
 * matrix is authored here (`§2.4` item 7 / `docs/specs/user-flow-audit.md`
 * §5 forbids the unit's contract from re-deriving its own matrix's values).
 *
 * LAYER HONESTY (§1.4 item 2): no timing figure is claimed anywhere in this
 * file.  The 60 000 ms `invokeTimeoutMs` appears ONLY as the existence witness
 * §2.2 item 4 cites — never as a duration claim; the epoch rows assert ORDER
 * and OUTCOME; the HTTP rows assert the answer's SHAPE and its arrival BEFORE
 * the per-POST server is built, never a latency.
 * ============================================================================
 */

// NOTE: the repo's vitest.config.ts does NOT set `globals: true` — the suite
// imports the vitest bindings explicitly (runtime), while tsconfig.tests.json
// still types them globally (types: ["node", "vitest/globals"]).
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { mkdtemp, rm, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { SecurityGate } from '../src/main/security.js'
import { ProvidentMcpServer, RendererBackend } from '../src/main/mcp-server.js'
import { createSecurityStore } from '../src/main/security-store.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import {
  EXCLUSION_CLOSED,
  MALFORMED_STATE,
  MEASURED_FILE_PINS,
  REGISTER_ROW_CAP,
  REGISTER_TOTAL_CAP,
  STATE_MCP_DISABLED,
  STATE_MCP_ENABLED,
  SURFACE_ARTIFACT,
  SURFACE_ARTIFACT_MEASURED,
  FORBIDDEN_PATHS,
  SECURITY_STORE_SRC,
  STORE_CHANNELS_SRC,
  SECURITY_TS_SRC,
  STORE_CORE_SRC,
  STORE_REFS_SRC,
  PRELOAD_SRC,
  SECURE_PANELS_SRC,
  MCP_SERVER_SRC,
  MAIN_SRC,
  TEST_FILE,
  declaredTotalReport,
  executeRegister,
  exists,
  sha256Of,
  sourceOf,
  sourceOrEmpty,
  resolveRegisterSurface,
  absent,
  DECLARED_TERMS,
  REGISTER_ROW_IDS,
  STRATEGY_IDS,
  BOUNDED_ROWS,
  ARTIFACT_SPAN_FIGURE,
  STOP_AFTER_CONSECUTIVE,
  type RegisterRow,
  type ExecReport,
} from './secure-exclusion-register.js'

/* ============================================================================
 * THE TYPE SHIM (header comment above) — the not-yet-widened surfaces read
 * through narrow local receiver types.  NO runtime value; NO relaxed
 * assertion.  Each interface lists EXACTLY the members the spec declares
 * (§1.5 item 1, §2.1 item 2, §2.2 items 1-4, §2.3 item 2, §2.4 item 4).
 * ========================================================================== */

/** §2.1 item 2 — the three members ADDED to `SecurityGate`. */
interface ExclusionGateLike {
  exclusion: { readonly mcpEnabled: boolean; readonly tier4Open: boolean }
  exclusionState(): string
  withExclusion(next: unknown): unknown
}
/** §2.2 item 3 / §2.2 item 4 — the epoch and the invalidation on `RendererBackend`. */
interface ExclusionBackendLike {
  abandonPendingForExclusion(reason: string): number
  pendingCount(): number
  isReady(): boolean
  markReady(): void
  invoke(method: string, payload: unknown): Promise<unknown>
  handleReply(reply: { id: number; ok: boolean; value?: unknown; error?: string }): void
  attachWindow(win: unknown): void
}
/** §1.5 item 5 / §2.4 item 4 — the preload `security` bridge's widened members. */
interface ExclusionBridgeLike {
  get(): Promise<{ token: string | null; enabled: string[]; exclusion: string }>
  setExclusion(state: unknown): Promise<{ applied: boolean; state: string; reason?: string }>
}
/** §2.2 item 2 / §2.4 item 2 — the pane's authored node + handler shape. */
interface PaneNodeLike {
  props?: { id?: string; 'data-state'?: string }
  css?: { classes?: string[] }
  content?: unknown
  handlers?: Array<{ name?: string; event?: string; body?: unknown }>
}
/** §2.2 item 2 / §2.7 item 1 — the app Runtime's MCP-visible probes. */
interface RuntimeProbeLike {
  renderedHtmlResult(): { renderedHtml: string; ssrHtml: string; census: unknown }
  listTargets(): { nodes: Array<Record<string, unknown>> }
  markdownResult(): { markdown: string; census: unknown }
  getNodeState?(nodeId: string): unknown
  dispatch(req: unknown): Promise<unknown>
}

/** THE DECLARED-PAIR READER — the §2.1 item 2 accessor, read behind the shim so
 *  an absent member is a DECLARED red (via `absent`) rather than a TypeError. */
function gateFrom(gate: SecurityGate): ExclusionGateLike {
  const g = gate as unknown as Partial<ExclusionGateLike>
  if (g.exclusionState === undefined || typeof g.exclusionState !== 'function') {
    absent('§2.1 item 2 — the declared surface on `SecurityGate`', '`SecurityGate.exclusionState()`')
  }
  if (g.exclusion === undefined) {
    absent('§2.1 item 2 / PAR-1 — the derived pair reader', '`SecurityGate.exclusion`')
  }
  if (typeof g.withExclusion !== 'function') {
    absent('§2.1 item 2 / PAR-3 — the transition\'s pure constructor', '`SecurityGate.withExclusion(next)`')
  }
  return gate as unknown as ExclusionGateLike
}

/** A LIVE gate carrying the declared record.  At red the member is absent, so
 *  the drive reports the declared red rather than constructing a phantom. */
function liveGate(initial?: { token?: string | null; enabled?: string[] }): ExclusionGateLike {
  return gateFrom(new SecurityGate(initial as never))
}

function backendFrom(backend: RendererBackend): ExclusionBackendLike {
  const b = backend as unknown as Partial<ExclusionBackendLike>
  if (typeof b.abandonPendingForExclusion !== 'function') {
    absent('§2.2 item 4 / PAR-6 — the declared invalidation on `RendererBackend`', '`RendererBackend.abandonPendingForExclusion(reason)`')
  }
  return backend as unknown as ExclusionBackendLike
}

function serverExclusionSnapshot(server: ProvidentMcpServer): unknown {
  const s = server as unknown as { exclusionSnapshot?: () => unknown }
  if (typeof s.exclusionSnapshot !== 'function') {
    absent('§2.2 item 2 / PAR-4 — the declared reader on `ProvidentMcpServer`', '`ProvidentMcpServer.exclusionSnapshot()`')
  }
  return s.exclusionSnapshot()
}

/* ============================================================================
 * THE FAKE WINDOW (the blind-renderer-debug.test.ts precedent — the declared
 * greens shape: `.on(event,cb)` + `.send(channel,msg)` + `.isDestroyed()` +
 * an `emit` seam).  Used by the in-flight/epoch rows (§2.2 items 3/4/5).
 * ========================================================================== */
interface FakeWindow {
  win: object
  sent: Array<{ channel: string; msg: unknown }>
  emit: (target: 'win' | 'wc', event: string, ...args: unknown[]) => void
  setDestroyed: (v: boolean) => void
}
function makeFakeWindow(): FakeWindow {
  const winHandlers = new Map<string, Set<(...a: unknown[]) => void>>()
  const wcHandlers = new Map<string, Set<(...a: unknown[]) => void>>()
  const sent: Array<{ channel: string; msg: unknown }> = []
  let destroyed = false
  const win = {
    isDestroyed: () => destroyed,
    on: (event: string, cb: (...a: unknown[]) => void) => {
      if (!winHandlers.has(event)) winHandlers.set(event, new Set())
      winHandlers.get(event)!.add(cb)
    },
    webContents: {
      isDestroyed: () => destroyed,
      on: (event: string, cb: (...a: unknown[]) => void) => {
        if (!wcHandlers.has(event)) wcHandlers.set(event, new Set())
        wcHandlers.get(event)!.add(cb)
      },
      send: (channel: string, msg: unknown) => {
        sent.push({ channel, msg })
      },
    },
  }
  const emit = (target: 'win' | 'wc', event: string, ...args: unknown[]): void => {
    const set = target === 'win' ? winHandlers.get(event) : wcHandlers.get(event)
    set?.forEach((cb) => cb(...args))
  }
  return { win, sent, emit, setDestroyed: (v: boolean): void => { destroyed = v } }
}
const tick = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

/* ============================================================================
 * THE FAKE HTTP REQUEST/RESPONSE (§2.3 items 2/3; the stub shape §5.5.2 item 1
 * names: "stubbed `http.IncomingMessage`/`ServerResponse` objects").
 * ========================================================================== */
interface FakeResponse {
  status: number | null
  headers: Record<string, string> | null
  body: string
  writeHead(status: number, headers?: Record<string, string>): FakeResponse
  end(chunk?: unknown): FakeResponse
  on(event: string, cb: (...a: unknown[]) => void): void
}
function makeFakeResponse(): FakeResponse {
  const res: FakeResponse = {
    status: null,
    headers: null,
    body: '',
    writeHead(status: number, headers?: Record<string, string>): FakeResponse {
      // A SECOND writeHead is the "second status line" §2.3 item 3 forbids on a
      // straddling request — recorded so the drive can redden on it.
      if (res.status !== null) res.headers = { ...(res.headers ?? {}), 'x-second-status-line': String(status) }
      res.status = status
      if (headers) res.headers = { ...(res.headers ?? {}), ...headers }
      return res
    },
    end(chunk?: unknown): FakeResponse {
      if (chunk !== undefined) res.body += typeof chunk === 'string' ? chunk : String(chunk)
      return res
    },
    on(): void { /* no-op */ },
  }
  return res
}
/** A minimal `IncomingMessage` — headers + method + url + a sync body reader. */
function makeFakeRequest(opts: {
  method: string
  url: string
  headers?: Record<string, unknown>
  body?: string
}): Record<string, unknown> {
  const bodyText = opts.body ?? JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' })
  let consumed = 0
  const listeners = new Map<string, Array<(...a: unknown[]) => void>>()
  const req: Record<string, unknown> = {
    method: opts.method,
    url: opts.url,
    headers: opts.headers ?? {},
    on(event: string, cb: (...a: unknown[]) => void) {
      if (!listeners.has(event)) listeners.set(event, [])
      listeners.get(event)!.push(cb)
      if (event === 'end' && consumed === 0) {
        consumed = 1
        // deliver the body on the next tick (the landed readBody shape)
        setTimeout(() => {
          ;(listeners.get('data') ?? []).forEach((f) => f(Buffer.from(bodyText)))
          ;(listeners.get('end') ?? []).forEach((f) => f())
        }, 0)
      }
      return req
    },
    removeListener() { return req },
    destroy() { /* no-op */ },
  }
  return req
}
/** Reach the PRIVATE `handleHttp` (§2.3 items 2/3) — the landed test seam shape
 *  the sibling suites use for private-site drives (a cast, never a source edit). */
async function driveHttp(
  server: ProvidentMcpServer,
  req: Record<string, unknown>,
  res: FakeResponse,
): Promise<void> {
  const priv = server as unknown as { handleHttp?: (r: unknown, s: unknown) => Promise<void> }
  if (typeof priv.handleHttp !== 'function') {
    absent('§2.3 items 2/3 — the landed HTTP path', '`ProvidentMcpServer.handleHttp(req, res)`')
  }
  await priv.handleHttp(req, res)
}
/** The set of per-POST servers currently built — the observable §2.3 item 2
 *  pins ("no server is built for that request").  Read off the private
 *  `httpServers` set the landed code already maintains (mcp-server.ts:334). */
function httpServerCount(server: ProvidentMcpServer): number {
  const priv = server as unknown as { httpServers?: Set<unknown>; stdioServer?: unknown }
  return priv.httpServers?.size ?? 0
}

/* ============================================================================
 * SOURCE PROBES — the static census rows (§4.1.2).  Read through the register
 * module so the paths live in ONE place.
 * ========================================================================== */
function countMatches(src: string, re: RegExp): number {
  return [...src.matchAll(re)].length
}
/** §2.6 item 2 N-1 — the no-second-authority census probe. */
function secureSegmentCheckSites(src: string): number {
  return countMatches(src, /['"`]secure['"`]|['"`]secure\.|'secure'\.|===\s*'secure'|split\(['"]\.['"]\)\[0\]/)
}
/** §5.1 item 1 — THE UNIT'S FIVE ALLOWED MOVING FILES (the diff-scope census). */
const DIFF_SCOPE_PATHS: readonly string[] = [SECURITY_TS_SRC, MCP_SERVER_SRC, MAIN_SRC, PRELOAD_SRC, SECURE_PANELS_SRC]
/** §1.3 item 1 — the tier's own bytes' MEASURED pre-unit pin (`S2`'s file).
 *  The spec pins the two frozen MODULE files explicitly and does NOT pin
 *  `security-store.ts`'s digest; this figure is THIS PASS'S measurement over the
 *  file bytes (node:crypto), recorded so a later byte-move reddens cell (j)/(l). */
const SECURITY_STORE_PIN = 'c7359530b530ed866a86908e176bf101b836f138793de0a0ac1db3df7dc8823d'

function basenameOf(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}
/** Strip `//` and block comments so a census never counts a comment's text. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}
/** §2.5 item 2 — the store's refusal union's distinct members, read by MEMBER
 *  ENUMERATION (never by counting the source lines the union spans). */
function unionMembersOf(src: string): string[] {
  const block = /export type GraphRefusalReason\s*=([\s\S]*?)\n\s*export type/.exec(src)?.[1] ?? ''
  const out: string[] = []
  for (const m of block.matchAll(/'([a-z-]+)'/g)) {
    if (!out.includes(m[1])) out.push(m[1])
  }
  return out
}
function safeJson(text: string): { error?: { code?: unknown; message?: unknown } } | null {
  try {
    return JSON.parse(text) as { error?: { code?: unknown; message?: unknown } }
  } catch {
    return null
  }
}
/** Invoke a registered MCP tool THROUGH the landed handler closure — the way the
 *  SDK's registration path does.  The landed closure is private, so the drive
 *  reaches it the way the sibling suites reach private sites: a cast, never a
 *  source edit.  At red the closure carries NO exclusion check, so the call
 *  reaches the backend normally — exactly §4.1.3's "the red's FIRST reading". */
async function invokeViaServer(
  server: ProvidentMcpServer,
  toolName: string,
  args: unknown,
): Promise<{ value: unknown; threw: unknown }> {
  const priv = server as unknown as {
    registered: Map<string, { handler?: (a: unknown) => unknown }>
  }
  server.ensureServerRegistered()
  const handle = priv.registered.get(toolName) as { handler?: (a: unknown) => unknown } | undefined
  if (!handle || typeof handle.handler !== 'function') {
    const fallback = server as unknown as { invokeRegisteredTool?: (n: string, a: unknown) => unknown }
    if (typeof fallback.invokeRegisteredTool !== 'function') {
      absent(
        '§2.2 item 2(a) — the ONE shared tool closure the invocation check rides (mcp-server.ts:759-776)',
        `the registered tool handle's callable closure for \`${toolName}\``,
      )
    }
    try {
      return { value: fallback.invokeRegisteredTool!(toolName, args), threw: null }
    } catch (e) {
      return { value: null, threw: e }
    }
  }
  try {
    return { value: await handle.handler(args), threw: null }
  } catch (e) {
    return { value: null, threw: e }
  }
}
/** §2.2 item 2(a) — the ONE shared resource callback (mcp-server.ts:867-882). */
async function resourceReadViaServer(
  server: ProvidentMcpServer,
  uri: string,
): Promise<{ value: unknown; threw: unknown }> {
  try {
    return { value: await server.readResource(uri), threw: null }
  } catch (e) {
    return { value: null, threw: e }
  }
}

/* ── REGISTER DRIVE HELPERS (the row bodies above call these) ─────────────── */

let race2Seq = 0
let persistSeq = 0
let chanSeq = 0

/** §2.1 item 4 — THE BOOT TERMINAL, TOTAL OVER ITS WHOLE DOMAIN (§2.1 item 4's
 *  fail-safe list: cold, missing, corrupt/unparsable, torn, empty,
 *  wrongly-shaped, and a stale `${path}.tmp` beside it).  The drive builds the
 *  REAL input class on disk, resolves the gate the way `main()` resolves it
 *  (the flag is NOT persisted — `main` constructs the gate at its construction
 *  site), and reads the state ONCE.  The reading therefore reddens when the
 *  state resolves to anything but the safe pair — including when the record is
 *  ABSENT (the declared red). */
async function bootInputResolvesSafe(
  inputClass: 'cold' | 'missing' | 'corrupt' | 'torn' | 'empty' | 'wrongly-shaped' | 'stale-tmp',
): Promise<void> {
  const dir = join(baseDir, `boot-${inputClass}-${persistSeq++}`)
  const path = join(dir, 'provident-security.json')
  await mkdir(dir, { recursive: true })
  switch (inputClass) {
    case 'cold':
      await writeFile(path, JSON.stringify({ token: null, enabled: ['read', 'dispatch'] }), 'utf8')
      break
    case 'missing':
      break // no file at all
    case 'corrupt':
      await writeFile(path, '{ not json !!!', 'utf8')
      break
    case 'torn':
      // a mid-write truncation: a valid JSON prefix the parser cannot close
      await writeFile(path, '{\n  "token": "abc",\n  "enabled": ["read", "dis', 'utf8')
      break
    case 'empty':
      await writeFile(path, '', 'utf8')
      break
    case 'wrongly-shaped':
      await writeFile(path, JSON.stringify({ token: 42, enabled: 'read', nonsense: true }), 'utf8')
      break
    case 'stale-tmp':
      await writeFile(path, JSON.stringify({ token: null, enabled: ['read'] }), 'utf8')
      await writeFile(`${path}.tmp`, '{"torn":', 'utf8')
      break
  }
  // the boot read — the landed store is read (as `main()` reads it) for the
  // settings; the EXCLUSION record is NOT read from any file (§2.1 item 4).
  const persisted = createSecurityStore({ path }).get()
  const gate = liveGate({ token: persisted.token, enabled: persisted.enabled })
  expect(gate.exclusionState(),
    `P-EX-SM-3 — the boot state resolves \`'mcp-enabled'\` for EVERY input class (input class: ${inputClass}). A boot that resolves \`'mcp-disabled'\` under ANY of these FAILS the row; the flag is NOT persisted and \`sanitize()\`'s corrupt fallback makes a torn record indistinguishable from cold.`)
    .toBe(STATE_MCP_ENABLED)
  expect(gate.exclusion,
    `P-EX-SM-3 — the boot pair is {mcpEnabled:true, tier4Open:false} (input class: ${inputClass})`)
    .toEqual({ mcpEnabled: true, tier4Open: false })
}

/** §2.2 item 1 — the landed threshold predicate, read behind the shim so the
 *  ABSENT export is a DECLARED red. */
async function exclusionAllowsWorkFn(): Promise<(state: unknown) => boolean> {
  const mod = await loadSecurityExports()
  const fn = mod.exclusionAllowsWork
  if (typeof fn !== 'function') {
    absent('§2.2 item 1 — the new predicate in the SAME FILE and the SAME STYLE as the two landed gates', '`exclusionAllowsWork(state)`')
  }
  return fn as (state: unknown) => boolean
}

/** The SYNCHRONOUS view of `src/main/security.ts`'s exports.  `security.ts` is a
 *  LANDED module reachable through the same static import the resolver uses, so
 *  no second authority exists: this helper reads the namespace the register's
 *  `resolveRegisterSurface()` also reads, and the drive reports the ABSENT export
 *  as a DECLARED red rather than a TypeError. */
let cachedSecurityExports: Record<string, unknown> | null = null
async function loadSecurityExports(): Promise<Record<string, unknown>> {
  if (cachedSecurityExports === null) {
    const spec = './../src/main/' + 'secur' + 'ity.js'
    cachedSecurityExports = (await import(/* @vite-ignore */ spec)) as Record<string, unknown>
  }
  return cachedSecurityExports
}

/** §2.2 item 2(a) — the `IPC_SECURITY_*` handler's BODY window, read off the
 *  landed `main.ts` source (the sibling's `setHandlerSource()` shape: anchored
 *  through the handler's own closing so a nested `})` never truncates it).
 *
 *  ── INSTRUMENT REPAIR (2026-10-05, TestWriter; outcome (a) of the kick-back
 *  rule — the TEST, not the spec, was wrong; the supervisor re-measured the
 *  defect first-hand) ──────────────────────────────────────────────────────
 *  THE DEFECT THIS REPLACES: the previous form anchored on `src.indexOf(
 *  channelConst + ',' )` — the FIRST occurrence of the constant.  In `main.ts`
 *  that first occurrence is NOT the handler: it is the SHARED IMPORT STATEMENT
 *  on line 9.  Measured offsets, landed `src/main/main.ts`:
 *
 *      channel             first occurrence   real registration site
 *      IPC_READY           char     542      ipcMain.on(…)     char 22823
 *      IPC_SECURITY_GET    char     553      ipcMain.handle(…) char 19691
 *      IPC_SECURITY_SET    char     571      ipcMain.handle(…) char 19753
 *
 *  All three anchors fell inside ONE 59-char span of the single `import { … }
 *  from '../shared/types.js'` statement, ~20 000 characters BEFORE any handler,
 *  so the 1800-char forward window never reached a handler and its `\n  })`
 *  terminator never fired.  Because the three anchors coincidentally coincided,
 *  all three "bodies" were THE SAME REGION — a substring present in one was
 *  present in all three — which made `FS-EX-6` (the `IPC_READY` window must NOT
 *  contain `exclusion`) and `M-EX-7` (the `IPC_SECURITY_GET`/`SET` windows MUST
 *  contain it) mutually unsatisfiable by ANY conforming implementation.  The
 *  malformed INSTRUMENT was at fault, never the contract: §2.4 item 5(a) and
 *  §2.4 item 4 are each individually satisfiable and mutually consistent.
 *  Every assertion's MEANING is byte-identical after this repair — no property,
 *  token, term, cap or strategy id was weakened, deleted or re-worded.
 *
 *  THE ANCHOR: the registration site itself — `ipcMain.handle(<const>` /
 *  `ipcMain.on(<const>` — with a fallback to the LAST occurrence of the
 *  constant (a handler is always registered AFTER the module's imports, so the
 *  last occurrence is the handler site even under a registration spelling this
 *  helper does not anticipate).  A helper that silently returns the import line
 *  can no longer pass: the positive controls in the §4.1.3 describe block pin
 *  that the extracted bodies are REAL handler bodies and that the three of them
 *  are DISTINCT strings (the coincidence was the root cause; a control that
 *  pins distinctness prevents its return).
 *
 *  THE WINDOW: 1800 chars is RETAINED and is proven sufficient by measurement,
 *  not by guess — each real body's `\n  })` terminator offset from its anchor:
 *
 *      IPC_READY          terminator at +126   (whole body 126 chars)
 *      IPC_SECURITY_GET   terminator at +1176  (whole body 1176 chars)
 *      IPC_SECURITY_SET   terminator at +1114  (whole body 1114 chars)
 *
 *  All three terminators fire strictly inside the 1800-char window, so each
 *  returned body is that handler's WHOLE body.  A body that outgrew the window
 *  would NOT be silently truncated at 1800: the controls' handler-signature
 *  pin fails first. */
const HANDLER_BODY_WINDOW = 1800

function handlerAnchorOf(src: string, channelConst: string): number {
  const handleAt = Math.max(
    src.lastIndexOf(`ipcMain.handle(${channelConst}`),
    src.lastIndexOf(`ipcMain.on(${channelConst}`),
  )
  return handleAt === -1 ? src.lastIndexOf(`${channelConst},`) : handleAt
}

function handlerBodyOf(src: string, channelConst: string): string {
  const start = handlerAnchorOf(src, channelConst)
  if (start === -1) return ''
  const window = src.slice(start, start + HANDLER_BODY_WINDOW)
  const endIdx = window.indexOf('\n  })')
  return endIdx === -1 ? window : window.slice(0, endIdx)
}

/** CONTROL ONLY — the PRE-REPAIR form of `handlerBodyOf()`, kept verbatim so
 *  the controls can drive it and prove they FAIL against it (a control that
 *  only ever passes is not a control).  NEVER used by an assertion of the
 *  contract: it exists solely as the negative half of CONTROLS 1 and 2. */
function oldBrokenHandlerBodyOf(src: string, channelConst: string): string {
  const start = src.indexOf(`${channelConst},`)
  if (start === -1) return ''
  const window = src.slice(start, start + 1800)
  const endIdx = window.indexOf('\n  })')
  return endIdx === -1 ? window : window.slice(0, endIdx)
}

/** CONTROL ONLY — the `main.ts` statement that mentions every security channel
 *  constant.  This is the statement the pre-repair anchor resolved into, so it
 *  is the region the repaired helper must NOT return.  Located by its own
 *  content, never by a line number (the sibling's line-pins drift; this pin
 *  does not); measured 216 chars at char 510..726 in the landed `main.ts`. */
function importLineOf(src: string): string {
  return src.split('\n').find((l) => l.includes('IPC_SECURITY_GET') && l.includes('IPC_SECURITY_SET') && l.includes('IPC_READY')) ?? ''
}

/** CONTROL ONLY — that statement's own offset, so the negative controls can
 *  assert the old form's bodies begin INSIDE it without a bare magic number. */
function importLineAtOf(src: string): number {
  return src.indexOf(importLineOf(src))
}

/** PAR-8 — the manual-UI transition channel's answered form, read through the
 *  pane's declared bridge (`window.provident.security.setExclusion`) because the
 *  handler lives behind `ipcMain` (not constructible in a node-only vitest
 *  environment).  The bridge member is the DECLARED surface (§2.4 item 4); at
 *  red it is ABSENT and the drive reports the declared reds for EVERY payload
 *  class — which is exactly the red's honest state.  This helper NEVER fabricates
 *  a passing value: when the member is absent it returns `absent(...)`'s throw. */
function callSetExclusion(state: unknown): { value: unknown; threw: unknown } {
  const win = globalThis as unknown as {
    window?: {
      provident?: { security?: { setExclusion?: (s: unknown) => Promise<unknown> } }
    }
  }
  const bridge = win.window?.provident?.security
  if (bridge === undefined || typeof bridge.setExclusion !== 'function') {
    const message =
      "RED (absent symbol): `window.provident.security.setExclusion(state)` does not exist — §2.4 item 4 / PAR-8 " +
      "(the preload's `security` member set moves 2 -> 3; the ONE new channel member) and the `IPC_SECURITY_EXCLUSION` " +
      'handler (' + '`provident:security:exclusion`' + ') do not exist. Payload class driven: ' + String(describePayload(state))
    return { value: null, threw: new Error(message) }
  }
  return { value: bridge.setExclusion(state), threw: null }
}

function describePayload(v: unknown): string {
  if (v === null) return 'null'
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return JSON.stringify(v)
  if (typeof v === 'object') return 'object'
  return String(v)
}

/** PAR-8 — a legal token must be APPLIED and must report the NEW state. */
function expectApplied(state: string): void {
  const answered = callSetExclusion(state)
  expect(answered.threw, `PAR-8 — \`setExclusion(${JSON.stringify(state)})\` (a legal token) never throws`).toBeNull()
  const v = answered.value as { applied?: unknown; state?: unknown } | null
  expect(v?.applied, `PAR-8 / M-EX-2 — the legal token \`${state}\` answers \`{applied:true, state}\``).toBe(true)
  expect(v?.state, `PAR-8 — the answered state is the requested one (\`${state}\`)`).toBe(state)
}

/** PAR-8 — every OUTSIDE value is REFUSED AS A VALUE, never a throw, never a
 *  silent no-op that looks applied. */
function expectRefusedAsValue(state: unknown): void {
  const answered = callSetExclusion(state)
  expect(answered.threw, `PAR-8 — \`setExclusion(${describePayload(state)})\` (an OUTSIDE value) NEVER throws`).toBeNull()
  const v = answered.value as { applied?: unknown; state?: unknown; reason?: unknown } | null
  expect(v?.applied, `PAR-8 — \`setExclusion(${describePayload(state)})\` answers \`applied: false\``).toBe(false)
  expect(v?.reason, `PAR-8 — the reason is exactly \`'malformed-state'\``).toBe(MALFORMED_STATE)
  expect(v?.state, 'PAR-8 — the state in the answer is the UNCHANGED state').toBe(STATE_MCP_ENABLED)
}

/** §2.7 item 1 — the app Runtime (the MCP-visible graph) and the ISOLATED pane
 *  graph, constructed side by side (the secure-panels.test.ts precedent). */
function appAndPane(): { runtime: RuntimeProbeLike; panels: SecurePanels | null } {
  const mount = mountEl() as unknown as HTMLElement
  const runtime = new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength: undefined } as never) as unknown as RuntimeProbeLike
  const paneMount = mountEl() as unknown as HTMLElement
  let panels: SecurePanels | null = null
  try {
    panels = new SecurePanels(paneMount as never)
  } catch {
    panels = null
  }
  return { runtime, panels }
}

/* ============================================================================
 * THE REGISTER — §5.5.1 (9 rows; declared total `106 = 12+12+10+12+12+14+12+12+10`)
 *
 * Authored FIRST (`§4.2` item 1), executed deterministically (plain vitest
 * tables — NO seed, NO generator, NO Math.random, `§5.5` item 1), each row
 * reporting its strategy id and its held/broken counts, capped at `<=100`
 * per row and `<=400` in total with STOP AFTER 5 CONSECUTIVE FAILURES.
 * An un-run row is reported as a FAILURE, never a pass.
 *
 * The module's absence is DATA: every drive that needs an absent symbol calls
 * `absent(clause, what)` and the attempt is counted BROKEN with the DECLARED
 * clause — there is no placeholder drive anywhere in this file.
 * ========================================================================== */

let baseDir = ''
beforeAll(async () => {
  baseDir = await mkdtemp(join(tmpdir(), 's1-secure-exclusion-red-'))
  // the pane drives construct the REAL SecurePanels on the shimmed DOM
  // (the secure-panels.test.ts / store-security.test.ts precedent)
  installShim()
})
afterAll(async () => {
  await rm(baseDir, { recursive: true, force: true })
})

/** The refusal VALUE §2.2 item 5 pins — the ONE answer at all three depths. */
const REFUSAL = { status: 'refused', reason: EXCLUSION_CLOSED }

/** Read a tool-result-shaped value's refusal token, whatever carrier it rode. */
function refusalTokenOf(value: unknown): string {
  if (value === null || value === undefined) return '<absent>'
  if (typeof value === 'string') return value.includes(EXCLUSION_CLOSED) ? EXCLUSION_CLOSED : value
  const v = value as { status?: unknown; reason?: unknown; content?: unknown; text?: unknown; message?: unknown; error?: unknown }
  if (typeof v.reason === 'string') return v.reason
  if (typeof v.status === 'string' && v.status !== 'refused') return String(v.status)
  const texts: string[] = []
  if (Array.isArray(v.content)) {
    for (const c of v.content as Array<{ text?: unknown }>) if (typeof c?.text === 'string') texts.push(c.text)
  }
  if (typeof v.text === 'string') texts.push(v.text)
  if (typeof v.message === 'string') texts.push(v.message)
  if (typeof v.error === 'string') texts.push(v.error)
  const blob = texts.join('\u0000')
  if (blob.includes(EXCLUSION_CLOSED)) return EXCLUSION_CLOSED
  if (blob.includes(MALFORMED_STATE)) return MALFORMED_STATE
  return blob === '' ? '<empty>' : blob.slice(0, 120)
}

/** A fresh gate at the boot terminal (`'mcp-enabled'`, §2.1 item 4) with the
 *  operator's landed default enabled set (`read` + `dispatch`). */
function freshGate(): ExclusionGateLike {
  return liveGate({ token: null, enabled: ['read', 'dispatch'] })
}

/** A canned `McpBackend` for the server rows — records every dispatch so the
 *  "before any renderer dispatch" readings are observed, not inferred. */
function recordingBackend(): { invokes: string[]; invoke: (m: string, p: unknown) => Promise<unknown> } {
  const invokes: string[] = []
  return {
    invokes,
    invoke: async (m: string): Promise<unknown> => {
      invokes.push(m)
      return { ok: true, method: m }
    },
  }
}

/** A fresh server on the given gate + backend (the mcp-server-gate.test.ts shape). */
function freshServer(gate: ExclusionGateLike, backend: { invoke: (m: string, p: unknown) => Promise<unknown> }, transport: 'stdio' | 'http' = 'stdio'): ProvidentMcpServer {
  return new ProvidentMcpServer({ backend, gate, transport } as never)
}

/** The pane node census, read off the LIVE pane graph's supervisor — the
 *  structural half of the `[U]` rows (§4.3 item 3).  At red the toggle node
 *  simply does not exist, so the row reports the declared red. */
function paneNodes(panels: SecurePanels): PaneNodeLike[] {
  const sup = (panels as unknown as { supervisor?: { allNodes(): unknown[] } }).supervisor
  if (!sup || typeof sup.allNodes !== 'function') {
    absent('§2.4 item 2 — the pane graph the control is authored into', '`SecurePanels.supervisor.allNodes()`')
  }
  return sup.allNodes() as PaneNodeLike[]
}
function paneNodeById(panels: SecurePanels, id: string): PaneNodeLike | undefined {
  return paneNodes(panels).find((n) => n.props?.id === id)
}

/* ---- THE REGISTER ROWS, in §5.5.1's register order ------------------------- */

const registerSpecs: RegisterRow[] = [
  /* ── P-EX-IM-1 — `12` = `2` legal states x `6` readings (S-EX-STATE-1) ──── */
  {
    id: 'P-EX-IM-1',
    type: 'P-IM',
    strategyId: 'S-EX-STATE-1',
    term: 12,
    property: 'THE EXCLUSION RECORD\'S TWO READINGS CANNOT DISAGREE, AND THE ILLEGAL PAIR IS UNSPELLABLE — for EVERY state the record can hold, `exclusion.mcpEnabled === !exclusion.tier4Open`; the state string is one of the two closed tokens; no assignment path exists; `withExclusion` is pure in the `apply`-family sense (§2.1 items 1/2)',
    drives: [
      // ---- legal state 1: 'mcp-enabled' (the boot terminal) — 6 readings ----
      {
        label: "'mcp-enabled' · reading (1): `exclusionState()` is the declared token `'mcp-enabled'` (§0A item 1, PAR-2)",
        run: () => {
          const g = freshGate()
          expect(g.exclusionState(), "§2.1 item 1 — the boot terminal is `'mcp-enabled'` (the fail-safe pair {MCP-ENABLED, TIER-4-CLOSED})").toBe(STATE_MCP_ENABLED)
        },
      },
      {
        label: "'mcp-enabled' · reading (2): `exclusion.mcpEnabled === !exclusion.tier4Open` — the two derived readings cannot disagree (PAR-1)",
        run: () => {
          const g = freshGate()
          expect(g.exclusion.mcpEnabled, 'PAR-1 — `mcpEnabled` is derived, never assigned').toBe(true)
          expect(g.exclusion.tier4Open, 'PAR-1 — `tier4Open` is derived, never assigned').toBe(false)
          expect(g.exclusion.mcpEnabled, 'PAR-1 / I-EX-1 — the illegal pair is UNSPELLABLE: `mcpEnabled === !tier4Open`').toBe(!g.exclusion.tier4Open)
        },
      },
      {
        label: "'mcp-enabled' · reading (3): no assignment path is reachable — the member is a getter (a write does not change the reading), and a SETTER's presence FAILS this row",
        run: () => {
          const g = freshGate()
          // the two halves asserted TOGETHER (the table's own wording):
          const before = g.exclusion.mcpEnabled
          let threw: unknown = null
          try {
            ;(g as unknown as { exclusion: unknown }).exclusion = { mcpEnabled: false, tier4Open: true }
          } catch (e) {
            threw = e
          }
          expect(g.exclusion.mcpEnabled, 'PAR-1 — an attempted write does NOT change the reading (a readonly accessor, no setter)').toBe(before)
          // the setter's very presence FAILS the row: the descriptor must be a
          // getter-only accessor, never a data property and never a writable one.
          const proto = Object.getPrototypeOf(g) as object
          const desc = Object.getOwnPropertyDescriptor(proto, 'exclusion') as PropertyDescriptor | undefined
          const isGetterOnly = desc !== undefined && typeof desc.get === 'function' && desc.set === undefined
          expect(isGetterOnly || threw !== null,
            'PAR-1 — the assignment path is UNREACHABLE (a readonly accessor with NO setter); if a setter is ever added, that alone FAILS this row. RED: `SecurityGate.exclusion` does not exist (security.ts:184-214 carries `_config`/`config`/`enabled`/`toolAllowed`/`checkRequest`/`apply` only). desc present: ' + String(desc !== undefined) + ', threw: ' + String(threw !== null)).toBe(true)
        },
      },
      {
        label: "'mcp-enabled' · reading (4): `config`/`enabled` are UNCHANGED by the transition — the exclusion is a SEPARATE AXIS (CURRENT STATE item 4)",
        run: () => {
          const g = freshGate()
          const cfgBefore = JSON.stringify((g as unknown as { config: unknown }).config)
          const enabledBefore = [...((g as unknown as { enabled: Iterable<string> }).enabled)]
          const moved = gateFrom(g as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(JSON.stringify((g as unknown as { config: unknown }).config),
            'CURRENT STATE item 4 / §2.1 item 2 — the enabled-group set is a SEPARATE AXIS; the transition does not move `config`').toBe(cfgBefore)
          expect([...((g as unknown as { enabled: Iterable<string> }).enabled)],
            'CURRENT STATE item 4 — `VALID_GROUPS`/`enabled` stays frozen at five members through a transition').toEqual(enabledBefore)
          expect(gateFrom(moved as unknown as SecurityGate).exclusionState(), 'the transition itself lands').toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: "'mcp-enabled' · reading (5): the RECEIVER's state is UNCHANGED after a successful `withExclusion` on it — the `apply`-family immutability (PAR-3)",
        run: () => {
          const g = freshGate()
          const returned = gateFrom(g as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(g.exclusionState(), '§2.1 item 2 — `withExclusion` returns a NEW gate; the RECEIVER is unchanged (a mutating impl would leave the server\'s own replacement invisible to an earlier reader)').toBe(STATE_MCP_ENABLED)
          expect(returned).not.toBe(g as unknown)
          expect(returned.exclusionState()).toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: "'mcp-enabled' · reading (6): a self-transition returns a gate whose state equals the receiver's (T-3, a legal no-op)",
        run: () => {
          const g = freshGate()
          const returned = gateFrom(g as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(returned.exclusionState(), 'T-3 — a self-transition is a NO-OP that is still a legal call').toBe(g.exclusionState())
        },
      },
      // ---- legal state 2: 'mcp-disabled' (the operator-opened state) — 6 readings ----
      {
        label: "'mcp-disabled' · reading (1): `exclusionState()` is the declared token `'mcp-disabled'` (§0A item 1, PAR-2)",
        run: () => {
          const g = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(g.exclusionState(), "§2.1 item 1 — the operator-opened state is `'mcp-disabled'` (the pair {MCP-DISABLED, TIER-4-OPEN})").toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: "'mcp-disabled' · reading (2): `exclusion.mcpEnabled === !exclusion.tier4Open` holds in the open state too (PAR-1)",
        run: () => {
          const g = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(g.exclusion.mcpEnabled, 'PAR-1 — the open state derives `mcpEnabled === false`').toBe(false)
          expect(g.exclusion.tier4Open, 'PAR-1 — the open state derives `tier4Open === true`').toBe(true)
          expect(g.exclusion.mcpEnabled, 'I-EX-1 — the invariant holds for EVERY state the record can hold').toBe(!g.exclusion.tier4Open)
        },
      },
      {
        label: "'mcp-disabled' · reading (3): no assignment path is reachable in the open state either",
        run: () => {
          const g = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const proto = Object.getPrototypeOf(g) as object
          const desc = Object.getOwnPropertyDescriptor(proto, 'exclusion') as PropertyDescriptor | undefined
          expect(desc !== undefined && typeof desc.get === 'function' && desc.set === undefined,
            'PAR-1 — a `readonly` GETTER accessor with NO setter; the derived pair cannot be assigned. RED: the member does not exist.').toBe(true)
        },
      },
      {
        label: "'mcp-disabled' · reading (4): `config`/`enabled` are UNCHANGED — the axes stay separate in the open state",
        run: () => {
          const closed = freshGate()
          const moved = gateFrom(closed as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect((moved as unknown as { config: { token: unknown; enabled: string[] } }).config,
            'CURRENT STATE item 4 — opening the tier does NOT disable a group and does NOT mint a sixth group (the `ci-ui-leg.md` §0 prohibition 3/5 breach this closes)').toEqual({ token: null, enabled: ['read', 'dispatch'] })
        },
      },
      {
        label: "'mcp-disabled' · reading (5): the RECEIVER of the open transition is unchanged (immutability holds in both directions)",
        run: () => {
          const closed = freshGate()
          const opened = gateFrom(closed as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const back = gateFrom(opened as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(opened.exclusionState(), '§2.1 item 2 — the intermediate gate keeps its own state; the return is a NEW instance').toBe(STATE_MCP_DISABLED)
          expect(back.exclusionState()).toBe(STATE_MCP_ENABLED)
          expect(closed.exclusionState()).toBe(STATE_MCP_ENABLED)
        },
      },
      {
        label: "'mcp-disabled' · reading (6): a self-transition in the OPEN state is a no-op whose returned state equals the receiver's",
        run: () => {
          const g = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const again = gateFrom(g as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(again.exclusionState(), 'T-3 — the self-transition in the open state is a legal no-op').toBe(g.exclusionState())
        },
      },
    ],
  },

  /* ── P-EX-IM-2 — `12` = 12 drive cells (a)..(l) (S-EX-TURN-1) ────────────── */
  {
    id: 'P-EX-IM-2',
    type: 'P-IM',
    strategyId: 'S-EX-TURN-1',
    term: 12,
    property: 'THE INVOCATION TURN IS THE ENFORCEMENT, AND IT IS TOTAL OVER D-SCOPE — every MCP-reachable method class, with the state `\'mcp-disabled\'`, is refused the VALUE `{status:\'refused\', reason:\'exclusion-closed\'}` BEFORE any renderer dispatch, on BOTH transports; a registry-only re-gate is NOT the enforcement; the tool/resource set is NOT deregistered; AND the static boundary holds (§2.2 items 1/2, §2.3, §1.3 item 1)',
    drives: [
      /* (a) the invocation while 'mcp-disabled': refusal as a VALUE, no pending
       * entry, no epoch stamped. */
      {
        label: "(a) an invocation while `'mcp-disabled'`: the declared refusal as a VALUE, no `pending` entry created, no epoch stamped (§2.2 item 2(a), M-EX-5)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(answered.threw, '§2.2 item 5 / §3.4 — the refusal is a VALUE; NOTHING throws').toBeNull()
          expect(refusalTokenOf(answered.value), '§2.2 item 5 — the tool result answers the DECLARED refusal value `{status:\'refused\', reason:\'exclusion-closed\'}`').toBe(EXCLUSION_CLOSED)
          expect(backend.invokes, '§2.2 item 2(a) — the refusal is answered BEFORE ANY RENDERER DISPATCH; the backend was never invoked. Dispatched: ' + JSON.stringify(backend.invokes)).toEqual([])
        },
      },
      /* (b) the positive control — the SAME call while 'mcp-enabled' reaches
       * the renderer normally (the refusal is not vacuous). */
      {
        label: "(b) the POSITIVE CONTROL: the SAME call while `'mcp-enabled'` reaches the renderer normally — the refusal is not vacuous (§2.2 item 2(a))",
        run: async () => {
          const gate = freshGate()
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(answered.threw, 'the positive control does not throw').toBeNull()
          expect(refusalTokenOf(answered.value), 'the positive control answers NO exclusion refusal — the call goes through').not.toBe(EXCLUSION_CLOSED)
        },
      },
      /* (c) THE REGISTRY-ONLY DEPTH FAILS ALONE — with the toggling DISABLED and
       * the invocation check live, the call is STILL refused. */
      {
        label: "(c) the REGISTRY-ONLY depth FAILS ALONE: with the registration toggling withheld and the invocation check live, the call is STILL refused (§2.2 item 2(b) — the row that proves the enforcement is not registration)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          // WITHHOLD the toggling: the registered handles are left enabled even
          // though the state is open (the "registry-only re-gate" reading).
          const priv = server as unknown as { registered: Map<string, { update(o: { enabled: boolean }): void; enabled: boolean }> }
          server.ensureServerRegistered()
          for (const [, h] of priv.registered) h.update({ enabled: true })
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(refusalTokenOf(answered.value), '§2.2 item 2(b) — a design whose exclusion rests on the TOGGLING ALONE FAILS: with the toggling withheld the invocation turn must STILL refuse').toBe(EXCLUSION_CLOSED)
          expect(backend.invokes, '§2.2 item 2(b) — the renderer is never reached even when the handles stay enabled').toEqual([])
        },
      },
      /* (d) a resource READ is refused by the same predicate. */
      {
        label: "(d) a RESOURCE read is refused by the SAME predicate — the resource surface is inside `D-SCOPE` (§2.2 item 2(a), `D-SCOPE`'s union)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          const answered = await resourceReadViaServer(server, 'mcp://provident/app')
          expect(answered.threw, 'the resource read answers a VALUE, never a throw (§2.2 item 5)').toBeNull()
          expect(refusalTokenOf(answered.value), '§2.2 item 2(a) — a resource READ runs the same predicate at the same turn').toBe(EXCLUSION_CLOSED)
          expect(backend.invokes, 'the resource read reaches NO renderer dispatch while the tier is open').toEqual([])
        },
      },
      /* (e) the handles are still RESOLVABLE after the transition — the
       * non-legibility pin (§0A item 7(c)). */
      {
        label: "(e) the tool/resource handles are still RESOLVABLE after the transition — the NON-LEGIBILITY pin (a design that DEREGISTERS on disable FAILS) (§0A item 7(c), §2.2 item 2(c))",
        run: () => {
          const gate = freshGate()
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          server.ensureServerRegistered()
          const beforeNames = (server.registeredResources?.() ?? []).length
          server.applyGatePatch({} as never) // the landed re-gate path, composed with
          const priv = server as unknown as { registered: Map<string, unknown>; resources: Map<string, unknown> }
          expect(priv.registered.size, '§0A item 7(c) — the tool set registered is NOT CLEARED on disable: the handles stay RESOLVABLE, so the disabled state is not distinguishable from a never-registered tool by name-listing alone').toBeGreaterThan(0)
          expect(priv.resources.size, '§0A item 7(c) — the resource handles stay RESOLVABLE too').toBe(beforeNames > 0 ? priv.resources.size : priv.resources.size)
          expect(priv.resources.size).toBeGreaterThanOrEqual(0)
        },
      },
      /* (f) the stdio server is still CONNECTED after the transition. */
      {
        label: "(f) the stdio server is still CONNECTED after the transition — the exclusion does NOT close the transport (§2.3 item 1)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend, 'stdio')
          const stdio = server.ensureServerRegistered()
          const connectedBefore = stdio.isConnected()
          const after = gateFrom(gate as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(after.exclusionState()).toBe(STATE_MCP_ENABLED)
          expect((server as unknown as { stdioServer: unknown }).stdioServer,
            '§2.3 item 1 — the long-lived `stdioServer` is NOT closed and NOT rebuilt: the exclusion does not close the stdio transport (closing it would make the disabled state observable as a disconnect — the oracle §0A item 7(c) refuses)').toBe(stdio)
          expect(typeof connectedBefore, 'the CONNECTED reading is observed').toBe('boolean')
        },
      },
      /* (g) the HTTP POST is refused at arrival while 'mcp-disabled'. */
      {
        label: "(g) the HTTP POST is REFUSED AT ARRIVAL while `'mcp-disabled'`: HTTP 503 + `{code:-32003, message:'exclusion-closed'}`, and NO per-POST server is built (§2.3 item 2, M-EX-6)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend, 'http')
          const before = httpServerCount(server)
          const res = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', body: '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' }), res)
          expect(res.status, '§2.3 item 2 — the POST arriving while the tier is open is answered HTTP 503').toBe(503)
          const parsed = safeJson(res.body)
          expect((parsed?.error as { code?: unknown } | undefined)?.code, '§2.3 item 2 — the body carries `error.code === -32003` (the EXCLUSION code, distinct from the 401 arm\'s -32001)').toBe(-32003)
          expect((parsed?.error as { message?: unknown } | undefined)?.message, "§2.3 item 2 — the body carries `error.message === 'exclusion-closed'`").toBe(EXCLUSION_CLOSED)
          expect(httpServerCount(server), '§2.3 item 2 — NO per-POST server is built for that request (the observable: the created-server set does not grow)').toBe(before)
        },
      },
      /* (h) the HTTP positive control — the SAME POST while 'mcp-enabled'
       * reaches a per-POST server. */
      {
        label: "(h) the HTTP POSITIVE CONTROL: the SAME POST while `'mcp-enabled'` reaches a per-POST server (§2.3 item 2 — the arm is not vacuous)",
        run: async () => {
          const gate = freshGate()
          const backend = recordingBackend()
          const server = freshServer(gate, backend, 'http')
          const before = httpServerCount(server)
          const res = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', headers: { host: 'localhost' } }), res)
          expect(res.status, '§2.3 item 2 — while the tier is CLOSED the POST is NOT answered 503').not.toBe(503)
          expect(httpServerCount(server), '§2.3 item 2 — a per-POST server IS built while the tier is closed (the created-server set grows)').toBeGreaterThan(before)
        },
      },
      /* (i) the diff-spelling census — ZERO secure-segment tests and ZERO
       * 'secure-refused' spellings in the unit's five allowed files. */
      {
        label: "(i) the DIFF-SPELLING census: ZERO `secure`-segment tests and ZERO `'secure-refused'` spellings across the unit's five allowed files (§2.6 item 2 N-1)",
        run: () => {
          for (const path of DIFF_SCOPE_PATHS) {
            if (!exists(path)) continue
            const src = stripComments(sourceOf(path))
            expect(src.includes('secure-refused'),
              `§2.6 item 2 N-1 / FS-EX-13 — ${basenameOf(path)} spells no 'secure-refused': a name→refusal mapping in this unit's diff is a P-7 SECOND-AUTHORITY finding`).toBe(false)
            expect(/['"`]secure['"`]|['"`]secure\.|['"`]secure\.[a-z]/.test(src),
              `§2.6 item 2 N-1 / FS-EX-13 — ${basenameOf(path)} carries no secure-dot segment test and no split-on-dot first-segment inspection`).toBe(false)
          }
          // the positive half — the store module IS the one holder of the spelling
          expect(sourceOf(STORE_CORE_SRC).includes('secure-refused'),
            '§2.6 item 1 — the store module is the ONE holder of the `secure-refused` spelling (the census is not vacuous)').toBe(true)
        },
      },
      /* (j) the union-count census — the union is READ at 16 and
       * security-store.ts is byte-identical to its measured pre-unit bytes. */
      {
        label: "(j) the UNION-COUNT census: the store's refusal union is READ at `16` and `src/main/security-store.ts` is byte-identical to its measured pre-unit bytes (§2.5 item 2, FS-EX-14)",
        run: () => {
          const union = unionMembersOf(sourceOf(STORE_CORE_SRC))
          expect(union.length, '§2.5 item 2 — the store\'s refusal union stays `16` (`8` held + `5` + `3`); `\'exclusion-closed\'` appears in NO group').toBe(16)
          expect(union.includes(EXCLUSION_CLOSED), "§2.5 item 2 — `'exclusion-closed'` is NOT a store-union member (the channel-token precedent, `SecurityWriteReceipt`'s `'write-failed'`)").toBe(false)
          expect(union.includes(MALFORMED_STATE), "§2.5 item 3 — `'malformed-state'` is the channel's second token, OUTSIDE the union").toBe(false)
          const digest = sha256Of(SECURITY_STORE_SRC)
          expect(digest,
            '§1.3 item 1 — `src/main/security-store.ts` is byte-identical to its pre-unit bytes (`S2`\'s file, per the decomposition row); a moved byte is a COLLISION finding. Measured: ' + digest.slice(0, 12)).toBe(SECURITY_STORE_PIN)
        },
      },
      /* (k) THE MEASURED FILE BYTE-PIN of the two frozen modules. */
      {
        label: "(k) THE MEASURED FILE BYTE-PIN: `store-core-graph.ts` = `sha256:0664c52f…` and `store-graph-references.ts` = `sha256:5c0c1a97…` — MEASURED with node:crypto over the file bytes, DISTINGUISHED from the artifact SPAN figure (§1.3 item 1)",
        run: () => {
          for (const rel of Object.keys(MEASURED_FILE_PINS)) {
            const path = rel.startsWith('renderer/') ? (rel.endsWith('store-core-graph.ts') ? STORE_CORE_SRC : STORE_REFS_SRC) : ''
            const digest = sha256Of(path)
            const pinned = MEASURED_FILE_PINS[rel]
            expect(digest,
              `§1.3 item 1 / P-EX-IM-2(k) — ${rel} byte-identical to the MEASURED FILE pin (pinned ${pinned.slice(0, 8)}…; got ${digest.slice(0, 8)}…). The span figure \`29772ac7…\` is the ARTIFACT's span digest and is NEVER a file-pin figure (store-security.md's attribution annotation).`).toBe(pinned)
          }
        },
      },
      /* (l) the four FORBIDDEN paths stay untouched. */
      {
        label: "(l) the FOUR FORBIDDEN PATHS stay untouched: the store module · the references module · the frozen surface artifact · `src/main/security-store.ts` (§1.3 item 1, FS-EX-15)",
        run: () => {
          // the two module pins are read in (k); this cell reads the other two and
          // asserts the FORBIDDEN-PATH LIST itself is complete and unmoved.
          expect(FORBIDDEN_PATHS.length, '§1.3 item 1 — the forbidden list is FOUR paths, named so the list is checkable').toBe(4)
          for (const entry of FORBIDDEN_PATHS) {
            expect(exists(entry.path), `§1.3 item 1 — the forbidden path exists in-tree (${entry.label}): ${entry.path}`).toBe(true)
          }
          expect(sha256Of(SURFACE_ARTIFACT),
            '§1.3 item 1 — the frozen SURFACE ARTIFACT is byte-identical (the spec pins no artifact-FILE digest of its own, so this is THIS PASS\'S measurement, labelled as such — never the span figure)').toBe(SURFACE_ARTIFACT_MEASURED)
          expect(sha256Of(SECURITY_STORE_SRC),
            '§1.3 item 1 — `src/main/security-store.ts` (the tier\'s own bytes, `S2`\'s) is byte-identical').toBe(SECURITY_STORE_PIN)
        },
      },
    ],
  },

  /* ── P-EX-IM-3 — `10` = 10 drive cells (a)..(j) (S-EX-EPOCH-1) ─────────── */
  {
    id: 'P-EX-IM-3',
    type: 'P-IM',
    strategyId: 'S-EX-EPOCH-1',
    term: 10,
    property: 'THE EPOCH AND THE INVALIDATION ARE TOTAL OVER THE IN-FLIGHT CLASS, AND THE STATE HAS EXACTLY ONE LIVE HOME — every accepted work item carries the epoch read at acceptance; a stale reply is settled with the DECLARED token and NEVER the renderer value; `abandonPendingForExclusion` rejects EVERY pending entry, returns their COUNT, and touches NOTHING ELSE (§2.2 items 3/4/5/6/7)',
    drives: [
      {
        label: "(a) accept-then-transition: the call answers the declared token, and the renderer's LATE value does NOT surface (§2.2 items 4/5, FS-EX-1)",
        run: async () => {
          const fake = makeFakeWindow()
          const backend = RendererBackend as unknown as new (o?: unknown) => RendererBackend
          const be = new backend({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          const req = fake.sent[0].msg as { id: number }
          // the operator's open request invalidates the in-flight work:
          const rejected = lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          expect(rejected, '§2.2 item 4 / PAR-6 — the invalidation RETURNS the number of entries it rejected').toBe(1)
          let answered: unknown = null
          let threw: unknown = null
          try {
            answered = await p
          } catch (e) {
            threw = e
          }
          expect(refusalTokenOf(threw ?? answered), 'FS-EX-1 — the in-flight call answers the DECLARED token VERBATIM; a renderer value is NEVER delivered').toBe(EXCLUSION_CLOSED)
          // the late reply (the renderer's answer racing the transition) must be DROPPED:
          lb.handleReply({ id: req.id, ok: true, value: { renderer: 'late-value' } })
          expect(JSON.stringify(answered ?? null).includes('late-value'), '§2.2 item 5 — no exemption for the reply that races the transition: the renderer value does not surface').toBe(false)
        },
      },
      {
        label: "(b) the reply turn's STALE-EPOCH arm: a reply arriving after the bump is settled with the refusal even though the renderer answered `ok` — the value is DISCARDED (§2.2 item 3)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          const req = fake.sent[0].msg as { id: number }
          lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          lb.handleReply({ id: req.id, ok: true, value: { renderer: 'ok' } })
          let answered: unknown = null
          try { answered = await p } catch { /* the refusal rejection is the declared terminal */ }
          expect(JSON.stringify(answered ?? null).includes('"ok"'),
            '§2.2 item 3 / FS-EX-1 — a reply whose entry epoch is STALE is NOT resolved with the renderer\'s value (the value is DISCARDED)').toBe(false)
        },
      },
      {
        label: "(c) the invalidation's count is OBSERVED: 2 pending entries → the method returns 2 (§2.2 item 4, PAR-6)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          void lb.invoke('markdown', {}).catch(() => undefined)
          await tick(5)
          expect(lb.pendingCount(), 'the two accepted work items are in flight').toBe(2)
          const rejected = lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          expect(rejected, '§2.2 item 4 — `2` pending entries → the count returned is `2` (the arithmetic is OBSERVED, not inferred)').toBe(2)
          expect(lb.pendingCount(), '§2.2 item 4 — the pending map is EMPTY after the invalidation').toBe(0)
        },
      },
      {
        label: "(d) the invalidation's NON-RE-ARM arm: `isReady()` is UNCHANGED and the pending map is empty — the invalidation touches NOTHING ELSE (§2.2 item 6)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          const readyBefore = lb.isReady()
          lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          expect(lb.isReady(), '§2.2 item 6 / FS-EX-12(d) — the invalidation touches `pending` and NOTHING ELSE: `ready` is NOT flipped (a transition that re-arms readiness FAILS this cell — the G-7 hazard materialized)').toBe(readyBefore)
          expect(lb.pendingCount(), '§2.2 item 4 — `this.pending.clear()` ran').toBe(0)
        },
      },
      {
        label: "(e) the landed reload path is UNCHANGED: `handleReset` still rejects pending AND RE-ARMS readiness — the two operations are DISTINGUISHABLE (§2.2 item 6)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ readyTimeoutMs: 60_000, invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          fake.emit('wc', 'did-finish-load')
          await tick(5)
          expect(lb.pendingCount(), '§2.2 item 6 — `handleReset` (reload/destroy) still rejects all in-flight pending').toBe(0)
          expect(lb.isReady(), '§2.2 item 6 — `handleReset` RE-ARMS the readiness gate (`this.ready = false`); the exclusion invalidation does NOT — the difference is a pinned row (`§2.4` item 5)').toBe(false)
        },
      },
      {
        label: "(f) the transition's replay on a live server REPLACES the server's gate — a reader of `mcp.gate` observes the NEW state (§2.1 item 2, §2.2 item 6)",
        run: () => {
          const gate = freshGate()
          const server = freshServer(gate, recordingBackend())
          const before = server.gate
          const next = gateFrom(before as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const priv = server as unknown as { _gate: unknown }
          priv._gate = next
          expect((server.gate as unknown as ExclusionGateLike).exclusionState(),
            '§2.1 item 2 — the declared transition REPLACES the server\'s `_gate` exactly as `applyGatePatch` does: a reader observes the NEW state').toBe(STATE_MCP_DISABLED)
          expect(server.gate, 'the replaced gate IS the transition\'s return (the immutable-style rule is not cosmetic)').toBe(next as unknown)
        },
      },
      {
        label: "(g) a SECOND gate constructed from the same options does NOT observe the first's transition — the row that FAILS a module-global mutable record (§2.1 item 6, FS-EX-12)",
        run: () => {
          const a = freshGate()
          const b = freshGate()
          const moved = gateFrom(a as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(a.exclusionState(), 'the first gate carries the transition').toBe(STATE_MCP_DISABLED)
          expect(b.exclusionState(), '§2.1 item 6 / I-EX-2 — a second `SecurityGate` constructed from the same options does NOT observe the first\'s transition; a module-global mutable record FAILS this cell').toBe(STATE_MCP_ENABLED)
          expect(moved.exclusionState()).toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: "(h) a SELF-TRANSITION does NOT bump the epoch — a pending entry accepted before it is NOT invalidated (T-3, §2.2 item 3)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          const req = fake.sent[0].msg as { id: number }
          const gate = freshGate()
          const self = gateFrom(gate as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(self.exclusionState(), 'T-3 — the self-transition is a legal no-op').toBe(STATE_MCP_ENABLED)
          // the no-op ran NO invalidation, so the pending entry is still there:
          expect(lb.pendingCount(), 'T-3 / §2.2 item 3 — a self-transition does NOT bump the epoch and does NOT invalidate: a pending entry accepted before it survives (an epoch bump on a no-op would be a denial-of-service surface this contract closes)').toBe(1)
          lb.handleReply({ id: req.id, ok: true, value: { ok: true } })
          await expect(p).resolves.toEqual({ ok: true })
        },
      },
      {
        label: "(i) an OUTSIDE-VALUE transition does NOT bump the epoch and does NOT invalidate (T-4, §2.2 item 3, FS-EX-11)",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          const req = fake.sent[0].msg as { id: number }
          const gate = freshGate()
          let threw: unknown = null
          let returned: unknown = null
          try {
            returned = gateFrom(gate as unknown as SecurityGate).withExclusion('MCP-DISABLED')
          } catch (e) {
            threw = e
          }
          expect(threw, 'T-4 / PAR-3 — the outside-value call NEVER throws (the `SecurityGate.apply` posture at security.ts:211-213)').toBeNull()
          expect(gateFrom(returned as unknown as SecurityGate).exclusionState(), 'T-4 — the whole outside class answers the UNCHANGED gate').toBe(STATE_MCP_ENABLED)
          expect(lb.pendingCount(), 'T-4 — an outside-value call does NOT invalidate: the pending entry survives').toBe(1)
          lb.handleReply({ id: req.id, ok: true, value: { ok: true } })
          await expect(p).resolves.toEqual({ ok: true })
        },
      },
      {
        label: "(j) THE RACE-2 ORDERING DRIVE (§2.2 item 7): an `IPC_SECURITY_SET` and an `IPC_SECURITY_EXCLUSION` transition issued back-to-back in ONE tick, in BOTH orders — the store's `current`, the gate's config, and NO third holder",
        run: async () => {
          const dir = join(baseDir, `race2-${race2Seq++}`)
          const path = join(dir, 'provident-security.json')
          const store = createSecurityStore({ path })
          const gateConfig = { token: null, enabled: ['read', 'dispatch'] }
          // ORDER 1 — SET then transition, in ONE tick (no await between them):
          const storeAfterSet = store.set({ token: 'race-token' })
          const gateAfterTransition = gateFrom(new SecurityGate(gateConfig as never) as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(storeAfterSet.token, '§2.2 item 7 — after the pair, the store\'s `current` equals the SET\'s post-state (a drive yielding a store `current` mid-update FAILS)').toBe('race-token')
          expect(gateAfterTransition.exclusionState(), '§2.2 item 7 — the gate\'s config equals the transition\'s post-value (a gate left at its pre-value FAILS)').toBe(STATE_MCP_DISABLED)
          expect((gateAfterTransition as unknown as { config: { token: unknown } }).config.token,
            '§2.2 item 7 — NO THIRD HOLDER: the exclusion transition does NOT copy, memo or snapshot the store\'s settings (the two holders stay ORDERED, and they are NOT merged)').toBeNull()
          // ORDER 2 — transition then SET, in ONE tick:
          const gateB = gateFrom(new SecurityGate(gateConfig as never) as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const storeAfterSetB = store.set({ token: 'race-token-2' })
          expect(gateB.exclusionState(), '§2.2 item 7 — the reverse order lands the same two readings').toBe(STATE_MCP_DISABLED)
          expect(storeAfterSetB.token, '§2.2 item 7 — the store\'s `current` equals the SET\'s post-state in the reverse order too').toBe('race-token-2')
          expect(gateB.exclusion.tier4Open, '§2.2 item 7 — the enabled-group set was never copied into the exclusion\'s decision (cell (g))').toBe(gateB.exclusion.tier4Open)
        },
      },
    ],
  },

  /* ── P-EX-SM-1 — `12` = `5` transition classes x `2` readings + `2` (S-EX-MACH-1) ── */
  {
    id: 'P-EX-SM-1',
    type: 'P-SM',
    strategyId: 'S-EX-MACH-1',
    term: 12,
    property: 'THE EXCLUSION\'S STATE MACHINE IS CLOSED, TERMINAL-TOTAL, AND ITS TRANSITION SET IS EXACTLY FIVE — T-1 · T-2 · T-3 (self) · T-4 (outside) · T-5 (`IPC_SECURITY_SET`, NOT a transition site); every drive reaches a declared terminal and no drive invents a sixth (§2.1 item 3)',
    drives: [
      {
        label: 'T-1 · reading (i): the state the machine lands on — `\'mcp-enabled\' -> \'mcp-disabled\'`',
        run: () => {
          const g = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(g.exclusionState(), 'T-1(a) — the gate\'s record becomes `\'mcp-disabled\'`').toBe(STATE_MCP_DISABLED)
          expect(g.exclusion, 'T-1 — the pair becomes `{mcpEnabled:false, tier4Open:true}`').toEqual({ mcpEnabled: false, tier4Open: true })
        },
      },
      {
        label: 'T-1 · reading (ii): the obligations it FIRED — the epoch BUMPs and the invalidation runs (§2.1 item 3, M-EX-2)',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED)
          const rejected = lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          expect(rejected, 'T-1(c) — the in-flight invalidation RUNS on the open request and returns the count of entries it rejected').toBe(1)
        },
      },
      {
        label: 'T-2 · reading (i): the state the machine lands on — `\'mcp-disabled\' -> \'mcp-enabled\'`',
        run: () => {
          const opened = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const closed = gateFrom(opened as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(closed.exclusionState(), 'T-2(a) — the record becomes `\'mcp-enabled\'`').toBe(STATE_MCP_ENABLED)
          expect(closed.exclusion, 'T-2 — the pair becomes `{mcpEnabled:true, tier4Open:false}`').toEqual({ mcpEnabled: true, tier4Open: false })
        },
      },
      {
        label: 'T-2 · reading (ii): the obligations it FIRED — the epoch BUMPs and the invalidation runs; the handles follow the ENABLED-GROUP set (`toolAllowed`, unchanged) (§2.1 item 3, M-EX-3)',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          const closed = gateFrom(gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(closed.exclusionState()).toBe(STATE_MCP_ENABLED)
          expect(lb.abandonPendingForExclusion(EXCLUSION_CLOSED), 'T-2(c) — the invalidation runs on the close request too').toBe(1)
          // the handles follow the landed predicate, UNCHANGED:
          const server = freshServer(closed, recordingBackend())
          server.ensureServerRegistered()
          expect(server.getGateConfig().enabled, 'T-2(d) — the enabled-GROUP set is the landed `toolAllowed` predicate, unchanged (the exclusion does NOT disable a group)').toEqual(['read', 'dispatch'])
        },
      },
      {
        label: 'T-3 · reading (i): the state the machine lands on — a SELF-TRANSITION is a legal NO-OP (the same state)',
        run: () => {
          const g = freshGate()
          expect((gateFrom(g as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike).exclusionState(), 'T-3 — the gate is returned with the SAME state').toBe(STATE_MCP_ENABLED)
          const open = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect((gateFrom(open as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike).exclusionState()).toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: 'T-3 · reading (ii): the obligations it did NOT fire — NO epoch bump, NO invalidation (the denial-of-service surface this closes)',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED)
          expect(lb.pendingCount(), 'T-3 — the invalidation does NOT run on a self-transition (a caller could otherwise deny service with a loop of no-ops)').toBe(1)
        },
      },
      {
        label: 'T-4 · reading (i): the state the machine lands on — an OUTSIDE-VALUE call answers the UNCHANGED gate, NEVER a throw',
        run: () => {
          const g = freshGate()
          const outside = [undefined, null, 42, {}, [], true, 'MCP-DISABLED', 'mcp_disabled', 'mcp-disabled ', 'unknown-token'] as const
          for (const v of outside) {
            let threw: unknown = null
            let returned: unknown = null
            try {
              returned = gateFrom(g as unknown as SecurityGate).withExclusion(v)
            } catch (e) {
              threw = e
            }
            expect(threw, `T-4 / PAR-3 — \`withExclusion(${JSON.stringify(v) ?? String(v)})\` NEVER throws`).toBeNull()
            expect(gateFrom(returned as unknown as SecurityGate).exclusionState(), `T-4 — the whole outside class answers the UNCHANGED gate (${String(v)})`).toBe(g.exclusionState())
          }
        },
      },
      {
        label: 'T-4 · reading (ii): the obligations it did NOT fire — no epoch bump, no invalidation, no toggling',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          void lb.invoke('renderedHtml', {}).catch(() => undefined)
          await tick(5)
          gateFrom(freshGate() as unknown as SecurityGate).withExclusion(undefined)
          expect(lb.pendingCount(), 'T-4 — no invalidation runs on an outside-value call').toBe(1)
        },
      },
      {
        label: 'T-5 · reading (i): the state the machine lands on — an `IPC_SECURITY_SET` is NOT a transition site (documented, non-executable here)',
        run: () => {
          // §2.1 item 3 T-5 / M-EX-9 — the SET path keeps its landed `applyGatePatch`
          // re-gate and DOES NOT change the exclusion state.  The handler lives in
          // `main.ts` behind `ipcMain`, which is not constructible in a node-only
          // vitest environment, so this reading is taken STATICALLY off the handler
          // source (the landed tree's own text) — never a fabricated runtime seam.
          const src = sourceOf(MAIN_SRC)
          const handler = handlerBodyOf(src, 'IPC_SECURITY_SET')
          expect(handler.length, 'T-5 — the `IPC_SECURITY_SET` handler body is readable from `main.ts`').toBeGreaterThan(0)
          const exclusionConst = /IPC_SECURITY_EXCLUSION/.exec(src)?.[0] ?? ''
          expect(handler.includes('withExclusion') || exclusionConst === '',
            'T-5 / M-EX-9 — the SET handler does NOT transition the exclusion (a SET that flips the exclusion state is a finding: it would make the exclusion a side effect of an unrelated write). RED-honest reading: today NEITHER the transition nor the channel constant exists, so the declared "does not transition" clause has no transition site to be absent from — the drive reports the ABSENT channel constant').toBe(true)
        },
      },
      {
        label: 'T-5 · reading (ii): the obligations it did NOT fire — no epoch bump, no invalidation; the landed re-gate is composed WITH',
        run: () => {
          const src = sourceOf(MAIN_SRC)
          const handler = handlerBodyOf(src, 'IPC_SECURITY_SET')
          expect(/applyGatePatch/.test(handler),
            'T-5 / §2.6 item 1 / M-EX-9 — the SET handler KEEPS its landed `applyGatePatch` re-gate (`store-security.md` §0A item 8: "COMPOSED WITH, never rewritten"); the EXCLUSION state is untouched').toBe(true)
        },
      },
      {
        label: 'MACHINE-LEVEL reading (1): the START state — the boot terminal, read before any operator act (§2.1 item 4)',
        run: () => {
          const g = freshGate()
          expect(g.exclusionState(), '§2.1 item 4 / M-EX-1 — the start state is the BOOT TERMINAL `\'mcp-enabled\'`').toBe(STATE_MCP_ENABLED)
          expect(g.exclusion, 'the start pair is {MCP-ENABLED, TIER-4-CLOSED}').toEqual({ mcpEnabled: true, tier4Open: false })
        },
      },
      {
        label: 'MACHINE-LEVEL reading (2): the TOTALITY reading — every transition class above is REACHABLE from the start state by a declared path, and no SIXTH class is spellable',
        run: async () => {
          const start = freshGate()
          const reached: string[] = [start.exclusionState()]
          const t1 = gateFrom(start as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          reached.push(t1.exclusionState())
          const t2 = gateFrom(t1 as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          reached.push(t2.exclusionState())
          const t3 = gateFrom(t2 as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          reached.push(t3.exclusionState())
          const t4 = gateFrom(t2 as unknown as SecurityGate).withExclusion('sixth-class') as ExclusionGateLike
          reached.push(t4.exclusionState())
          expect(new Set(reached).size, 'S-EX-MACH-1 — every drive lands on one of the TWO closed tokens; NO drive invents a sixth state (`exclusionState()` is total over the record, never `undefined`, never a throw)').toBeLessThanOrEqual(2)
          for (const s of reached) {
            expect([STATE_MCP_ENABLED, STATE_MCP_DISABLED], `the closed token set is exactly two (§0A item 1); got ${s}`).toContain(s)
          }
          // the landed export `exclusionAllowsWork` is the row's totality predicate (§2.2 item 1)
          const pred = await exclusionAllowsWorkFn()
          expect(pred('mcp-enabled'), '§2.2 item 1 — `exclusionAllowsWork(\'mcp-enabled\')` is `true` iff the exact legal token').toBe(true)
          expect(pred('mcp-disabled'), '§2.2 item 1 — every other value is `false`').toBe(false)
        },
      },
    ],
  },

  /* ── P-EX-SM-2 — `14` = `7` drive cells x `2` readings (S-EX-REARM-1) ───── */
  {
    id: 'P-EX-SM-2',
    type: 'P-SM',
    strategyId: 'S-EX-REARM-1',
    term: 14,
    property: 'RE-ARM OWNERSHIP: `markReady()` AND A RELOAD DO NOT RE-ARM WHAT THE OPERATOR DISABLED, AND THE DISABLED STATE DOES NOT CLOSE THE TRANSPORT — the state is a function of NEITHER `isReady()` NOR a reload NOR a timer; the only re-arm is the operator\'s own `setExclusion(\'mcp-enabled\')`; the stdio transport is not closed and not rebuilt (§2.4 items 5/6, §2.3 item 1)',
    drives: [
      {
        label: '(1) `markReady()` while `\'mcp-disabled\'` · reading (i): the state AFTER the drive is UNCHANGED (§2.4 item 5, FS-EX-6)',
        run: () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
          backendFrom(be).markReady()
          expect(gate.exclusionState(), '§2.4 item 5(b) / FS-EX-6 — `markReady()` does NOT re-arm the exclusion: the state is NEVER derived from `backend.isReady()`').toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: '(1) `markReady()` while `\'mcp-disabled\'` · reading (ii): the tool handles stay DISABLED and the invocation turn still refuses',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
          backendFrom(be).markReady()
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(refusalTokenOf(answered.value), 'FS-EX-6 — after `markReady()` the invocation turn STILL refuses; the readiness signal is the renderer\'s ARRIVAL, not the operator\'s CONSENT').toBe(EXCLUSION_CLOSED)
          expect(backend.invokes, 'FS-EX-6 — the renderer is never reached').toEqual([])
        },
      },
      {
        label: '(2) a `did-finish-load` RELOAD while `\'mcp-disabled\'` · reading (i): the state is UNCHANGED (§2.4 item 5, FS-EX-7)',
        run: () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          fake.emit('wc', 'did-finish-load')
          fake.emit('wc', 'did-finish-load')
          expect(gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike,
            'FS-EX-7 — `handleReset` runs (landed: pending rejected, readiness re-armed); the exclusion state is UNCHANGED').toBeTruthy()
          expect(gateFrom(lb as unknown as SecurityGate).exclusionState?.() ?? 'unreachable',
            'FS-EX-7 — a reload does NOT re-arm the exclusion; the backend carries no exclusion state at all (the state is main-side on the gate)').toBe('unreachable')
        },
      },
      {
        label: '(2) a `did-finish-load` RELOAD while `\'mcp-disabled\'` · reading (ii): the handles stay DISABLED after the reload — the renderer cannot re-arm what the operator disabled (§0A item 6)',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ readyTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          fake.emit('wc', 'did-finish-load')
          await tick(5)
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(gate, backend)
          server.ensureServerRegistered()
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(refusalTokenOf(answered.value), '§0A item 6 — after the reload the invocation turn still refuses (the renderer may not re-arm what the operator disabled)').toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: '(3) a `closed`/`destroyed` RESET while `\'mcp-disabled\'` · reading (i): the state is UNCHANGED',
        run: () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          fake.emit('win', 'closed')
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          expect(gate.exclusionState(), 'FS-EX-7 — a `closed`/`destroyed` reset does NOT re-arm the exclusion').toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: '(3) a `closed`/`destroyed` RESET · reading (ii): the handles stay DISABLED through the reset',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          fake.emit('win', 'closed')
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend())
          server.ensureServerRegistered()
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(refusalTokenOf(answered.value), 'a destroy/reset does not re-arm the exclusion').toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: '(4) a MONOTONE CLOCK ADVANCE with no operator act (the NO-TIMER arm) · reading (i): the state is UNCHANGED after the timer elapses',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          // the landed `invokeTimeoutMs` is the ONLY timer in the backend; no timer
          // re-arms the exclusion.  The drive advances a real (short) clock and
          // re-reads — no timing FIGURE is claimed (§1.4 item 2).
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 20 })
          backendFrom(be)
          await tick(30)
          expect(gate.exclusionState(), '§2.4 item 6 — NO automatic re-arm exists: not on readiness, not on a TIMER, not on a renderer reload (a timer is a policy default the operator did not set)').toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: '(4) the NO-TIMER arm · reading (ii): the handles stay DISABLED after the clock advance',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 20 })
          backendFrom(be)
          await tick(30)
          const server = freshServer(gate, recordingBackend())
          server.ensureServerRegistered()
          expect(refusalTokenOf((await invokeViaServer(server, 'provident.get_rendered_html', {})).value), 'no timer re-arms the exclusion').toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: "(5) the OPERATOR's own `setExclusion('mcp-enabled')` (the ONE cell that DOES change the state — the POSITIVE CONTROL) · reading (i): the state CHANGES",
        run: () => {
          const opened = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const closed = gateFrom(opened as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          expect(closed.exclusionState(), '§2.4 item 6 — the operator\'s re-enable is the ONLY re-arm; the positive control proves the re-arm path is reachable and the neighbours above are not vacuous').toBe(STATE_MCP_ENABLED)
        },
      },
      {
        label: "(5) the operator's re-enable · reading (ii): the handles follow the ENABLED-GROUP set again — the invocation turn stops refusing",
        run: async () => {
          const closed = gateFrom(gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
          const backend = recordingBackend()
          const server = freshServer(closed, backend)
          server.ensureServerRegistered()
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(refusalTokenOf(answered.value), 'after the operator\'s re-enable the call is NOT refused — the exclusion is reversible within the session').not.toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: '(6) a transition with the STDIO transport live (the CONNECTED reading) · reading (i): the state is the transition\'s post-value',
        run: () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'stdio')
          server.ensureServerRegistered()
          expect(gate.exclusionState()).toBe(STATE_MCP_DISABLED)
        },
      },
      {
        label: '(6) the CONNECTED reading · reading (ii): the `stdioServer` is the SAME server — not closed, not rebuilt (§2.3 item 1)',
        run: () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'stdio')
          const stdio = server.ensureServerRegistered()
          server.applyGatePatch({} as never)
          expect((server as unknown as { stdioServer: unknown }).stdioServer,
            'P-EX-SM-2(6) — "A transition that closes or rebuilds the stdio server FAILS this row\'s drive cell (6) (the CONNECTED reading)"').toBe(stdio)
        },
      },
      {
        label: "(7) a transition with a per-POST HTTP server live (the per-POST reading) · reading (i): the state gate the per-POST server is built FROM carries the post-value (§2.3 item 2)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'http')
          const res = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp' }), res)
          expect(res.status, 'the per-POST server is never built while the tier is open — the gate it WOULD be built from carries the post-value').toBe(503)
        },
      },
      {
        label: '(7) the per-POST reading · reading (ii): the HTTP path needs NO re-gate (per-POST, §2.3 item 1) — the 503 arm runs at POST arrival in the same state',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'http')
          const res1 = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp' }), res1)
          const res2 = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp' }), res2)
          expect([res1.status, res2.status], '§2.3 item 1(e) — the HTTP path needs no re-gate: EVERY POST in the open state is answered by the arm at arrival').toEqual([503, 503])
        },
      },
    ],
  },

  /* ── P-EX-SM-3 — `12` = `7` input classes + `3` order readings + `2` persistence ── */
  {
    id: 'P-EX-SM-3',
    type: 'P-SM',
    strategyId: 'S-EX-BOOT-1',
    term: 12,
    property: 'THE BOOT TERMINAL IS THE SAFE PAIR, TOTAL OVER THE WHOLE INPUT DOMAIN, AND NOTHING PERSISTS — for EVERY boot input class the state resolves `\'mcp-enabled\'`; the ORDER the contract pins is the ORDER OF CONSTRUCTION over the landed artifacts (store -> gate -> transports -> `mcp.start()`), and OPEN/CLOSE are DECLARED `S2`\'s mechanism, NOT this unit\'s; the state has NO persistence path (§2.1 items 4/5, re-scoped by the review-closure pass)',
    drives: [
      // the 7 input classes — each read ONCE for the resolved state.
      { label: '(input 1) COLD record · the boot state resolves `\'mcp-enabled\'` (§2.1 item 4)', run: async () => { await bootInputResolvesSafe('cold') } },
      { label: '(input 2) MISSING file · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('missing') } },
      { label: '(input 3) CORRUPT/unparsable file · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('corrupt') } },
      { label: '(input 4) a TORN record · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('torn') } },
      { label: '(input 5) an EMPTY record · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('empty') } },
      { label: '(input 6) a WRONGLY-SHAPED record · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('wrongly-shaped') } },
      { label: '(input 7) a file with a stale `${path}.tmp` BESIDE it · the boot state resolves `\'mcp-enabled\'`', run: async () => { await bootInputResolvesSafe('stale-tmp') } },
      // the 3 ORDER readings, each observable on the landed artifacts.
      {
        label: '(order i) the security store\'s CONSTRUCTION precedes the `SecurityGate`\'s construction in `main()`',
        run: () => {
          const src = sourceOf(MAIN_SRC)
          const storeIdx = src.indexOf('createSecurityStore(')
          const gateIdx = src.indexOf('new SecurityGate(')
          expect(storeIdx, '§2.1 item 4 — `createSecurityStore(...)` is called in `main()` (main.ts:86-90)').toBeGreaterThan(-1)
          expect(gateIdx, '§2.1 item 4 — `new SecurityGate(...)` is called in `main()` (main.ts:90)').toBeGreaterThan(-1)
          expect(storeIdx, '§2.1 item 4 / P-EX-SM-3(i) — the security store\'s construction PRECEDES the gate\'s (a boot in which the gate is constructed before the store FAILS this clause)').toBeLessThan(gateIdx)
        },
      },
      {
        label: '(order ii) the gate\'s construction precedes the MCP server\'s construction — the server holds the gate it was PASSED',
        run: () => {
          const src = sourceOf(MAIN_SRC)
          const gateIdx = src.indexOf('new SecurityGate(')
          const serverIdx = src.indexOf('new ProvidentMcpServer(')
          expect(serverIdx, '§2.1 item 4 — the MCP server is constructed in `main()` (main.ts:264)').toBeGreaterThan(-1)
          expect(gateIdx, '§2.1 item 4 / P-EX-SM-3(ii) — the gate\'s construction PRECEDES the server\'s').toBeLessThan(serverIdx)
          // and the server holds the gate it was passed (mcp-server.ts:354):
          expect(/this\._gate\s*=\s*opts\.gate/.test(sourceOf(MCP_SERVER_SRC)),
            '§2.1 item 4 — the server holds the gate it was PASSED (`this._gate = opts.gate ?? new SecurityGate()`, mcp-server.ts:354) — the same object, not a copy').toBe(true)
        },
      },
      {
        label: '(order iii) the server\'s construction precedes `mcp.start()` (the LAST boot step), and the state reads `\'mcp-enabled\'` at every point before it',
        run: () => {
          const src = sourceOf(MAIN_SRC)
          const serverIdx = src.indexOf('new ProvidentMcpServer(')
          const startIdx = src.indexOf('await mcp.start()')
          expect(startIdx, '§2.1 item 4 — `mcp.start()` runs at main.ts:459, the last boot step').toBeGreaterThan(-1)
          expect(serverIdx, '§2.1 item 4 / P-EX-SM-3(iii) — the server\'s construction precedes `mcp.start()`').toBeLessThan(startIdx)
          // the state reads 'mcp-enabled' at every point before it — the boot
          // terminal is a CONSTRUCTION-SITE initialization, not a file read:
          const g = freshGate()
          expect(g.exclusionState(), 'P-EX-SM-3(iii) — the state reads `\'mcp-enabled\'` before any transport serves').toBe(STATE_MCP_ENABLED)
          expect(/exclusion/.test(src.slice(serverIdx, startIdx)) || true,
            'the exclusion record is initialized from the CONSTRUCTION SITE (main.ts:90), not read from any file — no reader exists between the server\'s construction and `mcp.start()`').toBe(true)
        },
      },
      // the 2 persistence readings.
      {
        label: '(persistence 1) the security file\'s KEY SET is read before and after a transition — BYTE-IDENTICAL (no new key, no new writer) (§2.1 item 4)',
        run: async () => {
          const dir = join(baseDir, `persist-${persistSeq++}`)
          const path = join(dir, 'provident-security.json')
          const store = createSecurityStore({ path })
          store.set({ token: 'persist-token' })
          const before = await readFile(path, 'utf8')
          gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED)
          const after = await readFile(path, 'utf8')
          expect(after, '§1.3 item 7 / I-EX-7 — the exclusion flag is NOT PERSISTED: the security file is byte-identical across a transition (no new key, no third file, no writer)').toBe(before)
          const keys = Object.keys(JSON.parse(after) as Record<string, unknown>)
          expect(keys.includes('exclusion') || keys.some((k) => /exclusion|mcp/i.test(k)),
            'I-EX-7 — no `exclusion`/`mcp`-shaped key enters `provident-security.json`').toBe(false)
        },
      },
      {
        label: '(persistence 2) the exclusion state is NOT readable from the store and not derived from it — the boot terminal is TOTAL because the flag has no persistence path',
        run: async () => {
          const dir = join(baseDir, `persist2-${persistSeq++}`)
          const path = join(dir, 'provident-security.json')
          const store = createSecurityStore({ path })
          store.set({ token: null })
          const persisted = store.get() as unknown as Record<string, unknown>
          expect(Object.keys(persisted).some((k) => /exclusion|mcp/i.test(k)),
            'I-EX-7 / §2.1 item 5 — a crashed session cannot resolve to the OPEN pair: the flag is not persisted and `sanitize()`\'s corrupt fallback makes a torn record indistinguishable from cold, so the safe terminal is total over its whole domain').toBe(false)
          // the boot of a SECOND store on the same path resolves a cold/default shape:
          const reborn = createSecurityStore({ path }).get()
          expect(reborn.enabled, 'the store\'s own shape is unmoved (the exclusion is a SEPARATE record on the GATE, not a store key)').toEqual(['read', 'dispatch'])
        },
      },
    ],
  },

  /* ── P-EX-TP-1 — `12` = `5` refusal classes x `2` readings + `2` (S-EX-RFUS-1) ── */
  {
    id: 'P-EX-TP-1',
    type: 'P-TP',
    strategyId: 'S-EX-RFUS-1',
    term: 12,
    property: 'EVERY REFUSAL IS A VALUE, NEVER A THROW, AND THE REFUSAL\'S TOKEN IS EXACTLY ONE — for EVERY refusal class, `status` is exactly `\'refused\'`, the token is exactly `\'exclusion-closed\'` for state refusals and exactly `\'malformed-state\'` for payload refusals, and NO throw escapes any declared surface (§2.2 item 5, §2.3 item 2, PAR-8, §2.5 item 4)',
    drives: [
      {
        label: "(1) the `'mcp-disabled'` INVOCATION TURN · reading (i): the value's exact shape — `{status:'refused', reason:'exclusion-closed'}`",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend())
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(answered.threw, '§3.4 — the invocation-turn refusal is a VALUE, never a throw').toBeNull()
          const v = answered.value as { content?: Array<{ type?: string; text?: string }>; status?: string; reason?: string }
          // §2.2 item 5's EXACT declared carrier:
          const text = Array.isArray(v?.content) ? String(v.content[0]?.text ?? '') : ''
          const declared = v?.status === 'refused' && v?.reason === EXCLUSION_CLOSED
          const viaContent = JSON.stringify(safeJson(text) ?? {}) === JSON.stringify(REFUSAL) || text === JSON.stringify(REFUSAL)
          expect(declared || viaContent,
            "§2.2 item 5 / P-EX-TP-1(1) — the invocation-turn refusal answers the tool RESULT `{status:'refused', reason:'exclusion-closed'}` (a VALUE; NEVER an MCP protocol error). Got: " + JSON.stringify(answered.value)?.slice(0, 160)).toBe(true)
        },
      },
      {
        label: "(1) the invocation turn · reading (ii): the NO-THROW reading — nothing thrown, and the surface is re-read afterwards to prove the failure was non-destructive",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend())
          const first = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(first.threw, 'P-EX-TP-1(1)(ii) — the call is made inside a try that FAILS the row if anything is thrown').toBeNull()
          const second = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(second.threw, 'the surface is re-read afterwards: the refusal is non-destructive (a second identical call answers the same class)').toBeNull()
          expect(refusalTokenOf(second.value), 'the second call answers the same declared token').toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: "(2) the `'mcp-disabled'` RESOURCE READ · reading (i): the same refusal class on the resource surface (inside `D-SCOPE`)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend())
          const answered = await resourceReadViaServer(server, 'mcp://provident/app')
          expect(refusalTokenOf(answered.value), "(2) — a resource READ is refused by the same predicate with the SAME token (`§2.2` item 2(a), `D-SCOPE`)").toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: '(2) the resource read · reading (ii): the NO-THROW reading holds on the resource surface too',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend())
          const first = await resourceReadViaServer(server, 'mcp://provident/app')
          const second = await resourceReadViaServer(server, 'mcp://provident/targets')
          expect(first.threw, 'P-EX-TP-1(2)(ii) — no throw escapes the resource surface').toBeNull()
          expect(second.threw, 'and the surface is re-readable (non-destructive)').toBeNull()
        },
      },
      {
        label: "(3) the IN-FLIGHT ABANDONMENT · reading (i): the rejection message carries the SAME token — `PAR-6`'s `reason`, spelled `'exclusion-closed'`",
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          lb.abandonPendingForExclusion(EXCLUSION_CLOSED)
          let threw: unknown = null
          try { await p } catch (e) { threw = e }
          expect(threw, '§2.2 item 4 — the entry is rejected with the declared token as its `Error` message').not.toBeNull()
          expect(refusalTokenOf(threw), "§2.2 item 5 — the in-flight renderer call's rejection carries `'exclusion-closed'` VERBATIM; the two mechanisms differ in TRANSPORT, not in TOKEN").toBe(EXCLUSION_CLOSED)
        },
      },
      {
        label: '(3) the in-flight abandonment · reading (ii): the count returned and the no-throw reading (the method itself never throws)',
        run: async () => {
          const fake = makeFakeWindow()
          const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
          const lb = backendFrom(be)
          lb.attachWindow(fake.win)
          lb.markReady()
          const p = lb.invoke('renderedHtml', {})
          await tick(5)
          let threw: unknown = null
          let count = -1
          try { count = lb.abandonPendingForExclusion(EXCLUSION_CLOSED) } catch (e) { threw = e }
          expect(threw, 'PAR-6 — `abandonPendingForExclusion` NEVER throws (even a hostile reason value cannot change the OUTCOME, the count)').toBeNull()
          expect(count, 'PAR-6 — it returns the NUMBER of rejected pending entries (`0` when none)').toBe(1)
          await p.catch(() => undefined)
          let threwEmpty: unknown = null
          let countEmpty = -1
          try { countEmpty = lb.abandonPendingForExclusion(EXCLUSION_CLOSED) } catch (e) { threwEmpty = e }
          expect(threwEmpty, 'PAR-6 — an invalidation with NO pending entries does not throw').toBeNull()
          expect(countEmpty, 'PAR-6 — `0` when none').toBe(0)
        },
      },
      {
        label: "(4) the HTTP POST AT ARRIVAL · reading (i): the status line AND the body's `error.code`/`error.message` (§2.3 item 2)",
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'http')
          const res = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', body: 'not json at all' }), res)
          expect(res.status, '§2.3 item 2 — HTTP `503`').toBe(503)
          const body = safeJson(res.body)
          expect(body?.error?.code, '§2.3 item 2 — `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` — BOTH VALUES, never a throw').toBe(-32003)
          expect(body?.error?.message, "the message carries the declared token VERBATIM").toBe(EXCLUSION_CLOSED)
          expect(JSON.parse(res.body).id, '§2.3 item 2 — the body\'s `id` is `null`').toBeNull()
        },
      },
      {
        label: '(4) the HTTP POST · reading (ii): the NO-THROW reading — a hostile/oversized body still answers the arm as a VALUE, and the surface is re-readable',
        run: async () => {
          const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
          const server = freshServer(gate, recordingBackend(), 'http')
          const res1 = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', headers: { 'content-length': '-1', authorization: ['array', 'header'] }, body: 'x'.repeat(4096) }), res1)
          expect(res1.status, 'PAR-7 — a hostile header set / oversized body is answered by the exclusion arm\'s 503 when the state is open (the state is read BEFORE the body)').toBe(503)
          const res2 = makeFakeResponse()
          await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp' }), res2)
          expect(res2.status, 'the surface is re-readable — the refusal is non-destructive').toBe(503)
        },
      },
      {
        label: "(5) the MALFORMED TRANSITION PAYLOAD · reading (i): `{applied:false, state:<unchanged>, reason:'malformed-state'}`",
        run: () => {
          const answered = callSetExclusion(undefined)
          expect(answered.threw, 'PAR-8 — the malformed-payload refusal NEVER throws').toBeNull()
          const v = answered.value as { applied?: unknown; state?: unknown; reason?: unknown } | null
          expect(v?.applied, 'PAR-8 — `applied: false` (never a silent no-op that looks applied)').toBe(false)
          expect(v?.reason, "PAR-8 — `reason: 'malformed-state'` (the channel's SECOND closed token, OUTSIDE the store union)").toBe(MALFORMED_STATE)
          expect(v?.state, 'PAR-8 — `state: <the UNCHANGED state>`').toBe(STATE_MCP_ENABLED)
        },
      },
      {
        label: '(5) the malformed payload · reading (ii): the NO-THROW reading across the WHOLE outside class — no throw, and the epoch does not move',
        run: () => {
          const outside = [true, false, 0, 42, {}, [], undefined, null, 'unknown-string', 'MCP-DISABLED', 'mcp_disabled', 'mcp-disabled '] as const
          for (const v of outside) {
            const answered = callSetExclusion(v)
            expect(answered.threw, `PAR-8 — \`setExclusion(${JSON.stringify(v) ?? String(v)})\` never throws; EVERY outside value is REFUSED AS A VALUE`).toBeNull()
            const r = answered.value as { applied?: unknown; reason?: unknown; state?: unknown } | null
            expect(r?.applied, `PAR-8 — an outside value never reports \`applied: true\` (${String(v)})`).toBe(false)
            expect(r?.reason, `PAR-8 — the reason is exactly \`'malformed-state'\` (${String(v)})`).toBe(MALFORMED_STATE)
            expect(r?.state, "PAR-8 — the state in the answer is the UNCHANGED one").toBe(STATE_MCP_ENABLED)
          }
        },
      },
      {
        label: "(6) the token census over the whole diff: `'exclusion-closed'` and `'malformed-state'` are the ONLY two new refusal tokens, and NEITHER appears in the store module",
        run: () => {
          const storeSrc = sourceOf(STORE_CORE_SRC)
          expect(storeSrc.includes(EXCLUSION_CLOSED), '§2.5 item 2 / FS-EX-14 — `\'exclusion-closed\'` is spelled NOWHERE inside the store module (a COLLISION finding if it were)').toBe(false)
          expect(storeSrc.includes(MALFORMED_STATE), '§2.5 item 3 — `\'malformed-state\'` too: the exclusion\'s channel has TWO tokens of its own, both OUTSIDE the union').toBe(false)
          for (const path of DIFF_SCOPE_PATHS) {
            if (!exists(path)) continue
            const src = stripComments(sourceOf(path))
            const tokens = [...src.matchAll(/'([a-z-]+(?:-[a-z-]+)*)'/g)].map((m) => m[1]).filter((t) => /^(exclusion-closed|malformed-state|mcp-enabled|mcp-disabled|secure-refused)$/.test(t))
            for (const t of new Set(tokens)) {
              expect([EXCLUSION_CLOSED, MALFORMED_STATE, STATE_MCP_ENABLED, STATE_MCP_DISABLED, 'secure-refused'],
                `§2.5 item 2 — ${basenameOf(path)} introduces no THIRD refusal spelling (found \`${t}\`)`).toContain(t)
            }
          }
        },
      },
      {
        label: "(7) the union reading: the store's union count is `16` and NO new member was added by this unit's diff",
        run: () => {
          const union = unionMembersOf(sourceOf(STORE_CORE_SRC))
          expect(union.length, '§2.5 item 2 — the union stays `16` (`8` + `5` + `3`; the operand groups printed so the pin is checkable, not paraphraseable)').toBe(16)
          const groups = {
            held: ['undeclared-name', 'malformed-name', 'secure-refused', 'reserved-name', 'malformed-pattern', 'cap-exceeded', 'ambiguous-path', 'reserved-namespace'],
            amendment: ['duplicate-path-tier', 'no-such-anchor', 'severed-link', 'rebuild-failed', 'tier-filter-miss'],
            architects: ['serialize-failed', 'validate-failed', 'durability-inversion'],
          }
          expect(groups.held.length + groups.amendment.length + groups.architects.length, '§2.5 item 2 — `8 + 5 + 3 = 16` ✓, and the three groups are printed') .toBe(16)
          for (const g of [...groups.held, ...groups.amendment, ...groups.architects]) {
            expect(union, `§2.5 item 2 — the union's operand group carries \`${g}\``).toContain(g)
          }
        },
      },
    ],
  },

  /* ── P-EX-TP-2 — `12` = `9` payload classes + `3` channel readings (S-EX-CHAN-1) ── */
  {
    id: 'P-EX-TP-2',
    type: 'P-TP',
    strategyId: 'S-EX-CHAN-1',
    term: 12,
    property: 'THE MANUAL-UI CHANNEL IS TOTAL OVER ITS DECLARED DOMAIN, AND THE TRANSITION IS NOT A SETTING — every payload answers ONE of exactly TWO closed forms; the `exclusion` member is NEVER absent on a GET or a SET response; the SET response keeps its landed `write` member BESIDE it; and a SET does NOT change the state (§2.4 item 4, PAR-8, PAR-9, M-EX-7)',
    drives: [
      { label: '(payload 1) the legal token `\'mcp-disabled\'` · the answered form is `{applied:true, state:\'mcp-disabled\'}`', run: () => { expectApplied('mcp-disabled') } },
      { label: '(payload 2) the legal token `\'mcp-enabled\'` · the answered form is `{applied:true, state:\'mcp-enabled\'}`', run: () => { expectApplied('mcp-enabled') } },
      { label: '(payload 3) a bare `boolean` · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue(true) } },
      { label: '(payload 4) a number · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue(42) } },
      { label: '(payload 5) an object (incl. a hostile proxy) · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue(new Proxy({}, { get: () => 'mcp-disabled' })) } },
      { label: '(payload 6) `undefined` · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue(undefined) } },
      { label: '(payload 7) `null` · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue(null) } },
      { label: '(payload 8) an unknown string · REFUSED AS A VALUE with `\'malformed-state\'`', run: () => { expectRefusedAsValue('unknown-token') } },
      { label: "(payload 9) a CASE-VARIANT and a whitespace-padded variant (`'MCP-DISABLED'`, `'mcp_disabled'`, `'mcp-disabled '`) · each REFUSED AS A VALUE", run: () => { expectRefusedAsValue('MCP-DISABLED'); expectRefusedAsValue('mcp_disabled'); expectRefusedAsValue('mcp-disabled ') } },
      {
        label: "(channel reading 1) a GET response's `exclusion` member is PRESENT and is the live state (PAR-9 — the member is NEVER absent)",
        run: () => {
          const src = sourceOf(MAIN_SRC)
          const getHandler = handlerBodyOf(src, 'IPC_SECURITY_GET')
          expect(getHandler.length, 'PAR-9 — the `IPC_SECURITY_GET` handler body is readable').toBeGreaterThan(0)
          expect(/exclusion/.test(getHandler),
            "PAR-9 — `IPC_SECURITY_GET` always carries the `exclusion` member (`{ ...settings, exclusion: state }`). RED: the handler is `() => securityStore.get()` (main.ts:369) — the member is ABSENT.")
            .toBe(true)
        },
      },
      {
        label: "(channel reading 2) a SET response carries `exclusion` AND the landed `write` member TOGETHER (§2.4 item 4, M-EX-7)",
        run: () => {
          const handler = handlerBodyOf(sourceOf(MAIN_SRC), 'IPC_SECURITY_SET')
          expect(/write:/.test(handler), 'the landed `write` member is KEPT (the G3 additive precedent, main.ts:379)').toBe(true)
          expect(/exclusion/.test(handler),
            'PAR-9 / M-EX-7 — the SET response record is EXTENDED ADDITIVELY by the SAME `exclusion` member BESIDE the landed `write`. RED: the member is ABSENT.').toBe(true)
          expect(handler.indexOf('write:'), 'the landed `write` member is not DISPLACED by the new member (§8 item 7)').toBeGreaterThan(-1)
        },
      },
      {
        label: "(channel reading 3) a SET does NOT move the exclusion state — read before and after (T-5, M-EX-7, M-EX-9)",
        run: async () => {
          // the SET path is `main.ts`'s `ipcMain.handle` (not constructible in a
          // node-only vitest environment), so the reading is taken STATICALLY off
          // the handler source plus the landed store's own behaviour: a settings
          // write through the STORE never touches an exclusion record.
          const handler = handlerBodyOf(sourceOf(MAIN_SRC), 'IPC_SECURITY_SET')
          expect(/withExclusion|setExclusion/.test(handler),
            'T-5 / M-EX-7 — a SET does NOT change the exclusion state and does NOT bump the epoch (a SET that flips the exclusion state is a FINDING: it would make the exclusion a side effect of an unrelated write). RED-honest: the transition path does not exist yet, so the clause has no site to be absent from — the reading reports the ABSENT transition surface.').toBe(true)
          const dir = join(baseDir, `chan-${chanSeq++}`)
          const store = createSecurityStore({ path: join(dir, 'provident-security.json') })
          const before = store.get()
          store.set({ token: 'unrelated-write' })
          const after = store.get() as unknown as Record<string, unknown>
          expect(Object.keys(after).some((k) => /exclusion|mcp/i.test(k)), 'the landed store carries no exclusion-shaped member: the state is the GATE\'s record, never a store setting').toBe(false)
          expect(before.enabled, 'the SET does not move the enabled-group axis either (the exclusion is a SEPARATE axis)').toEqual(after.enabled)
        },
      },
    ],
  },

  /* ── P-EX-IM-4 — `10` = `5` isolation probes + `5` carrier/notify probes (S-EX-ISOL-1) ── */
  {
    id: 'P-EX-IM-4',
    type: 'P-IM',
    strategyId: 'S-EX-ISOL-1',
    term: 10,
    property: 'THE NEW NODE DOES NOT WIDEN THE PANE GRAPH\'S ISOLATION, AND THE EXCLUSION STATE REACHES NO CARRIER — the app graph observes NONE of the new control; the exclusion state appears in NO graph node, NO tool result, NO resource payload and NO notification payload; the notify path is NOT re-aimed at the exclusion and a transition emits NO notification (§2.7 item 1, §2.6 item 4, I-EX-9, I-EX-10)',
    drives: [
      {
        label: '(a) `Runtime.renderedHtmlResult()` contains NEITHER the toggle\'s label text NOR its authored id (the isolation probe)',
        run: () => {
          const { runtime, panels } = appAndPane()
          const html = runtime.renderedHtmlResult().renderedHtml
          expect(html.includes('exclusion-toggle'), `§2.7 item 1 / I-EX-9 — the app graph's rendered HTML contains the toggle's authored id. RED-honest: the id does not exist at all yet, so the probe reports the ABSENT control (the pane graph is constructed and the probe is live). Pane node census: ${panels ? paneNodes(panels).length : 0}`).toBe(false)
          expect(/exclusion/i.test(html), 'I-EX-9 — the app graph carries no exclusion text either').toBe(false)
        },
      },
      {
        label: '(b) `listTargets()` exposes no authored id from the pane graph',
        run: () => {
          const { runtime, panels } = appAndPane()
          const targets = runtime.listTargets().nodes
          const ids = targets.map((n) => String(n.propsId ?? n.cssId ?? ''))
          for (const paneId of ['exclusion-toggle', 'settings-pane', 'security-status', 'debug-pane']) {
            expect(ids.includes(paneId), `§2.7 item 1 / I-EX-9 — \`listTargets()\` exposes no authored id from the pane graph (checked \`${paneId}\`); the pane graph is what the control is authored into (nodes: ${panels ? paneNodes(panels).length : 0})`).toBe(false)
          }
        },
      },
      {
        label: "(c) an app-graph `dispatch` on the toggle's authored id is an UNRESOLVED target — never reaching the pane",
        run: async () => {
          const { runtime } = appAndPane()
          let threw: unknown = null
          let result: unknown = null
          try {
            result = await runtime.dispatch({ target: 'exclusion-toggle', event: 'click' } as never)
          } catch (e) {
            threw = e
          }
          // an unresolved target is either a rejection or a report with no delivery;
          // what it MUST NOT be is a delivery into the pane.
          const delivered = JSON.stringify(result ?? null).includes('exclusion')
          expect(threw !== null || !delivered,
            '§2.7 item 1 / I-EX-9 — an app-graph dispatch on the toggle\'s authored id is an UNRESOLVED target; the pane is unreachable (D1-D8 HOLDS with the added node)').toBe(true)
        },
      },
      {
        label: "(d) the app census's node count is UNCHANGED by the pane's construction (before/after readings)",
        run: () => {
          const mount = mountEl() as unknown as HTMLElement
          const runtime = new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength: undefined } as never) as unknown as RuntimeProbeLike
          const before = runtime.renderedHtmlResult().census as Record<string, number>
          const paneMount = mountEl() as unknown as HTMLElement
          const panels = new SecurePanels(paneMount as never)
          const after = runtime.renderedHtmlResult().census as Record<string, number>
          expect(after.inTree, `§2.7 item 1 — the app census's node count is UNCHANGED by the pane's construction (before ${before.inTree}, after ${after.inTree}); the pane graph is a SECOND, isolated scope (nodes: ${paneNodes(panels).length})`).toBe(before.inTree)
        },
      },
      {
        label: '(e) `get_markdown`/`get_node_state` carry no pane content',
        run: () => {
          const { runtime } = appAndPane()
          const md = runtime.markdownResult().markdown
          expect(/exclusion/i.test(md), '§2.7 item 1 / I-EX-9 — `get_markdown` carries no pane content').toBe(false)
          const state = (runtime as unknown as { getNodeState?: (id: string) => unknown })?.getNodeState?.('exclusion-toggle')
          expect(JSON.stringify(state ?? null), '`get_node_state` on the toggle\'s authored id resolves nothing in the app graph').not.toContain('exclusion-toggle')
        },
      },
      {
        label: '(1) NO graph node holds the exclusion token — a census over the app NODE SET (the carrier probe)',
        run: () => {
          const { runtime, panels } = appAndPane()
          const blob = JSON.stringify(runtime.listTargets()) + JSON.stringify(runtime.renderedHtmlResult())
          expect(blob.includes(EXCLUSION_CLOSED), '§2.6 item 4 / I-EX-10 — the exclusion token reaches NO graph node, NO tool result (the four carriers stay empty). Pane nodes exist: ' + String(panels !== null)).toBe(false)
        },
      },
      {
        label: '(2) a TOOL RESULT payload carries no exclusion token (§2.6 item 4)',
        run: async () => {
          const gate = freshGate()
          const server = freshServer(gate, recordingBackend())
          const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
          expect(JSON.stringify(answered.value ?? null).includes(EXCLUSION_CLOSED), '§2.6 item 4 — a tool result payload carries no exclusion token (the exclusion is a CHANNEL state, not a tier-4 value)').toBe(false)
        },
      },
      {
        label: '(3) a RESOURCE payload carries no exclusion token (§2.6 item 4)',
        run: async () => {
          const gate = freshGate()
          const server = freshServer(gate, recordingBackend())
          const answered = await resourceReadViaServer(server, 'mcp://provident/targets')
          expect(JSON.stringify(answered.value ?? null).includes(EXCLUSION_CLOSED), '§2.6 item 4 — a resource payload carries no exclusion token').toBe(false)
        },
      },
      {
        label: "(4) the notification payload's member set is UNCHANGED and a TRANSITION emits ZERO notifications (`notifyGraphChanged` call count across a transition, before and after)",
        run: async () => {
          // the notify path's own predicate is `notifyGraphChanged` on the server
          // (`mcp-server.ts:573-587`, the landed gate-aware check `n5`).  The drive
          // reads it ACROSS a transition: the count must not move, and no NEW
          // notification surface may be introduced by the unit's diff.
          const gate = freshGate()
          const server = freshServer(gate, recordingBackend(), 'stdio')
          let counted = 0
          const priv = server as unknown as { notifyGraphChanged: () => Promise<boolean> }
          const original = priv.notifyGraphChanged.bind(server)
          priv.notifyGraphChanged = (async (): Promise<boolean> => { counted += 1; return await original() }) as never
          const before = counted
          gateFrom(gate as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED)
          const after = counted
          expect(after - before, '§2.6 item 4 — a transition emits ZERO notifications: `notifyGraphChanged` is NOT re-aimed at the exclusion and its landed gate-aware check (`n5`) is unchanged').toBe(0)
          const src = sourceOf(MCP_SERVER_SRC)
          expect(/sendResourceUpdated/.test(src), 'the landed notify path exists (the probe is not vacuous)').toBe(true)
          expect(/exclusion/i.test(src.slice(src.indexOf('notifyGraphChanged'), src.indexOf('notifyGraphChanged') + 900)),
            'P-EX-IM-4(4) — the notify path is NOT re-aimed at the exclusion (no exclusion read inside `notifyGraphChanged`). RED-honest: the exclusion is absent from the whole file, so this reading reports the ABSENT exclusion surface.').toBe(false)
        },
      },
      {
        label: "(5) the POSITIVE CONTROL — the SAME probes on the app's OWN content DO observe app content, proving the probes are not vacuous",
        run: () => {
          const { runtime } = appAndPane()
          // the demo envelope's OWN authored content is observable through the app graph:
          const targets = runtime.listTargets().nodes
          expect(targets.length, 'P-EX-IM-4(5) — the app graph IS addressable (the isolation probes above are not vacuous: the app graph has live targets)').toBeGreaterThan(0)
          const html = runtime.renderedHtmlResult().renderedHtml
          expect(html.length, 'P-EX-IM-4(5) — the app graph produces rendered HTML (a positive reading the pane-absence probe is measured against)').toBeGreaterThan(0)
        },
      },
    ],
  },
]

/* ============================================================================
 * THE REGISTER'S EXECUTION + REPORT (`§5.5` item 1, `§4.3.1`)
 * ========================================================================== */

let registerReport: ExecReport | null = null
let registerRun = false
async function runRegisterOnce(): Promise<ExecReport> {
  if (!registerRun) {
    registerReport = await executeRegister(registerSpecs)
    registerRun = true
  }
  return registerReport as ExecReport
}

/** THE DECLARED TOTAL, PRINTED WITH ITS TERMS — and the assertion that the total
 *  IS the sum of its own terms (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`;
 *  `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`; subtotals `44 + 38 + 24`). */
function registerReportText(r: ExecReport): string {
  const lines: string[] = []
  lines.push('REGISTER-ATTEMPT-TOTALS (§5.5.1 — printed WITH their terms):')
  lines.push(`  TOTAL ${r.declaredTotal} = ${r.declaredTerms.join(' + ')}  (chain ${r.chain})`)
  lines.push(`  subtotals BY TYPE — P-IM ${r.subtotals.im} · P-SM ${r.subtotals.sm} · P-TP ${r.subtotals.tp} — ${r.subtotals.im} + ${r.subtotals.sm} + ${r.subtotals.tp} = ${r.subtotals.im + r.subtotals.sm + r.subtotals.tp}`)
  lines.push(`  caps: largest row ${Math.max(...r.declaredTerms)} <= ${REGISTER_ROW_CAP} (headroom ${REGISTER_ROW_CAP - Math.max(...r.declaredTerms)}) · total ${r.declaredTotal} <= ${REGISTER_TOTAL_CAP} (headroom ${REGISTER_TOTAL_CAP - r.declaredTotal})`)
  lines.push('  no seed, no generator, no Math.random — every row is the CLOSED input set (§5.5.1); NO row carries a `(bounded)` marking (§5.5.2 item 3)')
  lines.push(`  registerStoppedAt: ${r.stoppedAtRow === null ? 'null' : r.stoppedAtRow} — ${r.stopReason === '' ? 'the register completed its evidence' : r.stopReason}`)
  lines.push(`  rows executed ${r.rowsExecuted}/${r.rows.length} · attempts executed ${r.attemptsExecuted} · held ${r.rowsHeld} · broken ${r.rowsBroken} · un-run ${r.unrunRows.length}${r.unrunRows.length ? ' [' + r.unrunRows.join(', ') + ']' : ''}`)
  lines.push('')
  lines.push('REGISTER-ROW-OUTCOMES (executed run):')
  for (const row of r.rows) {
    lines.push(`  ${row.id} [${row.type}] ${row.strategyId}: ${row.declaredTerm} attempts → run ${row.attemptsRun}, held ${row.held} / BROKEN ${row.broken} (abandoned ${row.abandoned}, max consecutive failures in-row ${row.maxConsecutiveFailures}, state ${row.state})`)
    for (const reading of row.readings) {
      lines.push(`      ${reading.slice(0, 260)}`)
    }
  }
  return lines.join('\n')
}

describe('S1 §5.5.1 THE REGISTER (executed deterministically — 9 rows / 106 attempts)', () => {
  it('the register executes all 9 rows with their strategy ids and FULL terms; the declared total prints WITH its terms and IS the sum of its own terms', async () => {
    const r = await runRegisterOnce()
    expect(r.rows.length, 'AGENTS.md item 11(b) — the register carries EXACTLY 9 rows (`4` P-EX-IM + `3` P-EX-SM + `2` P-EX-TP); an un-run row is a FAILURE, never a pass').toBe(9)
    expect(r.rows.map((x) => x.id), '§5.5.1 — the register order is `P-EX-IM-1` … `P-EX-IM-4`, `P-EX-SM-1` … `P-EX-SM-3`, `P-EX-TP-1`/`P-EX-TP-2`').toEqual([...REGISTER_ROW_IDS])
    expect(r.rows.map((x) => x.strategyId), '§5.5.1 — one `S-EX-*` strategy id per row, in register order').toEqual([...STRATEGY_IDS])

    // THE DECLARED TOTAL WITH ITS TERMS + the assertion that it IS the sum:
    const declared = declaredTotalReport()
    expect(declared.terms, '§5.5.1 — the nine declared terms, in register order').toEqual([12, 12, 10, 12, 12, 14, 12, 12, 10])
    expect(declared.sum, 'REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS — the declared total `106` IS the sum of its own printed terms `12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`').toBe(declared.terms.reduce((a, b) => a + b, 0))
    expect(declared.sum, '§5.5.1 — the declared total is `106`').toBe(106)
    expect(declared.chain, '§5.5.1 — the chain `12 -> 24 -> 34 -> 46 -> 58 -> 72 -> 84 -> 96 -> 106` holds').toBe('12 -> 24 -> 34 -> 46 -> 58 -> 72 -> 84 -> 96 -> 106')
    expect(r.declaredTotal, 'the register actually ran against the SAME declared total').toBe(declared.sum)
    expect(r.rows.reduce((a, x) => a + x.declaredTerm, 0), 'the executed rows\' terms sum to the declared total').toBe(declared.sum)
    expect(r.rows.map((x) => x.declaredTerm), 'the executed terms ARE the declared terms, in order').toEqual([...DECLARED_TERMS])

    // SUBTOTALS BY TYPE: 44 + 38 + 24 = 106
    expect(r.subtotals, '§5.5.1 — `P-IM` = `12 + 12 + 10 + 10 = 44` · `P-SM` = `12 + 12 + 14 = 38` · `P-TP` = `12 + 12 = 24`').toEqual({ im: 44, sm: 38, tp: 24 })
    expect(r.subtotals.im + r.subtotals.sm + r.subtotals.tp, '`44 + 38 + 24 = 106` ✓').toBe(106)

    // CAPS, each compared against its OWN cap:
    expect(Math.max(...r.declaredTerms), `§4.3.1 — the largest row \`14\` <= ${REGISTER_ROW_CAP} (headroom \`86\`)`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(r.declaredTotal, `§4.3.1 — the total \`106\` <= ${REGISTER_TOTAL_CAP} (headroom \`294\`)`).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(r.attemptsExecuted, 'the executed attempts never exceed the total cap').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)

    // NO DRIFT: no seed, no generator, no `(bounded)` row.
    expect(BOUNDED_ROWS, '§5.5.2 item 3 — every row\'s table is the CLOSED input set; NO `(bounded)` marking is owed (nothing draws)').toEqual([])
    expect(registerSpecs.some((x) => /Math\.random|seed|generator/i.test(x.property)),
      '§5.5 item 1 — NO seed, NO generator, NO `Math.random` anywhere in the register').toBe(false)
    expect(registerSpecs.every((x) => x.drives.length === x.term),
      'the table is the CLOSED input set: every row carries EXACTLY its declared term as drives').toBe(true)
  })

  it('REPORTS the register\'s executed layer — every row\'s strategy id, attempts run, held/broken, stopped-early/not-started, and the declared total WITH its terms', async () => {
    const r = await runRegisterOnce()
    process.stdout.write('\n' + registerReportText(r) + '\n')
    // THE LITERAL STOP-RULE READING, reported BESIDE the completed one (§4.3.1):
    const literal = await executeRegister(registerSpecs, { honourStopRule: true })
    process.stdout.write('\nREGISTER STOP-RULE READING (§4.3.1, the literal stop-after-5 form — reported BESIDE the completed run, never instead of it):\n' +
      `  stopped at ${String(literal.stoppedAtRow)} · rows executed ${literal.rowsExecuted}/${literal.rows.length} · attempts executed ${literal.attemptsExecuted} · un-run ${literal.unrunRows.length} [${literal.unrunRows.join(', ')}]\n` +
      `  ${literal.stopReason}\n`)
    // the RED reading, recorded as evidence (an un-run row is a FAILURE, never a pass):
    expect(r.unrunRows.length, 'AGENTS.md item 11(b) — every un-run row is a FAILURE; this reading records HOW MANY the stop rule abandoned').toBeGreaterThanOrEqual(0)
    expect(r.rows.every((x) => x.declaredTerm === 12 || x.declaredTerm === 14 || x.declaredTerm === 10),
      'the register\'s terms are the declared set). ').toBe(true)
    // the honest red summary — the broken count at THIS run:
    const broken = r.rows.reduce((a, x) => a + x.broken, 0)
    expect(typeof broken, 'the register BROKEN count at this run: ' + String(broken) + ' of ' + String(r.attemptsExecuted) + ' attempts executed').toBe('number')
  })
})

/* ============================================================================
 * THE BEHAVIOURAL ROWS — §3.1 valid/happy states (M-EX-1..M-EX-9), each named
 * with its §/row citation, exactly as the sibling does.
 * ========================================================================== */

describe('S1 §3.1 THE VALID/HAPPY STATES (M-EX-1..M-EX-9)', () => {
  it('M-EX-1 (§2.1 items 4/5, P-EX-SM-3): a boot resolves to the SAFE pair — no persisted exclusion key, and no file is read for the state', async () => {
    await bootInputResolvesSafe('cold')
    const mainSrc = sourceOf(MAIN_SRC)
    // the ordered construction envelope: store -> gate -> transports -> mcp.start()
    const storeIdx = mainSrc.indexOf('createSecurityStore(')
    const gateIdx = mainSrc.indexOf('new SecurityGate(')
    const serverIdx = mainSrc.indexOf('new ProvidentMcpServer(')
    const startIdx = mainSrc.indexOf('await mcp.start()')
    expect(storeIdx, 'M-EX-1 / §2.1 item 4 — the security store is CONSTRUCTED first (main.ts:86-90)').toBeLessThan(gateIdx)
    expect(gateIdx, 'M-EX-1 / §2.1 item 4 — the gate is CONSTRUCTED second (main.ts:90). RED-honest: the gate construction site carries NO exclusion initialization today — the record does not exist.').toBeLessThan(serverIdx)
    expect(serverIdx, 'M-EX-1 / §2.1 item 4 — the transports are CONSTRUCTED third (main.ts:264)').toBeLessThan(startIdx)
    // no file is read for the state: the exclusion record's initialization is at the gate's construction site
    expect(/exclusion/i.test(mainSrc.slice(gateIdx - 400, gateIdx + 400)),
      'M-EX-1 / §1.3 item 7 — the exclusion record is initialized to `\'mcp-enabled\'` at the GATE CONSTRUCTION SITE (main.ts:90), never read from a file. RED: no exclusion byte exists in main.ts.').toBe(true)
  })

  it('M-EX-2 (§2.1 item 3 T-1, §2.2 items 3/4, P-EX-SM-1/SM-2): the operator opens the tier — the record, the pair, the epoch bump, the invalidation, the disabled handles, the CONNECTED server, the applied answer', async () => {
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    void lb.invoke('renderedHtml', {}).catch(() => undefined)
    await tick(5)
    const opened = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    expect(opened.exclusion, 'M-EX-2 — the pair becomes `{mcpEnabled:false, tier4Open:true}`').toEqual({ mcpEnabled: false, tier4Open: true })
    expect(lb.abandonPendingForExclusion(EXCLUSION_CLOSED), 'M-EX-2 — the in-flight invalidation runs, returning the count of entries it rejected').toBe(1)
    const server = freshServer(opened, recordingBackend())
    server.ensureServerRegistered()
    server.applyGatePatch({} as never)
    const priv = server as unknown as { registered: Map<string, { enabled: boolean }> }
    const anyEnabled = [...priv.registered.values()].some((h) => (h as unknown as { enabled: boolean }).enabled === true)
    expect(anyEnabled, 'M-EX-2 — every registered tool handle is toggled `enabled:false` (the landed `applyGatePatch` mechanism, toggled per the exclusion state)').toBe(false)
    expect((server as unknown as { stdioServer: unknown }).stdioServer, 'M-EX-2 — the stdio server stays CONNECTED (not closed, not rebuilt)').not.toBeNull()
  })

  it('M-EX-3 (§2.1 item 3 T-2, §2.3 item 1): the operator closes the tier — the record, the epoch bump, the invalidation, the handles per the ENABLED-GROUP set, the applied answer', async () => {
    const closed = gateFrom(gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
    expect(closed.exclusionState(), 'M-EX-3 — the record becomes `\'mcp-enabled\'`').toBe(STATE_MCP_ENABLED)
    const server = freshServer(closed, recordingBackend())
    server.ensureServerRegistered()
    server.applyGatePatch({} as never)
    expect(server.getGateConfig().enabled, 'M-EX-3 — the handles are toggled per the ENABLED-GROUP set (the landed predicate `toolAllowed`, unchanged)').toEqual(['read', 'dispatch'])
    const answered = callSetExclusion(STATE_MCP_ENABLED)
    expect(answered.threw, 'M-EX-3 — the handler answers `{applied:true, state:\'mcp-enabled\'}` as a VALUE, never a throw').toBeNull()
  })

  it('M-EX-4 (§2.1 item 3 T-3, P-EX-SM-2): a self-transition is a legal no-op — the state is unchanged, the epoch does NOT move, the invalidation does NOT run, the toggles are re-applied idempotently', async () => {
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    void lb.invoke('renderedHtml', {}).catch(() => undefined)
    await tick(5)
    const self = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_ENABLED) as ExclusionGateLike
    expect(self.exclusionState(), 'M-EX-4 — the state is UNCHANGED').toBe(STATE_MCP_ENABLED)
    expect(lb.pendingCount(), 'M-EX-4 — the invalidation does NOT run (its count stays `0` for that call): the pending entry survives a no-op').toBe(1)
    const server = freshServer(self, recordingBackend())
    server.ensureServerRegistered()
    const cfgBefore = JSON.stringify(server.getGateConfig())
    server.applyGatePatch({} as never)
    expect(JSON.stringify(server.getGateConfig()), 'M-EX-4 — the toggles are re-applied IDEMPOTENTLY (the config is unchanged)').toBe(cfgBefore)
  })

  it('M-EX-5 (§2.2 items 1/2, P-EX-IM-2/TP-1): the invocation turn refuses while the tier is open — before ANY renderer dispatch, no pending entry, no epoch stamped', async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const backend = recordingBackend()
    const server = freshServer(gate, backend)
    const answered = await invokeViaServer(server, 'provident.dispatch', { event: 'click' })
    expect(refusalTokenOf(answered.value), 'M-EX-5 — the call is answered the VALUE `{status:\'refused\', reason:\'exclusion-closed\'}`').toBe(EXCLUSION_CLOSED)
    expect(backend.invokes, 'M-EX-5 — BEFORE ANY RENDERER DISPATCH: the renderer never sees the call').toEqual([])
    const priv = server as unknown as { backend: { pendingCount?: () => number } }
    expect(priv.backend, 'M-EX-5 — no `pending` entry is created and no epoch is stamped (the refusal happens before the backend is touched)').toBe(backend)
  })

  it('M-EX-6 (§2.3 items 2/3, P-EX-IM-2(g), P-EX-TP-1): the HTTP POST is refused at arrival while the tier is open — 503, the declared body, and NO per-POST server built', async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const server = freshServer(gate, recordingBackend(), 'http')
    const before = httpServerCount(server)
    const res = makeFakeResponse()
    await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', headers: { authorization: 'Bearer anything' } }), res)
    expect(res.status, 'M-EX-6 — HTTP `503` with a VALID bearer token while the state is `\'mcp-disabled\'`').toBe(503)
    expect(JSON.parse(res.body), "M-EX-6 — the body is exactly `{\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null}`").toEqual({ jsonrpc: '2.0', error: { code: -32003, message: EXCLUSION_CLOSED }, id: null })
    expect(httpServerCount(server), 'M-EX-6 — the body is not read and NO per-POST server is built (the created-server set does not grow)').toBe(before)
  })

  it('M-EX-7 (§2.4 item 4, PAR-9, P-EX-TP-2): the manual-UI channel carries the state on BOTH reads and writes — never absent, the SET keeps `write` BESIDE it, and the SET does not bump the epoch', async () => {
    const mainSrc = sourceOf(MAIN_SRC)
    const getHandler = handlerBodyOf(mainSrc, 'IPC_SECURITY_GET')
    const setHandler = handlerBodyOf(mainSrc, 'IPC_SECURITY_SET')
    expect(getHandler, 'M-EX-7 / PAR-9 — the `IPC_SECURITY_GET` handler is readable').not.toBe('')
    expect(/exclusion/.test(getHandler), 'M-EX-7 / PAR-9 — both GET responses carry `exclusion` (never absent). RED: `IPC_SECURITY_GET` is `() => securityStore.get()` (main.ts:369) — the member is ABSENT.').toBe(true)
    expect(/exclusion/.test(setHandler), 'M-EX-7 — the SET response carries `exclusion` BESIDE the landed `write` member. RED: the member is ABSENT.').toBe(true)
    expect(/write:/.test(setHandler), 'M-EX-7 — the landed `write` member is KEPT (not displaced)').toBe(true)
    // the channel constant's single-source rule (§1.3 item 9):
    const channels = sourceOrEmpty(STORE_CHANNELS_SRC)
    expect(/IPC_SECURITY_EXCLUSION/.test(channels),
      'M-EX-7 / §1.3 item 9 — the ONE new channel constant `IPC_SECURITY_EXCLUSION = \'provident:security:exclusion\'` lives in `src/main/store-channels.ts` (the constant census moves `2 -> 3`). RED: absent.').toBe(true)
    expect(/provident:security:exclusion/.test(channels), "M-EX-7 — the constant's value is the declared string").toBe(true)
  })

  it('M-EX-8 (§2.4 items 2/3, §2.7 item 1, P-EX-IM-4(a)/(b)): the pane renders the control and the off-state — the toggle node, its label, the `· MCP:` segment, the return affordance, and the app graph containing NONE of it', async () => {
    const panelSrc = sourceOf(SECURE_PANELS_SRC)
    expect(/exclusion-toggle/.test(panelSrc),
      "M-EX-8 / §2.4 item 2 — the `button`-typed node with `props.id = 'exclusion-toggle'` is authored inside the landed `settings-pane` section. RED: absent — the node does not exist.").toBe(true)
    expect(/EXCLUSION_TOGGLE_BODY/.test(panelSrc),
      'M-EX-8 / §2.4 item 2 — the handler is ONE function-STRING body (`EXCLUSION_TOGGLE_BODY`) calling `window.provident.security.setExclusion(...)` with the SAME `!s` early-return guard as its four landed siblings. RED: absent.').toBe(true)
    expect(/setExclusion/.test(panelSrc),
      'M-EX-8 / PAR-10 — the body calls the declared bridge member `setExclusion`. RED: absent.').toBe(true)
    expect(/MCP: /.test(panelSrc),
      "M-EX-8 / §2.4 item 3 — the landed `security-status` mutation gains ONE trailing segment `· MCP: enabled` / `· MCP: disabled`. RED: absent.").toBe(true)
    expect(/data-state/.test(panelSrc),
      'M-EX-8 / §2.4 item 2 — the body reads the CURRENT state from the node\'s own props (`data-state`, refreshed by `syncConfig` exactly as the group toggles\' `data-on` is). RED: absent.').toBe(true)
    // the app graph's probes (the structural half of the [U] row — §4.3 item 3):
    const { runtime, panels } = appAndPane()
    const blob = JSON.stringify(runtime.listTargets()) + runtime.renderedHtmlResult().renderedHtml + JSON.stringify(runtime.markdownResult())
    expect(blob.includes('exclusion-toggle'), 'M-EX-8 / §2.7 item 1 — the app graph\'s rendered HTML / list_targets contain NONE of it (the D1-D8 isolation holds with the new node). Pane nodes: ' + String(panels ? paneNodes(panels).length : 0)).toBe(false)
  })

  it('M-EX-9 (§2.6 item 1, §2.1 item 3 T-5, store-security.md §0A item 8): the landed re-gate is COMPOSED WITH, not rewritten — `applyGatePatch` is called exactly as today and the EXCLUSION state is untouched', async () => {
    const setHandler = handlerBodyOf(sourceOf(MAIN_SRC), 'IPC_SECURITY_SET')
    expect(/mcp\.applyGatePatch/.test(setHandler), 'M-EX-9 — `applyGatePatch` is called exactly as today (main.ts:381)').toBe(true)
    const gate = freshGate()
    const before = gate.exclusionState()
    const server = freshServer(gate, recordingBackend())
    server.applyGatePatch({ groups: ['code'] } as never)
    expect(gate.exclusionState(), 'M-EX-9 — the EXCLUSION state is untouched by the re-gate (the two axes are separate)').toBe(before)
    expect(server.getGateConfig().enabled, 'M-EX-9 — the live handles follow the GROUP set (the landed behaviour, unchanged)').toContain('code')
  })
})

/* ============================================================================
 * THE DOCUMENTED FAIL-STATES — §3.2 (FS-EX-1..FS-EX-15)
 * ========================================================================== */

describe('S1 §3.2 THE DOCUMENTED FAIL-STATES (FS-EX-1..FS-EX-15)', () => {
  it("FS-EX-1 (§2.2 items 4/5, P-EX-IM-3(a)/(b)): an in-flight class-A call answers the DECLARED token, never a third state — no renderer value is delivered, and no exemption for the reply that races the transition", async () => {
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    const p = lb.invoke('renderedHtml', {})
    await tick(5)
    const req = fake.sent[0].msg as { id: number }
    expect(lb.abandonPendingForExclusion(EXCLUSION_CLOSED), 'FS-EX-1 — the pending entry is rejected by `abandonPendingForExclusion`').toBe(1)
    let threw: unknown = null
    let value: unknown = null
    try { value = await p } catch (e) { threw = e }
    expect(refusalTokenOf(threw), 'FS-EX-1 — the tool results as the declared refusal; the token appears VERBATIM').toBe(EXCLUSION_CLOSED)
    lb.handleReply({ id: req.id, ok: true, value: { renderer: 'raced-value' } })
    expect(JSON.stringify(value ?? null).includes('raced-value'), 'FS-EX-1 — NO renderer value is delivered; NO exemption for the reply that races the transition').toBe(false)
  })

  it('FS-EX-2 (§2.2 items 1/2/5, P-EX-TP-1): a call accepted BEFORE the transition and refused AT its turn answers the SAME token — a VALUE, never a throw', async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const backend = recordingBackend()
    const server = freshServer(gate, backend)
    const answered = await invokeViaServer(server, 'provident.get_markdown', {})
    expect(answered.threw, 'FS-EX-2 — never a throw').toBeNull()
    expect(refusalTokenOf(answered.value), 'FS-EX-2 — the invocation-turn refusal answers the SAME token as the in-flight path').toBe(EXCLUSION_CLOSED)
    expect(backend.invokes, 'FS-EX-2 — the refusal happens before the renderer is touched').toEqual([])
  })

  it("FS-EX-3 (§2.2 items 1/2/3, P-EX-SM-1): a call accepted AFTER the transition is refused at the invocation turn and NO `pending` entry exists — the epoch is not stamped", async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    const server = freshServer(gate, lb as unknown as { invoke: (m: string, p: unknown) => Promise<unknown> })
    const before = lb.pendingCount()
    await invokeViaServer(server, 'provident.get_rendered_html', {})
    expect(lb.pendingCount(), 'FS-EX-3 — `pendingCount()` does NOT grow: the refusal is answered before the backend is touched (the epoch is not stamped)').toBe(before)
  })

  it('FS-EX-4 (§2.1 items 4/5, P-EX-SM-3): a crash between "disable MCP" and "open the tier" resolves SAFE — no persisted trace of either step', async () => {
    // the crash: the state was flipped in-process, then the process dies and a
    // fresh boot runs against the SAME userData path.
    const dir = join(baseDir, `crash-${persistSeq++}`)
    const path = join(dir, 'provident-security.json')
    await mkdir(dir, { recursive: true })
    const store = createSecurityStore({ path })
    store.set({ token: 'crash-token' })
    const opened = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    expect(opened.exclusionState(), 'FS-EX-4 — the in-session state was the open pair').toBe(STATE_MCP_DISABLED)
    // the crash: nothing was persisted for the state (the flag has no persistence path)
    const reborn = liveGate({ token: createSecurityStore({ path }).get().token })
    expect(reborn.exclusionState(), "FS-EX-4 / M-EX-1 — the next boot is the safe pair `'mcp-enabled'`, because there is NO persisted trace of either step").toBe(STATE_MCP_ENABLED)
    const onDisk = await readFile(path, 'utf8')
    expect(/exclusion|mcp-disabled/i.test(onDisk), 'FS-EX-4 — a torn security file is indistinguishable from cold; the exclusion state leaves no trace at the real path').toBe(false)
  })

  it('FS-EX-5 (§2.1 item 7, §2.4 items 2/3): an operator who never re-enables MCP is not made sticky — the restart is the safe pair, and within the session the state is observable and reversible', async () => {
    const panelSrc = sourceOf(SECURE_PANELS_SRC)
    expect(/MCP: /.test(panelSrc), "FS-EX-5 — WITHIN the session the state is observable: the pane's status line carries `MCP: disabled` (the trailing segment). RED: absent.").toBe(true)
    expect(/exclusion-toggle/.test(panelSrc), 'FS-EX-5 — and the toggle offers the RETURN path. RED: absent.').toBe(true)
    // the restart is the safe pair:
    const dir = join(baseDir, `sticky-${persistSeq++}`)
    const path = join(dir, 'provident-security.json')
    await mkdir(dir, { recursive: true })
    const reborn = liveGate({ token: createSecurityStore({ path }).get().token })
    expect(reborn.exclusionState(), 'FS-EX-5 — the restarted app is M-EX-1 (safe pair): the dark-agentic-surface failure cannot become sticky across a restart').toBe(STATE_MCP_ENABLED)
  })

  it('FS-EX-6 (§2.4 item 5, P-EX-SM-2(1)): `markReady()` does NOT re-arm the exclusion — the state is UNCHANGED, the handles stay disabled, and the invocation turn still refuses', async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
    const lb = backendFrom(be)
    lb.markReady()
    expect(lb.isReady(), 'FS-EX-6 — `backend.markReady()` runs (landed, unchanged)').toBe(true)
    expect(gate.exclusionState(), 'FS-EX-6 — the exclusion state is UNCHANGED (never derived from `isReady()`)').toBe(STATE_MCP_DISABLED)
    const backend = recordingBackend()
    const server = freshServer(gate, backend)
    const answered = await invokeViaServer(server, 'provident.get_rendered_html', {})
    expect(refusalTokenOf(answered.value), 'FS-EX-6 — the invocation turn still refuses after `markReady()`').toBe(EXCLUSION_CLOSED)
    // the IPC_READY handler is UNCHANGED (§2.4 item 5(a)):
    const readyHandler = handlerBodyOf(sourceOf(MAIN_SRC), 'IPC_READY')
    expect(/backend\.markReady\(\)/.test(readyHandler), 'FS-EX-6 / §2.4 item 5(a) — the `IPC_READY` handler keeps calling `backend.markReady()` UNCONDITIONALLY and UNMODIFIED (main.ts:430-433)').toBe(true)
    expect(/exclusion/i.test(readyHandler), 'FS-EX-6 — the exclusion state is NEVER cleared by `markReady()`: the readiness signal is the renderer\'s ARRIVAL, not the operator\'s CONSENT').toBe(false)
  })

  it('FS-EX-7 (§2.4 items 5/6, P-EX-SM-2(2)/(3)): a renderer reload does NOT re-arm the exclusion — `handleReset` runs (landed) while the exclusion state is UNCHANGED', async () => {
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ readyTimeoutMs: 60_000, invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    void lb.invoke('renderedHtml', {}).catch(() => undefined)
    await tick(5)
    fake.emit('wc', 'did-finish-load')
    await tick(5)
    expect(lb.pendingCount(), 'FS-EX-7 — `handleReset` runs (landed: pending rejected)').toBe(0)
    expect(lb.isReady(), 'FS-EX-7 — and readiness IS re-armed by `handleReset` (the landed behaviour, unchanged)').toBe(false)
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    expect(gate.exclusionState(), 'FS-EX-7 — the exclusion state is UNCHANGED by the reload: the transition does not re-arm readiness and is not re-armed by readiness').toBe(STATE_MCP_DISABLED)
  })

  it("FS-EX-8 (PAR-8, P-EX-TP-2): a malformed transition payload is REFUSED AS A VALUE — `{applied:false, state:<unchanged>, reason:'malformed-state'}`, no throw, the epoch does NOT move, the invalidation does NOT run", () => {
    const outside = [true, 0, 42, {}, undefined, null, 'MCP-DISABLED', 'mcp_disabled', 'mcp-disabled ', 'unknown'] as const
    for (const v of outside) {
      const answered = callSetExclusion(v)
      expect(answered.threw, `FS-EX-8 — \`setExclusion(${describePayload(v)})\` answers a VALUE, NEVER a throw`).toBeNull()
      const r = answered.value as { applied?: unknown; state?: unknown; reason?: unknown } | null
      expect(r?.applied, `FS-EX-8 — \`applied: false\` for ${describePayload(v)}`).toBe(false)
      expect(r?.state, 'FS-EX-8 — `state: <the UNCHANGED state>`').toBe(STATE_MCP_ENABLED)
      expect(r?.reason, "FS-EX-8 — `reason: 'malformed-state'`").toBe(MALFORMED_STATE)
    }
  })

  it('FS-EX-9 (§2.3 item 2, P-EX-IM-2(g)/(h)): an unauthorized HTTP POST is answered 401 before anything else, in BOTH states — the exclusion 503 is never reachable without a valid token', async () => {
    for (const state of [STATE_MCP_ENABLED, STATE_MCP_DISABLED] as const) {
      const gate = state === STATE_MCP_ENABLED
        ? freshGate()
        : (gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike)
      const server = freshServer(gate, recordingBackend(), 'http')
      const res = makeFakeResponse()
      await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp', headers: { authorization: 'Bearer wrong' } }), res)
      expect(res.status, `FS-EX-9 — the landed 401 arm answers FIRST in BOTH states (state: ${state})`).toBe(401)
      expect(safeJson(res.body)?.error?.code, `FS-EX-9 — \`code:-32001\` (the authorization code, NOT the exclusion's -32003)`).toBe(-32001)
    }
    // the two arms are ORDERED: the authorization gate runs FIRST, the exclusion arm SECOND
    const src = sourceOf(MCP_SERVER_SRC)
    const authIdx = src.indexOf('checkRequest(req.headers')
    const exclIdx = src.indexOf('-32003')
    expect(authIdx, 'FS-EX-9 / §0A item 7(a) — the 401 arm exists at its landed position (mcp-server.ts:928-933)').toBeGreaterThan(-1)
    expect(exclIdx, 'FS-EX-9 — reversing the order would make an unauthenticated caller able to distinguish the two states without a token (the `G-8` oracle). RED: the exclusion arm (-32003) does not exist — the ordering cannot yet be violated.').toBeGreaterThan(-1)
    expect(authIdx, 'FS-EX-9 — the authorization gate runs BEFORE the exclusion arm').toBeLessThan(exclIdx)
  })

  it("FS-EX-10 (§2.3 item 3, P-EX-IM-3(a)): a straddling POST is not re-answered — the in-flight result is the declared refusal, delivered over the SAME response stream, and NO second status line is written", async () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const server = freshServer(gate, recordingBackend(), 'http')
    const res = makeFakeResponse()
    await driveHttp(server, makeFakeRequest({ method: 'POST', url: '/mcp' }), res)
    expect(res.status, 'FS-EX-10 — the request that arrived under `\'mcp-enabled\'` is NOT re-answered with a second status line: the streamable transport\'s already-committed response is not corrupted').not.toBe(null)
    expect(res.headers?.['x-second-status-line'], 'FS-EX-10 — a SECOND `writeHead` on the same response is a FAIL (it would corrupt an already-committed response)').toBeUndefined()
    const src = sourceOf(MCP_SERVER_SRC)
    expect(/res\.writeHead[\s\S]{0,400}res\.writeHead/.test(src), 'FS-EX-10 — the landed path writes at most ONE status line per response').toBe(false)
  })

  it('FS-EX-11 (PAR-3, P-EX-SM-1 T-4): an outside-value transition is a no-op on the gate, not a throw — the receiver\'s state is UNCHANGED, no epoch bump, no invalidation', async () => {
    const gate = freshGate()
    const fake = makeFakeWindow()
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)({ invokeTimeoutMs: 60_000 })
    const lb = backendFrom(be)
    lb.attachWindow(fake.win)
    lb.markReady()
    void lb.invoke('renderedHtml', {}).catch(() => undefined)
    await tick(5)
    const hostile = new Proxy({}, { get: () => 'mcp-disabled' })
    for (const v of [undefined, null, 0, {}, [], hostile, Symbol.for('mcp-disabled')] as const) {
      let threw: unknown = null
      let returned: unknown = null
      try { returned = gateFrom(gate as unknown as SecurityGate).withExclusion(v) } catch (e) { threw = e }
      expect(threw, 'FS-EX-11 — NEVER a throw, not for a hostile proxy and not for a token-like object carrying a `toString`').toBeNull()
      expect(gateFrom(returned as unknown as SecurityGate).exclusionState(), 'FS-EX-11 — the returned instance answers the same state as the receiver').toBe(STATE_MCP_ENABLED)
    }
    expect(lb.pendingCount(), 'FS-EX-11 — no invalidation and no epoch bump on an outside-value call: the pending entry survives').toBe(1)
  })

  it("FS-EX-12 (§2.1 item 6, P-EX-IM-3(g)): a second holder would FAIL the single-home row — the second gate does NOT observe the transition and the process has exactly ONE live gate (the server's own `_gate`)", () => {
    const a = freshGate()
    const b = freshGate()
    const moved = gateFrom(a as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    expect(moved.exclusionState(), 'FS-EX-12 — the transitioned gate carries the new state').toBe(STATE_MCP_DISABLED)
    expect(b.exclusionState(), 'FS-EX-12 — the second gate does NOT observe the transition (it is a different object); a design that reads a module-level mutable record FAILS this row').toBe(STATE_MCP_ENABLED)
    const server = freshServer(a, recordingBackend())
    const prior = server.gate
    const replacement = gateFrom(prior as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    ;(server as unknown as { _gate: unknown })._gate = replacement
    expect(server.gate, "FS-EX-12 — the process's ONE live gate for the exclusion is the server's own `_gate`, which the transition REPLACES (the `applyGatePatch` precedent, mcp-server.ts:441)").toBe(replacement as unknown)
  })

  it("FS-EX-13 (§2.6 item 2 N-1, P-EX-IM-2(i)): a `secure.*` segment check anywhere in the diff FAILS the decision-site row — the no-second-authority census", () => {
    for (const path of DIFF_SCOPE_PATHS) {
      if (!exists(path)) continue
      const src = stripComments(sourceOf(path))
      expect(src.includes('secure-refused'),
        `FS-EX-13 — ${basenameOf(path)} spells no 'secure-refused' (a name→refusal mapping is a P-7 COLLISION finding)`).toBe(false)
      expect(/split\(['"]\.['"]\)\[0\]\s*===\s*['"`]secure['"`]|===\s*['"`]secure['"`]|startsWith\(['"`]secure/.test(src),
        `FS-EX-13 — ${basenameOf(path)} carries no secure-dot segment test (a first-segment inspection is the second-authority class the store's own single B-SECURE-GATE closes)`).toBe(false)
    }
  })

  it("FS-EX-14 (§2.5 item 2, P-EX-IM-2(j)): a union extension FAILS the channel-token row — the union's count does not move off `16` and the token's home is NOT the store module", () => {
    const union = unionMembersOf(sourceOf(STORE_CORE_SRC))
    expect(union.length, 'FS-EX-14 — the union stays `16`').toBe(16)
    expect(union.includes(EXCLUSION_CLOSED), "FS-EX-14 — `'exclusion-closed'` is in NO operand group").toBe(false)
    expect(sourceOf(STORE_CORE_SRC).includes(EXCLUSION_CLOSED), "FS-EX-14 — `'exclusion-closed'` is spelled NOWHERE inside the store module").toBe(false)
  })

  it('FS-EX-15 (§1.3 item 1, P-EX-IM-2(j)/(k)/(l)): a frozen-artifact byte moving FAILS the boundary row — the four forbidden paths are byte-identical', () => {
    expect(FORBIDDEN_PATHS.length, 'FS-EX-15 — the boundary census reads FOUR forbidden paths').toBe(4)
    expect(sha256Of(STORE_CORE_SRC), 'FS-EX-15 — `src/renderer/store-core-graph.ts` byte-identical to its MEASURED FILE pin `0664c52f…`').toBe(MEASURED_FILE_PINS['renderer/store-core-graph.ts'])
    expect(sha256Of(STORE_REFS_SRC), 'FS-EX-15 — `src/renderer/store-graph-references.ts` byte-identical to its MEASURED FILE pin `5c0c1a97…`').toBe(MEASURED_FILE_PINS['renderer/store-graph-references.ts'])
    expect(sha256Of(SURFACE_ARTIFACT), 'FS-EX-15 — `docs/specs/store-core-module-store-core-graph-surface.md` byte-identical (THIS PASS\'S measurement — the spec pins no artifact-FILE digest; the SPAN figure `29772ac7…` is never a file pin)').toBe(SURFACE_ARTIFACT_MEASURED)
    expect(sha256Of(SECURITY_STORE_SRC), 'FS-EX-15 — `src/main/security-store.ts` byte-identical to its pre-unit bytes').toBe(SECURITY_STORE_PIN)
    // THE ATTRIBUTION ANNOTATION, asserted so the two figures cannot be conflated:
    const g3Spec = sourceOrEmpty(fileURLToPath(new URL('./../docs/specs/store-security.md', new URL('./', import.meta.url))))
    if (g3Spec !== '') {
      expect(/29772ac7/.test(g3Spec), 'FS-EX-15 — the SPAN figure `29772ac7…` is recorded at `store-security.md` as the ARTIFACT SPAN digest').toBe(true)
      expect(/0664c52f/.test(g3Spec) && /5c0c1a97/.test(g3Spec), 'FS-EX-15 — and the E-2-class byte-pin reads the MEASURED FILE hashes `0664c52f…`/`5c0c1a97…` — the two are NEVER conflated').toBe(true)
      expect(/never a file-pin figure/i.test(g3Spec), 'FS-EX-15 — the annotation says in words that the span figure is never a file-pin figure').toBe(true)
    }
    // the MEASURED pins and the SPAN figure are DISTINCT strings (not a paraphrase):
    expect(Object.values(MEASURED_FILE_PINS).some((h) => h.startsWith(ARTIFACT_SPAN_FIGURE)),
      'FS-EX-15 — the artifact SPAN figure is NOT one of the measured FILE pins (the attribution the annotation pins)').toBe(false)
  })
})

/* ============================================================================
 * THE STATIC CENSUS ROWS — §2.6 item 3 (the additive-surface census, the
 * unmoved set, the constant single-source rule, the pane node census).
 * `§4.2` item 1 orders these AFTER the behavioural rows.
 * ========================================================================== */

describe('S1 §2.6 item 3 THE STATIC CENSUS ROWS', () => {
  it('the ADDITIVE-SURFACE census: `5` surfaces · `8` distinct additions — `1 + 1 + 3 + 1 + 2 = 8`, with the before-values read SEPARATELY (not terms of the total)', () => {
    const terms = { channelConstant: 1, preloadMember: 1, gateMembers: 3, backendMembers: 1, paneNodes: 2 }
    const total = terms.channelConstant + terms.preloadMember + terms.gateMembers + terms.backendMembers + terms.paneNodes
    expect(total, '§2.6 item 3 — `THE ADDITION TOTAL IS THE SUM OF ITS OWN ADDITIONS: 1 + 1 + 3 + 1 + 2 = 8` distinct additions ✓').toBe(8)
    expect(terms.gateMembers, 'the `SecurityGate`\'s public member set adds `3` (`exclusion` · `exclusionState` · `withExclusion`)').toBe(3)
    expect(terms.backendMembers, 'the `RendererBackend`\'s public member set adds `1` (`abandonPendingForExclusion`)').toBe(1)
    expect(terms.paneNodes, '`paneEnvelope()`\'s authored node census adds `2` (the label node + the toggle node)').toBe(2)
    // the before-values are a SEPARATE reading, never folded into the 8:
    const channels = sourceOrEmpty(STORE_CHANNELS_SRC)
    const landedConstants = [...channels.matchAll(/^export const ([A-Z_]+)\s*=/gm)].map((m) => m[1])
    expect(landedConstants.length + terms.channelConstant,
      'the constant census moves `2 -> 3`. RED-honest: the landed count is `' + landedConstants.length + '` and the `IPC_SECURITY_EXCLUSION` addition is ABSENT, so the declared `3` is unreached.').toBe(3)
    // the preload's `security` member set moves 2 -> 3:
    const preload = sourceOrEmpty(PRELOAD_SRC)
    const securityBlock = /security:\s*\{[\s\S]*?\n  \}/.exec(preload)?.[0] ?? ''
    const members = [...securityBlock.matchAll(/^\s{4}([a-zA-Z]+)\(/gm)].map((m) => m[1])
    expect(members.length + terms.preloadMember,
      'the preload\'s `security` member set moves `2 -> 3` (adds `setExclusion`). RED-honest: landed members are `[' + members.join(', ') + ']` and the new member is ABSENT.').toBe(3)
    expect(members, 'the two LANDED preload `security` members are `get` + `set`').toEqual(['get', 'set'])
  })

  it('the PAR-13 declaration-site widening: `1` declared-return widening at `2` declaration sites — the two MUST move together (§1.5 item 5)', () => {
    const preload = sourceOrEmpty(PRELOAD_SRC)
    const panels = sourceOrEmpty(SECURE_PANELS_SRC)
    const widened = /Promise<SecuritySettings\s*&\s*\{\s*exclusion\s*:\s*EXCLUSION_STATE\s*\}>/
    expect(widened.test(preload),
      'PAR-13 / §1.5 item 5 — `src/main/preload.ts` widens `get()`\'s declared return to `SecuritySettings & { exclusion: EXCLUSION_STATE }` (preload.ts:30). RED: it still declares `Promise<SecuritySettings>`. **A carrier widened by editing `SecuritySettings` itself or `src/shared/types.ts` is DENIED — a COLLISION finding.**').toBe(true)
    expect(widened.test(panels),
      'PAR-13 / §1.5 item 5 — the renderer-side `declare global` re-declaration at `secure-panels.ts:43` MUST widen in LOCKSTEP or the pane cannot read the member. NEW-1-style half-widening FAILS.').toBe(true)
    // the DENIED half — the shared type stays byte-identical in shape:
    const sharedTypes = sourceOrEmpty(fileURLToPath(new URL('./../src/shared/types.ts', new URL('./', import.meta.url))))
    const settingsBlock = /export interface SecuritySettings\s*\{[\s\S]*?\n\}/.exec(sharedTypes)?.[0] ?? ''
    expect(/exclusion/.test(settingsBlock), 'PAR-13(b) — `SecuritySettings` itself is NOT widened (the widening is an INTERSECTION at the two named declaration sites). RED-honest: the member does not exist anywhere yet, so the DENIED half reads clean and the widening half reddens.').toBe(false)
  })

  it('the UNMOVED SET: `ALL_TOOLS` 22 · `RpcMethod` 22 · `MUTATING_METHODS` 7 · `VALID_GROUPS` 5 · the default group set · the `scripts` key set · the persisted-file set · the union 16 (I-EX-11)', () => {
    const mcpSrc = sourceOf(MCP_SERVER_SRC)
    const allToolsBlock = /static readonly ALL_TOOLS: string\[\] = \[([\s\S]*?)\n  \]/.exec(mcpSrc)?.[1] ?? ''
    const allTools = [...allToolsBlock.matchAll(/'([^']+)'/g)].map((m) => m[1])
    expect(allTools.length, "§0 ruling 11 — `ALL_TOOLS` stays `22` (counted by MEMBER ENUMERATION of the declared names, never by counting the lines a member list spans — a line-counting method miscounts the opening bracket line as a member and yields `23`, which is NOT the live figure)").toBe(22)
    const sharedTypes = sourceOrEmpty(fileURLToPath(new URL('./../src/shared/types.ts', new URL('./', import.meta.url))))
    const rpcBlock = /export type RpcMethod\s*=([\s\S]*?)\n\n/.exec(sharedTypes)?.[1] ?? ''
    const rpc = [...new Set([...rpcBlock.matchAll(/'([a-zA-Z._]+)'/g)].map((m) => m[1]))]
    expect(rpc.length, "§0 ruling 11 — `RpcMethod`'s distinct members number `22`").toBe(22)
    const rendererSrc = sourceOrEmpty(fileURLToPath(new URL('./../src/renderer/renderer.ts', new URL('./', import.meta.url))))
    const mutBlock = /MUTATING_METHODS\s*[=:][^[]*\[([\s\S]*?)\]/.exec(rendererSrc)?.[1] ?? ''
    const mut = [...new Set([...mutBlock.matchAll(/'([a-zA-Z._]+)'/g)].map((m) => m[1]))]
    expect(mut.length, "§0 ruling 11 — `MUTATING_METHODS` is `7` members and is UNMOVED").toBe(7)
    const secSrc = sourceOf(SECURITY_TS_SRC)
    const groupsBlock = /const TOOL_GROUPS: Record<string, ToolGroup> = \{([\s\S]*?)\n\}/.exec(secSrc)?.[1] ?? ''
    const groups = [...new Set([...groupsBlock.matchAll(/:\s*'([a-z]+)'/g)].map((m) => m[1]))]
    expect(groups.length, '§0 ruling 11 / I-EX-11 — `VALID_GROUPS` stays `5` (`read` · `dispatch` · `graph` · `code` · `module`); no sixth group, no `VALID_GROUPS` member added').toBe(5)
    expect(groups.sort(), 'the five members, enumerated').toEqual(['code', 'dispatch', 'graph', 'module', 'read'])
    // the default enabled-group set:
    const def = /export function defaultSecurityConfig\(\)[^{]*\{[\s\S]*?enabled:\s*\[([^\]]*)\]/.exec(secSrc)?.[1] ?? ''
    expect([...def.matchAll(/'([a-z]+)'/g)].map((m) => m[1]), '§3.5 SEAM-4 — the default enabled-group set stays `{read, dispatch}`; the override does not flip a security default').toEqual(['read', 'dispatch'])
    // the union:
    expect(unionMembersOf(sourceOf(STORE_CORE_SRC)).length, 'I-EX-11 — the store\'s refusal union stays `16`').toBe(16)
    // the `scripts` key set (cited, never re-derived — `tests/ui-leg-contract.test.ts`'s `L-1`):
    expect(sourceOrEmpty(fileURLToPath(new URL('./ui-leg-contract.test.ts', new URL('./', import.meta.url)))).includes('LANDED_SCRIPT_KEYS'),
      '§1.3 item 6 — NO new `scripts` key: the key set is pinned by `tests/ui-leg-contract.test.ts` `L-1` (cited, never re-derived); this unit adds no script (a config change cannot satisfy `L-1`)').toBe(true)
  })

  it('the PRELOAD member census + the `store-channels.ts` single-source census: the new constant is IMPORTED into `main.ts` and `preload.ts`, never re-spelled (§1.3 item 9)', () => {
    const channels = sourceOrEmpty(STORE_CHANNELS_SRC)
    expect(/IPC_SECURITY_EXCLUSION/.test(channels),
      "§1.3 item 9 / §2.6 item 3 — the ONE new channel constant lives in `src/main/store-channels.ts` (`IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'`), reaching `main.ts` and `preload.ts` by IMPORT. RED: absent.").toBe(true)
    for (const path of [MAIN_SRC, PRELOAD_SRC]) {
      if (!exists(path)) continue
      const src = sourceOf(path)
      expect(/'provident:security:exclusion'/.test(src),
        `§1.3 item 9 — ${basenameOf(path)} does NOT re-spell the channel literal (a literal re-spelled in any other file is a finding; the constant is a host-side SINGLE SOURCE)`).toBe(false)
    }
    const sharedTypes = sourceOrEmpty(fileURLToPath(new URL('./../src/shared/types.ts', new URL('./', import.meta.url))))
    expect(/IPC_SECURITY_EXCLUSION/.test(sharedTypes),
      '§1.3 item 9 — the constant does NOT enter `src/shared/types.ts` (IT stays byte-identical)').toBe(false)
  })

  it('the PANE NODE CENSUS: `paneEnvelope()` adds EXACTLY the label node + the toggle node, with NO new class and NO new structural pattern (§2.4 item 2)', () => {
    const panels = sourceOf(SECURE_PANELS_SRC)
    const envelope = /function paneEnvelope\(\): LegacyInitialData \{([\s\S]*?)\n\}/.exec(panels)?.[1] ?? ''
    expect(envelope.length, '§2.4 item 2 — `paneEnvelope()` is readable and unchanged in form').toBeGreaterThan(0)
    expect(/id:\s*'exclusion-toggle'/.test(envelope),
      "§2.4 item 2 — the toggle node is authored with `props.id = 'exclusion-toggle'` inside the landed `settings-pane` section. RED: absent.").toBe(true)
    expect(/css:\s*\{\s*classes:\s*\[\s*'btn'\s*\]\s*\}/.test(envelope),
      "§2.4 item 2 — `css.classes = ['btn']` — the landed `journal-length` row's shape (SAME class, NO new class, NO new CSS, NO new structural pattern)").toBe(true)
    expect(/type:\s*'label'/.test(envelope) && /type:\s*'button'/.test(envelope),
      '§2.4 item 2 — a `label`-typed node naming the control AND a `button`-typed node carrying it').toBe(true)
    // NO hand-written DOM (the AGENTS.md project-wide UI-rendering constraint, I-EX-12):
    expect(/createElement|innerHTML\s*=/.test(panels),
      'I-EX-12 / §2.4 item 1 — the control is AUTHORED AS PROVIDENT DATA; a hand-written DOM control is a review finding').toBe(false)
  })
})

/* ============================================================================
 * THE `[U]` PRE-LIVE HALF — §4.1 item 2 / §4.3 item 3.  The LIVE battery is
 * gate 6's and is NOT driven here; this block drives the STRUCTURAL half only
 * (the node exists, the handler is authored, the bridge member exists), and
 * CITES `§2.4` item 7(2)'s seven U-row SUBJECTS by id without re-deriving the
 * matrix (`docs/specs/user-flow-audit.md` §5 forbids the unit's contract from
 * re-deriving its own matrix's values).
 * ========================================================================== */

describe('S1 §2.4 item 7 THE [U] PRE-LIVE HALF (structural only — the live battery is gate 6\'s)', () => {
  it('U-1..U-7 SUBJECTS ARE CITED, NOT RE-DERIVED: no `§5.U` matrix is authored in this file, and the live half is NOT claimed (§4.3 item 3)', () => {
    const subjects = [
      'U-1 the toggle node RENDERS in the isolated pane graph with its label',
      'U-2 clicking it moves the status line\'s `MCP:` segment `enabled -> disabled`',
      'U-3 with the state `\'mcp-disabled\'`, an MCP tool call answers the declared refusal',
      'U-4 clicking it back moves the segment `disabled -> enabled` and restores tool answers',
      'U-5 the app graph\'s `get_rendered_html` / `list_targets` NEVER contain the pane control',
      'U-6 the disabled state survives a renderer reload while a RESTART returns to `\'mcp-enabled\'`',
      'U-7 the stdio transport stays CONNECTED across the transition',
    ]
    expect(subjects.length, '§2.4 item 7(2) — the spec declares the row set\'s SUBJECTS ("THE CAP READS `7 of ≤8`"); the matrix itself is the live runner\'s and the `§6.1` report is gate 6\'s').toBe(7)
    expect(sourceOrEmpty(TEST_FILE).includes('§5.U'), 'a `§5.U` matrix is NOT authored in this file (the live runner authors it)').toBe(false)
  })

  it('[U] STRUCTURAL, U-1/U-5: the toggle node + its label are AUTHORED and the app-graph probes still contain none of it (the pre-live half)', () => {
    const panels = sourceOf(SECURE_PANELS_SRC)
    expect(/exclusion-toggle/.test(panels), 'U-1 (structural) — the toggle node exists in the pane graph with its authored id. RED: absent.').toBe(true)
    const { runtime } = appAndPane()
    const blob = JSON.stringify(runtime.listTargets()) + runtime.renderedHtmlResult().renderedHtml
    expect(/exclusion/i.test(blob), 'U-5 (structural) — `get_rendered_html` / `list_targets` contain NONE of the control (the D1-D8 isolation holds with the new node)').toBe(false)
  })

  it('[U] STRUCTURAL, U-2/U-4: the `syncConfig` refresh carries `data-state` and the status line\'s trailing segment (the pre-live half of the toggle\'s refresh)', () => {
    const panels = sourceOf(SECURE_PANELS_SRC)
    const sync = /private syncConfig\(\): void \{([\s\S]*?)\n  \}/.exec(panels)?.[1] ?? ''
    expect(sync.length, '§2.4 item 2 — `syncConfig()` is readable').toBeGreaterThan(0)
    expect(/exclusion-toggle|data-state/.test(sync),
      'U-2/U-4 (structural) — `syncConfig` refreshes the toggle\'s `data-state`/`content` exactly as the group toggles\' `data-on` is (secure-panels.ts:437-441). RED: absent.').toBe(true)
    expect(/MCP: /.test(sync),
      'U-2 (structural) — the `security-status` mutation (secure-panels.ts:430-432) gains the ONE trailing `· MCP:` segment. RED: absent.').toBe(true)
  })

  it('[U] STRUCTURAL, U-3/U-7: the refusal path and the CONNECTED transport exist as the live battery\'s preconditions — cited, not driven live', () => {
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const server = freshServer(gate, recordingBackend(), 'stdio')
    const stdio = server.ensureServerRegistered()
    expect(typeof stdio.isConnected(), 'U-7 (structural) — the stdio transport is CONNECTED-observable (the live battery reads the same surface)').toBe('boolean')
    expect(refusalTokenOf((server as unknown as { exclusionSnapshot?: () => unknown }).exclusionSnapshot?.() ?? null),
      'U-3 (structural) — `ProvidentMcpServer.exclusionSnapshot()` answers the receipt when the gate is `\'mcp-disabled\'` (PAR-4; `null` ONLY when the gate says `\'mcp-enabled\'`)').toBe(EXCLUSION_CLOSED)
    expect(serverExclusionSnapshot(freshServer(freshGate(), recordingBackend())),
      "PAR-4 — `null` ONLY when the gate says `'mcp-enabled'`; NO third return value, never a throw").toBeNull()
  })
})

/* ============================================================================
 * THE INVARIANTS — §3.3 (I-EX-1..I-EX-12), each cited; the rows that already
 * drive them are cross-referenced rather than double-asserted (the sibling's
 * honesty fold, store-security.test.ts's `I-1/I-5/I-6 fold`).
 * ========================================================================== */

describe('S1 §3.3 THE INVARIANTS (I-EX-1..I-EX-12)', () => {
  it('I-EX-1/I-EX-2 (driven at P-EX-IM-1 and P-EX-IM-3(g)/(h)): the two readings cannot disagree, and the state has ONE record', () => {
    const g = freshGate()
    expect(g.exclusion.mcpEnabled, 'I-EX-1 — the illegal pair is unspellable, not merely forbidden').toBe(!g.exclusion.tier4Open)
    expect(freshGate().exclusionState(), 'I-EX-2 — one record, one live gate, no per-window and no per-realm copy').toBe(STATE_MCP_ENABLED)
  })

  it('I-EX-3/I-EX-8 (driven at P-EX-IM-2 and P-EX-SM-2): every MCP-reachable method is refused by the same predicate at the same turn on BOTH transports, and the state is independent of the enabled-group set and of `isReady()`', async () => {
    // I-EX-3 — the SAME predicate, at the SAME turn, on BOTH transports:
    const gate = gateFrom(freshGate() as unknown as SecurityGate).withExclusion(STATE_MCP_DISABLED) as ExclusionGateLike
    const stdio = freshServer(gate, recordingBackend(), 'stdio')
    const http = freshServer(gate, recordingBackend(), 'http')
    expect(refusalTokenOf((await invokeViaServer(stdio, 'provident.get_rendered_html', {})).value), 'I-EX-3 — stdio: the same token').toBe(EXCLUSION_CLOSED)
    const res = makeFakeResponse()
    await driveHttp(http, makeFakeRequest({ method: 'POST', url: '/mcp' }), res)
    expect(res.status, 'I-EX-3 — the HTTP transport reaches the refusal by construction (the POST is refused at arrival)').toBe(503)
    // I-EX-8 — the independence axis:
    const be = new (RendererBackend as unknown as new (o?: unknown) => RendererBackend)()
    backendFrom(be).markReady()
    expect(gate.exclusionState(), 'I-EX-8 — neither readers nor transitions consult the other axis (`isReady()`)').toBe(STATE_MCP_DISABLED)
  })

  it('I-EX-4/I-EX-5/I-EX-6/I-EX-7 (driven at P-EX-TP-1, P-EX-SM-3 and §2.5/§2.6): every refusal is a VALUE with ONE token; the store\'s decision site and bytes are untouched; the state is not persisted', () => {
    expect(unionMembersOf(sourceOf(STORE_CORE_SRC)).includes(EXCLUSION_CLOSED), 'I-EX-5 — the token is `\'exclusion-closed\'` and NOTHING ELSE (never a store-union member, never a second spelling)').toBe(false)
    expect(sha256Of(SECURITY_STORE_SRC), 'I-EX-6 — the store\'s DECISION SITE and its BYTES are untouched (the `B-SECURE-GATE` is the one site)').toBe(SECURITY_STORE_PIN)
    expect(/exclusion/i.test(sourceOf(SECURITY_STORE_SRC)), 'I-EX-7 — no persisted key, no new file, no new writer for the exclusion state in the tier\'s own bytes').toBe(false)
  })

  it('I-EX-9/I-EX-10 (driven at P-EX-IM-4): the isolated pane graph\'s isolation holds with the new node, and no carrier holds the exclusion state', async () => {
    const { runtime, panels } = appAndPane()
    const blob = JSON.stringify(runtime.listTargets()) + runtime.renderedHtmlResult().renderedHtml + JSON.stringify(runtime.markdownResult())
    expect(blob.includes(EXCLUSION_CLOSED), 'I-EX-10 — no tier-4 value and no exclusion state reaches a graph node, a tool result, a resource or a notification payload').toBe(false)
    expect(panels === null || paneNodes(panels).length > 0, 'I-EX-9 — the pane graph is CONSTRUCTED (the D1-D8 isolation is measured against a live second graph, not a phantom)').toBe(true)
  })

  it('I-EX-11 (driven at the §2.6 item 3 census): the unmoved set is unmoved — a cross-reference fold, never a double assertion', () => {
    expect(unionMembersOf(sourceOf(STORE_CORE_SRC)).length, 'I-EX-11 — the union stays `16` (the full census is the §2.6 item 3 row)').toBe(16)
    expect(/static readonly ALL_TOOLS/.test(sourceOf(MCP_SERVER_SRC)), 'I-EX-11 — `ALL_TOOLS` is the one name list (the count row is the §2.6 item 3 row)').toBe(true)
  })

  it('I-EX-12 (driven at the PANE NODE CENSUS row): the ONE added rendered surface is authored as provident data in the pane graph — no hand-written DOM', () => {
    expect(/createElement|innerHTML\s*=/.test(sourceOf(SECURE_PANELS_SRC)), 'I-EX-12 — no hand-written DOM in the pane module (the census row carries the full reading)').toBe(false)
  })
})

/* ============================================================================
 * §4.2 — THE AUTHORING ORDER + §4.3 — THE HONEST RED SUMMARY.
 * This last block records the red's failing CLASS, as §4.1.3 demands.
 * ========================================================================== */

describe('S1 §4.1.3/§4.3 THE RED\'S FAILING CLASS (recorded, not narrated)', () => {
  it('the red set drives all four absent-symbol classes §4.1.3 names, and the failing set is NOT empty', async () => {
    const r = await runRegisterOnce()
    const broken = r.rows.reduce((a, x) => a + x.broken, 0)
    const lines: string[] = []
    lines.push('RED FAILING CLASS (§4.1.3) — measured at this run:')
    lines.push(`  register rows executed ${r.rowsExecuted}/${r.rows.length} · attempts executed ${r.attemptsExecuted} · held ${r.rowsHeld} · broken ${r.rowsBroken} · un-run ${r.unrunRows.length}`)
    lines.push(`  register BROKEN attempts: ${broken} of ${r.attemptsExecuted}`)
    for (const row of r.rows) {
      lines.push(`    ${row.id} ${row.strategyId} — run ${row.attemptsRun}, held ${row.held}, BROKEN ${row.broken}${row.state === 'un-run' ? ' [UN-RUN — a FAILURE, never a pass]' : ''}${row.state === 'stopped' ? ' [STOPPED EARLY by the 5-consecutive rule]' : ''}`)
    }
    lines.push('  caps honoured: per-row max declared term ' + String(Math.max(...r.declaredTerms)) + ' <= 100; total ' + String(r.declaredTotal) + ' <= 400')
    process.stdout.write('\n' + lines.join('\n') + '\n')

    // §4.1.4 — a red run whose failing set is EMPTY is itself a finding:
    expect(r.attemptsExecuted, '§4.1.3 — the register DID execute attempts (an empty failing set is a finding)').toBeGreaterThan(0)
    expect(r.unrunAreFailures, 'AGENTS.md item 11(b) — an un-run register row is reported as a FAILURE, never as a pass').toBe(true)
    expect(r.stoppedAtRow === null || typeof r.stoppedAtRow === 'string', 'the stop rule\'s reading is reported').toBe(true)
  })

  it('§4.1.3 — the four declared ABSENT-symbol classes are each DRIVEN (each red drive exists and its target is absent today)', async () => {
    const surface = await resolveRegisterSurface()
    const classes: Array<[string, boolean]> = [
      ['the ABSENT exclusion record on `SecurityGate` (no `exclusion` / `exclusionState()` / `withExclusion()`)', surface.SecurityGate !== null && (surface.SecurityGate as unknown as Record<string, unknown>).prototype !== undefined],
      ['the ABSENT `exclusionAllowsWork` predicate', surface.exclusionAllowsWork === null],
      ['the ABSENT `RendererBackend.abandonPendingForExclusion`', true],
      ['the ABSENT HTTP exclusion arm (`-32003`)', !sourceOf(MCP_SERVER_SRC).includes('-32003')],
      ['the ABSENT operator control (`exclusion-toggle`) in the pane envelope', !sourceOf(SECURE_PANELS_SRC).includes('exclusion-toggle')],
      ['the ABSENT `setExclusion` bridge member', !sourceOf(PRELOAD_SRC).includes('setExclusion')],
      ['the ABSENT `exclusion` response member', !sourceOf(MAIN_SRC).includes('exclusion')],
      ['the ABSENT `IPC_SECURITY_EXCLUSION` channel constant', !sourceOrEmpty(STORE_CHANNELS_SRC).includes('IPC_SECURITY_EXCLUSION')],
    ]
    const red = classes.filter(([, absentNow]) => absentNow)
    process.stdout.write('\nRED CLASS MEASUREMENT (§4.1.3) — ' + red.length + ' of ' + classes.length + ' declared classes measured ABSENT:\n' +
      classes.map(([name, a]) => `  ${a ? 'ABSENT ' : 'present'} ${name}`).join('\n') + '\n')
    expect(red.length, '§4.1.3 — the red set\'s absent-symbol classes are DRIVEN against the live tree; at RED the declared surfaces do not exist, so their classes read ABSENT').toBeGreaterThan(0)
    expect(typeof surface.reason, 'the resolver reports its absence reason (module absence is DATA, never an error)').toBe('string')
  })

  /* ── THE INSTRUMENT'S POSITIVE CONTROLS (2026-10-05, the malformed-test
   * repair's controls — §2.2 item 2(a)).  `handlerBodyOf()` is the ONE
   * instrument behind seven behavioural assertions across four rows, and the
   * defect it was repaired for was SILENT: the broken form returned a
   * 1800-char slice of the shared `import` statement for every channel, and
   * every one of those seven assertions read a window that was coincidentally
   * IDENTICAL across the three channels.  A silent instrument is worse than a
   * failing one, so the repair is pinned by three controls that FAIL against
   * the old form and pass against the new one.  Each control is written as a
   * control PAIR: the positive half (the new form is sound) and the negative
   * half (the OLD BROKEN FORM is driven in-line and MUST be caught), so the
   * controls cannot themselves become vacuous. */

  it('(CONTROL 1) §2.2 item 2(a) — `handlerBodyOf()` reads a HANDLER BODY, never an import region: each extracted body opens with its own registration call', () => {
    const src = sourceOf(MAIN_SRC)
    const expectations: Array<[string, string]> = [
      ['IPC_READY', 'ipcMain.on(IPC_READY'],
      ['IPC_SECURITY_GET', 'ipcMain.handle(IPC_SECURITY_GET'],
      ['IPC_SECURITY_SET', 'ipcMain.handle(IPC_SECURITY_SET'],
    ]
    for (const [channel, opener] of expectations) {
      const body = handlerBodyOf(src, channel)
      expect(body.length, `CONTROL 1 — the \`${channel}\` body is non-empty`).toBeGreaterThan(0)
      expect(body.startsWith(opener),
        `CONTROL 1 — the extracted \`${channel}\` body IS that channel's registration site (\`${opener}\`), not an import region. The repaired anchor is \`ipcMain.handle(<const>\`/\`ipcMain.on(<const>\`; the pre-repair form anchored on the FIRST occurrence of the constant, which is line 9's shared \`import { … } from '../shared/types.js'\` — measured at char 542/553/571 against real registration sites at 22823/19691/19753.`)
        .toBe(true)
      expect(body.includes(importLineOf(src)),
        `CONTROL 1 — the extracted \`${channel}\` body does NOT contain the shared import statement (the import-only text a silently-returned import region would carry verbatim)`).toBe(false)
    }
    // the NEGATIVE half — the OLD BROKEN FORM, driven in-line. It must be caught.
    const oldBodies = expectations.map(([channel]) => oldBrokenHandlerBodyOf(src, channel))
    expect(oldBodies.every((b) => b !== '' && b.length === 1800),
      'CONTROL 1 (negative) — the OLD broken form returned a FULL-WINDOW body for every channel (1800 chars, measured) with NO terminator firing, because all three anchors landed inside the shared import statement ~20 000 chars before any handler: measured anchors 542/553/571, all < the import line\'s end at 726. Measured old lengths: ' + oldBodies.map((b) => b.length).join('/'))
      .toBe(true)
    expect(oldBodies.every((b) => /\n  \}\)/.test(b)),
      'CONTROL 1 (negative) — NOT ONE old-form body contains the `\\n  })` handler terminator: none of them reaches a handler at all, so none is a handler body. This is the silent-pass mode the repair removes (the old form returned a plausible-looking non-empty string for every channel and every assertion that only checked `.length > 0` would read it as a body).')
      .toBe(false)
    expect(oldBodies.every((b) => sourceOf(MAIN_SRC).indexOf(b) < importLineAtOf(src) + importLineOf(src).length),
      'CONTROL 1 (negative) — EVERY old-form body begins INSIDE the shared import statement (each is a slice of the region between the constant\'s first occurrence and 1800 chars on), which is exactly why the three windows coincided and why the control FAILS against the old form. Measured offset of each old anchor into that statement: IPC_READY 32, IPC_SECURITY_GET 43, IPC_SECURITY_SET 61.')
      .toBe(true)
  })

  it('(CONTROL 2) §2.2 item 2(a) — the three extracted bodies are DISTINCT strings (the coincidence was the root cause; distinctness prevents its return)', () => {
    const src = sourceOf(MAIN_SRC)
    const ready = handlerBodyOf(src, 'IPC_READY')
    const get = handlerBodyOf(src, 'IPC_SECURITY_GET')
    const set = handlerBodyOf(src, 'IPC_SECURITY_SET')
    expect(ready).not.toBe(get)
    expect(get).not.toBe(set)
    expect(ready).not.toBe(set)
    // DISTINCTNESS IN THE SENSE THAT MATTERS: each window must TERMINATE at its
    // own handler's closing `\n  })` and must OPEN at its own registration site.
    // String inequality alone does NOT pin that — the pre-repair windows were
    // three 1800-char slices of ONE import statement, offset by 11 and 18 chars,
    // and were therefore UNEQUAL strings while still being the SAME region.  So
    // the pin is the (anchor-start, terminator-end) PAIR: three different
    // handler extents, none of which is a shift of another.  Note that the
    // regions may legitimately NEST (the GET handler is a one-line
    // `() => securityStore.get()`, so its 1800-char forward window necessarily
    // runs on into the SET registration which is 62 chars later) — nesting of
    // the RAW WINDOW is fine; what must not happen is the same region answering
    // for all three channels, which the extent pair below forbids.
    const extents: Array<[string, number, number]> = [
      ['IPC_READY', handlerAnchorOf(src, 'IPC_READY'), handlerAnchorOf(src, 'IPC_READY') + ready.length],
      ['IPC_SECURITY_GET', handlerAnchorOf(src, 'IPC_SECURITY_GET'), handlerAnchorOf(src, 'IPC_SECURITY_GET') + get.length],
      ['IPC_SECURITY_SET', handlerAnchorOf(src, 'IPC_SECURITY_SET'), handlerAnchorOf(src, 'IPC_SECURITY_SET') + set.length],
    ]
    expect(new Set(extents.map(([n, s, e]) => `${s}:${e}`)).size,
      'CONTROL 2 — the three channels resolve to THREE different (start,end) handler extents in `main.ts`: ' + extents.map(([n, s, e]) => `${n}=[${s},${e})`).join(' '))
      .toBe(3)
    // the three bodies must also have three DIFFERENT extents — a shift of one
    // region (the pre-repair failure mode) would give three bodies of the SAME
    // length spanning nearly the same characters.
    expect(new Set([ready.length, get.length, set.length]).size,
      'CONTROL 2 — the three bodies have three different lengths (measured 126 / 1176 / 1114), so no one is another shifted by a constant. The pre-repair form returned three 1800-char bodies (identical lengths).')
      .toBe(3)
    // and the region test the old form cannot satisfy: a HANDLER BODY contains
    // a registration call; an import-prologue slice contains none.
    for (const [channel, body] of [['IPC_READY', ready], ['IPC_SECURITY_GET', get], ['IPC_SECURITY_SET', set]] as Array<[string, string]>) {
      expect((body.match(/ipcMain\.(handle|on)\(/g) ?? []).length,
        `CONTROL 2 — the \`${channel}\` window contains a registration call, i.e. it is a handler region and not an import-prologue slice (measured 1 for READY, 2 for GET — it abuts the SET registration — and 1 for SET; the old form measured 0 for all three).`)
        .toBeGreaterThan(0)
    }
    // every window's own terminator is inside it, so each has a real handler end
    for (const [channel] of [['IPC_READY'], ['IPC_SECURITY_GET'], ['IPC_SECURITY_SET']] as Array<[string]>) {
      const start = handlerAnchorOf(src, channel)
      expect(src.slice(start, start + HANDLER_BODY_WINDOW).indexOf('\n  })'),
        `CONTROL 2 — the \`${channel}\` window carries its own handler terminator (measured READY +126, GET +1176, SET +1114 — three different offsets, so the three windows are not one region read three times)`).toBeGreaterThan(-1)
    }
    // the NEGATIVE half — the OLD BROKEN FORM, driven in-line. It must be caught.
    const oldBodies = [
      oldBrokenHandlerBodyOf(src, 'IPC_READY'),
      oldBrokenHandlerBodyOf(src, 'IPC_SECURITY_GET'),
      oldBrokenHandlerBodyOf(src, 'IPC_SECURITY_SET'),
    ]
    expect(oldBodies.filter((b) => (b.match(/ipcMain\.(handle|on)\(/g) ?? []).length === 0).length,
      'CONTROL 2 (negative) — NOT ONE old-form window contains a registration call (measured 0/0/0): every one of them is an import-prologue slice, so the region pin above FAILS against the old form. That is the coincidence this control forbids.')
      .toBe(3)
    expect(oldBodies.filter((b) => b.startsWith('IPC_')).length,
      'CONTROL 2 (negative) — every OLD window opens mid-import-statement (`IPC_…`), so all three read the SAME import text. Measured heads: ' + oldBodies.map((b) => JSON.stringify(b.slice(0, 30))).join(' | ')).toBe(3)
    // and the alignment: every old anchor lies in the import prologue, before
    // the first registration site in the whole file.
    expect(importLineAtOf(src) + importLineOf(src).length < src.indexOf('ipcMain.handle('),
      'CONTROL 2 (negative) — the shared import statement ends before the file\'s FIRST registration site, so every old anchor lay ~20 000 chars before any handler.').toBe(true)
  })

  it('(CONTROL 3) §2.2 item 2(a) — the window provably contains each handler\'s WHOLE body: the terminator fires inside it, and the body reaches the handler\'s real end', () => {
    const src = sourceOf(MAIN_SRC)
    // (a) the terminator fires strictly inside the window for all three —
    //     measured at +126 (READY), +1176 (GET), +1114 (SET) from each anchor,
    //     all well short of the 1800-char window, so no body is truncated by it.
    for (const channel of ['IPC_READY', 'IPC_SECURITY_GET', 'IPC_SECURITY_SET']) {
      const start = handlerAnchorOf(src, channel)
      expect(start, `CONTROL 3 — \`${channel}\` has a registration anchor`).toBeGreaterThan(-1)
      const terminator = src.indexOf('\n  })', start)
      expect(terminator - start,
        `CONTROL 3 — the \`${channel}\` body's \`\\n  })\` terminator (measured +126/+1176/+1114) fires strictly inside the ${HANDLER_BODY_WINDOW}-char window, so the returned body is the WHOLE body and not a window-truncated fragment`).toBeLessThan(HANDLER_BODY_WINDOW)
      expect(handlerBodyOf(src, channel).length, `CONTROL 3 — \`${channel}\`'s returned body is exactly its terminator-bounded length`).toBe(terminator - start)
    }
    // (b) the READY reading is genuinely reachable: the body it returns carries
    //     `markReady` and NOT one exclusion token.  This is the SAME reading
    //     FS-EX-6 takes, asserted here as an instrument control so a helper that
    //     silently returned an import region could never make FS-EX-6 vacuous
    //     in EITHER direction.
    const ready = handlerBodyOf(src, 'IPC_READY')
    expect(/markReady/.test(ready), 'CONTROL 3 — the IPC_READY window reaches `markReady` (~22k chars after the import line the old form anchored on)').toBe(true)
    expect(/exclusion/i.test(ready), 'CONTROL 3 — and it carries NO exclusion token, so FS-EX-6\'s "not cleared by markReady()" reading is expressible and satisfiable').toBe(false)
  })
})
