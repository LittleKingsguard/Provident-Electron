# Provident-Electron — strata design brief

- **Layer:** L0 · **Rev:** 1 · **Date:** 2026-10-29 · **Branch:** `strata` (D-6)
- **Status:** BOOTSTRAP — filed with `decisions.md` D-1..D-7; `ASM-1`..`ASM-3` (§8) await the user's disposition
- **Scope:** the strata bootstrap and the archive of the gate corpus; no module design, no code
- **Ceiling:** 150 lines (class max); at the ceiling split by owner — never append (D-1, D-2)

## 0. What this repository is, and why the regime changed

An Electron app whose renderer **is** a `provident-ssr` producing process — the graph is
authoritative and the HTML is a view re-emitted on demand (`src/renderer/runtime.ts:1-9`) — with a
main-process MCP server exposing that graph to agents over stdio or Streamable HTTP
(`src/main/mcp-server.ts:1-8,576-599`).

Two goals stand. It is the **implementation test** of `provident-ssr` and of the sibling
`provident-storeroom`: a finding is recorded, never patched, and the package is never modified
(D-5). It is also a **prebuild baseline** for Electron apps on that framework, so the MCP surface,
the gate, both transports and the renderer bridge are deliverable inheritance, while the demo
envelope is replaced by whoever forks it.

It ran under the gate workflow from inception. That corpus reached 219 tracked files and 20 MB, and
the user's finding is that the accumulation now slows development (D-1). The strata workflow
replaces it with three record kinds, hard per-class ceilings and provenance-or-silence (§1).

## 1. Record kinds, and the rule that keeps them small (D-1, D-2)

| Kind | Owner | Write rule | Ceiling |
|---|---|---|---|
| State | scripts only, never prose (`strata-state`) | overwritten at every transition | 40 lines |
| Design | exactly one layer (§3) | replaced on revision; git is the history | 150 lines |
| Decisions | L0 only (`decisions.md`) | append-only, id'd `D-n`, user-sourced, never reworded | 40 lines per row |

Provenance attaches to a statement — a bullet, a table row or a paragraph — and a normative line
carrying no `D-n` or § is a lint failure, not a style opinion (D-1). A superseded artifact is
replaced, never annotated; the as-filed copy is cited by path under the archive prefix (§7, D-2).

## 2. The app as it stands (measured 2026-10-29)

| Fact | Value | Cite |
|---|---|---|
| MCP tools registered | **27** in `ALL_TOOLS` | `src/main/mcp-server.ts` (`ALL_TOOLS`) |
| MCP resources | **3** — 2 fixed URIs + 1 template | `src/main/mcp-server.ts:638-642` |
| Gate groups | **6** — `read`, `dispatch`, `graph`, `code`, `module`, `data`; default grant `['read','dispatch']` registers **8** tools, 13 with `data` | `src/main/security.ts` (`TOOL_GROUPS`, `VALID_GROUPS`), `src/main/operator-settings/index.ts:112` (the second live copy, `security-store.ts` having been deleted — D-16) |
| Transports | Streamable HTTP on `127.0.0.1:3787` (stateless, token-gated, push is a no-op) and stdio (long-lived, push-capable) | `src/main/mcp-server.ts:1097-1117,746-773` |
| Packages consumed and pinned | `provident-ssr ^0.5.1`, `provident-storeroom ^1.6.1` | `package.json:25-26` |
| The storeroom seam | **two** imports of the package — the seam (`src/main/storeroom.ts`, declared surface census `14` members / `11` symbols) and the operator-settings instance (`src/main/operator-settings/index.ts:37`, D-16); the central store writes its own `<userData>/provident-profile.json` | `src/main/storeroom.ts`, `src/main/operator-settings/index.ts`, `docs/L2/central-data/persistence.md` §3 |
| UI authority | every element outside the Electron shell's own chrome is provident data driven through the graph, never hand-written DOM; one rendered outside it is invisible to `dispatch`, `get_rendered_html` and `get_markdown` | `src/shared/demo-envelope.ts:1-18`; §2 charter (`archive/gate-corpus-2026-10-29/AGENTS.md:22-34`) |
| Source files | **47** TypeScript files under `src/` | glob `src/**/*.ts` |

## 3. The layers (D-1, D-3)

| Layer | Responsibility | Owns (writes) | Exit condition |
|---|---|---|---|
| L0 | user interface: brief, decisions, exit walkthrough, reporting | `strata/brief.md`, `strata/decisions.md` | walkthrough green, then the user accepts |
| L1 | e2e technical design: module map, module interactions, e2e battery | `docs/L1/`, `tests/e2e/`, `strata/modules.json` — the first two created on first write | e2e battery green, adversarially reviewed |
| L2 | integration design: each module's I/O surface and behaviour | `docs/L2/<module>/`, `tests/integration/<module>/` | integration battery green |
| L3 | module design: structure, signatures, pseudocode, guardrail notes | `docs/L3/<module>/` (the design and its `signatures.md` stubs), `tests/unit/<module>/` | unit battery green |
| L4 | line implementation, one shot | source files of its module | unit battery green, or fail early |

