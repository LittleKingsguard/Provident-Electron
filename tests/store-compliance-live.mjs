// tests/store-compliance-live.mjs — **RETIRED WHOLE AT `D-93`, AND THIS FILE IS ITS HEADSTONE.**
//
// WHAT THIS FILE WAS. The live compliance battery over the RUNNING Electron app's FOUR-TIER DATA STORE: thirty-two
// rows in five families — A the arbitrary-storage requirement on tier 4 (`secure`), B the constraints on the storage
// method (a separate persistent file, the declared persisted-file set, the write's observable shape, no lower-tier
// alias), C the access controls, D the architect's clone/write ruling on the write path, plus the preflight, static
// and cleanup rows. Its reach, verbatim from its own header: *"`import(new URL('./renderer.js', document.baseURI).href)`
// returns the SAME, already-evaluated instance, so `getWiredGraphStore()` is THE ONE boot-constructed store of this live
// realm"* — and, for the channel rows, the preload's `provident.store.put`/`.get`.
//
// **BOTH REACH MECHANISMS ARE DELETED** (`strata/decisions.md` `D-93`, executing `D-78`'s purge and `D-90`'s
// enumeration): `getWiredGraphStore` and its whole construction left `src/renderer/renderer.ts`,
// `src/renderer/store-core-graph.ts` is gone, and the `store` namespace — `get` / `put` / `onFileChanged` — left
// `src/main/preload.ts` with its two `ipcMain.handle` sites and the `file.*` projection loop behind them. **Every one
// of the four tiers this battery measured is a tier of a store that no longer exists**: the app's two remaining
// crossings are `provident-storeroom` instances with their own address spaces, their own constraint batches and their
// own surfaces, and neither exposes a generic name-addressed `resolve`/`commit` to a renderer module.
//
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE DISPOSITION, ROW BY ROW.
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// **RETIRED — THE SUBJECT IS THE DELETED STORE, ITS PROJECTION OR ITS CHANNEL** (nothing to re-point: the four tiers,
// the `file.tabs.*`/`mem.*`/`temp.*`/`secure.*` address space, the sixteen-member refusal union, the `secure-refused`
// gate sites and the `provident.store` bridge all died with the module):
//   SC-CH-01 · SC-CH-02            the live `provident.store` channel's two arms
//   SC-A-01 … SC-A-04              the renderer bridge, the generic name-addressed surface and its two controls
//   SC-A-06                        the tier-1 file-store bridge NAMESPACE census
//   SC-B-01 … SC-B-09              the constraints on the storage method, arm by arm, and its controls
//   SC-C-01 … SC-C-04              the renderer-side refusals, the arms and the four-carrier control
//   SC-E-02                        the same obligation through the live bridge
//   SC-G-02                        the `secure-refused` site census over `src/renderer/store-core-graph.ts`'s bytes
// **RE-POINTED AWAY — THE SUBJECT SURVIVES, ITS INSTRUMENT DOES NOT.** These rows measured the SECURE CROSSING's own
// behaviour (the exclusion gate's two arms and the write path's conditionality) and their subject still stands. They
// are RE-HOMED, not revived here: every one of them is now driven under `npm test` by unmarked, gating batteries —
// `tests/secure-exclusion.test.ts` (its `FS-EX-*` fail-states, its `I-EX-*` invariants and its own register),
// `tests/e2e/security-store-storeroom/isolation.test.ts`, `tests/integration/security-store-storeroom/isolation.test.ts`
// and `tests/integration/settings-carrier-retirement/*`. **THE LIVE HALF IS THE LOSS AND IT IS NAMED, NOT HIDDEN**: a
// node suite is envelope-green and never app-green (`AGENTS.md`, and `strata/brief.md` §6's own exception), so the
// rows' PROCESS-boundary reading — a real gate in force over a real IPC channel in a real app — has no instrument
// today. That gap is the OWED item below.
//   SC-C-05                        the exclusion gate, both arms, over the live app
//   SC-D-03 … SC-D-10              the clone/write ruling's consequence half and the transition drives
// **RETIRED WITH THE BATTERY ITSELF** (a battery's own furniture, not a row with a subject):
//   SC-PRE-01 · SC-PRE-02          the preflight pair — a stale-process read and a live-stdio read for THIS run
//   SC-CLEAN-01                    the end-of-run cleanup row over THIS run's own `REMOVALS`
//
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// WHAT IS OWED, NAMED RATHER THAN IMPLIED
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// **A LIVE INSTRUMENT FOR THE TWO CROSSINGS IS OWED.** Not one live driver reads the app's own `provident-storeroom`
// instances over a process boundary today. Everything that measured them live was written against the frozen graph
// store, and that store is gone. The successor rows must be driven through the crossings' OWN surfaces —
// `tabs.*`, `view.*`, `data.*` and the operator's `security.*` — over their own channels, in a booted app, with the
// process census the other legs take around them. That work is recorded in `strata/pending.md` and in `D-93`; it is
// NOT closed by deleting rows here, and this file claims no reading.
//
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// STATUS: UN-RUN BY EVERY LEG, AND NOW UNRUNNABLE BY CONSTRUCTION.
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// Its own header said `npm run build && node tests/store-compliance-live.mjs` and no leg invoked it; `npm test`,
// `typecheck`, `typecheck:tests`, `build` and the four Electron legs never evaluated a byte of it. `D-30`'s rule is
// that an un-run row is a FAILURE; a retired row is not a row. **This file therefore measures NOTHING and exits `2`** —
// the code this file already used for a run that cannot take a reading — rather than exiting `0` and inviting a reader
// to take a green it did not earn.

