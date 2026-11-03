# `store-tabs-record` — L1 design: the tab record, its constraint, and its live battery

- **Layer:** L1 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — admitted by D-62; the
  `§5.U` matrix below is the artifact this unit owes first.
- **Ceiling:** 150 lines (class max); at the ceiling split by owner — never append (D-1, D-3).
- **Write scope:** the three tab batteries and this document, per the `store-tabs-record` row of `strata/modules.json`
  (D-62). The store is `store-rederive`'s, the envelope that seeds the tabs is `app-envelope`'s and the wiring is
  `renderer-wiring`'s — reaching into any of them would claim a sibling's artifact by another route (D-32). **The first
  of those three no longer exists: D-78's purge stage 1 DELETED `src/renderer/store.ts` and its row 2026-11-02, so this
  scope's "not mine" reading loses a subject and gains nothing — the store the record rides is `provident-storeroom`'s.**

## 1. The record family

The tab record is a family of `file`-tier rows the store hosts, not a second store (D-62). Its operative spelling is
**one flat leaf per tab** whose NAME is the tab id and whose VALUE is that tab's declared record — `file.tabs.<id>` —
beside **one** singleton seat, `file.tabs.order` (the ids' ordered place). **The second singleton seat is retired** (D-76):
the landing entry — the tab the app always has, whose id is `'landing'` — is an ordinary member of the same family, keyed by
its own id, so `file.tabs.landing` is **that entry's leaf** and the witness the renderer's bounded wiring reads is
**derived, not stored**: the id of the row reading active. As a second seat it was a STRING written beside `order`, and a
member's key and a seat's name are one namespace, so an entry whose id spelled it could not be held at all (measured
2026-11-02; D-75). **A tab id equal to the one remaining seat's name, `order`, is refused at both routes that take an id**
(D-76) — the same namespace, read the other way.

**Four spellings, and only one of them is the entry's id** (D-75, D-76): the id `'landing'` (what `order` seats and what the
row's `id` and `label` carry), the authored page node `'tabs-landing-page'` (`src/shared/demo-envelope.ts`'s
`TABS_LANDING_PAGE_ID`, resolved through `Runtime.elementForNodeId`), the content target `'tabs-landing-page'` a row's
`target` names, and the address key `['tabs','landing']` — which IS the entry's leaf, not a seat.

The as-filed nested spellings (`file.tabs.<id>.target`, `.active`, `.error`, `.label`) are **kept visible and
superseded in effect**: a reader must be able to find what the record used to be without reading it as what it is
(`tests/store-tabs-record-register.ts`'s `DECLARED_SPELLINGS`, `PER_TAB_LEAVES`). That is why the unit's `N` counts
the four **operative** spellings and not the eight declared ones (D-62; `platform.md` §4).

## 2. The constraint and its repair

**Exactly one tab is active at a time**, and the constraint is a store member — `{id: exactly-one-active,
matchedSet: tabs, evaluatedOn: [set, commit, remove]}` — evaluated on every commit that touches the matched set, not
by the renderer that draws the result. A commit that would leave two active tabs is **repaired** rather than refused
when the record can name the winner (the close's own reference set), and refused only where it cannot.

The close's reference set is the thing readers get wrong: the **operative** set is the tab's one flat leaf plus its
place in `order`; the as-filed set was the four per-tab leaves plus that seat. Both are declared and neither is
inferred from the other (`CLOSE_REFERENCE_SET_MEMBERS`, `_AS_FILED`).

## 3. The `§5.U` live battery — the matrix this unit owes

The `§5.U` rows can be answered only by a **human at the window**: the landing and error pages are painted surfaces,
and a node-level row can neither see nor press them. No operator was present for this pass, so every row below is
**PARKED** — an un-run operator row is a failure, never a pass, and no tool output is substituted for an operator
observation (the three untaken precedents are the gutter battery's `U-3`/`U-4`/`U-6`, cited as history at
`archive/gate-corpus-2026-10-29/specs/gutter-ui-live-battery.md`).

| Row | Page | instrument | cmd | post |
|---|---|---|---|---|
| `U-1` | `tabs-landing-page` | `MANUAL OPERATOR` | `cmd: npm start -- --seed file.tabs.order=[]` at a session with a human at the window | `post: file.tabs.order` = `['landing']` — the empty sequence re-mints the landing entry, the one tab the app always has — `file.tabs.landing` is that entry's own record (`target` `tabs-landing-page`), and `tabs.read()`'s `landing` names it; the window paints the landing page as the terminal |
| `U-2` | `tabs-error-page` | `MANUAL OPERATOR` | `cmd: npm start -- --seed file.tabs.t9.target=page-9` at the same session | `post: file.tabs.t9.error` carries the unresolvable-target token and `read()`'s `landing` is `t9` — DERIVED from the active row, so the witness names the tab whose terminal is the error page; the window paints the error page as that tab's terminal |

**Both rows read `verdict: PARKED`** and they are the only two this unit carries: `§7` item 2(c) caps the matrix at
eight U-rows and requires `summary.total` to equal the row count, so the matrix states two and says so rather than
padding to a shape.

The driver half — the store-level statements each row's `post` asserts — **is not a live driver at this head, and this
document said it was.** `tests/store-tabs-record-live.mjs` was the unit's pointer-carrying driver, and it is **retired whole
at `D-93`**: run, it prints `RETIRED AT D-93; THIS FILE TAKES NO READING` and exits `2`; it takes no `scripts` key because
no key names it, and nothing runs it — the map claim that once sat on the tab record's row was re-homed by `D-99` to the
dispositions row carrying its two siblings. What answers a row's `post` across a real process boundary instead is
`npm run crossings` — the `tests/e2e/store-crossings/` leg, and the instrument `D-93`'s two retirements left owed (D-94, D-95).

## 4. What this document is not

- **Not the battery's measurements**: a `PARKED` row has none, and the matrix says `PARKED` rather than borrowing the
  gate-era pass's verdicts (the archived battery is history, `archive.md` §2).
- **Not a claim about the painted surface**: the node-level rows assert the store's post-state and the authored
  targets; only `U-1`/`U-2` reach the window, and only with a human (D-27: a node green is envelope-green).
- **Not a second home for the census**: `N` is read from the map row, never counted here (D-39, D-41, D-42).
