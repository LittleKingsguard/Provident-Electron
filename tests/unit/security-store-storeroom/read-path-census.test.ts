// tests/unit/security-store-storeroom/read-path-census.test.ts — THE READ PATH IMPORTS NOTHING (`D-85`).
//
// WHY THIS FILE EXISTS AT ALL, AND WHY IT IS NOT A SECOND COPY OF `creation-declarations.test.ts`. That battery measures the
// creation instant at the PACKAGE BOUNDARY — a runtime datum — and says in its own header that no row in it reads
// `src/**`. The claim this file carries is a different kind and cannot be taken there: *"`read()` and `readAppState()` no
// longer import"* is a claim about CODE, and the module's own docblocks name `importOnce` and `importAppStateOnce`
// everywhere — the two repairs that now own them, the `D-84`/`D-85` register, the headstone of the read-side derivation.
// **A NAIVE BYTE READ PASSES ON A COMMENT**, which is the hollow-green class this corpus keeps meeting (`D-83`'s own
// measurement: **3** raw hits, **0** elided). So every absence below is asserted over the source WITH COMMENTS ELIDED,
// and each absence is paired with a POSITIVE CONTROL over the same reader showing the name it looks for is really in the
// file — otherwise a reader that elided everything, or a path that resolved to nothing, would pass every row here.
//
// THE SUBJECT IS THE MODULE'S OWN SOURCE, read as a source: `src/main/operator-settings/index.ts`, the one file this unit
// declares (`signatures.md` §3's census). Nothing here imports the module or constructs a store: the runtime half of the
// claim is `CD-3`, `CD-7`, `CD-8` and `CD-10`.
//
// NO MARKER: authored after D-30's sweep, so it is new evidence and it gates (D-40).
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const SOURCE = new URL('../../../src/main/operator-settings/index.ts', import.meta.url)
const raw = (): string => readFileSync(SOURCE, 'utf8')

/** **THE SAME BYTES WITH COMMENTS ELIDED — the only reader an ABSENCE row may use** (`D-83`'s function, re-stated here so
 *  this file cannot inherit a change to another file's reader): block comments removed, comment LINES dropped, and a
 *  trailing `//` comment stripped from a code line. Prose in this module is most of its length, so a raw-byte absence row
 *  would be red for a reason that is not a defect, and a raw-byte PRESENCE row would be green for a reason that is not the
 *  code. */
const code = (): string =>
  raw()
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => {
      const trimmed = line.trimStart()
      return !trimmed.startsWith('//') && !trimmed.startsWith('*')
    })
    .map((line) => line.replace(/\s\/\/.*$/, ''))
    .join('\n')

/** A declaration's own body, by brace matching from its opening brace — either a `function NAME(…) { … }` or a
 *  `const NAME = (…) => { … }`, because this module declares its repairs as functions and its three verbs as closures.
 *  A row that named a region by line numbers would rot at the first insertion (`D-41`). */
function bodyOf(name: string): string {
  const text = code()
  const fn = text.indexOf(`function ${name}(`)
  const start = fn >= 0 ? fn : text.indexOf(`const ${name} = (`)
  if (start < 0) throw new Error(`no declaration of \`${name}\` in the module's code`)
  const open = text.indexOf('{', fn >= 0 ? text.indexOf(')', start) : text.indexOf('=>', start))
  if (open < 0) throw new Error(`no body opened for ${name}`)
  let depth = 0
  for (let index = open; index < text.length; index += 1) {
    if (text[index] === '{') depth += 1
    else if (text[index] === '}') {
      depth -= 1
      if (depth === 0) return text.slice(open, index + 1)
    }
  }
  throw new Error(`the body of ${name} never closes`)
}

