/**
 * tests/store-tabs-record-live.mjs — **RETIRED WHOLE AT `D-93`, AND THIS FILE IS ITS HEADSTONE.**
 *
 * WHAT THIS FILE WAS. `U-STORE-TABS-RECORD` (`T2`)'s live CDP driver: nineteen rows (`M1`–`M13`, `P1`–`P3`,
 * `A-1`–`A-3`) that booted the built bundle on a scratch profile, seeded a `file.tabs.*` record into the profile,
 * and read THE APP'S OWN FROZEN GRAPH STORE back through the renderer module's exported
 * `getWiredGraphStore()`. Its reach, verbatim from its own header: *"`await import(document.baseURI +
 * "renderer.js")` answers the SAME module instance the page's `<script>` already evaluated, and that module's
 * exported `getWiredGraphStore()` answers THE store the app booted."*
 *
 * **THAT EXPORT IS DELETED** (`strata/decisions.md` `D-93`, executing `D-78`'s purge and `D-90`'s enumeration):
 * `getWiredGraphStore`, `buildWiredGraphStore`, `wiredDeclarations` and the whole construction left
 * `src/renderer/renderer.ts`, and `src/renderer/store-core-graph.ts` is gone. So the file's ONE reach mechanism
 * does not exist, and not one row below could take a reading.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * THE DISPOSITION, ROW BY ROW — `D-92` OWED THIS FILE, AND THIS IS THE SETTLEMENT.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * **RETIRED — the subject is DELETE, not moved** (each row read the frozen store's own address space, its register,
 * its constraint table, its tier words or its read-side refusal records; `mem`/`file.tabs.<id>` and the union of
 * sixteen refusal reasons all died with the module):
 *   · `M1`  the record's already-declared `tabs` root + a probe write answering `undeclared-name`-or-not.
 *   · `M2`  a NEVER-WRITTEN id seated in `order` answering a READ-SIDE REFUSAL (`no-such-anchor`/`undeclared-name`).
 *   · `M3`  `s.constraints` — the ONE `exactly-one-active` member, its supply site and its three evaluation points.
 *   · `M4`  the seeded ZERO-ACTIVE post-state, read off the store's `file.tabs.*` leaves.
 *   · `M5`  the COLD arm's `resolve('file.tabs.order')` refusal record.
 *   · `M6`  the boot round-trip through `hydrate(rows)` and the store's own register.
 *   · `M7`  `order` held across a store commit, with the profile's bytes untouched.
 *   · `M8`  a refusal BY THE STORE'S NAME (`'reserved-name'`) and its control.
 *   · `M9`  `order` re-seated by the store's own repair, with `file.tabs.landing` written and active.
 *   · `M12` the aim/unchanged pair read through the store's `temp` preview.
 *   · `M13` the preload `store.get`/`store.put` bridge witness and its divergence census.
 * **RETIRED FOR THE SAME REASON, BY A DIFFERENT SUBJECT** — the three rows whose subject is the STORE's construction
 * and the store's own MCP-observable absence, which `D-93` deletes:
 *   · `P1`/`P2`/`P3` (the PARKED rows) quoted the authored tab affordances and the painted rows, but each was keyed to
 *     the store's `file.tabs.*` record and to the boot step's committed write; the affordances themselves are still
 *     absent from the envelope, so the PARKING still stands and is recorded in `strata/pending.md` — the ROW is not
 *     carried here because this file cannot measure anything.
 *   · `A-1`/`A-2`/`A-3` (the CONTROL rows) recorded that the MCP surface exposes no tabs tool and no coordinates, and
 *     that a synthetic click is not a human's eye. **THE CLAIMS STAND AND ONE OF THEM IS NOW WIDER** — the MCP surface
 *     still exposes no tabs tool (`ALL_TOOLS` is 27 and `tabs` is not among them) — but this file's own reading of them
 *     went through the deleted bridge, so they are recorded here and not re-driven.
 * **RE-POINTED, IN SUBSTANCE, AT THE CROSSING — AND NOT HERE** (`D-92`'s and `D-63`'s successor): the record now stands
 * at `['tabs']` on the NORMAL CROSSING (`src/main/tabs-record/index.ts`), is READ by `src/renderer/tabs-client.ts`
 * (`{status, order, landing, rows, witness}`) and is gated by `tests/integration/store-tabs-record/crossing.test.ts`
 * and its siblings, which run under `npm test`. The two rows whose subject really was the two authored PAGES rather
 * than the store — `M10` (the pages' markup) and `M11` (the error terminal's witness) — are what `D-92` re-pointed into
 * `main()`'s own drive (`driveTabsLandingPage(reading, runtime)`) and what the marked rows
 * `tests/pane-drag-compliance.test.ts` / `tests/store-focus.test.ts` now carry.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * WHAT IS OWED, NAMED RATHER THAN IMPLIED
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * **A LIVE DRIVER FOR THE CROSSING'S RECORD IS OWED.** Not one live instrument reaches `['tabs']` today: the tab
 * record's readings are gated by the node suite, and no Electron leg presses a control, seeds a record into
 * `provident-profile.json` and reads the crossing's answer back out of a running app. That gap is recorded in
 * `strata/pending.md` and in `D-93`; it is NOT closed by deleting rows here, and this file claims no reading.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * STATUS: UN-RUN BY EVERY LEG, AND NOW UNRUNNABLE BY CONSTRUCTION.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * `package.json` carries no key for this path, so `npm test`, `typecheck`, `typecheck:tests` and `build` never
 * evaluated a byte of it, and the four Electron legs (`battery`, `divergence`, `ui`, `panes`) spawn the app rather
 * than this file. `D-30`'s rule is that an un-run row is a FAILURE; a retired row is not a row. **This file therefore
 * measures NOTHING and exits `2`** (`the driver/infra fatal code this file always declared for a run that cannot take
 * a reading`) rather than exiting `0` and inviting a reader to take a green it did not earn.
 */
