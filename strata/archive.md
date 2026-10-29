# Provident-Electron — the archive, and how citations resolve

The gate workflow's corpus is retired, not deleted (D-2). This file says where it went, how a citation
to it resolves, and which test rows the move touched.

## 1. What moved

One commit moved every tracked file under `docs/` — **219 files, 20 MB** — into
`archive/gate-corpus-2026-10-29/`, preserving the tree. The topics in use, with what each held:

| Path | Contents |
|---|---|
| `brief/` | the four-file gate-era project brief set — index, use cases, features, limits and state |
| `specs/` | **181** files: 163 flat unit contracts, reviews, greens sets and battery records, plus **18** part files in two contract directories |
| `decisions.md`, `decisions/` | the gate-era decision ledger (94 KB) and its seven `ACTIVE-*` digests |
| `defects.md`, `defects-history.md` | the implementation-test catalogue and its archive (120 KB, 129 KB) |
| `next-steps.md`, `pending.md` | the work queue and the parked-items tracker (118 KB, 130 KB) |
| `HANDOFF.md`, `FORKER.md` | the upstream issue handoff (57 KB) and the fork-facing guide (201 KB) |
| `guide/`, `handoffs/`, `skills/` | the module guides, the per-release handoff records, the process skills |
| `AGENTS.md` (copied) | the gate workflow's process charter, whose UI-authority section is still cited |

The archive is gitignored and is the retrieval mechanism: nothing live carries a correction
paragraph, a dated annotation or history (D-1).

## 2. The prefix mapping

Every citation to the retired corpus resolves by one substitution:

```
docs/<x>  →  archive/gate-corpus-2026-10-29/<x>
```

This is why the 1,458 `docs/…` mentions that remain in `src/`, `tests/` and `scripts/` comments are
left as written (D-4): they resolve through the mapping, and editing them would have been 122 files of
comment churn for no gain in meaning. Git history also retains every file at its pre-move path in the
commits before the sweep, so `git show <old-rev>:docs/<x>` still works.

Three classes of citation need care:

| Citation | What it means now |
|---|---|
| a spec section, `docs/specs/<unit>.md §n` | the **gate-era contract** of a unit that closed before the regime switch — historical, never the live contract of open work |
| a defect row, `docs/defects.md` | the historical catalogue (D-5); findings from this point on live in the record of the unit that surfaced them |
| a tracker row, `docs/next-steps.md` / `pending.md` | that pass's own dated reading; the live work queue is `strata/.strata/units/*.json` plus `strata/decisions.md` |

A new document never cites the archive as authority for a live rule. When an archived clause is carried
forward — the UI-authority rule in `AGENTS.md` is the one instance — it is cited by its archive path and
its own section, as `strata/brief.md` §2 does.

## 3. The pinned rows the move touched (D-4)

32 assertions across 14 test files read a `docs/…` path. Each was repointed to its archive path or
retired where it existed only to pin a gate-era artifact; the dispositions are recorded per row in the
sweep commit's message and in the walkthrough record for `strata-bootstrap`. A row that asserts a path
exists still asserts exactly what it did before — the referent moved, the claim did not.

## 4. When you need an archived fact

Read it at the archive path, and treat it as history. If the fact is still load-bearing — a contract an
open unit depends on, a defect still unfixed upstream — it is re-filed through the loop: L1's map, L2's
surface, L3's design, or `decisions.md` if it is user intent (D-1). Re-filing is a normal unit, not a
copy: the archive copy stays where it is.
