# Provident-Electron → Provident-Storeroom: the open package issues at `1.3.0`

**Regenerated `2026-10-28` for `provident-storeroom@1.3.0` — this is Round 13, the issue document
owed to the package's maintainer.** This pass rewrote the file WHOLE, and it is a **REGENERATION,
not an amendment**: three of the central claims of the text it replaces are false of this release —
that five of seven hosts stand unjudged, that a request can be consumed by a window that did not
raise it, and that the release's change list ships in no document. **`1.3.0` closed five rows,
moved the host count from `2` of `7` to `4` of `7`, and shipped the change list this consumer asked
for** (section 1's lead). A reader acting on the old text would re-file four closed rows and price
a repair this package has already made.

**The as-filed bytes of the document this replaces were preserved FIRST, and the preservation is
this pass's own:** the Round-12-corrected `1.2.0` text — `54,545` bytes, `718` lines — was never
archived, so it was copied whole to
**`archive/handoffs/2026-10-28-HANDOFF-as-filed-before-1.3.0-regeneration.md`** before this file's
first byte was written. That copy is the authority for any sentence of the Round-12 text, and
nothing here re-narrates it. **The three earlier regenerations are preserved the same way and are
cited, with these, in section 7.**

## What this document is for, and who acts on it

The issue-handoff assembly required by `AGENTS.md` item 7. Its subject is
**`provident-storeroom`** (the published npm package) and its platform artefact, whose source repo
is the ADJACENT `../Provident-Storeroom` (the sibling project), NOT `../Preempt-Providence`.
**The upstream that acts on this document is that sibling repository.** Each block in section 2 is
written so a maintainer there can reproduce the row against an install, find the code path, and
decide the fix.

**This project CATALOGUES; it does not patch the package** (`AGENTS.md` item 7). No line below
reports a fix we applied, and none may be read as one. A fix observed to land is recorded as a
CLOSURE with the release that landed it and the code path that closes it (section 1's sub-table and
section 4), so it is not re-filed. **Nothing was written into `../Provident-Storeroom`, into
`node_modules/**` or into any published artifact by this pass.**

## Label discipline (binding on every sentence here)

- **`observed`** — a probe was executed and its output is quoted. Never inferred.
- **`read`** — a citation to code, a declaration or a shipped byte, given as `path:line`. Evidence
  of what the bytes SAY, never of what they DO.
- **`derived`** — inferred, and the sentence says from what.
- **`declared`** — a package's own claim (README, guide, release note, declaration prose, commit
  subject). **Never evidence of behaviour.** It matters this round, because the release's own
  tarball now carries two shipped documents that contradict each other about whether that tarball
  exists (`DEF-AC`), and neither is evidence of anything but what it says.
- **`NOT PRESENT`** — not constructible at `1.3.0` (the catalogue's label for a shape the probe
  could not build, which is not the same as a shape that failed).
- **`not re-measured at 1.3.0`** — an earlier figure, carried as such and never presented as this
  release's.

Anything this document could not cite or measure is marked `uncited` or dropped.

**Provenance of the catalogue this renders:** `docs/defects.md` and its **dated `2026-10-28`
`1.3.0` block** — the block carrying the disposition tally, the five closures, the four narrowings,
the host-count narrowing and the two new rows. **Catalogue stamp: `2026-10-28`.** Where this
document and that file disagree, **that file governs**; where a shipped document and the catalogue
disagree, **the catalogue governs**. Decision rows are cited **BY NAME**, never by line — that
ledger is appended-to and its line anchors drift:
`A-THROW-MUST-MEAN-NOTHING-LANDED` (with its `1.2.0` dated clause),
`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`, `INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`,
`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`,
`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER` — all in
`docs/decisions/ACTIVE-store-and-package-binding.md`.

**One review behind every state below: a LIVE PROBE of the INSTALLED `1.3.0`**
(`/tmp/probe-storeroom-130/`), driven against `1.2.0`, `1.1.0` and `1.0.1` on the same harness for
comparison — `observed` for every probe result, `read` for code and shipped-byte citations,
`declared` for prose. **Where a probe and a citation disagree the probe wins on behaviour, and the
disagreement is recorded in the row, never hidden** (section 2.3 carries the one such doubt of this
round — about our own earlier row, not about the package).

