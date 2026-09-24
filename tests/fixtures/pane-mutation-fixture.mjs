// tests/fixtures/pane-mutation-fixture.mjs — the PANE TEST FIXTURE of
// docs/specs/engine-pin.md §2.4a (`U-ENGINE-PIN`, ruling 2: "Add test panes to
// the suite for testability"), the data half of the rows `PF-1..PF-8`
// (spec §2.4a, §4.1 R-13, §5.5 `P-SM-3` / `S-TAB-PANE-1`).
//
// WHY THIS FILE EXISTS. The pane-managed channel's predicate
// (`paneMutationValid`) must be driven with a DEFINED value, an explicit
// `undefined`, an explicit `null`, an ABSENT `value` key and a SHAPE-malformed
// element. Before ruling 2 that was impossible: `SecurePanels.syncConfig()` is
// private, both shipped writes it builds are DEFINED strings
// (`src/renderer/secure-panels.ts:352`, `:355`), and no test referenced the
// predicate — so any pane green would have been a false green (the adversarial
// pass's `H-02`, `docs/specs/engine-pin-greens.md:171`). Ruling 2 answers it
// with (a) this suite-owned fixture and (b) one documented test-only injection
// point on the pane host: `SecurePanels.applyPaneMutation(nodeId, mutation)`
// (spec §2.4a, adopted option 3) — the ONE production seam the amendment
// authorises, recorded as such in the spec (§7.9).
//
// WHAT THE FIXTURE IS, EXACTLY (read this before citing it). §2.4a's normative
// list is "**What the fixture must be able to inject**" — the seven items are
// MUTATION variants, and §2.4a's row table (`PF-1..PF-8`) is a mutation table.
// This file therefore carries:
//   (i)   the SUITE-OWNED authored ids the rows address (the vocabulary
//         `SecurePanels` itself uses — it addresses pane nodes by authored
//         `props.id`, `src/renderer/secure-panels.ts:340`, read; spec §4.2's
//         pane exception), and
//   (ii)  the MUTATION TABLE the rows inject — a defined value, an explicit
//         `undefined`, an explicit `null`, an absent `value` key, three
//         SHAPE-malformed forms, the shipped write's own shape, and the
//         sibling-pane control.
//
// The ids resolve against the REAL pane graph the shipped `SecurePanels`
// renders (`src/renderer/secure-panels.ts:131-217`, read): `journal-length-input`
// (a VALUE_FORMS `input`), `toggle:read` (the shipped `props.data-on` write) and
// its in-pane siblings `toggle:dispatch` / `toggle:graph` / `token-input` (the
// "other panes and other props untouched" observables, §2.4a (vi)/(vii)). The
// rows drive THAT graph through the one documented injection seam — the seam
// ruling 2 added, and the only route the ruling authorises (`syncConfig` is
// private and stays private).
//
// RECORDED, NOT HIDDEN (§2.4a's option table, adopted-fixture row): the fixture
// authors no SECOND pane graph and no `SecurePanels` constructor argument. The
// "authored pane/envelope used only by the suite" half is realised as SUITE-OWNED
// IDS + MUTATIONS against the shipped pane graph, because a suite-local envelope
// would need either a new constructor seam (which §2.4a explicitly did NOT
// choose: "the alternative the architect weighed — adding a pane-*injection*
// argument to the constructor — was not chosen because it changes the shipped
// constructor signature") or a call into the class's private `render()`, which
// would be inventing a seam the spec does not name. No alternative seam is
// invented here, and `src/**` is not touched by this file.
//
// PROHIBITION CHECK (spec §0, the six-prohibition block). This file is TEST
// DATA, not a shipped pane: it adds no `src/` surface, no exported identifier,
// no consumer vocabulary (prohibition 1 — the ids are the SUITE's own),
// no authored UI content in SHIPPED data (prohibition 2 — §0 exemption: "The
// pane fixture's authored envelope lives in `tests/fixtures/` and is test data,
// not a shipped pane"), no default value (3), no store/persistence (4), no MCP
// surface (5), and every row it carries is falsifiable in the node suite (6).
// It is the same suite-only-data shape the repo already uses for
// `tests/fixtures/hooks-scenarios-data.mjs` and
// `tests/fixtures/handlers-scenarios-data.mjs` (read).
//
// Data-only: pure object builders + plain mutation objects; NO imports, no
// DOM, no engine access.

// ---- the fixture's authored ids (suite vocabulary, never shipped) ----------
export const PANE_NODES = Object.freeze({
  /** The VALUE_FORMS control the removal rows act on. */
  journalLengthInput: 'journal-length-input',
  /** The shipped `props.data-on` write's node (`secure-panels.ts:352`). */
  toggleRead: 'toggle:read',
  /** The SIBLING PANE node's toggle — its observable must not move when the
   *  target node is written (§2.4a (vi), PF-7). */
  siblingToggle: 'toggle:dispatch',
})

// ---- the mutation builders (each row names its own state) ------------------
/** PF-1: the DEFINED control — the write applies and the value changes. */
export function definedValueMutation(value = '7', mode = 'replace') {
  return [{ targetProp: 'props.value', mode, value }]
}

