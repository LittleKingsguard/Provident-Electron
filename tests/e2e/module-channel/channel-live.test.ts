// tests/e2e/module-channel/channel-live.test.ts — THE L1 BATTERY for `M-11` (and `M-13` when it lands): the write turn's
// BATCH, read at the app's own surface, on ONE boot of the built bundle (`docs/L1/modularity.md` §6; `C-2`, `D-320`).
//
// WHAT THIS BATTERY EXISTS FOR. `D-320` settled the fan-out's grain: the batch is the MESSAGE, the firing is per ENTRY in
// the message's order. `M-11` is the row that reads it — one write turn fires every listener the turn reaches, the entries
// share ONE `turn`, and each carries the arm `C-2` fixes: `return` with the main half's settled value, `passthrough` with
// the triggering address where no main half is declared, `empty` for a main that answers nothing, `threw` for one that
// throws (contained and named), and `refused` for a value that cannot cross (named, message whole). **A `Promise` IS NOT
// THE REFUSED ARM** since 2.0.0: a suspending main half's SETTLED value is what the receipt's `returnedValues` carries,
// which is why the `return` arm suspends and the `refused` arm settles on a FUNCTION (`AN-1`'s upstream half).
//
// THE WITNESS USES ONLY THE APP'S EXTERNAL SURFACE (`AN-22`). The module's client half records every entry it is handed
// with `ctx.store.write(<address>, 'temp', …)` — the client store is async and the channel owns the turn — and the row
// reads it back with `provident.data.read`, whose payload member is `path`. No graph contribution, no
// `provident.dispatch` and no `get_node_state`: `M-2b` owns those.
//
// THE HARNESS IS THE EXECUTOR BATTERY'S, CARRIED VERBATIM (`AN-20`): the host-wide live-boot lock, the reap with a zero
// proof, the artifact ensure, the bounded waits, the scratch profile and the stdio transport. One boot, held under the
// lock, reaped and proved gone before the profile goes (`D-74`, `D-94`). **A `DISPLAY` IS A PREREQUISITE AND NEVER A
// SKIP**, and no row here is marked or skipped (D-30, D-40).
//
// WHAT IT DOES NOT MEASURE: the fan-out's address relation (`M-13`, reserved with it), the per-module containment arm's
// app-paint half, and the crossing-address pair — none of them is this row's subject.


import { rmSync } from 'node:fs'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  ROW_MS, asObject, boot, call, liveBootReleases, livePids, makeProfile, reap, scratchProfiles, sleep, statusOf,
  str, type Boot,
} from '../harness/live-boot.js'

// ---- the module this battery installs ---------------------------------------------------------------
/** ONE address, FIVE declarations (`C-3`'s grain: a declaration is its handle, client-keyed here). Before `AN-23` the
 *  executor keyed its mains by ADDRESS, so five declarations here would have shared ONE main half; the fix keys them by
 *  the handle, which is what makes this fixture lawful. */
const BATCH = 'matrix-batch'
const BATCH_ADDRESS = ['matrix-batch']
const BATCH_LOG = ['matrix-batch-log']
const RET_MAIN = 'function () { return Promise.resolve({ ok: 1 }) }'
const EMPTY_MAIN = 'function () { return Promise.resolve(undefined) }'
const THREW_MAIN = 'function () { throw new Error("matrix-batch-boom") }'
const REFUSED_MAIN = 'function () { return Promise.resolve(function () { return "not-transport-safe" }) }'
/** THE ENTRY: the five declarations, each main a LIVE function (the manifest's string is the declared spelling, the
 *  entry's function is the registered half — `activation.ts`'s own two spellings of one thing). */
const BATCH_ENTRY = [
  'function (ctx) {',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve({ ok: 1 }) }, client: "ret" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], client: "pass" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve(undefined) }, client: "empty" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { throw new Error("matrix-batch-boom") }, client: "threw" })',
  '  ctx.declare({ kind: "listener", address: ["matrix-batch"], main: function () { return Promise.resolve(function () { return "not-transport-safe" }) }, client: "refused" })',
  '}',
].join('\n')
/** THE CLIENT HALF: every entry it is handed goes into the module's OWN log, written through the client store — the one
 *  surface a client half has (`AN-22`). The log is the row's whole witness. */