**The tally, printed with its terms:** `6` CLOSED (`DEF-AI` · `DEF-AJ` · `DEF-AL` · `DEF-AB`'s
`seq` half, plus `DEF-AE` and `DEF-AB`'s spelling half retained from `1.2.0`) + `4` NARROWED
(`DEF-AH` · `DEF-AK` · `DEF-AM` · `DEF-AC`) + `1` NARROWED ON THE HOST COUNT (`DEF-X`: three → one,
**host 6 doubtful**) + `2` NEW (`DEF-AN` · `DEF-AO`) = **`13` dispositions**
(`6 + 4 + 1 + 2 = 13 ✓`). **`DEF-AD` stands BESIDE the tally as numbers only, carries no demand,
and is counted in no bucket.** **All `16` earlier closures were re-driven at `1.3.0` and re-verified
`HOLDS`** on the harness that measured them at `1.1.0` and `1.2.0`, and **`R8` HOLDS**. **This pass
re-derives nothing: every claim below carries the label the catalogue gives it.**

---

## 1. What is open, ranked, one page

**Read the lead before the table: `1.3.0` is the first release in this sequence that closed more
rows than it opened, and the credit is earned — say it without a hedge.** **`1.3.0` closed five
rows** (listed with the code path that closed each, below the open table), and **the mechanism it
closed them with is sound in the three places that matter (`observed`)**:

1. **A request can no longer be consumed by a window that did not raise it** —
   `constraints.mjs:1585`. This is the sentence the guide got wrong and the one a repair body, a
   `delete`'s pass and a reentrant write had been losing their raises to.
2. **The drain is reached on BOTH the passing and the throwing arm of a pass**
   (`kernel-attempt.mjs:161`, `:181-188`) — so a pass that throws on its way out still drains the
   request it raised.
3. **The kernel's own compensation is flagged out of the watch and the judgement**
   (`kernel-attempt.mjs:56-67`, `:245` / `:341` / `:511` / `:693` / `:702`; `constraints.mjs:1819`,
   `:1968`) — so **`R8` now holds structurally rather than by luck**: four adversarial arms, **`0`**
   tier-null invocations inside the kernel's unwinding, the floor reached.

**And the host count moved: `2` of `7` at `1.2.0` → `4` of `7` at `1.3.0`** (`observed`), because
**the repair body** (host 3) **and the reentrant reversal-then-write** (host 7) **now judge** — the
two hosts the earlier rounds were filed on and could not reach. **The maintainer's `D-54` is
acknowledged as the design call this consumer asked for and could not make:** they accepted our
finding that the guide's bound sentence was false and named the three hosts a pass runs without
judging; the narrower ask we substituted for the withdrawn *"refuse an in-commit reversal"* — do
not let a pass consume a request it did not raise, and carry a raised request to that pass's
terminal state — is what they built, and it leaves the restart budget and `D-42` intact.

**The four things still to fix, ranked by consumer harm:** **(1)** the cut-state guard fired in the
wrong direction and the release's own tarball now contradicts itself (`DEF-AC`); **(2)** the fix
landed on the arm it was filed on and left a worse one standing (`DEF-AH`); **(3)** one host remains
unjudged, and our own row about it is doubtful (`DEF-X`); **(4)** one refusal family still crosses
nothing while the sentence says it crosses, and two undriven reading-level rows are filed beside it
(`DEF-AK` / `DEF-AN` / `DEF-AO`).

| # | Id | One line | Reachability | Versions measured | Demand or observation |
| --- | --- | --- | --- | --- | --- |
| 1 | `DEF-AC` | The cut-state guard fired the wrong way: the shipped guide denies `v1.3.0` inside `v1.3.0`'s own tarball while the release notes it now ships name it | `published` — both files ride `files` | `1.3.0` (`observed` inside the install + `read`) | **DEMAND** — generate the cut-state from the manifest/tag at publish, FAIL the publish on disagreement, and put the same guard on the release notes |
| 2 | `DEF-AH` | The fix landed on the filed arm and left a worse one standing: a second raise into the still-single restart slot is discarded with no witness and the outer write returns NORMALLY | `published` | `1.3.0` (`observed`, four arms; `1.2.0` the same four) | **DEMAND** — queue the raises, or refuse the second one loudly |
| 3 | `DEF-X` | One host remains unjudged, and this consumer's own `1.2.0` row about it may have measured a shape the artifact does not admit | `published` | `1.3.0` (`observed`: `4` of `7`); `1.2.0`, `1.1.0`, `1.0.1` | **DEMAND** — say whether a `delete` delivers a constraint pass at all, and judge every host's terminal state |
| 4 | `DEF-AK` | A rethrown refusal now crosses in full through a new own symbol; a body's own `Error` still crosses nowhere while the sentence claims it crosses | `published` | `1.3.0` (`observed`) | **DEMAND** — convey the throwable, or stop claiming it crosses |
| 5 | `DEF-AN` | A carried refusal restores to the OUTERMOST opening's mark, so a write that succeeded inside the same commit is undone | `published` | **none — `read` at `1.3.0`, UNDRIVEN** | **DEMAND** — `read`, undriven: state the restore target in the sentence, or restore to the failed attempt's mark |
| 6 | `DEF-AO` | A closed attempt's report and log mutate after close, so a consumer holding a refusal can watch it change | `published` | **none — `read` at `1.3.0`, UNDRIVEN** | **DEMAND** — `read`, undriven: freeze the report at close, or declare the log live |
| 7 | `DEF-AD` | Per-reversal cost: the tarball grew to `1,290,716` B (`+12.25 %`, `21` files); the read counts were NOT re-measured | `published` | `1.3.0` (tarball, `observed`); `1.2.0` / `1.1.0` / `1.0.1` for the old counts | **OBSERVATION — NO DEMAND** |
| 8 | `DEF-AM` | The `discarded` witness is a required declared member that a spread copy silently loses | `published` | `1.3.0` (`observed` + `read`) | **OBSERVATION — NO DEMAND** |

**Eight open rows; `6` carry a demand and `2` are observations.** **`DEF-AN` and `DEF-AO` are `read`
and UNDRIVEN** — no probe arm has driven either, and neither is presented as measured anywhere in
this document.

**`CLOSED AT 1.3.0` — five rows, one line each, naming the code path that closed it and not a
commit:**

| Id | One line | What closed it |
| --- | --- | --- |
| `DEF-AI` | A required declared member carrying a literal `1` while the journal read `41` is no longer a lie: the meaning is now DECLARED | the `LogEntry` doc block in `index.d.ts` (`observed`: `40` writes → journal ordinal `41`; a three-entry commit log reads `1, 2, 3`) — a DECLARATIVE closure: declarations moved `3` hunks, all inside comment blocks, `0` signature-level changes |
| `DEF-AJ` | A correct whole-commit undo reported as a failed restore now reports the baseline it measured, and the baseline is the commit's own mark | the per-opening `journalMark` cache the verdict now consults (`src/entry/state.mjs:360-406`; compensation `constraints.mjs:1905-1922`) — `observed`, three branches: same-address → `b/x` = `2` (the commit's mark), other-address → UNDONE (`a` = `7`), could-not-restore → a refusal with no false-failure sentence |
| `DEF-AL` | The restart-budget refusal no longer names a pair that never refused | the budget refusal's own author, now carrying its own cause — `observed`: *"— this refusal is a RESTART BUDGET EXHAUSTION and NOT a constraint pair refusing a state"*, entry *"…when the restart budget ran out…"* |
| `DEF-AB`, its `seq` half | Closes with `DEF-AI`, which was its only surviving half, so the row is now SHUT | `DEF-AI`'s declaration path; the spelling half was closed at `1.2.0` by one renderer, `addressSpelling` (`constraints.mjs:2263`, `:2291-2298`, `:2342-2348`, `:2057`) |
| `DEF-AE` | Retained closed from `1.2.0` and re-observed at `1.3.0`: a refused write leaves nothing of its own effect standing | the per-opening `journalMark` cache (`src/entry/state.mjs:360-406`) and the compensation that restores to it (`constraints.mjs:1905-1922`) — `observed`, three arms: `["a"] = 7`, `["b"] = ABSENT` |

**`DEF-AK`'s refusal half is NOT a closure and appears in neither table.** A rethrown refusal now
crosses in full, which is real and is credit; the row stays open on the arbitrary throwable and is
`NARROWED` (section 2.4). **Before pricing any row above, read section 3:** seven withdrawal events
removed nine named items from this document's ask list, and a maintainer who implemented a withdrawn
demand would have built something this consumer no longer asks for.

---

## 2. The open set, one block per row

Each block carries the catalogue's four-part form plus reachability, the versions, the quoted
symptom, a runnable reproduction, the code path, an upstream fix shape and **how you will know it is
fixed**. **No defect below is invented by this document**; each has a row in `docs/defects.md`'s
`2026-10-28` `1.3.0` block. **The two observations (`2.7`, `2.8`) ask for nothing and say so in
their own first line; the two new rows (`2.5`, `2.6`) are `read` and say so in their own heading.**

### 2.1 `DEF-AC` — The cut-state guard fired in the wrong direction, and the release's own tarball contradicts itself

