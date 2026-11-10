// tests/unit/renderer-wiring/signatures.test.ts — **THE `D-45` CHECKING ROW `docs/L3/renderer-wiring/signatures.md` NEVER HAD**
// (`D-170`'s instrument gap, written down there rather than smoothed: *"NO ROW PINS `renderer-wiring`'s SIGNATURE TRANSCRIPTION —
// `C-7` pins the *tabs* page and nothing pins this one, so the two fence lines this pass added are unchecked by any battery"*).
//
// WHY THIS FILE EXISTS. `signatures.md` is a TRANSCRIPTION of `design.md`: it is regenerated when the design moves, and it says
// which rev it transcribes in its own header (`transcribing \`design.md\` rev 16`). **NOTHING COMPARED THAT CLAIM TO ANYTHING.**
// `tests/unit/store-tabs-record/signatures.test.ts`'s `C-7` pins the same relation for the `store-tabs-record` page; this page
// carried the identical sentence in the identical form, checked by no battery at all — so one that lagged its design by four revs,
// or that stopped parsing cleanly, would read as agreement forever. A signature page nothing checks is a page that can drift
// silently, and that is the class `D-45` (*a document may keep a declaration block only if something compares it to the tree*)
// exists for. This row is that arm for this page, and its idiom is `C-7`'s rather than a new one.
//
// THE ROWS, AND EACH IS MEANT TO BE ABLE TO FAIL:
//   · `TR-1` — the transcribed rev IS the design's current rev, and BOTH phrases are found at all: a stale rev means the block
//     was not regenerated when the design moved (`D-46`).
//   · `TR-2` — **THE SYNTHETIC CONTROL**: the same comparator, driven over a FABRICATED pair of documents, reds where the page is
//     AHEAD of its design and where it is BEHIND, and passes only on agreement — so `TR-1` cannot be agreement-by-vacuity.
//   · `TR-3` — **THE PARSE CONTROL**: a document with no `Rev:` marker and one with no `transcribing` phrase each answer `null`,
//     and two missing readings do NOT compare equal. Near-misses — an unbackticked phrase, a spelled-out number, a `Rev 16` in a
//     form that is not the marker — answer `null` too, so a parser that stopped understanding its document cannot report agreement.
//   · `TR-4` — the phrase compared is the page's HEAD one, which is the newest rev the page names. The page also carries the
//     historical phrases of its earlier revs, so a parser taking the LAST would read the OLDEST and red `TR-1` on a correct page,
//     and a page whose head lagged its own later paragraph would otherwise pass unmeasured.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked` marker and GATES (`D-40`): UNMARKED, no carve-out. It reads
// two documents and no module machinery — it states no behaviour, and it restates no count that `brief.md` §6 owns (`D-26`).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const at = (relative: string): string => fileURLToPath(new URL(relative, import.meta.url))

const DESIGN = readFileSync(at('../../../docs/L3/renderer-wiring/design.md'), 'utf8')
const DOC = readFileSync(at('../../../docs/L3/renderer-wiring/signatures.md'), 'utf8')

/** **THE DESIGN'S OWN HEADER MARKER** — `**Rev:** N`, the rev the design document carries. */
const DESIGN_REV = /\*\*Rev:\*\* (\d+)/

/** **THE PAGE'S TRANSCRIPTION CLAIM** — `transcribing \`design.md\` rev N`, the rev the block was regenerated from. */
const TRANSCRIBED_REV = /transcribing `design\.md` rev (\d+)/

/** The design rev a document carries, or `null` where its bytes carry no marker at all (`TR-3`). */
const designRevOf = (text: string): number | null => {
  const hit = text.match(DESIGN_REV)
  return hit === null ? null : Number(hit[1])
}

/** Every rev a page names as transcribed, in DOCUMENT ORDER — its current claim first, its history after it (`TR-4`). */
const transcribedRevsOf = (text: string): number[] =>
  [...text.matchAll(new RegExp(TRANSCRIBED_REV.source, 'g'))].map((hit) => Number(hit[1]))

/** The rev the page's HEAD phrase names, or `null` where it names none (`TR-3`). */
const transcribedRevOf = (text: string): number | null => transcribedRevsOf(text)[0] ?? null

