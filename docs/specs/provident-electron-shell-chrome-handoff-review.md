# Review — `provident-electron-shell-chrome-handoff` (`SCH-1..SCH-13`, three-agent gate 2026-09-27)

**Status (pre-amendment, 2026-09-27 — read with the amendment below; SUPERSEDED
BY A-d1/A-d2/A-d3 for the status, the admission rule and the per-item table, and
ALSO SUPERSEDED BY A-d4…A-d8 for the counts, the pin state and every
`SCH-3`/`SCH-4`/`SCH-6`/`SCH-7`/`SCH-9`/`SCH-10`/`SCH-13` disposition — see the
**Amendment record (A-d4…A-d8, 2026-09-27)** appended at the end of this file,
which is the governing layer)**:
GATE COMPLETE — **GO-CONDITIONAL** (6 blocking reshapes `H-r1..H-r6`
owed to the fork; **ONE** item adopted-reshaped: **ADOPT-RESHAPED — PENDING
ARCHITECT GO-AHEAD — not yet delegable**).

**Status (AMENDED, 2026-09-27 by A-d1/A-d2/A-d3 — SUPERSEDED BY A-d4…A-d8 for
the counts, the pin state and seven item dispositions; kept as the intermediate
layer)**: GATE AMENDED —
**GO-CONDITIONAL**: **6 `SCH`-derived units ADOPTED-RESHAPED** (`U-MOUNTGUARD`
← `SCH-1` invariant half · `U-GSESSION` ← `SCH-2` · `U-MENULIB` ← `SCH-5` ·
`U-PROJ` ← `SCH-8` projection half · `U-LISTHOST` ← `SCH-11` · `U-OVERLAY` ←
`SCH-12`) **+ 2 engine prerequisite units** (`U-ENGINE-PIN` ← A-d2 ·
`U-ENGINE-DRIFT` ← A-d2) **= 8 units total**; **6 `SCH` items
DECLINED/REFILED** (`SCH-3`, `SCH-4`, `SCH-6`, `SCH-7`, `SCH-10`
declined+refiled; `SCH-9`, `SCH-13` declined); **1 split** (`SCH-1`);
**1 refile withdrawn** (`SCH-12`'s package-stream refile); **0 PARK**. Landing
order `U-ENGINE-PIN` → `U-ENGINE-DRIFT` → `U-MOUNTGUARD` → `U-GSESSION` →
`U-MENULIB` → `U-PROJ` → `U-LISTHOST` → `U-OVERLAY`. **NO unit is DONE, nothing
is green, and no test was run in any pass of this gate** — every unit is
`BLOCKED — awaiting architect go-ahead` (`docs/next-steps.md` `## OPEN`).
**Inputs**: the fork's handoff `<Astrographer>/docs/feature-requests/provident-electron-shell-chrome-handoff.md`
(999 lines, 2026-09-22 — read `§1`, `§2`, `§3` per item, `§3.14`, `§4`, `§5`, `§6`, `§7`); the fork's gated
request set `<Astrographer>/docs/feature-requests/provident-electron-shell-chrome-requests.md` (`SC-1` `:91`,
`SC-2` `:202`, `SC-3` `:328`, `SC-4` `:473`, `SC-5` `:587`, `SC-6` `:707`, `SC-7` `:814`, the DO-NOT-FILE table
`:936` — section anchors read; the bodies were NOT read in full, so every `SC-n` claim below is the handoff's);
the fork's gate record `<Astrographer>/docs/specs/astrographer-scope-realignment-review.md`
(**PROCEED-WITH-AMENDMENTS, 2026-09-17**, `:38-40`); validity review (VERDICT
**VALID-WITH-RESHAPES**, V-1..V-14); critique review (VERDICT **REJECT-AS-STRUCTURED**, C-1..C-18);
architecture ruling (admission rule + the `SCH-1` split); change-analysis (VERDICT
**GO-CONDITIONAL** — 1 adopted-reshaped, 12 refiled, `H-r1..H-r6`).
**Amendment inputs (2026-09-27)**: the architect's three rulings **A-d1/A-d2/A-d3**
(the three amendments in the block below); the amended architecture re-issue
(amended admission rule (A)/(B)/(C) + the six prohibitions, the re-derived 13
per-item dispositions, the node-local interaction contract shape, the carve-out
clarification, the dissents); the amended change-analysis (the definitive unit
plan in its §3, the engine-pin rulings §2, the shim design call §2.4, the
`H-r7..H-r13` reshape set §5, the security/equivalence obligations §6, the risk
register §8, the tracker/doc obligations §9); and the `provident-ssr` 0.2.1 →
0.5.1 engine recon (attributed as "(engine recon)" below wherever this pass did
not re-read its evidence itself).

## Layer declaration (read this before any table below)

1. **This record is DOC-LAYER only.** No acceptance criterion in the handoff was
   executed by any of the four gate steps: no test suite ran, no trio ran, no
   Electron window booted, and no `get_rendered_html` byte-diff was taken. The
   gate adjudicated the **request document**, not the mechanisms.
2. **The mount invariant's current behaviour is UNPROVEN.** Neither the handoff's
   "no cross-envelope mount-cardinality claim exists" (`handoff §6.2`,
   `:905` — reading this repo's `src/renderer/runtime.ts:735-753` +
   `tests/runtime-host.test.ts:150-160`) nor the validity pass's "diff-based
   emptying exists and is tested" (`tests/runtime-host.test.ts:150-161`) is a
   cross-envelope statement: the test is per-teardown. **The first thing the red
   run must settle is whether a cycle-2 load leaves one or two elements in the
   mount.** This record asserts no cardinality.
3. **No green in either repo proves adoption.** A green here proves a suite is
   green; a green in the fork proves the fork's own tree. Adoption is proven only
   after the `H-r4` spec's red set is RUN and REPORTED (RCA-1) under the
   architect's go-ahead.
4. **No unit appears in this repo's queue — SUPERSEDED BY A-d1/A-d2/A-d3, then by
   A-d4…A-d8 (`H-r20`).** Under the amendments the **20 units** DO enter the queue
   (`docs/next-steps.md` `## OPEN`), each `BLOCKED`, with its owed spec
   path — **`U-ENGINE-PIN` is PARTIALLY LANDED (pin moved, shim half + guard red),
   and it is the only unit that is not at zero.** The pre-amendment rule above still
   binds in its substance: a unit is not
   **delegable** until (a) the architect's go-ahead and (b) its spec exist and a
   TestWriter has RUN and REPORTED the red set (`AGENTS.md` item 9).
5. **Amendment limits (this pass, honest).** (a) **Nothing was executed** by the
   amendment either: no suite, no trio, no Electron boot, no
   `get_rendered_html` byte-diff, no install. (b) **The mount invariant's
   behaviour is STILL UNPROVEN** — the amendment changes the disposition, not the
   cardinality; `U-MOUNTGUARD`'s red run is what settles it. (c) **The 0.5.1
   `dist` was read from the adjacent `../Preempt-Providence/` build**
   (`package.json:3` = `0.5.1`, read this pass; zero runtime deps at `:51`, read
   this pass) and the **publish** is confirmed by the upstream's own release index
   (`../Preempt-Providence/docs/releases.md:31`, read this pass: "✅ PUBLISHED
   2026-09-23", release commit `abd9a458…`, shasum `edc8ad57…`). **This pass did
   NOT verify the shasum against the registry, did NOT fetch the registry, and did
   NOT verify that the published tarball's `dist` equals the adjacent build** — that
   last equivalence is **(engine recon)** only, and no ruling here rests on it: the
   `U-ENGINE-PIN` install is the moment that closes. (d) **The install was
   NOT performed**: `package.json:23` still reads `provident-ssr: "^0.2.1"` and
   the installed copy is still `0.2.1`
   (`node_modules/provident-ssr/package.json:3`, read this pass). (e) The
   `bodyRuns`/`BARE-TEXT-EMIT` and census/`dirtied` statements are attributed to
   the spill records, not re-read here (`H-r11` forbids the overclaim outright).
   (f) **Nothing is archived, moved or repointed by this amendment** (see the
   archival-loop check at the end of this record).
6. **The 112-line shim figure is the canonical one and is NOT a doc drift.**
   `src/shared/dom-shim.ts` is **112 lines with 111 newline-terminated** — it has
   no trailing newline (read this pass, 112 lines total). A line-count check that
   reports 111 is counting terminators, not lines; the figure in this record and
   in `docs/decisions.md` `SHELL-CHROME-HANDOFF-DISPOSITION` stands.
7. **CITATION NOTE — this record's own `:NN` anchors are PRE-AMENDMENT line
   numbers.** The amendment appended ~330 lines, so every citation **into this
   record** that used a bare `:NN` (e.g. `docs/decisions.md`'s old pointer to
   `:65`/`:66`/`:69`/`:70`, and this repo's other references to `H-r1`..`H-r6`
   rows) refers to the **pre-amendment** layout and will not match today's file.
   **Cite this record by ID, not by line** — `H-r7`..`H-r13`, `S-d8`..`S-d10`,
   `§4.1`/`§4.2`/`§4.3`, the `Layer` column, the amended unit plan — and where a
   line number has moved, the new anchor is named inline at each affected row.
   The record itself is **176 lines pre-amendment → 508 lines post-amendment**;
   no content was deleted, so a stale `:NN` still resolves to its own old text
   somewhere in the file — the risk is misdirection, not loss.

## Amendment record (A-d1/A-d2/A-d3, 2026-09-27)

The decision owner (architect) issued **three amendments** on 2026-09-27. This
section is **appended**: the pre-amendment record above and below stays readable
and citable — where a pre-amendment claim is now wrong it is marked
`SUPERSEDED BY A-d1/A-d2/A-d3` with a one-line why, never silently overwritten.
The three rulings, in the architect's substance:

- **A-d1 — the shell-chrome carve-out is FUNCTIONAL, not geographic.** The
  `SCH-1..SCH-13` requests come from a downstream consumer; this repo is asked to
  implement them because they affect **shell chrome** and will **likely be
  re-used by other projects**. The carve-out is therefore a *kind* of code — OS
  integration + frame/geometry/interaction mechanics the provident graph cannot
  express — not a geographic directory question ("does this repo ship chrome?").
- **A-d2 — "Update for provident version":** move `provident-ssr` off the
  `^0.2.1` pin to the published `^0.5.1`.
- **A-d3 — "setPointerdown/other pointer tracking behavior is the incorrect
  implementation for the pane/gutter control user flows. Where possible, all
  interaction mechanisms should work through local handlers."**

**Amended disposition counts (the identity this record and every tracker must
use — do NOT use the change-analysis's "8 adopted-reshaped" phrasing, which
conflated adopted `SCH` items with prerequisite units):**
**6 `SCH`-derived units ADOPTED-RESHAPED** (`U-MOUNTGUARD` ← `SCH-1` invariant
half · `U-GSESSION` ← `SCH-2` · `U-MENULIB` ← `SCH-5` · `U-PROJ` ← `SCH-8`
projection half · `U-LISTHOST` ← `SCH-11` · `U-OVERLAY` ← `SCH-12`)
**+ 2 engine prerequisite units** (`U-ENGINE-PIN` ← A-d2 · `U-ENGINE-DRIFT`
← A-d2) **= 8 units total**; **6 `SCH` items DECLINED/REFILED** (`SCH-3`,
`SCH-4`, `SCH-6`, `SCH-7`, `SCH-10` declined+refiled; `SCH-9`, `SCH-13`
declined); **1 split** (`SCH-1`); **1 refile withdrawn** (`SCH-12`'s
package-stream refile); **0 PARK**. **⟶ SUPERSEDED BY A-d4…A-d8 — and the
decline clause is now WRONG, not merely stale:** as of 2026-09-27 the counts are
**13 items · 16 `SCH`-derived units · 2 engine units · 2 harness units = 20 units**,
**no item is declined outright and none is declined+refiled**, and only **3
part-halves** stay declined (`SCH-1` region host · `SCH-9` publisher/carrier ·
`SCH-12` focus trap + the `inert`/a11y documentation half). `SCH-3`, `SCH-4`,
`SCH-6`, `SCH-7`, `SCH-9`(host half), `SCH-10` and `SCH-13` are all **ADOPTED**.
Read §2 of the appended `Amendment record (A-d4…A-d8)`.

**Amendment corrections to the engine recon (adjudicated — these govern).**
1. The recon's claim that 0.2.1's DOM `setProp` never calls `removeAttribute` is
   **REFUTED**. The installed 0.2.1 has **three** call sites —
   `node_modules/provident-ssr/dist/core/adapters.js:120` (`css:<key>` with
   `undefined`), `:187` (`data:*` with `undefined`), `:194` (bare/`prop:*` with
   `undefined`) — **re-read and confirmed in this pass**. The shim gap is
   therefore a **pre-existing, latent harness gap at the CURRENT pin**, not
   something the upgrade introduces. 0.5.1 adds a fourth site (`:310` — `(engine
   recon)`; **not re-read here**, and note the re-issued architecture pass cites
   the same 0.5.1 sites as `adapters.ts:231`/`:286`/`:291`/`:300`, so a later pass
   should treat the *set* as settled and the *line numbers* as needing a re-read at
   install) plus `BOOLEAN_ATTRS` (read this pass at
   `../Preempt-Providence/src/core/adapters.ts:45-73`, 27 members, `'inert'` at
   `:57`).
2. The shim design call is **`H-r7`'s scoped harness completion**: add
   `removeAttribute` to `ShimElement` (**`hasAttribute` only if a red run names a
   real call site**), explicitly distinguished from the browser-emulation
   expansion `H-r5` forbids, **plus** a red-first host-side guard that rejects a
   mutation whose `props.`/`css:` target prop carries an `undefined`/`null` value
   (`{status:'rejected'}`, the `HOST-OP-REJECT` shape, `docs/decisions.md:42`).

## Design decisions (amended 2026-09-27 by A-d1/A-d2/A-d3)

| ID | Decision |
| --- | --- |
| S-d1 | **Admission rule (the gate's own derivation, from `AGENTS.md:8-19` + `docs/FORKER.md:13`).** This repo may own a mechanism only if **(A)** it has an **in-tree consumer in shipped code**, or **(B)** it is a **pure state transition with every environment reading injected**. The rule is derived, not user-stated; the architect applied it as the gate's admission test — **SUPERSEDED BY A-d1** (the (A)/(B) rule is amended: a third clause **(C)** admits a reusable shell-chrome mechanism with a consumer-agnostic contract; see `S-d8`) |
| S-d2 | **`SCH-1` is SPLIT.** The **cross-envelope mount cardinality/identity invariant** is admitted (this repo is its own consumer); the **region-host half** (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions`) is DECLINED — **still binding** |
| S-d3 | **Verification layer held:** the DOM shim **must NOT be expanded**; real-DOM claims belong on the offscreen Electron `divergence` leg (`package.json:18`, `docs/specs/ci-divergence-leg.md:15-25`) — **AMENDED by `H-r7`/A-d2:** the layer is still held, with **ONE scoped exception** (`ShimElement.removeAttribute`, admitted only on a named engine call site in an installed dist, plus a red-first host-side `undefined`/`null` prop-mutation rejection guard). `removeAttribute` is attribute *bookkeeping* — the exact category the shim's own header announces (`src/shared/dom-shim.ts:1-3`) — not browser emulation: no layout, no CSS resolution, no pointer/capture semantics, no `matchMedia`, no `activeElement`/focus walk, no `getComputedStyle`, no render-count seam |
| S-d4 | **Security:** no adopted item needs a new MCP surface; this repo must not acquire a UI-config store; no CSP change — **still binding** |
| S-d5 | **Sequencing:** only `SCH-1`'s invariant half has an honest single-revert boundary; the 7 SC-covered items may be adjudicated as one package in this record but must LAND per unit (RCA-2 / delegation gate) — **AMENDED BY A-d2:** the **two engine units (`U-ENGINE-PIN` → `U-ENGINE-DRIFT`) land FIRST, before every shell-chrome unit**, and the amended plan now names nine honest single-revert boundaries (one per unit, plus the two engine units' coupled `package.json` + lockfile diff); the per-unit landing rule is unchanged and now applies to 8 units — **SUPERSEDED BY A-d4…A-d8 (`H-r20`): the plan now holds 20 units, so the rule applies to 20** |
| S-d6 | **Recommended disposition = the change-analysis's option B, PACKAGED as D:** adopt only the mount invariant as this repo's own unit, decline/refile the other twelve with **named owners**, and return the disposition to the fork with the `H-r2`/`H-r3`/`H-r5` corrections. Options **A** (also adopt reshaped `SCH-3`) and **C** (package-first, adopt nothing) were presented and are NOT adopted — **SUPERSEDED BY A-d1** (the amended plan adopts six `SCH`-derived units + two engine units; see the amended per-item table and the unit plan) |
| S-d7 | **The mount invariant is a TARGET HARDENING UNIT, not a `docs/defects.md` row** (see the residual-disagreements section) — **still binding** (`U-MOUNTGUARD`) |
| **S-d8** | **Admission rule (A)/(B)/(C) + the six prohibitions (A-d1).** A unit may be owned by this repo if **(A)** it is exercised by shipped code in this repo (`src/**`), OR **(B)** it is a pure state transition whose every environment reading (OS reading, clock, persisted value, DOM/global) arrives as an injected argument or callback and whose result is a value (no ambient global, no store, no I/O), OR **(C)** it is host-side code implementing a **shell-chrome mechanism** — OS integration, or frame/geometry/interaction mechanics that provident-authored graph data cannot express (the functional carve-out, `AGENTS.md:23-34` as amended by A-d1) — **and** it has a **consumer-agnostic contract**, **and** it is **falsifiable on a layer this repo owns**. A (C)-admissible contract **MAY NOT** contain: (1) **consumer vocabulary** — a consumer's id, name, zone, pane, tab, region, document, or token literal as a symbol, closed string-union member, default or documented constant (consumer values cross as opaque strings injected by the consumer); (2) **app UI content** — literal text, controls, affordances, styling, or any element the mechanism populates with content the consumer did not supply (`docs/decisions.md:53`); (3) **policy defaults** — a decision the consumer owns, baked in as the mechanism's default; (4) **a UI-config store or any persistence of its own** (persisted state is supplied *to* the mechanism); (5) **a new MCP surface** — no new tool, resource, tool group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry (`src/main/mcp-server.ts:281-303`; `src/main/security.ts:134`); (6) **an unverifiable criterion** — one whose falsification needs a layer this repo does not own, or requires expanding `src/shared/dom-shim.ts` into a browser emulator. **(C) relaxes none of the process obligations:** every (C) unit still lands as its own spec → red → green → adversarial → blind greens → doc review → trio cycle (RCA-1/RCA-2/RCA-3/RCA-6). **PROHIBITION-5 CLARIFICATION (added by the A-d4…A-d8 amendment — `H-r14`, and it governs every reading of this cell):** prohibition 5 is an **adoption bound on UNITS**, not a ban on this repo ever adding an MCP tool. It says a (C)-admissible mechanism's **own contract** may not require a new MCP surface; it never said a **tool** may not be authorised **as its own unit** (which is a different gate: the six-site wiring + an `docs/specs/mcp-endpoint.md` amendment). A-d5 is exactly that gate for `provident.focus`, and **it does not relax prohibition 5 for any other unit**. Carve-out clarification: a **mechanism** is outside `UI-RENDERED-WITH-PROVIDENT` because it is not a UI element; a mechanism that **authors content remains a review finding** (see the new `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` row in `docs/decisions.md`) |
| **S-d9** | **Node-local interaction rule (A-d3).** All shell interaction mechanisms work through **local handlers on the element that receives the interaction**; the requested **document-delegated `pointerdown` + per-event `closest(selectors)` resolution is REJECTED**, as is **capture installed from the gesture-start handler, unconditionally, before the interaction is established** (that is the F-1 retargeting class). **Narrow capture reading (binding):** capture is **0 calls before the interaction is established**, **permitted after** it, **per-control opt-in** (`capture?: boolean`, default false). A reading that forbids capture outright would make the fork's own `lostpointercapture` criterion inert and lose the pointer when the cursor leaves the window — a shipped correctness regression. **What local handlers purchase is origin REACHABILITY, NOT magnitude-equivalence:** the MCP dispatch surface carries an event **name** with no pointer coordinates (`src/renderer/runtime.ts:127-139`, `:1037-1051`), so a session reached through MCP can start/abort deterministically but cannot commit a magnitude — no later pass may claim agent-drivable drags. See the new `INTERACTION-NODE-LOCAL` row in `docs/decisions.md` |
| **S-d10** | **The engine pin is a prerequisite (A-d2).** `provident-ssr` moves `^0.2.1` → `^0.5.1` as its own unit sequence (`U-ENGINE-PIN` → `U-ENGINE-DRIFT`) landing **BEFORE every shell-chrome unit**: it is the condition on which `V-3` lapses and on which `SCH-12`'s `inert` criterion becomes expressible here (the closed `BOOLEAN_ATTRS` set incl. `'inert'` is absent from the installed 0.2.1 dist), it is the only unit that can invalidate other units' criteria (emitted-text/structure changes from 0.4.0 `BARE-TEXT-EMIT`), and it is the highest-risk change to the existing contract (fail-fast). It owns its own spec (`docs/specs/engine-pin.md`), its own red set, a documented drift list, and **no silent test edits**. See the new `ENGINE-PIN-0.5` row in `docs/decisions.md` |

| **S-d11** | **The panes/zones family is IN SCOPE (A-d4).** Architect ruling A-d4, verbatim in substance: *"SCH-4/6/7/10 — I don't care, build the damn panes/zones framework. Everything that this project will get used for is going to have static UI elements."* The five units are **`U-ZONES` ← `SCH-4`**, **`U-CENSUS` ← `SCH-8`'s census half (its earlier refile is WITHDRAWN)**, **`U-GUTTER` ← `SCH-6`**, **`U-RELOCATE` ← `SCH-7`**, **`U-CONTAINER` ← `SCH-10`** — contract-exact rows in the appended amendment record. **`SCH-1`'s region half STAYS DECLINED** (its blockers are prohibition #1 and #6, **not** prohibition #5), and **the geometry the family produces is UNPROVABLE in this repo today** (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described. **ADJUDICATED (supervisor, this pass):** the A-d5…A-d8 architecture pass re-declined `SCH-4`/`SCH-6`/`SCH-7`/`SCH-10` because it read the **landed** pre-A-d4 rows; **A-d4 is the architect's explicit ruling and is binding, and the re-decline is an artefact of the A-d4 amendment never having been landed. A-d4 stands; the five panes/zones units are part of the plan** (see the appended supervisor adjudication) |
| **S-d12** | **`SCH-13` is ADOPTED as TWO units (A-d5) — `U-FOCUS-MODEL` + `U-FOCUS-TOOL`.** Architect ruling A-d5, verbatim in substance: *"Add provident.focus for the tab handling. This is another tool that will be reused in multiple projects."* `U-FOCUS-MODEL` is a **pure ordered-entry transition module** (opaque ids/targets, injected `refuse`/`onChange`/`persist`; no vocabulary, no store, no DOM); `U-FOCUS-TOOL` is the **new MCP tool** — group **`dispatch`**, **NOT** in `MUTATING_METHODS`, emits no notification, persists nothing, cannot force a re-render; **`ALL_TOOLS` 21 → 22, `RpcMethod` 21 → 22** (CORRECTED 2026-09-27 — the live census is **21**; this row's "19 → 20" was stale, as this file's own correction notes record). **This overrules `Q4`'s decline AND the pre-amendment "no later pass may re-open it without a new gate" clause — A-d5 IS that new gate** (`H-r14`). See the new `FOCUS-UI-ONLY-MCP-TOOL` and `PROHIBITION-5-IS-AN-ADOPTION-BOUND` rows in `docs/decisions.md` |
| **S-d13** | **`SCH-3` is ADOPTED as TWO units (A-d6) — `U-THEME` + `U-THEME-CONTROL`.** Architect ruling A-d6, verbatim in substance: *"SCH-3: All downstream apps are going to use theme settings. Keep the theme controls in update."* `U-THEME` is a **pure total `resolveTheme(setting, env)`** with the OS reading **injected** + a **declaration-only** applier whose attribute name is **caller-supplied** (no token values, no `data-theme` literal, no `matchMedia`, no store); `U-THEME-CONTROL` is an **AUTHORED provident appearance control in the foundation's own demo envelope** — dispatchable and MCP-visible through the **existing** tools, **no new tool and no new group**. **"Keep the theme controls" means exactly this here, and the authored control is REQUIRED by the repo's own UI constraint — not an exception to it.** **Persistence stays consumer-side: this repo owns no UI-config store** (`S-d4` intact; the fork's `UI-CONFIG-CARRIER` is the carrier). **It overrules `Q3`'s decline and retires the `U-THEME-MIN` escalation name.** See the new `THEME-MECHANISM-AND-AUTHORED-CONTROL` row in `docs/decisions.md` |
| **S-d14** | **The static-UI reading (A-d7) — app-state-derived chrome whose content is AUTHORED as provident graph data.** Architect ruling A-d7, verbatim in substance: *"Static as intended: UI elements derived from application state, not data/files, ex. menus, toolbars, dashboards."* **`AGENTS.md:23-34` and `docs/decisions.md:53` `UI-RENDERED-WITH-PROVIDENT` are UNCHANGED** — reading (b) (hand-authored HTML/CSS chrome) would need its own pass amending the project-wide constraint. **`SCH-1`'s region host STAYS declined** (blockers `(C)#1` + `(C)#6`, **not** prohibition 5). The **`SCH-9` host half is adopted as `U-SLOTHOST`** (opaque slot keys → containers holding caller-created nodes; caller-supplied order/attributes; own-node ownership; foreign siblings survive; unknown key ⇒ typed refusal; **no publish API**) while the **publisher/carrier half stays declined** (it authors content). See the new `UI-STATIC-MEANS-APP-STATE-DERIVED` row in `docs/decisions.md` |
| **S-d15** | **The browser-integration flow is ADOPTED as a THIRD gate leg (A-d8).** Architect ruling A-d8, verbatim in substance: *"Part of the use case for an electron app is that the browser integration makes the ssr shim unnecessary for testing because the front-end can be made MCP accessible. If this is not already part of the development flow, add it."* The flow is **two harness units**: **`U-REALDOM-BOOT`** (a new `npm run ui` leg booting the real Electron renderer under a controlled temp profile, driven over stdio MCP, obtaining **ONE** real measurement) and **`U-DIVERGENCE-EXT`** (the `H-r10` scenario-envelope channel + attribute-presence extractor, keeping the `divergence` leg's pinned **N=9** intact). **Hermeticity truth: isolation YES, headlessness NO** — declare the display prerequisite with an actionable failure; **do not add `show:false`, do not add a CI config**. **The shim is DEMOTED TO PRE-FILTER, not retired**, and the battery's migration to the real renderer is **out of scope**. See the new `REAL-DOM-UI-GATE-LEG` row in `docs/decisions.md` and `H-r18`/`H-r19` |

## Gate verdicts

| Step | Verdict | Blocking core |
| --- | --- | --- |
| Validity | **VALID-WITH-RESHAPES** | V-1 (fork/target cite conflation), V-2 (refuted `decisions.md` absence claim), V-3 (`inert` vs the `^0.2.1` pin), V-4 (`provident.focus` does not exist here); reshapes V-5..V-11 |
| Critique | **REJECT-AS-STRUCTURED** | C-1 (`SCH-1`'s live content is a host-side defect class), C-2 (all 13 units unreachable from this repo's two declared purposes), C-3 (criteria at an unobservable layer), C-4 ("no shell ⇒ node-layer only" is FALSE); reshapes C-5..C-11 |
| Architecture (pre-amendment) | **admission rule + the `SCH-1` split** | (A)/(B) admission; `SCH-1` SPLIT; eleven others REFILE/DECLINE; **zero PARK**; contract-shape ruling; shim ruling; security rulings — **admission rule SUPERSEDED BY A-d1; superseded for the per-item table by the amended re-issue row below** |
| Change-analysis (pre-amendment) | **GO-CONDITIONAL** | 1 adopted-reshaped, 12 refiled, `H-r1..H-r6` before any delegation; three residual disagreements adjudicated — **counts SUPERSEDED BY A-d1/A-d2/A-d3 (see the amended row below); `H-r2`/`H-r4`/`H-r5` corrections preserved** |
| **Architecture — AMENDED RE-ISSUE (2026-09-27)** | **amended admission rule (A)/(B)/(C) + the six prohibitions** | The re-issued ruling: the carve-out is read **functionally** (A-d1), so the admission rule gains clause **(C)** with six prohibitions (`S-d8`); the 13 per-item dispositions are **re-derived** (adopt `SCH-2`/`SCH-5`/`SCH-8`/`SCH-11`/`SCH-12`, split `SCH-1`, decline/refile `SCH-3`/`SCH-4`/`SCH-6`/`SCH-7`/`SCH-9`/`SCH-10`/`SCH-13`); the **node-local interaction contract shape** (`S-d9`); the **carve-out clarification** (a mechanism is outside the UI constraint *because it is not a UI element*; a content-authoring mechanism remains a review finding); and the **dissents** (the `setPointerCapture` narrow reading, `SCH-3`'s marginality, `SCH-13`'s decline under a maximal (C), and the honesty that A-d1 **widens this repo's own constraining text** rather than reading it). Preserved from the pre-amendment ruling: `H-r2`/`H-r4`/`H-r5`, the layer declarations, the `S-d3`/`S-d4`/`S-d5` substance |
| **Change-analysis — AMENDED (2026-09-27)** | **GO-CONDITIONAL** | **6 `SCH`-derived units adopted-reshaped + 2 engine prerequisite units = 8 units**; **6 `SCH` items declined/refiled**; **1 split**; **1 refile withdrawn**; **0 PARK**. Blocking set is now `H-r1..H-r13` (`H-r1..H-r6` preserved with `H-r3`/`H-r5` amended; `H-r7..H-r13` appended) before **any** delegation; **`U-ENGINE-PIN`/`U-ENGINE-DRIFT` sequence ahead of every shell-chrome unit**; the divergence-harness extension is a **named precondition** of `U-ENGINE-PIN`'s divergence half and `U-OVERLAY`'s real-DOM half. Adjudicated: the engine recon's "0.2.1 never calls `removeAttribute`" claim is **REFUTED** (three call sites at `node_modules/provident-ssr/dist/core/adapters.js:120`, `:187`, `:194` — read and confirmed this pass); the shim call is the scoped `H-r7` completion; the change-analysis's **override** of the architecture pass's marginal `U-THEME` adoption governs for `SCH-3` |

## Blocking reshapes `H-r1..H-r6` (owed to the fork before any delegation)

All six are **still binding**. The rows are restated verbatim as filed, each with
its current force under A-d1/A-d2/A-d3 appended as an `AMENDED` annotation.

| ID | Reshape | Resolves |
| --- | --- | --- |
| **H-r1** | **This repo owns the per-item disposition in its own voice**, with an explicit **"who owns it now"** column. The handoff's `filing verdict` field is the fork's; this record supersedes it for the 13 items. A later re-file at this repo must cite and supersede this record — **STILL BINDING, STRENGTHENED.** The amendment adds a **third disposition layer** (pre-amendment, post-amendment, and the architect's A-d1..A-d3), and this record now carries all three — **plus a FOURTH (A-d4…A-d8), which is the governing one and lives in the appended `Amendment record`.** The fork must read the **`Amendment record (A-d4…A-d8)` §2.2 per-item table** (or the `Layer` column, where no A-d4…A-d8 row overrides it), not the pre-amendment rows | C-1..C-11, the architecture ruling |
| **H-r2** | **Correct the per-cite `[target]`/`[fork]` repo attribution BEFORE any item is read as a target requirement.** `handoff §2` A3 (`:79`) and `SCH-1` adoption step (c) (`:182-184`) cite `src/renderer/runtime.ts:1143-1164` — a **FORK** file: **this repo contains NO `querySelectorAll` in `src/**`** (grep, this pass) and its `tearDownGraph` is `src/renderer/runtime.ts:735-753` (read: `:735` declares, the destroy/render/rebuild-id-index body ends `:753`; **no** `mount.querySelectorAll('#wiki-root')` sweep). Same conflation class: `mcp-server.ts:1791`/`:2247`/`:2248`/`:2268` (handoff `:724-725`, `:885`) — this repo's `src/main/mcp-server.ts` is **1101** lines and has **no `focus` match** — **STILL BINDING, plus ONE NEW ITEM:** the handoff's `§6.2` (`:213-222`) also **attributes a 508-line capture/`closest`-bearing shim to this repo**; this repo's shim is **112 lines with neither method** (read this pass: `src/shared/dom-shim.ts:30,41` are the only attribute accessors). Same misattribution class; `handoff:890,908` already corrects the *absence* half but not this one | V-1 |
| **H-r3** | **Retract two refuted claims and refile `SCH-12`.** (i) "the target's `docs/decisions.md` has **no** shell-chrome row" (handoff `§6.2` `:913`) is **REFUTED**: `docs/decisions.md:53` **IS** `DECIDED: UI-RENDERED-WITH-PROVIDENT` — the shell carve-out the handoff itself quotes at `:53-54` (**this repo, read this pass**; the file is 102 lines). **LINE-SHIFT NOTE (2026-09-27):** the amendment inserted ACTIVE rows *after* that row, so the row now sits at `docs/decisions.md:53` and the file is **60 lines**; `:46` refers to the same row pre-amendment. Every remaining `decisions.md:46` citation below is the pre-amendment anchor and resolves to `:53` today. (ii) the `SCH-12` #4 `inert` criterion (`:661-663`) **does not hold against the `^0.2.1` pin** (`package.json:23`, read) — the fork's `inert`-expressibility fact came from its own installed copy (`handoff §6.3` item 2, `:924-926`, self-declared NOT re-read) and belongs to the fork's `PS-1` stream. **Refile `SCH-12` to the package request stream under ONE owner** (the `inert`/a11y documentation half today splits across the fork's `PS-1` and `SCH-12`) — **AMENDED (A-d2): the two retractions stand; the `SCH-12` refile is WITHDRAWN.** `inert` is a **closed capability floor as of `provident-ssr` 0.4.1/0.5.1** (`BOOLEAN_ATTRS`, **27 members counted**, `'inert'` at `:57` — read this pass: `../Preempt-Providence/src/core/adapters.ts:45-73`; the DOM branch at `:292-302`, the SSR mirror at `:513`), so the refile's decisive evidence is spent: `SCH-12`'s mechanism half is **adopted as `U-OVERLAY`** and the **residual package/documentation half stays with the fork's `PS-1` stream** (plus the focus-trap half, which needs `document.activeElement` + a focusable walk and is **not** adoptable here — `H-r5` forbids that shim growth). Note the pin has **not** moved yet: `package.json:23` still reads `^0.2.1` until `U-ENGINE-PIN` lands. **⟶ SUPERSEDED BY A-d4…A-d8 (§4.1): the pin HAS MOVED** — `package.json:23` now reads `^0.5.1`, the lockfile resolves `provident-ssr-0.5.1.tgz`, and the installed copy is `0.5.1` (all read 2026-09-27). What remains of `U-ENGINE-PIN` is the **shim completion + the host guard**, which are **still RED**; the unit is **PARTIALLY LANDED**. | V-2, V-3, C-17, C-18 |
| **H-r4** | **The single adopted unit must have a decision-complete spec at the `docs/specs/renderer-backend-hardening.md` template** (Status/Source block, `§1 Scope`, `§2 The surface (exact)`, `§3 Behavior (every state/fail-state)`, `§4 Verify (states)`, `§5 Wiring`, `§3a Adversarial findings`) carrying: the **red-set plan** (per-unit, RUN and REPORTED before implementation — RCA-1), the **trio plan** (`npm test` / `npm run typecheck` / `npm run build` — `AGENTS.md` item 4), the **explicit falsification/stop condition**, and the **explicit zero-row PBT decision** (this repo has **no PBT harness** — do not imply one). Planned path: `docs/specs/mount-invariant-guard.md` — **STILL BINDING, NOW OWED FOR TWENTY UNITS, not one — and the A-d4…A-d8 amendment adds TEN more spec paths** (`docs/specs/{zones,census,gutter,relocate,container,slothost,theme,theme-control,focus-model,focus-tool}.md` plus `ci-ui-leg.md`). Each unit's spec path is named in the governing `Amendment record (A-d4…A-d8)` §3 unit plan and in `docs/next-steps.md` `## OPEN`; every spec additionally carries an `H-r8` **`§0 Contract-prohibitions`** block (the six prohibitions as a per-unit assertion table) | C-10, C-11 |
| **H-r5** | **Declare and hold the verification layer.** No shim expansion: `src/shared/dom-shim.ts` is 112 lines (read) with **no** `closest`, `querySelector(All)`, `dispatchEvent`, pointer-capture, pointer/dblclick, `matchMedia`, `activeElement`, `inert`, `setProperty`, or render-count seam (grep over the file, this pass); `setAttribute` stringifies (`:30-39`) and `getElementById` **auto-creates** (`:95-98`) so "declared/absent" is unrepresentable in the shim. Real-DOM claims go on the offscreen Electron `divergence` leg (`package.json:18`, `docs/specs/ci-divergence-leg.md:15-25`) — which today has **no chrome to drive**. One exception was considered and **dropped: no render-count API is adopted either** — **AMENDED, NOT WEAKENED:** the flat "no shim expansion" now carries **exactly ONE scoped carve-out, `H-r7`** (`removeAttribute`, admitted only on a named engine call site in a dist this repo installs **or** a red run that throws; `hasAttribute` only if a red run names a real call site). Every other member in this row's list stays forbidden; the render-count exception stays dropped. On the honest reading, `H-r5`'s exception list is unchanged in *kind* — `removeAttribute` is attribute bookkeeping, not browser emulation (see `S-d3`) | V-8, V-9, C-3, C-4, C-13 |
| **H-r6** | **The refile map is BINDING.** Eleven items → **the fork's namespace** with the handoff's dependency edges preserved; `SCH-12` → **the package stream**. No re-filing at this repo without citing and superseding this record — **STILL BINDING, RE-ISSUED:** the map is **re-derived** and the owner of **five** items changes. Post-amendment: **`SCH-12`'s package-stream refile is WITHDRAWN** (adopted as `U-OVERLAY`); **`SCH-2`, `SCH-5`, `SCH-8`, `SCH-11` move FROM the fork TO this repo**; the fork-side rows (`<Astrographer>/docs/pending.md`, `<Astrographer>/docs/decisions.md`) must be told to **withdraw four requests** (`SCH-2`, `SCH-5`, `SCH-8`, `SCH-11`); the dependency edges that **dissolve** (so no later pass reinstates them) are `SCH-2 → SCH-6`/`SCH-7` (both declined; their surviving properties are the adopted session's), `SCH-4 → SCH-8` (`SCH-8`'s census half refiled), `SCH-4 → SCH-11`/`SCH-5` via `orderOf` (each adopted contract takes an injected `orderOf`-shaped callback as its own parameter, so `C-15`'s cycle is broken rather than inherited), and `SCH-9 → SCH-11` (`SCH-9` declined). `SCH-4`'s `orderOf` remains **fork-owned** | C-2, C-17, C-18, S-d6 |

## Blocking reshapes APPENDED by the amendment (`H-r7..H-r13`)

These are **new conditions**, each stating what it resolves and the artifact that must exist.

| ID | Condition | Resolves | Artifact that must exist |
| --- | --- | --- | --- |
| **H-r7** | **The verification layer is amended for ONE method.** `ShimElement.removeAttribute` is a **justified harness completion**, admitted only on a **named engine call site in a dist this repo installs** (evidence at the current pin: `node_modules/provident-ssr/dist/core/adapters.js:120`, `:187`, `:194` — read and confirmed this pass; at 0.5.1 a fourth site plus `BOOLEAN_ATTRS`, `(engine recon)`) **or a red run that throws**. **No other member may be added**; `hasAttribute` **only if a red run names a real call site**. A `props.`/`css:` mutation guard is permitted as a red-first `HOST-OP-REJECT`-shaped rejection (`{status:'rejected'}`, never a throw — `docs/decisions.md:42`) and is **defence in depth, never a substitute** for the completion. Admission test restated: **both** a named call site **and** a named forbidden category check; any addition without both fails the review | The collision between the engine recon and `H-r5`; the ⛔-before-assert red-set ordering; the temptation to grow the shim into a browser emulator | An **ACTIVE `docs/decisions.md` row** (the scoped carve-out) + the amended `S-d3`/`H-r5` text in this record |
| **H-r8** | **Every adopted unit's contract must survive the six prohibitions as a testable assertion set, one row each** — no consumer vocabulary as symbols/enumerated constants; no app UI content authored; no policy defaults; no UI-config store or persistence; no new MCP surface; no criterion unverifiable on a layer this repo owns | The (C) admission rule's enforceability — without this, (C) becomes an unlimited licence to adopt anything a fork asks for | A shared **`§0 Contract-prohibitions`** block in each adopted unit spec (`docs/specs/mount-invariant-guard.md`, `gsession.md`, `menulib.md`, `projection.md`, `listhost.md`, `overlay.md`), with a per-unit six-row table and the test that pins each |
| **H-r9** | **A-d3's narrow reading is binding:** capture is **0 before the interaction is established**, **permitted after**, **per-control opt-in** (`capture?: boolean`). Named in the `U-GSESSION` spec and carried into the fork's refile notes for `SCH-2`/`SCH-6`/`SCH-7` | The `setPointerCapture` ambiguity — stops a later pass choosing the reading silently | The `U-GSESSION` spec's capture section + the `H-r1`/`H-r2` correction package's row edits (the fork restates `SCH-2` row #2 as "before **establishment**", not "before threshold", and makes `SCH-2` row #4's `lostpointercapture` half conditional on opt-in, re-pointing the otherwise-case to `pointercancel` + a window-leave path) |
| **H-r10** | **The engine pin is a prerequisite, and the divergence leg is extended with a scenario-envelope channel + an attribute-presence extractor.** The extension: (1) a parameterized scenario envelope `scenarioEnvelope(kind)` called identically on both legs; (2) an **attribute-presence extractor** over `renderedHtml` (the **set** of attribute names present, compared set-wise) — **mandatory**, because the real DOM drops the value on serialization (`<div hidden>`) while the shim emits `hidden="true"` from `this.attrs` (`src/shared/dom-shim.ts:79`, read): a naive `includes('hidden="true"')` row is a guaranteed false red; (3) a `props` falsy-toggle scenario so the **removal** half runs on a real DOM; (4) **precondition:** `U-ENGINE-PIN`'s `removeAttribute` completion must have landed, or the shim leg throws during `provident.load` and the failure is misattributed to the real DOM | The real-DOM gap; the guaranteed false red from real-DOM serialization of boolean attributes; the second independent shim-vs-DOM divergence the recon did not name | `docs/specs/engine-pin.md` §"divergence" + an **amendment to `docs/specs/ci-divergence-leg.md`** (its `:15-25` currently declares no chrome to drive) naming the `scripts/electron-divergence.mjs` extension |
| **H-r11** | **No unit may claim the `bodyRuns`/`BARE-TEXT-EMIT` surfaces are verified.** 0.5.1 adds `BARE-TEXT-EMIT` (0.4.0) and `bodyRuns` drop diagnostics (`console.warn` at the emit resolver, **process-level** — not per-document — dedup) `(engine recon)`; this repo authors **no** `type:'text'` node and **no** `bodyRuns` `(engine recon)`. Two obligations follow: no overclaim, **and** the host must know a render can now write `console.warn` — an absent warn line must **not** be read as "nothing dropped" | A "the engine is fully exercised" overclaim; a harness that silently mis-reads the new diagnostics channel | A `docs/pending.md` row for the diagnostics channel + a line in `docs/specs/mcp-endpoint.md`'s render section (the `renderedHtml`/`get_markdown` surfaces) |
| **H-r12** | **`UNDO-REDO-DESTROY-STATUS` is CONFIRMED STILL OPEN at 0.5.1** — the destroy-undo branch is an **empty no-op** that still falls through to `report('applied', …)`. The upstream repo classifies the no-op itself as **contract-correct** while the `applied` **status** is **unaddressed**: the two repos do not disagree about the branch, only about whether the reporting shape is a defect — **⟶ SUPERSEDED (2026-09-27, the wave-B DONE pass): FALSE ON BOTH ITS FACT HALVES — the row was measured, and it is neither open nor falling through.** Measured at the installed `provident-ssr@0.5.1` on the permitted route (`Runtime.journal('undo')`): the destroy-undo reports **`{"status":"no-op","scheduledDirtied":[],"baseBoundary":false}`** — **it does NOT report `applied`**, and the claimed fall-through **cannot fire**: the engine's **resolve guard** returns first (`node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`) because `destroy` deleted the node (`:1066`), so the `destroy` branch (`:1549-1551`) and the `:1649` `return this.report('applied', dirtied)` are **UNREACHABLE for a destroy entry**. **The silent-`applied` false-success is NOT reproducible at `0.5.1` by any route**; the row is **CLOSED as delivered-by-the-resolve-guard**, and the residue is an **optional upstream dead-code tidy-up only** (no new round, no upstream issue, no host change owed). **What survives from this row unchanged:** the *"check, do not guess"* obligation and `RK-11`'s misread warning — **a version move must still not be read as a resolution**, which is why the claim was re-measured rather than assumed. **Disposition records:** `docs/specs/engine-drift-measurements.md` `M-31` (`DRIFTED`); `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`; `docs/defects.md` `## CLOSED (not reproducible at 0.5.1)`; `docs/HANDOFF.md` Round 9; `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS`. **This is a status correction, not a requirement change — no condition of this record is amended.** | The tracker obligation "check, do not guess" — a version move must not be read as a resolution | `docs/defects.md` `UNDO-REDO-DESTROY-STATUS` annotated "re-verified against 0.5.1 by the engine-pin pass" + `docs/HANDOFF.md` Round 9 annotated with the corrected 0.5.1 dist line numbers. **⟶ DISCHARGED (2026-09-27): the annotation obligation was met and then superseded by the measurement — the defect row now sits in `docs/defects.md`'s `## CLOSED (not reproducible at 0.5.1)` section and `docs/HANDOFF.md` Round 9 carries the upstream-facing correction** |
| **H-r13** | **The adjacent repo's `.npmrc` contains a plaintext npm publish token — rotate it.** Not this pass's scope, but it must be recorded or it will be lost. **The token must NEVER be copied into this repo** — record only the **fact** and the **rotation duty** | A live credential sitting on disk in the adjacent folder | An architect-facing advisory: a `docs/pending.md` row recording the **fact + rotation duty, never the token** (confirmed present this pass; the file content is deliberately not reproduced anywhere in this repo) |

## Blocking reshapes APPENDED by the A-d4…A-d8 amendment (`H-r14..H-r20`)

These are **new conditions** from the second architecture amendment round. Each states what
it resolves and the artifact that must exist. `H-r1..H-r13` stay binding; **`H-r14`'s
clarification governs how `H-r8`/`S-d8`'s prohibition 5 is to be read from here on**, and
`H-r19` corrects a claim inside a spec `H-r1..H-r13` did not touch.

| ID | Condition | Resolves | Artifact that must exist |
| --- | --- | --- | --- |
| **H-r14** | **Prohibition 5 is an ADOPTION BOUND, and the focus tool's new-gate authority is recorded.** `S-d8`/`H-r8` prohibition 5 said: a **(C)-admissible UNIT's own contract may not itself require a new MCP surface** — a mechanism whose contract is "an agent calls my new tool" is not adoptable *as a unit*. **It never said this repo may never add a tool** — it has added tools repeatedly and legitimately (`provident.journal`, the `mcp://` resources, `code.loadBatch`, the `module.*` trio), each through its own gate. **A-d5 authorises a tool AS ITS OWN UNIT** — a different gate (the six-site wiring + the MCP-contract amendment) — and it **relaxes prohibition 5 for no other unit.** The pre-amendment `docs/pending.md` `SCH-13` row's "no later pass may re-open it without a new gate" clause is **satisfied by A-d5 itself**: that is the new gate | The `SCH-13` decline reading as a **permanent tool ban** for every future unit — the misreading that would also have blocked `U-FOCUS-TOOL` | The `PROHIBITION-5-IS-AN-ADOPTION-BOUND` + `FOCUS-UI-ONLY-MCP-TOOL` ACTIVE rows in `docs/decisions.md`; the `H-r8` prohibition-5 text restated as a unit-adoption bound; the `docs/pending.md` `SCH-13` row annotated **SUPERSEDED BY A-d5** |
| **H-r15** | **The `SCH-9` host/publisher SPLIT is binding and must not be re-merged.** The **host** half is adopted as **`U-SLOTHOST`** (host-only, mechanism-only: opaque keys → containers holding **caller-created** nodes, caller-supplied order/attributes, own-node ownership, foreign siblings survive, unknown key ⇒ a typed refusal, **no `publish` in the contract**); the **publisher/carrier** half stays **DECLINED** because it authors the element's text and slot content (`(C)#2`, `AUTHORS-UI-CONTENT`). **The hazard to name:** `U-SLOTHOST` must not grow per-zone/per-pane semantics or a mirror-class taxonomy (`is-empty`/`is-minimized`/`is-revealed`) — that would resurrect `SCH-10`/`SCH-4` under a new name, and its `§0 Contract-prohibitions` table must assert their absence. `V-7`'s contradiction ("publish replaces the element" vs foreign-sibling-survives) is **resolved by `U-SLOTHOST`'s own-node ownership** and stays a hard row in both units | A later pass reading "the slot host was adopted" as "the carrier was adopted", or re-merging the two halves to satisfy one fork request | `docs/specs/slothost.md` (**OWED**) with its `H-r8` six-row prohibition table; the amended `SCH-9` per-item row (part-adopted) in this record; the `U-SLOTHOST` row in `docs/pending.md` + `docs/FORKER.md` |
| **H-r16** | **The theme units and the persistence BOUNDARY are binding.** `U-THEME` (pure total `resolveTheme(setting, env)` + a **declaration-only** applier with a **caller-supplied** attribute name; **no** token values, **no** `data-theme` literal, **no** `matchMedia`, **no** store) and `U-THEME-CONTROL` (an **authored** appearance control in the demo envelope, visible/drivable through the **existing** tools; **no new tool, no new group**). **The persistence boundary:** persistence stays **consumer-side** — **this repo owns no UI-config store** and `S-d4` is intact; if this repo ever needs to remember a theme across restarts it must gain a store, and **that is a new gate that must not be smuggled in via `U-THEME`/`U-THEME-CONTROL`**. **Why two units and not one:** `U-THEME` is a (C)-mechanism with six prohibitions and a consumer-agnostic contract; `U-THEME-CONTROL` is app UI content authored in **this repo's own graph** (permitted — `AGENTS.md:23-34` `REQUIRE`s provident-authored UI) and must not be able to leak a consumer token name or the `data-theme` literal into the mechanism. Merging them would put prohibition-2 content inside a (C) contract — the exact `C-16` class (`RK-10`) | `U-THEME-CONTROL` being read as an exception to the UI constraint (it is the constraint's own output), and a token literal or a `matchMedia` read leaking into the (C) mechanism | `docs/specs/theme.md` + `docs/specs/theme-control.md` (**OWED**) with the six-row prohibition table each; the `THEME-MECHANISM-AND-AUTHORED-CONTROL` ACTIVE row; the demo-envelope census drift measured as `U-THEME-CONTROL`'s own red row |
| **H-r17** | **The static-UI reading answers `Q6`, and nothing in `AGENTS.md` changes.** A-d7's sentence supports **reading (a): app-state-derived chrome whose content is AUTHORED as provident graph data**. **`AGENTS.md:23-34` and `docs/decisions.md:53` `UI-RENDERED-WITH-PROVIDENT` are UNCHANGED** — reading (b) (hand-authored HTML/CSS chrome) would require an edit to `AGENTS.md`, a supersession row for `:53`, a new falsification story for "an element outside the graph is invisible to `provident.dispatch`/`get_rendered_html`", and a rewrite of the `:54` mechanism-vs-UI-element test — **not proposed**. **Consequence for the hosts, stated decisively:** menus/toolbars/dashboards are **containers + content**, and the two halves have different admissibility — **region host NO** (stays declined: a region declaration is a consumer-owned set with consumer names ⇒ `(C)#1`, and its criteria are API-shape ⇒ `(C)#6`; its one real property, one in-flow mount, is `U-MOUNTGUARD`), **slot host YES** (`U-SLOTHOST`). **A dashboard/toolbar use case changes NO zone/track contract:** `U-PROJ` still takes an injected write sink and consumer-supplied variable names/units, so a dashboard's custom properties are projected by the consumer's data through the repo's pure applier, **with no zone vocabulary anywhere** | `Q6` staying open and the region host being re-filed by a later pass on the strength of "menus/toolbars are static UI" | The `UI-STATIC-MEANS-APP-STATE-DERIVED` ACTIVE row; the `Q6` row in `docs/next-steps.md` marked **ANSWERED**; the amended `SCH-1` region-half row in `docs/pending.md` |
| **H-r18** | **The `ui` leg's placement, ordering and ownership are binding — and the census re-parameterisation rule.** The leg is a **new `npm run ui`** (`package.json` scripts, beside `battery:17`/`divergence:18`), **not** a replacement and **not** a `divergence` variant: `divergence` is an **identity check** (shim ≡ real on N pinned structural properties), `ui` is an **observational/measurement** leg. **Keeping `divergence`'s N=9 identity intact is a HARD constraint.** `ui` is **outside the trio** (exactly as `battery`/`divergence` are), its **precondition order** is `U-ENGINE-PIN` green → `U-REALDOM-BOOT` → `U-DIVERGENCE-EXT`, its **run order** is `build` → `ui`, and its **authority order** is honest: a `ui` green is **not stronger than a `divergence` red** — the leg's own precondition row is "`npm run divergence` is green for the same built tree", and where it is not, the leg reports **PRECONDITION-FAILED**, not a measurement. **Ownership:** leg-owned code = a new shared Electron-spawn helper (extracted from the twice-duplicated spawn in `scripts/electron-divergence.mjs`) + `scripts/electron-ui.mjs`; spec ownership = a new `docs/specs/ci-ui-leg.md` **plus** the `ci-divergence-leg.md` amendment; unit ownership = `U-REALDOM-BOOT` (leg) and `U-DIVERGENCE-EXT` (`H-r10`). **THE CENSUS RE-PARAMETERISATION RULE (record it so no later pass reads it as weakening `U-ENGINE-PIN`'s red):** `tests/engine-pin-version.test.ts`'s census rows (`S1`/`S3`/`R-15b`, `:79-151`) are re-parameterised from a **numeric freeze** (`ALL_TOOLS.length === 21`) to a **SET-EQUALITY freeze against a named list**, **in the same commit as the tool** — legitimate because the invariant it pins ("the retarget itself added no surface") is preserved exactly and the rows still fail for any **unlisted** name; and `docs/specs/engine-pin.md`'s `§0` prohibition-5 row (now `:253`; the pre-amendment `:80` anchor was corrected 2026-09-27) moves from a **count freeze** to a **diff freeze** ("this unit adds none of the following: … no tool, no group, no RPC member") | The `ui` leg being folded into `divergence` (making "N=9" meaningless), and the census re-parameterisation being misread as a post-hoc weakening of the engine-pin red | `docs/specs/ci-ui-leg.md` (**OWED**) + the `ci-divergence-leg.md` amendment (`H-r19`); the `REAL-DOM-UI-GATE-LEG` ACTIVE row; the `U-REALDOM-BOOT`/`U-DIVERGENCE-EXT` rows in `docs/next-steps.md`; the census-re-parameterisation note carried in both the `U-FOCUS-TOOL` unit row and `docs/specs/engine-pin.md` |
| **H-r19** | **The hermeticity truth replaces the false claim — and the `ci-divergence-leg.md` correction is owed.** **The two-part truth:** (i) **isolation IS achievable and now required** (a temp `userData` profile so gate groups and settings are deterministic, no network, no writes outside the temp dir); (ii) **headlessness is NOT achievable in this environment** and is declared as an **environment prerequisite** (`DISPLAY`, or an xvfb wrapper the operator supplies) **with an actionable failure message, never a silent skip**. The false claim is verified: the app's `BrowserWindow` has **no `show:false`/offscreen option** and the divergence leg spawns with `--ozone-platform=x11` + `DISPLAY || ':0'` + `ELECTRON_DISABLE_SANDBOX=1` `(engine recon)`, while `docs/specs/ci-divergence-leg.md:18,24-25,49-50` claims "headless, offscreen … HERMETIC (no network, no display)". **This repo has NO CI config** (`.github/**` → no files) — "CI leg" here means "a script a human/agent runs", so the ruling binds the **spec text and the failure message**, not a runner. **Do not add `show:false` and do not add a CI config in this pass** | A spec claim the code falsifies, inherited by the new `ui` leg, and a leg whose environment prerequisite is undeclared (the `RK-7` flake class) | The corrected `docs/specs/ci-divergence-leg.md` (the two-part truth + the `ui`-leg boundary note, **N=9 unchanged**); the display prerequisite recorded in `docs/specs/ci-ui-leg.md` and in the `docs/pending.md` `ui`-leg row; the `docs/FORKER.md` non-trio leg entry |
| **H-r20** | **The count identity is re-issued and every doc table that carries a count moves with it.** **`ALL_TOOLS` 21 → 22; `RpcMethod` 21 → 22** (CORRECTED 2026-09-27 — the live census is **21**; this row's "19 → 20" was stale)**; the default-gate registered subset 7 → 8** (read×7 + dispatch×1). The unit figure moves **8 → 20**, the item figure stays **13**, and `docs/decisions.md` `SHELL-CHROME-HANDOFF-DISPOSITION`/`MCP-ENDPOINT` must be amended in the **same pass** as any later count change. **`U-ENGINE-PIN` is PARTIALLY LANDED** — record exactly that: the pin moved, the red run is live, the shim half and the guard are still RED. **The devDependency scope change is an UNPLANNED SCOPE CHANGE with an open accept-or-revert decision** (see the amendment record's recorded-facts section) that **contradicts `U-ENGINE-PIN`'s `§2.1` "one dependency line"** — the spec must be amended or the install reverted; **do not revert anything in this pass** | Every stale count in the trackers (`12`/`15`/`18`/`21`, `8 units`), and a later pass reading `U-ENGINE-PIN` as un-started or fully-landed | `docs/decisions.md` (`SHELL-CHROME-HANDOFF-DISPOSITION` amended, `MCP-ENDPOINT` count amended, `ENGINE-PIN-0.5` pin clause corrected); `docs/pending.md` §A rewrites + the devDependency row; `docs/next-steps.md` `## OPEN` re-issued; `docs/FORKER.md` §3/§4 re-derived; `docs/specs/mcp-server-gate.md` + `README.md` count corrections |

## Per-item disposition (`SCH-1..SCH-13`)

Disposition vocabulary: **ADOPT-RESHAPED** (this repo lands it) · **DECLINE + REFILE**
(this repo declines; the named owner takes it) · **SPLIT** (part adopted, part declined).
"Owner" is where the work legitimately lives under the S-d1 admission rule.
**Every row below is the PRE-AMENDMENT layer** (`Layer` = **pre-amendment**) and is
kept for provenance; the **post-amendment** layer follows it in a second table with
the same 13 items. Read the `Layer` column first in either table — the fork must
not read a pre-amendment row as the current disposition.

| Item | Layer | Disposition | This repo's owner | Reshape / falsification | Who owns it now |
| --- | --- | --- | --- | --- | --- |
| `SCH-1` `SHELL-REGION-HOST` (`SC-1`, P1) | **pre-amendment** | **SPLIT** — invariant half **ADOPT-RESHAPED (PENDING ARCHITECT GO-AHEAD — not yet delegable)**; region-host half **DECLINE + REFILE** | the adopted half: this repo (unit spec owed per `H-r4`; no file changed this pass) | Admission (A): this repo is its own consumer — `Runtime.tearDownGraph` `src/renderer/runtime.ts:735-753`, called by all four re-derive paths (`:304` `loadEnvelope`, `:331` `loadDoc`, `:519` `teardown`, and `codeLoad` at `:938` → `:304`; `codeLoadBatch` `:974`), and the invariant backs `get_rendered_html`, which reads `mount.innerHTML` (`:1074-1075`, read). **Falsification:** cycle-2 load yields **2** matching root elements ⇒ a HOST fix is owed; **1** ⇒ detection + pin only, and **no guard ships if the adversarial pass finds no reproduction**. Region-host half: `ShellRegionName`/`ShellRegionSpec`/`ShellRegions` are consumer vocabulary with no in-tree consumer | this repo (invariant half, pending go-ahead) / the fork — its own spec namespace (region-host half) |
| `SCH-2` `GESTURE-DELEGATE` (`SC-2`, P1) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer: this repo ships **no** pointer-gesture controller, capture, or `dblclick` surface (`handoff §6.2` `:904`, an absence claim the validity pass preserved as CORRECT); the criteria need `closest`/capture/pointer-driving the shim does not have (`H-r5`) | the fork — its own spec namespace |
| `SCH-3` `THEME-TOKEN-LAYER` (`SC-4`, P1) | **pre-amendment** | **DECLINE + REFILE** (too thin, wrongly targeted) | — | Its material is a **4-line pure resolver** in the fork's 38-line `theme.ts` (`handoff §3.3` `:242` cites `theme.ts:12`); a self-consumer route would force this repo to grow an **appearance control** that `docs/decisions.md:53` requires to be **provident-authored** (this repo's own constraint, read), **plus a UI-config store it must not acquire** (S-d4). The pure `resolveAppearance(setting, env)` shape stays a **CANDIDATE only** (`docs/pending.md`) | the fork — its own spec namespace |
| `SCH-4` `ZONE-TRACK-CONTRACT` (`SC-5`, P1) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer (no zones/tracks/gutters ship here); the adopted-candidate half would be a **second authority** over emptiness alongside the fork's census (V-13); it also defines `orderOf`, which `SCH-5`/`SCH-11` consume (C-8) | the fork — its own spec namespace |
| `SCH-5` `MENU-CATALOG-CONTRACT` (`SC-7`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | The builder imports no `electron`/`fs` and routes clicks by `id` — but the consumer is the fork's app menu and dialog; this repo ships no `Menu`/dialog usage (`handoff §6.2` `:899-900`, absences the validity pass preserved). Contract shape is consumer-vocabulary (`buildMenuFromCatalog`, `H-r6` owner map) | the fork — its own spec namespace |
| `SCH-6` `GUTTER-RESIZE-CONTROLLER` (`NEW — NOT GATED`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer; built on `SCH-2` (C-8 dependency edge); its revert unit is fiction once `SCH-7` depends on it (C-9) | the fork — its own spec namespace |
| `SCH-7` `PANE-RELOCATE-GESTURE` (`NEW — NOT GATED`, P1) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer (no panes/zones/reveal set); `createRelocateController` leaks consumer vocabulary into this repo's types (contract-shape ruling) | the fork — its own spec namespace |
| `SCH-8` `LAYOUT-STATE-PROJECTION` (`NEW — NOT GATED`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | `projectLayoutVars`/`applyVarsToRoot` fail **ownership** (no in-tree layout state) though **not shape** (contract-shape ruling); `SCH-4`'s census rule is its dependency and is itself declined | the fork — its own spec namespace |
| `SCH-9` `SHELL-STATUS-CARRIER` (`NEW — NOT GATED`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | (i) A **host-written status carrier** is incompatible with this repo's UI constraint (`AGENTS.md:21-34`, `docs/decisions.md:53`); (ii) `SCH-9` #2's "publish replaces the element" contradicts `SCH-11` #1's foreign-sibling-survives rule (V-7); (iii) `SCH-9` extends `SCH-1`'s spec, so a decline costs more than its own fallback (C-8) | the fork — its own spec namespace |
| `SCH-10` `ZONE-CONTAINER-CHROME` (`NEW — NOT GATED`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer (no zone containers); `zoneContainerChrome`/`applyGestureContainment` leak consumer vocabulary; containment is already deliverable as consumer CSS (the handoff's own P1/P2 split, `:589-590`) | the fork — its own spec namespace |
| `SCH-11` `TAB-STRIP-SHELL` (`NEW — NOT GATED`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | No in-tree consumer: this repo ships **no** tab strip (**no `querySelectorAll`, no tab module, no `matchMedia`** — grep over `src/**`, this pass); `createTabStripHost` leaks consumer vocabulary; its own #1 criterion is the one `SCH-9` #2 contradicts | the fork — its own spec namespace |
| `SCH-12` `OVERLAY-FRAME-PRIMITIVE` (`SC-3`, P1) | **pre-amendment** | **DECLINE + REFILE** (package request stream — **WITHDRAWN by A-d2**, see the post-amendment table) | — | The `inert` criterion (its #4) presumes a `provident-ssr` 0.5.x capability; this repo pins `^0.2.1` (`package.json:23`) and the fork's own note says the fact came from its installed copy, NOT re-read (`handoff §6.3` item 2, `:924-926`). The a11y half is a **package/documentation** request, and today it is split across the fork's `PS-1` and `SCH-12` with no single owner — `H-r3` gives it one | the package request stream (one owner), via the fork's `PS-1` |
| `SCH-13` `FOCUS-SEAM` (`SC-6`, P2) | **pre-amendment** | **DECLINE + REFILE** | — | Its #1 **MCP-path/strip-path equivalence** presumes a `provident.focus` tool **this repo does not ship**: `ALL_TOOLS` is **21** names (`src/main/mcp-server.ts:281-303`, read) and a `focus` grep over that file returns no match (this pass). The fork's own cites are fork-side (`handoff :724-725`) | the fork — its own spec namespace |

### Amended per-item disposition — the POST-AMENDMENT layer (governing)

`Layer` = **post-amendment**. These 13 rows are the current dispositions under
A-d1/A-d2/A-d3 and the amended admission rule (`S-d8`); they **supersede** the
pre-amendment rows above. "Owner" is where the work lives under (A)/(B)/(C).

| Item | Layer | Amended disposition | Unit | Reshape / falsification | Who owns it now |
| --- | --- | --- | --- | --- | --- |
| `SCH-1` `SHELL-REGION-HOST` (`SC-1`, P1) | **post-amendment** | **SPLIT** — invariant half **ADOPTED-RESHAPED**; region-host half **DECLINED + REFILED** | `U-MOUNTGUARD` (invariant half) | Invariant half: admission **(A)** (this repo is its own consumer — `Runtime.tearDownGraph` `src/renderer/runtime.ts:735-753`, re-derive sites `:304`/`:331`/`:519`, `codeLoad` `:938`; backing read `mount.innerHTML` `:1074-1075`). **Falsification (binding, unchanged):** cycle-2 load into one mount ⇒ **2** engine-emitted roots ⇒ a **HOST fix is owed**; **1** ⇒ detection + pin only, and **no guard ships if the adversarial pass finds no reproduction**. Region-host half: `ShellRegionName`/`ShellRegionSpec`/`ShellRegions` fail **(C)#1** (a consumer-specified region set) and **(C)#6** (API-shape criteria plus a render-count row this repo refuses), and are **redundant for the invariant they exist to support** (a declared region sits outside the mount, so root counting is unaffected) | this repo (invariant half) / the fork — its own spec namespace (region-host half) |
| `SCH-2` `GESTURE-DELEGATE` (`SC-2`, P1) | **post-amendment** | **ADOPTED-RESHAPED** | `U-GSESSION` | **The requested mechanism is REJECTED per A-d3:** no document-delegated `pointerdown`, no per-event `closest(selectors)`, no capture at `pointerdown`. Ship the **node-local interaction session** (consumer-agnostic contract, injected event source, every start listener on its own control element, gesture-scoped tracking listeners opened ONLY between start and end, exactly one commit per gesture, `dispose()` restoring the listener baseline). Criteria: **zero** document-delegated listeners · **zero** `closest`/`querySelector` calls · **zero** capture calls before establishment · no `selectors`/`threshold`/`data-zone`/`pane-collapse-toggle` vocabulary (the six prohibitions) · no store, no persistence. F-1 survives **structurally** (no code path can retarget a press's `click`); the **behavioural** half needs the divergence leg and its harness precondition | this repo |
| `SCH-3` `THEME-TOKEN-LAYER` (`SC-4`, P1) | **post-amendment** | **DECLINED + REFILED** — reason `TOO-THIN-WRONGLY-TARGETED` (the **(C)-admissibility** of a pure resolver is noted, not disputed) | — (no `U-THEME`) | **The change-analysis's override governs.** The architecture pass would have adopted it as a **marginal `U-THEME`** (admissible under (C)); the change-analysis **overrode** that: the material is a **4-line pure resolver** inside the fork's 38-line `theme.ts`, there is **no in-tree consumer**, and adopting it would publish a shell-chrome contract **reverse-engineered from one consumer implementation** — the **`C-16` defect class** the gate indicted — at the price of a full 7-gate cycle for ~40 lines; two of its own rows also push against `S-d4` (persistence). **Architecture pass's dissent, one clause:** it accepts the downgrade *without* changing any other ruling and had placed the unit last for exactly that reason. The pure `resolveAppearance(setting, env)` shape stays a `docs/pending.md` **CANDIDATE, annotated `PROMOTION DECLINED THIS PASS`** (the `§4.2` escalation path `U-THEME-MIN` keeps it live: three rows — truth table over an injected `prefersDark`, one attribute write on a consumer-provided root, an explicit no-store/no-persistence assertion) | the fork — its own spec namespace |
| `SCH-4` `ZONE-TRACK-CONTRACT` (`SC-5`, P1) | **post-amendment** | **DECLINED + REFILED** — reason `APP-DATA-NOT-MECHANISM` | — | Its real input is a **pane census** = app data (the handoff itself: "the foundation must not learn the registry"), so `isEmpty(zone)` degenerates to `count === 0`; its real content is the **consumer's CSS** (the four `:has()` rules + the collapse-override declaration). Fails **(C)#1** and **(C)#2**, and is not OS/geometry/interaction mechanics. `V-13`'s second-authority finding stands unresolved | the fork — its own spec namespace (its `layout-state` module stays the sole emptiness authority) |
| `SCH-5` `MENU-CATALOG-CONTRACT` (`SC-7`, P2) | **post-amendment** | **ADOPTED-RESHAPED** | `U-MENULIB` | The strongest OS-integration claim in the set: catalog items are **consumer data**, `platform` is an **injected** parameter, the picker is an **injected seam**, and the darwin/non-darwin shape rule is genuine OS integration. Acceptance: the builder imports neither `electron` nor `fs`; **`buildMenuFromCatalog` is RENAMED** to a consumer-agnostic symbol with **no app item names** in the type; the untrusted-catalog normalizer is the contract's; **no policy defaults** (no default accelerators, no default roles); the picker is injected, not owned. Import **semantics** stay fork-side | this repo |
| `SCH-6` `GUTTER-RESIZE-CONTROLLER` (`NEW — NOT GATED`, P2) | **post-amendment** | **DECLINED + REFILED** — reason `ARITHMETIC-OVER-INJECTED-VALUES + SECOND-GESTURE-AUTHORITY` | — | Its genuine core (clamp to injected bounds, reset to an injected default, refuse when not resizable) is **arithmetic over injected values**, not shell chrome; its second half (one commit per gesture, cancel writes nothing) is **already owned by the adopted `U-GSESSION` session**, so adopting it here would create **a second gesture authority over the same lifecycle** — the exact class `SCH-2` exists to close. Its own "no gesture starts, no capture" criterion is a **session** property | the fork — its own spec namespace |
| `SCH-7` `PANE-RELOCATE-GESTURE` (`NEW — NOT GATED`, P1) | **post-amendment** | **DECLINED + REFILED** — reason `APP-POLICY-STATE` | — | `resolveDrop` (which panes exist, which zones accept them) is **app policy** **(C)#3** and the **reveal set** is app layout state **(C)#2**; the threshold/one-commit/one-cancel properties are the adopted session's, and its F-1 clause is satisfied **structurally** by that session rather than re-expressed per controller. Its refile note changes: criterion #3's "no capture" clause becomes **"no capture before establishment"** — as written it would forbid the mechanism's own remedy (`H-r9`) | the fork — its own spec namespace |
| `SCH-8` `LAYOUT-STATE-PROJECTION` (`NEW — NOT GATED`, P2) | **post-amendment** | **ADOPTED-RESHAPED** — the **pure projection + total applier** half only; the `computeTrackVars(census, …)` half **REFILED** | `U-PROJ` | Adopt `project(values) → record` + a **total applier** (every input yields a write-or-skip decision, never a throw, never a partial write) taking an **injected write sink** (the consumer's root), so the mechanism owns **no root and no store**. Variable **names and units come from the consumer's supplied spec** — **(C)#1**-clean. Acceptance: purity (same input ⇒ same output, no environment read) · totality over malformed/partial input · **the `computeTrackVars(census, …)` half is absent** (census is app data — `SCH-4`'s concern) · one write per commit | this repo (projection half) / the fork (`computeTrackVars` half) |
| `SCH-9` `SHELL-STATUS-CARRIER` (`NEW — NOT GATED`, P2) | **post-amendment** | **DECLINED** (no transferable substance) — reason `AUTHORS-UI-CONTENT` | — | Fails **(C)#2** head-on: a status carrier is a shell region whose content **is** the mechanism's output — the publisher authors the element's text and slot content — i.e. **a UI element authored outside the provident graph**, a `UI-RENDERED-WITH-PROVIDENT` **review finding** (`AGENTS.md:23-34`, `docs/decisions.md:53`), and a permanent **human-only** informational channel (an equivalence hazard, not a mechanism). `V-7` also stands: its #2 "publish replaces the element" contradicts `SCH-11`'s #1 foreign-sibling-survives rule | the fork — its own spec namespace |
| `SCH-10` `ZONE-CONTAINER-CHROME` (`NEW — NOT GATED`, P2) | **post-amendment** | **DECLINED + REFILED** — reason `CONSUMER-VOCABULARY + CSS` | — | `zoneContainerChrome` returns a **fixed mirror-class taxonomy** (`is-empty`/`is-minimized`/`is-revealed`) — consumer vocabulary as a closed contract **(C)#1**, and a second authority over a class list the fork's assembler owns; `applyGestureContainment` delivers `contain: layout style paint` — **CSS, not host code** (the handoff concedes it is deliverable as consumer CSS today). **Decisively under A-d3: containment existed to make a document-delegated gesture safe; with local handlers there is no delegated stream to contain** | the fork — its own spec namespace (CSS) |
| `SCH-11` `TAB-STRIP-SHELL` (`NEW — NOT GATED`, P2) | **post-amendment** | **ADOPTED-RESHAPED** | `U-LISTHOST` | Rename the mechanism to what it actually is: an **owned-node list host** (`createOwnedListHost({mount, orderOf, itemFactory, onActivate, onClose})`), **not** a tab strip. Keep own-node ownership (the host owns the nodes it created and leaves foreign siblings untouched), **order-as-projection** (the host projects an order; it does not sort a graph; no graph pass on order change), and the foreign-sibling-survives row (`V-7` — the row `SCH-9` #2 contradicted). Acceptance: **no `querySelectorAll`**, no tab-strip vocabulary, no `matchMedia` in the mechanism; **the "one overflow mode" criterion is DROPPED** (overflow is CSS and this repo ships no stylesheet for a fork) | this repo |
| `SCH-12` `OVERLAY-FRAME-PRIMITIVE` (`SC-3`, P1) | **post-amendment** | **ADOPTED-RESHAPED** — state machine + inert-background + re-parent contract; **the package-stream refile is WITHDRAWN**; the focus-trap half stays refiled | `U-OVERLAY` | Shape: transitions (open/close/toggle/`Escape`-equivalent-as-callback) with every state and fail-state; the **inert background is a PRESENCE/ABSENCE DECLARATION the consumer applies** — the mechanism returns/records the inert set and **wires no events inside itself** (A-d3 discipline); the re-parent contract states **which** element is re-parented and who owns it after close. Acceptance: **no event wiring inside the mechanism** · the inert background is never a hard-coded `inert` string the mechanism stamps · no focus trap, no `activeElement` walk. **Withdrawal (`H-r3` amended):** the `inert` capability is **closed in 0.5.1** (`BOOLEAN_ATTRS`, **27 members counted**, `'inert'` present — read this pass at `../Preempt-Providence/src/core/adapters.ts:45-73`), so the refile's decisive evidence is spent. **Residual:** the **focus-trap half stays refiled** (it needs `document.activeElement` + a focusable walk — no `activeElement`/focus walk in this repo's shim and **no shim expansion**) plus the `inert`/a11y **documentation** half with the fork's `PS-1` stream | this repo (mechanism) / the fork + `PS-1` (focus trap + docs) |
| `SCH-13` `FOCUS-SEAM` (`SC-6`, P2) | **post-amendment** | **DECLINED** — reason `NOT-SHELL-CHROME + NEW-MCP-SURFACE + UNVERIFIABLE-HERE` (confirmed) | — | **Confirmed declined, explicitly, under the MAXIMAL reading of (C)** — so no later pass infers otherwise. It fails **two prohibitions independently of any narrow/wide dispute:** (1) a find-or-open model over an ordered entry list is **generic app state**, not OS integration / frame-geometry / interaction mechanics — it never enters the functional carve-out at all (`SCH-13` is app state that happens to be shaped like tabs), failing **(C)#1** in substance and its refusal rule is a **policy default** **(C)#3**; (2) its decisive criterion #1 — **MCP-path/strip-path equivalence** — presumes a `provident.focus` tool this repo does **not** ship (`ALL_TOOLS` is **21** names, `src/main/mcp-server.ts:281-303`): adding one would be a **NEW MCP SURFACE** (prohibition 5) and the criterion compares *the fork's* tool with *the fork's* strip, i.e. it is **unverifiable on a layer this repo owns** (prohibition 6). **No later pass may re-open it without a new gate.** Also recorded for the fork: the handoff's `§6.2` attributes a 508-line capture/`closest`-bearing shim to this repo — the same misattribution class as `H-r2` | the fork — its own spec namespace |

**Count identity (binding, stated exactly — this is the identity the trackers use).**
**SUPERSEDED BY A-d4…A-d8 (`H-r20`):** the governing identity is now **13 items · 16
`SCH`-derived units · 2 engine units · 2 harness units = 20 units**, 3 items carrying a
declined **part-half**, **0 PARK / 0 DONE / 0 legs green**, with `U-ENGINE-PIN`
**PARTIALLY LANDED**. *(**⟶ ITS `0 DONE` / `0 legs green` / `PARTIALLY LANDED` CLAUSES ARE
THEMSELVES SUPERSEDED (2026-09-27, the repo-wide documentation audit): the governing counts are
**0 PARK · 2 DONE · 2 units fully green** — `U-ENGINE-PIN` (wave A) and `U-ENGINE-DRIFT`
(wave B) are `DONE` on every leg each spec declares, with 18 rows `BLOCKED`/not started; see
`docs/decisions.md`'s `AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` note 8.)* Read the identity in the **Amendment record (A-d4…A-d8)** appended at
the end of this file; the intermediate `8 units` block below is kept for provenance only.
6 `SCH`-derived units ADOPTED-RESHAPED + 2 engine prerequisite units = **8 units
total**; 6 `SCH` items DECLINED/REFILED (`SCH-3`, `SCH-4`, `SCH-6`, `SCH-7`,
`SCH-10` declined+refiled; `SCH-9`, `SCH-13` declined); 1 split (`SCH-1`); 1 refile
withdrawn (`SCH-12`); **0 PARK**; **0 DONE**.

Stated arithmetically so nothing double-counts: of the 13 items, **6 contribute at
least one adopted unit** (`SCH-1`'s invariant half, `SCH-2`, `SCH-5`, `SCH-8`'s
projection half, `SCH-11`, `SCH-12`), **5 are declined+refiled** (`SCH-3`,
`SCH-4`, `SCH-6`, `SCH-7`, `SCH-10`), and **2 are declined outright** (`SCH-9`,
`SCH-13`) — **6 + 5 + 2 = 13**. `SCH-1` is the **split** (its region-host half is
in the refiled set as a part-half, which is why it is counted once here as one of
the six); `SCH-12` is the **withdrawn refile** (its focus-trap half stays refiled
with the fork, its `inert`/a11y documentation half with the fork's `PS-1` stream);
`SCH-8`'s `computeTrackVars(census, …)` half is likewise refiled. **The change-analysis's
"8 adopted-reshaped" phrasing is NOT used** — it conflated adopted `SCH` items with
prerequisite units; the governing numbers are **6 adopted units / 2 engine units /
8 units total / 0 DONE** — **the LAST clause that is still right today is `0 DONE`; the
counts are SUPERSEDED BY A-d4…A-d8 (16 `SCH`-derived + 2 engine + 2 harness = 20 units),
and `SCH-8`'s `computeTrackVars` half is NO LONGER refiled (it is `U-CENSUS`).**

## The amended unit plan (landing order, owner artifacts, red sets, legs, rollback)

**SUPERSEDED BY A-d4…A-d8 (`H-r20`) — this is the eight-unit plan.** The governing plan is
the **20-unit** table in the appended `Amendment record (A-d4…A-d8)`, whose waves A–F carry
all sixteen `SCH`-derived units plus the two engine and two harness units. The eight rows
below are kept for provenance: `U-ENGINE-PIN`, `U-ENGINE-DRIFT`, `U-MOUNTGUARD`,
`U-GSESSION`, `U-MENULIB`, `U-PROJ`, `U-LISTHOST` and `U-OVERLAY` all **survive** into it.

**Sequencing rule (binding):** `U-ENGINE-PIN` → `U-ENGINE-DRIFT` → every
shell-chrome unit. The engine units precede all of them (A-d2 / `S-d10`). Within
the shell-chrome set the order respects the dependency edges that **survive** the
reshapes; the dissolved edges are named in `H-r6`. **Every unit is
`BLOCKED — awaiting architect go-ahead`**, then its spec, then a TestWriter red
reported; **no unit is DONE, and no leg below has been run.** *(**⟶ CORRECTED 2026-09-27, the
repo-wide documentation audit:** this is the pre-wave-A plan text. **Two units ARE `DONE`** —
`U-ENGINE-PIN` (wave A) and `U-ENGINE-DRIFT` (wave B), each COMPLETE on every leg its spec
declares; the remaining **18** rows stay `BLOCKED`/not started. See `docs/next-steps.md`'s two
`## DONE` records and `docs/decisions.md`'s `AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` note 8.)*

| # | Unit | Spec it owes (`H-r4`) | Derives from | Owner artifact | Red set (plan) | Legs | Rollback | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **U0** | `U-ENGINE-PIN` | `docs/specs/engine-pin.md` (**OWED — not filed**) | A-d2 | `package.json:23`, `package-lock.json`, `src/shared/dom-shim.ts` | The engine red set: `props:{htmlFor:'x'}` then `htmlFor:undefined` → attribute absent (SSR + DOM/shim) · boolean ON/OFF on two named members (never an enumeration of `BOOLEAN_ATTRS`) · `props.id` undefined removal guarding the shim's `id` slot · a `css:`-with-`undefined` no-throw row proving the **pre-existing** 0.2.1 path is covered · the `HOST-OP-REJECT`-shaped `{status:'rejected'}` guard for an `undefined`/`null` `props.`/`css:` mutation · 2 byte-identity controls. Order note: the ⛔ rows throw `TypeError` **before** the `removeAttribute` completion, so the completion precedes the red run for the shim half **and only** the shim half — an explicitly ruled deviation from pure RCA-1, recorded so no later pass calls the red set doctored | node suite · battery · build/typecheck. **No divergence leg** (no real-DOM claim is asserted here) | revert `package.json` + lockfile (one diff); the shim method is additive and independently revertible (delete one method) | one full 7-gate cycle **+ one unsandboxed install** |
| **U1** | `U-ENGINE-DRIFT` | `docs/specs/engine-drift.md` (**OWED — not filed** — **⟶ SUPERSEDED 2026-09-27 (the `U-ENGINE-DRIFT` per-unit documentation review, AGENTS.md item 10d/RCA-6): the spec IS FILED — `docs/specs/engine-drift.md`, filed 2026-09-27 — and the unit is `DONE` 2026-09-27 as a measurement record with zero production code and zero new tests (`docs/next-steps.md`'s `## DONE — U-ENGINE-DRIFT` record; record `docs/specs/engine-drift-measurements.md`, blind re-run `docs/specs/engine-drift-greens.md`). This cell is the PRE-EXECUTION PLAN, kept as filed — it is not a live status. The plan's own text is left unedited; only this status arrow is added.**) | A-d2 (behavioural half) | possibly `src/renderer/runtime.ts` only (host-side fixes only) | **The existing suite + battery + divergence legs run under the new pin** — the unit's red **IS** the regression net — plus **recorded measurements** (not assertions): the pinned census equalities (`tests/runtime-battery.test.ts:100-101`, `tests/gemma4-blind-battery.test.ts:194-195,215`, `tests/runtime-host.test.ts:188,367`, `tests/path-fork-cycle.test.ts:28,93`), the `dirtied` sets, and journal behaviour. **Any delta ⇒ a HOST-side fix, never a package patch** | all three (node suite, battery, divergence) | none if no code changes; otherwise the `runtime.ts` hunk | a measurement pass + a possible host-fix pass — **honestly cheap if the engine is clean**, and its value is converting "the recon says it's clean" into a recorded run. **A zero-code outcome is explicitly authorised**: it lands as a measurement record with zero new tests, and its DONE row must say so |
| **U2** | `U-MOUNTGUARD` | `docs/specs/mount-invariant-guard.md` (**OWED — not filed**) | `SCH-1` invariant half | `src/renderer/runtime.ts` (`tearDownGraph` `:735-753`; call sites `:304`, `:331`, `:519`) | cycle-2 `loadEnvelope` → count `mount.children` matching the root **and assert identity**; cycle-2 `loadDoc`; cycle-2 `codeLoadBatch` (`:974`) and the `provisional` path (`:938`); plus the already-tested per-teardown case (`tests/runtime-host.test.ts:150-161`). **The shim is host-owned test code, so no shim change is needed** | node suite | delete the guard + its rows (self-contained) | one 7-gate cycle; the layer declaration says a green here proves only this repo's own tree |
| **U3** | `U-GSESSION` | `docs/specs/gsession.md` (**OWED — not filed**) | `SCH-2` | `src/shared/` node-local session module (consumer-agnostic contract) | node-layer only: one handler per matched control (**no** per-frame/per-event `closest`) · the session is **not active before the interaction is established** · the session ends on up/cancel and leaves the **listener count at the installed baseline** · a second `install` does not double listeners · a child element's own handler still runs (node-local precedence) · **capture = 0 calls until established; when opted in per control, capture occurs only after establishment; a `pointerdown` on a child of the control installs no capture** — the session-scoped-tracking row and the capture-eligibility row are **separate rows** · **negative security row:** `list_targets` exposes no session handle and `provident.dispatch` on a session-owned element's node returns the ordinary handler result with **no** session side effect · isolation row: the session installs no listener on any element owned by the pane graph | node suite. **Divergence leg NOT required for the adopted core** (deliberate cost reduction — the reshaped session uses no capture-before-establishment and no `closest`); the F-1 **behavioural** row does require the extended harness and must be named as a precondition, not assumed | delete the module | one 7-gate cycle; the largest unit in the set (real lifecycle state) and the one where the adversarial pass is most likely to find something (terminal-event ordering, dispose-during-gesture, replay of a stale source) |
| **U4** | `U-MENULIB` | `docs/specs/menulib.md` (**OWED — not filed**) | `SCH-5` | `src/main/` catalog builder + a renderer-agnostic picker seam | pure catalog→menu-model builder (no `electron` import in the builder) · darwin vs non-darwin shapes from the same catalog incl. single-vs-separate picker items · exactly one activation per `invoke(id, …)` (0 = dead item, 2 = double routing) · empty/non-array/unknown-`kind` catalogs ⇒ disabled/empty group, never a throw · picker seam cancel/dismiss/empty ⇒ `null`, non-empty ⇒ byte-identical passthrough · static: zero `electron` and zero `fs` imports | node suite | delete the module | one 7-gate cycle; its spec must state the OS boundary explicitly |
| **U5** | `U-PROJ` | `docs/specs/projection.md` (**OWED — not filed**) | `SCH-8` projection half | `src/shared/` | pure `project(values) → record` · **total applier** (every input yields a write-or-skip decision, never a throw, never a partial write) taking an **injected write sink** · non-finite/out-of-range geometry fail-soft (the fork's F-2 pin generalized: no `NaN`/`Infinity`/negative in the returned map) · `applyVarsToRoot` returns exactly the map it applied · **the `computeTrackVars(census, …)` half is absent** | node suite | delete the module | one 7-gate cycle |
| **U6** | `U-LISTHOST` | `docs/specs/listhost.md` (**OWED — not filed**) | `SCH-11` | `src/shared/` owned-node list host | own-node ownership (the host owns the nodes it created and leaves **foreign siblings untouched** — foreign sibling survives two re-renders as the **same element**, `toBe`) · order-as-projection (a permutation reorders the emitted elements with per-entry identity preserved; DOM order is never the authority) · activate/close each call their callback **exactly once** · empty entry set renders empty and throws nothing · a `null` mount leaves every operation a no-op with a valid state · **no `querySelectorAll`**, no tab-strip vocabulary, no `matchMedia` · **the "one overflow mode" criterion is dropped** | node suite | delete the module | one 7-gate cycle |
| **U7** | `U-OVERLAY` | `docs/specs/overlay.md` (**OWED — not filed**) | `SCH-12` | `src/shared/` state machine + inert-background + re-parent contract | state machine transitions (open/close/toggle/escape-equivalent-as-callback) with every state and fail-state · the **inert-background contract asserted as a DECLARATION the consumer applies** (the mechanism returns/records the inert set; it wires **no** events inside itself) · re-parent contract (where the overlay's node goes, and that it is returned/released on close) · **no event wiring inside the mechanism** · the inert background is never a stamped hard-coded `inert` string · no focus trap, no `activeElement` walk. With the pin at 0.5.1 the boolean-attribute rows for `inert` are **expressible** — recorded as the closed capability floor from `H-r3`, **not** as a criterion the mechanism depends on | node suite; **the real-DOM half of any `inert` row → the divergence leg** (`H-r10`) | delete the module | one 7-gate cycle + a divergence-leg row if the architect wants the real-DOM `inert` claim |
| — | **Divergence-harness extension** | an amendment to `docs/specs/ci-divergence-leg.md` (`H-r10`) | `H-r10` precondition | `scripts/electron-divergence.mjs` | Scenario-envelope channel + **attribute-presence extractor** (set-wise, never a substring diff) + a `props` falsy-toggle scenario | the divergence leg itself | n/a (harness) | one script + two rows + the extractor; it inherits the leg's existing **non-hermetic x11 dependency** (`RK-7`) |

**Named precondition, stated so no unit assumes it:** the divergence-harness
extension is a prerequisite deliverable of `U-ENGINE-PIN`'s divergence half and of
`U-OVERLAY`'s real-DOM half; **`U-GSESSION`'s behavioural F-1 row also depends on
it** (`H-r10`). Today the leg hard-codes one demo envelope and compares only
census/`dirtied`/SSR/`data-node-id`/`nodeId` vocabulary `(engine recon)` — it
**cannot** assert any real-DOM attribute row.

### Adopted units' security / equivalence obligations (binding on the specs)

| Obligation | Content |
| --- | --- |
| **No new MCP surface** | `ALL_TOOLS` stays **21** (`src/main/mcp-server.ts:281-303`, read this pass: the earlier record's `focus`-absence claim is consistent with it); no new tool, resource, tool group, `VALID_GROUPS` member, renderer RPC case, or `MUTATING_METHODS` entry. Each unit spec carries the **five-seam** negative as an explicit non-goal (the `J6` checklist shape, `docs/FORKER.md:88-89`) |
| **`U-GSESSION` is NOT reachable by `provident.dispatch`** | It is host-side DOM wiring, not a graph node — an agent cannot fire it. Negative row required: no session handle in `list_targets`; a dispatch on a session-owned element's node yields the ordinary handler result with no session side effect. It also adds **no IPC method and no MCP tool**, so it must appear in **none** of the six registration sites |
| **Magnitude-equivalence is FORBIDDEN** | No unit may claim a session-driven layout change is magnitude-equivalent to `provident.op`'s `state-slice`: the session writes the **consumer's** state through an injected sink while `state-slice` writes a graph node's props/content and **is journaled** (so `undo()`/`replay()` cannot invert the session — a claim of equivalence implies an inverse that does not exist); an agent's dispatch re-render goes through the producing process + `flush()` while a DOM-driven tick does not (settle order differs); `get_rendered_html` reads `mount.innerHTML` (`src/renderer/runtime.ts:1074-1075`) while `get_markdown` drops `on:*`/`data:*`, so session state may be visible to one view and invisible to the other. **Permitted claim:** "the same *decision* the operator made is expressible as a graph op", proven by a row that takes the session's committed value and re-applies it as a `state-slice` op and asserts the resulting observable state is equal |
| **Isolation** | The session installs into **one** graph's DOM only and must never reach the isolated `SecurePanels` graph (`src/renderer/secure-panels.ts:216-226`, own scope) — the `MULTI-GRAPH-ISOLATION` pin (`docs/decisions.md:51`) applies unchanged |
| **Trust boundary / CSP** | Every adopted mechanism is renderer/host-resident module code: **no** `src/main/**`, no `electron`, no `node:fs`, no RPC types import; no `new Function` path; no CSP change (nothing adopted needs `unsafe-eval` or a new `connect-src`); no adopted unit persists anything (no store, no file, no `localStorage`) |
| **Per-unit equivalence limits (adopted + declined)** | `U-OVERLAY`: the inert set is a **declaration** — the authority for the actual `inert` attribute is the engine's/consumer's write, so the mechanism may not claim "the background is inert" in an MCP-visible sense; no equivalence claim between the overlay's open/closed state and any graph-visible node, no durability/undoability claim (not journaled), and **no claim that a closed overlay is invisible to MCP** — the underlying envelope may still be in the graph. `U-LISTHOST`: order is a **projection**, so the mechanism may not claim the graph's child order changed; foreign-sibling survival is a **hard row**; no overflow/tab vocabulary; no equivalence between "one visible item" and any graph op. `U-MENULIB`: the builder is a pure catalog projection — the **native menu and the in-renderer picker are NOT equivalent** (that equivalence is the fork's app concern, `SCH-9`'s declined territory). `U-MOUNTGUARD`: the invariant's MCP-facing direction is that one stable mount keeps a dispatch target's element identity across re-assembly |
| **What every node-green must NOT be claimed as** | A real-click property · a layout/paint property · a listener-removal property (the shim removes by reference, `src/shared/dom-shim.ts:50-56`, and the engine's retained map may hold a different reference) · a focus/`activeElement` property · an absence-of-attribute property after a close on the shim (it observes set/overwrite only, `:30-39`) · a cross-envelope count of **DOM** roots (only engine-emitted elements carrying `data-node-id`, `:77-88`). An unproven property is **unproven**, not "covered by the node suite" |

### Risk register (amended plan — carried so no unit re-discovers it)

| # | Risk | Likelihood / impact | Mitigation / owner |
| --- | --- | --- | --- |
| **RK-1** | `removeAttribute` throw in every shim suite and the battery leg — **latent today, live the moment a falsy boolean or an `undefined` prop write lands** (the false red is in the node suite + battery while the real DOM is fine) | Medium-High / High | `H-r7` + `U-ENGINE-PIN`'s red set + the `HOST-OP-REJECT`-shaped guard |
| **RK-2** | Census / `dirtied` drift from the 0.4.x–0.5.x engine work — this repo pins **exact** census equalities | Low-ish / **High** | `U-ENGINE-DRIFT` as a measurement unit; any delta ⇒ a host-side fix, never a package patch (`AGENTS.md` item 7) |
| **RK-3** | `BARE-TEXT-EMIT` unreachable-surface risk — **not reachable here** (no `type:'text'` node in `src/**`, `(engine recon)`) | Low / Medium if a fork authors one | `H-r11` (no overclaim) + `docs/pending.md` |
| **RK-4** | New `console.warn` diagnostics from the `bodyRuns` drop path interleaving with host output, and **process-level** (not per-document) dedup silently denying a diagnostic | Low-Medium | `H-r11`; do **not** read an absent warn line as "nothing dropped" |
| **RK-5** | `U-GSESSION`'s real-DOM harness cost — avoided by the reshape, but the divergence leg is still needed for `U-OVERLAY`'s real-DOM row | Medium cost / Medium | `H-r10`: scenario-envelope channel + attribute-presence extractor |
| **RK-6** | A **guaranteed false red** if real-DOM `hidden` is compared by substring (the real DOM serializes boolean attributes without their value; the shim emits `hidden="true"`, `src/shared/dom-shim.ts:79`, read) | **High if done naively** / Medium | The extractor in `H-r10` |
| **RK-7** | The divergence leg is **not hermetic** — it spawns with `DISPLAY`/x11 flags while `docs/specs/ci-divergence-leg.md:22-25` claims hermeticity `(engine recon)` | Medium / Medium (flaky CI) | Record it as a **known spec-vs-code drift**; either fix the spawn or amend that spec |
| **RK-8** | The fork's returned requests — five items (`SCH-2`, `SCH-5`, `SCH-8`, `SCH-11`, `SCH-12`) now have **this repo** as owner, i.e. the fork will withdraw work it was told to do and re-await ours | Medium / Medium (schedule + expectation churn) | The `H-r1` correction package must state **explicitly** which four requests the fork should **withdraw** (with `SCH-4`'s `orderOf` still fork-owned) and that `SCH-12`'s package refile is withdrawn |
| **RK-9** | Doc-staleness across **two** disposition layers — this repo's #1 documented recurring failure (RCA-6, `AGENTS.md` item 10d) | **High** / Medium-High | This amendment executed as ONE pass with the pre-amendment layer **annotated, never deleted**; a per-unit doc-review gate for each adopted unit |
| **RK-10** | `U-MENULIB`/`U-PROJ`/`U-LISTHOST`/`U-OVERLAY` are contracts reverse-engineered from **one** consumer — the `C-16` class, now applied to *our* adoptions | Medium / Medium | `H-r8`'s six-prohibition table per unit + **at least one falsifying row per contract** (a consumer-agnostic case the fork's implementation would fail) + a `docs/pending.md` note that the second consumer is hypothetical |
| **RK-11** | `UNDO-REDO-DESTROY-STATUS` misread as "resolved by 0.5.1" because the version moved | Low / Medium | `H-r12` |
| **RK-12** | The plaintext npm token in the adjacent repo | **Certain** / High (credential exposure) | `H-r13` — rotate; record the **fact** + the rotation duty, **never the token**. Outside this pass's scope but it is a live secret on disk |

## Adjudicated residual disagreements (change-analysis; amended 2026-09-27)

1. **Is the mount invariant a `docs/defects.md` row? NO — it is a TARGET HARDENING UNIT.**
   `docs/defects.md:3-9` (read) defines the file as the **PACKAGE-gap catalogue** for
   `provident-ssr`; a host finding does not belong there. This repo's own precedent is
   `docs/decisions.md:39` `R13-HOST-FIX`, which **explicitly refuses** a
   `defects.md`/`HANDOFF.md` row for a host finding. **If** the red run shows two
   same-`css.id` mounts, the finding lands in the **unit spec's adversarial section**
   (the `renderer-backend-hardening.md` `§3a` pattern), not in a tracker row.
   **Still binding; it now governs two host-owned surfaces** (the mount cardinality
   finding and the `H-r7` shim gap).
2. **Is `SCH-3` adoptable? NO — DECLINED + REFILED.** Too thin (a 4-line pure resolver)
   and wrongly targeted (its self-consumer route needs an appearance control this repo
   must not author, plus a UI-config store it must not acquire). The pure
   `resolveAppearance(setting, env)` shape is recorded as a **CANDIDATE** in
   `docs/pending.md` — nothing more. **AMENDED (SUPERSEDED BY A-d1 in part, resolved by
   the change-analysis's override):** A-d1 refutes the *targeting* ground (the mechanism
   ships to a fork that owns the control and the carrier, so this repo need not author
   either) and the shape **is** admissible under (C) — the architecture pass would have
   adopted it as a **marginal `U-THEME`**. The change-analysis **overrode** that: too
   thin, and a contract reverse-engineered from one consumer implementation = **the
   `C-16` defect class**. **The override governs this record.** The architecture pass's
   dissent is preserved in one clause (it accepts the downgrade without changing any
   other ruling). The `docs/pending.md` CANDIDATE row is **kept, annotated `PROMOTION
   DECLINED THIS PASS`**, because `§4.2`'s escalation path (`U-THEME-MIN`, three rows)
   keeps it live.
3. **Is the mount invariant observable at this repo's layer WITHOUT shim expansion? YES.**
   The shim is **host-owned test code**: a test builds `mountEl()` and asserts
   `mount.children` cardinality + element identity (`toBe`) directly. No new shim
   surface is needed for the invariant, and none is adopted (`H-r5`). **AMENDED by
   `H-r7`:** the claim is true **for the mount invariant** and stays true, but the
   blanket form is now narrower — one shim method (`removeAttribute`) **is** added for
   a different reason (a named engine call site at the current pin:
   `node_modules/provident-ssr/dist/core/adapters.js:120`, `:187`, `:194`, read this
   pass). The invariant itself still needs nothing: the completion is admitted for the
   engine's own attribute-removal path, not for this unit.
4. **Which option? B packaged as D** (S-d6). A and C were presented to the architect
   and are not adopted. **SUPERSEDED BY A-d1/A-d2/A-d3:** the amended plan is neither A,
   B, C nor D — it is **the amended admission rule (A)/(B)/(C) applied per item**,
   yielding **6 `SCH`-derived units + 2 engine prerequisite units**. Options A and C stay
   rejected, and option B's *substance* survives only as the `SCH-1` split.
5. **NEW — the `setPointerCapture` reading.** A-d3's sentence is two clauses and names
   neither `releasePointerCapture`, `lostpointercapture`, nor "after threshold". **The
   NARROW reading controls** (`S-d9`): capture forbidden **before the interaction is
   established**, permitted **after**, **per-control opt-in**. Two facts settle it: the
   sentence's remedy is "local handlers" — a statement about *where the listener lives*,
   not a prohibition on the platform's capture API — and the sentence is **qualified**
   ("where possible"), which a blanket ban is not. **The strong reading is rejected:**
   it would make the fork's own `lostpointercapture` criterion **inert** (that event
   cannot occur if capture is never taken) and would ship a mechanism that silently
   drops drags outside the window — a correctness regression no node-layer row can
   catch. **Residual uncertainty, stated:** this is an adjudication of a two-clause
   sentence, not a verbatim architect statement about capture-after-establishment →
   **open architect decision `Q2`**.
6. **NEW — `SCH-13` is CONFIRMED DECLINED under the MAXIMAL reading of (C)**, so no
   later pass infers otherwise. It fails **two prohibitions independently** of any
   narrow/wide dispute: generic app-state selection is not shell chrome at all, and its
   decisive criterion presumes a `provident.focus` tool this repo does not ship — adding
   one would be a new MCP surface, and the criterion compares *the fork's* tool with
   *the fork's* strip, i.e. it is unverifiable on a layer this repo owns. **No later pass
   may re-open it without a new gate** → **open architect decision `Q4`**.
7. **NEW — the engine pin is a PREREQUISITE and is sequenced ahead of every
   shell-chrome unit** (`S-d10`). It is the condition on which `V-3` lapses and on which
   `SCH-12`'s `inert` criterion becomes expressible here; it is the only unit that can
   invalidate *other* units' criteria (0.4.0 `BARE-TEXT-EMIT` changes emitted
   text/structure, so the mount probe must run after the pin moves or be re-run after
   it); and it is the highest-risk change to the existing contract — fail-fast is the
   only responsible ordering. The alternative ("land the mechanisms at 0.2.1, upgrade
   later") is **rejected**: it would make every adopted unit's greens pin-dependent and
   force a second full re-verification pass. **Its install route is an open blocker**
   (`RK` / `Q5`) — the install cannot run inside a session with this write boundary
   `(engine recon)` → **open architect decision `Q5`**.
8. **NEW — the scoped shim carve-out (`H-r7`) does NOT license browser emulation.**
   `removeAttribute` is attribute bookkeeping — the exact category the shim's own header
   announces (`src/shared/dom-shim.ts:1-3`, read: "the element tree + attribute/text
   bookkeeping DomAdapter uses") — and its contract is a single `delete`-equivalent.
   Every other member on `H-r5`'s forbidden list stays forbidden. Any future addition
   needs **both** a named engine call site in a dist this repo installs **and** a
   forbidden-category check; without both it fails review.

## Filings this verdict owes

| Filing | State |
| --- | --- |
| This gate record (`docs/specs/provident-electron-shell-chrome-handoff-review.md`) | **AMENDED IN PLACE this pass** (DOC-ONLY; the amendment **cites and supersedes** the landed record — no second `*-review.md` path is created, per `H-r1`/`H-r6`) |
| `docs/decisions.md` — the ACTIVE row `SHELL-CHROME-HANDOFF-DISPOSITION`, 2026-09-27 | **AMENDED IN PLACE this pass** (annotated amendment, not deleted; compact pointer form so the cell does not silently truncate) |
| `docs/decisions.md` — the four NEW ACTIVE rows the amendments owe: `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (A-d1), `ENGINE-PIN-0.5` (A-d2), `INTERACTION-NODE-LOCAL` (A-d3), and the scoped shim-completion carve-out (`H-r7`) | **FILED this pass** |
| `docs/pending.md` — the `## UPSTREAM REQUESTS FROM FORKS — DISPOSITIONS` section, rewritten to cover adopted + refiled + declined rows (not "one row per declined/refiled item") | **FILED this pass** |
| `docs/next-steps.md` — the `## OPEN` block, re-issued by the A-d4…A-d8 amendment with the **20 units** + the divergence-harness row + the `H-r1` correction-package row | **FILED; and RE-ISSUED by the A-d4…A-d8 pass** (the queue was empty since 2026-08-26; it is now non-empty and **no row is DONE**) |
| `docs/defects.md` / `docs/HANDOFF.md` | **ANNOTATED this pass; NO new rows.** `UNDO-REDO-DESTROY-STATUS` re-verified still open at 0.5.1 (its destroy-undo branch is an empty no-op that still falls through to `report('applied', …)`; the upstream repo classifies the no-op itself as contract-correct while the `applied` status is unaddressed). **⟶ SUPERSEDED (2026-09-27, the wave-B DONE pass): that re-verification was WRONG ON BOTH COUNTS — the status and the mechanism.** Measured at the installed `0.5.1` (`docs/specs/engine-drift-measurements.md` `M-31`, `DRIFTED`; permitted route `Runtime.journal('undo')`): destroy-undo reports **`no-op`**, and the `applied` fall-through is **unreachable** (the resolve guard returns first, `dist/core/supervisor.js:1536-1538`), so **the silent-`applied` false-success is NOT REPRODUCIBLE at `0.5.1` by any route**; the row was moved to `docs/defects.md`'s **`## CLOSED (not reproducible at 0.5.1)`** section and `docs/HANDOFF.md` Round 9 was rewritten to close it (**remaining ask = an optional upstream dead-code tidy-up only**; `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`). **The NO-new-rows half above stands and is unaffected.** The stale `bumped to ^0.2.1` line is annotated. **Explicitly NOT filed, with reasons:** the `removeAttribute`/boolean gap is a **HOST-owned harness gap** (the shim is test code) and the `inert` gap is **closed by the pin** — neither is a package defect, and `docs/defects.md` is the package-gap catalogue (host findings follow the `R13-HOST-FIX` precedent, `docs/decisions.md:39`). **No genuine package defect with symptom/repro/root-cause/fix-shape is recorded in the spill material, so no new row is added** |
| `docs/FORKER.md` — install line to the new pin + the provenance annotation + the minimum a fork needs so it does not re-request the six items this repo now owns | **FILED this pass** |
| **Engine unit specs:** `docs/specs/engine-pin.md` (`U-ENGINE-PIN`) and `docs/specs/engine-drift.md` (`U-ENGINE-DRIFT`) | ~~**OWED — not filed.**~~ **⟶ SUPERSEDED (2026-09-27, the wave-B DONE pass): BOTH ARE FILED AND BOTH UNITS ARE `DONE`** — `docs/specs/engine-pin.md` (amended through block 7 + the `B-LANDED` reconciliation, with `engine-pin-greens.md` + `engine-pin-live-status.md`) and `docs/specs/engine-drift.md` (with its measurement record `docs/specs/engine-drift-measurements.md` and the blind re-run `docs/specs/engine-drift-greens.md`). Each unit ran its own red → green → adversarial → blind-greens → doc-review cycle and has its own DONE record in `docs/next-steps.md`; the go-ahead this row awaited was given (A-d2, wave A then wave B) |
| **The remaining `H-r4` unit specs:** `docs/specs/mount-invariant-guard.md` (`U-MOUNTGUARD`), `docs/specs/gsession.md` (`U-GSESSION`), `docs/specs/menulib.md` (`U-MENULIB`), `docs/specs/projection.md` (`U-PROJ`), `docs/specs/listhost.md` (`U-LISTHOST`), `docs/specs/overlay.md` (`U-OVERLAY`) — each carrying `H-r8`'s `§0 Contract-prohibitions` block | **OWED — not filed** (8 spec paths total, including the two engine specs). No unit is delegable until its spec exists **and** a TestWriter has run and reported the red set (`AGENTS.md` item 9) |
| **The divergence-spec amendment** — `docs/specs/ci-divergence-leg.md`, naming the `scripts/electron-divergence.mjs` extension (scenario-envelope channel + attribute-presence extractor) | **OWED — not filed** (`H-r10`) |
| **The four fork-side withdrawals** — the fork's own tracker rows must be told to withdraw `SCH-2`, `SCH-5`, `SCH-8`, `SCH-11` (owner → this repo) and that `SCH-12`'s package-stream refile is withdrawn | **OWED — the fork's pass.** This repo writes **no** file under `<Astrographer>/` |
| Correction package returned to the fork (`H-r1`, `H-r2`, `H-r3`, `H-r5`, `H-r9`) | **OWED — the fork's pass.** This repo writes to no file under `<Astrographer>/` |
| `docs/specs/mcp-endpoint.md` — the `H-r11` render-section line (the new diagnostics channel) | **OWED — not filed.** It lands with the unit that touches that surface (no unit does yet); the `docs/pending.md` row records it meanwhile |

**Archival-loop check (AGENTS.md item 6) — VERIFIED for the AMENDMENT: no FILE is
archived, moved or repointed by this pass** (one row insertion moved five cited anchors
and the reflow dropped three historical blocks; both were repaired in the same pass — see
the supervisor-level repair note at the end of this section).
A grep over this repo's `docs/` tree for the references this amendment would
invalidate was re-run in this pass and every hit is either (a) inside this record
itself, (b) a row this pass **annotates in place** rather than moves — the anchors
below are **pre-amendment** (the AMENDED `SHELL-CHROME-HANDOFF-DISPOSITION` row is at
`docs/decisions.md:58`, cited as `:47` pre-amendment; `docs/pending.md:34-53` is
the rewritten dispositions section, now at `:34-79`, with the pre-amendment `:50`
`SCH-12` row now at `:67`; `docs/next-steps.md`'s replaced `## OPEN` block is **cited by NAME,
never by line** — its live successor is that file's `## CURRENT WORK / HANDOVER STATE` block,
and the `## OPEN` table itself now carries only the moved-row provenance rows (`A`/`B`) plus the
never-started `C1..F4` rows) —
(c) a **historical provenance** pin deliberately left as-is
(`docs/FORKER.md:27,36,76-77`, `docs/HANDOFF.md:166,185,193`, `docs/defects.md:21-25`,
`docs/specs/mcp-endpoint.md:141`), or (d) the pre-amendment layer of this record.
Nothing is superseded by moving a file, so **no citation can dangle**: the pre-amendment
record is still at the same path with the same anchor text, the new record text is
appended, and the `UI-RENDERED-WITH-PROVIDENT` row (`docs/decisions.md:53` — cited
as `:46` pre-amendment), `HOST-OP-REJECT` (`:42` — cited as `:35`),
`R13-HOST-FIX` (`:39` — cited as `:32`) and `MULTI-GRAPH-ISOLATION` (`:51` — cited
as `:44`) all **stay cited and un-edited**; only their line numbers shifted when
the amendment inserted new ACTIVE rows **after** them. That shift is the one
citation hazard this pass creates, and it is resolved here by naming both anchors
(the gate record's own `:NN` references into `docs/decisions.md` are
pre-amendment anchors and resolve to the new numbers above). The fork-side rows that cite
these items (`<Astrographer>/docs/pending.md` `SC-6`, `<Astrographer>/docs/decisions.md`
`MCP-FOCUS-TOOL`) are **the fork's** to update with the `H-r1`/`H-r2` corrections — this
repo edits neither (both trees are read-only for this pass).

**Supervisor-level repair applied to this pass's own amendment (2026-09-27, after the
landing).** Two defects in the amendment's tracker edits were found by re-reading the
result, and both are fixed in the same pass as this note:
1. **Lost decision history.** The amendment's reflow of `docs/decisions.md` to single-line
   ACTIVE rows dropped three multi-line `GATED PROPOSAL (2026-08-25)` blocks (the
   MCP-resources gate R1-R5, the live-change-notification gate N1-N7, and the
   `code.loadBatch` A4 stage-N gate) and the section header they sat under. They are
   **restored verbatim** in `docs/decisions.md` under the new
   `## HISTORICAL — superseded gate records (provenance only, restored 2026-09-27)`
   section, with a restored `## SPECULATIVE / IN GATE` header whose former single row
   (`MODULE-EXTENSIONS`) has LANDED and now sits in `## ACTIVE`. No decision row was lost:
   all 33 pre-existing rows are present (37 ACTIVE rows now, all four-column and complete).
2. **Dangling citations from the row insertions.** Inserting the four new ACTIVE rows
   shifted earlier rows, and five cited anchors then pointed at the wrong row. Repointed in
   the same pass, in every file that carried them (`docs/pending.md`, `docs/defects.md`,
   `docs/HANDOFF.md`, this record): `R13-HOST-FIX` :32 → :39,
   `:35 → :42` (`HOST-OP-REJECT`), `:44 → :51` (`MULTI-GRAPH-ISOLATION`),
   `:46 → :53` (`UI-RENDERED-WITH-PROVIDENT`), `:47 → :58`
   (`SHELL-CHROME-HANDOFF-DISPOSITION`). Every `docs/decisions.md:<n>` citation in the
   `docs/` tree was re-resolved against the live file after the move; none dangles.
   This is the archival loop's own rule (item 6c) applied to a row *insertion*, which is
   the same hazard as a file move.

## Advisory carry-forward (recorded, not blocking)

| ID | Advisory | Landing place |
| --- | --- | --- |
| V-5 | The mount absence is **"no cross-envelope cardinality/identity guarantee"** — diff-based emptying exists and is tested (`tests/runtime-host.test.ts:150-161`) | the `H-r4` spec's Scope wording |
| V-6 | `SCH-9`'s host-written status carrier vs this repo's UI constraint | the fork's refile |
| V-7 | `SCH-9` #2 (publish replaces the element) vs `SCH-11` #1 (foreign sibling must survive) — mutually contradictory | the fork's refile |
| V-10 | The "14 of 38 Table A/B models" identity is **not enumerable** from `§2`'s class column (which yields **8**) | the fork's `H-r2` pass |
| V-11 | Five SC-covered items omit the `Problem`/today's-implementation fields `§3`'s preamble promises (`:124-128`) | the fork's `H-r2` pass |
| V-12 | The duplicate check is recorded as **nil** (no duplication against this repo's trackers) | this record + the decisions row |
| V-13 | The `SCH-4` second-authority question (the fork's census vs a contract-side emptiness rule) | the fork's refile |
| V-14 | The C8/C16 MUST-NOT-MOVE binding is **derived** in the handoff, not literal (`§5.2` attribution note, `:850-856`) — record it as derived | the fork's refile |
| C-5 | The handoff's "shell chrome" **category is wider than this repo's**: `AGENTS.md:21-34` exempts only window frame / native menu bar / preload bridge / MCP server, so other host-authored UI is a review finding | the fork's refile — **RESOLVED BY AMENDMENT (A-d1):** the carve-out is declared **functional** with the mechanism-vs-UI-element test, recorded as the new ACTIVE `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` row in `docs/decisions.md`; **`AGENTS.md:23-34`'s own text is NOT edited by that row** — changing the project-wide constraint needs its own pass |
| C-6 | No operator↔agent equivalence guard is specified for the new invisibility seams | the fork's refile — **RESOLVED BY AMENDMENT in part:** the adopted units carry explicit equivalence obligations and an explicit **magnitude-equivalence prohibition** (the security/equivalence table above); the fork's own seams stay the fork's |
| C-7 | No security topology is named for the new seams (tool group / `ALL_TOOLS` / `VALID_GROUPS` / renderer RPC / `MUTATING_METHODS` / the two-gate `code` rule) | the fork's refile — **RESOLVED BY AMENDMENT:** every adopted unit carries the five/six-seam negative as an explicit non-goal, `H-r8`'s prohibition 5, and the "no new MCP surface" obligation row |
| C-12 | RCA-11/RCA-12 are cited as "the target's own rule" but exist only in the fork — **this repo's `AGENTS.md` stops at RCA-6** | the fork's `H-r2` pass |
| C-13 | False-green traps in the shim | `H-r5` (no shim expansion) — **AMENDED:** `H-r5` now carries the single scoped `H-r7` carve-out; the false-green traps it named (the `id`-slot special case `src/shared/dom-shim.ts:31-37,42`, read; the `outerHTML` serialization gap `:77-88`, read) are **named acceptance rows** in `U-ENGINE-PIN`'s red set rather than only prohibitions |
| C-14 | Capture "call recorded" vs capture "semantics" are conflated | the fork's refile — **RESOLVED BY AMENDMENT in part:** `S-d9`/`H-r9` fix the reading (capture 0 before establishment, permitted after, per-control opt-in) and the adopted session asserts a **capture-CALL count** at the node layer while the capture **semantics** claim is explicitly not made from a node-green |
| C-15 | The landing order contradicts its own criteria (`SCH-5` in W0 consumes `orderOf`, which `SCH-4` defines in W3 — `handoff §4` `:772-775`) | the fork's refile — **RESOLVED BY AMENDMENT:** the `orderOf` edge is **dissolved** rather than inherited (each adopted contract takes an injected `orderOf`-shaped callback as its own parameter; `SCH-4` is declined), and the amended landing order is re-derived with `H-r6` naming every dissolved edge so no later pass reinstates them |
| C-16 | Every contract is reverse-engineered from **ONE** consumer implementation | the fork's refile — **CARRIED INTO THE AMENDED PLAN AS `RK-10`:** it now applies to *this repo's own* adoptions. Mitigation is `H-r8`'s six-prohibition table per unit **plus at least one falsifying row per contract** (a consumer-agnostic case the fork's implementation would fail) and a `docs/pending.md` note that the second consumer is **hypothetical** |
| C-17/C-18 | Only fork-side tracker rows are filed, and the `inert`/overlay half is split across `PS-1` and `SCH-12` with no single owner | `H-r3` |

## Preserved as CORRECT (not re-litigated)

Zero duplication in this repo's trackers (V-12). The handoff's mechanism-**absence** claims
are real (no menu/dialog/theme/gesture/overlay/inert/`matchMedia` surface under `src/**` —
`handoff §6.2` `:899-907`; the validity pass confirmed them and this pass's greps found no
counter-example). Most **target-side** cites hold — including `src/renderer/runtime.ts:735-753`,
`package.json:23`, `package.json:18`, the `docs/next-steps.md` queue (**cited by section —
`## CURRENT WORK / HANDOVER STATE` / `## OPEN`; never by line**, its line numbers moved again
under waves A/B) and the 112-line shim.
`§6.1`'s fork-side correction is right about the fork. The count identity
(13 = 7 + 6), the priorities (P1 ×6 / P2 ×7), the six waves and the 13-row revert table are
internally consistent. **No adoption step touches a named control node** (`§5.2`).

**Amendment additions to this list (still correct under A-d1/A-d2/A-d3):** the
mechanism-**absence** claims remain true *and* remain the reason four of the six
adoptions rest on (C) rather than (A) — the absence claims and the (C) clause are
compatible by construction. The `H-r2` attribution corrections in the pre-amendment
record stand unchanged, plus the one new `§6.2:213-222` misattribution item. Most
target-side cites still hold; the ones that do **not** are the version-presumptive ones
(`V-3`, `H-r3`'s (ii), `docs/pending.md:50`'s decisive reason, `docs/defects.md:25`'s
verification statement, `docs/HANDOFF.md:193`) and each is annotated in place rather
than rewritten.

## Go/no-go

**SUPERSEDED BY A-d4…A-d8 for the counts, the pin state and the plan size** (the plan is now
**20 units** and the pin **has moved**); the conditions below all survive as conditions.
**GO-CONDITIONAL — restated for the amended plan.** In addition to the pre-amendment
conditions (`H-r2` before any `SCH-n` is read as a target requirement; no delegation
without the architect's go-ahead **and** the unit's `H-r4` spec), the amendment adds:
1. **`U-ENGINE-PIN` → `U-ENGINE-DRIFT` must land FIRST**, before every shell-chrome unit
   (`S-d10`) — **the install is DONE** (`Q5` closed on the install half; `U-ENGINE-PIN` is
   **PARTIALLY LANDED**, the shim completion + guard still red).
2. **`H-r7..H-r20` bind every unit**; `H-r1..H-r6` remain binding with `H-r3`'s `SCH-12`
   refile **withdrawn**, `H-r5` carrying the single scoped carve-out, and **`H-r14`'s
   prohibition-5 clarification governing every reading of `H-r8`/`S-d8`**.
3. **The divergence-harness extension** (`H-r10`) is a named precondition of
   `U-ENGINE-PIN`'s divergence half and `U-OVERLAY`'s real-DOM half — and of
   `U-GSESSION`'s behavioural F-1 row. Until it exists, **no unit may claim F-1 is
   proven** or assert a real-DOM attribute row.
4. **The open architect decisions** are re-stated in the `Q` table by the amendment (below):
   `Q1` is **RE-OPENED** for the 20-unit plan, `Q2`/`Q3`/`Q4`/`Q6` are **ANSWERED**, `Q5`'s
   install is **DONE** (with its devDependency side-effect now `Q7`), and **`Q7`/`Q8` are new
   open items**.
5. **No unit is DONE, no leg is green, no test was run.** The queue
   (`docs/next-steps.md` `## OPEN`) lists **20 units** + the harness row + the `H-r1`
   correction-package row, each blocked, and `U-ENGINE-PIN` is **PARTIALLY LANDED** with a
   live red ledger. **No code, no test, and no tracker row beyond the filings listed above
   lands until the go-ahead.**

---

# Amendment record (A-d4…A-d8, 2026-09-27) — the GOVERNING layer

**Read this before any table above.** This section is **appended**: the pre-amendment
record, the A-d1/A-d2/A-d3 layer and the A-d5…A-d8 architecture re-issue layer all stay
readable and citable. Where an earlier claim is now wrong it is marked
`SUPERSEDED BY A-d4…A-d8` with a one-line why — **never silently overwritten**.

**Source of this layer:** the architect's five rulings **A-d4** (the panes/zones family),
**A-d5** (`provident.focus`), **A-d6** (theme controls in update), **A-d7** (the static-UI
reading) and **A-d8** (browser integration as a development-flow leg), plus the **A-d5…A-d8
architecture re-issue** (the focus tool plan + all six wiring sites, the theme and
`U-THEME`/`U-THEME-CONTROL` split, the static-UI reading with `U-SLOTHOST`, the
browser-integration ruling with the `ui` leg + hermeticity truth + honest limits, the unit
plan/waves, the per-file tracker obligations, the five dissents and the doc-drift list) and
the **engine recon** (`(engine recon)` wherever this pass did not re-read its evidence).
**Nothing here is a fix and nothing here is a green.**

## 0. Supervisor adjudication — a real inconsistency between two rulings (RECORDED, NOT SILENTLY RESOLVED)

**The inconsistency.** The A-d5…A-d8 architecture pass read the **landed pre-A-d4 rows** of
this record and, on that basis, **re-declined `SCH-4`, `SCH-6`, `SCH-7` and `SCH-10`**; its
unit list omitted `U-ZONES`/`U-CENSUS`/`U-GUTTER`/`U-RELOCATE`/`U-CONTAINER`. The landed
record at the time carried only A-d1/A-d2/A-d3 dispositions — the A-d4 amendment had been
ruled but **never landed**, so the architecture pass could not see it.

**The adjudication (binding).** **A-d4 is the architect's explicit ruling and is binding.**
The re-decline is an **artefact of the A-d4 amendment never having been landed**, not a
second ruling on the same question. Therefore: **A-d4 stands; the five panes/zones units
are part of the plan.** `SCH-4`→`U-ZONES`, `SCH-8`'s census half→`U-CENSUS` (its earlier
refile is **WITHDRAWN**), `SCH-6`→`U-GUTTER`, `SCH-7`→`U-RELOCATE`, `SCH-10`→`U-CONTAINER`
are **ADOPTED-RESHAPED** and are **not** re-declinable by any pass reading the landed
pre-A-d4 rows. This adjudication is also recorded in the ACTIVE
`SHELL-CHROME-PANES-ZONES-IN-SCOPE` row in `docs/decisions.md` and in the `docs/pending.md`
rows for those four items. **The architecture pass's own §4/§1.8 text is kept below as the
dissent** (it also carries the correct observation that `SCH-1`'s region host's blockers are
prohibitions #1/#6, not #5 — that observation is adopted and is why the region half stays
declined).

**Why this is not a pick-one-silently.** Two readings were available: (a) the later pass
supersedes the earlier ruling; (b) the earlier ruling was never landed, so the later pass
was ruling on stale input. **The supervisor rules (b)**, on four recorded grounds:
1. **Provenance.** A-d4 is an **architect ruling**; the re-decline is a **document-derived
   inference** made by a pass that had already recorded "CORRECTION … read the landed
   pre-A-d4 rows" as its own operating premise.
2. **No contrary ruling exists.** Nothing in A-d5…A-d8 addresses the panes/zones family;
   A-d7's "menus, toolbars, dashboards" sentence speaks to **containers + content**, and the
   pass's own §4.6 note ("do a dashboard/toolbar use-case change any zone/track contract?
   **NO**") is about *that use case*, not about A-d4's explicit instruction.
3. **The task the ruling serves.** A-d4's rationale — "everything that this project will get
   used for is going to have static UI elements" — is exactly what the five units build.
4. **Reversibility.** A-d4's five units are the only adoption in this record whose
   `§0 Contract-prohibitions` tables must be written **from scratch** (they were never
   drafted under A-d1..A-d3), so the cost of honouring the ruling now is a spec authoring
   cost, not a re-opened review.

**Dissent preserved (not adopted):** the A-d5…A-d8 pass's `SCH-6`/`SCH-7` reason codes
(`ARITHMETIC-OVER-INJECTED-VALUES + SECOND-GESTURE-AUTHORITY`, `APP-POLICY-STATE`) name
**genuine hazards that survive the adjudication** — they are therefore carried into
`U-GUTTER`/`U-RELOCATE` as **contract rows** (no second gesture authority; injected resolve
policy; no app-policy default) rather than as decline reasons. See §1.3/§1.4 below.

## 1. The five rulings, recorded verbatim-in-substance

1. **A-d4 — the panes/zones family is IN SCOPE.** *"SCH-4/6/7/10 — I don't care, build the
   damn panes/zones framework. Everything that this project will get used for is going to
   have static UI elements."* → **FIVE units adopted, contract-exact** (§1.1–§1.5 below).
   A-d4's ruling **also** records: **`SCH-1`'s region half stays DECLINED**, and **the
   geometry the family produces is UNPROVABLE in this repo today** (the node layer asserts
   contracts/arithmetic only) — **that clause must appear wherever geometry criteria are
   described.**
2. **A-d5 — `provident.focus` is added.** *"Add provident.focus for the tab handling. This
   is another tool that will be reused in multiple projects."* → `SCH-13` adopted as **two
   units** (§1.6–§1.7), **overruling `Q4`'s decline** and satisfying the pre-amendment
   "no later pass may re-open it without a new gate" clause — **A-d5 IS that gate**
   (`H-r14`).
3. **A-d6 — theme settings stay, mechanism and authored control split.** *"SCH-3: All
   downstream apps are going to use theme settings. Keep the theme controls in update."* →
   `SCH-3` adopted as **two units** (§1.8–§1.9), **overruling `Q3`'s decline** and retiring
   the `U-THEME-MIN` escalation name.
4. **A-d7 — the static-UI reading.** *"Static as intended: UI elements derived from
   application state, not data/files, ex. menus, toolbars, dashboards."* → reading **(a)**
   recorded; **`AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED**; `SCH-1`'s
   region host stays declined; the **`SCH-9` host half is adopted as `U-SLOTHOST`** while
   its **publisher/carrier half stays declined** (§1.10).
5. **A-d8 — browser integration is part of the development flow.** *"Part of the use case
   for an electron app is that the browser integration makes the ssr shim unnecessary for
   testing because the front-end can be made MCP accessible. If this is not already part of
   the development flow, add it."* → the flow is adopted as **two harness units**
   (§1.11–§1.12) with the hermeticity truth and the honest limits (§1.13).

### 1.1 `U-ZONES` ← `SCH-4` (A-d4)

- **Owner artifact:** a **pure `src/shared` module**. Spec `docs/specs/zones.md` (**OWED — not filed**).
- **Contract:** `TrackSpec { trackProp, unit, emptyToken }` — **all three caller-supplied /
  opaque**; `isEmpty(census, zoneId)`; `trackFor(spec, size, empty)`.
- **Binding negatives:** the literal **`'0px'` is NOT built in**; **no DOM**, **no
  registry**, **no writes**. **Non-finite/negative ⇒ the empty token** (never a throw, never
  a raw number).
- **Prohibition rows it must carry (`H-r8`):** no zone/pane/tab vocabulary as a symbol,
  union member, default or documented constant (`(C)#1`); no CSS authoring (`(C)#2`); the
  `:has()` rules + the collapse-override declaration stay **consumer-side**.

### 1.2 `U-CENSUS` ← `SCH-8`'s census half (A-d4 — **its earlier refile is WITHDRAWN**)

- **Owner artifact:** `src/shared/`. Spec `docs/specs/census.md` (**OWED — not filed**).
- **Contract:** `computeTrackVars(zones, census, sizes, revealed, specOf)` — **delegating
  token formatting to `U-ZONES`** (one authority, not two).
- **Binding rows:** `revealed` is a **consumer decision, never a default**; the returned
  record's **key set is exactly `zones`** (no extras, no omissions); **the census object is
  never mutated** — this is the **anti-second-authority row** that answers validity finding
  `V-13`.
- **SUPERSEDES** the pre-amendment `SCH-8` row's "the `computeTrackVars(census, …)` half is
  REFILED" clause and the `docs/pending.md` `SCH-8` row's "**the `computeTrackVars(census, …)`
  half is absent**" acceptance line: under A-d4 that half is **adopted**, and the `SCH-8`
  refile is withdrawn.

### 1.3 `U-GUTTER` ← `SCH-6` (A-d4)

- **Owner artifact:** `src/shared/`. Spec `docs/specs/gutter.md` (**OWED — not filed**).
- **Contract:** `createResizeController({ session, axisFor, boundsFor, defaultSizeFor,
  isResizable, commit })` — **driven by the adopted node-local session** (`U-GSESSION`, no
  second gesture authority) — **plus an exported pure `clampToBounds`**.
- **Binding rows:** **one commit per gesture**; **cancel ⇒ zero commits and zero sink
  writes**; **reset ⇒ exactly one commit of the SUPPLIED default** (never a mechanism
  default — `(C)#3`); **no capture before establishment** (`H-r9`/`S-d9`).
- **Geometry clause (A-d4's mandatory wording):** the arithmetic is **provable here**; any
  claim about the **rendered** geometry is **UNPROVABLE in this repo today** — it belongs to
  the `ui` leg's business (`§1.11`) and to no node-green.

### 1.4 `U-RELOCATE` ← `SCH-7` (A-d4)

- **Owner artifact:** `src/shared/`. Spec `docs/specs/relocate.md` (**OWED — not filed**).
- **Contract:** `createRelocateSession({ session, candidatesFor, resolveTarget, onReveal,
  commit, threshold })` — **resolve policy injected** (`(C)#3`-clean; the A-d5…A-d8 pass's
  `APP-POLICY-STATE` objection is answered by injection, not by declining).
- **A DELIBERATE STRENGTHENING, recorded as such:** reveal is written **exactly once per
  gesture, at gesture end**. **The fork's per-crossing implementation will FAIL this row
  until it changes** — that is stated so no later pass reads the failing fork as evidence the
  row is wrong.
- **Binding rows:** interrupt/cancel leaves **no retained sinks and no listeners**;
  threshold is an **injected** value, never a mechanism default.

### 1.5 `U-CONTAINER` ← `SCH-10` (A-d4)

- **Owner artifact:** `src/shared/`. Spec `docs/specs/container.md` (**OWED — not filed**).
- **Contract:** `tokensFor(chrome, tokenFn)` / `orientationFor(edge, axisResolver)` with the
  **mirror-class taxonomy caller-supplied** — **no `is-empty`/`is-minimized`/`is-revealed`
  literals anywhere in the mechanism** — **plus ONE shipped declaration**
  (`contain: layout style paint`) **whose class name is caller-supplied**.
- **Binding rows:** consumer selectors and `:has()` rules **stay consumer-side**; the
  containment row is a **shipped-artifact row** and **its real-DOM proof is the `ui` leg's
  business** (`§1.11`), not a node-green's.

### 1.6 `U-FOCUS-MODEL` ← `SCH-13` (A-d5)

- **Owner artifact:** a **pure ordered-entry transition module**. Spec
  `docs/specs/focus-model.md` (**OWED — not filed**).
- **Contract:** opaque **ids and targets**; operations that are transitions over
  `{ entries, activeId }`; **`refuse` / `onChange` / `persist` are injected**. **No
  vocabulary** (`'tab'`/`'pane'`/zone/region may not appear as a symbol, union member or
  default), **no store**, **no DOM** on the model's side.
- **Security boundary:** the model is **in-memory only**, lives **beside** `Runtime` (never
  inside it), and the repo's `persist` is deliberately **not** supplied in-repo — this repo
  persists nothing (the fork's `OperatorSettings.tabs.activeId` persistence is the fork's
  reconciliation).

### 1.7 `U-FOCUS-TOOL` ← `SCH-13` (A-d5 — the new MCP tool, its own unit and its own gate)

- **Owner artifacts + ALL SIX WIRING SITES (exact):**
  1. `src/main/security.ts` — `TOOL_GROUPS` gains `'provident.focus': 'dispatch'`. **No
     `VALID_GROUPS` change.**
  2. `src/main/mcp-server.ts` — `ALL_TOOLS` (**21 → 22**) **+ registration** (under the
     `dispatch` guard) **+ the handler**.
  3. `src/shared/types.ts` — `RpcMethod` (**21 → 22** — **CORRECTED 2026-09-27** by the
     `U-ENGINE-PIN` doc review: the live census is **21**, `src/shared/types.ts:259-280`; this
     line's earlier **"19 → 20"** was stale).
  4. `src/renderer/renderer.ts` — the `case 'focus':` switch arm.
  5. **The notification path is UNCHANGED** — focus is **NOT** in `MUTATING_METHODS`, emits
     **no** `notifications/resources/updated` and **no** `app-graph-changed`.
  6. **The preload bridge needs NO change** — the tool crosses the EXISTING
     `IPC_INVOKE`/`IPC_REPLY` path. **Record this explicitly**: the A-d4-era checklist wording
     ("the preload bridge if it is reachable from the renderer") is a **false lead** — it *is*
     reachable and it needs no edit.
- **Security rulings (binding):** group `dispatch` because it **must not be reachable only
  after a human grant** (dispatch is ON by default); **not mutating, therefore no
  notification** — an agent therefore **cannot use focus to force a re-render or invalidate a
  cached `mcp://provident/app`**; the agent **MAY** change the active UI entry / open an
  entry (subject to the consumer's injected refusal) and **MAY NOT** alter any persisted
  operator setting, read or write the security/tool-group config, change the graph/envelope/
  any node's props or content, reach the isolated `SecurePanels` graph, cause a persistence
  write of this repo's own, or cause any notification. **Renderer-not-ready ⇒ the existing
  readiness-gate rejection with the focus state untouched** (no silent no-op, no queued
  mutation, **no special case and no fallback** for focus).
- **`docs/specs/mcp-endpoint.md` MUST be amended in the SAME PASS as the tool**: **§3 table**,
  **new §3.8 `provident.focus`**, **§6.2 group table (incl. the missing `module` row)**,
  **§7 pins**, **§8 non-goals** (focus named **explicitly as a non-emitting mutator of UI
  state**, so a later pass does not "fix" it by adding the method), **§9 verification**.
- **The census re-parameterisation rule (mandatory, recorded so no later pass reads it as
  weakening `U-ENGINE-PIN`'s red):** `tests/engine-pin-version.test.ts`'s census rows
  (`:79-151`, read this pass: `ALL_TOOLS.length === 21` + a frozen 21-name tool→group table
  + a 21-member `RpcMethod` census) are re-parameterised from a **numeric freeze** to a
  **SET-EQUALITY freeze against a named list**, **in the same commit as the tool**; and
  `docs/specs/engine-pin.md`'s `§0` prohibition-5 row (**now at `:253`** — the pre-amendment
  `:80` anchor was corrected 2026-09-27 by the `U-ENGINE-PIN` doc review) moves from a **count freeze** to a
  **diff freeze**. **The invariant is preserved exactly** ("this unit adds none of the
  following: … no tool, no group, no RPC member") and the rows still fail for any **unlisted**
  name. **`U-ENGINE-PIN` must NOT carry the focus rows** — that would make one unit land both
  a version pin and a contract change (RCA-2's exact prohibition) and would put a
  `dispatch`-group tool inside a unit whose stated non-goal is "no new MCP surface".
- **`docs/specs/mcp-server-gate.md`'s stale counts** are corrected in the same pass (see the
  doc-drift list, §5).

### 1.8 `U-THEME` ← `SCH-3` (A-d6)

- **Owner artifact:** `src/shared/theme.ts`. Spec `docs/specs/theme.md` (**OWED — not filed**).
- **Contract, exactly three rows:** (a) **`resolveTheme(setting, env)` is TOTAL and PURE**
  over `setting ∈ {opaque string}` × **injected** `env = { prefersDark: boolean }` —
  `undefined`/`null`/number/unknown-string/frozen-env all yield a resolvable member, **never
  a throw**; (b) the applier is **declaration-only** — it **returns the attribute write it
  would perform** and performs no write itself (A-d3 discipline), and **the attribute name is
  caller-supplied**; (c) **no ambient read** — a static assertion that the module contains no
  `matchMedia`, no `localStorage`, no `document`/`window`, no store, no `fs`.
- **Binding negatives:** **no token names/values** (the token block stays the consumer's
  stylesheet); **no policy default** (the tri-state → resolved mapping is not baked in; the
  injected `prefersDark` decides and an explicit setting wins by the **consumer's** rule,
  passed in); **no store**; **no new MCP surface in `U-THEME`**; every row falsifiable in the
  node suite (truth table over an injected `prefersDark`; a returned-declaration row; a static
  no-ambient-read row). **The mechanism may not document `data-theme`** and must not import
  the fork's reference name or signature.

### 1.9 `U-THEME-CONTROL` ← `SCH-3` (A-d6 — the authored control)

- **Owner artifact:** `src/shared/demo-envelope.ts` (+ its dispatch rows). Spec
  `docs/specs/theme-control.md` (**OWED — not filed**).
- **What it is:** an **AUTHORED** appearance control (a `select`/button group) in the
  foundation's **own demo envelope**, with `handlers[]` bodies that dispatch `state-slice`
  onto the authored setting; visible/drivable via the **EXISTING**
  `provident.dispatch`/`get_rendered_html`/`list_targets` — **no new tool, no new group**.
- **This is REQUIRED by the repo's own UI constraint, not an exception to it**
  (`AGENTS.md:23-34` + `docs/decisions.md:53` require provident-authored UI). It lives in the
  demo envelope (**not** the `#panes` graph, which is hosted by `SecurePanels` in an isolated
  `GraphScope` and is therefore **invisible to the MCP surface** — the opposite of A-d6's
  aim).
- **Consequences, stated, not softened:** (a) the demo envelope gains content, so demo-keyed
  census assertions may drift **for the demo only** — **the drift must be MEASURED, not
  assumed** (this is `U-THEME-CONTROL`'s own red row); (b) the control is **demonstration
  code** — it does not make the shell an app and **no unit may generalise it into a shipped
  appearance UI**; (c) the control **and** the mechanism stay separable — **`U-THEME`'s spec
  must be readable with the demo deleted**.
- **The conflict to record (the fork's to reconcile, not ours):** the fork's own
  `provident.focus` row persists `OperatorSettings.tabs.activeId` while its
  `UI-CONFIG-CARRIER` row declares the operator-settings carrier "NOT MCP-visible". **This
  repo's `U-FOCUS-MODEL` deliberately does NOT reproduce it** (no `persist` in-repo).
- **Name retired:** the pre-amendment escalation name **`U-THEME-MIN` disappears** — it was
  the escalation path, now the landed shape.

### 1.10 `U-SLOTHOST` ← `SCH-9`'s host half (A-d7 — host-only, mechanism-only)

- **Owner artifact:** `src/shared/`. Spec `docs/specs/slothost.md` (**OWED — not filed**).
- **Contract:** `createSlotHost({ container, keys, order?, classNameOf?, attributesOf? })` —
  (a) **opaque keys** (consumer-supplied strings; **never** a union member, symbol, default or
  documented constant); (b) **caller-created nodes** (the caller passes the node it created for
  a key; the host positions/orders/attributes it); (c) **own-node ownership** — a re-render
  removes **exactly** the nodes the host placed and nothing else; a **foreign sibling survives
  two re-renders as the SAME element** (`toBe`); (d) **no content authored** — **no text, no
  default label, no class taxonomy, no styling, and NO `publish` API**; (e) ordering is a
  **projection** of the caller's `order` (never DOM order) and an order change performs
  **zero graph ops**; (f) empty key set ⇒ an empty container and no throw; a `null`/absent
  container ⇒ every operation a no-op with a valid state; an **undeclared key ⇒ a TYPED
  REFUSAL, never a silent create**.
- **The declined half (unchanged):** the **publisher/carrier** half stays DECLINED
  (`AUTHORS-UI-CONTENT`, `(C)#2`) — it authors the element's text and slot content. **A
  `U-SLOTHOST` must never grow a `publish` or a mirror-class taxonomy** (`H-r15`).
- **Placement:** **wave D**, with `U-LISTHOST` and `U-PROJ` (all three are
  "own-node/order/declaration" mechanisms sharing one layer and one test idiom). Rollback =
  **delete the module**. Legs = node suite; **a real-DOM identity row is optional and, if
  taken, goes on the `ui` leg**.

### 1.11 `U-REALDOM-BOOT` (A-d8 — the third gate leg, `npm run ui`)

- **Owner artifacts:** `package.json` (a `"ui"` script), a new shared Electron-spawn helper
  (**extracted from the twice-duplicated spawn** in `scripts/electron-divergence.mjs`),
  `scripts/electron-ui.mjs` (the leg), **one additive production seam in `src/main/main.ts`**,
  and `docs/specs/ci-ui-leg.md` (**OWED — not filed**).
- **The one production-file change it needs, ruled:** honor a **user-data override BEFORE the
  security store is created**, so the leg can run under a **controlled temp profile**. It is
  **additive** — **absent ⇒ today's behaviour byte-for-byte** — and it must be its own
  **red-first** row. **The alternative is rejected:** flipping the store's default groups
  changes a security default, and writing the developer's real `userData` mutates operator
  state outside the app.
- **Preferred measurement channel — `ALL_TOOLS` stays untouched by it:** a provident
  **handler body** loaded through the **EXISTING** `provident.load`/`code.load`, reading
  `getBoundingClientRect`/`getComputedStyle` **in the real renderer's realm** and **writing
  the value into graph content**, so the value comes back over the existing
  `get_rendered_html`. The eval gate stays **opt-in and temp-profile-scoped** (the leg may
  never enable `code` against the developer's real profile). **Fallbacks**
  (`webContents.executeJavaScript`, then CDP via `webContents.debugger`) are **LEG-ONLY and
  may NEVER become MCP tools** — an MCP-visible "eval in the renderer" tool is a
  self-granting capability breach.
- **Red rows, contract-exact:** **R0** isolation across **two temp profiles** (identical
  `tools/list` + identical `list_targets` census/`nodeId` vocabulary; neither reads the
  developer's persisted security store — **this fails today**, which is the honest red);
  **R1** the leg is real and **distinguishable** from the shim leg by a **typed marker**
  (indistinguishable ⇒ a re-scope finding, never a pass); **R2** **ONE** real measurement
  (`width > 0 && height > 0` + a non-`''` `getComputedStyle` value, both appearing in the
  graph content read back); **R3** the shim leg is recorded **UNSUPPORTED** — **never
  divergent, never a fabricated zero**; **R4** the honest-limits row **(§1.13's statement
  printed verbatim + a static row that the leg contains no call that could be mistaken for an
  app-level claim)**.
- **Stop conditions (binding):** the window never paints ⇒ **fail loudly, never record `0`**;
  `npm run divergence` not green for the same built tree ⇒ the `ui` leg reports
  **PRECONDITION-FAILED**; the two legs indistinguishable ⇒ a re-scope finding; no `DISPLAY`
  and no xvfb ⇒ a **prerequisite error naming the fix, never a skip**.
- **Scope exclusion, stated:** **the battery's migration to the real renderer is OUT OF
  SCOPE.** Before battery scenarios can move, all four of these must hold: (a)
  `U-REALDOM-BOOT` green with a hermetic profile and a real measurement; (b)
  `U-ENGINE-PIN`'s shim completion + guard landed; (c) the harness supports the battery's
  scenario shapes (a scenario-**envelope** channel, i.e. `U-DIVERGENCE-EXT` generalised);
  (d) a **declared runtime budget** (one Electron boot per scenario is not viable — many
  scenarios per boot is a **new design decision, not implied by A-d8**).

### 1.12 `U-DIVERGENCE-EXT` (A-d8 / `H-r10` — its own unit, landing right after `U-REALDOM-BOOT`)

- **What it is:** the `H-r10` **scenario-envelope channel** (`scenarioEnvelope(kind)` called
  identically on **both** legs) + the **attribute-presence extractor** (the **set** of
  attribute names, compared **set-wise** — a substring row is a **guaranteed false red**,
  `RK-6`).
- **Binding constraint:** **`divergence`'s pinned N=9 identity stays EXACTLY intact.** It
  modifies a **pinned, passing** leg, so it lands **separately from** `U-REALDOM-BOOT` (it
  must be revertible without touching the new leg) and **is not superseded** by it.
- **Cross-unit obligation:** `ui`'s first measurement row (R2) reads numbers, not attribute
  presence, so it does **not** depend on the extractor — the extractor is a **strict
  precondition only for the attribute rows**.

### 1.13 The honest limits (`U-REALDOM-BOOT`'s R4 row) — record verbatim-in-substance

**A `ui` green proves that a specific probe, executed inside ONE real Electron renderer boot
under a controlled profile, produced the asserted value — and nothing else.** It **must
never** be used to claim: that the **packaged** app behaves this way; **app-green from
node-green**; any MCP-contract property obtained **outside** the MCP surface; that
`provident.dispatch` is a **real gesture** (it carries an event **name** with no coordinates —
`S-d9`); that `get_rendered_html` observes **layout** (it reads `mount.innerHTML`); or that
the **shim is now faithful**.

**Hermeticity truth (§1.14) — the two-part statement:** **isolation YES** (temp profile,
no network, no writes outside the temp dir); **headlessness NO** (an undeclared display
prerequisite is the `RK-7` flake class, so it is declared with an actionable failure).
**The shim is DEMOTED TO PRE-FILTER — not retired.** Its authority is limited to what
`divergence` + `ui` corroborate; **no unit may claim a shim-green is a real-DOM green**, and
the leg ordering makes the shim the **pre-filter** and the real window the **confirmer**.
**Nothing was retired, archived or moved by this.**

### 1.14 The five dissents (recorded, not adopted)

1. **DISSENT 1 — the focus tool is an agent-reachable operator-UI-state write, and that is a
   real (accepted) weakening.** It is ON by default (group `dispatch`), so **any connected
   agent may change what the human sees, with no human grant.** It violates no principle
   (focus grants no capability, mutates no graph, persists nothing) but it **is a new class:
   agent-driven operator-visible state change without a gate.** **The narrower shape, recorded
   as the fallback if this proves uncomfortable:** a group that requires a human grant
   (`graph`, or a **new `ui` group** — the latter being a bigger `VALID_GROUPS` contract edit).
   **Not adopted now**, because A-d5 is explicit that the tool is reused across projects; the
   mitigation is the written bound (§1.7) **plus a decision row that states the weakening in
   one sentence, so it is a decision and not an accident.**
2. **DISSENT 2 — display-free is not achievable, so "a third CI leg" cannot be a CI leg in
   the ordinary sense.** This repo has **no CI config at all**, so "CI" means "a repeatable
   script a human/agent runs". Recorded accordingly rather than asserting a headlessness the
   code does not have.
3. **DISSENT 3 — `U-REALDOM-BOOT`'s production seam is a real cost for a test's benefit.** It
   is production code changed for the leg and it touches the security store's path. Ruled for
   because the alternative (R0 failing, or the leg writing the developer's real profile) is
   worse. **The narrower shape, recorded:** spawn the leg's app with a distinct Electron
   `--user-data-dir` and verify that the app honours it — unverified from here, and **R0 is
   precisely the row that would settle it**.
4. **DISSENT 4 — `SCH-9` is only half-declined and the count vocabulary cannot express
   that.** Resolved by counting `SCH-9` among the items that contribute an adopted unit **and
   naming the publisher half explicitly**, matching the record's own part-half convention. A
   later pass that prefers a cleaner identity must re-state the `SCH-1`/`SCH-9`/`SCH-12`
   part-halves **in one place rather than inventing a fourth disposition verb.**
5. **DISSENT 5 — one ruling cannot be honoured as stated, and compliance is NOT
   manufactured.** A-d5 (focus mutates no graph/RAG) + A-d8 (the `ui` leg observes UI truth)
   + A-d6 (ship an appearance control) + `docs/decisions.md:53` (no non-graph UI) are
   **satisfiable only** because the appearance control sits **in the authoring graph** and
   focus sits **out of the graph entirely**. **Named as a review finding in the prohibitions
   section:** a future pass that moves focus state **into** a graph node "so the agent can
   change it", or moves the appearance control **out** of the graph "so it can be styled",
   **breaks both rulings at once.**

## 2. The consolidated count identity (binding — replaces every earlier figure)

### 2.1 The unit list, stated exactly, with its arithmetic

**Items: 13. Units: 20. Declined part-halves: 3. PARK: 0. DONE: 0. Legs green: 0.**

**`SCH`-derived units (16):** `U-MOUNTGUARD` (`SCH-1` invariant half) · `U-GSESSION`
(`SCH-2`) · `U-ZONES` (`SCH-4`) · `U-CENSUS` (`SCH-8` census half) · `U-GUTTER` (`SCH-6`) ·
`U-RELOCATE` (`SCH-7`) · `U-CONTAINER` (`SCH-10`) · `U-MENULIB` (`SCH-5`) · `U-PROJ`
(`SCH-8` projection half) · `U-LISTHOST` (`SCH-11`) · `U-SLOTHOST` (`SCH-9` host half) ·
`U-THEME` (`SCH-3` mechanism) · `U-THEME-CONTROL` (`SCH-3` authored control) ·
`U-FOCUS-MODEL` (`SCH-13` model) · `U-FOCUS-TOOL` (`SCH-13` tool) · **`U-OVERLAY`**
(`SCH-12`).

**ARITHMETIC, stated so nothing double-counts — and verified:**
- The **fifteen** units named in the A-d4…A-d8 ruling's own list (`U-MOUNTGUARD`, `U-GSESSION`,
  `U-ZONES`, `U-CENSUS`, `U-GUTTER`, `U-RELOCATE`, `U-CONTAINER`, `U-MENULIB`, `U-PROJ`,
  `U-LISTHOST`, `U-SLOTHOST`, `U-THEME`, `U-THEME-CONTROL`, `U-FOCUS-MODEL`, `U-FOCUS-TOOL`)
  **count to 15.**
- **`U-OVERLAY`** (`SCH-12`'s overlay) is a **sixteenth** `SCH`-derived unit that the ruling's
  own list **omits but its own sources name** — it is already an adopted unit from the
  A-d1/A-d2/A-d3 layer (`SCH-12` → `U-OVERLAY`) and it appears in the ruling's **wave E**.
- **15 + 1 = 16 `SCH`-derived units.** ✔
- **16 `SCH`-derived + 2 engine (`U-ENGINE-PIN`, `U-ENGINE-DRIFT`) + 2 harness
  (`U-REALDOM-BOOT`, `U-DIVERGENCE-EXT`) = 20 units.** ✔
- **The identity's leading "13 items" and the "= 20" total do NOT close as one sum.** Read
  strictly, `13 + 16 + 2 + 2 = 33`, not 20; the **20 is the UNIT total** and the **13 is the
  ITEM total**, and the two are different populations (16 units derive from 13 items, and
  three of those items contribute **two** units each: `SCH-3`, `SCH-8` and `SCH-13`). **This
  pass states the discrepancy rather than fudging it.** The unit arithmetic closes at **20**
  and the item arithmetic closes at **13**; there is no single sum that yields both, and any
  doc table that presents "13 items … = 20 units" as one addition is arithmetically wrong.
- **A second, independent check of the ruling's own claim:** the ruling's text asserts "16
  `SCH`-derived" **and** lists 15. **The 16 is right; the list is short by `U-OVERLAY`.** The
  authoritative final list is the sixteen above.
- **Plus the fork-owned `H-r1` correction package as a QUEUE ROW — NOT a unit.** It is counted
  nowhere in the 20.
- **Items: all 13 contribute at least one adopted unit.** `SCH-1`↔`U-MOUNTGUARD`,
  `SCH-2`↔`U-GSESSION`, `SCH-3`↔`U-THEME`+`U-THEME-CONTROL`, `SCH-4`↔`U-ZONES`,
  `SCH-5`↔`U-MENULIB`, `SCH-6`↔`U-GUTTER`, `SCH-7`↔`U-RELOCATE`, `SCH-8`↔`U-PROJ`+`U-CENSUS`,
  `SCH-9`↔`U-SLOTHOST`, `SCH-10`↔`U-CONTAINER`, `SCH-11`↔`U-LISTHOST`, `SCH-12`↔`U-OVERLAY`,
  `SCH-13`↔`U-FOCUS-MODEL`+`U-FOCUS-TOOL` = **13 items → 16 units** ✔
- **3 items carry DECLINED part-halves:** `SCH-1`'s **region host**; `SCH-9`'s
  **publisher/carrier**; `SCH-12`'s **focus-trap + the `inert`/a11y documentation half**
  (→ the fork's `PS-1`). **No item is declined outright, and no item is declined+refiled —
  the pre-amendment "6 declined/refiled + 2 declined" figures are SUPERSEDED.**
- **Counts that move in every doc table:** `ALL_TOOLS` **21 → 22**; `RpcMethod` **21 → 22**
  (CORRECTED 2026-09-27 by the `U-ENGINE-PIN` documentation review — the live census is **21**,
  `src/shared/types.ts:259-280`, asserted at 21 by `tests/engine-pin-version.test.ts:174-197`;
  the "19 → 20" this line carried was stale);
  the default-gate registered subset **7 → 8**; the unit figure **8 → 20**; the
  declined/refiled figure **6 → 0** (replaced by **3 part-halves**).

### 2.2 Per-item table (post-A-d4…A-d8 — the governing dispositions)

**SUPERSEDES** both earlier per-item tables. Read this one.

| Item | Disposition (A-d4…A-d8) | Unit(s) | Owner | Falsification / binding row |
| --- | --- | --- | --- | --- |
| `SCH-1` `SHELL-REGION-HOST` | **SPLIT** — invariant half ADOPTED-RESHAPED; **region host STAYS DECLINED + REFILED** (A-d7 does **not** restore it) | `U-MOUNTGUARD` | this repo (invariant) / the fork (region host) | Region host's blockers are **(C)#1** (a consumer-specified closed region set) and **(C)#6** (API-shape criteria + a render-count row) — **NOT prohibition #5** — and it is redundant for the invariant (a declared region sits outside the mount). Invariant falsification unchanged: cycle-2 load ⇒ **2** roots = a HOST fix owed; **1** = detection + pin only |
| `SCH-2` `GESTURE-DELEGATE` | ADOPTED-RESHAPED (unchanged from the A-d1 layer) | `U-GSESSION` | this repo | No document-delegated `pointerdown`, no per-event `closest`, **no capture before establishment** (`H-r9`) |
| `SCH-3` `THEME-TOKEN-LAYER` | **ADOPTED-RESHAPED** (was DECLINED+REFILED; **A-d6 overrules `Q3`**) | **`U-THEME` + `U-THEME-CONTROL`** | this repo (mechanism + authored control) / **the fork** (the persisted carrier + the token values) | `resolveTheme` total + pure over an **injected** `prefersDark`; the applier **declares**, it does not write; **no `matchMedia`, no `data-theme` literal, no store**; **persistence stays consumer-side** |
| `SCH-4` `ZONE-TRACK-CONTRACT` | **ADOPTED-RESHAPED (A-d4 — the pre-A-d4 re-decline is ADJUDICATED AWAY, §0)** | **`U-ZONES`** | this repo | `TrackSpec` entirely caller-supplied; **the literal `'0px'` is NOT built in**; no DOM, no registry, no writes; non-finite/negative ⇒ **the empty token** |
| `SCH-5` `MENU-CATALOG-CONTRACT` | ADOPTED-RESHAPED (unchanged) | `U-MENULIB` | this repo | The builder imports neither `electron` nor `fs`; **no policy defaults**; the picker is injected |
| `SCH-6` `GUTTER-RESIZE-CONTROLLER` | **ADOPTED-RESHAPED (A-d4; adjudicated away in §0)** | **`U-GUTTER`** | this repo | Driven by the **adopted node-local session** (no second gesture authority — the A-d5…A-d8 objection carried as a **contract row**); one commit per gesture; cancel ⇒ zero commits/sink writes; reset ⇒ **exactly one** commit of the **supplied** default; no capture before establishment |
| `SCH-7` `PANE-RELOCATE-GESTURE` | **ADOPTED-RESHAPED (A-d4; adjudicated away in §0)** | **`U-RELOCATE`** | this repo | Resolve policy **injected**; **reveal written EXACTLY ONCE per gesture at gesture end** (a deliberate strengthening — **the fork's per-crossing implementation will fail this row until it changes**); interrupt/cancel leaves no retained sinks or listeners |
| `SCH-8` `LAYOUT-STATE-PROJECTION` | **ADOPTED-RESHAPED — BOTH HALVES; the `computeTrackVars` refile is WITHDRAWN (A-d4)** | **`U-PROJ` + `U-CENSUS`** | this repo (both halves) | `U-CENSUS` delegates token formatting to `U-ZONES`; `revealed` is a consumer decision, **never a default**; the returned key set is **exactly `zones`**; **the census object is never mutated** (the anti-second-authority row answering `V-13`) |
| `SCH-9` `SHELL-STATUS-CARRIER` | **SPLIT — host half ADOPTED-RESHAPED; publisher/carrier half STAYS DECLINED** | **`U-SLOTHOST`** | this repo (host) / the fork (the status **publisher**) | Opaque slot keys; caller-created nodes; caller-supplied order/attributes; **own-node ownership** (foreign sibling survives two re-renders as the SAME element); unknown key ⇒ **typed refusal**; **NO publish API**. `V-7` resolved by own-node ownership and kept as a hard row |
| `SCH-10` `ZONE-CONTAINER-CHROME` | **ADOPTED-RESHAPED (A-d4; adjudicated away in §0)** | **`U-CONTAINER`** | this repo | `tokensFor`/`orientationFor` with the **mirror-class taxonomy caller-supplied** (no `is-empty`/`is-minimized`/`is-revealed` literals); **ONE** shipped declaration (`contain: layout style paint`) whose **class name is caller-supplied**; consumer selectors/`:has()` stay consumer-side; **the containment row's real-DOM proof is the `ui` leg's business** |
| `SCH-11` `TAB-STRIP-SHELL` | ADOPTED-RESHAPED (unchanged) | `U-LISTHOST` | this repo | Own-node ownership + order-as-projection; **no `querySelectorAll`**; the "one overflow mode" criterion is **dropped** |
| `SCH-12` `OVERLAY-FRAME-PRIMITIVE` | ADOPTED-RESHAPED (mechanism); **package-stream refile WITHDRAWN**; **focus-trap + `inert`/a11y documentation half STAY REFILED** | `U-OVERLAY` | this repo (mechanism) / the fork + `PS-1` (focus trap + docs) | The inert background is a **declaration the consumer applies**; **no event wiring inside the mechanism**; **no focus trap, no `activeElement` walk** |
| `SCH-13` `FOCUS-SEAM` | **ADOPTED-RESHAPED (A-d5 — the pre-amendment DECLINE and `Q4` are OVERRULED; A-d5 IS the "new gate" the old clause demanded)** | **`U-FOCUS-MODEL` + `U-FOCUS-TOOL`** | this repo | The model is **pure** with injected `refuse`/`onChange`/`persist` and **no vocabulary/store/DOM**; the tool is **group `dispatch`, NOT mutating, emits no notification, persists nothing, cannot force a re-render**; **`ALL_TOOLS` 21 → 22, `RpcMethod` 21 → 22** (CORRECTED 2026-09-27 — the live census is **21**; the pre-correction "19 → 20" is stale and must not be quoted); **the preload bridge needs NO change** |

**Every 13 items contributes ≥1 unit; 3 carry a declined part-half. 0 PARK. 1 DONE. 1 unit
fully green** *(STATUS UPDATED 2026-09-27 by the `U-ENGINE-PIN` documentation review, and AGAIN by
that unit's DONE pass + the `LIVE-OP-REJECT` fix pass: `U-ENGINE-PIN` is **`DONE` — COMPLETE on
every leg its spec declares** — node suite **56 files / 795 passed / 2 skipped / 0 failed** (the
DONE-pass count was 55 files / 789; the 2026-09-27 fix pass added
`tests/op-command-unwrap.test.ts`), typecheck clean, build clean, battery **184 checks / 0
failures**, and **`npm run divergence` is GREEN — `R13 RESULT: 9 checks, 0 failures`** on the
**post-change** tree, after the supervisor landed the harness spawn fix; the earlier
"divergence leg OPEN / `BLOCKED-with-signature` / SIGTRAP" state recorded here is **superseded**.
Its one live finding is **`LIVE-OP-REJECT`** — a **HOST**-owned pre-existing defect in **this repo's
renderer IPC unwrap** (**not** a package defect, so **no upstream issue is owed**) — and it is
**FIXED + LIVE-VERIFIED** (2026-09-27; the defect row sits in `docs/defects.md`'s `## FIXED (in this
repo)` section, and the live probe flipped `{status:'rejected'}` → `{"status":"applied", …}`). The
unit's per-unit doc review has RUN
(`archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`); its DONE row is `docs/next-steps.md`'s
`U-ENGINE-PIN` DONE record. Every other unit is not started.)*
`Q3` and `Q4` are **ANSWERED** by A-d6 and A-d5 respectively; `Q5`'s install is
**DONE**; `Q6` is **ANSWERED** by A-d7; `Q7` is **ANSWERED — ACCEPT** (the devDependency jump;
`docs/decisions.md` `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`) and `Q8` is **ANSWERED — the architect
chose the public pane seam** (§4.6; `docs/decisions.md` `ENGINE-PIN-PANE-INJECTION-SEAM`).

## 3. The 20-unit plan, waves, and the checkpoint rule

**Sequencing rule (binding):** the **two engine units precede every shell-chrome unit**
(`S-d10`); the harness wave (`C`) precedes any unit whose spec claims a `ui` row; within a
wave the order respects the dependency edges that survive the reshapes (`H-r6`).

| Wave | Units in order | Checkpoint (a GATE, not a suggestion) |
| --- | --- | --- |
| **A — engine pin** | `U-ENGINE-PIN` (install **DONE**; shim completion + guard **red→green**) | trio + battery green under the landed pin; the red ledger recorded per `docs/specs/engine-pin.md` §4.3; **no `focus` rows in this unit** |
| **B — engine drift** | `U-ENGINE-DRIFT` | all three legs green; measurements recorded (may legitimately be **zero code**) |
| **C — harness** | `U-REALDOM-BOOT` → `U-DIVERGENCE-EXT` | `npm run ui` green incl. R0/R3/R4; `npm run divergence` still **9/9** with the extractor; `ci-divergence-leg.md` + the new `ci-ui-leg.md` amended (**truthful hermeticity**) |
| **D — declaration / ownership** | `U-MOUNTGUARD` → `U-LISTHOST` → `U-SLOTHOST` → `U-PROJ` | each unit's own 7-gate cycle; `ui` rows **optional-per-spec**; **no unit may claim a real-DOM row without the extractor** |
| **E — geometry / interaction** | `U-ZONES` → `U-CENSUS` → `U-GUTTER` → `U-RELOCATE` → `U-CONTAINER` → `U-GSESSION` → `U-MENULIB` → `U-THEME` → `U-OVERLAY` | **the geometry family's criteria are UNPROVABLE in this repo today** (node layer asserts contracts/arithmetic only) — say so in every affected spec; `U-OVERLAY`'s real-DOM `inert` row needs wave C; `U-THEME`'s `§0` prohibitions table complete |
| **F — app surface / MCP** | `U-THEME-CONTROL` → `U-FOCUS-MODEL` → `U-FOCUS-TOOL` | the **census re-parameterisation lands in the SAME pass** as `U-FOCUS-TOOL`; `docs/specs/mcp-endpoint.md` amended in that pass (§3/§3.8/§6.2/§7/§8/§9); **no notification**; the `ui` leg now observes the tool |
| **Fork** | the `H-r1` correction package | **the fork's pass.** This repo writes **no** file under `<Astrographer>/` |

**20 units CANNOT land in one pass** — that is **20 × (spec → TestWriter red RUN and
REPORTED → least-code green → adversarial → blind greens → per-unit documentation review →
trio)** minimum, and `AGENTS.md` item 2 / RCA-5 **forbid batching two units into one run**.
**The plan therefore proceeds WAVE-BY-WAVE with a tracker reconciliation + a handover at each
checkpoint** (`AGENTS.md` item 3's documentation-staleness review, run at the checkpoint
rather than at the end). Additional costs, named so no supervisor is surprised:
`U-ENGINE-PIN` owns a live red ledger + a stale spec's line numbers; `U-ENGINE-DRIFT` may
legitimately be zero code; `U-REALDOM-BOOT` adds a **display-bound leg + one production
seam**; `U-DIVERGENCE-EXT` is a change to a **pinned, passing** leg (the riskiest harness
change); `U-FOCUS-TOOL` adds **six wiring sites + an MCP-contract amendment + a test-census
contract change**; `U-THEME`/`U-THEME-CONTROL` are the cheapest and the **most likely to be
over-read**; `U-GSESSION` remains the largest behavioural unit.

**No unit is delegable.** Each needs (a) the architect's go-ahead for **this** plan, (b) its
`docs/specs/<unit>.md` spec to exist, and (c) a TestWriter to have **RUN and REPORTED** its
red set (`AGENTS.md` item 9).

## 4. Recorded facts — the honest status the amendment must state

### 4.1 THE PIN HAS MOVED (every "the pin has not moved yet" clause is now STALE)

- `package.json:23` = `"provident-ssr": "^0.5.1"` (read this pass).
- `package-lock.json:2264` resolves `registry.npmjs.org/provident-ssr/-/provident-ssr-0.5.1.tgz`
  (read this pass).
- `node_modules/provident-ssr/package.json:3` = `"version": "0.5.1"` (read this pass).
- **The architect ran the install.** Every "the pin has NOT moved yet" clause is **SUPERSEDED**:
  in this record (the A-d1 layer's layer-declaration item 5(d) and its `H-r3` note),
  `docs/specs/engine-pin.md` (§ Layer declaration item 6 + §3.1's "pre-retarget (today)" +
  §2.1's "today" comment), `docs/next-steps.md` ("Two things gate everything"), and
  `docs/decisions.md`'s `ENGINE-PIN-0.5` row. Each is **corrected in this same pass** with the
  old text annotated, never deleted.

### 4.2 THE SAME INSTALL MOVED THREE devDependencies OUTSIDE THE UNIT'S DECLARED SCOPE (UNPLANNED SCOPE CHANGE — OPEN)

| Package | Declared before | Now (`package.json:25-31`, read this pass) |
| --- | --- | --- |
| `electron` | `^33.4.11` | **`^44.4.5`** |
| `esbuild` | `^0.24.0` | **`^0.28.2`** |
| `vitest` | `^2.0.0` | **`^5.0.1`** |

- **Recorded as an UNPLANNED SCOPE CHANGE, not as part of `U-ENGINE-PIN`'s contract.**
- **Verification status (claimed, `(A-d5…A-d8 ruling)` — this DOC-ONLY pass did NOT run a
  suite):** the **pre-existing 658 tests / 2 skipped still pass under vitest 5**.
- **Flagged as an OPEN ITEM needing the architect's ACCEPT-OR-REVERT decision** — see the
  `docs/pending.md` row and `docs/next-steps.md`'s new open decision `Q7`.
- **`U-ENGINE-PIN`'s `§2.1` ("one dependency line") is CONTRADICTED by the tree.** The spec's
  diff-scope pin (`docs/specs/engine-pin.md`'s §5.1, **now at `:1508-1563`** — the pre-amendment
  `:522-529` anchor was corrected 2026-09-27 by the `U-ENGINE-PIN` doc review, "exactly these tracked files change") and
  its `R-14b` row (which asserts the **dependency set**, not the devDependency set) must be
  **amended to name the three devDependency moves** or the moves reverted. **NOTHING IS
  REVERTED IN THIS PASS** — the decision is the architect's (`Q7`).
- **One consequence to note honestly:** `electron` `^44` is a **major** jump (the repo's
  `docs/decisions.md` `ELECTRON-PIN` row pinned `^33` against Electron 43's ESM-only
  `@electron/get@5` needing Node ≥22.12). The engine pin's own red set does not cover it, and
  the `ui` leg's `webContents.executeJavaScript`/`debugger` availability was **not verified**
  against Electron 44 in any pass.

### 4.3 `U-ENGINE-PIN` — PARTIALLY LANDED, with a LIVE RED LEDGER

**Record exactly that: `U-ENGINE-PIN` is PARTIALLY LANDED — not DONE, not green.**

- **The red run is LIVE and its ledger is recorded:** **79 assertions across six new test
  files** (the six files exist — verified by glob this pass:
  `tests/engine-pin-version.test.ts`, `tests/engine-pin-boolean-dom.test.ts`,
  `tests/engine-pin-boolean-ssr.test.ts`, `tests/engine-pin-controls.test.ts`,
  `tests/dom-shim-remove-attribute.test.ts`, `tests/host-guard.test.ts`), of which
  **61 are RED — 56 of them throwing `TypeError: … removeAttribute is not a function` — and
  18 are green-not-red**.
- **The pre-existing suite is UNCHANGED**: **48 files / 658 passed / 2 skipped**.
  `(A-d5…A-d8 ruling)` — this DOC-ONLY pass did not run it; the 658/2 baseline is a **claim**,
  and `U-ENGINE-DRIFT` re-baselines it.
- **`H-r7`'s shim completion is STILL RED**: `src/shared/dom-shim.ts` has no `removeAttribute`
  (the `§2.2.4` row of `tests/engine-pin-version.test.ts`, read this pass at `:153-162`,
  asserts the prototype **contains** it). **The green step is IN FLIGHT.**
- **The TestWriter's three findings are OPEN ITEMS (recorded so nothing is lost):**
  1. **`R-13` is UNWRITABLE WITHOUT A TEST SEAM.** The `R-13` row (`SecurePanels.syncConfig`'s
     managed-channel row) needs a class that **exposes no public injection point** — the pane
     half therefore needs **either a spec-amended seam or a ruling that the row is
     predicate-level only.** **OPEN — architect decision `Q8`.**
  2. **A SPEC BUG: the guard predicate must cover the engine-effective mutation namespace
     `css.<key>`** — not only `props.<key>` and `css:<key>`. **`css:<key>` is the ADAPTER OP
     NAME and is SILENTLY INERT** at the mutation boundary, so a guard written to
     `props.`/`css:` alone **misses the namespace the engine actually mutates**.
     **`docs/specs/engine-pin.md` §2.3/§3.5/§5.5 must be amended** (this is a **spec**
     correction, host-owned, **not** a `docs/defects.md` row). **OPEN.**
  3. **The two controls were captured on the `0.5.1` tree with a temporary probe, NOT on
     `0.2.1`**, and **the `R-14` rows now pass because the pin already moved.**
     **Consequence, stated honestly:** `R-16`/`R-17`'s "byte-identical to the `0.2.1`
     baseline" claim is **not** backed by a `0.2.1` capture in this tree — the controls are a
     **`0.5.1` self-consistency** pin unless a `0.2.1` capture is produced. `U-ENGINE-DRIFT`
     is where that is settled. **OPEN.**

### 4.4 `H-r7`'s shim completion is still RED (restated as its own recorded fact)

> **STATUS-CORRECTED 2026-09-27 by the `U-ENGINE-PIN` doc review — read this box first.**
> The fact below was true when written and is **superseded**: `src/shared/dom-shim.ts` **now
> has** `removeAttribute` (`:63-75`, read: the `id` slot+store special case, the §2.2.1
> `value`-slot special case on `INPUT`/`TEXTAREA`, the store fallback), and its rows are
> **landed and green** (`tests/dom-shim-remove-attribute.test.ts`, including the `value`
> sibling row at `:140` and the store-only `SELECT` row at `:174`). The divergence/shim leg
> no longer throws during `provident.load`; the leg's own re-run is **OPEN for an
> environment reason** (Chromium `/dev/shm` denial in the sandbox — `docs/next-steps.md`
> `## CURRENT WORK / HANDOVER STATE` item 2), **not** for the completion.

`src/shared/dom-shim.ts` **has no `removeAttribute`** *(as of that pass)* (read path: the shim implements
`setAttribute`/`getAttribute` only). `tests/engine-pin-version.test.ts` asserts its presence.
**The green step is in flight.** Until it lands, the divergence/shim leg **throws during
`provident.load`** and **every unit whose spec claims a real-DOM attribute row is blocked on
wave A** (`H-r10`(4)).

### 4.5 The doc-drift list (all HOST-OWNED — **no `docs/defects.md` / `docs/HANDOFF.md` rows**)

Each finding below is **this repo's own claim drift**, fixed in this same pass. The precedent
is `R13-HOST-FIX` (`docs/decisions.md:39`): a host finding does **not** belong in the package-gap
catalogue.

| # | Drift | Fix applied this pass |
| --- | --- | --- |
| 1 | `docs/specs/e2e-test-battery.md:309` cites **`tests/helpers/dom-shim.ts`**, which **does not exist** (`tests/helpers/**` has no files; verified by glob) — the shim is **`src/shared/dom-shim.ts`** | **Citation corrected in place** |
| 2 | `README.md:73` says "all **15** MCP endpoints" while `ALL_TOOLS` is **21** today and **22** with `provident.focus` | **Corrected in place** (README only) |
| 3 | `tests/blind-security-gate.test.ts:31-47` carries a stale **15-name** tool list | **NOT EDITED — tests are out of this pass's scope.** Verified: the list is fed only to a registered-name helper and is **never count-asserted**, so extending it is doc hygiene, not a red-set edit. Recorded in `docs/pending.md` for the owner of `U-FOCUS-TOOL` |
| 4 | `docs/specs/mcp-server-gate.md:52-61` says "the **18** `provident.`-prefixed names" / "**7** tools under the default gate" | **Corrected in place** to 21 (**22** with focus) / 7 (**8**) |
| 5 | `docs/specs/mcp-endpoint.md:361-366`'s group table has **no `module` row** while `VALID_GROUPS` has five members | **Recorded as owed** — it lands **with** `U-FOCUS-TOOL`'s `mcp-endpoint.md` amendment (same pass as the tool), not as a silent edit now |
| 6 | `docs/pending.md`'s "**U5 LANDED — image/binary MCP tool-channel**" claim: the capture provider has **no production call site** — the channel is **reachable only from tests and the provider is UNSET in the app** | **Annotated in place** (this is the strongest finding: a claimed landing production cannot exercise) |
| 7 | `docs/specs/ci-divergence-leg.md:18,24-25,49-50`'s false headless/hermetic claim | **Corrected to the two-part truth** (`H-r19`), **N=9 unchanged**, plus the `ui`-leg boundary note (`OWED` until `U-REALDOM-BOOT` lands) |
| 8 | The count/tool-name figures in `docs/FORKER.md`, `docs/pending.md`, `docs/next-steps.md` and `docs/decisions.md` that predate A-d4…A-d8 | **Re-derived in this pass** |

**Archival loop (AGENTS.md item 6) — VERIFIED and stated: NOTHING is archived, moved or
repointed by this amendment.** No file is added, removed or relocated; every earlier layer
stays at its own path with its own text. The one hazard this pass creates is the **row
INSERTION** in `docs/decisions.md`, which shifts anchors for rows **below** the insertion point
— resolved by inserting **after** every cited row (§4.7).

### 4.6 The `Q` table — answered, done, and the new open items

| # | Question | State after A-d4…A-d8 |
| --- | --- | --- |
| **Q1** | The plan go-ahead | **RE-OPENED** — the plan changed from 8 to **20 units**; the architect's go-ahead is owed for **this** plan, wave by wave |
| **Q2** | The `setPointerCapture` reading | **ANSWERED** (narrow reading binding — `S-d9`/`H-r9`), carried into `U-GUTTER`/`U-RELOCATE` as contract rows |
| **Q3** | `SCH-3`'s marginal case | **ANSWERED — (b) ADOPTED** by A-d6 (`U-THEME` + `U-THEME-CONTROL`); the pre-amendment recommendation (a) is **overruled**, and `U-THEME-MIN` is retired |
| **Q4** | `SCH-13` | **ANSWERED — (b) ADOPTED** by A-d5 (`U-FOCUS-MODEL` + `U-FOCUS-TOOL`); the pre-amendment recommendation (a) is **overruled** |
| **Q5** | The install route + the shim call | **INSTALL DONE** (the pin moved; §4.1). The shim call stands as ruled (`H-r7` (iv)); `hasAttribute` still **not** added. **The install's devDependency side-effect is a NEW open item — see `Q7`** |
| **Q6** | The static-UI reading | **ANSWERED — reading (a)** by A-d7 (`H-r17`): `AGENTS.md:23-34` + `docs/decisions.md:53` unchanged; region host stays declined; `U-SLOTHOST` adopted host-only |
| **Q7** | **NEW — the devDependency scope change** | **OPEN** — accept the three devDependency moves (`electron` `^44.4.5`, `esbuild` `^0.28.2`, `vitest` `^5.0.1`) and amend `U-ENGINE-PIN`'s `§2.1` diff-scope pin, **or** revert them (which needs another architect-run install). **NOTHING IS REVERTED.** Recommend: accept, amend the spec, and add the Electron-major risk to the register |
| **Q8** | **NEW — the two unit-level blockers** | **OPEN** — (a) the `R-13` seam question (does `SecurePanels` gain a spec-amended public injection seam, **or** is `R-13` ruled predicate-level only?); (b) the app-level `ui`-leg claim boundary and whether the demo appearance control ships at all. Recommend: (a) **predicate-level only** for `R-13` (no production seam for a test's convenience), (b) the demo control **ships** (A-d6 requires it) |

## 5. Security / equivalence table (A-d4…A-d8 additions)

| Obligation | Content |
| --- | --- |
| **`provident.focus` is an agent-writable operator-UI surface — stated as a DECISION** | An agent **MAY** change the active UI entry and open entries (subject to the consumer's injected refusal); it **MAY NOT** alter any persisted operator setting, read/write the security or tool-group config, change the graph/envelope/any node's props or content, reach the isolated `SecurePanels` graph, cause a persistence write of this repo's own, or cause any notification. **Recorded as an accepted weakening** (dissent 1) — the repo's "an agent must not grant itself capabilities" principle is **not** violated (focus grants no capability) but this **is a new class: agent-driven operator-visible state change without a gate** |
| **Focus is NOT a mutation and the negative must be asserted** | A **negative row** is required: after an `ok` focus reply, **no `notifications/resources/updated`** is sent and **no `app-graph-changed`** — the enforceable meaning of "cannot force a re-render". A future edit that adds `'focus'` to `MUTATING_METHODS` is a **contract violation the red set must catch** |
| **Focus equivalence limit** | The tool and the app's own focus path reach the **same** model, so they are equivalent **in the resulting state** (deep-equal `entries`/`activeId`, same `onChange` count). They are **NOT** equivalent in notification emission (neither emits — a `MUST NOT`, not a difference), persistence (neither persists here), graph visibility, or gesture reality. **A focus call is never a real user gesture** |
| **Focus isolation** | The focus model never reads or writes the isolated `SecurePanels` graph; no session/model handle may appear in `list_targets`; **no new IPC channel, no new preload member, no new tool group, no new resource, no CSP change** (nothing in focus needs `unsafe-eval` — it is not a function-string handler) |
| **The `ui` leg's probe channel** | **stdio-local only** (the leg spawns the app itself, so no MCP client can reach the probe); the **eval gate stays opt-in and TEMP-PROFILE-SCOPED** (never the developer's real profile); the probe body **reads only geometry/style and writes only its own node's content** — no file, no network, no IPC, no `window.provident.security`; the leg's scenario envelope is **leg-owned test data, never shipped**. **`webContents.executeJavaScript`/CDP may NEVER become MCP tools** |
| **The geometry family's equivalence limit (A-d4's mandatory clause)** | The five panes/zones units may claim **contract/arithmetic** properties only. **Any claim about rendered geometry, CSS resolution or layout is UNPROVABLE in this repo today** — the node layer cannot see it, and any such row belongs to the `ui` leg with the §1.13 bound attached |
| **`U-THEME`'s limit** | The mechanism **declares**; the **consumer applies**. No claim that a theme was applied, persisted, or that any token value exists, may be made from `U-THEME`'s rows |
| **`U-SLOTHOST`'s limit** | **No claim that the host "owns the region"**, no claim that the graph's child order changed (order is a **projection**), and no slot-content claim — the host authors nothing |
| **Carried forward unchanged** | `U-GSESSION` is **NOT reachable by `provident.dispatch`**; **magnitude-equivalence is FORBIDDEN**; the session installs into **one** graph's DOM only (`MULTI-GRAPH-ISOLATION`, `docs/decisions.md:51`); the `J6` five/now-six-seam negative is an explicit non-goal in every unit spec; **what every node-green must NOT be claimed as** (real click · layout/paint · listener removal · focus/`activeElement` · absence-of-attribute after a close on the shim · a cross-envelope count of DOM roots) |

## 6. Risk register (A-d4…A-d8 additions — `RK-1..RK-12` all stay live)

| # | Risk | Likelihood / impact | Mitigation / owner |
| --- | --- | --- | --- |
| **RK-13** | **The focus tool is a new class of agent-reachable operator-visible state change with no human grant** | Medium / Medium — an accepted weakening, recorded as a decision | Dissent 1's written bound (§1.7/§5) + the negative notification row; the narrower fallback (a grant-requiring group or a new `ui` group) is recorded, **not** adopted |
| **RK-14** | **The `ui` leg's display dependency and flake cost** — a new leg is a new flake surface, and the display prerequisite is undeclared in every existing spec | Medium / Medium-High (an undeclared prerequisite is the `RK-7` class) | The two-part truth (`H-r19`): isolation required, headlessness declared with an **actionable** failure; the `ui` leg's `PRECONDITION-FAILED` report instead of a measurement |
| **RK-15** | **The demo appearance control is over-read as production UI** — the cheapest unit in the set is the most likely to be generalised | Medium / Medium (it would put app UI content into a consumer-agnostic mechanism) | `U-THEME-CONTROL`'s explicit "demonstration code, not an app" clause; `U-THEME`'s spec readable **with the demo deleted**; the `C-16`-class falsifying row |
| **RK-16** | **The census-change collision**: `U-FOCUS-TOOL` moves `ALL_TOOLS` 21 → 22 while `tests/engine-pin-version.test.ts` pins a numeric freeze **and** `U-ENGINE-PIN` is mid-red | **High if mis-sequenced** / High — the tool landing before the re-parameterisation **turns a green suite red**, and the re-parameterisation done late reads as a doctored red | `H-r18`'s **same-commit rule**; the diff-freeze restatement in `docs/specs/engine-pin.md` (`§0` prohibition 5, now `:253`); `U-ENGINE-PIN` must **not** carry the focus rows |
| **RK-17** | **The devDependency scope change** (`electron` `^44.4.5`, `esbuild` `^0.28.2`, `vitest` `^5.0.1`) is unplannable risk that shipped with the install and is **not covered by the engine pin's red set** | Medium / Medium-High (an Electron **major** jump; `@electron/get@5`'s Node ≥22.12 requirement was the original reason `^33` was pinned) | The `docs/pending.md` row + `Q7`'s accept-or-revert decision; **nothing reverted**; the `ui` leg's Electron-44 API assumptions (`executeJavaScript`, `debugger`) are **unverified** |
| **RK-18** | **The `css.`/`css:` spec bug means the shipped guard predicate can be SILENTLY INERT** — a guard that covers `props.`/`css:` but not `css.<key>` misses the namespace the engine actually mutates, so the red set can pass while the real hazard survives | **High if uncaught** / High (a false green of exactly the class `RK-1` names) | The `docs/pending.md` row + the `docs/specs/engine-pin.md` §2.3/§3.5/§5.5 amendment (§4.3 finding 2) — **the spec is wrong, not the code, and no `docs/defects.md` row is owed** |
| **RK-19** | **The geometry family's criteria are unprovable here, and a later pass may "prove" them from a node-green** | Medium / Medium — the repo's recurring false-green class | A-d4's **mandatory wording** clause (§1.1/§1.3/§1.5 + the §5 equivalence row): wherever geometry criteria are described, the unprovability is stated |
| **RK-20** | **Two dispositions were re-derived from stale landed rows** (the §0 adjudication) — the same class can recur if a later pass reads a landed layer without reading the amendment layers | Medium / Medium-High | The three-layer `Layer` convention made explicit; **the count identity and the per-item table now live in ONE place** (this amendment record), cited by ID rather than by line; `H-r1`'s "cite and supersede" rule applies to any future re-file |
| **RK-21** | **Doc-drift on the tool counts across five files** (`README.md`, `mcp-server-gate.md`, `blind-security-gate.test.ts`, `FORKER.md`, `mcp-endpoint.md`'s missing `module` row) | **Certain** / Low-Medium per item, Medium in aggregate | Fixed in this pass where host-owned and doc-only; the test file's stale list is **recorded** for `U-FOCUS-TOOL`'s owner; the `module` row lands with the tool |

## 7. Layer declarations (corrected)

1. **This record is DOC-LAYER ONLY — restated for A-d4…A-d8.** No acceptance criterion was
   executed by this pass: **no suite ran, no trio ran, no Electron window booted, no `ui` leg
   exists, and no `get_rendered_html` byte-diff was taken.** The rulings adjudicated
   **documents and designs**, not mechanisms.
2. **The mount invariant's current behaviour is STILL UNPROVEN.** `U-MOUNTGUARD`'s red run is
   what settles the cardinality; this record asserts none.
3. **No green in either repo proves adoption.** A green proves a suite is green. Adoption is
   proven only after a unit's red set is **RUN and REPORTED** (RCA-1) and its greens ship.
4. **The 20 units DO enter the queue** (`docs/next-steps.md` `## OPEN`), each `BLOCKED`. A unit
   is **not delegable** until (a) the architect's go-ahead for this plan and (b) its spec
   exists and a TestWriter has **RUN and REPORTED** the red set (`AGENTS.md` item 9).
5. **Amendment limits, honest.** (a) **Nothing was executed** by this pass either. (b) **The
   `0.5.1` dist was not re-read**; the `0.5.1` behaviour statements remain `(engine recon)` /
   adjacent-source derived. (c) **THE PIN HAS MOVED** (SUPERSEDES the A-d1 layer's item 5(d),
   which still reads "the install was NOT performed" — corrected in §4.1). (d) **The install
   is not verifiable from inside a session**: the lockfile diff, the resolved integrity string
   and the installed dist's line numbers are **architect-supplied inputs**. (e) The
   `bodyRuns`/`BARE-TEXT-EMIT` and census/`dirtied` statements remain attributed, not re-read
   (`H-r11` forbids the overclaim outright). (f) **Nothing is archived, moved or repointed by
   this amendment** (§4.5's archival-loop check).
6. **The `U-ENGINE-PIN` PARTIALLY-LANDED state is the honest status word** — not DONE, not
   green, with a live 61-red ledger and an in-flight green step.
7. **CITATION NOTE — every citation into this record may use ID, not line.** This amendment
   appends a large block; the record's own earlier `:NN` anchors are **pre-amendment** anchors.
   **Cite by ID** — `A-d4`/`A-d5`/`A-d6`/`A-d7`/`A-d8`, `S-d11..S-d15`, `H-r14..H-r20`, the
   §-numbers of this amendment record, and the unit names.

### 7.1 The citation re-resolution result (`docs/decisions.md:<n>`) — CHECKED, and here is what was found

The previous pass recorded that this exact hazard bit it: a row **insertion** shifts anchors
for rows **below** the insertion point, and five citations then pointed at the wrong row
(`docs/decisions.md` `R13-HOST-FIX` `:32 → :39`, `HOST-OP-REJECT` `:35 → :42`,
`MULTI-GRAPH-ISOLATION` `:44 → :51`, `UI-RENDERED-WITH-PROVIDENT` `:46 → :53`,
`SHELL-CHROME-HANDOFF-DISPOSITION` `:47 → :58`).

**What this pass checked, and found:**
1. **Every existing `docs/decisions.md:<n>` citation in this repo's `docs/` tree resolves to
   the row it claims** — re-enumerated this pass by grepping every `decisions.md:\d+` over
   `docs/**` and matching each against the live file. **The cited anchors are `:21`, `:24`,
   `:29`, `:30`, `:33`, `:39`, `:42`, `:45`, `:51`, `:53`, `:55`, `:57`, `:58` — all thirteen
   resolve correctly**, including the five the previous pass repointed. **No dangling or
   misdirected citation was found.** (`docs/decisions.md` is **124 lines**, read this pass;
   the ACTIVE table's rows sit at `:19-58`.)
2. **The insertion point for this pass's six new ACTIVE rows was chosen to keep that true:**
   they are appended **after `:58`**, i.e. **after every cited row**. Rows `:21`–`:58` keep
   their numbers exactly, so **no citation needs repointing**. This is the archival loop's
   rule (item 6c) applied to a row insertion — the same hazard as a file move.
3. **The cost, stated:** the six new rows land **below** the `SHELL-CHROME-HANDOFF-DISPOSITION`
   row they amend, so the ACTIVE table is no longer in strict "newest last" order. That is a
   **deliberate** trade: a stable citation set is worth more than a chronological table, and
   the new rows' titles carry their A-d reference.
4. **What is NOT re-resolved, and why:** the `H-r1..H-r6` rows and this record's own earlier
   `:NN` anchors (item 7 above), plus the fork-side citations
   (`<Astrographer>/docs/decisions.md:237` `MCP-FOCUS-TOOL`, `:228` `UI-CONFIG-CARRIER`) —
   those are **the fork's** rows in a **read-only** tree, and this repo writes no file there.

## 8. Filings this amendment owes

| Filing | State |
| --- | --- |
| This gate record — the `Amendment record (A-d4…A-d8)` | **APPENDED IN PLACE this pass**; the earlier layers annotated with `SUPERSEDED BY A-d4…A-d8` and one-line whys |
| `docs/decisions.md` — SIX new ACTIVE rows (`SHELL-CHROME-PANES-ZONES-IN-SCOPE`, `FOCUS-UI-ONLY-MCP-TOOL`, `PROHIBITION-5-IS-AN-ADOPTION-BOUND`, `THEME-MECHANISM-AND-AUTHORED-CONTROL`, `UI-STATIC-MEANS-APP-STATE-DERIVED`, `REAL-DOM-UI-GATE-LEG`) + the amendments to `SHELL-CHROME-HANDOFF-DISPOSITION`, `ENGINE-PIN-0.5` and `MCP-ENDPOINT` | **FILED this pass** (appended after `:58`; **every existing row preserved**, **no citation repointed**) |
| `docs/pending.md` — the rewritten `SCH-3`/`SCH-4`/`SCH-6`/`SCH-7`/`SCH-9`/`SCH-10`/`SCH-13` rows, the retired `SCH-3`-shape CANDIDATE row, and the new rows (the focus tool · the two theme units · the `ui` leg + its display prerequisite · the `U-SLOTHOST` host-only split · the devDependency scope change · the `R-13` seam question · the `css.`/`css:` spec bug · the doc-drift findings) | **FILED this pass** |
| `docs/next-steps.md` — `## OPEN` re-issued with all **20 units** + the harness row + the fork correction row, each `BLOCKED` with its spec path/blocked-on/legs; the "two things gate everything" block corrected (**the pin has moved**); the `Q` table updated; the handover-state section rewritten | **FILED this pass** |
| `docs/specs/mcp-endpoint.md` — the `provident.focus` obligation | **RECORDED AS `OWED — lands with U-FOCUS-TOOL`** (the tool is **not written yet**; no tool is documented as if it existed). Named sections: **§3 table · new §3.8 · §6.2 group table incl. the `module` row · §7 pins · §8 non-goals · §9 verification** |
| `docs/specs/ci-divergence-leg.md` — the hermeticity correction + the `ui`-leg boundary note | **FILED this pass** (two-part truth; **N=9 unchanged**; `ui`-leg boundary `OWED` until `U-REALDOM-BOOT` lands) |
| `docs/FORKER.md` — the tool table/tool digest/`SCH` disposition digest re-derived to the consolidated plan; the prohibition-5 clarification; the `ui` leg as a **non-trio** leg with its display prerequisite; the install line reconciled | **FILED this pass** |
| **The owed unit specs — 19 owed + 2 filed/amended (count them, the arithmetic is stated below):** **FILED but STALE (1):** `docs/specs/engine-pin.md` (`U-ENGINE-PIN`'s spec — it exists and needs the amendments named in §4.3/`Q7`/`Q8`). **OWED — not filed (19):** `engine-drift.md`, `mount-invariant-guard.md`, `gsession.md`, `menulib.md`, `projection.md`, `listhost.md`, `overlay.md`, **`zones.md`**, **`census.md`**, **`gutter.md`**, **`relocate.md`**, **`container.md`**, **`slothost.md`**, **`theme.md`**, **`theme-control.md`**, **`focus-model.md`**, **`focus-tool.md`**, **`ci-ui-leg.md`** — **that is 18 names, and `U-DIVERGENCE-EXT`'s spec is the 19th: an AMENDMENT to the existing `docs/specs/ci-divergence-leg.md`, not a new file.** Each unit spec carries `H-r8`'s `§0 Contract-prohibitions` six-row block | **ARITHMETIC, so nothing is fudged: 20 units ↔ 20 spec artifacts = 1 filed+stale (`engine-pin.md`) + 18 owed files + 1 amendment (`ci-divergence-leg.md`). 1 + 18 + 1 = 20.** ✔ **No unit is delegable until its spec exists AND a TestWriter has run and reported the red set** (`AGENTS.md` item 9) |
| **The `ui` leg + the divergence-harness extension** — `package.json`'s `"ui"` script, the shared Electron-spawn helper, `scripts/electron-ui.mjs`, `scripts/electron-divergence.mjs`'s scenario channel + extractor, `docs/specs/ci-ui-leg.md` | **OWED — not filed** (`A-d8`/`H-r10`/`H-r18`) |
| **The `H-r1` correction package owed to the FORK** + the fork-side withdrawals | **OWED — the fork's pass.** This repo writes **no** file under `<Astrographer>/` |
| `docs/defects.md` / `docs/HANDOFF.md` | **NO new rows and NO annotation owed by this amendment.** All eight doc-drift findings are **this repo's own claim drift** (host-owned, `AGENTS.md` item 6 discipline), not `provident-ssr` requirement gaps. The `setCaptureProvider` finding, if it turns out to require a host fix, is fixed here with a regression test and recorded in the unit spec's adversarial section — **never in `defects.md`** |

**Archival-loop check, restated: NOTHING is archived, moved or repointed.** Verified and
stated, per `AGENTS.md` item 6 and this task's requirement.
