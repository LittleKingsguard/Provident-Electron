// tests/integration/store-tabs-record/declared-entries.test.ts — `FH-2`: THE TAB RECORD'S DELIVERED ENTRY ADDRESSES
// AGAINST ITS PUBLISHED ROOTS, for `store-tabs-record`.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// WHAT WAS UNMEASURED, AND WHAT IS HONESTLY NEW HERE. Both sides of this crossing spell ONE exported constant: the delivery's
// single `entries` element takes its `address` from `TABS_RECORD_ADDRESS`, and `tabsDeclaredRoots()` publishes that same
// constant (`src/main/tabs-record/index.ts:1492-1504`, `:1436-1437`) — and NO ROW COMPARES THE TWO LISTS. `crossing.test.ts`
// hands `[...delivery.entries]` to the store at seven harness sites (`:106`, `:214`, `:461`, `:541`, `:753`, `:865`, `:910`) and
// this module's own battery hands them over once more (`surface.test.ts:68`, whose rows read the sink); `central-data`'s
// declared-root fixture builds the same delivery only so its store carries every listener list the app's construction carries
// (`tests/integration/central-data/declared-root.test.ts:96-103`). **AND THE COMPARISON ITSELF IS THIS ROW'S SUBJECT.**
// **AND THE GROUND IS NARROWER THAN "NOTHING MEASURES THIS", WHICH IS WHY WHAT THIS ROW ADDS IS NAMED RATHER THAN ITS ABSENCE**:
// the relation has PARTIAL witnesses, each at its own grain — `crossing.test.ts`'s fire counts (`:487`) read that a dropped or
// duplicated entry changes how often the push fires; `:592-595` reads the TRIGGERED entry's bound `address` against the record's
// literal and the COUNT of listener entries one write at the record triggers, so a moved entry or a duplicate beside the honest one
// reds there; `:510-511` reads that a `mem` write at an address the record does not name notifies nothing; and the
// `focus-retirement` leg's `F-3` reads that same push again at a process boundary. **BUT NONE OF THEM COMPARES THE TWO LISTS, AND
// THAT IS THIS ROW**: no row reads the delivery's ENTRY ADDRESSES against `tabsDeclaredRoots()`'s PUBLICATION as a SET — both
// directions over both lists, plus the count relation `entries.length` ↔ `roots.length` — since every existing reading of THESE
// entries is a reading of FIRE, or of ONE address against a literal, never of the delivery against the publication it must match. **SO THIS ROW IS NOT
// THE FIRST EVIDENCE OF EVERY FAULT IT CAN SEE** (a second published root reds `central-data`'s union equality, a dropped entry
// reds a fire count); what is new is that the RELATION is read rather than inferred from two separate facts, which is `D-137`'s
// defect class stated as one measurement (`D-292`, `D-53`).
//
// HOW BOTH SIDES ARE REACHED, AND WHY NEITHER IS FILTERED, SORTED OR RE-SPELLED. The entries off the EXPORTED builder the boot
// calls — `createTabsDelivery(sink).entries`, with a sink that RECORDS NOTHING because this row's subject is the ADDRESSES and
// not the push — and the roots off the EXPORTED projection the `data.*` surface's declared-tier guard is fed from
// (`tabsDeclaredRoots()`, `D-101`, `D-219`). The ADDRESS is PROJECTED OUT of each element and that is all, so no arm of either
// publication is dropped to make this row green (`D-145`, `D-53`). **AND IT IS AN INDEPENDENCE CENSUS, NOT AN AGREEMENT
// PROOF**: both sides read the same constant today, so the row reds when a constant is dropped from or duplicated in EITHER
// list and it CANNOT catch a wrong address spelled in both — the exact limit `D-53` records for the view crossing.
//
// IT IS A 1 × 1 LIST, AND SAYING SO IS LOAD-BEARING RATHER THAN A FOOTNOTE (`D-292`, `D-43`):
//   - **WHAT IT CAN PROVE**: that the one delivered entry's address and the one published root's address are the SAME TUPLE —
//     compared as `JSON.stringify([...address])`, never as a `join('/')` spelling, so a segment carrying a separator cannot
//     alias two addresses into one match; that the two LENGTHS AGREE, which is arm (b)'s own claim and the one relation a `Set`
//     cannot see; and that an omitted entry, a spurious entry, a duplicate element and an address-tuple collision EACH RED the
//     row (arm (f)). **AND (b) IS A RELATION AND NOT A PROOF OF CARDINALITY**: two lists of one address each satisfy it, so a
//     duplicate mirrored on both sides would pass here and red `crossing.test.ts:487`'s fire count instead — the same limit as
//     the one below, stated rather than left to be discovered.
//   - **WHAT IT CANNOT PROVE**: nothing about whether that one address is CORRECT — both sides spell one constant, so a WRONG
//     address spelled in both passes here, the defect `D-53` warns the view crossing cannot catch either.
//   - **AND THE TWO DIRECTIONS ARE NOT A PARTITION AT THIS CARDINALITY**: one mismatch is named by BOTH subtractions of one
//     comparison, so (a) is ONE COMPARISON wearing two direction names and is individually much weaker than the view row's
//     multi-address reading; a reader must not count two readings that cannot differ in kind. (a) is kept because the direction
//     names are what a failure is READ by, (b) because multiplicity is a different relation — and **THE FALSIFIER (f) IS THIS
//     ROW'S LOAD-BEARING ARM**: (a) and (b) are green on arrival by construction, so their whole bite is (f)'s (`D-292`).
//   - **AND THE OPPOSITE ASYMMETRY IS THIS MODULE'S OWN**, stated so this row is not read as the view row's mirror: every
//     declaration of `tabsConstraintDeclarations`' batch stands at the SAME root (`:1418-1425`, `D-83`) — MANY DECLARATIONS TO
//     ONE ROOT — where the view module publishes a root with NO declaration at all. So this row MUST NOT assert a declaration per
//     root, MUST NOT assert any declaration count, and MUST NOT restate the root count, a tier word, a constraint id or the root's
//     own literal: **NOTHING IT ASSERTS IS A FIGURE TAKEN FROM ANOTHER DOCUMENT** (`D-43`, `D-101`).
//
// WHAT THIS ROW MUST NOT ASSERT, EACH WITH THE ROW THAT OWNS THE FACT (`D-43`): NOT `declaration ↔ root`, NOT the published root
// count and NOT any root's tier — `tests/integration/central-data/declared-root.test.ts:148-184` owns that equality, that total
// and those tiers; NOT the tab DECLARATION batch's membership or order — `D-83`/`D-156` are that batch's; NOT a handle's
// spelling, since `handleFor` mints from a module counter (`src/main/tabs-record/index.ts:308-310`, `D-71`); NOT the entries'
// ORDER, which no consumer reads; NOT the element's THREE-MEMBER SHAPE — the PACKAGE accepts or refuses it (`AddressMalformed`)
// before any filesystem act, and this tree's `listeners:` call sites already pass these very entries through that door, so a
// copy would be a SECOND measurement of an existing one (`D-53`, `D-5`); and NOT a store, a boot, a subscription or a write
// (`D-219`, `docs/L1/family-helper.md` §5).
import { describe, expect, it } from 'vitest'

