// tests/integration/bundle-boot-seam/arrangement.test.ts — THE L2 BATTERY for `bundle-boot-seam`:
// the arrangement `docs/L2/bundle-boot-seam/interface.md` §1 declares, driven at the grain of what
// `npm run build` emits and what the two module systems agree on (rows A-1..A-5, `interface.md` §7).
//
// HOW THESE ROWS DIFFER FROM L1's `tests/e2e/bundle-boot-seam/` ROWS, IN ONE BREATH: L1's eight
// scenarios (`docs/L1/bundle-boot-seam.md` §6, B-1..B-8) spawn the built bundle under Electron and
// read what the running process PUBLISHES — its trace, its transports' answers, its profile record —
// so they are green only once a process exists and a handshake completes. These five rows stand one
// layer underneath that: which artifact the `main` field names, which module system the build
// emitted it in, whether the emitted bytes can satisfy the ESM-only package's `import.meta.url`
// derivation at all, that `preload.cjs` is still CommonJS and still evaluates, and that the
// harness's one spawn vector names the same artifact the field names. No row here spawns Electron,
// opens a transport, calls a tool or re-asserts an L1 expectation; the two batteries fail
// independently, which is the point of keeping the grain separate (`examiner.md` §2, D-27).
//
// RED-FIRST, AND THAT IS THE EVIDENCE (`examiner.md` §3, D-14): authored before the arrangement
// lands. At the head this file was filed, A-4 and A-5 answer green and A-1..A-3 answer red on
// `package.json:7,10` naming a CJS artifact and on the bytes esbuild emits for it
// (`dist/main/main.cjs:38479` is `var import_meta = {}`, `:40392` is `var here = __dirname`). No row
// is skipped, conditionally disabled or softened to reach a colour.
//
// THE BUILD IS CO-OWNED WITH L1's B-1, which runs `npm run build` in its own `beforeAll`: this file
// therefore builds ONLY when the artifact is absent, and every read of a built artifact is retried
// inside a bound, so a concurrent `npm run clean` cannot turn a row red for a moment's absence.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { beforeAll, describe, expect, it } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

interface Manifest {
  main: string
  type?: string
  scripts: Record<string, string>
}
const manifest = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as Manifest

/** The `main` field's path, which is the one field that names a boot artifact (`interface.md` §1). */
const mainEntry = join(repoRoot, manifest.main)
const preloadEntry = join(repoRoot, 'dist', 'main', 'preload.cjs')

/** THE DECLARED ARRANGEMENT, as this battery's input and never as its conclusion: main is emitted
 *  as ESM and named by the `main` field (`interface.md` §1, `docs/L1/bundle-boot-seam.md` §3). */
const DECLARED_MODULE_SYSTEM = 'esm'

/** The bound every wait and every build is held to — the harness's, never a loader's. */
const BUILD_MS = 600_000
const READ_MS = 120_000

let buildFailure: string | null = null

/** The loader's own module system for a path: extension first, then the package's `type`. This is
 *  how Node and Electron decide, and it is why the artifact's NAME is load-bearing (P-7). */
function loaderModuleSystem(file: string): 'esm' | 'cjs' {
  const ext = extname(file)
  if (ext === '.mjs') return 'esm'
  if (ext === '.cjs') return 'cjs'
  return manifest.type === 'module' ? 'esm' : 'cjs'
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/** A built artifact's path, once it exists and carries bytes; never a silent absence. */
async function emitted(file: string, label: string): Promise<string> {
  const started = Date.now()
  let lastProblem = 'it does not exist'
  while (Date.now() - started < READ_MS) {
    if (existsSync(file)) {
      const size = statSync(file).size
      if (size > 0) return file
      lastProblem = 'it exists and is empty'
    }
    await sleep(100)
  }
  throw new Error(`${label}: the build produced no artifact at ${file} — ${lastProblem} after ${READ_MS} ms`)
}

const bytesOf = async (file: string, label: string): Promise<string> => readFileSync(await emitted(file, label), 'utf8')

beforeAll(async () => {
  // Read-only when the tree already carries the artifacts; a clean checkout builds them exactly the
  // way L1's B-1 does (same command, same bound), so no second build races the first unnecessarily.
  if (existsSync(mainEntry) && statSync(mainEntry).size > 0) return
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  }
}, BUILD_MS)

