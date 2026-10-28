# Provident-Electron → Provident-Storeroom: the open package issues at `1.2.0`

**Regenerated `2026-10-28` for `provident-storeroom@1.2.0` — this is Round 12, the issue
document owed to the package's maintainer.** This pass rewrote the file WHOLE. It is a
**REGENERATION and not an amendment**, because the central claim of the text it replaces —
*a write that reports refusal can leave its own value standing* — **is FALSE of this release**
(`DEF-AE`, CLOSED; section 1's lead). A reader acting on the old text would re-file a closed
defect and price a repair this package has already made.

**The as-filed bytes of that previous document are preserved twice: byte-identically at
`archive/handoffs/2026-10-28-HANDOFF-as-filed-before-1.2.0-regeneration.md` (`51,018` bytes,
`684` lines, `cmp`-verified by the supervisor's shell seat) and in git at commit `c123df9`.**
That copy is the authority for any sentence of the `1.1.0`-era text, and nothing here
re-narrates it. **The two earlier regenerations are preserved the same way and are named in
section 7, not re-narrated here.**

## What this document is for, and who acts on it

The issue-handoff assembly required by `AGENTS.md` item 7. Its subject is
**`provident-storeroom`** (the published npm package) and its platform artefact, whose source
repo is the ADJACENT `../Provident-Storeroom` (the sibling project), NOT `../Preempt-Providence`.
**The upstream that acts on this document is that sibling repository.** Each block in section 2
is written so a maintainer there can reproduce the row against an install, find the code path,
and decide the fix.

**This project CATALOGUES; it does not patch the package** (`AGENTS.md` item 7). No line below
reports a fix we applied, and none may be read as one. A fix observed to land is recorded as a
CLOSURE with the version that landed it and the code path that closes it (section 4), so it is
not re-filed. **Nothing was written into `../Provident-Storeroom`, into `node_modules/**` or into
any published artifact by this pass.**

## Label discipline (binding on every sentence here)

- **`observed`** — a probe was executed and its output is quoted. Never inferred.
- **`read`** — a citation to code, a declaration or a shipped byte, given as `path:line`.
  Evidence of what the bytes SAY, never of what they DO.
- **`derived`** — inferred, and the sentence says from what.
- **`declared`** — a package's own claim (README, guide, release note, declaration prose, commit
  subject). **Never evidence of behaviour.** A commit message is `declared` and is never evidence;
  that matters here, because the release's commit subject advertises an edit ("eleven sites") that
  is a version-figure count serving no consumer row (section 3).

Anything this document could not cite or measure is marked `uncited` or dropped.

**Provenance of the catalogue this renders:** `docs/defects.md`, its `## OPEN` region and its
**`2026-10-28` `1.2.0` block** — the dated block carrying the disposition tally, the three new
rows and the two observations. **Catalogue stamp: `2026-10-28`.** Where this document and that
file disagree, **that file governs**. Decision rows are cited **BY NAME**, never by line — that
ledger is appended-to and its line anchors drift: `A-THROW-MUST-MEAN-NOTHING-LANDED` (with its
`1.2.0` dated clause), `VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`,
`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`,
`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`,
`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER` — all in
`docs/decisions/ACTIVE-store-and-package-binding.md`.

**The two reviews behind every state below.** **(1) A `10`-arm LIVE PROBE of the INSTALLED
`1.2.0`**, driven against `1.1.0` and `1.0.1` on the SAME HARNESS for comparison, raw output under
`/tmp/probe-storeroom-120/out/` — every such result is labelled `observed`. **(2) A SOURCE
CRITIQUE** of the checkout at `1.2.0`, against the `1.1.0` installed bytes — `read` for code and
shipped-byte citations, `declared` for prose. **Where the two disagree the probe wins on
behaviour: `observed` beats `read`, and the disagreement is recorded in the row, never hidden**
(section 2.3 carries the one such disagreement of this release, on host 3).

**The tally, printed with its terms:** `2` CLOSED (`DEF-AE` · `DEF-AB`) + `3` NARROWED (`DEF-AH` ·
`DEF-AI` · the `seq` half of `DEF-AB`, homed in `DEF-AI`) + `2` UNCHANGED (`DEF-X` · `DEF-AC`) +
`3` NEW (`DEF-AJ` · `DEF-AK` · `DEF-AL`) + `1` OBSERVATION with no demand (`DEF-AM`) = **`11`
dispositions** (`2 + 3 + 2 + 3 + 1 = 11 ✓`). **`DEF-AD` stands BESIDE the tally as numbers only,
carries no demand, and is counted in no bucket.** **`14 / 14` earlier closures were re-driven at
`1.2.0` and re-verified `HOLDS`** on the harness that measured them at `1.1.0` (and `14 / 14`
there too, so nothing regressed), and **`R8` HOLDS**. **This pass re-derives nothing: every claim
below carries the label the catalogue gives it.**

---

## 1. What is open, ranked, one page

**Read the lead before the table: the release's one genuine repair is the reason this document
was regenerated, and it is credit.** **`DEF-AE` — CLOSED, and it is a real integrity repair: *a
write that reports refusal now leaves nothing of its own effect standing.*** **`observed`: at
`1.1.0` the arm was `write(['b'],'mem',1)` with a listener issuing a reversal that a registered
constraint refuses — the outer `write` threw `ConstraintPassRefused` while `read b` answered
**`1`**; at `1.2.0` the same call throws and `b` answers **`ABSENT`** (`AddressNotFound`).** The
act the caller was told did not happen no longer happens, which is what our own principle
`A-THROW-MUST-MEAN-NOTHING-LANDED` asks. **The mechanism (`read`):** each commit opening caches
the store's own `journalMark` (`src/entry/state.mjs:360-406`) and the compensation restores to
**that mark** rather than to the journal head (`constraints.mjs:1905-1922`), so the enclosing
write's own op sits BEHIND the mark and comes off. **`journalMark` is a new native export, called
once per opening commit (`observed`: `200` calls for `200` reversals).** **`DEF-AB`'s spelling
half closed with it** — the `["a"]` form is gone from every refusal family measured
(`log[0].message` `1 → 0`; the nested-address family `1 → 0`), one renderer closing both
renderings at once (section 4).

**That credit does not reach the six other hosts.** The same principle is **MET ON THE WRITE PATH
and NOT YET MET ON THE OTHER SIX HOSTS** (`A-THROW-MUST-MEAN-NOTHING-LANDED`, dated clause
`2026-10-28`), which is where rows 3 and 4 below sit.

**The four things to fix, in the order a consumer feels them:** **(1)** the shipped guide denies
the release it ships in, and the release's one behaviour change is declared in **no shipped
document** (`DEF-AC`); **(2)** the restart-budget refusal names a refuser that never refused
(`DEF-AL`); **(3)** five of seven hosts still leave a violating reversal standing, and the one
witness is destroyed by the act that most needs it (`DEF-X` / `DEF-AH`); **(4)** the new restore
introduced or exposed two reporting defects, and the log's `seq` still fabricates (`DEF-AJ` /
`DEF-AK` / `DEF-AI`).

