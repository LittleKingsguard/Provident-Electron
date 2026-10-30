# record — `central-data-management`: package findings, and the unit's own owed items (D-5)

- **Unit:** `central-data-management` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — the findings its passes surfaced, in their owner's terms,
  and what the unit still owes. It is not a queue: nothing here asks any layer of this tree for work, and the package is
  never modified (D-5). Recovered from `docs/L1/central-data-census-exception.md` §5/§7, the module's L2 documents §6/§9
  and `docs/L3/central-data/design.md` §3.

## 1. Package findings — `provident-storeroom ^1.6.1`, upstream-owned, never patched (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **CD-F1** | `delete` at an address where **no row stands** throws `AddressNotFound` instead of answering the empty removal a caller's receipt would carry; `tiers: []` is reachable only where the address stands at another tier (measured at `57c5825`) | call `delete` at an absent address, at both the whole-target and the `file`-tier spellings | the delete arm reads an absent target as a malformed address rather than a no-op | **none, and no demand** — D-24 rules the family intended *and documented* (`guide README.guide.md:351,359,425`, the delete arm among them), so this row carries no demand at all; the module steps around it in its own answer (`docs/L3/central-data/design.md` §4 `G7`) |
| **CD-F2** | the **boot over non-image bytes** has no declared arm: a foreign, unparsable image boots **cold** with its bytes untouched until the next `file`-tier save, so a consumer can state the recovery while the package declares neither it nor a parse-failure arm (symptom measured at `57c5825`) | place non-image bytes at the `filePath`, call `storeCreate`, then `list`/`read` (cold tier answers, bytes byte-identical) and one `write` (bytes replaced) | `guide §9.1` declares the creation, reachability and constraint-list arms and no parse-failure arm, and the declaration carries no such boot status | declare the boot's parse-failure arm — its status and whether the bytes are left untouched — in the native contract and in `guide §9.1` |

- **Neither finding is a demand on this tree**, and neither was promoted past what was measured: CD-F1 is answered inside
  the module without entering the throwing arm (`design.md` §3 `G7`), and CD-F2 leaves the recovery *statable* by the
  consumer and undeclared by the package (`persistence.md` §9 `P-1`).

## 2. What this unit owes, and where each item went

- **Owed to the test writer of this layer:** E-2's re-grain set — `C-1`..`C-3` of `docs/L1/central-data-management.md` §8 —
  moved by one predicate (*a site is in the set iff it reads one of the moved numbers*), recording both the rows it moved
  and the sites the predicate left green (exception §2/§3; D-10).
- **Owed and unlanded at this head:** the five `provident.data.*` bridge routes have **no answer site** — no `data.*` arm
  in the renderer's method switch, no IPC handler in `main.ts` — so `interface.md` §5 is design, not measurement.
- **Discharged, not owed:** the parked `ASM-11` retirement half (the one-time import and the retirement of
  `provident-settings.json`'s write site) was delivered by `settings-carrier-retirement` (D-22), which owns that record.
- **Owed by L0:** a blind walkthrough run whose own documents are clean. Runs 1-7 are `STALE`; each round's findings
  were closed rather than annotated, and run 7 left only two sentences of this record and one L2 clause
  (`strata/records/central-data-management-walkthrough.md`; D-10, D-48).
- **Delivered by the pane's own unit, surfaced by run 3 and discharged:** the pane enumerated five group names, so the
  sixth group had **no operator control** and the group set's third reader stood outside `C-1`..`C-3`'s closure. The
  `secure-panels` unit (D-35) landed the roster as a projection of a table bound to the gate's union, so the pane
  cannot drift from the gate again (`docs/L1/secure-panels.md` §7 `E-1`; D-38).
- **Discharged:** exception §7's last bullet and both findings stand here, not as a pointer. `persistence.md` §9 files three more — `P-1` (CD-F2's subject), `P-2` (the undeclared writer mechanism), `P-3` (`register` with no call site) —
  and the last two are declared gaps under D-24, not demands.
- **Reclassified by D-24:** every finding above is the store working as designed — the only demand is documentary. The
  purge rule and the absent-address refusal family are documented in the shipped guide; the boot behaviour over non-image
  bytes and the member ordering are not (two documentation defects).
