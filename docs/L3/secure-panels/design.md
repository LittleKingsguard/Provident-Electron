# L3 — `secure-panels`: the structure

- **Layer:** L3 · **Unit:** `secure-panels` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 is read through this one: §9's stale-prose item is **discharged** at this head (L1 re-grained the leg's red-first block), the substantive point it carried is kept, and its cite is the file, never a line range (D-28, D-39) · **Artifact:** `l3-secure-panels-design`
- **Status:** DESIGN — the **spelling** of one repair in one file: the import specifier, the annotation, the projection and the order it relies on, the one narrowing `S-7` forces, the `data` label's words, and L4's edit order. The **arrangement** is L2's (`docs/L2/secure-panels/interface.md` §1-§2) and is restated here, never re-decided (D-3, `examiner.md` §4). Every declared name and every line of exact text is `signatures.md`
- **Inputs:** `docs/L1/secure-panels.md` §1/§2/§4.3/§5/§7/§8 (E-1, `P-1`…`P-7`, F-3, ASM-3); `docs/L2/secure-panels/interface.md` §1-§5/§8-§9 (`R-3`, `S-1`…`S-7`, `ASM-L2-1`…`ASM-L2-5`), `behaviour.md` §2/§3/§7, `persistence.md` §3/§5; `strata/decisions.md` D-1, D-3, D-7, D-11, D-14, D-23, D-26, D-30, D-31, D-37, D-38, D-39, D-40; the `secure-panels` row of `strata/modules.json` — its paths and `endpoints` are read from the row and never restated here (D-39, D-26); `docs/L3/bundle-boot-seam/{design,signatures}.md` for the house shape; the tree at this head
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `T-n` is a probe this seat took on **2026-10-30** at this head — a **byte copy** of `src/` under `/tmp`, the repo's own `tsc` and `node_modules`, no file of the repository written and the suite and the Electron legs not run; `S-n` is L2's `interface.md` §3 probe; `P-n` is L1 §4.3's live row; `G-n` is this document's guardrail. A `file:line` is this head's dated reading (D-28); after the landing the anchors are `signatures.md`'s exact texts, not the numbers

## 0. Scope: the spelling, and what this document does not fix

- **This layer spells; it does not choose** (`brief.md` §3, L2 `R-3`, D-3). The arrangement — **one label table typed exhaustively against the gate's union, its roster projected from its own keys** — is L2's `interface.md` §1 and is taken as given (§1, §2 below restate it only as far as the text needs).
- **What is fixed here, and nowhere else:** the import specifier and its site; the annotation's spelling; the projection's spelling and the order guarantee it leans on; the one narrowing at `syncConfig`'s `toggle:` arm; the `data` entry's displayed text; the order L4 applies the three regions in (§1-§5).
- **What is not fixed here:** any behaviour (`P-n` and `behaviour.md` own it), any byte (`persistence.md` owns it), any census figure or script key (§8, §11; D-14, D-26, D-37), and no implementation — this seat writes no `src/` line (D-3).

## 1. The annotation, and the site the type reaches the file from

- **The table's spelling:** `const GROUP_LABELS: Record<ToolGroup, string> = { … }` — the existing constant, keeping its name (L1 E-1, L2 §1 name it) and gaining the annotation that replaces `Record<string, string>` (`src/renderer/secure-panels.ts:73` today).
- **`ToolGroup` arrives by a type-only import from the gate module**, on the file's own landed idiom for `ExclusionState` (`src/renderer/secure-panels.ts:38-40`; L2 `ASM-L2-2`, S-4): the **second specifier on the existing `'../main/security.js'` import line**, not a new import statement and not a new file — so the *statement* gains no line and one specifier (two comment lines are added above it, `signatures.md` §2.1), and the `import type` keyword erases it at build (S-4's byte-free precedent).
- **The gate exports the type and only there** (`export type ToolGroup = 'read' | 'dispatch' | 'graph' | 'code' | 'module' | 'data'`, `src/main/security.ts:3`), so this is the only site the binding can come from; D-11's union is the one the net is built against.
- **No `as const`, no `satisfies`, no `Readonly<>`** on the table: `as const satisfies Record<ToolGroup, string>` reddens on the same missing/misspelt/excess keys **and** still answers `Object.keys` as `string[]`, so it buys no net and costs the same assertion (§2) — refused rather than held in reserve.
- **The net is `npm run typecheck`** — `tsconfig.json`'s `include` is `src/**/*.ts`, so the pane's file is in it, and it is one of `brief.md` §6's four floor legs: no `DISPLAY`, no leg, no mark (D-37, D-40).