/** PF-2: an explicit `undefined` — a legitimate removal, APPLIED (ruling 1). */
export function undefinedValueMutation() {
  return [{ targetProp: 'props.value', mode: 'replace', value: undefined }]
}

/** PF-3: an explicit `null` — applied; `null` !== `undefined`, so on a
 *  VALUE_FORMS tag the adapter stringifies rather than clearing (AF-7
 *  boundary, spec §2.4a PF-3): the row asserts the pass-through verdict and
 *  "the prior value is not retained", NOT the serialized form. */
export function nullValueMutation() {
  return [{ targetProp: 'props.value', mode: 'replace', value: null }]
}

/** PF-4: the `value` KEY ABSENT — the same removal as an explicit `undefined`
 *  (AF-7: `applyPropSlice` builds `{props:{[key]: undefined}}`). */
export function absentValueKeyMutation() {
  return [{ targetProp: 'props.value', mode: 'replace' }]
}

/** PF-5: a SHAPE-malformed element (non-object). The pane half's reject path
 *  must skip that node's batch WHOLE and re-render last-known (§2.4, M8). */
export function malformedNonObjectMutation() {
  return [null]
}

/** PF-5's second shape (an element missing `targetProp` — M3's shape). */
export function malformedMissingTargetPropMutation() {
  return [{ mode: 'replace', value: 'x' }]
}

/** PF-5's third shape (a non-string `targetProp` — M3's other shape). */
export function malformedNonStringTargetPropMutation() {
  return [{ targetProp: 42, mode: 'replace', value: 'x' }]
}

/** PF-6: the SHIPPED write's shape, injected — `props.data-on: 'false'` on
 *  `toggle:read` (`src/renderer/secure-panels.ts:352` writes exactly this shape
 *  and exactly these two literals). Proves the fixture drives the REAL channel
 *  and not only the removal path. */
export function shippedToggleMutation(value = 'false') {
  return [{ targetProp: 'props.data-on', mode: 'replace', value }]
}

/** PF-7: a DEFINED write against a SIBLING pane node (the control that must
 *  remain untouched by the nullish call). Applied to `toggle:dispatch`, so the
 *  control lives in the second pane's own node. */
export function siblingDefinedMutation(value = 'true') {
  return [{ targetProp: 'props.data-on', mode: 'replace', value }]
}

/** The fixture's fixed row table, in FIXED ORDER (§5.5 `S-TAB-PANE-1`) — the
 *  eight rows `PF-1..PF-8`, each naming its state, its fail-state and its
 *  observable. `build()` is deliberately a FUNCTION so no row can mutate
 *  another row's data. */
export function paneFixtureRows() {
  return [
    {
      id: 'PF-1',
      label: 'defined value applies and the value slot changes',
      node: PANE_NODES.journalLengthInput,
      state: 'defined',
      failState: 'none (the control — a failure voids every other PF-row)',
      build: () => definedValueMutation('7'),
    },
    {
      id: 'PF-2',
      label: 'explicit undefined PASSES THROUGH — applied, the prior value is gone, no throw',
      node: PANE_NODES.journalLengthInput,
      state: 'undefined',
      failState: 'a `{status:"rejected"}` here is the superseded pre-amendment semantics',
      build: () => undefinedValueMutation(),
    },
    {
      id: 'PF-3',
      label: 'explicit null PASSES THROUGH — applied, the prior value is not retained',
      node: PANE_NODES.journalLengthInput,
      state: 'null',
      failState: 'a rejection here is the superseded semantics',
      build: () => nullValueMutation(),
    },
    {
      id: 'PF-4',
      label: 'an ABSENT value key is the same removal as an explicit undefined (AF-7)',
      node: PANE_NODES.journalLengthInput,
      state: 'value-key-absent',
      failState: 'a rejection here is the superseded semantics',
      build: () => absentValueKeyMutation(),
    },
    {
      id: 'PF-5',
      label: 'a SHAPE-malformed element skips the node batch whole; last-known state still rendered',
      node: PANE_NODES.journalLengthInput,
      state: 'shape-malformed',
      failState: 'anything other than `{status:"rejected", applied:false}` with the batch skipped whole',
      build: () => malformedNonObjectMutation(),
    },
    {
      id: 'PF-6',
      label: "the SHIPPED write's shape (props.data-on) renders",
      node: PANE_NODES.toggleRead,
      state: 'shipped-shape',
      failState: 'none (the fixture must drive the real channel, not only the removal path)',
      build: () => shippedToggleMutation('false'),
    },
    {
      id: 'PF-7',
      label: 'a nullish write on one pane leaves the sibling pane untouched',
      node: PANE_NODES.journalLengthInput,
      state: 'sibling-control',
      failState: 'any movement in the sibling pane node or the target node\'s other props',
      build: () => undefinedValueMutation(),
    },
    {
      id: 'PF-8',
      label: 'a repeated nullish write is idempotent (applied, state identical)',
      node: PANE_NODES.journalLengthInput,
      state: 'idempotent-repeat',
      failState: 'a different verdict/state on the second call',
      build: () => undefinedValueMutation(),
    },
  ]
}
