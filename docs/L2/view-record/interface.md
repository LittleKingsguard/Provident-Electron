# L2 — `view-record`: the interface

- **Layer:** L2 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — the crossing's second declaration set,
  filed by D-87.
- **Inputs:** D-87 (this unit's record), D-82 (the four-clause convention), D-83 (a creation-instant declaration's route),
  D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save), D-63/D-65/D-71 (the tab record's
  arrangement, followed file for file), D-30/D-40 (the marked surface), D-43 (cite, never restate).
- **Ceiling:** 120 lines · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite
  names its site (D-41) — `:1700-1722` and `:1823-1825` are `src/renderer/renderer.ts`'s pane reads and its release turn,
  `:1104-1105`, `:1152-1153`, `:1967-1968` its focus mirror's.

## 0. Scope

This document fixes the view record's I/O surface: the two addresses, the bridge member, its four routes, their arguments
and answers, and the refusal vocabulary. It never fixes the store's internals, the engine `provident-storeroom` runs, or
the renderer's rendering (§3's L2 row; `modules.md` §1).

## 1. The two families, and why they are two roots

The frozen graph store (`src/renderer/store-core-graph.ts`) held two data sets nothing else addressed, so the purge's last
deletion could not go until both had one (D-87): the **pane geometry** — a pane's `size` and `bounds`, read at
`renderer.ts:1700-1722` and written at `:1823-1825` — and the **focus mirror** — the entries the focus model seats and the id
that is active, read by `mirrorStateOf` and committed by `answerForCarrier` and `createFocusCarrier`'s `persistTarget`.

| Address | Tier | Holds |
|---|---|---|
| `['panes']` | `file` | one member per pane id, each `{ size: number; bounds: { min: number; max: number } }` |
| `['focus']` | `mem` | `{ entries: ViewFocusEntry[]; activeId? }` — the absent active is spelled as **absence**, never `null` |

**TWO ROOTS AND NOT ONE, MEASURED ON THE INSTALLED `provident-storeroom@1.9.1`** (D-87's ground): a nested write does not
create its parent — `write(['view','panes'], 'file', …)` over a fresh store answers `AddressNotFound` — so one root would
need a third declaration minting a parent branch; and a root written at `file` answers its descendants at `file` and
`TierNotFound` at `mem`, so one value could not carry the `mem` family at all. The tab record's pattern (one root with
members, D-63) is therefore applied **once per tier**, not once per family.

**THE MEASURED DEFAULTS ARE THE TREE'S OWN AND NOT THIS UNIT'S**: the one pane id the app's store-backed drag composition
addresses is `pane-a`; the authored pane's `props` declare `size: '100'`, `min: '0'`, `max: '200'`, and
`gutterSeamExample`'s fallbacks are the same three figures. The frozen store held **no** pane default at all, and a read
that MISSed at both of its tiers answered `undefined` — an unusable value that made the release refuse
`'unusable-default'` with zero writes and made every move invalid.

## 2. The bridge member and its four routes

`window.provident` gains **one** top-level member, `view`, shaped like the `tabs` member it sits beside — four routes and
no fifth. It is declared in `src/main/preload.ts` and re-declared in `src/renderer/secure-panels.ts`'s `declare global` as
the **same text**, and D-87's battery compares the two blocks rather than citing them.

| Route | Argument | Answer |
|---|---|---|
| `view.read()` | none | `{ status: 'committed'; panes: readonly ViewPaneGeometry[]; focus: ViewFocusMirror; source: { panes: 'record'\|'default'; focus: 'record'\|'default' } }` |
| `view.commitPane(id, geometry)` | a pane **id** and a geometry, never a path | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitFocus(mirror)` | the whole mirror the model produced | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.onChanged(handler)` | one listener | the withdrawal, and nothing else |

**`read()` IS TOTAL AND CARRIES NO REFUSED ARM**, which is a measurement and not an omission: a read that misses answers
the family's declared default and a refused read is caught at the same place, so no value this route can answer is not a
reading. The tab record's read keeps a refused arm because its `read` is handed the store's own refusal.

**THE `source` MEMBERS NAME A REAL DIFFERENCE** — whether the record answered or the declared default did — and they are
what keeps the placeholder from being substituted at the read and called a record, which is the deviation D-84 refused.
`paneGeometryIn(panes, id)` is the **pure** per-pane derivation over one reading, so a client needs no second store verb
and this module has no route without an answer site.

