// src/main/tier4-state.ts — THE ONE MAIN-SIDE LEAF: tier 4's open/closed boolean as a STATIC
// MODULE-LEVEL HOLDER (`docs/specs/tier4-arbitrary-storage.md` `§0A` item 1 — the architect's
// `A-1` ruling — and `§2.5` item 1 `W-1`).
//
// THE HOLDER **IS** THE VALUE. It is not a field of `SecurityGate`, not a per-instance copy and not
// an injected thunk: `security-store.ts` reads it DIRECTLY at each call's own turn, `main.ts`'s
// carrier composes both of its additive members from the same holder, and `mcp-server.ts` reads it
// for the transition — so the gate (the ENFORCEMENT path) and this holder (the store's consult and
// the carrier) cannot disagree, and the `F-1`/`A-1` captured-instance class is closed STRUCTURALLY,
// because there is no instance left to capture.
//
// ITS DECLARED SURFACE IS TWO NAMES, AND NOTHING ELSE:
//   `tier4OpenState(): boolean` — the ONE total reader. `true` = the store is OPEN (the MCP is
//                                 blocked). It never throws: the holder always carries a value,
//                                 so there is no absent arm and no fail-safe default.
//   `setTier4OpenState(open)`   — the ONE writer, whose ONLY production caller is the TRANSITION
//                                 (`mcp-server.ts`'s `applyExclusion`, `§2.5` item 2), which writes
//                                 it FROM the very input it hands `withExclusion`, in the same turn.
//
// IT IS A LEAF: it imports NOTHING from `src/**` — in particular NOT `src/shared/**` (which would
// pull the renderer into the main bundle) and not `security.ts` — so the edge
// `security.ts`/`mcp-server.ts` -> here stays acyclic.
//
// ITS DECLARED INITIAL VALUE IS `STORE-OPEN` (`true`), which is `D-19`'s boot window: a bare
// `createSecurityStore({ path })` reads the static value and therefore behaves EXACTLY as before —
// the boot-ingestion read is legal with NO exception (`§2.5` item 5 `F-3`), and the flip to
// store-closed lands at `applyExclusion('mcp-enabled')`, BEFORE `await mcp.start()`.
let tier4Open = true

/** The ONE total reader (`§0A` item 1): `true` iff the store is OPEN, i.e. the MCP is blocked. */
export function tier4OpenState(): boolean {
  return tier4Open
}

/** The ONE writer (`§0A` item 1): called ONLY by the transition, from the input it hands
 *  `withExclusion`, so the enforcement path and this holder are one value and cannot drift. */
export function setTier4OpenState(open: boolean): void {
  tier4Open = open
}