const BATCH_CLIENT = [
  'function (ctx) {',
  '  var seen = []',
  '  function record(entry) {',
  '    seen.push({ listener: entry.listener, outcome: entry.outcome, turn: entry.turn, address: entry.address, data: entry.data, refusal: entry.refusal })',
  '    ctx.store.write(["matrix-batch-log"], "temp", JSON.stringify(seen))',
  '  }',
  '  ctx.onDelivery("ret", record)',
  '  ctx.onDelivery("pass", record)',
  '  ctx.onDelivery("empty", record)',
  '  ctx.onDelivery("threw", record)',
  '  ctx.onDelivery("refused", record)',
  '}',
].join('\n')
const batchSource = (): string => JSON.stringify({
  name: BATCH,
  version: '1.0.0',
  capabilities: {
    listeners: [
      { address: BATCH_ADDRESS, main: RET_MAIN, client: 'ret' },
      { address: BATCH_ADDRESS, client: 'pass' },
      { address: BATCH_ADDRESS, main: EMPTY_MAIN, client: 'empty' },
      { address: BATCH_ADDRESS, main: THREW_MAIN, client: 'threw' },
      { address: BATCH_ADDRESS, main: REFUSED_MAIN, client: 'refused' },
    ],
  },
  entry: BATCH_ENTRY,
  client: BATCH_CLIENT,
})


let booted: Boot | null = null
/** The profile the first boot stands on, kept so a row can RE-BOOT the SAME census (`M-30`). */
let bootProfile: string | null = null

beforeAll(async () => {
  bootProfile = makeProfile('provident-modularity')
  booted = await boot(bootProfile)
}, ROW_MS)

afterAll(async () => {
  let failure: Error | null = null
  if (booted !== null) {
    try {
      await booted.stop()
    } catch (error) {
      failure = error instanceof Error ? error : new Error(String(error))
    }
    booted = null
  }
  // THE INVARIANT, in the order `D-74` fixes and with nothing silent in it: every tree this file spawned is reaped and
  // the report IS the zero proof (a reap whose only failure path is silence turns a leak into a green); the profiles go
  // only after it; the host-wide live-boot lock is released here WHATEVER this file measured, because a lock held past
  // a throwing teardown wedges the sibling spawning battery for its whole bound; and only then is a survivor a RED
  // naming every one of them (`D-74`, `D-94`).
  const report = reap([...scratchProfiles], [...livePids])
  for (const dir of scratchProfiles.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort; the report below is the guarantee */
    }
  }
  for (const release of liveBootReleases.splice(0)) {
    try {
      release()
    } catch {
      /* a release that threw has still run its own removal */
    }
  }
  if (failure !== null) throw failure
  if (report.survivors.length > 0) {
    throw new Error(
      `modularity teardown: ${report.survivors.length} process(es) SURVIVED ${report.passes} SIGKILL sweep(s). A survivor means this run leaks a ` +
        `process tree, which is the defect the teardown exists to make impossible (D-74):\n` +
        report.survivors.map((row) => `  pid ${row.pid} (ppid ${row.ppid}) ${row.args}`).join('\n'),
    )
  }
})

/** The one client every row drives, or a RED naming the boot that never stood — never a skip (D-74, D-30). */
function client(): Client {
  if (booted === null) {
    throw new Error(
      'PREREQUISITE ERROR — no boot stands: `beforeAll` did not reach a handshake, so no row below can measure anything. ' +
        'This is a RED and never a skip (D-74); the boot’s own throw, above this one, names the reason.',
    )
  }
  return booted.client
}

