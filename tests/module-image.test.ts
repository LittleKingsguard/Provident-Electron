// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-image.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L2 §3, §10,
// D-305/D-311/D-231).
//
// ROWS 1–3 AND 6–8 are the image channel's own and are kept verbatim: `imageResult` formats an MCP image
// content block, and `RendererBackend`'s payload guard bounds a large image payload. Neither is a module
// ctx member, and neither moved.
//
// ROWS 4, 5 AND 7 measured `ctx.captureView()` and `CapabilityRouter.setCaptureProvider` — TWO MEMBERS
// THIS LANDING RETIRES WHOLE. `captureView` is one of the six the replaced `ModuleCtx` carried (L2 §3,
// `D-305`: four of the six were stubs or unwired, and it is retired rather than re-pointed), and the
// capture PROVIDER seam went with it, so no member present-but-inert stands in its place (`ASM-MS-1`).
// What replaces the READ is `ctx.store`: on the client half a store verb is an e2e REQUEST the channel
// executes, so the rendered fragment is read through the store and never captured off the ctx (§10).
// Row 4 is re-grained to that; row 5's subject has NO replacement and is pinned as an ABSENCE, which is
// the strongest thing a test can say about a member that must never come back. Row 7's unicode subject
// moves to the image channel that is still here.
import { describe, it, expect } from 'vitest'
import { imageResult, RendererBackend } from '../src/main/mcp-server.js'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'

describe('imageResult — format an MCP image content block (M-r4, proposal §9)', () => {
  it('1. imageResult("data:image/svg+xml;base64,xxx") → { content: [{ type: "image", data: "xxx", mimeType: "image/svg+xml" }] }', () => {
    const result = imageResult('data:image/svg+xml;base64,xxx')
    expect(result).toEqual({
      content: [{ type: 'image', data: 'xxx', mimeType: 'image/svg+xml' }],
    })
  })

  it('2. imageResult("data:image/png;base64,abc", "image/png") → mimeType "image/png"', () => {
    const result = imageResult('data:image/png;base64,abc', 'image/png')
    expect(result.content[0].mimeType).toBe('image/png')
    expect(result.content[0].data).toBe('abc')
  })

  it('3. a non-data-URI string throws a clean error, never crashes', () => {
    expect(() => imageResult('not-a-data-uri')).toThrow()
    expect(() => imageResult('')).toThrow()
  })
})

describe('the rendered view is READ THROUGH THE STORE, never captured off the ctx (old rows 4/5: ctx.captureView + setCaptureProvider — L2 §3, §10)', () => {
  it('4. `captureView` is ABSENT from the five-member ctx; the same read is a store verb, and with no writer handed it is the named refusal `no-store-host` as a RESOLVED value (old row 4: ctx.captureView() returned a data-URI)', async () => {
    const router = new CapabilityRouter()
    let handed: ClientHalfCtx | undefined
    router.registerModule('capture', (ctx: ClientHalfCtx) => {
      handed = ctx
    })
    expect(handed).toBeDefined()
    expect('captureView' in handed!).toBe(false)
    expect(Object.keys(handed!).sort()).toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    // NO writer was handed: every verb refuses by name and still answers — a view read is a REQUEST.
    const surface = handed!.store as unknown as Record<string, () => Promise<{ status: string; reason: string; subject: string }>>
    for (const verb of ['read', 'readLiteral', 'readTiered']) {
      const out = await surface[verb]!()
      expect(out.status).toBe('refused')
      expect(out.reason).toBe('no-store-host')
      expect(out.subject).toBe(verb)
    }
  })

  it('5. RETIRED, NO REPLACEMENT — the realm carries NO capture-provider seam: the router has no `setCaptureProvider`, and a delivered source that calls `ctx.captureView()` is contained by name instead of reaching a stub (L2 §3, D-305)', () => {
    const lines: string[] = []
    const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
    // the old row's door does not exist on this class, at any name that would re-open it.
    for (const gate of ['setCaptureProvider', 'captureView', 'captureProvider']) {
      expect((router as unknown as Record<string, unknown>)[gate]).toBeUndefined()
    }
    // and a module that still asks for the retired member cannot become a silent no-op: the entry THROWS
    // on the absent member and the realm reports it as the named refusal `entry-threw` (D-105).
    router.registerModule('capture', `(ctx) => { ctx.captureView() }`)
    expect(lines).toContain('entry-threw')
    expect(router.listeners()).toEqual([])
    expect(router.actions()).toEqual([])
  })
})

describe('M-r4 payload guard — a large image payload is bounded (proposal §9)', () => {
  it('6. a large image payload (over largePayloadBytes) is bounded — not the raw unbounded payload', async () => {
    const backend = new RendererBackend({ largePayloadBytes: 1000 })
    const big = 'x'.repeat(5000)
    const value = { content: [{ type: 'image', data: big, mimeType: 'image/png' }] }
    const resolved = backend.maybeDigestForTest(value)
    // the raw unbounded base64 data must NOT cross the boundary
    expect(resolved).not.toHaveProperty('content')
    expect(resolved).toHaveProperty('truncated', true)
    expect(resolved).toHaveProperty('digest')
  })

  it('7. a non-ASCII (emoji) fragment survives the image channel intact — the capture path it used to take is gone, the payload it produced is still carried whole (old row 7: a unicode fragment through ctx.captureView)', () => {
    const fragment = '<div>hello \u{1F600} world</div>'
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(fragment, 'utf8').toString('base64')}`
    const result = imageResult(dataUri)
    expect(result.content[0].mimeType).toBe('image/svg+xml')
    // the payload crosses base64 WHOLE: the emoji decodes back to the same code point, not a lone surrogate.
    expect(Buffer.from(result.content[0].data, 'base64').toString('utf8')).toBe(fragment)
    expect(Buffer.from(result.content[0].data, 'base64').toString('utf8')).toContain('\u{1F600}')
  })

  it('8. the live maybeDigest path bounds a large image content block (H2 adversarial fix)', () => {
    const backend = new RendererBackend({ largePayloadBytes: 1000 })
    const big = 'y'.repeat(5000)
    const value = { content: [{ type: 'image', data: big, mimeType: 'image/png' }] }
    const resolved = (backend as unknown as { maybeDigest: (v: unknown) => unknown }).maybeDigest(value)
    expect(resolved).not.toHaveProperty('content')
    expect(resolved).toHaveProperty('truncated', true)
  })
})