/**
 * **THE COMPARATOR EVERY ROW DRIVES** — `null` where the transcription agrees with the design, and a NAMED divergence otherwise.
 * **BOTH `null` ARMS ARE DIVERGENCES AND NOT AGREEMENTS**: a document the parser stopped understanding must fail the row rather
 * than compare equal to another silence, which is the vacuity `TR-3` refuses and the reason this is a total function over
 * `number | null` instead of a `toBe` on two parsed numbers.
 */
const transcriptionDivergence = (designRev: number | null, transcribedRev: number | null): string | null => {
  if (designRev === null) return 'no design rev — the design document carries no `**Rev:** N` marker'
  if (transcribedRev === null) return 'no transcribed rev — the page names no `transcribing design.md rev N` phrase'
  if (transcribedRev === designRev) return null
  const direction = transcribedRev > designRev ? 'AHEAD of' : 'BEHIND'
  return `the page transcribes design rev ${transcribedRev}, ${direction} the design's current rev ${designRev}`
}

/** **`TR-4`'S COMPARATOR** — `null` where the head phrase names the newest rev the page names, else the lag, named. */
const headerLag = (text: string): string | null => {
  const revs = transcribedRevsOf(text)
  const head = revs[0] ?? null
  if (head === null) return 'no transcription phrase at all'
  const newest = Math.max(...revs)
  return head === newest ? null : `the head phrase names rev ${head} while the page's own newest phrase names rev ${newest}`
}

/**
 * **THE CONTROL'S FIXTURE** — a FABRICATED pair of documents in the two parsers' own shapes, never read off the tree, so `TR-2`
 * drives the comparator itself rather than the currency of the documents it happens to sit beside. The page's second line stands
 * for the history every revision block carries, which is what makes the head/oldest distinction measurable (`TR-4`).
 */
const fabricated = (designRev: number, transcribedRev: number): { readonly design: string; readonly signatures: string } => ({
  design: `# a fabricated L3 design\n\n- **Layer:** L3 · **Module:** control · **Rev:** ${designRev} — the control's own header\n`,
  signatures:
    `# a fabricated signatures page\n\n- **Rev:** 1 — the control's own header, transcribing \`design.md\` rev ${transcribedRev}\n` +
    '- Rev 1 — an earlier header, transcribing `design.md` rev 1\n',
})

