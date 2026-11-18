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
// path and in what format — and whether that arm keeps BOTH of the things it must keep external, the
// container's `electron` and the ESM-only `provident-storeroom` (`D-297`); whether `build:watch` carries
// the same decision; whether the preload arm is still the declared text and its artifact still CJS;
// whether the four arms this unit may not touch are still the declared text; whether the emission set is
// exactly five artifacts; and — `U-9`, the post-sweep row — whether the built entry carries the package
// as an IMPORT rather than as bytes. No row spawns Electron, opens a transport or calls a tool, and no
// row re-asserts an L1 expectation (L1 §6, D-27).
//
// RED-FIRST, AND IT IS THE EVIDENCE (D-14, examiner.md §3): U-1..U-6 were authored against the head
// BEFORE the arrangement landed — the one exception is `U-9` below, authored post-sweep over a flag
// already in the tree, so it carries no arrival colour and states its own history in place. ON ARRIVAL
// U-1, U-2, U-3 and U-6 answered red: that head named the entry `dist/main/main.cjs`, emitted `build`
// and `build:watch` at `--format=cjs` to that name, and left `dist/main/` carrying it. ALL FOUR ARE
// GREEN AT THIS HEAD, and the arrangement is what cleared them — the `main` field names
// `dist/main/main.mjs`, both build keys emit `--format=esm --outfile=dist/main/main.mjs`, no arm emits
// `main.cjs`, and `dist/main/` carries no `main.cjs` at all. U-2's second external,
// `--external:provident-storeroom`, landed in the tree after that first landing and is asserted here
// from `D-297`; it is green at this head too. U-4 and U-5 answered green on arrival and must STAY
// green: they are the guardrail that no L4 invention reaches the preload or the two sibling bundles
// (D-18, ASM-L2-5, ASM-L2-6). No row is skipped, conditionally disabled or softened to reach a
// colour — and a red-first paragraph describing a head the tree had left behind would be the same
// class as a row with no reading under it.
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

/** **A CO-OWNED ARTIFACT READ THE WAY `D-74` DEMANDS**, whose `A-1`..`A-4` are this module's own precedent: PRESENT,
 *  NON-EMPTY, and **UNCHANGED ACROSS TWO POLLS** before a single byte is judged.
 *
 *  **Why the bound is here and not a bare `existsSync`+read**: this entry is CO-OWNED. Every builder in this suite writes
 *  `dist/` under one host-wide lock and `npm run clean` REMOVES it (`D-227`, the lock above), so a bare read can land on a
 *  half-written entry, or on one build's bytes while another build is replacing them — `D-74` measured exactly that:
 *  `A-1`..`A-4` red `2 of 4 runs` under a concurrent build and `0 of 16` once the read was bounded. Two polls one interval
 *  apart is the cheap form of "not being written": a file still growing cannot present the same bytes twice.
 *
 *  **And the bound re-acquires ABSENCE ONLY, never a content fault** (`D-74`): the assertions the caller makes are judged on
 *  the bytes this function RETURNS, so a stable entry that carries the wrong shape reds at once instead of being waited out.
 *  A row that retried a content fault could not fail, which is worth less than no row. */