import { createTabsDelivery, tabsDeclaredRoots } from '../../../src/main/tabs-record'

/** **ONE ADDRESS AS A COMPARABLE TUPLE — AND NEVER `join('/')`** (`D-53`, `D-292`): `['a/b']` and `['a', 'b']` are two DIFFERENT
 *  addresses sharing one joined spelling, so a joining comparator would call a spurious entry a match. `JSON.stringify` of the
 *  ARRAY is the tuple's own spelling, quoted so a nested segment cannot alias. */
const tupleOf = (address: readonly string[]): string => JSON.stringify([...address])

/** **THE VERDICT — BOTH DIRECTIONS AND THE COUNT, FROM ONE FUNCTION** (`D-3`, `D-292`): every arm of this row and every control
 *  under (f) reads THIS object, so neither the row nor its falsifier carries a set assertion of its own to drift with — and (b)'s
 *  length pair is asserted off the same two arrays this function counts, which is why the two readings cannot disagree. */
interface TabsEntriesRootsVerdict {
  /** A root with NO entry — `D-137`'s never-hears, the omission direction. */
  readonly omitted: readonly string[]
  /** An entry with NO published root, so the declared-tier guard is never handed it and cannot judge a write there (`D-101`). */
  readonly spurious: readonly string[]
  /** MULTIPLICITY — the one relation a `Set` cannot see, and the one the store does not refuse (`guide §6`). */
  readonly counts: { readonly entries: number; readonly roots: number; readonly equal: boolean }
  /** `true` only when the two directions are empty AND the counts agree. */
  readonly ok: boolean
}

