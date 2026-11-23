// tests/unit/module-system/executor.test.ts — the UNIT battery for `module-system` / `modularity`: `L2` §11's four
// doors one grain below the integration battery, with a DECLARED fifteen-member `StoreSurface` double where that
// battery takes a real `createProfileStore` (§12: the store is a SEAM here and the subject there). UNMARKED and
// GATING (D-40): every row is a real `it()`, none skipped, none softened. RED-FIRST by construction — the executor
// (`src/main/modules/`) and the contract (`src/shared/module-contract.ts`) do not exist yet and the realm half
// still carries the replaced seven-member `ModuleCtx` — so each row names its own absence (§3, D-305). TWO SEAMS,
// NEITHER THE SUBJECT: the store double, and the `sendRegistration`/`log` recorders.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import { CapabilityRouter } from '../../../src/renderer/extensions.js'
/** THE BUILD'S OWN NUMBER, read off its manifest and never re-spelled (D-26, D-41: the site, not a literal). */
const BUILD_VERSION = String((JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'package.json'), 'utf8')) as { version?: unknown }).version ?? '')
/** Two specifiers and never imports, so an absent file reds THIS row rather than the `typecheck:tests` leg. */
const EXECUTOR = '../../../src/main/modules/index.ts'; const CONTRACT = '../../../src/shared/module-contract.ts'
const ABSENT = "the executor and the contract are `U1`'s to land (docs/L1/modularity.md §3 `S-1`..`S-4`), so this row's red is the ABSENCE and not a reading: a gating row whose witness does not exist yet is evidence of nothing (D-40)."

type Json = Record<string, unknown>
interface LogLine { line: string; detail: unknown }
const asObject = (v: unknown): Json | null => (v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Json) : null)
const loose = (v: unknown): Json => asObject(v) ?? {}
const asArray = (v: unknown): readonly unknown[] => (Array.isArray(v) ? v : [])
const str = (v: unknown): string | null => (typeof v === 'string' ? v : null)
const memberOf = (v: unknown, k: string): unknown => asObject(v)?.[k]
const field = (v: unknown, k: string): string => str(memberOf(v, k)) ?? `(no \`${k}\`)`
const activations = (e: Json): readonly unknown[] => asArray(callOn(e, 'activations'))
const namesOf = (e: Json): readonly string[] => activations(e).map((a) => str(memberOf(a, 'name')) ?? '')
const activationNamed = (e: Json, n: string): unknown => activations(e).find((a) => str(memberOf(a, 'name')) === n)
const toolsOf = (a: unknown): readonly string[] => asArray(memberOf(a, 'tools')).map((t) => str(t) ?? '')
const listenersOf = (a: unknown): readonly unknown[] => asArray(memberOf(a, 'listeners'))
/** A row may see the module's line bare or prefixed by the executor's own `module:<name>: `; accept either. */
const detailFor = (logs: readonly LogLine[], line: string): unknown => logs.find((e) => e.line === line || e.line.endsWith(`: ${line}`))?.detail
async function surfaceAt(relative: string, what: string): Promise<Json> {
  try { return loose(await vi.importActual<unknown>(relative)) } catch (error) {
    throw new Error(`PREREQUISITE — ${what} is not loadable at \`${relative}\`: ${error instanceof Error ? error.message : String(error)}. ${ABSENT}`)
  }
}
function callOn(receiver: Json, name: string, ...args: unknown[]): unknown {
  const held = receiver[name]
  if (typeof held !== 'function') throw new Error(`PREREQUISITE — \`${name}\` is not there (§11). ${ABSENT}`)
  return (held as (...passed: unknown[]) => unknown).apply(receiver, args)
}
/** EVERY REFUSAL IS A VALUE (§5): a throw out of a door is this row's own failure, never a reading. */
const answered = (label: string, work: () => unknown): unknown => {
  try { return work() } catch (error) {
    throw new Error(`${label} — a refusal must be a VALUE and never a throw (D-105): ${error instanceof Error ? error.message : String(error)}`)
  }
}
const verdictsOf = (label: string, work: () => unknown): readonly unknown[] => { const a = answered(label, work); const h = asArray(a); return h.length > 0 ? h : [a] }

/** SEAM 1 (§12): fifteen members, of which `listen`, `register`, `removeListener`, `unlisten` and `write` act. The
 *  addon's two clauses are the double's rules: `removeListener` THROWS on every arm that is not a real removal, and
 *  `unlisten` answers a no-op success outside the domain. `refuseWithdrawal` makes the THROWING verb throw for a
 *  handle it DOES hold — MS-5's partial-teardown arm. */
