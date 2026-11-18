// tests/integration/central-data/seam-census.test.ts — **A DECLARED FIGURE WITH NO LIVE WITNESS IS A DECLARATION
// THAT AGREES WITH ITSELF.** AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and
// GATES (`D-40`, `AGENTS.md`).
//
// WHAT THIS ROW EXISTS FOR, IN ONE SENTENCE: `src/main/storeroom.ts` publishes `STOREROOM_DECLARED_SURFACE` — the
// census of the installed `provident-storeroom` instance, `{ members, memberCount, symbolCount }` — and its
// `symbolCount` stood ONE BEHIND the package from `1.11.0` until this pass, on a figure no row measured live.
//
//   THE THREE READINGS THAT LET IT STAND, EACH A DIFFERENT HOLE:
//     * `tests/e2e/central-data/scenarios.test.ts`'s `S-9` asserts `STOREROOM_DECLARED_SURFACE.symbolCount === 13`
//       — **it reads the constant, so the constant is its own only witness**;
//     * `tests/storeroom-surface.test.ts`'s `S-1.1`/`S-1.2` DO pin the member list off a live
//       `createProfileStore()` — but that file's line 1 is `strata:marked-file rework`, so under `D-30` it reports
//       **on notice** and does not gate;
//     * **no row anywhere enumerated a live instance's own symbols at all.**
//   `U-2`/`U-9` apply the same principle to the built bundle — enumerate the artifact rather than trust the
//   declaration beside it, and let the failure message name the drift. `SC-1` does exactly that to the instance.
//
// WHY IT IS HERE, AND NOT SOMEWHERE ELSE — THE GRAIN, STATED ONCE:
//   * **NOT `tests/e2e/`.** `S-9` there is the constant-reading pin, and an `tests/e2e/` file is retained because it
//     states an agent-or-drive exchange AT A PROCESS BOUNDARY (`brief.md` §6, `D-30`). This row constructs an
//     in-process instance and exchanges nothing across a boundary, so it states no such claim.
//   * **NOT A UNIT/L3 GRAIN.** `src/main/storeroom.ts` is `central-data`'s OWN source and
//     `STOREROOM_DECLARED_SURFACE` is this module's declared surface, so its witness belongs in this module's
//     integration battery. The one existing unit-grain pin of the member list is a **marked** file, so a row
//     authored there would report on notice — which is precisely the hole this row closes.
//   * **A NEW FILE, NOT AN EDIT.** The four gating files beside this one (`bridge-route`, `declared-root`,
//     `message-log`, `value-arms`) each own a different subject, and the three marked files (`surface`,
//     `profile-file`, `registration`) are re-grained in place by their own dispositions. A row **authored after**
//     that sweep carries no marker and gates (`D-30`, `D-40`; prior text is kept rather than overwritten, `D-46`).
//   * **NO CO-OWNED-ARTIFACT DISCIPLINE APPLIES, AND THAT IS THE POINT.** This row reads **no file** — not
//     `package.json`, not `dist/`, not `node_modules` — only a live `createProfileStore()` instance. The figure's
//     subject is the CONSTRUCTED OBJECT, and a witness that read an artifact could only re-read a declaration.
//
// THE DECLARED REFERENCE'S OWN FIGURE IS **READ, NEVER SPELLED HERE** — the instruction this row was authored
// under, and the whole of its design: `symbolCount` is being re-grained `13 → 14` by this module's L3 designer in
// the same pass, so a `14` hardcoded below would be a THIRD copy of the figure and the row would agree with
// itself exactly as `S-9` does. The count assertion therefore reads `STOREROOM_DECLARED_SURFACE.symbolCount`, and
// **THE ROW REDS UNTIL THAT RE-GRAIN LANDS — naming the drift with both lists in the message.** That red is the
// row doing its job, and it is the reading a reader should expect from this head.
//
// **THE DECLARED NAME LIST BELOW IS THIS ROW'S OWN CENSUS AND IS PROVED FROM THE INSTALLED BYTES, ONE INSTALL SITE
// PER NAME** (`provident-storeroom@1.12.0`; a name asserted without a site would ship a red, which is worse than
// the defect this row closes). Every one of the fourteen is installed on the OBJECT (never on a record) and every
// one is installed before `storeCreate` answers:
//
//   `terminal-arm`          · `src/entry/state.mjs:86` — a computed method key on `storeCreate`'s instance object
//                             literal (`[TERMINAL_ARM](record) { … }`, `index.mjs:1789`; the literal opens at `:506`).
//   `forget-pair`           · `src/entry/state.mjs:136` — the same literal, `index.mjs:1796`.
//   `storeIndex`            · `src/entry/state.mjs:916` + `index.mjs:1859`'s `Object.defineProperty(instance, …)`.
//   `listen-route`          · `src/entry/delivery.mjs:307`, installed by `installListenRoute` (`:452`–`:460`),
//                             called at `index.mjs:1888`.
//   `registration-save`     · `src/entry/delivery.mjs:317`, `installRegistrationSave` (`:477`–`:489`), called at
//                             `index.mjs:1902`.
//   `registration-deliver`  · `src/entry/delivery.mjs:518`, `installRegistrationDelivery` (`:524`–`:532`), called
//                             at `index.mjs:1910` — **the name `1.11.0`'s delivery work added and `1.12.0` did not
//                             move**, i.e. the one the declared `13` was behind.
//   `register-body`         · `src/entry/delivery.mjs:260`, `installRegistrationSeam` (`:273`–`:285`), called at
//                             `index.mjs:2185`.
//   `attempt-count`         · `src/entry/state.mjs:199`, installed by `installAttemptSeam` (`:741`).
//   `attempt-opened`        · `src/entry/state.mjs:200`, the same install (`:749`).
//   `commit-scope`          · `src/entry/state.mjs:226`, the same install (`:788`).
//   `external-call`         · `src/entry/state.mjs:315`, the same install (`:812`).
//   `restart-drain`         · `src/entry/state.mjs:252`, the same install (`:853`).
//   `bump-mark`             · `src/entry/state.mjs:270`, the same install (`:870`).
//   `repair-leg`            · `src/entry/state.mjs:372`, the same install (`:885`) — **`installAttemptSeam` is
//                             called at `index.mjs:2179`, before the `return instance` at `:2186`.**
//
// **THAT IS FOURTEEN NAMES, AND THE COUNT IS A READING RATHER THAN A HOPE.** The fourteen rows above are the whole
// census of the installed tree, and no other site defines a symbol-keyed own property on the store: the literal's
// two computed keys plus **twelve** `Object.defineProperty` lines across `index.mjs` (`:1859`), `state.mjs`
// (`:741`, `:749`, `:788`, `:812`, `:853`, `:870`, `:885`) and `delivery.mjs` (`:273`, `:454`, `:479`, `:526`)
// are the fourteen; the thirteenth `defineProperty` line, `kernel-foundations.mjs:767`, is the POST-WRITE one below.
//
// **`storeIndex` IS camelCase, AND THE SHAPE ARM SAYS SO RATHER THAN GUESSING.** The character class below is
// `[A-Za-z]` and not `[a-z]` because `Symbol.for('provident-storeroom.storeIndex')` is the measured spelling of a
// member of this very set (`state.mjs:916`); a `[a-z-]` class here would red on a symbol the package really
// installs, which is the guess-class this row refuses everywhere else. The claim the arm makes is the one that
// matters: **every key is this package's own registered `provident-storeroom.` spelling, never an identity
// `Symbol()` and never a differently-namespaced one** — and a key that breaks it names itself in the message.
//
// **THE NAMES NOT ASSERTED HERE, AND WHY — ONE CLASS, ONE REASON.** `checked-off-at-the-terminal-arm`
// (`state.mjs:28`), `settled-on-the-passing-arm` (`:46`) and `save-failed-at-the-terminal-arm` (`:59`) are marks the
// package puts **on a RECORD** (`checked-off-at-the-terminal-arm` is DECLARED there and at `1.12.0` never written at
// all — `publishCheckedOff` leaves the key unset — so it is excluded for being a RECORD's mark and not for being a
// present one), and `commit-log` (`:104`, `kernel-foundations.mjs:914`) is defined by
// `kernel-commit.mjs` on the `CommitRecord` it builds — **none is ever a key on the instance**, so asserting one
// here would red on a correct package. Dropped for the same reason, being keys on a refusal form, a log entry, a
// kernel record or a request/witness slot and never on the object `storeCreate` returns:
// `commit-log-shared` (`kernel-foundations.mjs:935`), `kernel-refusal` (`constraints.mjs:1170`),
// `constraint-body-threw` (`:1195`), `inner-refusal` (`:1260`), `package-refusal` (`:1277`),
// `restart-refusal` (`kernel-attempt.mjs:61`) and `compensating-rollback` (`:71`).
// **AND THE OTHER DIRECTION IS EMPTY BECAUSE IT WAS MEASURED, NOT BECAUSE IT WAS SKIPPED**: no instance-level
// symbol in the installed tree was found and left unasserted — the fourteen rows above are every one — so a name a
// later release adds reds at the SET and COUNT arms and is named there, rather than being absorbed by a list this
// row happened to guess right.
//
// **THE WRITE ARM'S ONE ADDITION IS PROVED TOO.** `Symbol.for('provident-storeroom.kernel')` is declared at
// `src/entry/kernel-foundations.mjs:680` and installed by `kernelFor`'s create-on-miss arm at `:767`
// (`Object.defineProperty(store, KERNEL_SLOT, { … enumerable: false … })`). `kernelFor` is reached from
// `kernel-commit.mjs:7`, which is the frame `constraints.mjs:810`'s `kernel.commit(instance, …)` calls inside
// `constraintWrite` — the function the instance's `write` member takes. A CONSTRUCTION THAT ARMS NOTHING NEVER
// REACHES IT: `storeCreate`'s batch walk is `for (let i = 0; i < batch.length; i += 1)`
// (`index.mjs:1994`–`:2030`) and `deliverAtTheCreation`'s loop walks `adopted` (`index.mjs:301`–`:340`), so a
// `storeCreate` handed an empty `constraints` and an empty `listeners` — which is what a bare `createProfileStore()`
// is (`src/main/storeroom.ts`'s `createProfileStore`, cited by SITE — its offsets moved with this pass's header
// insertions) — calls neither.
//
// **NOTHING IS READ BACK, NOTHING PERSISTS, NOTHING IS CLEANED UP**: a store constructed with no `filePath` holds
// a `mem` register and opens no file (`src/main/storeroom.ts`'s `ProfileStoreOptions.filePath` docblock, cited by
// SITE), so the one write below leaves no byte
// on disk. **EACH ARM CONSTRUCTS ITS OWN FRESH INSTANCE**, so the write arm cannot contaminate the construction
// arm — which matters here because the subject of both arms is the instance's own key set.
import { describe, expect, it } from 'vitest'

