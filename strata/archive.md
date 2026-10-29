# Provident-Electron — the archive, and how citations resolve

The gate workflow's corpus is retired, not deleted (D-2): where it went, and how a citation resolves.
Ceiling: 60 lines.

## 1. What moved

One commit moved every tracked file under `docs/` — **219 files, 20 MB** — into
`archive/gate-corpus-2026-10-29/`, tree preserved: the four-file `brief/`; `specs/` (**181**: 163 flat
contracts, reviews, greens sets and battery records, plus 18 part files in two contract directories);
`decisions.md` and its seven `ACTIVE-*` digests; `defects.md` and `defects-history.md`;
`next-steps.md` and `pending.md`; `HANDOFF.md` and `FORKER.md`; `guide/`, `handoffs/`, `skills/`; and
the gate-era `README.md` and `AGENTS.md`, whose UI-authority section is still cited.

`archive/` also holds an **earlier body of corpora at its own top level** — `reviews/` 53, `gate1/` 49,
`gate5-blind-instruments/` 26, `live-probes/` 24, `specs/` 19, `defects/` 14, `decisions/` 7,
`pending/` 7, `handoffs/` 6, `next-steps/` 5, `findings/` 2, `agents/` 1 and `HANDOFF-battery.md` —
**215 files** that predate the gate corpus and that no document indexes; read them at their path, never
as authority for a live rule (§2, D-2). The archive is gitignored and is the retrieval mechanism:
nothing live carries a correction paragraph, a dated annotation or history (D-1).

## 2. The prefix mapping

Every citation to the retired corpus resolves by one substitution:

```
docs/<x>  →  archive/gate-corpus-2026-10-29/<x>
```

The 1,458 `docs/…` mentions left in `src/`, `tests/` and `scripts/` comments resolve through it and are
left as written (D-4); git history keeps every file at its pre-move path, so
`git show <old-rev>:docs/<x>` still works. Three citation classes need care: a spec section names that
unit's **gate-era contract**, historical and never the live contract of open work; a `defects.md` row
names the historical catalogue (D-5); a `next-steps.md` or `pending.md` row is that pass's own dated
reading, while the live queue is `strata/.strata/units/*.json` and `decisions.md`. A new document
never cites the archive as authority for a live rule; an archived clause carried forward — the
UI-authority rule in the root `AGENTS.md` is the one instance — is cited by its archive path and its
own section, as `strata/brief.md` §2 does.

## 3. What the move did to the suite (D-4, D-8, D-9)The L1 examiner measured the set rather than trusting a grep: **32 sites / 29 assertions in 15 files**,
and **71 affected rows in 27 files** once path constants, unguarded `readdirSync` calls and a
module-scope read are counted. One pass ran three arms:

| Arm | Executed | The rule |
|---|---|---|
| `REPOINT` | 55 literals, 20 files | a read whose referent moved: the literal moves, the assertion does not |
| `RETIRE` | 15 rows, 7 files | the row's subject was the corpus: the diff-scope and amendment-namespace controls, the held-contract byte pins, the archived citation-resolution set (D-9) |
| `LEAVE` | 21 sites | absence probes, comments, scope declarations and git-history lines, which a rewrite would make vacuously green |

The arms count different things and do not sum to the 71 rows — one row can stand at more than one
site. D-8 filed the examiner's *proposed* split over those rows as 48/2/21; D-9's table governs this
unit and this section is its execution record. At the sweep the suite collected 3,114 rows and 3,099
after it, leaving two red rows; the current readings are `brief.md` §6's, not this paragraph's (D-1).

## 4. When you need an archived fact

Read it at the archive path and treat it as history. **There is no topic index** — search it:
`grep -rl <term> archive/gate-corpus-2026-10-29/`. A fact still load-bearing is re-filed through the
loop — L1's map, L2's surface, L3's design, or `decisions.md` if it is user intent — as an ordinary
unit, never a copy: the archive copy stays where it is (D-1, D-2).
