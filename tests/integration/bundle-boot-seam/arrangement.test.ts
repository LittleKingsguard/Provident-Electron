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
// THE BUILD HAS ONE CLAIMANT: this file runs `npm run build` only when the artifact set is absent, and it runs it UNDER
// THE HOST-WIDE LIVE-BOOT LOCK the booting batteries hold (`D-227`, cure shape (2)) — so no boot can meet a `dist/`
// rebuild, and this file can no longer wait for a lock a waiting booter holds. Every read of a built artifact is still
// retried inside a bound: the lock closes the race at its source, and the retry is what keeps a row honest about a tree
// that is being read at all.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
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

/** **THE BUILD'S OWN BOUND, and the bound every read of its output is held to — the harness's, never a loader's.** */
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



// ---- ONE CLAIMANT FOR THE TREE: THE BUILD RUNS UNDER THE LIVE-BOOT LOCK -------------
/** **THE BUILD IS THE SUITE'S ONLY WRITER OF `dist/`, SO IT TAKES THE SAME HOST-WIDE LOCK THE BOOTING BATTERIES HOLD**
 *  (`D-227`'s cure shape (2)). `npm run build`'s FIRST arm is `npm run clean` (`rmSync('dist')`), which is the `~54 ms`
 *  window measured immediately below; `D-173` asked for *"one shared build lock for the three builders"* and it could not
 *  be landed while the booters only WAITED for artifacts — **the booter held the lock and waited for `dist/`, the builder
 *  waited for the lock to make `dist/`: ten holds × `60 000 ms`, ZERO builds in `600 s`** (`D-227`, measured, and reverted
 *  clean rather than kept). It lands now because the booters build their own tree under this lock too: **one claimant, so
 *  there is no cycle to deadlock on.**
 *
 *  **THE DERIVATION IS THE SIBLING SPAWNING BATTERIES', CHARACTER FOR CHARACTER** — the same `tmpdir()` name, owner file,
 *  120 s bound and dead-holder sweep — because they must contend on ONE path. It is DUPLICATED, never shared: the corpus's
 *  booting files each carry their own copy of exactly this helper, and a shared module authored by a harness pass would be
 *  a second place for the lock path to drift. */
const BOOT_LOCK = join(tmpdir(), `provident-electron-live-boot-${repoRoot.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-60)}.lock`)
const BOOT_LOCK_OWNER = join(BOOT_LOCK, 'owner')
const BOOT_LOCK_POLL_MS = 100
/** How long an UNOWNED lock directory is left alone before it is read as a holder that died between its `mkdir` and its own
 *  owner write: that window is microseconds wide, and sweeping it early would seat two claimants at once. */
const BOOT_LOCK_SETTLE_MS = 2_000
/** **The wait is BOUNDED, because a harness that waits forever measures nothing.** One peer's boot is the whole of a wait,
 *  and a boot's own worst case is its row's bound plus its teardown. */
const BOOT_LOCK_BOUND_MS = 120_000
/** A pid that answers signal `0` is alive; `EPERM` is a live process this seat may not signal, which is still alive. */
function pidAlive(pid: number): boolean {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM'
  }
}
interface LockHolder { pid: number; since: number; why: string }
/** Who is holding the lock, read off the owner file — `null` where the directory carries no readable owner. */
function lockHolder(): LockHolder | null {
  try {
    const [pid, since, ...why] = readFileSync(BOOT_LOCK_OWNER, 'utf8').trim().split(' ')
    const held = Number(pid)
    return Number.isSafeInteger(held) && held > 0 ? { pid: held, since: Number(since), why: why.join(' ') } : null
  } catch {
    return null
  }
}
/** The lock directory's own age, and `Infinity` where it is gone: a stat that threw is not an age of zero. */
function lockAgeMs(): number {
  try {
    return Date.now() - statSync(BOOT_LOCK).mtimeMs
  } catch {
    return Number.POSITIVE_INFINITY
  }
}
const liveBootReleases: Array<() => void> = []
/** **TAKE THE HOST-WIDE LIVE-BOOT LOCK, OR RED WITH THE HOLDER NAMED.** A holder that was SIGKILLed ran no release, so it is
 *  read off its own pid (and off the lock's age, because a pid is reused) rather than waited out to the bound. */
