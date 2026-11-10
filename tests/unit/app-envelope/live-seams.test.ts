// tests/unit/app-envelope/live-seams.test.ts — **THE CENSUS THAT MAKES A DEAD MEMBER UNREPRESENTABLE**
// (`docs/L3/app-envelope/design.md` §5's one OWED instrument, `D-168`'s method, `D-169`'s retirements).
//
// THE SUBJECT. `gutterSeamExample()` is an EXPORTED surface consumed by two realms — `src/renderer/renderer.ts`
// and `demo/pane-drag-demo/demo.ts` — and nothing in this tree asked which of its members anyone actually CALLS.
// That is how the surface reached TEN members with FOUR of them reaching no consumer at all — `startSizeOf` and
// `boundsOf` (with the props they read and their one private parser `numberFrom`), and `applyPreview`/`moveTypeOf`,
// the degenerate seconds of two answers their consumers already supply — and every one of those was found by a HAND
// census taken after the fact. A hand census is exactly what the next member arrives after; the sibling surface
// `PaneDragSurface` lost four members to the same class one pass earlier and only after a member-by-member census was
// taken FIRST (`F8`, `D-168`, `D-169`), which is the method this file applies to a surface the audit never measured.
//
// WHAT THIS FILE ASSERTS, AND IN WHAT ORDER.
//   · `AE-1` — THE SURFACE IS SIX, BY NAME. `Object.keys(gutterSeamExample())` is set-equal to the six names, sorted,
//     written out. A seventh member reds HERE whatever it is called, so no addition can be silent.
//   · `AE-2` — EVERY ONE OF THE SIX IS REACHED BY A CONSUMER. The consumers are FOUND, not listed: every `.ts` file
//     under `src/` and `demo/` is walked, its comments are elided (`D-93`'s rule — prose must neither satisfy nor
//     redden a read), the identifier bound to `gutterSeamExample()` is DERIVED from the call site, and the members
//     read through THAT binding are collected. The census then asserts the two paths, the two per-file reads
//     (`renderer.ts` five, `demo.ts` four — the counts §2 of the design states), the union against the surface, and
//     `dead === []`. A member with no caller is the finding; the row reports the member's NAME.
//   · `AE-3` — THE CENSUS CAN RED. A row that cannot fail is a deleted row wearing a new name, so the same two
//     steps are driven in their TRUE direction: a DOCTORED surface carrying a seventh member answers that member as
//     DEAD, a planted read through the derived binding is SEEN, a commented-out read is NOT, and the binding
//     derivation is proved on a file that binds another name and on one that never calls the example at all.
//
// **MEASURED RED ON A PLANTED SEVENTH MEMBER, NOT ASSUMED** — the pass that authored this row added
// `renderZone: (): undefined => undefined,` to the returned literal in `src/shared/demo-envelope.ts`, ran this file,
// and read all three arms red: `AE-1`'s set difference (`+ "renderZone"`), `AE-2`'s `dead` (`[ 'renderZone' ]`), and
// `AE-3`'s doctored control (`[ 'renderZone', 'renderZone' ]`, the real member leaking into the doctored surface being
// exactly the drift that control exists to catch). The file was then restored BYTE-IDENTICALLY and its `sha256`
// re-read as the pre-plant digest (`b8a8a828…`), with this file green again afterwards. That measurement is what makes
// the green below evidence rather than a restatement.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked-file` marker and GATES (`D-40`): UNMARKED, no
// carve-out, and meant to be able to fail. **IT IS A `src/`-AND-`demo/` CENSUS AND NOT A RENDERED MEASUREMENT**
// (`AGENTS.md`, `D-27`): a green here says the surface's members each have a caller in the module layer, never that
// the affordance works on a rendered page — the live legs own that, and no pointer act reaches the app's drag at all.

import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { gutterSeamExample } from '../../../src/shared/demo-envelope.js'

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))

/** **THE SIX, BY NAME — THE DECLARATION THIS ROW HOLDS THE SURFACE AGAINST.** Sorted, so the comparison is a set's
 *  and not an order's (the returned literal's order is a style, and a style is not a claim). It is re-derived from
 *  `docs/L3/app-envelope/design.md` §2's table, whose five-plus-four reading is what makes the union six. */
const DECLARED_SIX: readonly string[] = ['applyCursor', 'axisOf', 'cursorOf', 'pointerOf', 'resizableOf', 'sizeFromPointer']

/** **THE TWO CONSUMERS §2 NAMES, AND WHAT EACH READS** — asserted as a reading, not assumed: `AE-2` finds the
 *  consumers by walking and then compares each one's reads against these. `applyCursor` is `demo.ts`' alone (the
 *  app's affordance is handed its own cursor write), which is why the union is six and neither list is. */
