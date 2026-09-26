# GREEN-SCENARIO ARTIFACT — `U-GUTTER-UI` (`E10`, wave E) · **gate 5, the BLIND greens**

**WHAT THIS ARTIFACT IS.** The independent, **blind** green-scenario set for `U-GUTTER-UI`, authored
**from the DOCUMENTATION ONLY** and then **RUN** against the live modules and the battery host. **Every
scenario below was authored from a clause of `docs/specs/gutter-ui.md` (its `§0`/`§R`–`§R.3`, `§2.1`–`§2.6`,
`§3.1`–`§3.5`, `§5.1`, `§5.2`, `§5.5.1`, `§5.U` and the six appended `⟶ RECORDED` blocks), from
`docs/specs/gutter.md` and from `docs/specs/gsession.md`.** **No scenario cites an implementation detail of
any source file, and the module's own bytes and the unit's red set (`tests/gutter-ui.test.ts`) were NEVER
READ** — the module was reached **only through its documented exported surface** (`3 + 17` names, the
options object, `attach`/`detach`/`stats`/`controller`) and the battery target through the documented CLI.

**DOCUMENTS READ (the whole input set):** `docs/specs/gutter-ui.md` (all of it, including `§R`, `§R.1`–`§R.3`,
the Layer declaration, `§1`–`§8` and the six `⟶ RECORDED` blocks) · `docs/specs/gutter.md` `§2.1`, `§2.2`,
`§2.3` (seams, evaluation order, write-count clause, `-0` rule) · `docs/specs/gsession.md` `§2.1`, `§2.3`,
`§2.5` · `docs/specs/mcp-endpoint.md` `§4` (the legacy-envelope data-authoring surface) · `package.json` and
`scripts/mcp-cli.mjs`'s own usage header (harness tools). **`docs/specs/user-flow-audit.md` DOES NOT EXIST**
(verified: `ls` → *No such file or directory*), which is `§5.U`'s `U-GAP-1` — recorded, not omitted.

**THE REVISION.** `git rev-parse --short HEAD` → **`42317ca`** (`E10 GATE 3 GREEN …`), working tree clean
before this pass.

**THE RUN — every command with its exit code:**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `npx vitest run tests/gutter-ui-greens-blind.test.ts` | **1** | the blind suite: **45 scenarios — 36 PASS / 9 FAIL** (`Tests 9 failed \| 36 passed (45)`). **The suite file is a SCRATCH artifact and was DELETED after the run** (this artifact's write scope); its scenarios are recorded here in full, so the readings above are reproducible from the criterion + drive columns |
| **C-2** | `npx tsc --noEmit --strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --types node,vitest/globals tests/gutter-ui-greens-blind.test.ts` | **0** | the `17` type names are **importable and compilable** — the type half of the census is satisfied by NAME (scenario **S44**) |
| **C-3** | `npm run --silent build` | **0** | the bundles the battery target runs on |
| **C-4** | `node scripts/mcp-cli.mjs --target battery run /tmp/steps-u8.json` | **0** | the `U-8` readings `(a)`–`(c)` — `targets`, `html`, `dispatch`, in ONE host process |
| **C-5** | `node scripts/mcp-cli.mjs --target battery run /tmp/steps-u7.json` | **0** | the `U-7` BEFORE/AFTER census + rendered-HTML readings |

**NUMBERS, PLAINLY: `PASS 36 / FAIL 9 / NOT-BLIND-RUNNABLE 6`** (45 executed scenarios + 6 scenarios that
this blind pass structurally could not take; the `NOT-BLIND-RUNNABLE` list is at the end, each with its
structural reason — **none is reported as a PASS**).

---

## A. HOW THE SCENARIOS WERE DRIVEN (so every `cmd` below is reproducible)

* **The module** was imported exactly as the docs name it — `src/shared/gutter-affordance.ts` (imported
  `…/gutter-affordance.js`) — together with `gesture-session.js` (`POINTER_TYPES`) and `gutter.js`
  (`createResizeController`, `clampToBounds`, the *bare* `E3` control for the composition-boundary reads).
* **The harness** is a **recording event source** with the DOCUMENTED `EventSourceLike` shape
  (`on(element, type, handler)` / `off(…)` / `isConnected()`), a real session
  (`createGestureSession({source, commit})` — the session's own `commit` channel is a **non-forwarding
  recorder**, `§R.1` item 1 / the channel ruling), and caller-supplied seams whose answers are the scenario's
  inputs. **The session instance reaches the module as `options.session`** (`§2.1` clause 4 / `§R.1` item 1) —
  the wiring's job, never the module's.
* **The lifecycle** is driven through the source's own listeners: `pointerover` → `pointerdown` (the
  session's own install listener establishes the gesture) → `pointermove` → the **session's own `pointerup`
  listener** for the release (`§2.3` row 11: the release is the session's terminal, not a module call).
* **One harness defect of MY OWN was found and fixed during the round** and is recorded for honesty: my first
  source double exposed non-callable `on`/`off` *members* (arrays of the same name) shadowing the methods, so
  the module correctly declined to attach and 27 scenarios failed for my error. **The documented
  `EventSourceLike` shape is a REQUIREMENT ON THE HARNESS**, and it is now honoured; the failing readings of
  that first round are NOT reported below as findings.

---

## B. THE SCENARIOS — `§2.1`/`§2.2` SURFACE AND PROHIBITIONS

| id | Clause(s) | Drive (`cmd`) | PASS criterion (an OBSERVABLE reading) | Result |
| --- | --- | --- | --- | --- |
| **S1** | `§2.1` clause 1, `§3.4 R-1`(a)/(b), `§R.3`'s census | `node -e`-equivalent introspection: `Object.keys(module)` | the namespace's own keys are **exactly** `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource` — and **NOT** `sizeFromPointer` | **PASS** — measured `['createGutterAffordance','cursorDeclarationFor','domEventSource']`; no fourth; all three are functions |
| **S2** | `§2.1` item 5 / `§3.4 R-2` | `createGutterAffordance()` then `Object.keys` | the affordance's own key set is **exactly** the five `attach`, `controller`, `detach`, `detached`, `stats` — no sixth; `stats()` has the seven declared fields; `lastCursor === ''` before anything happens | **PASS** — key set is the five, stats key set is the seven, `lastCursor ''` |
| **S3** | `§2.1` items 1–9, `§2.3` row 2 | full options object + `attach()` | a fully-configured affordance attaches (`true`), the `controller` exposes `attach`/`detach`/`reset`/`stats`, and **no seam is consulted at attach time** (`axisOf` calls `0`) | **PASS** — `attach() === true`, controller surface present, `axisOf === 0` |
| **S4** | `§2.6` item 1, `gutter.md` `§2.1` item 3/4 | read the composed controller's key set + `stats()` | the controller is `E3`'s own: five members, `stats().lastCode === 'ok'`, and the six documented counter fields present | **PASS** — `['attach','detach','detached','reset','stats']`, `lastCode 'ok'` |
| **S5** | `§2.2` P-1/P-2, `§2.1`'s `domEventSource` block, Layer anchor 3 | `domEventSource()`; `on(null,'x',f)`, `off(undefined,'x',f)`, `on(42,'x',f)` | the only DOM-touching member is total on a non-object element: **no throw**, `isConnected(null)` answers a boolean | **PASS** — no throw on `null`/`undefined`/`42` |
| **S44** | `§2.1`(b), `§3.4 R-1`(b), `§5.2` leg 4 | `tsc --noEmit --strict … tests/gutter-ui-greens-blind.test.ts` (C-2) | all **seventeen** type names import and compile; the census's type half is satisfied **by name** | **PASS** — exit `0` |

**Note on the two static scans I did NOT run** (`§3.4 R-1`(c)'s nine-token negative list, `§3.4 R-3`'s
second-coordinate-token scan, `§3.4 R-7`'s policy-vocabulary scan): they are **source-text scans, and this
blind pass may not read the module's bytes** — they are recorded in the `NOT-BLIND-RUNNABLE` list
(N-1/N-2), never as passes.

---

## C. THE SCENARIOS — `§R.3`'s ELEVEN SEAMS AND THEIR DECLARED DEGRADATIONS

| id | Clause(s) | Drive | PASS criterion | Result |
| --- | --- | --- | --- | --- |
| **S8** | `§R.3` seam table, `§2.4`'s throwing-seam row, `§3.1 M-20` class 1/2/3 | for each of `sizeFromPointer` (absent / `42` / throwing) and `boundsOf` (absent / `42` / throwing): establish, then one observed move with `{clientX:150, clientY:0}`, then release | **never a throw out of the turn** and **never a sink write** (the declared safe default, not a silent success) | **PASS** — six drives, no throw, `sink.length === 0` in every cell |
| **S9** | `§R.3` `applyCursor` row, `§3.2 F-8`, `§3.1 M-20` class 3 (hover turn) | `applyCursor` throws; fire `'pointerover'` | **the throw PROPAGATES** out of the hover turn | **PASS** — `pointerover` threw `cursor-boom` |
| **S10** | `§R.3` `applyPreview` row, `§3.2 F-8` (move turn) | `applyPreview` throws; establish then observe one move | **the throw PROPAGATES** out of the observed-move turn | **PASS** — the move threw `preview-boom` |
| **S11** | `§R.3`'s `commit` row (RULED: **ABSORBED by `E3`**), `gutter.md` `§3.2 F-11` | a `commit` seam that THROWS; valid drag; **the session's own `pointerup`** | the terminal does **not** throw; `E3`'s `stats().sinkCalls === 1` and `written === 0` (the swallowed-sink reading, never retried) | **PASS** — no throw, `sinkCalls 1`, `written 0` |
| **S12** | `§2.1`'s factory block, `§3.2 F-6`, `§5.5.1 P-GU-TP-1` | `createGutterAffordance` with `undefined`, `42`, `'x'`, `{session: undefined}`, a throwing-`get` `Proxy`, and a throwing-accessor record | construction **NEVER throws**; all five members present and callable; `attach()`/`detach()` answer booleans; `stats()` zeroed | **PASS** — six hostile shapes, no throw, zeroed counters |
| **S13** | `§3.2 F-12`, `§2.3` row 2, `§2.2` P-2 | `element: null` / `undefined` / `42` / `'x'`; and `target: null` | `attach()` ⇒ **`false`**, **NO listener attached to anything**, no global lookup; `stats()` readable | **PASS** — 4 element shapes → `attach false`, `source.on` log empty |
| **S14** | `§2.1` item 9, `§2.3` row 2, `§3.4 R-14`(c), `§R.3`'s `moveTypeOf` row | four drives: `moveTypeOf` answering `'not-dispatched-by-anyone'`, `''`, `42`, `{}`; each: attach, establish, fire `POINTER_TYPES.move` | **a non-string or EMPTY token ⇒ NO move listener of the module's own** and the drag half has no reading source (`stats().moves === 0`) | **PARTIAL** — `''` PASS (0 registrations, `moves 0`) · `'not-dispatched'` PASS (registered with the STRANGER token, `moves 0`) · **`42` and `{}` FAIL** (registration on `POINTER_TYPES.move` and `moves 1`) — see **F-2** |
| **S15** | `§2.6` item 3, `§5.5.1 P-GU-TP-2`, `§R.3`'s `cursorOf` row | six drives: `cursorOf` absent / `42` / throwing / `()=>({})` / `()=>({cursor:42})` / `()=>({cursor:'   '})`; each: fire `'pointerover'` | **NO cursor write** and **no throw**; `lastCursor` stays `''` (an observable non-success, never a silent write) | **PASS** — six drives: `cursorWrites 0`, `lastCursor ''`, no throw |

---

## D. THE SCENARIOS — `§3.1`/`§3.2` STATES, `§3.3` INVARIANTS, AND THE TERMINAL WRITE TABLE

**The shared measurement base** (so the readings below are comparable): pre-drag size **100**, `boundsOf` →
`{min: 0, max: 200}`, `sizeFromPointer: (pointer, start) => pointer.x` (the caller's own mapping, `§0A`
note 4 — it reads the coordinate the module hands it, and `start` is the recorded pre-drag size), a move to
`clientX: 150` ⇒ `raw 150` ⇒ `clamped 150`; the release is the **session's own `pointerup`** listener.

| id | Clause(s) | Drive | PASS criterion | Result |
| --- | --- | --- | --- | --- |
| **S6** | `§2.4` item 1, `§2.3` item 5, `§3.2 F-1` | six unresolvable classes (`null`, `undefined`, `42`, `'x'`, `{clientX:NaN}`, `{clientX:'10'}`): establish, one move | `stats().moves` increments, **no sink write**, and **no non-finite preview is ever written** | **PASS** — 6 classes: `moves 1`, `sink 0`, every preview finite |
| **S16** | `§3.1 M-8`, `§R` `R6`, `§2.3`'s write table (`end` of a VALID drag) | hover → primary `pointerdown` → one valid move → the session's `pointerup` | the handle carries the clamped value **before** the release; **exactly ONE** commit of the clamped value; `E3` `sinkCalls 1` / `written 1`; **NO preview at the terminal** | **PASS** — `gesture.value 150`; sink `[150]`; `sinkCalls 1`, `written 1`; preview count unchanged at the terminal |
| **S17** | `§3.1 M-12`, `§2.4` item 2, `§2.1`'s `pointerOf` cell | a caller `pointerOf` returning `{x:150,y:0}` while the move event carries `clientX:999` | when `pointerOf` IS supplied **it is the coordinate site** (the module's own resolver stands down) and the commit carries ITS value | **PASS** — `pointerOf` saw the raw event, preview `150`, sink `[150]` |
| **S18** | `§3.1 M-9`, `§2.3` row 10, `§2.6` item 6 | establish, one valid move, then a **secondary-button `pointerdown`** while dragging | **ZERO commits** (`sink 0`, `E3 sinkCalls 0`), **exactly ONE revert preview** with `value === pre-drag size` and `valid === false`, `stats().drops === 1`, `resets === 0` | **PASS** — `drops 1`, `resets 0`, sink `[]`, last preview `{value:100, valid:false}` |
| **S21** | `§3.1 M-16`, `§2.4` item 4, `gutter.md` `§0A` note 6 | `resizableOf: () => false`; hover → press → move → release | the gesture **establishes and terminates normally**, the hover cursor **was** written, **ZERO previews**, **ZERO commits** | **PASS** — `cursorWrites 1`, `previews 0`, sink `[]`, `sinkCalls 0` |
| **S22** | `§3.1 M-14`, `§3.2 F-7` | `attach()`, no gesture, a secondary-button `pointerdown`; then a primary press + a move | the inert press moves **nothing** (`drops 0`, `resets 0`, `previews 0`, `sink 0`), and the later primary press establishes normally | **PASS** — all counters zero after the inert press; `moves 1` after the later drag |
| **S23** | `§3.1 M-10`/`M-11`, `§2.6` item 3, `§R` `R8`(c) | `'pointerover'` → `'pointerout'`; then a second pair whose `cursorOf` answers `{}` | one write **on the AFFORDANCE (by identity)** with the resolved declaration, one clear with `undefined`; a no-declaration hover writes **nothing** and clears **nothing** | **PASS** — `cursorWrites 1`, `cursorClears 1`, both calls carry the affordance element; the second pair: enter `0`, exit clear `1` |
| **S24** | `§3.1 M-7`, `§2.3` row 3 | `attach()` then `attach()` again | the second returns **`false`** with **ZERO further `source.on` calls** (first-config-wins) | **PASS** — `false`, `source.on` log length unchanged |
| **S25** | `§3.1 M-15`, `§2.3` row 13, `§3.3 I-15`, `§R.2` `R-12` | `attach()` → `detach()` → `detach()` | the **module's own four** `on`s are mirrored by **four** `off`s with the same three values **before** the controller delegates; `detach() ⇒ true`; `detached ⇒ true`; the repeat ⇒ `false` with no source call. (The session's own `dispose` adds a FIFTH `off` for its own listener — its own owner removing its own set) | **PASS** — `offLog` at detach: `['pointermove','pointerup','pointercancel','pointerover','pointerout','pointerdown','pointermove','pointerdown']`; the module's four are the last four, each identity-matching its `on`, after the session's trio-detach; repeat `false` |
| **S26** | `§3.1 M-18`, `§3.4 R-14`, `§2.1` item 9 | (a) `moveTypeOf` → `POINTER_TYPES.move`; observe a move; (b) `moveTypeOf` → a stranger token | (a) the registered type **IS** the session's exported constant by identity and the drag half reads (`moves 1`); (b) the stranger token registers and the drag half is dead (`moves 0`) | **PASS** — `POINTER_TYPES.move === 'pointermove'`; (a) one registration at attach + `moves 1`; (b) the stranger token registered, `moves 0` |
| **S27** | `§3.1 M-20` class 3 (value seams), `§3.3 I-7` | a `pointerOf` that THROWS; establish, one move | the throw is **absorbed** by the module's own total gate — **no throw out of the turn** | **PASS** — the move did not throw |
| **S28** | `§3.1 M-3`, `§0A` note 5, `§3.3 I-3` | `applyPreview` throws on a move; catch it; then call `reset` for that gesture | the record is **discarded** — the later `reset` leaves the module's own counter UNMOVED and makes **no session call** | **PASS** — the throw propagated; `stats().resets` unmoved |
| **S29** | `§3.3 I-1`, `§0A` note 9, `§2.6` item 1 | valid lifecycle; count the module's own invocations of the caller's `commit` seam beside `E3`'s | the module invokes the sink **ZERO** times; **exactly ONE** invocation arrives from `E3`'s terminal; the sink record and `E3`'s `sinkCalls` AGREE | **PASS** — module-side `commit` invocations `0` before the release and `1` after it; `sink.length === sinkCalls === 1` |
| **S30** | `§2.4` item 1/2 clause (i), `§3.3 I-2` | one observed move with `{clientX:150, clientY:0}`; record the argument the caller's mapping receives | the caller's mapping receives **a frozen `PointerPosition` carrying `x`/`y` and NO event reference**; one read per move | **PASS** — `{x:150,y:0}`, `Object.keys` = `['x','y']`, `clientX undefined`, `Object.isFrozen true`, `moves 1` |
| **S31** | `§3.3 I-3`/`I-9`, `§2.2` P-5, `§2.4` item 3 | drag 1 (pre-drag 100) to a release; then change the consumer's pre-drag size to 50 and drag 2 to the same coordinate | no retention across the terminal: gesture 2 is a fresh gesture with **its own** record (its own `startSizeOf` read, `§2.4` item 3's *exactly once per gesture*), and both commits are recorded | **PASS** — sink `[150, 150]` (the second gesture's `startSizeOf` re-read; the per-gesture call counts are S40's cell: `startSizeOf === 1` in both lifecycles) |
| **S32** | `§2.1` clause 4, `§2.3` row 1, `§3.4 R-4`, `§R.1` item 1 | the session is handed in as `options.session`; `E3`'s `attached` reads 1; release; read the session | the module **constructs no session** (one controller per successful attach; `E3 stats().attached === 1`) and the terminal leaves no active gesture | **PASS** — `attached 1`; `session.gesture() === null` after the release |
| **S33** | `§3.2 F-14`, `§3.3 I-13`, `§2.6` item 4 | `capturePointer: true` supplied; full valid lifecycle | the option is **DECLARED and IGNORED**: no capture call, no `capture` field, and the behaviour is identical to the absent case (one commit) | **PASS** — no capture member on the supplied source, sink `[150]` |
| **S34** | `§3.3 I-7`, `§5.5.1 P-GU-TP-2`, `§2.1`'s `cursorDeclarationFor` block | `cursorDeclarationFor` over 12 shapes (including a throwing-`get` `Proxy`) and `domEventSource()` | **never throws**; `{cursor:'col-resize'} → 'col-resize'`; `'  row-resize  ' → 'row-resize'`; `''`/`{}`/`undefined` shapes → `undefined` | **PASS** — all 12 drives, no throw, the declared readings |
| **S35** | `§2.1`'s factory block, `§3.2 F-6` | `createGutterAffordance` with a throwing-`get` `Proxy` | every member is callable and total, `detached` is a boolean | **PASS** — `attach`/`detach`/`stats` did not throw |
| **S43** | `§3.1 M-17`, `§2.1` item 5 | one drag with a mid-drag observation, then a drop; reconcile `stats()` against the recording source, the preview record, the cursor record and `E3`'s counters | every counter reconciles: `moves`, `cursorWrites`, `drops`, `previews`, `lastCursor`; `E3 sinkCalls === sink record length` | **PASS** — `{moves:1, previews:2, cursorWrites:1, drops:1, lastCursor:'c'}`; `sinkCalls === 0 === sink.length` |

