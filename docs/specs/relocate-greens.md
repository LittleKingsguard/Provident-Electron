# GREEN-SCENARIO ARTIFACT — `U-RELOCATE` (`E4`, wave E) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass) — 23 executed scenarios: 23 PASS / 0 FAIL / 4 NOT-BLIND-RUNNABLE`, plus one
type-layer scenario (`RL-G-24`, PASS) and **five recorded findings** (`F-1`..`F-5`) — three of them
**doc/ambiguity findings that need a contract sentence**, one of them **a documented clause the composition
cannot re-drive**, and none of them a converted FAIL.**

**⟶ STATUS, AMENDED 2026-09-27 (APPENDED BESIDE the as-filed line above, which is KEPT VISIBLE; the full
record is `§K`).** **`TARGETED RE-DRIVE at 0984d41 — 30 executed scenarios: 29 PASS / 1 FAIL /
4 NOT-BLIND-RUNNABLE`**, plus the type-layer scenario `RL-G-24` (PASS) and **eight recorded findings**
(`F-1`..`F-8`). **The `23` original scenarios were RE-RUN VERBATIM and `23` still PASS; SEVEN scenarios
(`RL-G-25`..`RL-G-31`) were ADDED for the six `§3d` pins and the three host fixes, of which SIX PASS and
ONE (`RL-G-31`, the `ADV-RL-9` post-arm recovery) **FAILS** — a `doc/spec contradiction`, recorded as
`F-7` with its clause named, and **neither re-scoped nor converted to a pass.** **⟶ THE ONE FAIL'S
DISPOSITION, ADDED BESIDE 2026-09-27 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW — the as-filed sentence
above is KEPT VISIBLE and its `29` PASS / `1` FAIL / `4` NOT-BLIND-RUNNABLE ARITHMETIC IS UNMOVED): THE
FAIL STANDS AS A FAIL AND THE `29/1/4` COUNT IS STILL THE HONEST COUNT — `F-7`'s OWN `⟶ RESOLVED` block
(§K.5) does NOT convert it to a pass. WHAT THE GATE-7 PASS SETTLED IS THE *CLAUSE*, NOT THE SCENARIO:
`§3d` pin `ADV-RL-9` was corrected in place (the recovery reveal is a TERMINAL-DELIVERED shape,
unreachable through the LANDED session because the arm's mid-drag `reset` detaches the tracking listeners
and a later release reaches NO handler), and **`RL-G-31` may be re-driven ONLY against a harness that
DELIVERS a terminal after the arm** — the real session cannot. **A reader comparing this line with
`§K.3`'s `FAIL` cell and with `§K.5`'s `F-7` must read them as ONE disposition: the module's arm
behaviour is CONFORMANT, the clause was the side that could not hold, and the scenario is still not a
pass.** The original pass's own
readings above and below stand as that pass's own measurement.**

