// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/engine-pin-version.test.ts — R-14, R-14b and R-15 of the §4.1 RED SET
// of docs/specs/engine-pin.md (`U-ENGINE-PIN`), plus the `S-READ-JSON-1`
// strategy (the `(a)` half of P-IM-4, which absorbed the former P-IM-3 — §5.5)
// and the static seam rows §0 prohibitions 1 and 5.
//
// Contract (§2.1, §3.7): the ONLY declarative change of this unit is
// `package.json`'s `dependencies['provident-ssr']`, moving `^0.2.1` → `^0.5.2`
// (RE-GRAINED FROM `^0.5.1`) and, at REV 15, `^0.5.2` → `^0.6.0` (a CARET cannot
// admit it — on `^0.x.y` the MINOR is pinned exactly); `R-14`'s own comment says
// WHY each bump came — see below; the row is re-pinned only with the sentence
// that bought it; the installed dist must resolve to `0.6.0` (the skew protection — a stale
// `node_modules` beneath a moved pin is the signature of a half-installed tree
// and must NOT be able to produce a green suite). No new MCP surface, no new
// renderer RPC method, no shim member beyond the one (§2.2.4).
//
// AMENDED (AF-9, §3b / §7.10 / `docs/decisions.md:61`): R-15 is asserted by SET
// EQUALITY against a named 21-tool list, never by a bare count. `ALL_TOOLS === 21`
// is a COUNT FREEZE this unit RECORDS, not a claim it defends — the later
// `U-FOCUS-TOOL` unit (`provident.focus`) changed it to 22, and its census edit
// read as THAT unit's own edit rather than a regression here. ⟶ The operative
// figure at this head is `27`, moved `22 → 27` by `central-data`'s declared census
// exception (`docs/L1/central-data-census-exception.md` §4), which adds the five
// `provident.data.*` names in the SAME COMMIT as their registration and gate rows.
//
// TDD: the retarget has landed (`package.json:27` = `^0.6.0`, installed `0.6.0`),
// so R-14 PASSES on this tree; R-15/R-14b and the static rows PASS and must stay
// passing (§4.1: "PASSES until `U-FOCUS-TOOL` lands"). This file is the
// version/AF-9 half of the second red cycle's re-write.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ShimElement } from '../src/shared/dom-shim.js'
import { Supervisor } from 'provident-ssr'
import { ProvidentMcpServer } from '../src/main/mcp-server.js'
import { groupForTool, type ToolGroup } from '../src/main/security.js'
import type { RpcMethod } from '../src/shared/types.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function readJson(rel: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')) as Record<string, unknown>
}

// ---------------------------------------------------------------------------
// P-IM-3 (invariant) — strategy id `S-READ-JSON-1`.
// Read the two JSON files once, assert equality against the literal pin. Fixed,
// no table, no randomness, no network (no test may install or read the
// registry — §2.1).
// ---------------------------------------------------------------------------