async function stableArtifact(file: string, label: string): Promise<string> {
  const started = Date.now()
  let previous: string | null = null
  let problem = 'it does not exist'
  while (Date.now() - started < READ_MS) {
    try {
      if (statSync(file).size > 0) {
        const bytes = readFileSync(file, 'utf8')
        if (previous !== null && previous === bytes) return bytes
        previous = bytes
        problem = 'it changed between two polls'
      } else {
        problem = 'it exists and is empty'
      }
    } catch {
      problem = 'it does not exist'
    }
    await sleep(100)
  }
  throw new Error(`${label}: no STABLE artifact at ${file} — ${problem} after ${READ_MS} ms`)
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

  it('U-2 · exactly ONE `build` arm emits the entry, and it is the ESM arm on `node` with `electron` and `provident-storeroom` external (design.md §2, §4 `G-8`; signatures.md §3; E-1; D-297)', () => {
    expect(buildFailure).toBeNull()
    const declared = manifest.main.replace(/^\.\//, '')
    const mainArms = armsOf('build').filter((arm) => arm.includes('src/main/main.ts'))
    expect(mainArms, 'the entry has one emission arm, never two').toHaveLength(1)
    const arm = mainArms[0] as string
    expect(flagOf(arm, 'format'), `the entry's arm carries --format=${String(flagOf(arm, 'format'))}, not the declared ESM`).toBe('esm')
    expect(flagOf(arm, 'platform'), 'the entry is built for node, exactly as before the arrangement').toBe('node')
    expect(arm, '`electron` stays external: the container supplies it').toMatch(/--external[=:]electron\b/)
    // **AND `provident-storeroom` STAYS EXTERNAL, ASSERTED EXACTLY AS `electron` IS** — beside it in the same arm, on the same
    // question (`interface.md` §1's "the external is the ONLY thing the arrangement adds, at two sites"), because the flag has
    // no build-time author: the package is **ESM-only** — it publishes NO CJS BUILD (`"type": "module"`; `exports["."]` carries
    // `types`, `import` and, since `1.12.0`, `require`, all of them naming the one `./index.mjs`; no `main`, no `default`, no
    // `.cjs`) — so **dropping the flag is NOT a build failure**: esbuild exits `0` and silently inlines the package's source
    // (`D-297`'s 213,948 bytes; re-measured at this head with a two-line probe importing `storeCreate`: **212,018 bytes,
    // fifteen package-path comments, a `var import_meta = {}`**, and **165 bytes** with the flag), and that inline is SILENT AT
    // EITHER MODULE SYSTEM — **the external is the only thing that makes it impossible, and that is now the whole of what this
    // assertion protects.**
    // **THE `ERR_PACKAGE_PATH_NOT_EXPORTED` ARM IS THE READING OF ITS OWN DATE AND IS KEPT AS ONE** (`D-46`): at `1.11.0` —
    // the pin at the time `D-297` was recorded — `exports["."]` carried `types` and `import` alone, so a CJS arm that KEPT the
    // package external died in Node's resolver instead: `Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in
    // …/node_modules/provident-storeroom/package.json`, while its `await import` succeeded (`interface.md` §1, §3
    // P-5/P-10..P-12). **AT `1.12.0` THE EXPORTS MAP CARRIES `"require": "./index.mjs"` AND THAT ARM LOADS** — the THIRD
    // condition, after `types` and `import`, naming the SAME ESM entry, served by Node's own `require(esm)` interop, with no
    // CJS build appearing beside it (`RELEASE-NOTES.md` §1.12.0 items 2 and 4; `D-298`) — **so the CJS arm's death is no longer
    // this assertion's warrant, and it is not needed: what `U-2` protects is that the package STAYS EXTERNAL and the entry
    // STAYS ESM.**
    // **AND THE SAME RELEASE MOVED THE PACKAGE'S FLOOR — `"engines": { "node": ">=22.12.0" }`, from `>=18.0.0`** — because
    // `require(esm)` is unflagged only from `20.19.0`/`22.12.0` (`RELEASE-NOTES.md` §1.12.0 item 3). **NO ROW OF THIS MODULE
    // PINS THAT FLOOR** — this repo's own runtime is `v24.20.0`, above it — so the figure is stated here, in the comment, and
    // asserted nowhere: a later pass that wants it pinned ADDS a row and does not narrow this one.
    // THE RULE'S OWNERS: the finding is upstream-owned and recorded rather than patched (`D-5`), `D-297` is its record,
    // `D-298` records its discharge at this pin, and the property it protects is `design.md` §4 `G-8`'s non-self-contained
    // artifact. `U-9` reads the EMITTED entry, so this arm-text assertion and that artifact assertion fail independently; this
    // one fails before any build runs.
    expect(
      arm,
      '`provident-storeroom` stays external: dropping this flag INLINES it silently at exit 0 — measured: 212,018 bytes, ' +
        'fifteen package-path comments and a `var import_meta = {}` (D-297) — and the external is what makes that inline ' +
        'impossible REGARDLESS of module system, which is the whole of what this assertion protects: the package stays ' +
        'external and the entry stays ESM. (On `1.11.0`, the pin at the time D-297 was recorded, a CJS arm that kept it ' +
        'external died with `ERR_PACKAGE_PATH_NOT_EXPORTED`; at `1.12.0` the exports map carries the `require` condition, ' +
        'naming the same ESM entry, and that arm LOADS.) (interface.md §1, P-5/P-10; design.md §4 `G-8`; D-297, D-298, D-5)',
    ).toMatch(/--external[=:]provident-storeroom\b/)
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

  // **THE POST-SWEEP ROW, AND WHY IT IS A ROW AND NOT A LINE INSIDE `U-2`**: it is authored AFTER D-30's rework sweep, so it
  // carries no `rework` marker and GATES (D-40) — and the two questions are independent, so they must be able to red
  // separately: `U-2` reads the arm's TEXT (a flag that was never landed), this one reads the EMITTED BYTES (a flag that is
  // there and did not take effect). **THE ROW IS THE PAGE'S NOW, AND IT IS CITED THERE**: `docs/L3/bundle-boot-seam/design.md`
  // §7's table declares **nine** rows — `U-1`..`U-6` and this one here, `U-7` and `U-8` in `derivation.test.ts` — and states
  // `U-9`'s goal, its three assertions and the `stableArtifact` read that fronts them; §1's site table and
  // §4 `G-8` name it as the artifact grain of the same decision `U-2` reads on the arm, and §1 says the subtraction is read
  // on the artifact rather than on the arm. That is **`D-297`'s routed residual, landed** (the designer's write, not L3's).
  // **The corpus follow-up is half-discharged, and which half is named here so the other one is not lost** (D-1's
  // one-writer rule keeps L3 out of both): `strata/marks.json` HAS been regenerated in this worktree (`node
  // scripts/strata-marks.mjs index`) — this row's `scenario` stands in `marked` beside its `// strata:gates` carve-out, and
  // the readings moved by exactly that one gating site in one more file and that one carve-out (D-26) — while
  // `strata/brief.md` §6's census cell has NOT moved and still reads the figures dated to its last regen: that cell is what
  // this row still owes.
  // strata:gates — the row is authored after the sweep, so it is new evidence and gates (D-40); inside a `marked-file` file this carve-out is the instrument's only form for that (D-30)
  it('U-9 · the built entry does NOT inline `provident-storeroom`: the package stands only as an import specifier (design.md §2, §4 `G-8`; interface.md §1, §7 A-3; D-297, D-74)', async () => {
    // **THIS ROW EXISTS BECAUSE A DOWNSTREAM FORK FOUND THE HOLE FIRST** (`D-297`, `D-5`): `U-2` pins the ARM'S TEXT, and
    // text is all the arm can be trusted for — a flag that is present and ineffective (a second invocation, an esbuild
    // config, a `--define` re-inlining the package) leaves `U-2` green, and esbuild reports NOTHING. So this row reads what
    // the tree actually emitted, at the grain the failure is silent at, and states the fork's own reading: with the flag the
    // package is a bare SPECIFIER (two sites at this head — `import { storeCreate } from "provident-storeroom";` and its
    // aliased twin `import { storeCreate as storeCreate2 } from "provident-storeroom";`); without it the same emission carries
    // the package's SOURCE with every inlined file named by its path in a comment. Both arms
    // were re-measured this session at this head, and the three assertions below are the MIRROR of that measurement:
    // `--format=esm` without the flag → 1,661,743 bytes, **15** package-path comments, **no** import specifier, no
    // placeholder; with the flag → two specifier sites, 0 comments, 0 placeholders (`interface.md` §1, §7 A-3; `D-297`).
    //
    // THE READ IS BOUNDED AND TWO-POLL STABLE, AND THAT IS THIS ROW'S OWN REASON, NOT A HABIT (`D-74`; `A-1`..`A-4` are this
    // module's precedent): `dist/main/main.mjs` is CO-OWNED — every builder here writes `dist/` under the host-wide live-boot
    // lock and `npm run clean` removes it — so the entry can be half-written or being replaced at the instant this row reads
    // it, and `D-74` measured a bare read red `2 of 4 runs` under a concurrent build. The bound re-acquires ABSENCE only; the
    // three assertions below are judged on the returned bytes, so an artifact that is STABLY wrong reds at once.
    const bytes = await stableArtifact(mainEntry, 'U-9')

    // (i) THE PACKAGE STANDS, AND IT STANDS AS A SPECIFIER — the shape `--external:provident-storeroom` emits on THIS
    // artifact, whose declared module system is ESM (`U-1`, `U-2`). **AND WHAT PUTS A CJS EMISSION OUTSIDE THIS ROW IS THAT
    // DECLARATION, NOT A RESOLVER REFUSAL**: such an arm would answer `require("provident-storeroom")` instead, and **since
    // `1.12.0` that shape LOADS** — `exports["."]` carries `"require": "./index.mjs"`, the third condition, naming the same
    // ESM entry (`RELEASE-NOTES.md` §1.12.0 item 2; `D-298`; at `1.11.0`, the pin at the time `D-297` was recorded, it
    // answered `ERR_PACKAGE_PATH_NOT_EXPORTED`) — so the exclusion is the arm's own `--format=esm` and never the shape's
    // unavailability. **The external is what keeps the silent inline impossible at either module system, so these three terms
    // do not rest on the CJS arm's death.** It is also the only shape in which the package's own module context (its
    // `createRequire(import.meta.url)`, its manifest read beside its own entry) stays where the package derives it
    // (`interface.md` §1, P-12).
    expect(
      bytes,
      'the built entry carries no `provident-storeroom` import specifier: either the arm lost the flag and esbuild INLINED the ' +
        'package at exit 0 — which is silent, and is the fork\'s failure — or this artifact predates the flag and must be ' +
        'rebuilt, or it is not the ESM emission the `main` field declares (interface.md §1; design.md §2, §4 `G-8`; D-297)',
    ).toMatch(/^import\b[^\n]*\bfrom\s*["']provident-storeroom["']|^import\s*["']provident-storeroom["']/m)

    // (ii) NO INLINE TRACE. esbuild names every file it inlines by its path (`// node_modules/<pkg>/<file>`), so ONE comment
    // naming the package is the package's bytes inside the artifact — the fifteen the dropped-flag probe carried are this
    // assertion's target, and an artifact that carries NONE of them carries no package source at all.
    expect(
      bytes.match(/\/\/[^\n]*node_modules\/provident-storeroom[^\n]*/g) ?? [],
      'the entry names the package by PATH, which is esbuild’s comment for a file it INLINED: the package was bundled into ' +
        'the emission instead of resolved at load (D-297; the measured inlined probe carries fifteen of these)',
    ).toEqual([])

    // (iii) THE PLACEHOLDER THAT MARKS A SHIMMED MODULE CONTEXT, and the assertion that bites on a **CJS** emission: under
    // `--format=cjs` esbuild rewrites the inlined package's `import.meta` to `var import_meta = {}` (the measured probe's
    // 212,018-byte arm carries it), while under `--format=esm` it keeps `import.meta` real — so on THIS arm (i) and (ii) are
    // the ones that red and here the placeholder is the second fingerprint of the same failure. A real ESM artifact carries
    // `import.meta.url` (A-2 owns the placeholder at the integration grain, P-14 the `--define` alternative), and its absence
    // is what lets the package's derivation run at the package's own URL (P-12).
    expect(
      bytes,
      'the entry carries `var import_meta = {}`, the placeholder esbuild writes when it SHIMS a module it inlined; the ' +
        'package’s derivation must run at the package’s own URL, not a shimmed one (interface.md §1 P-12; A-2)',
    ).not.toMatch(/\bvar\s+import_meta\b/)
  })
})
