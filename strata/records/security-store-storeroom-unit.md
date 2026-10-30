# record — `security-store-storeroom`: package findings, and what its closure leaves standing (D-5)

- **Unit:** `security-store-storeroom` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — the findings its passes surfaced, in their owner's terms — and never a patch: the package is read-only for every layer. The unit is **closed**, so its stage and streaks are `strata/.strata/units/security-store-storeroom.json`'s, its run history and verdict `strata/records/security-store-storeroom-walkthrough.md`'s, and its two modules' paths and endpoint counts the `operator-settings` and `settings-surface` rows of `strata/modules.json`'s — cited, never restated here (D-26, D-43, D-48, D-52).
- **Recovered from:** `docs/L1/security-store-storeroom-exception.md` §8/§9, `docs/L1/security-store-storeroom.md` §10, and `docs/L2/security-store-storeroom/persistence.md` §9 (`P-1`..`P-5`).

## 1. Package findings — `provident-storeroom ^1.6.1`, upstream-owned, never patched (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **SS-F1** | a boot over bytes that are **not the store's image** has no declared answer — and the ordinary **second** boot of an instance that never wrote is exactly such a boot, because construction left a **zero-length** file | call `storeCreate({ filePath })` twice with no write between: the first creation leaves the file empty and the second boot reads it | the guide's boot clauses declare the creation, reachability and constraint-list arms and **no parse-failure arm**, so the empty file the package itself created has no declared reading | declare the boot's parse-failure arm, and separately the boot-over-empty arm, with the status and whether the bytes stand (`guide §9.1`) |
| **SS-F2** | a listener's only argument is the **triggering address**, never the value and never which member moved, so a whole-record write tells a subscriber nothing but that the record was written (**a declared limit, recorded so the next consumer does not re-derive it — an observation, not a defect**) | `listen('h', [['operator-settings']])` + `register('h', fn)`, then write one member: `fn` receives `['operator-settings']` | delivery is declared as an address notification, and the value must be re-read | **no demand** — the root-cause cell records the delivery *is* declared as an address notification, and the value must be re-read (D-24) |
| **SS-F3** | **one address cannot hold a durable and a volatile row**: a `file`-tier write purges the versions it outranks (`file` > `mem` > `temp`) at its **own key**, so the `mem` shadow is destroyed by the next durable commit — the behaviour `ASM-1` of this rebuild rests on | write `file` at `['k']`, write `mem` at `['k']` (a shadow), write `file` at `['k']` again, then read `mem` | the purge is declared **at the key** and not at the tier, and the guide declines to promise the pair-by-pair behaviour | **no demand** — the purge-at-own-tier rule is documented in the shipped guide (D-24) (`guide §5.1`) |
| **SS-F4** | the writer's **mechanism** is undeclared, so no consumer can state that the store's own file is torn-write-free | read `guide §9.1-§9.4`: durability, rollback and residue are declared; stage → fsync → rename is not | durability is declared as an outcome (the last successful save's bytes) rather than as a mechanism | declare the mechanism, or explicitly disclaim atomicity, beside `guide §9.2` |
| **SS-F5** | a consumer **cannot close its own refusal vocabulary and cannot open it safely**: `StoreStatus` ends in an open `(string & {})` arm and the package publishes **no runtime membership predicate**, so a consumer that must branch cannot tell a member the set gained from a store-side defect | read `index.d.ts`'s `StoreStatus` and `guide §8.1`, then write a consumer type over it: a switch over the twenty literals is exhaustive at the type level yet leaves the escape arm unhandled | the arm is a **compile-time** escape for a set the store may append to, and no **run-time** counterpart is published | **describe** the twenty members and say the `(string & {})` arm is a compile-time escape for a set the store may append to — a sentence, not a symbol; an export would be a package code change, which D-24 bars (`docs/L2/security-store-storeroom/persistence.md` §9 `P-5`) |

**Reclassified by D-24, scoped to these five:** every row is the store working as designed and the only demand that can stand is documentary.
`SS-F2` and `SS-F3` carry **no demand at all** — the delivery is declared as an address notification, and the purge-at-own-tier rule is in
the shipped guide — while `SS-F1`, `SS-F4` and `SS-F5` ask for **documentation**: declare the boot's parse-failure arm and the writer's
mechanism, and describe the membership set rather than export it, which D-24 bars as a code change. D-24's own four findings are adjacent to
these five, not these five.

## 2. Where each item this unit owed went

- **Landed, and read from the exception rather than restated here:** `E-1`'s replacement and the deleted file, `E-2`'s three import
  sources, `E-3`'s composition and the one writer, `E-4`'s `README.md` paragraph and `E-5`'s re-grain and retirement set, each with the commit that carried it (`docs/L1/security-store-storeroom-exception.md` §9).
- **Discharged at the bytes, and named so it is not re-opened:** `src/main/tier4-state.ts`'s header now names the surface module sole writer
  with no `src/**` reader, and the built bundle is its witness — `setTier4OpenState` present, `tier4OpenState` tree-shaken out. Its
  **retirement** stays parked: `docs/L1/security-store-storeroom.md` §10 `ASM-4` settles that at rev 3, and the unit that gives the
  enforcement path a use for the holder is a later one (exception §6).
- **Discharged, to the tree and not to the package:** `src/main/main.ts`'s type-only import no longer carries the two names it stopped
  spelling — `Tier4ClosedRefusal` and `Tier4WriteAnswer` are gone, and no row asserted that file's import list (exception §9, now closed).
- **Discharged elsewhere, and named because it bounded this unit's evidence:** the app could not boot while the main bundle was CJS and the
  ESM-only package derived its addon and manifest paths from `import.meta.url` — **reproduction: the spawned Electron wrote zero bytes of
  stdout in 45 s against a scratch profile** (`.strata/returns/security-store-storeroom-l2-examination.json`'s `rootCause`). That host-side
  defect got its own unit and is fixed (D-27, `bundle-boot-seam`); the instance stands and its own file appears in a scratch profile
  (`docs/L2/bundle-boot-seam/interface.md`). The root's
  staging deviation is not standing either: it carries `src/` and the built artifact, so a claim about code or a boot is checkable rather than
  unverifiable (`walkthrough.md` §3; D-44).
