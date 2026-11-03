// tests/integration/store-view-record/boundary.test.ts — **THE WORKTREE BOUNDARY ROAD, RE-HOMED** (D-89).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
/**
 * ============================================================================
 * THE BOUNDARY ROW'S NEW HOME, AND WHY IT HAD TO MOVE.
 *
 * `AGENTS.md`: *"Never marked: a `tests/e2e/` file, or the worktree boundary row — a loop that
 * marks the row measuring its own tree measures nothing."* `strata/next-steps.md` row 1 said the
 * retirement of `tests/store-tabs-record.test.ts` requires *"re-homing the boundary row onto a
 * unit that owns main-side paths"*. That file's `S-1` (and the `§4.2 item 8` register row whose
 * drive embedded the same assertion) declared a scope of TEN paths — `src/renderer/renderer.ts`,
 * one shared file, six test/spec documents — and explicitly DENIED `src/main/` as a prefix
 * (`DENIED_PATH_PREFIXES`). **THE PURGE TOUCHES `src/main/view-record/index.ts`**: the shape's
 * vocabulary left that module for `src/shared/view-shape.ts` so both realms read one spelling,
 * and a row that denies `src/main/` cannot measure the pass that changes it. So the assertion
 * moved here, onto the unit whose declared scope IS the purge's own path set.
 *
 * WHAT THE ROW IS, UNCHANGED IN SUBSTANCE: `edit-set ⊆ declared scope`, asserted AS A SET and
 * never as a count, with a POSITIVE CONTROL that an edit outside the union FAILS. The one thing
 * that must never change is that it can still fail: a re-homed row that cannot fail is a
 * deleted row wearing a new name, and `B-2` exists to prove this one can (it drives the subset
 * assertion over a synthetic edit set that must be refused, and over the declared set itself,
 * which must be admitted).
 *
 * THE SCOPE IS DECLARED AND EACH ENTRY IS NAMED — the precedent's discipline (`RCA-8(d)`): a
 * path is here because THIS pass wrote it or because it is the unit's own, and a fourth path
 * added by a future pass WITHOUT naming it here reddens rather than sliding through.
 *
 * **IT IS RED ON A DIRTY TREE BY CONSTRUCTION** — that is the instrument working, not a defect:
 * the reading is `git status --porcelain` over the whole repository, and the supervisor commits
 * at the gate boundary. Nothing in this file may be weakened to make a dirty tree green.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))

/**
 * **THE DECLARED SCOPE — THE PATHS THIS PASS AND THIS UNIT OWN**, each with the reason it is
 * admissible. A SUBSET ASSERTION OVER THIS SET IS THE WHOLE CLAIM: nothing outside it may be
 * edited, and the reasons are what make a path's presence reviewable rather than habitual.
 */
