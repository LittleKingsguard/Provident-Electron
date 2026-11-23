// tests/unit/mcp-surface/signatures.test.ts — THE `D-45` CHECKING ROW for `docs/L3/mcp-surface/signatures.md`, and the
// ONE row of this file, id `SD-1`, FILE-SCOPED to it: a cite names the file and the id together (`design.md` §9, §11;
// `signatures.md` §7).
//
// WHY IT EXISTS (`D-45`: a document may keep a declaration block only if something compares it to the tree). The page
// this row measures is the one rev 2's `F-4` keeps — the composition function, the port's two types, the class's three
// members, the two option members, the declared `liveRouter` reader and the registration predicate, each a signature
// with no body. This row is the arm of `D-45` that lets the block stand: **EVERY NAME THE DOCUMENT DECLARES MUST EXIST
// IN THE FILE ITS OWN SECTION NAMES.**
//
// **ONE DIRECTION ONLY — DECLARED ⊆ EXPORTED.** The document declares the DELTA of L1 step `S-5`, not the module's
// whole export set (the two files carry on the order of a hundred names between them), so a two-direction equality
// would red on the module's OTHER exports for ever and would make a lawful delta block unkeepable. The whole-set block
// stays owed to the landing pass, when a set-equality can be taken both ways without declaring those names
// (`signatures.md` §7; `design.md` §11).
//
// **WHAT IT DOES NOT COMPARE, SAID HERE SO NO READER TAKES IT FOR MORE THAN IT IS.** (a) The module's whole export set —
// the paragraph above. (b) **ANY BEHAVIOUR**: a signature document carries no body by construction, so it is no
// evidence about a body, and a green here says nothing about what any declared name DOES — no signature document is
// evidence about an implementation (`design.md` §9; `D-45`). It reads DOCUMENTS AND SOURCES ONLY and **RUNS NOTHING**:
// no module is imported, no server constructed, no tool called. The source's own names are read off its BYTES, which is
// the only reading that can see an `export interface` or an `export type` at all — neither has a runtime presence a
// namespace import could enumerate.
//
// **AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` / `strata:marked-file` marker and GATES**
// (D-40; `strata/decisions.md` D-30/D-40).
//
// **RED ON ARRIVAL, AND AT THIS HEAD IT REDS NAMING FOUR NAMES**: `registrationAllowed`, `composePublishedSet`,
// `ActivationLike` and `ActivationSource` are declared by the document and exported by neither source file — `S-5`'s
// absence in `src/**`, which is `signatures.md` §1/§2/§3's whole subject and this row's evidence (`design.md` §9, §11).
// That red is the LANDING's absence and never this row's defect, and **NOT ONE LINE HERE MAY BE SOFTENED TO MAKE IT
// GREEN**: a comparison narrowed until it passes would leave the page uncompared, which is the drift `D-45` exists to
// catch.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

/** The four readings, each taken off the tree by its own path and never through a package specifier. */
const at = (relative: string): string => fileURLToPath(new URL(relative, import.meta.url))

const PAGE = readFileSync(at('../../../docs/L3/mcp-surface/signatures.md'), 'utf8')
const DESIGN = readFileSync(at('../../../docs/L3/mcp-surface/design.md'), 'utf8')
const SECURITY = readFileSync(at('../../../src/main/security.ts'), 'utf8')
const MCP_SERVER = readFileSync(at('../../../src/main/mcp-server.ts'), 'utf8')

/** One `## n. …` section of the document: its number and the text between that heading and the next `## ` — the unit
 *  a declaration is attributed BY. Attribution is the section's, never a tree-wide guess: a `## 1.` name belongs to
 *  `src/main/security.ts` and a `## 2.`…`## 5.` name to `src/main/mcp-server.ts` (§7's contract, restated as
 *  `FILE_OF_SECTION` below). */
interface Section {
  readonly number: string
  readonly body: string
}

