// tests/fixtures/handlers-scenarios-data.d.ts — TYPE-ONLY declaration for the
// plain-data fixture `handlers-scenarios-data.mjs` (the leg
// `npm run typecheck:tests` compiles `tests/**/*.ts`, and the `.mjs` fixture is
// outside the TS graph — `allowJs` is off — so importing it raised TS7016
// "Could not find a declaration file").
//
// NOTHING HERE IS EXECUTED: `vitest.config.ts` includes only
// `tests/**/*.test.ts`, and this file declares types only. The fixture's
// runtime bytes are untouched, so no importing row's behaviour changes.
//
// The declared return type is the REAL contract the consumers rely on: the
// builders return an original-format envelope (`translateLegacy`'s input), and
// every consumer hands them to `Runtime.loadEnvelope`/`Runtime.load`
// (`src/renderer/runtime.ts:349/402`), both of which take `LegacyInitialData`.
import type { LegacyInitialData } from 'provident-ssr'

/** S1 — the auth-dropdown envelope; `userData` drives the signed-in branch,
 *  `prefix` the authored ids (the fixture's own signature). */
export function userAuthEnvelope(userData: unknown, prefix: string): LegacyInitialData

/** Scenarios 2–10 — one self-contained envelope (a card per scenario). */
export function mainEnvelope(): LegacyInitialData

/** All three envelopes, keyed by mount. */
export function handlersScenariosEnvelopes(): {
  anon: LegacyInitialData
  alice: LegacyInitialData
  main: LegacyInitialData
}
