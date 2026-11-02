// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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

/** The ARTIFACT-ABSENCE class and nothing else: a read that failed because the file was not there at that
 *  instant. Naming the artifact is part of the test, so a missing `node`, a missing directory or any other
 *  ENOENT is not mistaken for the one transient this file re-acquires over. */
const ABSENCE = /ENOENT|MODULE_NOT_FOUND|Cannot find module/
function artifactGone(error: unknown, file: string): boolean {
  const e = error as NodeJS.ErrnoException & { stderr?: unknown }
  const text = `${String(e?.code ?? '')} ${String(e?.message ?? '')} ${String(e?.stderr ?? '')}`
  return ABSENCE.test(text) && text.includes(file)
}

/** **`node --check`, THROWING RAW, and that is load-bearing.** The absence a concurrent `npm run clean`
 *  raises is the one thing `withArtifact` must be able to SEE, and `expect(() => …).not.toThrow()` would wrap
 *  it in an `AssertionError` whose message truncates the artifact's path — so the retry would never fire.
 *  Measured: with the assertion wrapped, the fix did nothing and A-4 still red three of four runs; with the
 *  raw call, none of four. A parse error is still a red row: it propagates with node's own reason attached,
 *  which is a better failure message than "expected [Function] to not throw". */
const checkParses = (file: string): void => {
  execFileSync(process.execPath, ['--check', file], { stdio: 'pipe', timeout: READ_MS })
}

/** **A BUILT ARTIFACT, READ AND USED INSIDE ONE ACQUISITION** — the fix for this battery's measured flake.
 *
 *  THE RACE, MEASURED 2026-11-02. `tests/e2e/bundle-boot-seam/boot-contract.test.ts`'s `beforeAll` runs
 *  `npm run build`, whose FIRST arm is `npm run clean` (`rmSync('dist')`). In a full `npm test` run the
 *  artifacts under `dist/main/` are therefore **absent for ~54 ms** and rewritten over **240-500 ms**
 *  (polled at 2 ms across a whole run; three measured builds took 272 ms, 272 ms and 499 ms) **while this
 *  battery reads the same files from another worker**. A snapshot test — "it exists and carries bytes" — is
 *  true one millisecond before that clean and false one millisecond after, and A-4 read the file twice more
 *  after taking the snapshot:
 *
 *      emitted(preload.cjs)  →  `--check` (10-13 ms measured)  →  `import()` (0.3-1.2 ms)  →  bytesOf(main)
 *
 *  **REPRODUCED, not inferred**: driving a concurrent `npm run build` against this file and sweeping the
 *  build's offset, A-4 reds **2 of 4 runs** with the build landing at +250 ms, on
 *  `MODULE_NOT_FOUND: Cannot find module …/dist/main/preload.cjs` thrown by the `--check` at A-4's third
 *  line — the artifact `emitted()` had just handed the row was gone by the time the row used it.
 *  (`execFileSync`'s `--check` under CONTENTION is NOT a cause and is measured out: 14.9 ms p95 idle,
 *  46.0 ms p95 under a 24-way CPU load, and it never throws on a file that is present.)
 *
 *  THE RULE THIS RESTORES IS THE ONE THIS FILE'S OWN HEADER DECLARES: *"every read of a built artifact is
 *  retried inside a bound, so a concurrent `npm run clean` cannot turn a row red for a moment's absence."*
 *  Only the existence poll implemented it; the reads did not.
 *
 *  **WHAT IS NOT RETRIED — this is what keeps every row's bite.** Any failure that names the artifact's
 *  CONTENT is thrown straight through: a parse error, the wrong module system, a missing `import.meta.url`,
 *  a preload that loads without Electron in scope. Re-acquiring cannot fix those, and a row that retried
 *  them would be a row that cannot fail. Only absence is transient, and only absence is re-acquired —
 *  measured reason: no intermediate artifact SIZE is ever observable during a build (4,000 samples at 1 ms
 *  across three builds saw only "absent" or the final byte count), so presence is the transient, not length.
 *
 *  **AND THE FAILURE SAYS WHICH OF THE TWO IT WAS**: never produced (the artifact was never there) versus
 *  kept being taken away (N re-acquisitions, with the last error attached). A row that cannot tell those
 *  apart is the row this file was. */
