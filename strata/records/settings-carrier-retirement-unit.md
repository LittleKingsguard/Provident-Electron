# record — `settings-carrier-retirement`: package findings, and what its closure leaves standing (D-5)

- **Unit:** `settings-carrier-retirement` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — the findings its own passes surfaced, in their owner's terms — and
  never a demand list: the package is never modified, and the sibling's filings are cited here and never re-filed. The unit is
  **closed**, so its stage and streaks are `strata/.strata/units/settings-carrier-retirement.json`'s, its run history and verdict
  `strata/records/settings-carrier-retirement-walkthrough.md`'s, and its module's paths and endpoint count the `operator-settings` and `app-shell` rows of `strata/modules.json`'s — cited, never restated (D-26, D-43, D-48, D-52).
- **Recovered from:** `docs/L2/settings-carrier-retirement/persistence.md` §8 (`P-1`, `P-2`) and §9 (`ASM-L2-9`), and `docs/L1/settings-carrier-retirement.md` §3 (the ordered-array decision that `P-2` forced).

## 1. Package findings — `provident-storeroom ^1.6.1`, upstream-owned, never patched (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **SCR-F1** | a consumer that must **split** an imported record into carryable and uncarryable rows has **no admission predicate**: `index.d.ts` exports no `admits(value)`/`walk(value)` and the guide publishes the taxonomy only as prose, so the only way to learn whether a value is admitted is to attempt a write and read `ValueRefusedAtBoundary` — answered **per whole value**, never naming the member that failed | read `index.d.ts` for an admission export (none), then write `{a: 1, b: null}` at one address: the refusal names no member | admission is decided inside the package's walk, before any store verb, and only its *outcome* crosses (`guide §10.2`) | publish a side-effect-free `admits(value): boolean` (or answer the failing path on the refusal) so a consumer can partition a legacy record without re-implementing `§10.1`'s seventeen rows |
| **SCR-F2** | an object's **member order is not preserved across the crossing**: a value whose members stand `zebra, apple, mango` is read back `apple, mango, zebra`, so a durable record used as an *ordered* map cannot serve the order it was written with — while a genuine array's order survives exactly. **This is why the app-state record is an ordered array of row objects and not a name→value map** (L1 §3) | write `{zebra:1, apple:2, mango:3}` at one `file` address and read it back: `Object.keys` answers the sorted order; write `[{name:'zebra'},{name:'apple'},{name:'mango'}]` and the order is the written one | the crossing's copy normalizes an object to a key-ordered collection on the way in or out, while `§10.1` promises a *plain object* only — so order is not part of the contract a consumer can rely on, and the guide never says so | declare whether object member order is preserved, and if it is not, say so beside `§10` so a consumer that must persist an ordering chooses an array rather than discovering the loss on a read-back |

- **The residue `SCR-F1` leaves is stated, not absorbed:** the import's representability test is the one refusal L1 §4 names (`null`/`undefined`), not the
  store's whole taxonomy, so an unrepresentable row is refused at the first ordinary commit rather than dropped silently (`ASM-L2-9`; `guide §10.1`–§10.3).

## 2. Where each item this unit owed went

- **Landed, and read from L1 rather than restated here:** the carrier's retirement (its boot read, its `Y-1` read, the tmp+rename+fsync writer,
  `settingsPath` and every other reader of that path), the instance's third durable address, both import-once arms and boot parity by a second
  construction (`docs/L1/settings-carrier-retirement.md` §3/§4/§5; D-22).
- **Still owed, to the tree and not to the package:** the `store.put` declaration in `src/main/preload.ts` — with its renderer-side
  copy in `src/renderer/renderer.ts` — types `reason` as the closed pair `'malformed-payload' | 'write-failed'`, while the channel
  answers the surface's own refusal, carrying the store's status verbatim (`src/main/main.ts`'s commit arm). The widening is the unit's that next touches the bridge; `preload.ts` is byte-identical after this unit (sibling §8).
- **Re-grained, no longer owed to L1:** L1 §8 `S-1` permits **exactly one** `provident-settings.json` occurrence in `src/**` — the instance's
  own import arm, which is what `docs/L1/settings-carrier-retirement.md` §4 and the e2e battery require of `src/main/operator-settings/index.ts`
  — so no conflict stands and the earlier reading of `S-1` as a literal ban is retired (sibling §8).
- **Closed** on its exit walkthrough's `PASS` (`strata/records/settings-carrier-retirement-walkthrough.md`), which is the record of that run
  and holds its scenario set; the stage is the state's, and the standing `lastFailure` entry there is the state's too — `rebuild.md` §1
  clears it by `rebuild` alone, so this record neither claims nor clears it (D-10, D-26, D-48).

## 3. D-24's reclassification, scoped to these two rows

- **Neither finding is a behavioural defect.** `SCR-F1` cannot be answered by a package export without a code change, which D-24 bars, so its
  demand is **documentary** — state the admission outcome where a consumer will look for it.
- **`SCR-F2` is a documentation defect:** the guide's prose describes object member order nowhere, so a consumer learns the loss on a read-back;
  that is what makes it the only row here that a fix upstream could close with a sentence (D-24).