## 2. The projection, and the order it relies on

- **The roster is the table's own key list, projected once:** `const GROUPS = Object.keys(GROUP_LABELS) as readonly ToolGroup[]`, declared **after** the table, and the hand-written `['read', 'dispatch', 'graph', 'code', 'module'] as const` literal at `src/renderer/secure-panels.ts:72` retires with it (L1 E-1's own clause; L2 §1-§2, `S-3`).
- **The assertion, exactly what it asserts, and why nothing weaker works:** it asserts *nothing about the keys* — the annotation has already proven the key set **is** `ToolGroup` in both directions (T-4: a seventh union member with no row is `TS2741`; T-5: a row naming a non-group is `TS2353`, a misspelt key `TS2561`). It only re-narrows the **return type of `Object.keys`**, whose two declarations in the standard library of the `typescript` this head pins (5.9.3) both answer `string[]` — `lib.es5.d.ts:264` and `lib.es2015.core.d.ts:325`, read this head; no narrower signature exists, and a generic helper `function keysOf<T extends string>(t: Record<T, string>): readonly T[]` merely relocates the same assertion into a named binding this file does not need. **A third reason it is load-bearing, measured:** with the projection left as `readonly string[]` the file reddens **twice** — `TS7053` at the roster's use *and* at `paneEnvelope()`'s `content: GROUP_LABELS[g]` (T-3), so a hand-written tuple would have to come back to avoid it, which is the second list the unit exists to retire.
- **What the projection makes true by construction:** there is no second list, so an entry added to the table **is** the row (`paneEnvelope()` maps `GROUPS`, `src/renderer/secure-panels.ts:171-177`), and a row can exist with no label only if the table lacks the key — which is `TS2741`.
- **The insertion-order guarantee, stated because the design leans on it:** `Object.keys` answers a plain object's own **string** keys in *property creation order*, after any *array-index* keys, which sort first in ascending numeric order (ECMA-262 `OrdinaryOwnPropertyKeys`; T-6 measured the six group names insertion-ordered and a canonical-numeric key jumping to the front). So `data` renders **last** iff it is the literal's last entry — which is why §4 and §5 place it last and why `P-7` reads the five landed rows' order after the fact.
- **What would break it, named so a later author does not:** a group whose name is a canonical numeric string (`'0'`, `'1'`, …) — it would sort ahead of `read`; a table **not** authored as one literal (a loop, `Object.fromEntries` over a sorted or re-ordered source, a `delete` then re-add, a spread that rebuilds the object in another order); and a re-ordering of the literal itself — a legal single-table edit, so not impossible, but its unintended occurrence is what `P-7` catches at runtime (`docs/L1/secure-panels.md` §4.3).
- **`paneEnvelope()` is not edited:** `GROUPS.map((g) => …)` and `content: GROUP_LABELS[g]` compile unchanged under the projection (T-2), so the sixth row arrives as data, not as a node this layer authors (`brief.md` §2; L1 §5).

## 3. `S-7`'s one narrow: the guard reads the roster, never a cast

The site is `syncConfig`'s `toggle:` refresh arm, where a `string` group is sliced out of the `toggle:<group>` node id and used to index the table (`src/renderer/secure-panels.ts:545-549`; L2 `S-7`). **Measured at this head on the repaired file: exactly one `TS7053`, at the table index** (`:549`); `:546`/`:547` are the slice and the `enabled.includes` and stay clean (T-2) — L2's `:546,549` names the arm's two lines, not two reddenings.

| Variant | What it asserts | Verdict |
|---|---|---|
| **roster guard — `const g = GROUPS.find((k) => \`toggle:${k}\` === id)` then `if (g === undefined) continue`** (chosen) | nothing beyond what `GROUPS` already carries: the element type is `ToolGroup`, so `g` **is** `ToolGroup | undefined` and the index needs no assertion at all | **taken**: keeps the compiler honest, adds no name, no helper, no cast, and makes a `toggle:` id that spells no group refresh **nothing** |
| narrowing helper — `function isToolGroup(v: string): v is ToolGroup` over the table's own keys | membership, at runtime, derived from the same table | refused: a module-level name this file does not need; the roster already answers the same question in one expression |
| `Record<string, string>` view for the index site | nothing — it re-opens the hole the annotation closed and types the miss as `string`, so a missing label paints `☐ undefined` silently rather than failing | refused: it *weakens* the compiler at the one site the unit is about (L2 `S-2`) |
| cast — `GROUP_LABELS[g as ToolGroup]` | that the sliced string is a member, with **no check**; true only because `paneEnvelope()` authored the id from `GROUPS`, and silently false the moment any other `toggle:<x>` node exists | refused, and named rather than held: this is the one arm this layer will not take, and the reason is that its failure mode is a painted `undefined` and not a red |

