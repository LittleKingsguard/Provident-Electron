# Provident-Electron → Provident-Storeroom: the open package issues at `1.0.1`

**Regenerated `2026-10-27` for `provident-storeroom@1.0.1`.** This pass rewrote the file WHOLE.
**The as-filed bytes of the previous document are preserved twice:** byte-identically at
**`archive/handoffs/2026-10-27-HANDOFF-as-filed-before-1.0.1-regeneration.md`** (`56,897` bytes,
`cmp`-verified by the supervisor) **and in git at commit `bc5b398`**. That copy is the authority
for any sentence of the `1.0.0` text; nothing in this document re-narrates it. The `1.0.1`
release **closed nine of the rows that document listed as open**, so this is a REGENERATION and
not an amendment: a reader who acts on the `1.0.0` text would re-file closed work.

**⟶ `2026-10-28` AT `provident-storeroom@1.2.0` — THE OPEN SET MOVED AGAIN, AND A REGENERATED ISSUE DOCUMENT IS OWED (**Round 12**). This document is NOT regenerated (`RCA-8(d)`: an append — no byte below moves), so read every block below THROUGH this one, and read `docs/defects.md`'s `1.2.0` block as the current catalogue.** **`2` CLOSED** (`DEF-AE` — the release's one genuine integrity repair: a refused write now leaves `read b` = `ABSENT` where `1.1.0` left `1`; and `DEF-AB`, spelling half) · **`3` NARROWED** (`DEF-AH` — the witness landed, the write-path loss stands; `DEF-AI` — the field is present and its value is fabricated; `DEF-AB`'s `seq` half) · **`2` UNCHANGED** (`DEF-X` — **`2` of `7` hosts judge, the identical table**; `DEF-AC`) · **`3` NEW** (`DEF-AJ`; `DEF-AK` — `read` only, undriven; `DEF-AL`) · **`1` OBSERVATION, no demand** (`DEF-AM`) · **`DEF-AD` numbers only** · **`14` of `14` regression rows hold** and **`R8` holds**. **THE THING A MAINTAINER MOST NEEDS TO KNOW: THE ONE BEHAVIOUR CHANGE OF THE RELEASE — THE OPENING-MARK RESTORE — IS DECLARED IN NO SHIPPED DOCUMENT.** `/opening mark|journalMark|restoreMark/` returns **`0` hits across all three shipped documents**; the change lives only in the repo-root `RELEASE-NOTES.md`, **which ships nowhere**, while the shipped guide still prints *"…and that release has not been cut"* **inside a registry install of `1.2.0`.**

**⟶ `2026-10-28` — THE OPEN SET MOVED AT `provident-storeroom@1.1.0`, AND A REGENERATED ISSUE DOCUMENT IS OWED. This `1.0.1` text is NOT regenerated (`RCA-8(d)`: an append — no byte below moves), so read the blocks that follow THROUGH this block, and read `docs/defects.md`'s `2026-10-28` block as the current catalogue.** **FIVE CLOSED** — three by code (`DEF-Y` the judgement's throw now logs and undoes; `DEF-AA` the restore lands and the true sentence is picked; `DEF-Z` the restore is tier-exact) and **two by measurement** (`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` and `STOREROOM-FILE-PROBE-FALSE-PASS` — the owed `0.1.x` re-measurement, DISCHARGED). **THREE NARROWED** (`DEF-X` — two of seven hosts now judge, **five do not**; `DEF-AB`; and the version contract, re-titled `STOREROOM-VERSION-CONTRACT-1.0.1-AND-1.1.0`, which now names **eleven breaking items shipping in NO tarball**). **TWO WORSENED** (`DEF-AC` — a shipped guide denying the existence of its own tarball; `DEF-AD` — cost, no demand attached). **THREE NEW** (`DEF-AE` — **a write that reports refusal lands its own value**; `DEF-AH` — `read`-only, unproven; `DEF-AI` — the `log` omits its declared `seq`). **ALL NINE `1.0.1` CLOSURES STILL HOLD.**

**⟶ AND THE VERSION-NUMBER ROW IS WITHDRAWN, DATED `2026-10-28` — the architect's ruling, verbatim: *"Stop complaining about the version number."*** **Version numbers are the package's to choose.** A package may ship any number of behaviour changes under a patch, a minor or a major, and **a consumer's remedy is a pin, not an issue**; this consumer records its pin and files **no semver finding**. **So row `1` of the table below and its block in section 2 are WITHDRAWN** (see the note on the row itself): the release note's own semver argument, the eleven breaking items, and the absence of a shipped changelog are **the package's business and not findings of this document** — **do not open an upstream issue on any of them, and do not read the renumber as owed.** **Everything else below stands unchanged, and none of it rests on a number.**

## What this document is for, and who acts on it

The issue-handoff assembly required by `AGENTS.md` item 7. Its subject is
**`provident-storeroom`** (the published npm package) and its platform artefact, whose source
repo is the ADJACENT `../Provident-Storeroom` (the sibling project), NOT `../Preempt-Providence`.
**The upstream that acts on this document is that sibling repository.** Each block in section 2
is written so a maintainer there can reproduce the defect against an install, find the code
path, and decide the fix.

**This project CATALOGUES; it does not patch the package** (`AGENTS.md` item 7). No line below
reports a fix we applied, and none may be read as one. A fix observed to land is recorded as a
CLOSURE with the version that landed it and the code path that closes it (section 4), so it is
not re-filed. **Nothing was written into `../Provident-Storeroom` by this pass or by the reviews
it renders.**

## Label discipline (binding on every sentence here)

- **`observed`** — a probe was executed and its output is quoted. Never inferred.
- **`read`** — a citation to code, a declaration or a release record, given as `path:line`.
  Evidence of what the bytes SAY, never of what they do.
- **`derived`** — inferred, and the inference says from what.
- **`declared`** — a package's own claim (README, guide, release note, declaration prose, commit
  subject). **Never evidence of behaviour**, and no release note's claim is presented as a
  measurement. **A commit message is `declared` and never evidence** — this matters here, because
  two of the package's own commit subjects claim a window this document measures as open
  (`DEF-X`).

Anything this document could not cite or measure is marked **`uncited`** or dropped.

