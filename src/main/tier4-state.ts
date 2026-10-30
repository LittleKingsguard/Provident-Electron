// src/main/tier4-state.ts — THE ONE MAIN-SIDE LEAF: tier 4's open/closed boolean as a STATIC
// MODULE-LEVEL HOLDER (`docs/specs/tier4-arbitrary-storage.md` `§0A` item 1 — the architect's
// `A-1` ruling — and `§2.5` item 1 `W-1`).
//
// THE HOLDER **IS** THE VALUE — not a field of `SecurityGate`, not a per-instance copy, not an
// injected thunk — and today it is a PROJECTION AND NOTHING ELSE: the surface module
// (`settings-surface/index.ts`) is its sole writer, at `attach` and on every committed delivery,
// and NO `src/**` FILE READS IT. The built `dist/main/main.mjs` carries `setTier4OpenState` and
// no `tier4OpenState` at all — the reader tree-shaken — so the `F-1`/`A-1` captured-instance
// class stays closed STRUCTURALLY, and a projection with no reader cannot drift a decision.
//
// THE ENFORCEMENT TRUTH IS THE GATE'S OWN RECORD, never this holder: the gate's
// `exclusionState()`, read at each turn by `mcp-server.ts`'s `exclusionTurn(...)` — the one
// shared check the tool closure and the resource callback call — and again at the HTTP POST arm
// before the body is read. That, and not this boolean, is what the enforcing path asks.
//
// ITS DECLARED SURFACE IS TWO NAMES, AND NOTHING ELSE:
//   `tier4OpenState(): boolean` — the ONE total reader. `true` = the store is OPEN (the MCP is
//                                 blocked); it never throws, because the holder always carries a
//                                 value, so there is no absent arm and no fail-safe default. Its
//                                 reader at this head is OUTSIDE `src/` — the unit's own live
//                                 row, `tests/unit/settings-surface/surface.test.ts`.
//   `setTier4OpenState(open)`   — the ONE writer, whose ONLY production caller is the surface.
//
// IT IS A LEAF: it imports NOTHING from `src/**` — in particular NOT `src/shared/**` (which
// would pull the renderer into the main bundle) and not `security.ts` — so the edge
// `settings-surface/index.ts` -> here stays acyclic.
//
// ITS DECLARED INITIAL VALUE IS `STORE-OPEN` (`true`), which is `D-19`'s boot window: the
// surface's `attach` writes the holder from its boot reading BEFORE `await mcp.start()`, so the
// boot-ingestion read is legal with NO exception (`§2.5` item 5 `F-3`).
//
// OWED HERE SO THE FILE AND THE CORPUS AGREE (D-41): the exception's §9, "Carried, not patched"
// (`docs/L1/security-store-storeroom-exception.md`), already owes this header the admission that
// it named the retired `security-store.ts` as the reader and the transition as the writer, both
// false since E-1/E-3. That admission is made at the bytes; the holder's retirement stays PARKED
// (ASM-4, exception §6).
let tier4Open = true

/** The ONE total reader (`§0A` item 1): `true` iff the store is OPEN, i.e. the MCP is blocked. */
export function tier4OpenState(): boolean {
  return tier4Open
}

/** The ONE writer (`§0A` item 1): called ONLY by `settings-surface/index.ts`, at `attach` and on
 *  every committed delivery, from the same reading it feeds the gate's patch — so this projection
 *  and the instance's row are one value and cannot drift. */
export function setTier4OpenState(open: boolean): void {
  tier4Open = open
}
