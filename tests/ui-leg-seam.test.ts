// tests/ui-leg-seam.test.ts — §3.5's `SEAM-1..4` rows + §4's ONE additive
// production seam (`ADD-1..ADD-6`) + §3.0 `R0`(c), for unit `U-REALDOM-BOOT`
// (wave C), written RED-FIRST from docs/specs/ci-ui-leg.md ONLY
// (AGENTS.md item 3 / RCA-1 / RCA-2).
//
// WHY THESE ROWS ARE NODE-LAYER (`[T]`) ROWS, quoted from the spec's own
// `R0` note (§3.0):
//   "its `(c)` half is **[H]** (the seam's behaviour) and **is** pinned
//    node-side — see §3.5's `SEAM-*` rows. **A TestWriter may not move
//    `(a)`/`(b)` into the node suite**: no window boots there."
// §3.5 `SEAM-1`/`SEAM-2`/`SEAM-3` also admit the shape directly: "a node-layer
// row **(or an app boot)**". No window boots in `[T]`, so each `SEAM-*` row
// below has TWO halves:
//   * a STRUCTURAL half over `src/main/main.ts` — the seam's position, its
//     source of the override and its ordering (§4.1/§4.2 `ADD-1`/`ADD-2`/
//     `ADD-3`) — which is RED today (the seam does not exist); and
//   * a BEHAVIOURAL half over the landed stores (`createSecurityStore` /
//     `createModuleStore`, both of which already take a `path`), which PASSES
//     today and is the guard that the seam may not weaken what it sits above.
// Where a row's two halves differ in state, the halves are SEPARATE `it` rows
// so the red set stays honest (a green guard is reported, never dressed as a
// red).
//
// THE FLAG SPELLING IS NOT PINNED (§4.2 `ADD-2`: "The exact flag spelling is
// the Implementer's"), so no row below pins a literal flag. `ADD-2`'s
// *contract* is what is asserted: the override is a `--`-prefixed argument on
// the process's own command line, found by "the same argv-scan idiom at
// `src/main/main.ts:19-39`". `ADD-3`'s one API certainty is also asserted as a
// DISJUNCTION, because `ADD-2` admits two routes: either
// `app.setPath('userData', …)` before `app.whenReady()` resolves, or the store
// path derivations themselves stop being the landed literal defaults.
import { describe, it, expect } from 'vitest'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createSecurityStore } from '../src/main/security-store.js'
import { createModuleStore, type ModuleRecord } from '../src/main/module-store.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MAIN_PATH = join(ROOT, 'src', 'main', 'main.ts')
const LEG_PATH = join(ROOT, 'scripts', 'electron-ui.mjs')

const MAIN_SRC = readFileSync(MAIN_PATH, 'utf8')
const LEG_SRC: string | null = existsSync(LEG_PATH) ? readFileSync(LEG_PATH, 'utf8') : null
const LEG_ABSENT =
  'scripts/electron-ui.mjs does not exist — spec §2 item 1 ("NEW — the leg itself … does not exist") / §7 item 1'

/** §4.2 `ADD-1` — the two store paths AS LANDED (`src/main/main.ts:49-51`,
 *  `:57-59`). `SEAM-1`'s additive half is that these survive the seam. */
const DEFAULT_SECURITY_STORE_PATH = "join(app.getPath('userData'), 'provident-security.json')"
const DEFAULT_MODULES_STORE_PATH = "join(app.getPath('userData'), 'provident-modules.json')"

/** §4.2 `ADD-2` — the override is "a `--`-prefixed argument alongside the
 *  existing `--mcp-transport=` / `--mcp-port=` flags". The SPELLING is the
 *  Implementer's, so this is a FAMILY (`--user-data-dir=`, `--provident-user-data=`,
 *  `--userData=`, …), never a literal. */
const OVERRIDE_FLAG = /--[a-z0-9-]*(user-data|userData|user_data)[a-z0-9-]*/