describe('module-channel — U3: the batch, measured at the app\'s own surface (docs/L1/modularity.md §6, C-2, D-320)', () => {
  it('M-11 — ONE write turn is ONE message: five entries share one `turn`, and the five arms answer what `C-2` says', async () => {
    const installed = await call(client(), 'module.install', { name: BATCH, version: '1.0.0', source: batchSource() })
    expect(installed.ok, `module.install answered as a throw rather than a value: ${installed.text}`).toBe(true)
    expect(statusOf(installed), `module.install answered ${installed.text}`).toBe('installed')

    // THE STIMULUS: ONE write at the address all five declarations watch. Every entry the turn fires belongs to it.
    const written = await call(client(), 'provident.data.write', { path: [...BATCH_ADDRESS], value: { go: 1 }, tier: 'file' })
    expect(written.ok, `the stimulus write did not answer: ${written.text}`).toBe(true)

    // THE WITNESS IS THE MODULE'S OWN LOG, read over the app's surface. The client half's write crosses the channel, so
    // the read is polled to a stated bound rather than assumed to have landed (`AN-22`).
    const entries = await (async (): Promise<readonly unknown[]> => {
      let held: readonly unknown[] = []
      for (let attempt = 0; attempt < 50; attempt += 1) {
        const read = await call(client(), 'provident.data.read', { path: [...BATCH_LOG] })
        const answer = asObject(read.value)
        const node = answer === null ? null : asObject(answer['value'])
        const text = node === null ? null : str(node['value'])
        if (text !== null) {
          try {
            held = JSON.parse(text) as readonly unknown[]
          } catch {
            held = []
          }
          if (held.length >= 5) return held
        }
        await sleep(100)
      }
      return held
    })()
    expect(entries.length, `the module recorded ${String(entries.length)} entries — its log answered nothing, or fewer than the five the turn fired; the last read answered ${JSON.stringify(entries).slice(0, 400)}`).toBe(5)

    const rows = entries.map((entry) => asObject(entry)).filter((entry): entry is Record<string, unknown> => entry !== null)
    const turns = new Set(rows.map((row) => String(row['turn'])))
    expect(turns.size, `ONE delivery: every entry of the turn carries ONE turn, and this run saw ${JSON.stringify([...turns])}`).toBe(1)

    const byHandle = new Map(rows.map((row) => [String(row['listener']), row]))
    const entryFor = (name: string): Record<string, unknown> | undefined => byHandle.get(`module:${BATCH}#${name}`)
    expect([...byHandle.keys()].sort(), 'every entry names its OWN declaration\'s handle (`C-3`, `ASM-MC-7`)').toEqual(
      ['empty', 'pass', 'refused', 'ret', 'threw'].map((name) => `module:${BATCH}#${name}`).sort(),
    )

    // (1) THE `return` ARM: a SUSPENDING main half, its SETTLED value as the entry's data (`AN-1`'s upstream half is why
    //     the arm suspends rather than returning synchronously).
    expect(entryFor('ret')?.['outcome'], 'the suspending main half\'s settled value is a `return`').toBe('return')
    expect(asObject(entryFor('ret')?.['data'])?.['ok'], 'and the data IS that settled value').toBe(1)
    // (2) THE `passthrough` ARM: no main half declared, and the entry carries the address the turn fired at.
    expect(entryFor('pass')?.['outcome'], 'a declaration with no main half is the passthrough arm').toBe('passthrough')
    expect(entryFor('pass')?.['address'], 'and it carries the WRITE\'s address').toEqual(BATCH_ADDRESS)
    // (3) THE `empty` ARM: a main half that answers nothing.
    expect(entryFor('empty')?.['outcome'], 'a main half that settles to nothing is `empty`, never `return` with undefined').toBe('empty')
    // (4) THE `threw` ARM: contained and NAMED, and the batch carries on to the other four.
    expect(entryFor('threw')?.['outcome'], 'a main half\'s throw is contained as an entry arm').toBe('threw')
    expect(entryFor('threw')?.['refusal'], 'and it is REFUSED BY NAME').toBe('main-half-threw')
    // (5) THE `refused` ARM: a settled value that cannot cross — a function — named and never silently dropped.
    expect(entryFor('refused')?.['outcome'], 'a value that cannot cross is `refused`, not `return`').toBe('refused')
    expect(entryFor('refused')?.['refusal'], 'and the refusal names the reason').toBe('not-transport-safe')

    // AND THE BATCH WAS ONE: five entries, one turn, five distinct handles — the reading `D-320` says a module can take.
    expect(rows.every((row) => String(row['turn']) === String(rows[0]?.['turn'])), 'every entry came from the one message').toBe(true)
  }, ROW_MS)
})

