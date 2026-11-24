// tests/integration/module-system/executor.test.ts — THE L2 BATTERY for `module-system`: `U1`'s executor,
// driven at the integration grain through the surface `docs/L2/module-system/interface.md` §11 declares.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40).
//
// WHAT IT DRIVES, AND THE ONE THING IT DOES NOT DRIVE. One node process, one real `createProfileStore`
// instance (`src/main/storeroom.js` — the module surface `C-16` types the ctx's `store` member by, never a
// mock of it), the real `appVersion()` accessor out of `src/shared/module-contract.ts` (§8), a `log` sink
// that records, and a `sendRegistration` that records — the last being the seam to `module-channel`, which
// is `U3`'s and is never the subject here (§9, `D-308`). The executor is imported through `vi.importActual`,
// the ACTUAL module and never a mock: the specifier is not typechecked at this grain because
// `src/main/modules/` does not exist yet, and a static import of an absent file would red the
// `typecheck:tests` leg instead of reding the row (brief §6, `D-27`).
//
// **RED-FIRST, AND THE GRAIN IS STATED PLAINLY RATHER THAN SOFTENED** (`docs/L2/module-system/interface.md`
// §12, `D-40`, `D-30`): `src/main/modules/` and `src/shared/module-contract.ts` are both NEW at
// `docs/L1/modularity.md` §2, so every row below reds at this head for ONE absence — the executor — and no
// row's red is yet evidence about the behaviour it names. **A gating row that cannot green is evidence of
// nothing**, and this file does not pretend otherwise: each row names the behaviour it will measure and
// reds with a PREREQUISITE sentence that says the surface is absent. The day §11 lands, each row reds or
// greens on ITS OWN subject. **NO ROW IS SKIPPED, MARKED OR SOFTENED**, and no row asserts a figure another
// document owns (`D-43`).
//
// ONE ROW IS NOT A PREREQUISITE RED AND SAYS SO IN ITS OWN BODY (`I-2`): the CLIENT half's ctx is driven
// through `src/renderer/extensions.ts`'s router, which is the realm half's home AT THIS HEAD — so that row
// reds on the TREE (the replaced `ModuleCtx` carries SEVEN members, six of them retiring and FOUR of them
// stubs or unwired — `D-305`'s own figure — and none of the five §3 declares) and would green today if the
// replacement had landed, which is exactly the difference between a row that measures something and a row
// that measures an absence.
//
// WHAT THIS FILE REFUSES TO MEASURE, EACH WITH ITS OWNER: the batch, the per-listener entry, the fan-out
// and per-module containment are `module-channel`'s (`M-11`, `M-13`, `D-307`); the batch's WRITE TURN is the
// channel's, so a client half's `store` act is measured there and never here (`D-311`); the fourth admission
// refusal — a declaration claiming another author's address — needs `U2`'s registry and `U5`'s declared pane
// set (§5, `D-305`); the bundled table's first real in-tree module is `U7`'s (§2, `L1` §7 `OWED-3`); the graph
// phase's containment is `U4`'s (§6); host parity is `M-29`'s (`L1` §4 `C-13`); and the tool composition that
// publishes `module:<name>.<tool>` is `mcp-surface`'s (`tests/integration/mcp-surface/`, `L1` §3 `S-5`).
//
// **THE REENTRANT ARM'S PRECONDITION IS NAMED** (`I-8`): the refusal is driven at ACTIVATION, because that
// is the one instant a main half's own store call is reachable without `U3`'s binding; `D-311`'s ruling is
// categorical — a main half's store verb is refused because it is not an e2e request — and the containment
// of that refusal inside a REAL firing is the channel's row, not this one.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterAll, describe, expect, it, vi } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom.js'
import { CapabilityRouter } from '../../../src/renderer/extensions.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
/** **THE BUILD'S OWN VERSION, READ OFF ITS MANIFEST AND NEVER RE-SPELLED** (D-41: the site, not a literal).
 *  `I-6` holds §8's accessor to THIS reading and then judges `requires.app` against THIS reading, so a
 *  second literal or a second authority between the manifest and the resolver reds there (`D-26`, `D-44`). */
