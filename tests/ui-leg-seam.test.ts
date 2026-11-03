// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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
//   * a BEHAVIOURAL half over the landed stores (`createOperatorSettings`, whose
//     instance owns the operator record under the `userDataDir` it is handed, and
//     `createProfileStore`, which takes a `filePath`), which PASSES today and is the
//     guard that the seam may not weaken what it sits above. **`createModuleStore`
//     STOOD HERE AS THE SECOND STORE UNTIL 2026-11-02**: it, `src/main/module-store.ts`
//     and the `provident-modules.json` it wrote are DELETED with the Q-5 arm (`D-78`'s
//     second clause, the user's ruling, `D-81`), so the second store the seam must
//     precede is the boot's OWN — the normal crossing, `createProfileStore` at
//     `src/main/main.ts:150`-class at `src/main/main.ts:150`-class, over `provident-profile.json`.
//     The rows' claims are unmoved; their SECOND STORE is the one the product has.
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
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createOperatorSettings } from '../src/main/operator-settings/index.js'
// THE SECOND STORE THE SEAM MUST PRECEDE IS THE BOOT'S OWN (2026-11-02, `D-81`): the module store this
// file used to import is deleted with the Q-5 arm, and what a boot opens now is `createProfileStore`
// over `<userData>/provident-profile.json` — the normal crossing (`D-78`'s item (a)).
import { createProfileStore } from '../src/main/storeroom.js'
import { PROFILE_FILE_NAME } from '../src/main/data/store.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MAIN_PATH = join(ROOT, 'src', 'main', 'main.ts')
const LEG_PATH = join(ROOT, 'scripts', 'electron-ui.mjs')

const MAIN_SRC = readFileSync(MAIN_PATH, 'utf8')
/** **`main.ts` WITH ITS `//` LINES ELIDED (2026-11-02, `D-81`).** `SEAM-1a`'s new absence limb asserts
 *  that the deleted module registry is named NOWHERE in the composition — and the composition carries a
 *  comment where the arm stood that must NAME the file it says is no longer read. A bare `toMatch` on the
 *  raw source cannot tell prose from a reader, so the absence limb reads the CODE while every other row
 *  here keeps reading the raw file it always read. Same idiom as `tests/store-persist.test.ts`'s
 *  `rendererCommentElided`/`mainCommentElided` (`G4-P2`) and `store-security.test.ts`'s `awaitMainCode`. */
const MAIN_CODE = MAIN_SRC.split('\n').filter((line) => !line.trimStart().startsWith('//')).join('\n')
const OPERATOR_SETTINGS_PATH = join(ROOT, 'src', 'main', 'operator-settings', 'index.ts')
const OPERATOR_SETTINGS_SRC = readFileSync(OPERATOR_SETTINGS_PATH, 'utf8')
const LEG_SRC: string | null = existsSync(LEG_PATH) ? readFileSync(LEG_PATH, 'utf8') : null
const LEG_ABSENT =
  'scripts/electron-ui.mjs does not exist — spec §2 item 1 ("NEW — the leg itself … does not exist") / §7 item 1'

/** §4.2 `ADD-1` — the composition's carrier AS LANDED (`src/main/main.ts:108`), the expression the
 *  seam must sit above and the landed `app.getPath('userData')` derivation the absent case keeps.
 *  The surface module owns the persisted-file names (§2 C-4), so this file spells no
 *  `provident-*.json` literal for the operator record.
 *  **⟶ RE-GRAINED 2026-11-03 (`D-104`), AND THE CLAIM IS UNMOVED.** The constant was the ONE-LINE literal
 *  `createSettingsSurface({ userDataDir: app.getPath('userData') })`; this pass gives that option object a SECOND member —
 *  the app-state rows' change push — so the one-liner became a multi-line object and a byte-for-byte `toContain` over the
 *  whole call would have measured the FORMATTING rather than the derivation. What `ADD-1`/`ADD-4` claim is that the carrier
 *  is still constructed on the LANDED `app.getPath('userData')` derivation — the absent-case fallback the seam adds to and
 *  never replaces — so the constant is now the derivation EXPRESSION alone, which survives any option the carrier gains. */
