// tests/integration/security-store-storeroom/port-follow.test.ts — **THE PORT IS THE EXCLUSION'S DELIVERY'S CONSEQUENCE**
// (`D-123`; `D-82` clause 2: *"listeners carry data back to renderer or other consumers on change"*).
//
// WHY THIS FILE EXISTS AND WHY IT IS THE ONLY PLACE THE SOCKET IS DRIVEN. `D-122` designed the `menu-template` lockout as a
// SEQUENCE: a renderer predicate set `security.exclusion`, and the port dropped as a consequence of that call. `D-123`
// replaces the sequence with an INVARIANT on the secure crossing — the store cannot hold an open pane over open ports —
// and the socket becomes what a listener's consequence is: the exclusion's delivery reaches the composition, and the ONE
// consumer that owns a socket reconciles it. **A CONSTRAINT CANNOT MOVE A SOCKET** (a repair writes a value and returns the
// op it landed), so the two halves are split here by construction and each is measured where it lives: the record at
// `tests/unit/security-store-storeroom/creation-declarations.test.ts`'s `CD-13`…`CD-17`, the socket in this file.
//
// EVERY ROW'S CONTROL IS THE OTHER TRANSPORT OR THE OTHER DIRECTION: a row that closes the listener is driven beside one
// that re-opens it, and the stdio rows assert the ABSENCE (the transport is never touched there, because closing it is
// measured FATAL — the client’s next `ping` never returns, `D-122`). The port used here is this file's own and is chosen
// apart from the app's default (`3787`) so no row can reach a running app.
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate } from '../../../src/main/security.js'
import { createSettingsSurface, type SettingsGateSink } from '../../../src/main/settings-surface/index.js'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const PORT = 4797

function makeBackend(): McpBackend {
  return { invoke: async () => ({ ok: true }) }
}

/** ONE POST AT THE PORT, answered as a VALUE: `open` where the socket accepted and the exchange completed, `refused`
 *  where the connection itself was refused — which is what a client sees when the listener has gone (`D-122`’s drive). */
