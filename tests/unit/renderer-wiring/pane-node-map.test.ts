// tests/unit/renderer-wiring/pane-node-map.test.ts — **`PM-1`: THE PANE↔NODE MAP'S TOTALITY, PROBED IN ITS OWN SOURCE
// TEXT** (`docs/L3/renderer-wiring/design-pane-node-map.md` §5's one OWED instrument, §7's `PM-1`, `D-225`).
//
// WHY THIS FILE EXISTS, IN `D-225`'S OWN WORDS. *"**`PM-1`** — a `tests/unit/renderer-wiring/` source probe of the map's
// totality — is named and not yet a path … **so the map's completeness is the one thing about it no row measures**: a third
// declared pane added without an entry would render nothing and report `absent` — **honest, and silent**."* The map is
// `PANE_NODE_IDS` in `src/renderer/renderer.ts`, declared beside `LAYOUT_ZONE_AXES`; **it is PRIVATE** (`nodeIdForPane`
// is private with it, and `renderer.ts` exports neither), **so no row can import it and the source TEXT is the only
// reading there is** — the tree's own idiom for a private relation (`tests/unit/app-envelope/live-seams.test.ts`'s
// `AE-1`…`AE-3` read `renderer.ts`'s bytes for exactly this reason, and `TR-1`…`TR-4` in the sibling
// `signatures.test.ts` read two documents the same way).
//
// WHAT IT ASSERTS, AND IN WHAT ORDER.
//   · `PM-1` — **EVERY DECLARED PANE HAS AN ENTRY, BY NAME.** `DECLARED_PANE_IDS` is a REAL IMPORT from
//     `src/shared/view-shape.ts` (it is exported; the domain is `D-138`'s closed set) and the map's `paneId`s are
//     **DERIVED from `renderer.ts`'s source**: each entry's key expression is resolved — a spelled literal, or an
//     identifier resolved through `view-shape.ts`'s own exported string constants, which is the shape §3's stub
//     declares (`paneId: DEFAULT_PANE_ID`). The two sides are then asserted **as a SUM OF NAMED PARTS and never as a bare
//     count**: each declared pane is asserted present BY NAME, each carried id is asserted declared BY NAME, and the sets
//     are compared whole. **A third declared pane added without an entry reds here, and the red names the pane.**
//   · `PM-2` — **EVERY ENTRY'S `nodeId` IS A SPELLED LITERAL, NOT DERIVED.** §2 says the node side is a literal spelled
//     in the rendering (the envelope publishes no constant for either node — §2 (c)), and §8's sixth guardrail forbids the
//     two sides deriving from each other (`D-188` debt 2). **WHY A DERIVED NODE ID WOULD DEFEAT THE MAP**: the row's whole
//     reading is "which node does this record's pane id name", and it can only read that if the answer is **written
//     down**. `nodeId: paneId`, `` nodeId: `${paneId}` ``, a string-surgery list built from `DECLARED_PANE_IDS`, or a
//     node-side identifier would each put the correspondence **somewhere this probe cannot see** — an identity form
//     would make the declaration deletable (it would say nothing the pane id does not already say) and a computed form
//     would move the claim into code no row reads. **THE `pane-menus` EQUALITY IS A MEASUREMENT AND NOT A LAW** (`D-225`):
//     that entry spells an id equal to its pane id `today`, and `PM-2` measures the SPELLING rather than the equality —
//     asserting that the map is not the identity map (at least one entry's node id differs from its record key) and never
//     that any particular pair is right.
//   · `PM-3` — **THE CONTROL THAT MAKES IT BITE.** The same comparator is driven over FABRICATED sources in the real
//     declaration's shape, in the direction it must be able to fail: a fourth declared pane id the map does not carry
//     reds **and is named**; an entry naming a pane the domain does not declare reds; a **duplicated `paneId`** reds even
//     though the two SETS are equal; a derived node id reds; two EMPTY sides red; an entry that exists only in a comment
//     is not an entry, and a declaration that exists only in a comment reds as no declaration at all. **SO WHAT REDS THIS
//     ROW, STATED PLAINLY: a fourth declared pane, an entry naming a pane the domain does not declare, a duplicated
//     `paneId`, a derived (or unspellable) node id, an empty side, or a map the probe cannot find.**
//
// **AND THE ONE THING THIS ROW DOES NOT SAY IS THAT THE MAP IS CORRECT.** A wrong-but-existing node id is invisible here
// **by design**: `D-225`'s limit `(ii)` — the write and the report consult the SAME map, so a carrier reading it back
// would report a figure from the wrong element and call it right. **`AL-10` is the arm that catches that**, because it
// measures the correspondence in MARKUP, and *which node* is its claim and never this one's. This row proves **totality
// and spelling**, and both are silent about rightness. A node id that no authored element carries passes `PM-1` and
// `PM-2` alike — the paint then writes into nothing and the carrier states `absent`, honestly and silently, and that is
// the reading `AL-10`/`AL-12` own.
//
// **AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked` marker and GATES** (`D-40`): UNMARKED, no carve-out.
// **IT IS A SOURCE PROBE AND NOT A RENDERED MEASUREMENT** (`AGENTS.md`, `D-27`): it reads two files' bytes and imports one
// constant — it runs no turn, constructs no runtime, and says nothing about any rendered surface. It restates no figure
// `brief.md` §6 owns (`D-26`).
//
// **PROVED RED BEFORE IT WAS REPORTED GREEN, TWICE, AND EACH PLANT WAS RESTORED BYTE-IDENTICALLY.** A row that cannot fail
// is a deleted row wearing a new name, so this one has been seen to bite — measured over a byte-saved copy of the file it
// dirtied, `sha256` re-read as the pre-plant digest after the restore:
//   · **THE ENTRY DELETED** — the `pane-menus` entry removed from `PANE_NODE_IDS` in `src/renderer/renderer.ts` reds
//     `PM-1` **ALONE** on the whole directory run (`1 failed | 18 passed` of `19`, `PM-2` and `PM-3` green) with
//     *"the pane pane-menus is declared by `DECLARED_PANE_IDS` and carried by an entry of `PANE_NODE_IDS`: expected
//     `[ 'pane-a' ]` to include `'pane-menus'`"*; restored to `15531c4f…`.
//   · **`D-225`'S OWN SCENARIO, A FOURTH DECLARED PANE** — `'pane-tabs'` added to `DECLARED_PANE_IDS` in
//     `src/shared/view-shape.ts` reds `PM-1` alone in this file (`1 failed | 2 passed`, `PM-2`/`PM-3` green) naming the
//     planted id — *"the pane pane-tabs is declared by `DECLARED_PANE_IDS` and carried by an entry of `PANE_NODE_IDS`"* —
//     which is what `PM-3`'s fixture domain exists to keep off the control arm; restored to `68789596…`.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { DECLARED_PANE_IDS, DEFAULT_PANE_ID, MENUS_PANE_ID } from '../../../src/shared/view-shape.js'

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))