async function acquireLiveBoot(why: string): Promise<() => void> {
  const started = Date.now()
  for (;;) {
    try {
      mkdirSync(BOOT_LOCK)
      writeFileSync(BOOT_LOCK_OWNER, `${process.pid} ${started} ${why}`)
      let released = false
      const release = (): void => {
        if (released) return
        released = true
        // A lock naming ANOTHER pid is that holder's: this release has been overtaken and must not remove it.
        const holder = lockHolder()
        if (holder !== null && holder.pid !== process.pid) return
        try {
          rmSync(BOOT_LOCK, { recursive: true, force: true })
        } catch {
          /* the exit net sweeps again */
        }
      }
      liveBootReleases.push(release)
      return release
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw new Error(
          `the live-boot lock could not be taken at \`${BOOT_LOCK}\`: ${error instanceof Error ? error.message : String(error)}. ` +
            `The spawning batteries and the three builders are serialised so their writes to \`dist/\` cannot overlap, so a ` +
            `lock path that cannot be created is a harness fault and never a row's reading.`,
        )
      }
    }
    const holder = lockHolder()
    if (holder === null) {
      if (lockAgeMs() < BOOT_LOCK_SETTLE_MS) {
        await sleep(BOOT_LOCK_POLL_MS)
        continue
      }
      try {
        rmSync(BOOT_LOCK, { recursive: true, force: true })
      } catch {
        /* somebody else swept it first */
      }
      continue
    }
    if (!pidAlive(holder.pid) || Date.now() - holder.since > BOOT_LOCK_BOUND_MS * 2) {
      try {
        rmSync(BOOT_LOCK, { recursive: true, force: true })
      } catch {
        /* somebody else swept it first */
      }
      continue
    }
    if (Date.now() - started > BOOT_LOCK_BOUND_MS) {
      throw new Error(
        `the live-boot lock at \`${BOOT_LOCK}\` is still held by pid ${holder.pid} after ${BOOT_LOCK_BOUND_MS} ms — holder ` +
          `"${holder.why}", since ${new Date(holder.since).toISOString()}. The spawning batteries and the builders are ` +
          `SERIALISED (one claimant at a time, host-wide) so no boot can meet a \`dist/\` rebuild, and this wait is bounded ` +
          `and stated, never silent. Fix: a holder that outlives the bound is a boot or a build that wedged — ` +
          `\`${BOOT_LOCK}\` names it, and SIGKILLing it releases the lock at once.`,
      )
    }
    await sleep(BOOT_LOCK_POLL_MS)
  }
}

/** **THE ARTIFACT SET THIS BATTERY READS, AND `npm run build` IS THE ONLY THING THAT PRODUCES IT**: the entry the `main`
 *  field names and the preload the arrangement keeps beside it (`interface.md` §1, §4). */
const BUILT_ARTIFACTS = [mainEntry, preloadEntry]
/** A `stat` that threw is not a reading — it is a file still being written — so it is `false` here, never an exception. */
function artifactReady(file: string): boolean {
  try {
    return existsSync(file) && statSync(file).size > 0
  } catch {
    return false
  }
}

/** **THE ARTIFACT SET IS ENSURED, NOT WAITED FOR, UNDER THE LOCK THE BUILDER HOLDS — ONE CLAIMANT** (`D-227`'s cure shape
 *  (2), with the measured livelock stated in the lock note above). (i) Every member present and non-empty ⇒ return; no
 *  build, which is the whole of a warm run. (ii) A member absent or empty ⇒ `npm run build` runs ONCE, in this process,
 *  and the set is RE-MEASURED. (iii) The build THREW, or exited zero without producing the set ⇒ a `new Error` naming the
 *  command, the bound and the child's own reason: `beforeAll` records it in `buildFailure`, which `A-1` asserts is null,
 *  and the row that would read the artifact reports its own named absence. Nothing is swallowed. */
async function ensureArtifacts(): Promise<void> {
  if (BUILT_ARTIFACTS.every(artifactReady)) return
  const before = BUILT_ARTIFACTS.filter((file) => !artifactReady(file))
  try {
    execFileSync('npm', ['run', 'build'], { cwd: repoRoot, stdio: 'pipe', timeout: BUILD_MS })
  } catch (error) {
    throw new Error(
      `the built artifact set is absent at [${before.join(', ')}] and \`npm run build\` — run by this battery ITSELF, under ` +
        `the host-wide live-boot lock it already holds (\`D-227\`) — failed inside its ${BUILD_MS} ms bound: ` +
        `${error instanceof Error ? error.message : String(error)}. These rows read the ARTIFACT \`npm run build\` ` +
        `produces, so a build that cannot produce it is a harness prerequisite failure and never a row's reading.`,
    )
  }
  const after = BUILT_ARTIFACTS.filter((file) => !artifactReady(file))
  if (after.length > 0) {
    throw new Error(
      `\`npm run build\` exited without an error and the artifact set is STILL absent at [${after.join(', ')}] (absent ` +
        `before it ran: [${before.join(', ')}]). These rows read a COMPLETE artifact set or not at all.`,
    )
  }
}

beforeAll(async () => {
  /** **A CLEAN CHECKOUT IS BUILT HERE, UNDER THE LOCK, AND AN ALREADY-BUILT ONE IS NOT BUILT AT ALL** — the two siblings'
   *  rule (`boot-contract.test.ts`, `emission.test.ts`), now with the shared lock `D-173` asked for and `D-227` measured
   *  as impossible without a booter-side redesign. **THE 2 s GRACE IS GONE WITH THE RACE IT PAPERED OVER**: it existed
   *  because an absence here was most likely a sibling worker's in-flight `npm run clean`, and no file in the suite can
   *  run that build outside this lock any more, so an absence under the lock is an absence. The lock is released in a
   *  `finally`: a build that throws must never queue the booting batteries behind a dead claimant. */
  const releaseBootLock = await acquireLiveBoot('bundle-boot-seam arrangement build (L2)')
  try {
    await ensureArtifacts()
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  } finally {
    releaseBootLock()
  }
}, BUILD_MS + BOOT_LOCK_BOUND_MS)

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