describe('U-ENGINE-PIN — the version pin (spec §2.1, §3.7, §4.1)', () => {
  it('R-14 the declared pin is ^0.6.0 and the installed dist is 0.6.0', () => {
    // States:
    //   S1 the DECLARED pin: package.json dependencies['provident-ssr'] === '^0.6.0'
    //   S2 the INSTALLED dist: node_modules/provident-ssr/package.json .version === '0.6.0'
    //   S3 the two agree — version skew cannot be silently green
    //   S4 the CAPABILITY the reason below rests on is installed, not merely declared
    //
    // REV 15 / `D-314` RE-GRAINS THIS ROW WHOLE — TITLE AND LITERAL — `^0.5.2` → `^0.6.0`, because a
    // title that lags a moved pin is the first thing a later pass misreads. WHY THE LITERAL MOVED,
    // IN THIS ROW'S OWN WORDS (the rule the paragraph below states for the previous bump): A CARET CANNOT ADMIT IT — on `^0.x.y`
    // the MINOR is pinned exactly, so `^0.5.2` can never resolve `0.6.0`, and this is a DECLARATIVE
    // MOVE rather than a widening. WHAT IT BOUGHT, by reference and never restated as a rule
    // (`docs/handoffs-update-0.6.0-2026-11-23.md` §1–§2): `PATH-DOMAIN-RE-MINT` — the SUPERVISOR'S
    // TREE COMPILE MODE, `CompileMode = 'family' | 'path'` (`dist/core/supervisor.d.ts:93-125`),
    // DECLARED via `{ compileMode }` / `setCompileMode()` (`.js:221-224,625-631`) and INFERRED at
    // the bootstrap seam `recordResolved` from the recorded path states (`.js:644-647`), with the
    // pass-2 switch at `.js:734-743` — WHICH DISCHARGES `POST-BOOTSTRAP-EMIT-DROP` UPSTREAM: on the
    // installed dist this unit's `4 → 0` arm renders the FULL tree (226 chars, five ids) once the
    // post-bootstrap compile honours the mode, where this host's own plain `node.compile` still
    // zeroes the document, so the surviving case is the HOST'S RECIPE and the host-side half is
    // `producing-runtime`'s (`docs/L1/modularity.md` `C-7`/`S-16`); plus `attach` now REGISTERING an
    // unregistered node (register-if-new, `.js:1648-1662`), a refused restore answering
    // `replay().status === 'no-op'` and KEEPING the graph, the condensed base declared a LIVE VIEW,
    // the `handler-body-missing` warn, and the census dedupe. THIS ROW CARRIES THE PIN AND NOT THE
    // ADOPTION: it asserts that the two version strings agree and that the mode surface the
    // adoption depends on is really in the installed bytes.
    //
    // AND THIS PARAGRAPH IS KEPT AS THE READING IT WAS — the `^0.5.1` → `^0.5.2` bump's own reason,
    // because a pin row that forgets what a bump bought is a row that is re-pinned without review.
    // WHY THE PREVIOUS LITERAL MOVED `^0.5.1` → `^0.5.2`, IN THIS ROW'S OWN WORDS — A PIN ROW THAT DOES
    // NOT SAY WHAT THE BUMP BOUGHT IS A ROW THAT WILL BE RE-PINNED WITHOUT REVIEW.
    // `0.5.2` (`VALUE-PROVIDER-RENDER-DISPOSITION`) NARROWS THE COMPILE EMIT GATE so that a
    // name-consumed provider is dropped ONLY WHEN IT IS A RUNTIME-MINTED VALUE RECORD —
    // `node.valueRecord === true`, and that marker is written by EXACTLY ONE SITE, `mintRowNode`
    // (`dist/core/ops.js`), so no document can forge it. `0.5.1` dropped EVERY name-consumed
    // provider (`hasAnyTarget && isResolutionParticipant(node) && !isSeamProvider(node)`), and so
    // ERASED AN AUTHORED ZONE THAT PROVIDED STYLING FOR ITS CHILDREN — the panes it held were
    // orphaned, not re-parented, never created. THIS APP NEEDED THAT ZONE IN ORDER TO LET A PANE
    // INHERIT ITS ZONE'S CLASSES BY POSITION, which is `strata/records/app-layout-unit.md`'s
    // `AL-F1`: the bump PARTLY DISCHARGES that finding (the element half, re-measured on the
    // installed bytes), while the seam escape's position half stays OPEN and upstream-owned
    // (`D-5`). The pin is the whole of this repo's response — the package is never modified.
    const pkg = readJson('package.json')
    const deps = pkg.dependencies as Record<string, string>
    const installed = readJson('node_modules/provident-ssr/package.json')

    // S1
    expect(deps['provident-ssr']).toBe('^0.6.0')
    // S2
    expect(installed.version).toBe('0.6.0')
    // S3 — the declared range must be satisfied by the installed version: a
    // `^0.6.0` pin with a `0.5.2` dist is the half-installed signature, so the
    // caret is read as a caret and not as `minor >= 6`: on `^0.x.y` the MINOR is
    // pinned exactly and the PATCH moves, which is why a `0.5.2` beneath this pin
    // reds here even though it would have passed the loose form.
    const installedParts = String(installed.version).split('.').map(Number)
    const [installedMajor, installedMinor, installedPatch] = installedParts
    expect(installedParts.length, 'the installed version is a three-part semver').toBe(3)
    expect(installedMajor).toBe(0)
    expect(installedMinor).toBe(6)
    expect(installedPatch).toBeGreaterThanOrEqual(0)
    // S4 — THE REASON'S OWN WITNESS, so the paragraph above is a MEASURED reading
    // and not a comment (`D-43`: a declaration agreeing with itself is not
    // evidence). The installed supervisor carries the compile-mode surface
    // `D-314`'s reading rests on, and it DEFAULTS to `family` — which is what
    // makes the `path` INFERENCE at `recordResolved` an event at all, and what
    // makes a host's adoption a decision. A dist lacking the surface reds HERE,
    // in the pin carrier, rather than in the design's step.
    const sup = new Supervisor({})
    expect(typeof sup.getCompileMode, 'the installed supervisor answers getCompileMode').toBe('function')
    expect(typeof sup.setCompileMode, 'the installed supervisor answers setCompileMode').toBe('function')
    expect(sup.getCompileMode(), 'an undeclared tree compile mode defaults to family').toBe('family')
    sup.dispose()
  })

  it('R-14b the retarget changed only the one dependency line (§2.1, §5.1)', () => {
    // States:
    //   S1 the dependency set is unchanged apart from the version string
    //   S2 `type: module` is untouched (the package stays ESM-only)
    //   S3 no `engines`/`exports`/`files` override was slipped in
    const pkg = readJson('package.json')
    const deps = pkg.dependencies as Record<string, string>
    expect(Object.keys(deps).sort()).toEqual(['@modelcontextprotocol/sdk', 'provident-ssr', 'provident-storeroom'])
    expect(pkg.type).toBe('module')
    expect(pkg.engines).toBeUndefined()
    expect(pkg.exports).toBeUndefined()
    // The scripts entry set is unchanged (the retarget adds no script).
    const scripts = pkg.scripts as Record<string, string>
    for (const required of ['test', 'typecheck', 'build', 'battery', 'divergence']) {
      expect(Object.keys(scripts)).toContain(required)
    }
  })

  it('R-15 no new MCP surface was added by the retarget — asserted by SET equality, not by count', () => {
    // States (§0 prohibitions 1 + 5; AF-9 re-parameterisation):
    //   S1 the tool SET equals the fixed 27-name set (a name ADDED fails, a name
    //      REMOVED fails — set equality, never a bare count)
    //   S2 no duplicates in the set
    //   S3 no new group name beyond the six the tree carries: every tool still
    //      resolves to one of the six known groups through the exported `groupForTool`
    //   S4 the group membership table is unchanged
    //
    // AF-9 COUNT FREEZE (spec §3b, §7.10, `docs/decisions.md:61`): the `21` in
    // the name list below is a COUNT FREEZE this unit RECORDS, not a claim it
    // defends. The already-adopted `U-FOCUS-TOOL` unit (`provident.focus`)
    // changes it to 22, and the re-parameterisation rule is that the set gains
    // `provident.focus` IN THE SAME COMMIT AS THAT TOOL — together with the
    // `RpcMethod` census and the default-gate subset. A later pass seeing this
    // row red MUST first check whether `U-FOCUS-TOOL` landed: if it did, the red
    // is that unit's census edit, NOT a `U-ENGINE-PIN` regression.
    const PINNED_TOOL_SET = [
      'provident.dispatch',
      'provident.get_rendered_html',
      'provident.get_markdown',
      'provident.list_targets',
      'provident.get_node_state',
      'provident.code.get',
      'provident.code.validate',
      'provident.load',
      'provident.op',
      'provident.export',
      'provident.validate',
      'provident.teardown',
      'provident.journal',
      'provident.code.set',
      'provident.code.create',
      'provident.code.delete',
      'provident.code.load',
      'provident.code.loadBatch',
      'module.install',
      'module.update',
      'module.list',
      // `U-FOCUS-TOOL` (`docs/specs/focus-tool.md` `§5.1` row 6 / `§5.2` item 4 (iii) `N-1`):
      // the TOOL joins the name-complete pin in the SAME COMMIT as its census move, so this
      // row's SET EQUALITY (the load-bearing half) is satisfied by the name and not by a
      // quietly bumped count.
      'provident.focus',
      // The sixth group's five names (`docs/L1/central-data-census-exception.md` §4: the
      // `ALL_TOOLS` census `22 → 27`, moved by `central-data`'s own E-1 row in the SAME COMMIT).
      'provident.data.read',
      'provident.data.write',
      'provident.data.delete',
      'provident.data.list',
      'provident.data.journal',
    ]
    // S1 — SET equality against the named list (the load-bearing half, AF-9).
    expect([...ProvidentMcpServer.ALL_TOOLS].sort()).toEqual([...PINNED_TOOL_SET].sort())
    expect(new Set(PINNED_TOOL_SET).size, 'the pinned list itself must not carry a duplicate').toBe(27)
    // S2 — no duplicate tool name in the live set.
    expect(new Set(ProvidentMcpServer.ALL_TOOLS).size, 'no duplicate tool name').toBe(ProvidentMcpServer.ALL_TOOLS.length)

    // S3 — every tool resolves to a known group.
    const KNOWN_GROUPS: ToolGroup[] = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
    for (const tool of ProvidentMcpServer.ALL_TOOLS) {
      const group = groupForTool(tool)
      expect(KNOWN_GROUPS, `tool ${tool} must resolve to a known group`).toContain(group as ToolGroup)
    }
    // S4 — the existing tool→group table, pinned (a NEW tool is not in it).
    const PINNED: Record<string, ToolGroup> = {
      'provident.dispatch': 'dispatch',
      'provident.get_rendered_html': 'read',
      'provident.get_markdown': 'read',
      'provident.list_targets': 'read',
      'provident.get_node_state': 'read',
      'provident.code.get': 'read',
      'provident.code.validate': 'read',
      'provident.load': 'graph',
      'provident.op': 'graph',
      'provident.export': 'graph',
      'provident.validate': 'graph',
      'provident.teardown': 'graph',
      'provident.journal': 'graph',
      'provident.code.set': 'code',
      'provident.code.create': 'code',
      'provident.code.delete': 'code',
      'provident.code.load': 'code',
      'provident.code.loadBatch': 'code',
      'module.install': 'module',
      'module.update': 'module',
      'module.list': 'module',
      // THE GROUP-MAP DATA ROW (`docs/specs/focus-tool.md` `§2.1` item 2 / `§5.1` row 2): the
      // focus tool resolves through the EXISTING `dispatch` group — the group gate's own data
      // row, NEVER a focus-specific branch in the gate.
      'provident.focus': 'dispatch',
      // The sixth group's own five rows (`docs/L1/central-data-census-exception.md` §2 E-1):
      // each `provident.data.*` name is an EXACT row of the group table, not a prefix rule.
      'provident.data.read': 'data',
      'provident.data.write': 'data',
      'provident.data.delete': 'data',
      'provident.data.list': 'data',
      'provident.data.journal': 'data',
    }
    // The two halves must describe the SAME set — otherwise set equality above
    // would be satisfied by a map that silently lacks a tool.
    expect(Object.keys(PINNED).sort()).toEqual([...PINNED_TOOL_SET].sort())
    for (const tool of ProvidentMcpServer.ALL_TOOLS) {
      expect(groupForTool(tool), `group of ${tool}`).toBe(PINNED[tool])
    }
  })

  it('R-15b the renderer RPC union gains no member (§0 prohibition 5: no new IPC method)', () => {
    // The union itself is type-only, so the COUNT is asserted at compile time
    // (this record is exhaustive over `RpcMethod` — a new member is a tsc
    // error in `npm run typecheck`, the third leg of the trio) and at runtime
    // via the channel census below.
    const RPC_METHOD_CENSUS: Record<RpcMethod, true> = {
      dispatch: true,
      renderedHtml: true,
      markdown: true,
      listTargets: true,
      nodeState: true,
      load: true,
      op: true,
      export: true,
      validate: true,
      teardown: true,
      'code.get': true,
      'code.set': true,
      'code.create': true,
      'code.delete': true,
      'code.validate': true,
      'code.load': true,
      'code.loadBatch': true,
      journal: true,
      'module.install': true,
      'module.update': true,
      'module.list': true,
      // `docs/specs/focus-tool.md` `§5.1` row 6: the union's census moves `21 → 22` in the
      // SAME COMMIT as the tool's census edit (`§5.2` item 4 (iii) `N-2`).
      focus: true,
      // The sixth group's five bridge routes (`docs/L1/central-data-census-exception.md` §4:
      // the union's census `22 → 27`, in the SAME COMMIT as the tool census edit).
      'data.read': true,
      'data.write': true,
      'data.delete': true,
      'data.list': true,
      'data.journal': true,
    }
    expect(Object.keys(RPC_METHOD_CENSUS).length).toBe(27)
    expect(Object.keys(RPC_METHOD_CENSUS)).toContain('module.install')
  })

  it('§2.2.4 the shim gains exactly ONE member — no second admission', () => {
    // The static seam row (§0 prohibition 1: the unit adds no exported
    // identifier beyond the one method). A later pass may add nothing further
    // without a named red-run call site.
    const proto = Object.getOwnPropertyNames(ShimElement.prototype)
    expect(proto).toContain('removeAttribute')
    for (const notAdmitted of ['hasAttribute', 'closest', 'querySelector', 'querySelectorAll', 'dispatchEvent', 'matchMedia', 'getComputedStyle', 'setProperty']) {
      expect(proto, `ShimElement must not carry ${notAdmitted}`).not.toContain(notAdmitted)
    }
  })
})
