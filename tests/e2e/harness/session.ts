// tests/e2e/harness/session.ts — **THE SESSION'S DATA HOOK: SNAPSHOT THE VIEW ROOTS ONCE, RESTORE THEM BETWEEN ROWS**
// (`D-325`). A battery that recycles ONE process across rows must put the app's data back where the previous row found
// it, or a row's green can be a prior row's side effect. This module is that restore and nothing else: it boots nothing,
// asserts nothing, and names no row.
//
// **THE HOOK IS THE APP'S OWN SURFACE, NOT A FILE WRITE.** The four roots are the view record's (`D-65`, `C-5`) and the
// tab record's, and the only sanctioned writer is the `provident.data.*` route (`docs/L2/central-data/*`) — so a restore
// is `data.write` per root at the tier the read answered, plus a `data.delete` of the transient `drag` family (`D-132`).
// **A FILE WRITE WOULD BE THE SECOND AUTHORITY THE STORE EXISTS TO REFUSE**: the store holds the file open and its own
// receipt is what the next read must see.
//
// **WHAT IT CANNOT RESTORE, STATED SO NOBODY ASSUMES OTHERWISE.** The operator's security record and the module census are
// TIER-4/manual-UI and have no MCP route by design (`D-85`, `D-94`): a row whose stimulus changes either one must take a
// FRESH BOOT, and those are the rows the batteries keep (`D-325`'s isolation clause). The view roots are the resettable
// half, and they are the half a rendered-surface row mutates.
//
// **A REFUSED RESTORE IS A RED AND NEVER A WARNING** (`D-105`, `D-74`): a write the store refuses leaves the next row on
// dirt, so `restoreViews` throws with the answer's own reason rather than proceeding.
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

import { call } from './live-boot.js'

/** The four durable roots a rendered-surface row can mutate, and the one transient family the drag writes. The
 *  addresses are the store's own (`C-5`): the view record's three and the tab record's, each a WHOLE-family write. */
export const VIEW_ROOTS: readonly (readonly string[])[] = [['panes'], ['zones'], ['theme'], ['tabs']]
export const TRANSIENT_ROOTS: readonly (readonly string[])[] = [['drag']]

/** The snapshot: one entry per root, the value `data.read` answered with. A root that answered `absent` is recorded as
 *  `null` so a restore can DELETE it rather than invent an empty family (`C-9`: "declared nothing" is not "empty"). */
export type ViewSnapshot = ReadonlyMap<string, { readonly tier: string; readonly value: unknown } | null>

const keyOf = (address: readonly string[]): string => address.join('/')

/** One read per root, before the first row. `absent` is a lawful answer and is carried as `null`.
 *
 *  **A SESSION WITH NO `data` GROUP ANSWERS `null`, AND THAT IS THE DECLARED ABSENCE AND NOT A FAILURE** (`D-11`'s
 *  conditional surface): the five `provident.data.*` tools are published only where the security record grants the group
 *  (`src/main/security.ts`'s two-gate), so a plain boot has no hook to offer. `restoreViews` then does nothing and SAYS so
 *  — a session whose rows never mutate a view root (`bundle-boot-seam`'s `B-2`…`B-5`) needs none, and a session whose rows
 *  DO mutate must seed the group; a silent no-op would be the false green `D-105` forbids. */
export async function snapshotViews(client: Client): Promise<ViewSnapshot | null> {
  const snapshot = new Map<string, { tier: string; value: unknown } | null>()
  for (const [index, address] of VIEW_ROOTS.entries()) {
    const answer = await call(client, 'provident.data.read', { path: address })
    if (!answer.ok) {
      // THE ROUTE ITSELF IS ABSENT (`-32602 tool not found`) OR REFUSED AT THE FIRST ROOT: no hook on this session.
      if (index === 0) return null
      throw new Error(`session snapshot: ${keyOf(address)} was refused — ${answer.text}`)
    }
    const held = answer.value as { status?: unknown; tier?: unknown; value?: unknown }
    if (held.status !== 'committed') {
      snapshot.set(keyOf(address), null)
      continue
    }
    snapshot.set(keyOf(address), { tier: typeof held.tier === 'string' ? held.tier : 'file', value: held.value })
  }
  return snapshot
}

/** Put every root back where the snapshot found it, and clear the transient family. Throws with the store's own answer
 *  on a refusal — never a silent continue. */
export async function restoreViews(client: Client, snapshot: ViewSnapshot | null): Promise<void> {
  // A DECLARED ABSENCE IS A NO-OP AND NEVER A THROW (`snapshotViews`'s note): the session has no `data` route, so it has
  // nothing to put back and no row in it can have moved a root.
  if (snapshot === null) return
  for (const address of VIEW_ROOTS) {
    const held = snapshot.get(keyOf(address))
    if (held === undefined) {
      throw new Error(`session restore: ${keyOf(address)} is not in the snapshot — a restore over a root nobody read would invent one`)
    }
    if (held === null) {
      const deleted = await call(client, 'provident.data.delete', { path: address })
      if (!deleted.ok) throw new Error(`session restore: ${keyOf(address)} could not be cleared — ${deleted.text}`)
      continue
    }
    const written = await call(client, 'provident.data.write', { path: address, tier: held.tier, value: held.value })
    const answer = written.value as { status?: unknown; reason?: unknown }
    if (!written.ok || answer.status !== 'committed') {
      throw new Error(`session restore: ${keyOf(address)} was refused — ${String(answer.reason ?? written.text)}`)
    }
  }
  for (const address of TRANSIENT_ROOTS) {
    const deleted = await call(client, 'provident.data.delete', { path: address })
    if (!deleted.ok) throw new Error(`session restore: ${keyOf(address)} could not be cleared — ${deleted.text}`)
  }
}