**Provenance of the catalogue this renders:** `docs/defects.md`, its `## OPEN` table and its
**`2026-10-27` block** — the dated block carrying the `1.0.1` closure index, the four
withdrawals, the eight new rows and the two unchanged row-bullets. **Catalogue stamp:
`2026-10-27`.** Where this document and that file disagree, that file governs. The operative
decision row for the release verdict is `docs/decisions.md`'s **`1.0.1-IS-NOT-A-LAWFUL-PATCH`**,
and for the retention withdrawal **`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`** (both cited BY
NAME — that ledger is appended-to and its line anchors drift).

**The two reviews behind every state below** (the catalogue's own provenance, carried here):
**(1) a live probe** of the installed `1.0.1` — `14` arms, raw output in
`/tmp/probe-storeroom-101/out/`, every such result labelled `observed`; **(2) a source critique**
of the checkout at `1.0.1` against the `1.0.0` installed bytes — `read` for a code or declaration
citation, `declared` for prose. **Where the two disagree, the probe wins on behaviour: `observed`
beats `read`, and the disagreement is recorded in the row, never hidden.**

**The tally, printed with its terms:** `9` CLOSED + `4` WITHDRAWN OR RE-SCOPED + `8` NEW + `2`
UNCHANGED row-bullets `= 23` dispositions. The nine closures are `DEF-M`, `DEF-W`, `DEF-H`,
`DEF-N`, `DEF-P`, `DEF-Q`, `DEF-L`, `DEF-U`, `DEF-S`. The four withdrawals are one demand of ours
withdrawn by the architect (`DEF-J`/`R16`) and three of our own filings withdrawn by us
(`DEF-R`, `DEF-V`, `DEF-T`'s filed claim). The eight new rows are `DEF-X`, `DEF-Y`, `DEF-Z`,
`DEF-AA`, `DEF-AB`, `STOREROOM-1.0.1-VERSION-CONTRACT`, `DEF-AC`, `DEF-AD`. The two unchanged
bullets are `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` and `STOREROOM-FILE-PROBE-FALSE-PASS`.

**Registry fact (supervisor-measured): `provident-storeroom@1.0.1` is published;
`dist-tags.latest = 1.0.1`.**

---

## 1. What is open, ranked, one page

Ordered by what hurts a consumer most: (1) silent behaviour change under the number a consumer
already trusts, (2) data integrity on the reversal path, (3) the diagnostics a consumer switches
on, (4) a construction-time promise the bytes do not keep, (5) the shipped record. Detail is in
section 2 only.

| # | Id | One line | Reachability | Versions measured | Demand or observation |
| --- | --- | --- | --- | --- | --- |
| 1 | `STOREROOM-1.0.1-VERSION-CONTRACT` — **WITHDRAWN `2026-10-28`** | Four behaviour changes shipped under a patch bump, against the package's OWN recorded standard | `published` — a `^1.0.0` range resolves to it | `1.0.0` → `1.0.1` (`observed` + `read` + `declared`) | **DEMAND** — renumber to `1.1.0`/`2.0.0` as your own record says, or declare all four changes breaking |
| 2 | `DEF-X` | A reversal inside an open commit is unjudged and its violating effect STANDS | `published` | `1.0.1` (`observed`) | **DEMAND** — judge every reversal's terminal state, or refuse an in-commit reversal |
| 3 | `DEF-Y` | A body that throws AT THE JUDGEMENT refuses with `log: []` and NO UNDO | `published` | `1.0.1` (`observed`) | **DEMAND** — carry the attempt's log and undo, or declare that the reversal stands |
| 4 | `DEF-AA` | The restore can fail and the message still claims it succeeded — `200` of `200` at 200 pairs | `published` | `1.0.1` (`observed`) | **DEMAND** — select the sentence from the RESTORE's outcome, and refuse an impossible restore |
| 5 | `DEF-Z` | The compensating restore is TIER-LOSSY and says otherwise | `published` | `1.0.1` (`observed`) | **DEMAND** — record tier AND value, restore in kind |
| 6 | `DEF-AB` | The refusal's lone log entry FABRICATES `seq: 1` and prints one address in two spellings | `published` | `1.0.1` (`observed`) | **DEMAND** — mint `seq` from the attempt's counter, and render the address once |
| 7 | `STOREROOM-FILE-PROBE-FALSE-PASS` | A `filePath` whose parent the process cannot write is accepted at construction and fails at the first commit — the false pass is now **unconditional** | `published` (construction) | filed `0.1.1`, measured `0.1.2`; **`read`, NOT re-measured at `1.0.1`** | **DEMAND** — a real write dry run at construction; the re-measurement is owed by us |
| 8 | `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` | The crate-side fallback still answers `0.1.0` while the manifest says `1.0.1`, so the delta widened from a patch to a **major** | `published` (load path, behind the pre-publish guard the package chose) | filed `0.1.0`/`0.1.1`, cleared `0.1.2`; **`read`, NOT re-measured at `1.0.1`** | **DEMAND** — bump the constant with the manifest; the structural fix was declined, so nothing else is asked |
| 9 | `DEF-AC` | The shipped guide declares itself one version behind the manifest that ships it | `published` (`README.guide.md` now rides `files`) | `1.0.1` (`read`) | **DEMAND** — generate the version line from the manifest, or assert it before publish |
| 10 | `DEF-AD` | Per-reversal cost: `2·R·A` store reads plus up to `R·A` body invocations at every at-rest reversal | `published` | `1.0.1` (`read` + `observed` scale) | **OBSERVATION — NO DEMAND** |

**Not in the table, and carried so it is not read as dropped: `R14`** — the per-graph / `secure`
split — remains a standing **QUESTION with no demand attached**, recorded at
`docs/defects.md`'s `1.0.0` requirement view, where this consumer's binding `UK-5` and the
package's own withdrawal of `R14` stand unreconciled. **The `2026-10-27` block files nothing on
it**, so this document neither re-files nor withdraws it.

---

## 2. The open set, one block per row

Each block carries the catalogue's four-part form plus the exact versions and the observable that
will read differently once fixed. **No defect below is invented by this document**; each has a
row in `docs/defects.md`'s `2026-10-27` block.

### What `1.0.1` got right — read this before the faults

**`1.0.1` closed NINE rows of this document — `DEF-M`, `DEF-W`, `DEF-H`, `DEF-N`, `DEF-P`,
`DEF-Q`, `DEF-L`, `DEF-U`, `DEF-S` — and four of those closures are the heaviest items the
`1.0.0` text carried.** The repair arm now leaves the pre-attempt value where `1.0.0` left the
refused one (`DEF-M`); a constraint refusal now crosses as `ConstraintPassRefused` with
`FileCommitFailed` left to the save alone (`DEF-H`); a body throw is converted into
`ConstraintBodyThrew` with a log at four of its five instants (`DEF-S`); registration now
distinguishes a verdict refusal from a malformed entry (`DEF-N`); the shipped `README`'s `14`
rows now match the `14` observed members with arities agreeing (`DEF-L`); and the `KC-3` family
interpolates its own address (`DEF-Q`). **And the central one: `DEF-W` is CLOSED AS ASKED — the
reversal is now judged AT THE TERMINAL STATE IT LEAVES, ONCE, never per unwinding step, which is
exactly the fix shape this document asked for on `2026-10-14`** (our words then: *"the check
belongs at the TERMINAL STATE, never per unwinding step — a per-step check is unsound"*).
**A derived shape of ours was adopted, and it holds:** four adversarial arms show the judge never
consulted inside a kernel-driven pass while the floor still reached `5`, so `R8` stands. What
section 2 lists below is the RESIDUE of that success, not a reversal of it.

### 2.1 `STOREROOM-1.0.1-VERSION-CONTRACT` — **WITHDRAWN `2026-10-28`: NOT A FINDING** (the head-of-body clause governs; version numbers are the package's to choose, and this consumer pins rather than files)

**(a)** `1.0.1` ships four changes a consumer can feel, under a number that promises none. **The
version-number verdict is OURS** (`derived` from the two records below); **the four changes are
measured**, not argued.

**(b)** Reachability **`published`**: any `^1.0.0` or `~1.0.0` range resolves to `1.0.1`
silently. Versions: `1.0.0` → `1.0.1`. Bytes: `/tmp/probe-storeroom-101` and `-100`.

**(c)** The four changes — **`observed` + `read`**, each a behaviour a consumer can feel:
**(1)** the emitted vocabulary **widened `StoreStatus` `17` → `20`**, adding `ConstraintBodyThrew`,
`ConstraintRefusedAtRegistration` and `ConstraintPassRefused`; **(2) a STORED VALUE MOVED** on
the failing-repair arm (`9` → `5`); **(3) a constraint-refused write's STATUS CHANGED**
(`FileCommitFailed` → `ConstraintPassRefused`, i.e. `DEF-H`'s closure); **(4) `rollback` went from
TOTAL to PARTIAL** — it now throws `ConstraintPassRefused` where `1.0.0`'s declaration promised a
record and no failure.

**Against that, the package's own record (`declared`, quoted verbatim):** *"`DEF-W` and `DEF-H`
change shipped behaviour and a closed union … **The three cannot ship as `1.0.1`.** The next
release is at least `1.1.0`, and `DEF-H`'s union expansion makes `2.0.0` the honest semver"*
(`strata/decisions.md:2766-2769`, quoting `:2762`). **The release note's defence rests on the
escape arm — which was PRESENT AT `1.0.0` TOO and therefore cannot distinguish the versions.**

**(d)** Reproduction: install both bytes side by side (`/tmp/probe-storeroom-100`, `-101`);
(1) enumerate the status vocabulary in each and count the members; (2) run the failing-repair arm
in each and read the stored value; (3) drive a refused constraint write in each and print
`thrown.status`; (4) call `rollback` in each against a terminal state a registered constraint
forbids and record whether it answers a record or throws; then read the quoted record above.

**(e)** Root cause — **`derived` from the two records**: the release was numbered by the record's
own scale-free intent rather than by its own recorded standard.

**(f)** Fix shape — **upstream-owned, DECLARATIVE (a release decision, not a code fix)**: renumber
to `1.1.0`/`2.0.0` as the record itself says, or declare the four changes in the release note; **⟶ THIS DEMAND IS WITHDRAWN `2026-10-28** — version numbers are the package's to choose and this consumer files no semver finding (see the head-of-body clause); and
pin the standard in a CHECK rather than in prose, so the next release cannot restate it and
depart from it in the same number.

**(g)** **Practical consequence, stated so this row is usable: a consumer on `^1.0.0` receives four
behaviour changes silently; the mitigation is to pin `<1.0.1` until they are declared breaking.**
**Fixed when:** the published number matches the recorded standard, or the release note names all
four changes as breaking — i.e. a consumer can tell from the number or the note that behaviour
moved.

### 2.2 `DEF-X` — A reversal inside an open commit is unjudged, and its violating effect stands

**(a)** A `rollback` issued from INSIDE a listener body or a constraint body during a write
performs no judgement at all, so the reversal lands a state no constraint approved — while the
identical call one frame out is refused and restored. **This is the residue of `DEF-W`'s closure,
not its continuation**, and it is the one direction the closure chose that a consumer cannot live
with.

**(b)** Reachability **`published`** (installed entry alone). Affected **`1.0.1`** (`observed`);
filed `2026-10-27`. Bytes: `/tmp/probe-storeroom-101`.

**(c)** Observed — **`observed`, quoted**: a `rollback` issued inside a listener body or a
constraint body during a write performs **ZERO judgement invocations** and **leaves the refused
value standing** (*`read a = 5`*), while **the identical call one frame out is refused and
restored to `7`**. **The at-rest discriminator (`openCommits === 0 && live.size === 0`) reads
*"an attempt is open"* as *"do not judge"*** — **so the conservative direction chosen is the
PERMISSIVE one.** **Two of the package's own commit subjects claim this window closed
(`declared`); the artifact has it OPEN (`observed`).**

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; create a `mem` store; `write` `7` at
`['a']`; register a constraint over `['a']` that refuses `5`; from inside a listener body (and,
separately, from inside a constraint body) invoked during a write, call
`rollback(handle, <an opId whose terminal state carries the refused 5>)`; then `read(handle,
['a'])` — the answer is `5` and the judgement was never invoked; perform the same reversal after
the write settles — it is refused and the store is restored to `7`.

**(e)** Root cause — **`read`**: the judgement is gated on the at-rest discriminator, so an open
attempt SUPPRESSES the judgement rather than deferring it to the point the attempt settles.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: judge the **terminal state** of every
reversal regardless of an open attempt, or **refuse** a reversal issued inside an open commit.
**The one thing it may not do is leave the state unjudged.**

**(g)** Fixed when: a reversal issued inside a listener or constraint body is either refused or
judged at the state it leaves — asserted as: the judgement-invocation count for an in-body
reversal is `>= 1`, and no reversal answers success while the store holds a value a registered
constraint refuses.

### 2.3 `DEF-Y` — A body that throws at the judgement refuses with `log: []` and no undo

**(a)** At the judgement instant, a constraint body that throws yields a refusal that carries
neither the attempt's log nor an undo: the reversal STANDS. `DEF-S` closed four other instants
(landing pass, registration, synthetic re-run, a bare-string throw) and **narrowed** here.

**(b)** Reachability **`published`**. Affected **`1.0.1`** (`observed`); filed `2026-10-27`.

**(c)** Observed — **`observed`**: the answer's `status` is `ConstraintBodyThrew`, its **`log` is
EMPTY**, and the reversal **STANDS** — a refusal that **neither reverts nor records which
constraint threw**. Contrast the four other instants, which **all name the constraint and carry a
log entry**.

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; register a constraint whose body throws
when invoked at the judgement (e.g. it throws from its second call onward); drive an at-rest
`rollback` whose terminal state that constraint refuses; then read `status`, `log.length`, and the
store.

**(e)** Root cause — **`read`/`derived`**: the judgement path's catch mints the failure form
**before** the undo and **without** the attempt's log.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: carry the attempt's `log` and perform the
undo; or answer a DISTINCT status that **declares** the reversal stands, so a consumer can tell
"refused and restored" from "refused and applied".

**(g)** Fixed when: a throw at the judgement either carries a non-empty `log` and leaves the store
at its pre-reversal state, or answers a status whose own sentence says the reversal was not
undone.

### 2.4 `DEF-AA` — The restore can fail, and the message still claims success

**(a)** When the terminal value is ABSENT, the compensating restore is impossible — and the answer
still says the reversal was undone. The surface has a second sentence for exactly this case and
picks the wrong one.

**(b)** Reachability **`published`**. Affected **`1.0.1`** (`observed`); filed `2026-10-27`.

**(c)** Observed — **`observed`, quoted**: an **ABSENT** terminal value makes the restore
impossible, yet the answer reads *"the reversal was UNDONE: every address it moved stands again at
its pre-reversal state"* while the address is still **ABSENT**; **at `200` pairs this fires `200`
of `200`**. **A second sentence exists for the failure case** (*"… the reversal was NOT undone at
every address it moved"*) **and is used on another arm — so the surface has TWO sentences and
picks the WRONG one here.**

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; seed `200` pairs, one address each;
`delete` one pair's terminal value so its restore is impossible; drive a refused reversal at rest
and count how many answers carry the UNDONE sentence while `read` at those addresses answers
`AddressNotFound` — `200` of `200`.

**(e)** Root cause — **`derived`**: the message is selected by the reversal's own completion, not
by the restore's outcome.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: select the sentence **from the restore's own
outcome**, and refuse when a restore is impossible rather than reporting it done.

**(g)** Fixed when: for every address the reversal moved, the answer's claim matches a read-back
assertion — asserted as: the UNDONE sentence appears zero times while any moved address reads
`AddressNotFound`.

### 2.5 `DEF-Z` — The compensating restore is tier-lossy and says otherwise

**(a)** A refusal must not change the PERSISTENCE CLASS of a value it claims to have restored. On
a two-tier store it does: the `file` tier's value is destroyed while the log says every address
stands again.

**(b)** Reachability **`published`**. Affected **`1.0.1`** (`observed`); filed `2026-10-27`.

**(c)** Observed — **`observed`, quoted**: on a `{file: 5, mem: 7}` store, a refused reversal
leaves `file` answering **`TierNotFound`** (the value DESTROYED) while `mem` reads `7`, and the
log says *"every address it moved stands again at its pre-reversal state"*.

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; create a store; `write` `5` at `['a']` at
the `file` tier and `7` at `['a']` at `mem`; drive a refused reversal at rest; then read the
`file` tier (`TierNotFound`) and `mem` (`7`), and read the refusal's message.

**(e)** Root cause — **`read`**: the restore **deletes ALL TIERS** and re-writes at `'mem'`
(`constraints.mjs:1319-1331`) **because the watch records only the VALUE** (`constraints.mjs:1242`).

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: record **tier AND value** in the watch and
restore **in kind**; a restore that cannot preserve the class must refuse rather than downgrade.

**(g)** Fixed when: after a refused reversal every address's tiers answer what they answered
before, class included — `TierNotFound` never appears where a value stood.

### 2.6 `DEF-AB` — The refusal's lone log entry fabricates `seq: 1` and prints one address in two spellings

**(a)** Every refused reversal's single `constraint-check` entry carries `seq: 1`, colliding with
any attempt's real first op, and its own sentence renders the address two ways. `DEF-Q`'s rule —
one spelling per sentence — applies here, in a place `DEF-Q` was not measured.

**(b)** Reachability **`published`**. Affected **`1.0.1`** (`observed`); filed `2026-10-27`.

**(c)** Observed — **`observed`, quoted**: every refused reversal's single `constraint-check`
entry carries **`seq: 1`**, colliding with any attempt's real first op; and **the same sentence
renders the address bare in `subject` and `JSON.stringify`-quoted in the message**.

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; drive a refusal whose attempt already
holds an op with `seq: 1`; print `log[0].seq`, `log[0].subject` and `log[0].message`.

**(e)** Root cause — **`derived`**: the entry's `seq` is minted by the refusal, not by the
attempt's counter; the two spellings come from two renderers.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: mint `seq` from **the attempt's own counter**
(or omit it), and render the address **once, in one spelling, per sentence**.

**(g)** Fixed when: no log entry's `seq` collides with an op the same attempt recorded, and no
sentence renders one address two ways.

### 2.7 `STOREROOM-FILE-PROBE-FALSE-PASS` — `read`, NOT re-measured at `1.0.1`

**(a)** A `filePath` whose PARENT DIRECTORY the process cannot write is accepted at construction,
and the misconfiguration surfaces at the **first commit**. The declared rule — reachable iff the
file exists or the application can write it — is not discharged by the probe.

**(b)** Reachability **`published`** (construction). Filed `2026-10-11`; measured at **`0.1.2`**;
the sibling re-filed it on its own side as **`DEF-20`**. **`read` at `1.0.1`: the parent-mode test
was WITHDRAWN, so the false pass is now UNCONDITIONAL.** **NOT re-measured at `1.0.1` — no claim is
made about these bytes beyond what that reading says.**

**(c)** Observed at `0.1.2` — **`observed`, quoted**: `storeCreate({journalLength: 8,
listeners: [], filePath: '/usr/bin/psr012-probe.json'})` — `/usr/bin` root-owned `0755` —
**returns an instance** with the register's tier FIXED AT CREATION to `file`; the first `file`-tier
write then throws **`FileCommitFailed`** (*"'c' could not be committed to
'/usr/bin/psr012-probe.json', the file write failed at '/usr/bin/psr012-probe.json'"*), and no file
is created; **the `mem`-tier control over the same instance succeeds**, so the failure is the
commit, not the store. Controls answering correctly: an absent parent → `FilePathUnreachable`; a
directory → `FilePathUnreachable`; a writable parent with an absent file → constructs.

**(d)** Reproduction (owed at `1.0.1`): `npm i provident-storeroom@1.0.1`; `storeCreate` with
`filePath: '/usr/bin/psr101-probe.json'`, uid `1000`, `linux-x64-gnu`; observe the instance
returned; `write` at the `file` tier and observe the commit failure with no file created; run the
`mem`-tier control over the same instance.

**(e)** Root cause — **`read`** (as filed, at `0.1.2`): the absent-file arm tested the parent's
POSIX mode bits (`src/store.rs:602-621`, `permissions().readonly()` — false whenever ANY owner's
write bit stands on the parent, regardless of the calling process), while the present-file arm
opened the file with `write(true)` — a true dry run.

**(f)** Fix shape — **upstream-owned, BEHAVIOURAL**: make the absent-file arm a REAL dry run
(the sibling's `0.1.3` remedy was an exclusive create naming `EROFS`/`EACCES`/`ENOENT`; our
proposed `access(W_OK)` instrument was abandoned and we record the abandonment without objection).

**(g)** Fixed when: a root-owned-`0755`-parent configuration answers `FilePathUnreachable` **at
construction** and a refused construction leaves no file behind. **The re-measurement of this row
at `1.0.1` is OWED and not taken.**

### 2.8 `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` — `read`, NOT re-measured at `1.0.1`

**(a)** The platform artefact's self-reported version must equal the wrapper manifest's, and the
crate-side fallback constant still answers `0.1.0`.

**(b)** Reachability **`published`** (the load path, behind the pre-publish guard the package
chose). Filed `2026-10-11` at `0.1.0`/`0.1.1`; recorded cleared at `0.1.2`, confirmed at `0.1.3`.
**`read` at `1.0.1`: the crate-side fallback still answers `0.1.0` while the manifest says
`1.0.1`, so the delta widened from a patch to a MAJOR.** **The package DECLINED the structural
fix in favour of a pre-publish guard.** **NOT re-measured at `1.0.1`.**

**(c)** Observed at `0.1.1` — **`observed`, quoted**: `storeCreate({journalLength: 32,
listeners: [], filePath: '/tmp/x.json'})` throws `{status:'FilePathUnreachable',
message:"'@auspicion/provident-storeroom-js-linux-x64-gnu' is not reachable at construction, the
path must exist or the application must be able to write it"}` — the artefact's path, reported
unreachable, on a successful install. **Control:** the platform package's `version()` answered
`"0.1.0"` while that package's manifest and the wrapper's both declared `0.1.1`.

**(d)** Reproduction (owed at `1.0.1`): `npm i provident-storeroom@1.0.1`; call
`require('@auspicion/provident-storeroom-js-linux-x64-gnu').version()` and compare it with
`provident-storeroom`'s manifest version; then `storeCreate` on a writable path and observe
whether the mismatch arm fires.

**(e)** Root cause — **`read`**: the artefact's version was not bumped with the wrapper's. Rung one
compares `candidate.version()` exact-string against the package's own manifest version
(`index.mjs:136` `packageVersion()`; comparison at `:226-232`); the artefact answers `"0.1.0"`
(`bindings/js/Cargo.toml:3`, read by `bindings/js/src/facade.rs:1414` via
`env!("CARGO_PKG_VERSION")`) while `bindings/js/package.json` declares `1.0.1`. The mismatch arm
fires and, by the package's own design, rung two is not reached after a mismatch.

**(f)** Fix shape — **the structural fix was declined by the package, so nothing further is asked
of the mechanism**: bump the crate constant with the manifest, and let the pre-publish guard fail
the build when the two disagree.

**(g)** Fixed when: the artefact's self-report equals the wrapper manifest's on a plain install,
and the guard is shown to fail a build where they differ. **The re-measurement at `1.0.1` is OWED
and not taken.**

### 2.9 `DEF-AC` — The shipped guide declares itself one version behind

**(a)** `README.guide.md` now rides `files` — `DEF-L`'s ask, met — and states a version the
manifest does not carry. A shipped document naming the wrong version is the `DEF-L` class in a new
place.

**(b)** Reachability **`published`** (the tarball's `files` row). Affected **`1.0.1`** (`read`).

**(c)** Read — **`read`, quoted**: `README.guide.md` says **"THE VERSION THIS GUIDE DESCRIBES IS
`1.0.0`"** while the manifest pins **`1.0.1`**.

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; unpack the tarball; read the version line
in `README.guide.md`; compare with `package.json`'s `version`.

**(e)** Root cause — **`derived`**: the version line is authored prose with nothing asserting it
against the manifest.

**(f)** Fix shape — **upstream-owned, DECLARATIVE**: generate the line from the manifest, or assert
it **before publish** — the same rule `DEF-L` asks of the README's member table.

**(g)** Fixed when: the shipped guide's version line equals the tarball's manifest version at every
release — asserted as: a pre-publish check comparing the two strings.

### 2.10 `DEF-AD` — Per-reversal cost — **OBSERVATION, NO DEMAND ATTACHED**

**(a)** Every at-rest reversal takes a watch over the whole enabled register, unbounded and
undeclared. **This row is an observation of cost, not a request.**

**(b)** Reachability **`published`**. Affected **`1.0.1`** (`read` + `observed` scale).

**(c)** Read plus observed scale — **`read` + `observed`**: with `R` enabled pairs at `A`
addresses each, **every at-rest `rollback` takes `2·R·A` store reads plus up to `R·A` body
invocations**, and **pays the watch even when the reversal then REFUSES**; **`200` pairs × `200`
reversals cost `647,128` bytes of steady-state heap (`3,236` B/pair) versus `632,408` at
`1.0.0`**. **No declared bound exists anywhere in the shipped bytes** (the probe's `18`-file
enumeration finds **three non-bounding hits**).

**(d)** Reproduction: `npm i provident-storeroom@1.0.1`; register `200` pairs across `200`
addresses; drive `200` at-rest reversals; instrument each body with a call counter and sample
`process.memoryUsage().heapUsed` between rounds.

**(e)** Root cause — **`read`**: the watch is taken over the whole enabled register per reversal,
un-bounded and un-declared.

**(f)** Fix shape — **NONE IS ASKED FOR.** The architect's `2026-10-27` ruling governs: *"stop
asking for changes"*. **No cost model and no bound is asked for, and this consumer budgets for the
synchronous watch as measured.** *A SUGGESTION, EXPLICITLY NOT A REQUEST*: narrow the watch to the
addresses **the reversal's own record names**.

**(g)** No fixed-when is assertable, because nothing is demanded. What can be asserted: the
counts and the heap figure above remain the recorded characteristic unless the suggestion is taken
up — and this document treats them as a budget, not a defect measure.

---

## 3. What we have withdrawn

**Two kinds, and the difference is ours to own.** One withdrawal is the architect's, against a
demand of ours; three are ours, against our own filings. **The withdrawn text is not deleted from
the corpus** — it stands in `docs/defects.md` and in the archive copies of the old handoff; this
section is the clause that governs it. **A maintainer who implemented a withdrawn demand would
have built something this consumer no longer asks for.**

### (i) Withdrawn by the architect, `2026-10-27`: THE RETENTION DEMAND

**The ruling, verbatim:** *"The instance lifetime is correct, stop asking for changes"*. Operative
decision row: `docs/decisions.md`'s **`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`**.

**What it settles.** A constraint's lifetime **IS the store instance's lifetime**, so **the
instance's own collection is the deletion site and the bound**. **`DEF-J` and `R16` are withdrawn —
NOT defects**; the absence of a `.delete` site is the model working as designed. **The measured
figures survive as a CHARACTERISTIC, never as a defect measure: `647,128` bytes over `200` pairs,
with `3` `.set` sites and `0` `.delete` sites — sized, known, and intended for a session-long
instance.** **NO retention change, cap, deletion site or declared figure is asked for, and no later
pass of ours may re-file a finding on that ground.** The supervisor's earlier reading — *"the
answer and the question do not meet"* — is **withdrawn**, and the old state word it carried
(`UNCHANGED`) is quoted only in the archive.

### (ii) Withdrawn by us, because the filing did not survive contact: `DEF-R`, `DEF-V`, `DEF-T`'s filed claim

**`DEF-R` — WITHDRAWN, NOT REPRODUCED.** The `constraints()` reorder **never reproduced at either
version**: five snapshot points, a batch construction and a removal/re-add, in both versions —
registration order at all five points, **byte-identical output in both**. **A filed defect that
cannot be reproduced in the version that filed it is withdrawn as unproven, not carried.** Note
what that costs us: `1.0.1` minted a `registrationSeq` and sorts by it anyway
(`constraints.mjs:368-371`, `:438-440`, `:689-701`) and retired the "no order" declaration
(`index.d.ts:818`) — **so the ask was met and the defect was not real.** Live residue, kept so it
is not lost: the shipped `README.md` still says *"no function, no order, no `enabled`"*, i.e. it
disclaims the order the declaration now promises.

**`DEF-V` — NARROWED TO A DIAGNOSTIC WISH, NO DEMAND.** The supplied-`undefined` tier: the bytes
are **unchanged** at both versions (`write(handle, ['a'], undefined, 1)` → `AddressMalformed`) and
**the package's own record rules the refusal CORRECT**, calling the specific code and message a
*"could have"* (`strata/decisions.md:2783`, `2787-2791`, `declared`). **The row stops demanding a
code change: no upstream issue and no fix shape is owed for it.** What survives is a diagnostic
preference, recorded as such and priced at nothing.

**`DEF-T` — THE FILED CLAIM DID NOT REPRODUCE.** *"One refusal, two spellings"* was the claim, and
the constraint members' receiver message is **byte-identical to the facade's in both versions**.
**What DOES stand is narrower and worse for the surface than one string:** **four distinct
spellings across the fourteen members** (`read`/`readLiteral`/`write`/`delete`/`rollback`/
`unlisten`/`addConstraint`/`constraintOn`/`constraintOff`/`removeConstraint` share one; `listen`,
`removeListener` and `register` each spell their own), **and two construction sites for argument
refusals** (`constraintOn(pair, undefined)` rebuilt at `constraints.mjs` as a `TypeError`;
`register(handle, undefined)` at the facade as a plain refusal `{status, message, log}`). The
"two spellings" sentence is withdrawn; **the re-scoped observation is what this document carries,
with no demand attached** — it is a preference about consistency, not a broken clause.

### (iii) The two earlier architect withdrawals, still standing from `2026-10-14`

**THE VISIBLE COMMIT REGISTER — withdrawn.** *"Also stop asking for a visible commit register. The
commit register is for tracking midflight changes and operates on the JS thread, it will be empty
when the store is at rest anyway."* Decision row:
`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`. The register is a mid-flight,
JS-thread structure; asking a store published from an addon for one is a category error. Its only
legitimate observable is the attempt's own record on the failure arm, which the package already
ships. **`1.0.1` re-opens neither this nor the row that carried it: it added no register, so the
ruling is honoured** — `declared` in the decision row, and `observed` in the member census the
`1.0.1` probe took, where none of the `14` members enumerates in-flight commits.

**THE OP ID AS A REVERSAL PARAMETER — withdrawn.** *"The opID is the correct parameter, stop
calling that a defect. This is separate from the rollback not being constraint-checked."* Decision
row: **`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`**. The op id is the correct parameter of a reversal verb;
**recording and reversing are different acts, not different values.** The surviving ask on that
surface was `DEF-W` — and it is now **closed as asked** (section 4). **`1.0.1` re-opens neither
withdrawal**, and the dated clause on that row records that its *"the reversal path is not
constraint-checked"* is **historically true and currently false**.

### (iv) The discipline this project now applies

**Four withdrawals in two days — one of the architect's demand and three of our own filings — are
a pattern, and it is ours to name.** A filing that outlives its evidence teaches a maintainer to
distrust the next one, and a filing that prices a preference as a defect spends the same credit.
**So the rule this project now applies: a consumer preference belongs in the catalogue as an
OBSERVATION WITH ITS COST ATTACHED; it becomes a defect only when it breaks a clause this
consumer's own contract requires.** `DEF-V` and the `DEF-T` residue are filed under that rule; the
retention demand was withdrawn under it by the architect; and `DEF-R` is withdrawn because the
evidence never existed to begin with.

---

## 4. What is closed and must not regress

**The nine closures of `1.0.1`**, each with the code path that closes it — **not its commit**, so a
maintainer can check the mechanism rather than a message.

- **`DEF-M`** — the failing-repair arm now composes **ONE floor call per distinct address, at that
  address's own first owed op**, so the **pre-attempt value stands**, and the passing arm's
  `record.op.after` reads the repaired `1` where `1.0.0` echoed the refused `9`. Code path:
  `kernel-terminal.mjs:171-236`, `:275-330`; `constraints.mjs:778-781`. **Regression
  observable:** after a failing repair attempt `read` answers the repaired value, **and** a
  successful repaired write returns an `op` whose `after` equals the value the store then hands
  back.
- **`DEF-W`** — **CLOSED AS ASKED**: the reversal is judged **at the terminal state it leaves,
  ONCE, never per unwinding step**, and a reversal inside a kernel-driven pass is **not** judged,
  **so `R8` holds — four adversarial arms show the judge never consulted and the floor still
  reached `5`**. Code path: `index.mjs:509-525`; `constraints.mjs:1205-1208`, `:1220-1246`,
  `:1265-1289`, `:1310-1341`, `:1467-1499`. **Regression observable:** an at-rest reversal over a
  state a registered constraint forbids is refused, and the judgement runs exactly once, at the
  terminal state. *(Its residuals are the NEW rows `DEF-X`, `DEF-Y`, `DEF-Z`, `DEF-AA`, `DEF-AB` —
  not this row's continuation.)*
- **`DEF-H`** — a constraint refusal crosses as **`ConstraintPassRefused`** with the kernel's token
  at `log[].state`; **`FileCommitFailed` is the save's alone**, proven by a `chmod 0500` file
  write. Code path: `constraints.mjs:1033-1042`. **Regression observable:** a constraint refusal
  whose `status` is `FileCommitFailed`, or a save failure that is no longer `FileCommitFailed`.
- **`DEF-N`** — a well-formed pair answering non-`true` now answers
  **`ConstraintRefusedAtRegistration`** **at add, at batch and at re-enable**; the malformed entry
  keeps `ConstraintListInvalid`. Code path: `kernel-registration.mjs:506-515`. **Regression
  observable:** a well-formed pair refused with the shape code `ConstraintListInvalid`.
- **`DEF-P`** — **a DECLARATIVE closure:** one `id` at N addresses is **LAWFUL at every act**
  (`index.d.ts:902-921`); behaviour was already right, so this is the declaration catching up.
  **Regression observable:** the declaration calling that pair unlawful again while the code unions
  it.
- **`DEF-Q`** — the sentence interpolates **the registry row's own address** (`… at ["a"]`,
  `… at ["deep","path"]`), and `undefined` appears **nowhere** in the family's messages. Code path:
  the `KC-3` message template. **Regression observable:** any message in the family containing
  `undefined` for a column the entry itself carries.
- **`DEF-L`** — the shipped `README.md`'s **`14` rows match the `14` observed members with arities
  agreeing**, `settle` is **absent**, and the consumer guide now rides `files`; the probe reports
  `documented-but-not-observed: []` and `observed-but-not-documented: []`. Code path: `README.md`
  and the tarball's `files` row. **Regression observable:** any README row naming a member the
  module does not ship, or a non-empty diff from that probe. *(Residue, not a reopening: `DEF-AC`'s
  guide version line, and `DEF-R`'s note that `README.md` still disclaims an order the declaration
  promises.)*
- **`DEF-U`** — **`DECLARED-ONLY` — never `observed`**: the release record says **`1081` tests ·
  `1080` pass · `0` fail** at the bump, and the held cell's subject moved (the repaired-write floor
  answers `ConstraintPassRefused`/`KC-3` where `1.0.0` answered `FileCommitFailed`/`KC-8`). **No
  tests ship in the tarball, so the suite's state is REPOSITORY-INTERNAL** and this document makes
  no measurement of it. **Regression observable:** the record and the suite disagreeing again
  without the disagreement being filed — read the record's count line against the held cell.
- **`DEF-S`** — **closed at four instants** (landing pass, registration, synthetic re-run, and a
  **bare-string** throw), all `ConstraintBodyThrew` **with a `log`**, **and narrowed at the
  judgement** (which is `DEF-Y`, filed separately so neither half is read as the other). **Bonus
  worth recording: a body can no longer launder a forged `{status:'ConstraintPassRefused'}`
  through the surface.** **Regression observable:** a body's throw crossing raw, or as a bare
  string, with no `status`, `message` and `log`.

**And the earlier closures, which a `1.0.1` fix pass must not disturb:**

- **`DEF-A` — CLOSED at `0.4.0`** (re-confirmed `0.5.0`, `1.0.0`, and not reopened since): a
  caller-supplied accessor's throw was laundered into the package's own refusal shape, and a caller
  could forge a status. Path: the config path stands **outside** the `try` (`index.mjs:408-410`)
  and the discriminator is a **`Symbol.for` identity mark**, not the presence of a `status` member.
- **`DEF-F` — CLOSED at `0.3.1`**: the constraint kernel was not shipped. Path:
  `src/constraint-kernel.mjs` is a `files` entry and the write itself evaluates constraints.
  *Qualifier so the closure is not over-read: published is not exported* — the kernel is not in
  the `exports` map.
- **`DEF-G` — CLOSED at `0.5.0`** (re-confirmed `1.0.0` on the ancestor-sibling arm): the reversal
  overshot its scope and destroyed a lawful pre-existing value no constraint had judged. Path: the
  rollback-composition change whose own rationale reads *"Overshoot is a defect"*.
- **`DEF-K` — CLOSED at `1.0.0`**: the shipped batch element carried no body. Path: the declaration
  now declares `{address, id, constraint}` with the body required, and the code reads exactly those
  three.

**The one line: any of these four earlier closures regressing, or any of the nine above regressing,
shows up as a single observable — a typed consumer's handler for a DECLARED arm stops catching a
refusal it caught at `1.0.1`, or a value the store hands back differs from the value the record
names.** That is what to watch; nothing more elaborate is needed.

---

## 5. What we are not asking for

- **No retention change or bound.** `DEF-J` and `R16` are withdrawn by the architect's ruling
  (section 3(i)). **No deletion site, no cap, no declared figure.** The `647,128`-byte figure is a
  characteristic a consumer budgets against, never an ask.
- **No public commit register.** Withdrawn `2026-10-14` (section 3(iii)); the attempt's own failure
  record is the observable, and it already ships.
- **No re-typing of the reversal parameter.** The op id is the lawful parameter (section 3(iii)).
  Nothing here asks for a different argument or a different verb.
- **No new dependency.** Nothing above requires the package to add a dependency, a runner, a build
  step or a fourth leg — including the pre-publish checks asked for in `DEF-AC` and
  `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`, which are assertions, not tools.
- **No patch from us.** This project catalogs; the upstream fixes. **No byte of
  `node_modules/**`, of any published artifact, or of `../Provident-Storeroom` was written by this
  pass**, and none will be.
- **Standing fact about our own unit, so no ask is read as needing a prerequisite:**
  `U-STORE-CONSTRAINT-REGISTRY` is admitted `OPEN` and activates nothing — its contract stands at
  `docs/specs/store-constraint-registry/contract.md`, no red row is authored until the architect's
  one spec-gate approval, and no package verb is imported or re-declared by that layer.

---

## 6. How to reproduce any of this

- **Install:** `npm i provident-storeroom@1.0.1` — the version whose bytes every `1.0.1` row above
  was measured against. Comparisons: `@1.0.0` (and `@0.5.0` where a `1.0.0` row's earlier state
  cites it).
- **Runtime:** node `v24.20.0`, uid `1000`, `linux-x64-gnu` platform artefact. Installs were made
  with `npm install provident-storeroom@<version> --cache /tmp/npmcache-pk`.
- **Probe directories**, cited by row in `docs/defects.md`: **`/tmp/probe-storeroom-101`** — the
  `1.0.1` review's install, `14` arms, raw output under `out/`; **`/tmp/probe-storeroom-100`** —
  the `1.0.0` comparison, the source of every `1.0.0`-vs-`1.0.1` delta above; and the `0.5.0`
  comparison, `/tmp/probe-storeroom-050`, behind `DEF-Q`/`DEF-M`'s earlier readings. Earlier
  baselines, if still on disk: `-020`, `-031`, `-040`.
- **The probe scripts are the CONSUMER's and are NOT shipped** — not in this repo's published
  artifacts, not in the package, and not part of what the upstream receives. Each block in section
  2 states instead the shortest sequence of calls that shows its defect; if a probe directory has
  been cleared, the block's own steps are the record.
- **Registry fact** as measured by the supervisor: `provident-storeroom@1.0.1` is published and
  `dist-tags.latest = 1.0.1`.
- **Two reviews, one spine:** the live probe yields `observed`; the source critique yields `read`
  and `declared`. **Where they disagree, `observed` wins on behaviour and the disagreement is
  printed in the row.** No release note, guide or commit subject in this document is presented as a
  measurement.

---

## 7. History (one paragraph; not re-narrated)

**Rounds 1-9 addressed `provident-ssr`** — a different package, whose source repo is the adjacent
`../Preempt-Providence` — and every item they filed is resolved or closed: the `REQ-GAP` series
across `0.1.1`-`0.1.3`, the adapter-parity, journal-replay and isolation items, the
`UndoRedoReport` item at `0.2.1`, and `UNDO-REDO-DESTROY-STATUS`, which was **measured
unreproducible at `provident-ssr@0.5.1`** and is closed; no `provident-ssr` round is open and this
document files nothing against that package. **Round 10 addressed `provident-storeroom`'s LOAD
path** in the `0.1.x` era — its two residue rows are sections 2.7 and 2.8, stated as `read` and not
re-measured, with their re-measurement owed. **Round 11 is this constraint surface, through
`0.2.0` → `0.5.0` → `1.0.0` → `1.0.1`**, and sections 1-5 assemble it as it stands after `1.0.1`'s
nine closures, one architect withdrawal and three of our own. **The as-filed text of every round is
preserved byte-identically in the archive and not re-narrated here: the pre-`2026-10-14` text at
`archive/handoffs/2026-10-14-HANDOFF-as-filed-before-regeneration.md` (`81,664` bytes, git
`ab60c2e`), and the pre-regeneration `1.0.0` text at
`archive/handoffs/2026-10-27-HANDOFF-as-filed-before-1.0.1-regeneration.md` (`56,897` bytes, git
`bc5b398`).**

---

**Label audit:** every `observed` above is a probe execution quoted from the catalogue; every
`read` is a `path:line` citation or a quotation of shipped text; every `declared` is the package's
own prose or a commit subject, never a measurement; every `derived` states what it was inferred
from; the reproduction steps are instructions, not observations, except where a step quotes an
`observed` answer. **Section 2.10 carries no demand, by the architect's ruling, and is labelled
`OBSERVATION` wherever it is named.**