describe('the read path · measured over the module’s code, never over its prose (D-85)', () => {
  it('RW-1 · `read()` and `readAppState()` perform NO import: neither verb calls either import-once arm, neither holds a `readFileSync`, and neither names a retired carrier — with the comment-elided control that the names ARE in the file (D-84, D-85)', () => {
    // THE POSITIVE CONTROLS, FIRST AND OVER THE SAME READER: the two arms exist, they are called from somewhere in this
    // file, and the raw bytes carry the names in prose too — so an absence below cannot be an elision that took everything
    // with it, and a presence row could not have been satisfied by a comment.
    expect(code().includes('function importOnce('), 'the record’s import arm stands in this file').toBe(true)
    expect(code().includes('function importAppStateOnce('), 'and the row list’s').toBe(true)
    expect(raw().includes('importOnce'), 'and the RAW bytes name it as well — in this module the prose names both arms, which is exactly why the absence rows below read the elided text').toBe(true)
    expect(raw().includes('importAppStateOnce'), 'the second arm named in prose too').toBe(true)

    const readBody = bodyOf('read')
    const appStateBody = bodyOf('readAppState')
    for (const [label, body] of [['read()', readBody], ['readAppState()', appStateBody]] as const) {
      expect(body.length, `${label}: the body was found and is a body, not an empty slice`).toBeGreaterThan(80)
      expect(/\bimportOnce\s*\(/.test(body), `${label}: the record’s import arm is NOT called on the read path — the address’s absence is repaired at the creation instant, and the read reads the record that repair wrote (D-85)`).toBe(false)
      expect(/\bimportAppStateOnce\s*\(/.test(body), `${label}: nor the row list’s`).toBe(false)
      expect(/\breadFileSync\s*\(/.test(body), `${label}: and no \`fs\` read stands on the read path at all`).toBe(false)
      expect(/provident-security\.json|provident-settings\.json|RETIRED_NAME|RETIRED_SETTINGS_NAME/.test(body), `${label}: nor is a retired carrier’s name or constant reachable from it`).toBe(false)
      expect(/\boverlay\b|\bappImport\b/.test(body), `${label}: and the two read-side holders the derivation used are gone — neither \`overlay\` nor \`appImport\` survives in either verb`).toBe(false)
    }

    // **AND THE ONE READ-SIDE FALLBACK THAT REMAINS IS NAMED BY THE CODE, NOT BY PROSE**: `read()` still answers
    // `FIRST_RUN` and `readAppState()` still answers an empty row list, and both are the refused-construction arm — no
    // instance, hence no batch and no repair (measured, `D-84`; asserted at the surface by `CD-12`). The row pins that the
    // surviving default is the CONSTANT and the empty list, so "the read imports nothing" cannot have been bought by
    // deleting the arm that has to answer when nothing stands.
    expect(/:\s*FIRST_RUN\b/.test(readBody), 'read(): the placeholder is still the answer over no record, and it is `FIRST_RUN` — the arm no declaration can reach').toBe(true)
    expect(/rows:\s*\[\]/.test(appStateBody), 'readAppState(): and the empty row list is still the answer over no store').toBe(true)
    expect(appStateBody.includes('unrepresentableOf(held)'), 'while the names are read OFF THE RECORD, which is where the repair wrote them').toBe(true)
  })

  it('RW-2 · each import-once arm is named on exactly TWO code lines — its declaration and its REPAIR’s call — while the raw bytes name the same words five and four times: the count that makes the elision load-bearing (D-83, D-85)', () => {
    // **THIS ROW IS THE ONE THE HOLLOW-GREEN CLASS IS AIMED AT.** The module's prose names both arms on every page — the
    // two repairs that own them, the `D-84`/`D-85` register, the headstone of the derivation they replaced — so a count or
    // an absence taken over the RAW bytes is a reading of the commentary. Measured 2026-11-03 on this head: `importOnce`
    // **5** raw and **2** elided, `importAppStateOnce` **4** raw and **2** elided. Both figures are asserted, and the
    // elided one is what carries the claim.
    const lines = code().split('\n')
    const naming = (name: string): string[] => lines.filter((line) => line.includes(name)).map((line) => line.trim())
    const rawOccurrences = (name: string): number => raw().split(name).length - 1

    for (const [name, rawCount] of [['importOnce', 5], ['importAppStateOnce', 4]] as const) {
      expect(rawOccurrences(name), `the PROSE names \`${name}\` ${rawCount} times — a raw-byte reading is a reading of the commentary, which is the class this file exists to refuse`).toBe(rawCount)
      expect(naming(name), `and the CODE names it twice, in that order: the declaration, then the one repair that calls it (D-85)`).toEqual([
        `function ${name}(userDataDir: string): ${name === 'importOnce' ? 'Row | undefined' : 'AppStateImport'} {`,
        expect.stringContaining(`${name}(userDataDir)`),
      ])
      expect(naming(name).filter((line) => line.startsWith('function ')).length, `and exactly one of the two is the declaration — so exactly one CALL stands in the whole module`).toBe(1)
    }

    // THE CALLS ARE THE REPAIRS', AND THE REPAIRS ARE THE ONLY WRITERS THE ABSENCE-KEYED ACT HAS: `mintRecord` owns the
    // record's import and `mintAppState` the row list's, which is the whole of `D-85`'s move — the act the marker keyed
    // stands INSIDE the repair that stands where the marker stood.
    expect(bodyOf('mintRecord').includes('importOnce(userDataDir)'), 'the record’s import is called by the repair at `[\'operator-settings\']`').toBe(true)
    expect(bodyOf('mintAppState').includes('importAppStateOnce(userDataDir)'), 'and the row list’s by the repair at `[\'operator-app-state\']`').toBe(true)
    expect(bodyOf('mintExclusion').includes('import'), 'while the `mem` pair’s repair imports nothing at all — its address can never come from a file (D-84)').toBe(false)
  })
})
