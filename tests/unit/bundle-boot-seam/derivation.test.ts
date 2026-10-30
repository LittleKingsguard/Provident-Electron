// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/bundle-boot-seam/derivation.test.ts — THE L3 UNIT BATTERY for E-2, the entry's own
// directory derivation, at the ONLY GRAIN IT ADMITS: one binding, one expression, one value. The
// structure is `docs/L3/bundle-boot-seam/design.md` §3, the guardrails are §4 `G-1`/`G-2`, and the
// declared text is `signatures.md` §4.
//
// WHY THIS FILE READS `src/main/main.ts` AS A SOURCE, STATED RATHER THAN PASSED OVER (examiner.md §2):
// the entry imports `electron` at module scope, so no node-suite row can construct it, and no row here
// claims a boot — L1's B-2..B-6 own the booted process (`docs/L1/bundle-boot-seam.md` §6, D-27). What
// a unit row can pin exactly is the DECLARATION: which names the entry binds, which expression stands
// where the CJS global stood, how many places consume it, and — the live half — what that expression
// evaluates to against the emitted artifact, which must be the directory `:455`'s preload join and
// `:462`'s renderer join both require unchanged (design.md §3; L1 §8 E-2).
//
// RED-FIRST, AND IT IS THE EVIDENCE (D-14, examiner.md §3): at this head `node:path` binds `join`
// alone, `node:url` is not imported at all, the module-scope binding is `const here = __dirname`, and
// the emitted artifact carries that free CJS global — so U-7 and U-8 answer red on exactly the hunk
// E-2 lands. U-8's two joins answer green today and must stay green: they are the reason `:455` and
// `:462` need no edit, and a row that reddens them is an outfile moved out from under the entry.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const ENTRY_SOURCE = join(repoRoot, 'src', 'main', 'main.ts')

interface Manifest {
  main: string
  scripts: Record<string, string>
}
const manifest = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as Manifest

/** THE DECLARED DERIVATION, verbatim — the one expression E-2 lands where `__dirname` stood
 *  (`design.md` §3, `signatures.md` §4; L2 `interface.md` §4). */
const DECLARED_DERIVATION_TEXT = 'const here = dirname(fileURLToPath(import.meta.url))'
const DECLARED_DERIVATION = /const\s+here\s*=\s*dirname\(\s*fileURLToPath\(\s*import\.meta\.url\s*\)\s*\)/

/** The named bindings of one module's import, read off the source: `import { a, b as c } from 'm'`
 *  answers `['a', 'b']` — the local alias is what the file then spells, so it is what a write would
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
  if (new RegExp(`import\\s+(?:type\\s+)?\\*\\s+as\\s+[A-Za-z_$][\\w$]*\\s+from\\s*['"]${escaped}['"]`).test(source)) answer.push('<namespace>')
  const plain = new RegExp(`import\\s+([A-Za-z_$][\\w$]*)\\s+from\\s*['"]${escaped}['"]`).exec(source)
  if (plain !== null) answer.push(plain[1])
  return answer.sort()
}

/** The one value an arm's `--flag=value` carries, or `undefined` (`design.md` §2). */
function flagOf(arm: string, name: string): string | undefined {
  const found = new RegExp(`--${name}[= ]([^\\s]+)`).exec(arm)
  return found === null ? undefined : found[1]
}

/** The `build` arms, so a row reads the emitted target from the arm rather than repeating a path. */
const buildArms = (manifest.scripts.build ?? '').split('&&').map((arm) => arm.trim()).filter((arm) => arm !== '')
const armOf = (needle: string): string => {
  const found = buildArms.find((arm) => arm.includes(needle))
  if (found === undefined) throw new Error(`no \`build\` arm mentions ${needle}: the emission set moved (design.md §2)`)
  return found
}

const READ_MS = 120_000
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/** A built artifact, once it exists and carries bytes; never a silent absence (persistence.md §1). */
async function artifact(file: string, label: string): Promise<string> {
  const started = Date.now()
  let problem = 'it does not exist'
  while (Date.now() - started < READ_MS) {
    if (existsSync(file)) {
      if (statSync(file).size > 0) return file
      problem = 'it exists and is empty'
    }
    await sleep(100)
  }
  throw new Error(`${label}: no artifact at ${file} — ${problem} after ${READ_MS} ms`)
}