**THERE IS NO `repaired` MEMBER**, and the absence is D-70's rule about a member that names nothing: this module's two
pairs have one arm each — the address does not stand — and no route here can leave either address absent, so a repair
cannot fire at a landing instant of this module's and the member could only ever be `false`.

## 3. The refusal vocabulary — four tokens, two per family

| Token | Family | Names |
|---|---|---|
| `malformed-pane` | panes | no pane id, or no plain geometry record |
| `malformed-geometry` | panes | a **supplied** `size` that is not a finite non-negative number, or a supplied `bounds` pair that is not two finite numbers with `min ≤ max` |
| `malformed-focus` | focus | no mirror, an `entries` that is not a list, an entry whose `id` is not a string/number/boolean or whose `target` the store's boundary would refuse, one id repeated, or an `activeId` of no comparable type |
| `dangling-active` | focus | an `activeId` that names no entry of its own list — the `order` seat's fault at the other family (D-83), under a token of its own because the shape is fine and the membership is not |

Each is minted by this module and by nothing else: the store never answers one of these words. **An ABSENT member is not a
refusal** — a commit naming a size and no bounds keeps the pane's standing bounds, and then the measured default — because
a caller naming one member of a whole value is not a caller supplying an unusable one.

## 4. Boot data: the file, or a repair

**Clause 1 and clause 3 of D-82's convention, per address.** `panes-must-stand` at `['panes']` refuses a value that is not
a plain record and repairs it to the measured default family as ONE whole legal value; on a fresh profile the file
carries it when the constructor returns (`1.9.1`'s landing arm, D-86) and the next boot is handed it. `focus-must-stand` at
`['focus']` refuses the same arm and repairs it to the declared empty pair, and because **a `mem` value can never come
from a file** (D-84) it is re-minted at **every** boot: measured, boot two is handed the address absent, its repair writes
it again, and not one byte of it reaches the profile.

**A FAMILY THAT STANDS BUT CARRIES AN UNUSABLE GEOMETRY IS NOT EITHER PAIR'S ARM, and that is owed rather than invented**
(D-87): each pair's repair must leave ONE whole legal value, and a body that also judged each member would be a second
declaration wearing this one's sentence. The read's admitted family answers the measured default for any member it cannot
state, so the state the pair leaves unrepaired is answered and not lost.

## 5. What the renderer swap must honour — named, not built here

The renderer is **not** wired to these addresses by this unit (D-87): the write paths at `renderer.ts:1823-1825`,
`:1152-1153`, `:1967-1968` and the reads at `:1700-1722`, `:1104-1105` are unmoved, and the frozen store is **not deleted**.
Three facts the next pass inherits: **(i)** the pane geometry's `mem`/`file` precedence collapses — today `mem` wins at
`:1702-1705` and `release` writes the same `final` to both tiers, so the durable fact is one value and the in-gesture copy
is the transient's; **(ii)** `activeId` is written as **absence** because `null` is refused at the crossing's boundary, so
a client reads `null` back through the module's own admission and must not write one; **(iii)** the legacy `file.*`
projection of these rows still lives in the secure crossing's own store (D-78's item (f)), so until the purge deletes it
the same fact stands in two stores and nothing reconciles them.

**THE SWAP IS MEASURED AND NOT TAKEN, AND THE MEASUREMENT MOVES WHAT THE NEXT PASS OWNS (D-88, 2026-11-03).** A client
answering the async crossing exactly as §2's routes require was built and driven — a renderer module beside `tabs-client`,
holding the data shape, refilled by deliveries, read synchronously — and the two families were swapped onto it in a scratch
attempt. It is not in the tree because **the surface that pins the machinery it replaces is a rework of its own**: with the
swap in place and the tests untouched, `tests/pane-drag-compliance.test.ts` read 28 failed of 129 and
`tests/store-focus.test.ts` 49 of 96, falling to 20 once each fixture drove the client over a crossing double — and the
residual is those files' own registers, whose declared terms count the boot mint and the two `mem.focus.*` subscriptions
this swap deletes (§4's `focus-must-stand` and ONE client subscription replace them). So the three facts above stand
unmoved, **and the pass that takes them also takes those registers and `tests/store-tabs-record.test.ts`'s rows** — a shape
this document does not declare, which is why it is named here and not designed here.
