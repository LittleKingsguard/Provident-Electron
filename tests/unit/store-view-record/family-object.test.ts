// tests/unit/store-view-record/family-object.test.ts — `FH-3`: THE FAMILY OBJECT'S CONTRACT, for `store-view-record`.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// **IT IS RED ON ARRIVAL, AND THAT IS THE UNIT'S RED-FIRST EVIDENCE RATHER THAN A DEFECT** (`D-3`, `D-40`; L1 §7's `H-9`).
// The six names it imports — the union `ViewFamilySpec` with its arms `ViewPairedFamily`/`ViewUnpairedFamily`, the factory
// `viewFamily`, the module-scope tuple `VIEW_FAMILIES` and the returned object `ViewFamily` — are `H-1`'s and did not exist
// when this row was written, so the import fails and `npm test` reds with it, while `npm run typecheck:tests` reds on that
// import AND on `(e)`'s five directives, which have no error to suppress yet. **`FH-1` and `FH-2` cannot serve that role:
// they are green on arrival by construction**, so the only row that can prove the object is the change that turns it green
// is this one. **NOT ONE LINE HERE MOVES TO MAKE IT GREEN** — a line dropped to make the tree compile would delete the
// measurement rather than the defect.
//
// EVERY FIGURE IS DERIVED FROM THE MODULE AND NONE IS RESTATED (`D-43`): the arms read `VIEW_FAMILIES` and the two
// publications, never a spelled count, tier, id or address, and the only numeric reading this file takes of the object is a
// FLOOR (`toBeGreaterThan(0)`). How many roots or declarations there are is
// `tests/integration/central-data/declared-root.test.ts`'s (`D-43`, `D-101`).
//
// WHAT THIS ROW MUST NOT ASSERT, EACH WITH THE ROW THAT OWNS THE FACT (`D-43`, `D-145`): NOT `declaration ↔ root` — that is
// `tests/integration/central-data/declared-root.test.ts`'s `D-1`; NOT the root count, a tier value, an id value or the
// unpaired root's literal — the same row's; NOT a handle's spelling, which comes from a module counter (`D-71`); NOT the
// entries, the delivery, a store act, a boot or a subscription (`D-219`, `D-125`); and NOT an order — the order that IS
// load-bearing in this corpus is the TAB record's declaration batch (`D-156`). **NOTHING HERE IMPORTS `createViewDelivery`**,
// because the entries are `FH-1`'s row and the object mints no entry: the fan-out is closure-private and `D-292` clause (iii)
// moves no delivery signature.
// **AND ADDRESSES ARE COMPARED AS TUPLES** (`JSON.stringify([...address])`) and never as joined strings, because `['a/b']`
// and `['a', 'b']` share one `join('/')` spelling (`D-53`).
import { describe, expect, it } from 'vitest'

import { VIEW_FAMILIES, viewConstraintDeclarations, viewDeclaredRoots, viewFamily } from '../../../src/main/view-record'
import type {
  ViewConstraintAnswer,
  ViewConstraintDeclaration,
  ViewDeclaredRoot,
  ViewFamily,
  ViewFamilySpec,
  ViewPairedFamily,
  ViewUnpairedFamily,
} from '../../../src/main/view-record'

/**
 * **ONE ADDRESS AS A COMPARABLE TUPLE — AND NEVER `join('/')`** (`D-53`, `D-292`). The store's address space is a tuple of
 * segments, so `['a/b']` and `['a', 'b']` are two DIFFERENT addresses sharing one joined spelling; a joining comparator
 * would call a spurious member a match and this row would pass over the very defect it exists for. `JSON.stringify` of the
 * ARRAY is the tuple's own spelling, and the nesting inside it is what keeps a segment from aliasing its neighbours.
 */
const tupleOf = (address: readonly string[]): string => JSON.stringify([...address])

/**
 * **THE KEY A PROJECTED DECLARATION IS COMPARED BY: ITS ADDRESS TUPLE *AND* ITS `id`** (`D-292`). Two families may stand at
 * one root (the store keeps one value per address and a family is that value), so an address-only key would call two
 * different declarations of one family interchangeable — which is exactly the drift this row exists to see.
 */
