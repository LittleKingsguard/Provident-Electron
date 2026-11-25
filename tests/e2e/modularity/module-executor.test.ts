// tests/e2e/modularity/module-executor.test.ts — THE L1 BATTERY for `modularity`'s `U1`: the five rows
// `docs/L1/modularity.md` §3 files at this head (`M-1`..`M-5`, proving `S-1`..`S-5`), one row each.
//
// WHAT THIS BATTERY EXISTS FOR. The module system today registers NAMES and executes nothing: `syncModuleRouter`
// hands each DECLARED capability an echoing handler and says in its own words that `entry` is never evaluated
// (`src/main/mcp-server.ts:317-347`), `ModuleDependency.versionRange` is "declared, no resolver this pass"
// (`src/shared/types.ts:213-230`), and the application version is the hard-coded `'0.1.0'` literal
// (`src/main/mcp-server.ts:864`) — the intake's A1/A2/A5 and findings 6/7/8/12. **SO EVERY ROW BELOW IS RED AT
// THIS HEAD UNTIL `S-1`..`S-5` LAND, AND EACH RED IS THE ABSENCE IT NAMES**: an installed module's entry is never
// evaluated, so its tool answers nothing at all; nothing withdraws a superseded registration; nothing admits or
// refuses a source; nothing resolves a range; and `tools/list` carries the foundation's set alone. **AND THE ECHO
// HANDLER IS UNREACHABLE THROUGH THIS SURFACE, WHICH IS READ OFF THE TREE RATHER THAN ASSUMED**: `syncModuleRouter`
// IS re-synced after an install (`src/main/mcp-server.ts:1043-1049`), but the live stdio server's registry is built
// ONCE, at `createServer` (`:1062-1075`), out of whatever the router held at that instant — and the boot's router is
// empty — so a name nobody declared AND a name the manifest declared BOTH give this client no tool at all: not even
// the `{tool, args}` echo a declared name would have answered had it ever been published.
//
// THE GRAIN IS THE BUILT APP AND THE APP'S OWN EXTERNAL SURFACE (D-27): one boot of the bundle `npm run build`
// produces, on its own scratch profile, handshaking the real MCP transport over stdio, driven ONLY through the
// tools an agent has — `module.install`, `module.update`, a dynamic `module:<name>.<tool>` call, `tools/list` and
// the initialized `serverInfo.version`. **THIS FILE IMPORTS NO `src/**` AND NO `scripts/**`**: the internals these
// rows name are the ones the design moves, and `npm run typecheck:tests` types the `tests/**` tree alone (the
// rule `tests/e2e/tier-readout/` states in its own header). **NO ROW IS SKIPPED OR SOFTENED, and this file
// carries no `strata:marked` marker**: a `tests/e2e/**` file always gates (D-30, D-40).
//
// THE FIVE ROWS SEQUENCE OVER ONE BOOT, AND THAT IS A DECISION RATHER THAN AN ECONOMY: each installs a module into
// the ONE registry a boot constructs (`src/main/main.ts:630-631`), so a second boot would measure a second
// registry and buy nothing — and the live-boot lock (`D-94`) is then held once instead of five times. The rows'
// order is the contract's own order: install and execute (`M-1`), withdraw and re-register (`M-2`), admit
// (`M-3`), resolve (`M-4`), publish (`M-5`).
//
// **A REFUSAL IS A VALUE AND THE EXISTING ARM IS THE ONE IT USES**: `{status:'rejected', reason}` is the
// `ModuleInstallResult` this tree already declares (`src/shared/types.ts:241-246`), so no new tool, no new member
// and no new surface is added to prove a step — `D-18`'s rule applied to a battery.
//
// WHAT THE ROWS DO NOT MEASURE, STATED BECAUSE AN ABSENT ROW IS OTHERWISE INDISTINGUISHABLE FROM A FORGOTTEN ONE:
//   · nothing here is batched or delivered — the passthrough's batch is `U3`'s (`M-11`/`M-13`), and a gating row
//     filed before its step is implementable cannot pass (design §6: the ruling is that page's own, with D-40 and
//     D-30 owning why a row that cannot green is evidence of nothing). **AND `D-307` RE-GRAINS WHAT THOSE TWO ROWS
//     WILL MEASURE, AND WHEN THEY FILE**: a module's listener has TWO OPTIONAL HALVES — a main/server handler
//     invoked when the store fires it, whose return is the channel's DATA FOR THAT LISTENER, and a client/renderer
//     listener the channel fires on delivery — and a listen declaring no main half is wrapped as a STRAIGHT
//     PASSTHROUGH; because the witness for both halves is REALM-side, the two rows are filed with the first
//     realm-side driver (`S-20`'s) and not at `U3`'s own landing, and they file in their OWN battery
//     (`tests/e2e/module-channel/`), not here. So `M-11` is the batch (one delivery carrying every entry one
//     write turn fired, the entries sharing one `turn`: a main half's return, an empty return, the triggering
//     address on the passthrough arm, a main half that THREW contained and named, and a return that is not
//     transport-safe refused BY NAME) and `M-13` is the fan-out (each entry's client half fired on delivery,
//     contained per module, and the crossing path's two halves under an address-keyed fan-out);
//   · nothing here adds, moves or paints a node — the registries, the pane point, the template point and the
//     overlay placeholders are `U2`/`U4`/`U5`'s;
//   · a module's RENDERER half is not driven: `M-1`..`M-5` are the main-side contract, and the client half needs
//     a driver envelope the pane rows will carry — **nor is a listener's CLIENT half, which is `M-13`'s and is
//     reserved with it** (`D-307`);
//   · `S-1`'s SECOND DELIVERY is not driven: no bundled module exists at this head (there is no `src/modules/`, and
//     whether the bundler emits a module's source string or its exports is `OWED-3`'s and L2's), so `M-1` measures the
//     installed-source-STRING delivery, and "the same shape to the executor" only on its MAIN half;
//   · the two-gate's NEGATIVE half is not measured: `S-5` says the `module:` invocation two-gate STANDS, and the only
//     grant this file can carry is the profile seed (`provident-security.json`'s `enabled`, `D-85`) — nothing on this
//     surface narrows `code` — so `M-5` shows the gate ADMITS under `module`+`code`, which is one arm of two. The other
//     arm would need a second boot on a seed without `code`, and that breaks §6's one-boot grain;
//   · no row boots a second host, AND THAT IS NOW A FACT ABOUT THIS BATTERY RATHER THAN ABOUT THE PACKAGE:
//     `2.0.0` SHIPS the WebAssembly sibling (`@auspicion/provident-storeroom-js-wasm`, a sixth artefact and a
//     second package, a separate manifest), and the modularity design owes electron-vs-node parity on it
//     (`D-310`; design §4 `C-13`, §3 `S-13b`) — but the parity's witness is `M-29` in ITS OWN battery
//     (`tests/e2e/module-parity/`) and its own boot, because this file's grain is the Electron bundle's main-side
//     surface. So cross-compatibility HERE is still read as the contract's absence of host APIs and not as a
//     second boot (design §6 (ii)). The WASM-pending clause this bullet carried (`D-304` (iii), with
//     `D-298`/`D-299` named for the pin's `require`/`exports` move and the `>=22.12.0` floor) is OBSOLETE as a
//     fact at this pin (`strata/records/storeroom-2.0.0-research.md` row D8) and is kept here only as that reading.
//
// EVERY WAIT IS BOUNDED AND EVERY FAILURE NAMES ITS REASON. A boot that publishes a load error is reported AT
// ONCE with that error, never as a timeout; a handshake that never settles is reaped and PROVED gone before the
// lock is released; `afterAll` SIGKILLs every process of this boot's tree, reaps and PROVES zero survivors over the
// whole file before the profiles go and before a survivor could ever be a warning (D-74); and `process.on('exit')`
// is the net for the teardown that never runs at all — the same net `tests/e2e/tier-readout/` carries, which this
// file lacked.
// A `DISPLAY` IS A PREREQUISITE OF THE BOOT AND NEVER A SKIP — `main` creates its one `BrowserWindow`