const BUILD_VERSION = String((JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { version?: unknown }).version ?? '')

/** **THE TWO PATHS THIS FILE NAMES, AND BOTH ARE `docs/L1/modularity.md` §2'S NEW PATHS** — the executor
 *  and the contract. They are specifiers and never imports, for the reason the header states. */
const EXECUTOR_SURFACE = '../../../src/main/modules/index.ts'
const CONTRACT_SURFACE = '../../../src/shared/module-contract.ts'

/** **THE ABSENCE SENTENCE, SAID ONCE**: every prerequisite red at this head is this one, and it names what
 *  lands it, so a reader never mistakes it for a defect in the battery. */
const ABSENT =
  'The executor is `U1`\'s to land (`docs/L1/modularity.md` §2, §3 `S-1`..`S-4`), and until it does this row\'s red ' +
  'is the ABSENCE and not a reading (docs/L2/module-system/interface.md §12, D-40). A gating row that cannot green ' +
  'is evidence of nothing, which is why the row says so in its own failure message rather than looking like a defect.'

// ---- reading the surface without trusting it -------------------------------
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const asArray = (value: unknown): readonly unknown[] => (Array.isArray(value) ? value : [])
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const memberOf = (value: unknown, key: string): unknown => {
  const held = asObject(value)
  return held === null ? undefined : held[key]
}
/** Load a module's REAL namespace, relative to this file, and red with the absence sentence when it is not
 *  there. `vi.importActual` is the actual module — never a mock — and its argument is a `string`, so the
 *  specifier is not resolved by `tsc`: an absent file reds THIS row rather than the typecheck leg. */
async function surfaceAt(relative: string, what: string): Promise<Json> {
  let held: unknown
  try {
    held = await vi.importActual<unknown>(relative)
  } catch (error) {
    throw new Error(`PREREQUISITE — ${what} is not loadable at \`${relative}\`: ${error instanceof Error ? error.message : String(error)}. ${ABSENT}`)
  }
  const surface = asObject(held)
  if (surface === null) throw new Error(`PREREQUISITE — \`${relative}\` answered ${typeof held}, not a module namespace. ${ABSENT}`)
  return surface
}
/** Call a member WITH ITS OWN RECEIVER: an executor's members are read off its object and must not be
 *  detached from it, so `apply` and never a bare call. */
function callOn(receiver: Json, name: string, ...args: unknown[]): unknown {
  const held = receiver[name]
  if (typeof held !== 'function') {
    throw new Error(`PREREQUISITE — the surface does not export \`${name}\` (docs/L2/module-system/interface.md §11). ${ABSENT}`)
  }
  return (held as (...passed: unknown[]) => unknown).apply(receiver, args)
}
/** **EVERY REFUSAL IS A VALUE** (`D-105`, §5): a throw out of a door is a refusal the caller cannot read, so
 *  a thrown one is reported as this battery's own failure and not as a reading. */
const answered = (label: string, work: () => unknown): unknown => {
  try {
    return work()
  } catch (error) {
    throw new Error(`${label} — a refusal must be a VALUE and never a throw (D-105, docs/L2/module-system/interface.md §5): ${error instanceof Error ? error.message : String(error)}`)
  }
}
const verdictsOf = (label: string, work: () => unknown): readonly unknown[] => {
  const answer = answered(label, work)
  const held = asArray(answer)
  return held.length > 0 ? held : [answer]
}
const statusOf = (verdict: unknown): string => str(memberOf(verdict, 'status')) ?? '(no `status` member)'
const reasonOf = (verdict: unknown): string => str(memberOf(verdict, 'reason')) ?? '(no `reason` member)'
const activationsOf = (executor: Json): readonly unknown[] => asArray(callOn(executor, 'activations'))
const activationNamed = (executor: Json, name: string): unknown =>
  activationsOf(executor).find((entry) => str(memberOf(entry, 'name')) === name)
const toolNamesOf = (activation: unknown): readonly string[] =>
  asArray(memberOf(activation, 'tools')).map((tool) => str(tool) ?? '')
