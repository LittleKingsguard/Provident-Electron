// tests/e2e/modularity/map-figures.test.ts — **`AN-12`'s ROW: NOTHING COMPARED `docs/L1/modularity.md`'s FIGURES TO
// `strata/modules.json`, SO ONE HAD LAGGED THE MAP FOR SEVERAL PASSES AND WAS FOUND BY HAND** (`strata/records/
// modularity-cleanup.md` `AN-12`; the cure is this row, in `PM-1`'s source-probe idiom — a private relation read out of
// the text that states it, compared against the one file that owns the number).
//
// WHAT IT READS, AND WHY THOSE TWO FILES. The map (`strata/modules.json`) is the authority for a module's `endpoints`
// (`D-14`); §2 of the design states, per module, the figure this unit MOVED it to. The two drifted silently: the page
// said `module-system` 16 while the map said 24, from the pass that landed the door rows until `RG-3` re-took it. No
// row could see it, because no row read both files (`AN-12`'s whole statement).
//
// WHAT IT ASSERTS, IN WHAT ORDER. (1) Every §2 row that names a module of the map and states an `endpoints` figure
// states THE MAP'S figure — the LAST number of the row's `endpoints ... → N` run, so a re-grain is a new last number and
// not a second sentence. (2) The four rows that MUST state one still do, NAMED, so a pass cannot retire a figure by
// deleting the sentence instead of moving it (the `PM-1` idiom: a sum of named parts, never a bare count). (3) The
// falsifier — the same comparator over a fabricated table whose figure is one off refuses it BY NAME, and over the real
// table admits it whole — so the row can still fail.
//
// IT IS UNMARKED AND GATING (D-30, D-40), it imports nothing from `src/**` or `scripts/**`, and a `DISPLAY` is NOT its
// prerequisite: it reads two files and boots nothing.
import { readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
/** The design's §2 table and the map it states figures against (`D-14`). */
const PAGE = 'docs/L1/modularity.md'
const MAP = 'strata/modules.json'

interface MapRow { readonly name: string; readonly endpoints?: number }
const map = JSON.parse(readFileSync(join(REPO, MAP), 'utf8')) as { modules: readonly MapRow[] }
const ENDPOINTS_OF = new Map<string, number>(map.modules.map((row) => [row.name, row.endpoints ?? -1]))

/** One §2 row: its module, and the LAST figure its `endpoints ... → N` run names. A row that names no map module is
 *  not a §2 row (the steps table's `| S-14 |` cell carries the same words, and it is not a figure statement). */
interface FigureRow { readonly module: string; readonly figure: number }
function statedFigures(text: string): readonly FigureRow[] {
  const rows: FigureRow[] = []
  for (const line of text.split('\n')) {
    const named = /^\|\s*`([^`]+)`/.exec(line)
    if (named === null) continue
    const module = named[1]
    if (!ENDPOINTS_OF.has(module)) continue
    const figures = [...line.matchAll(/`endpoints`[^→\n]*→\s*`?(\d+)`?/g)].map((match) => Number(match[1]))
    if (figures.length === 0) continue
    rows.push({ module, figure: figures[figures.length - 1] })
  }
  return rows
}
/** The comparator: every stated figure whose module the map carries must equal the map's. A row naming a module the map
 *  does NOT carry is refused too — a figure about nothing is not agreement. */
function disagreements(rows: readonly FigureRow[], expected: ReadonlyMap<string, number>): readonly string[] {
  return rows.flatMap((row) => {
    const held = expected.get(row.module)
    if (held === undefined) return [`${row.module}: the row states ${String(row.figure)} but no map row names that module`]
    return held === row.figure ? [] : [`${row.module}: the page states ${String(row.figure)}, the map carries ${String(held)}`]
  })
}

/** **THE `planned` ARMS** (`D-321`): a map row's `paths` is an OWNERSHIP claim and its `planned` list names the subset
 *  that is a reserved row's or an owed step's home and is NOT in the tree yet. So the map answers two questions
 *  separately, and BOTH are stat-ed: an unplanned path must exist, and a planned one must not. */
interface MapRowWithPlanned extends MapRow { readonly paths: readonly string[]; readonly planned?: readonly string[] }
const statOf = (path: string): boolean => {
  try {
    statSync(join(REPO, path))
    return true
  } catch {
    return false
  }
}
function pathProblems(rows: readonly MapRowWithPlanned[], exists: (path: string) => boolean): readonly string[] {
  return rows.flatMap((row) => {
    const planned = new Set(row.planned ?? [])
    return row.paths.flatMap((path) => {
      if (planned.has(path)) {
        return exists(path) ? [`${row.name}: \`${path}\` is marked planned and IS in the tree — the pass that built it owes its own marker removal`] : []
      }
      return exists(path) ? [] : [`${row.name}: \`${path}\` is claimed as built and is ABSENT`]
    })
  })
}
const MAP_ROWS: readonly MapRowWithPlanned[] = map.modules as readonly MapRowWithPlanned[]

