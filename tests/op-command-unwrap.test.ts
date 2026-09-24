// tests/op-command-unwrap.test.ts — RED rows for the `LIVE-OP-REJECT` host defect
// (docs/defects.md, the `LIVE-OP-REJECT` row; filed 2026-09-27).
//
// THE DEFECT (established by live A/B probe, NOT inferred):
//   The MCP tool `provident.op` registers its argument as `command`
//   (src/main/mcp-server.ts — `{ command: z.unknown().describe('the OpCommand payload') }`),
//   so `McpBackend.invoke('op', args)` hands the renderer the WRAPPED args object
//   `{ command: <cmd> }` as `req.payload`. The renderer's IPC request handler
//   forwards that payload RAW into `runtime.op(...)`, so `applyCommand` sees
//   `cmd.kind === undefined` and the engine refuses a malformed op — i.e. over
//   the live IPC/MCP hop `provident.op` answers `{status:'rejected'}` for EVERY
//   command shape, including well-formed ones.
//
//   The in-process battery host UNWRAPS (`this.runtime.op(p.command)` —
//   src/main/battery-host.ts), and `Runtime.load` receives its payload raw on
//   BOTH routes (`runtime.load(p)` vs `runtime.load(payload)`), which is why the
//   whole in-node suite is blind to this divergence: only the renderer's IPC
//   handler diverges, and only for `op`.
//
// THE FIX UNDER TEST (the Implementer's, not this file's) unwraps in the
// renderer's handler:
//   `runtime.op((req.payload as {command?: unknown})?.command ?? req.payload)`
//
// TESTABILITY SEAM (production-surface change, reported with the red set):
//   `handleRequest` is module-private today, so it was NOT reachable from a
//   test without booting the browser entry. The ONLY edit made here is adding
//   the `export` keyword to its declaration in src/renderer/renderer.ts:
//     - function handleRequest(runtime: Runtime, req: RpcRequest, ...)
//     + export function handleRequest(runtime: Runtime, req: RpcRequest, ...)
//   No body/semantics changed. The module's import-time side effects are guarded
//   (`typeof document !== 'undefined'`), so importing it under the node test
//   environment is inert — `main()` never runs.
//
// STATES ENUMERATED (one row per reasonable data state):
//   S1  over-the-wire WRAPPED op payload — `{ id, method:'op', payload:{ command: CMD } }`
//       (the ONLY shape reachable over MCP; the SDK rejects a bare command)
//   S2  bare (ALREADY unwrapped) op payload — `{ id, method:'op', payload: CMD }`
//       (what a host-side / older caller passes; the `?? req.payload` fallback)
//   S3  `load` payload — `{ id, method:'load', payload:{ kind:'commands', commands:[...] } }`
//       (top-level `kind`/`commands`, NOT wrapped — deliberately raw)
//
// FAIL-STATES (documented fail-state, one row each):
//   F1  the runtime's `op` throws → reply is `{ id, ok:false, error:<message> }`
//   F2  an unknown method → reply is `{ id, ok:false, error:'unknown method: …' }`
//       (no `op` call, no notify)
//
// FALSIFIABILITY: S1 asserts on the ARGUMENT OBJECT IDENTITY (`toBe(CMD)`), so it
// fails against today's tree (which forwards `{command: CMD}`) and keeps failing
// for any future refactor that drops the unwrap. S2 is the anti-destructive
// guard: a naive `runtime.op(req.payload.command)` without the `?? fallback`
// would break S2 while S1 stays green.
import { describe, it, expect } from 'vitest'
import { handleRequest } from '../src/renderer/renderer.js'
import type { OpResult, LoadResult, RpcReply, RpcRequest } from '../src/shared/types.js'

/** The well-formed op command the live probe used — a `state-slice` write to a
 *  node's `props.title`. Shape pinned by `Runtime.applyCommand` / the
 *  `provident-ssr` managed channel (kind + node + `mutation: [{targetProp, value}]`). */
const CMD = {
  kind: 'state-slice',
  node: 'node-3',
  mutation: [{ targetProp: 'props.title', value: 'x' }],
} as const

const OP_OK: OpResult = {
  status: 'applied',
  dirtied: ['node-3'],
  renderedHtml: '<div></div>',
  ssrHtml: '<div></div>',
  warnings: [],
}

const LOAD_OK: LoadResult = {
  census: { registered: 1, inTree: 1, unplaced: 0, destroyed: 0, prototypes: 1 },
  renderedHtml: '<div></div>',
  ssrHtml: '<div></div>',
  warnings: [],
}

