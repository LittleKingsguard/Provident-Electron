# L2 — `view-record`: the interface

- **Layer:** L2 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 6 — rev 1 filed the crossing's second declaration set (D-87); rev 2 added the zone
  family and re-derived §5 (D-91, D-89); rev 3 added the appearance record, its staleness arm and its route (D-97); rev 4 moved that family to `file` on the
  durability ruling (D-98); rev 5 gave the three families' value arms (D-105). **Rev 6 DROPS the `focus` family whole** — the user's ruling `D-142`, grounded at
  `D-140`/`D-141` — so the record holds **three** roots, the `view` member loses one route from **both sides in one edit** (D-14), and `viewDeclaredRoots()`
  publishes three (D-142). No earlier claim is withdrawn; the family's rows retire with it (D-9).
- **Inputs:** `D-142` (the deletion, its order and its same-edit condition), `D-140`/`D-141` (the mirror as a second spelling; the tool's act is the tab record's),
  `D-136`/`D-137` (where formatting sits, and what keeps the renderer's copy honest); the families' own records `D-87`, `D-91`, `D-97`, `D-98`; `D-101` (the
  declared-tier guard), `D-105` (the value arms), `D-76` (the landing is derived, never stored), `D-14` (a route leaves both sides), `D-9` (a battery retires
  with its referent).
- **Ceiling:** 150 lines · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite names its **site** and never an
  offset (D-41).

## 0. Scope

This document fixes the view record's I/O surface: its addresses and their tiers, the `view` bridge member and its surviving routes, `read()`'s answer, the
declared roots the `data.*` surface's guard consumes, and this module's refusal vocabulary. Never the store's internals, the engine `provident-storeroom` runs,
or the renderer's rendering (§3's L2 row; `modules.md` §1).

## 1. The families the record holds now — three roots, and the one that leaves

| Address | Tier | Holds |
|---|---|---|
| `['panes']` | `file` | one member per pane id, each `{ size: number; bounds: { min: number; max: number } }` (D-87) |
| `['zones']` | `mem` | one member per zone id, each carrying any of an opaque `slot`, a `distance`, a `size`, a `display` (D-91) |
| `['theme']` | `file` | **one whole record** `{ token?, attribute?, declaration: { name?, value, removal } }` — the setting, the caller-held attribute name, and the declaration the mechanism computed for that pair (D-97, D-98) |

**THE FOURTH ROOT, `['focus']` AT `mem`, GOES WHOLE WITH THIS UNIT** (D-142). Its address constant and `FOCUS_TIER`; the `focus-must-stand` declaration and its
body; its `viewDeclaredRoots()` entry; the record's `commitFocus`, `composeMirror` and `mirrorFrom`; the surface's `commitFocus`; its channel constant and
`ipcMain.handle` site; the preload member and the `secure-panels` lockstep half; `view-client`'s route and its focus reads; and the renderer's carrier. **What it
held was a SECOND SPELLING of a fact `['tabs']` already owns** — `exactly-one-active` enforces it and `landingOf` derives it rather than storing it (D-140,
D-141, D-76) — and it was `mem`, the one tier that persists nothing, so the tool the family served could not persist the thing it exists to change (D-141).
**What replaces it is no route of this module's**: the `focus` tool seats the new active tab in the **tab record**, written whole at `['tabs']` at `file`
through `data.write`, whose handler forwards to the store's write verb, and the record's own normalisation settles the pair (D-142, D-136, D-140).

**THREE ROOTS AND NOT ONE VALUE, MEASURED** (D-87's ground, re-driven at each later root): a nested write does not create its parent (`AddressNotFound` over a
fresh store), so one root would need a declaration minting a parent branch; and a root written at `file` answers its descendants at `file` and `TierNotFound` at
`mem`, so one value could not carry a `mem` family at all. The tab record's one-root pattern is applied **once per tier**, not once per family (D-63, D-87).

## 2. The bridge member, its routes, and the one that leaves both sides

`window.provident` carries **one** top-level member, `view`, declared in `src/main/preload.ts` and re-declared in `src/renderer/secure-panels.ts`'s `declare global`
as the **same text** — the lockstep pair a battery compares member for member (D-87). A route here is never a path: a caller names a pane id, a zone id or an
appearance act, and never an address or a tier (D-87, D-91). Every channel constant is single-sourced in `src/shared/view-channels.ts`, because a name spelled in
the handler and again in the preload is a rename that half-lands (D-87).