const sectionsOf = (document: string): Section[] => {
  const heads = [...document.matchAll(/^## (\d+)\.(.*)$/gm)]
  return heads.map((head, index) => ({
    number: head[1] as string,
    body: document.slice(head.index ?? 0, index + 1 < heads.length ? heads[index + 1]?.index ?? document.length : document.length),
  }))
}

/** The `ts` fences of a text and NO OTHER FENCE: the document's `boundary-declared` block is JSON, and a JSON block is
 *  not a declaration block — a reader that took every fence would parse a record's members as signatures. */
const tsBlocksOf = (text: string): string[] =>
  [...text.matchAll(/```([\w-]*)[^\S\n]*\n([\s\S]*?)```/g)]
    .filter((fence) => fence[1] === 'ts')
    .map((fence) => fence[2] as string)

/** **THE ONE READER OF A DECLARATION, DRIVEN OVER TWO SUBJECTS.** The same regex reads a document's `ts` block and a
 *  source file's bytes, because the question is the same one in both places: which names does this text declare with
 *  an `export`? Over a source it must be the BYTES and never a namespace object — `export interface`/`export type`
 *  have no runtime presence, so `import * as m` cannot see them (`signatures.md` §7). */
const exportedNames = (text: string): string[] =>
  [...text.matchAll(/^export (?:const|function|interface|type) ([\w$]+)/gm)].map((hit) => hit[1] as string)

/** **A DECLARED NAME'S FILE IS THE FILE ITS OWN SECTION NAMES, AND THIS IS THE WHOLE MAP** (`signatures.md` §7): §1
 *  transcribes `src/main/security.ts`; §2…§5 transcribe `src/main/mcp-server.ts`. A section OUTSIDE the map that
 *  declares a name is REPORTED and never skipped — silently dropping a declaration would be the one failure this row
 *  exists to catch, and it is idle at rev 2 because §6 and §7 carry no `export` line. */
const FILE_OF_SECTION: ReadonlyMap<string, string> = new Map([
  ['1', 'src/main/security.ts'],
  ['2', 'src/main/mcp-server.ts'],
  ['3', 'src/main/mcp-server.ts'],
  ['4', 'src/main/mcp-server.ts'],
  ['5', 'src/main/mcp-server.ts'],
])

/** One name the document declares, with the file the section it stands in names. Attribution is the SECTION's: the
 *  name itself carries no file, and a tree-wide guess about where it lives is what §7's contract replaces. */
interface Declaration {
  readonly name: string
  readonly file: string
}

const declarationsOf = (document: string): Declaration[] =>
  sectionsOf(document).flatMap((section) =>
    tsBlocksOf(section.body).flatMap((block) =>
      exportedNames(block).map((name) => ({
        name,
        file: FILE_OF_SECTION.get(section.number) ?? `§${section.number}, a section that names no source file`,
      })),
    ),
  )

/** The names each file actually EXPORTS, read off its bytes. */
const SOURCED: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ['src/main/security.ts', new Set(exportedNames(SECURITY))],
  ['src/main/mcp-server.ts', new Set(exportedNames(MCP_SERVER))],
])

/** **THE COMPARATOR, IN ONE DIRECTION**: every declared name the named source does not export, as one line per name —
 *  so a failure lists WHAT the page promises and the module does not carry. An export the page does not declare is
 *  deliberately absent from the answer, which is what keeps a delta block lawful (§7's one direction). */
const divergence = (declared: readonly Declaration[], sourced: ReadonlyMap<string, ReadonlySet<string>>): string[] => {
  const reported: string[] = []
  const seen = new Set<string>()
  for (const { name, file } of declared) {
    const key = `${name} in ${file}`
    if (seen.has(key)) continue
    seen.add(key)
    if (sourced.get(file)?.has(name) === true) continue
    reported.push(`${name} (declared, not exported by ${file})`)
  }
  return reported
}

/** The `**Rev:** N` a document carries, or `''` where it carries none — the header marker, not any later prose that
 *  happens to spell a rev (both pages mention "rev 2" in their bodies; only the header line is the marker). */
const revOf = (document: string): string => /\*\*Rev:\*\* (\d+)/.exec(document)?.[1] ?? ''

describe('D-45 — `signatures.md`\'s declaration block, compared to the files its own sections name', () => {
  it('SD-1 — every name the document declares is exported by the file its section names, one direction only, and the page transcribes the CURRENT design rev (signatures.md §7; design.md §9, §11)', () => {
    const declared = declarationsOf(PAGE)

    // (0) **THE PRECONDITION OF THE PARSE, STATED SO THIS ROW CANNOT GO VACUOUSLY GREEN.** An empty reading would make
    // the comparison below compare nothing to nothing and pass, so a page whose fences stopped parsing — or a document
    // that stopped declaring — must red HERE instead of reading as agreement.
    expect(
      declared.length,
      '§7 — the document\'s `ts` fences declare names at all: an empty reading would make the comparison below vacuously ' +
        'green, and a signature page that declares nothing is not the subject `D-45` keeps the block for',
    ).toBeGreaterThan(0)

    // (1) **THE DRIFT PIN, TAKEN BEFORE THE COMPARISON AND FOR THAT REASON.** A signature page transcribed from a
    // superseded design is not evidence about the current tree: it may compare clean against a module the design has
    // already moved, so the two revs are read and compared first. This is the drift class the store-tabs-record
    // precedent pins in the same shape (`tests/unit/store-tabs-record/signatures.test.ts`, `C-7`), and the two readings
    // are the two headers' own `**Rev:** N` markers — `signatures.md` and `design.md` (`signatures.md` §7).
    const designRev = revOf(DESIGN)
    const pageRev = revOf(PAGE)
    expect(
      designRev,
      '§7 — the precondition: `design.md` carries a `**Rev:** N` header, so the pin has two readings to compare rather ' +
        'than one and a silence',
    ).not.toBe('')
    expect(
      pageRev,
      '§7, §11 — `signatures.md` transcribes `design.md`\'s CURRENT rev: a signature page left at an earlier rev was ' +
        'transcribed from a design that has since moved, which is the drift class this pin exists for (the ' +
        'store-tabs-record precedent pins the same way, `C-7`)',
    ).toBe(designRev)

    // (2) **THE COMPARISON ITSELF**: every name the document declares must exist in the file its section names.
    expect(
      divergence(declared, SOURCED),
      '§7 — **EVERY NAME THE DOCUMENT DECLARES MUST BE EXPORTED BY THE FILE ITS SECTION NAMES, AND EACH LINE ABOVE IS ' +
        'THAT FAILURE**: the page promises a signature the module does not carry, so an L4 seat implementing against ' +
        'this block would write a NAME NOTHING EXPORTS. One direction only — an export the page does not declare is ' +
        'the whole-set block\'s business and stays owed to the landing pass (`design.md` §11, `D-45`)',
    ).toEqual([])
  })
})