- **The chosen text, and why it is not a new pattern:** it narrows through the value that already exists (the roster), keeps the branch's landed condition (`id.startsWith('toggle:')`) byte-identical, and is the house idiom for this loop shape — `continue` for a node this pass does not own (`src/renderer/renderer.ts:281,299`; `src/renderer/runtime.ts:150,205`). Its behaviour is identical for every id `paneEnvelope()` authors, and strictly stronger for any other (L1 §5's "nothing else moves" is kept by construction).
- **Rejected narrower spelling, recorded:** dropping `startsWith` and relying on the `find` alone — the same set of refreshed nodes, but it changes the landed condition line, which L1 §5 asks to keep, and it hides the id scheme from the reader.

## 4. The `data` entry's words

- **The text, exactly:** `data: 'data (data.read/write/delete/list/journal — the central store)',`
- **Why these words:** it **leads with the group name**, which is what `P-3` reads (`/\bdata\b/` on the rendered row's text; the row paints `☐ ` in front of it after the first carrier answer, `behaviour.md` §2), and it keeps the family style of the five landed labels: `code` and `module` spell their tool sets in the compact `family.member/member` form with an em-dash qualifier, and the qualifier here names what the group reaches rather than a default (a default is `data-on`'s business, and the pane holds no state of its own — `behaviour.md` §2; the `D-vi` shape at `src/renderer/secure-panels.ts:322-332`).
- **Last in the literal, therefore last in the roster** (§2), which is `P-7`'s row: the five landed texts are byte-identical and in their landed places; `data` is appended.
- **The text is not type-checked** — nothing prevents a label that omits the word `data`; `P-3` is the row that reads it, and that is the whole reason it is a row (`docs/L1/secure-panels.md` §4.3).

## 5. L4's single shot: the three regions, in this order

One file, three regions, one pass (`src/renderer/secure-panels.ts`; exact text in `signatures.md` §2).

| # | Region at this head | What lands | Why this position in the order |
|---|---|---|---|
| 1 | the type-only import, `:40` | `ToolGroup` as the **second specifier** of the existing `'../main/security.js'` import | nothing below compiles without the name; it alone leaves the file green |
| 2 | the constants block, `:72-79` | the table, **annotated `Record<ToolGroup, string>`**, six entries in the landed order with `data` **last**; then the projection `GROUPS` **declared after it** | the projection's element type is the table's key set, so the table must exist typed before it; the retired `GROUPS` literal is deleted here, never left beside it |
| 3 | `syncConfig`'s `toggle:` arm, `:545-549` | the roster guard (§3), one line replaced and one added | it indexes the table with `g`, so it needs region 2's `GROUPS`; applied before it, the same line indexes a `Record<string, string>` and passes for the wrong reason |

- **The intermediate state is expected and measured:** after regions 1-2 and before region 3 the file answers **exactly one** `TS7053` at the arm's table index (T-2) — an L4 that meets it mid-pass is meeting the design's own statement, not a mistake; the green is region 3's.
- **No fourth region.** `paneEnvelope()` (`:171-177`), the handler bodies (`:123-165`), the `declare global` block (`:42-70`) and every other arm of `syncConfig` are **not edited**: they compile unchanged (T-2), and an edit there is an invention beyond E-1 (§8 `G-4`).
- **The order is not a preference:** it is the dependency order of the three texts, and it is the only order in which each region's meaning is checked by the region above it.

## 6. What the spelling makes impossible, and what it does not

**By name, and by which of the three texts prevents it:** the **annotation** (§1) makes a seventh gate group with no pane row and a pane row naming no gate group impossible to compile; the **projection** (§2) makes a roster that disagrees with the table unrepresentable, because there is no second list; the **narrowing** (§3) makes a `toggle:` node painted from a missing label impossible. The rest of the table is what they do **not** prevent, listed so no reader takes the net for wider than it is.

