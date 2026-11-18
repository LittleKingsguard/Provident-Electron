// tests/e2e/boundary-grain/declarations.test.ts — `P`, THE PER-SEAT READING: every `boundary-declared`
// block on a page the worktree ITSELF shows as in flight must be lawful, entry by entry (`P-1`…`P-7`).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40).
/**
 * ============================================================================
 * WHAT THIS ROW IS, AND WHAT IT MUST NEVER BECOME.
 *
 * `docs/L1/boundary-grain.md` §2 splits the boundary instrument into TWO readings and neither is useful
 * alone. `W` (`tests/integration/store-view-record/boundary.test.ts`) reads the WHOLE TREE and asserts
 * `edit-set ⊆ declared scope`. `P` — this file — reads the DECLARATIONS and asserts that each one is a
 * lawful permission: a file, carrying its own reason, in its own seat, for a path this pass actually
 * dirtied. Each is blind exactly where the other reads, and that is the whole economy of the split
 * (D-43: neither may restate the other's fact). Together they are ONE equality — `B-1` asserts
 * `dirty ⊆ declared` and `P-5` asserts `declared ⊆ dirty`, so `declared == edit set`: every dirty path
 * carries a written reason and no reason is attached to a path nobody touched (design §2, E-14).
 *
 * WHAT THIS ROW MUST NEVER BECOME, SAID SO IT IS NOT RE-DERIVED (D-301, `ASM-BG-2`):
 *   · NOT A SECOND WHOLE-TREE READING. `P` asserts nothing about the edit set as a subject; it reads
 *     that set only to know which declarations are IN FLIGHT and which entries name a path somebody
 *     touched. A narrower copy of `B-1` here would be a second reading of one fact.
 *   · NOT A CENSUS OF THE DIRTY TREE. A reading that answered "every dirty path is declared" by
 *     CONSTRUCTING the declaration from the diff would be a row that cannot fail (D-30, D-40).
 *   · NOT A RELAXATION OF THE RULE. An entry is a FILE carrying its own reason, never a directory,
 *     never a prefix, never a glob — `P-2` is the mechanical witness that rule never had, because a
 *     declared directory or glob matches no porcelain path and is therefore INERT in `W` (§1, `E-9`).
 *
 * THE IN-FLIGHT RULE IS THE WHOLE SCOPING RULE (D-1, D-146, design §2): a declaration counts iff its
 * OWN PAGE is in the worktree edit set. A committed declaration is inert because git is the history, so
 * a declaration dies at the commit that lands it and can never become a standing permission. `P-5` is
 * what makes that clause bite rather than merely hold: an entry for a clean path is refused.
 *
 * **THE VALIDATOR LIVES HERE AND THE READER DOES NOT (E-4, D-14).** `./declarations.ts` exports exactly
 * four VALUES — `editSetFromWorkingTree`, `parseDeclarationBlocks`, `readInFlightDeclarations`,
 * `declaredScope` — which are the map row's `endpoints: 4` and therefore its `50 + 10×4 = 90`-line cap.
 * `declarationProblems`, the `D-n` resolver, the fixtures, the duplicate detector and every arm are
 * HERE, because `W` needs the reader and no validator, and a battery is evidence while a harness is
 * capped. This file drives the reader; it adds no second copy of any of it.
 *
 * NO ROW HERE IMPORTS `src/**` OR `scripts/**`, spawns Electron, or reaches the network: this row reads
 * a child process's answer (`git`) and the corpus's own files, which is why it is a battery row and not
 * a new instrument (D-45 ii). Every `D-n` it cites resolves against `strata/decisions.md`, and every
 * count it asserts is DERIVED from the fixture in the row rather than restated from another document
 * (D-43).
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import {
  declaredScope,
  editSetFromWorkingTree,
  parseDeclarationBlocks,
  readInFlightDeclarations,
  type Declaration,
  type DeclarationEntry,
} from './declarations'

/** The repo root — the same expression, from the same directory, the reader uses for its `git` cwd. */
const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))

/** **THE RESOLVABLE `D-n` SET**, read once from the corpus the way the corpus's own `refs` reads it. It is
 *  passed INTO the validator so a fixture can name a phantom row without editing `strata/decisions.md`
 *  (D-45 ii: the row drives the comparator; the corpus is not the fixture). */
const DECISION_ROWS = decisionRowIds(readFileSync(join(REPO_ROOT, 'strata/decisions.md'), 'utf8'))

/** **THE SENTINEL A FAILED `git` READ ANSWERS** — the reader's contract, spelled here because a reading that
 *  answered `[]` on a failed spawn would report a clean tree it never measured (D-74, `B-3`). */
const SENTINEL = '__GIT_READING_FAILED__'

/** **`P-4`'s TABLE, SPELLED FROM THE DESIGN AND NOT IMPORTED** (design §3): L1 → `docs/L1/`, L2 →
 *  `docs/L2/<module>/`, L3 → `docs/L3/<module>/`, **L0 → `strata/`** — its own pages and `strata/records/`,
 *  because L0's routine writes are `strata/decisions.md`, `brief.md`, `pending.md` and the records, and a
 *  home that did not reach them left this tree's own charter file undeclarable (E-1). It is spelled here
 *  rather than exported by the reader because the reader's four exported values are its whole `endpoints`
 *  count (E-4); `P-1` asserts the corpus carries all four. */
const DECLARATION_HOMES = ['docs/L1', 'docs/L2', 'docs/L3', 'strata'] as const

/** The layers a declaration may CLAIM. L4 is absent on purpose: it owns no design and declares nothing —
 *  its landing is declared by its L3 page with `by: "L4"`, which is `P-4`'s one named exception (E-3). */
const DECLARABLE_LAYERS: ReadonlySet<string> = new Set(['L0', 'L1', 'L2', 'L3'])

/** The fence info string the format is written with (design §3). Spelled here so `P-1` can prove, through
 *  the reader's own behaviour, that a block whose info string is not EXACTLY this is not a declaration. */
const DECLARATION_FENCE = 'boundary-declared'

/** **A FIXTURE PAGE, AND NO SUCH FILE EXISTS OR IS EXPECTED.** `P-4` reads a page's LOCATION and never its
 *  existence — whether a page is in flight is the reader's filter (`P-1`) — so a fixture declaration needs
 *  a location and not a file. Every fixture below names a page so its only defect is the one the arm is
 *  about. */
const FIXTURE_PAGE = 'docs/L1/boundary-grain-fixture.md'
const FIXTURE_SECOND_PAGE = 'docs/L1/boundary-grain-fixture-second.md'

/** **A REAL FILE THIS PASS'S LANDING DIRTIED** — the L1 design page, present in the worktree and in the
 *  edit set — used wherever a fixture entry must be lawful in every respect but the one under test. A
 *  fixture that could not satisfy `P-2` and `P-5` would make every arm below prove the same thing. */
const REAL_PAGE = 'docs/L1/boundary-grain.md'

/** The other three homes' fixture pages, each a REAL page (or a real module directory) so a refusal below
 *  is about the DECLARED SEAT and not about a page nobody could place. */
const L2_PAGE = 'docs/L2/app-shell/interface.md'
const L3_PAGE = 'docs/L3/app-shell/design.md'
const L0_PAGE = 'strata/records/boundary-grain-unit.md'
const NO_HOME_PAGE = 'src/main/main.ts'

/** **A REAL `src/main/` FILE, AND THE SUBJECT `E-7` MOVED TO THIS GRAIN**: `B-1`'s two retired content
 *  assertions (`toContain('src/main/view-record/index.ts')` and the `startsWith('src/main/')` arm) asserted
 *  the content of a HAND LIST. With the union computed, an empty scope is lawful on a clean tree, so the
 *  replacement is `P-6`'s lawful fixture: it declares this path and asserts that `declaredScope` ADMITS it,
 *  tree-independently (design §2, E-7). */
