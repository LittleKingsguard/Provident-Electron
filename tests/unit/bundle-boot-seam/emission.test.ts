// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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
// THE BUILD HAS ONE CLAIMANT: this file builds only when the artifact set is absent, and it builds it UNDER THE
// HOST-WIDE LIVE-BOOT LOCK the booting batteries hold (`D-227`, cure shape (2)) — one claimant at a time, host-wide, so
// no boot can meet a `dist/` rebuild and this file can no longer queue behind a booter that is itself waiting for a
// build. Every read of a built artifact is still retried inside a bound, so a row never reds for a moment's absence.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
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

// ---- ONE CLAIMANT FOR THE TREE: THE BUILD RUNS UNDER THE LIVE-BOOT LOCK -------------
/** **THE BUILD IS THE SUITE'S ONLY WRITER OF `dist/`, SO IT TAKES THE SAME HOST-WIDE LOCK THE BOOTING BATTERIES HOLD**
 *  (`D-227`'s cure shape (2)). `npm run build`'s FIRST arm is `npm run clean` (`rmSync('dist')`); `D-173` asked for *"one
 *  shared build lock for the three builders"*, and it could not be landed while the booters only WAITED for artifacts —
 *  **the booter held the lock and waited for `dist/`, the builder waited for the lock to make `dist/`: ten holds ×
 *  `60 000 ms`, ZERO builds in `600 s`** (`D-227`, measured, reverted clean). It lands now that the booters build their
 *  own tree under this lock too: **one claimant, so there is no cycle to deadlock on.**
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

/** **THE WHOLE EMISSION SET THIS BATTERY READS — every artifact `npm run build`'s declared arms emit** (`design.md` §2):
 *  the `main` field's entry, the preload, the two sibling bundles, and the renderer's bundle and page. */
const BUILT_ARTIFACTS = [
  mainEntry,
  join(DIST_MAIN, 'preload.cjs'),
  join(DIST_MAIN, 'standalone.mjs'),
  join(DIST_MAIN, 'battery-host.mjs'),
  join(DIST_RENDERER, 'index.html'),
  join(DIST_RENDERER, 'renderer.js'),
]
/** A `statSync` that threw is not a reading — it is a file still being written — so it is `false` here, never an exception. */
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
 *  command, the bound and the child's own reason: `beforeAll` records it in `buildFailure`, which `U-2` asserts is null,
 *  and the rows that read an artifact report its own named absence. Nothing is swallowed. */
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
        `before it ran: [${before.join(', ')}]). These rows read a COMPLETE emission set or not at all.`,
    )
  }
}

beforeAll(async () => {
  /** **A CLEAN CHECKOUT IS BUILT HERE, UNDER THE LOCK, AND AN ALREADY-BUILT ONE IS NOT BUILT AT ALL** — the rule its two
   *  siblings hold, now with the shared lock `D-173` asked for: this hook is READ-ONLY when the tree already carries the
   *  emission set, and a tree that does not carry it is built ONCE, by this process, as the one claimant (`D-227`). The
   *  lock is released in a `finally`: a build that throws must never queue the booting batteries behind a dead claimant. */
  const releaseBootLock = await acquireLiveBoot('bundle-boot-seam emission build (L3)')
  try {
    await ensureArtifacts()
  } catch (error) {
    buildFailure = error instanceof Error ? error.message : String(error)
  } finally {
    releaseBootLock()
  }
}, BUILD_MS + BOOT_LOCK_BOUND_MS)

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
