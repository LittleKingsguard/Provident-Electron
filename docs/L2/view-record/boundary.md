# L2 — `view-record`: the boundary row's grain, landed

- **Layer:** L2 · **Module:** `view-record` · **Unit:** `boundary-grain` — the unit whose design this pass LANDS; the gating row itself is module `store-view-record`'s (`strata/modules.json`) · **Branch:** `main` · **Rev:** 1 — **THIS PAGE IS NEW AND IT IS A SPLIT, NOT AN APPEND**: `interface.md` stands AT its class ceiling (150 lines, measured this pass), so the boundary row's grain takes a page of its own and `interface.md` is not touched (`D-1`, `D-2`, and design §3's `<module>/boundary.md` fallback).
- **Charter:** `D-301` — the user's *"Open unit"*. `docs/L1/boundary-grain.md` is the design this page lands the L2 half of: its §2 the two readings, §4 the retirement of the union, §5 who writes what.
- **Ceiling:** 150 lines · **Citations:** a source cite names its **site** and never an offset (D-41); a figure this page states is one this pass MEASURED, and a figure another document owns is read there (`D-43`).
- **Status:** LANDED, in one pass: the row, the retirement and the declaration block in §3. The block is the window that pass needed (design §3), and it is the first L2 block this instrument has carried.

## 0. Scope

This page fixes **what module `view-record` owes the worktree boundary instrument**: the row's declared-scope contract as it now stands, the coupling the row took and its price, and the declaration block's home. It fixes **no reading** — `B-1`, `B-2`'s three controls and `B-3` are `tests/integration/store-view-record/boundary.test.ts`'s and are byte-identical (`D-301`); **no grain** — the two readings, the partition and the in-flight rule are `docs/L1/boundary-grain.md`'s (§2, §4); and **no reader** — `tests/e2e/boundary-grain/declarations.ts` is L1's file (§5).

## 1. What the row asserts now, and what it stopped asserting

- **`DECLARED_SCOPE` IS A COMPUTATION AND NOT A LIST** (design §2, §4): `declaredScope(readInFlightDeclarations(editSetFromWorkingTree()))` — the concatenation, in page order, of every in-flight `boundary-declared` block's `writes[].path`, **never de-duplicated**, so `DECLARED_SCOPE_IS_A_SET` still bites on a path two seats declare (`D-146`, and `P-7` names both pages). A declaration counts **iff its own page is in the edit set**: the filter runs before the parse, so a committed page's block is history and cannot red this row, and a declaration dies at the commit that lands it (design §2, `E-5`).
- **THE 262 STANDING ENTRIES ARE RETIRED WHOLE, MEASURED RATHER THAN ASSERTED**: at `HEAD` `3aa3b56` the file was **2,025 lines**, of which the array block was **1,877 lines — 262 entries and 1,613 comment lines, no duplicate entry**; at this pass's landing it is **144 lines**. Each retired block's argument already lives in the `D-n` it cited — the union is the worktree's and not one unit's (`D-146`), the split by owner (`D-292`), the pin's three moves (`D-297`, `D-298`), the citation re-grain (`D-299`), the seven closes (`D-300`) — and **git is the history** (`D-1`, `D-2`; design §4).
- **TWO `B-1` ASSERTIONS RETIRED WITH THE LIST, AND THEIR SUBJECT MOVED TO A FIXTURE** (design §2, `E-7`): `toContain('src/main/view-record/index.ts')` and the `startsWith('src/main/')` arm asserted the **content of a hand list**. With the union computed an empty scope is lawful on a clean tree, so the replacement is `P-6`'s lawful fixture, which carries a `src/main/` entry and asserts `declaredScope` **admits** it, tree-independently — while `B-2(a)` still names a real `src/main/` file that must be **refused** (`D-301`).
- **`B-2`'S THREE CONTROLS AND `B-3` ARE BYTE-IDENTICAL, AND `editSetFromWorkingTree` MOVED RATHER THAN BEING COPIED** (design §2, §5): the reader is L1's `tests/e2e/boundary-grain/declarations.ts` and this row **imports it back**, so there is one reader and not two.
- **THE IMPORT IS A NAMED COUPLING WITH A PRICE, NOT AN ACCIDENT**: the row now reads a path its own module does not claim, which is `modules.md` §1's boundary-crossing trigger. It is accepted because one reader beats two, and **no map path moves**: `store-view-record`'s row already claims `tests/integration/store-view-record/boundary.test.ts` and its `endpoints` stays `7` — the reader's claim is `boundary-instrument`'s (`endpoints: 4`, design §5).

## 2. What a red now means, and the one thing that clears it

- **A RED IS A NAMED OFFENDER LIST, NOT A COUNT** (`D-74`, design §1): `B-1` prints every path the tree carries that no in-flight declaration names. A pass that writes a path anywhere owes **one entry, in its own scope, with its own reason** — no delegation, no prose block, no cross-module file (design §3, `D-300`, `D-301`).
- **AND IT IS RED BY CONSTRUCTION BETWEEN THE RETIREMENT AND THE DECLARATIONS** (design §4): a tree whose dirty paths are not all declared reds, which is the row working. This pass's own red is `strata/decisions.md` — dirty only because it carries `D-301` itself — and it is **L0's to declare from an L0 page**, because no L1 or L2 block may declare another seat's write (design §3, §4, `E-1`). **It is reported and not papered over.**
- **WHAT NO ARM CAN DO, SAID RATHER THAN IMPLIED** (design §3, `E-2`): nothing attributes a declared path to the seat that wrote it, and an entry is deliberately **not** confined to the declaring seat's module — a cross-module write is exactly what the row exists to declare. The instrument's claim is that **silence is impossible and the reason is reviewable**, never that the writer is the declarer: that is `D-44`'s unverifiable class.

## 3. This pass's declaration block — the window, and what it declares

The block below declares **the two paths this pass wrote**: the row itself, and this page, which is the block's own home (design §3: L2 → `docs/L2/<module>/`). It counts **only while this page is in the edit set**, so it is a window and not a permission; **the next pass that revises this page REPLACES it with that pass's own writes rather than appending beside it** (design §3's third cost, `D-1`). `unit` names the unit the design belongs to and the state ledger carries; `layer`/`module` are the page's own location, which is the authority (`P-4`); `by` defaults to `L2`, and no entry here declares another seat's write.

```boundary-declared
{"unit":"boundary-grain","layer":"L2","module":"view-record","writes":[
 {"path":"tests/integration/store-view-record/boundary.test.ts","why":"the boundary row re-grained: DECLARED_SCOPE becomes the in-flight computation over the declarations, the 262 standing entries retire, and editSetFromWorkingTree is imported back from the one reader instead of copied","d":"D-301"},
 {"path":"docs/L2/view-record/boundary.md","why":"this page: the row's grain as landed, its coupling and its red, and the declaration block this pass's writes need a home in","d":"D-301"}]}
```

## 4. What this page does not do

- **No relaxation and no widening**: the per-file rule stands — an entry is a FILE carrying its own reason, never a directory, never a prefix, never a glob — and one reading still covers the **whole tree**, so no undeclared cross-module edit passes (`D-301`, `ASM-BG-1`, `ASM-BG-2`).
- **No `src/` byte, no behaviour, no module's claimed path in `strata/modules.json`, no reworded `D-n`** (`D-301`, `ASM-BG-3`); the map's `boundary-instrument` row is L1's claim and this page moves nothing in it (`D-43`).
- **No second boundary row over a narrower tree**, and no census of the dirty tree: a reading that built the declared set from the diff would be a row that cannot fail (`D-30`, `D-40`, `D-301`).
- **No standing permission is restored by this page's existence**: the block is inert the moment this page is committed, and `P-5` refuses an entry for a path nobody touched (`D-146`, design §2).