/** **THE TWO FILES §7 NAMES**, by repository-relative path (`D-41`: sites, never offsets). */
const RENDERER = 'src/renderer/renderer.ts'
const VIEW_SHAPE = 'src/shared/view-shape.ts'

/** **THE MAP'S OWN NAME** — the one private declaration this row anchors its read on. It is spelled here because a row
 *  that cannot name what it measures cannot report a miss; the reading below reports `NO declaration` rather than
 *  passing on silence. */
const MAP_NAME = 'PANE_NODE_IDS'

/** The two names the comparisons print, so every message reads the same way and none of them has to be escaped. */
const MAP = '`PANE_NODE_IDS`'
const DOMAIN = '`DECLARED_PANE_IDS`'

/**
 * **COMMENT LINES ELIDED — EVERY READ BELOW IS A READ OF CODE AND NEVER OF PROSE** (`D-93`: prose must neither satisfy nor
 * redden a read). This is `AE-2`'s helper copied rather than imported, for its own reason: a probe that trusts another
 * file's copy of the elider trusts the thing it is measuring. **IT IS CONTROLLED IN `PM-3`**, where an entry that exists
 * only in a comment is proved NOT to be an entry and a wholly commented-out declaration is proved NOT to be a map.
 */
function commentElided(source: string): string {
  const kept: string[] = []
  let inBlock = false
  for (const raw of source.split('\n')) {
    let line = raw
    if (inBlock) {
      const close = line.indexOf('*/')
      if (close < 0) continue
      line = line.slice(close + 2)
      inBlock = false
    }
    let out = ''
    let rest = line
    for (;;) {
      const block = rest.indexOf('/*')
      const slash = rest.indexOf('//')
      if (slash >= 0 && (block < 0 || slash < block)) {
        out += rest.slice(0, slash)
        break
      }
      if (block < 0) {
        out += rest
        break
      }
      out += rest.slice(0, block)
      const close = rest.indexOf('*/', block + 2)
      if (close < 0) {
        inBlock = true
        break
      }
      rest = rest.slice(close + 2)
    }
    if (out.trim().length > 0) kept.push(out)
  }
  return kept.join('\n')
}

