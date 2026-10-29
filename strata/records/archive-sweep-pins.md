# record — the archive sweep's row dispositions (`strata-bootstrap`, D-4 / D-8 / D-9)

Replaced on every run; git holds the history (D-2). Measured by the L1 examiner, executed by L0, and
re-checked by running the suite after each arm.

## The measurement

**32 sites / 29 assertions in 15 files** by grep, and **71 affected rows in 27 files** once the three
classes a grep misses are counted: a path constant dereferenced by many rows (15 files), an unguarded
`readdirSync` that throws instead of failing (2), and a module-scope read that stops a file collecting
(1). D-4 filed the grep count; D-8 re-files the measurement; D-9 records the retirement.

## The arms as executed

| Arm | Executed | Notes |
|---|---|---|
| `REPOINT` | **55 literals in 20 files** | every one a filesystem read whose referent moved under `archive/gate-corpus-2026-10-29/`; the assertion is unchanged |
| `RETIRE` | **15 rows in 6 files** | listed below; each row's subject is the corpus itself |
| `LEAVE` | **21 sites untouched** | absence probes (true before and after), comments, scope declarations, and every line reading git history |

## The 15 retired rows

| File | Rows | Why no repoint exists |
|---|---|---|
| `tests/census.test.ts` | `R-8` | diff-scope control whose predicate is `^docs/specs/<x>\.md$` and reads the live corpus |
| `tests/gesture-session.test.ts` | `R-7` | same |
| `tests/gutter.test.ts` | `R-12` | same |
| `tests/layout-projection.test.ts` | `R-20` | same |
| `tests/zones.test.ts` | `R-4` | same |
| `tests/store-core-graph.test.ts` | `§4.1(red) · §7 item 8`, `§5.1 · the DENIED set` | compare the worktree copy with the blob at `HEAD`; the archive is untracked, so no such blob exists |
| `tests/fork-store-reads.test.ts` | `S-1 (F-C)`, `S-2` ×3, `S-4` ×2, `S-10` ×2 | resolve the archived contract's own citations against the live tree, which the prefix mapping settles but their predicate does not |

Nothing product-facing was retired: every row above was a gate-process control over the corpus. The
ledger move is recorded in D-9 — the suite's known-red set went from three rows to two.

## Checks after the sweep

`npm test`: `2 failed / 3,095 passed / 2 skipped` of `3,099` over `91` files, the two being
`tests/store-tabs-record.test.ts` §4.2 items 7 and 8. `npm run typecheck`, `npm run typecheck:tests`
and `npm run build` all clean. `strata-lint`: exit 0, 34 checks.
