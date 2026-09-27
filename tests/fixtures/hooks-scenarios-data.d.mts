// tests/fixtures/hooks-scenarios-data.d.ts — TYPE-ONLY declaration for the
// plain-data fixture `hooks-scenarios-data.mjs` (the leg
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

/** S1/S2 — the hooks-scenario envelope (theme switcher, hook probes). */
export function hooksScenariosEnvelope(): LegacyInitialData