/** **AN EXPRESSION AS THE MAP SPELLS IT** — the text, what KIND of thing it is, and the value it names where the probe can
 *  read one. `'literal'` and `'identifier'` are the two forms §3's stub declares (`paneId: DEFAULT_PANE_ID`,
 *  `nodeId: 'gutter-pane'`); **`'derived'` is everything else** — a template literal, a concatenation, a call, an escape
 *  the probe does not read, or the identity — and it is the form `PM-2` exists to name. */
type Expression = {
  readonly spelling: string
  readonly form: 'literal' | 'identifier' | 'derived'
  readonly value: string | null
}

/** **AN ENTRY, AS THE SOURCE SPELLS IT** — the two expressions and nothing read at runtime. */
type Entry = {
  readonly paneId: Expression
  readonly nodeId: Expression
}

/** What the map's source answers: its entries, the reasons the probe could not read them all, and the resolved pane ids. */
type MapReading = {
  readonly entries: readonly Entry[]
  readonly problems: readonly string[]
  readonly paneIds: readonly string[]
}

/** **ONE EXPRESSION CLASSIFIED** — a plain single- or double-quoted literal is `'literal'`; a bare identifier is resolved
 *  through `view-shape.ts`'s own exported string constants (`'identifier'`, or `'derived'` where the table does not carry
 *  it, because a key the probe cannot resolve is a key it cannot compare); everything else is `'derived'`. **AN ESCAPED
 *  LITERAL LANDS IN `'derived'` AND REDS**: the probe reads plain spellings only, and saying so is better than a parser
 *  that silently mis-reads one. */
function expressionOf(raw: string, constants: ReadonlyMap<string, string>): Expression {
  const spelling = raw.trim()
  const single = spelling.match(/^'([^'\\]*)'$/)
  if (single !== null) return { spelling, form: 'literal', value: single[1] ?? '' }
  const double = spelling.match(/^"([^"\\]*)"$/)
  if (double !== null) return { spelling, form: 'literal', value: double[1] ?? '' }
  if (/^[A-Za-z_$][\w$]*$/.test(spelling)) {
    const held = constants.get(spelling)
    return held === undefined ? { spelling, form: 'derived', value: null } : { spelling, form: 'identifier', value: held }
  }
  return { spelling, form: 'derived', value: null }
}

/** **THE `export const NAME = 'value'` TABLE**, read off `view-shape.ts`'s code with its comments elided. `PM-1` cross-reads
 *  its two id rows against the module's own RUNTIME exports, so a parser that stopped understanding the file cannot
 *  report agreement with itself. */