| Mistake | Status under this design | Instrument |
|---|---|---|
| a seventh gate group with no pane row | **impossible to compile** — `TS2741`, on the file the union was widened in, in the unit that widened it (`S-1`, T-4) | `npm run typecheck` |
| a pane row naming no gate group | **impossible to compile** — `TS2353` (T-5) | `npm run typecheck` |
| a misspelt key / a label with no group | **impossible to compile** — `TS2561` (T-5) | `npm run typecheck` |
| a roster that disagrees with the table (a second list, an entry added to one of the two) | **unrepresentable** — there is no second list; the projection is the roster's only author (§2) | by construction |
| a `toggle:<x>` node refreshed from a missing label | **impossible** — the guard refreshes nothing (`☐ undefined` cannot be painted; §3) | region 3 |
| the gate's two `VALID_GROUPS` copies drifting from the union | **not prevented here** — `P-1` reads both against the union at run time (L2 `ASM-L2-3`, `R-4`) | the live leg |
| a re-ordered roster | **not prevented** — the order is the literal's; a reorder is one legal edit, and `P-7` is the row that reads the five landed places (§2) | the live leg |
| a label whose text omits the group name | **not prevented** — label text is not type-checked; `P-3` reads it (§4) | the live leg |

## 7. The unit battery: none, and why that is the honest answer

