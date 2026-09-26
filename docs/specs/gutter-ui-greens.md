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