import { rmSync } from 'node:fs'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  PROFILE_FILE, ROW_MS, asObject, boot, call, liveBootReleases, livePids, makeProfile, memberOf, pkg, reap, reasonOf,
  scratchProfiles, sourceOf, statusOf, str, type Boot,
} from '../harness/live-boot.js'

/** The five module names this battery installs, spelled once (`registerModule`'s injectivity rule): no `.` and no `:` in a
 *  name, so a hyphen is the only separator used below. */
const ALPHA = 'matrix-alpha'
const BASE = 'matrix-base'
const DEP = 'matrix-dep'
const NOW = 'matrix-now'
const PUBLISH = 'matrix-publish'

// ---- the modules this battery installs --------------------------------------
/** **EVERY SOURCE DECLARES EXACTLY THE TOOLS ITS ENTRY REGISTERS — AND WHERE THE TWO DISAGREE, THE DISAGREEMENT IS THE
 *  ROW'S SUBJECT.** `C-12`'s rule is that a manifest's declaration and its entry's registrations are the SAME set in
 *  BOTH directions (an overstated declaration is refused at install, an undeclared registration at activation), so a
 *  source that declared nothing while its entry registers would be refused for a reason `M-1`/`M-2` do not measure and
 *  those rows could never green. The carrier is `ModuleCapabilities`' `capabilities.tools`
 *  (`src/shared/types.ts:207-211`), the ONE declaration member this tree already has (`handleModuleTool`'s
 *  `parseCapabilities`, `src/main/mcp-server.ts:266-293`); the declaration is what makes `M-3`'s overstatement (②) and
 *  its foundation tool name (③) measurable AT ALL. **AND IT CHANGES NO RED OF `M-1`/`M-2`**: no code evaluates an `entry`, and
 *  a declared name reaches no client through the live transport (the header's own reading), so the row's claim — the
 *  tool answers because the ENTRY registered it, with the module's OWN value — is untouched by the declaration. */