const namesOf = (executor: Json): readonly string[] =>
  activationsOf(executor).map((entry) => str(memberOf(entry, 'name')) ?? '')
interface LogLine { line: string; detail: unknown }
/** The activation logs through the host as `module:<name>: <line>` (`docs/L3/module-system/design.md`
 *  §4's one site), so a row reads its own line by the SUFFIX it named and not by a bare spelling the
 *  design never writes. The claim is the DETAIL (the ctx's key set), which is what the row asserts. */
const detailFor = (logs: readonly LogLine[], line: string): unknown =>
  logs.find((entry) => entry.line === line || entry.line.endsWith(`: ${line}`))?.detail

// ---- the harness -----------------------------------------------------------
interface Harness {
  executor: Json
  received: unknown[]
  logs: LogLine[]
  store: ReturnType<typeof createProfileStore>
  appVersion: string
}
const scratch: string[] = []
afterAll(() => {
  for (const dir of scratch.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort on a teardown path */
    }
  }
})

/** §11's one construction: the host is `{store, appVersion, sendRegistration, log}`, the store is REAL, and
 *  the two sinks RECORD — which is what makes §9's seam measurable without a channel. */
async function harness(): Promise<Harness> {
  const surface = await surfaceAt(EXECUTOR_SURFACE, 'the executor `src/main/modules/`')
  const contract = await surfaceAt(CONTRACT_SURFACE, 'the contract `src/shared/module-contract.ts`')
  const accessor = contract['appVersion']
  if (typeof accessor !== 'function') {
    throw new Error(`PREREQUISITE — \`src/shared/module-contract.ts\` does not export \`appVersion\` (docs/L2/module-system/interface.md §8). ${ABSENT}`)
  }
  const appVersion = (accessor as () => unknown)()
  expect(typeof appVersion, '§8 — the one authority answers a version STRING').toBe('string')
  const dir = mkdtempSync(join(tmpdir(), 'module-system-battery-'))
  scratch.push(dir)
  const store = createProfileStore({ filePath: join(dir, 'provident-profile.json') })
  const received: unknown[] = []
  const logs: LogLine[] = []
  const executor = asObject(callOn(surface, 'createModuleExecutor', {
    store,
    appVersion: accessor,
    sendRegistration: (frame: unknown) => { received.push(frame) },
    log: (line: unknown, detail: unknown) => { logs.push({ line: String(line), detail }) },
  }))
  if (executor === null) throw new Error(`PREREQUISITE — \`createModuleExecutor\` did not answer an executor object. ${ABSENT}`)
  return { executor, received, logs, store, appVersion: String(appVersion) }
}

// ---- the manifests this battery installs -----------------------------------
const manifestOf = (name: string, version: string, entry: string, extra: Json = {}): string =>
  JSON.stringify({ name, version, entry, ...extra })
/** The declaration a manifest carries, in `ModuleCapabilities`' own spelling (`src/shared/types.ts`). */
const declares = (...tools: string[]): Json => ({ capabilities: { tools } })

/** **THE ENTRY SOURCES ARE THE MODULES' OWN CODE AND NOTHING REWRITES THEM** (§1: `entry` is a
 *  function-STRING compiled at activation). Each registers exactly what its manifest declares, so no row's
 *  fault is a declaration/registration mismatch it did not mean (`C-12`). */
const ALPHA_ENTRY = 'function (ctx) { ctx.tool("answer", function () { return { from: "delivery-alpha", value: 42 } }) }'
const BETA_ENTRY = 'function (ctx) { ctx.tool("answer", function () { return { from: "delivery-beta", value: "two" } }) }'
const CTX_ENTRY = 'function (ctx) { ctx.log("main-ctx", Object.keys(ctx).sort()); ctx.tool("answer", function () { return { from: "ctx-probe" } }) }'
const DECLARED_ONLY = 'function (ctx) { void ctx }'
const OVERREGISTERING = 'function (ctx) { ctx.tool("declared", function () { return 1 }); ctx.tool("undeclared", function () { return 2 }) }'
const LEAKY = 'function (ctx) { var raw = window.provident; ctx.tool("leak", function () { return raw === null }) }'
const SQUATTER = 'function (ctx) { ctx.tool("provident.dispatch", function () { return 1 }) }'
const BASE_ENTRY = 'function (ctx) { ctx.tool("ping", function () { return { from: "matrix-base" } }) }'
const DEPENDENT_ENTRY = 'function (ctx) { ctx.tool("tick", function () { return { from: "matrix-dep" } }) }'
const CLIENT_ENTRY = 'function (ctx) { ctx.onDelivery("note", function (data) { return data }) }'
const REENTRANT = 'function (ctx) { ctx.log("store-verdict", ctx.store.write(["probe"], "mem", 1)) }'

