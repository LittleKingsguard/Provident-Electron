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
| `README.md`, `AGENTS.md` (copied) | the gate-era root documents: the process charter, whose UI-authority section is still cited, and the README whose dated readings the brief replaced |

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

## 3. What the move did to the suite (D-4, D-8, D-9)

The L1 examiner measured the affected set rather than trusting a grep: **32 sites / 29 assertions in
15 files**, and **71 affected rows in 27 files** once path constants, unguarded `readdirSync` calls and
a module-scope read are counted. Three arms, executed in one pass:

| Arm | Executed | The rule |
|---|---|---|
| `REPOINT` | **55 literals in 20 files** | a filesystem read whose referent moved: the literal becomes `archive/gate-corpus-2026-10-29/<x>`, and the assertion itself is unchanged |
| `RETIRE` | **15 rows in 7 files** | the row's subject was the corpus: the diff-scope and amendment-namespace controls, the held-contract byte pins, and the archived contract's citation-resolution set (D-9) |
| `LEAVE` | untouched | absence probes (true before and after), comments, scope declarations, and every line that reads git history — a rewritten path there would make a row vacuously green |

**How this split relates to D-8's table:** D-8 filed the examiner's *proposed* arms over the 71
measured rows as 48 repoint / 2 retire / 21 leave. The executed split is 55 repoint literals / 15
retired rows / the rest untouched, because the first repoint pass is what showed which rows could not
survive one at all — D-9's table is the governing list, and this section is its execution record.

Measured delta: `3,114` collected rows before the sweep, `3,099` after, with two red rows left
(`store-tabs-record` §4.2 items 7 and 8). The retired list and the ledger move are D-9.
## 4. When you need an archived fact

Read it at the archive path, and treat it as history. **There is no topic index** — the corpus is
searched (`grep -rl <term> archive/gate-corpus-2026-10-29/`), and its own entry point was the four
files under `brief/`, whose `limits-and-state.md` §3 named every open obligation of that era. If the fact is still load-bearing — a contract an
open unit depends on, a defect still unfixed upstream — it is re-filed through the loop: L1's map, L2's
surface, L3's design, or `decisions.md` if it is user intent (D-1). Re-filing is a normal unit, not a
copy: the archive copy stays where it is.
