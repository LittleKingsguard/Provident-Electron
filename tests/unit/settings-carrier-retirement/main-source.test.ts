// tests/unit/settings-carrier-retirement/main-source.test.ts — THE L3 UNIT BATTERY for E-1,
// `src/main/main.ts` AT THE ONLY GRAIN IT ADMITS: a SOURCE READ, plus one live limb for the one rule
// this design adds that a row can actually drive.
//
// THE CONTRACT (L3): docs/L3/settings-carrier-retirement/design.md §4 (the site-by-site edit: `:6`/`:7`
// the import pair, `:118-123` the TIER 1 block and `settingsPath`, `:173-192` the Q-5 migration's
// removed probe, and the three re-points with `rowsWith`'s replace-or-append rule) and §5 (the
// guardrail: "`main.ts` ends with exactly one `node:fs` name, `rmSync`") and §6 (`ASM-6`); signatures.md
// §6 (the locals and the two channel answers, `import { join } from 'node:path'` +
// `import { rmSync } from 'node:fs'`, and `rowsWith` as "this file's one new local"); read on
// docs/L1/settings-carrier-retirement.md §3 (the retirement's exact surface) and §9 E-1, and on
// docs/L2/settings-carrier-retirement/interface.md §5 and behaviour.md §8 `RET-1`/`RET-2`.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (examiner.md §3, D-1): at this head `main.ts`
// imports nine `node:fs` names and `dirname`, holds `existsSync`, and declares no `rowsWith`, so
// `MS-1`…`MS-4` fail on exactly the census they pin. Nothing is skipped and nothing is softened.
//
// WHY THIS FILE IS ALMOST ENTIRELY A SOURCE READ, STATED PLAINLY AND NOT PASSED OVER: `src/main/main.ts`
// imports `electron` at module scope, so NO node-suite row can construct it — there is no live form of
// this edit (interface.md §8; behaviour.md §4/§5's stated limits). The absence rows an implementer
// could otherwise satisfy hollowly are already owned elsewhere: `RET-1`/`RET-2` in
// `tests/integration/settings-carrier-retirement/retirement.test.ts` own the byte scans for the
// retired carrier's spelling, its path and its write verbs, and L1's e2e `S-1`/`S-10`/`S-12` own the
// booted app. So this file pins ONLY what design.md §4 adds and no L2 row reaches: the `node:fs` and
// `node:path` binding sets, the retired legacy-registry probe, `rowsWith`'s declaration, and — the one
// live limb — the duplicate-`name` refusal that makes the replace rule mandatory rather than stylistic.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { createOperatorSettings, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'

const REPO = new URL('../../../', import.meta.url)
const MAIN = 'src/main/main.ts'

/** The named bindings of one module's import, read off the source: `import { a, b as c } from 'm'`
 *  answers `['a', 'b']` — the local alias is what the file then uses, so it is what a write verb would
 *  hide behind. A side-effect import answers `[]` and a default import is named `default`. */
function bindingsOf(source: string, specifier: string): string[] {
  const escaped = specifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const named = new RegExp(`import\\s*(?:type\\s*)?\\{([^}]*)\\}\\s*from\\s*['"]${escaped}['"]`).exec(source)
  const answer: string[] = []
  if (named !== null) {
    for (const clause of named[1].split(',')) {
      const name = clause.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim()
      if (name !== '') answer.push(name)
    }
  }
  if (new RegExp(`import\\s+(?:type\\s+)?\\*\\s+as\\s+([A-Za-z_$][\\w$]*)\\s+from\\s*['"]${escaped}['"]`).test(source)) answer.push('<namespace>')
  const plain = new RegExp(`import\\s+([A-Za-z_$][\\w$]*)\\s+from\\s*['"]${escaped}['"]`).exec(source)
  if (plain !== null) answer.push(plain[1])
  return answer.sort()
}

const sourceOfMain = (): string => readFileSync(new URL(MAIN, REPO), 'utf8')

/** Every profile this file creates, so no row leaks a directory into the machine. */
const scratch: string[] = []

afterEach(() => {
  while (scratch.length > 0) rmSync(scratch.pop() as string, { recursive: true, force: true })
})

const profile = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'settings-carrier-unit-main-'))
  scratch.push(dir)
  return dir
}