const DISPOSITION = [
  ['SC-CH-01', 'RETIRED', 'the live `provident.store` channel — its `put` arm; the `store` member is deleted'],
  ['SC-CH-02', 'RETIRED', 'the live `provident.store` channel — its `get` arm; the `store` member is deleted'],
  ['SC-A-01', 'RETIRED', 'the main-side renderer bridge into the frozen store (`getWiredGraphStore`)'],
  ['SC-A-02', 'RETIRED', 'the generic name-addressed surface, driven live through the deleted store'],
  ['SC-A-03', 'RETIRED', 'its CONTROL-ARBITRARY / CONTROL-BRIDGE-PATCH pair, which drove the same surface'],
  ['SC-A-04', 'RETIRED', 'the family-A second arm over the deleted store'],
  ['SC-A-06', 'RETIRED', 'the tier-1 file-store bridge namespace census — the namespace is deleted'],
  ['SC-B-01', 'RETIRED', 'the constraints on the storage method, arm a, over the deleted store'],
  ['SC-B-02', 'RETIRED', 'its CONTROL-CENSUS, which counted the deleted store\'s persisted-file set'],
  ['SC-B-03', 'RETIRED', 'the storage method, arm b, over the deleted store'],
  ['SC-B-04', 'RETIRED', 'the tier-shape half of the storage method — the four tiers are gone'],
  ['SC-B-05', 'RETIRED', 'the storage method, arm d, over the deleted store'],
  ['SC-B-06', 'RETIRED', 'its CONTROL-TMP / CONTROL-TORN pair, which drove the deleted store\'s file tier'],
  ['SC-B-07', 'RETIRED', 'the no-lower-tier-alias arm — the alias it forbade was a store address'],
  ['SC-B-08', 'RETIRED', 'its CONTROL-FILE-TIER, which wrote the deleted store\'s `file` tier'],
  ['SC-B-09', 'RETIRED', 'the family-B census and record key set, re-measured over the deleted store'],
  ['SC-C-01', 'RETIRED', 'the renderer-side refusals, arm b — the store\'s refusal vocabulary is deleted'],
  ['SC-C-02', 'RETIRED', 'the access-controls arm a-i, over the deleted store'],
  ['SC-C-03', 'RETIRED', 'the four-carrier arm, over the deleted store'],
  ['SC-C-04', 'RETIRED', 'its CONTROL-CARRIER, which drove the same four carriers'],
  ['SC-C-05', 'RE-POINTED AWAY', 'the exclusion gate\'s two arms — subject stands; gated under `npm test` by `tests/secure-exclusion.test.ts`; the LIVE half is owed'],
  ['SC-D-03', 'RE-POINTED AWAY', 'the clone/write ruling\'s consequence half — subject stands; gated under `npm test` by the secure-crossing batteries; the LIVE half is owed'],
  ['SC-D-04', 'RE-POINTED AWAY', 'the `set(patch)` return — subject stands; gated under `npm test` by `tests/unit/settings-carrier-retirement/`'],
  ['SC-D-05', 'RE-POINTED AWAY', 'tier-4 closed with MCP enabled — subject stands; gated by `tests/secure-exclusion.test.ts` (`I-EX-3`/`I-EX-8`)'],
  ['SC-D-06', 'RE-POINTED AWAY', 'tier-4 open with MCP disabled — same subject, same successor'],
  ['SC-D-07', 'RE-POINTED AWAY', 'the return transition — same subject, same successor'],
  ['SC-D-08', 'RE-POINTED AWAY', 'the transition race (MANUAL) — a manual row; the parking stands in `strata/pending.md`'],
  ['SC-D-10', 'RE-POINTED AWAY', 'the admissible-tier write-instrument probe — subject stands; the node-suite successor carries it'],
  ['SC-E-02', 'RETIRED', 'the same obligation through the LIVE BRIDGE — the bridge it reached is deleted'],
  ['SC-G-02', 'RETIRED', 'the `secure-refused` site census of `src/renderer/store-core-graph.ts`\'s bytes — the file is deleted'],
  ['SC-PRE-01', 'RETIRED', 'preflight — a stale-process read for THIS battery\'s own run'],
  ['SC-PRE-02', 'RETIRED', 'preflight — a live-stdio read for THIS battery\'s own run'],
  ['SC-CLEAN-01', 'RETIRED', 'end-of-run cleanup over THIS battery\'s own REMOVALS'],
]

const RETIRED = DISPOSITION.filter((r) => r[1] === 'RETIRED').length
const REPOINTED = DISPOSITION.filter((r) => r[1] === 'RE-POINTED AWAY').length
console.log('[live] tests/store-compliance-live.mjs — RETIRED AT D-93; THIS FILE TAKES NO READING')
console.log('[live] its two reach mechanisms, `getWiredGraphStore()` and `provident.store.*`, are both deleted')
console.log('')
for (const [id, verdict, why] of DISPOSITION) console.log(`  ${id.padEnd(12)} ${verdict.padEnd(17)} ${why}`)
console.log('')
console.log(`  ${String(DISPOSITION.length)} rows: ${String(RETIRED)} RETIRED, ${String(REPOINTED)} RE-POINTED AWAY, 0 taken.`)
console.log('')
console.log('[live] UN-RUN BY EVERY LEG — no `scripts` key names this path, and the four Electron legs spawn the app.')
console.log('[live] OWED: a live instrument for the two `provident-storeroom` crossings over a process boundary.')
console.log('[live] See strata/pending.md and D-93; this file claims no reading.')
process.exit(2)
