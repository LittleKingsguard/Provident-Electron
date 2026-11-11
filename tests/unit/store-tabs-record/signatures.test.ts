// tests/unit/store-tabs-record/signatures.test.ts — THE `D-45` CHECKING ROW for
// `docs/L3/store-tabs-record/signatures.md`.
//
// WHY THIS FILE EXISTS (D-45: *"a document may keep a declaration block only if something compares it to the tree"*).
// That document sat at rev 1 declaring a module that no longer existed — `TabsRecordOptions { readonly userDataDir }`,
// `TABS_RECORD_FILE_NAME`, `TABS_EXCLUSION_ADDRESS`, an asynchronous `read`, no `remove`, a three-route `tabs` member
// and three channel constants where the module exports four — and **nothing compared it to anything**, so it drifted
// silently through the whole crossing. Rev 2 regenerates the block from the landed modules, and this row is the arm of
// D-45 that lets it be kept: the block's declared NAME SET must equal the module's exported names, the block's
// transcription target must be `design.md`'s CURRENT rev, and both readings are taken from the tree rather than trusted.
//
// HOW IT CAN FAIL, NAMED SO A READER CAN CHECK THE FAILURE: (i) a name added to a module and not to the document reds
// `declared === source`; (ii) a name removed from a module and left in the document reds the same row from the other
// side; (iii) a body that moves without a name moving is caught by the value pins below (`MALFORMED_ROW_MESSAGE`, the
// three address constants, the four channel strings, the five batched ids); and (iv) `design.md` moving without this
// document being regenerated reds the rev pin. Arms (i) and (ii) are exercised by the SYNTHETIC CONTROL below, which
// drives the same comparator over a deliberately divergent pair rather than trusting that it could bite.
//
// AUTHORED AFTER the D-30 sweep, so it carries NO `strata:marked` marker: a scenario authored after that sweep gates
// (D-40). It reads no module machinery and states no behaviour — it is a documentation-drift row.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import * as tabsChannels from '../../../src/shared/tabs-channels'
import * as tabsRecord from '../../../src/main/tabs-record/index'
import * as tabsSurface from '../../../src/main/tabs-surface/index'

const at = (relative: string): string => fileURLToPath(new URL(relative, import.meta.url))

const DOC = readFileSync(at('../../../docs/L3/store-tabs-record/signatures.md'), 'utf8')
const DESIGN = readFileSync(at('../../../docs/L3/store-tabs-record/design.md'), 'utf8')

/** One `## n. …` section's fenced `ts` block, verbatim, or `''` where the section carries none (D-45 arm (i)). */
const blockOf = (doc: string, heading: string): string => {
  const from = doc.indexOf(heading)
  if (from < 0) return ''
  const open = doc.indexOf('```ts', from)
  const close = open < 0 ? -1 : doc.indexOf('```', open + 5)
  return open < 0 || close < 0 ? '' : doc.slice(open + 5, close)
}

/** The names a declaration block declares as VALUES — its `export const` and `export function` rows. */
const declaredValues = (block: string): string[] =>
  [...block.matchAll(/^export (?:const|function) ([\w$]+)/gm)].map((m) => m[1] as string).sort()

/** The names a declaration block declares as TYPES — its `export interface` and `export type` rows. */
const declaredTypes = (block: string): string[] =>
  [...block.matchAll(/^export (?:interface|type) ([\w$]+)/gm)].map((m) => m[1] as string).sort()

/** The names a module declares as TYPES in its own bytes, plus any it re-exports by name. */
const sourceTypes = (path: string): string[] => {
  const text = readFileSync(at(path), 'utf8')
  return [
    ...[...text.matchAll(/^export (?:interface|type) ([\w$]+)/gm)].map((m) => m[1] as string),
    ...[...text.matchAll(/^export type \{ ([\w$]+) \} from/gm)].map((m) => m[1] as string),
  ].sort()
}

/** The comparator every arm below drives: the divergence, or the empty list that says there is none. */
const divergence = (declared: readonly string[], source: readonly string[]): string[] => {
  const held = new Set(source)
  const named = new Set(declared)
  return [
    ...declared.filter((name) => !held.has(name)).map((name) => `${name} (declared, not exported)`),
    ...source.filter((name) => !named.has(name)).map((name) => `${name} (exported, not declared)`),
  ]
}

/** The design rev `signatures.md` says it transcribes, and the design rev the design document actually carries. */
const revOf = (text: string, pattern: RegExp): number | null => {
  const hit = text.match(pattern)
  return hit === null ? null : Number(hit[1])
}

