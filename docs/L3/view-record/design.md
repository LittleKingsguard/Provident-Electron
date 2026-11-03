# L3 — `view-record`: the module design

- **Layer:** L3 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 1 filed the crossing's second
  declaration set (D-87); rev 2 added the THIRD FAMILY — its address, declaration, route, client read and the file that
  carries the shared vocabulary (D-91) — and corrected the state §1 described, the renderer's read path being the SHAPE's
  since the swap landed (D-89); **rev 3 states the wiring's own state**: ALL SIX of the drag composition's reads are the
  shape's — `paneSizeOf`/`paneBoundsOf` for the pane geometry and `zoneOf` for the zone family — the composition's
  `tierRead` helper and its `subscribe('temp.drag', …)` registration are DELETED, the render turn is a `renderZone` member
  the shape's delivery calls, and the gesture's transient preview is CLOSURE STATE rather than a `temp`-tier name (D-92).
  No rev-1 or rev-2 rule is withdrawn.
- **Inputs:** `docs/L2/view-record/interface.md` rev 2 §0–§5; D-82 (the four clauses), D-83 (a creation-instant body's
  route and its address), D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save), D-89 (the landed
  swap), D-90 (the enumeration that found the zone family homeless), D-71/D-72/D-73 (the listener's handle, the repair's
  credit, the repair's commit), D-45 (signatures are L4's contract).
- **Ceiling:** 130 lines · **Status:** structure and guardrails. Every declared name and its exact text is L4's to
  transcribe; this file states what each piece must be and why, never a transcript of it.

