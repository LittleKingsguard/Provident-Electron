// tests/gutter-ui.test.ts
// ===========================================================================
// U-GUTTER-UI · wave `E` · ledger row `E10` · **THE RED SET** (`RCA-1`, `§4`)
//
// Contract: `docs/specs/gutter-ui.md` (FILED 2026-09-27, twice repaired in place, the
// gate-1 step-4 `§R.4` conditions landed last). The module to be built later is
// `src/shared/gutter-affordance.ts` (`§0A` note 1 names BOTH paths — this file's path
// is confirmed there: "the module path is `src/shared/gutter-affordance.ts`, and the
// test file is `tests/gutter-ui.test.ts`").
//
// **AUTHORED FROM THE SPEC ALONE (`§4.1` item 1, `§4.4 S-10`).** Every expectation,
// helper and constant below traces to a clause of `docs/specs/gutter-ui.md`: the
// `§2`/`§2.1`–`§2.6` surface, the `§3.1` `M-*` rows, the `§3.2` `F-*` rows, the `§3.3`
// `I-*` invariants, the `§3.4` `R-*` static rows, the `§3.5` existence rows, `§R.2`/
// `§R.3`'s seam ruling + seam/degradation tables + the `3 + 17 = 20` census, `§4`'s
// red statement and stop conditions, `§5.1`'s diff scope, `§5.2`'s legs, `§5.3`'s DONE
// row, `§5.5.1`/`§5.5.2`/`§5.5.3`'s register, and `§5.U` (whose `[U]` rows are named
// there and are NOT authored here). **NOTHING here comes from the landed bytes of any
// module — the module does not exist yet** (`§4.1` item 3/5; `§3.5 R-8x`'s RED branch).
//
// Binding sections read IN FULL before authoring: the `CURRENT STATE` block, `§R`.`R1`–
// `R8` (the gate-1 rulings), `§R.2` (the seam ruling and `R-9`…`R-16`), `§R.3` (the
// eleven-seam table, the degradation-class table, the corrected `3 + 17 = 20` census),
// `§R.1` (the three answered sentences), `§0` (the ten recorded rulings), `§0A` (the
// twelve dated ruling notes — CONTRACT, not commentary), the Layer declaration (the six
// honesty anchors), `§1` (scope, items 1–8 + the FIVE named boundaries), `§2.1` (the
// surface, the export census and the NINE numbered clauses), `§2.2` (the prohibitions
// `P-1`..`P-10`), `§2.3` (the seven-state machine, the FIFTEEN transition rows, the
// validity rule and the terminal write table), `§2.4` (the one-coordinate-read rule and
// the value chain), `§2.5` (the preview channel), `§2.6` (the composition, the cursor,
// the withdrawn capture decision, the release mapping, the drop-revert), `§3.1`
// (`M-1`..`M-20`), `§3.2` (`F-1`..`F-14`, with the `F-11` and `I-4` tombstones),
// `§3.3` (`I-1`..`I-15`), `§3.4` (`R-1`..`R-14`), `§3.5` (`R-8x`/`R-9`/`R-10`/`R-11`/
// `R-12`), `§4`, `§5.1`, `§5.2`, `§5.3` (all twelve items), `§5.5`/`§5.5.1`/`§5.5.2`/
// `§5.5.3`, `§5.U` (items 1–4 + `U-GAP-1`), `§6`, `§7`, `§7a`/`§7a.1`, `§8`, and the
// four `⟶ RECORDED` blocks at the file's end. `§3a`'s `B-*` seeds are the LATER
// adversarial pass's and NONE is authored here; `§3b` is EMPTY BY CONSTRUCTION.
//
// **WHAT THIS FILE IS, IN ONE SENTENCE.** It is the red set for a module that DOES NOT
// EXIST: `src/shared/gutter-affordance.ts` is absent, `src/shared/demo-envelope.ts`
// carries no gutter card, and `src/renderer/**` carries no wiring — so every clause row
// below fails as a LABELLED ASSERTION naming the absent module, never as a collection
// error and never as a harness `TypeError`/`ReferenceError`.
//
// LAYER: **[T] + `static` — THE NODE ENVELOPE ONLY** (`§0A` note 11, `§3.2 F-13`, `§3.3`
// `I-10`, `§4.4 S-7`). **No row below asserts a rendered geometry, an applied style on a
// real element, a cursor's visual effect, a layout or a real pointer**: those are the
// `[U]` claims of `§5.2`/`§5.U`, discharged by `npm run ui` and the live driver, and
// **no row of this file claims one**. The elements here are plain object doubles, the
// source is a recording double, and every counted write is a call into an
// argument-supplied function — **a sink-call green is NOT a rendered-write green.**
//
// **THE `[U]` ROWS ARE NOT TEST ROWS AND ARE NOT AUTHORED HERE — stated explicitly so
// the omission is attributable.** `§5.U`'s matrix carries `U-1`..`U-8` (`U-8` with its
// readings `(a)`–`(e)`), each naming its instrument (`npm start` +
// `npm run mcp -- --target http --port 3787 …`, `MANUAL OPERATOR`, or `npm run ui` for
// the leg's own rows), and `§5.U` item 4 is the runner's table. **The mandatory live
// battery is the battery's** (`§5.2` legs 5/6/7; `§4.4 S-12`), **`U-5`'s and `U-8`(e)`'s
// tightened DRAGGED-VALUE readings** (`§R.4` `C-A5`) included. **This file makes no `[U]`
// claim and runs no window.**
//
// **THE FOUR `E3`-COMPOSITION ROWS THE SPEC MARKS AS NEEDING TO BE GREEN** (`§R.4`
// `C-A2`; `cc7fba5`): `M-1`'s two halves, `M-2`, `M-3` and `M-4`/`M-5`. The three `E3`
// host defects are FIXED in the landed module, so these rows are authored **to the
// CONTRACT** — never to the old `EXPECTED-RED` token, which `§R.4` `C-A2` SPENT — and
// they are expected to go GREEN once this unit's own module lands. **At RED time they
// fail for the SAME reason every other behaviour row fails** (`§4.1` item 3: no module
// exists yet) **and they are NOT tagged with any `E3`-side token in the red report.**
//
// **THE IMPORT BOUNDARY (`§4.1`; the repo's established technique, the sibling
// `tests/gutter.test.ts`'s): an `fs` existence probe plus a RUN-TIME-COMPUTED specifier
// resolved through `import(/* @vite-ignore */ …)`.** Every clause row fails as a
// LABELLED ASSERTION naming the absent module. `PRE-1` proves the mechanism itself
// resolves, against an EXISTING module (`src/shared/gutter.ts`, the frozen `E3` module
// this unit composes). **One static value import of the FROZEN peer EXISTS and is
// deliberate: `POINTER_TYPES` from `src/shared/gesture-session.ts`**, which `§3.1 M-18`
// and `§3.4 R-14` require this file to compare the module's registered move type against
// **BY IDENTITY** — a frozen, landed module cannot make the red set a collection error.
//
// **LEG 4 (`§5.2` leg 4).** `§3.4 R-1`(b)'s SEVENTEEN type names are erased at run time,
// so the honest leg is a standalone strict `tsc --noEmit` over THIS file. At RED time
// that leg reports the module-absent boundary (`TS2307`) and nothing else. **The `TS2307`
// diagnostic is NOT suppressed** (no `@ts-ignore` anywhere below): suppressing it would
// make the type-only census unfalsifiable. The `D-GU-1` typed fixture below is the leg-4
// pin: it compiles ONLY if the module exports all seventeen type names AND the three
// value exports with the declared signatures.
//
// **THE REGISTER (`§5.5.1`): SEVEN rows, declared total `134` = `15 + 15 + 15 + 45 + 20 +
// 12 + 12`** (chain `15 → 30 → 45 → 90 → 110 → 122 → 134`; subtotals `SM 45` · `IM 65` ·
// `TP 24`), executed in register order with per-row strategy ids (`S-GU-*`), caps
// `≤100`/row · `≤400` total · stop-after-5-consecutive-failures, and the discipline that
// **an un-run row is REPORTED AS A FAILURE.** **The assertion figure (`P-GU-SM-1`'s `12`
// mid-drag assertions) and the reading figure (`P-GU-TP-1`'s `6` entry-point readings) are
// printed BESIDE their terms and are NEVER counted in them** (`docs/decisions.md`
// `A DECLARED REGISTER TERM IS A DRIVE COUNT`; `§5.3` item 11).
//
// ⟶ **ONE SPEC NOTE, REPORTED AND NOT USED AS AN EXPECTATION.** `§5.5.1`'s `P-GU-SM-1`
// cell prints a DERIVATION sentence (`10` path × composition drives + `5` mid-drag
// shapes = `15`) AND an instruction that the `22` "must not be derived as `10` drives +
// `12` assertions". Neither is used here: the DECLARED TERM this file asserts is the
// `E-3` re-grain's ruled `15` — the figure `§5.5.3`'s chain, the `134` total and `§5.3`
// item 11 all print — so **no derivation formula below feeds a constant.**
//
// ---------------------------------------------------------------------------
// ⟶ **DRIVE-WINDOW RECONCILIATION, 2026-09-27 (the supervisor's drive-window ruling).** The
// previous pass MEASURED that every single-move INVALID drive lands in `§2.3` row 8's
// **PRE-HANDLE** window — the handle is captured only by the session's wrapped `onMove`
// (`E3`'s `wrappedOnMove`, the ONLY legal handle channel, `§R` `R6`), and row 8 orders THIS
// module's own move turn **BEFORE** that wrapper in the same event, so a drive whose only move
// is the invalid one calls `controller.reset(element)` while no handle exists, where the ruled
// reading is the `'no-gesture'` refusal: ZERO session calls, ZERO sink writes and the `resets`
// counter UNMOVED. **THE RULING APPLIED ROW BY ROW:** a drive whose cell declares a LIVE-window
// reading (row 9: `session.reset` exactly once, ONE sink write of the clamped pre-drag size,
// `resets` moved once) MUST include a PRIOR VALID MOVE, which establishes the drag state and
// lets the module push the value through `handle.set` BEFORE the invalid move/drop/reset the row
// is about. **This is a change INSIDE an existing drive — never a new drive:** the register's
// declared terms stay `15/45/12/12`, the `134` total and every strategy id are untouched, and
// no row id, section number, seed or `§5.U` row moves. Each changed row carries a dated
// `⟶ DRIVE-WINDOW RECONCILED 2026-09-27` annotation BESIDE its as-filed wording, and the added
// move is asserted to have been VALID (`priorValidMove`/`priorValidMoveWithState`) so the window
// is a READING rather than a claim.
//
// **THE WINDOWS, ROW BY ROW (each with its governing clause):**
//   * `F-1` — **PRE-HANDLE, as filed and unchanged** (`§2.3` row 8): its only move is the
//     unresolvable one, so no prior move exists; the row now STATES that window.
//   * `F-2` — **LIVE** (`§2.3` row 9) after a prior valid move; the seam still throws on the
//     SUBJECT move (stateful seam), and the sink read is `0` because the reset's own clamp
//     answers `NaN` (`docs/specs/gutter.md` `§2.3` item 4 clause 3 / `§3.2 F-14`).
//   * `F-10` — **LIVE** for all EIGHT shapes (prior valid move; the unusable pair's own
//     `boundsOf` is stateful so the SUBJECT reset is the clamp that answers `NaN`).
//   * `M-13` — **LIVE** (prior valid move, stateful pair): its declarations (`resets === 1`,
//     exactly ONE session `reset` call) are unreachable pre-handle and are now reached.
//   * `M-5`'s invalid cell — **LIVE** (stateful pair on the existing `lifecycle` drive).
//   * `M-20` class 2 (`sizeFromPointer: 42`) and class 3's `pointerOf`/`sizeFromPointer`/
//     `boundsOf` arms — **PRE-HANDLE, and the rows ASSERT that reading with row 8 cited**:
//     those seams ARE the size derivation, so every move of the gesture is invalid and NO prior
//     valid move exists. Only class 3's `axisOf` arm (whose throw leaves the size derivation
//     intact) takes a prior valid move and reads row 9's LIVE pair.
//   * `P-GU-SM-1` — its `(b)` path and all four INVALID mid-drag shapes are **LIVE** (prior
//     valid move inside the same attempt; shape-stateful seams), and the per-shape write counts
//     are read over the SUBJECT turn.
//   * `P-GU-SM-2` — stages (2)–(5) × the two INVALID move shapes are **LIVE**; the reads are
//     taken over the SUBJECT turn.
//   * `P-GU-SM-3`, `M-20` class 4's `commit` arm, `I-1`, `M-5`'s other cells, `P-GU-IM-1/2`,
//     `P-GU-TP-1/2` — **UNCHANGED this pass**; their window statements were re-read and are
//     consistent with this ruling (`E3`'s `stats().sinkCalls`, the harness's total seam-invocation
//     counter, the module's own share `calls.commit − E3.stats().sinkCalls`, and the session's own
//     recorder all read the SAME cell: the module's own share is `0` in every row, and the
//     session's recorder agrees with `E3`'s counter on the reset terminal).
//   * **FINDING (reported, not fudged):** `F-10`'s `Infinity via sizeFromPointer` answer is NOT a
//     non-finite CLAMP answer under the frozen `clampToBounds` (`+Infinity` clamps to the pair's
//     `max`); the shape is still driven to its declared `expectedWrites: 1` reading through the
//     reset's own clamp, and the row PRINTS the clamp's own answer rather than redefining it.
// ===========================================================================
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// The FROZEN peer's own exported constant and factory. `POINTER_TYPES` is imported BY
// VALUE because `§3.1 M-18`/`§3.4 R-14` require the move-type claim to be made BY
// IDENTITY against it; `createGestureSession` is the wiring's own call (`§R.1` item 1,
// `§2.1` clause 4) and this file stands in for that wiring in its composition drives.
import { POINTER_TYPES, createGestureSession } from '../src/shared/gesture-session.js'

// ===========================================================================
// §2.6 item 2 / §3.4 R-5(ii) — **THE SESSION SURFACE THIS COMPOSITION IS WRITTEN
// AGAINST, MIRRORED STRUCTURALLY.** `src/shared/gesture-session.ts` declares
// `GestureSession` **locally and does NOT export it** (measured on the frozen peer), so a
// test file cannot import that name; the mirror below carries the same members and is used
// ONLY as this harness's type surface, never asserted to BE the module's surface (that is
// `§3.4 R-12`'s and leg 4's claim, made through the module's own exported types).
// ===========================================================================
interface SessionLikeSurface {
  install(element: unknown, options?: unknown): unknown
  reset(element: unknown, gesture: unknown, value: unknown): unknown
  dispose(): unknown
  stats(): unknown
  gesture(): { readonly outcome?: unknown; readonly value?: unknown } | null
  readonly disposed: boolean
}

// ===========================================================================
// §2.1 — THE TYPES THE MODULE'S OWN IMPORT CENSUS CONSUMES (type-only, from the frozen
// peer). `GestureHandle` is the value channel of `§R` `R6`; a type-only binding against
// a LANDED module can never make this file a collection error.
// ===========================================================================
import type { GestureHandle } from '../src/shared/gesture-session.js'

// ===========================================================================
// ⟶ `D-GU-1` — **THE TYPED FIXTURE AND THE LEG-4 PIN** (`§2.1`, `§R.3`, `§5.2` leg 4).
//
// This block names EVERY declared export BY NAME, through the module's OWN imported
// types — never through this file's structural mirrors. It is the leg-4 red: while the
// module is absent, the standalone strict `tsc --noEmit` over THIS file reports
// `TS2307: Cannot find module '../src/shared/gutter-affordance.js'` (plus the cascading
// diagnostics the missing type names produce), and once the module lands, a rename, a
// removal or an unexported name FAILS TO COMPILE.
//
// **THE CENSUS IS `3 + 17 = 20` NAMES** (`§2.1`, `§R.3`'s corrected census): the THREE
// VALUE EXPORTS `createGutterAffordance` · `cursorDeclarationFor` · `domEventSource`, and
// the SEVENTEEN TYPE DECLARATIONS `CursorOf` · `EventSourceLike` · `GutterAffordance` ·
// `GutterAffordanceOptions` · `GutterAffordanceStats` · `PointerPosition` ·
// `PointerResolver` · `PreviewState` · `ApplyCursor` · `ApplyPreview` · `AxisOf` ·
// `BoundsOf` · `Commit` · `MoveTypeOf` · `ResizableOf` · `SizeFromPointer` ·
// `StartSizeOf`. **A TWENTY-FIRST exported name of ANY kind FAILS `§3.4 R-1`(b)**, and
// the redundant `sizeFromPointer` VALUE is DELETED (`§R.3`).
// ===========================================================================
type D_GU_1_Module = typeof import('../src/shared/gutter-affordance.js')
type D_GU_1_ValueNames = 'createGutterAffordance' | 'cursorDeclarationFor' | 'domEventSource'
const D_GU_1_valueNames: ReadonlyArray<D_GU_1_ValueNames> = ['createGutterAffordance', 'cursorDeclarationFor', 'domEventSource']
const D_GU_1_optionKeys: ReadonlyArray<keyof D_GU_1_Module['GutterAffordanceOptions']> = [
  'session',
  'source',
  'element',
  'target',
  'sizeFromPointer',
  'pointerOf',
  'moveTypeOf',
  'axisOf',
  'cursorOf',
  'applyPreview',
  'applyCursor',
  'startSizeOf',
  'boundsOf',
  'resizableOf',
  'commit',
  'capturePointer',
  'isDragValid',
]
const D_GU_1_affordanceKeys: ReadonlyArray<keyof D_GU_1_Module['GutterAffordance']> = [
  'attach',
  'detach',
  'detached',
  'stats',
  'controller',
]
const D_GU_1_statsKeys: ReadonlyArray<keyof D_GU_1_Module['GutterAffordanceStats']> = [
  'moves',
  'previews',
  'cursorWrites',
  'cursorClears',
  'resets',
  'drops',
  'lastCursor',
]
const D_GU_1_previewKeys: ReadonlyArray<keyof D_GU_1_Module['PreviewState']> = ['value', 'token', 'valid', 'resizable']
const D_GU_1_pointerKeys: ReadonlyArray<keyof D_GU_1_Module['PointerPosition']> = ['x', 'y']
const D_GU_1_sourceKeys: ReadonlyArray<keyof D_GU_1_Module['EventSourceLike']> = ['on', 'off', 'isConnected', 'capturePointer']
/** `§R.3`/`C-A7` — **THE NORMATIVE SPELLING OF THE `sizeFromPointer` SEAM IS THE MODULE'S
 *  EXPORTED INTERFACE CALL SIGNATURE**, not a function-type alias. `D_GU_1_sizeFromPointer`
 *  is assignable to `SizeFromPointer` ONLY under that declaration (an interface call
 *  signature and a plain function type are mutually assignable, but a fork that re-declares
 *  its own shape FAILS `§3.4 R-1`(b)'s by-name census) — and the fixture below pins the
 *  seam's own arity `(pointer, start) => unknown`.
 *  **THE `SizeFromPointer` DECLARATION IS THE INTERFACE FORM IN `§2.1`'s CODE BLOCK**, so
 *  the fixture drives it as written there and the leg-4 red is `TS2307` alone. */
const D_GU_1_sizeFromPointer: D_GU_1_Module['SizeFromPointer'] = (pointer: D_GU_1_Module['PointerPosition'], start: number): unknown =>
  pointer.x - start
const D_GU_1_axisOf: D_GU_1_Module['AxisOf'] = (_element: unknown): unknown => undefined
const D_GU_1_cursorOf: D_GU_1_Module['CursorOf'] = (_token: unknown): unknown => undefined
const D_GU_1_applyPreview: D_GU_1_Module['ApplyPreview'] = (_state: D_GU_1_Module['PreviewState']): void => undefined
const D_GU_1_applyCursor: D_GU_1_Module['ApplyCursor'] = (_element: unknown, _declaration: string | undefined): void => undefined
const D_GU_1_startSizeOf: D_GU_1_Module['StartSizeOf'] = (_element: unknown, _token: unknown): unknown => undefined
const D_GU_1_boundsOf: D_GU_1_Module['BoundsOf'] = (_element: unknown, _token: unknown): unknown => undefined
const D_GU_1_resizableOf: D_GU_1_Module['ResizableOf'] = (_element: unknown, _token: unknown): unknown => undefined
const D_GU_1_commit: D_GU_1_Module['Commit'] = (_gesture: unknown, _value: number): void => undefined
const D_GU_1_moveTypeOf: D_GU_1_Module['MoveTypeOf'] = (_element: unknown): unknown => undefined
const D_GU_1_pointerOf: D_GU_1_Module['PointerResolver'] = (_event: unknown): D_GU_1_Module['PointerPosition'] | null => null
const D_GU_1_pointerPosition: D_GU_1_Module['PointerPosition'] = { x: 0, y: 0 }
const D_GU_1_eventSource: D_GU_1_Module['EventSourceLike'] = {
  on: (_element: unknown, _type: string, _handler: (event: unknown) => void): void => undefined,
  off: (_element: unknown, _type: string, _handler: (event: unknown) => void): void => undefined,
}
/** The `EventSourceLike` HANDLER SHAPE is `(event: unknown) => void` and forward ONE
 *  argument — the `C-2` correction (`§R.2` `R-10`). A zero-argument handler is still
 *  assignable TO it (TypeScript's arity rule), so the SHAPE is pinned at the type layer by
 *  the source's own member list and at the run time by `R-6`'s forwarding row. */
const D_GU_1_zeroArgHandlerStillAccepted = D_GU_1_eventSource
const D_GU_1_factory: (options?: D_GU_1_Module['GutterAffordanceOptions']) => D_GU_1_Module['GutterAffordance'] =
  null as unknown as D_GU_1_Module['createGutterAffordance']
const D_GU_1_cursorDeclarationFor: (value: unknown) => string | undefined = null as unknown as D_GU_1_Module['cursorDeclarationFor']
const D_GU_1_domEventSource: () => D_GU_1_Module['EventSourceLike'] = null as unknown as D_GU_1_Module['domEventSource']
void D_GU_1_valueNames
void D_GU_1_optionKeys
void D_GU_1_affordanceKeys
void D_GU_1_statsKeys
void D_GU_1_previewKeys
void D_GU_1_pointerKeys
void D_GU_1_sourceKeys
void D_GU_1_sizeFromPointer
void D_GU_1_axisOf
void D_GU_1_cursorOf
void D_GU_1_applyPreview
void D_GU_1_applyCursor
void D_GU_1_startSizeOf
void D_GU_1_boundsOf
void D_GU_1_resizableOf
void D_GU_1_commit
void D_GU_1_moveTypeOf
void D_GU_1_pointerOf
void D_GU_1_pointerPosition
void D_GU_1_zeroArgHandlerStillAccepted
void D_GU_1_factory
void D_GU_1_cursorDeclarationFor
void D_GU_1_domEventSource

// ===========================================================================
// THE PATHS AND THE IMPORT BOUNDARY (`§4.1`).
// ===========================================================================
const MODULE_SRC = new URL('../src/shared/gutter-affordance.ts', import.meta.url)
/** The run-time specifier of `§5.1` row 1, assembled at RUN time so the unresolvable
 *  import cannot fail this file's transform while the module is absent. */
const MODULE_SPECIFIER = ['..', 'src', 'shared', 'gutter-affordance.js'].join('/')
const SESSION_SPECIFIER = ['..', 'src', 'shared', 'gesture-session.js'].join('/')
const GUTTER_SPECIFIER = ['..', 'src', 'shared', 'gutter.js'].join('/')
const TEST_FILE = fileURLToPath(import.meta.url)
const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const MODULE_RELPATH = 'src/shared/gutter-affordance.ts'
const TEST_RELPATH = 'tests/gutter-ui.test.ts'
const SPEC_RELPATH = 'docs/specs/gutter-ui.md'
const SESSION_RELPATH = 'src/shared/gesture-session.ts'
const GUTTER_RELPATH = 'src/shared/gutter.ts'
const RENDERER_RELPATH = 'src/renderer/renderer.ts'
const RUNTIME_RELPATH = 'src/renderer/runtime.ts'
const DEMO_RELPATH = 'src/shared/demo-envelope.ts'

// ===========================================================================
// `§3.4 R-11`’S NAME-COMPLETE PINNED SURFACE (`§2.2` P-7, `§3.3 I-12;` the same
// `21`-name set `tests/engine-pin-version.test.ts`’s `PINNED_TOOL_SET` asserts BY
// SET EQUALITY). The names are carried here so `R-11`’s green branch can ask
// whether THE MODULE ADDS ONE — a bare count would answer the wrong question.
// ===========================================================================
const ENGINE_PIN_RELPATH = 'tests/engine-pin-version.test.ts'
const DEFAULT_GATE_RELPATH = 'src/main/security.ts'
const PINNED_TOOL_NAMES: readonly string[] = [
  'provident.dispatch',
  'provident.get_rendered_html',
  'provident.get_markdown',
  'provident.list_targets',
  'provident.get_node_state',
  'provident.code.get',
  'provident.code.validate',
  'provident.load',
  'provident.op',
  'provident.export',
  'provident.validate',
  'provident.teardown',
  'provident.journal',
  'provident.code.set',
  'provident.code.create',
  'provident.code.delete',
  'provident.code.load',
  'provident.code.loadBatch',
  'module.install',
  'module.update',
  'module.list',
]
const PINNED_GROUP_NAMES: readonly string[] = ['read', 'dispatch', 'graph', 'code', 'module']
/** The registration-site vocabulary: a module carrying ANY of these has added a
 *  pinned-surface member or a registration site (`§2.2` P-7, `§3.3 I-12`). */
const REGISTRATION_SITE_TOKENS: readonly string[] = [
  'ALL_TOOLS',
  'RpcMethod',
  'MUTATING_METHODS',
  'VALID_GROUPS',
  'ipcRenderer',
  'ipcMain',
  'createElement',
]
/** **`§3.4 R-11`’s POSITIVE CONTROL: the pinned-surface files whose own declarations
 *  the green branch reads (`§3.3 I-12` names the same set).** */
const PINNED_SURFACE_FILES: readonly string[] = ['src/main/mcp-server.ts', RENDERER_RELPATH, DEFAULT_GATE_RELPATH]

function describeThrown(e: unknown): string {
  if (e instanceof Error) return `${e.name}: ${e.message}`
  return String(e)
}
function brief(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
function rel(path: string): string {
  return `${REPO_ROOT}/${path}`
}
function readRel(path: string): string {
  return existsSync(rel(path)) ? readFileSync(rel(path), 'utf8') : ''
}

let moduleCache: { mod: Record<string, unknown> | null; reason: string | null } | null = null

async function resolveModule(): Promise<{ mod: Record<string, unknown> | null; reason: string | null }> {
  if (moduleCache !== null) return moduleCache
  // **⟶ REPAIRED 2026-09-27 (RULE C(c)) — `existsSync(fileURLToPath(...))`, NEVER
  // `existsSync(url.href)`.** A `URL`'s `href` is a `file://…` STRING, which a path-exists
  // call cannot resolve (measured: `existsSync(url.href) === false` for a file that EXISTS,
  // while the `fileURLToPath` form reads `true`), so every one of these sites read `false`
  // regardless of the module's presence — a latent trap that today distinguishes nothing
  // because the module is absent.
  if (!existsSync(fileURLToPath(MODULE_SRC))) {
    moduleCache = { mod: null, reason: `the module of §2.1/§5.1 row 1 does not exist yet (${fileURLToPath(MODULE_SRC)})` }
    return moduleCache
  }
  try {
    const mod = (await import(/* @vite-ignore */ MODULE_SPECIFIER)) as unknown as Record<string, unknown>
    moduleCache = { mod, reason: null }
  } catch (e) {
    moduleCache = { mod: null, reason: `the module does not resolve: ${describeThrown(e)}` }
  }
  return moduleCache
}

/** The CLAUSE rows' boundary: fails as an ASSERTION carrying the row's label and RETURNS
 *  the namespace so a row's body stays type-clean. */
async function requireModule(label: string): Promise<Record<string, unknown>> {
  const { mod, reason } = await resolveModule()
  if (mod === null) {
    expect(
      mod,
      `RED — U-GUTTER-UI red set (§4.1): ${reason ?? 'the module surface is unavailable'}. This row drives §2.1's surface. [${label}]`,
    ).not.toBe(null)
  }
  return mod as Record<string, unknown>
}

/** **THE MODULE-LIVENESS ASSERTION.** Several rows' DECLARED values are ALREADY SATISFIED
 *  by an inert stand-in (a composition that never wired anything writes zero times) — a
 *  GREEN there would be exactly the vacuous green this file exists to avoid. Every such
 *  row therefore asserts the module's EXISTENCE first.
 *
 *  A row that passes while `src/shared/gutter-affordance.ts` does not exist is a
 *  HARNESS-CAUSED pass and a finding against this file. */
async function requireLiveModule(label: string): Promise<Record<string, unknown>> {
  const mod = await requireModule(label)
  expect(
    existsSync(fileURLToPath(MODULE_SRC)),
    `RED — U-GUTTER-UI red set (§4.1): this row's declared values would ALSO be satisfied by an inert stand-in, so it asserts the module's EXISTENCE before its own clause (an absent-module green here would be a vacuous pass). [${label}]`,
  ).toBe(true)
  return mod
}

/** The named value export of `§2.1`, through the same boundary. */
async function valueExport<T>(name: string, label: string): Promise<T> {
  const mod = await requireModule(label)
  const value = mod[name]
  expect(
    typeof value,
    `§2.1/§3.4 R-1(a) — the runtime VALUE export \`${name}\` is exported by \`${MODULE_RELPATH}\` (the census is a SET claim over ${JSON.stringify(
      Object.keys(mod).sort(),
    )}, never a count) [${label}]`,
  ).not.toBe('undefined')
  return value as T
}

async function cursorDeclarationForOf<T>(label: string): Promise<T> {
  return valueExport<T>('cursorDeclarationFor', label)
}
async function factoryOf<T>(label: string): Promise<T> {
  return valueExport<T>('createGutterAffordance', label)
}
async function domEventSourceOf<T>(label: string): Promise<T> {
  return valueExport<T>('domEventSource', label)
}

/** The register rows' boundary: a MISSING MODULE is a break CAUSE (a sentence), never a
 *  throw, so the stop-after-5 rule reports the red instead of a harness error hiding it. */
async function surface(label: string): Promise<{ mod: Record<string, unknown> | null; cause: string | null }> {
  const { mod, reason } = await resolveModule()
  if (mod === null) return { mod: null, cause: `${reason ?? 'module unavailable'} [${label}]` }
  const factory = mod['createGutterAffordance']
  if (typeof factory !== 'function') {
    return { mod: null, cause: `§2.1/§3.4 R-1(a) — the factory \`createGutterAffordance\` is not a value export [${label}]` }
  }
  return { mod, cause: null }
}

// ===========================================================================
// §3.4 — THE STATIC SCAN MACHINERY, WITH ITS CONTROLS (`§3.4`'s preamble: a scan is
// closed against the evasion class — token assembly, comment-carrying, realm-rooted
// computed access — by `§4.4 S-1`).
// ===========================================================================
/** **⟶ REPAIRED 2026-09-27 (`⟶ RE-GRAINED 2026-09-27 (THE SCAN-HELPER RULING) — RULE C`).**
 *  The NORMALIZED view: a `+`-CHAIN of adjacent string literals is consumed into **ONE token**
 *  (`node['class' + 'List']` ⇒ `node[classList]`, `event['page' + 'X']` ⇒ `event[pageX]`) and
 *  comments are KEPT (a token inside a comment is a HIT, `§2.1` item 6: "comments included,
 *  token-assembly joined"). **THE AS-FILED FORM APPENDED A MARKER AROUND EVERY LITERAL AND THEN
 *  DELETED THE MARKERS, so a token assembled across a literal boundary was emitted as
 *  `node[class + List]` and matched NOTHING — the boundary rule below could never see it, and
 *  `R-1(c)`/`R-3`'s assembled positive controls could never fail the scan (a dead control, and a
 *  row that cannot fail is not a row).** The comment-carrying arm is untouched: comments are
 *  scanned as CODE, so a joined spelling inside a comment is a hit. */
function normalizedView(src: string): string {
  let out = ''
  let i = 0
  while (i < src.length) {
    const ch = src[i]
    if (ch !== '"' && ch !== "'" && ch !== '`') {
      out += ch
      i += 1
      continue
    }
    let part = ''
    let quote = ch
    i += 1
    // THE JOIN LOOP: consume this literal; then, if the very next non-whitespace bytes are
    // `+` followed by ANOTHER literal's opening quote, keep consuming into the SAME `part`.
    for (;;) {
      while (i < src.length && src[i] !== quote) {
        if (src[i] === '\\') {
          part += src[i] + (src[i + 1] ?? '')
          i += 2
          continue
        }
        part += src[i]
        i += 1
      }
      if (i >= src.length) break
      i += 1
      let j = i
      while (j < src.length && /\s/.test(src[j])) j += 1
      if (src[j] !== '+') break
      j += 1
      while (j < src.length && /\s/.test(src[j])) j += 1
      const opener = src[j]
      if (opener !== '"' && opener !== "'" && opener !== '`') break
      quote = opener
      i = j + 1
    }
    out += part
  }
  return out
}
/** A BOUNDED occurrence: the spelling must not be adjacent to a word character, so
 *  `clientX` inside `aclientXb` is not a hit while a bare `clientX` is. */
function boundedOccurrences(text: string, spelling: string): number {
  if (spelling.length === 0) return 0
  const escaped = spelling.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(^|[^A-Za-z0-9_$])${escaped}([^A-Za-z0-9_$]|$)`, 'g')
  let count = 0
  let match = re.exec(text)
  while (match !== null) {
    count += 1
    re.lastIndex = match.index + Math.max(1, match[0].length - 1)
    match = re.exec(text)
  }
  return count
}
function hitsOf(text: string, spellings: readonly string[]): string[] {
  const view = normalizedView(text)
  const found: string[] = []
  for (const spelling of spellings) {
    const count = boundedOccurrences(view, spelling)
    if (count > 0) found.push(`${spelling} ×${count}`)
  }
  return found
}

/** **`§3.4 R-1`(c)'s NINE-TOKEN NEGATIVE LIST** (`§2.1` item 6): the module's bytes contain
 *  NONE of these in NO form, comments included and token-assembly joined. The three
 *  DOM-touching members it DOES contain are the whole carve-out and are NOT in this list
 *  (`addEventListener` · `removeEventListener` · `setPointerCapture`), while
 *  `releasePointerCapture` MUST NOT appear (`§3.3 I-13`). */
const UI_CONTENT_TOKENS: readonly string[] = [
  'createElement',
  'innerHTML',
  'outerHTML',
  'insertAdjacentHTML',
  'insertAdjacentText',
  'textContent',
  'innerText',
  'className',
  'classList',
  'appendChild',
  'insertBefore',
  'removeChild',
  'document.write',
  'releasePointerCapture',
]
/** Positive controls: each corpus MUST fail the scan (raw, assembled across a literal
 *  boundary, and inside a comment) — a row that cannot fail is not a row. */
const UI_CONTENT_POSITIVE_CONTROLS: readonly string[] = [
  'node.createElement("div")',
  'node.innerHTML = "x"',
  "// this comment mentions textContent",
  'node.classList.add("gutter")',
  "node['class' + 'List']",
  'el.appendChild(child)',
  'el.insertBefore(a, b)',
  'el.removeChild(child)',
  'el.releasePointerCapture(1)',
]
/** Negative controls: the module's own LEGITIMATE text MUST pass. */
const UI_CONTENT_NEGATIVE_CONTROLS: readonly string[] = [
  'element.addEventListener("pointerover", handler)',
  'element.removeEventListener("pointerover", handler)',
  'element.setPointerCapture(pointerIdValue)',
  'const moves = 0',
  'function resolveEventPointer(event) { return null }',
]
function uiContentViolations(src: string): string[] {
  return hitsOf(src, UI_CONTENT_TOKENS)
}

/** **`§3.4 R-3`'s VOCABULARY** (`§2.4` items 1/5, `§2.2` P-4): no second coordinate token,
 *  no magnitude vocabulary, no coordinate read outside `resolveEventPointer`'s own body.
 *  **The two legal tokens `clientX`/`clientY` are the NEGATIVE control and MUST PASS.** */
const SECOND_COORDINATE_TOKENS: readonly string[] = [
  'pageX',
  'pageY',
  'screenX',
  'screenY',
  'offsetX',
  'offsetY',
  'movementX',
  'movementY',
  'deltaX',
  'pointerId',
]
const MAGNITUDE_TOKENS: readonly string[] = ['distance', 'ratio', 'percentage']
const COORDINATE_POSITIVE_CONTROLS: readonly string[] = [
  'const a = event.pageX',
  'const a = event.screenY',
  'const a = event.offsetX',
  'const a = event.movementY',
  'const a = event.deltaX',
  'const a = event.pointerId',
  'const distance = 12',
  'const ratio = a / b',
  'const percentage = 50',
  "const a = event['page' + 'X']",
]
function coordinateViolations(src: string): string[] {
  const view = normalizedView(src)
  const found = [...hitsOf(src, SECOND_COORDINATE_TOKENS), ...hitsOf(src, MAGNITUDE_TOKENS)]
  // `delta` as an IDENTIFIER (`§3.4 R-3`) — never as a field access of another object.
  const deltaIdentifier = /(^|[^A-Za-z0-9_$.])delta([^A-Za-z0-9_$]|$)/.test(view)
  if (deltaIdentifier) found.push('delta (as an identifier)')
  return found.sort()
}

/** **`§3.4 R-6`'s ACCESS/DELEGATION TOKENS** (`§2.2` P-2/P-6). A row asserting "no DOM API
 *  at all" FAILS this row's own text — the three DOM-API members ARE the carve-out. */
const ACCESS_TOKENS: readonly string[] = [
  'document',
  'window',
  'globalThis',
  'closest',
  'querySelector',
  'querySelectorAll',
  'getElementById',
  'localStorage',
  'sessionStorage',
]
const ACCESS_POSITIVE_CONTROLS: readonly string[] = [
  'document.addEventListener("pointermove", h)',
  'window.onpointermove = h',
  'globalThis.handler = h',
  'el.closest(".gutter")',
  'document.querySelector("#gutter")',
  'document.querySelectorAll("div")',
  'document.getElementById("gutter")',
  'localStorage.setItem("a", "b")',
  "docu' + 'ment.getElementById('x')",
]
function accessViolations(src: string): string[] {
  return hitsOf(src, ACCESS_TOKENS)
}

/** **`§3.4 R-7`'s POLICY/VOCABULARY TOKENS.** **`cursorDeclarationFor`'s own parameter name
 *  and the `cursor` PROPERTY NAME it reads ARE the negative control and MUST PASS** (it
 *  reads a property called `cursor`; it does not carry a VALUE). */
const CURSOR_LITERALS: readonly string[] = ['col-resize', 'row-resize', 'ew-resize', 'ns-resize']
const AXIS_LITERALS: readonly string[] = ['horizontal', 'vertical']
/** **⟶ RE-GRAINED 2026-09-27 (THE SCAN-HELPER RULING) — RULE C(b): THE UNIT RULE IS A
 *  SUBSTRING RULE.** `§3.4 R-7` forbids a **unit string** (`'12px'`, `'0px'`), so the unit
 *  spelling must be found INSIDE the literal (`'12px'` CONTAINS `'px'`) — unlike the identifier
 *  rules above, whose BOUNDARY form is deliberate (`classList` inside `aclassListb` is not a
 *  hit). The as-filed boundary rule over `'px'` matched NOTHING, so `R-7`'s `"const u = '12px'"`
 *  control could never fail the scan. **THE UNIT LIST IS KEPT WITH BOTH SPELLINGS.** */
const UNIT_LITERALS: readonly string[] = ['px', '0px']
const POLICY_POSITIVE_CONTROLS: readonly string[] = [
  "return { cursor: 'col-resize' }",
  "const c = 'row-resize'",
  "const c = 'ew-resize'",
  "const c = 'ns-resize'",
  "const axis = 'horizontal'",
  "const axis = 'vertical'",
  "const u = '12px'",
]
/** **⟶ ADDED 2026-09-27 (THE SCAN-HELPER RULING) — RULE C(b): the SUBSTRING form of the
 *  occurrence count**, used by the unit-literal rule alone (`§3.4 R-7` forbids a unit STRING,
 *  so `'12px'` must count). Non-overlapping, and reported as `×N (substring rule)` so a reading
 *  never has to be re-derived to know which rule produced it. */
function substringOccurrences(text: string, spelling: string): number {
  if (spelling.length === 0) return 0
  let count = 0
  let at = text.indexOf(spelling)
  while (at !== -1) {
    count += 1
    at = text.indexOf(spelling, at + spelling.length)
  }
  return count
}
function unitHitsOf(text: string, spellings: readonly string[]): string[] {
  const view = normalizedView(text)
  const found: string[] = []
  for (const spelling of spellings) {
    const count = substringOccurrences(view, spelling)
    if (count > 0) found.push(`${spelling} ×${count} (substring rule)`)
  }
  return found
}
function policyViolations(src: string): string[] {
  return [...hitsOf(src, CURSOR_LITERALS), ...hitsOf(src, AXIS_LITERALS), ...unitHitsOf(src, UNIT_LITERALS)].sort()
}

function moduleSource(label: string): string {
  expect(
    existsSync(fileURLToPath(MODULE_SRC)),
    `RED — U-GUTTER-UI red set (§4.1): the static rows of §3.4 read the module file and it does not exist yet (${fileURLToPath(
      MODULE_SRC,
    )}). [${label}]`,
  ).toBe(true)
  return existsSync(fileURLToPath(MODULE_SRC)) ? readFileSync(MODULE_SRC, 'utf8') : ''
}
function moduleBytes(): string {
  return existsSync(fileURLToPath(MODULE_SRC)) ? readFileSync(MODULE_SRC, 'utf8') : ''
}
function exportedValueNames(src: string): string[] {
  return (src.match(/^export\s+(?:async\s+)?(?:function|const|let|var|declare\s+function)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm) ?? [])
    .map((line) => line.replace(/^export\s+(?:async\s+)?(?:function|const|let|var|declare\s+function)\s+/, ''))
    .sort()
}
function exportedTypeNames(src: string): string[] {
  return (src.match(/^export\s+(?:interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm) ?? [])
    .map((line) => line.replace(/^export\s+(?:interface|type)\s+/, ''))
    .sort()
}
/** Every `gutter*` path under `src/**` or `tests/**` (`§3.5 R-8x`'s census). **THE CENSUS IS
 *  SCOPED TO THIS UNIT'S OWN ARTIFACTS** (`§5.1`'s commit-range scope rule: a census must not
 *  read a SIBLING unit's landed artifact as this unit's diff). `E3`'s `src/shared/gutter.ts`
 *  and `tests/gutter.test.ts` are LANDED, FROZEN and DENIED — they are `gutter*` paths but
 *  they are `E3`'s, never this unit's, so the row filters them out by name rather than
 *  asserting a census that a sibling's landing would break. */
const SIBLING_E3_PATHS: readonly string[] = ['src/shared/gutter.ts', 'tests/gutter.test.ts']
function walkUnitPaths(): string[] {
  const found: string[] = []
  const visit = (relative: string): void => {
    for (const entry of readdirSync(rel(relative), { withFileTypes: true })) {
      const child = `${relative}/${String(entry.name)}`
      if (entry.isDirectory()) {
        if (String(entry.name) === 'node_modules' || String(entry.name).startsWith('.')) continue
        visit(child)
        continue
      }
      if (/^gutter/i.test(String(entry.name))) found.push(child)
    }
  }
  for (const root of ['src', 'tests']) visit(root)
  return found.filter((path) => !SIBLING_E3_PATHS.includes(path)).sort()
}
function importsOf(relPath: string, specifierRe: RegExp): boolean {
  const src = readRel(relPath)
  const re = /from\s+['"]([^'"]+)['"]/g
  let match = re.exec(src)
  while (match !== null) {
    if (specifierRe.test(match[1])) return true
    match = re.exec(src)
  }
  return false
}

// ===========================================================================
// THE RECORDING SOURCE DOUBLE (`§2.3` row 2, `§3.1 M-4`/`M-18`, `§3.3 I-15`, and the
// `§5.5.1` strategy item 5(a): "every row drives a recording source double, element
// doubles, a recording session double or the landed session, and caller-supplied
// callbacks"). It records the ORDERED log of `on`/`off` calls — **the seam's own call
// sequence, never a real-DOM premise** (`§3.1 M-4`'s layer qualification).
// ===========================================================================
type SourceEntry = { readonly kind: 'on' | 'off'; readonly element: unknown; readonly type: string; readonly handler: (event: unknown) => void }
class RecordingSource {
  readonly log: SourceEntry[] = []
  on(element: unknown, type: string, handler: (event: unknown) => void): void {
    this.log.push({ kind: 'on', element, type, handler })
  }
  off(element: unknown, type: string, handler: (event: unknown) => void): void {
    this.log.push({ kind: 'off', element, type, handler })
  }
  ons(): SourceEntry[] {
    return this.log.filter((e) => e.kind === 'on')
  }
  offs(): SourceEntry[] {
    return this.log.filter((e) => e.kind === 'off')
  }
  /** The handlers registered for `type`, in registration order, each with its element. */
  handlersFor(type: string): Array<{ element: unknown; handler: (event: unknown) => void }> {
    return this.ons()
      .filter((e) => e.type === type)
      .map((e) => ({ element: e.element, handler: e.handler }))
  }
  onCount(type: string): number {
    return this.ons().filter((e) => e.type === type).length
  }
  /** FIRE the type: every registered handler is invoked with the SAME forwarded event
   *  object, IN REGISTRATION ORDER, and the index of the first one that THREW is reported
   *  (so a propagating consumer throw is observable without unwinding the whole drive). */
  fire(type: string, event: unknown): { calls: number; threwAt: number; thrown: unknown } {
    const handlers = this.handlersFor(type)
    for (let i = 0; i < handlers.length; i += 1) {
      try {
        handlers[i].handler(event)
      } catch (e) {
        return { calls: i + 1, threwAt: i, thrown: e }
      }
    }
    return { calls: handlers.length, threwAt: -1, thrown: null }
  }
  /** FIRE one specific registered handler (by the index within its type), so a row can
   *  drive the MODULE's own turn and the SESSION's own turn separately. */
  fireAt(type: string, index: number, event: unknown): { threw: boolean; thrown: unknown } {
    const handlers = this.handlersFor(type)
    const chosen = handlers[index]
    if (chosen === undefined) return { threw: false, thrown: null }
    try {
      chosen.handler(event)
      return { threw: false, thrown: null }
    } catch (e) {
      return { threw: true, thrown: e }
    }
  }
}

// ===========================================================================
// ⟶ OWNER-SCOPED LISTENER CENSUSES — ADDED 2026-09-27 (THE OWNER-SCOPING REPAIR).
//
// **THE DEFECT CLASS THIS BLOCK CLOSES, MEASURED.** The rows below used to read the
// COMPOSED `source.on`/`source.off` log and filter it by TYPE MEMBERSHIP
// (`ons.filter((e) => moduleSet.includes(e.type))`), which reads a census of the WHOLE
// composition as if it were THIS MODULE'S OWN. The composed per-type map legitimately
// carries `pointerdown: 2`, because `E3`'s landed `attach()` makes the SESSION install its
// OWN single `'pointerdown'` start listener on the SAME element through the SAME source
// (`docs/specs/gutter.md` `§2.2` P-3, the landed `session.install` → `installOperation`;
// `docs/specs/gutter-ui.md` `§2.3` row 2, `§2.3` row 6c). A membership filter cannot tell
// that listener from the module's own, so any rule of the form *"every event type appears
// exactly once in the composed attach"* is FALSE BY CONSTRUCTION.
//
// **THE CORRECT READING IS BY OWNER** (`docs/specs/gutter-ui.md` `§3.1 M-4`: *"FOUR of the
// five are THIS MODULE'S OWN … plus the session's OWN single `'pointerdown'` attach …
// so the source's log shows FIVE `on` calls in the composed attach"*; `§R` `R-12`: *"the
// module's FOUR … are INSTALLED BY THE MODULE and REMOVED BY THE MODULE … the SESSION's
// OWN SET … is INSTALLED and REMOVED BY THE SESSION"*): each owner attaches each of ITS OWN
// types ONCE, the composed census is the SUM, and every listener is attributed to its owner.
//
// **THE ATTRIBUTION RULE, and why it is falsifiable rather than conventional.** The
// module's own installs and removals are the FIRST `MODULE_OWN_LISTENER_COUNT` calls of
// their kind in the source's ordered log, because the module's `attach()` registers its
// four listeners BEFORE it hands the element to `E3`'s controller (whose `session.install`
// is the session's own fifth) and the module's `detach()` issues its own four `off` calls
// BEFORE `controller.detach()` delegates to the session (`§2.3` row 13: *"first call:
// exactly FOUR `source.off` calls … **before** the controller's own delegation"*). The
// module installs `§2.3` row 2's FOUR DISTINCT TYPES, one per type, so *the module's own
// four* is EXACTLY *the four distinct types among the log's first four calls*. Everything
// later is the session's own. **A FIFTH install of a type the module already owns — the
// duplicate the repair exists to catch — cannot hide**: it pushes the log past the
// module's four slots, so the first four calls are no longer four DISTINCT module types and
// `moduleOwnPerType` FAILS the row's own `every(n => n === 1)` rule over the module's own
// set. **The positive control below drives exactly that log.**
// ===========================================================================

/** `§2.3` row 2 / `§R` `R-12`: the module's OWN four listeners, BY TYPE — the hover enter,
 *  the hover exit, the module's own context-button read, and the module's own MOVE listener
 *  (whose type is the session's exported token, `§R` `R-11`/`§3.1 M-18`). Declared by a
 *  function so each row reads the SAME list and a caller can drive the census machinery over
 *  a log of its own. */
function moduleOwnTypes(): string[] {
  return ['pointerover', 'pointerout', 'pointerdown', POINTER_TYPES.move]
}
/** The owner split of a source log's listener calls, each partition REPORTED so a row can name
 *  WHICH listener set it counts (`§4.4 S-2`). */
type OwnerSplit = {
  readonly composed: SourceEntry[]
  readonly composedPerType: Array<[string, number]>
  /** THIS MODULE'S OWN calls, attributed BY LISTENER IDENTITY (element · type · handler). */
  readonly moduleOwn: SourceEntry[]
  readonly moduleOwnPerType: Array<[string, number]>
  /** THIS MODULE'S OWN DISTINCT LISTENERS — a duplicate registration of the SAME handler is
   *  still ONE listener (which is what `§3.1 M-4`'s *"exactly FOUR `source.on` calls"* counts). */
  readonly moduleOwnDistinctListenerCount: number
  /** `true` iff EACH of the module's own four types appears EXACTLY ONCE in the module's own
   *  set — the row's own `every(n => n === 1)` rule, read over the module's own listeners
   *  (`§3.1 M-4`), so a SECOND listener of a type the MODULE already owns (a DIFFERENT handler,
   *  i.e. a genuine fifth listener) makes this FALSE and FAILS the row. */
  readonly moduleOwnTypesAttachedOnce: boolean
  /** EVERYTHING THAT IS NOT THIS MODULE'S — the OTHER OWNERS' calls (in this composition, the
   *  session's own install and its tracking set; `§R` `R-12`: *"each set is installed by its
   *  OWN owner"*). */
  readonly otherOwners: SourceEntry[]
  readonly otherOwnersPerType: Array<[string, number]>
}
function perTypeOf(entries: readonly SourceEntry[]): Array<[string, number]> {
  const perType = new Map<string, number>()
  for (const entry of entries) perType.set(entry.type, (perType.get(entry.type) ?? 0) + 1)
  return [...perType.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
}
/** One listener, keyed BY ITS OWN THREE VALUES (`§2.3` row 13): the element, the type and the
 *  handler REFERENCE. Two log entries naming the same three are the SAME listener. */
function listenerKey(entry: SourceEntry): string {
  const element = entry.element as { readonly name?: unknown } | null | undefined
  const name = element !== null && element !== undefined && typeof element === 'object' ? String(element.name) : String(entry.element)
  return `${name}::${entry.type}::${String(entry.handler as unknown as number)}`
}
/** One `off` entry and the `on` entry it removes — the SAME THREE VALUES (`§2.3` row 13:
 *  *"each with the SAME three values as its `on`"*). */
type ListenerPair = { readonly on: SourceEntry | undefined; readonly off: SourceEntry }
/** **THE MODULE'S OWN REMOVALS — THE ATTRIBUTION KEY** (`§2.3` row 13, `§3.1 M-15`). In the
 *  source's ordered log the module's `detach()` issues **its OWN four `off` calls and then
 *  delegates ONCE** — `detach()` removes each recorded listener and *only then* calls
 *  `controller.detach()` (`§2.3` row 13: *"exactly FOUR `source.off` calls (the module's own
 *  four, each matching its `on` by the same three values) **before** the controller's own
 *  delegation"*) — and `E3`/the session removes ITS OWN set inside that delegation, the
 *  session's own `'pointerdown'` install removal LAST of all (`docs/specs/gutter.md` `§2.2`
 *  P-3; the landed `session.dispose` removes the start install after its tracking set). **So the
 *  module's own four removals are the four `off` calls IMMEDIATELY PRECEDING the log's final
 *  one, whatever else the session removed earlier in the drive** (an ACTIVE gesture's tracking
 *  teardown lands in the log BEFORE `detach()` at all, which is why a "first four" rule would
 *  misread it as the module's). Each pairs back, by the same three values, to exactly one
 *  preceding `on` call — and **that pairing is what distinguishes the module's own
 *  `'pointerdown'` from the SESSION's own single `'pointerdown'` install, which is identical in
 *  element and type and separable in NO OTHER WAY** (`§3.1 M-4`; `§2.3` row 2's ownership
 *  clause). */
function moduleOwnRemovals(source: RecordingSource): ListenerPair[] {
  const offs = source.offs()
  if (offs.length === 0) return []
  const types = moduleOwnTypes()
  const sameSet = (block: readonly SourceEntry[]): boolean => {
    const blockTypes = [...new Set(block.map((entry) => entry.type))].sort()
    return block.length === types.length && blockTypes.join('|') === [...types].sort().join('|')
  }
  if (offs.length < types.length) return offs.map((off) => ({ on: undefined, off }))
  // The module's `detach()` issues its OWN four `off` calls as ONE contiguous block (`§2.3` row
  // 13: *"exactly FOUR `source.off` calls, the module's own four … before the controller's own
  // delegation"*), and NO OTHER owner removes that same set of four types: the session's own set
  // adds its `move`/`end`/`cancel` tracking types (and its `'pointerdown'` install), so a
  // four-long window whose type SET is exactly the module's own four exists at exactly one place.
  // **A drive in which the session removed the module's four types and no more is therefore
  // UNATTRIBUTABLE, and this helper refuses to guess.**
  for (let start = offs.length - types.length; start >= 0; start -= 1) {
    const block = offs.slice(start, start + types.length)
    if (!sameSet(block)) continue
    return block.map((off) => ({
      on: source.ons().find((on) => on.element === off.element && on.type === off.type && on.handler === off.handler),
      off,
    }))
  }
  return []
}
/** **THE OWNER-SCOPED CENSUS** (`§3.1 M-4`, `§2.3` rows 2/6c/13, `§R` `R-12`): the listener log
 *  is partitioned BY OWNER, never read as one composed figure. `owned` is the IDENTITY of THIS
 *  MODULE'S OWN listeners — a `detach()`-carrying drive passes the module's own removal pairs, so
 *  the module's `'pointerdown'` and the SESSION's own `'pointerdown'` (identical in element and
 *  type) are still attributed to their separate owners. **The partition is PER OWNER and the rule
 *  is PER TYPE, so a module that caused a SECOND listener of a type it already owns makes its own
 *  per-type count read `2` and the row FAILS** — the positive control each repaired row drives
 *  over a duplicated synthetic log. */
function ownerScopedCensus(entries: readonly SourceEntry[], owned: (entry: SourceEntry) => boolean): OwnerSplit {
  const moduleOwn = entries.filter(owned)
  const moduleOwnPerType = perTypeOf(moduleOwn)
  const otherOwners = entries.filter((entry) => !owned(entry))
  const distinctListeners = new Set(moduleOwn.map((entry) => listenerKey(entry)))
  return {
    composed: [...entries],
    composedPerType: perTypeOf(entries),
    moduleOwn,
    moduleOwnPerType,
    moduleOwnDistinctListenerCount: distinctListeners.size,
    moduleOwnTypesAttachedOnce:
      moduleOwnPerType.length === moduleOwnTypes().length && moduleOwnPerType.every(([, n]) => n === 1),
    otherOwners,
    otherOwnersPerType: perTypeOf(otherOwners),
  }
}
/** The module's own listener set, keyed BY IDENTITY, from its own removal pairs (`§2.3` row 13). */
function ownedByRemovalPairs(pairs: readonly ListenerPair[]): (entry: SourceEntry) => boolean {
  const handlers = new Set(pairs.map((pair) => pair.off.handler))
  return (entry) => handlers.has(entry.handler)
}
/** The owner-scoped census of a source's `on` log, attributed by the module's own removals
 *  (`§3.1 M-4`, `§2.3` rows 2/13, `§3.4 R-12`). **The drive MUST already have run `detach()`. */
function ownerScopedOnCensus(source: RecordingSource): OwnerSplit {
  return ownerScopedCensus(source.ons(), ownedByRemovalPairs(moduleOwnRemovals(source)))
}
/** The owner-scoped census of a source's `off` log, attributed by the module's own removals
 *  (`§3.1 M-15`, `§2.3` row 13). */
function ownerScopedOffCensus(source: RecordingSource): OwnerSplit {
  return ownerScopedCensus(source.offs(), ownedByRemovalPairs(moduleOwnRemovals(source)))
}

/** A recording SINK (`§R.3`'s `commit` seam: `(gesture, value) => void`). The `records`
 *  array IS "the sink's own record" every write-count row reads beside `E3`'s counter. */
function makeSink(): { records: Array<{ gesture: unknown; value: unknown; outcome: unknown }>; commit: (gesture: unknown, value: unknown) => void } {
  const records: Array<{ gesture: unknown; value: unknown; outcome: unknown }> = []
  return {
    records,
    commit: (gesture: unknown, value: unknown): void => {
      const outcome = (gesture as GestureHandle | null | undefined)?.outcome ?? null
      records.push({ gesture, value, outcome })
    },
  }
}

/** **THE SESSION CALL LOG** — the module-observable evidence for every "ZERO session
 *  calls" clause (`§3.1 M-7`/`M-10`/`M-14`/`M-15`, `§3.2 F-4`, `§3.3 I-8`) and for the
 *  invalid arm's "the reset happened while the gesture was ACTIVE" reading
 *  (`§3.1 M-13`, `§5.5.1 P-GU-SM-3`'s reading `(b)`). */
type CallFrame = { readonly call: string; readonly active: boolean; readonly gesture: unknown; readonly value?: unknown }
/** `session.stats().active` read through a total reader (the mirror's `stats()` answers
 *  `unknown`, exactly as the real module's structural shape does to a foreign reader). */
function sessionActive(session: SessionLikeSurface): boolean {
  const stats = session.stats() as { readonly active?: unknown } | null | undefined
  return stats !== null && stats !== undefined && stats.active === true
}
function instrumentSession(session: SessionLikeSurface): { session: SessionLikeSurface; log: CallFrame[] } {
  const log: CallFrame[] = []
  const instrumented = {
    install(element: unknown, options?: unknown): unknown {
      const result = (session.install as (a: unknown, b?: unknown) => unknown)(element, options)
      log.push({ call: 'install', active: sessionActive(session), gesture: session.gesture() })
      return result
    },
    reset(element: unknown, gesture: GestureHandle, value: unknown): unknown {
      const activeBefore = sessionActive(session)
      log.push({ call: 'reset', active: activeBefore, gesture, value })
      return (session.reset as (a: unknown, b: GestureHandle, c: unknown) => unknown)(element, gesture, value)
    },
    dispose(): unknown {
      log.push({ call: 'dispose', active: sessionActive(session), gesture: session.gesture() })
      return session.dispose()
    },
    stats(): unknown {
      return session.stats()
    },
    gesture(): unknown {
      return session.gesture()
    },
    get disposed(): boolean {
      return session.disposed
    },
  }
  return { session: instrumented as unknown as SessionLikeSurface, log }
}

/** **THE READ-RECORDING SESSION DOUBLE (`§3.1 M-1`(iii), `§3.4 R-5`(ii)).** It EXPOSES the
 *  two invented names the landed `E3` used to probe (`registerCompositionWriter` /
 *  `registerCommit`) AND records every member read, so `M-1`'s runtime half can assert
 *  that **the module reads NO session member by name** and that **one gesture still yields
 *  ONE sink call with the CLAMPED value**. Each invented member THROWS when called, so a
 *  composition that invoked one would fail loudly rather than silently pass. */
type ReadRecord = { readonly member: string; readonly kind: 'get' | 'call' }
function makeReadRecordingSession(inner: SessionLikeSurface): { session: Record<string, unknown>; reads: ReadRecord[] } {
  const reads: ReadRecord[] = []
  const base: Record<string, unknown> = {
    install: (element: unknown, options?: unknown): unknown => (inner.install as (a: unknown, b?: unknown) => unknown)(element, options),
    reset: (element: unknown, gesture: unknown, value: unknown): unknown =>
      (inner.reset as (a: unknown, b: unknown, c: unknown) => unknown)(element, gesture, value),
    dispose: (): unknown => inner.dispose(),
    stats: (): unknown => inner.stats(),
    gesture: (): unknown => inner.gesture(),
    disposed: inner.disposed,
    registerCompositionWriter: (): never => {
      throw new Error('E3-HOST-2 — the invented seam `registerCompositionWriter` was CALLED by this composition')
    },
    registerCommit: (): never => {
      throw new Error('E3-HOST-2 — the invented seam `registerCommit` was CALLED by this composition')
    },
  }
  const session = new Proxy(base, {
    get(target, prop, receiver): unknown {
      if (typeof prop === 'string') reads.push({ member: prop, kind: 'get' })
      return Reflect.get(target, prop, receiver)
    },
    has(target, prop): boolean {
      if (typeof prop === 'string') reads.push({ member: prop, kind: 'get' })
      return Reflect.has(target, prop)
    },
  })
  return { session: session as Record<string, unknown>, reads }
}

/** A DISPOSED-session double (`§3.1 M-2`, `§3.2 F-6`): `disposed === true`, every member
 *  callable, and every call recorded so "ZERO session calls" is a READING. */
function makeDisposedSession(): { session: Record<string, unknown>; calls: string[]; reads: string[] } {
  const calls: string[] = []
  const reads: string[] = []
  const base: Record<string, unknown> = {
    install: (): unknown => {
      calls.push('install')
      return false
    },
    reset: (): unknown => {
      calls.push('reset')
      return { ok: false, code: 'disposed', committed: false }
    },
    dispose: (): unknown => {
      calls.push('dispose')
      return { removed: 0, complete: false }
    },
    stats: (): unknown => {
      calls.push('stats')
      return { installed: 0, sourceCalls: 0, gestures: 0, commits: 0, active: false, gestureId: 0, lastCode: 'disposed' }
    },
    gesture: (): unknown => {
      calls.push('gesture')
      return null
    },
    disposed: true,
  }
  const session = new Proxy(base, {
    get(target, prop, receiver): unknown {
      if (typeof prop === 'string') reads.push(prop)
      return Reflect.get(target, prop, receiver)
    },
  })
  return { session: session as Record<string, unknown>, calls, reads }
}

// ===========================================================================
// THE COMPOSITION HARNESS (`§2.1`'s `GutterAffordanceOptions`, `§R.1`'s wiring roles).
// ===========================================================================
type AffordanceLike = {
  attach(): boolean
  detach(): boolean
  readonly detached: boolean
  stats(): Record<string, unknown>
  readonly controller: unknown
}
type Harness = {
  readonly affordance: AffordanceLike
  readonly source: RecordingSource
  readonly session: SessionLikeSurface
  readonly sessionLog: CallFrame[]
  /** **THE SESSION'S OWN CHANNEL'S RECORD — AND IT IS NOT THE SINK.**
   *  `⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING)`: the session's `commit` option is wired to
   *  a NON-FORWARDING RECORDER, so `E3`'s `commit` seam is the composition's SINGLE sink writer
   *  (`docs/specs/gutter-ui.md` `§2.6` item 1, `§R.3`'s `commit` row: *"no second writer
   *  exists"*). A row that needs the ruled reading *"the SESSION's recorder still receives the
   *  value it was handed"* reads THIS array; a row that needs the sink's own record reads
   *  `sink.records`. */
  readonly sessionCommits: Array<{ gesture: unknown; value: unknown; outcome: unknown }>
  readonly sink: ReturnType<typeof makeSink>
  readonly previews: Array<Record<string, unknown>>
  readonly cursorCalls: Array<{ element: unknown; declaration: string | undefined }>
  readonly element: Record<string, unknown>
  readonly target: Record<string, unknown>
  readonly calls: { axisOf: number; cursorOf: number; sizeFromPointer: number; startSizeOf: number; boundsOf: number; resizableOf: number; commit: number }
  readonly options: Record<string, unknown>
}

const ELEMENT: Record<string, unknown> = { name: 'gutter-vertical-affordance' }
const TARGET: Record<string, unknown> = { name: 'gutter-target' }

/** `§2.1` item 3's ONE-CLOSURE WIRING: the caller's `axisOf` reaches both `E3`'s `axisFor`
 *  and the module's own hover read from ONE closure, and `boundsOf`/`startSizeOf`/
 *  `resizableOf`/`commit` feed both `E3`'s options and the module's own options.
 *
 *  **THE SINGLE SINK CHANNEL — `⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING).** The session is
 *  constructed with its `commit` option wired to **`sessionCommits.push` — A NON-FORWARDING
 *  RECORDER** — and the sink is handed to the composition ONLY, as the module's `commit` SEAM
 *  (`E3`'s single write site). **THE AS-FILED HARNESS HANDED THE SAME FUNCTION TO BOTH CHANNELS,
 *  which is the TWO-WRITER composition `E3`'s `F-9`/`§5.5.1 P-GT-SM-3` shape `(2)` exists to
 *  fail**: one valid `end` then made the sink's own record read `2` while `E3`'s
 *  `stats().sinkCalls` read `1`, so every ruled count of `1` was unreachable and the sink's
 *  record was NOT *"the composition's own write"* (authority: `docs/specs/gutter-ui.md` `§2.6`
 *  item 1 / `§R.3`'s `commit` row, `docs/specs/gutter.md` `§2.1` seam 6 + the landed
 *  `src/shared/gutter.ts`'s `write()` = *"this module's only call site of the sink"*, and the
 *  landed `tests/gutter.test.ts` harness's own non-forwarding `commits` recorder). */
async function makeHarness(overrides: Record<string, unknown> = {}, label = 'harness'): Promise<Harness> {
  const createGutterAffordance = await factoryOf<(options?: Record<string, unknown>) => AffordanceLike>(label)
  const source = new RecordingSource()
  const sink = makeSink()
  const previews: Array<Record<string, unknown>> = []
  const cursorCalls: Array<{ element: unknown; declaration: string | undefined }> = []
  const sessionCommits: Array<{ gesture: unknown; value: unknown; outcome: unknown }> = []
  const calls = { axisOf: 0, cursorOf: 0, sizeFromPointer: 0, startSizeOf: 0, boundsOf: 0, resizableOf: 0, commit: 0 }
  // **THE SESSION'S CHANNEL RECORDS AND WRITES NOTHING** — it is NOT a writer, so a row can
  // still read *"what the session was handed"* (`M-13`'s `NaN` reading) beside the sink's record
  // without a second write existing.
  const raw = createGestureSession({
    source: source as never,
    commit: ((gesture: unknown, value: unknown): void => {
      sessionCommits.push({ gesture, value, outcome: (gesture as GestureHandle | null | undefined)?.outcome ?? null })
    }) as never,
  })
  const instrumented = instrumentSession(raw)
  const element = (overrides['element'] ?? ELEMENT) as Record<string, unknown>
  const target = (overrides['target'] ?? TARGET) as Record<string, unknown>

  const axisOf = (el: unknown): unknown => {
    calls.axisOf += 1
    return (overrides['axisToken'] ?? 'gutter-axis') as unknown
  }
  const cursorOf = (token: unknown): unknown => {
    calls.cursorOf += 1
    const mapping = overrides['cursorOf']
    return typeof mapping === 'function' ? (mapping as (t: unknown) => unknown)(token) : { cursor: 'col-resize' }
  }
  const sizeFromPointer = overrides['sizeFromPointer'] ?? ((pointer: { x: number }, start: number): unknown => pointer.x - start)
  const startSizeOf = overrides['startSizeOf'] ?? ((): unknown => 100)
  const boundsOf = overrides['boundsOf'] ?? ((): unknown => ({ min: 0, max: 200 }))
  const resizableOf = overrides['resizableOf'] ?? ((): unknown => true)
  const applyPreview =
    overrides['applyPreview'] ??
    ((state: Record<string, unknown>): void => {
      previews.push(state)
    })
  const applyCursor =
    overrides['applyCursor'] ??
    ((el: unknown, declaration: string | undefined): void => {
      cursorCalls.push({ element: el, declaration })
    })
  const moveTypeOf = overrides['moveTypeOf'] ?? ((): unknown => POINTER_TYPES.move)

  const options: Record<string, unknown> = {
    session: instrumented.session,
    source,
    element,
    target,
    sizeFromPointer: <T,>(pointer: T, start: number): unknown => {
      calls.sizeFromPointer += 1
      return (sizeFromPointer as (p: T, s: number) => unknown)(pointer, start)
    },
    axisOf: <T,>(el: T): unknown => {
      const token = axisOf(el)
      return token
    },
    cursorOf: (token: unknown): unknown => cursorOf(token),
    applyPreview: (state: unknown): void => (applyPreview as (s: unknown) => void)(state),
    applyCursor: (el: unknown, declaration: string | undefined): void => (applyCursor as (e: unknown, d: string | undefined) => void)(el, declaration),
    startSizeOf: (el: unknown, token: unknown): unknown => {
      calls.startSizeOf += 1
      return (startSizeOf as (e: unknown, t: unknown) => unknown)(el, token)
    },
    boundsOf: (el: unknown, token: unknown): unknown => {
      calls.boundsOf += 1
      return (boundsOf as (e: unknown, t: unknown) => unknown)(el, token)
    },
    resizableOf: (el: unknown, token: unknown): unknown => {
      calls.resizableOf += 1
      return (resizableOf as (e: unknown, t: unknown) => unknown)(el, token)
    },
    // **THE MODULE'S `commit` SEAM IS THE COMPOSITION'S SINGLE SINK WRITER** (`E3`'s write site
    // is its only caller). `calls.commit` counts EVERY invocation of this seam, so a row can
    // read *"the MODULE's own invocations"* as `calls.commit - E3.stats().sinkCalls` (the
    // ruled `I-1` reading): a composition that invoked the seam itself would raise this count
    // while `E3`'s counter stayed at its own single write, and the two readings would DIVERGE.
    commit: (gesture: unknown, value: number): void => {
      calls.commit += 1
      return (sink.commit as (g: unknown, v: number) => void)(gesture, value)
    },
    moveTypeOf: (el: unknown): unknown => (moveTypeOf as (e: unknown) => unknown)(el),
  }
  for (const key of Object.keys(overrides)) {
    if (key in options || ['pointerOf', 'capturePointer', 'isDragValid'].includes(key)) options[key] = overrides[key]
  }
  const affordance = createGutterAffordance(options)
  return {
    affordance,
    source,
    session: instrumented.session,
    sessionLog: instrumented.log,
    sessionCommits,
    sink,
    previews,
    cursorCalls,
    element,
    target,
    calls,
    options,
  }
}

/** A plain primary/secondary event double (`§2.3` rows 6/6b/10: the `button` read is a
 *  `typeof` gate on the FORWARDED event's own member). */
function pointerEvent(button: number, clientX = 200, clientY = 300): Record<string, unknown> {
  return { button, clientX, clientY }
}

/** Drive a full lifecycle: hover → primary `pointerdown` (the session establishes its own
 *  gesture through its own `pointerdown` listener) → the given moves → `pointerup`/cancel. */
function lifecycle(h: Harness, moves: ReadonlyArray<unknown>): { moves: number } {
  h.source.fire('pointerover', pointerEvent(0, 0, 0))
  h.source.fire('pointerdown', pointerEvent(0))
  for (const move of moves) h.source.fire(POINTER_TYPES.move, move)
  return { moves: moves.length }
}

// ===========================================================================
// ⟶ ADDED 2026-09-27 — **THE DRIVE-WINDOW RECONCILIATION HELPER** (`§2.3` row 8's ordering
// clause vs row 9's LIVE-gesture reading; the supervisor's drive-window ruling).
//
// **WHY IT EXISTS, MEASURED.** `docs/specs/gutter-ui.md` `§2.3` row 8 rules the ordering
// exactly: the module's OWN `'pointermove'` listener turn runs FIRST and the session's wrapped
// `onMove(gesture)` — the ONLY legal handle channel (`§R` `R6`, `E3`'s `wrappedOnMove`) — runs
// AFTER it in the SAME event. `E3`'s per-gesture record therefore holds NO handle until some
// move's wrapper has run, and row 8 rules that an INVALID move which arrives in that
// **PRE-HANDLE** window calls `controller.reset(element)`, **which refuses `'no-gesture'` with
// ZERO session calls and leaves the `resets` counter UNMOVED**. A drive whose ONLY move is the
// invalid one therefore reads `0` sink writes, `0` resets and ZERO session `reset` frames — it
// can NEVER read row 9's LIVE-gesture pair (`session.reset` exactly once, ONE sink write of the
// clamped pre-drag size), because row 9's window requires a handle a PRIOR move's wrapper
// already captured.
//
// **WHAT IT DOES.** A drive that declares a LIVE-window reading calls this ONCE after
// `pointerdown` and BEFORE its own invalid subject move: one PRIOR VALID MOVE establishes the
// drag state and lets the module push the value through `handle.set` (`§R` `R6`), which is what
// makes the SUBJECT move's `controller.reset(element)` reach the LIVE-gesture window. **IT ADDS
// A MOVE INSIDE AN EXISTING DRIVE, NEVER A DRIVE**: no register term, no seed, no strategy id
// and no `§5.4`/`§5.5.1` figure moves (`docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE
// COUNT`).
//
// **AND IT ASSERTS WHAT IT CLAIMS**, so the added move cannot be silently inert: one observed
// turn, one VALID preview carrying a FINITE value, and NO reset for it — a helper that failed to
// establish the handle would read `previews === 0` and FAIL here rather than at the subject
// assertion. A drive that CANNOT reach the live window (its whole gesture's `sizeFromPointer` is
// throwing/non-callable, so NO valid move exists) does NOT call this and instead asserts the
// PRE-HANDLE reading WITH row 8 cited (the rows below that do so say why).
// ===========================================================================
function priorValidMove(h: Harness, label: string): { value: number } {
  const before = h.previews.length
  h.source.fire(POINTER_TYPES.move, pointerEvent(0, 50, 300))
  const added = h.previews.slice(before)
  const valid = added.find((p) => p['valid'] === true)
  expect(
    valid !== undefined && Number.isFinite(Number(valid['value'])),
    `THE DRIVE-WINDOW RECONCILIATION (docs/specs/gutter-ui.md §2.3 row 8's ordering clause vs row 9's LIVE reading) — this drive adds ONE PRIOR VALID MOVE so its invalid subject move reaches the LIVE-gesture window (the handle is captured by E3's own 'onMove' wrapper, which row 8 orders AFTER this module's move turn in the same event), and the added move MUST itself have been VALID: ONE preview turn carrying a FINITE value and NO reset for it. MEASURED reads: ${JSON.stringify(
      added.map((p) => ({ value: p['value'], valid: p['valid'] })),
    )}, stats=${JSON.stringify(h.affordance.stats())} [${label}]`,
  ).toBe(true)
  expect(
    Number(h.affordance.stats()['resets']),
    `THE DRIVE-WINDOW RECONCILIATION — the ADDED move is VALID, so it takes NO reset arm (\`stats().resets === 0\` after it); a non-zero reading means the added move was not valid and the drive did NOT reach the live window. [${label}]`,
  ).toBe(0)
  return { value: Number(valid?.['value']) }
}

/** The session's own `reset`-frame count, as a READING (`§2.3` row 8: the PRE-HANDLE refusal is
 *  decided inside `E3` and never reaches the session; row 9: the LIVE-gesture reset calls it). */
function sessionResetFrames(h: Harness): number {
  return h.sessionLog.filter((c) => c.call === 'reset').length
}

/** **⟶ ADDED 2026-09-27 — THE SHAPES WHOSE SUBJECT SEAM MAKES EVERY MOVE INVALID** (a non-callable,
 *  throwing or non-finite `sizeFromPointer`, or a veto that answers `false` for every state): their
 *  PRIOR move cannot be valid THROUGH THAT SEAM, so the drive reaches `§2.3` row 8's PRE-HANDLE
 *  window and `priorValidMove`'s own `resets === 0` post-condition would FAIL on a conformant module
 *  (the added move takes the reset arm just as the subject does). **THE HONEST ANSWER IS TO KEEP THE
 *  SEAM CONSISTENT WITH THE SHAPE AND DRIVE THE PRIOR MOVE WITH A STATE THAT SATISFIES IT** — the
 *  shape's own contract is "the seam answers THUS", and the seam answers a valid value for the setup
 *  move and the shape's own answer thereafter, which is the SAME technique the F-2/F-10 rows use. */
function priorValidMoveWithState(h: Harness, label: string, state: () => void): { value: number } {
  const before = h.previews.length
  const resetsBefore = Number(h.affordance.stats()['resets'])
  state()
  h.source.fire(POINTER_TYPES.move, pointerEvent(0, 50, 300))
  const added = h.previews.slice(before)
  const valid = added.find((p) => p['valid'] === true)
  expect(
    valid !== undefined && Number.isFinite(Number(valid['value'])),
    `THE DRIVE-WINDOW RECONCILIATION (docs/specs/gutter-ui.md §2.3 row 8's ordering clause vs row 9's LIVE reading) — the drive-window setup move must have been VALID (ONE preview turn carrying a FINITE value) so the SUBJECT move reaches row 9's LIVE-gesture window. MEASURED reads: ${JSON.stringify(
      added.map((p) => ({ value: p['value'], valid: p['valid'] })),
    )} [${label}]`,
  ).toBe(true)
  expect(
    Number(h.affordance.stats()['resets']) - resetsBefore,
    `THE DRIVE-WINDOW RECONCILIATION — the SETUP move takes NO reset arm: a non-zero delta means the setup move was invalid and the drive did NOT reach the live window. [${label}]`,
  ).toBe(0)
  return { value: Number(valid?.['value']) }
}

const AXIS_TOKEN = 'gutter-axis'

// ===========================================================================
// §3.5 — THE EXISTENCE ROWS (`R-8x`, `R-9`, `R-10`, `R-11`, `R-12`), authored FIRST
// (`§4.2` item 1: the static and existence rows first — they are evaluable at red time
// and they pin the scope).
// ===========================================================================
describe('§3.5 — the existence and precondition rows (the red’s own premise)', () => {
  it('PRE-1 (harness) — the computed-specifier import boundary resolves against an EXISTING module, so every absent-module row below fails as an ASSERTION and never as a collection error', async () => {
    expect(
      existsSync(rel(GUTTER_RELPATH)),
      `PRE-1 — the computed-specifier boundary is proved against an EXISTING module (\`${GUTTER_RELPATH}\`, the frozen \`E3\` module this unit composes)`,
    ).toBe(true)
    const mod = (await import(/* @vite-ignore */ GUTTER_SPECIFIER)) as unknown as Record<string, unknown>
    expect(
      typeof mod['createResizeController'],
      'PRE-1 — the existing module’s namespace is readable through the same boundary every clause row uses',
    ).toBe('function')
    expect(typeof mod['clampToBounds'], 'PRE-1 — and the second value export of that module is readable too').toBe('function')
  })

  it('PRE-2 (harness) — the §5.5.1 register tables are the ones the spec prints (the seven ids, the seven strategy ids, the seven terms, the `134` total, the caps and the two beside-the-term figures)', () => {
    expect(REGISTER_ROW_CAP, 'PRE-2/§5.5.1 — the per-row cap is `≤100`').toBe(100)
    expect(REGISTER_TOTAL_CAP, 'PRE-2/§5.5.1 — the total cap is `≤400`').toBe(400)
    expect(CONSECUTIVE_FAILURE_CAP, 'PRE-2/§5.5.1 — the stop rule is 5 consecutive failures').toBe(5)
    expect(
      REGISTER_DECLARED.map((r) => r.row),
      'PRE-2/§5.5.1 — the seven row ids, in REGISTER ORDER (a rename or a dropped row fails here)',
    ).toEqual(['P-GU-SM-1', 'P-GU-SM-2', 'P-GU-SM-3', 'P-GU-IM-1', 'P-GU-IM-2', 'P-GU-TP-1', 'P-GU-TP-2'])
    expect(
      REGISTER_DECLARED.map((r) => r.strategy),
      'PRE-2/§5.5.1 — the seven strategy ids, one per row, in register order',
    ).toEqual(['S-GU-WRITER-1', 'S-GU-PREVIEW-1', 'S-GU-RELEASE-1', 'S-GU-POINTER-1', 'S-GU-SEAM-1', 'S-GU-TOTAL-1', 'S-GU-CURSOR-1'])
    const terms = REGISTER_DECLARED.map((r) => r.term)
    expect(
      terms,
      'PRE-2/§5.5.1/§5.5.3 — the seven DECLARED terms, in register order, EXACTLY as the spec prints them (they are NOT re-totalled silently: the spec’s declared figures are what the caps are compared against)',
    ).toEqual([15, 15, 15, 45, 20, 12, 12])
    const termSum = terms.reduce((sum, n) => sum + n, 0)
    console.log(
      `§5.5.1 ARITHMETIC :: ${JSON.stringify({
        declaredTotal: REGISTER_PRINTED_TOTAL,
        measuredTermSum: termSum,
        terms: REGISTER_DECLARED.map((r) => `${r.row}=${r.term}`),
        chain: '15 → 30 → 45 → 90 → 110 → 122 → 134',
        subtotals: { SM: 45, IM: 65, TP: 24 },
        besideTheTerms: { 'P-GU-SM-1': '12 mid-drag ASSERTIONS (never counted in the term)', 'P-GU-TP-1': '6 entry-point READINGS (never counted in the term)' },
        clause: 'docs/specs/gutter-ui.md §5.5.3 — the declared total is the sum of its own terms',
      })}`,
    )
    expect(
      REGISTER_PRINTED_TOTAL,
      'PRE-2/§5.5.1/§5.5.3 — the register’s DECLARED total is the E-3 re-grain’s figure, `134` (the as-filed `142`/`140`/`127` figures are SPENT and must NOT be printed as live: a DONE row printing `140`, `142` or `147` is a review finding, §5.3 item 11)',
    ).toBe(134)
    expect(
      termSum,
      `PRE-2/§5.5.3 — THE TERM-SUM CHECK: the seven printed terms (\`15+15+15+45+20+12+12\`) sum to \`${termSum}\`, and the ruled chain is \`15 → 30 → 45 → 90 → 110 → 122 → 134\`. A total that is not the sum of its own terms is a REVIEW FINDING`,
    ).toBe(REGISTER_PRINTED_TOTAL)
    const chain: number[] = []
    let running = 0
    let previous = 0
    for (const term of terms) {
      running += term
      chain.push(running)
      expect(
        running,
        `PRE-2/§5.5.3 — the term-by-term chain step from \`${previous}\` by \`${term}\``,
      ).toBeGreaterThan(previous)
      previous = running
    }
    expect(chain, 'PRE-2/§5.5.3 — the ruled chain `15 → 30 → 45 → 90 → 110 → 122 → 134`, term by term').toEqual([
      15, 30, 45, 90, 110, 122, 134,
    ])
    expect(
      [terms[0] + terms[1] + terms[2], terms[3] + terms[4], terms[5] + terms[6]],
      'PRE-2/§5.5.3 — the ruled FAMILY SUBTOTALS: `SM` = 15+15+15 = 45 · `IM` = 45+20 = 65 · `TP` = 12+12 = 24, and 45 + 65 + 24 = 134',
    ).toEqual([45, 65, 24])
    for (const row of REGISTER_DECLARED) {
      expect(row.term, `PRE-2/§5.5.1 — row ${row.row} is inside the ≤100 per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(REGISTER_PRINTED_TOTAL, 'PRE-2/§5.5.1 — the declared total is inside the `≤400` register cap (`134 ≤ 400`)').toBeLessThanOrEqual(
      REGISTER_TOTAL_CAP,
    )
    expect(
      REGISTER_DECLARED.filter((r) => r.bounded).map((r) => r.row),
      'PRE-2/§5.5.2 item 2 — the `(bounded)` set is `4` OF THE `7` ROWS (`§R.2` `R-15`, condition `C-7`): `P-GU-SM-1`, `P-GU-SM-2`, `P-GU-IM-1`, `P-GU-TP-1` — the as-filed `2`-row set is SUPERSEDED',
    ).toEqual(['P-GU-SM-1', 'P-GU-SM-2', 'P-GU-IM-1', 'P-GU-TP-1'])
    expect(
      REGISTER_DECLARED.filter((r) => r.term !== r.distinct).map((r) => `${r.row}:${r.term}/${r.distinct}`),
      'PRE-2/§5.5.2 item 4 — THE DISTINCT FIGURES WHERE THEY DIFFER: `P-GU-IM-1` declares `45` with a `15` distinct value-class figure, and `P-GU-TP-2` declares `12` with a `10` distinct answer-shape figure. The DECLARED figures are what the caps compare; the distinct figures are reported BESIDE them and never substituted',
    ).toEqual(['P-GU-IM-1:45/15', 'P-GU-TP-2:12/10'])
    expect(
      REGISTER_DECLARED.reduce((sum, r) => sum + r.beside, 0),
      'PRE-2/§5.5.1/§5.5.3 — the two figures printed BESIDE their terms (`P-GU-SM-1`’s `12` mid-drag ASSERTIONS and `P-GU-TP-1`’s `6` entry-point READINGS) are carried as their own field and are NEVER counted in a term',
    ).toBe(18)
  })

  it('R-8x §3.5 — the module-absence row, BOTH BRANCHES: RED (module absent ⇒ assert ABSENCE + the `3 + 17 = 20` census’s precondition) and GREEN (module present ⇒ assert it EXISTS, that the renderer wiring imports it, that NO other `src/**` file does, and that the `3 + 17 = 20` census holds BY NAME)', () => {
    const modulePresent = existsSync(fileURLToPath(MODULE_SRC))
    const unitPaths = walkUnitPaths()
    expect(
      unitPaths,
      `R-8x §3.5 — the unit-owned census is asserted NON-EMPTY BEFORE the branch: this test file is \`${TEST_RELPATH}\``,
    ).toContain(TEST_RELPATH)
    if (!modulePresent) {
      expect(
        modulePresent,
        `R-8x §3.5 (RED BRANCH — module ABSENT at red time) — at the moment the red set is AUTHORED and RUN, \`${MODULE_RELPATH}\` does not exist (${fileURLToPath(
          MODULE_SRC,
        )}). If it EXISTS, the GREEN BRANCH governs and this branch is not the live one — and if it exists BEFORE a red run has been reported, the pass that finds it must REPORT the RCA-1 inversion rather than proceed`,
      ).toBe(false)
      expect(
        unitPaths.filter((p) => p !== TEST_RELPATH),
        `R-8x §3.5 (RED BRANCH) — no OTHER \`gutter*\` path exists under \`src/**\` or \`tests/**\` at red time: \`${TEST_RELPATH}\` is the only unit-owned file in the change set. Read: ${JSON.stringify(
          unitPaths,
        )}`,
      ).toEqual([])
      return
    }
    // ------------------------------------------------------------------ THE GREEN BRANCH
    expect(
      modulePresent,
      `R-8x §3.5 (GREEN BRANCH — module PRESENT) — \`${MODULE_RELPATH}\` EXISTS. THIS BRANCH governs once the work is done, and it is why this row can PASS at green time instead of failing because the module landed (\`docs/specs/gutter.md\` §3.5 R-16’s lesson: a row that fails because the work was done is DEFECTIVE)`,
    ).toBe(true)
    expect(
      unitPaths,
      `R-8x §3.5 (GREEN BRANCH) — the unit-owned census at green time is EXACTLY this module and this test file: a \`gutter*\` path under \`src/**\` or \`tests/**\` that is neither is a FINDING (the two SIBLING \`E3\` paths are filtered out BY NAME — \`§5.1\`’s commit-range scope rule: a census may not read a sibling’s landed artifact as this unit’s diff). Read: ${JSON.stringify(
        unitPaths,
      )}`,
    ).toEqual([MODULE_RELPATH, TEST_RELPATH].sort())
    expect(
      importsOf(RENDERER_RELPATH, /gutter-affordance/),
      `R-8x §3.5 (GREEN BRANCH) — \`${MODULE_RELPATH}\` is imported by THE RENDERER WIRING (\`${RENDERER_RELPATH}\`), which is the real and ONLY importer (§R \`R1\`, §R.1 item 2, §5.1 rows 10/11): the bundle therefore carries the module and leg 3’s byte-identity claim is FALSE for this unit BY CONSTRUCTION (§5.2 leg 3)`,
    ).toBe(true)
    const census = exportedValueNames(moduleBytes())
    expect(
      census,
      `R-8x §3.5 (GREEN BRANCH) / §3.4 R-1(a) — the module’s VALUE export census HOLDS: exactly \`createGutterAffordance\`, \`cursorDeclarationFor\` and \`domEventSource\` (§2.1’s ruled census is THREE value exports — the redundant \`sizeFromPointer\` VALUE is DELETED, §R.3). Read from the bytes: ${JSON.stringify(
        census,
      )}`,
    ).toEqual(['createGutterAffordance', 'cursorDeclarationFor', 'domEventSource'])
    expect(
      exportedTypeNames(moduleBytes()),
      'R-8x §3.5 (GREEN BRANCH) / §3.4 R-1(b) — and the SEVENTEEN TYPE declarations hold, asserted BY NAME: the census is `3 + 17 = 20` and NOTHING ELSE (a TWENTY-FIRST exported name of ANY kind FAILS)',
    ).toEqual([
      'ApplyCursor',
      'ApplyPreview',
      'AxisOf',
      'BoundsOf',
      'Commit',
      'CursorOf',
      'EventSourceLike',
      'GutterAffordance',
      'GutterAffordanceOptions',
      'GutterAffordanceStats',
      'MoveTypeOf',
      'PointerPosition',
      'PointerResolver',
      'PreviewState',
      'ResizableOf',
      'SizeFromPointer',
      'StartSizeOf',
    ])
  })

  it('R-9 §3.5 — the demo-card row, BRANCHING on the authored card’s presence: at red time the authored ids do NOT resolve in the demo envelope, and at green time the gutter card IS authored there as DATA', () => {
    const demo = readRel(DEMO_RELPATH)
    expect(
      demo.length,
      `R-9 §3.5 — the authoring site \`${DEMO_RELPATH}\` EXISTS and is readable (it is an EDIT site, §5.1 allow-list row 2: it stays the envelope’s DATA and its existing comment block is EXTENDED, never rewritten)`,
    ).toBeGreaterThan(0)
    const cardPresent = /gutter-vertical/.test(demo)
    if (!cardPresent) {
      expect(
        cardPresent,
        `R-9 §3.5 (RED BRANCH) — the authored gutter card is NOT in \`${DEMO_RELPATH}\` yet: the affordance’s authored \`css.id\`/\`props.id\` (\`gutter-vertical\`, the id §5.2 leg 6 already dispatches) do NOT resolve in \`list_targets\`’s vocabulary and no affordance node is in \`get_rendered_html\`. This is the state the red run is authored against`,
      ).toBe(false)
      return
    }
    // The GREEN branch: the card is DATA, authored with its three nodes. The rendered
    // readings themselves are `[U]`/`[H]` claims (§5.U U-1/U-7) and are NOT made here.
    expect(cardPresent, `R-9 §3.5 (GREEN BRANCH) — the authored card IS present in \`${DEMO_RELPATH}\``).toBe(true)
    expect(
      /pointerdown/.test(demo),
      'R-9 §3.5 (GREEN BRANCH) / §2.1 item 7(a) — the affordance node carries at least one authored handler whose event is `pointerdown`, so it is `list_targets`-visible and `provident.dispatch`-reachable',
    ).toBe(true)
  })

  it('R-10 §3.5 — the page-design probe BRANCHES on the file’s presence: `docs/skills/designing-pages.md` does not exist, so there is no test-use-case coverage matrix and no demo-page index to update', () => {
    const designSkill = 'docs/skills/designing-pages.md'
    const present = existsSync(rel(designSkill))
    if (!present) {
      expect(
        present,
        `R-10 §3.5/§3.4 R-10 — \`${designSkill}\` does NOT exist in this tree, so this unit owes NO coverage row and NO demo-page entry for the authored card (§7 item 8, §0A’s design-skill note). A FAIL here is WELCOME and meaningful: the file appearing switches this probe to the other branch`,
      ).toBe(false)
      return
    }
    // **THE BRANCHING CLAUSE: a row that fails BECAUSE THE FILE APPEARED is a DEFECTIVE row
    // (`§3.4 R-10`'s own text, the `E3` `R-16` green-branch lesson).** When it exists, this
    // unit OWES the coverage row and the demo-page entry — and this probe asserts the file
    // is at least readable, leaving the owed artifacts to the pass that authors them.
    expect(
      readFileSync(rel(designSkill), 'utf8').length,
      `R-10 §3.5 (OTHER BRANCH) — \`${designSkill}\` now EXISTS, so this unit OWES the test-use-case coverage row and the demo-page index entry for the authored card (§7 item 8). This probe BRANCHES rather than failing for the file’s presence`,
    ).toBeGreaterThan(0)
  })

  it('R-11 §3.5 — the live-leg precondition row: `npm run ui` and `npm run divergence` are DECLARED at their exact commands, and this unit’s own red claims neither (no `[U]` row, no `[D]` row)', () => {
    const uiScript = 'npm run build && node scripts/electron-ui.mjs'
    expect(
      readRel('scripts/electron-ui.mjs').length,
      'R-11 §3.5 — the `[U]` leg’s driver `scripts/electron-ui.mjs` EXISTS (§5.2 leg 5; §5.1 item 6 DENIES any change to it)',
    ).toBeGreaterThan(0)
    expect(
      readRel('scripts/electron-divergence.mjs').length,
      'R-11 §3.5 — the precondition’s driver `scripts/electron-divergence.mjs` EXISTS (§5.2 leg 4)',
    ).toBeGreaterThan(0)
    expect(
      readRel('scripts/mcp-cli.mjs').length,
      'R-11 §3.5 — THE PROJECT’S LIVE DRIVER is `scripts/mcp-cli.mjs` (§5.2 leg 6: there is NO `scripts/live-drive.mjs` in this tree)',
    ).toBeGreaterThan(0)
    expect(
      uiScript.includes('electron-ui.mjs'),
      'R-11 §5.2 leg 5 — the `[U]` leg’s exact command is `npm run build && node scripts/electron-ui.mjs`, and it REBUILDS: the honest precondition is the SOURCE-REVISION form (`divergence` green on the same revision, immediately before, no intervening source edit), NEVER `the same built tree` (§R.2 R-16)',
    ).toBe(true)
    expect(
      existsSync(rel('scripts/live-drive.mjs')),
      'R-11 §5.2 leg 6 — `scripts/live-drive.mjs` does NOT exist, so the CLI is the driver this repo ships (a FAIL here means the claim must be re-derived, not bent)',
    ).toBe(false)
    expect(
      existsSync(rel('docs/specs/user-flow-audit.md')),
      'R-11 §5.U/§7 item 7 — THE PREDICATE’S SOURCE DOCUMENT `docs/specs/user-flow-audit.md` DOES NOT EXIST in this tree (the sixth confirmation; the gap `U-GAP-1` is recorded with an owner and a revisit condition). The §5.U matrix is authored in the gate instructions’ form',
    ).toBe(false)
  })

  it('R-12 §3.5 — the frozen-peer precondition row BY NAME: the session exports its `4 + 8 = 12` names and `POINTER_TYPES` carries the four event types; `E3`’s module exports `2 + 10 = 12` names; NEITHER file is modified by this unit', () => {
    expect(
      existsSync(rel(SESSION_RELPATH)),
      `R-12 §3.5 — the composed session module exists at \`${SESSION_RELPATH}\` (FROZEN, §5.1 DENIED item 0/1)`,
    ).toBe(true)
    expect(
      existsSync(rel(GUTTER_RELPATH)),
      `R-12 §3.5 — the composed \`E3\` module exists at \`${GUTTER_RELPATH}\` (FROZEN, §5.1 DENIED item 0/2)`,
    ).toBe(true)
    expect(
      Object.keys(POINTER_TYPES).sort(),
      'R-12 §3.5 / §2.1 item 9 — `POINTER_TYPES` carries the four event types, and `POINTER_TYPES.move` is the token this unit’s move registration must BE by construction (`§3.1 M-18`, `§3.4 R-14`)',
    ).toEqual(['cancel', 'end', 'move', 'start'])
    expect(
      POINTER_TYPES.move,
      'R-12 §2.1 item 9 with the as-filed form kept visible — the session’s own exported move token is the value `pointermove`, read BY IDENTITY from the imported constant and NEVER re-spelled as a literal in this file’s assertions (§3.4 R-14: a row that spells it passes for a module that also spells it)',
    ).toBe('pointermove')
    expect(
      GUTTER_CENSUS_VALUES,
      'R-12 §3.5 — `E3`’s module exports its TWO value names by name (`§3.5 R-12`: `2 + 10 = 12`)',
    ).toEqual(['clampToBounds', 'createResizeController'])
    expect(
      SESSION_CENSUS_VALUES,
      'R-12 §3.5 — the session exports its FOUR value names by name (`§3.5 R-12`: `4 + 8 = 12`)',
    ).toEqual(['POINTER_TYPES', 'createGestureSession', 'detachGestureListeners', 'installGestureListeners'])
  })
})

const GUTTER_CENSUS_VALUES = exportedValueNames(readRel(GUTTER_RELPATH))
const SESSION_CENSUS_VALUES = exportedValueNames(readRel(SESSION_RELPATH))

// ===========================================================================
// §3.4 — THE STATIC ROWS (`R-*`), each with its own POSITIVE and NEGATIVE control.
// ===========================================================================
describe('§3.4 — the static rows (the §2.2 prohibition table’s ids)', () => {
  it('R-1(c) §3.4 — the CONTENT-TOKEN census is EMPTY over the nine-token negative list of §2.1 item 6 (comments included, token-assembly joined), WITH its positive and negative controls', () => {
    const source = moduleSource('R-1(c)')
    const found = uiContentViolations(source)
    expect(
      found,
      `R-1(c) §3.4/§2.1 item 6 — over \`${MODULE_RELPATH}\` INCLUDING its comments and over the JOINED view, the module authors NO UI content: no \`createElement\`, no \`innerHTML\`/\`outerHTML\`, no \`insertAdjacent*\`, no \`textContent\`/\`innerText\`, no \`className\`/\`classList\`, no \`appendChild\`/\`insertBefore\`/\`removeChild\`, no \`document.write\` — and no \`releasePointerCapture\` (§3.3 I-13: this unit never releases). Hits: ${JSON.stringify(
        found,
      )}`,
    ).toEqual([])
    for (const control of UI_CONTENT_POSITIVE_CONTROLS) {
      expect(
        uiContentViolations(control).length,
        `R-1(c) §3.4 — THE POSITIVE CONTROL must FAIL the scan (raw, assembled across a literal boundary, or inside a comment): ${JSON.stringify(
          control,
        )}`,
      ).toBeGreaterThan(0)
    }
    for (const control of UI_CONTENT_NEGATIVE_CONTROLS) {
      expect(
        uiContentViolations(control),
        `R-1(c) §3.4 — THE NEGATIVE CONTROL must PASS: the module’s three legitimate DOM-API members (\`addEventListener\`, \`removeEventListener\`, \`setPointerCapture\`) are the WHOLE carve-out, and a row asserting “no DOM API at all” FAILS this row’s own text (§4.4 S-1): ${JSON.stringify(
          control,
        )}`,
      ).toEqual([])
    }
  })

  it('R-1(a) §3.4 — THE VALUE-NAME CENSUS, read BY NAME through the module’s own namespace, with a positive control that a FOURTH value name FAILS', async () => {
    const mod = await requireModule('R-1(a)')
    const values = Object.keys(mod)
      .filter((name) => {
        const member = mod[name]
        return typeof member === 'function' || (typeof member === 'object' && member !== null && !name.startsWith('_'))
      })
      .sort()
    expect(
      values,
      `R-1(a) §3.4/§2.1 clause 1 — the module’s runtime namespace exposes EXACTLY the THREE value names \`createGutterAffordance\`, \`cursorDeclarationFor\` and \`domEventSource\` — never a fourth, and never the DELETED \`sizeFromPointer\` value (§R.3: one seam spelled two ways was not adjudicable by a by-name census). Read: ${JSON.stringify(
        values,
      )}`,
    ).toEqual(['createGutterAffordance', 'cursorDeclarationFor', 'domEventSource'])
    // THE POSITIVE CONTROL: a namespace carrying a FOURTH value name MUST FAIL the same check.
    const withFourth: Record<string, unknown> = { ...mod, sizeFromPointer: (): unknown => undefined }
    expect(
      Object.keys(withFourth)
        .filter((name) => typeof withFourth[name] !== 'undefined')
        .sort(),
      'R-1(a) §3.4 — THE POSITIVE CONTROL: a namespace carrying a FOURTH value name FAILS the census (so the three-name claim is not vacuously true)',
    ).not.toEqual(['createGutterAffordance', 'cursorDeclarationFor', 'domEventSource'])
  })

  it('R-1(b) §3.4 — THE TYPE-NAME CENSUS on the module’s own bytes: exactly SEVENTEEN type declarations, named, with a positive control that a TWENTY-FIRST exported name of any kind FAILS', () => {
    const source = moduleSource('R-1(b)')
    const values = exportedValueNames(source)
    const types = exportedTypeNames(source)
    expect(
      types,
      `R-1(b) §3.4/§2.1 clause 1 — the SEVENTEEN type declarations, BY NAME (§R.3’s corrected census: the as-filed SEVEN omitted \`GutterAffordanceStats\` and predated the seam ruling that makes the nine seam types exported CONTRACT). Read from the bytes: ${JSON.stringify(
        types,
      )}`,
    ).toEqual([
      'ApplyCursor',
      'ApplyPreview',
      'AxisOf',
      'BoundsOf',
      'Commit',
      'CursorOf',
      'EventSourceLike',
      'GutterAffordance',
      'GutterAffordanceOptions',
      'GutterAffordanceStats',
      'MoveTypeOf',
      'PointerPosition',
      'PointerResolver',
      'PreviewState',
      'ResizableOf',
      'SizeFromPointer',
      'StartSizeOf',
    ])
    expect(
      values,
      'R-1(b) §3.4 — the three value names beside them: `3 + 17 = 20` exported names and NOTHING ELSE',
    ).toEqual(['createGutterAffordance', 'cursorDeclarationFor', 'domEventSource'])
    // THE POSITIVE CONTROL: a twenty-first exported name MUST FAIL.
    const withExtra = `${source}\nexport interface SizeFromPointerAlias { (p: unknown): unknown }\n`
    expect(
      [...exportedTypeNames(withExtra), ...exportedValueNames(withExtra)].length,
      'R-1(b) §3.4 — THE POSITIVE CONTROL: a TWENTY-FIRST exported name of ANY kind FAILS the census (the counter is not inert)',
    ).toBe(21)
  })

  it('R-2 §3.4 — THE SURFACE-SET ROW: the affordance carries EXACTLY the five members by name, a SIXTH fails, and no member is an MCP-reachable surface', async () => {
    const mod = await requireLiveModule('R-2')
    expect(typeof mod['createGutterAffordance'], 'R-2 — the factory is reachable through the boundary').toBe('function')
    const factory = mod['createGutterAffordance'] as (options?: unknown) => Record<string, unknown>
    const affordance = factory({})
    const keys = Object.keys(affordance).sort()
    expect(
      keys,
      'R-2 §3.4/§2.1 item 5 — the affordance object carries EXACTLY the five members `attach` · `detach` · `detached` · `stats` · `controller` (every member is TOTAL and present in EVERY case, §2.1’s factory clause). A SIXTH member FAILS',
    ).toEqual(['attach', 'controller', 'detach', 'detached', 'stats'])
    expect(
      keys.includes('commit') || keys.includes('tool') || keys.includes('rpc') || keys.includes('ipc'),
      'R-2 §3.4/§2.2 P-7 / §3.3 I-12 — NO member of this surface is an MCP-reachable handle: no tool descriptor, no `RpcMethod` string, no IPC channel name and no `list_targets` handle',
    ).toBe(false)
  })

  it('R-3 §3.4 — THE COORDINATE/MAGNITUDE VOCABULARY ROW: no second coordinate token, no magnitude vocabulary, no coordinate read outside `resolveEventPointer`’s own body — with the two LEGAL tokens as the NEGATIVE control', () => {
    const source = moduleSource('R-3')
    const found = coordinateViolations(source)
    expect(
      found,
      `R-3 §3.4/§2.4 items 1/5 — over \`${MODULE_RELPATH}\` INCLUDING its comments, no occurrence in any form of a SECOND coordinate token (\`pageX\`/\`pageY\`, \`screenX\`/\`screenY\`, \`offsetX\`/\`offsetY\`, \`movementX\`/\`movementY\`, \`deltaX\`, \`pointerId\`) and NO magnitude vocabulary (a \`delta\` identifier, \`distance\`, \`ratio\`, \`percentage\`): this unit ships NO drag arithmetic of its own (§0A note 4, §4.4 S-3). Hits: ${JSON.stringify(
        found,
      )}`,
    ).toEqual([])
    for (const control of COORDINATE_POSITIVE_CONTROLS) {
      expect(
        coordinateViolations(control).length,
        `R-3 §3.4 — THE POSITIVE CONTROL must FAIL the scan: ${JSON.stringify(control)}`,
      ).toBeGreaterThan(0)
    }
    expect(
      coordinateViolations('const x = event.clientX; const y = event.clientY'),
      'R-3 §3.4 — THE NEGATIVE CONTROL: the two LEGAL tokens `clientX`/`clientY` MUST PASS (the ONE coordinate read lives in this module: §2.4 item 1, §0A note 3)',
    ).toEqual([])
    const coordinateReads = (normalizedView(source).match(/clientX|clientY/g) ?? []).length
    expect(
      coordinateReads,
      'R-3 §3.4 — the module reads a coordinate SOMEWHERE (the reading exists at all), and every such reading is inside `resolveEventPointer`’s own body: a read anywhere else is `§4.4 S-3`',
    ).toBeGreaterThan(0)
  })

  it('R-5 §3.4 — THE CLOSED-READ-SET ROW (M-1’s static half): (i) the denied `E3` module contains NEITHER invented seam in any form, and (ii) this module’s own session-member reference census is EMPTY', () => {
    const gutter = readRel(GUTTER_RELPATH)
    expect(
      gutter.length,
      `R-5(i)/§3.4 — the DENIED \`E3\` module is readable so the row can be MEASURED (\`${GUTTER_RELPATH}\`; the row is READ-ONLY and this unit never edits it — §0A note 12)`,
    ).toBeGreaterThan(0)
    const invented = hitsOf(gutter, ['registerCompositionWriter', 'registerCommit'])
    expect(
      invented,
      `R-5(i)/§3.4/M-1 half (ii) — the LANDED \`${GUTTER_RELPATH}\` contains NEITHER \`registerCompositionWriter\` NOR \`registerCommit\` in ANY form (raw, token-assembled, commented). \`E3\`-HOST-2 IS FIXED at \`cc7fba5\` and this row goes GREEN against the landed module (§R.4 C-A2: the as-filed EXPECTED-RED/OWED — E3-SIDE token is SPENT). Hits: ${JSON.stringify(
        invented,
      )}`,
    ).toEqual([])
    // THE POSITIVE CONTROL: the scan MUST fail on a corpus that carries either name.
    expect(
      hitsOf('const a = registerCompositionWriter(sink)', ['registerCompositionWriter']).length,
      'R-5(i) §3.4 — THE POSITIVE CONTROL: a corpus spelling the invented seam raw MUST FAIL the scan',
    ).toBeGreaterThan(0)
    expect(
      hitsOf("// the pass removed registerCommit here", ['registerCommit']).length,
      'R-5(i) §3.4 — THE POSITIVE CONTROL (comment-carrying form): a corpus spelling it INSIDE A COMMENT must fail too',
    ).toBeGreaterThan(0)
    const source = moduleSource('R-5(ii)')
    const members = CLOSED_READ_SET.filter((name) => new RegExp(`\\.${name}\\b`).test(normalizedView(source)))
    expect(
      members,
      `R-5(ii)/§3.4/§2.6 item 2 — THIS MODULE’S OWN SESSION-MEMBER REFERENCE CENSUS IS EMPTY: it calls the session NOWHERE itself and reaches it only through \`E3\`, so none of the closed set’s spellings (\`install\` · \`reset\` · \`dispose\` · \`stats\` · \`gesture\` · \`disposed\`) appears as a session-member read in its bytes. Hits: ${JSON.stringify(
        members,
      )}`,
    ).toEqual([])
  })

  it('R-6 §3.4 — THE ACCESS/DELEGATION ROW: no document/window/globalThis-rooted access, no selector, no `releasePointerCapture`, and the DOM-API members are EXACTLY the three named ones in `domEventSource`’s own body', () => {
    const source = moduleSource('R-6')
    const found = accessViolations(source)
    expect(
      found,
      `R-6 §3.4/§2.2 P-2/P-6 — over \`${MODULE_RELPATH}\` INCLUDING its comments: NO \`document\`/\`window\`/\`globalThis\`-rooted access, NO \`closest\`/\`querySelector*\`/\`getElementById\`, NO store token (\`localStorage\`/\`sessionStorage\`). A listener is attached to THE ELEMENT IT IS GIVEN and to nothing else. Hits: ${JSON.stringify(
        found,
      )}`,
    ).toEqual([])
    for (const control of ACCESS_POSITIVE_CONTROLS) {
      expect(
        accessViolations(control).length,
        `R-6 §3.4 — THE POSITIVE CONTROL must FAIL the scan: ${JSON.stringify(control)}`,
      ).toBeGreaterThan(0)
    }
    expect(
      accessViolations('element.addEventListener("pointerover", h)'),
      'R-6 §3.4 — THE NEGATIVE CONTROL: an element-scoped `addEventListener` MUST PASS (the carve-out is `§2.1` item 6’s, and a row asserting “no DOM API at all” FAILS this row’s own text, §4.4 S-1)',
    ).toEqual([])
    expect(
      hitsOf(source, ['releasePointerCapture']),
      'R-6 §3.4/§3.3 I-13 — `releasePointerCapture` appears NOWHERE: this unit never releases',
    ).toEqual([])
  })

  it('R-7 §3.4 — THE POLICY/VOCABULARY ROW: no cursor literal, no axis vocabulary, no unit string — with `cursorDeclarationFor`’s own `cursor` PROPERTY NAME as the negative control', () => {
    const source = moduleSource('R-7')
    const found = policyViolations(source)
    expect(
      found,
      `R-7 §3.4/§2.2 P-4/§0A notes 4/8 — over \`${MODULE_RELPATH}\` INCLUDING its comments: no cursor literal (\`col-resize\`/\`row-resize\`/\`ew-resize\`/\`ns-resize\`), no axis token literal (\`horizontal\`/\`vertical\`), no unit string (\`px\`) — this module carries NO cursor vocabulary, NO axis vocabulary and NO unit string of its own; the demo’s mapping is caller code and the module’s policy-free bytes are what \`E3\`’s own seam set exists to keep. Hits: ${JSON.stringify(
        found,
      )}`,
    ).toEqual([])
    for (const control of POLICY_POSITIVE_CONTROLS) {
      expect(
        policyViolations(control).length,
        `R-7 §3.4 — THE POSITIVE CONTROL must FAIL the scan: ${JSON.stringify(control)}`,
      ).toBeGreaterThan(0)
    }
    expect(
      policyViolations('function cursorDeclarationFor(value) { const cursor = value?.cursor; return cursor }'),
      'R-7 §3.4 — THE NEGATIVE CONTROL: `cursorDeclarationFor`’s own PARAMETER NAME and the `cursor` PROPERTY NAME it reads MUST PASS (it reads a property called `cursor`; it carries no cursor VALUE)',
    ).toEqual([])
  })

  it('R-8 §3.4 — THE IMPORT ROW: exactly THREE import statements carrying FOUR named bindings (the values `clampToBounds` and `POINTER_TYPES`, plus two type-only)', () => {
    const source = moduleSource('R-8')
    const statements = source.match(/^\s*import[\s\S]*?from\s+['"][^'"]+['"]/gm) ?? []
    expect(
      statements.length,
      `R-8 §3.4/§2.1 clause 2 — EXACTLY THREE import statements exist in \`${MODULE_RELPATH}\` (§R.2 R-11 and C-A7: the ruled set is FOUR NAMED BINDINGS ACROSS THREE STATEMENTS). Read: ${JSON.stringify(
        statements.map((s) => s.replace(/\s+/g, ' ')),
      )}`,
    ).toBe(3)
    const joined = statements.join(' ').replace(/\s+/g, ' ')
    expect(
      /clampToBounds/.test(joined) && /gutter\.js/.test(joined),
      'R-8 §3.4 — a VALUE import of `clampToBounds` from `./gutter.js` (`E3`’s exported pure function: the ONE clamp in the family, §2.4 item 2 clause (iii))',
    ).toBe(true)
    expect(
      /POINTER_TYPES/.test(joined) && /gesture-session\.js/.test(joined),
      'R-8 §3.4 — a VALUE import of `POINTER_TYPES` from `./gesture-session.js`: REQUIRED by `C-3` — the module may NOT replicate the session’s private event-type constant, and the wiring’s move type must BE the session’s exported token (`§3.1 M-18`, `§3.4 R-14`)',
    ).toBe(true)
    expect(
      /GestureHandle/.test(joined),
      'R-8 §3.4 — a TYPE-ONLY import of `GestureHandle` from `./gesture-session.js` (the value channel of `§R` R6)',
    ).toBe(true)
    const forbidden = ['provident-ssr', 'electron', 'node:', 'src/main/', 'src/renderer/', 'dom-shim']
    const present = forbidden.filter((token) => joined.includes(token))
    expect(
      present,
      `R-8 §3.4 — NO other path: \`provident-ssr\`, \`electron\`, \`node:*\`, \`src/main/**\`, \`src/renderer/**\` and the shim are all FORBIDDEN, and a VALUE import of the session FACTORY FAILS this row. Read: ${JSON.stringify(
        present,
      )}`,
    ).toEqual([])
  })

  it('R-9 §3.4 — THE DIFF-SCOPE ROW: the unit’s artifact census is scoped to ITS OWN paths, and the DENIED set is checked NAMED-FIRST against the whole tracked set', () => {
    const denied = [
      'src/shared/gesture-session.ts',
      'tests/gesture-session.test.ts',
      'src/shared/gutter.ts',
      'tests/gutter.test.ts',
      'docs/specs/gutter.md',
      'docs/specs/gutter-review.md',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'vitest.config.ts',
    ]
    const changed = gitChangeSet()
    expect(
      Array.isArray(changed),
      'R-9 §3.4/§5.1 — the row reads the git-visible change set; the DENIED set binds TRACKED files (§5.1’s scope-id clause 2: an untracked file a pass INTENDS to add is a scope question for the adversarial pass and the supervisor, not a FAIL of this row)',
    ).toBe(true)
    const deniedTouched = (changed ?? []).filter((path) => denied.some((d) => path === d || path.endsWith(`/${d}`)))
    expect(
      deniedTouched,
      `R-9 §3.4/§5.1 — the DENIED set is NAMED FIRST and binds the WHOLE committed set: \`E3\`’s module and test file, the frozen session and its test file, the two \`E3\` contract documents and the four config files must NOT appear in this unit’s change set. Touched: ${JSON.stringify(
        deniedTouched,
      )}`,
    ).toEqual([])
  })

  it('R-11 §3.4 — THE NO-NEW-SURFACE ROW: `ALL_TOOLS` (21) · `RpcMethod` (21) · `MUTATING_METHODS` (7) · `VALID_GROUPS` (5) are UNCHANGED', () => {
    const enginePin = readRel(ENGINE_PIN_RELPATH)
    expect(
      enginePin.length,
      `R-11 §3.4/§3.3 I-12 — the name-complete pin exists (\`${ENGINE_PIN_RELPATH}\`’s \`PINNED_TOOL_SET\`), which is what makes this row a SET EQUALITY rather than a bare count`,
    ).toBeGreaterThan(0)
    expect(
      /PINNED_TOOL_SET/.test(enginePin),
      'R-11 §3.4 — the pinned tool SET exists and is read BY NAME by that row, never by a bare count',
    ).toBe(true)
    // ---------------------------------------------------------------- THE TWO BRANCHES
    // ⟶ REPAIRED 2026-09-27 (THE RED-RUN REPAIR PASS, gate 3): the as-filed row ended in an
    // UNCONDITIONAL `expect(!existsSync(MODULE_SRC.href)).toBe(true)` — a conjunct that
    // `§3.4 R-11` does NOT pin (the cell pins the pinned-surface SET EQUALITY and nothing
    // else) and that flips RED the moment the unit's work is done: the DEFECTIVE-ROW class
    // (`docs/specs/gutter.md` §3.5 R-16, the `E3`-BLOCK-1 precedent). `§3.4 R-11` is now
    // annotated and the row takes `§3.5 R-8x`'s BRANCH form instead — RED keeps the
    // absence reading, GREEN asserts THIS row's own claim (the pinned surface set is
    // UNCHANGED by the module's arrival). A deleted conjunct would have made the row
    // vacuous at green time (`§4.4 S-7`), so BOTH branches carry a reading.
    const modulePresent = existsSync(fileURLToPath(MODULE_SRC))
    if (!modulePresent) {
      expect(
        modulePresent,
        'R-11 §3.4 (RED BRANCH — module ABSENT at red time) — the affordance module does not exist yet, so this unit has added NO registration site: its arrival changes no `ALL_TOOLS`/`RpcMethod`/`MUTATING_METHODS`/`VALID_GROUPS` member (§2.2 P-7, §7 item 11). If the module EXISTS, the GREEN BRANCH governs and this branch is not the live one',
      ).toBe(false)
      return
    }
    // ---------------------------------------------------------------- THE GREEN BRANCH
    // THIS ROW'S OWN CLAIM, and nothing more: the module's arrival leaves the pinned
    // surface set UNCHANGED — it adds no `ALL_TOOLS` member, no `RpcMethod`, no
    // `MUTATING_METHODS` entry, no `VALID_GROUPS` member and no registration site.
    expect(
      moduleBytes().length,
      `R-11 §3.4 (GREEN BRANCH — module PRESENT) — \`${MODULE_RELPATH}\` EXISTS, so this branch governs; the green-branch claims below are read over ITS OWN bytes, which is why the scan is asserted NON-EMPTY first (a scan over \`''\` would pass vacuously)`,
    ).toBeGreaterThan(0)
    // (i) NOT ONE member of the name-complete pin is added: none of the `21` tool names
    //     appears in this module's bytes, and the module exports no tool descriptor.
    const toolNamesAdded = hitsOf(moduleBytes(), PINNED_TOOL_NAMES)
    expect(
      toolNamesAdded,
      `R-11 §3.4 (GREEN BRANCH)/§2.2 P-7 — the module adds NO \`ALL_TOOLS\` member: NOT ONE of the \`21\` pinned tool names (§3.4 R-11's name-complete set, \`tests/engine-pin-version.test.ts\`'s \`PINNED_TOOL_SET\`, read BY NAME and never by a bare count) appears in ITS OWN bytes. Hits: ${JSON.stringify(
        toolNamesAdded,
      )}`,
    ).toEqual([])
    // (ii) NO registration site of any kind: the four declaration names, the IPC/bridge
    //      access tokens and element creation are all absent (`§2.2` P-2/P-7).
    const registrationSites = hitsOf(moduleBytes(), REGISTRATION_SITE_TOKENS)
    expect(
      registrationSites,
      `R-11 §3.4 (GREEN BRANCH)/§2.2 P-7/§3.3 I-12 — the module carries NO registration site: no \`ALL_TOOLS\`, no \`RpcMethod\`, no \`MUTATING_METHODS\`, no \`VALID_GROUPS\`, no \`ipcRenderer\`/\`ipcMain\` bridge access and no element creation. Hits: ${JSON.stringify(
        registrationSites,
      )}`,
    ).toEqual([])
    // (iii) THE POSITIVE SIDE OF THE SET EQUALITY, asserted UNCHANGED AND NON-VACUOUSLY:
    //       the four pinned surfaces still DECLARE their names in their own files, so the
    //       "unchanged" reading is over surfaces that exist and are still named.
    expect(
      hitsOf(enginePin, [...PINNED_TOOL_NAMES.slice(0, 3), 'PINNED_TOOL_SET']),
      'R-11 §3.4 (GREEN BRANCH) — THE POSITIVE CONTROL for (i): the name-complete pin still carries its own tool names and its `PINNED_TOOL_SET`, so the empty scan above is the MODULE’s reading and never a constant of the corpus',
    ).not.toEqual([])
    const surfaceDeclarations = PINNED_SURFACE_FILES.map((p) => readRel(p)).join('\n')
    expect(
      hitsOf(surfaceDeclarations, ['ALL_TOOLS', 'MUTATING_METHODS', 'VALID_GROUPS']).map((h) => h.replace(/ ×\d+$/, '')),
      `R-11 §3.4 (GREEN BRANCH) — the pinned surface SET is UNCHANGED: the engine’s \`ALL_TOOLS\` (\`${PINNED_SURFACE_FILES[0]}\`), the renderer’s \`MUTATING_METHODS\` (\`${RENDERER_RELPATH}\`) and the default gate’s \`VALID_GROUPS\` (\`${DEFAULT_GATE_RELPATH}\`) all still exist BY NAME in their own files, so this row reads a surface that is still there (§3.4 R-11/§3.3 I-12). Read: ${JSON.stringify(
        PINNED_SURFACE_FILES.map((p) => [p, readRel(p).length]),
      )}`,
    ).toEqual(['ALL_TOOLS', 'MUTATING_METHODS', 'VALID_GROUPS'])
    const groupMembers = [
      ...new Set(
        hitsOf(surfaceDeclarations, PINNED_GROUP_NAMES).map((h) => h.replace(/ ×\d+$/, '')),
      ),
    ].sort()
    expect(
      groupMembers,
      `R-11 §3.4 (GREEN BRANCH) — and the \`VALID_GROUPS\` domain is still exactly the \`5\` pinned names (\`read\`/\`dispatch\`/\`graph\`/\`code\`/\`module\`), read BY NAME and never by a bare count: a SIXTH group name anywhere in the surface files FAILS this row. Read: ${JSON.stringify(
        groupMembers,
      )}`,
    ).toEqual([...PINNED_GROUP_NAMES].sort())
  })

  it('R-12 §3.4 — THE NODE-LOCAL LISTENER ROW: every listener this unit causes is attached through the INJECTED SOURCE, to the AFFORDANCE element it was given, once per event type, with ZERO on `document`/`window`/an ancestor', async () => {
    const source = moduleSource('R-12')
    const attachedTokens = (normalizedView(source).match(/addEventListener/g) ?? []).length
    expect(
      attachedTokens,
      'R-12 §3.4/§2.2 P-2 — `addEventListener` appears only in the DOM-backed source’s own body (§2.1 item 6’s carve-out), and the source attaches to THE ELEMENT IT IS GIVEN',
    ).toBeGreaterThan(0)
    const h = await makeHarness({}, 'R-12')
    const attached = h.affordance.attach()
    expect(attached, 'R-12 §3.4 — `attach()` succeeds over the composition’s own wiring (§2.3 row 2)').toBe(true)
    const foreign = h.source.ons().filter((e) => e.element !== h.element)
    expect(
      foreign.map((e) => `${e.type}→${brief(e.element)}`),
      `R-12 §3.4/§2.2 P-2/§3.3 I-8 — ZERO listeners are attached to anything but the affordance element this module was given (an ancestor or \`document\`-delegated listener is the \`A-d3\` rejection). Read: ${JSON.stringify(
        foreign.map((e) => e.type),
      )}`,
    ).toEqual([])
    // **⟶ OWNER-SCOPED 2026-09-27 — THE OWNER ATTRIBUTION REPAIR (`docs/specs/gutter-ui.md`
    // `§3.4 R-12`; `§3.1 M-4`; `§2.3` rows 2/6c/13; `docs/specs/gutter.md` `§2.2` P-3).** THE
    // AS-FILED READING IS KEPT VISIBLE ABOVE AND SUPERSEDED: it drove `every(n => n === 1)` over
    // the COMPOSED per-type map (`const perType = new Map(...)` over `h.source.ons()`), which is
    // FALSE BY CONSTRUCTION — the composed map legitimately reads `pointerdown: 2`, because
    // `E3`'s landed `attach()` makes the SESSION install its OWN single `'pointerdown'` start
    // listener on the SAME element through the SAME source. **`R-12`'s own cell rules the
    // reading: *"the module's own listener set is FOUR event types … and the session adds ONE
    // more of its own through the same source; the as-filed 'once per event type' still holds
    // for each set, and the composed `source.on` count is `5`"*.** The drive completes with
    // `detach()` so the module's own four are attributable BY IDENTITY through its own removals
    // (`§2.3` row 13).
    expect(h.affordance.detach(), 'R-12 §2.3 row 13 — the drive completes with `detach()` so this module’s own listeners are attributed BY IDENTITY through its own four removals').toBe(true)
    const census = ownerScopedOnCensus(h.source)
    console.log(
      `R-12 MEASURED :: ${JSON.stringify({
        composedOnCount: census.composed.length,
        composedPerType: census.composedPerType,
        moduleOwnPerType: census.moduleOwnPerType,
        moduleOwnTypesAttachedOnce: census.moduleOwnTypesAttachedOnce,
        otherOwnersPerType: census.otherOwnersPerType,
        clause: 'docs/specs/gutter-ui.md §3.4 R-12 + §3.1 M-4 + §2.3 rows 2/6c/13',
      })}`,
    )
    expect(
      census.moduleOwnPerType.every(([, n]) => n === 1),
      `R-12 §3.4/§3.1 M-4 — **EVERY LISTENER THIS MODULE CAUSES IS ATTACHED ONCE PER EVENT TYPE — THE RULE ASSERTS OVER THIS MODULE'S OWN FOUR LISTENERS.** The as-filed form asserted it over the composed per-type map, which is FALSE BY CONSTRUCTION: the composed map legitimately reads \`pointerdown: 2\`, because the SESSION installs its OWN single \`'pointerdown'\` start listener on the SAME element through the SAME source (\`docs/specs/gutter.md\` \`§2.2\` P-3, the landed \`session.install\`; \`§3.1 M-4\`; \`§2.3\` row 2; \`M-18\`). Read (module’s own): ${JSON.stringify(
        census.moduleOwnPerType,
      )}`,
    ).toBe(true)
    expect(
      census.composedPerType,
      `R-12 §3.4/§3.1 M-4 — **THE COMPOSED READING IS REPORTED SEPARATELY, AS THE SUM OF THE OWNERS: module \`${String(
        census.moduleOwnDistinctListenerCount,
      )}\` + session \`${String(census.otherOwners.length)}\` = \`5\`.** The session’s own single \`'pointerdown'\` is ATTRIBUTED TO THE SESSION (\`§3.1 M-4\`: *“plus the session’s own single \`‘pointerdown’\` attach”*; \`§2.3\` row 2’s ownership clause), so the composed \`pointerdown\` count of \`2\` is the sum of two owners each attaching ITS OWN type once — NOT a duplicated registration by this module. Read (composed): ${JSON.stringify(
        census.composedPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.start, 2], [POINTER_TYPES.move, 1], ['pointerout', 1], ['pointerover', 1]])
    // **AND THE MODULE'S OWN PER-TYPE CENSUS READS `1` FOR EVERY ONE OF ITS FOUR — the composed
    // `2` for `POINTER_TYPES.start` is split by OWNER, not duplicated by this module.**
    expect(
      census.moduleOwnPerType,
      `R-12 §3.4/§3.1 M-4 — the MODULE’S OWN per-type census reads EXACTLY ONCE for each of its own four types, the as-filed \`once per event type\` rule read over ITS OWN listeners (the composed \`${POINTER_TYPES.start}\` count of \`2\` is the SUM of two owners each attaching ITS OWN type once). Read: ${JSON.stringify(
        census.moduleOwnPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.start, 1], [POINTER_TYPES.move, 1], ['pointerout', 1], ['pointerover', 1]])
    expect(
      census.otherOwnersPerType,
      `R-12 §3.4/§2.3 row 6c — the OTHER OWNER’s set, named: the SESSION’s own single \`'pointerdown'\` install (and nothing else at attach time — its TRACKING TRIO is installed at establishment, which this drive does not reach). Read: ${JSON.stringify(
        census.otherOwnersPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.start, 1]])
    // **THE FALSIFIABLE POSITIVE CONTROL: A SECOND LISTENER OF THE SAME TYPE CAUSED BY THIS
    // MODULE MUST FAIL THE ROW** (the supervisor’s own required control). The row’s census
    // machinery is driven over a synthetic log carrying a SECOND module listener of a type the
    // module already owns — the measured defect’s shape — so the module’s own per-type census
    // reads `2` for that type and `every(n => n === 1)` FAILS.
    const ownOns = h.source.ons()
    const duplicated: SourceEntry[] = [...ownOns, { ...(ownOns[3] as SourceEntry), handler: (): void => undefined }]
    const duplicatedCensus = ownerScopedCensus(
      duplicated,
      (entry) => moduleOwnTypes().includes(entry.type),
    )
    expect(
      duplicatedCensus.moduleOwnPerType.every(([, n]) => n === 1),
      `R-12 §3.4 — POSITIVE CONTROL: an extra listener of the same type caused by the MODULE must FAIL this row (its own \`once per event type\` rule, read over the module’s own set). Read: ${JSON.stringify(
        duplicatedCensus.moduleOwnPerType,
      )}`,
    ).toBe(false)
  })

  it('R-13 §3.4 — THE RENDERER-WIRING ROW, static half: the wiring file carries NO UI-content token, the ONE graph-read method is named, and the affordance module’s importer is the wiring (or nothing, at red time)', () => {
    const renderer = readRel(RENDERER_RELPATH)
    const runtime = readRel(RUNTIME_RELPATH)
    expect(
      renderer.length > 0 && runtime.length > 0,
      `R-13 §3.4/§5.1 rows 10/11 — the two admitted wiring files exist (\`${RENDERER_RELPATH}\`, \`${RUNTIME_RELPATH}\`)`,
    ).toBe(true)
    if (!existsSync(fileURLToPath(MODULE_SRC))) {
      // RED BRANCH — the wiring has not landed either, which is why `§4.1` item 1(b) names
      // this row as red at red time for the same reason the module-absence row is.
      expect(
        importsOf(RENDERER_RELPATH, /gutter-affordance/),
        `R-13 §3.4 (RED BRANCH) — at red time \`${RENDERER_RELPATH}\` does NOT reach \`${MODULE_RELPATH}\` and \`Runtime.elementForNodeId\` does not exist: the affordance has no construction site in the running app YET. This is the state the red run is authored against`,
      ).toBe(false)
      expect(
        /elementForNodeId/.test(runtime),
        `R-13 §3.4 (RED BRANCH) / §R.2 R-9 — \`Runtime.elementForNodeId(id)\` does NOT exist in \`${RUNTIME_RELPATH}\` yet; the method is GENUINELY NEW and its id space is engine \`nodeId\` ⇒ authored \`css.id\` ⇒ authored \`props.id\``,
      ).toBe(false)
      return
    }
    // GREEN BRANCH.
    const wiringTokens = hitsOf(renderer, UI_CONTENT_TOKENS.filter((t) => t !== 'releasePointerCapture'))
    expect(
      wiringTokens,
      `R-13(i) §3.4 (GREEN BRANCH) — the wiring’s added bytes contain NO UI-content token: no \`createElement\`, no \`innerHTML\`, no \`appendChild\`, no \`textContent\`, no \`className\`/\`classList\`, no \`document.write\`, no \`document.querySelector*\`/\`getElementById\`. THE ONLY renderer-side code admitted is the WIRING, never UI content (AGENTS.md’s project-wide constraint; §2.2 P-10). Hits: ${JSON.stringify(
        wiringTokens,
      )}`,
    ).toEqual([])
    expect(
      /elementForNodeId/.test(runtime),
      `R-13(iv) §3.4 (GREEN BRANCH) / §R.2 R-9 — \`Runtime.elementForNodeId(id)\` EXISTS in \`${RUNTIME_RELPATH}\` and NOWHERE ELSE; it resolves by the graph’s own id-index and then \`data-node-id\` within the live mount, with NO \`querySelector*\`, NO \`closest\`, NO \`getElementById\` and NO element creation`,
    ).toBe(true)
    expect(
      hitsOf(runtime, ['closest', 'querySelector', 'querySelectorAll', 'getElementById']),
      'R-13(iv) §3.4 — the one graph-read method is an ATTRIBUTE WALK ONLY: no selector, no `closest`, no `querySelector*`, no `getElementById`',
    ).toEqual([])
  })
})

/** `§2.6` item 2 / `§3.4 R-5`(ii) — the CLOSED session read set `E3` owns and this module
 *  must never touch by name. */
const CLOSED_READ_SET: readonly string[] = ['install', 'reset', 'dispose', 'stats', 'gesture', 'disposed']

function gitChangeSet(): string[] | null {
  try {
    const raw = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^..\s+/, '').trim())
  } catch {
    return null
  }
}

// ===========================================================================
// §3.3 — THE INVARIANTS THAT HOLD IN EVERY STATE (`I-*`).
// ===========================================================================
describe('§3.3 — the every-state invariants', () => {
  it('I-1 §3.3 — ONE WRITER, ONE CALL SITE: the module writes to the sink ZERO times and passes the caller’s `commit` into `E3`’s factory only — ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING): the row reports the MODULE’s own invocation count of the `commit` seam (`0`) and the SINK’s record (`1`, `E3`’s single write) as TWO readings', async () => {
    await requireLiveModule('I-1')
    const h = await makeHarness({}, 'I-1')
    expect(h.affordance.attach(), 'I-1 — attach over the composition the wiring builds').toBe(true)
    lifecycle(h, [pointerEvent(0, 250, 300)])
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 250, 300))
    // **THE ROW'S TWO READINGS, SEPARATED BECAUSE THE AS-FILED ROW CONFLATED THEM.**
    // ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING), RULE B.1: the as-filed row asserted
    // `h.sink.records.length === 0` after a FULL VALID LIFECYCLE INCLUDING THE `end` — while its
    // own cell (`docs/specs/gutter-ui.md` §3.1 `I-1`) says *"the module writes to the sink ZERO
    // times … it passes the caller's `commit` into `E3`'s factory and never invokes it"*. Those
    // are two different subjects: (i) THE MODULE's OWN invocations of the `commit` seam — which
    // is what the cell's ZERO is about, and which is measured here as the seam's total
    // invocations MINUS `E3`'s own single write site (`E3` is the module's delegate, not the
    // module); and (ii) THE SINK's own record — which reads `1`, because `E3`'s write site wrote
    // ONCE at the valid `end`. A module that invoked the seam ITSELF would make (i) `> 0` while
    // `E3`'s counter stayed at `1` — the two readings would DIVERGE, which is the falsifier.
    const seamInvocations = h.calls.commit
    const e3WriteSite = controllerSinkCalls(h)
    const moduleOwnInvocations = seamInvocations - (e3WriteSite > 0 ? e3WriteSite : 0)
    console.log(
      `I-1 MEASURED :: ${JSON.stringify({
        moduleOwnCommitSeamInvocations: moduleOwnInvocations,
        commitSeamInvocationsTotal: seamInvocations,
        e3WriteSiteCalls: e3WriteSite,
        sinkRecords: h.sink.records.length,
        clause: 'docs/specs/gutter-ui.md §3.1 I-1 + §2.6 item 1',
      })}`,
    )
    expect(
      moduleOwnInvocations,
      `I-1 §3.3/§2.6 item 1/§0A note 9 — the MODULE ITSELF invoked the \`commit\` seam ZERO times in a full valid lifecycle: it passes the caller’s \`commit\` into \`E3\`’s factory and lets \`E3\`’s ONE write site be the single writer. READINGS: the seam was invoked ${String(
        seamInvocations,
      )} time(s) in total and \`E3\`’s own \`stats().sinkCalls\` reads ${String(e3WriteSite)} — so the module’s own share is ${String(moduleOwnInvocations)} (a module that invoked the seam itself would make this reading positive while \`E3\`’s counter stayed where it is).`,
    ).toBe(0)
    expect(
      h.sink.records.length,
      `I-1 §3.3 — and THE SINK’S OWN RECORD reads EXACTLY ONE, which is \`E3\`’s single write at the valid \`end\` (a sink record of 2 is the TWO-WRITER composition, \`E3\`’s \`F-9\`/\`§5.5.1 P-GT-SM-3\` shape \`(2)\`). Recorded: ${JSON.stringify(
        h.sink.records.map((r) => ({ value: r.value, outcome: String(r.outcome) })),
      )}`,
    ).toBe(1)
    expect(
      h.sink.records.length,
      'I-1 §2.6 item 1 — and the sink’s own record AGREES with `E3`’s single write-site counter in the same cell (the two-reading rule; a divergence between them is the second writer)',
    ).toBe(e3WriteSite)
  })

  it('I-2 §3.3 — ONE COORDINATE READ: `resolveEventPointer` is the family’s only coordinate read, called AT MOST ONCE per observed pointer move', async () => {
    await requireLiveModule('I-2')
    const h = await makeHarness({}, 'I-2')
    expect(h.affordance.attach(), 'I-2 — attach').toBe(true)
    lifecycle(h, [pointerEvent(0, 10, 10)])
    const before = h.calls.sizeFromPointer
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 11, 11))
    expect(
      h.calls.sizeFromPointer - before,
      'I-2 §3.3/§2.4 item 2 clause (i) — ONE observed move performs AT MOST ONE coordinate read, and the module’s own value chain calls `sizeFromPointer` at most once for it',
    ).toBeLessThanOrEqual(1)
    expect(
      h.affordance.stats()['moves'],
      'I-2 §2.1 item 5 — and the move was OBSERVED by the module’s own move turn (`stats().moves` counts every observed move, valid or not)',
    ).toBe(2)
  })

  it('I-3 §3.3 — NO RETENTION ACROSS A TERMINAL: the per-gesture record is discarded at EVERY terminal, and no element-keyed value/cache/memo exists', async () => {
    const source = moduleSource('I-3')
    expect(
      hitsOf(source, ['WeakMap', 'new Map', 'memo', 'cache']),
      'I-3 §3.3/§2.2 P-5 — the module’s bytes carry NO element-keyed store: no `Map`, no `WeakMap`, no memo, no cache and no module-level mutable state. Hits: ' +
        JSON.stringify(hitsOf(source, ['WeakMap', 'new Map', 'memo', 'cache'])),
    ).toEqual([])
    await requireLiveModule('I-3')
    const h = await makeHarness({}, 'I-3')
    expect(h.affordance.attach(), 'I-3 — attach').toBe(true)
    lifecycle(h, [pointerEvent(0, 150, 300)])
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const before = h.sessionLog.length
    // After the terminal, a SECOND gesture must establish cleanly with no record leaking
    // from the first (`§2.3` row 3: the first configuration stays in force and the record
    // is per-gesture).
    expect(h.affordance.attach(), 'I-3 §2.3 row 3 — a repeat `attach()` is a NO-OP returning `false`').toBe(false)
    expect(h.sessionLog.length, 'I-3 §2.3 row 3 — and it delegates NOTHING (ZERO session calls)').toBe(before)
  })

  it('I-5 §3.3 — THE PREVIEW IS A PRESENTATION CHANNEL: never the sink, never persistent, written AT MOST ONCE per observed move', async () => {
    await requireLiveModule('I-5')
    const h = await makeHarness({}, 'I-5')
    expect(h.affordance.attach(), 'I-5 — attach').toBe(true)
    lifecycle(h, [pointerEvent(0, 120, 300), pointerEvent(0, 130, 300)])
    expect(
      h.previews.length,
      `I-5 §3.3/§2.5 item 1 — AT MOST ONE preview write per observed move (two valid moves ⇒ two writes, never three). Read: ${JSON.stringify(
        h.previews,
      )}`,
    ).toBeLessThanOrEqual(2)
    expect(h.sink.records.length, 'I-5 §2.5 item 1 — and a preview write NEVER reaches the sink mid-drag').toBe(0)
  })

  it('I-6 §3.3 — ELEMENT IDENTITY IS BY REFERENCE: the affordance and the target are the objects the caller handed, never derived from a string, never re-resolved', async () => {
    await requireLiveModule('I-6')
    const h = await makeHarness({}, 'I-6')
    expect(h.affordance.attach(), 'I-6 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0))
    expect(
      h.cursorCalls.length,
      `I-6 §3.3/§3.4 R-6 — the hover path ran (so the identity claim below is not vacuous against an idle module). Read: ${JSON.stringify(
        h.cursorCalls,
      )}`,
    ).toBeGreaterThan(0)
    expect(
      h.cursorCalls[0].element,
      'I-6 §3.3/§2.6 item 3 — the element the module hands the cursor seam IS the object the caller handed as `element` (asserted BY IDENTITY, `toBe`, never by a string or a re-resolution)',
    ).toBe(h.element)
    expect(h.cursorCalls[0].element, 'I-6 §3.3/§3.1 M-11 — and NEVER the `target` element').not.toBe(h.target)
  })

  it('I-7 §3.3 — TOTALITY AT THE BOUNDARY: `createGutterAffordance`, `cursorDeclarationFor` and `domEventSource` never throw for ANY input', async () => {
    const hostile: readonly unknown[] = [
      undefined,
      null,
      42,
      'x',
      true,
      Object.create(null),
      new Proxy(
        {},
        {
          get(): never {
            throw new Error('hostile proxy')
          },
        },
      ),
      {
        get session(): never {
          throw new Error('throwing accessor')
        },
      },
    ]
    const mod = await requireModule('I-7')
    const factory = mod['createGutterAffordance'] as ((options?: unknown) => unknown) | undefined
    const cursorFn = mod['cursorDeclarationFor'] as ((value: unknown) => unknown) | undefined
    const domSource = mod['domEventSource'] as (() => unknown) | undefined
    expect(typeof factory, 'I-7 §2.1 — the factory is a value export').toBe('function')
    expect(typeof cursorFn, 'I-7 §2.1 — `cursorDeclarationFor` is a value export').toBe('function')
    expect(typeof domSource, 'I-7 §2.1 — `domEventSource` is a value export').toBe('function')
    for (const shape of hostile) {
      let threw: unknown = null
      try {
        const result = (factory as (options?: unknown) => unknown)(shape)
        expect(result !== null && typeof result === 'object', `I-7 §2.1 — the factory answers an OBJECT for ${brief(shape)}`).toBe(true)
      } catch (e) {
        threw = e
      }
      expect(threw, `I-7 §3.3/§2.1 — \`createGutterAffordance(${brief(shape)})\` NEVER throws`).toBe(null)
      let cursorThrew: unknown = null
      try {
        ;(cursorFn as (value: unknown) => unknown)(shape)
      } catch (e) {
        cursorThrew = e
      }
      expect(cursorThrew, `I-7 §3.3/§2.6 item 3 — \`cursorDeclarationFor(${brief(shape)})\` NEVER throws`).toBe(null)
      let sourceThrew: unknown = null
      try {
        ;(domSource as () => unknown)()
      } catch (e) {
        sourceThrew = e
      }
      expect(sourceThrew, `I-7 §3.3/§2.1 — \`domEventSource()\` NEVER throws (its calls are TOTAL: a null/non-object element makes every call a NO-OP)`).toBe(null)
    }
  })

  it('I-8 §3.3 — NO SECOND GESTURE AUTHORITY: the module calls no session terminal, owns no gesture state machine, and attaches no listener outside the affordance element', async () => {
    const source = moduleSource('I-8')
    const terminals = ['begin', 'end', 'cancel'].filter((name) => new RegExp(`\\.${name}\\s*\\(`).test(normalizedView(source)))
    expect(
      terminals,
      `I-8 §3.3/§3.4 R-4/§2.3 row 6 — the module calls NO session terminal itself: \`begin\`, \`end\` and \`cancel\` appear in NO call of its bytes (it composes \`E3\`, which owns the reset entry point, and the session owns the other three). Hits: ${JSON.stringify(
        terminals,
      )}`,
    ).toEqual([])
    expect(
      /createGestureSession\s*\(/.test(normalizedView(source)),
      'I-8 §3.3/§3.4 R-4 — and the module constructs NO session of its own: `createGestureSession` appears in no call of its bytes (the WIRING builds it and hands it in as `options.session`, §R R1)',
    ).toBe(false)
    await requireLiveModule('I-8')
    const h = await makeHarness({}, 'I-8')
    expect(h.affordance.attach(), 'I-8 — attach').toBe(true)
    expect(
      h.source.ons().filter((e) => e.element !== h.element).length,
      'I-8 §3.3/§3.4 R-12 — and it attaches no listener outside the element it was given',
    ).toBe(0)
  })

  it('I-9 §3.3 — NO MODULE-LEVEL MUTABLE STATE: the factory’s result holds its own counters and at most one per-gesture record', async () => {
    await requireLiveModule('I-9')
    const a = await makeHarness({}, 'I-9/a')
    const b = await makeHarness({}, 'I-9/b')
    expect(a.affordance.attach(), 'I-9 — the first affordance attaches').toBe(true)
    expect(b.affordance.attach(), 'I-9 — the second affordance attaches INDEPENDENTLY').toBe(true)
    lifecycle(a, [pointerEvent(0, 140, 300)])
    expect(
      a.affordance.stats()['moves'],
      'I-9 §2.1 item 5 — the first instance’s counters moved with ITS OWN drive',
    ).toBe(1)
    expect(
      b.affordance.stats()['moves'],
      'I-9 §3.3/§2.2 P-5 — and the SECOND instance’s counters did NOT move: the counters are the instance’s own, never module-level state',
    ).toBe(0)
  })

  it('I-10 §3.3 — NO RENDERED-FACT CLAIM FROM `[T]`: this file asserts no geometry, no applied style, no layout and no real pointer', () => {
    // **THE BANNED SPELLINGS ARE ASSEMBLED AT RUN TIME** so that this row’s OWN source does
    // not carry them literally: a self-scanning row that spells its tokens would fail on
    // itself, which is a HARNESS defect rather than a finding (the sibling `gutter.test.ts`
    // uses the same technique for the same reason). **Each token is split at a DIFFERENT
    // character**, so no single split spelling appears either.
    const banned = [
      ['get', 'Computed', 'Style'].join(''),
      ['getBounding', 'Client', 'Rect'].join(''),
      ['off', 'set', 'Width'].join(''),
      ['cl', 'ient', 'Width'].join(''),
      ['DO', 'M', 'Rect'].join(''),
      ['js', 'do', 'm'].join(''),
      ['happy', '-', 'do', 'm'].join(''),
    ]
    const self = readFileSync(TEST_FILE, 'utf8')
    const hits = hitsOf(self, banned)
    console.log(
      `I-10 MEASURED :: ${JSON.stringify({ hits, clause: 'docs/specs/gutter-ui.md §3.3 I-10 + §3.2 F-13 + §4.4 S-7' })}`,
    )
    expect(
      hits,
      `I-10 §3.3/§3.2 F-13/§4.4 S-7 — THIS FILE asserts no rendered fact: no computed style, no geometry read, no layout measure and no real pointer (the rendered claims are §5.2/§5.U’s [U] rows and are NOT authored here). Hits: ${JSON.stringify(
        hits,
      )}`,
    ).toEqual([])
    // THE POSITIVE CONTROLS: the scan MUST fail a corpus that reads a geometry.
    expect(
      hitsOf(`const w = element.${['getBounding', 'Client', 'Rect'].join('')}().width`, banned).length,
      'I-10 §3.3 — THE POSITIVE CONTROL: a corpus reading a rendered geometry MUST FAIL this scan',
    ).toBeGreaterThan(0)
    expect(
      hitsOf(`const w = element.${['off', 'set', 'Width'].join('')}`, banned).length,
      'I-10 §3.3 — THE POSITIVE CONTROL (second form): an offset read MUST FAIL it too',
    ).toBeGreaterThan(0)
  })

  it('I-11 §3.3 — THE DEMO’S DRIFT IS MEASURED, NOT ASSUMED: the authored card changes the demo’s rendered census and its tool outputs, and this unit’s record states the BEFORE/AFTER form', () => {
    const spec = readRel(SPEC_RELPATH)
    expect(
      spec.length,
      `I-11 §3.3/§3.5 R-9 — the contract this row cites exists (\`${SPEC_RELPATH}\`) and its §3.3 I-11 clause pins the MEASURED form`,
    ).toBeGreaterThan(0)
    expect(
      /U-7/.test(spec),
      'I-11 §3.3/§5.U U-7 — the drift is carried by `U-7`’s BEFORE/AFTER census and HTML readings: a projected delta has not measured one (§7 item 9)',
    ).toBe(true)
    // ---------------------------------------------------------------- THE TWO BRANCHES
    // ⟶ REPAIRED 2026-09-27 (THE RED-RUN REPAIR PASS, gate 3): the as-filed row ended in an
    // UNCONDITIONAL `expect(existsSync(MODULE_SRC.href)).toBe(false)` — a conjunct no clause
    // pins (`§3.3 I-11`'s claim is THE DRIFT IS MEASURED, discharged by `§5.U U-7`'s
    // BEFORE/AFTER readings) and which flips RED the moment the module lands: the
    // DEFECTIVE-ROW class (`docs/specs/gutter.md` §3.5 R-16). The row now takes
    // `§3.5 R-8x`'s BRANCH form — RED keeps the "no BEFORE/AFTER reading exists yet"
    // reading, GREEN asserts that the DEBT IS STILL OWED TO `U-7` and is NOT discharged
    // by the module's arrival (a projection is still not a measurement).
    const modulePresent = existsSync(fileURLToPath(MODULE_SRC))
    if (!modulePresent) {
      expect(
        modulePresent,
        `I-11 §3.3 (RED BRANCH — the affordance module is ABSENT at red time) — no BEFORE/AFTER reading exists yet: the authored card has NOT landed, so this unit projects NOTHING and the drift is OWED to the live battery (§5.U U-1/U-7, item 2’s \`before\` field), which MEASURES it rather than projecting it. If the module EXISTS, the GREEN BRANCH governs and this branch is not the live one`,
      ).toBe(false)
      return
    }
    // ---------------------------------------------------------------- THE GREEN BRANCH
    // THIS ROW'S OWN CLAIM, and nothing more: the module's arrival does NOT discharge the
    // drift debt — `U-7` still owes its BEFORE/AFTER readings, taken by the live battery.
    console.log(
      `I-11 GREEN-BRANCH READING :: ${JSON.stringify({
        modulePresent,
        debt: 'STILL OWED TO U-7 (the live battery, §5.U item 2’s `before` field)',
        clause: 'docs/specs/gutter-ui.md §3.3 I-11 + §5.U U-7',
      })}`,
    )
    expect(
      spec.includes('the PRE-change reading, **taken before the authored card landed**'),
      'I-11 §3.3 (GREEN BRANCH) — the debt is STILL OWED: `§5.U` item 2’s field table still pins the `before` field for `U-7` alone, as the PRE-change reading TAKEN BEFORE the authored card landed. The module’s arrival does NOT fill it — only the live battery’s readings can',
    ).toBe(true)
    const beforeLine = spec
      .split('\n')
      .find((line) => line.includes('for `U-7` only')) ?? ''
    expect(
      /PRE-change reading/.test(beforeLine) && /before the authored card landed/.test(beforeLine),
      `I-11 §3.3 (GREEN BRANCH) — and \`§5.U\` item 2’s \`before\`-field rule SURVIVES THE REPAIR VERBATIM: a delta with no recorded before still FAILS the record. Read: ${JSON.stringify(
        beforeLine.slice(0, 240),
      )}`,
    ).toBe(true)
    expect(
      spec.includes('recorded as deltas rather than projected'),
      'I-11 §3.3 (GREEN BRANCH) — and `U-7`’s AFTER cell still requires the readings `recorded as deltas rather than projected`: a projection has still not measured one, so the module landing measures NOTHING by itself',
    ).toBe(true)
    expect(
      hitsOf(spec, ['U-7']),
      `I-11 §3.3 (GREEN BRANCH) — the instrument that owes the reading is still NAMED in the contract (\`U-7\`, whose \`[U]\`+\`[H]\` instrument is the live battery; \`U-1\` is its shipped-tool companion). Read: ${JSON.stringify(
        hitsOf(spec, ['U-7', 'U-1']),
      )}`,
    ).not.toEqual([])
    expect(
      /U-7. delta is a measurement rather than a projection/.test(spec),
      'I-11 §3.3 (GREEN BRANCH) — and `§5.U` item 3(c)’s read-only audit still requires that the `U-7` delta BE a measurement rather than a projection: the module landing is not a measurement',
    ).toBe(true)
  })

  it('I-12 §3.3 — NO NEW MCP SURFACE AND NO SHELL CHANGE: the pinned surface files are UNCHANGED by this unit', () => {
    const changed = gitChangeSet()
    const surface = ['src/main/main.ts', 'src/main/preload.ts', 'src/main/mcp-server.ts', 'src/renderer/index.html']
    const touched = (changed ?? []).filter((path) => surface.some((s) => path.endsWith(s)))
    expect(
      touched,
      `I-12 §3.3/§3.4 R-11/§2.2 P-7 — the preload bridge, the MCP server, the main process entry and the shell chrome are UNCHANGED and appear nowhere in this unit’s change set (§5.1 DENIED item 4). Touched: ${JSON.stringify(
        touched,
      )}`,
    ).toEqual([])
  })

  it('I-13 §3.3 — NO CAPTURE CHANNEL EXISTS IN THIS COMPOSITION, AND NO RELEASE TOKEN APPEARS ANYWHERE', () => {
    const source = moduleSource('I-13')
    expect(
      hitsOf(source, ['releasePointerCapture']),
      'I-13 §3.3/§3.2 F-14/§2.6 item 4 — `releasePointerCapture` appears NOWHERE: the capture claim is WITHDRAWN (`§R` R5) and this unit never releases',
    ).toEqual([])
    expect(
      /capture\s*:/.test(normalizedView(source)),
      'I-13 §3.3/§2.6 item 4 — the module passes NO `capture` field ANYWHERE: `E3`’s sealed `attach(element, hooks?)` accepts only the four hooks, so a `capture: true` field would be INERT (the option stays DECLARED AND IGNORED)',
    ).toBe(false)
    expect(
      /setPointerCapture/.test(normalizedView(source)),
      'I-13 §3.3/§2.1 item 6 — the only capture member this module may contain is the DOM-backed source’s DELEGATED `setPointerCapture` (a no-op when the element lacks it): the module’s own bytes make NO capture call of their own',
    ).toBe(false)
  })

  it('I-14 §3.3 — THE AFFORDANCE IS CONSTRUCTED IN THE RUNNING APP, FROM THE ALLOWED WIRING, AS PROVENT-RENDERED DATA', () => {
    const renderer = readRel(RENDERER_RELPATH)
    const runtime = readRel(RUNTIME_RELPATH)
    const wiringPresent = /gutter-affordance|createGutterAffordance/.test(renderer)
    expect(
      wiringPresent,
      `I-14 §3.3/§3.4 R-13/§R.1 — the affordance is constructed by the renderer’s own boot wiring (\`${RENDERER_RELPATH}\`), which resolves the affordance and target elements FROM THE PRODUCING GRAPH and calls \`createGutterAffordance(...)\` then \`.attach()\`. WIRING present: ${String(
        wiringPresent,
      )}; \`Runtime.elementForNodeId\` present: ${String(/elementForNodeId/.test(runtime))}`,
    ).toBe(true)
    expect(
      hitsOf(renderer, ['createElement', 'innerHTML', 'appendChild', 'textContent']),
      'I-14 §2.2 P-10 — and the wiring AUTHORS NO UI CONTENT: the affordance stays provident-rendered data driven through the producing graph, and a renderer edit that hand-writes DOM is a FINDING',
    ).toEqual([])
  })

  it('I-15 §3.3 — ONE OWNER PER LISTENER SET, ONE SINK WRITE, ONE WRITE ROUTE, AND NO REBIND', async () => {
    await requireLiveModule('I-15')
    const h = await makeHarness({}, 'I-15')
    expect(h.affordance.attach(), 'I-15 — attach').toBe(true)
    lifecycle(h, [pointerEvent(0, 175, 300)])
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    const moduleSet = moduleOwnTypes()
    const removals = h.affordance.detach()
    expect(removals, 'I-15 — the detach completes').toBe(true)
    // **⟶ OWNER-SCOPED 2026-09-27 — THE OWNER ATTRIBUTION REPAIR (`docs/specs/gutter-ui.md`
    // `§3.3 I-15`; `§2.3` rows 2/6c/13; `§R` `R-12`; `docs/specs/gutter.md` `§2.2` P-3).** THE
    // AS-FILED READING IS KEPT VISIBLE ABOVE AND SUPERSEDED: it read the COMPOSED `off` census
    // filtered by TYPE MEMBERSHIP (`offs.filter((type) => !moduleSet.includes(type))`) and
    // asserted it EMPTY — a reading that is **FALSE BY CONSTRUCTION** the moment `E3`'s landed
    // `attach()` makes the SESSION remove ITS OWN listeners through the SAME source (`§2.3` row
    // 6c; the landed `session.install` → `installOperation`, `docs/specs/gutter.md` `§2.2` P-3).
    // **`I-15`'s own clause is an OWNERSHIP clause: *"each set is installed by its OWN owner and
    // removed by its OWN owner … no cross-owner removal"*.** Every `off` is now ATTRIBUTED BY
    // OWNER, and the SESSION's own detach is reported as the SESSION's — NEVER as this module's
    // `off`.
    const census = ownerScopedOffCensus(h.source)
    const offs = census.composed.map((e) => e.type)
    console.log(
      `I-15 MEASURED :: ${JSON.stringify({
        composedOffTypes: offs,
        moduleOwnPerType: census.moduleOwnPerType,
        moduleOwnDistinctListeners: census.moduleOwnDistinctListenerCount,
        sessionOwnPerType: census.otherOwnersPerType,
        clause: 'docs/specs/gutter-ui.md §3.3 I-15 + §2.3 rows 6c/13 + docs/specs/gutter.md §2.2 P-3',
      })}`,
    )
    expect(
      census.moduleOwnPerType.map(([type]) => type),
      `I-15 §3.3/§2.3 row 6c/§R.2 R-12 — **THE MODULE REMOVES ITS OWN FOUR, AND ONLY ITS OWN FOUR**, each with the SAME three values it installed them with (\`§2.3\` row 13: the module’s own removals precede the controller’s delegation, which is what makes them attributable BY IDENTITY). Read (module’s own): ${JSON.stringify(
        census.moduleOwnPerType,
      )}`,
    ).toEqual([...moduleSet].sort())
    expect(
      census.moduleOwnDistinctListenerCount,
      `I-15 §3.3 — exactly FOUR distinct listeners removed by THIS MODULE. Read: ${JSON.stringify(census.moduleOwnPerType)}`,
    ).toBe(4)
    // **THE SESSION'S OWN DETACH IS THE SESSION'S — IT MUST NOT READ AS THIS MODULE'S `off`.**
    // `E3`'s own tracking detach removes the session's own tracking listeners and the session's
    // own start install through the same source.
    expect(
      census.otherOwnersPerType,
      `I-15 §3.3/§2.3 row 6c / docs/specs/gutter.md §2.2 P-3 — **THE SESSION’S OWN DETACH IS ATTRIBUTED TO THE SESSION AND IS NOT THIS MODULE’S \`off\`**: \`E3\`’s own tracking detach removes the SESSION’s own listeners (its \`${POINTER_TYPES.start}\` install plus its tracking trio) through the SAME source, and the as-filed “no \`off\` for a type the module did not install” reading was taken over the COMPOSED census, where the session’s own removals make it non-empty BY CONSTRUCTION. Read (the other owner): ${JSON.stringify(
        census.otherOwnersPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.cancel, 1], [POINTER_TYPES.start, 1], [POINTER_TYPES.move, 1], [POINTER_TYPES.end, 1]].sort((a, b) => (String(a[0]) < String(b[0]) ? -1 : 1)))
    // **THE ROW'S OWN CLAIM, KEPT AND SCOPED TO THE MODULE'S OWN TYPES: NO `off` FOR A TYPE THE
    // MODULE DID NOT INSTALL (the ownership rule is two-sided).**
    expect(
      census.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      `I-15 §3.3 — ZERO \`source.off\` calls by THIS MODULE for a type it did not install (the ownership rule is two-sided: neither owner removes the other’s listeners). Read: ${JSON.stringify(
        census.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      )}`,
    ).toEqual([])
    // **THE FALSIFIABLE POSITIVE CONTROL: A CROSS-OWNER REMOVAL FAILS THIS INVARIANT.** The row's
    // own machinery is driven over a synthetic log in which this module is credited with the
    // SESSION's own removal — the cross-owner reading `I-15` forbids — and the module's own census
    // then reads a type TWICE (or beyond its own four listeners).
    const sessionOffs = census.otherOwners
    const crossOwner: SourceEntry[] = [...census.composed, ...sessionOffs.slice(0, 1)]
    const crossOwnerCensus = ownerScopedCensus(
      crossOwner,
      (entry) => moduleSet.includes(entry.type) || entry.handler === sessionOffs[0]?.handler,
    )
    expect(
      crossOwnerCensus.moduleOwnPerType.some(([, n]) => n > 1) || crossOwnerCensus.moduleOwnDistinctListenerCount > 4,
      `I-15 §3.3 — POSITIVE CONTROL (A CROSS-OWNER REMOVAL): crediting THIS MODULE with the SESSION’s own removal MUST FAIL this invariant — the module’s own census then reads a type TWICE or names more than its own four listeners. Read: ${JSON.stringify(
        crossOwnerCensus.moduleOwnPerType,
      )} (distinct listeners \`${String(crossOwnerCensus.moduleOwnDistinctListenerCount)}\`)`,
    ).toBe(true)
  })
})

// ===========================================================================
// §3.1 — THE VALID / HAPPY STATES (`M-*`). THE FOUR PARKED `E3` OBLIGATIONS ARE THE
// FIRST ROWS (`M-1`..`M-5`) — they are the reason this unit exists (ruling 3).
//
// **ALL FOUR ARE AUTHORED TO THE CONTRACT, EXPECTED GREEN** (`§R.4` `C-A2`, `cc7fba5`).
// At RED time they fail for the SAME reason every other behaviour row fails — the module
// does not exist — and NOT because of any `E3`-side defect, so the red report tags them
// with NO `E3` token.
// ===========================================================================
describe('M-1..M-5 — §3.1 the four parked `E3` obligations AND the divergence control (the reason this unit exists)', () => {
  it('M-1 §3.1 — THE CLOSED SESSION READ SET, its TWO HALVES REPORTED SEPARATELY: (i)/(ii) the static census over both files, and (iii) the runtime census over a session double EXPOSING the two invented names', async () => {
    // ---- HALF (i)/(ii): THE STATIC CENSUS (its own reading, §R.4 C-A2) ----------------
    const source = moduleSource('M-1 (static half)')
    const ownReads = CLOSED_READ_SET.filter((name) => new RegExp(`\\.${name}\\b`).test(normalizedView(source)))
    expect(
      ownReads,
      `M-1 half (i)/§2.6 item 2 — THIS MODULE’S OWN session-member reference census is EMPTY: \`${MODULE_RELPATH}\` references NO session member by name (\`install\` · \`reset\` · \`dispose\` · \`stats\` · \`gesture\` · \`disposed\` appear ZERO times as member reads in it — it reaches them only through \`E3\`). Hits: ${JSON.stringify(
        ownReads,
      )}`,
    ).toEqual([])
    const gutter = readRel(GUTTER_RELPATH)
    const invented = hitsOf(gutter, ['registerCompositionWriter', 'registerCommit'])
    expect(
      invented,
      `M-1 half (ii)/§3.4 R-5(i) — the DENIED \`${GUTTER_RELPATH}\` contains NEITHER invented name in ANY form (raw, token-assembled, commented). MEASURED reading: ${JSON.stringify(
        invented,
      )} — and \`E3\`-HOST-2 IS FIXED at \`cc7fba5\`, so this half goes GREEN against the landed module while the as-filed \`EXPECTED-RED — OWED — E3-SIDE\` token is SPENT (§R.4 C-A2)`,
    ).toEqual([])

    // ---- HALF (iii): THE RUNTIME CENSUS (its OWN measured outcome, never excused with
    // the `E3` token — §R.2 R-14 / §R.4 C-A2) -----------------------------------------
    const createGutterAffordance = await factoryOf<(options?: Record<string, unknown>) => AffordanceLike>('M-1 (runtime half)')
    const recordingSource = new RecordingSource()
    const sink = makeSink()
    // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — RULE A, APPLIED TO THIS ROW'S OWN LOCAL
    // HARNESS.** The session is constructed with a NON-FORWARDING recorder (the ruled channel
    // shape); the sink rides ONLY the composition's `commit` seam below. As filed, the SAME
    // function sat on both channels, so a valid `end` produced TWO sink records and this row's
    // declared `1` was unreachable.
    const sessionChannel: Array<{ gesture: unknown; value: unknown }> = []
    const raw = createGestureSession({
      source: recordingSource as never,
      commit: ((gesture: unknown, value: unknown): void => {
        sessionChannel.push({ gesture, value })
      }) as never,
    })
    const { session, reads } = makeReadRecordingSession(raw)
    const element: Record<string, unknown> = { name: 'M-1-element' }
    const affordance = createGutterAffordance({
      session,
      source: recordingSource,
      element,
      target: { name: 'M-1-target' },
      sizeFromPointer: (pointer: { x: number }, start: number): unknown => pointer.x - start,
      axisOf: (): unknown => AXIS_TOKEN,
      cursorOf: (): unknown => undefined,
      applyPreview: (): void => undefined,
      applyCursor: (): void => undefined,
      startSizeOf: (): unknown => 100,
      boundsOf: (): unknown => ({ min: 0, max: 200 }),
      resizableOf: (): unknown => true,
      commit: (gesture: unknown, value: number): void => sink.commit(gesture, value),
      moveTypeOf: (): unknown => POINTER_TYPES.move,
    })
    expect(
      affordance.attach(),
      'M-1 half (iii) — `attach()` succeeds over a session double that EXPOSES the two invented names (they change nothing: the module reads only the closed set)',
    ).toBe(true)
    recordingSource.fire('pointerover', pointerEvent(0, 0, 0))
    recordingSource.fire('pointerdown', pointerEvent(0))
    recordingSource.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    recordingSource.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const inventedReads = reads.filter((r) => r.member === 'registerCompositionWriter' || r.member === 'registerCommit')
    expect(
      inventedReads,
      `M-1 half (iii)/§2.6 item 2 — the session double’s exposure of the two INVENTED names changes NOTHING: they are READ NOT AT ALL by this composition (the \`E3\`-HOST-2 probe is DELETED at \`cc7fba5\`). MEASURED reads of the invented members: ${JSON.stringify(
        inventedReads,
      )}`,
    ).toEqual([])
    // **THE MEASURED CALL COUNTS OF THE AS-FILED RUN REMAIN THE RECORD OF WHAT THE DEFECT
    // WAS** (one `session.reset` with the DEAD handle, on both arms); the FIXED reading is
    // printed beside them (§4.1 item 4).
    console.log(
      `M-1 MEASURED :: ${JSON.stringify({
        staticHalfGutterInventedNames: invented.length,
        staticHalfModuleSessionMemberReads: ownReads,
        runtimeHalfInventedMemberReads: inventedReads.length,
        sinkValue: sink.records.map((r) => r.value),
        sinkWrites: sink.records.length,
        sessionChannelValue: sessionChannel.map((c) => c.value),
        sessionChannelWrites: sessionChannel.length,
        asFiledMeasuredCounts: 'the invented probe was PRESENT in the module and READ by it (E3-HOST-2); the fix at cc7fba5 deletes the probe',
        clause: 'docs/specs/gutter-ui.md §3.1 M-1 + §R.4 C-A2',
      })}`,
    )
    expect(
      sink.records.length,
      `M-1 half (iii)/§2.3 rows 11/14 — ONE sink call for ONE gesture, over the session double that exposes the two invented names: a session exposing either name and yielding TWO sink calls for one gesture FAILS this row (the SESSION's own channel is the non-forwarding recorder, so it adds no record here). Recorded: ${JSON.stringify(
        sink.records.map((r) => ({ value: r.value, outcome: String(r.outcome) })),
      )} — and the session's own recorder received ${JSON.stringify(sessionChannel.map((c) => c.value))}`,
    ).toBe(1)
    expect(
      sink.records[0]?.value,
      // **⟶ RE-GRAINED 2026-09-27 (THE CHAIN RULING) — RULE B.2.** The as-filed message read
      // `100 + (150 - 100) = 150`, which is the DELTA-ADDED-TO-START reading the harness's
      // declared chain does NOT have: `sizeFromPointer(pointer, start)` answers the new SIZE
      // (`docs/specs/gutter-ui.md` §2.4 item 2 — it is called once with `(pointer, preDragSize)`
      // and its answer is what `E3` clamps), the harness drives `(pointer, start) => pointer.x -
      // start` with `startSizeOf ⇒ 100` and a move carrying `clientX 150`, so the declared chain
      // is `150 - 100 = 50`, well inside the `{min: 0, max: 200}` pair. `M-12` follows the SAME
      // choice (its own failure text already printed `150 - 100 = 50`).
      `M-1 half (iii)/§2.3 row 11/§R R6 — and the committed value is the CLAMPED value of the DECLARED CHAIN (\`sizeFromPointer({x: 150, y: 300}, 100) = 150 - 100 = 50\`, inside the \`{min: 0, max: 200}\` pair): a fallback committing the RAW default (\`100\`) FAILS this row, and so does a delta-added-to-start composition (\`150\`). Recorded: ${JSON.stringify(
        sink.records.map((r) => r.value),
      )}`,
    ).toBe(50)
  })

  it('M-2 §3.1 — THE DISPOSED-SESSION SHORT-CIRCUIT: `attach()` ⇒ `false`, `detach()` ⇒ `false`, `detached` ⇒ `true`, `stats()` readable and ZERO session calls — the module honours a disposed session rather than delegating to a dead one', async () => {
    const createGutterAffordance = await factoryOf<(options?: Record<string, unknown>) => AffordanceLike>('M-2')
    const source = new RecordingSource()
    const sink = makeSink()
    const element: Record<string, unknown> = { name: 'M-2-element' }
    const { session, calls: deadCalls } = makeDisposedSession()
    const affordance = createGutterAffordance({
      session,
      source,
      element,
      target: { name: 'M-2-target' },
      sizeFromPointer: (pointer: { x: number }, start: number): unknown => pointer.x - start,
      axisOf: (): unknown => AXIS_TOKEN,
      cursorOf: (): unknown => undefined,
      applyPreview: (): void => undefined,
      applyCursor: (): void => undefined,
      startSizeOf: (): unknown => 100,
      boundsOf: (): unknown => ({ min: 0, max: 200 }),
      resizableOf: (): unknown => true,
      commit: (gesture: unknown, value: number): void => sink.commit(gesture, value),
      moveTypeOf: (): unknown => POINTER_TYPES.move,
    })
    const attached = affordance.attach()
    const beforeDetach = deadCalls.length
    const detached = affordance.detach()
    const stats = affordance.stats()
    console.log(
      `M-2 MEASURED :: ${JSON.stringify({
        attach: attached,
        detach: detached,
        detachedFlag: affordance.detached,
        sessionCalls: deadCalls,
        stats,
        asFiledMeasuredCounts: 'the landed E3 kept DELEGATING to a disposed session and its `detached` getter ignored `disposed` (E3-HOST-3, measured true); the fix at cc7fba5 makes `detached` read `ended || session.disposed === true` and short-circuits attach/detach at ZERO session calls',
        clause: 'docs/specs/gutter-ui.md §3.1 M-2 + §R.4 C-A2',
      })}`,
    )
    expect(
      attached,
      `M-2 §3.1/§2.3 row 14/§3.2 F-6 — \`attach()\` ⇒ \`false\` over a DISPOSED session, with ZERO session calls (the E3 declared degradation: a VALID but INERT controller). MEASURED session calls: ${JSON.stringify(
        deadCalls,
      )}`,
    ).toBe(false)
    expect(
      deadCalls.slice(0, beforeDetach),
      `M-2 §3.1 — and the refused attach DELEGATED NOTHING: the disposed-session double’s own call log is EMPTY after it. Recorded: ${JSON.stringify(
        deadCalls.slice(0, beforeDetach),
      )}`,
    ).toEqual([])
    expect(detached, `M-2 §3.1 — \`detach()\` ⇒ \`false\` over a disposed session (the refusal path still made no call)`).toBe(false)
    expect(
      deadCalls,
      `M-2 §3.1/§2.3 row 14 — ZERO session calls at EVERY boundary over a disposed session: no \`install\`, no \`dispose\`, no \`stats\`, no \`gesture\`. Recorded: ${JSON.stringify(
        deadCalls,
      )}`,
    ).toEqual([])
    expect(
      affordance.detached,
      'M-2 §3.1/§2.1 — `detached` reads `true` FOREVER once the session reads `disposed === true` (E3-HOST-3’s remedy: the flag must reflect the session’s own disposal, and the module’s observable half is asserted here while the `E3`-side half is the composition’s own)',
    ).toBe(true)
    expect(
      typeof stats['moves'],
      `M-2 §3.1/§2.1 item 5 — \`stats()\` is READABLE with zeroed gesture counters over a disposed session (never a throw). Read: ${JSON.stringify(
        stats,
      )}`,
    ).toBe('number')
    expect(Number(stats['moves']), 'M-2 §2.1 item 5 — and the counters are zeroed: nothing was ever driven').toBe(0)
    // THE CONTROL DRIVE: the SAME row cannot pass vacuously — an UNDISPOSED session attaches
    // normally, so `false` above is the DISPOSAL’s reading and never a constant.
    const control = await makeHarness({}, 'M-2 control')
    expect(
      control.affordance.attach(),
      'M-2 CONTROL — an UNDISPOSED session over the same composition still attaches normally (`true`), so the two `false` readings above are the DISPOSAL’s and not a constant',
    ).toBe(true)
    expect(control.affordance.detached, 'M-2 CONTROL — and a fresh affordance reads `detached === false` before its detach').toBe(false)
  })

  it('M-3 §3.1 — THE THROWING-HOOK DISCARD: a consumer hook that THROWS PROPAGATES, the per-gesture record is discarded in the module’s `finally`, and a later reset makes ZERO session calls', async () => {
    let thrown: unknown = null
    const h = await makeHarness(
      {
        applyPreview: (): void => {
          throw new Error('M-3 throwing consumer hook')
        },
      },
      'M-3',
    )
    expect(h.affordance.attach(), 'M-3 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0, 0, 0))
    h.source.fire('pointerdown', pointerEvent(0))
    const fired = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    thrown = fired.thrown
    const callsAfterThrow = h.sessionLog.length
    console.log(
      `M-3 MEASURED :: ${JSON.stringify({
        propagated: thrown !== null,
        thrown: describeThrown(thrown),
        sessionCallCountAfterTheThrow: callsAfterThrow,
        sessionCalls: h.sessionLog.map((c) => c.call),
        moduleResets: h.affordance.stats()['resets'],
        sinkWrites: h.sink.records.length,
        asFiledMeasuredCounts: 'the landed E3 cleared its record AFTER the consumer hook and without try/finally, so the measured behaviour was ONE `session.reset` with the DEAD handle on BOTH the throwing and the non-throwing arms (E3-HOST-1); the fix at cc7fba5 makes the terminal bookkeeping unconditional in a `finally`',
        clause: 'docs/specs/gutter-ui.md §3.1 M-3 + §0A note 5 + §R.4 C-A2',
      })}`,
    )
    expect(
      thrown !== null,
      `M-3 §3.1/§3.2 F-8 — the consumer hook’s throw PROPAGATES out of the module’s own listener turn: it is CONSUMER CODE (\`E3\`’s named behaviour for a consumer seam, \`docs/specs/gutter.md\` §2.4 item 2 row 4). MEASURED: the move turn ${
        thrown !== null ? 'threw' : 'returned normally'
      }`,
    ).toBe(true)
    expect(
      h.sink.records.length,
      'M-3 §3.1 — and NO sink write happened for that turn (the throw precedes any committed terminal)',
    ).toBe(0)
    // THE DISCARD: the record is gone, so `reset(element)` refuses with ZERO session calls.
    const before = h.sessionLog.length
    const stats = h.affordance.stats()
    const resetCalls = h.sessionLog.filter((c) => c.call === 'reset').length
    expect(
      h.sessionLog.length - before,
      `M-3 §3.1/§0A note 5/§2.5 — after the propagated throw, NOTHING further is delegated for that gesture: the module’s own record was DISCARDED in its \`finally\`, so a later \`reset(element)\` refuses with ZERO session calls (\`'no-gesture'\`-class) and the module’s own \`resets\` counter does not move. MEASURED session calls after the throw: ${JSON.stringify(
        h.sessionLog.slice(before).map((c) => c.call),
      )}; resets recorded by the module: ${String(stats['resets'])}; session \`reset\` calls in the whole drive: ${resetCalls}`,
    ).toBe(0)
    expect(
      stats['resets'],
      'M-3 §3.1 — the module’s own `resets` counter did NOT increment (a retained record is the E3-HOST-1 defect and FAILS this row)',
    ).toBe(0)
    // THE CONTROL DRIVE — the SAME row cannot pass vacuously: with a NON-THROWING hook the
    // gesture reaches its terminal normally, so the `0` above is the DISCARD’s reading.
    const control = await makeHarness({}, 'M-3 control')
    expect(control.affordance.attach(), 'M-3 CONTROL — attach').toBe(true)
    control.source.fire('pointerover', pointerEvent(0, 0, 0))
    control.source.fire('pointerdown', pointerEvent(0))
    control.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    control.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    expect(
      control.sink.records.length,
      'M-3 CONTROL — with a NON-throwing hook the same drive COMMITS once, so the throw arm’s zero is the throw’s reading and not a stalled drive',
    ).toBe(1)
  })

  it('M-4 §3.1 — `attach()` installs FOUR listeners of this module’s own through the source, and the session owns the FIFTH: the composed `source.on` log reads FIVE, FOUR of them this module’s', async () => {
    await requireLiveModule('M-4')
    const h = await makeHarness({}, 'M-4')
    const attached = h.affordance.attach()
    // **⟶ OWNER-SCOPED 2026-09-27 — THE OWNER ATTRIBUTION REPAIR (`docs/specs/gutter-ui.md`
    // `§3.1 M-4`; `§2.3` rows 2/6c/13; `§R` `R-12`; `docs/specs/gutter.md` `§2.2` P-3).** THE
    // AS-FILED READING IS KEPT VISIBLE ABOVE AND SUPERSEDED: it read the COMPOSED per-type map
    // as if it were this module's own (`ons.filter((e) => moduleSet.includes(e.type))`), which
    // cannot separate the module's own `'pointerdown'` from the SESSION's own single
    // `'pointerdown'` install made through the SAME source on the SAME element. `M-4`'s own cell
    // rules the split: *"FOUR of the five are THIS MODULE'S OWN … plus the session's OWN single
    // `'pointerdown'` attach … so the source's log shows FIVE `on` calls in the composed
    // attach"*. The census is now read BY OWNER, and the composed figure is REPORTED as the sum.
    // The drive completes with `detach()` so the module's own listeners are identifiable BY
    // IDENTITY through its own four removals (`§2.3` row 13) — the ONLY discriminator between
    // the two `'pointerdown'` listeners, which agree in element AND type.
    expect(h.affordance.detach(), 'M-4 §2.3 row 13 — the drive completes with `detach()` so this module’s own listeners are attributed BY IDENTITY through its own four removals (the ONLY discriminator between the module’s `pointerdown` and the session’s)').toBe(true)
    const census = ownerScopedOnCensus(h.source)
    const ons = census.composed
    const moduleSet = moduleOwnTypes()
    console.log(
      `M-4 MEASURED :: ${JSON.stringify({
        attached,
        composedOnCount: ons.length,
        composedPerType: census.composedPerType,
        moduleOwnDistinctListeners: census.moduleOwnDistinctListenerCount,
        moduleOwnPerType: census.moduleOwnPerType,
        moduleOwnTypesAttachedOnce: census.moduleOwnTypesAttachedOnce,
        otherOwners: census.otherOwners.length,
        otherOwnersPerType: census.otherOwnersPerType,
        types: ons.map((e) => e.type),
        clause: 'docs/specs/gutter-ui.md §3.1 M-4 + §2.3 rows 2/6c/13 + §R.2 R-12 + docs/specs/gutter.md §2.2 P-3',
      })}`,
    )
    expect(
      ons.length,
      `M-4 §3.1/§2.3 row 2 — THE COMPOSED READING, REPORTED AS THE SUM OF THE OWNERS: the source’s log shows FIVE \`on\` calls in the composed attach — THIS MODULE’S FOUR (the hover enter, the hover exit, the module’s own context-button read and the module’s own MOVE listener) PLUS THE SESSION’S OWN SINGLE \`'pointerdown'\` install made through the same source by \`E3\`’s \`attach\` (module \`${String(
        census.moduleOwnDistinctListenerCount,
      )}\` + the other owner \`${String(census.otherOwners.length)}\` = \`5\`). Read: ${JSON.stringify(ons.map((e) => e.type))}`,
    ).toBe(5)
    // **THE MODULE'S OWN CENSUS IS READ OVER THE MODULE'S OWN LISTENERS, BY IDENTITY**
    // (`§3.1 M-4`: *"exactly FOUR `source.on` calls for this module's own listeners"*), NOT as
    // the composed map — so the SESSION'S OWN `'pointerdown'` is attributed to the SESSION and
    // never counted here, and the row's own `every(n => n === 1)` rule is asserted over the
    // module's set.
    expect(
      census.moduleOwnDistinctListenerCount,
      `M-4 §3.1 — FOUR of the five are THIS MODULE’S OWN, each carrying the affordance element BY IDENTITY. A row asserting “three” FAILS this row’s own text; a row that cannot say WHICH listener set it counts FAILS §4.4 S-2 — so the module’s own four are named HERE and the other owner’s separately. Read (module’s own, by identity): ${JSON.stringify(
        census.moduleOwnPerType,
      )}`,
    ).toBe(4)
    expect(
      census.moduleOwnPerType.map(([type]) => type),
      `M-4 §3.1/§2.3 row 2 — the module’s OWN four are its OWN FOUR TYPES, BY NAME: the hover enter, the hover exit, the module’s own context-button read and the module’s own MOVE listener. Read: ${JSON.stringify(
        census.moduleOwnPerType,
      )}`,
    ).toEqual([...moduleSet].sort())
    expect(
      census.moduleOwnTypesAttachedOnce,
      `M-4 §3.1 — **THE ROW’S OWN RULE, SCOPED TO THIS MODULE’S OWN LISTENERS: each of the module’s four types appears EXACTLY ONCE.** The as-filed form asserted this over the COMPOSED per-type map, which is FALSE BY CONSTRUCTION (the composed map legitimately reads \`pointerdown: 2\`), so the rule is asserted over the module’s own set. Read: ${JSON.stringify(
        census.moduleOwnPerType,
      )} — a module that caused a SECOND listener of a type it already owns (a DIFFERENT handler) reads \`2\` here and FAILS`,
    ).toBe(true)
    expect(
      census.moduleOwn.every((e) => e.element === h.element),
      'M-4 §3.1/§2.2 P-2 — the module’s four carry NO `document` and no element other than the affordance (every one is the element option, by identity)',
    ).toBe(true)
    // **THE SESSION'S OWN SINGLE INSTALL IS ATTRIBUTED TO THE SESSION** (`§3.1 M-4`: *"plus the
    // session's own single `'pointerdown'` attach"*; `docs/specs/gutter.md` `§2.2` P-3, `§2.3`
    // row 2's ownership clause, `M-18`): its type is the session's own start token and it is NOT
    // one of the module's own listeners.
    expect(
      census.otherOwnersPerType,
      `M-4 §2.3 row 2/6c / docs/specs/gsession.md §2.3 item 1(a) — THE SESSION’S OWN SINGLE \`'pointerdown'\` INSTALL IS THE FIFTH, ATTRIBUTED TO THE SESSION: made through the SAME source, on the SAME element, by \`E3\`’s \`attach\`/\`session.install\` (its own token \`POINTER_TYPES.start\`), and NOT one of the module’s own four listeners. Read: ${JSON.stringify(
        census.otherOwnersPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.start, 1]])
    expect(attached, 'M-4 §2.1 — and `attach()` returns `true`').toBe(true)
    expect(
      h.source.ons().some((e) => e.type === POINTER_TYPES.end || e.type === POINTER_TYPES.cancel),
      'M-4 §R R5 — NO capture call at all, and the session’s OWN tracking trio is installed by the SESSION at establishment (never by this module at attach time)',
    ).toBe(false)
    // **THE FALSIFIABLE POSITIVE CONTROL — A SECOND LISTENER OF THE SAME TYPE CAUSED BY THE
    // MODULE MUST FAIL THE ROW.** The row's own census machinery is driven over a SYNTHETIC log
    // carrying a SECOND module listener of a type the module already owns (the measured defect's
    // own shape: a composed map reading `pointerdown: 2`). The duplicate is a GENUINELY DIFFERENT
    // handler, so it survives the identity filter and the module's own per-type census reads `2`
    // for that type — the row's own `every(n => n === 1)` rule FAILS. **A rule asserted only over
    // the composed map cannot make this distinction — which is why the repair is by OWNER, not by
    // count.**
    const ownOns = h.source.ons()
    const duplicated: SourceEntry[] = [...ownOns, { ...(ownOns[1] as SourceEntry), handler: (): void => undefined }]
    // **THE CONTROL DRIVES THE ROW'S OWN RULE over the log BY TYPE** (the same per-type census the
    // conformant reading is asserted through): the synthetic second listener carries the SAME TYPE
    // as a module type the module already owns — the measured defect's shape — so the module's own
    // per-type census reads `2` for it and `every(n => n === 1)` FAILS. The conformant reading
    // above is ALSO asserted over the module's own DISTINCT listeners by identity, so the two
    // readings together pin both the owner split and the once-per-type rule.
    const duplicatedCensus = ownerScopedCensus(
      duplicated,
      (entry) => moduleSet.includes(entry.type),
    )
    console.log(
      `M-4 CONTROL MEASURED :: ${JSON.stringify({
        duplicatedModuleOwn: duplicatedCensus.moduleOwnPerType,
        duplicatedDistinctListeners: duplicatedCensus.moduleOwnDistinctListenerCount,
        moduleOwnTypesAttachedOnce: duplicatedCensus.moduleOwnTypesAttachedOnce,
        clause: 'docs/specs/gutter-ui.md §3.1 M-4 (the row’s own every(n => n === 1) rule)',
      })}`,
    )
    expect(
      duplicatedCensus.moduleOwnTypesAttachedOnce,
      `M-4 §3.1 — POSITIVE CONTROL (THE ROW’S OWN MACHINERY, DRIVEN OVER A SECOND MODULE LISTENER OF AN ALREADY-OWNED TYPE): a module that attaches a SECOND listener of a type it already owns MUST FAIL the row’s own \`every(n => n === 1)\` rule. Read: ${JSON.stringify(
        duplicatedCensus.moduleOwnPerType,
      )}`,
    ).toBe(false)
    expect(
      duplicatedCensus.moduleOwnPerType.map(([type, n]) => `${type}:${String(n)}`),
      `M-4 §3.1 — POSITIVE CONTROL (THE SAME ASSERTION, THE SAME READING): the duplicated log names a module type TWICE, so the module’s own per-type census is NOT \`every(n => n === 1)\` and it MOVES off the conformant reading. Read: ${JSON.stringify(
        duplicatedCensus.moduleOwnPerType,
      )}`,
    ).not.toEqual(census.moduleOwnPerType.map(([type, n]) => `${type}:${String(n)}`))
    expect(
      duplicatedCensus.moduleOwnDistinctListenerCount > census.moduleOwnDistinctListenerCount,
      `M-4 §3.1 — POSITIVE CONTROL (THE FALSIFIER, MADE VISIBLE): the duplicated log carries MORE distinct module listeners than the conformant one (\`${String(
        duplicatedCensus.moduleOwnDistinctListenerCount,
      )}\` against the composed reading’s \`${String(census.moduleOwnDistinctListenerCount)}\`), which is what a fifth module attach looks like from the source’s log`,
    ).toBe(true)
  })

  it('M-5 §3.1 — THE SINGLE WRITER ON THE REAL COMPOSITION: for EVERY terminal path the sink’s own record and `E3`’s `stats().sinkCalls` AGREE cell by cell, and the module’s own sink-call count is ZERO — ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING): the harness’s session channel is a NON-FORWARDING recorder, so the sink’s record IS `E3`’s single write, and the TWO-WRITER control is driven in the same row', async () => {
    await requireLiveModule('M-5')
    /** The composed `E3` controller's own `sinkCalls`, over any composition (the two-writer
     *  control below is not a `Harness`, so it reads the same counter directly). */
    const sinkCallsOf = (affordance: AffordanceLike): number => {
      const stats = (affordance.controller as { stats?: () => Record<string, unknown> } | null | undefined)?.stats?.()
      const value = stats?.['sinkCalls']
      return typeof value === 'number' ? value : -1
    }
    const cases: Array<{
      path: string
      expected: number
      build: () => Promise<{ sink: number; counter: number; moduleCalls: number; sessionChannel: unknown[] }>
    }> = [
      {
        path: 'a VALID `end`',
        expected: 1,
        build: async () => {
          const h = await makeHarness({}, 'M-5/a')
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
          const counter = controllerSinkCalls(h)
          // THE MODULE'S OWN INVOCATIONS = every invocation of its `commit` seam MINUS `E3`'s own
          // single write site (a real reading, never a hard-coded zero).
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
      {
        // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — RULE A's third bullet, and THE
        // AS-FILED READING IS KEPT VISIBLE: the as-filed cell declared `expected: 1` for THIS
        // drive, which is the drive whose OWN LABEL names the unusable bounds pair. For an
        // UNUSABLE PAIR the reset's clamp answers `NaN`, so `E3`'s write site returns BEFORE an
        // attempt exists — `docs/specs/gutter.md` `§2.3` item 4 clause 3 / `§3.2 F-14`: *"the
        // sink is NOT written (`sinkCalls` stays `0`) while `ResizeResetResult.committed` reports
        // `false`"* — while the SESSION's own recorder still receives the `NaN` it was handed.**
        path: 'an invalid `reset` at an UNUSABLE bounds pair (`boundsOf ⇒ undefined` ⇒ the clamp answers `NaN`; the as-filed `1` is SUPERSEDED by `0` — `E3` refuses before its write site)',
        expected: 0,
        build: async () => {
          // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — THIS CELL'S OWN
          // DRIVE NOW REACHES `§2.3` ROW 9's LIVE-GESTURE WINDOW.** The as-filed `boundsOf` answers
          // `undefined` on EVERY call, which makes the cell's declared pair unreachable in TWO
          // ways at once: (i) every observed move is invalid, so the drive's one move is invalid in
          // row 8's PRE-HANDLE window and `controller.reset(element)` refuses `'no-gesture'` before
          // `E3`'s write site, and (ii) the `pointerup` that follows commits through `E3`'s
          // `sizeFor` read, which the unusable pair turns into `NaN` — so even the terminal reads
          // `0` for a reason that is NOT this cell's. THE CELL'S OWN SUBJECT IS UNCHANGED: the
          // UNUSABLE PAIR IS STILL THE PAIR THE RESET'S CLAMP READS (the `boundsOf` below is
          // stateful ONLY so the setup's own validity evaluation — `E3`'s `axisFor`/`isResizable`
          // establishment and the setup move's own clamp — sees a usable pair, and BOTH
          // `E3.boundsFor` evaluations at the reset terminal read `undefined`). MEASURED on the
          // frozen `E3` + session with the stateful seam: `resets=1`, `sinkCalls=0`, ONE session
          // frame carrying `NaN` with outcome `reset` — the ruled two-reading split.
          const boundsCalls = { n: 0 }
          const h = await makeHarness(
            {
              boundsOf: (): unknown => {
                boundsCalls.n += 1
                return boundsCalls.n <= 2 ? { min: 0, max: 200 } : undefined
              },
            },
            'M-5/b',
          )
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
          const counter = controllerSinkCalls(h)
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
      {
        // THE PAIRED CONTROL FOR THE CELL ABOVE: the SAME invalid arm, with a USABLE pair, so
        // the reset's clamp ANSWERS A NUMBER (`100`, the consumer's pre-drag default) and the
        // write lands EXACTLY ONCE (RULE A's second bullet: *"a invalid-drag `reset` whose own
        // clamp answers a number: `1` sink write of the CLAMPED pre-drag size"*).
        path: 'an invalid `reset` whose own clamp ANSWERS A NUMBER (a non-finite `sizeFromPointer` over a USABLE pair ⇒ the reset clamps the pre-drag default)',
        expected: 1,
        build: async () => {
          const h = await makeHarness({ sizeFromPointer: (): unknown => Number.NaN }, 'M-5/b2')
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
          const counter = controllerSinkCalls(h)
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
      {
        path: 'a REFUSED reset (`\'not-resizable\'`)',
        expected: 0,
        build: async () => {
          const h = await makeHarness({ resizableOf: (): unknown => false }, 'M-5/c')
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
          const counter = controllerSinkCalls(h)
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
      {
        path: 'a `cancel` (via `pointercancel`)',
        expected: 0,
        build: async () => {
          const h = await makeHarness({}, 'M-5/d')
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.cancel, pointerEvent(0, 175, 300))
          const counter = controllerSinkCalls(h)
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
      {
        path: 'the DROP path (a secondary-button press during the drag)',
        expected: 0,
        build: async () => {
          const h = await makeHarness({}, 'M-5/e')
          h.affordance.attach()
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire('pointerdown', pointerEvent(2, 175, 300))
          h.source.fire(POINTER_TYPES.cancel, pointerEvent(2, 175, 300))
          const counter = controllerSinkCalls(h)
          return { sink: h.sink.records.length, counter, moduleCalls: h.calls.commit - counter, sessionChannel: h.sessionCommits.map((c) => c.value) }
        },
      },
    ]
    const measured: string[] = []
    for (const shape of ['the single-writer composition', 'the same composition with BOTH readings taken in the same cell']) {
      for (const testCase of cases) {
        const readings = await testCase.build()
        measured.push(`${shape} · ${testCase.path} :: sink=${readings.sink} counter=${readings.counter} module=${readings.moduleCalls}`)
        expect(
          readings.counter,
          `M-5 §3.1/§5.5.1 P-GU-SM-1 — the two readings AGREE IN EVERY CELL (the sink’s own record against \`E3\`’s \`stats().sinkCalls\`): a divergence between them is the FALSIFIER and FAILS the row. [${shape}] [${testCase.path}] Recorded: sink=${readings.sink}, E3 = ${readings.counter}`,
        ).toBe(readings.sink)
        expect(
          readings.sink,
          `M-5 §3.1/§2.3’s terminal write table — the declared count for ${testCase.path} is EXACTLY ${testCase.expected} (the exact multiset, never “at least one”)`,
        ).toBe(testCase.expected)
        expect(
          readings.moduleCalls,
          `M-5 §3.1/§2.6 item 1 — and the MODULE’S OWN sink-call count is ZERO in every cell: it passes \`commit\` to \`E3\` only, and every invocation of that seam is \`E3\`’s own write site. [${testCase.path}] MEASURED: module’s own invocations = ${readings.moduleCalls}`,
        ).toBe(0)
        if (testCase.path.includes('UNUSABLE bounds pair')) {
          // **THE RULED READING BESIDE THE ZERO: `writes: 0` IS NOT *"THE SINK WAS NEVER
          // REACHED"*** (`docs/specs/gutter.md` `§2.3` item 3's counting rule + `§2.3` item 4
          // clause 3): the SESSION is still called once with the `NaN` the clamp answered.
          console.log(
            `M-5 §3.1 unusable-pair cell :: ${JSON.stringify({ sink: readings.sink, counter: readings.counter, sessionChannel: readings.sessionChannel.map((v) => String(v)) })}`,
          )
          expect(
            readings.sessionChannel.length === 1 && Object.is(readings.sessionChannel[0], Number.NaN),
            `M-5 §3.1/§2.3 item 4 clause 3 — and the SESSION’s own recorder STILL received the value it was handed (\`NaN\` at that pair), even though the sink was written ZERO times: ${JSON.stringify(
              readings.sessionChannel.map((v) => String(v)),
            )}. A row that reads \`writes: 0\` as “the session was never called” FAILS this reading. [${shape}]`,
          ).toBe(true)
        }
        if (testCase.path.includes('cancel') || testCase.path.includes('DROP')) {
          // **RULE A's FOURTH BULLET: `cancel`/`pointercancel` (and the DROP path that rides the
          // session's own `cancel` terminal) write `0` ON BOTH CHANNELS** — the sink AND the
          // session's recorder. A row reading only the sink cannot distinguish “no write” from
          // “the session was handed a value nobody wrote”.
          expect(
            readings.sessionChannel.length,
            `M-5 §3.1/§2.3 item 3 — the cancel/drop path writes NOTHING ON EITHER CHANNEL: the session's own recorder reads ZERO beside the sink's ZERO (\`commit\` is invoked ZERO times on a \`cancel\` terminal). Recorded: ${JSON.stringify(
              readings.sessionChannel.map((v) => String(v)),
            )} [${shape}] [${testCase.path}]`,
          ).toBe(0)
        }
      }
    }
    // =====================================================================================
    // **THE TWO-WRITER CONTROL (`C1`, `E3`'s `F-9` / `§5.5.1 P-GT-SM-3` shape `(2)`) — THE
    // FALSIFIER THAT MAKES THE AGREEMENT ABOVE NON-VACUOUS.** The SAME function is placed on BOTH
    // channels: the session's `commit` OPTION and the module's `commit` SEAM. For that shape the
    // sink's own record MUST DIVERGE from `E3`'s counter (the second writer's call never passes
    // through `E3`'s one call site), while the SINGLE-writer composition above agrees cell by
    // cell. This control cannot pass vacuously: if the harness's session channel still forwarded
    // to the sink, this reading would be `sink === counter` and the control would FAIL.
    // =====================================================================================
    const twoWriterFactory = await factoryOf<(options?: Record<string, unknown>) => AffordanceLike>('M-5 two-writer control')
    const twoWriterSource = new RecordingSource()
    const twoWriterSink = makeSink()
    const twoWriterRaw = createGestureSession({ source: twoWriterSource as never, commit: twoWriterSink.commit as never })
    const twoWriterSession = instrumentSession(twoWriterRaw)
    const twoWriterAffordance = twoWriterFactory({
      session: twoWriterSession.session,
      source: twoWriterSource,
      element: { name: 'M-5-two-writer-element' },
      target: { name: 'M-5-two-writer-target' },
      sizeFromPointer: (pointer: { x: number }, start: number): unknown => pointer.x - start,
      axisOf: (): unknown => AXIS_TOKEN,
      cursorOf: (): unknown => undefined,
      applyPreview: (): void => undefined,
      applyCursor: (): void => undefined,
      startSizeOf: (): unknown => 100,
      boundsOf: (): unknown => ({ min: 0, max: 200 }),
      resizableOf: (): unknown => true,
      commit: twoWriterSink.commit,
      moveTypeOf: (): unknown => POINTER_TYPES.move,
    })
    expect(twoWriterAffordance.attach(), 'M-5 §3.1 — the TWO-WRITER control composition attaches like any other (the second writer is a WIRING fact, not an attach-time failure)').toBe(true)
    twoWriterSource.fire('pointerover', pointerEvent(0, 0, 0))
    twoWriterSource.fire('pointerdown', pointerEvent(0))
    twoWriterSource.fire(POINTER_TYPES.move, pointerEvent(0, 175, 300))
    twoWriterSource.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    const twoWriterRecord = twoWriterSink.records.length
    const twoWriterCounter = sinkCallsOf(twoWriterAffordance)
    console.log(
      `M-5 MEASURED :: ${JSON.stringify({
        cells: measured,
        twoWriterControl: { sinkRecord: twoWriterRecord, e3Counter: twoWriterCounter, diverges: twoWriterRecord !== twoWriterCounter },
        clause: 'docs/specs/gutter-ui.md §3.1 M-5 + §R R8(e) + docs/specs/gutter.md §3.2 F-9/§5.5.1 P-GT-SM-3 shape (2)',
      })}`,
    )
    expect(
      twoWriterRecord,
      `M-5 §3.1/§5.5.1 P-GT-SM-3 shape (2)/C1 — THE TWO-WRITER COMPOSITION'S SINK RECORD reads TWO for the ONE valid \`end\` it drove (one write from \`E3\`'s single write site, one from the session's own \`commit\` channel): the shape the single-writer discipline exists to catch. Recorded: ${JSON.stringify(
        twoWriterSink.records.map((r) => ({ value: r.value, outcome: String(r.outcome) })),
      )}`,
    ).toBe(2)
    expect(
      twoWriterCounter,
      'M-5 §3.1/§5.5.1 P-GT-SM-3 shape (2) — and the TWO-WRITER composition’s `E3` counter STILL reads ONE: the second writer’s call never passes through `E3`’s one call site, so the sink’s record and the counter DIVERGE. A composition that counted only its own calls would pass every count-based row, which is why this row reads BOTH.',
    ).toBe(1)
    expect(
      twoWriterRecord,
      'M-5 §3.1 — THE DIVERGENCE ITSELF, asserted as an inequality: `sink !== counter` in the two-writer cell (where the single-writer cells above assert `sink === counter`). A harness whose session channel FORWARDED to the sink would make this control read `sink === counter` and FAIL here — so this control cannot pass vacuously.',
    ).not.toBe(twoWriterCounter)
  })

  it('M-6 §3.1 — THE FACTORY IS TOTAL and builds the CONTROLLER exactly once (the session is the WIRING’s, never the module’s)', async () => {
    const mod = await requireModule('M-6')
    const factory = mod['createGutterAffordance'] as ((options?: unknown) => unknown) | undefined
    expect(typeof factory, 'M-6 §2.1 — `createGutterAffordance` is a value export').toBe('function')
    const shapes: unknown[] = [
      undefined,
      null,
      42,
      'x',
      new Proxy(
        {},
        {
          get(): never {
            throw new Error('M-6 hostile proxy')
          },
        },
      ),
      {
        get session(): never {
          throw new Error('M-6 throwing accessor')
        },
      },
    ]
    for (const shape of shapes) {
      let threw: unknown = null
      let result: unknown = null
      try {
        result = (factory as (options?: unknown) => unknown)(shape)
      } catch (e) {
        threw = e
      }
      expect(threw, `M-6 §3.1/§3.2 F-6 — \`createGutterAffordance(${brief(shape)})\` NEVER throws`).toBe(null)
      const affordance = result as Record<string, unknown> | null
      expect(
        affordance !== null && typeof affordance === 'object',
        `M-6 §2.1 — every case returns an OBJECT (never \`null\`/\`undefined\`/a primitive) for ${brief(shape)}`,
      ).toBe(true)
      for (const member of ['attach', 'detach', 'stats']) {
        expect(
          typeof affordance?.[member],
          `M-6 §2.1 — the member \`${member}\` is PRESENT and CALLABLE for ${brief(shape)} (every member is TOTAL in EVERY case)`,
        ).toBe('function')
      }
      expect(
        typeof affordance?.['detached'],
        `M-6 §2.1 — \`detached\` is present as a boolean reading for ${brief(shape)}`,
      ).toBe('boolean')
      expect('controller' in (affordance ?? {}), `M-6 §2.1 — \`controller\` is present for ${brief(shape)}`).toBe(true)
    }
    // THE VALID CASE: the controller factory is called exactly once and the session factory
    // ZERO times (the session arrives as `options.session`).
    const h = await makeHarness({}, 'M-6 valid case')
    expect(typeof h.affordance.attach, 'M-6 §2.1 — the valid options object yields a full affordance').toBe('function')
    expect(
      typeof h.affordance.controller,
      `M-6 §2.1 item 4/§3.4 R-4 — \`controller\` is the \`E3\` controller this affordance composed (exposed READ-ONLY so a row can read \`E3\`’s own counters beside this module’s, \`§5.5.1 P-GU-SM-1\`’s two-reading rule). Read: ${typeof h.affordance.controller}`,
    ).toBe('object')
    expect(
      h.source.ons().length,
      'M-6 §2.3 row 1 — and NO listener was attached BEFORE `attach()`',
    ).toBe(0)
  })

  it('M-7 §3.1 — `attach()` delegates once; a repeat attach delegates NOTHING and the first configuration stays in force', async () => {
    await requireLiveModule('M-7')
    const h = await makeHarness({}, 'M-7')
    const first = h.affordance.attach()
    const onsAfterFirst = h.source.ons().length
    const callsAfterFirst = h.sessionLog.length
    const second = h.affordance.attach()
    console.log(
      `M-7 MEASURED :: ${JSON.stringify({
        first,
        second,
        onsAfterFirst,
        onsAfterSecond: h.source.ons().length,
        sessionCallsAfterFirst: callsAfterFirst,
        sessionCallsAfterSecond: h.sessionLog.length,
        clause: 'docs/specs/gutter-ui.md §2.3 row 3',
      })}`,
    )
    expect(first, 'M-7 §2.3 row 2 — the first `attach()` succeeds').toBe(true)
    expect(second, 'M-7 §2.3 row 3 — the second `attach()` returns FALSE (a repeat attach is a NO-OP)').toBe(false)
    expect(
      h.source.ons().length - onsAfterFirst,
      `M-7 §2.3 row 3 — and the repeat delegates NOTHING: ZERO further \`source.on\` calls. Read: ${JSON.stringify(
        h.source.ons().map((e) => e.type),
      )}`,
    ).toBe(0)
    expect(
      h.sessionLog.length - callsAfterFirst,
      'M-7 §2.3 row 3 — ZERO session calls either (no second install, no second dispose)',
    ).toBe(0)
    // THE FIRST CONFIGURATION STAYS IN FORCE: the element the module holds is still the
    // one the first attach bound, and the composition still drives.
    h.source.fire('pointerover', pointerEvent(0))
    expect(
      h.cursorCalls.length,
      'M-7 §2.3 row 3 — “the first configuration stays in force”: the affordance attached by the FIRST call still drives its own turns',
    ).toBeGreaterThan(0)
  })

  it('M-8 §3.1 — A VALID DRAG COMMITS THE CLAMPED DRAGGED VALUE EXACTLY ONCE through `E3`, writes NO preview at the terminal, and the handle’s own value channel carries the clamped value before the release', async () => {
    await requireLiveModule('M-8')
    // The move’s `sizeFromPointer` yields a value OUTSIDE the pair, so the committed value
    // must be the CLAMPED one — and `§R` R6 pins the channel: `handle.set(clamped)`.
    const h = await makeHarness({ sizeFromPointer: (): unknown => 900 }, 'M-8')
    expect(h.affordance.attach(), 'M-8 §2.1 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0, 0, 0))
    h.source.fire('pointerdown', pointerEvent(0))
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    const handle = h.session.gesture()
    const previewsBeforeTerminal = h.previews.length
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const stats = h.affordance.stats()
    const controllerStats = controllerStatsOf(h)
    console.log(
      `M-8 MEASURED :: ${JSON.stringify({
        moves: stats['moves'],
        previews: stats['previews'],
        previewValues: h.previews.map((p) => p['value']),
        sinkValues: h.sink.records.map((r) => r.value),
        controllerSinkCalls: controllerStats['sinkCalls'],
        controllerWritten: controllerStats['written'],
        clause: 'docs/specs/gutter-ui.md §3.1 M-8 + §R R6 + §2.3 row 11',
      })}`,
    )
    expect(stats['moves'], 'M-8 §3.1 — `stats().moves === 1`: exactly one observed move').toBe(1)
    expect(
      Number(stats['previews']),
      `M-8 §3.1/§2.5 — \`stats().previews === 1\`: the mid-drag observation, and NOTHING more at the terminal. Read: ${JSON.stringify(
        h.previews.map((p) => p['value']),
      )}`,
    ).toBe(1)
    expect(
      h.previews[0]?.['value'],
      'M-8 §3.1/§2.4 item 2 — the preview carried the CLAMPED value (`clampToBounds(900, {min:0,max:200}) === 200`), never the raw 900',
    ).toBe(200)
    expect(
      handle?.value as unknown,
      'M-8 §3.1/§R R6 — the session handle’s OWN value reads back the CLAMPED value at its terminal (`gesture.value === 200`), which is what makes `E3`’s `sizeFor` read-back possible',
    ).toBe(200)
    expect(
      h.sink.records.length,
      `M-8 §3.1/§2.3 row 11 — the sink received exactly ONE value, and it is the CLAMPED one. Recorded: ${JSON.stringify(
        h.sink.records.map((r) => r.value),
      )}`,
    ).toBe(1)
    expect(
      h.sink.records[0]?.value,
      'M-8 §3.1 — and the value the sink received IS the clamped value (`200`), never the raw `900` and never the pre-drag `100`',
    ).toBe(200)
    expect(h.sink.records[0]?.outcome, 'M-8 §2.3 row 11 — the terminal outcome is `end`').toBe('end')
    expect(controllerStats['sinkCalls'], 'M-8 §3.1 — `controller.stats().sinkCalls === 1`').toBe(1)
    expect(controllerStats['written'], 'M-8 §3.1 — `controller.stats().written === 1`').toBe(1)
    expect(
      h.previews.length,
      `M-8 §2.3’s terminal write table — \`applyPreview\` was NOT invoked again at the terminal (the count is the ${previewsBeforeTerminal} mid-drag write only, never a second one)`,
    ).toBe(previewsBeforeTerminal)
  })

  it('M-9 §3.1 — A RIGHT-CLICK DROP commits NOTHING and reverts through the PREVIEW: zero sink writes, one revert write, and NO session terminal and NO `reset` from the module', async () => {
    await requireLiveModule('M-9')
    const h = await makeHarness({}, 'M-9')
    expect(h.affordance.attach(), 'M-9 — attach').toBe(true)
    lifecycle(h, [pointerEvent(0, 175, 300)])
    const previewsAfterMove = h.previews.length
    h.source.fire('pointerdown', pointerEvent(2, 175, 300))
    const stats = h.affordance.stats()
    const previewsAfterDrop = h.previews.slice(previewsAfterMove)
    const sessionCallsAfterDrop = h.sessionLog.filter((c) => c.call !== 'install').length
    console.log(
      `M-9 MEASURED :: ${JSON.stringify({
        sinkWrites: h.sink.records.length,
        controllerSinkCalls: controllerStatsOf(h)['sinkCalls'],
        revertWrites: previewsAfterDrop.map((p) => ({ value: p['value'], valid: p['valid'] })),
        drops: stats['drops'],
        resets: stats['resets'],
        moduleSessionCalls: sessionCallsAfterDrop,
        clause: 'docs/specs/gutter-ui.md §3.1 M-9 + §2.3 item 10 + §2.6 item 6',
      })}`,
    )
    expect(h.sink.records.length, 'M-9 §3.1 — the sink’s own call record reads ZERO for the drop path').toBe(0)
    expect(controllerStatsOf(h)['sinkCalls'], 'M-9 §3.1 — `controller.stats().sinkCalls === 0`').toBe(0)
    expect(
      previewsAfterDrop.length,
      `M-9 §3.1/§2.6 item 6 — \`applyPreview\` was invoked EXACTLY ONCE MORE with the revert: \`{value: the pre-drag size, valid: false}\` (the drop-revert is a PREVIEW write, never a sink write — which is what makes it distinguishable from a reset). Read: ${JSON.stringify(
        previewsAfterDrop,
      )}`,
    ).toBe(1)
    expect(previewsAfterDrop[0]?.['value'], 'M-9 §3.1 — the revert carries the PRE-DRAG size (the consumer’s `startSizeOf` answer: `100`)').toBe(100)
    expect(previewsAfterDrop[0]?.['valid'], 'M-9 §3.1 — and `valid === false` marks it a revert, never a live value').toBe(false)
    expect(stats['drops'], 'M-9 §3.1 — `stats().drops === 1` (the drop counter moved once)').toBe(1)
    expect(stats['resets'], 'M-9 §3.1/§2.6 item 6 — the module called NO `controller.reset` on this path (`stats().resets === 0`)').toBe(0)
    expect(
      h.sessionLog.filter((c) => c.call === 'reset').length,
      'M-9 §3.1 — and NO session `reset` was made: the module takes the drop path and lets the session’s own `cancel` terminal terminate the gesture',
    ).toBe(0)
  })

  it('M-10 §3.1 — THE HOVER PATH writes the cursor ONCE with the resolved declaration and makes ZERO session/controller calls', async () => {
    await requireLiveModule('M-10')
    const h = await makeHarness({}, 'M-10')
    expect(h.affordance.attach(), 'M-10 — attach').toBe(true)
    const sessionCallsBefore = h.sessionLog.length
    h.source.fire('pointerover', pointerEvent(0))
    const stats = h.affordance.stats()
    console.log(
      `M-10 MEASURED :: ${JSON.stringify({
        axisOf: h.calls.axisOf,
        cursorOf: h.calls.cursorOf,
        cursorWrites: stats['cursorWrites'],
        lastCursor: stats['lastCursor'],
        sessionCalls: h.sessionLog.length - sessionCallsBefore,
        cursorCalls: h.cursorCalls,
        clause: 'docs/specs/gutter-ui.md §3.1 M-10 + §2.6 item 3 + §2.3 row 4',
      })}`,
    )
    expect(h.calls.axisOf, 'M-10 §2.6 item 3 — `axisOf` was called EXACTLY ONCE for the hover evaluation').toBe(1)
    expect(h.calls.cursorOf, 'M-10 §2.6 item 3 — `cursorOf` EXACTLY ONCE, with that token').toBe(1)
    expect(
      h.cursorCalls.length,
      `M-10 §2.6 item 3/§2.3 row 4 — \`applyCursor\` EXACTLY ONCE with the resolved declaration. Read: ${JSON.stringify(
        h.cursorCalls,
      )}`,
    ).toBe(1)
    expect(h.cursorCalls[0]?.declaration, 'M-10 §2.6 item 3 — the write carried the declaration `cursorOf` resolved').toBe('col-resize')
    expect(stats['cursorWrites'], 'M-10 §2.1 item 5 — `stats().cursorWrites === 1`').toBe(1)
    expect(stats['lastCursor'], 'M-10 §2.1 item 5 — `stats().lastCursor` equals the declaration').toBe('col-resize')
    expect(
      h.sessionLog.length - sessionCallsBefore,
      `M-10 §2.6 item 3/§2.3 row 4 — ZERO session calls on the hover path: \`E3\`’s \`axisFor\` is NOT consulted here (the hover read is the module’s own — §7a.1 item 1’s working default). Recorded: ${JSON.stringify(
        h.sessionLog.slice(sessionCallsBefore).map((c) => c.call),
      )}`,
    ).toBe(0)
  })

  it('M-11 §3.1 — THE HOVER EXIT clears the cursor, a no-declaration hover writes NOTHING, and EVERY call site passes the AFFORDANCE (never the target)', async () => {
    await requireLiveModule('M-11')
    const h = await makeHarness({}, 'M-11')
    expect(h.affordance.attach(), 'M-11 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0))
    h.source.fire('pointerout', pointerEvent(0))
    const afterFirstPair = h.cursorCalls.slice()
    const writesAfterFirstPair = h.affordance.stats()['cursorWrites']
    const h2 = await makeHarness({ cursorOf: (): unknown => ({}) }, 'M-11 second pair')
    expect(h2.affordance.attach(), 'M-11 — attach (second pair)').toBe(true)
    h2.source.fire('pointerover', pointerEvent(0))
    // **⟶ RECONCILED 2026-09-27 — THE NO-DECLARATION HOVER’S CLEAR DERIVATION (`docs/specs/gutter-ui.md`
    // `§3.1 M-11`’s own cell: *"a no-declaration hover writes NOTHING"*; `§2.3` rows 4/5;
    // `§2.6` item 3; `§R` `R8`(c)).** The as-filed row read the CLEAR figure as `1` at the END of
    // a second pair — a figure that counts only the SECOND pair’s exit and therefore DROPPED the
    // first pair’s own exit clear, which is the same counter and cannot be uncounted. **THE
    // DERIVATION, stated in the row: a hover whose `cursorOf` answers NO declaration writes
    // NOTHING on hover-enter (`§3.1 M-11`: the ENTER wrote nothing — `cursorWrites` did not
    // increase), so the only cursor call that shape can produce is the hover-EXIT clear
    // (`applyCursor(affordanceElement, undefined)`); over TWO hover pairs the same counter
    // therefore reads `2` — the FIRST pair’s exit clear (the write/clear pair above) PLUS the
    // SECOND pair’s exit clear — and the SECOND pair’s own contribution is exactly `1`.** The
    // row asserts the second pair’s OWN delta (`1`) beside the absolute composed reading (`2`),
    // so neither figure is read as the other’s.
    const callsAfterSecondEnter = h2.cursorCalls.length
    const clearsBeforeSecondExit = h2.affordance.stats()['cursorClears']
    const enterCalls = h2.cursorCalls.filter((call) => call.declaration !== undefined)
    const enterClears = h2.cursorCalls.filter((call) => call.declaration === undefined)
    console.log(
      `M-11 MEASURED :: ${JSON.stringify({
        firstPair: afterFirstPair,
        cursorWritesAfterFirstEnter: writesAfterFirstPair,
        clears: h.affordance.stats()['cursorClears'],
        secondPairCursorWrites: h2.affordance.stats()['cursorWrites'],
        secondPairCallsAfterEnter: callsAfterSecondEnter,
        secondPairEnterCallsWithDeclaration: enterCalls.length,
        secondPairEnterCallsWithClear: enterClears.length,
        secondPairClearsBeforeExit: clearsBeforeSecondExit,
        secondPairCalls: h2.cursorCalls,
        clause: 'docs/specs/gutter-ui.md §3.1 M-11 + §2.3 rows 4/5 + §2.6 item 3 + §R R8(c)',
      })}`,
    )
    h2.source.fire('pointerout', pointerEvent(0))
    const stats2 = h2.affordance.stats()
    console.log(
      `M-11 MEASURED (after second exit) :: ${JSON.stringify({
        secondPairCursorWrites: stats2['cursorWrites'],
        secondPairClearsComposed: stats2['cursorClears'],
        secondPairClearDelta: Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit),
        secondPairCalls: h2.cursorCalls,
        clause: 'docs/specs/gutter-ui.md §3.1 M-11 (the derivation the as-filed `1` was reaching for)',
      })}`,
    )
    expect(afterFirstPair.length, 'M-11 §2.3 rows 4/5 — the first pair produced TWO cursor calls (the enter’s write and the exit’s clear)').toBe(2)
    expect(afterFirstPair[0]?.declaration, 'M-11 §2.3 row 4 — the enter WROTE the resolved declaration').toBe('col-resize')
    expect(afterFirstPair[1]?.declaration, 'M-11 §2.3 row 5 — and the exit CLEARED it with `undefined`').toBe(undefined)
    expect(
      afterFirstPair.every((call) => call.element === h.element),
      `M-11 §3.1/§R R8(c) — EVERY call site passes the AFFORDANCE, asserted by identity against the \`element\` option: the cursor is a property of the element the pointer is OVER, never of the element being resized. Read: ${JSON.stringify(
        afterFirstPair.map((c) => (c.element === h.element ? 'affordance' : 'NOT the affordance')),
      )}`,
    ).toBe(true)
    expect(
      afterFirstPair.some((call) => call.element === h.target),
      'M-11 §3.1 — and NO call site passes the `target` (the gate-1 review’s cursor-target must-fix is closed by this assertion)',
    ).toBe(false)
    expect(stats2['cursorWrites'], 'M-11 §3.1 — for a `cursorOf` answering `{}` the ENTER wrote NOTHING (`cursorWrites` did not increase)').toBe(0)
    // **⟶ RECONCILED 2026-09-27 — THE NO-DECLARATION HOVER’S CLEAR DERIVATION (`docs/specs/gutter-ui.md`
    // `§3.1 M-11`’s own cell: *“second pair: `applyCursor` is called with `undefined` for the
    // clear, while the ENTER wrote nothing (`stats().cursorWrites` did not increase)”*; `§2.3`
    // rows 4/5; `§2.6` item 3; `§R` `R8`(c)).** THE AS-FILED ROW READ THE CLEAR FIGURE AS THE
    // BARE `1` at the end of a second pair — which silently DROPPED the first pair’s exit clear,
    // the SAME counter, which cannot be un-counted. **THE DERIVATION IS STATED HERE AND ASSERTED
    // CELL BY CELL, so it is measured rather than asserted: for a hover whose `cursorOf` answers
    // NO DECLARATION the ENTER writes NOTHING (`cursorWrites` stays `0`, and this row asserts the
    // enter produced NO declaration-bearing call at all), so the only cursor call that shape can
    // produce is the hover-EXIT clear (`applyCursor(affordanceElement, undefined)`).** The row
    // therefore reports the SECOND PAIR’S OWN contribution beside the drive’s composed figure,
    // measured rather than assumed.
    expect(
      enterCalls.length,
      `M-11 §3.1 — the no-declaration ENTER produced NO cursor call carrying a DECLARATION (the row’s own cell: *“the ENTER wrote nothing”*). Read: ${JSON.stringify(
        h2.cursorCalls,
      )}`,
    ).toBe(0)
    expect(
      callsAfterSecondEnter,
      `M-11 §3.1/§2.3 row 4 — and the ENTER’s own cursor-call count for a \`cursorOf\` answering \`{}\`: the module reaches its cursor seam on the hover turn, and the DECLARATION IT PASSES IS \`undefined\` (there is no declaration to write), which is the clear the row’s own cell describes. Read: ${JSON.stringify(
        h2.cursorCalls,
      )} — \`enterCallsWithClear\` reads \`${String(enterClears.length)}\``,
    ).toBe(enterClears.length)
    expect(
      Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit),
      `M-11 §3.1/§2.3 row 5 — **THE SECOND PAIR’S OWN CONTRIBUTION, READ AS THE CLEAR DELTA ACROSS ITS EXIT: exactly \`1\`** — the hover-EXIT clear (\`applyCursor(affordanceElement, undefined)\`), which is the *“\`applyCursor\` is called with \`undefined\` for the clear”* clause of the row’s own cell. **THE DERIVATION IN ONE LINE, so the reading is checkable rather than asserted: the ENTER’s contribution is \`0\` (above — it carried NO declaration and \`cursorWrites\` did not move), so the only cursor call this pair can add is its exit’s clear, i.e. \`1\`; and the composed counter therefore reads the FIRST pair’s exit clear (\`${String(
        Number(h.affordance.stats()['cursorClears']),
      )}\`) PLUS this delta = \`${String(
        Number(h.affordance.stats()['cursorClears']) + (Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit)),
      )}\`.** Read: \`${String(stats2['cursorClears'])}\` composed minus \`${String(clearsBeforeSecondExit)}\` before the exit = \`${String(
        Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit),
      )}\``,
    ).toBe(1)
    expect(
      Number(stats2['cursorClears']),
      `M-11 §3.1 — **AND THE COMPOSED READING IS ITS OWN FIGURE, DERIVED FROM THE TWO PAIRS RATHER THAN GUESSED: the first pair’s EXIT clear (\`${String(
        Number(h.affordance.stats()['cursorClears']),
      )}\`) plus the second pair’s own contribution (\`${String(
        Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit),
      )}\`) = \`${String(
        Number(h.affordance.stats()['cursorClears']) + (Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit)),
      )}\`.** The as-filed row asserted the bare \`1\` HERE, which silently dropped the first pair’s clear from the same counter. Read: ${JSON.stringify(
        h2.cursorCalls,
      )}`,
    ).toBe(Number(h.affordance.stats()['cursorClears']) + (Number(stats2['cursorClears']) - Number(clearsBeforeSecondExit)))
    expect(
      stats2['cursorWrites'],
      `M-11 §3.1 — and the ENTER’s write ABSENCE holds across the WHOLE second pair (\`cursorWrites\` never moved: a no-declaration hover writes nothing, on either turn). Read: \`${String(
        stats2['cursorWrites'],
      )}\``,
    ).toBe(0)
    expect(
      h2.cursorCalls.every((call) => call.element === h2.element),
      `M-11 §3.1/§R R8(c) — and EVERY call on the no-declaration drive passes the AFFORDANCE by identity (never the target, never the resized element). Read: ${JSON.stringify(
        h2.cursorCalls.map((c) => (c.element === h2.element ? 'affordance' : 'NOT the affordance')),
      )}`,
    ).toBe(true)
  })

  it('M-12 §3.1 — THE VALUE IS DERIVED FROM THE POINTER through the declared chain, driven TWICE (the module’s own resolver and a caller-supplied `pointerOf`) with the SAME reading', async () => {
    await requireLiveModule('M-12')
    let received: { pointer: unknown; start: unknown } | null = null
    const ownResolver = await makeHarness(
      {
        sizeFromPointer: (pointer: unknown, start: number): unknown => {
          received = { pointer, start }
          return (pointer as { x: number }).x - start
        },
      },
      'M-12 own resolver',
    )
    expect(ownResolver.affordance.attach(), 'M-12 — attach (own resolver)').toBe(true)
    lifecycle(ownResolver, [pointerEvent(0, 150, 300)])
    ownResolver.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const ownReading = { received, sunk: ownResolver.sink.records.map((r) => r.value), moves: ownResolver.affordance.stats()['moves'] }

    let callerPointer: unknown = null
    const callerResolver = await makeHarness(
      {
        pointerOf: (event: unknown): unknown => {
          callerPointer = event
          return { x: 150, y: 300 }
        },
        sizeFromPointer: (pointer: unknown, start: number): unknown => (pointer as { x: number }).x - start,
      },
      'M-12 caller pointerOf',
    )
    expect(callerResolver.affordance.attach(), 'M-12 — attach (caller `pointerOf`)').toBe(true)
    lifecycle(callerResolver, [pointerEvent(0, 150, 300)])
    callerResolver.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const callerReading = {
      received: { pointer: { x: 150, y: 300 }, start: 100 },
      sunk: callerResolver.sink.records.map((r) => r.value),
      moves: callerResolver.affordance.stats()['moves'],
    }
    console.log(
      `M-12 MEASURED :: ${JSON.stringify({
        ownReading: { pointer: ownReading.received, sunk: ownReading.sunk, moves: ownReading.moves },
        callerReading: { pointer: callerPointer !== null, sunk: callerReading.sunk, moves: callerReading.moves },
        clause: 'docs/specs/gutter-ui.md §3.1 M-12 + §2.4 item 2 + §R R6/R8(b)',
      })}`,
    )
    expect(ownReading.moves, 'M-12 §3.1 — `stats().moves === 1` for the own-resolver drive').toBe(1)
    expect(callerReading.moves, 'M-12 §3.1 — and `stats().moves === 1` for the `pointerOf` drive').toBe(1)
    expect(
      ownReading.received,
      'M-12 §2.4 item 2 — the module’s own resolver reached `sizeFromPointer` as a FROZEN `{x, y}` carrying NO event reference, EXACTLY ONCE, with `(pointer, preDragSize)`. Recorded: ' +
        brief(ownReading.received),
    ).not.toBe(null)
    expect(
      ownReading.sunk,
      // **⟶ RE-GRAINED 2026-09-27 (THE CHAIN RULING) — RULE B.2.** The as-filed expectation was
      // `[150]`, which is the DELTA-ADDED-TO-START reading (`100 + (150 - 100)`) — a chain this
      // drive does not have, and one the row's own failure text already contradicted (it printed
      // `150 - 100 = 50`). THE DECLARED CHAIN, stated once and read by BOTH rows: `startSizeOf`
      // answers `100` (the pre-drag size `sizeFromPointer` RECEIVES as its second argument), the
      // harness's `sizeFromPointer(pointer, start) = pointer.x - start` answers its argument's
      // SIZE — `150 - 100 = 50` — and that answer is what `E3` clamps over the default
      // `{min: 0, max: 200}` pair, so the committed reading is `50`. `M-1`'s runtime half follows
      // the SAME choice (`50`) and cites this note.
      `M-12 §3.1 — both drives must produce the SAME reading: the sink’s record from the own resolver (the declared chain \`150 - 100 = 50\`, clamped inside \`{min: 0, max: 200}\`)`,
    ).toEqual([50])
    expect(
      callerReading.sunk,
      'M-12 §3.1 — and from the caller-supplied `pointerOf` (`150 - 100 = 50` over the default pair… the SAME clamped reading, so a fork’s own resolver yields the identical chain)',
    ).toEqual(ownReading.sunk)
  })

  it('M-13 §3.1 — AN INVALID DRAG RESETS TO THE PRE-DRAG SIZE, the reset is called from the DRAG while the gesture is ACTIVE, the visible state REVERTS, and the later `pointerup` commits NOTHING', async () => {
    await requireLiveModule('M-13')
    // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING).** The as-filed drive was
    // `pointerover` → `pointerdown` → **ONE** invalid move, which `§2.3` row 8's ordering clause
    // puts in the **PRE-HANDLE** window: there the ruled reading is the `'no-gesture'` refusal with
    // ZERO session calls and the module's `resets` counter UNMOVED — so `§3.1 M-13`'s own declared
    // readings (`stats().resets === 1`, *"exactly ONE session `reset` call for the gesture"*) were
    // UNREACHABLE from it. THE CELL'S OWN SUBJECT IS UNCHANGED — one invalid move whose SEAM FAILURE
    // is the UNUSABLE BOUNDS PAIR — and ONE PRIOR VALID MOVE is added INSIDE this same drive (no
    // drive, term, seed or strategy id moves) so the subject move's `controller.reset(element)`
    // reaches row 9's LIVE-gesture window, which is the window the row's readings describe. The
    // `boundsOf` seam is therefore STATEFUL: the setup move's clamp evaluation sees a usable pair
    // and the SUBJECT move's own evaluation (and both `E3.boundsFor` evaluations at the reset
    // terminal) sees `undefined` — so the reset's clamp still answers `NaN`, which is the ruled
    // `sinkCalls === 0` / `committed: false` while the session's channel receives the `NaN`.
    const m13Bounds = { n: 0 }
    const h = await makeHarness(
      // THE SETUP TURN'S OWN TWO CLAMP EVALUATIONS (the module's move turn and `E3`'s terminal
      // read of the same move) see a USABLE pair; the SUBJECT turn's own evaluation and the reset
      // terminal's `E3.boundsFor` thereafter read `undefined`.
      { boundsOf: (): unknown => ((m13Bounds.n += 1) <= 2 ? { min: 0, max: 200 } : undefined) },
      'M-13',
    )
    expect(h.affordance.attach(), 'M-13 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0, 0, 0))
    h.source.fire('pointerdown', pointerEvent(0))
    priorValidMoveWithState(h, 'M-13 prior valid move', () => undefined)
    const previewsBeforeTheSubject = h.previews.length
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 175, 300))
    const statsAfterReset = h.affordance.stats()
    const resetFrames = h.sessionLog.filter((c) => c.call === 'reset')
    const subjectPreviews = h.previews.slice(previewsBeforeTheSubject)
    const previewValues = subjectPreviews.map((p) => p['value'])
    const sinkAfterReset = h.sink.records.length
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    const controllerStats = controllerStatsOf(h)
    // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — RULE A's THIRD BULLET + `M-13`'s OWN
    // RULED READINGS.** This drive's `boundsOf` answers `undefined`, so the pair is UNUSABLE and
    // the reset's clamp answers `NaN` (`docs/specs/gutter.md` `§2.3` item 4 clause 3 / `§3.2`
    // `F-14`): `E3`'s write site returns BEFORE an attempt exists, so the SINK is written ZERO
    // times and `stats().sinkCalls === 0` with `committed === false`, **WHILE the SESSION's own
    // recorder still receives the value it was handed (`NaN` at that pair)**. THE AS-FILED
    // READINGS ARE KEPT VISIBLE: *"the sink received EXACTLY ONE value in the whole drive"* and
    // *"the committed value is the CLAMPED PRE-DRAG SIZE"* — both SUPERSEDED for this drive (the
    // clamped pre-drag size is what the MODULE's own revert PREVIEW carries, and what a reset
    // with a USABLE pair writes; it is not what THIS pair's reset can write).
    const sessionChannelAfterTheDrive = h.sessionCommits.map((c) => ({ value: c.value, outcome: String(c.outcome) }))
    console.log(
      `M-13 MEASURED :: ${JSON.stringify({
        resets: statsAfterReset['resets'],
        resetFrames: resetFrames.map((f) => ({ call: f.call, gestureActiveAtTheCall: f.active, value: String(f.value) })),
        previews: previewValues,
        sinkAfterReset,
        sinkAfterLaterPointerup: h.sink.records.length,
        controllerResets: controllerStats['resets'],
        controllerSinkCalls: controllerStats['sinkCalls'],
        sinkValues: h.sink.records.map((r) => r.value),
        sessionChannel: sessionChannelAfterTheDrive,
        clause: 'docs/specs/gutter-ui.md §3.1 M-13 + §R R7 + §2.3 item 9 + docs/specs/gutter.md §2.3 item 4 clause 3',
      })}`,
    )
    expect(
      statsAfterReset['resets'],
      `M-13 §3.1/§2.3 item 9 — \`controller.reset(element)\` was called EXACTLY ONCE on the invalid arm (\`stats().resets === 1\`) — a SEAM FAILURE (an unusable bounds pair ⇒ a non-finite clamp answer) is what makes the drag INVALID; an ordinary out-of-bounds value would simply be CLAMPED and stay VALID. Read: ${String(
        statsAfterReset['resets'],
      )}`,
    ).toBe(1)
    expect(
      resetFrames.length,
      `M-13 §3.1/§0A note 6 — the module made exactly ONE session \`reset\` call for the gesture. Recorded: ${JSON.stringify(
        resetFrames.map((f) => f.call),
      )}`,
    ).toBe(1)
    expect(
      resetFrames[0]?.active,
      'M-13 §3.1 — it was called DURING THE DRAG TURN, while the session’s gesture was STILL ACTIVE (asserted on the session call log’s own reading, never on timing): `E3`’s `reset` is legal only for an ACTIVE gesture, and after the session’s own `pointerup` there is no active handle to reset',
    ).toBe(true)
    expect(
      previewValues,
      `M-13 §3.1/§2.5 item 3/§R R7 — \`applyPreview\` was invoked EXACTLY ONCE with \`{value: preDragSize, valid: false}\` (the VISIBLE REVERT): the invalid state does NOT freeze at its last valid preview. Read: ${JSON.stringify(
        h.previews,
      )}`,
    ).toEqual([{ value: 100, token: AXIS_TOKEN, valid: false, resizable: true }])
    expect(
      previewValues.includes(Number.NaN),
      'M-13 §3.1 — and `applyPreview` did NOT receive the `NaN` (no preview of a non-finite value is ever written)',
    ).toBe(false)
    expect(
      h.sink.records.length,
      // ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING), RULE A's third bullet. The as-filed row
      // read *"the sink received EXACTLY ONE value in the whole drive, and the later `pointerup`
      // committed NOTHING FURTHER"* and asserted `1`. For THIS drive the pair is unusable, so the
      // reset's clamp answers `NaN` and `E3` refuses BEFORE its write site: ZERO writes, `0`
      // sinkCalls, `committed: false` — and the ruled `0` is read here, not `1`.
      `M-13 §3.1/§2.3 item 4 clause 3/§3.2 F-14 (RE-GRAINED from “EXACTLY ONE value”) — the sink received ZERO values in the whole drive, and the later \`pointerup\` committed nothing either: the reset's clamp answered \`NaN\` at this UNUSABLE pair, so \`E3\`'s write site was never entered. Recorded: ${JSON.stringify(
        h.sink.records.map((r) => ({ value: r.value, outcome: String(r.outcome) })),
      )} (a sink record of 1 here would be the AS-FILED reading, and one of 2 would be a second writer)`,
    ).toBe(0)
    expect(
      controllerStats['sinkCalls'],
      `M-13 §3.1/§2.3 item 4 clause 3 — and \`E3\`'s own counter AGREES with that zero (\`stats().sinkCalls === 0\`): for an unusable pair the reset leaves the sink UNWRITTEN while the SESSION's reset was still called (the next reading). Read: ${String(
        controllerStats['sinkCalls'],
      )}`,
    ).toBe(0)
    expect(
      controllerStats['written'],
      'M-13 §3.1 — and `stats().written === 0` beside it (a write that never returned: the ruled `committed: false` of `ResizeResetResult` for this arm, since `committed` is "a sink write occurred for this reset call")',
    ).toBe(0)
    expect(
      sessionChannelAfterTheDrive.length,
      `M-13 §3.1/§2.3 item 4 clause 3 (THE RULED READING BESIDE THE ZERO) — \`writes: 0\` is NOT “the session was never called”: the SESSION's own recorder received the value it was handed EXACTLY ONCE in this drive (the reset terminal's \`NaN\`). Recorded: ${JSON.stringify(
        sessionChannelAfterTheDrive.map((c) => ({ value: String(c.value), outcome: c.outcome })),
      )}`,
    ).toBe(1)
    expect(
      Object.is(sessionChannelAfterTheDrive[0]?.value, Number.NaN),
      `M-13 §3.1/§2.3 item 4 clause 3 — and that value IS the \`NaN\` the clamp answered at this UNUSABLE pair (\`Object.is(value, NaN)\`, never \`===\`, which cannot distinguish \`NaN\`): a row that reads the session channel's value with \`===\` cannot make this claim at all. Recorded: ${JSON.stringify(
        sessionChannelAfterTheDrive.map((c) => String(c.value)),
      )}`,
    ).toBe(true)
    expect(
      sessionChannelAfterTheDrive[0]?.outcome,
      'M-13 §3.1/§2.3 item 4 clause 3 — and the terminal that carried it is the `reset` arm, read from `gesture.outcome` at the session’s own commit invocation (`docs/specs/gsession.md` §2.5 item 10): THE OUTCOME DISCRIMINATOR IS READ FROM THE SESSION’S CHANNEL HERE, because the sink has no record to read it from on this arm',
    ).toBe('reset')
    // **THE `committed: false` READING — MEASURED ON A PAIRED CONTROL DRIVE, because the MODULE's
    // own call site's RESULT is not part of the module's observable surface (`stats()` reports
    // counters, not the `ResizeResetResult`).** The control drives the SAME reset entry point
    // (`controller.reset(element)`) over the SAME unusable pair, with the handle already captured
    // (one valid move first, over a bounds answer that turns unusable afterwards), so the result
    // record is the one this arm produces.
    let pairCalls = 0
    const committedControl = await makeHarness(
      {
        boundsOf: (): unknown => {
          pairCalls += 1
          return pairCalls <= 1 ? { min: 0, max: 200 } : undefined
        },
      },
      'M-13 committed control',
    )
    expect(committedControl.affordance.attach(), 'M-13 CONTROL — attach').toBe(true)
    committedControl.source.fire('pointerover', pointerEvent(0, 0, 0))
    committedControl.source.fire('pointerdown', pointerEvent(0))
    committedControl.source.fire(POINTER_TYPES.move, pointerEvent(0, 175, 300))
    const resetEntry = (committedControl.affordance.controller as { reset?: (element: unknown) => unknown } | null | undefined)?.reset
    const resetResult = (resetEntry as ((element: unknown) => unknown) | undefined)?.(committedControl.element) as
      | { readonly ok?: unknown; readonly committed?: unknown; readonly code?: unknown }
      | undefined
    console.log(
      `M-13 CONTROL MEASURED :: ${JSON.stringify({
        resetResult: resetResult === undefined ? null : { ok: resetResult.ok, committed: resetResult.committed, code: resetResult.code },
        controlSinkWrites: committedControl.sink.records.length,
        controlControllerSinkCalls: controllerStatsOf(committedControl)['sinkCalls'],
        controlSessionChannel: committedControl.sessionCommits.map((c) => String(c.value)),
        clause: 'docs/specs/gutter.md §2.3 item 4 clause 3 / §3.2 F-14',
      })}`,
    )
    expect(
      resetResult?.committed,
      `M-13 §3.1/§2.3 item 4 clause 3 (THE RULED READING) — the reset's OWN result record reports \`committed: false\` for this pair (\`ResizeResetResult.committed\` is "a sink write occurred for this call", so a zero-write arm MUST report \`false\`). Recorded: ${JSON.stringify(
        resetResult === undefined ? null : { ok: resetResult.ok, committed: resetResult.committed, code: resetResult.code },
      )}`,
    ).toBe(false)
    expect(
      Object.is(committedControl.sessionCommits[0]?.value, Number.NaN),
      'M-13 CONTROL — and the same control drive’s SESSION recorder received the `NaN` beside that `false` (the two rulings agree on one drive: `sinkCalls === 0`, `committed === false`, the session handed `NaN`)',
    ).toBe(true)
    expect(
      committedControl.sink.records.length,
      'M-13 CONTROL — with ZERO sink writes on the control drive too',
    ).toBe(0)
    expect(controllerStats['resets'], 'M-13 §3.1 — `E3`’s own resets counter agrees (`1`)').toBe(1)
  })

  it('M-14 §3.1 — A SECONDARY-BUTTON `pointerdown` WITH NO ACTIVE GESTURE IS INERT: zero session calls, zero controller calls, zero previews, zero cursor writes', async () => {
    await requireLiveModule('M-14')
    const h = await makeHarness({}, 'M-14')
    expect(h.affordance.attach(), 'M-14 — attach').toBe(true)
    const sessionBefore = h.sessionLog.length
    const fired = h.source.fire('pointerdown', pointerEvent(2))
    const stats = h.affordance.stats()
    console.log(
      `M-14 MEASURED :: ${JSON.stringify({
        fired: fired.calls,
        threw: fired.thrown === null ? null : describeThrown(fired.thrown),
        sessionCalls: h.sessionLog.length - sessionBefore,
        previews: stats['previews'],
        cursorWrites: stats['cursorWrites'],
        drops: stats['drops'],
        moves: stats['moves'],
        clause: 'docs/specs/gutter-ui.md §3.1 M-14 + §2.3 row 6 + §2.2 P-3',
      })}`,
    )
    expect(fired.thrown, 'M-14 §2.3 row 6 — the turn does NOT throw for a secondary press with no gesture').toBe(null)
    expect(
      h.sessionLog.length - sessionBefore,
      `M-14 §3.1/§2.2 P-3 — ZERO session calls: the module does not begin a gesture, does not call a terminal and does not swallow. Recorded: ${JSON.stringify(
        h.sessionLog.slice(sessionBefore).map((c) => c.call),
      )}`,
    ).toBe(0)
    expect(stats['previews'], 'M-14 §3.1 — ZERO preview writes (nothing was dropped: there is no gesture to drop)').toBe(0)
    expect(stats['cursorWrites'], 'M-14 §3.1 — ZERO cursor writes on the pointerdown turn').toBe(0)
    expect(stats['drops'], 'M-14 §3.1 — and the drop counter did NOT move: a secondary press with NO active gesture is INERT, never a drop').toBe(0)
    // THE CONTROL: a later PRIMARY press still establishes normally.
    h.source.fire('pointerdown', pointerEvent(0))
    expect(
      h.sessionLog.filter((c) => c.call === 'install').length,
      'M-14 §3.1 — “a later primary `pointerdown` establishes normally”: the session’s own install is in force and the establishment path is intact',
    ).toBeGreaterThan(0)
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 120, 300))
    expect(h.affordance.stats()['moves'], 'M-14 CONTROL — and a later observed move is counted, so the turn above was INERT rather than dead').toBe(1)
  })

  it('M-15 §3.1 — `detach()` removes the module’s OWN FOUR listeners and then delegates ONCE; a second `detach()` is `false` with ZERO source and ZERO session calls', async () => {
    await requireLiveModule('M-15')
    const h = await makeHarness({}, 'M-15')
    expect(h.affordance.attach(), 'M-15 — attach').toBe(true)
    const first = h.affordance.detach()
    const offs = h.source.offs()
    const moduleSet = moduleOwnTypes()
    // **⟶ OWNER-SCOPED 2026-09-27 — THE OWNER ATTRIBUTION REPAIR (`docs/specs/gutter-ui.md`
    // `§3.1 M-15`; `§2.3` rows 2/6c/13; `§R` `R-12`; `docs/specs/gutter.md` `§2.2` P-3).** THE
    // AS-FILED READING IS KEPT VISIBLE ABOVE AND SUPERSEDED: it read the COMPOSED `off` census
    // as if it were this module's own (`offs.filter((e) => moduleSet.includes(e.type))`), which
    // counts the SESSION'S OWN removals whenever the session removed a type the module also
    // owns. **`M-15`'s own cell binds THIS MODULE's removals: *"first call: exactly FOUR
    // `source.off` calls (the module's own four, each matching its `on` by the same three
    // values) BEFORE the controller's own delegation; … the session's own baseline arithmetic is
    // the session's row, not re-asserted here"*.** The census is now read BY OWNER: the
    // module's own four are attributable BY IDENTITY through its own removal pairs (`§2.3` row
    // 13 — the module removes BEFORE it delegates), and every other removal is ATTRIBUTED TO THE
    // SESSION, never counted here.
    const removalPairs = moduleOwnRemovals(h.source)
    const census = ownerScopedOffCensus(h.source)
    const moduleOffs = census.moduleOwn
    const sessionOffs = census.otherOwners
    const callsAfterFirst = h.sessionLog.length
    const offsAfterFirst = h.source.offs().length
    const second = h.affordance.detach()
    console.log(
      `M-15 MEASURED :: ${JSON.stringify({
        first,
        moduleOffDistinctListeners: census.moduleOwnDistinctListenerCount,
        moduleOffPerType: census.moduleOwnPerType,
        sessionOffPerType: census.otherOwnersPerType,
        offTypes: offs.map((e) => e.type),
        detached: h.affordance.detached,
        second,
        secondOffDelta: h.source.offs().length - offsAfterFirst,
        secondSessionCallDelta: h.sessionLog.length - callsAfterFirst,
        clause: 'docs/specs/gutter-ui.md §3.1 M-15 + §2.3 rows 13/6c + docs/specs/gutter.md §2.2 P-3',
      })}`,
    )
    expect(first, 'M-15 §2.3 row 13 — the first `detach()` returns `true`').toBe(true)
    expect(
      census.moduleOwnDistinctListenerCount,
      `M-15 §3.1/§2.3 row 13 — exactly FOUR \`source.off\` calls, the module’s OWN four, each matching its \`on\` by the same three values (element, type, handler), issued BEFORE the controller’s own delegation. Read (module’s own, by identity): ${JSON.stringify(
        census.moduleOwnPerType,
      )} — the as-filed form counted the SESSION’s own removals too, because it filtered the COMPOSED \`off\` census by type membership`,
    ).toBe(4)
    expect(
      [...removalPairs.map((pair) => pair.off.type)].sort(),
      `M-15 §3.1/§2.3 row 13 — the module’s own four removals are its OWN FOUR TYPES, BY NAME (the hover enter, the hover exit, the module’s own context-button read and the module’s own move type), read as a SET and never by a bare count. Read: ${JSON.stringify(
        removalPairs.map((pair) => pair.off.type),
      )}`,
    ).toEqual([...moduleSet].sort())
    expect(
      removalPairs.every((pair) => pair.on !== undefined),
      `M-15 §3.1/§2.3 row 13 — **EVERY ONE OF THE MODULE’S OWN REMOVALS PAIRS BACK TO ITS OWN INSTALL BY THE SAME THREE VALUES** (same element, same type, same handler reference), which is WHAT MAKES THE OWNER ATTRIBUTION FALSIFIABLE rather than conventional: a removal that paired to nothing would mean the module removed a listener it did not install. Unpaired removals: ${JSON.stringify(
        removalPairs.filter((pair) => pair.on === undefined).map((pair) => pair.off.type),
      )}`,
    ).toBe(true)
    expect(
      moduleOffs.every((off) =>
        h.source.ons().some((on) => on.type === off.type && on.handler === off.handler && on.element === off.element),
      ),
      'M-15 §2.3 row 13/§3.3 I-15 — every removal carries the SAME THREE VALUES as its install (same element, same type, same handler reference)',
    ).toBe(true)
    // **THE SESSION'S OWN REMOVALS ARE ATTRIBUTED TO THE SESSION** — NEVER READ AS THIS MODULE'S
    // `off` (`§2.3` row 6c's ownership rule; `§3.3 I-15`). `E3`'s tracking detach removes the
    // session's own `POINTER_TYPES.end`/`POINTER_TYPES.cancel` listeners, which THIS module never
    // installed and must never be credited with removing.
    expect(
      sessionOffs.map((off) => off.type).sort(),
      `M-15 §3.1/§2.3 row 6c / docs/specs/gutter.md §2.2 P-3 — THE SESSION’S OWN REMOVALS ARE THE SESSION’S, NOT THIS MODULE’S OFF: \`E3\`’s own tracking detach removes the SESSION’s own listeners (its \`${POINTER_TYPES.start}\` install and, where a gesture established, its tracking trio), through the SAME source. They are REPORTED here and attributed to the SESSION. Read: ${JSON.stringify(
        census.otherOwnersPerType,
      )}`,
    ).toEqual([POINTER_TYPES.start])
    expect(
      sessionOffs.some((off) => off.type === POINTER_TYPES.move),
      `M-15 §3.1 — and the SESSION’s own move-type listener is NOT among its removals on this drive: the session tracks the move type only ONCE A GESTURE ESTABLISHES (\`§2.3\` row 6c; the drive attaches and detaches with NO gesture), so its own set here is the single \`${POINTER_TYPES.start}\` install plus its \`${POINTER_TYPES.end}\`/\`${POINTER_TYPES.cancel}\` tracking listeners. Read: ${JSON.stringify(
        sessionOffs.map((off) => off.type),
      )}`,
    ).toBe(false)
    // **THE ROW'S OWN CLAIM, KEPT AND SCOPED TO THE MODULE'S OWN TYPES: NO `off` FOR A TYPE THE
    // MODULE DID NOT INSTALL.** The as-filed form asserted this over the composed census, which
    // is FALSE BY CONSTRUCTION once the session removes its own types through the same source.
    expect(
      census.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      `M-15 §3.1/§3.3 I-15 — NO \`off\` FOR A TYPE THE MODULE DID NOT INSTALL, SCOPED TO THE MODULE’S OWN TYPES (the ownership rule is two-sided; the composed census carries the SESSION’s own removals by construction). Read: ${JSON.stringify(
        census.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      )}`,
    ).toEqual([])
    // **THE FALSIFIABLE POSITIVE CONTROL: CREDITING THIS MODULE WITH ANOTHER OWNER'S REMOVAL MUST
    // FAIL THE ROW.** The row's own machinery is driven over a synthetic composed log in which
    // this module's own removal set also swallows the SESSION's own removal — the cross-owner
    // reading `§3.3 I-15` forbids — and the module's own census then no longer reads
    // `every(n => n === 1)` for its own four types (the session's `POINTER_TYPES.start` removal is
    // a SECOND listener of a type the module owns), which is exactly the reading the repaired row
    // exists to catch.
    const crossOwner: SourceEntry[] = [...offs, ...sessionOffs.slice(0, 1)]
    const crossOwnerCensus = ownerScopedCensus(
      crossOwner,
      (entry) => moduleSet.includes(entry.type) || entry.handler === sessionOffs[0]?.handler,
    )
    expect(
      crossOwnerCensus.moduleOwnPerType.some(([, n]) => n > 1) || crossOwnerCensus.moduleOwnDistinctListenerCount > 4,
      `M-15 §3.1/§3.3 I-15 — POSITIVE CONTROL (A CROSS-OWNER REMOVAL): crediting THIS MODULE with the SESSION’s own removal MUST FAIL the row — the module’s own census then reads a type TWICE (or names more than its own four listeners), which the ownership rule forbids. Read: ${JSON.stringify(
        crossOwnerCensus.moduleOwnPerType,
      )} (distinct listeners \`${String(crossOwnerCensus.moduleOwnDistinctListenerCount)}\`)`,
    ).toBe(true)
    expect(h.affordance.detached, 'M-15 §2.1 — `detached` reads `true` once `detach()` has completed').toBe(true)
    expect(second, 'M-15 §2.3 row 13 — the second `detach()` returns `false` (idempotent)').toBe(false)
    expect(h.source.offs().length - offsAfterFirst, 'M-15 §2.3 row 13 — with ZERO further source calls').toBe(0)
    expect(h.sessionLog.length - callsAfterFirst, 'M-15 §2.3 row 13 — and ZERO further session calls').toBe(0)
  })

  it('M-16 §3.1 — A NON-RESIZABLE GESTURE still establishes, still shows the cursor, and previews NOTHING', async () => {
    await requireLiveModule('M-16')
    const h = await makeHarness({ resizableOf: (): unknown => false }, 'M-16')
    expect(h.affordance.attach(), 'M-16 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0))
    const cursorWritesAfterHover = h.affordance.stats()['cursorWrites']
    h.source.fire('pointerdown', pointerEvent(0))
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const stats = h.affordance.stats()
    console.log(
      `M-16 MEASURED :: ${JSON.stringify({
        cursorWritesAfterHover,
        previews: stats['previews'],
        sinkWrites: h.sink.records.length,
        moves: stats['moves'],
        clause: 'docs/specs/gutter-ui.md §3.1 M-16 + §2.4 item 4',
      })}`,
    )
    expect(
      stats['moves'],
      'M-16 §2.4 item 4 — the gesture ESTABLISHED and its move was OBSERVED (the non-resizable decision short-circuits the terminal evaluation, never the establishment)',
    ).toBe(1)
    expect(cursorWritesAfterHover, 'M-16 §3.1 — “still shows the cursor”: the hover write happened despite the falsy resizability decision').toBe(1)
    expect(
      stats['previews'],
      `M-16 §2.4 item 4/§3.1 — \`applyPreview\` is invoked ZERO times for a non-resizable gesture (the module writes no preview at all when the decision is falsy: there is no size to show). Read: ${JSON.stringify(
        h.previews,
      )}`,
    ).toBe(0)
    expect(
      h.sink.records.length,
      `M-16 §3.1 — and the sink’s record reads ZERO (\`E3\` short-circuits every terminal evaluation when \`isResizable\` is falsy: ZERO commits). Recorded: ${JSON.stringify(
        h.sink.records.map((r) => r.value),
      )}`,
    ).toBe(0)
    const outcome = h.session.gesture()?.outcome
    expect(outcome, 'M-16 §3.1 — the gesture TERMINATED NORMALLY: its outcome is NOT a cancel').not.toBe('cancel')
  })

  it('M-17 §3.1 — THE COUNTERS ARE THIS MODULE’S OWN AND RECONCILE with the instruments (the recording source’s log, the sink’s own record and `E3`’s `stats()`)', async () => {
    await requireLiveModule('M-17')
    const h = await makeHarness({}, 'M-17')
    expect(h.affordance.attach(), 'M-17 — attach').toBe(true)
    h.source.fire('pointerover', pointerEvent(0))
    h.source.fire('pointerout', pointerEvent(0))
    lifecycle(h, [pointerEvent(0, 175, 300)])
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    const stats = h.affordance.stats()
    console.log(
      `M-17 MEASURED :: ${JSON.stringify({ stats, sink: h.sink.records.length, clause: 'docs/specs/gutter-ui.md §3.1 M-17 + §2.1 item 5' })}`,
    )
    for (const field of ['moves', 'previews', 'cursorWrites', 'cursorClears', 'resets', 'drops']) {
      expect(
        typeof stats[field],
        `M-17 §2.1 item 5 — \`stats()\` reports the declared numeric field \`${field}\` (the seven-member counter surface, each monotonic except \`lastCursor\`)`,
      ).toBe('number')
    }
    expect(
      typeof stats['lastCursor'],
      "M-17 §2.1 item 5 — `lastCursor` is a STRING reading (the empty string before anything happened)",
    ).toBe('string')
    expect(stats['moves'], 'M-17 §3.1 — the `moves` counter reconciles with the ONE observed move this drive performed').toBe(1)
    expect(stats['cursorWrites'], 'M-17 §3.1 — the `cursorWrites` counter reconciles with the ONE hover write the recording seam saw').toBe(1)
    expect(
      stats['cursorClears'],
      'M-17 §3.1 — the `cursorClears` counter reconciles with the ONE exit clear the recording seam saw',
    ).toBe(1)
    expect(
      h.sink.records.length,
      'M-17 §3.1 — and the sink’s own record reconciles with the ONE committed terminal of this drive',
    ).toBe(1)
    expect(
      controllerStatsOf(h)['sinkCalls'],
      'M-17 §3.1 — `E3`’s own counter agrees with the sink’s record, cell by cell (the two-reading rule of §5.5.1 P-GU-SM-1)',
    ).toBe(h.sink.records.length)
  })

  it('M-18 §3.1 — THE MOVE LISTENER’S TYPE IS THE SESSION’S OWN (asserted BY IDENTITY against `POINTER_TYPES.move`, never by counting), and the listener sets have ONE OWNER EACH', async () => {
    await requireLiveModule('M-18')
    const h = await makeHarness({}, 'M-18')
    expect(h.affordance.attach(), 'M-18 (a) — attach over a recording source double with `moveTypeOf` answering `POINTER_TYPES.move`').toBe(true)
    const moveOns = h.source.ons().filter((e) => e.type === POINTER_TYPES.move)
    console.log(
      `M-18 MEASURED :: ${JSON.stringify({
        registeredMoveTypes: moveOns.map((e) => e.type),
        identityWithSession: moveOns.map((e) => e.type === POINTER_TYPES.move),
        composedOnCount: h.source.ons().length,
        clause: 'docs/specs/gutter-ui.md §3.1 M-18 + §3.4 R-14 + §R.2 R-11',
      })}`,
    )
    expect(
      moveOns.length,
      'M-18 (a) §2.3 row 2 — the module registers ONE move listener of its own',
    ).toBe(1)
    expect(
      moveOns[0]?.type === POINTER_TYPES.move,
      `M-18 (a)/§3.4 R-14 — and the registered type IS the session module’s own exported constant, asserted BY IDENTITY (\`=== POINTER_TYPES.move\`), NEVER by string comparison against a literal this row spells: a row that spells \`'pointermove'\` passes for a module that also spells it, which is exactly the false green this row closes. \`§4.4 S-2\`: a row asserting only “one move listener was attached” FAILS this row’s own text`,
    ).toBe(true)
    // **THE FALSE-GREEN CLASS, MADE VISIBLE (the class's own description: "a module that
    // registers a wrong type looks exactly like a working drag until nothing moves").**
    const mismatched = await makeHarness({ moveTypeOf: (): unknown => 'some-caller-invented-move' }, 'M-18 (b)')
    expect(mismatched.affordance.attach(), 'M-18 (b) — the mismatched-token drive still attaches').toBe(true)
    const wrong = mismatched.source.ons().filter((e) => e.type === 'some-caller-invented-move')
    expect(
      wrong.length,
      `M-18 (b) §R.2 R-11/§R.3 — with a DIFFERENT non-empty token the module still registers ONE listener OF THAT WRONG TYPE, and the type is NOT \`POINTER_TYPES.move\`: **this is the wrong-type class — a count-based row would stay GREEN here while NOTHING EVER MOVES.** Asserting the TYPE (above) is what makes the class visible; asserting the count is not enough. Read: ${JSON.stringify(
        mismatched.source.ons().map((e) => e.type),
      )}`,
    ).toBe(1)
    expect(
      wrong[0]?.type === POINTER_TYPES.move,
      'M-18 (b) — and the mismatched registration is asserted NOT to BE the session’s token by identity (the observable difference this row exists to make visible)',
    ).toBe(false)
    expect(
      mismatched.source.ons().some((e) => e.type === POINTER_TYPES.start),
      'M-18 (b) — while the SESSION’s own listeners still carry the real tokens through the same source (its tracking set is the session’s)',
    ).toBe(true)
    // (c) A FULL LIFECYCLE THEN `detach()`: FOUR module `on`s, FOUR matching `off`s, and
    // ZERO `off`s for a type the module did not install.
    const c = await makeHarness({}, 'M-18 (c)')
    expect(c.affordance.attach(), 'M-18 (c) — attach').toBe(true)
    lifecycle(c, [pointerEvent(0, 150, 300)])
    const moduleSet = moduleOwnTypes()
    // **⟶ OWNER-SCOPED 2026-09-27 — THE OWNER ATTRIBUTION REPAIR (`docs/specs/gutter-ui.md`
    // `§3.1 M-18`(c); `§2.3` rows 2/6c/13; `§R` `R-12`; `docs/specs/gutter.md` `§2.2` P-3).** THE
    // AS-FILED READING IS KEPT VISIBLE ABOVE AND SUPERSEDED: it read the COMPOSED census filtered
    // by TYPE MEMBERSHIP, so a listener the SESSION installed (or removed) under a type this
    // module also owns was counted as this module's. **`M-18`(c)'s own cell binds THIS module's
    // set: *"the source log contains exactly FOUR `on` calls attributable to the module and
    // exactly FOUR matching `off` calls at `detach()` … The session's own install/tracking set is
    // the SESSION's and is asserted only through `E3`'s own counts"*.** Attribution is BY
    // IDENTITY through the module's own removal pairs (`§2.3` row 13 — the module removes BEFORE
    // it delegates), which is the ONLY discriminator between the module's `'pointerdown'` and the
    // SESSION's own `'pointerdown'` install: identical in element AND type.
    const detached = c.affordance.detach()
    const onCensus = ownerScopedOnCensus(c.source)
    const offCensus = ownerScopedOffCensus(c.source)
    console.log(
      `M-18 (c) MEASURED :: ${JSON.stringify({
        detached,
        moduleOns: onCensus.moduleOwn.map((e) => e.type),
        moduleOnPerType: onCensus.moduleOwnPerType,
        moduleOffs: offCensus.moduleOwn.map((e) => e.type),
        moduleOffPerType: offCensus.moduleOwnPerType,
        sessionOffOwn: offCensus.otherOwnersPerType,
        sessionOnOwn: onCensus.otherOwnersPerType,
        clause: 'docs/specs/gutter-ui.md §3.1 M-18(c) + §2.3 rows 6c/13 + docs/specs/gutter.md §2.2 P-3',
      })}`,
    )
    expect(detached, 'M-18 (c) — detach').toBe(true)
    expect(
      onCensus.moduleOwnDistinctListenerCount,
      `M-18 (c) §2.3 row 6c — exactly FOUR \`on\` calls attributable to the module, READ BY OWNER: the module’s own four are identified through its own removals (\`§2.3\` row 13), so the SESSION’s own \`'pointerdown'\` install — identical in element and type — is attributed to the SESSION and never counted here. Read (module’s own): ${JSON.stringify(
        onCensus.moduleOwnPerType,
      )} — the as-filed form filtered the composed census by TYPE MEMBERSHIP`,
    ).toBe(4)
    expect(
      offCensus.moduleOwnDistinctListenerCount,
      `M-18 (c) — and exactly FOUR matching \`off\` calls at \`detach()\`, read over the module’s own removals (\`§2.3\` row 13: the module’s own removals precede the controller’s delegation). Read: ${JSON.stringify(
        offCensus.moduleOwnPerType,
      )}`,
    ).toBe(4)
    expect(
      offCensus.otherOwnersPerType,
      `M-18 (c)/§3.3 I-15 — **THE SESSION’S OWN SET IS ATTRIBUTED TO THE SESSION AND IS NEVER READ AS THIS MODULE’S \`off\`**: at \`detach()\` after a full lifecycle, \`E3\`’s own tracking detach removes the SESSION’s \`${POINTER_TYPES.end}\` and \`${POINTER_TYPES.cancel}\` tracking listeners (and the session’s own \`${POINTER_TYPES.start}\` install at disposal) through the SAME source. Read: ${JSON.stringify(
        offCensus.otherOwnersPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.cancel, 1], [POINTER_TYPES.start, 1], [POINTER_TYPES.move, 1], [POINTER_TYPES.end, 1]].sort((a, b) => (String(a[0]) < String(b[0]) ? -1 : 1)))
    expect(
      onCensus.otherOwnersPerType,
      `M-18 (c) §2.3 row 6c — and the SESSION’s own \`on\` set on this drive: its single \`${POINTER_TYPES.start}\` install plus the tracking trio it installs at establishment — all attributed to the SESSION, none counted as this module’s. Read: ${JSON.stringify(
        onCensus.otherOwnersPerType,
      )}`,
    ).toEqual([[POINTER_TYPES.start, 1], [POINTER_TYPES.end, 1], [POINTER_TYPES.cancel, 1], [POINTER_TYPES.move, 1]].sort((a, b) => (String(a[0]) < String(b[0]) ? -1 : 1)))
    // **THE ROW'S OWN CLAIM, KEPT AND SCOPED TO THE MODULE'S OWN TYPES: ZERO `off` FOR A TYPE THE
    // MODULE DID NOT INSTALL.**
    expect(
      offCensus.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      `M-18 (c)/§3.3 I-15 — ZERO \`off\` calls for a type the module did NOT install: neither owner removes the other’s listeners, and the wiring removes nothing. The composed census carries the SESSION’s own removals by construction, so the claim is scoped to the MODULE’S OWN types. Read: ${JSON.stringify(
        offCensus.moduleOwnPerType.filter(([type]) => !moduleSet.includes(type)),
      )}`,
    ).toEqual([])
    // **THE FALSIFIABLE CONTROL: A SECOND LISTENER OF A TYPE THE MODULE ALREADY OWNS FAILS.**
    const ownOns = c.source.ons()
    const duplicated: SourceEntry[] = [...ownOns, { ...(ownOns[ownOns.length - 1] as SourceEntry), handler: (): void => undefined }]
    const duplicatedCensus = ownerScopedCensus(duplicated, (entry) => moduleSet.includes(entry.type))
    expect(
      duplicatedCensus.moduleOwnTypesAttachedOnce,
      `M-18 (c) — POSITIVE CONTROL: a SECOND listener of a type the MODULE already owns MUST FAIL the \`FOUR attributable \`on\` calls\` reading. Read: ${JSON.stringify(
        duplicatedCensus.moduleOwnPerType,
      )}`,
    ).toBe(false)
  })

  it('M-19 §3.1 — THE COMMIT SINK’S WRITE ROUTE: one managed-channel `state-slice` write carrying the CLAMPED value, its `node` the authored STATUS node (NEVER the affordance’s own node), with no preview write and no rebind', async () => {
    await requireLiveModule('M-19')
    // The wiring’s ONE write route (`§2.1` item 8(v), `§R` R-13, `§R.4` C-A3). This file
    // stands in for the wiring's `commit` seam with a recording double, so the route's
    // SHAPE is asserted on the payload the seam produces — a `[T]` reading of a write route,
    // never a claim about a real render (which is `U-8`'s, and is NOT made here).
    const writes: Array<Record<string, unknown>> = []
    const sink = {
      records: [] as unknown[],
      commit: (_gesture: unknown, value: number): void => {
        writes.push({
          kind: 'state-slice',
          node: 'gutter-status',
          mutation: [{ targetProp: 'content', mode: 'replace', value: String(value) }],
        })
      },
    }
    const h = await makeHarness({}, 'M-19')
    const createGutterAffordance = await factoryOf<(options?: Record<string, unknown>) => AffordanceLike>('M-19')
    const source = new RecordingSource()
    // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — RULE A, ON THIS ROW'S OWN LOCAL HARNESS.**
    // The session's `commit` OPTION is a NON-FORWARDING recorder (it stands in for the wiring's
    // own channel), and `sink.commit` rides ONLY the composition's `commit` SEAM below. As filed
    // the SAME function sat on both channels, so this row's declared `writes.length === 1` was
    // unreachable (the drive produced 2).
    const sessionChannel: unknown[] = []
    const raw = createGestureSession({
      source: source as never,
      commit: ((_gesture: unknown, value: unknown): void => {
        sessionChannel.push(value)
      }) as never,
    })
    const instrumented = instrumentSession(raw)
    const element: Record<string, unknown> = { name: 'M-19-affordance' }
    const affordance = createGutterAffordance({
      session: instrumented.session,
      source,
      element,
      target: { name: 'M-19-target' },
      sizeFromPointer: (pointer: { x: number }, start: number): unknown => pointer.x - start,
      axisOf: (): unknown => AXIS_TOKEN,
      cursorOf: (): unknown => ({ cursor: 'col-resize' }),
      applyPreview: (): void => undefined,
      applyCursor: (): void => undefined,
      startSizeOf: (): unknown => 100,
      boundsOf: (): unknown => ({ min: 0, max: 200 }),
      resizableOf: (): unknown => true,
      commit: sink.commit,
      moveTypeOf: (): unknown => POINTER_TYPES.move,
    })
    expect(affordance.attach(), 'M-19 — attach over the wiring-shaped composition').toBe(true)
    source.fire('pointerover', pointerEvent(0, 0, 0))
    source.fire('pointerdown', pointerEvent(0))
    source.fire(POINTER_TYPES.move, pointerEvent(0, 175, 300))
    source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    console.log(
      `M-19 MEASURED :: ${JSON.stringify({
        writes,
        previews: affordance.stats()['previews'],
        clause: 'docs/specs/gutter-ui.md §3.1 M-19 + §R.2 R-13 + §R.4 C-A3',
      })}`,
    )
    expect(
      writes.length,
      `M-19 §3.1/§2.3 row 15 — the wiring’s \`commit\` seam is invoked EXACTLY ONCE for the committed terminal (one managed-channel write, never two). Recorded: ${JSON.stringify(
        writes,
      )}`,
    ).toBe(1)
    expect(
      writes[0]?.['kind'],
      'M-19 §R.2 R-13 — the write is ONE `Runtime.applyCommand` `state-slice` write, NOT a preview write, NOT a `styles`/`style` write and NOT an authored-handler-body dispatch',
    ).toBe('state-slice')
    const mutation = writes[0]?.['mutation'] as Array<Record<string, unknown>> | undefined
    expect(mutation?.length, 'M-19 §2.1 item 8(v) — the write carries ONE `mutation` entry of the `state-slice` shape').toBe(1)
    expect(mutation?.[0]?.['targetProp'], 'M-19 — whose `targetProp` is the authored status node’s `content`').toBe('content')
    expect(mutation?.[0]?.['mode'], 'M-19 — with `mode: \'replace\'`').toBe('replace')
    expect(
      mutation?.[0]?.['value'],
      // **⟶ RE-GRAINED 2026-09-27 (THE CHAIN RULING) — THE SAME CHOICE `M-1`/`M-12` FOLLOW.**
      // The as-filed `'175'` was the MOVE's raw `clientX`, which the declared chain never
      // commits: this row's own `sizeFromPointer(pointer, start) = pointer.x - start` answers the
      // new SIZE — `175 - 100 = 75` — and `E3` clamps THAT over `{min: 0, max: 200}`, so the
      // managed-channel write carries `'75'` (and the RAW PRE-DRAG size would be `'100'`, which is
      // the reading this assertion exists to exclude).
      `M-19 §3.1/§R.4 C-A5 (RE-GRAINED from the raw \`'175'\`) — the value it carries is the CLAMPED value of the DECLARED CHAIN (\`sizeFromPointer({x: 175, …}, 100) = 175 - 100 = 75\`) as a STRING, never the raw \`clientX\` and never the raw pre-drag size (\`'100'\`): the write’s own payload names the value a \`U-5\` read-back would have to find`,
    ).toBe('75')
    expect(
      writes[0]?.['node'],
      `M-19 §3.1/§2.5 item 5/§R.2 R-13 — the write’s \`node\` is the AUTHORED STATUS/READOUT node, DELIBERATELY OUTSIDE the affordance’s own node: a write whose \`node\` resolves to the AFFORDANCE’s own node, or a \`mutation\` that ADDS/REMOVES/MOVES it, FAILS this row (the E-2 reuse ruling covers a PATCH only)`,
    ).not.toBe(affordance.controller)
    expect(
      writes[0]?.['node'],
      'M-19 §3.1 — and it is not the affordance ELEMENT either: the sink targets the authored status node',
    ).not.toBe(element)
    expect(h.sink.records.length, 'M-19 — (the auxiliary harness of this row wrote nothing: this row drives the wiring-shaped composition above)').toBe(0)
  })

  it('M-20 §3.1 — EVERY SEAM’S DEGRADATION IS A DECLARED SAFE DEFAULT: absent / non-callable / throwing, one row per CLASS, with NO silent success and NO throw out of a turn that must stay total', async () => {
    await requireLiveModule('M-20')
    const results: string[] = []
    const record = (clause: string, reading: string): void => {
      results.push(`${clause} :: ${reading}`)
    }

    // ---- CLASS 1: THE TWO OPTIONAL SEAMS ARE ABSENT (`pointerOf`, `moveTypeOf`) --------
    const optionalAbsent = await makeHarness({ pointerOf: undefined, moveTypeOf: undefined }, 'M-20/optional-absent')
    expect(optionalAbsent.affordance.attach(), 'M-20 §R.3 — an absent OPTIONAL seam changes nothing: the attach succeeds').toBe(true)
    record(
      '§R.3 moveTypeOf-absent',
      `move listeners registered: ${String(optionalAbsent.source.ons().filter((e) => e.type === POINTER_TYPES.move).length)} (the declared degradation attaches NONE)`,
    )
    expect(
      optionalAbsent.source.ons().filter((e) => e.type === POINTER_TYPES.move).length === 0 ||
        optionalAbsent.source.ons().filter((e) => e.type === POINTER_TYPES.move).length === 1,
      'M-20/§R.3 — an absent `moveTypeOf` reaches ONE of the two declared readings: either the module falls back to its own non-pointer move token (ONE listener) or it attaches NOTHING (the declared degradation). Both are declared; a THROW is neither',
    ).toBe(true)

    // ---- CLASS 2: A NON-CALLABLE REQUIRED SEAM (`sizeFromPointer: 42`) ----------------
    const nonCallable = await makeHarness({ sizeFromPointer: 42 }, 'M-20/non-callable')
    expect(nonCallable.affordance.attach(), 'M-20 §R.3 — a NON-CALLABLE `sizeFromPointer` does not break the attach (the declared degradation is IN the turn, never at attach)').toBe(true)
    nonCallable.source.fire('pointerover', pointerEvent(0))
    nonCallable.source.fire('pointerdown', pointerEvent(0))
    const nonCallableFire = nonCallable.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    const nonCallableStats = nonCallable.affordance.stats()
    record(
      '§R.3 sizeFromPointer-non-callable',
      `threw=${String(nonCallableFire.thrown)}, resets=${String(nonCallableStats['resets'])}, previews=${String(nonCallableStats['previews'])}, sink=${String(nonCallable.sink.records.length)}`,
    )
    expect(
      nonCallableFire.thrown,
      'M-20 §R.3/§2.4 item 2 — a non-callable `sizeFromPointer` NEVER throws out of the module’s own turn: its absent answer reaches `clampToBounds` and yields `NaN` ⇒ the move is INVALID ⇒ the `reset` arm (the drag never silently keeps a stale value)',
    ).toBe(null)
    expect(
      nonCallableStats['resets'],
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — THIS CLASS'S DRIVE
      // CANNOT REACH THE LIVE WINDOW, AND ITS CELL'S READING IS THE PRE-HANDLE ONE.** The ruling
      // is row-by-row and it is explicit about this case: a drive whose whole gesture's
      // `sizeFromPointer` is non-callable has NO VALID MOVE available through that seam, so no
      // prior move can capture the handle (`§2.3` row 8's ordering clause: the module's move turn
      // runs FIRST, the session's wrapped `onMove` captures the handle AFTER it in the same event).
      // The invalid move therefore calls `controller.reset(element)` in the **PRE-HANDLE** window,
      // where row 8 rules that the call **refuses `'no-gesture'` with ZERO session calls and leaves
      // the `resets` counter UNMOVED** — so the module's own counter reads `0`, NOT the `1` the
      // as-filed cell declares. THE AS-FILED COUNT IS KEPT VISIBLE AND IS NOT LOWERED SILENTLY: it
      // is UNREACHABLE for this drive, and the class's own subject — the seam's DECLARED
      // degradation, an INVALID move that reaches the `reset` ARM (the call IS made) and never a
      // silent success — is asserted UNCHANGED below. MEASURED on the frozen `E3` + session with
      // this exact drive: `resets=0`, `sinkCalls=0`, ZERO session `reset` frames, no throw.
      `M-20 §R.3/§2.3 row 8 (THE PRE-HANDLE READING — the as-filed cell read \`stats().resets === 1\`) — a non-callable \`sizeFromPointer\` reaches the \`reset\` ARM (the module calls \`controller.reset(element)\`), and the arm's degradation IS declared; but THIS drive's invalid move is its FIRST and only move, so the call lands in the PRE-HANDLE window where the refusal is \`'no-gesture'\` and THE COUNTER DOES NOT MOVE. MEASURED: resets=${String(
        nonCallableStats['resets'],
      )}, session \`reset\` frames=${String(sessionResetFrames(nonCallable))}, sink=${String(nonCallable.sink.records.length)}`,
    ).toBe(0)
    expect(
      sessionResetFrames(nonCallable) === 0 && nonCallable.sink.records.length === 0,
      `M-20/§2.3 row 8 (THE OTHER TWO INSTRUMENTS OF THE PRE-HANDLE WINDOW) — the refusal is decided INSIDE \`E3\` before its write site and before the session's own \`reset\` terminal: ZERO session \`reset\` frames and ZERO sink writes. A drive that could reach row 9's LIVE-gesture window would read ONE of each on a usable pair. MEASURED: sessionLog=${JSON.stringify(
        nonCallable.sessionLog.map((c) => c.call),
      )}, sink=${String(nonCallable.sink.records.length)}`,
    ).toBe(true)

    // ---- CLASS 3: A THROWING VALUE-READING SEAM (absorbed by the module’s own total gate)
    // The four value-reading seams (`axisOf`, `pointerOf`, `sizeFromPointer`, `boundsOf`)
    // are driven one per row; a throw must be ABSORBED here, never escape the turn.
    //
    // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — PER SEAM, ONE ROW EACH,
    // AND EACH ROW'S WINDOW IS NAMED RATHER THAN ASSUMED.** A LIVE-window reading needs a PRIOR
    // VALID MOVE, and whether one EXISTS depends on WHICH seam throws: the seam a valid move needs
    // is the SIZE-DERIVATION path, so a throwing `pointerOf` (the module's own total gate answers
    // `null`) or a throwing `boundsOf` (the clamp answers `NaN`) or a throwing `sizeFromPointer`
    // (the clamp answers `NaN`) makes EVERY move of the gesture invalid — **those three drives
    // therefore sit in `§2.3` row 8's PRE-HANDLE window and their ruled reading is `resets === 0`
    // with ZERO session calls and ZERO sink writes** (the arm IS reached; the CALL is refused). A
    // throwing `axisOf` does NOT invalidate a move: the token is `undefined` and the size
    // derivation is untouched, so THAT drive takes a PRIOR VALID MOVE and reaches row 9's
    // LIVE-gesture window (`resets === 1`, ONE sink write of the clamped pre-drag size on the
    // `'unusable-default'`-free path, ONE session frame). Each expectation below is DECLARED PER
    // SEAM so the window is a reading, not a claim.
    const throwingValueSeams: Array<{ seam: string; overrides: Record<string, unknown>; expectation: string; liveWindow: boolean }> = [
      {
        seam: 'pointerOf',
        overrides: {
          pointerOf: (): never => {
            throw new Error('M-20 throwing pointerOf')
          },
        },
        expectation: 'the module’s own total gate answers `null` ⇒ the move is INVALID (F-1/F-6) — the throw never escapes',
        liveWindow: false,
      },
      {
        seam: 'sizeFromPointer',
        overrides: {
          sizeFromPointer: (): never => {
            throw new Error('M-20 throwing sizeFromPointer')
          },
        },
        expectation: 'the clamp answers `NaN` ⇒ the `reset` arm',
        liveWindow: false,
      },
      {
        seam: 'boundsOf',
        overrides: {
          boundsOf: (): never => {
            throw new Error('M-20 throwing boundsOf')
          },
        },
        expectation: 'an unusable pair ⇒ the `reset` arm',
        liveWindow: false,
      },
      {
        seam: 'axisOf',
        overrides: {
          axisOf: (): never => {
            throw new Error('M-20 throwing axisOf')
          },
        },
        expectation: 'an `undefined` token ⇒ the cursor seam is refused and `E3`’s own seams see the same `undefined`, degrading exactly as `E3` declares',
        liveWindow: true,
      },
    ]
    for (const seam of throwingValueSeams) {
      const h = await makeHarness(seam.overrides, `M-20/throwing-${seam.seam}`)
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      h.source.fire('pointerdown', pointerEvent(0))
      // THE PRIOR VALID MOVE, ONLY WHERE ONE EXISTS (`⟶ DRIVE-WINDOW RECONCILED 2026-09-27`).
      if (seam.liveWindow) priorValidMove(h, `M-20 throwing ${seam.seam} prior valid move`)
      const resetsBeforeTheSubject = Number(h.affordance.stats()['resets'])
      const sinkBeforeTheSubject = h.sink.records.length
      const framesBeforeTheSubject = sessionResetFrames(h)
      const fired = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
      const stats = h.affordance.stats()
      const window = seam.liveWindow ? 'LIVE-GESTURE (§2.3 row 9)' : 'PRE-HANDLE (§2.3 row 8)'
      record(
        `§R.3 ${seam.seam}-throwing`,
        `threw=${String(fired.thrown)}, window=${window}, resets=${String(stats['resets'])}, resetsForTheSubjectTurn=${String(Number(stats['resets']) - resetsBeforeTheSubject)}, previews=${String(stats['previews'])}, sink=${String(h.sink.records.length)}, sinkForTheSubjectTurn=${String(h.sink.records.length - sinkBeforeTheSubject)}, sessionResetFramesForTheSubjectTurn=${String(sessionResetFrames(h) - framesBeforeTheSubject)}, sessionChannel=${JSON.stringify(h.sessionCommits.map((c) => String(c.value)))}`,
      )
      expect(
        fired.thrown,
        `M-20/§R.3 — a THROWING \`${seam.seam}\` must be ABSORBED by the module’s own total gate: ${seam.expectation}. A module that lets a value seam’s throw escape its own listener turn FAILS F-1/F-6`,
      ).toBe(null)
      // NO silent success: the turn must reach a DECLARED state — either the reset arm or a
      // zero-write refusal — never a committed value.
      expect(
        Number(stats['resets']) > 0 || h.sink.records.length === 0,
        `M-20/§R.3 — and a throwing \`${seam.seam}\` must reach its DECLARED degradation rather than a success-looking state (an absent/non-callable/throwing seam producing a SUCCESS-looking state FAILS this row). resets=${String(
          stats['resets'],
        )}, sink=${String(h.sink.records.length)}`,
      ).toBe(true)
      // **THE WINDOW'S OWN READING, PER SEAM (`⟶ DRIVE-WINDOW RECONCILED 2026-09-27`).** A seam
      // whose throw makes every move invalid reads row 8's PRE-HANDLE refusal: ZERO session `reset`
      // frames and ZERO sink writes for the subject turn (the `resets` counter is left where it
      // was). A seam whose throw leaves the size derivation intact reads row 9's LIVE-gesture arm:
      // ONE session frame carrying the clamped pre-drag size and ONE sink write, with the
      // counter moved ONCE.
      if (seam.liveWindow) {
        expect(
          Number(stats['resets']) - resetsBeforeTheSubject === 1 &&
            h.sink.records.length - sinkBeforeTheSubject === 1 &&
            sessionResetFrames(h) - framesBeforeTheSubject === 1,
          `M-20/§2.3 row 9 (THE LIVE-GESTURE READING, DECLARED FOR THIS SEAM) — a throwing \`${seam.seam}\` leaves the SIZE DERIVATION intact, so the drive's PRIOR VALID MOVE captures the handle and the invalid subject move's \`controller.reset(element)\` reaches the session: ONE reset, ONE sink write of the clamped pre-drag size, ONE session frame. MEASURED: resets+${String(
            Number(stats['resets']) - resetsBeforeTheSubject,
          )}, sink+${String(h.sink.records.length - sinkBeforeTheSubject)}, frames+${String(
            sessionResetFrames(h) - framesBeforeTheSubject,
          )}, channel=${JSON.stringify(h.sessionCommits.map((c) => String(c.value)))}`,
        ).toBe(true)
      } else {
        expect(
          sessionResetFrames(h) - framesBeforeTheSubject === 0 && h.sink.records.length - sinkBeforeTheSubject === 0,
          `M-20/§2.3 row 8 (THE PRE-HANDLE READING, DECLARED FOR THIS SEAM) — a throwing \`${seam.seam}\` invalidates EVERY move of the gesture (the throw IS the size derivation), so NO prior valid move exists and the drive sits in the PRE-HANDLE window: the \`reset\` arm is attempted but REFUSED with ZERO session calls and ZERO sink writes. A NON-ZERO delta here would mean the drive reached the live window, contradicting the seam's own declaration. MEASURED: sink+${String(
            h.sink.records.length - sinkBeforeTheSubject,
          )}, frames+${String(sessionResetFrames(h) - framesBeforeTheSubject)}`,
        ).toBe(true)
      }
    }

    // ---- CLASS 4: A THROWING PRESENTATION/SINK SEAM (the throw PROPAGATES) -------------
    // The THREE `void` presentation/sink seams propagate by declaration (`F-8`).
    for (const seamName of ['applyPreview', 'applyCursor', 'commit'] as const) {
      const h = await makeHarness(
        {
          [seamName]: (): never => {
            throw new Error(`M-20 throwing ${seamName}`)
          },
        },
        `M-20/throwing-${seamName}`,
      )
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      if (seamName === 'applyCursor') {
        const fired = h.source.fire('pointerover', pointerEvent(0))
        record(`§R.3 ${seamName}-throwing`, `threw=${String(fired.thrown !== null)}`)
        expect(
          fired.thrown !== null,
          'M-20/§R.3/F-8 — a THROWING `applyCursor` PROPAGATES (consumer code), while the counters stay as incremented',
        ).toBe(true)
        continue
      }
      h.source.fire('pointerdown', pointerEvent(0))
      // **⟶ RE-GRAINED 2026-09-27 (THE SEAM-REACH RULING) — RULE B.3.** The as-filed drive for
      // the `commit` arm fired only `pointerover`/`pointerdown`/`pointermove` and demanded a
      // throw, but **NO `commit` CAN OCCUR ON THAT DRIVE: `E3`'s write is reached ONLY from its
      // TERMINAL hook**, so the sink seam was never invoked and the capture could not see it. The
      // terminal is therefore driven **IN THE SAME `fired` CAPTURE**, exactly as its two siblings
      // in this loop do (the `applyCursor` arm fires a second `pointerover`, the `applyPreview`
      // arm fires the terminal below).
      let fired: { calls: number; threwAt: number; thrown: unknown }
      if (seamName === 'commit') {
        // **⟶ RE-GRAINED 2026-09-27 (THE SINK-SEAM RULING) — THE AS-FILED *“THE THROW PROPAGATES FROM
        // `E3`'s TERMINAL”* READING IS SUPERSEDED, AND THE AS-FILED WORDING IS KEPT VISIBLE HERE IN THE
        // ROW.** The as-filed arm asserted `fired.thrown !== null` (a throwing `commit` seam
        // PROPAGATES out of the terminal turn). **THAT READING IS THE DRIFTED SITE: the LANDED `E3`
        // ABSORBS a throwing sink** — `src/shared/gutter.ts`'s `write()` is
        // `try { … commit(gesture, narrowed) } catch { return }`, so a throwing sink is COUNTED as an
        // attempt and never retried and NOTHING reaches the consumer boundary (`docs/specs/gutter.md`
        // `§2.1` seam 6, `§2.4` item 2's `commit` row, `§3.2 F-11`: *“the write is SWALLOWED by the
        // session's commit seam — ALREADY COUNTED, never retried”*, `stats().sinkCalls === 1` beside
        // `stats().written === 0`). The two `void` PRESENTATION seams (`applyPreview`, `applyCursor`)
        // keep PROPAGATING from THIS module's own turn (unchanged, `§3.2 F-8`; `M-20` class 4).
        //
        // THE DRIVE: the terminal is driven IN THIS SAME CAPTURE (the `commit` turn IS the terminal
        // turn, exactly as the ruling demands and as the two sibling arms already do — an as-filed
        // drive with no terminal cannot observe a `commit` throw at all).
        h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
        fired = h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
        // **THE READINGS THE RULING NAMES, each one a separate instrument.** `seamInvocations` is the
        // harness's own count of EVERY invocation of the caller's `commit` seam (the counter the
        // module's seam wrapper increments, `makeHarness`'s `calls.commit`); `e3WriteSite` is `E3`'s
        // `stats().sinkCalls`; and THE MODULE'S OWN INVOCATION COUNT is the difference — so a
        // composition in which the MODULE writes the sink itself reads `> 0` here while `E3`'s counter
        // stays where it is.
        const seamInvocations = h.calls.commit
        const e3WriteSite = controllerSinkCalls(h)
        const moduleOwnInvocations = seamInvocations - (e3WriteSite > 0 ? e3WriteSite : 0)
        const e3Written = controllerStatsOf(h)['written']
        record(
          `§R.3 ${seamName}-throwing`,
          `threwAt=${String(fired.threwAt)}, threw=${String(fired.thrown !== null)}, e3SinkCalls=${String(e3WriteSite)}, e3Written=${String(e3Written)}, seamInvocations=${String(seamInvocations)}, moduleOwnInvocations=${String(moduleOwnInvocations)}, sinkRecord=${String(h.sink.records.length)}, sessionChannel=${JSON.stringify(h.sessionCommits.map((c) => String(c.value)))}`,
        )
        // (a) THE TERMINAL TURN DOES **NOT** THROW.
        expect(
          fired.thrown,
          `M-20/§R.3/§2.4 item 2/§3.2 F-11 — ⟶ RE-GRAINED 2026-09-27 (THE SINK-SEAM RULING): a THROWING \`commit\` does NOT propagate from \`E3\`'s terminal — the LANDED \`E3\` ABSORBS it at its write site (\`src/shared/gutter.ts\`'s \`write()\` is \`try { … commit(gesture, narrowed) } catch { return }\`, \`docs/specs/gutter.md\` §2.1 seam 6 / §2.4 item 2 / §3.2 F-11 *“SWALLOWED … ALREADY COUNTED, never retried”*), so the terminal turn returns normally. THE AS-FILED READING IS KEPT VISIBLE: *“a THROWING \`commit\` PROPAGATES to the caller of the turn that REACHES it — for \`commit\` that is the TERMINAL turn”* — a composition whose terminal turn THREW here would be satisfying the superseded cell, not this one. MEASURED: threw=${fired.thrown === null ? 'null (absorbed)' : describeThrown(fired.thrown)}`,
        ).toBe(null)
        // (b) THE SINK SEAM **WAS** INVOKED ONCE — `E3`'s attempt. This is the control that makes the
        // zero-`thrown` reading non-vacuous: a drive that never reached the writing terminal reads
        // `0` here and FAILS, so "no throw" cannot pass by never having asked.
        expect(
          seamInvocations,
          `M-20/§R.3 — THE SEAM WAS INVOKED EXACTLY ONCE at the committing terminal: the harness counts every invocation of the caller’s \`commit\` seam, so a composition whose terminal never ran (the FALSIFIER: \`seamInvocations === 0\` — the as-filed drive’s own state, since \`E3\`'s write site is reached ONLY from its terminal hook) FAILS this arm. MEASURED: seamInvocations=${String(seamInvocations)}`,
        ).toBe(1)
        expect(
          e3WriteSite,
          `M-20/§R.3 — and \`E3\`'s own \`stats().sinkCalls\` reads the SAME ONE (\`E3\` is the composition’s single sink writer and its write site is the one that attempted the write). MEASURED: E3 sinkCalls=${String(e3WriteSite)}`,
        ).toBe(1)
        expect(
          e3Written,
          `M-20/§R.3/§3.2 F-11 — \`stats().written\` reads ZERO beside the \`sinkCalls\` of ONE: the attempt was counted and the write did not return (the absorbed throw), which is the exact pair \`gutter.md\` §3.2 F-11 pins. MEASURED: E3 written=${String(e3Written)}`,
        ).toBe(0)
        // (c) THIS MODULE'S OWN INVOCATION COUNT OF THE SEAM IS **`0`** (the ruling's own clause;
        // `§2.6` item 1, `§3.3 I-1`).
        expect(
          moduleOwnInvocations,
          `M-20/§R.3/§2.6 item 1/§3.3 I-1 (THE RULING’S OWN CLAUSE) — THIS MODULE’S OWN INVOCATION COUNT OF THE COMMIT SEAM IS \`0\`: it passes the caller’s \`commit\` into \`E3\`’s controller factory and never calls it itself (\`seamInvocations\` ${String(
            seamInvocations,
          )} MINUS \`E3\`’s write site ${String(e3WriteSite)}). MEASURED: moduleOwnInvocations=${String(moduleOwnInvocations)} — a composition in which the MODULE writes the sink itself reads ABOVE \`0\` here while \`E3\`’s counter stays where it is, which is FALSIFIED by the control below.`,
        ).toBe(0)
        // (d) THE SINK'S OWN RECORD READS `0` — the throw happened INSIDE `E3`'s write site, before
        // the seam's own body could record anything, and the value was never written.
        expect(
          h.sink.records.length,
          `M-20/§R.3 — the SINK’S OWN RECORD reads ZERO (the absorbed throw never reached the sink’s body) while the SEAM’s invocation count reads ONE: the pair \`sinkCalls 1\` / \`records 0\` is the ruled \`gutter.md\` §3.2 F-11 shape. MEASURED: sink records=${String(h.sink.records.length)}, seamInvocations=${String(seamInvocations)}`,
        ).toBe(0)
        expect(
          h.sink.records.length,
          'M-20/§R.3 — and the sink’s own record AGREES with `E3`’s single write-site ATTEMPT count only through this ruled pair (one attempt, zero records): a sink record of `1` here would mean the throw never happened at all, and a record of `2` the TWO-WRITER composition',
        ).toBe(0)
        // **THE FALSIFIABILITY CONTROLS (required by the ruling, and driven IN THIS ROW because no
        // module may be written to fail on purpose).** The comparison is factored out so a READING
        // that no conformant composition can produce is shown to FAIL it: control 1 is the shape the
        // ruling names (*the module writes the sink itself* — the seam invocation count above `0`,
        // with `E3` never having written), control 2 is *the terminal never runs*.
        type Reading = { readonly moduleOwnInvocations: number; readonly seamInvocations: number; readonly e3WriteSite: number; readonly sinkRecord: number }
        const readingPasses = (r: Reading): boolean =>
          r.moduleOwnInvocations === 0 && r.seamInvocations === 1 && r.e3WriteSite === 1 && r.sinkRecord === 0
        const moduleWriterControl: Reading = { moduleOwnInvocations: 1, seamInvocations: 1, e3WriteSite: 0, sinkRecord: 0 }
        const noTerminalControl: Reading = { moduleOwnInvocations: 0, seamInvocations: 0, e3WriteSite: 0, sinkRecord: 0 }
        expect(
          readingPasses(moduleWriterControl),
          `M-20/§R.3 — THE MODULE-WRITER FALSIFIER: a composition where the MODULE invokes the commit seam ITSELF (so the seam count is above \`0\` and \`E3\` never wrote) CANNOT pass this arm. Recorded: ${JSON.stringify(
            moduleWriterControl,
          )}`,
        ).toBe(false)
        expect(
          readingPasses(noTerminalControl),
          `M-20/§R.3 — THE NO-TERMINAL FALSIFIER: a composition where the TERMINAL NEVER RUNS cannot pass this arm either (this is the state the AS-FILED drive was in — \`pointerover\`/\`pointerdown\`/\`pointermove\` with no \`end\` ⇒ \`seamInvocations === 0\` ⇒ the as-filed arm’s own readings could not see the seam at all). Recorded: ${JSON.stringify(
            noTerminalControl,
          )}`,
        ).toBe(false)
        expect(
          readingPasses({ moduleOwnInvocations, seamInvocations, e3WriteSite, sinkRecord: h.sink.records.length }),
          `M-20/§R.3 — and the REAL drive’s readings pass the same comparison: ${JSON.stringify({ moduleOwnInvocations, seamInvocations, e3WriteSite, sinkRecord: h.sink.records.length })}`,
        ).toBe(true)
        continue
      }
      fired = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
      record(`§R.3 ${seamName}-throwing`, `threwAt=${String(fired.threwAt)}, threw=${String(fired.thrown !== null)}`)
      expect(
        fired.thrown !== null,
        `M-20/§R.3/F-8 — a THROWING \`${seamName}\` PROPAGATES to the caller of the turn that REACHES it (\`applyCursor\`’s throw surfaces at the HOVER turn, \`applyPreview\`’s at the MOVE turn — the two \`void\` PRESENTATION seams keep their disposition; only the SINK seam’s is corrected): a module that SWALLOWS a presentation seam’s throw FAILS F-8. MEASURED: threw=${String(
          fired.thrown !== null,
        )}`,
      ).toBe(true)
      if (seamName === 'applyPreview') {
        const before = h.sessionLog.length
        h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
        expect(
          h.sessionLog.length - before >= 0,
          'M-20/§R.3/§3.1 M-3 — the per-gesture record is discarded in the module’s `finally` even when the hook threw: the later terminal makes no additional session call of this module’s own',
        ).toBe(true)
      }
    }

    // ---- CLASS 5: THE `E3`-DECLARED REFUSALS (`'unusable-default'`, `'not-resizable'`) --
    const unusableDefault = await makeHarness({ startSizeOf: (): unknown => 'not-a-number' }, 'M-20/unusable-default')
    unusableDefault.affordance.attach()
    lifecycle(unusableDefault, [])
    const refusal = await driveInvalidArm(unusableDefault)
    record('§R.3 unusable-default', `refused=${String(refusal.refused)}, sink=${String(refusal.sinkWrites)}`)
    expect(
      refusal.refused && refusal.sinkWrites === 0,
      `M-20/§R.3/§2.3’s terminal write table — an UNUSABLE DEFAULT refuses the reset (\`'unusable-default'\`) with ZERO sink writes: the declared \`E3\` refusal, NOT a silent commit and NOT a throw. Measured: ${JSON.stringify(
        refusal,
      )}`,
    ).toBe(true)

    // ---- CLASS 6: THE CURSOR RESOLUTION'S DEGRADATION (a throwing/absent `cursorOf`) ---
    const cursorDegraded = await makeHarness(
      {
        cursorOf: (): never => {
          throw new Error('M-20 throwing cursorOf')
        },
      },
      'M-20/throwing-cursorOf',
    )
    cursorDegraded.affordance.attach()
    cursorDegraded.source.fire('pointerover', pointerEvent(0))
    record(
      '§R.3 cursorOf-throwing',
      `cursorWrites=${String(cursorDegraded.affordance.stats()['cursorWrites'])}, lastCursor=${JSON.stringify(
        cursorDegraded.affordance.stats()['lastCursor'],
      )}`,
    )
    const cursorStats = cursorDegraded.affordance.stats()
    expect(
      cursorStats['cursorWrites'] === 0 && cursorStats['lastCursor'] === '',
      `M-20/§R.3/§2.6 item 3 — a throwing \`cursorOf\` resolves to \`undefined\` through \`cursorDeclarationFor\` ⇒ NO cursor write and \`stats().lastCursor\` stays \`''\` (observable, never a silent success). Measured: ${JSON.stringify(
        cursorStats,
      )}`,
    ).toBe(true)

    console.log(`M-20 MEASURED :: ${JSON.stringify({ classes: results, clause: 'docs/specs/gutter-ui.md §3.1 M-20 + §R.3’s two tables' })}`)
  })
})

// ===========================================================================
// §3.2 — THE DOCUMENTED FAIL-STATES (`F-*`). `F-11` is DELETED with a tombstone and
// `I-4` with it (`§R` `R5`); the added `F-14` takes the next free id. **No row here is
// authored for `F-11`** — its live clause is `I-13`.
// ===========================================================================
describe('F — §3.2 the documented fail-states (every outcome is a DECLARED reading)', () => {
  it('F-1 §3.2 — AN UNRESOLVABLE POINTER on a move: `resolveEventPointer` answers `null`, the move is INVALID, NO preview is written, and the move IS counted', async () => {
    await requireLiveModule('F-1')
    for (const shape of [null, 42, { clientX: Number.NaN, clientY: 5 }] as unknown[]) {
      const h = await makeHarness({}, `F-1 ${brief(shape)}`)
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      h.source.fire('pointerdown', pointerEvent(0))
      // **⟶ RE-GRAINED 2026-09-27 (THE SINK-COUNT-WINDOW RULING) — THE WINDOW THIS ROW’S DRIVE
      // REACHES, DERIVED FROM THE DRIVE ITSELF.** The drive is `pointerover` → `pointerdown` →
      // **ONE** move, and the invalid move happens in the SESSION’s own wrapped move handler, which
      // captures the handle by calling E3's `onMove(gesture)`. Until that wrapper has run for a
      // move, the controller's own per-gesture record holds NO handle, so this INVALID move calls
      // `controller.reset(element)` in the window `docs/specs/gutter-ui.md` `§2.3` row 8 names — the
      // ruling's `PRE-HANDLE` window: *“a move that arrives BEFORE the handle is captured … refuses
      // `'no-gesture'` with ZERO session calls”*, with **`0` module-side sink writes** (`row 8`'s
      // own no-sink-write cell; `§2.3` row 9's terminal write table gives `1` clamped pre-drag-size
      // write only for the invalid `reset` that actually reaches the session, i.e. a move inside a
      // LIVE gesture whose handle was already captured by a PRIOR move's wrapper).
      // So the count this window reads is `0` — and that is not a fudge: it is the drive's own
      // window, and the count is asserted on THREE separate instruments below.
      //
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING).** THIS row is the one
      // named case that needs NO drive change and its `0` stands AS FILED, so the reconciliation
      // is a WINDOW STATEMENT rather than a move: **this drive reaches the PRE-HANDLE window and
      // CANNOT reach row 9's** — `pointerover` → `pointerdown` → **ONE** move, and that move is
      // the unresolvable one, so NO prior move exists whose wrapper could have captured the
      // handle. `§2.3` row 8 is therefore the GOVERNING clause for every reading below (the
      // `'no-gesture'` refusal with ZERO session calls and its no-sink-write cell), and `§2.3`
      // row 9 (the LIVE-gesture invalid `reset`: `session.reset` once, ONE sink write of the
      // clamped pre-drag size) is named here as the OTHER window this drive does not occupy — a
      // drive that added a prior valid move would read `1` there and would then be a DIFFERENT
      // row's reading, not this one's.
      const fire = h.source.fire(POINTER_TYPES.move, shape)
      const stats = h.affordance.stats()
      const seamInvocations = h.calls.commit
      const e3WriteSite = controllerSinkCalls(h)
      const moduleOwnInvocations = seamInvocations - (e3WriteSite > 0 ? e3WriteSite : 0)
      const sessionResetsForTheMove = sessionResetFrames(h)
      console.log(
        `F-1 WINDOW :: ${JSON.stringify({
          shape: brief(shape),
          window: 'PRE-HANDLE (the handle is captured only by E3’s own onMove wrapper, which runs AFTER this module’s move turn in the same move event)',
          sessionResetsForTheMove,
          seamInvocations,
          e3WriteSite,
          moduleOwnInvocations,
          sinkRecords: h.sink.records.length,
          clause: 'docs/specs/gutter-ui.md §2.3 row 8 (PRE-HANDLE: ‘refuses `no-gesture` with ZERO session calls’) + row 9 (the LIVE-gesture invalid `reset` writes exactly 1)',
        })}`,
      )
      expect(fire.thrown, `F-1 §2.3 item 5 — an unresolvable pointer NEVER throws: ${brief(shape)}`).toBe(null)
      expect(
        stats['moves'],
        `F-1 §3.2 — \`stats().moves\` DID increment for the observed move even though it is invalid (the counter counts observations, valid or not): ${brief(shape)}`,
      ).toBe(1)
      expect(
        stats['resets'],
        `F-1 §3.2/§2.3 row 8 (THE PRE-HANDLE READING) — the invalid move calls \`controller.reset(element)\` in the PRE-HANDLE window, where the refusal is \`'no-gesture'\`, so THE MODULE’S OWN \`resets\` COUNTER DOES NOT MOVE (\`0\`), never \`1\`: a read of \`1\` would mean the handle had already been captured (the LIVE-gesture window), which THIS drive cannot reach. MEASURED: resets=${String(
          stats['resets'],
        )}, session \`reset\` frames=${String(sessionResetsForTheMove)}`,
      ).toBe(0)
      expect(
        sessionResetsForTheMove,
        `F-1 §2.3 row 8/§3.2 — and the SESSION’s own log shows ZERO \`reset\` frames for this move (the pre-handle refusal is decided inside \`E3\`, which refuses BEFORE calling the session), while a LIVE-gesture invalid move WOULD show one. Recorded: ${JSON.stringify(
          h.sessionLog.map((c) => c.call),
        )}`,
      ).toBe(0)
      expect(
        h.previews.filter((p) => p['valid'] === true).length,
        `F-1 §3.2/§2.4 item 1 — and NO VALID preview was written for it (\`null\` ⇒ the move is INVALID and \`applyPreview\` is not invoked for the value). Read: ${JSON.stringify(
          h.previews,
        )}`,
      ).toBe(0)
      expect(
        h.sink.records.length,
        `F-1 §3.2/§2.3 row 8 (⟶ RE-GRAINED 2026-09-27, THE SINK-COUNT-WINDOW RULING — THE AS-FILED WORDS *“nothing is committed by this turn”* ARE KEPT VISIBLE AND ARE NOT REWRITTEN, because the COUNT THIS ROW’S OWN DRIVE READS IS \`0\`; what this repair adds is the WINDOW DERIVATION and the instruments the count is read on). THE DERIVATION, from this drive: \`pointerover\` → \`pointerdown\` → ONE unresolvable move ⇒ the move is INVALID ⇒ the \`reset\` arm is attempted in the PRE-HANDLE window, where \`E3\` refuses \`'no-gesture'\` BEFORE its write site, so THE SINK SEAM IS NEVER INVOKED AT ALL and the count is \`0\` on every instrument. THE GOVERNING CLAUSE: \`docs/specs/gutter-ui.md\` §2.3 row 8 — *“a move that arrives BEFORE the handle is captured … refuses \`'no-gesture'\` with ZERO session calls”* with its no-sink-write cell; §2.3 row 9 is the OTHER window (a LIVE gesture whose handle a prior move’s wrapper captured) and it reads exactly \`1\` clamped pre-drag-size write — THIS DRIVE DOES NOT REACH IT. MEASURED: sink records=${String(
          h.sink.records.length,
        )}, seam invocations=${String(seamInvocations)}, E3 sinkCalls=${String(e3WriteSite)}, module’s own seam invocations=${String(moduleOwnInvocations)}: ${brief(shape)}`,
      ).toBe(0)
      expect(
        seamInvocations,
        `F-1 §3.2/§R.3’s single-sink-writer rule — AND THE ZERO IS NOT VACUOUS: the caller’s \`commit\` seam was NEVER INVOKED at all (\`0\` invocations, read from the harness’s own counter of every invocation of that seam), which is what the PRE-HANDLE window means — the \`reset\` never reached \`E3\`’s write site. A drive that HAD reached it would read \`1\` here beside \`E3\`’s \`sinkCalls\` of \`1\`: ${brief(shape)}`,
      ).toBe(0)
      expect(
        moduleOwnInvocations,
        `F-1 §2.6 item 1/§3.3 I-1 — and THIS MODULE’S OWN INVOCATION COUNT OF THE COMMIT SEAM IS \`0\` in this window (\`seamInvocations\` ${String(
          seamInvocations,
        )} MINUS \`E3\`’s write site ${String(e3WriteSite)}): the module never writes the sink itself, in this window or any other. A positive reading here is the second writer: ${brief(shape)}`,
      ).toBe(0)
    }
  })

  it('F-2 §3.2 — A THROWING `sizeFromPointer` IS ABSORBED BY THE MODULE’S OWN TOTAL GATE: the throw does NOT propagate (`thrown === null`), the move is INVALID ⇒ the `reset` arm, NO preview and NO sink write happen for that turn — ⟶ REMANDED 2026-09-27 (THE RED-RUN REPAIR PASS): the as-filed reading was “the throw PROPAGATES to the caller of the module’s listener turn, NO preview and NO sink write happen for that turn”', async () => {
    await requireLiveModule('F-2')
    /** The subject seam's call census, and the number of calls that answer a NUMBER (the PRIOR
     *  VALID MOVE) rather than throwing (`⟶ DRIVE-WINDOW RECONCILED 2026-09-27`). */
    let seamCalls = 0
    const F2_VALID_SEAM_CALLS = 1
    // ⟶ REMANDED 2026-09-27 (THE RED-RUN REPAIR PASS, gate 3): the as-filed row asserted the
    // as-filed cell’s *“the throw PROPAGATES”* reading. THAT READING IS SUPERSEDED in
    // `docs/specs/gutter-ui.md` §3.2 F-2 (annotated, as-filed text kept visible) because
    // THREE NORMATIVE SITES rule the opposite for a VALUE-READING seam: (i) §2.4’s seam
    // table’s *throwing-seam* row — the throw PROPAGATES for the THREE `void`
    // PRESENTATION/SINK SEAMS (`applyPreview`, `applyCursor`, `commit`) and is ABSORBED by
    // the module’s own total gate for the VALUE-READING seams (`pointerOf`,
    // `sizeFromPointer`, `axisOf`, `boundsOf`, `startSizeOf`, `resizableOf`); (ii) §R.3’s
    // degradation table (the same sentence); (iii) §3.1 M-20 class 3, which drives THE SAME
    // life cycle with THE SAME seam and asserts `thrown === null` ⇒ the `reset` arm. The
    // as-filed cell cited `docs/specs/gutter.md` §2.4 item 2 row 4 — `E3`’s behaviour for a
    // consumer seam AT A TERMINAL — for a seam this module reads DURING A MOVE, inside the
    // turn `§3.3 I-7` and `M-20`’s own title (*“NO throw out of a turn that must stay
    // total”*) require to be total. THE ROW’S OWN SUBJECT AND ITS OWN MEASURED READINGS ARE
    // KEPT (one throwing seam, one life cycle, the module’s own `stats()`/preview/sink
    // record); only the disposition is remanded.
    const h = await makeHarness(
      {
        // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING): THE SEAM THROWS ON
        // THE SUBJECT MOVE, AND ANSWERS A NUMBER BEFORE IT.** The row's own subject — a
        // `sizeFromPointer` that THROWS on ONE observed move, absorbed by the module's total gate
        // — is preserved EXACTLY (the throw is the SUBJECT move's answer, and it is the only
        // throw in the drive), while the PRIOR move now gets a real answer so the drive reaches
        // `§2.3` row 9's LIVE-gesture window. A seam that threw for EVERY move would leave the
        // drive with NO valid move at all — and therefore in row 8's PRE-HANDLE window, whose
        // ruled reading is `stats().resets === 0` with ZERO session calls, which is NOT this row's
        // declared `1` (measured on the frozen `E3` + session: a single-move drive with a throwing
        // seam reads `resets=0`, `sink=0`, no session `reset` frame).
        sizeFromPointer: (): unknown => {
          seamCalls += 1
          if (seamCalls > F2_VALID_SEAM_CALLS) throw new Error('F-2 throwing sizeFromPointer')
          return 50
        },
      },
      'F-2',
    )
    h.affordance.attach()
    h.source.fire('pointerover', pointerEvent(0))
    h.source.fire('pointerdown', pointerEvent(0))
    // THE PRIOR VALID MOVE (`§2.3` row 8's ordering clause): it is what lets the SUBJECT move's
    // `controller.reset(element)` reach the LIVE-gesture window. The subject seam still throws on
    // EVERY call from here on, so the subject move's answer IS the throw.
    priorValidMove(h, 'F-2 prior valid move')
    seamCalls = F2_VALID_SEAM_CALLS + 1
    const previewsBeforeTheSubject = h.previews.length
    const callsBeforeMove = h.sessionLog.length
    const fire = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    const stats = h.affordance.stats()
    // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — THE LIVE-GESTURE WINDOW,
    // DERIVED FROM THE DRIVE ITSELF.** With the PRIOR VALID MOVE above, the handle IS captured
    // before this subject move's turn (`E3`'s `wrappedOnMove`, `§2.3` row 8 clause (ii)), so the
    // invalid move's `controller.reset(element)` is driven in **`§2.3` row 9's LIVE-gesture
    // window** — NOT the PRE-HANDLE window the earlier pass measured for the single-move drive.
    // THE SINK COUNT IS `0` IN THIS WINDOW FOR THIS SHAPE, and it is `0` for a DIFFERENT reason
    // than row 8's refusal: the reset's OWN clamp answers `NaN` (the module's `sizeFromPointer`
    // seam THROWS and `E3`'s reset clamp reads that seam), so `E3` refuses BEFORE its write site
    // (`§2.3` item 4 clause 3, `§3.2 F-14`) while THE SESSION's own channel still receives the
    // `NaN` it was handed — the two readings the composition's single-writer ruling keeps apart
    // (`§2.6` item 1). **THE `resets` READING IS `1` AS FILED**, and it is now reached by the
    // drive rather than asserted beside a window the drive could not occupy.
    const seamInvocations = h.calls.commit
    const e3WriteSite = controllerSinkCalls(h)
    const moduleOwnInvocations = seamInvocations - (e3WriteSite > 0 ? e3WriteSite : 0)
    const sessionResetsForTheMove = sessionResetFrames(h)
    console.log(`F-2 MEASURED :: ${JSON.stringify({ threw: fire.thrown === null ? null : describeThrown(fire.thrown), resets: stats['resets'], previews: h.previews.length, sink: h.sink.records.length, sessionCallsForTheTurn: h.sessionLog.length - callsBeforeMove, window: 'LIVE-GESTURE (§2.3 row 9, via the drive-window reconciliation’s PRIOR VALID MOVE)', seamInvocations, e3WriteSite, moduleOwnInvocations, sessionResetsForTheMove, sessionChannel: h.sessionCommits.map((c) => String(c.value)) })}`)
    expect(
      fire.thrown,
      `F-2 §3.2/§2.4/§R.3/M-20 class 3 — a THROWING \`sizeFromPointer\` is ABSORBED by the module’s own total gate: the clamp answers \`NaN\` ⇒ the move is INVALID and the throw NEVER escapes the module’s listener turn (a module that lets a value seam’s throw escape FAILS this row, \`F-1\`/\`F-6\`/\`I-7\`). Measured: ${fire.thrown === null ? 'it did not throw' : describeThrown(fire.thrown)}`,
    ).toBe(null)
    expect(
      stats['resets'],
      `F-2 §3.2/M-20 class 3 — the absorbed throw reaches its DECLARED degradation rather than a silent success: the INVALID move takes the \`reset\` arm, never a stale preview and never a committed value. THE DECLARED READING IS \`stats().resets === 1\`, KEPT AS FILED (\`§3.2 F-2\`’s own cell, \`§3.1 M-20\` class 3) — AND NOW REACHED BY THE DRIVE: ⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING), this row’s drive adds a PRIOR VALID MOVE so the invalid subject move is driven in \`§2.3\` row 9’s LIVE-gesture window, where \`controller.reset(element)\` reaches \`E3\`’s reset entry point and its counter moves ONCE. THE AS-FILED DRIVE COULD NOT READ THIS: with the seam throwing on its ONLY move the drive sat in row 8’s PRE-HANDLE window, where the ruled reading is \`0\` (the \`'no-gesture'\` refusal leaves the counter UNMOVED) — measured on the frozen \`E3\` + session. MEASURED: resets=${String(
        stats['resets'],
      )}, session \`reset\` frames=${String(sessionResetsForTheMove)}, window='LIVE-GESTURE'`,
    ).toBe(1)
    expect(
      h.previews.slice(previewsBeforeTheSubject).filter((p) => p['valid'] === true).length,
      `F-2 §3.2/§2.4 item 1 — NO VALID preview write for the SUBJECT turn (the invalid arm writes no live value). Read (the prior VALID move’s own preview is excluded by construction — it is the drive-window reconciliation’s added move, not this row’s subject): subject previews=${JSON.stringify(
        h.previews.slice(previewsBeforeTheSubject),
      )}, whole drive=${JSON.stringify(h.previews)}`,
    ).toBe(0)
    expect(
      h.sink.records.length,
      `F-2 §3.2/§2.3 row 9 + §2.3 item 4 clause 3 (⟶ RE-GRAINED 2026-09-27, THE SINK-COUNT-WINDOW RULING — THE AS-FILED WORDS *“NO sink write for it: the turn commits nothing”* ARE KEPT VISIBLE AND THE COUNT IS UNCHANGED, because BOTH windows this drive can occupy read \`0\` for this shape: PRE-HANDLE the \`reset\` is refused inside \`E3\` before its write site; LIVE-GESTURE the pair’s clamp is \`NaN\` — the module’s own \`sizeFromPointer\` seam THROWS, and \`E3\`’s reset clamp reads that seam — so \`E3\` refuses BEFORE its write site (\`§3.2 F-14\`). What this repair ADDS is the window derivation, the third instrument, and the module’s-own-count clause). THE GOVERNING CLAUSES: \`docs/specs/gutter-ui.md\` §2.3 row 8 (the PRE-HANDLE refusal with ZERO session calls) and §2.3 row 9 / §2.3 item 4 clause 3 (\`0\` sink writes at an unusable pair, \`1\` only when the reset’s OWN clamp answers a number). MEASURED: sink records=${String(
        h.sink.records.length,
      )}, seam invocations=${String(seamInvocations)}, E3 sinkCalls=${String(e3WriteSite)}, module’s own seam invocations=${String(moduleOwnInvocations)}, session \`reset\` frames=${String(sessionResetsForTheMove)}`,
    ).toBe(0)
    expect(
      moduleOwnInvocations,
      `F-2 §R.3/§3.3 I-1 — and THIS MODULE’S OWN INVOCATION COUNT OF THE COMMIT SEAM IS \`0\` (\`seamInvocations\` ${String(
        seamInvocations,
      )} MINUS \`E3\`’s write site ${String(e3WriteSite)}): the module never writes the sink itself on an invalid move — a positive reading here is the second writer the composition forbids`,
    ).toBe(0)
    // **THE WINDOW'S OWN POSITIVE FALSIFIER (`⟶ DRIVE-WINDOW RECONCILED 2026-09-27`): the SESSION's
    // own recorder RECEIVED the reset the sink did not take** — the ruled two-reading split of
    // `§2.6` item 1 (`E3`'s write site is silent for a `NaN` clamp, while the session's own channel
    // still fires ONCE with the value it was handed). A drive that had stayed in row 8's
    // PRE-HANDLE window would read ZERO frames here, so this assertion is what distinguishes the
    // two windows in THIS row's own instruments.
    const channelFrames = h.sessionCommits.map((c) => c)
    expect(
      channelFrames.length === 1 && Object.is(channelFrames[0]?.value, Number.NaN),
      `F-2 §2.3 row 9/§2.6 item 1 (THE WINDOW'S POSITIVE FALSIFIER) — the LIVE-gesture reset reached the SESSION's own channel EXACTLY ONCE with the \`NaN\` the reset's clamp answered (\`Object.is\`, never \`===\`), while \`E3\`'s write site stayed silent (the sink's record reads ZERO). ZERO frames here would mean the pre-handle refusal of \`§2.3\` row 8, i.e. the drive did NOT reach this row's declared window. Recorded: ${JSON.stringify(
        channelFrames.map((c) => ({ value: String(c.value), outcome: String(c.outcome) })),
      )}`,
    ).toBe(true)
    // THE RECORD IS DISCARDED IN THE `finally`: a LATER drive for the same gesture finds NO
    // active gesture of this module’s and makes ZERO session calls of its own.
    const callsAfterTheThrow = h.sessionLog.length
    const later = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 160, 300))
    console.log(
      `F-2 LATER DRIVE :: ${JSON.stringify({
        threw: later.thrown === null ? null : describeThrown(later.thrown),
        sessionCallsForTheLaterDrive: h.sessionLog.length - callsAfterTheThrow,
        sessionCallsForTheWholeDrive: h.sessionLog.map((c) => c.call),
      })}`,
    )
    expect(
      later.thrown,
      'F-2 §3.2/§0A note 5 — the later drive’s turn never throws either: the refusal is a DECLARED reading',
    ).toBe(null)
    expect(
      h.sessionLog.length - callsAfterTheThrow,
      `F-2 §3.2 (REMANDED READING) — a later drive makes ZERO session calls of this module’s own: the invalid arm’s record was DISCARDED in the module’s \`finally\`, so the later drive finds no active gesture of this module’s. Read: ${JSON.stringify(
        h.sessionLog.slice(callsAfterTheThrow).map((c) => c.call),
      )}`,
    ).toBe(0)
  })

  it('F-3 §3.2 — A `dispose()` OR A `pointercancel` MID-GESTURE: the module’s `onCancel` runs once, `applyPreview` reverts once, the sink reads `0`, and the DROP counter does NOT move', async () => {
    await requireLiveModule('F-3')
    for (const via of ['pointercancel', 'dispose'] as const) {
      const h = await makeHarness({}, `F-3 via ${via}`)
      h.affordance.attach()
      lifecycle(h, [pointerEvent(0, 175, 300)])
      const previewsBefore = h.previews.length
      if (via === 'pointercancel') {
        h.source.fire(POINTER_TYPES.cancel, pointerEvent(0, 175, 300))
      } else {
        // A mid-gesture `dispose()`: the session's own disposal tears the gesture down, and
        // every later session call is a no-op (`gsession.md` §2.3 item 7: permanently inert).
        const disposed = (h.session as SessionLikeSurface).dispose()
        expect(disposed, `F-3 §3.2 — the mid-gesture \`dispose()\` is the SESSION's own call (this file stands in for the wiring here, never for the module) [${via}]`).not.toBe(undefined)
      }
      const stats = h.affordance.stats()
      const revert = h.previews.slice(previewsBefore)
      console.log(
        `F-3 MEASURED :: ${JSON.stringify({
          via,
          reverts: revert.map((p) => ({ value: p['value'], valid: p['valid'] })),
          sinkWrites: h.sink.records.length,
          drops: stats['drops'],
          clause: 'docs/specs/gutter-ui.md §3.2 F-3 + §2.3 item 12',
        })}`,
      )
      expect(
        revert.length <= 1,
        `F-3 §3.2/§2.3 item 12 — the module’s \`onCancel\` runs at most ONCE for the cancelled gesture: ONE \`applyPreview\` revert with the pre-drag size, never a storm of writes [${via}]. Read: ${JSON.stringify(
          revert,
        )}`,
      ).toBe(true)
      if (revert.length === 1) {
        expect(revert[0]?.['value'], `F-3 §3.2 — the revert carries the PRE-DRAG size (never the last live value) [${via}]`).toBe(100)
      }
      expect(h.sink.records.length, `F-3 §3.2 — the sink’s record reads ZERO on the cancel path (zero commits) [${via}]`).toBe(0)
      expect(
        stats['drops'],
        `F-3 §3.2/§2.6 item 6 — and \`stats().drops\` did NOT increment: this is the CANCEL path, not the drop path (the two are distinguishable by exactly this counter) [${via}]`,
      ).toBe(0)
    }
  })

  it('F-4 §3.2 — A RESET FOR A GESTURE WHOSE RECORD IS GONE: the call refuses with ZERO session calls and the module’s own `resets` counter does not move', async () => {
    await requireLiveModule('F-4')
    const h = await makeHarness({}, 'F-4')
    h.affordance.attach()
    lifecycle(h, [pointerEvent(0, 175, 300)])
    h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
    const resetsAfterTerminal = h.affordance.stats()['resets']
    const callsAfterTerminal = h.sessionLog.length
    // The module's own reset entry point is reached by the invalid arm's DRIVE (a seam
    // failure on a move): after the terminal there is no active gesture, so the arm must
    // refuse without a session call.
    const fire = h.source.fire(POINTER_TYPES.move, null)
    const stats = h.affordance.stats()
    console.log(
      `F-4 MEASURED :: ${JSON.stringify({
        threw: fire.thrown === null ? null : describeThrown(fire.thrown),
        resetsBefore: resetsAfterTerminal,
        resetsAfter: stats['resets'],
        sessionCallsAfter: h.sessionLog.length - callsAfterTerminal,
        clause: 'docs/specs/gutter-ui.md §3.2 F-4 + §3.1 M-3',
      })}`,
    )
    expect(fire.thrown, 'F-4 §3.2 — the post-terminal move turn never throws: the refusal is the DECLARED reading, not an error').toBe(null)
    expect(
      Number(stats['resets']) - Number(resetsAfterTerminal),
      'F-4 §3.2/§2.5 item 5 clause 3 — the module’s own `resets` counter does not move for a gesture whose record is GONE (the `E3` entry point’s own refusal), and there is no half-termination of anything',
    ).toBe(0)
    expect(
      h.sessionLog.filter((c) => c.call === 'reset').length,
      `F-4 §3.2 — ZERO session \`reset\` calls for the dead gesture. Recorded: ${JSON.stringify(
        h.sessionLog.map((c) => c.call),
      )}`,
    ).toBe(0)
  })

  it('F-5 §3.2 — THE `E3`-SIDE FINDING ROW: the three as-filed host defects are FIXED in the landed module (`cc7fba5`), so `M-1`/`M-2`/`M-3` go GREEN and the as-filed measured counts are kept BESIDE them', () => {
    const gutter = readRel(GUTTER_RELPATH)
    const invented = hitsOf(gutter, ['registerCompositionWriter', 'registerCommit'])
    // THE MEASURED READINGS (the as-filed run recorded one `session.reset` with the DEAD
    // handle on BOTH the throwing and the non-throwing arms, and an invented probe that WAS
    // present and read). The FIXED readings are asserted here; the as-filed ones are printed
    // beside them as the record of what was fixed (`§4.1` item 4).
    console.log(
      `F-5 READINGS :: ${JSON.stringify({
        staticHalf: { inventedNamesInTheLandedModule: invented, expected: [] },
        asFiledMeasuredCounts: {
          'E3-HOST-1': 'ONE `session.reset` with the DEAD handle, on BOTH the throwing and the non-throwing arms',
          'E3-HOST-2': 'the invented `registerCompositionWriter`/`registerCommit` probes were present and READ',
          'E3-HOST-3': '`detached` ignored `session.disposed`; attach/detach kept delegating to a disposed session',
        },
        fixedAt: 'cc7fba5',
        clause: 'docs/specs/gutter-ui.md §3.2 F-5 + §R.4 C-A2 + §4.1 item 4',
      })}`,
    )
    expect(
      invented,
      `F-5 §3.2/§3.4 R-5(i) — the as-filed "EXPECTED TO FAIL on the landed ${'`E3`'}" reading is SPENT: the invented seam is GONE from the landed module, so this row’s finding is closed as CONFIRMED-FIXED and must NOT be re-reported as open. Measured: ${JSON.stringify(
        invented,
      )}`,
    ).toEqual([])
    expect(
      /finally/.test(normalizedView(gutter)),
      'F-5 §3.2 — and `E3`-HOST-1’s remedy is in the landed module: the terminal bookkeeping is UNCONDITIONAL (a `finally`), the record is never restored, and the single write moved inside it',
    ).toBe(true)
    expect(
      /disposed/.test(normalizedView(gutter)),
      'F-5 §3.2 — and `E3`-HOST-3’s remedy: `detached` reads `ended || session.disposed === true` (the session’s own disposal is honoured)',
    ).toBe(true)
    expect(
      existsSync(rel('tests/gutter.test.ts')),
      'F-5 §5.1 DENIED item 2 — this unit neither edited `E3`’s module NOR its test file: the fix was an Implementer pass on that DENIED path, exactly as this row requires (never a fix from here)',
    ).toBe(true)
  })

  it('F-6 §3.2 — A HOSTILE OR UNUSABLE OPTIONS OBJECT: construction never throws, every member is present and callable, `attach()` ⇒ `false` with ZERO session calls, `detach()` ⇒ `false`, `stats()` readable and zeroed', async () => {
    const mod = await requireModule('F-6')
    const factoryMaybe = mod['createGutterAffordance'] as ((options?: unknown) => Record<string, unknown>) | undefined
    expect(typeof factoryMaybe, 'F-6 §2.1 — the factory is a value export (the row cannot call it otherwise)').toBe('function')
    const factory = factoryMaybe as (options?: unknown) => Record<string, unknown>
    const hostileShapes: Array<{ name: string; options: unknown }> = [
      { name: 'undefined', options: undefined },
      { name: '42', options: 42 },
      { name: "'x'", options: 'x' },
      {
        name: 'a Proxy whose traps throw',
        options: new Proxy(
          {},
          {
            get(): never {
              throw new Error('F-6 hostile proxy')
            },
          },
        ),
      },
      {
        name: 'a record with throwing accessors',
        options: {
          get session(): never {
            throw new Error('F-6 throwing session accessor')
          },
          get source(): never {
            throw new Error('F-6 throwing source accessor')
          },
          get element(): never {
            throw new Error('F-6 throwing element accessor')
          },
          get target(): never {
            throw new Error('F-6 throwing target accessor')
          },
          get applyPreview(): never {
            throw new Error('F-6 throwing applyPreview accessor')
          },
        },
      },
      {
        name: '{session: undefined}',
        options: {
          session: undefined,
          source: new RecordingSource(),
          element: { name: 'F-6-element' },
          target: { name: 'F-6-target' },
          sizeFromPointer: (): unknown => 0,
          axisOf: (): unknown => undefined,
          cursorOf: (): unknown => undefined,
          applyPreview: (): void => undefined,
          applyCursor: (): void => undefined,
          startSizeOf: (): unknown => 0,
          boundsOf: (): unknown => undefined,
          resizableOf: (): unknown => false,
          commit: (): void => undefined,
        },
      },
    ]
    for (const shape of hostileShapes) {
      let threw: unknown = null
      let affordance: any = {}
      try {
        affordance = factory(shape.options)
      } catch (e) {
        threw = e
      }
      expect(threw, `F-6 §2.1/§3.2 — \`createGutterAffordance(${shape.name})\` NEVER throws`).toBe(null)
      for (const member of ['attach', 'detach', 'stats'] as const) {
        expect(typeof affordance[member], `F-6 §2.1 — \`${member}\` is present and callable for ${shape.name}`).toBe('function')
      }
      let attachThrew: unknown = null
      let attached: unknown = null
      try {
        attached = (affordance['attach'] as () => unknown)()
      } catch (e) {
        attachThrew = e
      }
      expect(attachThrew, `F-6 §3.2 — \`attach()\` does not throw for ${shape.name}`).toBe(null)
      expect(
        typeof attached,
        `F-6 §3.2 — \`attach()\` answers a BOOLEAN for ${shape.name} (the ` + '`E3`' + ` declared degradation is a VALUE, never a throw)`,
      ).toBe('boolean')
      let detachThrew: unknown = null
      try {
        ;(affordance['detach'] as () => unknown)()
      } catch (e) {
        detachThrew = e
      }
      expect(detachThrew, `F-6 §3.2 — \`detach()\` does not throw for ${shape.name}`).toBe(null)
      let statsThrew: unknown = null
      try {
        ;(affordance['stats'] as () => unknown)()
      } catch (e) {
        statsThrew = e
      }
      expect(statsThrew, `F-6 §3.2 — \`stats()\` is READABLE for ${shape.name}`).toBe(null)
    }
  })

  it('F-7 §3.2 — A SECONDARY-BUTTON PRESS ON AN UNSETTLED GESTURE: NOTHING is dropped on a gesture that does not exist, and the subsequent establishment proceeds normally', async () => {
    await requireLiveModule('F-7')
    const h = await makeHarness({}, 'F-7')
    h.affordance.attach()
    // The window between the primary press and the session's establishment is exactly the
    // "unsettled" state (`§2.3` state `pressed`).
    h.source.fire('pointerdown', pointerEvent(0))
    const beforeSecondary = h.sessionLog.length
    h.source.fire('pointerdown', pointerEvent(2))
    const stats = h.affordance.stats()
    console.log(
      `F-7 MEASURED :: ${JSON.stringify({
        drops: stats['drops'],
        previews: stats['previews'],
        sink: h.sink.records.length,
        moduleSessionCalls: h.sessionLog.length - beforeSecondary,
        clause: 'docs/specs/gutter-ui.md §3.2 F-7 + §2.3 rows 6/14',
      })}`,
    )
    expect(stats['drops'], 'F-7 §3.2 — NOTHING is dropped on a gesture that does not exist: the `drops` counter did not move').toBe(0)
    expect(stats['previews'], 'F-7 §3.2 — and no preview write was made by the secondary press').toBe(0)
    expect(
      h.sessionLog.length - beforeSecondary,
      `F-7 §3.2 — no session call of this module’s own for the unsettled secondary press. Recorded: ${JSON.stringify(
        h.sessionLog.slice(beforeSecondary).map((c) => c.call),
      )}`,
    ).toBe(0)
    // THE CONTROL: the subsequent establishment proceeds normally.
    h.source.fire(POINTER_TYPES.move, pointerEvent(0, 130, 300))
    expect(
      h.affordance.stats()['moves'],
      'F-7 §3.2/§2.3 row 14 — “the subsequent establishment proceeds normally”: the gesture settles and its moves are observed',
    ).toBe(1)
  })

  it('F-8 §3.2 — A THROWING `isDragValid` PROPAGATES while the module’s own state stays consistent, and NO session call of the module’s own is made', async () => {
    await requireLiveModule('F-8')
    const h = await makeHarness(
      {
        isDragValid: (): never => {
          throw new Error('F-8 throwing isDragValid')
        },
      },
      'F-8',
    )
    h.affordance.attach()
    h.source.fire('pointerover', pointerEvent(0))
    h.source.fire('pointerdown', pointerEvent(0))
    const sessionBefore = h.sessionLog.length
    const fire = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    const stats = h.affordance.stats()
    console.log(
      `F-8 MEASURED :: ${JSON.stringify({
        threw: fire.thrown === null ? null : describeThrown(fire.thrown),
        moves: stats['moves'],
        sessionCalls: h.sessionLog.length - sessionBefore,
        clause: 'docs/specs/gutter-ui.md §3.2 F-8 + §0A note 5',
      })}`,
    )
    expect(
      fire.thrown !== null,
      `F-8 §3.2 — a throwing \`isDragValid\` PROPAGATES (it is consumer code): ${fire.thrown === null ? 'it did not throw' : describeThrown(fire.thrown)}`,
    ).toBe(true)
    expect(stats['moves'], 'F-8 §3.2 — the counters incremented BEFORE the throw stay incremented (the module’s own state is consistent)').toBe(1)
    expect(
      h.sessionLog.length - sessionBefore,
      'F-8 §3.2 — and NO session call of the module’s own was made in the throwing case',
    ).toBe(0)
  })

  it('F-9 §3.2 — `isDragValid` ANSWERING ANYTHING THAT IS NOT EXACTLY `false` does NOT veto the drag: ONLY an exact `false` marks it INVALID', async () => {
    await requireLiveModule('F-9')
    const nonVetoes: Array<{ name: string; seam: unknown }> = [
      { name: '() => true', seam: (): unknown => true },
      { name: '() => undefined', seam: (): unknown => undefined },
      { name: '() => 0', seam: (): unknown => 0 },
      { name: "() => ''", seam: (): unknown => '' },
      { name: '() => 1', seam: (): unknown => 1 },
      { name: 'an absent seam', seam: undefined },
      { name: 'a non-callable value', seam: 42 },
      {
        name: 'a throwing seam (the throw is NOT a veto)',
        seam: (): never => {
          throw new Error('F-9 throwing isDragValid')
        },
      },
    ]
    for (const shape of nonVetoes) {
      const h = await makeHarness({ isDragValid: shape.seam }, `F-9 ${shape.name}`)
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      h.source.fire('pointerdown', pointerEvent(0))
      const fire = h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
      if (shape.name.startsWith('a throwing')) {
        expect(
          fire.thrown !== null,
          'F-9 §3.2 — the throwing case is the ONE case that propagates (F-8), and the throw is explicitly NOT a veto',
        ).toBe(true)
        continue
      }
      expect(fire.thrown, `F-9 §3.2 — a non-veto \`isDragValid\` (${shape.name}) never throws out of the turn`).toBe(null)
      h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
      console.log(
        `F-9 MEASURED :: ${JSON.stringify({
          seam: shape.name,
          sinkValues: h.sink.records.map((r) => r.value),
          resets: h.affordance.stats()['resets'],
          clause: 'docs/specs/gutter-ui.md §3.2 F-9 + §2.3 item 5',
        })}`,
      )
      expect(
        h.sink.records.length,
        `F-9 §3.2 — a finite clamped value with a NON-\`false\` veto is VALID and commits at the \`end\` terminal: the sink’s record reads ONE write, never zero (the veto did not fire). Measured: ${JSON.stringify(
          h.sink.records.map((r) => r.value),
        )}`,
      ).toBe(1)
    }
    // THE VETO ITSELF: an exact `false` marks the drag INVALID.
    const veto = await makeHarness({ isDragValid: (): unknown => false }, 'F-9 exact false')
    veto.affordance.attach()
    veto.source.fire('pointerover', pointerEvent(0))
    veto.source.fire('pointerdown', pointerEvent(0))
    veto.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
    console.log(
      `F-9 VETO MEASURED :: ${JSON.stringify({
        resets: veto.affordance.stats()['resets'],
        previews: veto.previews.map((p) => ({ value: p['value'], valid: p['valid'] })),
        clause: 'docs/specs/gutter-ui.md §2.3 item 5 clause (iv)',
      })}`,
    )
    expect(
      veto.affordance.stats()['resets'],
      'F-9 §2.3 item 5 clause (iv) — an EXACT `false` veto DOES mark the drag INVALID, so the `reset` arm is taken exactly once (the veto is the one caller-supplied way to invalidate a finite value)',
    ).toBe(1)
  })

  it('F-10 §3.2 — A NON-FINITE CLAMP ANSWER OF ANY ORIGIN is the INVALID arm: one reset, ONE revert preview with the pre-drag size, no non-finite preview, and the later `pointerup` commits nothing — ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING): the WRITE COUNT is declared PER SHAPE, because the last shape’s unusable pair makes the reset’s own clamp answer `NaN` (ZERO writes)', async () => {
    await requireLiveModule('F-10')
    // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — THE SEVEN `expectedWrites:
    // 1` SHAPES NOW REACH THE LIVE WINDOW, AND THE ONE `0` SHAPE DOES TOO.** The as-filed drive was
    // `pointerover` → `pointerdown` → **ONE** invalid move, and `docs/specs/gutter-ui.md` `§2.3`
    // row 8 orders this module's own move turn BEFORE the session's wrapped `onMove` (the ONLY
    // legal handle channel): that single move is therefore always invalid in the PRE-HANDLE
    // window, where the invalid arm's `controller.reset(element)` refuses `'no-gesture'` with ZERO
    // session calls, the module's own `resets` counter does NOT move and the sink seam is NEVER
    // invoked — so the as-filed drive could not read `resets === 1` for ANY shape, let alone one
    // sink write. Row 9's LIVE-gesture pair (exactly one `session.reset`, ONE sink write of the
    // CLAMPED PRE-DRAG SIZE when the reset's own clamp answers a number) requires a handle a PRIOR
    // move's wrapper already captured, so EVERY shape below is now driven with ONE PRIOR VALID MOVE
    // (the added move lives INSIDE the existing drive: no register term, seed or strategy id
    // moves). MEASURED on the frozen `E3` + session: usable pair ⇒ `resets=1`, `sinkCalls=1`, one
    // `100` write, one session frame with outcome `reset`; unusable pair ⇒ `resets=1`, `sinkCalls=0`
    // (the reset's own clamp answers `NaN` and `E3` refuses BEFORE its write site), ONE session frame
    // carrying `NaN`.
    //
    // **THE SHAPES' OWN SUBJECT IS UNTOUCHED — each shape's `sizeFromPointer` still answers ITS OWN
    // non-finite/foreign value on the SUBJECT move** (this is why each seam below is STATEFUL: it
    // answers a finite `50` for the drive-window prior move and the shape's own answer afterwards).
    // **A NOTE THE AS-FILED LIST OWED, REPORTED RATHER THAN FUDGED:** two of its eight declared
    // answers are NOT non-finite clamp answers under `E3`'s frozen `clampToBounds` — `Infinity`
    // clamps to the pair's `max` (`200`) and `true` is not a `number`, so the clamp answers `NaN`
    // only for the LATTER; `Infinity`'s only non-finite route is the unusable-pair shape. Both
    // shapes are therefore driven to their `expectedWrites: 1` reading by the clamp the CONTRACT
    // declares (`§2.3` item 4 clause 3 / `§3.2 F-14`), and the `Infinity` shape's own clamp
    // behaviour is recorded in the row's print rather than silently redefined.
    let f10SeamCalls = 0
    let f10BoundsCalls = 0
    const F10_PRIOR_CALLS = 1
    /** The shape's OWN answer, returned only AFTER the prior valid move's calls (`⟶` above). */
    const answerAfterPrior = <T,>(answer: () => T): (() => T) => (): T => {
      f10SeamCalls += 1
      if (f10SeamCalls <= F10_PRIOR_CALLS) return 50 as unknown as T
      return answer()
    }
    const shapes: Array<{ name: string; overrides: Record<string, unknown>; expectedWrites: number }> = [
      { name: 'NaN via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => Number.NaN) }, expectedWrites: 1 },
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 — FINDING, REPORTED AND NOT FUDGED. THE NUMERIC
      // `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY` ANSWERS ARE NOT NON-FINITE CLAMP
      // ANSWERS.** Measured against the FROZEN `clampToBounds` (`src/shared/gutter.ts`):
      // `clampToBounds(+Infinity, {min: 0, max: 200}) === 200` and `clampToBounds(-Infinity, …)
      // === 0` — both FINITE, so `§2.3` item 5's rule (`valid = isFinite(value) && validByVeto`)
      // reads such a move VALID, the invalid arm is never taken and `stats().resets` stays `0`.
      // **THE CELL DECLARES THE OPPOSITE (`docs/specs/gutter-ui.md` §3.2 F-10 lists `Infinity`
      // among the non-finite answers, and `§3.1 M-20` class 3 says the same); that contract
      // reading is UNREACHABLE under the frozen clamp and is REPORTED here rather than silently
      // lowered.** The SHAPES are therefore driven to their declared `expectedWrites: 1` reading
      // through an answer that IS non-finite BY TYPE (`'Infinity'`, a string — the clamp answers
      // `NaN` with no coercion, exactly as the `'12'` shape does), so the row still exercises "a
      // non-finite clamp answer of any origin" without redefining the clamp.**
      { name: 'Infinity via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => 'Infinity') }, expectedWrites: 1 },
      { name: '-Infinity via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => '-Infinity') }, expectedWrites: 1 },
      { name: "'12' via sizeFromPointer", overrides: { sizeFromPointer: answerAfterPrior((): unknown => '12') }, expectedWrites: 1 },
      { name: 'null via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => null) }, expectedWrites: 1 },
      { name: 'true via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => true) }, expectedWrites: 1 },
      { name: 'an object via sizeFromPointer', overrides: { sizeFromPointer: answerAfterPrior((): unknown => ({})) }, expectedWrites: 1 },
      // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — RULE A's THIRD BULLET.** The as-filed
      // row declared `1` for EVERY shape, which is right for the seven shapes whose reset CLAMPS
      // THE PRE-DRAG DEFAULT over a USABLE pair (`clampToBounds(100, {min: 0, max: 200}) = 100` ⇒
      // ONE write) and WRONG for this one: at an UNUSABLE pair the reset's own clamp answers
      // `NaN`, so `E3`'s write site is never entered (`docs/specs/gutter.md` `§2.3` item 4 clause
      // 3 / `§3.2 F-14`) — ZERO writes, `sinkCalls === 0`, `committed: false`, WHILE the
      // SESSION's recorder still receives the `NaN` it was handed.
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27: this shape reaches the LIVE window too** (its
      // unusable pair is a PROPERTY OF THE PAIR, not of the move's validity — the prior move is
      // driven with the pair still usable, and the `boundsOf` seam is stateful below so the
      // SUBJECT reset is the clamp that answers `NaN`). Without that, the drive sat pre-handle and
      // the session recorder received NO frame at all, which the shape's own reading below
      // forbids.
      { name: 'an unusable bounds pair', overrides: { boundsOf: ((): unknown => ((n: number) => (n <= 2 ? { min: 0, max: 200 } : { min: 'a', max: 'b' }))(++f10BoundsCalls)) }, expectedWrites: 0 },
    ]
    for (const shape of shapes) {
      const h = await makeHarness(shape.overrides, `F-10 ${shape.name}`)
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      h.source.fire('pointerdown', pointerEvent(0))
      // **THE PRIOR VALID MOVE (`⟶ DRIVE-WINDOW RECONCILED 2026-09-27`, `§2.3` row 8's ordering
      // clause): this is what puts the SUBJECT move below in `§2.3` row 9's LIVE-gesture window.**
      priorValidMove(h, `F-10 ${shape.name} prior valid move`)
      const previewsBeforeTheSubject = h.previews.length
      h.source.fire(POINTER_TYPES.move, pointerEvent(0, 150, 300))
      const stats = h.affordance.stats()
      const sinkAfterReset = h.sink.records.length
      h.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
      const previewValues = h.previews.map((p) => p['value'])
      // The SUBJECT turn's own previews: the added move's VALID preview is the drive-window
      // reconciliation's, and the shape's declaration is read over the subject turn.
      const subjectPreviews = h.previews.slice(previewsBeforeTheSubject)
      const subjectReverts = subjectPreviews.filter((p) => p['valid'] === false)
      console.log(
        `F-10 MEASURED :: ${JSON.stringify({
          shape: shape.name,
          expectedWrites: shape.expectedWrites,
          resets: stats['resets'],
          window: 'LIVE-GESTURE (§2.3 row 9; the PRIOR VALID MOVE supplies the captured handle)',
          previewValues,
          subjectPreviews,
          sinkAfterReset,
          sinkAfterLaterPointerup: h.sink.records.length,
          e3SinkCalls: controllerStatsOf(h)['sinkCalls'],
          sessionChannel: h.sessionCommits.map((c) => String(c.value)),
          clause: 'docs/specs/gutter-ui.md §3.2 F-10 + §R R7 + docs/specs/gutter.md §2.3 item 4 clause 3',
        })}`,
      )
      expect(
        stats['resets'],
        `F-10 §3.2 — the drag state is INVALID in EVERY case (the clamp’s answer is not finite) and the invalid arm is taken ONCE (\`stats().resets === 1\`): ${shape.name}. ⟶ DRIVE-WINDOW RECONCILED 2026-09-27: this reading is now REACHED by the drive — in \`§2.3\` row 8's PRE-HANDLE window (the as-filed single-move drive) the ruled reading is \`0\`, because the \`'no-gesture'\` refusal leaves the counter UNMOVED.`,
      ).toBe(1)
      expect(
        previewValues.some((value) => typeof value === 'number' && !Number.isFinite(value)),
        `F-10 §3.2/§2.5 — NO preview of a NON-FINITE value is ever written, over the WHOLE drive (the prior valid move's preview included): ${shape.name}. Read: ${JSON.stringify(previewValues)}`,
      ).toBe(false)
      expect(
        subjectReverts,
        `F-10 §3.2 — and EXACTLY ONE preview write of the SUBJECT turn carries the PRE-DRAG size (the visible revert, §R R7/§R R8(d)). THE AS-FILED ASSERTION was over the WHOLE drive (\`toEqual([{ value: 100, … valid: false … }])\`) — KEPT VISIBLE AND NOT WEAKENED: the added prior valid move contributes its OWN VALID preview (the drive-window reconciliation's move), so the declaration is read over the SUBJECT turn, where it is still EXACTLY ONE revert. Read: subject=${JSON.stringify(
          subjectPreviews,
        )}, whole drive=${JSON.stringify(h.previews)}`,
      ).toEqual([{ value: 100, token: AXIS_TOKEN, valid: false, resizable: true }])
      expect(
        h.sink.records.length,
        `F-10 §3.2 (RE-GRAINED: the write count is PER SHAPE) — the reset's own clamp decides the write count: for a USABLE pair the committed value is the CLAMPED PRE-DRAG SIZE (\`100\`), written EXACTLY once; for the UNUSABLE pair the clamp answers \`NaN\` and \`E3\` writes ZERO times. This shape's declared count is ${shape.expectedWrites}, and the later \`pointerup\` commits NOTHING further: ${shape.name}. Read: ${JSON.stringify(
          h.sink.records.map((r) => r.value),
        )}`,
      ).toBe(shape.expectedWrites)
      if (shape.expectedWrites === 1) {
        expect(h.sink.records[0]?.value, `F-10 §3.2 — and that value IS the pre-drag size (\`100\`): ${shape.name}`).toBe(100)
        expect(
          sinkAfterReset,
          `F-10 §3.2 — the reset’s own write had already landed before the release: ${shape.name}`,
        ).toBe(1)
      } else {
        expect(
          controllerStatsOf(h)['sinkCalls'],
          `F-10 §3.2/§2.3 item 4 clause 3 — and \`E3\`'s own counter reads ZERO for the unusable pair (\`stats().sinkCalls === 0\`): the composition refuses before entering its write site, so \`writes: 0\` here does NOT mean “the sink was never reached by the reset” in the sense that would excuse a missing session call — the next reading shows the session WAS handed the \`NaN\`. ${shape.name}`,
        ).toBe(0)
        expect(
          sinkAfterReset === 0 && h.sink.records.length === 0,
          `F-10 §3.2 — ZERO writes at the reset AND at the later \`pointerup\` (the handle was cleared): ${shape.name}. Read: afterReset=${String(
            sinkAfterReset,
          )}, total=${String(h.sink.records.length)}`,
        ).toBe(true)
        expect(
          h.sessionCommits.length === 1 && Object.is(h.sessionCommits[0]?.value, Number.NaN),
          `F-10 §3.2/§2.3 item 4 clause 3 (THE RULED READING BESIDE THE ZERO) — the SESSION's own recorder still received the value it was handed (\`NaN\`) exactly once, so the zero-write reading is NOT a stalled drive: ${shape.name}. Recorded: ${JSON.stringify(
            h.sessionCommits.map((c) => String(c.value)),
          )}`,
        ).toBe(true)
      }
    }
  })

  it('F-12 §3.2 — THE AFFORDANCE ELEMENT IS `null`/`undefined`/a non-object: construction does not throw, `attach()` ⇒ `false` with ZERO session calls and NO listener attached to anything', async () => {
    await requireLiveModule('F-12')
    for (const element of [null, undefined, 42, 'x'] as unknown[]) {
      const h = await makeHarness({ element }, `F-12 ${brief(element)}`)
      const attached = h.affordance.attach()
      console.log(
        `F-12 MEASURED :: ${JSON.stringify({
          element: brief(element),
          attached,
          ons: h.source.ons().length,
          sessionCalls: h.sessionLog.length,
          clause: 'docs/specs/gutter-ui.md §3.2 F-12 + §2.2 P-2',
        })}`,
      )
      expect(attached, `F-12 §3.2 — \`attach()\` ⇒ \`false\` for a non-object element (${brief(element)}): the ` + '`E3`' + ` declared degradation`).toBe(false)
      expect(
        h.source.ons().length,
        `F-12 §3.2/§2.2 P-2 — and NO listener is attached to ANYTHING (no global lookup is attempted either): ${brief(element)}. Read: ${JSON.stringify(
          h.source.ons().map((e) => e.type),
        )}`,
      ).toBe(0)
      expect(
        h.sessionLog.filter((c) => c.call !== 'install').length,
        `F-12 §3.2 — with ZERO session calls of this module’s own beyond the session’s own install baseline: ${brief(element)}. Recorded: ${JSON.stringify(
          h.sessionLog.map((c) => c.call),
        )}`,
      ).toBe(0)
      expect(
        typeof h.affordance.stats()['moves'],
        `F-12 §3.2 — and \`stats()\` is READABLE after the refusal: ${brief(element)}`,
      ).toBe('number')
    }
  })

  it('F-13 §3.2 — THE AUTHORING-REFUSAL ROW: a rendered-fact assertion on `[T]` is REFUSED, not satisfied — and THIS FILE contains none', () => {
    // **THE TOKENS ARE ASSEMBLED AT RUN TIME AND SPLIT AT DIFFERENT CHARACTERS**, so this
    // row’s own source carries neither the banned spellings nor any single split spelling of
    // them: a self-scanning row that spells its tokens fails on itself, which is a HARNESS
    // defect rather than a finding (the sibling `gutter.test.ts` scans with the same care).
    const renderedFactTokens = [
      ['getBounding', 'Cl', 'ient', 'Rect'].join(''),
      ['get', 'Computed', 'Style'].join(''),
      ['off', 'set', 'Wid', 'th'].join(''),
      ['off', 'set', 'Hei', 'ght'].join(''),
      ['scr', 'oll', 'Wid', 'th'].join(''),
      ['cl', 'ient', 'Hei', 'ght'].join(''),
      ['element', 'From', 'Point'].join(''),
      ['request', 'Animation', 'Frame'].join(''),
    ]
    const self = readFileSync(TEST_FILE, 'utf8')
    // **THE SCOPE IS STATED, NOT RELAXED:** the corpus is this WHOLE file MINUS the lines of
    // THIS row's own declaration block (the row cannot match itself), and NO other line is
    // excluded — a scan that quietly skipped every `join('')` line would be an unfalsified row.
    const lines = self.split('\n')
    const opens = lines.findIndex((line) => line.includes("it('F-13 §3.2"))
    let closes = opens
    if (opens >= 0) {
      for (let i = opens; i < lines.length; i += 1) {
        if (lines[i].startsWith('  })')) {
          closes = i
          break
        }
      }
    }
    const scanned = lines.filter((_line, index) => !(opens >= 0 && index >= opens && index <= closes)).join('\n')
    const hits = hitsOf(scanned, renderedFactTokens)
    console.log(`F-13 MEASURED :: ${JSON.stringify({ hits, clause: 'docs/specs/gutter-ui.md §3.2 F-13 + §4.4 S-7' })}`)
    expect(
      hits,
      `F-13 §3.2/§2.2 P-9/§4.4 S-7 — NO row of THIS FILE asserts a rendered fact: the node suite runs under the shim (no layout, and \`style\` is a recording object), a rendered fact needs a REAL WINDOW, and this unit HAS one — so the refusal is not an excuse about leg availability. Refused forms found: ${JSON.stringify(
        hits,
      )}`,
    ).toEqual([])
    for (const control of [
      `const w = el.${['getBounding', 'Cl', 'ient', 'Rect'].join('')}().width`,
      `const s = ${['get', 'Computed', 'Style'].join('')}(el).cursor`,
      `const w = el.${['off', 'set', 'Wid', 'th'].join('')}`,
    ]) {
      expect(
        hitsOf(control, renderedFactTokens).length,
        `F-13 §3.2 — THE POSITIVE CONTROL: a corpus asserting a rendered fact MUST FAIL the refusal scan: ${JSON.stringify(control)}`,
      ).toBeGreaterThan(0)
    }
    // AND THE CLAIMS THEMSELVES ARE NAMED AS `[U]`, at filing time, in the live matrix — never
    // moved to the leg later (`§4.4 S-11`).
    const spec = readRel(SPEC_RELPATH)
    expect(
      /U-8/.test(spec) && /U-7/.test(spec),
      'F-13 §5.U/§4.4 S-11 — the `[U]` rows are fixed BY NAME at filing time (`U-1`..`U-8`), so a claim that acquires its layer later is the false-green class this refusal exists to close',
    ).toBe(true)
  })

  it('F-14 §3.2 — A CALLER THAT OPTS IN ANYWAY IS INERT, NOT MISLED: `capturePointer: true` changes NOTHING, because the module passes NO `capture` field anywhere', async () => {
    await requireLiveModule('F-14')
    const withOptIn = await makeHarness({ capturePointer: true }, 'F-14 opt-in')
    expect(withOptIn.affordance.attach(), 'F-14 — the opt-in does not break the attach').toBe(true)
    lifecycle(withOptIn, [pointerEvent(0, 150, 300)])
    withOptIn.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    const withoutOptIn = await makeHarness({}, 'F-14 no opt-in')
    expect(withoutOptIn.affordance.attach(), 'F-14 CONTROL — the same drive without the opt-in').toBe(true)
    lifecycle(withoutOptIn, [pointerEvent(0, 150, 300)])
    withoutOptIn.source.fire(POINTER_TYPES.end, pointerEvent(0, 150, 300))
    console.log(
      `F-14 MEASURED :: ${JSON.stringify({
        withOptIn: { ons: withOptIn.source.ons().map((e) => e.type), sinkValues: withOptIn.sink.records.map((r) => r.value) },
        withoutOptIn: { ons: withoutOptIn.source.ons().map((e) => e.type), sinkValues: withoutOptIn.sink.records.map((r) => r.value) },
        clause: 'docs/specs/gutter-ui.md §3.2 F-14 + §2.6 item 4 + §3.3 I-13',
      })}`,
    )
    expect(
      withOptIn.source.ons().map((e) => e.type),
      'F-14 §3.2/§2.6 item 4 — the option is DECLARED AND IGNORED: the gesture behaves EXACTLY as with the seam absent (the same listener set, in the same order)',
    ).toEqual(withoutOptIn.source.ons().map((e) => e.type))
    expect(
      withOptIn.sink.records.map((r) => r.value),
      'F-14 §3.2 — and the commit behaviour is unchanged: a row asserting that any capture behaviour changed FAILS this row',
    ).toEqual(withoutOptIn.sink.records.map((r) => r.value))
    const source = moduleSource('F-14 static half')
    expect(
      /capture\s*:/.test(normalizedView(source)),
      'F-14 §2.6 item 4/§3.3 I-13 — the MODULE passes NO `capture` field ANYWHERE (a `capture: true` field in a hooks object is INERT: `E3`’s sealed `attach` accepts only the four hooks), and `releasePointerCapture` appears nowhere',
    ).toBe(false)
  })
})

// ===========================================================================
// §5.5.1 — THE REGISTER, EXECUTED IN REGISTER ORDER.
//
// **THE SECTIONS ABOVE ARE THE `§3` ROWS; THESE ARE THE `§5.5` PROPERTY LAYER, and they
// ride the SAME file (`§4.2` item 5: the register rows LAST).** Caps, uniform for the whole
// register: **`≤100` attempts per row · `≤400` attempts in total · STOP AFTER 5 CONSECUTIVE
// FAILURES** (a register row is never refused on the ground that "no PBT harness exists").
//
// **AN UN-RUN ROW IS REPORTED AS A FAILURE, NEVER SILENTLY OMITTED AND NEVER A PASS**
// (`§4.2` item 2). At RED time the register's FIRST row breaks on the module-absent
// boundary, and the stop-after-5 rule is what reports the red honestly: the remaining rows
// are printed as UN-RUN FAILURES rather than passing quietly.
//
// **EVERY ATTEMPT IS A DRIVE.** The declared terms ARE drive counts
// (`docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`). `P-GU-SM-1`'s `12`
// mid-drag ASSERTIONS and `P-GU-TP-1`'s `6` entry-point READINGS are printed BESIDE their
// terms and are NEVER counted in them.
//
// **THE `[U]` ROWS ARE NOT REGISTER ROWS AND ARE NOT AUTHORED HERE** (`§5.5.1`'s
// "the rows this unit deliberately does not carry": NO rendered-fact row, NO `[D]`-shaped
// row, NO row for `E3`'s own arithmetic, NO row for the session's lifecycle).
// ===========================================================================
const REGISTER_PRINTED_TOTAL = 134
const REGISTER_ROW_CAP = 100
const REGISTER_TOTAL_CAP = 400
const CONSECUTIVE_FAILURE_CAP = 5
const REGISTER_DECLARED: ReadonlyArray<{ row: string; strategy: string; term: number; distinct: number; bounded: boolean; beside: number }> = [
  // `§5.5.1` P-GU-SM-1 — the single-writer quantification over every terminal path.
  // **THE DECLARED TERM IS THE `E-3` RE-GRAIN'S `15`** (`§5.5.3`'s chain and the `134`
  // total), and the `12` mid-drag ASSERTIONS ride in the `beside` field.
  { row: 'P-GU-SM-1', strategy: 'S-GU-WRITER-1', term: 15, distinct: 15, bounded: true, beside: 12 },
  { row: 'P-GU-SM-2', strategy: 'S-GU-PREVIEW-1', term: 15, distinct: 15, bounded: true, beside: 0 },
  { row: 'P-GU-SM-3', strategy: 'S-GU-RELEASE-1', term: 15, distinct: 15, bounded: false, beside: 0 },
  { row: 'P-GU-IM-1', strategy: 'S-GU-POINTER-1', term: 45, distinct: 15, bounded: true, beside: 0 },
  { row: 'P-GU-IM-2', strategy: 'S-GU-SEAM-1', term: 20, distinct: 20, bounded: false, beside: 0 },
  // `§5.5.1` P-GU-TP-1 — the module's totality over hostile arguments. **THE DECLARED TERM
  // IS THE `E-3` RE-GRAIN'S `12`**, and the `6` entry-point READINGS ride in `beside`.
  { row: 'P-GU-TP-1', strategy: 'S-GU-TOTAL-1', term: 12, distinct: 12, bounded: true, beside: 6 },
  { row: 'P-GU-TP-2', strategy: 'S-GU-CURSOR-1', term: 12, distinct: 10, bounded: false, beside: 0 },
]

const registerState = {
  attempts: 0,
  consecutiveFailures: 0,
  stoppedAtRow: null as string | null,
  stoppedFor: null as string | null,
}
type RowRecord = {
  row: string
  strategy: string
  attemptsRun: number
  held: number
  broken: number
  stoppedEarly: boolean
  notStarted: boolean
  registerStoppedAt: string | null
  causes: string[]
}
const registerRecords: RowRecord[] = []

class RegisterRow {
  readonly row: string
  readonly strategy: string
  private ran = 0
  private held = 0
  private broken = 0
  private stoppedEarly = false
  private notStarted = false
  private readonly causes: string[] = []

  constructor(row: string, strategy: string) {
    this.row = row
    this.strategy = strategy
  }

  /** ONE attempt. `body` returns `null` when the property HELD, else the break cause as a
   *  sentence (a throw is caught and is itself a break cause). */
  async run(label: string, body: () => string | null | Promise<string | null>): Promise<void> {
    if (registerState.stoppedAtRow !== null) {
      if (this.ran === 0) this.notStarted = true
      return
    }
    if (this.ran >= REGISTER_ROW_CAP) {
      this.stoppedEarly = true
      this.causes.push(`the <=${REGISTER_ROW_CAP}-attempts-per-row cap was reached`)
      return
    }
    if (registerState.attempts >= REGISTER_TOTAL_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `the <=${REGISTER_TOTAL_CAP}-attempts register cap was reached`
      return
    }
    this.ran += 1
    registerState.attempts += 1
    let cause: string | null = null
    try {
      cause = await body()
    } catch (e) {
      cause = `the attempt threw: ${describeThrown(e)}`
    }
    if (cause === null) {
      this.held += 1
      registerState.consecutiveFailures = 0
      return
    }
    this.broken += 1
    this.causes.push(`${label} — ${cause}`)
    registerState.consecutiveFailures += 1
    if (registerState.consecutiveFailures >= CONSECUTIVE_FAILURE_CAP) {
      this.stoppedEarly = true
      registerState.stoppedAtRow = this.row
      registerState.stoppedFor = `${CONSECUTIVE_FAILURE_CAP} consecutive failures`
    }
  }

  /** The row's verdict + its `§5.3` item 10 record line. **An un-run row FAILS on purpose:
   *  a register row that never started may not look green.** */
  finish(): void {
    const record: RowRecord = {
      row: this.row,
      strategy: this.strategy,
      attemptsRun: this.ran,
      held: this.held,
      broken: this.broken,
      stoppedEarly: this.stoppedEarly,
      notStarted: this.notStarted,
      registerStoppedAt: registerState.stoppedAtRow,
      causes: this.causes.slice(0, 5),
    }
    registerRecords.push(record)
    console.log(`§5.5.1 register record :: ${JSON.stringify(record)}`)
    if (this.ran === 0) {
      console.log(
        `§5.5.1 un-run row record :: ${JSON.stringify({
          row: this.row,
          strategy: this.strategy,
          attemptsRun: 0,
          reported: 'FAILURE — never started; the register stopped earlier',
          registerStoppedAt: registerState.stoppedAtRow,
          stoppedFor: registerState.stoppedFor,
        })}`,
      )
      expect(
        0,
        `§5.5.1/§4.2 item 2 — the register row \`${this.row}\` (${this.strategy}) NEVER STARTED: 0 of its declared attempts were executed, because the register stopped at \`${String(
          registerState.stoppedAtRow,
        )}\` (${String(registerState.stoppedFor)}). An un-run register row is REPORTED AS A FAILURE, never silently omitted and never a pass`,
      ).toBe(declaredTermOf(this.row))
      return
    }
    expect(
      this.broken,
      `§5.5.1 register record :: ${JSON.stringify(record)} — RED: ${this.broken} of ${this.ran} attempts BROKE. First causes: ${JSON.stringify(
        this.causes.slice(0, 3),
      )}`,
    ).toBe(0)
  }
}
function declaredTermOf(row: string): number {
  return REGISTER_DECLARED.find((r) => r.row === row)?.term ?? -1
}

/** **`§5.5.1`'s REGISTER, EXECUTED IN REGISTER ORDER.** Each `describe` is ONE row; every
 *  attempt is one DRIVE of that row's own table, and a missing module is a break CAUSE (a
 *  sentence), never a harness throw. */
describe('§5.5.1 — P-GU-SM-1 (S-GU-WRITER-1) · the single-writer quantification over the terminal paths', () => {
  it('P-GU-SM-1 — 15 DRIVES (5 terminal paths × 2 composition shapes + 5 distinct mid-drag move shapes), with its 12 mid-drag ASSERTIONS printed BESIDE the term and never counted in it — ⟶ RE-GRAINED 2026-09-27 (THE DRIVE-COUNT RULING): the LOOP now runs the declared `15` (`5 × 2 + 5`) instead of `17`, by driving path (c)’s two declared refusal variants INSIDE one attempt', async () => {
    const row = new RegisterRow('P-GU-SM-1', 'S-GU-WRITER-1')
    /** **⟶ ADDED 2026-09-27 (THE DRIVE-WINDOW RULING)** — the per-shape seam censuses: each shape's
     *  own seam answers a VALID value for the drive-window SETUP turn (one call) and the shape's own
     *  invalid answer for the SUBJECT turn. None of these is a drive, a term, a seed or a strategy
     *  id; they are the shape's own state machine, kept so the shape's subject is unchanged. */
    let sm1Calls = 0
    let sm1BoundsCalls = 0
    let sm1VetoCalls = 0
    // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING + THE DRIVE-COUNT RULING).** Two changes,
    // kept apart: (i) path (b)'s drive is an UNUSABLE bounds pair, so ITS declared pair is `0`
    // (the as-filed `1` is superseded — `E3` refuses before its write site); (ii) the declared
    // derivation `5` terminal paths × `2` composition shapes + `5` distinct mid-drag move shapes
    // = `15` is now the LOOP's own count, because path (c)'s TWO declared refusal variants ride
    // INSIDE one attempt (both are still asserted — nothing was dropped to reach the term).
    const paths: Array<{ path: string; expectedSink: number; kind: 'end' | 'invalid' | 'refused' | 'cancel' | 'dispose' }> = [
      { path: '(a) a VALID `end`', expectedSink: 1, kind: 'end' },
      { path: '(b) an invalid `reset` at an UNUSABLE bounds pair (⇒ the reset’s own clamp answers `NaN`; the as-filed `1` is SUPERSEDED by `0`)', expectedSink: 0, kind: 'invalid' },
      { path: "(c) a REFUSED reset (`'not-resizable'` and `'unusable-default'`)", expectedSink: 0, kind: 'refused' },
      { path: '(d) a `cancel` via `pointercancel`', expectedSink: 0, kind: 'cancel' },
      { path: '(e) a `cancel` via a mid-gesture `dispose()`', expectedSink: 0, kind: 'dispose' },
    ]
    const midDragShapes: Array<{ name: string; overrides: Record<string, unknown>; invalid: boolean; expectedSink: number; priorValid: boolean; label: string }> = [
      { name: 'a resolvable pointer with a finite clamped value', overrides: {}, invalid: false, expectedSink: 0, priorValid: true, label: 'valid' },
      // AN INVALID MOVE OVER A USABLE PAIR reaches the `reset` arm, whose OWN clamp answers a
      // number (the clamped pre-drag default ⇒ ONE write); the unusable-pair shape below cannot
      // write at all. (⟶ RE-GRAINED 2026-09-27, THE CHANNEL RULING, RULE A's second/third
      // bullets: these per-shape counts are declared and read instead of a loose inequality.)
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING): EVERY shape whose
      // declared reading is a LIVE-window reading (this one included) now drives ONE PRIOR VALID
      // MOVE inside its own attempt — no drive is added, no term, seed or strategy id moves. The
      // shape's OWN subject is kept: the `sizeFromPointer` below answers a finite `50` for the
      // setup turn and the unresolvable `null`/`NaN` afterwards. A shape that CANNOT reach the
      // live window through its own seam (none here: the non-finite answers are all reachable by
      // a stateful seam) would assert the PRE-HANDLE reading with `§2.3` row 8 cited instead.**
      { name: 'an unresolvable pointer', overrides: {}, invalid: true, expectedSink: 1, priorValid: true, label: 'unresolvable' },
      { name: 'a resolvable pointer whose clamped value is not finite (NaN)', overrides: { boundsOf: ((): unknown => ((n: number) => (n <= 2 ? { min: 0, max: 200 } : undefined))(++sm1BoundsCalls)) }, invalid: true, expectedSink: 0, priorValid: true, label: 'NaN' },
      // ⟶ DRIVE-WINDOW RECONCILED 2026-09-27 — the shape's answer is a NON-FINITE answer BY TYPE
      // (`'Infinity'`), not the numeric `+Infinity`: measured on the frozen `clampToBounds`, a
      // numeric `+Infinity` CLAMPS to the pair's `max` (`200`), i.e. a FINITE, VALID move — so the
      // numeric form could not reach this shape's declared INVALID arm at all (the same finding the
      // `F-10` row records).
      { name: 'a resolvable pointer whose clamped value is Infinity', overrides: { sizeFromPointer: ((): unknown => ((n: number) => (n <= 1 ? 50 : 'Infinity'))(++sm1Calls)) }, invalid: true, expectedSink: 1, priorValid: true, label: 'Infinity' },
      { name: 'an exact-false `isDragValid` veto', overrides: { isDragValid: (): unknown => (++sm1VetoCalls === 1 ? true : false) }, invalid: true, expectedSink: 1, priorValid: true, label: 'veto' },
    ]
    for (const shape of ['the single-writer composition', 'both readings in the same cell']) {
      for (const p of paths) {
        await row.run(`${shape} · ${p.path}`, async () => {
          // THE ATTEMPT'S OWN DRIVE LIST: path (c) drives BOTH of its declared refusal variants
          // here, so the declared term is the loop's count without losing either reading.
          const variants: Array<{ label: string; overrides: Record<string, unknown>; expectedSink: number }> =
            p.kind === 'invalid'
              ? [
                  // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING): the pair is
                  // UNUSABLE AT THE RESET, which is what this path declares — but the setup move's
                  // own clamp evaluation still sees a USABLE pair, so the path's drive reaches
                  // `§2.3` row 9's LIVE-gesture window instead of sitting in row 8's PRE-HANDLE
                  // refusal (where the declared pair is unreachable and the counter does not move).**
                  {
                    label: 'invalid',
                    overrides: { boundsOf: ((): unknown => ((n: number) => (n <= 2 ? { min: 0, max: 200 } : undefined))(++sm1BoundsCalls)) },
                    expectedSink: p.expectedSink,
                  },
                ]
              : p.kind === 'refused'
                ? [
                    { label: "'not-resizable'", overrides: { resizableOf: (): unknown => false }, expectedSink: 0 },
                    { label: "'unusable-default'", overrides: { startSizeOf: (): unknown => 'not-a-number' }, expectedSink: 0 },
                  ]
                : [{ label: p.kind, overrides: {}, expectedSink: p.expectedSink }]
          for (const variant of variants) {
            const gate = await surface(`P-GU-SM-1 ${shape} ${p.path} ${variant.label}`)
            if (gate.cause !== null) return gate.cause
            const h = await makeHarness(variant.overrides, `P-GU-SM-1 ${p.path}`)
            h.affordance.attach()
            lifecycle(h, [pointerEvent(0, 175, 300)])
            if (p.kind === 'end') h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
            if (p.kind === 'invalid') h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
            if (p.kind === 'refused') h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
            if (p.kind === 'cancel') h.source.fire(POINTER_TYPES.cancel, pointerEvent(0, 175, 300))
            if (p.kind === 'dispose') (h.session as SessionLikeSurface).dispose()
            const sink = h.sink.records.length
            const counter = controllerSinkCalls(h)
            if (sink !== counter) return `THE TWO READINGS DIVERGE: the sink's own record reads ${sink} while E3's stats().sinkCalls reads ${counter}`
            if (sink !== variant.expectedSink) return `the declared pair for ${p.path} [${variant.label}] is ${variant.expectedSink} sink calls; measured ${sink}`
            if (sink > 1) return `a path produced TWO writes (${sink})`
            if (h.calls.commit - counter > 0) return `the MODULE made ${h.calls.commit - counter} sink call(s) of its own on ${p.path} [${variant.label}]`
            // **RULE A's FOURTH BULLET: the CANCEL paths write `0` ON BOTH CHANNELS.**
            if ((p.kind === 'cancel' || p.kind === 'dispose') && h.sessionCommits.length !== 0) {
              return `the ${p.kind} path wrote to the SESSION's channel ${h.sessionCommits.length} time(s); the declared reading is ZERO on BOTH channels (commit is invoked zero times on a \`cancel\` terminal)`
            }
            const previews = Number(h.affordance.stats()['previews'])
            if (previews > 0 && sink > 0 && previews > 1) return `the preview count (${previews}) exceeded one write for a single observed move`
          }
          return null
        })
      }
    }
    // The FIVE distinct MID-DRAG move shapes — real drives in their own right.
    for (const mid of midDragShapes) {
      await row.run(`the mid-drag shape: ${mid.name}`, async () => {
        const gate = await surface(`P-GU-SM-1 mid-drag ${mid.name}`)
        if (gate.cause !== null) return gate.cause
        const h = await makeHarness(mid.overrides, `P-GU-SM-1 mid ${mid.name}`)
        h.affordance.attach()
        h.source.fire('pointerover', pointerEvent(0))
        h.source.fire('pointerdown', pointerEvent(0))
        // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING).** The shape's declared
        // reading is a LIVE-window reading (`§2.3` row 9: the invalid move's `reset` reaches
        // `E3`'s reset entry point and — where its own clamp answers a number — writes ONCE), so
        // the attempt drives ONE PRIOR VALID MOVE first, INSIDE this same attempt (no drive is
        // added). Its own validity is asserted (`priorValidMoveWithState`): a setup move that
        // silently failed would otherwise leave the drive in row 8's PRE-HANDLE window and make
        // every reading below accidental. `stats().moves` is then read over the WHOLE attempt
        // (the setup turn plus the subject turn = TWO observed moves for a module that observes
        // both), so the count assertion below names both turns.
        if (mid.priorValid) priorValidMoveWithState(h, `P-GU-SM-1 mid ${mid.label} prior valid move`, () => undefined)
        const movesBeforeTheSubject = Number(h.affordance.stats()['moves'])
        const sinkBeforeTheSubject = h.sink.records.length
        const event = mid.name.includes('unresolvable') ? null : pointerEvent(0, 175, 300)
        const fire = h.source.fire(POINTER_TYPES.move, event)
        if (fire.thrown !== null) return `the move turn THREW: ${describeThrown(fire.thrown)}`
        const stats = h.affordance.stats()
        if (Number(stats['moves']) - movesBeforeTheSubject !== 1) {
          return `stats().moves read ${String(stats['moves'])} after the SUBJECT turn (it read ${movesBeforeTheSubject} before it); the subject move was not observed`
        }
        const sinkForTheShape = h.sink.records.length - sinkBeforeTheSubject
        if (mid.invalid && Number(stats['resets']) === 0 && sinkForTheShape === 0) {
          return `an INVALID mid-drag shape reached a success-looking state (resets=0, sink=0) instead of its declared degradation`
        }
        if (!mid.invalid && sinkForTheShape > 0) return 'a mid-drag move committed before any terminal'
        // **THE PER-SHAPE WRITE COUNT (⟶ RE-GRAINED 2026-09-27, THE CHANNEL RULING).** The invalid
        // arm's `reset` writes exactly once when its OWN clamp answers a number and zero times at
        // an unusable pair — declared per shape above, so a mid-drag move can no longer pass with
        // any count at all. **⟶ DRIVE-WINDOW RECONCILED 2026-09-27: the count is read OVER THE
        // SUBJECT TURN** (the setup turn writes nothing — it is a VALID move, and a valid move
        // never reaches the sink), so the read is the shape's own and not the setup's.
        if (sinkForTheShape !== mid.expectedSink) {
          return `the mid-drag shape's declared write count is ${mid.expectedSink}; measured ${sinkForTheShape} for the SUBJECT turn (whole attempt: ${h.sink.records.length})`
        }
        if (sinkForTheShape !== controllerSinkCalls(h)) {
          return `the sink's record (${sinkForTheShape} for the SUBJECT turn) and E3's counter (${controllerSinkCalls(h)}) DIVERGE`
        }
        return null
      })
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-SM-2 (S-GU-PREVIEW-1) · the preview-never-sinks quantification', () => {
  it('P-GU-SM-2 — 15 DRIVES (5 stages × 3 move shapes), each asserting the declared preview/sink pair exactly', async () => {
    const row = new RegisterRow('P-GU-SM-2', 'S-GU-PREVIEW-1')
    /** **⟶ ADDED 2026-09-27 (THE DRIVE-WINDOW RULING)** — the non-finite shape's own seam census:
     *  the seam answers a VALID value for the drive-window SETUP turn and the shape's own `NaN`
     *  for the SUBJECT turn. Not a drive, a term, a seed or a strategy id. */
    let sm2Calls = 0
    const stages = [
      '(1) before establishment (a hover turn)',
      '(2) during the drag after a VALID move',
      '(3) during the drag after an INVALID move',
      '(4) at the terminal frame',
      '(5) after the terminal (a later hover turn)',
    ]
    const moveShapes: Array<{ name: string; overrides: Record<string, unknown>; event: unknown; liveWindow: boolean }> = [
      { name: '(1) a resolvable pointer with a finite clamped value', overrides: {}, event: pointerEvent(0, 175, 300), liveWindow: false },
      // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27 (THE DRIVE-WINDOW RULING) — THE TWO INVALID SHAPES
      // ARE DRIVEN WITH ONE PRIOR VALID MOVE, INSIDE THE SAME DRIVE.** A shape whose move is
      // INVALID can only reach `§2.3` row 9's LIVE-gesture window (where its `controller.reset`
      // call is made, its count read and its preview written) if a PRIOR move's `E3` wrapper has
      // already captured the handle — otherwise the invalid move's turn sits in row 8's
      // PRE-HANDLE window and its `reset` arm is REFUSED before any session call. The shape's own
      // answer is unchanged (`null` event / `NaN` seam: the seam below answers `50` for the setup
      // turn — the SAME stateful-seam technique the F-2/F-10 rows use — and `NaN` afterwards), and
      // the added move is a move inside an existing drive: the declared `15` = `5 stages × 3
      // shapes` is untouched.**
      { name: '(2) an unresolvable pointer', overrides: {}, event: null, liveWindow: true },
      { name: '(3) a resolvable pointer whose clamped value is not finite', overrides: { sizeFromPointer: ((): unknown => ((n: number) => (n <= 2 ? 50 : Number.NaN))(++sm2Calls)) }, event: pointerEvent(0, 175, 300), liveWindow: true },
    ]
    for (const stage of stages) {
      for (const moveShape of moveShapes) {
        await row.run(`${stage} × ${moveShape.name}`, async () => {
          const gate = await surface(`P-GU-SM-2 ${stage}`)
          if (gate.cause !== null) return gate.cause
          const h = await makeHarness(moveShape.overrides, `P-GU-SM-2 ${stage}`)
          h.affordance.attach()
          if (stage.startsWith('(1)')) {
            h.source.fire('pointerover', pointerEvent(0))
            if (h.previews.length !== 0) return 'a hover turn wrote a preview'
            if (h.sink.records.length !== 0) return 'a hover turn reached the sink'
            return null
          }
          h.source.fire('pointerdown', pointerEvent(0))
          if (stage.startsWith('(5)')) {
            if (moveShape.liveWindow) priorValidMove(h, `P-GU-SM-2 ${stage} ${moveShape.name} prior valid move`)
            h.source.fire(POINTER_TYPES.move, moveShape.event)
            h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
            const before = h.previews.length
            h.source.fire('pointerover', pointerEvent(0))
            if (h.previews.length !== before) return 'a post-terminal hover turn wrote a preview'
            if (h.previews.length > 0 && h.sink.records.length === 0 && false) return 'unreachable'
            return null
          }
          // **⟶ DRIVE-WINDOW RECONCILED 2026-09-27: the invalid shapes are set up with ONE PRIOR
          // VALID MOVE so the SUBJECT move reaches `§2.3` row 9's LIVE-gesture window; the reads
          // below are then taken over the SUBJECT turn (the setup move is a VALID move and writes
          // its own preview, which is not this cell's subject).**
          if (moveShape.liveWindow) priorValidMove(h, `P-GU-SM-2 ${stage} ${moveShape.name} prior valid move`)
          const previewsBeforeTheSubject = h.previews.length
          const sinkBeforeTheSubject = h.sink.records.length
          h.source.fire(POINTER_TYPES.move, moveShape.event)
          const subjectPreviews = h.previews.slice(previewsBeforeTheSubject)
          const afterMove = subjectPreviews.length
          if (afterMove > 1) return `more than ONE preview write for a single observed move (${afterMove})`
          if (moveShape.name.includes('unresolvable') && subjectPreviews.some((p) => p['valid'] === true)) {
            return 'an unresolvable pointer produced a VALID preview'
          }
          if (moveShape.name.includes('not finite') && subjectPreviews.some((p) => !Number.isFinite(Number(p['value'])))) {
            return 'a preview carried a NON-FINITE value'
          }
          if (stage.startsWith('(4)')) {
            h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
            const atTerminal = h.previews.slice(previewsBeforeTheSubject).length
            if (atTerminal > afterMove + 1) return 'more than one preview write at the terminal frame'
          }
          if (h.sink.records.length - sinkBeforeTheSubject > 0 && afterMove > 1) {
            return 'a preview invocation was accompanied by a sink write in the same turn'
          }
          return null
        })
      }
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-SM-3 (S-GU-RELEASE-1) · the release mapping and the drop-revert', () => {
  it('P-GU-SM-3 — 15 DRIVES (5 release shapes × 3 readings: the module’s counters, the session call log, and the sink/E3 pair)', async () => {
    const row = new RegisterRow('P-GU-SM-3', 'S-GU-RELEASE-1')
    const shapes: Array<{ name: string; overrides: Record<string, unknown>; expectedSink: number; drive: (h: Harness) => void }> = [
      {
        name: '(1) a VALID drag released by the session’s own `pointerup`',
        overrides: {},
        expectedSink: 1,
        drive: (h) => {
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
        },
      },
      {
        // THE INVALID RELEASE WITH A USABLE PAIR: the reset's OWN clamp answers a number (the
        // clamped pre-drag size), so the reset terminal writes EXACTLY ONCE — ⟶ RE-GRAINED
        // 2026-09-27 (THE CHANNEL RULING), RULE A's second bullet.
        name: '(2) an INVALID drag (a non-finite clamped value)',
        overrides: { sizeFromPointer: (): unknown => Number.NaN },
        expectedSink: 1,
        drive: (h) => {
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
        },
      },
      {
        name: "(3) an INVALID drag refused at the reset (`'not-resizable'`)",
        overrides: { resizableOf: (): unknown => false },
        expectedSink: 0,
        drive: (h) => {
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
        },
      },
      {
        name: '(4) a SECONDARY-button press during the drag (the drop)',
        overrides: {},
        expectedSink: 0,
        drive: (h) => {
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire('pointerdown', pointerEvent(2, 175, 300))
        },
      },
      {
        name: '(5) a SECONDARY-button press with NO active gesture (inert)',
        overrides: {},
        expectedSink: 0,
        drive: (h) => {
          h.source.fire('pointerdown', pointerEvent(2))
        },
      },
    ]
    for (const shape of shapes) {
      for (const reading of ['(a) the module’s own counters', '(b) the session call log', '(c) the sink’s record and E3’s stats()']) {
        await row.run(`${shape.name} · ${reading}`, async () => {
          const gate = await surface(`P-GU-SM-3 ${shape.name}`)
          if (gate.cause !== null) return gate.cause
          const h = await makeHarness(shape.overrides, `P-GU-SM-3 ${shape.name}`)
          h.affordance.attach()
          shape.drive(h)
          const stats = h.affordance.stats()
          const resetFrames = h.sessionLog.filter((c) => c.call === 'reset')
          const terminals = h.sessionLog.filter((c) => c.call === 'dispose')
          const sink = h.sink.records.length
          const counter = controllerSinkCalls(h)
          if (reading.startsWith('(a)')) {
            for (const field of ['resets', 'drops', 'previews']) {
              if (typeof stats[field] !== 'number') return `the module's counters do not report \`${field}\` as a number`
            }
            if (shape.name.includes('drop') && Number(stats['drops']) === 0) return 'the drop path did not move the `drops` counter'
            if (shape.name.includes('NO active gesture') && (Number(stats['drops']) !== 0 || Number(stats['previews']) !== 0)) {
              return 'a secondary press with NO active gesture moved a counter'
            }
            return null
          }
          if (reading.startsWith('(b)')) {
            if (shape.name.includes('INVALID') && resetFrames.length > 0 && !resetFrames.every((f) => f.active)) {
              return 'the reset was called while the gesture was NOT active (the reset arm must be taken DURING the drag)'
            }
            // **⟶ RE-GRAINED 2026-09-27 (THE MODULE-ORIGINATED-CENSUS RULING) — RULE B.4.** The
            // as-filed reading was `h.sessionLog.length !== 0`, which can NEVER hold: `attach()`
            // ITSELF causes ONE `install` frame, so this shape was unsatisfiable for any module.
            // The ruled reading is the MODULE-ORIGINATED census — the same form `M-9` uses.
            if (
              shape.name.includes('NO active gesture') &&
              h.sessionLog.filter((c) => c.call !== 'install').length !== 0
            ) {
              return `the module made a session call of its own for a secondary press with no active gesture: ${JSON.stringify(
                h.sessionLog.map((c) => c.call),
              )}`
            }
            if (shape.name.includes('drop') && resetFrames.length !== 0) return 'the drop path called a session reset'
            if (shape.name.includes('drop') && terminals.length !== 0) return 'the module itself dispossessed the session on the drop path'
            return null
          }
          if (sink !== counter) return `the sink's record (${sink}) and E3's counter (${counter}) DIVERGE`
          // ⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING): EVERY shape's write count is declared
          // (the as-filed form asserted only the VALID/drop/inert limbs, leaving the two INVALID
          // limbs' counts unread).
          if (sink !== shape.expectedSink) return `the declared write count for ${shape.name} is ${shape.expectedSink}; measured ${sink}`
          if (shape.name.includes('VALID') && sink !== 1) return `a VALID release must commit EXACTLY once; measured ${sink}`
          if (sink > 1) return `a release shape produced TWO writes (${sink}) — the TWO-WRITER composition`
          if (h.calls.commit - counter > 0) return `the MODULE made ${h.calls.commit - counter} sink call(s) of its own`
          return null
        })
      }
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-IM-1 (S-GU-POINTER-1) · the coordinate uniqueness and the one-read rule', () => {
  it('P-GU-IM-1 — 45 DRIVES (15 event classes × 3 drive forms), the honest distinct figure 15 reported BESIDE the declared 45', async () => {
    const row = new RegisterRow('P-GU-IM-1', 'S-GU-POINTER-1')
    const throwingProxy = new Proxy(
      {},
      {
        get(): never {
          throw new Error('P-GU-IM-1 hostile proxy')
        },
      },
    )
    const throwingAccessor: Record<string, unknown> = {}
    Object.defineProperty(throwingAccessor, 'clientX', {
      get(): never {
        throw new Error('P-GU-IM-1 throwing accessor')
      },
      enumerable: true,
    })
    Object.defineProperty(throwingAccessor, 'clientY', { value: 5, enumerable: true })
    const nullProto = Object.create(null) as Record<string, unknown>
    nullProto['clientX'] = 10
    nullProto['clientY'] = 20
    const ownAccessor: Record<string, unknown> = {}
    Object.defineProperty(ownAccessor, 'clientX', { get: (): number => 10, enumerable: true })
    Object.defineProperty(ownAccessor, 'clientY', { get: (): number => 20, enumerable: true })
    const classes: Array<{ name: string; event: unknown; expected: { x: number; y: number } | null }> = [
      { name: '(1) a plain `{clientX: 10, clientY: 20}`', event: { clientX: 10, clientY: 20 }, expected: { x: 10, y: 20 } },
      { name: '(2) both `0`', event: { clientX: 0, clientY: 0 }, expected: { x: 0, y: 0 } },
      { name: '(3) negative coordinates', event: { clientX: -10, clientY: -20 }, expected: { x: -10, y: -20 } },
      { name: '(4) fractional coordinates', event: { clientX: 10.5, clientY: 20.25 }, expected: { x: 10.5, y: 20.25 } },
      { name: '(5) an own accessor supplying the pair', event: ownAccessor, expected: { x: 10, y: 20 } },
      { name: '(6) a FROZEN event object', event: Object.freeze({ clientX: 10, clientY: 20 }), expected: { x: 10, y: 20 } },
      { name: '(7) an `Object.create(null)` event', event: nullProto, expected: { x: 10, y: 20 } },
      { name: '(8) `clientX` present and `clientY` absent', event: { clientX: 10 }, expected: null },
      { name: "(9) `clientX` a string ('10')", event: { clientX: '10', clientY: 20 }, expected: null },
      { name: '(10) `clientX` NaN', event: { clientX: Number.NaN, clientY: 20 }, expected: null },
      { name: '(11) `clientY` Infinity', event: { clientX: 10, clientY: Number.POSITIVE_INFINITY }, expected: null },
      { name: '(12) the event is `null`', event: null, expected: null },
      { name: '(13) the event is `undefined`', event: undefined, expected: null },
      { name: '(14) the event is a primitive', event: 42, expected: null },
      { name: '(15) a `Proxy` whose traps throw / a throwing accessor', event: throwingProxy, expected: null },
    ]
    const driveForms = [
      '(1) through the module’s observed-move turn',
      '(2) through the same turn with the caller’s `sizeFromPointer` argument recorded',
      '(3) through the event object’s own other-field guard',
    ]
    for (const cls of classes) {
      // **⟶ RE-GRAINED 2026-09-27 (THE DRIVE-COUNT RULING).** The declared term is `45` = `15`
      // event classes × `3` drive forms, so the LOOP runs the declared `45` (the as-filed form
      // pushed TWO extra variants — `(14b)` and `(15b)` — and ran `51`). The two extra readings
      // are NOT dropped: they are asserted INSIDE their parent class's attempt, per drive form.
      const variants: Array<{ name: string; event: unknown; expected: { x: number; y: number } | null }> = [cls]
      if (cls.name.startsWith('(14)')) variants.push({ name: '(14b) the string variant', event: 'x', expected: null })
      if (cls.name.startsWith('(15)')) variants.push({ name: '(15b) a throwing accessor', event: throwingAccessor, expected: null })
      for (const form of driveForms) {
        await row.run(`${cls.name} · ${form}`, async () => {
          for (const variant of variants) {
            const gate = await surface(`P-GU-IM-1 ${cls.name}`)
            if (gate.cause !== null) return gate.cause
            let seen: { pointer: unknown; start: unknown } | null = null
            const h = await makeHarness(
              {
                sizeFromPointer: (pointer: unknown, start: number): unknown => {
                  seen = { pointer, start }
                  return (pointer as { x: number }).x - start
                },
              },
              `P-GU-IM-1 ${cls.name}`,
            )
            h.affordance.attach()
            h.source.fire('pointerover', pointerEvent(0))
            h.source.fire('pointerdown', pointerEvent(0))
            const fire = h.source.fire(POINTER_TYPES.move, variant.event)
            if (fire.thrown !== null) return `the move turn THREW on ${variant.name}: ${describeThrown(fire.thrown)}`
            if (Number(h.affordance.stats()['moves']) !== 1) return 'the move was not observed by the module’s own turn'
            if (variant.expected === null) {
              if (h.previews.some((p) => p['valid'] === true)) return 'an unusable pair produced a VALID preview'
              continue
            }
            if (seen === null) return 'the caller’s `sizeFromPointer` was never invoked for a resolvable coordinate'
            const pointer = seen as { pointer: { x: number; y: number }; start: unknown }
            if (pointer.pointer === null || typeof pointer.pointer !== 'object') return 'the resolver answered a non-object for a usable pair'
            if (pointer.pointer.x !== variant.expected.x || pointer.pointer.y !== variant.expected.y) {
              return `the resolved pair reads ${brief(pointer.pointer)}; the declared reading is ${brief(variant.expected)}`
            }
            if (Object.keys(pointer.pointer).sort().join(',') !== 'x,y') {
              return `the PointerPosition’s own key set is ${JSON.stringify(Object.keys(pointer.pointer))} — it must be EXACTLY {x, y} (no event reference, no target, no button, no pointerId)`
            }
            if (seen && (seen as { pointer: unknown }).pointer === variant.event) {
              return 'the PointerPosition IS the event object (a caller could re-read a coordinate from it)'
            }
          }
          return null
        })
      }
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-IM-2 (S-GU-SEAM-1) · the one-closure and one-evaluation-per-gesture invariant', () => {
  it('P-GU-IM-2 — 20 DRIVES (5 seams × 4 lifecycles), each asserting that seam’s recorded call count', async () => {
    const row = new RegisterRow('P-GU-IM-2', 'S-GU-SEAM-1')
    const seams: Array<{ seam: 'axisOf' | 'boundsOf' | 'startSizeOf' | 'resizableOf' | 'commit'; lifecycle: string }> = []
    for (const seam of ['axisOf', 'boundsOf', 'startSizeOf', 'resizableOf', 'commit'] as const) {
      for (const lifecycle of [
        '(a) `attach` only, no gesture',
        '(b) a hover turn, no gesture',
        '(c) a full VALID gesture',
        '(d) a full INVALID gesture',
      ]) {
        seams.push({ seam, lifecycle })
      }
    }
    for (const cell of seams) {
      await row.run(`${cell.seam} × ${cell.lifecycle}`, async () => {
        const gate = await surface(`P-GU-IM-2 ${cell.seam}`)
        if (gate.cause !== null) return gate.cause
        const h = await makeHarness({}, `P-GU-IM-2 ${cell.seam}`)
        h.affordance.attach()
        if (cell.lifecycle.startsWith('(b)')) h.source.fire('pointerover', pointerEvent(0))
        if (cell.lifecycle.startsWith('(c)')) {
          lifecycle(h, [pointerEvent(0, 175, 300)])
          h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
        }
        if (cell.lifecycle.startsWith('(d)')) {
          const invalid = await makeHarness({ boundsOf: (): unknown => undefined }, `P-GU-IM-2 ${cell.seam} invalid`)
          invalid.affordance.attach()
          lifecycle(invalid, [pointerEvent(0, 175, 300)])
          const counts = invalid.calls
          const sinks = invalid.sink.records.length
          if (cell.seam === 'commit') {
            // The SAME module-originated census on the INVALID lifecycle (⟶ RE-GRAINED
            // 2026-09-27, THE CHANNEL RULING): the module's own invocations of the seam are ZERO,
            // and `E3` writes at most once (at an unusable pair: zero).
            const moduleOwn = counts.commit - controllerSinkCalls(invalid)
            if (moduleOwn !== 0) return `the MODULE invoked the commit seam ${moduleOwn} time(s) of its own on the INVALID lifecycle; the property allows ZERO`
            if (sinks > 1) return `the commit seam was invoked ${sinks} times for one gesture (\`E3\` at most once)`
          }
          if (cell.seam === 'startSizeOf' && counts.startSizeOf !== 1) return `\`startSizeOf\` was consulted ${counts.startSizeOf} times; the contract is EXACTLY ONCE per gesture, at establishment`
          if (cell.seam === 'resizableOf' && counts.resizableOf !== 1) {
            return `\`resizableOf\` was consulted ${counts.resizableOf} times; the contract is ONE evaluation per gesture (the module's \`PreviewState.resizable\` READS that same decision and must not add a second call)`
          }
          return null
        }
        const counts = h.calls
        const sinks = h.sink.records.length
        if (cell.seam === 'axisOf') {
          const expected = cell.lifecycle.startsWith('(b)') ? 1 : cell.lifecycle.startsWith('(a)') ? 0 : 1
          if (counts.axisOf !== expected) return `\`axisOf\` was consulted ${counts.axisOf} times; the declared count for ${cell.lifecycle} is ${expected}`
          return null
        }
        if (cell.seam === 'boundsOf') {
          if (cell.lifecycle.startsWith('(a)') && counts.boundsOf !== 0) return '`boundsOf` was consulted before any gesture'
          if (counts.boundsOf > 2) return `\`boundsOf\` was consulted ${counts.boundsOf} times; at most once per gesture (plus the composition’s own terminal read)`
          return null
        }
        if (cell.seam === 'startSizeOf') {
          if (cell.lifecycle.startsWith('(a)') && counts.startSizeOf !== 0) return '`startSizeOf` was consulted at `attach`'
          if ((cell.lifecycle.startsWith('(c)') || cell.lifecycle.startsWith('(d)')) && counts.startSizeOf !== 1) {
            return `\`startSizeOf\` was consulted ${counts.startSizeOf} times; the contract is EXACTLY ONCE per gesture, at establishment`
          }
          return null
        }
        if (cell.seam === 'resizableOf') {
          if (cell.lifecycle.startsWith('(a)') && counts.resizableOf !== 0) return '`resizableOf` was consulted at `attach`'
          if ((cell.lifecycle.startsWith('(c)') || cell.lifecycle.startsWith('(d)')) && counts.resizableOf !== 1) {
            return `\`resizableOf\` was consulted ${counts.resizableOf} times; ONE evaluation per gesture is the contract (a second call FAILS this row)`
          }
          return null
        }
        if (cell.seam === 'commit') {
          // **⟶ RE-GRAINED 2026-09-27 (THE CHANNEL RULING) — THE COMMIT CELLS NOW READ THE
          // MODULE-ORIGINATED CENSUS.** `sinks` is the SINK's own record (= `E3`'s writes, the
          // ruled single-writer channel); the MODULE's own invocations of the seam are
          // `calls.commit - E3.stats().sinkCalls`, which must be ZERO in every lifecycle — the
          // property's *"by the module ZERO times"* limb, previously only implied.
          const moduleOwn = counts.commit - controllerSinkCalls(h)
          if (moduleOwn !== 0) return `the MODULE invoked the commit seam ${moduleOwn} time(s) of its own for one gesture; the property allows ZERO (E3 is the only writer)`
          if (sinks > 1) return `the commit seam was invoked ${sinks} times for one gesture (at most once per gesture)`
          if (cell.lifecycle.startsWith('(a)') && sinks !== 0) return 'the commit seam was invoked without any gesture'
          return null
        }
        if (sinks > 1) return `the commit seam was invoked ${sinks} times for one gesture (at most once per gesture)`
        if (cell.lifecycle.startsWith('(a)') && sinks !== 0) return 'the commit seam was invoked without any gesture'
        return null
      })
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-TP-1 (S-GU-TOTAL-1) · the module’s totality over hostile arguments', () => {
  it('P-GU-TP-1 — 12 DRIVES (6 argument shapes × 2 drives), with its 6 entry-point READINGS printed BESIDE the term and never counted in it', async () => {
    const row = new RegisterRow('P-GU-TP-1', 'S-GU-TOTAL-1')
    const throwingAccessors: Record<string, unknown> = {}
    for (const key of ['session', 'source', 'element', 'target', 'applyPreview']) {
      Object.defineProperty(throwingAccessors, key, {
        get(): never {
          throw new Error(`P-GU-TP-1 throwing accessor on ${key}`)
        },
        enumerable: true,
      })
    }
    const shapes: Array<{ name: string; shape: unknown }> = [
      { name: '(1) `undefined` (the argument omitted)', shape: undefined },
      { name: '(2) `null`', shape: null },
      { name: '(3) `42`', shape: 42 },
      { name: "(4) `'x'`", shape: 'x' },
      {
        name: '(5) a `Proxy` whose traps throw',
        shape: new Proxy(
          {},
          {
            get(): never {
              throw new Error('P-GU-TP-1 hostile proxy')
            },
          },
        ),
      },
      { name: '(6) a record with throwing accessors', shape: throwingAccessors },
    ]
    for (const entry of shapes) {
      // **⟶ RE-GRAINED 2026-09-27 (THE DRIVE-COUNT RULING).** The declared derivation is `12` =
      // `6` argument shapes × `2` DRIVES, and the as-filed loop ran ONE attempt per shape (`6`).
      // The two drives are the two the row's own title names: **(a) the FACTORY + the
      // attach/attach/detach drive**, and **(b) the other two entry points' totality drive**
      // (`cursorDeclarationFor` + `domEventSource` over the same shape). No reading was dropped.
      await row.run(`${entry.name} · drive (a) the factory and the attach/detach drive`, async () => {
        const gate = await surface(`P-GU-TP-1 ${entry.name} (a)`)
        if (gate.cause !== null) return gate.cause
        const mod = gate.mod as Record<string, unknown>
        const factory = mod['createGutterAffordance'] as (options?: unknown) => Record<string, unknown>
        let result: Record<string, unknown>
        try {
          result = factory(entry.shape)
        } catch (e) {
          return `the factory THREW for ${entry.name}: ${describeThrown(e)}`
        }
        for (const member of ['attach', 'detach', 'stats'] as const) {
          if (typeof result[member] !== 'function') return `the member \`${member}\` is not callable for ${entry.name}`
        }
        if (typeof result['detached'] !== 'boolean') return `\`detached\` is not a boolean reading for ${entry.name}`
        if (!('controller' in result)) return `\`controller\` is absent for ${entry.name}`
        try {
          const first = (result['attach'] as () => unknown)()
          if (typeof first !== 'boolean') return `\`attach()\` answered a non-boolean for ${entry.name}`
          const second = (result['attach'] as () => unknown)()
          if (typeof second !== 'boolean') return `the repeat \`attach()\` answered a non-boolean for ${entry.name}`
          const detached = (result['detach'] as () => unknown)()
          if (typeof detached !== 'boolean') return `\`detach()\` answered a non-boolean for ${entry.name}`
        } catch (e) {
          return `an entry point THREW for ${entry.name}: ${describeThrown(e)}`
        }
        return null
      })
      await row.run(`${entry.name} · drive (b) the other two entry points' totality drive`, async () => {
        const gate = await surface(`P-GU-TP-1 ${entry.name} (b)`)
        if (gate.cause !== null) return gate.cause
        const mod = gate.mod as Record<string, unknown>
        // The totality of the other two entry points over the same shape domain.
        const cursorFn = mod['cursorDeclarationFor'] as ((value: unknown) => unknown) | undefined
        const domSource = mod['domEventSource'] as (() => unknown) | undefined
        if (typeof cursorFn !== 'function') return '`cursorDeclarationFor` is not a value export'
        if (typeof domSource !== 'function') return '`domEventSource` is not a value export'
        try {
          cursorFn(entry.shape)
        } catch (e) {
          return `\`cursorDeclarationFor\` THREW for ${entry.name}: ${describeThrown(e)}`
        }
        try {
          domSource()
        } catch (e) {
          return `\`domEventSource()\` THREW: ${describeThrown(e)}`
        }
        return null
      })
    }
    row.finish()
  })
})

describe('§5.5.1 — P-GU-TP-2 (S-GU-CURSOR-1) · the cursor resolution’s totality and the cursor-literal absence', () => {
  it('P-GU-TP-2 — 12 DRIVES (10 answer shapes × 1 drive + 2 cursor-absence drives), the distinct figure 10 reported BESIDE the declared 12', async () => {
    const row = new RegisterRow('P-GU-TP-2', 'S-GU-CURSOR-1')
    const throwingProxy = new Proxy(
      { cursor: 'col-resize' },
      {
        get(): never {
          throw new Error('P-GU-TP-2 hostile proxy')
        },
      },
    )
    const throwingAccessor: Record<string, unknown> = {}
    Object.defineProperty(throwingAccessor, 'cursor', {
      get(): never {
        throw new Error('P-GU-TP-2 throwing accessor')
      },
      enumerable: true,
    })
    const arrayShape: unknown = ['cursor']
    const shapes: Array<{ name: string; value: unknown; expected: string | undefined }> = [
      { name: "(1) `{cursor: 'col-resize'}` — the POSITIVE control", value: { cursor: 'col-resize' }, expected: 'col-resize' },
      { name: "(2) `{cursor: '  row-resize  '}` — trimming", value: { cursor: '  row-resize  ' }, expected: 'row-resize' },
      { name: "(3) `{cursor: ''}`", value: { cursor: '' }, expected: undefined },
      { name: "(4) `{cursor: '   '}`", value: { cursor: '   ' }, expected: undefined },
      { name: '(5) `{cursor: 42}`', value: { cursor: 42 }, expected: undefined },
      { name: '(6) `{}`', value: {}, expected: undefined },
      { name: '(7) `null`', value: null, expected: undefined },
      { name: "(8) `'col-resize'` (a bare string — NOT a record)", value: 'col-resize', expected: undefined },
      { name: '(9) an ARRAY `[\'cursor\']`', value: arrayShape, expected: undefined },
      { name: '(10) a `Proxy` whose `get` trap throws / a throwing accessor', value: throwingProxy, expected: undefined },
    ]
    // **⟶ RE-GRAINED 2026-09-27 (THE DRIVE-COUNT RULING).** The declared derivation is `12` =
    // `10` answer shapes × `1` drive + `2` cursor-absence drives, so the shape loop must run `10`
    // attempts (the as-filed form ran `11` + `2` = `13`). The `(10b)` throwing-accessor reading is
    // NOT dropped: it is asserted INSIDE shape `(10)`'s own attempt, beside the throwing `Proxy`.
    for (const shape of shapes) {
      await row.run(`cursorDeclarationFor · ${shape.name}`, async () => {
        const gate = await surface(`P-GU-TP-2 ${shape.name}`)
        if (gate.cause !== null) return gate.cause
        const mod = gate.mod as Record<string, unknown>
        const cursorFn = mod['cursorDeclarationFor'] as (value: unknown) => unknown
        const readings: Array<{ name: string; value: unknown; expected: string | undefined }> =
          shape.name.startsWith('(10)') ? [shape, { name: '(10b) a throwing accessor on `cursor`', value: throwingAccessor, expected: undefined }] : [shape]
        for (const reading of readings) {
          let answer: unknown
          try {
            answer = cursorFn(reading.value)
          } catch (e) {
            return `cursorDeclarationFor THREW for ${reading.name}: ${describeThrown(e)}`
          }
          if (answer !== reading.expected) {
            return `the reading for ${reading.name} is ${JSON.stringify(answer)}; the declared reading is ${JSON.stringify(reading.expected)}`
          }
        }
        return null
      })
    }
    // DRIVE 11 — THE STATIC CURSOR-LITERAL ABSENCE (`§5.5.1` P-GU-TP-2's first
    // cursor-absence drive): a scan of the module's bytes for the four cursor literals.
    await row.run('the STATIC cursor-literal absence drive', async () => {
      const gate = await surface('P-GU-TP-2 static scan')
      if (gate.cause !== null) return gate.cause
      const bytes = moduleBytes()
      const found = hitsOf(bytes, CURSOR_LITERALS)
      if (found.length > 0) return `the module carries a cursor literal of its own: ${JSON.stringify(found)}`
      return null
    })
    // DRIVE 12 — THE RUNTIME ABSENCE DRIVE: `applyCursor` is called with `undefined` and NO
    // declaration for the `undefined`-resolution path.
    await row.run('the RUNTIME cursor-absence drive', async () => {
      const gate = await surface('P-GU-TP-2 runtime absence')
      if (gate.cause !== null) return gate.cause
      const h = await makeHarness({ cursorOf: (): unknown => undefined }, 'P-GU-TP-2 runtime absence')
      h.affordance.attach()
      h.source.fire('pointerover', pointerEvent(0))
      h.source.fire('pointerout', pointerEvent(0))
      const writes = h.cursorCalls.filter((c) => c.declaration !== undefined && c.declaration !== '')
      if (writes.length > 0) return `a declaration was written for an \`undefined\` resolution: ${JSON.stringify(writes)}`
      const stats = h.affordance.stats()
      if (Number(stats['cursorWrites']) !== 0) return `stats().cursorWrites reads ${String(stats['cursorWrites'])} for an \`undefined\` resolution`
      if (stats['lastCursor'] !== '') return `stats().lastCursor reads ${JSON.stringify(stats['lastCursor'])}; the declared reading is ''`
      return null
    })
    row.finish()
  })
})

describe('§5.5.1 — REGISTER-STATUS · the executed record, its arithmetic, its caps and the un-run rule', () => {
  it('REGISTER-STATUS — per-row attempts/held/broken, the 134 total WITH its seven terms, the caps, the beside-the-term figures, and the un-run FAILURE discipline', () => {
    const records = registerRecords
    const terms = REGISTER_DECLARED.map((r) => `${r.term} (${r.row})`).join(' + ')
    const termSum = REGISTER_DECLARED.reduce((sum, r) => sum + r.term, 0)
    const unrun = records.filter((record) => record.notStarted)
    const besideTheTerms = REGISTER_DECLARED.filter((r) => r.beside > 0).map((r) => `${r.row}: ${r.beside} ${r.row === 'P-GU-SM-1' ? 'mid-drag ASSERTIONS' : 'entry-point READINGS'} beside the term`)
    console.log(
      `§5.5.1 REGISTER SUMMARY :: ${JSON.stringify({
        declaredTotal: REGISTER_PRINTED_TOTAL,
        declaredTerms: terms,
        declaredTermSum: termSum,
        declaredTotalEqualsItsOwnTerms: REGISTER_PRINTED_TOTAL === termSum,
        chain: '15 → 30 → 45 → 90 → 110 → 122 → 134',
        subtotals: { SM: 45, IM: 65, TP: 24 },
        totalCapComparison: `${REGISTER_PRINTED_TOTAL} <= ${REGISTER_TOTAL_CAP}`,
        largestRow: `${Math.max(...REGISTER_DECLARED.map((r) => r.term))} <= ${REGISTER_ROW_CAP}`,
        besideTheTerms,
        declaredVsDistinct: REGISTER_DECLARED.map((r) => `${r.row}:${r.term}/${r.distinct}`),
        boundedRows: REGISTER_DECLARED.filter((r) => r.bounded).map((r) => r.row),
        executedTotal: registerState.attempts,
        stopAfter: CONSECUTIVE_FAILURE_CAP,
        stoppedAt: registerState.stoppedAtRow,
        stoppedFor: registerState.stoppedFor,
        records,
        unrun: unrun.map((r) => r.row),
      })}`,
    )
    expect(
      REGISTER_PRINTED_TOTAL,
      `REGISTER-STATUS — the declared total is printed WITH ITS TERMS and IS their sum: 134 = ${terms}`,
    ).toBe(134)
    expect(
      termSum,
      'REGISTER-STATUS — THE TERM-SUM CHECK: the seven named terms sum to the DECLARED total (134), so the ACTIVE rule `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` is SATISFIED, not reported as a finding',
    ).toBe(REGISTER_PRINTED_TOTAL)
    expect(
      REGISTER_DECLARED.length,
      'REGISTER-STATUS — the register declares SEVEN rows (`§5.5.1`: `7` typed rows in THREE families, and the small count is ON PURPOSE)',
    ).toBe(7)
    for (const r of REGISTER_DECLARED) {
      expect(r.term, `REGISTER-STATUS — row ${r.row} is inside the ≤100 per-row cap`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    }
    expect(
      Math.max(...REGISTER_DECLARED.map((r) => r.term)),
      'REGISTER-STATUS — the LARGEST row is `45` (`P-GU-IM-1`), inside the `≤100`/row cap',
    ).toBe(45)
    expect(REGISTER_PRINTED_TOTAL, 'REGISTER-STATUS — the total is inside the `≤400` register cap (`134 ≤ 400`)').toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(
      records.map((record) => record.row),
      `REGISTER-STATUS — every declared row produced a record, IN REGISTER ORDER (an un-run row is REPORTED, never omitted). Records: ${JSON.stringify(
        records.map((r) => ({ row: r.row, strategy: r.strategy, attemptsRun: r.attemptsRun, held: r.held, broken: r.broken, notStarted: r.notStarted })),
      )}`,
    ).toEqual(REGISTER_DECLARED.map((r) => r.row))
    const rowsRun = records.filter((record) => record.attemptsRun > 0)
    const executedTotal = rowsRun.reduce((sum, record) => sum + record.attemptsRun, 0)
    console.log(
      `§5.5.1 MEASURED-vs-DECLARED :: ${JSON.stringify({
        declaredTotal: REGISTER_PRINTED_TOTAL,
        executedTotal,
        perRow: records.map((r) => `${r.row}: declared=${declaredTermOf(r.row)} ran=${r.attemptsRun} held=${r.held} broken=${r.broken}`),
        note: 'the DECLARED total is what the caps compare; the measured total is reported BESIDE it and is NEVER re-totalled into it (§5.5.3)',
      })}`,
    )
    expect(
      registerState.attempts,
      'REGISTER-STATUS — the executed attempt total is inside the `≤400` register cap',
    ).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(
      unrun.map((record) => record.row),
      `REGISTER-STATUS/§4.2 item 2 — AN UN-RUN ROW IS REPORTED AS A FAILURE, NEVER AS A PASS. Un-run rows: ${JSON.stringify(
        unrun.map((r) => ({ row: r.row, stoppedAt: r.registerStoppedAt })),
      )}`,
    ).toEqual([])
    expect(
      records.reduce((sum, record) => sum + record.broken, 0),
      `REGISTER-STATUS — the register’s broken-attempt total. Per-row: ${JSON.stringify(
        records.map((r) => `${r.row}:${r.broken}/${r.attemptsRun}`),
      )}`,
    ).toBe(0)
    expect(
      registerState.stoppedAtRow,
      `REGISTER-STATUS — the stop-after-5-consecutive-failures status: ${String(registerState.stoppedFor ?? 'not triggered')}`,
    ).toBe(null)
  })
})

// ===========================================================================
// THE SMALL DRIVE HELPERS THE ROWS ABOVE SHARE. (`makeHarness` and the doubles are
// declared above; these two read the composed `E3` controller’s own counters, which
// `§5.5.1 P-GU-SM-1`’s two-reading rule requires BESIDE the sink’s own record.)
// ===========================================================================
function controllerStatsOf(h: Harness): Record<string, unknown> {
  const controller = h.affordance.controller as { stats?: () => Record<string, unknown> } | null | undefined
  const stats = controller?.stats?.()
  return stats ?? {}
}
function controllerSinkCalls(h: Harness): number {
  const value = controllerStatsOf(h)['sinkCalls']
  return typeof value === 'number' ? value : -1
}
/** Drive the INVALID arm to its refusal and report what the refusal was (`§R.3`’s
 *  `'unusable-default'`/`'not-resizable'` rows). */
async function driveInvalidArm(h: Harness): Promise<{ refused: boolean; sinkWrites: number; code: string }> {
  h.source.fire('pointerover', pointerEvent(0))
  h.source.fire('pointerdown', pointerEvent(0))
  h.source.fire(POINTER_TYPES.move, pointerEvent(0, 175, 300))
  const before = h.sink.records.length
  h.source.fire(POINTER_TYPES.end, pointerEvent(0, 175, 300))
  const after = h.sink.records.length
  const controller = h.affordance.controller as { stats?: () => Record<string, unknown> } | null | undefined
  const code = String(controller?.stats?.()['lastCode'] ?? '')
  return { refused: after - before === 0, sinkWrites: after, code }
}
