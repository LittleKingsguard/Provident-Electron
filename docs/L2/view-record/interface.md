# L2 — `view-record`: the interface

- **Layer:** L2 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 4 — rev 1 filed the crossing's second declaration set (D-87); rev 2 added the
  THIRD FAMILY and re-derived §5 (D-91, D-89); rev 3 added the FOURTH FAMILY, the APPEARANCE RECORD, its second arm (staleness), its route and its client read,
  its resolution **produced by a constraint repair** and never by a consumer (D-97); **rev 4 moves that family's TIER from `mem` to `file`**, because appearance
  preferences are durable — the user's ruling, measured (D-98). No earlier claim is withdrawn.
- **Inputs:** D-87, D-91, D-97 and D-98 (this unit's records), D-89 (the landed swap), D-96 (the mechanism's ruling and the consumer it named), D-82 (the
  four-clause convention), D-83 (a creation-instant declaration's route), D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save), D-90
  (the zone family's homeless enumeration), D-63/D-65/D-71 (the tab record's arrangement).
- **Ceiling:** 120 lines · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite names its site (D-41), and the
  sites are NAMED rather than numbered since the renderer's regions moved (D-92): `readPaneSize`/`readPaneBounds` and the `release` turn, `mirrorStateOf` and
  `persistTarget`, `renderZone`/`candidatesFor`.

## 0. Scope

This document fixes the view record's I/O surface: four addresses, the bridge member, its six routes, their arguments and answers, and the refusal vocabulary.
Never the store's internals, the engine `provident-storeroom` runs, or the renderer's rendering (§3's L2 row; `modules.md` §1).

## 1. The four families, and why they are four roots

The frozen graph store held three data sets nothing else addressed, so the purge's last deletion could not go until each had one (D-87, D-91): the **pane
geometry** — a pane's `size` and `bounds`, read at `readPaneSize`/`readPaneBounds` and written by the release turn; the **focus mirror** — the entries the focus
model seats and the id that is active, read by `mirrorStateOf` and committed by `answerForCarrier` and `persistTarget`; and the **zone family** — per zone an
opaque `slot`, a caller-measured `distance`, a `size` and a `display`, read by the render turn and by `candidatesFor`. **The FOURTH is not the store's legacy:
it is the appearance record (D-97)**, which D-96's ruling made a consumer's obligation.

| Address | Tier | Holds |
|---|---|---|
| `['panes']` | `file` | one member per pane id, each `{ size: number; bounds: { min: number; max: number } }` |
| `['focus']` | `mem` | `{ entries: ViewFocusEntry[]; activeId? }` — the absent active is spelled as **absence**, never `null` |
| `['zones']` | `mem` | one member per **zone** id, each carrying any of `slot` (opaque), `distance`, `size`, `display` |
| `['theme']` | `file` | **one whole record** `{ token?, attribute?, declaration: { name?, value, removal } }`: the setting, the caller-held attribute name, and the declaration the mechanism computes for that pair |

**FOUR ROOTS AND NOT ONE, MEASURED ON THE INSTALLED `provident-storeroom@1.9.1`** (D-87's ground, re-driven at the zone root by D-91 and at this one by D-97): a
nested write does not create its parent — `write(['zones','zone-1'], 'mem', …)` over a fresh store answers `AddressNotFound` — so one root would need a
declaration minting a parent branch; and a root written at `file` answers its descendants at `file` and `TierNotFound` at `mem`, so one value could not carry a
`mem` family at all. The tab record's pattern (one root with members, D-63) is applied **once per tier**, not once per family.

**THE PLACEHOLDERS ARE THE TREE'S OWN AND NOT THIS UNIT'S.** Panes: the one pane id the drag addresses is `pane-a`, the authored pane's `props` declare `size:
'100'`, `min: '0'`, `max: '200'`, and the frozen store held **no** pane default, so a MISSed read answered `undefined` and the release refused
`'unusable-default'` with zero writes. Zones (D-91): no `file` copy of any zone member exists, a MISS answered `undefined`, the render turn handed that to its
layout call and `candidatesFor` answered `[]` — so a zone answers **its absence** and the placeholder names no zone. **Appearance (D-97): the placeholder is the
MECHANISM'S OWN ANSWER for the absent pair** — `{name: null, value: '', removal: true}` — which names no attribute, so nothing can be applied FROM IT; a boot's
silence is the boot PATH's, not the value's (§4). **ITS TIER IS `file` FROM `D-98`, ON THE USER'S RULING "Appearance preferences should be durable"**: `D-97`
reasoned it to `mem` from the app's then-silence and from the control's own prohibition row, and that second clause is now FALSE and superseded BY POINTER, its
dated text untouched. The creation repair's placeholder is a SAVED write on a fresh profile, and a standing legal record survives a restart byte-identically.

## 2. The bridge member and its six routes

`window.provident` carries **one** top-level member, `view`, shaped like the `tabs` member beside it — six routes and no seventh. Declared in
`src/main/preload.ts` and re-declared in `src/renderer/secure-panels.ts`'s `declare global` as the **same text**, and the battery compares both blocks.

| Route | Argument | Answer |
|---|---|---|
| `view.read()` | none | `{ status: 'committed'; panes; focus; zones; theme; source: {…} }`, each `source` word `'record'` or `'default'` |
| `view.commitPane(id, geometry)` | a pane **id** and a geometry, never a path | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitFocus(mirror)` | the whole mirror the model produced | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitZones(id, zone)` | a **zone id** and the members this act carries, never a path | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.commitTheme(token, attributeName)` | **the appearance ACT**: the setting the control produced and the CALLER-HELD attribute name — never a declaration (D-97) | `{ status: 'committed' }` or the refusal arm (§3) |
| `view.onChanged(handler)` | one listener | the withdrawal, and nothing else |

**`read()` IS TOTAL AND CARRIES NO REFUSED ARM**, a measurement and not an omission: a read that misses answers the family's declared empty arm and a refused
read is caught at the same place. The tab record's read keeps a refused arm because its `read` is handed the store's own refusal.

**THE `source` MEMBERS NAME A REAL DIFFERENCE** — the record answered, or the declared default did — and they keep a placeholder from being substituted at the
read and called a record, the deviation D-84 refused. The appearance family carries the same two words. `paneGeometryIn(panes, id)` and `zoneIn(zones, id)` are
the **pure** derivations over one reading, so a client needs no second store verb and no route here stands without an answer site; they differ in their missing
arm, which is the measurement: a pane the family does not name answers the measured default geometry, a zone answers `null`.

**THERE IS NO `repaired` MEMBER** (D-70's rule about a member that names nothing): each of the first three pairs has one arm — the address does not stand — and
no route here can leave an address absent, so a repair could only ever be `false`. **THE APPEARANCE PAIR HAS TWO ARMS AND ITS ROUTE EXPOSES THE SECOND**, which
is why the member is still absent rather than widened: the route writes the caller's pair, the engine re-runs the pair inside that commit, and the committed
value the answer describes is the RESOLVED record — a member reporting "a repair fired" would report the mechanism this family is. **The read's `theme` member
is the record whole**, `declaration` required: a record carrying no readable `{value, removal}` pair is a divergence and reaches the client as `unread`, never
as a placeholder substituted at the read.

## 3. The refusal vocabulary — eight tokens, two per family

| Token | Family | Names |
|---|---|---|
| `malformed-pane` | panes | no pane id, or no plain geometry record |
| `malformed-geometry` | panes | a **supplied** `size` that is not a finite non-negative number, or a `bounds` pair that is not two finite numbers with `min ≤ max` |
| `malformed-focus` | focus | no mirror, an `entries` that is not a list, an entry whose `id` is not a string/number/boolean, one id repeated, or an `activeId` of no comparable type |
| `dangling-active` | focus | an `activeId` that names no entry of its own list — the `order` seat's fault at the other family (D-83), under a token of its own |
| `malformed-zone` | zones | no zone id, or no plain zone record |
| `malformed-zone-member` | zones | a **supplied** `size` that is not finite and non-negative, a `distance` that is not finite, a `display` that is not a string, or a `slot` the crossing's boundary would refuse |
| `malformed-theme` | theme | **no setting token that can be an appearance setting** (anything but a string, the EMPTY string admitted as the absence the mechanism declares), or **no attribute name a caller could compose a write from** |
| `stale-theme` | theme | the record's carried declaration is not the one the mechanism would produce for the setting and the attribute it carries — the CONSTRAINT's arm, never a route's (D-97) |

Each is minted by this module and by nothing else: the store never answers one of these words. **An ABSENT member is not a refusal** — at the zone family it is
the ordinary case, so a commit naming a `size` and nothing else keeps the standing `slot`, `distance` and `display`, and a sibling zone is never touched.

## 4. Boot data: the file, or a repair

**Clause 1 and clause 3 of D-82's convention, per address.** `panes-must-stand` at `['panes']` refuses a value that is not a plain record and repairs it to the
measured default family as ONE whole legal value; on a fresh profile the file carries it when the constructor returns (`1.9.1`'s landing arm, D-86) and the next
boot is handed it. `focus-must-stand` refuses the same arm and repairs it to the declared empty pair, and **a `mem` value can never come from a file** (D-84),
so it is re-minted at **every** boot: measured, boot two is handed the address absent, its repair writes it again, and not one byte of it reaches the profile.
`zones-must-stand` is that shape with one fact of its own: the zone family's only lawful placeholder names no zone, so a repair writes `{}` — the ONE whole
legal value answering every zone exactly as the absent address answered it.

**AND `theme-must-stand` AT `['theme']` IS THE ONE PAIR WHOSE SECOND ARM IS NOT ABSENCE (D-97).** Its first arm is the other three's: no plain record, repaired
to the placeholder. **Its second is STALENESS** — a record that stands but whose carried declaration is not the mechanism's own answer for the setting and
attribute it carries — and its repair re-derives from the record's OWN two members and writes the current resolution. So **the resolution is produced by a
constraint repair and by nothing else**, which is this family's whole instruction. The comparison is STRUCTURAL, never a serialisation: the crossing normalises
key order (measured), so a byte comparison would call every legal record stale. Nothing is derived at a read, and **a boot applies nothing because the ONE
stated `fill()` never applies — only a delivery does — so a `file` record standing at boot is DATA, never an application** (`D-98`, measured).

**A FAMILY THAT STANDS BUT CARRIES AN UNUSABLE MEMBER IS NOT ANY PAIR'S ARM, and that is owed rather than invented** (D-87): each repair must leave ONE whole
legal value, and a body judging each member would be a second declaration wearing this one's. The admission DROPS a member it cannot state and answers its
absence (zone) or the measured default (pane). The appearance record's derived member is the exception: it is not a MEMBER judgement but the declaration's whole
subject, which is why the second arm above exists.

## 5. What is landed, and what a later pass owns

**THE SWAP IS LANDED (D-89), THE ZONE FAMILY IS WIRED (D-92), AND THE APPEARANCE FAMILY IS APPLIED FROM THIS RECORD (D-97).** The renderer holds the shape in
`src/renderer/view-client.ts`, filled by deliveries and read synchronously; every family writes ONE route, and the appearance route carries the ACT and not a
resolution. Three inherited facts are closed by measurement rather than restated: the pane geometry's `mem`/`file` precedence collapsed to one `file` value;
`activeId` is written as **absence** because `null` is refused at the boundary (this family writes `token`/`attribute` the same way); and the legacy `file.*`
projection in the secure crossing's store went with the frozen store the purge deleted (D-93). **WHAT A LATER PASS OWNS**: nothing this document declares, and
one thing it records as owed — a pair judging a STANDING family's unusable members (§4's last paragraph), which is a declaration this unit does not carry.