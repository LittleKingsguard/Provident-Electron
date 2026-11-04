// tests/integration/central-data/bridge-route.test.ts — **THE FIVE `data.*` ROUTES ARE ANSWERED** (D-112).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
/**
 * ============================================================================
 * WHAT THIS BATTERY EXISTS FOR, IN ONE SENTENCE.
 *
 * `strata/pending.md` row 1 stood from `D-11` to `D-112`: the five `data.*` members of `RpcMethod` were
 * DECLARED and answered by nothing — no arm in `src/renderer/renderer.ts`'s `handleRequest` switch and no
 * `ipcMain.handle` site in `src/main/main.ts` — while `docs/L2/central-data/interface.md` §5 said so in its
 * own bytes and the MCP tools answered all five from the other side. **`D-112` answers them**, and the
 * routes' behaviour is the thing that has no other instrument: the five tools have `tests/e2e/central-data/`
 * and the surface has its own batteries, while NOTHING drove a request through the renderer's arm.
 *
 * **WHAT IS DRIVEN AND WHAT IS READ, STATED BEFORE THE FIRST ROW** (`D-14`'s honesty rule, and the reason
 * this paragraph exists at all):
 *
 *   · DRIVEN — the FIVE ARMS. `handleRequest` is the real exported function, the surface at the other end
 *     is the real `createDataSurface` over the real `createProfileStore` the composition stands
 *     (`src/main/main.ts`'s one construction), and the `window.provident.data` member between them is the
 *     PRELOAD'S FIVE ROUTES with `ipcRenderer.invoke` replaced by the adapter call. **THE IPCP HOP ITSELF IS
 *     NOT IN THIS FILE**: `ipcRenderer` is obtainable only in the preload (§`ISO-4`'s third limb, which this
 *     battery does not restate and does not weaken), so what is driven here is the ARM and the ADAPTER, and
 *     the CHANNELS — the five `ipcMain.handle` sites, their argument forwarding, and the absence of a sixth
 *     channel or a push — are read off the code in `BR-9`/`BR-10` and stated as a declaration read. The
 *     process boundary itself is `npm run crossings`' row `X-31`, driven over a real renderer.
 *   · THE SURFACE IS THE PRODUCT'S. No mock stands in for `createDataSurface`, `createProfileStore`, the
 *     declared roots or the answer shapes: §2's union is what the rows narrow, and a row that would need a
 *     stub is a row this file does not have.
 *
 * **AND THE CLAUSE THIS FILE MUST NOT SMUGGLE**: answering five members does NOT give `data.*` a consumer
 * of a `data.*` CHANGE. An answer site answers a REQUEST; it subscribes to nothing, and `D-107` read the
 * `data.*` clause-2 cell `N/A` because nothing consumes a change at that family. So the cell stays `N/A` at
 * `D-112` — the revival condition is unmoved and is a NEW ADDRESS IN A FAMILY'S LISTENER SET, never a
 * listener hung off `data.*` — and `BR-9` is the row that measures the difference rather than asserting it
 * in prose.
 * ============================================================================
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import { createDataSurface, type DataSurface } from '../../../src/main/data'
import { handleRequest } from '../../../src/renderer/renderer.js'
import type { RpcReply, RpcRequest } from '../../../src/shared/types.js'
import * as sharedTypes from '../../../src/shared/types.js'
import { expectRefusal, makeProfileDir, removeProfileDir, surfaceAt } from '../../unit/central-data/support/temp-profile.js'

const SRC_DIR = fileURLToPath(new URL('../../../src', import.meta.url))
const MAIN_DIR = join(SRC_DIR, 'main')
const REPO = new URL('../../../', import.meta.url)

const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')
const textOf = (absolute: string): string => readFileSync(absolute, 'utf8')

/** **COMMENT LINES ELIDED** — every absence assertion below reads CODE, never prose (`ISO-5`'s lesson): the
 *  headstones this tree leaves NAME the machinery they record (`D-46`), so a raw-bytes scan would read its own
 *  description as its own hit. A line whose trimmed form opens `//`, `*` or `/*` is blanked and a trailing `//`
 *  is cut, so what remains is the code the assertion is about. */
