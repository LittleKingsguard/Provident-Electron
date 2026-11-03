# L3 — `view-record`: the module design

- **Layer:** L3 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 4 — rev 1 filed the crossing's second
  declaration set (D-87); rev 2 added the THIRD FAMILY (D-91) and corrected the renderer's read path to the shape's (D-89);
  rev 3 stated the wiring's own state — all six drag reads are the shape's, the `tierRead` helper and the `temp.drag`
  registration are deleted, the preview is closure state (D-92); **rev 4 adds the FOURTH FAMILY, the APPEARANCE RECORD**
  (D-97): a `mem` root, a pair with a SECOND ARM no other pair has (staleness over a derivation), a route that writes the
  caller's ACT and never a resolution, its reading and its client read. No earlier rule is withdrawn.
- **Inputs:** `docs/L2/view-record/interface.md` rev 3 §0–§5; D-82 (the four clauses), D-83 (a creation-instant body's
  route and its address), D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save), D-89 (the landed
  swap), D-90 (the zone family's homeless enumeration), D-96 (the appearance mechanism's ruling), D-97 (this family),
  D-71/D-72/D-73 (the listener's handle, the repair's credit, the repair's commit), D-45 (signatures are L4's contract).
- **Ceiling:** 130 lines · **Status:** structure and guardrails. Every declared name and its exact text is L4's to
  transcribe; this file states what each piece must be and why, never a transcript of it.

