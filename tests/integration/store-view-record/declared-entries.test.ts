// tests/integration/store-view-record/declared-entries.test.ts — `FH-1`: THE DELIVERY'S ENTRY ADDRESSES AGAINST THE
// PUBLISHED ROOTS, for `store-view-record`.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// WHAT WAS UNMEASURED, AND WHAT IS HONESTLY NEW HERE. The listener list is HAND-SPELLED beside the published roots —
// `VIEW_DECLARED_ADDRESSES` in `src/main/view-record/index.ts`'s delivery block, against the same address constants
// `viewDeclaredRoots()` publishes — and NO ROW COMPARES THE TWO, so a root the entry array omits is `D-137`'s *"a write the
// renderer NEVER HEARS"* with no evidence of it (`D-292`, `strata/records/family-helper-intake.md` row 7). **BUT THE GROUND
// IS NARROWER THAN "NOTHING MEASURES THIS", AND SAYING SO IS PART OF THE ROW**: each entry is ALREADY witnessed per family
// by a row that reds if it is dropped (`['panes']` and `['zones']` by `crossing.test.ts`'s delivery count, `['theme']` by
// `theme-family.test.ts`, `['drag']` by the `pane-drag-temp` leg's `P-3`), so the OMISSION direction is witnessed one family
// at a time. What no row reads is **the SET** — the SPURIOUS direction (an entry at an address no root declares, which the
// tier guard cannot judge, `D-101`), the duplicate AT THE UNPAIRED ROOT (whose `P-3` asserts a floor and not a count), and
// the set's CLOSURE over a family added later. That is this row's subject and not the first evidence of any delivery
// (`D-292`, `D-53`).
//
// HOW BOTH SIDES ARE REACHED, AND WHY NEITHER IS RE-SPELLED. `VIEW_DECLARED_ADDRESSES` is MODULE-PRIVATE, so this row cannot
// restate the listener list even by accident: the entries are read off the exported builder (`createViewDelivery(sink).entries`)
// and the roots off the exported projection (`viewDeclaredRoots()`), and NEITHER SIDE carries an address this row supplies.
// **THE FALSIFIER'S PAIRS ARE ITS OWN AND THAT LICENSES NO SECOND READING**: `(ii)` and `(v)` spell pairs for the divergence
// they must produce, while `(iii)`, `(iv)` and `(vi)` drive the REAL lists — and **`(vi)` is the arm that makes them fail
// address by address, so it is the arm no later pass may drop as redundant** (`D-292`, `D-3`). The two sides
// therefore read the same constants today, which is what makes this an INDEPENDENCE CENSUS and not an agreement proof: it
// reds when a constant is dropped from or duplicated in EITHER list, and it CANNOT catch a wrong address spelled in both
// (`D-53`, `D-292`, `D-137`).
//
// WHAT THIS ROW MUST NOT ASSERT, EACH WITH THE ROW THAT OWNS THE FACT (`D-43`): NOT a declaration for every root — `['drag']`
// has a root, an entry and NO declaration by ruling, and `declaration ↔ root` is `central-data`'s
// `tests/integration/central-data/declared-root.test.ts` (`D-145`, `D-132`, `D-101`); NOT a count, a tier, an id or the
// unpaired root's literal — the published total and the published set are that same row's; NOT the entries' ORDER, which no
// consumer reads, and not the two DELIVERIES' relative boot order, which is the construction's own; NOT a handle's spelling,
// which is a module counter (`D-71`); NOT the element SHAPE — a three-member `cfg` element is the PACKAGE's to accept or
// refuse, before any filesystem act, and a copy of that reading here would be a second measurement of an existing one
// (`D-53`, `D-5`); and NOT a store, a boot, a subscription or a write — both builders run no store verb (`D-219`).
import { describe, expect, it } from 'vitest'

import { createViewDelivery, viewDeclaredRoots } from '../../../src/main/view-record'

/**
 * **ONE ADDRESS AS A COMPARABLE TUPLE — AND NEVER `join('/')`** (`D-53`, `D-292`). The store's address space is a tuple of
 * segments, so `['a/b']` and `['a', 'b']` are two DIFFERENT addresses that share one joined spelling; a comparator that
 * joined would call a spurious entry a match and this row would pass over the very defect it exists for. `JSON.stringify`
 * of the ARRAY is the tuple's own spelling, quoted so a nested segment cannot alias.
 */
const tupleOf = (address: readonly string[]): string => JSON.stringify([...address])

/** **THE VERDICT — BOTH DIRECTIONS AND THE COUNT, FROM ONE FUNCTION** (`D-3`, `D-292`). Every arm of this row, and every
 *  control under (f), reads THIS object: the row carries no set assertion of its own and the falsifier carries no copy of
 *  one, which is the only shape in which a control can prove the row it controls. */