const SETTINGS_CARRIER = "userDataDir: app.getPath('userData')"
/* **THE SECOND LANDED DERIVATION IS THE PROFILE STORE'S (2026-11-02, `D-81`).** It was
 * `join(app.getPath('userData'), 'provident-modules.json')` — the deleted module registry's path. The
 * boot derives its ONE profile-store path the same way, from `PROFILE_FILE_NAME`, and that is what the
 * absent case must keep. `main.ts` no longer spells the legacy name at all (not read, not removed). */
const DEFAULT_PROFILE_STORE_PATH = "join(app.getPath('userData'), PROFILE_FILE_NAME)"

/** §2 C-1 — the group set's SECOND LIVE COPY: six members, re-homed with the file at
 *  `src/main/operator-settings/index.ts:77` (the other live copy, `src/main/security.ts:159`, does
 *  not move). The seam may not touch that vocabulary, and neither copy may gain or lose a name. */
const GROUP_VOCABULARY = /const VALID_GROUPS: ReadonlySet<string> = new Set\(\[([^\]]*)\]\)/

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

/** §4.2 `ADD-1` — the seam sits INSIDE `main()` and ABOVE the carrier's construction. */
const MAIN_FN_AT = MAIN_SRC.search(/async function main\s*\(/)
const SETTINGS_CARRIER_AT = MAIN_SRC.search(/createSettingsSurface\s*\(\s*\{/)
/* The second store's construction site — `createProfileStore(...)` (2026-11-02, `D-81`; it was
 * `createModuleStore(...)`, deleted with the Q-5 arm). */
const PROFILE_STORE_AT = MAIN_SRC.search(/createProfileStore\s*\(/)

/** Where the override is APPLIED, if anywhere (`-1` = no seam). `ADD-2` admits
 *  two routes, so this is a disjunction: (a) `app.setPath('userData', …)`, or
 *  (b) the settings carrier no longer carrying the landed derivation expression
 *  (the override is then carried into the carrier's own `userDataDir`). */
function seamApplyAt(src: string): number {
  const setPath = src.search(SETPATH)
  if (setPath !== -1) return setPath
  if (!src.includes(SETTINGS_CARRIER)) return src.search(/createSettingsSurface\s*\(\s*\{/)
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
  // States: S1 both landed derivations still present — the settings carrier on its
  //   `app.getPath('userData')` expression, and the module-store path (§4.2 ADD-1);
  //   S2 the argv-scan idiom the seam must reuse is unchanged (§4.2 ADD-2);
  //   S3 first-run defaults unchanged: a missing record yields
  //   `['read','dispatch']` / token null (behavioural, via the landed instance).
  // Pass condition (§3.5): "the store path and the first-run defaults are
  //   **unchanged** when the override is absent". Fail state: any observable
  //   difference ⇒ the seam is not additive ⇒ review finding, revert it.
  // -------------------------------------------------------------------------
  it('SEAM-1a (§3.5 SEAM-1, ADD-4) — absent ⇒ the landed path derivation and first-run defaults are unchanged (guard, passes today)', () => {
    expect(MAIN_SRC, '§4.2 ADD-1: the landed settings carrier, on its `app.getPath(\'userData\')` derivation, must survive the seam').toContain(
      SETTINGS_CARRIER,
    )
    // ⟶ RE-DERIVED (`D-81`, 2026-11-02). OLD: the module store's path derivation
    // (`join(app.getPath('userData'), 'provident-modules.json')`) had to survive the seam. NEW: that
    // store and its file are deleted with the Q-5 arm, so the SECOND landed derivation this row keeps
    // is the boot's own profile-store path — `join(app.getPath('userData'), PROFILE_FILE_NAME)` — which
    // is the normal crossing the seam must sit above. **AND THE DELETED NAME'S ABSENCE IS ASSERTED
    // HERE**, so the re-derivation closes in both directions: the survivor must stand, the dropped one
    // must not be spelled (not read, not removed — the file is left on disk UNREAD).
    expect(MAIN_SRC, '§4.2 ADD-1: the landed profile-store path derivation must survive the seam').toContain(
      DEFAULT_PROFILE_STORE_PATH,
    )
    expect(MAIN_CODE, '§3.5 SEAM-1/`D-81`: the legacy module registry is dropped, not migrated — src/main/main.ts spells neither its path nor a removal for it').not.toMatch(
      /provident-modules\.json|rmSync\s*\(/,
    )
    expect(MAIN_SRC, '§4.2 ADD-2: the argv-scan idiom the override reuses must be intact').toMatch(/function transportFromArgs\s*\(/)
    expect(MAIN_SRC, '§4.2 ADD-2: the argv-scan idiom the override reuses must be intact').toMatch(/function portFromArgs\s*\(/)

    // S3 — behavioural: the first-run default is the landed `read`+`dispatch`, read through the
    // instance's own declared surface (`createOperatorSettings({ userDataDir })` + `read()`).
    const dir = freshDir('defaults')
    try {
      const settings = createOperatorSettings({ userDataDir: dir })
      const record = settings.read()
      expect(record.enabled, '§3.5 SEAM-1/SEAM-4: the first-run default is `read`+`dispatch`').toEqual(['read', 'dispatch'])
      expect(record.token, '§3.5 SEAM-1: first-run token default is null').toBeNull()
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
      SETTINGS_CARRIER,
    )
  })

  // -------------------------------------------------------------------------
  // `SEAM-2` — Present ⇒ the override applies BEFORE the carrier is constructed.
  // States: S1 the override application exists at all (ADD-3); S2 it sits
  //   INSIDE `main()` (ADD-1: "the seam sits above line 49 in `main()`");
  //   S3 it precedes `createSettingsSurface(...)`; S4 it precedes
  //   `createProfileStore(...)` (§3.5: "BOTH stores are created against the
  //   overridden path" — re-derived 2026-11-02, `D-81`: the second store was
  //   `createModuleStore(...)` and is deleted with the Q-5 arm, so the second
  //   store the seam must precede is the boot's own normal crossing).
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
    expect(SETTINGS_CARRIER_AT, 'src/main/main.ts must still construct the settings carrier (ADD-1)').toBeGreaterThanOrEqual(0)
    expect(PROFILE_STORE_AT, 'src/main/main.ts must still construct the boot\'s profile store (ADD-1; `D-81` — the module store that stood here is deleted)').toBeGreaterThanOrEqual(0)
    expect(
      SEAM_AT > MAIN_FN_AT,
      '§4.2 ADD-1: "the seam sits above line 49 in `main()`" — the override must be applied inside `main()`, not at module scope',
    ).toBe(true)
    expect(
      SEAM_AT < SETTINGS_CARRIER_AT,
      '§4.2 ADD-1: the override is honoured BEFORE `createSettingsSurface(...)` — the carrier the operator record is built behind',
    ).toBe(true)
    expect(
      SEAM_AT < PROFILE_STORE_AT,
      '§3.5 SEAM-2: BOTH stores are created against the overridden path — the profile store too (`D-81`)',
    ).toBe(true)
  })

  // -------------------------------------------------------------------------
  // `SEAM-2`'s BEHAVIOURAL HALF. GUARD (passes today): the landed module store
  // already honours the `path` it is handed, which is what makes the seam's
  // override effective. States: S1 the module store reads/writes under the given
  //   path only; S2 a sentinel "default profile" directory gains NO such file.
  //
  // RETIRED HALF (E-1; C-4): S1's security-store clause drove
  //   `createSecurityStore({ path })` and `store.set({ token })` and asserted
  //   that a `provident-security.json` was WRITTEN under the override. That
  //   store, its five-member API and that write no longer exist anywhere: the
  //   retired name is READ at most once by the instance's import-once path and
  //   never written (`src/main/operator-settings/index.ts:81`, `:167`), and the
  //   record's own name is the added `provident-operator-settings.json`. The
  //   row is not re-pointed; the module half is the same claim over the store
  //   that still stands.
  // -------------------------------------------------------------------------
  it('SEAM-2b (§3.5 SEAM-2) — a store handed the override path writes there and leaves the default profile alone (guard, passes today; re-derived 2026-11-02 to the boot\'s PROFILE store, `D-81`)', () => {
    // ⟶ **RE-DERIVED, NOT WEAKENED (`D-81`).** AS FILED this drove `createModuleStore({ path })`, `put`
    // and `list` over the override's `provident-modules.json`. That store is deleted and the file it
    // wrote is dropped, so the drive moves to the store a boot actually opens against the override —
    // the NORMAL CROSSING, `createProfileStore` over `<override>/provident-profile.json` — and the
    // claim is kept WHOLE and driven harder: the construction CREATES the file at the override, a
    // written row lands BYTES there (a construction-only file is zero-length, `D-80`'s measurement), and
    // the default profile gains neither.
    const override = freshDir('override')
    const defaultProfile = freshDir('default')
    try {
      const profilePath = join(override, PROFILE_FILE_NAME)
      const store = createProfileStore({ filePath: profilePath })
      expect(existsSync(profilePath), '§3.5 SEAM-2: the profile store lands under the OVERRIDE').toBe(true)
      store.write(['probe'] as never, 'file', { at: 'override' })
      expect(statSync(profilePath).size, '§3.5 SEAM-2: a row written through the store lands BYTES under the override (not merely a created, empty file)').toBeGreaterThan(0)
      expect(
        existsSync(join(defaultProfile, PROFILE_FILE_NAME)),
        '§3.5 SEAM-2/§3.0 R0(c): the default profile gains no store file either',
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
      MAIN_SRC.slice(scanAt, SETTINGS_CARRIER_AT),
      '§4.2 ADD-2: the override is read from the process\'s own argv',
    ).toMatch(/process\.argv|argv/)
  })

  // -------------------------------------------------------------------------
  // `SEAM-3`'s BEHAVIOURAL HALF — RETIRED WHOLE (E-1).
  //
  // The row was "two overridden stores neither see nor write each other's file":
  // it constructed two `createSecurityStore({ path })` instances, wrote
  // `{ token, groups }` through `set()`, read them back through `get()`, and
  // parsed the two `provident-security.json` files off disk. Its subject is
  // E-1's five-member API (`createSecurityStore` / `SecurityStore` / `set` /
  // `get`) together with the retired name AS A WRITE TARGET and the old on-disk
  // record shape — every one of those is gone from the composition, and the
  // behaviour they guarded (two boots' records not crossing) has no site left to
  // drive: the instance's own file is the added `provident-operator-settings.json`,
  // its own address space is private to `src/main/operator-settings/index.ts`, and
  // per-boot isolation is now observed at the leg (`R0`(c)'s before/after witness,
  // rows `SEAM-R0(c)-a`/`-b` below). Per the closed rule this row retires rather
  // than being re-pointed at the new module.
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // `SEAM-4` — the override does not flip a security default. GUARD HALF
  // (passes today). States: S1 the *default* enabled-group set is `read` +
  //   `dispatch` and does NOT include `code`; S2 `main.ts` constructs the
  //   settings carrier with NO `enabled`/`groups` argument, i.e. the seam widens
  //   nothing; S3 `code` is still a VALID group (opt-in only).
  // Pass condition (§3.5): "the defaults are identical in both boots; `code` is
  //   ON only where the leg opted in". Fail state: a widened default ⇒
  //   PROCESS VIOLATION (§0 prohibition 3; §4.3's rejected alternative).
  //
  // S3's RETIRED DRIVE (E-1): the row used to prove the vocabulary by
  //   `store.set({ groups: ['code'] })` on the deleted security store. That verb
  //   is gone and is NOT re-pointed at the new module; the same claim — `code` is
  //   a valid, opt-in group and never a default — is read at the vocabulary's
  //   LANDED home instead (`src/main/operator-settings/index.ts:77`, six members;
  //   §2 C-1).
  // -------------------------------------------------------------------------
  it('SEAM-4a (§3.5 SEAM-4, ADD-4) — the default enabled-group set is untouched and the seam widens nothing (guard, passes today)', () => {
    const dir = freshDir('widening')
    try {
      const settings = createOperatorSettings({ userDataDir: dir })
      const record = settings.read()
      expect(record.enabled, '§3.5 SEAM-4/§0 prohibition 3: the default is `read`+`dispatch`, never widened').toEqual([
        'read',
        'dispatch',
      ])
      expect(record.enabled, '§3.5 SEAM-4: `code` is OFF unless the operator/leg opts in').not.toContain('code')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }

    // S3 — `code` remains a valid, opt-in group (§3.2's eval gate), read at the
    // group set's second live copy (§2 C-1) rather than driven through the retired
    // store's `set()`.
    const vocabulary = GROUP_VOCABULARY.exec(OPERATOR_SETTINGS_SRC)
    expect(
      vocabulary,
      '§2 C-1: the group set\'s second live copy lives in `src/main/operator-settings/index.ts:77`',
    ).not.toBeNull()
    const groups = [...(vocabulary as RegExpExecArray)[1].matchAll(/'([a-z0-9]+)'/g)].map((m) => m[1])
    expect(groups, '§3.2: `code` stays opt-in, not default').toContain('code')
    expect(groups.slice().sort(), '§2 C-1: still SIX members — the re-homed copy lost none and gained none').toEqual([
      'code',
      'data',
      'dispatch',
      'graph',
      'module',
      'read',
    ])

    expect(
      /createSettingsSurface\(\{[^}]*?(enabled|groups)\s*:/.test(MAIN_SRC),
      '§4.3 (rejected alternative)/§0 prohibition 3: the app must NOT construct its settings carrier with a flipped/extended default group set',
    ).toBe(false)
    expect(
      /(enabled|groups)\s*:\s*\[[^\]]*['"]code['"]/.test(MAIN_SRC),
      '§4.3 (rejected alternative)/§3.5 SEAM-4: the app must not widen the default group set with `code`',
    ).toBe(false)
    expect(
      /VALID_GROUPS/.test(MAIN_SRC),
      '§0 prohibition 5/§4.2 ADD-6: `src/main/operator-settings/index.ts:77` owns `VALID_GROUPS`; the one seam may not touch that vocabulary',
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
      SEAM_AT < SETTINGS_CARRIER_AT,
      '§3.0 R0(c)/§4.2 ADD-1: without the seam above the carrier\'s construction, a boot cannot resolve its record under its own profile',
    ).toBe(true)
    expect(
      MAIN_SRC.includes(SETTINGS_CARRIER),
      '§4.2 ADD-1/ADD-4: the default derivation (`app.getPath(\'userData\')`, carried by `createSettingsSurface`) must remain the absent-case fallback (the seam adds, never replaces)',
    ).toBe(true)
  })
})

// ===========================================================================
// ADVERSARIAL FINDING `G-4` (MED) — the seam file's HALF of the re-point
// ===========================================================================
//
// §3b's `G-4` names the seam `R0`(c) row's **string-count** as the same class as
// the contract file's `R0`…`R4` rows: the row asserted how many times the
// identifiers `--user-data-dir`/`scratchProfile`/… appear in the leg's text, so a
// leg with the right COUNT and the wrong BEHAVIOUR stayed green, and the row could
// not falsify the one thing `R0`(c) now claims: that the operator profile was
// OBSERVED before and after the run and COMPARED.
//
// The observation itself is the leg's (the `G-2` fix): `operatorProfileState()`
// read before the run and after it, and `operatorProfileUnchanged(before, after)`
// as the comparison. This block RUNS that comparison, out of the leg's own source,
// on states a break must distinguish — and then RUNS the `R0`(c) row's own
// predicate against the witness's verdict, so a row that prints the witness but
// keeps its condition independent of it reddens. A string count cannot do either.
describe('G-4 falsifiability — the seam-side `R0`(c) witness is RUN, not counted', () => {
  /** The leg's own `function NAME(…) { … }`, extracted verbatim. */
  function legFunction(name: string): string {
    const re = new RegExp(`^(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\(`, 'm')
    const m = re.exec(LEG_SRC as string)
    expect(
      m,
      `G-4 falsifiability: the leg has no top-level \`function ${name}\` — the operator-profile witness IS the observation \`R0\`(c) claims, so a renamed/removed one fails this row rather than skipping it`,
    ).not.toBeNull()
    const from = (m as RegExpExecArray).index + (m as RegExpExecArray)[0].length
    const braceOpen = (LEG_SRC as string).indexOf('{', from)
    expect(braceOpen, `G-4 falsifiability: \`function ${name}\` carries no body`).toBeGreaterThan(0)
    // walk the body with a brace counter that ignores strings/templates/comments
    let depth = 0
    let close = -1
    for (let i = braceOpen; i < (LEG_SRC as string).length && close === -1; i += 1) {
      const ch = (LEG_SRC as string)[i]
      if (ch === '{') depth += 1
      else if (ch === '}') {
        depth -= 1
        if (depth === 0) close = i
      }
    }
    expect(close, `G-4 falsifiability: \`function ${name}\` is not brace-balanced`).toBeGreaterThan(0)
    return (LEG_SRC as string).slice((m as RegExpExecArray).index, close + 1)
  }

  const WITNESS_STATE = (mtimeMs: number | null, present: boolean): Array<Record<string, unknown>> => [
    {
      profile: '/home/operator/.config/app',
      exists: true,
      files: {
        'provident-security.json': { present, mtimeMs, size: present ? 10 : null },
        'provident-operator-settings.json': { present: false, mtimeMs: null, size: null },
        'provident-profile.json': { present: false, mtimeMs: null, size: null },
      },
    },
  ]

  it('SEAM-R0(c)-a (§3.0 R0(c) / the `G-2` witness) — the leg\'s own before/after comparison RUNS: a moved operator profile is caught, an unchanged one passes', () => {
    expect(LEG_SRC, LEG_ABSENT).not.toBeNull()
    if (LEG_SRC === null) return
    const decl = legFunction('operatorProfileUnchanged')
    const unchanged = new Function('join', `${decl}\nreturn operatorProfileUnchanged`)(join) as (
      b: Array<Record<string, unknown>>,
      a: Array<Record<string, unknown>>,
    ) => { unchanged: boolean; diffs: string[] }

    // S1 — the equal state (the run touched nothing): unchanged.
    expect(
      unchanged(WITNESS_STATE(1000, true), WITNESS_STATE(1000, true)).unchanged,
      '§3.0 R0(c): an operator profile that did not move ⇒ the witness reports unchanged (the pass state)',
    ).toBe(true)

    // S2 — the three ways a boot can touch the operator profile, each of which a
    // reverted/skipped comparison would miss:
    //   (i) the store's mtime moved (the app wrote it),
    //   (ii) the store appeared (it was absent before),
    //   (iii) the directory itself appeared/was removed.
    const moved = unchanged(WITNESS_STATE(1000, true), WITNESS_STATE(2000, true))
    expect(moved.unchanged, '§3.0 R0(c): a boot that WROTE the operator store moves its mtime ⇒ NOT unchanged').toBe(false)
    expect(moved.diffs.join(' '), '§3.0 R0(c): the diff NAMES the file that moved, so the failure is legible evidence').toContain(
      '/home/operator/.config/app/provident-security.json',
    )
    expect(
      unchanged(WITNESS_STATE(null, false), WITNESS_STATE(1500, true)).unchanged,
      '§3.0 R0(c): a store APPEARING under the operator profile ⇒ NOT unchanged',
    ).toBe(false)
    expect(
      unchanged(WITNESS_STATE(1000, true), [
        {
          profile: '/home/operator/.config/app',
          exists: false,
          files: { 'provident-security.json': { present: true, mtimeMs: 1000, size: 10 }, 'provident-operator-settings.json': { present: false, mtimeMs: null, size: null }, 'provident-profile.json': { present: false, mtimeMs: null, size: null } },
        },
      ]).unchanged,
      '§3.0 R0(c): the operator directory itself vanishing/being created ⇒ NOT unchanged',
    ).toBe(false)
    expect(
      unchanged(WITNESS_STATE(1000, true), [{ profile: '/home/operator/.config/other', exists: true, files: {} }]).unchanged,
      '§3.0 R0(c): a candidate that is not observed AFTER the run is caught — a witness that silently skipped a missing path would compare nothing',
    ).toBe(false)

    // S3 — the comparison is the leg's OWN, and it is a pure function of the two
    // states (no I/O, no environment read, no early `return true`).
    const declCommentsStripped = decl.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
    expect(
      declCommentsStripped,
      '§3.0 R0(c): the comparison may not short-circuit to a constant — every path depends on the states it was handed',
    ).not.toMatch(/return\s+true\s*;?\s*\n\s*}/)
    expect(
      (LEG_SRC as string),
      '§3.0 R0(c)/`G-2`: the witness\'s BEFORE and AFTER states are taken from the leg\'s own state reader',
    ).toMatch(/operatorProfileBefore\s*=\s*operatorProfileState\(\)/)
    expect(
      (LEG_SRC as string),
      '§3.0 R0(c)/`G-2`: … and its AFTER state too — a single read would compare nothing',
    ).toMatch(/operatorProfileAfter\s*=\s*operatorProfileState\(\)/)
  })

  it('SEAM-R0(c)-b (§3.0 R0(c)) — the `R0`(c) ROW consumes the witness verdict: a moved profile reddens the row, and the row\'s assertion is the OBSERVATION, not a path spelling', () => {
    expect(LEG_SRC, LEG_ABSENT).not.toBeNull()
    if (LEG_SRC === null) return

    // The row's own call site, taken verbatim (label + predicate), so the row is
    // RUN rather than restated.
    const rowAt = (LEG_SRC as string).indexOf("R0(c) neither boot read/wrote")
    expect(rowAt, '§3.0 R0(c): the leg must carry its `R0`(c) row').toBeGreaterThanOrEqual(0)
    const callAt = (LEG_SRC as string).lastIndexOf('row(', rowAt)
    expect(callAt, '§3.0 R0(c): the labelled `R0`(c) line is a `row(...)` call').toBeGreaterThanOrEqual(0)
    const callText = (LEG_SRC as string).slice(callAt, (LEG_SRC as string).indexOf('\n  )', rowAt) + 4)
    expect(callText, '§3.0 R0(c): the row\'s predicate is a real expression').toMatch(/operatorWitness\.unchanged/)
    expect(
      callText,
      '§3.0 R0(c)/`G-4`: the row\'s condition depends on ALL THREE halves — the seeded scratch store, the code-group surface and the witness verdict',
    ).toMatch(/seededStoreIntact\s*&&\s*codeToolsOn\s*&&\s*operatorWitness\.unchanged/)

    // The predicate itself, evaluated with the witness in each state. (The halves
    // are identifiers in the row's own scope, so they are supplied here.)
    const run = (scope: Record<string, unknown>): boolean => {
      const names = Object.keys(scope)
      return (new Function(...names, 'return (seededStoreIntact && codeToolsOn && operatorWitness.unchanged)') as (
        ...args: unknown[]
      ) => boolean)(...names.map((n) => scope[n]))
    }
    expect(
      run({ seededStoreIntact: true, codeToolsOn: true, operatorWitness: { unchanged: true } }),
      '§3.0 R0(c): all halves hold ⇒ the row passes',
    ).toBe(true)
    expect(
      run({ seededStoreIntact: true, codeToolsOn: true, operatorWitness: { unchanged: false } }),
      '§3.0 R0(c)/`G-4`: the witness reporting the operator profile MOVED ⇒ the ROW FAILS — this is what the string-count row could not do',
    ).toBe(false)
    expect(
      run({ seededStoreIntact: false, codeToolsOn: true, operatorWitness: { unchanged: true } }),
      '§3.0 R0(c): a boot whose seeded store did not resolve under its scratch profile ⇒ the row fails',
    ).toBe(false)
    expect(
      run({ seededStoreIntact: true, codeToolsOn: false, operatorWitness: { unchanged: true } }),
      '§3.0 R0(c): the code-group surface a default/first-run store could not produce is part of the row',
    ).toBe(false)

    // And the reason the row may NOT be a path spelling: the leg's own §3.0 R0(c)
    // guard rows forbid naming the operator profile, so the witness DERIVES its
    // candidates at run time — the row cannot assert a literal path, and must
    // assert the observation instead.
    expect(
      LEG_SRC,
      '§3.0 R0(c) guard rows: the leg may not spell the operator profile path — which is exactly why the row must assert the witness OBSERVATION',
    ).not.toMatch(/homedir\s*\(/)
    expect(
      LEG_SRC,
      '§3.0 R0(c) guard rows: … and may not name `~/.config/Electron` either',
    ).not.toMatch(/\.config\/Electron/)
    expect(
      LEG_SRC,
      '§3.0 R0(c)/`G-2`: the candidates are derived from the operator\'s own environment at run time (a witness that covered the wrong directory would prove nothing)',
    ).toMatch(/XDG_CONFIG_HOME|process\.env\.HOME/)
  })
})
