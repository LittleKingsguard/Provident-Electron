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

  it("C-2 — `src/main/tabs-record/index.ts`: the block's names equal the module's, on both sides of the type/value line", () => {
    const block = blockOf(DOC, '## 2. `src/main/tabs-record/index.ts`')
    expect(block.length, '§2 — the block must exist').toBeGreaterThan(0)
    expect(divergence(declaredValues(block), Object.keys(tabsRecord).sort())).toEqual([])
    expect(divergence(declaredTypes(block), sourceTypes('../../../src/main/tabs-record/index.ts'))).toEqual([])
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

  it('C-4 — the batch returns FIVE declarations, which is the count §2\'s prose states', () => {
    const declarations = tabsRecord.tabsConstraintDeclarations(() => null)
    expect(declarations.length, '§2 — the prose says five').toBe(5)
    expect(declarations.map((declaration) => declaration.id)).toEqual([
      'tabs-must-stand',
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
    // THE TWO EXPORTED IDS ARE THE TWO THE BATCH USES, in the order §2's gloss names them.
    expect(declarations[0]?.id).toBe(tabsRecord.TABS_MUST_STAND_ID)
    expect(declarations[1]?.id).toBe(tabsRecord.TABS_CONSTRAINT_ID)
    expect(DOC, '§2\'s gloss states the count, so the sentence and this row measure the same five').toContain('**five**')
  })

  it("C-5 — `src/main/tabs-surface/index.ts`: the block's names equal the module's, and its four routes plus attach/detach", () => {
    const block = blockOf(DOC, '## 3. `src/main/tabs-surface/index.ts`')
    expect(block.length, '§3 — the block must exist').toBeGreaterThan(0)
    expect(divergence(declaredValues(block), Object.keys(tabsSurface).sort())).toEqual([])
    expect(divergence(declaredTypes(block), sourceTypes('../../../src/main/tabs-surface/index.ts'))).toEqual([])
    // THE ROUTE NAMES, read off the module's own declaration: `read`, `commit`, `remove`, `attach`, `detach`. §3's block
    // is the only home of them, so a route added to `TabsSurface` and not to the block reds HERE and not in C-5's set row.
    const declared = block.slice(block.indexOf('export interface TabsSurface'), block.indexOf('export interface TabsSurfaceOptions'))
    for (const route of ['read(', 'commit(', 'remove(', 'attach(', 'detach(']) {
      expect(declared, `§3 — \`TabsSurface\` must declare \`${route}\``).toContain(route)
    }
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
