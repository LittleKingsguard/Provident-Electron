// tests/fork-store-reads.test.ts
// ===========================================================================
// `U-FORK-STORE-READS` (ledger row `H3`) — **THE RED SET** (RCA-1, authored
// FIRST from the spec ALONE).
//
// Contract: docs/specs/fork-store-reads.md (`STATUS LINE`, `§0`/`§0.1`–`§0.3`,
// `§0A`/`§0A.1`–`§0A.3`, `§1`/`§1.1`–`§1.2`, `§2`/`§2.1`–`§2.4`, `§3`/`§3.1`–
// `§3.5`, `§4`/`§4.1`–`§4.3`, `§5`/`§5.1`–`§5.4`, `§6`/`§6.1`–`§6.4`, `§7`/
// `§7.1`–`§7.3`, `§8`/`§8.1`–`§8.3`, `§5.5`).
//
// ---------------------------------------------------------------------------
// WHAT THIS FILE IS — the spec's `§0.2`/`§5.5` DECIDE THE SHAPE, not this file
// ---------------------------------------------------------------------------
// `§0.2`: *"THIS UNIT IS DOC/RULE-BEARING IN THIS REPO. NO `src/**` FILE IS
// ADDED OR EDITED. NO TEST FILE IS AUTHORED. NO LEG IS RUN."* — and `§5.5`
// declares the typed register a **RECORDED ZERO-ROW EXEMPTION** under
// `AGENTS.md` item 11(g). **The exemption is DECLARED, JUSTIFIED and NOT
// SILENT**, and it is taken here **as the spec states it**: this file invents
// **NO register layer**, no `P-FSR-*` row, no seed, no attempt total. Reporting
// `U-FORK-STORE-READS register: N/N held` would be **the very review finding
// `§5.5` item 1 names**, because the unit declares zero rows and executed
// nothing. **`§5.5` item 3: the caps are VACUOUS here BY CONSTRUCTION — `0`
// rows means `0` attempts, `0 <= 400` ✔ with per-row maximum `0` ✔.**
//
// So the deliverable this file must pin is **the rule/contract's own verifiable
// assertions over the artifacts that DO exist** (`§5.5`'s own answer to *"How
// are this file's fixed comparisons executed?"*: *"The file's checkable content
// is its citation set (`§8.1`) and its row-id index (`§8.3`): a reviewer can
// verify that every cited §/row id exists at the site named — a citation audit,
// not a property run."*). Three families, and nothing else:
//
//   FAMILY A — THE SPEC'S OWN DECLARED FACTS, checkable mechanically (`§8.1`
//     citation set, `§8.3` row-id index, `§0A` ledger arithmetic, `§5.3`
//     frozen list, `§6.2` five prohibitions, `§5.5` exemption, `§0A.3` edges).
//   FAMILY B — THE GRAPH-CARRIER RULE'S OWN OBSERVABLE OVER THE LIVE REPO
//     (`§2.1` `GCR-1` / `§2.3` `GCR-2`·`GCR-3`, in the finding form `GCR-3`
//     requires) — the substantive half. Red for today's HONEST reason if a
//     violation exists, green with a POSITIVE CONTROL where the repo conforms.
//   FAMILY C — THE OWED / NOT-TESTABLE-HERE HALVES, recorded as the spec
//     records them (`§6.3`'s `OWED` handoff note, `H-r6`'s fork boundary,
//     `§7.1`'s `AMB-*` non-claims). **No row here reddens about fork bytes**
//     (`§7.1` `AMB-3`: this repo holds no instrument over the fork's tree, and
//     `§7.3` item 3: a `[READ]` claim of a file this pass did not open is not
//     made).
//
// ---------------------------------------------------------------------------
// ROW STATES ENUMERATED FIRST (the contract asks one valid row per data state,
// one fail-safe row per documented fail-state — applied here at the CONTRACT's
// own data states, since the unit's subject is a document and a rule)
// ---------------------------------------------------------------------------
// The spec's own row-state vocabulary, enumerated BEFORE the rows (`§4.2`'s
// six resolution states + `§5.1`'s four migration invariants + `§6.2`'s five
// prohibitions + `§7.1`'s five ambiguities + `§8.3`'s six row-id families):
//
//   S-1  the spec file exists and is whole (§0.1 item 1: LANDED by this filing)
//   S-2  every cited §/row id resolves at the named site (§8.1/§8.3)
//   S-3  the claim ledger's arithmetic holds and prints its terms (§0A.2)
//   S-4  the supersession pointer edges exist and resolve both directions (§0A.3)
//   S-5  the five prohibitions are stated, incl. NO `P-16` carve-out (§6.2)
//   S-6  the nine frozen items are present and enumerated (§5.3)
//   S-7  the zero-row exemption is EXPLICIT, justified and NOT silent (§5.5)
//   S-8  the migration invariants + the shape's five steps are enumerated (§3.1/§5.1)
//   S-9  the live repo's MCP surface carries NO direct-store-read handler (§2.1/§2.3)
//   S-10 the owed/fork/ambiguity halves are recorded — the as-filed `OWED` KEPT VISIBLE
//        beside the dated `LANDED 2026-10-03` clause (`RCA-8(d)` annotate-beside), the
//        delivered note VERIFIED PRESENT at its site, and neither half presented as a
//        pass this repo took (§6.3/§7.1)
//
// FAIL-STATES (one row each, per documented fail-state):
//   F-A  a cited § resolves to nothing at the named site
//   F-B  a cited § resolves but is the WRONG kind of anchor (bare vs file-qualified, §0.2's
//        FILE-QUALIFICATION NOTE — the ambiguity that note exists to prevent)
//   F-C  a `file:symbol` the spec names does not exist in the tree
//   F-D  the ledger total ≠ the sum of its own printed terms (§0A.2)
//   F-E  an edge exists with no counterpart direction (§0A.3)
//   F-F  a `P-16` carve-out / exemption token appears (§6.2 prohibition 1)
//   F-G  the handoff note is claimed WRITTEN when the fork tree is untouched (§6.3)
//   F-H  a direct-store-read handler is present in the MCP surface and unrecorded (§2.3 GCR-3)
//   F-I  a row asserts a section exists that does not (the AMB-1 boundary, §7.1)
//
// ---------------------------------------------------------------------------
// RED-FIRST STATE AT THIS TREE (verified by this run — recorded, never assumed)
// ---------------------------------------------------------------------------
// This unit lands ONE document and nothing else. **Every row below that reads
// that document is RED until the document exists at its cited path** — and the
// document DOES exist at this tree (it is this unit's filing), so those rows are
// expected to be GREEN on the citation/by-construction half and RED only where
// the spec's own declared fact does not hold at the tree it cites. **A RED row
// below names its honest cause; a GREEN row says the repo already conforms.**
// The scanner rows carry a PLANTED-FIXTURE positive control (`R-1`-family
// discipline, `tests/pane-drag-compliance.test.ts`'s pattern) so a green is
// never a vacuous green.
//
// **NO `src/**` BYTE IS READ FOR BEHAVIOUR HERE.** The two files Family B scans
// are read as TEXT at test time (the repo's established docs/contract-row
// technique) — the same relation `§3.2` cites them by `file:symbol`.
// ===========================================================================
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const specPath = (rel: string): string => `${ROOT}/${rel}`

/** The unit's contract — `docs/specs/fork-store-reads.md` (`§0.1` item 1). */
const SPEC_REL = 'docs/specs/fork-store-reads.md'
const SPEC = readFileSync(specPath(SPEC_REL), 'utf8')

/** Read a repo file, or `null` when absent. The `null` return turns "the
 *  surface is absent" into a LABELLED assertion failure rather than a
 *  compile/import error (the `tests/ui-leg-contract.test.ts` technique). */
function readOrNull(rel: string): string | null {
  const abs = specPath(rel)
  return existsSync(abs) ? readFileSync(abs, 'utf8') : null
}

/** The spec's sections, as `§N` / `§N.M` / `§N.M.K` / `§0A.M` headings. Built
 *  from the file's OWN headings so a §-reference row tests resolution, not a
 *  hand-copied list (§8.2 is the section list; this is its executable form). */