function stringConstantsOf(source: string): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const hit of commentElided(source).matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*'([^'\\]*)'/g)) {
    held.set(hit[1] ?? '', hit[2] ?? '')
  }
  return held
}

/** **THE MATCHING CLOSER, QUOTE-AWARE** — the declaration's array and each entry's object literal are sliced by nesting
 *  depth, so an expression the probe cannot parse still yields the map's SHAPE instead of swallowing the file. `from` is
 *  the first character INSIDE the opener; `-1` answers a slice that never closes. */
function balancedEndOf(text: string, from: number, open: string, close: string): number {
  let depth = 1
  let quote = ''
  for (let at = from; at < text.length; at += 1) {
    const char = text[at]
    if (char === undefined) break
    if (quote !== '') {
      if (char === quote) quote = ''
      continue
    }
    if (char === "'" || char === '"') {
      quote = char
      continue
    }
    if (char === open) depth += 1
    else if (char === close) {
      depth -= 1
      if (depth === 0) return at
    }
  }
  return -1
}

/** **THE ARRAY BODY OF EVERY `const PANE_NODE_IDS … = [` THE SOURCE CARRIES** — the count is itself a reading: `PM-1`
 *  requires exactly one, so a second (shadowing) declaration reds instead of being silently picked. */
function declarationBodiesOf(source: string, name: string): readonly string[] {
  const code = commentElided(source)
  const bodies: string[] = []
  for (const hit of code.matchAll(new RegExp(`\\bconst\\s+${name}\\b[^=]*?=\\s*\\[`, 'g'))) {
    const open = (hit.index ?? 0) + hit[0].length
    const close = balancedEndOf(code, open, '[', ']')
    if (close < 0) continue
    bodies.push(code.slice(open, close))
  }
  return bodies
}

/** Every `{ … }` object literal inside an array body, in source order — one per entry. */
function objectBodiesOf(body: string): readonly string[] {
  const out: string[] = []
  let at = 0
  while (at < body.length) {
    const open = body.indexOf('{', at)
    if (open < 0) break
    const close = balancedEndOf(body, open + 1, '{', '}')
    if (close < 0) break
    out.push(body.slice(open + 1, close))
    at = close + 1
  }
  return out
}

/** One member's expression text inside an entry, or `null` where the entry does not carry it. */
function fieldOf(object: string, name: string): string | null {
  const hit = object.match(new RegExp(`\\b${name}\\s*:\\s*([^,}]+)`))
  return hit === null ? null : (hit[1] ?? '').trim()
}

/** **THE READING ITSELF** — a pure function of (source text, constant table), so `PM-3` can drive it over fabricated
 *  sources in the real declaration's shape. Every reason it could not read the map is a NAMED problem, never a silence. */
function mapReadingOf(source: string, constants: ReadonlyMap<string, string>): MapReading {
  const problems: string[] = []
  const bodies = declarationBodiesOf(source, MAP_NAME)
  if (bodies.length !== 1) {
    problems.push(`the source carries ${String(bodies.length)} declaration(s) of ${MAP} and this probe reads exactly one — a map it cannot locate is a map it cannot measure`)
    if (bodies.length === 0) return { entries: [], problems, paneIds: [] }
  }
  const entries: Entry[] = []
  for (const object of objectBodiesOf(bodies[0] ?? '')) {
    const paneId = fieldOf(object, 'paneId')
    const nodeId = fieldOf(object, 'nodeId')
    if (paneId === null || nodeId === null) {
      problems.push(`an entry spells ${paneId === null ? 'no `paneId`' : 'no `nodeId`'}: ${object.replace(/\s+/g, ' ').trim()}`)
      continue
    }
    entries.push({ paneId: expressionOf(paneId, constants), nodeId: expressionOf(nodeId, constants) })
  }
  const paneIds: string[] = []
  for (const entry of entries) {
    if (entry.paneId.value === null) {
      problems.push(`an entry's \`paneId\` is ${entry.paneId.spelling}, which this probe cannot resolve to a pane id — an unreadable key is a key the comparison cannot make`)
      continue
    }
    paneIds.push(entry.paneId.value)
  }
  return { entries, problems, paneIds }
}