const DECLARED_READS: Readonly<Record<string, readonly string[]>> = {
  'src/renderer/renderer.ts': ['axisOf', 'cursorOf', 'pointerOf', 'resizableOf', 'sizeFromPointer'],
  'demo/pane-drag-demo/demo.ts': ['applyCursor', 'axisOf', 'pointerOf', 'resizableOf'],
}

/** **COMMENT LINES ELIDED — EVERY CENSUS BELOW READS CODE AND NEVER PROSE** (`D-93`, and this file's own reason for
 *  copying the helper rather than importing it: a census that trusts another file's copy of the elider trusts the
 *  thing it is measuring). A line whose first non-space character opens a `//`, and every stretch inside a `/* … *&#47;`
 *  block, is dropped before any scan runs. **IT IS CONTROLLED IN `AE-3`**, so an elision that swallowed real code
 *  could not pass unnoticed. */
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

/** **THE IDENTIFIER A FILE BINDS THE EXAMPLE TO — DERIVED FROM THE CALL SITE, NEVER SPELLED.** `renderer.ts` calls
 *  it `seams`, and so does the demo, but a census that hard-coded that name would silently stop seeing a consumer
 *  that bound it to `example`; the binding is read off `const <name> = gutterSeamExample()`. A file that never calls
 *  the example answers the empty string, which is what makes it not-a-consumer rather than a consumer of nothing. */
function bindingOf(code: string): string {
  const match = code.match(/\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*gutterSeamExample\(\)/)
  return match === null ? '' : match[1]!
}

/** **THE MEMBERS A FILE READS THROUGH ITS OWN BINDING** — `seams.<member>`, word-bounded on both sides so
 *  `seams.axisOfSomething` is not a read of `axisOf` and `drag.startSizeOf` (a DIFFERENT object's member, which the
 *  app reads) is never mistaken for the example's. */
function readsOf(code: string, binding: string, members: readonly string[]): string[] {
  if (binding.length === 0) return []
  return members.filter((member) => new RegExp(`\\b${binding}\\.${member}\\b`).test(code)).sort()
}

/** Every `.ts` file under one repository-relative root (directories recurse; `node_modules` and dot-directories do
 *  not). **`.mjs` IS DELIBERATELY NOT WALKED**: `demo/pane-drag-demo/demo.mjs` is the GENERATED bundle that embeds
 *  this module's source, so counting it would report the artefact as a third consumer of itself — `DB-1`/`DB-3`
 *  own the artefact, and this row owns the sources. */
function walkTypeScript(rel: string, out: string[] = []): string[] {
  for (const entry of readdirSync(`${REPO_ROOT}${rel}`, { withFileTypes: true })) {
    const child = `${rel}/${String(entry.name)}`
    if (entry.isDirectory()) {
      if (String(entry.name) === 'node_modules' || String(entry.name).startsWith('.')) continue
      walkTypeScript(child, out)
      continue
    }
    if (String(entry.name).endsWith('.ts')) out.push(child)
  }
  return out
}

/** **THE CENSUS ITSELF — every file that binds the example, and the members it reads.** Sorted by path so the
 *  assertion is a set's; a file binding the example and reading NOTHING is a consumer row with an empty `reads`,
 *  which `AE-2` reports as a finding rather than dropping. */
function consumersOf(members: readonly string[]): ReadonlyArray<{ readonly path: string; readonly reads: readonly string[] }> {
  const rows: Array<{ path: string; reads: readonly string[] }> = []
  for (const path of [...walkTypeScript('src'), ...walkTypeScript('demo')].sort()) {
    const code = commentElided(readFileSync(`${REPO_ROOT}${path}`, 'utf8'))
    const binding = bindingOf(code)
    if (binding === '') continue
    rows.push({ path, reads: readsOf(code, binding, members) })
  }
  return rows
}

/** **NO MEMBER WITHOUT A CALLER** — the surface's members, less every member some consumer reads. The empty array is
 *  the whole claim, and a non-empty one NAMES what it found (`D-168`: a finding is named, never counted). */
function deadMembers(
  surface: readonly string[],
  consumers: ReadonlyArray<{ readonly path: string; readonly reads: readonly string[] }>,
): string[] {
  return surface.filter((member) => !consumers.some((consumer) => consumer.reads.includes(member)))
}

