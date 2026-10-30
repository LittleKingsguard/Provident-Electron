# record — `security-store-storeroom`: package findings, and the unit's own owed items (D-5)

- **Unit:** `security-store-storeroom` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — the findings its passes surfaced, in their owner's terms,
  and what the unit itself still owes. Not a queue, and never a patch: the package is read-only for every layer (D-5).
  Recovered from `docs/L2/security-store-storeroom/persistence.md` §9 (`P-1`..`P-5`), `docs/L1/security-store-storeroom-exception.md`
  §8/§9 and `docs/L1/security-store-storeroom.md` §10 `ASM-1`.

## 1. Package findings — `provident-storeroom ^1.6.1`, upstream-owned, never patched (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **SS-F1** | a boot over bytes that are **not the store's image** has no declared answer — and the ordinary **second** boot of an instance that never wrote is exactly such a boot, because construction left a **zero-length** file | call `storeCreate({ filePath })` twice with no write between: the first creation leaves the file empty and the second boot reads it | the guide's boot clauses declare the creation, reachability and constraint-list arms and **no parse-failure arm**, so the empty file the package itself created has no declared reading | declare the boot's parse-failure arm, and separately the boot-over-empty arm, with the status and whether the bytes stand (`guide §9.1`) |
| **SS-F2** | a listener's only argument is the **triggering address**, never the value and never which member moved, so a whole-record write tells a subscriber nothing but that the record was written (**a declared limit, recorded so the next consumer does not re-derive it — an observation, not a defect**) | `listen('h', [['operator-settings']])` + `register('h', fn)`, then write one member: `fn` receives `['operator-settings']` | delivery is declared as an address notification, and the value must be re-read | publish the delivery's argument as a declared notification form, or declare that a value reader beside it is the supported shape (`guide §6.4`, §6.5a) |
| **SS-F3** | **one address cannot hold a durable and a volatile row**: a `file`-tier write purges the versions it outranks (`file` > `mem` > `temp`) at its **own key**, so the `mem` shadow is destroyed by the next durable commit — the behaviour `ASM-1` of this rebuild rests on | write `file` at `['k']`, write `mem` at `['k']` (a shadow), write `file` at `['k']` again, then read `mem` | the purge is declared **at the key** and not at the tier, and the guide declines to promise the pair-by-pair behaviour | **no demand** — the purge-at-own-tier rule is documented in the shipped guide (D-24) (`guide §5.1`) |
| **SS-F4** | the writer's **mechanism** is undeclared, so no consumer can state that the store's own file is torn-write-free | read `guide §9.1-§9.4`: durability, rollback and residue are declared; stage → fsync → rename is not | durability is declared as an outcome (the last successful save's bytes) rather than as a mechanism | declare the mechanism, or explicitly disclaim atomicity, beside `guide §9.2` |
| **SS-F5** | a consumer **cannot close its own refusal vocabulary and cannot open it safely**: `StoreStatus` ends in an open `(string & {})` arm and the package publishes **no runtime membership predicate**, so a consumer that must branch cannot tell a member the set gained from a store-side defect | read `index.d.ts`'s `StoreStatus` and `guide §8.1`, then write a consumer type over it: a switch over the twenty literals is exhaustive at the type level yet leaves the escape arm unhandled | the arm is a **compile-time** escape for a set the store may append to, and no **run-time** counterpart is published | **describe** the twenty members and say the `(string & {})` arm is a compile-time escape for a set the store may append to — a sentence, not a symbol; an export would be a package code change, which D-24 bars (`docs/L2/security-store-storeroom/persistence.md` §9 `P-5`) |

## 2. What this unit owes

- **Landed, named so it is not re-opened:** E-1's replacement and the file's deletion, E-2's three import sources, E-3's
  composition and the one writer, E-4's `README.md` paragraph, and E-5's **63 rows re-grained / 160 retired** at `536bdc6`
  (exception §9). `P-1`'s extension is why both import markers are record-absences (sibling `persistence.md` §3).
- **Carried, and half discharged:** `src/main/tier4-state.ts` is **discharged at the bytes** — its header now names the surface module sole writer with no `src/**` reader, witnessed by the bundle (`setTier4OpenState` ×3, `tier4OpenState` ×0). Still owed: `main.ts`'s import keeps two type names it no longer spells — that file's
  next writer's to remove (exception §9; D-52).
- **Owed by L0:** a further blind walkthrough run. The run history is the walkthrough record's (D-10), which holds the
  latest run and its verdict; each round's findings were closed rather than annotated. The deviation that no built
  artifact was staged is **no longer standing**: the root stages `dist/` and, since D-44, `src/` too.
- **Discharged elsewhere, and named because it bounded this unit's evidence:** the app could not boot, because the main
  bundle was CJS while the ESM-only package derives its addon and manifest paths from `import.meta.url`. That host-side
  defect got its own unit and is fixed (`D-27`, `bundle-boot-seam`): the bundle is ESM at `dist/main/main.mjs`, and the
  instance stands: its own file appears in a scratch profile (`docs/L2/bundle-boot-seam/interface.md` P-10/P-11);
  `strata/brief.md` §6 is the instrument table and carries no such row.

**Reclassified by D-24:** each finding above is the store working as designed, and the only
demand that can stand is that the guide **describe** it. D-24's own four are adjacent rather than
these five, and `SS-F5`'s runtime-predicate proposal is a package code change, which D-24 bars —
so what it asks for is a documented membership set, not a new export. The purge rule and the absent-address refusal family are documented in the
shipped guide (no demand); the boot behaviour over non-image bytes and the member ordering are not
(two documentation defects).