describe('D-45 — `renderer-wiring`\'s transcription, checked against the design it transcribes', () => {
  it("TR-1 — `signatures.md` transcribes `design.md`'s CURRENT rev, so the block cannot lag the design it belongs to", () => {
    const designRev = designRevOf(DESIGN)
    const transcribedRev = transcribedRevOf(DOC)
    expect(designRev, 'design.md carries a `**Rev:** N` marker').not.toBeNull()
    expect(transcribedRev, 'signatures.md names the design rev it transcribes').not.toBeNull()
    expect(transcribedRev, 'a stale rev means the block was not regenerated when the design moved').toBe(designRev)
    expect(
      transcriptionDivergence(designRev, transcribedRev),
      'and the comparator agrees, so the two readings above are not the only witness to this claim',
    ).toBeNull()
    // THE PHRASE IS IN THE DOCUMENT VERBATIM, IN THE FORM THE PARSE READ — so the agreement above is not a coincidence of two
    // parsers landing on the same unrelated number.
    expect(DOC).toContain(`transcribing \`design.md\` rev ${String(designRev)}`)
  })

  it('TR-2 — SYNTHETIC CONTROL: the same comparator reds on a divergence in BOTH directions, so TR-1 can bite', () => {
    const agree = fabricated(16, 16)
    const ahead = fabricated(16, 17)
    const behind = fabricated(17, 16)
    // AGREEMENT PASSES, so the two reds below are the comparator and not a constant that always answers a divergence.
    expect(
      transcriptionDivergence(designRevOf(agree.design), transcribedRevOf(agree.signatures)),
      'the control passes on agreement',
    ).toBeNull()
    // THE PAGE AHEAD OF ITS DESIGN: it claims to transcribe a rev the design does not carry yet.
    const aheadReading = transcriptionDivergence(designRevOf(ahead.design), transcribedRevOf(ahead.signatures))
    expect(aheadReading, 'a page transcribing a NEWER rev than the design holds is a divergence').not.toBeNull()
    expect(aheadReading, 'and the direction is named, not merely the inequality').toContain('AHEAD')
    expect(aheadReading).not.toContain('BEHIND')
    // AND THE PAGE BEHIND IT — the direction a stale block actually takes, and the one this pin exists for.
    const behindReading = transcriptionDivergence(designRevOf(behind.design), transcribedRevOf(behind.signatures))
    expect(behindReading, 'a page transcribing an OLDER rev than the design holds is a divergence').not.toBeNull()
    expect(behindReading, 'and it is the other direction, read off the same comparator').toContain('BEHIND')
    expect(behindReading).not.toContain('AHEAD')
    expect(aheadReading, 'so the two directions are distinguishable readings and not one message').not.toBe(behindReading)
    // BOTH REVS ARE IN EACH REPORT, so a reader is told which pair diverged rather than that some pair did.
    expect(aheadReading).toContain('17')
    expect(aheadReading).toContain('16')
    expect(behindReading).toContain('16')
    expect(behindReading).toContain('17')
  })

  it('TR-3 — PARSE CONTROL: a document missing either phrase answers `null` and NEVER compares equal', () => {
    const headerless = '# a fabricated design\n\n- **Layer:** L3 · **Module:** control — no rev marker anywhere\n'
    const phraseless = '# a fabricated signatures page\n\n- **Rev:** 3 — its header names no transcription at all\n'
    expect(designRevOf(headerless), 'a document with no `Rev:` marker answers `null`').toBeNull()
    expect(transcribedRevOf(phraseless), 'a page with no `transcribing` phrase answers `null`').toBeNull()
    // AND THE COMPARATOR REDS ON EACH — the arm that keeps a broken parse from reading as a clean agreement.
    expect(transcriptionDivergence(designRevOf(headerless), 16), 'a missing design rev is a divergence').not.toBeNull()
    expect(transcriptionDivergence(16, transcribedRevOf(phraseless)), 'a missing transcribed rev is a divergence').not.toBeNull()
    expect(
      transcriptionDivergence(designRevOf(headerless), transcribedRevOf(phraseless)),
      'AND TWO MISSING READINGS DO NOT COMPARE EQUAL — this is the vacuity the row exists to refuse',
    ).not.toBeNull()
    // THE PARSE IS EXACT RATHER THAN FORGIVING, so a document drifting out of the marker's form reds instead of matching loosely:
    expect(designRevOf('- **Layer:** L3 · **Rev:** sixteen — a spelled-out number'), 'a non-numeric rev is not the marker').toBeNull()
    expect(designRevOf('- **Rev 16** — bold without the colon the marker carries'), 'the marker is `**Rev:**`, colon included').toBeNull()
    expect(transcribedRevOf('transcribing design.md rev 16'), 'the phrase carries its backticks around `design.md`').toBeNull()
    expect(transcribedRevOf('transcribing `design.md` revision 16'), 'and the word is `rev`, not a prefix of another').toBeNull()
    expect(transcribedRevsOf(phraseless), 'a page naming no transcription names none — never one invented reading').toEqual([])
  })

  it('TR-4 — the phrase compared is the page\'s HEAD, which is the newest rev it names: an older phrase is history, never the claim', () => {
    const revs = transcribedRevsOf(DOC)
    expect(revs.length, 'the page names its transcription at all').toBeGreaterThan(0)
    expect(headerLag(DOC), "the head phrase is the newest rev the page names, so TR-1's reading is the page's CLAIM").toBeNull()
    expect(transcribedRevOf(DOC), "and it is the rev TR-1 compared").toBe(revs[0])
    // THE HISTORY IS REAL AND IT IS OLDER, so a parser taking the LAST phrase would read the OLDEST and red TR-1 on a correct page:
    expect(revs.length, 'the page carries the history of its earlier transcriptions too').toBeGreaterThan(1)
    expect(revs[revs.length - 1], 'and the last is an EARLIER rev than the head claim').toBeLessThan(revs[0] ?? Number.NaN)
    // THE LAG THIS GUARDS, DRIVEN SYNTHETICALLY: a page whose head phrase is older than a phrase below it reds here, though both
    // phrases parse and the head one may even equal the design's rev.
    const lagging =
      '- **Rev:** 2 — the control\'s header, transcribing `design.md` rev 15\n' +
      '- Rev 1 — a paragraph below it, transcribing `design.md` rev 16\n'
    const lag = headerLag(lagging)
    expect(lag, 'a head that lags a phrase below it is a divergence').not.toBeNull()
    expect(lag).toContain('15')
    expect(lag).toContain('16')
    expect(headerLag(fabricated(16, 16).signatures), 'while a page whose head IS its newest agrees').toBeNull()
  })
})
