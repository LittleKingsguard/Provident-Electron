// tests/unit/bundle-boot-seam/emission.test.ts — THE L3 UNIT BATTERY for E-1, the landing site
// `package.json` at the ONLY GRAIN IT ADMITS: the name of each emission and the text of the arm that
// produces it. The structure and the guardrails are `docs/L3/bundle-boot-seam/design.md` §2/§4 and the
// declared names are `signatures.md` §3.
//
// ONE GRAIN BELOW L2's, AND THAT IS THE POINT (examiner.md §2): `tests/integration/bundle-boot-seam/`
// rows A-1..A-5 ask whether the arrangement holds *as a whole* — the artifact, its module system, the
// package's derivation, the preload, the harness's name. Each row here asks one question of one
// symbol: which module system the `main` field's NAME selects; which single arm of `build` emits that
// path and in what format; whether `build:watch` carries the same decision; whether the preload arm is
// still the declared text and its artifact still CJS; whether the four arms this unit may not touch
// are still the declared text; and whether the emission set is exactly five artifacts. No row spawns
// Electron, opens a transport or calls a tool, and no row re-asserts an L1 expectation (L1 §6, D-27).
//
// RED-FIRST, AND IT IS THE EVIDENCE (D-14, examiner.md §3): authored before the arrangement lands. At
// this head U-1, U-2, U-3 and U-6 answer red — the `main` field names `dist/main/main.cjs`, the
// `build` and `build:watch` arms emit it `--format=cjs`, and `dist/main/` carries the retired name —
// while U-4 and U-5 answer green and must STAY green: they are the guardrail that no L4 invention
// reaches the preload or the two sibling bundles (D-18, ASM-L2-5, ASM-L2-6). No row is skipped,
// conditionally disabled or softened to reach a colour.
//
// THE BUILD IS CO-OWNED with L1's B-1 and L2's A-1, each of which builds in its own `beforeAll`: this
// file therefore builds ONLY when the artifact is absent, and every read of a built artifact is
// retried inside a bound, so a concurrent `npm run clean` cannot turn a row red for a moment's absence.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { beforeAll, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

interface Manifest {
  main: string
  type?: string
  scripts: Record<string, string>
}
const manifest = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as Manifest

/** The one field that names a boot artifact (`signatures.md` §3). */
const mainEntry = join(repoRoot, manifest.main)
const DIST_MAIN = join(repoRoot, 'dist', 'main')
const DIST_RENDERER = join(repoRoot, 'dist', 'renderer')

/** THE DECLARED ARRANGEMENT, as this battery's input and never as its conclusion: the artifact's name
 *  carries its module system, and main is ESM (ASM-L2-3, `interface.md` §1). */
const DECLARED_MODULE_SYSTEM = 'esm'

/** THE ARMS THIS UNIT MAY NOT MOVE (`design.md` §4 `G-4`), pinned as the declared text: the siblings
 *  and the renderer are other rows' entry points and stay byte-identical (L1 §8, ASM-L2-6), the
 *  preload stays CJS (ASM-L2-5), and `clean` is what retires the old name rather than leaving it
 *  behind (persistence.md §1). */
const DECLARED_ARMS = {
  clean: 'npm run clean',
  preload: 'esbuild src/main/preload.ts --bundle --platform=node --format=cjs --external:electron --outfile=dist/main/preload.cjs',
  standalone: 'esbuild src/main/standalone.ts --bundle --platform=node --format=esm --outfile=dist/main/standalone.mjs',
  batteryHost: 'esbuild src/main/battery-host.ts --bundle --platform=node --format=esm --outfile=dist/main/battery-host.mjs',
  renderer: 'esbuild src/renderer/renderer.ts --bundle --platform=browser --format=esm --outdir=dist/renderer',
  rendererHtml: 'cp src/renderer/index.html dist/renderer/index.html',
} as const

/** The retired artifact — the one this unit replaces and never re-emits (`design.md` §2). */
const RETIRED = join(DIST_MAIN, 'main.cjs')