/** **`entries ↔ roots`, AS A SET EQUALITY IN BOTH DIRECTIONS PLUS A COUNT** — ONE function, so the row and its falsifier cannot
 *  drift: `omitted` is roots minus entries and `spurious` is entries minus roots, and neither is satisfied by the other. **AT THIS
 *  ROW'S CARDINALITY THEY NAME THE SAME PAIR** — one address per side, so they are one comparison wearing two direction names. */
function compareTabsEntriesToRoots(
  entryAddresses: readonly (readonly string[])[],
  rootAddresses: readonly (readonly string[])[],
): TabsEntriesRootsVerdict {
  const entryTuples = new Set(entryAddresses.map(tupleOf))
  const rootTuples = new Set(rootAddresses.map(tupleOf))
  const omitted = [...rootTuples].filter((tuple) => !entryTuples.has(tuple))
  const spurious = [...entryTuples].filter((tuple) => !rootTuples.has(tuple))
  const counts = {
    entries: entryAddresses.length,
    roots: rootAddresses.length,
    equal: entryAddresses.length === rootAddresses.length,
  }
  return { omitted, spurious, counts, ok: omitted.length === 0 && spurious.length === 0 && counts.equal }
}

/** **THE TWO SIDES, READ ONCE AND OFF THE MODULE'S OWN EXPORTS** (`D-53`): the entries through the builder the boot calls, with a
 *  sink that records nothing because this row's subject is the addresses and not the push, and the roots through the projection
 *  the `data.*` surface's declared-tier guard is fed from (`D-101`, `D-219`). **NEITHER LIST IS FILTERED OR SORTED ON ITS WAY IN
 *  — the ADDRESS is projected out of each element and that is all** — so nothing is dropped to make the row green (`D-145`). */
const delivered = createTabsDelivery(() => {}).entries
const published = tabsDeclaredRoots()
const ENTRY_ADDRESSES: readonly (readonly string[])[] = delivered.map((entry) => entry.address)
const ROOT_ADDRESSES: readonly (readonly string[])[] = published.map((root) => root.address)