describe('app-envelope · `gutterSeamExample()` IS SIX MEMBERS AND EVERY ONE OF THEM HAS A CALLER', () => {
  it('AE-1 · THE SURFACE IS THE SIX NAMES AND NOTHING ELSE — `Object.keys(gutterSeamExample())` is SET-EQUAL to the declared six, so a seventh member reds here whatever it is called', () => {
    const surface = gutterSeamExample()
    // The keys are the DECLARED surface: the interface is inline (not a named export), so the runtime object is the
    // only place the whole surface is readable at once, and `Object.keys` is the read that never needs a type.
    const members = Object.keys(surface).sort()
    expect(members, 'the example is EXACTLY the six the design measures — no seventh member, and no retired name surviving as a member').toEqual([...DECLARED_SIX])
    expect(members.length, 'the count is the measurement and not a memory (`F8` said five dead members of which three had drifted; `D-169` said seven survivors of a surface that read six)').toBe(6)
    // AND THE MEMBERS ARE CALLABLE — a key whose value is not a function would answer a consumer that called it with a
    // `TypeError`, which is the shape of the defect `F11` removed (`seams.startSizeOf is not a function`).
    for (const member of DECLARED_SIX) {
      expect(typeof (surface as unknown as Record<string, unknown>)[member], `\`${member}\` is a FUNCTION and not a placeholder`).toBe('function')
    }
  })

  it('AE-2 · EVERY ONE OF THE SIX IS REACHED BY A CONSUMER — `renderer.ts` reads five and `demo.ts` four, the union is the whole surface, and NO MEMBER IS DEAD', () => {
    const members = Object.keys(gutterSeamExample()).sort()
    const consumers = consumersOf(members)
    // (a) THE CONSUMERS ARE FOUND BY WALKING, AND THERE ARE EXACTLY TWO. A third realm binding the example is a
    //     finding this row reports by path rather than a fact nobody notices.
    expect(consumers.map((consumer) => consumer.path), 'the example has exactly these two consumers under `src/` and `demo/`').toEqual(Object.keys(DECLARED_READS).sort())
    // (b) WHAT EACH READS — the five/four split §2 states, member by member, and `applyCursor` being the demo's alone
    //     is what makes the union six rather than five.
    for (const [path, expected] of Object.entries(DECLARED_READS)) {
      const row = consumers.find((consumer) => consumer.path === path)
      expect(row, `${path} binds \`gutterSeamExample()\` (the census found it by its binding, not by a list)`).toBeDefined()
      expect(row?.reads, `what ${path} reads out of the example`).toEqual([...expected].sort())
    }
    // (c) THE UNION IS THE SURFACE AND THE DEAD SET IS EMPTY — the one assertion the whole file exists for. Its
    //     message names the members, because a count would let a member arrive and another leave unremarked.
    const reached = [...new Set(consumers.flatMap((consumer) => consumer.reads))].sort()
    expect(reached, 'the union of what the consumers read is the whole declared surface').toEqual([...DECLARED_SIX])
    expect(deadMembers(members, consumers), 'NO MEMBER IS DEAD: a member no consumer reads is the class this row makes unrepresentable (`F8`, `D-168`, `D-169`)').toEqual([])
  })

  it('AE-3 · THE CENSUS CAN RED — a DOCTORED surface carrying a seventh member answers it as DEAD, a planted read is SEEN, a commented-out read is NOT, and the binding is derived from the call site rather than spelled', () => {
    const members = Object.keys(gutterSeamExample()).sort()
    const consumers = consumersOf(members)
    // (a) THE DOCTORED SURFACE — a seventh member with no caller, in the shape every one of the retirements took
    //     (`renderZone` is the name `D-168`/`D-169` measured dead, so the control carries a real instance of the
    //     class rather than an invented one). The census NAMES it; it does not merely answer non-empty.
    const seventh = 'renderZone'
    const doctored = [...members, seventh].sort()
    expect(deadMembers(doctored, consumers), 'a seventh member no consumer reads is reported BY NAME').toEqual([seventh])
    expect(deadMembers(members, consumers), 'and the surface as it stands answers NONE — the two arms differ only by the planted member').toEqual([])
    expect(doctored.length, 'the doctored surface is one larger, so the control is not a re-spelling of the real one').toBe(members.length + 1)
    // (b) THE READ EXTRACTOR'S TRUE DIRECTION, on a synthetic file that binds the example and reads through it —
    //     the form the file\'s other rows already take (`D-93`\'s controls, `D-169`\'s `M-4`).
    const planted = 'const seams = gutterSeamExample()\nconst w = seams.renderZone(el)'
    expect(bindingOf(commentElided(planted)), 'the binding is read off the call site').toBe('seams')
    expect(readsOf(commentElided(planted), 'seams', [seventh]), 'the planted read is SEEN').toEqual([seventh])
    expect(readsOf(commentElided(`const seams = gutterSeamExample()\n// seams.renderZone(el)`), 'seams', [seventh]), 'and a COMMENTED-OUT read is not a read (the elision control)').toEqual([])
    // (c) THE BINDING IS DERIVED, NOT ASSUMED: another name is followed, and a file that never calls the example has
    //     no binding at all — so a consumer that renamed its local could not go unseen, and a non-consumer could not
    //     be counted as one reading nothing.
    expect(bindingOf('const example = gutterSeamExample()'), 'any identifier is followed').toBe('example')
    expect(bindingOf('const example = createSomethingElse()'), 'a file that does not call the example answers NO binding').toBe('')
    expect(readsOf('const example = createSomethingElse()\nconst w = example.axisOf(el)', '', ['axisOf']), 'and no binding means no reads, never a wildcard').toEqual([])
  })
})