const BUILD_MS = 600_000
const READ_MS = 120_000

let buildFailure: string | null = null

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/** The loader's own module system for a path: extension first, then the package's `type`. This is how
 *  Node and Electron decide, and it is why the emitted NAME is load-bearing (ASM-L2-3, P-7). */
function loaderModuleSystem(file: string): 'esm' | 'cjs' {
  const ext = extname(file)
  if (ext === '.mjs') return 'esm'
  if (ext === '.cjs') return 'cjs'
  return manifest.type === 'module' ? 'esm' : 'cjs'
}

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
  throw new Error(`${label}: the build produced no artifact at ${file} — ${problem} after ${READ_MS} ms`)
}

/** One `scripts` key's arms, in the declared order, trimmed (`design.md` §2). */
const armsOf = (key: string): string[] =>
  (manifest.scripts[key] ?? '').split('&&').map((arm) => arm.trim()).filter((arm) => arm !== '')

/** The one value a `--flag=value` or `--flag value` arm carries, or `undefined`. */
function flagOf(arm: string, name: string): string | undefined {
  const found = new RegExp(`--${name}[= ]([^\\s]+)`).exec(arm)
  return found === null ? undefined : found[1]
}

/** A built artifact parses under the loader's own reading of its name (`node --check`, no execution). */
function parses(file: string, label: string): void {
  expect(() => execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' }), `${label} does not parse as ${loaderModuleSystem(file)}`).not.toThrow()
}

beforeAll(async () => {
  // Read-only when the tree already carries the artifacts; a clean checkout builds them exactly the
  // way L1's B-1 does, so no second build races the first unnecessarily.
  if (existsSync(mainEntry) && statSync(mainEntry).size > 0) return
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  }
}, BUILD_MS)