const declarationKeyOf = (declaration: ViewConstraintDeclaration): string =>
  JSON.stringify([[...declaration.address], declaration.id])

/**
 * **THE TWO SIDES. THE DERIVED SIDE IS THE OBJECT'S OWN DECLARATION SET AND THE PUBLISHED SIDE IS THE MODULE'S OWN
 * PROJECTIONS**, read once each, off the exports and never off a spelling of this file's (`D-53`, `D-292`). Neither side is
 * sorted, filtered or re-ordered on its way in: the address (and id) is projected out of each element and that is all.
 * **THE PROJECTIONS ARE CALLED AT MODULE SCOPE HERE AND THAT IS THE ROW'S OWN READING, NOT THE MODULE'S DEED**: what the
 * contract forbids is the MODULE building a body at its own scope, and `(d)` measures that on a fixture whose counter is
 * this file's own (`D-124` (iii)).
 * **AND THE COMPARISON IS OVER PROJECTED KEYS RATHER THAN OVER THE ELEMENTS THEMSELVES**, which is a measurement and not a
 * preference: the constraint batch is rebuilt on every call and its `constraint` members are fresh closures, so two calls
 * never answer the same function identity and no consumer reads one — an identity or deep-equality comparison here would be
 * judging machinery instead of a publication (`D-124` (iii), `D-292`).
 */
const publishedRoots: readonly ViewDeclaredRoot[] = viewDeclaredRoots()
const publishedDeclarations: readonly ViewConstraintDeclaration[] = viewConstraintDeclarations(() => null)
const declaredRoots: readonly ViewDeclaredRoot[] = VIEW_FAMILIES.map((family) => family.root)
const declaredDeclarations: readonly ViewConstraintDeclaration[] = VIEW_FAMILIES.map((family) =>
  family.declaration(() => null),
).filter((declaration): declaration is ViewConstraintDeclaration => declaration !== null)

/** **THE TWO ARMS OF `VIEW_FAMILIES`, DERIVED BY WHAT THE PROJECTION ANSWERS** (`D-292`, `D-145`): a family is PAIRED when
 *  its `declaration` answers a declaration and UNPAIRED when it answers `null`. Nothing here spells which family is which —
 *  the unpaired root's identity is `declared-root.test.ts`'s and its tier is `central-data`'s (`D-43`). */
const pairedFamilies: readonly ViewFamily[] = VIEW_FAMILIES.filter((family) => family.declaration(() => null) !== null)
const unpairedFamilies: readonly ViewFamily[] = VIEW_FAMILIES.filter((family) => family.declaration(() => null) === null)

/**
 * **THE VERDICT — BOTH DIRECTIONS AND THE COUNT, FROM ONE FUNCTION** (`D-3`, `D-292`). Every arm of `(c)` and every control
 * under `(g)` reads THIS object: the row carries no set assertion of its own and the falsifier carries no copy of one, which
 * is the only shape in which a control can prove the row it controls.
 */
interface ProjectionVerdict {
  /** Members the OBJECT declares that the PUBLICATION does not carry — the direction `FH-1`'s omission arm means. */
  readonly missing: readonly string[]
  /** Members the PUBLICATION carries that no spec declares — the direction that keeps a projection from inventing a half. */
  readonly extra: readonly string[]
  /** MULTIPLICITY — the one relation a `Set` comparison cannot see, because a duplicate collapses to one member. */
  readonly counts: { readonly declared: number; readonly published: number; readonly equal: boolean }
  /** `true` only when both directions are empty AND the counts agree. */
  readonly ok: boolean
}

/** **`publication ↔ object`, AS A SET EQUALITY IN BOTH DIRECTIONS PLUS A COUNT** (`D-292`, `D-53`). `missing` is declared
 *  minus published and `extra` is published minus declared: neither direction can be satisfied by the other, which is what
 *  makes "the publications ARE its projections" one claim and not two. */
