# record — `central-data-management`: package findings, and what its closure leaves standing (D-5)

- **Unit:** `central-data-management` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1) · **`CD-F3` DISCHARGED 2026-11-03 by the installed `1.9.2`** (D-103)
- **What this file is:** the unit's **closure record** for D-5 — the findings its passes surfaced, in their owner's terms — and
  no queue: the unit is **closed**, so its stage and streaks are `strata/.strata/units/central-data-management.json`'s, its run
  history and verdict `strata/records/central-data-management-walkthrough.md`'s, and its paths and endpoint count the
  `central-data` row of `strata/modules.json`'s — cited, never restated here (D-26, D-43, D-48, D-52).
- **Recovered from:** `docs/L1/central-data-census-exception.md` §5/§7, `docs/L2/central-data/persistence.md` §9, `docs/L3/central-data/design.md` §3/§4.

## 1. Package findings — upstream-owned, never patched (D-5): CD-F1/CD-F2 at `provident-storeroom ^1.6.1`, CD-F3 at `1.9.1`, DISCHARGED by `1.9.2` (D-102, D-103)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **CD-F1** | `delete` at an address where **no row stands** throws `AddressNotFound` instead of answering the empty removal a caller's receipt would carry; `tiers: []` is reachable only where the address stands at another tier (measured at `57c5825`) | call `delete` at an absent address, at both the whole-target and the `file`-tier spellings | the delete arm reads an absent target as a malformed address rather than a no-op | **none, and no demand** — D-24 rules the family intended *and documented* (`guide README.guide.md:351,359,425`, the delete arm among them), so this row carries no demand at all; the module steps around it in its own answer (`docs/L3/central-data/design.md` §4 `G7`) |
| **CD-F2** | the **boot over non-image bytes** has no declared arm: a foreign, unparsable image boots **cold** with its bytes untouched until the next `file`-tier save, so a consumer can state the recovery while the package declares neither it nor a parse-failure arm (measured at `57c5825`) | place non-image bytes at the `filePath`, call `storeCreate`, then `list`/`read` (cold tier answers, bytes byte-identical) and one `write` (bytes replaced) | `guide §9.1` declares the creation, reachability and constraint-list arms and no parse-failure arm, and the declaration carries no such boot status | declare the boot's parse-failure arm — its status and whether the bytes are left untouched — in the native contract and in `guide §9.1` |
| **CD-F3** | **a PASSING `write` has no message log to hand over and no reader that answers one afterwards**, so a consumer cannot confirm that a constraint's repair fired: measured at `1.9.1`, a `['tabs']` write whose pair REPAIRED answers `getOwnPropertyNames` `["op","watched","triggered","discarded"]` with `log`/`commit`/`attempt` `undefined` and `getOwnPropertySymbols` `[]`, `triggered` reading the SAME pair list a CLEAN write reads; `log(store, ref)` answers `[]` once the write returned, `report(store, ref)` answers four members with no `log`, and mid-commit the pair's own `context.attempt` is refused `KC-7` (D-102) | write a two-active tab record at `['tabs']` with a pair whose repair fires, then the same legal record on a clean arm; compare `Object.getOwnPropertyNames` of both receipts, then reach the entries through the shipped `exports` (refused `ERR_PACKAGE_PATH_NOT_EXPORTED`) and through the kernel file by URL | the log is a member of the REFUSAL alone (`index.d.ts:475`) and `dropHandoff` keeps `{attempt, outcome, ops, rollback}` while dropping the list (`README.guide.md:1522`, `:1524`), so an act that PASSES is handed no list and the store retains none to re-read | **hand it over or keep it answerable**: carry `log` on the passing `WriteRecord`/`DeleteRecord` (the shape the refusal already uses, `[]` where no repair ran), or let `log(store, ref)` answer a closed attempt's entries instead of `[]` — either makes the surface's proof possible without a new vocabulary (D-82's `V4`) — **⟶ DISCHARGED 2026-11-03 by the installed `1.9.2`, `RELEASE-NOTES.md` §1.9.2 item 1: a passing call answers with the commit's log, at `record.log` on a `write`'s record and `receipt.log` on a `delete`, non-enumerable and so moving no declared shape (driven: a repaired write answers FOUR entries — `constraint-check` · `repair-run` · `constraint-check` · `commit` — a clean one TWO, and a write over a store carrying no pair ONE), and the guide withdrew its cost sentence by name; **THE RELEASE TOOK THE FIRST PROPOSED OPTION AND NOT THE SECOND**, so neither `log(store, ref)` nor any reader by attempt reference is the surface's route and `provident-storeroom`'s `exports` still maps `"."` alone** (`D-103`) |

- **CD-F1 and CD-F2 are not demands on this tree**, and neither was promoted past what was measured: CD-F1 is answered inside the module
  without entering the throwing arm (`docs/L3/central-data/design.md` §4 `G7`), and CD-F2 leaves the recovery *statable* by the consumer
  and undeclared by the package (`docs/L2/central-data/persistence.md` §9 `P-1`). **CD-F3 WAS a demand and it is now met** — the release it
  waited on landed it, so this unit carries no open demand and the member it asked for is the surface's (D-5, D-102, D-103).

## 2. Where each item this unit owed went — all discharged, because the unit is closed

- **The record was the L1 debt, and this is its discharge:** exception §7's last bullet owed the record both findings *and* the
  L2 examiner's readings; they stand here in the four-part shape, with those readings inside their Symptom and Reproduction
  cells at the commit they were taken (`57c5825`). The sibling's three filings behind them — persistence §9's `P-1` (CD-F2's
  subject), `P-2` (the undeclared writer mechanism) and `P-3` (`register` with no call site) — are that document's, the last two under D-24.
- **The test writer's set, moved and closed:** `E-2`'s re-grain set — `C-1`..`C-3` of `docs/L1/central-data-management.md` §8 —
  moved by one predicate (*a site is in the set iff it reads one of the moved numbers*); §8 holds both the rows it moved and the sites the predicate left green (exception §2/§3; D-10, D-31).
- **The parked half went to its own unit:** the assumption filed at `docs/L1/central-data-management.md` §7 — the store's own file
  the only new written name, the settings file imported once and then never written — was delivered by `settings-carrier-retirement` (D-22), which owns that record and its stage.
- **Surfaced here, delivered by the pane's unit:** a fifth group name was enumerated in the pane, so the sixth group had no operator
  control and the group set's third reader stood outside `C-1`..`C-3`'s closure; `secure-panels` (D-35) bound the roster to a table typed by the gate's own union, so the pane cannot drift from the gate again (D-38; `docs/L1/secure-panels.md` §7 `E-1`).

## 3. What this closure does not claim

- **Unmeasured: the five `data.*` members answer nowhere.** `RpcMethod` carries all five at this head and no site answers them —
  no `data.*` case in `src/renderer/renderer.ts`'s method switch, no handler in `src/main/main.ts` — so `docs/L2/central-data/interface.md` §5 is design, and this record does not present it as measurement (D-44).
- **D-24's reclassification, scoped to these two rows:** CD-F1 carries **no demand at all**, the shipped guide documenting the absent-address refusal family with the delete arm among it; CD-F2 is this unit's one **documentation defect**, the boot's parse-failure arm being described nowhere in the guide's prose (D-24).