const DECLARED_SCOPE: readonly string[] = [
  // ── THE UNIT'S OWN SOURCE: the shape's vocabulary (both realms), the crossing module that
  //    declares the two addresses, and the renderer-side client that holds the shape.
  'src/shared/view-shape.ts',
  'src/main/view-record/index.ts',
  'src/renderer/view-client.ts',
  // ── THE WIRING THE SWAP LANDED: the drag's reads, the focus carrier and the boot's one
  //    subscription. It is the ONE `src/` file outside this unit's address space that the swap
  //    edits, and it is NAMED here rather than admitted by a prefix.
  'src/renderer/renderer.ts',
  // ── THE THIRD FAMILY'S CROSSING (D-91), named path by path because a bridge route is never one
  //    file's: the zone family's address, declaration and route live in `view-record` (already
  //    above), and they reach a caller only through the surface's read answer and shape arm, the
  //    shared channel module, the boot's batch and handler, and BOTH lockstep halves of the
  //    `view` member. This pass writes each of those six, and not one is admitted by a prefix.
  'src/main/view-surface/index.ts',
  'src/shared/view-channels.ts',
  'src/main/main.ts',
  'src/main/preload.ts',
  'src/renderer/secure-panels.ts',
  // ── THIS PASS'S OWN BATTERY: the four clauses driven per address for the zone family. It is the
  //    unit's fourth test file and it is listed here for the same reason the other three are.
  'tests/integration/store-view-record/zone-family.test.ts',
  // ── THE BATTERIES: this unit's own three, and the four flat files whose rows pinned the
  //    machinery the swap replaces and were re-grained onto the shape and the route call log.
  'tests/integration/store-view-record/boundary.test.ts',
  'tests/integration/store-view-record/client.test.ts',
  'tests/integration/store-view-record/crossing.test.ts',
  'tests/store-focus.test.ts',
  'tests/pane-drag-compliance.test.ts',
  'tests/store-modules-seams.test.ts',
  // ── THE RETIREMENT: the file D-30 replaced whole, deleted with the region it pinned, and the
  //    two rows that read a constant off it (the register it declared and the theme census that
  //    read that constant by path) re-grained rather than left pointing at a deleted file.
  'tests/store-tabs-record.test.ts',
  'tests/store-tabs-record-register.ts',
  'tests/theme-control.test.ts',
  // ── THE ROWS THAT READ A DELETED MECHANISM AND SAY SO: the store-read admission that named
  //    the focus mirror's literal resolve site (`fork-store-reads`' `S-9`), and the sibling-
  //    artifact exclusion that charged this pass's new renderer file to another unit
  //    (`gesture-session`'s `F-9(b)`).
  'tests/fork-store-reads.test.ts',
  'tests/gesture-session.test.ts',
  // ── THE LIVE DRIVER: its rows were re-pointed at the crossing's shapes and its unrun status stated.
  'tests/store-tabs-record-live.mjs',
  // ── THE CORPUS (the record of this pass) AND THE TWO LAYER DOCUMENTS WHOSE CONTRACTS THE SWAP
  //    MAKES TRUE: the client's contract, and the design that names the chain it implements.
  'strata/decisions.md',
  'strata/next-steps.md',
  'strata/brief.md',
  'strata/marks.json',
  'strata/modules.json',
  'strata/records/store-tabs-record-unit.md',
  'docs/L2/view-record/interface.md',
  'docs/L3/view-record/design.md',
]

/** **THE SET-SHAPE CLAIM, STATED AS ITS OWN TERM**: a duplicate path inflates a count without
 *  widening a scope, so the declared set is compared against its own members. */
const DECLARED_SCOPE_IS_A_SET = new Set(DECLARED_SCOPE).size === DECLARED_SCOPE.length

/**
 * **THE POSITIVE CONTROL** — a path outside the union. It is deliberately a REAL file in this
 * repository (an MCP-surface module the purge never touches), so the control cannot be
 * satisfied by a string that names nothing.
 */
const EDIT_SET_OFFENDER_FIXTURE = 'src/main/mcp-server.ts'

/** `edit-set ⊆ declared scope`, as a SET, with the offenders NAMED rather than counted. */
function editSetIsSubset(changed: readonly string[], scope: readonly string[]): { readonly ok: boolean; readonly offenders: readonly string[] } {
  const offenders = changed.filter((path) => !scope.includes(path))
  return { ok: offenders.length === 0, offenders }
}

/** **THE EDIT SET, READ OFF THE TREE ITSELF** — porcelain lines are `XY <path>`, so the path is
 *  sliced from index 3 and the line is NOT trimmed first (an unstaged modification reads
 *  `" M tests/…"`, and trimming before the slice shifted the path by one byte — the
 *  `RCA-8(d)` defect the retired register kept visible). A RENAME carries `old -> new`; the
 *  destination is the path that must be declared, and a DELETION is a path this pass removed,
 *  which is exactly as much of an edit as a write. */
function editSetFromWorkingTree(): readonly string[] {
  let out: string
  try {
    out = execFileSync('git', ['status', '--porcelain'], { cwd: REPO_ROOT, encoding: 'utf8' }) as unknown as string
  } catch {
    return ['__GIT_READING_FAILED__']
  }
  return out
    .split('\n')
    .filter((line) => line.length > 3)
    .map((line) => {
      const path = line.slice(3)
      const arrow = path.indexOf(' -> ')
      return (arrow >= 0 ? path.slice(arrow + 4) : path).trim()
    })
    .filter((entry) => entry.length > 0)
}