function compareProjection(declaredKeys: readonly string[], publishedKeys: readonly string[]): ProjectionVerdict {
  const declaredSet = new Set(declaredKeys)
  const publishedSet = new Set(publishedKeys)
  const missing = [...declaredSet].filter((key) => !publishedSet.has(key))
  const extra = [...publishedSet].filter((key) => !declaredSet.has(key))
  const counts = {
    declared: declaredKeys.length,
    published: publishedKeys.length,
    equal: declaredKeys.length === publishedKeys.length,
  }
  return { missing, extra, counts, ok: missing.length === 0 && extra.length === 0 && counts.equal }
}

// ═══════════════ (e) THE FIVE REFUSED LITERALS AND THE TWO IT ADMITS (`D-292`, `D-72`) ═══════════════
//
// **THESE ARE ROWS AND NOT COMMENTS, AND `npm run typecheck:tests` IS THEIR LEG.** That leg compiles this file — its
// `include` is the whole `tests/**` tree, `strict` on — so a directive passes only while the error it suppresses is REALLY
// THERE, and the property that makes that a measurement is what a WIDENING does: make the unpaired arm's paired members
// optional `string`, give the paired arm's two members a `?`, or put a fourth word in the tier's domain, and the directive
// becomes UNUSED — which `tsc` reports as `TS2578` ("Unused '@ts-expect-error' directive") and the leg reds.
//
// **PLACEMENT IS PART OF THE MEASUREMENT.** A MISSING-member error reports at the literal's OPENING — there is no member to
// point at — while a WRONG-TYPED member reports AT THE MEMBER, which is why the repo's existing precedent puts one directive
// above a MEMBER and another above an INITIALIZER, and why a directive one line off can silence the wrong error
// (`crossing.test.ts`). The two `never` cases are driven through a DECLARED-TYPE fixture — an annotation of the arm's own
// type — so the red can only be the member's TYPE and never a fresh literal's excess-property check (`D-292`).
//
// **AND A MEMBER'S REFUSAL NAMES `undefined` RATHER THAN `never`**, which a reader checking the message against §2 could take
// for a mismatch: `readonly id?: never` makes the property type `never | undefined`, so a carried `id` reds as *"Type
// 'string' is not assignable to type 'undefined'"* and a carried body as *"Type '() => …' is not assignable to type
// 'undefined'"*. The `?` is load-bearing in both directions — a REQUIRED `never` member could not be satisfied by the lawful
// unpaired control below (`D-292`).
//
// **AND THE ONE NAMED ESCAPE IS STATED RATHER THAN PINNED** (`docs/L2/view-record/family-object.md` §2's `undefined` row): an
// explicit `id: undefined` COMPILES on the unpaired arm while `exactOptionalPropertyTypes` is off in `tsconfig.tests.json`,
// which is the union's only escape and is documented upstream as an ESCAPE and NOT as a contract. It is therefore NOT
// asserted anywhere in this file: a row that pinned it would red for the wrong reason the day that flag were turned on, and
// no projection can act on it — `undefined` is the one value the arm's `null` discipline already separates from a
// declaration (`D-292`).

/** A LAWFUL TIER, NAMED THROUGH THE PUBLISHED TYPE AND NOT THROUGH THE PRIVATE ALIAS: `ViewTier` is not exported, and a row
 *  that spelled the union itself would be a second authority for it (`D-101`, L1 §4). */
const A_TIER: ViewDeclaredRoot['tier'] = 'file'

/** A BODY THIS ROW OWNS: it ignores its context and answers the passing arm, so no fixture of this file ever touches a
 *  store — the body's subject here is the DEFERRAL and the shape, and a store act would be `(d)`'s opposite (`D-124`). */
const aPassingBody = (): ViewConstraintAnswer => true

// THE TWO ADMITTED CONTROLS. They MUST compile, and they are the control that the union is not merely always-red: a lawful
// PAIRED spec and a lawful UNPAIRED one — a root with no pair, which is lawful by ruling (`D-145`).
const ADMITTED_PAIRED: ViewPairedFamily = {
  tag: 'paired',
  address: ['a-subject'],
  tier: A_TIER,
  id: 'a-subject-must-stand',
  body: () => aPassingBody,
}
const ADMITTED_UNPAIRED: ViewUnpairedFamily = { tag: 'unpaired', address: ['a-lone-root'], tier: A_TIER }