function commentElided(bytes: string): string {
  return bytes
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return ''
      const at = line.indexOf('//')
      return at >= 0 ? line.slice(0, at) : line
    })
    .join('\n')
}

/** **THE FIVE ROUTES, STANDING IN FOR THE PRELOAD'S MEMBER** — the same five methods, over the same argument
 *  objects, with `ipcRenderer.invoke` replaced by the adapter call the `ipcMain.handle` site performs
 *  (`src/main/main.ts`'s five sites, one line each, in the same order). The substitution is the one this
 *  file's header declares; the member's SHAPE is the preload's and the surface's, not a battery's invention. */
function installBridge(surface: DataSurface): { readonly calls: string[]; restore(): void } {
  const calls: string[] = []
  const member = {
    read: (args: unknown) => { calls.push('read'); return Promise.resolve(surface.read(args)) },
    write: (args: unknown) => { calls.push('write'); return Promise.resolve(surface.write(args)) },
    delete: (args: unknown) => { calls.push('delete'); return Promise.resolve(surface.delete(args)) },
    list: (args: unknown) => { calls.push('list'); return Promise.resolve(surface.list(args)) },
    journal: (args: unknown) => { calls.push('journal'); return Promise.resolve(surface.journal(args)) },
  }
  const realm = globalThis as { window?: unknown }
  const prior = realm.window
  realm.window = { provident: { data: member } }
  return {
    calls,
    restore: () => {
      realm.window = prior
    },
  }
}

let dir: string | null = null
afterEach(() => {
  if (dir !== null) removeProfileDir(dir)
  dir = null
  const realm = globalThis as { window?: unknown }
  delete realm.window
})

/** One fresh profile and the composition's own surface over it (`src/main/main.ts`'s one construction). */
function boot(): { surface: DataSurface; profileDir: string } {
  const profileDir = makeProfileDir()
  dir = profileDir
  return { surface: surfaceAt(profileDir), profileDir }
}

/** ONE request through the RENDERER'S ARM — the real `handleRequest`, the real bridge member, the real surface. */
async function through(id: number, method: string, payload: unknown): Promise<{ reply: RpcReply; pushes: number }> {
  let pushes = 0
  const reply = await handleRequest({} as never, { id, method, payload } as RpcRequest, () => { pushes += 1 })
  return { reply, pushes }
}