interface StoreDouble { surface: Json; calls: string[]; listeners: string[]; registrations: string[]; refuseWithdrawal: boolean }
function storeDouble(): StoreDouble {
  const held: StoreDouble = { surface: {}, calls: [], listeners: [], registrations: [], refuseWithdrawal: false }
  const took = (verb: string, handle: unknown): string => { const n = String(handle); held.calls.push(`${verb}:${n}`); return n }
  const drop = (list: string[], handle: string): void => { const at = list.indexOf(handle); if (at >= 0) list.splice(at, 1) }
  held.surface = {
    read: () => undefined, readLiteral: () => undefined, readTiered: () => ({}), rollback: () => ({}), delete: () => ({}),
    constraints: () => [], addConstraint: () => 'store-double', constraintOn: () => undefined, constraintOff: () => undefined,
    removeConstraint: () => undefined, write: () => ({ opId: 'store-double' }),
    listen: (h: unknown) => { held.listeners.push(took('listen', h)); return String(h) },
    register: (h: unknown) => { held.registrations.push(took('register', h)) },
    removeListener: (h: unknown) => {
      const n = took('removeListener', h)
      if (held.refuseWithdrawal || !held.registrations.includes(n)) throw new Error(`"${n}" is no real removal`)
      drop(held.registrations, n)
    },
    unlisten: (h: unknown) => { const n = took('unlisten', h); drop(held.listeners, n); drop(held.registrations, n) },
  }
  return held
}
/** §11's one construction: `appVersion` is the REAL accessor off the contract module, COUNTED so a row can see that
 *  `install` asked the host for the number rather than reaching past it (C-11); the two sinks RECORD — SEAM 2. */
interface Harness { executor: Json; store: StoreDouble; received: unknown[]; logs: LogLine[]; appVersion: () => unknown; appVersionCalls: () => number }
async function harness(): Promise<Harness> {
  const surface = await surfaceAt(EXECUTOR, 'the executor `src/main/modules/index.ts`')
  const accessor = (await surfaceAt(CONTRACT, 'the contract `src/shared/module-contract.ts`'))['appVersion']
  if (typeof accessor !== 'function') throw new Error(`PREREQUISITE — the contract exports no \`appVersion\` (§8). ${ABSENT}`)
  const store = storeDouble(); const received: unknown[] = []; const logs: LogLine[] = []; let calls = 0
  const counted = (): unknown => { calls += 1; return (accessor as () => unknown)() }
  const host = { store: store.surface, appVersion: counted, sendRegistration: (f: unknown) => { received.push(f) },
    log: (line: unknown, detail?: unknown) => { logs.push({ line: String(line), detail }) } }
  const executor = asObject(callOn(surface, 'createModuleExecutor', host))
  if (executor === null) throw new Error(`PREREQUISITE — \`createModuleExecutor\` answered no executor object (§11). ${ABSENT}`)
  return { executor, store, received, logs, appVersion: counted, appVersionCalls: () => calls }
}
/** `S-2b` gives `CapabilityRouter` a `ClientHalfDeps`; at this head it declares no deps parameter, so MS-7 reaches the
 *  intended signature through this one documented view, and the file typechecks at BOTH heads. */
const RouterWithDeps = CapabilityRouter as unknown as new (deps?: unknown) => CapabilityRouter

