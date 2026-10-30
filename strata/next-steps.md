# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **D-30's runner split is unlanded.** The markers and `strata/marks.json` exist, but nothing separates the gating reading from the on-notice one in `npm test` — which is why an on-notice red in a file scheduled for replacement reads as a gate. Until it lands, every reader must hold `marks.json` in their head to tell debt from a gate | L1 (the map's owner; `marks.json` is L1's, D-30) | `npm test` prints both readings side by side and the on-notice red no longer counts as a failure |
| 2 | **`strata-lint` does not check `strata/records/`.** Ten files in its registry, not one a record: thirteen records' ceilings, provenance and citations are enforced by nothing, and a rebuilt record passed at 43 lines against 40. The instrument lives outside this repo (`platform.md` §4), so this is a harness change | the harness owner | a record over its ceiling fails the lint, and the record class joins the registry |
| 3 | **`walkthrough.md` §3's staging declaration names neither `package.json` nor the manifest**, while five staged documents cite `package.json` by line | L0 | §3 lists it, so a staged root is complete by its own procedure (D-44) |
| 4 | **`platform.md` §4 gives "the full shape" of unit state with no semantics for `layer`, `rebuildEligible` or `updated`** — and `secure-panels` reads `layer: L4` where every other closed unit reads `L0`, with nothing to explain it | L0 | each field says what writes it and what it means after `close` |
| 5 | **The L1/L2 revision audit.** The L3 seat derived the convention (a declared `Rev:` is the revision the preamble describes) and fixed three documents; four live documents still date their revision in the `Status` line or an unlabelled preamble — a bump a reader has to read prose to date | L1, L2 | every header labels its own change, as `docs/L1/secure-panels.md` does |
| 6 | **`brief.md` §6's worktree-row label differs from `marks.json`'s `gates` entry** for the same row (`T2 §4.2 item 9` vs `S-1 · §5.1 / C-9`). `tests/` is not staged, so only the test writer can say which label is right | L0 with the test writer | one label, cited from §6 (D-43) |