describe('central-data · the five `data.*` bridge routes (D-112)', () => {
  it('BR-1 · `data.read` ANSWERS THROUGH THE BRIDGE: a row written through the surface is read back through the renderer\'s own arm, in §2\'s `row` arm, and an address holding nothing answers `absent` rather than an empty success', async () => {
    const { surface } = boot()
    expect(surface.write({ path: ['bridge-probe'], value: 'x' }).status, 'the row the read is aimed at stands').toBe('committed')
    const bridge = installBridge(surface)
    try {
      const row = await through(1, 'data.read', { path: ['bridge-probe'] })
      expect(row.reply.ok, `the arm answered a reply: ${JSON.stringify(row.reply)}`).toBe(true)
      expect(row.reply.id).toBe(1)
      expect(row.reply.value, 'the answer is §2\'s `read`/`row` arm, path and value and no fourth member').toEqual({ status: 'read', kind: 'row', path: ['bridge-probe'], value: 'x' })

      const absent = await through(2, 'data.read', { path: ['nothing-stands-here'] })
      expect(absent.reply.ok).toBe(true)
      expect(absent.reply.value, 'absence is ANSWERED explicitly, never an empty success (interface.md §3)').toEqual({ status: 'absent', path: ['nothing-stands-here'] })
      expect(bridge.calls, 'both requests reached the same ONE route and the arm composed nothing').toEqual(['read', 'read'])
    } finally {
      bridge.restore()
    }
  })

  it('BR-2 · `data.write` ANSWERS WITH THE PASS THAT LANDED IT: `committed` carrying `path`, `cursor`, `repaired` and a MATERIALIZED `log` whose entries are the package\'s five-member record (D-103)', async () => {
    const { surface } = boot()
    const bridge = installBridge(surface)
    try {
      const answer = await through(1, 'data.write', { path: ['bridge-probe'], value: { nested: [1, true] } })
      expect(answer.reply.ok).toBe(true)
      const value = answer.reply.value as { status: string; path: unknown; cursor: unknown; repaired: unknown; log: unknown }
      expect(value.status, 'the write committed').toBe('committed')
      expect(value.path).toEqual(['bridge-probe'])
      expect(value.cursor, 'the change window\'s cursor rides the answer').toBe(1)
      expect(value.repaired, 'no constraint refused this value, so `repaired` is FALSE — derived from a `repair-run` entry\'s PRESENCE and never from a list\'s length').toBe(false)
      expect(Array.isArray(value.log), 'the log is a PLAIN array, not the store\'s non-enumerable member').toBe(true)
      expect((value.log as unknown[]).length, 'a clean write answers the entries its pass appended').toBeGreaterThan(0)
      expect(Object.keys(value.log as object), 'it is ENUMERABLE, which is what makes it cross a JSON boundary intact').not.toEqual([])
      for (const entry of value.log as Array<Record<string, unknown>>) {
        expect(Object.keys(entry).sort(), 'every entry is the package\'s own five-member record and no sixth key').toEqual(['id', 'kind', 'message', 'opId', 'state'])
      }
      expect(bridge.calls).toEqual(['write'])
    } finally {
      bridge.restore()
    }
  })

  it('BR-3 · `data.delete` ANSWERS WITH `removed` + `tiers` + `cursor` + `repaired` + `log`, and an absence answers `removed:false` with `tiers:[]` and `cursor:null` — a refusal is NOT served for nothing standing there', async () => {
    const { surface } = boot()
    expect(surface.write({ path: ['bridge-probe'], value: 'x' }).status).toBe('committed')
    const bridge = installBridge(surface)
    try {
      const gone = await through(1, 'data.delete', { path: ['bridge-probe'] })
      expect(gone.reply.ok).toBe(true)
      const value = gone.reply.value as { status: string; path: unknown; removed: unknown; tiers: unknown; cursor: unknown; repaired: unknown; log: unknown }
      expect(value.status).toBe('committed')
      expect(value.path).toEqual(['bridge-probe'])
      expect(value.removed).toBe(true)
      expect(value.tiers, 'the row stood at the file tier and the answer names it').toEqual(['file'])
      expect(typeof value.cursor, 'a delete that removed a row carries its cursor').toBe('number')
      expect(typeof value.repaired).toBe('boolean')
      expect(Array.isArray(value.log)).toBe(true)

      const absent = await through(2, 'data.delete', { path: ['nothing-stands-here'] })
      expect(absent.reply.ok, 'an absence is answered, not refused').toBe(true)
      const absentValue = absent.reply.value as { status: string; removed: unknown; tiers: unknown; cursor: unknown }
      expect({ status: absentValue.status, removed: absentValue.removed, tiers: absentValue.tiers, cursor: absentValue.cursor }).toEqual({ status: 'committed', removed: false, tiers: [], cursor: null })
    } finally {
      bridge.restore()
    }
  })

  it('BR-4 · `data.list` ANSWERS `prefix` + `paths` + `count` — an omitted prefix is the whole profile and a branch is never reported as a row', async () => {
    const { surface } = boot()
    surface.write({ path: ['alpha'], value: 'x' })
    surface.write({ path: ['bridge-probe'], value: 'x' })
    const bridge = installBridge(surface)
    try {
      const whole = await through(1, 'data.list', {})
      expect(whole.reply.ok).toBe(true)
      expect(whole.reply.value, 'the whole profile, sorted by the path\'s JSON text').toEqual({ status: 'read', prefix: null, paths: [['alpha'], ['bridge-probe']], count: 2 })
      const narrowed = await through(2, 'data.list', { prefix: ['bridge-probe'] })
      expect((narrowed.reply.value as { count: number }).count, 'a supplied prefix narrows to the paths beneath it').toBe(1)
    } finally {
      bridge.restore()
    }
  })

  it('BR-5 · `data.journal` ANSWERS THE WINDOW, and a stale cursor answers the `cursor-unknown` LEDGER carrying `floor` and `through` — through the arm, not through the surface', async () => {
    const { surface } = boot()
    surface.write({ path: ['alpha'], value: 'x' })
    surface.delete({ path: ['alpha'] })
    const bridge = installBridge(surface)
    try {
      const window = await through(1, 'data.journal', {})
      expect(window.reply.ok).toBe(true)
      const value = window.reply.value as { status: string; from: unknown; through: unknown; floor: unknown; entries: Array<Record<string, unknown>>; count: number }
      expect({ status: value.status, from: value.from, floor: value.floor, count: value.count }).toEqual({ status: 'read', from: 0, floor: 0, count: 2 })
      expect(value.entries.map((entry) => Object.keys(entry).sort()), 'each entry is §2\'s `{cursor, kind, path, changedTo}` and carries no value').toEqual([['changedTo', 'cursor', 'kind', 'path'], ['changedTo', 'cursor', 'kind', 'path']])
      expect(value.entries.map((entry) => entry.kind)).toEqual(['write', 'delete'])

      const stale = await through(2, 'data.journal', { cursor: 4095 })
      const ledger = expectRefusal(stale.reply.value)
      expect(ledger.reason, 'a cursor outside the retained window re-anchors rather than throwing').toBe('cursor-unknown')
      expect(typeof ledger.floor).toBe('number')
      expect(typeof ledger.through).toBe('number')
    } finally {
      bridge.restore()
    }
  })

  it('BR-6 · A REFUSAL CROSSES AS A VALUE AND NOT AS A THROW: a volatile spelling and a malformed argument each answer the closed ledger, and — `D-107`\'s split — the six refusals this module composes itself carry NO `log`, because no store was consulted', async () => {
    const { surface } = boot()
    const bridge = installBridge(surface)
    try {
      const volatile = await through(1, 'data.write', { path: ['secure.token'], value: 'x' })
      expect(volatile.reply.ok, 'the reply is a SUCCESS carrying a refusal VALUE — §6: no data operation throws').toBe(true)
      const ledger = expectRefusal(volatile.reply.value)
      expect(ledger.reason, 'the spelling is refused by name').toBe('volatile-path')
      expect('log' in ledger, 'this module composed the sentence, so it forwards no store log (`D-107`)').toBe(false)

      const malformed = await through(2, 'data.write', { path: ['a', -1], value: 'x' })
      expect(expectRefusal(malformed.reply.value).reason, 'an index outside the domain is refused naming the member').toBe('malformed-arguments')

      const root = await through(3, 'data.delete', { path: [] })
      expect(expectRefusal(root.reply.value).reason, 'the whole register is not deletable in one call').toBe('root-not-writable')
    } finally {
      bridge.restore()
    }
  })

  it('BR-7 · THE ARM COMPOSES NOTHING — the payload object the request carries arrives at the adapter BY IDENTITY, unwrapped and unmodified, and no path, tier or value is read, defaulted or re-spelled on this side', async () => {
    const seen: unknown[] = []
    const member = {
      read: (args: unknown) => { seen.push(args); return Promise.resolve({ status: 'absent', path: [] }) },
      write: (args: unknown) => { seen.push(args); return Promise.resolve({ status: 'committed', path: [], cursor: 0, repaired: false, log: [] }) },
      delete: (args: unknown) => { seen.push(args); return Promise.resolve({ status: 'committed', path: [], removed: false, tiers: [], cursor: null, repaired: false, log: [] }) },
      list: (args: unknown) => { seen.push(args); return Promise.resolve({ status: 'read', prefix: null, paths: [], count: 0 }) },
      journal: (args: unknown) => { seen.push(args); return Promise.resolve({ status: 'read', from: 0, through: 0, floor: 0, entries: [], count: 0 }) },
    }
    const realm = globalThis as { window?: unknown }
    realm.window = { provident: { data: member } }
    try {
      const payloads: unknown[] = []
      for (const method of ['data.read', 'data.write', 'data.delete', 'data.list', 'data.journal']) {
        const payload = { path: ['alpha'], tier: 'mem', value: { a: 1 } }
        payloads.push(payload)
        await through(1, method, payload)
      }
      for (let i = 0; i < payloads.length; i += 1) {
        expect(seen[i], 'the SAME object, not a copy and not a reduced member set').toBe(payloads[i])
      }
    } finally {
      delete realm.window
    }
  })

  it('BR-8 · `MUTATING_METHODS` KEEPS ITS SEVEN AND NONE OF THE FIVE ARMS PUSHES: the predicate is the APP GRAPH\'s and a `data.*` write adds no node to it, so every arm answers without emitting the `mcp://provident/app` notification — with `dispatch` driven beside them as the control', async () => {
    const { surface } = boot()
    const bridge = installBridge(surface)
    try {
      const pushes: number[] = []
      for (const [method, payload] of [
        ['data.read', {}],
        ['data.write', { path: ['alpha'], value: 'x' }],
        ['data.delete', { path: ['alpha'] }],
        ['data.list', {}],
        ['data.journal', {}],
      ] as Array<[string, unknown]>) {
        const answer = await through(1, method, payload)
        expect(answer.reply.ok, `${method} answered`).toBe(true)
        pushes.push(answer.pushes)
      }
      expect(pushes, 'no `data.*` arm emits the app-graph push: the resource it would name did not change (interface.md §7)').toEqual([0, 0, 0, 0, 0])

      // THE CONTROL — the same predicate, driven on a method that IS in the set, through the same instrument.
      const dispatched = await handleRequest({ dispatch: () => ({ status: 'applied' }) } as never, { id: 9, method: 'dispatch', payload: {} } as RpcRequest, () => { pushes.push(1) })
      expect(dispatched.ok).toBe(true)
      expect(pushes.length, 'the control fired the predicate, so the five zeros above are a measurement and not a dead instrument').toBe(6)

      // AND THE SET IS READ OFF THE CODE, because it is not exported: seven members, name for name, `data.*` absent.
      const renderer = commentElided(sourceOf('src/renderer/renderer.ts'))
      const mutating = /const MUTATING_METHODS = new Set\(\[([^\]]*)\]\)/.exec(renderer)
      expect(mutating, 'src/renderer/renderer.ts declares MUTATING_METHODS').not.toBeNull()
      expect([...(mutating?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1]), 'the predicate\'s declared meaning is "the MCP methods that mutate the APP graph", and a `data.*` write is not one').toEqual(['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal'])
    } finally {
      bridge.restore()
    }
  })

  it('BR-9 · THE ROUTE IS NOT A LISTENER (`D-107`\'s clause-2 reading rests on exactly this): `src/main/data/` subscribes to nothing and registers no constraint, the vocabulary carries FIVE `data` channels and no sixth, and no `data.*` delivery exists to withdraw', () => {
    // (i) NO SUBSCRIBER IN THE MODULE — `listen(` and `register(` are the package's two arms, and the module calls neither.
    const moduleFiles = ['args.ts', 'index.ts', 'journal.ts', 'mapper.ts', 'store.ts', 'surface.ts', 'types.ts']
    for (const file of moduleFiles) {
      const code = commentElided(textOf(join(MAIN_DIR, 'data', file)))
      expect(/\blisten\s*\(/.test(code), `src/main/data/${file} calls no \`listen(\``).toBe(false)
      expect(/\bregister\s*\(/.test(code), `src/main/data/${file} calls no \`register(\``).toBe(false)
      expect(/\bipcMain\b|\bipcRenderer\b|\bwebContents\b/.test(code), `src/main/data/${file} reaches no channel`).toBe(false)
    }
    // (ii) NO SIXTH CHANNEL AND NO DELIVERY — the five names are requests, and the crossings' sixth name has no twin here.
    const dataChannels = Object.entries(sharedTypes)
      .filter(([name, value]) => name.startsWith('IPC_DATA_') && typeof value === 'string')
      .map(([, value]) => value as string)
      .sort()
    expect(dataChannels, 'five `data` channels, each a REQUEST — no `provident:data:changed` beside them').toEqual([
      'provident:data:delete', 'provident:data:journal', 'provident:data:list', 'provident:data:read', 'provident:data:write',
    ])
    // AND THE CONTROL — the instrument CAN see a delivery, so the five above are not a pattern that matches nothing.
    expect(dataChannels.some((name) => /changed/.test(name)), 'no `data` channel is a push').toBe(false)
    const deliveriesHere = Object.values(sharedTypes).filter((value) => typeof value === 'string' && /^provident:.*:changed$/.test(value)).map((value) => value as string).sort()
    expect(deliveriesHere, 'the two deliveries THIS module carries are visible to the same reading — `D-104`\'s and `D-106`\'s; the two crossings\' own sit in `tabs-channels.ts`/`view-channels.ts` and are not this file\'s').toEqual(['provident:module:changed', 'provident:security:changed'])
    // (iii) NO `onChanged` ON THE MEMBER, IN EITHER LOCKSTEP HALF.
    for (const file of ['preload.ts']) {
      const code = commentElided(textOf(join(MAIN_DIR, file)))
      const member = /data: \{([\s\S]*?)\n {2}\},/.exec(code)
      expect(member, `${file} declares the \`data\` member`).not.toBeNull()
      expect(/onChanged/.test(member?.[1] ?? ''), `the \`data\` member in ${file} carries no delivery`).toBe(false)
    }
    const panels = commentElided(sourceOf('src/renderer/secure-panels.ts'))
    const panelsMember = /data\?: \{([\s\S]*?)\n {6}\}/.exec(panels)
    expect(panelsMember, 'secure-panels.ts declares the lockstep half').not.toBeNull()
    expect(/onChanged/.test(panelsMember?.[1] ?? ''), 'and the renderer\'s half carries no delivery either').toBe(false)
  })

  it('BR-10 · THE FIVE SITES AND THE ABSENT GUARD: `src/main/main.ts` registers ONE `ipcMain.handle` site per channel, forwards the caller\'s argument object in one expression, and NO handler in this file reads its event or checks a sender — the four sibling crossings do not, so a guard here would be the only one in the file', () => {
    const main = commentElided(textOf(join(MAIN_DIR, 'main.ts')))
    for (const [channel, verb] of [['IPC_DATA_READ', 'read'], ['IPC_DATA_WRITE', 'write'], ['IPC_DATA_DELETE', 'delete'], ['IPC_DATA_LIST', 'list'], ['IPC_DATA_JOURNAL', 'journal']] as Array<[string, string]>) {
      expect(main.includes(`ipcMain.handle(${channel}, (_event, args: unknown) => dataSurface.${verb}(args))`), `main.ts registers ${channel} and feeds dataSurface.${verb}`).toBe(true)
      expect(main.includes(`ipcMain.on(${channel}`), `${channel} carries no request-listener arm — the route is a request, not a push`).toBe(false)
    }
    // THE GUARD CENSUS — stated as a MEASUREMENT of the siblings rather than an opinion about the new sites.
    expect(/\bpermitted\s*\(/.test(commentElided(sourceOf('src/main/main.ts'))), 'there is no `permitted()` IPC guard in this file to match').toBe(false)
    expect(/\bsenderFrame\b/.test(main), 'no handler in main.ts inspects the frame a request came from').toBe(false)
    expect(/\bevent\b/.test(main), 'every handler discards its event (the parameter is spelled `_event`, and no handler reads a bare `event`)').toBe(false)
  })

  it('BR-11 · THE CONTROL — the switch answers `data.*` and NOTHING ELSE THAT WEARS THE PREFIX: a sixth `data.` spelling is still `unknown method`, so the five arms are an enumerated set and not a wildcard; and a realm with no `data` member answers a STATED REFUSAL rather than a throw', async () => {
    const { surface } = boot()
    const bridge = installBridge(surface)
    try {
      const unknown = await through(1, 'data.purge', { path: ['alpha'] })
      expect(unknown.reply.ok, 'an unanswered method is a FAILED reply, not a value').toBe(false)
      expect(unknown.reply.error, 'the default arm\'s own sentence, named').toBe('unknown method: data.purge')
      expect(bridge.calls, 'and it reached no route at all').toEqual([])
    } finally {
      bridge.restore()
    }
    // THE SECOND HALF — a realm that has no `data` member: the node suite's shim, a page without the preload, an older
    // bridge. §2's closed vocabulary has no `absent` arm for a route, so the arm answers the ledger's own
    // `store-unreachable` — the word for a store this realm cannot reach — and mints no thirteenth reason word.
    const bare = await through(2, 'data.read', { path: ['alpha'] })
    expect(bare.reply.ok, 'no throw escapes the arm').toBe(true)
    const ledger = expectRefusal(bare.reply.value)
    expect(ledger.reason).toBe('store-unreachable')
    expect(ledger.message, 'and the sentence names the missing member, so a reader is told which half is absent').toContain('`data` member')
  })
})
