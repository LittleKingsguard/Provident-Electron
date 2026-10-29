# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` **D-1..D-26**. This file is the short version.

## What is landed

Four units on the `provident-storeroom` instance, tree committed at every gate boundary:

| Unit | State | Code |
|---|---|---|
| `settings-carrier-retirement` | **closed** — walkthrough `PASS` at its run 2 | `main.ts` carrier removed |
| `central-data-management` | batteries green; walkthrough red at run 3 | `src/main/storeroom.ts`, `src/main/data/` (7 files) |
| `security-store-storeroom` | batteries green; walkthrough red at run 3 | `src/main/operator-settings/`, `src/main/settings-surface/`; `security-store.ts` deleted |
| `strata-bootstrap` | corpus + archive; walkthrough red at run 5 | `strata/`, `archive/gate-corpus-2026-10-29/` |

**Census:** 27 tools / 6 groups (`data` off by default) / 8 default-gated, 13 with `data` / 3 resources;
N: `central-data` 15, `operator-settings` 12, `settings-surface` 19; 20 module rows. Counts are `brief.md`
§6's to state — do not restate them in a new document (D-26).

## Two defects stand between the tree and the product

- **The app cannot boot.** `dist/main/main.cjs:38480` throws `createRequire(undefined)`: the main bundle is
  CJS while the ESM-only `provident-storeroom` resolves its native addon through `import.meta.url`, which
  esbuild's CJS output leaves as `{}`. No leg in the four-leg floor reaches that bundle. Owned by
  `strata/records/security-store-storeroom-unit.md` §2, **owed its own unit** — and it is the floor: until
  it is fixed, `divergence` and `ui` are red and no product-level claim means anything.
- **The Settings pane cannot grant the sixth group.** `src/renderer/secure-panels.ts:72` enumerates five
  group names, so `data` is in the gate and in the persisted grant with no operator control. Filed in
  `strata/records/central-data-management-unit.md` §2, owed to the `secure-panels` row's unit.

## What a fresh session does next, in order

1. **The boot seam, as its own unit** (L1 files its map row first). It unblocks both Electron legs and every
   claim about the running app; nothing in D-22's parked set can be verified without it.
2. **The pane's sixth group**, as its own unit — it closes the walkthrough finding that survives two passes.
3. **D-22's second half**, still parked and still admitted as units: the gate's exclusion/tier-4 enforcement
   (which is also what gives `src/main/tier4-state.ts`'s reader its first `src/**` consumer, discharging
   `ASM-4`), the module registry (`src/main/module-store.ts` is the last hand-written JSON carrier of the
   retired shape), and the journal-length consumers onto the instance as their state engine.
4. **A decision about the walkthrough instrument.** All three open units now carry
   `streaks.walkthrough-record: 3` and `rebuildEligible: true`. `rebuild.md` §3 says a third consecutive
   failure indicts the artifact, not the prose — and this pass proved it twice: one run's decisive finding
   was an error in **L0's own staging listing**, and three runs' remaining findings were stale counts that
   earlier passes had "fixed" by writing a newer number into another document.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** `tests/store-tabs-record.test.ts` §4.2 item 9 asserts the
  worktree against a declared edit set, so a dirty tree makes it red **by construction**. Commit, then measure.
- **The layer wall was prompt-level this pass.** The seat ran without the preset's `role_*` tools, so the L1
  and L2 seats were plain delegations carrying the role's persona and its procedure file. The write scopes
  held; nothing enforced them but the instruction and the diff.
- **L0 never edits another layer's document (D-3).** Every `docs/L1`/`docs/L2` finding goes to a seat that
  owns that path, even when the fix is one sentence.
- **A fix over prose must be re-read, not substituted.** `536bdc6` had already eaten one count (`53`) and was
  still standing in two L1 documents as a row count; a blind pass found it where a re-read had not.
- **Commit per gate**, never merge or push (D-6). Four legs plus `strata-lint`, and `strata-lint` with
  `--changed <a,b>` when a unit's diff is scope-checked.