describe('bundle-boot-seam · package.json, E-1 — the emitted name decides the module system', () => {
  it('U-1 · the `main` field names an artifact the loader reads as ESM: the name carries the module system (design.md §2, §4 `G-5`; signatures.md §3; ASM-L2-3)', () => {
    // The field's own path is what a container resolves, so the extension is the decision and not a
    // style: a `.cjs` name makes the loader read ESM bytes as CommonJS and fail at parse (P-7).
    expect(extname(manifest.main), `the \`main\` field names ${manifest.main}`).toBe('.mjs')
    expect(
      loaderModuleSystem(mainEntry),
      `the loader reads ${extname(mainEntry)} as ${loaderModuleSystem(mainEntry)}; the arrangement requires ${DECLARED_MODULE_SYSTEM} (interface.md §1)`,
    ).toBe(DECLARED_MODULE_SYSTEM)
  })

  it('U-2 · exactly ONE `build` arm emits the entry, and it is the ESM arm on `node` with `electron` external (design.md §2; signatures.md §3; E-1)', () => {
    expect(buildFailure).toBeNull()
    const declared = manifest.main.replace(/^\.\//, '')
    const mainArms = armsOf('build').filter((arm) => arm.includes('src/main/main.ts'))
    expect(mainArms, 'the entry has one emission arm, never two').toHaveLength(1)
    const arm = mainArms[0] as string
    expect(flagOf(arm, 'format'), `the entry's arm carries --format=${String(flagOf(arm, 'format'))}, not the declared ESM`).toBe('esm')
    expect(flagOf(arm, 'platform'), 'the entry is built for node, exactly as before the arrangement').toBe('node')
    expect(arm, '`electron` stays external: the container supplies it').toMatch(/--external[=:]electron\b/)
    expect(flagOf(arm, 'outfile'), 'the arm emits the path the `main` field names, not merely the same basename in another directory').toBe(declared)
    // And the retired name is emitted by no arm at all: replacement, never a second artifact beside it.
    expect(armsOf('build').filter((other) => other.includes('main.cjs')), 'an arm still emits the retired name').toEqual([])
  })

  it('U-3 · `build:watch` carries the same format and outfile as `build`: one decision, two keys (design.md §2, §4 `G-3`; persistence.md §2)', () => {
    const buildArm = armsOf('build').find((arm) => arm.includes('src/main/main.ts')) as string
    // The watch key is one arm joined by `&`, so its three emissions are split on that separator.
    const watchArms = (manifest.scripts['build:watch'] ?? '').split(/\s&\s/).map((arm) => arm.trim())
    const watchArm = watchArms.find((arm) => arm.includes('src/main/main.ts'))
    expect(watchArm, 'the watch key declares no emission of the entry at all').toBeDefined()
    expect(flagOf(watchArm as string, 'format'), 'a watch leg rebuilding another format leaves a tree the container cannot boot (interface.md §5 E-1)').toBe(
      flagOf(buildArm, 'format'),
    )
    expect(flagOf(watchArm as string, 'outfile'), 'a watch leg rebuilding the retired name leaves the field naming nothing it emits').toBe(
      flagOf(buildArm, 'outfile'),
    )
    expect(manifest.scripts['build:watch'] ?? '', 'the retired name stands nowhere in the watch key').not.toMatch(/main\.cjs\b/)
  })

  it('U-4 · the preload arm is the declared text and its artifact is still CommonJS (design.md §4 `G-2`; ASM-L2-5; L1 §1)', async () => {
    expect(armsOf('build'), 'the preload emission moved: it is not this unit’s to change').toContain(DECLARED_ARMS.preload)
    const preload = await artifact(join(DIST_MAIN, 'preload.cjs'), 'U-4')
    expect(loaderModuleSystem(preload), 'the preload artifact is not CJS by its own name').toBe('cjs')
    parses(preload, 'the preload artifact')
    const bytes = readFileSync(preload, 'utf8')
    expect(bytes, 'the preload artifact is not the context bridge’s preload').toMatch(/contextBridge|exposeInMainWorld/)
    expect(bytes, 'a `.cjs` artifact carrying `import` syntax is ESM under a CJS name (P-7)').not.toMatch(/^\s*import\s/m)
  })

  it('U-5 · the two siblings, the renderer and `clean` are the declared text, and those artifacts still parse (design.md §4 `G-4`; ASM-L2-6; L1 §6 B-7)', async () => {
    const build = armsOf('build')
    for (const arm of [DECLARED_ARMS.clean, DECLARED_ARMS.standalone, DECLARED_ARMS.batteryHost, DECLARED_ARMS.renderer, DECLARED_ARMS.rendererHtml]) {
      expect(build, `an arm this unit may not touch moved: ${arm}`).toContain(arm)
    }
    for (const name of ['standalone.mjs', 'battery-host.mjs']) {
      const sibling = await artifact(join(DIST_MAIN, name), 'U-5')
      expect(loaderModuleSystem(sibling), `${name} is not ESM by its own name`).toBe('esm')
      parses(sibling, name)
    }
    parses(await artifact(join(DIST_RENDERER, 'renderer.js'), 'U-5'), 'the renderer bundle')
    expect(statSync(await artifact(join(DIST_RENDERER, 'index.html'), 'U-5')).size, 'the renderer HTML entry the window loads is empty').toBeGreaterThan(0)
  })

  it('U-6 · the emission set is exactly the five declared artifacts and the retired name is gone (design.md §4 `G-6`; persistence.md §1)', async () => {
    await artifact(mainEntry, 'U-6')
    expect(
      readdirSync(DIST_MAIN).sort(),
      'dist/main carries an artifact the arrangement does not declare, or still carries the retired name',
    ).toEqual(['battery-host.mjs', 'preload.cjs', 'standalone.mjs', basename(manifest.main)].sort())
    expect(readdirSync(DIST_RENDERER).sort(), 'dist/renderer carries an artifact the arrangement does not declare').toEqual(['index.html', 'renderer.js'])
    expect(existsSync(RETIRED), 'the retired artifact survives a build that no longer emits it').toBe(false)
  })
})