**Authored from the DOCUMENTATION ONLY, and RUN against the landed module.** The sources read were:
`docs/specs/relocate.md` (the contract — `§0`'s twelve ruling rows, **`§0A` notes 1–17**, `§1`, `§2.1`
(items `1`–`7`, the seam table, the factory block, the `RelocateStats` block), `§2.2`, `§2.3` (items
`1`–`9`), `§2.4` (items `1`–`5`), `§2.5` (items `1`–`7`), `§2.6`, `§3.1` `M-1`..`M-17`,
`§3.2` `F-1`..`F-19`, `§3.3` `I-1`..`I-15`, `§3.4` `R-1`..`R-18`, `§3.5` `X-1`, `§4.1`–`§4.5`, `§5.1`,
`§5.2`, `§5.3`, `§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3`, `§6`, `§7`, `§7a`/`§7a.1`, `§8`, `§3a`, `§3b`) ·
`docs/specs/relocate-review.md` (the closed gate-1 record) · `docs/decisions.md`'s ACTIVE rows for the family
(`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` · `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN` ·
`SHELL-CHROME-PANES-ZONES-IN-SCOPE` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` ·
`GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAMP-COMMIT-LAYER` · `E10-SINGLE-SINK-CHANNEL` ·
`E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY` · `SEAM-THROW-DISPOSITION-VALUE-READING-SEAMS-ABSORBED` ·
`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` · `UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`) ·
`docs/specs/gsession.md` (`§2.1`, `§2.3` items `1`–`8`, `§2.4` items `1`–`8`, `§2.5` items `1`–`11`, `§2.6`) ·
`docs/specs/gutter.md`/`gutter-ui.md` (the family's conventions) · and, for FORMAT ONLY,
`docs/specs/gutter-ui-greens.md` and `docs/specs/listhost-greens.md`.

**What this pass did NOT read — the blindness claim, stated so it is checkable:** **`src/shared/relocate.ts`
was NEVER OPENED, READ, PRINTED, SEARCHED OR COMPILED-AND-INSPECTED** — the module was reached **only as an
imported black box** through its documented surface. **`tests/relocate.test.ts` (the red set) was NEVER
READ**, and no red-set table, expectation or harness shape informed any scenario, drive or expected reading
below — every scenario's inputs are **mine**, chosen from the contract's clause text. `src/shared/*.ts`
siblings **other than the frozen session the contract names as this unit's delegate surface** were not read
either (`§2.5` states that surface in the docs; the module and the session were imported by path). **The one
deliberate reach outside the docs is recorded in `§I`'s honest-limits block: nothing.**

**THE REVISION.** `git rev-parse --short HEAD` → **`c75969f`** (`E4 GATE 3 GREEN — src/shared/relocate.ts …`);
`git status --porcelain` → **EMPTY before this pass** (working tree clean).

**THE DATE.** The host clock reads **2026-09-27** (`date -u`), the same day as the contract's dated notes; the
filing date is cited.

---

## A. HOW THE SCENARIOS WERE AUTHORED AND DRIVEN (so every reading below is reproducible)

**The driver is a SCRATCH artifact OUTSIDE the repo** — `/tmp/reloc-greens/run.ts`, compiled on the fly by
the repo's own esbuild to `/tmp/reloc-greens/run.mjs` and executed by node. **Nothing was written inside the
repo except this document** (`§J` records the check). The module and the session are imported **by absolute
path as file URLs**, so no repo file needed editing to point at them:

```ts
const RELOCATE = pathToFileURL(REPO + '/src/shared/relocate.ts').href
const GSESSION = pathToFileURL(REPO + '/src/shared/gesture-session.ts').href
```

**THE COMMANDS, with their exit codes (this is the whole run):**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `./node_modules/.bin/esbuild /tmp/reloc-greens/run.ts --bundle --platform=node --format=esm --outfile=/tmp/reloc-greens/run.mjs` (run from the repo) | **0** | the driver bundle (the module is bundled IN, so the file-URL imports resolve) |
| **C-2** | `node /tmp/reloc-greens/run.mjs` | **0** | **23 executed scenarios — `23` PASS / `0` FAIL**, plus the four `NOT-BLIND-RUNNABLE` rows; output kept at `/tmp/reloc-greens/run-output.txt` |
| **C-3** | `…/node_modules/.bin/tsc --noEmit --strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --types node --typeRoots …/@types /tmp/reloc-greens/type-half.ts` | **0** | **`RL-G-24`** — the `§2.1`(b) type half: all EIGHT type names import and compile (`§3.4 R-5`(b), `§5.2` leg 4's shape) |
| **C-4** | `npm run --silent typecheck` | **0** | baseline, unchanged by this pass |
| **C-5** | `npm run --silent typecheck:tests` | **0** | baseline |
| **C-6** | `npm test` | **0** | baseline (69 files, 1625 passed / 2 skipped) — **⟶ ANNOTATED BESIDE 2026-09-27 (THE GATE-7 PASS — findings `PF-6`/`PF-7`, HIGH/MED; annotate-never-rewrite, so this pass's OWN reading above is KEPT VISIBLE as that pass's measurement). THE LIVE READING THE RE-DRIVE RECORDS (`§K.4` `R-8`, `0984d41`): `Test Files 69 passed (69)` · `Tests 1628 passed \| 2 skipped (1630)` — `0` failed. THE `1625`-PASSED FIGURE IS NOT A CONTRADICTION OF IT AND MUST NOT BE PINNED AS ONE: it is THIS pass's own measurement of the tree at `c75969f`, taken BEFORE the re-drive added `RL-G-25`..`RL-G-31`, and the delta is this set's own growth plus the module's gate-4 fixes. A later reader comparing the two figures is comparing two DIFFERENT TREES, not two readings of one.** |
| **C-7** | `npm run --silent build` | **0** | baseline (5 artifacts: `main.cjs`, `preload.cjs`, `standalone.mjs`, `battery-host.mjs`, `renderer.js` + `index.html`) — **no bundle gained this module** (`§3.4 R-6`) |

**HOW THE MODULE IS DRIVEN — the documented surface only.** Every scenario reaches it through:
`createRelocateSession(options)` · `attach(element, hooks?)` · `detach()` · `reset(element)` · `stats()` ·
`detached` · the exported pure `withinProximity` · and **the consumer's own seams and hooks** (the seven
factory options of `§2.1` item 2 and the hooks record of `§2.1` item 7, `preDragValueOf` included).

**TWO HARNESS FORMS, both named by the contract:**
**(1) THE REAL SESSION** — the landed frozen session (`docs/specs/gsession.md` `§2.5`) over **a recording
event source** whose `on`/`off`/`isConnected`/`capturePointer` members are the documented `EventSource`
shape. The lifecycle is driven **through the session's OWN installed listeners** (`§2.3` item 1(d)):
`pointerdown` on the element establishes, `pointermove` observes, `pointerup` releases, `pointercancel`
cancels — so the module's wrappers are reached **exactly as the composition does**, never by calling a hook
directly.
**(2) A RECORDING SESSION DOUBLE** — used only where the contract's own rows are **about the delegation**
(`§2.3` item 9(a)'s three-argument `session.reset`, `§2.1` item 6's TWO-LIST claim, `§3.1 M-1`'s install key
set, `§3.1 M-13`, `§3.2 F-10`). Its **`ops` list holds only `install`/`reset`/`dispose`** and its **`reads`
list holds `stats()`/`gesture()`/`disposed`** — **TWO SEPARATE LISTS, never one count** (`§2.1` item 6).
Both harnesses are named in the scenario tables below.

---

## B. THE SCENARIOS — THE HAPPY PATH AND THE TERMINAL WRITE TABLE

| id | Clause(s) | Drive (`cmd`) | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **RL-G-01** | `§3.1 M-5`/`M-9`/`M-3`, `§2.3` items 4/6(d), `§2.6` item 7, `§0A` note 10 | real session; attach with all four consumer hooks + `preDragValueOf`; establish; **five** within-proximity moves; release (C-2) | exactly **ONE** `onReveal` — the consumer's record AND `stats().revealWrites` **AGREE at 1**; **one** sink call at the `'end'` terminal; `moves 5`; `candidateCalls 5`; `lastCode 'ok'`; the pre-drag member read exactly once | **PASS** — `reveal=1/1 sink=1 moves=5 candidateCalls=5 outcome="end" hooks=["onStart","onMove"×5,"onEnd"] preDragCalls=1` |
| **RL-G-02** | `§0A` note 8, `§2.3` item 4's channel (C) row, `§3.1 M-8`/`M-14`, `§5.5.1 P-RL-SM-7` | real session; `preDragValueOf: () => 777`; establish; **ONE move outside every candidate's proximity**; then release | `resets === 1` **measured DURING the drag** (before the release) with the session's `reset` terminal entered while the gesture is still active; **exactly one** sink write carrying **`777`** with `outcome === 'reset'`; **ZERO** reveals; the **later release writes nothing** (`sinkCalls` stays `1`); exactly one revert write on the per-move channel | **PASS** — `resets(during drag)=1 sink=["reset":777] reveals=0 sinkCalls=1 sessionSink=1 preview=1 lastCode=ok releaseHandlerStillAttached=false` |
| **RL-G-03** | `§0A` note 9, `§2.3` items 6(b)/7/9(b), `§3.1 M-12`, `§5.5.1 P-RL-SM-4` | three stage reads on the consumer's own recorded invocation count: after `attach`/before establishment, after establishment, after the terminal | **`0` / `1` / `1`** — the capture is **EXACTLY once per established gesture**, never "at least", never a second read | **PASS** — `stages 0/1/1 measured as 0/1/1` |
| **RL-G-04** | `§3.1 M-8`, `§5.5.1 P-RL-SM-7`, `§3.2 F-18`, `§0A` note 8 | real session; the arm taken on one outside-proximity move; then the release; **then a second outside move attempted** | `resets === 1` (the arm is taken at most once per gesture) and the release writes **nothing** (`sinkCalls 1 → 1`). **Measured sub-finding (`F-2`): the second outside move reaches NO handler at all** | **PASS** (the declared counts) — `resets=1 sinkCalls(before/after release)=1/1 moves=1 candidateCalls=1 preview=1 releaseReachedHandler=false secondMoveReachedHandler=false` — **see `F-2`** |
| **RL-G-05** | `§2.3` item 5 clause (2), `§3.1 M-7`, `§5.5.1 P-RL-SM-6`, decision row `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN` clause (1) | real session; move 1 **within** proximity (the zone SHOWS), move 2 **outside** (the zone HIDES again) | the per-move channel reads **2** invocations, the second declaring `withinProximity === false` — **the displayed-ness is NOT monotonic**; and the out-of-proximity move is the invalid arm | **PASS** — `previews 1/2 = [true,false]; the hide move also took the arm (resets 1) … reveals on this path=0` — **see `F-1`/`F-2`** |
| **RL-G-06** | decision row `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN` clause (2), `§2.3` item 5 clause (3), `§3.1 M-11`, `§5.5.1 P-RL-SM-6` | real session; move 1 within proximity of candidate `A`; move 2 within proximity of `B` **and outside `A`**; release | **ONE observed-move turn** for the retarget: `onPreview` reads exactly **2** invocations, **the second carrying BOTH the hide of `A` and the show of `B`**; the durable reveal is still exactly 1; the candidate objects pass **BY IDENTITY** | **PASS** — `moves=2 previews=2 (ONE per turn) revealWrites=1 state1={"withinProximity":true,"shown":{A}} state2={"withinProximity":true,"shown":{B},"hidden":{A}} candidateIdentityHeld=true revealTargetIsTheResolvedObject=true` |
| **RL-G-13** | `§2.1` item 1 (`RelocateHandle`), `§2.5` item 4, `§3.1 M-17`, `§3.3 I-5` | real session; a full lifecycle with **all four** consumer hooks supplied, each recording its own arguments | each hook ran **exactly once**, the element/handle arguments arriving **BY IDENTITY**; the module adds nothing and swallows nothing | **PASS** — `onStart=1 onMove=1 onEnd=1 onCancel=0; handle id=1 outcome="end"` |
| **RL-G-14** | `§2.3` item 4, `§2.6` item 2, `§3.1 M-4`, `§3.2 F-9` | real session; establish; one within-proximity move; **`pointercancel`** | `revealWrites 0`, `sinkCalls 0`, `written 0`, `resets 0`, and the wiring's own session-construction `commit` **never ran** | **PASS** — `revealWrites=0 sinkCalls=0 written=0 resets=0 sessionCommits=0` |
| **RL-G-17** | `§2.3` item 6's **pinned turn order** (`§0A` note 13 item 7), `§3.1 M-3` | real session; record the order of `preDragValueOf`, the consumer's `onStart`, `candidatesFor`, `resolveTarget`, `onPreview`, the consumer's `onMove`, then `onReveal`, `commit`, the consumer's `onEnd` | **the pinned order, exactly**: capture → consumer `onStart` at establishment; `candidatesFor` → `resolveTarget` → `onPreview` → consumer `onMove` in the move turn; `onReveal` → `commit` → consumer `onEnd` at the terminal | **PASS** — `order=["capture","consumerOnStart","resolveTarget","onPreview","consumerOnMove","onReveal","commit","consumerOnEnd"]` |
| **RL-G-11** | `§2.3` item 7, `§3.3 I-9`, `§3.1 M-10`/`M-16`, `§5.5.1 P-RL-SM-4` | real session; two lifecycles on one element (the second with **no** candidates), then `attach`/`detach`/`detach`, then a post-dispose `attach` | **nothing carries across a gesture** (the second takes its own arm with **its own** pre-drag read: `preDragValueOf` reads `2` across two gestures); `detach()` delegates `session.dispose()` **exactly once** and is idempotent (`true` then `false`); `detached === true` forever; a further `attach` ⇒ `false` | **PASS** — `sink gesture1=1 gesture2=2 resets2nd=1 preDragReads=2 detach=true/false attachAfterDetach=false install-off(dispose) count=1 lastCode=ok` |
| **RL-G-12** | `§2.1` item 1 (`attach`/`reset`/`detach`), `§2.1` item 6, `§2.4` items 1/5, `§3.2 F-10`/`F-11`, `§3.3 I-14` | four refusal drives: `reset` with no gesture; `reset` after a terminal; a repeated `attach`; a session **disposed behind the module** | refusals are **RETURNED, never thrown**; codes are the session's own, propagated verbatim; the no-gesture path makes **ZERO delegations**; a repeat `attach` is a no-op `false` with no second `install` | **PASS** — `reset with no gesture -> {ok:false,code:"no-gesture",committed:false} ; reset after a terminal -> "no-gesture" ; repeat attach -> false, one install ; reset on a session disposed behind the module -> {ok:false,code:"no-gesture",committed:false}` |
| **RL-G-15** | `§2.1` items 1/3, `§3.4 R-5`(a), `§3.3 I-15` | read the imported namespace's own keys and the module's own member surface | the runtime namespace carries **exactly two** value exports — `createRelocateSession`, `withinProximity`, **no third** (`POINTER_TYPES` absent) — and the module exposes exactly `attach`/`detach`/`reset`/`stats`/`detached` | **PASS** — `namespace=["createRelocateSession","withinProximity"] own+inherited-own members=["attach","detach","detached","reset","stats"] declaredFivePresent=true` |
| **RL-G-16** | `§2.1` items 1/5, `§3.1 M-15`, `§0A` note 14 item 1 | `stats()` before anything happens | the key set is **EXACTLY the eleven** declared fields **under their CURRENT names** (`revealWritesApplied`, never the renamed census token); `lastCode === 'ok'`; every counter `0` | **PASS** — `keys(11)=["attached","candidateCalls","gestures","lastCode","moves","resets","resolveCalls","revealWrites","revealWritesApplied","sinkCalls","written"]; lastCode="ok"; all counters 0` |

---

## C. THE SCENARIOS — THE COMPARATOR (the exported pure total function)

| id | Clause(s) | Drive (`cmd`) | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **RL-G-07** | `§2.1` item 1's `withinProximity` block, `§2.3` item 1, **`§0A` notes 16 and 17**, `§3.1 M-2`, `§3.2 F-1`/`F-2`/`F-3` | `withinProximity(d, t)` over **30 pinned pairs**, through the exported pure function | the **boundary inside** (`(20,20) ⇒ true`), `d < t`/`d > t` as declared, `NaN` on either side ⇒ `false`, a **FINITE NEGATIVE operand on either side ⇒ `false`** (`(-5,-1)`, `(-1,-1)`, `(0,-1)`, `(-5,20)`, `(5,-1)`), the **`±Infinity` limb VERBATIM** (`(Infinity,Infinity) ⇒ true`, `(0,Infinity) ⇒ true`, `(5,-Infinity) ⇒ false`, **`(-Infinity,-Infinity) ⇒ true`**, **`(-Infinity,42) ⇒ true`**, `(Infinity,42) ⇒ false`), `-0` not special-cased, and **every non-number ⇒ `false` by the `typeof` gate with NO throw** (`'20'`, `null`, `undefined`, `true`, `{}`, `[]`, `12n`, a `Symbol`, a function, a `Map`) | **PASS** — `30 pairs, all as declared; no throw; frozen non-number operand accepted; total (boolean)`. **Every limb of note 16 and every variant `(H1)`–`(H6)` of note 17 that I could drive is CONFIRMED — including `(H3)` (the finite-negative class, *declared rather than driven* by the row's own hostile list) and `(H4)` (`-Infinity` verbatim, *the one as-written cell note 17 corrects*) |
| **RL-G-19** | `§2.1` item 1 (totality), `§3.3 I-1`/`I-12`, `§4.4 S-PURE-1` | the **full cross-product** of a **19-value operand pool** (the pool note 16(c) itself enumerates: `undefined, null, 42, 'x', true, [], {}, Symbol('s'), 12n, fn, Map, 0, -0, -1, 20, 20.5, NaN, Infinity, -Infinity`) — **361 pairs**, each called twice; plus frozen operands | **every** call returns a `boolean` (never `undefined`, a record, a string or a sentinel), **throws for NO pair**, is **stable** across repeated calls, and accepts frozen operands | **PASS** — `361 pairs, all boolean, all stable, no throw, frozen operands accepted (19-value pool)`. **This is the row note 16(c) flagged as the one red-set expectation inconsistent with the pin (15 of 361 pairs): the MODULE answers the PINNED rule on all 361 — the inconsistency lives in the red set's expectation expression, exactly as the note says** |
| **RL-G-23** | `§2.1` item 1 (`threshold`), `§2.3` items 1/2, `§5.5.1 P-RL-IM-3` (3b) — *the no-default clause* | the **SAME** candidate answer (`distance: 15`) driven with `threshold` **20**, then **15**, then **14** | the threshold is **READ (evaluated), not merely carried**: `15 <= 20` ⇒ no arm and the target resolves; `15 <= 15` ⇒ **the boundary is INSIDE**, still no arm; `15 <= 14` ⇒ outside ⇒ the invalid arm | **PASS** — `t=20->arm0/resolve1 ; t=15->arm0/resolve1 ; t=14->arm1/resolve0 (boundary INSIDE at t=15)` |

---

## D. THE SCENARIOS — THE SEAMS' DECLARED DEGRADATIONS (`§2.4`)

| id | Clause(s) | Drive (`cmd`) | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **RL-G-08** | `§2.4` items 1/2/3/4, `§3.2 F-15`/`F-16`/`F-17`/`F-11`/`F-13`, `§5.5.1 P-RL-IM-1`/`P-RL-IM-2` | **fourteen** seam drives through a real gesture: `candidatesFor` **absent (the member omitted)** / non-callable `42` / throwing; `resolveTarget` absent / non-callable / throwing / `undefined`-returning; `onReveal` absent / non-callable / throwing; and an unusable `session` (omitted / `42` / `{}` / a throwing-trap `Proxy`) | **NEVER a throw** for the value-reading seams; absent `candidatesFor` ⇒ the arm with **`candidateCalls 0`**; a **non-callable** seam ⇒ the arm with **`candidateCalls 1`** (ATTEMPTED ≠ INVOKED, `§0A` note 15 `S4`); an unusable `resolveTarget` ⇒ the terminal writes **NOTHING** and is **not a cancel**; a throwing `onReveal` is **ABSORBED** (`revealWrites 1`, `revealWritesApplied 0`) and the sink still writes once; an unusable `session` ⇒ **VALID BUT INERT** (`attach false`, a `{ok:false,...}` refusal, `detach false`, zeroed counters) | **PASS** — all fourteen cells as declared, verbatim in the reading column: `absent candidatesFor -> arm, candidateCalls 0 ; non-callable candidatesFor -> arm, candidateCalls 1 (ATTEMPT) ; throwing candidatesFor absorbed -> arm ; resolveTarget absent/non-callable/throwing/undefined-returning -> 0 write, terminal still end ; onReveal absent -> revealWrites 0, applied 0, terminal still wrote the sink once ; onReveal non-callable 42 -> revealWrites 0, applied 0, … ; onReveal throwing -> revealWrites 1, applied 0, … ; unusable session {omitted,42,{},throwing-proxy} -> inert (attach false, refusal "no-gesture", zeroed stats)`. **The non-callable `onReveal` reading `0` is CONFIRMED as the contract's own intent — see `F-3` for the clause pair that makes it arguable** |
| **RL-G-09** | `§2.4` item 1's `threshold` row, `§2.2 P-8`, `§2.3` item 3 | six thresholds over the **same within-proximity** answer (`distance: 5`): absent, `42`, `'20'`, `NaN`, `-1`, `Infinity`; then a usable `20` | an **unusable** threshold ⇒ `withinProximity` answers `false` ⇒ **nothing is ever within proximity ⇒ the invalid arm**; **NO mechanism default exists**; a usable threshold with the same answer does **not** take the arm | **PASS** — `absent->resets0 42->resets0 '20'->resets1 NaN->resets1 -1->resets1 Infinity->resets0 ; usable(20) => resets 0`. **The five limb readings are EXACTLY the comparator's own rule applied to the field (`42` and `Infinity` ⇒ `withinProximity(5, 42)`/`(5, Infinity)` are `true`; `'20'`, `NaN`, `-1` ⇒ `false`) — so the seam's degradation and the pure export's table AGREE, clause for clause** |
| **RL-G-10** | `§2.4` item 4, `§3.2 F-7`/`F-8`, `§3.3 I-10` | a throwing `onPreview` at the observed-move turn; a throwing `commit` at the terminal turn | each **PROPAGATES** (the only two named exceptions to totality); the commit attempt is **counted and never retried** (`sinkCalls 1`, `written 0`); the per-gesture record is discarded by the throwing move (a later `reset` refuses) | **PASS** — `onPreview throw propagated at the move turn; later reset "no-gesture" ; commit throw propagated at the terminal; sinkCalls 1 / written 0` |
| **RL-G-20** | `§2.4` item 3, `§3.2 F-13`/`F-14`, `§5.5.1 P-RL-IM-5` | eleven candidate answers: the class-level invalid set (`undefined`/`null`/`42`/`'x'`/`true`/a function), **the LEGAL ARRAY** (`[{candidate, distance: 3}]`), **an ELEMENT-LEVEL invalid** (`[42]`), an ABSENT `candidate` with a within-proximity `distance`, an `EMPTY` array, and a **throwing `distance` accessor** | the legal array shape is **NOT** an invalid class (the target resolves); every class-level or field-level unusable answer ⇒ the arm with **no throw and never a default**; **an ABSENT `candidate` with a within-proximity `distance` IS within proximity — only the DISTANCE decides**; the **element-level invalid** answers the arm | **PASS** — `undefined->arm1/resolve0 ; null->arm1/resolve0 ; 42->arm1/resolve0 ; 'x'->arm1/resolve0 ; true->arm1/resolve0 ; function->arm1/resolve0 ; LEGAL array within proximity->arm0/resolve1 ; ELEMENT-LEVEL invalid [42] (the owed row)->arm1/resolve0 ; ABSENT candidate, within-proximity distance->arm0/resolve1 ; EMPTY array->arm1/resolve0 ; throwing distance accessor->arm1/resolve0`. **The `[42]` cell is `§0A` note 14 item 2(ii)'s OWED element-level row — driven here from the doc text even though the contract says no row of its own owns it** |

---

## E. THE SCENARIOS — THE DELEGATION RECORD, THE SINGLE-SINK RULE AND THE FACTORY'S TOTALITY

| id | Clause(s) | Drive (`cmd`) | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **RL-G-21** | `§2.3` item 9(a)/(d), `§2.1` item 7(c), `§2.1` item 6, `§2.5` item 1, `§3.1 M-8`/`M-13`, `§3.2 F-10`, `§5.5.1 P-RL-SM-8` | **the recording session double**: (a) establishment then an outside-proximity move (the arm); (b) `preDragValueOf` absent / non-callable `42` / throwing / **a throwing accessor**; (c) an explicit `reset(element)` while active; (d) a double that refuses `reset` with its own code | the `reset` delegation carries **ARITY 3** with the **captured handle** and the **caller's pre-drag value BY IDENTITY**; an unusable `preDragValueOf` takes **the SAME arm** with the third argument reading **`undefined`** (never a substituted or invented value, never a throw); the delegation list holds **`install`/`reset`/`dispose` only** and the read list stays inside `{stats, gesture, disposed}`; `reset(element)` never re-invokes the member; a refusal code comes back **byte-identically** | **PASS** — `arm delegation arity=3 handleIdentity=true valueIdentity=true ops=["install","reset"] reads=[] ; preDragValueOf ABSENT -> attach true, arm taken, arity 3, third arg UNDEFINED, resets 1, sink value(s)=[[null,null]] ; non-callable 42 -> same ; THROWING -> same ; THROWING ACCESSOR -> attach true, establishment clean, arm taken, third arg undefined ; explicit reset(element) -> {"ok":true,"code":"ok","committed":true}, member invocations unchanged at 1 ; refusal code propagates verbatim: {"ok":false,"code":"busy","committed":false}`. **`F-5` records the two readings in this cell that the contract does not pin** |
| **RL-G-22** | `§3.2 F-4`/`F-6`/`F-19`, ruling 6 / `E10-SINGLE-SINK-CHANNEL`, `§3.4 R-13`, `§5.5.1 P-RL-SM-2` | (1) a **slot-empty** composition (no `commit` member at all); (2) a **two-writer** composition (the consumer's own `onEnd` writes its own sink at the same terminal); (3) a consumer writing only from its own `onMove` | the **NO-WRITER** composition reads **`0` where `1` is required** (the row can FAIL — never a silent success); the **TWO-WRITER** composition reads **`2`** in the sink's own record while the module's own counter reads **`1`** — **the two readings DIVERGE**, which is what makes the row falsifiable; the module's own sink is called **only at the terminal** | **PASS** — `NO-WRITER: sinkCalls 0 where 1 is required (the row FAILS as declared), reveal 1 ; TWO-WRITER: sink record 2 vs stats().sinkCalls 1 (the DIVERGENCE is the falsifier) ; module own sink is called at the terminal only (0 before the release, 1 after)` |
| **RL-G-18** | `§2.4` item 4 (the total-member-read rule), `§3.2 F-11`/`F-12`, `§5.5.1 P-RL-TP-2` | `createRelocateSession(shape)` for `undefined`, `null`, `42`, `'x'`, a frozen `{}`, an array, **a record with a throwing `get session()`**, **a `Proxy` whose traps throw** — then **all four entry points** on each returned module | construction **NEVER throws**; every member answers its declared kind (`attach`/`detach` booleans, `reset` a `{ok, code, committed}` record, `stats()` the eleven fields) — **a refusal is a RECORD or a BOOLEAN, never a throw** | **PASS** — all eight shapes: `attach false`, `reset {ok:false, code:"no-gesture", committed:false}`, `detach false`, 11 stats fields, no throw. `undefined->{...} ; null->{...} ; 42->{...} ; 'x'->{...} ; frozen {}->{...} ; array->{...} ; throwing accessor->{...} ; throwing proxy->{...}` |
| **RL-G-24** | `§2.1`(b) (the EIGHT type declarations), `§3.4 R-5`(b), `§5.2` leg 4 | `tsc --noEmit --strict …` over a scratch probe that **imports all eight type names by name** from `relocate.js` and uses each (C-3) | a type-only name is ERASED at run time, so **PRESENCE is pinned at the type layer**: all eight import and compile | **PASS** — `TSC_EXIT=0` (`CandidateFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`, `RelocateOptions`, `RelocateSession`, `RelocateStats`, `RelocateTargetFor`) |

---

## F. THE FINDINGS — five records, NONE of them a converted FAIL

**A FAIL is a scenario whose measured outcome contradicts its clause. Every scenario above measured what its
clause declares, so `FAIL = 0`. The five records below are things I could NOT take as written, or places the
contract's own text does not settle the drive — reported rather than smoothed, per this artifact's rule.**

### `F-1` — **the "show again after a mid-drag hide" limb (`§3.1 M-7`'s move 3) CANNOT be re-driven through the session's own listener; the hide move is ALSO the invalid arm** *(doc/ambiguity finding — needs a contract sentence)*

* **Scenarios:** `RL-G-04` and `RL-G-05`.
* **Measured:** with the arm not yet taken, move 1 within proximity shows (`withinProximity: true`), move 2
  outside hides (`withinProximity: false`) — **and that same move takes the invalid arm (`resets 1`)**, whose
  `session.reset(...)` terminal **detaches the three tracking listeners**. The measured
  `releaseReachedHandler=false` and `secondMoveReachedHandler=false` are the consequence: **after the hide
  there is no `pointermove` handler left to observe a "show again".**
* **Why it is a finding:** `§2.3` item 5's clause **(2)** — and decision row
  `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`'s clause **(1)** — declares **one** trigger pair for the hide
  (*out of proximity* **OR** *retargeted to a different zone*), and `§3.1 M-7` drives the *out-of-proximity*
  form as its move 2 with **a further move 3 that shows again** and a `pointerup` at the end. Under the
  contract's own note 8 the out-of-proximity case **is** the invalid arm, taken from the module's own move
  turn — and a taken arm ends the gesture. So **`M-7`'s drive is satisfiable only if the out-of-proximity
  move does NOT take the arm**, which no clause says. **The two clauses cannot both be driven as written**;
  the composition can only exhibit the non-monotonicity across the **retarget** trigger (`RL-G-06`, which
  passes) — **not** across the *pulled-back-out* trigger.
* **VERDICT: `doc/spec ambiguity`** — the contract needs one sentence stating whether the mid-drag hide is
  observable **only while the gesture survives** (i.e. the re-show limb belongs to the **retarget** drive,
  and `M-7`'s moves 2→3 must be re-expressed as a retarget pair), or whether a *transient* out-of-proximity
  move must **not** take the arm. **Owner: the contract (`docs/specs/relocate.md` `§2.3` item 5 /
  `§3.1 M-7` / `§3.2 F-18`).** No module behaviour contradicts a clause here — **the module follows note 8**.

### `F-2` — **nothing is written by the later release, but the reason is stronger than the clause says: the release reaches NO handler at all** *(doc/ambiguity finding — a sharpening, not a defect)*

* **Scenarios:** `RL-G-02`, `RL-G-04`.
* **Measured:** `§3.1 M-8`'s row is satisfied verbatim — `sinkCalls` stays `1` after the release
  (`RL-G-02`), and a second outside move cannot re-take the arm (`RL-G-04`, `resets` stays `1`). But the
  **mechanism** is not "the session refuses the later terminal": `releaseHandlerStillAttached=false` shows
  the arm's own `reset` terminal **already detached the tracking listeners**, so the later `pointerup`
  reaches **no handler of the session's** at all — there is no call to refuse.
* **Why it is a finding:** the contract states the consequence (`§0A` note 8: *"a release-time arm would have
  nothing left to reset"*; `M-8`: *"the later `pointerup` commits NOTHING"*) but **never states that the
  arm's reset leaves the element with its start listener only**, which is what `docs/specs/gsession.md`
  `§2.3` item 2(c) makes inevitable. A reader can therefore write two very different drives for the same row
  — one that fires a `pointerup` that **reaches the session and is refused**, and one (the truthful one) in
  which the fire reaches nothing. **I drove the second and record it here.**
* **VERDICT: `doc/spec ambiguity` (LOW)** — one sentence in `§2.3` item 6(d) or `§3.1 M-8` would close it.
  **Owner: the contract.** The module's behaviour matches the frozen session's own contract.

### `F-3` — **`§2.1`(b)'s `revealWrites` comment reads "INCLUDING one that threw" where `§3.2 F-17` declares a NON-CALLABLE `onReveal` reads `0`** *(doc/spec drift inside the contract — an internal wording conflict)*

* **Scenario:** `RL-G-08` (the `onReveal` non-callable cell).
* **Measured:** `onReveal: 42` ⇒ **`revealWrites 0`** and `revealWritesApplied 0`; `onReveal: <throwing fn>` ⇒
  **`revealWrites 1`**, `revealWritesApplied 0`, and the sink still writes once.
* **Why it is a finding:** **the module measures `0` for the non-callable case**, which is what `§3.2 F-17`
  says in its own words (*"omitted/non-callable ⇒ the write attempt is made and there is nothing to invoke:
  `revealWrites` counts the ATTEMPT only where a callable was present"*), and what `§2.4` item 1's `onReveal`
  row says (*"a ZERO-EFFECT attempt"*). **But `§2.1`'s `RelocateStats.revealWrites` member comment declares
  the counter differently**: *"DURABLE REVEAL WRITES ATTEMPTED — every invocation of `onReveal`, INCLUDING
  one that threw."* A reader taking that sentence alone would expect `1` for a non-callable seam (an
  "invocation" of a non-callable member), and the `S4` ATTEMPTED-versus-INVOKED split that `§0A` note 15
  pinned **for `candidatesFor`** is never restated for `onReveal`. **The module answers `F-17`; the drift is
  in `§2.1`'s member comment.**
* **VERDICT: `doc/spec drift` (internal, LOW) — the module is RIGHT per `F-17`/`§2.4`.** **Owner: the
  contract** (one clause in the `revealWrites` member comment saying the counter counts ATTEMPTS **where a
  callable was present**). No host change is implied.

### `F-4` — **the invalid arm's sink call carries `gesture.outcome === null` and value `undefined` when the pre-drag member is unusable** *(doc/ambiguity finding — a hole in the declared reading)*

* **Scenario:** `RL-G-21`(b) (on the double, where the delegation's third argument is visible directly).
* **Measured:** with `preDragValueOf` **absent**, **non-callable** or **throwing**, the third argument of
  `session.reset(element, handle, value)` reads **`undefined`** — **exactly as `§2.1` item 7(c) declares**
  ("no default, no sentinel, no invented value") — and my recording sink then observes the terminal's own
  commit as **`outcome: null`, `value: undefined`**.
* **Why it is a finding:** the `outcome: null` reading is the **DOUBLE's** artefact (the handle I hand the
  module in a double never has its `outcome` set, because I own the terminal), **not a module answer** —
  but the contract never says what the module's `'reset'`-arm sink sees when the third argument is
  `undefined`, nor whether the module's own `gesture.outcome` discriminator ("the `'end'`-vs-`'reset'`
  discriminator", `§2.1`'s `CommitSink`, `§2.5` item 6(b)) is even readable on the degraded arm. **On the REAL
  session the `'reset'` outcome IS set** (`RL-G-02` measured `sink=["reset":777]`), so the composition is
  fine; the finding is that **`§2.1` item 7(c)'s four clauses describe the third argument's reading and
  never the terminal discriminator's**.
* **VERDICT: `doc/spec ambiguity` (LOW)** — the contract should state that the arm's outcome discriminator is
  the session's own and is unaffected by the pre-drag refusal. **Owner: the contract.**

### `F-5` — **the exported `RelocateResetResult` type is used but NOT in the census's eight type names** *(doc/spec drift)*

* **Scenarios:** `RL-G-15` (the runtime half), `RL-G-24` (the type half).
* **Measured:** `§2.1`'s `RelocateSession.reset` member is declared as
  `reset(element: unknown): RelocateResetResult` — **a type name that appears ONCE in the whole contract and
  is NOT one of the EIGHT type declarations** (`CandidateFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`,
  `RelocateOptions`, `RelocateSession`, `RelocateStats`, `RelocateTargetFor`, `§3.4 R-5`(b)). Its shape is
  given inline (`{ok: boolean, code: string, committed: boolean}`) — but a name that is used and not
  declared is either an **unexported local** or an **undeclared export**.
* **Why it is a finding:** `§3.4 R-5`(b) makes the type half of the census a **PRESENCE claim pinned by
  name**, and a reader cannot decide whether `RelocateResetResult` should be **importable** (making the census
  `2 + 9 = 11` — which `§2.1` forbids) or **module-local**. I therefore imported only the **eight declared
  names** (`RL-G-24`, exit `0`) and did **not** test `RelocateResetResult` — testing it would require reading
  the module's type surface, which this pass may not do.
* **VERDICT: `doc/spec drift` (LOW)** — the census should either declare the ninth name or state that the
  reset record's type is deliberately local. **Owner: the contract, not the module.**
* **⟶ CLOSED 2026-09-27 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW — the as-filed finding above is KEPT
  VISIBLE, as this set's convention requires).** **THE LANDED MODULE ANSWERS IT, AND THE ANSWER IS THE
  SECOND OF THE TWO READINGS THIS FINDING NAMED: `RelocateResetResult` is a MODULE-LOCAL, NON-EXPORTED
  type.** **MEASURED THIS PASS, read-only, in `src/shared/relocate.ts`: the interface is declared at
  `interface RelocateResetResult` — NO `export` keyword — and the file's export statements are EXACTLY
  the ten the census names (`export function withinProximity`, `export function
  createRelocateSession`, and the eight `export interface`/`export type` declarations); the name is
  referenced only at the module's own `RelocateSession.reset` member declaration and at its own internal
  `resetEntry` helper, so it is USED and NOT DECLARED-AS-EXPORTED.** **THEREFORE THE CENSUS STANDS AT
  `2 + 8 = 10` NAMES — the `2 + 9 = 11` reading is NOT taken — and `RL-G-24`'s eight-name import list was
  the correct drive: a fork reads the reset record's shape STRUCTURALLY (`{ok, code, committed}`) and
  cannot import the name.** **NO CENSUS TERM MOVED, NO ROW MOVED, and this annotation claims no leg: it
  reads the module's own bytes and the contract's own `§2.1`(b) block.**

---

## G. THE REGISTER — THE PROPERTY TEXTS I COULD DRIVE, AND WHAT I COULD NOT

The `§5.5.1` register's rows are claims about the unit's **typed property set**, and the row texts are
contract text a blind pass may drive. Each row below was driven over **my own independently chosen inputs**
(never the red set's tables), and **the declared TERM is a DRIVE COUNT** (`A DECLARED REGISTER TERM IS A
DRIVE COUNT`), so a shorter drive set is recorded as such.

| id | Register row | Driven where | Result |
| --- | --- | --- | --- |
| — | **`P-RL-IM-1`** (the `candidatesFor` call-count/arm quantification) | `RL-G-08` (4 seam shapes × the observable paths I drove), `RL-G-04` | **property text PASS** on every cell I drove (absent ⇒ 0 attempts; non-callable/throwing ⇒ 1 attempt + the arm; at most once per observed move) |
| — | **`P-RL-IM-2`** (the resolve policy) | `RL-G-08`, `RL-G-20` | **PASS** — the target is resolved per move, only within proximity; an unusable seam writes nothing and is still `'end'` |
| — | **`P-RL-IM-3`** (the comparator's two halves) | `RL-G-07`, `RL-G-23` | **PASS** — (3a) all 30 declared cells, notes 16/17 included; (3b) the threshold's no-default clause **by the same answer driven at three thresholds** |
| — | **`P-RL-IM-4`** (the seam set is frozen at seven) | `RL-G-08`'s **absent form** (a SEPARATE composition, exactly `§0A` note 13 item 3's pin) | **PASS** in the only form a blind pass may assert it: the absent member is **omitted** from the options record, and the composition still behaves as declared |
| — | **`P-RL-IM-5`** (the `distance` field's read and degradation) | `RL-G-20` (11 answer shapes), `RL-G-09` | **PASS** — every unusable field ⇒ the arm, no throw; **the `±Infinity` field cells take the arm at the FIELD layer while the pure export reaches the comparison verbatim**, which is exactly the two-layer split `§0A` note 17(c) pins and item (f) reports as under-specified |
| — | **`P-RL-SM-1`** (the reveal's declared terminal domain `{'end'}`) | `RL-G-01`, `RL-G-05`, `RL-G-14` | **PASS** — 1 reveal at `'end'`; **0** on the `'reset'` arm and **0** on a `cancel`; 5 within-proximity moves still read 1 |
| — | **`P-RL-SM-2`** (the channel split / single writer) | `RL-G-22` | **PASS** — the no-writer and two-writer controls produce the declared divergences |
| — | **`P-RL-SM-3`** (`onReveal` only from the commit seam) | `RL-G-17` (the turn order), `RL-G-01` | **PASS** on the observable half — the reveal lands at the terminal, after the consumer's `onMove`, and never from establishment or a move |
| — | **`P-RL-SM-4`** (one capture point, no retention) | `RL-G-03`, `RL-G-11`, `RL-G-21` | **PASS** — the 0/1/1 stages, the two-gesture re-read, and the discarded record (`'no-gesture'` afterwards) |
| — | **`P-RL-SM-5`** (the reset path's write form, by CHANNEL) | `RL-G-02`, `RL-G-05` | **PASS** — `revealWrites 0`, the revert carried by the **per-move** channel, `sinkCalls 1` with the pre-drag value |
| — | **`P-RL-SM-6`** (the per-move channel's show/hide transitions + the retarget) | `RL-G-05`, `RL-G-06` | **PASS on the retarget drive**; the pull-back-out drive is `F-1` |
| — | **`P-RL-SM-7`** (the invalid placement arm) | `RL-G-02`, `RL-G-04`, `RL-G-21` | **PASS** — the arm lands **during the drag**, at most once, arity 3, later release writes nothing |
| — | **`P-RL-SM-8`** (the code propagation) | `RL-G-12`, `RL-G-21`(d) | **PASS** — the double's own `'busy'` string comes back byte-identically; the module-local `'no-gesture'` readings are the session's own |
| — | **`P-RL-TP-1`** (the seven-seam totality universal) | `RL-G-08`, `RL-G-10`, `RL-G-18` | **PASS within the bound I drove** — no method threw for any seam shape I supplied, and the **two named propagations** (`commit`, `onPreview`) are the only throws I ever observed |
| — | **`P-RL-TP-2`** (declared shapes over hostile arguments) | `RL-G-18`, `RL-G-19` | **PASS** — 8 hostile factory shapes × 4 entry points, and 361 comparator pairs, all declared shapes |

**What I could NOT audit (recorded, never a pass):** the register's **declared-vs-distinct term arithmetic**,
its **strategy ids**, the **`170` attempt total** and the **caps** are claims about **the red set's own
tables** — the one file a blind pass must not read (`RL-G-N2`). The **property TEXTS** above were driven
independently; the tables were not audited.

---

## H. `NOT-BLIND-RUNNABLE` — four rows this pass structurally could not take (never a PASS)

| id | Row | Structural reason |
| --- | --- | --- |
| **RL-G-N1** | `§3.4 R-1`/`R-2`/`R-3`/`R-11`/`R-14`/`R-15`'s **static halves** — the vocabulary census, the forbidden-access scan, the event-wiring scan, the UI-content-write scan, the session-call census and the code-literal census over the module's bytes | **a SOURCE-TEXT scan**: taking it requires reading `src/shared/relocate.ts`, which this blind pass is forbidden to read. The **runtime halves** of `R-3`/`R-7`/`R-10`/`R-14`/`R-15` **were** driven (`RL-G-01`, `RL-G-11`, `RL-G-12`, `RL-G-21`, `RL-G-22`) |
| **RL-G-N2** | `§5.5.1`'s tables — the declared-vs-distinct arithmetic, the strategy ids, the `170`-attempt total, the caps and the `(bounded)` set | **the claim is about the RED SET's tables** (`tests/relocate.test.ts`), the one file a blind pass must not read. The property **texts** were driven (`§G`); the **tables were not audited** |
| **RL-G-N3** | `§5.2` leg 5 (`npm run ui`) and any **rendered-geometry** claim — the zone *visibly* expanded, the ghost *visibly* placed | **a real-Electron window with a `DISPLAY`**; no window was booted and no `DISPLAY` was used. `§3.3 I-15` **refuses** a `[U]` row for this unit and `§5.2` offers none — **and this pass claims none** (`I-11`) |
| **RL-G-N4** | `§3.5 X-1`'s **green form** — *"`src/shared/relocate.ts` is imported by NO `src/**` file"* (`§3.4 R-6`/`R-12`'s companion claim) | **an import-graph probe over `src/**`**: determining it without reading `src/**` is a grep over implementation files, which this pass declines. **NOT RUN.** (The **export census** half of `X-1` **was** driven: `RL-G-15` and `RL-G-24`) |

**Nothing in this list is counted as a pass, and no row was re-scoped to make it runnable.**

---

## I. WHAT THIS GREENS SET DOES **NOT** PROVE — the honest-limits block

1. **No rendered fact of any kind.** No Electron window was booted, no `DISPLAY` was used, and `npm run ui`
   was **not** run. The zone *visibly* expanding, the ghost *visibly* previewing and the *visible* revert are
   **geometry**, and this unit's own contract refuses a `[U]` row for them (`§3.3 I-15`, `§5.2`, `I-11`).
   **What is proven is the DECISION TABLE and the CALL CADENCE, nothing about how anything looks.**
2. **The element is a stand-in, and so is the source.** Every drive hands the module a plain object as the
   element and a **recording event source** implementing the documented `EventSource` shape; the real
   session is the landed one, but **no real DOM element and no real pointer** was involved. The element is an
   **opaque argument** by contract (`§0A` note 5), so no scenario here depends on its identity beyond
   `to-be` comparisons the contract itself requires.
3. **The distance and the threshold are MY numbers.** The proximity inputs (`distance`, `threshold`) are
   caller-supplied scalars by contract (`§2.1` item 2, `§0A` note 2) — nothing in this artifact measures a
   real distance or a real zone, and **`§3.3 I-11` forbids any such claim**.
4. **The session double's own fidelity.** `RL-G-21`'s double is **my construction** from `docs/specs/gsession.md`
   `§2.5`'s delegate list: it exposes the six members the module may read/call, its `ops`/`reads` lists are
   separate, and its `reset` runs the terminal path the landed session runs. **It is a stand-in, not the
   frozen session** — the scenarios that depend on the REAL session's behaviour (`RL-G-01`..`RL-G-14`,
   `RL-G-17`, `RL-G-18`, `RL-G-20`, `RL-G-22`, `RL-G-23`) do **not** use it. **One harness defect of my own
   was found and fixed during the round and is recorded for honesty:** my first double was built with
   `Object.assign({}, d)`, which copies a method's **reference** while its closure still points at the
   original object — the module then correctly declined the double (**no `session.install` call**) and
   `RL-G-21` failed. That was **my harness error, not a module reading**, and the failing reading is **not**
   reported as a finding. (A second probe confirmed the same class: a double whose members are reachable
   only through an inherited prototype chain is likewise not usable by the module.)
5. **The type half is a PRESENCE claim, not an `EXACTLY` claim.** `RL-G-24` proves the eight declared names
   **import and compile**; it does **not** prove the module exports *exactly* eight type names — a type-only
   name is erased at run time and an `EXACTLY` over an erased set is not falsifiable at the type layer
   (`§3.4 R-5`(b) says so itself). `F-5` records the one name this matters for.
6. **The register's tables, the static token censuses and the import-graph claim were not taken** (`§H`).
7. **This artifact is not a DONE row and claims no gate beyond its own.** It reports what a **blind** reader
   could derive from the documentation and measure against the landed module.

---

## J. THE ONE-LINE HONESTY STATEMENT, AND THE REPO-SCOPE CHECK

**Every scenario above was authored from `docs/specs/relocate.md` + `relocate-review.md` +
`docs/decisions.md` + `docs/specs/gsession.md` + `gutter.md`/`gutter-ui.md` alone and RUN — `23` executed
scenarios: `23` PASS / `0` FAIL, plus the type-layer scenario `RL-G-24` (PASS) and `4` recorded
`NOT-BLIND-RUNNABLE` rows — the module was reached only through its documented exported surface (plus the
two hooks/pre-drag channels the contract declares), and **`src/shared/relocate.ts` and `tests/relocate.test.ts`
were NEVER READ by this pass.**

**REPO SCOPE:** `git status --porcelain` at the start of this pass → **EMPTY**; at the end → **exactly one
new untracked file, `docs/specs/relocate-greens.md`** (this artifact). **Every scratch artifact of the run
lives outside the repo** (`/tmp/reloc-greens/{run.ts,run.mjs,type-half.ts,run-output.txt,typecheck*.txt,
npm-test.txt,build.txt}`), **no temporary file was placed inside the repo and therefore none had to be
deleted**, and the four read-only legs (`npm test`, `npm run typecheck`, `npm run typecheck:tests`,
`npm run build`) were the only repo commands run.

**`POST-GREEN` NOTE:** this artifact was authored and run at **`c75969f`**, **after** the Implementer's green
and **before** any later pass (gate 4's adversarial/PBT audit, any doc review, any re-grain or any fix) has
changed the module. **If `src/shared/relocate.ts` moves, every reading above is stale and the affected
scenarios must be re-driven** — the three comparator-sensitive rows (`RL-G-07`, `RL-G-19`, `RL-G-23`) and the
arm rows (`RL-G-02`, `RL-G-04`, `RL-G-21`) first.

---

# K. ⟶ THE TARGETED RE-DRIVE — RUN 2026-09-27 at `0984d41` (APPENDED; nothing above is deleted, moved or re-scoped)

**THIS BLOCK IS AN APPEND.** **Every scenario above, every reading above and every `F-1`..`F-5` record above
STANDS AS THE ORIGINAL `c75969f` PASS'S OWN MEASUREMENT** and is **not** rewritten, weakened or re-labelled.
**This section is the re-drive the original `POST-GREEN` note (and `§3c.3`'s closing paragraph) required, and
the findings series continues in the same set: `F-6`..`F-8`.**

## K.1 Why the re-drive, and what changed

**The trigger, quoted from the record.** `docs/specs/relocate.md` `§3c.3`'s closing paragraph: *"a later pass
that changes the module owes a TARGETED RE-DRIVE — not a new set — RECORDED IN THAT SET (an appended block
naming the revision, the changed behaviour, and the scenarios re-run with their readings)"*, and *"`ADV-RL-1`
and `ADV-RL-7` … EACH OWE ONE: a consumer-driven-`reset` re-drive and a read-counting-accessor re-drive
respectively."*

**THE COMMIT.** `git rev-parse --short HEAD` → **`0984d41`** (`E4 GATE-4 HOST FIXES GREEN — THE ARM'S DECLARED
SHAPE, THE SINGLE FIELD READ AND attach's EXACT-FALSE CLASS`), **three behavioural changes after the greens
set's revision, all in `src/shared/relocate.ts` (701 → 741 lines)**:

| # | Finding | What the module now does (per the commit record and the pins) | The scenarios it can move |
| --- | --- | --- | --- |
| **(1)** | **`ADV-RL-1`** — the CONSUMER-DRIVEN invalid arm | `reset(element)` now **refuses on the session's own precedence FIRST**, then **arms the module's invalid-arm path and increments `stats().resets` BEFORE delegating with arity three**, so the session's `'reset'` terminal runs the **ARM** branch (the one sink write of the caller-supplied pre-drag value, ZERO reveals). `armed` is set only on an ACCEPTED entry, so an arm already taken is **sticky**. | `RL-G-21`(c) (now re-driven as `RL-G-26`), and NEW `RL-G-26` |
| **(2)** | **`ADV-RL-7`** — the `distance` field read ONCE | the candidate's `distance` is read once into a local; both the usability class and the comparison consume that one local (no re-read, no repair, no default) | NEW `RL-G-27`, `RL-G-20`/`RL-G-09` (field degradation) |
| **(3)** | **`ADV-RL-12`** — `attach`'s failure class is EXACTLY `false` | every return other than the boolean `false` — including `undefined` and `null` — is INSTALL SUCCESS | NEW `RL-G-25` |
| **(4)** | **NOT changed, per `§3d` pin 3** | the `detached` reading stays a **FACTORY-TIME SNAPSHOT** (the CLAUSE owed the correction, not the module) | NEW `RL-G-30` |
| **(5)** | **NOT changed, per `§3d` pin 6** | a second distinct `attach` **wedges `detach`** — DECLARED behaviour | none of this set's scenarios |

## K.2 What was re-run, and what was left

| | |
| --- | --- |
| **RE-RUN, verbatim, all `23`** | `RL-G-01` .. `RL-G-23` — **the whole set, no scenario left out.** The three comparator rows (`RL-G-07` · `RL-G-19` · `RL-G-23`), the arm rows (`RL-G-02` · `RL-G-04` · `RL-G-21`), the terminal/write rows (`RL-G-01` · `RL-G-14` · `RL-G-22`), the retarget/content rows (`RL-G-05` · `RL-G-06`) and the remaining seam/refusal/retention/census rows were **all** driven against the current module. |
| **NOT RE-RUN** | **Nothing in the executed set.** The four `NOT-BLIND-RUNNABLE` rows (`RL-G-N1`..`RL-G-N4`) are **unchanged and still NOT passes** — `RL-G-N1`/`RL-G-N4` are source-text/import-graph probes this blind pass may not take, `RL-G-N2` is the red set's own tables, and `RL-G-N3` (`§5.2` leg 5 / any rendered-geometry claim) needs an Electron window with a `DISPLAY`. |
| **ADDED (7)** | `RL-G-25` (`attach`'s exactly-`false` class) · `RL-G-26` (the consumer-driven arm) · `RL-G-27` (the read-once pin) · `RL-G-28` (the three preview shapes + the retarget CONTENT) · `RL-G-29` (`onReveal`'s second argument + the no-target control) · `RL-G-30` (`ADV-RL-10`'s snapshot pin) · `RL-G-31` (`ADV-RL-9`'s post-arm recovery — **THE ONE FAIL**). |
| **NOT ADDED, deliberately** | the static token/import/call-site censuses (`§3.4 R-1`..`R-15`'s source-text halves), the register's own tables, the `[U]` geometry claims, and `M-18`'s second-distinct-attach wedge (the contract appends that row to the RED set; driving it here would duplicate a red-set row without the `§3d` pin's own controls — **recorded as a limit, not a claim**). |

## K.3 The PRE-/POST-READING TABLE — one row per affected scenario

**"PRE" is the reading recorded in `§B`..`§E` of this set at `c75969f`; "POST" is the reading measured now.**
**A reading that CHANGED is the point of the re-drive and is marked `⟶ CHANGED`; a reading that did not is
marked `unchanged`.** *(This pass is a DIFFERENT agent run against a different revision; "unchanged" is a
comparison of the two recorded readings, each measured with the same driver shape.)*

| id | PRE (`c75969f`) | POST (`0984d41`) | Verdict against its clause |
| --- | --- | --- | --- |
| **`RL-G-01`** | `reveal=1/1 sink=1 moves=5 candidateCalls=5 outcome="end" hooks=[onStart,onMove×5,onEnd] preDragCalls=1` | **identical, character for character** | **unchanged — matches `M-5`/`M-9`/`M-3`** |
| **`RL-G-02`** | `resets(≈during drag)=1 sink=["reset":777] reveals=0 sinkCalls=1 sessionSink=1 preview=1 lastCode=ok releaseHandlerStillAttached=false` | **identical, plus the explicit `(false = the arm's own reset terminal already detached the tracking listeners, so the later pointerup reaches NO handler)`** | **unchanged — matches `M-8`/`M-14`; confirms `F-2`'s mechanism** |
| **`RL-G-03`** | `stages 0/1/1` | **identical** | **unchanged — matches `M-12`** |
| **`RL-G-04`** | `resets=1 sinkCalls 1/1 moves=1 candidateCalls=1 preview=1 releaseReachedHandler=false secondMoveReachedHandler=false` | **identical** | **unchanged — matches `M-8`; `F-2` stands** |
| **`RL-G-05`** | `previews 1/2 = [true,false] … reveals=0` | **identical** | **unchanged — `F-1` stands** |
| **`RL-G-06`** | `moves=2 previews=2 (ONE per turn) revealWrites=1 state1={"withinProximity":true,"shown":{A}} state2={"withinProximity":true,"shown":{B},"hidden":{A}} candidateIdentityHeld=true revealTargetIsTheResolvedObject=true` | **identical** (an in-probe control that rebuilt its candidate objects per call read `identity=false`, **a HARNESS artefact of the probe, never a module answer**; with STABLE candidates the identity readings hold — see `RL-G-28`) | **unchanged — matches `M-11`/`I-4`; the CONTENT half is now asserted in `RL-G-28`** |
| **`RL-G-07`** | `30 pairs, all as declared; no throw; frozen non-number operand accepted; total (boolean)` | **identical** | **unchanged — matches notes 16/17, `M-2`, `P-RL-IM-3`** |
| **`RL-G-08`** | all fourteen seam cells as declared | **identical, verbatim** (including the two `F-3` cells: non-callable `onReveal` ⇒ `revealWrites 0`; throwing `onReveal` ⇒ `revealWrites 1`) | **unchanged — `F-3` stands** (the `§3c.3` disposition pinned the `F-17` reading the module answers) |
| **`RL-G-09`** | `absent→0 42→0 '20'→1 NaN→1 -1→1 Infinity→0 ; usable(20)→0` | **identical** | **unchanged — matches `§2.4` item 1 / `P-RL-IM-3`(3b)** |
| **`RL-G-10`** | `onPreview throw propagated; later reset "no-gesture" ; commit throw propagated; sinkCalls 1 / written 0` | **identical** | **unchanged — matches `F-7`/`F-8`/`I-10`** |
| **`RL-G-11`** | `sink gesture1=1 gesture2=2 resets2nd=1 preDragReads=2 detach=true/false attachAfterDetach=false install-off(dispose) count=1` | **identical** | **unchanged — matches `M-10`/`M-16`/`I-9`** |
| **`RL-G-12`** | `no-gesture / no-gesture / repeat attach false, one install / no-gesture` | **identical, verbatim** | **unchanged — matches `F-10`/`F-11`/`I-14`. `3d`'s `ADV-RL-1` FIX DID NOT MOVE THIS ROW: `detached` still reads `false` (a post-construction disposal is not observed) and the refusal still reads `no-gesture`, exactly as `§3d` pin `ADV-RL-10` declares — see `RL-G-30`** |
| **`RL-G-13`** | `onStart=1 onMove=1 onEnd=1 onCancel=0; handle id=1 outcome="end"` | **identical** | **unchanged — matches `M-17`/`I-5`** |
| **`RL-G-14`** | `revealWrites=0 sinkCalls=0 written=0 resets=0 sessionCommits=0` | **identical** | **unchanged — matches `M-4`/`F-9`** |
| **`RL-G-15`** | `namespace=[createRelocateSession,withinProximity] members=[attach,detach,detached,reset,stats]` | **identical** | **unchanged — matches `R-5`(a)/`I-15`; `F-5` stands** |
| **`RL-G-16`** | `keys(11)=[…] lastCode="ok"; all counters 0` | **identical** | **unchanged — matches `M-15`** |
| **`RL-G-17`** | `order=[capture,consumerOnStart,resolveTarget,onPreview,consumerOnMove,onReveal,commit,consumerOnEnd]` | **identical** | **unchanged — matches the pinned turn order (`§0A` note 13 item 7, `M-3`)** |
| **`RL-G-18`** | all eight hostile factory shapes: `attach false`, `reset {ok:false,code:"no-gesture",committed:false}`, `detach false`, 11 stats fields, no throw | **identical** | **unchanged — matches `F-11`/`F-12`/`P-RL-TP-2`** |
| **`RL-G-19`** | `361 pairs, all boolean, all stable, no throw, frozen operands accepted` | **identical** | **unchanged — matches `I-1`/`P-RL-TP-2`** |
| **`RL-G-20`** | eleven candidate answers, incl. `[42] → arm`, the LEGAL array, the absent `candidate`, the empty array and the throwing accessor | **identical** | **unchanged — matches `F-13`(b)/`F-14`/`P-RL-IM-5`; the FIELD layer is unmoved by `ADV-RL-7`, whose change is the READ COUNT (NEW `RL-G-27`)** |
| **`RL-G-21`** | `arm delegation arity=3 handleIdentity=true valueIdentity=true ops=[install,reset] reads=[] ; … explicit reset(element) -> {"ok":true,"code":"ok","committed":true}, member invocations unchanged at 1 ; refusal code propagates verbatim: {"ok":false,"code":"busy","committed":false}` | **identical, character for character** | **unchanged. THE `ADV-RL-1` `⟶ CHANGED` READING IS NOT IN THIS ROW: this row drives the arm through the DOUBLE, whose `reset` answer is a fixed `{ok:true,code:'ok',committed:true}` and **whose terminal reaches NO module sink** — so its `sink value(s)=[[null,null]]` reading is the DOUBLE's record of a consumer-written sink call, exactly what `F-4` recorded as *"the DOUBLE's artefact, not a module answer"* (see `F-6`). The consumer-driven arm's DECLARED SHAPE is measured on the REAL session in `RL-G-26`.** |
| **`RL-G-22`** | `NO-WRITER: sinkCalls 0 where 1 is required … ; TWO-WRITER: sink record 2 vs stats().sinkCalls 1 ; module own sink called at the terminal only (0 → 1)` | **identical** | **unchanged — matches `F-4`/`F-6`/`R-13`/`P-RL-SM-2`** |
| **`RL-G-23`** | `t=20→arm0/resolve1 ; t=15→arm0/resolve1 ; t=14→arm1/resolve0` | **identical** | **unchanged — matches the threshold's no-default clause** |
| **`RL-G-25`** *(NEW)* | — (no PRE) | `false→attach false/attached 0 ; undefined/null/0/''/NaN/0n/[]/{}/'no'→attach true/attached 1 (×9) ; THROWING install→attach false/attached 0` | **PASS — MATCHES `§3d` pin `ADV-RL-12` EXACTLY.** `undefined`/`null` are **INSTALL SUCCESS**, the falsy non-boolean controls (`0`, `''`, `NaN`, `0n`) are **SUCCESS** (the class the pin called out), the literal `false` is the **only** refusal, and a `throw` stays the module's own absorbed refusal. |
| **`RL-G-26`** *(NEW)* | — (no PRE) | `(a) reset(el) on a LIVE gesture → {"ok":true,"code":"ok","committed":true} resets=1 revealWrites=0 sinkCalls=1 sink=[reset:preDragByIdentity] consumerReveals=0 ; (b) an OUT-of-proximity move then reset(el) → the MOVE took the arm (resets 1, sink 1, value by identity), the consumer entry refuses {"ok":false,"code":"no-gesture"} ; (c) two consumer entries → r1 ok, r2 no-gesture, resets=1 sinkCalls=1 (STICKY) ; (d) precedence: no gesture → no-gesture (resets 0, ZERO sink writes) ; after an end terminal → no-gesture` | **PASS — MATCHES `§3c`'s `ADV-RL-1` disposition and `§3d`, clause for clause:** exactly ONE sink write carrying the caller's pre-drag value **by identity**, **ZERO** reveals, `resets === 1`, and the session's **own precedence first** (`no-gesture` with **zero delegations** when there is no gesture, so nothing is committed on a refusal), with an **already-taken arm STICKY**. **THIS IS THE READING THAT `ADV-RL-1` CHANGED — it is a NEW scenario precisely because the old set's `RL-G-21`(c) drove the entry point through a double whose terminal reaches no module sink, and so could not have measured it.** |
| **`RL-G-27`** *(NEW)* | — (no PRE) | `read-counting accessor: after1move=1 after2moves=2 afterTheRelease=2 (never re-read) ; OUT-then-IN candidates in ONE move: readsA=1 readsB=1, resets=0` | **PASS — MATCHES `§2.1`'s `CandidateFor` ("ONE total member-read") and `P-RL-IM-5`. THE `ADV-RL-7` `⟶ CHANGED` READING: the pin's own counterexample (`§3c.2` item 3) now reads `1` per candidate per move, where the pre-fix module's double read made the row non-deterministic under a varying getter.** |
| **`RL-G-28`** *(NEW)* | — (no PRE) | `SHOW keys=withinProximity/shown/hidden shownIsA=true ; RETARGET keys=withinProximity/shown/hidden shownIsB=true hiddenIsA=true ONE-invocation-in-ONE-turn=true ; HIDE keys=withinProximity/shown shown=undefined hiddenAbsent=true` | **PASS on the substance, with `F-8` recorded on the key SET.** The **retarget CONTENT assertion the pin licenses is MEASURED, not assumed**: `hidden === A` and `shown === B` **by identity, on the SAME invocation, in ONE observed-move turn** (`M-11`'s *"carries BOTH"* is now assertable), the module emits **no fourth member**, and the **HIDE** shape is `{withinProximity:false, shown:undefined}`. **The SHOW shape carries THREE keys with `hidden` PRESENT as `undefined` where the pin declares `hidden` ABSENT — see `F-8`.** |
| **`RL-G-29`** *(NEW)* | — (no PRE) | `decisionIsTarget=true sinkEndValueIsTarget=true (revealWrites 1, sinkCalls 1) ; control (no resolved target): sinkCalls=0 revealWrites=0 lastCode="ok"` | **PASS — MATCHES `§3d` pin `ADV-RL-2`'s second half:** `onReveal(target, decision)`'s **second argument IS the resolved target** (`toBe` the caller's own answer), the module's own sink carries the **same** value by identity in the same committing turn, and the control reads the declared `sinkCalls 0` / `revealWrites 0` **while still reading an `'end'`**. |
| **`RL-G-30`** *(NEW)* | — (no PRE) | `factory-time disposed: detached=true attach=false reset={"ok":false,"code":"disposed"} ; post-construction disposal: detached=false reset={"ok":false,"code":"no-gesture"}` | **PASS — MATCHES `§3d` pin `ADV-RL-10` (the FACTORY-TIME SNAPSHOT) and `P-RL-SM-8`'s factory-time-only `'disposed'` cell.** A disposal performed **after** construction is **not observed** (`detached` stays `false`) and the refusal precedence stays as read — **the pin's own declared consequence.** |
| **`RL-G-31`** *(NEW)* | — (no PRE) | **FAIL** — `listenersAtArm=["pointerdown"] listenersAfterThePostArmMove=["pointerdown"] armTakenAtMove2={resets:1,sinkCalls:1,valueByPreDragIdentity:true} previewsAtArm=2 POST-ARM move reached=false previewsAfterThePostArmMove=2 POST-ARM release reached=false final={resets:1,revealWrites:0,sinkCalls:1,moves:2} consumerReveals=0` | **FAIL AGAINST `§3d` PIN `ADV-RL-9` — a `doc/spec CONTRADICTION`, recorded as `F-7` (the clause is named; the module's own arm behaviour measured CONFORMANT, so the clause is the side that cannot hold). The positive control (`release reached=true sink=["end"] revealWrites=1` on the same driver with NO arm) proves the row cannot pass vacuously.** |

**NET: `22` readings unchanged, `0` of the original `23` changed, `7` added (`6` PASS / `1` FAIL).** **No
original reading changed — because the three host fixes touched behaviour the original set either did not
reach (`ADV-RL-1`'s consumer entry point, `ADV-RL-7`'s read COUNT, `ADV-RL-12`'s non-boolean install
returns) or reached only through a harness that could not observe it.**

## K.4 THE COMMANDS, with their exit codes (this is the whole re-drive)

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **R-1** | `./node_modules/.bin/esbuild /tmp/reloc-greens/run.ts --bundle --platform=node --format=esm --outfile=/tmp/reloc-greens/rerun-at-0984d41.mjs` (the ORIGINAL driver, UNCHANGED) | **0** | the baseline bundle |
| **R-2** | `node /tmp/reloc-greens/rerun-at-0984d41.mjs` | **0** | **the ORIGINAL `23` scenarios re-run verbatim: `23` PASS / `0` FAIL** — output at `/tmp/reloc-greens/rerun-output.txt` |
| **R-3** | `./node_modules/.bin/esbuild /tmp/reloc-greens2/redrive.ts --bundle --platform=node --format=esm --outfile=/tmp/reloc-greens2/redrive.mjs` | **0** | the re-drive bundle: **the `23` original scenarios byte-identical to R-1's source, plus `RL-G-25`..`RL-G-31`** |
| **R-4** | `node /tmp/reloc-greens2/redrive.mjs` | **1** (the exit is `fail > 0`, i.e. `RL-G-31`) | **`30` executed — `29` PASS / `1` FAIL**, plus the four `NOT-BLIND-RUNNABLE` rows; output at `/tmp/reloc-greens2/redrive-output.txt` |
| **R-5** | `git rev-parse --short HEAD` → `0984d41`; `git status --porcelain` → **EMPTY** before the pass | **0** | the revision, and the working tree the re-drive ran against |
| **R-6** | `npm run --silent typecheck` | **0** | read-only leg, unchanged by this pass |
| **R-7** | `npm run --silent typecheck:tests` | **0** | read-only leg |
| **R-8** | `npm test` | **0** | read-only leg: **`Test Files 69 passed (69)` · `Tests 1628 passed \| 2 skipped (1630)`** |
| **R-9** | `npm run --silent build` | **0** | read-only leg: `dist/` artifacts built, **no bundle gained this module** (`R-6`) |

**THE DETERMINISM CHECK.** The `23` original scenarios' printed readings from **R-2** (the untouched original
driver) were diffed against the same `23` printed by **R-4** (the re-drive driver) — **IDENTICAL**. So the
re-drive's added scenarios changed nothing about the original twenty-three, and the original readings in `§K.3`'s
PRE column are reproducible from the driver as filed.

## K.5 THE FINDINGS — the series continues (`F-6`..`F-8`); `F-1`..`F-5` are UNAFFECTED

**`F-1`, `F-2`, `F-3`, `F-4` and `F-5` were all re-checked by this re-drive and are UNCHANGED.** `F-1`'s
mechanism (the out-of-proximity move IS the arm and the arm's `reset` terminal ends the observable gesture) is
**re-measured** here; `F-2`'s mechanism (the later release reaches **no handler at all**) is re-measured and
**strengthened** by direct listener inspection; `F-3`'s two `onReveal` cells are re-measured verbatim; `F-4`'s
double artefact is re-measured and **named as `F-6`**; `F-5`'s census reading is unchanged.

### `F-6` — **the recording session double's `reset` terminal reaches NO module sink, so the double can only ever CONFIRM an arity and an identity — and the original `RL-G-21`(c) reading could not have seen the `ADV-RL-1` class at all** *(harness-fidelity finding — LOW; it names the LIMIT of this set's own double, not a module defect)*

* **Scenarios:** `RL-G-21` (the original reading), `RL-G-26` (the correction).
* **Measured:** with the double, `RL-G-21`'s `sink value(s)=[[null,null]]` is populated by the DOUBLE's own
  `onEnd` invocation and by **consumer-authored sink calls** — the double's `reset` never enters a module sink
  path, so a `{ok:true, code:'ok', committed:true}` answer from the double's fixed return says nothing about
  whether the module took the arm. Against the real session, the SAME entry point reads
  `{ok:true,"code":"ok","committed":true}` **with `resets 1`, `revealWrites 0`, `sinkCalls 1` and the sink's
  value `=== preDrag` by identity** (`RL-G-26`).
* **Why it is a finding:** `F-4` had already recorded that the `outcome: null` reading in that cell is *"the
  DOUBLE's artefact"*. This re-drive makes the consequence explicit: **`RL-G-21`(c) is an arity/identity row
  only from this harness, and a pass that read it as a shape row would have missed `ADV-RL-1` entirely.**
  The original set's reading is **KEPT AS MEASURED** and is **not** re-scoped; `RL-G-26` carries the shape
  reading instead.
* **VERDICT: `harness limit` (LOW)** — the double is a stand-in, as `§I` item 4's honest-limits block already
  states; the fix is a scenario that uses the REAL session for shape claims, which is what `RL-G-26` is.

### `F-7` — **`§3d` pin `ADV-RL-9`'s POST-ARM RECOVERY cannot be driven at all: the arm's own `reset` terminal detaches the session's tracking listeners, so the *"still running"* gesture receives NO further observation and has NO completing turn** *(doc/spec CONTRADICTION — the clause cannot hold as written; recorded as the re-drive's ONE FAIL, never converted to a pass)*

* **Scenario:** `RL-G-31` (**FAIL**).
* **The clause, quoted:** `§3d` pin `ADV-RL-9`: *"a gesture that re-enters proximity after the arm still
  writes its ONE durable reveal at its completing turn …**AND THE RETENTION IS PINNED IN THE SAME BREATH: a
  gesture the arm took KEEPS its per-gesture record until its session gesture ends — because the session's
  gesture is STILL RUNNING (the arm is a MID-DRAG `reset`, `§0A` note 8), so the per-move channel goes on
  receiving every later observation**"* — whose OWN "who owes" column reads *"the MODULE conforms (MEASURED:
  its `terminalWrite` writes the reveal for a recovered gesture and its `finally` retains a record only while
  `armed`)"*.
* **Measured, on a REAL session, with an arm taken mid-drag (move 1 within, move 2 outside ⇒ `resets 1`,
  `sinkCalls 1`, the sink's value `=== preDrag` by identity, `previewsAtArm 2`):** the element's listener set
  **at the arm** is **`["pointerdown"]` ONLY** (it was `[pointerdown, pointermove, pointerup, pointercancel]`
  before the arm); the **post-arm `pointermove` reaches NO handler** (`reached=false`, `previews` stays `2`);
  the **post-arm `pointerup` reaches NO handler** (`reached=false`); the final reading is
  `{resets 1, revealWrites 0, sinkCalls 1, moves 2}` with `consumerReveals 0`. **The positive control** — the
  same driver with **NO arm** — reads `release reached=true`, `sink=["end"]`, `revealWrites=1`, so the row
  cannot pass vacuously.
* **Why it is a CONTRADICTION and not a module defect:** the mechanism is **the frozen session's own declared
  terminal shape** — `docs/specs/gsession.md` `§2.3` item 2(c), the same clause this set's `F-2` already
  cited: the `reset` terminal removes the tracking listeners and leaves the start listener only. The pin's
  premise (*"the session's gesture is STILL RUNNING … so the per-move channel goes on receiving every later
  observation"*) therefore **cannot hold**, and *"its completing turn"* **never arrives**. **This is the
  `F-1`/`F-2` class one layer deeper: the pin was derived on the assumption that the arm leaves a live
  observation channel, and `U-RELOCATE`'s own `F-2` finding had already measured that it does not.** **The
  module's arm behaviour measured here is CONFORMANT** (one sink write, the caller's value by identity, zero
  reveals, no second write) — so **the side that cannot hold is the CLAUSE.**
* **Honest limit, stated rather than smoothed:** `revealWrites` reads `0` on this drive, and **that is not
  evidence that the module's recovery half is absent** — no terminal of a recovered gesture is ever reachable,
  so **the module's `terminalWrite`-for-a-recovered-gesture half is UNMEASURED by this pass**, not measured
  false. The pin's `(b)` retention half is measured **false** (no observation arrives after the arm).
* **VERDICT: `doc/spec CONTRADICTION` (MEDIUM) — a FAIL, its clause named (`§3d` pin `ADV-RL-9`, with
  `§2.3` item 7's silence and `P-RL-SM-1` path (1) as its carriers).** **Owner: the contract.** Either the
  recovery limb must be re-expressed as an assertion the composition can reach (e.g. the module's own
  `'end'` wrapper driven by a session whose arm did not consume the tracking listeners, or an explicit
  statement that the recovery limb is **unreachable through the real session** and belongs to the double), or
  `§3d` pin `ADV-RL-9` must be annotated as an **unreachable declared reading**. **The one thing this pass
  does NOT do is turn it into a pass.**
* **⟶ RESOLVED 2026-09-27 — THE FAIL STANDS AS A FAIL AND ITS CLAUSE IS NOW PINNED AROUND IT (THE GATE-7 PASS, resolving this set's one blind FAIL; the as-filed finding above is KEPT VISIBLE, as this set's convention requires).** **THE UNDERLYING FACT WAS VERIFIED FROM THE FROZEN SESSION, READ-ONLY (`docs/specs/gsession.md` `§2.3` item 2(c) and `src/shared/gesture-session.ts`'s `runTerminal`): after the arm's mid-drag `reset`, the session's OWN SLOT is gone (`slot = null`) AND the tracking three are detached, so a later release delivers **NO TERMINAL AT ALL** — no `onEnd`, no commit, no further observation.** **`§3d` PIN `ADV-RL-9` IS THEREFORE CORRECTED IN PLACE, WITH ITS AS-FILED TEXT KEPT VISIBLE UNDER A DATED ANNOTATION AT ITS OWN CELL: the recovery reveal is a **TERMINAL-DELIVERED** shape — reachable only where a terminal IS delivered (the harness/double shape) — and through the LANDED session a post-arm release reaches **NO HANDLER**, which is this set's own `F-2` one layer deeper.** **THE MODULE'S RECOVERY HALF STAYS **UNMEASURED** BY THIS SET, NEVER MEASURED FALSE; `RL-G-31` IS NOT RE-SCOPED AND NOT CONVERTED TO A PASS; NO TERM, ROW ID, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED.** **THE CONTRACT'S LANDING SITES: `docs/specs/relocate.md` `§3d` pin `ADV-RL-9` (corrected in place) and `§2.3` item 7 (the post-arm retention exception, carrying the same correction).** **A later pass may re-drive `RL-G-31` ONLY against a harness that DELIVERS a terminal after the arm — the real session cannot.**

### `F-8` — **the preview state's key SET is not uniform across the pin's own three shapes: the SHOW (and RETARGET) invocation carries `hidden` PRESENT as `undefined`, while the HIDE invocation carries it ABSENT** *(doc/spec drift — a one-sentence ambiguity between pin `ADV-RL-2`'s clause and its own shape table)*

* **Scenario:** `RL-G-28` (and the corresponding readings in the original `RL-G-05`/`RL-G-06`, which
  recorded `state1={"withinProximity":true,"shown":{A}}` — i.e. a serialization that **cannot** distinguish
  `hidden: undefined` from `hidden` absent).
* **Measured:** `SHOW` keys `["withinProximity","shown","hidden"]` with `hidden` reading `undefined` (the
  module emits the member); `RETARGET` keys `["withinProximity","shown","hidden"]` (**required** — `hidden`
  is `A`); `HIDE` keys `["withinProximity","shown"]` — **`hidden` ABSENT**, `shown` `undefined`. All three in
  the pin's declaration order, and **no fourth member in any shape**.
* **The clause, quoted:** pin `ADV-RL-2` declares *"THE PREVIEW STATE'S MEMBERS, PINNED — EXACTLY
  `withinProximity`, `shown`, `hidden`, in that declaration order, **with `hidden` ABSENT when the invocation
  hides nothing**"* — a rule the module **follows**: the SHOW invocation hides nothing **and** the HIDE
  invocation hides nothing, yet the module emits `hidden` in the first case and omits it in the second.
* **Why it is a finding:** a reader taking the pin's own sentence can drive **either** form and pass **or**
  fail: a row asserting *"`hidden` is ABSENT when the invocation hides nothing"* **FAILS the SHOW shape**,
  while a row asserting *"the SHOW shape is `{withinProximity: true, shown: <A>}`"* (the pin's own shape
  `(i)`) **passes**. **The pin's members sentence and its shape `(i)` are not the same claim**, and the HIDE
  shape's own words (*"`{withinProximity: false, shown: undefined}`, `hidden` ABSENT"*) sit between them. **A
  `hidden?:`-optional property read through a totality wrapper that materialises absent keys would produce
  exactly the measured pair** — so the ambiguity is in the wording, and the module is consistent with shape
  `(i)` and with the HIDE shape.
* **VERDICT: `doc/spec drift` (LOW) — the module answers the pin's own SHAPE TABLE; the pin's general
  "ABSENT" sentence needs scoping to the hides-nothing HIDE invocation.** **Owner: the contract.** No host
  change is implied by this pass. *(This pass neither asserts nor forbids either key-set form; it records the
  measured difference so a red-set row cannot pick the wrong one silently.)*

## K.6 THE HONEST LIMITS OF THIS RE-DRIVE

1. **Blindness, restated and checkable.** This re-drive read the SAME documentation-only sources and
   **`src/shared/relocate.ts` and `tests/relocate.test.ts` were NEVER read** — the module was again reached
   **only as an imported black box** through its documented exported surface, the consumer hooks record, and
   the **landed** `src/shared/gesture-session.ts` imported by path. **No doc text was taken from the red set
   and no red-set table, expectation or harness shape informed any drive.**
2. **The re-drive is not a re-authoring.** Everything here **adds** to the set; **no scenario, reading, or
   `F-n` record above was edited.** Where the original pass's reading differed in FORM from what this pass
   could measure (the SHOW shape's key set), the difference is recorded as a finding (`F-8`) rather than
   applied to the original cell.
3. **The double remains a stand-in, and `F-6` quantifies its limit for the first time.** Every SHAPE claim in
   `RL-G-25`..`RL-G-31` was measured on the **real session** except the arity/identity claims that are the
   double's declared subject.
4. **`RL-G-31`'s FAIL is a real FAIL and is not a pass.** Its counter-hypothesis — *"my driver lost the
   gesture, not the session"* — was **tested and excluded**: after the arm the element carries
   `["pointerdown"]` only, and the **same driver with no arm reaches both the post-arm-move and the release**
   (the control). So the unreachability is a property of the arm's terminal, not of the harness.
5. **The arm taken mid-drag and the arm taken by the consumer entry point are BOTH measured** — `RL-G-31`(the
   move-turn arm), `RL-G-26`(a)(the consumer entry point) — against the SAME declared shape, and both read
   **one sink write of the caller's pre-drag value by identity, zero reveals, `resets 1`**.
6. **Not re-run, and not claimed:** the four `NOT-BLIND-RUNNABLE` rows (unchanged); the register's own tables
   and arithmetic; every source-text token/import/call-site census; any rendered-geometry fact; and — new to
   this pass — **`M-18`'s second-distinct-attach wedge**, whose `§3d` pin `ADV-RL-18` names the **RED set** as
   its owner and whose controls this driver does not carry.
7. **No leg beyond the five read-only commands in `§K.4` was run** (`typecheck`, `typecheck:tests`, `npm
   test`, `build`, and the driver/`git` reads). No file in the repo other than this one was written.

## K.7 THE REPO-SCOPE CHECK (this pass)

**`git status --porcelain` at the START of this pass → EMPTY** (so the greens file was tracked at `HEAD` with
hash `62ec2968…`, and this pass's whole change is an append plus one status-line annotation **beside** the
as-filed one). **At the END → exactly one modified path, `docs/specs/relocate-greens.md`.** **Every scratch
artifact of the re-drive lives outside the repo** (`/tmp/reloc-greens2/{probe,probe2,probe3,probe4,probe6,
redrive}.ts` and their `.mjs`/`.txt` outputs, plus the baseline at `/tmp/reloc-greens/`); **no temporary file
was placed inside the repo and none had to be deleted.** **The five repo commands in `§K.4` are read-only
(`npm test`, `typecheck`, `typecheck:tests`, `build` write only to `dist/`, which is gitignored).**