**(a) The symptom, and it is two halves that now disagree with each other.** **(1) The
reconstruction this row asked for has SHIPPED (`observed`):** `RELEASE-NOTES.md` (`51,907` bytes)
is now on `files` and rides the tarball (`21` files, was `20`), and **it names `1.2.0` and
`1.3.0`** —  the change list this consumer asked for, in the artifact, for the first time in this
sequence. **(2) The guard added against this row fired in the other direction (`observed`):** inside
a registry install of `1.3.0`, the shipped `README.guide.md:34` still prints
`PUBLISH-GUIDE-CUT-STATE: THE TAGS THIS TREE CARRIES ARE v1.0.0 · v1.0.1 · v1.1.0 · v1.2.0; v1.3.0
DOES NOT EXIST, SO THE RELEASE THIS GUIDE DESCRIBES…`, and `:60` still says *"THE VERSION THIS GUIDE
DESCRIBES IS `1.1.0`"*. **So a guard exists, it is stale by exactly one release, it passes publish,
and the two shipped documents now contradict each other about whether the tarball they ride
exists.** **`README.md` still declares no version string at all** (`read`).

**(b) Reachability and versions.** `published` — all three documents ride `files`. Measured at
`1.3.0`; the class is unchanged through `1.0.1`, `1.1.0` and `1.2.0`, where the same guide carried
fewer layers.

**(c) Reproduction.** `npm i provident-storeroom@1.3.0`; `npm pack provident-storeroom@1.3.0` and
untar it; then: (1) `grep -n "CUT-STATE\|DOES NOT EXIST\|THIS GUIDE DESCRIBES" README.guide.md`;
(2) `grep -n "1\.2\.0\|1\.3\.0" RELEASE-NOTES.md | head`; (3) `grep -c "version" README.md`;
(4) `node -p "require('./package.json').version"`. **`(1)` naming a version the tarball's own `(4)`
denies is the defect; `(2)` finding the release that `(1)` denies is the contradiction.**

**(d) Code path.** `README.guide.md`'s hand-authored cut-state block at `:34` and its version line
at `:60`; the `files` allowlist that now carries `RELEASE-NOTES.md`. **No shipped string is
generated from the manifest or the tag** (`read`).

**(e) Fix shape — upstream-owned, DECLARATIVE plus a check.** **Generate the cut-state from the
manifest and the tag at publish and FAIL the publish when it disagrees with either** — the guard
exists, so this is one step from where the release already is — **and put the same guard on the
release notes, which now assert the opposite.** This is an assertion in the release script, not a
tooling dependency (section 5).

**(f) Fixed when:** within the tarball, the manifest's `version`, the guide's cut-state, the guide's
version line and the release notes' top entry all print the same string, and a publish whose parts
disagree aborts instead of shipping.

### 2.2 `DEF-AH` — The fix landed on the arm it was filed on and left a worse one standing