describe('store-view-record · THE WORKTREE BOUNDARY (re-homed from `tests/store-tabs-record.test.ts` `S-1`)', () => {
  it('B-1 · `edit-set ⊆ declared scope`, asserted AS A SET and never as a count — and the declared scope is a set (no duplicate path inflates it)', () => {
    expect(DECLARED_SCOPE_IS_A_SET, 'the declared scope carries no duplicate path').toBe(true)
    expect(DECLARED_SCOPE).toContain('src/main/view-record/index.ts')
    expect(DECLARED_SCOPE.some((path) => path.startsWith('src/main/')), 'this unit OWNS main-side paths — the retired row denied them, which is why it could not measure this pass').toBe(true)
    const changed = editSetFromWorkingTree()
    const subset = editSetIsSubset(changed, DECLARED_SCOPE)
    expect(
      subset.ok,
      `edits outside the union: ${JSON.stringify(subset.offenders)} — a path this pass wrote must be DECLARED here with its reason; this row is red BY CONSTRUCTION on a dirty tree and is never touched to make one green`,
    ).toBe(true)
  })

  it('B-2 · **THE ROW CAN STILL FAIL** — the same instrument refuses an edit outside the union, refuses an UNDECLARED SIBLING of a declared path, and ADMITS the declared set itself; a re-homed row that cannot fail is a deleted row wearing a new name', () => {
    // (a) A PATH OUTSIDE THE UNION FAILS — the positive control `C-9` requires.
    const control = editSetIsSubset([EDIT_SET_OFFENDER_FIXTURE], DECLARED_SCOPE)
    expect(control.ok, 'the control path is outside the union and MUST fail it').toBe(false)
    expect(control.offenders, 'and the offender is NAMED, never merely counted').toEqual([EDIT_SET_OFFENDER_FIXTURE])
    // (b) A PATH ONE SEGMENT OFF A DECLARED PATH FAILS TOO — the set is exact membership and not a prefix match, so
    //     `src/main/view-record/` being declared cannot admit a fourth module in that directory.
    expect(editSetIsSubset(['src/main/view-record/extra.ts'], DECLARED_SCOPE).ok, 'the scope admits no undeclared sibling').toBe(false)
    expect(editSetIsSubset(['src/renderer/view-client2.ts'], DECLARED_SCOPE).ok, 'and no near-miss of a declared name').toBe(false)
    // (c) THE DECLARED SET IS ADMITTED WHOLE — the instrument is not simply always-red, which is how a boundary row lies.
    expect(editSetIsSubset(DECLARED_SCOPE, DECLARED_SCOPE).ok, 'every declared path is admissible, so the assertion has two arms').toBe(true)
  })

  it('B-3 · THE READING IS THE TREE\'S AND NOT A LIST — the edit set is read from `git status --porcelain` over the whole repository, so a pass that edits a path and forgets to declare it reddens `B-1` rather than reporting a clean scope', () => {
    const changed = editSetFromWorkingTree()
    // (a) The instrument answers a LIST (possibly empty, on a committed tree) and never a placeholder, unless the READ
    //     itself failed — in which case the sentinel is returned and the subset assertion FAILS, which is the honest arm.
    expect(Array.isArray(changed)).toBe(true)
    expect(changed.includes('__GIT_READING_FAILED__'), 'a failed git read must surface as a red row, never as an empty set').toBe(false)
    // (b) THE INSTRUMENT IS NOT VACUOUS: over the tree as it stands during this pass, the reading carries this unit's own
    //     files at least while they are uncommitted; once committed the list is empty and the reading still answers a list.
    //     So the bite is the assertion in (a) plus the CONTROL in `B-2`, never a claim about today's list.
    expect(changed.every((path) => path.length > 0), 'no empty or mangled path survives the slice').toBe(true)
  })
})
