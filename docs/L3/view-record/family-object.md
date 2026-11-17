# L3 — `view-record`: the family object — one declaration per family, whose published root and constraint declaration are both PROJECTIONS of it

- **Layer:** L3 · **Unit:** `store-view-record` · **Branch:** `strata` (D-6) · **Artifact:** `l3-design` · **Rev:** 2 — Rev 1 was `H-8`'s first half written against an object that did not exist yet; **this revision is the currency pass a blind walkthrough returned STALE**, and every correction in it is read off the landed file and not inferred (`H-1`/`H-2` landed the object; the split is unmoved). **THIS PAGE IS NEW AND IT IS A SPLIT, NOT AN APPEND**: `docs/L3/view-record/design.md` stands at its class ceiling, so the object's structure, signatures, hunks and guardrails take a page of their own and `design.md` is not touched (`D-1`, `D-2`, `D-292`; the figure is that page's and is read there, `D-43`).
- **Charter:** `D-292` — the user's ruled form, verbatim *"Additive root+declaration object, plus a gating entries↔roots row (Recommended)"*: a family is declared ONCE, and its root — a `ViewDeclaredRoot`-shaped VALUE — and its constraint declaration — a `ViewConstraintDeclaration`-shaped PROJECTION — are both read off that one declaration, so **a declaration cannot be published without its root** while **a root with no declaration stays LAWFUL and stays EXPRESSIBLE** (`D-292`, `D-145`, `D-132`).
- **Inputs:** `docs/L1/family-helper.md` §4 (the contract) and §7 `H-1`/`H-2`/`H-8`/`H-9`; `docs/L2/view-record/family-object.md` (the I/O surface, the mechanism, the six names); the module's own code at `src/main/view-record/index.ts` (`D-53`); `D-292`, `D-291`, `D-145`, `D-132`, `D-137`, `D-129`, `D-101`, `D-219`, `D-124`, `D-71`, `D-72`, `D-53`, `D-45`, `D-46`, `D-41`, `D-43`, `D-40`, `D-30`, `D-3`.
- **Ceiling:** 150 lines, class max (`D-1`) · **Write scope:** `docs/L3/view-record/` · **Status:** structure, signatures, hunks and guardrails — **no function body appears here** (`D-45`), and no `src/` byte does either. **THE OBJECT IS LANDED, NOT DESIGNED AGAINST**: `H-1`/`H-2` wrote it into `src/main/view-record/index.ts`, where `ViewPairedFamily`, `ViewUnpairedFamily`, `ViewFamilySpec`, `ViewFamily`, `viewFamily` and `VIEW_FAMILIES` all stand exported, and BOTH publications are re-based onto the tuple — so every name §2 fixes is a name that EXISTS, and this page's status is the landed one rather than a prediction (`D-3`, `D-292`). **THE UNIT IS STILL OPEN**: `H-1`/`H-2` landing and its rows reading green is not the unit's closure — the blind walkthrough is what closes it, and this revision is that walkthrough's findings routed, not a closure claimed (`D-3`).
- **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite names its **site** and never an offset (`D-41`).

## 0. Scope — what this page decides, and the three things it refuses to re-grain

This page fixes **the object's structure and its landing**: where it lives, the six signature names, the hunks in the order L4 landed them, and the guardrails `H-1`/`H-2` may not break. Three things it does NOT re-grain, each with its owner (`D-43`): **the I/O surface and the refused literals** are `docs/L2/view-record/family-object.md`'s `H-6` (`D-292`); **the object's contract at the boundary** is L1 §4's; and **the relation between the two publications** — `declaration ↔ root` — is `tests/integration/central-data/declared-root.test.ts`'s, published and gating, and is not this unit's to re-measure (`D-101`, `D-145`).

## 1. Where it lives, and what makes it one object rather than two lists

**THE HOME IS `src/main/view-record/index.ts`, BESIDE THE TWO PUBLICATIONS IT IS THE SOURCE OF** (`D-292` (iv)): the tier constants block, `viewConstraintDeclarations` and `viewDeclaredRoots`. **IT STANDS WHERE THE LANDING PUT IT** — after the three families' repair bodies and immediately ABOVE `viewConstraintDeclarations`, which it now feeds, with `viewDeclaredRoots` below it: one home, one module, **no fourth minting authority** (`D-71`). The three rejected homes and their measured costs are L1 §6's and are not re-argued here (`D-43`, `D-292` (iv)).

- **A FAMILY IS DECLARED ONCE, AT MODULE SCOPE, THROUGH ONE FACTORY THE TUPLE CALLS** — `viewFamily(spec)` per family, into the exported tuple `VIEW_FAMILIES` — and both publications become PROJECTIONS over that tuple, so no caller changes (`D-292`; L2 §1, §3).
- **THE TUPLE IS EXPORTED AS PART OF THE CONTRACT AND NOT AS A TEST CONVENIENCE**: a row that measures the object's contract must read the object's own declaration set, and a module-private tuple would leave the headline claim measured by nothing — which is this unit's own root cause (`D-292`, `D-3`).
- **THE ASYMMETRY BETWEEN THE TWO HALVES IS THE ORDER AND NOT A TASTE**: `viewDeclaredRoots()` takes no argument because the delivery is built **before** the store is bound (`D-219`'s holder order), while a body reads nothing at the registration instant (`D-124` (iii)) — so the half that needs a store is handed one and the half that does not is not (`D-292`, L1 §4).
- **THE PAIRED SPEC CARRIES ITS BODY AS A FACTORY AND NEVER AS A VALUE**: `body: (getStore) => body` is called once per `declaration(getStore)` CALL, so a body cannot be built at module scope and cannot close over a handle that does not exist yet (`D-124` (iii), `D-219`).

## 2. The signatures — six names, and not one of them is on the wire

**NO SIGNATURE OF AN EXISTING EXPORT MOVES AND THE EXPORT IS ADDITIVE** (`D-292` (iii), `D-43`): `createViewDelivery`, `viewConstraintDeclarations(getStore)` and `viewDeclaredRoots()` keep their declared text, so `src/main/main.ts` moves no byte — the boot's one construction and its `as never` cast included (`D-219`, `D-112`).

```ts
// TYPES AND SIGNATURES ONLY — no body appears on this page (`D-45`), and the six are EXPORTED, which is §1's
// contract claim (`D-292`). `Store` is the module's existing private alias (`type Store = TabsRecordStore`);
// `ViewDeclaredRoot['tier']` is how the tier is named, because the alias `ViewTier` stays module-private (D-101, L1 §4).
export interface ViewPairedFamily {
  readonly tag: 'paired'
  readonly address: readonly string[]
  readonly tier: ViewDeclaredRoot['tier']
  readonly id: string
  readonly body: (getStore: () => Store | null) => (context: unknown) => ViewConstraintAnswer
}

export interface ViewUnpairedFamily {
  readonly tag: 'unpaired'
  readonly address: readonly string[]
  readonly tier: ViewDeclaredRoot['tier']
  readonly id?: never          // the `?` is LOAD-BEARING: a required `never` could not be satisfied at all
  readonly body?: never
}

export type ViewFamilySpec = ViewPairedFamily | ViewUnpairedFamily

export interface ViewFamily {
  readonly root: ViewDeclaredRoot                                          // a VALUE, built once at module scope
  declaration(getStore: () => Store | null): ViewConstraintDeclaration | null   // a PROJECTION; `null` when unpaired
}

export function viewFamily(spec: ViewFamilySpec): ViewFamily
export const VIEW_FAMILIES: readonly ViewFamily[]
```

- **THE TAG CLOSES THE OMISSION AND THE `never` CLOSES THE CARRIAGE**, and both halves are EPC-independent — which is the property the rejected untagged union lacked: excess-property checking reads the union's WHOLE member set, so a tag plus a `never` is the only pair that refuses a dropped body on a DECLARED type (`D-292`, `D-72`; L2 §2).
- **THE ONE NAMED ESCAPE IS `id: undefined`** (it compiles while `exactOptionalPropertyTypes` is off in the test project), and no projection can act on it: `undefined` is the one value the arm's `null` discipline already separates from a declaration (`D-292`, `tsconfig.tests.json`).
- **`declaration` ANSWERS `null` ON THE UNPAIRED ARM — never `undefined`, never `{}`, never an absent member**: `null` is a value a projection must TEST, while an absent or empty arm is one `.filter` from being dropped silently (`D-292`, `D-145`).
- **BOTH PUBLICATIONS KEEP THEIR DECLARED RETURNS** (`readonly ViewConstraintDeclaration[]` / `readonly ViewDeclaredRoot[]`), which is where the guarantee stands — below `main.ts`'s one cast, which guarantees nothing (`D-72`, `D-292` (iii)).

## 3. The hunks, in the order L4 landed them

**EVERY SITE BELOW NAMES A SYMBOL AND NEVER AN OFFSET** (`D-41`) — which is why the landing moved no cite on this page: each symbol was read again in the file as it now stands, `FO-1`–`FO-4` standing written and `FO-5` still untouched. The one ordering fact the landing fixed: the object was inserted ABOVE `viewConstraintDeclarations`, so that projection and `viewDeclaredRoots` below it both stand AFTER the tuple they read.

| # | Site in `src/main/view-record/index.ts` | The write | Cite |
|---|---|---|---|
| `FO-1` | immediately above `viewConstraintDeclarations`, after the three families' repair bodies (`repairTheme` last) | the spec union with its two arms, `viewFamily`, the exported `VIEW_FAMILIES`, and `ViewFamily` — every `address`, `id` and `tier` a spec carries being the **EXISTING** constant (`VIEW_*_ADDRESS`, `VIEW_*_MUST_STAND_ID`, `*_TIER`), never a re-spelling — **landed, and it re-spells nothing** | §2, `D-292`, `D-53`, `D-101` |
| `FO-2` | `viewDeclaredRoots`'s body | its hand-spelled list became a projection of the tuple's `root`s, in the tuple's order — the same roots, the same order, one source — **landed** | §1, `D-292`, `D-101` |
| `FO-3` | `viewConstraintDeclarations`'s body | its hand-spelled list became a projection of the **PAIRED** specs' `declaration(getStore)`, with the unpaired arm's `null` dropped **at the projection and never by the spec** — **landed**; the batch is the paired subset | §2, `D-292`, `D-145` |
| `FO-4` | the docblocks `FO-1`–`FO-3` falsify: the four-constants paragraph and both exports' own blocks | re-grained IN PLACE around the new shape — comments only, and no `D-n` row of this unit's moves — **landed** | `D-46`, `D-1` |
| `FO-5` | **NOT A HUNK** — `VIEW_DECLARED_ADDRESSES` and `createViewDelivery` | **NOT re-based, NOT derived from the tuple, NOT deleted**: see `FG-6`, and the landing left both exactly as they stood | §4, `D-137` |

## 4. What must not move, and the one list that stays hand-spelled

- **`VIEW_DECLARED_ADDRESSES` IS NOT RE-BASED, AND THE REASON IS THE INSTRUMENT** — **CONFIRMED AGAINST THE LANDED FILE AND NOT CARRIED OVER FROM THE DESIGN**: the hand-spelled array still stands as written, every element still one of the exported constants, `createViewDelivery` still maps over that array to mint its entries, and **neither site reads `VIEW_FAMILIES`**. Sourcing the listener array from the tuple would mint nothing and move no signature, but it would leave `FH-1` comparing **one tuple with itself**, so that row would measure a CONSTRUCTION PROPERTY where it exists to read an INDEPENDENT list. **Not minting is the constraint; keeping the row able to fail is why the constraint stands here** (`D-137`, `D-53`, `D-292`).
- **NOTHING IS REGISTERED, MINTED OR RUN** — **ALSO CONFIRMED AT THE LANDED OBJECT**: `viewFamily` builds a root value and a `declaration` closure and touches no `listen`, `register`, `unlisten`, `handleFor` or store verb, and the tuple's own docblock states the discipline; no entry, handle, id or store verb comes from the object, and `createViewDelivery`/`createTabsDelivery` keep their signatures — so `VD-1` and `VD-4` are satisfied **precisely because the object never registers** (`D-219`, `D-129`, `D-71`; `docs/L3/view-record/delivery.md` §6).
- **A FORK'S OWN FAMILY IS DECLARED, PUBLISHED AND HEARD BY NO LISTENER — AND THAT IS THE RULED CONSEQUENCE RATHER THAN AN OVERSIGHT** (`D-292`, `D-137`): a family added to the tuple gets its root and its declaration from its own spec and **gets NO ENTRY**, because the listener array `createViewDelivery` reads is closed to this module's own declared addresses and this page may not widen it (`FO-5`). The tuple can therefore grow without the delivery growing; a page that implied a fork brings its own subscription would be designing the mechanism `D-292` barred.
- **NO FAMILY, ADDRESS, TIER OR ROUTE IS ADDED**: the object declares only what the crossings already declare at the tiers they already use, so the PUBLICATION is what it is today and the declared-tier guard's set is unmoved — which family is the unpaired one, and how many roots or declarations there are, are `declared-root.test.ts`'s to state and are not restated here (`D-137`, `D-145`, `D-101`, `D-43`).
- **NO `src/` FILE IS CREATED**, so `pins`' source count and the map's row count are the walkthrough's to hold and not this page's to state (`D-43`, `D-26`); and no import of this object crosses the renderer boundary, which is the cost that barred the two shared homes (L1 §6, `D-292` (iv)).

## 5. Guardrails for L4

**THE IDS ARE THIS PAGE'S OWN AND ARE NOT ROWS**: `FO-n` are the hunks of §3 and `FG-n` are the guardrails below; `FH-1`/`FH-2`/`FH-3` are the unit's test rows and live in their own files (`D-3`). **EACH WAS READ AGAINST THE LANDED FILE AND EACH STANDS UNCHANGED** — the landing broke none of them, and none is softened here: a guardrail that a later fork or a later hunk cannot satisfy is a finding to report, never a sentence to reword.

| id | Guardrail | Cite |
|---|---|---|
| `FG-1` | **THE OBJECT DECLARES AND NEVER REGISTERS**: no `listen`, no `register`, no `removeListener`/`unlisten`, no entry, no `handleFor` call, no store verb, and no second registration route — `VD-1`/`VD-4` stand because the object does not act. **SURVIVED THE LANDING, CHECKED AT IT**: `viewFamily` returns `{ root, declaration }` and nothing else | `D-219`, `D-129`, `D-71` |
| `FG-2` | **THE UNPAIRED ARM KEEPS `tag: 'unpaired'` AND DECLARES `readonly id?: never` / `readonly body?: never` WITH THE `?` PRESENT** — the tag is what closes the omission and the `never` is what closes the carriage, and **the LEG that measures it is `npm run typecheck:tests`** (the whole `tests/**` tree) and never `npm run typecheck`, which reads `src/**` alone and is blind to a fixture under `tests/unit/`: that test leg must refuse L2 §2's five literals and admit both controls | `D-292`, `D-72`, `tsconfig.tests.json` |
| `FG-3` | **`declaration` ANSWERS `null` WHEN UNPAIRED AND A `ViewConstraintDeclaration` WHEN PAIRED** — never `undefined`, never `{}`, and never a sentinel declaration minted to stand in for the absence | `D-292`, `D-145` |
| `FG-4` | **THE BODY FACTORY IS CALLED INSIDE `declaration`**, once per call and never at module scope, so `viewFamily` and `.root` build no body | `D-124` (iii), `D-219` |
| `FG-5` | **THE TUPLE IS EXPORTED, MODULE-SCOPE, AND BUILT BY `viewFamily` ALONE** — one call per family, no lazy getter, no wrapper function, no re-export, because the unit row reads the set off this binding | `D-292`, `D-3` |
| `FG-6` | **`VIEW_DECLARED_ADDRESSES` MOVES NO BYTE AND `createViewDelivery` DOES NOT READ THE TUPLE** — `FH-1`'s independence is the whole reason. **SURVIVED THE LANDING, CHECKED AT IT**: the array is still literal and `createViewDelivery` still reads only it | `D-137`, `D-53` |
| `FG-7` | **NO CONSTANT IS RE-SPELLED AND NO TIER ALIAS IS EXPORTED**: every spec names the existing address, id and tier constants, and `ViewTier` stays module-private — a row names the tier as `ViewDeclaredRoot['tier']` | `D-101`, `D-53` |
| `FG-8` | **THE TWO PUBLICATIONS ANSWER WHAT THEY ANSWER TODAY**: no root appears or disappears, no id is renamed, no declaration joins or leaves the batch — the boot, the e2e spreads and `declared-root.test.ts` compile against the same declared types | `D-292` (iii), `D-112`, `D-101` |
| `FG-9` | **`H-2` RE-GRAINS COMMENTS AND NOTHING ELSE**, in place, and no docblock takes on a figure another page owns | `D-46`, `D-43` |

## 6. The row this page is judged by, and what it deliberately does not measure

`tests/unit/store-view-record/family-object.test.ts` is **`FH-3`, unmarked and GATING** (`H-9`; `D-40`, `D-3`): authored after the `D-30` sweep so it carries no marker, and it imports §2's six names. **IT WAS RED ON ARRIVAL AND IT IS GREEN NOW, ON THE LANDED OBJECT**: written before `H-1`, it red on that import, on `(e)`'s five directives and on the implicit-`any` cascade the absent tuple left in every expression that read it — and all three cleared when `H-1`/`H-2` landed the six exports and re-based both projections onto the tuple, which is the evidence the object is what turns it green. **THE RED WAS THE MECHANISM AND NOT A DEFECT** (`D-3`), and `FH-1`/`FH-2` cannot serve that role (green on arrival by construction). The loop's reading at the landing is `2,980 passed / 2 skipped of 2,982` over `149` files, with `typecheck` 0, `typecheck:tests` 0 and `build` 0 — so `FH-3` and `FH-1` are green together, the contract row and the independence row both standing on the landed object. **AND THE UNIT IS STILL OPEN**: what closes it is the blind walkthrough, and this revision is that walkthrough's currency findings routed, not its closure claimed. Its arms are L1 §5's `(a)`–`(f)` plus its own falsifier; **this page adds none of them** (`D-3`, `D-292`).

- **`FH-3` (e)'s DIRECTIVES ARE THE MECHANISM'S INSTRUMENT, AND ITS LEG IS `typecheck:tests`**: an UNUSED directive is `TS2578` and reds that leg, so a shape that widened silences nothing quietly — and each directive sits on the line ABOVE the error it suppresses, because a missing-member error reports at the literal's opening while a wrong-typed member reports at the member (`D-72`, `D-292`).
- **THE ROW DERIVES EVERY FIGURE IT READS** — a floor of at least one family per arm and never the figure, since the root count, the tiers and the ids are `central-data`'s `declared-root.test.ts` (`D-43`, `D-101`).
- **WHAT IT MUST NOT ASSERT, EACH WITH ITS OWNER**: not `declaration ↔ root` (`declared-root.test.ts`); not a count, a tier, an id or the unpaired root's literal (the same row); not a handle's spelling (`D-71`); not an order (the order that IS load-bearing is the tab record's declaration batch, `D-156`); not a store act, a boot or a subscription (`D-219`).

## 7. What this page does not license

- **NO FUNCTION BODY AND NO SEVENTH NAME**: a further exported symbol is a layer inventing what `D-292` (iv) reserved, and a body written here would be L4's work taken from it (`D-45`, `D-292`).
- **NO BYTE OUTSIDE THIS MODULE**: the tab record's trio is `store-tabs-record`'s, and a second object there would be the second authority `D-129` forbids (`D-292` (iv), `D-129`).
- **NO SECOND MEASUREMENT**: `npm run typecheck` owns only the narrower shape fact that each projected half satisfies its published type; the DIRECTION between the publications is `declared-root.test.ts`'s; `FH-3` owns the MECHANISM — which arm a spec may be (`D-292`, `D-72`, `D-145`).
- **NO CLAIM OF A GREEN LEG BY THIS SEAT**: §6's figures are the LOOP's reading at the landing and are named as such; this seat ran no command, so no leg's green is this page's measurement — and no green of any leg closes this unit (`D-3`).