| # | Id | One line | Reachability | Versions measured | Demand or observation |
| --- | --- | --- | --- | --- | --- |
| 1 | `DEF-AC` | The shipped guide denies the release that ships it, and the release's one behaviour change is declared in NO shipped document | `published` — both files ride `files` | `1.2.0` (`observed` inside the registry install + `read`) | **DEMAND** — generate the cut-state and the version line from the manifest/tag and assert them before publish, and ship the change list |
| 2 | `DEF-AL` | The restart-budget refusal names a refuser that never refused | `published` | `1.2.0` (`observed`, **CONFIRMED** — the budget arm, the two-pair naming, and the byte-identical message) | **DEMAND** — give the budget its own status or its own sentence, and stop naming a passing address |
| 3 | `DEF-X` | Five of seven hosts still leave a violating reversal standing — the identical seven-host table | `published` | `1.2.0`, `1.1.0` (line-for-line identical) | **DEMAND** — judge every host's terminal state, or refuse an in-commit reversal |
| 4 | `DEF-AH` | The one witness to a lost reversal is emptied by exactly the act that most needs it | `published` | `1.2.0` (`observed`, four arms; `1.1.0` had none) | **DEMAND** — carry the lost request into the record the caller gets, and withdraw the false bound |
| 5 | `DEF-AJ` | A correct whole-commit undo is reported as a failed restore | `published` | `1.2.0` (`observed`; `1.1.0` said the opposite) | **DEMAND** — compare the verdict against the commit's mark, or name the baseline it measured |
| 6 | `DEF-AK` | A nested write's refusal inside a constraint body is replaced, and the inner cause is unrecorded | `published` (path shipped) | `1.2.0` (`observed`, **CONFIRMED** — the arm has since been driven, `11` of `11`) | **DEMAND** — carry the inner status, message and log instead of replacing them |
| 7 | `DEF-AI` | The refusal's `log` entry carries `seq` as a literal `1` while the journal's own counter reads `41` | `published` | `1.2.0` (`observed`) | **DEMAND** — mint `seq` from the attempt's counter, or omit the member |
| 8 | `DEF-AB` — **its `seq` half only** | One refusal's entry lies about its position; cross-referenced to `DEF-AI`, which homes it | `published` | `1.2.0` (`observed`; spelling half CLOSED, section 4) | **DEMAND** — nothing is asked twice: `DEF-AI`'s fix shape is this row's |
| 9 | `DEF-AD` | Per-reversal cost: `701.5` native reads per permitted reversal, `1,004` per refused one, at `200` pairs | `published` | `1.2.0` / `1.1.0` / `1.0.1` (`observed`) | **OBSERVATION — NO DEMAND** |
| 10 | `DEF-AM` | The `discarded` witness is non-enumerable and names the whole enabled registry, not what moved | `published` | `1.2.0` (`observed` + `read`) | **OBSERVATION — NO DEMAND** |

**Ten open rows; `8` carry a demand and `2` are observations.** Detail is in section 2 only.
**Before pricing any row above, read section 3:** five withdrawal events removed seven named
items from this document's ask list, and a maintainer who implemented a withdrawn demand would
have built something we no longer ask for.

---

## 2. The open set, one block per row

Each block carries the catalogue's four-part form plus reachability, the versions, the quoted
symptom, a runnable reproduction, the code path, an upstream fix shape and **how you will know it
is fixed**. **No defect below is invented by this document**; each has a row in
`docs/defects.md`'s `2026-10-28` block. **The two observations (`2.9`, `2.10`) ask for nothing and
say so in their own first line.**

### 2.1 `DEF-AC` — The shipped guide denies the release it ships in, and the release's one behaviour change ships in NO document