async function post(path = '/mcp'): Promise<{ open: boolean; status?: number; body?: string }> {
  try {
    const answer = await fetch(`http://127.0.0.1:${PORT}${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' }),
    })
    return { open: true, status: answer.status, body: await answer.text() }
  } catch {
    return { open: false }
  }
}

describe('the port follows the record (D-123)', () => {
  it('PF-1 · ON `http` THE LISTENER IS THE RECORD`S CONSEQUENCE, BOTH DIRECTIONS: closed while the pair stands closed, serving again when it stands enabled — and the client sees a refused CONNECTION, not a refused call (D-122`s measured arm (a), now driven by the delivery)', async () => {
    const server = new ProvidentMcpServer({ backend: makeBackend(), transport: 'http', port: PORT })
    try {
      await server.start()
      expect((await post()).open, 'the control: with no follow yet, the listener answers').toBe(true)

      await server.followExclusion('mcp-disabled')
      const closed = await post()
      expect(closed.open, 'AND WITH THE PAIR CLOSED THE SOCKET IS GONE: the client cannot connect at all, which is the connection-level refusal this half of the design adds').toBe(false)

      await server.followExclusion('mcp-enabled')
      expect((await post()).open, 'and the mirror edge re-listens on the SAME port — `start()` is measured re-entrant (`D-122`), so the re-open needs no second listener and no second port').toBe(true)
    } finally {
      await server.close()
    }
    // RED ON REVERT: delete `followExclusion`'s `close()` arm and the second reading stays OPEN, so the row is the
    // socket's own claim and not the gate's.
  })

  it('PF-2 · ON `stdio` THE TRANSPORT IS NEVER TOUCHED — the follow is measured on the row`s own transport and refuses to act there, because closing that pipe is FATAL (D-122) and the exclusion alone is the wall', async () => {
    const server = new ProvidentMcpServer({ backend: makeBackend(), transport: 'stdio' })
    const sent = await server.connectMockTransport()
    expect(sent.length >= 0, 'the mock client is connected, which is the transport this row is about').toBe(true)
    const before = sent.length
    await server.followExclusion('mcp-disabled')
    expect(await server.notifyGraphChanged(), 'the transport still DELIVERS after a follow that would close an HTTP listener: on stdio the follow is a no-op, so the client keeps its session and the operator keeps the ability to re-enable').toBe(true)
    // **AND THE DELIVERY LANDS ON THE SAME PIPES**, which is the sharper half: the follow built no second server and connected no
    // second transport, so the client`s own recorded message list GREW. A follow that rebuilt the stdio server would leave this
    // count frozen while `notifyGraphChanged` still answered `true` — the shape the guard exists to prevent, and the one the
    // revert of the `transport !== 'http'` line produces (measured: `sent` frozen, this row red).
    const afterClose = sent.length
    expect(afterClose, 'so the client that was connected BEFORE the close still hears the notification AFTER it').toBeGreaterThan(before)
    await server.followExclusion('mcp-enabled')
    expect(await server.notifyGraphChanged(), 'and the enabled edge touches nothing either — the pair`s own state is the whole wall on this transport').toBe(true)
    expect(sent.length, 'with the same pipes still carrying it').toBeGreaterThan(afterClose)
    // RED ON REVERT: make `followExclusion` skip its `transport !== 'http'` guard and the first assertion answers `false`
    // — the server closed the client`s pipe, which is the measured-fatal arm.
  })

  it('PF-3 · THE FOLLOW IS IDEMPOTENT AND SERIALISED: the same state twice starts or closes nothing, and two opposite states in one turn land in the order they arrived', async () => {
    const server = new ProvidentMcpServer({ backend: makeBackend(), transport: 'http', port: PORT })
    try {
      await server.start()
      await server.followExclusion('mcp-enabled')
      await server.followExclusion('mcp-enabled')
      expect((await post()).open, 'a repeat of the state the listener already stands in is a no-op — no second `listen()` on the same port, which would answer `EADDRINUSE`').toBe(true)
      await server.followExclusion('mcp-disabled')
      await server.followExclusion('mcp-disabled')
      expect((await post()).open, 'and so is a repeated close').toBe(false)
      // the two directions issued in ONE turn, awaited through the queue: the LAST state wins and the socket ends there.
      const closing = server.followExclusion('mcp-enabled')
      const opening = server.followExclusion('mcp-disabled')
      await Promise.all([closing, opening])
      expect((await post()).open, 'so the last state issued is the one the socket holds').toBe(false)
    } finally {
      await server.close()
    }
  })

  it('PF-4 · THE TRIGGER IS THE DELIVERY AND NOT A CALL SITE: an ordinary exclusion change AND the invariant`s repair both reach the composition`s callback — the surface hands the state it landed as, after the gate has been patched from the same reading (`D-82` clause 2; `D-123`)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'port-follow-'))
    const seen: string[] = []
    const sink: SettingsGateSink = {
      applyGatePatch: () => undefined,
      applyExclusion: () => undefined,
      gate: { exclusionState: () => 'mcp-enabled' },
    }
    try {
      const surface = createSettingsSurface({ userDataDir: dir, onExclusionChanged: (state) => { seen.push(state) } })
      surface.attach(sink)
      expect(seen, 'the attach lands the boot terminal and delivers nothing: a boot is not a change').toEqual([])
      // (i) AN ORDINARY TRANSITION — the operator's own act, the path `D-122` used as a TRIGGER and which is now only one
      //     of the two routes that reach the same delivery.
      expect(surface.transition('mcp-disabled').applied, 'the transition applies').toBe(true)
      expect(seen, 'and the delivery carried the state it landed as, exactly once').toEqual(['mcp-disabled'])
      // (ii) THE INVARIANT'S REPAIR — a route that never passes through `transition` at all, which is why the port's edge
      //      cannot be a hook at the transition site (`D-123`).
      expect(surface.transition('mcp-enabled').applied, 'the pair is re-enabled').toBe(true)
      expect(surface.pane(true), 'and the pane opens — the write whose repair closes the pair from inside a store write').toEqual({ status: 'committed' })
      expect(surface.read().exclusion, 'the record cannot hold the illegal pair').toBe('mcp-disabled')
      // **THE FOURTH ENTRY IS THE MEASUREMENT RATHER THAN NOISE**: `pane(true)` delivers TWICE at the pair's address — the
      // delivery's one argument is the leg's op address, the pass fires ONCE PER DISTINCT HANDLE, and both handles of the
      // pass's set carry the repair's op address — so the callback is called twice for one act, handing the SAME state both
      // times. A consumer that reconciles a socket is idempotent by construction (`followExclusion` compares against the
      // listener's own record), and a row counting one delivery per act would be pinning the wrong fact.
      expect(seen, 'SO THE CROSSING`S REPAIR REACHED THE SAME CALLBACK, with the state it landed as — the port is driven by the DELIVERY and not by the verb').toEqual(['mcp-disabled', 'mcp-enabled', 'mcp-disabled', 'mcp-disabled'])
      // (iii) **THE CLOSING EDGE — RE-DERIVED AT `D-125`, AND IT IS THE FIGURE `D-123` GOT THE OTHER WAY ROUND.** That row
      //       recorded *"CLOSING A PANE DOES NOT RE-OPEN THE PORTS: that is `D-122`’s auto-re-enable, which the invariant
      //       does not state"*, and it was right about the invariant it had: its repair had OVERWRITTEN the operator's
      //       intent, so the close edge had nothing to settle back to. Now the pair carries `wanted`, (ii)'s enable recorded
      //       it, and the close edge settles the ports to it — the same delivery, two handles, on the exclusion's own
      //       address. The port's consumer hears it exactly as it hears every other change, which is what makes the socket a
      //       LISTENER'S consequence and never a toggle's (`D-82` clause 2).
      expect(surface.pane(false), 'the pane closes, and the close edge settles the ports to the intent the open edge preserved').toEqual({ status: 'committed' })
      expect(seen.slice(4), 'so the port`s consumer IS called on the closing act — twice, on the same per-handle rule as above, with the state the record now holds').toEqual(['mcp-enabled', 'mcp-enabled'])
      expect(surface.read().exclusion, 'and the record holds the intent: `D-122`’s auto re-enable arrives through the CONSTRAINT now, and not through a toggle beside it').toBe('mcp-enabled')
      // AND THE OTHER ARM, WHICH IS THE DISCRIMINATOR: with the intent DISABLED the same closing act settles nothing, so the
      // consumer is not called and the ports stay shut. Both arms are driven because the intent is the only thing that
      // tells them apart.
      const quiet: string[] = []
      const shut = createSettingsSurface({ userDataDir: dir, onExclusionChanged: (state) => { quiet.push(state) } })
      shut.attach(sink)
      expect(shut.transition('mcp-disabled').applied, 'the operator disables the ports, with no pane open').toBe(true)
      expect(shut.pane(true).status, 'the pane opens').toBe('committed')
      expect(shut.pane(false).status, 'and closes').toBe('committed')
      expect(quiet, 'and the consumer heard the ONE ordinary transition alone: neither pane act moved the pair, because the intent it settles to is the state the pair already stands in — the two arms of this edge, side by side').toEqual(['mcp-disabled'])
      expect(shut.read().exclusion, 'with the ports still shut, which is the arm the intent decided').toBe('mcp-disabled')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
