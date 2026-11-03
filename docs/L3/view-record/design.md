# L3 — `view-record`: the module design

- **Layer:** L3 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — the crossing's second declaration set,
  filed by D-87.
- **Inputs:** `docs/L2/view-record/interface.md` rev 1 §1–§5; D-82 (the four clauses), D-83 (a creation-instant body's
  route and its address), D-84 (a `mem` address's only lawful source), D-86 (`1.9.1`'s landing-arm save), D-71/D-72/D-73
  (the listener's handle, the repair's credit, the repair's commit), D-45 (signatures are L4's contract).
- **Ceiling:** 130 lines · **Status:** structure and guardrails. Every declared name and its exact text is L4's to
  transcribe; this file states what each piece must be and why, never a transcript of it.

## 1. The structure — three files, one owner each

| File | Holds | Why it is separate |
|---|---|---|
| `src/main/view-record/index.ts` | the record over the APP'S ONE STORE: **two** address constants, **two** batched declarations and **four** routes — no instance, no file (D-87) | every write is one whole family at its own root, so the surface holds no store verb and `main.ts` holds no address |
| `src/main/view-surface/index.ts` | the surface module: the one reference to the record, the one subscription over both roots, and the shape arms | the record is held once at boot, and this module is the only file a channel handler reaches it through (the `tabs-surface` arrangement) |
| `src/shared/view-channels.ts` | the **four** channel constants, single-sourced | a name spelled in two files is a rename that half-lands (`tabs-channels.ts`'s precedent) |

**One construction site, and it is the boot's**: no file here constructs an instance, and none spells a `provident-*.json`
name. **The module also names the `provident-storeroom` PACKAGE NOWHERE** — its handle type is `TabsRecordStore`'s, re-exported
as `ViewRecordStore` — because `tests/e2e/central-data/scenarios.test.ts` `S-9` pins the importing FILES at exactly three
and a fourth import would be a fourth import of a package this module does not need to name (D-87).

## 2. The two address constants, and the one that is derived

`VIEW_PANES_ADDRESS = ['panes']` (`file`) and `VIEW_FOCUS_ADDRESS = ['focus']` (`mem`). **Neither root is a member of the
crossing's reserved projection set** (`window · tabs · layout · settings · tracked · modules`), so no `Y-2` projection can
collide with either.

**Each family's tier is named ONCE, in a constant, and the module's tier TYPE is derived from those two constants** — not
re-spelled from the package's `Tier` — so a third family would have to add its constant rather than widen a table, and no
read, write or repair can half-move a family to the other tier.

**NEITHER ROOT IS NESTED, AND THAT IS THE ONE THING THIS MODULE'S ADDRESS SHAPE OWES THE MEASUREMENT** (D-87): a nested write
does not create its parent (`AddressNotFound` over a fresh store), and a `file` root answers `TierNotFound` at `mem`. A
parent branch would need a third declaration whose own body is handed `undefined` at the registration instant, and would
still not carry two tiers.

## 3. The shapes, and the two admissions

`ViewPaneGeometry` is one pane's admitted geometry; `ViewFocusEntry` is the focus model's `FocusEntry` **narrowed to what the
store's boundary admits and what `===` compares by value** — `id` a string, number or boolean, `target` opaque, `label` the
model's optional string; `ViewFocusMirror` is `FocusState` with the absent active spelled as absence.

**ONE PARSE PER FAMILY, FROM A VALUE AND NEVER FROM A HANDLE** (D-83's `viewFrom`, applied here): `panesFrom` and `mirrorFrom`
admit field by field and `null` an unreadable family. A member the value names and this parse cannot admit is **dropped** —
the disposition `viewFrom` takes for a seat naming no row — and a dropped entry **takes a dangling `activeId` with it**, so
the read can never answer a mirror the write route would refuse.

**THE BOUNDARY'S DOMAIN IS SPELLED ONCE** (`isBoundary`): the crossing carries strings, booleans, finite numbers, plain
objects and arrays and **refuses `null` and `undefined`** (measured: `ValueRefusedAtBoundary`). It is used where a value is
opaque to this module but not to the store — an entry's `target` — so a refusal cannot arrive as a thrown boundary form
instead of this module's own sentence.

## 4. The two declarations, and the repair's two routes

`panes-must-stand` and `focus-must-stand`, gathered by `viewConstraintDeclarations(getStore)` for the boot's batch.
**Both bodies judge `context.value` and neither is wrapped by a null-store guard** — `tabsMustStand`'s shape, for the same
measured reason: the boot binds its holder only after `createProfileStore` returns, so a handle-reading body would abstain
at the exact instant it is the only one that can act. A registration instant hands the body the value at its own address.

**ONE REPAIR-WRITE PATH, AND ITS BRANCH IS THE RECORD'S OWN `write` MEMBER, NEVER THE INSTANT'S NAME**: a registration
record carries a `write` function and takes the store's **three** positions with no fourth (supplying one is a `TypeError`
before any store act); a landing record carries no `write` and its commit **must** be named at `write`'s **fourth**, which
`writeJoinedAt`'s required second position makes an arity error to omit. **Both arms answer through `repairAnswer`** — the
credited arm's one constructor (D-72) — and the failed arm is stated, never fallen into.

**THE LANDING ARM IS REACHABLE AND THEREFORE IMPLEMENTED RATHER THAN ASSUMED**: a `provident.data.delete` at either root is a
client act on the same instance (D-79/D-80), so a deleted family is repaired inside its own commit, answering one notification
and not two — measured. This module's own routes cannot produce the arm, which is why its answer carries no `repaired` member.

## 5. Every write path, enumerated

Four, and there is no fifth: `commitPane` and `commitFocus` (an IPC route — a UI act), and the two creation-instant repairs
(a constraint repair, and the landing arm the engine asks through the same helper). **A READ WRITES NOTHING**: a family
that misses answers its declared default and the repair that makes it stand is the CREATION instant's — the arm clause 4
of D-82 forbids a re-derivation on, measured both ways (the file's bytes unmoved over a standing family, and an absent
`mem` family still absent after three reads). **No timer, no interval, no poll and no `queueMicrotask` stands in the module
or its surface**, asserted over comment-elided code with a synthetic positive control.

## 6. Guardrails

- **The listener's handle is minted per subscription per address** (`view-record:<n>@<address>`): `register` replaces the
  function under a handle and `unlisten` withdraws the handle whole, so one spelled name starves a second subscriber.
  **It can never equal a constraint `id`** — a fixed `view-record:` prefix no id carries, a minted ordinal, and the address
  it is bound at — which is the one cross-kind rule that survives (D-71; the address is free).
- **The body is a notification and nothing else, and the caller's throw is contained**: a listener's write opens its own
  commit, and a body's throw crosses every hop back into the write that fired it.
- **A registration that could not stand leaves nothing behind** — the entry `listen` wrote is withdrawn where `register`
  fails.
- **The mirror's composition writes no `activeId` member when nothing is active**: `null` cannot cross the boundary, and a
  fourth spelling of "no active" is a second answer to one question.
- **The four channels are constants, imported by `main.ts`, `preload.ts` and the surface; no literal is re-spelled.**

## 7. Owed, and deliberately not built

A pair that judges a **standing** family's members (a pane whose geometry is unusable, a mirror whose `entries` is not a
list) is a declaration this module does not carry: each pair's arm is absence, and widening one would be a second
declaration wearing the first one's sentence — the boundary D-84 drew for the secure crossing and D-83 drew when it gave
the `order` seat a pair of its own. The read's default answers such a member, so nothing is lost; what is owed is the
refusal, not the value.