## 1. The structure — five files, one owner each

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/view-record/index.ts` | the record over the APP'S ONE STORE: **four** address constants, **four** batched declarations and **six** routes — no instance, no file (D-87, D-91, D-97) — and the ONLY site in the tree that calls the appearance mechanism | every write is one whole family at its own root, so the surface holds no store verb and `main.ts` holds no address |
| `src/main/view-surface/index.ts` | the surface module: the one reference to the record, the one subscription over all four roots, and the shape arms | the record is held once at boot, and this module is the only file a channel handler reaches it through (the `tabs-surface` arrangement) |
| `src/shared/view-channels.ts` | the **six** channel constants, single-sourced | a name spelled in two files is a rename that half-lands (`tabs-channels.ts`'s precedent) |
| `src/shared/view-shape.ts` | the four families' vocabulary, the measured pane defaults, the appearance placeholder and the pure per-pane and per-zone derivations — ONE spelling for both realms | two realm-local copies would be two answers to "what is a zone" (D-88's `D-73` rule) |
| `src/renderer/view-client.ts` | the shape the RENDERER reads: filled by deliveries, read synchronously, written through the routes | it holds no address space, no persistence, no constraint and no instance — a projection, never a store (D-78's ruling 3) |

**One construction site, and it is the boot's**: no file here constructs an instance, and none spells a `provident-*.json` name. **The `src/main/`
module also names the `provident-storeroom` PACKAGE NOWHERE** — its handle type is `TabsRecordStore`'s, re-exported as `ViewRecordStore` — because
`tests/e2e/central-data/scenarios.test.ts` `S-9` pins the importing FILES at exactly three and a fourth import would red a gating row (D-87). The
renderer side imports neither the package nor a main-process module: its vocabulary is `shared/`'s and its bridge is narrowed structurally.

## 2. The four address constants, and the tiers that are named once

`VIEW_PANES_ADDRESS = ['panes']` (`file`), `VIEW_FOCUS_ADDRESS = ['focus']` (`mem`), `VIEW_ZONES_ADDRESS = ['zones']` (`mem`) and `VIEW_THEME_ADDRESS
= ['theme']` (`mem`, D-97). **No root is a member of the crossing's reserved projection set** (`window · tabs · layout · settings · tracked ·
modules`), so no `Y-2` projection can collide with any of them.

**Each family's tier is named ONCE, in a constant, and the module's tier TYPE is derived from those constants** — not re-spelled from the package's
`Tier` — so a fourth family ADDS its constant rather than widening a table, and no read, write or repair can half-move a family to the other tier.
**THE APPEARANCE FAMILY TOOK THAT ROUTE AT `D-97`**, and its tier is the measurement: the app persists no appearance setting today, and a durable
appearance preference is the ambient store the control's own prohibition row fails. **THE ZONE FAMILY'S TIER IS THE MEASUREMENT THAT DECIDED ITS BOOT
SOURCE** (D-91): the frozen store's four members stood at `mem` and nowhere else — no `file` copy of any zone member exists in the tree — so there is
no durable image to inherit, and a repair at the creation instant is the family's only lawful source (D-84).

**NO ROOT IS NESTED, AND THAT IS THE ONE THING THIS MODULE'S ADDRESS SHAPE OWES THE MEASUREMENT** (D-87, re-driven at the zone root): a nested write
does not create its parent (`AddressNotFound` over a fresh store), and a `file` root answers `TierNotFound` at `mem`. A parent branch would need a
third declaration whose own body is handed `undefined` at the registration instant, and would still not carry two tiers.

## 3. The shapes, and the three admissions

`ViewPaneGeometry` is one pane's admitted geometry; `ViewFocusEntry` is the focus model's `FocusEntry` **narrowed to what the store's boundary admits
and what `===` compares by value**; `ViewFocusMirror` is `FocusState` with the absent active spelled as absence; and `ViewZone` is one zone's admitted
record — **`slot` opaque, and `distance`/`size`/`display` individually OPTIONAL**, which is measured rather than lenient: the tree's own writers seed
`size`+`display` for three zones and `slot` alone for another, and its two zone batteries write `slot`+`distance` with neither of the other two.

**ONE PARSE PER FAMILY, FROM A VALUE AND NEVER FROM A HANDLE** (D-83's `viewFrom`, applied here): `panesFrom`, `mirrorFrom` and `zonesFrom` admit
member by member and `null` an unreadable family. A member the value names and this parse cannot admit is **dropped** — and a dropped mirror entry
**takes a dangling `activeId` with it**, so the read can never answer a mirror the write route would refuse. **A record carrying no admissible member
is still a ZONE** (`paneOf` cannot admit that state because a pane's `size` and `bounds` are required; a zone's are not), so naming a zone and storing
nothing about it is a state the family holds.

**AND THE APPEARANCE RECORD IS THREE MEMBERS WITH ONE DERIVED ONE** (D-97): `token` and `attribute` are the pair the act carried and `declaration` is
the mechanism's own answer for it — `{name, value, removal}` — so the record is SELF-DESCRIBING and the pair below judges exactly that agreement.
`themeFrom` requires the declaration and DEFAULTS NOTHING: a value carrying no readable `{value, removal}` pair is not this family and answers the
declared placeholder through the read's default arm, never a substituted one.

**THE BOUNDARY'S DOMAIN IS SPELLED ONCE** (`isBoundary`): the crossing carries strings, booleans, finite numbers, plain objects and arrays and
**refuses `null` and `undefined`** (measured: `ValueRefusedAtBoundary`). It is used where a value is opaque to this module but not to the store — an
entry's `target`, a zone's `slot` — and it is why every `null` member of the appearance record (a setting nothing has named, an attribute no caller
has held, a declaration's `name` at the placeholder) is written as ABSENCE by `composeTheme`.

## 4. The four declarations, and the repair's two routes

`panes-must-stand`, `focus-must-stand`, `zones-must-stand` and `theme-must-stand`, gathered by `viewConstraintDeclarations(getStore)` for the boot's
batch. **All four bodies judge `context.value` and none is wrapped by a null-store guard** — `tabsMustStand`'s shape, for the same measured reason:
the boot binds its holder only after `createProfileStore` returns, so a handle-reading body would abstain at the exact instant it is the only one that
can act.

**THE ZONE FAMILY'S PLACEHOLDER IS THE ONE THAT NAMES NO ZONE** (`{}`), and that is the whole of the pair's design: the family has no default value
anywhere in the tree, so a repair minting a geometry would make the repair and the read two authorities over one question, while `{}` answers every
zone exactly as the absent address answered it (D-91).

**ONE REPAIR-WRITE PATH, AND ITS BRANCH IS THE RECORD'S OWN `write` MEMBER, NEVER THE INSTANT'S NAME**: a registration record carries a `write`
function and takes the store's **three** positions with no fourth (supplying one is a `TypeError` before any store act); a landing record carries no
`write` and its commit **must** be named at `write`'s **fourth**, which `writeJoinedAt`'s required second position makes an arity error to omit. **All
arms answer through `repairAnswer`** — the credited arm's one constructor (D-72) — and the failed arm is stated, never fallen into.

**`theme-must-stand` HAS A SECOND ARM AND IT IS THE ONE THIS FAMILY EXISTS FOR** (D-97). Its first arm is the other three's — no plain record,
repaired to the placeholder, which is the mechanism's answer for `(null, null)` and therefore the value no renderer can apply. **Its second is
STALENESS**: a record that stands but whose carried declaration is not the one the mechanism would produce for the setting and the attribute it
carries is INTERNALLY CONTRADICTORY — it names a resolution for a token it no longer carries — so the pair answers `stale-theme` and its repair
re-derives from the value's OWN two members. **That is what makes the resolution a REPAIR's product rather than a boot's**, and it is why the module
holds the tree's ONLY call of `resolveTheme`/`applyThemeDeclaration`: one derivation (`derivedTheme`), one composer (`composeTheme`), and a STRUCTURAL
comparison (`sameThemeValue`) because the crossing normalises key order and a serialisation comparison would report every legal record stale
(measured). **THE RULE ABOVE IS NOT WIDENED BY IT**: the pair still judges ONE whole value's legality, and the derived member is not a MEMBER
judgement but the declaration's whole subject. **THE LANDING ARM IS REACHABLE AND THEREFORE IMPLEMENTED RATHER THAN ASSUMED**: a
`provident.data.delete` at any root is a client act on the same instance (D-79/D-80), so a deleted family is repaired inside its own commit, answering
one notification and not two — measured at each of the three earlier roots, and at the appearance root the ROUTE's own write is a landing write
(`TH-3` of this family's battery). This module's own routes cannot produce the arm for the other three, which is why the answer carries no
`repaired` member.

## 5. Every write path, enumerated

Eight, and there is no ninth: `commitPane`, `commitFocus`, `commitZones` and `commitTheme` (an IPC route — a UI act each; the appearance route writes
the caller's PAIR and composes no declaration), and the four creation-instant repairs (a constraint repair each, and the landing arm the engine asks
through the same helper). **A READ WRITES NOTHING**: a family that misses answers its declared empty arm and the repair that makes it stand is the
CREATION instant's — the arm clause 4 of D-82 forbids a re-derivation on, measured both ways (the file's bytes unmoved over a standing family, and an
absent `mem` family still absent after three reads). **No timer, no interval, no poll and no `queueMicrotask` stands in the module or its surface**,
asserted over comment-elided code with a positive control.

## 6. Guardrails

- **The listener's handle is minted per subscription per address** (`view-record:<n>@<address>`): `register` replaces the function under a handle and `unlisten` withdraws the handle whole, so one spelled name starves a second subscriber. **It can never equal a constraint `id`** — a fixed `view-record:` prefix no id carries, a minted ordinal, and the address it is bound at (D-71).
- **The body is a notification and nothing else, and the caller's throw is contained**: a listener's write opens its own commit, and a body's throw crosses every hop back into the write that fired it. **A registration that could not stand leaves nothing behind** — the entry `listen` wrote is withdrawn where `register` fails.
- **The mirror's composition writes no `activeId` member when nothing is active**, **the zone family's composition keeps every sibling zone and every member the caller did not supply**, and **the appearance record writes no `null` member at all** (`composeTheme`, D-97): `null` cannot cross the boundary, and a whole-value write that dropped a sibling would be a second writer of state the caller never touched.
- **The SIX channels are constants, imported by `main.ts`, `preload.ts` and the surface; no literal is re-spelled.**

## 7. Owed, and deliberately not built

A pair that judges a **standing** family's members (a pane whose geometry is unusable, a zone whose `size` is a string) is a declaration this module
does not carry: each pair's arm is absence, and widening one would be a second declaration wearing the first one's sentence — the boundary D-84 drew
for the secure crossing and D-83 drew when it gave the `order` seat a pair of its own. The admission answers such a member (the measured default, or
the zone's absence), so nothing is lost; what is owed is the refusal, not the value. **AND THE ZONE FAMILY'S WIRING IS LANDED** (`D-92`), and the
appearance family's consumer is the renderer's application (`D-97`): what stands owed is the STANDING-member refusal above and nothing else.