import { createProfileStore, STOREROOM_DECLARED_SURFACE } from '../../../src/main/storeroom.js'

/** **THE DECLARED SYMBOL CENSUS — FOURTEEN NAMES AT CONSTRUCTION, EACH WITH ITS INSTALL SITE IN THE HEADER ABOVE.**
 *  A literal because `STOREROOM_DECLARED_SURFACE` carries the COUNT and not the names: this list is the row's own
 *  declared set, and the constant is the figure it witnesses. */
const DECLARED_SYMBOLS = [
  'provident-storeroom.terminal-arm',
  'provident-storeroom.forget-pair',
  'provident-storeroom.storeIndex',
  'provident-storeroom.listen-route',
  'provident-storeroom.registration-save',
  'provident-storeroom.registration-deliver',
  'provident-storeroom.register-body',
  'provident-storeroom.attempt-count',
  'provident-storeroom.attempt-opened',
  'provident-storeroom.commit-scope',
  'provident-storeroom.external-call',
  'provident-storeroom.restart-drain',
  'provident-storeroom.bump-mark',
  'provident-storeroom.repair-leg',
] as const

/** **THE ONE SYMBOL THE FIRST `write` ADDS** (`kernel-foundations.mjs:680` + `:767`, reached through
 *  `kernel-commit.mjs:7` from `constraints.mjs:810`): the store's own post-write growth, on every arm. */