**(a) The symptom, four `observed` arms.** **(1) The filed loss is CLOSED:** `D1` — a listener that
**reverses THEN writes** — now makes **`1` tier-null invocation**, the violation is **refused**
(`ConstraintPassRefused`), and the write's effect does not stand. That is the arm Round 12 filed,
and `1.3.0` closed it. **(2) A WORSE LOSS STANDS:** `D3` — **two reversals then a write** — and
`D4` — **reversal, write, reversal** — each make **`0` judge invocations** and **the outer write
RETURNS NORMALLY** (`op-12` / `op-18`), **leaving the violation standing with nothing reported to
the caller**. **(3) The mechanism, and it is one slot:** the **restart slot is still single**
(`read`: the declared single pending request per instance, `index.d.ts:499-553` and the shipped
guide), so **a second raise into an occupied slot is discarded with no witness and no report** —
the window check now refuses to let the WRONG window take the request (`constraints.mjs:1585`,
which is `1.3.0`'s repair) but nothing carries a SECOND raise from the right window. **(4) The
witness is right about width and can still name nothing:** `record.discarded` now carries **the
moved address only** — `addresses: [["a"]]`, **`1` entry at `1`, `3` and `25` registered pairs**
(whole-registry reach **FIXED**; was `200` addresses in a `1,721`-byte record, now `38` bytes) —
**but a nested-write arm yields `{opId: "op-29", addresses: []}`, a discard that names nothing.**

**(b) Reachability and versions.** `published`. `1.3.0` (`observed`, four arms); `1.2.0` the same
four; at `1.1.0` the row had no arm at all. **`NARROWED`: the filed arm closed, a worse one opened.**

**(c) Reproduction.** `npm i provident-storeroom@1.3.0`; create a `mem` store; seed `a` = 7;
register a pair over `['a']` that refuses `5` and increments a judge counter on every invocation;
register a listener at a `delete` window that raises (var `D1`) one reversal then a write, (`D3`)
two reversals then a write, (`D4`) reversal, write, reversal; drive the `delete`; print the judge
counter, `read a`, `record.discarded` and whether the outer call threw. **`D1` prints `1`, `7`, a
one-entry witness, "refused"; `D3` and `D4` print `0`, `5`, `[]` or `{addresses: []}`, "returned
normally".** Then register `200` pairs and repeat to confirm the witness's width no longer follows
the registry.

**(d) Code path.** The single pending request per instance (the slot) and its raise site; the
window check that now holds at `constraints.mjs:1585`; `request.asked` is stamped at **raise**, not
at the ask (`read`, `constraints.mjs:1599-1600`), so a second raise cannot even overwrite the
first's accusation.

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Queue the raises, or refuse the second one
loudly.** A second reversal in one window may not be silently dropped: either both are carried to
the terminal judgement, or the second is refused at the raise with its own record. **And a
`discarded` entry that names `addresses: []` must say what it discarded** — a witness that names
nothing is worse than no witness, because it reads as an empty finding.

**(f) Fixed when:** `D3` and `D4` either refuse or return a record whose `discarded` names the
second raise, and no `discarded` entry reports an empty `addresses` without naming what it
discarded.

### 2.3 `DEF-X` — One host remains, and this consumer's own row is doubtful about it

**(a) The symptom, and the count cell moved: `4 / 7` (`observed`).** Host **1** top-level **YES(1)**
· host **2** a `write`'s own commit **YES(1)** · host **3 a repair body YES(1)**, the effect gone
(`7` held) · host **4** a registration evaluation **NO(0)** · host **5** a `delete`'s listener
delivery **NO(0)** · host **6 a `delete`'s constraint pass — NO(0), the refused `5` stands** · host
**7 reentrant reversal-then-write YES(1)**, `7` held. **`judged hosts: 4`.** **Hosts 4 and 5 are the
guide's TWO DECLARED WINDOWS** (`README.guide.md:1330-1336`, `declared`) **and this consumer files
nothing on them** — that withdrawal is section 3(iii). **Host 6 is the one remaining unjudged host,
and it is the one this consumer is least sure of:** **the probe could build NO shape at all that
runs a constraint pass on `delete`'s behalf at `1.3.0` (`NOT PRESENT`)**, **so this consumer's
`1.2.0` host-6 row may have measured a shape the artifact does not admit. That is a doubt about the
ROW, not a claim that the package is fine — `D-54` is neither complete nor failed.**

**(b) Reachability and versions.** `published` (installed entry alone). `1.3.0` (`observed`),
`1.2.0` and `1.1.0` measured, `1.0.1` filed. **`NARROWED ON THE HOST COUNT`: three undeclared hosts
→ one, and even that one's reachability is unproven in either direction.**

**(c) Reproduction.** `npm i provident-storeroom@1.3.0`; create a `mem` store; seed `a` = 7;
register a pair over `['a']` that refuses `5` and increments a judge counter on every invocation;
drive the identical reversal from each of the seven contexts in turn — top level; inside a `write`'s
own commit; inside a repair body; at registration evaluation; from a `delete` window's listener;
from a `delete`'s constraint pass; and reentrantly, reversal-then-write. For each print the judge
counter and `read a`. **Four print `1` and `7`; two print `0` on the declared windows; host 6 could
not be built.** **The owed measurement is the construction itself: try to make a `delete` run a
constraint pass, and print whether any shape does.**

**(d) Code path.** `src/entry/state.mjs:431-443` (the join/open discriminator) and the at-rest gate
the judgement sits behind; the per-window drain that consumes a restart request, which now requires
the raiser's own window (`constraints.mjs:1585`) and is reached on both arms of a pass
(`kernel-attempt.mjs:161`, `:181-188`).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Judge every reversal at the terminal state it
leaves regardless of an open attempt.** *(The older form, "refuse an in-commit reversal", is
WITHDRAWN — section 3(iii) — and must not be implemented.)* **And, separately and cheaply: say
whether a `delete` delivers a constraint pass at all**, so our host-6 row can be retired or driven.
**That answer is a declaration, and it costs nothing.**

**(f) Fixed when:** the seven-host table reads `7 / 7` — every host's counter `>= 1` and no host
answering a success over a value a registered constraint refuses — **or** it reads `6 / 7` with host
6 documented as unreachable and the guide saying so. **`R8` must hold across the same change.**

### 2.4 `DEF-AK` — A rethrown refusal now crosses in full; a body's own throwable still crosses nowhere

**(a) The symptom, and one half closed.** **`observed`:** a body's inner refused `store.write` is
now **recoverable in full** — the outer `ConstraintBodyThrew` carries a **new own symbol,
`Symbol(provident-storeroom.package-refusal)`**, whose payload is the inner refusal complete:
`status: 'ConstraintPassRefused'`, `message: 'nine is refused at q'`, and its own `log`. **That is
the loss this row was filed for, closed for the rethrow arm.** **What stands (`observed`):** a body
that throws **its own** `Error` — `new Error('marker-AK')` — still crosses as `ConstraintBodyThrew`
whose generated message reads *"a constraint body's throwable crosses as this refusal"* **while
`marker-AK` crosses nowhere**, and the refusal's own members are `["status","message","log",
Symbol(provident-storeroom.package-refusal)]`. **So the crossed sentence still asserts a conveyance
the bytes deny** — the `DEF-H` class, in the one sentence a consumer reads first.

**(b) Reachability and versions.** `published` — the path ships. `1.3.0` (`observed`) and `1.2.0`
(`observed`, the driven arm of `11` of `11`). **`NARROWED`: the refusal half closed, the throwable
half did not.** **The surface did not move** (`read`): native exports and all `14` own members
identical to `1.2.0`, **no new export** — the symbol is an own member, declared nowhere.

**(c) Reproduction.** `npm i provident-storeroom@1.3.0`; create a `mem` store; register a pair
`refuse-13` at `['z']` that refuses `13` with a distinctive message literal; register a pair at
`['y']` whose body throws `new Error('marker-AK')`; write `['y'] = 5`; print `thrown.status`,
`thrown.message`, `Object.keys(thrown)`, `Object.getOwnPropertySymbols(thrown)` and whether
`marker-AK` occurs anywhere in a deep walk of message, log and every own string. **Then swap the
body to a bare refused `store.write` and print the package-refusal symbol's payload: that is the
closed half, beside the open one.**

**(d) Code path.** The body-invocation catch that attaches the inner refusal under the new own
symbol; the generated `ConstraintBodyThrew` sentence, still minted from the throw's kind rather than
from its content (`read`).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Convey the throwable, or stop claiming it
crosses.** If the substitution is lawful under `DEF-S`'s rule that a cause must stay recoverable,
the throwable still has to cross as a member — message at minimum — or the sentence has to stop
asserting it does.

**(f) Fixed when:** a body's own `Error` message either crosses in the record (a member or a symbol
payload, as the package refusal now does) **or** the refusal's message no longer claims a
conveyance it does not perform.

### 2.5 `DEF-AN` — **`read`, UNDRIVEN** — A carried refusal restores to the outermost opening's mark

**HEADING LABEL: `read`, UNDRIVEN — NO ARM HAS DRIVEN THIS ROW. Nothing in this block is measured,
and it is presented as a reading of the bytes, which can be wrong in either direction.**

**(a) The symptom (`read`).** On a **carried** refusal the restore target is **the outermost
opening's mark** (`constraints.mjs:1998-2000`), **not the failed attempt's**. So a nested call that
**legitimately landed** earlier in the same commit is rolled back with the refusal — **a write that
SUCCEEDED inside the same commit is undone** — and **nothing in the answer says so**: the refusal
names only the address whose pair refused. A consumer that reads the refusal as "the address that
refused did not land" is told less than the act did.

**(b) Reachability and versions.** `published` (the path ships). **No probe arm at `1.3.0`; no
earlier arm either.** New row, filed `2026-10-28`, upstream-owned.

**(c) Reproduction (the arm this row owes).** `npm i provident-storeroom@1.3.0`; create a `mem`
store; register a pair at `['a']` whose body first performs a lawful nested `store.write(['b'],
'mem', 9)` (which lands) and then raises a refusal a registered pair will honour; drive the outer
write at `['a']`; print `thrown.status`, `thrown.log.map(e => e.message)`, `read a`, `read b`.
**`read b` answering `ABSENT` is the claim confirmed; the refusal naming only `'a'` is its second
half.**

**(d) Code path.** `constraints.mjs:1998-2000` — the carried-refusal restore targets the outermost
opening's mark (`read`).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **State the restore target in the refusal's own
sentence, or restore to the failed attempt's mark.** Either a consumer learns that a sibling write
went with the refusal, or the sibling write survives it.

**(f) Fixed when:** after a carried refusal, either the sibling write survives in the store (it is
not the failed attempt's effect) or the refusal's sentence names the restore target and the
addresses it took with it.

### 2.6 `DEF-AO` — **`read`, UNDRIVEN** — A closed attempt's report and log mutate after close

**HEADING LABEL: `read`, UNDRIVEN — NO ARM HAS DRIVEN THIS ROW. It is a reading of the bytes and is
offered as such.**

**(a) The symptom (`read`).** An append lands **after** the terminal close: `constraints.mjs:1743`
appends to the attempt's log after `kernel-terminal.mjs:72` has closed the attempt. **So a consumer
holding a refusal — its report and its `log` — can watch them change** under a later act on the same
instance, which makes a refusal a live view rather than a record.

**(b) Reachability and versions.** `published`. **No probe arm at `1.3.0`.** New row, filed
`2026-10-28`, upstream-owned.

**(c) Reproduction (the arm this row owes).** `npm i provident-storeroom@1.3.0`; create a `mem`
store; drive a refused reversal and hold `thrown`; capture `thrown.log.length` and
`thrown.log.map(e => Object.keys(e))`; then drive one further act on the same store; re-print the
same two expressions on the **held** object. **A difference is the claim confirmed; identity
retires the row.**

**(d) Code path.** `constraints.mjs:1743` (the post-close append) after `kernel-terminal.mjs:72`
(the close).

**(e) Fix shape — upstream-owned, BEHAVIOURAL.** **Freeze the report at close, or declare that the
log is live.** A frozen record is the safer default; a live one is only acceptable when the
declaration says which members move.

**(f) Fixed when:** a held refusal's log length and entries are identical after any later act, **or**
the declaration states that the log is live and which appends can extend it.

### 2.7 `DEF-AD` — Per-reversal cost — **OBSERVATION — NO DEMAND**

**Nothing is asked for in this block, and no fix shape exists in it.** **(a) `observed` at
`1.3.0`:** the tarball reads **`1,290,716`** bytes (`21` files) against `1.2.0`'s `1,149,852`
(`20` files) — **`+140,864` bytes, `+12.25 %`** — of which the newly shipped `RELEASE-NOTES.md`
(`51,907` B) and the guide account for the bulk. **The per-reversal read counts are `not
re-measured at 1.3.0`:** `1.2.0`'s `701.5` permitted / `1,004` refused native reads per reversal
and its `4,915` B/pair heap **are not carried forward and are not this release's numbers.** **(b)**
Reachability `published`; versions `1.3.0` (tarball only), `1.2.0` / `1.1.0` / `1.0.1` for the older
figures. **(c) Reproduction:** `npm pack` both releases and compare sizes; for the read counts,
register `200` pairs across `200` addresses, instrument each body, drive `200` at-rest reversals
through a store whose native reads are counted, and sample `heapUsed` between rounds. **(d)** **NO
DEMAND IS ATTACHED** — the architect's `2026-10-27` ruling stands, and this consumer budgets for the
synchronous watch as measured. **A suggestion, explicitly not a request:** narrow the watch to the
addresses **the reversal's own record names**, now that the record names only those.

### 2.8 `DEF-AM` — The witness is a declared member a copy silently loses — **OBSERVATION — NO DEMAND**

**Nothing is asked for in this block, and it is NOT filed as a defect against the package; no later
pass of ours may file it as one.** **(a) `observed` at `1.3.0`, and the row NARROWED to one fact:**
`discarded` is `{writable: false, enumerable: false, configurable: true}`, so a spread copy loses it
— **`{...record}.discarded` is `undefined`** and `JSON.stringify(record)` does not carry it. **The
whole-registry reach is FIXED:** `addresses.length` is **`1` at `1`, `3` and `25` registered pairs**
(was `200` addresses in a `1,721`-byte record; now `38` bytes). **The remaining fact is only that a
required declared member is non-enumerable**, so a consumer's copy silently loses a witness it was
told it had. **(b) `read`, and this is why it carries no demand:** `index.d.ts:519-553` and the
shipped guide **DO declare** the non-enumerability and the single-slot limit — **declared, costed
and offered here as an observation**, the same treatment `DEF-AD` gets. **(c)** If the width is ever
narrowed again, `DEF-AH`'s fixed-when gains an observable; **that is an observation about our own
instrument, not an ask.**

---

## 3. What we have withdrawn — read this before pricing any row above

**Seven withdrawal events, split by who withdrew them, and between them they remove NINE named
items** (`4 + 3 + 2 = 9 ✓`) — **four of the architect's, against demands of ours; three of ours,
against our own filings; and two design decisions this consumer has now accepted, which withdrew
two demands of ours in the package's favour.** **The withdrawn text is not deleted from the
corpus** — it stands in `docs/defects.md`, in `docs/defects-history.md` and in the archive copies of
the earlier handoffs; **this section is the clause that governs it.** **A maintainer who implemented
a withdrawn demand would have built something this consumer no longer asks for.**

### (i) Withdrawn by the architect

**THE VISIBLE COMMIT REGISTER — withdrawn `2026-10-14`.** *"Also stop asking for a visible commit
register. The commit register is for tracking midflight changes and operates on the JS thread, it
will be empty when the store is at rest anyway."* Decision row
**`COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`**; it withdrew **`DEF-O`** and
**`R3`**'s ask. **The register is a mid-flight, JS-thread structure; asking a store published from an
addon for one is a category error**, and its only legitimate observable is **the attempt's own record
on the failure arm**, which the package already ships. **`1.3.0` re-opens neither**: no member it
ships enumerates in-flight commits.

**THE OP ID AS A REVERSAL PARAMETER — withdrawn `2026-10-14`.** *"The opID is the correct parameter,
stop calling that a defect. This is separate from the rollback not being constraint-checked."*
Decision row **`OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`**; it withdrew **`DEF-I`'s parameter half**. An
op id is the lawful parameter of a reversal verb: **recording and reversing are different acts, not
different values.** The surviving ask on that surface was **`DEF-W`, closed as asked** (section 4) —
and its residual is `DEF-X` (section 2.3), not a parameter change.

**THE RETENTION DEMAND — withdrawn `2026-10-27`.** *"The instance lifetime is correct, stop asking
for changes."* Decision row **`INSTANCE-LIFETIME-IS-THE-RETENTION-BOUND`**; it withdrew **`DEF-J`**
and **`R16`**. **A constraint's lifetime IS the store instance's lifetime**, so **the instance's own
collection is the deletion site and the bound**; the absence of a `.delete` site is **the model
working as designed**. **The measured figure survives as a CHARACTERISTIC, never as a defect
measure: `200` pairs × `200` reversals = `647,128` bytes (`3,236` B/pair), `3` `.set` sites and `0`
`.delete` sites — sized, known, intended for a session-long instance.** **No cap, no eviction arm, no
declared figure is asked for, and no later pass of ours may re-file on that ground.**

**THE VERSION NUMBER — withdrawn `2026-10-28`.** *"Stop complaining about the version number."*
Decision row **`VERSION-NUMBERS-ARE-THE-PACKAGE'S-TO-CHOOSE`**, superseding
`1.0.1-IS-NOT-A-LAWFUL-PATCH`'s verdict while keeping its pin; it withdrew
**`STOREROOM-VERSION-CONTRACT-1.0.1-AND-1.1.0`**. **Which numbers a release carries is the package's
business: a package may ship any number of behaviour changes under any number, and a consumer's
remedy is a PIN, not an issue.** **This document pins `1.3.0`, files no semver finding, and grades
neither the size nor the numbering of this release** — the `+12.25 %` tarball growth is recorded as
`DEF-AD` numbers with no demand attached.

