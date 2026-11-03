# L2 — `view-record`: the interface

- **Layer:** L2 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 filed the crossing's second
  declaration set (D-87); **rev 2 adds the THIRD FAMILY and re-derives §5**, which rev 1 wrote before the swap landed: the
  zone address, its declaration, its route and its client read (D-91), and the swap's own state corrected from *"measured
  and not taken"* to **landed** (D-89). No rev-1 claim is withdrawn; what changed is what §5 says has happened.
- **Inputs:** D-87 and D-91 (this unit's records), D-89 (the landed swap), D-82 (the four-clause convention), D-83 (a
  creation-instant declaration's route), D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save),
  D-90 (the enumeration that found the zone family homeless), D-63/D-65/D-71 (the tab record's arrangement).
- **Ceiling:** 120 lines · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite
  names its site (D-41) — `:1700-1722` and `:1823-1825` are `src/renderer/renderer.ts`'s pane reads and its release turn,
  `:1104-1105`, `:1152-1153`, `:1967-1968` its focus mirror's, and `:1799-1805`, `:1935-1941` its two zone turns'.

## 0. Scope

This document fixes the view record's I/O surface: the three addresses, the bridge member, its five routes, their
arguments and answers, and the refusal vocabulary. It never fixes the store's internals, the engine `provident-storeroom`
runs, or the renderer's rendering (§3's L2 row; `modules.md` §1).

## 1. The three families, and why they are three roots

The frozen graph store (`src/renderer/store-core-graph.ts`) held three data sets nothing else addressed, so the purge's
last deletion could not go until each had one (D-87, D-91): the **pane geometry** — a pane's `size` and `bounds`, read at
`renderer.ts:1700-1722` and written at `:1823-1825`; the **focus mirror** — the entries the focus model seats and the id
that is active, read by `mirrorStateOf` and committed by `answerForCarrier` and `createFocusCarrier`'s `persistTarget`;
and the **zone family** — per zone an opaque `slot`, a caller-measured `distance`, a `size` and a `display`, read by the
composition's render turn (`:1799-1805`) and by `candidatesFor` (`:1935-1941`).

| Address | Tier | Holds |
|---|---|---|
| `['panes']` | `file` | one member per pane id, each `{ size: number; bounds: { min: number; max: number } }` |
| `['focus']` | `mem` | `{ entries: ViewFocusEntry[]; activeId? }` — the absent active is spelled as **absence**, never `null` |
| `['zones']` | `mem` | one member per **zone** id, each carrying any of `slot` (opaque), `distance`, `size`, `display` |

**THREE ROOTS AND NOT ONE, MEASURED ON THE INSTALLED `provident-storeroom@1.9.1`** (D-87's ground, re-driven at the zone
root by D-91): a nested write does not create its parent — `write(['zones','zone-1'], 'mem', …)` over a fresh store
answers `AddressNotFound` — so one root would need a declaration minting a parent branch; and a root written at `file`
answers its descendants at `file` and `TierNotFound` at `mem`, so one value could not carry a `mem` family at all. The tab
record's pattern (one root with members, D-63) is therefore applied **once per tier**, not once per family.

**THE MEASURED DEFAULTS ARE THE TREE'S OWN AND NOT THIS UNIT'S**: the one pane id the drag composition addresses is
`pane-a`; the authored pane's `props` declare `size: '100'`, `min: '0'`, `max: '200'`. The frozen store held **no** pane
default at all, so a read that MISSed at both tiers answered `undefined`, which made the release refuse
`'unusable-default'` with zero writes. **THE ZONE FAMILY HAS NO SUCH DEFAULT AND THIS UNIT INVENTS NONE** (D-91): no
`file` copy of any zone member exists in the tree, the read that missed its one tier answered `undefined`, the render turn
handed that `undefined` straight to its layout call, and `candidatesFor` answered `[]` — so a zone the family does not
name answers **its absence**, and the creation repair's placeholder is the family that **names no zone**.

## 2. The bridge member and its five routes

`window.provident` carries **one** top-level member, `view`, shaped like the `tabs` member it sits beside — five routes and
no sixth. It is declared in `src/main/preload.ts` and re-declared in `src/renderer/secure-panels.ts`'s `declare global` as
the **same text**, and the battery compares the two blocks rather than citing them.

| Route | Argument | Answer |
|---|---|---|
| `view.read()` | none | `{ status: 'committed'; panes; focus; zones; source: { panes; focus; zones } }`, each `source` word `'record'` or `'default'` |
| `view.commitPane(id, geometry)` | a pane **id** and a geometry, never a path | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitFocus(mirror)` | the whole mirror the model produced | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitZones(id, zone)` | a **zone id** and the members this act carries, never a path | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.onChanged(handler)` | one listener | the withdrawal, and nothing else |

**`read()` IS TOTAL AND CARRIES NO REFUSED ARM**, which is a measurement and not an omission: a read that misses answers
the family's declared empty arm and a refused read is caught at the same place. The tab record's read keeps a refused arm
because its `read` is handed the store's own refusal.

**THE `source` MEMBERS NAME A REAL DIFFERENCE** — whether the record answered or the declared default did — and they are
what keeps a placeholder from being substituted at the read and called a record, which is the deviation D-84 refused.
`paneGeometryIn(panes, id)` and `zoneIn(zones, id)` are the **pure** derivations over one reading, so a client needs no
second store verb and this module has no route without an answer site. **They differ in their missing arm and that is the
measurement**: a pane the family does not name answers the measured default geometry, a zone answers `null`.

**THERE IS NO `repaired` MEMBER** (D-70's rule about a member that names nothing): each pair has one arm — the address
does not stand — and no route here can leave an address absent, so a repair could only ever be `false`.

## 3. The refusal vocabulary — six tokens, two per family

| Token | Family | Names |
|---|---|---|
| `malformed-pane` | panes | no pane id, or no plain geometry record |
| `malformed-geometry` | panes | a **supplied** `size` that is not a finite non-negative number, or a `bounds` pair that is not two finite numbers with `min ≤ max` |
| `malformed-focus` | focus | no mirror, an `entries` that is not a list, an entry whose `id` is not a string/number/boolean, one id repeated, or an `activeId` of no comparable type |
| `dangling-active` | focus | an `activeId` that names no entry of its own list — the `order` seat's fault at the other family (D-83), under a token of its own |
| `malformed-zone` | zones | no zone id, or no plain zone record |
| `malformed-zone-member` | zones | a **supplied** `size` that is not finite and non-negative, a `distance` that is not finite, a `display` that is not a string, or a `slot` the crossing's boundary would refuse |

Each is minted by this module and by nothing else: the store never answers one of these words. **An ABSENT member is not a
refusal** — and at the zone family it is the ordinary case: each of the four is optional, so a commit naming a `size` and
nothing else keeps the zone's standing `slot`, `distance` and `display`, and a sibling zone is never touched.

## 4. Boot data: the file, or a repair

**Clause 1 and clause 3 of D-82's convention, per address.** `panes-must-stand` at `['panes']` refuses a value that is not
a plain record and repairs it to the measured default family as ONE whole legal value; on a fresh profile the file carries
it when the constructor returns (`1.9.1`'s landing arm, D-86) and the next boot is handed it. `focus-must-stand` at
`['focus']` refuses the same arm and repairs it to the declared empty pair, and **a `mem` value can never come from a
file** (D-84), so it is re-minted at **every** boot: measured, boot two is handed the address absent, its repair writes it
again, and not one byte of it reaches the profile. **`zones-must-stand` at `['zones']` is that shape and adds one fact of
its own**: because the zone family's only lawful placeholder is the one that names no zone, a repair writes `{}` — the ONE
whole legal value that answers every zone exactly as the absent address answered it — and the family is re-minted at every
boot with a caller's zones not surviving one (measured: boot two answers `[]` and the profile is byte-identical).

**A FAMILY THAT STANDS BUT CARRIES AN UNUSABLE MEMBER IS NOT ANY PAIR'S ARM, and that is owed rather than invented**
(D-87): each repair must leave ONE whole legal value, and a body judging each member would be a second declaration wearing
this one's. The admission DROPS a member it cannot state and answers its absence (zone) or the measured default (pane).

## 5. What the deletion pass owns, and what is already landed

**THE SWAP IS LANDED (D-89) AND REV 1'S *"MEASURED AND NOT TAKEN"* IS SUPERSEDED RATHER THAN CORRECTED IN PLACE.** The
renderer holds the shape in `src/renderer/view-client.ts`, filled by deliveries and read synchronously; the pane geometry
and the focus mirror are wired, each writing ONE route. **The zone family is the one that is NOT wired**: the two frozen
reads at `renderer.ts:1799-1805` and `:1935-1941` still address the store, so this family's route stands with the client's
`zoneOf` as its only reader — and wiring those two, or ruling the flow out of the tree, is D-90's own two rulings.

Three facts that pass inherits, unmoved: **(i)** the pane geometry's `mem`/`file` precedence collapses to one `file` value;
**(ii)** `activeId` is written as **absence** because `null` is refused at the crossing's boundary; **(iii)** the legacy
`file.*` projection of these families still lives in the secure crossing's own store (D-78's item (f)), so until the purge
deletes it the same fact stands in two stores and nothing reconciles them.