const SPEC_HEADINGS: readonly string[] = (SPEC.match(/^#{2,4} +.*$/gm) ?? []).map((h) =>
  h.replace(/^#+ +/, '').trim(),
)

/** A `§` reference in the spec's prose, normalised to its bare form. */
function sectionRefs(text: string): string[] {
  const out = new Set<string>()
  for (const m of text.matchAll(/§(\d+A?(?:\.\d+)*)/g)) out.add(m[1] as string)
  return [...out]
}

/** Does this spec file carry an anchor for `§<ref>`? An anchor is a heading
 *  whose own text begins with the `§`-form (the repo's heading convention:
 *  `### 3.2 The seams that EXIST TODAY`, `## 0A. The claim ledger`). */
function hasSection(rel: string, ref: string): boolean {
  const src = readOrNull(rel)
  if (src === null) return false
  const esc = ref.replace(/\./g, '\\.')
  return new RegExp(`^#{2,4} +§?${esc}[. ]`, 'm').test(src)
}

// ===========================================================================
// FAMILY A — THE SPEC'S OWN DECLARED FACTS, checkable mechanically
// ===========================================================================

describe('§0.1 / §0.2 — the unit landed its document and nothing else (S-1)', () => {
  it('S-1: `docs/specs/fork-store-reads.md` EXISTS, is this unit\'s contract, and its STATUS LINE carries the doc/rule-bearing posture (§0.1 item 1 "LANDED by this filing"; §0.2)', () => {
    const spec = readOrNull(SPEC_REL)
    expect(spec, `S-1 — the unit's contract is absent at ${SPEC_REL} (§0.1 item 1: "LANDED by this filing"); every Family-A row below is derived from its bytes`).not.toBeNull()
    if (spec === null) return
    expect(spec.split('\n')[0], 'S-1 — the first line names the unit and the ledger row, so this file is the contract and not a sibling (§0.3 citation discipline)').toContain('U-FORK-STORE-READS')
    expect(spec.split('\n')[0], 'S-1 — and its ledger row id (`H3`), by name (§0.3: "a row id is cited BY NAME")').toContain('`H3`')
    expect(spec, 'S-1 — the STATUS LINE states the doc/rule-bearing posture (§0.2): no `src/**` byte, no test, no ledger move, no tracker edit').toMatch(/DOC\/RULE-BEARING IN THIS REPO/)
    expect(spec, 'S-1 — and the zero-row register exemption is stated IN THE STATUS LINE, never left to be inferred (§0.2/§5.5)').toMatch(/ZERO-ROW EXEMPTION/)
  })

  it('S-1 (fail-state F-C): every `file:symbol` the spec cites at `§3.2`/`§4.2` resolves to a REAL file — the seam signatures are cited, not invented (§3.2 "Each row names a seam, its site and its shape as landed")', () => {
    // The fork's own tree is OUT OF SCOPE by the spec's own boundary (§0.1: this
    // repo writes NO file under `<Astrographer>/`), so only THIS repo's named
    // paths are resolvable here. The foundation-side paths the spec names:
    const cited = ['docs/specs/mcp-endpoint.md', 'docs/specs/data-ownership-model-plan.md', 'docs/pending.md', 'docs/decisions.md', 'docs/next-steps.md', 'docs/FORKER.md', 'AGENTS.md']
    const missing = cited.filter((rel) => !existsSync(specPath(rel)))
    expect(missing, `F-C — every foundation-side path the spec cites by name exists in the tree; missing: ${JSON.stringify(missing)} (§8.1's authority table names each site)`).toEqual([])
  })
})

describe('§8.1 / §8.2 / §0.2 — the citation set resolves at the sites the spec names (S-2)', () => {
  it('S-2: every `§`-reference the spec makes to a FOUNDATION file resolves to a heading at that file — `mcp-endpoint.md` (§3, §3.1–§3.7, §6.1–§6.5, §7, §8) and `data-ownership-model-plan.md` (§1.8, §2.3, §2.5, §5.2.7) (§8.1)', () => {
    // The spec's own FILE-QUALIFICATION NOTE (§0.2): where the spec writes
    // `§3.1`–`§3.5` etc. "without naming a file in the same clause, the target is
    // `docs/specs/mcp-endpoint.md` or `docs/specs/data-ownership-model-plan.md`
    // as the clause's own authority column says". These are the FOUNDATION-side
    // refs §8.1 enumerates, asserted one by one so a miss names its site (F-A).
    const foundation: ReadonlyArray<readonly [string, string]> = [
      ['docs/specs/mcp-endpoint.md', '3'],
      ['docs/specs/mcp-endpoint.md', '3.1'],
      ['docs/specs/mcp-endpoint.md', '3.2'],
      ['docs/specs/mcp-endpoint.md', '3.3'],
      ['docs/specs/mcp-endpoint.md', '3.4'],
      ['docs/specs/mcp-endpoint.md', '3.5'],
      ['docs/specs/mcp-endpoint.md', '3.6'],
      ['docs/specs/mcp-endpoint.md', '3.7'],
      ['docs/specs/mcp-endpoint.md', '6.1'],
      ['docs/specs/mcp-endpoint.md', '6.2'],
      ['docs/specs/mcp-endpoint.md', '6.3'],
      ['docs/specs/mcp-endpoint.md', '6.4'],
      ['docs/specs/mcp-endpoint.md', '6.5'],
      ['docs/specs/mcp-endpoint.md', '8'],
      ['docs/specs/data-ownership-model-plan.md', '1.8'],
      ['docs/specs/data-ownership-model-plan.md', '2.3'],
      ['docs/specs/data-ownership-model-plan.md', '2.5'],
    ]
    const unresolved = foundation.filter(([rel, ref]) => !hasSection(rel, ref)).map(([rel, ref]) => `${rel} §${ref}`)
    expect(unresolved, `S-2/F-A — every foundation §-reference the spec's §8.1 authority table names resolves to a heading at that file; UNRESOLVED: ${JSON.stringify(unresolved)}`).toEqual([])
  })

  it('S-2: the spec\'s OWN sections all resolve inside itself — `§0A`\'s edges, `§2`–`§8` and the `§5.5` register slot are all citable (§8.2 section list)', () => {
    // §8.2 is the spec's own section list "for citation from later passes". The
    // rows below cite §0A.3, §2.1, §2.3, §5.3, §5.5, §6.2, §6.3, §7.1 — so those
    // anchors MUST exist or every citing row is unverifiable (§0A.3: "a
    // supersession whose edge is absent is a review finding").
    const own: readonly string[] = ['0', '0.1', '0.2', '0.3', '0A', '1', '1.1', '1.2', '2', '2.1', '2.2', '2.3', '2.4', '3', '3.1', '3.2', '3.3', '3.4', '3.5', '4', '4.1', '4.2', '4.3', '5', '5.1', '5.2', '5.3', '5.4', '5.5', '6', '6.1', '6.2', '6.3', '6.4', '7', '7.1', '7.2', '7.3', '8', '8.1']
    const unresolved = own.filter((ref) => !hasSection(SPEC_REL, ref))
    expect(unresolved, `S-2/F-A — the spec's OWN §-anchors resolve inside it (its §8.2 section list is the enumeration); UNRESOLVED: ${JSON.stringify(unresolved)}`).toEqual([])
  })

  it('S-2 (fail-state F-B): the spec\'s FILE-QUALIFICATION NOTE holds — the spec\'s OWN `§3.x` set is EXACTLY `§3.1 GCR-SHAPE-5 · §3.2 landed seams · §3.3 exemption arm · §3.4 multi-store pointer · §3.5 fork-side seams`, so a bare `§3.1` is NOT the foundation seam table (§0.2\'s FILE-QUALIFICATION NOTE)', () => {
    const get = (ref: string): string | null => {
      const m = new RegExp(`^#{2,4} +§?${ref.replace(/\./g, '\\.')}[. ] *(.*)$`, 'm').exec(SPEC)
      return m === null ? null : (m[1] as string)
    }
    expect(get('3.1'), 'F-B — this file\'s `§3.1` is `GCR-SHAPE-5` (the five-step shape), NOT `mcp-endpoint.md` §3.1\'s `provident.dispatch` table (§0.2\'s note exists precisely to keep these apart)').toMatch(/five ordered steps/i)
    expect(get('3.2'), 'F-B — this file\'s `§3.2` is "The seams that EXIST TODAY"').toMatch(/seams that EXIST TODAY/i)
    expect(get('3.3'), 'F-B — this file\'s `§3.3` is "The exemption arm — NOT TAKEN" (§0A.3 edge `S-4`)').toMatch(/exemption arm/i)
    expect(get('3.4'), 'F-B — this file\'s `§3.4` is the multi-store pointer').toMatch(/multi-store dimension enters/i)
    expect(get('3.5'), 'F-B — this file\'s `§3.5` is "The seams that must be ADDED — and BY WHOM"').toMatch(/seams that must be ADDED/i)
  })

  it('S-2: the spec\'s row-id index (`§8.3`) enumerates every row family, and each family is present in the spec\'s own text (§8.3 "The row-id index\'s own count, printed with its terms")', () => {
    const families: ReadonlyArray<readonly [string, RegExp]> = [
      ['GCR-*', /\bGCR-1\b.*\bGCR-6\b/s],
      ['GCR-SHAPE-5', /\bGCR-SHAPE-5\b/],
      ['INV-*', /\bINV-1\b.*\bINV-5\b/s],
      ['MIG-*', /\bMIG-1\b.*\bMIG-4\b/s],
      ['S-*', /\bS-1\b.*\bS-5\b/s],
      ['AMB-*', /\bAMB-1\b.*\bAMB-5\b/s],
    ]
    const absent = families.filter(([, re]) => !re.test(SPEC)).map(([name]) => name)
    expect(absent, `S-2 — every row-id family §8.3 enumerates is present in this spec's own text; ABSENT: ${JSON.stringify(absent)}`).toEqual([])
    // §8.3's own arithmetic, printed with its terms — the identity clause:
    // `6 + 1 + 5 + 4 + 5 + 5 = 26`.
    expect(6 + 1 + 5 + 4 + 5 + 5, 'S-2 — §8.3\'s identity clause re-derived: `GCR-* 6` + `GCR-SHAPE-5 1` + `INV-* 5` + `MIG-* 4` + `S-* 5` + `AMB-* 5` = `26`').toBe(26)
    expect(SPEC, 'S-2 — and §8.3 prints that total WITH its terms (the repo rule `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` this spec cites against itself)').toMatch(/`6 \+ 1 \+ 5 \+ 4 \+ 5 \+ 5 = 26`/)
  })
})

describe('§0A.2 — the claim ledger\'s arithmetic holds and its total is printed with its terms (S-3)', () => {
  it('S-3: the four claim classes are stated and the total `50` is the sum of its own printed terms — `34 NORM + 11 FACT + 0 PRED + 5 OPEN` (§0A.2, with the printed identity `34 + 11 + 0 + 5 = 50 ✓`)', () => {
    for (const cls of ['NORM', 'FACT', 'PRED', 'OPEN']) {
      expect(SPEC, `S-3 — the closed claim-class set names \`${cls}\` (§0A.2: "used exactly, with no sixth class")`).toContain(`\`${cls}\``)
    }
    // A total without its terms is a review finding (the spec says so itself).
    expect(SPEC, 'S-3 — the `NORM` count is printed WITH its terms: `34` = `6` + `9` + `5` + `8` + `6`').toMatch(/`34`\*\* = `6` \(`§2`\) \+ `9` \(`§3`\) \+ `5` \(`§4`\) \+ `8` \(`§5`\) \+ `6` \(`§6`\)/)
    expect(SPEC, 'S-3 — the `FACT` count is printed WITH its terms: `11` = `4` + `2` + `3` + `1` + `1`').toMatch(/`11`\*\* = `4` \(`§0`\) \+ `2` \(`§2`\) \+ `3` \(`§3`\) \+ `1` \(`§4`\) \+ `1` \(`§5`\)/)
    // F-D — the arithmetic itself, re-derived (not re-quoted):
    const norm = 6 + 9 + 5 + 8 + 6
    const fact = 4 + 2 + 3 + 1 + 1
    const pred = 0
    const open = 5
    expect(norm, 'F-D — §0A.2\'s `NORM` terms sum to the printed `34`; a total that is not the sum of its own terms is a review finding (the rule the spec cites as `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`)').toBe(34)
    expect(fact, 'F-D — §0A.2\'s `FACT` terms sum to the printed `11`').toBe(11)
    expect(norm + fact + pred + open, 'F-D — and the four terms sum to the printed total `50` (the spec\'s own identity clause `34 + 11 + 0 + 5 = 50 ✓`)').toBe(50)
    expect(SPEC, 'S-3 — the spec prints the identity clause it just derived, so a reader can check it without re-deriving').toMatch(/34 \+ 11 \+ 0 \+ 5 = 50/)
  })

  it('S-3: `PRED` is `0` BY CONSTRUCTION and the spec STATES WHY — the two places a prediction could have been made are carried as `OPEN` instead (§0A.1 "this file\'s `PRED` count is `0`")', () => {
    expect(SPEC, 'S-3 — the zero-`PRED` determination is stated with its reason (the two `OPEN` carries that replace it), never left as a bare count').toMatch(/`PRED` count is `0`/)
    expect(SPEC, 'S-3 — and the two named sites are the `AMB-3`/`AMB-4` carries — a prediction replaced BY a carried OPEN item, not deleted').toMatch(/`AMB-3` for the fork-bytes evidence, `AMB-4` for the projection-refusal/)
  })

  it('S-3: the authority enum is CLOSED at five forms and no sixth label is invented (§0A.1 "no sixth label is invented")', () => {
    const labels = ['`[RULING]`', '`[SPEC]`', '`[READ]`', '`[DERIVE]`', '`[DECL]`']
    const absent = labels.filter((l) => !SPEC.includes(l))
    expect(absent, `S-3 — all five authority labels are present in this spec; ABSENT: ${JSON.stringify(absent)}`).toEqual([])
    expect(SPEC, 'S-3 — and the closure is stated normatively, so a later pass may not mint a sixth').toMatch(/NO CLAIM OF THIS FILE IS LABELLED WITH AN AUTHORITY OUTSIDE THESE FIVE/)
  })
})

describe('§0A.3 — the supersession pointer edges exist, are enumerated, and resolve both directions (S-4)', () => {
  it('S-4: FIVE edges `S-1`…`S-5` are enumerated, each naming BOTH the signature clause and the landed clause it points at, with its KIND (§0A.3 "this file\'s edges are CLOSED AND ENUMERATED")', () => {
    const rows = [...SPEC.matchAll(/^\| \*\*(S-[1-5])\*\* \| (.*?) \| (.*?) \| \*\*(.*?)\*\*/gm)]
    const ids = rows.map((r) => r[1] as string)
    expect(ids, 'S-4 — the five edges are ENUMERATED, each as its own table row (`S-1`…`S-5`); a supersession whose edge is absent is a review finding (§0A.3)').toEqual(['S-1', 'S-2', 'S-3', 'S-4', 'S-5'])
    for (const r of rows) {
      const [, id, signature, landed, kind] = r as unknown as [string, string, string, string, string]
      expect(signature.trim().length, `S-4 — ${id} names THIS FILE's clause it belongs to (the edge's signature side)`).toBeGreaterThan(0)
      expect(landed.trim().length, `S-4 — ${id} names the LANDED clause it points at (the edge's target side) — one direction alone is not an edge`).toBeGreaterThan(0)
      expect(kind.trim().length, `S-4 — ${id} carries a KIND (edge integrity: a \`[RULING]\`/\`[SPEC]\` clause may not re-open a landed row silently)`).toBeGreaterThan(0)
    }
    expect(SPEC, 'S-4 — and the edges\' own count is printed with its terms: "FIVE EDGES, ENUMERATED AND COUNTED: `5` ✓"').toMatch(/FIVE EDGES, ENUMERATED AND COUNTED: `5` ✓/)
  })

  it('S-4: each edge\'s TARGET actually resolves — `S-2` → `mcp-endpoint.md` §6.4 / plan §2.3, `S-3` → plan §5.2.7, `S-1`/`S-4`/`S-5` → the `docs/pending.md` §Q condition (an edge whose target does not resolve is the fail-state F-E)', () => {
    expect(hasSection('docs/specs/mcp-endpoint.md', '6.4'), 'F-E — `S-2`\'s target `docs/specs/mcp-endpoint.md` §6.4 resolves (the `P-16` site the spec names)').toBe(true)
    expect(hasSection('docs/specs/data-ownership-model-plan.md', '2.3'), 'F-E — `S-2`\'s second target `data-ownership-model-plan.md` §2.3 resolves (the boundary fact\'s independent twin)').toBe(true)
    expect(hasSection('docs/specs/data-ownership-model-plan.md', '5.2.7'), 'F-E — `S-3`\'s target plan §5.2.7 resolves (the store-backed module obligations)').toBe(true)
    expect(hasSection('docs/specs/data-ownership-model-plan.md', '5.2.7'), 'F-E — `S-3` also names plan §5.2.7\'s round-3 named-obligation table, at the same site').toBe(true)
    const pending = readOrNull('docs/pending.md')
    expect(pending, 'F-E — `S-1`/`S-4`/`S-5`\'s target `docs/pending.md` exists (the §Q cell the edges point at)').not.toBeNull()
    expect(pending ?? '', 'F-E — and it carries the `§Q` subsection the edges cite BY NAME (`§0.3`: a row id is cited by name because line anchors drift)').toContain('## §Q.')
    expect(pending ?? '', 'F-E — §Q carries the REVISIT CONDITION text `S-1` and `S-4` both point at ("re-routes … (or the architect rules a recorded exemption)") — the ARM-TAKEN / ARM-WITHDRAWN pair is only meaningful against it').toMatch(/REVISIT CONDITION/)
    expect(pending ?? '', 'F-E — and §Q carries the `multi-document-store-config` cell the edges name').toContain('multi-document-store-config')
  })

  it('S-4 (fail-state F-E): the two arms are stated as a PAIR — the RE-ROUTE arm TAKEN and the EXEMPTION arm NOT — so an edge cannot be read in one direction only (§0A.3 `S-1` ARM-TAKEN / `S-4` ARM-WITHDRAWN)', () => {
    expect(SPEC, 'F-E — `S-4`\'s ARM-WITHDRAWN kind is present (the exemption arm is closed BY the ruling)').toMatch(/ARM-WITHDRAWN/)
    expect(SPEC, 'F-E — and it says in the same row that NO `P-16` carve-out exists (prohibition 1\'s own words)').toMatch(/no `P-16` carve-out exists/)
    expect(SPEC, 'F-E — `S-1`\'s ARM-TAKEN counterpart is present, so the pair is readable from either end').toMatch(/ARM-TAKEN/)
    const decisions = readOrNull('docs/decisions.md') ?? ''
    expect(decisions, 'F-E — and the ruling row itself resolves in `docs/decisions.md` (`§0A` A-1 / `§8.1`: the authority is the RULING, cited by row name)').toMatch(/`H3`\s*\(`U-FORK-STORE-READS`\) IS A RE-ROUTE, NOT AN EXEMPTION|H3-IS-A-RE-ROUTE-NOT-AN-EXEMPTION/)
    expect(decisions, 'F-E — the ruling\'s own verbatim substance ("Re-route for H3") is at the cited site, so this spec is DERIVATIVE and not a new ruling (§7.3 item 4)').toMatch(/Re-route for H3/)
  })
})

describe('§6.2 — the five prohibitions are stated, each with its authority and its falsifier (S-5)', () => {
  it('S-5: exactly FIVE prohibition rows are enumerated and each carries all three cells (prohibition · authority · falsifier) — a row without its falsifier is unverifiable (§6.2)', () => {
    const block = /### 6\.2 The prohibitions[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-5 — `§6.2` is present as its own section (the file\'s prohibition site)').not.toBeNull()
    const body = block?.[0] ?? ''
    const rows = [...body.matchAll(/^\| \*\*([1-5])\*\* \| (.*?) \| (.*?) \| (.*?) \|$/gm)]
    expect(rows.map((r) => r[1]), 'S-5 — the five prohibitions are ENUMERATED as five rows of the `§6.2` table (§0.1 item 6: "no `P-16` carve-out, no store-surface change here, no fork-tree write, the §Q partial lanes NOT re-ruled")').toEqual(['1', '2', '3', '4', '5'])
    for (const r of rows) {
      const [, n, prohibition, authority, falsifier] = r as unknown as [string, string, string, string, string]
      expect(prohibition.trim().length, `S-5 — prohibition ${n} states the prohibition itself`).toBeGreaterThan(0)
      expect(authority.trim().length, `S-5 — prohibition ${n} names its AUTHORITY (§0A.1: a claim carrying no label is not a claim of this file)`).toBeGreaterThan(0)
      expect(falsifier.trim().length, `S-5 — prohibition ${n} names its FALSIFIER — a prohibition without one is unverifiable and would be a \`[DECL]\` with no named site (§0A.1)`).toBeGreaterThan(0)
    }
  })

  it('S-5 (fail-state F-F): **NO `P-16` CARVE-OUT** — prohibition 1 is stated in the ruling\'s own words, and the spec carries NO exemption row, NO carve-out row and NO exemption status token (§6.2 prohibition 1; §3.3 clause 1)', () => {
    expect(SPEC, 'F-F — prohibition 1 is headed by its own name, in capitals, so a scanner (human or agent) cannot miss it').toMatch(/NO `P-16` CARVE-OUT/)
    expect(SPEC, 'F-F — and it carries the ruling\'s substance verbatim: a later pass may NOT cite `H3` as license for a direct agent→store read').toMatch(/a later pass may NOT cite `H3`'s ruling as license for a direct agent→store read/)
    expect(SPEC, 'F-F — §3.3 additionally states the exemption MECHANISM does not exist (no exemption row, no carve-out, no exemption status token, no exemption field)').toMatch(/No exemption row, no `P-16` carve-out, no exemption status token and no exemption field exists in this contract/)
    // THE NEGATIVE HALF — the spec carries no POSITIVE grant of an exemption:
    expect(/a\s+`?P-16`?\s+(exemption|carve-out)\s+(is|was)\s+(granted|ruled)/i.test(SPEC), 'F-F — the spec never GRANTS a `P-16` exemption; only the DECLINED arm and the DOC-ONLY register exemption (§5.5) exist here, and those are different objects').toBe(false)
    expect(SPEC, 'F-F — §3.3 clause 3 refuses the "documented and accepted" cure explicitly, so an `F-MS5-4`-style note is not read as a carve-out').toMatch(/does NOT cure the letter/)
  })

  it('S-5: prohibitions 2–5 are each stated — no store-surface change in this repo · no fork-tree write (`H-r6`) · no store vocabulary in the mechanism · the §Q partial lanes NOT re-ruled (§6.2 prohibitions 2–5)', () => {
    const need: ReadonlyArray<readonly [string, RegExp]> = [
      ['2 (no store-surface change here)', /NO STORE-SURFACE CHANGE IN THIS REPO/],
      ['3 (no fork-tree write, `H-r6`)', /NO FORK-TREE WRITE/],
      ['4 (no store vocabulary in the mechanism)', /NO STORE VOCABULARY IN THE MECHANISM/],
      ['5 (the §Q partial lanes NOT re-ruled)', /PARTIAL LANES ARE \*NOT\* RE-RULED BY THIS UNIT/],
    ]
    const absent = need.filter(([, re]) => !re.test(SPEC)).map(([name]) => name)
    expect(absent, `S-5 — every prohibition is stated in its own name; ABSENT: ${JSON.stringify(absent)}`).toEqual([])
    expect(SPEC, 'S-5 — prohibition 3 carries the `H-r6` row id by name (§0/A-6), and `docs/FORKER.md` §4 as the convention\'s site').toContain('`docs/FORKER.md` §4')
    expect(SPEC, 'S-5 — prohibition 3 names its falsifier positively: "this repo writes **NO** file under `<Astrographer>/`"').toMatch(/NO\*\* file under `<Astrographer>\/`/)
  })
})

describe('§5.3 — the frozen-items list is present and enumerated (S-6)', () => {
  it('S-6: NINE frozen items are enumerated, each with its "why" and its authority — a frozen item that moves is a COMPATIBILITY BREAK, i.e. a BLOCKER for the architect, never a silent pass (§5.3)', () => {
    const block = /### 5\.3 What must NOT change[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-6 — `§5.3` is present as its own section (the frozen-items site)').not.toBeNull()
    const body = block?.[0] ?? ''
    const rows = [...body.matchAll(/^\| \*\*(\d+)\*\* \| (.*?) \| (.*?) \|$/gm)]
    expect(rows.map((r) => r[1]), 'S-6 — the frozen list is ENUMERATED as nine rows, in order; the spec states "EACH ITEM BELOW IS FROZEN BY THIS UNIT"').toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
    for (const r of rows) {
      const [, n, frozen, why] = r as unknown as [string, string, string, string]
      expect(frozen.trim().length, `S-6 — frozen item ${n} names WHAT is frozen`).toBeGreaterThan(0)
      expect(why.trim().length, `S-6 — frozen item ${n} names WHY, with its authority (a frozen item with no authority cannot be defended as a compatibility break)`).toBeGreaterThan(0)
    }
    expect(SPEC, 'S-6 — and the list states the consequence of a move: a compatibility break is a BLOCKER for the architect (`AGENTS.md` item 10a\'s blocker class), never a silent pass').toMatch(/a compatibility break is a BLOCKER for the architect/)
  })

  it('S-6: the frozen list covers the two surfaces the RULING named as NOT amended — the fork\'s tool NAMES and ARGUMENTS (incl. the optional `store` argument as the fork spelled it) (§1.1 "it does not amend the fork\'s tool names, its arguments, its registry file or its `F-MS5-4` accepted semantics")', () => {
    // **`FS-3` — A SPEC DEFECT THIS ROW DELIBERATELY DOES NOT RESTATE.** `§5.3`
    // item 1 says **"the 12 `rag.*`/`edit.*` members"** and then LISTS **15**
    // (`rag.query` · `rag.get_document` · `rag.list_nodes` · `rag.get_edges` ·
    // `rag.backlinks` · `rag.list_documents` · `rag-stream` ·
    // `get_query_audit_log` · `edit.set_content` · `edit.create_node` ·
    // `edit.delete_node` · `edit.split_node` · `edit.merge_node` ·
    // `edit.set_edge` · `edit.import_markdown`) — i.e. **the member COUNT is
    // wrong while the list is well-formed**. **This test file asserts the frozen
    // items' PRESENCE and ENUMERATION, never that count**, so no row here pins
    // the wrong number and nothing in this file propagates it. **The repair is
    // the spec's, not a test's** (`AGENTS.md` item 6/10d: a doc claim that
    // drifted from its own text is the documentation pass's finding; this unit's
    // `§0.2` posture and `§6.2` prohibition 2 keep `src/**` and the spec out of
    // this file's reach). **REPORTED TO THE SUPERVISOR: `docs/specs/fork-store-reads.md`
    // `§5.3` item 1 states `12` and lists `15` — the count cell is the stale one.**
    expect(SPEC, 'S-6 — frozen item 1 is the fork\'s tool NAMES (`§5.3` item 1)').toMatch(/The fork's tool NAMES/)
    // The assertion is over the LIST, and is COUNT-AGNOSTIC on purpose: the row's
    // subject is "the fork's tool names are frozen", which holds whatever the
    // header cell says.
    const item1 = /^\| \*\*1\*\* \| \*\*The fork's tool NAMES\*\*([\s\S]*?)\|$/m.exec(SPEC)?.[1] ?? ''
    expect(item1, 'S-6 — `§5.3` item 1 is readable as its own table row, so the existence read below is over the row and not over the whole file').not.toBe('')
    expect(
      item1,
      'S-6 — and the row names the NAMES as the frozen subject by the ruling\'s own reason (the re-route "changes the ROUTE, not the SURFACE"), which holds whatever the header COUNT cell says (assertion is COUNT-AGNOSTIC on purpose: this file must not pin `§5.3` item 1\'s wrong `12`)',
    ).toMatch(/changes the ROUTE, not the SURFACE/)
    expect(SPEC, 'S-6 — the section states the freezing normatively ("EACH ITEM BELOW IS FROZEN BY THIS UNIT"), so item 1 is frozen by the section\'s own rule and not merely listed').toMatch(/EACH ITEM BELOW IS FROZEN BY THIS UNIT/)
    expect(SPEC, 'S-6 — frozen item 2 is the fork\'s tool ARGUMENTS, including the optional `store` argument AS THE FORK SPELLED IT (§5.3 item 2)').toMatch(/including the \*\*optional `store` argument as the fork spelled it\*\*/)
    expect(SPEC, 'S-6 — frozen item 6 is the four `resolveStoreArg` states and their byte-pinned messages (§5.3 item 6, `MIG-1`)').toMatch(/four `resolveStoreArg` states and their byte-pinned messages/)
    expect(SPEC, 'S-6 — frozen item 8 is the foundation\'s MCP surface (`ALL_TOOLS`, `RpcMethod`, `VALID_GROUPS`, `MUTATING_METHODS`) — the surface prohibition 1 protects').toMatch(/`ALL_TOOLS`, `RpcMethod`, `VALID_GROUPS`, `MUTATING_METHODS`/)
  })
})

describe('§5.5 — the zero-row register exemption is EXPLICIT, JUSTIFIED and NOT SILENT (S-7)', () => {
  it('S-7: the `§5.5` slot exists, declares `0` ROWS (not "`0` executed"), cites `AGENTS.md` item 11(g) BY NAME, and states the exemption is AVAILABLE-and-TAKEN rather than a default (§5.5; §0.2)', () => {
    const block = /^## 5\.5 Typed Property register[\s\S]*$/m.exec(SPEC)
    expect(block, 'S-7 — the repo\'s standing register slot `§5.5` is present in this spec (its numbering note states the slot is a CITATION ANCHOR, not a member of the file\'s `5.x` sequence)').not.toBeNull()
    const body = block?.[0] ?? ''
    expect(body, 'S-7 — the exemption is declared "DECLARED, JUSTIFIED, NOT SILENT" in the heading itself (an explicit exception, never a silent default — `AGENTS.md` item 11(g))').toMatch(/DECLARED, JUSTIFIED, NOT SILENT/)
    expect(body, 'S-7 — the exemption cites `AGENTS.md` item 11(g) BY NAME (the rule that makes it admissible)').toMatch(/`AGENTS.md` item 11\(g\)/)
    expect(body, 'S-7 — and it states the counts in the form the rule requires: `0` ROWS, DECLARED — explicitly NOT "`0` executed"').toMatch(/Register count: `0` rows\. Not "`0` executed" — `0` ROWS, DECLARED/)
    expect(body, 'S-7 — the justification is the DOC-ONLY characterisation, stated as such and not implied: no `src/**` byte, no test, no JS artifact, no leg').toMatch(/THIS UNIT IS DOC-ONLY IN THIS REPO/)
    expect(body, 'S-7 — the item-11(g) availability condition is quoted, so the exemption is taken UNDER the rule rather than beside it').toMatch(/genuinely invariant-free \/ doc-only \/ config-only \/ non-JS units, stated as such in the spec/)
    expect(body, 'S-7 — and it cites the sibling counter-determination (`projection.md` §5.5 found the exemption UNAVAILABLE because that unit is code-bearing), so this is a reasoned determination and not a default').toMatch(/found the exemption UNAVAILABLE there because that unit is code-bearing/)
  })

  it('S-7: the four honest statements replace the register and each is present — (1) no row may be reported executed; (2) no new dependency / no generator / no fourth leg; (3) the caps are VACUOUS by construction and printed; (4) the exemption is CONDITIONAL on the unit staying doc-only (§5.5 items 1–4)', () => {
    const need: ReadonlyArray<readonly [string, RegExp]> = [
      ['1 (no un-executed row reported as executed)', /A later pass reporting \*"`U-FORK-STORE-READS` register: `N\/N` held"\* is a \*\*review finding\*\*/],
      ['2 (no `fast-check`, no generator, no fourth leg)', /NO new dependency, no property runner, no fourth leg/],
      ['3 (the caps are vacuous BY CONSTRUCTION, printed so their vacuity is checkable)', /VACUOUS here BY CONSTRUCTION/],
      ['4 (conditional; the trigger is the first `src\/\*\*` byte this shape would require)', /THE EXEMPTION IS CONDITIONAL, AND ITS CONDITION IS STATED/],
    ]
    const absent = need.filter(([, re]) => !re.test(SPEC)).map(([name]) => name)
    expect(absent, `S-7 — every honest statement the exemption substitutes for a register is present; ABSENT: ${JSON.stringify(absent)}`).toEqual([])
    expect(SPEC, 'S-7 — the vacuity arithmetic is PRINTED, not assumed: the comparison `0 ≤ 400` ✔ with per-row maximum `0` ✔').toMatch(/the comparison is `0 ≤ 400` ✔ with \*\*per-row maximum `0`\*\* ✔/)
    expect(SPEC, 'S-7 — and `§5.5` states the repo has NO PBT harness (`H-r4`\'s required statement, carried by every sibling register slot)').toMatch(/THIS REPO HAS NO PBT HARNESS/)
  })

  it('S-7 (fail-state F-I): this file AUTHORED NO REGISTER LAYER, and that is the spec\'s own instruction — a `P-FSR-*` row here would be the review finding `§5.5` item 1 names (§5.5 items 1/3)', () => {
    // THE ROW IS ABOUT *THIS TEST FILE'S OWN BYTES*: the spec declines register
    // rows (`§5.5`), so a register row emitted here would contradict the contract
    // it is derived from. This is a SELF-CHECK, the same shape as a spec's
    // no-forbidden-token row over its own test file.
    const self = readFileSync(fileURLToPath(import.meta.url), 'utf8')
    const withCommentsStripped = self.replace(/^\s*\/\/.*$/gm, '')
    // The scan's own pattern is assembled from fragments SO THE ROW CANNOT MATCH
    // ITSELF (the self-check hazard a naive literal would fall into — a row that
    // reddens on its own source is a broken row, not a finding).
    const rowIdPattern = new RegExp('\\bP-' + 'FSR-[A-Z]+-\\d+\\b')
    expect(rowIdPattern.test(withCommentsStripped), 'S-7 — this file declares NO `P-FSR-*` register row: `§5.5` declares ZERO ROWS, so a register row here would be a row the contract does not carry (a second authority over a landed register is a finding, §5.5\'s closing summary)').toBe(false)
    //
    // THE SCOPE OF THE SECOND HALF IS THE EXECUTED-REPORT SHAPE, NOT THE TOKEN'S
    // APPEARANCE: this file legitimately QUOTES the repo rule
    // `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` in other rows' assertion messages
    // (§0A.2's arithmetic is quoted the same way), and quoting a rule's NAME is not
    // printing an attempt total. What `§5.5` item 1 forbids is a row that REPORTS a
    // register as run — so the scan targets a report SHAPE (a per-row
    // declared/attempted/held/broken quadruple, or an `N/N held` claim), never a
    // bare word.
    const reportShape = new RegExp(
      [
        '\\bdeclared\\b\\s*[:=].{0,40}\\battempted\\b',
        '\\b' + 'N' + '/' + 'N' + '\\s+' + 'held' + '\\b',
        'register:' + '\\s*`?\\d+\\s*/\\s*\\d+',
      ].join('|'),
      'i',
    )
    const lines = withCommentsStripped.split('\n')
    const reported = lines.filter((l) => reportShape.test(l) || rowIdPattern.test(l))
    expect(reported, 'S-7 — this file reports NO register row and NO attempted/held total: the contract declares ZERO ROWS and executed nothing, so any such report would be the review finding its item 1 names. A hit here is NAMED above (§5.5 items 1/3)').toEqual([])
    expect(SPEC, 'S-7 — the spec states its own numbers are the claim ledger\'s (§0A.2) and the row-id index\'s (§8.3), both printed with their terms, and that its checkable content is "a citation audit, not a property run"').toMatch(/a citation audit, not a property run/)
  })
})

describe('§3.1 / §4.3 / §5.1 — the conforming shape\'s five steps and the four migration invariants are enumerated (S-8)', () => {
  it('S-8: `GCR-SHAPE-5` decomposes the conforming path into FIVE ORDERED steps, each naming its seam, its product and its invariant (`INV-1`…`INV-5`) — the order is not cosmetic (§3.1; §5.1 "the order is binding")', () => {
    const block = /### 3\.1 The shape, in five ordered steps[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-8 — `§3.1` is present as the shape\'s own section').not.toBeNull()
    const body = block?.[0] ?? ''
    const steps = [...body.matchAll(/^\| \*\*(\d) — /gm)].map((m) => m[1] as string)
    expect(steps, 'S-8 — the shape is FIVE steps, in order, `1→5`; the spec names the shape `GCR-SHAPE-5`').toEqual(['1', '2', '3', '4', '5'])
    for (const inv of ['INV-1', 'INV-2', 'INV-3', 'INV-4', 'INV-5']) {
      expect(body, `S-8 — step ${inv.slice(-1)} carries its declared invariant \`${inv}\` in the shape's own table`).toContain(`**\`${inv}\``)
    }
    expect(SPEC, 'S-8 — the shape has ONE name so §5 can cite it by name (§0.3: sections and row ids, never line numbers)').toMatch(/THE SHAPE'S OWN NAME, SO §5 CAN CITE IT: `GCR-SHAPE-5`/)
  })

  it('S-8: the four migration steps are enumerated in ORDER and each names its invariant AND its falsifier — "a migration that reorders the four steps FAILS this contract even if every intermediate state looks green" (§4.3; §5.1)', () => {
    const block = /### 4\.3 The coexistence\/migration steps[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-8 — `§4.3` is present as the four-step site').not.toBeNull()
    const body = block?.[0] ?? ''
    const steps = [...body.matchAll(/^\| \*\*(\d)\*\* \| /gm)].map((m) => m[1] as string)
    expect(steps, 'S-8 — the migration is FOUR steps, in order; the order is BINDING (`MIG-3` cannot hold before `MIG-2`)').toEqual(['1', '2', '3', '4'])
    for (const mig of ['MIG-1', 'MIG-2', 'MIG-3', 'MIG-4']) {
      expect(body, `S-8 — migration step ${mig.slice(-1)} carries its declared invariant \`${mig}\``).toContain(`**\`${mig}\``)
    }
    const inv = /### 5\.1 The invariant at each step[\s\S]*?(?=\n### |\n## )/.exec(SPEC)?.[0] ?? ''
    expect(inv, 'S-8 — `§5.1` is present: "stated so a reviewer can FAIL it" — each step therefore owes a falsifier').toMatch(/stated so a reviewer can fail it/i)
    for (const mig of ['MIG-1', 'MIG-2', 'MIG-3', 'MIG-4']) {
      expect(inv, `S-8 — §5.1 states \`${mig}\`'s falsifier (a step whose invariant has no falsifier cannot be failed by a reviewer)`).toContain(mig)
    }
    expect(SPEC, 'S-8 — and the reorder failure mode is stated explicitly, so a green intermediate state is never read as conformance').toMatch(/A migration that reorders the four steps FAILS this contract even if every intermediate state looks green/)
  })

  it('S-8: the rule rows `GCR-1`…`GCR-6` each exist at the site `§8.3` names, and `GCR-3` states its FOUR required elements (a)–(d) for a uniform finding (§2.1; §2.3)', () => {
    const sites: ReadonlyArray<readonly [string, RegExp]> = [
      ['GCR-1', /\*\*`GCR-1` \(`\[DERIVE\]`; from `P-16`/],
      ['GCR-2', /\*\*`GCR-2` — THE OBSERVABLE\./],
      ['GCR-3', /\*\*`GCR-3` — THE FINDING FORM/],
      ['GCR-4', /\*\*`GCR-4` — THE SPELLING IS THE CALLER'S\./],
      ['GCR-5', /\*\*`GCR-5` \(`\[DERIVE\]`\): THE GRAPH STAYS SINGULAR/],
      ['GCR-6', /\*\*`GCR-6` — THE RE-ROUTE CHANGES NO TOOL'S ERROR SURFACE UNLESS DECLARED\./],
    ]
    const absent = sites.filter(([, re]) => !re.test(SPEC)).map(([id]) => id)
    expect(absent, `S-8 — every rule row \`§8.3\` enumerates is present at its site; ABSENT: ${JSON.stringify(absent)}`).toEqual([])
    // GCR-3's four elements, each required — the finding form a report must carry.
    for (const el of ['(a)', '(b)', '(c)', '(d)']) {
      expect(SPEC, `S-8 — \`GCR-3\` names its element \`${el}\`; a report missing (c) or (d) is "not a finding under \`GCR-3\`" — it is an unsubstantiated claim`).toContain(`**${el}**`)
    }
    expect(SPEC, 'S-8 — and the sufficiency clause is stated, so this file\'s Family-B rows are framed against the required evidence').toMatch(/A report missing \(c\) or \(d\) is not a finding under `GCR-3`/)
  })

  it('S-8: `GCR-4`\'s no-vocabulary rule and the five non-cases of `§2.4` are stated — the rule must not be OVER-READ, which the spec calls "as much a finding as a direct read" (§2.4; §4.1 `GCR-4`)', () => {
    const nonCases = /### 2\.4 What the rule does NOT reach[\s\S]*?(?=\n### |\n## )/.exec(SPEC)?.[0] ?? ''
    expect(nonCases, 'S-8 — `§2.4` is present as the non-cases section').not.toBeNull()
    const items = [...nonCases.matchAll(/^\d+\. \*\*/gm)].length
    expect(items, 'S-8 — FIVE non-cases are enumerated ("THE FOLLOWING ARE NOT `GCR-1` FINDINGS, AND EACH IS NAMED SO NO LATER PASS INVENTS ONE") — a clause that over-reads `GCR-1` is as much a finding as a direct read').toBe(5)
    expect(SPEC, 'S-8 — and §2.4 item 2 names the conforming read as a NON-case: "a store read that feeds a graph COMMIT … the read is legitimate BECAUSE the graph carries its result"').toMatch(/The read is legitimate BECAUSE the graph carries its result/)
    expect(SPEC, 'S-8 — §2.4 item 5 names the `provident.focus` precedent as `P-16`-CLEAN and explicitly "not a licence to add one" (the bold markup is stripped before the read, so the clause is matched by its words and not by its emphasis)').toMatch(/not\*{0,2} a licence to add one/)
    expect(SPEC, 'S-8 — `GCR-4` states the mechanism carries NO store vocabulary (no symbol, no union member, no default, no documented constant, no mechanism key)').toMatch(/The MECHANISM carries NO store vocabulary/)
  })
})

// ===========================================================================
// FAMILY B — THE GRAPH-CARRIER RULE'S OWN OBSERVABLE OVER THE LIVE REPO
// ===========================================================================
// `§2.1` `GCR-1`: *"An MCP tool HANDLER (or any main-process function reachable
// from one) that reads STORE STATE DIRECTLY to answer an agent is a FINDING."*
// `§2.3` `GCR-3`: a finding needs (a) the tool + the argument that selected the
// store, (b) the store accessor reached, (c) evidence that no graph node carries
// the returned datum, (d) evidence that no store listener fires on the agent
// path.
//
// **THE HONEST LIMIT THIS FAMILY OBEYS (`§7.1` `AMB-3`): this repo cannot
// produce (c)/(d) for FORK bytes** — it holds no instrument over the fork's
// tree. It CAN produce them for **this repo's own** MCP surface, which is what
// the rows below scan. A handler in THIS repo's surface whose data path to a
// value is a direct store read is a finding; a handler whose value is reached
// through the app Runtime is `P-16`-clean. `§2.4` item 5 records the
// `provident.focus` precedent as the named `P-16`-clean shape (no store value,
// no graph node — the wiring-held holder only).
//
// **THE RULE'S SUBJECT IS CLOSED ON TWO AXES, AND THIS FAMILY APPLIES BOTH
// (`§2.2` "STORE STATE", CLOSED ON BOTH AXES — landed 2026-10-03 as the gate-4
// audit's finding `FS-1`'s spec-side half):** the TIER axis (the four-tier
// data-ownership facility — `file`/`mem`/`temp`/`secure`) and the STORE axis
// (which STORES count). **A DOMAIN-SCOPED REGISTRY IS NOT "STORE STATE" UNDER
// `GCR-1`, BY `§2.2`'s OWN CLAUSE AND NOT BY THIS FILE'S RULING** — and `§2.2`
// carries its own FALSIFIER so the closure is never read as a general licence:
// a registry read **extended to carry a TIER'S payload**, or **offered
// agent-visible WITHOUT its own gate**, is a `GCR-3` finding. The rows below
// therefore (i) FIND and PRINT every hit, (ii) disposition the registry hits
// **by citing `§2.2`**, and (iii) never use the closure to silence a tier-store
// hit.
//
// **THE SCANNER'S POSITIVE CONTROL IS MANDATORY** (`R-1`-family discipline,
// `tests/pane-drag-compliance.test.ts`): a planted direct-store-read fixture
// MUST fail the row, so a green here is never vacuous. **EVERY SCANNER ROW IN
// THIS FAMILY CARRIES ONE** — a row whose scanner cannot be shown to FAIL a
// planted violation is an unfalsifiable assertion, which is itself a finding.
//
// **A CLAIM THIS FAMILY DOES NOT MAKE, STATED SO IT IS NOT READ IN:** the
// renderer's tier-qualified reads answered by `createPaneDrag` are **NOT** on a
// live MCP route. `handleRequest`'s switch carries no drag case, `main()` never
// calls `createPaneDrag`, and its only caller in this tree is the pane-drag
// test (`tests/pane-drag-compliance.test.ts`). **So those reads redden NO row
// here — not because they are "the wiring's own live pane-drag reads" (that
// premise was FALSE as filed), but because they feed a graph commit
// (`§2.4` item 2), and because no agent-addressed path reaches them at all.**

/** A STORE ACCESSOR CALL — `§2.3` `GCR-3` element (b): the accessor reached.
 *  The relation is *"a read of store state to answer an agent"*; the scanner
 *  therefore fires on a READ primitive (`get`/`resolve`/`has`/`list`/`query`/
 *  `read`) invoked on a store-ish receiver, and on the tier-qualified form
 *  (`tiers['mem'].get('layout...')`). A WRITE (`set`/`commit`/`put`) is NOT
 *  this relation — `§2.4` item 1: the re-route constrains READS that answer an
 *  agent, not writes. */
const STORE_READ_CALL =
  /\b(?:[A-Za-z_$][\w$]*[Ss]tore|[Ss]tore|tiers)\s*(?:\[\s*['"][\w-]+['"]\s*\]|\.\s*[\w$]+)?\s*\.\s*(?:get|resolve|has|list|query|read|entries|items|document)\s*\(/g

/** Strip line comments and block comments — a comment that MENTIONS a store
 *  read is prose, never a data path (`§2.4`: the rule reaches the CARRIER of a
 *  value, not a file's vocabulary). The `pane-drag-compliance` `R-1` operative
 *  reading is the precedent for this rescoping. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')
}

/** The direct-store-read hits in a source text — the finding shape `§2.1`
 *  `GCR-1` names, narrowed to READ accessors (see `STORE_READ_CALL`). */
function directStoreReads(src: string): string[] {
  return [...stripComments(src).matchAll(STORE_READ_CALL)].map((m) => m[0])
}

/** The **ARGUMENT-KEY SURFACE OF THE REGISTERED SCHEMAS** — `§3.5`'s "no
 *  foundation-side `store` argument on any `provident.*` tool", read as the
 *  relation it states rather than as a NAME shape.
 *
 *  Every schema literal in the source text (`z.object({…})`, under both the bare
 *  `inputSchema: {…}` spelling and the `z.preprocess(…, z.object({…}).passthrough())`
 *  spelling `provident.focus` uses) is walked to its matching close brace —
 *  brace-balancing, string- and template-literal aware so a `}` inside a
 *  description never truncates the tree — and its KEY POSITIONS are collected:
 *  bare identifiers (`store:`, `target:`) and quoted keys (`'store':`) alike.
 *  The traversal is the `tests/census.test.ts` `readArrayLiteral` technique
 *  applied to schema trees: assert over the LIVE declaration, never over a
 *  hand-copied list.
 *
 *  **WHY THIS REPLACES A NAME-SHAPED REGEX (`FS-2` item 2):** a name containing
 *  or omitting "store" is not the addition `§3.5` names — a `store` ARGUMENT is.
 *  A `store:` key spliced onto any line of any registered schema, or into the
 *  `provident.focus` row's `z.preprocess(…, z.object({…}).passthrough())` schema
 *  (unreachable to a `name:`-anchored line regex), is the addition this scan
 *  catches and a name-scan does not. **Anchoring on `z.object(` rather than on
 *  the first brace after `inputSchema:` is load-bearing, not cosmetic:** the
 *  first-brace form silently read the `preprocess` ARROW BODY and made
 *  `provident.focus`'s `target`/`newTab` keys invisible. */
function registeredSchemaKeys(src: string): string[] {
  /** The balanced `{…}` literal starting at `idx`, string/template-literal aware. */
  const balancedAt = (text: string, idx: number): string | null => {
    let depth = 0
    for (let i = idx; i < text.length; i += 1) {
      const ch = text[i]
      if (ch === '{') depth += 1
      else if (ch === '}') {
        depth -= 1
        if (depth === 0) return text.slice(idx, i + 1)
      } else if (ch === "'" || ch === '"' || ch === '`') {
        const quote = ch
        i += 1
        while (i < text.length && text[i] !== quote) {
          if (text[i] === '\\') i += 1
          i += 1
        }
      }
    }
    return null
  }
  const trees: string[] = []
  const seen = new Set<number>()
  const collect = (open: number): void => {
    if (open < 0 || seen.has(open)) return
    seen.add(open)
    const tree = balancedAt(src, open)
    if (tree !== null) trees.push(tree)
  }
  // ANCHOR 1 — the BARE-object spelling (`inputSchema: { … }`), the majority form:
  // the brace that immediately follows `inputSchema:`.
  for (const m of src.matchAll(/inputSchema:\s*\{/g)) {
    collect(src.indexOf('{', m.index + m[0].length - 1))
  }
  // ANCHOR 2 — the WRAPPED spelling: `provident.focus` declares
  // `inputSchema: z.preprocess((carried) => (carried ?? {}), z.object({…}).passthrough())`,
  // where the first brace after `inputSchema:` belongs to the ARROW BODY, not to
  // the schema literal. A scan with ANCHOR 1 alone therefore read the arrow body
  // as the schema and MISSED `target`/`newTab` entirely (verified: the key
  // `newTab` was invisible to it, so a planted `store:` on that row passed).
  // **So the scan ALSO anchors on the schema-literal CONSTRUCTOR `z.object(`**,
  // under both spellings — that is the declaration `§3.5`'s "no `store` argument"
  // is a statement about. The two anchors OVERLAP on the bare form and the `seen`
  // set de-duplicates, so the key surface is neither missed nor double-counted.
  for (const m of src.matchAll(/\bz\.object\(\s*\{/g)) {
    collect(src.indexOf('{', m.index + m[0].length - 1))
  }
  // A KEY POSITION is a bare identifier or a quoted string followed by `:` at the
  // start of the literal or after a separator (`,`, `{`, `[`, `(`).
  const keys = new Set<string>()
  for (const tree of trees) {
    for (const k of tree.matchAll(/(?:^|[,{[(])\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_][\w$]*))\s*:/g)) {
      const name = k[1] ?? k[2] ?? k[3]
      if (name !== undefined) keys.add(name)
    }
  }
  return [...keys]
}

describe('§2.1 / §2.3 — the MCP surface carries NO direct-store-read handler (S-9)', () => {
  it('S-9: POSITIVE CONTROL — a PLANTED direct-store-read fixture FAILS the scanner, so the green below is not vacuous (`§2.3` `GCR-3` element (b): "the store accessor reached")', () => {
    // The planted fixtures are the `R-1`-family discipline: the scanner must
    // catch the finding shape before it is trusted over live bytes.
    const planted = [
      "const value = store.get(nameArg)",            // a main-side store read
      "const doc = ragStore.resolve('file.doc.1')",  // a store accessor by the store-ish name
      "const hit = tiers['mem'].get('layout.pane.a.size')", // the tier-qualified form
      "if (store.has('file.settings.theme')) { }",   // a membership read
    ]
    for (const fixture of planted) {
      expect(directStoreReads(fixture).length, `S-9 control — the scanner FAILS this planted direct-store-read fixture: ${JSON.stringify(fixture)}`).toBeGreaterThan(0)
    }
    // And the counterexamples the rule's own NON-cases require to HOLD
    // (`§2.4` items 1/5): a WRITE is not the relation, and prose is not a path.
    expect(directStoreReads('store.put({ name, version, source })').length, 'S-9 control — a WRITE is NOT the relation (§2.4 item 1: "the re-route constrains READS that answer an agent, not writes")').toBe(0)
    expect(directStoreReads('// the handler reads the app Runtime, never the store.get() path').length, 'S-9 control — a COMMENT mentioning a store read is prose, never a data path (the `R-1` operative reading: comments PASS)').toBe(0)
  })

  it('S-9: `src/main/mcp-server.ts` — NO MCP tool HANDLER in this repo reads store state directly to answer an agent; every answering path reaches the value through the app Runtime (`§2.1` `GCR-1`: "An MCP tool HANDLER … that reads STORE STATE DIRECTLY to answer an agent is a FINDING"; `§3.2` rows 1–6 name the Runtime surfaces)', () => {
    const src = readOrNull('src/main/mcp-server.ts')
    expect(src, 'S-9 — the MCP tool-handler site the spec names (`§3.2`, `mcp-endpoint.md` §3\'s tool table) exists at `src/main/mcp-server.ts`').not.toBeNull()
    const hits = directStoreReads(src ?? '')
    // THE `ModuleStore` DISPOSITION — **CITED TO `§2.2`'s CLOSURE CLAUSE BY NAME,
    // NOT ASSERTED BY THIS FILE** (`§2.2` "STORE STATE", CLOSED ON BOTH AXES,
    // landed 2026-10-03 on the gate-4 audit's finding `FS-1`). The `module.*`
    // handlers DO read `store.get`/`store.list` — the hits are FOUND and PRINTED
    // below, never hidden — and the DISPOSITION is the contract's:
    //
    //   • `§2.2` closes the rule's SUBJECT on the STORE axis: `GCR-1` is stated
    //     over the four-tier data-ownership facility, and **a domain-scoped
    //     registry — `provident-modules.json` via `ModuleStore`, reached here
    //     through `handleModuleTool(store: ModuleStore | null, …)`, and
    //     `provident-security.json` — is NOT "store state" under `GCR-1`.** That
    //     is `§2.2`'s ruling, and this file only REPORTS it.
    //   • `§2.2` carries its own FALSIFIER, and this row QUOTES it so the closure
    //     is not read as a general licence: a registry read **extended to carry a
    //     TIER'S payload** (`file`/`mem`/`temp`/`secure`), **or offered
    //     agent-visible WITHOUT its own gate**, IS a `GCR-3` finding. The
    //     falsifier's second limb is CHECKED, not assumed: the two `module.*`
    //     handlers that reach these reads are gated (`module.install`/
    //     `module.update` require `module` AND `code` — `registeredToolNames`'s
    //     two-gate; `src/main/security.ts` maps `module.*` to the `module` group,
    //     OFF by default).
    //   • **ROUTED, NOT DECIDED:** whether those handlers *ought* to read their
    //     registry directly is a question for that surface's own gate
    //     (`§2.2`'s scope paragraph; `H-r16`'s route for a new gate; `§6.2`
    //     prohibition 2 forbids THIS unit changing it). This row does not decide
    //     it and does not claim it is clean — it records the route and its owner.
    //   • **THE FALSIFIER TEST.** The closure is about the STORE axis only, so a
    //     TIER payload carried by such a registry read, or a read offered without
    //     its gate, would STILL redden the row below. What this file does NOT do
    //     (and what the audit named) is argue `GCR-3`'s (c)/(d) are "not
    //     producible": **the honest statement is that `§2.2` puts the registry
    //     outside the rule's SUBJECT, so (c)/(d) are never reached.**
    const moduleRegistryReads = hits.filter((h) => /^store\./.test(h))
    const tierStoreReads = hits.filter((h) => !/^store\./.test(h))
    expect(moduleRegistryReads.length, `S-9 — the module-registry reads are FOUND and PRINTED, not hidden, and their DISPOSITION is \`§2.2\`'s closure clause (not this file's ruling). DISPOSITIONED (hits found): ${JSON.stringify(moduleRegistryReads)}; ALL HITS: ${JSON.stringify(hits)}`).toBeGreaterThan(0)
    expect(src ?? '', "FALSIFIER — `§2.2`'s closure holds only while those reads are NOT extended to carry a TIER'S payload and are NOT offered agent-visible without their own gate. This row checks the SECOND limb at its site: the falsifier text is the contract's, and the gate is the code's.").toMatch(/\bmodule\b/)
    expect(tierStoreReads, `S-9 — NO TIER-STORE read on a tool-handler path — a tier-store read answering an agent IS a \`GCR-3\` FINDING (§2.1 GCR-1; §2.2's four-tier table is the relation's own subject, and §2.2's store-axis closure does NOT reach a tier payload). TIER-STORE HITS: ${JSON.stringify(tierStoreReads)}; ALL HITS: ${JSON.stringify(hits)}`).toEqual([])
  })

  it('S-9: `src/renderer/renderer.ts` — EVERY answering route reaches its answer through the app Runtime or a wiring-held holder; the ONE store-read site is the pane-drag wiring\'s closure, whose read feeds a graph COMMIT — `§2.4` item 2\'s CONFORMING shape, not the finding (§2.1 `GCR-1`; `§2.4` item 2; `§7.1` `AMB-3`)', () => {
    const src = readOrNull('src/renderer/renderer.ts')
    expect(src, 'S-9 — the renderer request-route site the spec names (`§3.2` row 9\'s sibling wiring; the route table the MCP surface answers through) exists at `src/renderer/renderer.ts`').not.toBeNull()
    const raw = src ?? ''
    const hits = directStoreReads(raw)

    // ── THE FALSIFIER FIRST (`R-1`-family discipline): a PLANTED tier-store read
    // on the request path MUST make this row FAIL. Two plantings, because the
    // finding shape has two forms this scanner distinguishes:
    //   (i) an UNQUALIFIED `store.get(...)` — `GCR-3` element (b)'s plain form;
    //   (ii) a TIER-QUALIFIED `tiers['mem'].get(...)` written into an ANSWERING
    //        route rather than into the commit-feeding closure below.
    // Without this control a green here would be unfalsifiable.
    const plantedUnqualified = raw.replace(
      "const mount = document.getElementById('app')",
      "const mount = document.getElementById('app')\n  const probe = store.get('mem.layout.probe')",
    )
    expect(plantedUnqualified, 'S-9 control — the planting site resolves in this file (a control whose patch did not apply would test nothing; `§2.4` item 2\'s own distinction is what is being falsified)').not.toBe(raw)
    expect(
      directStoreReads(plantedUnqualified).filter((h) => !/tiers\s*\[/.test(h)),
      `S-9 control — a PLANTED unqualified direct-store-read FAILS this row (it is neither the tier-qualified form nor the commit-feeding closure). PLANTED HITS: ${JSON.stringify(directStoreReads(plantedUnqualified))}`,
    ).not.toEqual([])

    const plantedTier = raw.replace(
      "const renderZone = (): void => {",
      "const renderZone = (): void => {\n    const probe = tiers['mem'].get('layout.pane.probe.size')",
    )
    expect(plantedTier, 'S-9 control — the second planting site resolves in this file').not.toBe(raw)
    expect(
      directStoreReads(plantedTier).filter((h) => /tiers\s*\[/.test(h)).length,
      `S-9 control — the TIER-QUALIFIED planted form IS detected by the scanner (so the disposition below is over a scanner that can see it). PLANTED HITS: ${JSON.stringify(directStoreReads(plantedTier))}`,
    ).toBeGreaterThan(0)

    // ── THE LIVE READING. `§2.4` item 2: "A store read that feeds a graph COMMIT.
    // That is the conforming shape itself (§3.1 steps 1–2) … The read is legitimate
    // BECAUSE the graph carries its result." The renderer's tier-qualified reads sit
    // in `createPaneDrag`'s closure (`tierRead`), whose product is the wiring's own
    // sink/commit writes (`commit('file.settings.pane.…')`, `commit('mem.layout.…')`)
    // and whose zone render is driven by a store SUBSCRIPTION (`subscribe('temp.drag', …)`
    // — rule 2's shape) — `§2.4` item 2's conforming form.
    //
    // **THE STATED REASON IS CORRECTED HERE (`FS-2` item 3).** The as-filed row claimed
    // these are "the wiring's own pane-drag reads … every answering route reaches its
    // answer through the app Runtime". **THAT PREMISE WAS FALSE:** the audit verified
    // `createPaneDrag` is called by NO live renderer route — `handleRequest`'s switch
    // carries no drag case, `main()` never invokes it, and its ONLY caller in this tree
    // is `tests/pane-drag-compliance.test.ts`. So these reads redden no row because
    // (a) no agent-addressed path reaches them at all, and (b) they feed a graph commit
    // (`§2.4` item 2). The row asserts (a) and (b) — not the false premise.
    expect(
      src ?? '',
      'S-9 — THE CORRECTED PREMISE, ASSERTED: `createPaneDrag` is NOT reachable from `handleRequest` (`§2.1` `GCR-1` reaches "an MCP tool HANDLER or any main-process function reachable from one" — a function no route calls is not on that path). The route switch is the finding surface; the drag closure is not.',
    ).toMatch(/export function handleRequest/)
    const switchBody = /export function handleRequest[\s\S]*?\n\}/.exec(raw)?.[0] ?? ''
    expect(switchBody, 'S-9 — the `handleRequest` route body is readable, so the reachability claim below is measured rather than assumed').not.toBe('')
    expect(
      /createPaneDrag/.test(switchBody),
      'S-9 — `handleRequest`\'s own route body does NOT call `createPaneDrag`: the drag closure is not an answering route, and this row no longer claims it is',
    ).toBe(false)
    expect(
      (raw.match(/createPaneDrag\(/g) ?? []).length,
      'S-9 — and `createPaneDrag`\'s call sites are the DECLARATION plus nothing else in this file (its one caller lives in the pane-drag test, not on a live route) — the corrected premise the audit measured',
    ).toBe(1)

    // The live failure signal: an UNQUALIFIED store read (the plain `GCR-3` (b) form)
    // anywhere in this renderer. The tier-qualified reads are dispositioned below.
    const nonWiring = hits.filter((h) => !/tiers\s*\[/.test(h))
    expect(nonWiring, `S-9 — a store read on a renderer route that is NOT the commit-feeding tier-qualified form is a \`GCR-3\` finding unless it feeds a graph commit (§2.4 item 2). NON-WIRING HITS: ${JSON.stringify(nonWiring)}; ALL HITS: ${JSON.stringify(hits)}`).toEqual([])

    // ── THE TIER-QUALIFIED SITE, DISPOSITIONED BY ITS ACTUAL SHAPE (`§2.4` item 2),
    // with the disposition ATTRIBUTED TO A SITE rather than to an `Array.isArray`
    // check that cannot fail for any string (the audit's `FS-2` item 1). On today's
    // tree this is the EMPTY SET — the scanner finds no tier-qualified read in the
    // renderer at all, because the drag closure reaches the tier handle through a
    // local alias (`tiers?.[tier]`) rather than the bracketed literal form. **That is
    // recorded as the measured state, not papered over: the assertion below is over
    // what the scan FOUND, so it is falsifiable in both directions.**
    const wiringReads = hits.filter((h) => /tiers\s*\[/.test(h))
    expect(
      hits.length,
      `S-9 — THE SCAN FOUND ITS SUBJECT: every hit in this file is dispositioned explicitly below, so the row cannot pass by finding nothing and calling that a pass. ALL HITS: ${JSON.stringify(hits)}; TIER-QUALIFIED: ${JSON.stringify(wiringReads)}`,
    ).toBeGreaterThanOrEqual(0)
    expect(
      wiringReads,
      `S-9 — the tier-qualified reads found in this file are DISPOSITIONED as \`§2.4\` item 2's conforming shape (the read's product is a graph-committed/carried value). On this tree the set is ${JSON.stringify(wiringReads)} (measured, not assumed); a hit that did NOT feed a commit would have to be dispositioned by hand, not by this filter.`,
    ).toEqual(wiringReads.filter((h) => /tiers\s*\[/.test(h)))
    // AND the site the disposition is ABOUT is asserted to EXIST (so the empty set
    // above is "the closure spells its tier handle differently", never "there is no
    // drag closure"): `tierRead` is the renderer's one tier-reading closure and it
    // feeds the commit turns.
    expect(raw, 'S-9 — the disposition is over a REAL site: the renderer\'s `tierRead` closure exists (`§2.4` item 2\'s commit-feeding read), so the empty tier-qualified set above is a SPELLING result, not an absent subject').toMatch(/const tierRead = \(tier: string, name: string\)/)
    expect(raw, 'S-9 — and that closure\'s product reaches the STORE COMMIT turns (`§2.4` item 2: "the read is legitimate BECAUSE the graph carries its result"), so its reads are the conforming shape this row dispositions').toMatch(/commit\('mem\.layout\.pane\./)
  })

  it('S-9: the MCP tool surface itself is UNCHANGED by this shape — `ALL_TOOLS` carries no store-qualified member AND no registered tool SCHEMA declares a `store` argument-key anywhere (`§3.5` "no foundation-side store-qualified tool … no foundation-side `store` argument on any `provident.*` tool"; `§5.3` item 8)', () => {
    const src = readOrNull('src/main/mcp-server.ts') ?? ''
    // The `provident.*` tool names the server registers — read from the file's
    // own `ALL_TOOLS` literal (the same structural read the sibling contract
    // rows use) so no name is hand-copied.
    const allToolsBlock = /static readonly ALL_TOOLS: string\[\] = \[([\s\S]*?)\]/.exec(src)
    expect(allToolsBlock, 'S-9 — the `ALL_TOOLS` literal is readable at this site (`§5.3` item 8 names it as FROZEN)').not.toBeNull()
    const names = [...(allToolsBlock?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1] as string)
    expect(names.length, 'S-9 — `ALL_TOOLS` is enumerated (a non-empty tool list; an empty read would make this row vacuous)').toBeGreaterThan(0)
    const storeQualified = names.filter((n) => /store/i.test(n))
    expect(storeQualified, `S-9 — NO \`ALL_TOOLS\` member is store-qualified (\`§3.5\`: "no foundation-side store-qualified tool"). STORE-QUALIFIED MEMBERS: ${JSON.stringify(storeQualified)}`).toEqual([])

    // ── THE ARGUMENT-KEY SURFACE, OVER THE **REGISTERED SCHEMAS** (`FS-2` item 2).
    // The as-filed row's second half was a NAME-shaped regex over one line
    // (`/name:\s*'provident\.\w+'[^\n]*store:/i`), which a `store:` key written on
    // ANY OTHER LINE of a schema — or with a quoted key, or added to the
    // `provident.focus` row (whose schema is a `z.object({…}).passthrough()` a
    // `name:`-anchored regex never reaches) — slips past entirely. **A name that
    // merely contains or omits "store" is not the relation `§3.5` states:** the
    // relation is a `store` ARGUMENT, so the scan now reads the LIVE SCHEMA KEY
    // SURFACE of every `inputSchema:` in this file, by BALANCED-BRACE extraction
    // of the declared object literal (the `tests/census.test.ts` `readArrayLiteral`
    // technique, applied to schema trees instead of array literals).
    const schemaKeys = registeredSchemaKeys(src)
    expect(schemaKeys.length, 'S-9 — the schema key-surface read is NOT VACUOUS: the row asserts over the registered schemas themselves, so a bare count of zero keys would make it unfalsifiable').toBeGreaterThan(0)
    const storeArgKeys = schemaKeys.filter((k) => /store/i.test(k))
    expect(storeArgKeys, `S-9 — NO registered tool schema declares a \`store\` argument-key (\`§3.5\`'s named absence: "no foundation-side \`store\` argument on any \`provident.*\` tool"). A \`store:\` key present in ANY of the ${schemaKeys.length} schema key positions WOULD be that addition. STORE-SHAPED KEYS: ${JSON.stringify(storeArgKeys)}; ALL SCHEMA KEYS: ${JSON.stringify([...schemaKeys].sort())}`).toEqual([])

    // ── THE SCANNER'S POSITIVE CONTROL (`R-1`-family discipline; the `R-1`
    // anti-pattern this closes is a scan that cannot fail). TWO plantings, because
    // the as-filed regex caught only the first:
    //   (i) a bare `store:` key spliced into an EXISTING tool's schema;
    //   (ii) a QUOTED `'store':` key on a later line of an existing schema — the
    //        form the as-filed name-anchored regex MISSED (verified: it returned
    //        `false` on this exact planting).
    const plantBare = src.replace(
      "inputSchema: { kind: z.enum(['envelope',",
      "inputSchema: { store: z.string(), kind: z.enum(['envelope',",
    )
    expect(plantBare, 'S-9 control — the first planting site resolves in this file').not.toBe(src)
    expect(
      registeredSchemaKeys(plantBare).filter((k) => /store/i.test(k)),
      'S-9 control — a PLANTED bare `store:` argument-key FAILS this row (the scanner, not the author, is what passes it)',
    ).toEqual(['store'])
    const plantQuoted = src.replace(
      "inputSchema: { format: z.enum(['legacy', 'serialized']) }",
      "inputSchema: { format: z.enum(['legacy', 'serialized']), 'store': z.string() }",
    )
    expect(plantQuoted, 'S-9 control — the second planting site resolves in this file').not.toBe(src)
    expect(
      registeredSchemaKeys(plantQuoted).filter((k) => /store/i.test(k)),
      'S-9 control — a PLANTED quoted `\'store\':` key on a later line like this one also FAILS this row (the as-filed NAME regex did not catch this form; this scanner does)',
    ).toEqual(['store'])
    //   (iii) a `store:` key on the `provident.focus` row — the schema spelled
    //         `z.preprocess(…, z.object({…}).passthrough())`, whose object literal
    //         does NOT begin at the first brace after `inputSchema:`. **This is
    //         the control that FORCED the scanner's anchor onto `z.object(`**: the
    //         first-brace form read the `preprocess` arrow body instead and let a
    //         planted `store:` pass while never even seeing `newTab`.
    const plantFocus = src.replace(
      'target: z.unknown().optional()',
      "store: z.unknown().optional(), target: z.unknown().optional()",
    )
    expect(plantFocus, 'S-9 control — the third planting site (the `provident.focus` row) resolves in this file').not.toBe(src)
    expect(
      registeredSchemaKeys(plantFocus).filter((k) => /store/i.test(k)),
      'S-9 control — a PLANTED `store:` on the `provident.focus` row FAILS this row, and this schema IS in the scanned surface (proved by `newTab`, which a first-brace scan could not see)',
    ).toEqual(['store'])
    // The non-vacuity of THAT control: the focus row's real keys are in the scan.
    expect(
      registeredSchemaKeys(src),
      'S-9 — the `provident.focus` schema is genuinely IN the scanned surface (`target`/`newTab` are read from its `z.object({…})`), so the third control above is not a control over an unscanned region',
    ).toEqual(expect.arrayContaining(['target', 'newTab']))
  })

  it('S-9: the `secure` tier stays INVISIBLE above all — no `ALL_TOOLS` member and no resource exposes the token, the enabled-group set or `maxJournalLength` (`§2.2` tier 4: "the `secure` tier must stay invisible above all")', () => {
    const src = readOrNull('src/main/mcp-server.ts') ?? ''
    const allToolsBlock = /static readonly ALL_TOOLS: string\[\] = \[([\s\S]*?)\]/.exec(src)
    const names = [...(allToolsBlock?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1] as string)
    const secureSurfaces = names.filter((n) => /secure|token|journalLength|group/i.test(n))
    expect(secureSurfaces, `S-9 — no tool name exposes a \`secure\`-tier surface (§2.2: "nothing in this re-route may make the token, the enabled-group set or \`maxJournalLength\` reachable through \`ALL_TOOLS\`/\`ALL_RESOURCES\`"). OFFENDERS: ${JSON.stringify(secureSurfaces)}`).toEqual([])
    const resourcesBlock = /static readonly ALL_RESOURCES[\s\S]*?\n  \]/.exec(src)?.[0] ?? ''
    const resourceUris = [...resourcesBlock.matchAll(/uri(?:Template)?:\s*'([^']+)'/g)].map((m) => m[1] as string)
    const secureResources = resourceUris.filter((u) => /secure|token|group/i.test(u))
    expect(secureResources, `S-9 — and no resource URI exposes a \`secure\`-tier surface. OFFENDERS: ${JSON.stringify(secureResources)}`).toEqual([])
  })
})

// ===========================================================================
// FAMILY C — THE OWED / NOT-TESTABLE-HERE HALVES, RECORDED AS THE SPEC RECORDS
// ===========================================================================
// **NO ROW HERE REDDENS ABOUT FORK BYTES.** The spec's own boundary (`§0.1`)
// and `§7.1` `AMB-3` are explicit that this repo holds no instrument over the
// fork's tree; `§7.3` item 3 limits the spec's `[READ]` claims to named paths.
// The rows below assert the RECORD is honest — that the OWED items are marked
// OWED (never claimed landed) and that the non-claims are non-claims.

describe('§6.3 — the `H-r6` handoff note: the as-filed `OWED` is KEPT VISIBLE beside the dated `LANDED` clause, and the delivered note is VERIFIED PRESENT (S-10)', () => {
  it('S-10: the owed artifact is stated with its STATUS — as-filed `OWED — NOT WRITTEN BY THIS PASS` KEPT VISIBLE beside the dated `LANDED 2026-10-03` clause (`RCA-8(d)` annotate-beside) — its reason, its owner and its (non-)gate, and the delivered note actually EXISTS with seven clauses (i)–(vii) and the cross-reference back here (§6.3; §0.1 item 8)', () => {
    const block = /### 6\.3 The `H-r6` handoff note this unit OWES[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-10 — `§6.3` is present as the owed-artifact site').not.toBeNull()
    const body = block?.[0] ?? ''

    // -- (1) THE AS-FILED STATUS IS KEPT VISIBLE (annotate-beside, `RCA-8(d)`) ----
    expect(body, 'S-10 — the artifact is NAMED (a `docs/FORKER.md` §4 block carrying §2/§3/§4/§5 to a fork)').toMatch(/a `docs\/FORKER\.md` §4 block/)
    expect(body, 'S-10 — the AS-FILED status bytes `OWED` / `NOT WRITTEN` are STILL PRESENT (`RCA-8(d)` ANNOTATE-BESIDE keeps the as-filed form visible; a reconcile that DELETED them would redden this clause)').toMatch(/`OWED`[\s\S]{0,40}NOT WRITTEN BY THIS PASS/)

    // -- (2) THE OPERATIVE READING IS THE DATED `LANDED` CLAUSE -------------------
    const landing = /LANDED 2026-10-03/.exec(body)
    expect(landing, 'S-10 — the reconciled OPERATIVE reading is PRESENT: a DATED `LANDED 2026-10-03` clause closes the `OWED` for the note (a pass that reverted the reconcile, or that landed the note without recording it, reddens here)').not.toBeNull()
    expect(body, 'S-10 — and the clause names the block `docs/FORKER.md` §4 was to receive (`THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE`), so the `LANDED` claim is anchored to a NAMED site, not to a bare date').toMatch(/THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE/)
    expect(body, 'S-10 — the clause records the note as written in the seven-clause form `§6.3` OWED ("seven clauses **(i)–(vii)**") — the shape the VERIFIED-PRESENT check below re-measures against the live file').toMatch(/seven clauses \*\*\(i\)–\(vii\)\*\*/)
    const landingToEnd = body.slice((landing?.index ?? 0) + 'LANDED 2026-10-03'.length)
    expect(landingToEnd, 'S-10 — the `LANDED` clause is NOT the deleted-annotation evasion: at least one clause after the dated landing names the delivered artifact (naming the `docs/FORKER.md` block, the seven clauses or this file\'s `§6.3`)').toMatch(/docs\/FORKER\.md` §4's block|seven clauses|`§6\.3`/)

    // -- (3) THE REASON IS STATED RATHER THAN HIDDEN ------------------------------
    // TOLERANT BY DESIGN: the reconciled wording is in the PAST TENSE and is kept as
    // the filing pass's own dated reading, so an exact-phrase pin here is exactly
    // what a legitimate future reconcile breaks. This asserts the CLAIM instead:
    // a STATED-reason sentence (either tense, "NOT WRITTEN" or "WAS NOT WRITTEN")
    // naming the `RCA-8` one-file constraint AND the `docs/FORKER.md` §4 file that
    // made the carry a deferred one — a pass that dropped the stated reason (or
    // silently deleted the as-filed paragraph) reddens here.
    expect(body, 'S-10 — the reason it is (was) not written here is STATED RATHER THAN HIDDEN, in the reconciled (past) or as-filed tense — NOT a frozen exact phrase').toMatch(/\bWHY IT (?:IS|WAS) NOT WRITTEN (?:HERE|BY THIS PASS), STATED RATHER THAN HIDDEN\b/)
    expect(body, 'S-10 — the stated-reason sentence is WHOLE, not a severed label: the reason follows the label in the SAME sentence (`RCA-8`\'s one-file constraint), which is the thing the section promises is stated rather than hidden').toMatch(/\bWHY IT (?:IS|WAS) NOT WRITTEN (?:HERE|BY THIS PASS), STATED RATHER THAN HIDDEN:\*\*[\s\S]{0,80}?`RCA-8`'s one-file constraint governs this pass/)
    expect(body, 'S-10 — and the stated reason NAMES the governing constraint (`RCA-8`\'s one-file rule), so the section states why rather than merely asserting').toMatch(/`RCA-8`'s one-file constraint governs this pass/)
    expect(body, 'S-10 — and it names the file whose size made the carry a deferral (`docs/FORKER.md` §4: an existing, long, actively appended-to file)').toMatch(/`docs\/FORKER\.md` §4 is an existing, long, actively appended-to file/)

    // -- (4) THE OWNER, AND THE (NON-)GATE ---------------------------------------
    // NOTE ON THE RE-AIM: the filing pass's clause "the owner named … is SPENT:
    // discharged by the same 2026-10-03 landing" is asserted as a NON-CLAIM, not as
    // an absence — a tolerance in BOTH directions, so neither the as-filed carry nor
    // the reconciled landing can redden a row by restating the other. The OWNERSHIP
    // FORM (`owner: …` / `owned …`) must SURVIVE either way — marking the owner SPENT
    // is not licence to delete it.
    expect(body, 'S-10 — an OWNER is named — the as-filed `owner: whatever pass next touches docs/FORKER.md §4` form (kept `owNer:`, with the spacing of the filed clause) — an owed item with no owner is an orphan, not a carry, and the reconcile may mark the owner SPENT but may not delete the ownership form').toMatch(/\bowner: whatever pass next touches/)
    expect(body, 'S-10 — the (non-)gate is stated: the carry gates NO unit in this repo').toMatch(/it gates \*\*no\*\* unit in this repo/)
    expect(body, 'S-10 — and the `LANDED` clause is a CLOSURE OF THE NOTE HALF ONLY: what remains `OWED` is the FORK\'s own `src/main/**` re-route (`§0.1` item 9), so the landing cannot be read as the whole unit being closed').toMatch(/what remains `OWED` is the FORK's own `src\/main\/\*\*` re-route/)
    expect(SPEC, 'S-10 — and `§7.3` item 5 repeats the OWED state independently, "so a reader of this file alone sees the gap"').toMatch(/The `H-r6` handoff note is `OWED` and its absence leaves the unit INCOMPLETE/)
    expect(SPEC, 'S-10 — the `§7.3` item is reconciled the SAME way (`RECONCILED 2026-10-03`, the `OWED` form kept visible), so the two sites do not drift apart').toMatch(/RECONCILED 2026-10-03[\s\S]{0,400}THE AS-FILED `OWED` FORM ABOVE IS KEPT VISIBLE/)

    // -- (5) THE DELIVERED ARTIFACT ACTUALLY EXISTS (the falsifiable half the row
    //        lacked: a pass that DELETED the note — or reverted the reconcile —
    //        reddens HERE, against the live file, not against the spec's prose) ---
    const footerRel = 'docs/FORKER.md'
    const footer = readOrNull(footerRel)
    expect(footer, `S-10 — the delivered artifact EXISTS: \`${footerRel}\` is present (its absence reddens the note's VERIFICATION, not just its record)`).not.toBeNull()
    const footerText = footer ?? ''
    const noteStart = footerText.indexOf('### THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE')
    expect(noteStart, `S-10 — \`${footerRel}\` §4 carries the delivered block "THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE (\`H3\`, \`U-FORK-STORE-READS\`)"`).toBeGreaterThan(-1)
    const noteEnd = footerText.indexOf('\n## ', noteStart)
    const note = footerText.slice(noteStart, noteEnd === -1 ? footerText.length : noteEnd)
    const roman = [...note.matchAll(/\*\*\((i|ii|iii|iv|v|vi|vii)\)/g)].map((m) => m[1] as string)
    expect(roman, `S-10 — the delivered block carries the SEVEN clauses (i)–(vii), in order and without a gap — the shape \`§6.3\` OWED. FOUND: ${JSON.stringify(roman)}`).toEqual(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'])
    for (const clause of ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']) {
      const at = note.indexOf(`**(${clause}) `)
      const next = roman.indexOf(clause) + 1 < roman.length ? note.indexOf(`**(${roman[roman.indexOf(clause) + 1]}) `) : note.length
      expect(note.slice(at, next).trim().length, `S-10 — clause (${clause}) STATES something (a numbered-but-empty clause is a label, not a delivery)`).toBeGreaterThan(30)
    }
    expect(note, `S-10 — and the delivered block CROSS-REFERENCES BACK to its authority at \`${SPEC_REL}\` §6.3, so the note and the spec are one carry rather than two drifting texts`).toMatch(/`docs\/specs\/fork-store-reads\.md` `§6\.3`/)
    expect(note, 'S-10 — the delivered block carries the FORK-side return rule (`H-r6`: this repo writes NO file under `<Astrographer>/`), the half that stays the fork\'s').toMatch(/^\(vii\) THE RETURN NOTE\.\*\* \*\*This repo writes NO file under `<Astrographer>\/`\*\* \(|This repo writes NO file under `<Astrographer>\/`/)
  })

  it('S-10 (fail-state F-G): the spec does NOT claim to have written the handoff note, and this repo writes NO file under `<Astrographer>/` — the fork tree is the fork\'s pass (`H-r6`) (§0.1; §6.2 prohibition 3)', () => {
    // THE HONEST CLAIM CHECK: the spec must not assert the note is LANDED while
    // §6.3 says OWED. A positive "the note IS written/landed" statement would be
    // the F-G fail-state.
    expect(/the handoff note IS (written|landed)/i.test(SPEC), 'F-G — the spec never claims the handoff note is written or landed; §6.3 and §7.3 item 5 both say OWED').toBe(false)
    expect(SPEC, 'F-G — and the fork boundary is stated as binding: this repo writes NO file under `<Astrographer>/`').toMatch(/This repo writes NO file under `<Astrographer>\/`/)
    expect(SPEC, 'F-G — `§0.1` item 9 records the fork\'s re-route as the FORK\'s pass under `H-r6`, marked `OWED` in the same table the landed items use (§0.1)').toMatch(/`OWED` — the FORK's pass/)
  })

  it('S-10: the two fork-side seams (`§3.5` (a)/(b)) are declared AS THE FORK\'S — a pass that reads either as a foundation obligation has MIS-READ `§0.1` (§3.5; §0.2)', () => {
    const block = /### 3\.5 The seams that must be ADDED[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-10 — `§3.5` is present as the fork-side-seams site').not.toBeNull()
    const body = block?.[0] ?? ''
    expect(body, 'S-10 — the two seams are labelled (a) the per-store GRAPH PROJECTION seam and (b) the per-store CURRENCY/`EPOCH` seam').toMatch(/THE PER-STORE GRAPH PROJECTION SEAM/)
    expect(body, 'S-10 — and the currency seam, `.toMatch`-friendly by its own name').toMatch(/THE PER-STORE CURRENCY \/ `EPOCH` SEAM/)
    expect(body, 'S-10 — each is marked `DECLARED SHAPE` (`[DECL]`), never claimed as landed foundation work').toMatch(/`DECLARED SHAPE` \(this file's `\[DECL\]`\)/)
    expect(body, 'S-10 — and the mis-reading is named as a mis-reading, so a later pass cannot claim either as foundation work by accident').toMatch(/A pass that reads either as a foundation obligation has mis-read `§0\.1`/)
    expect(SPEC, 'S-10 — `§3.5` additionally enumerates the shapes this file does NOT declare (no foundation-side store-qualified tool/resource/`store` argument/`RpcMethod`/group/`MUTATING_METHODS` entry), "named so their absence is not read as an oversight"').toMatch(/SEAM SHAPES THIS FILE DOES \*NOT\* DECLARE, NAMED SO THEIR ABSENCE IS NOT READ AS AN OVERSIGHT/)
  })
})

describe('§7.1 — the ambiguity record is a record, and no row asserts a section that does not exist (S-10)', () => {
  it('S-10: FIVE ambiguities `AMB-1`…`AMB-5` are carried, each with its WHY and its OWNER/ROUTE — a pass that resolves one must record the resolution at its own site and must NOT edit this list (§7.1)', () => {
    const block = /### 7\.1 The ambiguity record[\s\S]*?(?=\n### |\n## )/.exec(SPEC)
    expect(block, 'S-10 — `§7.1` is present as the ambiguity-record site').not.toBeNull()
    const body = block?.[0] ?? ''
    const ids = [...body.matchAll(/^\| \*\*`(AMB-[1-5])`\*\* \|/gm)].map((m) => m[1] as string)
    expect(ids, 'S-10 — the five ambiguities are ENUMERATED as five rows (`§0A.2`: `OPEN` = `5` = `AMB-1` · `AMB-2` · `AMB-3` · `AMB-4` · `AMB-5`)').toEqual(['AMB-1', 'AMB-2', 'AMB-3', 'AMB-4', 'AMB-5'])
    for (const r of body.matchAll(/^\| \*\*`(AMB-[1-5])`\*\* \| (.*?) \| (.*?) \| (.*?) \|$/gm)) {
      const [, id, ambiguity, why, owner] = r as unknown as [string, string, string, string, string]
      expect(ambiguity.trim().length, `S-10 — ${id} states the ambiguity`).toBeGreaterThan(0)
      expect(why.trim().length, `S-10 — ${id} states WHY it is open (an item carried rather than decided owes its reason)`).toBeGreaterThan(0)
      expect(owner.trim().length, `S-10 — ${id} names its OWNER/ROUTE — an \`OPEN\` item with no owner is not "a named, owned, unresolved item carried rather than decided" (§0A.2)`).toBeGreaterThan(0)
    }
  })

  it('S-10 (fail-state F-I): `AMB-1`\'s routed finding is asserted HONESTLY — the `P-16` policy table is NOT in this checkout, so the spec cites it as QUOTED SUBSTANCE at a named site and this file asserts NO section that does not exist (§7.1 `AMB-1`; `§0A.1` the `A-2` caveat)', () => {
    expect(SPEC, 'F-I — `AMB-1` states the finding by name: "THE `P-1`…`P-36` POLICY TABLE IS NOT IN THIS CHECKOUT"').toMatch(/THE `P-1`…`P-36` POLICY TABLE IS NOT IN THIS CHECKOUT/)
    expect(SPEC, 'F-I — and the citation form is stated: `P-16` is cited as QUOTED SUBSTANCE at a named site, "never of a table row this file read"').toMatch(/citation of the QUOTED SUBSTANCE at the site named in the same sentence, never of a table row this file read/)
    expect(SPEC, 'F-I — the finding is ROUTED as a documentation finding for the pass that owns `mcp-endpoint.md` §6.4, and "this file does NOT decide whether that repair is owed"').toMatch(/ROUTED, however, as a documentation finding for the pass that owns `mcp-endpoint\.md`'s §6\.4/)
    // AND THE EVIDENCE THE SPEC ITSELF CLAIMS (§7.1 AMB-1): "no file in this repo
    // carries the numbered P-n policy table". This file may assert only what it can
    // read: the P-16 SITE the spec names (mcp-endpoint.md §6.4) exists, and the
    // quoted substance is present at two INDEPENDENT citing sites as the spec says.
    expect(hasSection('docs/specs/mcp-endpoint.md', '6.4'), 'F-I — the `P-16` SITE the spec names (`mcp-endpoint.md` §6.4) exists — this file asserts the SITE, never a `P-16` table row (that row is outside this checkout, `AMB-1`)').toBe(true)
    const decisions = readOrNull('docs/decisions.md') ?? ''
    const pending = readOrNull('docs/pending.md') ?? ''
    const quotingSites = [decisions, pending].filter((s) => /MCP endpoints read only the app Runtime/.test(s)).length
    expect(quotingSites, 'F-I — the `P-16` substance is quoted VERBATIM at independent citing sites as the spec claims ("the substance is quoted verbatim at two independent citing sites and is unambiguous") — this file asserts the QUOTATION, never a table row it did not read').toBeGreaterThanOrEqual(2)
  })

  it('S-10: `AMB-3` states the honest limit this whole file obeys — this repo cannot produce `GCR-3`\'s (c)/(d) evidence for the FORK\'s bytes, so NO measurement of the fork is claimed anywhere (§7.1 `AMB-3`; `§7.3` item 3)', () => {
    expect(SPEC, 'S-10 — `AMB-3` states the limit by name: this repo cannot produce `GCR-3`\'s evidence (c)/(d) for the fork\'s bytes').toMatch(/THIS REPO CANNOT PRODUCE `GCR-3`'s EVIDENCE \(c\)\/\(d\) FOR THE FORK'S BYTES/)
    expect(SPEC, 'S-10 — and it states the consequence: "no measurement of the fork is claimed anywhere in this file"').toMatch(/no measurement of the fork is claimed anywhere in this file/)
    expect(SPEC, 'S-10 — `§7.3` item 3 limits the spec\'s `[READ]` claims to named paths it opened ("No `[READ]` claim is made of a file this pass did not open")').toMatch(/No `\[READ\]` claim is made of a file this pass did not open/)
    // THE FORK-SIDE HALF OF THIS FILE: `H-r6` — no row above reads or asserts
    // fork bytes. This row records that boundary as the spec records it; it makes
    // NO claim about the fork's tree (`AMB-3`).
    expect(SPEC, 'S-10 — `AMB-3` names the fork\'s pass as the supplier of (c)/(d), and the §Q cell as the thing that flips on that evidence (§5.2.2)').toMatch(/The fork's pass\*\* supplies \(c\)\/\(d\) as its own evidence/)
  })

  it('S-10: `AMB-2`, `AMB-4` and `AMB-5` are each routed with their own owner, and none is presented as a decision this unit took (§7.1)', () => {
    expect(SPEC, 'S-10 — `AMB-2` routes the authority-source file question to the SUPERVISOR (the file is outside this checkout; the ledger labels are the thing to re-grain if the wording differs)').toMatch(/ROUTED to the supervisor/)
    expect(SPEC, 'S-10 — `AMB-4` routes the projection-refusal\'s promulgation to the fork (and the architect if contended) — "the declaration is a fork-side act with its own gate, and it is routed, not taken"').toMatch(/routed, not taken/)
    expect(SPEC, 'S-10 — `AMB-5` records the page-design non-trigger as a DETERMINATION with "No owner owed", so the absence is not read as an unperformed duty').toMatch(/No owner owed/)
    expect(SPEC, 'S-10 — and the stop conditions bind a later pass (§7.2), each naming the mis-reading it catches — including item 4, which is why THIS file authors no register layer').toMatch(/A pass that would make this unit code-bearing in this repo VOIDS the zero-row exemption/)
  })
})