## 1. The structure — five files, one owner each

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/view-record/index.ts` | the record over the APP'S ONE STORE: **three** address constants, **three** batched declarations and **five** routes — no instance, no file (D-87, D-91) | every write is one whole family at its own root, so the surface holds no store verb and `main.ts` holds no address |
| `src/main/view-surface/index.ts` | the surface module: the one reference to the record, the one subscription over all three roots, and the shape arms | the record is held once at boot, and this module is the only file a channel handler reaches it through (the `tabs-surface` arrangement) |
| `src/shared/view-channels.ts` | the **five** channel constants, single-sourced | a name spelled in two files is a rename that half-lands (`tabs-channels.ts`'s precedent) |
| `src/shared/view-shape.ts` | the three families' vocabulary, the measured pane defaults and the pure per-pane and per-zone derivations — ONE spelling for both realms | two realm-local copies would be two answers to "what is a zone" (D-88's `D-73` rule) |
| `src/renderer/view-client.ts` | the shape the RENDERER reads: filled by deliveries, read synchronously, written through the routes | it holds no address space, no persistence, no constraint and no instance — a projection, never a store (D-78's ruling 3) |

**One construction site, and it is the boot's**: no file here constructs an instance, and none spells a `provident-*.json`
name. **The `src/main/` module also names the `provident-storeroom` PACKAGE NOWHERE** — its handle type is
`TabsRecordStore`'s, re-exported as `ViewRecordStore` — because `tests/e2e/central-data/scenarios.test.ts` `S-9` pins the
importing FILES at exactly three and a fourth import would red a gating row (D-87). The renderer side imports neither the
package nor a main-process module: its vocabulary is `shared/`'s and its bridge is narrowed structurally.

## 2. The three address constants, and the tiers that are named once

`VIEW_PANES_ADDRESS = ['panes']` (`file`), `VIEW_FOCUS_ADDRESS = ['focus']` (`mem`) and `VIEW_ZONES_ADDRESS = ['zones']`
(`mem`). **No root is a member of the crossing's reserved projection set** (`window · tabs · layout · settings · tracked ·
modules`), so no `Y-2` projection can collide with any of them.

**Each family's tier is named ONCE, in a constant, and the module's tier TYPE is derived from those constants** — not
re-spelled from the package's `Tier` — so a fourth family would have to add its constant rather than widen a table, and no
read, write or repair can half-move a family to the other tier. **THE ZONE FAMILY'S TIER IS THE MEASUREMENT THAT DECIDED
ITS BOOT SOURCE** (D-91): the frozen store's four members stood at `mem` and nowhere else — no `file` copy of any zone
member exists in the tree — so there is no durable image to inherit, and a repair at the creation instant is the family's
only lawful source (D-84).

**NO ROOT IS NESTED, AND THAT IS THE ONE THING THIS MODULE'S ADDRESS SHAPE OWES THE MEASUREMENT** (D-87, re-driven at the
zone root): a nested write does not create its parent (`AddressNotFound` over a fresh store), and a `file` root answers
`TierNotFound` at `mem`. A parent branch would need a third declaration whose own body is handed `undefined` at the
registration instant, and would still not carry two tiers.

## 3. The shapes, and the three admissions

`ViewPaneGeometry` is one pane's admitted geometry; `ViewFocusEntry` is the focus model's `FocusEntry` **narrowed to what
the store's boundary admits and what `===` compares by value**; `ViewFocusMirror` is `FocusState` with the absent active
spelled as absence; and `ViewZone` is one zone's admitted record — **`slot` opaque, and `distance`/`size`/`display`
individually OPTIONAL**, which is measured rather than lenient: the tree's own writers seed `size`+`display` for three
zones and `slot` alone for another, and its two zone batteries write `slot`+`distance` with neither of the other two.

**ONE PARSE PER FAMILY, FROM A VALUE AND NEVER FROM A HANDLE** (D-83's `viewFrom`, applied here): `panesFrom`, `mirrorFrom`
and `zonesFrom` admit member by member and `null` an unreadable family. A member the value names and this parse cannot
admit is **dropped** — and a dropped mirror entry **takes a dangling `activeId` with it**, so the read can never answer a
mirror the write route would refuse. **A record carrying no admissible member is still a ZONE** (`paneOf` cannot admit that
state because a pane's `size` and `bounds` are required; a zone's are not), so naming a zone and storing nothing about it
is a state the family holds.

**THE BOUNDARY'S DOMAIN IS SPELLED ONCE** (`isBoundary`): the crossing carries strings, booleans, finite numbers, plain
objects and arrays and **refuses `null` and `undefined`** (measured: `ValueRefusedAtBoundary`). It is used where a value is
opaque to this module but not to the store — an entry's `target`, a zone's `slot`.

## 4. The three declarations, and the repair's two routes

`panes-must-stand`, `focus-must-stand` and `zones-must-stand`, gathered by `viewConstraintDeclarations(getStore)` for the
boot's batch. **All three bodies judge `context.value` and none is wrapped by a null-store guard** — `tabsMustStand`'s
shape, for the same measured reason: the boot binds its holder only after `createProfileStore` returns, so a handle-reading
body would abstain at the exact instant it is the only one that can act.

**THE ZONE FAMILY'S PLACEHOLDER IS THE ONE THAT NAMES NO ZONE** (`{}`), and that is the whole of the pair's design: the
family has no default value anywhere in the tree, so a repair minting a geometry would make the repair and the read two
authorities over one question, while `{}` answers every zone exactly as the absent address answered it (D-91).

**ONE REPAIR-WRITE PATH, AND ITS BRANCH IS THE RECORD'S OWN `write` MEMBER, NEVER THE INSTANT'S NAME**: a registration
record carries a `write` function and takes the store's **three** positions with no fourth (supplying one is a `TypeError`
before any store act); a landing record carries no `write` and its commit **must** be named at `write`'s **fourth**, which
`writeJoinedAt`'s required second position makes an arity error to omit. **All arms answer through `repairAnswer`** — the
credited arm's one constructor (D-72) — and the failed arm is stated, never fallen into.

**THE LANDING ARM IS REACHABLE AND THEREFORE IMPLEMENTED RATHER THAN ASSUMED**: a `provident.data.delete` at any root is a
client act on the same instance (D-79/D-80), so a deleted family is repaired inside its own commit, answering one
notification and not two — measured at all three roots. This module's own routes cannot produce the arm, which is why its
answer carries no `repaired` member.

## 5. Every write path, enumerated

Six, and there is no seventh: `commitPane`, `commitFocus` and `commitZones` (an IPC route — a UI act each), and the three
creation-instant repairs (a constraint repair, and the landing arm the engine asks through the same helper). **A READ
WRITES NOTHING**: a family that misses answers its declared empty arm and the repair that makes it stand is the CREATION
instant's — the arm clause 4 of D-82 forbids a re-derivation on, measured both ways (the file's bytes unmoved over a
standing family, and an absent `mem` family still absent after three reads). **No timer, no interval, no poll and no
`queueMicrotask` stands in the module or its surface**, asserted over comment-elided code with a positive control.

## 6. Guardrails

- **The listener's handle is minted per subscription per address** (`view-record:<n>@<address>`): `register` replaces the
  function under a handle and `unlisten` withdraws the handle whole, so one spelled name starves a second subscriber.
  **It can never equal a constraint `id`** — a fixed `view-record:` prefix no id carries, a minted ordinal, and the address
  it is bound at (D-71).
- **The body is a notification and nothing else, and the caller's throw is contained**: a listener's write opens its own
  commit, and a body's throw crosses every hop back into the write that fired it.
- **A registration that could not stand leaves nothing behind** — the entry `listen` wrote is withdrawn where `register`
  fails.
- **The mirror's composition writes no `activeId` member when nothing is active**, and **the zone family's composition
  keeps every sibling zone and every member the caller did not supply**: `null` cannot cross the boundary, and a whole-value
  write that dropped a sibling would be a second writer of state the caller never touched.
- **The five channels are constants, imported by `main.ts`, `preload.ts` and the surface; no literal is re-spelled.**

## 7. Owed, and deliberately not built

A pair that judges a **standing** family's members (a pane whose geometry is unusable, a zone whose `size` is a string) is
a declaration this module does not carry: each pair's arm is absence, and widening one would be a second declaration
wearing the first one's sentence — the boundary D-84 drew for the secure crossing and D-83 drew when it gave the `order`
seat a pair of its own. The admission answers such a member (the measured default, or the zone's absence), so nothing is
lost; what is owed is the refusal, not the value. **AND THE ZONE FAMILY'S WIRING IS LANDED** (`D-92`): the drag
composition's four frozen zone reads are the shape's now, so what the deletion pass inherits is the DELETION and its
evidence, not a wiring (D-90, D-91).
