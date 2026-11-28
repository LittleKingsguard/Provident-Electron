// tests/integration/module-system/pane-declaration.test.ts — `M-17`, the row `S-17` files: the pane domain's MODULE HALF
// (`docs/L3/module-system/pane-declaration.md` §3, §5; `docs/L3/module-system/pane-declaration-signatures.md` §2).
// UNMARKED and GATING (`D-40`): four real `it()`s, none skipped.
//
// WHY THIS GRAIN (`D-324`): the subject is the PARSER and the composition in one process — the census cannot be seeded
// through a sanctioned route, so a booted row could not carry a module's `capabilities.panes` where a boot-constructed
// registry would read it. The parse is driven through the PUBLIC route the product has (`handleModuleTool`, the function
// `ipcMain` calls) and the row is read back from the REAL crossing store (`tests/module-registry-fixture.ts`, the same
// `createSettingsSurface` the app's own registry object mirrors).
//
// **WHAT THIS ROW MEASURES, AND WHAT IT DOES NOT.** It measures the DROP (a malformed declaration never reaches the row),
// the composition (the module's id joins `declaredPaneIds()` after the foundation's), the registry's own refusal of a
// foundation id (named once, by `S-6`, never a second net here), and the two placed arrays carried BY SHAPE. **It reads no
// log**: the refusal's NAME is the boot's line (`[provident-mcp] pane declaration … refused`), and `panesOf` is private
// (`groupsOf`'s own shape), so no arm here pretends to have read a name it cannot reach. **The address-ownership refusal
// is the ADMISSION's** (`C-5`) and no arm claims it: this landing parses and composes, and admits no placed declaration.
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { handleModuleTool } from '../../../src/main/mcp-server'
import { createRegistry, declarationsOf } from '../../../src/shared/registry/index.js'
import { DECLARED_PANE_IDS, DECLARED_ZONE_IDS } from '../../../src/shared/view-shape.js'
import { TOOL_GROUP_IDS } from '../../../src/shared/types.js'
import { createModuleRegistry } from '../../module-registry-fixture.js'

const dirs: string[] = []
const storeFor = () => {
  const dir = mkdtempSync(join(tmpdir(), 'provident-pane-declaration-'))
  dirs.push(dir)
  return createModuleRegistry(dir)
}
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

/** One manifest source, its `capabilities.panes` the argument. The parser reads a `{`-prefixed source's own
 *  `capabilities`, so this is the shape the product installs. */
const sourceWith = (panes: unknown): string => JSON.stringify({
  name: 'fixture-module',
  version: '1.0.0',
  capabilities: { panes },
})

/** The registry both realms found theirs on, over the module rows' carriers — `main.ts`'s composition shape, and the
 *  renderer's, one realm over (`ASM-DR-4`). */
const registryOver = (carriers: readonly { name: string; capabilities: Record<string, unknown> }[]) =>
  createRegistry(
    { pane: DECLARED_PANE_IDS, zone: DECLARED_ZONE_IDS, group: TOOL_GROUP_IDS, tool: [], placeholder: [] },
    carriers.flatMap((carrier) => declarationsOf(carrier as never)),
  )

