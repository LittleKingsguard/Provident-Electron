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
 * **THE SCOPE IS NO LONGER A HAND LIST — IT IS A COMPUTATION OVER THE DECLARATIONS IN FLIGHT, AND THAT IS
 * `D-301`'s GRAIN LANDED ON THIS ROW** (`docs/L1/boundary-grain.md` §2, §4, §5). The 262 standing entries
 * this file used to carry are RETIRED WHOLE (design §4): they were permissions for paths no pass was
 * touching, each block's argument already living in the `D-n` it cited, git being the history (D-1, D-2).
 * What `B-1` compares the tree against is now `declaredScope(readInFlightDeclarations(editSetFromWorkingTree()))`
 * — the concatenation, IN PAGE ORDER, of every in-flight `boundary-declared` block's `writes[].path`, NEVER
 * de-duplicated — read through the one reader both boundary readings import
 * (`tests/e2e/boundary-grain/declarations.ts`, L1's). A path is admitted because a SEAT DECLARED it, in this
 * same worktree, with its own reason and its own resolving `D-n`, on a page the tree itself shows as in
 * flight; a declaration dies at the commit that lands it, so no entry can harden into a standing permission
 * (D-146, design §2). **THE RULE DID NOT MOVE**: an entry is still a FILE carrying its own reason, never a
 * directory, never a prefix, never a glob, and `B-2`'s three controls and `B-3`'s reading are byte-identical
 * (D-301, `ASM-BG-1`). **AND THE IMPORT IS A NAMED COUPLING, NOT AN ACCIDENT**: this gating row now reads a
 * path its own module does not claim, which `modules.md` §1 calls a boundary crossing — accepted because one
 * reader beats two, and the reader's own claim is L1's (design §5).
 *
 * **TWO OF `B-1`'S OLD ASSERTIONS RETIRED WITH THE LIST, AND WHAT THEY PROTECTED MOVED TO A FIXTURE**
 * (design §2, `E-7`): `toContain('src/main/view-record/index.ts')` and the `startsWith('src/main/')` arm
 * asserted the CONTENT OF A HAND LIST. With the union computed, an empty scope is lawful on a clean tree, so
 * the replacement is `P-6`'s lawful fixture in `tests/e2e/boundary-grain/declarations.test.ts` — it carries a
 * `src/main/` entry and asserts that `declaredScope` ADMITS it, tree-independently — while `B-2(a)`'s positive
 * control still names a real `src/main/` file that must be REFUSED, so both directions survive (D-301).
 *
 * **IT IS RED ON A DIRTY TREE BY CONSTRUCTION** — that is the instrument working, not a defect:
 * the reading is `git status --porcelain --untracked-files=all` over the whole repository, and the
 * supervisor commits at the gate boundary. Nothing in this file may be weakened to make a dirty tree
 * green. **THE FLAG IS NOT DECORATION, AND `focus-retirement` MEASURED WHY**: a bare `--porcelain`
 * collapses a wholly untracked directory into ONE line that names no file (`docs/L2/app-shell/`), so
 * a scope written to satisfy that reading has to declare the DIRECTORY — and a declared directory
 * admits every file a later pass drops under it, which is a path that measures nothing. Enumerated,
 * each new file is its own offender until it is declared by name, and the near-miss arm of `B-2`
 * bites on a new filename in a directory this union already carries.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'
import { declaredScope, editSetFromWorkingTree, readInFlightDeclarations } from '../../e2e/boundary-grain/declarations'

/**
 * **THE DECLARED SCOPE IS A COMPUTATION AND NOT A LIST** (design §2, §4): the concatenation, in page order, of
 * every IN-FLIGHT declaration's `writes[].path` — **never de-duplicated**, so `DECLARED_SCOPE_IS_A_SET` below
 * still bites on one path two seats declare (`D-146`'s rule, mechanically). A declaration counts **iff its own
 * page is in the edit set**, which is the same single `git` reading `B-3` drives and no second instrument
 * (D-45 ii); the filter runs before the parse, so a committed page's block is history and cannot red this row.
 *
 * **AN EMPTY SCOPE IS LAWFUL ON A CLEAN TREE AND `B-2` IS WHAT KEEPS THE ROW FROM BEING VACUOUS THERE**: the
 * falsifier's live half is `P-6`'s fixture (`docs/L1/boundary-grain.md` §2, `E-7`), and `B-2`'s three controls
 * still drive the same instrument over synthetic edit sets (D-301).
 */
const DECLARED_SCOPE: readonly string[] = declaredScope(readInFlightDeclarations(editSetFromWorkingTree()))

/** **THE SET-SHAPE CLAIM, STATED AS ITS OWN TERM**: a duplicate path inflates a count without
 *  widening a scope, so the declared set is compared against its own members. */
const DECLARED_SCOPE_IS_A_SET = new Set(DECLARED_SCOPE).size === DECLARED_SCOPE.length

/**
 * **THE POSITIVE CONTROL** — a path outside the union. It is deliberately a REAL file in this
 * repository (an MCP-surface module the purge never touches), so the control cannot be
 * satisfied by a string that names nothing.
 */
const EDIT_SET_OFFENDER_FIXTURE = 'src/main/security.ts' // `D-101`: a real MCP-surface module no pass has touched and
// no in-flight declaration names — the union is computed, so the control is a path outside every declaration.

/** `edit-set ⊆ declared scope`, as a SET, with the offenders NAMED rather than counted. */
function editSetIsSubset(changed: readonly string[], scope: readonly string[]): { readonly ok: boolean; readonly offenders: readonly string[] } {
  const offenders = changed.filter((path) => !scope.includes(path))
  return { ok: offenders.length === 0, offenders }
}

// **THE EDIT SET, READ OFF THE TREE ITSELF, IS NO LONGER SPELLED HERE** — `editSetFromWorkingTree` moved to
// `tests/e2e/boundary-grain/declarations.ts` WITH its docblock's measurements (the `--untracked-files=all`
// reason, the slice-at-3 defect, the rename destination and the deletion), and this file IMPORTS IT BACK so
// there is one reader and not two (design §2, §5). `B-3` drives that import unchanged.

describe('store-view-record · THE WORKTREE BOUNDARY (re-homed from `tests/store-tabs-record.test.ts` `S-1`)', () => {
  it('B-1 · `edit-set ⊆ declared scope`, asserted AS A SET and never as a count — and the declared scope is a set (no duplicate path inflates it)', () => {
    expect(DECLARED_SCOPE_IS_A_SET, 'the declared scope carries no duplicate path').toBe(true)
    // THE TWO CONTENT ASSERTIONS THAT STOOD HERE ARE RETIRED WITH THE HAND LIST, NOT RELAXED: they asserted the
    // CONTENT of a list (`toContain('src/main/view-record/index.ts')` and a `startsWith('src/main/')` arm), and the
    // list is now computed. Their subject is `P-6`'s lawful fixture, which carries a `src/main/` entry and asserts
    // `declaredScope` admits it tree-independently, while `B-2(a)` still REFUSES a real `src/main/` path (design §2,
    // `E-7`, D-301). The set-shape arm and the subset assertion below are untouched.
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
    //     AND THE SAME BITE ONE LEVEL OUT, ON THE FORM `focus-retirement` WAS TEMPTED BY: a DIRECTORY carries no entry
    //     here, so a second document dropped beside the four this unit declares is an offender by name — which is what
    //     `--untracked-files=all` makes visible and what a declared `docs/L2/app-shell/` prefix would have hidden.
    expect(editSetIsSubset(['docs/L2/app-shell/protocol.md'], DECLARED_SCOPE).ok, 'a declared FILE admits no undeclared sibling').toBe(false)
    expect(editSetIsSubset(['docs/L2/app-shell/'], DECLARED_SCOPE).ok, 'and no directory spelling of a declared file is admissible either').toBe(false)
    // (c) THE DECLARED SET IS ADMITTED WHOLE — the instrument is not simply always-red, which is how a boundary row lies.
    expect(editSetIsSubset(DECLARED_SCOPE, DECLARED_SCOPE).ok, 'every declared path is admissible, so the assertion has two arms').toBe(true)
  })

  it('B-3 · THE READING IS THE TREE\'S AND NOT A LIST — the edit set is read from `git status --porcelain --untracked-files=all` over the whole repository, so a pass that edits a path and forgets to declare it reddens `B-1` rather than reporting a clean scope', () => {
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
