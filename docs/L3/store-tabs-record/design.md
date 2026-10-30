# L3 — `store-tabs-record`: the module design

- **Layer:** L3 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — the crossing's structure.
- **Inputs:** `docs/L2/store-tabs-record/interface.md` rev 1 §1–§6; `docs/L1/store-tabs-record.md` rev 1 §1–§3.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** structure and guardrails; every declared name and its exact text
  is in `signatures.md`, which is what L4 transcribes (D-45).

## 1. The structure — three files, one owner each

The module is main-side and has no renderer code. Three files, and each exists because a different thing could go wrong:

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/tabs-record/index.ts` | the instance, its one file path, its two addresses, and the three verbs | the store's whole life is here, so the surface holds no store verb and `main.ts` holds no file path |
| `src/main/tabs-surface/index.ts` | the surface module: the one reference, the constraint, the listener fan-out, the refusal mapping | the instance is constructed once, and the module that constructs it is the only one that can name it (the `settings-surface` arrangement, `docs/L1/security-store-storeroom.md` §4) |
| `src/shared/tabs-channels.ts` | the two channel constants, single-sourced | a channel name spelled in two files is a rename that half-lands (`store-channels.ts`'s precedent) |

**One construction site, checked as an absence**: no file outside `tabs-surface/` may call the constructor, and no file the
MCP stack reaches may spell the instance's file name. That is the isolation property this module shares with the operator's
store, and it is asserted the same way (`docs/L1/security-store-storeroom.md` §6's `ISO-5`/`ISO-6`).

## 2. The instance, and what is not decided by this module

The instance is `provident-storeroom`'s, created with one file path and no options of its own — the package owns the file's
byte image, its journal, its rollback and its durability (`guide §9`). This module chooses **three** things and no more: the
file name, the two addresses, and the constraint.

**A construction that cannot stand is answered, not thrown.** The surface holds a nullable instance and every verb answers
`FilePathUnreachable` while it is null — the shape `settings-surface` already uses for the same reason (a store that cannot
stand must not take the app's boot with it).

## 3. The three verbs, and the two that are not verbs

`read()`, `commit(row)` and `onChanged(handler)` are the surface's whole public surface. Two more exist and are named so no
reader looks for them: **there is no `delete`** (a tab leaves by being absent from `order`, and the store's own removal is the
constraint's corrective write, not a caller's), and **there is no `journal`** (the record's history is the package's, and a
second reader of it would be a second opinion about the record's past).

## 4. The constraint — the engine's, declared once

The constraint is registered at construction, over the `tabs` matched set, evaluated on `set`/`commit`/`remove`. Its
**corrective write** deactivates every active tab but the one the commit named; when the commit names none, it keeps the
last-active order seat and deactivates the rest.

**The constraint never mutates its argument** — it answers the corrective write and the engine applies it. That is the same
rule the gate-era constraint carried (`§0A` item 3), and it survives the move unchanged because it is the engine's rule, not
the renderer's.

**A repaired commit answers `committed` with the repair named** (L2 §3): the renderer re-reads and renders what the store
says, rather than being told what to think.

## 5. The listener — an address, never a payload

`onChanged` subscribes once and re-delivers every committed change of the `tabs` root. The delivery names the **triggered
address** and never the value (`guide §6.4`): a renderer that needs the value re-reads, and a renderer that needs to know
*what moved* diffs the record it already holds.

**The withdrawal is its own answer** and is exercised: a boot that subscribes and a teardown that withdraws is the pair,
and a listener that outlives its window is a leak the renderer cannot see.

## 6. What this module may not do

- **No MCP surface.** No tool, resource or `RpcMethod` member names the instance or its file; the crossing is the bridge's
  and only the bridge's.
- **No renderer import.** `src/renderer/**` never imports these files — it reaches the record through `window.provident.tabs`
  and nothing else, which is the property that keeps the renderer a client (D-63).
- **No second instance.** One construction site, one file, one constraint. A second `createTabsRecord` call anywhere is a
  finding, not a convenience.
