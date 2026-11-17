# family-helper-walkthrough — run 4, verdict **PASS** (blind runner, staged root `/tmp/fh-walkthrough-4`, 2026-11-16)

**Staging** (`strata/walkthrough.md` §3, read for scope this time): **the documents the unit owns and hands out** — `docs/L1/family-helper.md`, `docs/L2/view-record/family-object.md`, `docs/L2/store-tabs-record/interface.md`, `docs/L3/view-record/family-object.md`, `docs/L3/view-record/delivery.md`, `docs/guides/forking.md` — plus `strata/`, `src/`, the built `dist/`, the three root pointers, listings and an empty `work/`. **Excluded by the rule, not by convenience**: `tests/`, `scripts/`, `node_modules/`, and other modules' design pages this unit does not touch (`docs/L2/view-record/interface.md`, `docs/L3/view-record/design.md`), whose staleness is pre-existing and not this unit's to answer — run 3 staged all of `docs/` and imported exactly that noise.

## The scenario set (11 steps, authored at exit from the documentation and `brief.md`)

`1` declare a family (spec = tag + address + tier, + id and a body factory) · `2` forget the body (a compile error, and why the tag carries it) · `3` declare a family with no invariant (the unpaired arm, and the precedent) · `4` get it into the construction (**which lists are projections and which are not**, and how a new family's listener is reached) · `5` prove no family went missing (the entries↔roots rows, and what each does not prove) · `6` the contract (IN/OUT, the unpaired arm's explicit `null`) · `7` structure, signatures and guardrails before writing code · `8` locate the exports at the cited positions · `9` what the object does not do, and where to go instead · `10` the ruling and the alternative not taken · `11` one entry point reaching the contract, the layer pages and the rows.

## Report

| steps | outcome | guessed |
|---|---|---|
| `1` `2` `3` — the spec, the arms, the unpaired precedent | satisfied; `src:1297-1330`, `:1349`, `:1396` corroborate name for name | no |
| `4` — the three spread lists | satisfied **without overclaim**: `constraints:`/`declaredRoots:` are projections, `listeners:` is the delivery's own private array, and the guide tells a fork to add its address there in the same edit as its spec | no |
| `5` — the rows | satisfied; both `FH-1` and `FH-2` named with their limits and the "independence census, not an agreement proof" caveat | no |
| `6` `7` — contract, structure, guardrails | satisfied; the L3 `§2` block reproduces `src:1297-1339` exactly and `FG-1` holds at the landing | no |
| `8` — the exports | satisfied — **exact**: `viewFamily` `1349`, `VIEW_FAMILIES` `1374`; every other offset lands too, and `dist/main/main.mjs:37711` carries the object | no |
| `9` `10` `11` — the limits, the ruling, the hand-on | satisfied; `D-292` states the form, the row beside it and the alternative not taken | no |

**`docs-insufficient` — empty. `docs-stale` — empty. `undocumented` — empty.**

**Notes only, not contradictions**: `paneOf` cited at `:576` (declared `:544`, so the reader lands inside its arms — the same start §11 uses); the three id constants cited as `:119`/`:163`/`:166` in list order though the lines are panes/theme/zones; §11's `:1014-1110` covering `panesMustStand` whole and `zonesMustStand`'s head. **`D-292` carries pre-`H-1` offsets** that no longer land (`:1395-1400` vs `:1334-1341`); the ruling is unaffected and the register is L0's — recorded to `D-293` rather than reworded here (`D-46`).

**The three runs, in one line each.** Run 1 **STALE**: the guide claimed "the two lists are its projections", five offsets were pre-`H-1`, and L3 still called the object unlanded. Run 2 **STALE**: the opener still described the pre-`H-1` shape, and no entry point reached the two layer pages. Run 3 **STALE**: the sentence written to fix run 2's opener had the object *minting the entry*. **Each finding was real and each was mine**, and the fact that bit three times is the one the unit exists to state: **the entry belongs to the delivery, never to the declaration half** (`D-292`, `docs/guides/forking.md` §2.5).

**Unverifiable here, never falsified**: the rows' content, the four legs and §11's `run` rows (`tests/` absent by the staging rule). The readings are the loop's own: `2,984 passed / 2 skipped of 2,986` over `149` files at `c92ad9a`, `typecheck` 0, `typecheck:tests` 0, `build` 0, `strata-marks check` exit 0.

**Out of this unit and routed rather than taken** (run 3 saw them because its root was too wide; they are real): `docs/L2/view-record/interface.md` and `docs/L3/view-record/design.md` describe the landed width/height wire and the receipt reader as owed, and one states two pane ids where the tree names three — `store-view-record`'s L2/L3 owe that currency pass, and it is not this unit's document.