const manifestOf = (name: string, version: string, entry: string, extra: Json = {}): string => JSON.stringify({ name, version, entry, ...extra })
const declares = (...tools: string[]): Json => ({ capabilities: { tools } })
const deliver = (e: Json, label: string, delivery: unknown): readonly unknown[] => verdictsOf(label, () => callOn(e, 'install', delivery))
const fromSource = (n: string, v: string, entry: string, extra: Json = {}): Json => ({ kind: 'source', source: manifestOf(n, v, entry, extra) })
const install = (e: Json, label: string, n: string, v: string, entry: string, extra: Json = {}): unknown => deliver(e, label, fromSource(n, v, entry, extra))[0]
const ANSWER = 'function (ctx) { ctx.tool("answer", function () { return 1 }) }'
const CTX_ENTRY = 'function (ctx) { ctx.log("main-ctx", Object.keys(ctx).sort()); ctx.log("tool-handle", ctx.tool("answer", function () { return 1 })) }'
const SILENT = 'function (ctx) { void ctx }'
const OVERREG = 'function (ctx) { ctx.tool("declared", function () { return 1 }); ctx.tool("undeclared", function () { return 2 }) }'
const LEAKY = 'function (ctx) { var raw = window.provident; ctx.tool("leak", function () { return raw === null }) }'
const SQUATTER = 'function (ctx) { ctx.tool("provident.dispatch", function () { return 1 }) }'
const REENTRANT = 'function (ctx) { ctx.log("store-verdict", ctx.store.write(["ms-probe"], "mem", 1)) }'
const MAIN_HALF = 'function (address) { return { heard: address } }'
const LISTEN_ENTRY = `function (ctx) { ctx.declare({ kind: "listener", address: ["ms-listen"], main: ${MAIN_HALF} }) }`
const LISTENERS: Json = { capabilities: { tools: [], listeners: [{ address: ['ms-listen'], main: MAIN_HALF }] } }
const CLIENT_SOURCE = 'function (ctx) { ctx.onDelivery("note", function (data) { return data }) }'
const withClient = (): string => JSON.stringify({ name: 'ms-client', version: '1.0.0', entry: SILENT, client: CLIENT_SOURCE, capabilities: { tools: [], listeners: [{ address: ['ms-client'], client: 'note' }] } })
const cyclic = (name: string, other: string): Json => ({ name, source: manifestOf(name, '1.0.0', ANSWER, { ...declares('answer'), requires: { modules: [{ name: other, versionRange: '>=1.0.0' }] } }) })