// (1) A PAIRED SPEC THAT DROPPED ITS BODY — THE BLOCKER THIS WHOLE FORM EXISTS FOR. The omission is a MISSING member its
//     own tagged arm requires, and the tag is what makes it not the other arm: the other arm's tag is a different literal,
//     so no member set of the union admits it (`D-292`). **THE FIXTURE IS ANNOTATED WITH THE UNION ITSELF**, so it is the
//     TAG that selects `ViewPairedFamily` here and not this file's annotation — which is the whole difference between this
//     form and the rejected untagged one, where the same literal compiled clean.
// @ts-expect-error — a spec with no `body` is not a `ViewFamilySpec`: *"Property 'body' is missing … but required in type 'ViewPairedFamily'"*, reported at the literal's opening
const REFUSED_NO_BODY: ViewFamilySpec = { tag: 'paired', address: ['a-subject'], tier: A_TIER, id: 'a-subject-must-stand' }

// (2) A PAIRED SPEC THAT DROPPED ITS `id` — the same hole, one member over, and again at the UNION's own type.
// @ts-expect-error — a spec with no `id` is not a `ViewFamilySpec`: *"Property 'id' is missing … but required in type 'ViewPairedFamily'"*, also at the literal's opening
const REFUSED_NO_ID: ViewFamilySpec = { tag: 'paired', address: ['a-subject'], tier: A_TIER, body: () => aPassingBody }

// (3) AN UNPAIRED SPEC CARRYING AN `id` — REFUSED BY THE MEMBER'S TYPE, and the fixture is a DECLARED TYPE, so a spec
//     hoisted to a `const` and spread reds exactly as a fresh literal would: the arm excess-property checking never
//     reaches (`D-292`, `D-72`).
const REFUSED_CARRIED_ID: ViewUnpairedFamily = {
  tag: 'unpaired',
  address: ['a-lone-root'],
  tier: A_TIER,
  // @ts-expect-error — the unpaired arm declares `readonly id?: never`: carriage is refused by the TYPE, not by freshness
  id: 'a-subject-must-stand',
}

// (4) AN UNPAIRED SPEC CARRYING A BODY — the same member rule, the other member.
const REFUSED_CARRIED_BODY: ViewUnpairedFamily = {
  tag: 'unpaired',
  address: ['a-lone-root'],
  tier: A_TIER,
  // @ts-expect-error — `readonly body?: never` refuses a body an unpaired spec cannot have
  body: () => aPassingBody,
}

// (5) A FOURTH TIER WORD — the tier's domain is this module's own alias (three words built from four constants), so a word
//     the store does not have is refused AT THE MEMBER (`D-101`, L1 §4). **THE FIXTURE IS THE UNION'S TYPE AND IS OTHERWISE
//     LAWFUL**, so the tier is the only thing this literal can be refused for.
const REFUSED_TIER: ViewFamilySpec = {
  tag: 'paired',
  address: ['a-subject'],
  // @ts-expect-error — 'session' is not a tier this module's alias carries: *"Type '\"session\"' is not assignable to type '\"file\" | \"mem\" | \"temp\"'"*, reported AT THE MEMBER
  tier: 'session',
  id: 'a-subject-must-stand',
  body: () => aPassingBody,
}

// ═══════════════ (f) THE NARROWING CONTROL — THE ARM THAT PROVES THE TAG NARROWS (`D-292`, `ASM-FH-2`) ═══════════════
//
// **NOT A REFUSED LITERAL BUT A READ THAT MUST COMPILE, AND IT CARRIES NO DIRECTIVE** — a directive here would be the row
// asserting that narrowing FAILS. Inside a `tag === 'paired'` branch `spec.id` IS a `string`, and this is what distinguishes
// the tagged union from the rejected `never`-without-a-tag form, where the arm is UNSTATED and `id` reads
// `string | undefined` in both arms, so every projection narrows at runtime with an `'id' in spec` test instead of by type.
const narrowedIdOf = (spec: ViewFamilySpec): string | null => (spec.tag === 'paired' ? spec.id : null)