const declares = (...tools: string[]): Record<string, unknown> => ({ capabilities: { tools } })
/** `M-1`/`M-2`'s subject: v1 registers `answer`, v2 registers `answerB` — so the update's inverse has something to
 *  withdraw and `M-2` cannot green on the vacuous reading "nothing was ever registered". */
const ALPHA_V1 = 'function (ctx) { ctx.tool("answer", function () { return { from: "matrix-alpha", value: 42 } }) }'
const ALPHA_V2 = 'function (ctx) { ctx.tool("answerB", function () { return { from: "matrix-alpha", value: "two" } }) }'
/** `M-3`'s three admissions, each declaring exactly what it registers so the ONLY fault on trial is the row's own.
 *  ① a reach for the preload bridge — the token `C-1` puts off limits; ② a declaration that OVERSTATES what the entry
 *  registers (`declared-only` is never registered); ③ a registration of a FOUNDATION tool name, declared as such so the
 *  refusal cannot be read as a declaration/registration mismatch instead. */
const LEAKY = 'function (ctx) { var raw = window.provident; ctx.tool("leak", function () { return raw === null }) }'
const LOUD = 'function (ctx) { }'
const SQUATTER = 'function (ctx) { ctx.tool("provident.dispatch", function () { return 1 }) }'
/** `M-4`'s modules. `matrix-base` answers a tool so its ACTIVATION is observable; `matrix-dep` requires it `>1.1.0`
 *  — the request's own example (*"module B requires module A vers. >1.1.0"*, D-304). **THE DEPENDENCY ELEMENT IS THE
 *  STANDING `ModuleDependency` (`{name, versionRange}`, `src/shared/types.ts:213-217`) AND NOT A NEW `range` MEMBER**:
 *  the design adds no shared type for this (`§2`'s "named and NOT claimed", `ipc-contract`) and cites
 *  `ModuleDependency.versionRange` as the member the resolver is missing (design `§1`, A5), so the container the design
 *  DOES spell — `requires{modules[],app}` (`S-4`, `C-11`) — carries that element unchanged. */
const BASE_ENTRY = 'function (ctx) { ctx.tool("ping", function () { return { from: "matrix-base" } }) }'
const DEP_ENTRY = 'function (ctx) { ctx.tool("tick", function () { return { from: "matrix-dep" } }) }'
const NOW_ENTRY = 'function (ctx) { ctx.tool("clock", function () { return { from: "matrix-now" } }) }'
/** One `requires` member of each kind: a module requirement in `ModuleDependency`'s own spelling, and the application
 *  requirement `C-11` names (`requires.app`) — the number the resolver judges against the ONE accessor's answer. */
const requiresModule = (name: string, versionRange: string): Record<string, unknown> =>
  ({ requires: { modules: [{ name, versionRange }] } })