async function withArtifact<T>(file: string, label: string, use: (path: string) => T | Promise<T>): Promise<T> {
  const started = Date.now()
  let taken = 0
  let lastProblem = 'it does not exist — the build never produced it'
  let seen = ''
  while (Date.now() - started < READ_MS) {
    if (existsSync(file)) {
      if (statSync(file).size > 0) {
        /** **READY MEANS UNCHANGED, not merely present.** A writer that is mid-write leaves a file that
         *  exists, carries bytes and does not yet parse — so `size > 0` is not readiness and a `--check`
         *  against it reds on the WRITER's behalf. Two consecutive polls with the same (size, mtime) is the
         *  readiness test, and it costs one poll interval. A genuinely truncated artifact is stable and is
         *  still handed to the row, so a broken build still reds with its parse error. */
        const shape = `${statSync(file).size}:${statSync(file).mtimeMs}`
        if (shape !== seen) {
          seen = shape
          lastProblem = 'it was still being written'
          await sleep(20)
          continue
        }
        try {
          return await use(file)
        } catch (error) {
          if (!artifactGone(error, file)) throw error
          taken += 1
          lastProblem = `a concurrent \`npm run build\` removed it ${taken} time(s) while this row was reading it; the last read failed with: ${String((error as Error).message).split('\n')[0] ?? ''}`
        }
      } else {
        lastProblem = 'it exists and is empty'
      }
    } else if (taken > 0) {
      lastProblem = `a concurrent \`npm run build\` took it ${taken} time(s) while this row was reading it, and it had not come back yet`
    }
    await sleep(20)
  }
  throw new Error(`${label}: no readable artifact at ${file} after ${READ_MS} ms — ${lastProblem}`)
}



/** **HOW LONG AN ABSENT ARTIFACT IS GIVEN TO APPEAR BEFORE THIS FILE BUILDS IT ITSELF.** Measured: a build here
 *  takes 240-500 ms, and a sibling worker's build is IN FLIGHT when the artifact is at its most absent — which is
 *  exactly when this file used to decide to build too, adding a second `npm run clean` on top of the first. The
 *  grace is ~4x the measured worst build: enough for a build already running, short enough that a genuinely cold
 *  checkout is not made to wait. */
const BUILD_GRACE_MS = 2_000