**(a) The symptom, and it is two halves.** **(1) `observed`:** inside a registry install of
`1.2.0`, the shipped `README.guide.md:52` prints *"THE SIX FIGURES THIS GUIDE POINTS AT READ
`1.2.0`, AND `1.2.0` IS PREPARED, NOT CUT … `git tag --list` carries `v1.0.0` · `v1.0.1` ·
`v1.1.0` and no `v1.2.0` … no `npm install` was run against the registry"* — **five dated layers
stack behind it, each superseding the last**: `:41` (*"…and that release has not been cut"*, still
printed), `:48` (*"THE VERSION THIS GUIDE DESCRIBES IS `1.1.0`"*), `:50` (*"THE MANIFEST IS
`1.1.0`, AND THIS GUIDE CLAIMS NO `1.2.0`"*), and `:52`. **`README.md` declares no version string
at all and is byte-identical to `1.1.0`'s** (`observed`). **(2) The sharper half:** **no changelog
or release-note path ships at all** — the `files` allowlist is `index.mjs`, `README.md`,
`README.guide.md`, `index.d.ts`, `src/entry/`, `src/constraint-kernel.mjs` (`20` files,
`1,149,852` bytes, `read`) — and **`/opening mark|journalMark|restoreMark/` returns `0` hits
across all three shipped documents** (`read`; the probe's own grep corroborates). **The release's
one behaviour change — the opening-mark restore that closes `DEF-AE` — lives only in the
repo-root `RELEASE-NOTES.md`, which ships nowhere.** So a consumer on the installed tarball
**cannot learn, from the tarball, that the write path's integrity changed**.

**(b) Reachability and versions.** `published` — both documents ride `files`. Measured at
`1.2.0`; the class is unchanged from `1.0.1` and `1.1.0`, where the same guide carried fewer
layers.

**(c) Reproduction.** `npm i provident-storeroom@1.2.0`; `npm pack provident-storeroom@1.2.0` and
untar it; then: (1) `grep -n "not been cut\|PREPARED, NOT CUT\|THIS GUIDE DESCRIBES\|CLAIMS NO"
README.guide.md`; (2) `grep -c "version" README.md`; (3) `grep -rniE "opening mark|journalMark|restoreMark" .`
inside the unpacked tarball; (4) `node -p "require('./package.json').version"` and compare with
the guide's version line. **`(3)` returning `0` is the defect**; `(4)` disagreeing with `(1)` is
the other half.

**(d) Code path.** The sibling's `package.json` `files` allowlist (no changelog entry, no
release-note entry) and `README.guide.md`'s hand-authored version block at `:41`–`:52`.

**(e) Fix shape — upstream-owned, DECLARATIVE plus a check.** **Generate the cut-state and the
version line from the manifest and the tag**, and **assert both before publish** — the same
assertion `DEF-L` asks of the README's member table. **And ship the change list:** a changelog or
release-note path inside `files`, whose top entry names the behaviour change a consumer must know
about (here: the opening-mark restore). **This is an assertion in the release script, not a
tooling dependency** (section 5).

**(f) Fixed when:** within the tarball, the manifest's `version`, the guide's version line, the
guide's tag claim and the shipped change list's top entry all print the same string, and
`/journalMark|opening mark|restoreMark/` has at least one hit in a shipped document.

### 2.2 `DEF-AL` — The restart-budget refusal names a refuser that never refused

**(a) The symptom.** **`observed`, the budget arm:** a pair answers `true` on all **`4`** asks
while a fresh lawful reversal is raised per ask; the write then throws
`status: 'ConstraintPassRefused'` with the message *"'a' was refused by a constraint pass, the
state this act would leave is not one the registered constraints admit"* — **and no pair
refused.** The reason is the spent `RESTART_LIMIT = 3` budget, which the entry's own sentence in
the same refusal states correctly (*"the check was restarted 3 times … the restart budget is
spent and the check does not pass"*) **while naming no refusing pair**. **`observed`, the naming:**
with two pairs the thrown sentence names `'d/p'` — the **first watched** pair, which passed on
all three asks — while `'d/q'` is the pair whose raise spent the budget. **`observed`:** the
`log[0].id` is `passer`, a pair that answered `true` on every ask it received, so
**registration order decides the accusation**. **`observed`, why that is
worse than cosmetic:** a **genuine** refusal of an at-rest reversal returns the same generated
`sentence` shape, so **only `log[0].message` distinguishes "a pair refused" from "the budget was
spent"** — and `log[0].id` names a pair that passed. **A consumer reading the thrown form alone
is told a law was broken when the instrument merely ran out of restarts.**

**(b) Reachability and versions.** `published`. **All three halves are `observed` at `1.2.0`** on a
dedicated arm — the budget arm (`4` asks, all `true`, `4` lawful reversals, `ConstraintPassRefused`),
the two-pair naming, and the **byte-identical** message comparison against a genuine at-rest
reversal refusal. **Nothing in this block is owed to a further measurement.**

**(c) Reproduction.** `npm i provident-storeroom@1.2.0`; create a `mem` store; seed `a` = 7;
register one pair over `['a']` whose body increments a counter and returns `true` every time;
register a listener that raises a fresh lawful reversal on each commit; drive a write that lands
`a` = 5 — three restarts are taken, the budget is spent, and the write throws
`ConstraintPassRefused`. Print `thrown.status`, `thrown.message`, `thrown.log.length`,
`thrown.log[0].id`, `thrown.log[0].message` and the pair's call count: **the count proves every
ask answered `true` while the sentence says a pair refused.** Repeat with two pairs at `['d/p']`
and `['d/q']` and print which address the sentence names.

**(d) Code path.** **`read`:** the thrown refusal is minted from the **watched address of the
first pair** (`constraints.mjs:1446-1453`, `:2269-2274`, `src/error.rs:386-389`) while the budget
refusal is authored **separately** (`constraints.mjs:2285-2289`) — **two authors mint one
sentence's halves.**

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Give the budget its own status or its own
sentence, naming the budget and never a pair**, and **stop naming an address that passed.** This
is the `DEF-H` class — a status and a sentence naming a layer the failure did not happen at — in
the one sentence a consumer reads first.

**(f) Fixed when:** the budget arm's refusal carries a status or a message that says the restart
budget was spent and names no pair, and a genuine pair refusal is distinguishable from it without
reading `log[0].message`. The declared limit `L2` (*the check is bounded at three restarts per
terminal act and fails closed past the budget*) stays true either way — `observed`, `3` asks,
`4` raised, one `log` entry, the store restored.

### 2.3 `DEF-X` — Five of seven hosts still leave a violating reversal standing

**(a) The symptom, and the count cell is the point: `2 / 7`, and the count does not move.**
**`observed`:** the two seven-host tables at `1.2.0` and `1.1.0` are **line-for-line identical**.
Hosts **1** (top-level) and **2** (inside a `write`'s own commit) judge with **`1` tier-null
invocation** each and the effect does **not** stand. Hosts **3** (repair body), **4** (registration
evaluation), **5** (delete's listener delivery), **6** (delete's constraint pass) and **7**
(reentrant reversal-then-write) make **`0` judge invocations** and **the violating effect STANDS**.
**The critique's disagreement, recorded and not hidden:** the critique read host `3` as judging by
derivation; **the probe measured `0` invocations and the refusal's `5` standing, so host `3` does
not judge and the count stays two.**

**(b) Reachability and versions.** `published` (installed entry alone). `1.2.0` and `1.1.0`
measured; `1.0.1` filed. **This row is `UNCHANGED`, not narrowed** — the release neither improved
nor worsened it.

**(c) The rule the artefact implements, so the table is checkable (`read`, unchanged).** A call
**opens** a commit unless it **joins** the one in flight — joining iff it names a commit, or,
unnamed, iff `EXTERNAL_DEPTH <= externalAt[top]` (`state.mjs:431-443`). `write` brackets at its own
entry. **A reversal is judged IFF AT REST; otherwise it raises ONE restart request stamped with
`currentWindow`, which ONLY THAT WINDOW'S DRAIN consumes.** Host `2` is why the release's repair
works; host `7` is why the same stamp loses the request (section 2.4).

**(d) Reproduction.** `npm i provident-storeroom@1.2.0`; create a `mem` store; seed `a` = 7;
register a pair over `['a']` that refuses `5` and increments a judge counter on every invocation;
then drive the identical reversal from each of the seven contexts in turn — top level; inside a
`write`'s own commit; inside a repair body; at registration evaluation; from a delete window's
listener; from a delete's constraint pass; and reentrantly, reversal-then-write. For each: print
the judge counter and `read a`. **Two of seven print `1` and `7`; five print `0` and `5`.**

**(e) Code path.** `state.mjs:431-443` (the join/open discriminator) and the at-rest gate the
judgement sits behind; the per-window drain that consumes a restart request.

**(f) Fix shape — upstream-owned, BEHAVIOURAL.** **Judge every reversal at the terminal state it
leaves regardless of an open attempt, or REFUSE a reversal issued inside an open commit.** What it
may not do is leave a state unjudged. **The one thing `1.2.0` shows is that the stamp is not a
monotone improvement:** the same stamp which makes host `2` judge is what lets host `7` lose its
request (`A-THROW-MUST-MEAN-NOTHING-LANDED`, dated clause).

**(g) Fixed when:** the seven-host table reads `7 / 7`, i.e. every host's judge counter is `>= 1`
and no host answers a success while the store holds a value a registered constraint refuses.
**`R8` must hold across the same change** (`observed`, four adversarial arms, `0` tier-null
invocations inside the kernel's unwinding, the floor reached, the `1.2.0` output byte-identical to
`1.1.0`'s apart from the install name).

### 2.4 `DEF-AH` — The one witness to a lost request is emptied by exactly the act that most needs it

**(a) The symptom, four `observed` facts.** **`1.1.0` had no probe arm for this row; `1.2.0` has
four.** **(1) `D1`** — a listener that **reverses THEN writes**: `0` judge invocations, **the
violating effect stands (`a` = `5`)** and **the outer write returns NORMALLY** — **nothing is
reported to the caller**. **`D2`** the control without the trailing write: `1` judge invocation,
caught, refused, restored (`a` = `7`). **`D3`** two reversals then a write: the same loss. **`D4`**
reversal, write, reversal: the same loss. **(2) The witness half that DID land:** a delete-window
listener that **only** reverses now yields `record.discarded = [{opId:"op-12", addresses:[["a"]]}]`
— a real improvement, faithful to the raise. **(3) THE NEW DEFEAT:** the **same** listener that
reverses **then writes** yields **`discarded: []`**, because the nested write's pass finds a
request of ANOTHER window and **clears it** (`constraints.mjs:1440-1441`) **before the record is
assembled**. **(4) A DECLARED BOUND THAT IS FALSE:** the guide's *"the fail-state is bounded by
the two acts that run none"* (`README.guide.md:1339`, `declared`) is **denied by host `7`**, which
runs a pass in a *different* window and loses its request. **Also `observed`:** the witness's
`addresses` is **the whole enabled registry, not the addresses the reversal moved** — with `200`
pairs, a one-address reversal yields `addresses.length === 200` and a **`1,721`-byte** record.

**(b) Reachability and versions.** `published`. `1.2.0` (`observed`, four arms); at `1.1.0` the row
was `read`-only and unproven. **This row is `NARROWED`: the witness landed; the write-path loss
does not.**

**(c) Reproduction.** `npm i provident-storeroom@1.2.0`; create a `mem` store; seed `a` = 7;
register a pair over `['a']` that refuses `5`; register a listener at a delete window that (var
`D1`) reverses and **then writes**, and (control `D2`) reverses only; drive a `delete`; print the
judge counter, `read a`, `record.discarded` and whether the outer call threw. **`D1` prints `0`,
`5`, `[]`, "returned normally"; `D2` prints `1`, `7`, a one-entry witness, "refused".** Then
register `200` pairs and repeat `D2` to measure the witness's width and bytes.

**(d) Code path.** `constraints.mjs:1440-1441` (the clear-before-assembly site) and the
per-window drain that consumes the restart request; the `discarded` member's construction point.

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Carry the lost request into the record the
caller actually receives** — a nested write must not clear another window's raise before the
record is assembled, or the clearing must be recorded in `discarded` rather than erasing it. **And
withdraw or prove the guide's bound sentence** (`README.guide.md:1339`): as printed it is false.
**The witness's width is `DEF-AM`'s halves, stated separately so neither row is read as the
other.**

**(f) Fixed when:** `D1`'s outer call either refuses or returns a record whose `discarded` names
the request it lost, and the guide's bounded-fail-state sentence matches what host `7` does.

### 2.5 `DEF-AJ` — A correct whole-commit undo is reported as a failed restore

**(a) The symptom.** **`observed`**, on the arm where the refused reversal lands on the **same**
address as the enclosing write (a prefix listener at `['b']`, a pair at `['b','x']`, the write
landing at `['b','x']`): at `1.2.0` **the state is RIGHT** — `b/x` = `7`, the pre-attempt value,
**the write un-landed** — and the refusal's log says *"the reversal was **NOT** undone at every
address it moved (**0** of the **1** address it moved stand again): `b/x` could not be restored
and stands at tier `mem` holding `7` where it stood at tier `mem` holding `1` before the
reversal"*. **The restore SUCCEEDED; the sentence reports a FAILURE — and `1.1.0` said the
opposite**: a true-sounding *"was UNDONE"* about a state that was **not** undone. **So the new
behaviour is the righter one described by the wrong baseline.**

**(b) Reachability and versions.** `published`. `1.2.0` (`observed`); the inverse lie at `1.1.0`.
New row, filed `2026-10-28`.

**(c) Reproduction.** `npm i provident-storeroom@1.2.0`; create a `mem` store; seed `b/x` = 7;
register a prefix pair over `['b']` that refuses a state in which `b/x` is not 5; register a
listener that reverses the write's own op; `write(['b','x'],'mem',1)`; then print
`read(b,['b','x'])`, `thrown.log[0].message` and the tier the sentence names. **The read prints
`7` — the pre-attempt value, correct — while the sentence reports a failed restore.**

**(d) Code path.** **`read`:** the verdict is **capture-based** (`constraints.mjs:1946-2065`) while
the act is **replay-based** (`:1905-1922`, `src/store.rs:2676`, `:2713`): the verdict compares
against **the reversal's own capture** — `1`, a value that belonged to the write being un-landed —
**instead of the commit's mark**. **The act is a journal replay, the verdict is a tier capture,
and no property says they must agree.**

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Compare the verdict against the commit's own
mark, not the reversal's capture**; or **state in the sentence which baseline it measured**, so a
consumer can tell a failed restore from a superseded one. **A refusal that reports a failure over
correct state is the same cost as one that reports success over broken state**: a consumer that
believes it will build a compensating write it does not need.

**(f) Fixed when:** on the same-address arm the sentence either says the commit's effect was
undone, or names the baseline (capture vs mark) that failed — asserted as: for every refusal, the
verdict's claim matches a read-back against the commit's mark.

### 2.6 `DEF-AK` — A nested write's refusal inside a constraint body is replaced, and the inner cause is unrecorded

**LABEL, CORRECTED `2026-10-28`: `observed` AND `CONFIRMED` — THE ARM HAS LANDED, AND IT IS**
**SHARPER THAN THIS ROW WAS FILED.** A dedicated arm drove it (`11` of `11`, deterministic across two
runs). **Four facts, all `observed`:** **(1) THE LOSS IS TOTAL AND THE CONTRAST IS DEMONSTRATED:** a
body's inner refused write crosses as `ConstraintBodyThrew` with `log.length: 1`, that entry the **outer**
attempt's (`kind: "outcome"`, `opId: "op-1"`), and the inner refusal's distinctive message literal occurs
**zero** times anywhere in the outer refusal — while the **same** refusal one level up returns
`ConstraintPassRefused`, the literal, and a **two-entry** log. **(2) THE CROSSED SENTENCE IS FALSE:** a body
that throws `new Error('marker-AK')` instead crosses as the same `ConstraintBodyThrew` whose generated
message **claims** *"a constraint body's throwable crosses as this refusal"* — and the marker occurs
**zero** times. Nothing of a body's throwable is conveyed at all, so the sentence asserts a conveyance the
bytes deny: the `DEF-H` class, in the one sentence a consumer reads first. **(3) THE SAME INNER REFUSAL IS
TREATED TWO DIFFERENT WAYS BY TWO HOSTS:** from a **listener** body it propagates **verbatim** — same
`status`, `message`, two-entry `log`, same `opId`; from a **constraint** body it is **replaced**. Which host
you are inside decides what you are told — a second such place, beside `DEF-X`'s two-of-seven. **(4) THE
REFUSAL IS INVISIBLE ABOVE, NOT EVERYWHERE:** a body that catches and rethrows sees it in full, plus a
kernel mark `Symbol(provident-storeroom.constraint-body-threw)` carrying the **outer** attempt's entry. The
reproduction in `(c)` is now the script of a driven arm, and the Round-12 note that described it as driven
was right: **the catalogue agrees, and this document carries the same label.**

**(a) The symptom.** **`read`:** a constraint body's inner refused `store.write` throws out of the
body; the kernel marks the body's throwable with `{address, log}` and the outer attempt crosses
rank **`18`** `ConstraintBodyThrew` — **and the `log` carried is the OUTER attempt's as it stood,
holding NO entry from the inner attempt.** So the inner **effect** comes off (good), but the inner
refusal's **status, message and log do not cross**: a consumer sees a body threw and cannot name
what actually refused. **`read`, the contrast that makes it a defect rather than a style:** the
**identical** inner write issued from a **listener** body propagates verbatim. **`read`, the
declared mismatch:** the generated message claims *"a constraint body's throwable crosses as this
refusal"*, while a body that throws `new Error('marker-AK')` conveys **nothing** — no status, no
message, no log.

**(b) Reachability and versions.** `published` — the path ships; **no probe arm of the `1.2.0`
review drove it.** New row, filed `2026-10-28`.

**(c) Reproduction (this is the owed arm).** `npm i provident-storeroom@1.2.0`; create a `mem`
store; register pair `P1` over `['a']` that refuses `5`; register pair `P2` over `['b']` whose
body performs `store.write(h, ['a'], 'mem', 5)` and lets it throw; drive a write at `['b']` and
print `thrown.status`, `thrown.log.map(e => [e.id, e.message])`, and whether any entry mentions
the inner refusal's status or the inner message substring. **Then repeat with `P2` as a
LISTENER body: the inner refusal's status and message appear verbatim.** The comparison across
those two lines is the measurement this row owes.

**(d) Code path.** `read`: the body-invocation catch attaches the OUTER attempt's log to the
throwable, and the inner attempt's record is discarded with the inner commit
(`kernel-foundations.mjs:196-204`, `constraints.mjs:2269`).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **The open question first, because it decides the
fix:** is replacing one refusal by another **the deliberate laundering rule this consumer records
in `DEF-S`**, where a cause is required to be **recoverable**? **If the substitution is lawful,
the inner cause must still cross as a member** — status, message and log — so a consumer can name
what refused. If it is not lawful, the inner refusal is the one that must cross.

**(f) Fixed when:** for a refused nested write inside a constraint body, the outer record carries
the inner refusal's `status` and `message` as members (or the inner refusal crosses unaltered, as
it does from a listener), and a body that throws a plain `Error` still crosses as a declared
`ConstraintBodyThrew` with its own message.

### 2.7 `DEF-AI` — The log entry's `seq` is a literal `1` while the journal's counter reads `41`

**(a) The symptom.** **`observed`:** on the reversal path and the judgement-throw path the entry's
keys go `["kind","id","message","opId","state"]` → `["kind","seq","id","message","opId","state"]` —
**six declared members on every path** — and `index.d.ts:350-358` still declares `readonly seq:
number` **REQUIRED** (nothing relaxed). **But** after **`40`** writes the journal's own counter is
**`41`** while the refused reversal's `log[0].seq` reads **`1`**. **`DEF-AB`'s own filed fix shape
was *"mint `seq` from the attempt's own counter (or omit it)"*** — **the member was restored and
the minting was not.** **A field that was missing was easier to notice than a field that lies.**

**(b) Reachability and versions.** `published`. `1.2.0` (`observed`). **`NARROWED`: the field is
back; what it holds is a lie.**

**(c) Reproduction.** `npm i provident-storeroom@1.2.0`; create a `mem` store; drive `40` writes
so the journal's counter reads `41`; then drive an at-rest reversal a registered constraint
refuses; print `Object.keys(thrown.log[0])` and `thrown.log[0].seq` beside the number of ops the
journal has recorded. **`seq` prints `1`; the counter prints `41`.**

**(d) Code path.** The refused reversal's log-entry construction — the `seq` member is minted by
the refusal rather than read from the attempt's counter (`read`).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Mint `seq` from the attempt's own counter, or
omit the member** and relax the declaration to match. **Do not ship a declared required member
whose value is a constant.**

**(f) Fixed when:** every log entry's `seq` equals the position the journal itself recorded for
that op — asserted as: no entry's `seq` collides with an op the same attempt recorded, and
`seq === 1` appears only where the journal's counter is genuinely `1`.

### 2.8 `DEF-AB` — its `seq` half only, and it is `DEF-AI`'s row

**(a)** The spelling half is **CLOSED at `1.2.0`** and is recorded in section 4 with its code
path: one renderer (`addressSpelling`) serves the thrown `subject` and the log sentence, so the
`["a"]` form went `1 → 0` in `log[0].message` and the nested-address family went `1 → 0` as well,
across three address families **`observed`**. **(b)** What survives of the row is **the `seq`
half, and it is `DEF-AI`'s** (`2.7`). **Neither row may be quoted alone**: the catalogue states
this explicitly, and **nothing is asked here that is not asked there.** **(c) How you will know it
is fixed:** exactly `2.7`'s fixed-when, and the spelling half's in section 4.

### 2.9 `DEF-AD` — Per-reversal cost — **OBSERVATION — NO DEMAND**

**Nothing is asked for in this block, and no fix shape exists in it.** **(a) `observed`, the same
harness on all three installs (`200` pairs, `200` at-rest reversals):** native reads per
**permitted** reversal **`701.5`** and per **refused** reversal **`1,004`** — **identical to
`1.1.0`** (`400` each at `1.0.1`); **`200`** body invocations; **`+200`** native `journalMark`
calls, the price of `DEF-AE`'s repair; heap delta per pair **`4,659` → `4,876` → `4,915` B**;
tarball **`1,106,583` → `1,149,852`** bytes (`+43,269`, `+3.9 %`), of which the guide alone is
`+17,747`. **(b)** Reachability `published`; versions `1.2.0` / `1.1.0` / `1.0.1`. **(c)
Reproduction:** register `200` pairs across `200` addresses, instrument each body with a counter,
drive `200` at-rest reversals through a store whose native reads are counted, and sample
`heapUsed` between rounds. **(d)** **NO DEMAND IS ATTACHED** — the architect's ruling stands, and
this consumer budgets for the synchronous watch as measured. **A suggestion, explicitly not a
request:** narrow the watch to the addresses **the reversal's own record names**.

### 2.10 `DEF-AM` — The witness is a declared member a copy silently loses — **OBSERVATION — NO DEMAND**

**Nothing is asked for in this block, and it is NOT filed as a defect against the package; no
later pass of ours may file it as one.** **(a) `observed`:** `Object.keys(record)` = **`4`**
members; the `discarded` descriptor is `{writable:false, enumerable:false, configurable:true}`;
**`{...record}.discarded` is `undefined`**; **`JSON.stringify(record)` does not carry it**; and
with `200` pairs a one-address reversal yields **`addresses.length === 200`** (a **`1,721`-byte**
record) — the whole enabled registry rather than what moved. **(b) `read`, and this is why it
carries no demand:** `index.d.ts:519-553` and the shipped guide **DO declare** the
non-enumerability and the single-slot limit — **so the behaviour is declared, costed and offered
here as an observation**, the same treatment `DEF-AD` gets. **(c)** If the width is ever
narrowed, `DEF-AH`'s fixed-when gains a second observable; **that is an observation about our own
instrument, not an ask.**

---

## 3. What we have withdrawn — read this before pricing any row above

**Five withdrawal events, split by who withdrew them, and between them they remove SEVEN named
items** — the count is printed with its terms because the two figures are both true and neither
may stand alone. **Four events are the architect's, against demands of ours; one is ours, against
our own filings.** **The withdrawn text is not deleted from the corpus** — it stands in
`docs/defects.md`, in `docs/defects-history.md` and in the archive copies of the earlier handoffs;
**this section is the clause that governs it.** **A maintainer who implemented a withdrawn demand
would have built something this consumer no longer asks for.**

### (i) Withdrawn by the architect

**THE VISIBLE COMMIT REGISTER — withdrawn `2026-10-14`.** *"Also stop asking for a visible commit
register. The commit register is for tracking midflight changes and operates on the JS thread, it
will be empty when the store is at rest anyway."* Decision row
**`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`**; it withdrew **`DEF-O`** and
**`R3`**'s ask. **The register is a mid-flight, JS-thread structure; asking a store published from
an addon for one is a category error**, and its only legitimate observable is **the attempt's own
record on the failure arm**, which the package already ships. **`1.2.0` re-opens neither**: no
member it ships enumerates in-flight commits.

**THE OP ID AS A REVERSAL PARAMETER — withdrawn `2026-10-14`.** *"The opID is the correct
parameter, stop calling that a defect. This is separate from the rollback not being
constraint-checked."* Decision row **`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`**; it withdrew
**`DEF-I`'s parameter half**. An op id is the lawful parameter of a reversal verb: **recording and
reversing are different acts, not different values.** The surviving ask on that surface was
**`DEF-W`, closed as asked** (section 4) — and its residual is `DEF-X` (section 2.3), not a
parameter change. **Nothing here asks for a different argument or a different verb.**

**THE RETENTION DEMAND — withdrawn `2026-10-27`.** *"The instance lifetime is correct, stop asking
for changes."* Decision row **`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`**; it withdrew **`DEF-J`**
and **`R16`**. **A constraint's lifetime IS the store instance's lifetime**, so **the instance's
own collection is the deletion site and the bound**; the absence of a `.delete` site is **the
model working as designed**. **The measured figure survives as a CHARACTERISTIC, never as a defect
measure: `200` pairs × `200` reversals = `647,128` bytes (`3,236` B/pair), `3` `.set` sites and `0`
`.delete` sites — sized, known, intended for a session-long instance.** **No cap, no eviction arm,
no declared figure is asked for, and no later pass of ours may re-file on that ground.**

**THE VERSION NUMBER — withdrawn `2026-10-28`.** *"Stop complaining about the version number."*
Decision row **`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`**, superseding
`1.0.1-IS-NOT-A-LAWFUL-PATCH`'s verdict while keeping its pin; it withdrew
**`STOREROOM-VERSION-CONTRACT-1.0.1-AND-1.1.0`**. **Which numbers a release carries is the
package's business: a package may ship any number of behaviour changes under any number, and a
consumer's remedy is a PIN, not an issue.** **This document pins `1.2.0` and files no semver
finding**, and **`1.2.0`'s *"eleven sites"* are eleven version figures** — the manifest's
`version`, its five `optionalDependencies` pins and five platform manifests' `version` (`read`) —
**which is no issue, serves no consumer row, and is not filed.**

### (ii) Withdrawn by us, because the filing did not survive contact

**`DEF-R` — WITHDRAWN, NOT REPRODUCED.** *"The constraint reader re-orders its own array on a
toggle"* **never reproduced at either version**: five snapshot points across a pass, a refusal, a
`constraintOff`/`constraintOn` toggle and a `rollback`, in both versions — registration order at
all five points, **byte-identical output**. **A filed defect that cannot be reproduced in the
version that filed it is withdrawn as unproven, not carried.**

**`DEF-T`'s two-spellings claim — WITHDRAWN; RE-SCOPED TO FOUR OBSERVED SPELLINGS.** *"One refusal,
two spellings"* did not reproduce: the constraint members' receiver message is **byte-identical to
the facade's in both versions**. **What stands is narrower**: **four distinct spellings across the
fourteen members** (`read`/`readLiteral`/`write`/`delete`/`rollback`/`unlisten`/`addConstraint`/
`constraintOn`/`constraintOff`/`removeConstraint` share one; `listen`, `removeListener` and
`register` each spell their own) and **two construction sites for argument refusals**. **The claim
is withdrawn; the re-scoped observation is carried with NO demand attached** — it is a preference
about consistency, not a broken clause.

**`DEF-V` — WITHDRAWN; A COULD-HAVE, AND THE PACKAGE'S REFUSAL IS CORRECT.** A supplied
`undefined` tier is answered as a malformed address (`write(h, ['a'], undefined, 1)` →
`AddressMalformed`), and the bytes are unchanged at every version here. **The package's own record
rules the refusal CORRECT**, calling the specific code and message a *"could have"*
(`declared`). **No upstream issue and no fix shape is owed**; what survives is a diagnostic
preference, priced at nothing.

### (iii) The discipline this produced — in this document's own voice

**Five withdrawal events in a fortnight — four of the architect's demands and one pass of our own
filings — are a pattern, and it is ours to name.** **A consumer preference belongs in the
catalogue as an OBSERVATION WITH ITS COST ATTACHED; it becomes a defect only when it breaks a
clause this consumer's own contract requires.** `DEF-AD`, `DEF-AM`, `DEF-V` and the `DEF-T`
residue are filed under that rule; the retention demand and the version finding were withdrawn
under it; and `DEF-R` is withdrawn because the evidence never existed to begin with. **The test
is applied to the rows above as well:** every one of the eight demands in section 1 names a
clause — a refused act must not land, a refusal must name what refused, a shipped document must
not deny the bytes it rides — and none of them prices a preference as a defect.

---

## 4. What is closed and must not regress

**`16` closed ids, printed with their terms:** `2` closed at `1.2.0` (`DEF-AE`; `DEF-AB`'s spelling
half) + `12` closed at `1.0.1`/`1.1.0` (`DEF-Y`, `DEF-AA`, `DEF-Z`, `DEF-M`, `DEF-W`, `DEF-H`,
`DEF-N`, `DEF-P`, `DEF-Q`, `DEF-L`, `DEF-U`, `DEF-S`) + `2` closed **by measurement**
(`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`, `STOREROOM-FILE-PROBE-FALSE-PASS`). **Of these,
`14` are the regression table: all fourteen were RE-DRIVEN at `1.2.0` and re-verified `HOLDS` on
the same harness that measured them at `1.1.0` — where the same `14 / 14` held, so nothing
regressed.** **The two `1.2.0` closures were measured at `1.2.0` directly and therefore have no
cross-version row.** Each line names the code path that closes the row — **not its commit**, so a
maintainer can check the mechanism rather than a message — and the observable that would show a
regression.

- **`DEF-AE`** — *a refused write leaves nothing of its own effect standing*: `openCommit` caches
  the store's `journalMark` (`src/entry/state.mjs:360-406`) and the compensation restores to that
  mark (`constraints.mjs:1905-1922`). **Regression:** a refused write whose own value reads back
  (`read b` = `1` where it answers `ABSENT`).
- **`DEF-AB`, spelling half** — one renderer, `addressSpelling`, serves the thrown `subject` and
  the log sentence (`constraints.mjs:2263`, `:2291-2298`, `:2342-2348`, `:2057`). **Regression:**
  one address rendered two ways in one refusal, or the `["a"]` form in a measured family.
- **`DEF-Y`** (`1.1.0`) — the judgement's throw refuses with a one-entry `log` naming the
  constraint **and undoes the reversal** (`constraints.mjs:1720-1725`). **Regression:** `log: []`
  while the reversal stands.
- **`DEF-AA`** (`1.1.0`) — the restore lands on the absent-terminal arm and the true sentence is
  picked, `200` of `200` (`constraints.mjs:1813-1836`, `src/store.rs:2575-2589`). **Regression:**
  the UNDONE sentence over an address that reads `AddressNotFound`. *(Its sibling — a correct undo
  reported as a failure — is `DEF-AJ`, section 2.5; the two are not one row.)*
- **`DEF-Z`** (`1.1.0`) — the compensating restore is **tier-exact** (`{file:5, mem:7}` keeps `file`
  answering `5`; `src/store.rs:2575-2589`). **Regression:** `TierNotFound` where a value stood.
- **`DEF-M`** (`1.0.1`) — one floor call per distinct address leaves the pre-attempt value; the
  passing arm's `record.op.after` reads the repaired value (`kernel-terminal.mjs:171-236`,
  `:275-330`; `constraints.mjs:778-781`). **Regression:** an `after` the store does not hold.
- **`DEF-W`** (`1.0.1`, closed as asked) — judged at the terminal state it leaves, **once**, never
  per unwinding step (`index.mjs:509-525`; `constraints.mjs:1205-1208`, `:1220-1246`,
  `:1265-1289`, `:1310-1341`, `:1467-1499`). **Regression:** a second judgement per at-rest
  reversal, or a judgement inside the unwinding (`R8`: `0` tier-null invocations, four arms).
- **`DEF-H`** (`1.0.1`) — a constraint refusal crosses as **`ConstraintPassRefused`** with the
  kernel's token at `log[].state`; **`FileCommitFailed` is the save's alone**
  (`constraints.mjs:1033-1042`). **Regression:** a constraint refusal answering `FileCommitFailed`.
- **`DEF-N`** (`1.0.1`) — **`ConstraintRefusedAtRegistration`** at add, at batch and at re-enable;
  the malformed entry keeps `ConstraintListInvalid` (`kernel-registration.mjs:506-515`).
  **Regression:** a well-formed pair refused with the shape code.
- **`DEF-P`** (`1.0.1`, declarative) — one `id` at N addresses is lawful at every act
  (`index.d.ts:902-921`). **Regression:** the declaration calling that pair unlawful while the
  code unions it.
- **`DEF-Q`** (`1.0.1`) — the sentence interpolates the registry row's own address and `undefined`
  appears nowhere in the family (`KC-3` template). **Regression:** `undefined` for a column the
  entry itself carries.
- **`DEF-L`** (`1.0.1`) — the README's **`14` rows match the `14` observed members** with arities
  agreeing, `settle` absent, the guide riding `files`; `documented-but-not-observed: []`,
  `observed-but-not-documented: []`. **Regression:** a non-empty diff from that census.
  *(Residue, not a reopening: `DEF-AC`, section 2.1.)*
- **`DEF-U`** (`1.0.1`) — **`DECLARED-ONLY` (NASH)**: the record says `1081` tests · `1080` pass ·
  `0` fail at the bump, and **no tests ship in the tarball**, so nothing here is measured.
  **Regression:** the record's count line against the held cell.
- **`DEF-S`** (`1.0.1`) — closed at **four instants** (landing pass, registration, synthetic
  re-run, bare-string throw), all `ConstraintBodyThrew` **with a `log`**, and a forged
  `{status:'ConstraintPassRefused'}` no longer launders through. **Regression:** a body's throw
  crossing raw with no `status`, `message` and `log`. *(Its judgement instant is `DEF-Y`; its
  nested-write instant is `DEF-AK`, section 2.6.)*
- **`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`** — **closed by measurement**, `HOLDS` at
  `1.2.0`: manifest, platform package, `addon.version()` and all five pins agree, and a
  mis-versioned candidate tree still refuses **at construction** (`FilePathUnreachable`).
  **Regression:** a version disagreement reaching a commit instead of construction.
- **`STOREROOM-FILE-PROBE-FALSE-PASS`** — **closed by measurement**, `HOLDS` at `1.2.0`: an
  unwritable parent refuses **at construction**, so the first commit is never reached.
  **Regression:** an instance returned for a parent the process cannot write. *(Recorded
  honestly: this was already true at `1.0.1` — the earlier row was STALE, not fixed.)*

**The one line:** any of these sixteen regressing shows up as a single observable — **a typed
consumer's handler for a DECLARED arm stops catching a refusal it caught at the last version, or a
value the store hands back differs from the value the record names.** That is what to watch;
nothing more elaborate is needed.

---

## 5. What we are not asking for

- **No retention bound or cap.** `DEF-J` and `R16` are withdrawn by the architect's ruling
  (section 3(i)); no deletion site, no cap, no declared figure. The `647,128`-byte figure is a
  characteristic a consumer budgets against.
- **No public commit register.** Withdrawn `2026-10-14` (section 3(i)); the attempt's own failure
  record is the observable, and it already ships.
- **No re-typing of the reversal parameter.** The op id is the lawful parameter (section 3(i)).
- **No semver change.** This consumer files no version finding (section 3(i)); it pins `1.2.0` and
  records the pin as its own dependency decision.
- **No new dependency.** Nothing above requires the package to add a dependency, a runner, a build
  step or a fourth leg — **including the pre-publish assertions in `DEF-AC`**, which are checks
  inside the release script, not tools.
- **No patch from us.** This project catalogues; the upstream fixes. **No byte of
  `node_modules/**`, of any published artifact, or of `../Provident-Storeroom` was written by this
  pass**, and none will be.
- **One standing fact about our own side, so no ask is read as needing a prerequisite:**
  `U-STORE-CONSTRAINT-REGISTRY` is admitted `OPEN` and **HELD at its spec gate** (`C-5` open) — it
  activates nothing, and no package verb is imported or re-declared by that layer.

---

## 6. How to reproduce any of this

- **Install:** `npm i provident-storeroom@1.2.0` — the version whose bytes every `1.2.0` row
  above was measured against. Comparisons: `@1.1.0` and `@1.0.1`, driven on the same harness;
  earlier baselines `@1.0.0`, `@0.5.0` where a row's earlier state cites them.
- **Runtime:** node **`v24.20.0`**, uid `1000`, `linux-x64-gnu` platform artefact. Installs were
  made with `npm install provident-storeroom@<version> --cache /tmp/npmcache-pk`.
- **Probe directories**, cited by row in `docs/defects.md`: **`/tmp/probe-storeroom-120`** — the
  `1.2.0` review's install, `10` arms, raw output under `out/`; **`/tmp/probe-storeroom-120b`** —
  the second arm-set of the same review; **`/tmp/probe-storeroom-110`** and
  **`/tmp/probe-storeroom-101`** — the comparison installs behind every `1.2.0`-vs-earlier delta
  above. Older baselines, if still on disk: `-100`, `-050`, `-040`, `-031`, `-020`.
- **The probe scripts are the CONSUMER's and ship NOWHERE** — not in this repo's published
  artifacts, not in the package, and not part of what the upstream receives. Each block in
  section 2 states instead the shortest sequence of calls that shows its defect; **if a probe
  directory has been cleared, that block's own steps are the record.**
- **Registry fact, and its limit:** the `1.2.0` review installed from the registry — the shipped
  guide's own `:52` was printed from inside that install (`observed`). **This document's seat has
  no shell and measures nothing itself**: every byte count, path and probe figure it cites is the
  catalogue's, carried with the label the catalogue gives it.
- **Two reviews, one spine:** the live probe yields `observed`; the source critique yields `read`
  and `declared`. **Where they disagree, `observed` wins on behaviour and the disagreement is
  printed in the row.** **No commit message, README, guide or release note in this document is
  presented as a measurement.**

---

## 7. History (one paragraph; not re-narrated)

**Rounds 1–9 addressed `provident-ssr`** — a different package, whose source repo is the adjacent
`../Preempt-Providence` — and every item they filed is resolved or closed: the `REQ-GAP` series
across `0.1.1`–`0.1.3`, the adapter-parity, journal-replay and isolation items, the
`UndoRedoReport` item at `0.2.1`, and `UNDO-REDO-DESTROY-STATUS`, measured unreproducible at
`provident-ssr@0.5.1`; no `provident-ssr` round is open and this document files nothing against
that package. **Round 10 addressed `provident-storeroom`'s LOAD path** in the `0.1.x` era; its two
residue rows closed **by measurement** at `1.1.0` and hold at `1.2.0` (section 4). **Round 11 is
this constraint surface, through `0.2.0` → `1.2.0`** — the eight versions with dated blocks in the
catalogue, carried across `0.2.0`, `0.3.1`, `0.4.0`, `0.5.0`, `1.0.0`, `1.0.1`, `1.1.0`, `1.2.0` —
and **Round 12 is this regeneration at `1.2.0`**, which assembles sections 1–5 as they stand after
sixteen closures and the withdrawal events of section 3. **The as-filed text of every round is
preserved byte-identically in the archive and is not re-narrated here:** the pre-`2026-10-14` text
at `archive/handoffs/2026-10-14-HANDOFF-as-filed-before-regeneration.md` (`81,664` bytes, git
`ab60c2e`); the pre-regeneration `1.0.0` text at
`archive/handoffs/2026-10-27-HANDOFF-as-filed-before-1.0.1-regeneration.md` (`56,897` bytes, git
`bc5b398`); and **the pre-regeneration `1.1.0`-era text at
`archive/handoffs/2026-10-28-HANDOFF-as-filed-before-1.2.0-regeneration.md` (`51,018` bytes, git
`c123df9`)**, cited at the head of this document as the authority for the text it replaced.

---

**Label audit:** every `observed` above is a probe execution quoted from the catalogue; every
`read` is a `path:line` citation or a quotation of shipped bytes; every `declared` is the
package's own prose or a commit subject, **never a measurement**; every `derived` states what it
was inferred from; **the reproductions in section 2 are instructions, not observations**, except
where a step quotes an `observed` answer. **`DEF-AD` and `DEF-AM` carry no demand, by ruling and by
their own declared status, and are labelled `OBSERVATION — NO DEMAND` wherever they are named.**
**`DEF-AK` and `DEF-AL` carry `observed` and `CONFIRMED` as section 2.6 and section 2.2 file them,
because both arms have since been driven; the `OBSERVATION — NO DEMAND` label is reserved for `DEF-AD`
and `DEF-AM` alone.**
