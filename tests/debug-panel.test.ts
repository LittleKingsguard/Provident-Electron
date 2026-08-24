// tests/debug-panel.test.ts — the RED set for the debug-panel unit (#3).
//
// The TestWriter writes these FIRST from docs/specs/debug-panel.md §4 (the
// verify states). They are EXPECTED to fail: the module under test
// (src/renderer/debug-panel.ts) does not exist yet, so every test fails with
// a module-not-found / "initDebugPanel is not a function" error. The
// Implementer runs next (least code to green), then the adversarial pass,
// then the blind greens.
//
// The spec contract (docs/specs/debug-panel.md §2):
//   export function initDebugPanel(runtime: Runtime): () => void
//     - reads `#status` from the DOM (document.getElementById('status'))
//     - returns a refresh() function
//     - refresh() reads runtime.renderedHtmlResult() (renderedHtml + ssrHtml +
//       census) and writes a one-line census + a truncated SSR preview into
//       #status.textContent
//     - census line: `inTree <n> · registered <n> · unplaced <n> · destroyed <n> · prototypes <n>`
//     - SSR preview: the first ~120 chars of ssrHtml (or `(empty)` if empty),
//       collapsed to a single line, appended after the census on a new line
//     - the panel is READ-ONLY: it never calls dispatch/load/teardown or any
//       mutating Runtime method; calling refresh() twice yields the same text
//
// NOTE: the shim's document.getElementById auto-creates a ShimElement if
// absent (never returns null), so the spec §4 "absent" case is NOT testable
// with this shim. It is SKIPPED here (the implementer still guards with a
// null check for real DOMs). See the spec §4 note + the delegation prompt.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { initDebugPanel } from '../src/renderer/debug-panel.js'

beforeAll(() => {
  installShim()
})

describe('debug panel (#3) — docs/specs/debug-panel.md §4 verify states', () => {
  it('initDebugPanel(runtime) returns a refresh() that writes a census line + SSR preview', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime as never)
    expect(typeof refresh).toBe('function')
    refresh()
    const status = document.getElementById('status') as { textContent: string }
    // §4: a string matching /inTree \d+ · registered \d+/ containing the SSR preview
    expect(status.textContent).toMatch(/inTree \d+ · registered \d+/)
    // the SSR preview is present on a new line (the demo fragment is non-empty)
    const lines = status.textContent.split('\n')
    expect(lines.length).toBeGreaterThanOrEqual(2)
    expect(lines[1].length).toBeGreaterThan(0)
  })

  it('after bootstrap + refresh(): #status includes "inTree 12" AND a preview containing data-node-id', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime as never)
    refresh()
    const status = document.getElementById('status') as { textContent: string }
    // §4: the demo renders 12 elements
    expect(status.textContent).toContain('inTree 12')
    // §4: the SSR fragment carries the data-node-id attribute (REQ-GAP-3/A2)
    expect(status.textContent).toContain('data-node-id')
  })

  it('after a teardown + refresh(): #status includes "inTree 1" (root-only)', async () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime as never)
    await runtime.teardownResult()
    refresh()
    const status = document.getElementById('status') as { textContent: string }
    // §3/§4: a teardown leaves the root-only graph (inTree === 1)
    expect(status.textContent).toContain('inTree 1')
  })

  it('a second refresh() produces the SAME text (read-only; no mutation)', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime as never)
    refresh()
    const status = document.getElementById('status') as { textContent: string }
    const first = status.textContent
    refresh()
    // §3: calling refresh() twice yields the same text (no mutation)
    expect(status.textContent).toBe(first)
  })

  it('the SSR preview is truncated: ≤ ~125 chars + an ellipsis when the fragment is long', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    // Inspect the real SSR length first so the assertion matches the spec's
    // "at most ~120 chars + an ellipsis when longer."
    const { ssrHtml } = runtime.renderedHtmlResult()
    expect(ssrHtml.length).toBeGreaterThan(120)
    const refresh = initDebugPanel(runtime as never)
    refresh()
    const status = document.getElementById('status') as { textContent: string }
    const lines = status.textContent.split('\n')
    // the preview is the line(s) after the census line
    const preview = lines.slice(1).join('\n')
    // §3/§4: a long fragment is truncated to ~120 chars + an ellipsis
    expect(preview.endsWith('…')).toBe(true)
    expect(preview.length).toBeLessThanOrEqual(125)
  })

  it('refresh() is read-only: the census is unchanged before + after a refresh', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const before = runtime.renderedHtmlResult().census
    const refresh = initDebugPanel(runtime)
    refresh()
    const after = runtime.renderedHtmlResult().census
    // §2/§3: the panel NEVER mutates the graph; census is stable across a refresh
    expect(after).toEqual(before)
  })

  // ---- adversarial hardening (F1/F2) ----

  it('F1 — a non-number census field is coerced to "?" (never "inTree undefined" / NaN)', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime)
    // stub renderedHtmlResult to return a malformed census (a contract drift)
    const stub = runtime as unknown as { renderedHtmlResult: () => unknown }
    stub.renderedHtmlResult = () => ({ renderedHtml: '', ssrHtml: '', census: { inTree: undefined, registered: NaN, unplaced: 0, destroyed: 0, prototypes: 0 } })
    expect(() => refresh()).not.toThrow()
    const status = document.getElementById('status') as { textContent: string }
    expect(status.textContent).toContain('inTree ?')
    expect(status.textContent).not.toContain('undefined')
    expect(status.textContent).not.toContain('NaN')
  })

  it('F2 — a non-string ssrHtml is coerced (never a TypeError); empty/whitespace => (empty)', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const refresh = initDebugPanel(runtime)
    const stub = runtime as unknown as { renderedHtmlResult: () => unknown }
    // a non-string ssrHtml (number) must not throw
    stub.renderedHtmlResult = () => ({ renderedHtml: '', ssrHtml: 42 as never, census: { inTree: 1, registered: 1, unplaced: 0, destroyed: 0, prototypes: 0 } })
    expect(() => refresh()).not.toThrow()
    // a null/undefined ssrHtml => (empty)
    stub.renderedHtmlResult = () => ({ renderedHtml: '', ssrHtml: null, census: { inTree: 1, registered: 1, unplaced: 0, destroyed: 0, prototypes: 0 } })
    refresh()
    let status = document.getElementById('status') as { textContent: string }
    expect(status.textContent.split('\n')[1]).toBe('(empty)')
    // a whitespace-only ssrHtml => (empty)
    stub.renderedHtmlResult = () => ({ renderedHtml: '', ssrHtml: '   \n  ', census: { inTree: 1, registered: 1, unplaced: 0, destroyed: 0, prototypes: 0 } })
    refresh()
    status = document.getElementById('status') as { textContent: string }
    expect(status.textContent.split('\n')[1]).toBe('(empty)')
  })
})