const DISPOSITION = [
  { id: 'M1', verdict: 'RETIRED', why: 'the frozen store\'s declared `tabs` root and its `undeclared-name` probe write' },
  { id: 'M2', verdict: 'RETIRED', why: 'the store\'s read-side refusal record (`no-such-anchor`/`undeclared-name`) for a never-written id' },
  { id: 'M3', verdict: 'RETIRED', why: 'the store\'s own `constraints` table — `exactly-one-active` is the CROSSING\'s declaration now' },
  { id: 'M4', verdict: 'RETIRED', why: 'the seeded zero-active post-state read off the store\'s `file.tabs.*` leaves' },
  { id: 'M5', verdict: 'RETIRED', why: 'the COLD arm\'s `resolve(\'file.tabs.order\')` refusal record' },
  { id: 'M6', verdict: 'RETIRED', why: 'the boot round-trip through `hydrate(rows)` and the store\'s register' },
  { id: 'M7', verdict: 'RETIRED', why: '`order` held across a store commit with the profile untouched' },
  { id: 'M8', verdict: 'RETIRED', why: 'a refusal BY THE STORE\'S NAME (`reserved-name`) and its control' },
  { id: 'M9', verdict: 'RETIRED', why: 'the store\'s own `order` repair writing `file.tabs.landing` active' },
  { id: 'M10', verdict: 'RE-POINTED AWAY', why: 'the two authored pages\' markup — carried by `driveTabsLandingPage(reading, runtime)` and the marked batteries' },
  { id: 'M11', verdict: 'RE-POINTED AWAY', why: 'the error terminal\'s witness — the tabs client\'s `witness.error.witness`, driven there' },
  { id: 'M12', verdict: 'RETIRED', why: 'the aim/unchanged pair read through the store\'s `temp` preview, which is closure state now' },
  { id: 'M13', verdict: 'RETIRED', why: 'the preload `store.get`/`store.put` bridge witness — the `store` member is deleted (`D-93`)' },
  { id: 'P1', verdict: 'RETIRED', why: 'PARKED for an absent authored affordance, and keyed to the store\'s `file.tabs.*` record; the parking stands in `strata/pending.md`' },
  { id: 'P2', verdict: 'RETIRED', why: 'PARKED for the absent close-last-tab affordance, keyed to the store\'s record; the parking stands in `strata/pending.md`' },
  { id: 'P3', verdict: 'RETIRED', why: 'PARKED for the painted rows, keyed to the store\'s boot-step write; the parking stands in `strata/pending.md`' },
  { id: 'A-1', verdict: 'RETIRED', why: 'the MCP surface exposes no tabs tool — the claim stands wider and is gated by the node suite; this file\'s reading of it went through the deleted bridge' },
  { id: 'A-2', verdict: 'RETIRED', why: 'a synthetic click is not a human\'s eye on a painted box — the claim stands and is not re-driven here' },
  { id: 'A-3', verdict: 'RETIRED', why: 'the boot step\'s committed write through the store\'s ONE construction — the step itself went at `D-83`' },
]

console.log('[live] tests/store-tabs-record-live.mjs — RETIRED AT D-93; THIS FILE TAKES NO READING')
console.log('[live] its one reach mechanism, `getWiredGraphStore()`, is deleted with `src/renderer/store-core-graph.ts`')
console.log('')
for (const row of DISPOSITION) console.log(`  ${row.id.padEnd(4)} ${row.verdict.padEnd(17)} ${row.why}`)
console.log('')
console.log(`  ${String(DISPOSITION.length)} rows: ${String(DISPOSITION.filter((r) => r.verdict === 'RETIRED').length)} RETIRED, ` +
  String(DISPOSITION.filter((r) => r.verdict === 'RE-POINTED AWAY').length) + ' RE-POINTED AWAY, 0 taken.')
console.log('')
console.log('[live] UN-RUN BY EVERY LEG — no `scripts` key names this path, and the four Electron legs spawn the app.')
console.log('[live] OWED: a live driver for the crossing\'s record at [\'tabs\'] — see strata/pending.md and D-93.')
process.exit(2)
