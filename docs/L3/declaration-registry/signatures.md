# L3 — `declaration-registry`: the signature stubs L4 implements against

- **Layer:** L3 · **Module:** `declaration-registry` · **Unit:** `modularity` (`U2`) · **Branch:** `main` · **Rev:** 2 — **ONE PROJECTION FROM A CARRIER, SO THE TWO REALMS CANNOT SPELL ONE DECLARATION TWO WAYS** (`ASM-DR-4`; `design.md` §2): §2 gains `DeclarationCarrier` and `declarationsOf`, and §3 gains the invariants they carry. **Rev 1 was NEW**: `design.md` rev 1 fixes the structure and `docs/L2/declaration-registry/interface.md` rev 1 the cells; this page fixes the declarations under them (`D-1`, brief §3)
- **Ceiling:** 150 lines, replaced and never appended (D-1, D-2) · **Inputs:** `design.md` §1–§6; `docs/L2/declaration-registry/interface.md` §2–§4; `src/shared/view-shape.ts`, `src/shared/types.ts` (`ModuleCapabilities`, `ModuleListEntry`), `src/renderer/module-client.ts`; `D-306`, `D-129`, `D-105` · **A stub is a DECLARATION and never a body** (D-3)
- **Read order:** §1 the entry and the domains → §2 the construction and the queries → §3 the invariants

## 1. `src/shared/registry/index.ts` — the entry, the domains and the refusal

```ts
/** THE FIVE DOMAINS, CLOSED (`C-4`): a sixth is a corpus change, not a data change. */
export type DeclarationDomain = 'pane' | 'zone' | 'group' | 'tool' | 'placeholder'

/** ONE ID, ONE ENTRY (`S-6`): who declared it, and — where a module did — which module. A domain's MEANING is its
 *  consumer's and never rides here (`C-9`, `S-17`). */
export interface DeclarationEntry {
  readonly id: string
  readonly source: 'foundation' | 'module'
  /** The declaring module's name, present exactly where `source` is `'module'`. */
  readonly origin?: string
}

/** A DECLARATION a module makes, as activation hands it over: one domain and its ids, in the module's own order. */
export interface Declaration {
  readonly module: string
  readonly domain: DeclarationDomain
  readonly ids: readonly string[]
}

/** A DUPLICATE IS A VALUE NAMING ITS ID, never a throw and never an override (`ASM-DR-3`, `D-105`). */
export interface DeclarationRefusal {
  readonly status: 'refused'
  readonly reason: 'declaration-duplicate'
  readonly subject: string
}

/** What the composition answers: the registry, and the refusals the boot must name. */
export interface RegistryComposition {
  readonly registry: DeclarationRegistry
  readonly refused: readonly DeclarationRefusal[]
}
```

## 2. The construction and the five queries

```ts
/** THE FOUNDATION'S FIVE LITERALS, READ AND NEVER DERIVED (`ASM-DR-2`, `C-4`): the registry is handed them at boot so a
 *  gating row can still say FOUNDATION rather than total. */
export interface FoundationDeclarations {
  readonly pane: readonly string[]
  readonly zone: readonly string[]
  readonly group: readonly string[]
  readonly tool: readonly string[]
  readonly placeholder: readonly string[]
}

/** THE COMPOSITION (`S-6`): the foundation's entries in the literal's order, then each module's in the resolver's order
 *  (`C-11`); a duplicate ID is refused BY NAME and the set keeps what it admitted. */
export function createRegistry(foundation: FoundationDeclarations, declarations: readonly Declaration[]): RegistryComposition

export interface DeclarationRegistry {
  /** THE ENTRIES, by domain — the one derivation every query projects (`design.md` §3). */
  entries(domain: DeclarationDomain): readonly DeclarationEntry[]

  /** THE FIVE QUERIES AND THEIR ACCESSORS, one pairing per domain (`C-9`'s table in the L2 page §4). */
  declaredPaneIds(): readonly string[]
  paneEntries(): readonly DeclarationEntry[]
  declaredZoneIds(): readonly string[]
  zoneEntries(): readonly DeclarationEntry[]
  declaredGroups(): readonly string[]
  groupEntries(): readonly DeclarationEntry[]
  declaredTools(): readonly string[]
  toolEntries(): readonly DeclarationEntry[]
  declaredPlaceholders(): readonly string[]
  placeholderEntries(): readonly DeclarationEntry[]
}
```

**The projection both realms use** (`ASM-DR-4`, `design.md` §2)

```ts
/** A CARRIER'S DECLARATION SURFACE, AS BOTH REALMS HOLD IT: main's is the activated manifest, the renderer's is the
 *  `ModuleListEntry` row (`src/shared/types.ts:261`) — the SAME member of the SAME shared type, which is why the two
 *  realms need no second route (`D-18`). **The members are the five domains and `tools` is the one that already
 *  stands**: `panes`, `zones`, `groups` and `placeholders` are `S-8`'s and `U5`'s to add to `ModuleCapabilities`, in
 *  that seat's own page, and this page declares the shape they must satisfy and never the edit (`D-301`, `D-302`). */
export interface DeclarationCarrier {
  readonly name: string
  readonly capabilities: ModuleCapabilities
}

/** ONE PROJECTION, so the two realms cannot spell one declaration two ways (`D-129`): each present domain becomes one
 *  `Declaration`, ids only, in the carrier's own order. A domain the carrier omits yields NO declaration — never an
 *  empty one — so a consumer cannot read "declared nothing" as "declared an empty set" (`C-9`). */
export function declarationsOf(carrier: DeclarationCarrier): readonly Declaration[]
```

## 3. The invariants a stub reader must not lose

- **The foundation's answer is its literal's answer**: an empty declaration set answers `DECLARED_PANE_IDS` element for element (`ASM-DR-2`).
- **A duplicate is refused with its id as subject; the set is never halved and never overridden** (`ASM-DR-3`, `D-105`).
- **A query is its accessor's projection** — `declaredPaneIds()` is `paneEntries().map(entry => entry.id)` and the same for the other four; a query that re-derived the ids would be a second authority (`design.md` §3).
- **Every query is total over the composed set and answers `[]` for a domain with no entries** — never `undefined`, so a consumer's iteration needs no guard (`C-9`).
- **The order is stable and nothing re-sorts after construction** (`S-6`, `S-15`).
- **No domain type of a consumer's rides an entry** — no geometry, no figure, no label (`C-9`, `S-17`).
- **The projection re-spells no member of the carrier**: `declarationsOf` reads `ModuleCapabilities` from `src/shared/types.ts` — the shared type both realms already hold — and a domain it omits yields no declaration rather than an empty one (`ASM-DR-4`).
- **Neither realm hands the other a composed set**: both call `createRegistry` with their own foundation input and this projection (`design.md` §2, `ASM-DR-4`).
- **No `src/**` byte is declared here**: the registry's L4 is owed, and `OWED-4` fixes it to land with `S-7`…`S-10`/`S-18` (`D-3`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "declaration-registry", "writes": [{"path": "docs/L3/declaration-registry/signatures.md", "d": "D-306", "why": "this page, rev 2 — the one projection both realms use (DeclarationCarrier and declarationsOf), the four ModuleCapabilities members left to S-8 and U5 with the shape they must satisfy, and the invariants the two constructions carry; no src byte"}]}
```