// ---- M-13: the fan-out's address relation -----------------------------------------------------------
/** **THE PAIR THAT MAKES PREFIX DISAMBIGUATING** (L1 §6, `C-3`): a root and a leaf UNDER it. One write at the LEAF
 *  reaches BOTH; one write at the ROOT reaches the root alone. A row that read "each notified only for its own address"
 *  measures IDENTITY and fails the first write; a row that read "everything is notified" fails the second.
 *
 *  **WHY A SCRATCH PAIR AND NOT THE CROSSING'S OWN** — MEASURED, not preferred: writing a foreign value at
 *  `['panes','pane-a']` is REFUSED by the pane record's own constraint pass (`status:"refused"`, `reason:"store-refused"`,
 *  the geometry message), and writing the standing geometry back is a no-op the 2.0.0 change detection does not fire
 *  (`triggered: []`). So the crossing's pair cannot carry this witness at this head; the relation under test is the
 *  STORE'S PREFIX and not the address's identity, so the pair stands under one root of its own. **AND A NESTED WRITE DOES
 *  NOT CREATE ITS PARENT** (`parent-absent`, measured): the root is written first, which is why the creation has its own
 *  entry below. */
const CROSS = 'matrix-cross'
const CROSS_LOG = ['matrix-cross-log']
const TREE_ROOT = ['matrix-tree']
const TREE_LEAF = ['matrix-tree', 'leaf']
const QUIET = 'matrix-quiet'
const QUIET_LOG = ['matrix-quiet-log']
/** THE CLIENT HALF of `matrix-cross`: both declarations record, so the row can read WHICH one heard WHICH address. */
const CROSS_CLIENT = [
  'function (ctx) {',
  '  var seen = []',
  '  function record(entry) {',
  '    seen.push({ listener: entry.listener, address: entry.address, outcome: entry.outcome })',
  '    ctx.store.write(["matrix-cross-log"], "temp", JSON.stringify(seen))',
  '  }',
  '  ctx.onDelivery("root", record)',
  '  ctx.onDelivery("leaf", record)',
  '}',
].join('\n')
const crossSource = (): string => JSON.stringify({
  name: CROSS,
  version: '1.0.0',
  capabilities: { listeners: [{ address: TREE_ROOT, client: 'root' }, { address: TREE_LEAF, client: 'leaf' }] },
  entry: [
    'function (ctx) {',
    '  ctx.declare({ kind: "listener", address: ["matrix-tree"], client: "root" })',
    '  ctx.declare({ kind: "listener", address: ["matrix-tree", "leaf"], client: "leaf" })',
    '}',
  ].join('\n'),
  client: CROSS_CLIENT,
})
/** CONTAINMENT'S SUBJECT: a client half that THROWS on delivery. It must stop neither the batch nor another module. */
const THROWER = 'matrix-throw'
const throwerSource = (): string => JSON.stringify({
  name: THROWER,
  version: '1.0.0',
  capabilities: { listeners: [{ address: TREE_LEAF, client: 'boom' }] },
  entry: 'function (ctx) { ctx.declare({ kind: "listener", address: ["matrix-tree", "leaf"], client: "boom" }) }',
  client: 'function (ctx) { ctx.onDelivery("boom", function () { throw new Error("matrix-cross-boom") }) }',
})
/** A MODULE WITH NO ENTRY IN THE TURN: it must hear NOTHING, which is what separates a fan-out from a broadcast. */
const quietSource = (): string => JSON.stringify({
  name: QUIET,
  version: '1.0.0',
  capabilities: { listeners: [{ address: ['matrix-quiet'], client: 'note' }] },
  entry: 'function (ctx) { ctx.declare({ kind: "listener", address: ["matrix-quiet"], client: "note" }) }',
  client: [
    'function (ctx) {',
    '  ctx.onDelivery("note", function (entry) { ctx.store.write(["matrix-quiet-log"], "temp", JSON.stringify(entry.address)) })',
    '}',
  ].join('\n'),
})

