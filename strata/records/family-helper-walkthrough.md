# family-helper-walkthrough — run 1, verdict **STALE** (blind runner, staged root `/tmp/fh-walkthrough`, 2026-11-16)

**Staging** (`strata/walkthrough.md` §3): `strata/`, `docs/` (all three layer scopes and the fork guide), `src/`, the built `dist/`, the root pointers `README.md`/`AGENTS.md`/`package.json`, three path listings and an empty `work/`. **`tests/`, `scripts/` and `node_modules/` deliberately absent**, so a claim needing a test's content is `unverifiable` and never falsified (D-44).

## The scenario set (11 steps, authored at exit from the documentation and `brief.md`, never from the source)

`1` declare a family (spec = tag + address + tier, + id and a body factory) · `2` forget the body (compile error, and why the tag carries it) · `3` declare a family with no invariant (the unpaired arm, and the precedent) · `4` get it into the boot's construction (which lists are projections, which exports produce them) · `5` prove no family went missing (the entries↔roots row, and what it does NOT prove) · `6` the contract (IN/OUT, the unpaired arm's explicit empty value) · `7` structure and signatures before writing code (§2 and the guardrails) · `8` locate the exports in `src/` at the cited positions · `9` what the object deliberately does not do (and where routing belongs) · `10` the ruling behind the form (`D-292`, and the alternative not taken) · `11` hand it on (one entry point reaching both layer pages and both rows).

## Report

| step | action | citation | outcome | guessed |
|---|---|---|---|---|
| 1 | §2.5, L2 §1, `src:1288-1397` | `forking.md` §2.5 | satisfied | no |
| 2 | §2.5, L2 §2, the two arm interfaces | §2.5 | satisfied (the `tsc` measurement is `unverifiable` in the root) | no |
| 3 | §2.5, L2 §1, `VIEW_FAMILIES`' fourth member | §2.5 | satisfied | no |
| 4 | §2.5, then `main.ts:437`/`:452`/`:640`, `createViewDelivery` | §2.5 | **stale** | **yes** |
| 5 | §2.5, §11, L1 §5, L2 §4 | L1 §5 `FH-1` | satisfied (row content `unverifiable`: `tests/` absent) | no |
| 6 | L2 §1/§2, L1 §4, L3 §2 | L2 §1 | satisfied | no |
| 7 | L3 §2-§5 | L3 §2, `FG-1` | **stale** on the page's status | no |
| 8 | grep of `src/` exports | §2.5 | satisfied — `:1349`, `:1374` exact | no |
| 9 | §2.5, L3 `FG-1`, L1 §1 | §2.5 | satisfied (one cite stale) | no |
| 10 | `D-292`, `D-291` | `D-292` | satisfied | no |
| 11 | `README.md` → guide; every link in §2.5/§11 | — | **doc-gap** | **yes** |

**`docs-stale` (4).** (i) **`forking.md` §2.5's *"the two lists are its projections"*** — `constraints:` is projected (`main.ts:437`) but **`listeners:` is the delivery's**, built from the module-private `VIEW_DECLARED_ADDRESSES` (`src:1511-1516`), which the L3 page requires to stay un-derived (`FG-6`), and `viewDeclaredRoots()` is spread into the data surface's `declaredRoots` (`main.ts:640`), not into `listeners:`. (ii) The same section's `:1292`/`:1334`/`:1439`/`:1391`/`:1439-1479` offsets, which are `1414`/`1455`/`1555`/`1507`/`1555-1595` after `H-1`. (iii) `docs/L3/view-record/family-object.md`'s header and §6 still call the object **UNLANDED**. (iv) `docs/L1/family-helper.md` §1/§3's offsets into the changed file no longer land.
**`docs-insufficient` (2).** No document states how a fork's family reaches `listeners:` at all, or that `createViewDelivery` is closed to the four addresses; and no entry point links the two layer pages (§2.5/§11 name the rows and the ruling, not the pages).
**`undocumented` (3).** The third spread site (`declaredRoots:`, `main.ts:640`); that `createViewDelivery(sink)` cannot carry a fifth address; and what `declaration(getStore)` answers for the `id: undefined` escape (`null`, from the tag test at `:1351-1353`).

**Routing** (`strata/walkthrough.md` §5): (i)(ii) and the L0-owned documents to **L0**; (iii) to **L3**; (iv) to **L1**; the two `docs-insufficient` findings split the same way — the listener gap is L0's to state and L1's to design around, the entry-point gap is L0's.

**§11 of the guide claimed `FH-1`/`FH-3` were `run`, and `tests/` is absent from this root by construction**: the claim is `unverifiable` here, not falsified — the readings are the loop's own (`d0aef4b`: `2,980 passed / 2 skipped of 2,982` over `149` files).
