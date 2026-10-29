# record — `settings-carrier-retirement`: package findings, and the unit's own owed items (D-5)

- **Unit:** `settings-carrier-retirement` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — the findings its own passes surfaced, in their owner's
  terms, and what the unit itself still owes. It is not a demand list: a finding stays wherever it was surfaced and the
  package is never modified (D-5), while the sibling's filings are cited here and never re-filed
  (`docs/L2/settings-carrier-retirement/persistence.md` §8 last bullet).
- **Recovered from:** `docs/L2/settings-carrier-retirement/persistence.md` §8 (`P-1`, `P-2`), §9 (`ASM-L2-9`), and
  `docs/L1/settings-carrier-retirement.md` §3 (the ordered-array decision that `P-2` forced).

## 1. Package findings — `provident-storeroom ^1.6.1`, upstream-owned, never patched (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **SCR-F1** | a consumer that must **split** an imported record into carryable and uncarryable rows has **no admission predicate**: `index.d.ts` exports no `admits(value)`/`walk(value)` and the guide publishes the taxonomy only as prose, so the only way to learn whether a value is admitted is to attempt a write and read `ValueRefusedAtBoundary` — answered **per whole value**, never naming the member that failed | read `index.d.ts` for an admission export (none), then write `{a: 1, b: null}` at one address: the refusal names no member | admission is decided inside the package's walk, before any store verb, and only its *outcome* crosses (`guide §10.2`) | publish a side-effect-free `admits(value): boolean` (or answer the failing path on the refusal) so a consumer can partition a legacy record without re-implementing `§10.1`'s seventeen rows |
| **SCR-F2** | an object's **member order is not preserved across the crossing**: a value whose members stand `zebra, apple, mango` is read back `apple, mango, zebra`, so a durable record used as an *ordered* map cannot serve the order it was written with — while a genuine array's order survives exactly. **This is why the app-state record is an ordered array of row objects and not a name→value map** (L1 §3) | write `{zebra:1, apple:2, mango:3}` at one `file` address and read it back: `Object.keys` answers the sorted order; write `[{name:'zebra'},{name:'apple'},{name:'mango'}]` and the order is the written one | the crossing's copy normalizes an object to a key-ordered collection on the way in or out, while `§10.1` promises a *plain object* only — so order is not part of the contract a consumer can rely on, and the guide never says so | declare whether object member order is preserved, and if it is not, say so beside `§10` so a consumer that must persist an ordering chooses an array rather than discovering the loss on a read-back |

- **The residue `SCR-F1` leaves is stated, not absorbed:** the import's representability test is the one refusal L1 §4
  names (`null`/`undefined`), not the store's whole taxonomy, so an unrepresentable row is refused at the first ordinary
  commit rather than dropped silently (`ASM-L2-9`; `guide §10.1`–§10.3).

## 2. What this unit owes

- **Landed:** the carrier's retirement (its boot read, its Y-1 read, the tmp+rename+fsync writer, `settingsPath` and every
  other reader of that path), the instance's third durable address, both import-once arms and boot parity by a second
  construction (D-22; L1 §3/§4/§5).
- **Owed to the tree, not to the package:** `src/main/preload.ts:72` declares `store.put`'s `reason` as the closed pair
  `'malformed-payload' | 'write-failed'` while the runtime answer now carries the store's own status verbatim; the widening
  belongs to the unit that next touches the bridge, and `preload.ts` is byte-identical after this unit (sibling §8).
- **Re-grained, no longer owed to L1:** L1 §8 `S-1` permits **exactly one** `provident-settings.json` occurrence in
  `src/**` — the instance's own import arm — which is what L1 §4 and E-2 require of
  `src/main/operator-settings/index.ts`, so no conflict stands and the earlier reading of `S-1` as a literal ban is
  retired (sibling `persistence.md` §8).
- Discharged: run 2 came back `PASS` and the unit is closed with its three findings fixed in place
  (`strata/records/settings-carrier-retirement-walkthrough.md`).

**Reclassified by D-24:** every finding above is the store working as designed; the only demand is
documentary. The purge rule and the absent-address refusal family are documented in the shipped guide
(no demand); the boot behaviour over non-image bytes and the member ordering are not (two documentation
defects).
