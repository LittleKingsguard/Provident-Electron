// tests/engine-pin-version.test.ts — R-14, R-14b and R-15 of the §4.1 RED SET
// of docs/specs/engine-pin.md (`U-ENGINE-PIN`), plus the `S-READ-JSON-1`
// strategy (the `(a)` half of P-IM-4, which absorbed the former P-IM-3 — §5.5)
// and the static seam rows §0 prohibitions 1 and 5.
//
// Contract (§2.1, §3.7): the ONLY declarative change of this unit is
// `package.json`'s `dependencies['provident-ssr']`, moving `^0.2.1` → `^0.5.1`;
// the installed dist must resolve to `0.5.1` (the skew protection — a stale
// `node_modules` beneath a moved pin is the signature of a half-installed tree
// and must NOT be able to produce a green suite). No new MCP surface, no new
// renderer RPC method, no shim member beyond the one (§2.2.4).
//
// AMENDED (AF-9, §3b / §7.10 / `docs/decisions.md:61`): R-15 is asserted by SET
// EQUALITY against a named 21-tool list, never by a bare count. `ALL_TOOLS === 21`
// is a COUNT FREEZE this unit RECORDS, not a claim it defends — the later
// `U-FOCUS-TOOL` unit (`provident.focus`) changes it to 22, and its census edit
// must read as THAT unit's own edit rather than a regression here.
//
// TDD: the retarget has landed (`package.json:23` = `^0.5.1`, installed `0.5.1`),
// so R-14 PASSES on this tree; R-15/R-14b and the static rows PASS and must stay
// passing (§4.1: "PASSES until `U-FOCUS-TOOL` lands"). This file is the
// version/AF-9 half of the second red cycle's re-write.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ShimElement } from '../src/shared/dom-shim.js'
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
  it('R-14 the declared pin is ^0.5.1 and the installed dist is 0.5.1', () => {
    // States:
    //   S1 the DECLARED pin: package.json dependencies['provident-ssr'] === '^0.5.1'
    //   S2 the INSTALLED dist: node_modules/provident-ssr/package.json .version === '0.5.1'
    //   S3 the two agree — version skew cannot be silently green
    const pkg = readJson('package.json')
    const deps = pkg.dependencies as Record<string, string>
    const installed = readJson('node_modules/provident-ssr/package.json')

    // S1
    expect(deps['provident-ssr']).toBe('^0.5.1')
    // S2
    expect(installed.version).toBe('0.5.1')
    // S3 — the declared range must be satisfied by the installed version: a
    // `^0.5.1` pin with a `0.2.1` dist is the half-installed signature.
    const installedMajor = Number(String(installed.version).split('.')[0])
    const installedMinor = Number(String(installed.version).split('.')[1])
    expect(installedMajor).toBe(0)
    expect(installedMinor).toBeGreaterThanOrEqual(5)
  })

  it('R-14b the retarget changed only the one dependency line (§2.1, §5.1)', () => {
    // States:
    //   S1 the dependency set is unchanged apart from the version string
    //   S2 `type: module` is untouched (the package stays ESM-only)
    //   S3 no `engines`/`exports`/`files` override was slipped in
    const pkg = readJson('package.json')
    const deps = pkg.dependencies as Record<string, string>
    expect(Object.keys(deps).sort()).toEqual(['@modelcontextprotocol/sdk', 'provident-ssr'])
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
    //   S1 the tool SET equals the fixed 21-name set (a name ADDED fails, a name
    //      REMOVED fails — set equality, never a bare count)
    //   S2 no duplicates in the set
    //   S3 no new VALID_GROUPS member: every tool still resolves to one of the
    //      five known groups through the exported `groupForTool`
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
    ]
    // S1 — SET equality against the named list (the load-bearing half, AF-9).
    expect([...ProvidentMcpServer.ALL_TOOLS].sort()).toEqual([...PINNED_TOOL_SET].sort())
    expect(new Set(PINNED_TOOL_SET).size, 'the pinned list itself must not carry a duplicate').toBe(22)
    // S2 — no duplicate tool name in the live set.
    expect(new Set(ProvidentMcpServer.ALL_TOOLS).size, 'no duplicate tool name').toBe(ProvidentMcpServer.ALL_TOOLS.length)

    // S3 — every tool resolves to a known group.
    const KNOWN_GROUPS: ToolGroup[] = ['read', 'dispatch', 'graph', 'code', 'module']
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
    }
    expect(Object.keys(RPC_METHOD_CENSUS).length).toBe(22)
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