describe('bundle-boot-seam · E-2 — the entry derives its own directory from the module URL, once', () => {
  it('U-7 · `src/main/main.ts` binds the three names the derivation needs, spells it once, and no CJS global stands (design.md §3, §4 `G-1`; signatures.md §4; L1 §8 E-2)', () => {
    const source = readFileSync(ENTRY_SOURCE, 'utf8')

    // The derivation's own import set: `dirname` and `join` from `node:path`, `fileURLToPath` from
    // `node:url`. Nothing else is admitted, because nothing else is needed to name a directory.
    expect(bindingsOf(source, 'node:path'), '`node:path` must bind exactly the two helpers the derivation and its consumers use').toEqual(['dirname', 'join'])
    expect(bindingsOf(source, 'node:url'), '`fileURLToPath` is the conversion the derivation is spelled through').toEqual(['fileURLToPath'])

    // The expression, verbatim, declared once: a literal path, a `process.cwd()` or a second route to
    // the built directory is the invention this row exists to refuse (design.md §3 `ASM-L3-2`).
    expect(source, `the module-scope derivation is not \`${DECLARED_DERIVATION_TEXT}\``).toMatch(DECLARED_DERIVATION)
    expect((source.match(/const\s+here\s*=/g) ?? []), '`here` is bound once, at module scope, and never reassigned').toHaveLength(1)

    // The CJS module-scope globals ESM does not supply: absent from the entry's own text (P-2, P-3).
    expect(/\b__dirname\b/.test(source), '`__dirname` stands in the entry: it throws at module evaluation under ESM (P-3)').toBe(false)
    expect(/\b__filename\b/.test(source), '`__filename` stands in the entry: ESM supplies no such binding (P-2)').toBe(false)

    // And `here` is consumed by the two joins and no more, so the arrangement cannot have moved a boot
    // step on the way (L1 §5, D-18): preload beside the entry, the HTML entry one directory over.
    expect((source.match(/\bjoin\(\s*here\s*,/g) ?? []), '`here` is consumed by exactly the two joins `:455` and `:462`').toHaveLength(2)
  })

  it('U-8 · the emitted entry derives the bundle’s own directory, and that directory is where the preload and the HTML entry stand (design.md §3, §4 `G-2`; L1 §8 E-2)', async () => {
    const entry = await artifact(join(repoRoot, manifest.main), 'U-8')

    // The declared expression, evaluated against the artifact's own URL — the value the entry computes
    // at module scope once the arrangement lands. It carries no trailing separator, so it is the exact
    // form `__dirname` held and the two joins below compose identically (design.md §3 `ASM-L3-2`).
    const here = dirname(fileURLToPath(pathToFileURL(entry)))
    expect(here.endsWith('/'), 'the derivation answers a directory spelling the joins must renormalise').toBe(false)
    expect(here, 'the derivation does not land inside the built tree').toBe(dirname(entry))

    // Limb one: `:455`'s join needs no edit, because the preload is emitted beside the entry.
    const preloadOutfile = flagOf(armOf('src/main/preload.ts'), 'outfile')
    expect(preloadOutfile, 'the preload arm declares no outfile').toBeDefined()
    const preloadTarget = join(repoRoot, preloadOutfile as string)
    expect(join(here, 'preload.cjs'), 'the derivation’s preload join lands on another directory than the preload emission').toBe(preloadTarget)
    await artifact(preloadTarget, 'U-8 preload join')

    // Limb two: `:462`'s join needs no edit, because the renderer tree sits one directory over.
    const htmlArm = armOf('src/renderer/index.html')
    const htmlTarget = join(repoRoot, htmlArm.split(/\s+/).slice(-1)[0] as string)
    expect(join(here, '..', 'renderer', 'index.html'), 'the derivation’s renderer join lands on another directory than the HTML emission').toBe(htmlTarget)
    await artifact(htmlTarget, 'U-8 renderer join')

    // Limb three: the emitted bytes carry the derivation's live source and no CJS global, so `here` in
    // the artifact is the module URL and never a free variable (the CJS arm's failure, P-1/P-3).
    const bytes = readFileSync(entry, 'utf8')
    expect(bytes, 'the emitted entry references a CJS-only module-scope global').not.toMatch(/\b__dirname\b|\b__filename\b/)
    expect(bytes, 'the emitted entry carries no `import.meta.url`, so the derivation has no live source in the bundle').toMatch(/import\.meta\.url/)
  })
})