beforeAll(async () => {
  // Read-only when the tree already carries the artifacts; a clean checkout builds them exactly the
  // way L1's B-1 does (same command, same bound), so no second build races the first unnecessarily.
  // **THE DECISION IS NOT A SNAPSHOT**: "absent" is a reason to build only if it STAYS absent, because the
  // absence this file is most likely to see is another worker's clean in the middle of a build it is running.
  const deadline = Date.now() + BUILD_GRACE_MS
  while (!(existsSync(mainEntry) && statSync(mainEntry).size > 0) && Date.now() < deadline) await sleep(20)
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
    const emittedEntry = await withArtifact(mainEntry, 'A-1', (entry) => {
      expect(statSync(entry).size).toBeGreaterThan(0)
      return entry
    })
    expect(loaderModuleSystem(emittedEntry), `the loader reads ${extname(emittedEntry)} as ${loaderModuleSystem(emittedEntry)}`).toBe(
      DECLARED_MODULE_SYSTEM,
    )
    // The declared emission itself, not just its product: the `build` command's own arm that emits
    // this path must carry the format and the platform the artifact is read back with (E-1).
    const arms = (manifest.scripts.build ?? '').split('&&').map((arm) => arm.trim())
    const emission = arms.find((arm) => arm.includes(manifest.main))
    expect(emission, `no \`build\` arm emits ${manifest.main}`).toBeDefined()
    expect(emission).toMatch(/--format[= ]esm\b/)
    expect(emission).toMatch(/--platform[= ]node\b/)
  }, BUILD_MS)

  it('A-2 the emitted artifact’s own module system matches the format the build emitted', async () => {
    await withArtifact(mainEntry, 'A-2', (entry) => {
      // It parses under the module system the loader assigns it: a parse error here is the loud,
      // reason-bearing failure the negative-behaviour rows require (`behaviour.md` §4).
      checkParses(entry)
      // The two emitted facts measured on this head (`interface.md` §2 P-1, P-3): esbuild's CJS
      // placeholder for the module scope ESM supplies natively, and the CJS-only globals ESM lacks.
      const bytes = readFileSync(entry, 'utf8')
      expect(bytes, 'a CJS placeholder for `import.meta` survives into the artifact').not.toMatch(/var import_meta = \{\}/)
      expect(bytes, 'the artifact references a CJS-only module-scope global').not.toMatch(/\b__dirname\b|\b__filename\b/)
    })
  }, READ_MS)

  it('A-3 the package’s addon-path derivation is satisfiable in the emitted artifact', async () => {
    const entry = await withArtifact(mainEntry, 'A-3', (path) => {
      // The artifact reads its own location through `import.meta.url`, which only a real module scope
      // supplies: the package's `createRequire(import.meta.url)` and addon path are its whole prologue
      // (`node_modules/provident-storeroom/index.mjs:94-97`).
      const bytes = readFileSync(path, 'utf8')
      expect(bytes, 'the artifact carries no `import.meta.url` for the package’s derivation to read').toMatch(/import\.meta\.url/)
      return path
    })

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
    // One acquisition for the whole read: the artifact this row checks, imports and then re-reads through
    // the entry must be the SAME bytes, and a concurrent `npm run build` may not swap them mid-row.
    await withArtifact(preloadEntry, 'A-4', async (preload) => {
      expect(loaderModuleSystem(preload)).toBe('cjs')
      checkParses(preload)
      // It evaluates as CommonJS and reaches Electron's own API — a parse error would mean the loader
      // read ESM syntax out of a `.cjs` name, which is the failure P-7 measured and P-8 rules out.
      const failure = await import(pathToFileURL(preload).href).then(
        () => null,
        (error: unknown) => error,
      )
      // The rejection is CAPTURED AS A VALUE by this row, so `withArtifact` never sees it: an absence has to
      // be re-thrown or it lands on `/exposeInMainWorld|contextBridge/` and reds for the writer's reason.
      // (Measured: a continuous `npm run build` loop red `A-4` with `Cannot find module 'file:///…preload.cjs'`
      // until this line existed — the same race, arriving through the one path the fix could not see.)
      if (failure !== null && artifactGone(failure, preload)) throw failure
      expect(failure, 'the preload artifact loaded with no Electron API in scope, so nothing evaluated').not.toBeNull()
      expect(failure, 'the preload artifact failed at parse, so it is not the CJS artifact it claims to be').not.toBeInstanceOf(
        SyntaxError,
      )
      expect(String((failure as Error).message)).toMatch(/exposeInMainWorld|contextBridge/i)
    })
    // The entry still names it beside itself: the preload join survives the arrangement (`interface.md` §4).
    // **IT GETS ITS OWN ACQUISITION** — it is a DIFFERENT artifact from the one above, and a read of
    // `main.mjs` guarded by `preload.cjs`'s presence is exactly the snapshot bug that was just fixed
    // (measured once in five full runs, `ENOENT … dist/main/main.mjs`): `withArtifact` re-acquires a named
    // file's absence only, and it cannot see that another file went away.
    expect(await withArtifact(mainEntry, 'A-4', (entry) => readFileSync(entry, 'utf8'))).toMatch(/\bpreload\.cjs\b/)
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