### (ii) Withdrawn by us, because the filing did not survive contact

**`DEF-R` — WITHDRAWN, NOT REPRODUCED.** *"The constraint reader re-orders its own array on a
toggle"* **never reproduced at any version**: five snapshot points across a pass, a refusal, a
`constraintOff`/`constraintOn` toggle and a `rollback` — registration order at all five points,
**byte-identical output**. **A filed defect that cannot be reproduced in the version that filed it is
withdrawn as unproven, not carried.**

**`DEF-T`'s two-spellings claim — WITHDRAWN; RE-SCOPED TO FOUR OBSERVED SPELLINGS.** *"One refusal,
two spellings"* did not reproduce: the constraint members' receiver message is **byte-identical to
the facade's**. **What stands is narrower**: **four distinct spellings across the fourteen
members** (`read`/`readLiteral`/`write`/`delete`/`rollback`/`unlisten`/`addConstraint`/
`constraintOn`/`constraintOff`/`removeConstraint` share one; `listen`, `removeListener` and
`register` each spell their own) and **two construction sites for argument refusals**. **The claim
is withdrawn; the re-scoped observation is carried with NO demand attached** — it is a preference
about consistency, not a broken clause.

**`DEF-V` — WITHDRAWN; A COULD-HAVE, AND THE PACKAGE'S REFUSAL IS CORRECT.** A supplied `undefined`
tier is answered as a malformed address (`write(h, ['a'], undefined, 1)` → `AddressMalformed`), and
the bytes are unchanged at every version here. **The package's own record rules the refusal
CORRECT**, calling the specific code and message a *"could have"* (`declared`). **No upstream issue
and no fix shape is owed**; what survives is a diagnostic preference, priced at nothing.

