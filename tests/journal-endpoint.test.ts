// tests/journal-endpoint.test.ts — RED tests for the journal reversibility
// MCP endpoint (docs/specs/journal-endpoint-review.md J3-J8). The Runtime must
// expose a `journal(action)` method that drives the engine's
// `Supervisor.undo()`/`redo()`/`replay()` (provident-ssr 0.2.1 UndoRedoReport
// surface) and re-renders. The MCP server must register `provident.journal`
// under the `graph` group (OFF by default).
//
// Every new-method test MUST be RED (TypeError: runtime.journal is not a
// function) until an Implementer adds it.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { SecurityGate } from '../src/main/security.js'
import { ProvidentMcpServer, type McpBackend } from '../src/main/mcp-server.js'

beforeAll(() => {
  installShim()
})

function r(): Runtime {
  return new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
}

/** Apply a state-slice to the counter node and return its nodeId. */
function counterNodeId(runtime: Runtime): string {
  const counter = runtime.listTargets().nodes.find((n) => n.propsId === 'counter')!
  return counter.nodeId
}

describe('Runtime.journal — undo/redo/replay (J3-J8)', () => {
  it('J-undo — journal("undo") after a state-slice reverts the value (RED: method missing)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const id = counterNodeId(runtime)
    // mutate the counter content to 42
    const op = (runtime as any).applyCommand({
      kind: 'state-slice',
      node: id,
      mutation: [{ targetProp: 'content', mode: 'replace', value: '42' }],
    })
    expect(op.status).toBe('applied')
    expect(runtime.renderedHtmlResult().renderedHtml).toContain('>42<')
    // undo — must revert to the pre-op value
    const res = await (runtime as any).journal('undo')
    expect(res.status).toBe('applied')
    expect(res.renderedHtml).not.toContain('>42<')
  })

  it('J-redo — journal("redo") re-applies the undone op (RED)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const id = counterNodeId(runtime)
    ;(runtime as any).applyCommand({
      kind: 'state-slice',
      node: id,
      mutation: [{ targetProp: 'content', mode: 'replace', value: '42' }],
    })
    await (runtime as any).journal('undo')
    expect(runtime.renderedHtmlResult().renderedHtml).not.toContain('>42<')
    const res = await (runtime as any).journal('redo')
    expect(res.status).toBe('applied')
    expect(res.renderedHtml).toContain('>42<')
  })

  it('J-replay — journal("replay") re-runs the journal (RED)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const id = counterNodeId(runtime)
    ;(runtime as any).applyCommand({
      kind: 'state-slice',
      node: id,
      mutation: [{ targetProp: 'content', mode: 'replace', value: '42' }],
    })
    const res = await (runtime as any).journal('replay')
    expect(res.status).toBe('applied')
    expect(res.renderedHtml).toContain('>42<')
  })

  it('J-no-op — journal("undo") with an empty stack reports no-op, never throws (RED)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const res = await (runtime as any).journal('undo')
    expect(res.status).toBe('no-op')
  })

  it('J-return — the journal result carries status + both views + warnings (RED)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const id = counterNodeId(runtime)
    ;(runtime as any).applyCommand({
      kind: 'state-slice',
      node: id,
      mutation: [{ targetProp: 'content', mode: 'replace', value: '42' }],
    })
    const res = await (runtime as any).journal('undo')
    expect(res).toHaveProperty('status')
    expect(res).toHaveProperty('renderedHtml')
    expect(res).toHaveProperty('ssrHtml')
    expect(res).toHaveProperty('warnings')
    expect(res).toHaveProperty('baseBoundary')
  })

  it('J-invalid — journal("bogus") throws (RED)', async () => {
    const runtime = r()
    runtime.bootstrap()
    await expect((runtime as any).journal('bogus')).rejects.toThrow(/unknown journal action/)
  })

  it('J-adversarial — a destroy-undo is a pinned no-op: the host surfaces the engine report (never a crash)', async () => {
    const runtime = r()
    runtime.bootstrap()
    const dec = runtime.listTargets().nodes.find((n) => n.cssId === 'dec')!
    ;(runtime as any).applyCommand({ kind: 'destroy', node: dec.nodeId })
    // destroy-undo is a pinned no-op (G14); the host must not throw and must
    // return a report. NOTE: the engine currently reports 'applied' with an
    // empty scheduledDirtied for a destroy-undo (package finding — recorded in
    // docs/defects.md UNDO-REDO-DESTROY-STATUS). The host surfaces it verbatim.
    const res = await (runtime as any).journal('undo')
    expect(res).toHaveProperty('status')
    expect(res).toHaveProperty('renderedHtml')
    expect(res).toHaveProperty('ssrHtml')
  })

  it('J-adversarial — a malformed non-string action is contained (never reaches the engine)', async () => {
    const runtime = r()
    runtime.bootstrap()
    await expect((runtime as any).journal(undefined)).rejects.toThrow(/unknown journal action/)
    await expect((runtime as any).journal(null)).rejects.toThrow(/unknown journal action/)
    await expect((runtime as any).journal(42)).rejects.toThrow(/unknown journal action/)
  })
})

describe('provident.journal — MCP tool registration (J6)', () => {
  it('J6 — the tool is in the graph group (OFF by default)', () => {
    const gate = new SecurityGate()
    expect(gate.toolAllowed('provident.journal')).toBe(false)
    const gated = new SecurityGate().apply({ groups: ['graph'] })
    expect(gated.toolAllowed('provident.journal')).toBe(true)
  })

  it('J6 — the server registers provident.journal only when graph is enabled', () => {
    const backend: McpBackend = { invoke: async () => ({}) }
    const server = new ProvidentMcpServer({ backend })
    expect(server.allowedToolNames()).not.toContain('provident.journal')
    server.applyGatePatch({ groups: ['graph'] })
    expect(server.allowedToolNames()).toContain('provident.journal')
  })
})