describe('settings-carrier-retirement · src/main/main.ts, E-1, read as a source (plus the one live rule)', () => {
  it('MS-1 · the `node:fs` import ends as `rmSync` ALONE: no read verb, no write verb, no stage-and-rename machinery survives in this file (design.md §4 `:6`/`:7`, §5; signatures.md §6; L1 §3 `:7`)', () => {
    const main = sourceOfMain()
    expect(bindingsOf(main, 'node:fs'), 'the whole `node:fs` surface this file keeps is `rmSync` — the Q-5 legacy removal, and nothing else (design.md §5; signatures.md §6)').toEqual(['rmSync'])

    // The binding set above is the census; these are the spellings a hand could leave behind in a
    // bare call inside a helper, so they are asserted by NAME, and `rmSync` is the one that stays.
    for (const verb of ['writeFileSync', 'renameSync', 'fsyncSync', 'openSync', 'closeSync', 'mkdirSync', 'readFileSync', 'appendFileSync', 'copyFileSync', 'unlinkSync', 'rmdirSync']) {
      expect(new RegExp(`\\b${verb}\\s*\\(`).test(main), `no \`${verb}\` call stands in src/main/main.ts: the retired stage-and-rename writer, and the boot read that carried it, have no successor here (L1 §3 colon 7; persistence.md §5)`).toBe(false)
    }
    expect(/\brmSync\s*\(/.test(main), 'and the Q-5 legacy-registry removal keeps its `rmSync` (L1 §3)').toBe(true)
  })

  it('MS-2 · `dirname` is gone with the writer: `node:path` binds `join` and nothing else, and the name stands nowhere in the file (design.md §4 `:6`, §5; signatures.md §6; L1 §3 `:7`)', () => {
    const main = sourceOfMain()
    expect(bindingsOf(main, 'node:path'), 'the file composes paths with `join` alone: `dirname` retires with the tmp+rename writer that was its only caller (design.md §4; signatures.md §6)').toEqual(['join'])
    expect(main.includes('dirname'), 'and the name `dirname` stands nowhere in src/main/main.ts — not in the import, not in a comment re-spelling the removed verb (design.md §5)').toBe(false)
  })

  it('MS-3 · the legacy registry’s existence probe is retired with the record’s reader: no `existsSync` stands in the file, while the Q-5 read and its post-boot removal do (design.md §4 `:173-192`, §6 ASM-6; L1 §3/§5)', () => {
    const main = sourceOfMain()

    // THE PROBE DISCRIMINATED NOTHING: `createModuleStore({ path }).list()` answers a missing file as
    // an empty registry with no throw (src/main/module-store.ts `load`), which is `ASM-6`'s reason for
    // retiring the probe rather than keeping one reader that `:7`'s removal row names (design.md §6).
    // This row is the same absence `RET-1` scans for at the L2 layer, pinned here where the design
    // states it.
    expect(main.includes('existsSync'), 'no `existsSync` stands in src/main/main.ts: the record’s reader took it with the writer and the Q-5 probe retires with it (design.md §4, §6 ASM-6)').toBe(false)

    // AND THE MIGRATION ITSELF STANDS: the read, its records and the post-boot removal are unmoved
    // (L1 §3; interface.md §5 "the legacy registry read and its post-boot removal are unmoved").
    expect(main.includes('createModuleStore('), 'the Q-5 legacy read still constructs the module store (L1 §3)').toBe(true)
    expect(main.includes('provident-modules.json'), 'over the legacy registry’s own name (L1 §3; persistence.md §7)').toBe(true)
    expect(/\brmSync\s*\(\s*legacyModulesPath\b/.test(main), 'and its post-boot removal still removes that path (L1 §3)').toBe(true)
  })

  it('MS-4 · `rowsWith` is this file’s one new local, carrying the replace-or-append rule — declared where a row can read it, with its one live consequence driven at the declared verb (design.md §4; signatures.md §6; interface.md §2, §6)', () => {
    const main = sourceOfMain()

    // THE LIMIT, IN THIS ROW'S OWN WORDS: `src/main/main.ts` imports `electron` at module scope, so
    // neither `rowsWith`, nor `modulePayloadWith`, nor the three module members that thread them can be
    // CONSTRUCTED by a node-suite row — the composition is L1's e2e `S-10`/`S-12` on a booted app. What
    // is readable here is the declaration, its one caller, and the re-pointed verbs; the rule itself is
    // pinned live below, at the verb that makes it mandatory.
    expect(/function\s+rowsWith\s*\(/.test(main), '`rowsWith` is declared in src/main/main.ts — this file’s ONE new local (signatures.md §6)').toBe(true)
    expect(/rowsWith\s*\(\s*[A-Za-z_$]/.test(main), 'and it is called, not merely declared: `modulePayloadWith` is its one caller for a single record (design.md §4; signatures.md §6)').toBe(true)
    expect(main.includes('modulePayloadWith'), '`modulePayloadWith` keeps its name and answer while its source of rows moves (interface.md §5)').toBe(true)
    expect(main.includes('settingsSurface.state('), 'the re-pointed read stands: the rows come from the surface’s one `state()` (design.md §4 `:308-333`; interface.md §5)').toBe(true)
    expect(main.includes('settingsSurface.commit('), 'and the re-pointed write is one `commit` of the whole composed list (design.md §4 `:341-371`; interface.md §5)').toBe(true)
    expect(main.includes('commitSettingsWrite'), 'with the tmp+rename+fsync writer gone — no shim, no re-export, no dual write (L1 §3; behaviour.md §8 RET-1)').toBe(false)

    // THE RULE, DRIVEN WHERE IT IS REACHABLE: `rowsWith` REPLACES the row named `key` rather than
    // appending a second one, because `writeAppState` refuses two rows naming one name as a value — so
    // an append would refuse the whole commit and the Q-5 migration would lose the records it had read
    // (design.md §4; interface.md §6 ASM-L2-6). That refusal is the rule's live half, and it is driven
    // at the instance's own verb over a real profile, not asserted about a body no row can execute.
    const settings = createOperatorSettings({ userDataDir: profile() }) as unknown as { writeAppState(rows: unknown): OperatorSettingsReceipt }
    const refused = settings.writeAppState([{ name: 'file.modules.m', value: { name: 'm', version: '1' } }, { name: 'file.modules.m', value: { name: 'm', version: '2' } }])
    if (refused.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(refused)}`)
    expect(refused.reason, 'an appended duplicate is refused as a VALUE, which is why the composition replaces by name instead of pushing (interface.md §6 ASM-L2-6; design.md §4)').toBe('ValueRefusedAtBoundary')
  })
})