### (iii) Two design decisions this consumer has now ACCEPTED — withdrawals of our own demands

**(i) THE TWO DECLARED WINDOWS ARE NOT DEFECTS — accepted `2026-10-28`.** The shipped guide declares
two windows in the constraint machinery and rules them not-defects (`README.guide.md:1330-1336`,
`declared`): **a registration's own evaluation** and **a `delete`'s listener delivery** — a
`rollback` issued inside either is unjudged and its effect stands, because a pass does not begin
there. **This consumer accepted the maintainer's reading and files nothing on hosts 4 and 5. A
declared window with named exits is a design decision, and a consumer preference is not a finding.**
What remains filed on `DEF-X` is only hosts where **a pass runs and the reversal is still not
judged** — the property the declared windows do not have.

**(ii) THE FIX SHAPE *"REFUSE AN IN-COMMIT REVERSAL"* IS WITHDRAWN — `2026-10-28`.** It was
`DEF-X`'s fix shape as Round 12 printed it, and it is **withdrawn because it would undo `D-42`'s
restart** — the mechanism that makes a judgement inside a commit possible at all. **`1.3.0` has
delivered the narrower ask instead** — *do not let a pass consume a request it did not raise, and
carry a raised request to that pass's terminal state* — **which leaves the restart budget, its three
asks and `D-42` intact.** **A maintainer working from Round 12's table must not implement the
withdrawn form**; the surviving ask is section 2.3(e) as re-worded.

### (iv) The discipline this produced — in this document's own voice

**Seven withdrawal events in a fortnight — four of the architect's demands, one pass of our own
filings, and two demands our own evidence then refuted — are a pattern, and it is ours to name.**
**A consumer preference belongs in the catalogue as an OBSERVATION WITH ITS COST ATTACHED; it becomes
a defect only when it breaks a clause this consumer's own contract requires.** `DEF-AD`, `DEF-AM`,
`DEF-V` and the `DEF-T` residue are filed under that rule; the retention demand and the version
finding were withdrawn under it; `DEF-R` is withdrawn because the evidence never existed; and the two
windows and the in-commit-refusal fix shape were withdrawn when the maintainer's declaration and our
own restart mechanism showed each was a preference we had mistaken for a clause. **The test is
applied to the open rows as well:** every one of the six demands in section 1 names a clause — a
refused act must not land, a refusal must name what refused, a record must not change after it is
handed over, a shipped document must not deny the bytes it rides — and **none of them prices a
preference as a defect.**

---

## 4. What is closed and must not regress

**`20` closed ids, printed with their terms:** `4` closed at `1.3.0` (`DEF-AI` · `DEF-AJ` ·
`DEF-AL` · `DEF-AB`'s `seq` half) + `2` closed at `1.2.0` (`DEF-AE`; `DEF-AB`'s spelling half) +
`12` closed at `1.0.1`/`1.1.0` (`DEF-Y`, `DEF-AA`, `DEF-Z`, `DEF-M`, `DEF-W`, `DEF-H`, `DEF-N`,
`DEF-P`, `DEF-Q`, `DEF-L`, `DEF-U`, `DEF-S`) + `2` closed **by measurement**
(`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`, `STOREROOM-FILE-PROBE-FALSE-PASS`) = **`20`**
(`4 + 2 + 12 + 2 = 20 ✓`). **The `1.3.0` group below prints five lines, not four, because `DEF-AE`
carries its own retention line** — closed at `1.2.0` and re-observed `HOLDS` at `1.3.0`. **All
`16` earlier rows were re-driven at `1.3.0` and re-verified `HOLDS`** on the harness that measured
them at `1.1.0` and at `1.2.0`, so nothing regressed while the host count moved. Each line names
the code path that closes the row — **not its commit**, so a maintainer can check the mechanism
rather than a message — and the observable that would show a regression.

- **`DEF-AI`** (`1.3.0`) — *the `seq` meaning is declared, so a required member carrying `1` is no
  longer a lie*: the `LogEntry` doc block in `index.d.ts` states it is the entry's position in the
  commit's own message log, not the store's journal ordinal (`observed`: `40` writes → journal
  `41`; a three-entry commit log reads `1, 2, 3`). **Regression:** a declaration that leaves `seq`
  undefined in meaning, or a fresh fabrication claim against a declared meaning.
- **`DEF-AJ`** (`1.3.0`) — *the verdict reports the baseline it measured, and the baseline is the
  commit's mark*: the per-opening `journalMark` cache (`src/entry/state.mjs:360-406`, compensation
  `constraints.mjs:1905-1922`). **Regression:** a correct undo reported as a failed restore, or the
  same-address arm answering the capture's value instead of the commit's mark.