/** The module's own log, read over the app's surface — the `M-11` recipe (`AN-22`), polled to a stated bound. */
async function readLog(path: readonly string[], want: number): Promise<readonly Record<string, unknown>[]> {
  let held: readonly unknown[] = []
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const read = await call(client(), 'provident.data.read', { path: [...path] })
    const answer = asObject(read.value)
    const node = answer === null ? null : asObject(answer['value'])
    const text = node === null ? null : str(node['value'])
    if (text !== null) {
      try {
        const parsed = JSON.parse(text) as unknown
        held = Array.isArray(parsed) ? parsed : [parsed]
      } catch {
        held = []
      }
      if (held.length >= want) break
    }
    await sleep(100)
  }
  return held.map((entry) => asObject(entry)).filter((entry): entry is Record<string, unknown> => entry !== null)
}
const write = async (path: readonly string[], value: unknown): Promise<Record<string, unknown>> => {
  const answer = await call(client(), 'provident.data.write', { path: [...path], value, tier: 'file' })
  expect(answer.ok, `the write at ${JSON.stringify(path)} did not answer: ${answer.text}`).toBe(true)
  const body = asObject(answer.value) ?? {}
  expect(str(body['status']), `the write at ${JSON.stringify(path)} answered ${answer.text}`).toBe('committed')
  return body
}
const handleOf = (name: string): string => `module:${CROSS}#${name}`
const listenersIn = (entries: readonly Record<string, unknown>[]): readonly string[] => entries.map((entry) => String(entry['listener']))

describe('module-channel — U3: the fan-out is PREFIX and not identity, and containment is per firing (M-13)', () => {
  it('M-13 — ONE write at the LEAF reaches the root AND the leaf; ONE write at the ROOT reaches the root alone; a throwing half and an absent one change neither', async () => {
    for (const [name, source] of [[CROSS, crossSource()], [THROWER, throwerSource()], [QUIET, quietSource()]] as const) {
      const installed = await call(client(), 'module.install', { name, version: '1.0.0', source })
      expect(statusOf(installed), `module.install for ${name} answered ${installed.text}`).toBe('installed')
    }

    // THE ROOT MUST EXIST FIRST (a nested write does not create its parent). Its own listener hears the creation, which
    // is the row's FIRST datum: a declaration at the written address is notified.
    await write(TREE_ROOT, {})
    const afterBirth = await readLog(CROSS_LOG, 1)
    expect(afterBirth.length, 'the creation of the root notified the root\'s own declaration').toBe(1)
    expect(listenersIn(afterBirth), 'and it was the ROOT that heard it').toEqual([handleOf('root')])

    // (1) THE LEAF WRITE: the leaf's declaration prefixes itself and the ROOT's prefixes it too, so BOTH hear it.
    await write(TREE_LEAF, { seat: 'leaf' })
    const afterLeaf = await readLog(CROSS_LOG, 3)
    expect(afterLeaf.length, `after ONE write at the leaf the crossing heard ${String(afterLeaf.length - 1)} entries, and PREFIX says two`).toBe(3)
    const leafEntries = afterLeaf.filter((entry) => JSON.stringify(entry['address']) === JSON.stringify(TREE_LEAF))
    expect([...listenersIn(leafEntries)].sort(), 'the root AND the leaf heard it, by their own handles').toEqual([handleOf('leaf'), handleOf('root')].sort())
    // (2) CONTAINMENT: the thrower's half threw on that same delivery, and the crossing's two entries stand — one module's
    //     fault stops neither the batch nor another module.
    expect(leafEntries.length, 'a client half that threw did not stop the crossing from recording its own two').toBe(2)
    // (3) THE QUIET MODULE: nothing in the turn reached it, so its log does not exist at all.
    const quiet = await call(client(), 'provident.data.read', { path: [...QUIET_LOG] })
    const quietAnswer = asObject(quiet.value)
    expect(str(quietAnswer?.['status']), `a module with no entry in the turn must hear nothing, and its log answered ${quiet.text}`).toBe('absent')
    // (4) **THE ROOT WRITE IS NOT READ, AND THAT IS THE MEASUREMENT (`AN-24`).** The pages said a write at the ROOT
    //     reaches the root ALONE. Run twice, the same row read it as BOTH (the leaf told — the store's touched arm,
    //     `D-66`/`Q-6`) and as ROOT-ONLY (the leaf's own literal unchanged, `D-193`'s value condition) — the reach
    //     depends on what the act lands below, and two runs disagreed. **A READING THAT MOVES BETWEEN RUNS IS NOT A
    //     CLAIM**, so this row retires the second write instead of fitting it: the DISAMBIGUATING arm is (1)'s leaf write,
    //     where identity would have reached the leaf alone. `AN-24` carries the fact and the sweep it owes `C-3`.
  }, ROW_MS)
})

