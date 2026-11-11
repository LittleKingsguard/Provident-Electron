// src/shared/tabs-landing.ts — THE LANDING ENTRY'S ID, ONE SPELLING FOR BOTH REALMS (`D-210`).
//
// WHY THIS FILE EXISTS AT ALL, AND WHY IT IS `shared/` RATHER THAN `main/`. The tab record's landing entry has an ID, and
// the TWO realms that have to agree on it are the main process (which seats the row, names it in `order` and derives
// `read()`'s `landing` member from the row reading active — `src/main/tabs-record/index.ts`) and the renderer (which decides
// whether the landing TERMINAL stands, and must compare the active row's id against the entry's id and not against the
// derivation of itself — `src/renderer/tabs-client.ts`). **The main-side module cannot supply that value to the renderer**:
// a VALUE import of it pulls `node:util` into the browser bundle and `npm run build` dies on it, measured twice at `D-210`,
// and every existing renderer→main import in this tree is `import type` and erases. `src/shared/` is the one subtree both
// realms import as VALUES, so the spelling lives here — and it is ONE literal, because a second one in a client is the
// rename that half-lands (`D-76`).
//
// IT IMPORTS NOTHING, AND THAT IS THE POINT: no `node:` specifier, no runtime, nothing to resolve in a browser build. The
// precedent is `src/shared/view-shape.ts` — a record's vocabulary in the shared subtree, re-exported by its main-side
// module rather than re-spelled by it (`D-88`).

/** **THE LANDING ENTRY'S ID** — `'landing'`. It is ONE value read at three sites that must never disagree: the id the
 *  landing ROW carries, the key its own leaf `['tabs','landing']` is seated at, and the `order` member that names it
 *  (`D-75`, `D-76`). The main-side module derives both its address and its exported `TABS_LANDING_ID` from THIS constant
 *  and the renderer's client imports the same one, so the derivation `read()` answers and the entry the client compares
 *  against cannot drift apart.
 *
 *  **IT IS NOT THE PAGE NODE AND NOT A CONTENT TARGET**: `src/shared/demo-envelope.ts`'s `TABS_LANDING_PAGE_ID` authors the
 *  landing page NODE and stays `'tabs-landing-page'`, and the main-side module's content fallback points a blank `target` at
 *  that authored page rather than at this id, because `'landing'` names no authored node at all. Four spellings shared these
 *  letters before `D-76`'s move, and exactly one of them — this entry's id — changed. */
export const TABS_LANDING_ENTRY_ID = 'landing'