- **`DEF-AL`** (`1.3.0`) — *the budget refusal names the budget and no pair*: the budget's own
  authored sentence (*"this refusal is a RESTART BUDGET EXHAUSTION and NOT a constraint pair
  refusing a state"*), separate from the pair refusal's. **Regression:** a budget refusal naming a
  watched address, or a budget refusal indistinguishable from a pair refusal without reading the
  log. **Three facts recorded with NO demand attached:** the budget's scope is the **drain call, not
  the window** (`read`, `constraints.mjs:1569`), so two drains in one window can spend six asks;
  `request.asked` is stamped at **raise**, not at the ask (`read`, `constraints.mjs:1599-1600`), so
  the accusation can be stale for exactly the hosts `1.3.0` fixed; and the **two-pair arm now
  RETURNS NORMALLY** (`observed`: `op-22`, `2` asks, `3` reversals) where `1.2.0` refused — a
  behaviour change this consumer neither confirms good nor files.
- **`DEF-AB`, `seq` half** (`1.3.0`) — closes with `DEF-AI`; **the row is now shut on both halves.**
  **Regression:** `DEF-AI`'s.
- **`DEF-AE`** (`1.2.0`, **re-observed `HOLDS` at `1.3.0`**, three arms) — *a refused write leaves
  nothing of its own effect standing*: the opening caches the store's `journalMark`
  (`src/entry/state.mjs:360-406`) and the compensation restores to that mark
  (`constraints.mjs:1905-1922`). **Regression:** a refused write whose own value reads back
  (`["b"]` = `1` where it answers `ABSENT`).
- **`DEF-AB`, spelling half** (`1.2.0`) — one renderer, `addressSpelling`, serves the thrown
  `subject` and the log sentence (`constraints.mjs:2263`, `:2291-2298`, `:2342-2348`, `:2057`).
  **Regression:** one address rendered two ways in one refusal, or the `["a"]` form in a measured
  family.
- **`DEF-Y`** (`1.1.0`) — the judgement's throw refuses with a one-entry `log` naming the constraint
  **and undoes the reversal** (`constraints.mjs:1720-1725`). **Regression:** `log: []` while the
  reversal stands.
- **`DEF-AA`** (`1.1.0`) — the restore lands on the absent-terminal arm and the true sentence is
  picked, `200` of `200` (`constraints.mjs:1813-1836`, `src/store.rs:2575-2589`). **Regression:** the
  UNDONE sentence over an address that reads `AddressNotFound`. *(Its sibling — a correct undo
  reported as a failure — was `DEF-AJ`, now closed at `1.3.0`; the two were never one row.)*
- **`DEF-Z`** (`1.1.0`) — the compensating restore is **tier-exact** (`{file:5, mem:7}` keeps `file`
  answering `5`; `src/store.rs:2575-2589`). **Regression:** `TierNotFound` where a value stood.
- **`DEF-M`** (`1.0.1`) — one floor call per distinct address leaves the pre-attempt value; the
  passing arm's `record.op.after` reads the repaired value (`kernel-terminal.mjs:171-236`,
  `:275-330`; `constraints.mjs:778-781`). **Regression:** an `after` the store does not hold.
- **`DEF-W`** (`1.0.1`, closed as asked) — judged at the terminal state it leaves, **once**, never
  per unwinding step (`index.mjs:509-525`; `constraints.mjs:1205-1208`, `:1220-1246`, `:1265-1289`,
  `:1310-1341`, `:1467-1499`). **Regression:** a second judgement per at-rest reversal, or a
  judgement inside the unwinding (`R8`: `0` tier-null invocations, four arms).
- **`DEF-H`** (`1.0.1`) — a constraint refusal crosses as **`ConstraintPassRefused`** with the
  kernel's token at `log[].state`; **`FileCommitFailed` is the save's alone**
  (`constraints.mjs:1033-1042`). **Regression:** a constraint refusal answering `FileCommitFailed`.
- **`DEF-N`** (`1.0.1`) — **`ConstraintRefusedAtRegistration`** at add, at batch and at re-enable;
  the malformed entry keeps `ConstraintListInvalid` (`kernel-registration.mjs:506-515`).
  **Regression:** a well-formed pair refused with the shape code.
- **`DEF-P`** (`1.0.1`, declarative) — one `id` at N addresses is lawful at every act
  (`index.d.ts:902-921`). **Regression:** the declaration calling that pair unlawful while the code
  unions it.
- **`DEF-Q`** (`1.0.1`) — the sentence interpolates the registry row's own address and `undefined`
  appears nowhere in the family (`KC-3` template). **Regression:** `undefined` for a column the entry
  itself carries.
- **`DEF-L`** (`1.0.1`) — the README's **`14` rows match the `14` observed members** with arities
  agreeing, `settle` absent, the guide riding `files`; `documented-but-not-observed: []`,
  `observed-but-not-documented: []`. **Regression:** a non-empty diff from that census. *(Residue,
  not a reopening: `DEF-AC`, section 2.1.)*
- **`DEF-U`** (`1.0.1`) — **`DECLARED-ONLY` (NASH)**: the record says `1081` tests · `1080` pass ·
  `0` fail at the bump, and **no tests ship in the tarball**, so nothing here is measured.
  **Regression:** the record's count line against the held cell.
- **`DEF-S`** (`1.0.1`) — closed at **four instants** (landing pass, registration, synthetic re-run,
  bare-string throw), all `ConstraintBodyThrew` **with a `log`**, and a forged
  `{status:'ConstraintPassRefused'}` no longer launders through. **Regression:** a body's throw
  crossing raw with no `status`, `message` and `log`. *(Its judgement instant is `DEF-Y`; its
  nested-write instant is `DEF-AK`, section 2.4 — where the rethrown refusal now crosses in full.)*
- **`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`** — **closed by measurement**, `HOLDS` at `1.3.0`:
  manifest, platform package, `addon.version()` and all five pins agree (`observed`: `addon.version()`
  = `1.3.0`), and a mis-versioned candidate tree still refuses **at construction**
  (`FilePathUnreachable`). **Regression:** a version disagreement reaching a commit.
- **`STOREROOM-FILE-PROBE-FALSE-PASS`** — **closed by measurement**, `HOLDS` at `1.3.0`: an
  unwritable parent refuses **at construction**, so the first commit is never reached.
  **Regression:** an instance returned for a parent the process cannot write. *(Recorded honestly:
  this was already true at `1.0.1` — the earlier row was STALE, not fixed.)*

