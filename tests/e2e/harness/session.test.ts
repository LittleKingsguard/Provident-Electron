// tests/e2e/harness/session.test.ts — `SH-1`, the session's data hook proven WITHOUT a boot (`D-325`).
//
// WHY A UNIT ROW FOR A LIVE HARNESS. The hook's whole value is that a recycled process can be put back where the previous
// row found it, and its whole RISK is a restore that silently does nothing — which would let a row's green be a previous
// row's side effect. That risk is in the hook's own logic (which roots, which tier, what a refusal does), and the logic is
// testable against a fake client exactly: no Electron, no profile, no display. **THE BOOT'S HALF IS THE BATTERIES'** — the
// rows that recycle a session are `bundle-boot-seam`'s `B-2`…`B-5`, and the hook is inert there because that boot grants no
// `data` group; this row proves the code path that WOULD run where the group is granted.
//
// NO MARKER: authored after `D-30`'s sweep, so it is new evidence and it gates (`D-40`).
import { describe, expect, it } from 'vitest'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

import { restoreViews, snapshotViews, TRANSIENT_ROOTS, VIEW_ROOTS } from './session.js'

/** One `callTool` answer in the SDK's shape, its JSON body the argument. */
const answerOf = (body: unknown): { content: Array<{ type: 'text'; text: string }> } => ({
  content: [{ type: 'text', text: JSON.stringify(body) }],
})

interface Driven {
  readonly client: Client
  /** Every tool call, in order, as `name + JSON(args)`. */
  readonly calls: string[]
}

/** **THE FAKE STANDS AT THE TOOL BOUNDARY ONLY**: it answers `data.read` from a table and records every write/delete. A
 *  refused write is the `refuseWrite` arm, which is the falsifier's stimulus. */
function fakeClient(options?: { readonly absentRoute?: boolean; readonly refuseWrite?: string }): Driven {
  const calls: string[] = []
  const values: Record<string, { status: 'committed'; tier: string; value: unknown }> = {
    panes: { status: 'committed', tier: 'file', value: { 'pane-a': { width: 100 } } },
    zones: { status: 'committed', tier: 'file', value: { top: { size: 240 } } },
    theme: { status: 'committed', tier: 'file', value: { token: 'light' } },
    tabs: { status: 'committed', tier: 'file', value: { order: [] } },
  }
  const client = {
    callTool: async (request: { name: string; arguments?: Record<string, unknown> }) => {
      calls.push(`${request.name} ${JSON.stringify(request.arguments ?? {})}`)
      if (options?.absentRoute === true && request.name !== 'provident.data.read') {
        return { content: [{ type: 'text', text: 'MCP error -32602: Tool not found' }], isError: true }
      }
      if (options?.absentRoute === true) {
        return { content: [{ type: 'text', text: 'MCP error -32602: Tool not found' }], isError: true }
      }
      const path = (request.arguments?.['path'] as string[] | undefined)?.[0] ?? ''
      if (request.name === 'provident.data.read') {
        return answerOf(values[path] ?? { status: 'absent' })
      }
      if (request.name === 'provident.data.write') {
        if (options?.refuseWrite === path) return answerOf({ status: 'refused', reason: 'ConstraintRefused' })
        return answerOf({ status: 'committed' })
      }
      if (request.name === 'provident.data.delete') return answerOf({ status: 'committed' })
      return answerOf({ status: 'refused', reason: 'unexpected' })
    },
  } as unknown as Client
  return { client, calls }
}

describe('the e2e session hook · SH-1 (`D-325`, `tests/e2e/harness/session.ts`)', () => {
  it('SH-1(a) · A SNAPSHOT READS EVERY VIEW ROOT AND CARRIES ITS TIER — one read per root, in the hook\'s order', async () => {
    const { client, calls } = fakeClient()
    const snapshot = await snapshotViews(client)
    expect(calls.map((line) => line.split(' ')[0]), 'one `data.read` per root, in VIEW_ROOTS\' order').toEqual(
      VIEW_ROOTS.map(() => 'provident.data.read'),
    )
    expect(calls, 'and each read names the root it asks for').toEqual(VIEW_ROOTS.map((address) => `provident.data.read ${JSON.stringify({ path: address })}`))
    expect(snapshot, 'a granted session answers a snapshot').not.toBeNull()
    expect([...snapshot!.values()][0], 'and the value rides with the tier the store answered, never a defaulted one').toEqual({
      tier: 'file',
      value: { 'pane-a': { width: 100 } },
    })
  })

  it('SH-1(b) · A RESTORE WRITES EVERY ROOT AT ITS OWN TIER AND CLEARS THE TRANSIENT FAMILY', async () => {
    const { client, calls } = fakeClient()
    const snapshot = await snapshotViews(client)
    calls.length = 0
    await restoreViews(client, snapshot)
    const names = calls.map((line) => line.split(' ')[0])
    expect(names.filter((name) => name === 'provident.data.write'), 'one write per durable root').toHaveLength(VIEW_ROOTS.length)
    expect(names.filter((name) => name === 'provident.data.delete'), 'and one delete per transient root').toHaveLength(TRANSIENT_ROOTS.length)
    expect(calls).toContain(`provident.data.write ${JSON.stringify({ path: ['panes'], tier: 'file', value: { 'pane-a': { width: 100 } } })}`)
  })

  it('SH-1(c) · A REFUSED RESTORE THROWS WITH THE STORE\'S OWN REASON — the falsifier that keeps a dirty session from going green', async () => {
    const { client } = fakeClient({ refuseWrite: 'zones' })
    const snapshot = await snapshotViews(client)
    await expect(restoreViews(client, snapshot), 'a write the store refused must red, never be skipped').rejects.toThrow(/zones was refused — ConstraintRefused/)
  })

  it('SH-1(d) · A SESSION WITH NO `data` ROUTE ANSWERS `null` AND THE RESTORE IS A DECLARED NO-OP', async () => {
    const { client, calls } = fakeClient({ absentRoute: true })
    const snapshot = await snapshotViews(client)
    expect(snapshot, 'no route is the declared absence, and it is not a snapshot of nothing').toBeNull()
    calls.length = 0
    await restoreViews(client, snapshot)
    expect(calls, 'and nothing is written against a route that does not exist').toEqual([])
  })
})