describe('modularity · the map figures (§2 vs `strata/modules.json`, `AN-12`)', () => {
  it('MF-1 — every §2 row that states an `endpoints` figure states THE MAP\'S figure', () => {
    const rows = statedFigures(readFileSync(join(REPO, PAGE), 'utf8'))
    expect(rows.length, 'the probe parsed no figure at all, so it would green on a page whose figures were all deleted').toBeGreaterThan(0)
    expect(disagreements(rows, ENDPOINTS_OF), 'a §2 figure disagrees with the map — the page states where the unit moved it, the map carries the number (D-14)').toEqual([])
  })

  it('MF-2 — the four rows that MUST state a figure still do, BY NAME — a pass cannot retire one by deleting its sentence', () => {
    const stated = new Set(statedFigures(readFileSync(join(REPO, PAGE), 'utf8')).map((row) => row.module))
    expect([...stated].sort(), 'the named rows that state their figure, so an absence is a red and not a silent skip').toEqual(
      expect.arrayContaining(['app-shell', 'module-system', 'module-channel', 'producing-runtime']),
    )
  })

  it('MF-3 — THE FALSIFIER: the same comparator refuses a table one figure off, refuses a module the map does not name, and admits the real table whole', () => {
    const real = readFileSync(join(REPO, PAGE), 'utf8')
    const drifted = real.replace(/(\| `module-system`[^\n]*?`endpoints`[^→\n]*→\s*`?)(\d+)/, (_m, head: string, n: string) => `${head}${String(Number(n) + 1)}`)
    expect(drifted, 'the fixture really moved a figure, so the control drives the comparator and not a string that never changed').not.toBe(real)
    const control = disagreements(statedFigures(drifted), ENDPOINTS_OF)
    expect(control.length, 'a one-off figure MUST be refused').toBeGreaterThan(0)
    expect(control.join(' '), 'and the offender is NAMED, never merely counted').toContain('module-system')
    const foreign = disagreements([{ module: 'module-that-does-not-exist', figure: 3 }], ENDPOINTS_OF)
    expect(foreign, 'a figure about a module the map does not carry is refused, never read as agreement').toHaveLength(1)
    expect(disagreements(statedFigures(real), ENDPOINTS_OF), 'and the real table is admitted whole — the comparator has two arms').toEqual([])
  })

  it('MF-4 — every UNPLANNED path the map claims exists, and every `planned` one does NOT (the two arms of `D-321`)', () => {
    expect(MAP_ROWS.flatMap((row) => row.planned ?? []).length, 'the map carries planned homes at all, so the second arm is not vacuous').toBeGreaterThan(0)
    expect(pathProblems(MAP_ROWS, statOf), 'a claimed path that is absent, or a planned one that has been built and left marked, reds BY NAME').toEqual([])
  })

  it('MF-5 — THE FALSIFIER: the same comparator refuses an absent unplanned path and a present planned one, and admits the real map whole', () => {
    const rows: readonly MapRowWithPlanned[] = [{ name: 'probe', endpoints: 1, paths: ['tests', 'src/modules/'], planned: ['src/modules/'] }]
    const absent = pathProblems([{ name: 'probe', endpoints: 1, paths: ['no/such/path'] }], statOf)
    expect(absent, 'an unplanned path the tree does not carry MUST red').toHaveLength(1)
    expect(absent[0], 'and it names the path').toContain('no/such/path')
    const stale = pathProblems(rows, () => true) // every claimed path stands, so the ONE red is the planned path that has been built
    expect(stale, 'a PLANNED path that now exists MUST red — the marker is cleared in the pass that builds it').toHaveLength(1)
    expect(stale[0], 'and it names the marker it owes').toContain('planned')
    expect(pathProblems(MAP_ROWS, statOf), 'and the real map is admitted whole').toEqual([])
  })
})