const requiresApp = (app: string): Record<string, unknown> => ({ requires: { app } })

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

describe('modularity — U1: the executor, its admission, its resolver and the set it publishes (docs/L1/modularity.md §3)', () => {
  it('M-1 — the contract: an installed module’s `entry` is EVALUATED, so its own tool answers its own code (S-1)', async () => {
    const installed = await call(client(), 'module.install', {
      name: ALPHA,
      version: '1.0.0',
      source: sourceOf(ALPHA, '1.0.0', ALPHA_V1, declares('answer')),
    })
    expect(installed.ok, `module.install answered as a throw rather than a value: ${installed.text}`).toBe(true)
    expect(statusOf(installed), `module.install answered ${installed.text}`).toBe('installed')
    // THE ROW'S WHOLE CLAIM: the tool exists because the ENTRY registered it, and its answer is the module's own.
    const answer = await call(client(), `module:${ALPHA}.answer`, {})
    expect(answer.ok, `module:${ALPHA}.answer did not answer at all — the entry was not evaluated: ${answer.text}`).toBe(true)
    expect(answer.value, `module:${ALPHA}.answer answered ${answer.text}, which is not the module’s own value`).toEqual({ from: ALPHA, value: 42 })
  }, ROW_MS)

  it('M-2 — the executor: an update WITHDRAWS the old registration and the new entry answers (S-2)', async () => {
    // THE PRECONDITION IS ASSERTED, NOT ASSUMED: an inverse can only be measured over a registration that STOOD, so v1's
    // tool is read BEFORE the update — otherwise the withdrawal arm would green at this head on the vacuous reading
    // "nothing was ever registered", which measures nothing.
    const standing = await call(client(), `module:${ALPHA}.answer`, {})
    expect(standing.ok, `the v1 registration is not reachable BEFORE the update, so there is nothing for an inverse to withdraw: ${standing.text}`).toBe(true)
    const updated = await call(client(), 'module.update', {
      name: ALPHA,
      version: '1.1.0',
      source: sourceOf(ALPHA, '1.1.0', ALPHA_V2, declares('answerB')),
    })
    expect(updated.ok, `module.update answered as a throw: ${updated.text}`).toBe(true)
    expect(statusOf(updated), `module.update answered ${updated.text}`).toBe('updated')
    // THE INVERSE RAN: v1's tool is not reachable any more, and the refusal NAMES it rather than answering a value.
    const withdrawn = await call(client(), `module:${ALPHA}.answer`, {})
    expect(withdrawn.ok, `the withdrawn tool still answers after the update: ${withdrawn.text}`).toBe(false)
    expect(withdrawn.text, `the withdrawal answered ${withdrawn.text}, which does not name the tool it withdrew`).toContain('answer')
    const refreshed = await call(client(), `module:${ALPHA}.answerB`, {})
    expect(refreshed.ok, `the updated entry's tool did not answer: ${refreshed.text}`).toBe(true)
    expect(refreshed.value, `module:${ALPHA}.answerB answered ${refreshed.text}`).toEqual({ from: ALPHA, value: 'two' })
  }, ROW_MS)

  it('M-3 — admission: a host-API token, an overstatement and a foundation tool name are each refused BY NAME, as VALUES (S-3)', async () => {
    // ① THE IPC RULE, ENFORCED AT THE ONE DOOR THE FOUNDATION OWNS (`C-1`): a source reaching for the preload bridge.
    const leaky = await call(client(), 'module.install', {
      name: 'matrix-leaky',
      source: sourceOf('matrix-leaky', '1.0.0', LEAKY, declares('leak')),
    })
    expect(leaky.ok, `a source naming window.provident THREW instead of being refused: ${leaky.text}`).toBe(true)
    expect(statusOf(leaky), `a source naming window.provident was not refused: ${leaky.text}`).toBe('rejected')
    expect(reasonOf(leaky), `the refusal must name the token it refused: ${leaky.text}`).toContain('window.provident')

    // ② A DECLARATION THAT OVERSTATES ITS REGISTRATION (`C-12`): `declared-only` is declared and never registered.
    const loud = await call(client(), 'module.install', {
      name: 'matrix-loud',
      source: sourceOf('matrix-loud', '1.0.0', LOUD, declares('declared-only')),
    })
    expect(loud.ok, `an overstated declaration THREW: ${loud.text}`).toBe(true)
    expect(statusOf(loud), `an overstated declaration was not refused: ${loud.text}`).toBe('rejected')
    expect(reasonOf(loud), `the refusal must name the declaration it could not find: ${loud.text}`).toContain('declared-only')

    // ③ A FOUNDATION TOOL NAME IS NOT A MODULE'S TO TAKE: the namespace is `module:<name>.<tool>`, closed.
    const squatter = await call(client(), 'module.install', {
      name: 'matrix-squatter',
      source: sourceOf('matrix-squatter', '1.0.0', SQUATTER, declares('provident.dispatch')),
    })
    expect(squatter.ok, `a registration of provident.dispatch THREW instead of being refused: ${squatter.text}`).toBe(true)
    expect(statusOf(squatter), `a registration of a foundation tool name was not refused: ${squatter.text}`).toBe('rejected')
    expect(reasonOf(squatter), `the refusal must name the tool it refused: ${squatter.text}`).toContain('provident.dispatch')

    // AND NONE OF THE THREE REACHED THE REGISTRY: a refused install is not a stored module.
    const listed = await call(client(), 'module.list')
    const names = (Array.isArray(listed.value) ? listed.value : []).map((entry: unknown) => str(memberOf(entry, 'name')) ?? '')
    expect(names, `a refused install was stored anyway: ${listed.text}`).not.toContain('matrix-leaky')
    expect(names, `an overstated declaration was stored anyway: ${listed.text}`).not.toContain('matrix-loud')
    expect(names, `a foundation tool name was stored anyway: ${listed.text}`).not.toContain('matrix-squatter')
  }, ROW_MS)

  it('M-4 — the resolver: a cycle and an unsatisfied module range are refused by name, an unsatisfiable app range is too, and a satisfied pair ACTIVATES (S-4)', async () => {
    // ① A DEPENDENCY THAT IS ABSENT: refused, and the refusal names the module it needs.
    const premature = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(premature.ok, `an unresolved dependency THREW: ${premature.text}`).toBe(true)
    expect(statusOf(premature), `a module requiring an absent module was not refused: ${premature.text}`).toBe('rejected')
    expect(reasonOf(premature), `the refusal must name the dependency: ${premature.text}`).toContain(BASE)

    // ② THE DEPENDENCY EXISTS AND ITS RANGE DOES NOT SATISFY — the request's own example, `>1.1.0` against `1.0.0`.
    const baseOne = await call(client(), 'module.install', {
      name: BASE,
      version: '1.0.0',
      source: sourceOf(BASE, '1.0.0', BASE_ENTRY, declares('ping')),
    })
    expect(baseOne.ok, `matrix-base 1.0.0 answered as a throw: ${baseOne.text}`).toBe(true)
    expect(statusOf(baseOne), `matrix-base 1.0.0 was not installed: ${baseOne.text}`).toBe('installed')
    const unsatisfied = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(statusOf(unsatisfied), `>1.1.0 was satisfied by 1.0.0: ${unsatisfied.text}`).toBe('rejected')
    expect(reasonOf(unsatisfied), `the refusal must name the range: ${unsatisfied.text}`).toContain('>1.1.0')

    // ③ THE RANGE IS SATISFIED: the install lands AND the module is ACTIVE — its own tool answers.
    const baseTwo = await call(client(), 'module.update', {
      name: BASE,
      version: '1.5.0',
      source: sourceOf(BASE, '1.5.0', BASE_ENTRY, declares('ping')),
    })
    expect(statusOf(baseTwo), `matrix-base 1.5.0 was not updated: ${baseTwo.text}`).toBe('updated')
    const landed = await call(client(), 'module.install', {
      name: DEP,
      version: '1.0.0',
      source: sourceOf(DEP, '1.0.0', DEP_ENTRY, { ...declares('tick'), ...requiresModule(BASE, '>1.1.0') }),
    })
    expect(statusOf(landed), `a satisfied dependency did not admit its dependent: ${landed.text}`).toBe('installed')
    const ticking = await call(client(), `module:${DEP}.tick`, {})
    expect(ticking.ok, `the dependent never activated: ${ticking.text}`).toBe(true)
    expect(ticking.value, `module:${DEP}.tick answered ${ticking.text}`).toEqual({ from: DEP })

    // ④ THE APPLICATION VERSION IS JUDGED AGAINST THE ONE NUMBER THE BUILD PUBLISHES (`C-11`), and the refusal says it.
    const future = await call(client(), 'module.install', {
      name: 'matrix-future',
      source: sourceOf('matrix-future', '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>99.0.0') }),
    })
    expect(future.ok, `an unsatisfiable app range THREW: ${future.text}`).toBe(true)
    expect(statusOf(future), `an app range >99.0.0 was admitted: ${future.text}`).toBe('rejected')
    expect(reasonOf(future), `the app refusal must name the range it could not satisfy: ${future.text}`).toContain('>99.0.0')

    const present = await call(client(), 'module.install', {
      name: NOW,
      source: sourceOf(NOW, '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>=0.0.1') }),
    })
    expect(statusOf(present), `an app range >=0.0.1 was not admitted: ${present.text}`).toBe('installed')
    const clock = await call(client(), `module:${NOW}.clock`, {})
    expect(clock.ok, `an admitted module's tool did not answer: ${clock.text}`).toBe(true)
    expect(clock.value, `module:${NOW}.clock answered ${clock.text}`).toEqual({ from: NOW })

    // ⑤ A CYCLE IS REFUSED BY NAME, and `S-4` names it BESIDE the unsatisfied range — so leaving it to `M-5`'s set or
    //    to nothing would have been a clause of the step no row measured. `matrix-dep` already requires `matrix-base`
    //    (③), so an update making `matrix-base` require `matrix-dep` closes the loop; the refused update lands nothing,
    //    and `M-5`'s set reads that back. **BOTH MEMBERS ARE ASSERTED, because a refusal naming no module of the cycle
    //    is not a refusal BY NAME** (`S-4`), and a refusal naming only the updated module would pass on the wrong one.
    const cycle = await call(client(), 'module.update', {
      name: BASE,
      version: '2.0.0',
      source: sourceOf(BASE, '2.0.0', BASE_ENTRY, { ...declares('ping'), ...requiresModule(DEP, '>=1.0.0') }),
    })
    expect(cycle.ok, `an update closing a dependency cycle THREW instead of being refused: ${cycle.text}`).toBe(true)
    expect(statusOf(cycle), `an update closing a dependency cycle was not refused: ${cycle.text}`).toBe('rejected')
    expect(
      reasonOf(cycle),
      `a cycle refusal must name BOTH modules in the cycle (${BASE}, ${DEP}) and it read '${reasonOf(cycle)}': ${cycle.text}`,
    ).toContain(BASE)
    expect(
      reasonOf(cycle),
      `a cycle refusal must name BOTH modules in the cycle (${BASE}, ${DEP}) and it read '${reasonOf(cycle)}': ${cycle.text}`,
    ).toContain(DEP)
  }, ROW_MS)

  it('M-5 — the published set is the registry’s composition and the published version is the one authority (S-5)', async () => {
    const listed = await client().listTools()
    const names = listed.tools.map((tool) => tool.name)
    // ① THE MODULE NAMESPACE CARRIES EXACTLY WHAT THE ENTRIES REGISTERED — no echo, no declaration, no orphan.
    const moduleTools = names.filter((name) => name.startsWith('module:')).sort()
    expect(moduleTools, `the dynamic module tools the transport publishes are ${JSON.stringify(moduleTools)}`).toEqual([
      `module:${ALPHA}.answerB`,
      `module:${BASE}.ping`,
      `module:${DEP}.tick`,
      `module:${NOW}.clock`,
    ].sort())
    // ② THE FOUNDATION'S OWN SET IS UNMOVED BY A MODULE: the static module management tools and the seeded groups' tools.
    expect(names, `the transport did not publish module.install: ${JSON.stringify(names)}`).toContain('module.install')
    expect(names, `the transport did not publish module.update: ${JSON.stringify(names)}`).toContain('module.update')
    expect(names, `the transport did not publish module.list: ${JSON.stringify(names)}`).toContain('module.list')
    expect(names, `the transport did not publish provident.data.read: ${JSON.stringify(names)}`).toContain('provident.data.read')
    expect(names, `the transport did not publish provident.get_rendered_html: ${JSON.stringify(names)}`).toContain('provident.get_rendered_html')
    // ③ ONE VERSION AUTHORITY (`C-11`), MEASURED AS ONE READING AND NOT AS TWO NUMBER-SHAPED STRINGS: what the transport
    //    publishes must be the manifest's own number, AND the number the RESOLVER judges to refuse `>99.0.0` must be the
    //    same number. **THE ROW TAKES THAT JUDGEMENT ITSELF** rather than carrying `M-4`'s sentence across: a value carried
    //    from another row's body would make this red name that row's failure as a prerequisite, not this row's absence.
    const published = client().getServerVersion()?.version ?? '(no serverInfo.version)'
    expect(published, `serverInfo.version is '${published}' and the manifest carries '${pkg.version}'`).toBe(pkg.version)
    const future = await call(client(), 'module.install', {
      name: PUBLISH,
      source: sourceOf(PUBLISH, '1.0.0', NOW_ENTRY, { ...declares('clock'), ...requiresApp('>99.0.0') }),
    })
    expect(future.ok, `the app-range refusal arrived as a throw rather than a value: ${future.text}`).toBe(true)
    expect(statusOf(future), `an app range >99.0.0 was admitted, so nothing judged its number: ${future.text}`).toBe('rejected')
    const refused = reasonOf(future)
    expect(refused, `the resolver judged '${published}' yet its refusal reads '${refused}', so the refusal carries no number`).toMatch(/\d+\.\d+\.\d+/)
    expect(refused, `the resolver's refusal reads '${refused}' and the transport publishes '${published}' — two spellings, not one authority`).toContain(published)
  }, ROW_MS)

  it('M-30 — the boot census: the profile\'s installed rows are ACTIVE at the NEXT boot, with no `module.install` call (D-316)', async () => {
    // **THE GAP THIS ROW CLOSES** (the unit record's named absent route): before `D-316` a census-loaded module was
    // listed by `module.list` and answered by NO tool — the only activation path was the MCP tool's. The first boot
    // persisted its rows through `module.install` (M-1..M-5); a restart over the SAME profile must activate them from
    // the census BEFORE the transport composes its set, so the tools answer on a boot that installs nothing.
    const first = booted
    if (first === null || bootProfile === null) throw new Error('PREREQUISITE — no first boot stood, so there is no census to re-boot')
    await first.stop()
    booted = null
    const second = await boot(bootProfile)
    booted = second

    const listed = await call(second.client, 'module.list')
    const names = (Array.isArray(listed.value) ? listed.value : []).map((entry) => str(memberOf(entry, 'name')) ?? '')
    expect(names, `the census carries the rows the first boot persisted: ${listed.text}`).toEqual(expect.arrayContaining([ALPHA, BASE, DEP, NOW]))
    expect(names, 'and a refused install was never persisted, so the census carries no row for it (D-315)').not.toContain('matrix-future')

    // NO `module.install` WAS CALLED ON THIS BOOT. Each tool answers because the census activated it at boot.
    const answer = await call(second.client, `module:${ALPHA}.answerB`, {})
    expect(answer.ok, `the census-loaded module's tool did not answer at boot, with no install call: ${answer.text}`).toBe(true)
    expect(answer.value, 'and it answers the module\'s own value — the entry was evaluated at the boot activation').toEqual({ from: ALPHA, value: 'two' })
    const tick = await call(second.client, `module:${DEP}.tick`, {})
    expect(tick.value, 'the dependent pair the resolver ordered at the first boot is active again, in the resolver\'s order').toEqual({ from: DEP })
  }, ROW_MS)
})

/** **THE TWO NAMES A LATER ROW WILL NEED, SPELLED HERE AND USED BY NO ROW ABOVE** — the profile file, and the row-key
 *  prefix the module registry's `file.modules.<id>` rows carry. No row of `M-1`..`M-5` reads either: every claim above
 *  is read through the app's external surface, and a row that later needs the BYTES (`U2`'s repair figures) finds the
 *  spellings here instead of inventing a second literal (D-27: this file imports no `src/**`, so a name it needs is
 *  spelled) — `void`ed so a reader sees they are deliberately unreached, not forgotten (`D-84`, `D-169`). */
const REGISTRY_ROWS_KEY = 'file.modules.'
void PROFILE_FILE
void REGISTRY_ROWS_KEY