**`R8`, and it gets its own paragraph because `1.3.0` changed what holds it up.** `R8` is the
requirement that **the kernel's own unwinding reaches no constraint judgement** — no tier-null
invocation inside a compensation, the floor reached on every arm, and the terminal-state judgement
taken once per act (`DEF-W`'s terms). At `1.1.0` and `1.2.0` it held, and the honest note then was
that **the open-commit conjunct, not the authorship rule, was doing the work.** **At `1.3.0` it
holds structurally (`observed`):** the kernel's own compensation is now **flagged out of the watch
and out of the judgement** (`kernel-attempt.mjs:56-67`, `:245` / `:341` / `:511` / `:693` / `:702`;
`constraints.mjs:1819`, `:1968`), and on four adversarial arms the probe measured **`0` tier-null
invocations inside the kernel's unwinding, the floor reached on every arm.** **What to watch:** a
tier-null invocation inside a compensation, a floor not reached, or a second judgement on one act —
and any of those appearing while `DEF-X`'s remaining host is driven.

**The one line:** any of these twenty regressing shows up as a single observable — **a typed
consumer's handler for a DECLARED arm stops catching a refusal it caught at the last version, or a
value the store hands back differs from the value the record names.** That is what to watch; nothing
more elaborate is needed.

---

## 5. What we are not asking for

- **No retention bound or cap.** `DEF-J` and `R16` are withdrawn by the architect's ruling
  (section 3(i)); no deletion site, no cap, no declared figure. The `647,128`-byte figure is a
  characteristic a consumer budgets against.
- **No public commit register.** Withdrawn `2026-10-14` (section 3(i)); the attempt's own failure
  record is the observable, and it already ships.
- **No re-typing of the reversal parameter.** The op id is the lawful parameter (section 3(i)).
- **No semver change.** This consumer files no version finding (section 3(i)); it pins `1.3.0` and
  records the pin as its own dependency decision. The release's size, its numbering and its
  `+12.25 %` tarball growth are not findings.
- **No new dependency.** Nothing above requires the package to add a dependency, a runner, a build
  step or a fourth leg — **including the pre-publish cut-state assertion in `DEF-AC`**, which is a
  check inside the release script, not a tool.
- **No patch from us.** This project catalogues; the upstream fixes. **No byte of `node_modules/**`,
  of any published artifact, or of `../Provident-Storeroom` was written by this pass**, and none
  will be.
- **One standing fact about our own side, so no ask is read as needing a prerequisite:**
  `U-STORE-CONSTRAINT-REGISTRY` is admitted `OPEN` and **HELD at its spec gate** (`C-5` open) — it
  activates nothing, and no package verb is imported or re-declared by that layer.

---

## 6. How to reproduce any of this

- **Install:** `npm i provident-storeroom@1.3.0` — the version whose bytes every `1.3.0` row above
  was measured against. Comparisons: `@1.2.0`, `@1.1.0` and `@1.0.1`, driven on the same harness;
  earlier baselines `@1.0.0`, `@0.5.0` where a row's earlier state cites them.
- **Runtime:** node **`v24.20.0`**, uid `1000`, `linux-x64-gnu` platform artefact. Installs were
  made with `npm install provident-storeroom@<version> --cache /tmp/npmcache-pk`.
- **Probe directories**, cited by row in `docs/defects.md`: **`/tmp/probe-storeroom-130`** — this
  review's `1.3.0` install, the seven-host table, the four `DEF-AH` arms, the cut-state greps and the
  two undriven rows' readings, raw output under `out/`; **`/tmp/probe-storeroom-120`** and
  **`/tmp/probe-storeroom-120b`** — the `1.2.0` review's two arm-sets; **`/tmp/probe-storeroom-110`**
  and **`/tmp/probe-storeroom-101`** — the comparison installs. **`1.2.0`'s columns are the same
  probes re-run against that install**, which is why a delta between two versions is comparable and
  two different harnesses' numbers are not. Older baselines, if still on disk: `-100`, `-050`,
  `-040`, `-031`, `-020`.
- **The probe scripts are the CONSUMER's and ship NOWHERE** — not in this repo's published
  artifacts, not in the package, and not part of what the upstream receives. Each block in section 2
  states instead the shortest sequence of calls that shows its defect; **if a probe directory has
  been cleared, that block's own steps are the record.**
- **Registry fact, and its limit:** the `1.3.0` review installed from the registry — the shipped
  guide's own `:34` and `:60` were printed from inside that install (`observed`), and the shipped
  `RELEASE-NOTES.md` was read from the unpacked tarball. **This document's seat has no shell and
  measures nothing itself**: every byte count, path and probe figure it cites is the catalogue's,
  carried with the label the catalogue gives it.
- **Two labels, one spine:** the live probe yields `observed`; the source reading yields `read` and
  `declared`. **Where they disagree the probe wins on behaviour and the disagreement is printed in
  the row.** **No commit message, README, guide or release note in this document is presented as a
  measurement** — including the two that contradict each other in section 2.1.

---

## 7. History (one paragraph; not re-narrated)

**Rounds 1–9 addressed `provident-ssr`** — a different package, whose source repo is the adjacent
`../Preempt-Providence` — and every item they filed is resolved or closed: the `REQ-GAP` series
across `0.1.1`–`0.1.3`, the adapter-parity, journal-replay and isolation items, the
`UndoRedoReport` item at `0.2.1`, and `UNDO-REDO-DESTROY-STATUS`, measured unreproducible at
`provident-ssr@0.5.1`; no `provident-ssr` round is open and this document files nothing against that
package. **Round 10 addressed `provident-storeroom`'s LOAD path** in the `0.1.x` era; its two residue
rows closed **by measurement** at `1.1.0` and hold. **Round 11 is this constraint surface, through
`0.2.0` → `1.2.0`** — the versions with dated blocks in the catalogue, carried across `0.2.0`,
`0.3.1`, `0.4.0`, `0.5.0`, `1.0.0`, `1.0.1`, `1.1.0`, `1.2.0`. **Round 12 was the `1.2.0` review and
the two clarifications this consumer sent after it — the two declared windows, and the withdrawal of
the *"refuse an in-commit reversal"* fix shape — BOTH of which `1.3.0` answered**, one by holding the
declaration and one by building the narrower ask. **Round 13 is this regeneration at `1.3.0`.** **The
as-filed text of every round is preserved in the archive and is not re-narrated here:** the
pre-`2026-10-14` text at `archive/handoffs/2026-10-14-HANDOFF-as-filed-before-regeneration.md`
(`81,664` bytes, git `ab60c2e`); the pre-regeneration `1.0.0` text at
`archive/handoffs/2026-10-27-HANDOFF-as-filed-before-1.0.1-regeneration.md` (`56,897` bytes, git
`bc5b398`); the pre-regeneration `1.1.0`-era text at
`archive/handoffs/2026-10-28-HANDOFF-as-filed-before-1.2.0-regeneration.md` (`51,018` bytes, git
`c123df9`); and **the pre-regeneration `1.2.0`-era, Round-12-corrected text — the file this
regeneration replaced, copied before its first byte was written — at
`archive/handoffs/2026-10-28-HANDOFF-as-filed-before-1.3.0-regeneration.md` (`54,545` bytes, `718`
lines)**. **And the one line that matters: `1.3.0` is the first release in this sequence that closed
more rows than it opened** — five rows closed against two new ones, with the host count moved
`2` of `7` → `4` of `7` in the same release.

---

**Label audit:** every `observed` above is a probe execution quoted from the catalogue; every `read`
is a `path:line` citation or a quotation of shipped bytes; every `declared` is the package's own
prose, **never a measurement**; every `derived` states what it was inferred from; **the
reproductions in section 2 are instructions, not observations**, except where a step quotes an
`observed` answer. **`DEF-AN` and `DEF-AO` are `read` and UNDRIVEN and are labelled so in their
headings, in section 1's table and here; nothing in this document presents them as measured.**
**`DEF-AD` and `DEF-AM` carry no demand, by ruling and by their own declared status, and are labelled
`OBSERVATION — NO DEMAND` wherever they are named**; that label is reserved for those two alone.