describe('bundle-boot-seam — the arrangement `npm run build` emits', () => {
  it('A-1 the build emits the artifact the `main` field names, in the declared format', async () => {
    expect(buildFailure).toBeNull()
    const emittedEntry = await emitted(mainEntry, 'A-1')
    expect(statSync(emittedEntry).size).toBeGreaterThan(0)
    expect(loaderModuleSystem(emittedEntry), `the loader reads ${extname(emittedEntry)} as ${loaderModuleSystem(emittedEntry)}`).toBe(
      DECLARED_MODULE_SYSTEM,
    )
    // The declared emission itself, not just its product: the `build` command's own arm for this
    // outfile must carry the format and the platform the artifact is read back with (E-1).
    const arms = (manifest.scripts.build ?? '').split('&&').map((arm) => arm.trim())
    const emission = arms.find((arm) => arm.includes(`--outfile=${manifest.main}`))
    expect(emission, `no \`build\` arm emits ${manifest.main}`).toBeDefined()
    expect(emission).toMatch(/--format=esm\b/)
    expect(emission).toMatch(/--platform=node\b/)
  }, BUILD_MS)

  it('A-2 the emitted artifact’s own module system matches the format the build emitted', async () => {
    const entry = await emitted(mainEntry, 'A-2')
    const bytes = await bytesOf(mainEntry, 'A-2')
    // It parses under the module system the loader assigns it: a parse error here is the loud,
    // reason-bearing failure the negative-behaviour rows require (`behaviour.md` §4).
    expect(() => execFileSync(process.execPath, ['--check', entry], { stdio: 'pipe' })).not.toThrow()
    // The two emitted facts measured on this head (`interface.md` §2 P-1, P-3): esbuild's CJS
    // placeholder for the module scope ESM supplies natively, and the CJS-only globals ESM lacks.
    expect(bytes, 'a CJS placeholder for `import.meta` survives into the artifact').not.toMatch(/var import_meta = \{\}/)
    expect(bytes, 'the artifact references a CJS-only module-scope global').not.toMatch(/\b__dirname\b|\b__filename\b/)
  }, READ_MS)

  it('A-3 the package’s addon-path derivation is satisfiable in the emitted artifact', async () => {
    const entry = await emitted(mainEntry, 'A-3')
    const bytes = await bytesOf(mainEntry, 'A-3')
    // The artifact reads its own location through `import.meta.url`, which only a real module scope
    // supplies: the package's `createRequire(import.meta.url)` and addon path are its whole prologue
    // (`node_modules/provident-storeroom/index.mjs:94-97`).
    expect(bytes, 'the artifact carries no `import.meta.url` for the package’s derivation to read').toMatch(/import\.meta\.url/)

    // Then the derivation is driven from the artifact's OWN url, the way the inlined package does it:
    // rung two sits beside the entry, rung one is the platform package the package declares.
    const requireFromArtifact = createRequire(pathToFileURL(entry))
    const rungTwo = join(dirname(entry), 'build', 'Release', 'storeroom_js_binding.node')
    const declared = JSON.parse(
      readFileSync(join(repoRoot, 'node_modules', 'provident-storeroom', 'package.json'), 'utf8'),
    ) as { optionalDependencies?: Record<string, string> }
    const loaded: { name: string; addon: { storeCreate?: unknown } }[] = []
    for (const name of Object.keys(declared.optionalDependencies ?? {})) {
      try {
        loaded.push({ name, addon: requireFromArtifact(name) as { storeCreate?: unknown } })
      } catch {
        /* rung one misses for a package this host does not carry: the next declared name is tried */
      }
    }
    const satisfied = existsSync(rungTwo) || loaded.length > 0
    expect(
      satisfied,
      `no addon rung resolves from ${entry}: rung two ${rungTwo} is absent and no platform package the manifest declares loads`,
    ).toBe(true)
    if (loaded.length > 0) expect(typeof loaded[0]!.addon.storeCreate).toBe('function')
  }, READ_MS)

  it('A-4 the preload artifact is still CJS and still loads', async () => {
    const preload = await emitted(preloadEntry, 'A-4')
    expect(loaderModuleSystem(preload)).toBe('cjs')
    expect(() => execFileSync(process.execPath, ['--check', preload], { stdio: 'pipe' })).not.toThrow()
    // It evaluates as CommonJS and reaches Electron's own API — a parse error would mean the loader
    // read ESM syntax out of a `.cjs` name, which is the failure P-7 measured and P-8 rules out.
    const failure = await import(pathToFileURL(preload).href).then(
      () => null,
      (error: unknown) => error,
    )
    expect(failure, 'the preload artifact loaded with no Electron API in scope, so nothing evaluated').not.toBeNull()
    expect(failure, 'the preload artifact failed at parse, so it is not the CJS artifact it claims to be').not.toBeInstanceOf(
      SyntaxError,
    )
    expect(String((failure as Error).message)).toMatch(/exposeInMainWorld|contextBridge/i)
    // The entry still names it beside itself: the preload join survives the arrangement (`interface.md` §4).
    expect(await bytesOf(mainEntry, 'A-4')).toMatch(/\bpreload\.cjs\b/)
  }, READ_MS)

  it('A-5 the harness’s spawn vector names the artifact the `main` field names', () => {
    // The one name the arrangement moves lives in two harness constants, because the spawn vector
    // hands Electron the artifact by PATH (`scripts/electron-spawn.mjs:81`) — E-5's landing site,
    // and the reason this row exists rather than a note in a document (`interface.md` §7).
    const spawnSource = readFileSync(join(repoRoot, 'scripts', 'electron-spawn.mjs'), 'utf8')
    const uiSource = readFileSync(join(repoRoot, 'scripts', 'electron-ui.mjs'), 'utf8')
    const spawnTarget = /export const mainCjs = join\(([^)]*)\)/.exec(spawnSource)
    const uiTarget = /const mainBundle = join\(([^)]*)\)/.exec(uiSource)
    expect(spawnTarget, 'the spawn helper declares no main artifact constant').not.toBeNull()
    expect(uiTarget, 'the ui leg declares no main artifact constant').not.toBeNull()
    const spelled = (source: string, match: RegExpExecArray): string =>
      [...match[1]!.matchAll(/'([^']*)'/g)].map((part) => part[1]).join('/').replace(/^\/+/, '')
    expect(spelled(spawnSource, spawnTarget!), 'the spawn vector names another artifact than `main`').toBe(
      manifest.main.replace(/^\.\//, ''),
    )
    expect(spelled(uiSource, uiTarget!), 'the ui leg digests another artifact than `main`').toBe(
      manifest.main.replace(/^\.\//, ''),
    )
  })
})
