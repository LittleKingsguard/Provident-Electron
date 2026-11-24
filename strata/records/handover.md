# handover — 2026-11-24: all eleven `modularity` suite reds are closed and the four legs are green; the next acts are the door's row, the boot census route and the two named halves

Read `strata/brief.md` first, then `strata/decisions.md` from `D-304` onward.

## Where the branch stands

`main` carries the work: `a58a7ab` is the last commit the remote has (`git ls-remote origin main` answers it), and the three commits after it — `4f2385e`, `b243020`, `4e075b7` — are LOCAL and unpushed (D-6's pointer clause, D-119). The older "nothing is pushed" line is therefore wrong as a status claim and right as the RULE: this pass pushes nothing, and the remote is now three commits behind the work rather than level with it. The unit `modularity` (D-306) went L1 rev 15 → L2 → L3 → L4; `.strata/units/modularity.json` still reads `layer: L3`, `stage: design`, `artifacts: []` because `strata-state` is not in this checkout — **the ledger is behind the work** (D-26, `platform.md` §4). The unit's record is `strata/records/modularity-unit.md`; its design `docs/L1/modularity.md` rev 15.

## What landed this pass

- **Eleven reds closed.** Eight by instrument re-grains that keep their claims: `I-3`/`I-8` (the activation's `module:<name>:` log prefix), `M-1`/`M-2` (the verdicts array, and the SDK's `isError` arm as a refusal), `S-9` (value imports only: three, with two `import type` sites named), `S-11`/`ISO-4` (an `electron` binding, not the word `ipcRenderer`, which `admission.ts` names in its forbidden-token census), and `REGISTER-EXEC-1` (declaring `registrationAllowed` in the focus register's cross-unit fence).
- **`M-3`/`M-4`/`M-5` closed on the user's ruling (`D-315`, "Activate first, persist on success")**: the census check is READ-ONLY, a rejected/no-op verdict ends the arm, the source goes to the port's `install`, and the row is persisted only on a non-refused verdict before `rePublish()`. A refused install is never stored, so a retry reaches the resolver. L3 §5 and `signatures.md` §5 are re-grained to that order.
- **The `invoke` door's rows are written**: `MS-9` (unit, declared store double) and `I-9` (integration, real store) drive the handler's own value, `tool-unknown` after `deactivate`, `handler-threw`, and a still-standing handler as the positive control — the gap the L2 and L3 pages had named.
- **The boot census route landed (`D-316`)**: `src/main/main.ts` hands `status().loaded` to the executor as one table delivery **before** the transport composition, so a persisted module is active at boot instead of listed-and-silent. No member was added; `M-30` re-boots the same profile and calls the tools with no install. `M-30` is filed at `docs/L1/modularity.md` rev 16; an `app-shell` L2 rev is still owed.
- **`docs/L2/module-channel/interface.md` rev 1 is NEW**: the managed passthrough's transport half at the I/O grain — the five members (binding, envelope, registration, fan-out, containment), the five arms, the one message's two kinds, the prefix relation, the parity, and four assumptions with alternatives. Its integration battery is owed with the steps that green it; the L3 page is the next rung.
- **`docs/L3/module-channel/` rev 1 is NEW**: `design.md` states the store facade (the binding and the writer's entrance), the turn at the settled receipt, the two-kind message, the registration frame, the realm fan-out, the client proxy's data verbs and the one transport seam `S-12` supplies; `signatures.md` fixes the stubs. **Seven** assumptions carry the contested cells — the client verb set, the flag's one source, the store-act envelope, the registry key, the entry's address, the client half's payload, and the handle's key (client-keyed when the declaration names a client half).
- **The CH integration battery is written**: `CH-1`…`CH-6` over a real `createProfileStore` and the connected transport pair; the writer's settled edge now composes from the SETTLED receipt (a suspending store answer is a Promise).
- **The channel's main half landed**: `src/shared/module-channels.ts` (data), `src/main/module-channel/{writer,facade,index}.ts` (the facade's binding, the settled turn and the five arms) and `tests/unit/module-channel/channel.test.ts` (`MC-1`…`MC-8`). The realm client and the boot facade pass also landed, and **`S-12`'s wire landed**: the eleventh `channel` member on both lockstep sites, the real transport, and the three census rows at ELEVEN. **The realm's channel end also starts**: the app `CapabilityRouter` evaluates frames and fires deliveries, and main re-sends the census frames on `ready`. The U5 action/graph wiring and the batteries remain; the `app-shell` L2/L3 pages owe the member's re-grain.
- **The client store is now `ClientStoreSurface`**: the async data half — each act a request the channel executes, each answer a Promise — while the main half's store stays the sync `StoreSurface`. `MS-3` awaits the default `no-store-host` refusal, as a module's client code must.
- **The pins stand**: `provident-storeroom ^2.0.0` (lock 2.0.1), `provident-ssr ^0.6.0`; the demo bundle regenerated; `SC-1` reads `15`/`14`; the map's `module-system` `endpoints` **24** (cap **290**, D-14).

## The readings (clean tree)

`typecheck` **0**, `typecheck:tests` **0**, `build` **0**; **`npm test` GREEN — `0 failed / 3,057 passed / 2 skipped` of `3,059` over `162` files**; the unit batteries **29/29** (9 + 7 + 8 + 5); the boundary **10/10**. **ALL FOUR LEGS ARE GREEN** (`npm test`, `typecheck`, `typecheck:tests`, `build`; `AGENTS.md`, `brief.md` §6). `strata-lint` **211** stands as the last reading and was NOT re-taken — `../Agent Harness/` is absent from this checkout.

## What is open, named not hidden

- **An upstream finding (`D-5`, recorded in the unit record)**: the real store's `returnedValues` carries a SETTLED thenable's value, not a synchronous listener's return — so the channel's `return` arm is async-only and a synchronous returner reads `empty`. The fix shape is the store's.
- **The e2e `M-2b`/`M-11`/`M-13`** — the runtime composition and the module shape are LANDED (`D-317`: `contribute` + the stored authored document; `startModuleShape` + `installModuleActions` + the re-driven paints) with `D-317(a)`…`(c)` and `RW-M1`…`RW-M4` written; the e2e rows are L1's at `S-20`, and **`S-18`'s composed pane set waits on `U2`'s registry** (the five tables are total over `DECLARED_PANE_IDS`, read by `PM-1`/`PM-2`); the **out-of-band activation sink** (`design.md` §5's third caller) is undeclared.
- **The boot route's `app-shell` L2 rev** — `M-30` IS FILED now (`docs/L1/modularity.md` rev 16), but `docs/L2/app-shell/interface.md` still has no rev naming the table delivery before the transport composition.
- **L1 currency**: `docs/L1/modularity.md` still reads `module-system` `endpoints` **16**; the map reads **24** and L2 rev 3 derives 24 member-by-member. The move is L1's to file (the page is at 150/150, so a re-grain must compress).
- **The harness-cap rule is stated two ways**: `bundle-boot-seam`'s pages say a product battery is EVIDENCE and does not count; `module-system`'s L2/L3 count the 246-line battery against the cap. One ruling is owed.
- **The state ledger is behind** (`L3`/`design`/no artifacts) and cannot be moved without `strata-state`.

## The handoff set (by pointer)

`H-1`/`H-2` → `provident-ssr`: delivered, answered, the arm handed over; **`H-1` discharged at 0.6.0** (rev 15's `C-7` is the host-side adoption), **`H-2` withdrawn**. `H-3`/`H-4` → `provident-storeroom`: superseded/answered at 2.0.0. `H-5` → the WebAssembly arm: delivered and **discharged at 2.0.1**. Release summary: `Preempt-Providence/docs/handoffs-update-0.6.0-2026-11-23.md`.

## The worklist

The unit keeps one ledger of what its passes owe — re-grains performed, anomalies standing, process rules and environment limits — at
`strata/records/modularity-cleanup.md` (`D-319`). A cleanup pass sweeps it; a working pass appends to it. It carries no claim
about behaviour, so nothing cites it as authority.

## What a fresh session does next, in order

1. **The e2e battery, SPLIT BY `D-318`** — `M-11`/`M-13` file at `S-20` on one shared boot in `tests/e2e/module-channel/` (the harness is the executor battery's, ~650 lines of lock/reap/boot that must be carried or shared), and **`M-2b` moves to `S-23`/`U6`** because an update's second registration frame is dropped by the router's one-frame guard, so the updated `client` source is never evaluated and the arm's "old marker GONE" claim needs the inverse. Then `U2`'s declaration registry (which unblocks `S-18`/`M-18`), the `app-shell` L2/L3 eleventh-member re-grain, the **out-of-band activation sink**, and the earlier debts (the cap ruling, the ledger when `strata-state` returns).
2. **The harness-cap ruling** (one rule, two readings in the corpus), then the ledger when `strata-state` returns.
3. **`U2`–`U7`**, with **`U7`'s acceptance conversion last**.
4. **Move the ledger** to L4 and its artifacts when the workflow checkout is restored.

## Operating notes that cost real time

- **A first `npm test` after `npm install` can red on a still-materialising Electron binary**; the real reading is the second run (this pass saw 14 reds become 11 for exactly that reason).
- **An e2e battery boots `dist/`, not `src/`**: rebuild after a source change or the old bundle answers (`npm run build`; the battery only builds when an artifact is absent).
- **Each window's declaration block declares exactly that window's paths** (D-146); a committed path must not stay in a live block (P-5).
- **Commit per gate and never push** (D-6); a reading is taken on a clean tree; the four legs plus the boundary instrument are the floor (brief §6, D-301).

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-317", "why": "the handover's open items and next acts updated to the landed L4 and the remaining e2e/app-shell debts"}]}
```