describe('module-system — U1: the contract, the two halves, admission, the resolver and the crossing (docs/L2/module-system/interface.md §1-§11)', () => {
  it('I-1 — S-1: an installed source string and a bundled table reach ONE loader and BOTH activate (§2)', async () => {
    const { executor } = await harness()
    const fromSource = verdictsOf('I-1 source delivery', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('delivery-alpha', '1.0.0', ALPHA_ENTRY, declares('answer')) }))
    expect(statusOf(fromSource[0]), `§2 — the installed-source delivery did not activate: ${JSON.stringify(fromSource[0])}`).toBe('installed')
    const fromTable = verdictsOf('I-1 table delivery', () => callOn(executor, 'install', {
      kind: 'table',
      entries: [{ name: 'delivery-beta', source: manifestOf('delivery-beta', '1.0.0', BETA_ENTRY, declares('answer')) }],
    }))
    expect(statusOf(fromTable[0]), `§2 — the bundled-table delivery did not activate: ${JSON.stringify(fromTable[0])}`).toBe('installed')
    const alpha = activationNamed(executor, 'delivery-alpha')
    const beta = activationNamed(executor, 'delivery-beta')
    expect(str(memberOf(alpha, 'version')), '§2 — the delivered manifest IS the activation\'s record').toBe('1.0.0')
    expect(toolNamesOf(alpha), '§1 — the tool namespace is the module\'s: one member, its own spelling').toEqual(['module:delivery-alpha.answer'])
    expect(toolNamesOf(beta), '§1 — and the same for the table\'s module').toEqual(['module:delivery-beta.answer'])
    // THE SHAPE IS ONE SHAPE: only the module's own name differs between the two activations.
    expect(Object.keys(asObject(alpha) ?? {}).sort(), `§2 — the two deliveries answer ONE activation shape: ${JSON.stringify(alpha)} vs ${JSON.stringify(beta)}`)
      .toEqual(Object.keys(asObject(beta) ?? {}).sort())
  })

  it('I-2 — S-1/S-2b: the CLIENT half\'s ctx is exactly five members, driven through the realm half\'s own router (§3)', () => {
    // THIS ARM NEEDS NO ABSENT FILE: `src/renderer/extensions.ts` IS the realm half's home at this head, and
    // it is the surface `S-2b` REPLACES rather than extends. So it reds on the TREE, not on a prerequisite.
    const router = new CapabilityRouter()
    const seen: string[][] = []
    router.registerModule('ctx-probe', (ctx) => { seen.push(Object.keys(ctx).sort()) })
    expect(seen.length, 'the router hands its entry one ctx, once').toBe(1)
    expect(seen[0], '§3 — the client ctx is EXACTLY {store, onDelivery, action, graph, log} and carries no inert member')
      .toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    for (const retired of ['captureView', 'onRender', 'emit', 'transform', 'uploadQueue', 'fetch']) {
      expect(seen[0], `§3 — the replaced \`ModuleCtx\`'s \`${retired}\` retires rather than being re-pointed (L1 §7 OWED-1 items 8/9)`).not.toContain(retired)
    }
  })

  it('I-3 — S-1/S-2: the MAIN half\'s ctx is exactly four members, and activation RUNS the entry it compiled (§3, §6)', async () => {
    const { executor, logs } = await harness()
    verdictsOf('I-3 install', () => callOn(executor, 'install', { kind: 'source', source: manifestOf('ctx-probe', '1.0.0', CTX_ENTRY, declares('answer')) }))
    expect(detailFor(logs, 'main-ctx'), '§3 — the MAIN ctx is EXACTLY {store, declare, tool, log}, read off the entry\'s own log line')
      .toEqual(['declare', 'log', 'store', 'tool'])
    expect(toolNamesOf(activationNamed(executor, 'ctx-probe')), '§6 — the tool exists because the ENTRY registered it, not because the manifest declared it')
      .toEqual(['module:ctx-probe.answer'])
  })

  it('I-4 — S-2: deactivation runs the inverse, and an UNDECLARED registration is refused BY NAME at activation (§6)', async () => {
    const { executor } = await harness()
    const loud = verdictsOf('I-4 undeclared activation', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-overstated', '1.0.0', OVERREGISTERING, declares('declared')) }))
    expect(statusOf(loud[0]), '§6 — C-12\'s second direction: a registration the manifest never declared is refused at ACTIVATION').toBe('rejected')
    expect(reasonOf(loud[0]), `§6 — the refusal must name the undeclared registration: ${JSON.stringify(loud[0])}`).toContain('undeclared')
    expect(namesOf(executor), '§5 — a refused activation leaves no module active').not.toContain('matrix-overstated')

    const landed = verdictsOf('I-4 install', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-gone', '1.0.0', ALPHA_ENTRY, declares('answer')) }))
    expect(statusOf(landed[0]), 'the precondition: an activation STOOD, so the inverse has something to withdraw').toBe('installed')
    expect(toolNamesOf(activationNamed(executor, 'matrix-gone')), 'the registration is there before the inverse runs').toEqual(['module:matrix-gone.answer'])
    const away = answered('I-4 deactivate', () => callOn(executor, 'deactivate', 'matrix-gone'))
    expect(str(memberOf(away, 'status')), `§6 — deactivation answers a value: ${JSON.stringify(away)}`).toBe('deactivated')
    expect(namesOf(executor), '§6 — the inverse ran: the activation is gone').not.toContain('matrix-gone')
    const twice = answered('I-4 second deactivate', () => callOn(executor, 'deactivate', 'matrix-gone'))
    expect(str(memberOf(twice, 'status')), `§6 — a second deactivation CONTAINS the store's throw as a value (D-105): ${JSON.stringify(twice)}`).toBe('no-op')
  })

  it('I-5 — S-3: the three admission refusals are VALUES that NAME what they refused (§5)', async () => {
    const { executor } = await harness()
    const leaky = verdictsOf('I-5 host-api-token', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-leaky', '1.0.0', LEAKY, declares('leak')) }))
    expect(statusOf(leaky[0]), `§5 — a source naming the preload bridge is refused, never admitted: ${JSON.stringify(leaky[0])}`).toBe('rejected')
    expect(reasonOf(leaky[0]), '§5 — `host-api-token` NAMES the token it refused').toContain('window.provident')

    const loud = verdictsOf('I-5 declaration-overstated', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-loud', '1.0.0', DECLARED_ONLY, declares('declared-only')) }))
    expect(statusOf(loud[0]), `§5 — a declaration that overstates its registration is refused at install (C-12's first direction): ${JSON.stringify(loud[0])}`).toBe('rejected')
    expect(reasonOf(loud[0]), '§5 — `declaration-overstated` NAMES the declaration it could not find').toContain('declared-only')

    const squatter = verdictsOf('I-5 foundation-tool', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-squatter', '1.0.0', SQUATTER, declares('provident.dispatch')) }))
    expect(statusOf(squatter[0]), `§5 — a foundation tool name is not a module's to take: ${JSON.stringify(squatter[0])}`).toBe('rejected')
    expect(reasonOf(squatter[0]), '§5 — `foundation-tool` NAMES the tool it refused').toContain('provident.dispatch')

    expect(namesOf(executor), '§5 — none of the three reached the active set').not.toContain('matrix-leaky')
    expect(namesOf(executor), '§5 — none of the three reached the active set').not.toContain('matrix-loud')
    expect(namesOf(executor), '§5 — none of the three reached the active set').not.toContain('matrix-squatter')
  })

  it('I-6 — S-4/C-11: the resolver\'s order, its cycle, its unsatisfied range, and the ONE number it judges (§7, §8)', async () => {
    const { executor, appVersion } = await harness()
    // ① THE ORDER IS THE RESOLVER'S ANSWER: the dependency is activated BEFORE its dependent.
    verdictsOf('I-6 base install', () =>
      callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-base', '1.5.0', BASE_ENTRY, declares('ping')) }))
    const dependent = verdictsOf('I-6 dependent install', () => callOn(executor, 'install', {
      kind: 'source',
      source: manifestOf('matrix-dep', '1.0.0', DEPENDENT_ENTRY, { ...declares('tick'), requires: { modules: [{ name: 'matrix-base', versionRange: '>1.1.0' }] } }),
    }))
    expect(statusOf(dependent[0]), `§7 — a satisfied range admits its dependent: ${JSON.stringify(dependent[0])}`).toBe('installed')
    const order = namesOf(executor)
    expect(order.indexOf('matrix-base'), `§7 — "matrix-base first, then the new addition" is the resolver's answer, not a convention: ${JSON.stringify(order)}`)
      .toBeLessThan(order.indexOf('matrix-dep'))

    // ② AN UNSATISFIED RANGE IS REFUSED BY NAME — the request's own example (D-304).
    const unsatisfied = verdictsOf('I-6 unsatisfied range', () => callOn(executor, 'install', {
      kind: 'source',
      source: manifestOf('matrix-strict', '1.0.0', DEPENDENT_ENTRY, { ...declares('tick'), requires: { modules: [{ name: 'matrix-base', versionRange: '>9.0.0' }] } }),
    }))
    expect(statusOf(unsatisfied[0]), `§7 — \`dependency-unsatisfied\`: ${JSON.stringify(unsatisfied[0])}`).toBe('rejected')
    expect(reasonOf(unsatisfied[0]), '§7 — the refusal NAMES the range that failed').toContain('>9.0.0')

    // ③ A CYCLE IS REFUSED BY NAME — AND IT IS DRIVEN THROUGH THE TABLE DELIVERY, because a cycle cannot be
    // built by sequential installs (the first member's range is unsatisfied while its partner is absent).
    const cyclic = verdictsOf('I-6 cycle', () => callOn(executor, 'install', {
      kind: 'table',
      entries: [
        { name: 'cycle-a', source: manifestOf('cycle-a', '1.0.0', BASE_ENTRY, { ...declares('ping'), requires: { modules: [{ name: 'cycle-b', versionRange: '>=1.0.0' }] } }) },
        { name: 'cycle-b', source: manifestOf('cycle-b', '1.0.0', DEPENDENT_ENTRY, { ...declares('tick'), requires: { modules: [{ name: 'cycle-a', versionRange: '>=1.0.0' }] } }) },
      ],
    }))
    expect(cyclic.length, '§2/§7 — a table delivery answers one verdict per entry').toBe(2)
    for (const verdict of cyclic) {
      expect(statusOf(verdict), `§7 — a cycle is \`dependency-cycle\`, never a silent activation: ${JSON.stringify(verdict)}`).toBe('rejected')
      expect(reasonOf(verdict), '§7 — and the refusal NAMES the cycle it could not order').toMatch(/cycle/i)
    }
    expect(namesOf(executor), '§7 — neither member of the cycle is left active').not.toContain('cycle-a')
    expect(namesOf(executor), '§7 — neither member of the cycle is left active').not.toContain('cycle-b')

    // ④ THE APPLICATION FLOOR IS §8'S ONE NUMBER AND THAT NUMBER IS THE BUILD'S: the accessor is held to
    // `package.json`'s own `version` first, and then the floor is read ONE STEP WIDE — `>=BUILD_VERSION`
    // satisfied and `>BUILD_VERSION` refused — so ANY second authority, one patch above the build's number or
    // anywhere above it, reds here. A wider pair would leave the interval unjudged (`C-11`, `D-44`).
    expect(appVersion, '§8 — the ONE accessor answers the number the BUILD carries, read here off `package.json`\'s own `version` member').toBe(BUILD_VERSION)
    const atFloor = verdictsOf('I-6 app floor', () => callOn(executor, 'install', {
      kind: 'source',
      source: manifestOf('matrix-at-floor', '1.0.0', DEPENDENT_ENTRY, { ...declares('tick'), requires: { app: `>=${BUILD_VERSION}` } }),
    }))
    expect(statusOf(atFloor[0]), `§8 — a floor at the BUILD's number must be satisfied: ${JSON.stringify(atFloor[0])}`).toBe('installed')
    const aboveFloor = verdictsOf('I-6 app ceiling', () => callOn(executor, 'install', {
      kind: 'source',
      source: manifestOf('matrix-above-floor', '1.0.0', DEPENDENT_ENTRY, { ...declares('tick'), requires: { app: `>${BUILD_VERSION}` } }),
    }))
    expect(statusOf(aboveFloor[0]), `§7 — \`application-version-unsatisfied\`: ${JSON.stringify(aboveFloor[0])}`).toBe('rejected')
    expect(reasonOf(aboveFloor[0]), '§7 — the application refusal NAMES the range it could not satisfy').toContain(`>${BUILD_VERSION}`)
  })

  it('I-7 — S-2b/C-15: the client source crosses as a `{module, client}` STRING frame, by value (§9)', async () => {
    const { executor, received } = await harness()
    // THE MANIFEST'S `client` MEMBER IS THE PAYLOAD: a module's ONE client source, a function-STRING, with the
    // listener declaring only the KEY ('note') its client half registers under — the code crosses once
    // (`§1`, `§4`, `C-15`).
    const client = CLIENT_ENTRY
    const verdicts = verdictsOf('I-7 install', () => callOn(executor, 'install', {
      kind: 'source',
      source: JSON.stringify({
        name: 'matrix-client',
        version: '1.0.0',
        entry: DECLARED_ONLY,
        client,
        capabilities: { tools: [], listeners: [{ address: ['matrix-client'], client: 'note' }] },
      }),
    }))
    expect(statusOf(verdicts[0]), `§9 — a client-only module activates: ${JSON.stringify(verdicts[0])}`).toMatch(/^(installed|updated)$/)
    const frames = received.map(asObject).filter((frame): frame is Json => frame !== null)
    expect(frames.length, '§9 — activation hands the channel ONE registration frame per module that names a `client`').toBe(1)
    expect(Object.keys(frames[0] ?? {}).sort(), '§9 — the frame is `{module, client}` and exists in no other form (C-15): a registration answers nothing, so no arm is added').toEqual(['client', 'module'])
    expect(frames[0]?.['module'], '§9 — the frame names the module').toBe('matrix-client')
    expect(frames[0]?.['client'], '§9 — the payload IS the manifest\'s `client` member, the same string, because a STRING is what the registry row already holds (D-308)').toBe(client)
    expect(typeof frames[0]?.['client'], '§9 — DATA and never a function: a function is the one thing the envelope refuses (C-2, C-15)').toBe('string')
  })

  it('I-8 — C-2: a MAIN half\'s store verb is `reentrant-call`, as a value, and the store beside it is unmoved (§10)', async () => {
    const { executor, logs, store } = await harness()
    verdictsOf('I-8 install', () => callOn(executor, 'install', { kind: 'source', source: manifestOf('matrix-reentrant', '1.0.0', REENTRANT, declares()) }))
    const refused = detailFor(logs, 'store-verdict')
    expect(str(memberOf(refused, 'status')), `§10 — the main half's ctx carries \`store\`, and its every verb refuses BY NAME: ${JSON.stringify(refused)}`).toBe('refused')
    expect(str(memberOf(refused, 'reason')), '§10 — the refusal\'s name is `reentrant-call`, and it is a value that crossed a log line like any other answer').toBe('reentrant-call')
    // THE POSITIVE CONTROL: the SAME store, written by the row's own hand, is unmoved — so the refusal is the
    // CTX's and never the store's, which is what makes it a contract and not a broken seam.
    expect(store.write(['probe'], 'mem', 1), '§10 — the store itself answers the same write: the refusal stands in THIS module\'s ctx (L1 §3 S-11)').toBeTruthy()
  })
})