describe('D-45 — the declaration blocks, checked against the modules they transcribe', () => {
  it('C-1 — `src/shared/tabs-channels.ts`: the block declares exactly the module\'s exports, and the four strings are unmoved', () => {
    const block = blockOf(DOC, '## 1. `src/shared/tabs-channels.ts`')
    expect(block.length, '§1 — the block must exist; D-45 arm (i) is the only alternative and §4 takes it, not this section').toBeGreaterThan(0)
    expect(divergence(declaredValues(block), Object.keys(tabsChannels).sort())).toEqual([])
    expect(declaredValues(block), '§1 — the module exports VALUES only, so its type set is empty and the block declares none').toEqual(
      ['IPC_TABS_CHANGED', 'IPC_TABS_COMMIT', 'IPC_TABS_READ', 'IPC_TABS_REMOVE'],
    )
    // THE BODIES, not only the names: a rename that kept the name set would slip a name-set check alone.
    expect(tabsChannels.IPC_TABS_READ).toBe('provident:tabs:read')
    expect(tabsChannels.IPC_TABS_COMMIT).toBe('provident:tabs:commit')
    expect(tabsChannels.IPC_TABS_REMOVE).toBe('provident:tabs:remove')
    expect(tabsChannels.IPC_TABS_CHANGED).toBe('provident:tabs:changed')
  })

  it("C-2 — `src/main/tabs-record/index.ts`: the block's names equal the module's, on both sides of the type/value line — **RE-GRAINED FOR `D-219`: THE DRIFT IS NOW EMPTY BECAUSE THE PAGE TRANSCRIBES THE THREE NAMES**", () => {
    const block = blockOf(DOC, '## 2. `src/main/tabs-record/index.ts`')
    expect(block.length, '§2 — the block must exist').toBeGreaterThan(0)
    // **THE DRIFT IS EMPTY, AND IT IS EMPTY FOR ONE REASON THIS ROW NAMES**: the propagation moved the module's declared
    // surface by three names — `createTabsDelivery` as a value and `TabsDelivery`/`TabsDeliveryEntry` as types — and
    // `signatures.md` rev 9 §2 TRANSCRIBES ALL THREE, so both comparators below now answer `[]` where the earlier grain of
    // this very row pinned the three as `(exported, not declared)` (`D-219`, `TD-5`). **THE LISTS ARE STILL PINNED, AS EXACT
    // `[]`, RATHER THAN DELETED**, because the row keeps measuring the direction it was built for: **A FOURTH EXPORT THE
    // PAGE DOES NOT DECLARE reds the value or the type list; A PAGE THAT DROPS ANY OF THE THREE reds the list from the other
    // side; and A DECLARED NAME THE MODULE NO LONGER EXPORTS reds the reverse checks below** — an empty list that nothing
    // can move is a row that cannot fail, and this one can fail in all three of those ways (`D-45`).
    expect(divergence(declaredValues(block), Object.keys(tabsRecord).sort()), '§2 — no value is exported and undeclared: `createTabsDelivery` is transcribed').toEqual([])
    expect(divergence(declaredTypes(block), sourceTypes('../../../src/main/tabs-record/index.ts')), '§2 — and no type: `TabsDelivery` and `TabsDeliveryEntry` are transcribed').toEqual([])
    // **THE OTHER DIRECTION IS ALSO EMPTY, AND IT IS KEPT BECAUSE IT IS THE HALF THAT KEEPS THE PAIR FROM BEING A RENAME**:
    // nothing the block declares has stopped being exported, so a page that fell behind its module reds the two `[]`s above
    // while a page describing a module that moved away reds here — the two directions are read on every run, so neither
    // `[]` is an absence.
    expect(declaredValues(block).filter((name) => !Object.keys(tabsRecord).includes(name)), '§2 — every declared value still stands in the module').toEqual([])
    expect(declaredTypes(block).filter((name) => !sourceTypes('../../../src/main/tabs-record/index.ts').includes(name)), '§2 — and every declared type').toEqual([])
    // THE RE-EXPORT IS DECLARED, and it is `TabsRecordRow` — a name whose body lives in `src/shared/types.ts` and which
    // the module exports under `export type { … } from`. A name-set check that read only `export interface`/`export type`
    // would miss it and would silently accept a block that dropped it.
    expect(declaredTypes(block)).toContain('TabsRecordRow')
    expect(declaredTypes(block)).toContain('TabsCommitCarrier')
    expect(declaredValues(block)).toContain('MALFORMED_ROW_MESSAGE')
  })

  it('C-3 — the values the block writes in prose are the values the module holds', () => {
    expect(tabsRecord.MALFORMED_ROW_MESSAGE, '§2 — the shape arm\'s one sentence').toBe('the commit carries no tab id, or no plain record')
    expect(tabsRecord.MALFORMED_ROW_MESSAGE, '§5 — and the block\'s table quotes it').toBe(
      'the commit carries no tab id, or no plain record',
    )
    expect(DOC, '§5 — the table quotes the constant verbatim, so a reword reddens here rather than drifting').toContain(
      "'the commit carries no tab id, or no plain record'",
    )
    expect([...tabsRecord.TABS_RECORD_ADDRESS]).toEqual(['tabs'])
    expect([...tabsRecord.TABS_ORDER_ADDRESS]).toEqual(['tabs', 'order'])
    expect([...tabsRecord.TABS_LANDING_ADDRESS]).toEqual(['tabs', 'landing'])
    // THE ENTRY'S ID, READ BY THE RENDERER PASS AND ONE SPELLING (D-76): the id IS the address's key, so the two constants
    // cannot drift — and the value is the renderer's `'landing'`, not the `'tabs-landing-page'` that names the page NODE.
    expect(tabsRecord.TABS_LANDING_ID, '§2 — the landing entry\'s id, the renderer\'s spelling').toBe('landing')
    expect(tabsRecord.TABS_LANDING_ID, '§2 — and it is the address key, spelled once').toBe(tabsRecord.TABS_LANDING_ADDRESS[1])
    expect(tabsRecord.TABS_CONSTRAINT_ID).toBe('exactly-one-active')
    expect(tabsRecord.TABS_MUST_STAND_ID).toBe('tabs-must-stand')
  })

  it('C-4 — the batch returns SIX declarations, which is the count §2\'s prose states', () => {
    // **THE SIXTH IS `order-names-its-tabs` AND IT IS SECOND** (`D-83`): the seat pair is unwrapped by the batch's `body`
    // helper for `tabs-must-stand`'s reason, because the boot's holder is unbound at the store's creation — the one instant
    // a seat the FILE brought broken can be repaired before any caller's act. Its position is part of the contract, not an
    // accident of the list: the two unwrapped bodies are the two that must act there.
    const declarations = tabsRecord.tabsConstraintDeclarations(() => null)
    expect(declarations.length, '§2 — the prose says six').toBe(6)
    expect(declarations.map((declaration) => declaration.id)).toEqual([
      'tabs-must-stand',
      'order-names-its-tabs',
      'exactly-one-active',
      'tab-has-title',
      'tab-has-content',
      'tab-has-lastActiveAt',
    ])
    // EVERY ONE STANDS AT THE RECORD'S OWN ADDRESS, and every body is a function — the two facts the boot's batch needs.
    for (const declaration of declarations) {
      expect([...declaration.address]).toEqual(['tabs'])
      expect(typeof declaration.constraint).toBe('function')
    }
    // THE TWO EXPORTED IDS ARE THE TWO THE BATCH USES, each read off the module's own constant rather than re-spelled.
    expect(declarations[0]?.id).toBe(tabsRecord.TABS_MUST_STAND_ID)
    expect(declarations[2]?.id, '`exactly-one-active` is the third: the seat pair stands between the EXISTENCE pair and the ACTIVE-COUNT pair, because the family is read from the seat (D-83)').toBe(tabsRecord.TABS_CONSTRAINT_ID)
    expect(DOC, '§2\'s gloss states the count, so the sentence and this row measure the same six').toContain('**six**')
  })

  it("C-5 — `src/main/tabs-surface/index.ts`: the block's names equal the module's, and its three surviving routes — **THE `attach`/`detach` HALF RETIRES BY NAME WITH ITS MEMBERS** (`D-219`, `TD-5`)", () => {
    const block = blockOf(DOC, '## 3. `src/main/tabs-surface/index.ts`')
    expect(block.length, '§3 — the block must exist').toBeGreaterThan(0)
    expect(divergence(declaredValues(block), Object.keys(tabsSurface).sort())).toEqual([])
    expect(divergence(declaredTypes(block), sourceTypes('../../../src/main/tabs-surface/index.ts'))).toEqual([])
    // THE ROUTE NAMES, read off the module's own declaration: `read`, `commit` and `remove`. §3's block is the only home of
    // them, so a route added to `TabsSurface` and not to the block reds HERE and not in C-5's set row.
    const declared = block.slice(block.indexOf('export interface TabsSurface'), block.indexOf('export interface TabsSurfaceOptions'))
    for (const route of ['read(', 'commit(', 'remove(']) {
      expect(declared, `§3 — \`TabsSurface\` must declare \`${route}\``).toContain(route)
    }
    // ── THE RETIRED HALF, RECORDED WITH ITS REASON (`D-152`'s shape, `D-9`) ──
    // 'AND `attach()`, `detach()` ARE THE FOURTH AND FIFTH ROUTE' asserted both members PRESENT in §3's block and in the
    // module. **THE TWO MEMBERS ARE DELETED WHOLE** (`docs/L3/store-tabs-record/delivery.md` §4, `D-219`): the surface takes
    // no subscription, so a row asserting the block still carries them would be asserting a module the tree no longer has —
    // and one asserting the MODULE no longer has them would be a row about an absence rather than about the block this file
    // exists to pin. **So the claim moves to the module, where it can fail**: the surface's own bytes declare neither member,
    // read over COMMENT-ELIDED code with the routes that DO stand as the positive control. **The page has CAUGHT UP, and the
    // two `[]`s above are the witness**: `signatures.md` rev 9 dropped both lines and the `onChanged` option, the edit
    // `docs/L3/store-tabs-record/delivery.md` §7 (`TD-5`) owed this page — so the module half is the only half left to pin,
    // because a name-set row over a page that no longer spells a member would be a row about an absence (`D-3`: this file may
    // not edit that page).
    const surfaceSource = readFileSync(at('../../../src/main/tabs-surface/index.ts'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .filter((line) => !/^\s*\/\//.test(line))
      .join('\n')
    expect(surfaceSource.includes('attach('), 'the module declares no `attach`: the construction took the one registration').toBe(false)
    expect(surfaceSource.includes('detach('), 'and no `detach`: there is nothing this surface could withdraw').toBe(false)
    expect(surfaceSource.includes('onChanged'), 'and no `onChanged` option: the push is the delivery\'s, not an option\'s').toBe(false)
    expect(surfaceSource.includes('delivery'), 'the positive control: the option it DOES carry is the crossing\'s delivery, and the scan finds a name that stands').toBe(true)
    expect(tabsSurface.createTabsSurface, '§3 — the one construction of the record').toBeTypeOf('function')
  })

  it('C-6 — §4 keeps NO block: the bridge member is cited, which is the only alternative D-45 allows beside being checked', () => {
    const block = blockOf(DOC, '## 4. The bridge member')
    expect(block, '§4 — a block here would need its own checking arm; the citation is arm (i) and this row is the witness').toBe('')
    expect(DOC, '§4 — the citation names the route count the source declares').toContain('**four**')
  })

  it("C-7 — `signatures.md` transcribes `design.md`'s CURRENT rev, so the block cannot lag the design it belongs to", () => {
    const designRev = revOf(DESIGN, /\*\*Rev:\*\* (\d+)/)
    const transcribed = revOf(DOC, /transcribing `design\.md` rev (\d+)/)
    expect(designRev, 'design.md carries a `Rev:` marker').not.toBeNull()
    expect(transcribed, 'signatures.md names the design rev it transcribes').not.toBeNull()
    expect(transcribed, 'a stale rev means the block was not regenerated when the design moved').toBe(designRev)
  })

  it('C-8 — SYNTHETIC CONTROL: the same comparator reds on a divergence in either direction, so C-1…C-5 can bite', () => {
    expect(divergence(['A', 'B'], ['A', 'B']), 'the control passes on agreement').toEqual([])
    expect(divergence(['A', 'B'], ['A', 'C']), 'both directions are reported, so neither side can be the silent one').toEqual([
      'B (declared, not exported)',
      'C (exported, not declared)',
    ])
    expect(divergence(['A'], ['A', 'B']), 'a name exported and not declared is reported').toEqual(['B (exported, not declared)'])
    // AND THE PARSE ITSELF IS DRIVEN, so a block the parser stopped understanding reds rather than reading as agreement:
    // an empty declared set would compare equal to nothing only where the module exports nothing, and the modules here
    // export ten, one and three values respectively.
    expect(declaredValues('export const ONLY_ONE = 1')).toEqual(['ONLY_ONE'])
    expect(declaredTypes('export interface OnlyOne {}\nexport type AlsoOne = string')).toEqual(['AlsoOne', 'OnlyOne'])
    expect(declaredValues('// a comment naming `export const NOPE` is not a declaration')).toEqual([])
  })
})