// ---- M-2b: the client half and the update -----------------------------------------------------------
/** **U1'S CLIENT HALF, WITNESSED WHERE A REALM IS DRIVEN** (`S-2b`, `S-20`, `S-23`; `D-318` filed the row here because its
 *  third arm is the INVERSE's). The module carries ONE client-only listener at its own address, ONE named action, and ONE
 *  node of its own; the action writes `marker:count` into that node, and the listener increments `count`. So the node
 *  separates "the source crossed and was evaluated" (the action resolves) from "the registration is ONE" (the count is 1
 *  after one write) from "the source was NOT remembered" (an update's marker, with the old one GONE). */
const SHAPE = 'matrix-shape'
const SHAPE_ADDRESS = ['matrix-shape']
const SHAPE_NODE = 'matrix-shape-out'
const shapeEntry = (): string => [
  'function (ctx) {',
  '  ctx.declare({ kind: "listener", address: ["matrix-shape"], client: "note" })',
  '  ctx.tool("ping", function () { return { ok: true } })',
  '}',
].join('\n')
const shapeClient = (marker: string): string => [
  'function (ctx) {',
  `  var marker = ${JSON.stringify(marker)}`,
  '  var count = 0',
  '  ctx.action("publish", function (context) {',
  '    var all = context.tree.allNodes()',
  '    var node = all.find(function (n) { return n && n.props && n.props.id === "matrix-shape-out" })',
  '    if (!node) return',
  '    context.clientAPI.apply(node.id, [{ targetProp: "content", mode: "replace", value: marker + ":" + count }])',
  '  })',
  '  ctx.onDelivery("note", function () { count = count + 1 })',
  '  ctx.graph({ parent: "app-surface", nodes: [{ type: "pre", css: { id: "matrix-shape-out" }, props: { id: "matrix-shape-out" }, content: "new", handlers: [{ name: "publish", event: "click" }] }] })',
  '}',
].join('\n')
const shapeSource = (version: string, marker: string): string => JSON.stringify({
  name: SHAPE,
  version,
  capabilities: { tools: ['ping'], listeners: [{ address: SHAPE_ADDRESS, client: 'note' }] },
  entry: shapeEntry(),
  client: shapeClient(marker),
})

/** **THE NODE'S OWN STATE, READ THROUGH THE APP'S SURFACE** (`get_node_state`, the row's one read — a rendered read may
 *  answer truncated, and `M-2b` reads a node). The serialized answer is searched for the marker because the state's own
 *  shape is the engine's: the CLAIM is that the marker the client half wrote stands on that node. */