describe('module-system — unit grain: `createModuleExecutor` over a DECLARED store double (§11)', () => {
  it('MS-1 — §2: the loader\'s two deliveries reach ONE shape, and BOTH activate', async () => {
    const { executor } = await harness()
    const source = deliver(executor, 'MS-1 source', fromSource('ms-alpha', '1.0.0', ANSWER, declares('answer')))
    const table = deliver(executor, 'MS-1 table', { kind: 'table', entries: [{ name: 'ms-beta', source: manifestOf('ms-beta', '1.0.0', ANSWER, declares('answer')) }] })
    expect([field(source[0], 'status'), field(table[0], 'status')], `§2 — BOTH deliveries activate: ${JSON.stringify([source[0], table[0]])}`).toEqual(['installed', 'installed'])
    const alpha = activationNamed(executor, 'ms-alpha'); const beta = activationNamed(executor, 'ms-beta')
    expect(namesOf(executor), '§2 — both reach the active set, one verdict per delivered module').toEqual(['ms-alpha', 'ms-beta'])
    expect([toolsOf(alpha), toolsOf(beta)], '§1 — the tool namespace is each module\'s own').toEqual([['module:ms-alpha.answer'], ['module:ms-beta.answer']])
    expect(Object.keys(loose(alpha)).sort(), `§2 — ONE activation shape: ${JSON.stringify(alpha)} vs ${JSON.stringify(beta)}`).toEqual(Object.keys(loose(beta)).sort())
  })

  it('MS-2 — §3/§6/§11: the MAIN ctx is EXACTLY four members, activation RUNS the entry, and the tool NAME is published', async () => {
    const { executor, logs } = await harness(); install(executor, 'MS-2', 'ms-ctx', '1.0.0', CTX_ENTRY, declares('answer'))
    expect(detailFor(logs, 'main-ctx'), '§3 — the main ctx is EXACTLY {store, declare, tool, log}, off the entry\'s own log line').toEqual(['declare', 'log', 'store', 'tool'])
    const handle = str(detailFor(logs, 'tool-handle'))
    expect(handle, '§11 — `tool()` answers the name the composition publishes: `module:<name>.<tool>`').toBe('module:ms-ctx.answer')
    expect(toolsOf(activationNamed(executor, 'ms-ctx')), '§6 — the tool is there because the ENTRY registered it, and that is the name `activations()` carries').toEqual([handle])
  })

  it('MS-3 — §3: the CLIENT ctx is EXACTLY five members, driven through the realm half that exists today', () => {
    const router = new CapabilityRouter() // §12 I-2 constructs it with NO arguments: that stays lawful
    const seen: string[][] = []; let handle: unknown = null; let refusal: unknown = null
    try {
      router.registerModule('ms-probe', (ctx) => {
        seen.push(Object.keys(ctx).sort()); const view = loose(ctx)
        handle = callOn(view, 'onDelivery', 'note', function (data: unknown) { return data })
        callOn(view, 'action', 'ms-act', function () { return null }); callOn(view, 'graph', { parent: 'root', nodes: [] })
        refusal = callOn(loose(memberOf(view, 'store')), 'write', ['ms-probe'], 'mem', 1)
      })
    } catch (error) {
      throw new Error(`MS-3 — the client ctx through \`src/renderer/extensions.ts\`: ${error instanceof Error ? error.message : String(error)}. THIS ROW REDS ON THE TREE and needs no absent file: the realm half still hands its entry the replaced seven-member \`ModuleCtx\`, and it greens the day \`S-2b\` replaces it (§3, D-305).`)
    }
    expect(seen[0], '§3 — the client ctx is EXACTLY {store, onDelivery, action, graph, log}: no member present-but-inert').toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    for (const retired of ['captureView', 'onRender', 'emit', 'transform', 'uploadQueue', 'fetch']) expect(seen[0] ?? [], `§3 — \`${retired}\` retires WHOLE (L1 §7 OWED-1 items 8/9)`).not.toContain(retired)
    const view = loose(router); const action = asArray(callOn(view, 'actions'))[0]
    expect(typeof handle === 'string' && handle.length > 0, `§4 — \`onDelivery\` answers a non-empty DeliveryHandle: ${String(handle)}`).toBe(true)
    expect([str(memberOf(action, 'module')), str(memberOf(action, 'name'))], '§3 — `action` lands ONE record: the module and the action\'s own name').toEqual(['ms-probe', 'ms-act'])
    expect(asArray(callOn(view, 'contributions')).length, '§3 — `graph` contributes one record at the ordered pre-build point').toBe(1)
    expect([field(refusal, 'status'), field(refusal, 'reason')], `§3 — no writer handed in: a store verb answers a VALUE, 'no-store-host' (design §2): ${JSON.stringify(refusal)}`).toEqual(['refused', 'no-store-host'])
  })

  it('MS-4 — §5/§6: four refusals, each a VALUE that NAMES what it refused', async () => {
    const { executor, store } = await harness()
    const leaky = install(executor, 'MS-4', 'ms-leaky', '1.0.0', LEAKY, declares('leak'))
    const loud = install(executor, 'MS-4', 'ms-loud', '1.0.0', SILENT, declares('declared-only'))
    const squatter = install(executor, 'MS-4', 'ms-squatter', '1.0.0', SQUATTER, declares('provident.dispatch'))
    const undeclared = install(executor, 'MS-4', 'ms-overstated', '1.0.0', OVERREG, declares('declared'))
    expect([field(leaky, 'status'), field(leaky, 'reason').includes('window.provident')], `§5 — \`host-api-token\` NAMES the token: ${JSON.stringify(leaky)}`).toEqual(['rejected', true])
    expect([field(loud, 'status'), field(loud, 'reason').includes('declared-only')], `§5 — \`declaration-overstated\` NAMES the declaration: ${JSON.stringify(loud)}`).toEqual(['rejected', true])
    expect([field(squatter, 'status'), field(squatter, 'reason').includes('provident.dispatch')], `§5 — \`foundation-tool\` NAMES the tool: ${JSON.stringify(squatter)}`).toEqual(['rejected', true])
    expect([field(undeclared, 'status'), field(undeclared, 'reason').includes('undeclared')], `§6 — C-12's second direction, at ACTIVATION: ${JSON.stringify(undeclared)}`).toEqual(['rejected', true])
    expect(namesOf(executor), '§5/§6 — none of the four reached the active set').toEqual([])
    expect([...store.listeners, ...store.registrations], '§6 — no `listen` and no `register` survived a refused activation').toEqual([])
  })

  it('MS-5 — §6: `deactivate` runs the entry\'s own inverses, and CONTAINS the store\'s throw as a value', async () => {
    const { executor, store } = await harness()
    expect(field(install(executor, 'MS-5', 'ms-listen', '1.0.0', LISTEN_ENTRY, LISTENERS), 'status'), '§4 — a declared listener with a `main` half activates').toBe('installed')
    const handle = String(str(memberOf(listenersOf(activationNamed(executor, 'ms-listen'))[0], 'handle')))
    // THE SET, NOT THE ORDER: §6 fixes WHICH verbs and that the two halves are ONE entry, never their sequence.
    expect([...store.calls].sort(), '§4 — ONE handle per declaration: `listen` and `register` under THAT handle, in any order').toEqual([`listen:${handle}`, `register:${handle}`].sort())
    const away = answered('MS-5 deactivate', () => callOn(executor, 'deactivate', 'ms-listen'))
    expect(field(away, 'status'), `§6 — the inverse ran: ${JSON.stringify(away)}`).toBe('deactivated')
    expect([...store.listeners, ...store.registrations], '§6 — `removeListener` then `unlisten` withdrew the body AND the watching').toEqual([])
    const before = store.calls.length
    expect(field(answered('MS-5 again', () => callOn(executor, 'deactivate', 'ms-listen')), 'status'), '§6 — nothing to withdraw is a `no-op`, never a throw').toBe('no-op')
    expect(store.calls.length, '§6 — a no-op makes NO store call').toBe(before)
    expect(field(install(executor, 'MS-5', 'ms-partial', '1.0.0', LISTEN_ENTRY, LISTENERS), 'status'), 'the precondition: a fresh activation stands for the partial teardown').toBe('installed')
    const heldHandle = String(str(memberOf(listenersOf(activationNamed(executor, 'ms-partial'))[0], 'handle')))
    store.refuseWithdrawal = true // the store now refuses a withdrawal it should hold
    const teardown = answered('MS-5 partial', () => callOn(executor, 'deactivate', 'ms-partial'))
    expect([field(teardown, 'status'), field(teardown, 'reason').includes(heldHandle)], `§6 — a contained refusal naming the handle: ${JSON.stringify(teardown)}`).toEqual(['rejected', true])
    expect(namesOf(executor), '§6 — and the record STANDS, so the inverse stays retryable (design §4)').toContain('ms-partial')
    expect(store.registrations, '§6 — the pair ABORTED at the failed body-withdrawal, so the registration the retry needs SURVIVES (§7.10)').toEqual([heldHandle])
    store.refuseWithdrawal = false
    expect(field(answered('MS-5 retry', () => callOn(executor, 'deactivate', 'ms-partial')), 'status'), '§6 — the retry completes what the refused teardown left').toBe('deactivated')
  })

  it('MS-6 — §7/§8: the resolver\'s order, its refusals, and the ONE number it judges', async () => {
    const { executor, appVersion, appVersionCalls } = await harness()
    expect(field(install(executor, 'MS-6', 'ms-base', '1.5.0', ANSWER, declares('answer')), 'status'), '§7 — the dependency is installed first').toBe('installed')
    const dependent = install(executor, 'MS-6', 'ms-dep', '1.0.0', ANSWER, { ...declares('answer'), requires: { modules: [{ name: 'ms-base', versionRange: '>1.1.0' }], app: `>=${BUILD_VERSION}` } })
    expect(field(dependent, 'status'), `§7/§8 — a satisfied range and a satisfied floor admit the dependent: ${JSON.stringify(dependent)}`).toBe('installed')
    // THE NUMBER IS THE HOST'S: `install` must ASK for it, so the counted accessor is consulted (design §4, C-11).
    expect(appVersionCalls(), '§8 — `install` read the number off `host.appVersion`, never off a literal of its own').toBeGreaterThan(0)
    const order = namesOf(executor)
    expect(order.indexOf('ms-base'), `§7 — "the standing one first, then the new addition" is the resolver's ANSWER: ${JSON.stringify(order)}`).toBeLessThan(order.indexOf('ms-dep'))
    const unsatisfied = install(executor, 'MS-6', 'ms-strict', '1.0.0', ANSWER, { ...declares('answer'), requires: { modules: [{ name: 'ms-base', versionRange: '>9.0.0' }] } })
    expect([field(unsatisfied, 'status'), field(unsatisfied, 'reason').includes('>9.0.0')], `§7 — \`dependency-unsatisfied\`, NAMING the range: ${JSON.stringify(unsatisfied)}`).toEqual(['rejected', true])
    const cycle = deliver(executor, 'MS-6', { kind: 'table', entries: [cyclic('ms-cycle-a', 'ms-cycle-b'), cyclic('ms-cycle-b', 'ms-cycle-a')] })
    expect(cycle.length, '§2/§7 — one table delivery answers one verdict per entry').toBe(2)
    for (const verdict of cycle) expect([field(verdict, 'status'), /cycle/i.test(field(verdict, 'reason'))], `§7 — a cycle is refused by name, never silently activated: ${JSON.stringify(verdict)}`).toEqual(['rejected', true])
    expect(namesOf(executor), '§7 — neither member of the cycle is left active').toEqual(['ms-base', 'ms-dep'])
    expect(appVersion(), '§8 — the ONE accessor answers the number this row read off `package.json`\'s own `version`').toBe(BUILD_VERSION)
    expect(field(install(executor, 'MS-6', 'ms-floor', '1.0.0', ANSWER, { ...declares('answer'), requires: { app: `>=${BUILD_VERSION}` } }), 'status'), '§8 — a floor AT the build\'s number is satisfied').toBe('installed')
    const above = install(executor, 'MS-6', 'ms-above', '1.0.0', ANSWER, { ...declares('answer'), requires: { app: `>${BUILD_VERSION}` } })
    expect([field(above, 'status'), field(above, 'reason').includes(`>${BUILD_VERSION}`)], `§7 — \`application-version-unsatisfied\`, NAMING the range: ${JSON.stringify(above)}`).toEqual(['rejected', true])
  })

  it('MS-7 — §3/§10: the two ctx halves are DISJOINT, and the ONE shared member behaves by half', async () => {
    const { executor, logs, store } = await harness(); install(executor, 'MS-7', 'ms-probe', '1.0.0', CTX_ENTRY, declares('answer'))
    const mainKeys = asArray(detailFor(logs, 'main-ctx')).map((key) => str(key) ?? '')
    for (const clientSide of ['onDelivery', 'action', 'graph']) expect(mainKeys, `§3 — \`${clientSide}\` is an act on the realm and never a MAIN ctx member`).not.toContain(clientSide)
    const router = new CapabilityRouter(); const clientKeys: string[] = []
    router.registerModule('ms-probe', (ctx) => { clientKeys.push(...Object.keys(ctx)) })
    for (const mainSide of ['declare', 'tool']) expect(clientKeys, `§3 — \`${mainSide}\` is main's alone and never a CLIENT ctx member`).not.toContain(mainSide)
    install(executor, 'MS-7', 'ms-reentrant', '1.0.0', REENTRANT, declares())
    const refusal = detailFor(logs, 'store-verdict')
    expect([field(refusal, 'status'), field(refusal, 'reason')], `§10 — a main half's store verb is refused BY NAME, as a value: ${JSON.stringify(refusal)}`).toEqual(['refused', 'reentrant-call'])
    let handed: unknown = null
    const wired = new RouterWithDeps({ store: store.surface }); wired.registerModule('ms-wired', (ctx) => { handed = memberOf(ctx, 'store') })
    expect(handed, '§10 — the client half is the opposite arm: the router hands the GIVEN writer back by IDENTITY, never as a copy').toBe(store.surface)
  })

  it('MS-8 — §9/§4: the frame by value, the re-send that needs no new member, and the REGISTERED passthrough', async () => {
    const { executor, store, received } = await harness()
    const first = deliver(executor, 'MS-8', { kind: 'source', source: withClient() })
    expect(field(first[0], 'status'), `§9 — a module naming a \`client\` half activates: ${JSON.stringify(first[0])}`).toBe('installed')
    const frame = loose(received[0])
    expect([received.length, Object.keys(frame).sort(), frame['module'], frame['client'], typeof frame['client']], `§9 — ONE frame \`{module, client}\`, its payload the manifest's own STRING (C-15): ${JSON.stringify(frame)}`).toEqual([1, ['client', 'module'], 'ms-client', CLIENT_SOURCE, 'string'])
    // THE PASSTHROUGH ARM IS NOT AN ABSENCE (D-307, §4): a declaration with no `main` half is still ONE registered
    // store entry under its own handle, and the channel carries the triggering address to its client half.
    const binding = listenersOf(activationNamed(executor, 'ms-client'))[0]; const bindingHandle = String(str(memberOf(binding, 'handle')))
    expect([bindingHandle !== 'null' && bindingHandle !== '', memberOf(binding, 'main') === undefined], '§4 — a main-less declaration is lawful AND registered, with no `main` on its binding').toEqual([true, true])
    expect([...store.calls].sort(), '§4 — and the store holds it under that ONE handle').toEqual([`listen:${bindingHandle}`, `register:${bindingHandle}`].sort())
    install(executor, 'MS-8', 'ms-silent', '1.0.0', SILENT, declares())
    expect(received.length, '§9 — a module with NO `client` member sends NO frame').toBe(1)
    const again = deliver(executor, 'MS-8', { kind: 'source', source: withClient() })
    expect([field(again[0], 'status'), received.length], '§9 — the same name at the same version is a `no-op` that RE-SENDS the frame: the boot read adds no member').toEqual(['no-op', 2])
    expect(loose(received[1]), '§9 — the re-send is the same frame, by value').toEqual(frame)
  })
})