// ═══════════════ (d) THE DEFERRED FACTORY — A COUNTING FIXTURE THE ROW OWNS (`D-124` (iii), `D-219`) ═══════════════
//
// **THE COUNT IS THIS FIXTURE'S OWN AND IT IS SAID SO RATHER THAN IMPLIED**: it cannot count the module's bodies, so what it
// measures is the CONTRACT on a spec this row owns — that `viewFamily` and `.root` build none and that each
// `declaration(getStore)` call builds exactly one. A body that read or wrote at construction would be a store act before the
// store exists, which is why the deferral is a guarantee and not a style (`D-124` (iii), `D-219`).
let bodiesBuilt = 0
const COUNTING_SPEC: ViewPairedFamily = {
  tag: 'paired',
  address: ['a-subject-of-this-row'],
  tier: A_TIER,
  id: 'a-subject-of-this-row-must-stand',
  body: () => {
    bodiesBuilt += 1
    return aPassingBody
  },
}
// THE FAMILY IS BUILT AT MODULE SCOPE, exactly as `VIEW_FAMILIES`'s own elements are, so the reading below is taken across a
// module-scope construction and not around a comfortable empty one.
const COUNTING_FAMILY: ViewFamily = viewFamily(COUNTING_SPEC)
const BODIES_BUILT_AT_MODULE_SCOPE = bodiesBuilt

