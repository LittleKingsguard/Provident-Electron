# handover — 2026-11-24: all eleven `modularity` suite reds are closed and the four legs are green; the next acts are the door's row, the boot census route and the two named halves

Read `strata/brief.md` first, then `strata/decisions.md` from `D-304` onward.

## Where the branch stands

`main` carries the work at `a58a7ab` plus this pass. **The remote now carries that commit** — `git ls-remote origin main` answers `a58a7ab…` — so the older "nothing is pushed" line is STALE as a status claim; what stands is the RULE: this pass pushes nothing (D-6's pointer clause, D-119). The unit `modularity` (D-306) went L1 rev 15 → L2 → L3 → L4; `.strata/units/modularity.json` still reads `layer: L3`, `stage: design`, `artifacts: []` because `strata-state` is not in this checkout — **the ledger is behind the work** (D-26, `platform.md` §4). The unit's record is `strata/records/modularity-unit.md`; its design `docs/L1/modularity.md` rev 15.

## What landed this pass

- **Eleven reds closed.** Eight by instrument re-grains that keep their claims: `I-3`/`I-8` (the activation's `module:<name>:` log prefix), `M-1`/`M-2` (the verdicts array, and the SDK's `isError` arm as a refusal), `S-9` (value imports only: three, with two `import type` sites named), `S-11`/`ISO-4` (an `electron` binding, not the word `ipcRenderer`, which `admission.ts` names in its forbidden-token census), and `REGISTER-EXEC-1` (declaring `registrationAllowed` in the focus register's cross-unit fence).
- **`M-3`/`M-4`/`M-5` closed on the user's ruling (`D-315`, "Activate first, persist on success")**: the census check is READ-ONLY, a rejected/no-op verdict ends the arm, the source goes to the port's `install`, and the row is persisted only on a non-refused verdict before `rePublish()`. A refused install is never stored, so a retry reaches the resolver. L3 §5 and `signatures.md` §5 are re-grained to that order.
- **The `invoke` door's rows are written**: `MS-9` (unit, declared store double) and `I-9` (integration, real store) drive the handler's own value, `tool-unknown` after `deactivate`, `handler-threw`, and a still-standing handler as the positive control — the gap the L2 and L3 pages had named.
- **The pins stand**: `provident-storeroom ^2.0.0` (lock 2.0.1), `provident-ssr ^0.6.0`; the demo bundle regenerated; `SC-1` reads `15`/`14`; the map's `module-system` `endpoints` **24** (cap **290**, D-14).

## The readings (clean tree)

`typecheck` **0**, `typecheck:tests` **0**, `build` **0**; **`npm test` GREEN — `0 failed / 3,033 passed / 2 skipped` of `3,035` over `158` files**; the unit batteries **16/16** (9 + 7); the boundary **10/10**. **ALL FOUR LEGS ARE GREEN** (`npm test`, `typecheck`, `typecheck:tests`, `build`; `AGENTS.md`, `brief.md` §6). `strata-lint` **211** stands as the last reading and was NOT re-taken — `../Agent Harness/` is absent from this checkout.

## What is open, named not hidden

- **The boot census activation route**: a census-loaded module has no activation path after `syncModuleRouter`'s retirement.
- **The two outstanding halves**: the registration frame's wire (`S-12`'s eleventh member + `secure-panels` lockstep + `module-channel`'s receiver + three census rows) and the out-of-band activation sink (`design.md` §5's third caller).
- **L1 currency**: `docs/L1/modularity.md` still reads `module-system` `endpoints` **16**; the map reads **24** and L2 rev 3 derives 24 member-by-member. The move is L1's to file (the page is at 150/150, so a re-grain must compress).
- **The harness-cap rule is stated two ways**: `bundle-boot-seam`'s pages say a product battery is EVIDENCE and does not count; `module-system`'s L2/L3 count the 246-line battery against the cap. One ruling is owed.
- **The state ledger is behind** (`L3`/`design`/no artifacts) and cannot be moved without `strata-state`.

## The handoff set (by pointer)

`H-1`/`H-2` → `provident-ssr`: delivered, answered, the arm handed over; **`H-1` discharged at 0.6.0** (rev 15's `C-7` is the host-side adoption), **`H-2` withdrawn**. `H-3`/`H-4` → `provident-storeroom`: superseded/answered at 2.0.0. `H-5` → the WebAssembly arm: delivered and **discharged at 2.0.1**. Release summary: `Preempt-Providence/docs/handoffs-update-0.6.0-2026-11-23.md`.

## What a fresh session does next, in order

1. **Write the boot census activation route** — the last named gap in `U1`'s delivery.
2. **L1's `16 → 24` re-grain**, then the cap-rule ruling.
3. **The two outstanding halves**, then **U2–U7**, with **U7's acceptance conversion last**.
4. **Move the ledger** to L4 and its artifacts when the workflow checkout is restored.

## Operating notes that cost real time

- **A first `npm test` after `npm install` can red on a still-materialising Electron binary**; the real reading is the second run (this pass saw 14 reds become 11 for exactly that reason).
- **An e2e battery boots `dist/`, not `src/`**: rebuild after a source change or the old bundle answers (`npm run build`; the battery only builds when an artifact is absent).
- **Each window's declaration block declares exactly that window's paths** (D-146); a committed path must not stay in a live block (P-5).
- **Commit per gate and never push** (D-6); a reading is taken on a clean tree; the four legs plus the boundary instrument are the floor (brief §6, D-301).

```boundary-declared
{"unit": "modularity", "layer": "L0", "module": null, "writes": [{"path": "strata/records/handover.md", "d": "D-306", "why": "the session handover replaced whole: the green floor, the eleven closed reds, D-315's ruling, the other open items and the next acts"}]}
```