/**
 * **`PM-1`'S COMPARATOR — THE TWO SIDES AS A SUM OF NAMED PARTS.** Each divergence is a sentence that NAMES the id it is
 * about, in the direction it was found: declared-and-uncarried, carried-and-undeclared, carried twice, or a side that is
 * empty. **THE EMPTY ARMS ARE NOT DECORATION**: two empty sets compare equal, so without them the whole row could be
 * satisfied by a map that was deleted and a domain that was never read.
 */
function totalityDivergences(paneIds: readonly string[], declared: readonly string[]): readonly string[] {
  const out: string[] = []
  for (const id of declared) {
    if (!paneIds.includes(id)) out.push(`${id} — declared by ${DOMAIN} and carried by NO entry of ${MAP}`)
  }
  for (const id of paneIds) {
    if (!declared.includes(id)) out.push(`${id} — carried by an entry of ${MAP} and declared by ${DOMAIN} not at all`)
  }
  for (const id of [...new Set(paneIds)]) {
    const times = paneIds.filter((carried) => carried === id).length
    if (times > 1) out.push(`${id} — carried by ${String(times)} entries: a duplicated paneId is a second spelling of one entry, and a SET comparison cannot see it`)
  }
  if (declared.length === 0) out.push(`the domain ${DOMAIN} is EMPTY — two empty sets compare equal and prove nothing`)
  if (paneIds.length === 0) out.push(`${MAP} carries NO resolved pane id — the comparison would pass on nothing at all`)
  return out
}

/** **`PM-2`'S COMPARATOR** — every entry whose node id is not a plain literal, named by its pane id. */
function nodeIdDivergences(entries: readonly Entry[]): readonly string[] {
  const out: string[] = []
  for (const entry of entries) {
    if (entry.nodeId.form === 'literal') continue
    const named = entry.paneId.value ?? entry.paneId.spelling
    const what = entry.nodeId.form === 'identifier' ? 'the identifier' : 'a DERIVED expression'
    out.push(`${named} — its node id is ${what} ${entry.nodeId.spelling}; an entry's node id must be a SPELLED literal, because the correspondence is only readable where it is written down`)
  }
  return out
}

/** How many entries spell a node id equal to their own record key — **A MEASUREMENT, NEVER THE CLAIM**: `PM-2` only holds
 *  the map against being the identity map, whose every entry would say nothing. */
function identityEntryCount(entries: readonly Entry[]): number {
  return entries.filter((entry) => entry.nodeId.value !== null && entry.nodeId.value === entry.paneId.value).length
}

/** The divergences a given id is named in — the control reads the reds by NAME rather than by their count. */
function namedIn(divergences: readonly string[], id: string): readonly string[] {
  return divergences.filter((line) => line.startsWith(`${id} —`))
}

/** **THE CONTROL'S OWN DOMAIN — A FIXTURE, AND NEVER THE TREE'S.** `PM-3` measures the comparator and not the map, so a
 *  control reading the real `DECLARED_PANE_IDS` would red beside `PM-1` on a planted fourth pane and hide which row bit.
 *  The fixture is in the two parsers' own shapes, exactly as `TR-2`'s fabricated document pair is. */
const CONTROL_DOMAIN: readonly string[] = ['pane-a', 'pane-menus']

/** **A FABRICATED MAP IN THE REAL DECLARATION'S SHAPE** — never read off the tree, so the control cannot pass by
 *  measuring the thing it is controlling. */