describe('module-system · the pane declaration (`S-17`, `C-9`)', () => {
  it('M-17(i) · THE MEMBER SURVIVES THE PARSER — two valid panes stand, the malformed one is DROPPED, and the module still installs', () => {
    const store = storeFor()
    const answer = handleModuleTool(store, 'module.install', {
      name: 'fixture-module',
      version: '1.0.0',
      source: sourceWith([
        { paneId: 'pane-fixture', head: 'fixture-head', body: 'fixture-body' },
        { paneId: 'pane-second', zone: 'top', width: 180, head: 'second-head', body: 'second-body' },
        { paneId: 'pane-unheaded', body: 'orphan-body' },
      ]),
    }) as { status?: string }
    expect(answer.status, 'a malformed declaration never refuses the MODULE: the pane list is not the module\'s identity').toBe('installed')
    const row = store.get('fixture-module')
    const panes = row?.capabilities?.panes ?? []
    expect(panes.map((pane) => pane.paneId), 'the two sound declarations stand and the unheaded one is DROPPED — measured, not assumed').toEqual(['pane-fixture', 'pane-second'])
    expect(panes[0], 'the required members are carried whole and nothing is invented').toEqual({ paneId: 'pane-fixture', head: 'fixture-head', body: 'fixture-body' })
    expect(panes[1], 'and a `zone` plus a stated axis default ride the declaration').toEqual({ paneId: 'pane-second', zone: 'top', width: 180, head: 'second-head', body: 'second-body' })
    // AND A MODULE WITH NO PANE HAS NO MEMBER — never an empty array (`C-9`'s *"declared nothing"* kept distinct).
    handleModuleTool(store, 'module.install', {
      name: 'no-panes',
      version: '1.0.0',
      source: JSON.stringify({ name: 'no-panes', version: '1.0.0', capabilities: { tools: ['t'] } }),
    })
    expect(store.get('no-panes')?.capabilities?.panes, 'absent stays absent: a module declaring no pane declares nothing').toBeUndefined()
  })

  it('M-17(ii) · THE PANE REACHES THE COMPOSED SET — after the foundation\'s, in the declaration\'s order', () => {
    const store = storeFor()
    handleModuleTool(store, 'module.install', {
      name: 'fixture-module',
      version: '1.0.0',
      source: sourceWith([
        { paneId: 'pane-fixture', head: 'fixture-head', body: 'fixture-body' },
        { paneId: 'pane-second', head: 'second-head', body: 'second-body' },
      ]),
    })
    const row = store.get('fixture-module')
    const composed = registryOver([{ name: 'fixture-module', capabilities: (row?.capabilities ?? {}) as Record<string, unknown> }])
    expect(composed.refused, 'nothing is refused: the module names no foundation id').toEqual([])
    expect(composed.registry.declaredPaneIds(), 'the foundation first, then the module\'s own declarations in their order').toEqual([...DECLARED_PANE_IDS, 'pane-fixture', 'pane-second'])
  })

  it('M-17(iii) · A FOUNDATION PANE ID IS REFUSED BY NAME ONCE — the registry\'s `declaration-duplicate`, and no second net', () => {
    const store = storeFor()
    handleModuleTool(store, 'module.install', {
      name: 'shadowing-module',
      version: '1.0.0',
      source: sourceWith([{ paneId: DECLARED_PANE_IDS[0], head: 'x-head', body: 'x-body' }]),
    })
    const row = store.get('shadowing-module')
    const composed = registryOver([{ name: 'shadowing-module', capabilities: (row?.capabilities ?? {}) as Record<string, unknown> }])
    expect(composed.refused, 'the collision is a VALUE naming its subject, never a throw and never an override').toEqual([
      { status: 'refused', reason: 'declaration-duplicate', subject: DECLARED_PANE_IDS[0] },
    ])
    expect(composed.registry.declaredPaneIds(), 'and the set keeps what it admitted — the foundation\'s own, in its own order').toEqual([...DECLARED_PANE_IDS])
  })

  it('M-17(iv) · THE TWO PLACED ARRAYS ARE CARRIED BY SHAPE AND RESTATED NOWHERE — a malformed element is no declaration', () => {
    const store = storeFor()
    handleModuleTool(store, 'module.install', {
      name: 'fixture-module',
      version: '1.0.0',
      source: sourceWith([{
        paneId: 'pane-fixture',
        head: 'fixture-head',
        body: 'fixture-body',
        constraints: [
          { address: ['panes', 'pane-fixture', 'width'], id: 'fixture-width', constraint: { kind: 'number' } },
          { id: 'addressless', constraint: {} },
        ],
        listeners: [
          { address: ['panes', 'pane-fixture', 'width'], main: 'main-half' },
          { address: [7], client: 'client-half' },
          { main: 'no-address' },
        ],
      }]),
    })
    const pane = store.get('fixture-module')?.capabilities?.panes?.[0]
    expect(pane?.constraints, 'the store\'s pair is carried whole; the element with no address is no declaration').toEqual([
      { address: ['panes', 'pane-fixture', 'width'], id: 'fixture-width', constraint: { kind: 'number' } },
    ])
    expect(pane?.listeners, 'a listener keeps `address` plus whichever halves it stated, and a non-string address part drops the element').toEqual([
      { address: ['panes', 'pane-fixture', 'width'], main: 'main-half' },
    ])
    // **AND THE SHAPE IS THE CONTRACT'S, NOT A SECOND SPELLING**: the pair read here is the one `createProfileStore` adopts,
    // so a consumer hands it on verbatim — no mapping step, no re-typing (the `M-9` precedent, one domain over).
    expect(Object.keys(pane?.constraints?.[0] ?? {}).sort(), 'address, id, constraint — the store\'s own three, unmoved').toEqual(['address', 'constraint', 'id'])
  })
})