| Route | Argument | Answer | Channel constant |
|---|---|---|---|
| `view.read()` | none | §3's answer | `IPC_VIEW_READ` (D-84, D-87) |
| `view.commitPane(id, geometry)` | a pane **id** and a geometry | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_PANE_COMMIT` (D-87) |
| `view.commitZones(id, zone)` | a **zone id** and the members this act carries | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_ZONES_COMMIT` (D-91) |
| `view.commitTheme(token, attributeName)` | **the appearance ACT**: the setting the control produced and the CALLER-HELD attribute name — never a declaration (D-97) | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_THEME_COMMIT` (D-97) |
| `view.onChanged(handler)` | one listener | the withdrawal, and nothing else | `IPC_VIEW_CHANGED` — the push: no request, no handler, no payload (D-137) |

**AND `view.commitFocus` IS ABSENT FROM BOTH SIDES IN THE SAME EDIT** (D-14, D-142), because a route that leaves one side alone is either a channel with a
handler and no caller or a member no handler answers: the constant `IPC_VIEW_FOCUS_COMMIT` leaves `src/shared/view-channels.ts`; the
`ipcMain.handle(IPC_VIEW_FOCUS_COMMIT, …)` site leaves `src/main/main.ts` with `app-shell`'s half; `commitFocus` leaves the record's `ViewRecord` interface and
`src/main/view-surface/index.ts`'s surface; the preload's `view` block and its copy in `src/renderer/secure-panels.ts` lose the same member in lockstep; and
`src/renderer/view-client.ts` loses its `routeOf(member, 'commitFocus')` turn with the `send('focus', …)` that calls it.

## 3. `view.read()` — the answer, after the change

`read()` answers `{ status: 'committed'; panes; zones; theme; source: { panes; zones; theme } }`: the three families' admitted values and one `source` word per
family, `'record'` or `'default'` (D-142, D-84, D-87). **NO `focus` MEMBER SURVIVES ON EITHER SIDE OF THE WIRE** — the surface's read answer and the client's
committed reading and held shape carry the same three members and no fourth, so an answer still carrying a mirror is not a shape this document declares (D-142,
D-89). **`source` NAMES A REAL DIFFERENCE** — the record answered, or the declared default did — which is what keeps a placeholder from being substituted at a
read and called a record (D-84). **`read()` IS TOTAL AND CARRIES NO REFUSED ARM**, a measurement and not an omission: a read that misses answers the family's
declared arm and a refused read is caught at the same place (D-84). It carries **no `repaired` member** either, because no route of this module can produce the
difference such a member would report (D-70, D-105).

`paneGeometryIn(panes, id)` and `zoneIn(zones, id)` are the **pure** derivations over one reading, so a client needs no second store verb and no route stands
without an answer site (D-87, D-91). Their missing arms differ, and the difference is the measurement: a pane the family does not name answers the measured
default geometry, a zone answers `null` (D-91).

## 4. The declared roots — three, and the same-edit rule stated as a rule

`viewDeclaredRoots()` publishes each root **paired with the tier its own declaration writes at** — `['panes']` `file`, `['zones']` `mem`, `['theme']` `file` —
built from the same address and tier constants the batch uses, so a family that moved tier would move here without a word (D-101, D-97, D-98). Its caller is the
`data.*` surface's declared-tier guard (`src/main/data/surface.ts`'s `declaredTierLedger`), which admits a write or a delete at a declared root only at that
family's tier and refuses `declared-tier` otherwise, ahead of any store verb (D-101).

**THE `['focus']` ENTRY LEAVES IN THE SAME EDIT THAT DELETES THE DECLARATION — never one before the other** (D-142, D-101). That is a rule with a measured
reason on both sides: an entry outliving its declaration tells the guard a root is declared while no pair stands at it, and a declaration deleted while its
entry stands hands the guard a tier for a family that is gone (D-101, D-142). **The entry is the only thing that can refuse the wrong tier at a root**, which is
why it is not merely tidying.

**WHAT THE GUARD DOES AT AN UNDECLARED ROOT: IT ADMITS THE WRITE.** The guard keys on the roots it is HANDED and answers `declared-tier` only where a declared
root disagrees with the call, so a path no crossing declares reaches the store verb and is judged by the store's own constraints and nothing else (D-101, D-105).
That is the arm the deleted address is measured at: a write at `['focus']` is **admitted** once the declaration and its entry are gone, because no root declares
anything there (D-142, D-101).

## 5. The refusal vocabulary — two tokens per surviving family

| Token | Family | Names |
|---|---|---|
| `malformed-pane` | panes | no pane id, or no plain geometry record (D-87) |
| `malformed-geometry` | panes | a **supplied** `size` that is not a finite non-negative number, or a `bounds` pair that is not two finite numbers with `min ≤ max` (D-87) |
| `malformed-zone` | zones | no zone id, or no plain zone record (D-91) |
| `malformed-zone-member` | zones | a supplied `size` that is not finite and non-negative, a `distance` that is not finite, a `display` that is not a string, or a `slot` the crossing's boundary would refuse (D-91, D-105) |
| `malformed-theme` | theme | no setting token that can be an appearance setting (a string; the EMPTY one is the absence the mechanism declares), or no attribute name a caller could compose a write from (D-97) |
| `stale-theme` | theme | the carried declaration is not the one the mechanism would produce for the setting and attribute it carries — **the CONSTRAINT's arm, never a route's** (D-97) |

Each token is minted by this module and by nothing else: the store never answers one of these words (D-87). **The family that leaves takes its two tokens with
it** — `malformed-focus` and `dangling-active` are answered by no route and no pair after this change (D-142, D-9). **An ABSENT member is not a refusal**: at the
zone family it is the ordinary case, so a commit naming a `size` alone keeps the standing `slot`, `distance` and `display`, and a sibling zone is never touched
(D-91). **AND EVERY SURVIVING PAIR ANSWERS A SECOND KIND NO ROUTE OF THIS MODULE CAN**: `panes-must-stand`, `zones-must-stand` and `theme-must-stand` refuse a
value that STANDS and names a member the read cannot state, or a declaration that contradicts its own setting, with the store's rollback leaving what stood —
status `ConstraintPassRefused`, sentence this module's, in the register above (D-105).

## 6. Boot data: the file, or a repair

**Clause 1 and clause 3 of the convention, per address** (D-82 via D-87). `panes-must-stand` at `['panes']` refuses a value that is not a plain record and
repairs it to the measured default family as ONE whole legal value; on a fresh profile the file carries it when the constructor returns (D-86) and the next boot
is handed it (D-87). `zones-must-stand` is that shape at `mem` with one fact of its own: the zone family's only lawful placeholder NAMES NO ZONE, so a repair
writes the empty family, the one whole legal value answering every zone exactly as the absent address answered it (D-91). **A `mem` value can never come from a
file** (D-84), so the zone family is re-minted at **every** boot and not one byte of it reaches the profile (D-91). `theme-must-stand` carries the two arms of
the appearance record: no plain record repaired to the placeholder, and **STALENESS** — a record that stands but whose carried declaration is not the
mechanism's answer for the setting and attribute it carries — repaired from the record's OWN two members through the module's one repair-write path (D-97,
D-98). The comparison is STRUCTURAL and never a serialisation, because the crossing normalises key order (D-97). Its tier is `file` on the durability ruling, so
a standing legal record survives a restart byte-identically (D-98). **NOTHING IS DERIVED AT A READ, AND A BOOT APPLIES NOTHING**: the one stated `fill()` adopts
and only a delivery applies, so a `file` record standing at boot is DATA (D-98).

## 7. What does not move

- **The appearance family's constraint-repair product** (D-97, D-98): the resolution is the pair's, the route carries the ACT and never a declaration, and no consumer computes one.
- **The zones family as built** (D-91): its address and tier, its pair, its route, and `commitZones`' composition of one zone over what stands.
- **The panes family** (D-87): the measured default family, `panes-must-stand`, and `paneGeometryIn`'s default arm.
- **The three survivors' tier constants** and the tier union derived from them, so no read, write or repair spells a tier literal (D-87, D-91, D-98, D-105).
- **The record's creation instant**: each surviving family's existence pair, its placeholder and its repair stand in the boot's ONE `createProfileStore` batch, and a fresh profile carries the two `file` families' placeholders (D-87, D-91, D-98).
- **The subscription and the push** (D-137, D-87): one listener per surviving root, and a delivery that carries a signal and no value, so the consumer's only correct answer is a re-read.
- **This module owes no replacement route**: the focus tool's act and the one whole-record composition it carries live in the renderer and are booked at `pending.md` row `2` (D-142, D-136), and the focus MODEL's disposition is `focus-model`'s own row (D-141).