describe('store-view-record · FH-3 — the family object’s contract: two halves of one address, an explicit `null`, both publications, a deferred factory, and the arm that reds', () => {
  it('FH-3 (a) · ONE ADDRESS, PROJECTED TWICE — a paired family’s root and its declaration carry the same address, the root its tier and the declaration its id', () => {
    // A FLOOR AND NOT THE FIGURE (`D-43`): an empty tuple would satisfy every assertion below for free, and a row that has
    // stopped measuring looks exactly like that.
    expect(
      pairedFamilies.length,
      'at least one paired family stands, or this arm compares nothing with nothing — a FLOOR, never the count (`D-43`)',
    ).toBeGreaterThan(0)
    pairedFamilies.forEach((family) => {
      const root = family.root
      const declaration = family.declaration(() => null)
      expect(declaration, 'a paired family answers a declaration, so the two halves are one declaration and not two').not.toBeNull()
      if (declaration === null) return // the assertion above is the arm; this is the compiler's arm
      expect(
        tupleOf(declaration.address),
        'the ONE address this family declares reaches both halves unchanged — a declaration published at another address would be a second family',
      ).toBe(tupleOf(root.address))
      expect(typeof root.tier, 'and the root carries its TIER, which the published type alone admits').toBe('string')
      expect(typeof declaration.id, 'while the declaration carries its ID, which the published type alone admits').toBe('string')
      expect(declaration.id.length, 'an id that stands is a word and not an empty span').toBeGreaterThan(0)
    })
  })

  it('FH-3 (b) · THE UNPAIRED ARM IS AN EXPLICIT `null` — present, `toBeNull()`, never `undefined` and never an empty stand-in', () => {
    expect(
      unpairedFamilies.length,
      'at least one unpaired family stands — a FLOOR, never the count, and which family it is belongs to `declared-root.test.ts` (`D-43`, `D-145`)',
    ).toBeGreaterThan(0)
    unpairedFamilies.forEach((family) => {
      const declaration = family.declaration(() => null)
      expect(declaration, 'the unpaired arm’s declaration is `null`: a value a projection must TEST').toBeNull()
      expect(declaration, 'and never `undefined`, which a projection could not tell from an omitted member').not.toBeUndefined()
      expect(declaration, 'and never an empty object standing in for the absence — `{}` is one `.filter` from being dropped silently').not.toEqual({})
      expect(family.root, 'while its ROOT still stands: a root with no declaration is lawful and must stay expressible').toBeDefined()
    })
  })

  it('FH-3 (c) · THE PUBLICATIONS ARE ITS PROJECTIONS, BOTH DIRECTIONS — every root and every paired declaration is published, and nothing is published that a spec does not declare', () => {
    // THE ROOT HALF, keyed by the address tuple. Both directions are the claim: `missing` is the object declaring a root
    // the publication omits, `extra` is the publication inventing a half no spec declares (`D-292`).
    const roots = compareProjection(
      declaredRoots.map((root) => tupleOf(root.address)),
      publishedRoots.map((root) => tupleOf(root.address)),
    )
    expect(roots.missing, 'a root the object declares and `viewDeclaredRoots()` omits — the projection is not a projection of anything else').toEqual([])
    expect(roots.extra, 'and a published root no spec declares — `viewDeclaredRoots()` may not answer a family the tuple does not carry').toEqual([])
    expect(roots.counts.equal, 'one published root per declared root, so a duplicate on either side cannot hide in the set equality').toBe(true)

    // THE DECLARATION HALF, keyed by `(address, id)` because two families may stand at one root and one address alone would
    // call two different declarations interchangeable (`D-292`).
    const declarations = compareProjection(
      declaredDeclarations.map(declarationKeyOf),
      publishedDeclarations.map(declarationKeyOf),
    )
    expect(declarations.missing, 'a declaration the object declares and `viewConstraintDeclarations(getStore)` omits — the batch is the paired subset and nothing else').toEqual([])
    expect(declarations.extra, 'and a published declaration no spec declares, which would be a pair minted outside the tuple').toEqual([])
    expect(declarations.counts.equal, 'one published declaration per paired family, so multiplicity is read here and not by the set').toBe(true)

    // AND NEITHER HALF IS VACUOUS — the unpaired family participates in the ROOT comparison and in no declaration
    // comparison, which is the one-directional guarantee stated as a reading rather than as a paragraph (`D-145`).
    expect(declaredRoots.length, 'the object declares at least one root, or the root comparison compares nothing').toBeGreaterThan(0)
    expect(pairedFamilies.length, 'and at least one paired family, or the declaration comparison compares nothing').toBeGreaterThan(0)
  })

  it('FH-3 (d) · THE FACTORY IS DEFERRED — nothing is built by `viewFamily` or by `.root`, and exactly one body per `declaration(getStore)` CALL', () => {
    expect(
      BODIES_BUILT_AT_MODULE_SCOPE,
      'no body is built while the spec and its family are constructed at module scope: a body built there would close over a store that does not exist yet (`D-124` (iii))',
    ).toBe(0)
    expect(COUNTING_FAMILY.root, 'reading `.root` is reading a VALUE and builds no body either').toBeDefined()
    expect(bodiesBuilt, 'so the count is still zero after `.root`').toBe(0)

    const first = COUNTING_FAMILY.declaration(() => null)
    expect(bodiesBuilt, 'one body per `declaration(getStore)` call — the factory is called INSIDE the projection and nowhere else').toBe(1)
    expect(first, 'and the paired projection answers a declaration').not.toBeNull()
    expect(typeof first?.constraint, 'whose `constraint` IS the body the factory built, so the projection carries what it was handed').toBe('function')
    expect(first?.constraint({}), 'and the built body is a function the engine may invoke, answering through the closed union').toBe(true)

    COUNTING_FAMILY.declaration(() => null)
    expect(bodiesBuilt, 'a second call builds a second body: the factory is per call and never memoised, so no answer is shared between two registrations').toBe(2)
  })

  it('FH-3 (e) · THE SHAPE REFUSES FIVE LITERALS AND ADMITS TWO — the refusals are measured by `npm run typecheck:tests` through the directives above, and the controls are measured here', () => {
    // **THE FIVE REFUSALS CANNOT BE READ AT RUN TIME AND SAYING SO IS PART OF THE ARM**: a directive asserts at COMPILE
    // time, so the instrument is `npm run typecheck:tests`, and what a WIDENING does is make one of the five UNUSED —
    // `TS2578`, which reds that leg. What CAN be read here is the other half of the same claim: the two ADMITTED literals
    // are specs the factory ACCEPTS, one per arm, so the union is not merely always-red (`D-292`, `D-72`).
    const fromPaired = viewFamily(ADMITTED_PAIRED)
    const fromUnpaired = viewFamily(ADMITTED_UNPAIRED)
    const pairedDeclaration = fromPaired.declaration(() => null)
    expect(pairedDeclaration, 'the admitted PAIRED literal is a spec the factory accepts, and it answers a declaration').not.toBeNull()
    expect(pairedDeclaration?.id, 'whose id is the fixture’s own — the projection carries what the spec declared').toBe(ADMITTED_PAIRED.id)
    expect(tupleOf(fromPaired.root.address), 'and its root is published at the address the spec declared').toBe(tupleOf(ADMITTED_PAIRED.address))
    expect(fromUnpaired.declaration(() => null), 'while the admitted UNPAIRED literal is accepted and answers the explicit `null`').toBeNull()
    expect(tupleOf(fromUnpaired.root.address), 'and it too publishes its declared address as a root, which is the lawful one-sided family').toBe(tupleOf(ADMITTED_UNPAIRED.address))
    // AND WHICH REFUSAL IS WHICH IS STATED HERE AS A READING OF THE DIRECTIVES ABOVE AND NOT AS AN ASSERTION: (1) and (2)
    // are MISSING-member refusals reported at the literal's opening, (3) and (4) are refusals on a `never`-typed member
    // reported AT the member through a DECLARED type, and (5) is a WRONG-TYPED member on the tier (`D-292`). **NOTHING
    // BELOW ASSERTS THE FIXTURES' OWN TAGS OR MEMBERS**: a literal this file wrote cannot be false, so an assertion reading
    // it would be a row that cannot fail — the arms above are the two ADMITTED controls driven through `viewFamily`, and the
    // five refusals belong to the compiler (`D-3`).
  })

  it('FH-3 (f) · THE NARROWING CONTROL — the tag narrows, so this read must COMPILE rather than fail', () => {
    expect(narrowedIdOf(ADMITTED_PAIRED), 'inside a `tag === \'paired\'` branch `spec.id` IS a string, and it is the same string the spec carries').toBe(ADMITTED_PAIRED.id)
    expect(narrowedIdOf(ADMITTED_UNPAIRED), 'and the unpaired arm has no `id` to read at all — the OTHER arm, not a `never` a caller must test').toBeNull()
  })

  it('FH-3 (g) · **THE FALSIFIER — THE COMPARISON CAN STILL FAIL ONCE THE OBJECT LANDS**: the same verdict driven over deliberately divergent pairs before it is trusted; a row that cannot fail is a deleted row wearing a new name', () => {
    // **THIS FALSIFIER'S SUBJECT IS THE COMPARISON AND NOT THE RED**: `FH-3` is red on arrival by design, so what must be
    // proved here is that the machinery `(c)` leans on will still be able to FAIL on the day the object lands (`D-3`,
    // `D-292`) — every arm below drives `compareProjection` itself, and no arm copies an assertion out of `(c)`.

    // (i) THE SAME TWO LISTS ARE ADMITTED — the comparator is not simply always-red, and the module as it stands is
    //     admitted by the same function the controls drive.
    expect(compareProjection(['[["a"]]', '[["b"]]'], ['[["a"]]', '[["b"]]']).ok, 'identical lists are admitted, so the comparator has two arms').toBe(true)
    expect(
      compareProjection(declaredRoots.map((root) => tupleOf(root.address)), publishedRoots.map((root) => tupleOf(root.address))).ok,
      'and the object as it stands is admitted by the same function, so `(c)` is the same reading and not a luckier one',
    ).toBe(true)

    // (ii) AN OMITTED MEMBER REDS THE DECLARED DIRECTION — and it is NAMED as a tuple, never merely counted.
    const omitted = compareProjection([['a'], ['b'], ['c']].map(tupleOf), [['a'], ['b']].map(tupleOf))
    expect(omitted.ok, 'a publication that omits a declared member MUST fail').toBe(false)
    expect(omitted.missing, 'and the missing member is named').toEqual([tupleOf(['c'])])
    expect(omitted.extra, 'with nothing spurious in this pair, so the direction that reds here is the omission one').toEqual([])

    // (iii) A SPURIOUS MEMBER REDS THE OTHER DIRECTION — "nothing is published that a spec does not declare".
    const spurious = compareProjection([['a']].map(tupleOf), [['a'], ['not-declared']].map(tupleOf))
    expect(spurious.ok, 'a publication carrying a member no spec declares MUST fail').toBe(false)
    expect(spurious.extra, 'and the undeclared member is named').toEqual([tupleOf(['not-declared'])])
    expect(spurious.missing, 'while the declared direction is clean, so the two arms are separate').toEqual([])

    // (iv) A DUPLICATE LEAVES THE SETS EQUAL AND REDS ONLY THE COUNT — the one relation a set comparison cannot see.
    const duplicated = compareProjection([['a']].map(tupleOf), [['a'], ['a']].map(tupleOf))
    expect(duplicated.missing, 'a duplicate hides in the set comparison, exactly as this row says it does').toEqual([])
    expect(duplicated.extra, 'and it is not a spurious member either — it is multiplicity').toEqual([])
    expect(duplicated.counts.equal, 'so only the count arm can read it').toBe(false)
    expect(duplicated.ok, 'and the verdict as a whole MUST fail').toBe(false)

    // (v) A SEPARATOR INSIDE A SEGMENT IS A DIFFERENT ADDRESS — the arm the tuple rule exists for (`D-53`).
    const collision = compareProjection([tupleOf(['a/b'])], [tupleOf(['a', 'b'])])
    expect(collision.ok, 'a joining comparator would call this a match and this one does not').toBe(false)
    expect(collision.missing, 'the declared member is missing under the tuple spelling').toEqual([tupleOf(['a/b'])])
    expect(collision.extra, 'and the published one is spurious under it').toEqual([tupleOf(['a', 'b'])])

    // (vi) THE DECLARATIONS' `id` HALF IS LOAD-BEARING — two families at ONE address are two different declarations, which is
    //      why `(c)` keys them by `(address, id)` and not by the address alone (`D-292`).
    const oneDeclaration: ViewConstraintDeclaration = { address: ['a'], id: 'a-must-stand', constraint: () => true }
    const anotherDeclaration: ViewConstraintDeclaration = { address: ['a'], id: 'a-must-stand-too', constraint: () => true }
    const byId = compareProjection([declarationKeyOf(oneDeclaration)], [declarationKeyOf(anotherDeclaration)])
    expect(byId.ok, 'a declaration whose id moved is NOT the declared one, so an address-only key would have passed it').toBe(false)
    expect(byId.missing, 'and the declared one is named').toEqual([declarationKeyOf(oneDeclaration)])
    expect(byId.extra, 'while the published one is spurious').toEqual([declarationKeyOf(anotherDeclaration)])

    // (vii) AND THE PUBLICATION IS DRIVEN ONE MEMBER AT A TIME ON THE MODULE'S OWN LISTS — every declared root participates,
    //       so a projection that dropped ONE of them reds here and not only on a divergent pair of this falsifier's making.
    //       **NO ARM OF THE PUBLICATION MAY BE FILTERED OUT TO MAKE THE ROW GREEN** — the unpaired root is compared with the
    //       rest, which is the exclusion a row would otherwise take to pass (`D-145`).
    declaredRoots.forEach((root) => {
      const withoutIt = compareProjection(
        declaredRoots.map((declared) => tupleOf(declared.address)),
        publishedRoots.map((published) => tupleOf(published.address)).filter((key) => key !== tupleOf(root.address)),
      )
      expect(withoutIt.ok, `dropping the publication of ${tupleOf(root.address)} MUST fail — every declared root is compared`).toBe(false)
      expect(withoutIt.missing, 'and that root is the one named').toContain(tupleOf(root.address))
    })
  })
})