/** §4.2 `ADD-2`'s *source* clause: the override is carried on the process's own
 *  command line — i.e. it is found by an argv scan, the way the landed
 *  `transportFromArgs`/`portFromArgs` scan. */
const OVERRIDE_ARGV_SCAN = /(startsWith\(\s*['"]--[a-z0-9-]*user-?data|argv[^\n]{0,80}user-?data)/i

/** §4.2 `ADD-3` — the pinned API route. */
const SETPATH = /app\.setPath\(\s*['"]userData['"]/

/** §4.2 `ADD-1` — the seam sits INSIDE `main()` and ABOVE the store reads. */
const MAIN_FN_AT = MAIN_SRC.search(/async function main\s*\(/)
const SECURITY_STORE_AT = MAIN_SRC.search(/createSecurityStore\s*\(/)
const MODULES_STORE_AT = MAIN_SRC.search(/createModuleStore\s*\(/)

/** Where the override is APPLIED, if anywhere (`-1` = no seam). `ADD-2` admits
 *  two routes, so this is a disjunction: (a) `app.setPath('userData', …)`, or
 *  (b) the store paths no longer being the landed literal default expressions
 *  (the override is then carried into the `join(...)` itself). */
function seamApplyAt(src: string): number {
  const setPath = src.search(SETPATH)
  if (setPath !== -1) return setPath
  if (!src.includes(DEFAULT_SECURITY_STORE_PATH)) return src.search(/createSecurityStore\s*\(/)
  return -1
}
const SEAM_AT = seamApplyAt(MAIN_SRC)
const SEAM_APPLIED =
  'no user-data override is applied in src/main/main.ts — §4.1/§4.2 `ADD-3` ("The effective user-data root (app.getPath(\'userData\')) is the override path when the override is present"), §7 item 1 ("the seam does not exist")'

function freshDir(tag: string): string {
  return mkdtempSync(join(tmpdir(), `provident-ui-seam-${tag}-`))
}

describe('§3.5 SEAM-1..4 + §4 ADD-1..ADD-6 — the ONE additive seam (src/main/main.ts)', () => {
  // -------------------------------------------------------------------------
  // `SEAM-1` — Absent ⇒ today's behaviour. GUARD HALF (passes today).
  // States: S1 both landed store-path derivations still present (§4.2 ADD-1);
  //   S2 the argv-scan idiom the seam must reuse is unchanged (§4.2 ADD-2);
  //   S3 first-run defaults unchanged: a missing store file yields
  //   `['read','dispatch']` / token null (behavioural, via the landed store).
  // Pass condition (§3.5): "the store path and the first-run defaults are
  //   **unchanged** when the override is absent". Fail state: any observable
  //   difference ⇒ the seam is not additive ⇒ review finding, revert it.
  // -------------------------------------------------------------------------
  it('SEAM-1a (§3.5 SEAM-1, ADD-4) — absent ⇒ the landed path derivation and first-run defaults are unchanged (guard, passes today)', () => {
    expect(MAIN_SRC, '§4.2 ADD-1: the landed security-store path derivation must survive the seam').toContain(
      DEFAULT_SECURITY_STORE_PATH,
    )
    expect(MAIN_SRC, '§4.2 ADD-1: the landed module-store path derivation must survive the seam').toContain(
      DEFAULT_MODULES_STORE_PATH,
    )
    expect(MAIN_SRC, '§4.2 ADD-2: the argv-scan idiom the override reuses must be intact').toMatch(/function transportFromArgs\s*\(/)
    expect(MAIN_SRC, '§4.2 ADD-2: the argv-scan idiom the override reuses must be intact').toMatch(/function portFromArgs\s*\(/)

    // S3 — behavioural: the first-run default is the landed `read`+`dispatch`.
    const dir = freshDir('defaults')
    try {
      const store = createSecurityStore({ path: join(dir, 'provident-security.json') })
      const cfg = store.get()
      expect(cfg.enabled, '§3.5 SEAM-1/SEAM-4: the first-run default is `read`+`dispatch`').toEqual(['read', 'dispatch'])
      expect(cfg.token, '§3.5 SEAM-1: first-run token default is null').toBeNull()
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  // -------------------------------------------------------------------------
  // `SEAM-1`'s RED HALF + `ADD-2` — the override must arrive on the process's
  // own command line, so the absent case is simply "no such flag".
  // States: S1 an argv scan for the override flag exists in main.ts; S2 the
  //   default path derivations are still present (the fallback stays the
  //   default).
  // Fail-state: no scan ⇒ there is no seam (§7 item 1) and `R0`(c) cannot pass.
  // -------------------------------------------------------------------------
  it('SEAM-1b (§4.2 ADD-2) — the override arrives by an argv scan, with the default root as the absent case (RED today)', () => {
    expect(
      MAIN_SRC,
      '§4.2 ADD-2: "The override arrives as a startup signal carried on the process\'s own command line (a `--`-prefixed argument … parsed by the same argv-scan idiom at src/main/main.ts:19-39)"',
    ).toMatch(OVERRIDE_FLAG)
    expect(
      MAIN_SRC,
      '§4.2 ADD-2: the override must be found by an argv scan (the `startsWith(...)` idiom), not read from elsewhere',
    ).toMatch(OVERRIDE_ARGV_SCAN)
    expect(MAIN_SRC, '§4.2 ADD-4 (§3.5 SEAM-1): the absent case keeps the landed default root').toContain(
      DEFAULT_SECURITY_STORE_PATH,
    )
  })

  // -------------------------------------------------------------------------
  // `SEAM-2` — Present ⇒ the override applies BEFORE the store reads.
  // States: S1 the override application exists at all (ADD-3); S2 it sits
  //   INSIDE `main()` (ADD-1: "the seam sits above line 49 in `main()`");
  //   S3 it precedes `createSecurityStore(...)`; S4 it precedes
  //   `createModuleStore(...)` (§3.5: "BOTH stores are created against the
  //   overridden path").
  // Fail-states (§3.5 SEAM-2): a store created against the default path ⇒
  //   `R0`(c) fails and this row fails. Also ADD-3: `app.setPath('userData', …)`
  //   must be called BEFORE `app.whenReady()` resolves — satisfied structurally
  //   here because `main()` itself runs inside `app.whenReady().then(...)`
  //   (`src/main/main.ts:158`), so the seam's position inside `main()` above
  //   line 49 is the in-time position.
  // -------------------------------------------------------------------------
  it('SEAM-2a (§3.5 SEAM-2, ADD-1/ADD-3) — the override applies inside main() and BEFORE both stores are created (RED today)', () => {
    expect(SEAM_AT, SEAM_APPLIED).toBeGreaterThanOrEqual(0)
    expect(MAIN_FN_AT, 'src/main/main.ts must still declare `async function main()` (ADD-1)').toBeGreaterThanOrEqual(0)
    expect(SECURITY_STORE_AT, 'src/main/main.ts must still construct the security store (ADD-1)').toBeGreaterThanOrEqual(0)
    expect(MODULES_STORE_AT, 'src/main/main.ts must still construct the module store (ADD-1)').toBeGreaterThanOrEqual(0)
    expect(
      SEAM_AT > MAIN_FN_AT,
      '§4.2 ADD-1: "the seam sits above line 49 in `main()`" — the override must be applied inside `main()`, not at module scope',
    ).toBe(true)
    expect(
      SEAM_AT < SECURITY_STORE_AT,
      '§4.2 ADD-1: the override is honoured BEFORE `createSecurityStore(...)`',
    ).toBe(true)
    expect(
      SEAM_AT < MODULES_STORE_AT,
      '§3.5 SEAM-2: BOTH stores are created against the overridden path — the module store too',
    ).toBe(true)
  })

  // -------------------------------------------------------------------------
  // `SEAM-2`'s BEHAVIOURAL HALF. GUARD (passes today): the landed stores
  // already honour the `path` they are handed, which is what makes the seam's
  // override effective. States: S1 the security store writes under the given
  //   path; S2 a sentinel "default profile" directory gains NO such file;
  //   S3 the module store reads/writes under the given path only.
  // -------------------------------------------------------------------------
  it('SEAM-2b (§3.5 SEAM-2) — a store handed the override path writes there and leaves the default profile alone (guard, passes today)', () => {
    const override = freshDir('override')
    const defaultProfile = freshDir('default')
    try {
      const secPath = join(override, 'provident-security.json')
      const store = createSecurityStore({ path: secPath })
      store.set({ token: 'scratch-only' })
      expect(existsSync(secPath), '§3.5 SEAM-2: the store file lands under the OVERRIDE').toBe(true)
      expect(
        existsSync(join(defaultProfile, 'provident-security.json')),
        '§3.5 SEAM-2: "the default profile gains **no** such file"',
      ).toBe(false)

      const modPath = join(override, 'provident-modules.json')
      const modStore = createModuleStore({ path: modPath })
      modStore.put({ name: 'probe', version: '0.0.1', source: 'return 1' } as unknown as ModuleRecord)
      expect(existsSync(modPath), '§3.5 SEAM-2: the module registry lands under the OVERRIDE').toBe(true)
      expect(modStore.list().length, '§3.5 SEAM-2: the module store read from its own path').toBe(1)
      expect(
        existsSync(join(defaultProfile, 'provident-modules.json')),
        '§3.5 SEAM-2/§3.0 R0(c): the default profile gains no module registry either',
      ).toBe(false)
    } finally {
      rmSync(override, { recursive: true, force: true })
      rmSync(defaultProfile, { recursive: true, force: true })
    }
  })

  // -------------------------------------------------------------------------
  // `SEAM-3` — Two overrides are independent.
  // States: S1 the override is resolved PER BOOT from `process.argv` inside
  //   `main()` (so two boots cannot share state — each boot is a process);
  //   S2 the resolution is not a module-scope constant.
  // Fail-state (§3.5 SEAM-3): any cross-read ⇒ `R0`(a)/(b) fails.
  // -------------------------------------------------------------------------
  it('SEAM-3a (§3.5 SEAM-3, ADD-2) — the override is resolved per boot from process.argv (RED today)', () => {
    expect(SEAM_AT, SEAM_APPLIED).toBeGreaterThanOrEqual(0)
    const scanAt = MAIN_SRC.search(OVERRIDE_FLAG)
    expect(scanAt, '§4.2 ADD-2: the override flag must exist on the process command line').toBeGreaterThanOrEqual(0)
    expect(
      scanAt > MAIN_FN_AT,
      '§3.5 SEAM-3: two boots with two different overrides must be independent — the override is resolved inside `main()` for THIS process, never at module scope',
    ).toBe(true)
    expect(
      MAIN_SRC.slice(scanAt, SECURITY_STORE_AT),
      '§4.2 ADD-2: the override is read from the process\'s own argv',
    ).toMatch(/process\.argv|argv/)
  })

  // -------------------------------------------------------------------------
  // `SEAM-3`'s BEHAVIOURAL HALF. GUARD (passes today): two stores at two paths
  // neither see nor write each other's file. States: S1 both files exist
  //   independently; S2 neither boot's state leaks into the other.
  // -------------------------------------------------------------------------
  it('SEAM-3b (§3.5 SEAM-3) — two overridden stores neither see nor write each other\'s file (guard, passes today)', () => {
    const dirA = freshDir('a')
    const dirB = freshDir('b')
    try {
      const pathA = join(dirA, 'provident-security.json')
      const pathB = join(dirB, 'provident-security.json')
      const a = createSecurityStore({ path: pathA })
      a.set({ token: 'A-token', groups: ['code'] })
      const b = createSecurityStore({ path: pathB })
      expect(b.get().token, '§3.5 SEAM-3: boot B must not see boot A\'s store').toBeNull()
      expect(b.get().enabled, '§3.5 SEAM-3: boot B keeps its own defaults').toEqual(['read', 'dispatch'])
      // the store persists on the first `set` (it is lazy on a missing file), so
      // B's own file is materialised by B's OWN write — never by A's.
      b.set({})
      expect(a.get().token, '§3.5 SEAM-3: boot A still holds its own state').toBe('A-token')
      expect(a.get().enabled).toContain('code')
      expect(existsSync(pathA) && existsSync(pathB), '§3.5 SEAM-3: "both files exist independently"').toBe(true)

      // S2 — neither file carries the other's state.
      const onA = JSON.parse(readFileSync(pathA, 'utf8')) as { token: string | null }
      const onB = JSON.parse(readFileSync(pathB, 'utf8')) as { token: string | null }
      expect(onA.token).toBe('A-token')
      expect(onB.token).toBeNull()
    } finally {
      rmSync(dirA, { recursive: true, force: true })
      rmSync(dirB, { recursive: true, force: true })
    }
  })

  // -------------------------------------------------------------------------
  // `SEAM-4` — the override does not flip a security default. GUARD HALF
  // (passes today). States: S1 the *default* enabled-group set is `read` +
  //   `dispatch` and does NOT include `code`; S2 `main.ts` constructs the
  //   security store with NO `enabled`/`groups` argument, i.e. the seam widens
  //   nothing; S3 `code` is still a VALID group (opt-in only).
  // Pass condition (§3.5): "the defaults are identical in both boots; `code` is
  //   ON only where the leg opted in". Fail state: a widened default ⇒
  //   PROCESS VIOLATION (§0 prohibition 3; §4.3's rejected alternative).
  // -------------------------------------------------------------------------
  it('SEAM-4a (§3.5 SEAM-4, ADD-4) — the default enabled-group set is untouched and the seam widens nothing (guard, passes today)', () => {
    const dir = freshDir('widening')
    try {
      const store = createSecurityStore({ path: join(dir, 'provident-security.json') })
      expect(store.get().enabled, '§3.5 SEAM-4/§0 prohibition 3: the default is `read`+`dispatch`, never widened').toEqual([
        'read',
        'dispatch',
      ])
      expect(store.get().enabled, '§3.5 SEAM-4: `code` is OFF unless the operator/leg opts in').not.toContain('code')
      // S3 — `code` remains a valid, opt-in group (§3.2's eval gate).
      expect(store.set({ groups: ['code'] }).enabled, '§3.2: `code` stays opt-in, not default').toContain('code')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }

    expect(
      /createSecurityStore\(\{[^}]*?(enabled|groups)\s*:/.test(MAIN_SRC),
      '§4.3 (rejected alternative)/§0 prohibition 3: the app must NOT construct its security store with a flipped/extended default group set',
    ).toBe(false)
    expect(
      /(enabled|groups)\s*:\s*\[[^\]]*['"]code['"]/.test(MAIN_SRC),
      '§4.3 (rejected alternative)/§3.5 SEAM-4: the app must not widen the default group set with `code`',
    ).toBe(false)
    expect(
      /VALID_GROUPS/.test(MAIN_SRC),
      '§0 prohibition 5/§4.2 ADD-6: `src/main/security-store.ts` owns `VALID_GROUPS`; the one seam may not touch that vocabulary',
    ).toBe(false)
  })

  // -------------------------------------------------------------------------
  // `SEAM-4`'s RED HALF + §3.2's eval-gate bound. States: S1 the leg enables
  //   `code` ONLY inside its own scratch profile, by writing that scratch
  //   profile's store file (§3.2: "The leg may enable the `code` group … **only
  //   inside the leg's own scratch profile** — it may NEVER enable `code`
  //   against the developer's real profile"); S2 the write is a scratch/temp
  //   path; S3 the real profile is never named (adversarial seed U-3).
  // Fail-state: a `code`-group grant against the real profile ⇒ SECURITY
  //   finding.
  // -------------------------------------------------------------------------
  it('SEAM-4b (§3.2 eval-gate bound / §3.5 SEAM-4) — `code` is enabled only by writing the leg\'s own scratch store (RED today)', () => {
    expect(LEG_SRC, LEG_ABSENT).not.toBeNull()
    if (LEG_SRC === null) return

    expect(
      LEG_SRC,
      '§3.2: the leg opts in by writing its own scratch profile\'s `provident-security.json`',
    ).toMatch(/provident-security\.json/)
    expect(LEG_SRC, '§3.2: the opt-in is a file write, not a flag that widens the default').toMatch(/writeFileSync/)
    expect(LEG_SRC, '§3.2/§3.4: the opted-in group is `code`').toMatch(/['"]code['"]/)
    expect(LEG_SRC, '§3.2: the scratch store lives in a temp profile').toMatch(/tmpdir\s*\(/)
    expect(LEG_SRC, "§3.2/§3.0 R0(c): `code` must NEVER be enabled against the developer's real profile").not.toMatch(
      /\.config\/Electron/,
    )
  })

  // -------------------------------------------------------------------------
  // §3.0 `R0`(c) — ISOLATION, host half: "the app never read the developer's
  // persisted security store — i.e. neither boot resolved its store file under
  // the default/real userData directory."
  // States: S1 the leg boots TWICE, each with its own scratch profile (the
  //   `[U]` half, asserted structurally — see §3.0's `R0` note); S2 the seam
  //   consumes the override so the boot's stores resolve under it (the `[H]`
  //   half).
  // Fail-state (verbatim, §3.0 R0): "(c) failing ⇒ the seam is not doing its
  //   job or is not being honoured ⇒ a HOST finding fixed here (with a
  //   red-first regression row), never a pass, never a skip."
  // -------------------------------------------------------------------------
  it('R0(c) (§3.0 R0(c)) — neither boot resolves its store under the default/real profile (RED today)', () => {
    expect(LEG_SRC, LEG_ABSENT).not.toBeNull()
    if (LEG_SRC === null) return

    // S1 — two boots, one scratch profile each (§3.0 R0: "spawns the app twice
    // — once per scratch profile"). The creator NAME is not pinned (§2.1 item
    // 2), so the predicate is a family.
    const bootProfiles = LEG_SRC.match(/--user-data-dir|freshProfile|scratchProfile|newProfile/g) ?? []
    expect(
      bootProfiles.length,
      '§3.0 R0: TWO boots, once per scratch profile — at least two profile passes are required',
    ).toBeGreaterThanOrEqual(2)
    expect(LEG_SRC, '§3.0 R0/§6 DIS-5: each boot\'s profile is a fresh temp dir').toMatch(/mkdtempSync\s*\(/)

    // S2 — the seam honours what the leg passes (§3.5 SEAM-2 / ADD-3).
    expect(SEAM_AT, SEAM_APPLIED).toBeGreaterThanOrEqual(0)
    expect(
      SEAM_AT < SECURITY_STORE_AT,
      '§3.0 R0(c)/§4.2 ADD-1: without the seam above the store reads, a boot cannot resolve its store under its own profile',
    ).toBe(true)
    expect(
      MAIN_SRC.includes(DEFAULT_SECURITY_STORE_PATH),
      '§4.2 ADD-1/ADD-4: the default derivation must remain the absent-case fallback (the seam adds, never replaces)',
    ).toBe(true)
  })
})