- **Verdict: no `tests/unit/secure-panels/` battery, and no map claim requested.** The `secure-panels` row of `strata/modules.json` claims no `tests/unit/` path (read from the row; D-39) and this seat asks for none — a claim is owed only to an artifact that would prove something (D-7).
- **Why the type-check already owns the claim:** the binding this unit creates is a *type* claim, and its instrument answers both directions in the unit that moves the union (T-4, T-5). A node-side row could only restate it by matching the projection's **source text**, which pins L3's spelling instead of the property and reddens on a legitimate re-spelling — the re-grain shape D-30 removes and D-31 does not restore.
- **Why a runtime row is not available to this unit:** the roster is module-private. Asserting `set(Object.keys) = union` at run time needs the constant imported, which means **exporting** it — a new exported value name, i.e. a census move on the map row this unit's E-1 does not declare (`N` is the surface the module exposes; D-14). A row is therefore not merely redundant, it is **priced outside E-1**.
- **The one claim a node row could add that the type-check cannot** — the *authored* first paint: six rows, `data-on="false"`, one generated handler name each, the sixth entry's text — is the module suite's claim, and its home is the path the row already claims for that class, not the unit path (L2 §7's table assigns exactly this to `tests/integration/secure-panels/`; `behaviour.md` §2 `ASM-L2-6` states the live leg reads after the first carrier answer). Nothing is left over for a unit battery.
- **The falsifier for a later unit:** if a future arm exports the roster as a value (L2 §2's arms (c)/(d)), a unit row asserting key-set equality against the union becomes worth writing — and that unit owes both the export's census and the row's map claim, not this one.

## 8. Guardrails L4 may not violate (L1 §5/§7, D-3, D-18)

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **One file, three regions**: `src/renderer/secure-panels.ts` only — no `src/main/**`, no `src/shared/**`, no `scripts/`, no `package.json`, no test, no map, no other layer's document | L1 §7 E-1; D-3, D-7 |
| `G-2` | **No second list survives**: the `GROUPS` literal is deleted in the same pass that adds the projection — a file holding both is a file with two authors of the roster and the unit's whole claim is void | §2; L2 §1 |
| `G-3` | **The annotation is on the table, the cast is on `Object.keys`, and neither moves**: no `as const`, no `satisfies`, no `Record<string, string>` view, no cast at an index site | §1, §2, §3 |
| `G-4` | **The five landed rows are byte-identical and in place**, and no node, class, pane id, handler name, CSS or DOM is authored: `paneEnvelope()` and the handler bodies are untouched | L1 §5; `P-7`; `brief.md` §2 |
| `G-5` | **No name is minted**: no exported symbol, no MCP tool, resource, route, `RpcMethod` member, bridge channel, `window.provident` member, script key or file | D-11, D-14, D-18, D-37 |
| `G-6` | **The net must stay on the floor leg**: the change may not be moved to a marked row, a display-gated leg or a lint of its own; the type-check is the instrument (`G-1`'s reason) | D-26, D-37, D-40; L2 §1 |
| `G-7` | **The gate's and the instance's group sets do not move**, and neither copy is bound here: their drift stays `P-1`'s runtime reading | L1 §5; L2 `R-4`; D-23 |

## 9. Where L1's and L2's documents cannot both be satisfied at once (D-3: named, not edited)

- **E-1 says two things that cannot both hold literally.** `docs/L1/secure-panels.md` §7 E-1 requires the table to be `Record<ToolGroup, string>` off a **type-only** `ToolGroup` **and** says "Nothing else in the file moves (`:72-79`)" — but the type can only enter at the **existing import line `:40`**, so the landing writes a fourth site outside the range E-1 cites. The *outcome* E-1 states is satisfiable; the *range* is not. L2's `R-6(i)` names the same clause from its other side ("two entries … and nothing else in the file"); the import site is that clause's second half, and it is named here because it is the half L4's diff would otherwise be accused of inventing.
- **The narrowing is a write E-1 does not name at all.** `syncConfig`'s arm (`:545-549`) is outside `:72-79` and outside "the sixth group's label entry", yet the annotation makes it redden (L2 `S-7`). The corpus is consistent in substance — `R-3` routes that site to this seat — and inconsistent in E-1's "nothing else in the file moves".
- **A prose mismatch inside L1's own artifact — stale when measured, re-grained at this head, therefore DISCHARGED:** `tests/e2e/secure-panels/panes-live.mjs`'s red-first comment block did state the repair as "one entry in `GROUPS`, one in `GROUP_LABELS`", which is E-1's superseded shape, and L1 has since re-grained that block to the landed three-region form — one label table typed against the gate's `ToolGroup`, the roster projected from that table's own keys, and the one roster guard `syncConfig`'s `toggle:` arm needs to index it, all spelled at `signatures.md` §2. So rev 1's report of a stale sentence is overtaken by the file itself, and nothing is owed to E-2 on this count. **The substantive point is kept, because it is what makes the leg an independent reading rather than this design's echo:** the leg derives its declared set from the gate's `ToolGroup` and both `VALID_GROUPS` copies, in `declaredGroupSet()` of `tests/e2e/secure-panels/panes-live.mjs`, and **never** parses the pane's declaration — no row of it depends on the projection's spelling, before or after the landing, so this design may not be "proven" by the leg's rows. The file is the citation, never a line range (D-28, D-39).
- **A dated reading in L2 overtaken by the row:** `interface.md` §7/`R-1` said the row claims no `tests/integration/` path; at this head the row **does** claim one, so `R-1`'s ordering condition is discharged and no claim is owed there — and `interface.md` now states that discharge from its own side (`R-1`, **DISCHARGED**, Rev 2 §8), which makes this bullet redundant with it; it is kept only as §9's record that the row, not this document, settled the ordering (D-7, D-39).

## 10. Assumptions, each with the alternative it rejected (`brief.md` §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | the roster is projected with **one assertion at one site** (`Object.keys(...) as readonly ToolGroup[]`), justified by what the annotation has already proven | a hand-written `readonly ToolGroup[]` tuple or a generic keys helper — the first is the second list this unit retires, the second is the same assertion behind a name (§2) |
| `ASM-L3-2` | `S-7` is closed by a **roster guard**, never a cast | `GROUP_LABELS[g as ToolGroup]`, whose failure mode is a silently painted `undefined` (§3) |
| `ASM-L3-3` | the `data` label **leads with the group name** in the landed family style, with no default-state claim | a wording that reads as state (`off by default`), which the pane's own `data-on` would contradict the moment the operator grants it (§4) |
| `ASM-L3-4` | the unit's instrument is the **type-check**, and no unit battery is designed | a node-side row over the projection's source text, which pins the spelling and proves nothing the compiler does not (§7, D-30) |
| `ASM-L3-5` | this layer writes only `docs/L3/secure-panels/` | touching `src/`, `tests/`, the map or another layer's document to make the design "true" (D-3) |

## 11. Out of scope (stated so no reader looks here for it)

- **No behaviour, no byte, no row's expectation** — `P-1`…`P-7`, `behaviour.md` and `persistence.md` own those, and this document adds none (L1 §4.3; L2 §5-§6).
- **No census, no cap, no script key, no map row** — the `endpoints` figure, the derived cap, `package.json`'s keys and every path set are read from the row and `brief.md` §6 and restated nowhere here (D-14, D-26, D-37, D-39).
- **No `brief.md` §6 count, no live figure of any kind** — `T-n` measured a `/tmp` copy and reports error codes and orders, not counts of the tree (D-26).
- **No package finding** — nothing here touches `provident-ssr` or `provident-storeroom`; a gap met while landing is recorded upstream-owned in the unit's record and archived with it (D-5).
- **No implementation, no patch, no commit** — the three regions are `signatures.md`'s text and L4's single shot (D-3, `examiner.md` §4).