interface EntriesRootsVerdict {
  /** A root with NO entry — `D-137`'s never-hears, the omission direction. */
  readonly omitted: readonly string[]
  /** An entry with NO published root — an address this module declares that nothing publishes, which the tier guard is
   *  never handed and therefore cannot judge (`D-101`). */
  readonly spurious: readonly string[]
  /** MULTIPLICITY — the one relation a `Set` cannot see, and the one the store does not refuse (`guide §6`). */
  readonly counts: { readonly entries: number; readonly roots: number; readonly equal: boolean }
  /** `true` only when the two directions are empty AND the counts agree. */
  readonly ok: boolean
}

/** **`entries ↔ roots`, AS A SET EQUALITY IN BOTH DIRECTIONS PLUS A COUNT** — one function, so the row and its falsifier
 *  cannot drift. The two subtractions ARE the both-directions claim: `omitted` is roots minus entries and `spurious` is
 *  entries minus roots, and neither can be satisfied by the other (`D-292`, `D-53`). */
function compareEntriesToRoots(
  entryAddresses: readonly (readonly string[])[],
  rootAddresses: readonly (readonly string[])[],
): EntriesRootsVerdict {
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

/** **THE TWO SIDES, READ ONCE AND OFF THE MODULE'S OWN EXPORTS** (`D-53`): the entries through the builder the boot calls,
 *  with a sink that records nothing because this row's subject is the addresses and not the push, and the roots through the
 *  projection the `data.*` surface's declared-tier guard is fed from (`D-101`, `D-219`). **NEITHER LIST IS FILTERED OR
 *  SORTED ON ITS WAY IN — the ADDRESS is projected out of each element and that is all** — the unpaired root compared with
 *  the rest precisely because it is the one a row could be tempted to exclude to make itself green (`D-145`, `D-292`). */
const delivered = createViewDelivery(() => {}).entries
const published = viewDeclaredRoots()
const ENTRY_ADDRESSES: readonly (readonly string[])[] = delivered.map((entry) => entry.address)
const ROOT_ADDRESSES: readonly (readonly string[])[] = published.map((root) => root.address)

describe('store-view-record · FH-1 — the delivery’s entry addresses against the published roots', () => {
  it('FH-1 (a) · SET EQUALITY OF THE TWO ADDRESS LISTS, BOTH DIRECTIONS — no root without an entry, and no entry without a root', () => {
    const verdict = compareEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)
    // THE OMISSION DIRECTION: a root the entry array omits is a write the renderer never hears (`D-137`).
    expect(
      verdict.omitted,
      'a published root with no listener is `D-137`’s never-hears — the entry array and the publication must name the same set',
    ).toEqual([])
    // THE SPURIOUS DIRECTION: an entry at an address nothing publishes is a listener the tier guard is never handed, so
    // nothing judges a write at it (`D-101`).
    expect(
      verdict.spurious,
      'an entry at an address no root declares is a listener the declared-tier guard cannot judge — both directions are the claim',
    ).toEqual([])
  })

  it('FH-1 (a) · AND THE COMPARISON IS NOT VACUOUS — both sides carry at least one address, so `a` is not the empty set matching itself', () => {
    // A FLOOR AND NOT THE FIGURE (`D-43`): HOW MANY roots there are is `declared-root.test.ts`'s to hold, and this row
    // derives every figure it reads. What it refuses is the degenerate reading — an emptied publication or an emptied
    // array would satisfy (a) for free, and that is the shape a row takes when it has stopped measuring (`P-3`'s own
    // floor precedent, `D-145`).
    expect(ENTRY_ADDRESSES.length, 'the delivery builds at least one entry, or (a) compares nothing with nothing').toBeGreaterThan(0)
    expect(ROOT_ADDRESSES.length, 'the publication carries at least one root, or (a) compares nothing with nothing').toBeGreaterThan(0)
  })

  it('FH-1 (b) · MULTIPLICITY — `entries.length` equals `roots.length`, the one relation a `Set` equality cannot see', () => {
    // A DUPLICATE IS KEPT BY THE STORE AND IS INVISIBLE TO (a): two entries at one address collapse to one `Set` member, so
    // the set equality above stands while the delivery registers the same address twice. The count is what reads it
    // (`guide §6`: duplicates are kept, not refused).
    const verdict = compareEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)
    expect(delivered.length, 'one listener per published root, not two at one address and none at another').toBe(published.length)
    expect(verdict.counts.equal, 'the verdict’s own count arm agrees with the lengths asserted above').toBe(true)
  })

  it('FH-1 (f) · **THE FALSIFIER — THE ROW CAN STILL RED**: the same comparator, driven over deliberately divergent pairs before it is trusted; a re-homed row that cannot fail is a deleted row wearing a new name', () => {
    // ═══ EVERY ARM BELOW USES THE ROW'S OWN COMPARATOR. There is no second copy of the logic in this block, which is the
    // point of (f): a control written beside a set assertion proves that the CONTROL can fail, not that the row can.
    const honest = compareEntriesToRoots(ENTRY_ADDRESSES, ROOT_ADDRESSES)

    // (i) THE SAME TWO LISTS COMPARED WITH THEMSELVES ARE ADMITTED — the comparator is not simply always-red, and this is
    //     the arm that keeps (a)'s green honest.
    expect(compareEntriesToRoots(ROOT_ADDRESSES, ROOT_ADDRESSES).ok, 'identical lists are admitted, so the comparator has two arms').toBe(true)
    expect(honest.ok, 'and the delivery as it stands is admitted by the same function the falsifier drives').toBe(true)

    // (ii) AN OMITTED ENTRY REDS THE OMISSION DIRECTION — one root with nothing listening at it, NAMED rather than counted.
    //      **THE PAIR IS THE FALSIFIER'S OWN AND IS NOT CUT OUT OF THE TWO LISTS**, because a drop BY INDEX only reds after
    //      assuming the lists are aligned element for element — the entries' internal order, consumed by nothing and not
    //      this row's to assert (`D-292`) — so that assumption would arrive through the control as the one assertion the
    //      design forbids, green by luck on a re-ordered listener array and red on an honest one. (vi) below drives this
    //      same relation over the REAL publication, address by address, and that is where the real lists are made to fail.
    const omittedOne = compareEntriesToRoots([['b'], ['c']], [['a'], ['b'], ['c']])
    expect(omittedOne.ok, 'a delivery missing an entry MUST fail').toBe(false)
    expect(omittedOne.omitted, 'and the missing root is NAMED as a tuple, never merely counted').toEqual([tupleOf(['a'])])
    expect(omittedOne.spurious, 'and nothing is supplied that no root declares, so the direction that reds here is the omission one').toEqual([])

    // (iii) A SPURIOUS ENTRY REDS THE OTHER DIRECTION — a listener at an address no root publishes (`D-101`).
    const extra = [...ENTRY_ADDRESSES, ['not-a-declared-root']]
    const spuriousOne = compareEntriesToRoots(extra, ROOT_ADDRESSES)
    expect(spuriousOne.ok, 'an entry at an address no root declares MUST fail').toBe(false)
    expect(spuriousOne.omitted, 'and the direction is the spurious one — no root is missing in this pair').toEqual([])
    expect(spuriousOne.spurious, 'while the undeclared address is NAMED').toEqual([tupleOf(['not-a-declared-root'])])

    // (iv) A DUPLICATE LEAVES THE SETS EQUAL AND REDS THE COUNT — which is why (a) and (b) are two arms and not one, at
    //      EVERY non-zero cardinality (`D-292`, `guide §6`: duplicates are KEPT).
    const duplicated = [...ENTRY_ADDRESSES, ENTRY_ADDRESSES[0] as readonly string[]]
    const duplicatedVerdict = compareEntriesToRoots(duplicated, ROOT_ADDRESSES)
    expect(duplicatedVerdict.omitted, 'a duplicate hides in the set comparison, exactly as the row says it does').toEqual([])
    expect(duplicatedVerdict.spurious, 'and it is not a spurious address either — it is multiplicity').toEqual([])
    expect(duplicatedVerdict.counts.equal, 'so ONLY the count arm can read it').toBe(false)
    expect(duplicatedVerdict.ok, 'and the verdict as a whole MUST fail').toBe(false)

    // (v) A JOINED COMPARATOR WOULD CALL THIS A MATCH AND THIS ONE DOES NOT — the arm the tuple rule exists for: one segment
    //     carrying a separator against two segments that share its `join('/')` spelling (`D-53`).
    const joinedCollision = compareEntriesToRoots([['a/b']], [['a', 'b']])
    expect(joinedCollision.ok, 'a separator inside a segment is a DIFFERENT address and never a match').toBe(false)
    expect(joinedCollision.omitted, 'the root is missing under the tuple spelling').toEqual([tupleOf(['a', 'b'])])
    expect(joinedCollision.spurious, 'and the entry is spurious under it').toEqual([tupleOf(['a/b'])])

    // (vi) **NO ARM OF THE PUBLICATION MAY BE FILTERED OUT TO MAKE THIS ROW GREEN** — every published root participates:
    //      dropping its entry reds the omission direction, the unpaired one included (`D-145`). A comparison that had
    //      excluded a root would pass this very arm with an empty `omitted`, which is how the exclusion would show.
    //      **THE DROP IS BY ADDRESS AND NEVER BY INDEX**: the entries' internal order is consumed by nothing and is not this
    //      row's to assert (`D-292`), so an order-sensitive harness here would be the one assertion the design forbids
    //      arriving through the control.
    ROOT_ADDRESSES.forEach((address) => {
      const withoutIt = compareEntriesToRoots(
        ENTRY_ADDRESSES.filter((entry) => tupleOf(entry) !== tupleOf(address)),
        ROOT_ADDRESSES,
      )
      expect(withoutIt.ok, `dropping the entry at ${tupleOf(address)} MUST fail — every published root is compared`).toBe(false)
      expect(withoutIt.omitted, 'and that root is the one named').toContain(tupleOf(address))
    })
  })
})
