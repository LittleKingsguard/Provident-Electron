# L3 — `module-system`: the pane declaration's signature stubs

- **Layer:** L3 · **Module:** `module-system` · **Unit:** `modularity` (`U5`'s `S-17`) · **Branch:** `main` · **Rev:** 1 — **NEW**: `pane-declaration.md` rev 1 fixes the structure; this page fixes the declarations under it, and the split is the ceiling's (`design.md` 148/150, `signatures.md` 149/150; `D-1`, `D-2`)
- **Inputs:** `pane-declaration.md` §2–§3; `docs/L3/module-system/signatures.md`'s `ModuleCapabilities` and `ActionRecord`; `src/main/mcp-server.ts`'s `parseCapabilities` (`:331-369`) and `groupsOf` (`:349-360`); `src/shared/types.ts`'s `ModuleListenerDeclaration` (`:211-215`)
- **Read order:** §1 the declaration → §2 the parse → §3 the invariants

## 1. `src/shared/types.ts` — the member, and it is `ipc-contract`'s file

```ts
/** ONE PANE A MODULE DECLARES (`S-17`, `C-9`): `C-9`'s FIVE NOUNS as the pane API's, and TWO ARRAYS OF `S-1`
 *  DECLARATIONS PLACED ON IT (`C-5`). **THE NODE ID IS NOT A MEMBER** — `renderer-wiring`'s map answers it (`S-18`), and
 *  the operand that makes a module pane answerable is the container's authored `props.pane = paneId`
 *  (`src/shared/demo-envelope.ts:951`; `installPaneCollapse` already reads it at press time). */
export interface PaneDeclaration {
  /** The DECLARED RECORD ID: `['panes', paneId]`'s key, and the id `S-7`'s family is total over. A foundation id is the
   *  registry's own `declaration-duplicate`, refused by name there and never here (`S-6`). */
  readonly paneId: string
  /** The GEOMETRY SOURCE's zone: one of the foundation's four, or a registry-declared zone id, validated AT ADMISSION
   *  (`ASM-PD-3`). **ABSENT IS THE STAGE** (`C-9`'s absence rule) — the pane behaves as a sidebar pane and no zone fixes
   *  an axis. */
  readonly zone?: string
  /** The axis defaults, used ONLY by a creation with no stored record; a stated member is never rewritten (`S-7`, `D-105`).
   *  Absent means the family's own default, never `0`. */
  readonly width?: number
  readonly height?: number
  /** The authored HEAD row's node id (`PANE_HEAD_IDS`' value one node over) — a NODE ID the module's contribution mints,
   *  never a subtree (`ASM-PD-1`, `S-15`). */
  readonly head: string
  /** The authored SCROLL BODY's node id (`PANE_BODY_IDS`' value; `D-243`, `D-270`). A node id, same rule. */
  readonly body: string
  /** ONE ADDRESS-KEYED PAIR per element, at an address UNDER this pane's id — the store's own declaration shape, adopted
   *  and restated nowhere (`S-19`'s point). Refused where it would own a foundation root or another author's address. */
  readonly constraints?: readonly PaneConstraintDeclaration[]
  /** `ModuleListenerDeclaration` at an address under the pane's id: `{address, main?, client?}`, its owner the module
   *  (`C-5`). **A SUBSCRIBER IS NOT AN OWNER** — at a crossing's own address a listener adds no registration and no inverse. */
  readonly listeners?: readonly ModuleListenerDeclaration[]
}

/** The store's constraint pair, by reference and not by a second spelling: the ONE construction adopts a list of these
 *  (`src/main/main.ts`'s `createProfileStore` batch). A pane's `constraints[]` element IS one of these, scoped by `C-5`. */
export interface PaneConstraintDeclaration {
  readonly address: readonly (string | number)[]
  readonly id: string
  readonly constraint: unknown
}

export interface ModuleCapabilities {
  // … `tools`, `hooks`, `transforms`, `listeners`, `groups` unmoved …
  /** The pane domain's module half (`S-17`): one entry per pane the module declares, `C-9`'s five nouns plus the two placed
   *  arrays. **`S-17`'s owed member**: before it, `declarationsOf` read this shape structurally and no parse kept it. */
  readonly panes?: readonly PaneDeclaration[]
}
```

## 2. `src/main/mcp-server.ts` — the parse, built exactly as `groupsOf` is

```ts
/** THE FIVE REFUSALS, EACH A VALUE WITH A SUBJECT (`D-105`, `pane-declaration.md` §3): **THE FIRST FOUR STAND IN THE PARSE
 *  and the fifth needs the registry, so it stands at ADMISSION** — the same split `D-323` records for the operator record,
 *  because the domain can only be asked where it exists. */
export type PaneDeclarationRefusal =
  | { readonly status: 'refused'; readonly reason: 'pane-undeclared-id' | 'pane-unheaded' | 'pane-unbodied'; readonly subject: string }
  | { readonly status: 'refused'; readonly reason: 'pane-zone-unknown' | 'pane-placed-address-owned'; readonly subject: string }

/** `parseCapabilities`'s pane arm (`pane-declaration.md` §3, `ASM-PD-4`): each entry kept only where `paneId`/`head`/`body`
 *  are non-empty strings, the two placed arrays kept only where they are arrays of that shape, and **A MALFORMED ENTRY IS
 *  DROPPED AND NAMED, NEVER COERCED AND NEVER THE WHOLE MODULE REFUSED**. It reuses the `groupsOf` shape two lines above it
 *  rather than inventing a second admission idiom (`D-129`). */
export function panesOf(raw: unknown): { readonly panes: readonly PaneDeclaration[]; readonly refused: readonly PaneDeclarationRefusal[] }
```

- **THE RETURN'S ONE LINE IS THE WHOLE EDIT AT THIS SITE** (`mcp-server.ts:361-368`): the object literal gains `...(panes.length > 0 ? { panes } : {})`, so a module with no pane yields **no member** and not an empty array — the distinction `declarationsOf` already keeps (`C-9`'s "declared nothing" versus "declared an empty set").
- **THE OTHER TWO STRUCTURAL READS DROP TO THE TYPED MEMBER IN THE SAME PASS** (`C-4`'s widening rule): `src/shared/registry/index.ts`'s `DomainCapabilities.panes?` is deleted, so no consumer reads a member the contract now types.

## 3. The invariants a stub reader must not lose

- **No node id member and no identity rule**: the container is found by `props.pane`, the foundation's ids stay spelled in the five tables and a module's are found (`ASM-PD-2`, `PM-2` unmoved).
- **No composition here**: the declaration names `head`/`body`; the module's contribution mints them (`S-15`), and this file composes no node (`C-6`).
- **No foundation id, no zone list restated**: a foundation pane id is the registry's refusal; the zone set is `declaredZoneIds()`, read at admission, never a literal in this file.
- **No defaulted `head`/`body` and no coerced figure**: a declaration missing either is dropped by name; `width`/`height` absent mean the family's default and never `0`.
- **No second refusal**: a duplicate id, a foundation collision and the set's own admission are `S-6`'s, named once.

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "module-system", "writes": [{"path": "docs/L3/module-system/pane-declaration-signatures.md", "d": "D-306", "why": "this page, rev 1 NEW — S-17's stubs split at the ceiling: `PaneDeclaration` and `PaneConstraintDeclaration` with the member that is typed and the node id that deliberately is not, `ModuleCapabilities.panes`, the five named refusals with the parse/admission split, `panesOf` built on `groupsOf`'s own shape, and the five invariants; no src byte"}]}
```
