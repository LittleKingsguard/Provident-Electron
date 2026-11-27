# L3 — `secure-panels`: the roster's and the placeholders' signature stubs — the projection, the pinned set, and the constructor's delta

- **Layer:** L3 · **Module:** `secure-panels` · **Unit:** `modularity` (`U2`'s `S-10`) · **Branch:** `main` · **Rev:** 1 — **NEW**: `roster-and-placeholders.md` rev 1 fixes the structure; this page fixes the declarations under it, and the split is the ceiling's (`design.md` and `docs/L2/secure-panels/interface.md` each 150/150; `D-1`, `D-2`, `AN-15`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **A stub is a DECLARATION and never a body** (D-3) · **Citations:** a site, never an offset (D-41)
- **Inputs:** `roster-and-placeholders.md` §1–§8; `docs/L3/declaration-registry/signatures.md` §1–§2 (`DeclarationRegistry`, `DeclarationCarrier`); `docs/L3/mcp-surface/group-domain.md` §2–§3; `src/renderer/secure-panels.ts`, `src/renderer/renderer.ts:2048`, `src/shared/types.ts` by site · **Read order:** §1 the roster → §2 the placeholders → §3 the class and the retired names → §4 the shared member → §5 the invariants

## 1. `src/renderer/secure-panels.ts` — the roster's row and its projection

```ts
/** ONE AUTHORED TOGGLE ROW'S DATUM (`roster-and-placeholders.md` §2, §3): the id the registry declares and the label its
 *  DECLARER wrote — the foundation's pair for a foundation group, the declaring module's `capabilities.groups[].label`
 *  for a module's. A label is never derived from an id and never defaulted (`C-9`). */
export interface GroupRow {
  readonly id: string
  readonly label: string
}

/** THE ROSTER (`ASM-SP-1`, `ASM-SP-2`): `declaredGroups()` in the REGISTRY's order — foundation first, then the
 *  registration order — each id labelled by the declarer that owns it. **A DECLARED GROUP WITH NO LABEL IS A REFUSAL
 *  NAMING THE ID** (`{status:'refused', reason:'declaration-unlabelled', subject: id}` — this page's OWN reason and not
 *  a `RefusalName` member, because no admission is being made), never a row painted `undefined`
 *  and never a silent skip; the caller names it beside the boot's other refusals (`D-105`). */
export function groupRoster(
  registry: DeclarationRegistry,
  carriers: readonly DeclarationCarrier[],
): { readonly rows: readonly GroupRow[]; readonly refused: readonly { readonly status: 'refused'; readonly reason: 'declaration-unlabelled'; readonly subject: string }[] }
```

## 2. The placeholders and the envelope

```ts
/** THE FIFTH DOMAIN'S FOUNDATION CONTRIBUTION (`C-4`, `S-10`, `ASM-SP-3`): the overlay's four authored live regions,
 *  CLOSED here because the envelope authors them and no set pins them. A fifth is a foundation edit — the one-time
 *  change taken once (ruling (a)) — never a widened set. `renderer.ts` hands this list to the renderer's registry as
 *  `FoundationDeclarations.placeholder` (`S-18`'s coupled site). */
export const PLACEHOLDER_IDS: readonly ['security-status', 'status', 'module-status', 'module-list']

/** THE ENVELOPE (`ASM-SP-1`): one `label` node per roster row — `id: 'toggle:<id>'`, `data-group: <id>`,
 *  `data-on: 'false'`, `content: row.label`, the `toggle-<id>` handler — and the four placeholder containers it authors
 *  are exactly `PLACEHOLDER_IDS` (`C-8`, `D-113`). **It is still built ONCE, at construction**, and an EMPTY roster
 *  authors no toggle row; the region nodes and the handler bodies are unmoved. */
function paneEnvelope(roster: readonly GroupRow[]): LegacyInitialData
```

## 3. `SecurePanels` — the constructor's delta, and the names that retire

```ts
export class SecurePanels {
  /** THE ONE DELTA (`roster-and-placeholders.md` §2): two optional members, so the landed call shape —
   *  `new SecurePanels(panesMount, { maxJournalLength })` — still compiles and authors NO toggle row. **An absent
   *  registry is an EMPTY roster and never a second source** (`ASM-1`'s posture); `renderer.ts:2048` is the ONE site
   *  that passes them (`S-18`'s declared write). The roster is `groupRoster(registry, carriers)` here, ONCE. */
  constructor(
    mount: HTMLElement,
    opts?: {
      maxJournalLength?: number
      registry?: DeclarationRegistry
      carriers?: readonly DeclarationCarrier[]
    },
  )
  /** UNMOVED, AND SAID SO BECAUSE THE ROSTER'S PAINT READS IT: every other member — `debugText`, `journalDepth`,
   *  `dispatch`, `applyPaneMutation`, `refreshDebug`, `refresh`, `applySecurity`, `applyAppState` — keeps its signature
   *  and its behaviour. `syncConfig`'s `toggle:<g>` arm finds `g` in the roster's rows and paints the ROW's label; the
   *  `data-group`/`data-on` writes and the `enabled.includes(g)` read are unchanged in shape. */
}
```

- **RETIRED, BY NAME, IN THE SAME EDIT**: `GROUP_LABELS: Record<ToolGroup, string>` and `GROUPS: readonly ToolGroup[]` are deleted whole, and with them the type-only `ToolGroup` specifier on the import from `../main/security.js` (the `EXCLUSION_STATE` specifier stays). **`docs/L3/secure-panels/signatures.md` §1 still declares the pair as the pane-drag pass left it**; this page declares what `S-10` makes of it, and neither page restates the other (`D-46`, `D-152`).
- **No exported name is added to the module's published surface beyond the three this page declares** — `GroupRow`, `groupRoster` and `PLACEHOLDER_IDS` — and `paneEnvelope` stays module-private (`D-14`).

## 4. `src/shared/types.ts` — the foundation's ids and labels, and they are `ipc-contract`'s

- **This section is a CROSS-SEAT declaration and not this page's write** (`roster-and-placeholders.md` §3, §8; `OWED-9`'s precedent): the file is `ipc-contract`'s, and this is `S-8`'s shared member RE-GRAINED, not a second list.

```ts
/** THE FOUNDATION'S GROUP DOMAIN (`C-4`, `ASM-SP-2`): the six ids WITH the labels their owner authored, in roster order.
 *  The label rides the foundation's contribution because a label is its declarer's (`C-9`) and because `secure-panels`
 *  may not spell the six ids again (`S-8` §5). **The six ids are spelled ONCE, here.** */
export const FOUNDATION_GROUPS: readonly [
  { readonly id: 'read'; readonly label: string },
  { readonly id: 'dispatch'; readonly label: string },
  { readonly id: 'graph'; readonly label: string },
  { readonly id: 'code'; readonly label: string },
  { readonly id: 'module'; readonly label: string },
  { readonly id: 'data'; readonly label: string },
]

/** `S-8`'s member, unmoved in membership, order and use, and now its source's projection: the gate's rule, the patch
 *  validator and the renderer's group domain all read the same six ids. No second spelling exists. */
export const TOOL_GROUP_IDS: readonly string[]
```

## 5. What L4 must not type, and the invariants the stubs carry

- **No table**: no `Record<string, string>` label map, no `GROUPS`-equivalent projection and no foundation label literal in `secure-panels.ts` — the labels are `FOUNDATION_GROUPS`' and the declarations', and the roster is `groupRoster`'s (`ASM-SP-2`).
- **No second construction**: `groupRoster` takes an instance; it constructs nothing, and `SecurePanels` never builds a registry (`ASM-DR-4`).
- **No defaulted label**: a declared group with no label is a refusal naming the id; a row whose label is `''` after trim is the same refusal, because an empty label is no label (`D-105`).
- **No open placeholder set**: `PLACEHOLDER_IDS` is a closed tuple; a fifth id is a foundation edit, not a push.
- **No re-translation**: `paneEnvelope` is called once, in the constructor; `groupRoster` runs there and nowhere else (`docs/L2/secure-panels/interface.md` §1's measured reason).
- **No body on this page and no literal beyond the four placeholder ids and the six ids** — the labels are authored text at the landing, and this page marks them `string` (`D-41`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "secure-panels", "writes": [{"path": "docs/L3/secure-panels/roster-and-placeholders-signatures.md", "d": "D-306", "why": "this page, rev 1 NEW — S-10's stubs split at the ceiling: `GroupRow` and `groupRoster` (the registry's set with the declarers' labels, an unlabelled group a named refusal), the closed `PLACEHOLDER_IDS` tuple and `paneEnvelope(roster)`, the constructor's two optional members with the landed call shape unmoved, `GROUP_LABELS`/`GROUPS` retired by name, `FOUNDATION_GROUPS`/`TOOL_GROUP_IDS` as ipc-contract's re-grain, and the five invariants; no src byte"}]}
```
