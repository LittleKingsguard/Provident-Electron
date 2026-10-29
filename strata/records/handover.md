# handover — state at `0ace2a5`, branch `strata` (main still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` **D-1..D-23**. This file is the short version.

## What is landed

Four units on the `provident-storeroom` instance, 51 commits, tree clean:

| Unit | State | Code |
|---|---|---|
| `strata-bootstrap` | corpus + archive; walkthrough **not green** | `strata/`, `archive/gate-corpus-2026-10-29/` |
| `central-data-management` | batteries green; walkthrough **not green** | `src/main/storeroom.ts`, `src/main/data/` (7 files) |
| `security-store-storeroom` | batteries green; walkthrough **not green** | `src/main/operator-settings/`, `src/main/settings-surface/`; `security-store.ts` **deleted** |
| `settings-carrier-retirement` | **closed** (`stage: done`, PASS at run 2) | `main.ts` carrier removed |

**Census at this head:** 27 tools / 6 groups (`data` off by default) / 8 default-gated (13 with `data`) / 3
resources · N: `central-data` 15 (cap 200), `operator-settings` 12 (170), `settings-surface` 19 (240) ·
persisted: **written** `provident-operator-settings.json`, `provident-profile.json`; **seeded only**
`provident-settings.json`, `provident-security.json` · 20 module rows · suite `2 failed / 3,175 passed /
2 skipped` of `3,179` over 112 files, the two reds being `store-tabs-record` §4.2 items 7 and 8.

## What a new session does next, in order

1. **One blind walkthrough per open unit** (`central-data-management`, `security-store-storeroom`,
   `strata-bootstrap`). Every finding the last runs made is fixed; nothing substantive is outstanding.
   Delegate to `role_l1_examiner`, quarantine it to the docs, ask for ≤8 lines + the envelope. If a run
   stays red, suspect the instrument (six corpus runs producing only drift findings is evidence about
   the procedure) before fixing more prose.
2. **Then D-22's second half**, as its own units: the gate's exclusion/tier-4 **enforcement**, the
   **module registry**, and the **journal-length consumers** moving onto the instance as state engine.
   Each starts at L1 and must file its map row first.
3. **Owed beside those:** `ASM-4` (`src/main/tier4-state.ts` has no `src/**` reader — either give it one
   or retire it with the surface consulting its own `mem` row); `tests/secure-exclusion.test.ts:878-881`
   (evidence-only since the rebuild); `store-core-graph` `I-11`'s unfalsifiable `headBytes` arm; the
   `FileCommitFailed` word no row spells; and the **Electron legs** (`battery`, `divergence`, `ui`),
   never run in any pass — needs a seat with a `DISPLAY`.

## Operating notes a fresh session needs

- **The layer wall.** `role_l4_implementer` is reachable only from `role_l3_designer`; L1 sees only
  `role_l2_*`. When a chain must implement, the L1 prompt has to say "the L3 designer MUST call
  `role_l4_implementer`" or the run stops at the batteries (it did once).
- **The preset patch** (`role_l2_integration` gaining its test-writer and examiner seats) is filed but
  needs this fresh session to take effect.
- **Red before green:** author the battery, run it, report the red set, then implement. Rows authored
  after an implementation carry no red-first evidence and must say so in their header.
- **Commit per gate**, never merge or push (D-6). `strata-lint` is exit 0 / 42 checks; run it with the
  four legs before reporting: `node "../Agent Harness/strata/lint/strata-lint.mjs" strata`.
- **The walkthrough stages no built artifact** — a PASS certifies the documentation, never the app.
- **A fix over prose must be re-read, not substituted:** `53` once matched inside `536bdc6`.

## Findings against the package: one documentary demand, none behavioural (D-24)

All four behaviours a unit met are **intended**: `AddressNotFound` on a delete of an absent address · no
declared boot arm over non-image bytes · a `file`-tier write purging the `mem` version at its own key
(the behaviour `ASM-1` rests on) · members returning in a fixed order (`P-2`). Measured against the
installed `provident-storeroom@1.6.1` guide: the purge rule (`README.guide.md:380-382,423-424`) and the
absent-address refusal family (`:351,359,425`) are **documented — no demand**; the **boot over
non-image bytes** and the **member ordering across the crossing** are described nowhere in the guide's
prose (ordering appears only in `RELEASE-NOTES.md`) — **two documentation defects**, filed in the unit
that met each and handed off under D-5. No behavioural demand stands against either package.