A lower layer may read upward artifacts and never writes them (D-3). At and below L3 an agent is
provisioned one module and no sibling's docs or code (`modules.md` §1, D-1).

## 4. The loop (D-1, D-4)

A layer examines the artifact the layer below produces; feedback travels down as narrowed detail on
the same artifact id, never as a re-derivation. L4 receives pseudocode, signatures, guardrail notes
and the exact command that must go green; L4 owns no design, so inability to reach green bubbles to
L2. Examiners validate the battery before examining code, diagnose root cause and never supply a
patch. Repeat failure escalates to a rebuild (`rebuild.md`). A lower layer that asks for adjudication
is answered and counted as a failure (D-1).

## 5. The current unit (D-7)

`settings-carrier-retirement` (closed) and behind it `central-data-management`, the central store over
`provident-storeroom`. The import
is landed (`f349549`, `4e404e2`, `1cab040`); the implementation beyond the seam is pending and no
design is admitted until L1 files the module map. Its state is `strata/.strata/units/
central-data-management.json`; the branch state is D-7.

The seam's own boundary is the constraint the unit inherits: nothing it builds may be a storeroom
package change (D-5), and nothing in the seam today is exposed over MCP, rendered or persisted
(`src/main/storeroom.ts:9-21`).

**Declared long-term goal, sequenced behind the map:** the flat `tests/**/*.test.ts` suite migrates into
`tests/{e2e,integration/<module>,unit/<module>}/` **after** L1 files the map and modules claim their
paths — per module, at claim time, never wholesale ahead of it (D-10). Until then the flat suite stands
as filed, and `ASM-1`'s adoption of it is interim.

## 6. Instruments at this head (measured 2026-10-29, this seat)

| Instrument | Reading | What it can see |
|---|---|---|
| `npm test` | `2 failed / 3,175 passed / 2 skipped` of `3,179`, over `112` test files (89 flat + 23 nested) | pure-module and main-process behaviour under the DOM shim |
| `npm run typecheck` | clean (`0` errors) | `src/**/*.ts` only — never a test file |
| `npm run typecheck:tests` | clean (`0` errors) | the whole `tests/**/*.ts` tree at the unit leg's strictness |
| `npm run build` | OK — main, preload, standalone, battery host, renderer | the bundles exist at all |
| `npm run battery`, `npm run divergence`, `npm run ui` | not run in this pass; `ui` needs a `DISPLAY` | contract-over-stdio; shim-vs-real identity on 9 surfaces; one real-DOM measurement |

The layer rule every later claim inherits: a node-suite green is **envelope-green and never
app-green** — no window, no IPC, no transport is exercised by `npm test` (D-1; §3's L1 exit).
The two red rows are `tests/store-tabs-record.test.ts` §4.2 item 7 (`P-7`, the un-run live battery) and
§4.2 item 8 (`REG-EXEC`, the register's broken attempts) — both long-standing, neither new to this
head. The third the gate-era corpus carried, `tests/store-core-graph.test.ts` §5.1, was retired with
its referent when the corpus was archived (D-9), so the known-red set is now two (D-1 §6).

## 7. The archive (D-2)

The gate corpus is at `archive/gate-corpus-2026-10-29/`, tree preserved: `brief/`, `specs/`,
`decisions.md`, `defects.md`, `defects-history.md`, `next-steps.md`, `pending.md`, `HANDOFF.md`,
`FORKER.md`, `decisions/`, `guide/`, `handoffs/`, `skills/`. One prefix mapping makes every citation
resolve — `docs/<x>` → `archive/gate-corpus-2026-10-29/<x>` (`archive.md` §2). Nothing live carries a
correction paragraph or history (D-1).

## 8. Open assumptions

- `ASM-1` — the existing tree is adopted as the substrate **for now**: `src/{main,renderer,shared}`
  and the flat `tests/*.test.ts` suite stay where they are, and L1's first act is a module map that
  either claims those subtrees as modules or declares new ones; the suite's migration into the layers'
  test paths follows the claiming, per module (D-10). Rejected alternative: re-laying out `src/`
  and `tests/` into per-module folders before the map exists, which designs the modules from L0.
- `ASM-2` — the gate-era .mjs drivers (`tests/e2e-battery.test.mjs`, `scripts/electron-divergence.mjs`,
  `scripts/electron-ui.mjs`) enter the L1 module map as existing harness code and are not re-authored
  at bootstrap. Rejected alternative: a fresh harness before the map, which sets its own scope.
- `ASM-3` — the four legs of §6 stay the floor of verification, and strata's per-layer batteries add
  to them rather than replace them. Rejected alternative: replacing the vitest suite with L1/L2/L3
  batteries, which discards the 3,099 existing rows and their coverage.

## 9. Non-goals at rev 1

- Migrating the archived trackers into strata records (D-2).
- Module, interface or class design at L0 (D-1).
- Any change to `provident-ssr`, `provident-storeroom` or `../Preempt-Providence/` (D-5).
- Editing another layer's document, at any layer (D-3).