/** A fake runtime exposing ONLY the methods the handler dispatches to in these
 *  rows. Each records its raw arguments so the row can assert on what the
 *  handler ACTUALLY passed (not on a derived value). */
function fakeRuntime(overrides: Partial<Record<'op' | 'load', unknown>> = {}): {
  runtime: never
  calls: { op: unknown[]; load: unknown[] }
  throwOp: (e: unknown) => void
} {
  const calls: { op: unknown[]; load: unknown[] } = { op: [], load: [] }
  let opImpl: (cmd: unknown) => unknown = () => OP_OK
  const runtime = {
    op: (cmd: unknown) => {
      calls.op.push(cmd)
      return opImpl(cmd)
    },
    load: (req: unknown) => {
      calls.load.push(req)
      return LOAD_OK
    },
  }
  if (overrides.op) opImpl = overrides.op as (cmd: unknown) => unknown
  return { runtime: runtime as never, calls, throwOp: (e) => { opImpl = () => { throw e } } }
}

function req(id: number, method: string, payload: unknown): RpcRequest {
  return { id, method, payload } as RpcRequest
}

const noNotify = (): void => {}

describe('renderer handleRequest — provident.op payload unwrap (LIVE-OP-REJECT, RED)', () => {
  it('S1 (THE RED ROW) — wrapped MCP payload {command: CMD} reaches runtime.op as CMD ITSELF (not the wrapper); reply is {id, ok:true, value:<op result>}', async () => {
    const { runtime, calls } = fakeRuntime()

    const reply = await handleRequest(
      runtime,
      req(7, 'op', { command: CMD }),
      noNotify,
    )

    // the argument ACTUALLY received must be the bare command object
    expect(calls.op).toHaveLength(1)
    expect(calls.op[0]).toBe(CMD)
    expect(calls.op[0]).not.toHaveProperty('command')
    // …and the reply carries the id + the stub's result
    expect(reply).toEqual({ id: 7, ok: true, value: OP_OK })
  })

  it('S2 — an ALREADY-bare op payload passes through UNCHANGED (the `?? req.payload` fallback is pinned; the unwrap is NOT destructive)', async () => {
    const { runtime, calls } = fakeRuntime()

    const reply = await handleRequest(runtime, req(8, 'op', CMD), noNotify)

    expect(calls.op).toHaveLength(1)
    expect(calls.op[0]).toBe(CMD)
    expect(reply).toEqual({ id: 8, ok: true, value: OP_OK })
  })

  it('S3 — the `load` route stays RAW: payload {kind:"commands", commands:[…]} reaches runtime.load unchanged (no unwrap by analogy)', async () => {
    const { runtime, calls } = fakeRuntime()
    const payload = { kind: 'commands' as const, commands: [CMD] }

    const reply = await handleRequest(runtime, req(9, 'load', payload), noNotify)

    expect(calls.load).toHaveLength(1)
    expect(calls.load[0]).toBe(payload)
    expect((calls.load[0] as { kind?: unknown }).kind).toBe('commands')
    // load is deliberately NOT an op call
    expect(calls.op).toHaveLength(0)
    expect(reply).toEqual({ id: 9, ok: true, value: LOAD_OK })
  })

  it('F1 (fail-safe) — a throwing runtime.op yields {id, ok:false, error:<message>} and never mutates the graph', async () => {
    const { runtime, calls, throwOp } = fakeRuntime()
    throwOp(new Error('malformed op: kind undefined'))

    const reply: RpcReply = await handleRequest(runtime, req(10, 'op', { command: CMD }), noNotify)

    expect(calls.op).toHaveLength(1)
    expect(reply).toEqual({ id: 10, ok: false, error: 'malformed op: kind undefined' })
  })

  it('F2 (fail-safe) — an unknown method yields {id, ok:false, error:"unknown method: …"} without touching the runtime', async () => {
    const { runtime, calls } = fakeRuntime()

    const reply = await handleRequest(runtime, req(11, 'nope', { command: CMD }), noNotify)

    expect(calls.op).toHaveLength(0)
    expect(reply.ok).toBe(false)
    expect(reply.id).toBe(11)
    expect(reply.error).toMatch(/unknown method: nope/)
  })

  it('S1b — a successful op still emits the ONE app-graph-changed push after the reply (the unwrap must not disturb the notify contract)', async () => {
    const { runtime } = fakeRuntime()
    const notified: Array<{ uri: string }> = []

    const reply = await handleRequest(runtime, req(12, 'op', { command: CMD }), (p) => notified.push(p))

    expect(reply.ok).toBe(true)
    expect(notified).toEqual([{ uri: 'mcp://provident/app' }])
  })
})