function plantedMap(entries: string): string {
  return `const ${MAP_NAME}: readonly { readonly paneId: string; readonly nodeId: string }[] = [\n${entries}\n]\n`
}

/** The tree's two real files, read ONCE (`D-41`: the sites, and no offset anywhere in this row). */
const VIEW_SHAPE_CONSTANTS = stringConstantsOf(readFileSync(`${REPO_ROOT}${VIEW_SHAPE}`, 'utf8'))
const MAP_READING = mapReadingOf(readFileSync(`${REPO_ROOT}${RENDERER}`, 'utf8'), VIEW_SHAPE_CONSTANTS)

describe('renderer-wiring · `PANE_NODE_IDS` IS TOTAL OVER `DECLARED_PANE_IDS` AND EVERY NODE ID IS SPELLED', () => {
  it('PM-1 — **EVERY DECLARED PANE HAS AN ENTRY, BY NAME**: the map\'s `paneId`s, derived from `renderer.ts`\'s source, are set-equal to the imported `DECLARED_PANE_IDS` — compared pane by pane and never as a bare count', () => {
    // THE PROBE'S OWN CONTROL FIRST: the constant table its keys resolve through must agree with the module's RUNTIME
    // exports, or a parser that stopped understanding `view-shape.ts` would resolve nothing and compare nothing.
    expect(
      [VIEW_SHAPE_CONSTANTS.get('DEFAULT_PANE_ID'), VIEW_SHAPE_CONSTANTS.get('MENUS_PANE_ID')],
      'PM-1 — the two id constants read out of `view-shape.ts`\'s SOURCE are the two the module EXPORTS: the resolution table this row reads keys through is not a second spelling',
    ).toEqual([DEFAULT_PANE_ID, MENUS_PANE_ID])

    // AND THE MAP IS FOUND AND FULLY PARSED — a declaration the probe cannot locate reds rather than passing on silence.
    expect(MAP_READING.problems, `PM-1 — the map is located and every entry parses: ${MAP} is declared ONCE and each entry carries a readable \`paneId\``).toEqual([])

    const declared: readonly string[] = [...DECLARED_PANE_IDS]
    expect(declared.length, `PM-1 — ${DOMAIN} declares at least one pane, so the comparison has two sides`).toBeGreaterThan(0)

    // EACH DECLARED PANE, ASSERTED BY NAME — the sum of named parts, so a missing entry reds with its own id in the
    // failure rather than as a moved number (`D-168`: a finding is named, never counted).
    for (const id of declared) {
      expect(MAP_READING.paneIds, `PM-1 — the pane ${id} is declared by ${DOMAIN} and carried by an entry of ${MAP}`).toContain(id)
    }
    // AND THE OTHER DIRECTION, ALSO BY NAME — no entry may name a pane the record's domain does not declare.
    for (const id of MAP_READING.paneIds) {
      expect(declared, `PM-1 — the entry for ${id} names a pane ${DOMAIN} declares`).toContain(id)
    }
    // THE TWO SETS, WHOLE — named on both sides, so the reading is the two declarations and not their sizes.
    expect(
      [...MAP_READING.paneIds].sort(),
      `PM-1 — the map's pane ids ${JSON.stringify([...MAP_READING.paneIds].sort())} against the domain's ${JSON.stringify([...declared].sort())}`,
    ).toEqual([...declared].sort())
    expect(
      totalityDivergences(MAP_READING.paneIds, declared),
      'PM-1 — no declared pane is absent from the map, no entry is undeclared, and no pane id is carried twice',
    ).toEqual([])
  })

  it('PM-2 — **EVERY ENTRY\'S `nodeId` IS A SPELLED LITERAL, NOT DERIVED**: each node id is read as a literal in the map\'s own source, and the map is measured not to be the identity map the pane id alone would make it', () => {
    const entries = MAP_READING.entries
    expect(entries.length, `PM-2 — ${MAP} carries at least one entry, so there is a spelling to read`).toBeGreaterThan(0)

    for (const entry of entries) {
      const named = entry.paneId.value ?? entry.paneId.spelling
      expect(
        entry.nodeId.form,
        `PM-2 — the entry for ${named} spells its node id as a LITERAL: a derived id (\`nodeId: paneId\`, a template, string surgery over the domain, or an identifier from another module) would put the correspondence where this row cannot read it`,
      ).toBe('literal')
      expect(entry.nodeId.value, `PM-2 — the entry for ${named} resolves to a node id this probe can compare, not to an expression it cannot read`).not.toBeNull()
      expect((entry.nodeId.value ?? '').length, `PM-2 — the entry for ${named} names a node, and an empty spelling names none`).toBeGreaterThan(0)
    }
    expect(nodeIdDivergences(entries), 'PM-2 — no entry carries a derived node id').toEqual([])

    // **AND THE MAP IS NOT THE IDENTITY MAP** — the one thing its own key side would already have said. If every entry
    // spelled `nodeId` equal to `paneId` the declaration would be deletable and `nodeIdForPane` a no-op, which is not the
    // correspondence `view-shape.ts:136-139` makes necessary. This is a claim about the map carrying SOMETHING, never
    // about WHICH node is right (`D-225`: `AL-10` owns that).
    expect(
      identityEntryCount(entries),
      'PM-2 — at least one entry\'s node id DIFFERS from its record key: a map whose every entry is the identity says nothing, and the two names differ by design for the stage pane',
    ).toBeLessThan(entries.length)
  })

  it('PM-3 — **THE CONTROL THAT MAKES IT BITE**: the same comparator, driven over fabricated sources, reds on a fourth declared pane, an undeclared entry, a duplicated paneId and a derived node id, and cannot pass on two empty sides', () => {
    // (a) THE GREEN CONTROL — the comparator CAN pass, on a fabricated map in the real declaration's shape. Without this
    // arm every red below could be a comparator that only knows how to say no.
    const carried = plantedMap(
      `  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' },\n  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' },`,
    )
    const carriedReading = mapReadingOf(carried, VIEW_SHAPE_CONSTANTS)
    expect(carriedReading.problems, 'PM-3(a) — the fabricated map parses cleanly, so the reds below are the comparator\'s and not the fixture\'s').toEqual([])
    expect(carriedReading.paneIds, 'PM-3(a) — its keys resolve through `view-shape.ts`\'s own constants, in source order').toEqual([DEFAULT_PANE_ID, MENUS_PANE_ID])
    expect(totalityDivergences(carriedReading.paneIds, [...CONTROL_DOMAIN]), 'PM-3(a) — a total map over the same domain answers NO divergence').toEqual([])

    // (b) **A FOURTH DECLARED PANE THE MAP DOES NOT CARRY REDS, AND IS NAMED** — `D-225`'s own scenario, at the comparator.
    const fourth = totalityDivergences(carriedReading.paneIds, [...CONTROL_DOMAIN, 'pane-tabs'])
    expect(fourth, 'PM-3(b) — one divergence and no more: the planted pane is the only disagreement').toHaveLength(1)
    expect(namedIn(fourth, 'pane-tabs'), 'PM-3(b) — and it is NAMED: a declared pane with no entry renders nothing and reports `absent`, honest and silent, which is the whole reason this row exists').toHaveLength(1)

    // (c) AN ENTRY NAMING A PANE THE DOMAIN DOES NOT DECLARE — the same red from the other side.
    const ghost = mapReadingOf(
      plantedMap(
        `  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' },\n  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' },\n  { paneId: 'pane-ghost', nodeId: 'ghost-node' },`,
      ),
      VIEW_SHAPE_CONSTANTS,
    )
    const ghostDivergences = totalityDivergences(ghost.paneIds, [...CONTROL_DOMAIN])
    expect(namedIn(ghostDivergences, 'pane-ghost'), 'PM-3(c) — an entry for a pane the record\'s domain does not declare reds, named').toHaveLength(1)

    // (d) **A DUPLICATED `paneId` — THE RED A SET COMPARISON CANNOT MAKE.** The two SETS below are equal, which is exactly
    // why the duplicate is its own term instead of being left to the set difference.
    const twice = mapReadingOf(
      plantedMap(
        `  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' },\n  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-card' },\n  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' },`,
      ),
      VIEW_SHAPE_CONSTANTS,
    )
    expect([...new Set(twice.paneIds)].sort(), 'PM-3(d) — the SET of the duplicated map\'s keys is the domain, so a set comparison alone would pass it').toEqual([...CONTROL_DOMAIN].sort())
    expect(namedIn(totalityDivergences(twice.paneIds, [...CONTROL_DOMAIN]), DEFAULT_PANE_ID), 'PM-3(d) — and the duplicate REDS anyway, named by its pane id').toHaveLength(1)

    // (e) **A DERIVED NODE ID — THE `PM-2` RED**, in its three shapes: the identity, string surgery, and a node-side
    // identifier resolved from another module's vocabulary.
    const derivedForms = [
      'nodeId: DEFAULT_PANE_ID',
      "nodeId: 'gutter' + '-pane'",
      'nodeId: MENUS_PANE_ID',
    ]
    for (const form of derivedForms) {
      const doctored = mapReadingOf(
        plantedMap(`  { paneId: DEFAULT_PANE_ID, ${form} },\n  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' },`),
        VIEW_SHAPE_CONSTANTS,
      )
      expect(doctored.entries[0]?.nodeId.form, `PM-3(e) — ${form} is not a spelled literal`).not.toBe('literal')
      expect(nodeIdDivergences(doctored.entries), `PM-3(e) — and ${form} is NAMED by the entry's pane id`).toHaveLength(1)
    }

    // (f) **TWO EMPTY SIDES COMPARE EQUAL AND PROVE NOTHING** — the vacuity arm, without which a deleted map could pass.
    expect(totalityDivergences([], []), 'PM-3(f) — an empty domain and an empty map red').not.toEqual([])
    const emptyMap = totalityDivergences([], [...CONTROL_DOMAIN])
    for (const id of CONTROL_DOMAIN) {
      expect(namedIn(emptyMap, id), `PM-3(f) — an empty map reds against a real domain and NAMES the pane ${id} it is missing`).toHaveLength(1)
    }
    expect(emptyMap, 'PM-3(f) — every missing pane, plus the empty side\'s own term: the count is the sum of the named parts and never a bare number').toHaveLength(CONTROL_DOMAIN.length + 1)

    // (g) **PROSE IS NOT A DECLARATION** (`D-93`): an entry that exists only in a comment is not an entry, and a wholly
    // commented-out map reds as NO declaration at all — so the elider cannot be a way for a deleted map to pass.
    const commented = plantedMap(
      `  { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' },\n  { paneId: MENUS_PANE_ID, nodeId: 'pane-menus' },\n  // { paneId: 'pane-tabs', nodeId: 'pane-tabs' },`,
    )
    expect(mapReadingOf(commented, VIEW_SHAPE_CONSTANTS).paneIds, 'PM-3(g) — the commented-out third entry is NOT seen, so prose can neither satisfy nor redden the read').toEqual([DEFAULT_PANE_ID, MENUS_PANE_ID])
    const buried = `// const ${MAP_NAME}: readonly { readonly paneId: string; readonly nodeId: string }[] = [\n//   { paneId: DEFAULT_PANE_ID, nodeId: 'gutter-pane' },\n// ]\n`
    expect(mapReadingOf(buried, VIEW_SHAPE_CONSTANTS).problems, 'PM-3(g) — a map that exists only in a comment reds as NO declaration, with the count named').not.toEqual([])
  })
})