const KERNEL = 'provident-storeroom.kernel'

/** The instance's own symbol descriptions, in the order `getOwnPropertySymbols` reports them. A key carrying no
 *  description at all — an identity `Symbol()` — is spelled as itself so it CANNOT hide behind an `undefined`. */
const symbolsOf = (store: object): string[] =>
  Object.getOwnPropertySymbols(store).map((key) => key.description ?? String(key))

/** Sorted copies, because SETS are what this row compares and the package's order is nobody's claim. */
const sorted = (names: readonly string[]): string[] => [...names].sort()

/** **THE MESSAGE EVERY SYMBOL ARM CARRIES: THE FULL SORTED LIVE LIST BESIDE THE DECLARED ONE**, so a package that
 *  adds, drops, re-spells or re-namespaces a symbol reds NAMING IT rather than reporting a bare length. */
const census = (live: readonly string[]): string =>
  `live ${live.length} [${sorted(live).join(', ')}] · declared ${DECLARED_SYMBOLS.length} [${sorted(DECLARED_SYMBOLS).join(', ')}] · STOREROOM_DECLARED_SURFACE.symbolCount ${STOREROOM_DECLARED_SURFACE.symbolCount}`

describe('the seam’s declared census is witnessed on a LIVE instance, never only against itself (SC-1)', () => {
  it('SC-1 · a fresh instance carries exactly the declared members and the declared symbols, and ONE `write` adds exactly `provident-storeroom.kernel` — measured as a SET DIFFERENCE, with the live list printed beside the declared one in every message', () => {
    const construction = createProfileStore()
    const own = Object.getOwnPropertyNames(construction)
    // **THE MEMBER HALF, LIVE** — green today (the marked `S-1.2` asserts the same list off the same call), and it
    // is here because a census witness that covered only symbols would be half a census. `memberCount` is a
    // declared LITERAL (`STOREROOM_DECLARED_SURFACE.memberCount` in `src/main/storeroom.ts`; cited by SITE and never by
    // offset, because this pass's own header insertions moved every offset below that block — `D-41`), so it is
    // asserted beside the list and not derived from it.
    expect(own, `the member half, live: [${own.join(', ')}] · declared [${[...STOREROOM_DECLARED_SURFACE.members].join(', ')}]`)
      .toEqual([...STOREROOM_DECLARED_SURFACE.members])
    expect(own, `and the declared figure, live: ${own.length} own string members`)
      .toHaveLength(STOREROOM_DECLARED_SURFACE.memberCount)

    // **THE SYMBOL HALF, LIVE, BY SET** — the arm that did not exist before this row:
    // `Object.getOwnPropertySymbols` on the CONSTRUCTED OBJECT, compared to the census above, order aside.
    const atConstruction = symbolsOf(construction)
    expect(sorted(atConstruction), `the symbol half, live, as a SET: ${census(atConstruction)}`)
      .toEqual(sorted(DECLARED_SYMBOLS))
    // **AND THE LIVE COUNT AGAINST THE DECLARED FIGURE — READ FROM THE CONSTANT AND NEVER SPELLED HERE.** This is
    // the assertion that would have caught `1.11.0`'s addition at the release that made it, and the one that reds
    // until this pass's `13 → 14` re-grain lands. **Naming the drift is the message's whole job.**
    expect(atConstruction.length, `the live count IS the declared figure, and a package that moved the set reds here naming the member: ${census(atConstruction)}`)
      .toBe(STOREROOM_DECLARED_SURFACE.symbolCount)

    // **UNIQUENESS AND SHAPE.** Two keys sharing a description would make every set comparison above blind to the
    // second, and a key outside this package's namespace is either an identity `Symbol()` — which no spelling can
    // read — or a second owner's spelling on the app's instance. Both name themselves in the message. The class is
    // `[A-Za-z]` and not `[a-z]` for the measured reason the header prints (`storeIndex`).
    expect(new Set(atConstruction).size, `every description is distinct, or the set comparison above is deaf: ${census(atConstruction)}`)
      .toBe(atConstruction.length)
    for (const name of atConstruction) {
      expect(name, `every own symbol is this package's own registered spelling, and "${name}" is not: ${census(atConstruction)}`)
        .toMatch(/^provident-storeroom\.[A-Za-z][A-Za-z-]*$/)
    }
    // **AND EVERY KEY IS A REGISTERED KEY, NOT AN IDENTITY `Symbol()` WEARING THE SAME DESCRIPTION** — the one drift the
    // description read above is STRUCTURALLY BLIND to, because `Symbol('provident-storeroom.commit-scope')` and
    // `Symbol.for('provident-storeroom.commit-scope')` share one `.description` and would pass every arm above.
    // `Symbol.keyFor` answers the key for a REGISTERED symbol and `undefined` for an identity one, so it is the only
    // read that separates them — and an identity key is exactly what a re-exported, non-`Symbol.for` seam would look
    // like, since the kernel and the entry reach these channels by spelling `Symbol.for` on both sides.
    for (const key of Object.getOwnPropertySymbols(construction)) {
      expect(Symbol.keyFor(key), `every own symbol is a REGISTERED \`Symbol.for\` key rather than an identity \`Symbol()\` carrying the same description: ${census(atConstruction)}`)
        .not.toBeUndefined()
    }

    // **THE DECLARED NAMES ARE PRESENT — THE DIRECTION THE SET EQUALITY ALONE WOULD NOT NAME.** A package that
    // DROPPED one symbol and ARRIVED with another in its place keeps the count equal and keeps the set unequal;
    // this arm names the dropped one, member for member.
    const live = new Set(atConstruction)
    for (const name of DECLARED_SYMBOLS) {
      expect(live.has(name), `the declared name "${name}" stands on the instance: ${census(atConstruction)}`)
        .toBe(true)
    }

    // ═════════════════════════════════════════════════════════════════════════════════════════════════════════
    // **THE WRITE ARM — ON ITS OWN FRESH INSTANCE**, so the act below cannot contaminate the construction arm
    // above: the subject of both is the instance's own key set, and one instance would make that subject move.
    // ═════════════════════════════════════════════════════════════════════════════════════════════════════════
    const written = createProfileStore()
    const before = symbolsOf(written)
    // The arm stands on the SAME census before its own act, so a construction that moved would red at both seats.
    expect(sorted(before), `the write arm's own fresh instance, before the write: ${census(before)}`)
      .toEqual(sorted(DECLARED_SYMBOLS))
    // **ONE `mem` WRITE, AND NOTHING READS IT BACK**: the store's `write(address, tier, value)` — the same call
    // `tests/storeroom-surface.test.ts` drives — at an address no other row and no constraint names. A store with
    // no `filePath` holds a `mem` register, so no byte of this reaches a file.
    written.write(['census'], 'mem', 'probe')
    const after = symbolsOf(written)
    // **THE SET DIFFERENCE, BOTH DIRECTIONS, AND NOT A COUNT** — a count alone would pass over a swap.
    expect(sorted(before.filter((name) => !after.includes(name))), `the write drops no symbol: ${census(after)}`)
      .toEqual([])
    expect(
      sorted(after.filter((name) => !before.includes(name))),
      `the first write's growth is EXACTLY the store's own kernel slot — live before [${sorted(before).join(', ')}] · live after [${sorted(after).join(', ')}]`,
    ).toEqual([KERNEL])
  })
})