describe('store-tabs-record · FH-2 — the tab delivery’s entry addresses against the published roots', () => {
  it('FH-2 (a) · SET EQUALITY OF THE TWO ADDRESS LISTS, BOTH DIRECTIONS — no root without an entry, and no entry without a root', () => {
    const verdict = compareTabsEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)
    // ═══ ONE COMPARISON, TWO DIRECTION NAMES, AND NO SECOND READING (`D-292`, `D-53`): one address per side, so a mismatch is
    // named by BOTH subtractions at once — the expectations below are one claim stated both ways round, what a failure is READ
    // by, never evidence of two independent readings; the view row's several addresses are where the directions differ in kind.
    // THE OMISSION DIRECTION: a published root the entry list omits is a write the renderer never hears (`D-137`).
    expect(
      verdict.omitted,
      'a published root with no listener is `D-137`’s never-hears — the entry list and the publication must name the same addresses',
    ).toEqual([])
    // THE SPURIOUS DIRECTION: an entry at an address nothing publishes is a listener the declared-tier guard is never handed,
    // so nothing judges a write at it (`D-101`).
    expect(
      verdict.spurious,
      'an entry at an address no root declares is a listener the declared-tier guard cannot judge — both directions are the claim',
    ).toEqual([])
  })

  it('FH-2 (a) · AND THE COMPARISON IS NOT VACUOUS — both sides carry at least one address, so `a` is not the empty set matching itself', () => {
    // A FLOOR AND NOT THE FIGURE (`D-43`): an emptied publication or an emptied entry list satisfies (a) for free, which is the
    // shape a row takes when it has stopped measuring (`P-3`'s own floor precedent, `D-145`). **THE FLOOR IS 1 ON EACH SIDE HERE,
    // AND THE FLOOR IS WHAT KEEPS (a) NON-DEGENERATE AT 1 × 1**: two emptied lists compare equal, the one way to lose the evidence.
    expect(ENTRY_ADDRESSES.length, 'the delivery builds at least one entry, or (a) compares nothing with nothing').toBeGreaterThan(0)
    expect(ROOT_ADDRESSES.length, 'the publication carries at least one root, or (a) compares nothing with nothing').toBeGreaterThan(0)
  })

  it('FH-2 (b) · MULTIPLICITY — `entries.length` equals `roots.length`, the one relation a `Set` equality cannot see', () => {
    // A DUPLICATE IS KEPT BY THE STORE AND IS INVISIBLE TO (a): two entries at one address collapse into one `Set` member, so the
    // set equality above stands while the delivery registers the same address twice (`guide §6`: duplicates are kept). **AND THIS
    // IS THE ARM THAT READS MULTIPLICITY AT 1 × 1**, which is why (a) and (b) are two arms though every address here is one.
    const verdict = compareTabsEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)
    expect(delivered.length, 'one listener per published root, not two at one address and none at another').toBe(published.length)
    expect(verdict.counts.equal, 'the verdict’s own count arm agrees with the lengths asserted above').toBe(true)
  })

  it('FH-2 (f) · **THE FALSIFIER — THE ROW CAN STILL RED**: the same comparator, driven over deliberately divergent pairs before it is trusted; a row that cannot fail is a deleted row wearing a new name', () => {
    // ═══ EVERY ARM BELOW USES THE ROW'S OWN COMPARATOR. There is no second copy of the logic in this block, which is the
    // point of (f): a control written beside a set assertion proves that the CONTROL can fail, not that the row can.
    const honest = compareTabsEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)

    // (i) THE SAME TWO LISTS COMPARED WITH THEMSELVES ARE ADMITTED — the comparator is not simply always-red, and this is the arm
    //     that keeps (a)'s green honest.
    expect(compareTabsEntriesToRoots(ROOT_ADDRESSES, ROOT_ADDRESSES).ok, 'identical lists are admitted, so the comparator has two arms').toBe(true)
    expect(honest.ok, 'and the delivery as it stands is admitted by the same function the falsifier drives').toBe(true)

    // (ii) AN OMITTED ENTRY REDS THE OMISSION DIRECTION — one root with nothing listening at it, NAMED rather than counted.
    //      **THE PAIR IS THE FALSIFIER'S OWN AND IS NOT CUT OUT OF THE TWO LISTS**, because a drop BY INDEX only reds after
    //      assuming the lists are aligned element for element — the entries' internal order, consumed by nothing and not this
    //      row's to assert (`D-292`) — so that assumption would arrive through the control as the one assertion the design
    //      forbids, green by luck on a re-ordered list and red on an honest one. (vi) drives this relation over the REAL
    //      publication, address by address, and that is where the real lists are made to fail.
    const omittedOne = compareTabsEntriesToRoots([['b'], ['c']], [['a'], ['b'], ['c']])
    expect(omittedOne.ok, 'a delivery missing an entry MUST fail').toBe(false)
    expect(omittedOne.omitted, 'and the missing root is NAMED as a tuple, never merely counted').toEqual([tupleOf(['a'])])
    expect(omittedOne.spurious, 'and nothing is supplied that no root declares, so the direction that reds here is the omission one').toEqual([])

    // (iii) A SPURIOUS ENTRY REDS THE OTHER DIRECTION — a listener at an address no root publishes (`D-101`), appended to the REAL
    //       entry list so the real publication is the thing being failed.
    const spuriousOne = compareTabsEntriesToRoots([...ENTRY_ADDRESSES, ['not-a-declared-root']], ROOT_ADDRESSES)
    expect(spuriousOne.ok, 'an entry at an address no root declares MUST fail').toBe(false)
    expect(spuriousOne.omitted, 'and the direction is the spurious one — no root is missing in this pair').toEqual([])
    expect(spuriousOne.spurious, 'while the undeclared address is NAMED').toEqual([tupleOf(['not-a-declared-root'])])

    // (iv) A DUPLICATE LEAVES THE SETS EQUAL AND REDS THE COUNT — the arm that proves (a) and (b) SEPARATE at every non-zero
    //      cardinality, 1 × 1 included (`D-292`, `guide §6`: duplicates are KEPT).
    const duplicated = compareTabsEntriesToRoots([...ENTRY_ADDRESSES, ENTRY_ADDRESSES[0] as readonly string[]], ROOT_ADDRESSES)
    expect(duplicated.omitted, 'a duplicate hides in the set comparison, exactly as the row says it does').toEqual([])
    expect(duplicated.spurious, 'and it is not a spurious address either — it is multiplicity').toEqual([])
    expect(duplicated.counts.equal, 'so ONLY the count arm can read it').toBe(false)
    expect(duplicated.ok, 'and the verdict as a whole MUST fail').toBe(false)

    // (v) A JOINED COMPARATOR WOULD CALL THIS A MATCH AND THIS ONE DOES NOT — the arm the tuple rule exists for: one segment
    //     carrying a separator against two segments that share its `join('/')` spelling (`D-53`).
    const joinedCollision = compareTabsEntriesToRoots([['a/b']], [['a', 'b']])
    expect(joinedCollision.ok, 'a separator inside a segment is a DIFFERENT address and never a match').toBe(false)
    expect(joinedCollision.omitted, 'the root is missing under the tuple spelling').toEqual([tupleOf(['a', 'b'])])
    expect(joinedCollision.spurious, 'and the entry is spurious under it').toEqual([tupleOf(['a/b'])])

    // (vi) **NO ARM OF THE PUBLICATION MAY BE FILTERED OUT TO MAKE THIS ROW GREEN** — every published root participates: dropping
    //      the entry at its address reds the omission direction and names it. At 1 × 1 this is ONE iteration, and it is still the
    //      arm that proves the publication is COMPARED rather than merely non-empty: a comparison that had excluded a root would
    //      pass this very arm with an empty `omitted`, which is how the exclusion would show. **THE DROP IS BY ADDRESS AND NEVER BY
    //      INDEX**: the entries' internal order is consumed by nothing and is not this row's to assert (`D-292`), so an order-
    //      sensitive harness here would be the one assertion the design forbids arriving through the control.
    ROOT_ADDRESSES.forEach((address) => {
      const withoutIt = compareTabsEntriesToRoots(
        ENTRY_ADDRESSES.filter((entry) => tupleOf(entry) !== tupleOf(address)),
        ROOT_ADDRESSES,
      )
      expect(withoutIt.ok, `dropping the entry at ${tupleOf(address)} MUST fail — every published root is compared`).toBe(false)
      expect(withoutIt.omitted, 'and that root is the one named').toContain(tupleOf(address))
    })
  })
})
