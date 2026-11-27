# L3 — `mcp-surface`: the group domain's signature stubs — the rule, its default, its composition, and the two cross-seat members

- **Layer:** L3 · **Module:** `mcp-surface` · **Unit:** `modularity` (`U2`'s `S-8`) · **Branch:** `main` · **Rev:** 1 — **NEW**: `group-domain.md` rev 1 fixes the structure; this page fixes the declarations under it, and the split is the ceiling's (`design.md` 142/150, `signatures.md` 150/150; `D-1`, `D-2`, `AN-15`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **A stub is a DECLARATION and never a body** (D-3) · **Citations:** a site, never an offset (D-41)
- **Inputs:** `group-domain.md` §1–§8; `docs/L2/mcp-surface/interface.md` §10; `docs/L2/declaration-registry/interface.md` §4; `docs/L3/declaration-registry/signatures.md` §2 (`DeclarationCarrier`); `docs/L3/mcp-surface/design.md` §4/§9 `G-8`/`G-11`; `src/main/security.ts`, `src/shared/types.ts` by site; `D-16`, `D-105`, `D-129` · **`S-8` LANDED (2026-11-27)**: the rule, the gate's seam, the two free-predicate call sites and the record's `capabilities.groups` are in `src/`; **`M-8`'s seeded-profile e2e is still owed** (the in-process arms are `tests/security-gate.test.ts` and `tests/integration/mcp-surface/group-rule.test.ts`) · **Read order:** §1 the rule and its default → §2 the composition → §3 the moved functions → §4 the two cross-seat members → §5 the invariants

## 1. `src/main/security.ts` — the type, the rule, and the default

```ts
/** THE GROUP DOMAIN'S ID TYPE (`S-8`): the union retires and the NAME stays — an id in the registered set, which the
 *  registry answers. The six foundation ids are `TOOL_GROUP_IDS` (§4) and no type here closes over them; a reader who
 *  wants "is this id registered" asks `GroupRule.groups()` and never a literal (`group-domain.md` §1, §2). */
export type ToolGroup = string

/** THE TWO QUESTIONS THE GATE ASKS OF A GROUP DOMAIN, AND NO THIRD (`group-domain.md` §2, `ASM-GD-1`): `groupOf` is
 *  the membership for ONE name, `groups()` is the set a patch may name. One object, because a rule answering one and not
 *  the other would let `apply` admit a group no tool resolves to, or refuse one a tool already answers. */
export interface GroupRule {
  groupOf(name: string): ToolGroup | null
  groups(): readonly ToolGroup[]
}

/** THE DEFAULT RULE, AND IT READS THIS FILE'S OWN LITERAL AND NOTHING ELSE (`ASM-1`'s posture at this axis): the exact
 *  `TOOL_GROUPS` rows, then the `module:` prefix, and `TOOL_GROUP_IDS` as its set. A gate constructed with no rule
 *  measures the FOUNDATION's six and no module group — stated, because a bare gate in a test is that gate. */
export const foundationGroupRule: GroupRule
```

## 2. The composition, and the one authority for the set

```ts
/** A MEMBERSHIP REFUSAL IS A VALUE NAMING ITS SUBJECT (`D-105`), and the two reasons are the vocabulary the corpus
 *  already carries: `declaration-duplicate` for one name in two groups (the registry's own reason for a duplicate id)
 *  and `declaration-overstated` for a `tools[]` element the same manifest's `capabilities.tools` does not carry (`C-12`).
 *  It is structurally a `DeclarationRefusal` where the reason is the duplicate, so the boot's list is one union. */
export interface GroupRefusal {
  readonly status: 'refused'
  readonly reason: 'declaration-duplicate' | 'declaration-overstated'
  readonly subject: string
}

/** THE COMPOSED RULE (`group-domain.md` §2, §3; `ASM-GD-3`): `groupOf` answers the DECLARED MEMBERSHIP first and the
 *  foundation's rule second, and `groups()` answers the SET IT IS HANDED — the registry's `declaredGroups()` — unchanged,
 *  so the set has ONE authority and this function never derives it (`D-129`). `carriers` is the registry's own
 *  `DeclarationCarrier[]` (`docs/L3/declaration-registry/signatures.md` §2), so the membership and the ids are read from
 *  ONE input in ONE shape: `capabilities.groups` gives `{id,label,tools?}`, `declarationsOf` gives the ids.
 *
 *  REFUSALS ARE VALUES AND NEVER THROWS (`D-105`): a tool named in two modules' `tools`, or twice in one, answers
 *  `declaration-duplicate` with the TOOL as subject; a `tools[]` element the same manifest's `capabilities.tools` does
 *  not carry answers `declaration-overstated`. A refusal never halves the membership: the rule keeps what it admitted
 *  and the boot names what it refused. */
export function composedGroupRule(
  foundation: GroupRule,
  groups: readonly ToolGroup[],
  carriers: readonly DeclarationCarrier[],
): { readonly rule: GroupRule; readonly refused: readonly GroupRefusal[] }
```

- **The foundation's exact rows and a declared membership cannot collide** (`group-domain.md` §3): a declared name is a `module:<n>.<t>` tool and no exact row carries one, so the membership is asked first because it is the narrower list — never as a precedence rule.

## 3. The functions whose signatures move, and by how much

```ts
/** THE FOUNDATION'S RULE, UNCHANGED IN BEHAVIOUR AND NARROWED IN TYPE: an exact row, then the `module:` prefix, `null`
 *  for a bare `module:` and for an unknown name. It is `foundationGroupRule.groupOf` and the DEFAULT every function
 *  below takes, so no call site in the tree changes shape (`group-domain.md` §2). */
export function groupForTool(toolName: string): ToolGroup | null

/** THE TWO PREDICATES GAIN ONE OPTIONAL TRAILING RULE, defaulting to `foundationGroupRule` — never a second source, and
 *  never a required argument that would force every caller to name a rule (`ASM-4`'s defaulted-seam pattern). */
export function toolAllowed(name: string, enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[], rule?: GroupRule): boolean
export function registrationAllowed(name: string, enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined, rule?: GroupRule): boolean

/** THE INVOCATION PAIR, RE-GRAINED FROM `module` TO THE TOOL'S OWN GROUP (`group-domain.md` §1, §4): a `module:`-prefixed
 *  name is admitted iff ITS group stands and, where `executable` (default TRUE, fail-closed), `code` stands too. The rule
 *  rides the OPTIONS OBJECT rather than a fourth parameter, so the landed call shape is unmoved. */
export function moduleToolAllowed(
  toolName: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
  opts?: { executable?: boolean; rule?: GroupRule },
): boolean

/** THE PATCH VALIDATOR (`isToolGroup` is private and reads the rule): a `groups`/`disable` element the rule's set does not
 *  hold rejects the WHOLE patch, and the posture is unmoved — a malformed `enabled` fails closed and never throws. */
export function applyPatch(
  config: { token: string | null; enabled: ToolGroup[] },
  patch: { token?: string | null; groups?: ToolGroup[]; disable?: ToolGroup[] },
  rule?: GroupRule,
): { token: string | null; enabled: ToolGroup[] }

/** UNMOVED, AND SAID SO BECAUSE `S-8` NAMES IT: the default grant is `['read','dispatch']`, a module-declared group is
 *  absent from it, and that absence IS "defaults OFF". No per-module grant and no "enabled unless disabled" arm exists. */
export function defaultSecurityConfig(): { token: string | null; enabled: ToolGroup[] }
```

```ts
declare class SecurityGate {
  /** THE ONE INJECTION SEAM (`group-domain.md` §2): the composed rule, passed at the boot's one construction site; absent,
   *  the gate holds `foundationGroupRule`. The gate passes it to every predicate and to `applyPatch`, so no member of this
   *  class asks a literal. */
  constructor(initial?: SecurityConfig & { readonly groups?: GroupRule })

  /** THE RULE IT HOLDS, READABLE, so `mcp-server.ts`'s two FREE predicate calls are handed the gate's rule rather than
   *  the default — a call site left on `foundationGroupRule` would refuse a declared group at registration while the
   *  gate admitted it (`group-domain.md` §8). */
  get groupRule(): GroupRule
}
```

## 4. `src/shared/types.ts` — the two members, and they are `ipc-contract`'s

- **This section is a CROSS-SEAT declaration and not this page's write** (`group-domain.md` §8; `OWED-6`'s precedent): the file is `ipc-contract`'s, and `OWED-9`'s *"`types.ts`'s one edit is `OWED-6`'s retirement"* is a count this rev falsifies. **No other member of that file moves.**

```ts
/** THE FOUNDATION'S GROUP DOMAIN (`S-8`; `S-10`'s re-grain, `ASM-GD-2`): the six ids WITH the labels their owner authored, in
 *  roster order. A label is its declarer's (`C-9`), so it rides the foundation's contribution and is not a table elsewhere;
 *  `TOOL_GROUP_IDS` is this list's projection — membership, order and use unmoved, and the six ids one spelling (`D-129`). */
export const FOUNDATION_GROUPS: readonly { readonly id: string; readonly label: string }[]
export const TOOL_GROUP_IDS: readonly string[]

/** ONE GROUP A MODULE DECLARES (`S-8`, `ASM-GD-3`): the id, the label the renderer's roster paints (`S-10`), and the
 *  module's OWN tools in it. The label rides the DECLARATION and never the registry's entry — an entry is per-id and
 *  carries `{id, source, origin}` (`C-9`; `docs/L2/declaration-registry/interface.md` §2). */
export interface ModuleGroupDeclaration {
  readonly id: string
  readonly label: string
  readonly tools?: readonly string[]
}

export interface ModuleCapabilities {
  /** …the landed members unmoved (`tools`, `hooks`, `transforms`, `listeners`) */
  groups?: readonly ModuleGroupDeclaration[]
}
```

## 5. What L4 must NOT type, said here rather than found in review

- **No second list of the six ids**: not in `security.ts` (the `VALID_GROUPS` literal retires), not in `operator-settings` (`S-9`'s copy retires), not in `secure-panels` (`S-10`'s `Record<ToolGroup, string>` retires). `TOOL_GROUP_IDS` is the one spelling, and a row asserts the four files agree with it rather than each other (`group-domain.md` §2).
- **No second membership structure**: a `capabilities.toolGroups` map is refused (`ASM-GD-3`), and the group's `tools[]` is checked against `capabilities.tools` rather than being derived from it (`C-12`).
- **No required rule argument**: every predicate's rule is optional with `foundationGroupRule` as its default, so a construction site that has not been re-grained still measures the foundation's own set — and `M-8`'s arms are the ones that pass a composed rule.
- **No re-construction that drops the rule**: `apply` and `withExclusion` both answer a NEW gate, and `T-3`/`T-4`'s no-op arm answers one too — each carries `this.groupRule` into the constructor and `apply` hands it to `applyPatch`. A no-op transition that silently reverted to the foundation's six is the one regression no reading would name.
- **No call site on the default where the gate is in hand**: `registrationAllowed` and `moduleToolAllowed` are called from `mcp-server.ts` with `gate.groupRule`; the gate's own `toolAllowed` passes its own. The three are the only group readers in that file, and `D-41`'s site rule makes them a list, not a habit.
- **`TOOL_GROUP_IDS` lands with the registry, not with `S-8`** (`group-domain.md` §8): the registry's `FoundationDeclarations.group` needs it at the plan's step 1, so `S-8` re-grains the gate's read of a literal that already exists rather than minting it.
- **No unified instant**: registration, invocation and the re-gate keep their three answers (`design.md` §4, `G-8`); `composedGroupRule` is one rule asked three ways, not one predicate replacing three.
- **`signatures.md` §1's `ToolGroup` stub is `S-5`'s rev-scoped reading and not a second spelling**: it declares the union as `S-5` left it, and this page declares what `S-8` makes of it. Neither page restates the other (`D-46`, `D-152`).
- **No body on this page and no literal in it**: the ids live in `TOOL_GROUP_IDS`, the rows in `TOOL_GROUPS`, and the number in `appVersion()` (`design.md` §6; `D-41`).

```boundary-declared
{"unit":"modularity","layer":"L3","module":"mcp-surface","writes":[{"path":"docs/L3/mcp-surface/group-domain-signatures.md","d":"D-306","why":"this page \u2014 the `S-8` landing is stamped in its header (with `M-8`'s e2e named as owed) and its block is replaced rather than appended (D-2), so it names only this pass's writes"},{"path":"src/main/security.ts","d":"D-306","why":"`S-8` LANDED \u2014 `ToolGroup` is `string`; `GroupRule`/`foundationGroupRule`/`GroupRefusal`/`composedGroupRule`; `toolAllowed`/`registrationAllowed`/`moduleToolAllowed` take the rule (the invocation pair reads the TOOL'S OWN group, `code` kept for executables); `VALID_GROUPS` retires and `isToolGroup`/`applyPatch` read `rule.groups()`; the gate carries the rule across `apply`/`withExclusion` and exposes `groupRule`","by":"L4"},{"path":"src/main/mcp-server.ts","d":"D-306","why":"`S-8`'s coupled site: `ModuleRecord.capabilities` widens to `ModuleCapabilities` (so the census row carries `groups`), `parseCapabilities` keeps a well-shaped group entry, and the two free predicate call sites pass `gate.groupRule`","by":"L4"},{"path":"src/main/main.ts","d":"D-306","why":"app-shell's file, `S-8`'s coupled site: the gate's construction MOVES after the registry (its rule is the composed set), the registry is named, and the composed rule is built over the registry's `declaredGroups()` and the census carriers, its refusals logged by name","by":"L4"},{"path":"tests/security-gate.test.ts","d":"D-306","why":"`S-8`'s validator arms: a DECLARED group is enableable and an unknown one rejects the whole patch; the rule survives `apply`/`withExclusion` (no-op arms included); a bare gate measures the foundation's six","by":"L4"},{"path":"tests/integration/mcp-surface/group-rule.test.ts","d":"D-306","why":"`S-8`'s in-process battery for `composedGroupRule`: the declared membership resolves the tool's own group, the invocation/registration pair read it, an overstatement is refused with the tool as subject and does not join, and one tool in two groups is a duplicate the first claimant keeps","by":"L4"},{"path":"tests/integration/secure-panels/roster.test.ts","d":"D-306","why":"`S-8`'s consequence in `S-10`'s battery: the six group names are read from `FOUNDATION_GROUPS` (the union is retired), and the row no longer pins the annotation as if it bound \u2014 `M-10`'s runtime row is the successor, still owed","by":"L4"}]}
```