---

## E. THE SCENARIOS — THE `§5.5.1` REGISTER'S SEVEN ROWS, AT THE LEVEL OF THEIR PROPERTY TEXT

Each row was driven over **my own independently chosen inputs** (not the red set's tables), and the declared
**term** in each row's cell is a **drive count** (`docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE
COUNT`), so a shorter drive set is recorded as such.

| id | Register row | Drive (my own inputs) | PASS criterion (the row's property text) | Result |
| --- | --- | --- | --- | --- |
| **S36** | **`P-GU-SM-1`** — the single-writer quantification over every terminal path | five terminal paths, each over the REAL session + the composition the wiring builds: (1) valid `end`, (2) invalid `reset`, (3) refused `reset`, (4) `cancel`, (5) drop | the declared pair per path — `end` ⇒ **1**; invalid `reset` ⇒ **1** of the **CLAMPED PRE-DRAG size**; refused reset ⇒ **0**; `cancel` ⇒ **0**; drop ⇒ **0** — with the sink's record and `E3`'s `sinkCalls` **AGREEING** in every cell and the **module's own** sink invocations counting the same | **4 of 5 cells PASS, 1 FAIL** — valid `end` `1/1` ✔ · `cancel` `0/0` ✔ · drop `0/0` ✔ · refused reset `0/0` ✔ · **invalid `reset` reads `0` where the row declares `1`** (F-4) |
| **S37** | **`P-GU-SM-2`** — preview-never-sinks, five stages | five stages in fixed order: (1) a hover turn before establishment, (2) a valid move during the drag, (3) an INVALID move during the drag, (4) the terminal frame, (5) a hover turn after the terminal | `previews` declared per stage: `0` · `1` · `1` (the **revert**, finite, never a `NaN` preview) · **no further preview at the terminal** · `0`; no preview invocation is ever accompanied by a sink write in the same turn | **PASS** — `0 → 1 → 2 → 2 → 2` previews across the five stages, every preview finite, sink `[]` throughout |
| **S38** | **`P-GU-SM-3`** — the release mapping and the drop-revert, five shapes | (1) a valid drag, (2) an invalid drag while ACTIVE, (3) the refused reset, (4) the drop, (5) a secondary press with no gesture | (1) exactly one commit of the clamped dragged value; (2) the `reset` taken **while the gesture is still ACTIVE**, one commit of the clamped pre-drag size; (3) the refusal commits nothing; (4)(5) zero commits and zero sink writes with the preview revert | **3 of 5 PASS, 2 FAIL** — (1) `[150]` ✔ · (4) drop commits nothing ✔ · (5) inert press moves nothing ✔ · (2) the reset reaches the session **while active** ✔ **but commits NOTHING (F-4)** · (3) the refusal is recorded **but the module's own reset counter does not move (F-3)** |
| **S39** | **`P-GU-IM-1`** — the coordinate uniqueness and the one-read rule over 15 event classes | 6 usable classes (plain, both-zero, negative, fractional, `Object.create(null)`, a frozen object, own accessors) and 8 unusable classes | for a usable pair the caller's mapping receives **the frozen `{x,y}` carrying the event's own values**; for every other class the move is INVALID with **no sink write**; the caller's mapping is called **at most once per observed move** | **FAIL** — the usable classes read as declared, the unresolvable classes reach the invalid state without a sink write, **but the caller's mapping is called TWICE per unresolvable move** (`acc.length 2` where the one-read chain admits at most one) — the second call carries **`null`** (F-1) |
| **S40** | **`P-GU-IM-2`** — the one-closure / one-evaluation-per-gesture invariant over the composed seams | 4 lifecycles × the 5 seams `axisOf` · `boundsOf` · `startSizeOf` · `resizableOf` · `commit` — each lifecycle with its own declared count | `startSizeOf` **exactly once per gesture (at establishment)**, `resizableOf` **once per gesture** (no second evaluation through `PreviewState.resizable`), `axisOf` zero at attach, `commit` **by `E3` at most once and by the module ZERO times** | **PASS** — measured per lifecycle: `attach-only {axisOf 0, startSizeOf 0, resizableOf 0}` · `hover {axisOf 1}` · `valid gesture {axisOf 2, startSizeOf 1, resizableOf 1, boundsOf 2}` · `invalid gesture {axisOf 2, startSizeOf 1, resizableOf 1, boundsOf 1}`; module-side `commit` invocations `0` |
| **S41** | **`P-GU-TP-1`** — the module's totality over hostile arguments | 6 argument shapes × the entry-point drives: omitted, `null`, `42`, `'x'`, a throwing-`get` `Proxy`, a throwing-accessor record | every entry point TOTAL: five members present/callable, `attach`/`detach` booleans, `stats()` readable with the seven fields, `controller` present — never a throw | **PASS** — six shapes, all readings as declared |
| **S42** | **`P-GU-TP-2`** — the cursor resolution's totality and the cursor-literal absence | the 10 declared answer shapes (the positive control `{cursor:'col-resize'}` included) plus the two absence drives | exactly the declared reading per shape (`'col-resize'`, trimmed `'row-resize'`, `undefined` for `''`/whitespace/non-string/absent/array/bare string), **never a throw** | **PASS** — 10 shapes + a throwing-accessor `Proxy` all as declared, no throw |

**The register rows I could NOT drive** (recorded, not silently omitted): the **declared-vs-distinct term
arithmetic** (`§5.5.1`'s cell terms `15/15/15/45/20/12/12 = 134`, `§5.5.3`'s chain, the `(bounded)` set and
the caps) is a claim **about the red set's own tables**, which this blind pass may not read — see **N-3**.
The seven property TEXTS above were driven independently; the tables were not audited.

---

## F. THE `§5.U` READINGS — `U-7` (the delta) AND `U-8` (the four machine readings), on the BATTERY TARGET

**The command form the docs give is `npm run mcp -- --target http --port 3787 <cmd>`, against a RUNNING app.**
**No app was started and no window exists in this pass** (`§5.2` leg 5's `npm run ui` is the real-DOM leg and
it boots a display; this blind pass deliberately did not boot one), so the readings were taken against the
**battery target** — the documented default of the same CLI (`scripts/mcp-cli.mjs`'s own usage header: *“battery
(default): spawns dist/main/battery-host.mjs (a REAL Runtime under the DOM shim)”*), **one host process per
sequence, with the envelope loaded through the documented `provident.load {kind:'envelope'}` surface.**

**The input envelope is LEGACY-JSON DATA authored from `§2.1` item 7's card description** — three nodes
(`gutter-vertical` with authored `css.id`/`css.style.cursor`/`props.id` and **one authored handler whose body
is a function STRING** in the `(ctx, value)` convention; `gutter-pane` with an authored base size
declarative; `gutter-status` with authored placeholder `content`) — **and NOTHING outside the envelope was
needed to take these readings**: **no script and no function of my own was required, which is the check the
data-authoring rule exists for.**

| id | Clause(s) | Drive (`cmd`, exit code) | PASS criterion | Result / reading |
| --- | --- | --- | --- | --- |
| **S45 = `U-8`(a)** | `§5.U` item 4 `U-8`(2), `§3.5 R-9`, `§3.4 R-13`(iii) | `node scripts/mcp-cli.mjs --target battery run /tmp/steps-u8.json` → the `provident.load` + `provident.list_targets` steps (exit **0**) | the authored affordance's `css.id` **and** `props.id` (`gutter-vertical`) appear in the target list | **PASS** — measured: `cssId: "gutter-vertical"`, `propsId: "gutter-vertical"` present (with `gutter-card`, `gutter-pane`, `gutter-status`) |
| **S46 = `U-8`(b)** | `§5.U` item 4 `U-8`(3), `§3.5 R-9` | the same sequence's `provident.get_rendered_html` (exit **0**) | the affordance element's `data-node-id` appears in the rendered HTML, i.e. the element is the **producing graph's own** | **PASS** — measured `renderedHtml`: `<div data-node-id="node-3" id="gutter-vertical" style="cursor: col-resize;">` |
| **S47 = `U-8`(c)** | `§5.U` item 4 `U-8`(4), `§R.1` item 3 | the same sequence's `provident.dispatch {target:'gutter-vertical', event:'pointerdown'}` (exit **0**) | the authored handler answers `{results, dirtied}` — i.e. the affordance is **provident-dispatch-reachable**, not hand-written DOM | **PASS** — measured `{"results":[null],"dirtied":["node-5","node-2"]}`; the post-dispatch `html` reads `gutter-status` content as `undefined` (the authored body wrote the event's `value`, which the MCP dispatch surface does not carry — see S48's note) |
| **S48** | `§2.1` item 7, `§5.2` leg 6's honest-reachability clause | the same `dispatch` step's own args | the MCP dispatch surface carries an event NAME and **no coordinates** — a record claiming an MCP-driven drag is FALSE | **CONFIRMED, as the docs state** — the dispatch carried no coordinate and the handler's `value` read `undefined`; **this is the reason three `§5.U` rows are `MANUAL OPERATOR`** (`U-3`/`U-4`/`U-6`, `§5.U` item 4) |
| **S49 = `U-7` BEFORE** | `§5.U` item 4 `U-7`, `§3.3 I-11`, `§3.5 R-9` | `node scripts/mcp-cli.mjs --target battery run /tmp/steps-u7.json` → load a **bare** legacy envelope, then `targets` + `html` (exit **0**) | the PRE-change reading is TAKEN (not projected): a census and an HTML reading exist for the tree WITHOUT the authored card | **PASS** — measured BEFORE: `cssId` set `['bare-root']` (1 node), `renderedHtml` **52 chars** |
| **S50 = `U-7` AFTER** | the same | the same sequence's second load (the authored card) + `targets` + `html` | the POST-change reading is **measured as a delta**: the card's new nodes appear in the census **and** their `data-node-id`s in the HTML | **PASS** — measured AFTER: `cssId` set `['gutter-card','gutter-vertical','gutter-pane','gutter-status']` (4 nodes), `renderedHtml` **287 chars**; the delta is **+3 nodes / +235 characters of rendered HTML**, with `data-node-id` `node-2…node-5` present in both views |

**What these two rows are NOT, stated so no reader over-reads them:** they are the **battery** form of `U-7`
and `U-8`'s readings `(a)`–`(c)`. The docs require the demo's OWN card in the RUNNING app (`npm start` +
`--target http --port 3787`) and, for `U-8`, the `(d)` one-boot claim and the `(e)` live second-gesture
observation. **What I took is the same measurement on the same tool family against a shimmed real `Runtime`
with a data-authored card**, so the *instrument reachability* and the *data-only authoring* claims are
measured; **the demo-envelope-specific census and the real-window readings are NOT** (see N-4/N-5/N-6).

---

## G. THE FAILURES — measured evidence and verdict

**Nine scenarios failed. Each is stated with its measured reading and its verdict** (`doc/spec drift` = a doc
claim that does not match behaviour; `un-hardened regression` = behaviour the contract forbids).

### F-1 — **the observed-move turn hands the caller's size mapping a `NULL` pointer** (drift + regression)

* **Scenarios:** S6b (the finding scenario), S39 (the `P-GU-IM-1` one-read row), and the root cause of F-4.
* **Measured:** for **every** unresolvable-pointer class — `null`, `undefined`, `42`, `'x'`, `{}`,
  `{clientX:NaN}`, `{clientX:'10'}` — the caller's `sizeFromPointer` **IS invoked**, with the literal value
  **`null`** as its first argument (`seen = [["NULL", 100]]`, seven classes, all identical; `moves 1`).
  The same happens on a fully-formed event when resolution fails.
* **Why it is a finding (three clauses, all normative):** `§2.4` item 2's chain — a `null` pointer ⇒ *“the
  move is INVALID (§2.3 item 5) and NO preview is written”* — places the invalid exit **BEFORE** the
  `sizeFromPointer` leg; `§2.1`'s seam block types the argument as the module's own `PointerPosition` and
  `§R.3` makes the seam *“a REQUIREMENT ON THE IMPLEMENTING CONSUMER (a fork)”*; and `§2.4` item 2 clause (i)
  makes the coordinate read **once per observed move**, while this drive produces a **second** seam call per
  unresolvable move (S39: `acc.length === 2` where the criterion is at most one).
* **Consequence for a fork that implements the seam as documented:** a mapping that reads `pointer.x` (the
  documented shape) throws `TypeError` on every unresolvable move, and the module's turn swallows it — the
  drag is silently marked invalid.
* **VERDICT: `doc/spec drift` + `un-hardened regression`** — `§2.4`'s chain and `§2.1`'s own seam typing say
  the caller's mapping is never reached with an unresolvable pointer, and behaviour contradicts both. **Owner:
  `U-GUTTER-UI`'s own module (this is a HOST finding, not an `E3`-side one).**

### F-2 — **non-string `moveTypeOf` tokens attach a move listener that the declared degradation forbids** (drift)

* **Scenario:** S14.
* **Measured:** `moveTypeOf` answering `''` ⇒ **0** `POINTER_TYPES.move` registrations and `moves 0` (as
  declared) ✔; `'not-dispatched-by-anyone'` ⇒ registered under the **stranger** token and `moves 0` ✔
  (`§3.4 R-14`(c)'s false-green class is visible exactly as the doc says); **`42` and `{}` ⇒ ONE
  `POINTER_TYPES.move` registration and `moves 1`** ✘.
* **Why it is a finding:** `§2.1` item 9 and `§R.3`'s `moveTypeOf` cell both read *“a NON-STRING or empty
  token ⇒ **NO move listener is attached**”*, and `§2.3` item 6b(iii) calls the coordinate-blind handler *“a
  miswiring whose consequence is a DECLARED degradation”*. A raw-number/object token instead produces a
  **working** move listener.
* **VERDICT: `doc/spec drift`** — the declared degradation's own input list names non-strings, and the
  behaviour differs. **Owner: `U-GUTTER-UI`'s module.** *(Severity: low — the ruling's own wiring supplies the
  session's exported constant, so no shipped path hits it; the reading is recorded because a fork's
  miswiring is exactly what the clause exists to make visible.)*

### F-3 — **the refused `reset` does not reach `E3`, so the module's own `reset`-path accounting cannot be read** (drift)

* **Scenarios:** S20, S38 shape (3).
* **Measured:** with the drag invalid (unusable pair) and the **default the reset reads** made unusable
  (`startSizeOf` ⇒ `'nope'`), the move turn writes its ONE revert preview (`{value:100, valid:false}`), the
  module's `stats().lastCode` path shows the refusal — but **`E3`'s `stats().resets === 0`** (no session call
  was made) **and the module's own `stats().resets === 0`** where `§2.3`'s table and `§3.1 M-13` declare **`1`**
  (`the refusal path still made the call`), with `sink 0` ✔.
* **Why it is a finding:** `§2.3`'s terminal-write table's refused-reset row reads *“module session calls `1`
  (`controller.reset(element)`)”* and *“`E3`'s `reset` `1`”*; `§3.1 M-13` reads *“`controller.reset(element)`
  was called exactly once (`stats().resets === 1`)”*. The measured call count is `0`.
* **VERDICT: `doc/spec drift` + `un-hardened regression`** (the accounting the contract declares is not
  observable, and the documented call is not made). **Owner: `U-GUTTER-UI`'s module.**

### F-4 — **an INVALID drag commits `0` where the contract declares exactly `1`** (un-hardened regression)

* **Scenarios:** S19, S36 (`P-GU-SM-1`'s invalid-`reset` cell), S38 shape (2).
* **Measured, in full:** valid move 150 (preview `{150, valid:true}`) → the pair made unusable → the next
  observed move ⇒ the module writes the **visible revert** `{value:100, valid:false}` ✔ and **`E3`'s
  `stats().resets === 1`** (the session's `reset` terminal ran, `lastCode 'ok'`) — **then the session's own
  `pointerup` produces NO commit at all**: `sink []`, `E3 sinkCalls 0`, `written 0`, and the status content is
  never written. Across all five `P-GU-SM-1` paths the two readings AGREE (they are `0` and `0`), so the
  single-writer falsifier is not what failed — **the write that the contract declares is simply absent.**
* **Why it is a finding:** `§2.3`'s terminal-write table declares *“`reset` of an INVALID drag ⇒ sink writes
  **exactly `1`** (the clamped pre-drag size)”*; `§3.1 M-13` declares *“the committed value is the CLAMPED
  PRE-DRAG SIZE … the sink received exactly one value”*; `§0A` note 6 (the RULED invalid arm) declares the
  architect's *“if dragged state is valid, commit resized state, otherwise, reset”* **observably satisfied**;
  and `§5.5.1 P-GU-SM-1` declares the pair `(1, 1)` for this path. The measured pair is `(0, 0)`.
* **The honest extra readings behind it (recorded, not hidden):** a single invalid move on the **first**
  observed move lands in the **pre-handle window** (`§2.3` row 8) and its reset refuses `'no-gesture'` with
  `resets 0` — **exactly as the spec's counter rule says it must** (so that drive is NOT itself the finding);
  the finding is the **live-window** drive above, where the reset DOES run and still commits nothing.
* **VERDICT: `un-hardened regression`** — the invalid-drag arm's second half (the commit of the clamped
  pre-drag size) is missing. **Owner: `U-GUTTER-UI`'s module.** *(This is the unit's own central release
  clause: the invalid half of the architect's intent statement.)*

### F-5 — **a THROWING value-reading seam does not reach the `reset` arm the register declares** (drift)

* **Scenario:** S6c.
* **Measured:** a `sizeFromPointer` that throws on the **live-window** (second) observed move: the throw does
  **not** escape the turn (no throw out of the listener, `F-1`/`F-6` ✔), `moves` increments to `2` — and
  **`stats().resets === 0` with `E3`'s `stats().resets === 0`**: **no reset was taken at all**, and no further
  preview was written.
* **Why it is a finding:** `§3.2 F-2`'s **RULED** reading (the red-run repair pass) and `§3.1 M-20` class 3
  both declare, for exactly this drive, *“the move is INVALID ⇒ **the `reset` arm (`stats().resets === 1`)**,
  NO preview write, NO sink write, and NO throw out of the turn”*. The measured reading is *“no reset arm”*.
* **VERDICT: `doc/spec drift`** (the absorbed-to-the-`reset`-arm reading the ruling mandates is not what the
  behaviour does). **Owner: `U-GUTTER-UI`'s module.** *(Related to F-1: both are the same turn's handling of a
  failed value seam.)*

### F-6 — **`P-GU-SM-1`'s invalid-`reset` cell and S19's own reset counter** (the same defect as F-3/F-4)

S36's invalid-`reset` cell reads `0` where the row declares `1`, and S19's `stats().resets` reads `0` where
`M-13` declares `1`. **Both are instances of F-3/F-4**, reported separately so the register row's own cell is
evidenced rather than folded into prose. **VERDICT: as F-3/F-4 — `un-hardened regression`, owner: the module.**

### F-7, F-8, F-9

* **F-7 (S14, `42`/`{}` tokens)** = F-2's second half, driven on the register's `§3.4 R-14` row.
* **F-8 (S39's class `{clientX:0, clientY:0}`)** = F-1's second seam call, read through the register's
  `P-GU-IM-1` row.
* **F-9 (S25's extra `off`)** is **NOT a finding**: the fifth `off` is the **session's own** `dispose()`
  removing its own `pointerdown` install, in the documented ownership (`§R.2` `R-12`: each owner removes its
  own set; the module's four are identity-matched to its own `on`s). The scenario's pass criterion was
  mis-stated by me (I expected exactly four `off` calls in the whole log). **Recorded as a HARNESS
  mis-statement, not a module defect.**

---

## H. `NOT-BLIND-RUNNABLE` — six scenarios this pass structurally could not take (never a PASS)

| id | Scenario | Structural reason |
| --- | --- | --- |
| **N-1** | `§3.4 R-1`(c) — the module's own content-token census is EMPTY over the nine-token negative list | **a source-text scan**: taking it requires reading `src/shared/gutter-affordance.ts`, which this blind pass is forbidden to read (`§4.4 S-10`'s own discipline, applied to the blind writer) |
| **N-2** | `§3.4 R-3`/`R-7` — the second-coordinate-token scan, the magnitude-vocabulary scan and the cursor/axis literal scan | **a source-text scan** (same reason: the tokens live in the module's bytes, not in any observable surface) |
| **N-3** | `§5.5.1`'s declared-vs-distinct arithmetic, the `(bounded)` set, the caps, and the strategy ids | **the claim is about the red set's own tables** (`tests/gutter-ui.test.ts`), and the red set is the one file this blind pass must not read; the property TEXTS were driven independently (§E) and the tables were not audited |
| **N-4** | `§5.U` `U-1`/`U-2`/`U-5`/`U-6`'s demo-envelope readings and `U-7`/`U-8`'s **demo** census | **the demo envelope is `src/shared/demo-envelope.ts`'s authored card**; taking the demo's own readings needs a RUNNING app (`npm start` + `--target http --port 3787`). **The instrument-reachability and data-authoring halves were taken on the battery target** (§F, S45–S50) — the demo-specific census was not |
| **N-5** | `§5.2` leg 5 — `npm run ui` (the mandatory `[U]` leg) | **boots a real Electron window and requires a `DISPLAY`**; this blind pass did not boot one. **A `[U]` claim may not be authored from a `[T]` green** (`§3.2 F-13`, Layer anchor 5/6), so nothing here is reported as one |
| **N-6** | `§5.U` `U-3`/`U-4`/`U-6` and `U-8`(e) — the pointer-driven, applied-style and second-gesture observations | **`MANUAL OPERATOR` rows by ruling** (`§5.U` item 4: no shipped instrument carries a pointer coordinate and none reads a transient style write); no operator was present in this pass |

---

## I. WHAT THIS GREENS SET DOES **NOT** PROVE

1. **No live window.** No Electron app was booted, no `DISPLAY` was used, and **`npm run ui` was NOT run** —
   so **no rendered geometry, applied style, real cursor or real pointer** is proven here (`§3.2 F-13`,
   Layer anchors 1/5). The battery target is a real `Runtime` **under the DOM shim**, not a window.
2. **No real DOM.** The `[T]` drives reach the DOM only through a **recording source double** and element
   doubles; the only DOM-API member exercised for real is `domEventSource()` against a hand-made element
   whose `addEventListener` is a closure (S7 — the event-forwarding contract, `§R.2` `R-10`).
3. **The demo's own affordance was not exercised end-to-end.** The legacy-JSON card used for `U-7`/`U-8` is
   **my own data-authored envelope**, not `src/shared/demo-envelope.ts`'s card — so those readings prove the
   *instrument* and *data-authoring* claims, not the demo's census.
4. **The pointer-driven half was driven by the harness, not by a browser.** Every move/`pointerup` in
   §C/§D was a synthetic event object handed to the source's own handler — exactly the `[T]` form the spec
   names (`§5.2` leg 6) — and **never** an MCP-driven drag (which the docs say cannot exist, S48).
5. **The register's declared-vs-distinct arithmetic, the caps and the red set's tables were not audited**
   (N-3), and the three static token scans were not run (N-1/N-2).
6. **This artifact is not a DONE row** and claims no gate beyond its own: it reports what a blind reader
   could derive from the documentation and measure against the live modules.

---

## J. ONE-LINE HONESTY STATEMENT

**Every scenario above was authored from `docs/specs/gutter-ui.md` + `gutter.md` + `gsession.md` alone and
RUN (`45` scenarios: **`36` PASS / `9` FAIL**, plus `6` recorded `NOT-BLIND-RUNNABLE`), the module was
reached only through its documented exported surface, the demo's card was reached only as legacy-JSON data,
and no source file of the unit, no implementation byte and no red-set file was read by this pass.**

---

## ⟶ ADDENDUM 2026-09-27 (POST-GREEN) — THIS GREENS SET PREDATES THE MODULE/WIRING IT DESCRIBES AND IS A REVIEW FINDING UNTIL A BLIND RE-RUN RE-DRIVES ITS AFFECTED SCENARIOS

**NOTHING ABOVE IS EDITED — every measured result at `42317ca` stays exactly as it was run and recorded
(annotate-only, `AGENTS.md` item 10a/RCA-4). This addendum only states the set's REVISION RELATIONSHIP and
what it OWES.**

**1. THE REVISION FACT, STATED PLAINLY.** This greens set was authored and RUN **BEFORE** the live-gate
fixes landed at **`72fff4c`** (its run revision is recorded above as `42317ca`). **IT THEREFORE PREDATES
THE MODULE/WIRING IT DESCRIBES, and is a REVIEW FINDING until a BLIND RE-RUN re-drives its affected
scenarios.** A greens set is evidence about the revision it ran on and about nothing later (`AGENTS.md`
item 10's blind-test → review loop; the `U-PROJ` §12 addendum is the shape to copy).

**2. WHICH OF ITS FAILURES THE `72fff4c` FIXES HAVE SINCE ADDRESSED — its `F-1`/`F-3`/`F-4`/`F-5`/`F-6`/`F-7`/`F-8` CLASSES:**
* **the VALIDITY CLAUSE** — `F-1`/`F-8` (and `F-7`'s second half, `F-2`'s own class) are the pointer-resolution clause's absence: **`ADV-GU-3` FIXED** (validity clause (i) is in the landed expression).
* **the RESET ARM** — `F-3`/`F-4`/`F-5`/`F-6` are the invalid arm's missing reset/commit: **`ADV-GU-6` FIXED** (the pre-drag read is taken at ESTABLISHMENT per `§2.4` item 3 / `§0A` note 5, which is the read order the invalid arm's reset depends on), with the five rows it shifted **being RECALIBRATED — `OWED — TEST-SIDE`**.
* **the PRE-DRAG READ ORDER** — the same `ADV-GU-6` ruling.
* **the WIRING'S WRITE ROUTE** — the class behind the live `F-4`-shaped absence of a commit: **`ADV-GU-1` FIXED** (the one write route now passes the authored status node's ID and records the runtime's answer; live: the status node read `100` → `110`).
* **NOT ADDRESSED BY `72fff4c`, and therefore still OPEN on the re-run:** `F-9` was never a finding (a harness mis-statement, recorded above), and **`F-5`'s *"throwing value-reading seam does not reach the `reset` arm"* reading must be RE-DRIVEN to be closed** — the fix class is landed, but this set's measured reading was taken at `42317ca`.

**3. WHICH SCENARIO GROUPS MUST BE RE-DRIVEN (a NEW BLIND greens set, authored by an agent who did not write the fixes):**
* **`§5.U`'s `U-5`** — the dragged-value reading (its `[U]` half lives in the live battery; the `[T]` half re-drives here).
* **`§5.U`'s `U-8`(e)** — the second gesture (both `(e)(1)`'s element identity and `(e)(2)`'s committed value).
* **THE PREVIEW** — every scenario that read the preview channel (`§2.5`'s transient inline-style write on the LIVE TARGET), because `ADV-GU-2` moved the preview off the affordance's own node to the target: **live, the target's box followed the pointer `100 → 70 → 90 → 110px`**.
* **THE REGISTER PROPERTY TEXTS** — `§5.5.1`'s seven rows, whose audit remedies are all `OWED — TEST-SIDE` (`docs/specs/gutter-ui.md`'s gate-4 `⟶ RECORDED` block, table (c): `P-GU-SM-3` counts readings as drives, the `P-GU-SM-1`/`SM-2`/`IM-1` label-only factors, `IM-2`'s under-assertion, `TP-1`'s un-invoked drive (b), `TP-2`'s missing prototype-inherited-`cursor` shape).
* **THE CARD-READING SCENARIOS** — `ADV-GU-7`/`ADV-GU-8` changed what the authored card emits (bare attributes; the affordance's `css.style`), so any scenario that read the card's data keys or the affordance's style must be re-driven against the fixed tree.

**4. WHAT THIS ADDENDUM DOES NOT DO.** It **changes no measured result, no PASS/FAIL verdict, no scenario id and no `NOT-BLIND-RUNNABLE` entry** above; it **claims no gate**; and it **does not convert any FAIL into a pass.** The set stays a **review finding** until a blind re-run replaces it.

---

## ⟶ RE-RUN 2026-09-27 (POST-FIX) — THE BLIND RE-DRIVE THE ADDENDUM OWED: `33` SCENARIOS **AUTHORED FRESH FROM THE DOCUMENTATION** AND RUN AT `83eb471`

**WHY THIS BLOCK EXISTS, AND WHAT IT IS NOT.** The block above states the relationship: the first run's `42317ca`
readings **PREDATE the module/wiring they describe** (`72fff4c`, `befe9c6`, `83eb471` landed after it) and the
set is a **review finding until a blind re-run re-drives its affected scenarios**. **THIS IS THAT RE-RUN** —
**nothing above is edited, and no earlier PASS/FAIL verdict, scenario id, measured reading or
`NOT-BLIND-RUNNABLE` entry is touched** (annotate-only, `AGENTS.md` item 10a / RCA-4 gate 5). **The scenarios
below are NEW ids (`R1`–`R34`) authored from the DOCUMENTATION ALONE and run NOW**; where a re-run scenario
re-drives a group the addendum named, **the original scenario's id is cited in its clause column so the two
readings stand side by side rather than one overwriting the other.**

**THE REVISION.** `git rev-parse --short HEAD` → **`83eb471`** (`U-PROJ`'s `R-20` DENIED arm scoped to its OWN
attributable changes — the commit that carries this unit's `docs/specs/gutter-ui-greens.md`,
`src/shared/gutter-affordance.ts` and `tests/gutter-ui.test.ts` inside its range). **The live tree was NOT
clean when this pass started**: `tests/zz-probe.test.ts`, `tests/zz-probe2.test.ts` and `tests/zz-probe3.test.ts`
are **UNTRACKED and NOT mine** — another session's probe files, **named here because they are the measured
cause of this pass's one suite red** (`docs/specs/gutter.md` `§3.4 R-12`'s diff-scope row reads `git status`
and is `FAIL` on them). **This pass wrote NO file in the repo except this document: the driver, the envelope
and the steps files all live under `/tmp` and were deleted/left there, never committed.**

**DOCUMENTS READ (the whole input set, unchanged from the first run):** `docs/specs/gutter-ui.md` (all of it,
including `§0`, `§R`–`§R.3`, `§0A`, the Layer declaration, `§1`–`§8`, `§5.U` and **all six `⟶ RECORDED` blocks
including the GATE-4 one**) · `docs/specs/gutter.md` `§0`, `§0A`, `§2.1`, `§2.3`, `§2.4`, `§2.5` ·
`docs/specs/gsession.md` `§0`, `§0A`, `§2.1`, `§2.3`, `§2.5` · `docs/decisions.md`'s
`DEMO-HANDLER-CONVENTION`, `MCP-ENDPOINT`, `ADOPT-0.1.1-SHARED-SURFACES` rows · `docs/specs/mcp-endpoint.md`
`§4` · `scripts/mcp-cli.mjs`'s own usage header · `package.json`/`tsconfig.json`. **`docs/specs/user-flow-audit.md`
STILL DOES NOT EXIST** — `§5.U`'s `U-GAP-1` remains open and is **not** re-recorded as new.

**WHAT THIS PASS DID *NOT* READ.** **No implementation byte and no test file.** `src/shared/gutter-affordance.ts`,
`src/renderer/*.ts`, `src/shared/demo-envelope.ts` and **`tests/gutter-ui.test.ts` were NEVER opened** — not to
derive a scenario, not to calibrate an expectation. **The module was reached ONLY through its documented
exported surface** (`createGutterAffordance` · `cursorDeclarationFor` · `domEventSource`, the options object,
`attach`/`detach`/`stats`/`controller`) **and the session module's `POINTER_TYPES` value**; the battery target
**only** through the documented CLI. **Two consequence-readings are quoted below from a `console.log` line the
suite itself prints** (the `§3.1 M-4` composed-`on` count and the `§5.5.3` arithmetic) — **that output is a
run's stdout, not a test file read.**

**THE RUN — every command with its exact exit code:**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `esbuild /tmp/e10-greens/final.ts --bundle --platform=node --format=esm --target=es2022 --outfile=/tmp/e10-greens/final.mjs` then `node /tmp/e10-greens/final.mjs` | **1** | the re-run driver: **34 scenarios — `30` PASS / `3` FAIL / `1` NOT-BLIND-RUNNABLE** (`R34` is authored as `NOT-BLIND-RUNNABLE` and can never be a PASS; the driver's own `SPLIT` line reads `30 / 4` because it counts that scenario's `false` verdict) |
| **C-2** | `npx vitest run` | **1** | the repository suite as the run's control: **`70` files — `1522` passed / `2` skipped / `1` failed (`1525`)**; the ONE red is **`tests/gutter.test.ts` `§3.4 R-12`'s diff-scope row**, failing on the three untracked `zz-probe*.test.ts` files named above. **`tests/gutter-ui.test.ts` PASSES in this run** — the unit's own red set is now green on this tree (the five rows `ADV-GU-6` shifted were recalibrated at `befe9c6`) |
| **C-3** | `npm run --silent build` | **0** | the bundles the battery target runs on: **FIVE artifacts — four esbuild outputs (`main.cjs`, `preload.cjs`, `standalone.mjs`, `battery-host.mjs`) in `dist/main/` plus the copied `dist/renderer/renderer.js` + `index.html`**, i.e. `§5.2` leg 3's censused set is UNCHANGED |
| **C-4** | `node scripts/mcp-cli.mjs --target battery run /tmp/e10-greens/steps-card.json` | **0** | the `§5.U` `U-1`/`U-2`(a)/`U-8`(a)–(d) readings — `load` + `targets` + `html` + `dispatch` + `html`, in ONE host process |
| **C-5** | `node scripts/mcp-cli.mjs --target battery run /tmp/e10-greens/steps-u7.json` | **0** | the `U-7` BEFORE/AFTER delta — a bare envelope first, then the authored card, with `targets` + `html` + `markdown` around each |

**NUMBERS, PLAINLY: `PASS 30 / FAIL 3 / NOT-BLIND-RUNNABLE 1`** (34 authored scenarios; the
`NOT-BLIND-RUNNABLE` entry keeps its structural reason below and is **never counted as a pass**).

**THE DELTA FROM THE FIRST RUN, STATED WITHOUT FLATTERY.** The first run executed **45** scenarios
(`36` PASS / `9` FAIL) plus `6` `NOT-BLIND-RUNNABLE`; this re-run executes **33** (`30` PASS / `3` FAIL) plus
`1` `NOT-BLIND-RUNNABLE`. **The sets are NOT the same size and are NOT a one-to-one mapping** — the first run's
`S1`–`S45` were authored against the as-filed contract, and this pass re-authored the groups the addendum named
**plus the validity/reset/write-route/preview properties the fixes imply**, so the honest delta is **per class**:

| Class the addendum named | First run | This re-run | Delta |
| --- | --- | --- | --- |
| **THE VALIDITY CLAUSE (i)** (`§2.3` item 5(i), `ADV-GU-3`) | `F-1`/`F-8` (a `NULL` pointer handed to the mapping; two mapping calls per unresolvable move) — **FAIL** | **PASS** (`R3`: a null pointer ⇒ INVALID *even with a finite-answer seam* ⇒ the invalid arm, the visible revert, `resets 1`, sink `[100]`; `R4`: the mapping is called **once per observed move**) | **the class is CLOSED by measurement** |
| **THE RESET ARM** (`§2.3` rows 8/9, `ADV-GU-6`) | `F-3`/`F-4`/`F-5`/`F-6` (the invalid arm committed nothing; the refusal reached no session) — **FAIL** | **PASS** (`R8`: the LIVE-window invalid arm calls `reset` once while the gesture is ACTIVE, commits the CLAMPED PRE-DRAG size **once**, `e3 sinkCalls 1 / written 1`, the later `pointerup` commits nothing; `R9`: no second reset; `R11`: the PRE-HANDLE window still refuses with the counters unmoved; `R21`: the throwing value seam lands in the same arm) | **the commit half is CLOSED**; **a residual drift remains on the read count — `R7` FAIL, below** |
| **THE PRE-DRAG READ ORDER** (`§2.4` item 3, `§0A` note 5) | part of the same class | **PASS on the positive half** (`R6`: read **0** after attach, **1** immediately after establishment, **1** through a valid move and the terminal) — **FAIL on the invalid half** (`R7`) | **partially closed** — see `F-1` |
| **THE PREVIEW** (`§2.5` item 4, `ADV-GU-2`: now a transient write on the LIVE TARGET) | the first run read the preview at the affordance's own node | **the module side PASSES** (`R14`: one preview per observed move, the clamped value, the gesture token by identity, never the sink); **the TARGET-ELEMENT half is `NOT-BLIND-RUNNABLE`** (`R34`'s reason: the seam is handed no element) and **the live target box reading is owed to a real window** | **the module half is CLOSED; the wiring half is owed to a live run, not asserted here** |
| **THE WIRING'S WRITE ROUTE** (`§2.1` item 8(v), `§2.5` item 5, `ADV-GU-1`) | `F-4`'s live absence of a commit | **PASS** (`R15`: ONE `state-slice` write, `targetProp content`, `mode replace`, the CLAMPED value `"150"` **as a string**, naming the **STATUS** node and not the affordance node, with the preview count unaffected) | **CLOSED at the payload level; the runtime's own acceptance is owed to a live run** (`ADV-GU-1`'s live confirmation is the battery's, not this pass's) |
| **THE `§5.U` READINGS** | `U-1`/`U-2`/`U-5`/`U-7`/`U-8`(a)–(d) taken on the battery target with the first run's own envelope | **the same instrument family, taken again** — `R28`/`R29`/`R30`/`R31`/`R32`/`R33` **PASS** with **my own independently authored** legacy-JSON card; `U-5`/`U-8`(e) `NOT-BLIND-RUNNABLE` (`R34`) | **the instrument + data-authoring claims are re-confirmed; the demo's own census and every live-window reading stay owed** |
| **THE REGISTER'S SEVEN PROPERTY TEXTS** (`§5.5.1`) | driven at the property-text level, `1` of `5` `P-GU-SM-1` cells + `2` of `5` `P-GU-SM-3` shapes FAIL | **(1)** the register's own arithmetic is re-read from the suite's stdout: `declaredTotal 134 = measuredTermSum 134`, terms `15/15/15/45/20/12/12`, chain `15 → 30 → 45 → 90 → 110 → 122 → 134`, subtotals `SM 45 · IM 65 · TP 24` — **the print now IS the sum of its own terms**; **(2)** the seven **property TEXTS** are re-driven inside `R8`/`R9`/`R10`/`R11`/`R16`/`R17`/`R18`/`R21`/`R26`; **`R7` FAILs on `P-GU-IM-2`'s "exactly once per gesture"** | **improved, not clean** — the gate-4 audit's seven `OWED — TEST-SIDE` generator remedies are the TestWriter's and this pass does not audit the red set's tables |
| **THE CARD-READING SCENARIOS** (`ADV-GU-7`/`ADV-GU-8`: bare attributes; the affordance's `css.style`) | the first run read the card's data keys | **PASS** (`R29`: the affordance's rendered markup carries `axis="vertical"` **as a bare attribute** and `style="cursor: col-resize; width: 200px;"`; `R32`: the card is data with a function-STRING body) | **CLOSED for the authoring contract, on the battery target** |

---

## K. THE RE-RUN'S SCENARIOS — `§2.1`–`§2.6`, `§3.1`–`§3.3` SURFACE, STATES, VALIDITY, RESET AND WRITE ROUTE

**THE SHARED MEASUREMENT BASE** (identical to the first run's, so the readings are comparable): pre-drag size
**100**, `boundsOf` → `{min: 0, max: 200}`, `sizeFromPointer: (pointer, start) => pointer.x`, a move to
`clientX: 150` ⇒ `raw 150` ⇒ `clamped 150`; the session is `createGestureSession({source, commit})` with a
**NON-FORWARDING recorder** on the session's own channel (`§R` `R-13` / `§2.1` clause 4) and the caller's
`commit` seam — **the recording double standing in for `Runtime.applyCommand`** — as the composition's ONE sink;
the release is **the session's own `pointerup` listener**; the source double is the documented `EventSourceLike`
shape **with event forwarding** (`§R.2` `R-10`).

| id | Clause(s) (with the first run's id where it re-drives one) | Drive | PASS criterion | Result / MEASURED |
| --- | --- | --- | --- | --- |
| **R1** | `§2.1`(a) / `§R.3` / `§3.4 R-1`(a) — *re-drives `S1`* | `Object.keys(namespace)` | exactly the **three** value names, no fourth | **PASS** — `["createGutterAffordance","cursorDeclarationFor","domEventSource"]` |
| **R2** | `§2.1` item 5 / `§3.4 R-2` — *re-drives `S2`* | the affordance's own key set + `stats()` | the **five** members, the **seven** stats fields, `lastCursor === ''` | **PASS** — `["attach","controller","detach","detached","stats"]` · `["cursorClears","cursorWrites","drops","lastCursor","moves","previews","resets"]` · `""` |
| **R3** | `§2.3` item 5 **clause (i)** (`ADV-GU-3`) — **NEW** | a caller `pointerOf` that answers `{x:150,y:0}` for one move and then **`null`** (the seam still answers a finite number) | the **null pointer ⇒ the drag is INVALID**: the invalid arm runs **once**, the visible state **REVERTS**, the sink carries the CLAMPED PRE-DRAG size | **PASS** — `gesture.value 150` after the valid move; then `previews [{v:150,valid:true},{v:100,valid:false}]`, `resets 1 (e3 1)`, `sink [100]` |
| **R4** | `§2.4` item 2 clauses (i)/(ii) / `§3.3 I-2` — *re-drives `S39`'s one-read row* | the same drive, counting the caller's mapping | the mapping is called **at most ONCE per observed move** | **PASS** — `1` after the valid move, `2` after the failed-pointer move (**one per move**; the first run measured **2 for ONE unresolvable move**) |
| **R5** | `§2.3` item 5 **clause (iv)** / `§3.2 F-9` — *re-drives `F-9`* | seven veto drives: `()=>false`, `()=>true`, `()=>undefined`, `()=>''`, `()=>0`, absent, a non-callable `42` | **only an exact `false`** vetoes | **PASS** — `()=>false → commits []`; every other drive `→ commits [150]` |
| **R6** | `§2.4` item 3 / `§0A` note 5 — **NEW (the addendum's `onStart` read)** | `attach()` → press → one valid move → release, counting `startSizeOf` at each stage | read **0** at attach, **1 immediately after establishment**, and **no re-read** on the valid path | **PASS** — `0 / 1 / 1 / 1` |
| **R7** | `§2.4` item 3 / `§0A` note 5 / `§5.5.1 P-GU-IM-2` (*"EXACTLY ONCE per gesture"*) — **NEW** | the **invalid** path: press → valid move → the seam fails → count `startSizeOf` | **exactly ONE** read per gesture (`its answer is stored in the module's own per-gesture record`) | **FAIL (F-1)** — `1` at establishment, `1` after the valid move, **`2` after the INVALID move**; `boundsOf 1 / 2 / 4` alongside |
| **R8** | `§2.3` rows 8/9 + the terminal write table + `M-13` — *re-drives `S19`/`S20`/`S38` shapes 2/3 (the `F-3`/`F-4`/`F-6` class)* | hover → press → a valid move → the seam fails → an INVALID move → the session's own `pointerup` | `reset` **once, while the gesture is ACTIVE**; the sink gets the **CLAMPED PRE-DRAG size exactly once**; the **visible revert**; the later `pointerup` commits **nothing further** | **PASS** — after the invalid move `sink [100]`, `resets 1 (e3 1)`, `previews [{v:150,valid:true},{v:100,valid:false}]`, `moves 2`; after the `pointerup` `sink [100]`, `e3 sinkCalls 1 / written 1`; **the session's own channel `[{outcome:"reset",value:100}]`** |
| **R9** | `§2.3` row 9 — *no second reset* | a **second** invalid move after the first | the reset arm is taken **once for the gesture**; no second sink write | **PASS** — `resets 1 (e3 1)`, `sink [100]` unchanged, `previews 2` |
| **R10** | `§3.1 M-8` / `§2.3` row 11 — *re-drives `S16`/`S31`* | hover → press → one valid move (reading `gesture.value` **before** the release) → the session's `pointerup` | the handle carries the CLAMPED value **before** the release; **exactly ONE** commit; **no** terminal preview | **PASS** — at the move `gesture.value 150`, `previews 1`, `sink []`; after the release `sink [150]`, `e3 sinkCalls 1 / written 1`, `previews 1`, session channel `[{outcome:"end",value:150}]` |
| **R11** | `§2.3` row 8 / `§3.1 M-13`'s counter rule — *re-drives `F-4`'s honest extra reading* | an INVALID first observed move (the PRE-HANDLE window) | the reset **refuses**, makes **ZERO session calls**, leaves `resets` **UNMOVED**, and still writes the **visible revert** | **PASS** — `resets 0`, `e3 resets 0`, `sink []`, `previews [{v:100,valid:false}]`, `moves 1` |
| **R12** | `§2.6` item 3 / `§R.2` `R8`(c) / `§3.1 M-10` — *re-drives `S23`* | `pointerover` then `pointerout`, with a declaration | the declaration is written on the **AFFORDANCE by identity**; the clear carries **`undefined`** | **PASS** — `[{affordance:true,target:false,declaration:"col-resize"},{affordance:true,target:false,declaration:undefined}]`, `lastCursor "col-resize"` |
| **R13** | `§2.3` row 5 (*"iff a declaration was written for this hover"*) / `§3.1 M-11` (*"a no-declaration hover writes NOTHING and clears NOTHING"*) — **NEW** | a hover whose `cursorOf` answers `{}` (no declaration), then the exit | the enter **writes nothing** AND the exit **clears nothing** | **FAIL (F-2)** — the enter wrote `0` (`cursorWrites 0`) **but `applyCursor` was invoked ONCE with `undefined` on the enter and ONCE with `undefined` on the exit** (`calls 2`, `cursorClears 1`) |
| **R14** | `§2.5` items 1/3/4 / `§3.3 I-5` — *re-drives `S37`* | a full valid life cycle with the preview recorded | one preview per observed move, carrying the **clamped value** and the **gesture's axis token**; **never the sink** | **PASS** — `[{v:150,valid:true,tokenIsTheGestureToken:true,resizable:true}]`, `sink [150]`, `previews 1` |
| **R15** | `§2.1` item 8(v) / `§2.5` item 5 / `§3.1 M-19` (`§R.2` `R-13`, the `ADV-GU-1` class) — **NEW** | a valid drag to its `end`, inspecting the ONE write's own payload | **one** `state-slice` write, `targetProp content`, `mode replace`, **the CLAMPED value as a string**, naming the **STATUS** node and **not** the affordance node; the preview count unaffected | **PASS** — `[{kind:"state-slice",node:"STATUS_NODE",mutation:[{targetProp:"content",mode:"replace",value:"150"}]}]`, `previews 1` |
| **R16** | `§2.3`'s terminal write table / `§5.5.1 P-GU-SM-1` / `§3.1 M-5` + `M-16` — *re-drives `S36`'s cells* | four paths: a valid `end`; a `cancel`; the DROP path; and a **non-resizable** valid drag | the two readings **AGREE** with the declared counts (`1/1`, `0/0`, `0/0`) and a non-resizable gesture writes **ZERO** previews **and** zero commits | **PASS** — valid end `sink 1 / e3 1 [150]` · cancel `sink 0 / e3 0 preview plus 1` · drop `sink 0 / e3 0 drops 1 preview plus 1` · non-resizable `previews 0 sink 0 / e3 0` |
| **R17** | `§3.2 F-6` / `§5.5.1 P-GU-TP-1` — *re-drives `S12`/`S35`/`S41`* | five hostile argument shapes: omitted, `null`, `42`, `'x'`, a throwing-`get` `Proxy` | construction **NEVER throws**; five members present/callable; `attach`/`detach` booleans; **seven** stats fields | **PASS** — all five shapes: `{attach:function,detach:function,detached:boolean,stats:function,controller:object} attach=false detach=false statsFields=7` |
| **R18** | `§5.5.1 P-GU-TP-2` + `ADV-GU-9` / `§2.1`'s `cursorDeclarationFor` — *re-drives `S34`/`S42`* | eleven answer shapes incl. the **prototype-inherited `cursor`** the gate-4 audit said no register member could see | exactly the declared reading per shape; **never a throw** | **PASS** — `{cursor:'col-resize'} → "col-resize"`, `'  row-resize  ' → "row-resize"`, `{cursor:''} → undefined`, `{cursor:'   '} → undefined`, `{cursor:42} → undefined`, `{} → undefined`, `null → undefined`, a bare string `→ undefined`, `['cursor'] → undefined`, **a PROTOTYPE-INHERITED cursor `→ undefined`**, a throwing-`get` `Proxy → undefined` |
| **R19** | `§2.1`'s `domEventSource` block / `§R.2` `R-10` / `ADV-GU-10` — *re-drives `S5`* | `on`/`off` on `null`/`undefined`/`42`/`'x'`/`{}`; `isConnected(null)`; then a real element whose `addEventListener` records the handler | **TOTAL** on a non-object element; **it FORWARDS the DOM event** as the handler's first argument | **PASS** — every drive total, `isConnected(null) → false`, **`the registered handler received the event object as its FIRST argument: true`** |
| **R20** | `§3.1 M-4`/`M-15`/`M-18` + `§R.2` `R-12` / `§3.3 I-15` — *re-drives `S25`/`S26`* | the composed `attach()`, classifying each registration by its handler's own name, then a full life cycle and `detach()` | the composed attach shows **FIVE** registrations — **the module's FOUR** (hover enter, hover exit, the context-button read, the move listener) **plus the session's ONE install** — all on the affordance; the move registration **IS `POINTER_TYPES.move` by identity**; `detach()` removes the module's own set | **PASS** — order `["pointerover:onHoverEnter","pointerout:onHoverExit","pointerdown:onPointerDownTurn","pointerdown:handler","pointermove:onMoveTurn"]` → per type `{pointerover:1, pointerout:1, pointerdown:2, pointermove:1}`, one non-module handler (`handler`), the move registration `IS pointermove` by identity, `8` live registrations after establishment (the shared move type owned by both), `0` after `detach()`. **The independent suite prints the same reading**: `{"composedOnCount":5,"composedPerType":[["pointerdown",2],["pointermove",1],["pointerout",1],["pointerover",1]]}` |
| **R21** | `§3.2 F-2` (the **RULED** absorbed reading) / `§3.1 M-20` class 3 — **`F-5`'s owed re-drive** | a `sizeFromPointer` that answers `150` for the first move and **THROWS** on the second | the throw is **ABSORBED** by the module's own gate: **no throw out of the turn**, the move is INVALID ⇒ the **reset arm** | **PASS** — `the second move threw NOTHING`, `moves 2`, `resets 1 (e3 1)`, `previews [{v:150,valid:true},{v:100,valid:false}]`, `sink [100]` |
| **R22** | `§R.3`'s `commit` row / `gutter.md` `§3.2 F-11` — *re-drives `S11`* | a **throwing** `commit` seam, a valid drag, the session's `pointerup` | the terminal does **not** throw; `sinkCalls 1` beside `written 0` | **PASS** — `the terminal threw NOTHING`, `e3 sinkCalls 1 written 0` |
| **R23** | `§R.3`'s `applyPreview`/`applyCursor` rows / `§3.2 F-8` — *re-drives `S9`/`S10`* | each presentation seam throws in turn | the throw **PROPAGATES** from the module's own turn (move turn for the preview, hover turn for the cursor) | **PASS** — `the observed-move turn threw preview-boom`, `the hover turn threw cursor-boom` |
| **R24** | `§3.2 F-14` / `§3.3 I-13` / `§2.6` item 4 — *re-drives `S33`* | `capturePointer: true` over a source that HAS `capturePointer` | the option is **DECLARED and IGNORED**: no capture call anywhere, identical behaviour | **PASS** — `capturePointer invocations 0`, `sink [150]` |
| **R25** | `§2.3` rows 3/13 / `ADV-GU-5` / `§3.1 M-7`–`M-15` — *re-drives `S24`* | `attach()` → `attach()` → `detach()` → `detach()` | first `true`; the repeat **`false`** with **ZERO further registrations**; `detached` reads `true`; the repeat `false` | **PASS** — `true` / `false` (`5` then `5` registrations) / `detach() true`, `detached true` / `false` |
| **R26** | `§3.1 M-17` — *re-drives `S43`* | two observed moves, a hover exit, then the drop path; reconcile `stats()` against the recording source, the preview record and `E3` | every counter reconciles | **PASS** — `{moves:2,previews:3,cursorWrites:1,cursorClears:1,resets:0,drops:1,lastCursor:"col-resize"}` with the preview record `[{v:150,valid:true},{v:160,valid:true},{v:100,valid:false}]` (the drop's revert), `sink 0`, `e3 sinkCalls 0` |
| **R27** | `§2.1` item 9 / `§R.2` `R-11` / `§3.4 R-14` — *re-drives `S14`/`F-2`/`F-7`* | six `moveTypeOf` answers: `''`, `42`, `{}`, a stranger string, `POINTER_TYPES.move`, absent | a **NON-STRING or EMPTY** token attaches **NO move listener of the module's own**; the session's own token makes the drag half live; a stranger string registers under **that** token and the drag half is dead | **FAIL (F-3)** — `'' → registrations ["pointerover","pointerout","pointerdown","pointerdown"] moves 0` ✔ and the stranger `→ […,"not-dispatched-by-anyone"] moves 0` ✔, **but `42 → […,"pointermove"] moves 1` and `{} → […,"pointermove"] moves 1` and absent(`undefined`) `→ […,"pointermove"] moves 1`** ✘ |

---

## L. THE RE-RUN'S SCENARIOS — THE `§5.U` READINGS AND THE WIRING, ON THE BATTERY TARGET

**The docs' own command form is `npm run mcp -- --target http --port 3787 …` against a RUNNING app**
(`§R.1` item 3). **No app was started and no window exists in this pass** (`§5.2` leg 5's `npm run ui` is the
real-DOM leg, needs a `DISPLAY`, and is the leg's OWN measurement on ITS OWN probe envelope). **The readings
were therefore taken against the battery target** — the documented default of the same CLI
(`scripts/mcp-cli.mjs`'s own usage header: *"battery (default): spawns dist/main/battery-host.mjs (a REAL
Runtime under the DOM shim)"*) — **one host process per sequence, with a LEGACY-JSON envelope loaded through
the documented `provident.load {kind:'envelope'}` surface.**

**THE INPUT ENVELOPE IS DATA I AUTHORED MYSELF from `§2.1` item 7's card description** — **three nodes**:
`gutter-vertical` (authored `css.id` + `css.classes` + an authored `css.style` carrying **the base `cursor`
declaration and the minimal size declarative** per the `§2.1` item 7(a) ruling, an authored `props.id` plus
`axis` as a **bare attribute**, and **ONE authored handler whose body is a function STRING** in the modern
`(ctx, value)` convention), `gutter-pane` (authored base size + `min`/`max`/`resizable` bare attributes), and
`gutter-status` (authored placeholder `content`). **NOTHING outside the envelope was needed to take any of the
readings below — no script, no function of mine, no renderer edit** — which is the check the data-authoring
rule exists for. **The steps files and the envelope live under `/tmp` and were never added to the repo.**

| id | Clause(s) (with the first run's id) | Drive (`cmd`, exit) | PASS criterion | Result / MEASURED |
| --- | --- | --- | --- | --- |
| **R28** | `§5.U` item 4 `U-8`(2) / `U-1` / `§3.5 R-9` — *re-drives `S45`* | `node scripts/mcp-cli.mjs --target battery run /tmp/e10-greens/steps-card.json` → `provident.load` + `provident.list_targets` (C-4, exit **0**) | the authored affordance resolves by its authored **`css.id` AND `props.id`** | **PASS** — the target list carries `{nodeId:"node-4",cssId:"gutter-vertical",propsId:"gutter-vertical",type:"div",state:"in-tree",handlers:[{name:"gutter-press",event:"pointerdown"}]}` with `gutter-card`/`gutter-pane`/`gutter-status` beside it |
| **R29** | `§5.U` item 4 `U-8`(3) / `U-2`(a) / `§3.4 R-13`(iii) — *re-drives `S46`* | the same sequence's `provident.get_rendered_html` (exit **0**) | the affordance element carries its **`data-node-id`** (the producing graph's own element) **and** its authored base `cursor` declaration | **PASS** — `<div axis="vertical" data-node-id="node-4" id="gutter-vertical" class="gutter gutter-vertical" style="cursor: col-resize; width: 200px;">` |
| **R30** | `§5.U` item 4 `U-8`(4) / `§2.1` item 7(a) — *re-drives `S47`* | the same sequence's `provident.dispatch {target:'gutter-vertical',event:'pointerdown'}` (exit **0**) | the authored handler answers `{results, dirtied}` — the affordance is **provident-dispatch-reachable**, not hand-written DOM | **PASS** — `{"results":[null],"dirtied":["node-6","node-3","node-2"]}`; the post-dispatch `html` reads the status node as `pressed:undefined` |
| **R31** | `§5.U` item 4 `U-8`(d) — *re-drives `S48`'s reachability half* | the same sequence's **single host process**, comparing the census after load, after `targets` and after `dispatch` | **one boot, no restart**: the graph is the same across the sequence | **PASS** — `[5,5,5]` `inTree` across the four commands. **This is the battery host's one process, NOT a real window** |
| **R32** | `§2.1` item 7(a) / `decisions.md` `DEMO-HANDLER-CONVENTION` — **NEW** | inspect the authored envelope I drove | the affordance's handler body is a **function STRING** in the `(ctx, value)` convention and nothing outside the envelope was needed | **PASS** — `{name:"gutter-press",event:"pointerdown",bodyIsAString:"string",bodyStart:"function (ctx, value) { cons"}`; the readings used only `provident.load` / `list_targets` / `get_rendered_html` / `dispatch` |
| **R33** | `§5.U` item 4 `U-7` / `§3.3 I-11` / `§3.5 R-9` — *re-drives `S49`/`S50`* | `node scripts/mcp-cli.mjs --target battery run /tmp/e10-greens/steps-u7.json` (C-5, exit **0**): a **bare** envelope first, then the authored card, `targets` + `html` around each | the delta is **MEASURED, not projected**: the new nodes and their `data-node-id`s appear | **PASS** — **BEFORE** `1` node (`["bare-root"]`), `renderedHtml` **48** chars · **AFTER** `5` nodes `["gutter-card","gutter-vertical","gutter-pane","gutter-status"]` (+ the root), `renderedHtml` **464** chars ⇒ **delta +4 nodes / +416 characters**, node ids `node-3…node-7` present in both views |
| **R34** | `§5.U` `U-5` (the **DRAGGED-VALUE** reading with its pre-drag negative control, `§R.4` `C-A5`) + `U-8`(e) (the **second gesture on the SAME element**, the `E-2` ruling's owed evidence) | **none taken** | — | **NOT-BLIND-RUNNABLE** — the full structural reason is **N-1** below. **Never counted as a pass.** |

---

## M. THE RE-RUN'S FAILURES — measured evidence and drift/regression verdict

**Three scenarios failed. Each is stated with its measured reading and its verdict** (`doc/spec drift` = the
contract's own text does not match behaviour; `un-hardened regression` = behaviour the contract forbids).

### F-1 — **the pre-drag size seam is read a SECOND time on the invalid path** (drift; the partial residue of `ADV-GU-6`)

* **Scenario:** `R7` (and the seam-inventory half of `R6`).
* **Measured:** on the **invalid** path the caller's `startSizeOf` seam is invoked **twice for one gesture**:
  `1` at establishment, `1` after the valid move, **`2` after the INVALID move** — the second read being the
  invalid arm's reading of the seam **instead of the per-gesture record the establishment read already wrote**.
  (`boundsOf` reads `1 / 2 / 4` over the same drive, which is consistent with the module's own turn plus `E3`'s
  terminal evaluation.) **The positive half is the fix:** `R6` measures `0` at attach and **`1` immediately after
  establishment**, so the read order `ADV-GU-6` ruled **is** landed.
* **Why it is a finding:** `§2.4` item 3 reads *"`startSizeOf(element, token)` **is called exactly once per
  gesture, in `onStart`**, and its answer is stored in the module's own per-gesture record"*, and
  `§5.5.1 P-GU-IM-2` declares *"`startSizeOf` — **EXACTLY ONCE per gesture**, at establishment"* with *"a second
  `resizableOf` call in lifecycle `(c)` FAILS"* as the row's own shape. The measured count is `2` for the class
  of gesture that arm belongs to.
* **WHAT THIS IS NOT, stated so no reader over-reads it:** the **commit** the addendum's `F-4` class was about
  **is landed** — `R8` measures the CLAMPED PRE-DRAG size committed **exactly once** (`sink [100]`, `e3
  sinkCalls 1 / written 1`), the visible revert, and a later `pointerup` that commits nothing further. **So this
  is a read-COUNT drift, not a missing-write regression.** **The recalibration `befe9c6` landed is itself the
  evidence that the two readings were reconciled test-side rather than removed** (`docs/next-steps.md`'s own
  commit record: *"the stateful `n<=1` cuts → `n<=2`"*), which is why this pass reports it as a **contract-text
  drift** and leaves the test-side reconciliation to the `OWED — TEST-SIDE` owner.
* **VERDICT: `doc/spec drift`** (the module's read count contradicts `§2.4` item 3's *"exactly once"* and
  `P-GU-IM-2`'s declared cell). **Owner: `U-GUTTER-UI`'s own module** — a host finding, not an `E3`-side one.

### F-2 — **a no-declaration hover still CLEARS the cursor, on the enter and again on the exit** (drift)

* **Scenario:** `R13`.
* **Measured:** with `cursorOf` answering `{}` (no declaration), the hover **enter** invoked
  `applyCursor(element, undefined)` **once** (`cursorWrites` stays `0`, but the call happened), and the hover
  **exit** invoked `applyCursor(element, undefined)` **again** — `applyCursor` calls `2`, both carrying
  `undefined`, `cursorClears 1`, with the element the affordance by identity.
* **Why it is a finding:** `§2.3` row 5 reads *"**`applyCursor(element, undefined)`** — the same AFFORDANCE —
  **iff a declaration was written for this hover**"* and `§3.1 M-11` reads *"a no-declaration hover writes
  **NOTHING** and clears **NOTHING**"*. The measured behaviour clears **unconditionally**: the enter also
  attempts a clear for a hover it wrote nothing for, and the exit clears whether or not a declaration was ever
  written. **The first run's `S23` recorded exactly this as a PASS because its criterion only read the
  `cursorWrites`/`cursorClears` counters** (`enter 0`, `exit clear 1`) — i.e. the original scenario's criterion
  was **too weak to see the enter-side call**, which is why this re-run states the criterion as the clause's own
  words (*"writes nothing and clears nothing"*) and measures the call record.
* **VERDICT: `doc/spec drift`** (`§2.3` row 5's conditional and `§3.1 M-11`'s second half are not what the
  behaviour does). **Owner: `U-GUTTER-UI`'s own module.**

### F-3 — **a NON-STRING `moveTypeOf` token still attaches the module's move listener under the literal `'pointermove'`** (drift — the `F-2`/`F-7` class, only partly closed)

* **Scenario:** `R27` (the first run's `S14`, `F-2` and `F-7` re-driven).
* **Measured:** six drives, each `attach()` + a primary press + one `pointermove`:
  * `moveTypeOf → ''` ⇒ registrations `["pointerover","pointerout","pointerdown","pointerdown"]`, **`moves 0`** ✔ (the declared degradation);
  * `moveTypeOf → 'not-dispatched-by-anyone'` ⇒ registers under **that** token, **`moves 0`** ✔ (the `B-9`/`P-9` false-green class is visible exactly as `§3.4 R-14` says);
  * `moveTypeOf → POINTER_TYPES.move` ⇒ `[…,"pointermove"]`, **`moves 1`** ✔;
  * **`moveTypeOf → 42` ⇒ `[…,"pointermove"]`, `moves 1`** ✘;
  * **`moveTypeOf → {}` ⇒ `[…,"pointermove"]`, `moves 1`** ✘;
  * **`moveTypeOf → undefined` (the seam absent, or answering `undefined`) ⇒ `[…,"pointermove"]`, `moves 1`** ✘.
* **Why it is a finding:** `§2.1` item 9 reads *"The module's OWN bytes contain NO pointer-event-type string: it
  neither replicates `POINTER_TYPES` nor authors an event-type literal"*, `§2.1`'s `moveTypeOf` cell reads *"a
  NON-EMPTY STRING is the token; anything else (**absent, non-string, empty**) means the module **DOES NOT
  attach a move listener**"*, and `§R.3`'s degradation table reads *"a non-string or empty token ⇒ **NO move
  listener is attached**"*. **The measured behaviour differs in BOTH directions: it attaches a listener for
  non-strings (under the imported constant), and it attaches NOTHING (rather than a listener under the supplied
  token) for an empty string.** The stranger-string drive is the one that matches the table.
* **VERDICT: `doc/spec drift`** — the declared degradation's own input list names non-strings and the behaviour
  is neither the declared `no listener` nor the table's `registered under the caller's token`. **Owner:
  `U-GUTTER-UI`'s own module.** *(Severity: low — `§R.2` `R-11` has the wiring supply the session's own
  exported constant, so no shipped path reaches these shapes; the reading is recorded because a fork's miswiring
  is exactly what the clause exists to make visible, and because the first run reported the same class.)*

**THE FIRST RUN'S OTHER FAILURES, DISPOSITIONED ONE BY ONE** (so no reader has to diff the two blocks):
`F-1`/`F-8` (**the null-pointer/one-read class**) — **CLOSED by measurement** (`R3`, `R4`). `F-3`/`F-4`/`F-6`
(**the reset arm's missing commit and accounting**) — **CLOSED by measurement** (`R8`, `R9`, `R11`), with the
read-count residue recorded as **this pass's `F-1`**. `F-5` (**the throwing value seam not reaching the reset
arm**) — **CLOSED by measurement** (`R21`), which is the re-drive the addendum explicitly owed. `F-2`/`F-7`
(**non-string move tokens**) — **PARTLY CLOSED**: `''` and a stranger string now read as `§R.3` declares, the
non-string shapes still do not (**this pass's `F-3`**). `F-9` (**`S25`'s fifth `off`**) — **NOT a finding**
(then and now: the session's own `dispose()` removing its own install; `R20` measures the ownership split on
both sides and it is the documented one).

---

## N. `NOT-BLIND-RUNNABLE` — the re-run's ONE entry, with its structural reason (never a PASS)

| id | Scenario | Structural reason |
| --- | --- | --- |
| **N-1** | **`R34` = `§5.U`'s `U-5` (the DRAGGED-VALUE reading **with its pre-drag-size negative control**, `§R.4` `C-A5`) and `U-8`(e) (the second gesture on the SAME element, the `E-2` ruling's owed evidence)** | **`U-5` needs the value the operator actually dragged to, read back out of the authored status node after a REAL commit.** The MCP surfaces cannot produce a commit: **`provident.dispatch` carries an event NAME and no coordinate and no button** — measured in this very pass: `R30`'s dispatch answered `{"results":[null],"dirtied":["node-6","node-3","node-2"]}` and the authored body read its event value as `undefined`, so the status node settled at `pressed:undefined`. **The commit therefore needs the WIRING's live path under a real pointer in a booted window** (`npm start`, `MANUAL OPERATOR`) **or the `npm run ui` leg's own probe envelope** — which is the leg's own measurement, on its own envelope, and is not this unit's affordance (`§5.2` leg 5's corrected note). **The battery target is a real `Runtime` under the DOM shim: no window, no pointer, no transient style, no computed style.** Reported as `NOT-BLIND-RUNNABLE`, **never as a pass**, and the reading stays exactly where `docs/next-steps.md` leaves it (owed to a session with a human at the window). |

**THE FIRST RUN'S `N-1`–`N-6` ARE CARRIED FORWARD UNCHANGED IN SUBSTANCE, and this pass did not shrink the
list by re-labelling anything:** `N-1`/`N-2` (**the three static token scans over the module's bytes**) and
`N-3` (**the register's declared-vs-distinct arithmetic and the red set's own tables — `tests/gutter-ui.test.ts`
is the one file a blind pass must not read**) remain **structurally impossible for a blind writer**; `N-4`
(**the DEMO's own census** — `src/shared/demo-envelope.ts`'s card, and a RUNNING app) is **still owed**; `N-5`
(**`npm run ui`** — needs a `DISPLAY` and a boot; not run here); `N-6` (`U-3`/`U-4`/`U-6` and `U-8`(e) —
`MANUAL OPERATOR` by ruling; no operator was present). **`§5.U`'s `U-5`/`U-8`(e) join them as `N-1` above.**

---

## O. WHAT THIS RE-RUN DOES **NOT** PROVE, AND THE HONEST LIMITS

1. **NO LIVE WINDOW, AND I RAN NO `[U]` LEG.** **No Electron app was booted, no `DISPLAY` was used, and
   `npm run ui` was NOT run** — so **no rendered geometry, no applied style, no computed cursor, no real pointer,
   no second-gesture element identity** is proven here (`§3.2 F-13`; Layer anchors 1/4/5). **The batch legs I
   DID run are `npx vitest run`, `npm run build` and the two `--target battery` sequences** — the battery target
   is a real `Runtime` **under the DOM shim**, not a window.
2. **NO MCP-DRIVEN DRAG, AND THE BATTERY IS NOT THE DEMO.** Every move/`pointerup` was a synthetic event object
   handed to the source's own handler — the `[T]` form `§5.2` leg 6 names. **The legacy-JSON card driven here is
   MY OWN data-authored envelope, not `src/shared/demo-envelope.ts`'s card**, so the readings prove the
   *instrument* and *data-authoring* claims and **not** the demo's census (the first run's limit, unchanged).
3. **THE WIRING'S TWO HALVES ARE SPLIT IN THIS REPORT, DELIBERATELY.** The **`commit` seam's payload** is
   measured at the contract level (`R15`: one `state-slice` write, the clamped value as a string, the status node
   named) — but the **runtime's ACCEPTANCE of it, and the preview's transient write on the live target element,
   are the wiring's and need a window**: `R14` measures the module's preview **payload** and its element-blind
   seam, and **`R34`/`N-1` states the structural reason the live half cannot be taken here.** **A `[T]` green
   for `R15` is NOT `ADV-GU-1`'s live confirmation** (that reading is the live battery's: the status node read
   `100 → 110` under real CDP events at `72fff4c`).
4. **THE REGISTER'S TABLES AND THE STATIC SCANS ARE NOT AUDITED.** The seven property **texts** are driven
   (`R8`–`R11`, `R16`–`R18`, `R21`, `R26`), the **arithmetic is re-read from the suite's own stdout** (`134` =
   the sum of its printed terms), and **the tables' declared-vs-distinct figures, the caps and the three token
   scans were not audited** — the first run's `N-2`/`N-3` stand, and the gate-4 audit's seven
   `OWED — TEST-SIDE` generator remedies remain the TestWriter's.
5. **THREE OF MY OWN HARNESS DEFECTS WERE FOUND AND FIXED DURING THIS ROUND, and are recorded for honesty**
   (the same discipline the first run applied to its `EventSourceLike` mistake): (a) my first driver asserted a
   **commit at the move** for a valid drag — the contract commits at the **terminal**, so the expectation was
   mine and not the module's; (b) I read `Object.keys(stats).length` where `stats()` returns a record, giving
   the `'object'` string in a length comparison; (c) I attributed all five composed `on` calls to the module —
   **the registration order is `pointerover`, `pointerout`, `pointerdown` (the module's), `pointerdown` (the
   SESSION's install), `pointermove` (the module's)**, which is the documented `4 + 1` split rather than five of
   one owner's. **No failing reading above rests on any of the three.**
6. **THIS BLOCK IS NOT A DONE ROW AND CLAIMS NO GATE BEYOND ITS OWN.** It reports what a blind reader could
   derive from the documentation and measure against the live modules and the battery host at `83eb471`.
   **`§5.3`'s twelve-item DONE row, the adversarial dispositions, the per-unit documentation review and the
   live battery remain theirs.**

---

## P. ONE-LINE HONESTY STATEMENT

**Everything in this `⟶ RE-RUN` block was authored from `docs/specs/gutter-ui.md` + `gutter.md` + `gsession.md`
(+ `decisions.md`/`mcp-endpoint.md` and the CLI's own header) alone and RUN at `83eb471` — `33` scenarios:
`PASS 30` / `FAIL 3` (`F-1` the second pre-drag read, `F-2` the unconditional cursor clear, `F-3` the non-string
move token) / `NOT-BLIND-RUNNABLE 1` (`U-5`/`U-8`(e), stated with its structural reason and never as a pass) —
with the module reached only through its documented exported surface, the card reached only as legacy-JSON data,
no implementation byte and no test file read, no `[U]` leg run and no live window booted; and nothing above this
block was edited.**
