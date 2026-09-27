// tests/fixtures/pane-mutation-fixture.d.ts — TYPE-ONLY declaration for the
// plain-data fixture `pane-mutation-fixture.mjs` (the leg
// `npm run typecheck:tests` compiles `tests/**/*.ts`, and the `.mjs` fixture is
// outside the TS graph — `allowJs` is off — so importing it raised TS7016
// "Could not find a declaration file").
//
// NOTHING HERE IS EXECUTED: `vitest.config.ts` includes only
// `tests/**/*.test.ts`, and this file declares types only. The fixture's
// runtime bytes are untouched, so no importing row's behaviour changes.
//
// The shapes below mirror the fixture's own authored data exactly (one
// `targetProp`/`mode`/`value` element per mutation builder; `value` is OPTIONAL
// because PF-2/PF-4 build a removal — `{ targetProp, mode }` with an explicit
// `undefined` or an absent `value` key).

/** The fixture's authored ids (suite vocabulary, never shipped). */
export const PANE_NODES: Readonly<{
  journalLengthInput: string
  toggleRead: string
  siblingToggle: string
}>

/** One injected mutation element (`paneMutationValid`'s shape). */
export interface PaneMutationElement {
  targetProp?: unknown
  mode?: string
  value?: unknown
}

/** PF-1: the DEFINED control — the write applies and the value changes. */
export function definedValueMutation(value?: string, mode?: string): PaneMutationElement[]
/** PF-2: an explicit `undefined` — a legitimate removal, APPLIED. */
export function undefinedValueMutation(): PaneMutationElement[]
/** PF-3: an explicit `null` — applied (`null` !== `undefined`). */
export function nullValueMutation(): PaneMutationElement[]
/** PF-4: the `value` KEY ABSENT — the same removal as an explicit `undefined`. */
export function absentValueKeyMutation(): PaneMutationElement[]
/** PF-5: a SHAPE-malformed element (non-object). */
export function malformedNonObjectMutation(): unknown[]
/** PF-5's second shape (an element missing `targetProp`). */
export function malformedMissingTargetPropMutation(): PaneMutationElement[]
/** PF-5's third shape (a non-string `targetProp`). */
export function malformedNonStringTargetPropMutation(): PaneMutationElement[]
/** PF-6/PF-8: the shipped `props.data-on` write. */
export function shippedToggleMutation(value?: string): PaneMutationElement[]
/** PF-7: the sibling-pane write. */
export function siblingDefinedMutation(value?: string): PaneMutationElement[]

/** The fixture's own fixed 8-row register (PF-1..PF-8). */
export function paneFixtureRows(): Array<{
  id: string
  label: string
  node: string
  state: string
  failState: string
  build: () => unknown[]
}>