async function readShape(): Promise<string> {
  const answer = await call(client(), 'provident.get_node_state', { target: { kind: 'cssId', cssId: SHAPE_NODE } })
  expect(answer.ok, `get_node_state did not answer for ${SHAPE_NODE}: ${answer.text}`).toBe(true)
  return answer.text
}
const dispatchPublish = async (): Promise<void> => {
  const answer = await call(client(), 'provident.dispatch', { target: { kind: 'cssId', cssId: SHAPE_NODE }, event: 'click' })
  if (!answer.ok) {
    const targets = await call(client(), 'provident.list_targets', {})
    const ids = (Array.isArray(targets.value) ? targets.value : [])
      .map((entry) => asObject(entry))
      .map((entry) => [str(entry?.['cssId']), str(entry?.['propsId'])])
      .filter(([css, props]) => String(css ?? '').includes('matrix') || String(props ?? '').includes('matrix'))
    const listed = await call(client(), 'module.list', {})
    throw new Error(`the module's own action did not resolve at provident.dispatch: ${answer.text}; matrix nodes ${JSON.stringify(ids)}; module.list ${listed.text.slice(0, 400)}`)
  }
}

describe('module-channel — U1: the client half crosses, is evaluated, and is REPLACED on update (M-2b)', () => {
  it('M-2b — the source crosses and evaluates; ONE registration counts one; an update leaves the NEW marker and the old GONE; the census carries no source', async () => {
    const installed = await call(client(), 'module.install', { name: SHAPE, version: '1.0.0', source: shapeSource('1.0.0', 'v1') })
    expect(statusOf(installed), `module.install answered ${installed.text}`).toBe('installed')

    // (i) THE CROSSING: the module's NAMED ACTION resolves at `provident.dispatch`, and the node it drives carries the
    //     module's marker — the realm holds and evaluated a source it never asked for.
    await dispatchPublish()
    expect(await readShape(), 'the node carries the FIRST marker after the source crossed').toContain('v1:0')

    // (ii) `onDelivery` IS THE REGISTRATION, AND ONE IS ONE: a COUNT separates one registration from two, where a rewritten
    //      address never would.
    const written = await call(client(), 'provident.data.write', { path: [...SHAPE_ADDRESS], value: { go: 1 }, tier: 'file' })
    expect(written.ok, `the stimulus write did not answer: ${written.text}`).toBe(true)
    await dispatchPublish()
    expect(await readShape(), 'ONE write incremented the counter ONCE, so the listener is registered once').toContain('v1:1')

    // (iii) THE SOURCE WAS NOT REMEMBERED: an update to a DISTINCT version whose client half writes a DIFFERENT marker
    //       leaves the NEW marker standing and the OLD one GONE — neither a cached value nor a retained source could do it.
    const updated = await call(client(), 'module.update', { name: SHAPE, version: '2.0.0', source: shapeSource('2.0.0', 'v2') })
    expect(statusOf(updated), `module.update answered ${updated.text}`).toBe('updated')
    await dispatchPublish()
    const after = await readShape()
    expect(after, 'the NEW source evaluated and its marker stands').toContain('v2:0')
    expect(after, 'and the OLD marker is GONE from the node — the update replaced, it did not stack').not.toContain('v1:')

    // (iv) THE CENSUS CARRIES NOTHING: the module's entry has no source member at all, which is the arm that separates
    //      this crossing from the app-state read (`C-15`'s payload is the frame's, never the listing's).
    const listed = await call(client(), 'module.list', {})
    expect(listed.ok, `module.list did not answer: ${listed.text}`).toBe(true)
    const entries = Array.isArray(listed.value) ? listed.value : (asObject(listed.value)?.['modules'] ?? [])
    const mine = (entries as readonly unknown[]).map((entry) => asObject(entry)).find((entry) => str(entry?.['name']) === SHAPE)
    expect(mine, `module.list carries no entry for ${SHAPE}: ${listed.text}`).toBeDefined()
    expect(Object.keys(mine ?? {}).sort(), 'the census entry names no source member (`C-15`)').not.toContain('source')
  }, ROW_MS)
})
