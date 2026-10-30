# L3 — `secure-panels`: the declared signatures and the exact landing text

- **Layer:** L3 · **Unit:** `secure-panels` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 is read through this one: the landing has happened, the file's offsets are re-grained from pre-landing numbers to **sites with their post-landing reading**, and §3 records that the landing transcribed §2.1/§2.2/§2.3 verbatim · **Artifact:** `l3-secure-panels-signatures`
- **Status:** DECLARED NAMES AND EXACT TEXT ONLY — the structure, the variants and the guardrails are `design.md`; this file carries every name the landing exposes or consumes and the exact text each region of `src/renderer/secure-panels.ts` must carry afterwards. The arrangement is L2's (`docs/L2/secure-panels/interface.md` §1-§2, `R-3`), restated and never re-decided (D-3)
- **Contract:** no name is added, dropped or renamed. The four names the repair touches — `GROUP_LABELS`, `GROUPS`, `ToolGroup` and the `toggle:` arm's local `g` — are all names L1 E-1 or L2 `S-7` already spell; only their **types, their order in the file and one guard** move (L1 §7 E-1; L2 `S-7`; D-1)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `T-n` is `design.md`'s probe of this seat on **2026-10-30** (a `/tmp` byte copy of `src/`, the repo's own `tsc`, nothing of the repository written); `S-n` is L2's `interface.md` §3 probe; `P-n` is `docs/L1/secure-panels.md` §4.3's live row; `G-n` is `design.md` §8's guardrail

## 1. The declared surface: one specifier, one annotation, one projection, one guard

**This unit exports nothing and mints nothing.** No module, class, function, verb, constant or type is added to `src/**`, no file is added anywhere, and no MCP tool, resource, route, `RpcMethod` member, bridge channel or `window.provident` member is touched (L2 §5; D-11, D-14, D-18). What the landing adds is **four pieces of text in one file**:

| # | Piece | Kind | Where (post-landing) |
|---|---|---|---|
| 1 | `ToolGroup` as a **second specifier** on the existing type-only import | a type-only import specifier — erased at build (S-4) | the type-only `'../main/security.js'` import line, beside `ExclusionState` |
| 2 | the table's annotation `Record<ToolGroup, string>` + the `data` entry | an annotation and one data line | `:77-84`, inside the block `:74-90` |
| 3 | the projection `const GROUPS = Object.keys(GROUP_LABELS) as readonly ToolGroup[]` | one assertion, at one site, replacing a literal | `:90`, immediately after the table |
| 4 | the roster guard in `syncConfig`'s `toggle:` arm | one replaced line and one added line | `:556-565` |

- **The roster's element type is `ToolGroup`**, and that is the only type this unit puts on a *value*: it is what keeps `paneEnvelope()`'s index clean and what the guard narrows through (`design.md` §2-§3; T-2, T-3).
- **Nothing is exported**, so nothing here is counted by the map row's `endpoints` — a type-only import of a type an already-imported module exports adds no called export, no route and no bridge member (L2 §6; D-14).

## 2. The exact text (verbatim; `signatures.md` is the authority L4 copies from)

### 2.1 The import — the `'../main/security.js'` statement, the type-only line beside `ExclusionState` (region 1)

The existing line gains **one specifier**; the statement, the specifier string and the `import type` keyword do not move. The two comment lines above it are this unit's and sit between the PAR-13 block and the import:

```ts
// L3 (secure-panels E-1) — the group roster's binding to the gate's union: `ToolGroup` is
// TYPE-ONLY here, on the `ExclusionState` precedent above (erased at build; no runtime edge).
import type { ExclusionState as EXCLUSION_STATE, ToolGroup } from '../main/security.js'
```

- **A type-only import and never a value import**: the gate module must not enter the renderer bundle, and the specifier set on that line is the only site the type can come from (`src/main/security.ts:3`; L2 `ASM-L2-2`; S-4).

### 2.2 The table and the projection — the constants block, `:74-90` post-landing (region 2)

The **whole two-constant block is replaced**, the projection declared **after** the table, `data` the literal's **last** entry:

```ts
// ONE author for the pane's group set: the gate's union types the table, and the table's own
// key order IS the roster's order. A seventh gate group with no row is TS2741; a row naming
// no group is TS2353; a misspelt key is TS2561 — all on `npm run typecheck`, the floor leg.
const GROUP_LABELS: Record<ToolGroup, string> = {
  read: 'read (get_rendered_html, get_markdown, list_targets, get_node_state, code.get, code.validate)',
  dispatch: 'dispatch (synthetic event driving)',
  graph: 'graph (load, op, export, validate, teardown)',
  code: 'code (code.set/create/delete/load — evaluates handler bodies)',
  module: 'module (module.install/update/list + module:<name>.<tool> extensions — trusted-equivalent to code)',
  data: 'data (data.read/write/delete/list/journal — the central store)',
}
// The roster is the table's own keys, in insertion order (non-numeric string keys keep their
// creation order), so the five landed rows stay in place and `data` lands last (P-7). The one
// assertion in this unit asserts only what the annotation has already proven — the key set IS
// `ToolGroup` — because `Object.keys` erases that to `string[]`; without it the index in
// `paneEnvelope()` reddens as a second TS7053 (T-3).
const GROUPS = Object.keys(GROUP_LABELS) as readonly ToolGroup[]
```

- **The five landed label strings are byte-identical to the pre-landing file's**, and the landed file carries them at `:78-82`: not one character of them moves, and `data` is appended at `:83` (L1 §5; `P-7`).
- **`data`'s text, quoted alone** for a reader checking `P-3`: `data: 'data (data.read/write/delete/list/journal — the central store)',` — it leads with the group name and keeps the family style (`design.md` §4).
- **`as const` appears nowhere**: the annotation is the table's type, and the projection's assertion is the unit's only `as` (T-4/T-5 fire on the annotation; `design.md` §1).

### 2.3 The narrowing — `syncConfig`'s `toggle:` arm, `:556-565` post-landing (region 3)

One line replaced, one added, four comment lines; the branch's condition and everything above it stay as landed:

```ts
      } else if (typeof id === 'string' && id.startsWith('toggle:')) {
        // `toggle:<group>` is authored from GROUPS, so the suffix IS a group — but the id's
        // TYPE is `string`, and the roster is the only thing entitled to say so. The guard
        // reads the roster, never a cast: an id that spells no group refreshes nothing, where
        // `GROUP_LABELS[id.slice('toggle:'.length) as ToolGroup]` would paint `☐ undefined`.
        const g = GROUPS.find((k) => `toggle:${k}` === id)
        if (g === undefined) continue
        const on = this.cfg.enabled.includes(g)
        mutation.push({ targetProp: 'props.data-on', mode: 'replace', value: on ? 'true' : 'false' })
        mutation.push({ targetProp: 'content', value: `${on ? '☑' : '☐'} ${GROUP_LABELS[g]}` })
```

- **`g` is `ToolGroup | undefined` and the guard narrows it to `ToolGroup`**, so `GROUP_LABELS[g]` needs no assertion and `this.cfg.enabled.includes(g)` is checked against the declared `string[]` (`src/shared/types.ts:321-328`).
- **The two `mutation.push` lines are the landed text, unmoved** — the sixth row's `data-on` and content writes are the same two statements every other group row gets (L1 §5; `behaviour.md` §2).

## 3. The landing sites, in the order L4 applies them (one pass, one file)

| # | Site, and the text it replaced (post-landing offset) | Action | Compiles alone? |
|---|---|---|---|
| 1 | the existing `'../main/security.js'` import statement — the type-only line beside `ExclusionState`, which carried `import type { ExclusionState as EXCLUSION_STATE }` | append `, ToolGroup` to the specifier list and put §2.1's two comment lines above it | yes — the file stays green |
| 2 | the constants block, `:74-90` post-landing — it carried `const GROUPS = […] as const` above `const GROUP_LABELS: Record<string, string> = {…}` | replace both with §2.2 verbatim (table first, projection after, `data` last) | **no — leaves exactly one `TS7053`** at region 3's table index (`:565`; T-2); that red is the design's own statement |
| 3 | `syncConfig`'s `toggle:` arm, `:556-565` post-landing — it carried `const g = id.slice('toggle:'.length)` | replace that line and add the guard, per §2.3 | yes — the file is green; `npm run typecheck` is the instrument |

- **Followed verbatim, measured against the landed file:** the landing transcribed §2.1, §2.2 and §2.3 **byte-for-byte** and **nothing outside the three regions was forced** — `paneEnvelope()` (`:182-188`), the handler bodies (`:134-176`), `paneMutationValid` (`:114-122`) and the `declare global` block (`:44-72`) sit exactly where their pre-landing text implies and read as they read before. That is the evidence this order was buildable as written, and it is why §2 is the authority L4 copies from rather than a sketch to be reconciled.
- **No fourth site.** `paneEnvelope()` (`:182-188`), `TOGGLE_BODY` (`:146-153`), the `declare global` block (`:44-72`), `paneMutationValid` (`:114-122`) and every other arm of `syncConfig` are **not edited**; they compile unchanged (T-2) and an edit there is beyond E-1 (`G-1`, `G-4`).
- **Region 2 and region 3 are one pass, not two**: a file holding the annotated table and the un-guarded arm is a file the floor leg reddens, and nothing may be reported from that state (D-1, `examiner.md` §3).

## 4. Names and texts L4 must not mint

| Where | Never added | Cite |
|---|---|---|
| the import line | a separate `import` statement, a value import, a `ToolGroup` alias, or a fifth specifier | §2.1; L2 `ASM-L2-2`; S-4 |
| the table | a second author of the roster — a `GROUPS` tuple, a `GROUPS_EXTRA` list, a `data` entry outside the literal, or a `Record<string, string>` view beside the annotated table | §2.2; `G-2`; L2 §1 |
| the arm | a cast (`as ToolGroup`), a `Record<string, string>` index, a `!` non-null assertion, a `try`/`catch`, or a second guard function | §2.3; `G-3`; `design.md` §3 |
| the file | any new export, any new constant, any new exported type, any second `toggle:`-prefixed id scheme | `G-5`; D-14 |
| the tree | `src/main/**`, `src/shared/**`, `scripts/`, `package.json`, `tests/**`, `strata/**`, `docs/L1/**`, `docs/L2/**` | `G-1`, `G-7`; D-3, D-7 |

## 5. The commands

**The one leg that must be green for this layer's claim** — the net's own instrument, no `DISPLAY`, no mark (D-37, D-40):

```sh
npm run typecheck
```

The floor it runs beside, in `brief.md` §6's own order — the landing is not reportable on one leg (D-1):

```sh
npm test
npm run typecheck
npm run typecheck:tests
npm run build
```

- **`npm run typecheck:tests` is unmoved by this unit** — no test file is edited and no test type reads the pane's roster (`G-1`).
- **The rendered claim is not this file's command**: `npm run panes` (`tests/e2e/secure-panels/panes-live.mjs`) is L1's battery and its rows `P-1`…`P-7` are the evidence; it needs a `DISPLAY` and is run by whoever takes that reading, never from here (L1 §4.1-§4.3; D-37).
- **This layer ran no leg and no battery**: `design.md`'s `T-n` are `/tmp` type-checks on a copy of `src/`, which is why §2 states error codes and orders rather than a green of the tree (D-26, `examiner.md` §3).

## 6. Out of scope

- **No behaviour, no byte and no row's expectation** — `behaviour.md`, `persistence.md` and `P-1`…`P-7` own those (L1 §4.3; L2 §5).
- **No unit battery and no map claim** — `design.md` §7's verdict, with its reason and its falsifier (D-7, D-14, D-30).
- **No census figure, no cap, no script key** — all read from the `secure-panels` row of `strata/modules.json` and `brief.md` §6, restated nowhere here (D-14, D-26, D-37, D-39).
- **No implementation** — the three regions are text for L4's single shot under L2's arrangement and this spelling (D-3, `examiner.md` §4).