const SRC_MAIN = 'src/main/view-record/index.ts'

/** The corpus's filed rows, read the way `scripts/strata-walkthrough.mjs refs` reads them: a `## D-n` header. */
function decisionRowIds(text: string): Set<string> {
  return new Set([...text.matchAll(/^## (D-\d+)/gm)].map((match) => match[1]))
}

/** The `D-n` tokens in one string, in order. Only a token the ENTRY names in `d` must resolve: a `why`
 *  sentence may legitimately name another register's row — the qualification clause the `refs` idiom
 *  carries (D-1). */
const decisionIdsIn = (text: string): string[] => [...text.matchAll(/\bD-\d+\b/g)].map((match) => match[0])

/** The seat a page's own location declares (`P-4`'s table, design §3). A page in no home answers `null` and
 *  is refused by name rather than guessed at. */
function seatOf(page: string): { readonly layer: string; readonly module: string | null } | null {
  if (page.startsWith('docs/L1/') && page.length > 'docs/L1/'.length) return { layer: 'L1', module: null }
  const l2 = /^docs\/L2\/([^/]+)\//.exec(page)
  if (l2 !== null) return { layer: 'L2', module: l2[1] }
  const l3 = /^docs\/L3\/([^/]+)\//.exec(page)
  if (l3 !== null) return { layer: 'L3', module: l3[1] }
  if (page.startsWith('strata/') && page.length > 'strata/'.length) return { layer: 'L0', module: null }
  return null
}

const isFileInWorktree = (path: string): boolean => {
  try {
    return statSync(join(REPO_ROOT, path)).isFile()
  } catch {
    return false
  }
}

/** **A UNIT THE STATE LEDGER CARRIES IS A SEAT SOMEBODY CAN CHECK (E-2)**: `strata/.strata/units/<unit>.json`
 *  exists. A block naming a unit no transition ever wrote is refused by name, because a declaration whose
 *  seat the ledger does not carry is a claim about nobody (design §2 `P-4`). */
const isLedgerUnit = (unit: string): boolean => existsSync(join(REPO_ROOT, 'strata/.strata/units', `${unit}.json`))

/** **THE PATHS `HEAD` TRACKS, READ ONCE.** An entry that declares a DELETION names a file that is no longer
 *  in the worktree, and `git status` reports the removal like any other edit — so the file test is "in the
 *  worktree OR at HEAD", and the two arms together with `P-5` are exact: a path tracked at HEAD and CLEAN is
 *  refused by `P-5`, so the HEAD arm cannot admit a stale entry. A failed read answers the empty set, which
 *  refuses by name rather than admitting by silence (D-74). */
let HEAD_TRACKED: ReadonlySet<string> | null = null
function headTrackedPaths(): ReadonlySet<string> {
  if (HEAD_TRACKED !== null) return HEAD_TRACKED
  try {
    const out = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', 'HEAD'], { cwd: REPO_ROOT, encoding: 'utf8' })
    HEAD_TRACKED = new Set(out.split('\0').filter((path) => path.length > 0))
  } catch {
    HEAD_TRACKED = new Set<string>()
  }
  return HEAD_TRACKED
}

/**
 * **THE VALIDATOR — `P-2`…`P-5`, ONE NAMED PROBLEM PER VIOLATION, `[]` WHEN LAWFUL (E-4: it lives in the
 * battery, not in the reader).**
 *
 * It takes its arguments and reads nothing it was not given, except three READ-ONLY probes of the corpus:
 * whether a declared path is a file in the worktree, whether it is tracked at HEAD (a DELETION is a path
 * this pass removed), and whether the declaration's `unit` is one the state ledger carries. All three are
 * cached or cheap, and `resolveRows` is passed IN so a fixture can name a phantom row without editing
 * `strata/decisions.md` (D-45 ii).
 *
 * THE ARMS, EACH NAMED IN ITS PROBLEM STRING SO A RED SAYS WHICH ONE BIT:
 *   `P-2` an entry is a FILE — repo-relative, POSIX, no leading `/`, no `..` segment, no trailing `/`, no
 *         `* ? [ {`, and it names a file (present in the worktree, or tracked at HEAD for a deletion); one
 *         entry per path, so a repeated path inside one declaration is refused too. A DIRECTORY is refused
 *         BY NAME — the refusal `B-2(b)` samples FOUR times (`src/main/view-record/extra.ts`,
 *         `src/renderer/view-client2.ts`, `docs/L2/app-shell/protocol.md`, `docs/L2/app-shell/`), because
 *         membership is exact string equality and a declared directory or glob is inert in `W` (E-9).
 *   `P-3` an entry carries its own REASON — `why` non-empty after trim, and a `D-n` that resolves against
 *         the corpus's `## D-n` headers (the `refs` idiom).
 *   `P-4` a declaration is its SEAT's — `layer` ∈ {L0,L1,L2,L3} and the page's own location agrees;
 *         `unit` names a unit the state ledger carries; and every entry's `by` is the declaring layer, or
 *         `L4` inside an `L3` declaration — the one named exception, because L4 owns no design and receives
 *         the exact write it makes (brief §3, §4; E-3).
 *   `P-5` NO STANDING PERMISSION — every declared path is in the edit set, so an entry for a clean path
 *         reds and a declaration cannot outlive its write or be pre-filed for a later pass.
 */
function declarationProblems(declaration: Declaration, editSet: readonly string[], resolveRows: ReadonlySet<string>): readonly string[] {
  const problems: string[] = []
  const inEditSet = new Set(editSet)

  // ── `P-4` FIRST, BECAUSE IT IS ABOUT THE PAGE AND NOT THE ENTRIES ──────────────────────────────────────
  const seat = seatOf(declaration.page)
  if (seat === null) {
    problems.push(
      `P-4 misplaced: ${declaration.page} — a declaration lives in one of ${DECLARATION_HOMES.join(', ')}; a page in no home declares for no seat (D-3, design §3)`,
    )
  }
  if (!DECLARABLE_LAYERS.has(declaration.layer)) {
    problems.push(
      `P-4 unknown-layer: ${declaration.page} declares layer ${JSON.stringify(declaration.layer)} — the layers are L0, L1, L2, L3, and L4 declares nothing (D-3, design §3)`,
    )
  } else if (seat !== null && declaration.layer !== seat.layer) {
    problems.push(
      `P-4 wrong-layer: ${declaration.page} declares layer ${JSON.stringify(declaration.layer)} over a page whose own location is ${seat.layer} — a declaration is its seat's (D-3, design §3)`,
    )
  }
  if (seat !== null && declaration.module !== seat.module) {
    problems.push(
      `P-4 wrong-module: ${declaration.page} declares module ${JSON.stringify(declaration.module)} over a page whose own location is ${JSON.stringify(seat.module)} — the page's location is the authority (D-3, design §3)`,
    )
  }
  if (declaration.unit.trim().length === 0) {
    problems.push(`P-4 missing-unit: ${declaration.page} declares no \`unit\` — the block names the seat that authored it (design §3)`)
  } else if (!isLedgerUnit(declaration.unit)) {
    problems.push(
      `P-4 unknown-unit: ${declaration.unit} — no strata/.strata/units/${declaration.unit}.json, so the state ledger carries no such unit; a seat nobody can check declares for nobody (E-2, design §2)`,
    )
  }

  // ── `P-2`, `P-3`, `P-4`'s `by`, `P-5` PER ENTRY, IN DECLARATION ORDER ──────────────────────────────────
  const seen = new Set<string>()
  for (const write of declaration.writes) {
    const path = write.path

    // `P-2` — THE SPELLING. Each defect is its own string, because a reader fixing one must not have to guess
    // which of six rules a single complaint meant (D-74).
    let spelled = true
    if (path.length === 0) {
      problems.push(`P-2 empty-path: ${declaration.page} carries an entry with no \`path\` — an entry names the file it wrote (D-301)`)
      spelled = false
    } else {
      if (path.startsWith('/') || /^[A-Za-z]:/.test(path)) {
        problems.push(`P-2 not-repo-relative: ${path} — an entry is a REPO-RELATIVE path, never absolute; the reading compares it to porcelain's own spelling (D-301)`)
        spelled = false
      }
      if (path.includes('\\')) {
        problems.push(`P-2 not-posix: ${path} — an entry is POSIX-separated, so it can equal a porcelain path on every host (D-301)`)
        spelled = false
      }
      if (path.split('/').includes('..')) {
        problems.push(`P-2 parent-segment: ${path} — an entry carries no \`..\` segment; a path that climbs is a path that names another seat's file (D-3, D-301)`)
        spelled = false
      }
      if (path.endsWith('/')) {
        problems.push(`P-2 trailing-slash: ${path} — an entry is a FILE, never a directory; a declared directory admits every file a later pass drops under it (D-301, \`ASM-BG-1\`)`)
        spelled = false
      }
      if (/[*?[{]/.test(path)) {
        problems.push(`P-2 glob: ${path} — an entry carries no \`*\`, \`?\`, \`[\` or \`{\`; a glob matches no porcelain path and is inert (D-301, \`ASM-BG-1\`)`)
        spelled = false
      }
    }

    // `P-2` — ONE ENTRY PER PATH. A second entry for the same path inflates the declaration without widening
    // it, and it is refused HERE rather than de-duplicated later: `declaredScope` must KEEP the duplicate so
    // `W`'s `DECLARED_SCOPE_IS_A_SET` arm can still fail on a path two SEATS declare (`P-7` names both).
    if (seen.has(path)) {
      problems.push(`P-2 duplicate-entry: ${path} — one entry per path written; a repeated entry inflates a declaration without widening it (D-146, design §3)`)
    }
    seen.add(path)

    // `P-2` — IT NAMES A FILE. Resolved only when the spelling is sound: a path whose spelling is refused is
    // not resolved against the tree, because the answer would be about a path no reader could compare.
    if (spelled && path.length > 0 && !isFileInWorktree(path) && !headTrackedPaths().has(path)) {
      problems.push(
        `P-2 not-a-file: ${path} — an entry names a FILE present in the worktree, or one tracked at HEAD when the entry declares a DELETION; a directory, a near-miss sibling and a path that never existed all read the same here, and all are refused (D-301)`,
      )
    }

    // `P-3` — THE REASON, AND THE ROW THAT AUTHORIZED IT.
    if (write.why.trim().length === 0) {
      problems.push(`P-3 missing-why: ${path} — \`why\` is the reason the rule exists for, and it is non-empty after trim (design §3, D-1)`)
    }
    const cited = decisionIdsIn(write.d)
    if (cited.length === 0) {
      const fromWhy = decisionIdsIn(write.why).filter((id) => resolveRows.has(id))
      if (fromWhy.length === 0) {
        problems.push(
          `P-3 missing-d: ${path} — the entry cites no \`D-n\` that resolves; \`d\` names the row that authorized the write, and a reason with no provenance is prose (D-1, design §3)`,
        )
      }
    } else {
      for (const id of cited) {
        if (!resolveRows.has(id)) {
          problems.push(`P-3 unresolved-d: ${path} cites ${id}, which is not a filed row — the \`refs\` idiom applied to the one place a reason is authored (D-1, design §3)`)
        }
      }
    }

    // `P-4` — `by`, THE LAYER THAT MADE THE WRITE (E-3). The default is the block's `layer`, resolved by the
    // parser, so this arm only ever sees a FOREIGN `by`: `L4` inside an `L3` declaration is the one named
    // exception — L4 owns no design and receives the exact write it makes (brief §3, §4) — and every other
    // foreign layer is refused by name.
    if (write.by !== declaration.layer) {
      if (write.by === 'L4' && declaration.layer === 'L3') {
        // LAWFUL, AND DELIBERATELY NOTHING ELSE: the landing of an L4 write, declared by the L3 page it lands under.
      } else if (write.by === 'L4') {
        problems.push(
          `P-4 by-l4-outside-l3: ${path} — \`by: "L4"\` is lawful ONLY inside an L3 declaration, because L4 owns no design and declares nothing of its own; a ${declaration.layer} page cannot receive an L4 landing (E-3, brief §3)`,
        )
      } else {
        problems.push(
          `P-4 foreign-by: ${path} declares \`by: "${write.by}"\` over a ${declaration.layer} declaration — an entry's \`by\` is the declaring layer or the one named L4 exception, and nothing else (E-3, design §2)`,
        )
      }
    }

    // `P-5` — NO STANDING PERMISSION. This is the arm that makes a declaration die at its landing commit, and
    // the arm that turns a failed `git` read into a red row through the validator too: the sentinel is in no
    // declaration, so every entry is refused.
    if (!inEditSet.has(path)) {
      problems.push(
        `P-5 clean-path: ${path} — the path is not in the worktree's edit set; a declaration cannot outlive its write and cannot be pre-filed for a later pass (D-146, D-301)`,
      )
    }
  }

  return problems
}

/**
 * **`P-7`'s DETECTOR — NO PATH IS DECLARED TWICE, AND THE COMPLAINT NAMES THE PATH AND BOTH DECLARING PAGES
 * (E-6).** `declaredScope` deliberately KEEPS duplicates so `W`'s `DECLARED_SCOPE_IS_A_SET` arm can fail; a
 * boolean that names nothing would be the silence D-74 refuses, and the second seat's fix (drop its own
 * entry) is inside its own scope, so the detector has to say which two pages to look at (design §2).
 */
function crossSeatDuplicates(declarations: readonly Declaration[]): readonly string[] {
  const declaredBy = new Map<string, string[]>()
  for (const declaration of declarations) {
    for (const write of declaration.writes) {
      const pages = declaredBy.get(write.path)
      if (pages === undefined) declaredBy.set(write.path, [declaration.page])
      else if (!pages.includes(declaration.page)) pages.push(declaration.page)
    }
  }
  return [...declaredBy]
    .filter(([, pages]) => pages.length > 1)
    .map(
      ([path, pages]) =>
        `P-7 duplicate-path: ${path} — declared by ${pages.join(' and ')}; one path is declared by the seat that WRITES it, and the second seat's fix is to drop its own entry (D-146, design §2)`,
    )
}

/** One `writes[]` entry as a fixture writes it: `by` is OPTIONAL here because the parser defaults it, and a
 *  fixture that had to spell `by` on every entry would hide the arm that drives the default. */
type DraftEntry = { readonly path: string; readonly why: string; readonly d: string; readonly by?: string }

const entry = (path: string, why: string, d: string, by?: string): DraftEntry => ({ path, why, d, by })

/** A fixture declaration. Its page defaults to `FIXTURE_PAGE` and its unit to this unit, so every arm below
 *  plants exactly one defect; `by` defaults to the fixture's own `layer`, which is what the parser does. */
function fixture(parts: {
  readonly page?: string
  readonly unit?: string
  readonly layer?: string
  readonly module?: string | null
  readonly writes: readonly DraftEntry[]
}): Declaration {
  const layer = parts.layer === undefined ? 'L1' : parts.layer
  return {
    page: parts.page === undefined ? FIXTURE_PAGE : parts.page,
    unit: parts.unit === undefined ? 'boundary-grain' : parts.unit,
    layer,
    module: parts.module === undefined ? null : parts.module,
    writes: parts.writes.map((write) => ({ path: write.path, why: write.why, d: write.d, by: write.by === undefined ? layer : write.by })),
  }
}

/** **A REFUSAL IS ONLY A REFUSAL IF IT IS NAMED** (D-74: the response to a failure is never silence). This
 *  asks that the problem set carry the arm's own code AND the offending path or page. */
const refused = (problems: readonly string[], code: string, named: string): boolean =>
  problems.some((problem) => problem.startsWith(`${code}: `) && problem.includes(named))

/** One well-formed `boundary-declared` block, so a multi-block page can be built and driven. */
const blockOf = (unit: string): string => `\`\`\`${DECLARATION_FENCE}\n${JSON.stringify({ unit, layer: 'L1', module: null, writes: [] })}\n\`\`\``

/** One block whose body is the caller's JSON, so a fixture home can carry a declaration the reader answers. */
const blockWith = (body: string): string => `\`\`\`${DECLARATION_FENCE}\n${body}\n\`\`\`\n`

/** **A FIXTURE HOME — A TEMPORARY DIRECTORY THIS ROW WRITES AND REMOVES (E-8).** `readInFlightDeclarations`
 *  takes `homes` as a parameter precisely so the reader's HAPPY PATH can be driven: a reader that always
 *  answered `[]` would satisfy every live arm on a clean tree and reds here. Pages are keyed by their path
 *  relative to the home, so a nested page proves the walk recurses; the page id the reader answers is
 *  `${home}/${relative}`, which is the string this row puts in the edit set. */
function inFixtureHome(pages: Readonly<Record<string, string>>, drive: (home: string) => void): void {
  const home = mkdtempSync(join(tmpdir(), 'boundary-grain-'))
  try {
    for (const [relative, text] of Object.entries(pages)) {
      const target = join(home, relative)
      mkdirSync(dirname(target), { recursive: true })
      writeFileSync(target, text, 'utf8')
    }
    drive(home)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
}

describe('boundary-grain · P — the per-seat reading over IN-FLIGHT declarations', () => {
  it('P-1 · THE READER IS TOTAL AND ITS HAPPY PATH IS DRIVEN OVER A FIXTURE HOME — the filter runs BEFORE the parse, so a committed page\'s broken block is inert and an in-flight one throws, and a reader that always answered `[]` reds', () => {
    // (a) A CLEAN TREE IS GREEN, NOT RED. The row's subject is a declaration's LAWFULness, so a tree with no
    //     declaration in flight has nothing to refuse — a reader that threw here would make the row always-red
    //     on the commit that lands it, which is a row nobody can keep (D-74).
    expect(() => readInFlightDeclarations([])).not.toThrow()
    expect(readInFlightDeclarations([])).toEqual([])
    // (b) AND AN EDIT SET THAT NAMES NO DECLARATION PAGE ANSWERS THE SAME `[]` — the filter is the page's own
    //     flight, never the number of paths the tree carries.
    expect(readInFlightDeclarations(['src/main/main.ts', 'docs/L1/no-such-page.md'])).toEqual([])

    // (c) **THE HAPPY PATH, DRIVEN OVER A FIXTURE HOME (E-8)** — the arm rev 1 could not deliver: it asked only
    //     that the reader not throw and not answer a non-empty array, which a reader hard-wired to `[]` passes.
    const inFlightBody = JSON.stringify({
      unit: 'boundary-grain',
      layer: 'L1',
      module: null,
      writes: [{ path: SRC_MAIN, why: 'a fixture declaration the reader must ANSWER', d: 'D-301' }],
    })
    const nestedBody = JSON.stringify({
      unit: 'boundary-grain',
      layer: 'L1',
      module: null,
      writes: [{ path: REAL_PAGE, why: 'a page one directory down must be reached', d: 'D-146' }],
    })
    inFixtureHome({ 'in-flight.md': blockWith(inFlightBody), 'committed.md': blockWith(inFlightBody), 'nested/deep.md': blockWith(nestedBody) }, (home) => {
      const answers = readInFlightDeclarations([`${home}/in-flight.md`], [home])
      expect(answers, 'the reader answers the block it FINDS, not only `[]`').toHaveLength(1)
      expect(answers[0].page).toBe(`${home}/in-flight.md`)
      expect(answers[0].unit).toBe('boundary-grain')
      expect(answers[0].writes.map((write) => write.path)).toEqual([SRC_MAIN])
      expect(answers[0].writes[0].by, '`by` defaults to the block\'s own layer, resolved by the parser (E-3)').toBe('L1')
      //     AND A PAGE IN THE SAME HOME THAT IS NOT IN FLIGHT IS NOT ANSWERED — the filter is per page.
      expect(readInFlightDeclarations([], [home])).toEqual([])
      //     AND THE WALK RECURSES: a page one directory down is reached by the same home.
      expect(readInFlightDeclarations([`${home}/nested/deep.md`], [home]).map((declaration) => declaration.page)).toEqual([`${home}/nested/deep.md`])
    })

    // (d) **THE FILTER RUNS BEFORE THE PARSE (E-5)** — a malformed block on a COMMITTED page is history: it is
    //     never parsed, so a typo in another seat's committed page cannot red `W`'s row or this one. The SAME
    //     page in the edit set throws, because an in-flight declaration that cannot be read must RED (D-74).
    inFixtureHome({ 'committed.md': `\`\`\`${DECLARATION_FENCE}\n{"unit": "broken",\n\`\`\`\n`, 'lawful.md': blockWith(inFlightBody) }, (home) => {
      expect(() => readInFlightDeclarations([], [home]), 'nothing in flight: the broken committed page is never parsed').not.toThrow()
      expect(readInFlightDeclarations([], [home]), 'and the reading answers `[]` rather than refusing a page it never read').toEqual([])
      expect(() => readInFlightDeclarations([`${home}/lawful.md`], [home]), 'a committed page\'s broken block is inert').not.toThrow()
      expect(readInFlightDeclarations([`${home}/lawful.md`], [home]), 'the lawful page beside it is still answered').toHaveLength(1)
      expect(() => readInFlightDeclarations([`${home}/committed.md`], [home]), 'the same page IN FLIGHT must throw').toThrow('committed.md')
    })

    // (e) THE FENCE SPELLING IS THE CORPUS'S, PROVED BY BEHAVIOUR AND NOT BY AN EXPORT: a block whose info
    //     string is not EXACTLY ours is a different fence, read as a different fence and never guessed at
    //     (D-74) — so it is in flight and still answers nothing.
    inFixtureHome({ 'other.md': `\`\`\`${DECLARATION_FENCE}-not-really\n{"nope":1}\n\`\`\`\n` }, (home) => {
      expect(readInFlightDeclarations([`${home}/other.md`], [home])).toEqual([])
    })

    // (f) THE FOUR HOMES THE DESIGN NAMES ARE THERE (`P-4`'s table, design §3, E-1). A home that was renamed or
    //     removed would silently empty the scan and turn `P-2`…`P-5` into arms that read nothing — so the walk's
    //     own premise is asserted rather than assumed.
    for (const home of DECLARATION_HOMES) {
      expect(statSync(join(REPO_ROOT, home)).isDirectory(), `${home} is a declaration home — the walk cannot be emptied by a rename`).toBe(true)
    }

    // (g) OVER THE REAL TREE IT ANSWERS AN ARRAY, never the failed-read sentinel: a failed `git` read must
    //     surface as a RED ROW, never as an empty set (D-74, `B-3`). The sentinel is the reader's CONTRACT.
    const changed = editSetFromWorkingTree()
    expect(changed.includes(SENTINEL), 'a failed git read must surface as a red row, never as an empty set').toBe(false)
    const live = readInFlightDeclarations(changed)
    expect(Array.isArray(live)).toBe(true)
    //     AND THE IN-FLIGHT RULE ITSELF: every declaration the tree answers names a page the same reading saw
    //     dirty, so no committed block is ever treated as a permission (D-1, D-146, design §2).
    for (const declaration of live) {
      expect(changed, `${declaration.page} is in flight iff its own page is in the edit set`).toContain(declaration.page)
    }
    //     AND THE ORDER IS THE READING'S, NOT THE FILESYSTEM'S — `declaredScope`'s concatenation and therefore
    //     `W`'s offender list must be reproducible (D-43).
    const pages = live.map((declaration) => declaration.page)
    expect([...pages].sort()).toEqual(pages)
    //     AND THE DEFAULT HOME LIST REACHES `docs/L1/`: this page is the one in-flight declaration on this tree,
    //     so while it is dirty it must be answered. ONCE THE DESIGN PAGE IS COMMITTED THE LINE IS VACUOUS AND
    //     THE FIXTURE HOME IN (c) IS THE LOAD-BEARING HALF — which is why (c) exists at all (E-8).
    if (changed.includes(REAL_PAGE)) {
      expect(pages, 'the reader\'s default homes reach docs/L1/, where this unit\'s own declaration lives').toContain(REAL_PAGE)
    }

    // (h) A BLOCK THAT CANNOT BE READ IS AN ERROR NAMING THE PAGE AND THE LINE, NEVER A SKIPPED BLOCK. Each way
    //     a block can be unreadable is driven directly: no JSON, a body that is not an object, a wrong-shaped
    //     `writes`, a wrong-shaped entry, a non-string `by`, and a fence that never closes (D-74).
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n{"unit":"u",\n\`\`\``, 'docs/L1/x.md')).toThrow(/docs\/L1\/x\.md/)
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n[1,2,3]\n\`\`\``, 'docs/L1/x.md')).toThrow(/JSON OBJECT/)
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n{"unit":"u","layer":"L1","module":null,"writes":"nope"}\n\`\`\``, 'docs/L1/x.md')).toThrow(/writes/)
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n{"unit":"u","layer":"L1","module":null,"writes":[{"path":1}]}\n\`\`\``, 'docs/L1/x.md')).toThrow(/writes\[0\]/)
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n{"unit":"u","layer":"L1","module":null,"writes":[{"path":"a","why":"b","d":"D-1","by":7}]}\n\`\`\``, 'docs/L1/x.md')).toThrow(/by/)
    expect(() => parseDeclarationBlocks(`\`\`\`${DECLARATION_FENCE}\n{"unit":"u","layer":"L1","module":null,"writes":[]}\n`, 'docs/L1/x.md')).toThrow(/never closed/)

    // (i) NO FENCE IS SILENTLY SKIPPED: three well-formed blocks parse to three, and the SAME text with the
    //     middle body broken throws rather than answering two — a block cannot be dropped because its
    //     neighbours were readable (D-74). And a block carrying `by` keeps it, which is `P-4`'s input (E-3).
    const three = [blockOf('a'), blockOf('b'), blockOf('c')].join('\n\n')
    const parsed = parseDeclarationBlocks(three, 'docs/L1/x.md')
    expect(parsed).toHaveLength(3)
    expect(parsed.map((declaration) => declaration.unit)).toEqual(['a', 'b', 'c'])
    expect(parsed.every((declaration) => declaration.page === 'docs/L1/x.md')).toBe(true)
    const broken = [blockOf('a'), `\`\`\`${DECLARATION_FENCE}\n{"unit":"b",\n\`\`\``, blockOf('c')].join('\n\n')
    expect(() => parseDeclarationBlocks(broken, 'docs/L1/x.md')).toThrow(/docs\/L1\/x\.md:5/)
    const carried = parseDeclarationBlocks(
      `\`\`\`${DECLARATION_FENCE}\n{"unit":"u","layer":"L3","module":"app-shell","writes":[{"path":"${SRC_MAIN}","why":"an L4 landing","d":"D-301","by":"L4"},{"path":"${REAL_PAGE}","why":"the L3 page itself","d":"D-301"}]}\n\`\`\``,
      'docs/L3/app-shell/design.md',
    )
    expect(carried[0].writes.map((write) => write.by), '`by` is carried where present and defaults to the block\'s layer otherwise').toEqual(['L4', 'L3'])
  })

  it('P-2 · AN ENTRY IS A FILE — repo-relative, POSIX, no `..`, no trailing `/`, no glob, and it names a real file; a DIRECTORY is refused BY NAME, which is the refusal `B-2(b)` samples FOUR times', () => {
    // THE FIXTURE'S OWN PREMISE, MEASURED RATHER THAN ASSUMED: the directory this arm must refuse is a REAL
    // path in this repository, and the sibling it must refuse is not a file at all — so the refusal below is
    // about the SPELLING and not merely about a path that names nothing.
    expect(statSync(join(REPO_ROOT, 'docs/L2/app-shell')).isDirectory(), 'the fixture directory is a real path').toBe(true)
    expect(existsSync(join(REPO_ROOT, 'docs/L2/app-shell/protocol.md')), 'the near-miss sibling names no file').toBe(false)
    const lawful = L2_PAGE
    const probe = fixture({
      writes: [
        entry('docs/L2/app-shell/', 'a directory spelling of a real directory', 'D-301'),
        entry('docs/L2/app-shell', 'the same directory with no trailing slash', 'D-301'),
        entry('docs/L2/app-shell/protocol.md', 'a near-miss sibling that names no file', 'D-301'),
        entry('docs/L2/app-shell/*.md', 'a glob over the module page', 'D-301'),
        entry(`/${lawful}`, 'an absolute spelling', 'D-301'),
        entry(`docs/../${lawful}`, 'a path that climbs', 'D-301'),
        entry(`${lawful}/`, 'a trailing slash on a real file', 'D-301'),
        entry('docs/L2/app-shell/inter?ace.md', 'a single-character wildcard', 'D-301'),
      ],
    })
    const problems = declarationProblems(probe, [lawful], DECISION_ROWS)
    // EVERY ONE IS REFUSED, AND EVERY REFUSAL NAMES THE PATH AND THE ARM (D-74).
    expect(refused(problems, 'P-2 trailing-slash', 'docs/L2/app-shell/'), 'a directory spelling is refused by name').toBe(true)
    expect(refused(problems, 'P-2 not-a-file', 'docs/L2/app-shell'), 'the DIRECTORY itself is refused, not merely its trailing slash').toBe(true)
    expect(refused(problems, 'P-2 not-a-file', 'docs/L2/app-shell/protocol.md'), 'a near-miss sibling is refused by name').toBe(true)
    expect(refused(problems, 'P-2 glob', 'docs/L2/app-shell/*.md'), 'a glob is refused by name').toBe(true)
    expect(refused(problems, 'P-2 glob', 'docs/L2/app-shell/inter?ace.md'), 'a single-character wildcard is a glob too').toBe(true)
    expect(refused(problems, 'P-2 not-repo-relative', `/${lawful}`), 'an absolute path is refused by name').toBe(true)
    expect(refused(problems, 'P-2 parent-segment', `docs/../${lawful}`), 'a path that climbs is refused by name').toBe(true)
    expect(refused(problems, 'P-2 trailing-slash', `${lawful}/`), 'a trailing slash on a real file is refused by name').toBe(true)
    // AND THE ARM IS NOT SIMPLY ALWAYS-RED: the same file, spelled as an entry must be, is admitted.
    const admitted = fixture({ writes: [entry(lawful, 'the module page this pass re-grained', 'D-301')] })
    expect(declarationProblems(admitted, [lawful], DECISION_ROWS), 'a real file, spelled repo-relative, is admitted whole').toEqual([])
    // THE DELETION BRANCH, NAMED RATHER THAN FAKED. An entry may name a file that is no longer in the worktree
    // when it declares a DELETION, because the reading reports a removal like any other edit — so the file test
    // is "in the worktree OR tracked at HEAD". This tree carries no uncommitted deletion (measured below), so
    // THAT branch cannot be driven here without writing outside this row's two files; what IS driven is the
    // pair's exactness and the HEAD set's own premise: a tracked path that is CLEAN is refused by `P-5`, so the
    // HEAD arm cannot admit a stale entry.
    const tracked = 'tests/e2e/app-layout/app-layout.test.ts'
    expect(headTrackedPaths().has(tracked), 'the HEAD set is non-empty and carries the paths it claims to').toBe(true)
    expect(headTrackedPaths().has('docs/L1/no-such-file-anywhere.md'), 'and a path no commit ever carried is absent').toBe(false)
    const stale = fixture({ writes: [entry(tracked, 'a tracked path no pass is touching', 'D-301')] })
    expect(refused(declarationProblems(stale, [], DECISION_ROWS), 'P-5 clean-path', tracked), 'the HEAD arm and `P-5` are exact together').toBe(true)
  })

  it('P-3 · AN ENTRY CARRIES ITS OWN REASON — `why` is non-empty after trim and the entry cites a `D-n` that resolves; an unresolvable row is refused BY NAME', () => {
    // THE FALSIFIER'S OWN PREMISE, MEASURED: the corpus files rows, and `D-99999` is not one of them.
    expect(DECISION_ROWS.size, 'the corpus files rows').toBeGreaterThan(0)
    expect(DECISION_ROWS.has('D-99999'), 'the phantom row this arm must refuse is genuinely unfiled').toBe(false)
    const phantom = 'D-99999'
    const paths = [REAL_PAGE, 'strata/modules.json', 'tests/e2e/boundary-grain/declarations.ts']
    const probe = fixture({
      writes: [entry(paths[0], '   ', 'D-301'), entry(paths[1], 'a row that was never filed', phantom), entry(paths[2], 'a reason with no row at all', '')],
    })
    const problems = declarationProblems(probe, paths, DECISION_ROWS)
    expect(refused(problems, 'P-3 missing-why', paths[0]), 'a whitespace-only reason is no reason').toBe(true)
    expect(refused(problems, 'P-3 unresolved-d', phantom), 'an unfiled row is refused by name').toBe(true)
    expect(refused(problems, 'P-3 missing-d', paths[2]), 'a reason citing no resolving row is refused by name').toBe(true)
    // AND THE `why` MAY CARRY THE ROW INSTEAD OF `d` — the format allows either, so an entry whose sentence
    // names a filed row is admitted even with `d` empty.
    const proseCarriesIt = fixture({ writes: [entry(REAL_PAGE, 'the design page this pass filed (D-301)', '')] })
    expect(declarationProblems(proseCarriesIt, [REAL_PAGE], DECISION_ROWS), 'a `why` naming a filed row satisfies the provenance rule').toEqual([])
    // AND A LAWFUL ENTRY IS ADMITTED WHOLE: this arm has two directions, or it is not an arm.
    const lawful = fixture({ writes: [entry(REAL_PAGE, "this unit's L1 design page", 'D-301')] })
    expect(declarationProblems(lawful, [REAL_PAGE], DECISION_ROWS)).toEqual([])
  })

  it('P-4 · A DECLARATION IS ITS SEAT\'S — the page\'s location is the authority, `unit` names a unit the state ledger carries, and `by` is the declaring layer or the one named L4 exception', () => {
    // (a) A PAGE IN `docs/L2/a/` DECLARING `layer: "L3"` IS REFUSED BY NAME — D-3's ownership wall, mechanical
    //     for declarations only.
    const wrongLayer = fixture({ page: L2_PAGE, layer: 'L3', module: 'app-shell', writes: [] })
    const layerProblems = declarationProblems(wrongLayer, [], DECISION_ROWS)
    expect(refused(layerProblems, 'P-4 wrong-layer', L2_PAGE)).toBe(true)
    expect(layerProblems.every((problem) => problem.includes(L2_PAGE)), 'the refusal names the offending page').toBe(true)
    // (b) THE MODULE IS THE PAGE'S, NOT THE BLOCK'S — a claim one directory over is refused by name.
    expect(refused(declarationProblems(fixture({ page: L2_PAGE, layer: 'L2', module: 'view-record', writes: [] }), [], DECISION_ROWS), 'P-4 wrong-module', 'view-record')).toBe(true)
    // (c) A SEAT WITH NO MODULE DECLARES NONE: an L1 page naming a module is refused, because the location is the
    //     authority and `null` is the spelling for a seat that owns no module.
    expect(refused(declarationProblems(fixture({ page: REAL_PAGE, layer: 'L1', module: 'boundary-grain', writes: [] }), [], DECISION_ROWS), 'P-4 wrong-module', 'boundary-grain')).toBe(true)
    // (d) A LAYER OUTSIDE THE FOUR IS REFUSED BY NAME — an unknown layer is a seat nobody can check, and L4 in
    //     particular declares nothing of its own (E-3).
    expect(refused(declarationProblems(fixture({ page: REAL_PAGE, layer: 'L9', writes: [] }), [], DECISION_ROWS), 'P-4 unknown-layer', '"L9"')).toBe(true)
    expect(refused(declarationProblems(fixture({ page: REAL_PAGE, layer: 'L4', writes: [] }), [], DECISION_ROWS), 'P-4 unknown-layer', '"L4"')).toBe(true)
    // (e) A PAGE IN NO HOME DECLARES FOR NO SEAT.
    expect(refused(declarationProblems(fixture({ page: NO_HOME_PAGE, writes: [] }), [], DECISION_ROWS), 'P-4 misplaced', NO_HOME_PAGE)).toBe(true)
    // (f) AND A BLOCK THAT NAMES NO UNIT IS REFUSED — the block says which seat authored it.
    expect(refused(declarationProblems(fixture({ page: REAL_PAGE, unit: '  ', writes: [] }), [], DECISION_ROWS), 'P-4 missing-unit', REAL_PAGE)).toBe(true)
    // (g) **`unit` MUST NAME A UNIT THE STATE LEDGER CARRIES (E-2)** — `strata/.strata/units/<unit>.json` exists.
    //     A fixture unit id is refused by name; this unit's own id is admitted, and so is its state file's
    //     existence, which is the premise rather than the claim.
    expect(existsSync(join(REPO_ROOT, 'strata/.strata/units/boundary-grain.json')), 'the ledger carries this unit').toBe(true)
    expect(existsSync(join(REPO_ROOT, 'strata/.strata/units/no-such-unit.json')), 'the fixture unit id the arm refuses is genuinely absent').toBe(false)
    expect(refused(declarationProblems(fixture({ page: REAL_PAGE, unit: 'no-such-unit', writes: [] }), [], DECISION_ROWS), 'P-4 unknown-unit', 'no-such-unit')).toBe(true)
    expect(declarationProblems(fixture({ page: REAL_PAGE, unit: 'boundary-grain', writes: [] }), [], DECISION_ROWS), 'a unit the ledger carries is admitted').toEqual([])
    // (h) **`by` IS THE DECLARING LAYER, OR `L4` INSIDE AN `L3` DECLARATION — AND NOTHING ELSE (E-3).** The one
    //     named exception exists because L4 owns no design and receives the exact write it makes (brief §3, §4).
    const l3ByL4 = fixture({ page: L3_PAGE, layer: 'L3', module: 'app-shell', writes: [entry(SRC_MAIN, 'an L4 landing this L3 page declares', 'D-301', 'L4')] })
    expect(declarationProblems(l3ByL4, [SRC_MAIN], DECISION_ROWS), '`by: "L4"` inside an L3 declaration is the one lawful foreign layer').toEqual([])
    const l1ByL1 = fixture({ page: REAL_PAGE, layer: 'L1', writes: [entry(REAL_PAGE, 'the declaring layer itself', 'D-301', 'L1')] })
    expect(declarationProblems(l1ByL1, [REAL_PAGE], DECISION_ROWS), '`by` equal to the declaring layer is lawful').toEqual([])
    const l1ByL4 = fixture({ page: REAL_PAGE, layer: 'L1', writes: [entry(REAL_PAGE, 'an L4 landing claimed by an L1 page', 'D-301', 'L4')] })
    expect(refused(declarationProblems(l1ByL4, [REAL_PAGE], DECISION_ROWS), 'P-4 by-l4-outside-l3', REAL_PAGE), '`by: "L4"` outside an L3 declaration is refused by name').toBe(true)
    const l0ByL4 = fixture({ page: L0_PAGE, layer: 'L0', writes: [entry(REAL_PAGE, 'an L4 landing claimed by an L0 page', 'D-301', 'L4')] })
    expect(refused(declarationProblems(l0ByL4, [REAL_PAGE], DECISION_ROWS), 'P-4 by-l4-outside-l3', REAL_PAGE), 'and refused for L0 too, which declares its own writes').toBe(true)
    const l1ByL2 = fixture({ page: REAL_PAGE, layer: 'L1', writes: [entry(REAL_PAGE, 'another layer claimed for a write', 'D-301', 'L2')] })
    expect(refused(declarationProblems(l1ByL2, [REAL_PAGE], DECISION_ROWS), 'P-4 foreign-by', REAL_PAGE), 'any other foreign layer is refused by name').toBe(true)
    const l3ByL2 = fixture({ page: L3_PAGE, layer: 'L3', module: 'app-shell', writes: [entry(REAL_PAGE, 'a foreign layer inside an L3 declaration', 'D-301', 'L2')] })
    expect(refused(declarationProblems(l3ByL2, [REAL_PAGE], DECISION_ROWS), 'P-4 foreign-by', REAL_PAGE), 'and the L4 exception is the ONLY one an L3 declaration may name').toBe(true)
    // (i) THE ARM HAS TWO DIRECTIONS: every lawful seat is admitted whole, one per home.
    const seats: readonly Declaration[] = [
      fixture({ page: REAL_PAGE, layer: 'L1', module: null, writes: [] }),
      fixture({ page: L2_PAGE, layer: 'L2', module: 'app-shell', writes: [] }),
      fixture({ page: L3_PAGE, layer: 'L3', module: 'app-shell', writes: [] }),
      fixture({ page: L0_PAGE, layer: 'L0', module: null, writes: [] }),
    ]
    for (const seat of seats) {
      expect(declarationProblems(seat, [], DECISION_ROWS), `${seat.page} declares its own seat`).toEqual([])
    }
    // **AND WHAT NO ARM HERE CAN DO, SAID RATHER THAN IMPLIED (E-2, design §3):** nothing attributes a declared
    // path to the seat that wrote it. An entry is deliberately NOT confined to the declaring seat's module — a
    // cross-module write is exactly what the row exists to declare — so `P-4` checks the DECLARER's seat and
    // never the writer's, and `P-6`'s lawful fixture admits a `src/main/` path from an `docs/L1/` page. The
    // instrument's claim is that SILENCE IS IMPOSSIBLE and the reason is reviewable, never that the writer is
    // the declarer: that is D-44's unverifiable class.
  })

  it('P-5 · NO STANDING PERMISSION — every declared path is in the worktree\'s edit set, so an entry for a CLEAN path is refused by name; this is the arm that makes a declaration die at its landing commit', () => {
    const clean = L2_PAGE
    const touched = REAL_PAGE
    const declaration = fixture({ writes: [entry(clean, 'a page no pass is touching', 'D-301')] })
    // (a) A CLEAN PATH IS REFUSED BY NAME. A declaration that outlives its write, or is pre-filed for a later
    //     pass, is a standing permission — which is exactly what the retired hand list was (D-146, design §4),
    //     and this is the only arm that would say so.
    const problems = declarationProblems(declaration, [touched], DECISION_ROWS)
    expect(refused(problems, 'P-5 clean-path', clean), 'an entry for a path nobody touched is refused by name').toBe(true)
    // (b) THE SAME ENTRY IS ADMITTED THE MOMENT THE PATH IS IN THE EDIT SET — the arm is about flight and not
    //     about the path, or it would refuse every declaration ever filed.
    expect(declarationProblems(declaration, [clean, touched], DECISION_ROWS)).toEqual([])
    // (c) A FAILED `git` READ REDS THROUGH THIS ARM TOO. The sentinel is in no declaration, so every entry is
    //     refused — the reading cannot answer a clean tree it never measured (D-74).
    const sentinel = declarationProblems(fixture({ writes: [entry(touched, 'a real file', 'D-301')] }), [SENTINEL], DECISION_ROWS)
    expect(refused(sentinel, 'P-5 clean-path', touched), 'a failed git read refuses every declared entry rather than admitting silence').toBe(true)
    // (d) AND `declaredScope` KEEPS WHAT IT IS GIVEN: it is a LIST, never a set, because `W`'s
    //     `DECLARED_SCOPE_IS_A_SET` arm must still be able to fail on a path two SEATS declare — `D-146`'s
    //     *"a path is declared by the seat that WRITES it"* made mechanical (design §2). `P-7` names both.
    const twoSeats = [
      fixture({ writes: [entry(touched, 'the L1 page', 'D-301')] }),
      fixture({ page: FIXTURE_SECOND_PAGE, writes: [entry(touched, 'the same path from another seat', 'D-301')] }),
    ]
    expect(declaredScope(twoSeats), 'the concatenation is never de-duplicated').toHaveLength(2)
    expect(declaredScope(twoSeats)).toEqual([touched, touched])
  })

  it('P-6 · THE FALSIFIER — THE ROW CAN STILL FAIL: one comparator driven over a fixture declaration carrying every planted defect refuses each BY NAME, and over a lawful fixture — including a `src/main/` entry — admits it whole', () => {
    // **THE LIVE ARMS ARE VACUOUS ON A TREE WITH NO DECLARATIONS AND GREEN ON ARRIVAL — THIS ARM IS THE
    // LOAD-BEARING ONE.** `P-2`…`P-5` read whatever the tree happens to carry in flight; on any committed tree
    // there are none, so a validator that refused everything and one that refused nothing would both be green
    // there. A row that cannot fail is worth less than no row (D-30, D-40, D-222) — which is why the comparator
    // is driven over a fixture that plants every defect the live arms exist to catch.
    const lawfulPath = REAL_PAGE
    const secondLawful = 'strata/modules.json'
    const thirdLawful = 'tests/e2e/boundary-grain/declarations.ts'
    const clean = 'tests/e2e/app-layout/app-layout.test.ts'
    const editSet = [lawfulPath, secondLawful, thirdLawful]
    const bad = fixture({
      page: L2_PAGE,
      layer: 'L3',
      module: 'app-shell',
      writes: [
        entry('docs/L2/app-shell/', 'a directory spelling', 'D-301'),
        entry('docs/L2/app-shell/*.md', 'a glob spelling', 'D-301'),
        entry(lawfulPath, 'the lawful entry', 'D-301'),
        entry(lawfulPath, 'the same path declared twice', 'D-301'),
        entry(secondLawful, '   ', 'D-301'),
        entry(thirdLawful, 'a row that was never filed', 'D-99999'),
        entry(clean, 'a path nobody touched', 'D-40'),
      ],
    })
    const problems = declarationProblems(bad, editSet, DECISION_ROWS)
    // EVERY PLANTED DEFECT, NAMED — the pairs are the fixture's own, so the count asserted below is derived from
    // this array rather than restated from anywhere (D-43).
    const planted: readonly (readonly [code: string, named: string])[] = [
      ['P-2 trailing-slash', 'docs/L2/app-shell/'],
      ['P-2 glob', 'docs/L2/app-shell/*.md'],
      ['P-2 duplicate-entry', lawfulPath],
      ['P-3 missing-why', secondLawful],
      ['P-3 unresolved-d', 'D-99999'],
      ['P-4 wrong-layer', L2_PAGE],
      ['P-5 clean-path', clean],
    ]
    for (const [code, named] of planted) {
      expect(refused(problems, code, named), `${code} refuses ${named} BY NAME`).toBe(true)
    }
    expect(problems.length, 'every planted defect is refused, and a refusal is never silent').toBeGreaterThanOrEqual(planted.length)
    // AND THE LAWFUL ENTRY IN THE SAME DECLARATION CONTRIBUTES NOTHING BUT ITS DUPLICATE: the comparator refuses
    // what is wrong and does not condemn a declaration for standing beside it.
    expect(
      problems.filter((problem) => problem.includes(lawfulPath)).map((problem) => problem.slice(0, problem.indexOf(': '))),
      'the lawful entry is refused only for being declared twice',
    ).toEqual(['P-2 duplicate-entry'])
    // AND OVER A LAWFUL DECLARATION IT ANSWERS `[]` — the second direction, without which the arm would only
    // prove the comparator can say "no". **AND THE LAWFUL HALF CARRIES A `src/main/` ENTRY ON PURPOSE (E-7):**
    // `B-1`'s `toContain('src/main/view-record/index.ts')` and its `startsWith('src/main/')` arm asserted the
    // CONTENT OF A HAND LIST, and with the union computed an empty scope is lawful on a clean tree — so the
    // replacement is this fixture, which asserts that `declaredScope` ADMITS a main-side path, tree-independently.
    const lawful = fixture({
      writes: [
        entry(lawfulPath, "this unit's L1 design page", 'D-301'),
        entry(secondLawful, 'the map row this unit adds', 'D-14'),
        entry(SRC_MAIN, 'a cross-module write: `P-4` checks the DECLARER\'s seat, never the writer\'s (design §3, E-2)', 'D-301'),
      ],
    })
    expect(declarationProblems(lawful, [lawfulPath, secondLawful, SRC_MAIN], DECISION_ROWS), 'a lawful declaration is admitted whole').toEqual([])
    const scope = declaredScope([lawful])
    expect(scope, 'the declared scope ADMITS the `src/main/` entry it carries').toContain(SRC_MAIN)
    expect(scope.some((path) => path.startsWith('src/main/')), 'and a main-side path is admissible — the subject `B-1`\'s retired content assertion protected (E-7)').toBe(true)
    // **THE LIVE ARMS** — over the real tree, every in-flight declaration must answer `[]`, and the message must
    // name the offending page and entry, so a red tells a pass what it owes without reading this file (design
    // §1: the reading prints the offenders by name).
    const changed = editSetFromWorkingTree()
    const inFlight = readInFlightDeclarations(changed)
    for (const declaration of inFlight) {
      const live = declarationProblems(declaration, changed, DECISION_ROWS)
      expect(live, `in-flight declaration on ${declaration.page} is lawful; offenders: ${live.join(' | ')}`).toEqual([])
    }
    // AND THE SAME DECLARATION IS WHAT `W` WILL READ: the concatenation of the in-flight blocks, in declaration
    // order, with duplicates kept (design §2). Asserted as a computation here and never as a claim about today's
    // list — a count would be a fact another document owns (D-43).
    expect(declaredScope(inFlight)).toEqual(inFlight.flatMap((declaration) => declaration.writes.map((write) => write.path)))
  })

  it('P-7 · NO PATH IS DECLARED TWICE — the detector names the path AND both declaring pages, while `declaredScope` keeps the duplicate that lets `W`\'s set arm fail', () => {
    // **BOTH FACTS, ASSERTED TOGETHER (E-6).** `declaredScope` must KEEP the duplicate — it is what keeps `W`'s
    // `DECLARED_SCOPE_IS_A_SET` able to fail — and the DETECTOR must NAME both pages, because a boolean whose
    // message names nothing is the silence D-74 refuses and the second seat's fix is inside its own scope.
    const shared = SRC_MAIN
    const first = fixture({ page: FIXTURE_PAGE, writes: [entry(shared, 'the first seat declares it', 'D-301')] })
    const second = fixture({ page: FIXTURE_SECOND_PAGE, writes: [entry(shared, 'the second seat declares it too', 'D-146')] })
    // (a) THE CONCATENATION KEEPS IT — a LIST and never a set, so `W`'s arm still has something to bite.
    expect(declaredScope([first, second]), 'the declared scope keeps the duplicate').toEqual([shared, shared])
    // (b) AND THE DETECTOR NAMES THE PATH AND BOTH PAGES.
    const problems = crossSeatDuplicates([first, second])
    expect(problems, 'one duplicate, one complaint').toHaveLength(1)
    expect(problems[0]).toContain(shared)
    expect(problems[0]).toContain(FIXTURE_PAGE)
    expect(problems[0]).toContain(FIXTURE_SECOND_PAGE)
    // (c) AND IT IS NOT ALWAYS-RED: a set of declarations with distinct paths answers `[]`.
    expect(crossSeatDuplicates([first, fixture({ page: FIXTURE_SECOND_PAGE, writes: [entry(REAL_PAGE, 'a different path', 'D-301')] })])).toEqual([])
    expect(crossSeatDuplicates([]), 'an empty reading declares no duplicate').toEqual([])
    // (d) A REPEAT INSIDE ONE DECLARATION IS `P-2`'s, NOT THIS ARM'S — the two detectors are about different
    //     seats, and a single page repeating itself is refused where the entry is read.
    const selfRepeat = fixture({ writes: [entry(shared, 'once', 'D-301'), entry(shared, 'twice', 'D-301')] })
    expect(crossSeatDuplicates([selfRepeat]), 'one page declaring a path twice is not a cross-seat duplicate').toEqual([])
    expect(refused(declarationProblems(selfRepeat, [shared], DECISION_ROWS), 'P-2 duplicate-entry', shared)).toBe(true)
    // (e) AND THE LIVE TREE ANSWERS NONE: every path in flight is declared once, so a red here would be a real
    //     cross-seat collision and never a fixture artefact.
    expect(crossSeatDuplicates(readInFlightDeclarations(editSetFromWorkingTree())), 'no in-flight path is declared by two seats').toEqual([])
  })
})
