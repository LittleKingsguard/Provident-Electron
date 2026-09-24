# Green Scenarios — A3 CI Divergence Leg + `code.load` Teardown Pin

Status: **GREEN-SCENARIO SET** — to be attempted during the blind-test loop.
Each scenario below is a behavior `docs/specs/ci-divergence-leg.md` claims; the
blind-test agent runs it against the live harness/units and confirms it
PASSES. A failure is a doc bug OR an un-hardened regression — never a pass.

## D1 — the repeatable divergence harness (A3-a)

1. `npm run divergence` builds + runs `scripts/electron-divergence.mjs`; it
   exits 0 only if EVERY structural check matches (census inTree, census
   registered, dirtied ids normalized, SSR fragment structural, data-node-id
   set, nodeId vocabulary, counter increment in BOTH, non-empty dispatch
   results) — `R13 RESULT: 9 checks, 0 failures`, **N = 9 is a PIN**
   (`docs/specs/ci-divergence-leg.md` §5). *(This line read "`N` ≥ 9" until
   2026-09-27: **corrected by the repo-wide documentation audit** — `N ≥ 9`
   was the pre-pin form and it is the stale half `gemma4-blind-expected.md`'s
   `S32` already records as a trap. Superseded, not deleted.)*
2. The harness drives the REAL Electron app (real DOM) over stdio + the
   DOM-shim battery host with the SAME demo envelope + dispatch, then compares.
3. The harness is **HERMETIC IN THE ISOLATION SENSE (corrected 2026-09-27,
   `H-r19`)**: a temp `userData` profile, no network, no writes outside the
   temp dir — **and headlessness is NOT claimed** (the leg needs a `DISPLAY`;
   see `docs/specs/ci-divergence-leg.md`'s two-part truth). A
   `--mcp-transport=stdio` spawn; the client disconnect ends stdin → the app
   exits, no lingering process. *(This line claimed bare "hermetic" until
   2026-09-27; that was the same false claim `H-r19` corrected in the spec.)*
4. A mismatch on any check → exit 1 with a per-check `✗` report.

## D2 — the `code.load` teardown pin (A3-b, Runtime unit)

5. After a dispatch that generates pass-2 work, `codeLoad()` (a re-derive)
   leaves `hasPendingWork() === false` (the teardown-then-load drains — the
   `loadEnvelope` path's destroy cascade is settled).
6. `loadEnvelope(env, {userData:{username:'alice'}})` (dispatch sees alice) →
   `codeLoad(otherEnv)` (no userData) → a dispatch on the same handler shape
   sees `ANON`, NOT `alice` (the fresh-supervisor rebuild clears userData; no
   leak into the `code.load` re-derive).
7. `code.load`'s teardown IS `provident.teardown`: after a `codeLoad`, the
   graph is in the SAME root-only-then-loaded state as a `provident.teardown`
   followed by a `provident.load` (the census reflects the new load, not a
   half-torn-down mix).

## How the blind-test uses this

- The blind-test agent reads ONLY `docs/specs/ci-divergence-leg.md` (+ this
  file's claims) and runs `npm run divergence` + the `tests/runtime-battery
  .test.ts` A3-b unit, asserting PASS.
- The green set is the regression net for A3: D1→1–4 (the divergence harness),
  D2→5–7 (the code.load teardown pin).